import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../app/components/diagramRegistry";
import { getChallengeQuestions } from "../challenges";
import { getNewCourseUnitLessons } from "../newCourseCatalog";
import { extractDiagramData } from "./diagramRegistry";
import type { PracticeQuestion, WorkedExample } from "./differentialCalculus";

const unitSlug = "properties-geometrical-figures";
const courses = [
  "year-9-mathematics-core",
  "year-9-mathematics-advanced",
] as const;

const minimumQuestionCoverage: Record<string, number> = {
  "angles-and-triangles": 0.7,
  "parallel-lines": 0.85,
  "quadrilaterals-polygons": 0.2,
  "congruent-triangles": 0.8,
  "congruence-in-proof": 0.8,
  "enlargement-similar-figures": 0.8,
  "similar-triangles": 0.8,
  "proving-similar-triangles": 0.8,
};

const allowedTextOnly: Record<string, RegExp> = {
  "angles-and-triangles":
    /right angle|angles of a triangle add|equilateral triangle|an isosceles triangle has:|straight angle|exterior angle of a triangle equals:/i,
  "parallel-lines": /angles on parallel lines are:|angles on parallel lines add to:|vertically opposite angles are:/i,
  "quadrilaterals-polygons": /angles add to:|pentagon|hexagon|octagon|heptagon|decagon|nonagon|dodecagon|regular polygon|n-sided|20-sided|15-sided|square|exterior angles of any polygon/i,
  "congruent-triangles": /congruent figures are:|which is not|corresponding parts that are:|rhs applies only to:/i,
  "congruence-in-proof": /corresponding parts are:|to prove two sides equal|vertices should be named:|corresponding angles are:|to prove a triangle is isosceles/i,
  "enlargement-similar-figures": /similar figures have angles that are:|the scale factor equals:|similar figures have the same:|scale factor less than 1/i,
  "similar-triangles": /similar triangles have:|similar triangles have sides that are:|usual test that two triangles are similar|similar triangles always have:/i,
  "proving-similar-triangles": /how many equal angles|similarity differs from congruence|two equal angles is enough|the aa test needs:|similar triangles have sides that are:/i,
};

function lessonQuestions(lesson: ReturnType<typeof getNewCourseUnitLessons>[number]) {
  return [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
    ...(lesson.masteryQuizPool ?? []),
  ];
}

function assertVisualPrompt(item: PracticeQuestion) {
  assert.match(
    item.prompt,
    /diagram|shown|labelled (?:triangle|quadrilateral)|labels in the (?:triangle|quadrilateral)/i,
    `${item.id} should direct the student to its visual`
  );
  assert.ok(
    item.latex === "" || item.latex === "\\text{Select A, B, C, or D.}",
    `${item.id} should not duplicate its diagram in LaTeX`
  );
}

function findQuestion(id: string): PracticeQuestion {
  for (const course of courses) {
    for (const lesson of getNewCourseUnitLessons(course, unitSlug)) {
      const question = [
        ...lessonQuestions(lesson),
        ...getChallengeQuestions(lesson.slug, course),
      ].find((candidate) => candidate.id === id || candidate.id.endsWith(id));
      if (question) return question;
    }
  }
  throw new Error(`Question ${id} not found`);
}

test("Year 9 geometry lessons meet their diagram-first coverage contract", () => {
  const seenSlugs = new Set<string>();

  for (const course of courses) {
    for (const lesson of getNewCourseUnitLessons(course, unitSlug)) {
      seenSlugs.add(lesson.slug);
      assert.equal(
        lesson.workedExamples.filter(extractDiagramData).length,
        lesson.workedExamples.length,
        `${course}/${lesson.slug} should give every worked example a diagram`
      );

      const questions = lessonQuestions(lesson);
      const withVisual = questions.filter(extractDiagramData);
      const minimum = minimumQuestionCoverage[lesson.slug];
      assert.ok(minimum !== undefined, `Missing coverage rule for ${lesson.slug}`);
      assert.ok(
        withVisual.length / questions.length >= minimum,
        `${course}/${lesson.slug} has only ${withVisual.length}/${questions.length} diagram questions`
      );

      for (const question of questions) {
        if (extractDiagramData(question)) {
          assertVisualPrompt(question);
          continue;
        }
        assert.match(
          question.prompt,
          allowedTextOnly[lesson.slug],
          `${course}/${lesson.slug}/${question.id} is spatial but has no diagram`
        );
      }
    }
  }

  assert.deepEqual([...seenSlugs].sort(), Object.keys(minimumQuestionCoverage).sort());
});

