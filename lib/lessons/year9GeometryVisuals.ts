import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import type {
  LineAngleDiagram,
  PlaneShapeDiagram,
  TriangleDiagram,
  TrianglePairDiagram,
} from "./types";

type GeometryLesson = Partial<ExplicitLesson>;
type GeometryItem = PracticeQuestion | WorkedExample;
type TriangleSide = "AB" | "BC" | "AC";

const visualFields = [
  "triangleDiagram",
  "trianglePairDiagram",
  "congruentTrianglesDiagram",
  "lineAngleDiagram",
  "planeShapeDiagram",
] as const;

function hasVisual(item: GeometryItem) {
  return visualFields.some((field) => Boolean(item[field]));
}

function numbersIn(text: string) {
  return normaliseSimpleFractions(text).match(/\d+(?:\.\d+)?/g) ?? [];
}

function normaliseSimpleFractions(text: string) {
  return text
    .replace(/\\(?:tfrac|frac)\s*\{([^{}]+)\}\s*\{([^{}]+)\}/gi, " $1 / $2 ")
    .replace(/\\(?:tfrac|frac)\s*([0-9a-z])\s*([0-9a-z])/gi, " $1 / $2 ");
}

function asksForAngle(question: PracticeQuestion) {
  return Boolean(
    question.acceptedAnswers?.some((answer) => /\u00b0|degrees?/i.test(answer)) ||
      /find[^?.]{0,35}(?:\\angle|angle)/i.test(question.prompt)
  );
}

function triangle(
  angleLabels: TriangleDiagram["angleLabels"] = {},
  options: {
    angleMarks?: TriangleDiagram["angleMarks"];
    description?: string;
    rightAngleAt?: TriangleDiagram["rightAngleAt"];
    sideLabels?: TriangleDiagram["sideLabels"];
    sideTicks?: TriangleDiagram["sideTicks"];
    vertexLabels?: TriangleDiagram["vertexLabels"];
    wide?: boolean;
  } = {}
): TriangleDiagram {
  return {
    description:
      options.description ??
      "Triangle with the displayed side and angle labels; the unknown quantity is labelled x.",
    vertices: options.wide
      ? { A: { x: 45, y: 225 }, B: { x: 315, y: 225 }, C: { x: 135, y: 45 } }
      : { A: { x: 65, y: 225 }, B: { x: 295, y: 225 }, C: { x: 170, y: 45 } },
    vertexLabels: options.vertexLabels,
    sideLabels: options.sideLabels,
    angleLabels,
    angleMarks: options.angleMarks,
    sideTicks: options.sideTicks,
    rightAngleAt: options.rightAngleAt,
    viewBox: "0 0 360 275",
  };
}

function trianglePair(options: {
  description: string;
  leftAngles?: TriangleDiagram["angleLabels"];
  leftAngleMarks?: TriangleDiagram["angleMarks"];
  leftCaption?: string;
  leftSides?: TriangleDiagram["sideLabels"];
  leftSideTicks?: TriangleDiagram["sideTicks"];
  relationLabel?: string;
  rightAngles?: TriangleDiagram["angleLabels"];
  rightAngleMarks?: TriangleDiagram["angleMarks"];
  rightCaption?: string;
  rightRightAngleAt?: TriangleDiagram["rightAngleAt"];
  leftRightAngleAt?: TriangleDiagram["rightAngleAt"];
  rightSides?: TriangleDiagram["sideLabels"];
  rightSideTicks?: TriangleDiagram["sideTicks"];
  differentSizes?: boolean;
}): TrianglePairDiagram {
  const left = triangle(options.leftAngles, {
    angleMarks: options.leftAngleMarks,
    description: options.leftCaption ?? "Left triangle.",
    rightAngleAt: options.leftRightAngleAt,
    sideLabels: options.leftSides,
    sideTicks: options.leftSideTicks,
  });
  const right = triangle(options.rightAngles, {
    angleMarks: options.rightAngleMarks,
    description: options.rightCaption ?? "Right triangle.",
    rightAngleAt: options.rightRightAngleAt,
    sideLabels: options.rightSides,
    sideTicks: options.rightSideTicks,
    vertexLabels: { A: "D", B: "E", C: "F" },
    wide: options.differentSizes,
  });
  if (options.differentSizes) {
    right.vertices = {
      A: { x: 35, y: 235 },
      B: { x: 325, y: 235 },
      C: { x: 185, y: 25 },
    };
  }
  return {
    description: options.description,
    left,
    right,
    leftCaption: options.leftCaption,
    rightCaption: options.rightCaption,
    relationLabel: options.relationLabel,
  };
}

