import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getYear12AdvancedRouteUnit,
  year12AdvancedNestedLessonHref,
} from "../../../../lib/year12AdvancedRoutes";

const lessonSequence = [
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

export default async function Year12AdvancedUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const unit = getYear12AdvancedRouteUnit(unitSlug);

  if (!unit) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <Link
            href="/course/year-12-advanced"
            className="text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900"
          >
            Back to Year 12 Mathematics Advanced
          </Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {unit.title}
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {unit.description}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Active lessons
              </p>
              <p className="mt-1 text-3xl font-bold">
                {unit.activeLessonCount}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </p>
              <p className="mt-2 text-sm font-semibold text-green-800">
                Active
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

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Unit pathway
              </p>
              <h2 className="mt-1 text-2xl font-bold">Lesson pathway</h2>
            </div>
            <p className="text-sm text-slate-500">
              {unit.lessons.length} of {unit.outline.length} active
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {unit.outline.map((lesson, index) => {
              const isActive = unit.lessons.some(
                (activeLesson) => activeLesson.slug === lesson.slug
              );

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

              return isActive ? (
                <Link
                  key={lesson.id}
                  href={year12AdvancedNestedLessonHref(unit.slug, lesson.slug)}
                  className="block"
                >
                  {content}
                </Link>
              ) : (
                <div key={lesson.id}>{content}</div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
