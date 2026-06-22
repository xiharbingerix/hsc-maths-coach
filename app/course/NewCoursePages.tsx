import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonRenderer } from "./LessonRenderer";
import {
  getNewCourse,
  getNewCourseLesson,
  getNewCourseUnit,
  getNewCourseUnitOutline,
  getVisibleNewCourseLessons,
  newCourseLessonCount,
  newCourseUnitLessonCount,
} from "../../lib/newCourseCatalog";
import type { CoursePathwayStatus } from "../../lib/courseTypes";
import { getTopicTestPool } from "../../lib/topicTests";
import { StudentNav } from "../components/StudentNav";

const lessonSequence = [
  "Learn",
  "Guided Practice",
  "Independent Practice",
  "Mastery Quiz",
];

const statusCopy: Record<
  CoursePathwayStatus,
  { label: string; classes: string }
> = {
  available: {
    label: "Available",
    classes: "bg-green-100 text-green-800",
  },
  in_progress: {
    label: "Partly available",
    classes: "bg-amber-100 text-amber-800",
  },
  coming_soon: {
    label: "Coming soon",
    classes: "bg-slate-200 text-slate-700",
  },
  hidden: {
    label: "Coming soon",
    classes: "bg-slate-200 text-slate-700",
  },
};

function courseStatusNote(courseSlug: string) {
  if (courseSlug === "year-11-extension") {
    return "2 of 5 planned topics currently available. Active topics: Permutations and Combinations; The Binomial Theorem. Coming soon: Further Work with Functions, Polynomials, Further Trigonometry.";
  }

  if (courseSlug === "year-12-extension-1") {
    return "All 6 units are now active: Proof by Mathematical Induction, Introduction to Vectors, Inverse Trigonometric Functions, Further Calculus Skills, Further Applications of Calculus, and The Binomial Distribution.";
  }

  return null;
}