function exteriorTriangleDiagram(labels: {
  firstInterior: string;
  secondInterior: string;
  exterior: string;
}): LineAngleDiagram {
  return {
    description: `Triangle ABC has opposite interior angles ${labels.firstInterior} and ${labels.secondInterior}; the exterior angle at C is ${labels.exterior}.`,
    points: [
      { id: "A", x: 55, y: 220, label: "A" },
      { id: "B", x: 190, y: 45, label: "B" },
      { id: "C", x: 310, y: 220, label: "C" },
      { id: "D", x: 390, y: 220, showLabel: false },
    ],
    segments: [
      { from: "A", to: "B" },
      { from: "B", to: "C" },
      { from: "A", to: "D" },
    ],
    angles: [
      { vertex: "A", from: "B", to: "C", label: labels.firstInterior },
      { vertex: "B", from: "A", to: "C", label: labels.secondInterior },
      { vertex: "C", from: "B", to: "D", label: labels.exterior, highlighted: true },
    ],
    viewBox: "15 15 420 255",
  };
}

type ParallelRelation = "alternate" | "co-interior" | "corresponding";

function parallelAngleDiagram(
  relation: ParallelRelation,
  firstLabel: string,
  secondLabel = "x"
): LineAngleDiagram {
  const first =
    relation === "alternate"
      ? { vertex: "P", from: "B", to: "Q", label: firstLabel }
      : relation === "co-interior"
        ? { vertex: "P", from: "B", to: "Q", label: firstLabel }
        : { vertex: "P", from: "A", to: "E", label: firstLabel };
  const second =
    relation === "alternate"
      ? { vertex: "Q", from: "C", to: "P", label: secondLabel }
      : relation === "co-interior"
        ? { vertex: "Q", from: "D", to: "P", label: secondLabel }
        : { vertex: "Q", from: "C", to: "P", label: secondLabel };

  return {
    description: `Two parallel horizontal lines are crossed by a transversal. A ${relation} angle is labelled ${firstLabel}, and the related angle is labelled ${secondLabel}.`,
    points: [
      { id: "A", x: 35, y: 80, showLabel: false },
      { id: "B", x: 365, y: 80, showLabel: false },
      { id: "C", x: 35, y: 220, showLabel: false },
      { id: "D", x: 365, y: 220, showLabel: false },
      { id: "E", x: 105, y: 25, showLabel: false },
      { id: "F", x: 295, y: 275, showLabel: false },
      { id: "P", x: 147, y: 80, showDot: false, showLabel: false },
      { id: "Q", x: 253, y: 220, showDot: false, showLabel: false },
    ],
    segments: [
      { from: "A", to: "B", parallelMarks: 1 },
      { from: "C", to: "D", parallelMarks: 1 },
      { from: "E", to: "F", highlighted: true },
    ],
    angles: [
      { ...first, highlighted: true },
      { ...second, highlighted: true },
    ],
    viewBox: "10 5 410 285",
  };
}

function verticallyOppositeDiagram(firstLabel: string, secondLabel = "x"): LineAngleDiagram {
  return {
    description: `Two straight lines intersect. Vertically opposite angles are labelled ${firstLabel} and ${secondLabel}.`,
    points: [
      { id: "A", x: 55, y: 225, showLabel: false },
      { id: "B", x: 325, y: 45, showLabel: false },
      { id: "C", x: 55, y: 45, showLabel: false },
      { id: "D", x: 325, y: 225, showLabel: false },
      { id: "O", x: 190, y: 135, showDot: false, showLabel: false },
    ],
    segments: [{ from: "A", to: "B" }, { from: "C", to: "D" }],
    angles: [
      { vertex: "O", from: "B", to: "C", label: firstLabel, highlighted: true },
      { vertex: "O", from: "A", to: "D", label: secondLabel, highlighted: true },
    ],
    viewBox: "15 10 350 260",
  };
}

function quadrilateralDiagram(labels: [string, string, string, string]): PlaneShapeDiagram {
  return {
    description: `Irregular quadrilateral with interior angles labelled ${labels.join(", ")}.`,
    vertices: [
      { x: 0, y: 0, label: "A", angleLabel: labels[0] },
      { x: 5, y: 0, label: "B", angleLabel: labels[1] },
      { x: 4, y: 3, label: "C", angleLabel: labels[2] },
      { x: 1, y: 4, label: "D", angleLabel: labels[3] },
    ],
    fill: "blue",
  };
}

function regularPolygonDiagram(sides: number, angleLabel?: string): PlaneShapeDiagram {
  const vertices = Array.from({ length: sides }, (_, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / sides;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
      angleLabel: index === 0 ? angleLabel : undefined,
    };
  });
  return {
    description: `Regular ${sides}-sided polygon${angleLabel ? ` with one interior angle labelled ${angleLabel}` : ""}.`,
    vertices,
    edges: vertices.map(() => ({ ticks: 1 as const })),
    fill: "teal",
  };
}

