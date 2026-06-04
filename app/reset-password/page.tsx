"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Stage = "checking" | "form" | "no-session" | "success";

export default function ResetPasswordPage() {
  const [stage, setStage] = useState<Stage>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Subscribe before checking session to avoid missing the PASSWORD_RECOVERY
    // event that Supabase fires while it processes the token from the URL hash.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setStage("form");
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStage("form");
      } else {
        // Give the SDK ~800 ms to fire PASSWORD_RECOVERY if it's still
        // processing the URL fragment before falling back to invalid.
        setTimeout(() => {
          setStage((prev) => (prev === "checking" ? "no-session" : prev));
        }, 800);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setStage("success");
  }

  if (stage === "checking") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-400">
            Checking reset link…
          </h1>
        </section>
      </main>
    );
  }

  if (stage === "no-session") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Link expired or invalid
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This password reset link is no longer valid. Links expire after one
            hour and can only be used once. Request a new link to continue.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/forgot-password"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Request a new link
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Back to log in
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (stage === "success") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Password updated
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your password has been changed. Log in with your new password to
            continue.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Go to dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // stage === "form"
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Nova Maths
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Set a new password
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Choose a new password for your Nova Maths account. Minimum 6
          characters.
        </p>

        {errorMessage ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">New password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Confirm new password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Saving…" : "Set new password"}
          </button>
        </form>
      </section>
    </main>
  );
}
