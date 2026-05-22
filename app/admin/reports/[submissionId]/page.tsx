import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/adminSession";
import { scoreDiagnostic, type DiagnosticScore } from "../../../../lib/diagnosticScoring";
import { generateDiagnosticReportDraft } from "../../../../lib/reportDraft";
import {
  reportStatuses,
  type DiagnosticSubmission,
} from "../../../../lib/reportTypes";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

type ReportPageProps = {
  params: Promise<{ submissionId: string }>;
};

const offerOptions = [
  "Diagnostic + personalised 30-day plan",
  "Review call option",
];

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatStatus(value: string | null | undefined) {
  return (value ?? "not_started").replace(/_/g, " ");
}

function SummaryList({
  items,
  fallback,
}: {
  items: string[];
  fallback: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{fallback}</p>;
  }

  return (
    <ul className="space-y-2 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item}>- {item}</li>
      ))}
    </ul>
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

async function ensureReportDraft(submission: DiagnosticSubmission) {
  const score = scoreDiagnostic(submission.answers, submission.confidence);

  if (submission.report_notes?.trim()) {
    return {
      submission,
      score,
      reportNotes: submission.report_notes,
    };
  }

  const reportNotes = generateDiagnosticReportDraft(submission, score);
  const updateValues: {
    report_notes: string;
    report_status?: string;
  } = {
    report_notes: reportNotes,
  };

  if ((submission.report_status ?? "not_started") === "not_started") {
    updateValues.report_status = "drafted";
  }

  const { error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .update(updateValues)
    .eq("id", submission.id);

  if (error) {
    throw new Error(error.message);
  }

  return {
    submission: {
      ...submission,
      report_notes: reportNotes,
      report_status: updateValues.report_status ?? submission.report_status,
    },
    score,
    reportNotes,
  };
}

async function updateReport(formData: FormData) {
  "use server";

  await requireAdmin();

  const submissionId = String(formData.get("submission_id") ?? "");
  const reportNotes = String(formData.get("report_notes") ?? "");
  const reportStatus = String(formData.get("report_status") ?? "");
  const offerSelected = String(formData.get("offer_selected") ?? "");
  const followUpRequired = formData.get("follow_up_required") === "on";

  if (
    !submissionId ||
    !(reportStatuses as readonly string[]).includes(reportStatus)
  ) {
    throw new Error("Invalid report update.");
  }

  const updateValues: {
    report_notes: string;
    report_status: string;
    follow_up_required: boolean;
    offer_selected: string | null;
    report_sent_at?: string;
  } = {
    report_notes: reportNotes,
    report_status: reportStatus,
    follow_up_required: followUpRequired,
    offer_selected: offerSelected || null,
  };

  if (reportStatus === "sent") {
    updateValues.report_sent_at = new Date().toISOString();
  }

  const { error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .update(updateValues)
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/reports/${submissionId}`);
  revalidatePath(`/admin/reports/${submissionId}/pdf`);
}

function SectionBreakdown({ score }: { score: DiagnosticScore }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
              <td className="px-4 py-3 font-medium text-slate-900">
                {section.section}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {section.correct}/{section.total} ({section.percentage}%)
              </td>
              <td className="px-4 py-3 text-slate-700">
                {section.averageConfidence ?? "Not selected"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ReportEditorPage({ params }: ReportPageProps) {
  await requireAdmin();

  const { submissionId } = await params;
  const initialSubmission = await fetchSubmission(submissionId);
  const { submission, score, reportNotes } =
    await ensureReportDraft(initialSubmission);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Link
                href="/admin"
                className="text-sm font-semibold text-slate-500 underline"
              >
                Back to dashboard
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Report editor
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {submission.student_first_name}
              </h1>
              <p className="mt-2 text-slate-600">
                Parent email: {submission.parent_email}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Submitted {formatDateTime(submission.created_at)}
              </p>
            </div>

            <Link
              href={`/admin/reports/${submission.id}/pdf`}
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View printable PDF
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Year level", submission.year_level ?? "Not provided"],
            ["Course", submission.course ?? "Not provided"],
            ["Target", submission.target_result ?? "Not provided"],
            ["Assessment", submission.assessment_timing || "Not provided"],
            ["Offer", submission.offer_selected ?? "Not selected"],
            ["Status", formatStatus(submission.report_status)],
            ["Overall score", `${score.correct}/${score.totalQuestions} (${score.percentage}%)`],
            ["Follow-up", submission.follow_up_required ? "Required" : "Not required"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-2 font-semibold text-slate-950">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <SectionBreakdown score={score} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-semibold">Strengths</h2>
                <div className="mt-3">
                  <SummaryList
                    items={score.strengths}
                    fallback="No clear strength area was identified from this diagnostic alone."
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-semibold">Priority weak areas</h2>
                <div className="mt-3">
                  <SummaryList
                    items={score.priorities}
                    fallback="No single priority area stood out strongly from this diagnostic."
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-semibold">High-confidence errors</h2>
                <div className="mt-3">
                  <SummaryList
                    items={score.highConfidenceErrors}
                    fallback="No major high-confidence error pattern was detected."
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-semibold">Low-confidence correct answers</h2>
                <div className="mt-3">
                  <SummaryList
                    items={score.lowConfidenceCorrectAnswers}
                    fallback="No clear low-confidence correct pattern was detected."
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="font-semibold">Recommended next lessons</h2>
              {score.recommendedNextLessons.length > 0 ? (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {score.recommendedNextLessons.map((lesson) => (
                    <Link
                      key={lesson.href}
                      href={lesson.href}
                      className="rounded-xl border border-slate-200 p-3 text-sm transition hover:bg-slate-50"
                    >
                      <span className="font-semibold">{lesson.title}</span>
                      <span className="mt-1 block text-slate-600">
                        {lesson.reason}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  Start with the Differential Calculus pathway or revise the
                  weakest listed sections.
                </p>
              )}
            </div>
          </div>

          <form
            action={updateReport}
            className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"
          >
            <input type="hidden" name="submission_id" value={submission.id} />

            <div>
              <h2 className="text-xl font-semibold">Report controls</h2>
              <p className="mt-1 text-sm text-slate-600">
                Edit commentary, save workflow status, and keep the printable
                report current.
              </p>
            </div>

            <label className="block space-y-1">
              <span className="text-sm font-semibold text-slate-800">
                Report status
              </span>
              <select
                name="report_status"
                defaultValue={submission.report_status ?? "not_started"}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm capitalize"
              >
                {reportStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-semibold text-slate-800">
                Offer selected
              </span>
              <select
                name="offer_selected"
                defaultValue={submission.offer_selected ?? ""}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">No offer selected</option>
                {offerOptions.map((offer) => (
                  <option key={offer} value={offer}>
                    {offer}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm">
              <input
                type="checkbox"
                name="follow_up_required"
                defaultChecked={Boolean(submission.follow_up_required)}
                className="mt-1"
              />
              <span>Follow-up required</span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-800">
                Report notes
              </span>
              <textarea
                name="report_notes"
                defaultValue={reportNotes}
                rows={26}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6"
              />
            </label>

            {submission.report_sent_at ? (
              <p className="text-sm text-slate-500">
                Sent at {formatDateTime(submission.report_sent_at)}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Save report
              </button>
              <Link
                href={`/admin/reports/${submission.id}/pdf`}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View PDF
              </Link>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
}
