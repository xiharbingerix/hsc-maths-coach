import type { Metadata } from "next";
import Link from "next/link";
import katex from "katex";
import type { ReactNode } from "react";
import { SubscribeCTA } from "../components/SubscribeCTA";
import { areaUnderCurveLesson } from "../../lib/lessons/integralCalculus";

export const metadata: Metadata = {
  title: "Free HSC Maths Sample Lesson | Nova Maths",
  description:
    "Preview a real HSC maths lesson — Area Under a Curve — from Nova Maths. See worked examples and practice questions. No signup required.",
};

function KaTeXBlock({ tex }: Readonly<{ tex: string }>) {
  const html = katex.renderToString(tex, { displayMode: true, throwOnError: false });
  return (
    <div
      className="my-4 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

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
}: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}

const lesson = areaUnderCurveLesson;
const workedExample = lesson.workedExamples[0];
const previewQuestions = (lesson.guidedPractice ?? []).slice(0, 3);

export default function SampleHscLessonPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
            Nova Maths
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Log in
          </Link>
        </header>

        {/* Hero */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Free sample lesson &middot; No signup needed
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Free HSC maths sample lesson
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            See how Nova Maths teaches Area Under a Curve &mdash; one of the most
            tested HSC calculus topics. Read the explanation, follow the worked
            example, and preview practice questions before subscribing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#lesson-start"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Start the free sample
            </a>
            <SubscribeCTA href="/checkout?offer=online-learning">
              Subscribe &mdash; $19/month
            </SubscribeCTA>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            No signup needed to preview &middot; Full access $19/month &middot; Cancel any time
          </p>
        </section>

        {/* Lesson header */}
        <section
          id="lesson-start"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white md:px-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Year 12 Mathematics Advanced
            </p>
            <p className="mt-2 text-sm font-medium text-slate-300">Calculus</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Area Under a Curve
            </h2>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {["Learn", "Guided practice", "Independent practice", "Mastery quiz"].map(
                (step, i) => (
                  <span
                    key={step}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      i === 0
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {step}
                  </span>
                )
              )}
            </div>

            <p className="mt-5 font-semibold text-slate-900">
              {lesson.learningIntention}
            </p>

            <ul className="mt-4 space-y-2">
              {lesson.successCriteria.map((criterion) => (
                <li
                  key={criterion}
                  className="flex gap-3 text-sm leading-6 text-slate-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Teaching / Learn section */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionLabel>Learn</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">Key ideas</h2>

          <div className="mt-5 space-y-4">
            {lesson.teaching.paragraphs.map((para, i) => (
              <p key={i} className="leading-7 text-slate-700">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-4">
            {lesson.teaching.latexBlocks.map((tex, i) => (
              <KaTeXBlock key={i} tex={tex} />
            ))}
          </div>
        </section>

        {/* Worked example */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionLabel>Worked example</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            {workedExample.title}
          </h2>

          <div className="mt-5">
            <KaTeXBlock tex={workedExample.questionLatex} />
          </div>

          <div className="mt-6 space-y-4">
            {workedExample.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-sm font-semibold text-slate-700">
                  Step {i + 1}: {step.explanation}
                </p>
                {step.latex !== undefined && <KaTeXBlock tex={step.latex} />}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Final answer
            </p>
            <div className="mt-2">
              <KaTeXBlock tex={workedExample.finalAnswerLatex} />
            </div>
          </div>
        </section>

        {/* Guided practice preview */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionLabel>Guided practice preview</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Try these questions
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            These questions are from the guided practice section. Subscribe to
            attempt them, check your answers and save your progress.
          </p>

          <div className="mt-6 space-y-4">
            {previewQuestions.map((q, i) => (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Question {i + 1}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {q.prompt}
                </p>
                <KaTeXBlock tex={q.latex} />
                {q.choices && q.choices.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {q.choices.map((choice) => (
                      <div
                        key={choice.label}
                        className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                      >
                        <span className="font-semibold text-slate-500">{choice.label}.</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: katex.renderToString(
                              choice.text.replace(/^\$|\$$/g, ""),
                              { displayMode: false, throwOnError: false }
                            ),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {q.hint && (
                  <p className="mt-3 text-sm italic text-slate-500">
                    Hint: {q.hint}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="font-semibold text-slate-900">
              Subscribe to attempt these questions and check your answers
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Your answers and progress are saved to your dashboard when subscribed.
            </p>
            <div className="mt-4 flex justify-center">
              <SubscribeCTA href="/checkout?offer=online-learning">
                Subscribe &mdash; $19/month
              </SubscribeCTA>
            </div>
          </div>
        </section>

        {/* Locked mastery quiz teaser */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionLabel>Mastery quiz</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Check whether the skill is ready
          </h2>

          <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-slate-500"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Mastery quiz &mdash; subscribers only
            </h3>
            <p className="mt-2 max-w-sm mx-auto leading-7 text-slate-600">
              The mastery quiz checks whether the skill is ready for revision or
              needs more work. Your score and progress are saved to your dashboard.
            </p>
            <div className="mt-5 flex justify-center">
              <SubscribeCTA href="/checkout?offer=online-learning">
                Subscribe to unlock &mdash; $19/month
              </SubscribeCTA>
            </div>
          </div>
        </section>

        {/* Full access value */}
        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-6 shadow-sm md:p-8">
          <SectionLabel>Full access</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            This is one lesson out of 195+.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Full access includes every available NSW maths lesson from Year 9 to
            HSC &mdash; worked examples, practice questions and mastery quizzes
            &mdash; with saved progress across all devices.
          </p>
          <ul className="mt-5 space-y-2">
            {[
              "195+ lessons across Year 9, 10, 11 and 12 maths pathways",
              "Worked examples before every practice section",
              "Guided and independent practice questions",
              "Mastery quizzes with saved progress",
              "Continue Learning dashboard — pick up where you left off",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-slate-500">
            $19/month &middot; Cancel any time &middot; Secure Stripe checkout
          </p>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready for the full course?
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Every lesson follows the same structure you just saw: learn the idea,
            work through examples, practise with support, then prove mastery with
            the quiz.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <SubscribeCTA href="/checkout?offer=online-learning">
              Subscribe &mdash; $19/month
            </SubscribeCTA>
            <SecondaryLink href="/hsc-maths">View HSC maths page</SecondaryLink>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            You&apos;ll create a free account before checkout &mdash; takes under a minute.
          </p>
        </section>

        {/* Footer */}
        <footer className="flex flex-wrap gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Homepage
          </Link>
          <Link href="/hsc-maths" className="hover:text-slate-900">
            HSC Maths
          </Link>
          <Link href="/course" className="hover:text-slate-900">
            All courses
          </Link>
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy Notice
          </Link>
        </footer>

      </div>
    </main>
  );
}
