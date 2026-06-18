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
    hint: "Use the perimeter formula for the shape, then substitute the given side lengths.",
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
    hint: "Recall the perimeter formula for the shape described.",
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

// Attach a difficulty tag (1 = easiest … 5 = hardest) to a pool question.
function withDifficulty(q: PracticeQuestion, difficulty: number): PracticeQuestion {
  return { ...q, difficulty };
}

// ─── Lesson 1: Perimeter of Polygons ────────────────────────────────────────

const perimeterOfPolygons: LessonContent = {
  description:
    "Find the perimeter of rectangles, squares, triangles, rhombuses, parallelograms, and regular polygons using appropriate formulas.",
  learningIntention:
    "Use perimeter formulas to find the total distance around common polygons, including rectangles, squares, triangles, and regular polygons.",
  successCriteria: [
    "Define perimeter as the total distance around the outside of a shape.",
    "Use the formula P = 2(l + w) to find the perimeter of a rectangle.",
    "Use the formula P = 4s to find the perimeter of a square.",
    "Use P = a + b + c to find the perimeter of any triangle.",
    "Find the perimeter of a rhombus, parallelogram, or regular polygon using the side-length formula P = 2(a + b) or P = n × s.",
  ],
  teaching: {
    paragraphs: [
      "Perimeter is the total distance you would walk if you went all the way around the outside of a shape without lifting your feet. Think of it as measuring the fence needed to enclose a paddock — every side counts, and you go all the way around.",
      "For a rectangle with length l and width w, opposite sides are equal, so instead of adding all four sides separately you can double the sum of one length and one width. A rectangle that is 8 cm long and 3 cm wide has perimeter 2 × (8 + 3) = 2 × 11 = 22 cm.",
      "A square is a special rectangle where all four sides are equal. Its perimeter is simply 4 times the side length: P = 4s. For a triangle with sides a, b and c, add all three sides: P = a + b + c. For a rhombus or parallelogram both pairs of opposite sides are equal, giving P = 2(a + b). A regular polygon with n sides each of length s has perimeter P = n × s.",
      "Units matter. If sides are given in centimetres, the perimeter is in centimetres. If you mix units — say one side in metres and another in centimetres — convert everything to the same unit before you add. The most common error is forgetting to convert before adding.",
    ],
    latexBlocks: [
      "P_{\\text{rectangle}} = 2(l + w)",
      "P_{\\text{square}} = 4s",
      "P_{\\text{triangle}} = a + b + c",
      "P_{\\text{regular polygon}} = n \\times s",
    ],
  },
  workedExamples: [
    {
      title: "Perimeter of a rectangle",
      questionLatex:
        "\\text{Find the perimeter of a rectangle with length }9\\text{ cm and width }4\\text{ cm.}",
      steps: [
        {
          explanation: "Write down the rectangle perimeter formula.",
          latex: "P = 2(l + w)",
        },
        {
          explanation: "Substitute l = 9 and w = 4 into the formula.",
          latex: "P = 2(9 + 4) = 2 \\times 13",
        },
        {
          explanation: "Multiply to get the perimeter.",
          latex: "P = 26 \\text{ cm}",
        },
      ],
      finalAnswerLatex: "P = 26 \\text{ cm}",
    },
    {
      title: "Perimeter of a triangle with mixed sides",
      questionLatex:
        "\\text{Find the perimeter of a triangle with sides }7\\text{ cm, }5\\text{ cm and }9\\text{ cm.}",
      steps: [
        {
          explanation: "Write the formula for the perimeter of a triangle.",
          latex: "P = a + b + c",
        },
        {
          explanation: "Substitute the three side lengths.",
          latex: "P = 7 + 5 + 9",
        },
        {
          explanation: "Add the sides to find the perimeter.",
          latex: "P = 21 \\text{ cm}",
        },
      ],
      finalAnswerLatex: "P = 21 \\text{ cm}",
    },
    {
      title: "Perimeter of a regular hexagon",
      questionLatex:
        "\\text{Find the perimeter of a regular hexagon with side length }6\\text{ m.}",
      steps: [
        {
          explanation:
            "A regular hexagon has 6 equal sides, so use P = n × s with n = 6.",
          latex: "P = n \\times s = 6 \\times 6",
        },
        {
          explanation: "Multiply to find the perimeter.",
          latex: "P = 36 \\text{ m}",
        },
      ],
      finalAnswerLatex: "P = 36 \\text{ m}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-per-pol-g1",
      "Which formula gives the perimeter of a rectangle with length l and width w?",
      "B",
      [
        "$P = l \\times w$",
        "$P = 2(l + w)$",
        "$P = l + w$",
        "$P = 4(l + w)$",
      ],
      "Perimeter of a rectangle: add all four sides. Opposite sides are equal, so P = 2l + 2w = 2(l + w)."
    ),
    answer(
      "y7-per-pol-g2",
      "Find the perimeter of a rectangle with length 10 cm and width 3 cm. Give your answer in cm.",
      "P = 2(l + w) = 2(10 + 3)",
      "26",
      "P = 2(10 + 3) = 2 × 13 = 26 cm."
    ),
    answer(
      "y7-per-pol-g3",
      "Find the perimeter of a square with side length 7 m. Give your answer in m.",
      "P = 4s = 4 \\times 7",
      "28",
      "P = 4 × 7 = 28 m."
    ),
    answer(
      "y7-per-pol-g4",
      "Find the perimeter of a triangle with sides 6 cm, 8 cm, and 10 cm. Give your answer in cm.",
      "P = a + b + c = 6 + 8 + 10",
      "24",
      "P = 6 + 8 + 10 = 24 cm."
    ),
  ],
  independentPractice: [
    answer(
      "y7-per-pol-i1",
      "Find the perimeter of a rectangle with length 12 cm and width 5 cm. Give your answer in cm.",
      "P = 2(12 + 5)",
      "34",
      "P = 2(12 + 5) = 2 × 17 = 34 cm."
    ),
    answer(
      "y7-per-pol-i2",
      "Find the perimeter of a square with side length 9 cm. Give your answer in cm.",
      "P = 4 \\times 9",
      "36",
      "P = 4 × 9 = 36 cm."
    ),
    answer(
      "y7-per-pol-i3",
      "A rhombus has sides of length 8 cm. Find its perimeter in cm.",
      "P = 4 \\times 8",
      "32",
      "A rhombus has 4 equal sides. P = 4 × 8 = 32 cm."
    ),
    answer(
      "y7-per-pol-i4",
      "A parallelogram has sides of 11 cm and 6 cm. Find its perimeter in cm.",
      "P = 2(a + b) = 2(11 + 6)",
      "34",
      "P = 2(11 + 6) = 2 × 17 = 34 cm."
    ),
    answer(
      "y7-per-pol-i5",
      "A regular pentagon has side length 8 m. Find its perimeter in m.",
      "P = 5 \\times 8",
      "40",
      "A regular pentagon has 5 equal sides. P = 5 × 8 = 40 m."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding only two sides for a rectangle: P = l + w.",
      fix: "A rectangle has four sides. Add all four: P = l + w + l + w = 2(l + w).",
    },
    {
      mistake: "Confusing area with perimeter — multiplying sides instead of adding.",
      fix: "Perimeter is a distance around the shape. Add all side lengths; do not multiply them.",
    },
    {
      mistake: "Mixing units, such as adding 3 m and 50 cm without converting.",
      fix: "Convert all sides to the same unit before adding. 3 m = 300 cm, so the sum uses centimetres throughout.",
    },
    {
      mistake: "Using P = 4s for a non-square rectangle (assuming all sides are equal).",
      fix: "P = 4s only works when all four sides are equal (square). For a rectangle, use P = 2(l + w).",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-per-pol-m1",
      "Find the perimeter of a rectangle with length 15 cm and width 4 cm. Give your answer in cm.",
      "P = 2(15 + 4)",
      "38",
      "P = 2(15 + 4) = 2 × 19 = 38 cm."
    ),
    choice(
      "y7-per-pol-m2",
      "A square has perimeter 36 cm. What is the side length in cm?",
      "C",
      ["4 cm", "6 cm", "9 cm", "12 cm"],
      "P = 4s, so s = P ÷ 4 = 36 ÷ 4 = 9 cm."
    ),
    answer(
      "y7-per-pol-m3",
      "Find the perimeter of a triangle with sides 5 cm, 12 cm, and 13 cm. Give your answer in cm.",
      "P = 5 + 12 + 13",
      "30",
      "P = 5 + 12 + 13 = 30 cm."
    ),
    answer(
      "y7-per-pol-m4",
      "Find the perimeter of a parallelogram with sides 14 cm and 7 cm. Give your answer in cm.",
      "P = 2(14 + 7)",
      "42",
      "P = 2(14 + 7) = 2 × 21 = 42 cm."
    ),
    answer(
      "y7-per-pol-m5",
      "A regular octagon has side length 5 cm. Find its perimeter in cm.",
      "P = 8 \\times 5",
      "40",
      "A regular octagon has 8 equal sides. P = 8 × 5 = 40 cm."
    ),
    answer(
      "y7-per-pol-m6",
      "A rectangle has perimeter 40 m and width 6 m. Find its length in m.",
      "2(l + 6) = 40",
      "14",
      "2(l + 6) = 40, so l + 6 = 20, so l = 14 m."
    ),
    choice(
      "y7-per-pol-m7",
      "A rhombus has one side of length 6 cm. What is its perimeter in cm?",
      "A",
      ["24 cm", "12 cm", "36 cm", "18 cm"],
      "A rhombus has 4 equal sides. P = 4 × 6 = 24 cm."
    ),
    answer(
      "y7-per-pol-m8",
      "A rectangle is 2.5 m long and 1.5 m wide. Find its perimeter in m.",
      "P = 2(2.5 + 1.5)",
      "8",
      "P = 2(2.5 + 1.5) = 2 × 4 = 8 m."
    ),
    answer(
      "y7-per-pol-m9",
      "An equilateral triangle has perimeter 27 cm. Find the length of one side in cm.",
      "3s = 27",
      "9",
      "Each side is equal, so 3s = 27. Dividing: s = 9 cm."
    ),
    answer(
      "y7-per-pol-m10",
      "A regular polygon has perimeter 56 m and 7 equal sides. Find the length of each side in m.",
      "s = 56 \\div 7",
      "8",
      "P = n × s, so s = P ÷ n = 56 ÷ 7 = 8 m."
    ),
  ],
  masteryQuizPool: [
    withDifficulty(
      answer(
        "y7-per-pol-p1",
        "Find the perimeter of a square with side length 6 cm. Give your answer in cm.",
        "P = 4 \\times 6",
        "24",
        "P = 4 × 6 = 24 cm."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p2",
        "Find the perimeter of a rectangle with length 11 cm and width 2 cm. Give your answer in cm.",
        "P = 2(11 + 2)",
        "26",
        "P = 2(11 + 2) = 2 × 13 = 26 cm."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p3",
        "Find the perimeter of a triangle with sides 3 cm, 4 cm, and 5 cm. Give your answer in cm.",
        "P = 3 + 4 + 5",
        "12",
        "P = 3 + 4 + 5 = 12 cm."
      ),
      1
    ),
    withDifficulty(
      choice(
        "y7-per-pol-p4",
        "How many equal sides does a regular hexagon have?",
        "C",
        ["4", "5", "6", "8"],
        "A hexagon has 6 sides; a regular hexagon has 6 equal sides."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p5",
        "A rhombus has sides of length 5 cm. Find its perimeter in cm.",
        "P = 4 \\times 5",
        "20",
        "A rhombus has 4 equal sides. P = 4 × 5 = 20 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p6",
        "Find the perimeter of a regular pentagon with side length 7 cm. Give your answer in cm.",
        "P = 5 \\times 7",
        "35",
        "A regular pentagon has 5 equal sides. P = 5 × 7 = 35 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p7",
        "A parallelogram has sides 9 cm and 4 cm. Find its perimeter in cm.",
        "P = 2(9 + 4)",
        "26",
        "P = 2(9 + 4) = 2 × 13 = 26 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p8",
        "A square has side length 12 m. Find its perimeter in m.",
        "P = 4 \\times 12",
        "48",
        "P = 4 × 12 = 48 m."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p9",
        "Find the perimeter of a rectangle with length 13 m and width 8 m. Give your answer in m.",
        "P = 2(13 + 8)",
        "42",
        "P = 2(13 + 8) = 2 × 21 = 42 m."
      ),
      2
    ),
    withDifficulty(
      choice(
        "y7-per-pol-p10",
        "A square has perimeter 28 cm. What is the side length in cm?",
        "B",
        ["5 cm", "7 cm", "9 cm", "14 cm"],
        "P = 4s, so s = 28 ÷ 4 = 7 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p11",
        "An equilateral triangle has side length 11 cm. Find its perimeter in cm.",
        "P = 3 \\times 11",
        "33",
        "An equilateral triangle has 3 equal sides. P = 3 × 11 = 33 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p12",
        "A regular octagon has side length 6 m. Find its perimeter in m.",
        "P = 8 \\times 6",
        "48",
        "A regular octagon has 8 equal sides. P = 8 × 6 = 48 m."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p13",
        "A square has perimeter 52 cm. Find its side length in cm.",
        "s = 52 \\div 4",
        "13",
        "P = 4s, so s = 52 ÷ 4 = 13 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p14",
        "A rectangle has perimeter 50 m and length 16 m. Find its width in m.",
        "2(16 + w) = 50",
        "9",
        "2(16 + w) = 50, so 16 + w = 25, so w = 9 m."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p15",
        "A regular polygon has perimeter 45 cm and 9 equal sides. Find the length of each side in cm.",
        "s = 45 \\div 9",
        "5",
        "P = n × s, so s = 45 ÷ 9 = 5 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p16",
        "A rectangle is 4.5 cm long and 2.5 cm wide. Find its perimeter in cm.",
        "P = 2(4.5 + 2.5)",
        "14",
        "P = 2(4.5 + 2.5) = 2 × 7 = 14 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p17",
        "An equilateral triangle has perimeter 36 cm. Find the length of one side in cm.",
        "3s = 36",
        "12",
        "All three sides are equal, so 3s = 36, giving s = 12 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p18",
        "An isosceles triangle has two equal sides of 9 cm and a base of 5 cm. Find its perimeter in cm.",
        "P = 9 + 9 + 5",
        "23",
        "Add all three sides: 9 + 9 + 5 = 23 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p19",
        "A rhombus has perimeter 44 cm. Find the length of one side in cm.",
        "s = 44 \\div 4",
        "11",
        "A rhombus has 4 equal sides, so s = 44 ÷ 4 = 11 cm."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p20",
        "A regular polygon has perimeter 90 cm and each side is 10 cm long. How many sides does it have?",
        "n = 90 \\div 10",
        "9",
        "P = n × s, so n = P ÷ s = 90 ÷ 10 = 9 sides."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p21",
        "A parallelogram has perimeter 54 cm. One pair of sides is 15 cm each. Find the length of each of the other two sides in cm.",
        "2(15 + b) = 54",
        "12",
        "2(15 + b) = 54, so 15 + b = 27, so b = 12 cm."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p22",
        "A rectangle is 1.5 m long and 80 cm wide. Find its perimeter in cm. (Convert 1.5 m to 150 cm first.)",
        "P = 2(150 + 80)",
        "460",
        "Convert 1.5 m to 150 cm. P = 2(150 + 80) = 2 × 230 = 460 cm."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p23",
        "A regular hexagon and a square have the same perimeter. The hexagon has side length 6 cm. Find the side length of the square in cm.",
        "4s = 6 \\times 6",
        "9",
        "Hexagon perimeter = 6 × 6 = 36 cm. For the square, 4s = 36, so s = 9 cm."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p24",
        "A rectangle has perimeter 60 cm. Its length is twice its width. Find the width in cm.",
        "2(2w + w) = 60",
        "10",
        "Length = 2w, so 2(2w + w) = 60, giving 2 × 3w = 60, so 6w = 60 and w = 10 cm."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p25",
        "An equilateral triangle and a regular hexagon have the same perimeter of 72 cm. Find the difference between the triangle's side length and the hexagon's side length in cm.",
        "72 \\div 3 - 72 \\div 6",
        "12",
        "Triangle side = 72 ÷ 3 = 24 cm. Hexagon side = 72 ÷ 6 = 12 cm. Difference = 24 − 12 = 12 cm."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-pol-p26",
        "A rectangle has perimeter 48 cm and width 9 cm. A square has the same perimeter. Find the side length of the square in cm.",
        "4s = 48",
        "12",
        "The square has perimeter 48 cm, so 4s = 48 and s = 12 cm. (The rectangle width 9 cm is extra information.)"
      ),
      5
    ),
  ],
  multiPartPractice: [
    {
      id: "y7-per-pol-mp1",
      prompt:
        "A rectangular vegetable garden is 14 m long and 6 m wide. A separate square flower bed has a side length of 5 m.",
      latex: "P_{\\text{rectangle}} = 2(l + w), \\quad P_{\\text{square}} = 4s",
      answer: "40",
      hint: "Use P = 2(l + w) for the rectangle and P = 4s for the square. For part (c), add the two perimeters.",
      explanation:
        "Part (a): rectangle perimeter = 2(14 + 6) = 2 × 20 = 40 m. Part (b): square perimeter = 4 × 5 = 20 m. Part (c): total edging = 40 + 20 = 60 m.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the perimeter of the rectangular vegetable garden, in metres.",
          latex: "P = 2(14 + 6)",
          marks: 1,
          answer: "40",
          acceptedAnswers: ["40.0"],
          hint: "Use P = 2(l + w) with l = 14 and w = 6.",
          explanation: "P = 2(14 + 6) = 2 × 20 = 40 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the perimeter of the square flower bed, in metres.",
          latex: "P = 4 \\times 5",
          marks: 1,
          answer: "20",
          acceptedAnswers: ["20.0"],
          hint: "Use P = 4s with s = 5.",
          explanation: "P = 4 × 5 = 20 m.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "Edging is placed around both shapes. Find the total length of edging needed, in metres.",
          latex: "40 + 20",
          marks: 1,
          answer: "60",
          acceptedAnswers: ["60.0"],
          hint: "Add the two perimeters from parts (a) and (b).",
          explanation: "Total edging = 40 + 20 = 60 m.",
        },
      ],
    },
  ],
};

