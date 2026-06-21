"use client";

import { useEffect } from "react";
import {
  clientTrackEvent,
  getMarketingParamsFromUrl,
  preserveMarketingParams,
} from "../../lib/analytics/clientTrackEvent";
import { ctaExperimentProps } from "../../lib/experiments/ctaExperiment";

export function PageViewTracker({
  eventName,
  metadata,
  includeMarketingParams = false,
  includeCtaExperiment = false,
}: {
  eventName: string;
  metadata?: Record<string, unknown>;
  includeMarketingParams?: boolean;
  /**
   * Tag the page view with the visitor's CTA experiment variant. This is the
   * exposure event (denominator) for the CTA click-through rate.
   */
  includeCtaExperiment?: boolean;
}) {
  useEffect(() => {
    const experiment = includeCtaExperiment ? ctaExperimentProps() : {};

    if (!includeMarketingParams) {
      clientTrackEvent(eventName, { ...metadata, ...experiment });
      return;
    }

    preserveMarketingParams();
    clientTrackEvent(eventName, {
      ...metadata,
      ...experiment,
      ...getMarketingParamsFromUrl(),
    });
    // Run once per mount; eventName and metadata are stable props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
