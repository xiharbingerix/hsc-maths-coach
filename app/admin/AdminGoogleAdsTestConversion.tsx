"use client";

import { useState } from "react";
import {
  trackGoogleAdsPurchaseConversion,
  trackEvent,
} from "../../lib/analytics";

type SendStatus = "idle" | "sending" | "sent" | "error";

export function AdminGoogleAdsTestConversion() {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSend() {
    if (typeof window.gtag !== "function") {
      setErrorMessage("Google tag is not loaded on this page.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const transactionId = `admin_test_${Date.now()}`;

    const sent = trackGoogleAdsPurchaseConversion(transactionId);

    if (!sent) {
      setErrorMessage("Google tag is not loaded on this page.");
      setStatus("error");
      return;
    }

    trackEvent("admin_google_ads_test_conversion_sent", { transactionId });
    setStatus("sent");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">
        Google Ads test conversion
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        This sends a Google Ads conversion event from your browser. Use only
        for tag verification.
      </p>
      <p className="mt-1 text-xs text-amber-700">
        This may appear as a conversion in Google Ads. Do not click
        repeatedly.
      </p>

      <div className="mt-4">
        {status === "idle" || status === "sending" ? (
          <button
            type="button"
            onClick={handleSend}
            disabled={status === "sending"}
            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {status === "sending" ? "Sending…" : "Send test conversion"}
          </button>
        ) : null}

        {status === "sent" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            Conversion event sent. Check Google Ads tag diagnostics to
            confirm receipt.
          </div>
        ) : null}

        {status === "error" ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setErrorMessage("");
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Try again
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
