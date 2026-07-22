import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../app/components/diagramRegistry";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import { getNewCourse, getNewCourseUnitLessons } from "../newCourseCatalog";
import { DIAGRAM_SPECS, extractDiagramData } from "./diagramRegistry";

const visualWords = /\b(?:graph|diagram|table|chart|plot|sector|circle|triangle|prism|cylinder|bearing|stem-and-leaf|box plot|tree)\b/i;

test("Year 9 Core seeded visual stimuli are complete and renderable", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics-core"]);
  assert.equal(rows.length, 2861);
  assert.equal(warnings.length, 0);

  const byId = new Map(rows.map((row) => [row.source_id, row]));
  const expected: Record<string, string> = {
    "y9c-p2d-11": "triangleDiagram",
    "y9c-y9-brg-g1": "bearingsDiagram",
    "y9c-y9-cc-m7": "sectorDiagram",
    "chal-y9-cc-6": "sectorDiagram",
    "y9c-y9-vp-p9": "compositeSolidDiagram",
    "y9c-y9-td-g4": "probabilityTreeDiagram",
    "y9c-y9-idt-p9": "pieChartDiagram",
    "y9c-y9-sl-m5": "stemAndLeafDiagram",
    "y9c-y9-bp-g2": "boxPlotDiagram",
    "y9c-bp-12": "boxPlotDiagram",
  };

  for (const [id, type] of Object.entries(expected)) {
    const diagram = byId.get(id)?.diagram_data;
    assert.equal(diagram?.type, type, `${id} has the wrong renderer`);
    const rendered = renderDiagramData(diagram);
    assert.ok(rendered, `${id} did not dispatch to a renderer`);
    const markup = renderToStaticMarkup(rendered);
    assert.match(markup, /<(?:svg|table)/);
    assert.doesNotMatch(markup, /NaN|Infinity|undefined/);
  }
});

test("Year 9 Core explicitly visual worked examples carry authored payloads", () => {
  const course = getNewCourse("year-9-mathematics-core");
  assert.ok(course);
  let lessonCount = 0;
  let exampleCount = 0;
  let visualCount = 0;

  for (const unit of course.units) for (const lesson of getNewCourseUnitLessons(course.slug, unit.slug)) {
    lessonCount++;
    for (const [index, example] of lesson.workedExamples.entries()) {
      exampleCount++;
      const fields = DIAGRAM_SPECS.filter((spec) => example[spec.field]);
      visualCount += fields.length;
      if (fields.length > 0) {
        const diagram = extractDiagramData(example);
        const rendered = renderDiagramData(diagram);
        assert.ok(rendered, `${unit.slug}/${lesson.slug}/WE${index + 1} did not dispatch`);
        const markup = renderToStaticMarkup(rendered);
        assert.match(markup, /<(?:svg|table)/);
        assert.doesNotMatch(markup, /NaN|Infinity|undefined/);
      }
      if (visualWords.test(example.questionLatex)) {
        assert.ok(fields.length > 0, `${unit.slug}/${lesson.slug}/WE${index + 1} lacks its visual stimulus`);
      }
    }
  }

  assert.equal(lessonCount, 73);
  assert.equal(exampleCount, 219);
  assert.equal(visualCount, 74);
});
