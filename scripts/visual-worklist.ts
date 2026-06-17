import { writeFileSync } from "node:fs";
import {
  getNewCourseUnitLessons,
  newCoursePathways,
} from "../lib/newCourseCatalog";
import { year12AdvancedRouteUnits } from "../lib/year12AdvancedRoutes";
import { DIAGRAM_SPECS } from "../lib/lessons/diagramRegistry";
import type {
  ExplicitLesson,
  PracticeQuestion,
} from "../lib/lessons/differentialCalculus";

// Standalone worklist of "visual helpful but not required" questions that ship
// no diagram payload, so we can author diagrams for them. Mirrors the visual
// classification in audit-lessons.ts, and additionally covers the legacy
// year-12-advanced course (which the new-catalog audit does not see).

const visualRequiredPattern =
  /\b(?:read|use|using|from|shown (?:in|on)|given (?:in|on)|according to)\s+(?:the\s+)?(?:graph|diagram|figure|box(?:-and-whisker)? plot|tree diagram|venn(?: diagram)?|two-way table|network diagram|argand diagram|3d vector diagram)\b|\b(?:graph|diagram|figure|box(?:-and-whisker)? plot|tree diagram|venn(?: diagram)?|two-way table|network diagram|argand diagram|3d vector diagram)\s+(?:below|above|shown)\b/i;
const visualHelpfulPattern =
  /\bgraph|diagram|figure|box(?:-and-whisker)? plot|tree diagram|venn(?: diagram)?|two-way table|network diagram|argand diagram|3d vector diagram|trapezoidal rule|area between curves|circle theorem\b/i;
const tableDataPattern = /\btable|data set|data below|values below|following data|frequency table\b/i;

function questionRecords(lesson: ExplicitLesson) {
  return [
    ...lesson.guidedPractice.map((q) => ({ section: "guided", question: q })),
    ...lesson.independentPractice.map((q) => ({ section: "independent", question: q })),
    ...lesson.masteryQuiz.map((q) => ({ section: "mastery", question: q })),
    ...(lesson.multiPartPractice ?? []).map((q) => ({ section: "multiPartPractice", question: q })),
  ];
}

function hasItemVisualPayload(item: PracticeQuestion) {
  const fields = item as unknown as Record<string, unknown>;
  return Boolean(
    ("solutionDiagram" in item && (item as Record<string, unknown>).solutionDiagram) ||
      DIAGRAM_SPECS.some((spec) => fields[spec.field])
  );
}

