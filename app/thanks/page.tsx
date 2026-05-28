import Link from "next/link";

const nextSteps = [
  "Your diagnostic submission has been received.",
  "Reports are reviewed before being sent.",
  "If you requested a report or study plan, Joshua will follow up.",
  "You can also register interest in online learning access, weekly tutoring, or create an account.",
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
            Nova Maths
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Diagnostic submitted
          </h1>

          <div className="mt-5 max-w-3xl space-y-3 text-lg leading-8 text-slate-600">
            <p>Your diagnostic has been submitted.</p>
            <p>
              Reports are reviewed before being sent. The parent/guardian
              email provided will be used for follow-up.
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
                What happens next?
              </h2>
              <ul className="mt-4 max-w-2xl space-y-3 text-sm leading-6 text-slate-700">
                {nextSteps.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PrimaryLink href="/checkout?offer=diagnostic-report">
                  Request report
                </PrimaryLink>
                <SecondaryLink href="/checkout?offer=study-plan">
                  Request study plan
                </SecondaryLink>
                <SecondaryLink href="/checkout?offer=online-learning">
                  Subscribe to online learning
                </SecondaryLink>
                <SecondaryLink href="/enquire?offer=weekly-tutoring">
                  Enquire about tutoring
                </SecondaryLink>
                <SecondaryLink href="/signup">Create account</SecondaryLink>
                <SecondaryLink href="/course">
                  View course overview
                </SecondaryLink>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold">While you wait</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                You can explore the course overview and decide whether you want
                a reviewed PDF report, a 30-day plan, or online learning access.
              </p>
              <div className="mt-5">
                <SecondaryLink href="/online-learning">
                  View online learning
                </SecondaryLink>
              </div>
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
                Nova Maths offers low-cost online learning for students who
                want structured revision without weekly tutoring.
              </p>
            </div>

            <PrimaryLink href="/checkout?offer=online-learning">
              Subscribe
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
