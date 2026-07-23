import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GeometryFigureView } from "../../app/course/components/GeometryFigureView";
import { NetworkDiagramView } from "../../app/course/components/NetworkDiagramView";
import { TriangleDiagramView } from "../../app/course/components/TriangleDiagramView";
import type { PracticeQuestion } from "./differentialCalculus";
import { applyQuestionVisualStandards } from "./visualAuthoringStandards";

function question(prompt: string, latex = "working shown in prose"): PracticeQuestion {
  return { id: "visual-test", prompt, latex, answer: "0" };
}

test("solid prose becomes a labelled diagram-first question", () => {
  const result = applyQuestionVisualStandards(
    question("A cylinder has radius 4 cm and height 9 cm. Find its volume.")
  );
  assert.match(result.prompt, /^Use the diagram/);
  assert.equal(result.latex, "");
  assert.deepEqual(result.solid3DDiagram?.labels, { radius: "4 cm", height: "9 cm" });
});

test("cylinder diameters are drawn and labelled as diameters", () => {
  const result = applyQuestionVisualStandards(
    question("A cylinder has diameter 8 cm and height 5 cm. Find its surface area.")
  );
  assert.deepEqual(result.solid3DDiagram?.labels, {
    diameter: "d = 8 cm",
    height: "5 cm",
  });
});

test("right-triangle candidates show all sides without giving away a right angle", () => {
  const result = applyQuestionVisualStandards(
    question("Do sides 8, 15, 17 form a right-angled triangle?")
  );
  assert.deepEqual(result.triangleDiagram?.sideLabels, {
    AC: "8",
    BC: "15",
    AB: "17",
  });
  assert.equal(result.triangleDiagram?.rightAngleAt, undefined);
});

test("a named right-angle vertex is respected", () => {
  const result = applyQuestionVisualStandards(
    question("In a right-angled triangle, the right angle is at vertex C. Which side is the hypotenuse?")
  );
  assert.equal(result.triangleDiagram?.rightAngleAt, "C");
});

test("student errors are not promoted into diagram labels", () => {
  const result = applyQuestionVisualStandards(
    question("A student adds 6 and 8 to get 14, then says the hypotenuse is 14. What error was made?")
  );
  assert.deepEqual(result.triangleDiagram?.sideLabels, {
    AC: "6",
    BC: "8",
  });
});

test("triangular prisms use the solid renderer with all cross-section sides", () => {
  const result = applyQuestionVisualStandards(
    question("A triangular prism has a right-angled cross-section with legs 5 cm and 12 cm (hypotenuse 13 cm) and prism length 10 cm.")
  );
  assert.equal(result.solid3DDiagram?.solid, "triangularPrism");
  assert.deepEqual(result.solid3DDiagram?.labels, {
    height: "12 cm",
    length: "10 cm",
    base: "5 cm",
    slant: "13 cm",
  });
});

test("algebraic quadrilateral angles remain visible", () => {
  const result = applyQuestionVisualStandards(
    question("A quadrilateral has angles x°, 2x°, 3x°, and 4x°. Find x.")
  );
  assert.deepEqual(
    result.planeShapeDiagram?.vertices.map((vertex) => vertex.angleLabel),
    ["x°", "2x°", "3x°", "4x°"]
  );
});

test("parallel-line angle expressions are clean and complete", () => {
  const result = applyQuestionVisualStandards(
    question("Parallel lines have co-interior angles (3x + 20)° and (2x + 10)°. Find x.")
  );
  assert.deepEqual(
    result.lineAngleDiagram?.angles?.map((angle) => angle.label),
    ["3x+20°", "2x+10°"]
  );
});

test("route networks retain a separately stated direct edge", () => {
  const result = applyQuestionVisualStandards(
    question("Routes A to D: direct 18, A-B-D = 7+6, A-C-D = 5+9. Find the shortest route.")
  );
  const weights = new Map(
    result.diagram?.edges.map((edge) => [
      [edge.from, edge.to].sort().join("-"),
      edge.weight,
    ])
  );
  assert.deepEqual(Object.fromEntries(weights), {
    "A-B": 7,
    "B-D": 6,
    "A-C": 5,
    "C-D": 9,
    "A-D": 18,
  });
  const positions = new Map(
    result.diagram?.vertices.map((vertex) => [vertex.id, vertex])
  );
  assert.ok(positions.get("A")!.x < positions.get("D")!.x);
  assert.notEqual(positions.get("B")!.y, positions.get("C")!.y);
});

test("rhombus diagonal questions show the perpendicular intersection and full angle", () => {
  const result = applyQuestionVisualStandards(
    question("In a rhombus, a diagonal bisects a vertex angle into two angles, and one such half-angle is (2x)° while the full vertex angle is 76°. Find x.")
  );
  assert.deepEqual(
    result.lineAngleDiagram?.angles?.map((angle) => angle.label),
    ["2x°", "2x°", "76°"]
  );
});

test("rectangular voids do not collapse into a plain prism", () => {
  const result = applyQuestionVisualStandards(
    question("A rectangular prism 12 cm × 8 cm × 5 cm has a square hole 3 cm × 3 cm × 5 cm removed.")
  );
  assert.equal(result.compositeSolidDiagram?.kind, "rectangularPrismWithVoid");
});