function questionStimulusText(question: PracticeQuestion) {
  return [
    question.prompt,
    question.latex,
    ...(question.choices?.map((c) => c.text) ?? []),
    ...(question.parts?.flatMap((p) => [p.prompt, p.latex]) ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function hasSelfContainedTableData(text: string) {
  const numericTokens = text.match(/-?\d+(?:\.\d+)?/g) ?? [];
  return (
    tableDataPattern.test(text) &&
    numericTokens.length >= 3 &&
    /[,;:|]|\n|\brow\b|\bcolumn\b|\bfrequency\b/i.test(text)
  );
}

function suggestDiagram(text: string): string {
  const t = text.toLowerCase();
  const has = (...kw: string[]) => kw.some((k) => t.includes(k));
  if (has("box plot", "box-and-whisker", "boxplot")) return "boxPlotDiagram";
  if (has("stem-and-leaf", "stem and leaf")) return "stemAndLeafDiagram";
  if (has("dot plot")) return "dotPlotDiagram";
  if (has("histogram")) return "histogramDiagram";
  if (has("scatter", "line of best fit", "correlation")) return "scatterPlotDiagram";
  if (has("pie chart", "sector graph")) return "pieChartDiagram";
  if (has("bar chart", "bar graph", "column graph")) return "barChartDiagram";
  if (has("venn")) return "vennDiagram";
  if (has("two-way table", "two way table")) return "twoWayTableDiagram";
  if (has("tree diagram", "with replacement", "without replacement", "two-stage", "two stage")) return "probabilityTreeDiagram";
  if (has("normal distribution", "bell curve", "empirical rule", "z-score", "z score")) return "normalDistributionDiagram";
  if (has("argand", "complex plane")) return "argandDiagram";
  if (has("trapezoidal")) return "trapezoidalRuleDiagram";
  if (has("unit circle")) return "unitCircleDiagram";
  if (has("bearing")) return "bearingsDiagram";
  if (has("network", "vertices", "edges", "shortest path", "minimum spanning")) return "networkDiagram";
  if (has("number line", "inequality on")) return "numberLineDiagram";
  if (has("step graph", "step function")) return "stepGraphDiagram";
  if (has("sector", "arc length")) return "sectorDiagram";
  if (has("net of", "net diagram")) return "netDiagram";
  if (has("surface area", "volume", "prism", "cylinder", "cone", "sphere", "pyramid", "solid")) return "solid3DDiagram";
  if ((has("sin", "cos", "tan", "sine", "cosine") && has("graph", "curve", "amplitude", "period"))) return "trigGraphDiagram";
  if (has("triangle", "angle of elevation", "angle of depression", "right-angled", "right angled", "hypotenuse")) return "triangleDiagram";
  if (has("vector") && has("3d", "i j k", "three dimension")) return "vector3DDiagram";
  if (has("slope field", "direction field")) return "slopeFieldDiagram";
  if (has("polynomial") && has("graph", "sketch", "curve")) return "polynomialCurveDiagram";
  if (has("parabola", "quadratic graph", "vertex", "axis of symmetry")) return "cartesianGraph";
  if (has("plane shape", "polygon", "quadrilateral", "rectangle", "square ", "parallelogram", "trapezium")) return "planeShapeDiagram";
  if (has("graph", "gradient", "y-intercept", "x-intercept", "line ", "curve", "sketch", "coordinate", "asymptote", "area between")) return "cartesianGraph";
  return "cartesianGraph";
}

type Item = { course: string; unit: string; lesson: string; section: string; id: string; type: string; excerpt: string };
const items: Item[] = [];

function scan(course: string, unit: string, lesson: ExplicitLesson) {
  for (const { section, question } of questionRecords(lesson)) {
    const text = questionStimulusText(question);
    if (!text.trim() || hasItemVisualPayload(question)) continue;
    if (hasSelfContainedTableData(text)) continue;
    if (visualRequiredPattern.test(text)) continue; // handled separately
    if (!visualHelpfulPattern.test(text)) continue;
    items.push({
      course,
      unit,
      lesson: lesson.slug,
      section,
      id: question.id,
      type: suggestDiagram(text),
      excerpt: text.replace(/\s+/g, " ").trim().slice(0, 160),
    });
  }
}

for (const course of newCoursePathways) {
  for (const unit of course.units) {
    for (const lesson of getNewCourseUnitLessons(course.slug, unit.slug)) {
      scan(course.slug, unit.slug, lesson);
    }
  }
}
for (const unit of year12AdvancedRouteUnits) {
  for (const lesson of unit.lessons) {
    scan("year-12-advanced", (lesson as unknown as { moduleSlug: string }).moduleSlug, lesson);
  }
}

const byCourse: Record<string, number> = {};
const byType: Record<string, number> = {};
for (const it of items) {
  byCourse[it.course] = (byCourse[it.course] || 0) + 1;
  byType[it.type] = (byType[it.type] || 0) + 1;
}

console.log("TOTAL helpful-no-payload items:", items.length, "\n");
console.log("By course:");
Object.entries(byCourse).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log("  " + String(n).padStart(4) + "  " + c));
console.log("\nBy suggested diagram type:");
Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log("  " + String(n).padStart(4) + "  " + t));

writeFileSync("visual-worklist.json", JSON.stringify(items, null, 2));
console.log("\nWrote visual-worklist.json (" + items.length + " items)");
