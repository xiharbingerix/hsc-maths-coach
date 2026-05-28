import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/adminSession";
import { scoreDiagnostic, type DiagnosticScore } from "../../../../lib/diagnosticScoring";
import {
  generateDiagnosticReportDraft,
  getOrderedRecommendedLessons,
  getPriorityUnitGroups,
  getRepeatedWeakAreas,
  getStrengthSummary,
  getUnitBreakdown,
} from "../../../../lib/reportDraft";
import {
  reportStatuses,
  type DiagnosticSubmission,
} from "../../../../lib/reportTypes";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { CopyEmailButton } from "./CopyEmailButton";

type ReportPageProps = {
  params: Promise<{ submissionId: string }>;
};

const offerOptions = [
  "online-learning",
  "diagnostic-report",
  "study-plan",
];

const offerLabels: Record<string, string> = {
  "online-learning": "Online Learning Package",
  "diagnostic-report": "Diagnostic PDF Report",
  "study-plan": "Diagnostic + 30-Day Plan",
};

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

function formatUnitScore(unit: ReturnType<typeof getUnitBreakdown>[number]) {
  if (unit.total === null || unit.correct === null || unit.percentage === null) {
    return "Not enough evidence";
  }

  return `${unit.correct}/${unit.total} (${unit.percentage}%)`;
}

function parentGreeting(submission: DiagnosticSubmission) {
  if (submission.parent_first_name?.trim()) {
    return `Hi ${submission.parent_first_name.trim()},`;
  }

  return "Hi,";
}

function buildParentEmailTemplate({
  submission,
  score,
}: {
  submission: DiagnosticSubmission;
  score: DiagnosticScore;
}) {
  const priorityGroups = getPriorityUnitGroups(score);
  const topPriorities = priorityGroups.topPriorityUnits
    .map((unit) => unit.unit)
    .join(", ");
  const secondary = priorityGroups.secondaryConsolidation
    .map((unit) => unit.unit)
    .join(", ");
  const prioritySentence =
    topPriorities.length > 0
      ? `The clearest priority area${priorityGroups.topPriorityUnits.length === 1 ? " is" : "s are"} ${topPriorities}.`
      : "No single priority area stood out sharply, so the best next step is steady consolidation and mixed practice.";
  const secondarySentence =
    secondary.length > 0
      ? `The next consolidation area${priorityGroups.secondaryConsolidation.length === 1 ? " is" : "s are"} ${secondary}.`
      : "";

  return [
    parentGreeting(submission),
    "",
    `Thanks for completing the Nova Maths diagnostic for ${submission.student_first_name}. I have reviewed the result and prepared the diagnostic report.`,
    "",
    `Short summary: ${submission.student_first_name} scored ${score.correct}/${score.totalQuestions} (${score.percentage}%). ${prioritySentence} ${secondarySentence}`.trim(),
    "",
    "I've attached the diagnostic report PDF to this email.",
    "",
    "Suggested next step: start with the recommended lessons in the top priority area, then reattempt similar diagnostic-style questions before moving into broad mixed practice.",
    "",
    "Kind regards,",
    "Nova Maths by Joshua Taylor",
  ].join("\n");
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

async function generateReportDraft(formData: FormData) {
  "use server";

  await requireAdmin();

  const submissionId = String(formData.get("submission_id") ?? "");

  if (!submissionId) {
    throw new Error("Missing submission id.");
  }

  const submission = await fetchSubmission(submissionId);
  const score = scoreDiagnostic(submission.answers, submission.confidence);
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
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/reports/${submissionId}`);
  revalidatePath(`/admin/reports/${submissionId}/pdf`);
}

async function markReportSent(formData: FormData) {
  "use server";

  await requireAdmin();

  const submissionId = String(formData.get("submission_id") ?? "");

  if (!submissionId) {
    throw new Error("Missing submission id.");
  }

  const { error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .update({
      report_status: "sent",
      report_sent_at: new Date().toISOString(),
    })
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/reports/${submissionId}`);
  revalidatePath(`/admin/reports/${submissionId}/pdf`);
}

