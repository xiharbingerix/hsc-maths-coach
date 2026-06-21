import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { totalActiveLessonCount } from "../lib/courseUnits";
import { SubscribeCTA } from "./components/SubscribeCTA";
import { PageViewTracker } from "./components/PageViewTracker";

export const metadata: Metadata = {
  title: "Nova Maths | NSW Maths Diagnostic & Online Lessons",
  description:
    "Take a free NSW maths diagnostic, find your weak topics, and follow structured lessons from Year 7 to HSC. 7-day free trial, then $19/month.",
};

const trustBadges = [
  "NSW curriculum aligned",
  "Worked examples",
  "Guided practice",
  "Mastery quizzes",
  "Saved progress",
];

const howItWorks = [
  {
    title: "1. Take the free diagnostic",
    description:
      "Answer a short set of questions for your year level. No payment needed.",
  },
  {
    title: "2. See your weak topics",
    description:
      "Get a clear topic-by-topic result so you know exactly where the gaps are.",
  },
  {
    title: "3. Follow the recommended lessons",
    description:
      "Nova Maths points you to the lessons that fix your weakest topics first.",
  },
  {
    title: "4. Check mastery with quizzes",
    description:
      "Finish each lesson with a short quiz to confirm the skill has actually stuck.",
  },
];

const courseGroups = [
  {
    label: "Year 7",
    detail: "Mathematics — Stage 4 fundamentals.",
  },
  {
    label: "Year 8",
    detail: "Mathematics — Stage 4 foundations and the bridge into Stage 5.",
  },
  {
    label: "Year 9",
    detail: "Mathematics — Core and Advanced pathways.",
  },
  {
    label: "Year 10",
    detail: "Mathematics — Core and Advanced pathways.",
  },
  {
    label: "Year 11",
    detail: "Standard, Advanced and Extension.",
  },
  {
    label: "Year 12 / HSC",
    detail: "Standard 1, Standard 2, Advanced, Extension 1 and Extension 2.",
  },
];

const lessonStages = [
  "Explanation",
  "Worked examples",
  "Guided practice",
  "Independent practice",
  "Mastery quiz",
];

const pricingPoints = [
  "7-day free trial",
  "Then $19/month",
  "Cancel anytime",
  "Instant access when logged in",
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

        {/* 1. Hero — diagnostic-first */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">
              NSW secondary maths · Year 7 to HSC
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Stop guessing what to study for maths.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Take a free NSW maths diagnostic, find your weak topics, then
              follow a clear lesson path from Year 7 to HSC.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/diagnostic/select">
                Start free diagnostic
              </PrimaryLink>
              <SecondaryLink href="/free-year-7-algebra">
                See a sample lesson
              </SecondaryLink>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              Free diagnostic · 7-day free trial · Then $19/month · Cancel
              anytime
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <Pill key={badge}>{badge}</Pill>
              ))}
            </div>
          </div>
        </section>

        {/* 2. How Nova Maths works */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>How Nova Maths works</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              From diagnostic to a clear study path in four steps
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div>
            <PrimaryLink href="/diagnostic/select">
              Start free diagnostic
            </PrimaryLink>
          </div>
        </section>

        {/* 3. See a full lesson before subscribing */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <SectionLabel>See a full lesson before subscribing</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Try a complete lesson, free
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Open our free Year 7 algebra lesson to feel the teaching style:
                a clear explanation, worked examples, guided practice and a
                mastery quiz. It is a preview of how Nova Maths teaches — not the
                main product, which runs from Year 8 to HSC.
              </p>
              <div className="mt-6">
                <SecondaryLink href="/free-year-7-algebra">
                  See a sample lesson
                </SecondaryLink>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">
                What a lesson looks like
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {lessonStages.map((stage) => (
                  <li key={stage} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{stage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Courses available */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>Courses available</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              NSW maths from Year 7 to HSC
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Structured pathways across {totalActiveLessonCount} active lessons,
              with Standard, Advanced and Extension courses where they apply.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courseGroups.map((group) => (
              <article
                key={group.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-900">
                  {group.label}
                </p>
                <p className="mt-2 leading-6 text-slate-600">{group.detail}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/diagnostic/select">
              Start free diagnostic
            </PrimaryLink>
            <SecondaryLink href="/courses">View HSC courses</SecondaryLink>
          </div>
        </section>

        {/* 5. Built for NSW students */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-2xl">
            <SectionLabel>Built for NSW students</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Made for the NSW syllabus, not a generic course library
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Every lesson follows the NSW pathways for your year and course.
              You learn the idea with worked examples, build it with guided
              practice, test it with independent practice, then confirm it with
              a mastery check — the same structure a good tutor would use.
            </p>
          </div>
        </section>

        {/* 6. Pricing */}
        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Start free. Upgrade when it helps.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                The diagnostic is free. When you are ready for the recommended
                lessons, start a 7-day free trial — no charge today.
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                {pricingPoints.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryLink href="/diagnostic/select">
                  Start free diagnostic
                </PrimaryLink>
                <SubscribeCTA href="/checkout?offer=online-learning">
                  Start your 7-day free trial
                </SubscribeCTA>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Subscription
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tight">$19/month</p>
              <p className="mt-3 leading-7 text-slate-600">
                7-day free trial first, then continued access to structured
                lessons, practice and mastery checks across all available Year 7
                to HSC pathways.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                No charge today · Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:p-10">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">
            Find your weak maths topics today.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Take the free diagnostic, then follow the lessons built around your
            results.
          </p>
          <div className="mt-6">
            <Link
              href="/diagnostic/select"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
            >
              Start free diagnostic
            </Link>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Nova Maths by Joshua Taylor for NSW maths students.</p>
          <nav className="flex flex-wrap gap-4" aria-label="Footer">
            <Link href="/diagnostic/select" className="hover:text-slate-900">
              Diagnostic
            </Link>
            <Link href="/courses" className="hover:text-slate-900">
              Courses
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
