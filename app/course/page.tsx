import Link from "next/link";

export default function CoursePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Year 12 Mathematics Advanced
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Syllabus-aligned explicit teaching modules for HSC Mathematics
            Advanced. Each lesson uses clear instruction, worked examples,
            guided practice, independent practice, common mistakes, and mastery
            checks.
          </p>
        </header>

        <Link
          href="/course/differential-calculus"
          className="block rounded-2xl bg-white p-6 shadow-sm hover:bg-slate-50"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Unit
          </p>

          <h2 className="mt-2 text-2xl font-bold">Differential Calculus</h2>

          <p className="mt-2 text-slate-600">
            Explicit teaching for derivatives, tangent gradients, stationary
            points, increasing and decreasing functions, curve sketching,
            optimisation, and rates of change.
          </p>
        </Link>
      </section>
    </main>
  );
}