function congruenceTestPair(test: string, values: string[] = []): TrianglePairDiagram {
  const sideTicks: Partial<Record<TriangleSide, 1 | 2 | 3>> = {};
  const angleMarks: TriangleDiagram["angleMarks"] = {};
  let rightAngleAt: TriangleDiagram["rightAngleAt"];
  if (test === "SSS") Object.assign(sideTicks, { AB: 1, BC: 2, AC: 3 });
  if (test === "SAS") {
    Object.assign(sideTicks, { AB: 1, AC: 2 });
    Object.assign(angleMarks, { A: 1 });
  }
  if (test === "AAS" || test === "AA") {
    Object.assign(angleMarks, { A: 1, B: 2 });
    if (test === "AAS") Object.assign(sideTicks, { BC: 1 });
  }
  if (test === "RHS") {
    rightAngleAt = "B";
    Object.assign(sideTicks, { AC: 1, AB: 2 });
  }
  if (test === "AAA") Object.assign(angleMarks, { A: 1, B: 2, C: 3 });

  const sides: TriangleDiagram["sideLabels"] = {};
  const angles: TriangleDiagram["angleLabels"] = {};
  if (test === "SSS") {
    if (values[0]) sides.AB = values[0];
    if (values[1]) sides.AC = values[1];
    if (values[2]) sides.BC = values[2];
  }
  if (test === "SAS") {
    if (values[0]) sides.AB = values[0];
    if (values[1]) sides.AC = values[1];
    if (values[2]) angles.A = `${values[2]}°`;
  }
  if (test === "AAS" || test === "AA" || test === "AAA") {
    if (values[0]) angles.A = `${values[0]}°`;
    if (values[1]) angles.B = `${values[1]}°`;
    if (test === "AAA" && values[2]) angles.C = `${values[2]}°`;
    if (test === "AAS" && values[2]) sides.BC = values[2];
  }
  if (test === "RHS") {
    if (values[0]) sides.AC = values[0];
    if (values[1]) sides.AB = values[1];
  }

  return trianglePair({
    description: `Two triangles display the markings for the ${test} ${test === "AA" || test === "AAA" ? "similarity" : "congruence"} information.`,
    leftAngles: angles,
    leftAngleMarks: angleMarks,
    leftRightAngleAt: rightAngleAt,
    leftSides: sides,
    leftSideTicks: sideTicks,
    relationLabel: "?",
    rightAngles: angles,
    rightAngleMarks: angleMarks,
    rightRightAngleAt: rightAngleAt,
    rightSides: sides,
    rightSideTicks: sideTicks,
    differentSizes: test === "AAA" || test === "AA",
  });
}

function similarityTestPair(test: "AA" | "SAS" | "SSS", values: string[]): TrianglePairDiagram {
  if (test === "AA") {
    return trianglePair({
      description: "Two different-sized triangles have two matching pairs of equal angles.",
      leftAngleMarks: { A: 1, B: 2 },
      relationLabel: "?",
      rightAngleMarks: { A: 1, B: 2 },
      differentSizes: true,
    });
  }
  if (test === "SAS") {
    return trianglePair({
      description: "Two different-sized triangles have proportional labelled sides around equal included angles.",
      leftAngles: values[2] ? { A: `${values[2]}°` } : undefined,
      leftAngleMarks: { A: 1 },
      leftSides: { AB: values[0] ?? "a", AC: values[1] ?? "b" },
      relationLabel: "?",
      rightAngles: values[5] || values[2] ? { A: `${values[5] ?? values[2]}°` } : undefined,
      rightAngleMarks: { A: 1 },
      rightSides: { AB: values[3] ?? "ka", AC: values[4] ?? "kb" },
      differentSizes: true,
    });
  }
  return trianglePair({
    description: "Two different-sized triangles have three pairs of proportional labelled sides.",
    leftSides: { AB: values[0] ?? "a", AC: values[1] ?? "b", BC: values[2] ?? "c" },
    relationLabel: "?",
    rightSides: { AB: values[3] ?? "ka", AC: values[4] ?? "kb", BC: values[5] ?? "kc" },
    differentSizes: true,
  });
}

function correspondingPair(kind: "angle" | "side", value: string): TrianglePairDiagram {
  return trianglePair({
    description: `Two triangles are known to be congruent. A corresponding ${kind} on the first is ${value}; the matching ${kind} on the second is x.`,
    leftAngles: kind === "angle" ? { C: `${value}°` } : undefined,
    leftAngleMarks: kind === "angle" ? { C: 1 } : undefined,
    leftSides: kind === "side" ? { BC: value } : undefined,
    leftSideTicks: kind === "side" ? { BC: 1 } : undefined,
    relationLabel: "congruent",
    rightAngles: kind === "angle" ? { C: "x" } : undefined,
    rightAngleMarks: kind === "angle" ? { C: 1 } : undefined,
    rightSides: kind === "side" ? { BC: "x" } : undefined,
    rightSideTicks: kind === "side" ? { BC: 1 } : undefined,
  });
}

