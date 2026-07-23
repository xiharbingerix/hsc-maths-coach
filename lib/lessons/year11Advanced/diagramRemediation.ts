import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";
import type {
  BearingsDiagram,
  CartesianGraph,
  DataTableDiagram,
  LineAngleDiagram,
  ScatterPlotDiagram,
  SectorDiagram,
  TriangleDiagram,
  TrigGraphDiagram,
  TwoWayTableDiagram,
  UnitCircleDiagram,
  VennDiagram,
} from "../types";

const triangleVertices: TriangleDiagram["vertices"] = {
  A: { x: 0, y: 0 },
  B: { x: 5, y: 0 },
  C: { x: 1.5, y: 3.2 },
};

function triangle(
  description: string,
  sideLabels: TriangleDiagram["sideLabels"] = {},
  angleLabels: TriangleDiagram["angleLabels"] = {},
  rightAngleAt?: TriangleDiagram["rightAngleAt"],
): TriangleDiagram {
  return {
    description,
    vertices: triangleVertices,
    sideLabels,
    angleLabels,
    rightAngleAt,
  };
}

function angleDegrees(text: string): number {
  const degree = text.match(/theta\s*=\s*(\d+)\^?\\?circ/i);
  if (degree) return Number(degree[1]);
  const fractions: Array<[RegExp, number]> = [
    [/\\frac\{5\\pi\}\{3\}/, 300],
    [/\\frac\{3\\pi\}\{4\}/, 135],
    [/\\frac\{2\\pi\}\{3\}/, 120],
    [/\\frac\{2\\pi\}\{5\}/, 72],
    [/\\frac\{2\\pi\}\{7\}/, 360 / 7],
    [/\\frac\{\\pi\}\{6\}/, 30],
    [/\\frac\{\\pi\}\{5\}/, 36],
    [/\\frac\{\\pi\}\{4\}/, 45],
    [/\\frac\{\\pi\}\{3\}/, 60],
    [/\\frac\{\\pi\}\{2\}/, 90],
  ];
  for (const [pattern, value] of fractions) {
    if (pattern.test(text)) return value;
  }
  if (/s=6\\pi[\s\S]*r=9/.test(text)) return 120;
  if (/s=3\\pi[\s\S]*r=6/.test(text)) return 90;
  if (/s=4\\pi[\s\S]*r=8/.test(text)) return 90;
  if (/s=3\\pi[\s\S]*r=9/.test(text)) return 60;
  if (/s=\\pi[\s\S]*r=3/.test(text)) return 60;
  if (/s=5\\pi[\s\S]*r=10/.test(text)) return 90;
  if (/A=6\\pi[\s\S]*r=6/.test(text)) return 60;
  return 70;
}

function sectorFor(question: PracticeQuestion): SectorDiagram {
  const text = `${question.prompt} ${question.latex ?? ""}`;
  const radius = text.match(/\br\s*=\s*(\d+)/)?.[1];
  const arc = text.match(/\bs\s*=\s*([^,.$]+)/)?.[1]?.trim();
  const degrees = angleDegrees(text);
  const angleLatex =
    text.match(/theta\s*=\s*([^,.$]+)/i)?.[1]?.trim() ??
    (/\bFind the angle\b/i.test(text) ? "theta" : `${Math.round(degrees)} degrees`);
  return {
    description: `Circle sector showing radius ${radius ?? "r"}, central angle ${angleLatex}${arc ? `, and arc length ${arc}` : ""}.`,
    angleDegrees: degrees,
    radiusLabel: radius ? `r = ${radius}` : "r",
    angleLabel: angleLatex,
    arcLabel: arc ? `s = ${arc}` : undefined,
    showFullCircle: true,
  };
}

const unitCircleById: Record<string, UnitCircleDiagram> = {
  "y11adv-ucv-i3": {
    description: "Unit circle terminal point at pi radians on the negative x-axis, labelled negative one comma zero.",
    angleRadians: "pi",
    angleDegrees: "180",
    terminalPoint: { x: "-1", y: "0", label: "(-1, 0)" },
    quadrant: "axis",
    highlightRadius: true,
  },
  "y11adv-ucv-i4": {
    description: "Unit circle terminal point at three pi over two on the negative y-axis, labelled zero comma negative one.",
    angleRadians: "3pi/2",
    angleDegrees: "270",
    terminalPoint: { x: "0", y: "-1", label: "(0, -1)" },
    quadrant: "axis",
    highlightRadius: true,
  },
  "y11adv-ucv-m1": {
    description: "First-quadrant unit-circle point at pi over six with a reference triangle.",
    angleRadians: "pi/6",
    angleDegrees: "30",
    terminalPoint: { x: "sqrt(3)/2", y: "1/2" },
    quadrant: 1,
    showReferenceTriangle: true,
    highlightRadius: true,
  },
  "y11adv-ucv-m2": {
    description: "First-quadrant unit-circle point at pi over three with a reference triangle.",
    angleRadians: "pi/3",
    angleDegrees: "60",
    terminalPoint: { x: "1/2", y: "sqrt(3)/2" },
    quadrant: 1,
    showReferenceTriangle: true,
    highlightRadius: true,
  },
  "y11adv-ucv-m7": {
    description: "Unit circle terminal point at zero radians on the positive x-axis, labelled one comma zero.",
    angleRadians: "0",
    angleDegrees: "0",
    terminalPoint: { x: "1", y: "0", label: "(1, 0)" },
    quadrant: "axis",
    highlightRadius: true,
  },
  "y11adv-ucv-m8": {
    description: "Unit circle terminal point at zero radians on the positive x-axis, labelled one comma zero.",
    angleRadians: "0",
    angleDegrees: "0",
    terminalPoint: { x: "1", y: "0", label: "(1, 0)" },
    quadrant: "axis",
    highlightRadius: true,
  },
};

type TriangleConfig = {
  a?: string;
  b?: string;
  c?: string;
  A?: string;
  B?: string;
  C?: string;
  right?: "A" | "B" | "C";
};

const triangleConfigs: Record<string, TriangleConfig> = {
  "y11adv-nra-g1": { a: "6", b: "4", C: "30 degrees" },
  "y11adv-nra-g3": { a: "10", A: "30 degrees", B: "90 degrees", right: "B" },
  "y11adv-nra-i1": { a: "8", b: "8", C: "90 degrees", right: "C" },
  "y11adv-nra-i2": { a: "12", A: "30 degrees", B: "90 degrees", right: "B" },
  "y11adv-nra-i3": { b: "4", c: "4", A: "60 degrees" },
  "y11adv-nra-m1": { a: "8", b: "6", C: "30 degrees" },
  "y11adv-nra-m2": { b: "3", c: "4", A: "90 degrees", right: "A" },
  "y11adv-nra-m3": { a: "8", A: "30 degrees", B: "30 degrees" },
  "y11adv-nra-mp1": { a: "6", b: "8", C: "90 degrees", right: "C" },
  "y11adv-nra-mp2": { a: "8", A: "30 degrees", B: "90 degrees", right: "B" },
  "y11adv-amb-g2": { a: "3", b: "8", A: "30 degrees" },
  "y11adv-amb-g3": { a: "6", b: "8", A: "30 degrees" },
  "y11adv-amb-g4": { a: "10", b: "8", A: "30 degrees" },
  "y11adv-amb-i1": { a: "6", b: "12", A: "30 degrees" },
  "y11adv-amb-i2": { a: "4", b: "12", A: "30 degrees" },
  "y11adv-amb-i3": { a: "8", b: "12", A: "30 degrees" },
  "y11adv-amb-i4": { a: "15", b: "12", A: "30 degrees" },
  "y11adv-amb-m1": { a: "10", b: "20", A: "30 degrees" },
  "y11adv-amb-m2": { a: "8", b: "20", A: "30 degrees" },
  "y11adv-amb-m3": { a: "15", b: "20", A: "30 degrees" },
  "y11adv-amb-m4": { a: "22", b: "20", A: "30 degrees" },
  "y11adv-amb-m5": { a: "7", b: "8", A: "60 degrees" },
  "y11adv-amb-m6": { a: "5", b: "8", A: "60 degrees" },
  "y11adv-amb-m7": { a: "9", b: "8", A: "60 degrees" },
  "y11adv-amb-m8": { a: "9", b: "10", A: "60 degrees" },
  "y11adv-amb-mp1": { a: "7", b: "10", A: "30 degrees" },
  "y11adv-amb-mp2": { a: "5", b: "10", A: "30 degrees" },
};

function configuredTriangle(id: string, config: TriangleConfig): TriangleDiagram {
  const ambiguous = id.includes("-amb-");
  const sides = {
    ...(config.a ? { BC: `a = ${config.a}` } : {}),
    ...(config.b ? { AC: `b = ${config.b}` } : {}),
    ...(config.c ? { AB: `c = ${config.c}` } : {}),
  };
  const angles = {
    ...(config.A ? { A: config.A } : {}),
    ...(config.B ? { B: config.B } : {}),
    ...(config.C ? { C: config.C } : {}),
  };
  return triangle(
    `${ambiguous ? "SSA construction" : "Triangle ABC"} with ${[
      config.a && `a = ${config.a}`,
      config.b && `b = ${config.b}`,
      config.c && `c = ${config.c}`,
      config.A && `A = ${config.A}`,
      config.B && `B = ${config.B}`,
      config.C && `C = ${config.C}`,
    ].filter(Boolean).join(", ")}. The drawing is schematic; use the labelled measurements.`,
    sides,
    angles,
    config.right,
  );
}

