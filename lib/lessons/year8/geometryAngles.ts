import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";
import type { AngleFigureDiagram, PlaneShapeDiagram, TriangleDiagram } from "../types";

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
  | "masteryQuizPool"
  | "multiPartPractice"
>;

// ── Helper builders ──────────────────────────────────────────────────────────

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  triangleDiagram?: TriangleDiagram,
  planeShapeDiagram?: PlaneShapeDiagram,
  angleFigureDiagram?: AngleFigureDiagram
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify the angle relationship, state the rule, then calculate.",
    explanation,
    triangleDiagram,
    planeShapeDiagram,
    angleFigureDiagram,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C or D.}",
  triangleDiagram?: TriangleDiagram,
  planeShapeDiagram?: PlaneShapeDiagram,
  angleFigureDiagram?: AngleFigureDiagram
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Think about which angle relationship applies and select the best option.",
    explanation,
    triangleDiagram,
    planeShapeDiagram,
    angleFigureDiagram,
  };
}

// ── Diagram builders ─────────────────────────────────────────────────────────
// All triangles are drawn in SVG coordinates (y increases downward). A sits at
// the apex, B at the lower-left, C at the lower-right unless noted.

/** Generic (non-right) triangle with an apex A and base B–C, labelled angles. */
function triAngles(
  description: string,
  angleLabels: TriangleDiagram["angleLabels"],
  vertexLabels: TriangleDiagram["vertexLabels"] = { A: "A", B: "B", C: "C" }
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 200, y: 40 },
      B: { x: 60, y: 250 },
      C: { x: 360, y: 250 },
    },
    vertexLabels,
    angleLabels,
  };
}

/** Right-angled triangle, right angle at the named vertex. */
function triRight(
  description: string,
  angleLabels: TriangleDiagram["angleLabels"],
  rightAngleAt: "A" | "B" | "C" = "B",
  vertexLabels: TriangleDiagram["vertexLabels"] = { A: "A", B: "B", C: "C" }
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 80, y: 40 },
      B: { x: 80, y: 250 },
      C: { x: 360, y: 250 },
    },
    rightAngleAt,
    vertexLabels,
    angleLabels,
  };
}

/**
 * A transversal crossing two parallel lines, modelled as a slanted
 * parallelogram. The bottom and top edges are the two parallel lines (marked
 * with single chevrons); the slanted left and right edges are the transversal
 * and its parallel partner. In this figure two adjacent interior angles are
 * co-interior (sum to 180°) and two opposite interior angles are alternate /
 * corresponding (equal) — so it faithfully renders every parallel-line angle
 * relationship. `bottom`/`top` are the lower-right and upper-left interior-angle
 * labels (a co-interior pair). Coordinates are natural (y-up).
 */
function parallelAnglesShape(
  description: string,
  labels: {
    bottomRight?: string;
    bottomLeft?: string;
    topRight?: string;
    topLeft?: string;
  }
): PlaneShapeDiagram {
  return {
    description,
    fill: "none",
    vertices: [
      // order: bottom-left, bottom-right, top-right, top-left (anticlockwise in y-up)
      { x: 0, y: 0, angleLabel: labels.bottomLeft },
      { x: 130, y: 0, angleLabel: labels.bottomRight },
      { x: 175, y: 90, angleLabel: labels.topRight },
      { x: 45, y: 90, angleLabel: labels.topLeft },
    ],
    edges: [
      { arrows: 1 }, // bottom parallel line
      {}, // right transversal
      { arrows: 1 }, // top parallel line
      {}, // left transversal
    ],
  };
}

/**
 * An angle figure drawn as rays from a single point (`kind: "rays"`): angles on
 * a straight line, angles at a point, or two intersecting lines / vertically
 * opposite angles. Angles in degrees, 0° = east, CCW positive. Include opposite
 * directions (e.g. 0 and 180) for any ray that is a full straight line.
 */
function raysFig(
  description: string,
  rays: number[],
  sectorLabels: { between: [number, number]; label: string; right?: boolean }[],
  rayLabels?: (string | null)[]
): AngleFigureDiagram {
  return { description, kind: "rays", rays, sectorLabels, rayLabels };
}

/**
 * Two parallel lines cut by a transversal (`kind: "transversal"`). The
 * transversal slopes down to the right, so at each intersection the TR and BL
 * quadrants hold the obtuse angle and the TL and BR quadrants hold the acute
 * angle. Corresponding angles share a position at both crossings; alternate
 * angles are top-BL ↔ bottom-TR; co-interior angles are top-BR ↔ bottom-TR.
 */
function transversalFig(
  description: string,
  topAngles: AngleFigureDiagram["topAngles"],
  bottomAngles: AngleFigureDiagram["bottomAngles"],
  parallelLabels?: [string, string]
): AngleFigureDiagram {
  return {
    description,
    kind: "transversal",
    transversalDeg: 58,
    parallelLabels,
    topAngles,
    bottomAngles,
  };
}

/** A general quadrilateral with the four interior angles labelled. */
function quadAngles(
  description: string,
  angleLabels: [string, string, string, string],
  vertexLabels: [string, string, string, string] = ["A", "B", "C", "D"],
  fill: PlaneShapeDiagram["fill"] = "blue"
): PlaneShapeDiagram {
  return {
    description,
    fill,
    vertices: [
      { x: 0, y: 0, label: vertexLabels[0], angleLabel: angleLabels[0] },
      { x: 120, y: 10, label: vertexLabels[1], angleLabel: angleLabels[1] },
      { x: 110, y: 90, label: vertexLabels[2], angleLabel: angleLabels[2] },
      { x: 15, y: 80, label: vertexLabels[3], angleLabel: angleLabels[3] },
    ],
  };
}

/**
 * A parallelogram ABCD (A bottom-left, B bottom-right, C top-right, D top-left)
 * with both pairs of opposite sides marked parallel (single/double chevrons) and
 * optional interior-angle labels at each vertex.
 */
function parallelogramAngles(
  description: string,
  angles: { A?: string; B?: string; C?: string; D?: string },
  labels: [string, string, string, string] = ["A", "B", "C", "D"]
): PlaneShapeDiagram {
  return {
    description,
    fill: "teal",
    vertices: [
      { x: 0, y: 0, label: labels[0], angleLabel: angles.A },
      { x: 130, y: 0, label: labels[1], angleLabel: angles.B },
      { x: 170, y: 80, label: labels[2], angleLabel: angles.C },
      { x: 40, y: 80, label: labels[3], angleLabel: angles.D },
    ],
    edges: [
      { arrows: 1 }, // first parallel pair
      { arrows: 2 }, // second parallel pair
      { arrows: 1 },
      { arrows: 2 },
    ],
  };
}

/**
 * A rectangle ABCD with right-angle marks at every vertex and optional angle /
 * vertex labels. Opposite sides are marked parallel.
 */
function rectangleAngles(
  description: string,
  angles: { A?: string; B?: string; C?: string; D?: string } = {}
): PlaneShapeDiagram {
  return {
    description,
    fill: "blue",
    vertices: [
      { x: 0, y: 0, label: "A", rightAngle: true, angleLabel: angles.A },
      { x: 150, y: 0, label: "B", rightAngle: true, angleLabel: angles.B },
      { x: 150, y: 90, label: "C", rightAngle: true, angleLabel: angles.C },
      { x: 0, y: 90, label: "D", rightAngle: true, angleLabel: angles.D },
    ],
    edges: [{ arrows: 1 }, { arrows: 2 }, { arrows: 1 }, { arrows: 2 }],
  };
}

/**
 * A rhombus ABCD (all sides equal, drawn as a slanted diamond) with equal-length
 * tick marks on every side and optional interior-angle labels.
 */
function rhombusAngles(
  description: string,
  angles: { A?: string; B?: string; C?: string; D?: string }
): PlaneShapeDiagram {
  return {
    description,
    fill: "violet",
    vertices: [
      { x: 60, y: 0, label: "A", angleLabel: angles.A },
      { x: 180, y: 0, label: "B", angleLabel: angles.B },
      { x: 120, y: 90, label: "C", angleLabel: angles.C },
      { x: 0, y: 90, label: "D", angleLabel: angles.D },
    ],
    edges: [{ ticks: 1 }, { ticks: 1 }, { ticks: 1 }, { ticks: 1 }],
  };
}

/**
 * A trapezium ABCD with exactly one pair of parallel sides (AB ∥ DC, marked with
 * chevrons) and optional interior-angle labels.
 */
function trapeziumAngles(
  description: string,
  angles: { A?: string; B?: string; C?: string; D?: string },
  labels: [string, string, string, string] = ["A", "B", "C", "D"]
): PlaneShapeDiagram {
  return {
    description,
    fill: "amber",
    vertices: [
      { x: 0, y: 0, label: labels[0], angleLabel: angles.A },
      { x: 170, y: 0, label: labels[1], angleLabel: angles.B },
      { x: 130, y: 80, label: labels[2], angleLabel: angles.C },
      { x: 40, y: 80, label: labels[3], angleLabel: angles.D },
    ],
    edges: [
      { arrows: 1 }, // AB (parallel)
      {}, // BC
      { arrows: 1 }, // CD (parallel to AB)
      {}, // DA
    ],
  };
}

/**
 * A kite ABCD with two pairs of adjacent equal sides (AB = AD marked with single
 * ticks, CB = CD marked with double ticks) and optional interior-angle labels.
 * A is the top vertex, C the bottom; B and D are the side vertices.
 */
function kiteAngles(
  description: string,
  angles: { A?: string; B?: string; C?: string; D?: string }
): PlaneShapeDiagram {
  return {
    description,
    fill: "green",
    vertices: [
      { x: 80, y: 130, label: "A", angleLabel: angles.A },
      { x: 150, y: 80, label: "B", angleLabel: angles.B },
      { x: 80, y: 0, label: "C", angleLabel: angles.C },
      { x: 10, y: 80, label: "D", angleLabel: angles.D },
    ],
    edges: [
      { ticks: 2 }, // AB
      { ticks: 1 }, // BC
      { ticks: 1 }, // CD
      { ticks: 2 }, // DA
    ],
  };
}

// ── Lesson 1: Angle Relationships ─────────────────────────────────────────────

