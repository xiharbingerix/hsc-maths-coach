import { totalActiveLessonCount } from "../../lib/courseUnits";

/**
 * "Platform depth" — four statistic cards that communicate the scale of Nova
 * Maths at a glance. Presentational; the lesson count is read live so it stays
 * accurate as content grows.
 */

const stats = [
  { value: `${totalActiveLessonCount}+`, label: "Lessons" },
  { value: "Year 7–12", label: "Coverage" },
  { value: "NSW", label: "Curriculum aligned" },
  { value: "Unlimited", label: "Diagnostics & quizzes" },
];

export function PlatformDepth() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-md"
          >
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
