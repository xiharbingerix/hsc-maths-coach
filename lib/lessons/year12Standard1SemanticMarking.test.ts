import assert from "node:assert/strict";
import test from "node:test";
import { getNewCourse, getNewCourseUnitLessons } from "../newCourseCatalog";

const expectedQuestionSuffixes = [
  "y12s1-quad-g4",
  "y12s1-quad-i4",
  "y12s1-quad-m7",
  "y12s1-quad-m9",
  "y12s1-depr-i5",
  "y12s1-depr-m10",
  "y12s1-biv-m5",
  "y12s1-biv-m8",
  "y12s1-lobf-m9",
  "y12s1-lobf-m10",
  "y12s1-algex-i5",
  "y12s1-linmod-i5",
  "y12s1-sim-m10",
];

test("Year 12 Standard 1 qualitative questions have bounded semantic marking", () => {
  const course = getNewCourse("year-12-standard-1");
  assert.ok(course);

  const questions = course.units.flatMap((unit) =>
    getNewCourseUnitLessons(course.slug, unit.slug).flatMap((lesson) => [
      ...lesson.guidedPractice,
      ...lesson.independentPractice,
      ...lesson.masteryQuiz,
    ])
  );
  const semanticQuestions = questions.filter(
    (question) => question.responseType === "short_explanation"
  );

  assert.equal(semanticQuestions.length, expectedQuestionSuffixes.length);
  for (const suffix of expectedQuestionSuffixes) {
    const question = semanticQuestions.find((candidate) =>
      candidate.id.endsWith(suffix)
    );
    assert.ok(question, `${suffix} is missing semantic marking metadata`);
    assert.equal(question.choices, undefined);
    assert.ok(question.modelSolution?.trim());
    assert.ok(question.markingRubric?.length);
    assert.ok(question.markingFeedbackOptions?.length);

    const keys = question.markingFeedbackOptions.map((option) => option.key);
    assert.equal(new Set(keys).size, keys.length, `${suffix} has duplicate feedback keys`);
  }
});
