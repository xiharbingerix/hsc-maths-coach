import Link from "next/link";
import { courseCatalogue } from "../../lib/courseUnits";

export default function CoursePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Course catalogue
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Online learning now includes Year 11 and Year 12 course pathways.
            The Year 12 Mathematics Advanced diagnostic and report workflow
            remain specific to that course, while lesson access covers the
            available early-access pathways.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Create an account for online learning access
                </h2>
                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  Course previews are public. Individual lessons require active
                  online learning access.
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

        <div className="grid gap-6">
          {courseCatalogue.map((course) => (
            <section
              key={course.courseSlug}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {course.yearLevel}
                    </p>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                      Early access
                    </span>
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    {course.courseTitle}
                  </h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                    {course.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    {course.unitCount} units &middot;{" "}
                    {course.activeLessonCount} active lessons
                  </p>
                </div>

                <Link
                  href={course.href}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  View {course.courseType.replace("Mathematics ", "")}
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {course.units.map((unit) => (
                  <Link
                    key={unit.href}
                    href={unit.href}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                  >
                    <h3 className="text-lg font-bold">{unit.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      {unit.activeLessonCount} active lessons
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {unit.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-slate-950">
                      View unit
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
