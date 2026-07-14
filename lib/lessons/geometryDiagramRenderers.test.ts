import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../app/components/diagramRegistry";
import { CircleGeometryDiagramView } from "../../app/course/components/CircleGeometryDiagramView";
import { LineAngleDiagramView } from "../../app/course/components/LineAngleDiagramView";
import { TrianglePairView } from "../../app/course/components/TrianglePairView";
import { getVisibleNewCourseLessons } from "../newCourseCatalog";
import { extractDiagramData, pickDiagramFields } from "./diagramRegistry";
import type {
  CircleGeometryDiagram,
  LineAngleDiagram,
  TrianglePairDiagram,
} from "./types";

const lineAngleDiagram: LineAngleDiagram = {
  description: "Two parallel horizontal lines cut by a diagonal transversal, with equal alternate angles marked at P and Q.",
  viewBox: "0 0 400 300",
  points: [
    { id: "A", x: 35, y: 80 },
    { id: "B", x: 365, y: 80 },
    { id: "C", x: 35, y: 220 },
    { id: "D", x: 365, y: 220 },
    { id: "E", x: 115, y: 25 },
    { id: "F", x: 285, y: 275 },
    { id: "P", x: 152, y: 80, showDot: false, showLabel: false },
    { id: "Q", x: 247, y: 220, showDot: false, showLabel: false },
  ],
  segments: [
    { from: "A", to: "B", parallelMarks: 1 },
    { from: "C", to: "D", parallelMarks: 1 },
    { from: "E", to: "F", highlighted: true },
  ],
  angles: [
    { vertex: "P", from: "A", to: "E", label: "65 degrees", marks: 1 },
    { vertex: "Q", from: "D", to: "F", label: "x degrees", marks: 1 },
  ],
};

const circleGeometryDiagram: CircleGeometryDiagram = {
  description: "Circle with centre O, chord AB, circumference point C, and tangent PT perpendicular to radius OT at T.",
  viewBox: "0 0 420 300",
  circle: { center: "O", radius: 100 },
  points: [
    { id: "O", x: 190, y: 150 },
    { id: "A", x: 190, y: 50 },
    { id: "B", x: 277, y: 200 },
    { id: "C", x: 103, y: 200 },
    { id: "T", x: 190, y: 250, labelOffset: { x: -16, y: 13 } },
    { id: "P", x: 350, y: 250 },
  ],
  segments: [
    { from: "A", to: "B", label: "chord AB", labelOffset: { x: -30, y: -5 } },
    { from: "C", to: "A" },
    { from: "C", to: "B" },
    { from: "O", to: "T", label: "r" },
    { from: "T", to: "P", label: "tangent", labelOffset: { x: 0, y: -15 }, highlighted: true },
  ],
  arcs: [{ from: "A", to: "B", label: "arc AB", highlighted: true }],
  angles: [
    { vertex: "C", from: "A", to: "B", label: "theta", marks: 1 },
    { vertex: "T", from: "O", to: "P", rightAngle: true },
  ],
};

const trianglePairDiagram: TrianglePairDiagram = {
  description: "Two similar triangles with one pair of corresponding angles and sides marked.",
  relationLabel: "similar",
  leftCaption: "Small triangle",
  rightCaption: "Large triangle",
  left: {
    description: "Small triangle ABC with side AB labelled 4 and angle A marked.",
    vertices: { A: { x: 70, y: 220 }, B: { x: 320, y: 220 }, C: { x: 145, y: 60 } },
    sideLabels: { AB: "4" },
    angleMarks: { A: 1 },
  },
  right: {
    description: "Large triangle DEF with side DE labelled 12 and angle D marked.",
    vertices: { A: { x: 55, y: 225 }, B: { x: 335, y: 225 }, C: { x: 140, y: 45 } },
    vertexLabels: { A: "D", B: "E", C: "F" },
    sideLabels: { AB: "12" },
    angleMarks: { A: 1 },
  },
};

