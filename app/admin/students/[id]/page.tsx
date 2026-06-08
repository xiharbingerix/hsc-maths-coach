import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/adminSession";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  generateStudyPlan,
  type StudyPlanDiagnosticResult,
} from "../../../../lib/studyPlans/generateStudyPlan";

export const metadata: Metadata = {
  title: "Student Detail | Nova Maths Admin",
};

type AdminAuthUser = {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string | null;
  user_metadata?: {
    full_name?: string;
    name?: string;
    student_name?: string;
    student_first_name?: string;
  };
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name?: string | null;
  student_name?: string | null;
  student_first_name?: string | null;
};

type MasteryRow = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  attempt_count: number;
  correct_count: number;
  last_updated: string | null;
};

type WorksheetRow = {
  id: string;
  title: string;
  share_token: string;
  assigned_to_user: string | null;
  assigned_student_email: string | null;
  due_at: string | null;
  status: string | null;
  created_at: string | null;
};

type AttemptRow = {
  id: string;
  worksheet_id: string;
  user_id: string | null;
  completed_at: string | null;
  score_correct: number | null;
  score_total: number | null;
  started_at: string | null;
};

type DiagnosticRow = {
  id: string;
  year_level: string;
  unit_results: StudyPlanDiagnosticResult[];
  created_at: string | null;
};

function firstPresent(...values: Array<string | null | undefined>) {
  return values
    .map((value) => value?.trim())
    .find((value): value is string => Boolean(value));
}

function prettifySlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function studentName(user: AdminAuthUser, profile?: ProfileRow | null) {
  return (
    firstPresent(
      profile?.student_name,
      profile?.full_name,
      profile?.student_first_name,
      user.user_metadata?.student_name,
      user.user_metadata?.full_name,
      user.user_metadata?.name,
      user.user_metadata?.student_first_name,
      user.email,
      profile?.email
    ) ?? "Unnamed student"
  );
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Sydney",
  }).format(new Date(value));
}

function formatDate(value: string | null | undefined) {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeZone: "Australia/Sydney",
  }).format(new Date(value));
}

function latestDate(...values: Array<string | null | undefined>) {
  const timestamps = values
    .map((value) => (value ? Date.parse(value) : NaN))
    .filter((value) => Number.isFinite(value));
  if (timestamps.length === 0) return null;
  return new Date(Math.max(...timestamps)).toISOString();
}

