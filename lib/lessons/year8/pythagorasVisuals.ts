import type { TriangleDiagram } from "../types";

export type PythagorasQuestionVisual = {
  prompt: string;
  triangleDiagram: TriangleDiagram;
};

function rightTriangle(
  description: string,
  verticalSide: string,
  horizontalSide: string,
  hypotenuse: string
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 80, y: 40 },
      C: { x: 80, y: 230 },
      B: { x: 330, y: 230 },
    },
    rightAngleAt: "C",
    sideLabels: { AC: verticalSide, BC: horizontalSide, AB: hypotenuse },
  };
}

function hypotenuseVisual(
  a: number,
  b: number,
  unitLabel: string,
  unitName: string,
  rounding = ""
): PythagorasQuestionVisual {
  return {
    prompt: `Use the labelled right triangle to find the hypotenuse c in ${unitName}.${rounding}`,
    triangleDiagram: rightTriangle(
      `Right triangle with perpendicular shorter sides ${a} ${unitLabel} and ${b} ${unitLabel} and unknown hypotenuse c.`,
      `${a} ${unitLabel}`,
      `${b} ${unitLabel}`,
      "c"
    ),
  };
}

function shorterSideVisual(
  hypotenuse: number,
  knownSide: number,
  unitLabel: string,
  unitName: string,
  rounding = ""
): PythagorasQuestionVisual {
  return {
    prompt: `Use the labelled right triangle to find the unknown shorter side x in ${unitName}.${rounding}`,
    triangleDiagram: rightTriangle(
      `Right triangle with hypotenuse ${hypotenuse} ${unitLabel}, one shorter side ${knownSide} ${unitLabel} and unknown shorter side x.`,
      `${knownSide} ${unitLabel}`,
      "x",
      `${hypotenuse} ${unitLabel}`
    ),
  };
}

const repairedPoolVisuals: Record<string, PythagorasQuestionVisual> = {
  "y8-pyth-hyp-p1": hypotenuseVisual(6, 8, "cm", "centimetres"),
  "y8-pyth-hyp-p2": hypotenuseVisual(8, 15, "m", "metres"),
  "y8-pyth-hyp-p3": hypotenuseVisual(9, 12, "cm", "centimetres"),
  "y8-pyth-hyp-p4": hypotenuseVisual(7, 24, "m", "metres"),
  "y8-pyth-hyp-p6": hypotenuseVisual(20, 21, "m", "metres"),
  "y8-pyth-hyp-p7": hypotenuseVisual(12, 16, "mm", "millimetres"),
  "y8-pyth-hyp-p8": hypotenuseVisual(4, 7, "cm", "centimetres", " Round to 1 decimal place."),
  "y8-pyth-hyp-p9": hypotenuseVisual(5, 8, "m", "metres", " Round to 1 decimal place."),
  "y8-pyth-hyp-p10": hypotenuseVisual(10, 24, "cm", "centimetres"),
  "y8-pyth-hyp-p12": hypotenuseVisual(6, 9, "cm", "centimetres", " Round to 1 decimal place."),
  "y8-pyth-hyp-p14": hypotenuseVisual(7, 11, "m", "metres", " Round to 1 decimal place."),
  "y8-pyth-hyp-p15": hypotenuseVisual(18, 24, "cm", "centimetres"),
  "y8-pyth-hyp-p19": hypotenuseVisual(4.5, 6, "m", "metres", " Round to 2 decimal places."),
  "y8-pyth-hyp-p22": hypotenuseVisual(13, 15, "m", "metres", " Round to 1 decimal place."),
  "y8-pyth-hyp-p25": hypotenuseVisual(2.5, 6, "cm", "centimetres", " Round to 2 decimal places."),
  "y8-pyth-short-p1": shorterSideVisual(5, 3, "cm", "centimetres"),
  "y8-pyth-short-p2": shorterSideVisual(13, 5, "m", "metres"),
  "y8-pyth-short-p3": shorterSideVisual(10, 8, "cm", "centimetres"),
  "y8-pyth-short-p4": shorterSideVisual(17, 15, "m", "metres"),
  "y8-pyth-short-p6": shorterSideVisual(25, 24, "mm", "millimetres"),
  "y8-pyth-short-p7": shorterSideVisual(26, 10, "m", "metres"),
  "y8-pyth-short-p8": shorterSideVisual(9, 4, "cm", "centimetres", " Round to 1 decimal place."),
  "y8-pyth-short-p9": shorterSideVisual(12, 5, "m", "metres", " Round to 1 decimal place."),
  "y8-pyth-short-p14": shorterSideVisual(14, 6, "cm", "centimetres", " Round to 1 decimal place."),
  "y8-pyth-short-p16": shorterSideVisual(41, 9, "m", "metres"),
  "y8-pyth-short-p19": shorterSideVisual(18, 11, "m", "metres", " Round to 2 decimal places."),
  "y8-pyth-short-p24": shorterSideVisual(20, 13, "m", "metres", " Round to 1 decimal place."),
};

