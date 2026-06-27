import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CompositeSolidView } from "../../../app/course/components/CompositeSolidView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import type { RectangularPrismDimensions } from "../types";
import { advancedCompositeSolidVisuals } from "./advancedCompositeSolidVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-vsa-cv-i2": "450",
  "y8-vsa-cv-p9": "168",
  "y8-vsa-cv-p16": "6.4",
  "y8-vsa-cv-p21": "384",
  "y8-vsa-cs-p17": "312",
  "y8-vsa-cs-p22": "554",
  "y8-vsa-cs-p15": "92π",
  "y8-vsa-cs-p23": "222π",
};

function prismVolume(prism: RectangularPrismDimensions): number {
  return prism.length * prism.width * prism.height;
}

function prismSurfaceArea(prism: RectangularPrismDimensions): number {
  return 2 * (
    prism.length * prism.width +
    prism.length * prism.height +
    prism.width * prism.height
  );
}

test("advanced Year 8 composite-solid variants render complete labelled geometry", () => {
  const visuals = Object.entries(advancedCompositeSolidVisuals);
  assert.equal(visuals.length, 8);

  for (const [questionId, visual] of visuals) {
    assert.ok(visual.prompt.length >= 70, `${questionId} needs a specific visual prompt`);
    assert.ok(visual.compositeSolidDiagram.description.length >= 100);
    const markup = renderToStaticMarkup(
      React.createElement(CompositeSolidView, {
        diagram: visual.compositeSolidDiagram,
      })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("advanced composite dimensions calculate to every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));
  assert.equal(warnings.length, 0);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const row = rowsById.get(questionId);
    const diagram = advancedCompositeSolidVisuals[questionId].compositeSolidDiagram;
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer);
    assert.equal(row.diagram_data?.type, "compositeSolidDiagram");

    if (diagram.kind === "lShapedPrism") {
      assert.equal(
        Number(row.answer),
        prismVolume(diagram.sections[0]) + prismVolume(diagram.sections[1])
      );
    } else if (diagram.kind === "threeStepRectangularPrisms") {
      const fullTotal = diagram.levels.reduce(
        (total, prism) =>
          total +
          (questionId.includes("-cv-") ? prismVolume(prism) : prismSurfaceArea(prism)),
        0
      );
      const jointDeduction = diagram.jointAreas
        ? 2 * (diagram.jointAreas[0] + diagram.jointAreas[1])
        : 0;
      assert.equal(Number(row.answer), fullTotal - jointDeduction);
    } else if (diagram.kind === "stackedCylinders") {
      const coefficient =
        2 * diagram.lower.radius ** 2 +
        2 * diagram.lower.radius * diagram.lower.height +
        2 * diagram.upper.radius ** 2 +
        2 * diagram.upper.radius * diagram.upper.height -
        2 * diagram.upper.radius ** 2;
      assert.equal(row.answer, `${coefficient}π`);
    } else {
      assert.fail(`${questionId} uses an unexpected advanced variant`);
    }
  }
});
