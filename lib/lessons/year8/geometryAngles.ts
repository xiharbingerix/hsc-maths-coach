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
import { geometryQuestionVisuals } from "./geometryVisuals";

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
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify the angle relationship, state the rule, then calculate.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Think about which angle relationship applies and select the best option.",
    explanation,
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
      "When two straight lines intersect, they form four angles. Angles that sit directly opposite each other across the intersection point are called vertically opposite angles. Vertically opposite angles are always equal.",
      "Two angles are complementary when they add to 90°. Two angles are supplementary when they add to 180°. To find an unknown angle in either relationship, subtract the known angle from the total.",
      "Angles that lie on one side of a straight line are called angles on a straight line. They always add to 180°. If you know some of them, subtract their sum from 180° to find the unknown.",
      "All angles arranged around a single point make a full rotation and must add to 360°. Add the known angles and subtract from 360° to find any unknown.",
    ],
    latexBlocks: [
      "\\text{Vertically opposite: } a = b",
      "\\text{Complementary: } a + b = 90^\\circ",
      "\\text{Supplementary: } a + b = 180^\\circ",
      "\\text{Angles at a point: } a + b + c + \\cdots = 360^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find a supplementary angle",
      questionLatex:
        "\\text{Two angles are supplementary. One angle is }54^\\circ.\\text{ Find the other.}",
      steps: [
        {
          explanation: "Supplementary angles sum to 180°.",
          latex: "a + 54 = 180",
        },
        {
          explanation: "Subtract 54 from both sides.",
          latex: "a = 180 - 54 = 126",
        },
      ],
      finalAnswerLatex: "126^\\circ",
    } as WorkedExample,
    {
      title: "Find an unknown angle at a point",
      questionLatex:
        "\\text{Three angles meet at a point: }85^\\circ,\\;110^\\circ\\text{ and }x^\\circ.\\text{ Find }x.",
      steps: [
        {
          explanation: "Angles at a point sum to 360°.",
          latex: "85 + 110 + x = 360",
        },
        {
          explanation: "Add the known angles.",
          latex: "195 + x = 360",
        },
        {
          explanation: "Subtract.",
          latex: "x = 360 - 195 = 165",
        },
      ],
      finalAnswerLatex: "165^\\circ",
    } as WorkedExample,
    {
      title: "Use vertically opposite angles",
      questionLatex:
        "\\text{Two lines intersect. One angle is }43^\\circ.\\text{ Find the three other angles.}",
      steps: [
        {
          explanation: "The angle vertically opposite to 43° is also 43°.",
          latex: "\\text{vertically opposite: }43^\\circ",
        },
        {
          explanation: "Adjacent angles are supplementary (on a straight line).",
          latex: "180 - 43 = 137^\\circ",
        },
        {
          explanation: "The fourth angle is vertically opposite to 137°.",
          latex: "\\text{vertically opposite: }137^\\circ",
        },
      ],
      finalAnswerLatex:
        "43^\\circ,\\quad 137^\\circ,\\quad 43^\\circ,\\quad 137^\\circ",
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
      "",
      "53",
      "Complementary angles sum to 90°. x = 90 − 37 = 53°.",
      ["53°"]
    ),
    answer(
      "y8-geo-ang-g3",
      "Two angles are supplementary. One angle is 145°. Find the other angle in degrees.",
      "",
      "35",
      "Supplementary angles sum to 180°. x = 180 − 145 = 35°.",
      ["35°"]
    ),
    answer(
      "y8-geo-ang-g4",
      "Three angles meet at a point. Two of them are 95° and 130°. Find the third angle in degrees.",
      "",
      "135",
      "Angles at a point sum to 360°. x = 360 − 95 − 130 = 135°.",
      ["135°"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-ang-i1",
      "Two lines intersect. One angle is 68°. Find the vertically opposite angle in degrees.",
      "",
      "68",
      "Vertically opposite angles are equal. The answer is 68°.",
      ["68°"]
    ),
    answer(
      "y8-geo-ang-i2",
      "Two angles are supplementary. One is 73°. Find the other angle in degrees.",
      "",
      "107",
      "x = 180 − 73 = 107°.",
      ["107°"]
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
      "",
      "25",
      "65 + 90 = 155. x = 180 − 155 = 25°.",
      ["25°"]
    ),
    answer(
      "y8-geo-ang-i5",
      "Four angles meet at a point: 72°, 95°, 85°, and x°. Find x.",
      "",
      "108",
      "72 + 95 + 85 = 252. x = 360 − 252 = 108°.",
      ["108°"]
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
      "",
      "34",
      "x = 90 − 56 = 34°.",
      ["34°"]
    ),
    answer(
      "y8-geo-ang-m2",
      "Two lines intersect. One angle is 127°. State the vertically opposite angle in degrees.",
      "",
      "127",
      "Vertically opposite angles are equal. The answer is 127°.",
      ["127°"]
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
      "",
      "135",
      "110 + 115 = 225. x = 360 − 225 = 135°.",
      ["135°"]
    ),
    answer(
      "y8-geo-ang-m5",
      "The supplement of 27° is…",
      "",
      "153",
      "x = 180 − 27 = 153°.",
      ["153°"]
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
      "",
      "35",
      "48 + 97 = 145. x = 180 − 145 = 35°.",
      ["35°"]
    ),
    answer(
      "y8-geo-ang-m8",
      "The complement of 19° is…",
      "",
      "71",
      "x = 90 − 19 = 71°.",
      ["71°"]
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
      "At an intersection there are exactly two pairs of vertically opposite angles: (p, r) and (q, s)."
    ),
    answer(
      "y8-geo-ang-m10",
      "At a point, three angles are 2x°, 3x°, and 4x°. Find x.",
      "",
      "40",
      "9x = 360, so x = 40.",
      ["40°"]
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
      "A transversal is a straight line that crosses two or more other lines. When those lines are parallel, the transversal creates three special pairs of angles.",
      "Corresponding angles sit in matching positions at each intersection — both above or both below the transversal, both on the same side. They form an F-shape and are equal when lines are parallel.",
      "Alternate angles are on opposite sides of the transversal, between the two parallel lines. They form a Z-shape (or zigzag) and are equal when lines are parallel.",
      "Co-interior angles are on the same side of the transversal, between the two parallel lines. They form a C-shape and sum to 180° (they are supplementary) when lines are parallel.",
    ],
    latexBlocks: [
      "\\text{Corresponding (F): } a = b",
      "\\text{Alternate (Z): } a = b",
      "\\text{Co-interior (C): } a + b = 180^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Corresponding angles",
      questionLatex:
        "\\text{Lines }AB \\parallel CD\\text{. A transversal makes a }65^\\circ\\text{ angle at }AB.\\text{ Find the corresponding angle at }CD.",
      steps: [
        {
          explanation: "Corresponding angles are in matching F-positions at each parallel line.",
          latex: "\\text{corresponding angles (F-shape) are equal}",
        },
        {
          explanation: "The corresponding angle equals 65°.",
          latex: "\\angle\\text{ at }CD = 65^\\circ",
        },
      ],
      finalAnswerLatex: "65^\\circ",
    } as WorkedExample,
    {
      title: "Co-interior angles",
      questionLatex:
        "\\text{Parallel lines. One co-interior angle is }115^\\circ.\\text{ Find the other.}",
      steps: [
        {
          explanation: "Co-interior angles (C-shape) sum to 180°.",
          latex: "115 + x = 180",
        },
        {
          explanation: "Subtract.",
          latex: "x = 180 - 115 = 65",
        },
      ],
      finalAnswerLatex: "65^\\circ",
    } as WorkedExample,
    {
      title: "Solve an equation using parallel lines",
      questionLatex:
        "\\text{Co-interior angles are }(3x+10)^\\circ\\text{ and }(2x+20)^\\circ.\\text{ Find }x.",
      steps: [
        {
          explanation: "Co-interior angles sum to 180°.",
          latex: "(3x+10) + (2x+20) = 180",
        },
        {
          explanation: "Collect like terms.",
          latex: "5x + 30 = 180",
        },
        {
          explanation: "Solve for x.",
          latex: "5x = 150 \\Rightarrow x = 30",
        },
      ],
      finalAnswerLatex: "x = 30",
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
      "Lines AB and CD are parallel. A transversal makes a 65° angle at AB. Find the corresponding angle at CD in degrees.",
      "",
      "65",
      "Corresponding angles are equal when lines are parallel. The angle is 65°.",
      ["65°"]
    ),
    answer(
      "y8-geo-par-g3",
      "Parallel lines cut by a transversal. An alternate angle at one line is 48°. Find the alternate angle at the other line in degrees.",
      "",
      "48",
      "Alternate angles are equal when lines are parallel. The angle is 48°.",
      ["48°"]
    ),
    answer(
      "y8-geo-par-g4",
      "Parallel lines cut by a transversal. One co-interior angle is 115°. Find the other co-interior angle in degrees.",
      "",
      "65",
      "Co-interior angles sum to 180°. x = 180 − 115 = 65°.",
      ["65°"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-par-i1",
      "Parallel lines. A corresponding angle is 73°. Find the other corresponding angle in degrees.",
      "",
      "73",
      "Corresponding angles are equal when lines are parallel. The angle is 73°.",
      ["73°"]
    ),
    answer(
      "y8-geo-par-i2",
      "Parallel lines. One co-interior angle is 54°. Find the other co-interior angle in degrees.",
      "",
      "126",
      "Co-interior angles sum to 180°. x = 180 − 54 = 126°.",
      ["126°"]
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
      "Parallel lines. An alternate angle at one line is 117°. Find the alternate angle at the other line in degrees.",
      "",
      "117",
      "Alternate angles are equal when lines are parallel. The angle is 117°.",
      ["117°"]
    ),
    answer(
      "y8-geo-par-i5",
      "Parallel lines cut by a transversal. Co-interior angles are (3x + 10)° and (2x + 20)°. Find x.",
      "",
      "30",
      "5x + 30 = 180, so 5x = 150, giving x = 30.",
      ["x = 30"]
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
      "Parallel lines. A corresponding angle is 82°. Find the other in degrees.",
      "",
      "82",
      "Corresponding angles are equal when lines are parallel.",
      ["82°"]
    ),
    answer(
      "y8-geo-par-m2",
      "Parallel lines. An alternate angle is 35°. Find the other alternate angle in degrees.",
      "",
      "35",
      "Alternate angles are equal when lines are parallel.",
      ["35°"]
    ),
    answer(
      "y8-geo-par-m3",
      "Parallel lines. One co-interior angle is 142°. Find the other in degrees.",
      "",
      "38",
      "Co-interior angles sum to 180°. x = 180 − 142 = 38°.",
      ["38°"]
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
      "Parallel lines. Corresponding angles: (4x − 20)° and (2x + 40)°. Find x.",
      "",
      "30",
      "4x − 20 = 2x + 40, so 2x = 60, giving x = 30.",
      ["x = 30"]
    ),
    answer(
      "y8-geo-par-m6",
      "Parallel lines. Alternate angles: (5x + 15)° and (3x + 35)°. Find x.",
      "",
      "10",
      "5x + 15 = 3x + 35, so 2x = 20, giving x = 10.",
      ["x = 10"]
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
      "Parallel lines. One co-interior angle is 67°. Find the other in degrees.",
      "",
      "113",
      "x = 180 − 67 = 113°.",
      ["113°"]
    ),
    answer(
      "y8-geo-par-m9",
      "Parallel lines. Co-interior angles are x° and 2x°. Find x.",
      "",
      "60",
      "3x = 180, so x = 60.",
      ["60°"]
    ),
    answer(
      "y8-geo-par-m10",
      "Parallel lines. An angle at the first line is 131°. Find the alternate angle at the second line in degrees.",
      "",
      "131",
      "Alternate angles are equal when lines are parallel. The angle is 131°.",
      ["131°"]
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
      "The three interior angles of any triangle always add to 180°. To find an unknown angle in a triangle, subtract the sum of the two known angles from 180°.",
      "An exterior angle of a triangle is formed by extending one side. It equals the sum of the two non-adjacent interior angles (the two angles not touching the exterior angle). This is the exterior angle theorem.",
      "A quadrilateral is any four-sided polygon. Its four interior angles always add to 360°. Subtract the known angles from 360° to find the unknown.",
      "Why do a triangle's angles always total 180°? Tear off the three corners and lay them side by side at a single point — they fit together along a straight line, which is 180°. (Equivalently, draw a line through one vertex parallel to the opposite side; the alternate angles re-assemble the three corners along that straight line.) The total never depends on the triangle's shape or size.",
      "The 360° for a quadrilateral then comes for free: any quadrilateral splits into two triangles with a single diagonal, and 2 × 180° = 360°. The same trick gives every polygon's angle sum — cut it into triangles from one vertex and count them.",
    ],
    latexBlocks: [
      "\\text{Triangle: } \\angle A + \\angle B + \\angle C = 180^\\circ",
      "\\text{Exterior angle: } \\angle{ext} = \\angle A + \\angle B",
      "\\text{Quadrilateral: } \\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find the third angle of a triangle",
      questionLatex:
        "\\text{A triangle has angles }65^\\circ\\text{ and }72^\\circ.\\text{ Find the third angle.}",
      steps: [
        {
          explanation: "The three angles of a triangle sum to 180°.",
          latex: "65 + 72 + x = 180",
        },
        {
          explanation: "Subtract the known angles.",
          latex: "x = 180 - 65 - 72 = 43",
        },
      ],
      finalAnswerLatex: "43^\\circ",
    } as WorkedExample,
    {
      title: "Use the exterior angle theorem",
      questionLatex:
        "\\text{An exterior angle of a triangle is }115^\\circ.\\text{ One non-adjacent interior angle is }48^\\circ.\\text{ Find the other.}",
      steps: [
        {
          explanation: "An exterior angle equals the sum of the two non-adjacent interior angles.",
          latex: "x + 48 = 115",
        },
        {
          explanation: "Subtract.",
          latex: "x = 115 - 48 = 67",
        },
      ],
      finalAnswerLatex: "67^\\circ",
    } as WorkedExample,
    {
      title: "Find an unknown angle in a quadrilateral",
      questionLatex:
        "\\text{A quadrilateral has angles }85^\\circ,\\;110^\\circ,\\;95^\\circ\\text{ and }x^\\circ.\\text{ Find }x.",
      steps: [
        {
          explanation: "The four angles of a quadrilateral sum to 360°.",
          latex: "85 + 110 + 95 + x = 360",
        },
        {
          explanation: "Add the known angles, then subtract from 360°.",
          latex: "290 + x = 360 \\Rightarrow x = 70",
        },
      ],
      finalAnswerLatex: "70^\\circ",
    } as WorkedExample,
    {
      title: "Use the exterior angle theorem",
      questionLatex:
        "\\text{An exterior angle of a triangle is }115^\\circ.\\text{ One non-adjacent interior angle is }60^\\circ.\\text{ Find the other.}",
      steps: [
        { explanation: "The exterior angle equals the sum of the two non-adjacent interior angles.", latex: "115 = 60 + y" },
        { explanation: "Solve for y.", latex: "y = 115 - 60 = 55" },
      ],
      finalAnswerLatex: "55^\\circ",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-geo-tri-g1",
      "A triangle has angles 65° and 72°. Find the third angle in degrees.",
      "",
      "43",
      "x = 180 − 65 − 72 = 43°.",
      ["43°"]
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
      "A quadrilateral has angles 85°, 110°, 95°, and x°. Find x.",
      "",
      "70",
      "85 + 110 + 95 = 290. x = 360 − 290 = 70°.",
      ["70°"]
    ),
    answer(
      "y8-geo-tri-g4",
      "An exterior angle of a triangle is 115°. One non-adjacent interior angle is 48°. Find the other non-adjacent interior angle in degrees.",
      "",
      "67",
      "x = 115 − 48 = 67°.",
      ["67°"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-tri-i1",
      "An isosceles triangle has two base angles each of 52°. Find the apex angle in degrees.",
      "",
      "76",
      "52 + 52 = 104. x = 180 − 104 = 76°.",
      ["76°"]
    ),
    answer(
      "y8-geo-tri-i2",
      "An exterior angle of a triangle is 132°. One non-adjacent interior angle is 55°. Find the other non-adjacent interior angle in degrees.",
      "",
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
      "A quadrilateral has three angles: 70°, 95°, and 115°. Find the fourth angle in degrees.",
      "",
      "80",
      "70 + 95 + 115 = 280. x = 360 − 280 = 80°.",
      ["80°"]
    ),
    answer(
      "y8-geo-tri-i5",
      "A right-angled triangle has one acute angle of 37°. Find the other acute angle in degrees.",
      "",
      "53",
      "x = 180 − 90 − 37 = 53°.",
      ["53°"]
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
      "Triangle angles: 54° and 78°. Find the third angle in degrees.",
      "",
      "48",
      "x = 180 − 54 − 78 = 48°.",
      ["48°"]
    ),
    answer(
      "y8-geo-tri-m2",
      "An exterior angle is 108°. One non-adjacent interior angle is 43°. Find the other in degrees.",
      "",
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
      "Quadrilateral angles: 100°, 85°, 75°, and x°. Find x.",
      "",
      "100",
      "100 + 85 + 75 = 260. x = 360 − 260 = 100°.",
      ["100°"]
    ),
    answer(
      "y8-geo-tri-m5",
      "State each interior angle of an equilateral triangle in degrees.",
      "",
      "60",
      "All three angles are equal: 180° ÷ 3 = 60°.",
      ["60°"]
    ),
    answer(
      "y8-geo-tri-m6",
      "A right-angled triangle has one acute angle of 27°. Find the other acute angle in degrees.",
      "",
      "63",
      "x = 180 − 90 − 27 = 63°.",
      ["63°"]
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
      "A quadrilateral has angles x°, 2x°, 3x°, and 4x°. Find x.",
      "",
      "36",
      "10x = 360, so x = 36.",
      ["36°"]
    ),
    answer(
      "y8-geo-tri-m9",
      "A triangle has two equal angles of 35°. Find the third angle in degrees.",
      "",
      "110",
      "x = 180 − 35 − 35 = 110°.",
      ["110°"]
    ),
    answer(
      "y8-geo-tri-m10",
      "An exterior angle of a triangle is 95°. One non-adjacent interior angle is 48°. Find the other in degrees.",
      "",
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
      "Any polygon with n sides can be divided into (n − 2) triangles by drawing diagonals from one vertex. Since each triangle contributes 180°, the interior angle sum is (n − 2) × 180°.",
      "For a regular polygon, all sides are equal and all interior angles are equal. Divide the angle sum by the number of sides to find each interior angle.",
      "The exterior angles of any convex polygon always sum to exactly 360°, regardless of the number of sides. For a regular polygon, each exterior angle is 360° ÷ n, and the interior and exterior angles at each vertex are supplementary.",
      "Where does (n − 2) × 180° come from? Pick one vertex and draw every diagonal from it: an n-sided polygon splits into exactly (n − 2) triangles, and each triangle's angles total 180°, so the interior angles altogether make (n − 2) × 180°. A pentagon gives 3 triangles → 540°, a hexagon 4 → 720°, and so on.",
      "The exterior-angle rule is even simpler: walking once around any convex polygon you turn through one full revolution, so the exterior angles always sum to 360° however many sides there are. For a regular polygon every turn is equal, giving 360° ÷ n per corner — the fastest route to find n from a known exterior angle, or each interior angle as 180° − (360° ÷ n).",
    ],
    latexBlocks: [
      "\\text{Interior angle sum} = (n-2) \\times 180^\\circ",
      "\\text{Each interior angle (regular)} = \\frac{(n-2) \\times 180^\\circ}{n}",
      "\\text{Sum of exterior angles} = 360^\\circ",
      "\\text{Each exterior angle (regular)} = \\frac{360^\\circ}{n}",
    ],
  },
  workedExamples: [
    {
      title: "Interior angle sum of a hexagon",
      questionLatex: "\\text{Find the interior angle sum of a hexagon (6 sides).}",
      steps: [
        {
          explanation: "Use the formula (n − 2) × 180° with n = 6.",
          latex: "(6-2) \\times 180 = 4 \\times 180 = 720",
        },
      ],
      finalAnswerLatex: "720^\\circ",
    } as WorkedExample,
    {
      title: "Each interior angle of a regular octagon",
      questionLatex: "\\text{Find each interior angle of a regular octagon (8 sides).}",
      steps: [
        {
          explanation: "Find the angle sum first.",
          latex: "(8-2) \\times 180 = 1080^\\circ",
        },
        {
          explanation: "Divide by the number of angles.",
          latex: "\\frac{1080}{8} = 135",
        },
      ],
      finalAnswerLatex: "135^\\circ",
    } as WorkedExample,
    {
      title: "Find the number of sides from an exterior angle",
      questionLatex:
        "\\text{A regular polygon has each exterior angle equal to }40^\\circ.\\text{ How many sides does it have?}",
      steps: [
        {
          explanation: "The exterior angles of any polygon sum to 360°.",
          latex: "n = \\frac{360}{40} = 9",
        },
      ],
      finalAnswerLatex: "9\\text{ sides (a nonagon)}",
    } as WorkedExample,
    {
      title: "Each interior angle of a regular decagon",
      questionLatex:
        "\\text{Find the size of each interior angle of a regular decagon (10 sides).}",
      steps: [
        { explanation: "Find the interior angle sum with (n − 2) × 180°.", latex: "(10-2) \\times 180 = 1440^\\circ" },
        { explanation: "Divide by the 10 equal angles.", latex: "\\frac{1440}{10} = 144^\\circ" },
      ],
      finalAnswerLatex: "144^\\circ",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-geo-pol-g1",
      "Find the interior angle sum of a hexagon (6 sides).",
      "",
      "720",
      "(6 − 2) × 180 = 4 × 180 = 720°.",
      ["720°"]
    ),
    answer(
      "y8-geo-pol-g2",
      "Find each interior angle of a regular hexagon in degrees.",
      "",
      "120",
      "720° ÷ 6 = 120°.",
      ["120°"]
    ),
    answer(
      "y8-geo-pol-g3",
      "Find each exterior angle of a regular octagon (8 sides) in degrees.",
      "",
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
      "",
      "540",
      "(5 − 2) × 180 = 3 × 180 = 540°.",
      ["540°"]
    ),
    answer(
      "y8-geo-pol-i2",
      "Find each interior angle of a regular pentagon in degrees.",
      "",
      "108",
      "540° ÷ 5 = 108°.",
      ["108°"]
    ),
    answer(
      "y8-geo-pol-i3",
      "Find the interior angle sum of a decagon (10 sides).",
      "",
      "1440",
      "(10 − 2) × 180 = 8 × 180 = 1440°.",
      ["1440°"]
    ),
    answer(
      "y8-geo-pol-i4",
      "A regular polygon has each interior angle of 140°. How many sides does it have?",
      "",
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
      "Dividing a polygon into triangles from one vertex gives (n − 2) triangles, each contributing 180°."
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
      "",
      "900",
      "(7 − 2) × 180 = 5 × 180 = 900°.",
      ["900°"]
    ),
    answer(
      "y8-geo-pol-m2",
      "Find each interior angle of a regular 12-sided polygon (dodecagon).",
      "",
      "150",
      "(12 − 2) × 180 = 1800. 1800 ÷ 12 = 150°.",
      ["150°"]
    ),
    answer(
      "y8-geo-pol-m3",
      "Find each exterior angle of a regular hexagon in degrees.",
      "",
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
      "",
      "1800",
      "(12 − 2) × 180 = 10 × 180 = 1800°.",
      ["1800°"]
    ),
    answer(
      "y8-geo-pol-m6",
      "A regular polygon has each interior angle of 108°. How many sides?",
      "",
      "5",
      "108n = (n−2)×180 → 108n = 180n−360 → 72n = 360 → n = 5 (pentagon)."
    ),
    answer(
      "y8-geo-pol-m7",
      "Find each exterior angle of an equilateral triangle (3 sides) in degrees.",
      "",
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
      "",
      "1260",
      "(9 − 2) × 180 = 7 × 180 = 1260°.",
      ["1260°"]
    ),
    answer(
      "y8-geo-pol-m10",
      "A regular polygon has 20 sides. Find each interior angle in degrees.",
      "",
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
      "Two triangles are congruent if they are exactly the same shape and size — one could be placed exactly on top of the other. There are four tests that guarantee congruence.",
      "SSS (Side-Side-Side): all three pairs of corresponding sides are equal. SAS (Side-Angle-Side): two pairs of corresponding sides and the included angle (the angle between those sides) are equal.",
      "AAS (Angle-Angle-Side): two pairs of corresponding angles and one pair of corresponding sides are equal. RHS (Right angle-Hypotenuse-Side): both triangles have a right angle, and the hypotenuse and one other side are equal.",
      "AAA (three equal angles) does NOT prove congruence — it only proves similarity. Triangles can have identical angles but be completely different sizes.",
    ],
    latexBlocks: [
      "\\text{SSS: }a_1=a_2,\\; b_1=b_2,\\; c_1=c_2",
      "\\text{SAS: two sides and the included angle equal}",
      "\\text{AAS: two angles and a corresponding side equal}",
      "\\text{RHS: right angle, hypotenuse, and one other side equal}",
    ],
  },
  workedExamples: [
    {
      title: "Identify the congruence test: SSS",
      questionLatex:
        "\\text{Triangle }ABC\\text{ has }AB=5,\\;BC=7,\\;CA=9.\\text{ Triangle }DEF\\text{ has }DE=5,\\;EF=7,\\;FD=9.\\text{ Are they congruent?}",
      steps: [
        {
          explanation: "Three pairs of equal sides are given.",
          latex: "AB=DE=5,\\quad BC=EF=7,\\quad CA=FD=9",
        },
        {
          explanation: "Three equal sides → SSS.",
          latex: "\\triangle ABC \\cong \\triangle DEF \\text{ (SSS)}",
        },
      ],
      finalAnswerLatex: "\\text{Yes, congruent by SSS.}",
    } as WorkedExample,
    {
      title: "Identify the congruence test: RHS",
      questionLatex:
        "\\text{Both triangles have a right angle. Their hypotenuses are each }13\\text{ cm and one other side is }5\\text{ cm each. Congruent?}",
      steps: [
        {
          explanation: "Right angle is present in both, hypotenuses are equal, and one other side is equal.",
          latex: "\\text{Right angle + hypotenuse 13 cm + side 5 cm}",
        },
        {
          explanation: "This matches the RHS test.",
          latex: "\\triangle \\cong \\triangle \\text{ (RHS)}",
        },
      ],
      finalAnswerLatex: "\\text{Yes, congruent by RHS.}",
    } as WorkedExample,
    {
      title: "Find an unknown angle using congruence",
      questionLatex:
        "\\text{In }\\triangle ABC \\cong \\triangle PQR,\\text{ angle }B = 55^\\circ\\text{ and angle }C = 65^\\circ.\\text{ Find angle }P.",
      steps: [
        {
          explanation: "Find angle A using the triangle angle sum.",
          latex: "\\angle A = 180 - 55 - 65 = 60^\\circ",
        },
        {
          explanation: "In the congruence statement, A corresponds to P.",
          latex: "\\angle P = \\angle A = 60^\\circ",
        },
      ],
      finalAnswerLatex: "60^\\circ",
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
      "",
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
      "",
      "SSS",
      "Three pairs of equal sides → SSS.",
      ["sss"]
    ),
    answer(
      "y8-geo-con-i2",
      "Two right-angled triangles have equal hypotenuses and one other equal side. Name the congruence test.",
      "",
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
      "",
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
      "",
      "SSS",
      "Three equal sides → SSS.",
      ["sss"]
    ),
    answer(
      "y8-geo-con-m2",
      "Two pairs of corresponding sides and the included angle are equal. Name the test.",
      "",
      "SAS",
      "Two sides and the included angle → SAS.",
      ["sas"]
    ),
    answer(
      "y8-geo-con-m3",
      "Two pairs of corresponding angles and one pair of corresponding sides are equal. Name the test.",
      "",
      "AAS",
      "Two equal angles and a corresponding side → AAS.",
      ["aas"]
    ),
    answer(
      "y8-geo-con-m4",
      "Both triangles have a right angle, and the hypotenuse and one other side are equal. Name the test.",
      "",
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
      "",
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
      "In △ABC ≅ △PQR, angle B = 55° and angle C = 65°. Find angle P in degrees.",
      "",
      "60",
      "Angle A = 180 − 55 − 65 = 60°. A corresponds to P in the congruence statement, so angle P = 60°.",
      ["60°"]
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
      "In multi-step geometry problems, each unknown angle must be found one step at a time using a known rule. Before calculating, identify which rule applies: is it about parallel lines, a triangle, a quadrilateral, or a polygon?",
      "For each step, write both the value and the reason. A complete reason names the rule and, where relevant, the pair of lines or shape involved. For example: '∠x = 65°, alternate angles, AB ∥ CD'.",
      "When the problem involves an equation, set up the equation first using the appropriate rule (e.g. co-interior angles sum to 180°), then solve for the unknown variable before stating the angle values.",
      "Multi-step geometry is really a chain of single rules: each new angle is unlocked by one fact (angle sum, vertically opposite, alternate, co-interior, exterior angle), and that angle then becomes a 'known' that feeds the next step. The skill is choosing which rule fits the configuration in front of you — the arithmetic at each step is easy.",
      "Always pair every value with its reason. This is not just bookkeeping: naming the rule forces you to check it genuinely applies (alternate angles, for instance, need parallel lines), and an unjustified step is exactly where most marks and most mistakes are lost. Whenever two expressions describe the same angle, or add to a known total, set them equal and solve.",
    ],
    latexBlocks: [
      "\\text{Step 1: identify the rule (parallel lines / triangle / polygon)}",
      "\\text{Step 2: form an equation or substitution}",
      "\\text{Step 3: solve and state the reason}",
    ],
  },
  workedExamples: [
    {
      title: "Two-step: vertically opposite then co-interior",
      questionLatex:
        "\\text{Parallel lines }AB \\parallel CD.\\text{ A transversal crosses both. The angle at }A\\text{ is }70^\\circ.\\text{ Find the co-interior angle at }C.",
      steps: [
        {
          explanation: "Co-interior angles between parallel lines sum to 180°.",
          latex: "70 + \\angle C = 180",
        },
        {
          explanation: "Subtract.",
          latex: "\\angle C = 180 - 70 = 110^\\circ",
        },
      ],
      finalAnswerLatex: "110^\\circ\\text{ (co-interior angles, }AB \\parallel CD\\text{)}",
    } as WorkedExample,
    {
      title: "Triangle with an algebraic angle",
      questionLatex:
        "\\text{Triangle: angles are }x^\\circ,\\;(x+30)^\\circ,\\text{ and }(x+60)^\\circ.\\text{ Find }x\\text{ and each angle.}",
      steps: [
        {
          explanation: "Angle sum of a triangle is 180°.",
          latex: "x + (x+30) + (x+60) = 180",
        },
        {
          explanation: "Collect like terms.",
          latex: "3x + 90 = 180",
        },
        {
          explanation: "Solve.",
          latex: "3x = 90 \\Rightarrow x = 30",
        },
        {
          explanation: "Find each angle.",
          latex: "30^\\circ,\\quad 60^\\circ,\\quad 90^\\circ",
        },
      ],
      finalAnswerLatex: "x = 30,\\quad\\text{angles: }30^\\circ,\\;60^\\circ,\\;90^\\circ",
    } as WorkedExample,
    {
      title: "Exterior angle and parallel lines combined",
      questionLatex:
        "\\text{Parallel lines. A co-interior angle is }(3x)^\\circ\\text{ and the other co-interior angle is }(2x+30)^\\circ.\\text{ Find }x.",
      steps: [
        {
          explanation: "Co-interior angles sum to 180°.",
          latex: "3x + (2x + 30) = 180",
        },
        {
          explanation: "Collect and solve.",
          latex: "5x + 30 = 180 \\Rightarrow 5x = 150 \\Rightarrow x = 30",
        },
      ],
      finalAnswerLatex: "x = 30",
    } as WorkedExample,
    {
      title: "Chain two rules across a figure",
      questionLatex:
        "\\text{A straight line is split into }110^\\circ\\text{ and angle }a.\\; a\\text{ is one angle of a triangle whose other angle is }30^\\circ.\\text{ Find the third angle }b.",
      steps: [
        { explanation: "Step 1 — angles on a straight line sum to 180°.", latex: "a = 180 - 110 = 70^\\circ" },
        { explanation: "Step 2 — feed a into the triangle angle sum (180°).", latex: "b = 180 - 70 - 30 = 80^\\circ" },
      ],
      finalAnswerLatex: "b = 80^\\circ",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-geo-rea-g1",
      "Parallel lines. Corresponding angles are (2x + 10)° and (4x − 30)°. Find x.",
      "",
      "20",
      "2x + 10 = 4x − 30. So 40 = 2x, giving x = 20.",
      ["x = 20"]
    ),
    answer(
      "y8-geo-rea-g2",
      "A triangle has angles 55°, 72°, and x°. Find x using the angle sum of a triangle.",
      "",
      "53",
      "x = 180 − 55 − 72 = 53°.",
      ["53°"]
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
      "Parallel lines. A co-interior angle is 115°. Find the other co-interior angle y° in degrees.",
      "",
      "65",
      "Co-interior angles sum to 180°. y = 180 − 115 = 65°.",
      ["65°"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-rea-i1",
      "An exterior angle of a triangle is 125°. One non-adjacent interior angle is 55°. Find the other non-adjacent interior angle in degrees.",
      "",
      "70",
      "Exterior angle = sum of two non-adjacent interior angles. x = 125 − 55 = 70°.",
      ["70°"]
    ),
    answer(
      "y8-geo-rea-i2",
      "Parallel lines. Co-interior angles are 3x° and (2x + 30)°. Find x.",
      "",
      "30",
      "5x + 30 = 180, so 5x = 150, giving x = 30.",
      ["x = 30"]
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
      "A triangle has angles (2x + 10)°, (x + 20)°, and 90°. Find x.",
      "",
      "20",
      "3x + 120 = 180, so 3x = 60, giving x = 20.",
      ["x = 20"]
    ),
    answer(
      "y8-geo-rea-i5",
      "Quadrilateral ABCD has angles 2x°, 3x°, 4x°, and x°. Find angle A (= 2x°) in degrees.",
      "",
      "72",
      "10x = 360, so x = 36. Angle A = 2 × 36 = 72°.",
      ["72°"]
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
      "Parallel lines. An angle at the first line is 78°. State the alternate angle at the second line in degrees.",
      "",
      "78",
      "Alternate angles are equal when lines are parallel.",
      ["78°"]
    ),
    answer(
      "y8-geo-rea-m2",
      "Triangle: angles are x°, (x + 30)°, and (x + 60)°. Find x.",
      "",
      "30",
      "3x + 90 = 180, so 3x = 90, giving x = 30.",
      ["x = 30"]
    ),
    answer(
      "y8-geo-rea-m3",
      "Parallel lines. Corresponding angles: (3x + 15)° = (x + 55)°. Find x.",
      "",
      "20",
      "3x + 15 = x + 55, so 2x = 40, giving x = 20.",
      ["x = 20"]
    ),
    answer(
      "y8-geo-rea-m4",
      "An exterior angle of a triangle is 110°. The two non-adjacent interior angles are equal. Find each in degrees.",
      "",
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
      "In triangle ABC, angle A = 50° and angle B = 65°. Find angle C in degrees.",
      "",
      "65",
      "Angle C = 180 − 50 − 65 = 65°.",
      ["65°"]
    ),
    answer(
      "y8-geo-rea-m7",
      "Two lines intersect. One angle is 5x° and the vertically opposite angle is (3x + 20)°. Find x.",
      "",
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
      "",
      "540",
      "(5 − 2) × 180 = 3 × 180 = 540°.",
      ["540°"]
    ),
    answer(
      "y8-geo-rea-m10",
      "A triangle has one angle that is twice another. The third angle is 90°. Find the smallest angle in degrees.",
      "",
      "30",
      "3x + 90 = 180, so 3x = 90, giving x = 30°. The smallest angle is 30°.",
      ["30°"]
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
      "A parallelogram has two pairs of opposite sides that are equal and parallel. Opposite angles are equal, and co-interior angles (between the parallel sides) are supplementary — they add to 180°. The diagonals bisect each other, meaning they cut each other exactly in half.",
      "A rectangle is a parallelogram with all four angles equal to 90°. Its diagonals are equal in length and also bisect each other. A rhombus is a parallelogram with all four sides equal. Its diagonals bisect each other at right angles (90°) and each diagonal bisects the vertex angles at the corners it touches.",
      "A square combines the properties of both a rectangle and a rhombus: all sides equal, all angles 90°, diagonals equal, perpendicular, and bisecting each vertex angle. A common misconception is to treat these shapes as unrelated — in fact, a square IS a rectangle, and a square IS a rhombus, but a rhombus is NOT always a square.",
      "A trapezoid (or trapezium) has exactly one pair of parallel sides. The co-interior angles between those parallel sides are supplementary. A kite has two pairs of adjacent sides that are equal. One diagonal bisects the other at 90°, and the longer diagonal bisects the two vertex angles it connects.",
      "When finding an unknown angle or side, name the shape, state the property that applies, then calculate. For example: 'Opposite angles of a parallelogram are equal, so x = 70°.' Always match the property to the specific shape — not every quadrilateral has every property.",
    ],
    latexBlocks: [
      "\\text{Parallelogram: opposite angles equal; co-interior angles supplementary}",
      "\\text{Rectangle: all angles } 90^\\circ\\text{; diagonals equal and bisect each other}",
      "\\text{Rhombus: all sides equal; diagonals bisect at } 90^\\circ\\text{; diagonals bisect vertex angles}",
      "\\text{Square: all sides equal; all angles } 90^\\circ\\text{; diagonals equal, perpendicular, bisect vertex angles}",
      "\\text{Trapezoid: one pair of parallel sides; co-interior angles supplementary}",
      "\\text{Kite: two pairs of adjacent equal sides; one diagonal bisects the other at } 90^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Find an unknown angle in a parallelogram",
      questionLatex:
        "\\text{In parallelogram }ABCD,\\text{ angle }A = 112^\\circ.\\text{ Find angles }B,\\;C,\\text{ and }D.",
      steps: [
        {
          explanation: "Opposite angles of a parallelogram are equal.",
          latex: "\\angle C = \\angle A = 112^\\circ",
        },
        {
          explanation: "Co-interior angles between parallel sides are supplementary.",
          latex: "\\angle B + \\angle A = 180^\\circ \\Rightarrow \\angle B = 180 - 112 = 68^\\circ",
        },
        {
          explanation: "Opposite angles are equal.",
          latex: "\\angle D = \\angle B = 68^\\circ",
        },
      ],
      finalAnswerLatex:
        "\\angle B = 68^\\circ,\\quad \\angle C = 112^\\circ,\\quad \\angle D = 68^\\circ",
    } as WorkedExample,
    {
      title: "Find an angle using rhombus diagonal properties",
      questionLatex:
        "\\text{In rhombus }PQRS,\\text{ diagonal }PR\\text{ bisects angle }P.\\text{ If }\\angle QPR = 34^\\circ,\\text{ find }\\angle PQR.",
      steps: [
        {
          explanation:
            "The diagonal of a rhombus bisects the vertex angle, so the full angle at P is twice 34°.",
          latex: "\\angle QPR = 34^\\circ \\Rightarrow \\angle QPS = 2 \\times 34 = 68^\\circ",
        },
        {
          explanation: "Co-interior angles between parallel sides are supplementary.",
          latex: "\\angle PQR + \\angle QPS = 180^\\circ",
        },
        {
          explanation: "Subtract.",
          latex: "\\angle PQR = 180 - 68 = 112^\\circ",
        },
      ],
      finalAnswerLatex: "112^\\circ",
    } as WorkedExample,
    {
      title: "Identify a shape from its properties",
      questionLatex:
        "\\text{A quadrilateral has all sides equal, all angles }90^\\circ\\text{, and diagonals that bisect each other at }90^\\circ.\\text{ What shape is it?}",
      steps: [
        {
          explanation: "All sides equal AND all angles 90° → it satisfies both rhombus and rectangle definitions.",
          latex: "\\text{all sides equal + all angles }90^\\circ",
        },
        {
          explanation: "A shape that is both a rhombus and a rectangle is a square.",
          latex: "\\text{square}",
        },
      ],
      finalAnswerLatex: "\\text{Square}",
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
      "In parallelogram ABCD, angle A = 74°. Find angle C in degrees.",
      "",
      "74",
      "Opposite angles of a parallelogram are equal. Angle C = angle A = 74°.",
      ["74°"]
    ),
    answer(
      "y8-geo-qprop-g3",
      "A rhombus has a side length of 9 cm. Find the length of the other three sides in cm.",
      "",
      "9",
      "All four sides of a rhombus are equal. Every side is 9 cm.",
      ["9 cm"]
    ),
    answer(
      "y8-geo-qprop-g4",
      "State TWO properties of a rectangle's diagonals. Write your answer as: 'The diagonals are [property 1] and [property 2].'",
      "",
      "equal and bisect each other",
      "The diagonals of a rectangle are equal in length and bisect each other (each diagonal cuts the other in half).",
      ["equal length and bisect each other", "equal and bisect", "bisect each other and are equal"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-qprop-i1",
      "In a trapezoid, one co-interior angle between the parallel sides is 118°. Find the other co-interior angle in degrees.",
      "",
      "62",
      "Co-interior angles between parallel sides are supplementary. x = 180 − 118 = 62°.",
      ["62°"]
    ),
    answer(
      "y8-geo-qprop-i2",
      "A quadrilateral has opposite sides equal and parallel, opposite angles equal, and diagonals that bisect each other — but the angles are NOT all 90° and the sides are NOT all equal. What is the shape?",
      "",
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
      "",
      "76",
      "The longer diagonal of a kite bisects the vertex angle, so the full angle is 2 × 38° = 76°.",
      ["76°"]
    ),
    answer(
      "y8-geo-qprop-i5",
      "Parallelogram ABCD has angle A = (3x + 10)° and angle B = (2x + 20)°. Find x, then find angle A in degrees. Enter angle A.",
      "",
      "100",
      "Co-interior angles between parallel sides are supplementary: (3x + 10) + (2x + 20) = 180, so 5x + 30 = 180, giving x = 30. Angle A = 3(30) + 10 = 100°.",
      ["100°"]
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
      "In parallelogram WXYZ, angle W = 63°. Find angle X in degrees.",
      "",
      "117",
      "Co-interior angles between parallel sides are supplementary. Angle X = 180 − 63 = 117°.",
      ["117°"]
    ),
    answer(
      "y8-geo-qprop-m4",
      "A rectangle has a diagonal of length 13 cm. What is the length of the other diagonal in cm?",
      "",
      "13",
      "The diagonals of a rectangle are equal in length. The other diagonal is also 13 cm.",
      ["13 cm"]
    ),
    answer(
      "y8-geo-qprop-m5",
      "In rhombus ABCD, the diagonals intersect at point O. State the size of angle AOB in degrees.",
      "",
      "90",
      "The diagonals of a rhombus bisect each other at right angles. Angle AOB = 90°.",
      ["90°"]
    ),
    answer(
      "y8-geo-qprop-m6",
      "In trapezoid PQRS, PQ is parallel to SR. Angle P = 71°. Find angle S in degrees. Give the geometric reason.",
      "",
      "109",
      "Angle P and angle S are co-interior angles between the parallel sides PQ and SR, so they are supplementary. Angle S = 180 − 71 = 109°.",
      ["109°"]
    ),
    answer(
      "y8-geo-qprop-m7",
      "A quadrilateral has two pairs of adjacent equal sides and one diagonal that bisects the other at 90°. Name the shape.",
      "",
      "kite",
      "Two pairs of adjacent equal sides and one diagonal bisecting the other at 90° are defining properties of a kite.",
      ["a kite"]
    ),
    answer(
      "y8-geo-qprop-m8",
      "In parallelogram ABCD, angle A = (4x − 10)° and angle C = (2x + 30)°. Find x, then find angle A in degrees. Enter angle A.",
      "",
      "70",
      "Opposite angles of a parallelogram are equal: 4x − 10 = 2x + 30, so 2x = 40, giving x = 20. Angle A = 4(20) − 10 = 80 − 10 = 70°.",
      ["70°"]
    ),
    answer(
      "y8-geo-qprop-m9",
      "In rectangle KLMN, the diagonals intersect at point O. KM = 18 cm. Find the length OK in cm.",
      "",
      "9",
      "The diagonals of a rectangle bisect each other. OK = ½ × KM = ½ × 18 = 9 cm.",
      ["9 cm"]
    ),
    answer(
      "y8-geo-qprop-m10",
      "A quadrilateral has all angles equal to 90° but the sides are not all equal. Which shape is it, and justify using one diagonal property.",
      "",
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
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return { ...answer(id, prompt, latex, value, explanation, acceptedAnswers), difficulty };
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
  pAnswer("y8-geo-ang-p1", "Two angles are complementary. One is 40°. Find the other in degrees.", "", "50", "x = 90 − 40 = 50°.", 1, ["50°"]),
  pAnswer("y8-geo-ang-p2", "Two angles are supplementary. One is 120°. Find the other in degrees.", "", "60", "x = 180 − 120 = 60°.", 1, ["60°"]),
  pAnswer("y8-geo-ang-p3", "Two lines intersect. One angle is 75°. State its vertically opposite angle in degrees.", "", "75", "Vertically opposite angles are equal.", 1, ["75°"]),
  pAnswer("y8-geo-ang-p4", "The complement of 25° is how many degrees?", "", "65", "x = 90 − 25 = 65°.", 1, ["65°"]),
  pAnswer("y8-geo-ang-p5", "The supplement of 95° is how many degrees?", "", "85", "x = 180 − 95 = 85°.", 1, ["85°"]),
  // D2 — single-step substitution
  pAnswer("y8-geo-ang-p6", "Three angles meet at a point: 120°, 140°, and x°. Find x.", "", "100", "120 + 140 = 260. x = 360 − 260 = 100°.", 2, ["100°"]),
  pAnswer("y8-geo-ang-p7", "A straight line is split into 50°, 60°, and x°. Find x.", "", "70", "50 + 60 = 110. x = 180 − 110 = 70°.", 2, ["70°"]),
  pAnswer("y8-geo-ang-p8", "Two lines intersect. One angle is 38°. Find the angle adjacent to it on a straight line, in degrees.", "", "142", "Adjacent angles on a straight line are supplementary: 180 − 38 = 142°.", 2, ["142°"]),
  pChoice("y8-geo-ang-p9", "Two angles add to 90°. They are described as:", "B", ["Supplementary", "Complementary", "Vertically opposite", "Reflex"], "Angles summing to 90° are complementary.", 2),
  pAnswer("y8-geo-ang-p10", "Four angles meet at a point: 80°, 100°, 90°, and x°. Find x.", "", "90", "80 + 100 + 90 = 270. x = 360 − 270 = 90°.", 2, ["90°"]),
  pAnswer("y8-geo-ang-p11", "The complement of an angle is 18°. Find the angle in degrees.", "", "72", "x = 90 − 18 = 72°.", 2, ["72°"]),
  pAnswer("y8-geo-ang-p12", "The supplement of an angle is 47°. Find the angle in degrees.", "", "133", "x = 180 − 47 = 133°.", 2, ["133°"]),
  // D3 — two-step / reasoning
  pAnswer("y8-geo-ang-p13", "A straight line carries angles 2x°, 40°, and 70°. Find x.", "", "35", "2x + 110 = 180, so 2x = 70, giving x = 35.", 3, ["35°"]),
  pAnswer("y8-geo-ang-p14", "At a point, the angles are 3x°, 100°, and 80°. Find x.", "", "60", "3x + 180 = 360, so 3x = 180, giving x = 60.", 3, ["60°"]),
  pChoice("y8-geo-ang-p15", "An angle and its supplement are equal. What is each angle?", "C", ["45°", "60°", "90°", "120°"], "If x = 180 − x, then 2x = 180, so x = 90°.", 3),
  pAnswer("y8-geo-ang-p16", "Two lines intersect. One angle is 110°. Find the smaller angle formed in degrees.", "", "70", "Adjacent angle = 180 − 110 = 70°, which is the smaller angle.", 3, ["70°"]),
  pAnswer("y8-geo-ang-p17", "Three equal angles meet at a point. Find each angle in degrees.", "", "120", "3x = 360, so x = 120°.", 3, ["120°"]),
  pAnswer("y8-geo-ang-p18", "At a point, angles are x°, x°, and 160°. Find x.", "", "100", "2x = 200, so x = 100°.", 3, ["100°"]),
  // D4 — algebraic / multi-step
  pAnswer("y8-geo-ang-p19", "Two lines intersect. One angle is (4x)° and its vertically opposite is (2x + 50)°. Find x.", "", "25", "Vertically opposite angles are equal: 4x = 2x + 50, so 2x = 50, x = 25.", 4, ["25°"]),
  pAnswer("y8-geo-ang-p20", "An angle is 30° more than its complement. Find the angle in degrees.", "", "60", "Let the angle be x; its complement is 90 − x = x − 30, so 2x = 120, x = 60°.", 4, ["60°"]),
  pAnswer("y8-geo-ang-p21", "An angle is twice its supplement. Find the angle in degrees.", "", "120", "x = 2(180 − x) → x = 360 − 2x → 3x = 360 → x = 120°.", 4, ["120°"]),
  pAnswer("y8-geo-ang-p22", "On a straight line: (x + 10)°, (2x)°, and (x − 10)°. Find x.", "", "45", "4x = 180, so x = 45.", 4, ["45°"]),
  pAnswer("y8-geo-ang-p23", "At a point, four equal angles meet. Find the size of each angle in degrees.", "", "90", "4x = 360, so each angle = 90°.", 4, ["90°"]),
  pAnswer("y8-geo-ang-p24", "An angle is 3 times its complement. Find the angle in degrees.", "", "67.5", "x = 3(90 − x) → x = 270 − 3x → 4x = 270 → x = 67.5°.", 4, ["67.5°"]),
  // D5 — hardest
  pAnswer("y8-geo-ang-p25", "Two supplementary angles are in the ratio 2 : 3. Find the larger angle in degrees.", "", "108", "5k = 180, so k = 36. Larger angle = 3 × 36 = 108°.", 5, ["108°"]),
  pAnswer("y8-geo-ang-p26", "Two complementary angles are in the ratio 4 : 5. Find the smaller angle in degrees.", "", "40", "9k = 90, so k = 10. Smaller angle = 4 × 10 = 40°.", 5, ["40°"]),
  pAnswer("y8-geo-ang-p27", "At a point, the angles are x°, (2x)°, (3x)°, and (4x)°. Find the largest angle in degrees.", "", "144", "10x = 360, so x = 36. Largest = 4 × 36 = 144°.", 5, ["144°"]),
  pAnswer("y8-geo-ang-p28", "Two lines intersect. One angle is (5x − 10)° and the adjacent angle on the straight line is (3x + 30)°. Find x.", "", "20", "8x + 20 = 180, so 8x = 160, x = 20.", 5, ["20°"]),
];

angleRelationships.multiPartPractice = [
  {
    id: "y8-geo-ang-mp1",
    prompt:
      "Two straight lines, PQ and RS, cross at point O. Around O the four angles, taken in order, are ∠POR, ∠ROQ, ∠QOS and ∠SOP. It is given that ∠POR = 64°.",
    latex: "\\angle POR = 64^\\circ",
    answer: "116",
    hint: "Vertically opposite angles are equal; adjacent angles on a straight line are supplementary.",
    explanation:
      "∠QOS is vertically opposite ∠POR, so it is 64°. ∠ROQ is on a straight line with ∠POR, so 180 − 64 = 116°. All four angles around O add to 360°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find ∠QOS (the angle vertically opposite ∠POR) in degrees.",
        latex: "",
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
        latex: "",
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
        latex: "",
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
  pAnswer("y8-geo-par-p1", "Parallel lines. A corresponding angle is 70°. Find the other in degrees.", "", "70", "Corresponding angles are equal when lines are parallel.", 1, ["70°"]),
  pAnswer("y8-geo-par-p2", "Parallel lines. An alternate angle is 55°. Find the other in degrees.", "", "55", "Alternate angles are equal when lines are parallel.", 1, ["55°"]),
  pAnswer("y8-geo-par-p3", "Parallel lines. One co-interior angle is 100°. Find the other in degrees.", "", "80", "Co-interior angles sum to 180°: 180 − 100 = 80°.", 1, ["80°"]),
  pAnswer("y8-geo-par-p4", "Parallel lines. A corresponding angle is 134°. Find the other in degrees.", "", "134", "Corresponding angles are equal.", 1, ["134°"]),
  pAnswer("y8-geo-par-p5", "Parallel lines. One co-interior angle is 90°. Find the other in degrees.", "", "90", "180 − 90 = 90°.", 1, ["90°"]),
  // D2
  pChoice("y8-geo-par-p6", "Which shape represents alternate angles?", "B", ["F-shape", "Z-shape", "C-shape", "X-shape"], "Alternate angles form a Z-shape.", 2),
  pChoice("y8-geo-par-p7", "Which shape represents co-interior angles?", "C", ["F-shape", "Z-shape", "C-shape", "T-shape"], "Co-interior angles form a C-shape.", 2),
  pAnswer("y8-geo-par-p8", "Parallel lines. An alternate angle is 128°. Find the other in degrees.", "", "128", "Alternate angles are equal.", 2, ["128°"]),
  pAnswer("y8-geo-par-p9", "Parallel lines. One co-interior angle is 73°. Find the other in degrees.", "", "107", "180 − 73 = 107°.", 2, ["107°"]),
  pAnswer("y8-geo-par-p10", "Parallel lines. A corresponding angle is 41°. The angle adjacent to it on a straight line is found by 180 − 41. Find that angle in degrees.", "", "139", "180 − 41 = 139°.", 2, ["139°"]),
  pAnswer("y8-geo-par-p11", "Parallel lines. One co-interior angle is 126°. Find the other in degrees.", "", "54", "180 − 126 = 54°.", 2, ["54°"]),
  // D3
  pChoice("y8-geo-par-p12", "Co-interior angles between parallel lines are always:", "B", ["Equal", "Supplementary", "Complementary", "Reflex"], "Co-interior angles sum to 180° (supplementary).", 3),
  pAnswer("y8-geo-par-p13", "Parallel lines. An angle is 64°. Find its co-interior partner in degrees.", "", "116", "180 − 64 = 116°.", 3, ["116°"]),
  pAnswer("y8-geo-par-p14", "Parallel lines. The two co-interior angles are equal. Find each in degrees.", "", "90", "2x = 180, so each = 90°.", 3, ["90°"]),
  pAnswer("y8-geo-par-p15", "Parallel lines. An alternate angle is 117° and the angle next to it on the straight line is 180 − 117. Find that angle in degrees.", "", "63", "180 − 117 = 63°.", 3, ["63°"]),
  pAnswer("y8-geo-par-p16", "Parallel lines. Co-interior angles are x° and 3x°. Find x.", "", "45", "4x = 180, so x = 45.", 3, ["45°"]),
  pAnswer("y8-geo-par-p17", "Parallel lines. Co-interior angles are 2x° and 4x°. Find the larger angle in degrees.", "", "120", "6x = 180, x = 30. Larger = 4 × 30 = 120°.", 3, ["120°"]),
  // D4
  pAnswer("y8-geo-par-p18", "Parallel lines. Corresponding angles: (3x + 20)° = (x + 60)°. Find x.", "", "20", "3x + 20 = x + 60, so 2x = 40, x = 20.", 4, ["20°"]),
  pAnswer("y8-geo-par-p19", "Parallel lines. Alternate angles: (6x − 10)° = (4x + 30)°. Find x.", "", "20", "6x − 10 = 4x + 30, so 2x = 40, x = 20.", 4, ["20°"]),
  pAnswer("y8-geo-par-p20", "Parallel lines. Co-interior angles: (2x + 30)° and (3x + 50)°. Find x.", "", "20", "5x + 80 = 180, so 5x = 100, x = 20.", 4, ["20°"]),
  pAnswer("y8-geo-par-p21", "Parallel lines. Corresponding angles: (5x − 25)° = (2x + 50)°. Find x.", "", "25", "5x − 25 = 2x + 50, so 3x = 75, x = 25.", 4, ["25°"]),
  pAnswer("y8-geo-par-p22", "Parallel lines. Co-interior angles are (4x)° and (5x)°. Find the smaller angle in degrees.", "", "80", "9x = 180, x = 20. Smaller = 4 × 20 = 80°.", 4, ["80°"]),
  pAnswer("y8-geo-par-p23", "Parallel lines. Alternate angles: (7x + 5)° = (3x + 65)°. Find the angle in degrees.", "", "110", "4x = 60, x = 15. Angle = 7(15) + 5 = 110°.", 4, ["110°"]),
  // D5
  pAnswer("y8-geo-par-p24", "Parallel lines. Two co-interior angles are in the ratio 1 : 2. Find the larger angle in degrees.", "", "120", "3k = 180, k = 60. Larger = 2 × 60 = 120°.", 5, ["120°"]),
  pAnswer("y8-geo-par-p25", "Parallel lines. Co-interior angles are (3x + 15)° and (2x − 25)°... but they must sum to 180. Find x.", "", "38", "5x − 10 = 180, so 5x = 190, x = 38.", 5, ["38°"]),
  pAnswer("y8-geo-par-p26", "A transversal cuts parallel lines. The corresponding angle is 3 times its own co-interior partner. Find the corresponding angle in degrees.", "", "135", "If the co-interior partner is x and the angle is 3x, then x + 3x = 180, x = 45, so the angle = 135°.", 5, ["135°"]),
  pAnswer("y8-geo-par-p27", "Parallel lines. One co-interior angle exceeds the other by 40°. Find the smaller angle in degrees.", "", "70", "2x + 40 = 180, so 2x = 140, x = 70°.", 5, ["70°"]),
  pAnswer("y8-geo-par-p28", "Parallel lines. Alternate angles: (10x − 30)° = (6x + 50)°. Find the angle in degrees.", "", "170", "4x = 80, x = 20. Angle = 10(20) − 30 = 170°.", 5, ["170°"]),
];

parallelLinesTransversals.multiPartPractice = [
  {
    id: "y8-geo-par-mp1",
    prompt:
      "Two parallel lines AB and CD are cut by a transversal. At the upper line the transversal makes an angle of 68° measured above the line on the right of the crossing point.",
    latex: "AB \\parallel CD,\\quad \\text{given angle} = 68^\\circ",
    answer: "112",
    hint: "Corresponding angles are equal; alternate angles are equal; co-interior angles sum to 180°.",
    explanation:
      "The corresponding angle at the lower line is 68°. The alternate angle at the lower line is also 68°. The co-interior angle is 180 − 68 = 112°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the corresponding angle at the lower line in degrees.",
        latex: "",
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
        latex: "",
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
        latex: "",
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
  pAnswer("y8-geo-tri-p1", "Triangle angles 60° and 70°. Find the third in degrees.", "", "50", "x = 180 − 130 = 50°.", 1, ["50°"]),
  pAnswer("y8-geo-tri-p2", "Triangle angles 90° and 45°. Find the third in degrees.", "", "45", "x = 180 − 135 = 45°.", 1, ["45°"]),
  pAnswer("y8-geo-tri-p3", "Quadrilateral angles 90°, 90°, 90°, and x°. Find x.", "", "90", "x = 360 − 270 = 90°.", 1, ["90°"]),
  pAnswer("y8-geo-tri-p4", "Triangle angles 30° and 80°. Find the third in degrees.", "", "70", "x = 180 − 110 = 70°.", 1, ["70°"]),
  pAnswer("y8-geo-tri-p5", "Each angle of an equilateral triangle is how many degrees?", "", "60", "180 ÷ 3 = 60°.", 1, ["60°"]),
  // D2
  pAnswer("y8-geo-tri-p6", "An exterior angle is 120°. One non-adjacent interior angle is 70°. Find the other in degrees.", "", "50", "x = 120 − 70 = 50°.", 2, ["50°"]),
  pAnswer("y8-geo-tri-p7", "Quadrilateral angles 80°, 100°, 70°, and x°. Find x.", "", "110", "x = 360 − 250 = 110°.", 2, ["110°"]),
  pAnswer("y8-geo-tri-p8", "An isosceles triangle has base angles of 48° each. Find the apex angle in degrees.", "", "84", "x = 180 − 96 = 84°.", 2, ["84°"]),
  pAnswer("y8-geo-tri-p9", "A right-angled triangle has one acute angle of 52°. Find the other acute angle in degrees.", "", "38", "x = 180 − 142 = 38°.", 2, ["38°"]),
  pChoice("y8-geo-tri-p10", "The angle sum of a triangle is:", "B", ["90°", "180°", "270°", "360°"], "A triangle's interior angles sum to 180°.", 2),
  pAnswer("y8-geo-tri-p11", "An exterior angle is 140°. One non-adjacent interior angle is 65°. Find the other in degrees.", "", "75", "x = 140 − 65 = 75°.", 2, ["75°"]),
  // D3
  pAnswer("y8-geo-tri-p12", "An isosceles triangle has an apex angle of 40°. Find each base angle in degrees.", "", "70", "2x = 140, so each base angle = 70°.", 3, ["70°"]),
  pAnswer("y8-geo-tri-p13", "Triangle angles x°, x°, and 80°. Find x.", "", "50", "2x = 100, so x = 50.", 3, ["50°"]),
  pAnswer("y8-geo-tri-p14", "Quadrilateral angles 2x°, 2x°, x°, and x°. Find x.", "", "60", "6x = 360, so x = 60.", 3, ["60°"]),
  pChoice("y8-geo-tri-p15", "A triangle has angles 100°, 50°, and 30°. It is best described as:", "C", ["Right-angled", "Equilateral", "Obtuse-angled", "Isosceles"], "It contains a 100° angle, which is obtuse.", 3),
  pAnswer("y8-geo-tri-p16", "An exterior angle of a triangle equals 130° and the two non-adjacent interior angles are equal. Find each in degrees.", "", "65", "Each = 130 ÷ 2 = 65°.", 3, ["65°"]),
  pAnswer("y8-geo-tri-p17", "Triangle angles 3x°, 4x°, and 5x°. Find the largest angle in degrees.", "", "75", "12x = 180, x = 15. Largest = 5 × 15 = 75°.", 3, ["75°"]),
  // D4
  pAnswer("y8-geo-tri-p18", "Triangle angles (x + 10)°, (x + 20)°, and (x + 30)°. Find x.", "", "40", "3x + 60 = 180, so 3x = 120, x = 40.", 4, ["40°"]),
  pAnswer("y8-geo-tri-p19", "Quadrilateral angles (x)°, (x + 20)°, (x + 40)°, and (x + 60)°. Find x.", "", "60", "4x + 120 = 360, so 4x = 240, x = 60.", 4, ["60°"]),
  pAnswer("y8-geo-tri-p20", "An exterior angle of a triangle is (3x)° and equals the sum of interior angles (2x)° and 40°. Find x.", "", "40", "3x = 2x + 40, so x = 40.", 4, ["40°"]),
  pAnswer("y8-geo-tri-p21", "Triangle angles 2x°, 3x°, and (x + 20)°. Find x.", "", "26.67", "6x + 20 = 180, so 6x = 160, x ≈ 26.67.", 4, ["26.67°", "80/3"]),
  pAnswer("y8-geo-tri-p22", "A right-angled triangle has acute angles in the ratio 2 : 1. Find the larger acute angle in degrees.", "", "60", "3k = 90, k = 30. Larger = 2 × 30 = 60°.", 4, ["60°"]),
  pAnswer("y8-geo-tri-p23", "Quadrilateral angles 3x°, 3x°, 2x°, and 2x°. Find the largest angle in degrees.", "", "108", "10x = 360, x = 36. Largest = 3 × 36 = 108°.", 4, ["108°"]),
  // D5
  pAnswer("y8-geo-tri-p24", "The angles of a triangle are in the ratio 2 : 3 : 4. Find the largest angle in degrees.", "", "80", "9k = 180, k = 20. Largest = 4 × 20 = 80°.", 5, ["80°"]),
  pAnswer("y8-geo-tri-p25", "The angles of a quadrilateral are in the ratio 1 : 2 : 3 : 4. Find the largest angle in degrees.", "", "144", "10k = 360, k = 36. Largest = 4 × 36 = 144°.", 5, ["144°"]),
  pAnswer("y8-geo-tri-p26", "In a triangle, the second angle is double the first and the third is 30° more than the first. Find the first angle in degrees.", "", "37.5", "4x + 30 = 180, so 4x = 150, x = 37.5°.", 5, ["37.5°"]),
  pAnswer("y8-geo-tri-p27", "An exterior angle of a triangle is 5 times the smaller of its two non-adjacent interior angles, and the larger of those interior angles is 80°. Find the smaller interior angle in degrees.", "", "20", "Exterior = 5x = x + 80, so 4x = 80, x = 20°.", 5, ["20°"]),
  pAnswer("y8-geo-tri-p28", "A quadrilateral has three equal angles and a fourth angle of 120°. Find each of the three equal angles in degrees.", "", "80", "3x = 240, so each = 80°.", 5, ["80°"]),
];

anglesTrianglesQuadrilaterals.multiPartPractice = [
  {
    id: "y8-geo-tri-mp1",
    prompt:
      "In triangle ABC the side BC is extended to a point D, forming an exterior angle ∠ACD. It is given that ∠ABC = 50° and ∠BAC = 60°.",
    latex: "\\angle ABC = 50^\\circ,\\quad \\angle BAC = 60^\\circ",
    answer: "110",
    hint: "Use the triangle angle sum (180°) and the exterior-angle theorem.",
    explanation:
      "∠ACB = 180 − 50 − 60 = 70°. The exterior angle ∠ACD = 50 + 60 = 110° (sum of the two non-adjacent interior angles), which also equals 180 − 70.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the interior angle ∠ACB in degrees.",
        latex: "",
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
        latex: "",
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
        latex: "",
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
  pAnswer("y8-geo-pol-p1", "Find the interior angle sum of a quadrilateral (4 sides).", "", "360", "(4 − 2) × 180 = 360°.", 1, ["360°"]),
  pAnswer("y8-geo-pol-p2", "Find the interior angle sum of a pentagon (5 sides).", "", "540", "(5 − 2) × 180 = 540°.", 1, ["540°"]),
  pAnswer("y8-geo-pol-p3", "Find each exterior angle of a regular quadrilateral (square).", "", "90", "360 ÷ 4 = 90°.", 1, ["90°"]),
  pAnswer("y8-geo-pol-p4", "Find the interior angle sum of a hexagon (6 sides).", "", "720", "(6 − 2) × 180 = 720°.", 1, ["720°"]),
  pAnswer("y8-geo-pol-p5", "Find each exterior angle of a regular pentagon.", "", "72", "360 ÷ 5 = 72°.", 1, ["72°"]),
  // D2
  pAnswer("y8-geo-pol-p6", "Find each interior angle of a regular octagon (8 sides).", "", "135", "(8 − 2) × 180 = 1080; 1080 ÷ 8 = 135°.", 2, ["135°"]),
  pAnswer("y8-geo-pol-p7", "Find each exterior angle of a regular decagon (10 sides).", "", "36", "360 ÷ 10 = 36°.", 2, ["36°"]),
  pAnswer("y8-geo-pol-p8", "A regular polygon has each exterior angle of 45°. How many sides?", "", "8", "n = 360 ÷ 45 = 8 sides.", 2, ["8 sides"]),
  pAnswer("y8-geo-pol-p9", "Find the interior angle sum of an octagon (8 sides).", "", "1080", "(8 − 2) × 180 = 1080°.", 2, ["1080°"]),
  pChoice("y8-geo-pol-p10", "The exterior angles of any convex polygon sum to:", "B", ["180°", "360°", "(n−2)×180°", "Depends on n"], "Always 360°.", 2),
  pAnswer("y8-geo-pol-p11", "Find each interior angle of a regular pentagon.", "", "108", "540 ÷ 5 = 108°.", 2, ["108°"]),
  // D3
  pAnswer("y8-geo-pol-p12", "A regular polygon has each exterior angle of 24°. How many sides?", "", "15", "n = 360 ÷ 24 = 15 sides.", 3, ["15 sides"]),
  pAnswer("y8-geo-pol-p13", "Find each interior angle of a regular 15-sided polygon.", "", "156", "(15 − 2) × 180 = 2340; 2340 ÷ 15 = 156°.", 3, ["156°"]),
  pAnswer("y8-geo-pol-p14", "A regular polygon has each interior angle of 144°. How many sides?", "", "10", "180n − 360 = 144n → 36n = 360 → n = 10.", 3, ["10 sides"]),
  pAnswer("y8-geo-pol-p15", "The interior angle sum of a polygon is 1260°. How many sides does it have?", "", "9", "n − 2 = 7, so n = 9.", 3, ["9 sides"]),
  pAnswer("y8-geo-pol-p16", "Find each interior angle of a regular 18-sided polygon.", "", "160", "(18 − 2) × 180 = 2880; 2880 ÷ 18 = 160°.", 3, ["160°"]),
  pAnswer("y8-geo-pol-p17", "A regular polygon has each interior angle of 150°. Find each exterior angle in degrees.", "", "30", "Interior and exterior are supplementary: 180 − 150 = 30°.", 3, ["30°"]),
  // D4
  pAnswer("y8-geo-pol-p18", "A regular polygon has each interior angle of 162°. How many sides?", "", "20", "180n − 360 = 162n → 18n = 360 → n = 20.", 4, ["20 sides"]),
  pAnswer("y8-geo-pol-p19", "The interior angle sum of a polygon is 1800°. How many sides?", "", "12", "n − 2 = 10, so n = 12.", 4, ["12 sides"]),
  pAnswer("y8-geo-pol-p20", "A regular polygon has each exterior angle of 18°. Find each interior angle in degrees.", "", "162", "180 − 18 = 162°.", 4, ["162°"]),
  pAnswer("y8-geo-pol-p21", "A regular polygon has each interior angle of 156°. Find the number of sides.", "", "15", "Exterior = 180 − 156 = 24°; n = 360 ÷ 24 = 15.", 4, ["15 sides"]),
  pAnswer("y8-geo-pol-p22", "The interior angle sum of a polygon is 2340°. How many sides?", "", "15", "n − 2 = 13, so n = 15.", 4, ["15 sides"]),
  pAnswer("y8-geo-pol-p23", "A regular polygon has 24 sides. Find each interior angle in degrees.", "", "165", "(24 − 2) × 180 = 3960; 3960 ÷ 24 = 165°.", 4, ["165°"]),
  // D5
  pAnswer("y8-geo-pol-p24", "Each interior angle of a regular polygon is 5 times its exterior angle. How many sides?", "", "12", "Interior + exterior = 180 and interior = 5 × exterior, so 6 × exterior = 180, exterior = 30°, n = 360 ÷ 30 = 12.", 5, ["12 sides"]),
  pAnswer("y8-geo-pol-p25", "The interior angle of a regular polygon is 168°. How many sides?", "", "30", "Exterior = 12°; n = 360 ÷ 12 = 30.", 5, ["30 sides"]),
  pAnswer("y8-geo-pol-p26", "A regular polygon has an interior angle sum of 3240°. Find each interior angle in degrees.", "", "162", "n − 2 = 18, so n = 20; 3240 ÷ 20 = 162°.", 5, ["162°"]),
  pAnswer("y8-geo-pol-p27", "The interior angle of a regular polygon is 4 times the exterior angle. Find the interior angle in degrees.", "", "144", "5e = 180, e = 36, so interior = 4 × 36 = 144°.", 5, ["144°"]),
  pAnswer("y8-geo-pol-p28", "A regular polygon has each exterior angle equal to one-eighth of its interior angle. How many sides?", "", "18", "Exterior = interior ÷ 8 → i = 8e and i + e = 180, so 9e = 180, e = 20°; n = 360 ÷ 20 = 18.", 5, ["18 sides"]),
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
        latex: "",
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
        latex: "",
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
        latex: "",
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
  pAnswer("y8-geo-con-p1", "Three pairs of equal sides. Name the congruence test (3 letters).", "", "SSS", "Three equal sides → SSS.", 1, ["sss"]),
  pAnswer("y8-geo-con-p2", "Two sides and the included angle equal. Name the congruence test.", "", "SAS", "Two sides + included angle → SAS.", 1, ["sas"]),
  pAnswer("y8-geo-con-p3", "Right angle, hypotenuse and one side equal. Name the test.", "", "RHS", "Right angle, Hypotenuse, Side → RHS.", 1, ["rhs"]),
  pAnswer("y8-geo-con-p4", "Two angles and a corresponding side equal. Name the test.", "", "AAS", "Two angles + corresponding side → AAS.", 1, ["aas"]),
  pChoice("y8-geo-con-p5", "Which is NOT a valid congruence test?", "C", ["SSS", "SAS", "AAA", "RHS"], "AAA proves similarity, not congruence.", 1),
  // D2
  pChoice("y8-geo-con-p6", "SAS requires the equal angle to be:", "A", ["Between the two equal sides", "Opposite the longest side", "A right angle", "Anywhere"], "The angle in SAS must be the included angle.", 2),
  pChoice("y8-geo-con-p7", "The 'H' in RHS stands for:", "B", ["Height", "Hypotenuse", "Half", "Horizontal"], "RHS = Right angle, Hypotenuse, Side.", 2),
  pAnswer("y8-geo-con-p8", "△ABC ≅ △DEF. Side AB corresponds to which side of △DEF?", "", "DE", "A↔D and B↔E, so AB ↔ DE.", 2, ["de"]),
  pAnswer("y8-geo-con-p9", "△PQR ≅ △XYZ. Angle Q corresponds to which angle?", "", "Y", "Q is the 2nd vertex, matching Y.", 2, ["angle Y", "∠Y"]),
  pChoice("y8-geo-con-p10", "AAA proves that two triangles are:", "C", ["Congruent", "Equal in area", "Similar", "Right-angled"], "Equal angles give similar triangles (same shape, possibly different size).", 2),
  pAnswer("y8-geo-con-p11", "Two right triangles have equal hypotenuses and one equal leg. Are they congruent? Enter yes or no.", "", "yes", "This is the RHS test, so they are congruent.", 2, ["Yes"]),
  // D3
  pAnswer("y8-geo-con-p12", "△ABC ≅ △DEF with AB = 6, BC = 8, CA = 10. Find DE.", "", "6", "DE corresponds to AB, so DE = 6.", 3, ["6 cm"]),
  pAnswer("y8-geo-con-p13", "△ABC ≅ △PQR. ∠A = 70°, ∠B = 60°. Find ∠R.", "", "50", "∠C = 180 − 70 − 60 = 50°; C↔R so ∠R = 50°.", 3, ["50°"]),
  pChoice("y8-geo-con-p14", "Why does SSA not generally prove congruence?", "B", ["Sides cannot be measured", "It can produce two different triangles", "It needs a right angle", "It only works for squares"], "SSA (non-included angle) is ambiguous and may give two triangles.", 3),
  pAnswer("y8-geo-con-p15", "△ABC ≅ △DEF. AC = 9 cm, and DF corresponds to AC. Find DF in cm.", "", "9", "DF corresponds to AC, so DF = 9 cm.", 3, ["9 cm"]),
  pAnswer("y8-geo-con-p16", "Two triangles have all three pairs of sides 5, 12, 13. Which test proves congruence?", "", "SSS", "All three sides equal → SSS.", 3, ["sss"]),
  pAnswer("y8-geo-con-p17", "△ABC ≅ △PQR. ∠B = 48° and ∠C = 62°. Find ∠P.", "", "70", "∠A = 180 − 48 − 62 = 70°; A↔P, so ∠P = 70°.", 3, ["70°"]),
  // D4
  pAnswer("y8-geo-con-p18", "△ABC ≅ △DEF. ∠D = (2x)° and ∠A = 50°. Find x.", "", "25", "Corresponding angles are equal: 2x = 50, x = 25.", 4, ["25°"]),
  pAnswer("y8-geo-con-p19", "△ABC ≅ △PQR. AB = (3x − 4) cm and PQ = 11 cm. Find x.", "", "5", "AB = PQ: 3x − 4 = 11, so 3x = 15, x = 5.", 4, ["5 cm"]),
  pAnswer("y8-geo-con-p20", "△ABC ≅ △DEF. ∠A = 55°, ∠E = 65°. Find ∠C.", "", "60", "∠B = ∠E = 65°. ∠C = 180 − 55 − 65 = 60°.", 4, ["60°"]),
  pAnswer("y8-geo-con-p21", "△ABC ≅ △DEF. BC = (4x + 1) and EF = (2x + 9). Find BC.", "", "17", "4x + 1 = 2x + 9, so 2x = 8, x = 4; BC = 4(4)+1 = 17.", 4, ["17 cm"]),
  pAnswer("y8-geo-con-p22", "An isosceles triangle is split by its axis of symmetry into two congruent right triangles. If the apex angle is 50°, find the half-apex angle in each right triangle in degrees.", "", "25", "The axis bisects the apex: 50 ÷ 2 = 25°.", 4, ["25°"]),
  pAnswer("y8-geo-con-p23", "△ABC ≅ △PQR. ∠P = (3x + 10)° and ∠A = (x + 40)°. Find x.", "", "15", "3x + 10 = x + 40, so 2x = 30, x = 15.", 4, ["15°"]),
  // D5
  pAnswer("y8-geo-con-p24", "△ABC ≅ △DEF. The perimeter of △ABC is 30 cm, with AB = 8 cm and BC = 11 cm. Find DF (corresponding to CA) in cm.", "", "11", "CA = 30 − 8 − 11 = 11 cm; DF corresponds to CA, so DF = 11 cm.", 5, ["11 cm"]),
  pAnswer("y8-geo-con-p25", "△ABC ≅ △PQR. ∠A = (2x + 10)°, ∠B = (3x)°, ∠C = (x + 20)°. Find x.", "", "25", "6x + 30 = 180, so 6x = 150, x = 25.", 5, ["25°"]),
  pAnswer("y8-geo-con-p26", "Two congruent triangles each have area such that together they form a rectangle of area 48 cm². Find the area of one triangle in cm².", "", "24", "Each triangle is half the rectangle: 48 ÷ 2 = 24 cm².", 5, ["24"]),
  pAnswer("y8-geo-con-p27", "△ABC ≅ △DEF. ∠A = 90°, ∠B = (5x)° and ∠C = (4x)°. Find x.", "", "10", "9x = 90, so x = 10.", 5, ["10°"]),
  pAnswer("y8-geo-con-p28", "△ABC ≅ △DEF with AB = (2x + 3) cm and the corresponding side DE = 13 cm. Find x.", "", "5", "AB = DE: 2x + 3 = 13, so 2x = 10, x = 5.", 5, ["5"]),
];

congruentTriangles.multiPartPractice = [
  {
    id: "y8-geo-con-mp1",
    prompt:
      "In triangles ABC and DEF it is given that AB = DE, BC = EF and the included angles are equal: ∠ABC = ∠DEF. Triangle ABC has ∠BAC = 58° and ∠BCA = 74°.",
    latex: "AB = DE,\\; BC = EF,\\; \\angle ABC = \\angle DEF",
    answer: "48",
    hint: "Identify the congruence test from the data; then use corresponding parts and the triangle angle sum.",
    explanation:
      "Two sides and the included angle are equal, so △ABC ≅ △DEF by SAS. ∠ABC = 180 − 58 − 74 = 48°. Because the triangles are congruent, ∠DEF = ∠ABC = 48°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find ∠ABC in degrees.",
        latex: "",
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
        latex: "",
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
        latex: "",
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
  pAnswer("y8-geo-rea-p1", "Triangle angles 40°, 60°, and x°. Find x.", "", "80", "x = 180 − 100 = 80°.", 1, ["80°"]),
  pAnswer("y8-geo-rea-p2", "Parallel lines. An alternate angle is 50°. Find the other in degrees.", "", "50", "Alternate angles are equal.", 1, ["50°"]),
  pAnswer("y8-geo-rea-p3", "Two lines intersect. One angle is 85°. Find its vertically opposite angle in degrees.", "", "85", "Vertically opposite angles are equal.", 1, ["85°"]),
  pAnswer("y8-geo-rea-p4", "Parallel lines. One co-interior angle is 95°. Find the other in degrees.", "", "85", "180 − 95 = 85°.", 1, ["85°"]),
  pAnswer("y8-geo-rea-p5", "Quadrilateral angles 90°, 100°, 80°, and x°. Find x.", "", "90", "x = 360 − 270 = 90°.", 1, ["90°"]),
  // D2
  pAnswer("y8-geo-rea-p6", "A triangle has a right angle and one angle of 35°. Find the third angle in degrees.", "", "55", "x = 180 − 125 = 55°.", 2, ["55°"]),
  pAnswer("y8-geo-rea-p7", "An exterior angle of a triangle is 100° and one non-adjacent interior angle is 45°. Find the other in degrees.", "", "55", "x = 100 − 45 = 55°.", 2, ["55°"]),
  pChoice("y8-geo-rea-p8", "A correct reason for two equal angles in matching positions at parallel lines is:", "B", ["Vertically opposite angles", "Corresponding angles", "Co-interior angles", "Angle sum of a triangle"], "Matching positions = corresponding angles.", 2),
  pAnswer("y8-geo-rea-p9", "Parallel lines. An angle is 124°. Find its co-interior partner in degrees.", "", "56", "180 − 124 = 56°.", 2, ["56°"]),
  pAnswer("y8-geo-rea-p10", "A polygon has 6 sides. Find its interior angle sum in degrees.", "", "720", "(6 − 2) × 180 = 720°.", 2, ["720°"]),
  // D3
  pAnswer("y8-geo-rea-p11", "Parallel lines. Corresponding angles: (2x + 5)° = (x + 35)°. Find x.", "", "30", "2x + 5 = x + 35, so x = 30.", 3, ["30°"]),
  pAnswer("y8-geo-rea-p12", "A triangle has angles x°, (x + 10)°, and (x + 20)°. Find x.", "", "50", "3x + 30 = 180, so 3x = 150, x = 50.", 3, ["50°"]),
  pAnswer("y8-geo-rea-p13", "Two lines intersect. One angle is (4x)° and its vertically opposite is (x + 60)°. Find x.", "", "20", "4x = x + 60, so 3x = 60, x = 20.", 3, ["20°"]),
  pAnswer("y8-geo-rea-p14", "Parallel lines. Co-interior angles 4x° and (x + 30)°. Find x.", "", "30", "5x + 30 = 180, so 5x = 150, x = 30.", 3, ["30°"]),
  pAnswer("y8-geo-rea-p15", "A quadrilateral has angles 3x°, 3x°, 2x°, and 2x°. Find x.", "", "36", "10x = 360, so x = 36.", 3, ["36°"]),
  pAnswer("y8-geo-rea-p16", "An exterior angle of a triangle is 140° and the two non-adjacent interior angles are equal. Find each in degrees.", "", "70", "Each = 140 ÷ 2 = 70°.", 3, ["70°"]),
  // D4
  pAnswer("y8-geo-rea-p17", "A triangle has angles (2x + 5)°, (3x − 10)°, and 95°. Find x.", "", "18", "5x + 90 = 180, so 5x = 90, x = 18.", 4, ["18°"]),
  pAnswer("y8-geo-rea-p18", "Parallel lines. Co-interior angles (3x + 20)° and (2x + 10)°. Find x.", "", "30", "5x + 30 = 180, so 5x = 150, x = 30.", 4, ["30°"]),
  pAnswer("y8-geo-rea-p19", "Quadrilateral ABCD: angles 2x°, 3x°, 4x°, and 6x°. Find the largest angle in degrees.", "", "144", "15x = 360, x = 24. Largest = 6 × 24 = 144°.", 4, ["144°"]),
  pAnswer("y8-geo-rea-p20", "A triangle has angles (x + 15)°, (2x)°, and (3x − 15)°. Find the largest angle in degrees.", "", "75", "6x = 180, x = 30. Largest = 3(30) − 15 = 75°.", 4, ["75°"]),
  pAnswer("y8-geo-rea-p21", "Two lines intersect. One angle is (5x + 8)° and the adjacent angle on the straight line is (4x + 1)°. Find x.", "", "19", "9x + 9 = 180, so 9x = 171, x = 19.", 4, ["19°"]),
  pAnswer("y8-geo-rea-p22", "Parallel lines. Alternate angles (6x − 5)° = (4x + 25)°. Find the angle in degrees.", "", "85", "2x = 30, x = 15. Angle = 6(15) − 5 = 85°.", 4, ["85°"]),
  // D5
  pAnswer("y8-geo-rea-p23", "AB ∥ CD. A transversal makes an angle of 3x° with AB. The co-interior angle at CD is (2x + 40)°. Find x.", "", "28", "5x + 40 = 180, so 5x = 140, x = 28.", 5, ["28°"]),
  pAnswer("y8-geo-rea-p24", "A triangle's angles are in the ratio 3 : 4 : 5, and an exterior angle is taken at the largest interior angle. Find that exterior angle in degrees.", "", "105", "12k = 180, k = 15; largest interior = 75°; exterior = 180 − 75 = 105°.", 5, ["105°"]),
  pAnswer("y8-geo-rea-p25", "AB ∥ CD. ∠x and ∠y are co-interior, with ∠x exceeding ∠y by 50°. Find ∠x in degrees.", "", "115", "2y + 50 = 180, y = 65, so ∠x = 115°.", 5, ["115°"]),
  pAnswer("y8-geo-rea-p26", "In triangle ABC, ∠A = 2∠B and ∠C = ∠B + 30°. Find ∠B in degrees.", "", "37.5", "4b + 30 = 180, so 4b = 150, b = 37.5°.", 5, ["37.5°"]),
  pAnswer("y8-geo-rea-p27", "A pentagon has interior angles 100°, 110°, 120°, x°, and x°. Find x.", "", "105", "Pentagon sum = 540; 2x = 540 − 330 = 210, so x = 105°.", 5, ["105°"]),
  pAnswer("y8-geo-rea-p28", "Two lines intersect. One angle is (7x − 4)° and its vertically opposite angle is (5x + 20)°. Find that angle in degrees.", "", "80", "2x = 24, x = 12. Angle = 7(12) − 4 = 80°.", 5, ["80°"]),
];

geometricReasoning.multiPartPractice = [
  {
    id: "y8-geo-rea-mp1",
    prompt:
      "Two parallel lines AB and CD are cut by a transversal at points P (on AB) and Q (on CD). At P, the transversal makes an angle of 110° with AB on the upper-right. At Q, an unknown angle x lies in the co-interior position with that 110° angle. A separate triangle PQT has its third vertex T with ∠PTQ = 40°.",
    latex: "AB \\parallel CD",
    answer: "70",
    hint: "Use corresponding/co-interior angle rules, then the triangle angle sum.",
    explanation:
      "The corresponding angle at Q is 110°. The co-interior angle x = 180 − 110 = 70°. In triangle PQT, if two angles are 70° and 40°, the third is 180 − 70 − 40 = 70°.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the corresponding angle at Q (matching the 110° at P) in degrees.",
        latex: "",
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
        latex: "",
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
        latex: "",
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
  pAnswer("y8-geo-qprop-p1", "In a parallelogram, angle A = 80°. Find the opposite angle C in degrees.", "", "80", "Opposite angles of a parallelogram are equal: 80°.", 1, ["80°"]),
  pAnswer("y8-geo-qprop-p2", "A rhombus has a side of 7 cm. Find the length of each other side in cm.", "", "7", "All sides of a rhombus are equal: 7 cm.", 1, ["7 cm"]),
  pChoice("y8-geo-qprop-p3", "Which shape has all sides equal AND all angles 90°?", "D", ["Rectangle", "Rhombus", "Parallelogram", "Square"], "A square has both properties.", 1),
  pAnswer("y8-geo-qprop-p4", "In a rectangle, each interior angle is how many degrees?", "", "90", "All angles of a rectangle are 90°.", 1, ["90°"]),
  pAnswer("y8-geo-qprop-p5", "The diagonals of a rhombus meet at what angle, in degrees?", "", "90", "Rhombus diagonals bisect at right angles: 90°.", 1, ["90°"]),
  // D2
  pAnswer("y8-geo-qprop-p6", "In a parallelogram, one angle is 110°. Find its co-interior (adjacent) angle in degrees.", "", "70", "Adjacent angles are supplementary: 180 − 110 = 70°.", 2, ["70°"]),
  pAnswer("y8-geo-qprop-p7", "A rectangle has a diagonal of 15 cm. Find the other diagonal in cm.", "", "15", "Rectangle diagonals are equal: 15 cm.", 2, ["15 cm"]),
  pChoice("y8-geo-qprop-p8", "Which property is true of a rhombus but not every rectangle?", "B", ["Diagonals bisect each other", "Diagonals meet at 90°", "All angles 90°", "Opposite sides parallel"], "Rhombus diagonals are perpendicular; a rectangle's are not unless it's a square.", 2),
  pAnswer("y8-geo-qprop-p9", "A trapezium has one co-interior angle of 105° between its parallel sides. Find the other in degrees.", "", "75", "180 − 105 = 75°.", 2, ["75°"]),
  pAnswer("y8-geo-qprop-p10", "In a kite, the longer diagonal bisects a vertex angle into two parts of 35° each. Find the full vertex angle in degrees.", "", "70", "2 × 35 = 70°.", 2, ["70°"]),
  pChoice("y8-geo-qprop-p11", "A quadrilateral with exactly one pair of parallel sides is a:", "C", ["Parallelogram", "Rhombus", "Trapezium", "Square"], "A trapezium (trapezoid) has exactly one pair of parallel sides.", 2),
  // D3
  pAnswer("y8-geo-qprop-p12", "In rectangle KLMN, diagonal KM = 20 cm and the diagonals meet at O. Find OK in cm.", "", "10", "Diagonals bisect each other: OK = ½ × 20 = 10 cm.", 3, ["10 cm"]),
  pAnswer("y8-geo-qprop-p13", "In a rhombus, a diagonal bisects a 96° vertex angle. Find each half-angle in degrees.", "", "48", "96 ÷ 2 = 48°.", 3, ["48°"]),
  pAnswer("y8-geo-qprop-p14", "In parallelogram ABCD, ∠A = 65°. Find ∠B in degrees.", "", "115", "Adjacent angles are supplementary: 180 − 65 = 115°.", 3, ["115°"]),
  pChoice("y8-geo-qprop-p15", "A square is best described as a quadrilateral that is:", "A", ["Both a rectangle and a rhombus", "A rectangle but never a rhombus", "A trapezium only", "Never a parallelogram"], "A square has all the properties of both a rectangle and a rhombus.", 3),
  pAnswer("y8-geo-qprop-p16", "In a kite, one pair of opposite angles is equal. If those equal angles are each 100° and a third angle is 80°, find the fourth angle in degrees.", "", "80", "x = 360 − 280 = 80°.", 3, ["80°"]),
  pAnswer("y8-geo-qprop-p17", "Parallelogram angles 70°, 110°, 70°, and x°. Find x.", "", "110", "x = 360 − 250 = 110°.", 3, ["110°"]),
  // D4
  pAnswer("y8-geo-qprop-p18", "Parallelogram ABCD: ∠A = (2x + 30)° and ∠C = (3x)°. Find x.", "", "30", "Opposite angles equal: 2x + 30 = 3x, so x = 30.", 4, ["30°"]),
  pAnswer("y8-geo-qprop-p19", "Parallelogram ABCD: ∠A = (4x + 10)° and ∠B = (2x + 20)°. Find x.", "", "25", "Adjacent angles supplementary: 6x + 30 = 180, so 6x = 150, x = 25.", 4, ["25°"]),
  pAnswer("y8-geo-qprop-p20", "In a rhombus, a diagonal bisects vertex angle into two angles, and one such half-angle is (2x)° while the full vertex angle is 76°. Find x.", "", "19", "Full angle = 2 × (2x) = 76, so 4x = 76, x = 19.", 4, ["19°"]),
  pAnswer("y8-geo-qprop-p21", "Trapezium: one co-interior angle is (3x − 10)° and the other is (2x + 40)°. Find x.", "", "30", "5x + 30 = 180, so 5x = 150, x = 30.", 4, ["30°"]),
  pAnswer("y8-geo-qprop-p22", "Parallelogram ABCD: ∠A = (5x − 5)° and ∠C = (3x + 35)°. Find ∠A in degrees.", "", "95", "Opposite angles equal: 2x = 40, x = 20; ∠A = 5(20) − 5 = 95°.", 4, ["95°"]),
  pAnswer("y8-geo-qprop-p23", "In rhombus ABCD, ∠A = (2x)°. The diagonal from A splits it into two equal parts of 35° each. Find x.", "", "35", "Full ∠A = 2 × 35 = 70°, so 2x = 70, x = 35.", 4, ["35°"]),
  // D5
  pAnswer("y8-geo-qprop-p24", "In a rhombus, the diagonals are perpendicular. One diagonal makes a 28° angle with a side. Find the angle between that diagonal and the other diagonal, in degrees.", "", "90", "The diagonals of a rhombus always meet at 90°.", 5, ["90°"]),
  pAnswer("y8-geo-qprop-p25", "Parallelogram ABCD: the angles are in the ratio 2 : 3 : 2 : 3. Find the larger angle in degrees.", "", "108", "2k + 3k + 2k + 3k = 360, 10k = 360, k = 36; larger = 3 × 36 = 108°.", 5, ["108°"]),
  pAnswer("y8-geo-qprop-p26", "In rhombus ABCD, ∠A = 70°. The diagonal AC bisects ∠A. In triangle ABC, find ∠ACB in degrees, given ∠ABC = 110°.", "", "35", "Diagonal bisects ∠A → ∠BAC = 35°. ∠ACB = 180 − 35 − 110 = 35°.", 5, ["35°"]),
  pAnswer("y8-geo-qprop-p27", "A kite has two angles of 90° (where the unequal sides meet) and the other two angles in the ratio 2 : 1. Find the larger of those two angles in degrees.", "", "120", "180 + 3k = 360, 3k = 180, k = 60; larger = 2 × 60 = 120°.", 5, ["120°"]),
  pAnswer("y8-geo-qprop-p28", "In rectangle ABCD, the diagonals meet at O. Triangle AOB is isosceles with OA = OB, and ∠AOB = 50°. Find ∠OAB in degrees.", "", "65", "OA = OB so base angles equal: 2x = 130, x = 65°.", 5, ["65°"]),
];

quadrilateralProperties.multiPartPractice = [
  {
    id: "y8-geo-qprop-mp1",
    prompt:
      "ABCD is a parallelogram with ∠A = 108°. The diagonals AC and BD intersect at O. Recall that opposite angles are equal, adjacent angles are supplementary, and the diagonals bisect each other.",
    latex: "ABCD \\text{ parallelogram},\\; \\angle A = 108^\\circ",
    answer: "72",
    hint: "Opposite angles equal; adjacent angles supplementary; diagonals bisect each other.",
    explanation:
      "∠C = ∠A = 108° (opposite angles). ∠B = 180 − 108 = 72° (adjacent angles supplementary). If diagonal BD = 16 cm, then OB = ½ × 16 = 8 cm.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find ∠C in degrees.",
        latex: "",
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
        latex: "",
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
        latex: "",
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

for (const content of Object.values(lessons)) {
  const questions = [
    ...content.guidedPractice,
    ...content.independentPractice,
    ...content.masteryQuiz,
    ...(content.masteryQuizPool ?? []),
    ...(content.multiPartPractice ?? []),
  ];

  for (const question of questions) {
    const visual = geometryQuestionVisuals[question.id];
    if (!visual) continue;
    Object.assign(question, visual);
  }
}

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
