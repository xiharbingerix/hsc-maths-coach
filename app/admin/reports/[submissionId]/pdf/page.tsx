import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../lib/adminSession";
import { scoreDiagnostic } from "../../../../../lib/diagnosticScoring";
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
        <li key={item}>- {item}</li>
      ))}
    </ul>
  );
}

function ReportNotes({ text }: { text: string }) {
  return (
    <div className="space-y-3 text-sm leading-7 text-slate-700">
      {text.split("\n").map((line, index) => {
        const key = `${line}-${index}`;

        if (line.trim() === "") {
          return <div key={key} className="h-2" />;
        }

        if (!line.startsWith("-") && line.endsWith(":")) {
          return (
            <h3 key={key} className="pt-2 text-base font-semibold text-slate-950">
              {line}
            </h3>
          );
        }

        return <p key={key}>{line}</p>;
      })}
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

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 print:bg-white print:px-0 print:py-0">
      <style>{`
        @page {
          size: A4;
          margin: 14mm;
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

        <section className="grid gap-3 md:grid-cols-2">
          {[
            ["Student", submission.student_first_name],
            ["Year level", submission.year_level ?? "Not provided"],
            ["Course", submission.course ?? "Not provided"],
            ["Target result", submission.target_result ?? "Not provided"],
            ["Next assessment", submission.assessment_timing || "Not provided"],
            ["Parent email", submission.parent_email],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-4 print:p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-1 font-semibold">{value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 p-5">
          <h2 className="text-xl font-semibold">Overall summary</h2>
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
        </section>

        <section>
          <h2 className="text-xl font-semibold">Section breakdown</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {score.bySection.map((section) => (
                  <tr key={section.section}>
                    <td className="px-4 py-3 font-medium">{section.section}</td>
                    <td className="px-4 py-3">
                      {section.correct}/{section.total} ({section.percentage}%)
                    </td>
                    <td className="px-4 py-3">
                      {section.averageConfidence ?? "Not selected"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Strengths</h2>
            <div className="mt-3">
              <SummaryList
                items={score.strengths}
                fallback="No clear strength area was identified from this diagnostic alone."
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Priority areas</h2>
            <div className="mt-3">
              <SummaryList
                items={score.priorities}
                fallback="No single priority area stood out strongly from this diagnostic."
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Recommended next steps</h2>
          {score.recommendedNextLessons.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              {score.recommendedNextLessons.map((lesson) => (
                <li key={lesson.href}>
                  - {lesson.title}: {lesson.reason}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              Start with the course unit that best matches the weakest listed
              section, or revise the weakest sections directly.
            </p>
          )}
        </section>

        <section>
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

        <footer className="border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
          <p>This diagnostic is for learning support only.</p>
          <p>
            It is not an official school result or a guarantee of future
            performance.
          </p>
        </footer>
      </article>
    </main>
  );
}
