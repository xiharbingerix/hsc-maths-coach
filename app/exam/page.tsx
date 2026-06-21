import Link from "next/link";
import type { Metadata } from "next";
import { listExamPapers } from "../../lib/exams";
import { listTopicTests } from "../../lib/topicTests";
import { RecentResults } from "./RecentResults";

export const metadata: Metadata = {
  title: "Practice Exams | Nova Maths",
  description:
    "Timed HSC-style practice exams with a predicted band and targeted revision.",
};

export default function ExamListPage() {
  const papers = listExamPapers();
  const topicTests = listTopicTests();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <Link href="/dashboard" className="text-sm font-medium text-slate-500 underline">
            ← Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold">Practice exams</h1>
          <p className="mt-2 text-slate-600">
            Sit a timed, HSC-style paper. You&rsquo;ll get a predicted band and a
            short list of the topics to revise first.
          </p>
        </header>

        <RecentResults />

        {papers.length === 0 ? (
          <p className="text-slate-600">No practice exams are available yet.</p>
        ) : (
          <ul className="space-y-3">
            {papers.map((paper) => (
              <li
                key={paper.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <p className="text-sm font-medium text-slate-500">
                  {paper.courseTitle}
                </p>
                <h2 className="mt-1 text-xl font-bold">{paper.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{paper.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {paper.timeLimitMins} min
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {paper.totalMarks} marks
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {paper.questionCount} questions
                  </span>
                </div>
                <Link
                  href={`/exam/${paper.id}`}
                  className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Start exam →
                </Link>
              </li>
            ))}
          </ul>
        )}

        {topicTests.length > 0 && (
          <section className="space-y-3">
            <div>
              <h2 className="text-2xl font-bold">Topic tests</h2>
              <p className="mt-1 text-slate-600">
                A timed, one-hour diagnostic for a single topic. Questions are
                drawn at random each attempt, and your result shows exactly which
                subtopics to re-practise.
              </p>
            </div>
            <ul className="space-y-3">
              {topicTests.map((t) => (
                <li
                  key={`${t.courseSlug}/${t.topicSlug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-sm font-medium text-slate-500">
                    {t.courseTitle}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    {t.topicTitle} — Topic Test
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      60 min
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {t.subtopicCount} subtopics
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      D4–D5
                    </span>
                  </div>
                  <Link
                    href={`/topic-test/${t.courseSlug}/${t.topicSlug}`}
                    className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Start topic test →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
