"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  trackSubscribeClicked,
  trackCheckoutStarted,
  trackPreviewHscLessonClicked,
} from "../../lib/analytics";
import {
  clientTrackEvent,
  preserveMarketingParams,
  getMarketingParamsFromUrl,
} from "../../lib/analytics/clientTrackEvent";
import { ctaExperimentProps } from "../../lib/experiments/ctaExperiment";
import { useCtaVariant } from "../components/useCtaVariant";

/**
 * Primary trial CTA for the /hsc-maths page.
 * POSTs directly to create-checkout-session and redirects to Stripe,
 * bypassing the intermediate /checkout page.
 * Falls back to /checkout?offer=online-learning on any error.
 */
export function HscTrialCTAButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (isLoading) return;
    setIsLoading(true);

    preserveMarketingParams();
    const marketingParams = getMarketingParamsFromUrl();

    trackSubscribeClicked();
    clientTrackEvent("trial_cta_clicked", {
      source: "hsc-maths",
      method: "direct-stripe",
      ...marketingParams,
    });

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer: "online-learning" }),
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (response.ok && payload.url) {
        trackCheckoutStarted();
        clientTrackEvent("checkout_started", {
          offer: "online-learning",
          ...marketingParams,
        });
        clientTrackEvent(
          "checkout_redirected_to_stripe",
          {
            offer: "online-learning",
            ...marketingParams,
          },
          { beacon: true }
        );
        window.location.href = payload.url;
        return;
      }

      // API returned an error — fall back to the checkout page.
      window.location.href = "/checkout?offer=online-learning";
    } catch {
      // Network error — fall back to the checkout page.
      window.location.href = "/checkout?offer=online-learning";
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {isLoading ? "Opening secure checkout…" : children}
    </button>
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
          ...getMarketingParamsFromUrl(),
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
