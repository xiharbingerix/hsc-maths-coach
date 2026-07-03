import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BearingsView } from "../../app/course/components/BearingsView";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { year9BearingsVisuals } from "./year9BearingsVisuals";

test("Year 9 bearings diagrams draw only the given ray and render cleanly", () => {
  const visuals = Object.entries(year9BearingsVisuals);
  assert.equal(visuals.length, 22);

  for (const [questionId, visual] of visuals) {
    const diagram = visual.bearingsDiagram;
    // Exactly one ray: the given direction. Drawing the answer ray (back
    // bearing / return direction) would leak the answer.
    assert.equal(diagram.rays.length, 1, questionId);
    assert.ok(diagram.description.length >= 80, questionId);

    const markup = renderToStaticMarkup(
      React.createElement(BearingsView, { diagram })
    );
    assert.match(markup, /<svg/, questionId);
    assert.doesNotMatch(markup, /NaN|undefined/, questionId);
  }
});

test("Year 9 bearings diagrams stay consistent with the seeded question", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const [questionId, visual] of Object.entries(year9BearingsVisuals)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.diagram_data?.type, "bearingsDiagram");

    // The drawn ray must be the GIVEN bearing from the prompt, never the
    // answer. (Back bearings differ from the given by exactly 180°.)
    const drawn = visual.bearingsDiagram.rays[0].bearing;
    const answer = Number(row.answer);
    assert.notEqual(drawn, answer, `${questionId} draws the answer bearing`);
    assert.ok(
      row.prompt.includes(String(drawn).padStart(3, "0")) ||
        row.prompt.includes(`${drawn}°`),
      `${questionId} prompt does not mention the drawn bearing ${drawn}`
    );
  }
});
