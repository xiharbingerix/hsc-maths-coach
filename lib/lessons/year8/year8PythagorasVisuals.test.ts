import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TriangleDiagramView } from "../../../app/course/components/TriangleDiagramView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { pythagorasQuestionVisuals } from "./pythagorasVisuals";

type HypotenuseCase = {
  kind: "hypotenuse";
  a: number;
  b: number;
  precision: number;
  expectedAnswer?: string;
};

type ShorterSideCase = {
  kind: "shorter";
  hypotenuse: number;
  knownSide: number;
  precision: number;
  expectedAnswer?: string;
};

const cases: Record<string, HypotenuseCase | ShorterSideCase> = {
  "y8-pyth-hyp-g3": { kind: "hypotenuse", a: 8, b: 15, precision: 0 },
  "y8-pyth-hyp-g4": { kind: "hypotenuse", a: 3, b: 7, precision: 1 },
  "y8-pyth-hyp-i1": { kind: "hypotenuse", a: 9, b: 12, precision: 0 },
  "y8-pyth-hyp-i2": { kind: "hypotenuse", a: 5, b: 7, precision: 1 },
  "y8-pyth-hyp-i4": { kind: "hypotenuse", a: 7, b: 24, precision: 0 },
  "y8-pyth-hyp-i5": { kind: "hypotenuse", a: 5, b: 6, precision: 1 },
  "y8-pyth-hyp-m1": { kind: "hypotenuse", a: 3, b: 4, precision: 0 },
  "y8-pyth-hyp-m2": { kind: "hypotenuse", a: 5, b: 12, precision: 0 },
  "y8-pyth-hyp-m4": { kind: "hypotenuse", a: 2, b: 9, precision: 1 },
  "y8-pyth-hyp-m5": { kind: "hypotenuse", a: 20, b: 21, precision: 0 },
  "y8-pyth-hyp-m7": { kind: "hypotenuse", a: 4, b: 9, precision: 1 },
  "y8-pyth-hyp-m10": { kind: "hypotenuse", a: 11, b: 13, precision: 1 },
  "y8-pyth-short-g2": { kind: "shorter", hypotenuse: 17, knownSide: 8, precision: 0 },
  "y8-pyth-short-g4": { kind: "shorter", hypotenuse: 9, knownSide: 4, precision: 1 },
  "y8-pyth-short-i1": { kind: "shorter", hypotenuse: 25, knownSide: 7, precision: 0 },
  "y8-pyth-short-i2": { kind: "shorter", hypotenuse: 12, knownSide: 7, precision: 1 },
  "y8-pyth-short-m1": { kind: "shorter", hypotenuse: 10, knownSide: 6, precision: 0 },
  "y8-pyth-short-m2": { kind: "shorter", hypotenuse: 25, knownSide: 20, precision: 0 },
  "y8-pyth-short-m4": { kind: "shorter", hypotenuse: 14, knownSide: 9, precision: 1 },
  "y8-pyth-short-m7": { kind: "shorter", hypotenuse: 18, knownSide: 11, precision: 2 },
  "y8-pyth-hyp-p1": { kind: "hypotenuse", a: 6, b: 8, precision: 0 },
  "y8-pyth-hyp-p2": { kind: "hypotenuse", a: 8, b: 15, precision: 0 },
  "y8-pyth-hyp-p3": { kind: "hypotenuse", a: 9, b: 12, precision: 0 },
  "y8-pyth-hyp-p4": { kind: "hypotenuse", a: 7, b: 24, precision: 0 },
  "y8-pyth-hyp-p6": { kind: "hypotenuse", a: 20, b: 21, precision: 0 },
  "y8-pyth-hyp-p7": { kind: "hypotenuse", a: 12, b: 16, precision: 0 },
  "y8-pyth-hyp-p8": { kind: "hypotenuse", a: 4, b: 7, precision: 1 },
  "y8-pyth-hyp-p9": { kind: "hypotenuse", a: 5, b: 8, precision: 1 },
  "y8-pyth-hyp-p10": { kind: "hypotenuse", a: 10, b: 24, precision: 0 },
  "y8-pyth-hyp-p12": { kind: "hypotenuse", a: 6, b: 9, precision: 1 },
  "y8-pyth-hyp-p14": { kind: "hypotenuse", a: 7, b: 11, precision: 1 },
  "y8-pyth-hyp-p15": { kind: "hypotenuse", a: 18, b: 24, precision: 0 },
  "y8-pyth-hyp-p19": {
    kind: "hypotenuse",
    a: 4.5,
    b: 6,
    precision: 2,
    expectedAnswer: "7.5",
  },
  "y8-pyth-hyp-p22": { kind: "hypotenuse", a: 13, b: 15, precision: 1 },
  "y8-pyth-hyp-p25": {
    kind: "hypotenuse",
    a: 2.5,
    b: 6,
    precision: 2,
    expectedAnswer: "6.5",
  },
  "y8-pyth-short-p1": { kind: "shorter", hypotenuse: 5, knownSide: 3, precision: 0 },
  "y8-pyth-short-p2": { kind: "shorter", hypotenuse: 13, knownSide: 5, precision: 0 },
  "y8-pyth-short-p3": { kind: "shorter", hypotenuse: 10, knownSide: 8, precision: 0 },
  "y8-pyth-short-p4": { kind: "shorter", hypotenuse: 17, knownSide: 15, precision: 0 },
  "y8-pyth-short-p6": { kind: "shorter", hypotenuse: 25, knownSide: 24, precision: 0 },
  "y8-pyth-short-p7": { kind: "shorter", hypotenuse: 26, knownSide: 10, precision: 0 },
  "y8-pyth-short-p8": { kind: "shorter", hypotenuse: 9, knownSide: 4, precision: 1 },
  "y8-pyth-short-p9": { kind: "shorter", hypotenuse: 12, knownSide: 5, precision: 1 },
  "y8-pyth-short-p14": { kind: "shorter", hypotenuse: 14, knownSide: 6, precision: 1 },
  "y8-pyth-short-p16": { kind: "shorter", hypotenuse: 41, knownSide: 9, precision: 0 },
  "y8-pyth-short-p19": { kind: "shorter", hypotenuse: 18, knownSide: 11, precision: 2 },
  "y8-pyth-short-p24": { kind: "shorter", hypotenuse: 20, knownSide: 13, precision: 1 },
};