function correspondingAngleFromSum(first: string, second: string): TrianglePairDiagram {
  return trianglePair({
    description: `Two congruent triangles. The first has angles ${first} degrees and ${second} degrees; its third angle corresponds to x in the second triangle.`,
    leftAngles: { A: `${first}°`, B: `${second}°` },
    leftAngleMarks: { C: 1 },
    relationLabel: "congruent",
    rightAngles: { C: "x" },
    rightAngleMarks: { C: 1 },
  });
}

function similarSidePair(
  left: [string, string?],
  right: [string, string?],
  relationLabel = "similar"
): TrianglePairDiagram {
  return trianglePair({
    description: `Two similar triangles have corresponding side labels ${left.filter(Boolean).join(", ")} and ${right.filter(Boolean).join(", ")}.`,
    leftCaption: "Original",
    leftSides: { AB: left[0], AC: left[1] },
    relationLabel,
    rightCaption: "Image",
    rightSides: { AB: right[0], AC: right[1] },
    differentSizes: true,
  });
}

function similarAreaPair(originalArea: string | undefined, scaleFactor: string): TrianglePairDiagram {
  return trianglePair({
    description: originalArea
      ? `Two similar figures have linear scale factor ${scaleFactor}. The original area is ${originalArea} and the image area is x.`
      : `Two similar figures have linear scale factor ${scaleFactor}. Their area scale factor is x.`,
    leftCaption: originalArea ? `Area = ${originalArea}` : "Area = A",
    relationLabel: `linear SF ${scaleFactor}`,
    rightCaption: originalArea ? "Area = x" : "Area = xA",
    differentSizes: true,
  });
}

function nestedTriangleDiagram(labels: [string, string, string, string]): LineAngleDiagram {
  return {
    description: `Triangle ABC contains segment DE parallel to BC. Corresponding lengths are labelled ${labels.join(", ")}.`,
    points: [
      { id: "A", x: 190, y: 35, label: "A" },
      { id: "B", x: 45, y: 250, label: "B" },
      { id: "C", x: 350, y: 250, label: "C" },
      { id: "D", x: 125, y: 145, label: "D" },
      { id: "E", x: 270, y: 145, label: "E" },
    ],
    segments: [
      { from: "A", to: "B", label: labels[1], labelOffset: { x: -28, y: 24 } },
      { from: "A", to: "C", label: labels[3], labelOffset: { x: 28, y: 24 } },
      { from: "A", to: "D", label: labels[0], highlighted: true },
      { from: "A", to: "E", label: labels[2], highlighted: true },
      { from: "B", to: "C", parallelMarks: 1 },
      { from: "D", to: "E", parallelMarks: 1, highlighted: true },
    ],
    angles: [
      { vertex: "D", from: "A", to: "E", marks: 1 },
      { vertex: "B", from: "A", to: "C", marks: 1 },
      { vertex: "E", from: "D", to: "A", marks: 2 },
      { vertex: "C", from: "B", to: "A", marks: 2 },
    ],
    viewBox: "10 5 400 285",
  };
}

