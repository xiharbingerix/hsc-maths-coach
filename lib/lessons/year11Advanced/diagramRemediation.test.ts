import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../../app/components/diagramRegistry";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourse, getNewCourseUnitLessons } from "../../newCourseCatalog";
import { DIAGRAM_SPECS, extractDiagramData } from "../diagramRegistry";

const explicitVisualWords =
  /\b(graph|diagram|plot|table|triangle|sector|arc length|curve sketch|area under|area between|sign diagram)\b/i;

test("Year 11 Advanced visual references are payload-backed and accessible", () => {
  const { rows, warnings } = collectAllQuestions(["year-11-advanced"]);
  assert.equal(rows.length, 2396);
  assert.equal(warnings.length, 3);

  for (const row of rows) {
    const stimulus = [
      row.prompt,
      row.latex,
      ...(row.question_parts ?? []).flatMap((part) => [part.prompt, part.latex]),
    ].filter(Boolean).join(" ");
    if (explicitVisualWords.test(stimulus)) {
      assert.ok(row.diagram_data, `${row.source_id} lacks its visual stimulus`);
    }
    assert.doesNotMatch(row.prompt, /^Use the diagram to answer the question\./i);
    if (!row.diagram_data) continue;
    assert.ok(
      String(row.diagram_data.description ?? "").length >= 45,
      `${row.source_id} needs meaningful alternative text`,
    );
    assert.doesNotMatch(
      String(row.diagram_data.description),
      /^(Right-angled triangle|Line-of-sight triangle|Schematic|Graph of f)/i,
    );
  }
});

test("all seeded Year 11 Advanced visuals serialize and render finite markup", () => {
  const { rows } = collectAllQuestions(["year-11-advanced"]);
  for (const row of rows) {
    if (!row.diagram_data) continue;
    const rendered = renderDiagramData(row.diagram_data);
    assert.ok(rendered, `${row.source_id} did not dispatch to a renderer`);
    const markup = renderToStaticMarkup(rendered);
    assert.match(markup, /<(?:svg|table)/, `${row.source_id} produced no visual markup`);
    assert.doesNotMatch(markup, /NaN|undefined/, `${row.source_id} rendered invalid values`);
  }
});

test("Year 11 Advanced worked examples with visual language have renderable payloads", () => {
  const course = getNewCourse("year-11-advanced");
  assert.ok(course);
  let lessonCount = 0;

  for (const unit of course.units) {
    for (const lesson of getNewCourseUnitLessons(course.slug, unit.slug)) {
      lessonCount += 1;
      for (const [index, example] of lesson.workedExamples.entries()) {
        const visual = extractDiagramData(example);
        if (explicitVisualWords.test(`${example.title} ${example.questionLatex}`)) {
          assert.ok(visual, `${lesson.slug} worked example ${index + 1} lacks a payload`);
        }
        if (!visual) continue;
        assert.ok(
          DIAGRAM_SPECS.some((spec) => example[spec.field]),
          `${lesson.slug} worked example ${index + 1} has an unregistered payload`,
        );
        const rendered = renderDiagramData(visual);
        assert.ok(rendered, `${lesson.slug} worked example ${index + 1} did not dispatch`);
        const markup = renderToStaticMarkup(rendered);
        assert.doesNotMatch(markup, /NaN|undefined/);
      }
    }
  }

  assert.equal(lessonCount, 129);
});
