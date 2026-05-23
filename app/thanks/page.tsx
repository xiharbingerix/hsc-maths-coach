import Link from "next/link";

const packageFeatures = [
  "HSC Maths Advanced lessons",
  "Explicit teaching",
  "Worked examples",
  "Guided practice",
  "Independent practice",
  "Mastery quizzes",
  "Targeted units including calculus, functions, trigonometry, financial mathematics, and statistics",
];

function PrimaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Diagnostic submitted
          </h1>

          <div className="mt-5 max-w-3xl space-y-3 text-lg leading-8 text-slate-600">
            <p>Your diagnostic has been submitted.</p>
            <p>
              During early access, reports are reviewed before being sent. The
              parent/guardian email provided will be used for follow-up.
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Want targeted online lessons while you wait?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                If you selected online learning access, you can create an
                account or register interest. You can also start exploring the
                course overview while the diagnostic report is being reviewed.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PrimaryLink href="/online-learning">
                  View online learning
                </PrimaryLink>
                <SecondaryLink href="/signup">Create account</SecondaryLink>
                <SecondaryLink href="/enquire?offer=online-learning">
                  Register interest
                </SecondaryLink>
                <SecondaryLink href="/course">
                  View course overview
                </SecondaryLink>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold">Included lesson tools</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {packageFeatures.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Online learning access
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                We are currently offering low-cost early access for students
                who want structured revision without weekly tutoring.
              </p>
            </div>

            <PrimaryLink href="/enquire?offer=online-learning">
              Register interest
            </PrimaryLink>
          </div>
        </section>

        <footer className="flex flex-wrap gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <Link href="/" className="font-medium text-slate-900 hover:underline">
            Back to homepage
          </Link>
          <Link
            href="/diagnostic"
            className="font-medium text-slate-900 hover:underline"
          >
            Start another diagnostic
          </Link>
        </footer>
      </section>
    </main>
  );
}
