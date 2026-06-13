"use client";

import { useEffect } from "react";
import {
  clientTrackEvent,
  getMarketingParamsFromUrl,
  preserveMarketingParams,
} from "../../lib/analytics/clientTrackEvent";

export function PageViewTracker({
  eventName,
  metadata,
  includeMarketingParams = false,
}: {
  eventName: string;
  metadata?: Record<string, unknown>;
  includeMarketingParams?: boolean;
}) {
  useEffect(() => {
    if (!includeMarketingParams) {
      clientTrackEvent(eventName, metadata);
      return;
    }

    preserveMarketingParams();
    clientTrackEvent(eventName, {
      ...metadata,
      ...getMarketingParamsFromUrl(),
    });
    // Run once per mount; eventName and metadata are stable props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
