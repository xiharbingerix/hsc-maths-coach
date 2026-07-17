import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NetworkDiagramView } from "../../../app/course/components/NetworkDiagramView";
import { PlaneShapeView } from "../../../app/course/components/PlaneShapeView";
import { TriangleDiagramView } from "../../../app/course/components/TriangleDiagramView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { geometryQuestionVisuals } from "./geometryVisuals";
import { networkQuestionVisuals } from "./networkVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-geo-pol-g2": "120",
  "y8-geo-pol-i2": "108",
  "y8-geo-qprop-g1": "D",
  "y8-geo-qprop-i1": "62",
  "y8-geo-qprop-m3": "117",
  "y8-geo-qprop-m6": "109",
  "y8-geo-rea-g2": "53",
  "y8-geo-rea-i4": "20",
  "y8-geo-rea-i5": "72",
  "y8-geo-tri-g1": "43",
  "y8-geo-tri-g3": "70",
  "y8-geo-tri-i1": "76",
  "y8-geo-tri-i5": "53",
  "y8-net-app-g1": "7",
  "y8-net-app-i3": "10",
  "y8-net-app-mp1": "15",
  "y8-net-eul-g3": "2",
  "y8-net-eul-i5": "B",
  "y8-net-eul-m5": "4",
  "y8-net-fun-g1": "4",
  "y8-net-fun-g2": "4",
  "y8-net-fun-i5": "15",
  "y8-net-pc-g3": "2",
  "y8-net-pc-i2": "3",
  "y8-net-pc-mp1": "4",
  "y8-net-pl-g4": "2",
  "y8-net-pl-i4": "4",
  "y8-net-pl-m9": "A",
};

test("Year 8 network visuals are complete, valid graphs", () => {
  assert.equal(Object.keys(networkQuestionVisuals).length, 15);

  for (const [questionId, visual] of Object.entries(networkQuestionVisuals)) {
    const { diagram } = visual;
    assert.ok(visual.prompt.length >= 20, `${questionId} needs a specific prompt`);
    assert.ok(
      diagram.description.length >= 60,
      `${questionId} needs a substantive accessible description`
    );
    assert.ok(diagram.vertices.length >= 3, `${questionId} needs at least three vertices`);
    assert.ok(diagram.edges.length >= 2, `${questionId} needs at least two edges`);

    const vertexIds = new Set(diagram.vertices.map((vertex) => vertex.id));
    assert.equal(vertexIds.size, diagram.vertices.length, `${questionId} has duplicate vertices`);

    const edgeKeys = new Set<string>();
    for (const edge of diagram.edges) {
      assert.ok(vertexIds.has(edge.from), `${questionId} edge starts at missing vertex`);
      assert.ok(vertexIds.has(edge.to), `${questionId} edge ends at missing vertex`);
      assert.notEqual(edge.from, edge.to, `${questionId} has an unintended self-edge`);
      const edgeKey = edge.directed
        ? `${edge.from}->${edge.to}`
        : [edge.from, edge.to].sort().join("--");
      assert.ok(!edgeKeys.has(edgeKey), `${questionId} has a duplicate edge ${edgeKey}`);
      edgeKeys.add(edgeKey);
    }

    const markup = renderToStaticMarkup(
      React.createElement(NetworkDiagramView, { diagram })
    );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("Year 8 geometry visuals have complete geometry and render as SVG", () => {
  assert.equal(Object.keys(geometryQuestionVisuals).length, 13);

  for (const [questionId, visual] of Object.entries(geometryQuestionVisuals)) {
    assert.ok(visual.prompt.length >= 20, `${questionId} needs a specific prompt`);
    assert.notEqual(
      Boolean(visual.triangleDiagram),
      Boolean(visual.planeShapeDiagram),
      `${questionId} must have exactly one diagram type`
    );

    const diagram = visual.triangleDiagram ?? visual.planeShapeDiagram;
    assert.ok(diagram, `${questionId} needs a diagram`);
    assert.ok(
      diagram.description.length >= 60,
      `${questionId} needs a substantive accessible description`
    );

    const markup = visual.triangleDiagram
      ? renderToStaticMarkup(
          React.createElement(TriangleDiagramView, { diagram: visual.triangleDiagram })
        )
      : renderToStaticMarkup(
          React.createElement(PlaneShapeView, { diagram: visual.planeShapeDiagram! })
        );
    assert.match(markup, /<svg/);
    assert.match(markup, /<title/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("Year 8 visual questions survive question-bank mapping with matching answers", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.equal(Object.keys(expectedAnswers).length, 28);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer, `${questionId} answer drifted from its diagram`);
    assert.ok(row.diagram_data, `${questionId} lost its diagram metadata`);

    const expectedType = questionId.startsWith("y8-net-")
      ? "networkDiagram"
      : geometryQuestionVisuals[questionId].triangleDiagram
        ? "triangleDiagram"
        : "planeShapeDiagram";
    assert.equal(row.diagram_data.type, expectedType);
  }
});

test("repaired Year 8 data questions contain their own source data", () => {
  const repairedIds = [
    "y8-dat-out-p18",
    "y8-dat-bxp-p15",
    "y8-dat-bxp-p21",
    "y8-dat-cmpbxp-p20",
    "y8-dat-cmpbxp-p26",
    "y8-dat-shp-p15",
    "y8-dat-shp-p18",
    "y8-dat-shp-p22",
    "y8-dat-shp-p27",
  ];
  const { rows } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  for (const questionId of repairedIds) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.doesNotMatch(row.prompt, /(?:data|groups?|prices?) above/i);
    assert.ok(row.prompt.length >= 40, `${questionId} still lacks standalone context`);
  }
});
