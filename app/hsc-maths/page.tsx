import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SubscribeCTA } from "../components/SubscribeCTA";
import { courseCatalogue } from "../../lib/courseUnits";

export const metadata: Metadata = {
  title: "HSC Maths Online Lessons | Nova Maths",
  description:
    "Structured NSW HSC maths lessons, practice and mastery quizzes for Year 12 students. Study at your own pace for $19/month.",
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
      "Create your account, continue to secure Stripe checkout, then use your dashboard to start learning. Your access and progress are linked to your account.",
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

export default function HscMathsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
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

        <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              NSW HSC Maths &middot; Year 12 Advanced and Standard 2
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Stop guessing what to revise for HSC maths.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Nova Maths gives Year 12 students a structured path through HSC
              maths: worked examples, practice questions, mastery quizzes and
              saved progress &mdash; all built for the NSW curriculum.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sample-hsc-lesson"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Preview a free HSC lesson
              </Link>
              <SubscribeCTA href="/checkout?offer=online-learning">
                Start HSC maths &mdash; $19/month
              </SubscribeCTA>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              No signup needed to preview &middot; Self-paced &middot; Cancel any time &middot; Less than $1/day
            </p>
          </div>

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
            Maths is $19/month, with access to all available Year 9&ndash;12
            maths pathways.
          </p>
          <div className="mt-7">
            <SubscribeCTA href="/checkout?offer=online-learning">
              Start learning &mdash; $19/month
            </SubscribeCTA>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Secure checkout with Stripe &middot; Cancel any time
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
            <SubscribeCTA
              href="/checkout?offer=online-learning"
              className="bg-white text-slate-950 hover:bg-slate-100"
            >
              Start HSC maths &mdash; $19/month
            </SubscribeCTA>
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
    </main>
  );
}
