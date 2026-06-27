import type { CongruentTrianglesDiagram, TriangleDiagram } from "../types";

export type CongruenceQuestionVisual = {
  prompt: string;
  congruentTrianglesDiagram: CongruentTrianglesDiagram;
};

const leftVertices: TriangleDiagram["vertices"] = {
  A: { x: 200, y: 35 },
  B: { x: 55, y: 235 },
  C: { x: 345, y: 235 },
};

const rightVertices: TriangleDiagram["vertices"] = {
  A: { x: 200, y: 245 },
  B: { x: 345, y: 45 },
  C: { x: 55, y: 45 },
};

const leftRightVertices: TriangleDiagram["vertices"] = {
  A: { x: 70, y: 45 },
  B: { x: 70, y: 235 },
  C: { x: 335, y: 235 },
};

const rightRightVertices: TriangleDiagram["vertices"] = {
  A: { x: 330, y: 45 },
  B: { x: 330, y: 235 },
  C: { x: 65, y: 235 },
};

function triangle(
  description: string,
  vertexLabels: [string, string, string],
  options: Omit<TriangleDiagram, "description" | "vertices" | "vertexLabels"> = {},
  vertices: TriangleDiagram["vertices"] = leftVertices
): TriangleDiagram {
  return {
    description,
    vertices,
    vertexLabels: { A: vertexLabels[0], B: vertexLabels[1], C: vertexLabels[2] },
    ...options,
  };
}

function pair(
  description: string,
  left: TriangleDiagram,
  right: TriangleDiagram,
  leftCaption: string,
  rightCaption: string
): CongruentTrianglesDiagram {
  return { description, left, right, leftCaption, rightCaption };
}

