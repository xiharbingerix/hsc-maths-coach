import { NextResponse } from "next/server";
import { getOfferConfig } from "../../../../lib/offers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getStripe } from "../../../../lib/stripe";

type CheckoutRequestBody = {
  offer?: string;
  parentEmail?: string;
  studentFirstName?: string;
};

export const runtime = "nodejs";

const checkoutConfigErrors: Record<string, string> = {
  "diagnostic-report": "Diagnostic report checkout is not configured.",
  "study-plan": "Study plan checkout is not configured.",
  "online-learning": "Online learning checkout is not configured.",
};

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
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const offer = getOfferConfig(body.offer);

    if (!offer) {
      return NextResponse.json(
        { error: "Invalid checkout offer." },
        { status: 400 }
      );
    }

    if (offer.slug === "weekly-tutoring") {
      return NextResponse.json(
        {
          error: "Weekly tutoring is enquiry-only. Please use the enquiry form.",
        },
        { status: 400 }
      );
    }

    if (!offer.checkoutEnabled || !offer.stripePriceEnvKey || !offer.mode) {
      return NextResponse.json(
        { error: "Invalid checkout offer." },
        { status: 400 }
      );
    }

    const userId = await getUserIdFromRequest(request);

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const priceId = process.env[offer.stripePriceEnvKey];

    console.log("[stripe checkout config]", {
      offer_selected: offer.slug,
      price_id_present: Boolean(priceId),
      site_url_present: Boolean(siteUrl),
    });

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    if (!siteUrl) {
      return NextResponse.json(
        { error: "Site URL is not configured." },
        { status: 500 }
      );
    }

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            checkoutConfigErrors[offer.slug] ??
            "Checkout is not configured for this offer.",
        },
        { status: 500 }
      );
    }

    if (!priceId.startsWith("price_")) {
      return NextResponse.json(
        { error: "Stripe price is not configured correctly for this offer." },
        { status: 500 }
      );
    }

    const parentEmail = body.parentEmail?.trim() || undefined;
    const studentFirstName = body.studentFirstName?.trim() || undefined;

    // For non-online-learning offers, contact details are always required.
    // For online-learning, Stripe collects the email during checkout when the
    // user comes through the anonymous (no pre-signup) flow.
    if (offer.slug !== "online-learning" && (!parentEmail || !studentFirstName)) {
      return NextResponse.json(
        { error: "Parent email and student first name are required." },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // The customer-visible product name on the Stripe Checkout page is set on
    // the Stripe Dashboard product record attached to the price ID.
    // To show "Nova Maths Online Learning" there, rename the product in the
    // Stripe Dashboard (Products → select the online-learning product → Edit name).
    // The subscription_data.description below controls the per-subscription
    // description shown in the Stripe Dashboard and on invoices/receipts.

    const session = await stripe.checkout.sessions.create({
      mode: offer.mode,
      line_items: [{ price: priceId, quantity: 1 }],
      // customer_email pre-fills the Stripe checkout form when available.
      // Omitting it for the anonymous online-learning flow lets Stripe collect it.
      ...(parentEmail ? { customer_email: parentEmail } : {}),
      // client_reference_id is a reliable second path to user_id if metadata
      // is absent in the webhook.
      ...(userId ? { client_reference_id: userId } : {}),
      success_url: `${siteUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment-cancelled?offer=${offer.slug}`,
      metadata: {
        offer_selected: offer.slug,
        ...(parentEmail ? { parent_email: parentEmail } : {}),
        ...(studentFirstName ? { student_first_name: studentFirstName } : {}),
        ...(userId ? { user_id: userId } : {}),
      },
      subscription_data:
        offer.mode === "subscription"
          ? {
              ...(offer.slug === "online-learning"
                ? {
                    trial_period_days: 7,
                    description: "Nova Maths Online Learning",
                  }
                : {}),
              metadata: {
                offer_selected: offer.slug,
                ...(parentEmail ? { parent_email: parentEmail } : {}),
                ...(studentFirstName
                  ? { student_first_name: studentFirstName }
                  : {}),
                ...(userId ? { user_id: userId } : {}),
              },
            }
          : undefined,
    });

    if (userId) {
      const { error: funnelEventError } = await supabaseAdmin
        .from("checkout_funnel_events")
        .insert({
          user_id: userId,
          offer_selected: offer.slug,
          stripe_checkout_session_id: session.id,
        });

      if (funnelEventError) {
        console.error("Could not record checkout funnel event", {
          message: funnelEventError.message,
          offer_selected: offer.slug,
        });
      }
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Could not create Stripe checkout session", error);

    return NextResponse.json(
      { error: "Could not create checkout session. Please try again shortly." },
      { status: 500 }
    );
  }
}
