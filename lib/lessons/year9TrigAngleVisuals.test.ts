import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TriangleDiagramView } from "../../app/course/components/TriangleDiagramView";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { year9TrigAngleVisuals } from "./year9TrigAngleVisuals";

function numberFrom(label: string | undefined): number | null {
  if (label === undefined) return null;
  const value = Number(label);
  return Number.isFinite(value) ? value : null;
}

test("Year 9 unknown-angle diagrams render exact labelled side pairs", () => {
  const visuals = Object.entries(year9TrigAngleVisuals);
  assert.equal(visuals.length, 26);

  for (const [questionId, visual] of visuals) {
    const diagram = visual.triangleDiagram;
    assert.equal(diagram.rightAngleAt, "B");
    assert.equal(diagram.angleLabels?.A, "θ");
    assert.equal(Object.keys(diagram.sideLabels ?? {}).length, 2);
    assert.ok(diagram.description.length >= 65);

    const markup = renderToStaticMarkup(
      React.createElement(TriangleDiagramView, { diagram })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
    assert.doesNotMatch(markup, /placeholder/i, questionId);
  }
});

test("Year 9 unknown-angle metadata calculates to every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, visual] of Object.entries(year9TrigAngleVisuals)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.diagram_data?.type, "triangleDiagram");

    const labels = visual.triangleDiagram.sideLabels;
    const adjacent = numberFrom(labels?.AB);
    const opposite = numberFrom(labels?.BC);
    const hypotenuse = numberFrom(labels?.AC);
    const radians = opposite !== null && adjacent !== null
      ? Math.atan(opposite / adjacent)
      : opposite !== null
        ? Math.asin(opposite / hypotenuse!)
        : Math.acos(adjacent! / hypotenuse!);
    const degrees = (radians * 180) / Math.PI;

    assert.ok(
      Math.abs(Number(row.answer) - degrees) <= 0.051,
      `${questionId} answer ${row.answer} drifted from calculated angle ${degrees}`
    );
  }
});
