import type { ReactNode } from "react";

/**
 * Static, illustrative "what you get after the diagnostic" panel.
 * Presentational only — no live data. The CTA is passed in so each page
 * can supply its own (tracked) "Start free diagnostic" button.
 */

type Topic = {
  name: string;
  score: number;
};

const topics: Topic[] = [
  { name: "Functions", score: 82 },
  { name: "Calculus", score: 41 },
  { name: "Probability", score: 57 },
  { name: "Financial Maths", score: 88 },
];

const overallReadiness = 67;
const recommendedLesson = "Applications of Differentiation";

type Tone = {
  bar: string;
  dot: string;
  badgeBg: string;
  badgeText: string;
  label: string;
};

function toneFor(score: number): Tone {
  if (score >= 70) {
    return {
      bar: "bg-emerald-500",
      dot: "bg-emerald-500",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-700",
      label: "On track",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-amber-500",
      dot: "bg-amber-500",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-700",
      label: "Needs work",
    };
  }
  return {
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    label: "Priority",
  };
}

function TopicRow({ topic }: Readonly<{ topic: Topic }>) {
  const tone = toneFor(topic.score);
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone.dot}`} />
          <span className="truncate text-sm font-medium text-slate-800">
            {topic.name}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`hidden rounded-full px-2 py-0.5 text-xs font-semibold sm:inline ${tone.badgeBg} ${tone.badgeText}`}
          >
            {tone.label}
          </span>
          <span className="w-10 text-right text-sm font-bold tabular-nums text-slate-900">
            {topic.score}%
          </span>
        </div>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label={`${topic.name} score`}
        aria-valuenow={topic.score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${tone.bar}`}
          style={{ width: `${topic.score}%` }}
        />
      </div>
    </div>
  );
}

export function DiagnosticResultPreview({
  cta,
}: Readonly<{ cta: ReactNode }>) {
  const overallTone = toneFor(overallReadiness);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          What you get
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          See your results in minutes
        </h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">
          After the diagnostic, Nova Maths identifies your strongest and weakest
          topics and recommends what to revise next.
        </p>
      </div>

      {/* Mock product interface */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
        {/* App-style header bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
              N
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                HSC Advanced Diagnostic
              </p>
              <p className="text-xs text-slate-500">Your topic breakdown</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
        </div>

        {/* Body */}
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {/* Topic breakdown */}
          <div className="space-y-5">
            {topics.map((topic) => (
              <TopicRow key={topic.name} topic={topic} />
            ))}
          </div>

          {/* Overall + recommendation */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Overall readiness
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-bold tracking-tight text-slate-900">
                  {overallReadiness}%
                </span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${overallTone.bar}`}
                  style={{ width: `${overallReadiness}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Recommended next lesson
              </p>
              <p className="mt-2 text-lg font-semibold leading-7">
                {recommendedLesson}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Targets your weakest topic first.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">Example result shown.</p>

      <div className="mt-6">{cta}</div>
    </section>
  );
}
