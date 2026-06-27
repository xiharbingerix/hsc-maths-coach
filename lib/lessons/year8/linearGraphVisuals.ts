import type { CartesianGraph, CartesianPoint } from "../types";

export type LinearGraphQuestionVisual = {
  prompt: string;
  cartesianGraph: CartesianGraph;
};

function segmentGraph(
  description: string,
  from: CartesianPoint,
  to: CartesianPoint,
  bounds: Pick<
    CartesianGraph,
    "xMin" | "xMax" | "yMin" | "yMax" | "xStep" | "yStep" | "xAxisLabel" | "yAxisLabel"
  >
): CartesianGraph {
  return {
    description,
    ...bounds,
    points: [from, to],
    lineSegments: [{ from, to }],
  };
}

export const linearGraphQuestionVisuals: Record<string, LinearGraphQuestionVisual> = {
  "y8-lin-coo-mp1": {
    prompt: "The Cartesian plane shows points A, B and C joined by horizontal and vertical segments.",
    cartesianGraph: {
      description:
        "Cartesian plane with A at (-2, 3), B at (6, 3) and C at (6, -1), with segments AB and BC drawn.",
      xMin: -4,
      xMax: 8,
      yMin: -3,
      yMax: 5,
      xStep: 1,
      yStep: 1,
      points: [
        { x: -2, y: 3, label: "A(-2, 3)" },
        { x: 6, y: 3, label: "B(6, 3)" },
        { x: 6, y: -1, label: "C(6, -1)" },
      ],
      lineSegments: [
        { from: { x: -2, y: 3 }, to: { x: 6, y: 3 }, label: "AB" },
        { from: { x: 6, y: 3 }, to: { x: 6, y: -1 }, label: "BC" },
      ],
    },
  },
  "y8-lin-grd-i5": {
    prompt: "Use the two labelled points on the line segment to find its gradient.",
    cartesianGraph: segmentGraph(
      "Cartesian line segment joining the labelled points (0, 0) and (4, 8).",
      { x: 0, y: 0, label: "(0, 0)" },
      { x: 4, y: 8, label: "(4, 8)" },
      { xMin: -1, xMax: 5, yMin: -1, yMax: 9, xStep: 1, yStep: 1 }
    ),
  },
  "y8-lin-grd-m3": {
    prompt: "Use the two labelled points on the line segment to find its gradient.",
    cartesianGraph: segmentGraph(
      "Cartesian line segment joining the labelled points (1, 2) and (3, 8).",
      { x: 1, y: 2, label: "(1, 2)" },
      { x: 3, y: 8, label: "(3, 8)" },
      { xMin: 0, xMax: 4, yMin: 0, yMax: 9, xStep: 1, yStep: 1 }
    ),
  },
  "y8-lin-grd-m4": {
    prompt: "Use the two labelled points on the line segment to find its gradient.",
    cartesianGraph: segmentGraph(
      "Cartesian line segment joining the labelled points (2, 5) and (6, 1).",
      { x: 2, y: 5, label: "(2, 5)" },
      { x: 6, y: 1, label: "(6, 1)" },
      { xMin: 0, xMax: 8, yMin: 0, yMax: 7, xStep: 1, yStep: 1 }
    ),
  },
  "y8-lin-grd-m7": {
    prompt: "Use the two labelled points on the line segment to find its gradient.",
    cartesianGraph: segmentGraph(
      "Cartesian line segment joining the labelled points (0, 3) and (4, 11).",
      { x: 0, y: 3, label: "(0, 3)" },
      { x: 4, y: 11, label: "(4, 11)" },
      { xMin: -1, xMax: 5, yMin: 0, yMax: 12, xStep: 1, yStep: 2 }
    ),
  },
  "y8-lin-grd-m10": {
    prompt: "Use the two labelled points on the line segment to find its gradient.",
    cartesianGraph: segmentGraph(
      "Cartesian line segment joining the labelled points (1, 7) and (3, 3).",
      { x: 1, y: 7, label: "(1, 7)" },
      { x: 3, y: 3, label: "(3, 3)" },
      { xMin: 0, xMax: 4, yMin: 0, yMax: 9, xStep: 1, yStep: 1 }
    ),
  },
  "y8-lin-grd-mp1": {
    prompt:
      "The graph shows the volume V in a draining water tank over time t, with a constant rate of change.",
    cartesianGraph: {
      description:
        "Volume-time graph of V = -20t + 200 from (0, 200) to (10, 0), including the point (4, 120).",
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 220,
      xStep: 2,
      yStep: 20,
      xAxisLabel: "Time t (minutes)",
      yAxisLabel: "Volume V (litres)",
      lines: [{ kind: "linear", m: -20, b: 200, xMin: 0, xMax: 10 }],
      points: [
        { x: 0, y: 200, label: "(0, 200)" },
        { x: 4, y: 120, label: "(4, 120)" },
        { x: 10, y: 0, label: "(10, 0)" },
      ],
    },
  },
  "y8-lin-gra-mp1": {
    prompt:
      "Use the graph of the linear rule y = 2x - 6 to answer the multipart question.",
    cartesianGraph: {
      description:
        "Cartesian graph of y = 2x - 6 with y-intercept (0, -6), x-intercept (3, 0) and point (5, 4) labelled.",
      xMin: -1,
      xMax: 6,
      yMin: -8,
      yMax: 6,
      xStep: 1,
      yStep: 2,
      lines: [{ kind: "linear", m: 2, b: -6 }],
      points: [
        { x: 0, y: -6, label: "(0, -6)" },
        { x: 3, y: 0, label: "(3, 0)" },
        { x: 5, y: 4, label: "(5, 4)" },
      ],
    },
  },
  "y8-lin-int-g1": {
    prompt: "The distance-time graph is horizontal. What does this mean about the object?",
    cartesianGraph: {
      description:
        "Distance-time graph with a horizontal line at 40 metres from 0 to 5 minutes, so distance does not change over time.",
      xMin: 0,
      xMax: 5,
      yMin: 0,
      yMax: 60,
      xStep: 1,
      yStep: 10,
      xAxisLabel: "Time (minutes)",
      yAxisLabel: "Distance (metres)",
      lines: [{ kind: "linear", m: 0, b: 40, xMin: 0, xMax: 5 }],
    },
  },
  "y8-lin-int-i3": {
    prompt: "Use the two labelled points on the cost graph to find its gradient.",
    cartesianGraph: segmentGraph(
      "Cost graph joining the labelled points (0, 8) and (2, 14), measured in dollars per item.",
      { x: 0, y: 8, label: "(0, 8)" },
      { x: 2, y: 14, label: "(2, 14)" },
      {
        xMin: 0,
        xMax: 4,
        yMin: 0,
        yMax: 22,
        xStep: 1,
        yStep: 2,
        xAxisLabel: "Items",
        yAxisLabel: "Cost ($)",
      }
    ),
  },
  "y8-lin-int-m2": {
    prompt: "Use the y-intercept and the second labelled point to find the line's gradient.",
    cartesianGraph: segmentGraph(
      "Cartesian line segment joining the y-intercept (0, 12) to the labelled point (2, 20).",
      { x: 0, y: 12, label: "(0, 12)" },
      { x: 2, y: 20, label: "(2, 20)" },
      { xMin: 0, xMax: 4, yMin: 0, yMax: 24, xStep: 1, yStep: 4 }
    ),
  },
  "y8-lin-int-mp1": {
    prompt:
      "The graph shows the scooter hire cost C = 9h + 20, where h is the number of hours.",
    cartesianGraph: {
      description:
        "Scooter hire cost graph C = 9h + 20 with fixed-fee point (0, 20), five-hour point (5, 65) and point (10, 110).",
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 120,
      xStep: 2,
      yStep: 20,
      xAxisLabel: "Hours h",
      yAxisLabel: "Cost C ($)",
      lines: [{ kind: "linear", m: 9, b: 20, xMin: 0, xMax: 10 }],
      points: [
        { x: 0, y: 20, label: "(0, 20)" },
        { x: 5, y: 65, label: "(5, 65)" },
        { x: 10, y: 110, label: "(10, 110)" },
      ],
    },
  },
};
