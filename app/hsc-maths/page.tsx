import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { courseCatalogue } from "../../lib/courseUnits";
import { HscTrialCTAButton, FreeLessonCTAButton, DiagnosticCTALink } from "./HscMathsCTAs";
import { PageViewTracker } from "../components/PageViewTracker";

export const metadata: Metadata = {
  title: "HSC Maths Online Lessons | Nova Maths",
  description:
    "Structured NSW HSC maths lessons, practice and mastery quizzes for Year 12 students. Start with a 7-day free trial, then study at your own pace for $19/month.",
};

const included = [
  {
    title: "HSC-aligned lesson pathways",
    description:
      "Follow a clear sequence through available Year 12 Advanced and Standard 2 topics.",
  },
  {
    title: "Worked examples before practice",
    description:
      "See how and why a method works before trying questions independently.",
  },
  {
    title: "Guided and independent questions",
    description:
      "Build confidence with support, then check whether the skill holds without hints.",
  },
  {
    title: "Mastery quizzes with saved progress",
    description:
      "Finish each lesson with a short quiz and keep your results across devices.",
  },
  {
    title: "Continue Learning dashboard",
    description:
      "Return to your next lesson without having to work out where to restart.",
  },
  {
    title: "Self-paced access on any device",
    description:
      "Study from your own account whenever revision time fits around school and other commitments.",
  },
];

const FAQs = [
  {
    question: "Is this tutoring?",
    answer:
      "Nova Maths is self-paced online learning, not live tutoring. Students work through written lessons, worked examples, practice questions and mastery quizzes in their own time.",
  },
  {
    question: "Is this aligned to the NSW HSC?",
    answer:
      "Yes. The Year 12 pathways are structured around NSW HSC Mathematics Advanced and Mathematics Standard 2 topics.",
  },
  {
    question: "Which Year 12 courses are included?",
    answer:
      "Your subscription includes the available Year 12 Mathematics Advanced and Mathematics Standard 2 pathways, as well as the other available Year 9 to Year 12 maths pathways.",
  },
  {
    question: "Is this for struggling students?",
    answer:
      "It is designed for students who want a clearer path, including students who feel behind or unsure where to start. Each lesson explains the idea before moving into practice.",
  },
  {
    question: "What happens after I subscribe?",
    answer:
      "Continue to Stripe's secure checkout. After your trial starts, you will set a password to access your Nova Maths dashboard. Your lessons and progress are linked to your account.",
  },
  {
    question: "Are there videos?",
    answer:
      "The current lesson experience is written and structured: clear explanations, worked examples, guided practice, independent practice and mastery quizzes.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes. You can cancel any time from your account through the Stripe billing portal.",
  },
];

