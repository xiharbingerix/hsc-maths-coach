import Link from "next/link";
import { courseCatalogue } from "../../lib/courseUnits";
import type { CoursePathwayStatus } from "../../lib/courseTypes";

const statusCopy: Record<
  CoursePathwayStatus,
  { label: string; classes: string; cta: string }
> = {
  available: {
    label: "Available",
    classes: "bg-green-100 text-green-800",
    cta: "View course",
  },
  in_progress: {
    label: "In progress",
    classes: "bg-amber-100 text-amber-800",
    cta: "View course",
  },
  coming_soon: {
    label: "Coming soon",
    classes: "bg-slate-200 text-slate-700",
    cta: "View outline",
  },
};

export default function CoursePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Online Maths Courses
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Choose a course pathway to view its units and lesson sequence.
            Course previews are public, while individual lessons require active
            online learning access.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Online learning access
                </h2>
                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  The Year 12 Mathematics Advanced diagnostic and report
                  workflow remains specific to that course. Online lessons are
                  organised by the pathways below.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
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
                  href="/checkout?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courseCatalogue.map((course) => {
            const status = statusCopy[course.status];
            const hasActiveLessons = course.activeLessonCount > 0;

            return (
              <article
                key={course.courseSlug}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {course.yearLevel}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${status.classes}`}
                  >
                    {status.label}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight">
                  {course.courseTitle}
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {course.courseType}
                </p>
                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {course.description}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Units
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {hasActiveLessons
                        ? course.unitCount
                        : `${course.unitCount} planned`}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Lessons
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {hasActiveLessons
                        ? `${course.activeLessonCount} active`
                        : "Not active"}
                    </p>
                  </div>
                </div>

                <Link
                  href={course.href}
                  className={`mt-5 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition ${
                    hasActiveLessons
                      ? "bg-slate-950 text-white hover:bg-slate-800"
                      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {status.cta}
                </Link>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
