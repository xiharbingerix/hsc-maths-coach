import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TrapezoidalRuleView } from "../../app/course/components/TrapezoidalRuleView";
import { furtherIntegralCalculusLessons } from "./furtherIntegralCalculus";
import { trapezoidalRuleAreaApproximationLesson } from "./integralCalculus";
import type { PracticeQuestion } from "./differentialCalculus";
import { collectAllQuestions } from "../../scripts/seed-question-bank";

function allPracticeQuestions(): PracticeQuestion[] {
  return [
    ...trapezoidalRuleAreaApproximationLesson.guidedPractice,
    ...trapezoidalRuleAreaApproximationLesson.independentPractice,
    ...trapezoidalRuleAreaApproximationLesson.masteryQuiz,
  ];
}

test("the canonical trapezoidal-rule lesson has one intentional 4+5+10 progression", () => {
  const lesson = trapezoidalRuleAreaApproximationLesson;
  assert.equal(lesson.guidedPractice.length, 4);
  assert.equal(lesson.independentPractice.length, 5);
  assert.equal(lesson.masteryQuiz.length, 10);

  const questions = allPracticeQuestions();
  assert.equal(new Set(questions.map((question) => question.id)).size, 19);
  assert.doesNotMatch(
    questions.map((question) => question.prompt).join("\n"),
    /which y-values (?:should be|are) doubled/i
  );
  assert.doesNotMatch(
    questions.map((question) => question.latex).join("\n"),
    /\\begin\{array\}/
  );

  for (const question of questions) {
    if (question.choices) {
      assert.equal(question.choices.length, 4, `${question.id} must have four choices`);
    }
  }
});

test("visual trapezoidal questions carry valid, renderable payloads", () => {
  const visualQuestions = allPracticeQuestions();
  assert.equal(visualQuestions.length, 19);

  for (const question of visualQuestions) {
    assert.ok(
      question.trapezoidalRuleDiagram,
      `${question.id} must use a trapezoidal-rule diagram`
    );
    const markup = renderToStaticMarkup(
      React.createElement(TrapezoidalRuleView, {
        diagram: question.trapezoidalRuleDiagram,
      })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }

  const concavityQuestion = visualQuestions.find(
    (question) => question.id === "trap-mastery-6"
  );
  assert.ok(concavityQuestion?.trapezoidalRuleDiagram?.curvePoints?.length);
  const concavityMarkup = renderToStaticMarkup(
    React.createElement(TrapezoidalRuleView, {
      diagram: concavityQuestion.trapezoidalRuleDiagram,
    })
  );
  assert.match(concavityMarkup, /stroke="#e11d48"/);
});

test("the duplicate further-integral-calculus trapezoidal lesson is retired", () => {
  assert.equal(
    furtherIntegralCalculusLessons.some((lesson) => lesson.slug === "trapezoidal-rule"),
    false
  );
});

test("canonical diagrams survive question-bank serialization and retired rows disappear", () => {
  const { rows } = collectAllQuestions(["year-12-advanced"]);
  const trapezoidalRows = rows.filter((row) => row.source_id.includes("/trap-"));
  assert.equal(trapezoidalRows.length, 19);

  for (const row of trapezoidalRows) {
    assert.equal(row.diagram_data?.type, "trapezoidalRuleDiagram", row.source_id);
  }

  assert.equal(
    rows.some((row) => row.source_id.includes("/fint-trap-")),
    false
  );
});