test("parallelogram height is drawn as an internal perpendicular, not a sloping side", () => {
  const result = applyQuestionVisualStandards(
    question("A parallelogram has base 12 m, perpendicular height 7 m and slant side 9 m. Find its area.")
  );
  assert.ok(result.lineAngleDiagram);
  assert.ok(result.lineAngleDiagram.segments.some((segment) => segment.label === "7 m" && segment.dashed));
  assert.ok(result.lineAngleDiagram.angles?.some((angle) => angle.rightAngle));
});

test("rhombus diagonals remain exact and perpendicular", () => {
  const result = applyQuestionVisualStandards(
    question("A rhombus has diagonals of 10 cm and 6 cm. Find its area.")
  );
  assert.ok(result.lineAngleDiagram);
  assert.deepEqual(
    result.lineAngleDiagram.segments.filter((segment) => segment.label).map((segment) => segment.label).sort(),
    ["10 cm", "6 cm"]
  );
  assert.ok(result.lineAngleDiagram.angles?.some((angle) => angle.rightAngle));
});

test("a rhombus intersection diagram marks its defining right angle", () => {
  const result = applyQuestionVisualStandards(
    question("In rhombus ABCD, the diagonals intersect at point O. State the size of angle AOB.")
  );
  assert.ok(result.lineAngleDiagram?.angles?.some((angle) => angle.rightAngle));
});

test("composite solids are left for bespoke authoring", () => {
  const original = question(
    "A composite solid is made from a cylinder joined to a rectangular prism. Find its volume."
  );
  assert.deepEqual(applyQuestionVisualStandards(original), original);
});

test("weighted edge lists become the exact network topology", () => {
  const result = applyQuestionVisualStandards(
    question("Edges: AB (4), BC (7), AC (6). Find the total weight of path A to B to C.")
  );
  assert.ok(result.diagram);
  assert.equal(result.diagram.vertices.length, 3);
  assert.deepEqual(result.diagram.edges.map((edge) => edge.weight).sort(), [4, 6, 7]);
});

test("unweighted edge lists become exact network topology", () => {
  const result = applyQuestionVisualStandards(
    question("A network has edges AB, AC, BC and CD. Find the degree of C."),
  );
  assert.deepEqual(
    result.diagram?.edges.map((edge) => [edge.from, edge.to]),
    [["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"]],
  );
});

test("inline value tables become table payloads", () => {
  const result = applyQuestionVisualStandards(
    question("Table: x = 0 → 3, x = 1 → 5, x = 2 → 7. Find the constant difference."),
  );
  assert.deepEqual(result.dataTableDiagram?.columnHeaders, ["x", "0", "1", "2"]);
  assert.deepEqual(result.dataTableDiagram?.values, [["Output", "3", "5", "7"]]);
});

test("side-by-side summary statistics become box plots", () => {
  const result = applyQuestionVisualStandards(
    question("Side-by-side box plots show Group P with median 35 and Group Q with median 28. Both have IQR = 10."),
  );
  assert.deepEqual(
    result.boxPlotDiagram?.plots.map((plot) => [plot.label, plot.median, plot.q3 - plot.q1]),
    [["P", 35, 10], ["Q", 28, 10]],
  );
});

test("mixed composite-solid dimensions use the composite renderer", () => {
  const result = applyQuestionVisualStandards(
    question("A composite solid has a rectangular prism (10 cm × 6 cm × 4 cm) base with a triangular prism on top. The triangular cross-section has base 6 cm and height 3 cm; the prism is 10 cm long."),
  );
  assert.equal(result.compositeSolidDiagram?.kind, "triangularPrismOnRectangularPrism");
});

test("an authored visual is preserved without rewriting its prompt or latex", () => {
  const original: PracticeQuestion = {
    ...question("Use the supplied figure.", "x=3"),
    triangleDiagram: {
      description: "Authored right triangle.",
      vertices: { A: { x: 0, y: 0 }, B: { x: 3, y: 0 }, C: { x: 0, y: 4 } },
      rightAngleAt: "A",
    },
  };
  assert.strictEqual(applyQuestionVisualStandards(original), original);
});

test("model-coordinate diagrams expand to a readable SVG viewport", () => {
  const triangle = applyQuestionVisualStandards(
    question("A right-angled triangle has legs 6 cm and 8 cm. Find the hypotenuse.")
  ).triangleDiagram!;
  const lineAngles = applyQuestionVisualStandards(
    question("Parallel lines have co-interior angles (3x + 20)° and (2x + 10)°. Find x.")
  ).lineAngleDiagram!;
  const network = applyQuestionVisualStandards(
    question("Routes A to D: direct 18, A-B-D = 7+6, A-C-D = 5+9. Find the shortest route.")
  ).diagram!;

  const triangleMarkup = renderToStaticMarkup(
    React.createElement(TriangleDiagramView, { diagram: triangle })
  );
  const angleMarkup = renderToStaticMarkup(
    React.createElement(GeometryFigureView, { diagram: lineAngles })
  );
  const networkMarkup = renderToStaticMarkup(
    React.createElement(NetworkDiagramView, { diagram: network })
  );

  assert.match(triangleMarkup, /x1="55"/);
  assert.match(angleMarkup, /viewBox="0 0 400 300"/);
  assert.match(networkMarkup, /viewBox="0 0 400 300"/);
});
