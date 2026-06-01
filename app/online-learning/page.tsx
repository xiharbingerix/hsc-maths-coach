import Link from "next/link";
import type { ReactNode } from "react";
import { courseCatalogue } from "../../lib/courseUnits";
import type { CoursePathwayStatus } from "../../lib/courseTypes";
import { SubscribeCTA } from "../components/SubscribeCTA";

const statusCopy: Record<
  CoursePathwayStatus,
  { label: string; classes: string }
> = {
  available: {
    label: "Available",
    classes: "bg-green-100 text-green-800",
  },
  in_progress: {
    label: "In development",
    classes: "bg-amber-100 text-amber-800",
  },
  coming_soon: {
    label: "Coming soon",
    classes: "bg-slate-200 text-slate-700",
  },
};

function courseStatus(courseSlug: string, status: CoursePathwayStatus) {
  if (courseSlug === "year-11-extension") {
    return {
      label: "Partly available",
      classes: "bg-amber-100 text-amber-800",
    };
  }

  return statusCopy[status];
}

const included = [
  {
    title: "Staged lessons",
    description:
      "Current lesson flow: Learn -> Guided Practice -> Independent Practice -> Mastery Quiz. Video lessons can be added later without changing the written pathway.",
  },
  {
    title: "Targeted course units",
    description:
      "Work through available units that match the student's current study priorities.",
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
    title: "NSW mathematics pathways",
    description:
      "Built around skills students need across the available Year 9, 10, 11 and 12 maths course pathways.",
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
  "Create an account from the signup page.",
  "Subscribe to online learning for $19/month.",
  "Access activates automatically after payment.",
  "Cancel any time from your account.",
];

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
              NSW maths &middot; Online learning
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Online lessons for available Year 9, 10, 11 and 12 maths pathways.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Structured online learning for students who want targeted
              maths revision without committing to weekly tutoring.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SubscribeCTA href="/checkout?offer=online-learning">
                Subscribe to online learning
              </SubscribeCTA>
              <SecondaryLink href="/signup">Create account</SecondaryLink>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              $19/month &middot; Cancel any time.
            </p>

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
              <SectionLabel>Current pathways</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Year 9 to Year 12 maths pathways.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Year 9 Mathematics is fully available with 53 lessons across 8
                units. Year 10 Mathematics is fully available with 53 lessons
                across 10 units. Year 12 Advanced remains the main diagnostic
                pathway. Year 11 Advanced, Year 11 Standard, Year 11 Extension
                and Year 12 Standard 2 are also available.
              </p>
            </div>
            <SecondaryLink href="/course">View all courses</SecondaryLink>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courseCatalogue.map((course) => {
              const status = courseStatus(course.courseSlug, course.status);

              return (
                <article
                  key={course.courseSlug}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${status.classes}`}
                  >
                    {status.label}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{course.courseTitle}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {course.status === "coming_soon"
                      ? `${course.unitCount} planned units`
                      : `${course.unitCount} units - ${course.activeLessonCount} active lessons`}
                  </p>
                  <p className="mt-3 flex-1 leading-7 text-slate-600">
                    {course.description}
                  </p>
                  <SecondaryLink href={course.href}>Open pathway</SecondaryLink>
                </article>
              );
            })}
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
          <SectionLabel>Getting started</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            How to get started.
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
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <SubscribeCTA href="/checkout?offer=online-learning">
              Subscribe to online learning
            </SubscribeCTA>
            <SecondaryLink href="/enquire?offer=online-learning">
              Register interest
            </SecondaryLink>
            <SecondaryLink href="/signup">Create account</SecondaryLink>
            <SecondaryLink href="/diagnostic?offer=online-learning">
              Start diagnostic
            </SecondaryLink>
          </div>
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
                support with access to the online learning package. Support
                across available maths pathways is subject to
                availability.
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
            <SubscribeCTA href="/checkout?offer=online-learning">
              Subscribe to online learning
            </SubscribeCTA>
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
