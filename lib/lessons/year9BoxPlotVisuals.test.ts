import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BoxPlotView } from "../../app/course/components/BoxPlotView";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { year9BoxPlotVisuals } from "./year9BoxPlotVisuals";

const rangeQuestionIds = new Set([
  "y9-bp-i2",
  "y9-bp-m6",
  "y9-bp-p2",
  "y9-bp-p4",
  "y9c-bp-2",
  "y9c-bp-4",
]);

test("Year 9 box-plot visuals are complete and render as SVG", () => {
  const visuals = Object.entries(year9BoxPlotVisuals);
  assert.equal(visuals.length, 16);

  for (const [questionId, visual] of visuals) {
    const { boxPlotDiagram: diagram } = visual;
    assert.match(visual.prompt, /box plot shown/i);
    assert.ok(diagram.description.length >= 70);
    assert.equal(diagram.plots.length, 1);
    assert.equal(diagram.showValueLabels, true);

    const plot = diagram.plots[0];
    const values = [plot.min, plot.q1, plot.median, plot.q3, plot.max];
    assert.ok(values.every((value) => Number.isFinite(value)));
    assert.deepEqual(values, [...values].sort((a, b) => a! - b!));

    const markup = renderToStaticMarkup(React.createElement(BoxPlotView, { diagram }));
    assert.match(markup, /<svg/);
    assert.match(markup, /<desc/);
    assert.doesNotMatch(markup, /NaN|undefined/, questionId);
    assert.doesNotMatch(markup, /placeholder/i, questionId);
  }
});

test("Year 9 box-plot metadata independently calculates to each seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, visual] of Object.entries(year9BoxPlotVisuals)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.diagram_data?.type, "boxPlotDiagram");

    const plot = visual.boxPlotDiagram.plots[0];
    const calculated = rangeQuestionIds.has(questionId)
      ? plot.max! - plot.min!
      : plot.q3 - plot.q1;
    assert.equal(Number(row.answer), calculated, `${questionId} answer drifted from its plot`);
  }
});
