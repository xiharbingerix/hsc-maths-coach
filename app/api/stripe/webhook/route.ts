import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getStripe } from "../../../../lib/stripe";

export const runtime = "nodejs";

type AccessStatus = "active" | "pending" | "revoked";

function metadataValue(
  metadata: Stripe.Metadata | null | undefined,
  key: string
) {
  const value = metadata?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

async function setOnlineLearningAccess(
  userId: string | null,
  status: AccessStatus
) {
  if (!userId) {
    console.warn("[webhook] setOnlineLearningAccess called with null userId");
    return;
  }

  console.log("[webhook] setOnlineLearningAccess", { userId, status });

  const { data: existingAccess, error: readError } = await supabaseAdmin
    .from("user_access")
    .select("id, status")
    .eq("user_id", userId)
    .eq("access_type", "online_learning_beta")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (readError) {
    throw new Error(`user_access read failed: ${readError.message}`);
  }

  if (existingAccess?.id) {
    console.log("[webhook] updating existing user_access row", {
      id: existingAccess.id,
      currentStatus: existingAccess.status,
      nextStatus: status,
    });

    // Do not include updated_at — the column may not exist; let the DB handle timestamps.
    const { error } = await supabaseAdmin
      .from("user_access")
      .update({ status })
      .eq("id", existingAccess.id);

    if (error) {
      throw new Error(`user_access update failed: ${error.message}`);
    }

    return;
  }

  console.log("[webhook] inserting new user_access row", { userId, status });

  const { error } = await supabaseAdmin.from("user_access").insert({
    user_id: userId,
    access_type: "online_learning_beta",
    status,
  });

  if (error) {
    throw new Error(`user_access insert failed: ${error.message}`);
  }
}

// Find an existing Supabase user by email (via profiles table), or create a
// new confirmed user with a random password. Used for the anonymous online-
// learning checkout flow where no Supabase account exists at checkout time.
//
// On success: returns { userId, isNewUser }.
// Returns null (and logs) when the auth user exists but has no profile row —
// this is a manually-created user that requires support intervention.
// Throws for transient DB errors so Stripe retries the webhook.
async function findOrCreateAnonUser(
  email: string,
  studentFirstName: string | null
): Promise<{ userId: string; isNewUser: boolean } | null> {
  // 1. Profile lookup first — idempotent, handles the payment-success-first
  //    ordering and existing accounts.
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (profileError) {
    // Transient DB error — rethrow so Stripe retries the webhook.
    throw new Error(
      `[webhook] profiles lookup failed: ${profileError.message}`
    );
  }

  if (profile?.id) {
    return { userId: profile.id, isNewUser: false };
  }

  // 2. No profile — create a confirmed auth user with a random password.
  //    needs_password_setup: true signals to payment-success that the user
  //    must set a real password regardless of which code path created them.
  const { data: newUserData, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    password: crypto.randomUUID(),
    user_metadata: { needs_password_setup: true },
  });

  if (newUserData?.user) {
    const userId = newUserData.user.id;

    const { error: profileUpsertError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: userId,
        email,
        student_first_name: studentFirstName,
        role: "student",
      });

    if (profileUpsertError) {
      // Non-fatal: proceed with userId for access activation. payment-success
      // will retry the profile upsert when the user lands on that page.
      console.error("[webhook] anon user profile upsert failed (non-fatal)", {
        email,
        userId,
        message: profileUpsertError.message,
      });
    }

    return { userId, isNewUser: true };
  }

  // 3. createUser failed — decide whether to retry or accept.
  const errorMsg = createError?.message ?? "unknown error";
  const isDuplicateEmail =
    /already (registered|been registered|exists)|email.*(taken|in use|already)/i.test(
      errorMsg
    );

  if (isDuplicateEmail) {
    // An auth user exists for this email but has no profile row (e.g. a user
    // manually added to Supabase without going through app signup). We cannot
    // retrieve their userId without paginating all auth users. Manual support
    // required.
    console.error(
      "[webhook] auth user exists without profile — cannot auto-link anonymous checkout",
      { email, message: errorMsg }
    );
    return null;
  }

  // 4. Unexpected error — rethrow so Stripe retries.
  throw new Error(`[webhook] createUser failed: ${errorMsg}`);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const offerSelected = metadataValue(metadata, "offer_selected");

  // userId from session metadata — present for the logged-in checkout flow,
  // null for the anonymous checkout flow.
  const userId =
    metadataValue(metadata, "user_id") ??
    (session.client_reference_id || null);

  // resolvedUserId starts as userId and is updated below for the anonymous
  // flow once the user is found or created. All downstream operations use this.
  let resolvedUserId: string | null = userId;

  const parentEmail =
    metadataValue(metadata, "parent_email") ?? session.customer_email;
  const studentFirstName = metadataValue(metadata, "student_first_name");
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  console.log("[webhook] checkout.session.completed", {
    session_id: session.id,
    offer_selected: offerSelected,
    user_id: userId,
    payment_status: session.payment_status,
  });

  // Record the payment. Best-effort — failure must not block access activation.
  //
  // user_id is intentionally omitted when null (anonymous checkout flow). If we
  // included `user_id: null` explicitly, a conflict-update would overwrite a
  // non-null value that payment-success may have already written.
  const { error: paymentsError } = await supabaseAdmin.from("payments").upsert(
    {
      ...(userId ? { user_id: userId } : {}),
      parent_email: parentEmail,
      student_first_name: studentFirstName,
      offer_selected: offerSelected,
      stripe_customer_id:
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id ?? null,
      stripe_checkout_session_id: session.id,
      stripe_subscription_id: subscriptionId,
      stripe_payment_intent_id: paymentIntentId,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      subscription_status:
        typeof session.subscription === "object"
          ? session.subscription?.status ?? null
          : null,
      access_status:
        offerSelected === "online-learning" && userId ? "active" : "pending",
      metadata,
    },
    { onConflict: "stripe_checkout_session_id" }
  );

  if (paymentsError) {
    // Log but do not throw — access activation must still run.
    console.error("[webhook] payments upsert failed (non-fatal)", {
      session_id: session.id,
      message: paymentsError.message,
    });
  }

  // ── Anonymous online-learning user resolution ────────────────────────────
  //
  // When userId is null, the customer completed Stripe checkout without a
  // pre-existing Supabase account. Find or create their account now so that:
  //   - access is activated immediately (no dependency on the user loading PS)
  //   - payments.user_id is set so subscription lifecycle events work later
  //   - needs_password_setup metadata tells payment-success to show the form
  //
  // Handles both orderings correctly:
  //   Webhook-first (most common): profile does not exist yet → createUser
  //   PS-first (rare): profile created by PS → findUserIdByEmail returns it
  //
  // Does not affect:
  //   - Logged-in checkout (userId is non-null, block is skipped)
  //   - Non-online-learning offers (offerSelected check)
  if (!resolvedUserId && offerSelected === "online-learning") {
    const checkoutEmail =
      session.customer_details?.email ?? session.customer_email ?? null;

    if (checkoutEmail) {
      const anonUser = await findOrCreateAnonUser(checkoutEmail, studentFirstName);

      if (anonUser) {
        resolvedUserId = anonUser.userId;

        const { error: patchError } = await supabaseAdmin
          .from("payments")
          .update({ user_id: resolvedUserId })
          .eq("stripe_checkout_session_id", session.id)
          .is("user_id", null);

        if (patchError) {
          console.error(
            "[webhook] anon user payments user_id patch failed (non-fatal)",
            { session_id: session.id, message: patchError.message }
          );
        } else {
          console.log(
            "[webhook] resolved anonymous user for online-learning checkout",
            {
              session_id: session.id,
              user_id: resolvedUserId,
              is_new_user: anonUser.isNewUser,
            }
          );
        }
      } else {
        console.error(
          "[webhook] could not resolve user for anonymous online-learning checkout — access will not be activated",
          { session_id: session.id, email: checkoutEmail }
        );
      }
    } else {
      console.warn(
        "[webhook] anonymous online-learning checkout has no customer email",
        { session_id: session.id }
      );
    }
  }

  // Access activation — the critical operation. Uses resolvedUserId which is
  // updated above for the anonymous flow. Throws on DB error (causes Stripe retry).
  if (offerSelected === "online-learning") {
    await setOnlineLearningAccess(resolvedUserId, "active");
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = metadataValue(subscription.metadata, "user_id");
  const offerSelected = metadataValue(subscription.metadata, "offer_selected");
  const activeStatuses = new Set(["active", "trialing"]);
  const revokedStatuses = new Set([
    "canceled",
    "unpaid",
    "past_due",
    "incomplete_expired",
  ]);
  const nextAccessStatus = activeStatuses.has(subscription.status)
    ? "active"
    : revokedStatuses.has(subscription.status)
    ? "revoked"
    : "pending";

  const { data: matchingPayments, error: readError } = await supabaseAdmin
    .from("payments")
    .select("user_id,offer_selected")
    .eq("stripe_subscription_id", subscription.id);

  if (readError) {
    throw new Error(readError.message);
  }

  const { error } = await supabaseAdmin
    .from("payments")
    .update({
      subscription_status: subscription.status,
      access_status: nextAccessStatus,
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    throw new Error(error.message);
  }

  const paymentUserIds = (matchingPayments ?? [])
    .filter((payment) => payment.offer_selected === "online-learning")
    .map((payment) => payment.user_id)
    .filter((paymentUserId): paymentUserId is string =>
      Boolean(paymentUserId)
    );

  const userIdsToUpdate = Array.from(
    new Set([...(userId ? [userId] : []), ...paymentUserIds])
  );

  if (offerSelected === "online-learning" || userIdsToUpdate.length > 0) {
    await Promise.all(
      userIdsToUpdate.map((nextUserId) =>
        setOnlineLearningAccess(nextUserId, nextAccessStatus)
      )
    );
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!webhookSecret) {
    return Response.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET." },
      { status: 500 }
    );
  }

  if (!signature) {
    return Response.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not verify Stripe webhook.",
      },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object);
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      await handleSubscriptionChange(event.data.object);
    }
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not process Stripe webhook.",
      },
      { status: 500 }
    );
  }

  return Response.json({ received: true });
}
