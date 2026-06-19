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
    hint: "Use the area formula for this shape and substitute the given measurements.",
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
      "Area is the amount of flat surface inside a shape — how much space it covers. The way we measure it is to ask: how many identical little squares would it take to tile the inside completely, with no gaps and no overlaps? That count is the area. Because we are counting squares, area is always written in $\\text{square}$ units — square centimetres $\\text{cm}^2$, square metres $\\text{m}^2$, and so on.",
      "Picture a rectangle 5 cm long and 3 cm wide drawn on grid paper. You can fit a row of 5 little 1 cm squares along the bottom, and you can stack 3 such rows to reach the top. That is $5 \\times 3 = 15$ squares in total, so the area is $15\\text{ cm}^2$. You did not have to count them one by one — multiplying the length by the width gives the count straight away.",
      "That picture is exactly the rectangle formula: $A = l \\times w$. The length tells you how many squares are in each row, and the width tells you how many rows there are, so multiplying gives the total number of unit squares. A square is just a rectangle whose length and width are equal, so $A = s \\times s = s^2$.",
      "Now for the triangle, and here is the key idea: every triangle is exactly half of a rectangle. Take any triangle, then build the smallest rectangle around it that has the same base along the bottom and reaches the same height at the top. The triangle slices that rectangle into pieces, and those pieces fold up to fill exactly one half of the rectangle — the other half is empty. So the triangle's area is half the rectangle's area: $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$.",
      "The word $\\text{height}$ in that formula means the perpendicular height — the straight up-and-down distance from the base to the tip of the triangle, measured at a right angle to the base. It does not mean the length of a slanted side. This matters because the slant side is always longer than the perpendicular height, so using it would make the rectangle taller than it really is and give too big an answer. On a diagram the perpendicular height is the dotted line that meets the base at a right angle — use that, never the sloping edge.",
      "Once you trust a formula, you can run it backwards to find a missing measurement. If you know the area and the base of a triangle but not the height, start from $A = \\frac{1}{2}bh$ and undo each operation: the base is multiplied in and then the result is halved, so to get $h$ alone you multiply the area by 2 and then divide by the base, giving $h = \\frac{2A}{b}$. This is the same balancing you use to solve any simple equation — do the same thing to both sides until the unknown is alone.",
      "The same three ideas — count the unit squares, halve a rectangle for a triangle, and use the perpendicular height — carry straight into bigger problems. A real garden bed, a tiled floor, or an exam diagram is built from these basic shapes, so a question about an unfamiliar figure is almost always a familiar rectangle or triangle in disguise.",
    ],
    latexBlocks: [
      "A_{\\text{rectangle}} = l \\times w \\qquad A_{\\text{square}} = s^2",
      "A_{\\text{triangle}} = \\frac{1}{2} \\times b \\times h \\quad (h \\text{ is the perpendicular height})",
      "\\text{half of a rectangle: } \\tfrac{1}{2}(b \\times h)",
      "\\text{Rearranged: } h = \\frac{2A}{b} \\qquad b = \\frac{2A}{h}",
    ],
  },
  workedExamples: [
    {
      title: "Area of a triangle using perpendicular height",
      questionLatex: "\\text{Find the area of a triangle with base }8\\text{ cm and perpendicular height }5\\text{ cm.}",
      planeShapeDiagram: {
        description: "Triangle with base 8 cm along the bottom; the apex sits 5 cm vertically above the base, the perpendicular height.",
        vertices: [
          { x: 0, y: 0 },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 5 },
        ],
        edges: [{ label: "8 cm" }, { label: "5 cm" }, {}],
        fill: "blue",
      },
      steps: [
        { explanation: "A triangle is half its surrounding rectangle, so write the half-base-times-height formula.", latex: "A = \\frac{1}{2} \\times b \\times h" },
        { explanation: "Substitute the base and the perpendicular height — not any slanted side.", latex: "A = \\frac{1}{2} \\times 8 \\times 5" },
        { explanation: "Multiply the base and height to get the full rectangle, which is 40.", latex: "8 \\times 5 = 40" },
        { explanation: "Take half of that rectangle to get the triangle's area.", latex: "A = \\frac{1}{2} \\times 40 = 20" },
      ],
      finalAnswerLatex: "A = 20 \\text{ cm}^2",
    },
    {
      title: "Area of a square",
      questionLatex: "\\text{Find the area of a square tile with side length }9\\text{ cm.}",
      planeShapeDiagram: {
        description: "Square tile with all four sides 9 cm and a right angle at each corner.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 9, y: 0, rightAngle: true },
          { x: 9, y: 9, rightAngle: true },
          { x: 0, y: 9, rightAngle: true },
        ],
        edges: [
          { label: "9 cm", ticks: 1 },
          { label: "9 cm", ticks: 1 },
          { ticks: 1 },
          { ticks: 1 },
        ],
        fill: "teal",
      },
      steps: [
        { explanation: "A square is a rectangle whose length and width are equal, so multiply the side by itself.", latex: "A = s^2" },
        { explanation: "Substitute the side length of 9 cm.", latex: "A = 9^2" },
        { explanation: "Square the side to count the unit squares inside.", latex: "A = 9 \\times 9 = 81" },
      ],
      finalAnswerLatex: "A = 81 \\text{ cm}^2",
    },
    {
      title: "Find a missing length given the area",
      questionLatex: "\\text{A rectangle has area }48\\text{ cm}^2\\text{ and length }8\\text{ cm. Find the width.}",
      planeShapeDiagram: {
        description: "Rectangle of area 48 cm² with length 8 cm along the bottom and an unknown width w on the right side.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 4, rightAngle: true },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "8 cm" }, { label: "w = ?" }, {}, {}],
        fill: "amber",
      },
      steps: [
        { explanation: "Start from the rectangle formula and put in what you know.", latex: "A = l \\times w \\;\\Rightarrow\\; 48 = 8 \\times w" },
        { explanation: "The width is multiplied by 8, so undo that by dividing both sides by 8.", latex: "\\frac{48}{8} = w" },
        { explanation: "Carry out the division to find the width.", latex: "w = 6" },
      ],
      finalAnswerLatex: "w = 6 \\text{ cm}",
    },
    {
      title: "Harder: right-angled triangle where the slant side is a trap",
      questionLatex: "\\text{A right-angled triangle has legs }9\\text{ cm and }12\\text{ cm, and hypotenuse }15\\text{ cm. Find its area.}",
      planeShapeDiagram: {
        description: "Right-angled triangle with legs 12 cm (base) and 9 cm (vertical) meeting at the right angle, and a slanted hypotenuse of 15 cm.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0 },
          { x: 0, y: 9 },
        ],
        edges: [{ label: "12 cm" }, { label: "15 cm" }, { label: "9 cm" }],
        fill: "blue",
      },
      steps: [
        { explanation: "In a right-angled triangle the two legs meet at the right angle, so one leg is the base and the other is the perpendicular height.", latex: "b = 12, \\quad h = 9" },
        { explanation: "The hypotenuse (15 cm) is the slant side, so it is not used in the area formula.", latex: "A = \\frac{1}{2} \\times 12 \\times 9" },
        { explanation: "Multiply the base by the height to get the surrounding rectangle.", latex: "12 \\times 9 = 108" },
        { explanation: "Halve it because the triangle fills exactly half that rectangle.", latex: "A = \\frac{1}{2} \\times 108 = 54" },
      ],
      finalAnswerLatex: "A = 54 \\text{ cm}^2",
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
    {
      ...answer(
        "y7-are-rtr-g2",
        "Find the area of a rectangle with length 12 cm and width 5 cm. Give your answer in cm².",
        "A = l \\times w",
        "60",
        "A = 12 × 5 = 60 cm²."
      ),
      planeShapeDiagram: {
        description: "Rectangle with length 12 cm along the bottom and width 5 cm up the side, right angles at each corner.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 5, rightAngle: true },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "12 cm" }, { label: "5 cm" }, {}, {}],
        fill: "blue",
      },
    },
    {
      ...answer(
        "y7-are-rtr-g3",
        "Find the area of a triangle with base 14 cm and perpendicular height 6 cm. Give your answer in cm².",
        "A = \\frac{1}{2} \\times b \\times h",
        "42",
        "A = ½ × 14 × 6 = ½ × 84 = 42 cm²."
      ),
      planeShapeDiagram: {
        description: "Triangle with base 14 cm along the bottom and perpendicular height 6 cm from the base to the apex.",
        vertices: [
          { x: 0, y: 0 },
          { x: 14, y: 0, rightAngle: true },
          { x: 14, y: 6 },
        ],
        edges: [{ label: "14 cm" }, { label: "6 cm" }, {}],
        fill: "teal",
      },
    },
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
      "A parallelogram is a four-sided shape with two pairs of parallel sides — picture a rectangle that has been pushed over so it leans to one side. It looks more complicated than a rectangle, but it covers exactly the same amount of space, and there is a neat way to see why.",
      "Imagine a leaning parallelogram drawn on grid paper. Slice straight down from the top corner to the base to cut off the triangular overhang on one end. Now slide that triangle across to the other end, where it fits perfectly into the matching gap. The pieces have not changed size, but the shape is now a plain rectangle — and that rectangle has the same base along the bottom and the same up-and-down height as the parallelogram you started with. Because cutting and sliding never adds or removes any surface, the areas are equal, so $A = b \\times h$, just like a rectangle.",
      "The $h$ in that formula is the perpendicular height — the straight up-and-down distance between the two parallel bases, measured at a right angle — not the length of the leaning slant side. The slant side is the longer, sloping edge; using it would describe a taller rectangle than the cut-and-slide actually produced. For a parallelogram with base 8 cm, perpendicular height 5 cm and slant side 6 cm, the area is $8 \\times 5 = 40\\text{ cm}^2$, never $8 \\times 6 = 48\\text{ cm}^2$.",
      "A rhombus is a parallelogram with all four sides equal — a diamond. Its two diagonals cross each other at right angles and cut it into four right-angled triangles. The neat picture is this: build a rectangle around the rhombus whose side lengths are the two diagonals $d_1$ and $d_2$. The four triangles of the rhombus fill exactly half of that rectangle, so the rhombus area is half of $d_1 \\times d_2$, giving $A = \\frac{1}{2} \\times d_1 \\times d_2$.",
      "A trapezoid has just one pair of parallel sides — call their lengths $a$ and $b$ — separated by a perpendicular height $h$. To see its area, imagine making a second copy of the trapezoid, flipping it upside down, and fitting it against the first. Together the two trapezoids form a parallelogram whose base is the two parallel sides added together, $a + b$, with the same height $h$. That double-shape has area $(a + b) \\times h$, so a single trapezoid is half of it: $A = \\frac{1}{2}(a + b)h$.",
      "Reading that formula in plain words, $\\frac{1}{2}(a + b)$ is just the average of the two parallel sides. So a trapezoid behaves like a rectangle whose width is the average of its top and bottom edges. The most common slip is to forget the $\\frac{1}{2}$ or to add the two slanting non-parallel sides by mistake — only the two parallel sides go inside the bracket, and the whole thing is then halved.",
    ],
    latexBlocks: [
      "A_{\\text{parallelogram}} = b \\times h \\quad (h \\text{ is the perpendicular height})",
      "A_{\\text{rhombus}} = \\frac{1}{2} \\times d_1 \\times d_2",
      "A_{\\text{trapezoid}} = \\frac{1}{2}(a + b) \\times h \\quad (a, b \\text{ are the parallel sides})",
      "\\tfrac{1}{2}(a+b) = \\text{average of the two parallel sides}",
    ],
  },
  workedExamples: [
    {
      title: "Area of a parallelogram (slant side is a trap)",
      questionLatex: "\\text{A parallelogram has base }10\\text{ cm, perpendicular height }6\\text{ cm, and slant side }7\\text{ cm. Find the area.}",
      planeShapeDiagram: {
        description: "Parallelogram leaning to the right with base 10 cm along the bottom and a slanted side of 7 cm. The perpendicular height between the two horizontal sides is 6 cm.",
        vertices: [
          { x: 0, y: 0 },
          { x: 10, y: 0 },
          { x: 13, y: 6 },
          { x: 3, y: 6 },
        ],
        edges: [
          { label: "10 cm", arrows: 1 },
          { label: "7 cm" },
          { arrows: 1 },
          {},
        ],
        fill: "blue",
      },
      steps: [
        { explanation: "Cut-and-slide turns the parallelogram into a rectangle of the same base and height, so use base times height.", latex: "A = b \\times h" },
        { explanation: "Substitute the base and the perpendicular height; the 7 cm slant side describes a leaning edge, not the rectangle's height, so it is not used.", latex: "A = 10 \\times 6" },
        { explanation: "Multiply to count the unit squares.", latex: "A = 60" },
      ],
      finalAnswerLatex: "A = 60 \\text{ cm}^2",
    },
    {
      title: "Area of a rhombus using diagonals",
      questionLatex: "\\text{A rhombus has diagonals of length }12\\text{ cm and }8\\text{ cm. Find the area.}",
      planeShapeDiagram: {
        description: "Rhombus (diamond) with all four sides equal. Its horizontal diagonal is 12 cm and its vertical diagonal is 8 cm; the diagonals cross at right angles at the centre.",
        vertices: [
          { x: 12, y: 4, label: "d_1 = 12 cm" },
          { x: 6, y: 8 },
          { x: 0, y: 4 },
          { x: 6, y: 0, label: "d_2 = 8 cm" },
        ],
        edges: [{ ticks: 1 }, { ticks: 1 }, { ticks: 1 }, { ticks: 1 }],
        fill: "teal",
      },
      steps: [
        { explanation: "The rhombus fills half of the rectangle built on its two diagonals, so use half the product of the diagonals.", latex: "A = \\frac{1}{2} \\times d_1 \\times d_2" },
        { explanation: "Substitute the two diagonal lengths.", latex: "A = \\frac{1}{2} \\times 12 \\times 8" },
        { explanation: "Multiply the diagonals to get the surrounding rectangle.", latex: "12 \\times 8 = 96" },
        { explanation: "Halve it because the rhombus is half that rectangle.", latex: "A = \\frac{1}{2} \\times 96 = 48" },
      ],
      finalAnswerLatex: "A = 48 \\text{ cm}^2",
    },
    {
      title: "Area of a trapezoid",
      questionLatex: "\\text{A trapezoid has parallel sides of }5\\text{ cm and }11\\text{ cm, and perpendicular height }4\\text{ cm. Find the area.}",
      planeShapeDiagram: {
        description: "Trapezoid with the two parallel sides horizontal: the longer parallel side is 11 cm along the bottom and the shorter parallel side is 5 cm along the top. The perpendicular height between them is 4 cm.",
        vertices: [
          { x: 0, y: 0 },
          { x: 11, y: 0 },
          { x: 8, y: 4 },
          { x: 3, y: 4 },
        ],
        edges: [
          { label: "11 cm", arrows: 1 },
          {},
          { label: "5 cm", arrows: 1 },
          {},
        ],
        fill: "violet",
      },
      steps: [
        { explanation: "Two copies of the trapezoid make a parallelogram of base (a + b), so a single one is half of (a + b) times the height.", latex: "A = \\frac{1}{2}(a + b) \\times h" },
        { explanation: "Substitute the two parallel sides and the perpendicular height.", latex: "A = \\frac{1}{2}(5 + 11) \\times 4" },
        { explanation: "Add the parallel sides inside the bracket first.", latex: "5 + 11 = 16" },
        { explanation: "Multiply by the height and then halve.", latex: "A = \\frac{1}{2} \\times 16 \\times 4 = \\frac{1}{2} \\times 64 = 32" },
      ],
      finalAnswerLatex: "A = 32 \\text{ cm}^2",
    },
    {
      title: "Harder: work a trapezoid backwards to find a missing side",
      questionLatex: "\\text{A trapezoid has area }96\\text{ cm}^2\\text{, perpendicular height }8\\text{ cm, and one parallel side }10\\text{ cm. Find the other parallel side.}",
      planeShapeDiagram: {
        description: "Trapezoid of area 96 cm² with parallel sides horizontal: one parallel side is 10 cm and the other (labelled b) is unknown. The perpendicular height between them is 8 cm.",
        vertices: [
          { x: 0, y: 0 },
          { x: 14, y: 0 },
          { x: 12, y: 8 },
          { x: 2, y: 8 },
        ],
        edges: [
          { label: "b = ?", arrows: 1 },
          {},
          { label: "10 cm", arrows: 1 },
          {},
        ],
        fill: "amber",
      },
      steps: [
        { explanation: "Start from the trapezoid formula with the unknown side as b.", latex: "96 = \\frac{1}{2}(10 + b) \\times 8" },
        { explanation: "Half of the height (8) is 4, so the bracket is multiplied by 4; undo that by dividing the area by 4.", latex: "\\frac{96}{4} = 10 + b" },
        { explanation: "That gives the sum of the two parallel sides.", latex: "24 = 10 + b" },
        { explanation: "Subtract the known side from both sides to isolate b.", latex: "b = 24 - 10 = 14" },
      ],
      finalAnswerLatex: "\\text{The other parallel side} = 14 \\text{ cm}",
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
    {
      ...answer(
        "y7-are-par-g2",
        "Find the area of a parallelogram with base 7 cm and perpendicular height 4 cm. Give your answer in cm².",
        "A = b \\times h",
        "28",
        "A = 7 × 4 = 28 cm²."
      ),
      planeShapeDiagram: {
        description: "Parallelogram leaning to the right with base 7 cm along the bottom. The perpendicular height between the two parallel horizontal sides is 4 cm.",
        vertices: [
          { x: 0, y: 0 },
          { x: 7, y: 0 },
          { x: 9, y: 4 },
          { x: 2, y: 4 },
        ],
        edges: [{ label: "7 cm", arrows: 1 }, {}, { arrows: 1 }, {}],
        fill: "blue",
      },
    },
    answer(
      "y7-are-par-g3",
      "A rhombus has diagonals of 10 cm and 6 cm. Find the area in cm².",
      "A = \\frac{1}{2} \\times d_1 \\times d_2",
      "30",
      "A = ½ × 10 × 6 = ½ × 60 = 30 cm²."
    ),
    {
      ...answer(
        "y7-are-par-g4",
        "A trapezoid has parallel sides of 4 cm and 8 cm and perpendicular height 5 cm. Find the area in cm².",
        "A = \\frac{1}{2}(a + b) \\times h",
        "30",
        "A = ½ × (4 + 8) × 5 = ½ × 12 × 5 = ½ × 60 = 30 cm²."
      ),
      planeShapeDiagram: {
        description: "Trapezoid with parallel sides horizontal: the longer parallel side is 8 cm along the bottom and the shorter parallel side is 4 cm along the top. The perpendicular height between them is 5 cm.",
        vertices: [
          { x: 0, y: 0 },
          { x: 8, y: 0 },
          { x: 6, y: 5 },
          { x: 2, y: 5 },
        ],
        edges: [{ label: "8 cm", arrows: 1 }, {}, { label: "4 cm", arrows: 1 }, {}],
        fill: "violet",
      },
    },
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
      "A composite shape is one that does not match any single formula because it is really several simple shapes — rectangles, triangles, trapezoids — built together. There is no special composite formula to memorise. The whole skill is to break the figure into pieces you already know, work out each piece, and combine the results. The shapes are unfamiliar; the method is not.",
      "There are two ways to combine, and they are really the same idea seen from two directions. The first is addition: split the figure into non-overlapping pieces and add their areas. An L-shaped room, for instance, divides neatly into two rectangles — find each rectangle from the marked dimensions and add. Because area simply counts unit squares, the total number of squares in the whole figure is just the squares in piece one plus the squares in piece two.",
      "The second way is subtraction: draw the smallest simple shape that completely surrounds the figure, find its area, then subtract the area of the part that is missing. A picture frame is the clearest case — take the full outer rectangle and subtract the rectangular hole where the picture sits. The squares that are left after removing the hole are exactly the squares of the frame. Use whichever method gives you the simplest pieces; the two routes always agree because adding the kept pieces and removing the missing piece describe the same set of unit squares.",
      "Before you can add or subtract, you often have to find a length that is not labelled. The dimensions of the pieces hide inside the overall measurements. If a long edge is marked 12 cm and the part of it belonging to one piece is 7 cm, then the remaining piece must be $12 - 7 = 5$ cm. Always pin down every side of every piece before reaching for a formula.",
      "The one rule that protects you from a wrong answer is: never count the same square twice, and never leave a square out. When you split by addition, the cut line must hand each region to exactly one piece, with no shared strip belonging to both. When two given shapes overlap, their overlap is counted once in each, so you subtract that overlap exactly once to fix the double-count. Sketching the split and labelling each piece before calculating is what keeps this straight.",
      "These two moves — slice into known pieces and add, or surround and subtract — are the engine behind almost every real area problem: floor plans, garden layouts, sheet-metal cut-outs, painted walls with windows. Once you can see a strange outline as a few rectangles and triangles, an unfamiliar exam figure stops being a new topic and becomes the shapes you already know.",
    ],
    latexBlocks: [
      "A_{\\text{composite}} = A_1 + A_2 + \\cdots \\quad \\text{(addition method)}",
      "A_{\\text{composite}} = A_{\\text{large}} - A_{\\text{cut-out}} \\quad \\text{(subtraction method)}",
      "A_{\\text{overlap counted once}} = A_1 + A_2 - A_{\\text{overlap}}",
    ],
  },
  workedExamples: [
    {
      title: "L-shape by subtraction",
      questionLatex: "\\text{An L-shaped figure is a full rectangle }10\\text{ cm} \\times 8\\text{ cm with a }4\\text{ cm} \\times 5\\text{ cm rectangle removed from one corner. Find the total area.}",
      planeShapeDiagram: {
        description: "L-shaped figure: a 10 cm wide by 8 cm tall rectangle with a 4 cm wide by 5 cm tall rectangle cut from the top-right corner. Outer edges measure 10 cm along the bottom and 8 cm up the left; the notch removes 4 cm from the top and 5 cm down the right.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 3, rightAngle: true },
          { x: 6, y: 3, rightAngle: true },
          { x: 6, y: 8, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
        ],
        edges: [
          { label: "10 cm" },
          { label: "3 cm" },
          { label: "4 cm" },
          { label: "5 cm" },
          { label: "6 cm" },
          { label: "8 cm" },
        ],
        fill: "violet",
      },
      steps: [
        { explanation: "Surround the L with the smallest full rectangle, then find that rectangle's area.", latex: "A_{\\text{full}} = 10 \\times 8 = 80" },
        { explanation: "Find the area of the corner piece that has been cut away.", latex: "A_{\\text{cut}} = 4 \\times 5 = 20" },
        { explanation: "Subtract the missing corner so only the L-shaped squares remain.", latex: "A = 80 - 20 = 60" },
      ],
      finalAnswerLatex: "A = 60 \\text{ cm}^2",
    },
    {
      title: "House shape by addition (rectangle + triangle)",
      questionLatex: "\\text{A house outline is a rectangle }6\\text{ cm wide and }4\\text{ cm tall, topped by a triangular roof with base }6\\text{ cm and perpendicular height }3\\text{ cm. Find the total area.}",
      planeShapeDiagram: {
        description: "House outline: a 6 cm wide by 4 cm tall rectangle with a triangular roof on top. The roof has base 6 cm and rises 3 cm to its apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0, rightAngle: true },
          { x: 6, y: 4, rightAngle: true },
          { x: 3, y: 7 },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "6 cm" }, { label: "4 cm" }, {}, {}, { label: "4 cm" }],
        fill: "amber",
      },
      steps: [
        { explanation: "Split the figure along the roof line into a rectangle below and a triangle above, then find the rectangle.", latex: "A_{\\text{rect}} = 6 \\times 4 = 24" },
        { explanation: "Find the triangular roof, remembering the one-half for a triangle.", latex: "A_{\\text{tri}} = \\frac{1}{2} \\times 6 \\times 3 = 9" },
        { explanation: "The two pieces do not overlap, so add their squares for the total.", latex: "A = 24 + 9 = 33" },
      ],
      finalAnswerLatex: "A = 33 \\text{ cm}^2",
    },
    {
      title: "T-shape by addition",
      questionLatex: "\\text{A T-shape has a top bar }12\\text{ cm wide and }4\\text{ cm tall, with a stem }4\\text{ cm wide and }6\\text{ cm tall hanging from the middle. Find the total area.}",
      planeShapeDiagram: {
        description: "T-shape: a horizontal top bar 12 cm wide and 4 cm tall, with a vertical stem 4 cm wide and 6 cm tall hanging from the centre of the bar.",
        vertices: [
          { x: 4, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 6, rightAngle: true },
          { x: 12, y: 6, rightAngle: true },
          { x: 12, y: 10, rightAngle: true },
          { x: 0, y: 10, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
          { x: 4, y: 6, rightAngle: true },
        ],
        edges: [
          { label: "4 cm" },
          { label: "6 cm" },
          {},
          { label: "4 cm" },
          { label: "12 cm" },
          {},
          {},
          {},
        ],
        fill: "teal",
      },
      steps: [
        { explanation: "Split the T into the horizontal top bar and the vertical stem, then find the top bar.", latex: "A_{\\text{top}} = 12 \\times 4 = 48" },
        { explanation: "Find the area of the vertical stem.", latex: "A_{\\text{stem}} = 4 \\times 6 = 24" },
        { explanation: "The cut line gives every square to exactly one piece, so add them.", latex: "A = 48 + 24 = 72" },
      ],
      finalAnswerLatex: "A = 72 \\text{ cm}^2",
    },
    {
      title: "Harder: two overlapping rectangles (avoid double-counting)",
      questionLatex: "\\text{A cross is a vertical rectangle }3\\text{ cm} \\times 10\\text{ cm and a horizontal rectangle }8\\text{ cm} \\times 3\\text{ cm crossing at the centre. They overlap in a }3\\text{ cm} \\times 3\\text{ cm square. Find the total area.}",
      planeShapeDiagram: {
        description: "Cross (plus) shape made of a vertical rectangle 3 cm wide and 10 cm tall overlapping a horizontal rectangle 8 cm wide and 3 cm tall at the centre. The shared overlap is a 3 cm by 3 cm square. The vertical arm is 3 cm wide, the horizontal arm is 3 cm tall.",
        vertices: [
          { x: 2.5, y: 0, rightAngle: true },
          { x: 5.5, y: 0, rightAngle: true },
          { x: 5.5, y: 3.5, rightAngle: true },
          { x: 8, y: 3.5, rightAngle: true },
          { x: 8, y: 6.5, rightAngle: true },
          { x: 5.5, y: 6.5, rightAngle: true },
          { x: 5.5, y: 10, rightAngle: true },
          { x: 2.5, y: 10, rightAngle: true },
          { x: 2.5, y: 6.5, rightAngle: true },
          { x: 0, y: 6.5, rightAngle: true },
          { x: 0, y: 3.5, rightAngle: true },
          { x: 2.5, y: 3.5, rightAngle: true },
        ],
        edges: [
          { label: "3 cm" },
          {},
          {},
          { label: "3 cm" },
          {},
          {},
          { label: "3 cm" },
          {},
          {},
          { label: "3 cm" },
          {},
          {},
        ],
        fill: "blue",
      },
      steps: [
        { explanation: "Find the area of the vertical rectangle on its own.", latex: "A_{\\text{vert}} = 3 \\times 10 = 30" },
        { explanation: "Find the area of the horizontal rectangle on its own.", latex: "A_{\\text{horiz}} = 8 \\times 3 = 24" },
        { explanation: "The central square sits inside both, so it has been counted twice — find it once.", latex: "A_{\\text{overlap}} = 3 \\times 3 = 9" },
        { explanation: "Add the two rectangles, then subtract the overlap once so no square is counted twice.", latex: "A = 30 + 24 - 9 = 45" },
      ],
      finalAnswerLatex: "A = 45 \\text{ cm}^2",
    },
  ],
  guidedPractice: [
    {
      ...choice(
        "y7-are-com-g1",
        "A composite shape is made of a rectangle 10 cm × 6 cm with a small 2 cm × 3 cm rectangle removed from one corner. Which calculation gives the correct area?",
        "B",
        ["10 × 6 + 2 × 3", "(10 × 6) − (2 × 3)", "(10 + 2) × (6 + 3)", "10 × 6 × 2 × 3"],
        "Use subtraction: full rectangle minus cut-out = 60 − 6 = 54 cm².",
        "\\text{Select A, B, C, or D.}"
      ),
      planeShapeDiagram: {
        description: "L-shape: a 10 cm by 6 cm rectangle with a 2 cm wide by 3 cm tall rectangle removed from the top-right corner. The bottom is 10 cm and the left side is 6 cm; the notch is 2 cm across and 3 cm deep.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 3, rightAngle: true },
          { x: 8, y: 3, rightAngle: true },
          { x: 8, y: 6, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [
          { label: "10 cm" },
          { label: "3 cm" },
          { label: "2 cm" },
          { label: "3 cm" },
          { label: "8 cm" },
          { label: "6 cm" },
        ],
        fill: "violet",
      },
    },
    {
      ...answer(
        "y7-are-com-g2",
        "A composite shape is made of two rectangles placed side by side: the first is 5 cm × 4 cm and the second is 3 cm × 4 cm. Find the total area in cm².",
        "A = A_1 + A_2",
        "32",
        "A₁ = 5 × 4 = 20 cm². A₂ = 3 × 4 = 12 cm². Total = 20 + 12 = 32 cm²."
      ),
      planeShapeDiagram: {
        description: "Two rectangles side by side forming one 8 cm wide, 4 cm tall strip: the left part is 5 cm wide and the right part is 3 cm wide, each 4 cm tall, meeting along a shared vertical edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 5, y: 0 },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 4, rightAngle: true },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "5 cm" }, { label: "3 cm" }, { label: "4 cm" }, {}, { label: "4 cm" }],
        fill: "blue",
      },
    },
    {
      ...answer(
        "y7-are-com-g3",
        "A large rectangle is 12 cm × 9 cm. A 4 cm × 3 cm rectangle is cut from one corner. Find the remaining area in cm².",
        "A = 12 \\times 9 - 4 \\times 3",
        "96",
        "Full area = 12 × 9 = 108 cm². Cut-out = 4 × 3 = 12 cm². Remaining = 108 − 12 = 96 cm²."
      ),
      planeShapeDiagram: {
        description: "L-shape: a 12 cm by 9 cm rectangle with a 4 cm wide by 3 cm tall rectangle cut from the top-right corner. The bottom is 12 cm, the left side is 9 cm; the notch removes 4 cm from the top and 3 cm down the right.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 6, rightAngle: true },
          { x: 8, y: 6, rightAngle: true },
          { x: 8, y: 9, rightAngle: true },
          { x: 0, y: 9, rightAngle: true },
        ],
        edges: [
          { label: "12 cm" },
          { label: "6 cm" },
          { label: "4 cm" },
          { label: "3 cm" },
          { label: "8 cm" },
          { label: "9 cm" },
        ],
        fill: "violet",
      },
    },
    {
      ...answer(
        "y7-are-com-g4",
        "A shape consists of a rectangle 8 cm × 5 cm with a triangle on top that has base 8 cm and perpendicular height 4 cm. Find the total area in cm².",
        "A = (8 \\times 5) + \\frac{1}{2} \\times 8 \\times 4",
        "56",
        "Rectangle: 8 × 5 = 40 cm². Triangle: ½ × 8 × 4 = 16 cm². Total = 40 + 16 = 56 cm²."
      ),
      planeShapeDiagram: {
        description: "Composite shape: an 8 cm wide by 5 cm tall rectangle topped by a triangle of base 8 cm and perpendicular height 4 cm, apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 5, rightAngle: true },
          { x: 4, y: 9 },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "8 cm" }, { label: "5 cm" }, {}, {}, { label: "5 cm" }],
        fill: "amber",
      },
    },
  ],
  independentPractice: [
    {
      ...answer(
        "y7-are-com-i1",
        "An L-shaped figure is made from a rectangle 10 cm × 7 cm with a 3 cm × 4 cm rectangle removed from one corner. Find the area in cm².",
        "A = 10 \\times 7 - 3 \\times 4",
        "58",
        "Full area = 10 × 7 = 70 cm². Cut-out = 3 × 4 = 12 cm². Remaining = 70 − 12 = 58 cm²."
      ),
      planeShapeDiagram: {
        description: "L-shape: a 10 cm by 7 cm rectangle with a 3 cm wide by 4 cm tall rectangle removed from the top-right corner. The bottom is 10 cm, the left side is 7 cm; the notch is 3 cm across and 4 cm deep.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 3, rightAngle: true },
          { x: 7, y: 3, rightAngle: true },
          { x: 7, y: 7, rightAngle: true },
          { x: 0, y: 7, rightAngle: true },
        ],
        edges: [
          { label: "10 cm" },
          { label: "3 cm" },
          { label: "3 cm" },
          { label: "4 cm" },
          { label: "7 cm" },
          { label: "7 cm" },
        ],
        fill: "violet",
      },
    },
    {
      ...answer(
        "y7-are-com-i2",
        "A composite shape is made of a rectangle 9 cm × 6 cm and a triangle with base 9 cm and perpendicular height 5 cm attached to one side. Find the total area in cm².",
        "A = (9 \\times 6) + \\frac{1}{2} \\times 9 \\times 5",
        "76.5",
        "Rectangle: 9 × 6 = 54 cm². Triangle: ½ × 9 × 5 = 22.5 cm². Total = 54 + 22.5 = 76.5 cm²."
      ),
      planeShapeDiagram: {
        description: "Composite shape: a 9 cm wide by 6 cm tall rectangle with a triangle of base 9 cm and perpendicular height 5 cm attached along its top edge, apex above the centre.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 9, y: 0, rightAngle: true },
          { x: 9, y: 6, rightAngle: true },
          { x: 4.5, y: 11 },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [{ label: "9 cm" }, { label: "6 cm" }, {}, {}, { label: "6 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer(
        "y7-are-com-i3",
        "A T-shaped figure has a top rectangle 14 cm × 3 cm and a stem rectangle 5 cm × 7 cm hanging from the middle of the top. Find the total area in cm².",
        "A = (14 \\times 3) + (5 \\times 7)",
        "77",
        "Top: 14 × 3 = 42 cm². Stem: 5 × 7 = 35 cm². Total = 42 + 35 = 77 cm²."
      ),
      planeShapeDiagram: {
        description: "T-shape: a top rectangle 14 cm wide and 3 cm tall, with a stem 5 cm wide and 7 cm tall hanging from the middle of the top bar.",
        vertices: [
          { x: 4.5, y: 0, rightAngle: true },
          { x: 9.5, y: 0, rightAngle: true },
          { x: 9.5, y: 7, rightAngle: true },
          { x: 14, y: 7, rightAngle: true },
          { x: 14, y: 10, rightAngle: true },
          { x: 0, y: 10, rightAngle: true },
          { x: 0, y: 7, rightAngle: true },
          { x: 4.5, y: 7, rightAngle: true },
        ],
        edges: [
          { label: "5 cm" },
          { label: "7 cm" },
          {},
          { label: "3 cm" },
          { label: "14 cm" },
          {},
          {},
          {},
        ],
        fill: "teal",
      },
    },
    {
      ...answer(
        "y7-are-com-i4",
        "A rectangular sign 20 cm × 15 cm has a rectangular window 6 cm × 4 cm cut out. Find the remaining area in cm².",
        "A = 20 \\times 15 - 6 \\times 4",
        "276",
        "Full area = 20 × 15 = 300 cm². Window = 6 × 4 = 24 cm². Remaining = 300 − 24 = 276 cm²."
      ),
      planeShapeDiagram: {
        description: "Rectangular sign 20 cm wide and 15 cm tall with a 6 cm by 4 cm rectangular window cut out of its centre. The window (6 cm wide, 4 cm tall) is removed from the shaded area, leaving a frame.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 20, y: 0, rightAngle: true },
          { x: 20, y: 15, rightAngle: true },
          { x: 0, y: 15, rightAngle: true },
        ],
        edges: [{ label: "20 cm" }, { label: "15 cm" }, {}, {}],
        fill: "blue",
      },
    },
    {
      ...answer(
        "y7-are-com-i5",
        "A cross-shaped figure is made of a vertical rectangle 3 cm × 10 cm and a horizontal rectangle 8 cm × 3 cm crossing at the middle. The two rectangles overlap in a 3 cm × 3 cm square. Find the total area in cm².",
        "A = (3 \\times 10) + (8 \\times 3) - (3 \\times 3)",
        "45",
        "Vertical: 3 × 10 = 30 cm². Horizontal: 8 × 3 = 24 cm². Overlap: 3 × 3 = 9 cm². Total = 30 + 24 − 9 = 45 cm²."
      ),
      planeShapeDiagram: {
        description: "Cross (plus) shape: a vertical rectangle 3 cm wide and 10 cm tall overlapping a horizontal rectangle 8 cm wide and 3 cm tall at the centre, sharing a 3 cm by 3 cm square. Each arm of the cross is 3 cm wide.",
        vertices: [
          { x: 2.5, y: 0, rightAngle: true },
          { x: 5.5, y: 0, rightAngle: true },
          { x: 5.5, y: 3.5, rightAngle: true },
          { x: 8, y: 3.5, rightAngle: true },
          { x: 8, y: 6.5, rightAngle: true },
          { x: 5.5, y: 6.5, rightAngle: true },
          { x: 5.5, y: 10, rightAngle: true },
          { x: 2.5, y: 10, rightAngle: true },
          { x: 2.5, y: 6.5, rightAngle: true },
          { x: 0, y: 6.5, rightAngle: true },
          { x: 0, y: 3.5, rightAngle: true },
          { x: 2.5, y: 3.5, rightAngle: true },
        ],
        edges: [
          { label: "3 cm" },
          {},
          {},
          { label: "3 cm" },
          {},
          {},
          { label: "3 cm" },
          {},
          {},
          { label: "3 cm" },
          {},
          {},
        ],
        fill: "blue",
      },
    },
  ],
  commonMistakes: [
    { mistake: "Counting the shared boundary region twice when adding two sub-shapes that overlap.", fix: "Check whether any region is counted in both areas. If the two sub-shapes overlap, subtract the overlap area once." },
    { mistake: "Not finding the missing dimension of a sub-shape before calculating its area.", fix: "Use the overall measurements to work out unlabelled sides. Label each sub-shape with all its dimensions before calculating." },
    { mistake: "Adding areas when the problem requires subtraction, or vice versa.", fix: "If the composite shape is formed by joining pieces, add. If a cut-out is removed from a larger shape, subtract." },
    { mistake: "Including the cut-out region in the answer when using the subtraction method.", fix: "Subtract the cut-out area: remaining area = large shape − cut-out. The cut-out is gone, not added." },
  ],
  masteryQuiz: [
    {
      ...answer(
        "y7-are-com-m1",
        "An L-shape is formed from a rectangle 15 cm × 8 cm with a 5 cm × 4 cm corner removed. Find the area in cm².",
        "A = 15 \\times 8 - 5 \\times 4",
        "100",
        "Full area = 15 × 8 = 120 cm². Cut-out = 5 × 4 = 20 cm². Remaining = 120 − 20 = 100 cm²."
      ),
      planeShapeDiagram: {
        description: "L-shape: a 15 cm by 8 cm rectangle with a 5 cm wide by 4 cm tall rectangle removed from the top-right corner. The bottom is 15 cm, the left side is 8 cm; the notch is 5 cm across and 4 cm deep.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 15, y: 0, rightAngle: true },
          { x: 15, y: 4, rightAngle: true },
          { x: 10, y: 4, rightAngle: true },
          { x: 10, y: 8, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
        ],
        edges: [
          { label: "15 cm" },
          { label: "4 cm" },
          { label: "5 cm" },
          { label: "4 cm" },
          { label: "10 cm" },
          { label: "8 cm" },
        ],
        fill: "violet",
      },
    },
    {
      ...answer(
        "y7-are-com-m2",
        "A composite shape is made of a rectangle 10 cm × 5 cm and a triangle with base 10 cm and perpendicular height 6 cm. Find the total area in cm².",
        "A = (10 \\times 5) + \\frac{1}{2} \\times 10 \\times 6",
        "80",
        "Rectangle: 10 × 5 = 50 cm². Triangle: ½ × 10 × 6 = 30 cm². Total = 50 + 30 = 80 cm²."
      ),
      planeShapeDiagram: {
        description: "Composite shape: a 10 cm wide by 5 cm tall rectangle topped by a triangle of base 10 cm and perpendicular height 6 cm, apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 5, rightAngle: true },
          { x: 5, y: 11 },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "10 cm" }, { label: "5 cm" }, {}, {}, { label: "5 cm" }],
        fill: "amber",
      },
    },
    choice(
      "y7-are-com-m3",
      "A composite shape is split into a rectangle of area 48 cm² and a triangle of area 15 cm². The two shapes share a boundary edge but do not overlap. What is the total area?",
      "C",
      ["33 cm²", "48 cm²", "63 cm²", "720 cm²"],
      "The shapes share an edge but do not overlap, so areas are added: 48 + 15 = 63 cm²."
    ),
    {
      ...answer(
        "y7-are-com-m4",
        "A rectangular room 8 m × 6 m has a rectangular wardrobe alcove 2 m × 1.5 m cut into one wall. Find the floor area remaining in m².",
        "A = 8 \\times 6 - 2 \\times 1.5",
        "45",
        "Full area = 8 × 6 = 48 m². Alcove = 2 × 1.5 = 3 m². Remaining = 48 − 3 = 45 m²."
      ),
      planeShapeDiagram: {
        description: "L-shaped room floor: an 8 m by 6 m rectangle with a 2 m wide by 1.5 m deep wardrobe alcove cut from the top-right corner. The bottom is 8 m, the left side is 6 m.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 4.5, rightAngle: true },
          { x: 6, y: 4.5, rightAngle: true },
          { x: 6, y: 6, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [
          { label: "8 m" },
          { label: "4.5 m" },
          { label: "2 m" },
          { label: "1.5 m" },
          { label: "6 m" },
          { label: "6 m" },
        ],
        fill: "violet",
      },
    },
    {
      ...answer(
        "y7-are-com-m5",
        "A T-shape has a top bar 18 cm × 4 cm and a stem 6 cm × 10 cm below it. Find the total area in cm².",
        "A = (18 \\times 4) + (6 \\times 10)",
        "132",
        "Top bar: 18 × 4 = 72 cm². Stem: 6 × 10 = 60 cm². Total = 72 + 60 = 132 cm²."
      ),
      planeShapeDiagram: {
        description: "T-shape: a top bar 18 cm wide and 4 cm tall, with a stem 6 cm wide and 10 cm tall hanging from the middle of the bar.",
        vertices: [
          { x: 6, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 10, rightAngle: true },
          { x: 18, y: 10, rightAngle: true },
          { x: 18, y: 14, rightAngle: true },
          { x: 0, y: 14, rightAngle: true },
          { x: 0, y: 10, rightAngle: true },
          { x: 6, y: 10, rightAngle: true },
        ],
        edges: [
          { label: "6 cm" },
          { label: "10 cm" },
          {},
          { label: "4 cm" },
          { label: "18 cm" },
          {},
          {},
          {},
        ],
        fill: "teal",
      },
    },
    {
      ...answer(
        "y7-are-com-m6",
        "A rectangular pool surround is 12 m × 9 m on the outside. The pool itself measures 8 m × 5 m. Find the area of the surround (the border) in m².",
        "A = 12 \\times 9 - 8 \\times 5",
        "68",
        "Outer area = 12 × 9 = 108 m². Pool = 8 × 5 = 40 m². Surround = 108 − 40 = 68 m²."
      ),
      planeShapeDiagram: {
        description: "Pool surround: a 12 m by 9 m outer rectangle (shaded border) with an 8 m by 5 m rectangular pool removed from the centre. The shaded region between the outer edge and the pool is the surround.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 9, rightAngle: true },
          { x: 0, y: 9, rightAngle: true },
        ],
        edges: [{ label: "12 m" }, { label: "9 m" }, {}, {}],
        fill: "teal",
      },
    },
    {
      ...choice(
        "y7-are-com-m7",
        "A student finds the area of a composite shape by splitting it into a 6 cm × 4 cm rectangle and a triangle with base 6 cm and height 3 cm. They add 24 + 18 = 42 cm². What error did they make?",
        "B",
        ["They used the wrong rectangle dimensions.", "They forgot the ½ in the triangle area formula.", "They should have subtracted the triangle area.", "They calculated 6 × 4 incorrectly."],
        "Triangle area = ½ × 6 × 3 = 9 cm², not 18 cm². The correct total is 24 + 9 = 33 cm²."
      ),
      planeShapeDiagram: {
        description: "Composite shape the student is analysing: a 6 cm wide by 4 cm tall rectangle topped by a triangle of base 6 cm and perpendicular height 3 cm, apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0, rightAngle: true },
          { x: 6, y: 4, rightAngle: true },
          { x: 3, y: 7 },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "6 cm" }, { label: "4 cm" }, {}, {}, { label: "4 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer(
        "y7-are-com-m8",
        "A staircase shape is made of three stacked rectangles: 6 cm × 2 cm, 4 cm × 2 cm, and 2 cm × 2 cm from bottom to top. Find the total area in cm².",
        "A = (6 \\times 2) + (4 \\times 2) + (2 \\times 2)",
        "24",
        "Bottom: 6 × 2 = 12 cm². Middle: 4 × 2 = 8 cm². Top: 2 × 2 = 4 cm². Total = 12 + 8 + 4 = 24 cm²."
      ),
      planeShapeDiagram: {
        description: "Staircase shape: three stacked rectangles each 2 cm tall, left-aligned. The bottom step is 6 cm wide, the middle step 4 cm wide, and the top step 2 cm wide.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0, rightAngle: true },
          { x: 6, y: 2, rightAngle: true },
          { x: 4, y: 2, rightAngle: true },
          { x: 4, y: 4, rightAngle: true },
          { x: 2, y: 4, rightAngle: true },
          { x: 2, y: 6, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [
          { label: "6 cm" },
          { label: "2 cm" },
          { label: "2 cm" },
          { label: "2 cm" },
          { label: "2 cm" },
          { label: "2 cm" },
          { label: "2 cm" },
          { label: "6 cm" },
        ],
        fill: "blue",
      },
    },
    {
      ...answer(
        "y7-are-com-m9",
        "An arrowhead shape is a rectangle 10 cm × 6 cm with a triangle of base 4 cm and height 6 cm removed from one short end. Find the remaining area in cm².",
        "A = 10 \\times 6 - \\frac{1}{2} \\times 4 \\times 6",
        "48",
        "Rectangle: 10 × 6 = 60 cm². Triangle removed: ½ × 4 × 6 = 12 cm². Remaining = 60 − 12 = 48 cm²."
      ),
      planeShapeDiagram: {
        description: "Arrowhead shape: a 10 cm by 6 cm rectangle with a triangular notch (base 4 cm, height 6 cm) cut into the right short end. The notch tip points 4 cm into the rectangle at mid-height, leaving a chevron.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0 },
          { x: 6, y: 3 },
          { x: 10, y: 6 },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [{ label: "10 cm" }, {}, {}, {}, { label: "6 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer(
        "y7-are-com-m10",
        "A composite figure is made of two identical rectangles, each 7 cm × 4 cm, joined along one 4 cm edge with no gap or overlap. Find the total area in cm².",
        "A = 2 \\times (7 \\times 4)",
        "56",
        "Each rectangle: 7 × 4 = 28 cm². They do not overlap, so total = 2 × 28 = 56 cm²."
      ),
      planeShapeDiagram: {
        description: "Two identical 7 cm by 4 cm rectangles joined along their 4 cm edges to form one 14 cm wide, 4 cm tall strip. The shared join is at the middle.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 7, y: 0 },
          { x: 14, y: 0, rightAngle: true },
          { x: 14, y: 4, rightAngle: true },
          { x: 7, y: 4 },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [
          { label: "7 cm" },
          { label: "7 cm" },
          { label: "4 cm" },
          {},
          {},
          { label: "4 cm" },
        ],
        fill: "blue",
      },
    },
  ],
  masteryQuizPool: [
    {
      ...answer("y7-are-com-p1", "Two rectangles are placed side by side: 6 cm × 3 cm and 4 cm × 3 cm. Find the total area in cm².", "A = A_1 + A_2", "30", "A₁ = 6 × 3 = 18 cm². A₂ = 4 × 3 = 12 cm². Total = 18 + 12 = 30 cm²."),
      planeShapeDiagram: {
        description: "Two rectangles side by side forming a 10 cm wide, 3 cm tall strip: the left part is 6 cm wide and the right part is 4 cm wide, each 3 cm tall.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0 },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 3, rightAngle: true },
          { x: 0, y: 3, rightAngle: true },
        ],
        edges: [{ label: "6 cm" }, { label: "4 cm" }, { label: "3 cm" }, {}, { label: "3 cm" }],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p2", "An L-shape is a rectangle 12 cm × 8 cm with a 4 cm × 3 cm corner removed. Find the area in cm².", "A = 12 \\times 8 - 4 \\times 3", "84", "Full = 12 × 8 = 96 cm². Cut-out = 4 × 3 = 12 cm². Remaining = 96 − 12 = 84 cm²."),
      planeShapeDiagram: {
        description: "L-shape: a 12 cm by 8 cm rectangle with a 4 cm wide by 3 cm tall rectangle removed from the top-right corner. The bottom is 12 cm and the left side is 8 cm.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 5, rightAngle: true },
          { x: 8, y: 5, rightAngle: true },
          { x: 8, y: 8, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
        ],
        edges: [{ label: "12 cm" }, { label: "5 cm" }, { label: "4 cm" }, { label: "3 cm" }, { label: "8 cm" }, { label: "8 cm" }],
        fill: "violet",
      },
    },
    {
      ...answer("y7-are-com-p3", "A shape is a rectangle 7 cm × 5 cm with a triangle on top of base 7 cm and perpendicular height 4 cm. Find the total area in cm².", "A = (7 \\times 5) + \\frac{1}{2} \\times 7 \\times 4", "49", "Rectangle: 7 × 5 = 35 cm². Triangle: ½ × 7 × 4 = 14 cm². Total = 35 + 14 = 49 cm²."),
      planeShapeDiagram: {
        description: "Composite shape: a 7 cm wide by 5 cm tall rectangle topped by a triangle of base 7 cm and perpendicular height 4 cm, apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 7, y: 0, rightAngle: true },
          { x: 7, y: 5, rightAngle: true },
          { x: 3.5, y: 9 },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "7 cm" }, { label: "5 cm" }, {}, {}, { label: "5 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer("y7-are-com-p4", "A T-shape has a top bar 16 cm × 4 cm and a stem 5 cm × 8 cm below it. Find the total area in cm².", "A = (16 \\times 4) + (5 \\times 8)", "104", "Top: 16 × 4 = 64 cm². Stem: 5 × 8 = 40 cm². Total = 64 + 40 = 104 cm²."),
      planeShapeDiagram: {
        description: "T-shape: a top bar 16 cm wide and 4 cm tall, with a stem 5 cm wide and 8 cm tall hanging from the middle of the bar.",
        vertices: [
          { x: 5.5, y: 0, rightAngle: true },
          { x: 10.5, y: 0, rightAngle: true },
          { x: 10.5, y: 8, rightAngle: true },
          { x: 16, y: 8, rightAngle: true },
          { x: 16, y: 12, rightAngle: true },
          { x: 0, y: 12, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
          { x: 5.5, y: 8, rightAngle: true },
        ],
        edges: [{ label: "5 cm" }, { label: "8 cm" }, {}, { label: "4 cm" }, { label: "16 cm" }, {}, {}, {}],
        fill: "teal",
      },
    },
    {
      ...answer("y7-are-com-p5", "A rectangular sheet 18 cm × 12 cm has a 5 cm × 4 cm rectangle cut out. Find the remaining area in cm².", "A = 18 \\times 12 - 5 \\times 4", "196", "Full = 18 × 12 = 216 cm². Cut-out = 5 × 4 = 20 cm². Remaining = 216 − 20 = 196 cm²."),
      planeShapeDiagram: {
        description: "Rectangular sheet 18 cm wide and 12 cm tall with a 5 cm by 4 cm rectangle cut out of its interior. The shaded region is what remains after the cut-out is removed.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 18, y: 0, rightAngle: true },
          { x: 18, y: 12, rightAngle: true },
          { x: 0, y: 12, rightAngle: true },
        ],
        edges: [{ label: "18 cm" }, { label: "12 cm" }, {}, {}],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p6", "Three stacked rectangles measure 8 cm × 2 cm, 5 cm × 2 cm, and 3 cm × 2 cm. Find the total area in cm².", "A = (8 \\times 2) + (5 \\times 2) + (3 \\times 2)", "32", "16 + 10 + 6 = 32 cm²."),
      planeShapeDiagram: {
        description: "Staircase of three stacked rectangles each 2 cm tall, left-aligned: bottom 8 cm wide, middle 5 cm wide, top 3 cm wide.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 2, rightAngle: true },
          { x: 5, y: 2, rightAngle: true },
          { x: 5, y: 4, rightAngle: true },
          { x: 3, y: 4, rightAngle: true },
          { x: 3, y: 6, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [{ label: "8 cm" }, { label: "2 cm" }, { label: "3 cm" }, { label: "2 cm" }, { label: "2 cm" }, { label: "2 cm" }, { label: "3 cm" }, { label: "6 cm" }],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p7", "A house shape is a rectangle 10 cm × 6 cm with a triangular roof of base 10 cm and perpendicular height 4 cm. Find the total area in cm².", "A = (10 \\times 6) + \\frac{1}{2} \\times 10 \\times 4", "80", "Rectangle: 10 × 6 = 60 cm². Roof: ½ × 10 × 4 = 20 cm². Total = 60 + 20 = 80 cm²."),
      planeShapeDiagram: {
        description: "House shape: a 10 cm wide by 6 cm tall rectangle with a triangular roof of base 10 cm and perpendicular height 4 cm on top, apex above the centre.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 6, rightAngle: true },
          { x: 5, y: 10 },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [{ label: "10 cm" }, { label: "6 cm" }, {}, {}, { label: "6 cm" }],
        fill: "amber",
      },
    },
    choice("y7-are-com-p8", "A rectangle of area 50 cm² and a triangle of area 18 cm² share an edge but do not overlap. What is the total area?", "C", ["32 cm²", "50 cm²", "68 cm²", "900 cm²"], "They do not overlap, so add: 50 + 18 = 68 cm²."),
    {
      ...answer("y7-are-com-p9", "An L-shaped room is a rectangle 9 m × 6 m with a 2 m × 3 m corner removed. Find the floor area in m².", "A = 9 \\times 6 - 2 \\times 3", "48", "Full = 9 × 6 = 54 m². Cut-out = 2 × 3 = 6 m². Remaining = 54 − 6 = 48 m²."),
      planeShapeDiagram: {
        description: "L-shaped room floor: a 9 m by 6 m rectangle with a 2 m wide by 3 m tall rectangle removed from the top-right corner. The bottom is 9 m and the left side is 6 m.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 9, y: 0, rightAngle: true },
          { x: 9, y: 3, rightAngle: true },
          { x: 7, y: 3, rightAngle: true },
          { x: 7, y: 6, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [{ label: "9 m" }, { label: "3 m" }, { label: "2 m" }, { label: "3 m" }, { label: "7 m" }, { label: "6 m" }],
        fill: "violet",
      },
    },
    {
      ...answer("y7-are-com-p10", "A rectangular frame is 14 cm × 10 cm on the outside. The picture inside it is 10 cm × 6 cm. Find the area of the frame border in cm².", "A = 14 \\times 10 - 10 \\times 6", "80", "Outer = 14 × 10 = 140 cm². Picture = 10 × 6 = 60 cm². Border = 140 − 60 = 80 cm²."),
      planeShapeDiagram: {
        description: "Picture frame: a 14 cm by 10 cm outer rectangle (shaded border) with a 10 cm by 6 cm picture removed from the centre. The shaded region between the outer edge and the picture is the frame border.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 14, y: 0, rightAngle: true },
          { x: 14, y: 10, rightAngle: true },
          { x: 0, y: 10, rightAngle: true },
        ],
        edges: [{ label: "14 cm" }, { label: "10 cm" }, {}, {}],
        fill: "teal",
      },
    },
    {
      ...answer("y7-are-com-p11", "A cross shape is a vertical rectangle 4 cm × 12 cm and a horizontal rectangle 10 cm × 4 cm crossing in a 4 cm × 4 cm overlap. Find the total area in cm².", "A = (4 \\times 12) + (10 \\times 4) - (4 \\times 4)", "72", "Vertical: 48 cm². Horizontal: 40 cm². Overlap: 16 cm². Total = 48 + 40 − 16 = 72 cm²."),
      planeShapeDiagram: {
        description: "Cross (plus) shape: a vertical rectangle 4 cm wide and 12 cm tall overlapping a horizontal rectangle 10 cm wide and 4 cm tall at the centre, sharing a 4 cm by 4 cm square. Each arm is 4 cm wide.",
        vertices: [
          { x: 3, y: 0, rightAngle: true },
          { x: 7, y: 0, rightAngle: true },
          { x: 7, y: 4, rightAngle: true },
          { x: 10, y: 4, rightAngle: true },
          { x: 10, y: 8, rightAngle: true },
          { x: 7, y: 8, rightAngle: true },
          { x: 7, y: 12, rightAngle: true },
          { x: 3, y: 12, rightAngle: true },
          { x: 3, y: 8, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
          { x: 0, y: 4, rightAngle: true },
          { x: 3, y: 4, rightAngle: true },
        ],
        edges: [{ label: "4 cm" }, {}, {}, { label: "4 cm" }, {}, {}, { label: "4 cm" }, {}, {}, { label: "4 cm" }, {}, {}],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p12", "A composite shape is a rectangle 11 cm × 4 cm with a triangle attached of base 11 cm and perpendicular height 6 cm. Find the total area in cm².", "A = (11 \\times 4) + \\frac{1}{2} \\times 11 \\times 6", "77", "Rectangle: 44 cm². Triangle: ½ × 11 × 6 = 33 cm². Total = 44 + 33 = 77 cm²."),
      planeShapeDiagram: {
        description: "Composite shape: an 11 cm wide by 4 cm tall rectangle topped by a triangle of base 11 cm and perpendicular height 6 cm, apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 11, y: 0, rightAngle: true },
          { x: 11, y: 4, rightAngle: true },
          { x: 5.5, y: 10 },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "11 cm" }, { label: "4 cm" }, {}, {}, { label: "4 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer("y7-are-com-p13", "A rectangular lawn 20 m × 15 m has a rectangular pond 6 m × 5 m removed. Find the grass area in m².", "A = 20 \\times 15 - 6 \\times 5", "270", "Lawn = 20 × 15 = 300 m². Pond = 6 × 5 = 30 m². Grass = 300 − 30 = 270 m²."),
      planeShapeDiagram: {
        description: "Rectangular lawn 20 m wide and 15 m tall (shaded grass) with a 6 m by 5 m rectangular pond removed from the interior. The shaded region is the grass remaining around the pond.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 20, y: 0, rightAngle: true },
          { x: 20, y: 15, rightAngle: true },
          { x: 0, y: 15, rightAngle: true },
        ],
        edges: [{ label: "20 m" }, { label: "15 m" }, {}, {}],
        fill: "green",
      },
    },
    {
      ...choice("y7-are-com-p14", "A composite shape splits into a 5 cm × 4 cm rectangle and a triangle with base 5 cm and height 4 cm. A student adds 20 + 20 = 40 cm². What is the error?", "B", ["The rectangle area is wrong.", "They forgot the ½ in the triangle area.", "They should subtract the triangle.", "They used the wrong base."], "Triangle = ½ × 5 × 4 = 10 cm², not 20 cm². Correct total = 20 + 10 = 30 cm²."),
      planeShapeDiagram: {
        description: "Composite shape being analysed: a 5 cm wide by 4 cm tall rectangle topped by a triangle of base 5 cm and perpendicular height 4 cm, apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 5, y: 0, rightAngle: true },
          { x: 5, y: 4, rightAngle: true },
          { x: 2.5, y: 8 },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "5 cm" }, { label: "4 cm" }, {}, {}, { label: "4 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer("y7-are-com-p15", "A staircase is four stacked rectangles: 8 cm × 2 cm, 6 cm × 2 cm, 4 cm × 2 cm, 2 cm × 2 cm. Find the total area in cm².", "A = (8 + 6 + 4 + 2) \\times 2", "40", "Widths sum to 8 + 6 + 4 + 2 = 20, each 2 cm tall: 20 × 2 = 40 cm²."),
      planeShapeDiagram: {
        description: "Staircase of four stacked rectangles each 2 cm tall, left-aligned: widths 8 cm, 6 cm, 4 cm and 2 cm from bottom to top.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 2, rightAngle: true },
          { x: 6, y: 2, rightAngle: true },
          { x: 6, y: 4, rightAngle: true },
          { x: 4, y: 4, rightAngle: true },
          { x: 4, y: 6, rightAngle: true },
          { x: 2, y: 6, rightAngle: true },
          { x: 2, y: 8, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
        ],
        edges: [{ label: "8 cm" }, { label: "2 cm" }, {}, { label: "2 cm" }, {}, { label: "2 cm" }, {}, { label: "2 cm" }, {}, { label: "8 cm" }],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p16", "A rectangular sign 24 cm × 16 cm has two windows each 4 cm × 3 cm cut out. Find the remaining area in cm².", "A = 24 \\times 16 - 2 \\times (4 \\times 3)", "360", "Full = 24 × 16 = 384 cm². Two windows = 2 × 12 = 24 cm². Remaining = 384 − 24 = 360 cm²."),
      planeShapeDiagram: {
        description: "Rectangular sign 24 cm wide and 16 cm tall with two 4 cm by 3 cm windows cut out of its interior. The shaded region is what remains of the sign after both windows are removed.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 24, y: 0, rightAngle: true },
          { x: 24, y: 16, rightAngle: true },
          { x: 0, y: 16, rightAngle: true },
        ],
        edges: [{ label: "24 cm" }, { label: "16 cm" }, {}, {}],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p17", "An arrowhead is a rectangle 12 cm × 7 cm with a triangle of base 5 cm and height 7 cm removed from one end. Find the remaining area in cm².", "A = 12 \\times 7 - \\frac{1}{2} \\times 5 \\times 7", "66.5", "Rectangle: 84 cm². Triangle: ½ × 5 × 7 = 17.5 cm². Remaining = 84 − 17.5 = 66.5 cm²."),
      planeShapeDiagram: {
        description: "Arrowhead shape: a 12 cm by 7 cm rectangle with a triangular notch (base 5 cm, height 7 cm) cut into the right short end. The notch tip points 5 cm into the rectangle at mid-height, leaving a chevron.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0 },
          { x: 7, y: 3.5 },
          { x: 12, y: 7 },
          { x: 0, y: 7, rightAngle: true },
        ],
        edges: [{ label: "12 cm" }, {}, {}, {}, { label: "7 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer("y7-are-com-p18", "A composite shape is two identical rectangles each 9 cm × 5 cm joined along a 5 cm edge with no overlap. Find the total area in cm².", "A = 2 \\times (9 \\times 5)", "90", "Each: 9 × 5 = 45 cm². Total = 2 × 45 = 90 cm²."),
      planeShapeDiagram: {
        description: "Two identical 9 cm by 5 cm rectangles joined along their 5 cm edges to form one 18 cm wide, 5 cm tall strip. The shared join is at the middle.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 9, y: 0 },
          { x: 18, y: 0, rightAngle: true },
          { x: 18, y: 5, rightAngle: true },
          { x: 9, y: 5 },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "9 cm" }, { label: "9 cm" }, { label: "5 cm" }, {}, {}, { label: "5 cm" }],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p19", "A pool surround is 16 m × 10 m on the outside. The pool measures 10 m × 6 m. Find the area of the surround in m².", "A = 16 \\times 10 - 10 \\times 6", "100", "Outer = 160 m². Pool = 60 m². Surround = 160 − 60 = 100 m²."),
      planeShapeDiagram: {
        description: "Pool surround: a 16 m by 10 m outer rectangle (shaded border) with a 10 m by 6 m rectangular pool removed from the centre. The shaded region between the outer edge and the pool is the surround.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 16, y: 0, rightAngle: true },
          { x: 16, y: 10, rightAngle: true },
          { x: 0, y: 10, rightAngle: true },
        ],
        edges: [{ label: "16 m" }, { label: "10 m" }, {}, {}],
        fill: "teal",
      },
    },
    {
      ...answer("y7-are-com-p20", "A composite shape is a 13 cm × 6 cm rectangle and a 7 cm × 6 cm rectangle side by side. Find the total area in cm².", "A = (13 \\times 6) + (7 \\times 6)", "120", "78 + 42 = 120 cm²."),
      planeShapeDiagram: {
        description: "Two rectangles side by side forming a 20 cm wide, 6 cm tall strip: the left part is 13 cm wide and the right part is 7 cm wide, each 6 cm tall.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 13, y: 0 },
          { x: 20, y: 0, rightAngle: true },
          { x: 20, y: 6, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [{ label: "13 cm" }, { label: "7 cm" }, { label: "6 cm" }, {}, { label: "6 cm" }],
        fill: "blue",
      },
    },
    {
      ...choice("y7-are-com-p21", "An L-shape is found by subtracting a 3 cm × 2 cm corner from a 7 cm × 5 cm rectangle. Which calculation is correct?", "A", ["(7 × 5) − (3 × 2)", "(7 × 5) + (3 × 2)", "(7 − 3) × (5 − 2)", "7 × 5 × 3 × 2"], "Subtraction method: full rectangle minus the cut-out corner = 35 − 6 = 29 cm²."),
      planeShapeDiagram: {
        description: "L-shape: a 7 cm by 5 cm rectangle with a 3 cm wide by 2 cm tall rectangle removed from the top-right corner. The bottom is 7 cm and the left side is 5 cm.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 7, y: 0, rightAngle: true },
          { x: 7, y: 3, rightAngle: true },
          { x: 4, y: 3, rightAngle: true },
          { x: 4, y: 5, rightAngle: true },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "7 cm" }, { label: "3 cm" }, { label: "3 cm" }, { label: "2 cm" }, { label: "4 cm" }, { label: "5 cm" }],
        fill: "violet",
      },
    },
    {
      ...answer("y7-are-com-p22", "A T-shape has a top bar 20 cm × 5 cm and a stem 8 cm × 9 cm. Find the total area in cm².", "A = (20 \\times 5) + (8 \\times 9)", "172", "Top: 100 cm². Stem: 72 cm². Total = 172 cm²."),
      planeShapeDiagram: {
        description: "T-shape: a top bar 20 cm wide and 5 cm tall, with a stem 8 cm wide and 9 cm tall hanging from the middle of the bar.",
        vertices: [
          { x: 6, y: 0, rightAngle: true },
          { x: 14, y: 0, rightAngle: true },
          { x: 14, y: 9, rightAngle: true },
          { x: 20, y: 9, rightAngle: true },
          { x: 20, y: 14, rightAngle: true },
          { x: 0, y: 14, rightAngle: true },
          { x: 0, y: 9, rightAngle: true },
          { x: 6, y: 9, rightAngle: true },
        ],
        edges: [{ label: "8 cm" }, { label: "9 cm" }, {}, { label: "5 cm" }, { label: "20 cm" }, {}, {}, {}],
        fill: "teal",
      },
    },
    {
      ...answer("y7-are-com-p23", "A rectangular floor 7 m × 5 m has a triangular alcove of base 4 m and perpendicular height 3 m added on one side. Find the total area in m².", "A = (7 \\times 5) + \\frac{1}{2} \\times 4 \\times 3", "41", "Rectangle: 35 m². Triangle: ½ × 4 × 3 = 6 m². Total = 35 + 6 = 41 m²."),
      planeShapeDiagram: {
        description: "Composite floor: a 7 m wide by 5 m tall rectangle with a triangular alcove (base 4 m, perpendicular height 3 m) protruding from the middle of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 7, y: 0, rightAngle: true },
          { x: 7, y: 5, rightAngle: true },
          { x: 5.5, y: 5 },
          { x: 3.5, y: 8 },
          { x: 1.5, y: 5 },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "7 m" }, { label: "5 m" }, {}, {}, {}, {}, { label: "5 m" }],
        fill: "amber",
      },
    },
    {
      ...answer("y7-are-com-p24", "A 10 cm × 8 cm rectangle has a smaller 3 cm × 3 cm square and a 2 cm × 4 cm rectangle removed. Find the remaining area in cm².", "A = 80 - 9 - 8", "63", "Full = 80 cm². Cut-outs = 9 + 8 = 17 cm². Remaining = 80 − 17 = 63 cm²."),
      planeShapeDiagram: {
        description: "Rectangle 10 cm wide and 8 cm tall with two pieces cut from its interior: a 3 cm by 3 cm square and a 2 cm by 4 cm rectangle. The shaded region is what remains after both cut-outs.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 8, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
        ],
        edges: [{ label: "10 cm" }, { label: "8 cm" }, {}, {}],
        fill: "blue",
      },
    },
    {
      ...answer("y7-are-com-p25", "A composite shape is a rectangle 15 cm × 8 cm with a triangle on top of base 15 cm and height 6 cm. Find the total area in cm².", "A = (15 \\times 8) + \\frac{1}{2} \\times 15 \\times 6", "165", "Rectangle: 120 cm². Triangle: ½ × 15 × 6 = 45 cm². Total = 120 + 45 = 165 cm²."),
      planeShapeDiagram: {
        description: "Composite shape: a 15 cm wide by 8 cm tall rectangle topped by a triangle of base 15 cm and perpendicular height 6 cm, apex above the centre of the top edge.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 15, y: 0, rightAngle: true },
          { x: 15, y: 8, rightAngle: true },
          { x: 7.5, y: 14 },
          { x: 0, y: 8, rightAngle: true },
        ],
        edges: [{ label: "15 cm" }, { label: "8 cm" }, {}, {}, { label: "8 cm" }],
        fill: "amber",
      },
    },
    {
      ...answer("y7-are-com-p26", "A garden is a 22 m × 14 m rectangle with a 6 m × 6 m square shed removed from one corner. Find the garden area in m².", "A = 22 \\times 14 - 6 \\times 6", "272", "Full = 308 m². Shed = 36 m². Remaining = 308 − 36 = 272 m²."),
      planeShapeDiagram: {
        description: "L-shaped garden: a 22 m by 14 m rectangle with a 6 m by 6 m square shed removed from the top-right corner. The bottom is 22 m and the left side is 14 m.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 22, y: 0, rightAngle: true },
          { x: 22, y: 8, rightAngle: true },
          { x: 16, y: 8, rightAngle: true },
          { x: 16, y: 14, rightAngle: true },
          { x: 0, y: 14, rightAngle: true },
        ],
        edges: [{ label: "22 m" }, { label: "8 m" }, { label: "6 m" }, { label: "6 m" }, { label: "16 m" }, { label: "14 m" }],
        fill: "green",
      },
    },
  ],
  multiPartPractice: [
    {
      id: "y7-are-com-mp1",
      prompt:
        "A workshop floor plan is L-shaped. It is formed from a large rectangle 12 m long and 9 m wide, with a smaller rectangle 5 m long and 4 m wide removed from one corner. A triangular storage zone with base 6 m and perpendicular height 3 m is marked inside the remaining floor. Use these measurements to answer the parts below.",
      latex: "A_{\\text{rect}} = l \\times w \\qquad A_{\\text{tri}} = \\tfrac{1}{2}bh",
      planeShapeDiagram: {
        description: "L-shaped workshop floor: a 12 m long by 9 m wide rectangle with a 5 m by 4 m rectangle removed from the top-right corner. The bottom is 12 m and the left side is 9 m; the notch removes 5 m from the top and 4 m down the right.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 5, rightAngle: true },
          { x: 7, y: 5, rightAngle: true },
          { x: 7, y: 9, rightAngle: true },
          { x: 0, y: 9, rightAngle: true },
        ],
        edges: [{ label: "12 m" }, { label: "5 m" }, { label: "5 m" }, { label: "4 m" }, { label: "7 m" }, { label: "9 m" }],
        fill: "violet",
      },
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
      "Most real uses of area are not 'find the area' questions — they are 'how much will it cost' or 'how much material do I need' questions. A painter orders paint by wall area, a tiler counts tiles by floor area, a gardener buys fertiliser by lawn area. The shape work is identical to earlier lessons; what is new is the extra step of turning an area into a cost, a number of tiles, or litres of paint.",
      "Before any of that, the units have to agree, and this is where the most common error hides. Area units do not scale the way length units do. One metre equals 100 centimetres, but one square metre is a square that is 100 cm along each side, so it holds $100 \\times 100 = 10\\,000$ small $\\text{cm}^2$ squares — not 100 of them. So to change $\\text{m}^2$ to $\\text{cm}^2$ you multiply by 10 000, and to go back you divide by 10 000. The same reasoning gives $1\\text{ cm}^2 = 10 \\times 10 = 100\\text{ mm}^2$: you always square the linear conversion factor.",
      "Because that squaring is easy to forget, the safest habit is to convert all the lengths to one unit first, then find the area once, so the area comes out in the unit you actually want. A bed measured as 350 cm by 200 cm is better read as 3.5 m by 2 m, giving $3.5 \\times 2 = 7\\text{ m}^2$ directly — no risk of mishandling the 10 000.",
      "Cost works by a rate. A rate such as '$12 per square metre' means every single square metre of surface costs $12, so the total cost is the number of square metres multiplied by 12. That is why $\\text{cost} = \\text{area} \\times \\text{rate}$ — you are adding up the price of each square metre, and multiplying is just fast repeated addition. The same logic counts tiles: divide the floor area by the area of one tile to find how many tiles fit. The unit on the rate and the unit on the area must match, or the multiplication is meaningless.",
      "When a surface is not solid — a wall with a window, a lawn with a flowerbed, a hall with a stage — you do not pay to cover the part that is cut out. So find the full area, subtract every opening, and apply the rate only to what is left. The mistake to avoid is charging for the whole wall when a window will never be painted; the cost follows the area that is actually covered, which is the composite-shape subtraction from the previous lesson put to work.",
      "Put together, every problem here is the same three-move chain: get the units consistent, find the area you are actually covering, then apply the rate (multiply for cost, divide for number of tiles). Spotting which move a worded question is asking for is exactly the Band-6 skill — the formulas never change, only the story around them.",
    ],
    latexBlocks: [
      "\\text{Cost} = \\text{area} \\times \\text{rate per unit area}",
      "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2 \\qquad 1 \\text{ cm}^2 = 100 \\text{ mm}^2",
      "\\text{Number of tiles} = \\frac{\\text{area to cover}}{\\text{area of one tile}}",
    ],
  },
  workedExamples: [
    {
      title: "Tiling cost",
      questionLatex: "\\text{A rectangular floor is }5\\text{ m long and }4\\text{ m wide. Tiles cost }\\$18\\text{ per m}^2\\text{. Find the total tile cost.}",
      planeShapeDiagram: {
        description: "Rectangular floor 5 m long and 4 m wide, to be tiled.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 5, y: 0, rightAngle: true },
          { x: 5, y: 4, rightAngle: true },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "5 m" }, { label: "4 m" }, {}, {}],
        fill: "blue",
      },
      steps: [
        { explanation: "Find the floor area — the surface to be covered.", latex: "A = 5 \\times 4 = 20 \\text{ m}^2" },
        { explanation: "The rate is $18 for each square metre, so multiply the area by the rate.", latex: "\\text{Cost} = 20 \\times 18" },
        { explanation: "Carry out the multiplication.", latex: "\\text{Cost} = 360" },
      ],
      finalAnswerLatex: "\\text{Total cost} = \\$360",
    },
    {
      title: "Painting a wall with a window",
      questionLatex: "\\text{A wall is }6\\text{ m wide and }2.5\\text{ m tall. It has a window }1.5\\text{ m} \\times 1\\text{ m. Find the area to be painted.}",
      planeShapeDiagram: {
        description: "Wall 6 m wide and 2.5 m tall (shaded) with a 1.5 m by 1 m window cut out of its interior. The shaded region around the window is the area to be painted.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0, rightAngle: true },
          { x: 6, y: 2.5, rightAngle: true },
          { x: 0, y: 2.5, rightAngle: true },
        ],
        edges: [{ label: "6 m" }, { label: "2.5 m" }, {}, {}],
        fill: "amber",
      },
      steps: [
        { explanation: "Find the full wall area as if it were solid.", latex: "A_{\\text{wall}} = 6 \\times 2.5 = 15 \\text{ m}^2" },
        { explanation: "Find the window area — the part that will not be painted.", latex: "A_{\\text{window}} = 1.5 \\times 1 = 1.5 \\text{ m}^2" },
        { explanation: "Subtract the opening, because you only paint the surface that remains.", latex: "A_{\\text{paint}} = 15 - 1.5 = 13.5 \\text{ m}^2" },
      ],
      finalAnswerLatex: "A_{\\text{paint}} = 13.5 \\text{ m}^2",
    },
    {
      title: "Unit conversion — convert lengths first",
      questionLatex: "\\text{A garden bed is }350\\text{ cm long and }200\\text{ cm wide. Express its area in m}^2\\text{.}",
      planeShapeDiagram: {
        description: "Rectangular garden bed 350 cm (3.5 m) long and 200 cm (2 m) wide.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 3.5, y: 0, rightAngle: true },
          { x: 3.5, y: 2, rightAngle: true },
          { x: 0, y: 2, rightAngle: true },
        ],
        edges: [{ label: "350 cm" }, { label: "200 cm" }, {}, {}],
        fill: "green",
      },
      steps: [
        { explanation: "Convert each length to metres before finding the area, so the answer lands in m² with no factor of 10 000 to manage.", latex: "350 \\text{ cm} = 3.5 \\text{ m}, \\quad 200 \\text{ cm} = 2 \\text{ m}" },
        { explanation: "Multiply the two lengths in metres.", latex: "A = 3.5 \\times 2" },
        { explanation: "Read off the area in square metres.", latex: "A = 7 \\text{ m}^2" },
      ],
      finalAnswerLatex: "A = 7 \\text{ m}^2",
    },
    {
      title: "Harder: tiles needed, with a unit clash to resolve",
      questionLatex: "\\text{A floor is }4.8\\text{ m}^2\\text{. Square tiles are }20\\text{ cm} \\times 20\\text{ cm. How many tiles are needed?}",
      steps: [
        { explanation: "The floor is in m² but the tile is in cm, so first find the tile area and convert it to the same unit as the floor.", latex: "20 \\text{ cm} = 0.2 \\text{ m}" },
        { explanation: "Find the area of one tile in square metres.", latex: "A_{\\text{tile}} = 0.2 \\times 0.2 = 0.04 \\text{ m}^2" },
        { explanation: "Divide the floor area by one tile's area to count how many tiles fit.", latex: "\\text{tiles} = \\frac{4.8}{0.04}" },
        { explanation: "Carry out the division.", latex: "\\text{tiles} = 120" },
      ],
      finalAnswerLatex: "120 \\text{ tiles are needed}",
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
    {
      ...answer(
        "y7-are-prb-g4",
        "A wall is 5 m wide and 3 m tall. It has a door 1 m × 2 m cut out. Find the area to be painted in m².",
        "A = (5 \\times 3) - (1 \\times 2)",
        "13",
        "Wall: 5 × 3 = 15 m². Door: 1 × 2 = 2 m². Paint area = 15 − 2 = 13 m²."
      ),
      planeShapeDiagram: {
        description: "Wall 5 m wide and 3 m tall (shaded) with a 1 m wide by 2 m tall door opening removed. The shaded region around the door is the area to be painted.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 5, y: 0, rightAngle: true },
          { x: 5, y: 3, rightAngle: true },
          { x: 0, y: 3, rightAngle: true },
        ],
        edges: [{ label: "5 m" }, { label: "3 m" }, {}, {}],
        fill: "amber",
      },
    },
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
    {
      ...answer(
        "y7-are-prb-i5",
        "A rectangular hall 12 m × 8 m has a stage area of 4 m × 6 m at one end. The rest of the floor is to be carpeted. Carpet costs $25 per m². Find the total carpet cost in dollars.",
        "\\text{Cost} = (12 \\times 8 - 4 \\times 6) \\times 25",
        "1800",
        "Hall: 12 × 8 = 96 m². Stage: 4 × 6 = 24 m². Carpeted area = 96 − 24 = 72 m². Cost = 72 × $25 = $1800.",
        ["$1800", "1,800", "$1,800"]
      ),
      planeShapeDiagram: {
        description: "Hall floor 12 m by 8 m with a 4 m by 6 m stage occupying the top-right corner. The remaining L-shaped region is to be carpeted.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 2, rightAngle: true },
          { x: 8, y: 2, rightAngle: true },
          { x: 8, y: 8, rightAngle: true },
          { x: 0, y: 8, rightAngle: true },
        ],
        edges: [{ label: "12 m" }, { label: "2 m" }, { label: "4 m" }, { label: "6 m" }, { label: "8 m" }, { label: "8 m" }],
        fill: "blue",
      },
    },
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
    {
      ...answer(
        "y7-are-prb-m6",
        "A lawn is 12 m × 9 m with a rectangular garden bed 3 m × 4 m removed from one corner. Lawn fertiliser costs $3 per m². Find the total fertiliser cost in dollars.",
        "\\text{Cost} = (12 \\times 9 - 3 \\times 4) \\times 3",
        "288",
        "Lawn: 12 × 9 = 108 m². Bed: 3 × 4 = 12 m². Remaining lawn = 108 − 12 = 96 m². Cost = 96 × $3 = $288.",
        ["$288", "288.00"]
      ),
      planeShapeDiagram: {
        description: "L-shaped lawn: a 12 m by 9 m rectangle with a 3 m wide by 4 m tall garden bed removed from the top-right corner. The remaining L-shaped region is the lawn to be fertilised.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 12, y: 0, rightAngle: true },
          { x: 12, y: 5, rightAngle: true },
          { x: 9, y: 5, rightAngle: true },
          { x: 9, y: 9, rightAngle: true },
          { x: 0, y: 9, rightAngle: true },
        ],
        edges: [{ label: "12 m" }, { label: "5 m" }, { label: "3 m" }, { label: "4 m" }, { label: "9 m" }, { label: "9 m" }],
        fill: "green",
      },
    },
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
    {
      ...answer("y7-are-prb-p14", "A rectangular hall 14 m × 9 m has a stage 5 m × 4 m at one end. The rest is carpeted at $30 per m². Find the carpet cost in dollars.", "\\text{Cost} = (14 \\times 9 - 5 \\times 4) \\times 30", "3180", "Hall = 126 m². Stage = 20 m². Carpet = 106 m². Cost = 106 × $30 = $3180.", ["$3180", "3,180", "$3,180"]),
      planeShapeDiagram: {
        description: "Hall floor 14 m by 9 m with a 5 m by 4 m stage in the top-right corner. The remaining L-shaped region is carpeted.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 14, y: 0, rightAngle: true },
          { x: 14, y: 5, rightAngle: true },
          { x: 9, y: 5, rightAngle: true },
          { x: 9, y: 9, rightAngle: true },
          { x: 0, y: 9, rightAngle: true },
        ],
        edges: [{ label: "14 m" }, { label: "5 m" }, { label: "5 m" }, { label: "4 m" }, { label: "9 m" }, { label: "9 m" }],
        fill: "blue",
      },
    },
    answer("y7-are-prb-p15", "A wall 8 m wide and 3 m tall has two windows each 1.2 m × 1 m. Find the area to be painted in m².", "A = (8 \\times 3) - 2 \\times (1.2 \\times 1)", "21.6", "Wall = 24 m². Two windows = 2 × 1.2 = 2.4 m². Paint = 24 − 2.4 = 21.6 m²."),
    choice("y7-are-prb-p16", "Paint covers 8 m² per litre and costs $20 per litre. A wall has area 40 m². How much will the paint cost?", "C", ["$800", "$320", "$100", "$160"], "Litres = 40 ÷ 8 = 5 L. Cost = 5 × $20 = $100."),
    answer("y7-are-prb-p17", "Convert 4.7 m² into cm². Give your answer in cm².", "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2", "47000", "4.7 × 10 000 = 47 000 cm².", ["47,000"]),
    answer("y7-are-prb-p18", "A rectangular bathroom 300 cm × 240 cm is tiled with 60 cm × 60 cm tiles. How many tiles are needed?", "\\frac{300 \\times 240}{60 \\times 60}", "20", "Floor = 72 000 cm². Tile = 3600 cm². Number = 72 000 ÷ 3600 = 20 tiles."),
    answer("y7-are-prb-p19", "A triangular garden has base 9 m and perpendicular height 8 m. Fertiliser costs $7 per m². Find the total cost in dollars.", "\\text{Cost} = \\frac{1}{2} \\times 9 \\times 8 \\times 7", "252", "Area = ½ × 9 × 8 = 36 m². Cost = 36 × $7 = $252.", ["$252", "252.00"]),
    answer("y7-are-prb-p20", "A room floor is 6 m × 4.5 m. Carpet costs $28 per m². The installer charges a flat fee of $90. Find the total cost in dollars.", "\\text{Total} = (6 \\times 4.5) \\times 28 + 90", "846", "Area = 27 m². Carpet = 27 × $28 = $756. Total = 756 + 90 = $846.", ["$846", "846.00"]),
    answer("y7-are-prb-p21", "A square tile is 50 cm × 50 cm. How many tiles cover a floor of area 9 m²? Give your answer as a whole number.", "\\text{Tile area} = 0.5 \\times 0.5", "36", "Tile = 0.25 m². Tiles = 9 ÷ 0.25 = 36."),
    {
      ...answer("y7-are-prb-p22", "A lawn 15 m × 10 m has a 4 m × 3 m bed removed. Fertiliser costs $2 per m². Find the total cost in dollars.", "\\text{Cost} = (15 \\times 10 - 4 \\times 3) \\times 2", "276", "Lawn = 150 m². Bed = 12 m². Remaining = 138 m². Cost = 138 × $2 = $276.", ["$276", "276.00"]),
      planeShapeDiagram: {
        description: "L-shaped lawn: a 15 m by 10 m rectangle with a 4 m wide by 3 m tall garden bed removed from the top-right corner. The remaining L-shaped region is the lawn to be fertilised.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 15, y: 0, rightAngle: true },
          { x: 15, y: 7, rightAngle: true },
          { x: 11, y: 7, rightAngle: true },
          { x: 11, y: 10, rightAngle: true },
          { x: 0, y: 10, rightAngle: true },
        ],
        edges: [{ label: "15 m" }, { label: "7 m" }, { label: "4 m" }, { label: "3 m" }, { label: "11 m" }, { label: "10 m" }],
        fill: "green",
      },
    },
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
      planeShapeDiagram: {
        description: "Feature wall 8 m wide and 3 m tall (shaded) with a 2 m by 1.5 m window cut out of its interior. The shaded region around the window is the surface to be painted.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 3, rightAngle: true },
          { x: 0, y: 3, rightAngle: true },
        ],
        edges: [{ label: "8 m" }, { label: "3 m" }, {}, {}],
        fill: "amber",
      },
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

const lessons: Record<string, LessonContent> = {
  "area-rectangles-triangles": areaRectanglesTriangles,
  "area-parallelograms-trapezoids": areaParallelogramsTrapezoids,
  "area-composite-shapes": areaCompositeShapes,
  "area-problem-solving": areaProblemSolving,
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
