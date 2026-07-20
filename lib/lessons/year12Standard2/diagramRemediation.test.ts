import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { renderDiagramData } from "../../../app/components/diagramRegistry";
import { getNewCourse, getNewCourseUnitLessons } from "../../newCourseCatalog";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { DIAGRAM_SPECS } from "../diagramRegistry";

const visualWords = /\b(graph|diagram|figure|plot|chart|table|number line|solid|shape|triangle|network|curve|scatterplot|gantt)\b/i;

function hasChoiceVisual(choices: Array<Record<string, unknown>> | null) {
  return (choices ?? []).some((choice) =>
    Object.keys(choice).some(
      (key) => key === "diagram" || key === "cartesianGraph" || key.endsWith("Diagram")
    )
  );
}

test("Year 12 Standard 2 visual references are fully payload-backed", () => {
  const { rows, warnings } = collectAllQuestions(["year-12-standard-2"]);
  assert.equal(rows.length, 1124);
  assert.equal(warnings.length, 0);

  for (const row of rows) {
    const stimulus = [
      row.prompt,
      row.latex,
      ...(row.question_parts ?? []).flatMap((part) => [part.prompt, part.latex]),
    ].filter(Boolean).join(" ");
    if (visualWords.test(stimulus)) {
      assert.ok(row.diagram_data || hasChoiceVisual(row.choices), `${row.source_id} lacks its visual stimulus`);
    }
    assert.doesNotMatch(row.prompt, /^Use the diagram to answer the question\./);
    if (row.diagram_data) {
      assert.ok(String(row.diagram_data.description ?? "").length >= 20, `${row.source_id} needs meaningful alternative text`);
      assert.doesNotMatch(String(row.diagram_data.description), /^(Right-angled triangle|Line-of-sight triangle|Schematic)/i);
    }
  }
});

test("known contradictory Standard 2 diagrams stay corrected", () => {
  const { rows } = collectAllQuestions(["year-12-standard-2"]);
  const byId = new Map(rows.map((row) => [row.source_id, row]));

  const rightTriangle = byId.get("y12s2-rtv-g2")?.diagram_data;
  assert.equal(rightTriangle?.type, "triangleDiagram");
  assert.equal((rightTriangle?.sideLabels as Record<string, string>).AC, "10 m");
  assert.equal((rightTriangle?.angleLabels as Record<string, string>).A, "30°");

  const nonRight = byId.get("y12s2-trv-i5")?.diagram_data;
  assert.equal(nonRight?.type, "triangleDiagram");
  assert.equal(nonRight?.rightAngleAt, undefined);

  const school = byId.get("y12s2-net-term-i2")?.diagram_data;
  assert.equal(school?.type, "networkDiagram");
  assert.ok(!(school?.edges as Array<{ from: string; to: string }>).some(
    (edge) => [edge.from, edge.to].sort().join("") === "CE"
  ));

  const flow = byId.get("y12s2-flow-m8")?.diagram_data;
  assert.equal(flow?.type, "networkDiagram");
  assert.ok((flow?.edges as Array<{ directed?: boolean }>).every((edge) => edge.directed));
});

test("new table, Gantt and composite-solid payloads serialize and render", () => {
  const { rows } = collectAllQuestions(["year-12-standard-2"]);
  const byId = new Map(rows.map((row) => [row.source_id, row]));
  const expectedTypes: Record<string, string> = {
    "y12s2-alr-i3": "dataTableDiagram",
    "y12s2-gcd-g2": "ganttChartDiagram",
    "y12s2-comp-i1": "compositeSolidDiagram",
    "y12s2-comp-i5": "compositeSolidDiagram",
    "y12s2-comp-m5": "compositeSolidDiagram",
    "y12s2-comp-m8": "compositeSolidDiagram",
  };

  for (const [id, type] of Object.entries(expectedTypes)) {
    const diagram = byId.get(id)?.diagram_data;
    assert.equal(diagram?.type, type, `${id} has the wrong renderer`);
    const rendered = renderDiagramData(diagram);
    assert.ok(rendered, `${id} did not dispatch to a renderer`);
    const markup = renderToStaticMarkup(rendered);
    assert.match(markup, /<(?:svg|table)/);
    assert.doesNotMatch(markup, /NaN|undefined/);
  }
});

test("worked examples with visual language have authored payloads", () => {
  const course = getNewCourse("year-12-standard-2");
  assert.ok(course);
  let lessonCount = 0;
  for (const unit of course.units) {
    for (const lesson of getNewCourseUnitLessons(course.slug, unit.slug)) {
      lessonCount += 1;
      for (const [index, example] of lesson.workedExamples.entries()) {
        if (!visualWords.test(example.questionLatex)) continue;
        assert.ok(
          DIAGRAM_SPECS.some((spec) => example[spec.field]),
          `${lesson.slug} worked example ${index + 1} lacks a payload`
        );
      }
    }
  }
  assert.equal(lessonCount, 58);
});
