import Link from "next/link";

export default function CoursePage() {
  const units = [
    {
      href: "/course/differential-calculus",
      title: "Differential Calculus",
      description:
        "Explicit teaching for derivatives, tangent gradients, stationary points, increasing and decreasing functions, curve sketching, optimisation, and rates of change.",
      status: "Active pathway",
    },
    {
      href: "/course/integral-calculus",
      title: "Integral Calculus",
      description:
        "A staged pathway for antidifferentiation, indefinite and definite integrals, initial conditions, area, the Trapezoidal rule, total change, and motion applications.",
      status: "New unit",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
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

        <div className="grid gap-5 md:grid-cols-2">
          {units.map((unit) => (
            <Link
              key={unit.href}
              href={unit.href}
              className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Unit
                </p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {unit.status}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold">{unit.title}</h2>

              <p className="mt-3 leading-7 text-slate-600">
                {unit.description}
              </p>

              <p className="mt-5 text-sm font-semibold text-slate-950">
                Open unit
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
