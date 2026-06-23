"use client";

import Link from "next/link";
import {
  clientTrackEvent,
  preserveMarketingParams,
  readMarketingParams,
} from "../../lib/analytics/clientTrackEvent";
import { ctaExperimentProps } from "../../lib/experiments/ctaExperiment";
import { useCtaVariant } from "./useCtaVariant";

const DEFAULT_CLASS =
  "inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-slate-800";

/**
 * Primary diagnostic CTA. The label is driven by the CTA copy experiment, and
 * the click is tracked (click-through rate) with the active variant attached.
 * Used wherever the page links to the diagnostic.
 */
export function DiagnosticCtaLink({
  source = "homepage",
  className,
}: Readonly<{ source?: string; className?: string }>) {
  const variant = useCtaVariant();
  return (
    <Link
      href="/diagnostic/select"
      className={className ?? DEFAULT_CLASS}
      onClick={() => {
        preserveMarketingParams();
        clientTrackEvent("diagnostic_cta_clicked", {
          source,
          destination: "/diagnostic/select",
          ...ctaExperimentProps(),
          ...readMarketingParams(),
        });
      }}
    >
      {variant.label}
    </Link>
  );
}
