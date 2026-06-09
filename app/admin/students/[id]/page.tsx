import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../../lib/adminSession";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  generateStudyPlan,
  type StudyPlanDiagnosticResult,
} from "../../../../lib/studyPlans/generateStudyPlan";
import { newCoursePathways } from "../../../../lib/newCourseCatalog";

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

type SubtopicMasteryRow = {
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  mastery_score: number;
  attempt_count: number;
  correct_count: number;
  last_updated: string | null;
};

type MasteryHistoryRow = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  attempt_count: number;
  source_type: string | null;
  created_at: string | null;
};

type MasteryTrendRow = {
  courseSlug: string;
  topicSlug: string;
  latestScore: number;
  previousScore: number | null;
  change: number | null;
  updatedAt: string | null;
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

type MasteryEventRow = {
  id: string;
  source_type: string;
  source_id: string | null;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string | null;
  difficulty: number;
  is_correct: boolean;
  created_at: string | null;
};

type AccessRow = {
  id: string;
  access_type: string;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type NoteRow = {
  id: string;
  note: string;
  created_at: string | null;
};

type TimelineItem = {
  id: string;
  occurredAt: string;
  title: string;
  description: string;
  type: "diagnostic" | "worksheet" | "mastery" | "access";
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

const subtopicLabelMap = new Map<string, string>();
for (const pathway of newCoursePathways) {
  for (const unit of pathway.units) {
    for (const lesson of unit.lessons) {
      subtopicLabelMap.set(
        `${pathway.slug}::${unit.slug}::${lesson.slug}`,
        lesson.title
      );
    }
  }
}

function subtopicLabel(row: SubtopicMasteryRow) {
  return (
    subtopicLabelMap.get(
      `${row.course_slug}::${row.topic_slug}::${row.subtopic_slug}`
    ) ?? prettifySlug(row.subtopic_slug)
  );
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

function scoreText(correct: number | null, total: number | null) {
  if (correct == null || total == null) return "Score not recorded";
  if (total <= 0) return `${correct}/${total}`;
  const percent = Math.round((correct / total) * 100);
  return `${correct}/${total} (${percent}%)`;
}

function formatMasteryChange(change: number | null) {
  if (change == null) return "No previous score";
  if (change > 0) return `+${change}`;
  if (change < 0) return String(change);
  return "No change";
}

function masteryChangeClass(change: number | null) {
  if (change == null || change === 0) return "text-slate-600";
  return change > 0 ? "text-emerald-700" : "text-rose-700";
}

function buildMasteryTrends(
  masteryRows: MasteryRow[],
  historyRows: MasteryHistoryRow[]
) {
  const historyByTopic = new Map<string, MasteryHistoryRow[]>();

  for (const row of historyRows) {
    const key = `${row.course_slug}/${row.topic_slug}`;
    historyByTopic.set(key, [...(historyByTopic.get(key) ?? []), row]);
  }

  for (const rows of historyByTopic.values()) {
    rows.sort((a, b) => {
      const aTime = a.created_at ? Date.parse(a.created_at) : 0;
      const bTime = b.created_at ? Date.parse(b.created_at) : 0;
      return bTime - aTime;
    });
  }

  return masteryRows.map((row): MasteryTrendRow => {
    const key = `${row.course_slug}/${row.topic_slug}`;
    const snapshots = historyByTopic.get(key) ?? [];
    const latestSnapshot = snapshots[0] ?? null;
    const previousSnapshot =
      latestSnapshot?.mastery_score === row.mastery_score
        ? snapshots[1] ?? null
        : latestSnapshot;
    const previousScore = previousSnapshot?.mastery_score ?? null;

    return {
      courseSlug: row.course_slug,
      topicSlug: row.topic_slug,
      latestScore: row.mastery_score,
      previousScore,
      change:
        previousScore == null ? null : row.mastery_score - previousScore,
      updatedAt: row.last_updated ?? latestSnapshot?.created_at ?? null,
    };
  });
}

function diagnosticScoreText(diagnostic: DiagnosticRow) {
  const units = Array.isArray(diagnostic.unit_results)
    ? diagnostic.unit_results
    : [];
  const totalCorrect = units.reduce((sum, unit) => sum + (unit.correct ?? 0), 0);
  const totalQuestions = units.reduce((sum, unit) => sum + (unit.total ?? 0), 0);
  return scoreText(totalCorrect, totalQuestions);
}

function localDateKey(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeZone: "Australia/Sydney",
  }).format(new Date(value));
}

function timelineBadgeClass(type: TimelineItem["type"]) {
  switch (type) {
    case "diagnostic":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "worksheet":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "mastery":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    case "access":
      return "bg-amber-50 text-amber-700 ring-amber-200";
  }
}

function buildActivityTimeline({
  diagnostics,
  worksheets,
  attempts,
  masteryRows,
  masteryEvents,
  accessRows,
}: {
  diagnostics: DiagnosticRow[];
  worksheets: WorksheetRow[];
  attempts: AttemptRow[];
  masteryRows: MasteryRow[];
  masteryEvents: MasteryEventRow[];
  accessRows: AccessRow[];
}) {
  const worksheetById = new Map(worksheets.map((worksheet) => [worksheet.id, worksheet]));
  const items: TimelineItem[] = [];

  for (const diagnostic of diagnostics) {
    if (!diagnostic.created_at) continue;
    items.push({
      id: `diagnostic:${diagnostic.id}`,
      occurredAt: diagnostic.created_at,
      title: "Completed diagnostic",
      description: `${prettifySlug(diagnostic.year_level)} diagnostic / ${diagnosticScoreText(diagnostic)}`,
      type: "diagnostic",
    });
  }

  for (const worksheet of worksheets) {
    if (!worksheet.created_at) continue;
    const dueText = worksheet.due_at ? ` / Due ${formatDate(worksheet.due_at)}` : "";
    items.push({
      id: `worksheet-assigned:${worksheet.id}`,
      occurredAt: worksheet.created_at,
      title: "Worksheet assigned",
      description: `${worksheet.title}${dueText}`,
      type: "worksheet",
    });
  }

  for (const attempt of attempts) {
    const worksheetTitle =
      worksheetById.get(attempt.worksheet_id)?.title ?? "Worksheet";
    if (attempt.started_at) {
      items.push({
        id: `worksheet-started:${attempt.id}`,
        occurredAt: attempt.started_at,
        title: "Started worksheet",
        description: worksheetTitle,
        type: "worksheet",
      });
    }

    if (attempt.completed_at) {
      items.push({
        id: `worksheet-completed:${attempt.id}`,
        occurredAt: attempt.completed_at,
        title: "Completed worksheet",
        description: `${worksheetTitle} / ${scoreText(attempt.score_correct, attempt.score_total)}`,
        type: "worksheet",
      });
    }
  }

  for (const event of masteryEvents) {
    if (!event.created_at) continue;
    items.push({
      id: `mastery-event:${event.id}`,
      occurredAt: event.created_at,
      title:
        event.source_type === "lesson"
          ? "Lesson mastery recorded"
          : "Mastery question recorded",
      description: `${prettifySlug(event.course_slug)} / ${prettifySlug(event.topic_slug)}${event.subtopic_slug ? ` / ${prettifySlug(event.subtopic_slug)}` : ""} / Difficulty ${event.difficulty} / ${event.is_correct ? "Correct" : "Incorrect"}`,
      type: "mastery",
    });
  }

  for (const row of masteryRows) {
    if (!row.last_updated) continue;
    items.push({
      id: `mastery-updated:${row.course_slug}:${row.topic_slug}`,
      occurredAt: row.last_updated,
      title: "Mastery updated",
      description: `${prettifySlug(row.course_slug)} / ${prettifySlug(row.topic_slug)} is now ${row.mastery_score}%`,
      type: "mastery",
    });
  }

  for (const access of accessRows) {
    const occurredAt = access.updated_at ?? access.created_at;
    if (!occurredAt) continue;
    items.push({
      id: `access:${access.id}:${occurredAt}`,
      occurredAt,
      title: access.status === "active" ? "Access activated" : "Access updated",
      description: `${prettifySlug(access.access_type)} / ${access.status ?? "unknown"}`,
      type: "access",
    });
  }

  return items
    .sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt))
    .slice(0, 20);
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

  // Server action — defined here to close over `id` and `email`.
  async function addNote(formData: FormData) {
    "use server";
    await requireAdmin();
    const note = String(formData.get("note") ?? "").trim();
    if (!note) return;
    await supabaseAdmin.from("student_notes").insert({
      student_user_id: id,
      student_email: email || null,
      note,
    });
    revalidatePath(`/admin/students/${id}`);
  }

  const [
    profileResult,
    masteryResult,
    subtopicMasteryResult,
    diagnosticResult,
    assignedByEmailResult,
    assignedByUserResult,
    attemptsByUserResult,
    masteryEventsResult,
    masteryHistoryResult,
    accessResult,
    notesResult,
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
      .from("student_subtopic_mastery")
      .select(
        "course_slug, topic_slug, subtopic_slug, mastery_score, attempt_count, correct_count, last_updated"
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
    supabaseAdmin
      .from("mastery_events")
      .select(
        "id, source_type, source_id, course_slug, topic_slug, subtopic_slug, difficulty, is_correct, created_at"
      )
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("student_mastery_history")
      .select(
        "course_slug, topic_slug, mastery_score, attempt_count, source_type, created_at"
      )
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(500),
    supabaseAdmin
      .from("user_access")
      .select("id, access_type, status, created_at, updated_at")
      .eq("user_id", id)
      .order("updated_at", { ascending: false })
      .limit(10),
    supabaseAdmin
      .from("student_notes")
      .select("id, note, created_at")
      .eq("student_user_id", id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const notesMissing =
    notesResult.error?.code === "42P01" ||
    notesResult.error?.message?.toLowerCase().includes("student_notes");
  const noteRows = notesMissing
    ? []
    : ((notesResult.data ?? []) as NoteRow[]);

  const profile = profileResult.data as ProfileRow | null;
  const masteryRows = (masteryResult.data ?? []) as MasteryRow[];
  const subtopicMasteryMissing =
    subtopicMasteryResult.error?.code === "42P01" ||
    subtopicMasteryResult.error?.message
      ?.toLowerCase()
      .includes("student_subtopic_mastery");
  const subtopicMasteryRows = subtopicMasteryMissing
    ? []
    : ((subtopicMasteryResult.data ?? []) as SubtopicMasteryRow[]);
  const diagnosticRows = (diagnosticResult.data ?? []) as DiagnosticRow[];
  const masteryEvents = (masteryEventsResult.data ?? []) as MasteryEventRow[];
  const masteryHistoryMissing =
    masteryHistoryResult.error?.code === "42P01" ||
    masteryHistoryResult.error?.message
      ?.toLowerCase()
      .includes("student_mastery_history");
  const masteryHistoryRows = masteryHistoryMissing
    ? []
    : ((masteryHistoryResult.data ?? []) as MasteryHistoryRow[]);
  const accessRows = (accessResult.data ?? []) as AccessRow[];
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
  const masteryTrends = buildMasteryTrends(masteryRows, masteryHistoryRows);
  const latestMasteryTrend =
    masteryTrends
      .filter((row) => row.updatedAt)
      .sort(
        (a, b) =>
          Date.parse(b.updatedAt ?? "") - Date.parse(a.updatedAt ?? "")
      )[0] ??
    masteryTrends[0] ??
    null;
  const improvingTopics = masteryTrends
    .filter((row) => (row.change ?? 0) > 0)
    .sort((a, b) => (b.change ?? 0) - (a.change ?? 0))
    .slice(0, 5);
  const decliningTopics = masteryTrends
    .filter((row) => (row.change ?? 0) < 0)
    .sort((a, b) => (a.change ?? 0) - (b.change ?? 0))
    .slice(0, 5);
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
  )}&studentEmail=${encodeURIComponent(user.email ?? "")}&studentId=${encodeURIComponent(id)}`;
  const timelineItems = buildActivityTimeline({
    diagnostics: diagnosticRows,
    worksheets,
    attempts,
    masteryRows,
    masteryEvents,
    accessRows,
  });

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
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mastery trend
              </p>
              <h2 className="mt-1 text-xl font-bold">Recent movement</h2>
            </div>
            {masteryHistoryMissing ? (
              <p className="text-sm text-slate-500">
                History snapshots are not available yet.
              </p>
            ) : null}
          </div>

          {masteryRows.length === 0 ? (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No mastery data yet.
            </p>
          ) : (
            <div className="mt-5 space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Latest score
                  </p>
                  <p className="mt-2 text-3xl font-bold">
                    {latestMasteryTrend?.latestScore ?? "-"}%
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {latestMasteryTrend
                      ? prettifySlug(latestMasteryTrend.topicSlug)
                      : "No topic yet"}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Previous score
                  </p>
                  <p className="mt-2 text-3xl font-bold">
                    {latestMasteryTrend?.previousScore == null
                      ? "-"
                      : `${latestMasteryTrend.previousScore}%`}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Before the latest snapshot
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Change
                  </p>
                  <p
                    className={`mt-2 text-3xl font-bold ${masteryChangeClass(
                      latestMasteryTrend?.change ?? null
                    )}`}
                  >
                    {formatMasteryChange(latestMasteryTrend?.change ?? null)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Current score compared with previous
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <h3 className="font-semibold text-slate-900">
                    Top improving topics
                  </h3>
                  {improvingTopics.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-600">
                      No improving topics yet.
                    </p>
                  ) : (
                    <ul className="mt-3 space-y-2 text-sm">
                      {improvingTopics.map((row) => (
                        <li
                          key={`${row.courseSlug}/${row.topicSlug}`}
                          className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
                        >
                          <span>
                            <span className="font-medium">
                              {prettifySlug(row.topicSlug)}
                            </span>
                            <span className="ml-2 text-slate-500">
                              {prettifySlug(row.courseSlug)}
                            </span>
                          </span>
                          <span className="font-semibold text-emerald-700">
                            {formatMasteryChange(row.change)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-4">
                  <h3 className="font-semibold text-slate-900">
                    Top declining topics
                  </h3>
                  {decliningTopics.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-600">
                      No declining topics yet.
                    </p>
                  ) : (
                    <ul className="mt-3 space-y-2 text-sm">
                      {decliningTopics.map((row) => (
                        <li
                          key={`${row.courseSlug}/${row.topicSlug}`}
                          className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
                        >
                          <span>
                            <span className="font-medium">
                              {prettifySlug(row.topicSlug)}
                            </span>
                            <span className="ml-2 text-slate-500">
                              {prettifySlug(row.courseSlug)}
                            </span>
                          </span>
                          <span className="font-semibold text-rose-700">
                            {formatMasteryChange(row.change)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Student activity
              </p>
              <h2 className="mt-1 text-xl font-bold">Recent timeline</h2>
            </div>
            <p className="text-sm text-slate-500">Latest 20 items</p>
          </div>

          {timelineItems.length === 0 ? (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No activity yet.
            </p>
          ) : (
            <div className="mt-5 space-y-6">
              {[...new Set(timelineItems.map((item) => localDateKey(item.occurredAt)))].map(
                (dateKey) => (
                  <div key={dateKey}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {dateKey}
                    </p>
                    <ol className="mt-3 space-y-3 border-l border-slate-200 pl-4">
                      {timelineItems
                        .filter((item) => localDateKey(item.occurredAt) === dateKey)
                        .map((item) => (
                          <li key={item.id} className="relative">
                            <span className="absolute -left-[21px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <p className="font-semibold text-slate-900">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {item.description}
                                  </p>
                                </div>
                                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                                  <span
                                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${timelineBadgeClass(item.type)}`}
                                  >
                                    {item.type}
                                  </span>
                                  <time className="text-xs text-slate-500">
                                    {formatDateTime(item.occurredAt)}
                                  </time>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                )
              )}
            </div>
          )}
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
          <h2 className="text-xl font-bold">Mastery by lesson</h2>
          {subtopicMasteryMissing ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <code className="font-mono">student_subtopic_mastery</code> table
              not found. Run migration{" "}
              <code className="font-mono">015_student_subtopic_mastery.sql</code>{" "}
              to enable lesson-level mastery.
            </p>
          ) : subtopicMasteryRows.length === 0 ? (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No lesson-level mastery yet. Lesson quizzes and worksheet
              questions with subtopic tags will populate this table.
            </p>
          ) : (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Lesson</th>
                    <th className="px-4 py-3 text-left">Topic</th>
                    <th className="px-4 py-3 text-left">Course</th>
                    <th className="px-4 py-3 text-center">Mastery</th>
                    <th className="px-4 py-3 text-center">Attempts</th>
                    <th className="px-4 py-3 text-left">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subtopicMasteryRows.map((row) => (
                    <tr
                      key={`${row.course_slug}/${row.topic_slug}/${row.subtopic_slug}`}
                    >
                      <td className="px-4 py-3 font-medium">
                        {subtopicLabel(row)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
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

        {/* ── Tutor notes ──────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Tutor notes</h2>
              <p className="mt-1 text-xs text-slate-500">
                Private — not visible to the student.
              </p>
            </div>
            {noteRows.length > 0 && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {noteRows.length} note{noteRows.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {notesMissing && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <code className="font-mono">student_notes</code> table not found.
              Run migration <code className="font-mono">014_student_notes.sql</code> to enable tutor notes.
            </p>
          )}

          {!notesMissing && noteRows.length > 0 && (
            <ul className="mt-4 space-y-3">
              {noteRows.map((note) => (
                <li
                  key={note.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="whitespace-pre-wrap text-sm text-slate-800">
                    {note.note}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {formatDateTime(note.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {!notesMissing && (
            <form action={addNote} className="mt-4 space-y-3">
              <textarea
                name="note"
                rows={3}
                required
                placeholder="Add a private note about this student…"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Add note
              </button>
            </form>
          )}
        </section>

        {/* ── Diagnostic history ───────────────────────────────────────────── */}
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
