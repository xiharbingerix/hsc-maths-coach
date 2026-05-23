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
    return;
  }

  const { data: existingAccess, error: readError } = await supabaseAdmin
    .from("user_access")
    .select("id")
    .eq("user_id", userId)
    .eq("access_type", "online_learning_beta")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (readError) {
    throw new Error(readError.message);
  }

  if (existingAccess?.id) {
    const { error } = await supabaseAdmin
      .from("user_access")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingAccess.id);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  const { error } = await supabaseAdmin.from("user_access").insert({
    user_id: userId,
    access_type: "online_learning_beta",
    status,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const offerSelected = metadataValue(metadata, "offer_selected");
  const userId = metadataValue(metadata, "user_id");
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

  const { error } = await supabaseAdmin.from("payments").upsert(
    {
      user_id: userId,
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

  if (error) {
    throw new Error(error.message);
  }

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