test("new geometry payloads render accessible, finite SVG markup", () => {
  const cases = [
    [
      renderToStaticMarkup(React.createElement(LineAngleDiagramView, { diagram: lineAngleDiagram })),
      "65 degrees",
    ],
    [
      renderToStaticMarkup(
        React.createElement(CircleGeometryDiagramView, { diagram: circleGeometryDiagram })
      ),
      "arc AB",
    ],
    [
      renderToStaticMarkup(React.createElement(TrianglePairView, { diagram: trianglePairDiagram })),
      "similar",
    ],
  ] as const;

  for (const [markup, expectedText] of cases) {
    assert.match(markup, /role="img"|role="group"/);
    assert.match(markup, new RegExp(expectedText));
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("new geometry payloads survive registry serialization and dispatch", () => {
  const payloads = [
    { field: "lineAngleDiagram", value: lineAngleDiagram },
    { field: "circleGeometryDiagram", value: circleGeometryDiagram },
    { field: "trianglePairDiagram", value: trianglePairDiagram },
  ] as const;

  for (const payload of payloads) {
    const source = { [payload.field]: payload.value };
    assert.deepEqual(Object.keys(pickDiagramFields(source)), [payload.field]);
    const serialized = extractDiagramData(source);
    assert.equal(serialized?.type, payload.field);
    const rendered = renderDiagramData(serialized);
    assert.ok(rendered);
    assert.doesNotMatch(renderToStaticMarkup(rendered), /NaN|undefined/);
  }
});

test("the corrected Year 10 congruence prompt is specific and diagram-first", () => {
  const lesson = getVisibleNewCourseLessons(
    "year-10-mathematics-advanced",
    "geometrical-figures-circle-geometry"
  ).find((candidate) => candidate.slug === "congruence-quadrilaterals");
  assert.ok(lesson);
  const question = lesson.guidedPractice.find((candidate) => candidate.id.endsWith("y10-cq-g2"));
  assert.ok(question);
  assert.equal(
    question.prompt,
    "The two triangles in the diagram are congruent, with angle B corresponding to angle E. If angle E is 50°, find angle B."
  );
  assert.doesNotMatch(question.prompt, /\.\.\.|50 mm/);
  assert.ok((question.explanation?.length ?? 0) >= 40);
  assert.equal(question.answer, "50");
  assert.equal(extractDiagramData(question)?.type, "trianglePairDiagram");
});

test("Year 10 circle worked examples are diagram-first", () => {
  const lessons = getVisibleNewCourseLessons(
    "year-10-mathematics-advanced",
    "geometrical-figures-circle-geometry"
  );
  const circleLessonSlugs = [
    "circle-chord-angle",
    "further-angle-properties-circles",
    "circle-tangents",
    "intersecting-chords-secants-tangents",
  ];

  for (const slug of circleLessonSlugs) {
    const lesson = lessons.find((candidate) => candidate.slug === slug);
    assert.ok(lesson, `Missing lesson ${slug}`);
    assert.equal(
      lesson.workedExamples.filter((example) => extractDiagramData(example)).length,
      lesson.workedExamples.length,
      `${slug} should give every worked example a visual`
    );
  }
});

test("spatial circle questions carry typed circle diagrams", () => {
  const lessons = getVisibleNewCourseLessons(
    "year-10-mathematics-advanced",
    "geometrical-figures-circle-geometry"
  );
  const spatialPattern = /intersecting chords?|cyclic|semicircle|diameter|same[- ]segment|central angle|angle at the centre|tangent|chord/i;
  const misses: string[] = [];

  for (const lesson of lessons) {
    for (const question of [
      ...lesson.guidedPractice,
      ...lesson.independentPractice,
      ...lesson.masteryQuiz,
    ]) {
      if (!spatialPattern.test(question.prompt)) continue;
      if (extractDiagramData(question)?.type !== "circleGeometryDiagram") {
        misses.push(`${lesson.slug}/${question.id}`);
      }
    }
  }

  assert.deepEqual(misses, []);
});

test("intersecting-chord questions make students form the equation from the diagram", () => {
  const lesson = getVisibleNewCourseLessons(
    "year-10-mathematics-advanced",
    "geometrical-figures-circle-geometry"
  ).find((candidate) => candidate.slug === "intersecting-chords-secants-tangents");
  assert.ok(lesson);
  const calculationQuestions = [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
  ].filter((question) => question.id.match(/-(?:g2|g4|i2|i4|i5|m1|m3|m6|m7|m9|m10)$/));

  assert.equal(calculationQuestions.length, 11);
  for (const question of calculationQuestions) {
    assert.match(question.prompt, /as shown/i);
    assert.equal(question.latex, "");
    assert.doesNotMatch(question.prompt, /\d+\s*[×x]\s*\d+\s*=/);
    assert.equal(extractDiagramData(question)?.type, "circleGeometryDiagram");
  }
});

test("equal-tangent figures distinguish length labels from right-angle facts", () => {
  const lessons = getVisibleNewCourseLessons(
    "year-10-mathematics-advanced",
    "geometrical-figures-circle-geometry"
  );
  const questions = lessons.flatMap((lesson) => [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
  ]);
  const algebraQuestion = questions.find((question) => question.id.endsWith("y10-geometry-tangent-m7"));
  const proofQuestion = questions.find((question) => question.id.endsWith("y10-geometry-proof-m9"));
  assert.ok(algebraQuestion);
  assert.ok(proofQuestion);

  const algebraLabels = (extractDiagramData(algebraQuestion)?.segments as Array<{ label?: string }>).map((segment) => segment.label).filter(Boolean);
  const proofLabels = (extractDiagramData(proofQuestion)?.segments as Array<{ label?: string }>).map((segment) => segment.label).filter(Boolean);
  assert.deepEqual(algebraLabels.slice(0, 2), ["3y + 2", "20"]);
  assert.doesNotMatch(proofLabels.join(" "), /90/);
});

test("conceptual circle figures show relationships without inventing equal unknowns", () => {
  const lessons = getVisibleNewCourseLessons(
    "year-10-mathematics-advanced",
    "geometrical-figures-circle-geometry"
  );
  const questions = lessons.flatMap((lesson) => [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
  ]);
  const centreQuestion = questions.find((question) => question.id.endsWith("y10-fc-i1"));
  const cyclicQuestion = questions.find((question) => question.id.endsWith("y10-fc-m2"));
  assert.ok(centreQuestion);
  assert.ok(cyclicQuestion);

  const centreLabels = (extractDiagramData(centreQuestion)?.angles as Array<{ label?: string }>).map((angle) => angle.label);
  const cyclicLabels = (extractDiagramData(cyclicQuestion)?.angles as Array<{ label?: string }>).map((angle) => angle.label);
  assert.deepEqual(centreLabels, ["2θ", "θ"]);
  assert.deepEqual(cyclicLabels, ["α", "β"]);
});

test("all generated Year 10 geometry figures render without invalid SVG values", () => {
  const lessons = getVisibleNewCourseLessons(
    "year-10-mathematics-advanced",
    "geometrical-figures-circle-geometry"
  );
  let renderedCount = 0;

  for (const lesson of lessons) {
    for (const item of [
      ...lesson.workedExamples,
      ...lesson.guidedPractice,
      ...lesson.independentPractice,
      ...lesson.masteryQuiz,
    ]) {
      const data = extractDiagramData(item);
      if (!data || !["lineAngleDiagram", "circleGeometryDiagram", "trianglePairDiagram"].includes(String(data.type))) continue;
      const rendered = renderDiagramData(data);
      assert.ok(rendered);
      const markup = renderToStaticMarkup(rendered);
      assert.doesNotMatch(markup, /NaN|undefined/);
      renderedCount += 1;
    }
  }

  assert.ok(renderedCount >= 100, `Expected broad visual coverage, rendered ${renderedCount}`);
});
