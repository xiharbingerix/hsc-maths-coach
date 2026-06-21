/**
 * CTA copy experiment for the primary "diagnostic" call-to-action.
 *
 * The active variant is chosen by configuration — the NEXT_PUBLIC_CTA_VARIANT
 * environment variable — so it can be switched without code changes:
 *
 *   NEXT_PUBLIC_CTA_VARIANT=A   # "Find My Weak Topics"
 *   NEXT_PUBLIC_CTA_VARIANT=B   # "Get My Diagnostic Result"
 *   NEXT_PUBLIC_CTA_VARIANT=C   # "See What To Revise Next"
 *   NEXT_PUBLIC_CTA_VARIANT=D   # "Start Free Diagnostic"
 *   (unset / "control")         # "Start free diagnostic"  (current copy)
 *
 * Because the variant is global (one active at a time), every tracked event —
 * the CTA click, diagnostic start and diagnostic completion — is tagged with
 * the same `cta_variant`, so the funnel can be segmented by variant in
 * analytics. To run a new variant, change the env var and redeploy.
 *
 * NEXT_PUBLIC_ vars are inlined at build time, so this resolves identically on
 * the server and client (no hydration mismatch).
 */

export const CTA_EXPERIMENT_ID = "diagnostic_cta_copy_v1";

export type CtaVariantId = "control" | "A" | "B" | "C" | "D";

export type CtaVariant = {
  id: CtaVariantId;
  label: string;
};

export const CTA_VARIANTS: Record<CtaVariantId, CtaVariant> = {
  control: { id: "control", label: "Start free diagnostic" },
  A: { id: "A", label: "Find My Weak Topics" },
  B: { id: "B", label: "Get My Diagnostic Result" },
  C: { id: "C", label: "See What To Revise Next" },
  D: { id: "D", label: "Start Free Diagnostic" },
};

function resolveVariantId(): CtaVariantId {
  const raw = (process.env.NEXT_PUBLIC_CTA_VARIANT ?? "").trim().toUpperCase();
  if (raw === "A" || raw === "B" || raw === "C" || raw === "D") {
    return raw;
  }
  // "", "CONTROL", or anything unrecognised falls back to the current copy.
  return "control";
}

/** The currently active CTA variant (id + label) plus the experiment id. */
export function getCtaExperiment(): CtaVariant & { experimentId: string } {
  return { experimentId: CTA_EXPERIMENT_ID, ...CTA_VARIANTS[resolveVariantId()] };
}

/** Analytics fields to attach to every event in the CTA funnel. */
export function ctaExperimentProps(): {
  cta_experiment: string;
  cta_variant: CtaVariantId;
} {
  const variant = getCtaExperiment();
  return { cta_experiment: variant.experimentId, cta_variant: variant.id };
}
