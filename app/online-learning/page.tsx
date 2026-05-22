import Link from "next/link";
import type { ReactNode } from "react";

const included = [
  {
    title: "Staged lessons",
    description:
      "Watch -> Learn -> Guided Practice -> Independent Practice -> Mastery Quiz.",
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

const units = [
  {
    title: "Differential Calculus",
    description:
      "Derivatives, tangents and normals, stationary points, curve sketching, optimisation, and rates of change.",
    href: "/course/differential-calculus",
  },
  {
    title: "Integral Calculus",
    description:
      "Antidifferentiation, definite integrals, area, the Trapezoidal rule, total change, and applications.",
    href: "/course/integral-calculus",
  },
  {
    title: "Functions and Graphing Techniques",
    description:
      "Function notation, domain and range, transformations, graph features, asymptotes, graphical solving, and modelling.",
    href: "/course/functions-graphing-techniques",
  },
];

const audience = [
  "Students who need structure before trials",
  "Students who cannot commit to weekly tutoring",
  "Students who know they have gaps but are unsure where to start",
  "Families looking for a lower-cost support option",
];

const betaSteps = [
  "Complete the free diagnostic.",
  "Register interest in online learning access.",
  "Access is being handled manually during beta.",
  "Feedback helps improve the product for future students.",
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
              HSC Maths Advanced &middot; Online learning beta
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Online HSC Maths Advanced lessons for targeted trial revision.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A structured beta learning package with explicit teaching, worked
              examples, guided practice, independent practice, and mastery
              quizzes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/enquire?offer=online-learning">
                Register interest
              </PrimaryLink>
              <SecondaryLink href="/diagnostic?offer=online-learning">
                Start free diagnostic
              </SecondaryLink>
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
              <SectionLabel>Current beta units</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Available now in the online package.
              </h2>
            </div>
            <SecondaryLink href="/course">View HSC course</SecondaryLink>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {units.map((unit) => (
              <article
                key={unit.href}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  Active beta unit
                </span>
                <h3 className="mt-4 text-xl font-bold">{unit.title}</h3>
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
            <SectionLabel>Who this is for</SectionLabel>
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

          <div className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm md:p-10">
            <SectionLabel>How beta access works</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Simple, manual, and improving with feedback.
            </h2>
            <ol className="mt-6 space-y-3 text-slate-700">
              {betaSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <h2 className="max-w-xl text-2xl font-bold tracking-tight md:text-3xl">
            Want access to the online learning beta?
          </h2>
          <PrimaryLink href="/enquire?offer=online-learning">
            Register interest
          </PrimaryLink>
        </section>
      </div>
    </main>
  );
}
