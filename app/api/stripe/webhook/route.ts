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

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const offerSelected = metadataValue(metadata, "offer_selected");

  // Use metadata.user_id first; fall back to client_reference_id (set at session creation).
  const userId =
    metadataValue(metadata, "user_id") ??
    (session.client_reference_id || null);

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

  // Record the payment. This is best-effort — a failure here must not block
  // access activation below, because the payments table schema or constraints
  // may differ from what this upsert expects.
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

  // For the anonymous checkout flow (no userId in session metadata), try to
  // link the payment row to a Supabase user by the Stripe customer email. This
  // handles the race where payment-success ran first (created the user and
  // profile) before the webhook arrived, leaving payments.user_id null because
  // PS found no row to patch. Now the row exists, so we can fill it in.
  if (!userId && offerSelected === "online-learning") {
    const checkoutEmail =
      session.customer_details?.email ?? session.customer_email ?? null;
    if (checkoutEmail) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email", checkoutEmail)
        .maybeSingle();
      if (profile?.id) {
        const { error: patchError } = await supabaseAdmin
          .from("payments")
          .update({ user_id: profile.id })
          .eq("stripe_checkout_session_id", session.id)
          .is("user_id", null);
        if (patchError) {
          console.error("[webhook] payments user_id patch failed (non-fatal)", {
            session_id: session.id,
            message: patchError.message,
          });
        } else {
          console.log("[webhook] patched payments.user_id from profile lookup", {
            session_id: session.id,
            user_id: profile.id,
          });
        }
      }
    }
  }

  // Access activation is the critical operation — always attempt it independently.
  if (offerSelected === "online-learning") {
    await setOnlineLearningAccess(userId, "active");
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
