import assert from "node:assert/strict";
import { test } from "node:test";
import { getNewCourse } from "./newCourseCatalog";
import {
  buildWorksheetCourseMeta,
  type WorksheetQuestionMetaRow,
} from "./worksheetCourseMeta";

test("worksheet units and subtopics use canonical Year 10 course names and order", () => {
  const course = getNewCourse("year-10-mathematics");
  assert.ok(course);

  const unit = course.units.find(
    (candidate) =>
      candidate.slug === "algebra-equations-linear-relationships"
  );
  assert.ok(unit);

  const rows: WorksheetQuestionMetaRow[] = [
    ...unit.lessons
      .map((lesson) => ({
        course_slug: course.slug,
        topic_slug: unit.slug,
        subtopic_slug: lesson.slug,
      }))
      .reverse(),
    {
      course_slug: course.slug,
      topic_slug: "database-only-unit",
      subtopic_slug: "database-only-subtopic",
    },
  ];

  const metadata = buildWorksheetCourseMeta(rows);

  assert.deepEqual(metadata.courseTopics, [
    {
      courseSlug: course.slug,
      courseTitle: course.title,
      topicSlug: unit.slug,
      topicTitle: unit.title,
    },
  ]);
  assert.deepEqual(
    metadata.courseTopicSubtopics.map((entry) => entry.subtopicTitle),
    unit.lessons.map((lesson) => lesson.title)
  );
  assert.equal(
    metadata.courseTopicSubtopics.some(
      (entry) => entry.subtopicSlug === "database-only-subtopic"
    ),
    false
  );
});

test("worksheet metadata omits course subtopics with no active questions", () => {
  const metadata = buildWorksheetCourseMeta([
    {
      course_slug: "year-10-mathematics-core",
      topic_slug: "algebra-equations-linear-relationships",
      subtopic_slug: "solving-linear-equations",
    },
  ]);

  assert.deepEqual(
    metadata.courseTopicSubtopics.map((entry) => ({
      topic: entry.topicTitle,
      subtopic: entry.subtopicTitle,
    })),
    [
      {
        topic: "Algebra, Equations and Linear Relationships",
        subtopic: "Solving Linear Equations",
      },
    ]
  );
});
