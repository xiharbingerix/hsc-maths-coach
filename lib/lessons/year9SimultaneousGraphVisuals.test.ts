import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CartesianGraphView } from "../../app/course/components/CartesianGraphView";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { year9SimultaneousGraphVisuals } from "./year9SimultaneousGraphVisuals";

const yCoordinateIds = new Set(["y9-gs-p4", "y9-gs-p10", "y9c-gs-4", "y9c-gs-10"]);
const noSolutionIds = new Set(["y9-gs-p6", "y9c-gs-6"]);

test("Year 9 simultaneous-equation graphs render two complete lines", () => {
  const visuals = Object.entries(year9SimultaneousGraphVisuals);
  assert.equal(visuals.length, 22);

  for (const [questionId, visual] of visuals) {
    const { cartesianGraph: graph } = visual;
    assert.equal(graph.lines?.length, 2, `${questionId} needs exactly two lines`);
    assert.ok(graph.lines?.every((item) => item.label));
    assert.ok(graph.description.length >= 75);
    assert.equal(graph.showGrid, true);

    const markup = renderToStaticMarkup(
      React.createElement(CartesianGraphView, { graph })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
    assert.doesNotMatch(markup, /placeholder/i);
  }
});

test("Year 9 simultaneous graph intersections match every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, visual] of Object.entries(year9SimultaneousGraphVisuals)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.diagram_data?.type, "cartesianGraph");

    const [first, second] = visual.cartesianGraph.lines!;
    if (noSolutionIds.has(questionId)) {
      assert.equal(first.m, second.m);
      assert.notEqual(first.b, second.b);
      assert.equal(Number(row.answer), 0);
      continue;
    }

    const x = (second.b - first.b) / (first.m - second.m);
    const y = first.m * x + first.b;
    const calculated = yCoordinateIds.has(questionId) ? y : x;
    assert.equal(Number(row.answer), calculated, `${questionId} answer drifted from its graph`);
  }
});
