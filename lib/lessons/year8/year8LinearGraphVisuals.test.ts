import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CartesianGraphView } from "../../../app/course/components/CartesianGraphView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { linearGraphQuestionVisuals } from "./linearGraphVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-lin-coo-mp1": "8",
  "y8-lin-grd-i5": "2",
  "y8-lin-grd-m3": "3",
  "y8-lin-grd-m4": "-1",
  "y8-lin-grd-m7": "2",
  "y8-lin-grd-m10": "-2",
  "y8-lin-grd-mp1": "-20",
  "y8-lin-gra-mp1": "-6",
  "y8-lin-int-g1": "C",
  "y8-lin-int-i3": "A",
  "y8-lin-int-m2": "A",
  "y8-lin-int-mp1": "20",
};

const expectedSegmentGradients: Record<string, number> = {
  "y8-lin-grd-i5": 2,
  "y8-lin-grd-m3": 3,
  "y8-lin-grd-m4": -1,
  "y8-lin-grd-m7": 2,
  "y8-lin-grd-m10": -2,
  "y8-lin-int-i3": 3,
  "y8-lin-int-m2": 4,
};

const expectedLines: Record<string, { m: number; b: number }> = {
  "y8-lin-grd-mp1": { m: -20, b: 200 },
  "y8-lin-gra-mp1": { m: 2, b: -6 },
  "y8-lin-int-g1": { m: 0, b: 40 },
  "y8-lin-int-mp1": { m: 9, b: 20 },
};

test("Year 8 linear visuals contain valid plotted geometry and render", () => {
  const visuals = Object.entries(linearGraphQuestionVisuals);
  assert.equal(visuals.length, 12);

  for (const [questionId, visual] of visuals) {
    const graph = visual.cartesianGraph;
    assert.ok(visual.prompt.length >= 45, `${questionId} needs a specific prompt`);
    assert.ok(graph.description.length >= 60, `${questionId} needs an accessible description`);
    assert.ok(Number.isFinite(graph.xMin) && Number.isFinite(graph.xMax));
    assert.ok(Number.isFinite(graph.yMin) && Number.isFinite(graph.yMax));
    assert.ok(graph.xMin! < graph.xMax! && graph.yMin! < graph.yMax!);
    assert.doesNotMatch(
      `${visual.prompt} ${graph.description}`,
      /placeholder|sample question|generic diagram/i
    );

    for (const point of graph.points ?? []) {
      assert.ok(point.x >= graph.xMin! && point.x <= graph.xMax!);
      assert.ok(point.y >= graph.yMin! && point.y <= graph.yMax!);
    }

    const expectedGradient = expectedSegmentGradients[questionId];
    if (expectedGradient !== undefined) {
      const segment = graph.lineSegments?.[0];
      assert.ok(segment, `${questionId} needs a line segment`);
      const gradient =
        (segment.to.y - segment.from.y) / (segment.to.x - segment.from.x);
      assert.equal(gradient, expectedGradient);
    }

    const expectedLine = expectedLines[questionId];
    if (expectedLine) {
      assert.deepEqual(
        graph.lines?.map(({ m, b }) => ({ m, b })),
        [expectedLine]
      );
    }

    const markup = renderToStaticMarkup(
      React.createElement(CartesianGraphView, { graph })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("Year 8 linear visuals retain matching answers through seeding", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.equal(Object.keys(expectedAnswers).length, 12);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer);
    assert.equal(row.diagram_data?.type, "cartesianGraph");

    const expectedGradient = expectedSegmentGradients[questionId];
    if (expectedGradient !== undefined && /^[A-D]$/.test(row.answer)) {
      const selectedChoice = row.choices?.find((choice) => choice.label === row.answer);
      assert.equal(Number(selectedChoice?.text), expectedGradient);
    }
  }
});