function ButtonLink({
  href,
  children,
  variant = "secondary",
}: Readonly<{
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}>) {
  const classes =
    variant === "primary"
      ? "bg-slate-950 text-white hover:bg-slate-800"
      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition ${classes}`}
    >
      {children}
    </Link>
  );
}

export function NewCourseOverviewPage({
  courseSlug,
}: Readonly<{ courseSlug: string }>) {
  const course = getNewCourse(courseSlug);

  if (!course) {
    notFound();
  }

  const lessonCount = newCourseLessonCount(course);
  const status = statusCopy[course.status];
  const activeUnits = course.units.filter((unit) => newCourseUnitLessonCount(unit) > 0);
  const plannedUnits = course.units.filter((unit) => newCourseUnitLessonCount(unit) === 0);
  const hasActiveLessons = activeUnits.length > 0;
  const note = courseStatusNote(course.slug);

  return (
    <>
      <StudentNav />
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <Link
            href="/course"
            className="text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900"
          >
            ← Course catalogue
          </Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {course.positioning}
          </p>

          {note && (
            <p className="mt-4 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-4 leading-7 text-amber-900">
              {note}
            </p>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {hasActiveLessons ? "Units" : "Status"}
              </p>
              <p className="mt-1 text-3xl font-bold">
                {hasActiveLessons ? course.units.length : status.label}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {hasActiveLessons ? "Active lessons" : "Planned units"}
              </p>
              <p className="mt-1 text-3xl font-bold">
                {hasActiveLessons ? lessonCount : course.units.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Course type
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {course.courseType}
              </p>
            </div>
          </div>
        </header>

        {hasActiveLessons && (
          <section className="grid gap-5 md:grid-cols-2">
            {activeUnits.map((unit) => (
              <Link
                key={unit.slug}
                href={`/course/${course.slug}/${unit.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Active unit
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${status.classes}`}
                  >
                    {status.label}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-bold">{unit.title}</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {newCourseUnitLessonCount(unit)} active lessons
                </p>
                <p className="mt-3 leading-7 text-slate-600">
                  {unit.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-slate-950">
                  View unit
                </p>
              </Link>
            ))}
          </section>
        )}

        {plannedUnits.length > 0 && (
          <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.classes}`}
              >
                {status.label}
              </span>
              <h2 className="mt-4 text-2xl font-bold">
                {hasActiveLessons
                  ? "Additional units coming soon"
                  : "Course outline coming soon"}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Planned units are shown below, but no active lesson routes have
                been created for these units and no placeholder lessons are
                shown.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {plannedUnits.map((unit) => (
                <article
                  key={unit.slug}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Planned unit
                    </p>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                      Coming soon
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{unit.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {unit.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Part of online learning access
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                {hasActiveLessons
                  ? "Unit overviews are public previews. Individual lessons use the same online learning access gate as the existing Year 12 Advanced course."
                  : "This pathway is not open for lessons yet. The course outline will appear here once planning is complete."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {hasActiveLessons ? (
                <ButtonLink href="/checkout?offer=online-learning" variant="primary">
                  Start your 7-day free trial
                </ButtonLink>
              ) : (
                <ButtonLink href="/online-learning" variant="primary">
                  View online learning
                </ButtonLink>
              )}
              <ButtonLink href="/signup">Create account</ButtonLink>
              <ButtonLink href="/course">Course catalogue</ButtonLink>
            </div>
          </div>
        </section>
      </section>
    </main>
    </>
  );
}

export function NewCourseUnitPage({
  courseSlug,
  unitSlug,
}: Readonly<{ courseSlug: string; unitSlug: string }>) {
  const course = getNewCourse(courseSlug);
  const unit = getNewCourseUnit(courseSlug, unitSlug);
  const outline = getNewCourseUnitOutline(courseSlug, unitSlug);
  const visibleLessonCount = outline.length;

  if (!course || !unit) {
    notFound();
  }

  // Show the topic-test call-to-action only when a pool is registered for this unit.
  const topicTest = getTopicTestPool(courseSlug, unitSlug);

  return (
    <>
      <StudentNav />
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <Link
            href={`/course/${courseSlug}`}
            className="text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900"
          >
            ← {course.title}
          </Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {unit.title}
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {unit.description}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Active lessons
              </p>
              <p className="mt-1 text-3xl font-bold">{visibleLessonCount}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </p>
              <p className="mt-2 text-sm font-semibold text-green-800">
                Active
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lesson flow
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {lessonSequence.join(" -> ")}
              </p>
            </div>
          </div>
        </header>

        {topicTest && (
          <section className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white shadow-sm md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Diagnostic
                </p>
                <h2 className="mt-1 text-2xl font-bold">Take the topic test</h2>
                <p className="mt-2 max-w-2xl leading-7 text-slate-200">
                  A timed, ~60-minute test drawn at random across all{" "}
                  {topicTest.subtopics.length} subtopics of this unit. You get a
                  marked result, a predicted band, and a clear list of which
                  subtopics to re-practise.
                </p>
              </div>
              <Link
                href={`/topic-test/${courseSlug}/${unitSlug}`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                Start topic test
              </Link>
            </div>
          </section>
        )}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">How to use this unit</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>Start from lesson 1 and move through the pathway in order.</li>
              <li>Use guided practice before attempting independent practice.</li>
              <li>Mastery quizzes check whether the skill is ready for review or extension.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Unit pathway
                </p>
                <h2 className="mt-1 text-2xl font-bold">Lesson pathway</h2>
              </div>
              <p className="text-sm text-slate-500">
                {outline.length} of {outline.length} active
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {outline.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  href={`/course/${course.slug}/${unit.slug}/${lesson.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50"
                >
                  <p className="text-sm font-semibold text-slate-500">
                    Lesson {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{lesson.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {lesson.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Part of the Online Learning Package
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Unit previews stay public, while individual lessons require
                active online learning access.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <ButtonLink href="/online-learning">
                Learn about online learning
              </ButtonLink>
              <ButtonLink href="/checkout?offer=online-learning" variant="primary">
                Start your 7-day free trial
              </ButtonLink>
              <ButtonLink href="/signup">Create account</ButtonLink>
              <ButtonLink href="/login">Log in</ButtonLink>
              <ButtonLink href="/dashboard">Dashboard</ButtonLink>
            </div>
          </div>
        </section>
      </section>
    </main>
    </>
  );
}

export function NewCourseLessonPage({
  courseSlug,
  unitSlug,
  lessonSlug,
}: Readonly<{ courseSlug: string; unitSlug: string; lessonSlug: string }>) {
  const lesson = getNewCourseLesson(courseSlug, unitSlug, lessonSlug);
  const visibleLessons = getVisibleNewCourseLessons(courseSlug, unitSlug);

  if (!lesson) {
    notFound();
  }

  const lessonIndex = visibleLessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = lessonIndex > 0 ? visibleLessons[lessonIndex - 1] : undefined;
  const nextLesson =
    lessonIndex >= 0 && lessonIndex < visibleLessons.length - 1
      ? visibleLessons[lessonIndex + 1]
      : lessonIndex === -1
        ? visibleLessons[0]
        : undefined;
  const lessonNavigation = lessonIndex === -1 ? [lesson, ...visibleLessons] : visibleLessons;

  return (
    <LessonRenderer
      courseSlug={courseSlug}
      unitSlug={unitSlug}
      lessonSlug={lesson.slug}
      lessons={lessonNavigation}
      backHref={`/course/${courseSlug}/${unitSlug}`}
      backLabel={`Back to ${lesson.moduleTitle}`}
      prevHref={
        prevLesson
          ? `/course/${courseSlug}/${unitSlug}/${prevLesson.slug}`
          : undefined
      }
      prevLabel={prevLesson?.title}
      nextHref={
        nextLesson
          ? `/course/${courseSlug}/${unitSlug}/${nextLesson.slug}`
          : undefined
      }
      nextLabel={nextLesson?.title}
    />
  );
}