const hscCourses = courseCatalogue.filter(
  (course) =>
    course.courseSlug === "year-12-advanced" ||
    course.courseSlug === "year-12-standard-2"
);

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
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Log in
            </Link>
            {/* CTA visible on sm+ only — mobile uses the fixed bottom bar */}
            <div className="hidden sm:block">
              <HscTrialCTAButton>
                Start your 7-day free trial
              </HscTrialCTAButton>
            </div>
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
              Stop guessing what to revise for HSC maths.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A structured Year 12 pathway with worked examples, guided practice,
              mastery quizzes and progress saved to your dashboard.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <HscTrialCTAButton className="w-full sm:w-auto">
                Start your 7-day free trial
              </HscTrialCTAButton>
              <FreeLessonCTAButton className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 sm:w-auto">
                Preview a free HSC lesson
              </FreeLessonCTAButton>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              No charge today &middot; Then $19/month &middot; Cancel anytime
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Built for NSW HSC Advanced and Standard 2
            </p>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                7-day free trial offer
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {([
                  "7-day free trial",
                  "Then $19/month",
                  "Cancel anytime",
                  "Built for NSW HSC Advanced and Standard 2",
                ] as const).map((item) => (
                  <div key={item} className="min-w-0 rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">
                See what you get before starting your trial.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>Preview a sample HSC lesson to feel how the course works.</li>
                <li>See the step-by-step explanation, practice and quiz flow.</li>
                <li>No signup or payment needed to review the demo lesson.</li>
              </ul>
              <FreeLessonCTAButton className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                Preview a free HSC lesson
              </FreeLessonCTAButton>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Year 12 Mathematics Advanced
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Calculus
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Area Under a Curve
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Learn",
                  "Guided practice",
                  "Independent practice",
                  "Mastery quiz",
                ].map((step, index) => (
                  <span
                    key={step}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      index === 0
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm leading-6 text-slate-700">
                  See why the integral measures accumulated area before
                  practising exam-style questions.
                </p>
              </div>
              <p className="mt-4 text-sm font-semibold text-emerald-700">
                Progress saved to your dashboard
              </p>
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

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>Why structure matters</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            HSC maths feels hard when revision is scattered.
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="leading-7 text-slate-700">
                School notes are spread across topics. YouTube explanations
                can be disconnected. Tutoring can be expensive. Students can
                complete pages of practice and still be unsure whether a skill
                is ready for an exam.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <p className="text-lg font-semibold">
                Nova Maths gives students a clear lesson-by-lesson path.
              </p>
              <p className="mt-3 leading-7 text-slate-300">
                Learn the idea, work through examples, practise with support,
                then use a mastery quiz to check what is actually sticking.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>What students get</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              A calmer way to prepare for HSC maths.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
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
        </section>

        {/* Diagnostic sits here as tertiary — below primary and secondary CTAs */}
        <section className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm md:p-10">
          <SectionLabel>Try before you subscribe</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Not ready to subscribe yet?
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-slate-700">
            Open a complete Year 12 Advanced lesson with worked examples,
            practice questions and a mastery quiz &mdash; no account needed.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <FreeLessonCTAButton>
              Try one full HSC lesson free
            </FreeLessonCTAButton>
            <p className="text-sm text-slate-600">No signup needed.</p>
          </div>
          <div className="mt-4">
            <DiagnosticCTALink />
          </div>
        </section>

        <section
          id="year-12-courses"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
        >
          <SectionLabel>Course coverage</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Choose your Year 12 maths pathway.
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
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

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
          <SectionLabel>Price and value</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            One month costs less than one tutoring lesson.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Private HSC maths tutoring can cost $80&ndash;120 per hour. Nova
            Maths starts with a 7-day free trial, then is $19/month, with
            access to all available Year 9&ndash;12 maths pathways.
          </p>
          <div className="mt-7">
            <HscTrialCTAButton>
              Start your 7-day free trial
            </HscTrialCTAButton>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            No charge today &middot; Then $19/month &middot; Cancel anytime
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>Who built this</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Built by a NSW maths tutor.
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Nova Maths is built by Joshua Taylor, a NSW maths tutor working
            with senior students. The lessons are designed to give students the
            structure they often miss when revision is spread across school
            notes, worksheets and random videos.
          </p>
        </section>

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

        <section className="flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight">
            Give HSC maths a clear study path.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <HscTrialCTAButton className="bg-white text-slate-950 hover:bg-slate-100">
              Start your 7-day free trial
            </HscTrialCTAButton>
            <Link
              href="/course"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Browse courses
            </Link>
          </div>
        </section>

        <footer className="flex flex-wrap gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Homepage
          </Link>
          <Link href="/course" className="hover:text-slate-900">
            Courses
          </Link>
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy Notice
          </Link>
        </footer>
      </div>

      {/* Fixed bottom bar — mobile only (sm+ uses the sticky header CTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 sm:hidden">
        <HscTrialCTAButton className="w-full">
          Start your 7-day free trial
        </HscTrialCTAButton>
      </div>
    </main>
  );
}
