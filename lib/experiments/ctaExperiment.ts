/**
 * CTA copy experiment for the primary "diagnostic" call-to-action.
 *
 * Each visitor is randomly assigned one variant (control + A–D, an equal
 * split) the first time they load a page, and that assignment is persisted in
 * localStorage so it stays stable across pages and return visits. Every tracked
 * event in the funnel — exposure (page view), the CTA click (CTR), diagnostic
 * start and diagnostic completion — is tagged with `cta_variant`, so the funnel
 * can be segmented and compared by variant in analytics.
 *
 * NEXT_PUBLIC_CTA_VARIANT can force a single variant (control/A/B/C/D). This is
 * an override for QA/screenshots/debugging — when unset (the normal case) the
 * assignment is random.
 *
 * Assignment is client-side, so server-rendered markup shows the forced variant
 * if set, otherwise the control copy, and swaps to the assigned variant on
 * mount (see useCtaVariant).
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

/** Variants in the live test — equal-weighted random split. */
export const EXPERIMENT_POOL: CtaVariantId[] = ["control", "A", "B", "C", "D"];

const STORAGE_KEY = "nova_cta_variant";

function isVariantId(value: string | null | undefined): value is CtaVariantId {
  return !!value && Object.prototype.hasOwnProperty.call(CTA_VARIANTS, value);
}

/**
 * A forced variant from NEXT_PUBLIC_CTA_VARIANT, or null when unset/invalid
 * (the normal case, where assignment is random).
 */
export function forcedVariantId(): CtaVariantId | null {
  const raw = (process.env.NEXT_PUBLIC_CTA_VARIANT ?? "").trim();
  const upper = raw.toUpperCase();
  if (upper === "A" || upper === "B" || upper === "C" || upper === "D") {
    return upper;
  }
  if (raw.toLowerCase() === "control") return "control";
  return null;
}

function pickRandomVariantId(): CtaVariantId {
  const index = Math.floor(Math.random() * EXPERIMENT_POOL.length);
  return EXPERIMENT_POOL[index] ?? "control";
}

/**
 * The visitor's assigned variant. A forced variant always wins; otherwise the
 * persisted assignment is reused, or a new random one is assigned and stored.
 * Returns "control" during SSR (no storage), so first render is stable.
 */
export function resolveAssignedVariantId(): CtaVariantId {
  const forced = forcedVariantId();
  if (forced) return forced;
  if (typeof window === "undefined") return "control";

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isVariantId(stored)) return stored;
    const assigned = pickRandomVariantId();
    localStorage.setItem(STORAGE_KEY, assigned);
    return assigned;
  } catch {
    return "control";
  }
}

/** The visitor's assigned variant (id + label). Client-side. */
export function getAssignedVariant(): CtaVariant {
  return CTA_VARIANTS[resolveAssignedVariantId()];
}

/** Analytics fields to attach to every event in the CTA funnel. */
export function ctaExperimentProps(): {
  cta_experiment: string;
  cta_variant: CtaVariantId;
} {
  return {
    cta_experiment: CTA_EXPERIMENT_ID,
    cta_variant: resolveAssignedVariantId(),
  };
}
