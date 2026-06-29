import type { ReactNode } from "react";

/**
 * Value-focused pricing comparison: a private tutor vs Nova Maths.
 * Nova is highlighted as the recommended option. The page passes in its
 * own (tracked) CTAs via the `cta` slot.
 */

const tutorPoints = ["Limited time", "Weekly sessions", "Expensive"];

const novaPoints = [
  "Unlimited lessons",
  "Unlimited quizzes",
  "Unlimited diagnostics",
  "Available anytime",
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function PricingComparison({ cta }: Readonly<{ cta: ReactNode }>) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-6 shadow-sm sm:p-8 md:p-10">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Start free. Continue for $19/month.
        </h2>
      </div>

      <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
        {/* Private tutor */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-slate-900">Private Tutor</h3>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            $70&ndash;$120
            <span className="text-base font-medium text-slate-500">/hour</span>
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            {tutorPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nova Maths — recommended */}
        <div className="relative flex flex-col rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-sm">
          <span className="absolute -top-3 left-6 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            Recommended
          </span>
          <h3 className="text-lg font-bold text-slate-900">Nova Maths</h3>
          <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            $19
            <span className="text-base font-medium text-slate-500">/month</span>
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            {novaPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        {cta}
      </div>
      <p className="mt-3 text-sm text-slate-500">
        Free lessons &amp; practice &middot; Upgrade for exams + AI &middot; $19/month &middot; Cancel anytime
      </p>
    </section>
  );
}
