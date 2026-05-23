import Link from "next/link";
import type { ReactNode } from "react";
import { courseUnits } from "../../lib/courseUnits";

const included = [
  {
    title: "Staged lessons",
    description:
      "Current lesson flow: Learn -> Guided Practice -> Independent Practice -> Mastery Quiz. Video lessons can be added later without changing the written pathway.",
  },
  {
    title: "Targeted course units",
    description:
      "Work through the units that match the highest-impact gaps from the diagnostic.",
  },
  {
    title: "Worked examples and scaffolded practice",
    description:
      "Each lesson moves from clear explanation into guided and independent questions.",
  },
  {
    title: "Mastery quizzes",
    description:
      "Typed and multiple-choice checks help students decide whether to move on or review.",
  },
  {
    title: "NSW Year 12 Mathematics Advanced",
    description:
      "Built around the skills students need for HSC Maths Advanced revision.",
  },
];

const audience = [
  "Students unsure where to start",
  "Students preparing for trials or the HSC",
  "Students who need structure between tutoring or school lessons",
  "Families looking for a lower-cost support option",
];

const lessonActions = [
  "Learn the key idea",
  "Work through examples",
  "Complete guided practice",
  "Complete independent practice",
  "Attempt a mastery quiz",
];

const accessSteps = [
  "Create an account or register interest.",
  "Joshua reviews access requests manually during early access.",
  "Approved students can work through the Year 12 course lessons and mastery checks.",
  "Reports and study plans can be requested separately.",
];

function PrimaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}

function SectionLabel({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
}

export default function OnlineLearningPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">
              HSC Maths Advanced &middot; Online learning
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Online HSC Maths Advanced lessons for targeted trial revision.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Structured Year 12 Maths Advanced online learning for students
              who want targeted revision without committing to weekly tutoring.
              Access is approved manually during early access.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/enquire?offer=online-learning">
                Register interest
              </PrimaryLink>
              <SecondaryLink href="/signup">Create account</SecondaryLink>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <SecondaryLink href="/diagnostic?offer=online-learning">
                Start free diagnostic
              </SecondaryLink>
              <SecondaryLink href="/login">Log in</SecondaryLink>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-2xl">
            <SectionLabel>What&apos;s included</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              A structured way to revise without guessing what to do next.
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

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Current units</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Broad Year 12 trial-revision coverage.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                The current package includes six Year 12 Mathematics Advanced
                units across calculus, functions, trigonometry, financial
                mathematics, and statistics.
              </p>
            </div>
            <SecondaryLink href="/course">View HSC course</SecondaryLink>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courseUnits.map((unit) => (
              <article
                key={unit.href}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  Available now
                </span>
                <h3 className="mt-4 text-xl font-bold">{unit.title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {unit.activeLessonCount} active lessons
                </p>
                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {unit.description}
                </p>
                <SecondaryLink href={unit.href}>Open unit</SecondaryLink>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <SectionLabel>Who this helps</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Built for students who need focused structure.
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {audience.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <SectionLabel>Inside each lesson</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              What students do inside each lesson.
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {lessonActions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
          <SectionLabel>Early access</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            How early access works.
          </h2>
          <ol className="mt-6 space-y-3 text-slate-700">
            {accessSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionLabel>Live support option</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Weekly Tutoring + Online Learning
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Students wanting live support can enquire about Weekly Tutoring
                + Online Learning for $75/week. This combines weekly individual
                support with access to the online learning package.
              </p>
            </div>
            <SecondaryLink href="/enquire?offer=weekly-tutoring">
              Enquire about tutoring
            </SecondaryLink>
          </div>
        </section>

        <section className="flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <h2 className="max-w-xl text-2xl font-bold tracking-tight md:text-3xl">
            Want access to the online learning package?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryLink href="/enquire?offer=online-learning">
              Register interest
            </PrimaryLink>
            <SecondaryLink href="/signup">Create account</SecondaryLink>
            <SecondaryLink href="/diagnostic?offer=online-learning">
              Start diagnostic
            </SecondaryLink>
          </div>
        </section>
      </div>
    </main>
  );
}
