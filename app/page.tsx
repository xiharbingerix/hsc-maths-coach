import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SubscribeCTA } from "./components/SubscribeCTA";

const featureChips = ["NSW curriculum", "Structured lessons", "Mastery quizzes"];

const steps = [
  {
    title: "Choose a lesson",
    description:
      "Pick from Year 11 or Year 12 topics across Advanced, Standard, or Extension pathways.",
  },
  {
    title: "Work through clear explanation",
    description:
      "Each lesson starts with explicit worked examples before you attempt any practice.",
  },
  {
    title: "Complete guided and independent practice",
    description:
      "Guided questions scaffold the method. Independent questions check whether you can apply it without hints.",
  },
  {
    title: "Attempt the mastery quiz",
    description:
      "A short quiz at the end of each lesson confirms whether the skill is ready for revision or needs more work.",
  },
];

const coursePills = [
  "Year 12 Advanced · 89 lessons",
  "Year 11 Advanced",
  "Year 11 Standard",
  "Year 11 Extension",
  "Year 12 Standard 2",
];

const pricingFeatures = [
  "Available Year 11 and Year 12 maths pathways",
  "Structured lessons — learn, practise, check mastery",
  "Instant access after payment when logged in",
  "Cancel any time from your account",
];

const diagnosticOptions = [
  {
    title: "Diagnostic PDF Report — $49 one-off",
    body: "Unit-by-unit summary, recommended lessons, reviewed before sending.",
    cta: "Request report",
    href: "/checkout?offer=diagnostic-report",
  },
  {
    title: "Diagnostic + 30-Day Plan — $79 one-off",
    body: "Report plus a focused month of revision priorities.",
    cta: "Request study plan",
    href: "/checkout?offer=study-plan",
  },
];

const commonQuestions = [
  {
    question: "Is this live tutoring?",
    answer:
      "No. Nova Maths is self-guided — you work at your own pace without a scheduled session. Weekly tutoring with online access is available separately at $75/week.",
  },
  {
    question: "Do I need the diagnostic first?",
    answer:
      "No. You can subscribe and start any available lesson directly. The free Year 12 Advanced diagnostic is optional for students who want to identify priority gaps first.",
  },
  {
    question: "How do I cancel?",
    answer:
      "You can cancel from your dashboard using the Manage subscription button. This opens the Stripe billing portal where you can cancel or update your payment method.",
  },
  {
    question: "What year levels are covered?",
    answer:
      "Year 12 Advanced is the most complete pathway, with 89 lessons across 12 units. Year 11 Advanced, Year 11 Extension, Year 11 Standard, and Year 12 Standard 2 are also available. Coverage is expanding.",
  },
];

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
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/brand/nova-maths-logo.png"
              alt="Nova Maths"
              width={1378}
              height={514}
              className="h-10 w-auto sm:h-14"
              priority
            />
          </Link>
          <Link
            href="/login"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Log in
          </Link>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">
              NSW Stage 6 maths &middot; Year 11 and Year 12
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Structured online maths lessons for NSW Year 11 and Year 12
              students.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Work through lessons, guided practice and mastery quizzes at your
              own pace. Built for the NSW senior maths curriculum by a working
              tutor.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SubscribeCTA href="/checkout?offer=online-learning">
                Subscribe &mdash; $19/month
              </SubscribeCTA>
              <SecondaryLink href="/diagnostic">
                Start free diagnostic
              </SecondaryLink>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              $19/month &middot; cancel any time from your account &middot;
              access activates automatically after payment when logged in
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
              Every lesson follows the same clear sequence.
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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>What&apos;s available</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Year 12 Advanced includes 89 lessons across 12 units.
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Year 12 Mathematics Advanced is the most complete pathway, with
                89 lessons across 12 units. Year 11 Advanced, Year 11 Extension,
                Year 11 Standard, and Year 12 Standard 2 pathways are also
                available.
              </p>
            </div>
            <SecondaryLink href="/course">View all courses</SecondaryLink>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {coursePills.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Online learning access &mdash; $19/month
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Subscribe to access lessons across the available NSW senior
                maths pathways. Access activates automatically when you are
                logged in. Create an account before subscribing for the
                smoothest setup.
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                {pricingFeatures.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <SubscribeCTA href="/checkout?offer=online-learning">
                  Subscribe &mdash; $19/month
                </SubscribeCTA>
                <SecondaryLink href="/signup">Create account first</SecondaryLink>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Main offer
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tight">
                $19/month
              </p>
              <p className="mt-3 leading-7 text-slate-600">
                Self-guided lessons, practice and mastery checks for NSW senior
                maths.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Year 12 Advanced diagnostic options
            </h3>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {diagnosticOptions.map((option) => (
                <article
                  key={option.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h4 className="text-lg font-semibold text-slate-900">
                    {option.title}
                  </h4>
                  <p className="mt-3 leading-7 text-slate-600">
                    {option.body}
                  </p>
                  <div className="mt-5">
                    <SecondaryLink href={option.href}>{option.cta}</SecondaryLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-2xl">
            <SectionLabel>Who built this</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Built by a working NSW maths tutor.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Nova Maths is built by Joshua Taylor, a NSW maths tutor working
              with Year 11 and Year 12 students. Lessons follow an explicit
              teaching structure &mdash; worked examples first, then practice,
              then mastery checks. Questions and answers are reviewed and
              refined by hand before students use them. Visuals and worked
              example improvements are added regularly.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>Common questions</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Before you subscribe
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {commonQuestions.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <h2 className="max-w-xl text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Start learning NSW senior maths for $19/month.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <SubscribeCTA href="/checkout?offer=online-learning">
              Subscribe &mdash; $19/month
            </SubscribeCTA>
            <SecondaryLink href="/signup">Create account</SecondaryLink>
            <SecondaryLink href="/diagnostic">Start free diagnostic</SecondaryLink>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Nova Maths by Joshua Taylor for NSW senior maths students.</p>
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
