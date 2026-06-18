import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  HscDiagnosticCTAButton,
  FreeLessonCTAButton,
} from "./HscMathsCTAs";
import { PageViewTracker } from "../components/PageViewTracker";

export const metadata: Metadata = {
  title: "HSC Maths Online Lessons | Nova Maths",
  description:
    "Free HSC maths diagnostic for NSW Year 12 students. Find your weakest HSC topics in minutes and get a personalised study roadmap.",
};

const testimonials = [
  {
    quote:
      "I got 42/50 (84%) in my last test. Your tutoring made it so much easier to understand the topics — I'm really proud of that result.",
    name: "Summer, Year 12 student",
  },
  {
    quote:
      "I would highly recommend Nova Maths to anyone looking for extra maths support for their child.",
    name: "Anne, parent",
  },
  {
    quote:
      "We've really appreciated the flexibility and the great job done with our daughter.",
    name: "Claire, parent",
  },
];

function SectionLabel({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
}

export default function HscMathsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <PageViewTracker
        eventName="hsc_maths_viewed"
        includeMarketingParams
      />

      {/* Sticky full-width header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Nova Maths
          </Link>
          <div className="hidden sm:block">
            <HscDiagnosticCTAButton href="/diagnostic/year-12-advanced">
              Start Free HSC Diagnostic
            </HscDiagnosticCTAButton>
          </div>
        </div>
      </header>

      {/* Page content — extra bottom padding on mobile for the fixed CTA bar */}
      <div className="mx-auto max-w-6xl space-y-12 overflow-x-hidden px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8">

        {/* Hero */}
        <section className="grid min-w-0 gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500">
              Built for NSW HSC Advanced and Standard 2
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Find your HSC maths gaps in 5 minutes.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Take a free diagnostic and discover exactly which topics are
              holding back your exam marks.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600">✓</span>
                <span>Identify your weakest HSC topics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600">✓</span>
                <span>Get a personalised study roadmap</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600">✓</span>
                <span>Focus on the lessons that matter most</span>
              </li>
            </ul>

            <div className="mt-7">
              <HscDiagnosticCTAButton
                href="/diagnostic/year-12-advanced"
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
              >
                Start Free HSC Diagnostic
              </HscDiagnosticCTAButton>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              Find your weakest HSC topics in about 5 minutes.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              No account required.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                See a real lesson
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nova-maths-lesson-demo.gif"
                alt="Nova Maths lesson walkthrough: key ideas, worked example, guided practice questions, and mastery quiz"
                className="mt-3 w-full"
                width={784}
                height={383}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <svg className="h-4 w-4 shrink-0 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                NSW curriculum aligned
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>How it works</SectionLabel>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold">1. Take the diagnostic</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Answer a short set of HSC-style questions.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold">2. See your results</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Discover your weakest topics instantly.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold">3. Follow your study roadmap</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Get recommended lessons and practice for the areas that need work.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>Trust</SectionLabel>
          <div className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-slate-700">
            <p>Built by a working NSW maths tutor.</p>
            <p>Designed specifically for NSW HSC Mathematics.</p>
            <p>Focused on helping students identify gaps quickly and study efficiently.</p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-5"
              >
                <p className="flex-1 leading-7 text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="text-sm font-semibold text-slate-900">
                  {t.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>Lesson preview</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Preview an HSC lesson</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            See how Nova Maths teaches HSC topics step-by-step.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">
              Area Under the Curve
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Preview a real lesson with worked explanation, guided practice and quiz flow.
            </p>
            <FreeLessonCTAButton className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">
              Preview Area Under the Curve
            </FreeLessonCTAButton>
          </div>
          <div className="mt-6">
            <HscDiagnosticCTAButton href="/diagnostic/year-12-advanced">
              Start Free HSC Diagnostic
            </HscDiagnosticCTAButton>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:p-10">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">
            Ready to find your weakest HSC topics?
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Take the free diagnostic and get a personalised roadmap in minutes.
          </p>
          <div className="mt-6">
            <HscDiagnosticCTAButton
              href="/diagnostic/year-12-advanced"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
            >
              Start Free HSC Diagnostic
            </HscDiagnosticCTAButton>
          </div>
        </section>

        <footer className="flex flex-wrap gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600">
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy Notice
          </Link>
        </footer>
      </div>

      {/* Fixed bottom bar — mobile only (sm+ uses the sticky header CTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 sm:hidden">
        <div className="grid grid-cols-1 gap-1">
          <HscDiagnosticCTAButton
            href="/diagnostic/year-12-advanced"
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Start Free HSC Diagnostic
          </HscDiagnosticCTAButton>
        </div>
      </div>
    </main>
  );
}
