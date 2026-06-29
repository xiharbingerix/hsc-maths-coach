import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TriangleDiagramView } from "../../app/course/components/TriangleDiagramView";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { year9TrigSideVisuals } from "./year9TrigSideVisuals";

function numericLabel(label: string | undefined): number | null {
  if (!label || label.startsWith("x")) return null;
  const value = Number.parseFloat(label);
  return Number.isFinite(value) ? value : null;
}

test("Year 9 trigonometry side diagrams render consistent right triangles", () => {
  const visuals = Object.entries(year9TrigSideVisuals);
  assert.equal(visuals.length, 22);

  for (const [questionId, visual] of visuals) {
    const diagram = visual.triangleDiagram;
    assert.equal(diagram.rightAngleAt, "B");
    assert.ok(diagram.angleLabels?.A?.endsWith("°"));
    assert.equal(diagram.highlightedSides?.length, 1);
    assert.ok(diagram.description.length >= 80);

    const markup = renderToStaticMarkup(
      React.createElement(TriangleDiagramView, { diagram })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
    assert.doesNotMatch(markup, /placeholder/i, questionId);
  }
});

test("Year 9 trigonometry side metadata calculates to every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, visual] of Object.entries(year9TrigSideVisuals)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.diagram_data?.type, "triangleDiagram");

    const diagram = visual.triangleDiagram;
    const theta = Number.parseFloat(diagram.angleLabels!.A!);
    const radians = (theta * Math.PI) / 180;
    const adjacent = numericLabel(diagram.sideLabels?.AB);
    const hypotenuse = numericLabel(diagram.sideLabels?.AC);
    const unknownSide = diagram.highlightedSides![0];
    const calculated = unknownSide === "AB"
      ? hypotenuse! * Math.cos(radians)
      : hypotenuse !== null
        ? hypotenuse * Math.sin(radians)
        : adjacent! * Math.tan(radians);

    assert.ok(
      Math.abs(Number(row.answer) - calculated) <= 0.051,
      `${questionId} answer ${row.answer} drifted from calculated value ${calculated}`
    );
  }
});
