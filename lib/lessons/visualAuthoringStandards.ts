import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { DIAGRAM_SPECS } from "./diagramRegistry";
import type {
  BarChartDiagram,
  BearingsDiagram,
  BoxPlotDiagram,
  DotPlotDiagram,
  LineAngleDiagram,
  NetworkDiagram,
  PlaneShapeDiagram,
  ScatterPlotDiagram,
  SectorDiagram,
  Solid3DDiagram,
  StemAndLeafDiagram,
  TriangleDiagram,
} from "./types";

function hasVisual(item: object) {
  const fields = item as Record<string, unknown>;
  return DIAGRAM_SPECS.some((spec) => Boolean(fields[spec.field]));
}

function cleanMathText(value: string) {
  return value
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\(?:mathrm|operatorname)\{([^}]*)\}/g, "$1")
    .replace(/\\times/g, "×")
    .replace(/\$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function measurement(text: string, names: string[]) {
  const aliases = names.map((name) => name.replace(/\s+/g, "\\s+")).join("|");
  const match = text.match(
    new RegExp(
      `\\b(?:${aliases})\\b\\s*(?:of|is|=|measures?|has length)?\\s*(\\d+(?:\\.\\d+)?|[a-z])\\s*(mm|cm|m|km)?\\b`,
      "i"
    )
  );
  if (!match) return undefined;
  return `${match[1]}${match[2] ? ` ${match[2]}` : ""}`;
}

function firstDegreeLabels(text: string) {
  return [...text.matchAll(/(?:\(|\b)([^,;.]{0,18}?(?:x|\d+)[^,;.]{0,12}?)\s*(?:°|\\circ)/gi)]
    .map((match) => match[1].trim().replace(/^.*?\b(?:is|of)\s+/i, ""))
    .filter((value, index, values) => value.length <= 24 && values.indexOf(value) === index)
    .slice(0, 2)
    .map((value) => `${value}°`);
}

function namedNumber(text: string, names: string[]) {
  const aliases = names.join("|");
  const match = text.match(new RegExp(`\\b(?:${aliases})\\b\\s*(?:=|is|of)?\\s*(-?\\d+(?:\\.\\d+)?)`, "i"));
  return match ? Number(match[1]) : undefined;
}

function boxPlotVisual(text: string): BoxPlotDiagram | null {
  if (!/\bbox(?:-and-whisker)? plot\b|\bboxplot\b/i.test(text)) return null;
  const min = namedNumber(text, ["min(?:imum)?"]);
  const q1 = namedNumber(text, ["q_?1", "first quartile"]);
  const median = namedNumber(text, ["median", "q_?2"]);
  const q3 = namedNumber(text, ["q_?3", "third quartile"]);
  const max = namedNumber(text, ["max(?:imum)?"]);
  if ([min, q1, median, q3, max].some((value) => value === undefined)) return null;
  if (!(min! <= q1! && q1! <= median! && median! <= q3! && q3! <= max!)) return null;
  return {
    description: `Box plot with minimum ${min}, first quartile ${q1}, median ${median}, third quartile ${q3}, and maximum ${max}.`,
    plots: [{ label: "Data", min, q1: q1!, median: median!, q3: q3!, max }],
    showValueLabels: true,
  };
}

const numberWord: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
  seven: 7, eight: 8, nine: 9, ten: 10,
};

function dotPlotVisual(text: string): DotPlotDiagram | null {
  if (!/\bdot plot\b/i.test(text)) return null;
  const counts = new Map<number, number>();
  const add = (value: number, count: number) => {
    if (Number.isFinite(value) && Number.isInteger(count) && count > 0) counts.set(value, count);
  };
  for (const match of text.matchAll(/(\d+(?:\.\d+)?)\s*\(\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s*dots?\s*\)/gi)) {
    add(Number(match[1]), Number(match[2]) || numberWord[match[2].toLowerCase()]);
  }
  for (const match of text.matchAll(/(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+dots?\s+at\s+(?:the value\s+)?(\d+(?:\.\d+)?)/gi)) {
    add(Number(match[2]), Number(match[1]) || numberWord[match[1].toLowerCase()]);
  }
  for (const match of text.matchAll(/(\d+(?:\.\d+)?)\s*\(\s*[×x]\s*(\d+)\s*\)/gi)) add(Number(match[1]), Number(match[2]));
  if (counts.size < 2) return null;
  const entries = [...counts].sort((a, b) => a[0] - b[0]);
  return {
    description: `Dot plot with ${entries.map(([value, count]) => `${count} dot${count === 1 ? "" : "s"} at ${value}`).join(", ")}.`,
    min: entries[0][0],
    max: entries.at(-1)![0],
    counts: entries.map(([value, count]) => ({ value, count })),
  };
}

function barChartVisual(text: string): BarChartDiagram | null {
  if (!/\b(?:bar|column) (?:graph|chart)\b/i.test(text)) return null;
  const stimulus = text.split(/\b(?:what|which|find|calculate|how many|is this)\b/i)[0];
  const bars: BarChartDiagram["bars"] = [];
  for (const match of stimulus.matchAll(/(?:^|[:,;])\s*([A-Za-z][A-Za-z' -]{0,24}?)\s+\$?(\d+(?:\.\d+)?)(?=\s*(?:[,;.]|$))/g)) {
    const label = match[1].trim().replace(/^(?:and|then)\s+/i, "");
    if (!/^(?:from|to|of|at|total)$/i.test(label)) bars.push({ label, value: Number(match[2]) });
  }
  if (bars.length < 2) return null;
  return {
    description: `Column graph with ${bars.map((bar) => `${bar.label} at ${bar.value}`).join(", ")}.`,
    bars,
    valueAxisLabel: "Value",
    categoryAxisLabel: "Category",
  };
}

function scatterPlotVisual(text: string): ScatterPlotDiagram | null {
  if (!/\b(?:scatter(?:plot)?|bivariate|correlation|line of best fit)\b/i.test(text)) return null;
  const points = [...text.matchAll(/\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g)]
    .map((match) => ({ x: Number(match[1]), y: Number(match[2]) }));
  if (points.length < 3) return null;
  return {
    description: `Scatter plot of the ${points.length} coordinate pairs supplied in the question.`,
    points,
    xAxisLabel: "x",
    yAxisLabel: "y",
    lineOfBestFit: /line of best fit|regression/i.test(text) ? "auto" : undefined,
  };
}

function sectorVisual(text: string): SectorDiagram | null {
  if (!/\bsector\b|\barc length\b/i.test(text)) return null;
  const degreeMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:°|\\circ)/);
  const radianMatch = text.match(/(?:angle|theta|θ)\s*(?:of|=|is)?\s*(?:(\d+(?:\.\d+)?)\s*)?(?:π|\\pi)(?:\s*\/\s*(\d+(?:\.\d+)?))?/i);
  let angleDegrees = degreeMatch ? Number(degreeMatch[1]) : undefined;
  if (angleDegrees === undefined && radianMatch) angleDegrees = 180 * Number(radianMatch[1] ?? 1) / Number(radianMatch[2] ?? 1);
  const radius = measurement(text, ["radius"]);
  if (angleDegrees === undefined || angleDegrees <= 0 || angleDegrees > 360) return null;
  return {
    description: `Circle sector with central angle ${angleDegrees}°${radius ? ` and radius ${radius}` : ""}.`,
    angleDegrees,
    angleLabel: `${angleDegrees}°`,
    radiusLabel: radius,
    showFullCircle: true,
    color: "blue",
  };
}

function stemAndLeafVisual(text: string): StemAndLeafDiagram | null {
  if (!/\bstem-and-leaf\b|\bstem and leaf\b/i.test(text)) return null;
  const rows = [...text.matchAll(/\b(\d+)\s*\|\s*((?:\d+\s+)*\d+)(?=\s*(?:,\s*\d+\s*\||\.|$))/g)]
    .map((match) => ({
      stem: Number(match[1]),
      leaves: match[2].trim().split(/\s+/).map(Number),
    }));
  if (rows.length === 0) return null;
  return {
    description: `Stem-and-leaf plot with ${rows.map((row) => `stem ${row.stem} and leaves ${row.leaves.join(", ")}`).join("; ")}.`,
    rows,
    keyText: `${rows[0].stem} | ${rows[0].leaves[0]} = ${rows[0].stem}${rows[0].leaves[0]}`,
    rightLabel: "Data",
  };
}

function solidVisual(text: string): Solid3DDiagram | null {
  if (/\b(?:composite|combined|joined|attached|stacked|hollow|frustum|hemisphere|net)\b/i.test(text)) return null;

  let solid: Solid3DDiagram["solid"] | null = null;
  if (/\btriangular prism\b/i.test(text)) solid = "triangularPrism";
  else if (/\b(?:rectangular prism|cuboid)\b/i.test(text)) solid = "rectangularPrism";
  else if (/\bsquare(?:-based)? pyramid\b/i.test(text)) solid = "squarePyramid";
  else if (/\bcylinder\b/i.test(text)) solid = "cylinder";
  else if (/\bcone\b/i.test(text)) solid = "cone";
  else if (/\bsphere\b/i.test(text)) solid = "sphere";
  else if (/\bcube\b/i.test(text)) solid = "cube";
  if (!solid) return null;

  const labels: NonNullable<Solid3DDiagram["labels"]> = {};
  const radius = measurement(text, ["radius"]);
  const height = measurement(text, ["perpendicular height", "vertical height", "height"]);
  const length = measurement(text, ["prism length", "length"]);
  const width = measurement(text, ["width"]);
  const slant = measurement(text, ["slant height", "slant"]);
  const base = measurement(text, ["base edge", "base side", "base"]);
  const side = measurement(text, ["side length", "edge length", "side", "edge"]);

  if (radius) labels.radius = radius;
  if (height) labels.height = height;
  if (length) labels.length = length;
  if (width) labels.width = width;
  if (slant) labels.slant = slant;
  if (base) labels.base = base;
  if (solid === "cube" && side) labels.length = side;

  const names: Record<Solid3DDiagram["solid"], string> = {
    rectangularPrism: "rectangular prism",
    cube: "cube",
    cylinder: "cylinder",
    cone: "cone",
    squarePyramid: "square-based pyramid",
    triangularPrism: "triangular prism",
    sphere: "sphere",
  };
  const details = Object.entries(labels).map(([name, value]) => `${name} ${value}`).join(", ");
  return {
    solid,
    labels,
    color: "blue",
    description: `Schematic ${names[solid]}${details ? ` labelled with ${details}` : ""}.`,
  };
}

function numberPairAfter(text: string, phrase: RegExp) {
  const match = text.match(
    new RegExp(`${phrase.source}[^\\d]{0,24}(\\d+(?:\\.\\d+)?)\\s*(mm|cm|m|km)?[^\\d]{0,18}(?:and|,|by|×|x)\\s*(\\d+(?:\\.\\d+)?)\\s*(mm|cm|m|km)?`, "i")
  );
  if (!match) return null;
  const unit1 = match[2] ?? match[4] ?? "";
  const unit2 = match[4] ?? match[2] ?? "";
  return {
    first: Number(match[1]),
    second: Number(match[3]),
    firstLabel: `${match[1]}${unit1 ? ` ${unit1}` : ""}`,
    secondLabel: `${match[3]}${unit2 ? ` ${unit2}` : ""}`,
  };
}

function triangleVisual(text: string): TriangleDiagram | null {
  const isRightTriangle = /\b(?:right triangle|right-angled triangle|right angled triangle|hypotenuse)\b/i.test(text);
  const isElevation = /\bangle of (?:elevation|depression)\b/i.test(text);
  if (!isRightTriangle && !isElevation) return null;
  const legs = numberPairAfter(text, /\blegs?\b/i);
  const hypotenuse = measurement(text, ["hypotenuse"]);
  const awayMatch = text.match(/\b(?:from\s+)?(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s+away\b/i);
  const horizontalMatch = text.match(/\b(?:horizontal(?:ly)?(?: distance)?|distance)\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?/i);
  const heightMatch = text.match(/\b(?:building|cliff|pole|tower|tree)\s+is\s+(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?\s+(?:high|tall)\b/i);
  const angles = firstDegreeLabels(text);
  const sideLabels: TriangleDiagram["sideLabels"] = {};
  if (legs) {
    sideLabels.AB = legs.firstLabel;
    sideLabels.AC = legs.secondLabel;
  }
  if (hypotenuse) sideLabels.BC = hypotenuse;
  const horizontal = awayMatch ?? horizontalMatch;
  if (horizontal) sideLabels.AB = `${horizontal[1]}${horizontal[2] ? ` ${horizontal[2]}` : ""}`;
  if (heightMatch) sideLabels.AC = `${heightMatch[1]}${heightMatch[2] ? ` ${heightMatch[2]}` : ""}`;
  return {
    description: `${isElevation ? "Line-of-sight" : "Right-angled"} triangle${legs ? ` with perpendicular legs ${legs.firstLabel} and ${legs.secondLabel}` : ""}${horizontal ? ` with horizontal distance ${sideLabels.AB}` : ""}${heightMatch ? ` and vertical height ${sideLabels.AC}` : ""}${hypotenuse ? ` and hypotenuse ${hypotenuse}` : ""}${angles[0] ? `; the ground angle is ${angles[0]}` : ""}.`,
    vertices: { A: { x: 0, y: 4 }, B: { x: 7, y: 4 }, C: { x: 0, y: 0 } },
    vertexLabels: { A: "A", B: "B", C: "C" },
    sideLabels,
    angleLabels: angles[0] ? { B: angles[0] } : undefined,
    rightAngleAt: "A",
  };
}

function trapezoidVisual(text: string): PlaneShapeDiagram | null {
  if (!/\b(?:trapezoid|trapezium)\b/i.test(text)) return null;
  const sides = numberPairAfter(text, /\bparallel sides?\b/i);
  if (!sides) return null;
  const height = measurement(text, ["perpendicular height", "height"]);
  const h = height ? Number.parseFloat(height) : Math.max(2, Math.min(sides.first, sides.second) / 2);
  const bottom = Math.max(sides.first, sides.second);
  const top = Math.min(sides.first, sides.second);
  const bottomLabel = sides.first >= sides.second ? sides.firstLabel : sides.secondLabel;
  const topLabel = sides.first >= sides.second ? sides.secondLabel : sides.firstLabel;
  const inset = Math.max(0.5, (bottom - top) / 2);
  return {
    description: `Trapezium with parallel sides ${sides.firstLabel} and ${sides.secondLabel}${height ? ` and perpendicular height ${height}` : ""}.`,
    vertices: [
      { x: 0, y: 0, label: "A", rightAngle: true },
      { x: bottom, y: 0, label: "B" },
      { x: inset + top, y: h, label: "C" },
      { x: inset, y: h, label: "D", rightAngle: true },
    ],
    edges: [
      { label: bottomLabel, arrows: 1 },
      {},
      { label: topLabel, arrows: 1 },
      height ? { label: height } : {},
    ],
    fill: "blue",
    showVertexDots: true,
  };
}

function rhombusVisual(text: string): LineAngleDiagram | PlaneShapeDiagram | null {
  if (!/\brhombus\b/i.test(text)) return null;
  const diagonals = numberPairAfter(text, /\bdiagonals?\b/i);
  const side = measurement(text, ["sides of length", "side length", "each side", "side"]);
  if (diagonals) {
    return {
      description: `Rhombus with perpendicular diagonals ${diagonals.firstLabel} and ${diagonals.secondLabel}.`,
      points: [
        { id: "A", x: 0, y: diagonals.second / 2, label: "A" },
        { id: "B", x: diagonals.first / 2, y: 0, label: "B" },
        { id: "C", x: 0, y: -diagonals.second / 2, label: "C" },
        { id: "D", x: -diagonals.first / 2, y: 0, label: "D" },
        { id: "O", x: 0, y: 0, label: "O" },
      ],
      segments: [
        { from: "A", to: "B", ticks: 1 }, { from: "B", to: "C", ticks: 1 },
        { from: "C", to: "D", ticks: 1 }, { from: "D", to: "A", ticks: 1 },
        { from: "A", to: "C", label: diagonals.secondLabel },
        { from: "B", to: "D", label: diagonals.firstLabel },
      ],
      angles: [{ vertex: "O", from: "A", to: "B", rightAngle: true }],
    };
  }
  const degrees = [...text.matchAll(/(?:\(|\b)(\d+(?:\.\d+)?)\s*(?:°|\\circ)/g)].map((match) => `${match[1]}°`);
  return {
    description: `Rhombus with four equal sides${side ? ` of length ${side}` : ""}${degrees[0] ? ` and one angle ${degrees[0]}` : ""}.`,
    vertices: [
      { x: 0, y: 3, label: "A", angleLabel: degrees[0] },
      { x: 5, y: 0, label: "B" },
      { x: 0, y: -3, label: "C" },
      { x: -5, y: 0, label: "D" },
    ],
    edges: [
      { label: side, ticks: 1 }, { ticks: 1 }, { ticks: 1 }, { ticks: 1 },
    ],
    fill: "blue",
    showVertexDots: true,
  };
}

function quadrilateralVisual(text: string): PlaneShapeDiagram | null {
  if (!/\bquadrilateral\b/i.test(text)) return null;
  const stimulus = text.split(/\b(?:find|calculate|what|which)\b/i)[0];
  const tokens = [...stimulus.matchAll(/(?:\(|\b)(\d+(?:\.\d+)?)\s*(?:°|\\circ)/g)]
    .map((match) => `${match[1]}°`)
    .slice(0, 4);
  const ratio = text.match(/ratio\s+(\d+)\s*:\s*(\d+)\s*:\s*(\d+)\s*:\s*(\d+)/i);
  const labels = ratio
    ? ratio.slice(1, 5).map((value) => value === "1" ? "x" : `${value}x`)
    : tokens.length === 3 ? [...tokens, "?"] : tokens;
  return {
    description: `Quadrilateral${labels.length ? ` with consecutive interior-angle labels ${labels.join(", ")}` : " illustrating its four interior angles"}.`,
    vertices: [
      { x: 0, y: 0, label: "A", angleLabel: labels[0] },
      { x: 7, y: 0.5, label: "B", angleLabel: labels[1] },
      { x: 5.5, y: 5, label: "C", angleLabel: labels[2] },
      { x: 0.5, y: 4, label: "D", angleLabel: labels[3] },
    ],
    fill: "blue",
    showVertexDots: true,
  };
}

function regularPolygonVisual(text: string): PlaneShapeDiagram | null {
  if (!/\b(?:regular )?polygon\b/i.test(text)) return null;
  // Inferring the polygon from its angle would draw the very side count the
  // student is being asked to determine, so keep those formula questions text-only.
  if (/\b(?:how many sides|number of sides|find (?:the )?(?:number of )?sides)\b/i.test(text)) return null;
  let sides: number | undefined;
  const explicit = text.match(/\b(\d+)\s*(?:-| )sided\s+polygon\b|\bpolygon\s+has\s+(\d+)\s+(?:equal\s+)?sides\b/i);
  if (explicit) sides = Number(explicit[1] ?? explicit[2]);
  const exterior = text.match(/\bexterior angle(?: of| equal to| is| =)?\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i);
  if (!sides && exterior) sides = 360 / Number(exterior[1]);
  const interior = text.match(/\binterior angle(?: of| equal to| is| =)?\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i);
  if (!sides && interior) sides = 360 / (180 - Number(interior[1]));
  const sum = text.match(/\binterior angle sum(?: of| equal to| is| =)?\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)/i);
  if (!sides && sum) sides = Number(sum[1]) / 180 + 2;
  if (!sides || !Number.isInteger(sides) || sides < 3 || sides > 30) return null;
  const side = measurement(text, ["sides of length", "side length", "each side", "side"]);
  const radius = 5;
  const angleLabel = interior ? `${interior[1]}°` : undefined;
  const angleDescription = interior
    ? ` and interior angle ${interior[1]}°`
    : exterior
      ? ` with exterior angle ${exterior[1]}° given in the question`
      : "";
  return {
    description: `Regular ${sides}-sided polygon${side ? ` with side length ${side}` : ""}${angleDescription}.`,
    vertices: Array.from({ length: sides }, (_, index) => {
      const angle = Math.PI / 2 + (2 * Math.PI * index) / sides;
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), angleLabel: index === 0 ? angleLabel : undefined };
    }),
    edges: Array.from({ length: sides }, (_, index) => ({ label: index === 0 ? side : undefined, ticks: 1 })),
    fill: "blue",
  };
}

function parallelogramVisual(text: string): LineAngleDiagram | null {
  if (!/\bparallelogram\b/i.test(text)) return null;
  const base = measurement(text, ["base"]);
  const height = measurement(text, ["perpendicular height", "height"]);
  const sidePair = numberPairAfter(text, /\bsides?\b/i);
  const baseValue = base ? Number.parseFloat(base) : sidePair?.first ?? 8;
  const heightValue = height ? Number.parseFloat(height) : 4;
  const baseLabel = base ?? sidePair?.firstLabel;
  const sideLabel = measurement(text, ["slant side"]) ?? sidePair?.secondLabel;
  const points: LineAngleDiagram["points"] = [
    { id: "A", x: 0, y: heightValue, label: "A" },
    { id: "B", x: baseValue, y: heightValue, label: "B" },
    { id: "C", x: baseValue + 2, y: 0, label: "C" },
    { id: "D", x: 2, y: 0, label: "D" },
  ];
  const segments: LineAngleDiagram["segments"] = [
    { from: "A", to: "B", label: baseLabel, parallelMarks: 1 },
    { from: "B", to: "C", label: sideLabel, parallelMarks: 2 },
    { from: "C", to: "D", parallelMarks: 1 },
    { from: "D", to: "A", parallelMarks: 2 },
  ];
  const angles: NonNullable<LineAngleDiagram["angles"]> = [];
  if (height) {
    points.push({ id: "H", x: 2, y: heightValue, label: "H" });
    segments.push({ from: "D", to: "H", label: height, dashed: true });
    angles.push({ vertex: "H", from: "D", to: "A", rightAngle: true });
  }
  return {
    description: `Parallelogram${baseLabel ? ` with base ${baseLabel}` : ""}${height ? ` and perpendicular height ${height}` : ""}${sideLabel ? `; sloping side ${sideLabel}` : ""}.`,
    points,
    segments,
    angles: angles.length ? angles : undefined,
  };
}

function intersectingLinesVisual(text: string): LineAngleDiagram | null {
  if (!/\b(?:vertically opposite|two (?:straight )?lines (?:cross|intersect))\b/i.test(text)) return null;
  const labels = firstDegreeLabels(text);
  const angles: NonNullable<LineAngleDiagram["angles"]> = [];
  if (labels[0]) angles.push({ vertex: "O", from: "A", to: "C", label: labels[0], highlighted: true });
  if (labels[1]) angles.push({ vertex: "O", from: "B", to: "D", label: labels[1] });
  return {
    description: `Two straight lines intersect at O${labels[0] ? `, with one angle labelled ${labels[0]}` : ""}.`,
    points: [
      { id: "A", x: 0, y: 0, label: "A" },
      { id: "B", x: 6, y: 6, label: "B" },
      { id: "C", x: 0, y: 6, label: "C" },
      { id: "D", x: 6, y: 0, label: "D" },
      { id: "O", x: 3, y: 3, label: "O" },
    ],
    segments: [{ from: "A", to: "B" }, { from: "C", to: "D" }],
    angles: angles.length ? angles : undefined,
    viewBox: "-1 -1 8 8",
  };
}

function parallelLinesVisual(text: string): LineAngleDiagram | null {
  if (!/\b(?:parallel lines?|transversal|co-interior|corresponding angle|alternate angle)\b/i.test(text)) return null;
  const labels = firstDegreeLabels(text);
  const relation = /co-interior/i.test(text) ? "co-interior" : /alternate/i.test(text) ? "alternate" : /corresponding/i.test(text) ? "corresponding" : "related";
  const angles: NonNullable<LineAngleDiagram["angles"]> = [];
  if (labels[0]) angles.push({ vertex: "U", from: relation === "co-interior" ? "A" : "B", to: "V", label: labels[0], highlighted: true });
  if (labels[1]) angles.push({ vertex: "V", from: relation === "alternate" ? "D" : "C", to: "U", label: labels[1] });
  return {
    description: `Two parallel lines cut by a transversal, showing ${relation} angle positions${labels.length ? ` labelled ${labels.join(" and ")}` : ""}.`,
    points: [
      { id: "A", x: 0, y: 1, label: "A" }, { id: "U", x: 3, y: 1, label: "U" }, { id: "B", x: 8, y: 1, label: "B" },
      { id: "C", x: 0, y: 5, label: "C" }, { id: "V", x: 5, y: 5, label: "V" }, { id: "D", x: 8, y: 5, label: "D" },
      { id: "E", x: 2.25, y: -0.5, label: "E" }, { id: "F", x: 5.75, y: 6.5, label: "F" },
    ],
    segments: [
      { from: "A", to: "B", parallelMarks: 1 },
      { from: "C", to: "D", parallelMarks: 1 },
      { from: "E", to: "F" },
    ],
    angles: angles.length ? angles : undefined,
    viewBox: "-1 -1 10 9",
  };
}

function bearingsVisual(text: string): BearingsDiagram | null {
  if (!/\bbearing(?:s)?\b/i.test(text)) return null;
  const values = [...text.matchAll(/\b(\d{1,3})\s*(?:°|\\circ)/g)]
    .map((match) => Number(match[1]))
    .filter((value, index, values) => value >= 0 && value < 360 && values.indexOf(value) === index)
    .slice(0, 4);
  for (const match of text.matchAll(/\b([NS])\s*(\d+(?:\.\d+)?)\s*(?:°|\\circ)?\s*([EW])\b/gi)) {
    const angle = Number(match[2]);
    const first = match[1].toUpperCase();
    const second = match[3].toUpperCase();
    const bearing = first === "N" ? (second === "E" ? angle : 360 - angle) : (second === "E" ? 180 - angle : 180 + angle);
    if (!values.includes(bearing)) values.push(bearing);
  }
  if (values.length === 0) return null;
  const fromMatch = text.match(/bearing of\s+([A-Z])\s+from\s+([A-Z])/i);
  return {
    description: `Compass diagram with ${values.map((value) => `${String(value).padStart(3, "0")}°`).join(" and ")} bearing ray${values.length === 1 ? "" : "s"} measured clockwise from north.`,
    originLabel: fromMatch?.[2]?.toUpperCase() ?? "O",
    rays: values.map((bearing, index) => ({
      bearing,
      label: index === 0 ? fromMatch?.[1]?.toUpperCase() ?? "A" : String.fromCharCode(65 + index),
      showAngle: true,
    })),
    color: "blue",
  };
}

function networkVisual(text: string): NetworkDiagram | null {
  if (!/\b(?:network|edges?|route|path)\b/i.test(text)) return null;
  const edgeMap = new Map<string, { from: string; to: string; weight?: number; directed?: boolean }>();
  const addEdge = (from: string, to: string, weight?: number, directed = false) => {
    const key = directed ? `${from}->${to}` : [from, to].sort().join("-");
    edgeMap.set(key, { from, to, weight, directed: directed || undefined });
  };
  for (const match of text.matchAll(/\b([A-Z])([A-Z])\s*(?:\(\s*(\d+(?:\.\d+)?)\s*\)|=\s*(\d+(?:\.\d+)?))/g)) {
    addEdge(match[1], match[2], Number(match[3] ?? match[4]));
  }
  for (const match of text.matchAll(/\b([A-Z])\s*[-–—]\s*([A-Z])\s*(?:\(\s*(\d+(?:\.\d+)?)\s*\)|=\s*(\d+(?:\.\d+)?))/g)) {
    addEdge(match[1], match[2], Number(match[3] ?? match[4]));
  }
  for (const match of text.matchAll(/\b([A-Z])\s*(?:→|->)\s*([A-Z])\b/g)) addEdge(match[1], match[2], undefined, true);
  if (edgeMap.size < 2) return null;
  const edges = [...edgeMap.values()];
  const ids = [...new Set(edges.flatMap((edge) => [edge.from, edge.to]))].sort();
  const radius = 4;
  return {
    description: `Network with ${ids.length} vertices and edges ${edges.map((edge) => `${edge.from}${edge.directed ? " to " : "–"}${edge.to}${edge.weight === undefined ? "" : ` of weight ${edge.weight}`}`).join(", ")}.`,
    vertices: ids.map((id, index) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * index) / ids.length;
      return { id, label: id, x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    }),
    edges,
  };
}

type InferredVisual = BarChartDiagram | BearingsDiagram | BoxPlotDiagram | DotPlotDiagram | LineAngleDiagram | NetworkDiagram | PlaneShapeDiagram | ScatterPlotDiagram | SectorDiagram | Solid3DDiagram | StemAndLeafDiagram | TriangleDiagram;

function inferVisual(textValue: string): InferredVisual | null {
  const text = cleanMathText(textValue);
  return boxPlotVisual(text) ?? dotPlotVisual(text) ?? stemAndLeafVisual(text) ?? barChartVisual(text) ?? scatterPlotVisual(text) ?? sectorVisual(text) ?? bearingsVisual(text) ?? networkVisual(text) ?? intersectingLinesVisual(text) ?? parallelLinesVisual(text) ?? triangleVisual(text) ?? trapezoidVisual(text) ?? rhombusVisual(text) ?? quadrilateralVisual(text) ?? regularPolygonVisual(text) ?? parallelogramVisual(text) ?? solidVisual(text);
}

function attachVisual<T extends object>(item: T, visual: InferredVisual): T {
  if ("plots" in visual) return { ...item, boxPlotDiagram: visual };
  if ("rows" in visual) return { ...item, stemAndLeafDiagram: visual };
  if ("counts" in visual || ("min" in visual && "max" in visual && "values" in visual)) return { ...item, dotPlotDiagram: visual };
  if ("bars" in visual) return { ...item, barChartDiagram: visual };
  if ("angleDegrees" in visual) return { ...item, sectorDiagram: visual };
  if ("points" in visual && "xAxisLabel" in visual) return { ...item, scatterPlotDiagram: visual };
  if ("rays" in visual) return { ...item, bearingsDiagram: visual };
  if ("edges" in visual && "vertices" in visual && Array.isArray(visual.vertices) && visual.vertices.length > 0 && "id" in visual.vertices[0]) {
    return { ...item, diagram: visual };
  }
  if ("solid" in visual) return { ...item, solid3DDiagram: visual };
  if ("vertices" in visual && !Array.isArray(visual.vertices)) return { ...item, triangleDiagram: visual };
  if ("points" in visual) return { ...item, lineAngleDiagram: visual };
  return { ...item, planeShapeDiagram: visual };
}

export function applyQuestionVisualStandards(question: PracticeQuestion): PracticeQuestion {
  if (hasVisual(question) || question.choices?.some(hasVisual)) return question;
  const visual = inferVisual(`${question.prompt} ${question.latex}`);
  if (!visual) return question;
  const prompt = /\b(?:use|from|shown in) (?:the |this )?(?:diagram|figure)\b/i.test(question.prompt)
    ? question.prompt
    : `Use the diagram to answer the question. ${question.prompt}`;
  return attachVisual({ ...question, prompt, latex: "" }, visual);
}

export function applyWorkedExampleVisualStandards(example: WorkedExample): WorkedExample {
  if (hasVisual(example)) return example;
  const visual = inferVisual(example.questionLatex);
  return visual ? attachVisual(example, visual) : example;
}

export function applyLessonVisualStandards(lesson: ExplicitLesson): ExplicitLesson;
export function applyLessonVisualStandards(
  lesson: ExplicitLesson,
  options: { inferQuestions?: boolean; inferWorkedExamples?: boolean }
): ExplicitLesson;
export function applyLessonVisualStandards(
  lesson: ExplicitLesson,
  options: { inferQuestions?: boolean; inferWorkedExamples?: boolean } = {}
): ExplicitLesson {
  const mapQuestion = options.inferQuestions === false
    ? (question: PracticeQuestion) => question
    : applyQuestionVisualStandards;
  const mapWorkedExample = options.inferWorkedExamples === false
    ? (example: WorkedExample) => example
    : applyWorkedExampleVisualStandards;
  return {
    ...lesson,
    workedExamples: lesson.workedExamples.map(mapWorkedExample),
    guidedPractice: lesson.guidedPractice.map(mapQuestion),
    independentPractice: lesson.independentPractice.map(mapQuestion),
    masteryQuiz: lesson.masteryQuiz.map(mapQuestion),
    masteryQuizPool: lesson.masteryQuizPool?.map(mapQuestion),
    multiPartPractice: lesson.multiPartPractice?.map(mapQuestion),
  };
}
