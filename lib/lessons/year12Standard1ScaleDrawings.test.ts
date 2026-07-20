import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../app/components/diagramRegistry";
import { getNewCourseUnitLessons } from "../newCourseCatalog";
import { extractDiagramData, pickDiagramFields } from "./diagramRegistry";

const unitLessons = getNewCourseUnitLessons(
  "year-12-standard-1",
  "scale-drawing"
);
const lesson = unitLessons.find(
  (item) => item.slug === "scale-drawings-and-plans"
);

assert.ok(lesson, "Expected the Year 12 Standard 1 scale-drawings lesson");

const questions = [
  ...lesson.guidedPractice,
  ...lesson.independentPractice,
  ...lesson.masteryQuiz,
];

test("scale-drawing stimuli use diagrams except for conceptual ratio questions", () => {
  const textOnlyIds = new Set([
    "y12s1-scale-g3",
    "y12s1-scale-i2",
    "y12s1-scale-m10",
  ]);

  assert.equal(questions.length, 19);
  for (const question of questions) {
    const payload = extractDiagramData(question);
    if (textOnlyIds.has(question.id)) {
      assert.equal(payload, null, `${question.id} should remain a conceptual text item`);
      continue;
    }

    assert.ok(payload, `${question.id} should provide its scale measurement visually`);
    assert.equal(question.latex, "", `${question.id} should not duplicate its stimulus`);
  }
});

test("scale-drawing diagrams serialize and render as accessible finite SVG", () => {
  const payloads = [
    ...lesson.workedExamples.map(extractDiagramData),
    ...questions.map(extractDiagramData),
  ].filter((payload): payload is Record<string, unknown> => payload !== null);

  assert.equal(payloads.length, 18);
  for (const payload of payloads) {
    const rendered = renderDiagramData(payload);
    assert.ok(rendered, `No renderer for ${String(payload.type)}`);
    const markup = renderToStaticMarkup(
      React.createElement(React.Fragment, null, rendered)
    );
    assert.match(markup, /role="img"|role="group"/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("worked examples use matching route and wall diagrams", () => {
  assert.equal(lesson.workedExamples[0].lineAngleDiagram?.segments[0].label, "3 cm");
  assert.equal(
    lesson.workedExamples[1].lineAngleDiagram?.segments[0].label,
    "12 m (actual)"
  );
  assert.equal(lesson.workedExamples[0].planeShapeDiagram, undefined);
});

test("the whole scale-drawing unit follows its intentional visual coverage contract", () => {
  const expectedQuestionVisuals: Record<string, number> = {
    "scale-ratios": 0,
    "scale-dividing-ratio": 0,
    "similarity-scale-factors": 13,
    "scale-drawings-and-plans": 16,
    "plans-and-elevations": 13,
  };
  const expectedWorkedVisuals: Record<string, number> = {
    "scale-ratios": 0,
    "scale-dividing-ratio": 0,
    "similarity-scale-factors": 2,
    "scale-drawings-and-plans": 2,
    "plans-and-elevations": 2,
  };

  assert.equal(unitLessons.length, 5);
  for (const unitLesson of unitLessons) {
    const lessonQuestions = [
      ...unitLesson.guidedPractice,
      ...unitLesson.independentPractice,
      ...unitLesson.masteryQuiz,
      ...(unitLesson.masteryQuizPool ?? []),
    ];
    const questionVisuals = lessonQuestions.filter((question) =>
      extractDiagramData(question)
    );
    const workedVisuals = unitLesson.workedExamples.filter((example) =>
      extractDiagramData(example)
    );

    assert.equal(
      questionVisuals.length,
      expectedQuestionVisuals[unitLesson.slug],
      `${unitLesson.slug} question coverage changed`
    );
    assert.equal(
      workedVisuals.length,
      expectedWorkedVisuals[unitLesson.slug],
      `${unitLesson.slug} worked-example coverage changed`
    );
  }
});

test("every scale-unit visual has one serializable accessible renderer payload", () => {
  const visualItems = unitLessons.flatMap((unitLesson) => [
    ...unitLesson.workedExamples,
    ...unitLesson.guidedPractice,
    ...unitLesson.independentPractice,
    ...unitLesson.masteryQuiz,
    ...(unitLesson.masteryQuizPool ?? []),
  ]).filter((item) => extractDiagramData(item));

  assert.equal(visualItems.length, 48);
  for (const item of visualItems) {
    assert.equal(
      Object.keys(pickDiagramFields(item)).length,
      1,
      "Each item should carry exactly one visual payload"
    );
    const payload = extractDiagramData(item);
    assert.ok(payload);
    const rendered = renderDiagramData(payload);
    assert.ok(rendered, `No renderer for ${String(payload.type)}`);
    const markup = renderToStaticMarkup(
      React.createElement(React.Fragment, null, rendered)
    );
    assert.match(markup, /role="img"|role="group"/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("paired similarity diagrams preserve the assessed values without giving away x", () => {
  const similarityLesson = unitLessons.find(
    (item) => item.slug === "similarity-scale-factors"
  );
  assert.ok(similarityLesson);

  const visualQuestions = [
    ...similarityLesson.guidedPractice,
    ...similarityLesson.independentPractice,
    ...similarityLesson.masteryQuiz,
  ].filter((question) => question.trianglePairDiagram);

  assert.equal(visualQuestions.length, 13);
  for (const question of visualQuestions) {
    assert.equal(question.latex, "");
    assert.ok(question.trianglePairDiagram?.relationLabel);
    if (/\bfind x\b|side x\b/i.test(question.prompt)) {
      assert.equal(
        question.trianglePairDiagram?.right.sideLabels?.AB,
        "x",
        `${question.id} should keep the assessed image length unknown`
      );
    }
  }
});
