import type { ReactNode } from "react";
import { TopicBreakdownCard, type BreakdownTopic } from "./TopicBreakdownCard";

/**
 * Static, illustrative "what you get after the diagnostic" panel.
 * Presentational only — no live data. The CTA is passed in so each page
 * can supply its own (tracked) "Start free diagnostic" button.
 */

const topics: BreakdownTopic[] = [
  { name: "Functions", score: 82 },
  { name: "Calculus", score: 41 },
  { name: "Probability", score: 57 },
  { name: "Financial Maths", score: 88 },
];

const overallReadiness = 67;
const recommendedLesson = "Applications of Differentiation";

export function DiagnosticResultPreview({
  cta,
}: Readonly<{ cta: ReactNode }>) {
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

      <div className="mt-8">
        <TopicBreakdownCard
          title="HSC Advanced Diagnostic"
          subtitle="Your topic breakdown"
          statusLabel="Completed"
          topics={topics}
          overallScore={overallReadiness}
          recommended={{
            title: recommendedLesson,
            description: "Targets your weakest topic first.",
          }}
        />
      </div>

      <p className="mt-3 text-xs text-slate-400">Example result shown.</p>

      <div className="mt-6">{cta}</div>
    </section>
  );
}
