import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TriangleDiagramView } from "../../app/course/components/TriangleDiagramView";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { year9TrigRatioVisuals } from "./year9TrigRatioVisuals";

function numberFrom(label: string | undefined): number | null {
  if (label === undefined) return null;
  const value = Number(label);
  return Number.isFinite(value) ? value : null;
}

test("Year 9 trig-ratio diagrams render with theta and labelled given sides", () => {
  const visuals = Object.entries(year9TrigRatioVisuals);
  assert.equal(visuals.length, 25);

  for (const [questionId, visual] of visuals) {
    const diagram = visual.triangleDiagram;
    assert.equal(diagram.rightAngleAt, "B");
    assert.equal(diagram.angleLabels?.A, "θ");
    const labelCount = Object.keys(diagram.sideLabels ?? {}).length;
    assert.ok(labelCount === 2 || labelCount === 3, `${questionId} labels ${labelCount}`);
    assert.ok(diagram.description.length >= 65);
    assert.match(visual.prompt, /find (sin|cos|tan) θ/);

    const markup = renderToStaticMarkup(
      React.createElement(TriangleDiagramView, { diagram })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/, questionId);
  }
});

test("Year 9 trig-ratio metadata calculates to every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, visual] of Object.entries(year9TrigRatioVisuals)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.diagram_data?.type, "triangleDiagram");

    const ratio = visual.prompt.match(/find (sin|cos|tan) θ/)?.[1];
    assert.ok(ratio, `${questionId} prompt does not name a ratio`);

    // Recover all three sides (Pythagoras for the unlabelled one) and check
    // the named ratio reproduces the seeded answer.
    const labels = visual.triangleDiagram.sideLabels;
    let adjacent = numberFrom(labels?.AB);
    let opposite = numberFrom(labels?.BC);
    let hypotenuse = numberFrom(labels?.AC);
    if (opposite === null) {
      opposite = Math.sqrt(hypotenuse! ** 2 - adjacent! ** 2);
    } else if (adjacent === null && hypotenuse !== null) {
      adjacent = Math.sqrt(hypotenuse ** 2 - opposite ** 2);
    } else if (hypotenuse === null) {
      hypotenuse = Math.sqrt(opposite ** 2 + adjacent! ** 2);
    }

    const value =
      ratio === "sin"
        ? opposite! / hypotenuse!
        : ratio === "cos"
          ? adjacent! / hypotenuse!
          : opposite! / adjacent!;

    assert.ok(
      Math.abs(Number(row.answer) - value) <= 0.005,
      `${questionId} answer ${row.answer} drifted from calculated ${ratio} θ = ${value}`
    );
  }
});
