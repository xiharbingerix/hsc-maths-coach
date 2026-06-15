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
>;

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
