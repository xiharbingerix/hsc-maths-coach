import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getStripe, getSiteUrl } from "../../../../lib/stripe";

export const runtime = "nodejs";

async function getUserIdFromRequest(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token) {
    return null;
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return null;
  }

  return data.user.id;
}

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const { data: paymentData, error: paymentError } = await supabaseAdmin
    .from("payments")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .eq("offer_selected", "online-learning")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (paymentError) {
    console.error("[billing-portal] Error reading payments", paymentError);
    return NextResponse.json(
      { error: "Could not look up billing information." },
      { status: 500 }
    );
  }

  const stripeCustomerId =
    typeof (paymentData as { stripe_customer_id?: string | null } | null)
      ?.stripe_customer_id === "string" &&
    (paymentData as { stripe_customer_id: string }).stripe_customer_id.length > 0
      ? (paymentData as { stripe_customer_id: string }).stripe_customer_id
      : null;

  if (!stripeCustomerId) {
    return NextResponse.json(
      {
        error:
          "No billing customer found for this account. Contact support.",
      },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${siteUrl}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("[billing-portal] Stripe portal session error", error);
    return NextResponse.json(
      { error: "Could not create billing portal session. Please try again." },
      { status: 500 }
    );
  }
}
