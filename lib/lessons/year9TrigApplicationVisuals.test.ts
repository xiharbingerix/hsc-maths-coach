import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TriangleDiagramView } from "../../app/course/components/TriangleDiagramView";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { year9TrigApplicationVisuals } from "./year9TrigApplicationVisuals";

function numberFrom(label: string | undefined): number | null {
  if (!label || label.startsWith("x")) return null;
  const value = Number.parseFloat(label);
  return Number.isFinite(value) ? value : null;
}

test("Year 9 applied-trigonometry diagrams render specific labelled contexts", () => {
  const visuals = Object.entries(year9TrigApplicationVisuals);
  assert.equal(visuals.length, 25);

  for (const [questionId, visual] of visuals) {
    const diagram = visual.triangleDiagram;
    assert.equal(diagram.rightAngleAt, "B");
    assert.equal(Object.keys(diagram.sideLabels ?? {}).length, 2);
    assert.ok(diagram.description.length >= 100);
    assert.doesNotMatch(diagram.description, /generic|placeholder|sample/i);

    const markup = renderToStaticMarkup(
      React.createElement(TriangleDiagramView, { diagram })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/, questionId);
  }
});

test("Year 9 applied-trigonometry metadata calculates to every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, visual] of Object.entries(year9TrigApplicationVisuals)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.diagram_data?.type, "triangleDiagram");

    const diagram = visual.triangleDiagram;
    const adjacent = numberFrom(diagram.sideLabels?.AB);
    const opposite = numberFrom(diagram.sideLabels?.BC);
    const hypotenuse = numberFrom(diagram.sideLabels?.AC);
    const unknownAngle = diagram.angleLabels?.A === "θ";
    let calculated: number;

    if (unknownAngle) {
      const radians = opposite !== null && adjacent !== null
        ? Math.atan(opposite / adjacent)
        : opposite !== null
          ? Math.asin(opposite / hypotenuse!)
          : Math.acos(adjacent! / hypotenuse!);
      calculated = (radians * 180) / Math.PI;
    } else {
      const angle = Number.parseFloat(diagram.angleLabels!.A!);
      const radians = (angle * Math.PI) / 180;
      const unknownSide = diagram.highlightedSides![0];
      calculated = unknownSide === "AB"
        ? opposite! / Math.tan(radians)
        : unknownSide === "BC"
          ? hypotenuse !== null
            ? hypotenuse * Math.sin(radians)
            : adjacent! * Math.tan(radians)
          : opposite! / Math.sin(radians);
    }

    assert.ok(
      Math.abs(Number(row.answer) - calculated) <= 0.051,
      `${questionId} answer ${row.answer} drifted from calculated value ${calculated}`
    );
  }
});
