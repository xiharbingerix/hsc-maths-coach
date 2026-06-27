import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../../app/components/diagramRegistry";
import { CompositeSolidView } from "../../../app/course/components/CompositeSolidView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { extractDiagramData } from "../diagramRegistry";
import { specialCompositeSolidVisuals } from "./specialCompositeSolidVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-vsa-cv-p18": "1000 - 90π",
  "y8-vsa-cv-p22": "120000π + 192000",
  "y8-vsa-cv-p24": "1080",
  "y8-vsa-cv-p25": "C",
  "y8-vsa-cv-p26": "72000 - 3000π",
};

test("specialised Year 8 volume diagrams render complete geometry", () => {
  const visuals = Object.entries(specialCompositeSolidVisuals);
  assert.equal(visuals.length, 5);

  for (const [questionId, visual] of visuals) {
    assert.ok(visual.prompt.length >= 75, `${questionId} needs a specific visual prompt`);
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

test("specialised composite payload survives serialization and dispatch", () => {
  const visual = specialCompositeSolidVisuals["y8-vsa-cv-p24"];
  const serialized = extractDiagramData(visual);
  assert.equal(serialized?.type, "compositeSolidDiagram");
  const rendered = renderDiagramData(serialized);
  assert.ok(rendered);
  assert.match(renderToStaticMarkup(rendered), /notch triangle 6 x 4 cm/);
});

test("specialised diagram dimensions calculate to every seeded answer", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));
  assert.equal(warnings.length, 0);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer);
    assert.equal(row.diagram_data?.type, "compositeSolidDiagram");
  }

  const cubeHole = specialCompositeSolidVisuals["y8-vsa-cv-p18"].compositeSolidDiagram;
  assert.equal(cubeHole.kind, "rectangularPrismWithCylindricalHole");
  if (cubeHole.kind === "rectangularPrismWithCylindricalHole") {
    assert.equal(cubeHole.outer.length * cubeHole.outer.width * cubeHole.outer.height, 1000);
    assert.equal(cubeHole.hole.radius ** 2 * cubeHole.hole.depth, 90);
  }

  const column = specialCompositeSolidVisuals["y8-vsa-cv-p22"].compositeSolidDiagram;
  assert.equal(column.kind, "cylinderOnRectangularPrism");
  if (column.kind === "cylinderOnRectangularPrism") {
    assert.equal(column.base.length * column.base.width * column.base.height, 192000);
    assert.equal(column.cylinder.radius ** 2 * column.cylinder.height, 120000);
  }

  const notch = specialCompositeSolidVisuals["y8-vsa-cv-p24"].compositeSolidDiagram;
  assert.equal(notch.kind, "rectangularPrismWithTriangularNotch");
  if (notch.kind === "rectangularPrismWithTriangularNotch") {
    const outerVolume = notch.outer.length * notch.outer.width * notch.outer.height;
    const notchVolume = 0.5 * notch.notch.base * notch.notch.height * notch.notch.length;
    assert.equal(outerVolume - notchVolume, 1080);
  }

  const pool = specialCompositeSolidVisuals["y8-vsa-cv-p25"].compositeSolidDiagram;
  assert.equal(pool.kind, "steppedPool");
  if (pool.kind === "steppedPool") {
    const total =
      pool.shallow.length * pool.shallow.width * pool.shallow.height +
      pool.deep.length * pool.deep.width * pool.deep.height;
    assert.equal(total, 180);
    const row = rowsById.get("y8-vsa-cv-p25");
    assert.match(row?.choices?.find((choice) => choice.label === row.answer)?.text ?? "", /180/);
  }

  const planter = specialCompositeSolidVisuals["y8-vsa-cv-p26"].compositeSolidDiagram;
  assert.equal(planter.kind, "rectangularPrismWithCylindricalHole");
  if (planter.kind === "rectangularPrismWithCylindricalHole") {
    assert.equal(planter.outer.length * planter.outer.width * planter.outer.height, 72000);
    assert.equal(planter.hole.radius ** 2 * planter.hole.depth, 3000);
  }
});
