import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
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
    hint: "Use the area formula for this shape and substitute the given measurements.",
    explanation,
    ...extra,
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
    hint: "Recall the area formula taught in this lesson.",
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

// ─── Lesson 1: Rectangles and Triangles ───────────────────────────────────────

const areaRectanglesTriangles: LessonContent = {
  description: "Calculate the area of rectangles, squares, and triangles using the correct formula, and find missing dimensions when the area is known.",
  learningIntention: "Apply the area formulas for rectangles, squares, and triangles, including identifying the perpendicular height of a triangle.",
  successCriteria: [
    "Calculate the area of a rectangle using A = lw.",
    "Calculate the area of a square using A = s².",
    "Identify the perpendicular height of a triangle (not the slant side).",
    "Calculate the area of a triangle using A = ½bh.",
    "Find a missing dimension when the area and one side are given.",
  ],
  teaching: {
    paragraphs: [
      "Area measures the amount of flat surface inside a shape. We express it in square units — square centimetres (cm²), square metres (m²), and so on — because area counts how many unit squares fit inside the shape.",
      "A rectangle with length 5 cm and width 3 cm can be covered by exactly 5 × 3 = 15 unit squares arranged in rows. That is why the formula is A = l × w. A square is a special rectangle where all sides are equal, so A = s × s = s².",
      "A triangle is exactly half of a rectangle. If you cut any rectangle along a diagonal, you get two identical triangles, each with area half the rectangle. The formula A = ½ × base × height uses the perpendicular height — the straight-up distance from the base to the opposite vertex, not the slant side.",
      "When a triangle is not a right-angled triangle, the perpendicular height is often shown as a dotted line drawn inside (or outside) the shape. Always use that dotted height, never the slant edge, in the formula.",
      "To find a missing dimension, rearrange the formula. If A = ½bh and you know A and b, then h = 2A ÷ b. This is the same as solving a simple equation for the unknown.",
    ],
    latexBlocks: [
      "A_{\\text{rectangle}} = l \\times w \\qquad A_{\\text{square}} = s^2",
      "A_{\\text{triangle}} = \\frac{1}{2} \\times b \\times h",
      "\\text{If } A = \\frac{1}{2}bh \\text{, then } h = \\frac{2A}{b} \\text{ and } b = \\frac{2A}{h}",
    ],
  },
  workedExamples: [
    {
      title: "Area of a triangle using perpendicular height",
      questionLatex: "\\text{Find the area of a triangle with base }8\\text{ cm and perpendicular height }5\\text{ cm.}",
      steps: [
        { explanation: "Write the area formula for a triangle.", latex: "A = \\frac{1}{2} \\times b \\times h" },
        { explanation: "Substitute the base and the perpendicular height (not a slant side).", latex: "A = \\frac{1}{2} \\times 8 \\times 5" },
        { explanation: "Multiply to find the area.", latex: "A = \\frac{1}{2} \\times 40 = 20" },
      ],
      finalAnswerLatex: "A = 20 \\text{ cm}^2",
    },
    {
      title: "Find the missing length given the area",
      questionLatex: "\\text{A rectangle has area }48\\text{ cm}^2\\text{ and length }8\\text{ cm. Find the width.}",
      steps: [
        { explanation: "Write the area formula and substitute the known values.", latex: "48 = 8 \\times w" },
        { explanation: "Divide both sides by 8 to find the width.", latex: "w = \\frac{48}{8} = 6" },
      ],
      finalAnswerLatex: "w = 6 \\text{ cm}",
    },
    {
      title: "Area of a square",
      questionLatex: "\\text{Find the area of a square tile with side length }9\\text{ cm.}",
      steps: [
        { explanation: "Write the area formula for a square.", latex: "A = s^2" },
        { explanation: "Substitute the side length.", latex: "A = 9^2 = 81" },
      ],
      finalAnswerLatex: "A = 81 \\text{ cm}^2",
    },
  ],
  guidedPractice: [
    choice(
      "y7-are-rtr-g1",
      "A triangle has base 10 cm and perpendicular height 6 cm. Which calculation gives its area in cm²?",
      "B",
      ["10 × 6", "½ × 10 × 6", "10 + 6", "2 × 10 × 6"],
      "Area of a triangle = ½ × base × height = ½ × 10 × 6 = 30 cm².",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-are-rtr-g2",
      "Find the area of a rectangle with length 12 cm and width 5 cm. Give your answer in cm².",
      "A = l \\times w",
      "60",
      "A = 12 × 5 = 60 cm²."
    ),
    answer(
      "y7-are-rtr-g3",
      "Find the area of a triangle with base 14 cm and perpendicular height 6 cm. Give your answer in cm².",
      "A = \\frac{1}{2} \\times b \\times h",
      "42",
      "A = ½ × 14 × 6 = ½ × 84 = 42 cm²."
    ),
    answer(
      "y7-are-rtr-g4",
      "A triangle has area 30 cm² and base 10 cm. Find the perpendicular height in cm.",
      "h = \\frac{2A}{b}",
      "6",
      "h = 2 × 30 ÷ 10 = 60 ÷ 10 = 6 cm."
    ),
  ],
  independentPractice: [
    answer(
      "y7-are-rtr-i1",
      "Find the area of a square with side length 7 m. Give your answer in m².",
      "A = s^2",
      "49",
      "A = 7² = 49 m²."
    ),
    answer(
      "y7-are-rtr-i2",
      "Find the area of a rectangle with length 15 mm and width 4 mm. Give your answer in mm².",
      "A = l \\times w",
      "60",
      "A = 15 × 4 = 60 mm²."
    ),
    answer(
      "y7-are-rtr-i3",
      "A triangle has base 9 cm and perpendicular height 8 cm. Find its area in cm².",
      "A = \\frac{1}{2} \\times b \\times h",
      "36",
      "A = ½ × 9 × 8 = ½ × 72 = 36 cm²."
    ),
    answer(
      "y7-are-rtr-i4",
      "A rectangle has area 72 m² and width 9 m. Find the length in m.",
      "l = \\frac{A}{w}",
      "8",
      "l = 72 ÷ 9 = 8 m."
    ),
    answer(
      "y7-are-rtr-i5",
      "A triangle has area 40 cm² and perpendicular height 10 cm. Find the base in cm.",
      "b = \\frac{2A}{h}",
      "8",
      "b = 2 × 40 ÷ 10 = 80 ÷ 10 = 8 cm."
    ),
  ],
  commonMistakes: [
    { mistake: "Using the slant side of a triangle as the height in A = ½bh.", fix: "Always use the perpendicular height — the straight-up distance from base to opposite vertex, shown as a dotted line." },
    { mistake: "Forgetting the ½ and writing A = b × h for a triangle.", fix: "A triangle is half a rectangle. The formula must include ½: A = ½ × b × h." },
    { mistake: "Multiplying length by length to get the area of a rectangle and writing the wrong unit.", fix: "Area uses square units (cm², m²). Make sure your answer has the correct unit." },
    { mistake: "To find a missing side, dividing by 2 instead of multiplying the area by 2 first when using the triangle formula.", fix: "Rearrange A = ½bh as h = 2A ÷ b. Multiply area by 2 before dividing by the known dimension." },
  ],
  masteryQuiz: [
    answer(
      "y7-are-rtr-m1",
      "Find the area of a rectangle with length 11 cm and width 7 cm. Give your answer in cm².",
      "A = l \\times w",
      "77",
      "A = 11 × 7 = 77 cm²."
    ),
    answer(
      "y7-are-rtr-m2",
      "Find the area of a square with side length 13 cm. Give your answer in cm².",
      "A = s^2",
      "169",
      "A = 13² = 169 cm²."
    ),
    choice(
      "y7-are-rtr-m3",
      "Which measurement is needed for the height in the triangle area formula A = ½bh?",
      "C",
      ["The longest side of the triangle", "The side adjacent to the base", "The perpendicular distance from base to opposite vertex", "The perimeter divided by 3"],
      "The height in A = ½bh must be perpendicular to the base — a right-angle distance, not a slant side."
    ),
    answer(
      "y7-are-rtr-m4",
      "A triangle has base 20 cm and perpendicular height 9 cm. Find the area in cm².",
      "A = \\frac{1}{2} \\times b \\times h",
      "90",
      "A = ½ × 20 × 9 = ½ × 180 = 90 cm²."
    ),
    answer(
      "y7-are-rtr-m5",
      "A rectangle has area 84 cm² and length 12 cm. Find the width in cm.",
      "w = \\frac{A}{l}",
      "7",
      "w = 84 ÷ 12 = 7 cm."
    ),
    answer(
      "y7-are-rtr-m6",
      "A triangle has area 54 m² and base 12 m. Find the perpendicular height in m.",
      "h = \\frac{2A}{b}",
      "9",
      "h = 2 × 54 ÷ 12 = 108 ÷ 12 = 9 m."
    ),
    choice(
      "y7-are-rtr-m7",
      "A right-angled triangle has legs of 6 cm and 8 cm. The hypotenuse is 10 cm. What is the area in cm²?",
      "A",
      ["24 cm²", "48 cm²", "30 cm²", "40 cm²"],
      "The two legs are the base and the perpendicular height. A = ½ × 6 × 8 = 24 cm². The hypotenuse is not used."
    ),
    answer(
      "y7-are-rtr-m8",
      "A square courtyard has area 196 m². Find the side length of the courtyard in m.",
      "s = \\sqrt{A}",
      "14",
      "s² = 196, so s = √196 = 14 m."
    ),
    answer(
      "y7-are-rtr-m9",
      "A rectangular wall is 3.5 m wide and 2.4 m tall. Find the area of the wall in m².",
      "A = l \\times w",
      "8.4",
      "A = 3.5 × 2.4 = 8.4 m²."
    ),
    answer(
      "y7-are-rtr-m10",
      "A triangular garden bed has base 5 m and perpendicular height 4.8 m. Find its area in m².",
      "A = \\frac{1}{2} \\times b \\times h",
      "12",
      "A = ½ × 5 × 4.8 = ½ × 24 = 12 m²."
    ),
  ],
  masteryQuizPool: [
    answer("y7-are-rtr-p1", "Find the area of a rectangle with length 6 cm and width 4 cm. Give your answer in cm².", "A = l \\times w", "24", "A = 6 × 4 = 24 cm²."),
    answer("y7-are-rtr-p2", "Find the area of a square with side length 5 cm. Give your answer in cm².", "A = s^2", "25", "A = 5² = 25 cm²."),
    answer("y7-are-rtr-p3", "Find the area of a triangle with base 8 cm and perpendicular height 3 cm. Give your answer in cm².", "A = \\frac{1}{2} \\times b \\times h", "12", "A = ½ × 8 × 3 = 12 cm²."),
    answer("y7-are-rtr-p4", "Find the area of a rectangle with length 9 m and width 6 m. Give your answer in m².", "A = l \\times w", "54", "A = 9 × 6 = 54 m²."),
    answer("y7-are-rtr-p5", "Find the area of a square with side length 12 cm. Give your answer in cm².", "A = s^2", "144", "A = 12² = 144 cm²."),
    answer("y7-are-rtr-p6", "Find the area of a triangle with base 16 cm and perpendicular height 5 cm. Give your answer in cm².", "A = \\frac{1}{2} \\times b \\times h", "40", "A = ½ × 16 × 5 = ½ × 80 = 40 cm²."),
    answer("y7-are-rtr-p7", "A rectangle has area 56 cm² and length 8 cm. Find the width in cm.", "w = \\frac{A}{l}", "7", "w = 56 ÷ 8 = 7 cm."),
    answer("y7-are-rtr-p8", "A triangle has area 24 cm² and base 8 cm. Find the perpendicular height in cm.", "h = \\frac{2A}{b}", "6", "h = 2 × 24 ÷ 8 = 48 ÷ 8 = 6 cm."),
    choice("y7-are-rtr-p9", "A triangle has base 12 cm and perpendicular height 7 cm. Which calculation gives its area in cm²?", "B", ["12 × 7", "½ × 12 × 7", "12 + 7", "½ × (12 + 7)"], "Area = ½ × base × height = ½ × 12 × 7 = 42 cm²."),
    answer("y7-are-rtr-p10", "Find the area of a rectangle with length 14 mm and width 9 mm. Give your answer in mm².", "A = l \\times w", "126", "A = 14 × 9 = 126 mm²."),
    answer("y7-are-rtr-p11", "A triangle has base 15 cm and perpendicular height 8 cm. Find its area in cm².", "A = \\frac{1}{2} \\times b \\times h", "60", "A = ½ × 15 × 8 = ½ × 120 = 60 cm²."),
    answer("y7-are-rtr-p12", "A rectangle has area 90 m² and width 6 m. Find the length in m.", "l = \\frac{A}{w}", "15", "l = 90 ÷ 6 = 15 m."),
    answer("y7-are-rtr-p13", "A square has area 64 cm². Find the side length in cm.", "s = \\sqrt{A}", "8", "s² = 64, so s = √64 = 8 cm."),
    answer("y7-are-rtr-p14", "A triangle has area 35 cm² and perpendicular height 7 cm. Find the base in cm.", "b = \\frac{2A}{h}", "10", "b = 2 × 35 ÷ 7 = 70 ÷ 7 = 10 cm."),
    answer("y7-are-rtr-p15", "A rectangular table top is 1.2 m long and 0.8 m wide. Find its area in m².", "A = l \\times w", "0.96", "A = 1.2 × 0.8 = 0.96 m²."),
    choice("y7-are-rtr-p16", "A right-angled triangle has legs 5 cm and 12 cm and hypotenuse 13 cm. What is its area in cm²?", "C", ["65 cm²", "78 cm²", "30 cm²", "60 cm²"], "The two legs are the base and height. A = ½ × 5 × 12 = 30 cm². The hypotenuse is not used."),
    answer("y7-are-rtr-p17", "A triangle has base 9 m and perpendicular height 4.4 m. Find its area in m².", "A = \\frac{1}{2} \\times b \\times h", "19.8", "A = ½ × 9 × 4.4 = ½ × 39.6 = 19.8 m²."),
    answer("y7-are-rtr-p18", "A rectangular paddock is 25 m long and 18 m wide. Find its area in m².", "A = l \\times w", "450", "A = 25 × 18 = 450 m²."),
    answer("y7-are-rtr-p19", "A square tile has side length 15 cm. Find its area in cm².", "A = s^2", "225", "A = 15² = 225 cm²."),
    answer("y7-are-rtr-p20", "A triangle has area 84 cm² and base 24 cm. Find the perpendicular height in cm.", "h = \\frac{2A}{b}", "7", "h = 2 × 84 ÷ 24 = 168 ÷ 24 = 7 cm."),
    answer("y7-are-rtr-p21", "A rectangular field has area 1.44 hectares written as 14400 m² and length 160 m. Find the width in m.", "w = \\frac{A}{l}", "90", "w = 14400 ÷ 160 = 90 m."),
    answer("y7-are-rtr-p22", "A triangular sail has base 4.5 m and perpendicular height 6 m. Find its area in m².", "A = \\frac{1}{2} \\times b \\times h", "13.5", "A = ½ × 4.5 × 6 = ½ × 27 = 13.5 m²."),
    choice("y7-are-rtr-p23", "A square has area 121 m². What is its side length in m?", "A", ["11 m", "60.5 m", "12 m", "10 m"], "s = √121 = 11 m, since 11 × 11 = 121."),
    answer("y7-are-rtr-p24", "A triangle has area 45 m² and perpendicular height 9 m. Find the base in m.", "b = \\frac{2A}{h}", "10", "b = 2 × 45 ÷ 9 = 90 ÷ 9 = 10 m."),
    answer("y7-are-rtr-p25", "A rectangular swimming pool is 16 m long and 7.5 m wide. Find the area of its surface in m².", "A = l \\times w", "120", "A = 16 × 7.5 = 120 m²."),
    answer("y7-are-rtr-p26", "A triangular garden has base 13 m and perpendicular height 6 m. Find its area in m².", "A = \\frac{1}{2} \\times b \\times h", "39", "A = ½ × 13 × 6 = ½ × 78 = 39 m²."),
    answer("y7-are-rtr-p27", "A square courtyard has area 256 m². Find its side length in m.", "s = \\sqrt{A}", "16", "s² = 256, so s = √256 = 16 m."),
  ],
  multiPartPractice: [
    {
      id: "y7-are-rtr-mp1",
      prompt:
        "A rectangular sports field is 80 m long and 45 m wide. A triangular flowerbed sits in one corner with base 12 m along a side of the field and perpendicular height 9 m. Use these measurements to answer the parts below.",
      latex: "A_{\\text{rectangle}} = l \\times w \\qquad A_{\\text{triangle}} = \\tfrac{1}{2}bh",
      answer: "3600",
      hint: "Use A = l × w for the field and A = ½bh for the flowerbed, then combine as each part asks.",
      explanation:
        "Field area = 80 × 45 = 3600 m². Flowerbed = ½ × 12 × 9 = 54 m². Grass area = 3600 − 54 = 3546 m².",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the total area of the rectangular field in m².",
          latex: "A = l \\times w",
          marks: 1,
          answer: "3600",
          acceptedAnswers: ["3600.0", "3,600"],
          hint: "Multiply length by width.",
          explanation: "A = 80 × 45 = 3600 m².",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the area of the triangular flowerbed in m².",
          latex: "A = \\frac{1}{2} \\times b \\times h",
          marks: 1,
          answer: "54",
          acceptedAnswers: ["54.0"],
          hint: "Use ½ × base × perpendicular height.",
          explanation: "A = ½ × 12 × 9 = ½ × 108 = 54 m².",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "The rest of the field is grass. Find the grass area in m².",
          latex: "A_{\\text{grass}} = A_{\\text{field}} - A_{\\text{bed}}",
          marks: 1,
          answer: "3546",
          acceptedAnswers: ["3546.0", "3,546"],
          hint: "Subtract the flowerbed area from the field area.",
          explanation: "Grass = 3600 − 54 = 3546 m².",
        },
      ],
    },
  ],
};

