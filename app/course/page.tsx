import Link from "next/link";

export default function CoursePage() {
  const units = [
    {
      href: "/course/differential-calculus",
      title: "Differential Calculus",
      description:
        "Explicit teaching for derivatives, tangent gradients, stationary points, increasing and decreasing functions, curve sketching, optimisation, and rates of change.",
      status: "Available in beta",
    },
    {
      href: "/course/integral-calculus",
      title: "Integral Calculus",
      description:
        "A staged pathway for antidifferentiation, indefinite and definite integrals, initial conditions, area, the Trapezoidal rule, total change, and motion applications.",
      status: "Available in beta",
    },
    {
      href: "/course/functions-graphing-techniques",
      title: "Functions and Graphing Techniques",
      description:
        "A staged pathway for function notation, domain and range, transformations, graph features, asymptotes, graphical solving, and modelling.",
      status: "Available in beta",
    },
    {
      href: "/course/trigonometric-functions-graphs",
      title: "Trigonometric Functions and Graphs",
      description:
        "A staged pathway for radians, exact values, the unit circle, sine, cosine, tangent graphs, and later trigonometric equations and modelling.",
      status: "Available in beta",
    },
    {
      href: "/course/financial-mathematics",
      title: "Financial Mathematics",
      description:
        "A staged pathway for growth factors, compound interest, depreciation, recurrence relations, annuities, loans, and financial decision-making.",
      status: "Available in beta",
    },
    {
      href: "/course/statistical-analysis",
      title: "Statistical Analysis",
      description:
        "A staged pathway for data displays, summary statistics, outliers, standard deviation, z-scores, correlation, regression, and normal distribution ideas.",
      status: "Available in beta",
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

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Create an account for beta access
                </h2>
                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  Course previews are available during beta. Create an account
                  or register interest for online learning access.
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
                  href="/enquire?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Register interest
                </Link>
                <Link
                  href="/online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Online learning page
                </Link>
              </div>
            </div>
          </div>
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
