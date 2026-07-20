import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../../app/components/diagramRegistry";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import { getChallengeQuestions } from "../../challenges";
import { DIAGRAM_SPECS, extractDiagramData } from "../diagramRegistry";
import type { PracticeQuestion } from "../differentialCalculus";

const lessons = getNewCourseUnitLessons(
  "year-7-mathematics",
  "algebraic-techniques"
);

function hasVisual(question: PracticeQuestion) {
  const fields = question as unknown as Record<string, unknown>;
  return DIAGRAM_SPECS.some((spec) => Boolean(fields[spec.field]));
}

test("Year 7 Algebraic Techniques keeps a standards-compliant lesson spine", () => {
  assert.equal(lessons.length, 5);
  for (const lesson of lessons) {
    assert.equal(lesson.guidedPractice.length, 4, lesson.slug);
    assert.equal(lesson.independentPractice.length, 5, lesson.slug);
    assert.equal(lesson.masteryQuiz.length, 10, lesson.slug);
    assert.equal(lesson.masteryQuizPool?.length ?? 0, 0, lesson.slug);
    assert.equal(lesson.multiPartPractice?.length ?? 0, 1, lesson.slug);

    assert.deepEqual(
      lesson.masteryQuiz.map((question) => question.difficulty),
      [3, 3, 3, 3, 4, 4, 4, 5, 5, 5],
      lesson.slug
    );
  }
});

test("live Year 7 algebra questions have specific feedback and markable multipart data", () => {
  for (const lesson of lessons) {
    const questions = [
      ...lesson.guidedPractice,
      ...lesson.independentPractice,
      ...lesson.masteryQuiz,
      ...(lesson.multiPartPractice ?? []),
    ];

    for (const question of questions) {
      assert.ok((question.hint?.trim().length ?? 0) >= 40, `${question.id} hint`);
      assert.ok((question.explanation?.trim().length ?? 0) >= 40, `${question.id} explanation`);
      assert.doesNotMatch(
        question.hint ?? "",
        /Re-read the teaching section|Consider the key rule taught/i,
        `${question.id} generic hint`
      );

      if (question.choices) {
        assert.deepEqual(question.choices.map((choice) => choice.label), ["A", "B", "C", "D"]);
        assert.ok(question.choices.some((choice) => choice.label === question.answer));
      }

      if (question.parts?.length) {
        assert.equal(question.answer, question.parts[0].answer, `${question.id} top-level answer`);
        for (const part of question.parts) {
          assert.ok((part.hint?.trim().length ?? 0) >= 30, `${question.id}${part.label} hint`);
          assert.ok(part.explanation.trim().length >= 40, `${question.id}${part.label} explanation`);
        }
      }
    }
  }
});

test("geometric stimuli have payloads and rejected fake-D6 pools are not live", () => {
  const geometric = /\b(rectang\w*|triang\w*|square\w*|prism|box)\b/i;
  for (const lesson of lessons) {
    const questions = [
      ...lesson.guidedPractice,
      ...lesson.independentPractice,
      ...lesson.masteryQuiz,
      ...(lesson.multiPartPractice ?? []),
    ];
    for (const question of questions.filter(
      (item) => geometric.test(item.prompt) && !/\bsquare of\b|\bsquared\b/i.test(item.prompt)
    )) {
      assert.ok(hasVisual(question), `${question.id} visual payload`);
    }
    assert.equal(
      getChallengeQuestions("year-7-mathematics", lesson.slug).length,
      0,
      lesson.slug
    );
  }
});

test("all Year 7 algebra diagrams serialize and render as accessible finite SVG", () => {
  const questions = lessons.flatMap((lesson) => [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
    ...(lesson.multiPartPractice ?? []),
  ]);
  const payloads = questions
    .map(extractDiagramData)
    .filter((payload): payload is NonNullable<typeof payload> => payload !== null);
  assert.equal(payloads.length, 10);

  for (const payload of payloads) {
    const rendered = renderDiagramData(payload);
    assert.ok(rendered, `renderer for ${payload.type}`);
    const markup = renderToStaticMarkup(
      React.createElement(React.Fragment, null, rendered)
    );
    assert.match(markup, /role="img"|role="group"/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});
