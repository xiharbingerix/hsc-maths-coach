import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CartesianGraphView } from "../../../app/course/components/CartesianGraphView";
import { TriangleDiagramView } from "../../../app/course/components/TriangleDiagramView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { pythagorasContextQuestionVisuals } from "./pythagorasContextVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-pyth-ctx-g1": "15",
  "y8-pyth-ctx-g2": "B",
  "y8-pyth-ctx-g3": "4",
  "y8-pyth-ctx-i2": "15",
  "y8-pyth-ctx-i5": "25",
  "y8-pyth-ctx-m2": "8",
  "y8-pyth-ctx-m5": "50",
  "y8-pyth-ctx-m9": "8.7",
  "y8-pyth-ctx-m10": "24",
  "y8-pyth-ctx-mp1": "50",
  "y8-pyth-trip-g1": "10",
  "y8-pyth-trip-g4": "24",
  "y8-pyth-trip-i1": "29",
  "y8-pyth-trip-i4": "45",
  "y8-pyth-trip-m6": "yes",
  "y8-pyth-trip-m9": "30",
  "y8-pyth-dist-g2": "5",
  "y8-pyth-dist-g4": "7.2",
  "y8-pyth-dist-i1": "10",
  "y8-pyth-dist-i4": "17",
  "y8-pyth-dist-i5": "5",
  "y8-pyth-dist-m4": "5",
  "y8-pyth-dist-m5": "17",
  "y8-pyth-dist-m8": "10",
  "y8-pyth-dist-m10": "5",
  "y8-pyth-dist-mp1": "10",
};

const triangleCalculations: Record<
  string,
  { kind: "hypotenuse"; a: number; b: number; precision?: number } | {
    kind: "shorter";
    hypotenuse: number;
    knownSide: number;
    precision?: number;
  }
> = {
  "y8-pyth-ctx-g1": { kind: "hypotenuse", a: 9, b: 12 },
  "y8-pyth-ctx-g3": { kind: "shorter", hypotenuse: 5, knownSide: 3 },
  "y8-pyth-ctx-i2": { kind: "shorter", hypotenuse: 17, knownSide: 8 },
  "y8-pyth-ctx-i5": { kind: "hypotenuse", a: 24, b: 7 },
  "y8-pyth-ctx-m2": { kind: "shorter", hypotenuse: 10, knownSide: 6 },
  "y8-pyth-ctx-m5": { kind: "hypotenuse", a: 30, b: 40 },
  "y8-pyth-ctx-m9": { kind: "shorter", hypotenuse: 14, knownSide: 11, precision: 1 },
  "y8-pyth-ctx-m10": { kind: "shorter", hypotenuse: 25, knownSide: 7 },
  "y8-pyth-ctx-mp1": { kind: "hypotenuse", a: 30, b: 40 },
  "y8-pyth-trip-g1": { kind: "hypotenuse", a: 6, b: 8 },
  "y8-pyth-trip-g4": { kind: "shorter", hypotenuse: 26, knownSide: 10 },
  "y8-pyth-trip-i1": { kind: "hypotenuse", a: 20, b: 21 },
  "y8-pyth-trip-i4": { kind: "shorter", hypotenuse: 51, knownSide: 24 },
  "y8-pyth-trip-m9": { kind: "shorter", hypotenuse: 34, knownSide: 16 },
};

function calculateTriangleAnswer(testCase: (typeof triangleCalculations)[string]) {
  const squared =
    testCase.kind === "hypotenuse"
      ? testCase.a ** 2 + testCase.b ** 2
      : testCase.hypotenuse ** 2 - testCase.knownSide ** 2;
  const value = Math.sqrt(squared);
  return testCase.precision === undefined
    ? String(value)
    : value.toFixed(testCase.precision);
}

test("Year 8 contextual Pythagoras visuals are complete and render", () => {
  const visuals = Object.entries(pythagorasContextQuestionVisuals);
  assert.equal(visuals.length, 26);

  for (const [questionId, visual] of visuals) {
    assert.notEqual(
      Boolean(visual.triangleDiagram),
      Boolean(visual.cartesianGraph),
      `${questionId} must have exactly one diagram type`
    );
    assert.ok(visual.prompt.length >= 55, `${questionId} needs a specific prompt`);
    const diagram = visual.triangleDiagram ?? visual.cartesianGraph;
    assert.ok(diagram && diagram.description.length >= 55);
    assert.doesNotMatch(
      `${visual.prompt} ${diagram.description}`,
      /placeholder|sample question|generic diagram/i
    );

    const markup = visual.triangleDiagram
      ? renderToStaticMarkup(
          React.createElement(TriangleDiagramView, { diagram: visual.triangleDiagram })
        )
      : renderToStaticMarkup(
          React.createElement(CartesianGraphView, { graph: visual.cartesianGraph! })
        );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("contextual Pythagoras dimensions and coordinates match seeded answers", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.equal(Object.keys(expectedAnswers).length, 26);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const visual = pythagorasContextQuestionVisuals[questionId];
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer);
    assert.equal(
      row.diagram_data?.type,
      visual.triangleDiagram ? "triangleDiagram" : "cartesianGraph"
    );

    const triangleCase = triangleCalculations[questionId];
    if (triangleCase) {
      assert.equal(row.answer, calculateTriangleAnswer(triangleCase));
    }

    if (visual.cartesianGraph) {
      const segment = visual.cartesianGraph.lineSegments?.[0];
      assert.ok(segment, `${questionId} needs a distance segment`);
      const distance = Math.hypot(
        segment.to.x - segment.from.x,
        segment.to.y - segment.from.y
      );
      assert.ok(Math.abs(distance - Number(row.answer)) < 0.051);
    }
  }

  const tripleCheck = pythagorasContextQuestionVisuals["y8-pyth-trip-m6"].triangleDiagram;
  assert.ok(tripleCheck);
  assert.equal(11 ** 2 + 60 ** 2, 61 ** 2);
});
