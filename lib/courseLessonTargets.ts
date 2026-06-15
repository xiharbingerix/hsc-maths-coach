import { courseCatalogue } from "./courseUnits";
import { isVisibleCourseLesson, newCoursePathways } from "./newCourseCatalog";
import { year12AdvancedNestedLessonHref, year12AdvancedRouteUnits } from "./year12AdvancedRoutes";
import type { LessonProgressRecord } from "./lessonProgress";

export type CourseLessonTarget = {
  courseSlug: string;
  courseTitle: string;
  unitSlug: string;
  unitTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  href: string;
};

export type ContinueLearningTarget = CourseLessonTarget & {
  status: "In progress" | "Next lesson";
  lastScore?: number | null;
};

const year12AdvancedTargets = year12AdvancedRouteUnits.flatMap((unit) =>
  unit.lessons
    .filter((lesson) => lesson.status === "active")
    .map<CourseLessonTarget>((lesson) => ({
      courseSlug: "year-12-advanced",
      courseTitle: "Year 12 Mathematics Advanced",
      unitSlug: unit.slug,
      unitTitle: unit.title,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      href: year12AdvancedNestedLessonHref(unit.slug, lesson.slug),
    }))
);

const availableCourseSlugs = new Set(
  courseCatalogue
    .filter((course) => course.status === "available")
    .map((course) => course.courseSlug)
);

// in_progress courses that have at least one real lesson (not shell units)
const inProgressCourseSlugsWithContent = new Set<string>(
  newCoursePathways
    .filter(
      (course) =>
        course.status === "in_progress" &&
        course.units.some((unit) => unit.lessons.some(isVisibleCourseLesson))
    )
    .map((course) => course.slug)
);

const nestedCourseTargets = newCoursePathways.flatMap((course) => {
  if (
    !availableCourseSlugs.has(course.slug) &&
    !inProgressCourseSlugsWithContent.has(course.slug)
  )
    return [];

  return course.units.flatMap((unit) =>
    unit.lessons
      .filter(isVisibleCourseLesson)
      .map<CourseLessonTarget>((lesson) => ({
        courseSlug: course.slug,
        courseTitle: course.title,
        unitSlug: unit.slug,
        unitTitle: unit.title,
        lessonSlug: lesson.slug,
        lessonTitle: lesson.title,
        href: `/course/${course.slug}/${unit.slug}/${lesson.slug}`,
      }))
  );
});

export const availableCourseLessonTargets = [
  ...year12AdvancedTargets,
  ...nestedCourseTargets,
];

function progressKey({
  courseSlug,
  unitSlug,
  lessonSlug,
}: Pick<CourseLessonTarget, "courseSlug" | "unitSlug" | "lessonSlug">) {
  return `${courseSlug}/${unitSlug}/${lessonSlug}`;
}

function updatedAtTimestamp(record: LessonProgressRecord) {
  const timestamp = Date.parse(record.updatedAt ?? "");
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function getContinueLearningTarget(
  progressRecords: LessonProgressRecord[],
  selectedCourseSlug?: string | null
): ContinueLearningTarget | null {
  const targetByKey = new Map(
    availableCourseLessonTargets.map((target) => [progressKey(target), target])
  );
  const validProgress = progressRecords.filter((record) =>
    targetByKey.has(progressKey(record))
  );
  const progressByKey = new Map(
    validProgress.map((record) => [progressKey(record), record])
  );

  const recentInProgress = validProgress
    .filter(
      (record) =>
        !record.passed &&
        (record.completedStages.length > 0 || record.lastScore != null)
    )
    .sort((left, right) => updatedAtTimestamp(right) - updatedAtTimestamp(left))[0];

  if (recentInProgress) {
    const target = targetByKey.get(progressKey(recentInProgress));
    return target
      ? {
          ...target,
          status: "In progress",
          lastScore: recentInProgress.lastScore,
        }
      : null;
  }

  const courseOrder = courseCatalogue
    .filter(
      (course) =>
        course.status === "available" ||
        inProgressCourseSlugsWithContent.has(course.courseSlug)
    )
    .map((course) => course.courseSlug);
  const courseCandidates = courseOrder
    .map((courseSlug, order) => {
      const targets = availableCourseLessonTargets.filter(
        (target) => target.courseSlug === courseSlug
      );
      const firstIncomplete = targets.find(
        (target) => !progressByKey.get(progressKey(target))?.passed
      );
      const courseProgress = validProgress.filter(
        (record) => record.courseSlug === courseSlug
      );

      return {
        courseSlug,
        firstIncomplete,
        order,
        passedCount: courseProgress.filter((record) => record.passed).length,
        touchedCount: courseProgress.length,
      };
    })
    .filter((course) => course.firstIncomplete);

  // If the student has explicitly selected a course, use only that course.
  // If no selection, only surface courses where they already have progress —
  // new students with no selection return null so the dashboard shows the
  // course picker instead of defaulting to year-12-advanced.
  const filtered = selectedCourseSlug
    ? courseCandidates.filter((c) => c.courseSlug === selectedCourseSlug)
    : courseCandidates.filter((c) => c.passedCount > 0 || c.touchedCount > 0);

  const sorted = filtered.sort(
    (left, right) =>
      right.passedCount - left.passedCount ||
      right.touchedCount - left.touchedCount ||
      left.order - right.order
  );

  const nextLesson = sorted[0]?.firstIncomplete;
  return nextLesson ? { ...nextLesson, status: "Next lesson" } : null;
}
