import Link from "next/link";
import type { Metadata } from "next";
import { listExamPapers } from "../../lib/exams";
import { RecentResults } from "./RecentResults";

export const metadata: Metadata = {
  title: "Practice Exams | Nova Maths",
  description:
    "Timed HSC-style practice exams with a predicted band and targeted revision.",
};

export default function ExamListPage() {
  const papers = listExamPapers();

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
      </div>
    </main>
  );
}