function ambiguousConstruction(config: TriangleConfig): LineAngleDiagram {
  const a = Number(config.a);
  const b = Number(config.b);
  const A = Number(config.A?.match(/\d+(?:\.\d+)?/)?.[0]);
  const radians = (A * Math.PI) / 180;
  const footX = b * Math.cos(radians);
  const height = b * Math.sin(radians);
  const basePoints = [
    footX - Math.sqrt(Math.max(0, a * a - height * height)),
    footX + Math.sqrt(Math.max(0, a * a - height * height)),
  ].filter((x, index, values) => x > 0 && (index === 0 || Math.abs(x - values[index - 1]) > 1e-6));
  const description =
    a < height
      ? `SSA construction with A equal to ${A} degrees and b equal to ${b}. The perpendicular height is ${height.toFixed(2)}, so side a equal to ${a} stops short of the base and no triangle closes.`
      : `SSA construction with A equal to ${A} degrees, b equal to ${b} and a equal to ${a}; ${basePoints.length} valid base intersection${basePoints.length === 1 ? "" : "s"} ${basePoints.length === 1 ? "is" : "are"} shown.`;
  const points: LineAngleDiagram["points"] = [
    { id: "A", x: 0, y: 0, label: "A" },
    { id: "C", x: footX, y: height, label: "C" },
    { id: "H", x: footX, y: 0, label: "H" },
  ];
  const segments: LineAngleDiagram["segments"] = [
    { from: "A", to: "C", label: `b = ${b}` },
    { from: "A", to: "H" },
    { from: "C", to: "H", label: `b sin A = ${Number(height.toFixed(2))}`, dashed: true },
  ];
  if (a < height) {
    points.push({ id: "D", x: footX, y: height - a, label: "side a stops here" });
    segments.push({ from: "C", to: "D", label: `a = ${a}`, highlighted: true });
  } else {
    basePoints.forEach((x, index) => {
      const id = `B${index + 1}`;
      points.push({ id, x, y: 0, label: basePoints.length === 1 ? "B" : `B${index + 1}` });
      segments.push(
        { from: "A", to: id },
        { from: "C", to: id, label: `a = ${a}`, highlighted: true },
      );
    });
  }
  return {
    description,
    points,
    segments,
    angles: [{ vertex: "A", from: "H", to: "C", label: `${A} degrees`, highlighted: true }],
  };
}

const bearingsById: Record<string, BearingsDiagram> = {
  "y11adv-rat-g4": {
    description: "Compass diagram with a ray pointing due south from the origin.",
    originLabel: "O",
    rays: [{ bearing: 180, label: "South", showAngle: true }],
  },
  "y11adv-rat-i5": {
    description: "Compass diagram with a ray pointing south-east, halfway between south and east.",
    originLabel: "O",
    rays: [{ bearing: 135, label: "SE", showAngle: true }],
  },
  "y11adv-rat-mp2": {
    description: "Ship route travelling 5 kilometres north and then 5 kilometres east from port.",
    originLabel: "Port",
    rays: [
      { bearing: 0, label: "5 km North", length: 0.8 },
      { bearing: 45, label: "Resultant route", showAngle: true },
      { bearing: 90, label: "5 km East", length: 0.8 },
    ],
  },
};

const dataTablesById: Record<string, DataTableDiagram> = {
  "y11adv-fn-g4": {
    description: "Table of inputs negative two to two and their square-number outputs.",
    columnHeaders: ["x", "-2", "-1", "0", "1", "2"],
    values: [["y", "4", "1", "0", "1", "4"]],
  },
  "y11adv-fn-m4": {
    description: "Table row containing the five outputs 9, 4, 1, 0 and 1.",
    columnHeaders: ["Output number", "1", "2", "3", "4", "5"],
    values: [["y", "9", "4", "1", "0", "1"]],
  },
  "y11adv-lqc-i1": {
    description: "Value table whose outputs increase by four at each step.",
    columnHeaders: ["x", "0", "1", "2", "3"],
    values: [["y", "1", "5", "9", "13"], ["First difference", "-", "+4", "+4", "+4"]],
  },
  "y11adv-lqc-m7": {
    description: "Sample values from the cubic rule y equals x cubed.",
    columnHeaders: ["x", "-2", "0", "2"],
    values: [["y = x^3", "-8", "0", "8"]],
  },
  "y11adv-var-m9": {
    description: "Three ordered pairs from an inverse-variation relationship.",
    columnHeaders: ["x", "2", "3", "4"],
    values: [["y", "12", "8", "6"]],
  },
  "y11adv-func-exam-g4": {
    description: "Input-output table used to distinguish domain from range.",
    columnHeaders: ["x", "-1", "0", "1"],
    values: [["y", "2", "5", "10"]],
  },
  "y11adv-func-exam-m9": {
    description: "Table with inputs negative one, zero and one and outputs two, five and ten.",
    columnHeaders: ["x", "-1", "0", "1"],
    values: [["y", "2", "5", "10"]],
  },
  "y11adv-id-roc-i2": {
    description: "Table showing height h equal to forty, thirty-four and ten at times zero, two and five respectively.",
    columnHeaders: ["t", "0", "2", "5"],
    values: [["h(t)", "40", "34", "10"]],
  },
  "y11adv-id-roc-m4": {
    description: "Function values y equals 10, 18 and 30 at x equals 1, 3 and 7.",
    columnHeaders: ["x", "1", "3", "7"],
    values: [["y", "10", "18", "30"]],
  },
  "y11adv-id-exam-i1": {
    description: "Function values six and thirty at x equals zero and four.",
    columnHeaders: ["x", "0", "4"],
    values: [["f(x)", "6", "30"]],
  },
  "y11adv-pd-data-i2": {
    description: "Frequency table with values two, four and six and frequencies three, two and one.",
    columnHeaders: ["x", "2", "4", "6"],
    values: [["Frequency", "3", "2", "1"]],
  },
  "y11adv-pd-data-i3": {
    description: "Frequency table with values one to four and frequencies two, five, three and one.",
    columnHeaders: ["x", "1", "2", "3", "4"],
    values: [["Frequency", "2", "5", "3", "1"]],
  },
  "y11adv-pd-data-m4": {
    description: "Frequency table with values one, two and five and frequencies two, three and one.",
    columnHeaders: ["x", "1", "2", "5"],
    values: [["Frequency", "2", "3", "1"]],
  },
  "y11adv-pd-data-m5": {
    description: "Frequency table with values four to seven and frequencies one, four, two and three.",
    columnHeaders: ["x", "4", "5", "6", "7"],
    values: [["Frequency", "1", "4", "2", "3"]],
  },
  "y11adv-cp-nt-m8": {
    description: "Standard normal notation table defining Phi of z as the cumulative probability to the left of z.",
    columnHeaders: ["Notation", "Meaning"],
    values: [["Phi(z)", "P(Z < z)"]],
  },
  "y11adv-cp-ex-m8": {
    description: "Cumulative standard normal table entry showing Phi of one point five equals zero point nine three three two.",
    columnHeaders: ["z", "Phi(z)"],
    values: [["1.5", "0.9332"]],
    highlight: { rowIndex: 0, columnIndex: 1 },
  },
};

const twoWayTablesById: Record<string, TwoWayTableDiagram> = {
  "y11adv-pd-prob-g4": {
    description: "Music study by year group for seventy students.",
    rowLabels: ["Year 11", "Year 12"], columnLabels: ["Music", "No music"],
    values: [[16, 24], [10, 20]], rowTotals: [40, 30], columnTotals: [26, 44], grandTotal: 70,
  },
  "y11adv-pd-prob-i3": {
    description: "Coupon use by purchase channel for eighty customers.",
    rowLabels: ["Online", "Store"], columnLabels: ["Coupon", "No coupon"],
    values: [[12, 18], [8, 42]], rowTotals: [30, 50], columnTotals: [20, 60], grandTotal: 80,
  },
  "y11adv-pd-prob-m5": {
    description: "Laptop and tablet ownership for ninety people.",
    rowLabels: ["Laptop", "No laptop"], columnLabels: ["Tablet", "No tablet"],
    values: [[18, 32], [12, 28]], rowTotals: [50, 40], columnTotals: [30, 60], grandTotal: 90,
  },
  "y11adv-pd-prob-m6": {
    description: "Laptop and tablet ownership for ninety people, with the laptop row highlighted.",
    rowLabels: ["Laptop", "No laptop"], columnLabels: ["Tablet", "No tablet"],
    values: [[18, 32], [12, 28]], rowTotals: [50, 40], columnTotals: [30, 60], grandTotal: 90,
    highlight: { kind: "row", rowIndex: 0 },
  },
  "y11adv-pd-cond-i1": {
    description: "Wins and losses classified by whether the person practised.",
    rowLabels: ["Practice", "No practice"], columnLabels: ["Win", "Lose"],
    values: [[12, 8], [4, 16]], rowTotals: [20, 20], columnTotals: [16, 24], grandTotal: 40,
    highlight: { kind: "row", rowIndex: 0 },
  },
  "y11adv-pd-cond-i5": {
    description: "Wins and losses classified by practice, with the win column highlighted.",
    rowLabels: ["Practice", "No practice"], columnLabels: ["Win", "Lose"],
    values: [[12, 8], [4, 16]], rowTotals: [20, 20], columnTotals: [16, 24], grandTotal: 40,
    highlight: { kind: "column", columnIndex: 0 },
  },
  "y11adv-pd-cond-m3": {
    description: "Lesson mode by year group, with the Year 11 row highlighted.",
    rowLabels: ["Year 11", "Year 12"], columnLabels: ["Online", "In-person"],
    values: [[18, 22], [12, 18]], rowTotals: [40, 30], columnTotals: [30, 40], grandTotal: 70,
    highlight: { kind: "row", rowIndex: 0 },
  },
  "y11adv-pd-cond-m9": {
    description: "Lesson mode by year group, with the online column highlighted.",
    rowLabels: ["Year 11", "Year 12"], columnLabels: ["Online", "In-person"],
    values: [[18, 22], [12, 18]], rowTotals: [40, 30], columnTotals: [30, 40], grandTotal: 70,
    highlight: { kind: "column", columnIndex: 0 },
  },
  "y11adv-pd-cond-mp1": {
    description: "Wins and losses classified by whether the person practised.",
    rowLabels: ["Practice", "No practice"], columnLabels: ["Win", "Lose"],
    values: [[12, 8], [4, 16]], rowTotals: [20, 20], columnTotals: [16, 24], grandTotal: 40,
  },
  "y11adv-pd-exam-g3": {
    description: "Pass results by group, with the Group B row highlighted.",
    rowLabels: ["Group A", "Group B"], columnLabels: ["Pass", "Not pass"],
    values: [[24, 6], [21, 9]], rowTotals: [30, 30], columnTotals: [45, 15], grandTotal: 60,
    highlight: { kind: "row", rowIndex: 1 },
  },
  "y11adv-pd-exam-m6": {
    description: "Lesson preference by year group, with the Year 11 row highlighted.",
    rowLabels: ["Year 11", "Year 12"], columnLabels: ["Online", "In person"],
    values: [[18, 22], [12, 18]], rowTotals: [40, 30], columnTotals: [30, 40], grandTotal: 70,
    highlight: { kind: "row", rowIndex: 0 },
  },
};

