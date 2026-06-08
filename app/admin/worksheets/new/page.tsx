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

export default async function NewWorksheetPage({
  searchParams,
}: {
  searchParams?: Promise<{ studentName?: string; studentEmail?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const initialStudentName =
    typeof params?.studentName === "string" ? params.studentName : "";
  const initialStudentEmail =
    typeof params?.studentEmail === "string" ? params.studentEmail : "";

  // Load distinct (course_slug, topic_slug) pairs from active questions.
  // Returns an empty list if the questions table is empty or migration not applied.
  let courseTopics: CourseTopicEntry[] = [];

  try {
    const { data } = await supabaseAdmin
      .from("questions")
      .select("course_slug, topic_slug")
      .eq("is_active", true)
      .order("course_slug")
      .order("topic_slug");

    if (data) {
      // Deduplicate (course_slug, topic_slug) pairs
      const seen = new Set<string>();
      courseTopics = (data as { course_slug: string; topic_slug: string }[])
        .filter((row) => {
          const key = `${row.course_slug}::${row.topic_slug}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((row) => ({ courseSlug: row.course_slug, topicSlug: row.topic_slug }));
    }
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
                  npx tsx scripts/seed-question-bank.ts --course=year-9-mathematics
                </code>
              </li>
              <li>Reload this page.</li>
            </ol>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <WorksheetGeneratorForm
              courseTopics={courseTopics}
              initialStudentName={initialStudentName}
              initialStudentEmail={initialStudentEmail}
            />
          </div>
        )}
      </div>
    </main>
  );
}
