"use client";

import { useEffect, useRef, useState } from "react";
import {
  trackGoogleAdsPurchaseConversion,
  trackEvent,
} from "../../../lib/analytics";

const SEND_TO = "AW-18195883998/o6pYCKXb0rYcEN7PvORD";
const SESSION_KEY = "admin_google_ads_test_conversion_page_sent";

type PageStatus = "waiting" | "sent" | "error" | "already_sent";

export function TestGoogleAdsConversionClient() {
  const hasFired = useRef(false);
  const [pageStatus, setPageStatus] = useState<PageStatus>("waiting");
  const [transactionId, setTransactionId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) {
        setPageStatus("already_sent");
        return;
      }
    } catch {
      // sessionStorage unavailable — continue with the send attempt
    }

    if (hasFired.current) return;
    hasFired.current = true;

    const txId = `admin_test_page_${Date.now()}`;
    setTransactionId(txId);

    if (typeof window.gtag !== "function") {
      setErrorMessage("Google tag is not loaded on this page.");
      setPageStatus("error");
      return;
    }

    const sent = trackGoogleAdsPurchaseConversion(txId);

    if (!sent) {
      setErrorMessage("Google tag is not loaded on this page.");
      setPageStatus("error");
      return;
    }

    trackEvent("admin_google_ads_test_conversion_page_loaded", {
      transaction_id: txId,
    });

    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // sessionStorage unavailable — conversion was still sent
    }

    setPageStatus("sent");
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-semibold text-amber-900">
          Admin use only
        </p>
        <p className="mt-1 text-sm leading-6 text-amber-800">
          This page sends a test Google Ads purchase conversion from your
          browser for tag verification. This may appear as a conversion in
          Google Ads. Do not reload repeatedly.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Payload
        </p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex flex-col gap-0.5">
            <dt className="font-medium text-slate-700">send_to</dt>
            <dd className="font-mono text-slate-500">{SEND_TO}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="font-medium text-slate-700">transaction_id</dt>
            <dd className="font-mono text-slate-500">
              {transactionId || "generating…"}
            </dd>
          </div>
        </dl>
      </div>

      {pageStatus === "waiting" && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-600">
            Sending conversion…
          </p>
        </div>
      )}

      {pageStatus === "sent" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-800">
            Conversion event sent
          </p>
          <p className="mt-1 text-sm leading-6 text-emerald-700">
            Check Google Ads tag diagnostics or Google Tag Assistant to
            confirm the event was received.
          </p>
        </div>
      )}

      {pageStatus === "error" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-semibold text-red-800">
            Conversion not sent
          </p>
          <p className="mt-1 text-sm leading-6 text-red-700">{errorMessage}</p>
          <p className="mt-2 text-xs text-red-600">
            Wait for the Google tag script to finish loading, then reload the
            page in a new browser session.
          </p>
        </div>
      )}

      {pageStatus === "already_sent" && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">
            Already sent in this browser session
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Open a new browser session or clear sessionStorage
            (DevTools → Application → Session Storage → delete{" "}
            <code className="rounded bg-slate-200 px-1 py-0.5 text-xs font-mono">
              {SESSION_KEY}
            </code>
            ) if you intentionally need another test.
          </p>
        </div>
      )}
    </div>
  );
}
