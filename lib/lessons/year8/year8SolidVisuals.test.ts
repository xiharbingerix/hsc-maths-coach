import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NetView } from "../../../app/course/components/NetView";
import { Solid3DView } from "../../../app/course/components/Solid3DView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { volumeSurfaceAreaQuestionVisuals } from "./volumeSurfaceAreaVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-vsa-vp-g2": "120",
  "y8-vsa-vp-g3": "120",
  "y8-vsa-vp-i5": "4",
  "y8-vsa-vp-m9": "6",
  "y8-vsa-sp-g1": "C",
  "y8-vsa-sp-g2": "94",
  "y8-vsa-sp-g3": "216",
  "y8-vsa-sp-i4": "4",
  "y8-vsa-sp-p18": "6 cm, 180 cm^3",
  "y8-vsa-sp-mp1": "1300",
  "y8-vsa-vc-g2": "200\u03c0",
  "y8-vsa-vc-i4": "4",
  "y8-vsa-vc-i5": "192\u03c0",
  "y8-vsa-vc-mp1": "3077",
  "y8-vsa-sc-g1": "C",
  "y8-vsa-sc-g2": "130\u03c0",
  "y8-vsa-sc-i4": "7",
  "y8-vsa-sc-mp1": "84\u03c0",
};

test("Year 8 solid visuals are specific, accessible, and render as SVG", () => {
  const visuals = Object.entries(volumeSurfaceAreaQuestionVisuals);
  assert.equal(visuals.length, 18);
  assert.ok(visuals.every(([questionId]) => !questionId.includes("-cs-")));

  for (const [questionId, visual] of visuals) {
    assert.ok(visual.prompt.length >= 45, `${questionId} needs a specific prompt`);
    assert.notEqual(
      Boolean(visual.solid3DDiagram),
      Boolean(visual.netDiagram),
      `${questionId} must have exactly one diagram type`
    );

    const diagram = visual.solid3DDiagram ?? visual.netDiagram;
    assert.ok(diagram, `${questionId} needs a diagram`);
    assert.ok(
      diagram.description.length >= 55,
      `${questionId} needs a substantive accessible description`
    );
    assert.doesNotMatch(
      `${visual.prompt} ${diagram.description}`,
      /placeholder|sample question|generic diagram/i
    );

    const markup = visual.solid3DDiagram
      ? renderToStaticMarkup(
          React.createElement(Solid3DView, { diagram: visual.solid3DDiagram })
        )
      : renderToStaticMarkup(React.createElement(NetView, { diagram: visual.netDiagram! }));
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);

    if (visual.solid3DDiagram?.solid === "triangularPrism") {
      assert.match(
        markup,
        visual.solid3DDiagram.labels?.slant
          ? /M 56 147 h 9 v 9/
          : /M 102 147 h 9 v 9/
      );
    }
  }
});

test("Year 8 solid visuals retain their authored answers through seeding", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.equal(Object.keys(expectedAnswers).length, 18);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const visual = volumeSurfaceAreaQuestionVisuals[questionId];
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer, `${questionId} answer drifted from its diagram`);
    assert.ok(row.diagram_data, `${questionId} lost its diagram metadata`);
    assert.equal(
      row.diagram_data.type,
      visual.solid3DDiagram ? "solid3DDiagram" : "netDiagram"
    );
  }
});

test("Year 8 solid visuals do not leak into the shared Year 7 lessons", () => {
  const { rows } = collectAllQuestions(["year-7-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  for (const questionId of Object.keys(expectedAnswers)) {
    const row = rowsById.get(questionId);
    if (!row) continue;
    assert.equal(row.diagram_data, null, `${questionId} leaked into Year 7`);
  }
});
