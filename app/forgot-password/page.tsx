"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    // Always show success — never reveal whether the email exists.
    setSubmitted(true);
    setIsSubmitting(false);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Check your email
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            If there is a Nova Maths account for{" "}
            <span className="font-medium text-slate-900">{email}</span>, you
            will receive a password reset link shortly. Check your spam folder
            if it does not arrive within a few minutes.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm font-semibold text-slate-950 underline"
          >
            Back to log in
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Nova Maths
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Reset your password
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Enter your email address and we will send you a link to set a new
          password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={isSubmitting}
              autoComplete="email"
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-slate-950 underline"
          >
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}