// ─── Lesson 2: Parallelograms and Trapezoids ──────────────────────────────────

const areaParallelogramsTrapezoids: LessonContent = {
  description: "Calculate the area of parallelograms, rhombuses, and trapezoids using the correct formula for each shape.",
  learningIntention: "Apply the area formulas for parallelograms, rhombuses, and trapezoids, including identifying the perpendicular height of a parallelogram.",
  successCriteria: [
    "Calculate the area of a parallelogram using A = bh, where h is the perpendicular height.",
    "Explain why the slant side of a parallelogram cannot be used as the height.",
    "Calculate the area of a rhombus using A = ½d₁d₂ where d₁ and d₂ are the diagonals.",
    "Calculate the area of a trapezoid using A = ½(a + b)h, where a and b are the parallel sides.",
  ],
  teaching: {
    paragraphs: [
      "A parallelogram is a quadrilateral with two pairs of parallel sides. If you cut a triangle off one end of a parallelogram and slide it to the other end, you get a rectangle — with the same base and the same height. That is why the area formula is A = b × h, the same as a rectangle.",
      "The key is using the perpendicular height — the straight-up distance between the two parallel bases, not the slant side. A parallelogram with base 8 cm and slant side 6 cm but perpendicular height 5 cm has area 8 × 5 = 40 cm², not 8 × 6 = 48 cm².",
      "A rhombus has four equal sides and its two diagonals cross at right angles. Those diagonals split the rhombus into four congruent right-angled triangles. Putting the pieces back together gives the formula A = ½ × d₁ × d₂, where d₁ and d₂ are the diagonal lengths.",
      "A trapezoid has exactly one pair of parallel sides, called the parallel sides or bases. The area is the average of the two parallel sides multiplied by the perpendicular height: A = ½(a + b)h. Think of it as the area of a rectangle whose width is the average of the two bases.",
    ],
    latexBlocks: [
      "A_{\\text{parallelogram}} = b \\times h \\quad (h \\text{ is the perpendicular height})",
      "A_{\\text{rhombus}} = \\frac{1}{2} \\times d_1 \\times d_2",
      "A_{\\text{trapezoid}} = \\frac{1}{2}(a + b) \\times h",
    ],
  },
  workedExamples: [
    {
      title: "Area of a parallelogram",
      questionLatex: "\\text{A parallelogram has base }10\\text{ cm, perpendicular height }6\\text{ cm, and slant side }7\\text{ cm. Find the area.}",
      steps: [
        { explanation: "Write the area formula for a parallelogram.", latex: "A = b \\times h" },
        { explanation: "Substitute the base and the perpendicular height. The slant side of 7 cm is not used.", latex: "A = 10 \\times 6" },
        { explanation: "Multiply to find the area.", latex: "A = 60" },
      ],
      finalAnswerLatex: "A = 60 \\text{ cm}^2",
    },
    {
      title: "Area of a rhombus using diagonals",
      questionLatex: "\\text{A rhombus has diagonals of length }12\\text{ cm and }8\\text{ cm. Find the area.}",
      steps: [
        { explanation: "Write the area formula for a rhombus in terms of its diagonals.", latex: "A = \\frac{1}{2} \\times d_1 \\times d_2" },
        { explanation: "Substitute the diagonal lengths.", latex: "A = \\frac{1}{2} \\times 12 \\times 8" },
        { explanation: "Multiply to find the area.", latex: "A = \\frac{1}{2} \\times 96 = 48" },
      ],
      finalAnswerLatex: "A = 48 \\text{ cm}^2",
    },
    {
      title: "Area of a trapezoid",
      questionLatex: "\\text{A trapezoid has parallel sides of }5\\text{ cm and }11\\text{ cm, and perpendicular height }4\\text{ cm. Find the area.}",
      steps: [
        { explanation: "Write the area formula for a trapezoid, where a and b are the parallel sides.", latex: "A = \\frac{1}{2}(a + b) \\times h" },
        { explanation: "Substitute the parallel sides and the perpendicular height.", latex: "A = \\frac{1}{2}(5 + 11) \\times 4" },
        { explanation: "Add the parallel sides first, then multiply.", latex: "A = \\frac{1}{2} \\times 16 \\times 4 = \\frac{1}{2} \\times 64 = 32" },
      ],
      finalAnswerLatex: "A = 32 \\text{ cm}^2",
    },
  ],
  guidedPractice: [
    choice(
      "y7-are-par-g1",
      "A parallelogram has base 9 cm, perpendicular height 5 cm, and slant side 6 cm. Which value do you use as the height in the area formula?",
      "B",
      ["6 cm (the slant side)", "5 cm (the perpendicular height)", "9 cm (the base)", "The average of 5 and 6"],
      "The area formula A = bh uses the perpendicular height — the right-angle distance between the parallel sides. The slant side is never used as height."
    ),
    answer(
      "y7-are-par-g2",
      "Find the area of a parallelogram with base 7 cm and perpendicular height 4 cm. Give your answer in cm².",
      "A = b \\times h",
      "28",
      "A = 7 × 4 = 28 cm²."
    ),
    answer(
      "y7-are-par-g3",
      "A rhombus has diagonals of 10 cm and 6 cm. Find the area in cm².",
      "A = \\frac{1}{2} \\times d_1 \\times d_2",
      "30",
      "A = ½ × 10 × 6 = ½ × 60 = 30 cm²."
    ),
    answer(
      "y7-are-par-g4",
      "A trapezoid has parallel sides of 4 cm and 8 cm and perpendicular height 5 cm. Find the area in cm².",
      "A = \\frac{1}{2}(a + b) \\times h",
      "30",
      "A = ½ × (4 + 8) × 5 = ½ × 12 × 5 = ½ × 60 = 30 cm²."
    ),
  ],
  independentPractice: [
    answer(
      "y7-are-par-i1",
      "Find the area of a parallelogram with base 13 cm and perpendicular height 6 cm. Give your answer in cm².",
      "A = b \\times h",
      "78",
      "A = 13 × 6 = 78 cm²."
    ),
    answer(
      "y7-are-par-i2",
      "A rhombus has diagonals of 14 m and 9 m. Find the area in m².",
      "A = \\frac{1}{2} \\times d_1 \\times d_2",
      "63",
      "A = ½ × 14 × 9 = ½ × 126 = 63 m²."
    ),
    answer(
      "y7-are-par-i3",
      "A trapezoid has parallel sides of 6 cm and 14 cm and a perpendicular height of 8 cm. Find the area in cm².",
      "A = \\frac{1}{2}(a + b) \\times h",
      "80",
      "A = ½ × (6 + 14) × 8 = ½ × 20 × 8 = ½ × 160 = 80 cm²."
    ),
    answer(
      "y7-are-par-i4",
      "A parallelogram has area 66 cm² and base 11 cm. Find the perpendicular height in cm.",
      "h = \\frac{A}{b}",
      "6",
      "h = 66 ÷ 11 = 6 cm."
    ),
    answer(
      "y7-are-par-i5",
      "A trapezoid has parallel sides of 7 m and 13 m and area 60 m². Find the perpendicular height in m.",
      "h = \\frac{2A}{a + b}",
      "6",
      "h = 2 × 60 ÷ (7 + 13) = 120 ÷ 20 = 6 m."
    ),
  ],
  commonMistakes: [
    { mistake: "Using the slant side of a parallelogram instead of the perpendicular height in A = bh.", fix: "Only the perpendicular height — the right-angle distance between the parallel sides — goes into the formula." },
    { mistake: "Adding the diagonals instead of multiplying them when finding the area of a rhombus.", fix: "The formula is A = ½ × d₁ × d₂. Multiply the diagonals, then halve the product." },
    { mistake: "Forgetting to add the two parallel sides before multiplying by ½h for a trapezoid.", fix: "Work in brackets first: A = ½ × (a + b) × h. Add a and b before multiplying." },
    { mistake: "Using the non-parallel sides instead of the parallel sides in the trapezoid formula.", fix: "Only the two parallel sides go into A = ½(a + b)h. The non-parallel sides are not used." },
  ],
  masteryQuiz: [
    answer(
      "y7-are-par-m1",
      "Find the area of a parallelogram with base 15 m and perpendicular height 8 m. Give your answer in m².",
      "A = b \\times h",
      "120",
      "A = 15 × 8 = 120 m²."
    ),
    choice(
      "y7-are-par-m2",
      "A parallelogram has base 6 cm, slant side 9 cm, and perpendicular height 7 cm. What is its area in cm²?",
      "C",
      ["54 cm²", "63 cm²", "42 cm²", "126 cm²"],
      "A = b × h = 6 × 7 = 42 cm². Use the perpendicular height (7 cm), not the slant side (9 cm)."
    ),
    answer(
      "y7-are-par-m3",
      "A rhombus has diagonals of 16 cm and 10 cm. Find the area in cm².",
      "A = \\frac{1}{2} \\times d_1 \\times d_2",
      "80",
      "A = ½ × 16 × 10 = ½ × 160 = 80 cm²."
    ),
    answer(
      "y7-are-par-m4",
      "A trapezoid has parallel sides of 9 cm and 15 cm and perpendicular height 10 cm. Find the area in cm².",
      "A = \\frac{1}{2}(a + b) \\times h",
      "120",
      "A = ½ × (9 + 15) × 10 = ½ × 24 × 10 = ½ × 240 = 120 cm²."
    ),
    answer(
      "y7-are-par-m5",
      "A parallelogram has area 104 m² and perpendicular height 8 m. Find the base in m.",
      "b = \\frac{A}{h}",
      "13",
      "b = 104 ÷ 8 = 13 m."
    ),
    answer(
      "y7-are-par-m6",
      "A rhombus has area 45 cm² and one diagonal of 10 cm. Find the other diagonal in cm.",
      "d_2 = \\frac{2A}{d_1}",
      "9",
      "d₂ = 2 × 45 ÷ 10 = 90 ÷ 10 = 9 cm."
    ),
    choice(
      "y7-are-par-m7",
      "A trapezoid has parallel sides of 5 cm and 9 cm and perpendicular height 6 cm. A student calculates area as (5 + 9) × 6 = 84 cm². What did they do wrong?",
      "A",
      ["They forgot to multiply by ½.", "They should have subtracted the parallel sides.", "They used the wrong height.", "They should have squared the height."],
      "The correct formula is A = ½(a + b)h = ½ × 14 × 6 = 42 cm². The student forgot the ½."
    ),
    answer(
      "y7-are-par-m8",
      "A rhombus has diagonals of 18 m and 7 m. Find the area in m².",
      "A = \\frac{1}{2} \\times d_1 \\times d_2",
      "63",
      "A = ½ × 18 × 7 = ½ × 126 = 63 m²."
    ),
    answer(
      "y7-are-par-m9",
      "A trapezoid has area 88 cm², perpendicular height 8 cm, and one parallel side of 6 cm. Find the other parallel side in cm.",
      "a + b = \\frac{2A}{h}",
      "16",
      "a + b = 2 × 88 ÷ 8 = 176 ÷ 8 = 22. So the other side = 22 − 6 = 16 cm."
    ),
    answer(
      "y7-are-par-m10",
      "A kite-shaped tile (rhombus) has diagonals of 24 cm and 10 cm. Find the area in cm².",
      "A = \\frac{1}{2} \\times d_1 \\times d_2",
      "120",
      "A = ½ × 24 × 10 = ½ × 240 = 120 cm²."
    ),
  ],
  masteryQuizPool: [
    answer("y7-are-par-p1", "Find the area of a parallelogram with base 8 cm and perpendicular height 5 cm. Give your answer in cm².", "A = b \\times h", "40", "A = 8 × 5 = 40 cm²."),
    answer("y7-are-par-p2", "Find the area of a parallelogram with base 11 cm and perpendicular height 4 cm. Give your answer in cm².", "A = b \\times h", "44", "A = 11 × 4 = 44 cm²."),
    answer("y7-are-par-p3", "A rhombus has diagonals of 8 cm and 6 cm. Find the area in cm².", "A = \\frac{1}{2} \\times d_1 \\times d_2", "24", "A = ½ × 8 × 6 = ½ × 48 = 24 cm²."),
    answer("y7-are-par-p4", "A trapezoid has parallel sides of 3 cm and 7 cm and perpendicular height 4 cm. Find the area in cm².", "A = \\frac{1}{2}(a + b) \\times h", "20", "A = ½ × (3 + 7) × 4 = ½ × 10 × 4 = 20 cm²."),
    answer("y7-are-par-p5", "Find the area of a parallelogram with base 14 m and perpendicular height 9 m. Give your answer in m².", "A = b \\times h", "126", "A = 14 × 9 = 126 m²."),
    answer("y7-are-par-p6", "A rhombus has diagonals of 12 cm and 5 cm. Find the area in cm².", "A = \\frac{1}{2} \\times d_1 \\times d_2", "30", "A = ½ × 12 × 5 = ½ × 60 = 30 cm²."),
    answer("y7-are-par-p7", "A trapezoid has parallel sides of 6 cm and 10 cm and perpendicular height 7 cm. Find the area in cm².", "A = \\frac{1}{2}(a + b) \\times h", "56", "A = ½ × (6 + 10) × 7 = ½ × 16 × 7 = ½ × 112 = 56 cm²."),
    choice("y7-are-par-p8", "A parallelogram has base 10 cm, slant side 8 cm, and perpendicular height 6 cm. What is its area in cm²?", "B", ["80 cm²", "60 cm²", "48 cm²", "30 cm²"], "A = b × h = 10 × 6 = 60 cm². Use the perpendicular height (6 cm), not the slant side."),
    answer("y7-are-par-p9", "A parallelogram has area 72 cm² and base 9 cm. Find the perpendicular height in cm.", "h = \\frac{A}{b}", "8", "h = 72 ÷ 9 = 8 cm."),
    answer("y7-are-par-p10", "A rhombus has diagonals of 20 cm and 9 cm. Find the area in cm².", "A = \\frac{1}{2} \\times d_1 \\times d_2", "90", "A = ½ × 20 × 9 = ½ × 180 = 90 cm²."),
    answer("y7-are-par-p11", "A trapezoid has parallel sides of 8 m and 12 m and perpendicular height 5 m. Find the area in m².", "A = \\frac{1}{2}(a + b) \\times h", "50", "A = ½ × (8 + 12) × 5 = ½ × 20 × 5 = ½ × 100 = 50 m²."),
    answer("y7-are-par-p12", "A parallelogram has area 132 m² and perpendicular height 12 m. Find the base in m.", "b = \\frac{A}{h}", "11", "b = 132 ÷ 12 = 11 m."),
    answer("y7-are-par-p13", "A rhombus has area 60 cm² and one diagonal of 12 cm. Find the other diagonal in cm.", "d_2 = \\frac{2A}{d_1}", "10", "d₂ = 2 × 60 ÷ 12 = 120 ÷ 12 = 10 cm."),
    answer("y7-are-par-p14", "A trapezoid has parallel sides of 9 cm and 13 cm and perpendicular height 6 cm. Find the area in cm².", "A = \\frac{1}{2}(a + b) \\times h", "66", "A = ½ × (9 + 13) × 6 = ½ × 22 × 6 = ½ × 132 = 66 cm²."),
    answer("y7-are-par-p15", "A parallelogram has base 7.5 cm and perpendicular height 4 cm. Find its area in cm².", "A = b \\times h", "30", "A = 7.5 × 4 = 30 cm²."),
    choice("y7-are-par-p16", "A student finds the area of a trapezoid with parallel sides 4 cm and 8 cm and height 5 cm as (4 + 8) × 5 = 60 cm². What did they do wrong?", "A", ["They forgot to multiply by ½.", "They added the wrong sides.", "They used the wrong height.", "They squared the height."], "The correct formula is A = ½(a + b)h = ½ × 12 × 5 = 30 cm². The student forgot the ½."),
    answer("y7-are-par-p17", "A rhombus has diagonals of 15 m and 8 m. Find the area in m².", "A = \\frac{1}{2} \\times d_1 \\times d_2", "60", "A = ½ × 15 × 8 = ½ × 120 = 60 m²."),
    answer("y7-are-par-p18", "A trapezoid has area 96 cm², perpendicular height 8 cm, and one parallel side of 10 cm. Find the other parallel side in cm.", "a + b = \\frac{2A}{h}", "14", "a + b = 2 × 96 ÷ 8 = 192 ÷ 8 = 24. Other side = 24 − 10 = 14 cm."),
    answer("y7-are-par-p19", "A parallelogram-shaped field has base 30 m and perpendicular height 22 m. Find its area in m².", "A = b \\times h", "660", "A = 30 × 22 = 660 m²."),
    answer("y7-are-par-p20", "A rhombus has area 84 cm² and one diagonal of 14 cm. Find the other diagonal in cm.", "d_2 = \\frac{2A}{d_1}", "12", "d₂ = 2 × 84 ÷ 14 = 168 ÷ 14 = 12 cm."),
    answer("y7-are-par-p21", "A trapezoid has parallel sides of 12 m and 20 m and area 128 m². Find the perpendicular height in m.", "h = \\frac{2A}{a + b}", "8", "h = 2 × 128 ÷ (12 + 20) = 256 ÷ 32 = 8 m."),
    answer("y7-are-par-p22", "A parallelogram has area 154 cm² and base 14 cm. Find the perpendicular height in cm.", "h = \\frac{A}{b}", "11", "h = 154 ÷ 14 = 11 cm."),
    choice("y7-are-par-p23", "Which measurement is NOT used when finding the area of a parallelogram with A = bh?", "C", ["The base", "The perpendicular height", "The slant side", "Neither the base nor the height"], "A = bh uses only the base and the perpendicular height. The slant side is never used."),
    answer("y7-are-par-p24", "A trapezoid has parallel sides of 5.5 cm and 10.5 cm and perpendicular height 4 cm. Find the area in cm².", "A = \\frac{1}{2}(a + b) \\times h", "32", "A = ½ × (5.5 + 10.5) × 4 = ½ × 16 × 4 = ½ × 64 = 32 cm²."),
    answer("y7-are-par-p25", "A kite-shaped tile (rhombus) has diagonals of 30 cm and 16 cm. Find the area in cm².", "A = \\frac{1}{2} \\times d_1 \\times d_2", "240", "A = ½ × 30 × 16 = ½ × 480 = 240 cm²."),
    answer("y7-are-par-p26", "A parallelogram has base 18 cm and perpendicular height 13 cm. Find its area in cm².", "A = b \\times h", "234", "A = 18 × 13 = 234 cm²."),
  ],
  multiPartPractice: [
    {
      id: "y7-are-par-mp1",
      prompt:
        "A glass panel is shaped like a trapezoid with parallel sides of 6 m and 14 m and a perpendicular height of 5 m. A rhombus-shaped decorative inlay with diagonals 4 m and 3 m is set into the panel. Use these measurements to answer the parts below.",
      latex: "A_{\\text{trapezoid}} = \\tfrac{1}{2}(a+b)h \\qquad A_{\\text{rhombus}} = \\tfrac{1}{2}d_1 d_2",
      answer: "50",
      hint: "Use A = ½(a + b)h for the trapezoid and A = ½d₁d₂ for the rhombus, then subtract.",
      explanation:
        "Trapezoid = ½ × (6 + 14) × 5 = ½ × 20 × 5 = 50 m². Rhombus = ½ × 4 × 3 = 6 m². Remaining glass = 50 − 6 = 44 m².",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the area of the trapezoidal glass panel in m².",
          latex: "A = \\frac{1}{2}(a + b) \\times h",
          marks: 1,
          answer: "50",
          acceptedAnswers: ["50.0"],
          hint: "Add the parallel sides first, then multiply by ½ and the height.",
          explanation: "A = ½ × (6 + 14) × 5 = ½ × 20 × 5 = 50 m².",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the area of the rhombus inlay in m².",
          latex: "A = \\frac{1}{2} \\times d_1 \\times d_2",
          marks: 1,
          answer: "6",
          acceptedAnswers: ["6.0"],
          hint: "Multiply the two diagonals, then halve.",
          explanation: "A = ½ × 4 × 3 = ½ × 12 = 6 m².",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the area of glass remaining once the inlay is removed, in m².",
          latex: "A_{\\text{glass}} = A_{\\text{panel}} - A_{\\text{inlay}}",
          marks: 1,
          answer: "44",
          acceptedAnswers: ["44.0"],
          hint: "Subtract the inlay area from the panel area.",
          explanation: "Remaining glass = 50 − 6 = 44 m².",
        },
      ],
    },
  ],
};

