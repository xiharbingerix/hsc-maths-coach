import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../../lib/adminSession";
import { normaliseMultiFilter } from "../../../../lib/questionExportFilters";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { ExportClient, type ExportQuestion } from "./ExportClient";

export const metadata: Metadata = {
  title: "Export Questions | Nova Maths Admin",
};

export const dynamic = "force-dynamic";

const DIFF_LEVELS = [1, 2, 3, 4, 5, 6] as const;
const DIFF_LABEL: Record<number, string> = {
  1: "D1 – Easy",
  2: "D2",
  3: "D3 – Medium",
  4: "D4",
  5: "D5 – Hard",
  6: "D6 – Exam",
};

function prettify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function fetchDistinctQuestionFieldValues(
  filters: { course?: string; topics?: string[]; activeOnly?: boolean },
  field: "topic_slug" | "subtopic_slug"
) {
  const values = new Set<string>();
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    let query = supabaseAdmin
      .from("questions")
      .select(field)
      .order(field)
      .range(from, from + pageSize - 1);

    if (filters.activeOnly ?? true) query = query.eq("is_active", true);
    if (filters.course) query = query.eq("course_slug", filters.course);
    if (filters.topics?.length) query = query.in("topic_slug", filters.topics);

    const { data, error } = await query;
    if (error) throw error;

    const rows = (data ?? []) as Array<Record<typeof field, string | null>>;
    for (const row of rows) {
      const value = row[field];
      if (value) values.add(value);
    }

    if (rows.length < pageSize) break;
  }

  return [...values].sort();
}

