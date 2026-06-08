import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const metadata: Metadata = {
  title: "Students | Nova Maths Admin",
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
  mastery_score: number;
  last_updated: string | null;
};

type WorksheetRow = {
  id: string;
  assigned_to_user: string | null;
  assigned_student_email: string | null;
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

export default async function AdminStudentsPage() {
  await requireAdmin();

  const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  const users = ((usersData?.users ?? []) as AdminAuthUser[]).filter(
    (user) => user.email
  );
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
          .select("user_id, mastery_score, last_updated")
          .in("user_id", userIds)
      : Promise.resolve({ data: [] }),
    emails.length
      ? supabaseAdmin
          .from("worksheets")
          .select("id, assigned_to_user, assigned_student_email, created_at")
          .in("assigned_student_email", emails)
      : Promise.resolve({ data: [] }),
    userIds.length
      ? supabaseAdmin
          .from("worksheets")
          .select("id, assigned_to_user, assigned_student_email, created_at")
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

  const rows = users
    .map((user) => {
      const email = user.email?.toLowerCase() ?? "";
      const userMastery = masteryRows.filter((row) => row.user_id === user.id);
      const assignedWorksheets = worksheets.filter(
        (worksheet) =>
          worksheet.assigned_to_user === user.id ||
          worksheet.assigned_student_email?.toLowerCase() === email
      );
      const assignedWorksheetIds = new Set(
        assignedWorksheets.map((worksheet) => worksheet.id)
      );
      const worksheetAttempts = [
        ...attemptsByUser.filter((attempt) => attempt.user_id === user.id),
        ...attemptsByWorksheet.filter((attempt) =>
          assignedWorksheetIds.has(attempt.worksheet_id)
        ),
      ].filter(
        (attempt, index, all) =>
          all.findIndex(
            (candidate) =>
              candidate.worksheet_id === attempt.worksheet_id &&
              candidate.started_at === attempt.started_at
          ) === index
      );
      const completedWorksheets = worksheetAttempts.filter(
        (attempt) => attempt.completed_at
      ).length;
      const latestMastery = latestDate(...userMastery.map((row) => row.last_updated));
      const latestWorksheet = latestDate(
        ...worksheetAttempts.map((attempt) => attempt.completed_at ?? attempt.started_at)
      );
      const latestDiagnostic = latestDate(
        ...diagnostics
          .filter((diagnostic) => diagnostic.user_id === user.id)
          .map((diagnostic) => diagnostic.created_at)
      );

      return {
        user,
        profile: profilesById.get(user.id),
        masteryAverage: average(userMastery.map((row) => row.mastery_score)),
        assignedWorksheetCount: assignedWorksheets.length,
        completedWorksheetCount: completedWorksheets,
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
      return (Number.isFinite(rightTime) ? rightTime : 0) -
        (Number.isFinite(leftTime) ? leftTime : 0);
    });

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

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">Student</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-center">Mastery avg</th>
                <th className="px-4 py-3 text-center">Assigned</th>
                <th className="px-4 py-3 text-center">Completed</th>
                <th className="px-5 py-3 text-left">Latest activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(({ user, profile, masteryAverage, assignedWorksheetCount, completedWorksheetCount, latestActivity }) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold">
                    <Link href={`/admin/students/${user.id}`} className="hover:underline">
                      {studentName(user, profile)}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-center tabular-nums">
                    {masteryAverage == null ? "—" : `${masteryAverage}%`}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums">
                    {assignedWorksheetCount}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums">
                    {completedWorksheetCount}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {formatDateTime(latestActivity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

