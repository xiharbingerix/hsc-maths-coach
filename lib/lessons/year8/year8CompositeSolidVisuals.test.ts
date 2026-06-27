import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../../app/components/diagramRegistry";
import { CompositeSolidView } from "../../../app/course/components/CompositeSolidView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { extractDiagramData, pickDiagramFields } from "../diagramRegistry";
import type { RectangularPrismDimensions } from "../types";
import { compositeSolidQuestionVisuals } from "./compositeSolidVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-vsa-cv-g2": "152",
  "y8-vsa-cv-g3": "168",
  "y8-vsa-cv-g4": "160",
  "y8-vsa-cv-i4": "360",
  "y8-vsa-cv-m3": "B",
  "y8-vsa-cv-m7": "444",
  "y8-vsa-cv-m9": "320π",
  "y8-vsa-cv-mp1": "504",
  "y8-vsa-cs-g2": "308",
  "y8-vsa-cs-g4": "218",
  "y8-vsa-cs-i4": "430",
  "y8-vsa-cs-mp1": "400",
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

test("Year 8 composite-solid payloads are complete and render", () => {
  const visuals = Object.entries(compositeSolidQuestionVisuals);
  const kindCounts = new Map<string, number>();
  assert.equal(visuals.length, 12);

  for (const [questionId, visual] of visuals) {
    const diagram = visual.compositeSolidDiagram;
    kindCounts.set(diagram.kind, (kindCounts.get(diagram.kind) ?? 0) + 1);
    assert.ok(visual.prompt.length >= 60, `${questionId} needs a specific visual prompt`);
    assert.ok(
      diagram.description.length >= 80,
      `${questionId} needs a substantive accessible description`
    );
    assert.doesNotMatch(
      `${visual.prompt} ${diagram.description}`,
      /placeholder|sample question|generic diagram/i
    );

    const markup = renderToStaticMarkup(
      React.createElement(CompositeSolidView, { diagram })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }

  assert.deepEqual(Object.fromEntries(kindCounts), {
    stackedRectangularPrisms: 5,
    rectangularPrismWithVoid: 2,
    housePrism: 4,
    hollowCylinder: 1,
  });
});

test("composite-solid payload survives registry serialization and dispatch", () => {
  const visual = compositeSolidQuestionVisuals["y8-vsa-cv-m9"];
  assert.deepEqual(Object.keys(pickDiagramFields(visual)), ["compositeSolidDiagram"]);

  const serialized = extractDiagramData(visual);
  assert.equal(serialized?.type, "compositeSolidDiagram");
  const rendered = renderDiagramData(serialized);
  assert.ok(rendered);
  const markup = renderToStaticMarkup(rendered);
  assert.match(markup, /R = 5 cm/);
  assert.match(markup, /r = 3 cm/);
  assert.match(markup, /20 cm/);
});

test("Year 8 composite-solid dimensions calculate to the seeded answers", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.equal(Object.keys(expectedAnswers).length, 12);
  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer, `${questionId} has an incorrect seeded answer`);
    assert.equal(row.diagram_data?.type, "compositeSolidDiagram");
  }

  const numericChecks: Record<string, number> = {
    "y8-vsa-cv-g2": 10 * 4 * 2 + 6 * 4 * 3,
    "y8-vsa-cv-g3": 8 * 6 * 4 - 3 * 2 * 4,
    "y8-vsa-cv-g4": 10 * 4 * 3 + 0.5 * 4 * 2 * 10,
    "y8-vsa-cv-i4": 10 * 8 * 5 - 4 * 2 * 5,
    "y8-vsa-cv-m7": 14 * 6 * 3 + 8 * 6 * 4,
    "y8-vsa-cv-mp1": 12 * 6 * 5 + 0.5 * 12 * 4 * 6,
    "y8-vsa-cs-g2":
      prismSurfaceArea({ length: 10, width: 6, height: 4 }) +
      prismSurfaceArea({ length: 6, width: 4, height: 3 }) -
      2 * 6 * 4,
    "y8-vsa-cs-g4":
      8 * 5 + 2 * 8 * 4 + 2 * 5 * 4 + 2 * (0.5 * 8 * 3) + 2 * 5 * 5,
    "y8-vsa-cs-i4":
      prismSurfaceArea({ length: 12, width: 8, height: 4 }) +
      prismSurfaceArea({ length: 8, width: 5, height: 3 }) -
      2 * 8 * 5,
    "y8-vsa-cs-mp1":
      prismSurfaceArea({ length: 10, width: 8, height: 5 }) +
      prismSurfaceArea({ length: 6, width: 4, height: 3 }) -
      2 * 6 * 4,
  };

  for (const [questionId, calculatedAnswer] of Object.entries(numericChecks)) {
    assert.equal(Number(rowsById.get(questionId)?.answer), calculatedAnswer);
  }

  const houseChoice = compositeSolidQuestionVisuals["y8-vsa-cv-m3"].compositeSolidDiagram;
  assert.equal(houseChoice.kind, "housePrism");
  if (houseChoice.kind === "housePrism") {
    assert.equal(
      prismVolume(houseChoice.base) +
        0.5 *
          houseChoice.roof.crossSectionBase *
          houseChoice.roof.crossSectionHeight *
          houseChoice.roof.length,
      312
    );
  }

  const pipe = compositeSolidQuestionVisuals["y8-vsa-cv-m9"].compositeSolidDiagram;
  assert.equal(pipe.kind, "hollowCylinder");
  if (pipe.kind === "hollowCylinder") {
    assert.equal((pipe.outerRadius ** 2 - pipe.innerRadius ** 2) * pipe.length, 320);
  }
});