function angleVisual(question: PracticeQuestion): PracticeQuestion {
  const lower = question.prompt.toLowerCase();
  if (
    /how many degrees is a right angle|angles of a triangle add to|each angle of an equilateral|an isosceles triangle has:|a straight angle is:|exterior angle of a triangle equals:/.test(lower)
  ) return question;

  const values = numbersIn(question.prompt);
  if (lower.includes("exterior")) {
    const exteriorIsGiven = /exterior angle(?: of a triangle)? is \d/i.test(lower);
    const diagram = exteriorIsGiven
      ? exteriorTriangleDiagram({
          firstInterior: values[1] ? `${values[1]}°` : "x",
          secondInterior: "x",
          exterior: values[0] ? `${values[0]}°` : "x",
        })
      : exteriorTriangleDiagram({
          firstInterior: values[0] ? `${values[0]}°` : "x",
          secondInterior: values[1] ? `${values[1]}°` : "x",
          exterior: "x",
        });
    return {
      ...question,
      prompt: "Use the exterior-angle diagram to find x.",
      latex: "",
      lineAngleDiagram: diagram,
    };
  }

  let angleLabels: TriangleDiagram["angleLabels"] = {};
  let sideTicks: TriangleDiagram["sideTicks"];
  let rightAngleAt: TriangleDiagram["rightAngleAt"];
  if (lower.includes("isosceles")) {
    sideTicks = { AC: 1, BC: 1 };
    if (lower.includes("apex")) angleLabels = { A: "x", B: "x", C: values[0] ? `${values[0]}°` : "x" };
    else angleLabels = { A: values[0] ? `${values[0]}°` : "x", B: values[0] ? `${values[0]}°` : "x", C: "x" };
    if (lower.includes("right")) {
      rightAngleAt = "C";
      angleLabels = { A: "x", B: "x", C: "90\u00b0" };
    }
  } else if (lower.includes("ratio")) {
    const ratio = question.prompt.match(/(\d+)\s*:\s*(\d+)\s*:\s*(\d+)/);
    angleLabels = ratio
      ? { A: `${ratio[1]}k`, B: `${ratio[2]}k`, C: `${ratio[3]}k` }
      : { A: "x", B: "2x", C: "90°" };
    if (lower.includes("right")) rightAngleAt = "C";
  } else if (/x\s*,\s*x\s*\+\s*20/i.test(question.prompt)) {
    angleLabels = { A: "x", B: "x + 20", C: "x + 40" };
  } else if (lower.includes("two angles") && lower.includes("equal")) {
    angleLabels = { A: "x", B: "x", C: values[0] ? `${values[0]}°` : "x" };
  } else if (lower.includes("double the smallest")) {
    angleLabels = { A: "x", B: "2x", C: "90°" };
    rightAngleAt = "C";
  } else {
    angleLabels = {
      A: values[0] ? `${values[0]}°` : "x",
      B: values[1] ? `${values[1]}°` : "x",
      C: "x",
    };
  }
  return {
    ...question,
    prompt: lower.includes("ratio")
      ? `Use the angle ratio shown in the labelled triangle to find the ${lower.includes("smallest") ? "smallest" : "largest"} angle.`
      : "Use the labelled triangle to find x.",
    latex: "",
    triangleDiagram: triangle(angleLabels, {
      description: "Triangle with the given angle labels and the required angle labelled x.",
      rightAngleAt,
      sideTicks,
    }),
  };
}

function parallelVisual(question: PracticeQuestion): PracticeQuestion {
  const lower = question.prompt.toLowerCase();
  if (/alternate angles on parallel lines are:|corresponding angles on parallel lines are:|co-interior angles on parallel lines add to:/.test(lower)) {
    const relation: ParallelRelation = lower.includes("co-interior")
      ? "co-interior"
      : lower.includes("alternate")
        ? "alternate"
        : "corresponding";
    return {
      ...question,
      prompt: relation === "co-interior"
        ? "The arrow marks show parallel lines. What do the two highlighted co-interior angles in the diagram add to?"
        : `The arrow marks show parallel lines. What is the relationship between the highlighted ${relation} angles in the diagram?`,
      latex: "",
      lineAngleDiagram: parallelAngleDiagram(relation, "a", "b"),
    };
  }
  if (lower.includes("vertically opposite angles are:")) {
    return {
      ...question,
      prompt: "What is the relationship between the two highlighted vertically opposite angles in the diagram?",
      latex: "",
      lineAngleDiagram: verticallyOppositeDiagram("a", "b"),
    };
  }
  const values = numbersIn(question.prompt);
  if (lower.includes("vertically opposite") && !lower.includes("co-interior")) {
    return {
      ...question,
      prompt: "Use the intersecting-lines diagram to find x.",
      latex: "",
      lineAngleDiagram: verticallyOppositeDiagram(values[0] ? `${values[0]}°` : "x", "x"),
    };
  }
  const relation: ParallelRelation = lower.includes("co-interior")
    ? "co-interior"
    : lower.includes("alternate")
      ? "alternate"
      : "corresponding";
  let first = values[0] ? `${values[0]}°` : "x";
  let second = "x";
  if (/3x/i.test(question.prompt) && values[0]) first = "3x";
  if (/2x/i.test(question.prompt) && values[0]) first = "2x";
  if (/x\s*\+\s*30/i.test(question.prompt)) first = "x + 30";
  if (/x\s*\+\s*50/i.test(question.prompt)) {
    first = "x";
    second = "50°";
  } else if (/3x[^\n]*\bx\b/i.test(question.prompt)) {
    first = "3x";
    second = "x";
  } else if (/ratio\s*2\s*:\s*1/i.test(lower)) {
    first = "2x";
    second = "x";
  } else if (/equals?\s*\d/i.test(lower) && /[23]x|x\s*\+/.test(lower)) {
    second = values.at(-1) ? `${values.at(-1)}°` : second;
  }
  return {
    ...question,
    prompt: "The arrow marks show that the lines are parallel. Use the diagram to find x.",
    latex: "",
    lineAngleDiagram: parallelAngleDiagram(relation, first, second),
  };
}

