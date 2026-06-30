"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackSubscribeClicked,
  trackPreviewHscLessonClicked,
} from "../../lib/analytics";
import {
  clientTrackEvent,
  preserveMarketingParams,
  readMarketingParams,
} from "../../lib/analytics/clientTrackEvent";
import { ctaExperimentProps } from "../../lib/experiments/ctaExperiment";
import { useCtaVariant } from "../components/useCtaVariant";

/**
 * Primary "get started" CTA for the /hsc-maths page. Freemium entry: lessons
 * and practice are free, so this drives to free signup (no card).
 */
export function HscTrialCTAButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/signup"
      onClick={() => {
        preserveMarketingParams();
        trackSubscribeClicked();
        clientTrackEvent("trial_cta_clicked", {
          source: "hsc-maths",
          destination: "/signup",
          ...readMarketingParams(),
        });
      }}
      className={`inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-slate-800 ${className}`}
    >
      {children}
    </Link>
  );
}

export function FreeLessonCTAButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/sample-hsc-lesson"
      onClick={() => trackPreviewHscLessonClicked("hsc-maths")}
      className={
        className ??
        "inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      }
    >
      {children}
    </Link>
  );
}

/**
 * Primary diagnostic CTA for the /hsc-maths page. The label is driven by the
 * CTA copy experiment; pass `children` only to override it (rare). The click is
 * tracked with the active variant attached.
 */
export function HscDiagnosticCTAButton({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const variant = useCtaVariant();
  return (
    <Link
      href="/diagnostic/select"
      onClick={() => {
        preserveMarketingParams();
        clientTrackEvent("diagnostic_cta_clicked", {
          source: "hsc-maths",
          destination: "/diagnostic/select",
          ...ctaExperimentProps(),
          ...readMarketingParams(),
        });
      }}
      className={
        className ??
        "inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      }
    >
      {children ?? variant.label}
    </Link>
  );
}
