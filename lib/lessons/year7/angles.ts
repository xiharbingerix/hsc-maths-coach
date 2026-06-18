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
  masteryQuizPool: [
    dq(answer("y7-ang-typ-p1", "Find the complement of 12°. Give your answer in degrees.", "12° + \\angle A = 90°", "78", "Complement = 90 - 12 = 78°.", ["78°"]), 1),
    dq(answer("y7-ang-typ-p2", "Find the complement of 45°. Give your answer in degrees.", "45° + \\angle A = 90°", "45", "Complement = 90 - 45 = 45°.", ["45°"]), 1),
    dq(answer("y7-ang-typ-p3", "Find the supplement of 35°. Give your answer in degrees.", "35° + \\angle A = 180°", "145", "Supplement = 180 - 35 = 145°.", ["145°"]), 1),
    dq(answer("y7-ang-typ-p4", "Find the supplement of 90°. Give your answer in degrees.", "90° + \\angle A = 180°", "90", "Supplement = 180 - 90 = 90°.", ["90°"]), 1),
    dq(choice("y7-ang-typ-p5", "An angle measures 200°. What type of angle is it?", "D", ["Acute", "Obtuse", "Straight", "Reflex"], "Reflex angles are between 180° and 360°. 200° lies in that range, so it is reflex."), 1),
    dq(choice("y7-ang-typ-p6", "An angle measures 88°. What type of angle is it?", "A", ["Acute", "Right", "Obtuse", "Reflex"], "Acute angles are between 0° and 90°. 88° is acute."), 1),
    dq(answer("y7-ang-typ-p7", "Find the complement of 63°. Give your answer in degrees.", "63° + \\angle A = 90°", "27", "Complement = 90 - 63 = 27°.", ["27°"]), 2),
    dq(answer("y7-ang-typ-p8", "Find the supplement of 124°. Give your answer in degrees.", "124° + \\angle A = 180°", "56", "Supplement = 180 - 124 = 56°.", ["56°"]), 2),
    dq(answer("y7-ang-typ-p9", "Two straight lines cross. One angle is 38°. Find the size in degrees of the angle adjacent to it on the straight line.", "38° + \\angle A = 180°", "142", "Adjacent angles on a straight line are supplementary. 180 - 38 = 142°.", ["142°"]), 2),
    dq(answer("y7-ang-typ-p10", "Two straight lines cross. One angle is 109°. Find the size in degrees of the vertically opposite angle.", "\\text{Vertically opposite angles are equal}", "109", "Vertically opposite angles are equal, so the opposite angle is also 109°.", ["109°"]), 2),
    dq(answer("y7-ang-typ-p11", "Three angles meet at a point. Two of them are 85° and 140°. Find the third angle in degrees.", "85° + 140° + \\angle A = 360°", "135", "Third angle = 360 - 85 - 140 = 135°.", ["135°"]), 2),
    dq(choice("y7-ang-typ-p12", "Which pair of angle sizes are supplementary?", "C", ["40° and 50°", "70° and 70°", "118° and 62°", "100° and 100°"], "Supplementary angles sum to 180°. 118 + 62 = 180, so this pair is supplementary."), 2),
    dq(answer("y7-ang-typ-p13", "Four angles meet at a point. Three of them are 100°, 65°, and 80°. Find the fourth angle in degrees.", "100° + 65° + 80° + \\angle A = 360°", "115", "Fourth angle = 360 - 100 - 65 - 80 = 115°.", ["115°"]), 3),
    dq(answer("y7-ang-typ-p14", "A reflex angle and its non-reflex partner together form a revolution. The non-reflex angle is 95°. Find the reflex angle in degrees.", "95° + \\angle A = 360°", "265", "Reflex angle = 360 - 95 = 265°.", ["265°"]), 3),
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
  masteryQuizPool: [
    dq(answer("y7-ang-tri-p1", "A triangle has angles of 40° and 60°. Find the third angle in degrees.", "40° + 60° + \\angle C = 180°", "80", "Third angle = 180 - 40 - 60 = 80°.", ["80°"]), 1),
    dq(answer("y7-ang-tri-p2", "A triangle has angles of 50° and 50°. Find the third angle in degrees.", "50° + 50° + \\angle C = 180°", "80", "Third angle = 180 - 50 - 50 = 80°.", ["80°"]), 1),
    dq(answer("y7-ang-tri-p3", "A right triangle has one acute angle of 40°. Find the other acute angle in degrees.", "90° + 40° + \\angle C = 180°", "50", "Third angle = 180 - 90 - 40 = 50°.", ["50°"]), 1),
    dq(answer("y7-ang-tri-p4", "Each angle of an equilateral triangle is equal. Find the size in degrees of each angle.", "3 \\times \\angle A = 180°", "60", "Each angle = 180 ÷ 3 = 60°.", ["60°"]), 1),
    dq(choice("y7-ang-tri-p5", "A triangle has angles of 100°, 50°, and 30°. How is it classified by angles?", "C", ["Acute", "Right", "Obtuse", "Equilateral"], "One angle (100°) is greater than 90°, so the triangle is obtuse."), 1),
    dq(choice("y7-ang-tri-p6", "A triangle with all three sides of different lengths is called what?", "C", ["Equilateral", "Isosceles", "Scalene", "Right"], "A triangle with all sides different is scalene."), 1),
    dq(answer("y7-ang-tri-p7", "A triangle has angles of 33° and 88°. Find the third angle in degrees.", "33° + 88° + \\angle C = 180°", "59", "Third angle = 180 - 33 - 88 = 59°.", ["59°"]), 2),
    dq(answer("y7-ang-tri-p8", "An isosceles triangle has a base angle of 48°. Find the apex angle in degrees.", "48° + 48° + \\angle A = 180°", "84", "Apex angle = 180 - 48 - 48 = 84°.", ["84°"]), 2),
    dq(answer("y7-ang-tri-p9", "An isosceles triangle has an apex angle of 50°. Find each base angle in degrees.", "50° + 2x = 180°", "65", "Each base angle = (180 - 50) ÷ 2 = 65°.", ["65°"]), 2),
    dq(answer("y7-ang-tri-p10", "Two interior angles of a triangle are 40° and 85°. Find the exterior angle at the third vertex in degrees.", "\\text{Exterior angle} = 40° + 85°", "125", "Exterior angle = 40 + 85 = 125°.", ["125°"]), 2),
    dq(answer("y7-ang-tri-p11", "A right triangle has one acute angle of 18°. Find the other acute angle in degrees.", "90° + 18° + \\angle C = 180°", "72", "Third angle = 180 - 90 - 18 = 72°.", ["72°"]), 2),
    dq(choice("y7-ang-tri-p12", "A triangle has angles of 80°, 60°, and 40°. How is it classified by angles?", "A", ["Acute", "Right", "Obtuse", "Reflex"], "All three angles are less than 90°, so the triangle is acute."), 2),
    dq(answer("y7-ang-tri-p13", "The exterior angle of a triangle is 132°. One non-adjacent interior angle is 75°. Find the other non-adjacent interior angle in degrees.", "75° + \\angle B = 132°", "57", "Other angle = 132 - 75 = 57°.", ["57°"]), 3),
    dq(answer("y7-ang-tri-p14", "An isosceles triangle has an apex angle of 124°. Find each base angle in degrees.", "124° + 2x = 180°", "28", "Each base angle = (180 - 124) ÷ 2 = 28°.", ["28°"]), 3),
    dq(answer("y7-ang-tri-p15", "A triangle has angles in the ratio 2 : 3 : 4. Find the size in degrees of the largest angle.", "2x + 3x + 4x = 180°", "80", "9x = 180, so x = 20. Largest angle = 4 × 20 = 80°.", ["80°"]), 3),
    dq(answer("y7-ang-tri-p16", "In a triangle, the exterior angle at one vertex is 110° and the two non-adjacent interior angles are equal. Find each of those interior angles in degrees.", "2x = 110°", "55", "Each non-adjacent interior angle = 110 ÷ 2 = 55°.", ["55°"]), 3),
    dq(answer("y7-ang-tri-p17", "A triangle has angles (3x)°, (4x)°, and (5x)°. Find x.", "3x + 4x + 5x = 180", "15", "12x = 180, so x = 15.", ["15"]), 3),
    dq(choice("y7-ang-tri-p18", "An isosceles triangle has an apex angle of 90°. What are its two base angles?", "B", ["60° each", "45° each", "30° each", "90° each"], "Each base angle = (180 - 90) ÷ 2 = 45°."), 3),
    dq(answer("y7-ang-tri-p19", "A triangle has angles in the ratio 3 : 4 : 5. Find the size in degrees of the smallest angle.", "3x + 4x + 5x = 180°", "45", "12x = 180, so x = 15. Smallest angle = 3 × 15 = 45°.", ["45°"]), 4),
    dq(answer("y7-ang-tri-p20", "The angles of a triangle are (2x + 5)°, (3x - 11)°, and (x + 24)°. Find x.", "(2x+5) + (3x-11) + (x+24) = 180", "27", "Combine: 6x + 18 = 180, so 6x = 162 and x = 27.", ["27"]), 4),
    dq(answer("y7-ang-tri-p21", "In an isosceles triangle, each base angle is twice the apex angle. Find the apex angle in degrees.", "x + 2x + 2x = 180°", "36", "x + 2x + 2x = 5x = 180, so apex x = 36°.", ["36°"]), 4),
    dq(answer("y7-ang-tri-p22", "The exterior angle at one vertex of a triangle is (5x + 10)° and the two non-adjacent interior angles are (2x)° and (x + 40)°. Find x.", "5x + 10 = 2x + (x + 40)", "15", "Exterior = sum of non-adjacent: 5x + 10 = 3x + 40, so 2x = 30 and x = 15.", ["15"]), 4),
    dq(answer("y7-ang-tri-p23", "An isosceles triangle has two equal angles. One angle of the triangle is 40°. If 40° is the apex angle, find each base angle in degrees.", "40° + 2x = 180°", "70", "Each base angle = (180 - 40) ÷ 2 = 70°.", ["70°"]), 4),
    dq(answer("y7-ang-tri-p24", "A triangle has angles (x)°, (x + 30)°, and (2x - 6)°. Find the size in degrees of the largest angle.", "x + (x+30) + (2x-6) = 180", "72", "4x + 24 = 180, so 4x = 156 and x = 39. Largest = 2(39) - 6 = 72°.", ["72°"]), 5),
    dq(answer("y7-ang-tri-p25", "In triangle ABC, angle A is twice angle B, and angle C is 30° more than angle B. Find angle B in degrees.", "2x + x + (x + 30) = 180", "37.5", "Let angle B = x. Then 2x + x + (x + 30) = 180, so 4x = 150 and x = 37.5°.", ["37.5°"]), 5),
    dq(answer("y7-ang-tri-p26", "An exterior angle of a triangle is 140°. The interior angle adjacent to it is split so that the triangle is isosceles with the two equal angles being the non-adjacent ones. Find each equal interior angle in degrees.", "2x = 140°", "70", "The two non-adjacent interior angles sum to the exterior angle 140° and are equal, so each = 70°.", ["70°"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-tri-mp1",
      prompt:
        "In triangle PQR, the angle at P is 76°. The triangle is isosceles with PQ = PR, so the base angles at Q and R are equal. One side, QR, is extended beyond R to a point S, forming an exterior angle PRS.",
      latex: "\\angle P = 76°,\\ PQ = PR",
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
  masteryQuizPool: [
    dq(answer("y7-ang-qdr-p1", "A quadrilateral has angles of 90°, 90°, and 100°. Find the fourth angle in degrees.", "90° + 90° + 100° + \\angle D = 360°", "80", "Fourth angle = 360 - 90 - 90 - 100 = 80°.", ["80°"]), 1),
    dq(answer("y7-ang-qdr-p2", "A quadrilateral has angles of 70°, 110°, and 70°. Find the fourth angle in degrees.", "70° + 110° + 70° + \\angle D = 360°", "110", "Fourth angle = 360 - 70 - 110 - 70 = 110°.", ["110°"]), 1),
    dq(answer("y7-ang-qdr-p3", "A parallelogram has one angle of 60°. Find the size in degrees of the angle opposite to it.", "\\text{Opposite angles in a parallelogram are equal}", "60", "Opposite angles are equal, so the opposite angle is also 60°.", ["60°"]), 1),
    dq(answer("y7-ang-qdr-p4", "Each interior angle of a square is the same. Find the size in degrees of each angle.", "4 \\times \\angle A = 360°", "90", "Each angle = 360 ÷ 4 = 90°.", ["90°"]), 1),
    dq(choice("y7-ang-qdr-p5", "What is the angle sum of any quadrilateral?", "B", ["180°", "360°", "540°", "720°"], "A quadrilateral splits into two triangles, so its angle sum is 2 × 180° = 360°."), 1),
    dq(choice("y7-ang-qdr-p6", "In a parallelogram, opposite angles are:", "C", ["Supplementary", "Complementary", "Equal", "Always 90°"], "Opposite angles in a parallelogram are equal."), 1),
    dq(answer("y7-ang-qdr-p7", "A quadrilateral has angles of 88°, 92°, and 100°. Find the fourth angle in degrees.", "88° + 92° + 100° + \\angle D = 360°", "80", "Fourth angle = 360 - 88 - 92 - 100 = 80°.", ["80°"]), 2),
    dq(answer("y7-ang-qdr-p8", "A parallelogram has one angle of 47°. Find the size in degrees of a co-interior (adjacent) angle.", "47° + \\angle B = 180°", "133", "Co-interior angles are supplementary: 180 - 47 = 133°.", ["133°"]), 2),
    dq(answer("y7-ang-qdr-p9", "A trapezoid has a co-interior angle of 105° on one side of its parallel sides. Find the other co-interior angle on the same side in degrees.", "105° + \\angle B = 180°", "75", "Co-interior angles sum to 180°: 180 - 105 = 75°.", ["75°"]), 2),
    dq(answer("y7-ang-qdr-p10", "A rhombus has one angle of 70°. Find the size in degrees of a co-interior (adjacent) angle.", "70° + \\angle B = 180°", "110", "A rhombus is a parallelogram, so co-interior angles are supplementary: 180 - 70 = 110°.", ["110°"]), 2),
    dq(answer("y7-ang-qdr-p11", "A quadrilateral has angles of 115°, 65°, and 115°. Find the fourth angle in degrees.", "115° + 65° + 115° + \\angle D = 360°", "65", "Fourth angle = 360 - 115 - 65 - 115 = 65°.", ["65°"]), 2),
    dq(choice("y7-ang-qdr-p12", "Which set of four angles could be the angles of a parallelogram?", "B", ["100°, 100°, 100°, 60°", "100°, 80°, 100°, 80°", "90°, 90°, 100°, 80°", "120°, 120°, 60°, 80°"], "Opposite angles are equal and co-interior angles sum to 180°: 100, 80, 100, 80 works."), 2),
    dq(answer("y7-ang-qdr-p13", "A quadrilateral has angles in the ratio 1 : 2 : 3 : 4. Find the size in degrees of the largest angle.", "x + 2x + 3x + 4x = 360°", "144", "10x = 360, so x = 36. Largest angle = 4 × 36 = 144°.", ["144°"]), 3),
    dq(answer("y7-ang-qdr-p14", "A trapezoid has co-interior angles x and (x + 40)° on one pair of parallel sides. Find x in degrees.", "x + (x + 40) = 180°", "70", "2x + 40 = 180, so 2x = 140 and x = 70°.", ["70°"]), 3),
    dq(answer("y7-ang-qdr-p15", "A quadrilateral has three equal angles and a fourth angle of 120°. Find the size in degrees of each of the three equal angles.", "3x + 120° = 360°", "80", "3x = 360 - 120 = 240, so each equal angle = 80°.", ["80°"]), 3),
    dq(answer("y7-ang-qdr-p16", "A parallelogram has co-interior angles (2x)° and (x + 30)°. Find x.", "2x + (x + 30) = 180°", "50", "3x + 30 = 180, so 3x = 150 and x = 50.", ["50"]), 3),
    dq(choice("y7-ang-qdr-p17", "A rhombus has one angle of 120°. What are its four interior angles?", "A", ["120°, 60°, 120°, 60°", "120°, 120°, 60°, 60°", "120°, 90°, 60°, 90°", "120°, 120°, 120°, 0°"], "Opposite angles equal (120° and 120°); co-interior supplementary (60° and 60°). Order: 120, 60, 120, 60."), 3),
    dq(answer("y7-ang-qdr-p18", "A quadrilateral has angles (x)°, (x + 20)°, (x + 40)°, and (x + 60)°. Find the size in degrees of the smallest angle.", "x + (x+20) + (x+40) + (x+60) = 360", "60", "4x + 120 = 360, so 4x = 240 and x = 60. Smallest angle = 60°.", ["60°"]), 3),
    dq(answer("y7-ang-qdr-p19", "The angles of a quadrilateral are (3x)°, (2x + 10)°, (x + 30)°, and (2x - 10)°. Find x.", "3x + (2x+10) + (x+30) + (2x-10) = 360", "41.25", "Combine: 8x + 30 = 360, so 8x = 330 and x = 41.25.", ["41.25"]), 4),
    dq(answer("y7-ang-qdr-p20", "A parallelogram has angles (4x - 10)° and (2x + 40)° as co-interior angles. Find the size in degrees of the larger angle.", "(4x-10) + (2x+40) = 180°", "90", "6x + 30 = 180, so 6x = 150 and x = 25. Angles: 4(25) - 10 = 90° and 2(25) + 40 = 90°. The larger (here equal) angle = 90°.", ["90°"]), 4),
    dq(answer("y7-ang-qdr-p21", "A quadrilateral has angles in the ratio 2 : 3 : 4 : 6. Find the size in degrees of the largest angle.", "2x + 3x + 4x + 6x = 360°", "144", "15x = 360, so x = 24. Largest = 6 × 24 = 144°.", ["144°"]), 4),
    dq(answer("y7-ang-qdr-p22", "A trapezoid has angles 65° and 115° as a co-interior pair on one parallel side, and a third angle of 78°. Find the fourth angle in degrees.", "65° + 115° + 78° + \\angle D = 360°", "102", "Fourth angle = 360 - 65 - 115 - 78 = 102°. Check other co-interior pair: 78 + 102 = 180.", ["102°"]), 4),
    dq(answer("y7-ang-qdr-p23", "Three angles of a quadrilateral are equal, and the fourth is 90° larger than each of them. Find the size in degrees of each of the three equal angles.", "3x + (x + 90) = 360", "67.5", "4x + 90 = 360, so 4x = 270 and x = 67.5°.", ["67.5°"]), 5),
    dq(answer("y7-ang-qdr-p24", "In a parallelogram, one angle is 24° more than twice its co-interior angle. Find the size in degrees of the smaller angle.", "x + (2x + 24) = 180", "52", "Let smaller = x. Then x + (2x + 24) = 180, so 3x = 156 and x = 52°.", ["52°"]), 5),
    dq(answer("y7-ang-qdr-p25", "A quadrilateral has angles (5x)°, (4x)°, (3x)°, and (3x)°. Find the size in degrees of the largest angle.", "5x + 4x + 3x + 3x = 360", "120", "15x = 360, so x = 24. Largest = 5 × 24 = 120°.", ["120°"]), 5),
    dq(answer("y7-ang-qdr-p26", "The four angles of a quadrilateral are consecutive even numbers (in degrees): n, n+2, n+4, n+6. Find the largest angle in degrees.", "n + (n+2) + (n+4) + (n+6) = 360", "93", "4n + 12 = 360, so 4n = 348 and n = 87. Largest = 87 + 6 = 93°.", ["93°"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-qdr-mp1",
      prompt:
        "ABCD is a parallelogram. The angle at vertex A measures 105°. In a parallelogram, opposite angles are equal and co-interior (adjacent) angles are supplementary.",
      latex: "\\angle A = 105°",
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
  masteryQuizPool: [
    dq(answer("y7-ang-par-p1", "A transversal crosses two parallel lines. One angle is 40°. Find the corresponding angle in degrees.", "\\text{Corresponding angles are equal}", "40", "Corresponding angles are equal, so the corresponding angle is 40°.", ["40°"]), 1),
    dq(answer("y7-ang-par-p2", "A transversal crosses two parallel lines. One alternate angle is 55°. Find the other alternate angle in degrees.", "\\text{Alternate angles are equal}", "55", "Alternate angles are equal, so the other alternate angle is 55°.", ["55°"]), 1),
    dq(answer("y7-ang-par-p3", "A transversal crosses two parallel lines. One co-interior angle is 80°. Find the other co-interior angle in degrees.", "80° + \\angle B = 180°", "100", "Co-interior angles sum to 180°: 180 - 80 = 100°.", ["100°"]), 1),
    dq(choice("y7-ang-par-p4", "Which shape describes alternate angles on parallel lines?", "B", ["F-shape", "Z-shape", "C-shape", "X-shape"], "Alternate angles form a Z-shape and are equal when the lines are parallel."), 1),
    dq(choice("y7-ang-par-p5", "Which shape describes co-interior angles on parallel lines?", "C", ["F-shape", "Z-shape", "C-shape", "T-shape"], "Co-interior angles form a C-shape and sum to 180° when the lines are parallel."), 1),
    dq(answer("y7-ang-par-p6", "A transversal crosses two parallel lines. A corresponding angle to a 132° angle is unknown. Find it in degrees.", "\\text{Corresponding angles are equal}", "132", "Corresponding angles are equal, so it is 132°.", ["132°"]), 1),
    dq(answer("y7-ang-par-p7", "A transversal crosses two parallel lines. One co-interior angle is 117°. Find the other co-interior angle in degrees.", "117° + \\angle B = 180°", "63", "180 - 117 = 63°.", ["63°"]), 2),
    dq(answer("y7-ang-par-p8", "A transversal crosses two parallel lines. One angle is 64°. Find the co-interior angle on the same side in degrees.", "64° + \\angle B = 180°", "116", "Co-interior angles sum to 180°: 180 - 64 = 116°.", ["116°"]), 2),
    dq(answer("y7-ang-par-p9", "A transversal crosses two parallel lines. An alternate angle to a 98° angle is unknown. Find it in degrees.", "\\text{Alternate angles are equal}", "98", "Alternate angles are equal, so it is 98°.", ["98°"]), 2),
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
  masteryQuizPool: [
    dq(answer("y7-ang-prb-p1", "Two parallel lines are cut by a transversal. An angle of 60° is formed at the top intersection. Find the alternate angle at the bottom intersection in degrees.", "\\text{Alternate angles are equal}", "60", "Alternate angles are equal, so the alternate angle is 60°.", ["60°"]), 1),
    dq(answer("y7-ang-prb-p2", "A triangle has two angles of 70° and 60°. Find the third angle in degrees.", "70° + 60° + \\angle C = 180°", "50", "Third angle = 180 - 70 - 60 = 50°.", ["50°"]), 1),
    dq(answer("y7-ang-prb-p3", "Two parallel lines are cut by a transversal. One co-interior angle is 110°. Find the other co-interior angle in degrees.", "110° + \\angle B = 180°", "70", "180 - 110 = 70°.", ["70°"]), 1),
    dq(answer("y7-ang-prb-p4", "An exterior angle of a triangle is 120° and the two non-adjacent interior angles are equal. Find each in degrees.", "2x = 120°", "60", "Each = 120 ÷ 2 = 60°.", ["60°"]), 1),
    dq(choice("y7-ang-prb-p5", "A complete geometric reason must state which two things?", "C", ["The diagram and the answer", "The calculator used and the answer", "The rule and the condition (e.g. alternate angles, parallel lines)", "Only the rule"], "A full reason names the rule and the condition under which it applies."), 1),
    dq(answer("y7-ang-prb-p6", "Two parallel lines are cut by a transversal. A corresponding angle to 84° is unknown. Find it in degrees.", "\\text{Corresponding angles are equal}", "84", "Corresponding angles are equal, so it is 84°.", ["84°"]), 1),
    dq(answer("y7-ang-prb-p7", "Two parallel lines are cut by a transversal. An angle of 64° is formed at the top intersection. Its alternate angle at the bottom is one interior angle of a triangle whose other interior angle is 58°. Find the third angle of the triangle in degrees.", "64° + 58° + \\angle C = 180°", "58", "Alternate angle = 64°. Triangle: 180 - 64 - 58 = 58°.", ["58°"]), 2),
    dq(answer("y7-ang-prb-p8", "Two parallel lines are cut by a transversal. One co-interior angle is 130°. The other co-interior angle is an interior angle of a triangle whose second angle is 25°. Find the third angle of the triangle in degrees.", "(180 - 130)° + 25° + \\angle C = 180°", "105", "Other co-interior = 50°. Triangle: 180 - 50 - 25 = 105°.", ["105°"]), 2),
    dq(answer("y7-ang-prb-p9", "An isosceles triangle has a base angle equal to a corresponding angle of 72° formed on parallel lines. Both base angles are 72°. Find the apex angle in degrees.", "72° + 72° + \\angle A = 180°", "36", "Apex = 180 - 72 - 72 = 36°.", ["36°"]), 2),
    dq(answer("y7-ang-prb-p10", "Two parallel lines are cut by a transversal at P and Q. At P an angle of 53° is formed above the line. Find the co-interior angle at Q in degrees.", "53° + \\angle Q = 180°", "127", "Co-interior angles sum to 180°: 180 - 53 = 127°.", ["127°"]), 2),
    dq(answer("y7-ang-prb-p11", "An exterior angle of a triangle is 95°. One non-adjacent interior angle is 38°. Find the other non-adjacent interior angle in degrees.", "38° + \\angle B = 95°", "57", "Other angle = 95 - 38 = 57°.", ["57°"]), 2),
    dq(choice("y7-ang-prb-p12", "Two parallel lines form a triangle with a transversal. Which combination of rules is standard?", "C", ["Complementary and revolution", "Quadrilateral sum and vertically opposite", "A parallel-line rule and the triangle angle sum", "Co-interior and complementary"], "The standard combination is a parallel-line rule (alternate/corresponding/co-interior) with the triangle angle sum."), 2),
    dq(answer("y7-ang-prb-p13", "Two parallel lines are cut by a transversal. An angle of 75° at the top has an alternate angle at the bottom that is one interior angle of a triangle. The triangle's other two angles are equal. Find each of those equal angles in degrees.", "75° + 2x = 180°", "52.5", "Alternate angle = 75°. Triangle: 75 + 2x = 180, so 2x = 105 and x = 52.5°.", ["52.5°"]), 3),
    dq(answer("y7-ang-prb-p14", "A triangle has a vertex on each of two parallel lines, with the third vertex between them. The alternate interior angles at the two vertices on the lines are 47° and 63°. Find the angle at the middle vertex in degrees.", "47° + 63° + \\angle A = 180°", "70", "Middle vertex = 180 - 47 - 63 = 70°.", ["70°"]), 3),
    dq(answer("y7-ang-prb-p15", "Two parallel lines are cut by a transversal. At the top intersection, the angle is 118°. Its co-interior partner is an interior angle of a triangle whose second angle is 30°. Find the third angle of the triangle in degrees.", "(180 - 118)° + 30° + \\angle C = 180°", "88", "Co-interior = 62°. Triangle: 180 - 62 - 30 = 88°.", ["88°"]), 3),
    dq(answer("y7-ang-prb-p16", "An exterior angle of a triangle is 134°. The two non-adjacent interior angles are in the ratio 1 : 3. Find the larger of the two angles in degrees.", "x + 3x = 134°", "100.5", "x + 3x = 134, so 4x = 134 and x = 33.5. Larger = 3 × 33.5 = 100.5°.", ["100.5°"]), 3),
    dq(answer("y7-ang-prb-p17", "Two parallel lines are cut by a transversal. Corresponding angles are (3x + 9)° and (5x - 11)°. Find x.", "3x + 9 = 5x - 11", "10", "Corresponding angles equal: 3x + 9 = 5x - 11, so 20 = 2x and x = 10.", ["10"]), 3),
    dq(choice("y7-ang-prb-p18", "A student finds a co-interior angle as 180 - 65 = 115°, then uses it in a triangle: 180 - 115 - 40 = 25°. Is the reasoning valid?", "A", ["Yes, if the 115° angle is genuinely inside the triangle", "No, co-interior angles must be equal", "No, the triangle sum is 360°", "No, the angle should be 65°"], "Co-interior gives 115°; the triangle sum then gives 25°. The reasoning is valid provided the 115° angle is an interior angle of the triangle."), 3),
    dq(answer("y7-ang-prb-p19", "Two parallel lines are cut by a transversal. An angle of (4x + 5)° at the top is alternate to (6x - 25)° at the bottom. Find x.", "4x + 5 = 6x - 25", "15", "Alternate angles equal: 4x + 5 = 6x - 25, so 30 = 2x and x = 15.", ["15"]), 4),
    dq(answer("y7-ang-prb-p20", "Triangle ABC has vertex A on line PQ and side BC on line RS, with PQ parallel to RS. The apex angle at A is 64°. The base angles at B and C are equal. Find each base angle in degrees.", "64° + 2x = 180°", "58", "Each base angle = (180 - 64) ÷ 2 = 58°.", ["58°"]), 4),
    dq(answer("y7-ang-prb-p21", "Two parallel lines are cut by two transversals meeting at a point between the lines, forming a triangle. The interior angles where the transversals meet the top line are 48° and 72°. Find the angle at the vertex between the lines in degrees.", "48° + 72° + \\angle A = 180°", "60", "Vertex angle = 180 - 48 - 72 = 60°.", ["60°"]), 4),
    dq(answer("y7-ang-prb-p22", "Two parallel lines are cut by a transversal. An angle of 116° at the top has a co-interior partner at the bottom. That partner is the exterior angle of a triangle. Find the sum of the two non-adjacent interior angles of that triangle in degrees.", "\\text{co-interior} = 64°;\\ \\text{exterior} = \\text{sum of non-adjacent}", "64", "Co-interior partner = 180 - 116 = 64°. As an exterior angle, it equals the sum of the two non-adjacent interior angles, which is 64°.", ["64°"]), 4),
    dq(answer("y7-ang-prb-p23", "In a diagram, an angle x is found from co-interior angles as 180 - 70 = 110°. This 110° is then an exterior angle of a triangle, and one non-adjacent interior angle is 45°. Find the other non-adjacent interior angle in degrees.", "45° + \\angle B = 110°", "65", "Co-interior gives 110°. Exterior angle = sum of non-adjacent: other angle = 110 - 45 = 65°.", ["65°"]), 5),
    dq(answer("y7-ang-prb-p24", "Two parallel lines are cut by a transversal. An angle (2x + 18)° at the top is co-interior with (3x + 2)° at the bottom. After finding x, find the size of the larger angle in degrees.", "(2x+18) + (3x+2) = 180", "98", "5x + 20 = 180, so 5x = 160 and x = 32. Angles: 2(32)+18 = 82° and 3(32)+2 = 98°. Larger = 98°.", ["98°"]), 5),
    dq(answer("y7-ang-prb-p25", "Triangle ABC has AB = AC. Angle A is 30° more than each base angle. Find each base angle in degrees.", "(x + 30) + x + x = 180", "50", "Apex = x + 30, base angles each x. So (x + 30) + 2x = 180, 3x = 150, x = 50°.", ["50°"]), 5),
    dq(answer("y7-ang-prb-p26", "Two parallel lines are cut by a transversal forming a triangle. One interior angle equals the alternate angle of 55°, a second interior angle equals the co-interior partner of 130°, and the third is unknown. Find the unknown angle in degrees.", "55° + (180 - 130)° + \\angle C = 180°", "75", "First interior = 55° (alternate). Second = 180 - 130 = 50° (co-interior). Third = 180 - 55 - 50 = 75°.", ["75°"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-ang-prb-mp1",
      prompt:
        "Two parallel lines PQ and RS are cut by a transversal. A triangle ABC is formed: vertex A lies on PQ, side BC lies along RS, and the apex angle at A is 68°. The base angles of the triangle (at B and C) are equal, and the base angle at B also equals an alternate interior angle formed with line PQ.",
      latex: "PQ \\parallel RS,\\ \\angle A = 68°",
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
