import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../../lib/adminSession";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { WorksheetGeneratorForm } from "./WorksheetGeneratorForm";

export const metadata: Metadata = {
  title: "New Worksheet | Nova Maths Admin",
};

type CourseTopicEntry = {
  courseSlug: string;
  topicSlug: string;
};

export type CourseTopicSubtopicEntry = {
  courseSlug: string;
  topicSlug: string;
  subtopicSlug: string;
};

type QuestionMetaRow = {
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
};

async function loadCourseMeta(): Promise<{
  courseTopics: CourseTopicEntry[];
  courseTopicSubtopics: CourseTopicSubtopicEntry[];
}> {
  const rows: QuestionMetaRow[] = [];
  const batchSize = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabaseAdmin
      .from("questions")
      .select("course_slug, topic_slug, subtopic_slug")
      .eq("is_active", true)
      .order("course_slug")
      .order("topic_slug")
      .order("subtopic_slug")
      .range(from, from + batchSize - 1);

    if (error) throw error;
    rows.push(...((data ?? []) as QuestionMetaRow[]));
    if (!data || data.length < batchSize) break;
    from += batchSize;
  }

  const seenTopics = new Set<string>();
  const seenSubtopics = new Set<string>();
  const courseTopics: CourseTopicEntry[] = [];
  const courseTopicSubtopics: CourseTopicSubtopicEntry[] = [];

  for (const row of rows) {
    const topicKey = `${row.course_slug}::${row.topic_slug}`;
    if (!seenTopics.has(topicKey)) {
      seenTopics.add(topicKey);
      courseTopics.push({ courseSlug: row.course_slug, topicSlug: row.topic_slug });
    }
    if (row.subtopic_slug) {
      const subtopicKey = `${row.course_slug}::${row.topic_slug}::${row.subtopic_slug}`;
      if (!seenSubtopics.has(subtopicKey)) {
        seenSubtopics.add(subtopicKey);
        courseTopicSubtopics.push({
          courseSlug: row.course_slug,
          topicSlug: row.topic_slug,
          subtopicSlug: row.subtopic_slug,
        });
      }
    }
  }

  return { courseTopics, courseTopicSubtopics };
}

export default async function NewWorksheetPage({
  searchParams,
}: {
  searchParams?: Promise<{
    studentName?: string;
    studentEmail?: string;
    studentId?: string;
    course?: string;
    topic?: string;
    subtopic?: string;
    title?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const initialStudentName =
    typeof params?.studentName === "string" ? params.studentName : "";
  const initialStudentEmail =
    typeof params?.studentEmail === "string" ? params.studentEmail : "";
  const initialStudentId =
    typeof params?.studentId === "string" ? params.studentId : "";
  const initialCourseSlug =
    typeof params?.course === "string" ? params.course : "";
  const initialTopicSlug =
    typeof params?.topic === "string" ? params.topic : "";
  const initialSubtopicSlug =
    typeof params?.subtopic === "string" ? params.subtopic : "";
  const initialTitle =
    typeof params?.title === "string" ? params.title : "";

  // Load distinct (course, topic, subtopic) tuples from active questions.
  // Returns empty lists if the questions table is empty or migration not applied.
  let courseTopics: CourseTopicEntry[] = [];
  let courseTopicSubtopics: CourseTopicSubtopicEntry[] = [];

  try {
    ({ courseTopics, courseTopicSubtopics } = await loadCourseMeta());
  } catch {
    // Questions table may not exist yet — handled below via empty courseTopics
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              New Worksheet
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              Select a course, topics, and difficulty to generate a student link.
            </p>
          </div>
          <Link
            href="/admin"
            className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            ← Admin
          </Link>
        </header>

        {/* Setup notice when questions table is empty */}
        {courseTopics.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="font-semibold text-amber-900">No questions found</p>
            <p className="mt-2 text-sm leading-6 text-amber-800">
              The questions table is empty or the migration has not been applied.
              Run the steps below, then reload this page.
            </p>
            <ol className="mt-4 list-inside list-decimal space-y-1.5 text-sm text-amber-900">
              <li>
                Apply{" "}
                <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                  lib/supabase-migrations/005_question_bank.sql
                </code>{" "}
                in the Supabase SQL editor.
              </li>
              <li>
                Run{" "}
                <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                  npx tsx scripts/seed-question-bank.ts --course=year-8-mathematics
                </code>{" "}
                (or{" "}
                <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                  --course=year-9-mathematics
                </code>
                {", "}etc.)
              </li>
              <li>Reload this page.</li>
            </ol>
          </div>
        ) : (
          <div className="space-y-4">
            {initialCourseSlug && (
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
                Pre-filled from lesson plan
                {initialTopicSlug ? ` — topic preselected where available` : ""}.
                Adjust selections as needed.
              </div>
            )}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <WorksheetGeneratorForm
                courseTopics={courseTopics}
                courseTopicSubtopics={courseTopicSubtopics}
                initialStudentName={initialStudentName}
                initialStudentEmail={initialStudentEmail}
                initialStudentId={initialStudentId}
                initialCourseSlug={initialCourseSlug}
                initialTopicSlug={initialTopicSlug}
                initialSubtopicSlug={initialSubtopicSlug}
                initialTitle={initialTitle}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