const cartesianById: Record<string, CartesianGraph> = {
  "y11adv-lqc-g3": {
    description: "Upward-opening parabola with a minimum turning point.",
    xMin: -4, xMax: 4, yMin: -2, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0 }],
  },
  "y11adv-lqc-m5": {
    description: "Straight-line graph crossing the y-axis at three.",
    xMin: -4, xMax: 4, yMin: -3, yMax: 9, showGrid: true,
    lines: [{ kind: "linear", m: 1, b: 3 }],
  },
  "y11adv-poly-g4": {
    description: "Reciprocal graph with vertical asymptote x equals negative two.",
    xMin: -7, xMax: 4, yMin: -6, yMax: 6, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: -2, k: 0 }],
  },
  "y11adv-poly-m9": {
    description: "Reciprocal graph y equals one over x minus four, approaching x equals four.",
    xMin: -2, xMax: 9, yMin: -6, yMax: 6, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 4, k: 0, label: "y=1/(x-4)" }],
  },
  "y11adv-poly-m10": {
    description: "Polynomial curve crossing the x-axis at x equals five.",
    xMin: 0, xMax: 9, yMin: -6, yMax: 6, showGrid: true,
    lines: [{ kind: "linear", m: 1, b: -5, label: "y=x-5" }],
    points: [{ x: 5, y: 0, label: "(5, 0)" }],
  },
  "y11adv-gt-poly-g3": {
    description: "Reciprocal graph y equals one over x minus five plus two.",
    xMin: -1, xMax: 11, yMin: -4, yMax: 8, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 5, k: 2, label: "y=1/(x-5)+2" }],
  },
  "y11adv-gt-poly-g4": {
    description: "Reciprocal graph translated two units right and one unit down.",
    xMin: -4, xMax: 8, yMin: -7, yMax: 5, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 2, k: -1 }],
  },
  "y11adv-gt-poly-i2": {
    description: "Reciprocal graph y equals one over x plus three minus four.",
    xMin: -9, xMax: 3, yMin: -10, yMax: 2, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: -3, k: -4 }],
  },
  "y11adv-gt-poly-i5": {
    description: "Reciprocal graph y equals one over x minus two plus one.",
    xMin: -4, xMax: 8, yMin: -5, yMax: 7, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 2, k: 1 }],
  },
  "y11adv-gt-poly-m2": {
    description: "Reciprocal graph y equals one over x plus seven minus three.",
    xMin: -13, xMax: -1, yMin: -9, yMax: 3, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: -7, k: -3 }],
  },
  "y11adv-gt-poly-m3": {
    description: "Upward-opening parabola with vertex four comma negative three.",
    xMin: -1, xMax: 9, yMin: -5, yMax: 14, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: -8, c: 13 }],
    points: [{ x: 4, y: -3, label: "(4, -3)" }],
  },
  "y11adv-gt-poly-m4": {
    description: "Reciprocal graph with asymptotes x equals negative two and y equals five.",
    xMin: -8, xMax: 4, yMin: -1, yMax: 11, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: -2, k: 5 }],
  },
  "y11adv-gt-poly-m5": {
    description: "Reciprocal graph y equals two over x minus one plus four.",
    xMin: -5, xMax: 7, yMin: -2, yMax: 10, showGrid: true,
    curves: [{ kind: "reciprocal", a: 2, h: 1, k: 4 }],
  },
  "y11adv-gt-poly-m8": {
    description: "Parabola y equals x plus five squared minus one with vertex marked at negative five comma negative one.",
    xMin: -10, xMax: 1, yMin: -3, yMax: 18, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 10, c: 24 }],
    points: [{ x: -5, y: -1, label: "(-5, -1)" }],
  },
};

const additionalCartesianById: Record<string, CartesianGraph> = {
  "y11adv-fn-i4": {
    description: "Upward-opening graph with minimum output negative four and no maximum output.",
    xMin: -5, xMax: 5, yMin: -6, yMax: 12, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: -4 }],
    points: [{ x: 0, y: -4, label: "minimum y = -4" }],
  },
  "y11adv-fn-m8": {
    description: "Finite straight graph segment whose output values run from negative one to six inclusive.",
    xMin: -1, xMax: 8, yMin: -3, yMax: 8, showGrid: true,
    lineSegments: [{ from: { x: 0, y: -1 }, to: { x: 7, y: 6 } }],
    points: [{ x: 0, y: -1, label: "included" }, { x: 7, y: 6, label: "included" }],
  },
  "y11adv-abs-i4": {
    description: "Absolute-value graph y equals absolute x minus four with vertex at four comma zero.",
    xMin: -2, xMax: 10, yMin: -2, yMax: 8, showGrid: true,
    curves: [{ kind: "absolute", a: 1, h: 4, k: 0, label: "y=|x-4|" }],
    points: [{ x: 4, y: 0, label: "vertex" }],
  },
  "y11adv-sym-g1": {
    description: "Even parabola y equals x squared, symmetric about the y-axis.",
    xMin: -4, xMax: 4, yMin: -2, yMax: 12, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0 }],
  },
  "y11adv-sym-g2": {
    description: "Odd cubic y equals x cubed, symmetric under a half-turn about the origin.",
    xMin: -3, xMax: 3, yMin: -10, yMax: 10, showGrid: true,
    curves: [{ kind: "cubic", a: 1 }],
  },
  "y11adv-sym-i4": {
    description: "Even graph containing the point two comma five and its reflection negative two comma five.",
    xMin: -4, xMax: 4, yMin: -1, yMax: 8, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1.25, b: 0, c: 0 }],
    points: [{ x: 2, y: 5, label: "(2, 5)" }, { x: -2, y: 5, label: "reflected point" }],
  },
  "y11adv-sym-i5": {
    description: "Odd graph containing three comma negative four and its half-turn image negative three comma four.",
    xMin: -5, xMax: 5, yMin: -7, yMax: 7, showGrid: true,
    lines: [{ kind: "linear", m: -4 / 3, b: 0 }],
    points: [{ x: 3, y: -4, label: "(3, -4)" }, { x: -3, y: 4, label: "half-turn image" }],
  },
  "y11adv-sym-m8": {
    description: "Graph containing negative one comma negative three and one comma three, illustrating origin symmetry.",
    xMin: -3, xMax: 3, yMin: -7, yMax: 7, showGrid: true,
    lines: [{ kind: "linear", m: 3, b: 0 }],
    points: [{ x: -1, y: -3 }, { x: 1, y: 3 }],
  },
  "y11adv-var-i3": {
    description: "Inverse-variation graph y equals four over x with branches in quadrants one and three.",
    xMin: -6, xMax: 6, yMin: -6, yMax: 6, showGrid: true,
    curves: [{ kind: "reciprocal", a: 4, h: 0, k: 0, label: "y=k/x, k>0" }],
  },
  "y11adv-cir-g3": {
    description: "Upper semicircle y equals the square root of r squared minus x squared, shown for radius three.",
    xMin: -4, xMax: 4, yMin: -1, yMax: 4, showGrid: true,
    lineSegments: [
      { from: { x: -3, y: 0 }, to: { x: -2, y: Math.sqrt(5) } },
      { from: { x: -2, y: Math.sqrt(5) }, to: { x: -1, y: Math.sqrt(8) } },
      { from: { x: -1, y: Math.sqrt(8) }, to: { x: 0, y: 3 } },
      { from: { x: 0, y: 3 }, to: { x: 1, y: Math.sqrt(8) } },
      { from: { x: 1, y: Math.sqrt(8) }, to: { x: 2, y: Math.sqrt(5) } },
      { from: { x: 2, y: Math.sqrt(5) }, to: { x: 3, y: 0 } },
    ],
  },
  "y11adv-cir-m5": {
    description: "Lower semicircle y equals negative square root of r squared minus x squared, shown for radius three.",
    xMin: -4, xMax: 4, yMin: -4, yMax: 1, showGrid: true,
    lineSegments: [
      { from: { x: -3, y: 0 }, to: { x: -2, y: -Math.sqrt(5) } },
      { from: { x: -2, y: -Math.sqrt(5) }, to: { x: -1, y: -Math.sqrt(8) } },
      { from: { x: -1, y: -Math.sqrt(8) }, to: { x: 0, y: -3 } },
      { from: { x: 0, y: -3 }, to: { x: 1, y: -Math.sqrt(8) } },
      { from: { x: 1, y: -Math.sqrt(8) }, to: { x: 2, y: -Math.sqrt(5) } },
      { from: { x: 2, y: -Math.sqrt(5) }, to: { x: 3, y: 0 } },
    ],
  },
  "y11adv-func-exam-i4": {
    description: "Upward-opening graph with its lowest output at y equals negative three.",
    xMin: -5, xMax: 5, yMin: -5, yMax: 12, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: -3 }],
    points: [{ x: 0, y: -3, label: "lowest point" }],
  },
  "y11adv-gt-trans-i2": {
    description: "Representative graph f of x and the same graph translated five units right as f of x minus five.",
    xMin: -4, xMax: 11, yMin: -2, yMax: 25, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "f(x)" }, { kind: "quadratic", a: 1, b: -10, c: 25, label: "f(x-5)" }],
  },
  "y11adv-gt-trans-m6": {
    description: "Representative graph f of x and its translation four units downward.",
    xMin: -5, xMax: 5, yMin: -6, yMax: 12, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "f(x)" }, { kind: "quadratic", a: 1, b: 0, c: -4, label: "f(x)-4" }],
  },
  "y11adv-gt-exam-g4": {
    description: "Reciprocal graph y equals one over x plus two plus five with vertical asymptote negative two.",
    xMin: -8, xMax: 4, yMin: -1, yMax: 11, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: -2, k: 5 }],
  },
  "y11adv-gt-exam-i2": {
    description: "Reciprocal graph y equals three over x minus seven minus two with horizontal asymptote negative two.",
    xMin: 1, xMax: 13, yMin: -8, yMax: 4, showGrid: true,
    curves: [{ kind: "reciprocal", a: 3, h: 7, k: -2 }],
  },
  "y11adv-gt-exam-m3": {
    description: "Downward-opening parabola y equals negative x minus two squared plus eight with vertex two comma eight.",
    xMin: -4, xMax: 8, yMin: -8, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: -1, b: 4, c: 4 }],
    points: [{ x: 2, y: 8, label: "vertex" }],
  },
  "y11adv-gt-exam-m4": {
    description: "Reciprocal graph y equals one over x minus nine plus two with vertical asymptote nine.",
    xMin: 3, xMax: 15, yMin: -4, yMax: 8, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 9, k: 2 }],
  },
  "y11adv-gt-exam-m6": {
    description: "Reciprocal graph y equals one over x minus two plus five, vertically translated to horizontal asymptote five.",
    xMin: -4, xMax: 8, yMin: -1, yMax: 11, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 2, k: 5 }],
  },
  "y11adv-gt-exam-m8": {
    description: "Reciprocal graph y equals one over x plus one minus three, whose range excludes negative three.",
    xMin: -7, xMax: 5, yMin: -9, yMax: 3, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: -1, k: -3 }],
  },
  "y11adv-gt-exam-m9": {
    description: "Downward-opening quadratic graph with vertex negative two comma three.",
    xMin: -7, xMax: 3, yMin: -8, yMax: 5, showGrid: true,
    parabolas: [{ kind: "quadratic", a: -1, b: -4, c: -1 }],
    points: [{ x: -2, y: 3, label: "vertex" }],
  },
  "y11adv-gt-exam-m10": {
    description: "Reciprocal graph with displayed asymptotes x equals negative one and y equals four.",
    xMin: -7, xMax: 5, yMin: -2, yMax: 10, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: -1, k: 4 }],
  },
  "y11adv-exp-index-m5": {
    description: "Increasing exponential graph y equals three to the power x, through zero comma one with horizontal asymptote zero.",
    xMin: -4, xMax: 4, yMin: -1, yMax: 30, showGrid: true,
    curves: [{ kind: "exponential", base: 3, label: "y=3^x" }],
    points: [{ x: 0, y: 1, label: "(0, 1)" }],
  },
  "y11adv-exp-graph-mp1": {
    description: "Increasing exponential graph y equals two to the power x with y-intercept one and horizontal asymptote zero.",
    xMin: -5, xMax: 5, yMin: -1, yMax: 20, showGrid: true,
    curves: [{ kind: "exponential", base: 2, label: "y=2^x" }],
    points: [{ x: 0, y: 1, label: "(0, 1)" }],
  },
  "y11adv-exp-graph-mp2": {
    description: "Increasing logarithmic graph y equals log base two of x with x-intercept one and vertical asymptote zero.",
    xMin: -1, xMax: 10, yMin: -5, yMax: 5, showGrid: true,
    curves: [{ kind: "logarithmic", base: 2, label: "y=log_2 x" }],
    points: [{ x: 1, y: 0, label: "(1, 0)" }],
  },
  "y11adv-exp-exam-i5": {
    description: "Decreasing exponential graph y equals one half to the power x, through zero comma one and approaching zero to the right.",
    xMin: -4, xMax: 6, yMin: -1, yMax: 18, showGrid: true,
    curves: [{ kind: "exponential", base: 0.5, label: "y=(1/2)^x" }],
    points: [{ x: 0, y: 1, label: "(0, 1)" }],
  },
  "y11adv-id-roc-i3": {
    description: "Smooth curve with a horizontal tangent at its stationary point.",
    xMin: -4, xMax: 4, yMin: -2, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0 }],
    lineSegments: [{ from: { x: -1.5, y: 0 }, to: { x: 1.5, y: 0 }, label: "horizontal tangent" }],
  },
  "y11adv-id-roc-m3": {
    description: "Decreasing straight graph whose gradient is negative from left to right.",
    xMin: -4, xMax: 4, yMin: -5, yMax: 5, showGrid: true,
    lines: [{ kind: "linear", m: -1, b: 0 }],
  },
  "y11adv-id-fp-g4": {
    description: "Curve with a tangent at x equals a, whose tangent gradient represents the derivative at that point.",
    xMin: -3, xMax: 4, yMin: -2, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0 }],
    lineSegments: [{ from: { x: 0, y: -2 }, to: { x: 3, y: 10 }, label: "tangent at x=a" }],
  },
  "y11adv-stat-m10": {
    description: "Smooth curve rising to a local maximum and then falling.",
    xMin: -5, xMax: 5, yMin: -6, yMax: 6, showGrid: true,
    parabolas: [{ kind: "quadratic", a: -1, b: 0, c: 4 }],
    points: [{ x: 0, y: 4, label: "peak" }],
  },
  "y11adv-conc-g3": {
    description: "Concave-up graph bending upward on an interval where the second derivative is positive.",
    xMin: -4, xMax: 4, yMin: -2, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0 }],
  },
  "y11adv-curve-m8": {
    description: "Curve with a horizontal tangent at a stationary point found by solving f prime of x equals zero.",
    xMin: -4, xMax: 4, yMin: -2, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0 }],
    points: [{ x: 0, y: 0, label: "stationary point" }],
  },
  "y11adv-intg-iv-m5": {
    description: "Three vertically translated cubic graphs y equals x cubed plus different constants C.",
    xMin: -3, xMax: 3, yMin: -12, yMax: 12, showGrid: true,
    curves: [{ kind: "cubic", a: 1, d: -3, label: "C=-3" }, { kind: "cubic", a: 1, d: 0, label: "C=0" }, { kind: "cubic", a: 1, d: 3, label: "C=3" }],
  },
};