async function markFollowUpRequired(formData: FormData) {
  "use server";

  await requireAdmin();

  const submissionId = String(formData.get("submission_id") ?? "");

  if (!submissionId) {
    throw new Error("Missing submission id.");
  }

  const { error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .update({
      follow_up_required: true,
      report_status: "follow_up_required",
    })
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/reports/${submissionId}`);
  revalidatePath(`/admin/reports/${submissionId}/pdf`);
}

function SectionBreakdown({ score }: { score: DiagnosticScore }) {
  const units = getUnitBreakdown(score);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Unit</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Interpretation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {units.map((unit) => (
            <tr key={unit.unit}>
              <td className="px-4 py-3 font-medium text-slate-900">
                {unit.unit}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {unit.total === null
                  ? "Not enough evidence"
                  : `${unit.correct}/${unit.total} (${unit.percentage}%)`}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {unit.interpretation}
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
  const groupedLessons = getOrderedRecommendedLessons(score);
  const repeatedWeakAreas = getRepeatedWeakAreas(score);
  const priorityGroups = getPriorityUnitGroups(score);
  const strengthSummary = getStrengthSummary(score);
  const notesWereAutoGenerated = !initialSubmission.report_notes?.trim();
  const parentEmailTemplate = buildParentEmailTemplate({
    submission,
    score,
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/admin" className="text-slate-500 underline">
                  Back to admin
                </Link>
                <Link
                  href={`/admin/reports/${submission.id}/pdf`}
                  className="text-slate-500 underline"
                >
                  View PDF
                </Link>
              </div>
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

            <div className="flex flex-wrap gap-3">
              <form action={generateReportDraft}>
                <input
                  type="hidden"
                  name="submission_id"
                  value={submission.id}
                />
                <button
                  type="submit"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Generate report draft
                </button>
              </form>
              <Link
                href={`/admin/reports/${submission.id}/pdf`}
                className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View PDF
              </Link>
            </div>
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
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-950 shadow-sm">
              <h2 className="font-semibold">Report draft status</h2>
              <p className="mt-2">
                {notesWereAutoGenerated
                  ? "Report notes were empty, so a rule-based draft has been generated automatically."
                  : "Report notes already exist. Editing and saving notes updates the printable PDF."}
              </p>
              <p className="mt-2">
                Use Generate report draft to replace the notes with a fresh
                rule-based draft from the current scoring summary.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-semibold">{strengthSummary.title}</h2>
                <div className="mt-3">
                  <SummaryList
                    items={strengthSummary.items}
                    fallback={strengthSummary.note}
                  />
                </div>
                {strengthSummary.items.length > 0 ? (
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {strengthSummary.note}
                  </p>
                ) : null}
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-semibold">Top priority areas</h2>
                <div className="mt-3">
                  <SummaryList
                    items={priorityGroups.topPriorityUnits.map(
                      (unit) => `${unit.unit}: ${formatUnitScore(unit)}`
                    )}
                    fallback="No single priority area stood out strongly from this diagnostic."
                  />
                </div>
                {priorityGroups.secondaryConsolidation.length > 0 ? (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <h3 className="text-sm font-semibold text-slate-950">
                      Secondary consolidation
                    </h3>
                    <div className="mt-2">
                      <SummaryList
                        items={priorityGroups.secondaryConsolidation.map(
                          (unit) => `${unit.unit}: ${formatUnitScore(unit)}`
                        )}
                        fallback="No additional developing unit was identified."
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-semibold">High-confidence errors</h2>
                <div className="mt-3">
                  <SummaryList
                    items={score.highConfidenceErrors}
                    fallback="No major high-confidence error pattern was detected."
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  These can indicate misconceptions rather than simple
                  uncertainty.
                </p>
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
              {groupedLessons.length > 0 ? (
                <div className="mt-3 space-y-4">
                  {groupedLessons.map((group) => (
                    <div key={group.unit}>
                      <h3 className="text-sm font-semibold text-slate-950">
                        {group.unit}
                      </h3>
                      <div className="mt-2 grid gap-3 md:grid-cols-2">
                        {group.lessons.map((lesson) => (
                          <Link
                            key={lesson.href}
                            href={lesson.href}
                            className="rounded-xl border border-slate-200 p-3 text-sm transition hover:bg-slate-50"
                          >
                            <span className="font-semibold">
                              {lesson.title}
                            </span>
                            <span className="mt-1 block text-slate-600">
                              {lesson.reason}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  Start with the course unit that best matches the weakest
                  listed section, or revise the weakest sections directly.
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="font-semibold">Likely mark leaks</h2>
              <div className="mt-3">
                <SummaryList
                  items={repeatedWeakAreas}
                  fallback="No repeated weak-tag pattern was detected beyond the priority areas."
                />
              </div>
            </div>

            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="font-semibold">Parent email follow-up</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Copy this into your email client. No email is sent from the
                    app yet.
                  </p>
                  <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900">
                    Before sending, open the PDF report, save it as a PDF, and
                    attach it manually. The admin PDF link is not
                    parent-facing.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {submission.parent_email || "No parent email saved"}
                </span>
              </div>

              <label className="mt-4 block space-y-2">
                <span className="text-sm font-semibold text-slate-800">
                  Email template
                </span>
                <textarea
                  readOnly
                  value={parentEmailTemplate}
                  rows={12}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800"
                />
              </label>

              <div className="mt-4 flex flex-wrap gap-3">
                <CopyEmailButton text={parentEmailTemplate} />
                <Link
                  href={`/admin/reports/${submission.id}/pdf`}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Open PDF
                </Link>
                <form action={markReportSent}>
                  <input
                    type="hidden"
                    name="submission_id"
                    value={submission.id}
                  />
                  <button
                    type="submit"
                    className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
                  >
                    Mark report sent
                  </button>
                </form>
                <form action={markFollowUpRequired}>
                  <input
                    type="hidden"
                    name="submission_id"
                    value={submission.id}
                  />
                  <button
                    type="submit"
                    className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                  >
                    Mark follow-up required
                  </button>
                </form>
              </div>
            </section>
          </div>

          <form
            action={updateReport}
            className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"
          >
            <input type="hidden" name="submission_id" value={submission.id} />

            <div>
              <h2 className="text-xl font-semibold">Report notes and controls</h2>
              <p className="mt-1 text-sm text-slate-600">
                Edit commentary here. Saving notes updates the printable PDF.
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
                    {offerLabels[offer]}
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
                Save notes
              </button>
              <Link
                href={`/admin/reports/${submission.id}/pdf`}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View PDF
              </Link>
              <Link
                href="/admin"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Back to admin
              </Link>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
}