function average(values: number[]) {
  if (values.length === 0) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function isOverdue(value: string | null | undefined) {
  return Boolean(value && new Date(value) < new Date());
}

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const { data: userData, error: userError } =
    await supabaseAdmin.auth.admin.getUserById(id);

  if (userError || !userData?.user) notFound();

  const user = userData.user as AdminAuthUser;
  const email = user.email?.toLowerCase() ?? "";

  const [
    profileResult,
    masteryResult,
    diagnosticResult,
    assignedByEmailResult,
    assignedByUserResult,
    attemptsByUserResult,
  ] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", id).maybeSingle(),
    supabaseAdmin
      .from("student_mastery")
      .select(
        "course_slug, topic_slug, mastery_score, attempt_count, correct_count, last_updated"
      )
      .eq("user_id", id)
      .order("mastery_score", { ascending: true }),
    supabaseAdmin
      .from("diagnostic_results")
      .select("id, year_level, unit_results, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(20),
    email
      ? supabaseAdmin
          .from("worksheets")
          .select(
            "id, title, share_token, assigned_to_user, assigned_student_email, due_at, status, created_at"
          )
          .eq("assigned_student_email", email)
      : Promise.resolve({ data: [] }),
    supabaseAdmin
      .from("worksheets")
      .select(
        "id, title, share_token, assigned_to_user, assigned_student_email, due_at, status, created_at"
      )
      .eq("assigned_to_user", id),
    supabaseAdmin
      .from("worksheet_attempts")
      .select(
        "id, worksheet_id, user_id, completed_at, score_correct, score_total, started_at"
      )
      .eq("user_id", id)
      .order("started_at", { ascending: false }),
  ]);

  const profile = profileResult.data as ProfileRow | null;
  const masteryRows = (masteryResult.data ?? []) as MasteryRow[];
  const diagnosticRows = (diagnosticResult.data ?? []) as DiagnosticRow[];
  const worksheets = [
    ...((assignedByEmailResult.data ?? []) as WorksheetRow[]),
    ...((assignedByUserResult.data ?? []) as WorksheetRow[]),
  ].filter(
    (worksheet, index, all) =>
      all.findIndex((candidate) => candidate.id === worksheet.id) === index
  );
  const worksheetIds = worksheets.map((worksheet) => worksheet.id);
  const attemptsByUser = (attemptsByUserResult.data ?? []) as AttemptRow[];
  const attemptsByWorksheetResult = worksheetIds.length
    ? await supabaseAdmin
        .from("worksheet_attempts")
        .select(
          "id, worksheet_id, user_id, completed_at, score_correct, score_total, started_at"
        )
        .in("worksheet_id", worksheetIds)
        .order("started_at", { ascending: false })
    : { data: [] };

  const attempts = [
    ...attemptsByUser,
    ...((attemptsByWorksheetResult.data ?? []) as AttemptRow[]),
  ].filter(
    (attempt, index, all) =>
      all.findIndex((candidate) => candidate.id === attempt.id) === index
  );
  const attemptsByWorksheet = new Map<string, AttemptRow[]>();
  for (const attempt of attempts) {
    attemptsByWorksheet.set(attempt.worksheet_id, [
      ...(attemptsByWorksheet.get(attempt.worksheet_id) ?? []),
      attempt,
    ]);
  }

  const completedWorksheetIds = new Set(
    attempts
      .filter((attempt) => attempt.completed_at)
      .map((attempt) => attempt.worksheet_id)
  );
  const overdueWorksheetCount = worksheets.filter(
    (worksheet) =>
      isOverdue(worksheet.due_at) &&
      worksheet.status !== "archived" &&
      !completedWorksheetIds.has(worksheet.id)
  ).length;
  const masteryAverage = average(masteryRows.map((row) => row.mastery_score));
  const weakestTopic = masteryRows[0] ?? null;
  const latestDiagnostic = diagnosticRows[0] ?? null;
  const latestActivity = latestDate(
    user.last_sign_in_at,
    user.created_at,
    ...masteryRows.map((row) => row.last_updated),
    ...attempts.map((attempt) => attempt.completed_at ?? attempt.started_at),
    ...diagnosticRows.map((diagnostic) => diagnostic.created_at)
  );
  const studyPlan = generateStudyPlan({
    yearLevel: latestDiagnostic?.year_level ?? "year-12-advanced",
    masteryRows,
    diagnosticResults: latestDiagnostic?.unit_results ?? [],
  });
  const worksheetGeneratorHref = `/admin/worksheets/new?studentName=${encodeURIComponent(
    studentName(user, profile)
  )}&studentEmail=${encodeURIComponent(user.email ?? "")}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin / Student
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {studentName(user, profile)}
            </h1>
            <p className="mt-2 text-sm text-slate-600">{user.email}</p>
          </div>
          <Link
            href="/admin/students"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Back to students
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <SummaryCard
            label="Average mastery"
            value={masteryAverage == null ? "-" : `${masteryAverage}%`}
          />
          <SummaryCard
            label="Weakest topic"
            value={weakestTopic ? prettifySlug(weakestTopic.topic_slug) : "No data"}
            helper={weakestTopic ? `${weakestTopic.mastery_score}% mastery` : undefined}
            compact
          />
          <SummaryCard label="Assigned" value={String(worksheets.length)} />
          <SummaryCard label="Completed" value={String(completedWorksheetIds.size)} />
          <SummaryCard label="Overdue" value={String(overdueWorksheetCount)} />
          <SummaryCard
            label="Latest activity"
            value={formatDateTime(latestActivity)}
            compact
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Recommended next action
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {studyPlan.nextTopic?.title ?? "No recommendation yet"}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {studyPlan.nextTopic?.reason ??
                  "Ask the student to complete a diagnostic or worksheet to generate a recommendation."}
              </p>
              {studyPlan.nextTopic ? (
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="rounded-full bg-slate-100 px-3 py-1 capitalize">
                    {studyPlan.priorityLevel} priority
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    About {studyPlan.estimatedHours} hour
                    {studyPlan.estimatedHours !== 1 ? "s" : ""}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              {studyPlan.nextTopic ? (
                <Link
                  href={studyPlan.nextTopic.href}
                  className="inline-flex justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Open topic
                </Link>
              ) : null}
              <Link
                href={worksheetGeneratorHref}
                className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Generate worksheet
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Mastery by topic</h2>
          {masteryRows.length === 0 ? (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No mastery data yet. Have the student complete a diagnostic,
              lesson mastery quiz, or worksheet so this page can recommend
              targeted work.
            </p>
          ) : (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Topic</th>
                    <th className="px-4 py-3 text-left">Course</th>
                    <th className="px-4 py-3 text-center">Mastery</th>
                    <th className="px-4 py-3 text-center">Attempts</th>
                    <th className="px-4 py-3 text-left">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {masteryRows.map((row) => (
                    <tr key={`${row.course_slug}/${row.topic_slug}`}>
                      <td className="px-4 py-3 font-medium">
                        {prettifySlug(row.topic_slug)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {prettifySlug(row.course_slug)}
                      </td>
                      <td className="px-4 py-3 text-center tabular-nums">
                        {row.mastery_score}%
                      </td>
                      <td className="px-4 py-3 text-center tabular-nums">
                        {row.attempt_count}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatDateTime(row.last_updated)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Worksheet history</h2>
          {worksheets.length === 0 && attempts.length === 0 ? (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No worksheet history yet. Generate a worksheet and assign it to
              this student's email to start tracking practice.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {worksheets.map((worksheet) => {
                const worksheetAttempts = attemptsByWorksheet.get(worksheet.id) ?? [];
                const latestAttempt = worksheetAttempts[0] ?? null;
                const isCompleted = Boolean(latestAttempt?.completed_at);
                const overdue =
                  isOverdue(worksheet.due_at) &&
                  worksheet.status !== "archived" &&
                  !isCompleted;
                return (
                  <div
                    key={worksheet.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold">{worksheet.title}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Due {formatDate(worksheet.due_at)} / Status{" "}
                          {worksheet.status ?? "active"}
                          {overdue ? " / overdue" : ""}
                        </p>
                      </div>
                      <Link
                        href={`/worksheet/${worksheet.share_token}`}
                        className="text-sm font-semibold text-slate-900 underline underline-offset-2"
                      >
                        Open worksheet
                      </Link>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      {latestAttempt?.completed_at
                        ? `Completed ${formatDateTime(latestAttempt.completed_at)} / Score ${latestAttempt.score_correct}/${latestAttempt.score_total}`
                        : latestAttempt
                        ? `In progress / Started ${formatDateTime(latestAttempt.started_at)}`
                        : "Not started yet"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Diagnostic history</h2>
          {diagnosticRows.length === 0 ? (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No diagnostic results yet. A diagnostic is the fastest way to
              seed a useful study plan for this student.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {diagnosticRows.map((diagnostic) => {
                const units = Array.isArray(diagnostic.unit_results)
                  ? diagnostic.unit_results
                  : [];
                const totalCorrect = units.reduce(
                  (sum, unit) => sum + (unit.correct ?? 0),
                  0
                );
                const totalQuestions = units.reduce(
                  (sum, unit) => sum + (unit.total ?? 0),
                  0
                );
                return (
                  <details
                    key={diagnostic.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <summary className="cursor-pointer font-semibold">
                      {prettifySlug(diagnostic.year_level)} /{" "}
                      {formatDateTime(diagnostic.created_at)} / {totalCorrect}/
                      {totalQuestions}
                    </summary>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {units.map((unit) => (
                        <li key={unit.unitSlug ?? unit.topicSlug ?? unit.title}>
                          {unit.unitTitle ?? unit.topicTitle ?? unit.title ?? "Unit"}:{" "}
                          {unit.correct}/{unit.total}
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  helper,
  compact = false,
}: {
  label: string;
  value: string;
  helper?: string;
  compact?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={compact ? "mt-2 text-sm font-semibold" : "mt-2 text-3xl font-bold"}>
        {value}
      </p>
      {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
    </div>
  );
}
