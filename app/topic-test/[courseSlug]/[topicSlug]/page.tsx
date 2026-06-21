import { notFound } from "next/navigation";
import { toClientExam } from "../../../../lib/exams";
import { buildTopicTest, getTopicTestPool } from "../../../../lib/topicTests";
import { ExamRunner } from "../../../exam/[examId]/ExamRunner";

// Each load assembles a fresh paper (new seed → different draw); the seed is
// encoded in the paper id so the server reconstructs the same paper on submit.
export default async function TopicTestPage({
  params,
}: {
  params: Promise<{ courseSlug: string; topicSlug: string }>;
}) {
  const { courseSlug, topicSlug } = await params;
  const pool = getTopicTestPool(courseSlug, topicSlug);
  if (!pool) notFound();

  const seed = Math.floor(Math.random() * 1_000_000);
  const paper = buildTopicTest(pool, { seed });
  if (paper.sections.length === 0) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <ExamRunner paper={toClientExam(paper)} />
      </div>
    </main>
  );
}
