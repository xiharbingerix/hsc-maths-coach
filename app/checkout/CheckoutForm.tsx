"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { offerConfigs, type OfferSlug } from "../../lib/offers";
import { supabase } from "../../lib/supabaseClient";
import {
  trackCheckoutStarted,
  trackEvent,
  trackSignupCompleted,
} from "../../lib/analytics";
import { clientTrackEvent } from "../../lib/analytics/clientTrackEvent";

type CheckoutFormProps = {
  offerSlug: OfferSlug;
};

export function CheckoutForm({ offerSlug }: CheckoutFormProps) {
  const offer = offerConfigs[offerSlug];
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [parentEmail, setParentEmail] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isOnlineLearningSignupCheckout =
    offer.slug === "online-learning" && !user;

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
        setIsCheckingSession(false);
        if (!tracked) {
          tracked = true;
          trackCheckoutStarted();
          clientTrackEvent("checkout_started", { offer: offerSlug });
        }
      } else if (event === "INITIAL_SESSION") {
        // INITIAL_SESSION fires after Supabase has fully initialized (localStorage
        // read complete), so a null session here means the user is genuinely
        // not logged in — not a timing race from a just-completed signup.
        if (offer.slug === "online-learning") {
          trackEvent("checkout_login_wall_hit", { offer: offer.slug });
          trackEvent("checkout_account_form_viewed", { offer: offer.slug });
          if (!tracked) {
            tracked = true;
            trackCheckoutStarted();
            clientTrackEvent("checkout_started", { offer: offerSlug });
          }
          setIsCheckingSession(false);
        } else {
          setIsCheckingSession(false);
          if (!tracked) {
            tracked = true;
            trackCheckoutStarted();
            clientTrackEvent("checkout_started", { offer: offerSlug });
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [offer.slug]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setNotice("");
    setIsSubmitting(true);
    trackEvent("checkout_form_submitted", { offer: offer.slug });
    clientTrackEvent("checkout_form_submitted", { offer: offerSlug });

    try {
      let accessToken: string | undefined;
      let checkoutParentEmail = parentEmail.trim();
      let checkoutStudentFirstName = studentFirstName.trim();

      if (isOnlineLearningSignupCheckout) {
        const trimmedAccountEmail = accountEmail.trim();
        checkoutParentEmail = parentEmail.trim() || trimmedAccountEmail;

        const { data: signupData, error: signupError } =
          await supabase.auth.signUp({
            email: trimmedAccountEmail,
            password,
            options: {
              data: {
                student_first_name: checkoutStudentFirstName,
                parent_email: parentEmail.trim() || null,
              },
            },
          });

        if (signupError) {
          const duplicateAccount = /already registered|already been registered|user already|email.*already|already.*email/i.test(
            signupError.message
          );
          setErrorMessage(
            duplicateAccount
              ? "This email already has a Nova Maths account. Log in to continue checkout."
              : signupError.message
          );
          setIsSubmitting(false);
          return;
        }

        if (signupData.user) {
          await supabase.from("profiles").upsert({
            id: signupData.user.id,
            email: trimmedAccountEmail,
            student_first_name: checkoutStudentFirstName,
            parent_email: parentEmail.trim() || null,
            role: "student",
          });
        }

        trackSignupCompleted();
        clientTrackEvent("signup_completed", { source: "checkout_form", offer: offerSlug });
        accessToken = signupData.session?.access_token;

        if (!accessToken) {
          setNotice(
            "Account created. Please confirm your email, then log in to finish checkout."
          );
          setIsSubmitting(false);
          return;
        }
      } else {
        const { data } = await supabase.auth.getSession();
        accessToken = data.session?.access_token;
      }

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          offer: offer.slug,
          parentEmail: checkoutParentEmail,
          studentFirstName: checkoutStudentFirstName,
        }),
      });

      const rawResponse = await response.text();
      let payload: { url?: string; error?: string } = {};

      if (rawResponse) {
        try {
          payload = JSON.parse(rawResponse) as {
            url?: string;
            error?: string;
          };
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
        setErrorMessage(payload.error ?? "Checkout could not be started. Please try again.");
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
        if (isOnlineLearningSignupCheckout) {
          trackEvent("checkout_account_created_checkout_started", {
            offer: offer.slug,
          });
        }
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
        <h2 className="mt-3 text-2xl font-bold tracking-tight">
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
            {offer.slug === "online-learning" ? (
              <p className="mt-2">
                Create your Nova Maths account here, then continue to Stripe.
                Your trial access activates automatically after checkout.
              </p>
            ) : (
              <p className="mt-2">
                You will continue to Stripe Checkout. After payment, access or
                follow-up will use the details attached to this order.
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isOnlineLearningSignupCheckout
                ? "Create your account to continue to secure checkout"
                : "Continue to secure Stripe checkout"}
            </h1>
            <p className="mt-3 leading-7 text-slate-600">
              {isOnlineLearningSignupCheckout
                ? "Your account saves lesson progress, mastery results and subscription access across devices. After this step you will go to Stripe's secure checkout page."
                : "No card details are entered on this site. Stripe handles the secure payment page."}
            </p>
            {isOnlineLearningSignupCheckout ? (
              <p className="mt-3 text-sm font-medium text-slate-500">
                No charge today &middot; then $19/month &middot; cancel any time
                &middot; secure payment through Stripe
              </p>
            ) : null}
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
              {isOnlineLearningSignupCheckout &&
              errorMessage.includes("already has a Nova Maths account") ? (
                <Link
                  href="/login?next=%2Fcheckout%3Foffer%3Donline-learning"
                  className="mt-2 inline-block font-semibold underline"
                >
                  Log in to continue checkout
                </Link>
              ) : null}
            </div>
          ) : null}

          {notice ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {notice}
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

            {isOnlineLearningSignupCheckout ? (
              <>
                <label className="space-y-1">
                  <span className="text-sm font-medium text-slate-800">
                    Email
                  </span>
                  <input
                    type="email"
                    value={accountEmail}
                    onChange={(event) => setAccountEmail(event.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-medium text-slate-800">
                    Password
                  </span>
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

                <label className="space-y-1">
                  <span className="text-sm font-medium text-slate-800">
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
              </>
            ) : (
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
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
          >
            {isSubmitting
              ? isOnlineLearningSignupCheckout
                ? "Creating account and opening secure checkout..."
                : "Redirecting to Stripe checkout..."
              : isOnlineLearningSignupCheckout
                ? "Create account and start 7-day free trial"
                : "Continue to secure Stripe checkout"}
          </button>

          {isOnlineLearningSignupCheckout ? (
            <p className="mt-4 text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login?next=%2Fcheckout%3Foffer%3Donline-learning"
                className="font-semibold text-slate-950 underline"
              >
                Log in to continue checkout
              </Link>
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
