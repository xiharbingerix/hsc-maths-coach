import type { ReactNode } from "react";
import { TopicBreakdownCard, type BreakdownTopic } from "./TopicBreakdownCard";

/**
 * Static, illustrative "personalised study dashboard" preview — what Nova
 * produces after a diagnostic. Presentational only, no live data. The CTA is
 * passed in so each page can supply its own (tracked) button.
 *
 * Keeps the topic scores + progress bars (TopicBreakdownCard) and adds the
 * study-system layer: priority topics, estimated improvement time and a
 * generated week-by-week revision plan.
 */

const topics: BreakdownTopic[] = [
  { name: "Functions", score: 82 },
  { name: "Calculus", score: 41 },
  { name: "Probability", score: 57 },
  { name: "Financial Maths", score: 88 },
];

const overallReadiness = 67;

const priorityTopics = [
  "Applications of Differentiation",
  "Related Rates",
  "Optimisation Problems",
];

const revisionPlan = [
  {
    week: "Week 1",
    items: ["Applications of Differentiation", "Related Rates"],
  },
  {
    week: "Week 2",
    items: ["Optimisation", "Exam-style questions"],
  },
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

function ClockIcon() {
  return (
    <svg
      className="h-6 w-6 text-slate-700"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PanelLabel({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
}

export function DiagnosticResultPreview({
  cta,
}: Readonly<{ cta: ReactNode }>) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Personalised study dashboard
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          See your results in minutes
        </h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">
          After the diagnostic, Nova Maths builds a personalised study dashboard
          — your weak topics, the order to fix them, and a week-by-week revision
          plan.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {/* Topic scores + progress bars (unchanged) */}
        <TopicBreakdownCard
          title="HSC Advanced — Study Plan"
          subtitle="Personalised from your diagnostic"
          statusLabel="Revision plan generated"
          topics={topics}
          overallScore={overallReadiness}
          recommended={{
            title: "Applications of Differentiation",
            description: "Targets your weakest topic first.",
          }}
        />

        {/* Priority topics + estimated improvement time */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <PanelLabel>Priority topics</PanelLabel>
            <ol className="mt-4 space-y-3">
              {priorityTopics.map((topic, index) => (
                <li key={topic} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {topic}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <PanelLabel>Estimated improvement time</PanelLabel>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <ClockIcon />
              </span>
              <div>
                <p className="text-2xl font-bold tracking-tight text-slate-900">
                  3–4 hours
                </p>
                <p className="text-sm text-slate-600">of focused revision</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generated revision plan */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <PanelLabel>Generated revision plan</PanelLabel>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {revisionPlan.map((week) => (
              <div
                key={week.week}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="text-sm font-bold text-slate-900">{week.week}</p>
                <ul className="mt-3 space-y-2">
                  {week.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-6 text-slate-700"
                    >
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">Example result shown.</p>

      <div className="mt-6">{cta}</div>
    </section>
  );
}