function polygonVisual(question: PracticeQuestion): PracticeQuestion {
  const lower = question.prompt.toLowerCase();
  if (!lower.includes("quadrilateral") || /angles add to/.test(lower)) return question;
  const values = numbersIn(question.prompt);
  let labels: [string, string, string, string];
  if (lower.includes("ratio")) labels = ["x", "2x", "3x", "4x"];
  else if (lower.includes("three angles") && lower.includes("equal")) labels = ["x", "x", "x", values[0] ? `${values[0]}°` : "120°"];
  else labels = [
    values[0] ? `${values[0]}°` : "x",
    values[1] ? `${values[1]}°` : "x",
    values[2] ? `${values[2]}°` : "x",
    "x",
  ];
  return {
    ...question,
    prompt: lower.includes("ratio")
      ? "Use the angle labels in the quadrilateral to find its largest angle."
      : "Use the labelled quadrilateral to find x.",
    latex: "",
    planeShapeDiagram: quadrilateralDiagram(labels),
  };
}

function congruenceVisual(question: PracticeQuestion): PracticeQuestion {
  const lower = question.prompt.toLowerCase();
  if (/congruent figures are:|which is not|corresponding parts that are:|rhs applies only to:/.test(lower)) return question;
  const answer = question.answer.toUpperCase();
  if (["SSS", "SAS", "AAS", "RHS"].includes(answer)) {
    return {
      ...question,
      prompt: "Which congruence test is demonstrated by the markings in the diagram?",
      latex: "",
      trianglePairDiagram: congruenceTestPair(answer, numbersIn(question.prompt)),
    };
  }
  if (answer.toLowerCase() === "no") {
    return {
      ...question,
      prompt: "In the diagram, do the angle markings alone prove that these triangles are congruent? Answer yes or no.",
      latex: "",
      trianglePairDiagram: congruenceTestPair("AAA"),
    };
  }
  const kind = asksForAngle(question) ? "angle" : "side";
  return {
    ...question,
    prompt: `The triangles in the diagram are congruent. Find the corresponding ${kind} labelled x.`,
    latex: "",
    congruentTrianglesDiagram: correspondingPair(kind, question.answer),
  };
}

function proofVisual(question: PracticeQuestion): PracticeQuestion {
  const lower = question.prompt.toLowerCase();
  if (/corresponding parts are:|to prove two sides equal|vertices should be named:|corresponding angles are:|to prove a triangle is isosceles/.test(lower)) return question;
  const answer = question.answer.toUpperCase();
  if (["SSS", "SAS", "AAS", "RHS"].includes(answer)) {
    return {
      ...question,
      prompt: "Which congruence test justifies the marked triangle pair in the diagram?",
      latex: "",
      trianglePairDiagram: congruenceTestPair(answer, numbersIn(question.prompt)),
    };
  }
  const values = numbersIn(question.prompt);
  const kind = asksForAngle(question) ? "angle" : "side";
  if (kind === "angle" && values.length >= 2 && question.answer !== values.at(-1)) {
    return {
      ...question,
      prompt: "Use the two given angles in the first triangle, then the congruence markings in the diagram, to find x.",
      latex: "",
      congruentTrianglesDiagram: correspondingAngleFromSum(values[0]!, values[1]!),
    };
  }
  return {
    ...question,
    prompt: `The marked triangles in the diagram have been proved congruent. Find the corresponding ${kind} x.`,
    latex: "",
    congruentTrianglesDiagram: correspondingPair(kind, question.answer),
  };
}

