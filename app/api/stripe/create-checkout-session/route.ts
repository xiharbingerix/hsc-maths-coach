import { getOfferConfig } from "../../../../lib/offers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getSiteUrl, getStripe } from "../../../../lib/stripe";

type CheckoutRequestBody = {
  offer?: string;
  parentEmail?: string;
  studentFirstName?: string;
};

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
  const body = (await request.json()) as CheckoutRequestBody;
  const offer = getOfferConfig(body.offer);

  if (!offer) {
    return Response.json({ error: "Invalid offer." }, { status: 400 });
  }

  if (!offer.checkoutEnabled || offer.slug === "weekly-tutoring") {
    return Response.json(
      { error: "This offer is enquiry-only." },
      { status: 400 }
    );
  }

  if (!offer.stripePriceEnvKey || !offer.mode) {
    return Response.json(
      { error: "Checkout is not configured for this offer." },
      { status: 400 }
    );
  }

  const priceId = process.env[offer.stripePriceEnvKey];

  if (!priceId) {
    return Response.json(
      { error: `Missing ${offer.stripePriceEnvKey}.` },
      { status: 500 }
    );
  }

  const parentEmail = body.parentEmail?.trim();
  const studentFirstName = body.studentFirstName?.trim();

  if (!parentEmail || !studentFirstName) {
    return Response.json(
      { error: "Parent email and student first name are required." },
      { status: 400 }
    );
  }

  const userId = await getUserIdFromRequest(request);
  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: offer.mode,
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: parentEmail,
    success_url: `${siteUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/payment-cancelled?offer=${offer.slug}`,
    metadata: {
      offer_selected: offer.slug,
      parent_email: parentEmail,
      student_first_name: studentFirstName,
      ...(userId ? { user_id: userId } : {}),
    },
    subscription_data:
      offer.mode === "subscription"
        ? {
            metadata: {
              offer_selected: offer.slug,
              parent_email: parentEmail,
              student_first_name: studentFirstName,
              ...(userId ? { user_id: userId } : {}),
            },
          }
        : undefined,
  });

  return Response.json({ url: session.url });
}
