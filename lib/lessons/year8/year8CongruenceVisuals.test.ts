import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../../app/components/diagramRegistry";
import { CongruentTrianglesView } from "../../../app/course/components/CongruentTrianglesView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { extractDiagramData, pickDiagramFields } from "../diagramRegistry";
import { congruenceQuestionVisuals } from "./congruenceVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-geo-con-g1": "B",
  "y8-geo-con-g2": "C",
  "y8-geo-con-g3": "RHS",
  "y8-geo-con-i1": "SSS",
  "y8-geo-con-i3": "A",
  "y8-geo-con-i4": "AAS",
  "y8-geo-con-m5": "C",
  "y8-geo-con-m7": "yes",
  "y8-geo-con-m9": "60",
  "y8-geo-con-mp1": "48",
};

test("Year 8 congruence visuals have matching correspondence marks", () => {
  const visuals = Object.entries(congruenceQuestionVisuals);
  assert.equal(visuals.length, 10);

  for (const [questionId, visual] of visuals) {
    const { congruentTrianglesDiagram: diagram } = visual;
    assert.ok(visual.prompt.length >= 55, `${questionId} needs a specific prompt`);
    assert.ok(diagram.description.length >= 70, `${questionId} needs a specific pair description`);
    assert.ok(
      diagram.left.description.length >= 55,
      `${questionId} needs a specific left-triangle description`
    );
    assert.ok(
      diagram.right.description.length >= 55,
      `${questionId} needs a specific right-triangle description`
    );
    assert.deepEqual(diagram.left.sideTicks ?? {}, diagram.right.sideTicks ?? {});
    assert.deepEqual(diagram.left.angleMarks ?? {}, diagram.right.angleMarks ?? {});
    assert.equal(diagram.left.rightAngleAt, diagram.right.rightAngleAt);
    assert.doesNotMatch(
      `${visual.prompt} ${diagram.description}`,
      /placeholder|sample question|generic diagram/i
    );

    const markup = renderToStaticMarkup(
      React.createElement(CongruentTrianglesView, { diagram })
    );
    assert.equal((markup.match(/<svg/g) ?? []).length, 2);
    assert.equal((markup.match(/<title/g) ?? []).length, 2);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("congruent-triangle payload survives registry serialization and dispatch", () => {
  const visual = congruenceQuestionVisuals["y8-geo-con-g2"];
  const fields = pickDiagramFields(visual);
  assert.deepEqual(Object.keys(fields), ["congruentTrianglesDiagram"]);

  const serialized = extractDiagramData(visual);
  assert.equal(serialized?.type, "congruentTrianglesDiagram");
  const rendered = renderDiagramData(serialized);
  assert.ok(rendered);
  const markup = renderToStaticMarkup(rendered);
  assert.equal((markup.match(/<svg/g) ?? []).length, 2);
  assert.match(markup, /5 cm/);
  assert.match(markup, /9 cm/);
});

test("Year 8 congruence diagrams retain their answers through seeding", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.equal(Object.keys(expectedAnswers).length, 10);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer);
    assert.equal(row.diagram_data?.type, "congruentTrianglesDiagram");
  }

  assert.equal(180 - 55 - 65, Number(rowsById.get("y8-geo-con-m9")?.answer));
  assert.equal(180 - 58 - 74, Number(rowsById.get("y8-geo-con-mp1")?.answer));
});
