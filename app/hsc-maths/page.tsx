import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { courseCatalogue } from "../../lib/courseUnits";
import {
  HscDiagnosticCTAButton,
  HscTrialCTAButton,
  FreeLessonCTAButton,
} from "./HscMathsCTAs";
import { PageViewTracker } from "../components/PageViewTracker";
import { DiagnosticResultPreview } from "../components/DiagnosticResultPreview";
import { ProductShowcase } from "../components/ProductShowcase";
import { PricingComparison } from "../components/PricingComparison";
import { PlatformDepth } from "../components/PlatformDepth";
import { ValueUnlocks } from "../components/ValueUnlocks";
import { LearningPathway } from "../components/LearningPathway";
import { StudyReportPreview } from "../components/StudyReportPreview";

export const metadata: Metadata = {
  title: "HSC Maths Diagnostic | NSW Year 12 Standard 2 & Advanced",
  description:
    "Free HSC Maths diagnostic for NSW Year 12 students. Find weak topics before Trials and follow a clear revision path for Standard 2 or Advanced.",
};

const afterDiagnostic = [
  {
    title: "Topic-by-topic result",
    description:
      "See exactly how you scored across every Year 12 topic, not just an overall mark.",
  },
  {
    title: "Weak areas identified",
    description:
      "The topics most likely to cost you marks in Trials are flagged clearly.",
  },
  {
    title: "Recommended revision path",
    description:
      "A clear order of what to revise next, so you stop guessing where to start.",
  },
  {
    title: "Lessons with worked examples and practice",
    description:
      "Each weak topic links to a lesson that teaches the method and checks you can do it.",
  },
];

const insideEachLesson = [
  "Explanation",
  "Worked examples",
  "Guided practice",
  "Independent practice",
  "Mastery quiz",
  "Saved progress",
];

const whoThisIsFor = [
  "NSW Year 12 students preparing for Trial exams",
  "Students who know they have gaps but do not know where to start",
  "Parents looking for structured independent revision",
];

const FAQs = [
  {
    question: "Is this for NSW HSC?",
    answer:
      "Yes. Nova Maths is built around the NSW HSC syllabus. The Year 12 pathways follow NESA's Mathematics Standard 2 and Mathematics Advanced topics.",
  },
  {
    question: "Is it for Standard 2 or Advanced?",
    answer:
      "Both — and more. Nova Maths covers every Year 12 course: Standard 1, Standard 2, Advanced, Extension 1 and Extension 2. After the diagnostic you follow a revision path for whichever course you are studying.",
  },
  {
    question: "Do I need a tutor as well?",
    answer:
      "No. Nova Maths is designed to work on its own: it shows what to revise, teaches the method with worked examples, then checks you can do it. Many students use it alongside school or a tutor, but it does not require one.",
  },
  {
    question: "What happens after the diagnostic?",
    answer:
      "You get a topic-by-topic result with your weak areas flagged and a recommended order to revise them. Each topic links to a lesson with worked examples, practice and a mastery quiz.",
  },
  {
    question: "When do I pay?",
    answer:
      "The diagnostic is free with no charge today. If you want the full lessons, you start a 7-day free trial first, then it is $19/month.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes. You can cancel any time from your account through the Stripe billing portal.",
  },
];

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

// All five Year 12 (HSC) courses, with the highest-demand ad keywords
// (Standard 2 and Advanced) listed first.
const hscCourseOrder = [
  "year-12-standard-2",
  "year-12-advanced",
  "year-12-extension-1",
  "year-12-extension-2",
  "year-12-standard-1",
];
const hscCourses = hscCourseOrder
  .map((slug) => courseCatalogue.find((course) => course.courseSlug === slug))
  .filter(
    (course): course is (typeof courseCatalogue)[number] => course !== undefined
  );

