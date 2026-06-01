"use client";

import { useEffect } from "react";
import {
  trackGoogleAdsPurchaseConversion,
  trackPaymentSuccess,
} from "../../lib/analytics";

export function TrackPaymentSuccess() {
  useEffect(() => {
    trackPaymentSuccess();

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    const storageKey = sessionId
      ? `google_ads_purchase_conversion_${sessionId}`
      : "google_ads_purchase_conversion_payment_success";
    let retryTimer: number | undefined;
    let retryCount = 0;

    function trackConversion() {
      try {
        if (window.sessionStorage.getItem(storageKey)) {
          return;
        }
      } catch {
        // Continue with one conversion attempt if browser storage is unavailable.
      }

      if (trackGoogleAdsPurchaseConversion(sessionId ?? undefined)) {
        try {
          window.sessionStorage.setItem(storageKey, "true");
        } catch {
          // The conversion was sent even though browser storage is unavailable.
        }
        return;
      }

      if (retryCount < 10) {
        retryCount += 1;
        retryTimer = window.setTimeout(trackConversion, 250);
      }
    }

    trackConversion();

    return () => {
      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }
    };
  }, []);

  return null;
}
