import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GenerateReportDraftButton } from "./GenerateReportDraftButton";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../lib/adminAuth";
import {
  scoreDiagnostic,
  type DiagnosticScore,
} from "../../lib/diagnosticScoring";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

type DiagnosticSubmission = {
  id: string;
  created_at: string;
  student_first_name: string;
  parent_first_name: string;
  parent_email: string;
  year_level: string | null;
  course: string | null;
  topics_studied: string[] | null;
  current_topic: string | null;
  target_result: string | null;
  assessment_timing: string | null;
  answers: Record<string, string> | null;
  confidence: Record<string, string> | null;
  working: Record<string, string> | null;
  consent_confirmed: boolean;
  report_status: string;
  report_notes: string | null;
  follow_up_required: boolean | null;
  offer_selected: string | null;
  report_sent_at: string | null;
};

const reportStatuses = [
  "not_started",
  "reviewing",
  "drafted",
  "sent",
  "follow_up_required",
] as const;

const offerOptions = [
  "Diagnostic + personalised 30-day plan",
  "Review call option",
];

function formatReportStatus(value: string | null | undefined) {
  return (value ?? "not_started").replace(/_/g, " ");
}

function listLines(items: string[], fallback: string) {
  if (items.length === 0) {
    return [`- ${fallback}`];
  }

  return items.map((item) => `- ${item}`);
}

function diagnosticInterpretation(score: DiagnosticScore) {
  if (score.percentage >= 80) {
    return "This result suggests a solid overall base, with the next best step being targeted consolidation of the remaining mark leaks.";
  }

  if (score.percentage >= 60) {
    return "This result suggests the student has several useful foundations in place, but there are priority areas that should be addressed to make revision more efficient.";
  }

  if (score.attempted < Math.ceil(score.totalQuestions * 0.6)) {
    return "This result suggests the first priority is building confidence and fluency across the most accessible core skills, then gradually moving into exam-style questions.";
  }

  return "This result suggests there are some important mark leaks across the diagnostic. The next best step is to focus on the highest-impact priority areas before broad mixed revision.";
}

function generateParentReportDraft(
  submission: DiagnosticSubmission,
  score: DiagnosticScore
) {
  const topPriority =
    score.priorities[0] ?? "the highest-priority weak area from the diagnostic";
  const relevantLessons =
    score.recommendedNextLessons.length > 0
      ? score.recommendedNextLessons.map(
          (lesson) => `- ${lesson.title}: ${lesson.reason} (${lesson.href})`
        )
      : [
          "- Start with the Differential Calculus pathway if calculus is part of the current school focus.",
          "- Otherwise, revise the weakest listed sections first and reattempt similar diagnostic-style questions.",
        ];

  return [
    "HSC Maths Advanced Diagnostic Report",
    "",
    "Student:",
    `- Student first name: ${submission.student_first_name || "Not provided"}`,
    `- Year level: ${submission.year_level ?? "Not provided"}`,
    `- Course: ${submission.course ?? "Not provided"}`,
    `- Target result: ${submission.target_result ?? "Not provided"}`,
    `- Next major assessment timing: ${
      submission.assessment_timing || "Not provided"
    }`,
    "",
    "Overall summary:",
    `- Overall score: ${score.correct}/${score.totalQuestions} (${score.percentage}%)`,
    `- Attempted questions: ${score.attempted}/${score.totalQuestions}`,
    `- Number marked "I don't know yet": ${score.idk}`,
    `- ${diagnosticInterpretation(score)}`,
    "",
    "Strengths:",
    ...listLines(
      score.strengths,
      "No clear strength area was identified from this diagnostic alone."
    ),
    "",
    "Priority areas:",
    ...listLines(
      score.priorities,
      "No single priority area stood out strongly from this diagnostic."
    ),
    "- These should be addressed first because they are likely to produce the highest improvement.",
    "",
    "High-confidence errors:",
    ...listLines(
      score.highConfidenceErrors,
      "No major high-confidence error pattern was detected."
    ),
    "- High-confidence errors are important because they may indicate misconceptions rather than simple uncertainty.",
    "",
    "Low-confidence correct answers:",
    ...listLines(
      score.lowConfidenceCorrectAnswers,
      "No clear low-confidence correct pattern was detected."
    ),
    "- Low-confidence correct answers may only need consolidation and practice.",
    "",
    "Recommended next lessons:",
    ...relevantLessons,
    "",
    "Suggested 30-day plan:",
    "Week 1:",
    `- Address the top priority weakness: ${topPriority}.`,
    "- Reattempt similar diagnostic-style questions.",
    "Week 2:",
    "- Work through the most relevant targeted lessons.",
    "- Complete guided and independent practice.",
    "Week 3:",
    "- Complete mastery quizzes for priority lessons.",
    "- Review high-confidence errors.",
    "Week 4:",
    "- Complete mixed practice.",
    "- Recheck weak areas before the next assessment.",
    "",
    "Notes:",
    "- This diagnostic is for learning support only.",
    "- It is not an official school result or a guarantee of future performance.",
  ].join("\n");
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (token !== getAdminToken()) {
    redirect("/admin/login");
  }
}

