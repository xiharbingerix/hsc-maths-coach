import assert from "node:assert/strict";
import test from "node:test";
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
