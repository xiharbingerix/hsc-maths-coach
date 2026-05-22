import Link from "next/link";
import {
  statisticalAnalysisLessons,
  statisticalAnalysisOutline,
} from "../../../lib/lessons/statisticalAnalysis";

const lessonSequence = [
  "Watch",
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

const unitCoverage = [
  "Data displays",
  "Summary statistics",
  "Outliers",
  "Box plots and five-number summaries",
  "Standard deviation",
  "Z-scores and standardised values",
  "Correlation",
  "Least-squares regression",
  "Residuals",
  "Normal distribution and empirical rule",
];

export default function StatisticalAnalysisModulePage() {
  const activeCount = statisticalAnalysisLessons.length;
  const plannedCount = statisticalAnalysisOutline.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Course: Year 12 Mathematics Advanced
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Statistical Analysis
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600">
            A staged pathway through data displays, summary statistics,
            standard deviation, z-scores, correlation, regression, residuals,
            and normal distribution ideas.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Active lessons
              </p>
              <p className="mt-1 text-3xl font-bold">{activeCount}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Planned lessons
              </p>
              <p className="mt-1 text-3xl font-bold">{plannedCount}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lesson sequence
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {lessonSequence.join(" -> ")}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">How to use this unit</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>Start with centre, spread, and outliers before z-scores.</li>
                <li>Use the worked examples to connect calculations to context.</li>
                <li>Use multiple-choice interpretation questions to catch wording traps.</li>
                <li>Return to summary statistics when regression or normal questions feel unclear.</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">What this unit covers</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {unitCoverage.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Unit pathway
                </p>
                <h2 className="mt-1 text-2xl font-bold">Lesson pathway</h2>
              </div>

              <p className="text-sm text-slate-500">
                {activeCount} of {plannedCount} active
              </p>
            </div>

            <div className="mt-6">
              {statisticalAnalysisOutline.map((lesson, index) => {
                const isActive = lesson.status === "active";
                const isLast = index === statisticalAnalysisOutline.length - 1;
                const content = (
                  <div
                    className={`rounded-2xl border p-5 transition ${
                      isActive
                        ? "border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                        : "border-slate-100 bg-slate-50 opacity-75"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">
                          Lesson {index + 1}
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          {lesson.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {lesson.description}
                        </p>
                      </div>

                      <span
                        className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${
                          isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {isActive ? "Active" : "Coming soon"}
                      </span>
                    </div>
                  </div>
                );

                return (
                  <div
                    key={lesson.id}
                    className="relative grid grid-cols-[2rem_1fr] gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          isActive
                            ? "bg-slate-900 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {!isLast && <div className="h-full w-px bg-slate-200" />}
                    </div>

                    <div className={`${isLast ? "" : "pb-5"}`}>
                      {isActive ? (
                        <Link
                          href={`/course/statistical-analysis/${lesson.slug}`}
                          className="block"
                        >
                          {content}
                        </Link>
                      ) : (
                        content
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Part of the Online Learning Beta
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                This unit is part of the HSC Maths Advanced online learning
                beta. The lesson pathway remains visible during testing, and
                full access is approved manually during beta.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <Link
                href="/online-learning"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Learn about online learning
              </Link>
              <Link
                href="/enquire?offer=online-learning"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Register interest
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
