import { Fragment } from "react";

/**
 * Visual learning pathway — a horizontal roadmap of the Nova process that
 * collapses to a vertical timeline on mobile. Presentational only.
 */

const steps = [
  "Diagnostic",
  "Weak Topics Identified",
  "Personalised Lesson Path",
  "Guided Practice",
  "Mastery Quiz",
  "Exam Confidence",
];

function Chevron({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={`h-5 w-5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function StepNode({
  index,
  isLast,
}: Readonly<{ index: number; isLast: boolean }>) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
        isLast ? "bg-emerald-600 text-white" : "bg-slate-950 text-white"
      }`}
    >
      {index + 1}
    </span>
  );
}

export function LearningPathway() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          The Nova pathway
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          From weak topic to exam confidence
        </h2>
      </div>

      {/* Desktop: horizontal roadmap with arrow connectors */}
      <div className="mt-10 hidden items-start lg:flex">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <Fragment key={step}>
              <div className="flex flex-1 flex-col items-center px-2 text-center">
                <StepNode index={index} isLast={isLast} />
                <span
                  className={`mt-3 text-sm font-semibold ${
                    isLast ? "text-emerald-700" : "text-slate-800"
                  }`}
                >
                  {step}
                </span>
              </div>
              {!isLast && (
                <Chevron className="mt-3.5 shrink-0 text-slate-300" />
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Mobile / tablet: vertical timeline with arrow connectors */}
      <div className="mt-8 space-y-2 lg:hidden">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <Fragment key={step}>
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <StepNode index={index} isLast={isLast} />
                <span
                  className={`text-sm font-semibold ${
                    isLast ? "text-emerald-700" : "text-slate-800"
                  }`}
                >
                  {step}
                </span>
              </div>
              {!isLast && (
                <div className="flex justify-center">
                  <Chevron className="rotate-90 text-slate-300" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
