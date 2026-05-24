export type OfferSlug =
  | "diagnostic-report"
  | "study-plan"
  | "online-learning"
  | "weekly-tutoring";

export type CheckoutMode = "payment" | "subscription";

export type OfferConfig = {
  slug: OfferSlug;
  label: string;
  priceLabel: string;
  description: string;
  checkoutEnabled: boolean;
  stripePriceEnvKey?: string;
  mode?: CheckoutMode;
  enquiryHref: string;
  checkoutHref?: string;
};

export const offerConfigs: Record<OfferSlug, OfferConfig> = {
  "diagnostic-report": {
    slug: "diagnostic-report",
    label: "Diagnostic PDF Report",
    priceLabel: "$49 one-off",
    description:
      "A parent-friendly report showing strengths, priority areas, likely mark leaks, and recommended next lessons.",
    checkoutEnabled: true,
    stripePriceEnvKey: "STRIPE_PRICE_DIAGNOSTIC_REPORT",
    mode: "payment",
    enquiryHref: "/enquire?offer=diagnostic-report",
    checkoutHref: "/checkout?offer=diagnostic-report",
  },
  "study-plan": {
    slug: "study-plan",
    label: "Diagnostic + 30-Day Plan",
    priceLabel: "$79 one-off",
    description:
      "A diagnostic report plus a focused month of revision priorities based on the student's results.",
    checkoutEnabled: true,
    stripePriceEnvKey: "STRIPE_PRICE_STUDY_PLAN",
    mode: "payment",
    enquiryHref: "/enquire?offer=study-plan",
    checkoutHref: "/checkout?offer=study-plan",
  },
  "online-learning": {
    slug: "online-learning",
    label: "Online Learning Access",
    priceLabel: "$19/month",
    description:
      "Structured online lessons, guided practice, independent practice, and mastery quizzes across available early-access course pathways.",
    checkoutEnabled: true,
    stripePriceEnvKey: "STRIPE_PRICE_ONLINE_LEARNING_MONTHLY",
    mode: "subscription",
    enquiryHref: "/enquire?offer=online-learning",
    checkoutHref: "/checkout?offer=online-learning",
  },
  "weekly-tutoring": {
    slug: "weekly-tutoring",
    label: "Weekly Tutoring + Online Learning",
    priceLabel: "$75/week",
    description:
      "Weekly individual support with access to the available online learning course pathways.",
    checkoutEnabled: false,
    enquiryHref: "/enquire?offer=weekly-tutoring",
  },
};

export const offerSlugs = Object.keys(offerConfigs) as OfferSlug[];

export function isOfferSlug(value: string | null | undefined): value is OfferSlug {
  return Boolean(value && value in offerConfigs);
}

export function getOfferConfig(value: string | null | undefined) {
  if (!isOfferSlug(value)) {
    return null;
  }

  return offerConfigs[value];
}
