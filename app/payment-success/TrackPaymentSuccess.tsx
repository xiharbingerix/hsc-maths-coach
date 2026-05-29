"use client";

import { useEffect } from "react";
import { trackPaymentSuccess } from "../../lib/analytics";

export function TrackPaymentSuccess() {
  useEffect(() => {
    trackPaymentSuccess();
  }, []);

  return null;
}
