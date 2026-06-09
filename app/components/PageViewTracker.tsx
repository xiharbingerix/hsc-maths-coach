"use client";

import { useEffect } from "react";
import { clientTrackEvent } from "../../lib/analytics/clientTrackEvent";

export function PageViewTracker({
  eventName,
  metadata,
}: {
  eventName: string;
  metadata?: Record<string, unknown>;
}) {
  useEffect(() => {
    clientTrackEvent(eventName, metadata);
    // Run once per mount — eventName and metadata are stable props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
