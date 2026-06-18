import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { newCoursePathways } from "../../../lib/newCourseCatalog";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const metadata: Metadata = {
  title: "Students | Nova Maths Admin",
};

const ALLOWED_PAGE_SIZES = [25, 50, 100] as const;
const AUTH_LIST_PAGE_SIZE = 200;
const MAX_AUTH_USERS = 5000;

function parsePositiveInt(raw: string | undefined, fallback: number) {
  const value = Number(raw);
  if (!Number.isFinite(value)) return fallback;
  const rounded = Math.floor(value);
  return rounded > 0 ? rounded : fallback;
}

function parsePageSize(raw: string | undefined) {
  const requested = parsePositiveInt(raw, 50);
  return (ALLOWED_PAGE_SIZES as readonly number[]).includes(requested)
    ? requested
    : 50;
}

async function loadAllAuthUsers() {
  const users: AdminAuthUser[] = [];
  let page = 1;

  while (users.length < MAX_AUTH_USERS) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: AUTH_LIST_PAGE_SIZE,
    });

    if (error) {
      throw new Error(`Could not load auth users: ${error.message}`);
    }

    const batch = ((data?.users ?? []) as AdminAuthUser[]).filter(
      (user) => user.email
    );
    users.push(...batch);

    if (batch.length < AUTH_LIST_PAGE_SIZE) {
      break;
    }

    page += 1;
  }

  return users;
}

function buildStudentsHref({
  q,
  filter,
  page,
  pageSize,
}: {
  q: string;
  filter: string;
  page: number;
  pageSize: number;
}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (filter && filter !== "all") params.set("filter", filter);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 50) params.set("pageSize", String(pageSize));
  const query = params.toString();
  return query.length > 0 ? `/admin/students?${query}` : "/admin/students";
}

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
    parent_email?: string;
  };
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name?: string | null;
  student_name?: string | null;
  student_first_name?: string | null;
  parent_email?: string | null;
};

type MasteryRow = {
  user_id: string;
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  last_updated: string | null;
};

type WorksheetRow = {
  id: string;
  assigned_to_user: string | null;
  assigned_student_email: string | null;
  due_at: string | null;
  status: string | null;
  created_at: string | null;
};

type AttemptRow = {
  worksheet_id: string;
  user_id: string | null;
  completed_at: string | null;
  started_at: string | null;
};

