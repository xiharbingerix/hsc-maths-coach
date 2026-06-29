import type { Metadata } from "next";
import {
  getNewCourse,
  getNewCourseUnit,
  isVisibleCourseLesson,
} from "./newCourseCatalog";
import { year12AdvancedCourse } from "./courseUnits";
import {
  getYear12AdvancedRouteLesson,
  getYear12AdvancedRouteUnit,
} from "./year12AdvancedRoutes";
import { buildPageMetadata } from "./siteMetadata";

function conciseDescription(description: string, maxLength = 160) {
  if (description.length <= maxLength) return description;
  const shortened = description.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 100 ? lastSpace : shortened.length)}…`;
}

function notFoundMetadata(): Metadata {
  return {
    title: "Page not found",
    robots: { index: false, follow: false },
  };
}

function courseDetails(courseSlug: string) {
  if (courseSlug === "year-12-advanced") {
    return {
      title: year12AdvancedCourse.courseTitle,
      description: year12AdvancedCourse.description,
    };
  }

  const course = getNewCourse(courseSlug);
  return course
    ? { title: course.title, description: course.description }
    : null;
}

export function buildCourseMetadata(courseSlug: string): Metadata {
  const course = courseDetails(courseSlug);
  if (!course) return notFoundMetadata();

  return buildPageMetadata({
    title: `${course.title} Online Course`,
    description: conciseDescription(
      `${course.description} Explore structured lessons, worked examples, guided practice and mastery quizzes aligned to NSW maths.`
    ),
    path: `/course/${courseSlug}`,
  });
}

export function buildCourseUnitMetadata(
  courseSlug: string,
  unitSlug: string
): Metadata {
  const course = courseDetails(courseSlug);
  const unit =
    courseSlug === "year-12-advanced"
      ? getYear12AdvancedRouteUnit(unitSlug)
      : getNewCourseUnit(courseSlug, unitSlug);

  if (!course || !unit) return notFoundMetadata();

  return buildPageMetadata({
    title: `${unit.title} – ${course.title}`,
    description: conciseDescription(
      `${unit.description} Explore the lesson sequence, worked examples, practice and mastery checks from Nova Maths.`
    ),
    path: `/course/${courseSlug}/${unitSlug}`,
  });
}

export function buildCourseLessonMetadata(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string
): Metadata {
  const course = courseDetails(courseSlug);
  const routeLesson =
    courseSlug === "year-12-advanced"
      ? getYear12AdvancedRouteLesson(unitSlug, lessonSlug)
      : null;
  const seedLesson =
    courseSlug === "year-12-advanced"
      ? null
      : getNewCourseUnit(courseSlug, unitSlug)?.lessons.find(
          (lesson) => lesson.slug === lessonSlug && isVisibleCourseLesson(lesson)
        );
  const lesson = routeLesson ?? seedLesson;

  if (!course || !lesson) return notFoundMetadata();

  const description =
    lesson.description ??
    `Learn ${lesson.title.toLowerCase()} with clear explanations, worked examples, guided practice and a mastery quiz.`;

  return buildPageMetadata({
    title: `${lesson.title} – ${course.title}`,
    description: conciseDescription(description),
    path: `/course/${courseSlug}/${unitSlug}/${lessonSlug}`,
  });
}
