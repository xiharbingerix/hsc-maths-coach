"use client";

import { useSyncExternalStore } from "react";
import {
  CTA_VARIANTS,
  forcedVariantId,
  resolveAssignedVariantId,
  type CtaVariant,
  type CtaVariantId,
} from "../../lib/experiments/ctaExperiment";

// The assignment is fixed for the session once resolved, so there is nothing to
// subscribe to — the no-op subscribe satisfies the store contract.
const subscribe = () => () => {};

// Client snapshot: the persisted/assigned variant id (stable across renders).
const getSnapshot = (): CtaVariantId => resolveAssignedVariantId();

// Server snapshot: forced variant if set, otherwise control (stable SSR markup).
const getServerSnapshot = (): CtaVariantId => forcedVariantId() ?? "control";

/**
 * Returns the visitor's assigned CTA variant. Renders the control (or forced)
 * label on the server, then the randomly assigned variant on the client —
 * without a hydration mismatch, via useSyncExternalStore.
 */
export function useCtaVariant(): CtaVariant {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return CTA_VARIANTS[id];
}