type DiagnosticRow = {
  user_id: string | null;
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

function studentName(user: AdminAuthUser, profile?: ProfileRow) {
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
  if (!value) return "No activity";
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
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

const topicLabelMap = new Map<string, string>();
for (const pathway of newCoursePathways) {
  for (const unit of pathway.units) {
    topicLabelMap.set(`${pathway.slug}::${unit.slug}`, unit.title);
  }
}

function topicLabel(courseSlug: string, topicSlug: string) {
  return topicLabelMap.get(`${courseSlug}::${topicSlug}`) ?? prettifySlug(topicSlug);
}

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    filter?: string;
    page?: string;
    pageSize?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const query = params?.q?.trim().toLowerCase() ?? "";
  const filter = params?.filter ?? "all";
  const page = parsePositiveInt(params?.page, 1);
  const pageSize = parsePageSize(params?.pageSize);

  const users = await loadAllAuthUsers();
  const usersTotal = users.length;
  const userIds = users.map((user) => user.id);
  const emails = users
    .map((user) => user.email?.toLowerCase())
    .filter((email): email is string => Boolean(email));

  const [
    profilesResult,
    masteryResult,
    assignedByEmailResult,
    assignedByUserResult,
    attemptsByUserResult,
    diagnosticsResult,
  ] = await Promise.all([
    userIds.length
      ? supabaseAdmin.from("profiles").select("*").in("id", userIds)
      : Promise.resolve({ data: [] }),
    userIds.length
      ? supabaseAdmin
          .from("student_mastery")
          .select("user_id, course_slug, topic_slug, mastery_score, last_updated")
          .in("user_id", userIds)
      : Promise.resolve({ data: [] }),
    emails.length
      ? supabaseAdmin
          .from("worksheets")
          .select("id, assigned_to_user, assigned_student_email, due_at, status, created_at")
          .in("assigned_student_email", emails)
      : Promise.resolve({ data: [] }),
    userIds.length
      ? supabaseAdmin
          .from("worksheets")
          .select("id, assigned_to_user, assigned_student_email, due_at, status, created_at")
          .in("assigned_to_user", userIds)
      : Promise.resolve({ data: [] }),
    userIds.length
      ? supabaseAdmin
          .from("worksheet_attempts")
          .select("worksheet_id, user_id, completed_at, started_at")
          .in("user_id", userIds)
      : Promise.resolve({ data: [] }),
    userIds.length
      ? supabaseAdmin
          .from("diagnostic_results")
          .select("user_id, created_at")
          .in("user_id", userIds)
      : Promise.resolve({ data: [] }),
  ]);

  const profilesById = new Map(
    ((profilesResult.data ?? []) as ProfileRow[]).map((profile) => [
      profile.id,
      profile,
    ])
  );
  const masteryRows = (masteryResult.data ?? []) as MasteryRow[];
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
        .select("worksheet_id, user_id, completed_at, started_at")
        .in("worksheet_id", worksheetIds)
    : { data: [] };
  const attemptsByWorksheet = (attemptsByWorksheetResult.data ?? []) as AttemptRow[];
  const diagnostics = (diagnosticsResult.data ?? []) as DiagnosticRow[];

  const masteryByUser = new Map<string, MasteryRow[]>();
  for (const row of masteryRows) {
    const group = masteryByUser.get(row.user_id) ?? [];
    group.push(row);
    masteryByUser.set(row.user_id, group);
  }

  const diagnosticsByUser = new Map<string, DiagnosticRow[]>();
  for (const row of diagnostics) {
    if (!row.user_id) continue;
    const group = diagnosticsByUser.get(row.user_id) ?? [];
    group.push(row);
    diagnosticsByUser.set(row.user_id, group);
  }

  const worksheetsByUser = new Map<string, WorksheetRow[]>();
  for (const worksheet of worksheets) {
    if (worksheet.assigned_to_user) {
      const group = worksheetsByUser.get(worksheet.assigned_to_user) ?? [];
      group.push(worksheet);
      worksheetsByUser.set(worksheet.assigned_to_user, group);
    }
  }

  const worksheetsByEmail = new Map<string, WorksheetRow[]>();
  for (const worksheet of worksheets) {
    const email = worksheet.assigned_student_email?.toLowerCase();
    if (!email) continue;
    const group = worksheetsByEmail.get(email) ?? [];
    group.push(worksheet);
    worksheetsByEmail.set(email, group);
  }

  const attemptsByWorksheetId = new Map<string, AttemptRow[]>();
  for (const attempt of attemptsByWorksheet) {
    const group = attemptsByWorksheetId.get(attempt.worksheet_id) ?? [];
    group.push(attempt);
    attemptsByWorksheetId.set(attempt.worksheet_id, group);
  }

  const attemptsByUserId = new Map<string, AttemptRow[]>();
  for (const attempt of attemptsByUser) {
    if (!attempt.user_id) continue;
    const group = attemptsByUserId.get(attempt.user_id) ?? [];
    group.push(attempt);
    attemptsByUserId.set(attempt.user_id, group);
  }

  const rows = users
    .map((user) => {
      const email = user.email?.toLowerCase() ?? "";
      const profile = profilesById.get(user.id);
      const userMastery = masteryByUser.get(user.id) ?? [];
      const assignedWorksheets = [
        ...(worksheetsByUser.get(user.id) ?? []),
        ...(worksheetsByEmail.get(email) ?? []),
      ].filter(
        (worksheet, index, all) =>
          all.findIndex((candidate) => candidate.id === worksheet.id) === index
      );
      const worksheetAttempts = [
        ...(attemptsByUserId.get(user.id) ?? []),
        ...assignedWorksheets.flatMap(
          (worksheet) => attemptsByWorksheetId.get(worksheet.id) ?? []
        ),
      ].filter(
        (attempt, index, all) =>
          all.findIndex(
            (candidate) =>
              candidate.worksheet_id === attempt.worksheet_id &&
              candidate.started_at === attempt.started_at &&
              candidate.user_id === attempt.user_id
          ) === index
      );
      const completedWorksheetIds = new Set(
        worksheetAttempts
          .filter((attempt) => attempt.completed_at)
          .map((attempt) => attempt.worksheet_id)
      );
      const completedWorksheets = completedWorksheetIds.size;
      const overdueWorksheetCount = assignedWorksheets.filter(
        (worksheet) =>
          isOverdue(worksheet.due_at) &&
          worksheet.status !== "archived" &&
          !completedWorksheetIds.has(worksheet.id)
      ).length;
      const weakestMastery =
        [...userMastery].sort((a, b) => a.mastery_score - b.mastery_score)[0] ??
        null;
      const latestMastery = latestDate(...userMastery.map((row) => row.last_updated));
      const latestWorksheet = latestDate(
        ...worksheetAttempts.map((attempt) => attempt.completed_at ?? attempt.started_at)
      );
      const latestDiagnostic = latestDate(
        ...(diagnosticsByUser.get(user.id) ?? [])
          .map((diagnostic) => diagnostic.created_at)
      );

      return {
        user,
        profile,
        name: studentName(user, profile),
        masteryAverage: average(userMastery.map((row) => row.mastery_score)),
        weakestTopic: weakestMastery
          ? topicLabel(weakestMastery.course_slug, weakestMastery.topic_slug)
          : null,
        weakestScore: weakestMastery?.mastery_score ?? null,
        assignedWorksheetCount: assignedWorksheets.length,
        completedWorksheetCount: completedWorksheets,
        overdueWorksheetCount,
        latestActivity: latestDate(
          user.last_sign_in_at,
          user.created_at,
          latestMastery,
          latestWorksheet,
          latestDiagnostic
        ),
      };
    })
    .sort((left, right) => {
      const leftTime = Date.parse(left.latestActivity ?? "");
      const rightTime = Date.parse(right.latestActivity ?? "");
      return (
        (Number.isFinite(rightTime) ? rightTime : 0) -
        (Number.isFinite(leftTime) ? leftTime : 0)
      );
    });

  const filteredRows = rows.filter((row) => {
    const searchable = [
      row.name,
      row.user.email,
      row.profile?.email,
      row.profile?.parent_email,
      row.weakestTopic,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesFilter =
      filter === "overdue"
        ? row.overdueWorksheetCount > 0
        : filter === "low-mastery"
        ? row.masteryAverage != null && row.masteryAverage < 50
        : true;
    return matchesQuery && matchesFilter;
  });

  const filteredTotal = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(filteredTotal / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageRows = filteredRows.slice(pageStart, pageStart + pageSize);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const lowMasteryCount = rows.filter(
    (row) => row.masteryAverage != null && row.masteryAverage < 50
  ).length;
  const studentsWithOverdue = rows.filter(
    (row) => row.overdueWorksheetCount > 0
  ).length;
  const assignedTotal = rows.reduce(
    (sum, row) => sum + row.assignedWorksheetCount,
    0
  );
  const completedTotal = rows.reduce(
    (sum, row) => sum + row.completedWorksheetCount,
    0
  );
  const latestOverallActivity = latestDate(
    ...rows.map((row) => row.latestActivity)
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Tutor Workspace
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Student progress, worksheets and latest learning activity.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Back to admin
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <SummaryCard
            label="Students"
            value={`${filteredTotal}/${usersTotal}`}
            helper="filtered / total"
          />
          <SummaryCard label="Low mastery" value={String(lowMasteryCount)} />
          <SummaryCard label="Overdue" value={String(studentsWithOverdue)} />
          <SummaryCard
            label="Worksheets"
            value={`${completedTotal}/${assignedTotal}`}
            helper="completed / assigned"
          />
          <SummaryCard
            label="Latest activity"
            value={formatDateTime(latestOverallActivity)}
            compact
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <form className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <label className="flex-1 space-y-1">
              <span className="text-sm font-medium text-slate-700">
                Search students
              </span>
              <input
                type="search"
                name="q"
                defaultValue={params?.q ?? ""}
                placeholder="Name, email, parent email or weakest topic"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Filter</span>
              <select
                name="filter"
                defaultValue={filter}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 lg:w-56"
              >
                <option value="all">All students</option>
                <option value="overdue">Has overdue worksheet</option>
                <option value="low-mastery">Low mastery &lt; 50</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Page size</span>
              <select
                name="pageSize"
                defaultValue={String(pageSize)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 lg:w-32"
              >
                {ALLOWED_PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <input type="hidden" name="page" value="1" />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Apply
            </button>
            <Link
              href="/admin/students"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Clear
            </Link>
          </form>
        </section>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">Student</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-center">Mastery avg</th>
                <th className="px-5 py-3 text-left">Weakest topic</th>
                <th className="px-4 py-3 text-center">Assigned</th>
                <th className="px-4 py-3 text-center">Completed</th>
                <th className="px-4 py-3 text-center">Overdue</th>
                <th className="px-5 py-3 text-left">Latest activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageRows.map((row) => (
                <tr key={row.user.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold">
                    <Link
                      href={`/admin/students/${row.user.id}`}
                      className="hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{row.user.email}</td>
                  <td className="px-4 py-3 text-center tabular-nums">
                    {row.masteryAverage == null ? "-" : `${row.masteryAverage}%`}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {row.weakestTopic ? (
                      <>
                        <span className="font-medium text-slate-800">
                          {row.weakestTopic}
                        </span>
                        <span className="ml-2 text-xs tabular-nums text-slate-400">
                          {row.weakestScore}%
                        </span>
                      </>
                    ) : (
                      "No mastery yet"
                    )}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums">
                    {row.assignedWorksheetCount}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums">
                    {row.completedWorksheetCount}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums">
                    {row.overdueWorksheetCount > 0 ? (
                      <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
                        {row.overdueWorksheetCount}
                      </span>
                    ) : (
                      "0"
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {formatDateTime(row.latestActivity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTotal === 0 ? (
            <div className="border-t border-slate-100 p-8 text-center text-sm text-slate-500">
              No students match this search or filter. Clear the filters to see
              the full workspace again.
            </div>
          ) : null}
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Page {currentPage} of {totalPages} · Showing {pageRows.length} user
              {pageRows.length === 1 ? "" : "s"} of {filteredTotal} filtered ({usersTotal} total)
            </p>
            <div className="flex items-center gap-2">
              {hasPrevPage ? (
                <Link
                  href={buildStudentsHref({
                    q: params?.q?.trim() ?? "",
                    filter,
                    page: currentPage - 1,
                    pageSize,
                  })}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Previous
                </Link>
              ) : (
                <span className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-400">
                  Previous
                </span>
              )}
              {hasNextPage ? (
                <Link
                  href={buildStudentsHref({
                    q: params?.q?.trim() ?? "",
                    filter,
                    page: currentPage + 1,
                    pageSize,
                  })}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Next
                </Link>
              ) : (
                <span className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-400">
                  Next
                </span>
              )}
            </div>
          </div>
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
