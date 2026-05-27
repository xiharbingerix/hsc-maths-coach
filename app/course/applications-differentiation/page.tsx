import Link from "next/link";
import {
  applicationsDifferentiationLessons,
  applicationsDifferentiationOutline,
} from "../../../lib/lessons/applicationsDifferentiation";

const lessonSequence = [
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

const unitCoverage = [
  "Second derivative and concavity",
  "Points of inflection",
  "Stationary point classification",
  "Curve sketching with calculus",
  "Optimisation",
  "Kinematics and rates of change",
];

export default function ApplicationsDifferentiationModulePage() {
  const activeCount = applicationsDifferentiationLessons.length;
  const plannedCount = applicationsDifferentiationOutline.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Course: Year 12 Mathematics Advanced
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Applications of Differentiation
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600">
            A HSC-focused unit for second derivative applications, curve
            sketching, optimisation, motion and rate interpretation.
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
                <li>Review derivative techniques before starting optimisation or kinematics.</li>
                <li>Use the concavity lessons before curve-sketch interpretation.</li>
                <li>For optimisation, check whether the question asks for the input or the optimal value.</li>
                <li>For motion, keep displacement, velocity, acceleration, speed and distance separate.</li>
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
              {applicationsDifferentiationOutline.map((lesson, index) => {
                const isLast = index === applicationsDifferentiationOutline.length - 1;
                const content = (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50">
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

                      <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                );

                return (
                  <div key={lesson.id} className="relative grid grid-cols-[2rem_1fr] gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      {!isLast && <div className="h-full w-px bg-slate-200" />}
                    </div>

                    <div className={`${isLast ? "" : "pb-5"}`}>
                      <Link
                        href={`/course/applications-differentiation/${lesson.slug}`}
                        className="block"
                      >
                        {content}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