function enlargementVisual(question: PracticeQuestion): PracticeQuestion {
  const lower = question.prompt.toLowerCase();
  if (/similar figures have angles that are:|the scale factor equals:|similar figures have the same:|scale factor less than 1/.test(lower)) return question;
  const values = numbersIn(question.prompt);
  let left: [string, string?] = [values[0] ?? "4"];
  let right: [string, string?] = [values[1] ?? "x"];
  let relation = "similar";

  const mathPrompt = normaliseSimpleFractions(question.prompt);
  const scaleFactorMatch = mathPrompt.match(
    /(?:linear\s+)?(?:scale factor|SF)(?:\s+of)?[\s}\\]*(\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?)/i
  );
  const scaleFactor = scaleFactorMatch?.[1]?.replace(/\s/g, "") ?? "k";
  const areaMatch = question.prompt.match(/area\s+(\d+(?:\.\d+)?)/i);
  const asksArea = lower.includes("area");
  if (asksArea) {
    return {
      ...question,
      prompt: areaMatch
        ? "Use the similar figures and the linear scale factor shown to find the image area x."
        : "Use the similar figures and the linear scale factor shown to find the area scale factor x.",
      latex: "",
      trianglePairDiagram: similarAreaPair(areaMatch?.[1], scaleFactor),
    };
  }

  const asksScaleFactor = /find (?:the )?scale factor|\bsf\s*\?/i.test(question.prompt);
  const imageOriginal = question.prompt.match(/image\D*(\d+(?:\.\d+)?).*?original\D*(\d+(?:\.\d+)?)/i);
  if (imageOriginal) {
    left = [imageOriginal[2]];
    right = [imageOriginal[1]];
  } else if (
    /(?:enlarg|reduc)\w*.*length|length.*(?:enlarg|reduc)\w*/i.test(question.prompt) ||
    (/(?:enlarg|reduc)\w*/i.test(question.prompt) && scaleFactorMatch)
  ) {
    left = [values[0] ?? "4"];
    right = ["x"];
    relation = `scale factor ${scaleFactor}`;
  } else if (/rectangles?/i.test(question.prompt) && /\d\s*[x\u00d7]\s*\d/i.test(question.prompt) && values.length >= 3) {
    left = [values[0]!, values[1]!];
    right = [values[2]!, "x"];
  } else if (/rectangles?|triangles?/.test(lower) && values.length >= 3) {
    left = [values[0]!, values[2]!];
    right = [values[1]!, "x"];
  } else if (values.length >= 2) {
    left = [values[0]!];
    right = [values[1]!];
  }
  if (asksScaleFactor) relation = "scale factor = x";

  return {
    ...question,
    prompt: "Use the corresponding side labels in the diagram to find the requested scale factor or missing length x.",
    latex: "",
    trianglePairDiagram: similarSidePair(left, right, relation),
  };
}

function similarityVisual(question: PracticeQuestion, proving = false): PracticeQuestion {
  const lower = question.prompt.toLowerCase();
  if (
    /similar triangles have:|similar triangles have sides that are:|usual test that two triangles are similar|similar triangles always have:|how many equal angles|similarity differs from congruence|two equal angles is enough because|the aa test needs:/.test(lower)
  ) return question;

  const answer = question.answer.toUpperCase();
  const values = numbersIn(question.prompt);
  const mathPrompt = normaliseSimpleFractions(question.prompt);
  if (lower.includes("parallel") || lower.includes("nested")) {
    const fractionEquation = mathPrompt.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*=\s*(\d+(?:\.\d+)?)\s*\/\s*x/i);
    return {
      ...question,
      prompt: answer === "AA"
        ? "In the diagram, the arrow marks show that the interior segment is parallel to the base. Which similarity test proves the two triangles similar?"
        : "In the diagram, the arrow marks show that the interior segment is parallel to the base. Use the labelled similar triangles to find x.",
      latex: "",
      lineAngleDiagram: nestedTriangleDiagram([
        answer === "AA" ? "" : fractionEquation?.[1] ?? values[0] ?? "a",
        answer === "AA" ? "" : fractionEquation?.[2] ?? values[1] ?? "b",
        answer === "AA" ? "" : fractionEquation?.[3] ?? values[2] ?? "c",
        answer === "AA" ? "" : "x",
      ]),
    };
  }

  if (proving && ["AA", "SAS", "SSS"].includes(answer)) {
    return {
      ...question,
      prompt: "Which similarity test is demonstrated by the markings and labels in the diagram?",
      latex: "",
      trianglePairDiagram: similarityTestPair(answer as "AA" | "SAS" | "SSS", values),
    };
  }

  let left: [string, string?] = [values[0] ?? "3", values[2]];
  let right: [string, string?] = [values[1] ?? "6", "x"];
  let relation = "similar";
  const fractionEquation = mathPrompt.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*=\s*(\d+(?:\.\d+)?)\s*\/\s*x/i);
  if (fractionEquation) {
    left = [fractionEquation[1], fractionEquation[3]];
    right = [fractionEquation[2], "x"];
  } else if (/x\s*\/\s*(\d+(?:\.\d+)?)/i.test(mathPrompt) && values.length >= 3) {
    left = [values[0]!, "x"];
    right = [values[1]!, values[2]!];
  } else if (lower.includes("scale factor") || /\bsf\b/i.test(question.prompt)) {
    const factor = mathPrompt.match(/(?:scale factor|SF)[\s}\\]*(\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?)/i)?.[1]?.replace(/\s/g, "");
    const asksScaleFactor = /find (?:the )?scale factor|\bsf\s*\?/i.test(question.prompt);
    if (asksScaleFactor && values.length >= 2) {
      left = [values[0]!];
      right = [values[1]!];
      relation = "scale factor = x";
    } else {
      const side = mathPrompt.match(/side(?:\s+of)?\s*(\d+(?:\.\d+)?)/i)?.[1] ?? values.at(-1) ?? "4";
      left = [side];
      right = ["x"];
      relation = `scale factor ${factor ?? values[0] ?? "k"}`;
    }
  } else if (lower.includes("matching sides") && values.length >= 2) {
    left = [values[0]!, values[2]];
    right = [values[1]!, values[2] ? "x" : undefined];
  } else if (lower.includes("shadow") && values.length >= 3) {
    left = [values[1], values[0]];
    right = [values[2], "x"];
    relation = "same sun angle";
  }
  return {
    ...question,
    prompt: "Use the corresponding side labels in the similar-triangle diagram to find x.",
    latex: "",
    trianglePairDiagram: similarSidePair(left, right, relation),
  };
}

