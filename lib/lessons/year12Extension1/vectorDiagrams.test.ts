import assert from "node:assert/strict";
import test from "node:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Vector2DDiagramView } from "../../../app/course/components/Vector2DDiagramView";
import { DIAGRAM_SPECS, extractDiagramData } from "../diagramRegistry";
import type { Vector2DDiagram } from "../types";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import { vectorsPool } from "../../topicTests/pools/year-12-extension-1/vectors";

const fields = DIAGRAM_SPECS.map((spec) => spec.field);
const hasVisual = (value: Record<string, unknown>) => fields.some((field) => Boolean(value[field]));

test("vector2DDiagram is registered and renders directed vectors accessibly", () => {
  const diagram: Vector2DDiagram = {
    description: "Vectors a and b arranged head-to-tail with resultant a + b.",
    vectors: [
      { to: { x: 3, y: 1 }, label: "a" },
      { from: { x: 3, y: 1 }, to: { x: 5, y: 4 }, label: "b" },
      { to: { x: 5, y: 4 }, label: "a + b" },
    ],
  };
  assert.equal(extractDiagramData({ vector2DDiagram: diagram })?.type, "vector2DDiagram");
  const html = renderToStaticMarkup(React.createElement(Vector2DDiagramView, { diagram }));
  assert.match(html, /role="img"/);
  assert.match(html, /Vectors a and b arranged head-to-tail/);
  assert.match(html, /marker-end=/);
});

test("Extension 1 vector lessons carry diagram-first worked examples", () => {
  const lessons = getNewCourseUnitLessons("year-12-extension-1", "vectors");
  const expected = new Set([
    "vectors-scalars-notation",
    "vector-addition-subtraction",
    "dot-product",
    "vector-projections-applications",
    "vectors-projection",
    "vectors-motion-2d",
    "vectors-projectile-parametric",
  ]);
  for (const lesson of lessons) {
    if (!expected.has(lesson.slug)) continue;
    assert.ok(
      lesson.workedExamples.some((example) => hasVisual(example as unknown as Record<string, unknown>)),
      `${lesson.slug} should include a visual worked example`
    );
  }

  const projection = lessons.find((lesson) => lesson.slug === "vectors-projection");
  assert.ok(projection);
  assert.ok(projection.workedExamples.every((example) => example.vector2DDiagram));

  const projectile = lessons.find((lesson) => lesson.slug === "vectors-projectile-parametric");
  assert.ok(projectile?.workedExamples[0].cartesianGraph?.parabolas?.length);
});

test("priority vector geometry assessment items use the 2D vector renderer", () => {
  const questions = vectorsPool.subtopics.flatMap((subtopic) => [
    ...subtopic.d4,
    ...subtopic.d5,
    ...(subtopic.d6 ?? []),
  ]);
  for (const id of ["y12e1-vec-not-d5-8", "y12e1-vec-add-d5-6", "y12e1-vec-add-d5-10"]) {
    assert.ok(questions.find((question) => question.id === id)?.vector2DDiagram, id);
  }
});
