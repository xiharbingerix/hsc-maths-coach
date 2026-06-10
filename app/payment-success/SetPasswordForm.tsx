"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { clientTrackEvent } from "../../lib/analytics/clientTrackEvent";

type Stage = "idle" | "sending" | "sent" | "error";

export function SetPasswordForm({ email }: { email: string }) {
  const [stage, setStage] = useState<Stage>("idle");

  async function sendSetupEmail() {
    setStage("sending");
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) {
      console.error("[SetPasswordForm] resetPasswordForEmail failed", {
        message: error.message,
      });
      setStage("error");
    } else {
      clientTrackEvent("signup_completed", { source: "payment_success_set_password" });
      setStage("sent");
    }
  }

  if (stage === "sent") {
    return (
      <section className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Password setup
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">
          Check your email
        </h2>
        <p className="mt-3 leading-7 text-slate-700">
          We sent a password setup link to{" "}
          <strong className="font-semibold">{email}</strong>. Click the link to
          set your password and log in to your dashboard.
        </p>
        <p className="mt-4 text-sm text-slate-600">
          Didn&apos;t receive it? Check your spam folder or{" "}
          <button
            onClick={() => void sendSetupEmail()}
            className="font-semibold text-slate-800 underline hover:text-slate-950"
          >
            send it again
          </button>
          .
        </p>
        <div className="mt-6">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Go to log in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Next step
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">
        Create your Nova Maths password
      </h2>
      <p className="mt-3 leading-7 text-slate-600">
        Your trial is active. Set a password for{" "}
        <strong className="font-semibold">{email}</strong> so you can log in
        and access your lessons and dashboard.
      </p>

      {stage === "error" ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Could not send the email. Please try again.
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => void sendSetupEmail()}
          disabled={stage === "sending"}
          className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {stage === "sending" ? "Sending…" : "Send password setup email"}
        </button>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Log in instead
        </Link>
      </div>
    </section>
  );
}
