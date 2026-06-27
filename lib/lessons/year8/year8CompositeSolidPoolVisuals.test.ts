import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../../app/components/diagramRegistry";
import { CompositeSolidView } from "../../../app/course/components/CompositeSolidView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { extractDiagramData } from "../diagramRegistry";
import type {
  CompositeSolidDiagram,
  RectangularPrismDimensions,
} from "../types";
import { compositeSolidPoolVisuals } from "./compositeSolidPoolVisuals";
import { compositeSolidQuestionVisuals } from "./compositeSolidVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-vsa-cv-p5": "96",
  "y8-vsa-cv-p6": "104",
  "y8-vsa-cv-p7": "112",
  "y8-vsa-cv-p10": "516",
  "y8-vsa-cv-p11": "540",
  "y8-vsa-cv-p12": "420",
  "y8-vsa-cv-p13": "360π",
  "y8-vsa-cv-p17": "2304",
  "y8-vsa-cv-p19": "816",
  "y8-vsa-cs-p9": "256",
  "y8-vsa-cs-p10": "412",
  "y8-vsa-cs-p11": "148",
  "y8-vsa-cs-p12": "240",
  "y8-vsa-cs-p14": "218",
  "y8-vsa-cs-p16": "294",
  "y8-vsa-cs-p18": "432",
  "y8-vsa-cs-p19": "430",
  "y8-vsa-cs-p20": "B",
  "y8-vsa-cs-p21": "420",
  "y8-vsa-cs-p24": "496",
  "y8-vsa-cs-p26": "252",
};

const volumeQuestionIds = new Set(
  Object.keys(expectedAnswers).filter((questionId) => questionId.includes("-cv-"))
);

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

function calculateVolume(diagram: CompositeSolidDiagram): number {
  switch (diagram.kind) {
    case "stackedRectangularPrisms":
      return prismVolume(diagram.lower) + prismVolume(diagram.upper);
    case "rectangularPrismWithVoid":
      return prismVolume(diagram.outer) - prismVolume(diagram.void);
    case "housePrism":
      return (
        prismVolume(diagram.base) +
        0.5 *
          diagram.roof.crossSectionBase *
          diagram.roof.crossSectionHeight *
          diagram.roof.length
      );
    case "hollowCylinder":
      return (diagram.outerRadius ** 2 - diagram.innerRadius ** 2) * diagram.length;
  }
}

function calculateSurfaceArea(diagram: CompositeSolidDiagram): number {
  if (diagram.kind === "stackedRectangularPrisms") {
    const jointArea = diagram.upper.length * diagram.upper.width;
    return (
      prismSurfaceArea(diagram.lower) +
      prismSurfaceArea(diagram.upper) -
      2 * jointArea
    );
  }
  if (diagram.kind === "housePrism" && diagram.roof.slant) {
    const baseExposed =
      diagram.base.length * diagram.base.width +
      2 * diagram.base.length * diagram.base.height +
      2 * diagram.base.width * diagram.base.height;
    const roofExposed =
      diagram.roof.crossSectionBase * diagram.roof.crossSectionHeight +
      2 * diagram.roof.slant * diagram.roof.length;
    return baseExposed + roofExposed;
  }
  throw new Error(`Unsupported surface-area pool diagram: ${diagram.kind}`);
}

test("Year 8 composite-solid mastery-pool visuals are exact and render", () => {
  const visuals = Object.entries(compositeSolidPoolVisuals);
  assert.equal(visuals.length, 21);

  for (const [questionId, visual] of visuals) {
    assert.equal(compositeSolidQuestionVisuals[questionId], undefined);
    assert.ok(visual.prompt.length >= 60, `${questionId} needs a specific visual prompt`);
    assert.ok(
      visual.compositeSolidDiagram.description.length >= 80,
      `${questionId} needs a substantive accessible description`
    );
    const markup = renderToStaticMarkup(
      React.createElement(CompositeSolidView, {
        diagram: visual.compositeSolidDiagram,
      })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
    assert.doesNotMatch(
      `${visual.prompt} ${visual.compositeSolidDiagram.description}`,
      /placeholder|sample question|generic diagram/i
    );
  }
});

test("mastery-pool composite payload survives serialization and dispatch", () => {
  const visual = compositeSolidPoolVisuals["y8-vsa-cv-p11"];
  const serialized = extractDiagramData(visual);
  assert.equal(serialized?.type, "compositeSolidDiagram");
  const rendered = renderDiagramData(serialized);
  assert.ok(rendered);
  const markup = renderToStaticMarkup(rendered);
  assert.match(markup, /hole 4 x 3 x 5 cm/);
});

test("mastery-pool diagrams independently calculate to every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));
  assert.equal(warnings.length, 0);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const row = rowsById.get(questionId);
    const diagram = compositeSolidPoolVisuals[questionId].compositeSolidDiagram;
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer, `${questionId} has an incorrect seeded answer`);
    assert.equal(row.diagram_data?.type, "compositeSolidDiagram");

    if (volumeQuestionIds.has(questionId)) {
      const calculated = calculateVolume(diagram);
      if (diagram.kind === "hollowCylinder") {
        assert.equal(row.answer, `${calculated}π`);
      } else {
        assert.equal(Number(row.answer), calculated);
      }
      continue;
    }

    const calculated = calculateSurfaceArea(diagram);
    if (questionId === "y8-vsa-cs-p20") {
      assert.equal(calculated, 112);
      const correctChoice = row.choices?.find((choice) => choice.label === row.answer);
      assert.match(correctChoice?.text ?? "", /112/);
    } else {
      assert.equal(Number(row.answer), calculated);
    }
  }
});