export const congruenceQuestionVisuals: Record<string, CongruenceQuestionVisual> = {
  "y8-geo-con-g1": {
    prompt: "Which congruence test is demonstrated by the matching marks on the two triangles?",
    congruentTrianglesDiagram: pair(
      "Two triangles with two pairs of corresponding sides marked equal and the included angles marked equal.",
      triangle(
        "Triangle ABC with sides AB and BC marked and included angle B marked.",
        ["A", "B", "C"],
        { sideTicks: { AB: 1, BC: 2 }, angleMarks: { B: 1 } }
      ),
      triangle(
        "Triangle DEF with sides DE and EF marked to correspond to AB and BC, and included angle E marked.",
        ["D", "E", "F"],
        { sideTicks: { AB: 1, BC: 2 }, angleMarks: { B: 1 } },
        rightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
  "y8-geo-con-g2": {
    prompt: "Use the matching side lengths and marks to identify the congruence test.",
    congruentTrianglesDiagram: pair(
      "Triangles ABC and DEF with all three pairs of corresponding sides equal: 5 cm, 7 cm and 9 cm.",
      triangle(
        "Triangle ABC with AB 5 cm, BC 7 cm and AC 9 cm, each carrying a distinct correspondence mark.",
        ["A", "B", "C"],
        {
          sideLabels: { AB: "5 cm", BC: "7 cm", AC: "9 cm" },
          sideTicks: { AB: 1, BC: 2, AC: 3 },
        }
      ),
      triangle(
        "Triangle DEF with DE 5 cm, EF 7 cm and DF 9 cm, marked to correspond to triangle ABC.",
        ["D", "E", "F"],
        {
          sideLabels: { AB: "5 cm", BC: "7 cm", AC: "9 cm" },
          sideTicks: { AB: 1, BC: 2, AC: 3 },
        },
        rightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
  "y8-geo-con-g3": {
    prompt: "Name the congruence test demonstrated by the two marked right triangles.",
    congruentTrianglesDiagram: pair(
      "Two right triangles with corresponding hypotenuses and one other pair of sides marked equal.",
      triangle(
        "Right triangle ABC with right angle at B, hypotenuse AC marked once and side AB marked twice.",
        ["A", "B", "C"],
        { rightAngleAt: "B", sideTicks: { AC: 1, AB: 2 } },
        leftRightVertices
      ),
      triangle(
        "Right triangle DEF with right angle at E, hypotenuse DF marked once and side DE marked twice.",
        ["D", "E", "F"],
        { rightAngleAt: "B", sideTicks: { AC: 1, AB: 2 } },
        rightRightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
  "y8-geo-con-i1": {
    prompt: "Use the three pairs of matching side marks to name the congruence test.",
    congruentTrianglesDiagram: pair(
      "Triangles PQR and XYZ with PQ matching XY, QR matching YZ and PR matching XZ.",
      triangle(
        "Triangle PQR with each side carrying a distinct correspondence mark.",
        ["P", "Q", "R"],
        { sideTicks: { AB: 1, BC: 2, AC: 3 } }
      ),
      triangle(
        "Triangle XYZ with sides XY, YZ and XZ marked to correspond to PQ, QR and PR.",
        ["X", "Y", "Z"],
        { sideTicks: { AB: 1, BC: 2, AC: 3 } },
        rightVertices
      ),
      "Triangle PQR",
      "Triangle XYZ"
    ),
  },
  "y8-geo-con-i3": {
    prompt: "Where is the marked equal angle positioned relative to the two marked equal sides?",
    congruentTrianglesDiagram: pair(
      "Two triangles with two corresponding side pairs marked equal and the angle between each pair marked equal.",
      triangle(
        "Triangle ABC with marked sides AB and BC meeting at the marked angle B.",
        ["A", "B", "C"],
        { sideTicks: { AB: 1, BC: 2 }, angleMarks: { B: 1 } }
      ),
      triangle(
        "Triangle DEF with marked sides DE and EF meeting at the corresponding marked angle E.",
        ["D", "E", "F"],
        { sideTicks: { AB: 1, BC: 2 }, angleMarks: { B: 1 } },
        rightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
  "y8-geo-con-i4": {
    prompt: "Name the congruence test demonstrated by the two angle pairs and one side pair.",
    congruentTrianglesDiagram: pair(
      "Two triangles with two pairs of corresponding angles and one pair of corresponding non-included sides marked equal.",
      triangle(
        "Triangle ABC with angles A and B marked and side BC carrying one tick.",
        ["A", "B", "C"],
        { angleMarks: { A: 1, B: 2 }, sideTicks: { BC: 1 } }
      ),
      triangle(
        "Triangle DEF with angles D and E marked to match A and B, and side EF matching BC.",
        ["D", "E", "F"],
        { angleMarks: { A: 1, B: 2 }, sideTicks: { BC: 1 } },
        rightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
  "y8-geo-con-m5": {
    prompt: "Use the correspondence shown to identify the side matching AC.",
    congruentTrianglesDiagram: pair(
      "Congruent triangles ABC and DEF with A corresponding to D, B to E and C to F.",
      triangle(
        "Triangle ABC with side AC highlighted and carrying three correspondence ticks.",
        ["A", "B", "C"],
        { sideTicks: { AB: 1, BC: 2, AC: 3 }, highlightedSides: ["AC"] }
      ),
      triangle(
        "Triangle DEF with side DF carrying three ticks to correspond to AC.",
        ["D", "E", "F"],
        { sideTicks: { AB: 1, BC: 2, AC: 3 }, highlightedSides: ["AC"] },
        rightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
  "y8-geo-con-m7": {
    prompt: "Do the marked right triangles satisfy a congruence test? Answer yes or no.",
    congruentTrianglesDiagram: pair(
      "Two right triangles, each with hypotenuse 10 cm and one corresponding shorter side 6 cm.",
      triangle(
        "Right triangle ABC with right angle at B, hypotenuse AC 10 cm and side AB 6 cm.",
        ["A", "B", "C"],
        {
          rightAngleAt: "B",
          sideLabels: { AC: "10 cm", AB: "6 cm" },
          sideTicks: { AC: 1, AB: 2 },
        },
        leftRightVertices
      ),
      triangle(
        "Right triangle DEF with right angle at E, hypotenuse DF 10 cm and side DE 6 cm.",
        ["D", "E", "F"],
        {
          rightAngleAt: "B",
          sideLabels: { AC: "10 cm", AB: "6 cm" },
          sideTicks: { AC: 1, AB: 2 },
        },
        rightRightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
  "y8-geo-con-m9": {
    prompt: "The marked triangles are congruent. Use the given angles to find angle P.",
    congruentTrianglesDiagram: pair(
      "Congruent triangles ABC and PQR. In ABC, angle B is 55 degrees and angle C is 65 degrees; angle A corresponds to angle P.",
      triangle(
        "Triangle ABC with angle B 55 degrees, angle C 65 degrees and correspondence arcs at all vertices.",
        ["A", "B", "C"],
        {
          angleLabels: { B: "55\u00b0", C: "65\u00b0" },
          angleMarks: { A: 1, B: 2, C: 3 },
        }
      ),
      triangle(
        "Triangle PQR with angle P labelled x and correspondence arcs matching A to P, B to Q and C to R.",
        ["P", "Q", "R"],
        { angleLabels: { A: "x" }, angleMarks: { A: 1, B: 2, C: 3 } },
        rightVertices
      ),
      "Triangle ABC",
      "Triangle PQR"
    ),
  },
  "y8-geo-con-mp1": {
    prompt:
      "The matching marks show triangles ABC and DEF satisfy SAS. Use the given angles and side length for each part.",
    congruentTrianglesDiagram: pair(
      "Triangles ABC and DEF with AB matching DE, BC matching EF and included angles B and E matching. Triangle ABC has angles A 58 degrees and C 74 degrees; AB and DE are 9 cm.",
      triangle(
        "Triangle ABC with AB 9 cm, AB and BC correspondence marks, included angle B labelled x, angle A 58 degrees and angle C 74 degrees.",
        ["A", "B", "C"],
        {
          sideLabels: { AB: "9 cm" },
          sideTicks: { AB: 1, BC: 2 },
          angleLabels: { A: "58\u00b0", B: "x", C: "74\u00b0" },
          angleMarks: { B: 1 },
        }
      ),
      triangle(
        "Triangle DEF with DE 9 cm, DE and EF correspondence marks and included angle E labelled x.",
        ["D", "E", "F"],
        {
          sideLabels: { AB: "9 cm" },
          sideTicks: { AB: 1, BC: 2 },
          angleLabels: { B: "x" },
          angleMarks: { B: 1 },
        },
        rightVertices
      ),
      "Triangle ABC",
      "Triangle DEF"
    ),
  },
};
