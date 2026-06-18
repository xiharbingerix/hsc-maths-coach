import Link from "next/link";
import { courseUnits, year12AdvancedCourse } from "../../../lib/courseUnits";
import { year12AdvancedNestedUnitHref } from "../../../lib/year12AdvancedRoutes";

const lessonSequence = [
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

export default function Year12AdvancedPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Course pathway
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {year12AdvancedCourse.courseTitle}
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {year12AdvancedCourse.description}
          </p>

          <p className="mt-4 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-4 leading-7 text-amber-900">
            Year 12 Mathematics Advanced covers the seven NSW 2024 Year-12 focus
            areas — {year12AdvancedCourse.activeLessonCount} active lessons
            across further graph transformations and modelling, sequences and
            series, differential and integral calculus, applications of
            calculus, random variables, and financial mathematics. The Year 11
            topics are covered in the separate Year 11 Advanced course.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Units
              </p>
              <p className="mt-1 text-3xl font-bold">
                {year12AdvancedCourse.unitCount}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Active lessons
              </p>
              <p className="mt-1 text-3xl font-bold">
                {year12AdvancedCourse.activeLessonCount}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lesson flow
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {lessonSequence.join(" -> ")}
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courseUnits.map((unit) => (
            <Link
              key={unit.href}
              href={year12AdvancedNestedUnitHref(
                unit.href.replace("/course/", "")
              )}
              className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Unit
                </p>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  Active
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold">{unit.title}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {unit.activeLessonCount} active lessons
              </p>
              <p className="mt-3 leading-7 text-slate-600">
                {unit.description}
              </p>
              <p className="mt-5 text-sm font-semibold text-slate-950">
                View unit
              </p>
            </Link>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Year 12 Advanced diagnostic and lessons
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                The diagnostic and report workflow is specific to Year 12
                Mathematics Advanced. Unit previews are public, while
                individual lessons require online learning access.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/diagnostic/select"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Start diagnostic
              </Link>
              <Link
                href="/online-learning"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Online learning
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