// ─── Lesson 3: Composite Shapes ───────────────────────────────────────────────

const areaCompositeShapes: LessonContent = {
  description: "Find the area of composite shapes by dividing them into simpler shapes or by subtracting the area of a cut-out from a larger shape.",
  learningIntention: "Calculate the area of composite shapes by identifying and combining or subtracting the areas of simpler component shapes.",
  successCriteria: [
    "Identify which simpler shapes make up a composite figure.",
    "Find missing dimensions of sub-shapes using the overall measurements given.",
    "Add areas of sub-shapes to find the total area of a composite figure.",
    "Subtract the area of a cut-out from the area of a larger shape.",
    "Avoid counting any region twice.",
  ],
  teaching: {
    paragraphs: [
      "A composite shape is a shape made by joining or cutting simpler shapes such as rectangles and triangles. To find the area, split the composite shape into parts you already know how to handle, find each area separately, then add them together.",
      "For example, an L-shaped room can be split into two rectangles. Measure each rectangle using the dimensions marked on the diagram, calculate each area, and add. There is no single formula for an L-shape — the split is the technique.",
      "Sometimes it is easier to work by subtraction: start with the area of a large simple shape that completely contains the figure, then subtract the area of the region that was cut away. An arch with a rectangular hole is a good example — find the full rectangle's area and subtract the hole.",
      "The most important rule is to avoid counting any area twice. When you split a shape, make sure the dividing line belongs to exactly one region, not both. Draw the split lines clearly and label each sub-shape before calculating.",
    ],
    latexBlocks: [
      "A_{\\text{composite}} = A_1 + A_2 + \\cdots \\quad \\text{(addition method)}",
      "A_{\\text{composite}} = A_{\\text{large}} - A_{\\text{cut-out}} \\quad \\text{(subtraction method)}",
    ],
  },
  workedExamples: [
    {
      title: "L-shape by addition",
      questionLatex: "\\text{An L-shaped figure has an outer rectangle }10\\text{ cm} \\times 8\\text{ cm with a }4\\text{ cm} \\times 5\\text{ cm rectangle removed from one corner. Find the total area.}",
      steps: [
        { explanation: "Find the area of the full outer rectangle.", latex: "A_{\\text{full}} = 10 \\times 8 = 80 \\text{ cm}^2" },
        { explanation: "Find the area of the missing corner rectangle.", latex: "A_{\\text{cut}} = 4 \\times 5 = 20 \\text{ cm}^2" },
        { explanation: "Subtract the cut-out area from the full area.", latex: "A = 80 - 20 = 60 \\text{ cm}^2" },
      ],
      finalAnswerLatex: "A = 60 \\text{ cm}^2",
    },
    {
      title: "Rectangle and triangle combined",
      questionLatex: "\\text{A house-shaped figure has a rectangle }6\\text{ cm wide and }4\\text{ cm tall, topped by a triangle with base }6\\text{ cm and perpendicular height }3\\text{ cm. Find the total area.}",
      steps: [
        { explanation: "Find the area of the rectangular part.", latex: "A_{\\text{rect}} = 6 \\times 4 = 24 \\text{ cm}^2" },
        { explanation: "Find the area of the triangular roof.", latex: "A_{\\text{tri}} = \\frac{1}{2} \\times 6 \\times 3 = 9 \\text{ cm}^2" },
        { explanation: "Add the two areas to get the total.", latex: "A = 24 + 9 = 33 \\text{ cm}^2" },
      ],
      finalAnswerLatex: "A = 33 \\text{ cm}^2",
    },
    {
      title: "Composite shape with a missing dimension",
      questionLatex: "\\text{A T-shaped figure is }12\\text{ cm wide at the top and }4\\text{ cm tall. Below it, a rectangle }4\\text{ cm wide and }6\\text{ cm tall hangs down. Find the total area.}",
      steps: [
        { explanation: "Find the area of the top horizontal rectangle.", latex: "A_{\\text{top}} = 12 \\times 4 = 48 \\text{ cm}^2" },
        { explanation: "Find the area of the vertical stem.", latex: "A_{\\text{stem}} = 4 \\times 6 = 24 \\text{ cm}^2" },
        { explanation: "Add the two areas.", latex: "A = 48 + 24 = 72 \\text{ cm}^2" },
      ],
      finalAnswerLatex: "A = 72 \\text{ cm}^2",
    },
  ],
  guidedPractice: [
    choice(
      "y7-are-com-g1",
      "A composite shape is made of a rectangle 10 cm × 6 cm with a small 2 cm × 3 cm rectangle removed from one corner. Which calculation gives the correct area?",
      "B",
      ["10 × 6 + 2 × 3", "(10 × 6) − (2 × 3)", "(10 + 2) × (6 + 3)", "10 × 6 × 2 × 3"],
      "Use subtraction: full rectangle minus cut-out = 60 − 6 = 54 cm².",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-are-com-g2",
      "A composite shape is made of two rectangles placed side by side: the first is 5 cm × 4 cm and the second is 3 cm × 4 cm. Find the total area in cm².",
      "A = A_1 + A_2",
      "32",
      "A₁ = 5 × 4 = 20 cm². A₂ = 3 × 4 = 12 cm². Total = 20 + 12 = 32 cm²."
    ),
    answer(
      "y7-are-com-g3",
      "A large rectangle is 12 cm × 9 cm. A 4 cm × 3 cm rectangle is cut from one corner. Find the remaining area in cm².",
      "A = 12 \\times 9 - 4 \\times 3",
      "96",
      "Full area = 12 × 9 = 108 cm². Cut-out = 4 × 3 = 12 cm². Remaining = 108 − 12 = 96 cm²."
    ),
    answer(
      "y7-are-com-g4",
      "A shape consists of a rectangle 8 cm × 5 cm with a triangle on top that has base 8 cm and perpendicular height 4 cm. Find the total area in cm².",
      "A = (8 \\times 5) + \\frac{1}{2} \\times 8 \\times 4",
      "56",
      "Rectangle: 8 × 5 = 40 cm². Triangle: ½ × 8 × 4 = 16 cm². Total = 40 + 16 = 56 cm²."
    ),
  ],
  independentPractice: [
    answer(
      "y7-are-com-i1",
      "Find the area of the L-shaped figure shown, in cm².",
      "",
      "58",
      "The figure is a 10 cm × 7 cm rectangle with a 3 cm × 4 cm corner removed. Full area = 10 × 7 = 70 cm². Cut-out = 3 × 4 = 12 cm². Remaining = 70 − 12 = 58 cm².",
      [],
      {
        planeShapeDiagram: {
          description: "L-shaped figure: a 10 cm by 7 cm rectangle with a 3 cm wide by 4 cm high rectangle removed from the top-right corner. Labelled sides: bottom 10 cm, left 7 cm, cut width 3 cm, cut depth 4 cm.",
          vertices: [
            { x: 0, y: 0, rightAngle: true }, { x: 10, y: 0, rightAngle: true },
            { x: 10, y: 3, rightAngle: true }, { x: 7, y: 3 },
            { x: 7, y: 7, rightAngle: true }, { x: 0, y: 7, rightAngle: true },
          ],
          edges: [{ label: "10 cm" }, {}, { label: "3 cm" }, { label: "4 cm" }, {}, { label: "7 cm" }],
        },
        hint: "Work out the full rectangle's area, then subtract the cut-out corner.",
      }
    ),
    answer(
      "y7-are-com-i2",
      "A composite shape is made of a rectangle 9 cm × 6 cm and a triangle with base 9 cm and perpendicular height 5 cm attached to one side. Find the total area in cm².",
      "A = (9 \\times 6) + \\frac{1}{2} \\times 9 \\times 5",
      "76.5",
      "Rectangle: 9 × 6 = 54 cm². Triangle: ½ × 9 × 5 = 22.5 cm². Total = 54 + 22.5 = 76.5 cm²."
    ),
    answer(
      "y7-are-com-i3",
      "Find the total area of the T-shaped figure shown, in cm².",
      "",
      "77",
      "Split the T into its top bar and stem. Top: 14 × 3 = 42 cm². Stem: 5 × 7 = 35 cm². Total = 42 + 35 = 77 cm².",
      [],
      {
        planeShapeDiagram: {
          description: "T-shaped figure: a horizontal top bar 14 cm wide and 3 cm high, with a 5 cm wide by 7 cm tall stem hanging from its middle. Labelled sides: top 14 cm, top-bar height 3 cm, stem width 5 cm, stem height 7 cm.",
          vertices: [
            { x: 4.5, y: 0, rightAngle: true }, { x: 9.5, y: 0, rightAngle: true },
            { x: 9.5, y: 7 }, { x: 14, y: 7, rightAngle: true },
            { x: 14, y: 10, rightAngle: true }, { x: 0, y: 10, rightAngle: true },
            { x: 0, y: 7, rightAngle: true }, { x: 4.5, y: 7 },
          ],
          edges: [{ label: "5 cm" }, { label: "7 cm" }, {}, { label: "3 cm" }, { label: "14 cm" }, {}, {}, {}],
        },
        hint: "Split the T into a top bar and a stem, find each area, then add.",
      }
    ),
    answer(
      "y7-are-com-i4",
      "A rectangular sign 20 cm × 15 cm has a rectangular window 6 cm × 4 cm cut out. Find the remaining area in cm².",
      "A = 20 \\times 15 - 6 \\times 4",
      "276",
      "Full area = 20 × 15 = 300 cm². Window = 6 × 4 = 24 cm². Remaining = 300 − 24 = 276 cm²."
    ),
    answer(
      "y7-are-com-i5",
      "The cross-shaped figure shown is made of a vertical rectangle 3 cm × 10 cm and a horizontal rectangle 8 cm × 3 cm crossing at the middle, overlapping in a 3 cm × 3 cm square. Find the total area in cm².",
      "",
      "45",
      "Vertical: 3 × 10 = 30 cm². Horizontal: 8 × 3 = 24 cm². The overlap square (3 × 3 = 9 cm²) is inside both, so count it once: 30 + 24 − 9 = 45 cm².",
      [],
      {
        planeShapeDiagram: {
          description: "Cross-shaped (plus-sign) figure formed by a vertical rectangle 3 cm wide by 10 cm tall and a horizontal rectangle 8 cm wide by 3 cm tall crossing at the middle, overlapping in a 3 cm square.",
          vertices: [
            { x: 2.5, y: 0 }, { x: 5.5, y: 0 }, { x: 5.5, y: 3.5 }, { x: 8, y: 3.5 },
            { x: 8, y: 6.5 }, { x: 5.5, y: 6.5 }, { x: 5.5, y: 10 }, { x: 2.5, y: 10 },
            { x: 2.5, y: 6.5 }, { x: 0, y: 6.5 }, { x: 0, y: 3.5 }, { x: 2.5, y: 3.5 },
          ],
          edges: [{ label: "3 cm" }, {}, {}, { label: "3 cm" }, {}, {}, { label: "3 cm" }, {}, {}, { label: "3 cm" }, {}, {}],
        },
        hint: "Add the two rectangle areas, then subtract the overlap square so it is only counted once.",
      }
    ),
  ],
  commonMistakes: [
    { mistake: "Counting the shared boundary region twice when adding two sub-shapes that overlap.", fix: "Check whether any region is counted in both areas. If the two sub-shapes overlap, subtract the overlap area once." },
    { mistake: "Not finding the missing dimension of a sub-shape before calculating its area.", fix: "Use the overall measurements to work out unlabelled sides. Label each sub-shape with all its dimensions before calculating." },
    { mistake: "Adding areas when the problem requires subtraction, or vice versa.", fix: "If the composite shape is formed by joining pieces, add. If a cut-out is removed from a larger shape, subtract." },
    { mistake: "Including the cut-out region in the answer when using the subtraction method.", fix: "Subtract the cut-out area: remaining area = large shape − cut-out. The cut-out is gone, not added." },
  ],
  masteryQuiz: [
    answer(
      "y7-are-com-m1",
      "An L-shape is formed from a rectangle 15 cm × 8 cm with a 5 cm × 4 cm corner removed. Find the area in cm².",
      "A = 15 \\times 8 - 5 \\times 4",
      "100",
      "Full area = 15 × 8 = 120 cm². Cut-out = 5 × 4 = 20 cm². Remaining = 120 − 20 = 100 cm²."
    ),
    answer(
      "y7-are-com-m2",
      "A composite shape is made of a rectangle 10 cm × 5 cm and a triangle with base 10 cm and perpendicular height 6 cm. Find the total area in cm².",
      "A = (10 \\times 5) + \\frac{1}{2} \\times 10 \\times 6",
      "80",
      "Rectangle: 10 × 5 = 50 cm². Triangle: ½ × 10 × 6 = 30 cm². Total = 50 + 30 = 80 cm²."
    ),
    choice(
      "y7-are-com-m3",
      "A composite shape is split into a rectangle of area 48 cm² and a triangle of area 15 cm². The two shapes share a boundary edge but do not overlap. What is the total area?",
      "C",
      ["33 cm²", "48 cm²", "63 cm²", "720 cm²"],
      "The shapes share an edge but do not overlap, so areas are added: 48 + 15 = 63 cm²."
    ),
    answer(
      "y7-are-com-m4",
      "A rectangular room 8 m × 6 m has a rectangular wardrobe alcove 2 m × 1.5 m cut into one wall. Find the floor area remaining in m².",
      "A = 8 \\times 6 - 2 \\times 1.5",
      "45",
      "Full area = 8 × 6 = 48 m². Alcove = 2 × 1.5 = 3 m². Remaining = 48 − 3 = 45 m²."
    ),
    answer(
      "y7-are-com-m5",
      "A T-shape has a top bar 18 cm × 4 cm and a stem 6 cm × 10 cm below it. Find the total area in cm².",
      "A = (18 \\times 4) + (6 \\times 10)",
      "132",
      "Top bar: 18 × 4 = 72 cm². Stem: 6 × 10 = 60 cm². Total = 72 + 60 = 132 cm²."
    ),
    answer(
      "y7-are-com-m6",
      "A rectangular pool surround is 12 m × 9 m on the outside. The pool itself measures 8 m × 5 m. Find the area of the surround (the border) in m².",
      "A = 12 \\times 9 - 8 \\times 5",
      "68",
      "Outer area = 12 × 9 = 108 m². Pool = 8 × 5 = 40 m². Surround = 108 − 40 = 68 m²."
    ),
    choice(
      "y7-are-com-m7",
      "A student finds the area of a composite shape by splitting it into a 6 cm × 4 cm rectangle and a triangle with base 6 cm and height 3 cm. They add 24 + 18 = 42 cm². What error did they make?",
      "B",
      ["They used the wrong rectangle dimensions.", "They forgot the ½ in the triangle area formula.", "They should have subtracted the triangle area.", "They calculated 6 × 4 incorrectly."],
      "Triangle area = ½ × 6 × 3 = 9 cm², not 18 cm². The correct total is 24 + 9 = 33 cm²."
    ),
    answer(
      "y7-are-com-m8",
      "A staircase shape is made of three stacked rectangles: 6 cm × 2 cm, 4 cm × 2 cm, and 2 cm × 2 cm from bottom to top. Find the total area in cm².",
      "A = (6 \\times 2) + (4 \\times 2) + (2 \\times 2)",
      "24",
      "Bottom: 6 × 2 = 12 cm². Middle: 4 × 2 = 8 cm². Top: 2 × 2 = 4 cm². Total = 12 + 8 + 4 = 24 cm²."
    ),
    answer(
      "y7-are-com-m9",
      "An arrowhead shape is a rectangle 10 cm × 6 cm with a triangle of base 4 cm and height 6 cm removed from one short end. Find the remaining area in cm².",
      "A = 10 \\times 6 - \\frac{1}{2} \\times 4 \\times 6",
      "48",
      "Rectangle: 10 × 6 = 60 cm². Triangle removed: ½ × 4 × 6 = 12 cm². Remaining = 60 − 12 = 48 cm²."
    ),
    answer(
      "y7-are-com-m10",
      "The figure shown is made of two identical rectangles joined along one edge with no gap or overlap. Find the total area in cm².",
      "",
      "56",
      "Each rectangle is 7 × 4 = 28 cm². They do not overlap, so total = 2 × 28 = 56 cm².",
      [],
      {
        planeShapeDiagram: {
          description: "Two identical 7 cm by 4 cm rectangles joined side by side along a shared 4 cm edge, forming a 14 cm by 4 cm strip. The bottom edge is labelled 7 cm and 7 cm, and the right side 4 cm.",
          vertices: [
            { x: 0, y: 0, rightAngle: true }, { x: 7, y: 0 }, { x: 14, y: 0, rightAngle: true },
            { x: 14, y: 4, rightAngle: true }, { x: 7, y: 4 }, { x: 0, y: 4, rightAngle: true },
          ],
          edges: [{ label: "7 cm" }, { label: "7 cm" }, { label: "4 cm" }, {}, {}, {}],
        },
        hint: "Find one rectangle's area, then double it.",
      }
    ),
  ],
  masteryQuizPool: [
    answer("y7-are-com-p1", "Two rectangles are placed side by side: 6 cm × 3 cm and 4 cm × 3 cm. Find the total area in cm².", "A = A_1 + A_2", "30", "A₁ = 6 × 3 = 18 cm². A₂ = 4 × 3 = 12 cm². Total = 18 + 12 = 30 cm²."),
    answer("y7-are-com-p2", "An L-shape is a rectangle 12 cm × 8 cm with a 4 cm × 3 cm corner removed. Find the area in cm².", "A = 12 \\times 8 - 4 \\times 3", "84", "Full = 12 × 8 = 96 cm². Cut-out = 4 × 3 = 12 cm². Remaining = 96 − 12 = 84 cm²."),
    answer("y7-are-com-p3", "A shape is a rectangle 7 cm × 5 cm with a triangle on top of base 7 cm and perpendicular height 4 cm. Find the total area in cm².", "A = (7 \\times 5) + \\frac{1}{2} \\times 7 \\times 4", "49", "Rectangle: 7 × 5 = 35 cm². Triangle: ½ × 7 × 4 = 14 cm². Total = 35 + 14 = 49 cm²."),
    answer("y7-are-com-p4", "A T-shape has a top bar 16 cm × 4 cm and a stem 5 cm × 8 cm below it. Find the total area in cm².", "A = (16 \\times 4) + (5 \\times 8)", "104", "Top: 16 × 4 = 64 cm². Stem: 5 × 8 = 40 cm². Total = 64 + 40 = 104 cm²."),
    answer("y7-are-com-p5", "A rectangular sheet 18 cm × 12 cm has a 5 cm × 4 cm rectangle cut out. Find the remaining area in cm².", "A = 18 \\times 12 - 5 \\times 4", "196", "Full = 18 × 12 = 216 cm². Cut-out = 5 × 4 = 20 cm². Remaining = 216 − 20 = 196 cm²."),
    answer("y7-are-com-p6", "Three stacked rectangles measure 8 cm × 2 cm, 5 cm × 2 cm, and 3 cm × 2 cm. Find the total area in cm².", "A = (8 \\times 2) + (5 \\times 2) + (3 \\times 2)", "32", "16 + 10 + 6 = 32 cm²."),
    answer("y7-are-com-p7", "A house shape is a rectangle 10 cm × 6 cm with a triangular roof of base 10 cm and perpendicular height 4 cm. Find the total area in cm².", "A = (10 \\times 6) + \\frac{1}{2} \\times 10 \\times 4", "80", "Rectangle: 10 × 6 = 60 cm². Roof: ½ × 10 × 4 = 20 cm². Total = 60 + 20 = 80 cm²."),
    choice("y7-are-com-p8", "A rectangle of area 50 cm² and a triangle of area 18 cm² share an edge but do not overlap. What is the total area?", "C", ["32 cm²", "50 cm²", "68 cm²", "900 cm²"], "They do not overlap, so add: 50 + 18 = 68 cm²."),
    answer("y7-are-com-p9", "An L-shaped room is a rectangle 9 m × 6 m with a 2 m × 3 m corner removed. Find the floor area in m².", "A = 9 \\times 6 - 2 \\times 3", "48", "Full = 9 × 6 = 54 m². Cut-out = 2 × 3 = 6 m². Remaining = 54 − 6 = 48 m²."),
    answer("y7-are-com-p10", "A rectangular frame is 14 cm × 10 cm on the outside. The picture inside it is 10 cm × 6 cm. Find the area of the frame border in cm².", "A = 14 \\times 10 - 10 \\times 6", "80", "Outer = 14 × 10 = 140 cm². Picture = 10 × 6 = 60 cm². Border = 140 − 60 = 80 cm²."),
    answer("y7-are-com-p11", "A cross shape is a vertical rectangle 4 cm × 12 cm and a horizontal rectangle 10 cm × 4 cm crossing in a 4 cm × 4 cm overlap. Find the total area in cm².", "A = (4 \\times 12) + (10 \\times 4) - (4 \\times 4)", "72", "Vertical: 48 cm². Horizontal: 40 cm². Overlap: 16 cm². Total = 48 + 40 − 16 = 72 cm²."),
    answer("y7-are-com-p12", "A composite shape is a rectangle 11 cm × 4 cm with a triangle attached of base 11 cm and perpendicular height 6 cm. Find the total area in cm².", "A = (11 \\times 4) + \\frac{1}{2} \\times 11 \\times 6", "77", "Rectangle: 44 cm². Triangle: ½ × 11 × 6 = 33 cm². Total = 44 + 33 = 77 cm²."),
    answer("y7-are-com-p13", "A rectangular lawn 20 m × 15 m has a rectangular pond 6 m × 5 m removed. Find the grass area in m².", "A = 20 \\times 15 - 6 \\times 5", "270", "Lawn = 20 × 15 = 300 m². Pond = 6 × 5 = 30 m². Grass = 300 − 30 = 270 m²."),
    choice("y7-are-com-p14", "A composite shape splits into a 5 cm × 4 cm rectangle and a triangle with base 5 cm and height 4 cm. A student adds 20 + 20 = 40 cm². What is the error?", "B", ["The rectangle area is wrong.", "They forgot the ½ in the triangle area.", "They should subtract the triangle.", "They used the wrong base."], "Triangle = ½ × 5 × 4 = 10 cm², not 20 cm². Correct total = 20 + 10 = 30 cm²."),
    answer("y7-are-com-p15", "A staircase is four stacked rectangles: 8 cm × 2 cm, 6 cm × 2 cm, 4 cm × 2 cm, 2 cm × 2 cm. Find the total area in cm².", "A = (8 + 6 + 4 + 2) \\times 2", "40", "Widths sum to 8 + 6 + 4 + 2 = 20, each 2 cm tall: 20 × 2 = 40 cm²."),
    answer("y7-are-com-p16", "A rectangular sign 24 cm × 16 cm has two windows each 4 cm × 3 cm cut out. Find the remaining area in cm².", "A = 24 \\times 16 - 2 \\times (4 \\times 3)", "360", "Full = 24 × 16 = 384 cm². Two windows = 2 × 12 = 24 cm². Remaining = 384 − 24 = 360 cm²."),
    answer("y7-are-com-p17", "An arrowhead is a rectangle 12 cm × 7 cm with a triangle of base 5 cm and height 7 cm removed from one end. Find the remaining area in cm².", "A = 12 \\times 7 - \\frac{1}{2} \\times 5 \\times 7", "66.5", "Rectangle: 84 cm². Triangle: ½ × 5 × 7 = 17.5 cm². Remaining = 84 − 17.5 = 66.5 cm²."),
    answer("y7-are-com-p18", "A composite shape is two identical rectangles each 9 cm × 5 cm joined along a 5 cm edge with no overlap. Find the total area in cm².", "A = 2 \\times (9 \\times 5)", "90", "Each: 9 × 5 = 45 cm². Total = 2 × 45 = 90 cm²."),
    answer("y7-are-com-p19", "A pool surround is 16 m × 10 m on the outside. The pool measures 10 m × 6 m. Find the area of the surround in m².", "A = 16 \\times 10 - 10 \\times 6", "100", "Outer = 160 m². Pool = 60 m². Surround = 160 − 60 = 100 m²."),
    answer("y7-are-com-p20", "A composite shape is a 13 cm × 6 cm rectangle and a 7 cm × 6 cm rectangle side by side. Find the total area in cm².", "A = (13 \\times 6) + (7 \\times 6)", "120", "78 + 42 = 120 cm²."),
    choice("y7-are-com-p21", "An L-shape is found by subtracting a 3 cm × 2 cm corner from a 7 cm × 5 cm rectangle. Which calculation is correct?", "A", ["(7 × 5) − (3 × 2)", "(7 × 5) + (3 × 2)", "(7 − 3) × (5 − 2)", "7 × 5 × 3 × 2"], "Subtraction method: full rectangle minus the cut-out corner = 35 − 6 = 29 cm²."),
    answer("y7-are-com-p22", "A T-shape has a top bar 20 cm × 5 cm and a stem 8 cm × 9 cm. Find the total area in cm².", "A = (20 \\times 5) + (8 \\times 9)", "172", "Top: 100 cm². Stem: 72 cm². Total = 172 cm²."),
    answer("y7-are-com-p23", "A rectangular floor 7 m × 5 m has a triangular alcove of base 4 m and perpendicular height 3 m added on one side. Find the total area in m².", "A = (7 \\times 5) + \\frac{1}{2} \\times 4 \\times 3", "41", "Rectangle: 35 m². Triangle: ½ × 4 × 3 = 6 m². Total = 35 + 6 = 41 m²."),
    answer("y7-are-com-p24", "A 10 cm × 8 cm rectangle has a smaller 3 cm × 3 cm square and a 2 cm × 4 cm rectangle removed. Find the remaining area in cm².", "A = 80 - 9 - 8", "63", "Full = 80 cm². Cut-outs = 9 + 8 = 17 cm². Remaining = 80 − 17 = 63 cm²."),
    answer("y7-are-com-p25", "A composite shape is a rectangle 15 cm × 8 cm with a triangle on top of base 15 cm and height 6 cm. Find the total area in cm².", "A = (15 \\times 8) + \\frac{1}{2} \\times 15 \\times 6", "165", "Rectangle: 120 cm². Triangle: ½ × 15 × 6 = 45 cm². Total = 120 + 45 = 165 cm²."),
    answer("y7-are-com-p26", "A garden is a 22 m × 14 m rectangle with a 6 m × 6 m square shed removed from one corner. Find the garden area in m².", "A = 22 \\times 14 - 6 \\times 6", "272", "Full = 308 m². Shed = 36 m². Remaining = 308 − 36 = 272 m²."),
  ],
  multiPartPractice: [
    {
      id: "y7-are-com-mp1",
      prompt:
        "A workshop floor plan is L-shaped. It is formed from a large rectangle 12 m long and 9 m wide, with a smaller rectangle 5 m long and 4 m wide removed from one corner. A triangular storage zone with base 6 m and perpendicular height 3 m is marked inside the remaining floor. Use these measurements to answer the parts below.",
      latex: "A_{\\text{rect}} = l \\times w \\qquad A_{\\text{tri}} = \\tfrac{1}{2}bh",
      answer: "88",
      hint: "Find the full rectangle, subtract the removed corner, then use ½bh for the storage zone.",
      explanation:
        "Full rectangle = 12 × 9 = 108 m². Removed corner = 5 × 4 = 20 m². L-shaped floor = 108 − 20 = 88 m². Storage zone = ½ × 6 × 3 = 9 m². Floor outside the storage zone = 88 − 9 = 79 m².",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the area of the full (uncut) large rectangle in m².",
          latex: "A = l \\times w",
          marks: 1,
          answer: "108",
          acceptedAnswers: ["108.0"],
          hint: "Multiply 12 by 9.",
          explanation: "A = 12 × 9 = 108 m².",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the area of the L-shaped floor after the corner is removed, in m².",
          latex: "A = 108 - (5 \\times 4)",
          marks: 1,
          answer: "88",
          acceptedAnswers: ["88.0"],
          hint: "Subtract the 5 m × 4 m corner from the full rectangle.",
          explanation: "Corner = 5 × 4 = 20 m². L-shape = 108 − 20 = 88 m².",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the area of the triangular storage zone in m².",
          latex: "A = \\frac{1}{2} \\times b \\times h",
          marks: 1,
          answer: "9",
          acceptedAnswers: ["9.0"],
          hint: "Use ½ × base × perpendicular height.",
          explanation: "A = ½ × 6 × 3 = ½ × 18 = 9 m².",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "Find the area of the L-shaped floor that is outside the storage zone, in m².",
          latex: "A = 88 - 9",
          marks: 1,
          answer: "79",
          acceptedAnswers: ["79.0"],
          hint: "Subtract the storage-zone area from the L-shaped floor area.",
          explanation: "Floor outside storage = 88 − 9 = 79 m².",
        },
      ],
    },
  ],
};