async function updateReportStatus(formData: FormData) {
  "use server";

  await requireAdmin();

  const submissionId = String(formData.get("submission_id") ?? "");
  const reportStatus = String(formData.get("report_status") ?? "");

  if (
    !submissionId ||
    !(reportStatuses as readonly string[]).includes(reportStatus)
  ) {
    throw new Error("Invalid report status update.");
  }

  const updateValues: {
    report_status: string;
    follow_up_required?: boolean;
    report_sent_at?: string;
  } = {
    report_status: reportStatus,
  };

  if (reportStatus === "sent") {
    updateValues.report_sent_at = new Date().toISOString();
  }

  if (reportStatus === "follow_up_required") {
    updateValues.follow_up_required = true;
  }

  const { error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .update(updateValues)
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

async function updateReportDetails(formData: FormData) {
  "use server";

  await requireAdmin();

  const submissionId = String(formData.get("submission_id") ?? "");
  const reportNotes = String(formData.get("report_notes") ?? "");
  const offerSelected = String(formData.get("offer_selected") ?? "");
  const followUpRequired = formData.get("follow_up_required") === "on";

  if (!submissionId) {
    throw new Error("Missing diagnostic submission id.");
  }

  const { error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .update({
      report_notes: reportNotes,
      offer_selected: offerSelected || null,
      follow_up_required: followUpRequired,
    })
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

async function generateReportDraft(formData: FormData) {
  "use server";

  await requireAdmin();

  const submissionId = String(formData.get("submission_id") ?? "");

  if (!submissionId) {
    throw new Error("Missing diagnostic submission id.");
  }

  const { data, error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const submission = data as DiagnosticSubmission;
  const score = scoreDiagnostic(submission.answers, submission.confidence);
  const reportDraft = generateParentReportDraft(submission, score);
  const updateValues: {
    report_notes: string;
    report_status?: string;
  } = {
    report_notes: reportDraft,
  };

  if ((submission.report_status ?? "not_started") === "not_started") {
    updateValues.report_status = "drafted";
  }

  const { error: updateError } = await supabaseAdmin
    .from("diagnostic_submissions")
    .update(updateValues)
    .eq("id", submissionId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/admin");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function renderJsonMap(value: Record<string, string> | null) {
  if (!value || Object.keys(value).length === 0) {
    return <p className="text-sm text-slate-500">No data</p>;
  }

  return (
    <div className="space-y-2">
      {Object.entries(value).map(([key, answer]) => (
        <div key={key} className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {key}
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
            {answer || "Blank"}
          </p>
        </div>
      ))}
    </div>
  );
}

function renderReportWorkflow(submission: DiagnosticSubmission) {
  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Report workflow</h3>
          <p className="mt-1 text-sm text-slate-600">
            Track review progress, follow-up needs, offer fit, and report notes.
          </p>
        </div>
        <span className="w-fit rounded-full bg-slate-950 px-3 py-1.5 text-sm font-semibold capitalize text-white">
          {formatReportStatus(submission.report_status)}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Offer selected
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {submission.offer_selected || "Not selected"}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Follow-up
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {submission.follow_up_required ? "Required" : "Not required"}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sent at
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {submission.report_sent_at
              ? formatDate(submission.report_sent_at)
              : "Not sent"}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Current status
          </p>
          <p className="mt-2 text-sm font-medium capitalize text-slate-900">
            {formatReportStatus(submission.report_status)}
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">Update status</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {reportStatuses.map((status) => (
            <form key={status} action={updateReportStatus}>
              <input type="hidden" name="submission_id" value={submission.id} />
              <input type="hidden" name="report_status" value={status} />
              <button
                type="submit"
                className={`rounded-full border px-3 py-2 text-sm font-semibold capitalize transition ${
                  (submission.report_status ?? "not_started") === status
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {formatReportStatus(status)}
              </button>
            </form>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <GenerateReportDraftButton
          action={generateReportDraft}
          hasExistingNotes={Boolean(submission.report_notes?.trim())}
          submissionId={submission.id}
        />
      </div>

      <form action={updateReportDetails} className="space-y-4">
        <input type="hidden" name="submission_id" value={submission.id} />

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

        <label className="block space-y-1">
          <span className="text-sm font-semibold text-slate-800">
            Report notes
          </span>
          <textarea
            name="report_notes"
            defaultValue={submission.report_notes ?? ""}
            rows={5}
            placeholder="Student weaknesses, parent follow-up, report content, or next-step plan..."
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <button
          type="submit"
          className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save report details
        </button>
      </form>
    </section>
  );
}

function ResultBadge({ correct }: Readonly<{ correct: boolean }>) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        correct
          ? "bg-emerald-100 text-emerald-800"
          : "bg-rose-100 text-rose-800"
      }`}
    >
      {correct ? "Correct" : "Needs review"}
    </span>
  );
}

function renderScoringSummary(score: DiagnosticScore) {
  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">View scoring summary</h3>
          <p className="text-sm text-slate-600">
            Rule-based scoring against the current diagnostic answer key.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-3xl font-bold text-slate-950">
            {score.percentage}%
          </p>
          <p className="text-sm text-slate-600">overall score</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl bg-white p-4">
          <p className="text-2xl font-bold">{score.correct}</p>
          <p className="text-sm text-slate-600">correct</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-2xl font-bold">
            {score.attempted}/{score.totalQuestions}
          </p>
          <p className="text-sm text-slate-600">attempted</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-2xl font-bold">{score.incorrect}</p>
          <p className="text-sm text-slate-600">incorrect attempts</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-2xl font-bold">{score.idk}</p>
          <p className="text-sm text-slate-600">I don&apos;t know</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-2xl font-bold">{score.blank}</p>
          <p className="text-sm text-slate-600">blank</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
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

        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4">
            <h4 className="font-semibold">Priority weak areas</h4>
            {score.priorities.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {score.priorities.map((priority) => (
                  <li key={priority}>- {priority}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                No major weak section stands out.
              </p>
            )}
          </div>

          <div className="rounded-xl bg-white p-4">
            <h4 className="font-semibold">Strongest areas</h4>
            {score.strengths.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {score.strengths.map((strength) => (
                  <li key={strength}>- {strength}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                No clear strongest area yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4">
        <h4 className="font-semibold">Report-ready notes</h4>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {score.reportNotes.map((note) => (
            <li key={note}>- {note}</li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-4">
          <h4 className="font-semibold">High-confidence errors</h4>
          {score.highConfidenceErrors.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {score.highConfidenceErrors.map((skill) => (
                <li key={skill}>- {skill}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              No high-confidence errors detected.
            </p>
          )}
        </div>

        <div className="rounded-xl bg-white p-4">
          <h4 className="font-semibold">Low-confidence correct answers</h4>
          {score.lowConfidenceCorrectAnswers.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {score.lowConfidenceCorrectAnswers.map((skill) => (
                <li key={skill}>- {skill}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              No low-confidence correct answers detected.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-white p-4">
        <h4 className="font-semibold">Recommended next lessons</h4>
        {score.recommendedNextLessons.length > 0 ? (
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {score.recommendedNextLessons.map((lesson) => (
              <Link
                key={lesson.href}
                href={lesson.href}
                className="rounded-xl border border-slate-200 p-3 text-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="font-semibold text-slate-950">
                  {lesson.title}
                </span>
                <span className="mt-1 block text-slate-600">
                  Recommended because of: {lesson.reason}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-500">
            No specific lesson recommendation from the current weak tags.
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-3">
          <h4 className="font-semibold">Question-level results</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Question</th>
                <th className="px-4 py-3">Skill</th>
                <th className="px-4 py-3">Student answer</th>
                <th className="px-4 py-3">Correct answer</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {score.questionResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {result.id}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <p>{result.skill}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {result.section} / {result.difficulty} /{" "}
                      {result.diagnosticTag}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {result.studentAnswer}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {result.correctAnswer}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {result.confidence ?? "Not selected"}
                  </td>
                  <td className="px-4 py-3">
                    <ResultBadge correct={result.correct} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (token !== getAdminToken()) {
    redirect("/admin/login");
  }

  const { data, error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  const submissions = (data ?? []) as DiagnosticSubmission[];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              HSC Maths Coach
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Diagnostic submissions
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Showing the latest {submissions.length} submissions.
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
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-slate-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => {
              const score = scoreDiagnostic(
                submission.answers,
                submission.confidence
              );

              return (
                <article
                  key={submission.id}
                  className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
                >
                <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {submission.student_first_name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-600">
                      Parent: {submission.parent_first_name} /{" "}
                      {submission.parent_email}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Submitted {formatDate(submission.created_at)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                    Status: {formatReportStatus(submission.report_status)}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Course
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.course ?? "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Year level
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.year_level ?? "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Target
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.target_result ?? "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Current topic
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.current_topic || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Next assessment
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.assessment_timing || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Consent
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.consent_confirmed ? "Confirmed" : "Not confirmed"}
                    </p>
                  </div>
                </div>

                {renderReportWorkflow(submission)}

                <section>
                  <h3 className="text-lg font-semibold">Topics studied</h3>

                  {submission.topics_studied &&
                  submission.topics_studied.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {submission.topics_studied.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">
                      No topics selected.
                    </p>
                  )}
                </section>

                {renderScoringSummary(score)}

                <section className="grid gap-6 lg:grid-cols-3">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Answers</h3>
                    {renderJsonMap(submission.answers)}
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Confidence</h3>
                    {renderJsonMap(submission.confidence)}
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Working</h3>
                    {renderJsonMap(submission.working)}
                  </div>
                </section>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
