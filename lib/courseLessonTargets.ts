import { courseCatalogue, courseUnits } from "./courseUnits";
import { newCoursePathways } from "./newCourseCatalog";
import { year12AdvancedNestedLessonHref } from "./year12AdvancedRoutes";
import { applicationsDifferentiationOutline } from "./lessons/applicationsDifferentiation";
import { differentialCalculusOutline } from "./lessons/differentialCalculus";
import { differentiationTechniquesOutline } from "./lessons/differentiationTechniques";
import { exponentialLogarithmicFunctionsOutline } from "./lessons/exponentialLogarithmicFunctions";
import { financialMathematicsOutline } from "./lessons/financialMathematics";
import { functionsGraphingTechniquesOutline } from "./lessons/functionsGraphingTechniques";
import { furtherIntegralCalculusOutline } from "./lessons/furtherIntegralCalculus";
import { furtherTrigonometryOutline } from "./lessons/furtherTrigonometry";
import { integralCalculusOutline } from "./lessons/integralCalculus";
import { sequencesSeriesFinancialMathsOutline } from "./lessons/sequencesSeriesFinancialMaths";
import { statisticalAnalysisOutline } from "./lessons/statisticalAnalysis";
import { trigonometricFunctionsGraphsOutline } from "./lessons/trigonometricFunctionsGraphs";
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

const year12AdvancedOutlines = new Map([
  ["differential-calculus", differentialCalculusOutline],
  ["differentiation-techniques", differentiationTechniquesOutline],
  ["applications-differentiation", applicationsDifferentiationOutline],
  ["integral-calculus", integralCalculusOutline],
  ["further-integral-calculus", furtherIntegralCalculusOutline],
  ["functions-graphing-techniques", functionsGraphingTechniquesOutline],
  ["trigonometric-functions-graphs", trigonometricFunctionsGraphsOutline],
  ["further-trigonometry", furtherTrigonometryOutline],
  [
    "exponential-logarithmic-functions",
    exponentialLogarithmicFunctionsOutline,
  ],
  ["sequences-series-financial-maths", sequencesSeriesFinancialMathsOutline],
  ["financial-mathematics", financialMathematicsOutline],
  ["statistical-analysis", statisticalAnalysisOutline],
]);

const year12AdvancedTargets = courseUnits.flatMap((unit) => {
  const unitSlug = unit.href.replace("/course/", "");
  const outline = year12AdvancedOutlines.get(unitSlug) ?? [];

  return outline
    .filter((lesson) => lesson.status === "active")
    .map<CourseLessonTarget>((lesson) => ({
      courseSlug: "year-12-advanced",
      courseTitle: "Year 12 Mathematics Advanced",
      unitSlug,
      unitTitle: unit.title,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      href: year12AdvancedNestedLessonHref(unitSlug, lesson.slug),
    }));
});

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
        course.units.some((unit) => unit.lessons.length > 0)
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
    unit.lessons.map<CourseLessonTarget>((lesson) => ({
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
