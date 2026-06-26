import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const metadata: Metadata = {
  title: "Question Bank | Nova Maths Admin",
};

// ── Types ──────────────────────────────────────────────────────────────────────

type QuestionRow = {
  id: string;
  source_id: string;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  difficulty: number;
  prompt: string;
  syllabus_ref: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

type GroupEntry = {
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  batch_prefix: string;
  count: number;
  diffs: Record<number, number>;
  latest_created: string | null;
  latest_updated: string | null;
};

// ── Helpers ────────────────────────────────────────────────────────────────────

// "y12adv-c36-sample-01" → "y12adv-c36"
function batchPrefix(sourceId: string): string {
  const parts = sourceId.split("-");
  return parts.length >= 2 ? `${parts[0]}-${parts[1]}` : sourceId;
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

const DIFF_COLOUR: Record<number, string> = {
  1: "bg-emerald-50 text-emerald-700",
  2: "bg-sky-50 text-sky-700",
  3: "bg-amber-50 text-amber-700",
  4: "bg-orange-50 text-orange-700",
  5: "bg-rose-50 text-rose-700",
};

function diffBadge(d: number) {
  const cls = DIFF_COLOUR[d] ?? "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center rounded text-xs font-bold ${cls}`}
    >
      {d}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; subtopic?: string; course?: string }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const query = params?.q?.trim().toLowerCase() ?? "";
  const subtopicFilter = params?.subtopic?.trim() ?? "";
  const courseFilter = params?.course?.trim() ?? "";

  // ── Fetch course list for dropdown ─────────────────────────────────────────

  const { data: courseData } = await supabaseAdmin
    .from("questions")
    .select("course_slug")
    .order("course_slug");

  const allCourses = Array.from(
    new Set((courseData ?? []).map((r: { course_slug: string }) => r.course_slug))
  ).sort();

  // ── Fetch questions ─────────────────────────────────────────────────────────

  let dbQuery = supabaseAdmin
    .from("questions")
    .select(
      "id, source_id, course_slug, topic_slug, subtopic_slug, difficulty, prompt, syllabus_ref, is_active, created_at, updated_at"
    )
    .order("course_slug")
    .order("source_id")
    .limit(2000);

  if (courseFilter) dbQuery = dbQuery.eq("course_slug", courseFilter);

  const { data, error } = await dbQuery;

  const questions = (data as QuestionRow[] | null) ?? [];

  // ── Build summary groups ────────────────────────────────────────────────────

  const groupMap = new Map<string, GroupEntry>();

  for (const q of questions) {
    const bp = batchPrefix(q.source_id);
    const key = `${q.course_slug}|${q.topic_slug}|${q.subtopic_slug}|${bp}`;
    const g = groupMap.get(key);
    if (!g) {
      groupMap.set(key, {
        course_slug: q.course_slug,
        topic_slug: q.topic_slug,
        subtopic_slug: q.subtopic_slug,
        batch_prefix: bp,
        count: 1,
        diffs: { [q.difficulty]: 1 },
        latest_created: q.created_at,
        latest_updated: q.updated_at,
      });
    } else {
      g.count++;
      g.diffs[q.difficulty] = (g.diffs[q.difficulty] ?? 0) + 1;
      if (
        q.created_at &&
        (!g.latest_created || q.created_at > g.latest_created)
      ) {
        g.latest_created = q.created_at;
      }
      if (
        q.updated_at &&
        (!g.latest_updated || q.updated_at > g.latest_updated)
      ) {
        g.latest_updated = q.updated_at;
      }
    }
  }

  const groups = [...groupMap.values()].sort((a, b) =>
    a.batch_prefix.localeCompare(b.batch_prefix)
  );

  // ── Filter question list ────────────────────────────────────────────────────

  const filtered = questions.filter((q) => {
    const matchesSubtopic =
      !subtopicFilter || q.subtopic_slug === subtopicFilter;
    const matchesQuery =
      !query ||
      q.source_id.toLowerCase().includes(query) ||
      q.prompt.toLowerCase().includes(query);
    return matchesSubtopic && matchesQuery;
  });

  const subtopics = [...new Set(questions.map((q) => q.subtopic_slug))].sort();
  const hasFilter = !!(query || subtopicFilter || courseFilter);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Question Bank
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Read-only view of all imported questions across every course.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/questions/export${courseFilter ? `?course=${encodeURIComponent(courseFilter)}` : ""}${subtopicFilter ? `${courseFilter ? "&" : "?"}subtopic=${encodeURIComponent(subtopicFilter)}` : ""}${query ? `${courseFilter || subtopicFilter ? "&" : "?"}q=${encodeURIComponent(query)}` : ""}`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Export / Print
            </Link>
            <Link
              href="/admin"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              ← Admin
            </Link>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            Failed to load questions:{" "}
            {(error as { message?: string }).message ?? String(error)}
          </div>
        )}

        {/* ── Batch summary ────────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Imported batches —{" "}
            {questions.length} question{questions.length !== 1 ? "s" : ""} total
          </h2>

          {groups.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
              No questions found{courseFilter ? ` for course "${courseFilter}"` : ""}.
              Run the importer with{" "}
              <span className="font-mono text-xs">--write --confirm-write</span>{" "}
              to seed the database.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 text-left">Batch</th>
                    <th className="px-5 py-3 text-left">
                      Course / Topic / Subtopic
                    </th>
                    <th className="px-4 py-3 text-center">Count</th>
                    <th className="px-5 py-3 text-center">Difficulty spread</th>
                    <th className="px-5 py-3 text-left">Imported</th>
                    <th className="px-5 py-3 text-left"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {groups.map((g) => (
                    <tr key={g.batch_prefix} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-mono text-xs font-medium text-slate-700">
                        {g.batch_prefix}
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-slate-800">
                          {g.course_slug}
                        </p>
                        <p className="text-xs text-slate-400">
                          {g.topic_slug} / {g.subtopic_slug}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-slate-700">
                        {g.count}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-end justify-center gap-2">
                          {[1, 2, 3, 4, 5].map((d) => {
                            const c = g.diffs[d] ?? 0;
                            if (c === 0) return null;
                            return (
                              <span
                                key={d}
                                className="flex flex-col items-center gap-0.5"
                              >
                                {diffBadge(d)}
                                <span className="text-[10px] tabular-nums text-slate-400">
                                  {c}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-500">
                        <p>Created: {fmtDate(g.latest_created)}</p>
                        <p>Updated: {fmtDate(g.latest_updated)}</p>
                      </td>
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/questions?subtopic=${encodeURIComponent(g.subtopic_slug)}`}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                        >
                          Inspect →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Question detail list ─────────────────────────────────────────── */}
        <section>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {hasFilter
                ? `${filtered.length} of ${questions.length} questions`
                : `All ${questions.length} questions`}
            </h2>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Link
                href="/admin/questions"
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  !subtopicFilter && !query
                    ? "border-slate-800 bg-slate-800 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                All
              </Link>
              {subtopics.map((st) => (
                <Link
                  key={st}
                  href={`/admin/questions?subtopic=${encodeURIComponent(st)}`}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    subtopicFilter === st && !query
                      ? "border-slate-800 bg-slate-800 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {st}
                </Link>
              ))}
            </div>
          </div>

          {/* Search form — GET so URL is shareable */}
          <form
            method="GET"
            action="/admin/questions"
            className="mb-4 flex flex-wrap gap-2"
          >
            <select
              name="course"
              defaultValue={courseFilter}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="">All courses</option>
              {allCourses.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())}
                </option>
              ))}
            </select>
            {subtopicFilter && (
              <input type="hidden" name="subtopic" value={subtopicFilter} />
            )}
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search source_id or prompt text…"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Search
            </button>
            {hasFilter && (
              <Link
                href="/admin/questions"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Clear
              </Link>
            )}
          </form>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
              No questions match your filter.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 text-left">Source ID</th>
                    <th className="px-3 py-3 text-center">D</th>
                    <th className="px-4 py-3 text-left">Subtopic</th>
                    <th className="px-4 py-3 text-left">Ref</th>
                    <th className="px-3 py-3 text-center">Active</th>
                    <th className="px-5 py-3 text-left">Prompt</th>
                    <th className="px-5 py-3 text-left">Imported</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((q) => (
                    <tr key={q.id} className="align-top hover:bg-slate-50">
                      <td className="px-5 py-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                        {q.source_id}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {diffBadge(q.difficulty)}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                        {q.subtopic_slug}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                        {q.syllabus_ref ?? "—"}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {q.is_active ? (
                          <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                            yes
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                            no
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 max-w-sm text-slate-600">
                        <details>
                          <summary className="cursor-pointer list-none text-xs text-slate-700 [&::-webkit-details-marker]:hidden">
                            {truncate(q.prompt, 90)}
                          </summary>
                          <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs leading-relaxed text-slate-600 whitespace-pre-wrap">
                            {q.prompt}
                          </p>
                        </details>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">
                        {fmtDate(q.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
