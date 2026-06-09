export type FunnelStep = {
  label: string;
  total: number;
  uniq: number;
};

export type PeriodSummary = {
  visitors: number;
  diagnosticStarts: number;
  diagnosticCompletions: number;
  checkoutStarts: number;
  trialStarts: number;
  topCtaSource: string | null;
  topPage: string | null;
  biggestDropLabel: string | null;
  biggestDropPct: string | null;
  recommendedAction: string;
};

const DROP_ACTIONS: Record<string, string> = {
  "Homepage viewed → HSC maths viewed":
    "Add a more prominent link from the homepage to the HSC Maths page.",
  "HSC maths viewed → Trial CTA clicked":
    "Add more prominent CTAs on the HSC Maths page.",
  "Trial CTA clicked → Checkout started":
    "CTA intent isn't completing to checkout. Check the checkout link destination.",
  "Checkout started → Checkout form submitted":
    "Visitors start checkout but don't submit. Review the checkout form for friction.",
  "Checkout form submitted → Redirected to Stripe":
    "Form submits are not reaching Stripe. Check for form validation errors.",
  "Redirected to Stripe → Trial started":
    "Stripe redirects are not activating trials. Check the Stripe webhook and access activation.",
};

export function summariseAnalytics(input: {
  visitors: number;
  diagnosticStarts: number;
  diagnosticCompletions: number;
  checkoutStarts: number;
  trialStarts: number;
  topCtaSource: string | null;
  pageCounts: Map<string, number>;
  funnelSteps: FunnelStep[];
}): PeriodSummary {
  const {
    visitors,
    diagnosticStarts,
    diagnosticCompletions,
    checkoutStarts,
    trialStarts,
    topCtaSource,
    pageCounts,
    funnelSteps,
  } = input;

  // Top page by event count.
  let topPage: string | null = null;
  let topPageCount = 0;
  for (const [page, n] of pageCounts) {
    if (n > topPageCount) {
      topPage = page;
      topPageCount = n;
    }
  }

  // Biggest funnel drop-off by unique conversion rate.
  let biggestDropLabel: string | null = null;
  let biggestDropPct: string | null = null;
  let lowestRate = Infinity;

  for (let i = 1; i < funnelSteps.length; i++) {
    const prev = funnelSteps[i - 1];
    const curr = funnelSteps[i];
    if (prev.uniq === 0) continue;
    const rate = curr.uniq / prev.uniq;
    if (rate < lowestRate) {
      lowestRate = rate;
      biggestDropLabel = `${prev.label} → ${curr.label}`;
      biggestDropPct = `${Math.round(rate * 100)}%`;
    }
  }

  // Recommended action — most specific rule wins.
  let recommendedAction: string;

  if (visitors === 0) {
    recommendedAction =
      "No visitors recorded yet. Check that analytics events are firing correctly.";
  } else if (trialStarts > 0) {
    recommendedAction =
      "Trials are starting. Focus on onboarding quality to improve mastery engagement after signup.";
  } else if (checkoutStarts > 5 && trialStarts === 0) {
    recommendedAction =
      "Checkout starts are not becoming trials. Check the Stripe webhook and access activation flow.";
  } else if (biggestDropLabel && biggestDropLabel in DROP_ACTIONS) {
    recommendedAction = DROP_ACTIONS[biggestDropLabel];
  } else if (biggestDropLabel) {
    recommendedAction = `Biggest drop is at: ${biggestDropLabel} (${biggestDropPct ?? "—"}). Investigate this step.`;
  } else if (
    diagnosticStarts > 5 &&
    diagnosticCompletions / diagnosticStarts < 0.4
  ) {
    recommendedAction =
      "Diagnostic completion rate is low. Review the quiz length or add an exit prompt.";
  } else {
    recommendedAction =
      "Not enough funnel data yet. Drive traffic to the HSC Maths page to seed the funnel.";
  }

  return {
    visitors,
    diagnosticStarts,
    diagnosticCompletions,
    checkoutStarts,
    trialStarts,
    topCtaSource,
    topPage,
    biggestDropLabel,
    biggestDropPct,
    recommendedAction,
  };
}
