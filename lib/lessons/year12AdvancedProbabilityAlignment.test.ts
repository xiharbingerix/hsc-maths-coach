import test from "node:test";
import assert from "node:assert/strict";
import { year12AdvancedRouteUnits } from "../year12AdvancedRoutes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";
import { DIAGRAM_SPECS } from "./diagramRegistry";

const unit = (slug: string) => {
  const result = year12AdvancedRouteUnits.find((candidate) => candidate.slug === slug);
  assert.ok(result, "Missing Year 12 Advanced route unit " + slug);
  return result;
};

const maS1 = unit("ma-s1-probability-and-discrete-probability-distributions");
const maS2 = unit("ma-s2-descriptive-statistics-and-bivariate-data");
const maS3 = unit("ma-s3-random-variables");

function allQuestions(lesson: ExplicitLesson): PracticeQuestion[] {
  return [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
  ];
}

function hasVisual(lesson: ExplicitLesson) {
  const items = [...lesson.workedExamples, ...allQuestions(lesson)] as Array<
    Record<string, unknown>
  >;
  return items.some((item) =>
    DIAGRAM_SPECS.some((spec) => Boolean(item[spec.field]))
  );
}

test("MA-S1, MA-S2 and MA-S3 route placements match the 2017 syllabus structure", () => {
  assert.equal(maS1.lessons.length, 6);
  assert.equal(maS2.lessons.length, 6);
  assert.equal(maS3.lessons.length, 4);

  assert.ok(
    maS1.lessons.some(
      (lesson) => lesson.slug === "random-variables-probability-distributions"
    )
  );
  assert.ok(
    maS2.lessons.some(
      (lesson) => lesson.slug === "mixed-statistical-analysis-exam-practice"
    )
  );
  assert.ok(
    maS3.lessons.every(
      (lesson) => lesson.slug !== "random-variables-probability-distributions"
    ),
    "Discrete random variables must not be presented as Year 12 MA-S3 content"
  );
});

test("MA-S3 covers continuous random variables, CDFs and full normal calculations", () => {
  const slugs = new Set(maS3.lessons.map((lesson) => lesson.slug));
  for (const required of [
    "continuous-random-variables-pdfs",
    "cumulative-distribution-functions-percentiles",
    "normal-distribution-empirical-rule",
    "standard-normal-probabilities-quantiles",
  ]) {
    assert.ok(slugs.has(required), "Missing MA-S3 lesson " + required);
  }

  const mappedContent = maS3.lessons
    .flatMap((lesson) => lesson.syllabusContent ?? [])
    .join(" ")
    .toLowerCase();
  for (const concept of [
    "relative frequencies",
    "probability density",
    "definite integration",
    "uniform continuous",
    "cumulative distribution",
    "median",
    "percentiles",
    "standard normal",
    "quantiles",
    "more-extreme",
  ]) {
    assert.match(mappedContent, new RegExp(concept), "Missing mapped concept: " + concept);
  }
});

test("new probability lessons follow the lesson authoring structure", () => {
  const lessons = [
    maS1.lessons.find(
      (lesson) => lesson.slug === "probability-simulation-relative-frequency"
    ),
    ...maS3.lessons.filter((lesson) =>
      [
        "continuous-random-variables-pdfs",
        "cumulative-distribution-functions-percentiles",
        "standard-normal-probabilities-quantiles",
      ].includes(lesson.slug)
    ),
  ];

  for (const lesson of lessons) {
    assert.ok(lesson);
    assert.equal(lesson.guidedPractice.length, 4, lesson.slug + ": guided");
    assert.equal(lesson.independentPractice.length, 5, lesson.slug + ": independent");
    assert.equal(lesson.masteryQuiz.length, 10, lesson.slug + ": mastery");
    assert.ok(
      lesson.workedExamples.length >= 2 && lesson.workedExamples.length <= 3,
      lesson.slug + ": worked examples"
    );
    assert.equal(lesson.commonMistakes.length, 4, lesson.slug + ": common mistakes");
    assert.ok(lesson.teaching.paragraphs.length >= 4, lesson.slug + ": teaching");
    assert.ok(lesson.syllabusReferences?.length, lesson.slug + ": syllabus reference");
    assert.ok(lesson.syllabusOutcomes?.length, lesson.slug + ": syllabus outcomes");
    for (const question of allQuestions(lesson)) {
      assert.ok(question.hint?.trim(), question.id + ": missing hint");
      assert.ok(question.explanation?.trim(), question.id + ": missing explanation");
    }
  }

  for (const lesson of maS3.lessons.filter((candidate) =>
    [
      "continuous-random-variables-pdfs",
      "cumulative-distribution-functions-percentiles",
      "standard-normal-probabilities-quantiles",
    ].includes(candidate.slug)
  )) {
    assert.ok(hasVisual(lesson), lesson.slug + ": missing visual teaching payload");
  }
});

test("MA-S1 is explicitly assumed knowledge and includes both syllabus subtopics", () => {
  assert.ok(
    maS1.lessons.every(
      (lesson) => lesson.coursePlacement === "year-11-assumed-knowledge"
    )
  );
  const references = new Set(
    maS1.lessons.flatMap((lesson) => lesson.syllabusReferences ?? [])
  );
  assert.ok(references.has("MA-S1.1"));
  assert.ok(references.has("MA-S1.2"));

  const discrete = maS1.lessons.find(
    (lesson) => lesson.slug === "random-variables-probability-distributions"
  );
  assert.ok(discrete);
  assert.equal(discrete.masteryQuiz.length, 10);
  const content = discrete.syllabusContent?.join(" ").toLowerCase() ?? "";
  assert.match(content, /discrete and continuous/);
  assert.match(content, /variance and standard deviation/);
  assert.match(content, /sample estimates/);
});

test("normal-model teaching uses population parameters mu and sigma", () => {
  const normalLessons = maS3.lessons.filter((lesson) =>
    lesson.slug.includes("normal")
  );
  const instructionalCore = normalLessons
    .map((lesson) =>
      JSON.stringify({
        successCriteria: lesson.successCriteria,
        teaching: lesson.teaching,
        workedExamples: lesson.workedExamples,
        questions: allQuestions(lesson),
      })
    )
    .join(" ");

  assert.match(instructionalCore, /\\\\mu/);
  assert.match(instructionalCore, /\\\\sigma/);
  assert.doesNotMatch(instructionalCore, /\\\\bar\{x\}/);
});