export function enhanceYear9GeometryQuestion(
  lessonSlug: string,
  question: PracticeQuestion
): PracticeQuestion {
  if (hasVisual(question)) return question;
  switch (lessonSlug) {
    case "angles-and-triangles": return angleVisual(question);
    case "parallel-lines": return parallelVisual(question);
    case "quadrilaterals-polygons": return polygonVisual(question);
    case "congruent-triangles": return congruenceVisual(question);
    case "congruence-in-proof": return proofVisual(question);
    case "enlargement-similar-figures": return enlargementVisual(question);
    case "similar-triangles": return similarityVisual(question);
    case "proving-similar-triangles": return similarityVisual(question, true);
    default: return question;
  }
}

export function enhanceYear9GeometryQuestions(
  lessonSlug: string,
  questions: PracticeQuestion[]
) {
  return questions.map((question) => enhanceYear9GeometryQuestion(lessonSlug, question));
}

function enhanceWorkedExample(
  lessonSlug: string,
  example: WorkedExample,
  index: number
): WorkedExample {
  if (hasVisual(example)) return example;
  const namedAnswer = example.finalAnswerLatex.match(/\b(SSS|SAS|AAS|RHS|AA)\b/i)?.[1];
  const probe: PracticeQuestion = {
    id: `worked-${index}`,
    prompt: example.questionLatex,
    latex: example.questionLatex,
    answer:
      namedAnswer ??
      example.finalAnswerLatex.match(/-?\d+(?:\.\d+)?/)?.[0] ??
      "x",
    difficulty: 2,
    hint: "Use the diagram.",
    explanation: example.steps.map((step) => step.explanation).join(" "),
  };
  const enhanced = enhanceYear9GeometryQuestion(lessonSlug, probe);
  const visual = Object.fromEntries(
    visualFields
      .filter((field) => enhanced[field])
      .map((field) => [field, enhanced[field]])
  );

  if (Object.keys(visual).length === 0) {
    const values = numbersIn(example.questionLatex);
    if (lessonSlug === "angles-and-triangles") {
      return {
        ...example,
        questionLatex: "\\text{Use the marked equilateral triangle shown.}",
        triangleDiagram: triangle({ A: "x", B: "x", C: "x" }, {
          description: "Equilateral triangle with all three sides marked equal and each angle labelled x.",
          sideTicks: { AB: 1, BC: 1, AC: 1 },
        }),
      };
    }
    if (lessonSlug === "quadrilaterals-polygons") {
      const sides = Math.min(12, Math.max(4, Number(values[0]) || (index === 1 ? 5 : 6)));
      return { ...example, questionLatex: "\\text{Use the regular polygon shown.}", planeShapeDiagram: regularPolygonDiagram(sides, "x") };
    }
    if (lessonSlug === "proving-similar-triangles") {
      return {
        ...example,
        questionLatex: "\\text{Use the marked triangle pair shown.}",
        trianglePairDiagram: congruenceTestPair("AA"),
      };
    }
    return example;
  }
  return {
    ...example,
    questionLatex: "\\text{Use the labelled diagram to answer the question.}",
    ...visual,
  };
}

export function applyYear9GeometryVisuals(
  lessonSlug: string,
  lesson: GeometryLesson
): GeometryLesson {
  return {
    ...lesson,
    workedExamples: lesson.workedExamples?.map((example, index) =>
      enhanceWorkedExample(lessonSlug, example, index)
    ),
    guidedPractice: lesson.guidedPractice?.map((question) =>
      enhanceYear9GeometryQuestion(lessonSlug, question)
    ),
    independentPractice: lesson.independentPractice?.map((question) =>
      enhanceYear9GeometryQuestion(lessonSlug, question)
    ),
    masteryQuiz: lesson.masteryQuiz?.map((question) =>
      enhanceYear9GeometryQuestion(lessonSlug, question)
    ),
    masteryQuizPool: lesson.masteryQuizPool?.map((question) =>
      enhanceYear9GeometryQuestion(lessonSlug, question)
    ),
  };
}
