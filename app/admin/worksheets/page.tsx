import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { newCoursePathways } from "../../../lib/newCourseCatalog";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getSiteUrl } from "../../../lib/stripe";
import { CopyButton } from "./CopyButton";

export const metadata: Metadata = {
  title: "Worksheets | Nova Maths Admin",
};

const courseLabelMap = new Map<string, string>(
  newCoursePathways.map((pathway) => [pathway.slug, pathway.title])
);

type TopicConfig = {
  courseSlug?: string;
  course_slug?: string;
  topicSlugs?: string[];
  topic_slugs?: string[];
  preset?: string;
};

type WorksheetRow = {
  id: string;
  title: string;
  year_level: string;
  topic_config: TopicConfig;
  share_token: string;
  assigned_student_name: string | null;
  assigned_student_email: string | null;
  due_at: string | null;
  status: string | null;
  created_at: string;
};

type AttemptSummary = {
  count: number;
  latestStudentName?: string;
  latestScore?: { correct: number; total: number };
};

export default async function WorksheetsPage() {
  await requireAdmin();

  const { data: worksheets } = await supabaseAdmin
    .from("worksheets")
    .select(
      "id, title, year_level, topic_config, share_token, assigned_student_name, assigned_student_email, due_at, status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  const ws = (worksheets as WorksheetRow[] | null) ?? [];

  const questionCounts: Record<string, number> = {};
  const attemptSummaries: Record<string, AttemptSummary> = {};

  if (ws.length > 0) {
    const ids = ws.map((w) => w.id);

    const { data: qRows } = await supabaseAdmin
      .from("worksheet_questions")
      .select("worksheet_id")
      .in("worksheet_id", ids);

    if (qRows) {
      for (const row of qRows as { worksheet_id: string }[]) {
        questionCounts[row.worksheet_id] = (questionCounts[row.worksheet_id] ?? 0) + 1;
      }
    }

    const { data: aRows } = await supabaseAdmin
      .from("worksheet_attempts")
      .select("worksheet_id, student_name, score_correct, score_total, completed_at, started_at")
      .in("worksheet_id", ids)
      .order("started_at", { ascending: false });

    if (aRows) {
      for (const row of aRows as {
        worksheet_id: string;
        student_name: string | null;
        score_correct: number | null;
        score_total: number | null;
        completed_at: string | null;
      }[]) {
        const summary = attemptSummaries[row.worksheet_id] ?? { count: 0 };
        summary.count++;
        if (!summary.latestStudentName) {
          summary.latestStudentName = row.student_name?.trim() || "Anonymous student";
        }
        if (
          row.completed_at &&
          row.score_correct != null &&
          row.score_total != null &&
          !summary.latestScore
        ) {
          summary.latestScore = { correct: row.score_correct, total: row.score_total };
        }
        attemptSummaries[row.worksheet_id] = summary;
      }
    }
  }

  const baseUrl = getSiteUrl();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-8">

        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Worksheets</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/worksheets/new"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              + New worksheet
            </Link>
            <Link
              href="/admin"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              ← Admin
            </Link>
          </div>
        </header>

        {ws.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            No worksheets yet.{" "}
            <Link
              href="/admin/worksheets/new"
              className="font-semibold text-slate-900 underline"
            >
              Generate one
            </Link>
            .
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left">Title</th>
                  <th className="px-5 py-3 text-left">Assigned to</th>
                  <th className="px-5 py-3 text-left">Course / Year</th>
                  <th className="px-5 py-3 text-left">Due / Status</th>
                  <th className="px-5 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-center">Qs</th>
                  <th className="px-5 py-3 text-left">Latest student</th>
                  <th className="px-4 py-3 text-center">Attempts</th>
                  <th className="px-4 py-3 text-center">Latest score</th>
                  <th className="px-5 py-3 text-left">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ws.map((w) => {
                  const qCount = questionCounts[w.id] ?? 0;
                  const aSummary = attemptSummaries[w.id];
                  const assignedName =
                    w.assigned_student_name?.trim() || "Unassigned";
                  const assignedEmail = w.assigned_student_email?.trim();
                  const dueLabel = w.due_at
                    ? new Date(w.due_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "No due date";
                  const statusLabel = w.status?.trim() || "active";
                  const shareUrl = `${baseUrl}/worksheet/${w.share_token}`;
                  const courseSlug =
                    w.topic_config?.courseSlug ?? w.topic_config?.course_slug ?? "—";
                  const courseLabel = courseLabelMap.get(courseSlug) ?? courseSlug;
                  return (
                    <tr key={w.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium">
                        <Link
                          href={`/admin/worksheets/${w.id}`}
                          className="hover:underline"
                        >
                          {w.title}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        <div className="max-w-[180px]">
                          <p className="truncate font-medium text-slate-700">
                            {assignedName}
                          </p>
                          {assignedEmail ? (
                            <p className="truncate text-xs text-slate-400">
                              {assignedEmail}
                            </p>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {courseLabel} / Yr&nbsp;{w.year_level}
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        <p>{dueLabel}</p>
                        <span className="mt-1 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold capitalize text-slate-600">
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500">
                        {new Date(w.created_at).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-center tabular-nums text-slate-700">
                        {qCount}
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {aSummary?.latestStudentName ?? "Anonymous student"}
                      </td>
                      <td className="px-4 py-3 text-center tabular-nums text-slate-700">
                        {aSummary?.count ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center tabular-nums text-slate-600">
                        {aSummary?.latestScore
                          ? `${aSummary.latestScore.correct}/${aSummary.latestScore.total}`
                          : "—"}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`${shareUrl}?adminPreview=1`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            Open
                          </a>
                          <span className="max-w-[160px] truncate font-mono text-xs text-slate-400">
                            /worksheet/{w.share_token.slice(0, 8)}…
                          </span>
                          <CopyButton text={shareUrl} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
