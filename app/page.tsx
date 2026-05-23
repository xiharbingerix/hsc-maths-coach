import Link from "next/link";
import type { ReactNode } from "react";

const featureChips = ["Diagnostic-led", "Explicit teaching", "Mastery checks"];

const steps = [
  {
    title: "Complete the diagnostic",
    description: "Students complete a targeted 36-question Year 12 skills check.",
  },
  {
    title: "Receive a clear report or summary",
    description:
      "Priority areas, likely mark leaks, and recommended next steps are explained in plain language.",
  },
  {
    title: "Work through targeted lessons and mastery checks",
    description:
      "Students revise the highest-impact units with guided practice, independent practice, and quizzes.",
  },
];

const lessonSequence = [
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

const whatIncluded = [
  "36-question Year 12 diagnostic",
  "Six Year 12 Maths Advanced units",
  "Guided practice and independent practice",
  "Mastery quizzes",
  "Parent-friendly report option",
  "Online learning access approved manually during early access",
];

const courseCoverage = [
  "Functions and Graphing Techniques",
  "Trigonometric Functions and Graphs",
  "Differential Calculus",
  "Integral Calculus",
  "Financial Mathematics",
  "Statistical Analysis",
];

const parentNotes = [
  "The diagnostic is not a school mark or exam prediction.",
  "It is designed to identify priority areas and likely mark leaks.",
  "Reports are manually reviewed during early access.",
  "Online learning access is handled manually for now.",
];

const offers = [
  {
    title: "Free Diagnostic",
    price: "Free during early access",
    description:
      "A 36-question Year 12 Maths Advanced diagnostic that identifies priority areas across the current course.",
    features: [
      "Six-unit coverage",
      "Confidence check",
      "Immediate submission",
      "Reviewed report option available",
    ],
    buttonLabel: "Start diagnostic",
    href: "/diagnostic",
  },
  {
    title: "Diagnostic PDF Report",
    price: "$49 one-off",
    description:
      "A parent-friendly report showing strengths, priority areas, likely mark leaks, and recommended next lessons.",
    features: [
      "Unit-by-unit summary",
      "Recommended lessons",
      "30-day revision plan",
      "Manually reviewed before sending",
    ],
    buttonLabel: "Request report",
    href: "/checkout?offer=diagnostic-report",
  },
  {
    title: "Diagnostic + 30-Day Plan",
    price: "$79 one-off",
    description:
      "A diagnostic report plus a focused month of revision priorities based on the student's results.",
    features: [
      "Diagnostic PDF report",
      "30-day revision plan",
      "Recommended lessons",
      "Manually reviewed before sending",
    ],
    buttonLabel: "Request study plan",
    href: "/checkout?offer=study-plan",
  },
  {
    title: "Online Learning Access",
    price: "$19/month",
    description:
      "Structured Year 12 Maths Advanced lessons, guided practice, independent practice, and mastery quizzes.",
    features: [
      "Six Year 12 Maths Advanced units",
      "Lesson access by account",
      "Mastery checks",
      "Access approved manually during early access",
    ],
    buttonLabel: "Subscribe",
    href: "/checkout?offer=online-learning",
  },
  {
    title: "Weekly Tutoring + Online Learning",
    price: "$75/week",
    description:
      "Weekly individual support with access to the Year 12 Maths Advanced online learning package.",
    features: [
      "Weekly tutoring support",
      "Online lesson access",
      "Guided practice and mastery quizzes",
      "Diagnostic-informed priorities",
      "Support before assessments and trials",
    ],
    buttonLabel: "Enquire about tutoring",
    href: "/enquire?offer=weekly-tutoring",
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
              HSC Maths Advanced &middot; Trial revision
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              HSC Maths Advanced support that starts with a diagnostic.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Students complete a targeted diagnostic, receive clear feedback
              on priority areas, and can access structured online lessons for
              Year 12 Maths Advanced revision.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/diagnostic">Start diagnostic</PrimaryLink>
              <SecondaryLink href="/online-learning">
                Explore online learning
              </SecondaryLink>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Designed for NSW Year 12 Mathematics Advanced students preparing
              for assessments, trials, or the HSC.
            </p>

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
              <SectionLabel>What&apos;s included</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Diagnostic-led revision with a clear next step.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Current lesson flow: Learn &rarr; Guided Practice &rarr;
                Independent Practice &rarr; Mastery Quiz. The online learning
                package includes six Year 12 Maths Advanced units for broad
                trial-revision coverage.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {lessonSequence.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>

              <div className="mt-8">
                <SecondaryLink href="/online-learning">
                  Explore online learning
                </SecondaryLink>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-slate-900">
                Included
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {whatIncluded.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>Current course coverage</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Six Year 12 Maths Advanced units.
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                The course covers the main Year 12 areas students need for
                assessment and trial revision.
              </p>
            </div>
            <SecondaryLink href="/course">View course overview</SecondaryLink>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {courseCoverage.map((unit) => (
              <Pill key={unit}>{unit}</Pill>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionLabel>For parents</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Clear feedback without treating the diagnostic like a school
                mark.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                The diagnostic is designed to show what should be revised first,
                so families can choose the right level of support.
              </p>
              <div className="mt-7">
                <PrimaryLink href="/checkout?offer=diagnostic-report">
                  Request diagnostic report
                </PrimaryLink>
              </div>
            </div>
            <ul className="space-y-3 text-sm leading-6 text-slate-700">
              {parentNotes.map((note) => (
                <li
                  key={note}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
          <div className="max-w-2xl">
            <SectionLabel>Early access options</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Early access options
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Start with the free diagnostic, then choose the support that
              fits.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div>
                  <h3 className="max-w-sm text-lg font-semibold text-slate-900">
                    {offer.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
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
                  <PrimaryLink href={offer.href} className="w-full">
                    {offer.buttonLabel}
                  </PrimaryLink>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-600">
            During early access, reports and online learning access are handled
            manually so the product can be reviewed and improved carefully.
            Questions? Use the enquiry form and Joshua will follow up manually
            during early access.
          </p>
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
