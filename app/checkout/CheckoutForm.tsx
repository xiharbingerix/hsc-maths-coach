"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { offerConfigs, type OfferSlug } from "../../lib/offers";
import { supabase } from "../../lib/supabaseClient";

type CheckoutFormProps = {
  offerSlug: OfferSlug;
};

export function CheckoutForm({ offerSlug }: CheckoutFormProps) {
  const offer = offerConfigs[offerSlug];
  const [user, setUser] = useState<User | null>(null);
  const [parentEmail, setParentEmail] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser?.email) {
        setParentEmail(sessionUser.email);
      }

      if (sessionUser?.user_metadata?.student_first_name) {
        setStudentFirstName(String(sessionUser.user_metadata.student_first_name));
      }
    }

    loadSession();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          offer: offer.slug,
          parentEmail,
          studentFirstName,
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
              <>
                <p className="mt-2">
                  Access activates automatically after payment when you are
                  logged in.
                </p>
                <p className="mt-2">
                  If you pay without an account, contact us so we can match
                  your payment to your login.
                </p>
              </>
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
              Continue to secure checkout
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
          ) : offer.slug === "online-learning" ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              You can still continue with an email, but online learning access
              may need manual account matching.{" "}
              <Link href="/login" className="font-semibold underline">
                Log in
              </Link>{" "}
              or{" "}
              <Link href="/signup" className="font-semibold underline">
                create an account
              </Link>{" "}
              first for the smoothest setup.
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4">
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
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
          >
            {isSubmitting
              ? "Redirecting to secure checkout..."
              : "Continue to secure checkout"}
          </button>
        </form>
      </div>
    </section>
  );
}
