"use client";

import { useEffect } from "react";
import type { OfferSlug } from "../../lib/offers";
import { clientTrackEvent } from "../../lib/analytics/clientTrackEvent";

export function TrackPaymentCancelled({
  offerSlug,
}: {
  offerSlug?: OfferSlug;
}) {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    const storageKey = sessionId
      ? `checkout_cancelled_from_stripe_${sessionId}`
      : "checkout_cancelled_from_stripe";

    try {
      if (window.sessionStorage.getItem(storageKey)) {
        return;
      }
      window.sessionStorage.setItem(storageKey, "true");
    } catch {
      // Continue with tracking if sessionStorage is unavailable.
    }

    clientTrackEvent("checkout_cancelled_from_stripe", {
      ...(offerSlug ? { offer: offerSlug } : {}),
      ...(sessionId ? { stripeCheckoutSessionId: sessionId } : {}),
    });
  }, [offerSlug]);

  return null;
}
