import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type {
  CircleGeometryDiagram,
  LineAngleDiagram,
  TriangleDiagram,
  TrianglePairDiagram,
} from "../types";

type GeometryLesson = Partial<ExplicitLesson>;

const circlePoint = (id: string, x: number, y: number, label = id) => ({ id, x, y, label });

function centralAndCircumference(known: string | undefined, knownAtCentre: boolean): CircleGeometryDiagram {
  return {
    description: known
      ? `A central angle and an angle at the circumference stand on the same arc. The ${knownAtCentre ? "central" : "circumference"} angle is ${known} degrees and the other angle is x.`
      : "A central angle labelled 2 theta and a circumference angle labelled theta stand on the same arc.",
    circle: { center: "O", radius: 100, label: "O" },
    points: [
      circlePoint("O", 180, 140), circlePoint("A", 99, 199), circlePoint("B", 261, 199),
      circlePoint("C", 180, 40),
    ],
    segments: [{ from: "O", to: "A" }, { from: "O", to: "B" }, { from: "C", to: "A" }, { from: "C", to: "B" }],
    angles: [
      { vertex: "O", from: "A", to: "B", label: known ? (knownAtCentre ? `${known}°` : "x") : "2θ", radius: 30, highlighted: true },
      { vertex: "C", from: "A", to: "B", label: known ? (knownAtCentre ? "x" : `${known}°`) : "θ", radius: 25, highlighted: true },
    ],
    arcs: [{ from: "A", to: "B", highlighted: true }],
    viewBox: "0 0 360 280",
  };
}

function semicircle(extraAngle?: string): CircleGeometryDiagram {
  return {
    description: `AB is a diameter and C is a point on the circle.${extraAngle ? ` Angle CAB is ${extraAngle} degrees.` : ""} The angle at C is marked x.`,
    circle: { center: "O", radius: 100 },
    points: [circlePoint("O", 180, 140), circlePoint("A", 80, 140), circlePoint("B", 280, 140), circlePoint("C", 180, 40)],
    segments: [{ from: "A", to: "B", highlighted: true }, { from: "A", to: "C" }, { from: "B", to: "C" }],
    angles: [
      { vertex: "C", from: "A", to: "B", label: "x", rightAngle: true, highlighted: true },
      ...(extraAngle ? [{ vertex: "A", from: "B", to: "C", label: `${extraAngle}°`, radius: 24 } as const] : []),
    ],
    viewBox: "0 0 360 280",
  };
}