const areaCartesianById: Record<string, CartesianGraph> = {
  "y11adv-intg-area-g1": {
    description: "Region under y equals three x squared and above the x-axis from zero to two.",
    xMin: -1, xMax: 3, yMin: -1, yMax: 14, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 3, b: 0, c: 0, label: "y=3x^2" }],
    shadedRegions: [{ kind: "under-function", functionType: "quadratic", quadratic: { a: 3, b: 0, c: 0 }, xMin: 0, xMax: 2, color: "blue" }],
  },
  "y11adv-intg-area-g3": {
    description: "Region between y equals x and y equals x squared from zero to one.",
    xMin: -0.5, xMax: 1.5, yMin: -0.5, yMax: 1.5, showGrid: true,
    lines: [{ kind: "linear", m: 1, b: 0, label: "y=x" }],
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=x^2" }],
    shadedRegions: [{ kind: "between-functions", xMin: 0, xMax: 1, top: { functionType: "line", line: { m: 1, b: 0 } }, bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } }, color: "blue" }],
  },
  "y11adv-intg-area-g4": {
    description: "The same bounded region between y equals x and y equals x squared on zero to one, used to choose an integral setup.",
    xMin: -0.5, xMax: 1.5, yMin: -0.5, yMax: 1.5, showGrid: true,
    lines: [{ kind: "linear", m: 1, b: 0, label: "upper: y=x" }],
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "lower: y=x^2" }],
    shadedRegions: [{ kind: "between-functions", xMin: 0, xMax: 1, top: { functionType: "line", line: { m: 1, b: 0 } }, bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } }, color: "blue" }],
  },
  "y11adv-intg-area-i1": {
    description: "Region under the cubic y equals x cubed and above the x-axis from zero to two.",
    xMin: -1, xMax: 3, yMin: -1, yMax: 10, showGrid: true,
    curves: [{ kind: "cubic", a: 1, label: "y=x^3", xMin: 0, xMax: 2 }],
    points: [{ x: 0, y: 0 }, { x: 2, y: 8 }],
  },
  "y11adv-intg-area-i3": {
    description: "Region below the horizontal line y equals four and above y equals x squared from negative two to two.",
    xMin: -3, xMax: 3, yMin: -1, yMax: 6, showGrid: true,
    lines: [{ kind: "linear", m: 0, b: 4, label: "y=4" }],
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=x^2" }],
    shadedRegions: [{ kind: "between-functions", xMin: -2, xMax: 2, top: { functionType: "line", line: { m: 0, b: 4 } }, bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } }, color: "blue" }],
  },
  "y11adv-intg-area-i4": {
    description: "Representative graph crossing the x-axis at two, with one region below the axis before two and one above after two.",
    xMin: -1, xMax: 5, yMin: -4, yMax: 4, showGrid: true,
    lines: [{ kind: "linear", m: 1, b: -2, label: "f(x)" }],
    points: [{ x: 2, y: 0, label: "x=2" }],
  },
  "y11adv-intg-area-i5": {
    description: "Region under y equals four minus x squared and above the x-axis from negative two to two.",
    xMin: -3, xMax: 3, yMin: -2, yMax: 6, showGrid: true,
    parabolas: [{ kind: "quadratic", a: -1, b: 0, c: 4, label: "y=4-x^2" }],
    shadedRegions: [{ kind: "under-function", functionType: "quadratic", quadratic: { a: -1, b: 0, c: 4 }, xMin: -2, xMax: 2, color: "blue" }],
  },
  "y11adv-intg-area-m1": {
    description: "Region under y equals six x squared and above the x-axis from zero to two.",
    xMin: -1, xMax: 3, yMin: -2, yMax: 26, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 6, b: 0, c: 0, label: "y=6x^2" }],
    shadedRegions: [{ kind: "under-function", functionType: "quadratic", quadratic: { a: 6, b: 0, c: 0 }, xMin: 0, xMax: 2, color: "blue" }],
  },
  "y11adv-intg-area-m2": {
    description: "Region between y equals x squared minus nine and the x-axis from negative three to three, lying below the axis.",
    xMin: -4, xMax: 4, yMin: -11, yMax: 8, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: -9, label: "y=x^2-9" }],
    shadedRegions: [{ kind: "between-functions", xMin: -3, xMax: 3, top: { functionType: "line", line: { m: 0, b: 0 } }, bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: -9 } }, color: "amber" }],
  },
  "y11adv-intg-area-m4": {
    description: "Region below y equals two x and above y equals x squared from zero to two.",
    xMin: -1, xMax: 3, yMin: -1, yMax: 6, showGrid: true,
    lines: [{ kind: "linear", m: 2, b: 0, label: "y=2x" }],
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=x^2" }],
    shadedRegions: [{ kind: "between-functions", xMin: 0, xMax: 2, top: { functionType: "line", line: { m: 2, b: 0 } }, bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } }, color: "blue" }],
  },
  "y11adv-intg-area-m5": {
    description: "One positive arch of y equals sine x above the x-axis from zero to pi.",
    xMin: -1, xMax: 4, yMin: -0.3, yMax: 1.4, showGrid: true,
    sinusoidals: [{ kind: "sin", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI, label: "y=sin x" }],
  },
  "y11adv-intg-area-m7": {
    description: "Representative graph above the x-axis from zero to two and below the axis from two to five.",
    xMin: -1, xMax: 6, yMin: -4, yMax: 4, showGrid: true,
    lines: [{ kind: "linear", m: -1, b: 2, xMin: 0, xMax: 5, label: "f(x)" }],
    points: [{ x: 2, y: 0, label: "sign change" }],
  },
  "y11adv-intg-area-m8": {
    description: "Positive quarter-wave of y equals cosine x from zero to pi over two.",
    xMin: -0.5, xMax: 2.2, yMin: -0.3, yMax: 1.4, showGrid: true,
    sinusoidals: [{ kind: "cos", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI / 2, label: "y=cos x" }],
  },
  "y11adv-elc-ap-g3": {
    description: "Region under y equals e to the x and above the x-axis from zero to two.",
    xMin: -1, xMax: 3, yMin: -1, yMax: 9, showGrid: true,
    curves: [{ kind: "exponential", base: Math.E, label: "y=e^x", xMin: 0, xMax: 2 }],
  },
  "y11adv-elc-ap-m1": {
    description: "Region under y equals e to the x and above the x-axis from zero to one.",
    xMin: -1, xMax: 2, yMin: -1, yMax: 4, showGrid: true,
    curves: [{ kind: "exponential", base: Math.E, label: "y=e^x", xMin: 0, xMax: 1 }],
  },
  "y11adv-elc-ap-m6b": {
    description: "Region under y equals one over x and above the x-axis from two to six.",
    xMin: 0, xMax: 7, yMin: -0.1, yMax: 1.2, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 0, k: 0, label: "y=1/x", xMin: 2, xMax: 6 }],
  },
  "y11adv-elc-ex-m6": {
    description: "Generic positive region under y equals one over x from positive a to larger positive b.",
    xMin: 0, xMax: 7, yMin: -0.1, yMax: 1.2, showGrid: true,
    curves: [{ kind: "reciprocal", a: 1, h: 0, k: 0, label: "y=1/x", xMin: 1, xMax: 6 }],
    points: [{ x: 1, y: 1, label: "a" }, { x: 6, y: 1 / 6, label: "b" }],
  },
  "y11adv-tc-is-m8": {
    description: "Cosine graph from zero to pi, above the x-axis then below it, used to choose an area integral.",
    xMin: -0.5, xMax: 3.7, yMin: -1.4, yMax: 1.4, showGrid: true,
    sinusoidals: [{ kind: "cos", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI, label: "y=cos x" }],
  },
  "y11adv-tc-at-g2": {
    description: "Positive quarter-wave of y equals cosine x from zero to pi over two.",
    xMin: -0.5, xMax: 2.2, yMin: -0.3, yMax: 1.4, showGrid: true,
    sinusoidals: [{ kind: "cos", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI / 2, label: "y=cos x" }],
  },
  "y11adv-tc-at-m2": {
    description: "Cosine graph from zero to pi with equal positive and negative signed regions.",
    xMin: -0.5, xMax: 3.7, yMin: -1.4, yMax: 1.4, showGrid: true,
    sinusoidals: [{ kind: "cos", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI, label: "y=cos x" }],
  },
  "y11adv-tc-ex-m4": {
    description: "Cosine graph from zero to three pi over two, with one positive region and one negative region.",
    xMin: -0.5, xMax: 5.2, yMin: -1.4, yMax: 1.4, showGrid: true,
    sinusoidals: [{ kind: "cos", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: 1.5 * Math.PI, label: "y=cos x" }],
  },
};

