import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { courseCatalogue, totalActiveLessonCount } from "../lib/courseUnits";
import { SubscribeCTA } from "./components/SubscribeCTA";
import { PageViewTracker } from "./components/PageViewTracker";

const featureChips = ["NSW curriculum", "Structured lessons", "Mastery quizzes"];

const steps = [
  {
    title: "Choose a lesson",
    description:
      "Pick from available Year 8, 9, 10, 11 or 12 topics across Mathematics, Standard, Advanced and Extension pathways.",
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

const featuredCourseSlugs = [
  "year-8-mathematics",
  "year-9-mathematics",
  "year-10-mathematics",
  "year-11-advanced",
  "year-11-standard",
  "year-12-standard-2",
  "year-12-advanced",
];

const coursePills = featuredCourseSlugs.flatMap((slug) => {
  const course = courseCatalogue.find((item) => item.courseSlug === slug);
  return course
    ? [`${course.courseTitle} - ${course.activeLessonCount} lessons`]
    : [];
});

const pricingFeatures = [
  "Available NSW maths pathways from Year 8 to HSC",
  "Structured lessons - learn, practise, check mastery",
  "Full lessons, worked examples, guided practice and independent practice",
  "Mastery quizzes, saved progress and course pathways",
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
      "No. Nova Maths is self-guided online learning, so students work at their own pace without a scheduled session. Joshua's tutoring spots are currently full.",
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
      `Nova Maths currently has ${totalActiveLessonCount} active lessons across available Year 8 to HSC pathways. Year 7 is available as a free preview lesson only, not a full course yet.`,
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
      <PageViewTracker eventName="homepage_viewed" />
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
              NSW secondary maths &middot; Year 8 to HSC
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Stop guessing what to study. Get a clear path through NSW maths.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {totalActiveLessonCount} active lessons built for the NSW
              curriculum - from Year 8 to HSC. Worked examples, guided
              practice, independent practice, and mastery quizzes help students
              see exactly what they understand and what needs work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SubscribeCTA href="/checkout?offer=online-learning">
                Start your 7-day free trial
              </SubscribeCTA>
              <SecondaryLink href="/free-year-7-algebra">
                Try Year 7 preview
              </SecondaryLink>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              No charge today &middot; Then $19/month &middot; Cancel anytime
            </p>
            <p className="mt-2 text-sm">
              <Link
                href="/diagnostic/select"
                className="font-semibold text-slate-600 underline decoration-slate-400 underline-offset-2 hover:text-slate-900"
              >
                Start free diagnostic &rarr;
              </Link>
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {featureChips.map((chip) => (
                <Pill key={chip}>{chip}</Pill>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-3xl">
            <SectionLabel>Inside Nova Maths</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              See a full lesson before subscribing
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Try a complete Year 7 algebra lesson with explanation, worked
              examples, practice questions and answers. Year 7 is a free
              preview only, not a full course yet. No signup required.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white md:px-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Year 7 Mathematics
              </p>
              <p className="mt-2 text-sm font-medium text-slate-300">
                Algebra
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">
                Solving Equations: Inverse and Balance Methods
              </h3>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                {[
                  "Learn",
                  "Worked examples",
                  "Practice",
                  "Check",
                ].map((step, index) => (
                  <span
                    key={step}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      index === 0
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.38fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Worked example
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-slate-900">
                    Solve x + 3 = 11 without guessing. What operation do we
                    undo first?
                  </p>
                  <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      The lesson explains the why before the steps.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Students see the inverse method and the balance method
                      side by side, then practise with hints and revealable
                      answers.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Free preview
                  </p>
                  <p className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                    No signup
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
                    <div className="h-full w-full rounded-full bg-emerald-600" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-emerald-950">
                    Open the full lesson and see the Nova Maths teaching style
                    before subscribing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <SecondaryLink href="/free-year-7-algebra">
              Open the free lesson
            </SecondaryLink>
            <SubscribeCTA href="/checkout?offer=online-learning">
              Start your 7-day free trial
            </SubscribeCTA>
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
                {totalActiveLessonCount} active lessons across Year 8 to HSC.
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Nova Maths is broader than HSC. The current catalogue includes
                active Year 8, 9, 10, 11 and 12 pathways, with HSC courses
                highlighted because exam urgency is high. Year 7 is available
                as a free preview lesson only.
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
                7-day free trial &mdash; then $19/month
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Start your free trial to access lessons across the available
                NSW maths pathways. Access activates on the day your trial
                starts. Create an account before checkout for the smoothest
                setup.
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                {pricingFeatures.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <SubscribeCTA href="/checkout?offer=online-learning">
                  Start your 7-day free trial
                </SubscribeCTA>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                You&apos;ll create a free account before checkout &mdash; takes
                under a minute.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                No charge today &middot; Then $19/month &middot; Cancel anytime
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Private tutoring in NSW often costs $80&ndash;120/hour. Nova
                Maths is $19/month &mdash; less than one hour of tutoring.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Main offer
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tight">
                $19/month
              </p>
              <p className="mt-3 leading-7 text-slate-600">
                Self-guided lessons, practice and mastery checks for NSW
                maths.
              </p>
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

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-2xl">
            <SectionLabel>Optional add-ons</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Year 12 Advanced diagnostic options
            </h2>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {diagnosticOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {option.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{option.body}</p>
                <div className="mt-5">
                  <SecondaryLink href={option.href}>{option.cta}</SecondaryLink>
                </div>
              </article>
            ))}
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
          <div>
            <h2 className="max-w-xl text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Start your 7-day free trial today.
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              No charge today &middot; Then $19/month &middot; Cancel anytime
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <SubscribeCTA href="/checkout?offer=online-learning">
              Start your 7-day free trial
            </SubscribeCTA>
            <SecondaryLink href="/signup">Create account</SecondaryLink>
            <Link
              href="/diagnostic/select"
              className="text-sm font-semibold text-slate-600 underline decoration-slate-400 underline-offset-2 hover:text-slate-900"
            >
              Start free diagnostic &rarr;
            </Link>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Nova Maths by Joshua Taylor for NSW maths students.</p>
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
