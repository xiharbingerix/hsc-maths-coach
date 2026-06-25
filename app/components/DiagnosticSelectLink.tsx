"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  clientTrackEvent,
  preserveMarketingParams,
  readMarketingParams,
} from "../../lib/analytics/clientTrackEvent";
import { ctaExperimentProps } from "../../lib/experiments/ctaExperiment";

/**
 * Year-level card link on /diagnostic/select. Tracks the chooser selection
 * (diagnostic_year_level_selected) so the funnel can distinguish CTA-clickers
 * who bounce on the chooser from those who go on to start a diagnostic. The
 * card markup is passed as children so the page keeps full control of layout.
 */
export function DiagnosticSelectLink({
  slug,
  className,
  children,
}: Readonly<{ slug: string; className?: string; children: ReactNode }>) {
  return (
    <Link
      href={`/diagnostic/${slug}`}
      className={className}
      onClick={() => {
        preserveMarketingParams();
        clientTrackEvent("diagnostic_year_level_selected", {
          yearLevel: slug,
          source: "diagnostic-select",
          ...ctaExperimentProps(),
          ...readMarketingParams(),
        });
      }}
    >
      {children}
    </Link>
  );
}
