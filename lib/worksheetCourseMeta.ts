import {
  isVisibleCourseLesson,
  newCoursePathways,
} from "./newCourseCatalog";
import { year12AdvancedRouteUnits } from "./year12AdvancedRoutes";

export type WorksheetQuestionMetaRow = {
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
};

export type WorksheetCourseTopicEntry = {
  courseSlug: string;
  courseTitle: string;
  topicSlug: string;
  topicTitle: string;
};

export type WorksheetCourseTopicSubtopicEntry = WorksheetCourseTopicEntry & {
  subtopicSlug: string;
  subtopicTitle: string;
};

export type WorksheetCourseMeta = {
  courseTopics: WorksheetCourseTopicEntry[];
  courseTopicSubtopics: WorksheetCourseTopicSubtopicEntry[];
};

type CanonicalCourse = {
  slug: string;
  title: string;
  units: {
    slug: string;
    title: string;
    lessons: {
      slug: string;
      title: string;
    }[];
  }[];
};

const canonicalWorksheetCourses: CanonicalCourse[] = [
  ...newCoursePathways.map((course) => ({
    slug: course.slug,
    title: course.title,
    units: course.units.map((unit) => ({
      slug: unit.slug,
      title: unit.title,
      lessons: unit.lessons.filter(isVisibleCourseLesson).map((lesson) => ({
        slug: lesson.slug,
        title: lesson.title,
      })),
    })),
  })),
  {
    slug: "year-12-advanced",
    title: "Year 12 Mathematics Advanced",
    units: year12AdvancedRouteUnits.map((unit) => ({
      slug: unit.slug,
      title: unit.title,
      lessons: unit.lessons.map((lesson) => ({
        slug: lesson.slug,
        title: lesson.title,
      })),
    })),
  },
];

function tupleKey(courseSlug: string, topicSlug: string, subtopicSlug: string) {
  return `${courseSlug}::${topicSlug}::${subtopicSlug}`;
}

/**
 * Builds the worksheet picker from the same authored catalogue used by course
 * pages. The question bank only controls availability; it never controls the
 * displayed names or ordering.
 */
export function buildWorksheetCourseMeta(
  rows: WorksheetQuestionMetaRow[]
): WorksheetCourseMeta {
  const availableTuples = new Set(
    rows
      .filter(
        (row) =>
          Boolean(row.course_slug) &&
          Boolean(row.topic_slug) &&
          Boolean(row.subtopic_slug)
      )
      .map((row) =>
        tupleKey(row.course_slug, row.topic_slug, row.subtopic_slug)
      )
  );
  const courseTopics: WorksheetCourseTopicEntry[] = [];
  const courseTopicSubtopics: WorksheetCourseTopicSubtopicEntry[] = [];

  for (const course of canonicalWorksheetCourses) {
    for (const unit of course.units) {
      const availableLessons = unit.lessons.filter((lesson) =>
        availableTuples.has(tupleKey(course.slug, unit.slug, lesson.slug))
      );

      if (availableLessons.length === 0) continue;

      const topic = {
        courseSlug: course.slug,
        courseTitle: course.title,
        topicSlug: unit.slug,
        topicTitle: unit.title,
      };
      courseTopics.push(topic);

      for (const lesson of availableLessons) {
        courseTopicSubtopics.push({
          ...topic,
          subtopicSlug: lesson.slug,
          subtopicTitle: lesson.title,
        });
      }
    }
  }

  return { courseTopics, courseTopicSubtopics };
}
