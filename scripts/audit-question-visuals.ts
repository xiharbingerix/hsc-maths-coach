/**
 * Question-bank visual audit.
 *
 * Unlike audit-lessons.ts, this scans every row prepared by the question-bank
 * seeder: lesson practice, mastery pools, challenge pools and exam questions.
 * It deliberately classifies only the stimulus (prompt/latex/part prompts),
 * not ordinary answer text, so a distractor such as "the graph is increasing"
 * cannot create a false "missing visual" finding by itself.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  collectAllQuestions,
  SUPPORTED_COURSE_SLUGS,
} from "./seed-question-bank";

type BankRow = ReturnType<typeof collectAllQuestions>["rows"][number];

type VisualKind =
  | "argandDiagram"
  | "barChartDiagram"
  | "bearingsDiagram"
  | "boxPlotDiagram"
  | "cartesianGraph"
  | "circleGeometryDiagram"
  | "dotPlotDiagram"
  | "dataTableDiagram"
  | "ganttChartDiagram"
  | "histogramDiagram"
  | "lineAngleDiagram"
  | "netDiagram"
  | "networkDiagram"
  | "normalDistributionDiagram"
  | "numberLineDiagram"
  | "pieChartDiagram"
  | "planeShapeDiagram"
  | "polynomialCurveDiagram"
  | "probabilityTreeDiagram"
  | "scatterPlotDiagram"
  | "sectorDiagram"
  | "slopeFieldDiagram"
  | "solid3DDiagram"
  | "stemAndLeafDiagram"
  | "stepGraphDiagram"
  | "trapezoidalRuleDiagram"
  | "triangleDiagram"
  | "trianglePairDiagram"
  | "trigGraphDiagram"
  | "twoWayTableDiagram"
  | "unitCircleDiagram"
  | "vector2DDiagram"
  | "vector3DDiagram"
  | "vennDiagram";

type Finding = {
  sourceId: string;
  course: string;
  topic: string;
  lesson: string;
  suggestedVisual: VisualKind;
  reason: string;
  excerpt: string;
};

const explicitVisualReference =
  /\b(?:use|using|read|from|shown|displayed|sketch(?:ed)?|drawn|plotted|according to|in)\s+(?:the\s+|this\s+|a\s+)?(?:graph|diagram|figure|plot|chart|number line|network|table|tree|solid|shape)\b|\b(?:graph|diagram|figure|plot|chart|number line|network|table|tree|solid|shape)\s+(?:below|above|shown|displayed|provided)\b/i;

function stimulus(row: BankRow) {
  const partText = (row.question_parts ?? [])
    .flatMap((part) => [part.prompt, part.latex])
    .filter((value): value is string => typeof value === "string");
  return [row.prompt, row.latex, ...partText].filter(Boolean).join(" ");
}

function compact(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, 210);
}

function hasChoiceVisual(row: BankRow) {
  return (row.choices ?? []).some((choice) =>
    Object.keys(choice).some((key) => key.endsWith("Diagram") || key === "cartesianGraph" || key === "diagram")
  );
}

function chooseVisual(row: BankRow, text: string): { kind: VisualKind; reason: string } | null {
  const value = text.toLowerCase();
  const context = `${row.topic_slug} ${row.subtopic_slug}`.toLowerCase();
  const has = (...terms: string[]) => terms.some((term) => value.includes(term));
  const contextHas = (...terms: string[]) => terms.some((term) => context.includes(term));

  if (
    contextHas("vectors") &&
    /\b(?:head-to-tail|parallelogram|collinear|intersect(?:ing|ion)?\b[\s\S]{0,60}\bx-axis|2d vector diagram)\b/i.test(text)
  ) {
    return { kind: "vector2DDiagram", reason: "two-dimensional vector geometry needs directed arrows or a labelled configuration" };
  }

  if (has("argand", "complex plane")) {
    return { kind: "argandDiagram", reason: "complex-plane geometry is encoded in prose or notation" };
  }
  if (has("3d vector", "line in three dimensions", "plane in three dimensions") ||
      (contextHas("vectors-3d") && /\b(?:line|plane|point|direction|intersection|parallel|perpendicular)\b/i.test(text))) {
    return { kind: "vector3DDiagram", reason: "three-dimensional vector geometry needs a spatial stimulus" };
  }
  if (has("slope field", "direction field")) {
    return { kind: "slopeFieldDiagram", reason: "a slope field is an inherently visual stimulus" };
  }
  if ((has("trapezoidal rule") || contextHas("trapezoidal-rule")) && /\b(?:ordinate|strip|sampled|area|curve|table|values?)\b/i.test(text)) {
    return { kind: "trapezoidalRuleDiagram", reason: "trapezoidal ordinates/strips are supplied as text" };
  }
  if (has("stem-and-leaf", "stem and leaf")) {
    if (/\d\s*\||\bleaves?\b|\bstems?\s+\d|\bvalues?\s+in\s+order\b/i.test(text)) {
      return { kind: "stemAndLeafDiagram", reason: "a stem-and-leaf display is referenced or written as text" };
    }
  }
  if (has("box plot", "box-and-whisker", "boxplot")) {
    if (/\b(?:min(?:imum)?|max(?:imum)?|q_?1|q_?3|quartile|median|whisker|outlier|skew|symmetric|box (?:from|spans)|side-by-side|two box plots?)\b/i.test(text)) {
      return { kind: "boxPlotDiagram", reason: "a box plot is referenced or reduced to a five-number list" };
    }
  }
  if (has("dot plot")) {
    if (/\b(?:dots?|cluster|isolated|outlier|values?|scores?|goals?)\b/i.test(text)) {
      return { kind: "dotPlotDiagram", reason: "a dot plot is referenced or described in prose" };
    }
  }
  if (has("histogram")) {
    return { kind: "histogramDiagram", reason: "a histogram is referenced or described in prose" };
  }
  if (has("scatter", "correlation", "line of best fit", "bivariate") || contextHas("scatter-plots")) {
    return { kind: "scatterPlotDiagram", reason: "a scatter pattern is supplied as coordinate prose/list data" };
  }
  if (has("gantt", "activity schedule", "project schedule") || contextHas("gantt")) {
    return { kind: "ganttChartDiagram", reason: "a project schedule is supplied as prose instead of a Gantt chart" };
  }
  if (has("bar chart", "bar graph", "column graph", "column chart")) {
    if (/\b(?:shows?|axis|gridline|bar reaches|column reaches|frequency|sales|attendance|temperature|votes?|categories?)\b/i.test(text)) {
      return { kind: "barChartDiagram", reason: "a categorical chart is referenced or described in prose" };
    }
  }
  if (has("pie chart", "sector graph")) {
    return { kind: "pieChartDiagram", reason: "a pie chart is referenced or described in prose" };
  }
  if (has("normal distribution", "normal curve", "bell curve") && /\b(?:graph|curve|shad|region|area|tail|display)\b/i.test(text)) {
    return { kind: "normalDistributionDiagram", reason: "a normal-curve region is part of the stimulus" };
  }
  if (has("two-way table", "two way table", "contingency table")) {
    return { kind: "twoWayTableDiagram", reason: "a two-way table is referenced or written inline" };
  }
  if (
    /\b(?:table|tabulated)\b/i.test(text) ||
    /\b(?:from|using)\s+the\s+(?:following\s+)?(?:survey|data|values?|results?)\b/i.test(text)
  ) {
    return { kind: "dataTableDiagram", reason: "tabular stimulus is referenced or written inline" };
  }
  if (has("venn diagram", "venn")) {
    return { kind: "vennDiagram", reason: "set regions are referenced or described without a Venn diagram" };
  }
  if (has("tree diagram", "probability tree")) {
    return { kind: "probabilityTreeDiagram", reason: "probability branches are referenced or described without a tree" };
  }
  if (has("bearing", "navigation") && /\d\s*(?:°|\\circ)|\b[NS]\s*\d|\b(?:north|south|east|west|compass|ray|route|travel|from\s+[A-Z]\s+to\s+[A-Z])\b/i.test(text)) {
    return { kind: "bearingsDiagram", reason: "bearing directions and rays are encoded in prose" };
  }
  // A subtraction inside a trig compound-angle formula (for example sin(A-B))
  // is not an edge list. Keep the generic A-B heuristic from treating it as one.
  const isTrigCompound = /\\(?:sin|cos|tan)\s*\([^)]*[A-Z]\s*-\s*[A-Z]/.test(text);
  if (!isTrigCompound && ((explicitVisualReference.test(text) && /\b(?:network|vertices|edges|path|route)\b/i.test(text)) ||
      /\b(?:[Ee]dges?|[Rr]outes?|[Pp]aths?)\s*:?\s*(?:[A-Z][–—-][A-Z]|[A-Z]{2}\s*(?:\(|=))|\b[A-Z]\s*(?:→|->|[–—-])\s*[A-Z]|\b(?:AB|BC|CD|PQ|QR)\s*(?:\(|=)\s*\d/.test(text))) {
    return { kind: "networkDiagram", reason: "network topology is referenced or encoded as an edge list" };
  }
  if (contextHas("network", "critical-path") && has("network", "path", "flow", "vertices", "edges")) {
    return { kind: "networkDiagram", reason: "network reasoning requires a visible topology" };
  }
  if (has("number line")) {
    return { kind: "numberLineDiagram", reason: "a number-line position or interval is part of the stimulus" };
  }
  if (has("unit circle")) {
    return { kind: "unitCircleDiagram", reason: "unit-circle position/sign reasoning is visual" };
  }
  if (has("sine graph", "cosine graph", "tangent graph", "trig graph", "trigonometric graph")) {
    return { kind: "trigGraphDiagram", reason: "a trigonometric graph is referenced or described in prose" };
  }
  if (has("circle theorem", "cyclic quadrilateral", "intersecting chord", "angle at the centre", "angle at the circumference", "tangent-chord")) {
    return { kind: "circleGeometryDiagram", reason: "circle-theorem geometry depends on a figure" };
  }
  if (has("parallel lines", "transversal", "vertically opposite", "co-interior", "corresponding angle", "alternate angle")) {
    return { kind: "lineAngleDiagram", reason: "the line/angle arrangement is encoded in prose" };
  }
  if (/\b(?:sector|arc length)\b/i.test(text) && /\b(?:radius|angle|area|length|diagram|figure)\b/i.test(text)) {
    return { kind: "sectorDiagram", reason: "sector geometry is supplied only as dimensions" };
  }
  if (has("net diagram", "nets of") || (has("net of") && has("solid", "prism", "cube", "cylinder", "cone", "pyramid"))) {
    return { kind: "netDiagram", reason: "a solid net is referenced or described in prose" };
  }
  if (has("composite solid")) {
    return { kind: "solid3DDiagram", reason: "the composite solid is assembled only in prose" };
  }
  if (has("prism", "pyramid", "cylinder", "cone", "sphere", "cuboid") && /\b(?:volume|surface area|cross-section|radius|height|length|width|solid)\b/i.test(text)) {
    return { kind: "solid3DDiagram", reason: "a three-dimensional solid is supplied only as dimensions" };
  }
  if (has("right triangle", "right-angled triangle", "right angled triangle", "angle of elevation", "angle of depression", "hypotenuse") && /\b(?:side|angle|height|distance|length|find|calculate)\b/i.test(text)) {
    return { kind: "triangleDiagram", reason: "triangle geometry is encoded in prose" };
  }
  if (/\b(?:angles? of a triangle add to|each angle of an equilateral triangle|an isosceles triangle has|exterior angle of a triangle equals|similar triangles (?:have|always)|usual test that two triangles are similar|interior angle sum of an? n-sided polygon|regular polygon(?:'s)? interior angle|regular polygon has an? (?:interior|exterior) angle)\b/i.test(text)) {
    return null;
  }
  if (has("triangle") && contextHas("trigonometry", "sine-rule", "cosine-rule", "triangle")) {
    return { kind: "triangleDiagram", reason: "non-right triangle measurements or relationships are encoded in prose" };
  }
  if (has("similar triangles", "congruent triangles", "two triangles")) {
    return { kind: "trianglePairDiagram", reason: "a comparison between two triangles needs both figures" };
  }
  if (has("trapezoid", "trapezium", "parallelogram", "rhombus", "quadrilateral", "polygon", "composite shape") && /\b(?:area|perimeter|angle|side|height|diagonal|parallel)\b/i.test(text)) {
    return { kind: "planeShapeDiagram", reason: "plane-shape dimensions/relationships are encoded in prose" };
  }

  if (explicitVisualReference.test(text)) {
    if (has("polynomial", "root", "multiplicity") || contextHas("polynomial", "curve-sketch")) {
      return { kind: "polynomialCurveDiagram", reason: "the prompt explicitly refers to a polynomial graph" };
    }
    if (has("step graph", "step function") || contextHas("step-function")) {
      return { kind: "stepGraphDiagram", reason: "the prompt explicitly refers to a step graph" };
    }
    return { kind: "cartesianGraph", reason: "the prompt explicitly refers to an absent graph/figure" };
  }

  if (has("graph", "curve") && contextHas("algebra", "quadratic", "reciprocal", "simultaneous")) {
    return { kind: "cartesianGraph", reason: "a function graph is referenced without a graph payload" };
  }
  if (has("shape") && contextHas("bivariate", "statistics", "distribution")) {
    return { kind: "histogramDiagram", reason: "distribution shape is referenced without a statistical display" };
  }

  return null;
}

function auditRows(rows: BankRow[]) {
  const findings: Finding[] = [];
  for (const row of rows) {
    if (row.diagram_data || hasChoiceVisual(row)) continue;
    const text = stimulus(row);
    const suggestion = chooseVisual(row, text);
    if (!suggestion) continue;
    findings.push({
      sourceId: row.source_id,
      course: row.course_slug,
      topic: row.topic_slug,
      lesson: row.subtopic_slug,
      suggestedVisual: suggestion.kind,
      reason: suggestion.reason,
      excerpt: compact(text),
    });
  }
  return findings;
}

function batchFindings() {
  const directory = join(process.cwd(), "question-batches");
  const findings: Array<{ file: string; sourceId: string; suggestedVisual: VisualKind; reason: string }> = [];
  for (const file of readdirSync(directory).filter((name) => name.endsWith(".json"))) {
    const parsed = JSON.parse(readFileSync(join(directory, file), "utf8")) as {
      questions?: Array<Record<string, unknown>>;
    };
    for (const record of parsed.questions ?? []) {
      if (record.diagram_data) continue;
      const row = {
        source_id: String(record.source_id ?? record.id ?? "unknown"),
        course_slug: String(record.course_slug ?? "batch"),
        topic_slug: String(record.topic_slug ?? ""),
        subtopic_slug: String(record.subtopic_slug ?? ""),
        prompt: String(record.prompt ?? ""),
        latex: typeof record.latex === "string" ? record.latex : null,
        question_parts: Array.isArray(record.question_parts) ? record.question_parts : null,
        choices: Array.isArray(record.choices) ? record.choices : null,
        diagram_data: null,
      } as BankRow;
      const suggestion = chooseVisual(row, stimulus(row));
      if (suggestion) {
        findings.push({ file, sourceId: row.source_id, suggestedVisual: suggestion.kind, reason: suggestion.reason });
      }
    }
  }
  return findings;
}

const courseIndex = process.argv.indexOf("--course");
const requestedCourse = courseIndex >= 0 ? process.argv[courseIndex + 1] : undefined;
if (requestedCourse && !SUPPORTED_COURSE_SLUGS.some((slug) => slug === requestedCourse)) {
  throw new Error(`Unsupported course slug: ${requestedCourse}`);
}
const selectedCourses = requestedCourse
  ? [requestedCourse as (typeof SUPPORTED_COURSE_SLUGS)[number]]
  : [...SUPPORTED_COURSE_SLUGS];
const { rows } = collectAllQuestions(selectedCourses);
const findings = auditRows(rows);
const byVisual = new Map<string, number>();
const byCourse = new Map<string, number>();
const byLesson = new Map<string, number>();
for (const finding of findings) {
  byVisual.set(finding.suggestedVisual, (byVisual.get(finding.suggestedVisual) ?? 0) + 1);
  byCourse.set(finding.course, (byCourse.get(finding.course) ?? 0) + 1);
  const lessonKey = `${finding.course}/${finding.topic}/${finding.lesson}`;
  byLesson.set(lessonKey, (byLesson.get(lessonKey) ?? 0) + 1);
}

console.log("NOVA MATHS QUESTION-BANK VISUAL AUDIT");
console.log(`Rows inspected: ${rows.length}`);
console.log(`Rows with a visual payload: ${rows.filter((row) => row.diagram_data || hasChoiceVisual(row)).length}`);
console.log(`Visual-required rows without a payload: ${findings.length}`);
const uniqueStimuli = new Set(
  findings.map((finding) => `${finding.suggestedVisual}\u0000${finding.excerpt}`)
);
console.log(`Unique missing visual stimuli (course clones collapsed): ${uniqueStimuli.size}`);
console.log("\nBy suggested renderer:");
for (const [kind, count] of [...byVisual].sort((a, b) => b[1] - a[1])) console.log(`  ${kind}: ${count}`);
console.log("\nBy course:");
for (const [course, count] of [...byCourse].sort((a, b) => b[1] - a[1])) console.log(`  ${course}: ${count}`);
console.log("\nLargest remaining lesson groups:");
for (const [lesson, count] of [...byLesson].sort((a, b) => b[1] - a[1]).slice(0, 60)) {
  console.log(`  ${lesson}: ${count}`);
}

const detailed = process.argv.includes("--details");
if (detailed) {
  console.log("\nFindings:");
  for (const finding of findings) {
    console.log(`  ${finding.sourceId} :: ${finding.suggestedVisual}`);
    console.log(`    ${finding.reason}: ${finding.excerpt}`);
  }
}

const batches = requestedCourse ? [] : batchFindings();
console.log(`\nJSON batch visual-required rows without a payload: ${batches.length}`);
if (detailed) {
  for (const finding of batches) {
    console.log(`  ${finding.file}/${finding.sourceId} :: ${finding.suggestedVisual} (${finding.reason})`);
  }
}

if (process.argv.includes("--fail") && (findings.length > 0 || batches.length > 0)) process.exitCode = 1;
