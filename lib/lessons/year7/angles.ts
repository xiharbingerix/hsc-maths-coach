import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { AngleFigureDiagram, PlaneShapeDiagram, TriangleDiagram } from "../types";

/** Optional visual payload accepted by the question builders below. */
type AngleDiagram = {
  triangleDiagram?: TriangleDiagram;
  planeShapeDiagram?: PlaneShapeDiagram;
  angleFigureDiagram?: AngleFigureDiagram;
};

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  diagram?: AngleDiagram
): PracticeQuestion {
  const autoVariants: string[] = [];

  if (/^-?\d{4,}$/.test(ans)) {
    autoVariants.push(ans.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(ans)) {
    autoVariants.push(`${ans}.0`);
  }
  if (/^-?\d*\.\d+$/.test(ans)) {
    autoVariants.push(`${ans}0`);
  }
  if (/^0\./.test(ans)) {
    autoVariants.push(ans.slice(1));
  }

  return {
    id,
    prompt,
    latex,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants])),
    hint: "Use the angle relationship rule taught in this lesson.",
    explanation,
    ...diagram,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}",
  diagram?: AngleDiagram
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Consider the key angle rule taught in this lesson before choosing.",
    explanation,
    ...diagram,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Diagram builders — faithful figures for angle questions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A triangle figure whose three interior angles are labelled. Given angles are
 * written as their numeric value (e.g. "48°") and the unknown as "x" (or "?").
 * Vertices use the standard A (top-left), C (bottom-left), B (bottom-right)
 * layout shared with the Pythagoras lessons.
 */
function triFig(
  description: string,
  angleLabels: Partial<Record<"A" | "B" | "C", string>>,
  options: {
    rightAngleAt?: "A" | "B" | "C";
    vertexLabels?: Partial<Record<"A" | "B" | "C", string>>;
    sideLabels?: Partial<Record<"AB" | "BC" | "AC", string>>;
  } = {}
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 90, y: 40 },
      C: { x: 70, y: 230 },
      B: { x: 330, y: 220 },
    },
    angleLabels,
    rightAngleAt: options.rightAngleAt,
    vertexLabels: options.vertexLabels,
    sideLabels: options.sideLabels,
  };
}

/**
 * An isosceles triangle figure (apex at the top, equal base angles), with the
 * two equal sides tick-marked. Angle labels are supplied per vertex.
 */
function isoscelesFig(
  description: string,
  angleLabels: Partial<Record<"A" | "B" | "C", string>>
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 200, y: 40 },
      C: { x: 70, y: 235 },
      B: { x: 330, y: 235 },
    },
    angleLabels,
    highlightedSides: ["AB", "AC"],
  };
}

/** A right-angled triangle whose two acute angles form a complementary pair. */
function complementFig(
  givenLabel: string,
  unknownLabel = "x"
): TriangleDiagram {
  return {
    description: `Right-angled triangle with the right angle at C. The two acute angles, ${givenLabel} and ${unknownLabel}, are complementary (they sum to 90°).`,
    vertices: {
      A: { x: 90, y: 40 },
      C: { x: 90, y: 235 },
      B: { x: 330, y: 235 },
    },
    angleLabels: { A: unknownLabel, B: givenLabel },
    rightAngleAt: "C",
  };
}

/**
 * A general quadrilateral figure (vertices given in y-up natural coordinates,
 * listed anticlockwise) with interior-angle labels. Given angles are numeric,
 * the unknown is "x" / "?".
 */
function quadFig(
  description: string,
  vertices: PlaneShapeDiagram["vertices"],
  edges?: PlaneShapeDiagram["edges"],
  fill: PlaneShapeDiagram["fill"] = "blue"
): PlaneShapeDiagram {
  return { description, vertices, edges, fill };
}

/**
 * A parallelogram figure with both pairs of opposite sides chevron-marked
 * parallel. Interior angles are supplied for the four vertices in the order
 * bottom-left, bottom-right, top-right, top-left.
 */
function parallelogramFig(
  description: string,
  angles: [string?, string?, string?, string?],
  options: { rhombus?: boolean } = {}
): PlaneShapeDiagram {
  return {
    description,
    vertices: [
      { x: 0, y: 0, angleLabel: angles[0] },
      { x: 4, y: 0, angleLabel: angles[1] },
      { x: 5, y: 2.6, angleLabel: angles[2] },
      { x: 1, y: 2.6, angleLabel: angles[3] },
    ],
    edges: options.rhombus
      ? [
          { arrows: 1, ticks: 1 },
          { arrows: 2, ticks: 1 },
          { arrows: 1, ticks: 1 },
          { arrows: 2, ticks: 1 },
        ]
      : [{ arrows: 1 }, { arrows: 2 }, { arrows: 1 }, { arrows: 2 }],
    fill: "blue",
  };
}

/**
 * A trapezoid figure with the top and bottom sides chevron-marked parallel.
 * Interior angles are supplied for the four vertices in the order
 * bottom-left, bottom-right, top-right, top-left.
 */
function trapezoidFig(
  description: string,
  angles: [string?, string?, string?, string?]
): PlaneShapeDiagram {
  return {
    description,
    vertices: [
      { x: 0, y: 0, angleLabel: angles[0] },
      { x: 5, y: 0, angleLabel: angles[1] },
      { x: 3.7, y: 2.6, angleLabel: angles[2] },
      { x: 1.3, y: 2.6, angleLabel: angles[3] },
    ],
    edges: [{ arrows: 1 }, {}, { arrows: 1 }, {}],
    fill: "teal",
  };
}

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

/** Attach a difficulty tag (1–5) to a pool question. */
function dq(q: PracticeQuestion, difficulty: number): PracticeQuestion {
  return { ...q, difficulty };
}

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 1 — Angle types and relationships
// ─────────────────────────────────────────────────────────────────────────────