const derivativeCartesianById: Record<string, CartesianGraph> = {
  "y11adv-cs-rd-g3": {
    description: "Derivative graph f prime of x equals three x squared minus three, with its minimum at x equals zero below the axis.",
    xMin: -4, xMax: 4, yMin: -5, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 3, b: 0, c: -3, label: "f'(x)" }],
    points: [{ x: 0, y: -3, label: "turning point of f'" }],
  },
  "y11adv-cs-rd-i5": {
    description: "Representative derivative graph f prime with a local minimum at x equals a.",
    xMin: -4, xMax: 4, yMin: -2, yMax: 10, showGrid: true,
    parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "f'(x)" }],
    points: [{ x: 0, y: 0, label: "x=a" }],
  },
  "y11adv-cs-rd-m8": {
    description: "Representative derivative graph with x-intercepts and turning points visibly distinguished.",
    xMin: -3, xMax: 3, yMin: -4, yMax: 4, showGrid: true,
    curves: [{ kind: "cubic", a: 1, c: -3, label: "f'(x)" }],
    points: [{ x: -Math.sqrt(3), y: 0, label: "x-intercept" }, { x: 0, y: 0, label: "x-intercept" }, { x: Math.sqrt(3), y: 0, label: "x-intercept" }, { x: -1, y: 2, label: "turning point" }, { x: 1, y: -2, label: "turning point" }],
  },
};

const trigGraphsById: Record<string, TrigGraphDiagram> = {
  "y11adv-trig-exam-g4": {
    description: "Basic sine graph over one full period, crossing the origin.",
    functionType: "sin", equationLabel: "y = sin x", xMin: "0", xMax: "2pi",
  },
  "y11adv-trig-exam-i5": {
    description: "Basic tangent graph with its first positive vertical asymptote.",
    functionType: "tan", equationLabel: "y = tan x", xMin: "-pi/2", xMax: "3pi/2",
    asymptotes: [{ x: "pi/2" }],
  },
  "y11adv-trig-exam-m10": {
    description: "Two repeating branches of the basic tangent graph, showing a period of pi.",
    functionType: "tan", equationLabel: "y = tan x", xMin: "-pi/2", xMax: "3pi/2",
    asymptotes: [{ x: "-pi/2" }, { x: "pi/2" }, { x: "3pi/2" }],
    periodMarkers: [{ x: "0" }, { x: "pi" }],
  },
  "y11adv-graph-g1": {
    description: "Basic sine graph over two pi radians, showing one complete cycle.",
    functionType: "sin", equationLabel: "y = sin x", xMin: "0", xMax: "2pi",
    periodMarkers: [{ x: "0" }, { x: "2pi" }],
  },
  "y11adv-graph-g4": {
    description: "Basic tangent graph with consecutive branches separated by vertical asymptotes.",
    functionType: "tan", equationLabel: "y = tan x", xMin: "-pi/2", xMax: "3pi/2",
    asymptotes: [{ x: "-pi/2" }, { x: "pi/2" }, { x: "3pi/2" }],
    periodMarkers: [{ x: "0" }, { x: "pi" }],
  },
  "y11adv-graph-i1": {
    description: "Basic cosine graph over two pi radians, starting and ending at one.",
    functionType: "cos", equationLabel: "y = cos x", xMin: "0", xMax: "2pi",
    periodMarkers: [{ x: "0" }, { x: "2pi" }],
  },
  "y11adv-graph-i5": {
    description: "Basic sine graph beginning at the origin and returning to the x-axis at pi.",
    functionType: "sin", equationLabel: "y = sin x", xMin: "0", xMax: "2pi",
    keyPoints: [{ x: "0", y: "0" }, { x: "pi", y: "0", label: "first positive intercept" }],
  },
  "y11adv-graph-m1": {
    description: "Graph of y equals sine four x, completing four cycles between zero and two pi.",
    functionType: "sin", equationLabel: "y = sin(4x)", xMin: "0", xMax: "2pi",
    periodMarkers: [{ x: "0" }, { x: "pi/2" }],
  },
  "y11adv-graph-m2": {
    description: "Graph of y equals tangent two x with adjacent branches separated by pi over two.",
    functionType: "tan", equationLabel: "y = tan(2x)", xMin: "-pi/4", xMax: "3pi/4",
    asymptotes: [{ x: "-pi/4" }, { x: "pi/4" }, { x: "3pi/4" }],
    periodMarkers: [{ x: "0" }, { x: "pi/2" }],
  },
  "y11adv-graph-m3": {
    description: "Basic cosine graph starting at y equals one when x equals zero.",
    functionType: "cos", equationLabel: "y = cos x", xMin: "0", xMax: "2pi",
    keyPoints: [{ x: "0", y: "1", label: "(0, 1)" }],
  },
  "y11adv-graph-m4": {
    description: "Graph of y equals four sine x with peaks at y equals four and troughs at negative four.",
    functionType: "sin", equationLabel: "y = 4 sin x", xMin: "0", xMax: "2pi", yMin: -5, yMax: 5,
  },
  "y11adv-shift-g4": {
    description: "Sine graph y equals sine of x plus pi over six, shifted pi over six to the left.",
    functionType: "sin", equationLabel: "y = sin(x + pi/6)", xMin: "-pi", xMax: "2pi",
  },
  "y11adv-shift-i5": {
    description: "Sine graph y equals sine of x plus pi over three, shifted pi over three to the left.",
    functionType: "sin", equationLabel: "y = sin(x + pi/3)", xMin: "-pi", xMax: "2pi",
  },
  "y11adv-trig-exam-m8": {
    description: "Basic cosine graph starting at one when x equals zero.",
    functionType: "cos", equationLabel: "y = cos x", xMin: "0", xMax: "2pi",
    keyPoints: [{ x: "0", y: "1", label: "(0, 1)" }],
  },
};

const vennById: Record<string, VennDiagram> = {
  "y11adv-pd-sets-m1": {
    description: "Two overlapping sets A and B inside the universal set, with no region values supplied.",
    setALabel: "A", setBLabel: "B", showCounts: false,
  },
  "y11adv-pd-sets-m7": {
    description: "Two overlapping sets A and B inside the universal set, leaving an outside region for elements in neither set.",
    setALabel: "A", setBLabel: "B", showCounts: false,
  },
};

const signTablesById: Record<string, DataTableDiagram> = {
  "y11adv-stat-g3": {
    description: "First-derivative sign diagram around x equals two, changing from negative to positive.",
    columnHeaders: ["Position", "x < 2", "x = 2", "x > 2"],
    values: [["sign of f'(x)", "-", "0", "+"]],
  },
  "y11adv-stat-m3": {
    description: "First-derivative sign diagram around x equals negative three, changing from negative to positive.",
    columnHeaders: ["Position", "x < -3", "x = -3", "x > -3"],
    values: [["sign of f'(x)", "-", "0", "+"]],
  },
  "y11adv-stat-m7": {
    description: "First-derivative sign diagram around x equals one, changing from negative to positive.",
    columnHeaders: ["Position", "x < 1", "x = 1", "x > 1"],
    values: [["sign of f'(x)", "-", "0", "+"]],
  },
};

