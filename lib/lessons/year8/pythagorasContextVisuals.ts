import type { CartesianGraph, CartesianPoint, TriangleDiagram } from "../types";

export type PythagorasContextQuestionVisual = {
  prompt: string;
  triangleDiagram?: TriangleDiagram;
  cartesianGraph?: CartesianGraph;
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

function coordinateSegment(
  description: string,
  from: CartesianPoint,
  to: CartesianPoint,
  bounds: Pick<CartesianGraph, "xMin" | "xMax" | "yMin" | "yMax" | "xStep" | "yStep">
): CartesianGraph {
  return {
    description,
    ...bounds,
    points: [from, to],
    lineSegments: [{ from, to }],
  };
}

export const pythagorasContextQuestionVisuals: Record<
  string,
  PythagorasContextQuestionVisual
> = {
  "y8-pyth-ctx-g1": {
    prompt: "Use the right triangle formed by the rectangle's diagonal to find d in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle formed by a 9 m by 12 m rectangle, with the rectangle diagonal labelled d.",
      "9 m",
      "12 m",
      "d"
    ),
  },
  "y8-pyth-ctx-g2": {
    prompt: "In the wall-and-ladder diagram, which labelled length is the hypotenuse?",
    triangleDiagram: rightTriangle(
      "Right triangle formed by a vertical wall, horizontal ground and sloping ladder opposite the right angle.",
      "wall height",
      "ground distance",
      "ladder length"
    ),
  },
  "y8-pyth-ctx-g3": {
    prompt: "Use the pole, ground and rope diagram to find the pole height h in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with vertical pole height h, horizontal ground distance 3 m and rope hypotenuse 5 m.",
      "h",
      "3 m",
      "5 m"
    ),
  },
  "y8-pyth-ctx-i2": {
    prompt: "Use the wall-and-ladder diagram to find the vertical height h in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with vertical wall height h, horizontal ground distance 8 m and ladder hypotenuse 17 m.",
      "h",
      "8 m",
      "17 m"
    ),
  },
  "y8-pyth-ctx-i5": {
    prompt: "Use the east-north path diagram to find the direct distance d in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with a 24 m north leg, a 7 m east leg and direct distance d as the hypotenuse.",
      "24 m north",
      "7 m east",
      "d"
    ),
  },
  "y8-pyth-ctx-m2": {
    prompt: "Use the pole-and-rope diagram to find the horizontal ground distance x in metres.",
    triangleDiagram: rightTriangle(
      "Right triangle with vertical pole height 6 m, unknown horizontal ground distance x and rope hypotenuse 10 m.",
      "6 m",
      "x",
      "10 m"
    ),
  },
  "y8-pyth-ctx-m5": {
    prompt: "Use the right triangle formed by the television screen to find its diagonal d.",
    triangleDiagram: rightTriangle(
      "Right triangle formed by a television screen 30 cm high and 40 cm wide, with diagonal d.",
      "30 cm",
      "40 cm",
      "d"
    ),
  },
  "y8-pyth-ctx-m9": {
    prompt:
      "Use the pole-and-cable diagram to find the vertical height h in metres. Round to 1 decimal place.",
    triangleDiagram: rightTriangle(
      "Right triangle with vertical pole height h, horizontal distance 11 m and support-cable hypotenuse 14 m.",
      "h",
      "11 m",
      "14 m"
    ),
  },
  "y8-pyth-ctx-m10": {
    prompt: "Use the right triangle formed by the window to find its height h in centimetres.",
    triangleDiagram: rightTriangle(
      "Right triangle formed by a rectangular window with width 7 cm, height h and diagonal 25 cm.",
      "h",
      "7 cm",
      "25 cm"
    ),
  },
  "y8-pyth-ctx-mp1": {
    prompt:
      "The right triangle represents the 40 m by 30 m sports field and its corner-to-corner diagonal d.",
    triangleDiagram: rightTriangle(
      "Right triangle formed by a rectangular sports field 30 m wide and 40 m long, with corner-to-corner diagonal d.",
      "30 m",
      "40 m",
      "d"
    ),
  },
  "y8-pyth-trip-g1": {
    prompt: "Use the labelled right triangle to state the hypotenuse c using a Pythagorean triple.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 6 cm and 8 cm and unknown hypotenuse c.",
      "6 cm",
      "8 cm",
      "c"
    ),
  },
  "y8-pyth-trip-g4": {
    prompt:
      "Use the labelled right triangle and its triple family to find the unknown shorter side x.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 26 cm, one shorter side 10 cm and unknown shorter side x.",
      "10 cm",
      "x",
      "26 cm"
    ),
  },
  "y8-pyth-trip-i1": {
    prompt: "Use the labelled right triangle to state the hypotenuse c.",
    triangleDiagram: rightTriangle(
      "Right triangle with perpendicular shorter sides 20 km and 21 km and unknown hypotenuse c.",
      "20 km",
      "21 km",
      "c"
    ),
  },
  "y8-pyth-trip-i4": {
    prompt: "Use the labelled right triangle to find the unknown shorter side x.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 51 m, one shorter side 24 m and unknown shorter side x.",
      "24 m",
      "x",
      "51 m"
    ),
  },
  "y8-pyth-trip-m6": {
    prompt: "Use the labelled triangle to decide whether 11, 60 and 61 form a Pythagorean triple.",
    triangleDiagram: rightTriangle(
      "Triangle labelled with perpendicular sides 11 and 60 and longest side 61, to be checked using Pythagoras' theorem.",
      "11",
      "60",
      "61"
    ),
  },
  "y8-pyth-trip-m9": {
    prompt: "Use the labelled right triangle to find the unknown shorter side x.",
    triangleDiagram: rightTriangle(
      "Right triangle with hypotenuse 34, one shorter side 16 and unknown shorter side x.",
      "16",
      "x",
      "34"
    ),
  },
  "y8-pyth-dist-g2": {
    prompt: "Use the Cartesian graph to find the distance between A and B in units.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(2, 1) to B(5, 5).",
      { x: 2, y: 1, label: "A(2, 1)" },
      { x: 5, y: 5, label: "B(5, 5)" },
      { xMin: 0, xMax: 7, yMin: 0, yMax: 7, xStep: 1, yStep: 1 }
    ),
  },
  "y8-pyth-dist-g4": {
    prompt:
      "Use the Cartesian graph to find the distance between A and B. Round to 1 decimal place.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(0, 0) to B(4, 6).",
      { x: 0, y: 0, label: "A(0, 0)" },
      { x: 4, y: 6, label: "B(4, 6)" },
      { xMin: -1, xMax: 6, yMin: -1, yMax: 8, xStep: 1, yStep: 1 }
    ),
  },
  "y8-pyth-dist-i1": {
    prompt: "Use the Cartesian graph to find the distance between A and B in units.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(1, 1) to B(7, 9).",
      { x: 1, y: 1, label: "A(1, 1)" },
      { x: 7, y: 9, label: "B(7, 9)" },
      { xMin: 0, xMax: 9, yMin: 0, yMax: 11, xStep: 1, yStep: 1 }
    ),
  },
  "y8-pyth-dist-i4": {
    prompt: "Use the Cartesian graph to find the distance between A and B in units.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(1, 2) to B(9, 17).",
      { x: 1, y: 2, label: "A(1, 2)" },
      { x: 9, y: 17, label: "B(9, 17)" },
      { xMin: 0, xMax: 11, yMin: 0, yMax: 19, xStep: 1, yStep: 2 }
    ),
  },
  "y8-pyth-dist-i5": {
    prompt:
      "Use the Cartesian graph to find the distance between A and B. Give the answer to 1 decimal place.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(2, 5) to B(6, 8).",
      { x: 2, y: 5, label: "A(2, 5)" },
      { x: 6, y: 8, label: "B(6, 8)" },
      { xMin: 0, xMax: 8, yMin: 0, yMax: 10, xStep: 1, yStep: 1 }
    ),
  },
  "y8-pyth-dist-m4": {
    prompt: "Use the Cartesian graph to find the distance between A and B in units.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(-3, 0) to B(0, 4).",
      { x: -3, y: 0, label: "A(-3, 0)" },
      { x: 0, y: 4, label: "B(0, 4)" },
      { xMin: -5, xMax: 2, yMin: -1, yMax: 6, xStep: 1, yStep: 1 }
    ),
  },
  "y8-pyth-dist-m5": {
    prompt: "Use the Cartesian graph to find the distance between A and B in units.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(2, 3) to B(10, 18).",
      { x: 2, y: 3, label: "A(2, 3)" },
      { x: 10, y: 18, label: "B(10, 18)" },
      { xMin: 0, xMax: 12, yMin: 0, yMax: 20, xStep: 2, yStep: 2 }
    ),
  },
  "y8-pyth-dist-m8": {
    prompt: "Use the Cartesian graph to find the distance between A and B in units.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(3, 4) to B(9, 12).",
      { x: 3, y: 4, label: "A(3, 4)" },
      { x: 9, y: 12, label: "B(9, 12)" },
      { xMin: 0, xMax: 11, yMin: 0, yMax: 14, xStep: 1, yStep: 2 }
    ),
  },
  "y8-pyth-dist-m10": {
    prompt: "Use the Cartesian graph to find the distance between A and B in units.",
    cartesianGraph: coordinateSegment(
      "Cartesian plane showing segment AB from A(1, 1) to B(4, 5).",
      { x: 1, y: 1, label: "A(1, 1)" },
      { x: 4, y: 5, label: "B(4, 5)" },
      { xMin: 0, xMax: 6, yMin: 0, yMax: 7, xStep: 1, yStep: 1 }
    ),
  },
  "y8-pyth-dist-mp1": {
    prompt:
      "The town map shows the library L, school S and pool P on a Cartesian plane measured in kilometres.",
    cartesianGraph: {
      description:
        "Town map with library L(1, 2), school S(9, 8) and pool P(9, 2), with segments LS and LP drawn.",
      xMin: 0,
      xMax: 11,
      yMin: 0,
      yMax: 10,
      xStep: 1,
      yStep: 1,
      xAxisLabel: "x (km)",
      yAxisLabel: "y (km)",
      points: [
        { x: 1, y: 2, label: "L(1, 2)" },
        { x: 9, y: 8, label: "S(9, 8)" },
        { x: 9, y: 2, label: "P(9, 2)" },
      ],
      lineSegments: [
        { from: { x: 1, y: 2 }, to: { x: 9, y: 8 }, label: "LS" },
        { from: { x: 1, y: 2 }, to: { x: 9, y: 2 }, label: "LP" },
      ],
    },
  },
};
