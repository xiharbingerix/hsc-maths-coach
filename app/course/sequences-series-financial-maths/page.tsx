import Link from "next/link";
import {
  sequencesSeriesFinancialMathsLessons,
  sequencesSeriesFinancialMathsOutline,
} from "../../../lib/lessons/sequencesSeriesFinancialMaths";

const lessonSequence = [
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

const unitCoverage = [
  "Arithmetic nth-term rules",
  "Geometric nth-term rules",
  "Sequence classification",
  "Arithmetic series",
  "Geometric series",
  "Sigma notation",
  "Limiting sums",
  "Compound interest",
  "Depreciation",
  "Annuity timing",
  "Financial growth factors",
  "Mixed HSC-style practice",
];

export default function SequencesSeriesFinancialMathsModulePage() {
  const activeCount = sequencesSeriesFinancialMathsLessons.length;
  const plannedCount = sequencesSeriesFinancialMathsOutline.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Course: Year 12 Mathematics Advanced
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Sequences, Series and Financial Mathematics
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600">
            A HSC-focused pathway through arithmetic and geometric sequences,
            finite series, sigma notation, limiting sums, and financial
            applications involving compound interest, depreciation and
            annuity-style payments.
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
                <li>Review term rules before moving into series totals.</li>
                <li>Separate term, sum and limiting-sum questions before choosing a formula.</li>
                <li>Use the financial lesson to connect growth factors and annuity timing to series work.</li>
                <li>In money contexts, check whether values are deposits, balances, repayments or totals.</li>
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
              <ol className="space-y-3">
                {sequencesSeriesFinancialMathsOutline.map((lesson, index) => {
                  const isActive = lesson.status === "active";

                  return (
                    <li
                      key={lesson.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-500">
                            Lesson {index + 1}
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-slate-900">
                            {lesson.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-600">
                            {lesson.description}
                          </p>
                        </div>

                        <span className="inline-flex shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Active
                        </span>
                      </div>

                      {isActive ? (
                        <Link
                          href={`/course/sequences-series-financial-maths/${lesson.slug}`}
                          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                          Start lesson
                        </Link>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