function cyclicQuadrilateral(known?: string): CircleGeometryDiagram {
  return {
    description: known
      ? `ABCD is a cyclic quadrilateral. Angle ABC is ${known} degrees and the opposite angle ADC is x.`
      : "ABCD is a cyclic quadrilateral with opposite angles alpha and beta highlighted.",
    circle: { center: "O", radius: 100 },
    points: [
      circlePoint("O", 180, 140), circlePoint("A", 109, 69), circlePoint("B", 251, 69),
      circlePoint("C", 251, 211), circlePoint("D", 109, 211),
    ],
    segments: [{ from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" }, { from: "D", to: "A" }],
    angles: [
      { vertex: "B", from: "A", to: "C", label: known ? `${known}°` : "α", radius: 24, highlighted: true },
      { vertex: "D", from: "C", to: "A", label: known ? "x" : "β", radius: 24, highlighted: true },
    ],
    viewBox: "0 0 360 280",
  };
}

function sameSegment(known?: string): CircleGeometryDiagram {
  return {
    description: known
      ? `Angles ACB and ADB stand on chord AB in the same segment. Angle ACB is ${known} degrees and angle ADB is x.`
      : "Angles ACB and ADB stand on chord AB in the same segment and are marked equal.",
    circle: { center: "O", radius: 100 },
    points: [
      circlePoint("O", 180, 140), circlePoint("A", 99, 199), circlePoint("B", 261, 199),
      circlePoint("C", 109, 69), circlePoint("D", 251, 69),
    ],
    segments: [{ from: "A", to: "B", highlighted: true }, { from: "C", to: "A" }, { from: "C", to: "B" }, { from: "D", to: "A" }, { from: "D", to: "B" }],
    angles: [
      { vertex: "C", from: "A", to: "B", label: known ? `${known}°` : "θ", radius: 22, marks: 1, highlighted: true },
      { vertex: "D", from: "A", to: "B", label: known ? "x" : "θ", radius: 22, marks: 1, highlighted: true },
    ],
    viewBox: "0 0 360 280",
  };
}

function chordDiagram(equal = false): CircleGeometryDiagram {
  return {
    description: equal
      ? "Two equal chords AB and CD are marked in the same circle, with the angles they subtend at centre O shown."
      : "Chord AB joins two points on the circle.",
    circle: { center: "O", radius: 100 },
    points: [
      circlePoint("O", 180, 140), circlePoint("A", 109, 69), circlePoint("B", 251, 69),
      circlePoint("C", 109, 211), circlePoint("D", 251, 211),
    ],
    segments: [
      { from: "A", to: "B", ticks: equal ? 1 : undefined, highlighted: true },
      ...(equal ? [
        { from: "C", to: "D", ticks: 1 as const, highlighted: true },
        { from: "O", to: "A" }, { from: "O", to: "B" }, { from: "O", to: "C" }, { from: "O", to: "D" },
      ] : []),
    ],
    angles: equal ? [
      { vertex: "O", from: "A", to: "B", label: "α", marks: 1 },
      { vertex: "O", from: "C", to: "D", label: "β", marks: 1 },
    ] : undefined,
    viewBox: "0 0 360 280",
  };
}

function intersectingChords(values: [string, string, string, string]): CircleGeometryDiagram {
  const [a, b, c, d] = values;
  return {
    description: `Two chords intersect at E. AE is ${a}, EB is ${b}, CE is ${c}, and ED is ${d}.`,
    circle: { center: "O", radius: 105 },
    points: [
      circlePoint("O", 180, 140), circlePoint("A", 75, 140), circlePoint("B", 285, 140),
      circlePoint("C", 119, 55), circlePoint("D", 241, 225), circlePoint("E", 180, 140),
    ],
    segments: [
      { from: "A", to: "E", label: a, labelOffset: { x: 0, y: -13 }, highlighted: true },
      { from: "E", to: "B", label: b, labelOffset: { x: 0, y: -13 }, highlighted: true },
      { from: "C", to: "E", label: c, labelOffset: { x: -12, y: 0 } },
      { from: "E", to: "D", label: d, labelOffset: { x: 13, y: 0 } },
    ],
    viewBox: "0 0 360 280",
  };
}

function tangentRadius(radius?: string, hypotenuse?: string, tangent = "x"): CircleGeometryDiagram {
  return {
    description: `PT is tangent to the circle at T and OT is a radius.${radius ? ` OT is ${radius}.` : ""}${hypotenuse ? ` OP is ${hypotenuse}.` : ""} The tangent length PT is ${tangent}.`,
    circle: { center: "O", radius: 80 },
    points: [circlePoint("O", 150, 140), circlePoint("T", 150, 60), circlePoint("P", 300, 60)],
    segments: [
      { from: "O", to: "T", label: radius, highlighted: true },
      { from: "T", to: "P", label: tangent, highlighted: true },
      ...(hypotenuse ? [{ from: "O", to: "P", label: hypotenuse }] : []),
    ],
    angles: [{ vertex: "T", from: "O", to: "P", label: "90°", rightAngle: true, highlighted: true }],
    viewBox: "35 20 310 240",
  };
}

function equalTangents(firstLength?: string, secondLength?: string): CircleGeometryDiagram {
  return {
    description: `PA and PB are tangents from the same external point P. The two tangent lengths are marked as equal.${firstLength ? ` PA is ${firstLength}.` : ""}${secondLength ? ` PB is ${secondLength}.` : ""}`,
    circle: { center: "O", radius: 80 },
    points: [circlePoint("O", 150, 140), circlePoint("A", 190, 71), circlePoint("B", 190, 209), circlePoint("P", 310, 140)],
    segments: [
      { from: "P", to: "A", label: firstLength, ticks: 1, highlighted: true },
      { from: "P", to: "B", label: secondLength, ticks: 1, highlighted: true },
      { from: "O", to: "A" }, { from: "O", to: "B" },
    ],
    angles: [{ vertex: "A", from: "O", to: "P", rightAngle: true }, { vertex: "B", from: "O", to: "P", rightAngle: true }],
    viewBox: "35 20 330 240",
  };
}

function alternateSegment(known = "x"): CircleGeometryDiagram {
  return {
    description: `A tangent and chord AB meet at A. The angle between them is ${known}; angle ACB stands on chord AB in the alternate segment.`,
    circle: { center: "O", radius: 90 },
    points: [circlePoint("O", 165, 140), circlePoint("A", 165, 50), circlePoint("B", 243, 185), circlePoint("C", 87, 185), circlePoint("P", 315, 50)],
    segments: [{ from: "A", to: "P", highlighted: true }, { from: "A", to: "B", highlighted: true }, { from: "A", to: "C" }, { from: "B", to: "C" }],
    angles: [{ vertex: "A", from: "P", to: "B", label: known, highlighted: true }, { vertex: "C", from: "A", to: "B", label: "x", highlighted: true }],
    viewBox: "20 20 340 250",
  };
}

function crossingLines(known: string): LineAngleDiagram {
  return {
    description: `Two straight lines intersect. One angle is ${known} degrees and its vertically opposite angle is x.`,
    points: [
      { id: "A", x: 70, y: 220, showLabel: false }, { id: "B", x: 290, y: 60, showLabel: false },
      { id: "C", x: 70, y: 60, showLabel: false }, { id: "D", x: 290, y: 220, showLabel: false },
      { id: "O", x: 180, y: 140, label: "O" },
    ],
    segments: [{ from: "A", to: "B" }, { from: "C", to: "D" }],
    angles: [{ vertex: "O", from: "B", to: "C", label: `${known}°`, highlighted: true }, { vertex: "O", from: "A", to: "D", label: "x", highlighted: true }],
    viewBox: "30 25 300 230",
  };
}

function pairedTriangles(relationLabel: string): TrianglePairDiagram {
  const left: TriangleDiagram = {
    description: "Triangle ABC.", vertices: { A: { x: 60, y: 210 }, B: { x: 250, y: 210 }, C: { x: 120, y: 55 } },
    sideTicks: { AB: 1, BC: 2, AC: 3 }, angleMarks: { A: 1, B: 2 },
  };
  const right: TriangleDiagram = {
    description: "Triangle DEF.", vertices: { A: { x: 70, y: 210 }, B: { x: 260, y: 210 }, C: { x: 130, y: 55 } },
    vertexLabels: { A: "D", B: "E", C: "F" }, sideTicks: { AB: 1, BC: 2, AC: 3 }, angleMarks: { A: 1, B: 2 },
  };
  return { description: `Two ${relationLabel} triangles with corresponding marks.`, left, right, relationLabel };
}

const visualKeys = ["triangleDiagram", "congruentTrianglesDiagram", "trianglePairDiagram", "lineAngleDiagram", "circleGeometryDiagram"] as const;

function hasGeometryVisual(item: PracticeQuestion | WorkedExample): boolean {
  return visualKeys.some((key) => Boolean(item[key]));
}

function numbersIn(text: string): string[] {
  return text.match(/\d+(?:\.\d+)?/g) ?? [];
}

function tangentLengthLabels(prompt: string): [string?, string?] {
  const pair = prompt.match(/if\s+[A-Z]{2}\s*=\s*([^,]+?)\s+and\s+[A-Z]{2}\s*=\s*([^,]+),/i);
  if (pair) return [pair[1].trim(), pair[2].trim()];
  const single = prompt.match(/(?:if\s+[A-Z]{2}\s*=|one\s+(?:has length|is))\s*(\d+(?:\.\d+)?)/i);
  return single ? [single[1], "x"] : [];
}

function enhanceQuestion(question: PracticeQuestion): PracticeQuestion {
  if (hasGeometryVisual(question)) return question;
  const text = `${question.prompt} ${question.latex}`;
  const lower = text.toLowerCase();
  const numbers = numbersIn(question.prompt);

  if (lower.includes("intersecting chord")) {
    if (numbers.length >= 3) {
      const values: [string, string, string, string] = [numbers[0], numbers[1], numbers[2], "x"];
      const stage = question.id.includes("-g") ? "Use AE × EB = CE × ED, then solve." : question.id.includes("-i") ? "Use the intersecting-chords product theorem." : "Form the segment-product equation from the diagram.";
      return {
        ...question,
        prompt: "Two chords intersect inside the circle as shown. Use the labelled segment lengths to find x.",
        latex: "",
        hint: stage,
        circleGeometryDiagram: intersectingChords(values),
      };
    }
    return { ...question, circleGeometryDiagram: intersectingChords(["a", "b", "c", "d"]) };
  }
  if (lower.includes("extra fact") && /same[- ]segment/.test(lower)) return { ...question, circleGeometryDiagram: chordDiagram() };
  if (/same[- ]segment/.test(lower) || (lower.includes("same chord") && lower.includes("same side"))) return { ...question, circleGeometryDiagram: sameSegment(numbers[0]) };
  if (lower.includes("cyclic")) return { ...question, circleGeometryDiagram: cyclicQuadrilateral(numbers[0]) };
  if (lower.includes("diameter") || lower.includes("semicircle")) return { ...question, circleGeometryDiagram: semicircle(lower.includes("triangle") || lower.includes(" plus ") ? numbers.at(-1) : undefined) };
  if ((lower.includes("centre") || lower.includes("central")) && (lower.includes("circumference") || lower.includes("arc"))) {
    const knownAtCentre = lower.includes("central angle is") || lower.includes("centre is") || lower.includes("centre of a circle is");
    return { ...question, circleGeometryDiagram: centralAndCircumference(numbers[0], knownAtCentre) };
  }
  if (lower.includes("alternate segment") || (lower.includes("tangent") && lower.includes("chord"))) return { ...question, circleGeometryDiagram: alternateSegment(numbers[0] ? `${numbers[0]}°` : "x") };
  if (lower.includes("tangent") && (lower.includes("same external point") || lower.includes("from a point") || /tangents? from [a-z]\b/i.test(question.prompt) || /tangents? [a-z]{2} and [a-z]{2}/i.test(question.prompt))) {
    return { ...question, circleGeometryDiagram: equalTangents(...tangentLengthLabels(question.prompt)) };
  }
  if (lower.includes("tangent") && (lower.includes("radius") || (/\bot/.test(question.latex)) || (/\bot/.test(text)) || (lower.includes("ot") && lower.includes("pt")))) {
    return { ...question, circleGeometryDiagram: tangentRadius(numbers[0], numbers[1]) };
  }
  if (lower.includes("tangent")) return { ...question, circleGeometryDiagram: tangentRadius() };
  if (lower.includes("equal chord")) return { ...question, circleGeometryDiagram: chordDiagram(true) };
  if (lower.includes("chord") || lower.includes("circle")) return { ...question, circleGeometryDiagram: chordDiagram() };
  if (lower.includes("vertically opposite")) return { ...question, lineAngleDiagram: crossingLines(numbers[0] ?? "x") };
  if (lower.includes("congruent") && lower.includes("triangle")) return { ...question, trianglePairDiagram: pairedTriangles("congruent") };
  if (lower.includes("similar") && lower.includes("triangle")) return { ...question, trianglePairDiagram: pairedTriangles("similar") };
  return question;
}

function enhanceWorkedExample(lessonSlug: string, example: WorkedExample): WorkedExample {
  if (hasGeometryVisual(example)) return example;
  const title = example.title.toLowerCase();
  const nums = numbersIn(example.questionLatex);
  if (title.includes("intersecting chord")) return { ...example, circleGeometryDiagram: intersectingChords([nums[0] ?? "2", nums[1] ?? "6", nums[2] ?? "3", "x"]) };
  if (title.includes("equal tangent")) return { ...example, circleGeometryDiagram: equalTangents(nums[0] ?? "7", "x") };
  if (title.includes("tangent") && title.includes("radius")) return { ...example, circleGeometryDiagram: tangentRadius() };
  if (title.includes("right triangle") && title.includes("tangent")) return { ...example, circleGeometryDiagram: tangentRadius(nums[0], nums[1]) };
  if (title.includes("centre") || title.includes("circumference")) return { ...example, circleGeometryDiagram: centralAndCircumference(nums[0] ?? "120", true) };
  if (title.includes("semicircle") || title.includes("circle proof")) return { ...example, circleGeometryDiagram: semicircle() };
  if (title.includes("cyclic")) return { ...example, circleGeometryDiagram: cyclicQuadrilateral(nums.at(-1) ?? "110") };
  if (title.includes("angles on a line")) return { ...example, lineAngleDiagram: crossingLines(nums[0] ?? "110") };
  if (lessonSlug.includes("congruent") && (title.includes("test") || title.includes("corresponding"))) return { ...example, trianglePairDiagram: pairedTriangles("congruent") };
  if (title.includes("congruence")) return { ...example, trianglePairDiagram: pairedTriangles("congruent") };
  if (lessonSlug.includes("similar") && (title.includes("similar") || title.includes("scale"))) return { ...example, trianglePairDiagram: pairedTriangles("similar") };
  return example;
}

export function applyYear10GeometryVisuals(lessonSlug: string, lesson: GeometryLesson): GeometryLesson {
  return {
    ...lesson,
    workedExamples: lesson.workedExamples?.map((example) => enhanceWorkedExample(lessonSlug, example)),
    guidedPractice: lesson.guidedPractice?.map(enhanceQuestion),
    independentPractice: lesson.independentPractice?.map(enhanceQuestion),
    masteryQuiz: lesson.masteryQuiz?.map(enhanceQuestion),
  };
}