const angleRelationships: LessonContent = {
  description:
    "Recognise and apply angle relationships including vertically opposite angles, complementary and supplementary angles, angles on a straight line, and angles at a point.",
  learningIntention:
    "Identify and use angle relationships to find unknown angles without measuring.",
  successCriteria: [
    "State that vertically opposite angles are equal when two lines intersect.",
    "Identify complementary angles as summing to 90° and supplementary angles as summing to 180°.",
    "Apply the angle-on-a-straight-line rule (180°) to find missing angles.",
    "Apply the angles-at-a-point rule (360°) to find missing angles.",
  ],
  teaching: {
    paragraphs: [
      "Angles measure turn. A full turn all the way around a point is $360^\\circ$, and a half turn — the amount you would swing to face the exact opposite direction — is $180^\\circ$. Almost every rule in this lesson is just one of those two facts seen from a different angle, so keep them in mind.",
      "Picture a straight line, like a flat horizon, with one ray pointing up from a point on it. That ray splits the half turn above the line into two angles. Because the whole sweep along the flat line is a half turn, those two angles must fill exactly $180^\\circ$ between them. Angles that sit side by side on a straight line like this are called angles on a straight line, and they always add to $180^\\circ$.",
      "Now cross two straight lines. They make four angles around the meeting point. Two angles that share an edge sit on a straight line together, so they add to $180^\\circ$ — these are supplementary angles. Two angles that face each other across the crossing, sharing no edge, are vertically opposite angles, and they are always equal.",
      "Here is why vertically opposite angles must be equal — and it is worth seeing, not just memorising. Call the four angles $a$, $b$, $c$, $d$ going around. Angle $a$ and angle $b$ sit on a straight line, so $a + b = 180^\\circ$. Angle $c$ and angle $b$ also sit on a straight line, so $c + b = 180^\\circ$. Both equal $180^\\circ$, so $a + b = c + b$, and taking $b$ off each side leaves $a = c$. The two opposite angles are forced to be equal — no measuring needed.",
      "Two more named relationships describe angles by their total. Complementary angles add to $90^\\circ$ (a right angle — the corner of a square). Supplementary angles add to $180^\\circ$ (a straight line). The names are easy to mix up; the link is that a right angle is half of a straight angle, so complementary is the $90^\\circ$ partnership and supplementary is the $180^\\circ$ one. To find a missing angle in either, subtract the known angle from the total.",
      "If instead of a flat line you have several angles spread all the way around a single point with no gaps, they complete a full turn, so they add to $360^\\circ$. Add up the known angles and subtract from $360^\\circ$ to find the missing one.",
      "A warning that catches many students: never trust how big an angle looks in a diagram. Figures are often not drawn to scale, and an angle that looks like a right angle might be $80^\\circ$. Decide each angle from a stated rule and the given numbers, not from the picture. If you are asked for the angle vertically opposite $43^\\circ$, the answer is $43^\\circ$ because the rule says so, even if the drawing looks lopsided.",
    ],
    latexBlocks: [
      "\\text{Angles on a straight line: } a + b = 180^\\circ",
      "\\text{Vertically opposite angles: } a = b",
      "\\text{Complementary: } a + b = 90^\\circ \\qquad \\text{Supplementary: } a + b = 180^\\circ",
      "\\text{Angles at a point: } a + b + c + \\cdots = 360^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find a supplementary angle",
      questionLatex:
        "\\text{Two angles are supplementary. One angle is }54^\\circ.\\text{ Find the other.}",
      angleFigureDiagram: {
        description:
          "A straight line split by one ray into two supplementary angles: 54 degrees and the unknown angle a.",
        kind: "rays",
        rays: [0, 180, 54],
        sectorLabels: [
          { between: [0, 54], label: "54°" },
          { between: [54, 180], label: "a" },
        ],
      },
      steps: [
        {
          explanation: "Supplementary means the two angles together make a straight angle, so write their sum as 180°.",
          latex: "a + 54 = 180",
        },
        {
          explanation: "Undo the +54 by subtracting 54 from both sides to leave a on its own.",
          latex: "a = 180 - 54 = 126",
        },
      ],
      finalAnswerLatex: "\\text{The other angle is }126^\\circ.",
    } as WorkedExample,
    {
      title: "Find an unknown angle at a point",
      questionLatex:
        "\\text{Three angles meet at a point with no gaps: }85^\\circ,\\;110^\\circ\\text{ and }x^\\circ.\\text{ Find }x.",
      angleFigureDiagram: {
        description:
          "Three angles meeting at a point with no gaps: 85 degrees, 110 degrees and the unknown angle x, filling a full turn.",
        kind: "rays",
        rays: [0, 85, 195],
        sectorLabels: [
          { between: [0, 85], label: "85°" },
          { between: [85, 195], label: "110°" },
          { between: [195, 360], label: "x" },
        ],
      },
      steps: [
        {
          explanation: "Angles around a point complete a full turn, so their total is 360°.",
          latex: "85 + 110 + x = 360",
        },
        {
          explanation: "Add the two known angles to simplify the left side.",
          latex: "195 + x = 360",
        },
        {
          explanation: "Subtract 195 from both sides to isolate x.",
          latex: "x = 360 - 195 = 165",
        },
      ],
      finalAnswerLatex: "x = 165^\\circ.",
    } as WorkedExample,
    {
      title: "Use vertically opposite angles",
      questionLatex:
        "\\text{Two lines intersect. One angle is }43^\\circ.\\text{ Find the three other angles.}",
      angleFigureDiagram: {
        description:
          "Two straight lines intersecting at a point, forming four angles: 43 degrees, 137 degrees, 43 degrees and 137 degrees around the crossing.",
        kind: "rays",
        rays: [0, 180, 43, 223],
        sectorLabels: [
          { between: [0, 43], label: "43°" },
          { between: [43, 180], label: "137°" },
          { between: [180, 223], label: "43°" },
          { between: [223, 360], label: "137°" },
        ],
      },
      steps: [
        {
          explanation: "The angle directly across the crossing is vertically opposite 43°, so it is equal to it.",
          latex: "\\text{vertically opposite } 43^\\circ \\Rightarrow 43^\\circ",
        },
        {
          explanation: "An angle next to the 43° one shares the straight line with it, so they are supplementary.",
          latex: "180 - 43 = 137^\\circ",
        },
        {
          explanation: "The last angle is vertically opposite the 137° one, so it is equal to it.",
          latex: "\\text{vertically opposite } 137^\\circ \\Rightarrow 137^\\circ",
        },
      ],
      finalAnswerLatex:
        "\\text{The four angles are } 43^\\circ,\\; 137^\\circ,\\; 43^\\circ,\\; 137^\\circ.",
    } as WorkedExample,
    {
      title: "Multi-step: an algebraic split of angles at a point",
      questionLatex:
        "\\text{Four angles meet at a point: a right angle, then }x^\\circ,\\;(x+20)^\\circ\\text{ and }2x^\\circ.\\text{ Find each unknown angle.}",
      angleFigureDiagram: {
        description:
          "Four angles meeting at a point: a right angle, then x degrees, (x + 20) degrees and 2x degrees, filling a full turn.",
        kind: "rays",
        rays: [0, 90, 152.5, 235],
        sectorLabels: [
          { between: [0, 90], label: "", right: true },
          { between: [90, 152.5], label: "x" },
          { between: [152.5, 235], label: "(x+20)" },
          { between: [235, 360], label: "2x" },
        ],
      },
      steps: [
        {
          explanation: "A right angle is 90°; the four angles fill a full turn, so set their sum to 360°.",
          latex: "90 + x + (x+20) + 2x = 360",
        },
        {
          explanation: "Collect the x-terms and the numbers on the left side.",
          latex: "4x + 110 = 360",
        },
        {
          explanation: "Subtract 110 from both sides to undo the constant.",
          latex: "4x = 250",
        },
        {
          explanation: "Divide both sides by 4 to find x.",
          latex: "x = 62.5",
        },
        {
          explanation: "Substitute x back into each expression to state the three unknown angles.",
          latex: "x = 62.5^\\circ,\\; x+20 = 82.5^\\circ,\\; 2x = 125^\\circ",
        },
      ],
      finalAnswerLatex:
        "\\text{The angles are } 62.5^\\circ,\\; 82.5^\\circ \\text{ and } 125^\\circ \\text{ (with the } 90^\\circ\\text{).}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-geo-ang-g1",
      "When two straight lines intersect, which pair of angles is always equal?",
      "B",
      [
        "Adjacent angles",
        "Vertically opposite angles",
        "All four angles",
        "Supplementary angles only",
      ],
      "Vertically opposite angles are equal because they sit directly across the intersection vertex from each other."
    ),
    answer(
      "y8-geo-ang-g2",
      "Two angles are complementary. One angle is 37°. Find the other angle in degrees.",
      "37 + x = 90",
      "53",
      "Complementary angles sum to 90°. x = 90 − 37 = 53°.",
      ["53°"],
      undefined,
      undefined,
      raysFig(
        "A right-angle corner split by one ray into two complementary angles: 37 degrees and the unknown angle x.",
        [0, 90, 37],
        [
          { between: [0, 37], label: "37°" },
          { between: [37, 90], label: "x" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-g3",
      "Two angles are supplementary. One angle is 145°. Find the other angle in degrees.",
      "145 + x = 180",
      "35",
      "Supplementary angles sum to 180°. x = 180 − 145 = 35°.",
      ["35°"],
      undefined,
      undefined,
      raysFig(
        "A straight line split by one ray into two supplementary angles: 145 degrees and the unknown angle x.",
        [0, 180, 145],
        [
          { between: [0, 145], label: "145°" },
          { between: [145, 180], label: "x" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-g4",
      "Three angles meet at a point. Two of them are 95° and 130°. Find the third angle in degrees.",
      "95 + 130 + x = 360",
      "135",
      "Angles at a point sum to 360°. x = 360 − 95 − 130 = 135°.",
      ["135°"],
      undefined,
      undefined,
      raysFig(
        "Three angles meeting at a point: 95 degrees, 130 degrees and the unknown angle x, filling a full turn.",
        [0, 95, 225],
        [
          { between: [0, 95], label: "95°" },
          { between: [95, 225], label: "130°" },
          { between: [225, 360], label: "x" },
        ]
      )
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-ang-i1",
      "Two lines intersect. One angle is 68°. Find the vertically opposite angle in degrees.",
      "\\text{vertically opposite to }68^\\circ",
      "68",
      "Vertically opposite angles are equal. The answer is 68°.",
      ["68°"],
      undefined,
      undefined,
      raysFig(
        "Two straight lines intersecting at a point. One angle is 68 degrees; the angle vertically opposite it is marked x.",
        [0, 180, 68, 248],
        [
          { between: [0, 68], label: "68°" },
          { between: [180, 248], label: "x" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-i2",
      "Two angles are supplementary. One is 73°. Find the other angle in degrees.",
      "73 + x = 180",
      "107",
      "x = 180 − 73 = 107°.",
      ["107°"],
      undefined,
      undefined,
      raysFig(
        "A straight line split by one ray into two supplementary angles: 73 degrees and the unknown angle x.",
        [0, 180, 73],
        [
          { between: [0, 73], label: "73°" },
          { between: [73, 180], label: "x" },
        ]
      )
    ),
    choice(
      "y8-geo-ang-i3",
      "Which statement correctly describes angles on a straight line?",
      "C",
      [
        "They always sum to 90°.",
        "They are always equal to each other.",
        "They sum to 180°.",
        "They sum to 360°.",
      ],
      "Angles on one side of a straight line form a half-rotation and sum to 180°."
    ),
    answer(
      "y8-geo-ang-i4",
      "A straight line is divided into three adjacent angles: 65°, 90°, and x°. Find x.",
      "65 + 90 + x = 180",
      "25",
      "65 + 90 = 155. x = 180 − 155 = 25°.",
      ["25°"],
      undefined,
      undefined,
      raysFig(
        "A straight line divided into three adjacent angles: 65 degrees, a right angle (90 degrees), and the unknown angle x.",
        [0, 180, 65, 155],
        [
          { between: [0, 65], label: "65°" },
          { between: [65, 155], label: "", right: true },
          { between: [155, 180], label: "x" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-i5",
      "Four angles meet at a point: 72°, 95°, 85°, and x°. Find x.",
      "72 + 95 + 85 + x = 360",
      "108",
      "72 + 95 + 85 = 252. x = 360 − 252 = 108°.",
      ["108°"],
      undefined,
      undefined,
      raysFig(
        "Four angles meeting at a point: 72 degrees, 95 degrees, 85 degrees and the unknown angle x, filling a full turn.",
        [0, 72, 167, 252],
        [
          { between: [0, 72], label: "72°" },
          { between: [72, 167], label: "95°" },
          { between: [167, 252], label: "85°" },
          { between: [252, 360], label: "x" },
        ]
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding vertically opposite angles instead of stating they are equal.",
      fix: "Vertically opposite angles are equal to each other — no calculation is needed.",
    },
    {
      mistake: "Using 360° for angles on a straight line.",
      fix: "Angles on a straight line form a half-rotation. Their sum is 180°, not 360°.",
    },
    {
      mistake: "Confusing complementary (90°) with supplementary (180°).",
      fix: "Complementary → 90° (a right angle). Supplementary → 180° (a straight line).",
    },
    {
      mistake: "Including extra angles not at the stated point.",
      fix: "Only count the angles at the specific point in the question, then set their sum to 360°.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-geo-ang-m1",
      "Two angles are complementary. One is 56°. Find the other angle in degrees.",
      "56 + x = 90",
      "34",
      "x = 90 − 56 = 34°.",
      ["34°"],
      undefined,
      undefined,
      raysFig(
        "A right-angle corner split by one ray into two complementary angles: 56 degrees and the unknown angle x.",
        [0, 90, 56],
        [
          { between: [0, 56], label: "56°" },
          { between: [56, 90], label: "x" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-m2",
      "Two lines intersect. One angle is 127°. State the vertically opposite angle in degrees.",
      "\\text{vertically opposite to }127^\\circ",
      "127",
      "Vertically opposite angles are equal. The answer is 127°.",
      ["127°"],
      undefined,
      undefined,
      raysFig(
        "Two straight lines intersecting at a point. One angle is 127 degrees; the angle vertically opposite it is marked x.",
        [0, 180, 127, 307],
        [
          { between: [0, 127], label: "127°" },
          { between: [180, 307], label: "x" },
        ]
      )
    ),
    choice(
      "y8-geo-ang-m3",
      "Which statement about supplementary angles is correct?",
      "A",
      [
        "They sum to 180° and do not have to be adjacent.",
        "They sum to 90° and must share a common side.",
        "They are only formed at line intersections.",
        "They are always equal to each other.",
      ],
      "Supplementary angles sum to 180°. They can be adjacent or separate."
    ),
    answer(
      "y8-geo-ang-m4",
      "Angles at a point: three angles are 110°, 115°, and x°. Find x.",
      "110 + 115 + x = 360",
      "135",
      "110 + 115 = 225. x = 360 − 225 = 135°.",
      ["135°"],
      undefined,
      undefined,
      raysFig(
        "Three angles meeting at a point: 110 degrees, 115 degrees and the unknown angle x, filling a full turn.",
        [0, 110, 225],
        [
          { between: [0, 110], label: "110°" },
          { between: [110, 225], label: "115°" },
          { between: [225, 360], label: "x" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-m5",
      "The supplement of 27° is…",
      "27 + x = 180",
      "153",
      "x = 180 − 27 = 153°.",
      ["153°"],
      undefined,
      undefined,
      raysFig(
        "A straight line split by one ray into two supplementary angles: 27 degrees and the unknown angle x.",
        [0, 180, 27],
        [
          { between: [0, 27], label: "27°" },
          { between: [27, 180], label: "x" },
        ]
      )
    ),
    choice(
      "y8-geo-ang-m6",
      "Which best describes vertically opposite angles?",
      "D",
      [
        "Two angles that share a common side",
        "Two angles that sum to 180°",
        "Two angles on the same side of a transversal",
        "Two non-adjacent angles formed by two intersecting lines",
      ],
      "Vertically opposite angles are non-adjacent — they sit across the intersection from each other."
    ),
    answer(
      "y8-geo-ang-m7",
      "Three angles lie on a straight line: 48°, 97°, and x°. Find x.",
      "48 + 97 + x = 180",
      "35",
      "48 + 97 = 145. x = 180 − 145 = 35°.",
      ["35°"],
      undefined,
      undefined,
      raysFig(
        "A straight line divided into three adjacent angles: 48 degrees, 97 degrees and the unknown angle x.",
        [0, 180, 48, 145],
        [
          { between: [0, 48], label: "48°" },
          { between: [48, 145], label: "97°" },
          { between: [145, 180], label: "x" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-m8",
      "The complement of 19° is…",
      "19 + x = 90",
      "71",
      "x = 90 − 19 = 71°.",
      ["71°"],
      undefined,
      undefined,
      raysFig(
        "A right-angle corner split by one ray into two complementary angles: 19 degrees and the unknown angle x.",
        [0, 90, 19],
        [
          { between: [0, 19], label: "19°" },
          { between: [19, 90], label: "x" },
        ]
      )
    ),
    choice(
      "y8-geo-ang-m9",
      "At an intersection, angles p, q, r, s are formed in order. p and r are one vertically opposite pair. What is the other vertically opposite pair?",
      "C",
      [
        "p and q",
        "p and s",
        "q and s",
        "r and s",
      ],
      "At an intersection there are exactly two pairs of vertically opposite angles: (p, r) and (q, s).",
      undefined,
      undefined,
      undefined,
      raysFig(
        "Two straight lines intersecting at a point, forming four angles labelled p, q, r and s in order around the crossing.",
        [0, 180, 50, 230],
        [
          { between: [0, 50], label: "p" },
          { between: [50, 180], label: "q" },
          { between: [180, 230], label: "r" },
          { between: [230, 360], label: "s" },
        ]
      )
    ),
    answer(
      "y8-geo-ang-m10",
      "At a point, three angles are 2x°, 3x°, and 4x°. Find x.",
      "2x + 3x + 4x = 360",
      "40",
      "9x = 360, so x = 40.",
      ["40°"],
      undefined,
      undefined,
      raysFig(
        "Three angles meeting at a point labelled 2x degrees, 3x degrees and 4x degrees, filling a full turn.",
        [0, 80, 200],
        [
          { between: [0, 80], label: "2x" },
          { between: [80, 200], label: "3x" },
          { between: [200, 360], label: "4x" },
        ]
      )
    ),
  ],
};

// ── Lesson 2: Parallel Lines and Transversals ──────────────────────────────────

const parallelLinesTransversals: LessonContent = {
  description:
    "Identify corresponding, alternate and co-interior angles formed when a transversal crosses parallel lines, and use these relationships to find unknown angles.",
  learningIntention:
    "Use parallel-line angle properties to calculate unknown angles and give a correct reason.",
  successCriteria: [
    "Identify corresponding angles (F-shape) as equal when lines are parallel.",
    "Identify alternate angles (Z-shape) as equal when lines are parallel.",
    "Identify co-interior angles (C-shape) as supplementary (sum to 180°) when lines are parallel.",
    "Form and solve simple equations using these relationships.",
  ],
  teaching: {
    paragraphs: [
      "A transversal is a single straight line that cuts across two or more other lines. Where it crosses each line it makes a little cluster of four angles. When the two lines it crosses are parallel, the cluster at the second line is an exact copy of the cluster at the first — same angles, just slid along the transversal. That one idea is the engine behind every rule here.",
      "Why a copy? Parallel lines never get closer or further apart and point in exactly the same direction. So the transversal meets the second line at precisely the same slope as it met the first. Meeting at the same slope makes the same set of angles. So whatever angle appears at the top line reappears, in the same position, at the bottom line.",
      "Corresponding angles are the pair in matching positions — for instance, both in the upper-right corner of their crossing. They form an F-shape: trace down the transversal and across each line and you draw an F. Because the lower cluster is a copy of the upper one, corresponding angles are equal. For example, if the top crossing has $65^\\circ$ in its upper-right corner, the bottom crossing has $65^\\circ$ in its upper-right corner too.",
      "Alternate angles are the Z-shape pair: on opposite sides of the transversal and tucked between the two parallel lines. They are equal, and here is the chain of reasons. Start with a corresponding angle (equal, from above). The angle vertically opposite it across its own crossing is also equal (vertically opposite angles). That vertically opposite angle is exactly the alternate angle — so alternate angles are equal too. They are corresponding angles in disguise.",
      "Co-interior angles are the C-shape pair: on the same side of the transversal, both between the parallel lines. These add to $180^\\circ$ — they are supplementary, not equal. Reason: one co-interior angle and the alternate angle on the other line sit together on a straight line (so they sum to $180^\\circ$), and that alternate angle equals the other co-interior angle. Swap it in and the two co-interior angles sum to $180^\\circ$.",
      "Transfer and the trap to avoid: every one of these rules needs the lines to actually be parallel. If a question does not state or mark the lines parallel, you cannot use F, Z or C reasoning — and you must not judge parallelism from how the diagram looks, since figures are often not to scale. When you do use a rule, name it ('alternate angles, $AB \\parallel CD$'), because in geometry the reason is part of the answer.",
    ],
    latexBlocks: [
      "\\text{Corresponding angles (F-shape): } a = b",
      "\\text{Alternate angles (Z-shape): } a = b",
      "\\text{Co-interior angles (C-shape): } a + b = 180^\\circ",
      "\\text{(all valid only when the two lines are parallel)}",
    ],
  },
  workedExamples: [
    {
      title: "Corresponding angles",
      questionLatex:
        "\\text{Lines }AB \\parallel CD\\text{. A transversal makes a }65^\\circ\\text{ angle at }AB.\\text{ Find the corresponding angle at }CD.",
      angleFigureDiagram: transversalFig(
        "Transversal crossing two parallel lines AB (upper) and CD (lower). The 65 degree angle in the upper-right position at AB and the corresponding angle in the matching upper-right position at CD.",
        { TR: "65°" },
        { TR: "?" },
        ["AB", "CD"]
      ),
      steps: [
        {
          explanation: "The two angles are in matching F-positions, and the lines are parallel, so they are corresponding angles.",
          latex: "\\text{corresponding angles, } AB \\parallel CD",
        },
        {
          explanation: "Corresponding angles are equal, so the angle at CD copies the one at AB.",
          latex: "\\angle\\text{ at }CD = 65^\\circ",
        },
      ],
      finalAnswerLatex: "\\text{The corresponding angle is }65^\\circ.",
    } as WorkedExample,
    {
      title: "Co-interior angles",
      questionLatex:
        "\\text{Parallel lines. One co-interior angle is }115^\\circ.\\text{ Find the other.}",
      angleFigureDiagram: transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side of the transversal, between the lines: one is 115 degrees, the other is unknown.",
        { BR: "?" },
        { TR: "115°" }
      ),
      steps: [
        {
          explanation: "The two angles are on the same side between the parallel lines (C-shape), so they are co-interior and sum to 180°.",
          latex: "115 + x = 180 \\quad (\\text{co-interior angles})",
        },
        {
          explanation: "Subtract 115 from both sides to find the unknown angle.",
          latex: "x = 180 - 115 = 65",
        },
      ],
      finalAnswerLatex: "\\text{The other co-interior angle is }65^\\circ.",
    } as WorkedExample,
    {
      title: "Solve an equation using parallel lines",
      questionLatex:
        "\\text{Co-interior angles are }(3x+10)^\\circ\\text{ and }(2x+20)^\\circ.\\text{ Find }x.",
      angleFigureDiagram: transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side of the transversal, between the lines, labelled (3x + 10) degrees and (2x + 20) degrees.",
        { BR: "(2x+20)°" },
        { TR: "(3x+10)°" }
      ),
      steps: [
        {
          explanation: "Co-interior angles between parallel lines sum to 180°, so add the expressions and set the total to 180.",
          latex: "(3x+10) + (2x+20) = 180",
        },
        {
          explanation: "Collect the x-terms and the numbers separately.",
          latex: "5x + 30 = 180",
        },
        {
          explanation: "Subtract 30, then divide by 5, to solve for x.",
          latex: "5x = 150 \\Rightarrow x = 30",
        },
      ],
      finalAnswerLatex: "x = 30.",
    } as WorkedExample,
    {
      title: "Multi-step: chain alternate and co-interior angles",
      questionLatex:
        "\\text{Lines }AB \\parallel CD\\text{, cut by a transversal. An alternate angle at }AB\\text{ is }72^\\circ.\\text{ Find the co-interior angle on the same side at }CD.",
      angleFigureDiagram: transversalFig(
        "Transversal crossing two parallel lines AB (upper) and CD (lower). The 72 degree angle between the lines at AB and, on the same side at CD, the co-interior angle y.",
        { BR: "72°" },
        { TR: "y" },
        ["AB", "CD"]
      ),
      steps: [
        {
          explanation: "Alternate angles are equal when lines are parallel, so the matching angle at CD is also 72°.",
          latex: "\\text{alternate angles, } AB \\parallel CD \\Rightarrow 72^\\circ \\text{ at } CD",
        },
        {
          explanation: "At the CD crossing, this 72° angle and the wanted co-interior angle sit together on the straight line CD.",
          latex: "72 + y = 180 \\quad (\\text{angles on a straight line})",
        },
        {
          explanation: "Subtract 72 from both sides to find the co-interior angle.",
          latex: "y = 180 - 72 = 108",
        },
        {
          explanation: "Check: the two co-interior angles should sum to 180°, and 72 + 108 = 180, which confirms it.",
          latex: "72 + 108 = 180 \\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{The co-interior angle is }108^\\circ.",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-geo-par-g1",
      "Corresponding angles formed when a transversal cuts parallel lines are associated with which letter shape?",
      "A",
      [
        "F-shape",
        "Z-shape",
        "C-shape",
        "X-shape",
      ],
      "Corresponding angles are in matching positions and form an F-pattern."
    ),
    answer(
      "y8-geo-par-g2",
      "Lines AB and CD are parallel (shown by the chevrons). A transversal makes a 65° angle at AB. Find the corresponding angle x at CD in degrees.",
      "\\text{corresponding angles (F): equal}",
      "65",
      "Corresponding angles are equal when lines are parallel. The angle is 65°.",
      ["65°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. One angle is 65 degrees; the corresponding angle in the matching position at the other line is marked x.",
        { TR: "65°" },
        { TR: "x" }
      )
    ),
    answer(
      "y8-geo-par-g3",
      "Parallel lines cut by a transversal (chevrons mark the parallels). An alternate angle at one line is 48°. Find the alternate angle x at the other line in degrees.",
      "\\text{alternate angles (Z): equal}",
      "48",
      "Alternate angles are equal when lines are parallel. The angle is 48°.",
      ["48°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. One alternate angle is 48 degrees; the alternate angle (Z-shape) on the opposite side at the other line is marked x.",
        { BR: "48°" },
        { TL: "x" }
      )
    ),
    answer(
      "y8-geo-par-g4",
      "Parallel lines cut by a transversal (chevrons mark the parallels). One co-interior angle is 115°. Find the other co-interior angle x in degrees.",
      "115 + x = 180",
      "65",
      "Co-interior angles sum to 180°. x = 180 − 115 = 65°.",
      ["65°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 115 degrees, the other is marked x.",
        { BR: "x" },
        { TR: "115°" }
      )
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-par-i1",
      "Parallel lines (chevroned). A corresponding angle is 73°. Find the other corresponding angle x in degrees.",
      "\\text{corresponding angles (F): equal}",
      "73",
      "Corresponding angles are equal when lines are parallel. The angle is 73°.",
      ["73°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. A corresponding angle of 73 degrees and its matching corresponding angle x at the other line.",
        { TR: "73°" },
        { TR: "x" }
      )
    ),
    answer(
      "y8-geo-par-i2",
      "Parallel lines (chevroned). One co-interior angle is 54°. Find the other co-interior angle x in degrees.",
      "54 + x = 180",
      "126",
      "Co-interior angles sum to 180°. x = 180 − 54 = 126°.",
      ["126°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 54 degrees, the other is marked x.",
        { BR: "54°" },
        { TR: "x" }
      )
    ),
    choice(
      "y8-geo-par-i3",
      "Co-interior angles between parallel lines are always…",
      "B",
      [
        "Equal in size",
        "Supplementary — they sum to 180°",
        "Complementary — they sum to 90°",
        "Vertically opposite",
      ],
      "Co-interior angles (C-shape) are supplementary: they sum to 180° when lines are parallel."
    ),
    answer(
      "y8-geo-par-i4",
      "Parallel lines (chevroned). An alternate angle at one line is 117°. Find the alternate angle x at the other line in degrees.",
      "\\text{alternate angles (Z): equal}",
      "117",
      "Alternate angles are equal when lines are parallel. The angle is 117°.",
      ["117°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. One alternate angle is 117 degrees; the alternate angle (Z-shape) on the opposite side at the other line is marked x.",
        { BL: "117°" },
        { TR: "x" }
      )
    ),
    answer(
      "y8-geo-par-i5",
      "Parallel lines cut by a transversal (chevroned). Co-interior angles are (3x + 10)° and (2x + 20)°. Find x.",
      "(3x+10) + (2x+20) = 180",
      "30",
      "5x + 30 = 180, so 5x = 150, giving x = 30.",
      ["x = 30"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines, labelled (3x + 10) degrees and (2x + 20) degrees.",
        { BR: "(2x+20)°" },
        { TR: "(3x+10)°" }
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing alternate angles (equal) with co-interior angles (supplementary).",
      fix: "Use the shape as a reminder: Z-angles are equal; C-angles sum to 180°.",
    },
    {
      mistake: "Applying parallel-line angle rules when the lines are not stated to be parallel.",
      fix: "These rules only work when the lines are explicitly parallel. Check the question.",
    },
    {
      mistake: "Treating corresponding angles as supplementary.",
      fix: "Corresponding angles (F-shape) are equal, not supplementary.",
    },
    {
      mistake: "Forgetting to write the reason when finding an unknown angle.",
      fix: "Always state the reason: 'alternate angles', 'corresponding angles', or 'co-interior angles'.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-geo-par-m1",
      "Parallel lines (chevroned). A corresponding angle is 82°. Find the other corresponding angle x in degrees.",
      "\\text{corresponding angles (F): equal}",
      "82",
      "Corresponding angles are equal when lines are parallel.",
      ["82°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. A corresponding angle of 82 degrees and its matching corresponding angle x at the other line.",
        { TR: "82°" },
        { TR: "x" }
      )
    ),
    answer(
      "y8-geo-par-m2",
      "Parallel lines (chevroned). An alternate angle is 35°. Find the other alternate angle x in degrees.",
      "\\text{alternate angles (Z): equal}",
      "35",
      "Alternate angles are equal when lines are parallel.",
      ["35°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. One alternate angle is 35 degrees; the alternate angle (Z-shape) on the opposite side at the other line is marked x.",
        { BR: "35°" },
        { TL: "x" }
      )
    ),
    answer(
      "y8-geo-par-m3",
      "Parallel lines (chevroned). One co-interior angle is 142°. Find the other co-interior angle x in degrees.",
      "142 + x = 180",
      "38",
      "Co-interior angles sum to 180°. x = 180 − 142 = 38°.",
      ["38°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 142 degrees, the other is marked x.",
        { BR: "x" },
        { TR: "142°" }
      )
    ),
    choice(
      "y8-geo-par-m4",
      "Alternate angles are sometimes called Z-angles because…",
      "C",
      [
        "They always measure zero degrees",
        "They are supplementary and form a Z shape",
        "The Z traces the path between angles on opposite sides of the transversal",
        "They only appear in right-angled triangles",
      ],
      "The Z-shape traces the path between the two equal alternate angles on opposite sides of the transversal."
    ),
    answer(
      "y8-geo-par-m5",
      "Parallel lines (chevroned). Corresponding angles are (4x − 20)° and (2x + 40)°. Find x.",
      "4x - 20 = 2x + 40",
      "30",
      "4x − 20 = 2x + 40, so 2x = 60, giving x = 30.",
      ["x = 30"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. A corresponding pair labelled (4x − 20) degrees and (2x + 40) degrees in matching positions at the two lines.",
        { TR: "(4x-20)°" },
        { TR: "(2x+40)°" }
      )
    ),
    answer(
      "y8-geo-par-m6",
      "Parallel lines (chevroned). Alternate angles are (5x + 15)° and (3x + 35)°. Find x.",
      "5x + 15 = 3x + 35",
      "10",
      "5x + 15 = 3x + 35, so 2x = 20, giving x = 10.",
      ["x = 10"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. An alternate pair (Z-shape) on opposite sides of the transversal labelled (5x + 15) degrees and (3x + 35) degrees.",
        { BR: "(5x+15)°" },
        { TL: "(3x+35)°" }
      )
    ),
    choice(
      "y8-geo-par-m7",
      "Which letter shape is associated with corresponding angles?",
      "B",
      [
        "Z",
        "F",
        "C",
        "X",
      ],
      "Corresponding angles sit in the same position at each parallel line and form an F-shape."
    ),
    answer(
      "y8-geo-par-m8",
      "Parallel lines (chevroned). One co-interior angle is 67°. Find the other co-interior angle x in degrees.",
      "67 + x = 180",
      "113",
      "x = 180 − 67 = 113°.",
      ["113°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 67 degrees, the other is marked x.",
        { BR: "67°" },
        { TR: "x" }
      )
    ),
    answer(
      "y8-geo-par-m9",
      "Parallel lines (chevroned). Co-interior angles are x° and 2x°. Find x.",
      "x + 2x = 180",
      "60",
      "3x = 180, so x = 60.",
      ["60°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines, labelled x degrees and 2x degrees.",
        { BR: "x" },
        { TR: "2x" }
      )
    ),
    answer(
      "y8-geo-par-m10",
      "Parallel lines (chevroned). An angle at the first line is 131°. Find the alternate angle x at the second line in degrees.",
      "\\text{alternate angles (Z): equal}",
      "131",
      "Alternate angles are equal when lines are parallel. The angle is 131°.",
      ["131°"],
      undefined,
      undefined,
      transversalFig(
        "Transversal crossing two parallel lines. One angle is 131 degrees; the alternate angle (Z-shape) on the opposite side at the other line is marked x.",
        { BL: "131°" },
        { TR: "x" }
      )
    ),
  ],
};

// ── Lesson 3: Angles in Triangles and Quadrilaterals ──────────────────────────

const anglesTrianglesQuadrilaterals: LessonContent = {
  description:
    "Use the angle sum of triangles (180°) and quadrilaterals (360°), the exterior-angle theorem, and the properties of special quadrilaterals to find unknown angles.",
  learningIntention:
    "Apply the triangle angle sum, the exterior-angle theorem, and the quadrilateral angle sum to calculate unknown angles.",
  successCriteria: [
    "State and apply the angle sum of a triangle: 180°.",
    "Use the exterior angle theorem: exterior angle = sum of the two non-adjacent interior angles.",
    "State and apply the angle sum of a quadrilateral: 360°.",
    "Form and solve equations from angle relationships in triangles and quadrilaterals.",
  ],
  teaching: {
    paragraphs: [
      "The three interior angles of any triangle — fat, thin, or lopsided — always add to exactly $180^\\circ$. This is not a coincidence to memorise; it follows from the parallel-line rules, and seeing why means you will never doubt it.",
      "Here is a hands-on way to feel it first. Draw any triangle, tear off its three corners, and place them side by side so their points meet. The three torn corners always line up flat along a straight edge — and a straight edge is $180^\\circ$. Try it with a wide triangle or a spiky one; the corners still fit a straight line every time.",
      "Now the proof behind the tearing. Through the top vertex of the triangle, draw a line parallel to the base. The base and this new line are parallel, with the two slanted sides acting as transversals. The two base angles reappear at the top vertex as alternate angles (Z-shape, equal), one on each side of the apex angle. So at the apex you now have the three triangle angles sitting in a row along a straight line — and angles on a straight line sum to $180^\\circ$. That is exactly the torn-corner picture, made exact.",
      "An exterior angle is what you get by extending one side of the triangle past a vertex. It equals the sum of the two non-adjacent interior angles — the two corners it is not touching. Why: the exterior angle and the interior angle beside it sit on a straight line, so they sum to $180^\\circ$; and the three interior angles also sum to $180^\\circ$. Both totals are $180^\\circ$, so the exterior angle must equal the leftover two interior angles. It is a shortcut built straight out of the angle sum.",
      "A quadrilateral is any four-sided shape, and its four interior angles always add to $360^\\circ$. The reason is simply two triangles: draw one diagonal and the quadrilateral splits into two triangles. Each triangle carries $180^\\circ$, and together they cover all four corners of the quadrilateral, so the total is $2 \\times 180^\\circ = 360^\\circ$. To find a missing angle, subtract the known angles from $360^\\circ$.",
      "Transfer and the trap: to find an unknown angle, subtract the known angles from the correct total — $180^\\circ$ for a triangle, $360^\\circ$ for a quadrilateral. The common slip is using the wrong total (treating a triangle as $360^\\circ$), so always count the sides first. And as always, do not read an angle off the drawing — a triangle that looks right-angled might not be; use the numbers and the rule.",
    ],
    latexBlocks: [
      "\\text{Triangle angle sum: } \\angle A + \\angle B + \\angle C = 180^\\circ",
      "\\text{Exterior angle} = \\text{sum of the two non-adjacent interior angles}",
      "\\text{Quadrilateral angle sum: } \\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find the third angle of a triangle",
      questionLatex:
        "\\text{A triangle has angles }65^\\circ\\text{ and }72^\\circ.\\text{ Find the third angle.}",
      triangleDiagram: triAngles(
        "Triangle with two given interior angles of 65 degrees and 72 degrees and the third angle unknown.",
        { B: "65°", C: "72°", A: "?" }
      ),
      steps: [
        {
          explanation: "The three angles of any triangle sum to 180°, so write that sum with x for the unknown.",
          latex: "65 + 72 + x = 180 \\quad (\\text{angle sum of a triangle})",
        },
        {
          explanation: "Move the two known angles to the right by subtracting them from 180.",
          latex: "x = 180 - 65 - 72 = 43",
        },
      ],
      finalAnswerLatex: "\\text{The third angle is }43^\\circ.",
    } as WorkedExample,
    {
      title: "Use the exterior angle theorem",
      questionLatex:
        "\\text{An exterior angle of a triangle is }115^\\circ.\\text{ One non-adjacent interior angle is }48^\\circ.\\text{ Find the other.}",
      steps: [
        {
          explanation: "An exterior angle equals the sum of the two interior angles it does not touch, so set 115 equal to their sum.",
          latex: "x + 48 = 115 \\quad (\\text{exterior angle theorem})",
        },
        {
          explanation: "Subtract 48 from both sides to find the missing interior angle.",
          latex: "x = 115 - 48 = 67",
        },
      ],
      finalAnswerLatex: "\\text{The other interior angle is }67^\\circ.",
    } as WorkedExample,
    {
      title: "Find an unknown angle in a quadrilateral",
      questionLatex:
        "\\text{A quadrilateral has angles }85^\\circ,\\;110^\\circ,\\;95^\\circ\\text{ and }x^\\circ.\\text{ Find }x.",
      planeShapeDiagram: quadAngles(
        "Quadrilateral with three given interior angles of 85, 110 and 95 degrees and the fourth angle marked x.",
        ["85°", "110°", "95°", "x"]
      ),
      steps: [
        {
          explanation: "A quadrilateral splits into two triangles, so its four angles sum to 360°.",
          latex: "85 + 110 + 95 + x = 360 \\quad (\\text{angle sum of a quadrilateral})",
        },
        {
          explanation: "Add the three known angles, then subtract that total from 360.",
          latex: "290 + x = 360 \\Rightarrow x = 70",
        },
      ],
      finalAnswerLatex: "x = 70^\\circ.",
    } as WorkedExample,
    {
      title: "Multi-step: exterior angle leading into an isosceles triangle",
      questionLatex:
        "\\text{In triangle }ABC,\\text{ side }BC\\text{ is extended to }D.\\text{ The exterior angle }\\angle ACD = 124^\\circ\\text{ and }AB = AC.\\text{ Find }\\angle BAC.",
      steps: [
        {
          explanation: "The exterior angle equals the sum of the two non-adjacent interior angles, A and B.",
          latex: "\\angle A + \\angle B = 124^\\circ \\quad (\\text{exterior angle theorem})",
        },
        {
          explanation: "Because AB = AC the triangle is isosceles, so the angles opposite the equal sides are equal: ∠B = ∠C.",
          latex: "\\angle B = \\angle C \\quad (\\text{base angles of isosceles triangle})",
        },
        {
          explanation: "The interior angle C and exterior angle ACD lie on the straight line BD, so they are supplementary.",
          latex: "\\angle C = 180 - 124 = 56^\\circ",
        },
        {
          explanation: "Since ∠B equals ∠C, substitute 56° for ∠B into the exterior-angle equation.",
          latex: "\\angle A + 56 = 124",
        },
        {
          explanation: "Subtract 56 from both sides to find the apex angle.",
          latex: "\\angle A = 124 - 56 = 68",
        },
      ],
      finalAnswerLatex: "\\angle BAC = 68^\\circ.",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-geo-tri-g1",
      "Find the third angle x of the triangle in the figure (the other two angles are 65° and 72°), in degrees.",
      "65 + 72 + x = 180",
      "43",
      "x = 180 − 65 − 72 = 43°.",
      ["43°"],
      triAngles(
        "Triangle with interior angles 65 degrees and 72 degrees given and the third angle marked x.",
        { B: "65°", C: "72°", A: "x" }
      )
    ),
    choice(
      "y8-geo-tri-g2",
      "The exterior angle theorem states that an exterior angle of a triangle equals…",
      "C",
      [
        "The supplement of the adjacent interior angle",
        "Half the sum of all three interior angles",
        "The sum of the two non-adjacent interior angles",
        "180° minus the largest interior angle",
      ],
      "An exterior angle equals the sum of the two interior angles that it is NOT adjacent to."
    ),
    answer(
      "y8-geo-tri-g3",
      "A quadrilateral has angles 85°, 110°, 95°, and x° as shown. Find x.",
      "85 + 110 + 95 + x = 360",
      "70",
      "85 + 110 + 95 = 290. x = 360 − 290 = 70°.",
      ["70°"],
      undefined,
      quadAngles(
        "Quadrilateral with three given interior angles 85, 110 and 95 degrees and the fourth angle marked x.",
        ["85°", "110°", "95°", "x"]
      )
    ),
    answer(
      "y8-geo-tri-g4",
      "An exterior angle of a triangle is 115°. One non-adjacent interior angle is 48°. Find the other non-adjacent interior angle in degrees.",
      "x + 48 = 115",
      "67",
      "x = 115 − 48 = 67°.",
      ["67°"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-tri-i1",
      "An isosceles triangle has two base angles each of 52° as shown. Find the apex angle x in degrees.",
      "52 + 52 + x = 180",
      "76",
      "52 + 52 = 104. x = 180 − 104 = 76°.",
      ["76°"],
      triAngles(
        "Isosceles triangle with the two equal base angles each 52 degrees and the apex angle marked x.",
        { B: "52°", C: "52°", A: "x" }
      )
    ),
    answer(
      "y8-geo-tri-i2",
      "An exterior angle of a triangle is 132°. One non-adjacent interior angle is 55°. Find the other non-adjacent interior angle in degrees.",
      "x + 55 = 132",
      "77",
      "x = 132 − 55 = 77°.",
      ["77°"]
    ),
    choice(
      "y8-geo-tri-i3",
      "The interior angle sum of any quadrilateral is…",
      "B",
      [
        "180°",
        "360°",
        "540°",
        "720°",
      ],
      "A quadrilateral can be split into two triangles, so its angle sum is 2 × 180° = 360°."
    ),
    answer(
      "y8-geo-tri-i4",
      "A quadrilateral has three angles: 70°, 95°, and 115° as shown. Find the fourth angle x in degrees.",
      "70 + 95 + 115 + x = 360",
      "80",
      "70 + 95 + 115 = 280. x = 360 − 280 = 80°.",
      ["80°"],
      undefined,
      quadAngles(
        "Quadrilateral with three given interior angles 70, 95 and 115 degrees and the fourth angle marked x.",
        ["70°", "95°", "115°", "x"]
      )
    ),
    answer(
      "y8-geo-tri-i5",
      "A right-angled triangle has one acute angle of 37° as shown. Find the other acute angle x in degrees.",
      "90 + 37 + x = 180",
      "53",
      "x = 180 − 90 − 37 = 53°.",
      ["53°"],
      triRight(
        "Right-angled triangle with the right angle marked, one acute angle 37 degrees, and the other acute angle marked x.",
        { C: "37°", A: "x" },
        "B"
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using 360° as the angle sum of a triangle.",
      fix: "A triangle has three angles summing to 180°. Only a quadrilateral sums to 360°.",
    },
    {
      mistake: "Using the adjacent interior angle instead of the two non-adjacent ones for the exterior angle theorem.",
      fix: "The exterior angle equals the sum of the two interior angles that are NOT next to it.",
    },
    {
      mistake: "Applying the triangle angle sum to a quadrilateral.",
      fix: "A quadrilateral has four angles summing to 360°. A triangle sums to 180°.",
    },
    {
      mistake: "Forgetting that an equilateral triangle has all angles equal to 60°.",
      fix: "In an equilateral triangle, all three sides and all three angles are equal: 180° ÷ 3 = 60°.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-geo-tri-m1",
      "Find the third angle x of the triangle in the figure (the other two are 54° and 78°), in degrees.",
      "54 + 78 + x = 180",
      "48",
      "x = 180 − 54 − 78 = 48°.",
      ["48°"],
      triAngles(
        "Triangle with interior angles 54 degrees and 78 degrees given and the third angle marked x.",
        { B: "54°", C: "78°", A: "x" }
      )
    ),
    answer(
      "y8-geo-tri-m2",
      "An exterior angle is 108°. One non-adjacent interior angle is 43°. Find the other in degrees.",
      "x + 43 = 108",
      "65",
      "x = 108 − 43 = 65°.",
      ["65°"]
    ),
    choice(
      "y8-geo-tri-m3",
      "Which rule relates an exterior angle of a triangle to the interior angles?",
      "D",
      [
        "It equals the adjacent interior angle.",
        "It equals 180° minus all three interior angles.",
        "It equals the largest interior angle.",
        "It equals the sum of the two non-adjacent interior angles.",
      ],
      "Exterior angle = sum of the two non-adjacent (remote) interior angles."
    ),
    answer(
      "y8-geo-tri-m4",
      "A quadrilateral has angles 100°, 85°, 75°, and x° as shown. Find x.",
      "100 + 85 + 75 + x = 360",
      "100",
      "100 + 85 + 75 = 260. x = 360 − 260 = 100°.",
      ["100°"],
      undefined,
      quadAngles(
        "Quadrilateral with three given interior angles 100, 85 and 75 degrees and the fourth angle marked x.",
        ["100°", "85°", "75°", "x"]
      )
    ),
    answer(
      "y8-geo-tri-m5",
      "State each interior angle of an equilateral triangle in degrees.",
      "\\frac{180}{3} = 60",
      "60",
      "All three angles are equal: 180° ÷ 3 = 60°.",
      ["60°"]
    ),
    answer(
      "y8-geo-tri-m6",
      "A right-angled triangle has one acute angle of 27° as shown. Find the other acute angle x in degrees.",
      "90 + 27 + x = 180",
      "63",
      "x = 180 − 90 − 27 = 63°.",
      ["63°"],
      triRight(
        "Right-angled triangle with the right angle marked, one acute angle 27 degrees, and the other acute angle marked x.",
        { C: "27°", A: "x" },
        "B"
      )
    ),
    choice(
      "y8-geo-tri-m7",
      "A triangle has an obtuse angle of 130°. What can be said about the other two angles?",
      "A",
      [
        "They are both acute and their sum is 50°.",
        "One of them must also be obtuse.",
        "They must each equal 25°.",
        "They sum to 180°.",
      ],
      "130 + remaining = 180, so the remaining two angles sum to 50°. Both must be acute."
    ),
    answer(
      "y8-geo-tri-m8",
      "A quadrilateral has angles x°, 2x°, 3x°, and 4x° as shown. Find x.",
      "x + 2x + 3x + 4x = 360",
      "36",
      "10x = 360, so x = 36.",
      ["36°"],
      undefined,
      quadAngles(
        "Quadrilateral with the four interior angles labelled x, 2x, 3x and 4x degrees.",
        ["x", "2x", "3x", "4x"]
      )
    ),
    answer(
      "y8-geo-tri-m9",
      "A triangle has two equal angles of 35° as shown. Find the third angle x in degrees.",
      "35 + 35 + x = 180",
      "110",
      "x = 180 − 35 − 35 = 110°.",
      ["110°"],
      triAngles(
        "Isosceles triangle with two equal angles of 35 degrees and the third angle marked x.",
        { B: "35°", C: "35°", A: "x" }
      )
    ),
    answer(
      "y8-geo-tri-m10",
      "An exterior angle of a triangle is 95°. One non-adjacent interior angle is 48°. Find the other in degrees.",
      "x + 48 = 95",
      "47",
      "x = 95 − 48 = 47°.",
      ["47°"]
    ),
  ],
};

// ── Lesson 4: Properties of Polygons ─────────────────────────────────────────

const propertiesOfPolygons: LessonContent = {
  description:
    "Calculate interior angle sums and individual angles of regular and irregular polygons using the formula (n − 2) × 180°, and use the exterior angle sum of 360°.",
  learningIntention:
    "Use the interior angle sum formula and the exterior angle sum to find angles in polygons.",
  successCriteria: [
    "State the interior angle sum formula: (n − 2) × 180°.",
    "Calculate the interior angle sum for any polygon given its number of sides.",
    "Find each interior angle of a regular polygon.",
    "Apply the exterior angle sum of 360° to find the number of sides of a regular polygon.",
  ],
  teaching: {
    paragraphs: [
      "A polygon is a closed shape made of straight sides — a pentagon has 5, a hexagon 6, and so on. We already know a triangle's angles add to $180^\\circ$ and a quadrilateral's to $360^\\circ$. This lesson finds the angle sum for a shape with any number of sides, $n$, using one trick: cut it into triangles.",
      "Pick any one corner of the polygon and draw straight diagonals from it to every other corner. This fans the whole shape into triangles with no overlaps and no gaps. Count them: a quadrilateral (4 sides) gives 2 triangles, a pentagon (5 sides) gives 3, a hexagon (6 sides) gives 4. The pattern is always two fewer triangles than there are sides, because the corner you started from and its two neighbours do not each begin a new triangle.",
      "So an $n$-sided polygon splits into $(n-2)$ triangles. Every triangle contributes $180^\\circ$, and those triangle angles together make up exactly the polygon's interior angles, so the interior angle sum is $(n-2) \\times 180^\\circ$. Check it: for $n = 4$ this gives $2 \\times 180^\\circ = 360^\\circ$, matching the quadrilateral; for $n = 3$ it gives $180^\\circ$, matching the triangle.",
      "A regular polygon is one where all sides are equal and all interior angles are equal. Since the angles are all the same size and there are $n$ of them, each interior angle is the total shared equally: divide the angle sum by $n$. For a regular hexagon that is $720^\\circ \\div 6 = 120^\\circ$ per corner.",
      "There is also a beautifully simple rule for exterior angles. An exterior angle is the turn you make at each corner as you walk once around the polygon's edge. Walking the whole way around brings you back facing the original direction — one full turn — so the exterior angles always add to $360^\\circ$, no matter how many sides the polygon has. For a regular polygon the turns are equal, so each exterior angle is $360^\\circ \\div n$.",
      "At any single corner, the interior and exterior angles together form a straight line, so they are supplementary and sum to $180^\\circ$. This gives a fast route to the number of sides: if you know one exterior angle of a regular polygon, then $n = 360^\\circ \\div (\\text{exterior angle})$. A frequent mistake is dividing the interior sum by $(n-2)$ instead of $n$ — remember you divide by the number of angles, which equals the number of sides. And do not estimate the polygon's shape from a drawing; use the side count and the formula.",
    ],
    latexBlocks: [
      "\\text{Interior angle sum} = (n-2) \\times 180^\\circ",
      "\\text{Each interior angle (regular)} = \\frac{(n-2) \\times 180^\\circ}{n}",
      "\\text{Sum of exterior angles} = 360^\\circ \\qquad \\text{each exterior angle (regular)} = \\frac{360^\\circ}{n}",
      "\\text{interior} + \\text{exterior} = 180^\\circ \\text{ at each vertex}",
    ],
  },
  workedExamples: [
    {
      title: "Interior angle sum of a hexagon",
      questionLatex: "\\text{Find the interior angle sum of a hexagon (6 sides).}",
      steps: [
        {
          explanation: "A hexagon fans into 6 − 2 = 4 triangles from one corner, so use (n − 2) × 180° with n = 6.",
          latex: "(6-2) \\times 180",
        },
        {
          explanation: "Work out the bracket, then multiply by 180.",
          latex: "= 4 \\times 180 = 720",
        },
      ],
      finalAnswerLatex: "\\text{The interior angles sum to }720^\\circ.",
    } as WorkedExample,
    {
      title: "Each interior angle of a regular octagon",
      questionLatex: "\\text{Find each interior angle of a regular octagon (8 sides).}",
      steps: [
        {
          explanation: "First find the total of all interior angles using (n − 2) × 180° with n = 8.",
          latex: "(8-2) \\times 180 = 1080^\\circ",
        },
        {
          explanation: "A regular octagon has 8 equal angles, so share the total equally by dividing by 8.",
          latex: "\\frac{1080}{8} = 135",
        },
      ],
      finalAnswerLatex: "\\text{Each interior angle is }135^\\circ.",
    } as WorkedExample,
    {
      title: "Find the number of sides from an exterior angle",
      questionLatex:
        "\\text{A regular polygon has each exterior angle equal to }40^\\circ.\\text{ How many sides does it have?}",
      steps: [
        {
          explanation: "The exterior angles of any polygon sum to 360°, and a regular polygon's are all equal, so the count of sides is 360 divided by one exterior angle.",
          latex: "n = \\frac{360}{40}",
        },
        {
          explanation: "Carry out the division to get the number of sides.",
          latex: "n = 9",
        },
      ],
      finalAnswerLatex: "\\text{It has }9\\text{ sides (a nonagon).}",
    } as WorkedExample,
    {
      title: "Multi-step: find the number of sides from one interior angle",
      questionLatex:
        "\\text{Each interior angle of a regular polygon is }156^\\circ.\\text{ How many sides does it have?}",
      steps: [
        {
          explanation: "At each vertex the interior and exterior angles are supplementary, so subtract from 180° to get the exterior angle.",
          latex: "\\text{exterior angle} = 180 - 156 = 24^\\circ",
        },
        {
          explanation: "The exterior angles of a regular polygon sum to 360° and are equal, so divide 360 by one exterior angle.",
          latex: "n = \\frac{360}{24}",
        },
        {
          explanation: "Carry out the division to find the number of sides.",
          latex: "n = 15",
        },
        {
          explanation: "Check with the interior formula: (15 − 2) × 180 ÷ 15 should return 156.",
          latex: "\\frac{13 \\times 180}{15} = \\frac{2340}{15} = 156 \\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{The polygon has }15\\text{ sides.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-geo-pol-g1",
      "Find the interior angle sum of a hexagon (6 sides).",
      "(6-2) \\times 180",
      "720",
      "(6 − 2) × 180 = 4 × 180 = 720°.",
      ["720°"]
    ),
    answer(
      "y8-geo-pol-g2",
      "Find each interior angle of a regular hexagon in degrees.",
      "\\frac{720}{6}",
      "120",
      "720° ÷ 6 = 120°.",
      ["120°"]
    ),
    answer(
      "y8-geo-pol-g3",
      "Find each exterior angle of a regular octagon (8 sides) in degrees.",
      "\\frac{360}{8}",
      "45",
      "360° ÷ 8 = 45°.",
      ["45°"]
    ),
    choice(
      "y8-geo-pol-g4",
      "The sum of the exterior angles of any convex polygon is always…",
      "B",
      [
        "180°",
        "360°",
        "(n − 2) × 180°",
        "Depends on the number of sides",
      ],
      "The exterior angles of any convex polygon sum to exactly 360°."
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-pol-i1",
      "Find the interior angle sum of a pentagon (5 sides).",
      "(5-2) \\times 180",
      "540",
      "(5 − 2) × 180 = 3 × 180 = 540°.",
      ["540°"]
    ),
    answer(
      "y8-geo-pol-i2",
      "Find each interior angle of a regular pentagon in degrees.",
      "\\frac{540}{5}",
      "108",
      "540° ÷ 5 = 108°.",
      ["108°"]
    ),
    answer(
      "y8-geo-pol-i3",
      "Find the interior angle sum of a decagon (10 sides).",
      "(10-2) \\times 180",
      "1440",
      "(10 − 2) × 180 = 8 × 180 = 1440°.",
      ["1440°"]
    ),
    answer(
      "y8-geo-pol-i4",
      "A regular polygon has each interior angle of 140°. How many sides does it have?",
      "\\frac{(n-2) \\times 180}{n} = 140",
      "9",
      "(n−2)×180 = 140n → 180n−360 = 140n → 40n = 360 → n = 9."
    ),
    choice(
      "y8-geo-pol-i5",
      "Which formula gives the interior angle sum of an n-sided polygon?",
      "C",
      [
        "(n-1) \\times 180^\\circ",
        "n \\times 180^\\circ",
        "(n-2) \\times 180^\\circ",
        "(n+2) \\times 180^\\circ",
      ],
      "Dividing a polygon into triangles from one vertex gives (n − 2) triangles, each contributing 180°.",
      "\\text{Choose the correct formula.}"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using (n − 1) × 180° instead of (n − 2) × 180°.",
      fix: "Dividing a polygon into triangles from one vertex gives n − 2 triangles (not n − 1).",
    },
    {
      mistake: "Dividing the angle sum by n − 2 instead of n to find each angle of a regular polygon.",
      fix: "Divide the interior angle sum by n (the number of sides, which equals the number of angles).",
    },
    {
      mistake: "Thinking the exterior angle sum changes with the number of sides.",
      fix: "The exterior angle sum of any convex polygon is always 360°.",
    },
    {
      mistake: "Confusing interior and exterior angles at a vertex.",
      fix: "At each vertex, the interior and exterior angles are supplementary: they sum to 180°.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-geo-pol-m1",
      "Find the interior angle sum of a heptagon (7 sides).",
      "(7-2) \\times 180",
      "900",
      "(7 − 2) × 180 = 5 × 180 = 900°.",
      ["900°"]
    ),
    answer(
      "y8-geo-pol-m2",
      "Find each interior angle of a regular 12-sided polygon (dodecagon).",
      "\\frac{(12-2) \\times 180}{12}",
      "150",
      "(12 − 2) × 180 = 1800. 1800 ÷ 12 = 150°.",
      ["150°"]
    ),
    answer(
      "y8-geo-pol-m3",
      "Find each exterior angle of a regular hexagon in degrees.",
      "\\frac{360}{6}",
      "60",
      "360° ÷ 6 = 60°.",
      ["60°"]
    ),
    choice(
      "y8-geo-pol-m4",
      "A regular polygon has each exterior angle of 30°. How many sides does it have?",
      "B",
      [
        "10",
        "12",
        "15",
        "30",
      ],
      "n = 360 ÷ 30 = 12 sides."
    ),
    answer(
      "y8-geo-pol-m5",
      "Find the interior angle sum of a 12-sided polygon.",
      "(12-2) \\times 180",
      "1800",
      "(12 − 2) × 180 = 10 × 180 = 1800°.",
      ["1800°"]
    ),
    answer(
      "y8-geo-pol-m6",
      "A regular polygon has each interior angle of 108°. How many sides?",
      "\\frac{(n-2)\\times180}{n} = 108",
      "5",
      "108n = (n−2)×180 → 108n = 180n−360 → 72n = 360 → n = 5 (pentagon)."
    ),
    answer(
      "y8-geo-pol-m7",
      "Find each exterior angle of an equilateral triangle (3 sides) in degrees.",
      "\\frac{360}{3}",
      "120",
      "360° ÷ 3 = 120°.",
      ["120°"]
    ),
    choice(
      "y8-geo-pol-m8",
      "The sum of all exterior angles for any convex polygon equals…",
      "A",
      [
        "360°",
        "180°",
        "(n − 2) × 180°",
        "Varies with n",
      ],
      "The exterior angle sum is always 360° for any convex polygon."
    ),
    answer(
      "y8-geo-pol-m9",
      "Find the interior angle sum of a 9-sided polygon.",
      "(9-2) \\times 180",
      "1260",
      "(9 − 2) × 180 = 7 × 180 = 1260°.",
      ["1260°"]
    ),
    answer(
      "y8-geo-pol-m10",
      "A regular polygon has 20 sides. Find each interior angle in degrees.",
      "\\frac{(20-2) \\times 180}{20}",
      "162",
      "(20 − 2) × 180 = 3240. 3240 ÷ 20 = 162°.",
      ["162°"]
    ),
  ],
};

// ── Lesson 5: Congruent Triangles ─────────────────────────────────────────────

const congruentTriangles: LessonContent = {
  description:
    "Identify congruent triangles using the four tests SSS, SAS, AAS and RHS, match corresponding elements, and use congruence to find unknown sides and angles.",
  learningIntention:
    "Apply the four congruence tests to determine whether triangles are congruent and justify the answer.",
  successCriteria: [
    "State and apply the four congruence tests: SSS, SAS, AAS, and RHS.",
    "Identify the included angle for the SAS test.",
    "Match corresponding sides and angles in a congruence statement.",
    "Explain why AAA is not a sufficient congruence test.",
  ],
  teaching: {
    paragraphs: [
      "Two triangles are congruent if they are identical twins — the same shape and the same size. You could slide, turn, or flip one and it would land exactly on top of the other, every side and every angle matching. The useful question is: how much do you need to know about two triangles before you can be certain they are congruent, without checking all six measurements (three sides, three angles)?",
      "The answer is that the right three pieces of information lock a triangle's shape completely. Think of building a triangle from three given sticks for the sides: there is only one triangle you can make (up to flipping it). You cannot stretch or squash it — the three lengths force the three angles. That is the idea behind the tests below; each names a set of three matching facts that leaves no freedom.",
      "SSS (Side-Side-Side): all three pairs of corresponding sides are equal. Three fixed side lengths can form only one triangle, so the triangles must be congruent. SAS (Side-Angle-Side): two pairs of sides and the angle between them (the included angle) are equal. Once two sides and the angle wedged between them are fixed, the third side is pinned down where their ends meet — only one triangle fits.",
      "AAS (Angle-Angle-Side): two pairs of angles and one pair of corresponding sides are equal. If two angles match, the third must too (they sum to $180^\\circ$), so the triangles have the same shape; the one equal side then fixes the size, forcing congruence. RHS (Right angle-Hypotenuse-Side): both have a right angle, equal hypotenuses, and one more equal side. By Pythagoras the remaining side is forced as well, so all three sides match and the triangles are congruent — this is really SSS in disguise for right-angled triangles.",
      "Watch the SAS trap: the angle must be the included one, sitting between the two equal sides. If the angle is somewhere else (the 'SSA' arrangement), the two sides can swing to make two different triangles, so it does not guarantee congruence. That is exactly why SAS is a test and SSA is not.",
      "Finally, AAA (three equal angles) does NOT prove congruence. Equal angles fix the shape but not the size — a small triangle and a giant triangle can have identical angles, like a photo and its enlargement. Equal angles only give similar triangles. To prove congruence you must include at least one pair of equal sides. When you do use a test, name it, and match corresponding vertices in the right order: in $\\triangle ABC \\cong \\triangle DEF$, $A$ pairs with $D$, $B$ with $E$, $C$ with $F$.",
    ],
    latexBlocks: [
      "\\text{SSS: all three pairs of sides equal}",
      "\\text{SAS: two sides and the included angle equal}",
      "\\text{AAS: two angles and one corresponding side equal}",
      "\\text{RHS: right angle, hypotenuse, and one other side equal} \\quad (\\text{AAA proves similarity only})",
    ],
  },
  workedExamples: [
    {
      title: "Identify the congruence test: SSS",
      questionLatex:
        "\\text{Triangle }ABC\\text{ has }AB=5,\\;BC=7,\\;CA=9.\\text{ Triangle }DEF\\text{ has }DE=5,\\;EF=7,\\;FD=9.\\text{ Are they congruent?}",
      steps: [
        {
          explanation: "Match corresponding sides and check they are equal in pairs.",
          latex: "AB=DE=5,\\quad BC=EF=7,\\quad CA=FD=9",
        },
        {
          explanation: "All three pairs of sides match, and three fixed sides build only one triangle, so the SSS test applies.",
          latex: "\\triangle ABC \\cong \\triangle DEF \\quad (\\text{SSS})",
        },
      ],
      finalAnswerLatex: "\\text{Yes — congruent by SSS.}",
    } as WorkedExample,
    {
      title: "Identify the congruence test: RHS",
      questionLatex:
        "\\text{Both triangles have a right angle. Their hypotenuses are each }13\\text{ cm and one other side is }5\\text{ cm each. Congruent?}",
      steps: [
        {
          explanation: "List the matching facts: a right angle in each, equal hypotenuses, and one more equal side.",
          latex: "\\text{right angle, hypotenuse } 13, \\text{ side } 5",
        },
        {
          explanation: "Right angle + hypotenuse + a matching side is exactly the RHS test (Pythagoras forces the third side too).",
          latex: "\\triangle \\cong \\triangle \\quad (\\text{RHS})",
        },
      ],
      finalAnswerLatex: "\\text{Yes — congruent by RHS.}",
    } as WorkedExample,
    {
      title: "Find an unknown angle using congruence",
      questionLatex:
        "\\text{In }\\triangle ABC \\cong \\triangle PQR,\\text{ angle }B = 55^\\circ\\text{ and angle }C = 65^\\circ.\\text{ Find angle }P.",
      triangleDiagram: triAngles(
        "Triangle ABC with angle B = 55 degrees, angle C = 65 degrees and angle A unknown; it is congruent to triangle PQR, so angle P equals angle A.",
        { A: "?", B: "55°", C: "65°" }
      ),
      steps: [
        {
          explanation: "First find angle A inside triangle ABC using the angle sum of a triangle.",
          latex: "\\angle A = 180 - 55 - 65 = 60^\\circ",
        },
        {
          explanation: "The congruence statement pairs A with P, and corresponding angles of congruent triangles are equal.",
          latex: "\\angle P = \\angle A = 60^\\circ",
        },
      ],
      finalAnswerLatex: "\\angle P = 60^\\circ.",
    } as WorkedExample,
    {
      title: "Multi-step: prove a midpoint splits a triangle into congruent halves",
      questionLatex:
        "\\text{In }\\triangle ABC,\\; AB = AC\\text{ and }M\\text{ is the midpoint of }BC.\\text{ Show }\\triangle ABM \\cong \\triangle ACM.",
      steps: [
        {
          explanation: "AB = AC is given — that is the first pair of equal sides.",
          latex: "AB = AC \\quad (\\text{given})",
        },
        {
          explanation: "M is the midpoint of BC, so it cuts BC into two equal halves — a second pair of equal sides.",
          latex: "BM = CM \\quad (\\text{M is the midpoint})",
        },
        {
          explanation: "AM is shared by both triangles, so it equals itself — the third pair of equal sides.",
          latex: "AM = AM \\quad (\\text{common side})",
        },
        {
          explanation: "Three pairs of equal sides match, so the SSS test gives congruence.",
          latex: "\\triangle ABM \\cong \\triangle ACM \\quad (\\text{SSS})",
        },
      ],
      finalAnswerLatex: "\\triangle ABM \\cong \\triangle ACM \\text{ by SSS.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-geo-con-g1",
      "Which congruence test uses two sides and the angle between them?",
      "B",
      [
        "SSS",
        "SAS",
        "AAS",
        "RHS",
      ],
      "SAS = Side, Angle, Side. The angle must be between (included by) the two equal sides."
    ),
    choice(
      "y8-geo-con-g2",
      "Triangle ABC: AB = 5 cm, BC = 7 cm, CA = 9 cm. Triangle DEF: DE = 5 cm, EF = 7 cm, FD = 9 cm. Which test proves congruence?",
      "C",
      [
        "AAS",
        "RHS",
        "SSS",
        "SAS",
      ],
      "Three pairs of equal sides → SSS."
    ),
    answer(
      "y8-geo-con-g3",
      "Name the congruence test: right angle, hypotenuse equal, one other side equal.",
      "\\text{right angle + hypotenuse + one side}",
      "RHS",
      "RHS = Right angle, Hypotenuse, Side.",
      ["rhs"]
    ),
    choice(
      "y8-geo-con-g4",
      "For the AAS test you need two pairs of equal angles and…",
      "C",
      [
        "The hypotenuse",
        "All three sides",
        "One pair of corresponding equal sides",
        "No side information",
      ],
      "AAS = Angle, Angle, corresponding Side (the side does not have to be included between the angles)."
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-con-i1",
      "In triangles PQR and XYZ: PQ = XY, QR = YZ, PR = XZ. Name the congruence test.",
      "\\text{three pairs of equal sides}",
      "SSS",
      "Three pairs of equal sides → SSS.",
      ["sss"]
    ),
    answer(
      "y8-geo-con-i2",
      "Two right-angled triangles have equal hypotenuses and one other equal side. Name the congruence test.",
      "\\text{right angle + hypotenuse + one side}",
      "RHS",
      "RHS = Right angle, Hypotenuse, Side.",
      ["rhs"]
    ),
    choice(
      "y8-geo-con-i3",
      "The SAS test requires the equal angle to be…",
      "A",
      [
        "Between the two equal sides (the included angle)",
        "Opposite the longer of the two sides",
        "At any position in the triangle",
        "A right angle",
      ],
      "SAS requires the included angle — it must be the angle formed between the two equal sides."
    ),
    answer(
      "y8-geo-con-i4",
      "Two triangles share two equal angles and one pair of corresponding equal sides. Name the congruence test.",
      "\\text{two angles + corresponding side}",
      "AAS",
      "Two equal angles and a corresponding side → AAS.",
      ["aas"]
    ),
    choice(
      "y8-geo-con-i5",
      "Which of the following is NOT a valid congruence test for triangles?",
      "C",
      [
        "SSS",
        "SAS",
        "AAA",
        "RHS",
      ],
      "AAA proves similarity (equal angles, same shape) but not congruence (equal size). Triangles can have identical angles but different sizes."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using AAA as a congruence test.",
      fix: "Three equal angles only guarantee similarity. You need at least one pair of equal sides to prove congruence.",
    },
    {
      mistake: "Using SAS with a non-included angle (SSA).",
      fix: "In SAS, the angle must be included — it must sit between the two equal sides.",
    },
    {
      mistake: "Listing corresponding parts in the wrong order in a congruence statement.",
      fix: "In △ABC ≅ △DEF, vertex A corresponds to D, B to E, and C to F. Keep the order consistent.",
    },
    {
      mistake: "Confusing congruence with similarity.",
      fix: "Congruent triangles are identical in size and shape. Similar triangles have the same shape but may differ in size.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-geo-con-m1",
      "Three pairs of corresponding sides are equal. Name the congruence test.",
      "\\text{three equal sides}",
      "SSS",
      "Three equal sides → SSS.",
      ["sss"]
    ),
    answer(
      "y8-geo-con-m2",
      "Two pairs of corresponding sides and the included angle are equal. Name the test.",
      "\\text{two sides + included angle}",
      "SAS",
      "Two sides and the included angle → SAS.",
      ["sas"]
    ),
    answer(
      "y8-geo-con-m3",
      "Two pairs of corresponding angles and one pair of corresponding sides are equal. Name the test.",
      "\\text{two angles + corresponding side}",
      "AAS",
      "Two equal angles and a corresponding side → AAS.",
      ["aas"]
    ),
    answer(
      "y8-geo-con-m4",
      "Both triangles have a right angle, and the hypotenuse and one other side are equal. Name the test.",
      "\\text{right angle + hypotenuse + side}",
      "RHS",
      "Right angle, Hypotenuse, Side → RHS.",
      ["rhs"]
    ),
    choice(
      "y8-geo-con-m5",
      "In △ABC ≅ △DEF, vertex A corresponds to D and B to E. What does side AC correspond to?",
      "C",
      [
        "EF",
        "DE",
        "DF",
        "FE",
      ],
      "A↔D and C↔F in the congruence statement, so AC corresponds to DF."
    ),
    choice(
      "y8-geo-con-m6",
      "Why is the angle in SAS called the 'included' angle?",
      "B",
      [
        "It is the largest angle in the triangle",
        "It is formed between the two equal sides",
        "It must be greater than 90°",
        "It is the same in all triangles",
      ],
      "In SAS, the angle is 'included' because it sits between (is formed by) the two equal sides."
    ),
    answer(
      "y8-geo-con-m7",
      "Two right-angled triangles have hypotenuse 10 cm and one other side 6 cm each. Are they congruent? Enter yes or no.",
      "\\text{RHS: hypotenuse }10\\text{ cm, side }6\\text{ cm}",
      "yes",
      "Right angle + hypotenuse 10 cm + side 6 cm satisfies the RHS test. They are congruent.",
      ["Yes", "YES"]
    ),
    choice(
      "y8-geo-con-m8",
      "Why is AAA not a valid congruence test?",
      "B",
      [
        "Three angles are always the same in all triangles",
        "Triangles with equal angles can be different sizes",
        "Angles cannot be measured precisely",
        "AAA only works for right-angled triangles",
      ],
      "Equal angles only guarantee similar triangles. Without a side, the triangles could be any size."
    ),
    answer(
      "y8-geo-con-m9",
      "In △ABC ≅ △PQR (triangle ABC shown), angle B = 55° and angle C = 65°. Find angle P in degrees.",
      "\\angle A = 180 - 55 - 65 = 60^\\circ,\\quad \\angle P = \\angle A",
      "60",
      "Angle A = 180 − 55 − 65 = 60°. A corresponds to P in the congruence statement, so angle P = 60°.",
      ["60°"],
      triAngles(
        "Triangle ABC with angle B = 55 degrees, angle C = 65 degrees and angle A unknown; congruent to triangle PQR so angle P equals angle A.",
        { A: "?", B: "55°", C: "65°" }
      )
    ),
    choice(
      "y8-geo-con-m10",
      "Which test requires the angle to be specifically between the two equal sides?",
      "D",
      [
        "SSS",
        "AAS",
        "RHS",
        "SAS",
      ],
      "In SAS, the 'A' is the included angle — it must sit between the two matching sides."
    ),
  ],
};

// ── Lesson 6: Geometric Reasoning ─────────────────────────────────────────────

const geometricReasoning: LessonContent = {
  description:
    "Solve multi-step angle problems combining parallel lines, triangle angle sums, polygon rules and vertically opposite angles, and write a correct geometric reason for each step.",
  learningIntention:
    "Solve multi-step geometry problems and give a valid reason for each angle found.",
  successCriteria: [
    "Select the correct angle rule for each step in a multi-step problem.",
    "Write a valid geometric reason such as 'corresponding angles, AB ∥ CD' or 'angle sum of a triangle'.",
    "Form and solve equations using combinations of angle rules.",
    "Check that all angle constraints are satisfied in the final answer.",
  ],
  teaching: {
    paragraphs: [
      "Most real geometry questions cannot be solved in a single step. You are given a couple of angles and asked for one far across the diagram, and you reach it by finding stepping-stone angles in between — each one unlocking the next. This lesson is about chaining the rules you already know: angles on a line, vertically opposite, the parallel-line trio (corresponding, alternate, co-interior), and the triangle and polygon angle sums.",
      "The method is always the same. Look at the diagram and ask which single rule connects something you know to something new. Find that one angle, then repeat: the angle you just found becomes 'known' and feeds the next step. Work outwards from the given numbers like stepping stones across a stream — never try to leap straight to the final angle.",
      "Every step must carry a reason, not just a number, because in geometry the justification is the mathematics. A complete reason names the rule and, where relevant, the lines or shape: '$\\angle x = 65^\\circ$, alternate angles, $AB \\parallel CD$' or '$\\angle y = 70^\\circ$, angle sum of a triangle'. In an exam, an unjustified correct number earns far less than a justified one — examiners mark the reasoning.",
      "When a step involves a pronumeral, turn the rule into an equation. For instance, if two angles are co-interior, write their sum equal to $180^\\circ$; if they are corresponding, set them equal. Then solve for the variable. The rule tells you which equation to write — pick the equation by the geometry, not by guessing.",
      "A vital habit: after solving for the variable, substitute it back to find the actual angle the question asked for. Finding $x = 30$ is not the answer if the question wants angle $A = 2x = 60^\\circ$. Then sanity-check the whole figure — do your angles obey every rule, e.g. do the three triangle angles really total $180^\\circ$? If a check fails, a step went wrong.",
      "The biggest trap in multi-step work is trusting the picture. Diagrams are routinely not to scale, so an angle that looks equal to another, or looks like a right angle, may not be. Only use a fact if it is given, marked, or proven by a rule — never because it 'looks that way'. Reasoning, not appearance, is what carries you safely from the given angles to the answer.",
    ],
    latexBlocks: [
      "\\text{Step 1: choose the rule that links a known angle to a new one}",
      "\\text{Step 2: write it as an equation or a direct value}",
      "\\text{Step 3: solve, state the reason, then substitute back and check}",
    ],
  },
  workedExamples: [
    {
      title: "Co-interior angles on parallel lines",
      questionLatex:
        "\\text{Parallel lines }AB \\parallel CD.\\text{ A transversal crosses both. The co-interior angle at }A\\text{ is }70^\\circ.\\text{ Find the co-interior angle at }C.",
      planeShapeDiagram: parallelAnglesShape(
        "Transversal crossing two parallel lines AB and CD (chevroned). The co-interior angle at A is 70 degrees and the co-interior angle at C on the same side is unknown.",
        { bottomRight: "70°", topRight: "?" }
      ),
      steps: [
        {
          explanation: "The two angles are co-interior between the parallel lines, so they sum to 180°.",
          latex: "70 + \\angle C = 180 \\quad (\\text{co-interior angles, } AB \\parallel CD)",
        },
        {
          explanation: "Subtract 70 from both sides to find the angle at C.",
          latex: "\\angle C = 180 - 70 = 110^\\circ",
        },
      ],
      finalAnswerLatex: "\\angle C = 110^\\circ \\text{ (co-interior angles, }AB \\parallel CD\\text{)}.",
    } as WorkedExample,
    {
      title: "Triangle with an algebraic angle",
      questionLatex:
        "\\text{Triangle: angles are }x^\\circ,\\;(x+30)^\\circ,\\text{ and }(x+60)^\\circ.\\text{ Find }x\\text{ and each angle.}",
      triangleDiagram: triAngles(
        "Triangle with interior angles labelled x, (x + 30) and (x + 60) degrees.",
        { A: "x", B: "(x+30)°", C: "(x+60)°" }
      ),
      steps: [
        {
          explanation: "The three angles of a triangle sum to 180°, so add the expressions and set the total to 180.",
          latex: "x + (x+30) + (x+60) = 180 \\quad (\\text{angle sum of a triangle})",
        },
        {
          explanation: "Collect the x-terms and the numbers.",
          latex: "3x + 90 = 180",
        },
        {
          explanation: "Subtract 90, then divide by 3, to solve for x.",
          latex: "3x = 90 \\Rightarrow x = 30",
        },
        {
          explanation: "Substitute x = 30 back into each expression to state the actual angles.",
          latex: "30^\\circ,\\quad 60^\\circ,\\quad 90^\\circ",
        },
      ],
      finalAnswerLatex: "x = 30,\\quad\\text{the angles are }30^\\circ,\\;60^\\circ,\\;90^\\circ.",
    } as WorkedExample,
    {
      title: "Co-interior angles given algebraically",
      questionLatex:
        "\\text{Parallel lines. One co-interior angle is }(3x)^\\circ\\text{ and the other is }(2x+30)^\\circ.\\text{ Find }x.",
      planeShapeDiagram: parallelAnglesShape(
        "Transversal crossing two parallel lines (chevroned). Two co-interior angles on the same side labelled 3x degrees and (2x + 30) degrees.",
        { bottomRight: "3x", topRight: "(2x+30)°" }
      ),
      steps: [
        {
          explanation: "Co-interior angles between parallel lines sum to 180°, so add them and set the total to 180.",
          latex: "3x + (2x + 30) = 180 \\quad (\\text{co-interior angles})",
        },
        {
          explanation: "Collect like terms, then subtract 30 and divide by 5.",
          latex: "5x + 30 = 180 \\Rightarrow 5x = 150 \\Rightarrow x = 30",
        },
      ],
      finalAnswerLatex: "x = 30.",
    } as WorkedExample,
    {
      title: "Multi-step: parallel lines into a triangle angle sum",
      questionLatex:
        "\\text{Lines }AB \\parallel CD.\\text{ A transversal meets }AB\\text{ making a }64^\\circ\\text{ angle, then meets }CD\\text{ at }P.\\text{ A second line from }P\\text{ back to }AB\\text{ at }Q\\text{ makes }\\triangle PQ R,\\text{ where the angle at }Q\\text{ on line }AB\\text{ is }52^\\circ.\\text{ Find the third angle of the triangle at }P.",
      triangleDiagram: triAngles(
        "Triangle PQR formed inside the parallel-line setup, with angle R = 64 degrees (found by alternate angles), angle Q = 52 degrees, and the angle at P unknown.",
        { A: "P: ?", B: "R: 64°", C: "Q: 52°" }
      ),
      steps: [
        {
          explanation: "The 64° angle at AB and the angle inside the triangle at the AB line are alternate angles, so the angle at R is 64°.",
          latex: "\\angle R = 64^\\circ \\quad (\\text{alternate angles, } AB \\parallel CD)",
        },
        {
          explanation: "Now two angles of the triangle are known, 64° and 52°, and a triangle's angles sum to 180°.",
          latex: "\\angle P + 64 + 52 = 180 \\quad (\\text{angle sum of a triangle})",
        },
        {
          explanation: "Add the two known angles.",
          latex: "\\angle P + 116 = 180",
        },
        {
          explanation: "Subtract 116 from both sides to find the angle at P.",
          latex: "\\angle P = 180 - 116 = 64^\\circ",
        },
      ],
      finalAnswerLatex: "\\angle P = 64^\\circ.",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-geo-rea-g1",
      "Parallel lines (chevroned). Corresponding angles are (2x + 10)° and (4x − 30)°. Find x.",
      "2x + 10 = 4x - 30",
      "20",
      "2x + 10 = 4x − 30. So 40 = 2x, giving x = 20.",
      ["x = 20"],
      undefined,
      parallelAnglesShape(
        "Transversal crossing two parallel lines (chevroned). A corresponding pair labelled (2x + 10) degrees and (4x − 30) degrees in matching positions.",
        { bottomLeft: "(2x+10)°", topRight: "(4x-30)°" }
      )
    ),
    answer(
      "y8-geo-rea-g2",
      "Find x in the triangle shown (its angles are 55°, 72°, and x°), using the angle sum of a triangle.",
      "55 + 72 + x = 180",
      "53",
      "x = 180 − 55 − 72 = 53°.",
      ["53°"],
      triAngles(
        "Triangle with interior angles 55 degrees and 72 degrees given and the third angle marked x.",
        { B: "55°", C: "72°", A: "x" }
      )
    ),
    choice(
      "y8-geo-rea-g3",
      "A student writes: 'angle x = 65° because the angles are in matching positions at each parallel line'. Which rule is being used?",
      "B",
      [
        "Co-interior angles",
        "Corresponding angles",
        "Alternate angles",
        "Vertically opposite angles",
      ],
      "Matching positions at each parallel line describes corresponding (F-shape) angles."
    ),
    answer(
      "y8-geo-rea-g4",
      "Parallel lines (chevroned). A co-interior angle is 115°. Find the other co-interior angle y° in degrees.",
      "115 + y = 180",
      "65",
      "Co-interior angles sum to 180°. y = 180 − 115 = 65°.",
      ["65°"],
      undefined,
      parallelAnglesShape(
        "Transversal crossing two parallel lines (chevroned). Two co-interior angles on the same side: one is 115 degrees, the other is marked y.",
        { bottomRight: "115°", topRight: "y" }
      )
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-rea-i1",
      "An exterior angle of a triangle is 125°. One non-adjacent interior angle is 55°. Find the other non-adjacent interior angle in degrees.",
      "x + 55 = 125",
      "70",
      "Exterior angle = sum of two non-adjacent interior angles. x = 125 − 55 = 70°.",
      ["70°"]
    ),
    answer(
      "y8-geo-rea-i2",
      "Parallel lines (chevroned). Co-interior angles are 3x° and (2x + 30)°. Find x.",
      "3x + (2x+30) = 180",
      "30",
      "5x + 30 = 180, so 5x = 150, giving x = 30.",
      ["x = 30"],
      undefined,
      parallelAnglesShape(
        "Transversal crossing two parallel lines (chevroned). Two co-interior angles on the same side labelled 3x degrees and (2x + 30) degrees.",
        { bottomRight: "3x", topRight: "(2x+30)°" }
      )
    ),
    choice(
      "y8-geo-rea-i3",
      "Which reason justifies that two alternate angles formed by a transversal on parallel lines are equal?",
      "D",
      [
        "Angles at a point sum to 360°",
        "Co-interior angles sum to 180°",
        "All angles in a triangle sum to 180°",
        "Alternate angles are equal when lines are parallel",
      ],
      "The alternate angle rule states that Z-angles are equal when the lines are parallel."
    ),
    answer(
      "y8-geo-rea-i4",
      "A triangle has angles (2x + 10)°, (x + 20)°, and 90° as shown. Find x.",
      "(2x+10) + (x+20) + 90 = 180",
      "20",
      "3x + 120 = 180, so 3x = 60, giving x = 20.",
      ["x = 20"],
      triRight(
        "Right-angled triangle with the right angle marked and the other two angles labelled (2x + 10) degrees and (x + 20) degrees.",
        { A: "(2x+10)°", C: "(x+20)°" },
        "B"
      )
    ),
    answer(
      "y8-geo-rea-i5",
      "Quadrilateral ABCD has angles 2x°, 3x°, 4x°, and x° as shown. Find angle A (= 2x°) in degrees.",
      "2x + 3x + 4x + x = 360",
      "72",
      "10x = 360, so x = 36. Angle A = 2 × 36 = 72°.",
      ["72°"],
      undefined,
      quadAngles(
        "Quadrilateral ABCD with interior angles labelled 2x, 3x, 4x and x degrees at A, B, C and D.",
        ["2x", "3x", "4x", "x"]
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing the angle value without a reason.",
      fix: "Always follow the value with the reason: e.g. '115° (co-interior angles, AB ∥ CD)'.",
    },
    {
      mistake: "Using a parallel-line rule when the lines are not stated to be parallel.",
      fix: "Check the question carefully. Parallel-line rules only apply when the lines are explicitly parallel.",
    },
    {
      mistake: "Setting up the equation with the wrong angle sum for the shape.",
      fix: "Triangles sum to 180°; quadrilaterals sum to 360°. Choose the sum that matches the shape.",
    },
    {
      mistake: "Solving for x but not substituting back to find the required angle.",
      fix: "After finding x, substitute it into the expression for each required angle.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-geo-rea-m1",
      "Parallel lines (chevroned). An angle at the first line is 78°. State the alternate angle x at the second line in degrees.",
      "\\text{alternate angles (Z): equal}",
      "78",
      "Alternate angles are equal when lines are parallel.",
      ["78°"],
      undefined,
      parallelAnglesShape(
        "Transversal crossing two parallel lines (chevroned). One angle is 78 degrees; the alternate angle on the opposite side at the other line is marked x.",
        { bottomLeft: "78°", topRight: "x" }
      )
    ),
    answer(
      "y8-geo-rea-m2",
      "Triangle: the angles are x°, (x + 30)°, and (x + 60)° as shown. Find x.",
      "x + (x+30) + (x+60) = 180",
      "30",
      "3x + 90 = 180, so 3x = 90, giving x = 30.",
      ["x = 30"],
      triAngles(
        "Triangle with interior angles labelled x, (x + 30) and (x + 60) degrees.",
        { A: "x", B: "(x+30)°", C: "(x+60)°" }
      )
    ),
    answer(
      "y8-geo-rea-m3",
      "Parallel lines (chevroned). Corresponding angles: (3x + 15)° = (x + 55)°. Find x.",
      "3x + 15 = x + 55",
      "20",
      "3x + 15 = x + 55, so 2x = 40, giving x = 20.",
      ["x = 20"],
      undefined,
      parallelAnglesShape(
        "Transversal crossing two parallel lines (chevroned). A corresponding pair labelled (3x + 15) degrees and (x + 55) degrees in matching positions.",
        { bottomLeft: "(3x+15)°", topRight: "(x+55)°" }
      )
    ),
    answer(
      "y8-geo-rea-m4",
      "An exterior angle of a triangle is 110°. The two non-adjacent interior angles are equal. Find each in degrees.",
      "2a = 110",
      "55",
      "Each angle = 110° ÷ 2 = 55°.",
      ["55°"]
    ),
    choice(
      "y8-geo-rea-m5",
      "Which reason correctly justifies the triangle angle sum?",
      "A",
      [
        "A triangle can be divided into a straight line using alternate angles — so the three interior angles sum to 180°.",
        "A triangle has three sides, each contributing 60°.",
        "The angle sum of any polygon is 360°.",
        "Vertically opposite angles in the triangle sum to 180°.",
      ],
      "Drawing a line parallel to the base through the apex shows three angles forming a straight line (180°) via alternate and corresponding angles."
    ),
    answer(
      "y8-geo-rea-m6",
      "In triangle ABC (shown), angle A = 50° and angle B = 65°. Find angle C in degrees.",
      "50 + 65 + \\angle C = 180",
      "65",
      "Angle C = 180 − 50 − 65 = 65°.",
      ["65°"],
      triAngles(
        "Triangle ABC with angle A = 50 degrees, angle B = 65 degrees and angle C unknown.",
        { A: "50°", B: "65°", C: "?" }
      )
    ),
    answer(
      "y8-geo-rea-m7",
      "Two lines intersect. One angle is 5x° and the vertically opposite angle is (3x + 20)°. Find x.",
      "5x = 3x + 20",
      "10",
      "Vertically opposite angles are equal: 5x = 3x + 20, so 2x = 20, giving x = 10.",
      ["x = 10"]
    ),
    choice(
      "y8-geo-rea-m8",
      "Which reason correctly justifies two equal alternate angles?",
      "C",
      [
        "Co-interior angles, lines are parallel",
        "Corresponding angles, lines are parallel",
        "Alternate angles, lines are parallel",
        "Vertically opposite angles",
      ],
      "Equal angles on opposite sides of a transversal between parallel lines are justified by 'alternate angles, lines are parallel'."
    ),
    answer(
      "y8-geo-rea-m9",
      "A polygon has 5 sides. Find the sum of its interior angles in degrees.",
      "(5-2) \\times 180",
      "540",
      "(5 − 2) × 180 = 3 × 180 = 540°.",
      ["540°"]
    ),
    answer(
      "y8-geo-rea-m10",
      "A triangle has one angle that is twice another, and the third angle is 90° as shown. Find the smallest angle in degrees.",
      "x + 2x + 90 = 180",
      "30",
      "3x + 90 = 180, so 3x = 90, giving x = 30°. The smallest angle is 30°.",
      ["30°"],
      triRight(
        "Right-angled triangle with the right angle marked and the other two angles labelled x and 2x degrees.",
        { A: "x", C: "2x" },
        "B"
      )
    ),
  ],
};

// ── Lesson 7: Properties of Special Quadrilaterals ───────────────────────────

const quadrilateralProperties: LessonContent = {
  description:
    "Identify and apply the side, angle, and diagonal properties of parallelograms, rectangles, rhombuses, squares, trapezoids, and kites to find unknown angles and side lengths.",
  learningIntention:
    "Use the properties of special quadrilaterals to find unknown angles and sides, and to justify conclusions with a geometric reason.",
  successCriteria: [
    "State the side, angle, and diagonal properties of each special quadrilateral.",
    "Use opposite-angle and co-interior-angle properties of a parallelogram to find unknown angles.",
    "Apply the equal-diagonal property of a rectangle and the perpendicular-diagonal property of a rhombus.",
    "Identify a quadrilateral from a given list of properties.",
    "Write a brief geometric justification for each step.",
  ],
  teaching: {
    paragraphs: [
      "The special quadrilaterals are not a random list of shapes to memorise — they are a family, each built by adding one more requirement to the one before. Start with a plain four-sided shape, demand two pairs of parallel sides and you get a parallelogram; add right angles and you get a rectangle; instead add equal sides and you get a rhombus; demand both and you get a square. Seeing the family tree means you can reason out each shape's properties instead of cramming them.",
      "A parallelogram has both pairs of opposite sides parallel and equal. Its opposite angles are equal, and any two neighbouring angles are co-interior between a pair of parallel sides, so they add to $180^\\circ$. These follow directly from the parallel-line rules you already know — the parallelogram is just two pairs of parallel lines, so the angle facts come straight from co-interior and alternate angles. Its diagonals bisect each other, meaning they cross at their midpoints, cutting each other exactly in half.",
      "A rectangle is a parallelogram whose angles are all $90^\\circ$. Because it is still a parallelogram, its diagonals bisect each other; but the right angles give it an extra property — the diagonals are also equal in length. You can see why: each diagonal is the hypotenuse of a right-angled triangle made from the same two side lengths, so by Pythagoras both diagonals come out the same. A rhombus is a parallelogram whose sides are all equal. Its symmetry forces the diagonals to cross at right angles and to bisect the corner (vertex) angles they reach.",
      "Why does a rhombus's diagonal bisect its corner angle and meet the other diagonal at $90^\\circ$? Because a rhombus is symmetric: a diagonal is a line of symmetry, folding the shape onto itself. Folding maps each half-corner exactly onto the other, which is what 'bisects the angle' means, and a fold line always meets what it reflects at right angles — that is why the diagonals are perpendicular. Symmetry, not a separate rule, produces these facts.",
      "A square sits at the bottom of the tree, inheriting everything: all sides equal, all angles $90^\\circ$, and diagonals that are equal, perpendicular, bisect each other, and bisect every vertex angle. This is the misconception to dissolve now — a square IS a rectangle and a square IS a rhombus (it meets both definitions), but a rhombus is not always a square and a rectangle is not always a square. The arrows in the family tree point one way only.",
      "Two shapes sit slightly apart. A trapezium has exactly one pair of parallel sides, so only the co-interior angles between that pair are supplementary. A kite has two pairs of adjacent (next-to-each-other) equal sides — not opposite ones, which is what separates it from a parallelogram. A kite has one line of symmetry along its longer diagonal, and that symmetry makes the longer diagonal bisect the two vertex angles it joins and cut the shorter diagonal at $90^\\circ$.",
      "To use all this: name the shape, state the exact property you are relying on, then calculate — for example, 'Opposite angles of a parallelogram are equal, so $x = 70^\\circ$.' The key discipline is matching the property to the right shape, because not every quadrilateral has every property (a parallelogram's diagonals are not equal; a rhombus's angles are not all $90^\\circ$). And never read lengths or right angles off the diagram — figures are often not to scale, so rely on the stated shape and its properties.",
    ],
    latexBlocks: [
      "\\text{Parallelogram: opposite sides parallel and equal; opposite angles equal; diagonals bisect each other}",
      "\\text{Rectangle = parallelogram + all angles } 90^\\circ \\text{ (diagonals also equal)}",
      "\\text{Rhombus = parallelogram + all sides equal (diagonals perpendicular, bisect vertex angles)}",
      "\\text{Square = rectangle AND rhombus (every property of both)}",
      "\\text{Kite: two pairs of adjacent equal sides; longer diagonal bisects the other at } 90^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find an unknown angle in a parallelogram",
      questionLatex:
        "\\text{In parallelogram }ABCD,\\text{ angle }A = 112^\\circ.\\text{ Find angles }B,\\;C,\\text{ and }D.",
      planeShapeDiagram: parallelogramAngles(
        "Parallelogram ABCD with both pairs of opposite sides marked parallel by chevrons. Angle A is 112 degrees; angles B, C and D are unknown.",
        { A: "112°", B: "?", C: "?", D: "?" }
      ),
      steps: [
        {
          explanation: "A and C are opposite corners, and opposite angles of a parallelogram are equal.",
          latex: "\\angle C = \\angle A = 112^\\circ \\quad (\\text{opposite angles})",
        },
        {
          explanation: "A and B are neighbouring angles, co-interior between the parallel sides, so they sum to 180°.",
          latex: "\\angle B + 112 = 180 \\Rightarrow \\angle B = 68^\\circ",
        },
        {
          explanation: "B and D are opposite corners, so they are equal.",
          latex: "\\angle D = \\angle B = 68^\\circ \\quad (\\text{opposite angles})",
        },
      ],
      finalAnswerLatex:
        "\\angle B = 68^\\circ,\\quad \\angle C = 112^\\circ,\\quad \\angle D = 68^\\circ.",
    } as WorkedExample,
    {
      title: "Find an angle using rhombus diagonal properties",
      questionLatex:
        "\\text{In rhombus }PQRS,\\text{ diagonal }PR\\text{ bisects angle }P.\\text{ If }\\angle QPR = 34^\\circ,\\text{ find }\\angle PQR.",
      steps: [
        {
          explanation:
            "A rhombus diagonal bisects the vertex angle, so the full corner angle at P is twice the half-angle 34°.",
          latex: "\\angle QPS = 2 \\times 34 = 68^\\circ \\quad (\\text{diagonal bisects vertex angle})",
        },
        {
          explanation: "P and Q are neighbouring corners, co-interior between parallel sides, so they sum to 180°.",
          latex: "\\angle PQR + 68 = 180 \\quad (\\text{co-interior angles})",
        },
        {
          explanation: "Subtract 68 from both sides to find angle PQR.",
          latex: "\\angle PQR = 180 - 68 = 112^\\circ",
        },
      ],
      finalAnswerLatex: "\\angle PQR = 112^\\circ.",
    } as WorkedExample,
    {
      title: "Identify a shape from its properties",
      questionLatex:
        "\\text{A quadrilateral has all sides equal, all angles }90^\\circ\\text{, and diagonals that bisect each other at }90^\\circ.\\text{ What shape is it?}",
      steps: [
        {
          explanation: "All sides equal is the defining property of a rhombus.",
          latex: "\\text{all sides equal} \\Rightarrow \\text{rhombus}",
        },
        {
          explanation: "All angles 90° is the defining property of a rectangle.",
          latex: "\\text{all angles } 90^\\circ \\Rightarrow \\text{rectangle}",
        },
        {
          explanation: "A shape that is at once a rhombus and a rectangle is, by the family tree, a square.",
          latex: "\\text{rhombus and rectangle} \\Rightarrow \\text{square}",
        },
      ],
      finalAnswerLatex: "\\text{The shape is a square.}",
    } as WorkedExample,
    {
      title: "Multi-step: kite angles using symmetry and the angle sum",
      questionLatex:
        "\\text{A kite }ABCD\\text{ has }AB = AD\\text{ and }CB = CD.\\text{ The vertex angles are }\\angle B = \\angle D = 96^\\circ\\text{ and }\\angle A = 50^\\circ.\\text{ Find }\\angle C.",
      planeShapeDiagram: kiteAngles(
        "Kite ABCD with AB = AD (double ticks) and CB = CD (single ticks). Angle A = 50 degrees, angles B and D each 96 degrees, and angle C unknown.",
        { A: "50°", B: "96°", C: "?", D: "96°" }
      ),
      steps: [
        {
          explanation: "A kite has a line of symmetry along diagonal AC, so the two angles either side of it, B and D, are equal — confirming both are 96°.",
          latex: "\\angle B = \\angle D = 96^\\circ \\quad (\\text{symmetry of the kite})",
        },
        {
          explanation: "The four angles of any quadrilateral sum to 360°, so write that equation.",
          latex: "\\angle A + \\angle B + \\angle C + \\angle D = 360",
        },
        {
          explanation: "Substitute the three known angles.",
          latex: "50 + 96 + \\angle C + 96 = 360",
        },
        {
          explanation: "Add the known angles, then subtract from 360 to find angle C.",
          latex: "242 + \\angle C = 360 \\Rightarrow \\angle C = 118^\\circ",
        },
      ],
      finalAnswerLatex: "\\angle C = 118^\\circ.",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-geo-qprop-g1",
      "Which quadrilateral has ALL sides equal AND all angles 90°?",
      "D",
      [
        "Rectangle",
        "Rhombus",
        "Parallelogram",
        "Square",
      ],
      "A square has all four sides equal (like a rhombus) and all four angles equal to 90° (like a rectangle). No other quadrilateral satisfies both conditions simultaneously."
    ),
    answer(
      "y8-geo-qprop-g2",
      "In parallelogram ABCD (shown), angle A = 74°. Find angle C in degrees.",
      "\\text{opposite angles of a parallelogram are equal}",
      "74",
      "Opposite angles of a parallelogram are equal. Angle C = angle A = 74°.",
      ["74°"],
      undefined,
      parallelogramAngles(
        "Parallelogram ABCD with opposite sides marked parallel. Angle A is 74 degrees; angle C (opposite A) is unknown.",
        { A: "74°", C: "?" }
      )
    ),
    answer(
      "y8-geo-qprop-g3",
      "A rhombus ABCD has a side length of 9 cm (shown by the equal-tick marks). Find the length of the other three sides in cm.",
      "\\text{all sides of a rhombus are equal}",
      "9",
      "All four sides of a rhombus are equal. Every side is 9 cm.",
      ["9 cm"],
      undefined,
      {
        description:
          "Rhombus ABCD with all four sides marked equal by single ticks; one side is labelled 9 cm.",
        fill: "violet",
        vertices: [
          { x: 60, y: 0, label: "A" },
          { x: 180, y: 0, label: "B" },
          { x: 120, y: 90, label: "C" },
          { x: 0, y: 90, label: "D" },
        ],
        edges: [{ ticks: 1, label: "9 cm" }, { ticks: 1 }, { ticks: 1 }, { ticks: 1 }],
      }
    ),
    answer(
      "y8-geo-qprop-g4",
      "State TWO properties of a rectangle's diagonals. Write your answer as: 'The diagonals are [property 1] and [property 2].'",
      "\\text{rectangle diagonal properties}",
      "equal and bisect each other",
      "The diagonals of a rectangle are equal in length and bisect each other (each diagonal cuts the other in half).",
      ["equal length and bisect each other", "equal and bisect", "bisect each other and are equal"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-qprop-i1",
      "In the trapezoid shown, one co-interior angle between the parallel sides is 118°. Find the other co-interior angle x in degrees.",
      "118 + x = 180",
      "62",
      "Co-interior angles between parallel sides are supplementary. x = 180 − 118 = 62°.",
      ["62°"],
      undefined,
      trapeziumAngles(
        "Trapezium ABCD with AB parallel to DC (marked by chevrons). One co-interior angle along a non-parallel side is 118 degrees; the co-interior angle at the other end of that side is marked x.",
        { A: "118°", D: "x" }
      )
    ),
    answer(
      "y8-geo-qprop-i2",
      "A quadrilateral has opposite sides equal and parallel, opposite angles equal, and diagonals that bisect each other — but the angles are NOT all 90° and the sides are NOT all equal. What is the shape?",
      "\\text{identify from properties}",
      "parallelogram",
      "These are exactly the properties of a parallelogram (not a rectangle or rhombus, since angles are not 90° and sides are not all equal).",
      ["a parallelogram"]
    ),
    choice(
      "y8-geo-qprop-i3",
      "Which property is present in a rhombus but NOT necessarily in a rectangle?",
      "B",
      [
        "Diagonals bisect each other",
        "Diagonals intersect at 90°",
        "All angles are 90°",
        "Opposite sides are parallel",
      ],
      "The diagonals of a rhombus bisect each other at 90° (perpendicularly). A rectangle's diagonals bisect each other but are NOT perpendicular unless it is also a square."
    ),
    answer(
      "y8-geo-qprop-i4",
      "In a kite, the longer diagonal bisects one pair of vertex angles. Each bisected angle is 38°. Find the full vertex angle in degrees.",
      "2 \\times 38",
      "76",
      "The longer diagonal of a kite bisects the vertex angle, so the full angle is 2 × 38° = 76°.",
      ["76°"]
    ),
    answer(
      "y8-geo-qprop-i5",
      "Parallelogram ABCD (shown) has angle A = (3x + 10)° and angle B = (2x + 20)°. Find x, then find angle A in degrees. Enter angle A.",
      "(3x+10) + (2x+20) = 180",
      "100",
      "Co-interior angles between parallel sides are supplementary: (3x + 10) + (2x + 20) = 180, so 5x + 30 = 180, giving x = 30. Angle A = 3(30) + 10 = 100°.",
      ["100°"],
      undefined,
      parallelogramAngles(
        "Parallelogram ABCD with opposite sides marked parallel. Angle A is (3x + 10) degrees and the adjacent angle B is (2x + 20) degrees.",
        { A: "(3x+10)°", B: "(2x+20)°" }
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Assuming a rhombus has all angles equal to 90°.",
      fix: "A rhombus has all sides equal, but angles are only 90° in the special case where it is also a square. In general, a rhombus has two pairs of equal opposite angles that are NOT right angles.",
    },
    {
      mistake: "Thinking a square is not a rectangle or not a rhombus.",
      fix: "A square satisfies every property of both a rectangle and a rhombus. A square IS a rectangle, and a square IS a rhombus — but a rectangle or rhombus is not automatically a square.",
    },
    {
      mistake: "Applying diagonal properties from one shape to a different shape (e.g. saying a parallelogram's diagonals are equal).",
      fix: "Parallelogram diagonals bisect each other but are NOT necessarily equal. Equal diagonals are a property of rectangles (and squares), not parallelograms in general.",
    },
    {
      mistake: "Confusing adjacent sides with opposite sides when using kite properties.",
      fix: "A kite has two pairs of ADJACENT (next-to-each-other) equal sides, not opposite equal sides. That distinguishes it from a parallelogram.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-geo-qprop-m1",
      "Which of the following statements about a rhombus is TRUE?",
      "C",
      [
        "All angles are always 90°",
        "Diagonals are always equal in length",
        "All sides are equal and opposite sides are parallel",
        "It has exactly one pair of parallel sides",
      ],
      "A rhombus has all four sides equal and both pairs of opposite sides parallel. Its angles are NOT always 90° and its diagonals are NOT always equal in length."
    ),
    choice(
      "y8-geo-qprop-m2",
      "In a rhombus, the diagonal bisects the vertex angle into two equal parts of 41° each. What is the full vertex angle?",
      "B",
      [
        "41°",
        "82°",
        "49°",
        "138°",
      ],
      "The diagonal of a rhombus bisects the vertex angle, so the full angle is 2 × 41° = 82°."
    ),
    answer(
      "y8-geo-qprop-m3",
      "In parallelogram WXYZ (shown), angle W = 63°. Find angle X in degrees.",
      "\\angle W + \\angle X = 180",
      "117",
      "Co-interior angles between parallel sides are supplementary. Angle X = 180 − 63 = 117°.",
      ["117°"],
      undefined,
      parallelogramAngles(
        "Parallelogram WXYZ with opposite sides marked parallel. Angle W is 63 degrees; the adjacent angle X is unknown.",
        { A: "63°", B: "?" },
        ["W", "X", "Y", "Z"]
      )
    ),
    answer(
      "y8-geo-qprop-m4",
      "A rectangle has a diagonal of length 13 cm. What is the length of the other diagonal in cm?",
      "\\text{diagonals of a rectangle are equal}",
      "13",
      "The diagonals of a rectangle are equal in length. The other diagonal is also 13 cm.",
      ["13 cm"]
    ),
    answer(
      "y8-geo-qprop-m5",
      "In rhombus ABCD, the diagonals intersect at point O. State the size of angle AOB in degrees.",
      "\\text{diagonals of a rhombus bisect at } 90^\\circ",
      "90",
      "The diagonals of a rhombus bisect each other at right angles. Angle AOB = 90°.",
      ["90°"]
    ),
    answer(
      "y8-geo-qprop-m6",
      "In trapezoid PQRS (shown), PQ is parallel to SR. Angle P = 71°. Find angle S in degrees. Give the geometric reason.",
      "\\angle P + \\angle S = 180",
      "109",
      "Angle P and angle S are co-interior angles between the parallel sides PQ and SR, so they are supplementary. Angle S = 180 − 71 = 109°.",
      ["109°"],
      undefined,
      trapeziumAngles(
        "Trapezium PQRS with PQ parallel to SR (marked by chevrons). Angle P is 71 degrees and the co-interior angle S along side PS is unknown.",
        { A: "71°", D: "?" },
        ["P", "Q", "R", "S"]
      )
    ),
    answer(
      "y8-geo-qprop-m7",
      "A quadrilateral has two pairs of adjacent equal sides and one diagonal that bisects the other at 90°. Name the shape.",
      "\\text{identify from properties}",
      "kite",
      "Two pairs of adjacent equal sides and one diagonal bisecting the other at 90° are defining properties of a kite.",
      ["a kite"]
    ),
    answer(
      "y8-geo-qprop-m8",
      "In parallelogram ABCD (shown), angle A = (4x − 10)° and angle C = (2x + 30)°. Find x, then find angle A in degrees. Enter angle A.",
      "4x - 10 = 2x + 30",
      "70",
      "Opposite angles of a parallelogram are equal: 4x − 10 = 2x + 30, so 2x = 40, giving x = 20. Angle A = 4(20) − 10 = 80 − 10 = 70°.",
      ["70°"],
      undefined,
      parallelogramAngles(
        "Parallelogram ABCD with opposite sides marked parallel. Angle A is (4x − 10) degrees and the opposite angle C is (2x + 30) degrees.",
        { A: "(4x-10)°", C: "(2x+30)°" }
      )
    ),
    answer(
      "y8-geo-qprop-m9",
      "In rectangle KLMN, the diagonals intersect at point O. KM = 18 cm. Find the length OK in cm.",
      "OK = \\frac{1}{2} \\times KM",
      "9",
      "The diagonals of a rectangle bisect each other. OK = ½ × KM = ½ × 18 = 9 cm.",
      ["9 cm"]
    ),
    answer(
      "y8-geo-qprop-m10",
      "A quadrilateral has all angles equal to 90° but the sides are not all equal. Which shape is it, and justify using one diagonal property.",
      "\\text{all angles }90^\\circ\\text{; diagonals equal and bisect each other}",
      "rectangle",
      "All four angles are 90°, which defines a rectangle. A rectangle's diagonals are equal in length and bisect each other — confirming this property distinguishes it from a general parallelogram.",
      ["a rectangle", "Rectangle"]
    ),
  ],
};

// ── Depth-parity helpers ─────────────────────────────────────────────────────

function pAnswer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  difficulty: number,
  acceptedAnswers: string[] = [],
  triangleDiagram?: TriangleDiagram,
  planeShapeDiagram?: PlaneShapeDiagram,
  angleFigureDiagram?: AngleFigureDiagram
): PracticeQuestion {
  return {
    ...answer(id, prompt, latex, value, explanation, acceptedAnswers, triangleDiagram, planeShapeDiagram, angleFigureDiagram),
    difficulty,
  };
}

function pChoice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  difficulty: number
): PracticeQuestion {
  return { ...choice(id, prompt, value, choices, explanation), difficulty };
}

// ── Depth-parity: masteryQuizPool + multiPartPractice per lesson ──────────────

// Lesson 1: Angle Relationships
angleRelationships.masteryQuizPool = [
  // D1 — direct rules
  pAnswer("y8-geo-ang-p1", "Two angles are complementary. One is 40°. Find the other in degrees.", "40 + x = 90", "50", "x = 90 − 40 = 50°.", 1, ["50°"]),
  pAnswer("y8-geo-ang-p2", "Two angles are supplementary. One is 120°. Find the other in degrees.", "120 + x = 180", "60", "x = 180 − 120 = 60°.", 1, ["60°"]),
  pAnswer("y8-geo-ang-p3", "Two lines intersect. One angle is 75°. State its vertically opposite angle in degrees.", "\\text{vertically opposite to }75^\\circ", "75", "Vertically opposite angles are equal.", 1, ["75°"]),
  pAnswer("y8-geo-ang-p4", "The complement of 25° is how many degrees?", "25 + x = 90", "65", "x = 90 − 25 = 65°.", 1, ["65°"]),
  pAnswer("y8-geo-ang-p5", "The supplement of 95° is how many degrees?", "95 + x = 180", "85", "x = 180 − 95 = 85°.", 1, ["85°"]),
  // D2 — single-step substitution
  pAnswer("y8-geo-ang-p6", "Three angles meet at a point: 120°, 140°, and x°. Find x.", "120 + 140 + x = 360", "100", "120 + 140 = 260. x = 360 − 260 = 100°.", 2, ["100°"]),
  pAnswer("y8-geo-ang-p7", "A straight line is split into 50°, 60°, and x°. Find x.", "50 + 60 + x = 180", "70", "50 + 60 = 110. x = 180 − 110 = 70°.", 2, ["70°"]),
  pAnswer("y8-geo-ang-p8", "Two lines intersect. One angle is 38°. Find the angle adjacent to it on a straight line, in degrees.", "180 - 38", "142", "Adjacent angles on a straight line are supplementary: 180 − 38 = 142°.", 2, ["142°"]),
  pChoice("y8-geo-ang-p9", "Two angles add to 90°. They are described as:", "B", ["Supplementary", "Complementary", "Vertically opposite", "Reflex"], "Angles summing to 90° are complementary.", 2),
  pAnswer("y8-geo-ang-p10", "Four angles meet at a point: 80°, 100°, 90°, and x°. Find x.", "80 + 100 + 90 + x = 360", "90", "80 + 100 + 90 = 270. x = 360 − 270 = 90°.", 2, ["90°"]),
  pAnswer("y8-geo-ang-p11", "The complement of an angle is 18°. Find the angle in degrees.", "x + 18 = 90", "72", "x = 90 − 18 = 72°.", 2, ["72°"]),
  pAnswer("y8-geo-ang-p12", "The supplement of an angle is 47°. Find the angle in degrees.", "x + 47 = 180", "133", "x = 180 − 47 = 133°.", 2, ["133°"]),
  // D3 — two-step / reasoning
  pAnswer("y8-geo-ang-p13", "A straight line carries angles 2x°, 40°, and 70°. Find x.", "2x + 40 + 70 = 180", "35", "2x + 110 = 180, so 2x = 70, giving x = 35.", 3, ["35°"]),
  pAnswer("y8-geo-ang-p14", "At a point, the angles are 3x°, 100°, and 80°. Find x.", "3x + 100 + 80 = 360", "60", "3x + 180 = 360, so 3x = 180, giving x = 60.", 3, ["60°"]),
  pChoice("y8-geo-ang-p15", "An angle and its supplement are equal. What is each angle?", "C", ["45°", "60°", "90°", "120°"], "If x = 180 − x, then 2x = 180, so x = 90°.", 3),
  pAnswer("y8-geo-ang-p16", "Two lines intersect. One angle is 110°. Find the smaller angle formed in degrees.", "180 - 110", "70", "Adjacent angle = 180 − 110 = 70°, which is the smaller angle.", 3, ["70°"]),
  pAnswer("y8-geo-ang-p17", "Three equal angles meet at a point. Find each angle in degrees.", "3x = 360", "120", "3x = 360, so x = 120°.", 3, ["120°"]),
  pAnswer("y8-geo-ang-p18", "At a point, angles are x°, x°, and 160°. Find x.", "x + x + 160 = 360", "100", "2x = 200, so x = 100°.", 3, ["100°"]),
  // D4 — algebraic / multi-step
  pAnswer("y8-geo-ang-p19", "Two lines intersect. One angle is (4x)° and its vertically opposite is (2x + 50)°. Find x.", "4x = 2x + 50", "25", "Vertically opposite angles are equal: 4x = 2x + 50, so 2x = 50, x = 25.", 4, ["25°"]),
  pAnswer("y8-geo-ang-p20", "An angle is 30° more than its complement. Find the angle in degrees.", "x + (x - 30) = 90", "60", "Let the angle be x; its complement is 90 − x = x − 30, so 2x = 120, x = 60°.", 4, ["60°"]),
  pAnswer("y8-geo-ang-p21", "An angle is twice its supplement. Find the angle in degrees.", "x = 2(180 - x)", "120", "x = 2(180 − x) → x = 360 − 2x → 3x = 360 → x = 120°.", 4, ["120°"]),
  pAnswer("y8-geo-ang-p22", "On a straight line: (x + 10)°, (2x)°, and (x − 10)°. Find x.", "(x+10) + 2x + (x-10) = 180", "45", "4x = 180, so x = 45.", 4, ["45°"]),
  pAnswer("y8-geo-ang-p23", "At a point, four equal angles meet. Find the size of each angle in degrees.", "4x = 360", "90", "4x = 360, so each angle = 90°.", 4, ["90°"]),
  pAnswer("y8-geo-ang-p24", "An angle is 3 times its complement. Find the angle in degrees.", "x = 3(90 - x)", "67.5", "x = 3(90 − x) → x = 270 − 3x → 4x = 270 → x = 67.5°.", 4, ["67.5°"]),
  // D5 — hardest
  pAnswer("y8-geo-ang-p25", "Two supplementary angles are in the ratio 2 : 3. Find the larger angle in degrees.", "2k + 3k = 180", "108", "5k = 180, so k = 36. Larger angle = 3 × 36 = 108°.", 5, ["108°"]),
  pAnswer("y8-geo-ang-p26", "Two complementary angles are in the ratio 4 : 5. Find the smaller angle in degrees.", "4k + 5k = 90", "40", "9k = 90, so k = 10. Smaller angle = 4 × 10 = 40°.", 5, ["40°"]),
  pAnswer("y8-geo-ang-p27", "At a point, the angles are x°, (2x)°, (3x)°, and (4x)°. Find the largest angle in degrees.", "x + 2x + 3x + 4x = 360", "144", "10x = 360, so x = 36. Largest = 4 × 36 = 144°.", 5, ["144°"]),
  pAnswer("y8-geo-ang-p28", "Two lines intersect. One angle is (5x − 10)° and the adjacent angle on the straight line is (3x + 30)°. Find x.", "(5x-10) + (3x+30) = 180", "20", "8x + 20 = 180, so 8x = 160, x = 20.", 5, ["20°"]),
];

angleRelationships.multiPartPractice = [
  {
    id: "y8-geo-ang-mp1",
    prompt:
      "Two straight lines, PQ and RS, cross at point O. Around O the four angles, taken in order, are ∠POR, ∠ROQ, ∠QOS and ∠SOP. It is given that ∠POR = 64°.",
    latex: "\\angle POR = 64^\\circ",
    angleFigureDiagram: raysFig(
      "Two straight lines PQ and RS crossing at O. The angle POR is 64 degrees; its vertically opposite angle QOS is also 64 degrees, and the adjacent angles ROQ and SOP are each 116 degrees.",
      [0, 64, 180, 244],
      [
        { between: [0, 64], label: "64°" },
        { between: [64, 180], label: "∠SOP" },
        { between: [180, 244], label: "∠QOS" },
        { between: [244, 360], label: "∠ROQ" },
      ],
      ["R", "P", "S", "Q"]
    ),
    answer: "116",
    hint: "Vertically opposite angles are equal; adjacent angles on a straight line are supplementary.",
    explanation:
      "∠QOS is vertically opposite ∠POR, so it is 64°. ∠ROQ is on a straight line with ∠POR, so 180 − 64 = 116°. All four angles around O add to 360°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find ∠QOS (the angle vertically opposite ∠POR) in degrees.",
        latex: "\\angle QOS = \\;?",
        marks: 1,
        answer: "64",
        acceptedAnswers: ["64°"],
        hint: "Vertically opposite angles are equal.",
        explanation: "∠QOS is vertically opposite ∠POR, so ∠QOS = 64°.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find ∠ROQ (adjacent to ∠POR on the straight line) in degrees.",
        latex: "\\angle ROQ = \\;?",
        marks: 1,
        answer: "116",
        acceptedAnswers: ["116°"],
        hint: "Angles on a straight line sum to 180°.",
        explanation: "∠ROQ = 180 − 64 = 116°.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the sum of all four angles around the point O in degrees.",
        latex: "\\angle POR + \\angle ROQ + \\angle QOS + \\angle SOP = \\;?",
        marks: 1,
        answer: "360",
        acceptedAnswers: ["360°"],
        hint: "Angles at a point make a full rotation.",
        explanation: "Angles at a point always sum to 360°.",
      },
    ],
  },
];

// Lesson 2: Parallel Lines and Transversals
parallelLinesTransversals.masteryQuizPool = [
  // D1
  pAnswer("y8-geo-par-p1", "Parallel lines. A corresponding angle is 70°. Find the other in degrees.", "\\text{corresponding (F): equal}", "70", "Corresponding angles are equal when lines are parallel.", 1, ["70°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. A corresponding angle of 70 degrees and its matching corresponding angle x at the other line.", { TR: "70°" }, { TR: "x" })),
  pAnswer("y8-geo-par-p2", "Parallel lines. An alternate angle is 55°. Find the other in degrees.", "\\text{alternate (Z): equal}", "55", "Alternate angles are equal when lines are parallel.", 1, ["55°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. One alternate angle is 55 degrees; the alternate angle (Z-shape) at the other line is marked x.", { BR: "55°" }, { TL: "x" })),
  pAnswer("y8-geo-par-p3", "Parallel lines. One co-interior angle is 100°. Find the other in degrees.", "100 + x = 180", "80", "Co-interior angles sum to 180°: 180 − 100 = 80°.", 1, ["80°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 100 degrees, the other is marked x.", { BR: "x" }, { TR: "100°" })),
  pAnswer("y8-geo-par-p4", "Parallel lines. A corresponding angle is 134°. Find the other in degrees.", "\\text{corresponding (F): equal}", "134", "Corresponding angles are equal.", 1, ["134°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. A corresponding angle of 134 degrees and its matching corresponding angle x at the other line.", { TR: "134°" }, { TR: "x" })),
  pAnswer("y8-geo-par-p5", "Parallel lines. One co-interior angle is 90°. Find the other in degrees.", "90 + x = 180", "90", "180 − 90 = 90°.", 1, ["90°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 90 degrees, the other is marked x.", { BR: "x" }, { TR: "90°" })),
  // D2
  pChoice("y8-geo-par-p6", "Which shape represents alternate angles?", "B", ["F-shape", "Z-shape", "C-shape", "X-shape"], "Alternate angles form a Z-shape.", 2),
  pChoice("y8-geo-par-p7", "Which shape represents co-interior angles?", "C", ["F-shape", "Z-shape", "C-shape", "T-shape"], "Co-interior angles form a C-shape.", 2),
  pAnswer("y8-geo-par-p8", "Parallel lines. An alternate angle is 128°. Find the other in degrees.", "\\text{alternate (Z): equal}", "128", "Alternate angles are equal.", 2, ["128°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. One alternate angle is 128 degrees; the alternate angle (Z-shape) at the other line is marked x.", { BL: "128°" }, { TR: "x" })),
  pAnswer("y8-geo-par-p9", "Parallel lines. One co-interior angle is 73°. Find the other in degrees.", "73 + x = 180", "107", "180 − 73 = 107°.", 2, ["107°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 73 degrees, the other is marked x.", { BR: "73°" }, { TR: "x" })),
  pAnswer("y8-geo-par-p10", "Parallel lines. A corresponding angle is 41°. The angle adjacent to it on a straight line is found by 180 − 41. Find that angle in degrees.", "180 - 41", "139", "180 − 41 = 139°.", 2, ["139°"]),
  pAnswer("y8-geo-par-p11", "Parallel lines. One co-interior angle is 126°. Find the other in degrees.", "126 + x = 180", "54", "180 − 126 = 54°.", 2, ["54°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines: one is 126 degrees, the other is marked x.", { BR: "x" }, { TR: "126°" })),
  // D3
  pChoice("y8-geo-par-p12", "Co-interior angles between parallel lines are always:", "B", ["Equal", "Supplementary", "Complementary", "Reflex"], "Co-interior angles sum to 180° (supplementary).", 3),
  pAnswer("y8-geo-par-p13", "Parallel lines. An angle is 64°. Find its co-interior partner in degrees.", "64 + x = 180", "116", "180 − 64 = 116°.", 3, ["116°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. A 64 degree angle between the lines and its co-interior partner x on the same side.", { BR: "64°" }, { TR: "x" })),
  pAnswer("y8-geo-par-p14", "Parallel lines. The two co-interior angles are equal. Find each in degrees.", "x + x = 180", "90", "2x = 180, so each = 90°.", 3, ["90°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. The two co-interior angles on the same side are equal, each marked x.", { BR: "x" }, { TR: "x" })),
  pAnswer("y8-geo-par-p15", "Parallel lines. An alternate angle is 117° and the angle next to it on the straight line is 180 − 117. Find that angle in degrees.", "180 - 117", "63", "180 − 117 = 63°.", 3, ["63°"]),
  pAnswer("y8-geo-par-p16", "Parallel lines. Co-interior angles are x° and 3x°. Find x.", "x + 3x = 180", "45", "4x = 180, so x = 45.", 3, ["45°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines, labelled x degrees and 3x degrees.", { BR: "x" }, { TR: "3x" })),
  pAnswer("y8-geo-par-p17", "Parallel lines. Co-interior angles are 2x° and 4x°. Find the larger angle in degrees.", "2x + 4x = 180", "120", "6x = 180, x = 30. Larger = 4 × 30 = 120°.", 3, ["120°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side, between the lines, labelled 2x degrees and 4x degrees.", { BR: "2x" }, { TR: "4x" })),
  // D4
  pAnswer("y8-geo-par-p18", "Parallel lines. Corresponding angles: (3x + 20)° = (x + 60)°. Find x.", "3x + 20 = x + 60", "20", "3x + 20 = x + 60, so 2x = 40, x = 20.", 4, ["20°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. A corresponding pair in matching positions labelled (3x + 20) degrees and (x + 60) degrees.", { TR: "(3x+20)°" }, { TR: "(x+60)°" })),
  pAnswer("y8-geo-par-p19", "Parallel lines. Alternate angles: (6x − 10)° = (4x + 30)°. Find x.", "6x - 10 = 4x + 30", "20", "6x − 10 = 4x + 30, so 2x = 40, x = 20.", 4, ["20°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. An alternate pair (Z-shape) labelled (6x − 10) degrees and (4x + 30) degrees.", { BL: "(6x-10)°" }, { TR: "(4x+30)°" })),
  pAnswer("y8-geo-par-p20", "Parallel lines. Co-interior angles: (2x + 30)° and (3x + 50)°. Find x.", "(2x+30) + (3x+50) = 180", "20", "5x + 80 = 180, so 5x = 100, x = 20.", 4, ["20°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side labelled (2x + 30) degrees and (3x + 50) degrees.", { BR: "(2x+30)°" }, { TR: "(3x+50)°" })),
  pAnswer("y8-geo-par-p21", "Parallel lines. Corresponding angles: (5x − 25)° = (2x + 50)°. Find x.", "5x - 25 = 2x + 50", "25", "5x − 25 = 2x + 50, so 3x = 75, x = 25.", 4, ["25°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. A corresponding pair in matching positions labelled (5x − 25) degrees and (2x + 50) degrees.", { TR: "(5x-25)°" }, { TR: "(2x+50)°" })),
  pAnswer("y8-geo-par-p22", "Parallel lines. Co-interior angles are (4x)° and (5x)°. Find the smaller angle in degrees.", "4x + 5x = 180", "80", "9x = 180, x = 20. Smaller = 4 × 20 = 80°.", 4, ["80°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side labelled 4x degrees and 5x degrees.", { BR: "4x" }, { TR: "5x" })),
  pAnswer("y8-geo-par-p23", "Parallel lines. Alternate angles: (7x + 5)° = (3x + 65)°. Find the angle in degrees.", "7x + 5 = 3x + 65", "110", "4x = 60, x = 15. Angle = 7(15) + 5 = 110°.", 4, ["110°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. An alternate pair (Z-shape) labelled (7x + 5) degrees and (3x + 65) degrees.", { BL: "(7x+5)°" }, { TR: "(3x+65)°" })),
  // D5
  pAnswer("y8-geo-par-p24", "Parallel lines. Two co-interior angles are in the ratio 1 : 2. Find the larger angle in degrees.", "k + 2k = 180", "120", "3k = 180, k = 60. Larger = 2 × 60 = 120°.", 5, ["120°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side in the ratio 1 : 2, labelled k degrees and 2k degrees.", { BR: "k" }, { TR: "2k" })),
  pAnswer("y8-geo-par-p25", "Parallel lines. Co-interior angles are (3x + 15)° and (2x − 25)°... but they must sum to 180. Find x.", "(3x+15) + (2x-25) = 180", "38", "5x − 10 = 180, so 5x = 190, x = 38.", 5, ["38°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side labelled (3x + 15) degrees and (2x − 25) degrees.", { BR: "(2x-25)°" }, { TR: "(3x+15)°" })),
  pAnswer("y8-geo-par-p26", "A transversal cuts parallel lines. The corresponding angle is 3 times its own co-interior partner. Find the corresponding angle in degrees.", "x + 3x = 180", "135", "If the co-interior partner is x and the angle is 3x, then x + 3x = 180, x = 45, so the angle = 135°.", 5, ["135°"]),
  pAnswer("y8-geo-par-p27", "Parallel lines. One co-interior angle exceeds the other by 40°. Find the smaller angle in degrees.", "x + (x + 40) = 180", "70", "2x + 40 = 180, so 2x = 140, x = 70°.", 5, ["70°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. Two co-interior angles on the same side labelled x degrees and (x + 40) degrees.", { BR: "x" }, { TR: "(x+40)°" })),
  pAnswer("y8-geo-par-p28", "Parallel lines. Alternate angles: (10x − 30)° = (6x + 50)°. Find the angle in degrees.", "10x - 30 = 6x + 50", "170", "4x = 80, x = 20. Angle = 10(20) − 30 = 170°.", 5, ["170°"], undefined, undefined,
    transversalFig("Transversal crossing two parallel lines. An alternate pair (Z-shape) labelled (10x − 30) degrees and (6x + 50) degrees.", { BL: "(10x-30)°" }, { TR: "(6x+50)°" })),
];

parallelLinesTransversals.multiPartPractice = [
  {
    id: "y8-geo-par-mp1",
    prompt:
      "Two parallel lines AB and CD are cut by a transversal (chevrons mark the parallels). At the upper line the transversal makes an angle of 68° measured above the line on the right of the crossing point.",
    latex: "AB \\parallel CD,\\quad \\text{given angle} = 68^\\circ",
    angleFigureDiagram: transversalFig(
      "Transversal crossing two parallel lines AB (upper) and CD (lower). The given 68 degree angle on the right at the upper line, with the corresponding, alternate and co-interior positions at the lower line marked for reading.",
      { BR: "68°" },
      { BR: "corr.", TL: "alt.", TR: "co-int." },
      ["AB", "CD"]
    ),
    answer: "112",
    hint: "Corresponding angles are equal; alternate angles are equal; co-interior angles sum to 180°.",
    explanation:
      "The corresponding angle at the lower line is 68°. The alternate angle at the lower line is also 68°. The co-interior angle is 180 − 68 = 112°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the corresponding angle at the lower line in degrees.",
        latex: "\\text{corresponding} = \\;?",
        marks: 1,
        answer: "68",
        acceptedAnswers: ["68°"],
        hint: "Corresponding angles are equal when lines are parallel.",
        explanation: "Corresponding angles are equal, so it is 68°.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the alternate angle at the lower line in degrees.",
        latex: "\\text{alternate} = \\;?",
        marks: 1,
        answer: "68",
        acceptedAnswers: ["68°"],
        hint: "Alternate angles are equal when lines are parallel.",
        explanation: "Alternate angles are equal, so it is 68°.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the co-interior angle on the same side of the transversal in degrees.",
        latex: "\\text{co-interior} = \\;?",
        marks: 2,
        answer: "112",
        acceptedAnswers: ["112°"],
        hint: "Co-interior angles are supplementary.",
        explanation: "Co-interior angles sum to 180°: 180 − 68 = 112°.",
      },
    ],
  },
];

// Lesson 3: Angles in Triangles and Quadrilaterals
anglesTrianglesQuadrilaterals.masteryQuizPool = [
  // D1
  pAnswer("y8-geo-tri-p1", "Triangle angles 60° and 70°. Find the third in degrees.", "60 + 70 + x = 180", "50", "x = 180 − 130 = 50°.", 1, ["50°"]),
  pAnswer("y8-geo-tri-p2", "Triangle angles 90° and 45°. Find the third in degrees.", "90 + 45 + x = 180", "45", "x = 180 − 135 = 45°.", 1, ["45°"]),
  pAnswer("y8-geo-tri-p3", "Quadrilateral angles 90°, 90°, 90°, and x°. Find x.", "90 + 90 + 90 + x = 360", "90", "x = 360 − 270 = 90°.", 1, ["90°"]),
  pAnswer("y8-geo-tri-p4", "Triangle angles 30° and 80°. Find the third in degrees.", "30 + 80 + x = 180", "70", "x = 180 − 110 = 70°.", 1, ["70°"]),
  pAnswer("y8-geo-tri-p5", "Each angle of an equilateral triangle is how many degrees?", "180 \\div 3", "60", "180 ÷ 3 = 60°.", 1, ["60°"]),
  // D2
  pAnswer("y8-geo-tri-p6", "An exterior angle is 120°. One non-adjacent interior angle is 70°. Find the other in degrees.", "x + 70 = 120", "50", "x = 120 − 70 = 50°.", 2, ["50°"]),
  pAnswer("y8-geo-tri-p7", "Quadrilateral angles 80°, 100°, 70°, and x°. Find x.", "80 + 100 + 70 + x = 360", "110", "x = 360 − 250 = 110°.", 2, ["110°"]),
  pAnswer("y8-geo-tri-p8", "An isosceles triangle has base angles of 48° each. Find the apex angle in degrees.", "48 + 48 + x = 180", "84", "x = 180 − 96 = 84°.", 2, ["84°"]),
  pAnswer("y8-geo-tri-p9", "A right-angled triangle has one acute angle of 52°. Find the other acute angle in degrees.", "90 + 52 + x = 180", "38", "x = 180 − 142 = 38°.", 2, ["38°"]),
  pChoice("y8-geo-tri-p10", "The angle sum of a triangle is:", "B", ["90°", "180°", "270°", "360°"], "A triangle's interior angles sum to 180°.", 2),
  pAnswer("y8-geo-tri-p11", "An exterior angle is 140°. One non-adjacent interior angle is 65°. Find the other in degrees.", "x + 65 = 140", "75", "x = 140 − 65 = 75°.", 2, ["75°"]),
  // D3
  pAnswer("y8-geo-tri-p12", "An isosceles triangle has an apex angle of 40°. Find each base angle in degrees.", "40 + 2x = 180", "70", "2x = 140, so each base angle = 70°.", 3, ["70°"]),
  pAnswer("y8-geo-tri-p13", "Triangle angles x°, x°, and 80°. Find x.", "x + x + 80 = 180", "50", "2x = 100, so x = 50.", 3, ["50°"]),
  pAnswer("y8-geo-tri-p14", "Quadrilateral angles 2x°, 2x°, x°, and x°. Find x.", "2x + 2x + x + x = 360", "60", "6x = 360, so x = 60.", 3, ["60°"]),
  pChoice("y8-geo-tri-p15", "A triangle has angles 100°, 50°, and 30°. It is best described as:", "C", ["Right-angled", "Equilateral", "Obtuse-angled", "Isosceles"], "It contains a 100° angle, which is obtuse.", 3),
  pAnswer("y8-geo-tri-p16", "An exterior angle of a triangle equals 130° and the two non-adjacent interior angles are equal. Find each in degrees.", "2a = 130", "65", "Each = 130 ÷ 2 = 65°.", 3, ["65°"]),
  pAnswer("y8-geo-tri-p17", "Triangle angles 3x°, 4x°, and 5x°. Find the largest angle in degrees.", "3x + 4x + 5x = 180", "75", "12x = 180, x = 15. Largest = 5 × 15 = 75°.", 3, ["75°"]),
  // D4
  pAnswer("y8-geo-tri-p18", "Triangle angles (x + 10)°, (x + 20)°, and (x + 30)°. Find x.", "(x+10)+(x+20)+(x+30) = 180", "40", "3x + 60 = 180, so 3x = 120, x = 40.", 4, ["40°"]),
  pAnswer("y8-geo-tri-p19", "Quadrilateral angles (x)°, (x + 20)°, (x + 40)°, and (x + 60)°. Find x.", "x+(x+20)+(x+40)+(x+60) = 360", "60", "4x + 120 = 360, so 4x = 240, x = 60.", 4, ["60°"]),
  pAnswer("y8-geo-tri-p20", "An exterior angle of a triangle is (3x)° and equals the sum of interior angles (2x)° and 40°. Find x.", "3x = 2x + 40", "40", "3x = 2x + 40, so x = 40.", 4, ["40°"]),
  pAnswer("y8-geo-tri-p21", "Triangle angles 2x°, 3x°, and (x + 20)°. Find x.", "2x + 3x + (x+20) = 180", "26.67", "6x + 20 = 180, so 6x = 160, x ≈ 26.67.", 4, ["26.67°", "80/3"]),
  pAnswer("y8-geo-tri-p22", "A right-angled triangle has acute angles in the ratio 2 : 1. Find the larger acute angle in degrees.", "2k + k = 90", "60", "3k = 90, k = 30. Larger = 2 × 30 = 60°.", 4, ["60°"]),
  pAnswer("y8-geo-tri-p23", "Quadrilateral angles 3x°, 3x°, 2x°, and 2x°. Find the largest angle in degrees.", "3x + 3x + 2x + 2x = 360", "108", "10x = 360, x = 36. Largest = 3 × 36 = 108°.", 4, ["108°"]),
  // D5
  pAnswer("y8-geo-tri-p24", "The angles of a triangle are in the ratio 2 : 3 : 4. Find the largest angle in degrees.", "2k + 3k + 4k = 180", "80", "9k = 180, k = 20. Largest = 4 × 20 = 80°.", 5, ["80°"]),
  pAnswer("y8-geo-tri-p25", "The angles of a quadrilateral are in the ratio 1 : 2 : 3 : 4. Find the largest angle in degrees.", "k + 2k + 3k + 4k = 360", "144", "10k = 360, k = 36. Largest = 4 × 36 = 144°.", 5, ["144°"]),
  pAnswer("y8-geo-tri-p26", "In a triangle, the second angle is double the first and the third is 30° more than the first. Find the first angle in degrees.", "x + 2x + (x + 30) = 180", "37.5", "4x + 30 = 180, so 4x = 150, x = 37.5°.", 5, ["37.5°"]),
  pAnswer("y8-geo-tri-p27", "An exterior angle of a triangle is 5 times the smaller of its two non-adjacent interior angles, and the larger of those interior angles is 80°. Find the smaller interior angle in degrees.", "5x = x + 80", "20", "Exterior = 5x = x + 80, so 4x = 80, x = 20°.", 5, ["20°"]),
  pAnswer("y8-geo-tri-p28", "A quadrilateral has three equal angles and a fourth angle of 120°. Find each of the three equal angles in degrees.", "3x + 120 = 360", "80", "3x = 240, so each = 80°.", 5, ["80°"]),
];

anglesTrianglesQuadrilaterals.multiPartPractice = [
  {
    id: "y8-geo-tri-mp1",
    prompt:
      "In triangle ABC the side BC is extended to a point D, forming an exterior angle ∠ACD. It is given that ∠ABC = 50° and ∠BAC = 60° as shown.",
    latex: "\\angle ABC = 50^\\circ,\\quad \\angle BAC = 60^\\circ",
    triangleDiagram: triAngles(
      "Triangle ABC with apex A marked 60 degrees, base vertex B marked 50 degrees, and base vertex C (whose interior angle is unknown), with side BC able to be extended to D to form exterior angle ACD.",
      { A: "60°", B: "50°", C: "?" }
    ),
    answer: "110",
    hint: "Use the triangle angle sum (180°) and the exterior-angle theorem.",
    explanation:
      "∠ACB = 180 − 50 − 60 = 70°. The exterior angle ∠ACD = 50 + 60 = 110° (sum of the two non-adjacent interior angles), which also equals 180 − 70.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the interior angle ∠ACB in degrees.",
        latex: "\\angle ACB = \\;?",
        marks: 1,
        answer: "70",
        acceptedAnswers: ["70°"],
        hint: "The angles of a triangle sum to 180°.",
        explanation: "∠ACB = 180 − 50 − 60 = 70°.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the exterior angle ∠ACD in degrees.",
        latex: "\\angle ACD = \\;?",
        marks: 1,
        answer: "110",
        acceptedAnswers: ["110°"],
        hint: "Exterior angle = sum of the two non-adjacent interior angles.",
        explanation: "∠ACD = 50 + 60 = 110°.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "A quadrilateral is formed by adding angles 50°, 60°, 70° and one more angle. Find the fourth angle in degrees.",
        latex: "50 + 60 + 70 + x = 360",
        marks: 1,
        answer: "180",
        acceptedAnswers: ["180°"],
        hint: "The angles of a quadrilateral sum to 360°.",
        explanation: "x = 360 − 180 = 180°.",
      },
    ],
  },
];

// Lesson 4: Properties of Polygons
propertiesOfPolygons.masteryQuizPool = [
  // D1
  pAnswer("y8-geo-pol-p1", "Find the interior angle sum of a quadrilateral (4 sides).", "(4-2) \\times 180", "360", "(4 − 2) × 180 = 360°.", 1, ["360°"]),
  pAnswer("y8-geo-pol-p2", "Find the interior angle sum of a pentagon (5 sides).", "(5-2) \\times 180", "540", "(5 − 2) × 180 = 540°.", 1, ["540°"]),
  pAnswer("y8-geo-pol-p3", "Find each exterior angle of a regular quadrilateral (square).", "360 \\div 4", "90", "360 ÷ 4 = 90°.", 1, ["90°"]),
  pAnswer("y8-geo-pol-p4", "Find the interior angle sum of a hexagon (6 sides).", "(6-2) \\times 180", "720", "(6 − 2) × 180 = 720°.", 1, ["720°"]),
  pAnswer("y8-geo-pol-p5", "Find each exterior angle of a regular pentagon.", "360 \\div 5", "72", "360 ÷ 5 = 72°.", 1, ["72°"]),
  // D2
  pAnswer("y8-geo-pol-p6", "Find each interior angle of a regular octagon (8 sides).", "\\frac{(8-2)\\times180}{8}", "135", "(8 − 2) × 180 = 1080; 1080 ÷ 8 = 135°.", 2, ["135°"]),
  pAnswer("y8-geo-pol-p7", "Find each exterior angle of a regular decagon (10 sides).", "360 \\div 10", "36", "360 ÷ 10 = 36°.", 2, ["36°"]),
  pAnswer("y8-geo-pol-p8", "A regular polygon has each exterior angle of 45°. How many sides?", "360 \\div 45", "8", "n = 360 ÷ 45 = 8 sides.", 2, ["8 sides"]),
  pAnswer("y8-geo-pol-p9", "Find the interior angle sum of an octagon (8 sides).", "(8-2) \\times 180", "1080", "(8 − 2) × 180 = 1080°.", 2, ["1080°"]),
  pChoice("y8-geo-pol-p10", "The exterior angles of any convex polygon sum to:", "B", ["180°", "360°", "(n−2)×180°", "Depends on n"], "Always 360°.", 2),
  pAnswer("y8-geo-pol-p11", "Find each interior angle of a regular pentagon.", "\\frac{540}{5}", "108", "540 ÷ 5 = 108°.", 2, ["108°"]),
  // D3
  pAnswer("y8-geo-pol-p12", "A regular polygon has each exterior angle of 24°. How many sides?", "360 \\div 24", "15", "n = 360 ÷ 24 = 15 sides.", 3, ["15 sides"]),
  pAnswer("y8-geo-pol-p13", "Find each interior angle of a regular 15-sided polygon.", "\\frac{(15-2)\\times180}{15}", "156", "(15 − 2) × 180 = 2340; 2340 ÷ 15 = 156°.", 3, ["156°"]),
  pAnswer("y8-geo-pol-p14", "A regular polygon has each interior angle of 144°. How many sides?", "\\frac{(n-2)180}{n} = 144", "10", "180n − 360 = 144n → 36n = 360 → n = 10.", 3, ["10 sides"]),
  pAnswer("y8-geo-pol-p15", "The interior angle sum of a polygon is 1260°. How many sides does it have?", "(n-2) \\times 180 = 1260", "9", "n − 2 = 7, so n = 9.", 3, ["9 sides"]),
  pAnswer("y8-geo-pol-p16", "Find each interior angle of a regular 18-sided polygon.", "\\frac{(18-2)\\times180}{18}", "160", "(18 − 2) × 180 = 2880; 2880 ÷ 18 = 160°.", 3, ["160°"]),
  pAnswer("y8-geo-pol-p17", "A regular polygon has each interior angle of 150°. Find each exterior angle in degrees.", "180 - 150", "30", "Interior and exterior are supplementary: 180 − 150 = 30°.", 3, ["30°"]),
  // D4
  pAnswer("y8-geo-pol-p18", "A regular polygon has each interior angle of 162°. How many sides?", "\\frac{(n-2)180}{n} = 162", "20", "180n − 360 = 162n → 18n = 360 → n = 20.", 4, ["20 sides"]),
  pAnswer("y8-geo-pol-p19", "The interior angle sum of a polygon is 1800°. How many sides?", "(n-2) \\times 180 = 1800", "12", "n − 2 = 10, so n = 12.", 4, ["12 sides"]),
  pAnswer("y8-geo-pol-p20", "A regular polygon has each exterior angle of 18°. Find each interior angle in degrees.", "180 - 18", "162", "180 − 18 = 162°.", 4, ["162°"]),
  pAnswer("y8-geo-pol-p21", "A regular polygon has each interior angle of 156°. Find the number of sides.", "\\frac{360}{180-156}", "15", "Exterior = 180 − 156 = 24°; n = 360 ÷ 24 = 15.", 4, ["15 sides"]),
  pAnswer("y8-geo-pol-p22", "The interior angle sum of a polygon is 2340°. How many sides?", "(n-2) \\times 180 = 2340", "15", "n − 2 = 13, so n = 15.", 4, ["15 sides"]),
  pAnswer("y8-geo-pol-p23", "A regular polygon has 24 sides. Find each interior angle in degrees.", "\\frac{(24-2)\\times180}{24}", "165", "(24 − 2) × 180 = 3960; 3960 ÷ 24 = 165°.", 4, ["165°"]),
  // D5
  pAnswer("y8-geo-pol-p24", "Each interior angle of a regular polygon is 5 times its exterior angle. How many sides?", "180 = 6 \\times \\text{ext}", "12", "Interior + exterior = 180 and interior = 5 × exterior, so 6 × exterior = 180, exterior = 30°, n = 360 ÷ 30 = 12.", 5, ["12 sides"]),
  pAnswer("y8-geo-pol-p25", "The interior angle of a regular polygon is 168°. How many sides?", "\\frac{360}{180-168}", "30", "Exterior = 12°; n = 360 ÷ 12 = 30.", 5, ["30 sides"]),
  pAnswer("y8-geo-pol-p26", "A regular polygon has an interior angle sum of 3240°. Find each interior angle in degrees.", "\\frac{3240}{n},\\; n-2 = 18", "162", "n − 2 = 18, so n = 20; 3240 ÷ 20 = 162°.", 5, ["162°"]),
  pAnswer("y8-geo-pol-p27", "The interior angle of a regular polygon is 4 times the exterior angle. Find the interior angle in degrees.", "i = 4e,\\; i + e = 180", "144", "5e = 180, e = 36, so interior = 4 × 36 = 144°.", 5, ["144°"]),
  pAnswer("y8-geo-pol-p28", "A regular polygon has each exterior angle equal to one-eighth of its interior angle. How many sides?", "i = 8e,\\; i + e = 180", "18", "Exterior = interior ÷ 8 → i = 8e and i + e = 180, so 9e = 180, e = 20°; n = 360 ÷ 20 = 18.", 5, ["18 sides"]),
];

propertiesOfPolygons.multiPartPractice = [
  {
    id: "y8-geo-pol-mp1",
    prompt:
      "A regular polygon has 9 sides (a nonagon). Use the interior angle sum formula (n − 2) × 180° and the exterior angle sum of 360°.",
    latex: "n = 9",
    answer: "140",
    hint: "Interior sum = (n − 2) × 180°; each interior = sum ÷ n; each exterior = 360° ÷ n.",
    explanation:
      "Interior sum = (9 − 2) × 180 = 1260°. Each interior angle = 1260 ÷ 9 = 140°. Each exterior angle = 360 ÷ 9 = 40° (and 180 − 140 = 40 confirms this).",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the interior angle sum of the nonagon in degrees.",
        latex: "(9-2) \\times 180 = \\;?",
        marks: 1,
        answer: "1260",
        acceptedAnswers: ["1260°"],
        hint: "Use (n − 2) × 180° with n = 9.",
        explanation: "(9 − 2) × 180 = 1260°.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find each interior angle of the regular nonagon in degrees.",
        latex: "\\frac{1260}{9} = \\;?",
        marks: 1,
        answer: "140",
        acceptedAnswers: ["140°"],
        hint: "Divide the interior sum by the number of sides.",
        explanation: "1260 ÷ 9 = 140°.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find each exterior angle of the regular nonagon in degrees.",
        latex: "\\frac{360}{9} = \\;?",
        marks: 1,
        answer: "40",
        acceptedAnswers: ["40°"],
        hint: "Exterior angle = 360° ÷ n.",
        explanation: "360 ÷ 9 = 40°.",
      },
    ],
  },
];

// Lesson 5: Congruent Triangles
congruentTriangles.masteryQuizPool = [
  // D1
  pAnswer("y8-geo-con-p1", "Three pairs of equal sides. Name the congruence test (3 letters).", "\\text{three equal sides}", "SSS", "Three equal sides → SSS.", 1, ["sss"]),
  pAnswer("y8-geo-con-p2", "Two sides and the included angle equal. Name the congruence test.", "\\text{two sides + included angle}", "SAS", "Two sides + included angle → SAS.", 1, ["sas"]),
  pAnswer("y8-geo-con-p3", "Right angle, hypotenuse and one side equal. Name the test.", "\\text{RH + side}", "RHS", "Right angle, Hypotenuse, Side → RHS.", 1, ["rhs"]),
  pAnswer("y8-geo-con-p4", "Two angles and a corresponding side equal. Name the test.", "\\text{two angles + side}", "AAS", "Two angles + corresponding side → AAS.", 1, ["aas"]),
  pChoice("y8-geo-con-p5", "Which is NOT a valid congruence test?", "C", ["SSS", "SAS", "AAA", "RHS"], "AAA proves similarity, not congruence.", 1),
  // D2
  pChoice("y8-geo-con-p6", "SAS requires the equal angle to be:", "A", ["Between the two equal sides", "Opposite the longest side", "A right angle", "Anywhere"], "The angle in SAS must be the included angle.", 2),
  pChoice("y8-geo-con-p7", "The 'H' in RHS stands for:", "B", ["Height", "Hypotenuse", "Half", "Horizontal"], "RHS = Right angle, Hypotenuse, Side.", 2),
  pAnswer("y8-geo-con-p8", "△ABC ≅ △DEF. Side AB corresponds to which side of △DEF?", "\\text{matching order A↔D, B↔E}", "DE", "A↔D and B↔E, so AB ↔ DE.", 2, ["de"]),
  pAnswer("y8-geo-con-p9", "△PQR ≅ △XYZ. Angle Q corresponds to which angle?", "\\text{Q↔Y}", "Y", "Q is the 2nd vertex, matching Y.", 2, ["angle Y", "∠Y"]),
  pChoice("y8-geo-con-p10", "AAA proves that two triangles are:", "C", ["Congruent", "Equal in area", "Similar", "Right-angled"], "Equal angles give similar triangles (same shape, possibly different size).", 2),
  pAnswer("y8-geo-con-p11", "Two right triangles have equal hypotenuses and one equal leg. Are they congruent? Enter yes or no.", "\\text{RHS test}", "yes", "This is the RHS test, so they are congruent.", 2, ["Yes"]),
  // D3
  pAnswer("y8-geo-con-p12", "△ABC ≅ △DEF with AB = 6, BC = 8, CA = 10. Find DE.", "DE = AB", "6", "DE corresponds to AB, so DE = 6.", 3, ["6 cm"]),
  pAnswer("y8-geo-con-p13", "△ABC ≅ △PQR. ∠A = 70°, ∠B = 60°. Find ∠R.", "\\angle R = \\angle C = 180 - 70 - 60", "50", "∠C = 180 − 70 − 60 = 50°; C↔R so ∠R = 50°.", 3, ["50°"]),
  pChoice("y8-geo-con-p14", "Why does SSA not generally prove congruence?", "B", ["Sides cannot be measured", "It can produce two different triangles", "It needs a right angle", "It only works for squares"], "SSA (non-included angle) is ambiguous and may give two triangles.", 3),
  pAnswer("y8-geo-con-p15", "△ABC ≅ △DEF. AC = 9 cm, and DF corresponds to AC. Find DF in cm.", "DF = AC", "9", "DF corresponds to AC, so DF = 9 cm.", 3, ["9 cm"]),
  pAnswer("y8-geo-con-p16", "Two triangles have all three pairs of sides 5, 12, 13. Which test proves congruence?", "\\text{three equal sides}", "SSS", "All three sides equal → SSS.", 3, ["sss"]),
  pAnswer("y8-geo-con-p17", "△ABC ≅ △PQR. ∠B = 48° and ∠C = 62°. Find ∠P.", "\\angle P = 180 - 48 - 62", "70", "∠A = 180 − 48 − 62 = 70°; A↔P, so ∠P = 70°.", 3, ["70°"]),
  // D4
  pAnswer("y8-geo-con-p18", "△ABC ≅ △DEF. ∠D = (2x)° and ∠A = 50°. Find x.", "2x = 50", "25", "Corresponding angles are equal: 2x = 50, x = 25.", 4, ["25°"]),
  pAnswer("y8-geo-con-p19", "△ABC ≅ △PQR. AB = (3x − 4) cm and PQ = 11 cm. Find x.", "3x - 4 = 11", "5", "AB = PQ: 3x − 4 = 11, so 3x = 15, x = 5.", 4, ["5 cm"]),
  pAnswer("y8-geo-con-p20", "△ABC ≅ △DEF. ∠A = 55°, ∠E = 65°. Find ∠C.", "\\angle C = 180 - 55 - 65", "60", "∠B = ∠E = 65°. ∠C = 180 − 55 − 65 = 60°.", 4, ["60°"]),
  pAnswer("y8-geo-con-p21", "△ABC ≅ △DEF. BC = (4x + 1) and EF = (2x + 9). Find BC.", "4x + 1 = 2x + 9", "17", "4x + 1 = 2x + 9, so 2x = 8, x = 4; BC = 4(4)+1 = 17.", 4, ["17 cm"]),
  pAnswer("y8-geo-con-p22", "An isosceles triangle is split by its axis of symmetry into two congruent right triangles. If the apex angle is 50°, find the half-apex angle in each right triangle in degrees.", "50 \\div 2", "25", "The axis bisects the apex: 50 ÷ 2 = 25°.", 4, ["25°"]),
  pAnswer("y8-geo-con-p23", "△ABC ≅ △PQR. ∠P = (3x + 10)° and ∠A = (x + 40)°. Find x.", "3x + 10 = x + 40", "15", "3x + 10 = x + 40, so 2x = 30, x = 15.", 4, ["15°"]),
  // D5
  pAnswer("y8-geo-con-p24", "△ABC ≅ △DEF. The perimeter of △ABC is 30 cm, with AB = 8 cm and BC = 11 cm. Find DF (corresponding to CA) in cm.", "CA = 30 - 8 - 11", "11", "CA = 30 − 8 − 11 = 11 cm; DF corresponds to CA, so DF = 11 cm.", 5, ["11 cm"]),
  pAnswer("y8-geo-con-p25", "△ABC ≅ △PQR. ∠A = (2x + 10)°, ∠B = (3x)°, ∠C = (x + 20)°. Find x.", "(2x+10)+(3x)+(x+20) = 180", "25", "6x + 30 = 180, so 6x = 150, x = 25.", 5, ["25°"]),
  pAnswer("y8-geo-con-p26", "Two congruent triangles each have area such that together they form a rectangle of area 48 cm². Find the area of one triangle in cm².", "48 \\div 2", "24", "Each triangle is half the rectangle: 48 ÷ 2 = 24 cm².", 5, ["24"]),
  pAnswer("y8-geo-con-p27", "△ABC ≅ △DEF. ∠A = 90°, ∠B = (5x)° and ∠C = (4x)°. Find x.", "90 + 5x + 4x = 180", "10", "9x = 90, so x = 10.", 5, ["10°"]),
  pAnswer("y8-geo-con-p28", "△ABC ≅ △DEF with AB = (2x + 3) cm and the corresponding side DE = 13 cm. Find x.", "2x + 3 = 13", "5", "AB = DE: 2x + 3 = 13, so 2x = 10, x = 5.", 5, ["5"]),
];

congruentTriangles.multiPartPractice = [
  {
    id: "y8-geo-con-mp1",
    prompt:
      "In triangles ABC and DEF it is given that AB = DE, BC = EF and the included angles are equal: ∠ABC = ∠DEF. Triangle ABC (shown) has ∠BAC = 58° and ∠BCA = 74°.",
    latex: "AB = DE,\\; BC = EF,\\; \\angle ABC = \\angle DEF",
    triangleDiagram: triAngles(
      "Triangle ABC with angle BAC = 58 degrees at A, angle BCA = 74 degrees at C, and angle ABC unknown at B.",
      { A: "58°", C: "74°", B: "?" }
    ),
    answer: "48",
    hint: "Identify the congruence test from the data; then use corresponding parts and the triangle angle sum.",
    explanation:
      "Two sides and the included angle are equal, so △ABC ≅ △DEF by SAS. ∠ABC = 180 − 58 − 74 = 48°. Because the triangles are congruent, ∠DEF = ∠ABC = 48°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find ∠ABC in degrees.",
        latex: "\\angle ABC = \\;?",
        marks: 1,
        answer: "48",
        acceptedAnswers: ["48°"],
        hint: "Use the triangle angle sum (180°).",
        explanation: "∠ABC = 180 − 58 − 74 = 48°.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "By congruence, find ∠DEF in degrees.",
        latex: "\\angle DEF = \\;?",
        marks: 1,
        answer: "48",
        acceptedAnswers: ["48°"],
        hint: "Corresponding angles of congruent triangles are equal.",
        explanation: "∠DEF corresponds to ∠ABC, so ∠DEF = 48°.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "If DE = 9 cm and AB corresponds to DE, find AB in cm.",
        latex: "AB = \\;?",
        marks: 1,
        answer: "9",
        acceptedAnswers: ["9 cm"],
        hint: "Corresponding sides of congruent triangles are equal.",
        explanation: "AB corresponds to DE, so AB = 9 cm.",
      },
    ],
  },
];

// Lesson 6: Geometric Reasoning
geometricReasoning.masteryQuizPool = [
  // D1
  pAnswer("y8-geo-rea-p1", "Triangle angles 40°, 60°, and x°. Find x.", "40 + 60 + x = 180", "80", "x = 180 − 100 = 80°.", 1, ["80°"]),
  pAnswer("y8-geo-rea-p2", "Parallel lines. An alternate angle is 50°. Find the other in degrees.", "\\text{alternate: equal}", "50", "Alternate angles are equal.", 1, ["50°"]),
  pAnswer("y8-geo-rea-p3", "Two lines intersect. One angle is 85°. Find its vertically opposite angle in degrees.", "\\text{vertically opposite}", "85", "Vertically opposite angles are equal.", 1, ["85°"]),
  pAnswer("y8-geo-rea-p4", "Parallel lines. One co-interior angle is 95°. Find the other in degrees.", "95 + x = 180", "85", "180 − 95 = 85°.", 1, ["85°"]),
  pAnswer("y8-geo-rea-p5", "Quadrilateral angles 90°, 100°, 80°, and x°. Find x.", "90 + 100 + 80 + x = 360", "90", "x = 360 − 270 = 90°.", 1, ["90°"]),
  // D2
  pAnswer("y8-geo-rea-p6", "A triangle has a right angle and one angle of 35°. Find the third angle in degrees.", "90 + 35 + x = 180", "55", "x = 180 − 125 = 55°.", 2, ["55°"]),
  pAnswer("y8-geo-rea-p7", "An exterior angle of a triangle is 100° and one non-adjacent interior angle is 45°. Find the other in degrees.", "x + 45 = 100", "55", "x = 100 − 45 = 55°.", 2, ["55°"]),
  pChoice("y8-geo-rea-p8", "A correct reason for two equal angles in matching positions at parallel lines is:", "B", ["Vertically opposite angles", "Corresponding angles", "Co-interior angles", "Angle sum of a triangle"], "Matching positions = corresponding angles.", 2),
  pAnswer("y8-geo-rea-p9", "Parallel lines. An angle is 124°. Find its co-interior partner in degrees.", "124 + x = 180", "56", "180 − 124 = 56°.", 2, ["56°"]),
  pAnswer("y8-geo-rea-p10", "A polygon has 6 sides. Find its interior angle sum in degrees.", "(6-2) \\times 180", "720", "(6 − 2) × 180 = 720°.", 2, ["720°"]),
  // D3
  pAnswer("y8-geo-rea-p11", "Parallel lines. Corresponding angles: (2x + 5)° = (x + 35)°. Find x.", "2x + 5 = x + 35", "30", "2x + 5 = x + 35, so x = 30.", 3, ["30°"]),
  pAnswer("y8-geo-rea-p12", "A triangle has angles x°, (x + 10)°, and (x + 20)°. Find x.", "x + (x+10) + (x+20) = 180", "50", "3x + 30 = 180, so 3x = 150, x = 50.", 3, ["50°"]),
  pAnswer("y8-geo-rea-p13", "Two lines intersect. One angle is (4x)° and its vertically opposite is (x + 60)°. Find x.", "4x = x + 60", "20", "4x = x + 60, so 3x = 60, x = 20.", 3, ["20°"]),
  pAnswer("y8-geo-rea-p14", "Parallel lines. Co-interior angles 4x° and (x + 30)°. Find x.", "4x + (x+30) = 180", "30", "5x + 30 = 180, so 5x = 150, x = 30.", 3, ["30°"]),
  pAnswer("y8-geo-rea-p15", "A quadrilateral has angles 3x°, 3x°, 2x°, and 2x°. Find x.", "3x + 3x + 2x + 2x = 360", "36", "10x = 360, so x = 36.", 3, ["36°"]),
  pAnswer("y8-geo-rea-p16", "An exterior angle of a triangle is 140° and the two non-adjacent interior angles are equal. Find each in degrees.", "2a = 140", "70", "Each = 140 ÷ 2 = 70°.", 3, ["70°"]),
  // D4
  pAnswer("y8-geo-rea-p17", "A triangle has angles (2x + 5)°, (3x − 10)°, and 95°. Find x.", "(2x+5) + (3x-10) + 95 = 180", "18", "5x + 90 = 180, so 5x = 90, x = 18.", 4, ["18°"]),
  pAnswer("y8-geo-rea-p18", "Parallel lines. Co-interior angles (3x + 20)° and (2x + 10)°. Find x.", "(3x+20) + (2x+10) = 180", "30", "5x + 30 = 180, so 5x = 150, x = 30.", 4, ["30°"]),
  pAnswer("y8-geo-rea-p19", "Quadrilateral ABCD: angles 2x°, 3x°, 4x°, and 6x°. Find the largest angle in degrees.", "2x + 3x + 4x + 6x = 360", "144", "15x = 360, x = 24. Largest = 6 × 24 = 144°.", 4, ["144°"]),
  pAnswer("y8-geo-rea-p20", "A triangle has angles (x + 15)°, (2x)°, and (3x − 15)°. Find the largest angle in degrees.", "(x+15)+2x+(3x-15) = 180", "75", "6x = 180, x = 30. Largest = 3(30) − 15 = 75°.", 4, ["75°"]),
  pAnswer("y8-geo-rea-p21", "Two lines intersect. One angle is (5x + 8)° and the adjacent angle on the straight line is (4x + 1)°. Find x.", "(5x+8) + (4x+1) = 180", "19", "9x + 9 = 180, so 9x = 171, x = 19.", 4, ["19°"]),
  pAnswer("y8-geo-rea-p22", "Parallel lines. Alternate angles (6x − 5)° = (4x + 25)°. Find the angle in degrees.", "6x - 5 = 4x + 25", "85", "2x = 30, x = 15. Angle = 6(15) − 5 = 85°.", 4, ["85°"]),
  // D5
  pAnswer("y8-geo-rea-p23", "AB ∥ CD. A transversal makes an angle of 3x° with AB. The co-interior angle at CD is (2x + 40)°. Find x.", "3x + (2x+40) = 180", "28", "5x + 40 = 180, so 5x = 140, x = 28.", 5, ["28°"]),
  pAnswer("y8-geo-rea-p24", "A triangle's angles are in the ratio 3 : 4 : 5, and an exterior angle is taken at the largest interior angle. Find that exterior angle in degrees.", "3k+4k+5k = 180,\\; \\text{ext} = 180 - 5k", "105", "12k = 180, k = 15; largest interior = 75°; exterior = 180 − 75 = 105°.", 5, ["105°"]),
  pAnswer("y8-geo-rea-p25", "AB ∥ CD. ∠x and ∠y are co-interior, with ∠x exceeding ∠y by 50°. Find ∠x in degrees.", "y + (y+50) = 180", "115", "2y + 50 = 180, y = 65, so ∠x = 115°.", 5, ["115°"]),
  pAnswer("y8-geo-rea-p26", "In triangle ABC, ∠A = 2∠B and ∠C = ∠B + 30°. Find ∠B in degrees.", "2b + b + (b + 30) = 180", "37.5", "4b + 30 = 180, so 4b = 150, b = 37.5°.", 5, ["37.5°"]),
  pAnswer("y8-geo-rea-p27", "A pentagon has interior angles 100°, 110°, 120°, x°, and x°. Find x.", "100 + 110 + 120 + x + x = 540", "105", "Pentagon sum = 540; 2x = 540 − 330 = 210, so x = 105°.", 5, ["105°"]),
  pAnswer("y8-geo-rea-p28", "Two lines intersect. One angle is (7x − 4)° and its vertically opposite angle is (5x + 20)°. Find that angle in degrees.", "7x - 4 = 5x + 20", "80", "2x = 24, x = 12. Angle = 7(12) − 4 = 80°.", 5, ["80°"]),
];

geometricReasoning.multiPartPractice = [
  {
    id: "y8-geo-rea-mp1",
    prompt:
      "Two parallel lines AB and CD are cut by a transversal at points P (on AB) and Q (on CD), as shown by the chevrons. At P, the transversal makes an angle of 110° with AB on the upper-right. At Q, an unknown angle x lies in the co-interior position with that 110° angle. A separate triangle PQT has its third vertex T with ∠PTQ = 40°.",
    latex: "AB \\parallel CD",
    planeShapeDiagram: parallelAnglesShape(
      "Transversal crossing two parallel lines AB and CD (chevroned). The 110 degree angle at P on the upper line, with the corresponding angle and the co-interior angle x marked at Q on the lower line.",
      { topRight: "110°", bottomRight: "x" }
    ),
    answer: "70",
    hint: "Use corresponding/co-interior angle rules, then the triangle angle sum.",
    explanation:
      "The corresponding angle at Q is 110°. The co-interior angle x = 180 − 110 = 70°. In triangle PQT, if two angles are 70° and 40°, the third is 180 − 70 − 40 = 70°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the corresponding angle at Q (matching the 110° at P) in degrees.",
        latex: "\\text{corresponding} = \\;?",
        marks: 1,
        answer: "110",
        acceptedAnswers: ["110°"],
        hint: "Corresponding angles are equal when lines are parallel.",
        explanation: "Corresponding angles are equal, so it is 110°.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the co-interior angle x in degrees.",
        latex: "x = \\;?",
        marks: 1,
        answer: "70",
        acceptedAnswers: ["70°"],
        hint: "Co-interior angles are supplementary.",
        explanation: "x = 180 − 110 = 70°.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "In triangle PQT, ∠QPT = 70° and ∠PTQ = 40°. Find ∠PQT in degrees.",
        latex: "70 + 40 + \\angle PQT = 180",
        marks: 1,
        answer: "70",
        acceptedAnswers: ["70°"],
        hint: "The angles of a triangle sum to 180°.",
        explanation: "∠PQT = 180 − 70 − 40 = 70°.",
      },
    ],
  },
];

// Lesson 7: Properties of Special Quadrilaterals
quadrilateralProperties.masteryQuizPool = [
  // D1
  pAnswer("y8-geo-qprop-p1", "In a parallelogram, angle A = 80°. Find the opposite angle C in degrees.", "\\text{opposite angles equal}", "80", "Opposite angles of a parallelogram are equal: 80°.", 1, ["80°"]),
  pAnswer("y8-geo-qprop-p2", "A rhombus has a side of 7 cm. Find the length of each other side in cm.", "\\text{all sides equal}", "7", "All sides of a rhombus are equal: 7 cm.", 1, ["7 cm"]),
  pChoice("y8-geo-qprop-p3", "Which shape has all sides equal AND all angles 90°?", "D", ["Rectangle", "Rhombus", "Parallelogram", "Square"], "A square has both properties.", 1),
  pAnswer("y8-geo-qprop-p4", "In a rectangle, each interior angle is how many degrees?", "\\text{all angles }90^\\circ", "90", "All angles of a rectangle are 90°.", 1, ["90°"]),
  pAnswer("y8-geo-qprop-p5", "The diagonals of a rhombus meet at what angle, in degrees?", "\\text{perpendicular diagonals}", "90", "Rhombus diagonals bisect at right angles: 90°.", 1, ["90°"]),
  // D2
  pAnswer("y8-geo-qprop-p6", "In a parallelogram, one angle is 110°. Find its co-interior (adjacent) angle in degrees.", "110 + x = 180", "70", "Adjacent angles are supplementary: 180 − 110 = 70°.", 2, ["70°"]),
  pAnswer("y8-geo-qprop-p7", "A rectangle has a diagonal of 15 cm. Find the other diagonal in cm.", "\\text{equal diagonals}", "15", "Rectangle diagonals are equal: 15 cm.", 2, ["15 cm"]),
  pChoice("y8-geo-qprop-p8", "Which property is true of a rhombus but not every rectangle?", "B", ["Diagonals bisect each other", "Diagonals meet at 90°", "All angles 90°", "Opposite sides parallel"], "Rhombus diagonals are perpendicular; a rectangle's are not unless it's a square.", 2),
  pAnswer("y8-geo-qprop-p9", "A trapezium has one co-interior angle of 105° between its parallel sides. Find the other in degrees.", "105 + x = 180", "75", "180 − 105 = 75°.", 2, ["75°"]),
  pAnswer("y8-geo-qprop-p10", "In a kite, the longer diagonal bisects a vertex angle into two parts of 35° each. Find the full vertex angle in degrees.", "2 \\times 35", "70", "2 × 35 = 70°.", 2, ["70°"]),
  pChoice("y8-geo-qprop-p11", "A quadrilateral with exactly one pair of parallel sides is a:", "C", ["Parallelogram", "Rhombus", "Trapezium", "Square"], "A trapezium (trapezoid) has exactly one pair of parallel sides.", 2),
  // D3
  pAnswer("y8-geo-qprop-p12", "In rectangle KLMN, diagonal KM = 20 cm and the diagonals meet at O. Find OK in cm.", "OK = \\tfrac{1}{2} KM", "10", "Diagonals bisect each other: OK = ½ × 20 = 10 cm.", 3, ["10 cm"]),
  pAnswer("y8-geo-qprop-p13", "In a rhombus, a diagonal bisects a 96° vertex angle. Find each half-angle in degrees.", "96 \\div 2", "48", "96 ÷ 2 = 48°.", 3, ["48°"]),
  pAnswer("y8-geo-qprop-p14", "In parallelogram ABCD, ∠A = 65°. Find ∠B in degrees.", "65 + \\angle B = 180", "115", "Adjacent angles are supplementary: 180 − 65 = 115°.", 3, ["115°"]),
  pChoice("y8-geo-qprop-p15", "A square is best described as a quadrilateral that is:", "A", ["Both a rectangle and a rhombus", "A rectangle but never a rhombus", "A trapezium only", "Never a parallelogram"], "A square has all the properties of both a rectangle and a rhombus.", 3),
  pAnswer("y8-geo-qprop-p16", "In a kite, one pair of opposite angles is equal. If those equal angles are each 100° and a third angle is 80°, find the fourth angle in degrees.", "100 + 100 + 80 + x = 360", "80", "x = 360 − 280 = 80°.", 3, ["80°"]),
  pAnswer("y8-geo-qprop-p17", "Parallelogram angles 70°, 110°, 70°, and x°. Find x.", "70 + 110 + 70 + x = 360", "110", "x = 360 − 250 = 110°.", 3, ["110°"]),
  // D4
  pAnswer("y8-geo-qprop-p18", "Parallelogram ABCD: ∠A = (2x + 30)° and ∠C = (3x)°. Find x.", "2x + 30 = 3x", "30", "Opposite angles equal: 2x + 30 = 3x, so x = 30.", 4, ["30°"]),
  pAnswer("y8-geo-qprop-p19", "Parallelogram ABCD: ∠A = (4x + 10)° and ∠B = (2x + 20)°. Find x.", "(4x+10) + (2x+20) = 180", "25", "Adjacent angles supplementary: 6x + 30 = 180, so 6x = 150, x = 25.", 4, ["25°"]),
  pAnswer("y8-geo-qprop-p20", "In a rhombus, a diagonal bisects vertex angle into two angles, and one such half-angle is (2x)° while the full vertex angle is 76°. Find x.", "2(2x) = 76", "19", "Full angle = 2 × (2x) = 76, so 4x = 76, x = 19.", 4, ["19°"]),
  pAnswer("y8-geo-qprop-p21", "Trapezium: one co-interior angle is (3x − 10)° and the other is (2x + 40)°. Find x.", "(3x-10) + (2x+40) = 180", "30", "5x + 30 = 180, so 5x = 150, x = 30.", 4, ["30°"]),
  pAnswer("y8-geo-qprop-p22", "Parallelogram ABCD: ∠A = (5x − 5)° and ∠C = (3x + 35)°. Find ∠A in degrees.", "5x - 5 = 3x + 35", "95", "Opposite angles equal: 2x = 40, x = 20; ∠A = 5(20) − 5 = 95°.", 4, ["95°"]),
  pAnswer("y8-geo-qprop-p23", "In rhombus ABCD, ∠A = (2x)°. The diagonal from A splits it into two equal parts of 35° each. Find x.", "2x = 70", "35", "Full ∠A = 2 × 35 = 70°, so 2x = 70, x = 35.", 4, ["35°"]),
  // D5
  pAnswer("y8-geo-qprop-p24", "In a rhombus, the diagonals are perpendicular. One diagonal makes a 28° angle with a side. Find the angle between that diagonal and the other diagonal, in degrees.", "\\text{diagonals perpendicular}", "90", "The diagonals of a rhombus always meet at 90°.", 5, ["90°"]),
  pAnswer("y8-geo-qprop-p25", "Parallelogram ABCD: the angles are in the ratio 2 : 3 : 2 : 3. Find the larger angle in degrees.", "2 \\times (2k + 3k) = 360", "108", "2k + 3k + 2k + 3k = 360, 10k = 360, k = 36; larger = 3 × 36 = 108°.", 5, ["108°"]),
  pAnswer("y8-geo-qprop-p26", "In rhombus ABCD, ∠A = 70°. The diagonal AC bisects ∠A. In triangle ABC, find ∠ACB in degrees, given ∠ABC = 110°.", "35 + 110 + \\angle ACB = 180", "35", "Diagonal bisects ∠A → ∠BAC = 35°. ∠ACB = 180 − 35 − 110 = 35°.", 5, ["35°"]),
  pAnswer("y8-geo-qprop-p27", "A kite has two angles of 90° (where the unequal sides meet) and the other two angles in the ratio 2 : 1. Find the larger of those two angles in degrees.", "90 + 90 + 2k + k = 360", "120", "180 + 3k = 360, 3k = 180, k = 60; larger = 2 × 60 = 120°.", 5, ["120°"]),
  pAnswer("y8-geo-qprop-p28", "In rectangle ABCD, the diagonals meet at O. Triangle AOB is isosceles with OA = OB, and ∠AOB = 50°. Find ∠OAB in degrees.", "50 + 2x = 180", "65", "OA = OB so base angles equal: 2x = 130, x = 65°.", 5, ["65°"]),
];

quadrilateralProperties.multiPartPractice = [
  {
    id: "y8-geo-qprop-mp1",
    prompt:
      "ABCD is a parallelogram (shown) with ∠A = 108°. The diagonals AC and BD intersect at O. Recall that opposite angles are equal, adjacent angles are supplementary, and the diagonals bisect each other.",
    latex: "ABCD \\text{ parallelogram},\\; \\angle A = 108^\\circ",
    planeShapeDiagram: parallelogramAngles(
      "Parallelogram ABCD with opposite sides marked parallel. Angle A is 108 degrees; angles B, C and D are to be found.",
      { A: "108°", B: "?", C: "?", D: "?" }
    ),
    answer: "72",
    hint: "Opposite angles equal; adjacent angles supplementary; diagonals bisect each other.",
    explanation:
      "∠C = ∠A = 108° (opposite angles). ∠B = 180 − 108 = 72° (adjacent angles supplementary). If diagonal BD = 16 cm, then OB = ½ × 16 = 8 cm.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find ∠C in degrees.",
        latex: "\\angle C = \\;?",
        marks: 1,
        answer: "108",
        acceptedAnswers: ["108°"],
        hint: "Opposite angles of a parallelogram are equal.",
        explanation: "∠C = ∠A = 108°.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find ∠B in degrees.",
        latex: "\\angle B = \\;?",
        marks: 1,
        answer: "72",
        acceptedAnswers: ["72°"],
        hint: "Adjacent angles of a parallelogram are supplementary.",
        explanation: "∠B = 180 − 108 = 72°.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "If diagonal BD = 16 cm, find OB in cm.",
        latex: "OB = \\;?",
        marks: 1,
        answer: "8",
        acceptedAnswers: ["8 cm"],
        hint: "The diagonals of a parallelogram bisect each other.",
        explanation: "OB = ½ × 16 = 8 cm.",
      },
    ],
  },
];

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "angle-relationships":              angleRelationships,
  "parallel-lines-transversals":      parallelLinesTransversals,
  "angles-triangles-quadrilaterals":  anglesTrianglesQuadrilaterals,
  "properties-of-polygons":           propertiesOfPolygons,
  "congruent-triangles":              congruentTriangles,
  "geometric-reasoning":              geometricReasoning,
  "quadrilateral-properties":         quadrilateralProperties,
};

export function year8GeometryAnglesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" ||
    unit.slug !== "geometry-angles"
  ) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) return null;

  return {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...content,
  };
}