export default async function AdminQuestionExportPage({
  searchParams,
}: {
  searchParams: Promise<{
    course?: string;
    topic?: string | string[];
    subtopic?: string | string[];
    diff?: string | string[];
    q?: string;
    active?: string | string[];
  }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const filterCourse = params.course?.trim() ?? "";
  const filterTopics = normaliseMultiFilter(params.topic);
  const filterSubtopics = normaliseMultiFilter(params.subtopic);

  // diff can be a single string or array (repeated ?diff=3&diff=5)
  const rawDiffs = Array.isArray(params.diff)
    ? params.diff
    : params.diff
      ? [params.diff]
      : [];
  const filterDiffs = rawDiffs.map(Number).filter((n) => n >= 1 && n <= 6);

  const filterQ = params.q?.trim().toLowerCase() ?? "";

  // active checkbox: when "Include inactive" is checked it sends active=0
  const rawActive = Array.isArray(params.active) ? params.active[0] : params.active;
  const activeOnly = rawActive !== "0";

  // ── Fetch filter option data ────────────────────────────────────────────────

  const { data: courseData } = await supabaseAdmin.rpc("distinct_question_courses");
  const uniqueCourses = ((courseData ?? []) as { course_slug: string }[]).map((r) => r.course_slug);

  // ── Fetch matching questions ────────────────────────────────────────────────

  let query = supabaseAdmin
    .from("questions")
    .select(
      "id, source_id, course_slug, topic_slug, subtopic_slug, difficulty, question_type, prompt, latex, choices, answer, accepted_answers, hint, explanation, syllabus_ref, diagram_data, question_parts"
    )
    .order("course_slug")
    .order("topic_slug")
    .order("subtopic_slug")
    .order("difficulty")
    .order("source_id");

  if (activeOnly) query = query.eq("is_active", true);
  if (filterCourse) query = query.eq("course_slug", filterCourse);
  if (filterTopics.length > 0) query = query.in("topic_slug", filterTopics);
  if (filterSubtopics.length > 0) query = query.in("subtopic_slug", filterSubtopics);
  if (filterDiffs.length > 0) query = query.in("difficulty", filterDiffs);

  const { data, error } = await query.limit(500);

  let questions = (data as ExportQuestion[] | null) ?? [];

  if (filterQ) {
    questions = questions.filter(
      (q) =>
        q.source_id.toLowerCase().includes(filterQ) ||
        q.prompt.toLowerCase().includes(filterQ)
    );
  }

  const hasFilters =
    filterCourse ||
    filterTopics.length > 0 ||
    filterSubtopics.length > 0 ||
    filterDiffs.length > 0 ||
    filterQ;

  // Build matching URL for the markdown download API route
  const mdParams = new URLSearchParams();
  if (filterCourse) mdParams.set("course", filterCourse);
  for (const topic of filterTopics) mdParams.append("topic", topic);
  for (const subtopic of filterSubtopics) mdParams.append("subtopic", subtopic);
  if (filterDiffs.length > 0) mdParams.set("diff", filterDiffs.join(","));
  if (filterQ) mdParams.set("q", filterQ);
  if (!activeOnly) mdParams.set("active", "0");
  const downloadUrl = `/api/admin/questions/export-md${mdParams.size > 0 ? `?${mdParams.toString()}` : ""}`;

  // ── Topic options (only relevant if course is selected) ────────────────────

  const uniqueTopics = filterCourse
    ? await fetchDistinctQuestionFieldValues(
        { course: filterCourse, activeOnly: true },
        "topic_slug"
      )
    : [];

  const uniqueSubtopics = filterCourse
    ? await fetchDistinctQuestionFieldValues(
        { course: filterCourse, topics: filterTopics, activeOnly: true },
        "subtopic_slug"
      )
    : [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="no-print flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin
            </p>
            <h1 className="mt-1 text-2xl font-bold">Export questions</h1>
            <p className="mt-1 text-sm text-slate-500">
              Filter then print. Answers are hidden by default — toggle them on before printing for a mark scheme.
            </p>
          </div>
          <Link
            href="/admin/questions"
            className="no-print rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            ← Question Bank
          </Link>
        </div>

        {/* ── Filter form ───────────────────────────────────────────────────── */}
        <form
          method="GET"
          className="no-print rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Course */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Course
              </label>
              <select
                name="course"
                defaultValue={filterCourse}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
              >
                <option value="">All courses</option>
                {uniqueCourses.map((slug) => (
                  <option key={slug} value={slug}>
                    {prettify(slug)}
                  </option>
                ))}
              </select>
            </div>

            {/* Topics */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Topics
              </label>
              {uniqueTopics.length > 0 ? (
                <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                  {uniqueTopics.map((slug) => (
                    <label
                      key={slug}
                      className="flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 text-sm text-slate-700 hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        name="topic"
                        value={slug}
                        defaultChecked={filterTopics.includes(slug)}
                        className="mt-0.5 size-4 shrink-0 accent-slate-900"
                      />
                      <span>{prettify(slug)}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  name="topic"
                  defaultValue={filterTopics.join(", ")}
                  placeholder="Comma-separated topic slugs"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                />
              )}
            </div>

            {/* Subtopics */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Subtopics
              </label>
              {uniqueSubtopics.length > 0 ? (
                <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                  {uniqueSubtopics.map((slug) => (
                    <label
                      key={slug}
                      className="flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 text-sm text-slate-700 hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        name="subtopic"
                        value={slug}
                        defaultChecked={filterSubtopics.includes(slug)}
                        className="mt-0.5 size-4 shrink-0 accent-slate-900"
                      />
                      <span>{prettify(slug)}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  name="subtopic"
                  defaultValue={filterSubtopics.join(", ")}
                  placeholder="Comma-separated subtopic slugs"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                />
              )}
            </div>

            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Search (ID or prompt)
              </label>
              <input
                type="search"
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="e.g. y12adv-c36 or integration"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
              />
            </div>

            {/* Difficulty checkboxes */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Difficulty
              </label>
              <div className="flex flex-wrap gap-2">
                {DIFF_LEVELS.map((d) => (
                  <label
                    key={d}
                    className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 has-[:checked]:border-slate-400 has-[:checked]:bg-slate-900 has-[:checked]:text-white"
                  >
                    <input
                      type="checkbox"
                      name="diff"
                      value={d}
                      defaultChecked={filterDiffs.includes(d)}
                      className="sr-only"
                    />
                    {DIFF_LABEL[d]}
                  </label>
                ))}
                <label className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 has-[:checked]:border-slate-400 has-[:checked]:bg-white has-[:checked]:text-slate-900">
                  <input
                    type="checkbox"
                    name="active"
                    value="0"
                    defaultChecked={!activeOnly}
                    className="sr-only"
                  />
                  Include inactive
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Apply filters
            </button>
            {hasFilters && (
              <Link
                href="/admin/questions/export"
                className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Clear
              </Link>
            )}
          </div>
        </form>

        {error && (
          <div className="no-print rounded-xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {(error as { message?: string }).message ?? String(error)}
          </div>
        )}

        {/* ── Question cards + print controls ───────────────────────────────── */}
        {hasFilters || questions.length > 0 ? (
          <ExportClient questions={questions} downloadUrl={downloadUrl} />
        ) : (
          <div className="no-print rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Use the filters above to select questions to export.
          </div>
        )}
      </div>
    </main>
  );
}
