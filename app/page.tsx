import Link from "next/link";
import type { ReactNode } from "react";

const featureChips = ["Diagnostic-led", "Explicit teaching", "Mastery checks"];

const steps = [
  {
    title: "Complete the diagnostic",
    description:
      "Start with a focused skills check across common pre-trial weak spots.",
  },
  {
    title: "Get weak areas identified",
    description:
      "See the topics and question types that need attention before more revision.",
  },
  {
    title: "Follow targeted lessons",
    description:
      "Move through explicit teaching, worked examples, and practice in order.",
  },
  {
    title: "Check readiness",
    description:
      "Use mastery quizzes to decide whether to move on or revisit a skill.",
  },
];

const lessonSequence = [
  "Watch",
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

const coverage = [
  "Differentiation",
  "Tangents and normals",
  "Stationary points",
  "Derivative tests",
  "Curve sketching",
  "Optimisation",
  "Rates of change",
  "Mixed exam practice",
];

const offers = [
  {
    title: "Diagnostic + personalised 30-day plan",
    price: "$99",
    description:
      "A clear starting point for students who need to know what to fix before trials.",
    features: [
      "Diagnostic attempt",
      "Weak area summary",
      "Prioritised 30-day study plan",
    ],
  },
  {
    title: "Review call option",
    price: "$149",
    description:
      "For families who want the plan explained and the next steps prioritised.",
    features: [
      "Diagnostic and plan",
      "Review call",
      "Next-step study recommendations",
    ],
  },
];

function PrimaryLink({
  href,
  children,
  className = "",
}: Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
}>) {
  return (
    <Link
      href={href}
      className={`inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-slate-800 ${className}`}
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
  className = "",
}: Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
}>) {
  return (
    <Link
      href={href}
      className={`inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold leading-none text-slate-900 shadow-sm transition hover:bg-slate-50 ${className}`}
    >
      {children}
    </Link>
  );
}

function Pill({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span
      className="inline-flex items-center border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium leading-none text-slate-700"
      style={{ borderRadius: 9999, whiteSpace: "nowrap" }}
    >
      {children}
    </span>
  );
}

function StepNumber({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span
      className="shrink-0 bg-slate-950 text-sm font-bold leading-none text-white"
      style={{
        display: "grid",
        placeItems: "center",
        width: 40,
        height: 40,
        minWidth: 40,
        borderRadius: 9999,
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">
              HSC Maths Advanced &middot; Trial prep beta
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Know exactly what to fix before trials.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Diagnostic-led study planning, explicit teaching, targeted
              practice, and mastery checks for NSW Year 12 Maths Advanced.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/diagnostic">Start diagnostic</PrimaryLink>
              <SecondaryLink href="/course/differential-calculus">
                View Differential Calculus course
              </SecondaryLink>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {featureChips.map((chip) => (
                <Pill key={chip}>{chip}</Pill>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              A clear path from diagnostic to targeted revision.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <StepNumber>{index + 1}</StepNumber>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionLabel>Differential Calculus Beta</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Staged lessons for the current calculus unit.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Each lesson follows Watch &rarr; Learn &rarr; Guided Practice
                &rarr; Independent Practice &rarr; Mastery Quiz.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {lessonSequence.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>

              <div className="mt-8">
                <SecondaryLink href="/course/differential-calculus">
                  Open beta course
                </SecondaryLink>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-slate-900">
                Coverage
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {coverage.map((topic) => (
                  <Pill key={topic}>{topic}</Pill>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
          <div className="max-w-2xl">
            <SectionLabel>Launch offer</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Simple trial-prep support.
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Launch pricing shown for beta enquiries.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="max-w-sm text-lg font-semibold text-slate-900">
                    {offer.title}
                  </h3>
                  <p className="text-4xl font-bold tracking-tight text-slate-900">
                    {offer.price}
                  </p>
                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  {offer.description}
                </p>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <PrimaryLink href="/diagnostic">
                    Enquire / Start diagnostic
                  </PrimaryLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <h2 className="max-w-xl text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Ready to find the highest-impact study priorities?
          </h2>
          <PrimaryLink href="/diagnostic">Start diagnostic</PrimaryLink>
        </section>

        <footer className="flex flex-col gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>HSC Maths Coach for NSW Maths Advanced students.</p>
          <nav className="flex flex-wrap gap-4" aria-label="Footer">
            <Link href="/diagnostic" className="hover:text-slate-900">
              Diagnostic
            </Link>
            <Link href="/course" className="hover:text-slate-900">
              Course
            </Link>
            <Link href="/privacy" className="hover:text-slate-900">
              Privacy Notice
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
