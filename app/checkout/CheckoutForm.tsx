"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { offerConfigs, type OfferSlug } from "../../lib/offers";
import { supabase } from "../../lib/supabaseClient";
import { trackCheckoutStarted, trackEvent } from "../../lib/analytics";
import {
  clientTrackEvent,
  readMarketingParams,
} from "../../lib/analytics/clientTrackEvent";

type CheckoutFormProps = {
  offerSlug: OfferSlug;
};

export function CheckoutForm({ offerSlug }: CheckoutFormProps) {
  const offer = offerConfigs[offerSlug];
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [parentEmail, setParentEmail] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  // True when online-learning and no logged-in user — use the new direct-to-Stripe flow.
  const isAnonymousOnlineLearning = offer.slug === "online-learning" && !user;

  useEffect(() => {
    let tracked = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        if (session.user.email) {
          setParentEmail(session.user.email);
        }
        if (session.user.user_metadata?.student_first_name) {
          setStudentFirstName(
            String(session.user.user_metadata.student_first_name)
          );
        }
        if (offer.slug === "online-learning") {
          // Keep session check open until we know whether the user already has access.
          supabase
            .from("user_access")
            .select("status")
            .eq("user_id", session.user.id)
            .eq("access_type", "online_learning_beta")
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle()
            .then(({ data }) => {
              setIsAlreadySubscribed(data?.status === "active");
              setIsCheckingSession(false);
              if (!tracked) {
                tracked = true;
                trackCheckoutStarted();
                clientTrackEvent("checkout_started", {
              offer: offerSlug,
              ...readMarketingParams(),
            });
              }
            });
        } else {
          setIsCheckingSession(false);
          if (!tracked) {
            tracked = true;
            trackCheckoutStarted();
            clientTrackEvent("checkout_started", {
              offer: offerSlug,
              ...readMarketingParams(),
            });
          }
        }
      } else if (event === "INITIAL_SESSION") {
        if (offer.slug === "online-learning") {
          trackEvent("checkout_login_wall_hit", { offer: offer.slug });
          if (!tracked) {
            tracked = true;
            trackCheckoutStarted();
            clientTrackEvent("checkout_started", {
              offer: offerSlug,
              ...readMarketingParams(),
            });
          }
          setIsCheckingSession(false);
        } else {
          setIsCheckingSession(false);
          if (!tracked) {
            tracked = true;
            trackCheckoutStarted();
            clientTrackEvent("checkout_started", {
              offer: offerSlug,
              ...readMarketingParams(),
            });
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [offer.slug, offerSlug]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    trackEvent("checkout_form_submitted", { offer: offer.slug });
    clientTrackEvent("checkout_form_submitted", { offer: offerSlug });

    try {
      let accessToken: string | undefined;

      if (!isAnonymousOnlineLearning) {
        const { data } = await supabase.auth.getSession();
        accessToken = data.session?.access_token;
      }

      const requestBody = isAnonymousOnlineLearning
        ? { offer: offer.slug }
        : {
            offer: offer.slug,
            parentEmail: parentEmail.trim(),
            studentFirstName: studentFirstName.trim(),
          };

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(requestBody),
      });

      const rawResponse = await response.text();
      let payload: { url?: string; error?: string } = {};

      if (rawResponse) {
        try {
          payload = JSON.parse(rawResponse) as { url?: string; error?: string };
        } catch (parseError) {
          console.error("Stripe checkout response was not valid JSON", {
            status: response.status,
            rawResponse,
            parseError,
          });
        }
      }

      if (!response.ok) {
        console.error("Stripe checkout request failed", {
          status: response.status,
          payload,
          rawResponse,
        });
        setErrorMessage(
          payload.error ?? "Checkout could not be started. Please try again."
        );
        setIsSubmitting(false);
        return;
      }

      if (payload.error) {
        console.error("Stripe checkout returned an error", payload);
        setErrorMessage(payload.error);
        setIsSubmitting(false);
        return;
      }

      if (payload.url) {
        clientTrackEvent(
          "checkout_redirected_to_stripe",
          { offer: offerSlug },
          { beacon: true, token: accessToken }
        );
        window.location.href = payload.url;
        return;
      }

      console.error("Stripe checkout response did not include a URL", {
        status: response.status,
        payload,
        rawResponse,
      });
      setErrorMessage("Checkout could not be started. Please try again.");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Stripe checkout request crashed", error);
      setErrorMessage("Checkout could not be started. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (isCheckingSession) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Checkout
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-400">
          Checking account status...
        </h2>
        {offer.slug === "online-learning" ? (
          <p className="mt-2 text-sm text-slate-500">
            Nova Maths Online Learning &middot; 7-day free trial &middot; then
            $19/month &middot; cancel any time
          </p>
        ) : null}
      </section>
    );
  }

  if (isAlreadySubscribed) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Access active
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-emerald-900">
          You already have online learning access
        </h2>
        <p className="mt-2 leading-7 text-emerald-800">
          Your subscription is active. Go to the dashboard to continue your lessons.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Go to dashboard
          </Link>
        </div>
      </section>
    );
  }

  // ── Anonymous online-learning: direct-to-Stripe launch ───────────────────
  if (isAnonymousOnlineLearning) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Selected offer
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {offer.label}
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              {offer.priceLabel}
            </p>
            <p className="mt-4 leading-7 text-slate-600">{offer.description}</p>
            <div className="mt-5 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700">
              <p className="font-semibold text-slate-950">What happens next</p>
              <p className="mt-2">
                Stripe collects your email and payment details securely. After
                checkout, create your Nova Maths password to access your
                dashboard.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold tracking-tight">
              Start your 7-day free trial
            </h1>
            <p className="mt-3 leading-7 text-slate-600">
              No account needed before checkout. Stripe collects your email and
              payment details. After your trial starts, you will create a
              password to access your lessons and dashboard.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-500">
              No charge today &middot; then $19/month &middot; cancel any time
              &middot; secure payment through Stripe
            </p>

            {errorMessage ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
            >
              {isSubmitting
                ? "Opening secure checkout..."
                : "Continue to secure checkout"}
            </button>

            <p className="mt-4 text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login?next=%2Fcheckout%3Foffer%3Donline-learning"
                className="font-semibold text-slate-950 underline"
              >
                Log in to continue checkout
              </Link>
            </p>
          </form>
        </div>
      </section>
    );
  }

  // ── Logged-in user or non-online-learning offer ───────────────────────────
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Selected offer
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            {offer.label}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {offer.priceLabel}
          </p>
          <p className="mt-4 leading-7 text-slate-600">{offer.description}</p>
          <div className="mt-5 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-950">What happens next</p>
            <p className="mt-2">
              You will continue to Stripe Checkout. After payment, access or
              follow-up will use the details attached to this order.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Continue to secure Stripe checkout
            </h1>
            <p className="mt-3 leading-7 text-slate-600">
              No card details are entered on this site. Stripe handles the
              secure payment page.
            </p>
          </div>

          {user ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
              Logged in as {user.email}. Payment metadata will include this
              account for access matching.
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-800">
                Student first name
              </span>
              <input
                value={studentFirstName}
                onChange={(event) => setStudentFirstName(event.target.value)}
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-800">
                Parent/guardian email
              </span>
              <input
                type="email"
                value={parentEmail}
                onChange={(event) => setParentEmail(event.target.value)}
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
          >
            {isSubmitting
              ? "Redirecting to Stripe checkout..."
              : "Continue to secure Stripe checkout"}
          </button>
        </form>
      </div>
    </section>
  );
}