export const pythagorasQuestionVisuals: Record<string, PythagorasQuestionVisual> = {
  ...repairedPoolVisuals,
  "y8-pyth-hyp-g3": {
    prompt: "Use the labelled right triangle to find the hypotenuse c in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 8 m and 15 m and unknown hypotenuse c.",
      "8 m",
      "15 m",
      "c"
    ),
  },
  "y8-pyth-hyp-g4": {
    prompt:
      "Use the labelled right triangle to find the hypotenuse c in centimetres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 3 cm and 7 cm and unknown hypotenuse c.",
      "3 cm",
      "7 cm",
      "c"
    ),
  },
  "y8-pyth-hyp-i1": {
    prompt: "Use the labelled right triangle to find the hypotenuse c in millimetres.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 9 mm and 12 mm and unknown hypotenuse c.",
      "9 mm",
      "12 mm",
      "c"
    ),
  },
  "y8-pyth-hyp-i2": {
    prompt:
      "Use the labelled right triangle to find the hypotenuse c in metres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 5 m and 7 m and unknown hypotenuse c.",
      "5 m",
      "7 m",
      "c"
    ),
  },
  "y8-pyth-hyp-i4": {
    prompt: "Use the labelled right triangle to find the hypotenuse c in centimetres.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 7 cm and 24 cm and unknown hypotenuse c.",
      "7 cm",
      "24 cm",
      "c"
    ),
  },
  "y8-pyth-hyp-i5": {
    prompt:
      "Use the labelled right triangle to find the hypotenuse c in centimetres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 5 cm and 6 cm and unknown hypotenuse c.",
      "5 cm",
      "6 cm",
      "c"
    ),
  },
  "y8-pyth-hyp-m1": {
    prompt: "Use the labelled right triangle to find the hypotenuse c in centimetres.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 3 cm and 4 cm and unknown hypotenuse c.",
      "3 cm",
      "4 cm",
      "c"
    ),
  },
  "y8-pyth-hyp-m2": {
    prompt: "Use the labelled right triangle to find the hypotenuse c in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 5 m and 12 m and unknown hypotenuse c.",
      "5 m",
      "12 m",
      "c"
    ),
  },
  "y8-pyth-hyp-m4": {
    prompt:
      "Use the labelled right triangle to find the hypotenuse c in centimetres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 2 cm and 9 cm and unknown hypotenuse c.",
      "2 cm",
      "9 cm",
      "c"
    ),
  },
  "y8-pyth-hyp-m5": {
    prompt: "Use the labelled right triangle to find the hypotenuse c in kilometres.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 20 km and 21 km and unknown hypotenuse c.",
      "20 km",
      "21 km",
      "c"
    ),
  },
  "y8-pyth-hyp-m7": {
    prompt:
      "Use the labelled right triangle to find the hypotenuse c in metres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 4 m and 9 m and unknown hypotenuse c.",
      "4 m",
      "9 m",
      "c"
    ),
  },
  "y8-pyth-hyp-m10": {
    prompt:
      "Use the labelled right triangle to find the hypotenuse c in metres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 11 m and 13 m and unknown hypotenuse c.",
      "11 m",
      "13 m",
      "c"
    ),
  },
  "y8-pyth-short-g2": {
    prompt: "Use the labelled right triangle to find the unknown shorter side x in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 17 m, one shorter side 8 m and unknown shorter side x.",
      "8 m",
      "x",
      "17 m"
    ),
  },
  "y8-pyth-short-g4": {
    prompt:
      "Use the labelled right triangle to find the unknown shorter side x in centimetres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 9 cm, one shorter side 4 cm and unknown shorter side x.",
      "4 cm",
      "x",
      "9 cm"
    ),
  },
  "y8-pyth-short-i1": {
    prompt: "Use the labelled right triangle to find the unknown shorter side x in millimetres.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 25 mm, one shorter side 7 mm and unknown shorter side x.",
      "7 mm",
      "x",
      "25 mm"
    ),
  },
  "y8-pyth-short-i2": {
    prompt:
      "Use the labelled right triangle to find the unknown shorter side x in metres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 12 m, one shorter side 7 m and unknown shorter side x.",
      "7 m",
      "x",
      "12 m"
    ),
  },
  "y8-pyth-short-m1": {
    prompt: "Use the labelled right triangle to find the unknown shorter side x in centimetres.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 10 cm, one shorter side 6 cm and unknown shorter side x.",
      "6 cm",
      "x",
      "10 cm"
    ),
  },
  "y8-pyth-short-m2": {
    prompt: "Use the labelled right triangle to find the unknown shorter side x in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 25 m, one shorter side 20 m and unknown shorter side x.",
      "20 m",
      "x",
      "25 m"
    ),
  },
  "y8-pyth-short-m4": {
    prompt:
      "Use the labelled right triangle to find the unknown shorter side x in centimetres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 14 cm, one shorter side 9 cm and unknown shorter side x.",
      "9 cm",
      "x",
      "14 cm"
    ),
  },
  "y8-pyth-short-m7": {
    prompt:
      "Use the labelled right triangle to find the unknown shorter side x in metres. Round to 2 decimal places.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 18 m, one shorter side 11 m and unknown shorter side x.",
      "11 m",
      "x",
      "18 m"
    ),
  },
};
