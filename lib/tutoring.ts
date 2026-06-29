import type Stripe from "stripe";
import { getStripe, getSiteUrl } from "./stripe";
import { supabaseAdmin } from "./supabaseAdmin";
import { billingAnchorTimestamp, formatDate } from "./nswTermDates";

export const TUTORING_OFFER_SLUG = "weekly-tutoring";

export type TutoringStatus = "pending" | "active" | "paused" | "canceled";

export type CreateTutoringPlanInput = {
  studentName: string;
  parentEmail: string;
  weeklyAmountCents: number;
  committedWeeks: number;
  billingMonday: string; // ISO date (a Monday) the first full charge lands on
  termLabel?: string | null; // term/holiday annotation for the chosen Monday
};

export function formatAud(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: Number.isInteger(cents / 100) ? 0 : 2,
  }).format(cents / 100);
}

// The commitment text the parent must agree to before paying. Kept blunt on
// purpose: the point is to remove ambiguity about the weekly block so a skipped
// session in (say) the last week of term is still payable.
function commitmentMessage(input: CreateTutoringPlanInput, termsUrl: string) {
  const price = formatAud(input.weeklyAmountCents);
  return (
    `I'm enrolling ${input.studentName} in a ${input.committedWeeks}-week ` +
    `tutoring block at ${price} per week. I understand billing is automatic ` +
    `each Monday and continues until I cancel, and that sessions we skip ` +
    `within the block are still charged because the weekly time slot is ` +
    `reserved for ${input.studentName}. Full terms: [tutoring terms](${termsUrl}).`
  );
}

function submitMessage(input: CreateTutoringPlanInput) {
  const price = formatAud(input.weeklyAmountCents);
  return `No charge today. Your first ${price} payment is on ${formatDate(
    input.billingMonday,
  )}, then ${price} automatically every Monday.`;
}

// Creates a Stripe Checkout link (subscription mode) for a tutoring plan and
// records a pending row. The webhook fills in Stripe ids and flips to active
// once the parent pays. Returns the URL for the admin to send to the parent.
export async function createTutoringCheckoutSession(
  input: CreateTutoringPlanInput,
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();
  const siteUrl = getSiteUrl();
  const termsUrl = `${siteUrl}/tutoring-terms`;

  const productName = `Weekly tutoring — ${input.studentName}`;

  // Weekly billing is anchored to the chosen Monday with prorations disabled,
  // so nothing is charged today and the first full charge lands on that Monday,
  // then a full week's fee every Monday after. Every charge is the full amount,
  // which keeps billing predictable and lets the admin start on a Monday that
  // dodges school holidays.
  const lineItems: NonNullable<
    Stripe.Checkout.SessionCreateParams["line_items"]
  > = [
    {
      price_data: {
        currency: "aud",
        unit_amount: input.weeklyAmountCents,
        recurring: { interval: "week" },
        product_data: { name: productName },
      },
      quantity: 1,
    },
  ];

  const metadata: Stripe.MetadataParam = {
    offer_selected: TUTORING_OFFER_SLUG,
    student_name: input.studentName,
    parent_email: input.parentEmail,
    committed_weeks: String(input.committedWeeks),
    weekly_amount_cents: String(input.weeklyAmountCents),
    billing_monday: input.billingMonday,
    ...(input.termLabel ? { term_label: input.termLabel } : {}),
  };

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    customer_email: input.parentEmail,
    success_url: `${siteUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/payment-cancelled?offer=${TUTORING_OFFER_SLUG}`,
    // Requires a Terms of service URL in Stripe Dashboard → Settings → Public.
    // Records the parent's explicit acceptance of the weekly-block commitment.
    consent_collection: { terms_of_service: "required" },
    custom_text: {
      terms_of_service_acceptance: {
        message: commitmentMessage(input, termsUrl),
      },
      submit: { message: submitMessage(input) },
      after_submit: {
        message:
          "Thanks. Weekly tutoring is confirmed. Contact us any time to pause or cancel.",
      },
    },
    metadata,
    subscription_data: {
      description: productName,
      billing_cycle_anchor: billingAnchorTimestamp(input.billingMonday),
      proration_behavior: "none",
      metadata,
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  const { error } = await supabaseAdmin.from("tutoring_subscriptions").insert({
    student_name: input.studentName,
    parent_email: input.parentEmail,
    weekly_amount_cents: input.weeklyAmountCents,
    committed_weeks: input.committedWeeks,
    billing_monday: input.billingMonday,
    term_label: input.termLabel ?? null,
    stripe_checkout_session_id: session.id,
    status: "pending",
  });

  if (error) {
    throw new Error(`Could not record tutoring plan: ${error.message}`);
  }

  return { url: session.url, sessionId: session.id };
}

// Maps a Stripe subscription's state onto our simpler tutoring status.
export function tutoringStatusFromStripe(
  subscription: Stripe.Subscription,
): TutoringStatus {
  if (subscription.status === "canceled") return "canceled";
  if (subscription.pause_collection) return "paused";
  if (subscription.status === "active" || subscription.status === "trialing") {
    return "active";
  }
  return "pending";
}