// ─── Lesson 4: Problem Solving ────────────────────────────────────────────────

const areaProblemSolving: LessonContent = {
  description: "Apply area formulas in real-world contexts including painting, tiling, and covering surfaces, and calculate cost when a rate per square unit is given.",
  learningIntention: "Solve real-world problems involving area, including unit conversion between mm², cm², and m², and finding cost at a given rate per square unit.",
  successCriteria: [
    "Identify the correct area formula for a given real-world shape.",
    "Convert between mm², cm², and m² as required by the problem.",
    "Calculate the area of a surface to be painted, tiled, or covered.",
    "Find the total cost by multiplying area by the cost rate per square unit.",
  ],
  teaching: {
    paragraphs: [
      "Area appears in everyday tasks: a painter needs to know the wall area to order paint, a tiler must count how many tiles cover a floor, a gardener calculates the area of a lawn to spread fertiliser. In each case, we use the same formulas — the context just changes.",
      "Units of area scale by the square of the unit conversion. Since 1 m = 100 cm, one square metre contains 100 × 100 = 10 000 square centimetres. To convert m² to cm², multiply by 10 000. To convert cm² to m², divide by 10 000. Similarly, 1 cm = 10 mm, so 1 cm² = 100 mm².",
      "To find cost, multiply the total area by the price per square unit. For example, tiles at $12 per m² covering an 8 m² floor cost 8 × $12 = $96. Always check that the area and the rate use the same unit before multiplying.",
      "In problems with multiple surfaces (for example, four walls of a room), find each surface area separately then add. If one surface has doors or windows, subtract their areas — you do not paint or tile what is already cut out.",
    ],
    latexBlocks: [
      "\\text{Cost} = \\text{area} \\times \\text{rate per unit area}",
      "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2 \\qquad 1 \\text{ cm}^2 = 100 \\text{ mm}^2",
    ],
  },
  workedExamples: [
    {
      title: "Tiling cost",
      questionLatex: "\\text{A rectangular floor is }5\\text{ m long and }4\\text{ m wide. Tiles cost }\\$18\\text{ per m}^2\\text{. Find the total tile cost.}",
      steps: [
        { explanation: "Find the area of the floor.", latex: "A = 5 \\times 4 = 20 \\text{ m}^2" },
        { explanation: "Multiply the area by the cost rate to find the total cost.", latex: "\\text{Cost} = 20 \\times 18 = 360" },
      ],
      finalAnswerLatex: "\\text{Total cost} = \\$360",
    },
    {
      title: "Painting a wall with a window",
      questionLatex: "\\text{A wall is }6\\text{ m wide and }2.5\\text{ m tall. It has a window }1.5\\text{ m} \\times 1\\text{ m. Find the area to be painted.}",
      steps: [
        { explanation: "Find the total area of the wall.", latex: "A_{\\text{wall}} = 6 \\times 2.5 = 15 \\text{ m}^2" },
        { explanation: "Find the area of the window that will not be painted.", latex: "A_{\\text{window}} = 1.5 \\times 1 = 1.5 \\text{ m}^2" },
        { explanation: "Subtract the window area from the wall area.", latex: "A_{\\text{paint}} = 15 - 1.5 = 13.5 \\text{ m}^2" },
      ],
      finalAnswerLatex: "A_{\\text{paint}} = 13.5 \\text{ m}^2",
    },
    {
      title: "Unit conversion — cm² to m²",
      questionLatex: "\\text{A garden bed is }350\\text{ cm long and }200\\text{ cm wide. Express the area in m}^2\\text{.}",
      steps: [
        { explanation: "Convert the dimensions to metres first.", latex: "350 \\text{ cm} = 3.5 \\text{ m}, \\quad 200 \\text{ cm} = 2 \\text{ m}" },
        { explanation: "Find the area in m².", latex: "A = 3.5 \\times 2 = 7 \\text{ m}^2" },
      ],
      finalAnswerLatex: "A = 7 \\text{ m}^2",
    },
  ],
  guidedPractice: [
    choice(
      "y7-are-prb-g1",
      "A rectangular garden bed is 3 m × 5 m. Mulch costs $8 per m². Which expression gives the total cost?",
      "B",
      ["(3 + 5) × 8", "(3 × 5) × 8", "3 × 5 + 8", "½ × 3 × 5 × 8"],
      "Area = 3 × 5 = 15 m². Cost = 15 × $8 = $120. Multiply area by rate."
    ),
    answer(
      "y7-are-prb-g2",
      "A rectangular room is 6 m long and 4 m wide. Carpet costs $15 per m². Find the total carpet cost in dollars.",
      "\\text{Cost} = (6 \\times 4) \\times 15",
      "360",
      "Area = 6 × 4 = 24 m². Cost = 24 × $15 = $360.",
      ["$360", "360.00"]
    ),
    answer(
      "y7-are-prb-g3",
      "Convert 2.5 m² into cm². Give your answer in cm².",
      "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2",
      "25000",
      "2.5 × 10 000 = 25 000 cm².",
      ["25,000"]
    ),
    answer(
      "y7-are-prb-g4",
      "A wall is 5 m wide and 3 m tall. It has a door 1 m × 2 m cut out. Find the area to be painted in m².",
      "A = (5 \\times 3) - (1 \\times 2)",
      "13",
      "Wall: 5 × 3 = 15 m². Door: 1 × 2 = 2 m². Paint area = 15 − 2 = 13 m²."
    ),
  ],
  independentPractice: [
    answer(
      "y7-are-prb-i1",
      "A triangular garden bed has base 6 m and perpendicular height 4 m. Fertiliser costs $5 per m². Find the total cost in dollars.",
      "\\text{Cost} = \\frac{1}{2} \\times 6 \\times 4 \\times 5",
      "60",
      "Area = ½ × 6 × 4 = 12 m². Cost = 12 × $5 = $60.",
      ["$60", "60.00"]
    ),
    answer(
      "y7-are-prb-i2",
      "A square courtyard has side length 8 m. Paving costs $22 per m². Find the total paving cost in dollars.",
      "\\text{Cost} = 8^2 \\times 22",
      "1408",
      "Area = 8² = 64 m². Cost = 64 × $22 = $1408.",
      ["$1408", "1,408", "$1,408"]
    ),
    answer(
      "y7-are-prb-i3",
      "A rectangular wall is 4.5 m wide and 3 m tall. One coat of paint covers 9 m² per litre. How many litres are needed to paint the wall? Give your answer in litres.",
      "\\text{litres} = \\frac{A}{9}",
      "1.5",
      "Wall area = 4.5 × 3 = 13.5 m². Litres needed = 13.5 ÷ 9 = 1.5 litres."
    ),
    answer(
      "y7-are-prb-i4",
      "A floor is 480 cm long and 300 cm wide. Express the area in m².",
      "\\text{Convert: } 480 \\text{ cm} = 4.8 \\text{ m}, \\; 300 \\text{ cm} = 3 \\text{ m}",
      "14.4",
      "480 cm = 4.8 m, 300 cm = 3 m. Area = 4.8 × 3 = 14.4 m²."
    ),
    answer(
      "y7-are-prb-i5",
      "A rectangular hall 12 m × 8 m has a stage area of 4 m × 6 m at one end. The rest of the floor is to be carpeted. Carpet costs $25 per m². Find the total carpet cost in dollars.",
      "\\text{Cost} = (12 \\times 8 - 4 \\times 6) \\times 25",
      "1800",
      "Hall: 12 × 8 = 96 m². Stage: 4 × 6 = 24 m². Carpeted area = 96 − 24 = 72 m². Cost = 72 × $25 = $1800.",
      ["$1800", "1,800", "$1,800"]
    ),
  ],
  commonMistakes: [
    { mistake: "Multiplying area in cm² by a rate given in $/m² without converting units first.", fix: "Convert area to m² (divide cm² by 10 000) before multiplying by the cost rate in $/m²." },
    { mistake: "Forgetting to subtract the area of doors or windows when calculating area to be painted.", fix: "Total paint area = full wall area minus the area of all openings. Subtract each door and window separately." },
    { mistake: "Confusing the unit conversion: multiplying by 100 instead of 10 000 when converting m² to cm².", fix: "1 m = 100 cm, so 1 m² = 100 × 100 = 10 000 cm². Always square the linear conversion factor." },
    { mistake: "Adding the rate to the area instead of multiplying to find cost.", fix: "Cost = area × rate. If the area is 15 m² and the rate is $8/m², cost = 15 × 8 = $120, not 15 + 8." },
  ],
  masteryQuiz: [
    answer(
      "y7-are-prb-m1",
      "A rectangular floor is 7 m × 5 m. Tiles cost $14 per m². Find the total tile cost in dollars.",
      "\\text{Cost} = (7 \\times 5) \\times 14",
      "490",
      "Area = 7 × 5 = 35 m². Cost = 35 × $14 = $490.",
      ["$490", "490.00"]
    ),
    answer(
      "y7-are-prb-m2",
      "A triangular flowerbed has base 8 m and perpendicular height 5 m. Mulch costs $6 per m². Find the total mulch cost in dollars.",
      "\\text{Cost} = \\frac{1}{2} \\times 8 \\times 5 \\times 6",
      "120",
      "Area = ½ × 8 × 5 = 20 m². Cost = 20 × $6 = $120.",
      ["$120", "120.00"]
    ),
    choice(
      "y7-are-prb-m3",
      "A floor has area 45 000 cm². What is this area in m²?",
      "B",
      ["450 m²", "4.5 m²", "0.45 m²", "4500 m²"],
      "Divide by 10 000 to convert cm² to m²: 45 000 ÷ 10 000 = 4.5 m²."
    ),
    answer(
      "y7-are-prb-m4",
      "A wall 8 m wide and 3 m tall has two windows each 1.5 m × 1.2 m. Find the area to be painted in m².",
      "A = (8 \\times 3) - 2 \\times (1.5 \\times 1.2)",
      "20.4",
      "Wall: 8 × 3 = 24 m². Each window: 1.5 × 1.2 = 1.8 m². Two windows: 2 × 1.8 = 3.6 m². Paint area = 24 − 3.6 = 20.4 m²."
    ),
    answer(
      "y7-are-prb-m5",
      "A rectangular bathroom floor is 250 cm × 200 cm. Square tiles each have side 50 cm. How many tiles are needed to cover the floor?",
      "\\text{Number of tiles} = \\frac{250 \\times 200}{50 \\times 50}",
      "20",
      "Floor: 250 × 200 = 50 000 cm². Each tile: 50 × 50 = 2500 cm². Number = 50 000 ÷ 2500 = 20 tiles."
    ),
    answer(
      "y7-are-prb-m6",
      "A lawn is 12 m × 9 m with a rectangular garden bed 3 m × 4 m removed from one corner. Lawn fertiliser costs $3 per m². Find the total fertiliser cost in dollars.",
      "\\text{Cost} = (12 \\times 9 - 3 \\times 4) \\times 3",
      "288",
      "Lawn: 12 × 9 = 108 m². Bed: 3 × 4 = 12 m². Remaining lawn = 108 − 12 = 96 m². Cost = 96 × $3 = $288.",
      ["$288", "288.00"]
    ),
    choice(
      "y7-are-prb-m7",
      "Paint covers 10 m² per litre and costs $18 per litre. A wall has area 45 m². How much will the paint cost?",
      "C",
      ["$810", "$180", "$81", "$450"],
      "Litres needed = 45 ÷ 10 = 4.5 L. Cost = 4.5 × $18 = $81."
    ),
    answer(
      "y7-are-prb-m8",
      "A square tile is 20 cm × 20 cm. How many tiles are needed to cover a floor of area 4.8 m²? Give your answer as a whole number.",
      "\\text{Tile area} = 0.2 \\times 0.2 = 0.04 \\text{ m}^2",
      "120",
      "Tile area = 0.2 × 0.2 = 0.04 m². Tiles needed = 4.8 ÷ 0.04 = 120 tiles."
    ),
    answer(
      "y7-are-prb-m9",
      "A parallelogram-shaped garden has base 9 m and perpendicular height 6 m. Turf costs $11 per m². Find the total turf cost in dollars.",
      "\\text{Cost} = (9 \\times 6) \\times 11",
      "594",
      "Area = 9 × 6 = 54 m². Cost = 54 × $11 = $594.",
      ["$594", "594.00"]
    ),
    answer(
      "y7-are-prb-m10",
      "A room floor is 5.5 m × 4 m. Carpet costs $32 per m². The installer charges a flat fee of $80. Find the total cost in dollars.",
      "\\text{Total} = (5.5 \\times 4) \\times 32 + 80",
      "784",
      "Area = 5.5 × 4 = 22 m². Carpet cost = 22 × $32 = $704. Total = $704 + $80 = $784.",
      ["$784", "784.00"]
    ),
  ],
  masteryQuizPool: [
    answer("y7-are-prb-p1", "A rectangular floor is 6 m × 4 m. Tiles cost $12 per m². Find the total tile cost in dollars.", "\\text{Cost} = (6 \\times 4) \\times 12", "288", "Area = 24 m². Cost = 24 × $12 = $288.", ["$288", "288.00"]),
    answer("y7-are-prb-p2", "A triangular flowerbed has base 10 m and perpendicular height 6 m. Mulch costs $4 per m². Find the total cost in dollars.", "\\text{Cost} = \\frac{1}{2} \\times 10 \\times 6 \\times 4", "120", "Area = ½ × 10 × 6 = 30 m². Cost = 30 × $4 = $120.", ["$120", "120.00"]),
    answer("y7-are-prb-p3", "Convert 3 m² into cm². Give your answer in cm².", "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2", "30000", "3 × 10 000 = 30 000 cm².", ["30,000"]),
    answer("y7-are-prb-p4", "A floor has area 80 000 cm². Express this in m².", "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2", "8", "80 000 ÷ 10 000 = 8 m²."),
    answer("y7-are-prb-p5", "A wall is 6 m wide and 3 m tall with a door 1 m × 2 m cut out. Find the area to be painted in m².", "A = (6 \\times 3) - (1 \\times 2)", "16", "Wall = 18 m². Door = 2 m². Paint = 18 − 2 = 16 m²."),
    answer("y7-are-prb-p6", "A square courtyard has side length 9 m. Paving costs $20 per m². Find the total cost in dollars.", "\\text{Cost} = 9^2 \\times 20", "1620", "Area = 81 m². Cost = 81 × $20 = $1620.", ["$1620", "1,620", "$1,620"]),
    answer("y7-are-prb-p7", "A rectangular room is 5 m × 4 m. Carpet costs $18 per m². Find the total carpet cost in dollars.", "\\text{Cost} = (5 \\times 4) \\times 18", "360", "Area = 20 m². Cost = 20 × $18 = $360.", ["$360", "360.00"]),
    choice("y7-are-prb-p8", "A floor has area 35 000 cm². What is this in m²?", "B", ["350 m²", "3.5 m²", "0.35 m²", "3500 m²"], "Divide by 10 000: 35 000 ÷ 10 000 = 3.5 m²."),
    answer("y7-are-prb-p9", "A floor is 600 cm long and 400 cm wide. Express its area in m².", "\\text{Convert to m first}", "24", "600 cm = 6 m, 400 cm = 4 m. Area = 6 × 4 = 24 m²."),
    answer("y7-are-prb-p10", "A wall 7 m wide and 3 m tall has a window 2 m × 1.5 m. Find the area to be painted in m².", "A = (7 \\times 3) - (2 \\times 1.5)", "18", "Wall = 21 m². Window = 3 m². Paint = 21 − 3 = 18 m²."),
    answer("y7-are-prb-p11", "A parallelogram garden has base 12 m and perpendicular height 7 m. Turf costs $9 per m². Find the total cost in dollars.", "\\text{Cost} = (12 \\times 7) \\times 9", "756", "Area = 84 m². Cost = 84 × $9 = $756.", ["$756", "756.00"]),
    answer("y7-are-prb-p12", "Paint covers 12 m² per litre. A wall has area 54 m². How many litres are needed? Give your answer in litres.", "\\text{litres} = \\frac{A}{12}", "4.5", "54 ÷ 12 = 4.5 litres."),
    answer("y7-are-prb-p13", "A square tile is 25 cm × 25 cm. How many tiles cover a floor of area 5 m²? Give your answer as a whole number.", "\\text{Tile area} = 0.25 \\times 0.25", "80", "Tile area = 0.0625 m². Tiles = 5 ÷ 0.0625 = 80."),
    answer("y7-are-prb-p14", "A rectangular hall 14 m × 9 m has a stage 5 m × 4 m at one end. The rest is carpeted at $30 per m². Find the carpet cost in dollars.", "\\text{Cost} = (14 \\times 9 - 5 \\times 4) \\times 30", "3180", "Hall = 126 m². Stage = 20 m². Carpet = 106 m². Cost = 106 × $30 = $3180.", ["$3180", "3,180", "$3,180"]),
    answer("y7-are-prb-p15", "A wall 8 m wide and 3 m tall has two windows each 1.2 m × 1 m. Find the area to be painted in m².", "A = (8 \\times 3) - 2 \\times (1.2 \\times 1)", "21.6", "Wall = 24 m². Two windows = 2 × 1.2 = 2.4 m². Paint = 24 − 2.4 = 21.6 m²."),
    choice("y7-are-prb-p16", "Paint covers 8 m² per litre and costs $20 per litre. A wall has area 40 m². How much will the paint cost?", "C", ["$800", "$320", "$100", "$160"], "Litres = 40 ÷ 8 = 5 L. Cost = 5 × $20 = $100."),
    answer("y7-are-prb-p17", "Convert 4.7 m² into cm². Give your answer in cm².", "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2", "47000", "4.7 × 10 000 = 47 000 cm².", ["47,000"]),
    answer("y7-are-prb-p18", "A rectangular bathroom 300 cm × 240 cm is tiled with 60 cm × 60 cm tiles. How many tiles are needed?", "\\frac{300 \\times 240}{60 \\times 60}", "20", "Floor = 72 000 cm². Tile = 3600 cm². Number = 72 000 ÷ 3600 = 20 tiles."),
    answer("y7-are-prb-p19", "A triangular garden has base 9 m and perpendicular height 8 m. Fertiliser costs $7 per m². Find the total cost in dollars.", "\\text{Cost} = \\frac{1}{2} \\times 9 \\times 8 \\times 7", "252", "Area = ½ × 9 × 8 = 36 m². Cost = 36 × $7 = $252.", ["$252", "252.00"]),
    answer("y7-are-prb-p20", "A room floor is 6 m × 4.5 m. Carpet costs $28 per m². The installer charges a flat fee of $90. Find the total cost in dollars.", "\\text{Total} = (6 \\times 4.5) \\times 28 + 90", "846", "Area = 27 m². Carpet = 27 × $28 = $756. Total = 756 + 90 = $846.", ["$846", "846.00"]),
    answer("y7-are-prb-p21", "A square tile is 50 cm × 50 cm. How many tiles cover a floor of area 9 m²? Give your answer as a whole number.", "\\text{Tile area} = 0.5 \\times 0.5", "36", "Tile = 0.25 m². Tiles = 9 ÷ 0.25 = 36."),
    answer("y7-are-prb-p22", "A lawn 15 m × 10 m has a 4 m × 3 m bed removed. Fertiliser costs $2 per m². Find the total cost in dollars.", "\\text{Cost} = (15 \\times 10 - 4 \\times 3) \\times 2", "276", "Lawn = 150 m². Bed = 12 m². Remaining = 138 m². Cost = 138 × $2 = $276.", ["$276", "276.00"]),
    choice("y7-are-prb-p23", "A floor measures 250 cm by 160 cm. What is its area in m²?", "A", ["4 m²", "40 m²", "0.4 m²", "400 m²"], "250 cm = 2.5 m, 160 cm = 1.6 m. Area = 2.5 × 1.6 = 4 m²."),
    answer("y7-are-prb-p24", "A wall 5 m wide and 2.5 m tall has a door 1 m × 2 m and a window 1 m × 1 m. Find the area to be painted in m².", "A = (5 \\times 2.5) - (1 \\times 2) - (1 \\times 1)", "9.5", "Wall = 12.5 m². Door = 2 m². Window = 1 m². Paint = 12.5 − 3 = 9.5 m²."),
    answer("y7-are-prb-p25", "A rectangular deck is 8 m × 5 m. Decking oil covers 10 m² per litre and costs $24 per litre. Find the total oil cost in dollars.", "\\text{Cost} = \\frac{8 \\times 5}{10} \\times 24", "96", "Area = 40 m². Litres = 40 ÷ 10 = 4. Cost = 4 × $24 = $96.", ["$96", "96.00"]),
    answer("y7-are-prb-p26", "Convert 25 000 cm² into m². Give your answer in m².", "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2", "2.5", "25 000 ÷ 10 000 = 2.5 m²."),
  ],
  multiPartPractice: [
    {
      id: "y7-are-prb-mp1",
      prompt:
        "A rectangular feature wall in a cafe is 8 m wide and 3 m tall. It contains a window 2 m wide and 1.5 m tall that will not be painted. Paint costs $15 per square metre of painted surface. Use these measurements to answer the parts below.",
      latex: "A = l \\times w \\qquad \\text{Cost} = \\text{area} \\times \\text{rate}",
      answer: "24",
      hint: "Find the full wall area, subtract the window, then multiply the painted area by $15.",
      explanation:
        "Wall = 8 × 3 = 24 m². Window = 2 × 1.5 = 3 m². Painted area = 24 − 3 = 21 m². Cost = 21 × $15 = $315.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the total area of the wall in m².",
          latex: "A = l \\times w",
          marks: 1,
          answer: "24",
          acceptedAnswers: ["24.0"],
          hint: "Multiply width by height.",
          explanation: "A = 8 × 3 = 24 m².",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the area of the window in m².",
          latex: "A = l \\times w",
          marks: 1,
          answer: "3",
          acceptedAnswers: ["3.0"],
          hint: "Multiply the window's width by its height.",
          explanation: "A = 2 × 1.5 = 3 m².",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the area that will actually be painted in m².",
          latex: "A_{\\text{paint}} = A_{\\text{wall}} - A_{\\text{window}}",
          marks: 1,
          answer: "21",
          acceptedAnswers: ["21.0"],
          hint: "Subtract the window area from the wall area.",
          explanation: "Painted area = 24 − 3 = 21 m².",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "Paint costs $15 per m². Find the total cost of painting the wall, in dollars.",
          latex: "\\text{Cost} = 21 \\times 15",
          marks: 1,
          answer: "315",
          acceptedAnswers: ["$315", "315.00", "$315.00"],
          hint: "Multiply the painted area by the rate per square metre.",
          explanation: "Cost = 21 × $15 = $315.",
        },
      ],
    },
  ],
};