function calculatedAnswer(testCase: HypotenuseCase | ShorterSideCase) {
  if (testCase.expectedAnswer) return testCase.expectedAnswer;
  const squared =
    testCase.kind === "hypotenuse"
      ? testCase.a ** 2 + testCase.b ** 2
      : testCase.hypotenuse ** 2 - testCase.knownSide ** 2;
  const value = Math.sqrt(squared);
  return testCase.precision === 0 ? String(value) : value.toFixed(testCase.precision);
}

test("repaired Year 8 Pythagoras questions have complete labelled triangles", () => {
  const visuals = Object.entries(pythagorasQuestionVisuals);
  assert.equal(visuals.length, 47);
  assert.equal(Object.keys(cases).length, 47);

  for (const [questionId, visual] of visuals) {
    const testCase = cases[questionId];
    assert.ok(testCase, `${questionId} needs a mathematical test case`);
    assert.match(visual.prompt, /labelled right triangle/);
    assert.ok(visual.triangleDiagram.description.length >= 75);
    assert.equal(visual.triangleDiagram.rightAngleAt, "C");
    assert.ok(visual.triangleDiagram.sideLabels?.AC);
    assert.ok(visual.triangleDiagram.sideLabels?.BC);
    assert.ok(visual.triangleDiagram.sideLabels?.AB);
    assert.doesNotMatch(
      `${visual.prompt} ${visual.triangleDiagram.description}`,
      /placeholder|sample question|generic diagram/i
    );

    if (testCase.kind === "hypotenuse") {
      assert.equal(visual.triangleDiagram.sideLabels?.AB, "c");
    } else {
      assert.equal(
        Number.parseFloat(visual.triangleDiagram.sideLabels?.AB ?? ""),
        testCase.hypotenuse
      );
      assert.ok(
        [visual.triangleDiagram.sideLabels?.AC, visual.triangleDiagram.sideLabels?.BC].includes("x")
      );
    }

    const markup = renderToStaticMarkup(
      React.createElement(TriangleDiagramView, { diagram: visual.triangleDiagram })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("repaired Year 8 Pythagoras diagrams calculate to the seeded answers", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, testCase] of Object.entries(cases)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, calculatedAnswer(testCase), `${questionId} dimensions do not match its answer`);
    assert.equal(row.diagram_data?.type, "triangleDiagram");
  }
});

test("generic Year 8 side-finding prompts never omit their dimensions", () => {
  const { rows } = collectAllQuestions(["year-8-mathematics"]);
  const genericSideQuestions = rows.filter(
    (row) =>
      row.topic_slug === "pythagoras-theorem" &&
      /^Find the (?:hypotenuse|unknown shorter side) in /i.test(row.prompt)
  );

  assert.ok(genericSideQuestions.length > 0);
  assert.deepEqual(
    genericSideQuestions.filter((row) => !row.diagram_data).map((row) => row.source_id),
    []
  );
});