// ─── Lesson 2: Perimeter of Composite Shapes ────────────────────────────────

const perimeterCompositeShapes: LessonContent = {
  description:
    "Find the perimeter of composite shapes such as L-shapes, T-shapes, and rectilinear figures by identifying all outer side lengths, including missing sides.",
  learningIntention:
    "Calculate the perimeter of composite shapes by adding all outer side lengths and using given information to find any missing sides.",
  successCriteria: [
    "Identify the outer boundary of a composite shape and list every side that forms part of the perimeter.",
    "Use the total length or width of the shape to find a missing side length.",
    "Recognise internal edges that join parts of the composite shape and do not form part of the perimeter.",
    "Calculate the perimeter of L-shapes, T-shapes, and other rectilinear composite figures.",
    "Solve problems where the perimeter is given and a missing side length must be found.",
  ],
  teaching: {
    paragraphs: [
      "A composite shape is made by joining two or more simpler shapes together. To find its perimeter, trace all the way around the outside and add every edge you cross. The key question is: which edges are on the outside, and which are internal joins that you should not count?",
      "Internal edges are the joins between the sub-shapes that end up inside the composite figure — like the invisible seam where two rectangles are glued together. Those internal edges are not part of the perimeter. Only the outer boundary counts.",
      "For rectilinear shapes (shapes made only of right-angle corners, like L-shapes and T-shapes), opposite outer edges must balance. For example, if an L-shape has a total width of 10 cm and one part of the top edge is 6 cm, the remaining top edge must be 10 − 6 = 4 cm. Use these relationships to find missing side lengths before adding.",
      "A common strategy is to label every outer side with a letter, fill in all the known lengths, work out any unknown lengths using opposites, and then sum everything. If the perimeter is already given and one side is unknown, set up an equation: total = sum of known sides + unknown side, then solve.",
    ],
    latexBlocks: [
      "P = \\text{sum of all outer side lengths}",
      "\\text{missing side} = \\text{total opposite length} - \\text{known partial length}",
    ],
  },
  workedExamples: [
    {
      title: "Perimeter of an L-shape",
      questionLatex:
        "\\text{An L-shape is formed by removing a }3\\text{ cm} \\times 2\\text{ cm rectangle from the top-right corner of a }7\\text{ cm} \\times 5\\text{ cm rectangle. Find the perimeter.}",
      steps: [
        {
          explanation:
            "List the outer sides. The total width is 7 cm and total height is 5 cm. The notch creates two extra sides: one horizontal of 3 cm removed, one vertical of 2 cm removed.",
          latex:
            "\\text{Bottom: } 7, \\text{ Right (lower): } 5-2=3, \\text{ Step horizontal: } 3, \\text{ Step vertical: } 2, \\text{ Top: } 7-3=4, \\text{ Left: } 5",
        },
        {
          explanation: "Add all six outer sides together.",
          latex: "P = 7 + 3 + 3 + 2 + 4 + 5 = 24 \\text{ cm}",
        },
      ],
      finalAnswerLatex: "P = 24 \\text{ cm}",
    },
    {
      title: "Finding a missing side then calculating perimeter",
      questionLatex:
        "\\text{A rectilinear shape has a total height of }8\\text{ m and a total width of }10\\text{ m. The shape is an L with a }4\\text{ m} \\times 3\\text{ m notch cut from the top-right. Find the perimeter.}",
      steps: [
        {
          explanation:
            "Find the missing horizontal side: the total width is 10 m, the top-left section is 10 − 4 = 6 m.",
          latex: "\\text{top-left} = 10 - 4 = 6 \\text{ m}",
        },
        {
          explanation:
            "Find the missing vertical side: the total height is 8 m, the right-side step is 8 − 3 = 5 m.",
          latex: "\\text{right lower} = 8 - 3 = 5 \\text{ m}",
        },
        {
          explanation: "List and add all six outer sides.",
          latex: "P = 10 + 5 + 4 + 3 + 6 + 8 = 36 \\text{ m}",
        },
      ],
      finalAnswerLatex: "P = 36 \\text{ m}",
    },
    {
      title: "Finding a missing side when perimeter is given",
      questionLatex:
        "\\text{A composite shape has perimeter }40\\text{ cm. Five of its six outer sides measure }6,\\,8,\\,4,\\,3,\\text{ and }9\\text{ cm. Find the missing side length in cm.}",
      steps: [
        {
          explanation: "Add the five known sides.",
          latex: "6 + 8 + 4 + 3 + 9 = 30 \\text{ cm}",
        },
        {
          explanation:
            "Subtract from the total perimeter to find the missing side.",
          latex: "\\text{missing} = 40 - 30 = 10 \\text{ cm}",
        },
      ],
      finalAnswerLatex: "\\text{missing side} = 10 \\text{ cm}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-per-com-g1",
      "An L-shape is made from two rectangles joined together. Which edges are NOT counted in the perimeter?",
      "C",
      [
        "The two longest outer edges",
        "The edges at the corners of the shape",
        "The internal edge where the two rectangles join",
        "All edges of both rectangles",
      ],
      "Internal edges are hidden inside the composite shape where the two pieces join. Only the outer boundary contributes to the perimeter.",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-per-com-g2",
      "An L-shape has outer sides of 8 cm, 5 cm, 3 cm, 2 cm, 5 cm, and 3 cm. Find its perimeter in cm.",
      "P = 8 + 5 + 3 + 2 + 5 + 3",
      "26",
      "Add all six outer sides: 8 + 5 + 3 + 2 + 5 + 3 = 26 cm."
    ),
    answer(
      "y7-per-com-g3",
      "A rectilinear shape has a total width of 12 cm. The lower part of the top edge measures 7 cm. Find the length of the remaining top-edge section in cm.",
      "\\text{missing} = 12 - 7",
      "5",
      "The two top-edge sections must add up to the total width of 12 cm. Missing section = 12 − 7 = 5 cm."
    ),
    answer(
      "y7-per-com-g4",
      "A composite shape has perimeter 50 cm. The sum of five of its six outer sides is 38 cm. Find the missing side length in cm.",
      "\\text{missing} = 50 - 38",
      "12",
      "Missing side = 50 − 38 = 12 cm."
    ),
  ],
  independentPractice: [
    answer(
      "y7-per-com-i1",
      "An L-shape has outer sides of 10 m, 6 m, 4 m, 2 m, 6 m, and 4 m. Find its perimeter in m.",
      "P = 10 + 6 + 4 + 2 + 6 + 4",
      "32",
      "Add all six outer sides: 10 + 6 + 4 + 2 + 6 + 4 = 32 m."
    ),
    answer(
      "y7-per-com-i2",
      "A T-shape has outer sides of 9 cm, 2 cm, 3 cm, 6 cm, 3 cm, 2 cm, and 9 cm. The remaining side is 12 cm. Find the perimeter in cm. (Hint: add all eight sides.)",
      "P = 9 + 2 + 3 + 6 + 3 + 2 + 9 + 12",
      "46",
      "P = 9 + 2 + 3 + 6 + 3 + 2 + 9 + 12 = 46 cm."
    ),
    answer(
      "y7-per-com-i3",
      "A rectilinear shape has a total height of 10 m. The upper section on one side is 4 m. Find the length of the lower section of that side in m.",
      "\\text{lower} = 10 - 4",
      "6",
      "The two vertical sections on one side must add to the total height: lower = 10 − 4 = 6 m."
    ),
    answer(
      "y7-per-com-i4",
      "A rectilinear shape has outer sides of 8 cm, 3 cm, 5 cm, and two unknown sides. The total width is 8 cm and total height is 6 cm. Find the perimeter in cm. (All angles are right angles; the shape is an L with 6 outer sides.)",
      "P = 8 + 6 + 3 + 3 + 5 + 3",
      "28",
      "Total width 8 cm; the missing horizontal = 8 − 3 = 5 cm, but that is already given. Missing vertical = 6 − 3 = 3 cm. Sides: 8, 6, 3, 3, 5, 3. P = 8 + 6 + 3 + 3 + 5 + 3 = 28 cm."
    ),
    answer(
      "y7-per-com-i5",
      "A composite shape has perimeter 64 m. Seven of its eight outer sides measure 12, 5, 8, 5, 4, 8, and 5 m. Find the missing side length in m.",
      "\\text{missing} = 64 - (12 + 5 + 8 + 5 + 4 + 8 + 5)",
      "17",
      "Sum of seven sides = 12 + 5 + 8 + 5 + 4 + 8 + 5 = 47 m. Missing side = 64 − 47 = 17 m."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Including an internal edge (the join between two sub-shapes) in the perimeter count.",
      fix: "Only add edges that lie on the outer boundary of the composite shape. Internal joins are not part of the perimeter.",
    },
    {
      mistake: "Forgetting to count a step side of an L-shape, treating the notch as if it weren't there.",
      fix: "Trace all the way around the outside and tick off each edge as you count it. An L-shape has six outer edges, not four.",
    },
    {
      mistake: "Using the total width or height as a single edge when only part of that edge is exposed.",
      fix: "A notch splits one full edge into two shorter ones. Use 'total − known part = missing part' to find each shorter section.",
    },
    {
      mistake: "Setting up the missing-side equation incorrectly: missing = total + known sides instead of total − known sides.",
      fix: "The perimeter is the total. If five sides add to 30 cm and the perimeter is 40 cm, the missing side = 40 − 30 = 10 cm.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-per-com-m1",
      "An L-shape has outer sides 6 cm, 4 cm, 2 cm, 2 cm, 4 cm, and 2 cm. Find its perimeter in cm.",
      "P = 6 + 4 + 2 + 2 + 4 + 2",
      "20",
      "P = 6 + 4 + 2 + 2 + 4 + 2 = 20 cm."
    ),
    choice(
      "y7-per-com-m2",
      "A rectilinear shape has a total width of 14 cm. One section of the top edge is 9 cm. What is the other top-edge section in cm?",
      "B",
      ["4 cm", "5 cm", "6 cm", "7 cm"],
      "Missing section = 14 − 9 = 5 cm."
    ),
    answer(
      "y7-per-com-m3",
      "A rectilinear shape has outer sides of 15 m, 8 m, 6 m, 4 m, 9 m, and 4 m. Find its perimeter in m.",
      "P = 15 + 8 + 6 + 4 + 9 + 4",
      "46",
      "P = 15 + 8 + 6 + 4 + 9 + 4 = 46 m."
    ),
    answer(
      "y7-per-com-m4",
      "A composite shape has perimeter 72 cm. Five of its six outer sides measure 18, 10, 6, 10, and 12 cm. Find the missing side length in cm.",
      "\\text{missing} = 72 - (18 + 10 + 6 + 10 + 12)",
      "16",
      "Sum of five sides = 18 + 10 + 6 + 10 + 12 = 56 cm. Missing side = 72 − 56 = 16 cm."
    ),
    answer(
      "y7-per-com-m5",
      "An L-shape is cut from a 10 cm × 8 cm rectangle by removing a 4 cm × 3 cm piece from the top-right corner. Find the perimeter of the L-shape in cm.",
      "P = 10 + 5 + 4 + 3 + 6 + 8",
      "36",
      "Sides: bottom 10, right lower (8 − 3 = 5), step horizontal 4, step vertical 3, top (10 − 4 = 6), left 8. P = 10 + 5 + 4 + 3 + 6 + 8 = 36 cm."
    ),
    answer(
      "y7-per-com-m6",
      "A rectilinear shape is made by joining two rectangles. The outer sides are 12 m, 4 m, 5 m, 2 m, 7 m, and an unknown side. The total height of the shape is 6 m and total width is 12 m. Find the unknown side in m.",
      "\\text{unknown} = 6 - 4 = 2 \\text{ (vertical section)}",
      "2",
      "The two left-side vertical sections must add to the total height 6 m. The known vertical section is 4 m, so unknown = 6 − 4 = 2 m."
    ),
    choice(
      "y7-per-com-m7",
      "Which statement about composite-shape perimeters is correct?",
      "D",
      [
        "Add all edges of every sub-shape, then subtract the number of joins.",
        "Multiply the number of outer sides by the longest side.",
        "Find the perimeter of each sub-shape and add them together.",
        "Add only the outer boundary edges, excluding any internal joins.",
      ],
      "The perimeter is the total distance around the outside of the composite shape. Internal edges where the pieces join are not counted."
    ),
    answer(
      "y7-per-com-m8",
      "A staircase shape has four steps, each 3 cm wide and 2 cm high. The overall width is 12 cm and overall height is 8 cm. Find the perimeter of the staircase shape in cm.",
      "P = 2 \\times 12 + 2 \\times 8",
      "40",
      "The perimeter of any staircase rectilinear shape equals 2 × total width + 2 × total height regardless of the number of steps. P = 2 × 12 + 2 × 8 = 24 + 16 = 40 cm."
    ),
    answer(
      "y7-per-com-m9",
      "A composite shape has perimeter 88 m. Seven of its eight outer sides sum to 65 m. Find the missing side in m.",
      "\\text{missing} = 88 - 65",
      "23",
      "Missing side = 88 − 65 = 23 m."
    ),
    answer(
      "y7-per-com-m10",
      "An L-shape has a total height of 9 cm and total width of 11 cm. A 5 cm × 4 cm rectangle is cut from the top-right corner. Find the perimeter of the L-shape in cm.",
      "P = 11 + 5 + 5 + 4 + 6 + 9",
      "40",
      "Sides: bottom 11, right lower (9 − 4 = 5), step horizontal 5, step vertical 4, top left (11 − 5 = 6), left 9. P = 11 + 5 + 5 + 4 + 6 + 9 = 40 cm."
    ),
  ],
  masteryQuizPool: [
    withDifficulty(
      answer(
        "y7-per-com-p1",
        "An L-shape has outer sides of 5 cm, 3 cm, 2 cm, 1 cm, 3 cm, and 2 cm. Find its perimeter in cm.",
        "P = 5 + 3 + 2 + 1 + 3 + 2",
        "16",
        "Add all six outer sides: 5 + 3 + 2 + 1 + 3 + 2 = 16 cm."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-com-p2",
        "A composite shape has outer sides of 4 m, 4 m, 4 m, 4 m, 4 m, and 4 m. Find its perimeter in m.",
        "P = 6 \\times 4",
        "24",
        "All six sides are 4 m: 6 × 4 = 24 m."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-com-p3",
        "A rectilinear shape has a total width of 10 cm. One section of the top edge is 6 cm. Find the remaining top-edge section in cm.",
        "10 - 6",
        "4",
        "The two top sections add to the total width: 10 − 6 = 4 cm."
      ),
      1
    ),
    withDifficulty(
      choice(
        "y7-per-com-p4",
        "How many outer edges does a simple L-shape have?",
        "C",
        ["4", "5", "6", "8"],
        "An L-shape has six outer edges: the notch adds two extra sides compared with a rectangle."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-com-p5",
        "An L-shape has outer sides of 9 m, 5 m, 4 m, 2 m, 5 m, and 3 m. Find its perimeter in m.",
        "P = 9 + 5 + 4 + 2 + 5 + 3",
        "28",
        "Add all six outer sides: 9 + 5 + 4 + 2 + 5 + 3 = 28 m."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-com-p6",
        "A composite shape has perimeter 40 cm. The sum of five of its six outer sides is 31 cm. Find the missing side in cm.",
        "40 - 31",
        "9",
        "Missing side = 40 − 31 = 9 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-com-p7",
        "A rectilinear shape has a total height of 12 cm. The upper vertical section on one side is 5 cm. Find the lower section of that side in cm.",
        "12 - 5",
        "7",
        "The two vertical sections add to the total height: 12 − 5 = 7 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-com-p8",
        "An L-shape has outer sides of 7 cm, 4 cm, 3 cm, 2 cm, 4 cm, and 2 cm. Find its perimeter in cm.",
        "P = 7 + 4 + 3 + 2 + 4 + 2",
        "22",
        "Add all six outer sides: 7 + 4 + 3 + 2 + 4 + 2 = 22 cm."
      ),
      2
    ),
    withDifficulty(
      choice(
        "y7-per-com-p9",
        "A rectilinear shape has a total width of 16 cm. One top-edge section is 11 cm. What is the other section in cm?",
        "B",
        ["4 cm", "5 cm", "6 cm", "7 cm"],
        "Missing section = 16 − 11 = 5 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-com-p10",
        "A composite shape has perimeter 60 m. Five of its six outer sides measure 14, 8, 6, 8, and 10 m. Find the missing side in m.",
        "60 - (14 + 8 + 6 + 8 + 10)",
        "14",
        "Sum of five sides = 46 m. Missing side = 60 − 46 = 14 m."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-com-p11",
        "An L-shape is cut from an 8 cm × 6 cm rectangle by removing a 3 cm × 2 cm piece from the top-right corner. Find the perimeter of the L-shape in cm.",
        "P = 8 + 4 + 3 + 2 + 5 + 6",
        "28",
        "Sides: bottom 8, right lower (6 − 2 = 4), step horizontal 3, step vertical 2, top (8 − 3 = 5), left 6. P = 8 + 4 + 3 + 2 + 5 + 6 = 28 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-com-p12",
        "A staircase rectilinear shape has overall width 15 cm and overall height 9 cm. Find its perimeter in cm.",
        "P = 2 \\times 15 + 2 \\times 9",
        "48",
        "A staircase rectilinear shape has perimeter 2 × width + 2 × height = 30 + 18 = 48 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-com-p13",
        "A T-shape has outer sides of 10 cm, 3 cm, 2 cm, 4 cm, 2 cm, 3 cm, 10 cm, and 17 cm. Find its perimeter in cm.",
        "P = 10 + 3 + 2 + 4 + 2 + 3 + 10 + 17",
        "51",
        "Add all eight outer sides: 10 + 3 + 2 + 4 + 2 + 3 + 10 + 17 = 51 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-com-p14",
        "A rectilinear shape has a total width of 14 m and total height of 10 m. It is an L formed by cutting a 6 m × 4 m notch from the top-right corner. Find the perimeter in m.",
        "P = 14 + 6 + 6 + 4 + 8 + 10",
        "48",
        "Sides: bottom 14, right lower (10 − 4 = 6), step horizontal 6, step vertical 4, top (14 − 6 = 8), left 10. P = 14 + 6 + 6 + 4 + 8 + 10 = 48 m."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-com-p15",
        "A composite shape has perimeter 72 cm. Seven of its eight outer sides sum to 55 cm. Find the missing side in cm.",
        "72 - 55",
        "17",
        "Missing side = 72 − 55 = 17 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-com-p16",
        "An L-shape is cut from a 12 cm × 9 cm rectangle by removing a 5 cm × 4 cm piece from the top-right corner. Find the perimeter of the L-shape in cm.",
        "P = 12 + 5 + 5 + 4 + 7 + 9",
        "42",
        "Sides: bottom 12, right lower (9 − 4 = 5), step horizontal 5, step vertical 4, top (12 − 5 = 7), left 9. P = 12 + 5 + 5 + 4 + 7 + 9 = 42 cm."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-com-p17",
        "A staircase shape has 5 steps, each 2 cm wide and 3 cm high. The overall width is 10 cm and overall height is 15 cm. Find the perimeter in cm.",
        "P = 2 \\times 10 + 2 \\times 15",
        "50",
        "A staircase rectilinear shape has perimeter 2 × width + 2 × height = 20 + 30 = 50 cm, regardless of the number of steps."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-com-p18",
        "A rectilinear shape has a total height of 13 cm. Its left side is split into two vertical sections; the upper one is 8 cm. The right side has one section of 5 cm and one unknown section. Find the unknown right-side section in cm.",
        "13 - 5",
        "8",
        "The right side's two sections must add to the total height 13 cm: 13 − 5 = 8 cm."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-com-p19",
        "A composite shape has perimeter 100 m. Seven of its eight outer sides measure 20, 12, 8, 12, 6, 8, and 10 m. Find the missing side in m.",
        "100 - (20 + 12 + 8 + 12 + 6 + 8 + 10)",
        "24",
        "Sum of seven sides = 76 m. Missing side = 100 − 76 = 24 m."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-com-p20",
        "An L-shape is cut from a 20 cm × 14 cm rectangle by removing an 8 cm × 6 cm piece from a top corner. Find the perimeter of the L-shape in cm.",
        "P = 20 + 8 + 8 + 6 + 12 + 14",
        "68",
        "Sides: bottom 20, right lower (14 − 6 = 8), step horizontal 8, step vertical 6, top (20 − 8 = 12), left 14. P = 20 + 8 + 8 + 6 + 12 + 14 = 68 cm."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-com-p21",
        "Two identical 6 cm × 4 cm rectangles are joined along a full 4 cm side to form one larger rectangle. Find the perimeter of the combined shape in cm.",
        "P = 2(12 + 4)",
        "32",
        "Joining along the 4 cm sides gives a 12 cm × 4 cm rectangle (the 4 cm join is internal). P = 2(12 + 4) = 2 × 16 = 32 cm."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-com-p22",
        "A plus (+) shaped figure is made from five identical 3 cm × 3 cm squares (one centre square with one square on each side). Find the perimeter of the plus shape in cm.",
        "P = 12 \\times 3",
        "36",
        "The plus shape has 12 exposed outer edges, each 3 cm long. P = 12 × 3 = 36 cm."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-com-p23",
        "A rectilinear shape has overall width 18 cm and overall height 11 cm. It has two notches cut from the top edge, but all corners are right angles and no notch reaches the bottom. Find the perimeter in cm. (Hint: for such a top-notched shape the perimeter still equals 2 × width + 2 × height plus twice the total depth of the notches; here the notches have total depth 0 because each cut piece is replaced by an equal step — treat it as a plain staircase outline.)",
        "P = 2 \\times 18 + 2 \\times 11",
        "58",
        "When every notch is a right-angle step that does not create overhangs, the horizontal edges still sum to 2 × width and the vertical edges to 2 × height. P = 2 × 18 + 2 × 11 = 36 + 22 = 58 cm."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-com-p24",
        "An L-shaped room has a total width of 7 m and total height of 5 m. A 3 m × 2 m rectangle is removed from one corner. Skirting board runs around the entire inside wall. Find the total length of skirting board needed in m.",
        "P = 7 + 3 + 3 + 2 + 4 + 5",
        "24",
        "Sides: 7, right lower (5 − 2 = 3), step 3, step 2, top (7 − 3 = 4), left 5. P = 7 + 3 + 3 + 2 + 4 + 5 = 24 m."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-com-p25",
        "A composite shape is made of a 10 cm × 6 cm rectangle with a 6 cm × 6 cm square joined onto one full 6 cm end. Find the perimeter of the combined shape in cm.",
        "P = 2(16 + 6)",
        "44",
        "Joining the square onto the full 6 cm end gives a 16 cm × 6 cm rectangle (the 6 cm join is internal). P = 2(16 + 6) = 2 × 22 = 44 cm."
      ),
      5
    ),
  ],
  multiPartPractice: [
    {
      id: "y7-per-com-mp1",
      prompt:
        "An L-shaped patio is formed by removing a rectangular corner piece from a larger rectangle. The full rectangle is 12 m wide and 8 m tall. A piece 5 m wide and 3 m tall is removed from the top-right corner, leaving an L-shape with six outer sides (going clockwise from the bottom-left): bottom 12 m, left 8 m, top-left section, a step down, a step across, and the right side.",
      latex: "\\text{width} = 12,\\ \\text{height} = 8,\\ \\text{notch} = 5 \\times 3",
      answer: "40",
      hint: "Use 'total − removed part' to find the top-left and right-lower sections, then add all six outer sides.",
      explanation:
        "Part (a): top-left section = 12 − 5 = 7 m. Part (b): right-lower section = 8 − 3 = 5 m. Part (c): the six sides are bottom 12, left 8, top-left 7, step-down 3, step-across 5, right-lower 5. P = 12 + 8 + 7 + 3 + 5 + 5 = 40 m.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "Find the length of the top-left horizontal section (total width minus the removed width), in metres.",
          latex: "12 - 5",
          marks: 1,
          answer: "7",
          acceptedAnswers: ["7.0"],
          hint: "Subtract the removed width from the total width.",
          explanation: "Top-left section = 12 − 5 = 7 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "Find the length of the right-lower vertical section (total height minus the removed height), in metres.",
          latex: "8 - 3",
          marks: 1,
          answer: "5",
          acceptedAnswers: ["5.0"],
          hint: "Subtract the removed height from the total height.",
          explanation: "Right-lower section = 8 − 3 = 5 m.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "Using your answers, find the perimeter of the L-shaped patio, in metres.",
          latex: "12 + 8 + 7 + 3 + 5 + 5",
          marks: 2,
          answer: "40",
          acceptedAnswers: ["40.0"],
          hint: "Add all six outer sides: bottom 12, left 8, top-left 7, step-down 3, step-across 5, right-lower 5.",
          explanation: "P = 12 + 8 + 7 + 3 + 5 + 5 = 40 m.",
        },
      ],
    },
  ],
};