const polynomialCurvesById: Record<string, PracticeQuestion["polynomialCurveDiagram"]> = {
  "y11adv-ge-ft-m6": {
    description: "Representative degree-three polynomial with three distinct simple real roots, crossing at each root.",
    roots: [{ value: -2, multiplicity: 1 }, { value: 0, multiplicity: 1 }, { value: 2, multiplicity: 1 }],
    leadingCoefficient: 1, xMin: -4, xMax: 4,
  },
  "y11adv-ge-gp-g3": {
    description: "Cubic polynomial negative x plus one times x minus three squared, crossing at negative one and touching at three.",
    roots: [{ value: -1, multiplicity: 1 }, { value: 3, multiplicity: 2 }],
    leadingCoefficient: -1, xMin: -4, xMax: 6,
  },
  "y11adv-ge-gp-i1": {
    description: "Representative polynomial with a repeated root at one, touching and turning at the x-axis.",
    roots: [{ value: -2, multiplicity: 1 }, { value: 1, multiplicity: 2 }],
    leadingCoefficient: 1, xMin: -4, xMax: 4,
  },
  "y11adv-ge-gp-i3": {
    description: "Cubic y equals x minus one cubed, crossing the x-axis with a horizontal inflection at one.",
    roots: [{ value: 1, multiplicity: 3 }],
    leadingCoefficient: 1, xMin: -3, xMax: 5, label: "P(x)=(x-1)^3",
  },
  "y11adv-ge-gp-i4": {
    description: "Cubic P of x equals x squared times x minus three, touching at zero and crossing at three.",
    roots: [{ value: 0, multiplicity: 2 }, { value: 3, multiplicity: 1 }],
    leadingCoefficient: 1, xMin: -3, xMax: 5, label: "P(x)=x^2(x-3)",
  },
  "y11adv-ge-ex-g3": {
    description: "Cubic P of x equals x plus three times x minus one squared, crossing at negative three and touching at one.",
    roots: [{ value: -3, multiplicity: 1 }, { value: 1, multiplicity: 2 }],
    leadingCoefficient: 1, xMin: -5, xMax: 4, label: "P(x)=(x+3)(x-1)^2",
  },
  "y11adv-ge-ex-m8": {
    description: "Generic positive-leading cubic with a repeated root a where it touches and a distinct root b where it crosses.",
    roots: [{ value: -1, multiplicity: 2 }, { value: 2, multiplicity: 1 }],
    leadingCoefficient: 1, xMin: -4, xMax: 5, label: "y=(x-a)^2(x-b)",
  },
};

const scatterById: Record<string, ScatterPlotDiagram> = {
  "y11adv-bd-sc-g1": {
    description: "Scatter plot of temperature against ice-cream sales with an upward linear trend.",
    xAxisLabel: "Temperature", yAxisLabel: "Ice-cream sales",
    points: [{ x: 10, y: 18 }, { x: 14, y: 25 }, { x: 18, y: 31 }, { x: 22, y: 43 }, { x: 26, y: 52 }, { x: 30, y: 64 }],
  },
  "y11adv-bd-sc-i1": {
    description: "Scatter plot whose points are randomly dispersed with no visible trend.",
    xAxisLabel: "x", yAxisLabel: "y",
    points: [{ x: 1, y: 5 }, { x: 2, y: 2 }, { x: 3, y: 7 }, { x: 4, y: 4 }, { x: 5, y: 8 }, { x: 6, y: 3 }, { x: 7, y: 6 }],
  },
  "y11adv-bd-sc-i2": {
    description: "Scatter plot with a clear non-linear curve that rises increasingly steeply.",
    xAxisLabel: "x", yAxisLabel: "y",
    points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 7 }, { x: 5, y: 12 }, { x: 6, y: 19 }],
  },
  "y11adv-bd-sc-m3": {
    description: "Scatter plot with a weak positive association and points widely spread about an upward trend.",
    xAxisLabel: "x", yAxisLabel: "y",
    points: [{ x: 1, y: 2 }, { x: 2, y: 7 }, { x: 3, y: 3 }, { x: 4, y: 8 }, { x: 5, y: 5 }, { x: 6, y: 10 }, { x: 7, y: 6 }],
  },
  "y11adv-bd-sc-m6": {
    description: "Scatter plot showing a pronounced U-shaped non-linear relationship.",
    xAxisLabel: "x", yAxisLabel: "y",
    points: [{ x: -3, y: 9 }, { x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }],
  },
  "y11adv-bd-dt-g1": {
    description: "Original scatter plot with a curved relationship that may be linearised by transforming a variable.",
    xAxisLabel: "x", yAxisLabel: "y",
    points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 8 }, { x: 5, y: 16 }],
  },
  "y11adv-bd-dt-i1": {
    description: "Scatter plot of square root of x against y whose points follow an approximately straight line.",
    xAxisLabel: "sqrt(x)", yAxisLabel: "y",
    points: [{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 7 }, { x: 4, y: 9 }, { x: 5, y: 11 }],
    lineOfBestFit: "auto",
  },
  "y11adv-bd-dt-m1": {
    description: "Scatter plot of x against log y whose transformed points form an approximately straight line.",
    xAxisLabel: "x", yAxisLabel: "log y",
    points: [{ x: 1, y: 0.5 }, { x: 2, y: 0.8 }, { x: 3, y: 1.1 }, { x: 4, y: 1.4 }, { x: 5, y: 1.7 }],
    lineOfBestFit: "auto",
  },
  "y11adv-bd-dt-m7": {
    description: "Scatter plot of log x against y whose transformed points form an approximately straight line.",
    xAxisLabel: "log x", yAxisLabel: "y",
    points: [{ x: 0, y: 2 }, { x: 0.3, y: 4 }, { x: 0.48, y: 5.2 }, { x: 0.6, y: 6 }, { x: 0.7, y: 6.7 }],
    lineOfBestFit: "auto",
  },
  "y11adv-bd-ex-g1": {
    description: "Scatter plot of revision hours against exam mark with strong positive association and regression line y equals 32 plus 3.5x.",
    xAxisLabel: "Revision hours", yAxisLabel: "Exam mark", xMin: 0, xMax: 18, yMin: 25, yMax: 100,
    points: [{ x: 2, y: 40 }, { x: 5, y: 49 }, { x: 8, y: 61 }, { x: 10, y: 68 }, { x: 12, y: 73 }, { x: 15, y: 85 }],
    lineOfBestFit: { m: 3.5, b: 32 }, correlationLabel: "r = 0.89",
  },
  "y11adv-bd-ex-g3": {
    description: "Transformed scatter plot of x against log y with line log y equals 0.5 plus 0.2x.",
    xAxisLabel: "x", yAxisLabel: "log y",
    points: [{ x: 1, y: 0.7 }, { x: 3, y: 1.1 }, { x: 5, y: 1.5 }, { x: 7, y: 1.9 }, { x: 9, y: 2.3 }],
    lineOfBestFit: { m: 0.2, b: 0.5 },
  },
  "y11adv-bd-ex-i3": {
    description: "Transformed scatter plot of x against log y with line log y equals 2.1 minus 0.05x.",
    xAxisLabel: "x", yAxisLabel: "log y",
    points: [{ x: 0, y: 2.1 }, { x: 5, y: 1.85 }, { x: 10, y: 1.6 }, { x: 15, y: 1.35 }, { x: 20, y: 1.1 }],
    lineOfBestFit: { m: -0.05, b: 2.1 },
  },
  "y11adv-bd-dt-i3": {
    description: "Original x against y scatter plot with a curved increasing pattern before a logarithmic transformation.",
    xAxisLabel: "x", yAxisLabel: "y",
    points: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 8 }, { x: 4, y: 16 }, { x: 5, y: 32 }],
  },
  "y11adv-bd-ex-m6": {
    description: "Transformed scatter plot of square root of x against y with line y equals three plus eight square root x.",
    xAxisLabel: "sqrt(x)", yAxisLabel: "y",
    points: [{ x: 1, y: 11 }, { x: 2, y: 19 }, { x: 3, y: 27 }, { x: 4, y: 35 }, { x: 5, y: 43 }],
    lineOfBestFit: { m: 8, b: 3 },
  },
};

const cartesianDescriptionFixes: Record<string, string> = {
  "y11adv-cs-rd-g1": "Upward-opening derivative graph f prime of x equals three x squared minus three, crossing the x-axis at negative one and one.",
  "y11adv-cs-rd-g2": "Upward-opening derivative graph f prime of x equals three x squared minus three; it is below the x-axis between negative one and one.",
  "y11adv-cs-rd-g4": "Upward-opening derivative graph f prime of x equals three x squared minus three with zeros at negative one and one.",
  "y11adv-cs-rd-i1": "Upward-opening derivative graph f prime of x equals three x squared minus three with vertex at zero comma negative three.",
  "y11adv-cs-rd-i2": "Straight derivative graph f prime of x equals two x minus four, crossing the x-axis at x equals two.",
  "y11adv-cs-rd-i4": "Downward-opening derivative graph f prime of x equals negative three x squared plus three with zeros at negative one and one.",
  "y11adv-cs-rd-m2": "Upward-opening derivative graph f prime of x equals three x squared minus twelve with zeros at negative two and two.",
  "y11adv-cs-rd-m5": "Decreasing straight derivative graph f prime of x equals negative x plus two, crossing the x-axis at x equals two.",
};

