"use client";

import Link from "next/link";
import { useState } from "react";
import { getOfferConfig } from "../../lib/offers";
import { supabase } from "../../lib/supabaseClient";

type Offer = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

type EnquireFormProps = {
  offers: Offer[];
  initialOffer: string;
};

const offerLabels: Record<string, string> = {
  "online-learning": "Online Learning Access",
  "diagnostic-report": "Diagnostic PDF Report",
  "study-plan": "Diagnostic + 30-Day Plan",
  "weekly-tutoring": "Weekly Tutoring",
};

const offerHelperText: Record<string, string> = {
  "online-learning":
    "Online learning is self-serve. Start the 7-day free trial when you are ready, or submit this form if you need help first.",
  "diagnostic-report":
    "Request a parent-friendly PDF report after completing the diagnostic. Reports are manually reviewed before being sent.",
  "study-plan":
    "Request a diagnostic report plus a focused month of revision priorities based on the student's results.",
  "weekly-tutoring":
    "Joshua's weekly tutoring spots are currently full. You can still ask to be contacted if availability changes.",
};

const successFollowUpText: Record<string, string> = {
  "online-learning":
    "If you are ready to begin, continue to checkout to start the 7-day free trial.",
  "weekly-tutoring":
    "Joshua will only follow up if a tutoring spot becomes available or there is another suitable next step.",
};

export function EnquireForm({ offers, initialOffer }: EnquireFormProps) {
  const fallbackOffer = offers[0]?.id ?? "online-learning";
  const [offerSelected, setOfferSelected] = useState(
    offers.some((offer) => offer.id === initialOffer)
      ? initialOffer
      : fallbackOffer
  );
  const [studentFirstName, setStudentFirstName] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [yearLevel, setYearLevel] = useState("Year 12");
  const [course, setCourse] = useState("Maths Advanced");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const selectedOfferConfig = getOfferConfig(offerSelected);
  const checkoutHref =
    selectedOfferConfig?.checkoutEnabled && selectedOfferConfig.checkoutHref
      ? selectedOfferConfig.checkoutHref
      : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const { error } = await supabase.from("enquiries").insert({
      offer_selected: offerSelected,
      student_first_name: studentFirstName,
      parent_first_name: parentFirstName,
      parent_email: parentEmail,
      year_level: yearLevel,
      course,
      message: message || null,
      status: "new",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setIsSubmitting(false);
  }

  if (submitted) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Enquiry received
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Thanks - your enquiry has been received.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          Selected interest:{" "}
          <span className="font-semibold text-slate-950">
            {offerLabels[offerSelected] ?? offerSelected}
          </span>
          .
        </p>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-950">Next steps</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>Complete the diagnostic if you have not already.</li>
            <li>Start the 7-day free trial if you want online learning access.</li>
            <li>
              {successFollowUpText[offerSelected] ??
                "Joshua will follow up about report or support options."}
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={`/diagnostic?offer=${offerSelected}`}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Start diagnostic
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Create account
          </Link>
          <Link
            href="/online-learning"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            View online learning
          </Link>
          {checkoutHref ? (
            <Link
              href={checkoutHref}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Continue to checkout
            </Link>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {offers.map((offer) => {
          const isSelected = offerSelected === offer.id;

          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => setOfferSelected(offer.id)}
              className={`flex flex-col rounded-3xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isSelected
                  ? "border-slate-950 ring-2 ring-slate-950/10"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {offer.subtitle}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{offer.title}</h2>
                </div>
                {isSelected ? (
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                    Selected
                  </span>
                ) : null}
              </div>

              <p className="mt-4 flex-1 leading-7 text-slate-600">
                {offer.description}
              </p>
            </button>
          );
        })}
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Enquiry details
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Tell us where to follow up
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {offerHelperText[offerSelected] ?? "This saves your interest even if you do not complete the diagnostic today."}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            No payment is taken through this form. Joshua will follow up with
            next steps if a manual reply is needed.
          </p>
        </div>

        {errorMessage ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
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
              Parent/guardian first name
            </span>
            <input
              value={parentFirstName}
              onChange={(event) => setParentFirstName(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="space-y-1 md:col-span-2">
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
              Year level
            </span>
            <select
              value={yearLevel}
              onChange={(event) => setYearLevel(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option>Year 12</option>
              <option>Year 11</option>
              <option>Other</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-800">Course</span>
            <select
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option>Maths Advanced</option>
              <option>Maths Standard</option>
              <option>Extension 1</option>
              <option>Extension 2</option>
              <option>Not sure</option>
            </select>
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium text-slate-800">
              Optional message
            </span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Tell us about upcoming trials, current topics, or what kind of support you are looking for."
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit enquiry"}
          </button>
          {checkoutHref ? (
            <Link
              href={checkoutHref}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              Continue to checkout
            </Link>
          ) : null}
        </div>
      </form>
    </>
  );
}