// ─── Lesson 3: Perimeter Problem Solving ────────────────────────────────────

const perimeterProblemSolving: LessonContent = {
  description:
    "Apply perimeter in real-world contexts such as fencing paddocks, framing pictures, and edging garden beds, working with decimal and fractional side lengths and unit conversions.",
  learningIntention:
    "Solve real-world problems involving perimeter, including contexts with decimal side lengths, unit conversions within problems, and finding a missing side when total cost or length is given.",
  successCriteria: [
    "Apply the perimeter formula to real-world contexts such as fencing, framing, and edging.",
    "Calculate perimeter when side lengths are decimals or simple fractions.",
    "Convert between millimetres, centimetres, and metres within a perimeter problem before adding sides.",
    "Find the total cost of fencing or framing by multiplying perimeter by the cost per unit length.",
    "Find a missing side length when total material length or cost is given.",
  ],
  teaching: {
    paragraphs: [
      "Perimeter problems appear constantly in the real world. A builder needs to know the total length of timber to frame a room. A gardener needs the total length of edging to border a garden bed. A picture framer needs the total length of frame material to fit around a photograph. In every case, you are finding the total distance around the outside of a shape.",
      "When side lengths involve decimals, the process is identical — just add them carefully. For a rectangular lawn that is 6.5 m by 3.2 m, the perimeter is 2 × (6.5 + 3.2) = 2 × 9.7 = 19.4 m. The same formula applies; the arithmetic just involves decimals.",
      "Unit conversions inside a problem are essential. If some sides are in metres and others are in centimetres, convert everything to one unit before adding. Remember: 1 m = 100 cm, 1 cm = 10 mm. Once you have the perimeter in a consistent unit, you can then convert the final answer if needed.",
      "Many real-world problems combine perimeter with cost. If fencing costs $12 per metre and the perimeter is 48 m, the total cost is 48 × $12 = $576. Read the question carefully — sometimes you are given the budget and must work backwards to find the missing side or maximum possible dimension.",
    ],
    latexBlocks: [
      "\\text{Total cost} = \\text{perimeter} \\times \\text{cost per unit length}",
      "1\\text{ m} = 100\\text{ cm}, \\quad 1\\text{ cm} = 10\\text{ mm}",
    ],
  },
  workedExamples: [
    {
      title: "Fencing a rectangular paddock",
      questionLatex:
        "\\text{A rectangular paddock is }24\\text{ m long and }15\\text{ m wide. Fencing costs }\\$8\\text{ per metre. Find the total fencing cost.}",
      steps: [
        {
          explanation: "Find the perimeter of the rectangular paddock.",
          latex: "P = 2(24 + 15) = 2 \\times 39 = 78 \\text{ m}",
        },
        {
          explanation: "Multiply the perimeter by the cost per metre.",
          latex: "\\text{Cost} = 78 \\times 8 = \\$624",
        },
      ],
      finalAnswerLatex: "\\text{Total cost} = \\$624",
    },
    {
      title: "Perimeter with decimal side lengths",
      questionLatex:
        "\\text{A garden bed is }3.5\\text{ m long and }1.8\\text{ m wide. Find the length of edging needed in metres.}",
      steps: [
        {
          explanation:
            "Use the rectangle perimeter formula with decimal side lengths.",
          latex: "P = 2(3.5 + 1.8) = 2 \\times 5.3",
        },
        {
          explanation: "Multiply to get the total edging length.",
          latex: "P = 10.6 \\text{ m}",
        },
      ],
      finalAnswerLatex: "P = 10.6 \\text{ m of edging needed}",
    },
    {
      title: "Unit conversion within a perimeter problem",
      questionLatex:
        "\\text{A picture frame is made for a photo that is }45\\text{ cm wide and }600\\text{ mm tall. Find the total length of framing material needed in cm.}",
      steps: [
        {
          explanation:
            "Convert the height to centimetres so both measurements share the same unit.",
          latex: "600 \\text{ mm} = 60 \\text{ cm}",
        },
        {
          explanation: "Find the perimeter of the rectangle.",
          latex: "P = 2(45 + 60) = 2 \\times 105 = 210 \\text{ cm}",
        },
      ],
      finalAnswerLatex: "P = 210 \\text{ cm of framing material needed}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-per-prb-g1",
      "A rectangular paddock is 20 m long and 12 m wide. How much fencing is needed in metres?",
      "B",
      ["32 m", "64 m", "240 m", "56 m"],
      "P = 2(20 + 12) = 2 × 32 = 64 m."
    ),
    answer(
      "y7-per-prb-g2",
      "A rectangular garden bed is 4.5 m long and 2 m wide. Find the total length of edging needed in m.",
      "P = 2(4.5 + 2)",
      "13",
      "P = 2(4.5 + 2) = 2 × 6.5 = 13 m."
    ),
    answer(
      "y7-per-prb-g3",
      "A picture frame is made for a photo 30 cm wide and 40 cm tall. Find the total length of frame material needed in cm.",
      "P = 2(30 + 40)",
      "140",
      "P = 2(30 + 40) = 2 × 70 = 140 cm."
    ),
    answer(
      "y7-per-prb-g4",
      "Fencing for a rectangular paddock costs $5 per metre. The paddock has perimeter 80 m. Find the total fencing cost in dollars.",
      "\\text{Cost} = 80 \\times 5",
      "400",
      "Total cost = 80 × $5 = $400."
    ),
  ],
  independentPractice: [
    answer(
      "y7-per-prb-i1",
      "A rectangular lawn is 8.5 m long and 5.5 m wide. Find the total length of garden edging needed in m.",
      "P = 2(8.5 + 5.5)",
      "28",
      "P = 2(8.5 + 5.5) = 2 × 14 = 28 m."
    ),
    answer(
      "y7-per-prb-i2",
      "A photo frame is 250 mm wide and 350 mm tall. Find the total length of framing material needed in mm.",
      "P = 2(250 + 350)",
      "1200",
      "P = 2(250 + 350) = 2 × 600 = 1200 mm."
    ),
    answer(
      "y7-per-prb-i3",
      "A rectangular paddock is 30 m long and 18 m wide. Fencing costs $9 per metre. Find the total cost of fencing in dollars.",
      "P = 2(30 + 18) = 96 \\text{ m}; \\text{ Cost} = 96 \\times 9",
      "864",
      "P = 2(30 + 18) = 96 m. Cost = 96 × $9 = $864."
    ),
    answer(
      "y7-per-prb-i4",
      "A rectangular garden border requires 26 m of edging. The garden is 8 m wide. Find the length of the garden in m.",
      "2(l + 8) = 26",
      "5",
      "2(l + 8) = 26, so l + 8 = 13, so l = 5 m."
    ),
    answer(
      "y7-per-prb-i5",
      "A path around a rectangular pool is edged with timber. The pool is 1.5 m wide and 250 cm long. Find the total length of timber needed in cm.",
      "P = 2(250 + 150)",
      "800",
      "Convert 1.5 m to 150 cm. P = 2(250 + 150) = 2 × 400 = 800 cm."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding only two sides of a rectangle when calculating fencing (P = l + w instead of P = 2(l + w)).",
      fix: "A rectangular paddock has four sides. The fencing goes all the way around, so P = 2(l + w).",
    },
    {
      mistake: "Mixing units — for example, adding 3 m and 50 cm to get 53 (wrong unit) without converting.",
      fix: "Convert all side lengths to the same unit before adding. 3 m = 300 cm; then 300 + 50 = 350 cm.",
    },
    {
      mistake: "Multiplying perimeter by cost per metre without first finding the perimeter.",
      fix: "Step 1: find the perimeter. Step 2: multiply by the cost per unit length. Never skip step 1.",
    },
    {
      mistake: "Confusing the total budget with the cost per metre when working backwards.",
      fix: "To find the perimeter from total cost, divide: perimeter = total cost ÷ cost per metre. Then use the perimeter formula to find the unknown side.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-per-prb-m1",
      "A rectangular paddock is 35 m long and 20 m wide. Find the perimeter in m.",
      "P = 2(35 + 20)",
      "110",
      "P = 2(35 + 20) = 2 × 55 = 110 m."
    ),
    answer(
      "y7-per-prb-m2",
      "A garden bed is 6.4 m long and 2.5 m wide. Find the total edging length needed in m.",
      "P = 2(6.4 + 2.5)",
      "17.8",
      "P = 2(6.4 + 2.5) = 2 × 8.9 = 17.8 m."
    ),
    choice(
      "y7-per-prb-m3",
      "A rectangular paddock needs fencing costing $11 per metre. The paddock is 14 m long and 10 m wide. What is the total cost?",
      "C",
      ["$264", "$308", "$528", "$154"],
      "P = 2(14 + 10) = 48 m. Cost = 48 × $11 = $528."
    ),
    answer(
      "y7-per-prb-m4",
      "A picture frame surrounds a photo that is 28 cm wide and 350 mm tall. Find the perimeter of the frame in cm.",
      "P = 2(28 + 35)",
      "126",
      "Convert 350 mm to 35 cm. P = 2(28 + 35) = 2 × 63 = 126 cm."
    ),
    answer(
      "y7-per-prb-m5",
      "A rectangular lawn has perimeter 46 m. The width is 9 m. Find the length of the lawn in m.",
      "2(l + 9) = 46",
      "14",
      "2(l + 9) = 46, so l + 9 = 23, so l = 14 m."
    ),
    answer(
      "y7-per-prb-m6",
      "Timber edging costs $4.50 per metre. A rectangular garden bed is 5 m long and 3 m wide. Find the total cost of edging in dollars.",
      "P = 2(5 + 3) = 16; \\text{ Cost} = 16 \\times 4.5",
      "72",
      "P = 2(5 + 3) = 16 m. Cost = 16 × $4.50 = $72.",
      ["72.00", "72.0"]
    ),
    answer(
      "y7-per-prb-m7",
      "A farmer has 120 m of fencing. He wants to fence a rectangular paddock with length 36 m. What is the maximum width of the paddock in m?",
      "2(36 + w) = 120",
      "24",
      "2(36 + w) = 120, so 36 + w = 60, so w = 24 m."
    ),
    choice(
      "y7-per-prb-m8",
      "A rectangular photo is 1.2 m wide and 80 cm tall. What length of framing material is needed?",
      "A",
      ["400 cm", "96 cm", "200 cm", "192 cm"],
      "Convert 1.2 m to 120 cm. P = 2(120 + 80) = 2 × 200 = 400 cm."
    ),
    answer(
      "y7-per-prb-m9",
      "A path around a square courtyard needs 52 m of pavers. Find the side length of the courtyard in m.",
      "4s = 52",
      "13",
      "P = 4s = 52, so s = 52 ÷ 4 = 13 m."
    ),
    answer(
      "y7-per-prb-m10",
      "Fencing for a paddock costs $6 per metre. A farmer spends $420 on fencing. The paddock is square. Find the side length in m.",
      "\\text{Perimeter} = 420 \\div 6 = 70; \\quad s = 70 \\div 4",
      "17.5",
      "Total perimeter = $420 ÷ $6 = 70 m. A square has 4 equal sides, so s = 70 ÷ 4 = 17.5 m."
    ),
  ],
  masteryQuizPool: [
    withDifficulty(
      answer(
        "y7-per-prb-p1",
        "A rectangular paddock is 10 m long and 6 m wide. Find the perimeter in m.",
        "P = 2(10 + 6)",
        "32",
        "P = 2(10 + 6) = 2 × 16 = 32 m."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p2",
        "A square garden has side length 4 m. Find the length of edging needed in m.",
        "P = 4 \\times 4",
        "16",
        "P = 4 × 4 = 16 m."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p3",
        "Fencing costs $10 per metre. A paddock has perimeter 30 m. Find the total cost in dollars.",
        "30 \\times 10",
        "300",
        "Total cost = 30 × $10 = $300."
      ),
      1
    ),
    withDifficulty(
      choice(
        "y7-per-prb-p4",
        "How many centimetres are there in 1 metre?",
        "C",
        ["10", "1000", "100", "10000"],
        "1 m = 100 cm."
      ),
      1
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p5",
        "A rectangular lawn is 7.5 m long and 2.5 m wide. Find the perimeter in m.",
        "P = 2(7.5 + 2.5)",
        "20",
        "P = 2(7.5 + 2.5) = 2 × 10 = 20 m."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p6",
        "A photo frame surrounds a photo 20 cm wide and 30 cm tall. Find the length of framing material needed in cm.",
        "P = 2(20 + 30)",
        "100",
        "P = 2(20 + 30) = 2 × 50 = 100 cm."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p7",
        "Fencing costs $7 per metre. A paddock is 12 m long and 8 m wide. Find the total cost in dollars.",
        "P = 2(12 + 8) = 40; \\ 40 \\times 7",
        "280",
        "P = 2(12 + 8) = 40 m. Cost = 40 × $7 = $280."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p8",
        "A garden bed is 3.2 m long and 1.8 m wide. Find the total edging length in m.",
        "P = 2(3.2 + 1.8)",
        "10",
        "P = 2(3.2 + 1.8) = 2 × 5 = 10 m."
      ),
      2
    ),
    withDifficulty(
      choice(
        "y7-per-prb-p9",
        "A rectangular paddock is 25 m long and 15 m wide. How much fencing is needed?",
        "B",
        ["40 m", "80 m", "375 m", "160 m"],
        "P = 2(25 + 15) = 2 × 40 = 80 m."
      ),
      2
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p10",
        "A photo is 40 cm wide and 250 mm tall. Find the perimeter of its frame in cm. (Convert 250 mm to 25 cm first.)",
        "P = 2(40 + 25)",
        "130",
        "Convert 250 mm to 25 cm. P = 2(40 + 25) = 2 × 65 = 130 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p11",
        "A rectangular lawn has perimeter 38 m. The width is 7 m. Find the length in m.",
        "2(l + 7) = 38",
        "12",
        "2(l + 7) = 38, so l + 7 = 19, so l = 12 m."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p12",
        "Timber edging costs $3.50 per metre. A rectangular bed is 6 m long and 2 m wide. Find the total cost in dollars.",
        "P = 2(6 + 2) = 16; \\ 16 \\times 3.5",
        "56",
        "P = 2(6 + 2) = 16 m. Cost = 16 × $3.50 = $56.",
        ["56.00", "56.0"]
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p13",
        "A square courtyard needs 48 m of pavers around its edge. Find its side length in m.",
        "4s = 48",
        "12",
        "P = 4s = 48, so s = 48 ÷ 4 = 12 m."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p14",
        "A path runs around a rectangular pool that is 2 m wide and 350 cm long. Find the total length of timber edging in cm. (Convert 2 m to 200 cm first.)",
        "P = 2(350 + 200)",
        "1100",
        "Convert 2 m to 200 cm. P = 2(350 + 200) = 2 × 550 = 1100 cm."
      ),
      3
    ),
    withDifficulty(
      choice(
        "y7-per-prb-p15",
        "A rectangular photo is 1.5 m wide and 90 cm tall. What length of framing material is needed?",
        "A",
        ["480 cm", "240 cm", "180 cm", "320 cm"],
        "Convert 1.5 m to 150 cm. P = 2(150 + 90) = 2 × 240 = 480 cm."
      ),
      3
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p16",
        "A farmer has 96 m of fencing for a rectangular paddock of length 30 m. Find the maximum width in m.",
        "2(30 + w) = 96",
        "18",
        "2(30 + w) = 96, so 30 + w = 48, so w = 18 m."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p17",
        "Fencing costs $8 per metre. A farmer spends $512 fencing a square paddock. Find the side length in m.",
        "512 \\div 8 = 64; \\ s = 64 \\div 4",
        "16",
        "Perimeter = $512 ÷ $8 = 64 m. A square has 4 equal sides, so s = 64 ÷ 4 = 16 m."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p18",
        "A rectangular garden bed is 5.5 m long and 3.5 m wide. Edging costs $6 per metre. Find the total cost in dollars.",
        "P = 2(5.5 + 3.5) = 18; \\ 18 \\times 6",
        "108",
        "P = 2(5.5 + 3.5) = 2 × 9 = 18 m. Cost = 18 × $6 = $108."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p19",
        "A rectangular paddock has perimeter 84 m. Its length is 26 m. Fencing costs $5 per metre. Find the total fencing cost in dollars.",
        "84 \\times 5",
        "420",
        "The whole perimeter is fenced: 84 × $5 = $420. (The 26 m length is extra information.)"
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p20",
        "A photo is 600 mm wide and 0.45 m tall. Find the perimeter of its frame in cm. (Convert 600 mm to 60 cm and 0.45 m to 45 cm.)",
        "P = 2(60 + 45)",
        "210",
        "600 mm = 60 cm and 0.45 m = 45 cm. P = 2(60 + 45) = 2 × 105 = 210 cm."
      ),
      4
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p21",
        "A farmer has 150 m of fencing to enclose a square paddock. Find the side length in m.",
        "4s = 150",
        "37.5",
        "P = 4s = 150, so s = 150 ÷ 4 = 37.5 m."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p22",
        "A rectangular paddock is twice as long as it is wide and needs 120 m of fencing. Find the width in m.",
        "2(2w + w) = 120",
        "20",
        "Length = 2w, so 2(2w + w) = 120, giving 6w = 120, so w = 20 m."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p23",
        "Edging costs $4 per metre. A gardener has a budget of $96. What is the perimeter, in metres, of the largest bed she can edge?",
        "96 \\div 4",
        "24",
        "Perimeter she can afford = $96 ÷ $4 = 24 m of edging."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p24",
        "A rectangular lawn is 9.5 m long and 4.5 m wide. A second, square lawn has the same perimeter. Find the side length of the square lawn in m.",
        "P = 2(9.5 + 4.5) = 28; \\ s = 28 \\div 4",
        "7",
        "Rectangle perimeter = 2(9.5 + 4.5) = 28 m. For the square, 4s = 28, so s = 7 m."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p25",
        "Fencing costs $9 per metre. A rectangular paddock is 18 m long and 11 m wide, but one full 18 m side runs along an existing wall and needs no fencing. Find the cost of fencing the other three sides in dollars.",
        "(18 + 11 + 11) \\times 9",
        "360",
        "Three sides are fenced: 18 + 11 + 11 = 40 m. Cost = 40 × $9 = $360."
      ),
      5
    ),
    withDifficulty(
      answer(
        "y7-per-prb-p26",
        "A square paving costs $12 per metre of edging. A homeowner pays $336 to edge a square courtyard completely. Find the side length of the courtyard in m.",
        "336 \\div 12 = 28; \\ s = 28 \\div 4",
        "7",
        "Perimeter = $336 ÷ $12 = 28 m. A square has 4 equal sides, so s = 28 ÷ 4 = 7 m."
      ),
      5
    ),
  ],
  multiPartPractice: [
    {
      id: "y7-per-prb-mp1",
      prompt:
        "A rectangular paddock is 35 m long and 25 m wide. A farmer wants to fence it completely. The fencing wire costs $6 per metre.",
      latex: "P = 2(l + w), \\quad \\text{cost} = P \\times \\text{rate}",
      answer: "720",
      hint: "Find the perimeter first, then multiply by the cost per metre. For part (c), divide the budget by the rate.",
      explanation:
        "Part (a): perimeter = 2(35 + 25) = 2 × 60 = 120 m. Part (b): cost = 120 × $6 = $720. Part (c): with $900, the farmer can buy 900 ÷ 6 = 150 m of fencing.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the perimeter of the paddock, in metres.",
          latex: "P = 2(35 + 25)",
          marks: 1,
          answer: "120",
          acceptedAnswers: ["120.0"],
          hint: "Use P = 2(l + w) with l = 35 and w = 25.",
          explanation: "P = 2(35 + 25) = 2 × 60 = 120 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the total cost of fencing the paddock, in dollars.",
          latex: "120 \\times 6",
          marks: 1,
          answer: "720",
          acceptedAnswers: ["720.00", "720.0"],
          hint: "Multiply the perimeter by the cost per metre.",
          explanation: "Cost = 120 × $6 = $720.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "If the farmer's budget is $900, how many metres of fencing can be bought at $6 per metre?",
          latex: "900 \\div 6",
          marks: 1,
          answer: "150",
          acceptedAnswers: ["150.0"],
          hint: "Divide the budget by the cost per metre.",
          explanation: "Fencing affordable = 900 ÷ 6 = 150 m.",
        },
      ],
    },
  ],
};

// ─── Lesson registry ─────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "perimeter-of-polygons": perimeterOfPolygons,
  "perimeter-composite-shapes": perimeterCompositeShapes,
  "perimeter-problem-solving": perimeterProblemSolving,
};

// ─── Export function ──────────────────────────────────────────────────────────

export function year7PerimeterLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "perimeter") {
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