function SectionLabel({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
}

function SecondaryLink({
  href,
  children,
  className = "",
}: Readonly<{ href: string; children: ReactNode; className?: string }>) {
  return (
    <Link
      href={href}
      className={`inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold leading-none text-slate-900 shadow-sm transition hover:bg-slate-50 ${className}`}
    >
      {children}
    </Link>
  );
}

export default function HscMathsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <PageViewTracker
        eventName="hsc_maths_viewed"
        includeMarketingParams
        includeCtaExperiment
      />

      {/* Sticky full-width header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Nova Maths
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Log in
            </Link>
            {/* CTA visible on sm+ only — mobile uses the fixed bottom bar */}
            <div className="hidden sm:block">
              <HscDiagnosticCTAButton />
            </div>
          </div>
        </div>
      </header>

      {/* Page content — extra bottom padding on mobile for the fixed CTA bar */}
      <div className="mx-auto max-w-6xl space-y-12 overflow-x-hidden px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8">

        {/* 1. Hero — Free HSC Maths Diagnostic */}
        <section className="grid min-w-0 gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500">
              NSW HSC · Year 12 Standard 2 &amp; Advanced
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Free HSC Maths Diagnostic
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Find your weakest Year 12 Maths topics before Trial exams, then
              follow a clear revision path for Standard 2 or Advanced.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <HscDiagnosticCTAButton className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto" />
              <SecondaryLink href="#choose-course" className="w-full sm:w-auto">
                View HSC lessons
              </SecondaryLink>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              No charge today &middot; 7-day free trial &middot; Then $19/month
              &middot; Cancel anytime
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Built for NSW Year 12 students preparing for Trials and the HSC.
            </p>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                The diagnostic, in short
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {([
                  "Under 10 minutes",
                  "Find your weakest topics",
                  "Get a recommended revision path",
                  "Standard 2 and Advanced",
                ] as const).map((item) => (
                  <div
                    key={item}
                    className="min-w-0 rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure Stripe checkout
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <svg className="h-4 w-4 shrink-0 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                NSW curriculum aligned
              </span>
            </div>
          </div>
        </section>

        {/* Platform depth */}
        <PlatformDepth />

        {/* Learning pathway */}
        <LearningPathway />

        {/* Trial exam preparation */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <svg className="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0V11.25A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            NSW Trial exams begin in Term 3.
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900">
            Preparing for NSW Trial Exams?
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
            Trial exams are often the strongest predictor of HSC performance.
            Nova Maths helps you identify weak topics before they appear in your
            exams.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Topic diagnostics",
              "Revision recommendations",
              "Structured lesson pathways",
              "Progress tracking",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm font-medium leading-6 text-slate-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <HscDiagnosticCTAButton />
          </div>
        </section>

        {/* Diagnostic result preview */}
        <DiagnosticResultPreview
          cta={
            <HscDiagnosticCTAButton />
          }
        />

        {/* Product showcase */}
        <ProductShowcase />

        {/* Study report preview */}
        <StudyReportPreview />

        {/* 2. What you'll get after the diagnostic */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>What you&rsquo;ll get after the diagnostic</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              A clear picture of what to revise next
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {afterDiagnostic.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
          <div>
            <HscDiagnosticCTAButton />
          </div>
        </section>

        {/* 3. Choose your HSC course */}
        <section
          id="choose-course"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
        >
          <SectionLabel>Choose your HSC course</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Every Year 12 maths course
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Standard 2 and Advanced are the most popular, but Nova Maths covers
            the full HSC range — Extension 1, Extension 2 and Standard 1 too.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hscCourses.map((course) => (
              <article
                key={course.courseSlug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-bold">{course.courseTitle}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {course.activeLessonCount} lessons across {course.unitCount}{" "}
                  units
                </p>
                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {course.description}
                </p>
                <Link
                  href={course.href}
                  className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
                >
                  View course
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* 4. How Nova helps before Trials */}
        <section className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:p-10">
          <SectionLabel>How Nova helps before Trials</SectionLabel>
          <p className="mt-4 max-w-3xl text-xl font-semibold leading-9">
            Instead of scrolling through random worksheets, Nova Maths shows what
            to revise next, teaches the method, then checks whether you can do it
            yourself.
          </p>
          <div className="mt-6">
            <HscDiagnosticCTAButton className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100" />
          </div>
        </section>

        {/* 5. Inside each lesson */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>Inside each lesson</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Learn it, practise it, prove it
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insideEachLesson.map((stage) => (
              <article
                key={stage}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-lg font-semibold">{stage}</p>
              </article>
            ))}
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
            <p className="text-sm font-semibold text-slate-900">
              Want to see it first?
            </p>
            <p className="mt-2 max-w-xl leading-7 text-slate-700">
              Open a complete Year 12 Advanced lesson with worked examples,
              practice questions and a mastery quiz &mdash; no account needed.
            </p>
            <FreeLessonCTAButton className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">
              See a sample lesson
            </FreeLessonCTAButton>
          </div>
        </section>

        {/* 6. Who this is for */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>Who this is for</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Made for Year 12 revision
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {whoThisIsFor.map((item) => (
              <article
                key={item}
                className="rounded-2xl bg-slate-50 p-6 leading-7 text-slate-700"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        {/* Value proof — real student and parent testimonials */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>What students and parents say</SectionLabel>
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

        {/* What $19/month unlocks */}
        <ValueUnlocks />

        {/* 7. Pricing */}
        <PricingComparison
          cta={
            <>
              <HscDiagnosticCTAButton />
              <HscTrialCTAButton className="border-2 border-slate-900 !bg-white !text-slate-950 hover:!bg-slate-100">
                Start your 7-day free trial
              </HscTrialCTAButton>
            </>
          }
        />

        {/* 8. FAQ */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>Common questions</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Before you start
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {FAQs.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 9. Final CTA */}
        <section className="flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight">
              Know what to revise before Trials.
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Or{" "}
              <Link
                href="/courses"
                className="underline underline-offset-2 hover:text-white"
              >
                browse HSC courses first
              </Link>
              .
            </p>
          </div>
          <HscDiagnosticCTAButton className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100" />
        </section>

        <footer className="flex flex-wrap gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Homepage
          </Link>
          <Link href="/courses" className="hover:text-slate-900">
            Courses
          </Link>
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy Notice
          </Link>
        </footer>
      </div>

      {/* Fixed bottom bar — mobile only (sm+ uses the sticky header CTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 sm:hidden">
        <div className="grid grid-cols-1 gap-2">
          <HscDiagnosticCTAButton className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800" />
          <HscTrialCTAButton className="w-full border border-slate-300 bg-white py-2.5 text-slate-950 hover:bg-slate-50">
            Start your 7-day free trial
          </HscTrialCTAButton>
        </div>
      </div>
    </main>
  );
}
