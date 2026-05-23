import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../lib/adminSession";
import { scoreDiagnostic } from "../../../../../lib/diagnosticScoring";
import {
  diagnosticInterpretation,
  getRepeatedWeakAreas,
  getUnitBreakdown,
  groupRecommendedLessons,
} from "../../../../../lib/reportDraft";
import type { DiagnosticSubmission } from "../../../../../lib/reportTypes";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { PrintButton } from "./PrintButton";

type ReportPdfPageProps = {
  params: Promise<{ submissionId: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function SummaryList({
  items,
  fallback,
}: {
  items: string[];
  fallback: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-600">{fallback}</p>;
  }

  return (
    <ul className="space-y-1 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item} className="pl-3">
          - {item}
        </li>
      ))}
    </ul>
  );
}

function ReportNotes({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-7 text-slate-700">
      {text.split("\n").map((line, index) => {
        const key = `${line}-${index}`;
        const trimmed = line.trim();

        if (trimmed === "") {
          return <div key={key} className="h-2" />;
        }

        if (!trimmed.startsWith("-") && !trimmed.startsWith("  -")) {
          return (
            <h3
              key={key}
              className="pt-3 text-base font-semibold text-slate-950"
            >
              {trimmed}
            </h3>
          );
        }

        if (trimmed.startsWith("  -")) {
          return (
            <p key={key} className="pl-6">
              {trimmed}
            </p>
          );
        }

        return (
          <p key={key} className="pl-3">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 print:p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-semibold">{value || "Not provided"}</p>
    </div>
  );
}

async function fetchSubmission(submissionId: string) {
  const { data, error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      notFound();
    }

    throw new Error(
      `${error.message}. If report workflow columns are missing, add report_status, report_notes, follow_up_required, offer_selected, and report_sent_at to diagnostic_submissions.`
    );
  }

  return data as DiagnosticSubmission;
}

export default async function ReportPdfPage({ params }: ReportPdfPageProps) {
  await requireAdmin();

  const { submissionId } = await params;
  const submission = await fetchSubmission(submissionId);
  const score = scoreDiagnostic(submission.answers, submission.confidence);
  const unitBreakdown = getUnitBreakdown(score);
  const groupedLessons = groupRecommendedLessons(score);
  const repeatedWeakAreas = getRepeatedWeakAreas(score);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 print:bg-white print:px-0 print:py-0">
      <style>{`
        @page {
          size: A4;
          margin: 14mm;
        }

        @media print {
          .avoid-break {
            break-inside: avoid;
          }
        }
      `}</style>

      <div className="mx-auto mb-4 flex max-w-4xl items-center justify-between gap-3 print:hidden">
        <Link
          href={`/admin/reports/${submission.id}`}
          className="text-sm font-semibold text-slate-600 underline"
        >
          Back to editor
        </Link>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-4xl space-y-8 rounded-3xl bg-white p-8 shadow-sm print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <header className="border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            HSC Maths Advanced Diagnostic Report
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Prepared for {submission.student_first_name} from the diagnostic
            submitted on {formatDate(submission.created_at)}.
          </p>
        </header>

        <section className="avoid-break">
          <h2 className="text-xl font-semibold">Student snapshot</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <DetailCard label="Student" value={submission.student_first_name} />
            <DetailCard label="Parent email" value={submission.parent_email} />
            <DetailCard label="Year level" value={submission.year_level} />
            <DetailCard label="Course" value={submission.course} />
            <DetailCard label="Target result" value={submission.target_result} />
            <DetailCard
              label="Next assessment"
              value={submission.assessment_timing}
            />
            <DetailCard
              label="Selected offer"
              value={submission.offer_selected || "Not selected"}
            />
          </div>
        </section>

        <section className="avoid-break rounded-2xl border border-slate-200 p-5">
          <h2 className="text-xl font-semibold">Overall result</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold">{score.percentage}%</p>
              <p className="text-sm text-slate-600">overall score</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {score.correct}/{score.totalQuestions}
              </p>
              <p className="text-sm text-slate-600">correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {score.attempted}/{score.totalQuestions}
              </p>
              <p className="text-sm text-slate-600">attempted</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{score.idk}</p>
              <p className="text-sm text-slate-600">I don't know</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            {diagnosticInterpretation(score)}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This diagnostic is designed to identify priority areas, not to act
            as a school result. The most useful next step is to target the areas
            where marks are most likely being lost.
          </p>
        </section>

        <section className="avoid-break">
          <h2 className="text-xl font-semibold">Unit breakdown</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {unitBreakdown.map((unit) => (
                  <tr key={unit.unit}>
                    <td className="px-4 py-3 font-medium">{unit.unit}</td>
                    <td className="px-4 py-3">
                      {unit.total === null
                        ? "Not enough evidence"
                        : `${unit.correct}/${unit.total} (${unit.percentage}%)`}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      {unit.interpretation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="avoid-break rounded-2xl border border-slate-200 p-5">
            <h2 className="text-xl font-semibold">Strengths</h2>
            <div className="mt-3">
              <SummaryList
                items={score.strengths}
                fallback="No clear strength area was identified from this diagnostic alone."
              />
            </div>
          </div>
          <div className="avoid-break rounded-2xl border border-slate-200 p-5">
            <h2 className="text-xl font-semibold">Priority areas</h2>
            <div className="mt-3">
              <SummaryList
                items={score.priorities}
                fallback="No single priority area stood out strongly from this diagnostic."
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These areas should be addressed first because they are likely to
              produce the highest improvement.
            </p>
          </div>
        </section>

        <section className="avoid-break rounded-2xl border border-slate-200 p-5">
          <h2 className="text-xl font-semibold">Likely mark leaks</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-950">
                High-confidence errors
              </h3>
              <div className="mt-2">
                <SummaryList
                  items={score.highConfidenceErrors}
                  fallback="No major high-confidence error pattern was detected."
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                High-confidence errors can indicate misconceptions rather than
                simple uncertainty.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-950">
                Repeated weak patterns
              </h3>
              <div className="mt-2">
                <SummaryList
                  items={repeatedWeakAreas}
                  fallback="No repeated weak-tag pattern was detected beyond the priority areas."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="avoid-break">
          <h2 className="text-xl font-semibold">Recommended next lessons</h2>
          {groupedLessons.length > 0 ? (
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {groupedLessons.map((group) => (
                <div
                  key={group.unit}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <h3 className="font-semibold">{group.unit}</h3>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-700">
                    {group.lessons.map((lesson) => (
                      <li key={lesson.href}>
                        - {lesson.title}: {lesson.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              Start with the course unit that best matches the weakest listed
              section, or revise the weakest sections directly.
            </p>
          )}
        </section>

        <section className="avoid-break">
          <h2 className="text-xl font-semibold">30-day plan</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              [
                "Week 1",
                "Address the top priority weakness and reattempt similar diagnostic-style questions.",
              ],
              [
                "Week 2",
                "Work through targeted lessons, then complete guided and independent practice.",
              ],
              [
                "Week 3",
                "Complete mastery quizzes for priority lessons and review high-confidence errors.",
              ],
              [
                "Week 4",
                "Complete mixed practice and recheck weak areas before the next assessment.",
              ],
            ].map(([week, text]) => (
              <div key={week} className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-semibold">{week}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-5">
          <h2 className="text-xl font-semibold">Report notes</h2>
          <div className="mt-4">
            <ReportNotes
              text={
                submission.report_notes?.trim() ||
                "No report notes have been saved yet. Open the editor to generate or write a report draft."
              }
            />
          </div>
        </section>

        <footer className="avoid-break border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
          <p>This diagnostic is for learning support only.</p>
          <p>
            It is not an official school result. Results should be interpreted
            alongside school feedback and recent assessment performance.
          </p>
        </footer>
      </article>
    </main>
  );
}
