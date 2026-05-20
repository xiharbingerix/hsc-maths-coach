import Link from "next/link";
import {
  differentialCalculusOutline,
  differentialCalculusLessons,
} from "../../../lib/lessons/differentialCalculus";

export default function DifferentialCalculusModulePage() {
  const activeCount = differentialCalculusLessons.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Year 12 Mathematics Advanced
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Differential Calculus
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            A syllabus-aligned explicit teaching unit for Year 12 differential
            calculus. Each lesson follows a clear sequence: learning intention,
            success criteria, prerequisite check, direct teaching, worked
            examples, guided practice, independent practice, common mistakes,
            and mastery check.
          </p>

          <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
            {activeCount} lesson currently active. More lessons are listed in
            the planned sequence and will be added progressively.
          </div>
        </header>

        <div className="space-y-4">
          {differentialCalculusOutline.map((lesson, index) => {
            const isActive = lesson.status === "active";

            if (isActive) {
              return (
                <Link
                  key={lesson.id}
                  href={`/course/differential-calculus/${lesson.slug}`}
                  className="block rounded-2xl bg-white p-6 shadow-sm hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        Lesson {index + 1}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold">
                        {lesson.title}
                      </h2>

                      <p className="mt-2 text-slate-600">
                        {lesson.description}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      Active
                    </span>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={lesson.id}
                className="rounded-2xl bg-white p-6 opacity-75 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Lesson {index + 1}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">{lesson.title}</h2>

                    <p className="mt-2 text-slate-600">
                      {lesson.description}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    Coming soon
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}