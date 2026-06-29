"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { trackSignupCompleted } from "../../lib/analytics";
import { clientTrackEvent, readMarketingParams } from "../../lib/analytics/clientTrackEvent";

// Free signup never routes to Stripe — a stale `next=/checkout?offer=online-learning`
// (from the old trial flow) is ignored and the user lands in the app.
function safeInternalNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }
  if (value.startsWith("/checkout")) {
    return "/dashboard";
  }

  return value;
}

function isDuplicateEmailError(message: string): boolean {
  return /already registered|already been registered|user already|email.*already|already.*email/i.test(message);
}

export default function SignupPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(safeInternalNext(params.get("next")));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setNotice("");
    setIsSubmitting(true);

    const utmParams = readMarketingParams();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          student_first_name: studentFirstName,
          parent_email: parentEmail || null,
          utm_source: utmParams.utm_source ?? null,
          utm_medium: utmParams.utm_medium ?? null,
          utm_campaign: utmParams.utm_campaign ?? null,
          utm_gclid: utmParams.gclid ?? null,
        },
      },
    });

    if (error) {
      setErrorMessage(
        isDuplicateEmailError(error.message) ? "__duplicate__" : error.message
      );
      setIsSubmitting(false);
      return;
    }

    const user = data.user;

    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        email,
        student_first_name: studentFirstName,
        parent_email: parentEmail || null,
        role: "student",
        utm_source: utmParams.utm_source ?? null,
        utm_medium: utmParams.utm_medium ?? null,
        utm_campaign: utmParams.utm_campaign ?? null,
        utm_gclid: utmParams.gclid ?? null,
      });
    }

    trackSignupCompleted();
    clientTrackEvent("signup_completed", { source: "signup_page" });

    // Free tier: land straight in the app. New accounts go through onboarding;
    // an explicit safe internal next is honoured.
    router.push(nextPath === "/dashboard" ? "/onboarding" : nextPath);
  }

  const loginHref =
    nextPath === "/dashboard"
      ? "/login"
      : `/login?next=${encodeURIComponent(nextPath)}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Nova Maths
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Create student account
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Create a free account to access all lessons, practice and your
          diagnostic — no card required.
        </p>

        {errorMessage ? (
          errorMessage === "__duplicate__" ? (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <p>If you already have an account, log in to continue.</p>
              <Link
                href={loginHref}
                className="mt-1 inline-block font-semibold underline"
              >
                Log in
              </Link>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )
        ) : null}

        {notice ? (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            {notice}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Student first name</span>
            <input
              value={studentFirstName}
              onChange={(event) => setStudentFirstName(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">
              Parent/guardian email optional
            </span>
            <input
              type="email"
              value={parentEmail}
              onChange={(event) => setParentEmail(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Creating account..." : "Create free account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href={loginHref} className="font-semibold text-slate-950 underline">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}