function applyQuestionPatch(question: PracticeQuestion): PracticeQuestion {
  const cleanedPrompt = question.prompt.replace(/^Use the diagram to answer the question\.\s*/i, "");
  if (cleanedPrompt !== question.prompt) {
    return applyQuestionPatch({ ...question, prompt: cleanedPrompt });
  }
  const cartesianDescription = cartesianDescriptionFixes[question.id];
  if (cartesianDescription && question.cartesianGraph) {
    return {
      ...question,
      cartesianGraph: { ...question.cartesianGraph, description: cartesianDescription },
    };
  }
  if (
    ["y11adv-rat-g3", "y11adv-rat-m2", "y11adv-rat-m6"].includes(question.id) &&
    question.triangleDiagram
  ) {
    const descriptions: Record<string, string> = {
      "y11adv-rat-g3": "Right line-of-sight triangle with vertical pole and horizontal ground both labelled twenty metres; the observer angle is unknown.",
      "y11adv-rat-m2": "Right line-of-sight triangle with vertical flagpole and horizontal shadow both labelled twelve metres; the sun elevation angle is unknown.",
      "y11adv-rat-m6": "Right line-of-sight triangle showing the elevation angle measured upward from the observer's horizontal line.",
    };
    return {
      ...question,
      triangleDiagram: {
        ...question.triangleDiagram,
        description: descriptions[question.id],
      },
    };
  }
  const triangleDescriptionFixes: Record<string, string> = {
    "y11adv-rat-i2": "Right line-of-sight triangle with vertical cliff height twenty-five metres, a forty-five-degree angle at the boat and unknown horizontal distance.",
    "y11adv-rat-m3": "Right line-of-sight triangle with horizontal distance thirty metres, rooftop height unknown and angle of elevation sixty degrees.",
    "y11adv-nra-m7": "Right triangle ABC with angles A and B both forty-five degrees, side a equal to eight and hypotenuse c unknown.",
  };
  if (triangleDescriptionFixes[question.id] && question.triangleDiagram) {
    return {
      ...question,
      triangleDiagram: {
        ...question.triangleDiagram,
        description: triangleDescriptionFixes[question.id],
      },
    };
  }
  if (question.id === "y11adv-trig-exam-g2" && question.sectorDiagram) {
    return {
      ...question,
      sectorDiagram: {
        ...question.sectorDiagram,
        description: "Full circle represented as a three-hundred-and-sixty-degree sector, with its radius and circumference labels visible.",
      },
    };
  }
  if (question.id === "y11adv-cs-opt-i4" && question.solid3DDiagram) {
    return {
      ...question,
      solid3DDiagram: {
        ...question.solid3DDiagram,
        description: "Closed cylinder of radius r and height h with fixed volume two hundred and fifty pi cubic centimetres.",
      },
    };
  }
  if (
    !question.sectorDiagram &&
    (question.id.includes("-arc-") ||
      question.id.includes("-sector-") ||
      ["y11adv-trig-exam-i2", "y11adv-trig-exam-m4", "y11adv-trig-exam-m5"].includes(question.id))
  ) {
    return { ...question, sectorDiagram: sectorFor(question) };
  }
  const unitCircleDiagram = unitCircleById[question.id];
  if (unitCircleDiagram && !question.unitCircleDiagram) {
    return { ...question, unitCircleDiagram };
  }
  const triangleConfig = triangleConfigs[question.id];
  if (triangleConfig && question.id.includes("-amb-") && !question.lineAngleDiagram) {
    return { ...question, lineAngleDiagram: ambiguousConstruction(triangleConfig) };
  }
  if (triangleConfig && !question.triangleDiagram) {
    return { ...question, triangleDiagram: configuredTriangle(question.id, triangleConfig) };
  }
  const bearingsDiagram = bearingsById[question.id];
  if (bearingsDiagram && !question.bearingsDiagram) {
    return { ...question, bearingsDiagram };
  }
  const dataTableDiagram = dataTablesById[question.id] ?? signTablesById[question.id];
  if (dataTableDiagram && !question.dataTableDiagram) {
    return { ...question, latex: "", dataTableDiagram };
  }
  const twoWayTableDiagram = twoWayTablesById[question.id];
  if (twoWayTableDiagram && !question.twoWayTableDiagram) {
    return { ...question, latex: "", twoWayTableDiagram };
  }
  const cartesianGraph =
    cartesianById[question.id] ??
    additionalCartesianById[question.id] ??
    areaCartesianById[question.id] ??
    derivativeCartesianById[question.id];
  if (cartesianGraph && !question.cartesianGraph) {
    return { ...question, cartesianGraph };
  }
  const trigGraphDiagram = trigGraphsById[question.id];
  if (trigGraphDiagram && !question.trigGraphDiagram) {
    return { ...question, trigGraphDiagram };
  }
  const vennDiagram = vennById[question.id];
  if (vennDiagram && !question.vennDiagram) {
    return { ...question, vennDiagram };
  }
  const scatterPlotDiagram = scatterById[question.id];
  if (scatterPlotDiagram && !question.scatterPlotDiagram) {
    return { ...question, scatterPlotDiagram };
  }
  const polynomialCurveDiagram = polynomialCurvesById[question.id];
  if (polynomialCurveDiagram && !question.polynomialCurveDiagram) {
    return { ...question, polynomialCurveDiagram };
  }
  if (question.id === "y11adv-intg-trap-m5" && !question.trapezoidalRuleDiagram) {
    return {
      ...question,
      trapezoidalRuleDiagram: {
        description: "The curve y equals x squared from zero to two with ordinates at zero, one and two and two trapezoidal strips.",
        xValues: [0, 1, 2],
        yValues: [0, 1, 4],
        curvePoints: [{ x: 0, y: 0 }, { x: 0.25, y: 0.0625 }, { x: 0.5, y: 0.25 }, { x: 0.75, y: 0.5625 }, { x: 1, y: 1 }, { x: 1.5, y: 2.25 }, { x: 2, y: 4 }],
        showOrdinateLabels: true,
        showTrapezoidLabels: true,
        functionLabel: "y = x^2",
      },
    };
  }
  return question;
}

function patchQuestions(lesson: ExplicitLesson): ExplicitLesson {
  return {
    ...lesson,
    guidedPractice: lesson.guidedPractice.map(applyQuestionPatch),
    independentPractice: lesson.independentPractice.map(applyQuestionPatch),
    masteryQuiz: lesson.masteryQuiz.map(applyQuestionPatch),
    masteryQuizPool: lesson.masteryQuizPool?.map(applyQuestionPatch),
    multiPartPractice: lesson.multiPartPractice?.map(applyQuestionPatch),
  };
}

const plane = (
  description: string,
  graph: Omit<CartesianGraph, "description">,
): Partial<WorkedExample> => ({
  cartesianGraph: { description, showGrid: true, ...graph },
});

