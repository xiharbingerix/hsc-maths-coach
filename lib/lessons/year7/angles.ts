import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = []
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
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Consider the key angle rule taught in this lesson before choosing.",
    explanation,
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
>;

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
      "An angle measures the amount of turn between two rays that meet at a point. We classify angles by their size: acute angles are between 0° and 90°, a right angle is exactly 90°, obtuse angles are between 90° and 180°, a straight angle is exactly 180°, reflex angles are between 180° and 360°, and a revolution is a full turn of 360°.",
      "Two angles are complementary when they add to 90°. Think of the corner of a square — if one angle is 35°, the other must be 55° to complete the right angle. Two angles are supplementary when they add to 180°. A straight line is a 180° angle, so any two angles that together make a straight line are supplementary.",
      "When two straight lines cross, they form two pairs of vertically opposite angles — the angles directly across from each other at the intersection. Vertically opposite angles are always equal. This is because each angle and its neighbour on the straight line are supplementary, so both pairs of opposite angles must be equal.",
      "All the angles around a single point always add up to 360°, because a full turn is 360°. If you know several angles at a point, subtract their total from 360° to find the missing one. The most common error is confusing supplementary (180°) with complementary (90°) — learn both words and their sums.",
    ],
    latexBlocks: [
      "\\text{Complementary: } \\angle A + \\angle B = 90°",
      "\\text{Supplementary: } \\angle A + \\angle B = 180°",
      "\\text{Vertically opposite angles are equal}",
      "\\text{Angles at a point: } \\angle A + \\angle B + \\angle C + \\cdots = 360°",
    ],
  },
  workedExamples: [
    {
      title: "Find a complementary angle",
      questionLatex:
        "\\text{Two angles are complementary. One angle is } 38°. \\text{ Find the other angle in degrees.}",
      steps: [
        {
          explanation:
            "Complementary angles sum to 90°, so subtract the known angle from 90°.",
          latex: "90 - 38 = 52",
        },
      ],
      finalAnswerLatex: "\\text{The other angle is } 52°.",
    },
    {
      title: "Find a supplementary angle",
      questionLatex:
        "\\text{Angles on a straight line. One angle is } 115°. \\text{ Find the other angle in degrees.}",
      steps: [
        {
          explanation:
            "Angles on a straight line are supplementary — they sum to 180°.",
          latex: "180 - 115 = 65",
        },
      ],
      finalAnswerLatex: "\\text{The other angle is } 65°.",
    },
    {
      title: "Find angles at a point using vertically opposite and revolution",
      questionLatex:
        "\\text{Two straight lines cross. One angle at the intersection is } 70°. \\text{ Find all four angles at the intersection.}",
      steps: [
        {
          explanation:
            "The angle directly opposite the 70° angle is vertically opposite, so it is also 70°.",
          latex: "\\text{Vertically opposite angle} = 70°",
        },
        {
          explanation:
            "Each remaining angle is supplementary to 70°, so subtract from 180°.",
          latex: "180 - 70 = 110",
        },
        {
          explanation:
            "The two remaining angles are vertically opposite each other, so both equal 110°. Check: 70 + 110 + 70 + 110 = 360.",
          latex: "70 + 110 + 70 + 110 = 360°",
        },
      ],
      finalAnswerLatex:
        "\\text{The four angles are } 70°,\\ 110°,\\ 70°,\\ 110°.",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ang-typ-g1",
      "An angle measures 145°. What type of angle is it?",
      "C",
      ["Acute", "Right", "Obtuse", "Reflex"],
      "Obtuse angles are between 90° and 180°. Since 145° is between 90° and 180°, it is obtuse."
    ),
    answer(
      "y7-ang-typ-g2",
      "Two angles are complementary. One angle is 54°. Find the other angle in degrees.",
      "\\angle A + 54° = 90°",
      "36",
      "Complementary angles sum to 90°. So the other angle = 90 - 54 = 36°.",
      ["36°"]
    ),
    answer(
      "y7-ang-typ-g3",
      "Two angles are supplementary. One angle is 73°. Find the other angle in degrees.",
      "\\angle A + 73° = 180°",
      "107",
      "Supplementary angles sum to 180°. So the other angle = 180 - 73 = 107°.",
      ["107°"]
    ),
    answer(
      "y7-ang-typ-g4",
      "Three angles meet at a point. Two of them are 120° and 95°. Find the third angle in degrees.",
      "120° + 95° + \\angle A = 360°",
      "145",
      "Angles at a point sum to 360°. The third angle = 360 - 120 - 95 = 145°.",
      ["145°"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-typ-i1",
      "Find the complement of a 29° angle. Give your answer in degrees.",
      "29° + \\angle A = 90°",
      "61",
      "Complementary angles sum to 90°. Complement = 90 - 29 = 61°.",
      ["61°"]
    ),
    answer(
      "y7-ang-typ-i2",
      "Find the supplement of a 48° angle. Give your answer in degrees.",
      "48° + \\angle A = 180°",
      "132",
      "Supplementary angles sum to 180°. Supplement = 180 - 48 = 132°.",
      ["132°"]
    ),
    answer(
      "y7-ang-typ-i3",
      "Two straight lines cross. One of the four angles at the intersection is 65°. What is the size in degrees of the angle that is vertically opposite to the 65° angle?",
      "\\text{Vertically opposite angles are equal}",
      "65",
      "Vertically opposite angles are equal, so the angle directly across is also 65°.",
      ["65°"]
    ),
    answer(
      "y7-ang-typ-i4",
      "Angles on a straight line include an angle of 47° and an unknown angle. Find the unknown angle in degrees.",
      "47° + \\angle A = 180°",
      "133",
      "Angles on a straight line sum to 180°. Unknown = 180 - 47 = 133°.",
      ["133°"]
    ),
    choice(
      "y7-ang-typ-i5",
      "Four angles meet at a point. Three of the angles are 90°, 75°, and 110°. What is the fourth angle?",
      "B",
      ["95°", "85°", "80°", "75°"],
      "Angles at a point sum to 360°. Fourth angle = 360 - 90 - 75 - 110 = 85°."
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
      ["73°"]
    ),
    answer(
      "y7-ang-typ-m3",
      "Find the supplement of 112°. Give your answer in degrees.",
      "112° + \\angle A = 180°",
      "68",
      "Supplement = 180 - 112 = 68°.",
      ["68°"]
    ),
    answer(
      "y7-ang-typ-m4",
      "Two straight lines intersect. One angle is 43°. Find the size in degrees of the angle adjacent to it on the straight line.",
      "43° + \\angle A = 180°",
      "137",
      "Adjacent angles on a straight line are supplementary. 180 - 43 = 137°.",
      ["137°"]
    ),
    answer(
      "y7-ang-typ-m5",
      "Two straight lines intersect. One angle formed is 78°. Find the size in degrees of the vertically opposite angle.",
      "\\text{Vertically opposite angles are equal}",
      "78",
      "Vertically opposite angles are equal. The opposite angle is also 78°.",
      ["78°"]
    ),
    answer(
      "y7-ang-typ-m6",
      "Five angles meet at a point. Four of them are 80°, 60°, 70°, and 90°. Find the fifth angle in degrees.",
      "80° + 60° + 70° + 90° + \\angle A = 360°",
      "60",
      "Total of known angles = 80 + 60 + 70 + 90 = 300°. Fifth angle = 360 - 300 = 60°.",
      ["60°"]
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
      ["230°"]
    ),
    answer(
      "y7-ang-typ-m9",
      "Two angles on a straight line are in the ratio 2 : 3. Find the size in degrees of the larger angle.",
      "2x + 3x = 180°",
      "108",
      "Let the angles be 2x and 3x. Then 5x = 180, so x = 36. The larger angle = 3 × 36 = 108°.",
      ["108°"]
    ),
    answer(
      "y7-ang-typ-m10",
      "Two intersecting lines form four angles. One angle is 55°. Find the sum in degrees of all four angles at the intersection.",
      "\\text{All angles at a point sum to } 360°",
      "360",
      "All angles around a point always sum to 360°, regardless of the individual angle sizes.",
      ["360°"]
    ),
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
      "Every triangle, regardless of its shape or size, has interior angles that add up to exactly 180°. You can test this by tearing off the three corners of any paper triangle and placing them side by side — they always form a straight line. This is the triangle angle sum property.",
      "To find a missing angle in a triangle, add the two known angles and subtract from 180°. For example, if a triangle has angles of 60° and 75°, the third angle = 180 - 60 - 75 = 45°. Always check: do all three angles add to 180°?",
      "An exterior angle of a triangle is formed by extending one side of the triangle beyond the vertex. The exterior angle equals the sum of the two interior angles that are not next to it — the two non-adjacent interior angles. This shortcut is faster than working out the interior angle first and then finding its supplement.",
      "Triangles are classified two ways. By angles: all three angles acute gives an acute triangle; one right angle gives a right triangle; one obtuse angle gives an obtuse triangle. By sides: all three sides equal is equilateral; two sides equal is isosceles; all sides different is scalene. An equilateral triangle always has three angles of 60°.",
    ],
    latexBlocks: [
      "\\angle A + \\angle B + \\angle C = 180°",
      "\\text{Exterior angle} = \\angle A + \\angle B \\quad (\\text{non-adjacent interior angles})",
      "\\text{Equilateral triangle: each angle} = 60°",
      "\\text{Isosceles triangle: base angles are equal}",
    ],
  },
  workedExamples: [
    {
      title: "Find a missing angle using the triangle angle sum",
      questionLatex:
        "\\text{A triangle has angles of } 48°\\text{ and }67°.\\text{ Find the third angle in degrees.}",
      steps: [
        {
          explanation: "The three angles of a triangle sum to 180°.",
          latex: "\\angle A + \\angle B + \\angle C = 180°",
        },
        {
          explanation: "Substitute the two known angles and solve for the third.",
          latex: "48 + 67 + \\angle C = 180",
        },
        {
          explanation: "Add the known angles, then subtract from 180°.",
          latex: "\\angle C = 180 - 48 - 67 = 65",
        },
      ],
      finalAnswerLatex: "\\text{The third angle is } 65°.",
    },
    {
      title: "Use the exterior angle theorem",
      questionLatex:
        "\\text{A triangle has two interior angles of } 50°\\text{ and }70°.\\text{ Find the exterior angle at the third vertex in degrees.}",
      steps: [
        {
          explanation:
            "The exterior angle of a triangle equals the sum of the two non-adjacent interior angles.",
          latex: "\\text{Exterior angle} = 50 + 70",
        },
        {
          explanation: "Add the two non-adjacent angles.",
          latex: "\\text{Exterior angle} = 120°",
        },
      ],
      finalAnswerLatex: "\\text{The exterior angle is } 120°.",
    },
    {
      title: "Find the base angles of an isosceles triangle",
      questionLatex:
        "\\text{An isosceles triangle has an apex angle of } 40°.\\text{ Find each base angle in degrees.}",
      steps: [
        {
          explanation:
            "The base angles of an isosceles triangle are equal. Let each base angle be x.",
          latex: "x + x + 40 = 180",
        },
        {
          explanation: "Simplify and solve.",
          latex: "2x = 140,\\quad x = 70",
        },
      ],
      finalAnswerLatex: "\\text{Each base angle is } 70°.",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ang-tri-g1",
      "A triangle has angles of 90°, 45°, and 45°. What type of triangle is it by angles?",
      "B",
      ["Acute", "Right", "Obtuse", "Equilateral"],
      "A triangle with one 90° angle is a right triangle."
    ),
    answer(
      "y7-ang-tri-g2",
      "A triangle has two angles of 65° and 80°. Find the third angle in degrees.",
      "65° + 80° + \\angle C = 180°",
      "35",
      "Third angle = 180 - 65 - 80 = 35°.",
      ["35°"]
    ),
    answer(
      "y7-ang-tri-g3",
      "Two interior angles of a triangle are 55° and 75°. Use the exterior angle theorem to find the exterior angle at the third vertex. Give your answer in degrees.",
      "\\text{Exterior angle} = 55° + 75°",
      "130",
      "Exterior angle = 55 + 75 = 130°.",
      ["130°"]
    ),
    answer(
      "y7-ang-tri-g4",
      "An isosceles triangle has a base angle of 52°. Find the apex angle in degrees.",
      "52° + 52° + \\angle A = 180°",
      "76",
      "Both base angles are 52°. Apex angle = 180 - 52 - 52 = 76°.",
      ["76°"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-tri-i1",
      "A triangle has angles of 37° and 94°. Find the third angle in degrees.",
      "37° + 94° + \\angle C = 180°",
      "49",
      "Third angle = 180 - 37 - 94 = 49°.",
      ["49°"]
    ),
    answer(
      "y7-ang-tri-i2",
      "A right triangle has one acute angle of 34°. Find the other acute angle in degrees.",
      "90° + 34° + \\angle C = 180°",
      "56",
      "The right angle accounts for 90°. Third angle = 180 - 90 - 34 = 56°.",
      ["56°"]
    ),
    answer(
      "y7-ang-tri-i3",
      "Two interior angles of a triangle are 42° and 63°. Use the exterior angle theorem to find the exterior angle at the third vertex. Give your answer in degrees.",
      "\\text{Exterior angle} = 42° + 63°",
      "105",
      "Exterior angle = 42 + 63 = 105°.",
      ["105°"]
    ),
    answer(
      "y7-ang-tri-i4",
      "An equilateral triangle has all three sides equal. What is the size in degrees of each interior angle?",
      "3 \\times \\angle A = 180°",
      "60",
      "All three angles are equal and sum to 180°. Each angle = 180 ÷ 3 = 60°.",
      ["60°"]
    ),
    choice(
      "y7-ang-tri-i5",
      "A triangle has angles of 120°, 30°, and 30°. How should it be classified by angles?",
      "D",
      ["Acute", "Right", "Equilateral", "Obtuse"],
      "One angle (120°) is greater than 90°, so the triangle is obtuse."
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
      ["50°"]
    ),
    answer(
      "y7-ang-tri-m2",
      "A right triangle has one acute angle of 27°. Find the other acute angle in degrees.",
      "90° + 27° + \\angle C = 180°",
      "63",
      "Third angle = 180 - 90 - 27 = 63°.",
      ["63°"]
    ),
    choice(
      "y7-ang-tri-m3",
      "The exterior angle of a triangle is 115°. One of the non-adjacent interior angles is 60°. What is the other non-adjacent interior angle?",
      "B",
      ["125°", "55°", "65°", "50°"],
      "Exterior angle = sum of two non-adjacent interior angles. So the other angle = 115 - 60 = 55°."
    ),
    answer(
      "y7-ang-tri-m4",
      "An isosceles triangle has an apex angle of 110°. Find the size in degrees of each base angle.",
      "110° + 2x = 180°",
      "35",
      "Each base angle = (180 - 110) ÷ 2 = 70 ÷ 2 = 35°.",
      ["35°"]
    ),
    answer(
      "y7-ang-tri-m5",
      "Two interior angles of a triangle are 48° and 66°. Find the exterior angle at the third vertex in degrees.",
      "\\text{Exterior angle} = 48° + 66°",
      "114",
      "Exterior angle = 48 + 66 = 114°.",
      ["114°"]
    ),
    answer(
      "y7-ang-tri-m6",
      "A triangle has angles in the ratio 1 : 2 : 3. Find the size in degrees of the largest angle.",
      "x + 2x + 3x = 180°",
      "90",
      "Let the angles be x, 2x, 3x. Then 6x = 180, so x = 30. Largest angle = 3 × 30 = 90°.",
      ["90°"]
    ),
    choice(
      "y7-ang-tri-m7",
      "A triangle has angles of 55°, 65°, and 60°. How is it classified by angles?",
      "A",
      ["Acute", "Right", "Obtuse", "Isosceles"],
      "All three angles are less than 90°, so the triangle is acute. (Isosceles is a classification by sides, not angles.)"
    ),
    answer(
      "y7-ang-tri-m8",
      "An isosceles triangle has two equal sides. The angle between the two equal sides (the apex) is 96°. Find each base angle in degrees.",
      "96° + 2x = 180°",
      "42",
      "Each base angle = (180 - 96) ÷ 2 = 84 ÷ 2 = 42°.",
      ["42°"]
    ),
    answer(
      "y7-ang-tri-m9",
      "In a triangle, the exterior angle at one vertex is 128°. The two non-adjacent interior angles are equal. Find the size in degrees of each of those two interior angles.",
      "2x = 128°",
      "64",
      "Each non-adjacent interior angle = 128 ÷ 2 = 64°.",
      ["64°"]
    ),
    answer(
      "y7-ang-tri-m10",
      "The three angles of a triangle are (x + 10)°, (2x)°, and (x - 6)°. Find the value of x.",
      "(x+10) + 2x + (x-6) = 180",
      "44",
      "4x + 4 = 180, so 4x = 176 and x = 44.",
      ["44"]
    ),
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
      "Any quadrilateral — four-sided shape — has interior angles that add up to 360°. You can see why by drawing a diagonal: it splits the quadrilateral into two triangles, each with 180°, giving 2 × 180° = 360° in total. To find a missing angle, add the three known angles and subtract from 360°.",
      "Special quadrilaterals have extra angle properties beyond the 360° sum. In a rectangle or square, every interior angle is exactly 90°. In a parallelogram (and in a rhombus, which is a parallelogram with equal sides), opposite angles are equal to each other. The two angles on the same side — called co-interior angles — sum to 180° because they lie between the parallel sides.",
      "A trapezoid has exactly one pair of parallel sides. The two angles on the same parallel side (co-interior angles) add up to 180°. This is the same co-interior angle rule you will see in the parallel lines lesson, applied here to the parallel sides of the trapezoid.",
      "The most common error is using 180° instead of 360° for the angle sum of a quadrilateral. Always start by writing 'angle sum = 360°' before you calculate, so you don't mix up the rule for triangles with the rule for quadrilaterals.",
    ],
    latexBlocks: [
      "\\angle A + \\angle B + \\angle C + \\angle D = 360°",
      "\\text{Rectangle / square: all angles} = 90°",
      "\\text{Parallelogram / rhombus: opposite angles equal; co-interior angles supplementary}",
      "\\text{Trapezoid: co-interior angles} = 180°",
    ],
  },
  workedExamples: [
    {
      title: "Find a missing angle in a quadrilateral",
      questionLatex:
        "\\text{A quadrilateral has angles of } 85°,\\, 110°,\\text{ and }95°.\\text{ Find the fourth angle in degrees.}",
      steps: [
        {
          explanation: "The four angles of any quadrilateral sum to 360°.",
          latex: "85 + 110 + 95 + \\angle D = 360",
        },
        {
          explanation: "Add the three known angles.",
          latex: "290 + \\angle D = 360",
        },
        {
          explanation: "Subtract from 360°.",
          latex: "\\angle D = 360 - 290 = 70",
        },
      ],
      finalAnswerLatex: "\\text{The fourth angle is } 70°.",
    },
    {
      title: "Use parallelogram angle properties",
      questionLatex:
        "\\text{A parallelogram has one angle of } 68°.\\text{ Find all four interior angles.}",
      steps: [
        {
          explanation:
            "In a parallelogram, opposite angles are equal, so the angle opposite 68° is also 68°.",
          latex: "\\text{Opposite angle} = 68°",
        },
        {
          explanation:
            "Co-interior angles (same side) are supplementary, so the adjacent angle = 180 - 68.",
          latex: "180 - 68 = 112°",
        },
        {
          explanation: "The remaining angle is opposite 112°, so it is also 112°. Check: 68 + 112 + 68 + 112 = 360.",
          latex: "68 + 112 + 68 + 112 = 360°",
        },
      ],
      finalAnswerLatex:
        "\\text{The four angles are } 68°,\\, 112°,\\, 68°,\\, 112°.",
    },
    {
      title: "Find an angle in a trapezoid",
      questionLatex:
        "\\text{A trapezoid has one pair of parallel sides. One angle adjacent to the parallel side is } 74°.\\text{ Find the co-interior angle on the same side in degrees.}",
      steps: [
        {
          explanation:
            "Co-interior angles between the parallel sides of a trapezoid are supplementary.",
          latex: "74° + \\angle B = 180°",
        },
        {
          explanation: "Subtract 74° from 180°.",
          latex: "\\angle B = 180 - 74 = 106°",
        },
      ],
      finalAnswerLatex: "\\text{The co-interior angle is } 106°.",
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
      ["75°"]
    ),
    answer(
      "y7-ang-qdr-g3",
      "A parallelogram has one angle of 54°. Find the size in degrees of the angle adjacent to it (co-interior angle).",
      "54° + \\angle B = 180°",
      "126",
      "Co-interior angles in a parallelogram are supplementary. Adjacent angle = 180 - 54 = 126°.",
      ["126°"]
    ),
    answer(
      "y7-ang-qdr-g4",
      "A trapezoid has a co-interior angle of 118° on one side of its parallel sides. Find the other co-interior angle on the same side in degrees.",
      "118° + \\angle B = 180°",
      "62",
      "Co-interior angles in a trapezoid sum to 180°. Other angle = 180 - 118 = 62°.",
      ["62°"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-qdr-i1",
      "A quadrilateral has angles of 75°, 105°, and 88°. Find the fourth angle in degrees.",
      "75° + 105° + 88° + \\angle D = 360°",
      "92",
      "Fourth angle = 360 - 75 - 105 - 88 = 92°.",
      ["92°"]
    ),
    answer(
      "y7-ang-qdr-i2",
      "A parallelogram has one angle of 73°. What is the size in degrees of the angle opposite to it?",
      "\\text{Opposite angles in a parallelogram are equal}",
      "73",
      "Opposite angles in a parallelogram are equal, so the opposite angle is also 73°.",
      ["73°"]
    ),
    answer(
      "y7-ang-qdr-i3",
      "A rectangle has all right angles. One angle in a quadrilateral is 90°, 90°, and 90°. Find the fourth angle in degrees.",
      "90° + 90° + 90° + \\angle D = 360°",
      "90",
      "Fourth angle = 360 - 90 - 90 - 90 = 90°. All angles in a rectangle are 90°.",
      ["90°"]
    ),
    answer(
      "y7-ang-qdr-i4",
      "A quadrilateral has angles in the ratio 1 : 2 : 2 : 3. Find the size in degrees of the largest angle.",
      "x + 2x + 2x + 3x = 360°",
      "135",
      "8x = 360, so x = 45. Largest angle = 3 × 45 = 135°.",
      ["135°"]
    ),
    choice(
      "y7-ang-qdr-i5",
      "In a rhombus, one angle is 66°. What are the sizes of all four interior angles?",
      "A",
      ["66°, 114°, 66°, 114°", "66°, 66°, 66°, 66°", "66°, 90°, 66°, 138°", "66°, 114°, 114°, 66°"],
      "A rhombus is a parallelogram: opposite angles are equal (66° and 66°) and co-interior angles sum to 180° (114° and 114°). Check: 66 + 114 + 66 + 114 = 360."
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
      ["85°"]
    ),
    choice(
      "y7-ang-qdr-m2",
      "A parallelogram has an angle of 112°. Which set of four angles is correct for this parallelogram?",
      "B",
      ["112°, 112°, 68°, 68°", "112°, 68°, 112°, 68°", "112°, 112°, 112°, 24°", "112°, 90°, 68°, 90°"],
      "Opposite angles are equal: 112° and 112°. Co-interior angles sum to 180°: 180 - 112 = 68°. Order: 112, 68, 112, 68."
    ),
    answer(
      "y7-ang-qdr-m3",
      "A trapezoid has co-interior angles of x and (x + 30)° on one pair of parallel sides. Find x in degrees.",
      "x + (x + 30) = 180°",
      "75",
      "2x + 30 = 180, so 2x = 150 and x = 75°.",
      ["75°"]
    ),
    answer(
      "y7-ang-qdr-m4",
      "A rhombus has one angle of 82°. Find the size in degrees of one of the co-interior angles (the angles on the same side as the 82° angle, between the parallel sides).",
      "82° + \\angle B = 180°",
      "98",
      "In a rhombus, co-interior angles are supplementary. The co-interior angle = 180 - 82 = 98°. The four angles of this rhombus are 82°, 98°, 82°, 98°.",
      ["98°"]
    ),
    answer(
      "y7-ang-qdr-m5",
      "A quadrilateral has four equal angles. Find the size in degrees of each angle.",
      "4 \\times \\angle A = 360°",
      "90",
      "Each angle = 360 ÷ 4 = 90°. A quadrilateral with four equal angles is a rectangle or square.",
      ["90°"]
    ),
    answer(
      "y7-ang-qdr-m6",
      "The angles of a quadrilateral are (2x)°, (x + 5)°, (3x - 5)°, and (2x)°. Find x.",
      "2x + (x+5) + (3x-5) + 2x = 360",
      "45",
      "Collect terms: 2x + x + 5 + 3x - 5 + 2x = 8x. So 8x = 360 and x = 45.",
      ["45"]
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
      ["95°"]
    ),
    answer(
      "y7-ang-qdr-m9",
      "A parallelogram has angles of (3x + 5)° and (x + 15)° as co-interior angles. Find x.",
      "(3x+5) + (x+15) = 180°",
      "40",
      "4x + 20 = 180, so 4x = 160 and x = 40.",
      ["40"]
    ),
    answer(
      "y7-ang-qdr-m10",
      "A quadrilateral has angles of 68°, 112°, 68°, and 112°. What type of quadrilateral could this be? State the angle sum to verify it is a valid quadrilateral.",
      "68° + 112° + 68° + 112° = 360°",
      "360",
      "68 + 112 + 68 + 112 = 360°. The angle pattern (opposite equal, co-interior supplementary) describes a parallelogram. The angle sum is 360°.",
      ["360°"]
    ),
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
      "When a straight line (called a transversal) crosses two parallel lines, it creates eight angles — four at each intersection. These angles have special relationships that hold only because the lines are parallel. Learning to spot the shapes these angles make is the key to using the rules quickly.",
      "Corresponding angles sit in matching positions at each intersection — one above the top parallel line, and one above the bottom parallel line, both on the same side of the transversal. They make an F-shape (or a backwards F). When the lines are parallel, corresponding angles are equal.",
      "Alternate angles sit between the two parallel lines, but on opposite sides of the transversal. They make a Z-shape (or a backwards Z, also called an N). When the lines are parallel, alternate angles are equal.",
      "Co-interior angles (also called same-side interior or C-angles) sit between the two parallel lines, on the same side of the transversal. They make a C-shape. When the lines are parallel, co-interior angles are supplementary — they sum to 180°. This is the one rule where the angles add up rather than being equal.",
    ],
    latexBlocks: [
      "\\text{Corresponding angles (F-shape): equal when lines are parallel}",
      "\\text{Alternate angles (Z-shape): equal when lines are parallel}",
      "\\text{Co-interior angles (C-shape): sum to } 180° \\text{ when lines are parallel}",
      "\\text{To prove lines are parallel: show corresponding or alternate angles are equal, or co-interior angles sum to } 180°",
    ],
  },
  workedExamples: [
    {
      title: "Find an angle using corresponding angles",
      questionLatex:
        "\\text{A transversal crosses two parallel lines. One angle is } 65°.\\text{ The angle in the corresponding position at the other intersection is unknown. Find it in degrees.}",
      steps: [
        {
          explanation:
            "Corresponding angles (F-shape) are equal when lines are parallel.",
          latex: "\\text{Corresponding angle} = 65°",
        },
      ],
      finalAnswerLatex: "\\text{The corresponding angle is } 65°.",
    },
    {
      title: "Find an angle using co-interior angles",
      questionLatex:
        "\\text{A transversal crosses two parallel lines. One co-interior angle is } 112°.\\text{ Find the other co-interior angle in degrees.}",
      steps: [
        {
          explanation:
            "Co-interior angles (C-shape) sum to 180° when lines are parallel.",
          latex: "112° + \\angle B = 180°",
        },
        {
          explanation: "Subtract to find the unknown angle.",
          latex: "\\angle B = 180 - 112 = 68°",
        },
      ],
      finalAnswerLatex: "\\text{The co-interior angle is } 68°.",
    },
    {
      title: "Determine whether two lines are parallel",
      questionLatex:
        "\\text{Two lines are cut by a transversal. The alternate angles formed are } 74°\\text{ and }74°.\\text{ Are the two lines parallel? Explain.}",
      steps: [
        {
          explanation:
            "If the lines were parallel, alternate angles would be equal.",
          latex: "\\text{Alternate angles: } 74° = 74°",
        },
        {
          explanation:
            "Since the alternate angles are equal, the two lines must be parallel.",
          latex: "\\therefore \\text{ the lines are parallel}",
        },
      ],
      finalAnswerLatex:
        "\\text{Yes, the lines are parallel — alternate angles are equal.}",
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
      ["58°"]
    ),
    answer(
      "y7-ang-par-g3",
      "A transversal crosses two parallel lines. One alternate angle is 43°. Find the other alternate angle in degrees.",
      "\\text{Alternate angles are equal}",
      "43",
      "Alternate angles (Z-shape) are equal when lines are parallel. The alternate angle is also 43°.",
      ["43°"]
    ),
    answer(
      "y7-ang-par-g4",
      "A transversal crosses two parallel lines. One co-interior angle is 67°. Find the other co-interior angle in degrees.",
      "67° + \\angle B = 180°",
      "113",
      "Co-interior angles (C-shape) sum to 180°. Other angle = 180 - 67 = 113°.",
      ["113°"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-par-i1",
      "A transversal crosses two parallel lines. One angle is 119°. Find the corresponding angle in degrees.",
      "\\text{Corresponding angles are equal}",
      "119",
      "Corresponding angles (F-shape) are equal. The corresponding angle is also 119°.",
      ["119°"]
    ),
    answer(
      "y7-ang-par-i2",
      "A transversal crosses two parallel lines. One co-interior angle is 134°. Find the other co-interior angle in degrees.",
      "134° + \\angle B = 180°",
      "46",
      "Co-interior angles sum to 180°. Other angle = 180 - 134 = 46°.",
      ["46°"]
    ),
    answer(
      "y7-ang-par-i3",
      "A transversal crosses two parallel lines. An alternate angle to a 77° angle is unknown. Find it in degrees.",
      "\\text{Alternate angles are equal}",
      "77",
      "Alternate angles (Z-shape) are equal when lines are parallel. The alternate angle is 77°.",
      ["77°"]
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
      "Co-interior angles sum to 95 + 85 = 180°. Since they sum to 180°, the lines are parallel."
    ),
    answer(
      "y7-ang-par-i5",
      "A transversal crosses two parallel lines. One angle is 52°. Find the size in degrees of the co-interior angle on the same side.",
      "52° + \\angle B = 180°",
      "128",
      "Co-interior angles sum to 180°. The co-interior angle = 180 - 52 = 128°.",
      ["128°"]
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
      ["81°"]
    ),
    answer(
      "y7-ang-par-m3",
      "A transversal crosses two parallel lines. One co-interior angle is 103°. Find the other co-interior angle in degrees.",
      "103° + \\angle B = 180°",
      "77",
      "Co-interior angles sum to 180°. Other angle = 180 - 103 = 77°.",
      ["77°"]
    ),
    answer(
      "y7-ang-par-m4",
      "A transversal crosses two parallel lines. A corresponding angle to a 126° angle is unknown. Find it in degrees.",
      "\\text{Corresponding angles are equal}",
      "126",
      "Corresponding angles are equal when lines are parallel. The corresponding angle is also 126°.",
      ["126°"]
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
      "If the lines were parallel, alternate angles would be equal. Since 68° ≠ 71°, the lines are not parallel."
    ),
    answer(
      "y7-ang-par-m6",
      "A transversal crosses two parallel lines. One angle at the top intersection is 55°. Another angle at the bottom intersection is vertically opposite to the co-interior partner of the 55° angle. Find this angle in degrees.",
      "\\text{Co-interior of }55° = 125°;\\text{ vertically opposite} = 125°",
      "125",
      "Co-interior of 55° = 180 - 55 = 125°. The angle vertically opposite to 125° is also 125°.",
      ["125°"]
    ),
    answer(
      "y7-ang-par-m7",
      "A transversal crosses two parallel lines. An angle at one intersection is (3x + 12)°. The corresponding angle at the other intersection is (5x - 8)°. Find x.",
      "3x + 12 = 5x - 8",
      "10",
      "Corresponding angles are equal: 3x + 12 = 5x - 8. So 20 = 2x and x = 10.",
      ["10"]
    ),
    answer(
      "y7-ang-par-m8",
      "A transversal crosses two parallel lines. Co-interior angles are (2x + 30)° and (x + 15)°. Find x.",
      "(2x+30) + (x+15) = 180°",
      "45",
      "3x + 45 = 180, so 3x = 135 and x = 45.",
      ["45"]
    ),
    choice(
      "y7-ang-par-m9",
      "A transversal crosses two parallel lines. One angle is 70°. Which of the following is true of the co-interior angle on the same side?",
      "D",
      ["It is 70° (equal to the first angle).", "It is 20° (complement of 70°).", "It is 290° (reflex angle).", "It is 110° (supplementary to 70°)."],
      "Co-interior angles sum to 180°. The co-interior angle = 180 - 70 = 110°."
    ),
    answer(
      "y7-ang-par-m10",
      "A transversal crosses two parallel lines. At one intersection, an angle of 48° is formed. Find the size in degrees of the angle that is alternate to the supplement of 48°.",
      "\\text{Supplement of }48° = 132°;\\text{ alternate to }132° = 132°",
      "132",
      "The supplement of 48° = 180 - 48 = 132°. The alternate angle to 132° is also 132° (alternate angles are equal on parallel lines).",
      ["132°"]
    ),
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
      "Many geometry problems require you to chain two or more angle rules together. The skill is not knowing more rules — it is deciding which rule to apply first. Start by looking for any angles you can find directly from one rule, then use those new angles as inputs to the next rule.",
      "When you write a geometric reason, state the rule and the condition. Do not just write '65° because of parallel lines' — write '65° (alternate angles, AB ∥ CD)'. Naming both the rule and the parallel lines (or the triangle) makes your reasoning clear and earns full marks in an exam.",
      "A common diagram type combines a pair of parallel lines with a triangle. A vertex of the triangle sits on one parallel line, and the opposite side lies along the other. The triangle's base angles connect to the parallel-line angle rules: the base angles of the triangle are alternate angles to angles formed at the parallel lines.",
      "Work through the diagram step by step. Find any angle you can from the given information, label it, then look again for what is now possible. Do not try to jump to the final answer in one step — each intermediate angle is a stepping stone.",
    ],
    latexBlocks: [
      "\\text{State reason: e.g. } \\angle ABC = 70°\\text{ (alternate angles, }PQ \\parallel RS\\text{)}",
      "\\text{Triangle angle sum: } \\angle A + \\angle B + \\angle C = 180°",
      "\\text{Co-interior angles: } \\angle A + \\angle B = 180°\\text{ (}PQ \\parallel RS\\text{)}",
      "\\text{Vertically opposite: } \\angle A = \\angle B",
    ],
  },
  workedExamples: [
    {
      title: "Find an angle using parallel lines and a triangle",
      questionLatex:
        "\\text{Two parallel lines are cut by a transversal. A triangle is formed with one vertex on each parallel line. The angle at the top vertex (between the transversal and the top parallel line) is }50°.\\text{ The angle at the bottom vertex (between the transversal and the bottom parallel line, on the other side) is }70°.\\text{ Find the angle at the third vertex of the triangle in degrees.}",
      steps: [
        {
          explanation:
            "The 50° angle at the top vertex is an interior angle of the triangle (alternate angle with the top parallel line, using Z-shape reasoning).",
          latex: "\\angle \\text{top} = 50°\\text{ (given interior angle)}",
        },
        {
          explanation:
            "The 70° angle at the bottom vertex is an interior angle of the triangle.",
          latex: "\\angle \\text{bottom} = 70°\\text{ (given interior angle)}",
        },
        {
          explanation: "Use the triangle angle sum to find the third angle.",
          latex: "\\angle \\text{third} = 180 - 50 - 70 = 60°",
        },
      ],
      finalAnswerLatex: "\\text{The third angle of the triangle is } 60°.",
    },
    {
      title: "Multi-step: parallel lines and vertically opposite angles",
      questionLatex:
        "\\text{Two parallel lines are cut by a transversal. At the top intersection, one angle is }118°.\\text{ At the bottom intersection, the co-interior angle is unknown. Find the co-interior angle, then find the vertically opposite angle to it, in degrees.}",
      steps: [
        {
          explanation:
            "Co-interior angles (C-shape) sum to 180° when lines are parallel.",
          latex: "118° + \\angle B = 180°,\\quad \\angle B = 62°",
        },
        {
          explanation:
            "The vertically opposite angle to the co-interior angle is equal to it.",
          latex: "\\text{Vertically opposite} = 62°",
        },
      ],
      finalAnswerLatex:
        "\\text{The co-interior angle is }62°\\text{ and the vertically opposite angle is }62°.",
    },
    {
      title: "Find angles in a diagram with parallel lines and a triangle",
      questionLatex:
        "\\text{Triangle }ABC\\text{ has vertex }A\\text{ on one parallel line and side }BC\\text{ on the other parallel line. The angle at }A\\text{ (apex) is }80°.\\text{ The base angle at }B\\text{ is equal to the angle formed between the transversal and the bottom parallel line (alternate angle). The base angles are equal. Find each base angle in degrees.}",
      steps: [
        {
          explanation:
            "The base angles of the triangle are equal (isosceles triangle) and sum with the apex to give 180°.",
          latex: "80° + 2x = 180°",
        },
        {
          explanation: "Solve for each base angle.",
          latex: "2x = 100°,\\quad x = 50°",
        },
        {
          explanation:
            "Each base angle is 50°, which also equals the alternate angle at the bottom parallel line — confirming the parallel lines.",
          latex: "\\text{Alternate angle at bottom line} = 50°",
        },
      ],
      finalAnswerLatex: "\\text{Each base angle of the triangle is } 50°.",
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
      ["50°"]
    ),
    answer(
      "y7-ang-prb-g3",
      "Two parallel lines are cut by a transversal. At the top intersection, the angle between the transversal and the top line is 48°. The alternate angle at the bottom intersection is one interior angle of a triangle. The triangle also has an interior angle of 62°. Find the third angle of that triangle in degrees.",
      "48° + 62° + \\angle C = 180°",
      "70",
      "Alternate angles are equal, so the interior angle of the triangle at the bottom intersection = 48°. Triangle angle sum: 48 + 62 + unknown = 180. Unknown = 180 - 48 - 62 = 70°.",
      ["70°"]
    ),
    answer(
      "y7-ang-prb-g4",
      "An exterior angle of a triangle is 114°. The two non-adjacent interior angles are equal. Find each non-adjacent interior angle in degrees.",
      "2x = 114°",
      "57",
      "The exterior angle equals the sum of the two non-adjacent interior angles. Each = 114 ÷ 2 = 57°.",
      ["57°"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-ang-prb-i1",
      "Two parallel lines are cut by a transversal. An angle of 72° is formed at the top intersection. A triangle has this transversal as one side, with interior angles of 72° (alternate angle at bottom), 55°, and an unknown angle. Find the unknown angle of the triangle in degrees.",
      "72° + 55° + \\angle C = 180°",
      "53",
      "Triangle angle sum: 72 + 55 + unknown = 180. Unknown = 180 - 72 - 55 = 53°.",
      ["53°"]
    ),
    answer(
      "y7-ang-prb-i2",
      "Two parallel lines are cut by a transversal. One co-interior angle is 125°. A separate triangle shares the other co-interior angle as one of its interior angles. The triangle also has an angle of 32°. Find the third angle of the triangle in degrees.",
      "(180 - 125)° + 32° + \\angle C = 180°",
      "93",
      "Other co-interior angle = 180 - 125 = 55°. Triangle: 55 + 32 + unknown = 180. Unknown = 180 - 55 - 32 = 93°.",
      ["93°"]
    ),
    answer(
      "y7-ang-prb-i3",
      "In a diagram, two parallel lines are cut by a transversal. The corresponding angle to a 68° angle is part of an isosceles triangle where the two equal angles are both equal to this corresponding angle. Find the apex angle of the isosceles triangle in degrees.",
      "68° + 68° + \\angle A = 180°",
      "44",
      "Corresponding angle = 68°. Both base angles of the isosceles triangle = 68°. Apex = 180 - 68 - 68 = 44°.",
      ["44°"]
    ),
    answer(
      "y7-ang-prb-i4",
      "A triangle has a vertex on each of two parallel lines, with the third vertex between them. The angles at the two vertices on the parallel lines are both 50° (formed between the triangle's sides and the parallel lines, measured as alternate interior angles). Find the angle at the middle vertex of the triangle in degrees.",
      "50° + 50° + \\angle A = 180°",
      "80",
      "The alternate interior angles at the parallel lines each equal 50°, so the interior angles of the triangle at those two vertices are each 50°. Middle vertex = 180 - 50 - 50 = 80°.",
      ["80°"]
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
      ["17°"]
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
      ["53°"]
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
      ["60°"]
    ),
    choice(
      "y7-ang-prb-m7",
      "A transversal crosses two parallel lines. The corresponding angle at the top intersection is 88°. A triangle shares this angle as an exterior angle at the bottom vertex. What is the sum of the two non-adjacent interior angles of the triangle?",
      "A",
      ["88°", "92°", "180°", "44°"],
      "The exterior angle of a triangle equals the sum of the two non-adjacent interior angles. If the exterior angle is 88°, then the two non-adjacent interior angles sum to 88°."
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
      ["65°"]
    ),
    answer(
      "y7-ang-prb-m10",
      "Two parallel lines are cut by a transversal. At the top line, two angles are formed: 130° (obtuse, above the line) and 50° (acute, below the line). A triangle is formed with the segment of the transversal between the lines as one side, and the co-interior angle (50°) as one interior angle. The second interior angle of the triangle is 70°. Find the third interior angle of the triangle in degrees.",
      "50° + 70° + \\angle C = 180°",
      "60",
      "Co-interior angle = 50° (given as interior angle of triangle). Triangle: 50 + 70 + unknown = 180. Unknown = 60°.",
      ["60°"]
    ),
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
