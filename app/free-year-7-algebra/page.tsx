import Link from "next/link";
import katex from "katex";
import React, { type ReactNode } from "react";
import { SubscribeCTA } from "../components/SubscribeCTA";
import { PageViewTracker } from "../components/PageViewTracker";
import { totalActiveLessonCount } from "../../lib/courseUnits";
import { buildPageMetadata } from "../../lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Free Year 7 Algebra Lesson",
  description:
    "A free Nova Maths lesson for Year 7 algebra: solve equations using the inverse method and the balance method. No signup required.",
  path: "/free-year-7-algebra",
});

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

function KaTeXBlock({ tex }: Readonly<{ tex: string }>) {
  const html = katex.renderToString(tex, {
    displayMode: true,
    throwOnError: false,
  });

  return (
    <div
      className="my-4 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3"
      style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function EquationCard({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
        {children}
      </div>
    </div>
  );
}

function BalanceVisual() {
  return (
    <div
      role="img"
      aria-label="A balance scale showing that the same operation must happen to both sides of an equation."
      className="rounded-2xl border border-slate-200 bg-white p-5"
    >
      <svg viewBox="0 0 520 220" className="h-auto w-full">
        <line x1="260" y1="35" x2="260" y2="180" stroke="#0f172a" strokeWidth="8" />
        <line x1="140" y1="75" x2="400" y2="75" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
        <line x1="140" y1="75" x2="95" y2="145" stroke="#64748b" strokeWidth="4" />
        <line x1="140" y1="75" x2="185" y2="145" stroke="#64748b" strokeWidth="4" />
        <line x1="400" y1="75" x2="355" y2="145" stroke="#64748b" strokeWidth="4" />
        <line x1="400" y1="75" x2="445" y2="145" stroke="#64748b" strokeWidth="4" />
        <rect x="75" y="145" width="130" height="34" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
        <rect x="335" y="145" width="130" height="34" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        <text x="140" y="168" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f172a">x + 3</text>
        <text x="400" y="168" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f172a">11</text>
        <text x="260" y="205" textAnchor="middle" fontSize="15" fill="#475569">Keep both sides equal by doing the same thing to each side.</text>
      </svg>
    </div>
  );
}

const quickChecks = [
  {
    question: "Solve",
    tex: "x+5=12",
    hint: "The +5 is attached to x, so undo it with -5.",
    answerTex: "x=7",
  },
  {
    question: "Solve",
    tex: "3x=18",
    hint: "The 3 is multiplying x, so undo it by dividing by 3.",
    answerTex: "x=6",
  },
  {
    question: "Solve",
    tex: "x-4=9",
    hint: "The -4 is attached to x, so undo it with +4.",
    answerTex: "x=13",
  },
];

export default function FreeYear7AlgebraPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <PageViewTracker
        eventName="free_lesson_viewed"
        metadata={{ lesson: "algebra-equations", course: "year-7" }}
      />
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Nova Maths
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Log in
          </Link>
        </header>

        <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Free Year 7 algebra lesson &middot; No signup needed
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Solve equations without guessing.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Learn two calm ways to solve equations: the inverse method and
              the balance method. Both are built around one idea: undo what is
              happening to the unknown.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lesson-start"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Start the free lesson
              </a>
              <SubscribeCTA href="/signup">
                Sign up free
              </SubscribeCTA>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Written lesson &middot; Worked examples &middot; Practice questions
            </p>
          </div>

          <BalanceVisual />
        </section>

        <section
          id="lesson-start"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white md:px-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Year 7 Mathematics
            </p>
            <p className="mt-2 text-sm font-medium text-slate-300">Algebra</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Solving Equations: Inverse and Balance Methods
            </h2>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {["Learn", "Worked examples", "Practice", "Check"].map(
                (step, index) => (
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
                ),
              )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Understand equations as balanced statements.",
                "Use inverse operations to undo steps.",
                "Use the balance method to keep both sides equal.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionLabel>Learn</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            What an equation is really saying
          </h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-700">
            <p>
              An equation is a sentence with an equals sign. It says the left
              side and the right side have the same value.
            </p>
            <p>
              Solving an equation means finding the value of the unknown that
              makes the sentence true. We are not guessing. We are carefully
              undoing the operations around the unknown.
            </p>
            <p>
              There are two useful ways to think about this: the inverse method
              and the balance method. They look different, but they are really
              the same idea wearing two different jackets.
            </p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <EquationCard title="Method 1: The inverse method">
            <p>
              Inverse means opposite. Addition and subtraction undo each other.
              Multiplication and division undo each other.
            </p>
            <p>
              If the equation says <strong>x + 3</strong>, the unknown has had
              3 added to it. To get back to x, subtract 3.
            </p>
            <KaTeXBlock
              tex={"\\begin{aligned}x+3&=11\\\\x&=11-3\\\\x&=8\\end{aligned}"}
            />
            <p>
              I know to subtract 3 because +3 is the operation attached to x,
              and subtraction is the inverse operation.
            </p>
          </EquationCard>

          <EquationCard title="Method 2: The balance method">
            <p>
              The balance method treats the equals sign like a balanced scale.
              Whatever you do to one side, you must do to the other side.
            </p>
            <p>
              For <strong>x + 3 = 11</strong>, subtract 3 from both sides. The
              left side becomes x, and the right side becomes 8.
            </p>
            <KaTeXBlock
              tex={
                "\\begin{aligned}x+3&=11\\\\x+3-3&=11-3\\\\x&=8\\end{aligned}"
              }
            />
            <p>
              This works because both sides changed by the same amount, so the
              equation stayed balanced.
            </p>
          </EquationCard>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionLabel>Worked examples</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Three common equation types
          </h2>

          <div className="mt-6 space-y-5">
            <EquationCard title="Example 1: Addition around x">
              <KaTeXBlock tex={"x+6=15"} />
              <p>
                The x has 6 added to it. Undo +6 with -6.
              </p>
              <KaTeXBlock
                tex={
                  "\\begin{aligned}x+6-6&=15-6\\\\x&=9\\end{aligned}"
                }
              />
            </EquationCard>

            <EquationCard title="Example 2: Subtraction around x">
              <KaTeXBlock tex={"x-4=10"} />
              <p>
                The x has 4 subtracted from it. Undo -4 with +4.
              </p>
              <KaTeXBlock
                tex={
                  "\\begin{aligned}x-4+4&=10+4\\\\x&=14\\end{aligned}"
                }
              />
            </EquationCard>

            <EquationCard title="Example 3: Multiplication around x">
              <KaTeXBlock tex={"5x=35"} />
              <p>
                5x means 5 multiplied by x. Undo multiplication by 5 with
                division by 5.
              </p>
              <KaTeXBlock
                tex={
                  "\\begin{aligned}\\frac{5x}{5}&=\\frac{35}{5}\\\\x&=7\\end{aligned}"
                }
              />
            </EquationCard>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionLabel>Practice</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Try a few
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            For each one, first ask: what is happening to x? Then undo it.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {quickChecks.map((item, index) => (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Question {index + 1}
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {item.question}
                </p>
                <div>
                  <KaTeXBlock tex={item.tex} />
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Hint: {item.hint}
                </p>
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    Show answer
                  </summary>
                  <div className="mt-2 rounded-xl bg-white p-3">
                    <KaTeXBlock tex={item.answerTex} />
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
          <SectionLabel>Common traps</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            What students often mix up
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <li>
              <strong>Trap:</strong> Moving a number to the other side without
              knowing why. <strong>Fix:</strong> name the inverse operation.
            </li>
            <li>
              <strong>Trap:</strong> Changing only one side. <strong>Fix:</strong>{" "}
              if you use the balance method, do the same operation to both
              sides.
            </li>
            <li>
              <strong>Trap:</strong> Thinking 4x means x + 4.{" "}
              <strong>Fix:</strong> 4x means 4 multiplied by x.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <SectionLabel>What&apos;s included</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            This is the Nova Maths lesson style.
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Your free account gives you a structured pathway through NSW maths from
            Year 8 to HSC: {totalActiveLessonCount} active lessons with clear
            explanations, worked examples, guided practice, independent
            practice, mastery quizzes and saved progress. Year 7 is currently a
            free preview lesson only.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <SubscribeCTA href="/signup">
              Sign up free
            </SubscribeCTA>
            <SecondaryLink href="/course">View courses</SecondaryLink>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Create a free account so progress is saved across devices. No card
            required.
          </p>
        </section>

        <footer className="flex flex-wrap gap-4 border-t border-slate-200 pb-8 pt-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Homepage
          </Link>
          <Link href="/online-learning" className="hover:text-slate-900">
            Online learning
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
