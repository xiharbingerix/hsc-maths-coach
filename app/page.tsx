import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { totalActiveLessonCount } from "../lib/courseUnits";
import { SubscribeCTA } from "./components/SubscribeCTA";
import { PageViewTracker } from "./components/PageViewTracker";

const featureChips = [
  "NSW curriculum",
  "Structured lessons",
  "Mastery quizzes",
  "Personalised study path",
];

const yearLevelOptions = [
  { label: "Year 7", href: "/diagnostic/year-7-mathematics" },
  { label: "Year 8", href: "/diagnostic/year-8-mathematics" },
  { label: "Year 9", href: "/diagnostic/year-9-mathematics" },
  { label: "Year 10", href: "/diagnostic/year-10-mathematics" },
  { label: "Year 11", href: "/diagnostic/year-11-advanced" },
  { label: "Year 12 / HSC", href: "/diagnostic/year-12-advanced" },
];

const diagnosticSteps = [
  {
    title: "1. Take a diagnostic",
    description:
      "Complete a short free diagnostic to benchmark your current level.",
  },
  {
    title: "2. See your weakest topics",
    description:
      "Get clear topic-level results so you can stop guessing what to revise.",
  },
  {
    title: "3. Unlock your personalised study path",
    description:
      "Your results show what to study. Nova Maths gives you the lessons and practice to fix it.",
  },
];

const pricingFeatures = [
  "Lessons mapped to your weakest diagnostic topics",
  "Worked examples, guided practice and independent practice",
  "Mastery quizzes and saved progress",
  "Access across available Year 8 to HSC pathways",
  "7-day free trial, then $19/month",
  "Cancel anytime from your account",
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
              NSW secondary maths · Year 8 to HSC
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Stop guessing what to study in maths.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Take a free diagnostic, find your weakest topics, then unlock a
              personalised study path to fix them.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/diagnostic/select"
                className="inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-slate-800"
              >
                Start Free Diagnostic
              </Link>
              <SecondaryLink href="/hsc-maths">View HSC Maths</SecondaryLink>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {featureChips.map((chip) => (
                <Pill key={chip}>{chip}</Pill>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-3xl">
            <SectionLabel>Choose your year level</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Start the right diagnostic for your current course
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Select your year to begin a diagnostic and get a focused topic-by-topic result.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {yearLevelOptions.map((option) => (
              <article
                key={option.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-900">{option.label}</p>
                <Link
                  href={option.href}
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Start Diagnostic
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              A clear path from diagnostic to results to improvement
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {diagnosticSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 leading-6 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-6">
            <p className="text-sm leading-7 text-slate-700">
              After your diagnostic, start a 7-day free trial to unlock the recommended
              lessons for your weak topics.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Unlock your personalised study path
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                After your diagnostic, Nova Maths recommends the lessons and
                practice most relevant to your gaps.
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                {pricingFeatures.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/diagnostic/select"
                  className="inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-slate-800"
                >
                  Start with a free diagnostic
                </Link>
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
                7-day free trial first, then continued access to structured lessons,
                practice and mastery checks aligned to your results.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                No charge today · Cancel anytime
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-2xl">
            <SectionLabel>Why Nova Maths</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Built for NSW maths students who need clarity, not guesswork
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Nova Maths currently includes {totalActiveLessonCount} active lessons across
              available Year 8 to HSC pathways, with structured progression from explanation
              to practice to mastery.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:p-10">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">
            Find your gaps. Then fix them.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Start with a free diagnostic. Then unlock the lessons and practice designed
            around your results.
          </p>
          <div className="mt-6">
            <Link
              href="/diagnostic/select"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
            >
              Start Free Diagnostic
            </Link>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Nova Maths by Joshua Taylor for NSW maths students.</p>
          <nav className="flex flex-wrap gap-4" aria-label="Footer">
            <Link href="/diagnostic/select" className="hover:text-slate-900">
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
