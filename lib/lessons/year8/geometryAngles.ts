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
      "37 + x = 90",
      "53",
      "Complementary angles sum to 90°. x = 90 − 37 = 53°.",
      ["53°"]
    ),
    answer(
      "y8-geo-ang-g3",
      "Two angles are supplementary. One angle is 145°. Find the other angle in degrees.",
      "145 + x = 180",
      "35",
      "Supplementary angles sum to 180°. x = 180 − 145 = 35°.",
      ["35°"]
    ),
    answer(
      "y8-geo-ang-g4",
      "Three angles meet at a point. Two of them are 95° and 130°. Find the third angle in degrees.",
      "95 + 130 + x = 360",
      "135",
      "Angles at a point sum to 360°. x = 360 − 95 − 130 = 135°.",
      ["135°"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-ang-i1",
      "Two lines intersect. One angle is 68°. Find the vertically opposite angle in degrees.",
      "\\text{vertically opposite to }68^\\circ",
      "68",
      "Vertically opposite angles are equal. The answer is 68°.",
      ["68°"]
    ),
    answer(
      "y8-geo-ang-i2",
      "Two angles are supplementary. One is 73°. Find the other angle in degrees.",
      "73 + x = 180",
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
      "65 + 90 + x = 180",
      "25",
      "65 + 90 = 155. x = 180 − 155 = 25°.",
      ["25°"]
    ),
    answer(
      "y8-geo-ang-i5",
      "Four angles meet at a point: 72°, 95°, 85°, and x°. Find x.",
      "72 + 95 + 85 + x = 360",
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
      "56 + x = 90",
      "34",
      "x = 90 − 56 = 34°.",
      ["34°"]
    ),
    answer(
      "y8-geo-ang-m2",
      "Two lines intersect. One angle is 127°. State the vertically opposite angle in degrees.",
      "\\text{vertically opposite to }127^\\circ",
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
      "110 + 115 + x = 360",
      "135",
      "110 + 115 = 225. x = 360 − 225 = 135°.",
      ["135°"]
    ),
    answer(
      "y8-geo-ang-m5",
      "The supplement of 27° is…",
      "27 + x = 180",
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
      "48 + 97 + x = 180",
      "35",
      "48 + 97 = 145. x = 180 − 145 = 35°.",
      ["35°"]
    ),
    answer(
      "y8-geo-ang-m8",
      "The complement of 19° is…",
      "19 + x = 90",
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
      "2x + 3x + 4x = 360",
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
      "\\text{corresponding angles (F): equal}",
      "65",
      "Corresponding angles are equal when lines are parallel. The angle is 65°.",
      ["65°"]
    ),
    answer(
      "y8-geo-par-g3",
      "Parallel lines cut by a transversal. An alternate angle at one line is 48°. Find the alternate angle at the other line in degrees.",
      "\\text{alternate angles (Z): equal}",
      "48",
      "Alternate angles are equal when lines are parallel. The angle is 48°.",
      ["48°"]
    ),
    answer(
      "y8-geo-par-g4",
      "Parallel lines cut by a transversal. One co-interior angle is 115°. Find the other co-interior angle in degrees.",
      "115 + x = 180",
      "65",
      "Co-interior angles sum to 180°. x = 180 − 115 = 65°.",
      ["65°"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-geo-par-i1",
      "Parallel lines. A corresponding angle is 73°. Find the other corresponding angle in degrees.",
      "\\text{corresponding angles (F): equal}",
      "73",
      "Corresponding angles are equal when lines are parallel. The angle is 73°.",
      ["73°"]
    ),
    answer(
      "y8-geo-par-i2",
      "Parallel lines. One co-interior angle is 54°. Find the other co-interior angle in degrees.",
      "54 + x = 180",
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
      "\\text{alternate angles (Z): equal}",
      "117",
      "Alternate angles are equal when lines are parallel. The angle is 117°.",
      ["117°"]
    ),
    answer(
      "y8-geo-par-i5",
      "Parallel lines cut by a transversal. Co-interior angles are (3x + 10)° and (2x + 20)°. Find x.",
      "(3x+10) + (2x+20) = 180",
      "30",
      "5x + 30 = 180, so 5x = 150, giving x = 30."
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
      "\\text{corresponding angles (F): equal}",
      "82",
      "Corresponding angles are equal when lines are parallel.",
      ["82°"]
    ),
    answer(
      "y8-geo-par-m2",
      "Parallel lines. An alternate angle is 35°. Find the other alternate angle in degrees.",
      "\\text{alternate angles (Z): equal}",
      "35",
      "Alternate angles are equal when lines are parallel.",
      ["35°"]
    ),
    answer(
      "y8-geo-par-m3",
      "Parallel lines. One co-interior angle is 142°. Find the other in degrees.",
      "142 + x = 180",
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
      "4x - 20 = 2x + 40",
      "30",
      "4x − 20 = 2x + 40, so 2x = 60, giving x = 30."
    ),
    answer(
      "y8-geo-par-m6",
      "Parallel lines. Alternate angles: (5x + 15)° and (3x + 35)°. Find x.",
      "5x + 15 = 3x + 35",
      "10",
      "5x + 15 = 3x + 35, so 2x = 20, giving x = 10."
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
      "67 + x = 180",
      "113",
      "x = 180 − 67 = 113°.",
      ["113°"]
    ),
    answer(
      "y8-geo-par-m9",
      "Parallel lines. Co-interior angles are x° and 2x°. Find x.",
      "x + 2x = 180",
      "60",
      "3x = 180, so x = 60.",
      ["60°"]
    ),
    answer(
      "y8-geo-par-m10",
      "Parallel lines. An angle at the first line is 131°. Find the alternate angle at the second line in degrees.",
      "\\text{alternate angles (Z): equal}",
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
  ],
  guidedPractice: [
    answer(
      "y8-geo-tri-g1",
      "A triangle has angles 65° and 72°. Find the third angle in degrees.",
      "65 + 72 + x = 180",
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
      "85 + 110 + 95 + x = 360",
      "70",
      "85 + 110 + 95 = 290. x = 360 − 290 = 70°.",
      ["70°"]
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
      "An isosceles triangle has two base angles each of 52°. Find the apex angle in degrees.",
      "52 + 52 + x = 180",
      "76",
      "52 + 52 = 104. x = 180 − 104 = 76°.",
      ["76°"]
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
      "A quadrilateral has three angles: 70°, 95°, and 115°. Find the fourth angle in degrees.",
      "70 + 95 + 115 + x = 360",
      "80",
      "70 + 95 + 115 = 280. x = 360 − 280 = 80°.",
      ["80°"]
    ),
    answer(
      "y8-geo-tri-i5",
      "A right-angled triangle has one acute angle of 37°. Find the other acute angle in degrees.",
      "90 + 37 + x = 180",
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
      "54 + 78 + x = 180",
      "48",
      "x = 180 − 54 − 78 = 48°.",
      ["48°"]
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
      "Quadrilateral angles: 100°, 85°, 75°, and x°. Find x.",
      "100 + 85 + 75 + x = 360",
      "100",
      "100 + 85 + 75 = 260. x = 360 − 260 = 100°.",
      ["100°"]
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
      "A right-angled triangle has one acute angle of 27°. Find the other acute angle in degrees.",
      "90 + 27 + x = 180",
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
      "x + 2x + 3x + 4x = 360",
      "36",
      "10x = 360, so x = 36.",
      ["36°"]
    ),
    answer(
      "y8-geo-tri-m9",
      "A triangle has two equal angles of 35°. Find the third angle in degrees.",
      "35 + 35 + x = 180",
      "110",
      "x = 180 − 35 − 35 = 110°.",
      ["110°"]
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
      "Any polygon with n sides can be divided into (n − 2) triangles by drawing diagonals from one vertex. Since each triangle contributes 180°, the interior angle sum is (n − 2) × 180°.",
      "For a regular polygon, all sides are equal and all interior angles are equal. Divide the angle sum by the number of sides to find each interior angle.",
      "The exterior angles of any convex polygon always sum to exactly 360°, regardless of the number of sides. For a regular polygon, each exterior angle is 360° ÷ n, and the interior and exterior angles at each vertex are supplementary.",
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
      "\\text{right angle + hypotenuse + one side}",
      "RHS",
      "RHS = Right angle, Hypotenuse, Side."
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
      "Three pairs of equal sides → SSS."
    ),
    answer(
      "y8-geo-con-i2",
      "Two right-angled triangles have equal hypotenuses and one other equal side. Name the congruence test.",
      "\\text{right angle + hypotenuse + one side}",
      "RHS",
      "RHS = Right angle, Hypotenuse, Side."
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
      "Two equal angles and a corresponding side → AAS."
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
      "Three equal sides → SSS."
    ),
    answer(
      "y8-geo-con-m2",
      "Two pairs of corresponding sides and the included angle are equal. Name the test.",
      "\\text{two sides + included angle}",
      "SAS",
      "Two sides and the included angle → SAS."
    ),
    answer(
      "y8-geo-con-m3",
      "Two pairs of corresponding angles and one pair of corresponding sides are equal. Name the test.",
      "\\text{two angles + corresponding side}",
      "AAS",
      "Two equal angles and a corresponding side → AAS."
    ),
    answer(
      "y8-geo-con-m4",
      "Both triangles have a right angle, and the hypotenuse and one other side are equal. Name the test.",
      "\\text{right angle + hypotenuse + side}",
      "RHS",
      "Right angle, Hypotenuse, Side → RHS."
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
      "In △ABC ≅ △PQR, angle B = 55° and angle C = 65°. Find angle P in degrees.",
      "\\angle A = 180 - 55 - 65 = 60^\\circ,\\quad \\angle P = \\angle A",
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
  ],
  guidedPractice: [
    answer(
      "y8-geo-rea-g1",
      "Parallel lines. Corresponding angles are (2x + 10)° and (4x − 30)°. Find x.",
      "2x + 10 = 4x - 30",
      "20",
      "2x + 10 = 4x − 30. So 40 = 2x, giving x = 20."
    ),
    answer(
      "y8-geo-rea-g2",
      "A triangle has angles 55°, 72°, and x°. Find x using the angle sum of a triangle.",
      "55 + 72 + x = 180",
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
      "115 + y = 180",
      "65",
      "Co-interior angles sum to 180°. y = 180 − 115 = 65°.",
      ["65°"]
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
      "Parallel lines. Co-interior angles are 3x° and (2x + 30)°. Find x.",
      "3x + (2x+30) = 180",
      "30",
      "5x + 30 = 180, so 5x = 150, giving x = 30."
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
      "(2x+10) + (x+20) + 90 = 180",
      "20",
      "3x + 120 = 180, so 3x = 60, giving x = 20."
    ),
    answer(
      "y8-geo-rea-i5",
      "Quadrilateral ABCD has angles 2x°, 3x°, 4x°, and x°. Find angle A (= 2x°) in degrees.",
      "2x + 3x + 4x + x = 360",
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
      "\\text{alternate angles (Z): equal}",
      "78",
      "Alternate angles are equal when lines are parallel.",
      ["78°"]
    ),
    answer(
      "y8-geo-rea-m2",
      "Triangle: angles are x°, (x + 30)°, and (x + 60)°. Find x.",
      "x + (x+30) + (x+60) = 180",
      "30",
      "3x + 90 = 180, so 3x = 90, giving x = 30."
    ),
    answer(
      "y8-geo-rea-m3",
      "Parallel lines. Corresponding angles: (3x + 15)° = (x + 55)°. Find x.",
      "3x + 15 = x + 55",
      "20",
      "3x + 15 = x + 55, so 2x = 40, giving x = 20."
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
      "In triangle ABC, angle A = 50° and angle B = 65°. Find angle C in degrees.",
      "50 + 65 + \\angle C = 180",
      "65",
      "Angle C = 180 − 50 − 65 = 65°.",
      ["65°"]
    ),
    answer(
      "y8-geo-rea-m7",
      "Two lines intersect. One angle is 5x° and the vertically opposite angle is (3x + 20)°. Find x.",
      "5x = 3x + 20",
      "10",
      "Vertically opposite angles are equal: 5x = 3x + 20, so 2x = 20, giving x = 10."
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
      "A triangle has one angle that is twice another. The third angle is 90°. Find the smallest angle in degrees.",
      "x + 2x + 90 = 180",
      "30",
      "3x + 90 = 180, so 3x = 90, giving x = 30°. The smallest angle is 30°.",
      ["30°"]
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "angle-relationships":              angleRelationships,
  "parallel-lines-transversals":      parallelLinesTransversals,
  "angles-triangles-quadrilaterals":  anglesTrianglesQuadrilaterals,
  "properties-of-polygons":           propertiesOfPolygons,
  "congruent-triangles":              congruentTriangles,
  "geometric-reasoning":              geometricReasoning,
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