// ─── Lesson registry ──────────────────────────────────────────────────────────

// These area lessons were authored without per-question difficulty fields, so the
// worksheet generator / Skill Map could not tier them (no D1–D5 representation).
// withDifficulty assigns a difficulty to every practice question by tier so each
// level is represented: guided D1–D2, independent D2–D3, mastery D3–D5, and the
// mastery pool is spread evenly across D1–D5 (so every level appears). The single
// multi-part question is the hardest (D6). Content is otherwise byte-stable.
function withDifficulty(content: LessonContent): LessonContent {
  const tier = (arr: PracticeQuestion[] | undefined, levels: number[]): PracticeQuestion[] =>
    (arr ?? []).map((q, i) => ({ ...q, difficulty: levels[i % levels.length] }));
  return {
    ...content,
    guidedPractice: tier(content.guidedPractice, [1, 2]),
    independentPractice: tier(content.independentPractice, [2, 3]),
    masteryQuiz: tier(content.masteryQuiz, [3, 4, 5]),
    masteryQuizPool: tier(content.masteryQuizPool, [1, 2, 3, 4, 5]),
    multiPartPractice: tier(content.multiPartPractice, [6]),
  };
}

const lessons: Record<string, LessonContent> = {
  "area-rectangles-triangles": withDifficulty(areaRectanglesTriangles),
  "area-parallelograms-trapezoids": withDifficulty(areaParallelogramsTrapezoids),
  "area-composite-shapes": withDifficulty(areaCompositeShapes),
  "area-problem-solving": withDifficulty(areaProblemSolving),
};

export function year7AreaLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "area") {
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