const WORKED_EXAMPLE_PATCHES: Record<string, Partial<WorkedExample>> = {
  "function-notation-domain-range:2": {
    questionLatex: "",
    dataTableDiagram: dataTablesById["y11adv-fn-g4"],
  },
  "linear-quadratic-cubic-functions:2": {
    questionLatex: "",
    dataTableDiagram: {
      description: "Value table for y equals x cubed from x equals negative two to two.",
      columnHeaders: ["x", "-2", "-1", "0", "1", "2"],
      values: [["y", "-8", "-1", "0", "1", "8"]],
    },
  },
  "transformations-polynomial-reciprocal-graphs:1": plane(
    "Reciprocal graph y equals one over x minus two, minus one, with asymptotes x equals two and y equals negative one.",
    { xMin: -4, xMax: 8, yMin: -7, yMax: 5, curves: [{ kind: "reciprocal", a: 1, h: 2, k: -1, label: "y=1/(x-2)-1" }] },
  ),
  "transformations-polynomial-reciprocal-graphs:2": plane(
    "Reciprocal graph shifted four units left and three units up.",
    { xMin: -10, xMax: 2, yMin: -3, yMax: 9, curves: [{ kind: "reciprocal", a: 1, h: -4, k: 3 }] },
  ),
  "graph-transformations-exam-practice:1": plane(
    "Reciprocal graph y equals one over x minus four plus three.",
    { xMin: -2, xMax: 10, yMin: -3, yMax: 9, curves: [{ kind: "reciprocal", a: 1, h: 4, k: 3 }] },
  ),
  "graph-transformations-exam-practice:2": plane(
    "Graphs of y equals x squared and y equals x minus five squared, showing that replacing x by x minus five shifts the graph five units right.",
    { xMin: -4, xMax: 10, yMin: -2, yMax: 30, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=f(x)" }, { kind: "quadratic", a: 1, b: -10, c: 25, label: "y=f(x-5)" }] },
  ),
  "radians-exact-trigonometric-values:1": {
    triangleDiagram: triangle(
      "Thirty-sixty-ninety reference triangle with hypotenuse two, short side one and long side square root three.",
      { AB: "sqrt(3)", BC: "2", AC: "1" },
      { A: "60 degrees", B: "30 degrees" },
      "C",
    ),
  },
  "radians-exact-trigonometric-values:2": {
    sectorDiagram: {
      description: "Circle sector with radius eight and central angle pi over four.",
      radiusLabel: "r = 8", angleDegrees: 45, angleLabel: "pi/4", showFullCircle: true,
    },
  },
  "radians-exact-trigonometric-values:3": {
    sectorDiagram: {
      description: "Circle sector with radius six and central angle two pi over three.",
      radiusLabel: "r = 6", angleDegrees: 120, angleLabel: "2pi/3", showFullCircle: true,
    },
  },
  "unit-circle-trigonometric-graphs:2": {
    trigGraphDiagram: {
      description: "Basic cosine graph over two full periods, starting at one.",
      functionType: "cos", equationLabel: "y = cos x", xMin: "-2pi", xMax: "2pi",
    },
  },
  "unit-circle-trigonometric-graphs:3": {
    trigGraphDiagram: {
      description: "Basic tangent graph with repeating branches and vertical asymptotes.",
      functionType: "tan", equationLabel: "y = tan x", xMin: "-pi", xMax: "pi",
      asymptotes: [{ x: "-pi/2" }, { x: "pi/2" }],
    },
  },
  "arc-length-radian-measure:0": {
    sectorDiagram: {
      description: "Circle sector with radius six and central angle pi over three.",
      radiusLabel: "r = 6", angleDegrees: 60, angleLabel: "pi/3", arcLabel: "s", showFullCircle: true,
    },
  },
  "arc-length-radian-measure:2": {
    sectorDiagram: {
      description: "Circle sector with radius ten and central angle thirty-six degrees.",
      radiusLabel: "r = 10", angleDegrees: 36, angleLabel: "36 degrees", arcLabel: "s", showFullCircle: true,
    },
  },
  "sector-area-radian-measure:0": {
    sectorDiagram: {
      description: "Circle sector with radius six and central angle pi over three.",
      radiusLabel: "r = 6", angleDegrees: 60, angleLabel: "pi/3", showFullCircle: true,
    },
  },
  "sector-area-radian-measure:2": {
    sectorDiagram: {
      description: "Circle sector with radius five and central angle two pi over five.",
      radiusLabel: "r = 5", angleDegrees: 72, angleLabel: "2pi/5", arcLabel: "s", showFullCircle: true,
    },
  },
  "ambiguous-case-sine-rule:0": {
    lineAngleDiagram: ambiguousConstruction(triangleConfigs["y11adv-amb-g2"]),
  },
  "ambiguous-case-sine-rule:2": {
    lineAngleDiagram: ambiguousConstruction(triangleConfigs["y11adv-amb-g4"]),
  },
  "trigonometry-measure-angles-exam-practice:1": {
    sectorDiagram: {
      description: "Circle sector with radius nine and central angle two pi over three.",
      radiusLabel: "r = 9", angleDegrees: 120, angleLabel: "2pi/3", arcLabel: "s", showFullCircle: true,
    },
  },
  "trigonometry-measure-angles-exam-practice:2": {
    trigGraphDiagram: {
      description: "Basic tangent graph over two consecutive branches with vertical asymptotes.",
      functionType: "tan", equationLabel: "y = tan x", xMin: "-pi/2", xMax: "3pi/2",
      asymptotes: [{ x: "-pi/2" }, { x: "pi/2" }, { x: "3pi/2" }],
    },
  },
  "index-laws-exponential-functions:3": plane(
    "Increasing exponential graph y equals three to the power x, crossing the y-axis at one and approaching zero to the left.",
    { xMin: -4, xMax: 4, yMin: -1, yMax: 30, curves: [{ kind: "exponential", base: 3, label: "y=3^x" }], points: [{ x: 0, y: 1, label: "(0, 1)" }] },
  ),
  "rates-of-change-gradients:1": plane(
    "A curve passing through A at two comma five and B at six comma seventeen, with the secant segment AB.",
    { xMin: 0, xMax: 8, yMin: 0, yMax: 22, curves: [{ kind: "cubic", a: 0, b: 0, c: 3, d: -1 }], points: [{ x: 2, y: 5, label: "A" }, { x: 6, y: 17, label: "B" }], lineSegments: [{ from: { x: 2, y: 5 }, to: { x: 6, y: 17 }, label: "secant AB" }] },
  ),
  "stationary-points-first-derivative-test:1": {
    dataTableDiagram: {
      description: "First-derivative sign table for f prime equals three x squared minus three, with stationary values at negative one and one.",
      columnHeaders: ["Interval", "x < -1", "x = -1", "-1 < x < 1", "x = 1", "x > 1"],
      values: [["sign of f'(x)", "+", "0", "-", "0", "+"]],
    },
  },
  "introduction-differentiation-exam-practice:1": plane(
    "Cubic curve y equals x cubed minus three x with stationary points at x equals negative one and one.",
    { xMin: -3, xMax: 3, yMin: -6, yMax: 6, curves: [{ kind: "cubic", a: 1, c: -3, label: "y=x^3-3x" }], points: [{ x: -1, y: 2, label: "local maximum" }, { x: 1, y: -2, label: "local minimum" }] },
  ),
  "data-displays-summary-statistics:1": {
    questionLatex: "",
    dataTableDiagram: {
      description: "Frequency table of scores one to four with frequencies two, three, four and one.",
      columnHeaders: ["Score", "1", "2", "3", "4"],
      values: [["Frequency", "2", "3", "4", "1"]],
    },
  },
  "probability-relative-frequency:1": {
    questionLatex: "",
    twoWayTableDiagram: {
      description: "Bus and train travel by year group for sixty students.",
      rowLabels: ["Year 11", "Year 12"], columnLabels: ["Bus", "Train"],
      values: [[18, 12], [10, 20]], rowTotals: [30, 30], columnTotals: [28, 32], grandTotal: 60,
    },
  },
  "conditional-probability-independence:2": {
    questionLatex: "",
    twoWayTableDiagram: {
      description: "Pass and fail results classified by tutoring status for fifty students.",
      rowLabels: ["Tutored", "Not tutored"], columnLabels: ["Pass", "Fail"],
      values: [[15, 5], [5, 25]], rowTotals: [20, 30], columnTotals: [20, 30], grandTotal: 50,
    },
  },
  "discrete-random-variables:0": {
    questionLatex: "",
    dataTableDiagram: {
      description: "Probability distribution for X taking values zero, one and two.",
      columnHeaders: ["x", "0", "1", "2"],
      values: [["P(X=x)", "0.2", "0.5", "0.3"]],
    },
  },
  "expected-value-standard-deviation:0": {
    questionLatex: "",
    dataTableDiagram: {
      description: "Two-value probability distribution with probabilities zero point seven and zero point three.",
      columnHeaders: ["x", "0", "10"],
      values: [["P(X=x)", "0.7", "0.3"]],
    },
  },
  "probability-data-exam-practice:2": {
    questionLatex: "",
    dataTableDiagram: {
      description: "Probability distribution for X taking values zero, two and five.",
      columnHeaders: ["x", "0", "2", "5"],
      values: [["P(X=x)", "0.2", "0.5", "0.3"]],
    },
  },
  "areas-under-curves:0": plane(
    "Region under y equals x squared and above the x-axis from x equals zero to three.",
    { xMin: -1, xMax: 4, yMin: -1, yMax: 10, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=x^2" }], shadedRegions: [{ kind: "under-function", functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 }, xMin: 0, xMax: 3, color: "blue" }] },
  ),
  "areas-under-curves:1": plane(
    "Region between y equals x squared minus four and the x-axis from zero to two, lying below the axis.",
    { xMin: -1, xMax: 3, yMin: -5, yMax: 5, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: -4, label: "y=x^2-4" }], shadedRegions: [{ kind: "between-functions", xMin: 0, xMax: 2, top: { functionType: "line", line: { m: 0, b: 0 } }, bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: -4 } }, color: "amber" }] },
  ),
  "areas-under-curves:2": plane(
    "Region between y equals x and y equals x squared from zero to one.",
    { xMin: -0.5, xMax: 1.5, yMin: -0.5, yMax: 1.5, lines: [{ kind: "linear", m: 1, b: 0, label: "y=x" }], parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=x^2" }], shadedRegions: [{ kind: "between-functions", xMin: 0, xMax: 1, top: { functionType: "line", line: { m: 1, b: 0 } }, bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } }, color: "blue" }] },
  ),
  "reading-derivative-graphs:0": plane(
    "Derivative graph y equals three x squared minus three, crossing the x-axis at negative one and one.",
    { xMin: -3, xMax: 3, yMin: -5, yMax: 18, parabolas: [{ kind: "quadratic", a: 3, b: 0, c: -3, label: "y=f'(x)" }], points: [{ x: -1, y: 0 }, { x: 1, y: 0 }] },
  ),
  "reading-derivative-graphs:1": plane(
    "Representative increasing derivative graph f prime, used to identify where f is concave up.",
    { xMin: -4, xMax: 4, yMin: -5, yMax: 5, lines: [{ kind: "linear", m: 1, b: 0, label: "f'(x)" }] },
  ),
  "curve-sketching-exam-practice:0": plane(
    "Cubic curve y equals x cubed minus three x plus two with roots negative two and one, where one is a repeated root.",
    { xMin: -4, xMax: 3, yMin: -10, yMax: 15, curves: [{ kind: "cubic", a: 1, c: -3, d: 2, label: "y=x^3-3x+2" }], points: [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 4, label: "local maximum" }, { x: 1, y: 0, label: "local minimum" }] },
  ),
  "curve-sketching-exam-practice:1": plane(
    "Schematic smooth curve with a local maximum at negative two comma five and passing through zero comma one.",
    { xMin: -5, xMax: 3, yMin: -2, yMax: 7, parabolas: [{ kind: "quadratic", a: -1, b: -4, c: 1 }], points: [{ x: -2, y: 5, label: "local maximum" }, { x: 0, y: 1, label: "(0, 1)" }] },
  ),
  "systematic-curve-sketching:0": plane(
    "Complete cubic sketch of y equals x cubed minus three x plus two, with intercepts and stationary points marked.",
    { xMin: -4, xMax: 3, yMin: -10, yMax: 15, curves: [{ kind: "cubic", a: 1, c: -3, d: 2, label: "y=x^3-3x+2" }], points: [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 4, label: "local maximum" }, { x: 1, y: 0, label: "local minimum" }, { x: 0, y: 2 }] },
  ),
  "systematic-curve-sketching:1": plane(
    "Complete cubic sketch of y equals two x cubed minus three x squared, with roots and stationary points marked.",
    { xMin: -2, xMax: 3, yMin: -8, yMax: 25, curves: [{ kind: "cubic", a: 2, b: -3, label: "y=2x^3-3x^2" }], points: [{ x: 0, y: 0, label: "stationary root" }, { x: 1, y: -1, label: "local minimum" }, { x: 1.5, y: 0 }] },
  ),
  "applications-trig-calculus:1": plane(
    "One arch of y equals sine x above the x-axis from zero to pi.",
    { xMin: -1, xMax: 4, yMin: -0.3, yMax: 1.4, sinusoidals: [{ kind: "sin", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI, label: "y=sin x" }], points: [{ x: 0, y: 0 }, { x: Math.PI, y: 0, label: "pi" }] },
  ),
  "graphing-polynomials:0": {
    polynomialCurveDiagram: {
      description: "Cubic polynomial P of x with simple roots at negative two, one and two.",
      roots: [{ value: -2, multiplicity: 1 }, { value: 1, multiplicity: 1 }, { value: 2, multiplicity: 1 }],
      leadingCoefficient: 1, xMin: -4, xMax: 4, label: "P(x)=(x-1)(x-2)(x+2)",
    },
  },
  "graphing-polynomials:1": {
    polynomialCurveDiagram: {
      description: "Cubic polynomial P of x touching the x-axis at the repeated root negative one and crossing at three.",
      roots: [{ value: -1, multiplicity: 2 }, { value: 3, multiplicity: 1 }],
      leadingCoefficient: 1, xMin: -4, xMax: 5, label: "P(x)=(x+1)^2(x-3)",
    },
  },
  "scatter-plots-correlation:0": {
    scatterPlotDiagram: {
      description: "Scatter plot of study hours against test score with a strong positive linear association.",
      xAxisLabel: "Hours studied", yAxisLabel: "Test score",
      points: [{ x: 1, y: 48 }, { x: 2, y: 53 }, { x: 3, y: 58 }, { x: 4, y: 61 }, { x: 5, y: 69 }, { x: 6, y: 72 }, { x: 7, y: 78 }, { x: 8, y: 83 }, { x: 9, y: 88 }, { x: 10, y: 93 }],
      lineOfBestFit: "auto",
    },
  },
  "data-transformation:1": {
    scatterPlotDiagram: scatterById["y11adv-bd-dt-g1"],
  },
  "normal-distribution:0": {
    normalDistributionDiagram: {
      description: "Symmetric bell-shaped normal distribution centred at fifty with standard deviation five.",
      mean: 50, standardDeviation: 5, axisLabel: "X", showStandardDeviationLabels: true,
    },
  },
  "z-scores-standardising:0": {
    normalDistributionDiagram: {
      description: "Normal distribution with mean seventy and standard deviation ten, marking X equals eighty-five.",
      mean: 70, standardDeviation: 10, axisLabel: "X", showStandardDeviationLabels: true,
      markers: [{ value: 85, label: "X = 85", zScore: 1.5 }],
    },
  },
  "normal-tables-probabilities:0": {
    dataTableDiagram: {
      description: "Standard normal cumulative table entry at z equals one point three two.",
      columnHeaders: ["z", "Phi(z)"], values: [["1.32", "0.9066"]], highlight: { rowIndex: 0, columnIndex: 1 },
    },
  },
  "normal-tables-probabilities:1": {
    normalDistributionDiagram: {
      description: "Normal distribution with mean fifty and standard deviation eight, marking X equals fifty-eight and the upper tail.",
      mean: 50, standardDeviation: 8, axisLabel: "X", showStandardDeviationLabels: true,
      markers: [{ value: 58, label: "58", zScore: 1 }],
    },
  },
};

function patchWorkedExamples(lesson: ExplicitLesson): ExplicitLesson {
  return {
    ...lesson,
    workedExamples: lesson.workedExamples.map((example, index) => ({
      ...example,
      ...WORKED_EXAMPLE_PATCHES[`${lesson.slug}:${index}`],
    })),
  };
}

export function applyYear11AdvancedDiagramRemediation(
  lesson: ExplicitLesson,
): ExplicitLesson {
  return patchWorkedExamples(patchQuestions(lesson));
}