test("Year 9 geometry challenge pools use diagrams for every spatial challenge", () => {
  for (const course of courses) {
    for (const lesson of getNewCourseUnitLessons(course, unitSlug)) {
      for (const question of getChallengeQuestions(lesson.slug, course)) {
        if (extractDiagramData(question)) {
          assertVisualPrompt(question);
          continue;
        }
        assert.match(
          question.prompt,
          allowedTextOnly[lesson.slug],
          `${course}/${lesson.slug}/${question.id} challenge is spatial but has no diagram`
        );
      }
    }
  }
});

test("all Year 9 geometry visuals serialize and render as finite accessible SVG", () => {
  const uniquePayloads = new Map<string, ReturnType<typeof extractDiagramData>>();

  for (const course of courses) {
    for (const lesson of getNewCourseUnitLessons(course, unitSlug)) {
      const items: Array<PracticeQuestion | WorkedExample> = [
        ...lesson.workedExamples,
        ...lessonQuestions(lesson),
        ...getChallengeQuestions(lesson.slug, course),
      ];
      for (const item of items) {
        const payload = extractDiagramData(item);
        if (!payload) continue;
        uniquePayloads.set(JSON.stringify(payload), payload);
      }
    }
  }

  assert.ok(uniquePayloads.size >= 80, `Expected a varied diagram bank; found ${uniquePayloads.size}`);
  for (const payload of uniquePayloads.values()) {
    assert.ok(payload);
    const rendered = renderDiagramData(payload);
    assert.ok(rendered, `No renderer for ${payload.type}`);
    const markup = renderToStaticMarkup(React.createElement(React.Fragment, null, rendered));
    assert.match(markup, /role="img"|role="group"/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("diagram labels preserve the quantities and relationships in the source questions", () => {
  const ratioAngles = findQuestion("y9-at-p3");
  assert.match(ratioAngles.prompt, /largest angle/i);
  assert.deepEqual(ratioAngles.triangleDiagram?.angleLabels, { A: "1k", B: "2k", C: "3k" });

  const rightIsosceles = findQuestion("y9-at-m8");
  assert.equal(rightIsosceles.triangleDiagram?.rightAngleAt, "C");
  assert.equal(rightIsosceles.triangleDiagram?.angleLabels?.C, "90\u00b0");

  const area = findQuestion("y9-es-p6").trianglePairDiagram;
  assert.equal(area?.leftCaption, "Area = 20");
  assert.equal(area?.relationLabel, "linear SF 2");
  assert.equal(area?.rightCaption, "Area = x");

  const imageOriginal = findQuestion("y9-es-p10").trianglePairDiagram;
  assert.equal(imageOriginal?.left.sideLabels?.AB, "7");
  assert.equal(imageOriginal?.right.sideLabels?.AB, "21");

  const nested = findQuestion("y9-st-p4").lineAngleDiagram;
  assert.ok(nested);
  const segmentLabel = (from: string, to: string) =>
    nested.segments.find((segment) => segment.from === from && segment.to === to)?.label;
  assert.equal(segmentLabel("A", "D"), "4");
  assert.equal(segmentLabel("A", "B"), "6");
  assert.equal(segmentLabel("A", "E"), "6");
  assert.equal(segmentLabel("A", "C"), "x");

  const fractionalScale = findQuestion("y9-st-p9").trianglePairDiagram;
  assert.equal(fractionalScale?.left.sideLabels?.AB, "100");
  assert.equal(fractionalScale?.relationLabel, "scale factor 1/20");
  assert.equal(fractionalScale?.right.sideLabels?.AB, "x");

  const aas = findQuestion("y9-ct-p6").trianglePairDiagram;
  assert.equal(aas?.left.angleLabels?.A, "50°");
  assert.equal(aas?.left.angleLabels?.B, "60°");
  assert.equal(aas?.left.sideLabels?.AB, undefined);

  const rhs = findQuestion("y9-ct-p4").trianglePairDiagram;
  assert.equal(rhs?.left.rightAngleAt, "B");
  assert.equal(rhs?.left.sideLabels?.AC, "13");
  assert.equal(rhs?.left.sideLabels?.AB, "5");

  const angleFromSum = findQuestion("y9-cp-p3").congruentTrianglesDiagram;
  assert.equal(angleFromSum?.left.angleLabels?.A, "50°");
  assert.equal(angleFromSum?.left.angleLabels?.B, "60°");
  assert.equal(angleFromSum?.right.angleLabels?.C, "x");

  const sideDespiteAngle = findQuestion("y9-ct-p8").congruentTrianglesDiagram;
  assert.equal(sideDespiteAngle?.left.sideLabels?.BC, "12");
  assert.equal(sideDespiteAngle?.right.sideLabels?.BC, "x");

  const sssSimilarity = findQuestion("y9-ps-p5").trianglePairDiagram;
  assert.deepEqual(sssSimilarity?.left.sideLabels, { AB: "4", AC: "6", BC: "8" });
  assert.deepEqual(sssSimilarity?.right.sideLabels, { AB: "6", AC: "9", BC: "12" });

  const sasSimilarity = findQuestion("y9-ps-p9").trianglePairDiagram;
  assert.deepEqual(sasSimilarity?.left.sideLabels, { AB: "3", AC: "4" });
  assert.deepEqual(sasSimilarity?.right.sideLabels, { AB: "6", AC: "8" });
  assert.equal(sasSimilarity?.left.angleLabels?.A, "50°");

  const reduction = findQuestion("y9-st-m10").trianglePairDiagram;
  assert.equal(reduction?.left.sideLabels?.AB, "10");
  assert.equal(reduction?.relationLabel, "scale factor 1/2");

  const coreLessons = getNewCourseUnitLessons(courses[0], unitSlug);
  const angleWorked = coreLessons.find((lesson) => lesson.slug === "angles-and-triangles")?.workedExamples[1];
  assert.equal(angleWorked?.lineAngleDiagram?.angles?.[0]?.label, "70°");
  assert.equal(angleWorked?.lineAngleDiagram?.angles?.[1]?.label, "50°");
  assert.equal(angleWorked?.lineAngleDiagram?.angles?.[2]?.label, "x");

  const enlargementWorked = coreLessons.find((lesson) => lesson.slug === "enlargement-similar-figures")?.workedExamples[1];
  assert.equal(enlargementWorked?.trianglePairDiagram?.left.sideLabels?.AB, "4");
  assert.equal(enlargementWorked?.trianglePairDiagram?.right.sideLabels?.AB, "x");
  assert.equal(enlargementWorked?.trianglePairDiagram?.relationLabel, "scale factor 3");

  const similarityWorked = coreLessons.find((lesson) => lesson.slug === "similar-triangles")?.workedExamples[0];
  assert.equal(similarityWorked?.trianglePairDiagram?.left.sideLabels?.AB, "5");
  assert.equal(similarityWorked?.trianglePairDiagram?.right.sideLabels?.AB, "10");
  assert.equal(similarityWorked?.trianglePairDiagram?.relationLabel, "scale factor = x");
});

test("diagram-first rewrites remove the old relationship-giveaway formats", () => {
  const badPromptPatterns = [
    /^Find the corresponding angle to/i,
    /^Find the alternate angle to/i,
    /^Similar triangles:\s*\d+\/\d+\s*=/i,
    /^Which test:\s*(?:three pairs|two sides|right angle)/i,
    /^Congruent triangles,\s*(?:a side|an angle)/i,
  ];

  for (const course of courses) {
    for (const lesson of getNewCourseUnitLessons(course, unitSlug)) {
      for (const question of [
        ...lessonQuestions(lesson),
        ...getChallengeQuestions(lesson.slug, course),
      ]) {
        for (const pattern of badPromptPatterns) {
          assert.doesNotMatch(question.prompt, pattern, `${lesson.slug}/${question.id}`);
        }
      }
    }
  }

  assert.equal(
    extractDiagramData(findQuestion("y9-qp-p1")),
    null,
    "an inferred polygon must not reveal the side count being assessed"
  );
  assert.equal(
    extractDiagramData(findQuestion("y9-qp-p3")),
    null,
    "an inferred polygon must not reveal the side count being assessed"
  );
});