const angleTypesAndRelationships: LessonContent = {
  description:
    "Classify angles by size and use complementary, supplementary, vertically opposite, and revolution angle relationships to find unknown angles.",
  learningIntention:
    "Identify angle types and apply complementary, supplementary, vertically opposite, and angles-at-a-point relationships to calculate unknown angles.",
  successCriteria: [
    "Classify an angle as acute, right, obtuse, straight, reflex, or revolution by its size.",
    "Use the fact that complementary angles sum to 90° to find a missing angle.",
    "Use the fact that supplementary angles sum to 180° to find a missing angle.",
    "Use the fact that vertically opposite angles are equal to find a missing angle.",
    "Use the fact that angles at a point sum to 360° to find a missing angle.",
  ],
  teaching: {
    paragraphs: [
      "An angle measures how much you turn. Imagine standing still and rotating to face a new direction: the angle is the size of that turn, the amount of opening between where you started and where you finished. It is not about how long the two arms are — a tiny corner and a huge corner can hold exactly the same angle. What matters is only the spread between the two rays that meet at the point.",
      "We measure that turn in degrees. One full spin all the way back to where you started is $360^\\circ$. Half a spin, turning to face the exact opposite direction, is $180^\\circ$ — that is why a straight line counts as a $180^\\circ$ angle. A quarter spin is $90^\\circ$, the square corner you see on a book or a window. So the size names follow the turn: an acute angle is less than a quarter turn (between $0^\\circ$ and $90^\\circ$), a right angle is exactly $90^\\circ$, an obtuse angle is between a quarter and a half turn ($90^\\circ$ to $180^\\circ$), a straight angle is exactly $180^\\circ$, a reflex angle is more than half a turn ($180^\\circ$ to $360^\\circ$), and a revolution is the full $360^\\circ$.",
      "Two angles are complementary when they add to $90^\\circ$, and supplementary when they add to $180^\\circ$. The names sound similar, so anchor each one to a picture: complementary makes a square Corner ($90^\\circ$), supplementary makes a Straight line ($180^\\circ$). If one corner-piece is $35^\\circ$, its complement must be $55^\\circ$ to finish the right angle; if one angle on a straight line is $130^\\circ$, its supplement is $50^\\circ$ to finish the line.",
      "Here is why those sums are forced, not just memorised. When several angles sit side by side along a straight line, together they fill exactly half a turn, and half a turn is $180^\\circ$ — so they must add to $180^\\circ$. When angles sit side by side all the way around a point, together they fill one full turn, which is $360^\\circ$ — so they must add to $360^\\circ$. You are not learning two unrelated facts; you are reading the same idea (an angle is an amount of turn) at half a turn and at a full turn.",
      "Now look at what happens when two straight lines cross. They make four angles. Take any one angle, call it $a$, and the angle right next to it, $b$: together $a$ and $b$ lie on a straight line, so $a+b=180^\\circ$. The angle on the other side of $b$, directly across from $a$, also pairs with $b$ on a straight line, so it plus $b$ is $180^\\circ$ too. Both equal $180^\\circ-b$, so the angle across from $a$ must equal $a$ itself. That is why vertically opposite angles — the ones diagonally across the X — are always equal: each is the leftover after subtracting the same shared neighbour from $180^\\circ$.",
      "To find a missing angle, decide first which whole the angles fill. If they sit on a straight line, the missing one is $180^\\circ$ minus the rest; if they fan all the way around a point, it is $360^\\circ$ minus the rest; if they are vertically opposite, just copy the equal angle. The classic trap is reaching for the wrong total — using $90^\\circ$ when the angles really make a straight line, or $180^\\circ$ when they go all the way around. A quick sketch showing whether the arms close at a line or sweep around a full point keeps you on the right total, and never trust a diagram's apparent size: an angle drawn to look like $90^\\circ$ might be labelled $88^\\circ$, so always work from the rule, not the picture.",
    ],
    latexBlocks: [
      "\\text{Half a turn} = 180^\\circ \\qquad \\text{Full turn} = 360^\\circ",
      "\\text{Complementary (Corner): } \\angle A + \\angle B = 90^\\circ",
      "\\text{Supplementary (Straight line): } \\angle A + \\angle B = 180^\\circ",
      "\\text{Angles at a point: } \\angle A + \\angle B + \\angle C + \\cdots = 360^\\circ \\qquad \\text{Vertically opposite angles are equal}",
    ],
  },
  workedExamples: [
    {
      title: "Find a complementary angle",
      questionLatex:
        "\\text{Two angles are complementary. One angle is } 38^\\circ. \\text{ Find the other angle in degrees.}",
      triangleDiagram: complementFig("38°"),
      steps: [
        {
          explanation:
            "Complementary means the two angles together fill a right-angle corner, so they sum to 90 degrees. Write that relationship.",
          latex: "38 + \\angle B = 90",
        },
        {
          explanation:
            "Subtract the known angle from 90 to find what is left of the corner.",
          latex: "\\angle B = 90 - 38 = 52",
        },
      ],
      finalAnswerLatex: "\\text{The other angle is } 52^\\circ.",
    },
    {
      title: "Find a supplementary angle",
      questionLatex:
        "\\text{Two angles lie on a straight line. One angle is } 115^\\circ. \\text{ Find the other angle in degrees.}",
      angleFigureDiagram: {
        description:
          "A straight line with a ray rising from a point on it, splitting the straight angle into 115° and the unknown angle on the same side.",
        kind: "rays",
        rays: [0, 180, 65],
        sectorLabels: [
          { between: [0, 65], label: "x" },
          { between: [65, 180], label: "115°" },
        ],
      },
      steps: [
        {
          explanation:
            "Angles that together make a straight line fill half a turn, so they are supplementary and sum to 180 degrees.",
          latex: "115 + \\angle B = 180",
        },
        {
          explanation:
            "Subtract the known angle from 180 to find the rest of the half-turn.",
          latex: "\\angle B = 180 - 115 = 65",
        },
      ],
      finalAnswerLatex: "\\text{The other angle is } 65^\\circ.",
    },
    {
      title: "Find all four angles where two lines cross",
      questionLatex:
        "\\text{Two straight lines cross. One angle at the intersection is } 70^\\circ. \\text{ Find all four angles at the intersection.}",
      angleFigureDiagram: {
        description:
          "Two straight lines crossing at a point, forming four angles. One angle is 70°, with its vertically opposite angle also 70° and the two adjacent angles each 110°.",
        kind: "rays",
        rays: [0, 180, 70, 250],
        sectorLabels: [
          { between: [0, 70], label: "70°" },
          { between: [70, 180], label: "110°" },
          { between: [180, 250], label: "70°" },
          { between: [250, 360], label: "110°" },
        ],
      },
      steps: [
        {
          explanation:
            "The angle diagonally across the crossing is vertically opposite the 70 degree angle, so it is equal to it.",
          latex: "\\text{Vertically opposite angle} = 70^\\circ",
        },
        {
          explanation:
            "An angle next to the 70 degree angle sits with it on a straight line, so it is supplementary: subtract from 180.",
          latex: "180 - 70 = 110",
        },
        {
          explanation:
            "The last angle is vertically opposite that 110 degree angle, so it is also 110 degrees.",
          latex: "\\text{Vertically opposite angle} = 110^\\circ",
        },
        {
          explanation:
            "Check the four angles fill a full turn around the point: they should sum to 360 degrees.",
          latex: "70 + 110 + 70 + 110 = 360",
        },
      ],
      finalAnswerLatex:
        "\\text{The four angles are } 70^\\circ,\\ 110^\\circ,\\ 70^\\circ,\\ 110^\\circ.",
    },
    {
      title: "Harder: chain complementary, straight line, and angles at a point",
      questionLatex:
        "\\text{At a point, four angles meet around a full turn. The first is } 90^\\circ. \\text{ The second is the complement of } 65^\\circ. \\text{ The third is the supplement of } 110^\\circ. \\text{ Find the fourth angle in degrees.}",
      angleFigureDiagram: {
        description:
          "Four angles meeting around a single point and filling a full revolution: 90°, 25°, 70°, and the unknown fourth angle.",
        kind: "rays",
        rays: [0, 90, 115, 185],
        sectorLabels: [
          { between: [0, 90], label: "90°", right: true },
          { between: [90, 115], label: "25°" },
          { between: [115, 185], label: "70°" },
          { between: [185, 360], label: "x" },
        ],
      },
      steps: [
        {
          explanation:
            "Find the second angle: its complement is 65, so it and 65 together make a 90 degree corner.",
          latex: "\\text{second} = 90 - 65 = 25",
        },
        {
          explanation:
            "Find the third angle: its supplement is 110, so it and 110 together make a straight line of 180 degrees.",
          latex: "\\text{third} = 180 - 110 = 70",
        },
        {
          explanation:
            "All four angles sweep around a single point, so they fill a full turn of 360 degrees. Add the three known angles first.",
          latex: "90 + 25 + 70 = 185",
        },
        {
          explanation:
            "Subtract that total from 360 to find the fourth angle that completes the revolution.",
          latex: "\\text{fourth} = 360 - 185 = 175",
        },
      ],
      finalAnswerLatex: "\\text{The fourth angle is } 175^\\circ.",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ang-typ-g1",
      "An angle measures 145°. What type of angle is it?",
      "C",
      ["Acute", "Right", "Obtuse", "Reflex"],
      "Obtuse angles are between 90° and 180°. Since 145° is between 90° and 180°, it is obtuse.",
      undefined,
      {
        angleFigureDiagram: {
          description:
            "A single angle of 145° formed by two rays from a common point — wider than a right angle but less than a straight line.",
          kind: "rays",
          rays: [0, 145],
          sectorLabels: [{ between: [0, 145], label: "145°" }],
        },
      }
    ),
    answer(
      "y7-ang-typ-g2",
      "Two angles are complementary. One angle is 54°. Find the other angle in degrees.",
      "\\angle A + 54° = 90°",
      "36",
      "Complementary angles sum to 90°. So the other angle = 90 - 54 = 36°.",
      ["36°"],
      { triangleDiagram: complementFig("54°") }
    ),
    answer(
      "y7-ang-typ-g3",
      "Two angles are supplementary. One angle is 73°. Find the other angle in degrees.",
      "\\angle A + 73° = 180°",
      "107",
      "Supplementary angles sum to 180°. So the other angle = 180 - 73 = 107°.",
      ["107°"],
      {
        angleFigureDiagram: {
          description:
            "A straight line split by a ray into two supplementary angles, 73° and the unknown angle, on the same side of the line.",
          kind: "rays",
          rays: [0, 180, 73],
          sectorLabels: [
            { between: [0, 73], label: "73°" },
            { between: [73, 180], label: "x" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-g4",
      "Three angles meet at a point. Two of them are 120° and 95°. Find the third angle in degrees.",
      "120° + 95° + \\angle A = 360°",
      "145",
      "Angles at a point sum to 360°. The third angle = 360 - 120 - 95 = 145°.",
      ["145°"],
      {
        angleFigureDiagram: {
          description:
            "Three angles meeting around a point and filling a full revolution: 120°, 95°, and the unknown third angle.",
          kind: "rays",
          rays: [0, 120, 215],
          sectorLabels: [
            { between: [0, 120], label: "120°" },
            { between: [120, 215], label: "95°" },
            { between: [215, 360], label: "x" },
          ],
        },
      }
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-typ-i1",
      "Find the complement of a 29° angle. Give your answer in degrees.",
      "29° + \\angle A = 90°",
      "61",
      "Complementary angles sum to 90°. Complement = 90 - 29 = 61°.",
      ["61°"],
      { triangleDiagram: complementFig("29°") }
    ),
    answer(
      "y7-ang-typ-i2",
      "Find the supplement of a 48° angle. Give your answer in degrees.",
      "48° + \\angle A = 180°",
      "132",
      "Supplementary angles sum to 180°. Supplement = 180 - 48 = 132°.",
      ["132°"],
      {
        angleFigureDiagram: {
          description:
            "A straight line split by a ray into two supplementary angles, 48° and its supplement, on the same side of the line.",
          kind: "rays",
          rays: [0, 180, 48],
          sectorLabels: [
            { between: [0, 48], label: "48°" },
            { between: [48, 180], label: "x" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-i3",
      "Two straight lines cross. One of the four angles at the intersection is 65°. What is the size in degrees of the angle that is vertically opposite to the 65° angle?",
      "\\text{Vertically opposite angles are equal}",
      "65",
      "Vertically opposite angles are equal, so the angle directly across is also 65°.",
      ["65°"],
      {
        angleFigureDiagram: {
          description:
            "Two straight lines crossing at a point. One angle is 65°; the angle diagonally opposite it (vertically opposite) is the unknown.",
          kind: "rays",
          rays: [0, 180, 65, 245],
          sectorLabels: [
            { between: [0, 65], label: "65°" },
            { between: [180, 245], label: "x" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-i4",
      "Angles on a straight line include an angle of 47° and an unknown angle. Find the unknown angle in degrees.",
      "47° + \\angle A = 180°",
      "133",
      "Angles on a straight line sum to 180°. Unknown = 180 - 47 = 133°.",
      ["133°"],
      {
        angleFigureDiagram: {
          description:
            "A straight line split by a ray into an angle of 47° and an unknown angle that together make the straight angle.",
          kind: "rays",
          rays: [0, 180, 47],
          sectorLabels: [
            { between: [0, 47], label: "47°" },
            { between: [47, 180], label: "x" },
          ],
        },
      }
    ),
    choice(
      "y7-ang-typ-i5",
      "Four angles meet at a point. Three of the angles are 90°, 75°, and 110°. What is the fourth angle?",
      "B",
      ["95°", "85°", "80°", "75°"],
      "Angles at a point sum to 360°. Fourth angle = 360 - 90 - 75 - 110 = 85°.",
      "\\text{Select A, B, C, or D.}",
      {
        angleFigureDiagram: {
          description:
            "Four angles meeting around a point and filling a full revolution: 90°, 75°, 110°, and the unknown fourth angle.",
          kind: "rays",
          rays: [0, 90, 165, 275],
          sectorLabels: [
            { between: [0, 90], label: "90°", right: true },
            { between: [90, 165], label: "75°" },
            { between: [165, 275], label: "110°" },
            { between: [275, 360], label: "x" },
          ],
        },
      }
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing complementary (90°) and supplementary (180°).",
      fix: "Remember: Complementary = Corner (right angle = 90°); Supplementary = Straight line (180°).",
    },
    {
      mistake: "Thinking vertically opposite angles are supplementary (adding to 180°) instead of equal.",
      fix: "Vertically opposite angles are the ones directly across the intersection from each other — they are always equal, not supplementary.",
    },
    {
      mistake: "Using 180° instead of 360° for angles at a point.",
      fix: "Angles on a straight line sum to 180°, but angles all the way around a point sum to a full revolution of 360°.",
    },
    {
      mistake: "Subtracting from the wrong total when the diagram shows angles on a line vs. angles at a point.",
      fix: "Check whether the angles share a straight line (subtract from 180°) or spread around a full point (subtract from 360°).",
    },
  ],
  masteryQuiz: [
    choice(
      "y7-ang-typ-m1",
      "Which pair of angle sizes are complementary?",
      "A",
      ["35° and 55°", "35° and 145°", "90° and 90°", "60° and 130°"],
      "Complementary angles sum to 90°. 35 + 55 = 90, so this pair is complementary."
    ),
    answer(
      "y7-ang-typ-m2",
      "Find the complement of 17°. Give your answer in degrees.",
      "17° + \\angle A = 90°",
      "73",
      "Complement = 90 - 17 = 73°.",
      ["73°"],
      { triangleDiagram: complementFig("17°") }
    ),
    answer(
      "y7-ang-typ-m3",
      "Find the supplement of 112°. Give your answer in degrees.",
      "112° + \\angle A = 180°",
      "68",
      "Supplement = 180 - 112 = 68°.",
      ["68°"],
      {
        angleFigureDiagram: {
          description:
            "A straight line split by a ray into 112° and its supplement on the same side of the line.",
          kind: "rays",
          rays: [0, 180, 68],
          sectorLabels: [
            { between: [0, 68], label: "x" },
            { between: [68, 180], label: "112°" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-m4",
      "Two straight lines intersect. One angle is 43°. Find the size in degrees of the angle adjacent to it on the straight line.",
      "43° + \\angle A = 180°",
      "137",
      "Adjacent angles on a straight line are supplementary. 180 - 43 = 137°.",
      ["137°"],
      {
        angleFigureDiagram: {
          description:
            "Two straight lines crossing at a point. One angle is 43°; the angle next to it along the same straight line is the unknown.",
          kind: "rays",
          rays: [0, 180, 43, 223],
          sectorLabels: [
            { between: [0, 43], label: "43°" },
            { between: [43, 180], label: "x" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-m5",
      "Two straight lines intersect. One angle formed is 78°. Find the size in degrees of the vertically opposite angle.",
      "\\text{Vertically opposite angles are equal}",
      "78",
      "Vertically opposite angles are equal. The opposite angle is also 78°.",
      ["78°"],
      {
        angleFigureDiagram: {
          description:
            "Two straight lines crossing at a point. One angle is 78°; the angle diagonally opposite it is the unknown.",
          kind: "rays",
          rays: [0, 180, 78, 258],
          sectorLabels: [
            { between: [0, 78], label: "78°" },
            { between: [180, 258], label: "x" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-m6",
      "Five angles meet at a point. Four of them are 80°, 60°, 70°, and 90°. Find the fifth angle in degrees.",
      "80° + 60° + 70° + 90° + \\angle A = 360°",
      "60",
      "Total of known angles = 80 + 60 + 70 + 90 = 300°. Fifth angle = 360 - 300 = 60°.",
      ["60°"],
      {
        angleFigureDiagram: {
          description:
            "Five angles meeting around a point and filling a full revolution: 80°, 60°, 70°, 90°, and the unknown fifth angle.",
          kind: "rays",
          rays: [0, 80, 140, 210, 300],
          sectorLabels: [
            { between: [0, 80], label: "80°" },
            { between: [80, 140], label: "60°" },
            { between: [140, 210], label: "70°" },
            { between: [210, 300], label: "90°", right: true },
            { between: [300, 360], label: "x" },
          ],
        },
      }
    ),
    choice(
      "y7-ang-typ-m7",
      "An angle and its vertically opposite angle together make what total?",
      "C",
      ["90°", "180°", "The same size — they are equal, not additive", "360°"],
      "Vertically opposite angles are equal to each other, not supplementary. The question of their sum is a distractor — they are individually equal."
    ),
    answer(
      "y7-ang-typ-m8",
      "A reflex angle and its non-reflex partner together form a revolution. The non-reflex angle is 130°. Find the reflex angle in degrees.",
      "130° + \\angle A = 360°",
      "230",
      "A reflex angle and the angle on the other side of it together make 360°. Reflex angle = 360 - 130 = 230°.",
      ["230°"],
      {
        angleFigureDiagram: {
          description:
            "A single ray pair at a point: the smaller non-reflex angle is 130° and the reflex angle on the other side, sweeping the rest of the way around, is the unknown.",
          kind: "rays",
          rays: [0, 130],
          sectorLabels: [
            { between: [0, 130], label: "130°" },
            { between: [130, 360], label: "x" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-m9",
      "Two angles on a straight line are in the ratio 2 : 3. Find the size in degrees of the larger angle.",
      "2x + 3x = 180°",
      "108",
      "Let the angles be 2x and 3x. Then 5x = 180, so x = 36. The larger angle = 3 × 36 = 108°.",
      ["108°"],
      {
        angleFigureDiagram: {
          description:
            "A straight line split by a ray into two angles in the ratio 2 : 3, labelled 2x and 3x.",
          kind: "rays",
          rays: [0, 180, 72],
          sectorLabels: [
            { between: [0, 72], label: "2x" },
            { between: [72, 180], label: "3x" },
          ],
        },
      }
    ),
    answer(
      "y7-ang-typ-m10",
      "Two intersecting lines form four angles. One angle is 55°. Find the sum in degrees of all four angles at the intersection.",
      "\\text{All angles at a point sum to } 360°",
      "360",
      "All angles around a point always sum to 360°, regardless of the individual angle sizes.",
      ["360°"],
      {
        angleFigureDiagram: {
          description:
            "Two straight lines crossing at a point, forming four angles; one is marked 55°. The four together fill a full revolution.",
          kind: "rays",
          rays: [0, 180, 55, 235],
          sectorLabels: [{ between: [0, 55], label: "55°" }],
        },
      }
    ),
  ],
  masteryQuizPool: [
    dq(answer("y7-ang-typ-p1", "Find the complement of 12°. Give your answer in degrees.", "12° + \\angle A = 90°", "78", "Complement = 90 - 12 = 78°.", ["78°"], { triangleDiagram: complementFig("12°") }), 1),
    dq(answer("y7-ang-typ-p2", "Find the complement of 45°. Give your answer in degrees.", "45° + \\angle A = 90°", "45", "Complement = 90 - 45 = 45°.", ["45°"], { triangleDiagram: complementFig("45°") }), 1),
    dq(answer("y7-ang-typ-p3", "Find the supplement of 35°. Give your answer in degrees.", "35° + \\angle A = 180°", "145", "Supplement = 180 - 35 = 145°.", ["145°"]), 1),
    dq(answer("y7-ang-typ-p4", "Find the supplement of 90°. Give your answer in degrees.", "90° + \\angle A = 180°", "90", "Supplement = 180 - 90 = 90°.", ["90°"]), 1),
    dq(choice("y7-ang-typ-p5", "An angle measures 200°. What type of angle is it?", "D", ["Acute", "Obtuse", "Straight", "Reflex"], "Reflex angles are between 180° and 360°. 200° lies in that range, so it is reflex."), 1),
    dq(choice("y7-ang-typ-p6", "An angle measures 88°. What type of angle is it?", "A", ["Acute", "Right", "Obtuse", "Reflex"], "Acute angles are between 0° and 90°. 88° is acute."), 1),
    dq(answer("y7-ang-typ-p7", "Find the complement of 63°. Give your answer in degrees.", "63° + \\angle A = 90°", "27", "Complement = 90 - 63 = 27°.", ["27°"], { triangleDiagram: complementFig("63°") }), 2),
    dq(answer("y7-ang-typ-p8", "Find the supplement of 124°. Give your answer in degrees.", "124° + \\angle A = 180°", "56", "Supplement = 180 - 124 = 56°.", ["56°"]), 2),
    dq(answer("y7-ang-typ-p9", "Two straight lines cross. One angle is 38°. Find the size in degrees of the angle adjacent to it on the straight line.", "38° + \\angle A = 180°", "142", "Adjacent angles on a straight line are supplementary. 180 - 38 = 142°.", ["142°"], { angleFigureDiagram: { description: "Two straight lines crossing at a point; one angle is 38° and the angle next to it on the same line is the unknown.", kind: "rays", rays: [0, 180, 38, 218], sectorLabels: [{ between: [0, 38], label: "38°" }, { between: [38, 180], label: "x" }] } }), 2),
    dq(answer("y7-ang-typ-p10", "Two straight lines cross. One angle is 109°. Find the size in degrees of the vertically opposite angle.", "\\text{Vertically opposite angles are equal}", "109", "Vertically opposite angles are equal, so the opposite angle is also 109°.", ["109°"], { angleFigureDiagram: { description: "Two straight lines crossing at a point; one angle is 109° and the angle diagonally opposite it is the unknown.", kind: "rays", rays: [0, 180, 109, 289], sectorLabels: [{ between: [0, 109], label: "109°" }, { between: [180, 289], label: "x" }] } }), 2),
    dq(answer("y7-ang-typ-p11", "Three angles meet at a point. Two of them are 85° and 140°. Find the third angle in degrees.", "85° + 140° + \\angle A = 360°", "135", "Third angle = 360 - 85 - 140 = 135°.", ["135°"], { angleFigureDiagram: { description: "Three angles meeting around a point and filling a full revolution: 85°, 140°, and the unknown third angle.", kind: "rays", rays: [0, 85, 225], sectorLabels: [{ between: [0, 85], label: "85°" }, { between: [85, 225], label: "140°" }, { between: [225, 360], label: "x" }] } }), 2),
    dq(choice("y7-ang-typ-p12", "Which pair of angle sizes are supplementary?", "C", ["40° and 50°", "70° and 70°", "118° and 62°", "100° and 100°"], "Supplementary angles sum to 180°. 118 + 62 = 180, so this pair is supplementary."), 2),
    dq(answer("y7-ang-typ-p13", "Four angles meet at a point. Three of them are 100°, 65°, and 80°. Find the fourth angle in degrees.", "100° + 65° + 80° + \\angle A = 360°", "115", "Fourth angle = 360 - 100 - 65 - 80 = 115°.", ["115°"], { angleFigureDiagram: { description: "Four angles meeting around a point and filling a full revolution: 100°, 65°, 80°, and the unknown fourth angle.", kind: "rays", rays: [0, 100, 165, 245], sectorLabels: [{ between: [0, 100], label: "100°" }, { between: [100, 165], label: "65°" }, { between: [165, 245], label: "80°" }, { between: [245, 360], label: "x" }] } }), 3),
    dq(answer("y7-ang-typ-p14", "A reflex angle and its non-reflex partner together form a revolution. The non-reflex angle is 95°. Find the reflex angle in degrees.", "95° + \\angle A = 360°", "265", "Reflex angle = 360 - 95 = 265°.", ["265°"], { angleFigureDiagram: { description: "A ray pair at a point: the non-reflex angle is 95° and the reflex angle sweeping the rest of the way around is the unknown.", kind: "rays", rays: [0, 95], sectorLabels: [{ between: [0, 95], label: "95°" }, { between: [95, 360], label: "x" }] } }), 3),
    dq(answer("y7-ang-typ-p15", "The complement of an angle is 24°. Find the supplement of the same angle in degrees.", "\\text{Angle} = 90 - 24;\\ \\text{supplement} = 180 - \\text{angle}", "114", "The angle = 90 - 24 = 66°. Its supplement = 180 - 66 = 114°.", ["114°"]), 3),
    dq(answer("y7-ang-typ-p16", "Three angles meet at a point and are all equal. Find the size in degrees of each angle.", "3 \\times \\angle A = 360°", "120", "Each angle = 360 ÷ 3 = 120°.", ["120°"]), 3),
    dq(choice("y7-ang-typ-p17", "An angle is 30° more than its complement. What is the size of the angle?", "B", ["30°", "60°", "75°", "150°"], "Let the angle be x. Then x + (x - 30) = 90, so 2x = 120 and x = 60°."), 3),
    dq(answer("y7-ang-typ-p18", "Two angles on a straight line are in the ratio 1 : 4. Find the size in degrees of the smaller angle.", "x + 4x = 180°", "36", "5x = 180, so x = 36. The smaller angle = 36°.", ["36°"]), 3),
    dq(answer("y7-ang-typ-p19", "An angle is twice its complement. Find the size of the angle in degrees.", "x = 2(90 - x)", "60", "x = 180 - 2x, so 3x = 180 and x = 60°.", ["60°"]), 4),
    dq(answer("y7-ang-typ-p20", "Two supplementary angles are in the ratio 5 : 7. Find the size in degrees of the larger angle.", "5x + 7x = 180°", "105", "12x = 180, so x = 15. Larger angle = 7 × 15 = 105°.", ["105°"]), 4),
    dq(answer("y7-ang-typ-p21", "Four angles meet at a point. They are x, 2x, 3x, and 4x. Find the size in degrees of the largest angle.", "x + 2x + 3x + 4x = 360°", "144", "10x = 360, so x = 36. Largest angle = 4 × 36 = 144°.", ["144°"]), 4),
    dq(answer("y7-ang-typ-p22", "An angle is 40° less than its supplement. Find the angle in degrees.", "x = (180 - x) - 40", "70", "x = 180 - x - 40, so 2x = 140 and x = 70°.", ["70°"]), 4),
    dq(answer("y7-ang-typ-p23", "Two straight lines cross. One of the four angles is (2x + 10)° and the vertically opposite angle is (3x - 25)°. Find x.", "2x + 10 = 3x - 25", "35", "Vertically opposite angles are equal: 2x + 10 = 3x - 25, so 35 = x.", ["35"]), 4),
    dq(answer("y7-ang-typ-p24", "The angles at a point are (x + 20)°, (2x)°, and (3x - 14)°. Find x.", "(x+20) + 2x + (3x-14) = 360", "59", "6x + 6 = 360, so 6x = 354 and x = 59.", ["59"]), 5),
    dq(answer("y7-ang-typ-p25", "An angle, its complement, and a third angle together meet at a point. The angle is 50° and its complement is 40°. Find the third angle in degrees.", "50° + 40° + \\angle A = 360°", "270", "Third angle = 360 - 50 - 40 = 270°.", ["270°"]), 5),
    dq(answer("y7-ang-typ-p26", "Two adjacent angles on a straight line are (4x - 5)° and (x + 10)°. Find the size in degrees of the larger of the two angles.", "(4x-5) + (x+10) = 180", "135", "5x + 5 = 180, so 5x = 175 and x = 35. Larger angle = 4(35) - 5 = 135°.", ["135°"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-typ-mp1",
      prompt:
        "Two straight lines AB and CD cross at point O. One of the four angles formed, angle AOC, measures 64°.",
      latex: "\\angle AOC = 64°",
      angleFigureDiagram: {
        description:
          "Two straight lines AB and CD crossing at point O, forming four angles. Angle AOC is 64°, its vertically opposite angle BOD is 64°, and the two adjacent angles AOD and BOC are each 116°.",
        kind: "rays",
        rays: [0, 180, 64, 244],
        sectorLabels: [
          { between: [0, 64], label: "64°" },
          { between: [64, 180], label: "?" },
          { between: [180, 244], label: "?" },
          { between: [244, 360], label: "?" },
        ],
      },
      answer: "116",
      hint: "Use vertically opposite (equal) and angles-on-a-line (supplementary) rules at the intersection.",
      explanation:
        "Part (a): vertically opposite to 64° is 64°. Part (b): angle AOD is on a straight line with 64°, so 180 - 64 = 116°. Part (c): the four angles sum to a revolution, 360°.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the size in degrees of angle BOD, which is vertically opposite to angle AOC.",
          latex: "\\angle BOD = \\;?",
          marks: 1,
          answer: "64",
          acceptedAnswers: ["64°"],
          hint: "Vertically opposite angles are equal.",
          explanation: "Angle BOD is vertically opposite angle AOC, so it equals 64°.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the size in degrees of angle AOD, which lies on the straight line AB with angle AOC.",
          latex: "64° + \\angle AOD = 180°",
          marks: 1,
          answer: "116",
          acceptedAnswers: ["116°"],
          hint: "Angles on a straight line are supplementary.",
          explanation: "Angle AOD = 180 - 64 = 116°.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the sum in degrees of all four angles AOC, BOD, AOD, and BOC at point O.",
          latex: "\\angle AOC + \\angle BOD + \\angle AOD + \\angle BOC = \\;?",
          marks: 1,
          answer: "360",
          acceptedAnswers: ["360°"],
          hint: "Angles around a point make a full revolution.",
          explanation: "The four angles fill a full turn, so they sum to 360°. Check: 64 + 64 + 116 + 116 = 360.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 2 — Angles in triangles
// ─────────────────────────────────────────────────────────────────────────────

const anglesInTriangles: LessonContent = {
  description:
    "Use the angle sum of a triangle (180°) and the exterior angle theorem to find unknown angles, and classify triangles by angles and sides.",
  learningIntention:
    "Apply the triangle angle sum and exterior angle theorem to find missing angles, and classify triangles by their angles and sides.",
  successCriteria: [
    "State and apply the fact that the angle sum of any triangle is 180°.",
    "Find a missing angle in a triangle given the other two angles.",
    "Apply the exterior angle theorem: the exterior angle equals the sum of the two non-adjacent interior angles.",
    "Classify a triangle by its angles as acute, right, or obtuse.",
    "Classify a triangle by its sides as equilateral, isosceles, or scalene.",
  ],
  teaching: {
    paragraphs: [
      "The three corners of any triangle, no matter how it is stretched or squashed, always add up to the same total: $180^\\circ$. That is a strong claim — a tall thin triangle and a short wide one look nothing alike, yet their three angles share the same sum. This lesson is about why that is true and how to use it.",
      "You can see it with a paper triangle. Tear off all three corners and lay them next to each other so their points touch at one spot. Every time, the three torn corners fit together to make a straight line — no gap, no overlap. A straight line is half a turn, which is $180^\\circ$, so the three angles must total $180^\\circ$.",
      "Here is the reason behind the tearing, in plain terms. Imagine drawing a line through the top corner of the triangle that runs parallel to the base. The two slanted sides of the triangle cut across that top line. The angle the left side makes on one side of the top line is exactly equal to the bottom-left corner of the triangle (they are alternate angles between the two parallel lines), and likewise the right side's angle matches the bottom-right corner. So along the top line you now have three angles sitting side by side: the matched bottom-left corner, the original top corner, and the matched bottom-right corner. Together they stretch along a straight line, which is $180^\\circ$ — and those three angles are exactly the three angles of the triangle. That is the proof the paper tearing was hinting at.",
      "To find a missing angle, use the sum. Write that the three angles total $180^\\circ$, put in the two you know, and the third is $180^\\circ$ minus their sum. For a triangle with angles $60^\\circ$ and $75^\\circ$, the third is $180^\\circ-60^\\circ-75^\\circ=45^\\circ$. Always check the three add back to $180^\\circ$. The classic slip is to add the two given angles and report that sum as the answer — but that sum is what you subtract from $180^\\circ$, not the answer itself.",
      "There is a useful shortcut called the exterior angle. If you extend one side of the triangle past a corner, the angle that opens up outside the triangle is the exterior angle. It equals the sum of the two interior angles at the far corners — the two it does not touch. Why? The exterior angle and the interior angle beside it sit on a straight line, so they add to $180^\\circ$; but the three interior angles also add to $180^\\circ$; subtract the shared interior angle from both statements and the exterior angle is left equal to the other two interior angles. So you can jump straight to the answer by adding the two far angles, instead of finding an interior angle first and then taking its supplement.",
      "Finally, triangles get two separate labels, and mixing them up is a common error. By their angles: acute (all three under $90^\\circ$), right (one is exactly $90^\\circ$), or obtuse (one is over $90^\\circ$). By their sides: equilateral (all three sides equal), isosceles (two equal), or scalene (all different). The two systems are independent — a triangle has one name from each list. Equal sides force equal angles opposite them, so an equilateral triangle has three equal angles, each $180^\\circ\\div3=60^\\circ$, and an isosceles triangle has two equal base angles.",
    ],
    latexBlocks: [
      "\\angle A + \\angle B + \\angle C = 180^\\circ",
      "\\text{Exterior angle} = \\text{sum of the two non-adjacent interior angles}",
      "\\text{Equilateral: each angle} = 180^\\circ \\div 3 = 60^\\circ",
      "\\text{Isosceles: the two base angles are equal}",
    ],
  },
  workedExamples: [
    {
      title: "Find a missing angle using the triangle angle sum",
      questionLatex:
        "\\text{A triangle has angles of } 48^\\circ\\text{ and }67^\\circ.\\text{ Find the third angle in degrees.}",
      triangleDiagram: triFig(
        "Triangle with two interior angles marked 48° and 67°, and the third angle marked x.",
        { A: "48°", B: "67°", C: "x" }
      ),
      steps: [
        {
          explanation: "The three interior angles of any triangle fill a straight line when laid together, so they sum to 180 degrees.",
          latex: "\\angle A + \\angle B + \\angle C = 180",
        },
        {
          explanation: "Substitute the two known angles into the sum.",
          latex: "48 + 67 + \\angle C = 180",
        },
        {
          explanation: "Add the two known angles, then subtract from 180 to find the third.",
          latex: "\\angle C = 180 - 115 = 65",
        },
      ],
      finalAnswerLatex: "\\text{The third angle is } 65^\\circ.",
    },
    {
      title: "Use the exterior angle of a triangle",
      questionLatex:
        "\\text{A triangle has two interior angles of } 50^\\circ\\text{ and }70^\\circ.\\text{ Find the exterior angle at the third vertex in degrees.}",
      triangleDiagram: triFig(
        "Triangle ABC with the two non-adjacent interior angles marked 50° at A and 70° at B. The side through vertex C is extended outward to form the exterior angle at C, which is required.",
        { A: "50°", B: "70°" },
        { vertexLabels: { A: "A", B: "B", C: "C" } }
      ),
      steps: [
        {
          explanation:
            "The exterior angle equals the sum of the two non-adjacent interior angles, because both it and those two angles fill the gap up to 180 degrees in the same way.",
          latex: "\\text{Exterior angle} = 50 + 70",
        },
        {
          explanation: "Add the two non-adjacent interior angles.",
          latex: "\\text{Exterior angle} = 120",
        },
      ],
      finalAnswerLatex: "\\text{The exterior angle is } 120^\\circ.",
    },
    {
      title: "Find the base angles of an isosceles triangle",
      questionLatex:
        "\\text{An isosceles triangle has an apex angle of } 40^\\circ.\\text{ Find each base angle in degrees.}",
      triangleDiagram: isoscelesFig(
        "Isosceles triangle with apex angle 40° at the top and the two equal sides tick-marked. The two equal base angles are each marked x.",
        { A: "40°", B: "x", C: "x" }
      ),
      steps: [
        {
          explanation:
            "The two equal sides force the two base angles to be equal, so call each base angle x and write the angle sum.",
          latex: "x + x + 40 = 180",
        },
        {
          explanation: "Combine the two x terms and subtract the apex from 180.",
          latex: "2x = 140",
        },
        {
          explanation: "Divide by 2 to find one base angle.",
          latex: "x = 70",
        },
      ],
      finalAnswerLatex: "\\text{Each base angle is } 70^\\circ.",
    },
    {
      title: "Harder: combine isosceles base angles with the exterior angle",
      questionLatex:
        "\\text{Triangle } ABC \\text{ is isosceles with } AB = AC \\text{ and apex angle } A = 36^\\circ. \\text{ Side } BC \\text{ is extended past } C \\text{ to a point } D. \\text{ Find the exterior angle } ACD \\text{ in degrees.}",
      triangleDiagram: {
        ...isoscelesFig(
          "Isosceles triangle ABC with AB = AC (the two equal sides tick-marked), apex angle 36° at A, and equal base angles x at B and C. Base BC is extended past C to D, forming the exterior angle ACD.",
          { A: "36°", B: "x", C: "x" }
        ),
        vertexLabels: { A: "A", C: "B", B: "C" },
      },
      steps: [
        {
          explanation:
            "The equal sides make the base angles at B and C equal, so call each x and use the angle sum.",
          latex: "36 + x + x = 180",
        },
        {
          explanation: "Solve for the base angle at C.",
          latex: "2x = 144,\\quad x = 72",
        },
        {
          explanation:
            "The exterior angle ACD and the interior base angle at C sit together on the straight line BD, so they are supplementary.",
          latex: "\\angle ACD = 180 - 72 = 108",
        },
        {
          explanation:
            "Check with the exterior-angle shortcut: it should equal the sum of the two far interior angles, A and B.",
          latex: "36 + 72 = 108 \\;\\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{The exterior angle } ACD = 108^\\circ.",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ang-tri-g1",
      "A triangle has angles of 90°, 45°, and 45°. What type of triangle is it by angles?",
      "B",
      ["Acute", "Right", "Obtuse", "Equilateral"],
      "A triangle with one 90° angle is a right triangle.",
      undefined,
      {
        triangleDiagram: triFig(
          "Triangle with a right-angle square at C and the two acute angles each marked 45°.",
          { A: "45°", B: "45°" },
          { rightAngleAt: "C" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-g2",
      "A triangle has two angles of 65° and 80°. Find the third angle in degrees.",
      "65° + 80° + \\angle C = 180°",
      "35",
      "Third angle = 180 - 65 - 80 = 35°.",
      ["35°"],
      {
        triangleDiagram: triFig(
          "Triangle with two interior angles marked 65° and 80°, and the third angle marked x.",
          { A: "65°", B: "80°", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-g3",
      "Two interior angles of a triangle are 55° and 75°. Use the exterior angle theorem to find the exterior angle at the third vertex. Give your answer in degrees.",
      "\\text{Exterior angle} = 55° + 75°",
      "130",
      "Exterior angle = 55 + 75 = 130°.",
      ["130°"],
      {
        triangleDiagram: triFig(
          "Triangle ABC with the two non-adjacent interior angles marked 55° at A and 75° at B. The side through C is extended to form the exterior angle at C, which is required.",
          { A: "55°", B: "75°" },
          { vertexLabels: { A: "A", B: "B", C: "C" } }
        ),
      }
    ),
    answer(
      "y7-ang-tri-g4",
      "An isosceles triangle has a base angle of 52°. Find the apex angle in degrees.",
      "52° + 52° + \\angle A = 180°",
      "76",
      "Both base angles are 52°. Apex angle = 180 - 52 - 52 = 76°.",
      ["76°"],
      {
        triangleDiagram: isoscelesFig(
          "Isosceles triangle with the two equal sides tick-marked and each base angle marked 52°. The apex angle at the top is marked x.",
          { A: "x", B: "52°", C: "52°" }
        ),
      }
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-tri-i1",
      "A triangle has angles of 37° and 94°. Find the third angle in degrees.",
      "37° + 94° + \\angle C = 180°",
      "49",
      "Third angle = 180 - 37 - 94 = 49°.",
      ["49°"],
      {
        triangleDiagram: triFig(
          "Triangle with two interior angles marked 37° and 94°, and the third angle marked x.",
          { A: "37°", B: "94°", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-i2",
      "A right triangle has one acute angle of 34°. Find the other acute angle in degrees.",
      "90° + 34° + \\angle C = 180°",
      "56",
      "The right angle accounts for 90°. Third angle = 180 - 90 - 34 = 56°.",
      ["56°"],
      {
        triangleDiagram: triFig(
          "Right-angled triangle with a right-angle square at C, one acute angle marked 34°, and the other acute angle marked x.",
          { A: "34°", B: "x" },
          { rightAngleAt: "C" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-i3",
      "Two interior angles of a triangle are 42° and 63°. Use the exterior angle theorem to find the exterior angle at the third vertex. Give your answer in degrees.",
      "\\text{Exterior angle} = 42° + 63°",
      "105",
      "Exterior angle = 42 + 63 = 105°.",
      ["105°"],
      {
        triangleDiagram: triFig(
          "Triangle ABC with the two non-adjacent interior angles marked 42° at A and 63° at B. The side through C is extended to form the exterior angle at C, which is required.",
          { A: "42°", B: "63°" },
          { vertexLabels: { A: "A", B: "B", C: "C" } }
        ),
      }
    ),
    answer(
      "y7-ang-tri-i4",
      "An equilateral triangle has all three sides equal. What is the size in degrees of each interior angle?",
      "3 \\times \\angle A = 180°",
      "60",
      "All three angles are equal and sum to 180°. Each angle = 180 ÷ 3 = 60°.",
      ["60°"],
      {
        triangleDiagram: {
          description:
            "Equilateral triangle with all three sides tick-marked as equal and each interior angle marked x.",
          vertices: { A: { x: 200, y: 40 }, C: { x: 70, y: 235 }, B: { x: 330, y: 235 } },
          angleLabels: { A: "x", B: "x", C: "x" },
          highlightedSides: ["AB", "BC", "AC"],
        },
      }
    ),
    choice(
      "y7-ang-tri-i5",
      "A triangle has angles of 120°, 30°, and 30°. How should it be classified by angles?",
      "D",
      ["Acute", "Right", "Equilateral", "Obtuse"],
      "One angle (120°) is greater than 90°, so the triangle is obtuse.",
      undefined,
      {
        triangleDiagram: isoscelesFig(
          "Triangle with one wide interior angle marked 120° and the two smaller angles each marked 30°.",
          { A: "120°", B: "30°", C: "30°" }
        ),
      }
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding the two known angles and giving that sum as the missing angle instead of subtracting from 180°.",
      fix: "The three angles must total 180°. Missing angle = 180 minus the sum of the other two.",
    },
    {
      mistake: "Applying the exterior angle theorem by subtracting rather than adding the two non-adjacent angles.",
      fix: "The exterior angle equals the sum (addition) of the two non-adjacent interior angles.",
    },
    {
      mistake: "Thinking an isosceles triangle has all angles equal.",
      fix: "An isosceles triangle has two equal base angles, but the apex angle is usually different. Only an equilateral triangle has all three angles equal (each 60°).",
    },
    {
      mistake: "Confusing classification by sides with classification by angles.",
      fix: "By sides: equilateral (3 equal), isosceles (2 equal), scalene (none equal). By angles: acute (all <90°), right (one 90°), obtuse (one >90°). These are two separate systems.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-ang-tri-m1",
      "A triangle has angles of 72° and 58°. Find the third angle in degrees.",
      "72° + 58° + \\angle C = 180°",
      "50",
      "Third angle = 180 - 72 - 58 = 50°.",
      ["50°"],
      {
        triangleDiagram: triFig(
          "Triangle with two interior angles marked 72° and 58°, and the third angle marked x.",
          { A: "72°", B: "58°", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-m2",
      "A right triangle has one acute angle of 27°. Find the other acute angle in degrees.",
      "90° + 27° + \\angle C = 180°",
      "63",
      "Third angle = 180 - 90 - 27 = 63°.",
      ["63°"],
      {
        triangleDiagram: triFig(
          "Right-angled triangle with a right-angle square at C, one acute angle marked 27°, and the other acute angle marked x.",
          { A: "27°", B: "x" },
          { rightAngleAt: "C" }
        ),
      }
    ),
    choice(
      "y7-ang-tri-m3",
      "The exterior angle of a triangle is 115°. One of the non-adjacent interior angles is 60°. What is the other non-adjacent interior angle?",
      "B",
      ["125°", "55°", "65°", "50°"],
      "Exterior angle = sum of two non-adjacent interior angles. So the other angle = 115 - 60 = 55°.",
      undefined,
      {
        triangleDiagram: triFig(
          "Triangle ABC with one non-adjacent interior angle marked 60° at A and the other marked x at B. The side through C is extended, forming an exterior angle of 115° at C.",
          { A: "60°", B: "x" },
          { vertexLabels: { A: "A", B: "B", C: "C" } }
        ),
      }
    ),
    answer(
      "y7-ang-tri-m4",
      "An isosceles triangle has an apex angle of 110°. Find the size in degrees of each base angle.",
      "110° + 2x = 180°",
      "35",
      "Each base angle = (180 - 110) ÷ 2 = 70 ÷ 2 = 35°.",
      ["35°"],
      {
        triangleDiagram: isoscelesFig(
          "Isosceles triangle with apex angle 110° at the top, the two equal sides tick-marked, and each base angle marked x.",
          { A: "110°", B: "x", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-m5",
      "Two interior angles of a triangle are 48° and 66°. Find the exterior angle at the third vertex in degrees.",
      "\\text{Exterior angle} = 48° + 66°",
      "114",
      "Exterior angle = 48 + 66 = 114°.",
      ["114°"],
      {
        triangleDiagram: triFig(
          "Triangle ABC with the two non-adjacent interior angles marked 48° at A and 66° at B. The side through C is extended to form the exterior angle at C, which is required.",
          { A: "48°", B: "66°" },
          { vertexLabels: { A: "A", B: "B", C: "C" } }
        ),
      }
    ),
    answer(
      "y7-ang-tri-m6",
      "A triangle has angles in the ratio 1 : 2 : 3. Find the size in degrees of the largest angle.",
      "x + 2x + 3x = 180°",
      "90",
      "Let the angles be x, 2x, 3x. Then 6x = 180, so x = 30. Largest angle = 3 × 30 = 90°.",
      ["90°"],
      {
        triangleDiagram: triFig(
          "Triangle with interior angles marked x, 2x and 3x in the ratio 1 : 2 : 3.",
          { A: "x", B: "2x", C: "3x" }
        ),
      }
    ),
    choice(
      "y7-ang-tri-m7",
      "A triangle has angles of 55°, 65°, and 60°. How is it classified by angles?",
      "A",
      ["Acute", "Right", "Obtuse", "Isosceles"],
      "All three angles are less than 90°, so the triangle is acute. (Isosceles is a classification by sides, not angles.)",
      undefined,
      {
        triangleDiagram: triFig(
          "Triangle with interior angles marked 55°, 65° and 60°.",
          { A: "55°", B: "65°", C: "60°" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-m8",
      "An isosceles triangle has two equal sides. The angle between the two equal sides (the apex) is 96°. Find each base angle in degrees.",
      "96° + 2x = 180°",
      "42",
      "Each base angle = (180 - 96) ÷ 2 = 84 ÷ 2 = 42°.",
      ["42°"],
      {
        triangleDiagram: isoscelesFig(
          "Isosceles triangle with apex angle 96° between the two equal tick-marked sides, and each base angle marked x.",
          { A: "96°", B: "x", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-tri-m9",
      "In a triangle, the exterior angle at one vertex is 128°. The two non-adjacent interior angles are equal. Find the size in degrees of each of those two interior angles.",
      "2x = 128°",
      "64",
      "Each non-adjacent interior angle = 128 ÷ 2 = 64°.",
      ["64°"],
      {
        triangleDiagram: triFig(
          "Triangle ABC with the two equal non-adjacent interior angles each marked x at A and B. The side through C is extended, forming an exterior angle of 128° at C.",
          { A: "x", B: "x" },
          { vertexLabels: { A: "A", B: "B", C: "C" } }
        ),
      }
    ),
    answer(
      "y7-ang-tri-m10",
      "The three angles of a triangle are (x + 10)°, (2x)°, and (x - 6)°. Find the value of x.",
      "(x+10) + 2x + (x-6) = 180",
      "44",
      "4x + 4 = 180, so 4x = 176 and x = 44.",
      ["44"],
      {
        triangleDiagram: triFig(
          "Triangle with interior angles marked (x + 10)°, 2x and (x − 6)°.",
          { A: "x+10", B: "2x", C: "x-6" }
        ),
      }
    ),
  ],
  masteryQuizPool: [
    dq(answer("y7-ang-tri-p1", "A triangle has angles of 40° and 60°. Find the third angle in degrees.", "40° + 60° + \\angle C = 180°", "80", "Third angle = 180 - 40 - 60 = 80°.", ["80°"], { triangleDiagram: triFig("Triangle with two interior angles marked 40° and 60°, and the third angle marked x.", { A: "40°", B: "60°", C: "x" }) }), 1),
    dq(answer("y7-ang-tri-p2", "A triangle has angles of 50° and 50°. Find the third angle in degrees.", "50° + 50° + \\angle C = 180°", "80", "Third angle = 180 - 50 - 50 = 80°.", ["80°"], { triangleDiagram: triFig("Triangle with two interior angles marked 50° and 50°, and the third angle marked x.", { A: "50°", B: "50°", C: "x" }) }), 1),
    dq(answer("y7-ang-tri-p3", "A right triangle has one acute angle of 40°. Find the other acute angle in degrees.", "90° + 40° + \\angle C = 180°", "50", "Third angle = 180 - 90 - 40 = 50°.", ["50°"], { triangleDiagram: triFig("Right-angled triangle with a right-angle square at C, one acute angle marked 40°, and the other acute angle marked x.", { A: "40°", B: "x" }, { rightAngleAt: "C" }) }), 1),
    dq(answer("y7-ang-tri-p4", "Each angle of an equilateral triangle is equal. Find the size in degrees of each angle.", "3 \\times \\angle A = 180°", "60", "Each angle = 180 ÷ 3 = 60°.", ["60°"], { triangleDiagram: { description: "Equilateral triangle with all three sides tick-marked as equal and each interior angle marked x.", vertices: { A: { x: 200, y: 40 }, C: { x: 70, y: 235 }, B: { x: 330, y: 235 } }, angleLabels: { A: "x", B: "x", C: "x" }, highlightedSides: ["AB", "BC", "AC"] } }), 1),
    dq(choice("y7-ang-tri-p5", "A triangle has angles of 100°, 50°, and 30°. How is it classified by angles?", "C", ["Acute", "Right", "Obtuse", "Equilateral"], "One angle (100°) is greater than 90°, so the triangle is obtuse.", undefined, { triangleDiagram: triFig("Triangle with interior angles marked 100°, 50° and 30°.", { A: "100°", B: "50°", C: "30°" }) }), 1),
    dq(choice("y7-ang-tri-p6", "A triangle with all three sides of different lengths is called what?", "C", ["Equilateral", "Isosceles", "Scalene", "Right"], "A triangle with all sides different is scalene.", undefined, { triangleDiagram: triFig("Scalene triangle with three sides of clearly different lengths.", {}) }), 1),
    dq(answer("y7-ang-tri-p7", "A triangle has angles of 33° and 88°. Find the third angle in degrees.", "33° + 88° + \\angle C = 180°", "59", "Third angle = 180 - 33 - 88 = 59°.", ["59°"], { triangleDiagram: triFig("Triangle with two interior angles marked 33° and 88°, and the third angle marked x.", { A: "33°", B: "88°", C: "x" }) }), 2),
    dq(answer("y7-ang-tri-p8", "An isosceles triangle has a base angle of 48°. Find the apex angle in degrees.", "48° + 48° + \\angle A = 180°", "84", "Apex angle = 180 - 48 - 48 = 84°.", ["84°"], { triangleDiagram: isoscelesFig("Isosceles triangle with the two equal sides tick-marked, each base angle marked 48°, and the apex angle marked x.", { A: "x", B: "48°", C: "48°" }) }), 2),
    dq(answer("y7-ang-tri-p9", "An isosceles triangle has an apex angle of 50°. Find each base angle in degrees.", "50° + 2x = 180°", "65", "Each base angle = (180 - 50) ÷ 2 = 65°.", ["65°"], { triangleDiagram: isoscelesFig("Isosceles triangle with apex angle 50° between the two equal tick-marked sides, and each base angle marked x.", { A: "50°", B: "x", C: "x" }) }), 2),
    dq(answer("y7-ang-tri-p10", "Two interior angles of a triangle are 40° and 85°. Find the exterior angle at the third vertex in degrees.", "\\text{Exterior angle} = 40° + 85°", "125", "Exterior angle = 40 + 85 = 125°.", ["125°"], { triangleDiagram: triFig("Triangle ABC with the two non-adjacent interior angles marked 40° at A and 85° at B. The side through C is extended to form the exterior angle at C, which is required.", { A: "40°", B: "85°" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 2),
    dq(answer("y7-ang-tri-p11", "A right triangle has one acute angle of 18°. Find the other acute angle in degrees.", "90° + 18° + \\angle C = 180°", "72", "Third angle = 180 - 90 - 18 = 72°.", ["72°"], { triangleDiagram: triFig("Right-angled triangle with a right-angle square at C, one acute angle marked 18°, and the other acute angle marked x.", { A: "18°", B: "x" }, { rightAngleAt: "C" }) }), 2),
    dq(choice("y7-ang-tri-p12", "A triangle has angles of 80°, 60°, and 40°. How is it classified by angles?", "A", ["Acute", "Right", "Obtuse", "Reflex"], "All three angles are less than 90°, so the triangle is acute.", undefined, { triangleDiagram: triFig("Triangle with interior angles marked 80°, 60° and 40°.", { A: "80°", B: "60°", C: "40°" }) }), 2),
    dq(answer("y7-ang-tri-p13", "The exterior angle of a triangle is 132°. One non-adjacent interior angle is 75°. Find the other non-adjacent interior angle in degrees.", "75° + \\angle B = 132°", "57", "Other angle = 132 - 75 = 57°.", ["57°"], { triangleDiagram: triFig("Triangle ABC with one non-adjacent interior angle marked 75° at A and the other marked x at B. The side through C is extended, forming an exterior angle of 132° at C.", { A: "75°", B: "x" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 3),
    dq(answer("y7-ang-tri-p14", "An isosceles triangle has an apex angle of 124°. Find each base angle in degrees.", "124° + 2x = 180°", "28", "Each base angle = (180 - 124) ÷ 2 = 28°.", ["28°"], { triangleDiagram: isoscelesFig("Isosceles triangle with apex angle 124° between the two equal tick-marked sides, and each base angle marked x.", { A: "124°", B: "x", C: "x" }) }), 3),
    dq(answer("y7-ang-tri-p15", "A triangle has angles in the ratio 2 : 3 : 4. Find the size in degrees of the largest angle.", "2x + 3x + 4x = 180°", "80", "9x = 180, so x = 20. Largest angle = 4 × 20 = 80°.", ["80°"], { triangleDiagram: triFig("Triangle with interior angles marked 2x, 3x and 4x in the ratio 2 : 3 : 4.", { A: "2x", B: "3x", C: "4x" }) }), 3),
    dq(answer("y7-ang-tri-p16", "In a triangle, the exterior angle at one vertex is 110° and the two non-adjacent interior angles are equal. Find each of those interior angles in degrees.", "2x = 110°", "55", "Each non-adjacent interior angle = 110 ÷ 2 = 55°.", ["55°"], { triangleDiagram: triFig("Triangle ABC with the two equal non-adjacent interior angles each marked x at A and B. The side through C is extended, forming an exterior angle of 110° at C.", { A: "x", B: "x" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 3),
    dq(answer("y7-ang-tri-p17", "A triangle has angles (3x)°, (4x)°, and (5x)°. Find x.", "3x + 4x + 5x = 180", "15", "12x = 180, so x = 15.", ["15"], { triangleDiagram: triFig("Triangle with interior angles marked 3x, 4x and 5x.", { A: "3x", B: "4x", C: "5x" }) }), 3),
    dq(choice("y7-ang-tri-p18", "An isosceles triangle has an apex angle of 90°. What are its two base angles?", "B", ["60° each", "45° each", "30° each", "90° each"], "Each base angle = (180 - 90) ÷ 2 = 45°.", undefined, { triangleDiagram: { ...isoscelesFig("Right-angled isosceles triangle with a 90° apex angle between the two equal tick-marked sides, and each base angle marked x.", { B: "x", C: "x" }), rightAngleAt: "A" } }), 3),
    dq(answer("y7-ang-tri-p19", "A triangle has angles in the ratio 3 : 4 : 5. Find the size in degrees of the smallest angle.", "3x + 4x + 5x = 180°", "45", "12x = 180, so x = 15. Smallest angle = 3 × 15 = 45°.", ["45°"], { triangleDiagram: triFig("Triangle with interior angles marked 3x, 4x and 5x in the ratio 3 : 4 : 5.", { A: "3x", B: "4x", C: "5x" }) }), 4),
    dq(answer("y7-ang-tri-p20", "The angles of a triangle are (2x + 5)°, (3x - 11)°, and (x + 24)°. Find x.", "(2x+5) + (3x-11) + (x+24) = 180", "27", "Combine: 6x + 18 = 180, so 6x = 162 and x = 27.", ["27"], { triangleDiagram: triFig("Triangle with interior angles marked (2x + 5)°, (3x − 11)° and (x + 24)°.", { A: "2x+5", B: "3x-11", C: "x+24" }) }), 4),
    dq(answer("y7-ang-tri-p21", "In an isosceles triangle, each base angle is twice the apex angle. Find the apex angle in degrees.", "x + 2x + 2x = 180°", "36", "x + 2x + 2x = 5x = 180, so apex x = 36°.", ["36°"], { triangleDiagram: isoscelesFig("Isosceles triangle with apex angle marked x between the two equal tick-marked sides, and each base angle marked 2x.", { A: "x", B: "2x", C: "2x" }) }), 4),
    dq(answer("y7-ang-tri-p22", "The exterior angle at one vertex of a triangle is (5x + 10)° and the two non-adjacent interior angles are (2x)° and (x + 40)°. Find x.", "5x + 10 = 2x + (x + 40)", "15", "Exterior = sum of non-adjacent: 5x + 10 = 3x + 40, so 2x = 30 and x = 15.", ["15"], { triangleDiagram: triFig("Triangle ABC with non-adjacent interior angles marked (2x)° at A and (x + 40)° at B. The side through C is extended, forming an exterior angle of (5x + 10)° at C.", { A: "2x", B: "x+40" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 4),
    dq(answer("y7-ang-tri-p23", "An isosceles triangle has two equal angles. One angle of the triangle is 40°. If 40° is the apex angle, find each base angle in degrees.", "40° + 2x = 180°", "70", "Each base angle = (180 - 40) ÷ 2 = 70°.", ["70°"], { triangleDiagram: isoscelesFig("Isosceles triangle with apex angle 40° between the two equal tick-marked sides, and each base angle marked x.", { A: "40°", B: "x", C: "x" }) }), 4),
    dq(answer("y7-ang-tri-p24", "A triangle has angles (x)°, (x + 30)°, and (2x - 6)°. Find the size in degrees of the largest angle.", "x + (x+30) + (2x-6) = 180", "72", "4x + 24 = 180, so 4x = 156 and x = 39. Largest = 2(39) - 6 = 72°.", ["72°"], { triangleDiagram: triFig("Triangle with interior angles marked x, (x + 30)° and (2x − 6)°.", { A: "x", B: "x+30", C: "2x-6" }) }), 5),
    dq(answer("y7-ang-tri-p25", "In triangle ABC, angle A is twice angle B, and angle C is 30° more than angle B. Find angle B in degrees.", "2x + x + (x + 30) = 180", "37.5", "Let angle B = x. Then 2x + x + (x + 30) = 180, so 4x = 150 and x = 37.5°.", ["37.5°"], { triangleDiagram: triFig("Triangle ABC with angle A marked 2x, angle B marked x, and angle C marked (x + 30)°.", { A: "2x", B: "x", C: "x+30" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 5),
    dq(answer("y7-ang-tri-p26", "An exterior angle of a triangle is 140°. The interior angle adjacent to it is split so that the triangle is isosceles with the two equal angles being the non-adjacent ones. Find each equal interior angle in degrees.", "2x = 140°", "70", "The two non-adjacent interior angles sum to the exterior angle 140° and are equal, so each = 70°.", ["70°"], { triangleDiagram: triFig("Triangle ABC with the two equal non-adjacent interior angles each marked x at A and B. The side through C is extended, forming an exterior angle of 140° at C.", { A: "x", B: "x" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-tri-mp1",
      prompt:
        "In triangle PQR, the angle at P is 76°. The triangle is isosceles with PQ = PR, so the base angles at Q and R are equal. One side, QR, is extended beyond R to a point S, forming an exterior angle PRS.",
      latex: "\\angle P = 76°,\\ PQ = PR",
      triangleDiagram: {
        ...isoscelesFig(
          "Isosceles triangle PQR with apex angle 76° at P, equal sides PQ = PR tick-marked, and equal base angles at Q and R. Base QR is extended beyond R to S, forming the exterior angle PRS.",
          { A: "76°" }
        ),
        vertexLabels: { A: "P", C: "Q", B: "R" },
      },
      answer: "104",
      hint: "Find the base angles first, then use the exterior-angle relationship.",
      explanation:
        "Part (a): base angles = (180 - 76) ÷ 2 = 52° each. Part (b): exterior angle PRS = 180 - 52 = 128°, which also equals the sum of the two non-adjacent interior angles 76 + 52 = 128. Part (c): the two equal base angles sum to 104°.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the size in degrees of each base angle (at Q and at R).",
          latex: "76° + 2x = 180°",
          marks: 1,
          answer: "52",
          acceptedAnswers: ["52°"],
          hint: "Subtract the apex from 180° and halve.",
          explanation: "Each base angle = (180 - 76) ÷ 2 = 52°.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "QR is extended to S. Find the size in degrees of the exterior angle PRS.",
          latex: "\\angle PRS = 180° - 52°",
          marks: 1,
          answer: "128",
          acceptedAnswers: ["128°"],
          hint: "The exterior angle is supplementary to the interior angle at R, or equals the sum of the two non-adjacent interior angles.",
          explanation: "Exterior angle PRS = 180 - 52 = 128° (also 76 + 52 = 128).",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the sum in degrees of the two base angles of the triangle.",
          latex: "52° + 52° = \\;?",
          marks: 1,
          answer: "104",
          acceptedAnswers: ["104°"],
          hint: "Add the two equal base angles.",
          explanation: "The two base angles are each 52°, so their sum is 104°.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 3 — Angles in quadrilaterals
// ─────────────────────────────────────────────────────────────────────────────

const anglesInQuadrilaterals: LessonContent = {
  description:
    "Use the angle sum of a quadrilateral (360°) and the angle properties of special quadrilaterals to find unknown angles.",
  learningIntention:
    "Apply the quadrilateral angle sum of 360° and the special properties of rectangles, squares, parallelograms, rhombuses, and trapezoids to find unknown angles.",
  successCriteria: [
    "State and apply the fact that the angle sum of any quadrilateral is 360°.",
    "Find a missing angle in a quadrilateral given the other three angles.",
    "Apply angle properties of a rectangle and square (all angles 90°).",
    "Apply angle properties of a parallelogram and rhombus (opposite angles equal; co-interior angles supplementary).",
    "Apply the co-interior angle property of a trapezoid (co-interior angles between parallel sides sum to 180°).",
  ],
  teaching: {
    paragraphs: [
      "A quadrilateral is any closed shape with four straight sides — squares, kites, that lopsided patch of grass on a map. However oddly it is shaped, its four corner angles always add up to the same total: $360^\\circ$, a full turn.",
      "Picture a four-cornered field, and you walk all the way around its edge back to your start. At each corner you turn, and by the time you return you have spun once completely around — a full $360^\\circ$ of turning. The four interior corner angles are tied to those four turns, and that full turn is the reason the corners total $360^\\circ$.",
      "The cleanest way to be sure is to cut the quadrilateral in two. Draw a diagonal from one corner to the opposite corner. That single line splits the four-sided shape into two triangles. You already know every triangle's angles add to $180^\\circ$, so two triangles give $2\\times180^\\circ=360^\\circ$ — and all of those angles together are exactly the four corners of the quadrilateral, with nothing left over. So to find a missing corner, add the three you know and subtract from $360^\\circ$.",
      "Some quadrilaterals carry extra angle rules on top of the $360^\\circ$ sum. A rectangle or a square has a right angle at every corner, so each angle is $90^\\circ$ with no calculation needed — and $4\\times90^\\circ=360^\\circ$ checks out. A parallelogram has both pairs of opposite sides parallel; a rhombus is just a parallelogram with all four sides equal, so it follows the same angle rules.",
      "In a parallelogram, opposite angles are equal and the two angles on the same side add to $180^\\circ$. Here is why. Because the top and bottom sides are parallel, a slanted side cutting across them creates co-interior angles (the same C-shape you meet with parallel lines), and co-interior angles between parallel lines are supplementary — they sum to $180^\\circ$. Track that around all four corners and each pair of opposite angles is forced to match. So once you know one angle of a parallelogram, the angle beside it is $180^\\circ$ minus it, and the angle across from it is equal to it.",
      "A trapezoid has exactly one pair of parallel sides. The two angles sitting on the same slanted side, between the parallel sides, are co-interior angles, so they too add to $180^\\circ$ — the very same rule, now applied to one pair of sides only. The error to guard against is using $180^\\circ$ for the whole quadrilateral's angle sum, copying the triangle rule by mistake. Always write 'angle sum $=360^\\circ$' first for a four-sided shape, and remember the diagram may not be to scale — read the labels, not the apparent angle.",
    ],
    latexBlocks: [
      "\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ \\qquad (\\text{two triangles: } 2 \\times 180^\\circ)",
      "\\text{Rectangle / square: every angle} = 90^\\circ",
      "\\text{Parallelogram / rhombus: opposite angles equal; co-interior angles sum to } 180^\\circ",
      "\\text{Trapezoid: the two co-interior angles between the parallel sides sum to } 180^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find a missing angle in a quadrilateral",
      questionLatex:
        "\\text{A quadrilateral has angles of } 85^\\circ,\\, 110^\\circ \\text{ and } 95^\\circ.\\text{ Find the fourth angle in degrees.}",
      planeShapeDiagram: quadFig(
        "Quadrilateral with three interior angles marked 85°, 110° and 95°, and the fourth angle marked x.",
        [
          { x: 0, y: 0, angleLabel: "85°" },
          { x: 4.2, y: 0.3, angleLabel: "110°" },
          { x: 3.6, y: 3, angleLabel: "95°" },
          { x: 0.4, y: 2.6, angleLabel: "x" },
        ]
      ),
      steps: [
        {
          explanation: "A diagonal splits the shape into two triangles, so the four angles sum to 2 times 180, which is 360.",
          latex: "85 + 110 + 95 + \\angle D = 360",
        },
        {
          explanation: "Add the three known angles.",
          latex: "290 + \\angle D = 360",
        },
        {
          explanation: "Subtract that total from 360 to find the fourth angle.",
          latex: "\\angle D = 360 - 290 = 70",
        },
      ],
      finalAnswerLatex: "\\text{The fourth angle is } 70^\\circ.",
    },
    {
      title: "Use parallelogram angle properties",
      questionLatex:
        "\\text{A parallelogram has one angle of } 68^\\circ.\\text{ Find all four interior angles.}",
      planeShapeDiagram: quadFig(
        "Parallelogram with both pairs of opposite sides marked parallel by chevrons. One interior angle is marked 68°; the other three are marked x.",
        [
          { x: 0, y: 0, angleLabel: "68°" },
          { x: 4, y: 0, angleLabel: "x" },
          { x: 5, y: 2.6, angleLabel: "x" },
          { x: 1, y: 2.6, angleLabel: "x" },
        ],
        [{ arrows: 1 }, { arrows: 2 }, { arrows: 1 }, { arrows: 2 }]
      ),
      steps: [
        {
          explanation:
            "Opposite angles of a parallelogram are equal, so the angle across from 68 is also 68.",
          latex: "\\text{Opposite angle} = 68",
        },
        {
          explanation:
            "An adjacent angle is co-interior with the 68 angle (same side, between parallel sides), so it is supplementary: subtract from 180.",
          latex: "180 - 68 = 112",
        },
        {
          explanation: "The last angle is opposite that 112 angle, so it is also 112. Check all four sum to a full turn.",
          latex: "68 + 112 + 68 + 112 = 360",
        },
      ],
      finalAnswerLatex:
        "\\text{The four angles are } 68^\\circ,\\, 112^\\circ,\\, 68^\\circ,\\, 112^\\circ.",
    },
    {
      title: "Find an angle in a trapezoid",
      questionLatex:
        "\\text{A trapezoid has one pair of parallel sides. One angle on a slanted side, between the parallel sides, is } 74^\\circ.\\text{ Find the co-interior angle on that same slanted side in degrees.}",
      planeShapeDiagram: quadFig(
        "Trapezoid with the top and bottom sides marked parallel by chevrons. On the left slanted side the two co-interior angles are marked 74° (bottom) and x (top).",
        [
          { x: 0, y: 0, angleLabel: "74°" },
          { x: 5, y: 0 },
          { x: 3.7, y: 2.6 },
          { x: 1.3, y: 2.6, angleLabel: "x" },
        ],
        [{ arrows: 1 }, {}, { arrows: 1 }, {}]
      ),
      steps: [
        {
          explanation:
            "The two angles share one slanted side that crosses the parallel sides, making them co-interior, so they are supplementary and sum to 180.",
          latex: "74 + \\angle B = 180",
        },
        {
          explanation: "Subtract 74 from 180 to find the co-interior angle.",
          latex: "\\angle B = 180 - 74 = 106",
        },
      ],
      finalAnswerLatex: "\\text{The co-interior angle is } 106^\\circ.",
    },
    {
      title: "Harder: solve for an unknown in a quadrilateral, then identify the shape",
      questionLatex:
        "\\text{A quadrilateral has angles } (2x)^\\circ,\\, (2x)^\\circ,\\, (x+30)^\\circ \\text{ and } (x+30)^\\circ, \\text{ with the equal angles opposite each other. Find } x \\text{ and decide whether it could be a parallelogram.}",
      planeShapeDiagram: quadFig(
        "Quadrilateral with opposite interior angles equal: 2x at two opposite vertices and (x + 30)° at the other two opposite vertices.",
        [
          { x: 0, y: 0, angleLabel: "2x" },
          { x: 4, y: 0, angleLabel: "x+30" },
          { x: 5, y: 2.6, angleLabel: "2x" },
          { x: 1, y: 2.6, angleLabel: "x+30" },
        ]
      ),
      steps: [
        {
          explanation: "The four angles of any quadrilateral sum to 360, so add the four expressions and set the total to 360.",
          latex: "2x + 2x + (x+30) + (x+30) = 360",
        },
        {
          explanation: "Collect like terms on the left.",
          latex: "6x + 60 = 360",
        },
        {
          explanation: "Subtract 60 from both sides, then divide by 6 to find x.",
          latex: "6x = 300,\\quad x = 50",
        },
        {
          explanation:
            "Work out the actual angles: 2x and x+30 with x = 50.",
          latex: "2x = 100,\\quad x + 30 = 80",
        },
        {
          explanation:
            "Opposite angles are equal (100 with 100, 80 with 80) and adjacent angles 100 + 80 = 180 are supplementary, which is exactly the parallelogram pattern.",
          latex: "100 + 80 = 180 \\;\\checkmark",
        },
      ],
      finalAnswerLatex: "x = 50; \\text{ the angles } 100^\\circ, 80^\\circ, 100^\\circ, 80^\\circ \\text{ fit a parallelogram.}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ang-qdr-g1",
      "What is the angle sum of any quadrilateral?",
      "C",
      ["180°", "270°", "360°", "540°"],
      "A quadrilateral can be split into two triangles, each with 180°. Total angle sum = 2 × 180° = 360°."
    ),
    answer(
      "y7-ang-qdr-g2",
      "A quadrilateral has angles of 90°, 85°, and 110°. Find the fourth angle in degrees.",
      "90° + 85° + 110° + \\angle D = 360°",
      "75",
      "Fourth angle = 360 - 90 - 85 - 110 = 75°.",
      ["75°"],
      {
        planeShapeDiagram: quadFig(
          "Quadrilateral with three interior angles marked 90°, 85° and 110°, and the fourth angle marked x.",
          [
            { x: 0, y: 0, angleLabel: "90°", rightAngle: true },
            { x: 4.2, y: 0.3, angleLabel: "85°" },
            { x: 3.6, y: 3, angleLabel: "110°" },
            { x: 0.4, y: 2.6, angleLabel: "x" },
          ]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-g3",
      "A parallelogram has one angle of 54°. Find the size in degrees of the angle adjacent to it (co-interior angle).",
      "54° + \\angle B = 180°",
      "126",
      "Co-interior angles in a parallelogram are supplementary. Adjacent angle = 180 - 54 = 126°.",
      ["126°"],
      {
        planeShapeDiagram: parallelogramFig(
          "Parallelogram with opposite sides chevron-marked parallel. One interior angle is marked 54° and the adjacent (co-interior) angle is marked x.",
          ["54°", "x", undefined, undefined]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-g4",
      "A trapezoid has a co-interior angle of 118° on one side of its parallel sides. Find the other co-interior angle on the same side in degrees.",
      "118° + \\angle B = 180°",
      "62",
      "Co-interior angles in a trapezoid sum to 180°. Other angle = 180 - 118 = 62°.",
      ["62°"],
      {
        planeShapeDiagram: trapezoidFig(
          "Trapezoid with the top and bottom sides chevron-marked parallel. On the left slanted side the two co-interior angles are marked 118° (bottom) and x (top).",
          ["118°", undefined, undefined, "x"]
        ),
      }
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-qdr-i1",
      "A quadrilateral has angles of 75°, 105°, and 88°. Find the fourth angle in degrees.",
      "75° + 105° + 88° + \\angle D = 360°",
      "92",
      "Fourth angle = 360 - 75 - 105 - 88 = 92°.",
      ["92°"],
      {
        planeShapeDiagram: quadFig(
          "Quadrilateral with three interior angles marked 75°, 105° and 88°, and the fourth angle marked x.",
          [
            { x: 0, y: 0, angleLabel: "75°" },
            { x: 4.2, y: 0.3, angleLabel: "105°" },
            { x: 3.6, y: 3, angleLabel: "88°" },
            { x: 0.4, y: 2.6, angleLabel: "x" },
          ]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-i2",
      "A parallelogram has one angle of 73°. What is the size in degrees of the angle opposite to it?",
      "\\text{Opposite angles in a parallelogram are equal}",
      "73",
      "Opposite angles in a parallelogram are equal, so the opposite angle is also 73°.",
      ["73°"],
      {
        planeShapeDiagram: parallelogramFig(
          "Parallelogram with opposite sides chevron-marked parallel. One interior angle is marked 73°; the angle opposite it (diagonally across) is marked x.",
          ["73°", undefined, "x", undefined]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-i3",
      "A rectangle has all right angles. One angle in a quadrilateral is 90°, 90°, and 90°. Find the fourth angle in degrees.",
      "90° + 90° + 90° + \\angle D = 360°",
      "90",
      "Fourth angle = 360 - 90 - 90 - 90 = 90°. All angles in a rectangle are 90°.",
      ["90°"],
      {
        planeShapeDiagram: quadFig(
          "Rectangle with right-angle squares at three corners (each marked 90°) and the fourth angle marked x.",
          [
            { x: 0, y: 0, angleLabel: "90°", rightAngle: true },
            { x: 4.5, y: 0, angleLabel: "90°", rightAngle: true },
            { x: 4.5, y: 2.6, angleLabel: "90°", rightAngle: true },
            { x: 0, y: 2.6, angleLabel: "x" },
          ]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-i4",
      "A quadrilateral has angles in the ratio 1 : 2 : 2 : 3. Find the size in degrees of the largest angle.",
      "x + 2x + 2x + 3x = 360°",
      "135",
      "8x = 360, so x = 45. Largest angle = 3 × 45 = 135°.",
      ["135°"],
      {
        planeShapeDiagram: quadFig(
          "Quadrilateral with interior angles marked x, 2x, 2x and 3x in the ratio 1 : 2 : 2 : 3.",
          [
            { x: 0, y: 0, angleLabel: "x" },
            { x: 4.2, y: 0.3, angleLabel: "2x" },
            { x: 3.6, y: 3, angleLabel: "2x" },
            { x: 0.4, y: 2.6, angleLabel: "3x" },
          ]
        ),
      }
    ),
    choice(
      "y7-ang-qdr-i5",
      "In a rhombus, one angle is 66°. What are the sizes of all four interior angles?",
      "A",
      ["66°, 114°, 66°, 114°", "66°, 66°, 66°, 66°", "66°, 90°, 66°, 138°", "66°, 114°, 114°, 66°"],
      "A rhombus is a parallelogram: opposite angles are equal (66° and 66°) and co-interior angles sum to 180° (114° and 114°). Check: 66 + 114 + 66 + 114 = 360.",
      undefined,
      {
        planeShapeDiagram: parallelogramFig(
          "Rhombus with all four sides tick-marked equal and opposite sides chevron-marked parallel. One interior angle is marked 66°; the other three are marked x.",
          ["66°", "x", "x", "x"],
          { rhombus: true }
        ),
      }
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using 180° as the angle sum of a quadrilateral instead of 360°.",
      fix: "A triangle has an angle sum of 180°. A quadrilateral has an angle sum of 360° — it is made of two triangles.",
    },
    {
      mistake: "Thinking that opposite angles in a parallelogram are supplementary (add to 180°) rather than equal.",
      fix: "In a parallelogram, opposite angles are equal. It is the co-interior angles (on the same side) that are supplementary.",
    },
    {
      mistake: "Applying the co-interior angle rule to both pairs of opposite sides in a trapezoid.",
      fix: "Only the sides between the two parallel sides have the co-interior (supplementary) relationship. The non-parallel sides do not.",
    },
    {
      mistake: "Forgetting that a square and rectangle both have all angles equal to 90°.",
      fix: "Any shape with a right-angle symbol at every corner has all 90° angles. No calculation is needed — state the angle directly as 90°.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-ang-qdr-m1",
      "A quadrilateral has three angles of 100°, 80°, and 95°. Find the fourth angle in degrees.",
      "100° + 80° + 95° + \\angle D = 360°",
      "85",
      "Fourth angle = 360 - 100 - 80 - 95 = 85°.",
      ["85°"],
      {
        planeShapeDiagram: quadFig(
          "Quadrilateral with three interior angles marked 100°, 80° and 95°, and the fourth angle marked x.",
          [
            { x: 0, y: 0, angleLabel: "100°" },
            { x: 4.2, y: 0.3, angleLabel: "80°" },
            { x: 3.6, y: 3, angleLabel: "95°" },
            { x: 0.4, y: 2.6, angleLabel: "x" },
          ]
        ),
      }
    ),
    choice(
      "y7-ang-qdr-m2",
      "A parallelogram has an angle of 112°. Which set of four angles is correct for this parallelogram?",
      "B",
      ["112°, 112°, 68°, 68°", "112°, 68°, 112°, 68°", "112°, 112°, 112°, 24°", "112°, 90°, 68°, 90°"],
      "Opposite angles are equal: 112° and 112°. Co-interior angles sum to 180°: 180 - 112 = 68°. Order: 112, 68, 112, 68.",
      undefined,
      {
        planeShapeDiagram: parallelogramFig(
          "Parallelogram with opposite sides chevron-marked parallel and one interior angle marked 112°.",
          ["112°", undefined, undefined, undefined]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-m3",
      "A trapezoid has co-interior angles of x and (x + 30)° on one pair of parallel sides. Find x in degrees.",
      "x + (x + 30) = 180°",
      "75",
      "2x + 30 = 180, so 2x = 150 and x = 75°.",
      ["75°"],
      {
        planeShapeDiagram: trapezoidFig(
          "Trapezoid with the top and bottom sides chevron-marked parallel. On the left slanted side the two co-interior angles are marked x (bottom) and (x + 30)° (top).",
          ["x", undefined, undefined, "x+30"]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-m4",
      "A rhombus has one angle of 82°. Find the size in degrees of one of the co-interior angles (the angles on the same side as the 82° angle, between the parallel sides).",
      "82° + \\angle B = 180°",
      "98",
      "In a rhombus, co-interior angles are supplementary. The co-interior angle = 180 - 82 = 98°. The four angles of this rhombus are 82°, 98°, 82°, 98°.",
      ["98°"],
      {
        planeShapeDiagram: parallelogramFig(
          "Rhombus with all four sides tick-marked equal and opposite sides chevron-marked parallel. One interior angle is marked 82° and the adjacent (co-interior) angle is marked x.",
          ["82°", "x", undefined, undefined],
          { rhombus: true }
        ),
      }
    ),
    answer(
      "y7-ang-qdr-m5",
      "A quadrilateral has four equal angles. Find the size in degrees of each angle.",
      "4 \\times \\angle A = 360°",
      "90",
      "Each angle = 360 ÷ 4 = 90°. A quadrilateral with four equal angles is a rectangle or square.",
      ["90°"],
      {
        planeShapeDiagram: quadFig(
          "Quadrilateral with all four interior angles equal, each marked x.",
          [
            { x: 0, y: 0, angleLabel: "x" },
            { x: 4.5, y: 0, angleLabel: "x" },
            { x: 4.5, y: 2.6, angleLabel: "x" },
            { x: 0, y: 2.6, angleLabel: "x" },
          ]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-m6",
      "The angles of a quadrilateral are (2x)°, (x + 5)°, (3x - 5)°, and (2x)°. Find x.",
      "2x + (x+5) + (3x-5) + 2x = 360",
      "45",
      "Collect terms: 2x + x + 5 + 3x - 5 + 2x = 8x. So 8x = 360 and x = 45.",
      ["45"],
      {
        planeShapeDiagram: quadFig(
          "Quadrilateral with interior angles marked 2x, (x + 5)°, (3x − 5)° and 2x.",
          [
            { x: 0, y: 0, angleLabel: "2x" },
            { x: 4.2, y: 0.3, angleLabel: "x+5" },
            { x: 3.6, y: 3, angleLabel: "3x-5" },
            { x: 0.4, y: 2.6, angleLabel: "2x" },
          ]
        ),
      }
    ),
    choice(
      "y7-ang-qdr-m7",
      "Which statement about a square is correct?",
      "D",
      [
        "Opposite angles are equal but not all angles are equal.",
        "All angles sum to 180°.",
        "Co-interior angles are equal.",
        "All four interior angles are 90°.",
      ],
      "A square is a special rectangle. All four angles are right angles (90°). Check: 4 × 90° = 360°."
    ),
    answer(
      "y7-ang-qdr-m8",
      "A trapezoid has angles of 70°, 110°, and 85° (with the 70° and 110° being co-interior on one parallel side). Find the fourth angle in degrees.",
      "70° + 110° + 85° + \\angle D = 360°",
      "95",
      "Fourth angle = 360 - 70 - 110 - 85 = 95°. Check co-interior pair on the other side: 85 + 95 = 180°. Correct.",
      ["95°"],
      {
        planeShapeDiagram: trapezoidFig(
          "Trapezoid with the top and bottom sides chevron-marked parallel. The co-interior pair on the left slanted side is 70° (bottom) and 110° (top); the bottom-right angle is 85° and the top-right (fourth) angle is marked x.",
          ["70°", "85°", "x", "110°"]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-m9",
      "A parallelogram has angles of (3x + 5)° and (x + 15)° as co-interior angles. Find x.",
      "(3x+5) + (x+15) = 180°",
      "40",
      "4x + 20 = 180, so 4x = 160 and x = 40.",
      ["40"],
      {
        planeShapeDiagram: parallelogramFig(
          "Parallelogram with opposite sides chevron-marked parallel. Two co-interior (adjacent) angles are marked (3x + 5)° and (x + 15)°.",
          ["3x+5", "x+15", undefined, undefined]
        ),
      }
    ),
    answer(
      "y7-ang-qdr-m10",
      "A quadrilateral has angles of 68°, 112°, 68°, and 112°. What type of quadrilateral could this be? State the angle sum to verify it is a valid quadrilateral.",
      "68° + 112° + 68° + 112° = 360°",
      "360",
      "68 + 112 + 68 + 112 = 360°. The angle pattern (opposite equal, co-interior supplementary) describes a parallelogram. The angle sum is 360°.",
      ["360°"],
      {
        planeShapeDiagram: parallelogramFig(
          "Quadrilateral with opposite angles equal: 68° at two opposite vertices and 112° at the other two opposite vertices, fitting a parallelogram.",
          ["68°", "112°", "68°", "112°"]
        ),
      }
    ),
  ],
  masteryQuizPool: [
    dq(answer("y7-ang-qdr-p1", "A quadrilateral has angles of 90°, 90°, and 100°. Find the fourth angle in degrees.", "90° + 90° + 100° + \\angle D = 360°", "80", "Fourth angle = 360 - 90 - 90 - 100 = 80°.", ["80°"], { planeShapeDiagram: quadFig("Quadrilateral with two right-angle corners marked 90°, a third angle marked 100°, and the fourth angle marked x.", [{ x: 0, y: 0, angleLabel: "90°", rightAngle: true }, { x: 4.5, y: 0, angleLabel: "90°", rightAngle: true }, { x: 4, y: 2.8, angleLabel: "100°" }, { x: 0.4, y: 2.6, angleLabel: "x" }]) }), 1),
    dq(answer("y7-ang-qdr-p2", "A quadrilateral has angles of 70°, 110°, and 70°. Find the fourth angle in degrees.", "70° + 110° + 70° + \\angle D = 360°", "110", "Fourth angle = 360 - 70 - 110 - 70 = 110°.", ["110°"], { planeShapeDiagram: quadFig("Quadrilateral with three interior angles marked 70°, 110° and 70°, and the fourth angle marked x.", [{ x: 0, y: 0, angleLabel: "70°" }, { x: 4.2, y: 0.3, angleLabel: "110°" }, { x: 3.6, y: 3, angleLabel: "70°" }, { x: 0.4, y: 2.6, angleLabel: "x" }]) }), 1),
    dq(answer("y7-ang-qdr-p3", "A parallelogram has one angle of 60°. Find the size in degrees of the angle opposite to it.", "\\text{Opposite angles in a parallelogram are equal}", "60", "Opposite angles are equal, so the opposite angle is also 60°.", ["60°"], { planeShapeDiagram: parallelogramFig("Parallelogram with opposite sides chevron-marked parallel. One interior angle is marked 60°; the angle opposite it is marked x.", ["60°", undefined, "x", undefined]) }), 1),
    dq(answer("y7-ang-qdr-p4", "Each interior angle of a square is the same. Find the size in degrees of each angle.", "4 \\times \\angle A = 360°", "90", "Each angle = 360 ÷ 4 = 90°.", ["90°"], { planeShapeDiagram: quadFig("Square with all four sides tick-marked equal and each interior angle marked x.", [{ x: 0, y: 0, angleLabel: "x" }, { x: 3, y: 0, angleLabel: "x" }, { x: 3, y: 3, angleLabel: "x" }, { x: 0, y: 3, angleLabel: "x" }], [{ ticks: 1 }, { ticks: 1 }, { ticks: 1 }, { ticks: 1 }]) }), 1),
    dq(choice("y7-ang-qdr-p5", "What is the angle sum of any quadrilateral?", "B", ["180°", "360°", "540°", "720°"], "A quadrilateral splits into two triangles, so its angle sum is 2 × 180° = 360°."), 1),
    dq(choice("y7-ang-qdr-p6", "In a parallelogram, opposite angles are:", "C", ["Supplementary", "Complementary", "Equal", "Always 90°"], "Opposite angles in a parallelogram are equal.", undefined, { planeShapeDiagram: parallelogramFig("Parallelogram with opposite sides chevron-marked parallel, showing the two pairs of opposite interior-angle corners.", [undefined, undefined, undefined, undefined]) }), 1),
    dq(answer("y7-ang-qdr-p7", "A quadrilateral has angles of 88°, 92°, and 100°. Find the fourth angle in degrees.", "88° + 92° + 100° + \\angle D = 360°", "80", "Fourth angle = 360 - 88 - 92 - 100 = 80°.", ["80°"], { planeShapeDiagram: quadFig("Quadrilateral with three interior angles marked 88°, 92° and 100°, and the fourth angle marked x.", [{ x: 0, y: 0, angleLabel: "88°" }, { x: 4.2, y: 0.3, angleLabel: "92°" }, { x: 3.6, y: 3, angleLabel: "100°" }, { x: 0.4, y: 2.6, angleLabel: "x" }]) }), 2),
    dq(answer("y7-ang-qdr-p8", "A parallelogram has one angle of 47°. Find the size in degrees of a co-interior (adjacent) angle.", "47° + \\angle B = 180°", "133", "Co-interior angles are supplementary: 180 - 47 = 133°.", ["133°"], { planeShapeDiagram: parallelogramFig("Parallelogram with opposite sides chevron-marked parallel. One interior angle is marked 47° and the adjacent (co-interior) angle is marked x.", ["47°", "x", undefined, undefined]) }), 2),
    dq(answer("y7-ang-qdr-p9", "A trapezoid has a co-interior angle of 105° on one side of its parallel sides. Find the other co-interior angle on the same side in degrees.", "105° + \\angle B = 180°", "75", "Co-interior angles sum to 180°: 180 - 105 = 75°.", ["75°"], { planeShapeDiagram: trapezoidFig("Trapezoid with the top and bottom sides chevron-marked parallel. On the left slanted side the two co-interior angles are marked 105° (bottom) and x (top).", ["105°", undefined, undefined, "x"]) }), 2),
    dq(answer("y7-ang-qdr-p10", "A rhombus has one angle of 70°. Find the size in degrees of a co-interior (adjacent) angle.", "70° + \\angle B = 180°", "110", "A rhombus is a parallelogram, so co-interior angles are supplementary: 180 - 70 = 110°.", ["110°"], { planeShapeDiagram: parallelogramFig("Rhombus with all four sides tick-marked equal and opposite sides chevron-marked parallel. One interior angle is marked 70° and the adjacent (co-interior) angle is marked x.", ["70°", "x", undefined, undefined], { rhombus: true }) }), 2),
    dq(answer("y7-ang-qdr-p11", "A quadrilateral has angles of 115°, 65°, and 115°. Find the fourth angle in degrees.", "115° + 65° + 115° + \\angle D = 360°", "65", "Fourth angle = 360 - 115 - 65 - 115 = 65°.", ["65°"], { planeShapeDiagram: quadFig("Quadrilateral with three interior angles marked 115°, 65° and 115°, and the fourth angle marked x.", [{ x: 0, y: 0, angleLabel: "115°" }, { x: 4.2, y: 0.3, angleLabel: "65°" }, { x: 3.6, y: 3, angleLabel: "115°" }, { x: 0.4, y: 2.6, angleLabel: "x" }]) }), 2),
    dq(choice("y7-ang-qdr-p12", "Which set of four angles could be the angles of a parallelogram?", "B", ["100°, 100°, 100°, 60°", "100°, 80°, 100°, 80°", "90°, 90°, 100°, 80°", "120°, 120°, 60°, 80°"], "Opposite angles are equal and co-interior angles sum to 180°: 100, 80, 100, 80 works."), 2),
    dq(answer("y7-ang-qdr-p13", "A quadrilateral has angles in the ratio 1 : 2 : 3 : 4. Find the size in degrees of the largest angle.", "x + 2x + 3x + 4x = 360°", "144", "10x = 360, so x = 36. Largest angle = 4 × 36 = 144°.", ["144°"], { planeShapeDiagram: quadFig("Quadrilateral with interior angles marked x, 2x, 3x and 4x in the ratio 1 : 2 : 3 : 4.", [{ x: 0, y: 0, angleLabel: "x" }, { x: 4.2, y: 0.3, angleLabel: "2x" }, { x: 3.6, y: 3, angleLabel: "3x" }, { x: 0.4, y: 2.6, angleLabel: "4x" }]) }), 3),
    dq(answer("y7-ang-qdr-p14", "A trapezoid has co-interior angles x and (x + 40)° on one pair of parallel sides. Find x in degrees.", "x + (x + 40) = 180°", "70", "2x + 40 = 180, so 2x = 140 and x = 70°.", ["70°"], { planeShapeDiagram: trapezoidFig("Trapezoid with the top and bottom sides chevron-marked parallel. On the left slanted side the two co-interior angles are marked x (bottom) and (x + 40)° (top).", ["x", undefined, undefined, "x+40"]) }), 3),
    dq(answer("y7-ang-qdr-p15", "A quadrilateral has three equal angles and a fourth angle of 120°. Find the size in degrees of each of the three equal angles.", "3x + 120° = 360°", "80", "3x = 360 - 120 = 240, so each equal angle = 80°.", ["80°"], { planeShapeDiagram: quadFig("Quadrilateral with three equal interior angles each marked x and the fourth angle marked 120°.", [{ x: 0, y: 0, angleLabel: "x" }, { x: 4.2, y: 0.3, angleLabel: "x" }, { x: 3.6, y: 3, angleLabel: "120°" }, { x: 0.4, y: 2.6, angleLabel: "x" }]) }), 3),
    dq(answer("y7-ang-qdr-p16", "A parallelogram has co-interior angles (2x)° and (x + 30)°. Find x.", "2x + (x + 30) = 180°", "50", "3x + 30 = 180, so 3x = 150 and x = 50.", ["50"], { planeShapeDiagram: parallelogramFig("Parallelogram with opposite sides chevron-marked parallel. Two co-interior (adjacent) angles are marked 2x and (x + 30)°.", ["2x", "x+30", undefined, undefined]) }), 3),
    dq(choice("y7-ang-qdr-p17", "A rhombus has one angle of 120°. What are its four interior angles?", "A", ["120°, 60°, 120°, 60°", "120°, 120°, 60°, 60°", "120°, 90°, 60°, 90°", "120°, 120°, 120°, 0°"], "Opposite angles equal (120° and 120°); co-interior supplementary (60° and 60°). Order: 120, 60, 120, 60.", undefined, { planeShapeDiagram: parallelogramFig("Rhombus with all four sides tick-marked equal and opposite sides chevron-marked parallel. One interior angle is marked 120°; the other three are marked x.", ["120°", "x", "x", "x"], { rhombus: true }) }), 3),
    dq(answer("y7-ang-qdr-p18", "A quadrilateral has angles (x)°, (x + 20)°, (x + 40)°, and (x + 60)°. Find the size in degrees of the smallest angle.", "x + (x+20) + (x+40) + (x+60) = 360", "60", "4x + 120 = 360, so 4x = 240 and x = 60. Smallest angle = 60°.", ["60°"], { planeShapeDiagram: quadFig("Quadrilateral with interior angles marked x, (x + 20)°, (x + 40)° and (x + 60)°.", [{ x: 0, y: 0, angleLabel: "x" }, { x: 4.2, y: 0.3, angleLabel: "x+20" }, { x: 3.6, y: 3, angleLabel: "x+40" }, { x: 0.4, y: 2.6, angleLabel: "x+60" }]) }), 3),
    dq(answer("y7-ang-qdr-p19", "The angles of a quadrilateral are (3x)°, (2x + 10)°, (x + 30)°, and (2x - 10)°. Find x.", "3x + (2x+10) + (x+30) + (2x-10) = 360", "41.25", "Combine: 8x + 30 = 360, so 8x = 330 and x = 41.25.", ["41.25"], { planeShapeDiagram: quadFig("Quadrilateral with interior angles marked 3x, (2x + 10)°, (x + 30)° and (2x − 10)°.", [{ x: 0, y: 0, angleLabel: "3x" }, { x: 4.2, y: 0.3, angleLabel: "2x+10" }, { x: 3.6, y: 3, angleLabel: "x+30" }, { x: 0.4, y: 2.6, angleLabel: "2x-10" }]) }), 4),
    dq(answer("y7-ang-qdr-p20", "A parallelogram has angles (4x - 10)° and (2x + 40)° as co-interior angles. Find the size in degrees of the larger angle.", "(4x-10) + (2x+40) = 180°", "90", "6x + 30 = 180, so 6x = 150 and x = 25. Angles: 4(25) - 10 = 90° and 2(25) + 40 = 90°. The larger (here equal) angle = 90°.", ["90°"], { planeShapeDiagram: parallelogramFig("Parallelogram with opposite sides chevron-marked parallel. Two co-interior (adjacent) angles are marked (4x − 10)° and (2x + 40)°.", ["4x-10", "2x+40", undefined, undefined]) }), 4),
    dq(answer("y7-ang-qdr-p21", "A quadrilateral has angles in the ratio 2 : 3 : 4 : 6. Find the size in degrees of the largest angle.", "2x + 3x + 4x + 6x = 360°", "144", "15x = 360, so x = 24. Largest = 6 × 24 = 144°.", ["144°"], { planeShapeDiagram: quadFig("Quadrilateral with interior angles marked 2x, 3x, 4x and 6x in the ratio 2 : 3 : 4 : 6.", [{ x: 0, y: 0, angleLabel: "2x" }, { x: 4.2, y: 0.3, angleLabel: "3x" }, { x: 3.6, y: 3, angleLabel: "4x" }, { x: 0.4, y: 2.6, angleLabel: "6x" }]) }), 4),
    dq(answer("y7-ang-qdr-p22", "A trapezoid has angles 65° and 115° as a co-interior pair on one parallel side, and a third angle of 78°. Find the fourth angle in degrees.", "65° + 115° + 78° + \\angle D = 360°", "102", "Fourth angle = 360 - 65 - 115 - 78 = 102°. Check other co-interior pair: 78 + 102 = 180.", ["102°"], { planeShapeDiagram: trapezoidFig("Trapezoid with the top and bottom sides chevron-marked parallel. The co-interior pair on the left slanted side is 65° (bottom) and 115° (top); the bottom-right angle is 78° and the top-right (fourth) angle is marked x.", ["65°", "78°", "x", "115°"]) }), 4),
    dq(answer("y7-ang-qdr-p23", "Three angles of a quadrilateral are equal, and the fourth is 90° larger than each of them. Find the size in degrees of each of the three equal angles.", "3x + (x + 90) = 360", "67.5", "4x + 90 = 360, so 4x = 270 and x = 67.5°.", ["67.5°"], { planeShapeDiagram: quadFig("Quadrilateral with three equal interior angles each marked x and the fourth angle marked (x + 90)°.", [{ x: 0, y: 0, angleLabel: "x" }, { x: 4.2, y: 0.3, angleLabel: "x" }, { x: 3.6, y: 3, angleLabel: "x+90" }, { x: 0.4, y: 2.6, angleLabel: "x" }]) }), 5),
    dq(answer("y7-ang-qdr-p24", "In a parallelogram, one angle is 24° more than twice its co-interior angle. Find the size in degrees of the smaller angle.", "x + (2x + 24) = 180", "52", "Let smaller = x. Then x + (2x + 24) = 180, so 3x = 156 and x = 52°.", ["52°"], { planeShapeDiagram: parallelogramFig("Parallelogram with opposite sides chevron-marked parallel. The smaller co-interior angle is marked x and the larger is marked (2x + 24)°.", ["x", "2x+24", undefined, undefined]) }), 5),
    dq(answer("y7-ang-qdr-p25", "A quadrilateral has angles (5x)°, (4x)°, (3x)°, and (3x)°. Find the size in degrees of the largest angle.", "5x + 4x + 3x + 3x = 360", "120", "15x = 360, so x = 24. Largest = 5 × 24 = 120°.", ["120°"], { planeShapeDiagram: quadFig("Quadrilateral with interior angles marked 5x, 4x, 3x and 3x.", [{ x: 0, y: 0, angleLabel: "5x" }, { x: 4.2, y: 0.3, angleLabel: "4x" }, { x: 3.6, y: 3, angleLabel: "3x" }, { x: 0.4, y: 2.6, angleLabel: "3x" }]) }), 5),
    dq(answer("y7-ang-qdr-p26", "The four angles of a quadrilateral are consecutive even numbers (in degrees): n, n+2, n+4, n+6. Find the largest angle in degrees.", "n + (n+2) + (n+4) + (n+6) = 360", "93", "4n + 12 = 360, so 4n = 348 and n = 87. Largest = 87 + 6 = 93°.", ["93°"], { planeShapeDiagram: quadFig("Quadrilateral with interior angles marked n, (n + 2)°, (n + 4)° and (n + 6)°.", [{ x: 0, y: 0, angleLabel: "n" }, { x: 4.2, y: 0.3, angleLabel: "n+2" }, { x: 3.6, y: 3, angleLabel: "n+4" }, { x: 0.4, y: 2.6, angleLabel: "n+6" }]) }), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-qdr-mp1",
      prompt:
        "ABCD is a parallelogram. The angle at vertex A measures 105°. In a parallelogram, opposite angles are equal and co-interior (adjacent) angles are supplementary.",
      latex: "\\angle A = 105°",
      planeShapeDiagram: {
        description:
          "Parallelogram ABCD (A bottom-left, B bottom-right, C top-right, D top-left) with opposite sides chevron-marked parallel. The interior angle at A is marked 105°; angles B, C and D are unknown.",
        vertices: [
          { x: 0, y: 0, label: "A", angleLabel: "105°" },
          { x: 4, y: 0, label: "B" },
          { x: 5, y: 2.6, label: "C" },
          { x: 1, y: 2.6, label: "D" },
        ],
        edges: [{ arrows: 1 }, { arrows: 2 }, { arrows: 1 }, { arrows: 2 }],
        fill: "blue",
      },
      answer: "360",
      hint: "Use opposite-angles-equal for C, and co-interior-supplementary for B and D.",
      explanation:
        "Part (a): angle C is opposite A, so 105°. Part (b): angle B is co-interior with A, so 180 - 105 = 75°. Part (c): the four angles sum to 360° (105 + 75 + 105 + 75).",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the size in degrees of angle C, which is opposite angle A.",
          latex: "\\angle C = \\;?",
          marks: 1,
          answer: "105",
          acceptedAnswers: ["105°"],
          hint: "Opposite angles in a parallelogram are equal.",
          explanation: "Angle C is opposite angle A, so angle C = 105°.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the size in degrees of angle B, which is co-interior (adjacent) to angle A.",
          latex: "105° + \\angle B = 180°",
          marks: 1,
          answer: "75",
          acceptedAnswers: ["75°"],
          hint: "Co-interior angles in a parallelogram are supplementary.",
          explanation: "Angle B = 180 - 105 = 75°.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the sum in degrees of all four interior angles of parallelogram ABCD.",
          latex: "\\angle A + \\angle B + \\angle C + \\angle D = \\;?",
          marks: 1,
          answer: "360",
          acceptedAnswers: ["360°"],
          hint: "Every quadrilateral has the same interior angle sum.",
          explanation: "Any quadrilateral has an angle sum of 360°. Check: 105 + 75 + 105 + 75 = 360.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 4 — Parallel lines and transversals
// ─────────────────────────────────────────────────────────────────────────────

const parallelLinesAndTransversals: LessonContent = {
  description:
    "Identify corresponding, alternate, and co-interior angles formed when a transversal cuts parallel lines, and use these relationships to find unknown angles.",
  learningIntention:
    "Use the corresponding, alternate, and co-interior angle properties of parallel lines and transversals to find unknown angles and identify parallel lines.",
  successCriteria: [
    "Identify corresponding angles (F-shape) and state that they are equal when lines are parallel.",
    "Identify alternate angles (Z-shape) and state that they are equal when lines are parallel.",
    "Identify co-interior angles (C-shape) and state that they sum to 180° when lines are parallel.",
    "Use these angle relationships to find unknown angles in a parallel-line diagram.",
    "Use angle properties to determine whether two lines are parallel.",
  ],
  teaching: {
    paragraphs: [
      "Two lines are parallel when they run in exactly the same direction and never meet, like the two rails of a train track. When a third straight line — a transversal — cuts across both of them, it crosses each at the same slant, because the two lines point the same way. That single fact, 'same slant at both crossings', is the source of every rule in this lesson.",
      "The transversal makes four angles at each crossing, eight in all. To use them you need to spot which pairs are linked, and the quickest way is by the letter-shape they trace. Corresponding angles sit in matching positions — same side of the transversal, and both above (or both below) their own line. They trace an F-shape. Because the transversal hits both lines at the same slant, the angle it opens at the top crossing is the same as the angle it opens in the matching spot at the bottom crossing: corresponding angles are equal.",
      "Alternate angles sit between the two parallel lines on opposite sides of the transversal, tracing a Z-shape. You can see they are equal in two short steps. Start with a corresponding pair, which are equal. Now the angle alternate to one of them is its vertically opposite angle at the same crossing, and vertically opposite angles are equal. So the alternate angle equals the corresponding angle, which equals the original — the alternate pair must be equal too.",
      "Co-interior angles sit between the two parallel lines on the same side of the transversal, tracing a C-shape. These do not match — they add. Take one of them; the angle right next to it along the same line is its corresponding angle from the other crossing (equal), and that neighbour plus the co-interior angle lie together on a straight line, so they sum to $180^\\circ$. Therefore the two co-interior angles sum to $180^\\circ$: they are supplementary. This is the one parallel-line rule where you add to $180^\\circ$ instead of copying the angle.",
      "Putting the three together: F-shape corresponding angles are equal, Z-shape alternate angles are equal, C-shape co-interior angles add to $180^\\circ$. Every one of these comes back to the transversal hitting both lines at the same slant, combined with the straight-line and vertically-opposite facts you already know.",
      "Two cautions. First, these rules only hold when the lines really are parallel — look for the matching arrowheads on the lines before applying them, and never assume parallel just because a diagram looks that way. Second, the easy mistake is treating co-interior angles as equal: they are the same-side C-shape, so they sum to $180^\\circ$, while it is the opposite-side Z-shape alternate angles that are equal. Spot the shape first, then choose 'equal' or 'adds to $180^\\circ$'. The same reasoning runs backwards too: if you can show a corresponding or alternate pair is equal, or a co-interior pair adds to $180^\\circ$, then the two lines must be parallel.",
    ],
    latexBlocks: [
      "\\text{Corresponding angles (F-shape): equal when the lines are parallel}",
      "\\text{Alternate angles (Z-shape): equal when the lines are parallel}",
      "\\text{Co-interior angles (C-shape): sum to } 180^\\circ \\text{ when the lines are parallel}",
      "\\text{Lines are parallel if: corresponding equal, OR alternate equal, OR co-interior sum to } 180^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find an angle using corresponding angles",
      questionLatex:
        "\\text{A transversal crosses two parallel lines. One angle is } 65^\\circ.\\text{ The angle in the corresponding position at the other crossing is unknown. Find it in degrees.}",
      angleFigureDiagram: {
        description:
          "Two parallel lines cut by a transversal. An angle of 65° at the upper intersection and the angle in the matching (corresponding) position at the lower intersection, which is unknown.",
        kind: "transversal",
        transversalDeg: 60,
        parallelLabels: ["l", "m"],
        topAngles: { TL: "65°" },
        bottomAngles: { TL: "x" },
      },
      steps: [
        {
          explanation:
            "The two angles are in matching F-shape positions, and the transversal meets both parallel lines at the same slant, so corresponding angles are equal.",
          latex: "\\text{Corresponding angle} = 65",
        },
      ],
      finalAnswerLatex: "\\text{The corresponding angle is } 65^\\circ.",
    },
    {
      title: "Find an angle using co-interior angles",
      questionLatex:
        "\\text{A transversal crosses two parallel lines. One co-interior angle is } 112^\\circ.\\text{ Find the other co-interior angle in degrees.}",
      angleFigureDiagram: {
        description:
          "Two parallel lines cut by a transversal. The two co-interior angles between the lines on the same side of the transversal: 112° at the upper intersection and the unknown at the lower intersection.",
        kind: "transversal",
        transversalDeg: 60,
        parallelLabels: ["l", "m"],
        topAngles: { BR: "112°" },
        bottomAngles: { TR: "x" },
      },
      steps: [
        {
          explanation:
            "The two angles form a same-side C-shape between the parallel lines, so they are co-interior and add to 180.",
          latex: "112 + \\angle B = 180",
        },
        {
          explanation: "Subtract 112 from 180 to find the other co-interior angle.",
          latex: "\\angle B = 180 - 112 = 68",
        },
      ],
      finalAnswerLatex: "\\text{The co-interior angle is } 68^\\circ.",
    },
    {
      title: "Decide whether two lines are parallel",
      questionLatex:
        "\\text{Two lines are cut by a transversal. The alternate angles formed are } 74^\\circ\\text{ and }74^\\circ.\\text{ Are the two lines parallel? Explain.}",
      angleFigureDiagram: {
        description:
          "Two lines cut by a transversal, with the alternate (Z-shape) angles between the lines on opposite sides of the transversal both marked 74°.",
        kind: "transversal",
        transversalDeg: 60,
        topAngles: { BL: "74°" },
        bottomAngles: { TR: "74°" },
      },
      steps: [
        {
          explanation:
            "Alternate angles are equal only when the two lines are parallel, so check whether this pair is equal.",
          latex: "74 = 74",
        },
        {
          explanation:
            "The alternate angles are equal, so the condition for parallel lines is met.",
          latex: "\\therefore \\text{ the lines are parallel}",
        },
      ],
      finalAnswerLatex:
        "\\text{Yes — the alternate angles are equal, so the lines are parallel.}",
    },
    {
      title: "Harder: chain corresponding, straight-line, and alternate rules",
      questionLatex:
        "\\text{A transversal crosses two parallel lines. At the upper crossing the angle on the upper-left is } 124^\\circ.\\text{ Find the co-interior angle on the same side at the lower crossing, in degrees.}",
      angleFigureDiagram: {
        description:
          "Two parallel lines cut by a transversal. The upper-left angle at the upper intersection is 124°; the required co-interior angle (between the lines, same side of the transversal) at the lower intersection is unknown.",
        kind: "transversal",
        transversalDeg: 60,
        parallelLabels: ["l", "m"],
        topAngles: { TL: "124°" },
        bottomAngles: { TR: "x" },
      },
      steps: [
        {
          explanation:
            "The 124 angle and the angle below it on the same line are corresponding (F-shape), so the matching angle at the lower crossing on that side is also 124.",
          latex: "\\text{corresponding angle at lower crossing} = 124",
        },
        {
          explanation:
            "But we want the co-interior angle, which sits on the same side of the transversal between the lines and is supplementary to the upper angle.",
          latex: "124 + \\angle C = 180",
        },
        {
          explanation: "Subtract 124 from 180 to find the co-interior angle.",
          latex: "\\angle C = 180 - 124 = 56",
        },
        {
          explanation:
            "Check: the co-interior angle 56 and the corresponding angle 124 lie on a straight line at the lower crossing, and 56 + 124 = 180, as they should.",
          latex: "56 + 124 = 180 \\;\\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{The co-interior angle is } 56^\\circ.",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ang-par-g1",
      "Which shape describes the position of corresponding angles formed when a transversal crosses two parallel lines?",
      "A",
      ["F-shape", "Z-shape", "C-shape", "X-shape"],
      "Corresponding angles form an F-shape (or backwards F). They are equal when the lines are parallel."
    ),
    answer(
      "y7-ang-par-g2",
      "A transversal crosses two parallel lines. One angle is 58°. Find the corresponding angle in degrees.",
      "\\text{Corresponding angles are equal}",
      "58",
      "Corresponding angles (F-shape) are equal when lines are parallel. The corresponding angle is also 58°.",
      ["58°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; an angle of 58° at one intersection and its corresponding (matching-position) angle at the other intersection, which is unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { TL: "58°" },
          bottomAngles: { TL: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-g3",
      "A transversal crosses two parallel lines. One alternate angle is 43°. Find the other alternate angle in degrees.",
      "\\text{Alternate angles are equal}",
      "43",
      "Alternate angles (Z-shape) are equal when lines are parallel. The alternate angle is also 43°.",
      ["43°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; the two alternate (Z-shape) angles between the lines on opposite sides of the transversal, one 43° and the other unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BL: "43°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-g4",
      "A transversal crosses two parallel lines. One co-interior angle is 67°. Find the other co-interior angle in degrees.",
      "67° + \\angle B = 180°",
      "113",
      "Co-interior angles (C-shape) sum to 180°. Other angle = 180 - 67 = 113°.",
      ["113°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; the two co-interior (C-shape) angles between the lines on the same side of the transversal, one 67° and the other unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "67°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-par-i1",
      "A transversal crosses two parallel lines. One angle is 119°. Find the corresponding angle in degrees.",
      "\\text{Corresponding angles are equal}",
      "119",
      "Corresponding angles (F-shape) are equal. The corresponding angle is also 119°.",
      ["119°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; an angle of 119° at one intersection and its corresponding angle at the other, which is unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { TL: "119°" },
          bottomAngles: { TL: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-i2",
      "A transversal crosses two parallel lines. One co-interior angle is 134°. Find the other co-interior angle in degrees.",
      "134° + \\angle B = 180°",
      "46",
      "Co-interior angles sum to 180°. Other angle = 180 - 134 = 46°.",
      ["46°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; the two co-interior angles, one 134° and the other unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "134°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-i3",
      "A transversal crosses two parallel lines. An alternate angle to a 77° angle is unknown. Find it in degrees.",
      "\\text{Alternate angles are equal}",
      "77",
      "Alternate angles (Z-shape) are equal when lines are parallel. The alternate angle is 77°.",
      ["77°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; the two alternate (Z-shape) angles, one 77° and the other unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BL: "77°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
    choice(
      "y7-ang-par-i4",
      "Two lines are cut by a transversal. The co-interior angles are 95° and 85°. Are the two lines parallel?",
      "A",
      [
        "Yes — co-interior angles sum to 180°",
        "No — co-interior angles must be equal",
        "Yes — alternate angles are equal",
        "No — co-interior angles sum to 360°",
      ],
      "Co-interior angles sum to 95 + 85 = 180°. Since they sum to 180°, the lines are parallel.",
      "\\text{Select A, B, C, or D.}",
      {
        angleFigureDiagram: {
          description:
            "Two lines cut by a transversal; the two co-interior angles between them are marked 95° and 85°.",
          kind: "transversal",
          transversalDeg: 60,
          topAngles: { BR: "95°" },
          bottomAngles: { TR: "85°" },
        },
      }
    ),
    answer(
      "y7-ang-par-i5",
      "A transversal crosses two parallel lines. One angle is 52°. Find the size in degrees of the co-interior angle on the same side.",
      "52° + \\angle B = 180°",
      "128",
      "Co-interior angles sum to 180°. The co-interior angle = 180 - 52 = 128°.",
      ["128°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; one co-interior angle is 52° and the other on the same side is unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "52°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
  ],
  commonMistakes: [
    {
      mistake: "Thinking that co-interior angles are equal rather than supplementary.",
      fix: "Co-interior angles (C-shape, same side) sum to 180°. It is alternate angles (Z-shape, opposite sides) that are equal.",
    },
    {
      mistake: "Confusing corresponding (F-shape) with alternate (Z-shape) angles.",
      fix: "Corresponding angles are on the same side of the transversal, in matching positions (both above or both below). Alternate angles are on opposite sides.",
    },
    {
      mistake: "Applying parallel-line angle rules when the lines are not stated to be parallel.",
      fix: "These rules only hold when the lines are explicitly marked or stated as parallel. Check for parallel line arrows (>>) in the diagram before applying the rules.",
    },
    {
      mistake: "Using the co-interior rule when the angles are actually corresponding or alternate.",
      fix: "Identify the shape first: F = corresponding (equal), Z = alternate (equal), C = co-interior (supplementary). Picking the wrong shape gives the wrong relationship.",
    },
  ],
  masteryQuiz: [
    choice(
      "y7-ang-par-m1",
      "Which type of angle pair is described by a Z-shape when a transversal crosses parallel lines?",
      "B",
      ["Corresponding", "Alternate", "Co-interior", "Vertically opposite"],
      "Alternate angles form a Z-shape (or backwards Z / N). They are equal when lines are parallel."
    ),
    answer(
      "y7-ang-par-m2",
      "A transversal crosses two parallel lines. One angle is 81°. Find the alternate angle in degrees.",
      "\\text{Alternate angles are equal}",
      "81",
      "Alternate angles are equal when lines are parallel. The alternate angle is also 81°.",
      ["81°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; the two alternate (Z-shape) angles, one 81° and the other unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BL: "81°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-m3",
      "A transversal crosses two parallel lines. One co-interior angle is 103°. Find the other co-interior angle in degrees.",
      "103° + \\angle B = 180°",
      "77",
      "Co-interior angles sum to 180°. Other angle = 180 - 103 = 77°.",
      ["77°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; the two co-interior angles, one 103° and the other unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "103°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-m4",
      "A transversal crosses two parallel lines. A corresponding angle to a 126° angle is unknown. Find it in degrees.",
      "\\text{Corresponding angles are equal}",
      "126",
      "Corresponding angles are equal when lines are parallel. The corresponding angle is also 126°.",
      ["126°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; a 126° angle at one intersection and its corresponding angle at the other, which is unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { TL: "126°" },
          bottomAngles: { TL: "x" },
        },
      }
    ),
    choice(
      "y7-ang-par-m5",
      "Two lines are cut by a transversal. The alternate angles formed measure 68° and 71°. What can you conclude?",
      "C",
      [
        "The lines are parallel because 68 + 71 is close to 180°.",
        "The lines are parallel because alternate angles are equal.",
        "The lines are not parallel because 68° ≠ 71°.",
        "No conclusion can be drawn from alternate angles.",
      ],
      "If the lines were parallel, alternate angles would be equal. Since 68° ≠ 71°, the lines are not parallel.",
      "\\text{Select A, B, C, or D.}",
      {
        angleFigureDiagram: {
          description:
            "Two lines cut by a transversal; the alternate angles are marked 68° and 71° (not equal, so the lines are not parallel).",
          kind: "transversal",
          transversalDeg: 60,
          topAngles: { BL: "68°" },
          bottomAngles: { TR: "71°" },
        },
      }
    ),
    answer(
      "y7-ang-par-m6",
      "A transversal crosses two parallel lines. One angle at the top intersection is 55°. Another angle at the bottom intersection is vertically opposite to the co-interior partner of the 55° angle. Find this angle in degrees.",
      "\\text{Co-interior of }55° = 125°;\\text{ vertically opposite} = 125°",
      "125",
      "Co-interior of 55° = 180 - 55 = 125°. The angle vertically opposite to 125° is also 125°.",
      ["125°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; a 55° angle at the top intersection (its co-interior partner at the bottom is 125°) and the angle vertically opposite that partner, which is the unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "55°" },
          bottomAngles: { BL: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-m7",
      "A transversal crosses two parallel lines. An angle at one intersection is (3x + 12)°. The corresponding angle at the other intersection is (5x - 8)°. Find x.",
      "3x + 12 = 5x - 8",
      "10",
      "Corresponding angles are equal: 3x + 12 = 5x - 8. So 20 = 2x and x = 10.",
      ["10"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; corresponding angles labelled (3x + 12)° and (5x − 8)° at matching positions of the two intersections.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { TL: "(3x+12)°" },
          bottomAngles: { TL: "(5x-8)°" },
        },
      }
    ),
    answer(
      "y7-ang-par-m8",
      "A transversal crosses two parallel lines. Co-interior angles are (2x + 30)° and (x + 15)°. Find x.",
      "(2x+30) + (x+15) = 180°",
      "45",
      "3x + 45 = 180, so 3x = 135 and x = 45.",
      ["45"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; the two co-interior angles labelled (2x + 30)° and (x + 15)°.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "(2x+30)°" },
          bottomAngles: { TR: "(x+15)°" },
        },
      }
    ),
    choice(
      "y7-ang-par-m9",
      "A transversal crosses two parallel lines. One angle is 70°. Which of the following is true of the co-interior angle on the same side?",
      "D",
      ["It is 70° (equal to the first angle).", "It is 20° (complement of 70°).", "It is 290° (reflex angle).", "It is 110° (supplementary to 70°)."],
      "Co-interior angles sum to 180°. The co-interior angle = 180 - 70 = 110°.",
      "\\text{Select A, B, C, or D.}",
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; one co-interior angle is 70° and the other on the same side is unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "70°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
    answer(
      "y7-ang-par-m10",
      "A transversal crosses two parallel lines. At one intersection, an angle of 48° is formed. Find the size in degrees of the angle that is alternate to the supplement of 48°.",
      "\\text{Supplement of }48° = 132°;\\text{ alternate to }132° = 132°",
      "132",
      "The supplement of 48° = 180 - 48 = 132°. The alternate angle to 132° is also 132° (alternate angles are equal on parallel lines).",
      ["132°"],
      {
        angleFigureDiagram: {
          description:
            "Two parallel lines cut by a transversal; a 48° angle at the top intersection. Its supplement on the same line is 132°, and the angle alternate to that supplement at the lower intersection is the unknown.",
          kind: "transversal",
          transversalDeg: 60,
          parallelLabels: ["l", "m"],
          topAngles: { BR: "48°" },
          bottomAngles: { TR: "x" },
        },
      }
    ),
  ],
  masteryQuizPool: [
    dq(answer("y7-ang-par-p1", "A transversal crosses two parallel lines. One angle is 40°. Find the corresponding angle in degrees.", "\\text{Corresponding angles are equal}", "40", "Corresponding angles are equal, so the corresponding angle is 40°.", ["40°"], { angleFigureDiagram: { description: "Two parallel lines cut by a transversal; a 40° angle and its corresponding angle (unknown).", kind: "transversal", transversalDeg: 60, parallelLabels: ["l", "m"], topAngles: { TL: "40°" }, bottomAngles: { TL: "x" } } }), 1),
    dq(answer("y7-ang-par-p2", "A transversal crosses two parallel lines. One alternate angle is 55°. Find the other alternate angle in degrees.", "\\text{Alternate angles are equal}", "55", "Alternate angles are equal, so the other alternate angle is 55°.", ["55°"], { angleFigureDiagram: { description: "Two parallel lines cut by a transversal; the two alternate (Z-shape) angles, one 55° and the other unknown.", kind: "transversal", transversalDeg: 60, parallelLabels: ["l", "m"], topAngles: { BL: "55°" }, bottomAngles: { TR: "x" } } }), 1),
    dq(answer("y7-ang-par-p3", "A transversal crosses two parallel lines. One co-interior angle is 80°. Find the other co-interior angle in degrees.", "80° + \\angle B = 180°", "100", "Co-interior angles sum to 180°: 180 - 80 = 100°.", ["100°"], { angleFigureDiagram: { description: "Two parallel lines cut by a transversal; the two co-interior angles, one 80° and the other unknown.", kind: "transversal", transversalDeg: 60, parallelLabels: ["l", "m"], topAngles: { BR: "80°" }, bottomAngles: { TR: "x" } } }), 1),
    dq(choice("y7-ang-par-p4", "Which shape describes alternate angles on parallel lines?", "B", ["F-shape", "Z-shape", "C-shape", "X-shape"], "Alternate angles form a Z-shape and are equal when the lines are parallel."), 1),
    dq(choice("y7-ang-par-p5", "Which shape describes co-interior angles on parallel lines?", "C", ["F-shape", "Z-shape", "C-shape", "T-shape"], "Co-interior angles form a C-shape and sum to 180° when the lines are parallel."), 1),
    dq(answer("y7-ang-par-p6", "A transversal crosses two parallel lines. A corresponding angle to a 132° angle is unknown. Find it in degrees.", "\\text{Corresponding angles are equal}", "132", "Corresponding angles are equal, so it is 132°.", ["132°"], { angleFigureDiagram: { description: "Two parallel lines cut by a transversal; a 132° angle and its corresponding angle (unknown).", kind: "transversal", transversalDeg: 60, parallelLabels: ["l", "m"], topAngles: { TL: "132°" }, bottomAngles: { TL: "x" } } }), 1),
    dq(answer("y7-ang-par-p7", "A transversal crosses two parallel lines. One co-interior angle is 117°. Find the other co-interior angle in degrees.", "117° + \\angle B = 180°", "63", "180 - 117 = 63°.", ["63°"], { angleFigureDiagram: { description: "Two parallel lines cut by a transversal; the two co-interior angles, one 117° and the other unknown.", kind: "transversal", transversalDeg: 60, parallelLabels: ["l", "m"], topAngles: { BR: "117°" }, bottomAngles: { TR: "x" } } }), 2),
    dq(answer("y7-ang-par-p8", "A transversal crosses two parallel lines. One angle is 64°. Find the co-interior angle on the same side in degrees.", "64° + \\angle B = 180°", "116", "Co-interior angles sum to 180°: 180 - 64 = 116°.", ["116°"], { angleFigureDiagram: { description: "Two parallel lines cut by a transversal; one co-interior angle is 64° and the other on the same side is unknown.", kind: "transversal", transversalDeg: 60, parallelLabels: ["l", "m"], topAngles: { BR: "64°" }, bottomAngles: { TR: "x" } } }), 2),
    dq(answer("y7-ang-par-p9", "A transversal crosses two parallel lines. An alternate angle to a 98° angle is unknown. Find it in degrees.", "\\text{Alternate angles are equal}", "98", "Alternate angles are equal, so it is 98°.", ["98°"], { angleFigureDiagram: { description: "Two parallel lines cut by a transversal; the two alternate (Z-shape) angles, one 98° and the other unknown.", kind: "transversal", transversalDeg: 60, parallelLabels: ["l", "m"], topAngles: { BL: "98°" }, bottomAngles: { TR: "x" } } }), 2),
    dq(choice("y7-ang-par-p10", "Two lines are cut by a transversal. The co-interior angles are 100° and 90°. Are the lines parallel?", "B", ["Yes — co-interior angles are equal", "No — co-interior angles must sum to 180°, but 100 + 90 = 190", "Yes — they sum to 190°", "No — co-interior angles must be equal"], "Co-interior angles must sum to 180° for parallel lines. 100 + 90 = 190 ≠ 180, so the lines are not parallel."), 2),
    dq(answer("y7-ang-par-p11", "A transversal crosses two parallel lines. One angle is 73°. Find the size in degrees of the angle that is supplementary to it on the same straight line.", "73° + \\angle B = 180°", "107", "Angles on a straight line are supplementary: 180 - 73 = 107°.", ["107°"]), 2),
    dq(choice("y7-ang-par-p12", "Corresponding angles are equal only when:", "C", ["The transversal is vertical", "The angles are acute", "The two lines crossed are parallel", "Always, in every case"], "Corresponding angles are equal only when the two lines cut by the transversal are parallel."), 2),
    dq(answer("y7-ang-par-p13", "A transversal crosses two parallel lines. The supplement of a 50° angle is taken, then its alternate angle is found. Find this alternate angle in degrees.", "\\text{Supplement of }50° = 130°;\\ \\text{alternate} = 130°", "130", "Supplement of 50° = 130°. Its alternate angle is also 130°.", ["130°"]), 3),
    dq(answer("y7-ang-par-p14", "A transversal crosses two parallel lines. One angle at the top intersection is 68°. Find the co-interior angle, then the angle vertically opposite that co-interior angle, in degrees.", "\\text{Co-interior} = 112°;\\ \\text{vertically opposite} = 112°", "112", "Co-interior of 68° = 112°. Vertically opposite to 112° is 112°.", ["112°"]), 3),
    dq(answer("y7-ang-par-p15", "A transversal crosses two parallel lines. Corresponding angles are (2x + 20)° and (4x - 10)°. Find x.", "2x + 20 = 4x - 10", "15", "Corresponding angles are equal: 2x + 20 = 4x - 10, so 30 = 2x and x = 15.", ["15"]), 3),
    dq(answer("y7-ang-par-p16", "A transversal crosses two parallel lines. Co-interior angles are (3x)° and (2x + 20)°. Find x.", "3x + (2x + 20) = 180°", "32", "5x + 20 = 180, so 5x = 160 and x = 32.", ["32"]), 3),
    dq(answer("y7-ang-par-p17", "A transversal crosses two parallel lines. Alternate angles are (5x - 12)° and (3x + 18)°. Find x.", "5x - 12 = 3x + 18", "15", "Alternate angles are equal: 5x - 12 = 3x + 18, so 2x = 30 and x = 15.", ["15"]), 3),
    dq(choice("y7-ang-par-p18", "Two lines are cut by a transversal. Corresponding angles measure 84° and 84°. What can you conclude?", "A", ["The lines are parallel because corresponding angles are equal", "The lines are not parallel", "The lines are perpendicular", "No conclusion is possible"], "Equal corresponding angles prove the two lines are parallel."), 3),
    dq(answer("y7-ang-par-p19", "A transversal crosses two parallel lines. One angle is (3x + 15)° and its co-interior angle is (2x + 25)°. Find x.", "(3x+15) + (2x+25) = 180°", "28", "5x + 40 = 180, so 5x = 140 and x = 28.", ["28"]), 4),
    dq(answer("y7-ang-par-p20", "A transversal crosses two parallel lines. An angle and its corresponding angle are (7x - 5)° and (5x + 21)°. Find the size in degrees of one of these angles.", "7x - 5 = 5x + 21", "86", "Corresponding angles equal: 7x - 5 = 5x + 21, so 2x = 26 and x = 13. Angle = 7(13) - 5 = 86°.", ["86°"]), 4),
    dq(answer("y7-ang-par-p21", "A transversal crosses two parallel lines. Co-interior angles are (3x + 20)° and (2x + 40)°. Find the size in degrees of the larger of the two angles.", "(3x+20) + (2x+40) = 180°", "92", "5x + 60 = 180, so 5x = 120 and x = 24. Angles: 3(24)+20 = 92° and 2(24)+40 = 88°. Larger = 92°.", ["92°"]), 4),
    dq(answer("y7-ang-par-p22", "A transversal crosses two parallel lines. Two co-interior angles are (2x)° and (x + 30)°. Find x.", "2x + (x + 30) = 180°", "50", "3x + 30 = 180, so 3x = 150 and x = 50.", ["50"]), 4),
    dq(answer("y7-ang-par-p23", "A transversal crosses two parallel lines. The angle formed is (3x - 4)° and the alternate angle is (2x + 16)°. After finding x, find the supplement of that angle in degrees.", "3x - 4 = 2x + 16;\\ \\text{then } 180 - \\text{angle}", "124", "3x - 4 = 2x + 16, so x = 20. Angle = 3(20) - 4 = 56°. Supplement = 180 - 56 = 124°.", ["124°"]), 5),
    dq(answer("y7-ang-par-p24", "A transversal crosses two parallel lines. Two co-interior angles are (5x + 5)° and (3x + 15)°. After finding x, find the difference in degrees between the two angles.", "(5x+5) + (3x+15) = 180", "30", "8x + 20 = 180, so 8x = 160 and x = 20. Angles: 5(20)+5 = 105° and 3(20)+15 = 75°. Difference = 105 - 75 = 30°.", ["30°"]), 5),
    dq(answer("y7-ang-par-p25", "A transversal crosses two parallel lines. An angle at the top is (2x + 35)° and the corresponding angle at the bottom is vertically opposite an angle of (4x - 5)°. Since the corresponding angle equals (4x - 5)°, set 2x + 35 = 4x - 5 and find x.", "2x + 35 = 4x - 5", "20", "2x + 35 = 4x - 5, so 40 = 2x and x = 20.", ["20"]), 5),
    dq(answer("y7-ang-par-p26", "A transversal crosses two parallel lines. The acute angle formed is x° and the obtuse angle on the same straight line is (x + 50)°. Find the acute angle in degrees.", "x + (x + 50) = 180", "65", "x + (x + 50) = 180, so 2x = 130 and x = 65°.", ["65°"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-par-mp1",
      prompt:
        "A transversal cuts two parallel lines at points P (on the upper line) and Q (on the lower line). At P, the angle between the transversal and the upper line, on the upper-right, measures 113°.",
      latex: "\\angle \\text{at }P = 113°",
      angleFigureDiagram: {
        description:
          "Two parallel lines cut by a transversal at P (upper) and Q (lower). The upper-right angle at P is 113°. Its corresponding angle at Q is 113°, the co-interior angle at Q is 67°, and the angle on the upper line adjacent to 113° at P is 67°.",
        kind: "transversal",
        transversalDeg: 60,
        parallelLabels: ["P", "Q"],
        topAngles: { TR: "113°", TL: "?" },
        bottomAngles: { TR: "?" },
      },
      answer: "67",
      hint: "Apply corresponding (F), co-interior (C), and straight-line rules in turn.",
      explanation:
        "Part (a): the corresponding angle at Q equals 113°. Part (b): the co-interior angle at Q = 180 - 113 = 67°. Part (c): the angle on the straight line at P next to 113° = 180 - 113 = 67°.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the size in degrees of the angle at Q that is in the corresponding position to the 113° angle at P.",
          latex: "\\text{corresponding angle} = \\;?",
          marks: 1,
          answer: "113",
          acceptedAnswers: ["113°"],
          hint: "Corresponding angles (F-shape) are equal on parallel lines.",
          explanation: "The corresponding angle at Q equals 113°.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the size in degrees of the co-interior angle at Q (between the parallel lines, on the same side of the transversal as the 113° angle).",
          latex: "113° + \\angle B = 180°",
          marks: 1,
          answer: "67",
          acceptedAnswers: ["67°"],
          hint: "Co-interior angles (C-shape) sum to 180°.",
          explanation: "Co-interior angle = 180 - 113 = 67°.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the size in degrees of the angle at P that lies on the same straight upper line, adjacent to the 113° angle.",
          latex: "113° + \\angle C = 180°",
          marks: 1,
          answer: "67",
          acceptedAnswers: ["67°"],
          hint: "Angles on a straight line are supplementary.",
          explanation: "The adjacent angle on the straight line = 180 - 113 = 67°.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 5 — Angle relationships problem solving
// ─────────────────────────────────────────────────────────────────────────────

const angleRelationshipsProblemSolving: LessonContent = {
  description:
    "Solve multi-step angle problems combining parallel-line properties, triangle angle sum, and other angle relationships, giving geometric reasons for each step.",
  learningIntention:
    "Combine multiple angle relationships to find unknown angles in complex diagrams involving parallel lines, triangles, and other angle rules, and state geometric reasons for each step.",
  successCriteria: [
    "Identify which angle relationships apply in a given diagram (parallel lines, triangle sum, vertically opposite, etc.).",
    "Apply two or more angle relationships in sequence to find an unknown angle.",
    "Write a clear geometric reason for each step (e.g. 'alternate angles on parallel lines').",
    "Find unknown angles in diagrams where parallel lines are cut by a transversal that also forms a triangle.",
  ],
  teaching: {
    paragraphs: [
      "By now you have a toolbox of angle rules: angles on a line, angles at a point, vertically opposite, the triangle sum, the exterior angle, and the parallel-line family of corresponding, alternate, and co-interior. Real exam diagrams rarely give the answer from a single rule. The skill that earns a Band 6 is not knowing more rules — it is choosing which rule to fire first and then feeding its result into the next.",
      "Think of it as building a bridge across the diagram. You cannot reach the unknown angle in one leap, so you lay stepping stones: find any angle you can from the given information, write it on the diagram, and then look again — that new angle often unlocks a rule that was out of reach before. Repeat until a rule finally points at the angle you want. The reason a chain works is that each rule is exact, so a correct angle fed into the next rule gives another correct angle, with no rounding or guessing along the way.",
      "Here is the move at the heart of most parallel-line-and-triangle problems. A triangle has a corner sitting on one of two parallel lines, with its opposite side lying along the other parallel line. The transversal sides of the triangle cut across the parallel lines, so a base angle of the triangle and an angle out at the parallel line are alternate angles (Z-shape) — and therefore equal. That single link lets you carry a known angle from the parallel lines into the triangle, where the triangle sum then finishes the job.",
      "Work one specific case to see the chain. Suppose alternate angles give two interior angles of a triangle as $50^\\circ$ and $70^\\circ$. First rule used: alternate angles on parallel lines, to obtain those two interior angles. Second rule: the triangle sum, giving the third angle as $180^\\circ-50^\\circ-70^\\circ=60^\\circ$. Two rules, in order, each stepping off the one before.",
      "In NSW exams you must write a geometric reason for every step, and a reason has two parts: the rule and the condition it depends on. Do not write '$65^\\circ$ because of parallel lines'; write '$65^\\circ$ (alternate angles, $AB \\parallel CD$)'. Naming the rule shows you know which fact you used; naming the parallel lines (or the triangle) shows you checked it was allowed to be used. Missing either part loses marks even when the number is right.",
      "Two traps to avoid as the chains get longer. First, do not try to leap to the final answer — label each intermediate angle as you find it, so you never reuse an angle in the wrong place. Second, keep the exterior angle of a triangle out of the interior angle sum: the $180^\\circ$ sum is for the three angles inside the triangle, while an exterior angle equals the sum of the two far interior angles instead. And as always, treat the diagram as a guide to layout only — never measure or assume an angle's size from how it looks; every angle must come from a rule.",
    ],
    latexBlocks: [
      "\\text{Reason format: } \\angle ABC = 70^\\circ \\text{ (alternate angles, } PQ \\parallel RS\\text{)}",
      "\\text{Triangle angle sum: } \\angle A + \\angle B + \\angle C = 180^\\circ",
      "\\text{Co-interior angles: } \\angle A + \\angle B = 180^\\circ \\text{ (} PQ \\parallel RS\\text{)}",
      "\\text{Exterior angle} = \\text{sum of the two non-adjacent interior angles}",
    ],
  },
  workedExamples: [
    {
      title: "Find an angle using parallel lines and a triangle",
      questionLatex:
        "\\text{Two parallel lines are cut by a transversal. A triangle is formed with one vertex on each parallel line. The angle at the top vertex (between the transversal and the top parallel line) is }50°.\\text{ The angle at the bottom vertex (between the transversal and the bottom parallel line, on the other side) is }70°.\\text{ Find the angle at the third vertex of the triangle in degrees.}",
      triangleDiagram: triFig(
        "Triangle formed between the two parallel lines, with the two interior angles transferred by the alternate-angle rule marked 50° and 70°, and the third interior angle marked x.",
        { A: "50°", B: "70°", C: "x" }
      ),
      steps: [
        {
          explanation:
            "The 50 angle at the top vertex transfers into the triangle as an interior angle, because it is alternate (Z-shape) to the triangle side crossing the parallel lines.",
          latex: "\\angle \\text{top} = 50 \\text{ (alternate angles)}",
        },
        {
          explanation:
            "The 70 angle at the bottom vertex is, in the same way, an interior angle of the triangle.",
          latex: "\\angle \\text{bottom} = 70 \\text{ (alternate angles)}",
        },
        {
          explanation: "Now both base angles are known, so use the triangle sum to find the third angle.",
          latex: "\\angle \\text{third} = 180 - 50 - 70 = 60",
        },
      ],
      finalAnswerLatex: "\\text{The third angle of the triangle is } 60^\\circ.",
    },
    {
      title: "Multi-step: co-interior then vertically opposite",
      questionLatex:
        "\\text{Two parallel lines are cut by a transversal. At the upper crossing one angle is }118^\\circ.\\text{ Find the co-interior angle at the lower crossing, then the angle vertically opposite that co-interior angle, in degrees.}",
      steps: [
        {
          explanation:
            "The two angles are co-interior (C-shape) on parallel lines, so they are supplementary: subtract from 180.",
          latex: "118 + \\angle B = 180,\\quad \\angle B = 62",
        },
        {
          explanation:
            "At the lower crossing, the angle diagonally across from the co-interior angle is vertically opposite it, so it is equal.",
          latex: "\\text{Vertically opposite} = 62",
        },
      ],
      finalAnswerLatex:
        "\\text{The co-interior angle is }62^\\circ\\text{ and the angle vertically opposite it is }62^\\circ.",
    },
    {
      title: "Parallel lines feeding an isosceles triangle",
      questionLatex:
        "\\text{Triangle }ABC\\text{ has vertex }A\\text{ on one parallel line and side }BC\\text{ on the other. The apex angle at }A\\text{ is }80^\\circ\\text{ and the triangle is isosceles with equal base angles at }B\\text{ and }C.\\text{ Find each base angle, and the alternate angle it makes at the lower line, in degrees.}",
      triangleDiagram: {
        ...isoscelesFig(
          "Isosceles triangle ABC with apex angle 80° at A, the two equal sides AB and AC tick-marked, and equal base angles marked x at B and C.",
          { A: "80°", B: "x", C: "x" }
        ),
        vertexLabels: { A: "A", C: "B", B: "C" },
      },
      steps: [
        {
          explanation:
            "The equal base angles each equal x, and with the apex they fill the triangle sum of 180.",
          latex: "80 + 2x = 180",
        },
        {
          explanation: "Subtract the apex, then divide by 2 to find each base angle.",
          latex: "2x = 100,\\quad x = 50",
        },
        {
          explanation:
            "Each base angle is alternate (Z-shape) to the angle the triangle side makes with the lower parallel line, so that alternate angle is equal to it.",
          latex: "\\text{Alternate angle at lower line} = 50",
        },
      ],
      finalAnswerLatex: "\\text{Each base angle is } 50^\\circ, \\text{ matching a } 50^\\circ \\text{ alternate angle at the lower line.}",
    },
    {
      title: "Harder: chain co-interior, isosceles, and exterior angle",
      questionLatex:
        "\\text{Parallel lines } PQ \\parallel RS \\text{ are cut by a transversal. A co-interior angle at } PQ \\text{ measures } 124^\\circ. \\text{ Its co-interior partner at } RS \\text{ is the apex of an isosceles triangle with equal base angles. One base, extended, makes an exterior angle. Find that exterior angle in degrees.}",
      triangleDiagram: isoscelesFig(
        "Isosceles triangle whose apex (the co-interior partner of 124°) is marked 56°, with the two equal sides tick-marked and equal base angles marked x. One base is extended to form the required exterior angle.",
        { A: "56°", B: "x", C: "x" }
      ),
      steps: [
        {
          explanation:
            "Find the apex first: the co-interior partner is supplementary to 124 because co-interior angles on parallel lines add to 180.",
          latex: "\\text{apex} = 180 - 124 = 56",
        },
        {
          explanation:
            "The triangle is isosceles, so the two base angles are equal; call each x and use the triangle sum.",
          latex: "56 + 2x = 180",
        },
        {
          explanation: "Solve for one base angle.",
          latex: "2x = 124,\\quad x = 62",
        },
        {
          explanation:
            "Extending one base makes an exterior angle supplementary to that base angle, since they sit on a straight line.",
          latex: "\\text{exterior angle} = 180 - 62 = 118",
        },
        {
          explanation:
            "Check with the exterior-angle rule: it should equal the sum of the two far interior angles, the apex and the other base angle.",
          latex: "56 + 62 = 118 \\;\\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{The exterior angle is } 118^\\circ.",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ang-prb-g1",
      "In a multi-step angle problem, you are told two parallel lines are cut by a transversal forming a triangle. Which two rules are most likely needed?",
      "C",
      [
        "Complementary angles and supplementary angles",
        "Vertically opposite angles and revolution",
        "Alternate or corresponding angles, and triangle angle sum",
        "Co-interior angles and quadrilateral angle sum",
      ],
      "When parallel lines form a triangle with a transversal, the standard combination is a parallel-line rule (alternate, corresponding, or co-interior) together with the triangle angle sum."
    ),
    answer(
      "y7-ang-prb-g2",
      "Two parallel lines are cut by a transversal. At the top intersection an angle of 65° is formed. The alternate angle at the bottom intersection is part of a triangle whose other two interior angles are 65° and an unknown angle. Find the unknown angle of the triangle in degrees.",
      "65° + 65° + \\angle C = 180°",
      "50",
      "Alternate angle at the bottom = 65°. Triangle angle sum: 65 + 65 + unknown = 180, so unknown = 50°.",
      ["50°"],
      {
        triangleDiagram: triFig(
          "Triangle formed between the parallel lines, with two interior angles marked 65° (one transferred by the alternate-angle rule) and the third interior angle marked x.",
          { A: "65°", B: "65°", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-prb-g3",
      "Two parallel lines are cut by a transversal. At the top intersection, the angle between the transversal and the top line is 48°. The alternate angle at the bottom intersection is one interior angle of a triangle. The triangle also has an interior angle of 62°. Find the third angle of that triangle in degrees.",
      "48° + 62° + \\angle C = 180°",
      "70",
      "Alternate angles are equal, so the interior angle of the triangle at the bottom intersection = 48°. Triangle angle sum: 48 + 62 + unknown = 180. Unknown = 180 - 48 - 62 = 70°.",
      ["70°"],
      {
        triangleDiagram: triFig(
          "Triangle with the alternate-transferred interior angle marked 48°, a second interior angle marked 62°, and the third interior angle marked x.",
          { A: "48°", B: "62°", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-prb-g4",
      "An exterior angle of a triangle is 114°. The two non-adjacent interior angles are equal. Find each non-adjacent interior angle in degrees.",
      "2x = 114°",
      "57",
      "The exterior angle equals the sum of the two non-adjacent interior angles. Each = 114 ÷ 2 = 57°.",
      ["57°"],
      {
        triangleDiagram: triFig(
          "Triangle ABC with the two equal non-adjacent interior angles each marked x at A and B. The side through C is extended, forming an exterior angle of 114° at C.",
          { A: "x", B: "x" },
          { vertexLabels: { A: "A", B: "B", C: "C" } }
        ),
      }
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-prb-i1",
      "Two parallel lines are cut by a transversal. An angle of 72° is formed at the top intersection. A triangle has this transversal as one side, with interior angles of 72° (alternate angle at bottom), 55°, and an unknown angle. Find the unknown angle of the triangle in degrees.",
      "72° + 55° + \\angle C = 180°",
      "53",
      "Triangle angle sum: 72 + 55 + unknown = 180. Unknown = 180 - 72 - 55 = 53°.",
      ["53°"],
      {
        triangleDiagram: triFig(
          "Triangle with the alternate-transferred interior angle marked 72°, a second interior angle marked 55°, and the third interior angle marked x.",
          { A: "72°", B: "55°", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-prb-i2",
      "Two parallel lines are cut by a transversal. One co-interior angle is 125°. A separate triangle shares the other co-interior angle as one of its interior angles. The triangle also has an angle of 32°. Find the third angle of the triangle in degrees.",
      "(180 - 125)° + 32° + \\angle C = 180°",
      "93",
      "Other co-interior angle = 180 - 125 = 55°. Triangle: 55 + 32 + unknown = 180. Unknown = 180 - 55 - 32 = 93°.",
      ["93°"],
      {
        triangleDiagram: triFig(
          "Triangle with the interior angle transferred from the co-interior partner marked 55°, a second interior angle marked 32°, and the third interior angle marked x.",
          { A: "55°", B: "32°", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-prb-i3",
      "In a diagram, two parallel lines are cut by a transversal. The corresponding angle to a 68° angle is part of an isosceles triangle where the two equal angles are both equal to this corresponding angle. Find the apex angle of the isosceles triangle in degrees.",
      "68° + 68° + \\angle A = 180°",
      "44",
      "Corresponding angle = 68°. Both base angles of the isosceles triangle = 68°. Apex = 180 - 68 - 68 = 44°.",
      ["44°"],
      {
        triangleDiagram: isoscelesFig(
          "Isosceles triangle with the two equal tick-marked sides, each base angle marked 68° (the corresponding angle transferred from the parallel lines), and the apex angle marked x.",
          { A: "x", B: "68°", C: "68°" }
        ),
      }
    ),
    answer(
      "y7-ang-prb-i4",
      "A triangle has a vertex on each of two parallel lines, with the third vertex between them. The angles at the two vertices on the parallel lines are both 50° (formed between the triangle's sides and the parallel lines, measured as alternate interior angles). Find the angle at the middle vertex of the triangle in degrees.",
      "50° + 50° + \\angle A = 180°",
      "80",
      "The alternate interior angles at the parallel lines each equal 50°, so the interior angles of the triangle at those two vertices are each 50°. Middle vertex = 180 - 50 - 50 = 80°.",
      ["80°"],
      {
        triangleDiagram: triFig(
          "Triangle with the two interior angles transferred by the alternate-angle rule each marked 50°, and the middle-vertex angle marked x.",
          { A: "50°", B: "50°", C: "x" }
        ),
      }
    ),
    choice(
      "y7-ang-prb-i5",
      "In a multi-step problem, a student finds an angle using co-interior angles as 180 - 75 = 105°. They then use this angle as an interior angle of a triangle and find a second angle of the triangle as 180 - 105 - 40 = 35°. Is their reasoning correct?",
      "A",
      [
        "Yes — co-interior gives 105°, and triangle angle sum gives 35°.",
        "No — co-interior angles must be equal, so the angle should be 75°.",
        "No — the triangle angle sum should be 360°.",
        "No — the angle at the vertex should be the supplement of 105°, giving 75°.",
      ],
      "Co-interior angles sum to 180°, giving 105°. Using 105° as a triangle interior angle with a second angle of 40°: third = 180 - 105 - 40 = 35°. The reasoning is valid if the 105° angle is genuinely inside the triangle."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Applying a parallel-line angle rule before identifying which intersection or angle the rule applies to.",
      fix: "Label every angle you find before moving on. Clearly mark which angle you are using and which rule applies before substituting into the next step.",
    },
    {
      mistake: "Using the exterior angle of a triangle as an interior angle in the triangle angle sum.",
      fix: "The triangle angle sum uses only interior angles. An exterior angle equals the sum of the two non-adjacent interior angles — it does not belong inside the triangle sum formula.",
    },
    {
      mistake: "Not writing geometric reasons and losing marks in exam questions.",
      fix: "Every step needs a reason: write the rule (e.g. 'alternate angles') and the condition (e.g. 'since AB ∥ CD'). This is what earns full marks in NSW assessments.",
    },
    {
      mistake: "Assuming all angles in a complex diagram can be found from a single rule.",
      fix: "Complex diagrams usually require a chain of two or more rules. Find what you can from the first rule, then look at the new diagram with that angle labelled to see what the next rule can give you.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-ang-prb-m1",
      "Two parallel lines are cut by a transversal. An angle of 83° is formed at the top intersection. Find the alternate angle at the bottom intersection in degrees.",
      "\\text{Alternate angles are equal}",
      "83",
      "Alternate angles (Z-shape) are equal when lines are parallel. The alternate angle is also 83°.",
      ["83°"]
    ),
    answer(
      "y7-ang-prb-m2",
      "Two parallel lines are cut by a transversal. At the top intersection, the angle is 61°. This angle is a co-interior angle with an angle at the bottom intersection that is one interior angle of a triangle. The triangle has another interior angle of 44°. Find the third interior angle of the triangle in degrees.",
      "(180 - 61)° + 44° + \\angle C = 180°",
      "17",
      "Co-interior angle at bottom = 180 - 61 = 119°. If this 119° is inside the triangle: 119 + 44 + unknown = 180, unknown = 17°. Check: 119 + 44 + 17 = 180. Correct.",
      ["17°"],
      {
        triangleDiagram: triFig(
          "Triangle with the interior angle from the co-interior partner marked 119°, a second interior angle marked 44°, and the third interior angle marked x.",
          { A: "119°", B: "44°", C: "x" }
        ),
      }
    ),
    choice(
      "y7-ang-prb-m3",
      "A student states: 'The angle is 70° because it is alternate to the 70° angle, and alternate angles on parallel lines are equal.' Is this a complete geometric reason?",
      "B",
      [
        "No — the student should also state the triangle angle sum.",
        "Yes — stating the rule and the parallel line condition is sufficient.",
        "No — the student needs to calculate the co-interior angle first.",
        "Yes — alternate angles are always equal without needing to check the condition.",
      ],
      "A complete reason names both the rule ('alternate angles') and the condition ('on parallel lines'). This student has done both. The answer is sufficient."
    ),
    answer(
      "y7-ang-prb-m4",
      "Triangle ABC has vertex A on line PQ and side BC on line RS, where PQ is parallel to RS. The angle at A (between AB and AC inside the triangle) is 74°. The angle at B (between AB and BC inside the triangle) equals the alternate angle formed at B with line PQ. The base angles at B and C are equal. Find the angle at B in degrees.",
      "74° + 2x = 180°",
      "53",
      "Triangle angle sum: 74 + x + x = 180, so 2x = 106 and x = 53°. The base angle at B is 53°.",
      ["53°"],
      {
        triangleDiagram: {
          ...isoscelesFig(
            "Isosceles triangle ABC with apex angle 74° at A, the two equal sides tick-marked, and equal base angles marked x at B and C.",
            { A: "74°", B: "x", C: "x" }
          ),
          vertexLabels: { A: "A", C: "B", B: "C" },
        },
      }
    ),
    answer(
      "y7-ang-prb-m5",
      "Two parallel lines are cut by a transversal at points P and Q. At P, an angle of 47° is formed above the top parallel line. Find the size in degrees of the co-interior angle at Q (below the bottom parallel line, on the same side of the transversal).",
      "47° + \\angle Q = 180°",
      "133",
      "Co-interior angles sum to 180°. Angle at Q = 180 - 47 = 133°.",
      ["133°"]
    ),
    answer(
      "y7-ang-prb-m6",
      "In a diagram, two parallel lines are cut by two transversals that meet at a point between the lines, forming a triangle. The two angles where the transversals meet the top parallel line are 55° and 65° (interior angles of the triangle). Find the angle at the vertex between the lines in degrees.",
      "55° + 65° + \\angle A = 180°",
      "60",
      "Triangle angle sum: 55 + 65 + unknown = 180. Unknown = 180 - 55 - 65 = 60°.",
      ["60°"],
      {
        triangleDiagram: triFig(
          "Triangle formed between the two parallel lines, with the two interior angles at the top line marked 55° and 65°, and the vertex angle between the lines marked x.",
          { A: "55°", B: "65°", C: "x" }
        ),
      }
    ),
    choice(
      "y7-ang-prb-m7",
      "A transversal crosses two parallel lines. The corresponding angle at the top intersection is 88°. A triangle shares this angle as an exterior angle at the bottom vertex. What is the sum of the two non-adjacent interior angles of the triangle?",
      "A",
      ["88°", "92°", "180°", "44°"],
      "The exterior angle of a triangle equals the sum of the two non-adjacent interior angles. If the exterior angle is 88°, then the two non-adjacent interior angles sum to 88°.",
      undefined,
      {
        triangleDiagram: triFig(
          "Triangle ABC with the two non-adjacent interior angles unmarked at A and B. The side through C is extended, forming an exterior angle of 88° at C.",
          {},
          { vertexLabels: { A: "A", B: "B", C: "C" } }
        ),
      }
    ),
    answer(
      "y7-ang-prb-m8",
      "Two parallel lines are cut by a transversal. The angle at the top intersection between the transversal and the parallel line is (4x + 10)°. The alternate angle at the bottom intersection is (6x - 20)°. Find x.",
      "4x + 10 = 6x - 20",
      "15",
      "Alternate angles are equal: 4x + 10 = 6x - 20. So 30 = 2x and x = 15.",
      ["15"]
    ),
    answer(
      "y7-ang-prb-m9",
      "A triangle has vertices A, B, and C. Lines through B and C are parallel. The angle at A is 50°. The angle at B formed between AB and the parallel line through B equals the alternate angle formed at B with the parallel line through C. The base angles at B and C together with angle A form the triangle. Given AB = AC (isosceles), find each base angle in degrees.",
      "50° + 2x = 180°",
      "65",
      "Triangle angle sum with apex 50° and equal base angles: 50 + x + x = 180, so 2x = 130 and x = 65°.",
      ["65°"],
      {
        triangleDiagram: isoscelesFig(
          "Isosceles triangle with apex angle 50° at A between the two equal tick-marked sides, and equal base angles marked x at B and C.",
          { A: "50°", B: "x", C: "x" }
        ),
      }
    ),
    answer(
      "y7-ang-prb-m10",
      "Two parallel lines are cut by a transversal. At the top line, two angles are formed: 130° (obtuse, above the line) and 50° (acute, below the line). A triangle is formed with the segment of the transversal between the lines as one side, and the co-interior angle (50°) as one interior angle. The second interior angle of the triangle is 70°. Find the third interior angle of the triangle in degrees.",
      "50° + 70° + \\angle C = 180°",
      "60",
      "Co-interior angle = 50° (given as interior angle of triangle). Triangle: 50 + 70 + unknown = 180. Unknown = 60°.",
      ["60°"],
      {
        triangleDiagram: triFig(
          "Triangle with the co-interior angle marked 50° as one interior angle, a second interior angle marked 70°, and the third interior angle marked x.",
          { A: "50°", B: "70°", C: "x" }
        ),
      }
    ),
  ],
  masteryQuizPool: [
    dq(answer("y7-ang-prb-p1", "Two parallel lines are cut by a transversal. An angle of 60° is formed at the top intersection. Find the alternate angle at the bottom intersection in degrees.", "\\text{Alternate angles are equal}", "60", "Alternate angles are equal, so the alternate angle is 60°.", ["60°"]), 1),
    dq(answer("y7-ang-prb-p2", "A triangle has two angles of 70° and 60°. Find the third angle in degrees.", "70° + 60° + \\angle C = 180°", "50", "Third angle = 180 - 70 - 60 = 50°.", ["50°"], { triangleDiagram: triFig("Triangle with two interior angles marked 70° and 60°, and the third angle marked x.", { A: "70°", B: "60°", C: "x" }) }), 1),
    dq(answer("y7-ang-prb-p3", "Two parallel lines are cut by a transversal. One co-interior angle is 110°. Find the other co-interior angle in degrees.", "110° + \\angle B = 180°", "70", "180 - 110 = 70°.", ["70°"]), 1),
    dq(answer("y7-ang-prb-p4", "An exterior angle of a triangle is 120° and the two non-adjacent interior angles are equal. Find each in degrees.", "2x = 120°", "60", "Each = 120 ÷ 2 = 60°.", ["60°"], { triangleDiagram: triFig("Triangle ABC with the two equal non-adjacent interior angles each marked x at A and B. The side through C is extended, forming an exterior angle of 120° at C.", { A: "x", B: "x" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 1),
    dq(choice("y7-ang-prb-p5", "A complete geometric reason must state which two things?", "C", ["The diagram and the answer", "The calculator used and the answer", "The rule and the condition (e.g. alternate angles, parallel lines)", "Only the rule"], "A full reason names the rule and the condition under which it applies."), 1),
    dq(answer("y7-ang-prb-p6", "Two parallel lines are cut by a transversal. A corresponding angle to 84° is unknown. Find it in degrees.", "\\text{Corresponding angles are equal}", "84", "Corresponding angles are equal, so it is 84°.", ["84°"]), 1),
    dq(answer("y7-ang-prb-p7", "Two parallel lines are cut by a transversal. An angle of 64° is formed at the top intersection. Its alternate angle at the bottom is one interior angle of a triangle whose other interior angle is 58°. Find the third angle of the triangle in degrees.", "64° + 58° + \\angle C = 180°", "58", "Alternate angle = 64°. Triangle: 180 - 64 - 58 = 58°.", ["58°"], { triangleDiagram: triFig("Triangle with the alternate-transferred interior angle marked 64°, a second interior angle marked 58°, and the third interior angle marked x.", { A: "64°", B: "58°", C: "x" }) }), 2),
    dq(answer("y7-ang-prb-p8", "Two parallel lines are cut by a transversal. One co-interior angle is 130°. The other co-interior angle is an interior angle of a triangle whose second angle is 25°. Find the third angle of the triangle in degrees.", "(180 - 130)° + 25° + \\angle C = 180°", "105", "Other co-interior = 50°. Triangle: 180 - 50 - 25 = 105°.", ["105°"], { triangleDiagram: triFig("Triangle with the interior angle from the co-interior partner marked 50°, a second interior angle marked 25°, and the third interior angle marked x.", { A: "50°", B: "25°", C: "x" }) }), 2),
    dq(answer("y7-ang-prb-p9", "An isosceles triangle has a base angle equal to a corresponding angle of 72° formed on parallel lines. Both base angles are 72°. Find the apex angle in degrees.", "72° + 72° + \\angle A = 180°", "36", "Apex = 180 - 72 - 72 = 36°.", ["36°"], { triangleDiagram: isoscelesFig("Isosceles triangle with the two equal tick-marked sides, each base angle marked 72°, and the apex angle marked x.", { A: "x", B: "72°", C: "72°" }) }), 2),
    dq(answer("y7-ang-prb-p10", "Two parallel lines are cut by a transversal at P and Q. At P an angle of 53° is formed above the line. Find the co-interior angle at Q in degrees.", "53° + \\angle Q = 180°", "127", "Co-interior angles sum to 180°: 180 - 53 = 127°.", ["127°"]), 2),
    dq(answer("y7-ang-prb-p11", "An exterior angle of a triangle is 95°. One non-adjacent interior angle is 38°. Find the other non-adjacent interior angle in degrees.", "38° + \\angle B = 95°", "57", "Other angle = 95 - 38 = 57°.", ["57°"], { triangleDiagram: triFig("Triangle ABC with one non-adjacent interior angle marked 38° at A and the other marked x at B. The side through C is extended, forming an exterior angle of 95° at C.", { A: "38°", B: "x" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 2),
    dq(choice("y7-ang-prb-p12", "Two parallel lines form a triangle with a transversal. Which combination of rules is standard?", "C", ["Complementary and revolution", "Quadrilateral sum and vertically opposite", "A parallel-line rule and the triangle angle sum", "Co-interior and complementary"], "The standard combination is a parallel-line rule (alternate/corresponding/co-interior) with the triangle angle sum."), 2),
    dq(answer("y7-ang-prb-p13", "Two parallel lines are cut by a transversal. An angle of 75° at the top has an alternate angle at the bottom that is one interior angle of a triangle. The triangle's other two angles are equal. Find each of those equal angles in degrees.", "75° + 2x = 180°", "52.5", "Alternate angle = 75°. Triangle: 75 + 2x = 180, so 2x = 105 and x = 52.5°.", ["52.5°"], { triangleDiagram: isoscelesFig("Isosceles triangle with apex angle 75° (the alternate-transferred angle) at A between the two equal tick-marked sides, and the two equal base angles marked x.", { A: "75°", B: "x", C: "x" }) }), 3),
    dq(answer("y7-ang-prb-p14", "A triangle has a vertex on each of two parallel lines, with the third vertex between them. The alternate interior angles at the two vertices on the lines are 47° and 63°. Find the angle at the middle vertex in degrees.", "47° + 63° + \\angle A = 180°", "70", "Middle vertex = 180 - 47 - 63 = 70°.", ["70°"], { triangleDiagram: triFig("Triangle with the two alternate-transferred interior angles marked 47° and 63°, and the middle-vertex angle marked x.", { A: "47°", B: "63°", C: "x" }) }), 3),
    dq(answer("y7-ang-prb-p15", "Two parallel lines are cut by a transversal. At the top intersection, the angle is 118°. Its co-interior partner is an interior angle of a triangle whose second angle is 30°. Find the third angle of the triangle in degrees.", "(180 - 118)° + 30° + \\angle C = 180°", "88", "Co-interior = 62°. Triangle: 180 - 62 - 30 = 88°.", ["88°"], { triangleDiagram: triFig("Triangle with the interior angle from the co-interior partner marked 62°, a second interior angle marked 30°, and the third interior angle marked x.", { A: "62°", B: "30°", C: "x" }) }), 3),
    dq(answer("y7-ang-prb-p16", "An exterior angle of a triangle is 134°. The two non-adjacent interior angles are in the ratio 1 : 3. Find the larger of the two angles in degrees.", "x + 3x = 134°", "100.5", "x + 3x = 134, so 4x = 134 and x = 33.5. Larger = 3 × 33.5 = 100.5°.", ["100.5°"], { triangleDiagram: triFig("Triangle ABC with the two non-adjacent interior angles marked x at A and 3x at B in the ratio 1 : 3. The side through C is extended, forming an exterior angle of 134° at C.", { A: "x", B: "3x" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 3),
    dq(answer("y7-ang-prb-p17", "Two parallel lines are cut by a transversal. Corresponding angles are (3x + 9)° and (5x - 11)°. Find x.", "3x + 9 = 5x - 11", "10", "Corresponding angles equal: 3x + 9 = 5x - 11, so 20 = 2x and x = 10.", ["10"]), 3),
    dq(choice("y7-ang-prb-p18", "A student finds a co-interior angle as 180 - 65 = 115°, then uses it in a triangle: 180 - 115 - 40 = 25°. Is the reasoning valid?", "A", ["Yes, if the 115° angle is genuinely inside the triangle", "No, co-interior angles must be equal", "No, the triangle sum is 360°", "No, the angle should be 65°"], "Co-interior gives 115°; the triangle sum then gives 25°. The reasoning is valid provided the 115° angle is an interior angle of the triangle."), 3),
    dq(answer("y7-ang-prb-p19", "Two parallel lines are cut by a transversal. An angle of (4x + 5)° at the top is alternate to (6x - 25)° at the bottom. Find x.", "4x + 5 = 6x - 25", "15", "Alternate angles equal: 4x + 5 = 6x - 25, so 30 = 2x and x = 15.", ["15"]), 4),
    dq(answer("y7-ang-prb-p20", "Triangle ABC has vertex A on line PQ and side BC on line RS, with PQ parallel to RS. The apex angle at A is 64°. The base angles at B and C are equal. Find each base angle in degrees.", "64° + 2x = 180°", "58", "Each base angle = (180 - 64) ÷ 2 = 58°.", ["58°"], { triangleDiagram: { ...isoscelesFig("Isosceles triangle ABC with apex angle 64° at A, the two equal sides tick-marked, and equal base angles marked x at B and C.", { A: "64°", B: "x", C: "x" }), vertexLabels: { A: "A", C: "B", B: "C" } } }), 4),
    dq(answer("y7-ang-prb-p21", "Two parallel lines are cut by two transversals meeting at a point between the lines, forming a triangle. The interior angles where the transversals meet the top line are 48° and 72°. Find the angle at the vertex between the lines in degrees.", "48° + 72° + \\angle A = 180°", "60", "Vertex angle = 180 - 48 - 72 = 60°.", ["60°"], { triangleDiagram: triFig("Triangle formed by the two transversals between the parallel lines, with the two interior angles at the top line marked 48° and 72°, and the vertex angle between the lines marked x.", { A: "48°", B: "72°", C: "x" }) }), 4),
    dq(answer("y7-ang-prb-p22", "Two parallel lines are cut by a transversal. An angle of 116° at the top has a co-interior partner at the bottom. That partner is the exterior angle of a triangle. Find the sum of the two non-adjacent interior angles of that triangle in degrees.", "\\text{co-interior} = 64°;\\ \\text{exterior} = \\text{sum of non-adjacent}", "64", "Co-interior partner = 180 - 116 = 64°. As an exterior angle, it equals the sum of the two non-adjacent interior angles, which is 64°.", ["64°"], { triangleDiagram: triFig("Triangle ABC with the two non-adjacent interior angles unmarked at A and B. The side through C is extended, forming an exterior angle of 64° at C (the co-interior partner).", {}, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 4),
    dq(answer("y7-ang-prb-p23", "In a diagram, an angle x is found from co-interior angles as 180 - 70 = 110°. This 110° is then an exterior angle of a triangle, and one non-adjacent interior angle is 45°. Find the other non-adjacent interior angle in degrees.", "45° + \\angle B = 110°", "65", "Co-interior gives 110°. Exterior angle = sum of non-adjacent: other angle = 110 - 45 = 65°.", ["65°"], { triangleDiagram: triFig("Triangle ABC with one non-adjacent interior angle marked 45° at A and the other marked x at B. The side through C is extended, forming an exterior angle of 110° at C.", { A: "45°", B: "x" }, { vertexLabels: { A: "A", B: "B", C: "C" } }) }), 5),
    dq(answer("y7-ang-prb-p24", "Two parallel lines are cut by a transversal. An angle (2x + 18)° at the top is co-interior with (3x + 2)° at the bottom. After finding x, find the size of the larger angle in degrees.", "(2x+18) + (3x+2) = 180", "98", "5x + 20 = 180, so 5x = 160 and x = 32. Angles: 2(32)+18 = 82° and 3(32)+2 = 98°. Larger = 98°.", ["98°"]), 5),
    dq(answer("y7-ang-prb-p25", "Triangle ABC has AB = AC. Angle A is 30° more than each base angle. Find each base angle in degrees.", "(x + 30) + x + x = 180", "50", "Apex = x + 30, base angles each x. So (x + 30) + 2x = 180, 3x = 150, x = 50°.", ["50°"], { triangleDiagram: { ...isoscelesFig("Isosceles triangle ABC with AB = AC tick-marked, apex angle at A marked (x + 30)°, and equal base angles marked x at B and C.", { A: "x+30", B: "x", C: "x" }), vertexLabels: { A: "A", C: "B", B: "C" } } }), 5),
    dq(answer("y7-ang-prb-p26", "Two parallel lines are cut by a transversal forming a triangle. One interior angle equals the alternate angle of 55°, a second interior angle equals the co-interior partner of 130°, and the third is unknown. Find the unknown angle in degrees.", "55° + (180 - 130)° + \\angle C = 180°", "75", "First interior = 55° (alternate). Second = 180 - 130 = 50° (co-interior). Third = 180 - 55 - 50 = 75°.", ["75°"], { triangleDiagram: triFig("Triangle with the alternate-transferred interior angle marked 55°, the co-interior-transferred interior angle marked 50°, and the third interior angle marked x.", { A: "55°", B: "50°", C: "x" }) }), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-prb-mp1",
      prompt:
        "Two parallel lines PQ and RS are cut by a transversal. A triangle ABC is formed: vertex A lies on PQ, side BC lies along RS, and the apex angle at A is 68°. The base angles of the triangle (at B and C) are equal, and the base angle at B also equals an alternate interior angle formed with line PQ.",
      latex: "PQ \\parallel RS,\\ \\angle A = 68°",
      triangleDiagram: {
        ...isoscelesFig(
          "Isosceles triangle ABC between parallel lines PQ and RS, with apex angle 68° at A, the two equal sides tick-marked, and equal base angles marked x at B and C.",
          { A: "68°", B: "x", C: "x" }
        ),
        vertexLabels: { A: "A", C: "B", B: "C" },
      },
      answer: "56",
      hint: "Find the base angles via the triangle sum, then use the alternate-angle relationship.",
      explanation:
        "Part (a): base angles = (180 - 68) ÷ 2 = 56° each. Part (b): the alternate interior angle at the parallel line equals the base angle, 56°. Part (c): the sum of the two base angles = 112°.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the size in degrees of each base angle of triangle ABC.",
          latex: "68° + 2x = 180°",
          marks: 2,
          answer: "56",
          acceptedAnswers: ["56°"],
          hint: "Subtract the apex from 180° and halve, since the base angles are equal.",
          explanation: "Each base angle = (180 - 68) ÷ 2 = 56°.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "The base angle at B equals an alternate interior angle formed with line PQ. Find the size in degrees of that alternate angle.",
          latex: "\\text{alternate angle} = \\;?",
          marks: 1,
          answer: "56",
          acceptedAnswers: ["56°"],
          hint: "Alternate angles on parallel lines are equal.",
          explanation: "Alternate angles are equal, so the alternate interior angle = 56°.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the sum in degrees of the two base angles of triangle ABC.",
          latex: "56° + 56° = \\;?",
          marks: 1,
          answer: "112",
          acceptedAnswers: ["112°"],
          hint: "Add the two equal base angles.",
          explanation: "The two base angles are each 56°, so their sum is 112°.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lessons map
// ─────────────────────────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "angle-types-and-relationships": angleTypesAndRelationships,
  "angles-in-triangles": anglesInTriangles,
  "angles-in-quadrilaterals": anglesInQuadrilaterals,
  "parallel-lines-and-transversals": parallelLinesAndTransversals,
  "angle-relationships-problem-solving": angleRelationshipsProblemSolving,
};

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export function year7AnglesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "angles") {
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
