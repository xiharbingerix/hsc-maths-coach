import type { PlaneShapeDiagram, TriangleDiagram } from "../types";

export type GeometryQuestionVisual = {
  prompt: string;
  triangleDiagram?: TriangleDiagram;
  planeShapeDiagram?: PlaneShapeDiagram;
};

const triangleVertices = {
  A: { x: 200, y: 35 },
  B: { x: 65, y: 240 },
  C: { x: 335, y: 240 },
};

export const geometryQuestionVisuals: Record<string, GeometryQuestionVisual> = {
  "y8-geo-tri-g1": {
    prompt: "Using the triangle shown, find angle x in degrees.",
    triangleDiagram: {
      description:
        "Triangle ABC with angle A labelled 65 degrees, angle B labelled 72 degrees, and angle C labelled x.",
      vertices: triangleVertices,
      angleLabels: { A: "65°", B: "72°", C: "x" },
    },
  },
  "y8-geo-tri-g3": {
    prompt: "Using the quadrilateral shown, find angle x in degrees.",
    planeShapeDiagram: {
      description:
        "Convex quadrilateral ABCD with interior angles A 85 degrees, B 110 degrees, C 95 degrees, and D labelled x.",
      vertices: [
        { x: 0, y: 0, label: "A", angleLabel: "85°" },
        { x: 5, y: 0.4, label: "B", angleLabel: "110°" },
        { x: 4.2, y: 3.4, label: "C", angleLabel: "95°" },
        { x: 0.7, y: 2.8, label: "D", angleLabel: "x" },
      ],
      fill: "blue",
      showVertexDots: true,
    },
  },
  "y8-geo-tri-i1": {
    prompt: "The two base angles in the isosceles triangle are equal. Find angle x in degrees.",
    triangleDiagram: {
      description:
        "Isosceles triangle ABC with both base angles B and C labelled 52 degrees and apex angle A labelled x.",
      vertices: triangleVertices,
      angleLabels: { A: "x", B: "52°", C: "52°" },
    },
  },
  "y8-geo-tri-i5": {
    prompt: "Using the right-angled triangle shown, find angle x in degrees.",
    triangleDiagram: {
      description:
        "Right-angled triangle ABC with the right angle at A, angle B labelled 37 degrees, and angle C labelled x.",
      vertices: {
        A: { x: 65, y: 240 },
        B: { x: 65, y: 45 },
        C: { x: 335, y: 240 },
      },
      rightAngleAt: "A",
      angleLabels: { B: "37°", C: "x" },
    },
  },
  "y8-geo-pol-g2": {
    prompt: "The polygon shown is regular. Find each interior angle in degrees.",
    planeShapeDiagram: {
      description:
        "Regular hexagon with six equal sides. One interior angle is labelled x.",
      vertices: [
        { x: 0, y: 1, angleLabel: "x" },
        { x: 0.87, y: 0.5 },
        { x: 0.87, y: -0.5 },
        { x: 0, y: -1 },
        { x: -0.87, y: -0.5 },
        { x: -0.87, y: 0.5 },
      ],
      edges: Array.from({ length: 6 }, () => ({ ticks: 1 })),
      fill: "teal",
    },
  },
  "y8-geo-pol-i2": {
    prompt: "The polygon shown is regular. Find each interior angle in degrees.",
    planeShapeDiagram: {
      description:
        "Regular pentagon with five equal sides. One interior angle is labelled x.",
      vertices: [
        { x: 0, y: 1, angleLabel: "x" },
        { x: 0.95, y: 0.31 },
        { x: 0.59, y: -0.81 },
        { x: -0.59, y: -0.81 },
        { x: -0.95, y: 0.31 },
      ],
      edges: Array.from({ length: 5 }, () => ({ ticks: 1 })),
      fill: "teal",
    },
  },
  "y8-geo-rea-g2": {
    prompt: "Using the triangle shown, find angle x in degrees.",
    triangleDiagram: {
      description:
        "Triangle ABC with angle A labelled 55 degrees, angle B labelled 72 degrees, and angle C labelled x.",
      vertices: triangleVertices,
      angleLabels: { A: "55°", B: "72°", C: "x" },
    },
  },
  "y8-geo-rea-i4": {
    prompt: "Use the angle sum of the right-angled triangle to find x.",
    triangleDiagram: {
      description:
        "Right-angled triangle ABC with the right angle at A, angle B labelled 2x plus 10 degrees, and angle C labelled x plus 20 degrees.",
      vertices: {
        A: { x: 65, y: 240 },
        B: { x: 65, y: 45 },
        C: { x: 335, y: 240 },
      },
      rightAngleAt: "A",
      angleLabels: { B: "2x + 10°", C: "x + 20°" },
    },
  },
  "y8-geo-rea-i5": {
    prompt: "The angles of quadrilateral ABCD are shown. Find angle A in degrees.",
    planeShapeDiagram: {
      description:
        "Convex quadrilateral ABCD with angle A labelled 2x, angle B labelled 3x, angle C labelled 4x, and angle D labelled x.",
      vertices: [
        { x: 0, y: 0, label: "A", angleLabel: "2x" },
        { x: 5, y: 0.4, label: "B", angleLabel: "3x" },
        { x: 4.2, y: 3.4, label: "C", angleLabel: "4x" },
        { x: 0.7, y: 2.8, label: "D", angleLabel: "x" },
      ],
      fill: "violet",
      showVertexDots: true,
    },
  },
  "y8-geo-qprop-g1": {
    prompt: "Name the quadrilateral shown.",
    planeShapeDiagram: {
      description:
        "Quadrilateral with four equal sides and four right angles, showing the defining marks of a square.",
      vertices: [
        { x: 0, y: 0, rightAngle: true },
        { x: 4, y: 0, rightAngle: true },
        { x: 4, y: 4, rightAngle: true },
        { x: 0, y: 4, rightAngle: true },
      ],
      edges: [
        { ticks: 1 },
        { ticks: 1 },
        { ticks: 1 },
        { ticks: 1 },
      ],
      fill: "amber",
    },
  },
  "y8-geo-qprop-i1": {
    prompt: "Use the trapezoid shown to find angle x in degrees.",
    planeShapeDiagram: {
      description:
        "Trapezoid ABCD with AB parallel to DC. Co-interior angles A and D lie on the same side; angle A is 118 degrees and angle D is x degrees.",
      vertices: [
        { x: 0, y: 0, label: "A", angleLabel: "118°" },
        { x: 6, y: 0, label: "B" },
        { x: 5, y: 3, label: "C" },
        { x: 1.5, y: 3, label: "D", angleLabel: "x°" },
      ],
      edges: [{ arrows: 1 }, {}, { arrows: 1 }, {}],
      fill: "blue",
      showVertexDots: true,
    },
  },
  "y8-geo-qprop-m3": {
    prompt: "Using the parallelogram shown, find angle x in degrees.",
    planeShapeDiagram: {
      description:
        "Parallelogram WXYZ with opposite sides marked parallel. Angle W is 63 degrees and adjacent angle X is labelled x.",
      vertices: [
        { x: 0, y: 0, label: "W", angleLabel: "63°" },
        { x: 4, y: 0, label: "X", angleLabel: "x" },
        { x: 5.5, y: 2.8, label: "Y" },
        { x: 1.5, y: 2.8, label: "Z" },
      ],
      edges: [
        { arrows: 1 },
        { arrows: 2 },
        { arrows: 1 },
        { arrows: 2 },
      ],
      fill: "green",
      showVertexDots: true,
    },
  },
  "y8-geo-qprop-m6": {
    prompt: "PQ is parallel to SR in the trapezoid shown. Find angle x in degrees.",
    planeShapeDiagram: {
      description:
        "Trapezoid PQRS with parallel bases PQ and SR marked by matching arrows. Angle P is 71 degrees and co-interior angle S is labelled x.",
      vertices: [
        { x: 0, y: 0, label: "P", angleLabel: "71°" },
        { x: 5, y: 0, label: "Q" },
        { x: 4, y: 3, label: "R" },
        { x: 1, y: 3, label: "S", angleLabel: "x" },
      ],
      edges: [{ arrows: 1 }, {}, { arrows: 1 }, {}],
      fill: "blue",
      showVertexDots: true,
    },
  },
  "y8-geo-qprop-p26": {
    prompt:
      "Diagonal AC of rhombus ABCD forms triangle ABC. Use the labelled triangle to find angle ACB.",
    triangleDiagram: {
      description:
        "Triangle ABC formed by diagonal AC of a rhombus. Rhombus sides AB and BC are equal, angle ABC is 110 degrees, and angle BAC is 35 degrees because the 70-degree vertex angle at A is bisected by AC.",
      vertices: {
        A: { x: 0, y: 0 },
        B: { x: 7, y: 0 },
        C: { x: 4.2, y: 4.5 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      angleLabels: { A: "35°", B: "110°", C: "x°" },
      sideTicks: { AB: 1, BC: 1 },
    },
  },
};
