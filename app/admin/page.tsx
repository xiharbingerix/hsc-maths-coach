import Link from "next/link";
import { requireAdmin } from "../../lib/adminSession";
import { scoreDiagnostic } from "../../lib/diagnosticScoring";
import type { DiagnosticSubmission } from "../../lib/reportTypes";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDateGroup(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "full",
  }).format(new Date(value));
}

function formatStatus(value: string | null | undefined) {
  return (value ?? "not_started").replace(/_/g, " ");
}

function groupSubmissionsByDate(submissions: DiagnosticSubmission[]) {
  return submissions.reduce<Record<string, DiagnosticSubmission[]>>(
    (groups, submission) => {
      const key = formatDateGroup(submission.created_at);
      return {
        ...groups,
        [key]: [...(groups[key] ?? []), submission],
      };
    },
    {}
  );
}

export default async function AdminPage() {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(
      `${error.message}. If report workflow columns are missing, add report_status, report_notes, follow_up_required, offer_selected, and report_sent_at to diagnostic_submissions.`
    );
  }

  const submissions = (data ?? []) as DiagnosticSubmission[];
  const groupedSubmissions = groupSubmissionsByDate(submissions);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              HSC Maths Coach
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Report dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review diagnostic submissions, open report editors, and view
              printable parent reports.
            </p>
          </div>

          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Log out
            </button>
          </form>
        </header>

        {submissions.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-slate-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedSubmissions).map(([date, items]) => (
              <section key={date} className="space-y-3">
                <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {date}
                </h2>

                <div className="space-y-3">
                  {items.map((submission) => {
                    const score = scoreDiagnostic(
                      submission.answers,
                      submission.confidence
                    );

                    return (
                      <article
                        key={submission.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-950">
                                {submission.student_first_name}
                              </h3>
                              <p className="mt-1 text-sm text-slate-600">
                                {submission.parent_email}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Submitted {formatDateTime(submission.created_at)}
                              </p>
                            </div>

                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Year:</span>{" "}
                                {submission.year_level ?? "Not provided"}
                              </p>
                              <p>
                                <span className="font-medium">Course:</span>{" "}
                                {submission.course ?? "Not provided"}
                              </p>
                              <p>
                                <span className="font-medium">Offer:</span>{" "}
                                {submission.offer_selected ?? "Not selected"}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-sm font-semibold capitalize text-white">
                                {formatStatus(submission.report_status)}
                              </span>
                              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
                                Score {score.correct}/{score.totalQuestions} (
                                {score.percentage}%)
                              </span>
                              {submission.follow_up_required ? (
                                <span className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-900">
                                  Follow-up required
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 lg:justify-end">
                            <Link
                              href={`/admin/reports/${submission.id}`}
                              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Open report
                            </Link>
                            <Link
                              href={`/admin/reports/${submission.id}/pdf`}
                              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                            >
                              View PDF
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
