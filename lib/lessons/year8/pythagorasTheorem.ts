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
import type { CartesianGraph, TriangleDiagram } from "../types";

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
  acceptedAnswers: string[] = [],
  triangleDiagram?: TriangleDiagram,
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify what is known and unknown, choose the matching method, then calculate step by step.",
    explanation,
    triangleDiagram,
    cartesianGraph,
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
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read the question carefully and use the labelled diagram if one is shown.",
    explanation,
    triangleDiagram,
    cartesianGraph,
  };
}

function tri(
  description: string,
  sideLabels: TriangleDiagram["sideLabels"],
  rightAngleAt: "A" | "B" | "C" = "C",
  angleLabels: TriangleDiagram["angleLabels"] = {}
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 80, y: 40 },
      C: { x: 80, y: 230 },
      B: { x: 330, y: 230 },
    },
    rightAngleAt,
    sideLabels,
    angleLabels,
  };
}

function coordGraph(
  description: string,
  from: { x: number; y: number; label: string },
  to: { x: number; y: number; label: string },
  domain = { xMin: 0, xMax: 8, yMin: 0, yMax: 8, xStep: 1, yStep: 1 }
): CartesianGraph {
  return {
    description,
    ...domain,
    points: [from, to],
    lineSegments: [{ from, to }],
  };
}

// ── Lesson 1: Introduction to right-angled triangles and the theorem ─────────

const introTheorem: LessonContent = {
  description:
    "Identify right-angled triangles, name the hypotenuse, and understand Pythagoras' theorem as a relationship between the three side lengths.",
  learningIntention:
    "Recognise right-angled triangles and state Pythagoras' theorem correctly.",
  successCriteria: [
    "Identify the right angle in a triangle from a diagram or description.",
    "Name the hypotenuse as the side directly opposite the right angle.",
    "State the theorem: a squared plus b squared equals c squared.",
    "Verify that a set of three numbers satisfies the theorem.",
  ],
  teaching: {
    paragraphs: [
      "A right-angled triangle has one angle that is exactly 90 degrees. This angle is marked with a small square in diagrams.",
      "The side directly opposite the right angle is called the hypotenuse. It is always the longest side of the triangle.",
      "Pythagoras' theorem says: if you square each shorter side and add the results, you get the square of the hypotenuse. Using a and b for the shorter sides and c for the hypotenuse: a squared plus b squared equals c squared.",
      "To check whether three lengths form a right-angled triangle, substitute them into the theorem. If the equation balances, they satisfy the theorem.",
    ],
    latexBlocks: [
      "a^2 + b^2 = c^2",
      "3^2 + 4^2 = 9 + 16 = 25 = 5^2 \\checkmark",
    ],
  },
  workedExamples: [
    {
      title: "Identify the hypotenuse",
      questionLatex: "\\text{In the triangle below, which side is the hypotenuse?}",
      triangleDiagram: tri(
        "Right-angled triangle ABC with right angle at C, shorter sides labelled a and b and hypotenuse labelled c.",
        { AC: "a", BC: "b", AB: "c" }
      ),
      steps: [
        { explanation: "The right angle is at C, marked with a square.", latex: "\\text{Right angle at }C" },
        { explanation: "The hypotenuse is opposite the right angle, so it is side AB.", latex: "\\text{Hypotenuse } = AB = c" },
      ],
      finalAnswerLatex: "\\text{Side }AB\\text{ is the hypotenuse.}",
    } as WorkedExample,
    {
      title: "Verify a 3-4-5 triangle",
      questionLatex: "\\text{Show that a triangle with sides }3\\text{ cm, }4\\text{ cm and }5\\text{ cm is right-angled.}",
      triangleDiagram: tri(
        "Triangle with shorter sides 3 cm and 4 cm and longest side 5 cm.",
        { AC: "3 cm", BC: "4 cm", AB: "5 cm" }
      ),
      steps: [
        { explanation: "Square each shorter side and add.", latex: "3^2 + 4^2 = 9 + 16 = 25" },
        { explanation: "Square the longest side.", latex: "5^2 = 25" },
        { explanation: "Both sides equal 25, so the theorem holds.", latex: "25 = 25 \\checkmark" },
      ],
      finalAnswerLatex: "\\text{The triangle is right-angled.}",
    } as WorkedExample,
    {
      title: "Show a triple is NOT right-angled",
      questionLatex: "\\text{A triangle has sides }4\\text{ cm, }5\\text{ cm and }7\\text{ cm. Is it right-angled?}",
      steps: [
        { explanation: "Square the two shorter sides and add.", latex: "4^2 + 5^2 = 16 + 25 = 41" },
        { explanation: "Square the longest side.", latex: "7^2 = 49" },
        { explanation: "41 is not equal to 49, so the theorem does not hold.", latex: "41 \\neq 49" },
      ],
      finalAnswerLatex: "\\text{Not a right-angled triangle.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-pyth-intro-g1",
      "Which side of a right-angled triangle is the hypotenuse?",
      "C",
      [
        "The shortest side",
        "A side that touches the right angle",
        "The side opposite the right angle",
        "The side at the top of the diagram",
      ],
      "The hypotenuse is always opposite the right angle.",
      "\\text{Select the correct description.}"
    ),
    answer(
      "y8-pyth-intro-g2",
      "A right-angled triangle has shorter sides 6 and 8. Calculate 6 squared plus 8 squared.",
      "6^2 + 8^2 = \\;?",
      "100",
      "6 squared is 36 and 8 squared is 64. Their sum is 100."
    ),
    choice(
      "y8-pyth-intro-g3",
      "Which set of three lengths satisfies Pythagoras' theorem?",
      "B",
      ["3, 4, 6", "5, 12, 13", "6, 7, 9", "4, 5, 7"],
      "5 squared plus 12 squared equals 25 plus 144 equals 169, which equals 13 squared.",
      "\\text{Check } a^2+b^2=c^2."
    ),
    answer(
      "y8-pyth-intro-g4",
      "Do sides 8, 15, 17 form a right-angled triangle? Enter yes or no.",
      "8^2 + 15^2 = 64 + 225 = 289 = 17^2",
      "yes",
      "64 plus 225 equals 289, and 17 squared equals 289. The theorem holds.",
      ["Yes", "YES"]
    ),
  ],
  independentPractice: [
    choice(
      "y8-pyth-intro-i1",
      "In a right-angled triangle, the right angle is at vertex C. Which side is the hypotenuse?",
      "A",
      ["AB", "AC", "BC", "All sides equally"],
      "The side opposite the right angle at C is AB.",
      "\\text{Triangle with right angle at }C."
    ),
    answer(
      "y8-pyth-intro-i2",
      "Calculate 5 squared plus 12 squared.",
      "5^2 + 12^2 = \\;?",
      "169",
      "25 plus 144 equals 169."
    ),
    choice(
      "y8-pyth-intro-i3",
      "A student says 4, 6, 8 is a Pythagorean triple because 4 plus 6 equals 10 and 8 plus 2 equals 10. What is wrong?",
      "D",
      [
        "The numbers are too small",
        "Only two numbers can be used",
        "The triple must include 5",
        "The theorem uses squares, not sums",
      ],
      "Pythagoras' theorem uses squared values, not plain sums.",
      "\\text{Identify the error.}"
    ),
    answer(
      "y8-pyth-intro-i4",
      "Do sides 6, 8, 10 form a right-angled triangle? Enter yes or no.",
      "6^2+8^2=36+64=100=10^2",
      "yes",
      "36 plus 64 equals 100, which equals 10 squared.",
      ["Yes", "YES"]
    ),
    answer(
      "y8-pyth-intro-i5",
      "Do sides 5, 6, 8 form a right-angled triangle? Enter yes or no.",
      "5^2+6^2=25+36=61,\\quad 8^2=64",
      "no",
      "25 plus 36 equals 61, but 8 squared is 64. The theorem does not hold.",
      ["No", "NO"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Calling one of the shorter sides the hypotenuse.",
      fix: "Find the right-angle marker first. The side directly opposite it is always the hypotenuse.",
    },
    {
      mistake: "Using the theorem with the three sides added, not squared.",
      fix: "Square each shorter side separately before adding.",
    },
    {
      mistake: "Checking a² + b² = c using any side as c.",
      fix: "Use c for the longest side (the hypotenuse) and a, b for the two shorter sides.",
    },
    {
      mistake: "Concluding a triangle is right-angled without squaring.",
      fix: "Always substitute squared values. Check that the two results are exactly equal.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-pyth-intro-m1",
      "The right angle is at B. Which side is the hypotenuse?",
      "C",
      ["AB", "BC", "AC", "There is no hypotenuse"],
      "The hypotenuse is opposite the right angle at B, so it is AC.",
      "\\text{Triangle with right angle at }B.",
      tri("Right-angled triangle with right angle at B.", { AB: "AB", BC: "BC", AC: "AC" }, "B")
    ),
    answer(
      "y8-pyth-intro-m2",
      "Calculate 9 squared plus 12 squared.",
      "9^2 + 12^2 = \\;?",
      "225",
      "81 plus 144 equals 225."
    ),
    choice(
      "y8-pyth-intro-m3",
      "Which of the following is a Pythagorean triple?",
      "A",
      ["8, 15, 17", "6, 7, 10", "3, 5, 6", "4, 6, 8"],
      "8 squared plus 15 squared is 64 plus 225 which equals 289, and 17 squared is 289."
    ),
    answer(
      "y8-pyth-intro-m4",
      "Do sides 9, 40, 41 satisfy Pythagoras' theorem? Enter yes or no.",
      "9^2+40^2=81+1600=1681=41^2",
      "yes",
      "81 plus 1600 equals 1681, which equals 41 squared.",
      ["Yes", "YES"]
    ),
    answer(
      "y8-pyth-intro-m5",
      "Do sides 7, 8, 11 satisfy Pythagoras' theorem? Enter yes or no.",
      "7^2+8^2=49+64=113,\\quad 11^2=121",
      "no",
      "113 does not equal 121, so the theorem does not hold.",
      ["No", "NO"]
    ),
    choice(
      "y8-pyth-intro-m6",
      "Which statement correctly describes the hypotenuse?",
      "B",
      [
        "The shortest side of any triangle",
        "The longest side, opposite the right angle",
        "A side that touches the 90 degree corner",
        "Any side in a right-angled triangle",
      ],
      "The hypotenuse is the longest side and lies opposite the right angle."
    ),
    answer(
      "y8-pyth-intro-m7",
      "A right-angled triangle has shorter sides of length 20 and 21. Calculate 20 squared plus 21 squared.",
      "20^2+21^2=\\;?",
      "841",
      "400 plus 441 equals 841."
    ),
    choice(
      "y8-pyth-intro-m8",
      "A student checks whether 10, 24, 26 is a Pythagorean triple by computing 10 + 24 = 34. What is wrong?",
      "C",
      [
        "The numbers are too large",
        "The theorem only works for whole numbers under 20",
        "The theorem requires squaring, not adding plain lengths",
        "The student should subtract instead",
      ],
      "Pythagoras' theorem uses squares: 100 + 576 = 676 = 26 squared."
    ),
    answer(
      "y8-pyth-intro-m9",
      "Do sides 10, 24, 26 satisfy Pythagoras' theorem? Enter yes or no.",
      "10^2+24^2=100+576=676=26^2",
      "yes",
      "100 plus 576 equals 676, which equals 26 squared.",
      ["Yes", "YES"]
    ),
    choice(
      "y8-pyth-intro-m10",
      "In the theorem a squared plus b squared equals c squared, what does c represent?",
      "D",
      [
        "The shortest side",
        "Any side of the triangle",
        "Either shorter side",
        "The hypotenuse",
      ],
      "In the standard form, c is always the hypotenuse."
    ),
  ],
};

// ── Lesson 2: Finding the hypotenuse ─────────────────────────────────────────

const findingHypotenuse: LessonContent = {
  description:
    "Use Pythagoras' theorem to calculate the hypotenuse when both shorter sides are known, expressing answers as exact values or rounded decimals.",
  learningIntention:
    "Calculate the hypotenuse by adding the squares of both shorter sides and taking the square root.",
  successCriteria: [
    "Confirm the unknown side is the hypotenuse.",
    "Square both shorter sides and add the results.",
    "Take the square root of the sum.",
    "Round decimal answers only when instructed.",
  ],
  teaching: {
    paragraphs: [
      "When both shorter sides are known, the hypotenuse is found by adding their squares and then taking the square root. Use c for the hypotenuse and a, b for the shorter sides.",
      "Some calculations produce a whole-number answer — these are called Pythagorean triples and should be left exact.",
      "When the answer is not a whole number, use a calculator and round to the stated number of decimal places at the very end.",
    ],
    latexBlocks: [
      "c = \\sqrt{a^2 + b^2}",
      "\\text{Example: }a=3,\\;b=4 \\Rightarrow c=\\sqrt{9+16}=\\sqrt{25}=5",
    ],
  },
  workedExamples: [
    {
      title: "Find a hypotenuse using a 3-4-5 triple",
      questionLatex: "\\text{Find }c\\text{ when }a=3\\text{ cm and }b=4\\text{ cm.}",
      triangleDiagram: tri("Right-angled triangle with shorter sides 3 cm and 4 cm and unknown hypotenuse c.", { AC: "3 cm", BC: "4 cm", AB: "c" }),
      steps: [
        { explanation: "The unknown is opposite the right angle, so it is the hypotenuse.", latex: "c^2 = 3^2 + 4^2" },
        { explanation: "Add the squares, then take the square root.", latex: "c = \\sqrt{9+16} = \\sqrt{25} = 5" },
      ],
      finalAnswerLatex: "c = 5\\text{ cm}",
    } as WorkedExample,
    {
      title: "Find a hypotenuse using a 5-12-13 triple",
      questionLatex: "\\text{Find the hypotenuse when the shorter sides are }5\\text{ m and }12\\text{ m.}",
      steps: [
        { explanation: "Add the squares.", latex: "c^2 = 5^2 + 12^2 = 25 + 144 = 169" },
        { explanation: "Take the square root.", latex: "c = \\sqrt{169} = 13" },
      ],
      finalAnswerLatex: "13\\text{ m}",
    } as WorkedExample,
    {
      title: "Round a decimal hypotenuse",
      questionLatex: "\\text{Find the hypotenuse when the shorter sides are }4\\text{ cm and }7\\text{ cm. Round to 1 decimal place.}",
      steps: [
        { explanation: "Add the squares.", latex: "c = \\sqrt{4^2+7^2} = \\sqrt{16+49} = \\sqrt{65}" },
        { explanation: "Evaluate and round only at the end.", latex: "c \\approx 8.06\\ldots \\approx 8.1" },
      ],
      finalAnswerLatex: "8.1\\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-hyp-g1", "Find the hypotenuse in centimetres.", "a=6\\text{ cm},\\;b=8\\text{ cm}", "10", "Square root of 36 plus 64 equals 10.", ["10 cm"], tri("Right triangle: shorter sides 6 cm and 8 cm, hypotenuse c.", { AC: "6 cm", BC: "8 cm", AB: "c" })),
    choice("y8-pyth-hyp-g2", "Which calculation finds the hypotenuse when a = 9 and b = 12?", "B", ["$9 + 12$", "$\\sqrt{9^2+12^2}$", "$\\sqrt{9^2-12^2}$", "$9^2+12^2$"], "Add the squares then take the square root.", "\\text{Select the correct setup.}"),
    answer("y8-pyth-hyp-g3", "Find the hypotenuse in metres.", "a=8\\text{ m},\\;b=15\\text{ m}", "17", "Square root of 64 plus 225 equals 17.", ["17 m"]),
    answer("y8-pyth-hyp-g4", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "a=3\\text{ cm},\\;b=7\\text{ cm}", "7.6", "Square root of 58 is approximately 7.6.", ["7.6 cm"]),
  ],
  independentPractice: [
    answer("y8-pyth-hyp-i1", "Find the hypotenuse in millimetres.", "a=9\\text{ mm},\\;b=12\\text{ mm}", "15", "Square root of 81 plus 144 equals 15.", ["15 mm"]),
    answer("y8-pyth-hyp-i2", "Find the hypotenuse in metres. Round to 1 decimal place.", "a=5\\text{ m},\\;b=7\\text{ m}", "8.6", "Square root of 74 is approximately 8.6.", ["8.6 m"]),
    choice("y8-pyth-hyp-i3", "A student adds 6 and 8 to get 14, then says the hypotenuse is 14. What error was made?", "A", ["Side lengths were added instead of squared", "The wrong sides were chosen", "The square root was taken of 14", "Nothing is wrong"], "Pythagoras requires squaring each side first."),
    answer("y8-pyth-hyp-i4", "Find the hypotenuse in centimetres.", "a=7\\text{ cm},\\;b=24\\text{ cm}", "25", "Square root of 49 plus 576 equals 25.", ["25 cm"]),
    answer("y8-pyth-hyp-i5", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "a=5\\text{ cm},\\;b=6\\text{ cm}", "7.8", "Square root of 61 is approximately 7.8.", ["7.8 cm"]),
  ],
  commonMistakes: [
    { mistake: "Adding the side lengths before squaring.", fix: "Square each shorter side first, then add the two squared values." },
    { mistake: "Forgetting to take the square root.", fix: "After finding c squared, take the square root to find c." },
    { mistake: "Rounding too early in the working.", fix: "Keep the full calculator value and round only the final answer." },
    { mistake: "Choosing a shorter side as the hypotenuse.", fix: "The hypotenuse is opposite the right angle and is always the longest side." },
  ],
  masteryQuiz: [
    answer("y8-pyth-hyp-m1", "Find the hypotenuse in centimetres.", "a=3\\text{ cm},\\;b=4\\text{ cm}", "5", "Square root of 25 equals 5.", ["5 cm"]),
    answer("y8-pyth-hyp-m2", "Find the hypotenuse in metres.", "a=5\\text{ m},\\;b=12\\text{ m}", "13", "Square root of 169 equals 13.", ["13 m"]),
    choice("y8-pyth-hyp-m3", "Which side is the hypotenuse in the triangle below?", "A", ["AB", "AC", "BC", "Cannot tell"], "AB is opposite the right angle at C.", "\\text{Use the diagram.}", tri("Right-angled triangle ABC with right angle at C.", { AB: "AB", AC: "AC", BC: "BC" })),
    answer("y8-pyth-hyp-m4", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "a=6\\text{ cm},\\;b=7\\text{ cm}", "9.2", "Square root of 85 is approximately 9.2.", ["9.2 cm"]),
    answer("y8-pyth-hyp-m5", "Find the hypotenuse in kilometres.", "a=20\\text{ km},\\;b=21\\text{ km}", "29", "Square root of 841 equals 29.", ["29 km"]),
    choice("y8-pyth-hyp-m6", "Which is the correct calculation for shorter sides 10 and 11?", "C", ["$\\sqrt{11^2-10^2}$", "$10+11$", "$\\sqrt{10^2+11^2}$", "$10^2+11^2$"], "A hypotenuse uses the square root of the sum of squares."),
    answer("y8-pyth-hyp-m7", "Find the hypotenuse in metres. Round to 1 decimal place.", "a=4\\text{ m},\\;b=9\\text{ m}", "9.8", "Square root of 97 is approximately 9.8.", ["9.8 m"]),
    choice("y8-pyth-hyp-m8", "A student finds 9 + 16 = 25 for sides 3 and 4, then writes 25 cm as the answer. What step is missing?", "B", ["Subtract the squares", "Take the square root", "Double the result", "Round to a decimal"], "c squared was found; the square root gives c."),
    answer("y8-pyth-hyp-m9", "A rectangular screen is 30 cm wide and 40 cm high. Find its diagonal in centimetres.", "\\text{rectangle: }30\\text{ cm by }40\\text{ cm}", "50", "Square root of 900 plus 1600 equals 50.", ["50 cm"]),
    answer("y8-pyth-hyp-m10", "Find the hypotenuse in metres. Round to 1 decimal place.", "a=11\\text{ m},\\;b=13\\text{ m}", "17.0", "Square root of 121 plus 169 is approximately 17.0.", ["17.0 m", "17 m", "17"]),
  ],
};

// ── Lesson 3: Finding a shorter side ─────────────────────────────────────────

const findingShorterSide: LessonContent = {
  description:
    "Use Pythagoras' theorem to find an unknown shorter side when the hypotenuse and one shorter side are given.",
  learningIntention:
    "Rearrange Pythagoras' theorem to subtract and find a shorter side.",
  successCriteria: [
    "Identify the hypotenuse as the longest given side.",
    "Subtract the known shorter-side square from the hypotenuse square.",
    "Take the square root of the difference.",
    "Check the answer is shorter than the hypotenuse.",
  ],
  teaching: {
    paragraphs: [
      "When the unknown is a shorter side, start with the hypotenuse square and subtract the square of the known shorter side.",
      "Always identify the hypotenuse first — it is the longest side, opposite the right angle. The method only works if you subtract from the correct (largest) value.",
      "Subtract first, then take the square root. A common mistake is to take the square root of each value separately.",
    ],
    latexBlocks: [
      "a^2 + b^2 = c^2",
      "b = \\sqrt{c^2 - a^2}",
      "b = \\sqrt{13^2 - 5^2} = \\sqrt{169-25} = \\sqrt{144} = 12",
    ],
  },
  workedExamples: [
    {
      title: "Use a 5-12-13 triangle",
      questionLatex: "\\text{The hypotenuse is }13\\text{ cm and one shorter side is }5\\text{ cm. Find the unknown shorter side.}",
      triangleDiagram: tri("Right-angled triangle: hypotenuse 13 cm, one shorter side 5 cm, unknown shorter side x.", { AB: "13 cm", AC: "5 cm", BC: "x" }),
      steps: [
        { explanation: "Subtract the known shorter-side square from the hypotenuse square.", latex: "x^2 = 13^2 - 5^2 = 169 - 25 = 144" },
        { explanation: "Take the square root.", latex: "x = \\sqrt{144} = 12" },
      ],
      finalAnswerLatex: "12\\text{ cm}",
    } as WorkedExample,
    {
      title: "Use a 6-8-10 triangle",
      questionLatex: "\\text{Hypotenuse }10\\text{ m, one shorter side }6\\text{ m. Find the other shorter side.}",
      steps: [
        { explanation: "Subtract the squares.", latex: "x = \\sqrt{10^2 - 6^2} = \\sqrt{100-36} = \\sqrt{64}" },
        { explanation: "Take the square root.", latex: "x = 8" },
      ],
      finalAnswerLatex: "8\\text{ m}",
    } as WorkedExample,
    {
      title: "Round a decimal shorter side",
      questionLatex: "\\text{Hypotenuse }11\\text{ cm, one shorter side }7\\text{ cm. Find the other, rounded to 1 decimal place.}",
      steps: [
        { explanation: "Subtract the squares.", latex: "x = \\sqrt{11^2-7^2} = \\sqrt{121-49} = \\sqrt{72}" },
        { explanation: "Evaluate and round.", latex: "x \\approx 8.485\\ldots \\approx 8.5" },
      ],
      finalAnswerLatex: "8.5\\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-short-g1", "Find the unknown shorter side in centimetres.", "\\text{hypotenuse }13\\text{ cm, shorter side }12\\text{ cm}", "5", "Square root of 169 minus 144 equals 5.", ["5 cm"], tri("Right-angled triangle: hypotenuse 13 cm, known shorter side 12 cm, unknown side x.", { AB: "13 cm", BC: "12 cm", AC: "x" })),
    answer("y8-pyth-short-g2", "Find the unknown shorter side in metres.", "\\text{hypotenuse }17\\text{ m, shorter side }8\\text{ m}", "15", "Square root of 289 minus 64 equals 15.", ["15 m"]),
    choice("y8-pyth-short-g3", "Which setup finds unknown shorter side x when hypotenuse = 13 and known shorter side = 5?", "D", ["$\\sqrt{13^2+5^2}$", "$13-5$", "$13^2+5^2$", "$\\sqrt{13^2-5^2}$"], "Subtract the shorter-side square from the hypotenuse square."),
    answer("y8-pyth-short-g4", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "\\text{hypotenuse }9\\text{ cm, shorter side }4\\text{ cm}", "8.1", "Square root of 65 is approximately 8.1.", ["8.1 cm"]),
  ],
  independentPractice: [
    answer("y8-pyth-short-i1", "Find the unknown shorter side in millimetres.", "\\text{hypotenuse }25\\text{ mm, shorter side }7\\text{ mm}", "24", "Square root of 625 minus 49 equals 24.", ["24 mm"]),
    answer("y8-pyth-short-i2", "Find the unknown shorter side in metres. Round to 1 decimal place.", "\\text{hypotenuse }12\\text{ m, shorter side }7\\text{ m}", "9.7", "Square root of 95 is approximately 9.7.", ["9.7 m"]),
    choice("y8-pyth-short-i3", "Which value must be the starting point before subtraction?", "A", ["The hypotenuse squared", "The shorter side squared", "The sum of all sides", "The right-angle value"], "Subtract from the hypotenuse square."),
    answer("y8-pyth-short-i4", "A 13 m ladder leans against a wall. Its base is 5 m from the wall. Find the height reached in metres.", "\\text{ladder }13\\text{ m, base }5\\text{ m}", "12", "Square root of 169 minus 25 equals 12.", ["12 m"]),
    choice("y8-pyth-short-i5", "Why is square root of 6 squared minus 10 squared not valid when finding a shorter side?", "C", ["Both values must be added", "Six is the hypotenuse", "The hypotenuse square must come first since it is larger", "Square roots are only used for hypotenuses"], "The hypotenuse square must be the value being subtracted from."),
  ],
  commonMistakes: [
    { mistake: "Adding the squares when the unknown is a shorter side.", fix: "Subtract the known shorter-side square from the hypotenuse square." },
    { mistake: "Subtracting the side lengths before squaring.", fix: "Square each value first: c squared minus a squared." },
    { mistake: "Using the shorter side as the hypotenuse in the subtraction.", fix: "Always subtract from the larger, hypotenuse square." },
    { mistake: "Getting a negative under the square root.", fix: "This signals the hypotenuse was not identified correctly. The largest value must be squared first." },
  ],
  masteryQuiz: [
    answer("y8-pyth-short-m1", "Find the unknown shorter side in centimetres.", "\\text{hypotenuse }10\\text{ cm, shorter side }6\\text{ cm}", "8", "Square root of 64 equals 8.", ["8 cm"]),
    answer("y8-pyth-short-m2", "Find the unknown shorter side in metres.", "\\text{hypotenuse }25\\text{ m, shorter side }20\\text{ m}", "15", "Square root of 625 minus 400 equals 15.", ["15 m"]),
    choice("y8-pyth-short-m3", "Which operation is performed immediately before taking the square root when finding a shorter side?", "B", ["Add the squared lengths", "Subtract the squared lengths", "Divide the side lengths", "Round the hypotenuse"], "For an unknown shorter side, subtract the squares."),
    answer("y8-pyth-short-m4", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "\\text{hypotenuse }14\\text{ cm, shorter side }9\\text{ cm}", "10.7", "Square root of 115 is approximately 10.7.", ["10.7 cm"]),
    answer("y8-pyth-short-m5", "A 15 m ladder stands 9 m from a wall. Find the height reached in metres.", "\\text{ladder }15\\text{ m, base }9\\text{ m}", "12", "Square root of 225 minus 81 equals 12.", ["12 m"]),
    choice("y8-pyth-short-m6", "The diagram shows a triangle with hypotenuse 17 and one shorter side 8. Which side is unknown?", "C", ["AB", "The hypotenuse", "The side labelled x", "The right angle"], "The unknown shorter side is labelled x.", "\\text{Use the diagram.}", tri("Right-angled triangle: hypotenuse 17, known shorter side 8, unknown shorter side x.", { AB: "17", AC: "8", BC: "x" })),
    answer("y8-pyth-short-m7", "Find the unknown shorter side in metres. Round to 2 decimal places.", "\\text{hypotenuse }18\\text{ m, shorter side }11\\text{ m}", "14.25", "Square root of 203 is approximately 14.25.", ["14.25 m"]),
    choice("y8-pyth-short-m8", "A student writes square root of 6 squared minus 10 squared for shorter sides 6 and 10. What correction is needed?", "A", ["Use $\\sqrt{10^2-6^2}$", "Use $\\sqrt{10^2+6^2}$", "Use $10-6$", "Use $6^2+10^2$"], "The larger hypotenuse square must come first in the subtraction."),
    answer("y8-pyth-short-m9", "A rectangular park has diagonal 26 m and one side 10 m. Find the other side in metres.", "\\text{diagonal }26\\text{ m, width }10\\text{ m}", "24", "Square root of 676 minus 100 equals 24.", ["24 m"]),
    answer("y8-pyth-short-m10", "A support wire is 9.5 m long and reaches 3.2 m horizontally from a pole. Find the pole height in metres. Round to 1 decimal place.", "\\text{wire }9.5\\text{ m, horizontal }3.2\\text{ m}", "8.9", "Square root of 90.25 minus 10.24 equals square root of 80.01 which is approximately 8.9.", ["8.9 m"]),
  ],
};

// ── Lesson 4: Pythagoras in real contexts ─────────────────────────────────────

const realContexts: LessonContent = {
  description:
    "Apply Pythagoras' theorem to word problems involving ladders, rectangles, ramps and paths by identifying the right-angled triangle and choosing the correct setup.",
  learningIntention:
    "Translate a worded context into a right-angled triangle and apply the correct form of Pythagoras' theorem.",
  successCriteria: [
    "Sketch or identify the right triangle inside a context.",
    "Decide whether the unknown is the hypotenuse or a shorter side.",
    "Use addition or subtraction of squares accordingly.",
    "Include units and round only when required.",
  ],
  teaching: {
    paragraphs: [
      "Many real situations hide a right-angled triangle: a ladder against a wall, the diagonal of a rectangle, a ramp from floor to platform, or a direct path between two points.",
      "Start every problem by drawing a rough sketch. Label the right angle and any known lengths. Decide: is the unknown the hypotenuse, or is the hypotenuse already known?",
      "If the unknown is opposite the right angle, add the squares and take the square root. If the hypotenuse is known and a shorter side is missing, subtract squares and take the square root.",
    ],
    latexBlocks: [
      "\\text{unknown hypotenuse: }c = \\sqrt{a^2+b^2}",
      "\\text{unknown shorter side: }b = \\sqrt{c^2-a^2}",
    ],
  },
  workedExamples: [
    {
      title: "Rectangle diagonal",
      questionLatex: "\\text{A rectangle is }6\\text{ m by }8\\text{ m. Find its diagonal.}",
      steps: [
        { explanation: "The diagonal cuts the rectangle into two right-angled triangles. The diagonal is the hypotenuse.", latex: "d = \\sqrt{6^2+8^2}" },
        { explanation: "Evaluate.", latex: "d = \\sqrt{36+64} = \\sqrt{100} = 10" },
      ],
      finalAnswerLatex: "10\\text{ m}",
    } as WorkedExample,
    {
      title: "Ladder against a wall",
      questionLatex: "\\text{A }10\\text{ m ladder reaches a wall. Its base is }6\\text{ m from the wall. How high does it reach?}",
      steps: [
        { explanation: "The ladder is the hypotenuse. The wall height is the unknown shorter side.", latex: "h = \\sqrt{10^2-6^2}" },
        { explanation: "Subtract then take the square root.", latex: "h = \\sqrt{100-36} = \\sqrt{64} = 8" },
      ],
      finalAnswerLatex: "8\\text{ m}",
    } as WorkedExample,
    {
      title: "Ramp rise",
      questionLatex: "\\text{A ramp is }6.5\\text{ m long and covers }6\\text{ m horizontally. Find the rise, rounded to 1 decimal place.}",
      steps: [
        { explanation: "The ramp is the hypotenuse; the rise is an unknown shorter side.", latex: "r = \\sqrt{6.5^2-6^2} = \\sqrt{42.25-36}" },
        { explanation: "Evaluate.", latex: "r = \\sqrt{6.25} = 2.5" },
      ],
      finalAnswerLatex: "2.5\\text{ m}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-ctx-g1", "A rectangle is 9 m by 12 m. Find its diagonal in metres.", "\\text{rectangle: }9\\text{ m by }12\\text{ m}", "15", "Square root of 81 plus 144 equals 15.", ["15 m"]),
    choice("y8-pyth-ctx-g2", "A ladder leans against a wall forming a right triangle. Which length is the hypotenuse?", "B", ["The wall height", "The ladder length", "The ground distance", "The right-angle size"], "The ladder runs from ground to wall opposite the right angle."),
    answer("y8-pyth-ctx-g3", "A 5 m rope is tied from the top of a pole to the ground 3 m from the base. Find the pole height in metres.", "\\text{rope }5\\text{ m, ground }3\\text{ m}", "4", "Square root of 25 minus 9 equals 4.", ["4 m"]),
    choice("y8-pyth-ctx-g4", "Which setup gives the diagonal of an 8 cm by 15 cm rectangle?", "C", ["$\\sqrt{15^2-8^2}$", "$8+15$", "$\\sqrt{8^2+15^2}$", "$15-8$"], "A diagonal is a hypotenuse, so add the squares."),
  ],
  independentPractice: [
    answer("y8-pyth-ctx-i1", "A square has side length 5 cm. Find its diagonal in centimetres. Round to 1 decimal place.", "\\text{square side: }5\\text{ cm}", "7.1", "Square root of 50 is approximately 7.1.", ["7.1 cm"]),
    answer("y8-pyth-ctx-i2", "A 17 m ladder stands 8 m from a wall. Find the height it reaches in metres.", "\\text{ladder }17\\text{ m, base }8\\text{ m}", "15", "Square root of 289 minus 64 equals 15.", ["15 m"]),
    choice("y8-pyth-ctx-i3", "A context gives a known hypotenuse and asks for a shorter side. Which operation is used?", "D", ["Add lengths", "Multiply lengths", "Add squares then take the square root", "Subtract the shorter-side square from the hypotenuse square"], "An unknown shorter side uses subtraction."),
    answer("y8-pyth-ctx-i4", "Find the distance between points (0, 0) and (5, 12) in units.", "\\text{points }(0,0)\\text{ and }(5,12)", "13", "Square root of 25 plus 144 equals 13.", ["13 units"]),
    answer("y8-pyth-ctx-i5", "A garden path goes 7 m east and 24 m north. Find the direct distance in metres.", "\\text{east }7\\text{ m, north }24\\text{ m}", "25", "Square root of 49 plus 576 equals 25.", ["25 m"]),
  ],
  commonMistakes: [
    { mistake: "Using all numbers without identifying their roles.", fix: "Sketch the right triangle first, then label each side as hypotenuse or shorter side." },
    { mistake: "Adding squares when the hypotenuse is already known.", fix: "If the hypotenuse is given, subtract the known shorter-side square from it." },
    { mistake: "Forgetting to include units.", fix: "Return to the problem context and attach the correct unit to the answer." },
    { mistake: "Treating a diagonal as a shorter side.", fix: "A diagonal of a rectangle is the hypotenuse of the right triangle it creates." },
  ],
  masteryQuiz: [
    answer("y8-pyth-ctx-m1", "A rectangle is 5 m by 12 m. Find its diagonal in metres.", "\\text{rectangle: }5\\text{ m by }12\\text{ m}", "13", "Square root of 25 plus 144 equals 13.", ["13 m"]),
    answer("y8-pyth-ctx-m2", "A 10 m rope stretches from the top of a 6 m pole straight to the ground. How far from the base does it reach?", "\\text{rope }10\\text{ m, pole }6\\text{ m}", "8", "Square root of 100 minus 36 equals 8.", ["8 m"]),
    choice("y8-pyth-ctx-m3", "Which word in a rectangle problem signals a hypotenuse?", "A", ["Diagonal", "Perimeter", "Area", "Width"], "A rectangle diagonal spans a right triangle."),
    answer("y8-pyth-ctx-m4", "A square has side 9 m. Find its diagonal in metres. Round to 1 decimal place.", "\\text{square side: }9\\text{ m}", "12.7", "Square root of 162 is approximately 12.7.", ["12.7 m"]),
    answer("y8-pyth-ctx-m5", "A television is 40 cm wide and 30 cm high. Find its diagonal in centimetres.", "\\text{screen: }40\\text{ cm by }30\\text{ cm}", "50", "Square root of 1600 plus 900 equals 50.", ["50 cm"]),
    choice("y8-pyth-ctx-m6", "A ramp and its horizontal distance are known. Which is the hypotenuse?", "B", ["The horizontal distance", "The ramp", "The rise", "The right angle"], "The sloping ramp is opposite the right angle."),
    answer("y8-pyth-ctx-m7", "A path goes 20 m east and 21 m north. Find the direct distance home in metres.", "\\text{east }20\\text{ m, north }21\\text{ m}", "29", "Square root of 400 plus 441 equals 29.", ["29 m"]),
    choice("y8-pyth-ctx-m8", "A student adds the ladder length and wall height to find the ground distance. What is wrong?", "C", ["Area was used instead", "The answer should be in cm", "The correct method subtracts the shorter-side square from the hypotenuse square", "The ladder is not the hypotenuse"], "The ladder is the hypotenuse; subtract the wall-height square."),
    answer("y8-pyth-ctx-m9", "A support cable 14 m long connects to a point 11 m horizontally from a pole. Find the height in metres. Round to 1 decimal place.", "\\text{cable }14\\text{ m, horizontal }11\\text{ m}", "8.7", "Square root of 196 minus 121 equals square root of 75 which is approximately 8.7.", ["8.7 m"]),
    answer("y8-pyth-ctx-m10", "A rectangular window has diagonal 25 cm and width 7 cm. Find its height in centimetres.", "\\text{diagonal }25\\text{ cm, width }7\\text{ cm}", "24", "Square root of 625 minus 49 equals 24.", ["24 cm"]),
  ],
};

// ── Lesson 5: Pythagorean triples ─────────────────────────────────────────────

const pythagoreanTriples: LessonContent = {
  description:
    "Recognise common Pythagorean triples and their multiples to find exact side lengths without a calculator.",
  learningIntention:
    "Identify Pythagorean triples and use multiples of triples to find exact answers.",
  successCriteria: [
    "State the four common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
    "Recognise scaled multiples such as 6-8-10 as a multiple of 3-4-5.",
    "Find a missing side from a triple or its multiple without a calculator.",
    "Verify a given set of numbers is a Pythagorean triple.",
  ],
  teaching: {
    paragraphs: [
      "A Pythagorean triple is a set of three whole numbers that satisfies Pythagoras' theorem exactly. The four most common families are 3-4-5, 5-12-13, 8-15-17 and 7-24-25.",
      "Multiplying all three numbers in a triple by the same value creates a new triple. For example, 3-4-5 multiplied by 2 gives 6-8-10; multiplied by 3 gives 9-12-15.",
      "Recognising a triple means you can write the exact answer as a whole number without using a calculator.",
    ],
    latexBlocks: [
      "3\\text{-}4\\text{-}5,\\quad 5\\text{-}12\\text{-}13,\\quad 8\\text{-}15\\text{-}17,\\quad 7\\text{-}24\\text{-}25",
      "\\text{Multiple: } (3k)^2+(4k)^2=(5k)^2 \\text{ for any }k",
    ],
  },
  workedExamples: [
    {
      title: "Recognise the 3-4-5 family",
      questionLatex: "\\text{A right triangle has shorter sides }9\\text{ cm and }12\\text{ cm. Find the hypotenuse without a calculator.}",
      steps: [
        { explanation: "Check whether 9 and 12 are multiples of a known triple.", latex: "9 = 3 \\times 3,\\quad 12 = 4 \\times 3" },
        { explanation: "The scale factor is 3, so the hypotenuse is 5 times 3.", latex: "c = 5 \\times 3 = 15" },
      ],
      finalAnswerLatex: "15\\text{ cm}",
    } as WorkedExample,
    {
      title: "Identify a 5-12-13 triple",
      questionLatex: "\\text{Show that }5,\\,12,\\,13\\text{ is a Pythagorean triple.}",
      steps: [
        { explanation: "Square the shorter sides and add.", latex: "5^2+12^2 = 25+144 = 169" },
        { explanation: "Square the longest side.", latex: "13^2 = 169" },
        { explanation: "Both sides equal 169.", latex: "169 = 169\\checkmark" },
      ],
      finalAnswerLatex: "\\text{5, 12, 13 is a Pythagorean triple.}",
    } as WorkedExample,
    {
      title: "Scale the 8-15-17 triple",
      questionLatex: "\\text{A right triangle has shorter sides }16\\text{ m and }30\\text{ m. Find the hypotenuse.}",
      steps: [
        { explanation: "Check: 16 = 8 × 2 and 30 = 15 × 2, so the scale factor is 2.", latex: "16 = 8 \\times 2,\\quad 30 = 15 \\times 2" },
        { explanation: "Multiply the third number in the triple by the scale factor.", latex: "c = 17 \\times 2 = 34" },
      ],
      finalAnswerLatex: "34\\text{ m}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-trip-g1", "A right triangle has shorter sides 6 cm and 8 cm. State the hypotenuse using a triple.", "6\\text{ cm and }8\\text{ cm}", "10", "This is a 3-4-5 triple scaled by 2, so the hypotenuse is 10.", ["10 cm"]),
    choice("y8-pyth-trip-g2", "Which set is a Pythagorean triple?", "C", ["3, 4, 6", "6, 7, 9", "7, 24, 25", "5, 9, 12"], "7 squared plus 24 squared equals 49 plus 576 equals 625 equals 25 squared."),
    answer("y8-pyth-trip-g3", "A right triangle has shorter sides 15 m and 20 m. Find the hypotenuse using a triple.", "15\\text{ m and }20\\text{ m}", "25", "This is a 3-4-5 triple scaled by 5, so the hypotenuse is 25.", ["25 m"]),
    answer("y8-pyth-trip-g4", "The hypotenuse is 26 cm and one shorter side is 10 cm. Name the triple family and find the missing side.", "\\text{hypotenuse }26,\\text{ one side }10", "24", "10 and 26 are from the 5-12-13 family scaled by 2. The missing side is 12 times 2 equals 24.", ["24 cm"]),
  ],
  independentPractice: [
    answer("y8-pyth-trip-i1", "A right triangle has shorter sides 20 km and 21 km. State the hypotenuse.", "20\\text{ km and }21\\text{ km}", "29", "20-21-29 is a Pythagorean triple.", ["29 km"]),
    choice("y8-pyth-trip-i2", "Which pair of shorter sides belongs to the 3-4-5 family?", "B", ["9 and 16", "12 and 16", "6 and 9", "10 and 15"], "12 and 16 are multiples of 3 and 4 scaled by 4, giving hypotenuse 20."),
    answer("y8-pyth-trip-i3", "A right triangle has shorter sides 24 m and 32 m. Find the hypotenuse using a triple.", "24\\text{ m and }32\\text{ m}", "40", "This is 3-4-5 scaled by 8.", ["40 m"]),
    answer("y8-pyth-trip-i4", "The hypotenuse is 51 m and one shorter side is 24 m. Find the missing side.", "\\text{hypotenuse }51,\\text{ one side }24", "45", "51 and 24 are from the 8-15-17 family scaled by 3. The missing side is 15 times 3 equals 45.", ["45 m"]),
    choice("y8-pyth-trip-i5", "Why is 6-8-12 not a Pythagorean triple?", "A", ["6 squared plus 8 squared is 100 but 12 squared is 144", "12 is too large to be used", "The numbers must be under 10", "All three must be odd"], "100 does not equal 144, so the theorem fails."),
  ],
  commonMistakes: [
    { mistake: "Assuming any three whole numbers form a triple.", fix: "Verify by checking a squared plus b squared equals c squared before using the triple." },
    { mistake: "Using the triple without checking the scale factor.", fix: "Find what each member of the triple was multiplied by before using the third value." },
    { mistake: "Mixing up which number in the triple is the hypotenuse.", fix: "In a triple a-b-c, the largest number c is always the hypotenuse." },
    { mistake: "Thinking only 3-4-5 exists.", fix: "Learn all four families: 3-4-5, 5-12-13, 8-15-17, 7-24-25." },
  ],
  masteryQuiz: [
    answer("y8-pyth-trip-m1", "A right triangle has shorter sides 9 cm and 40 cm. State the hypotenuse.", "9\\text{ cm, }40\\text{ cm}", "41", "9-40-41 is a Pythagorean triple.", ["41 cm"]),
    choice("y8-pyth-trip-m2", "Which is a multiple of the 5-12-13 triple?", "B", ["10-22-26", "10-24-26", "15-35-39", "20-48-53"], "10-24-26 is 5-12-13 scaled by 2."),
    answer("y8-pyth-trip-m3", "A right triangle has shorter sides 21 cm and 28 cm. Find the hypotenuse.", "21\\text{ cm, }28\\text{ cm}", "35", "This is 3-4-5 scaled by 7.", ["35 cm"]),
    choice("y8-pyth-trip-m4", "Which set is NOT a Pythagorean triple?", "D", ["3, 4, 5", "5, 12, 13", "8, 15, 17", "6, 8, 11"], "6 squared plus 8 squared equals 100 but 11 squared equals 121."),
    answer("y8-pyth-trip-m5", "The hypotenuse is 65 m and one shorter side is 25 m. Find the other shorter side.", "\\text{hypotenuse }65,\\text{ shorter }25", "60", "5-12-13 scaled by 5 gives 25-60-65.", ["60 m"]),
    answer("y8-pyth-trip-m6", "Do sides 11, 60, 61 form a Pythagorean triple? Enter yes or no.", "11^2+60^2=121+3600=3721=61^2", "yes", "121 plus 3600 equals 3721 which equals 61 squared.", ["Yes", "YES"]),
    choice("y8-pyth-trip-m7", "A right triangle has shorter sides 16 and 12. Which triple family does this belong to?", "A", ["3-4-5 scaled by 4", "5-12-13 scaled by 2", "8-15-17 scaled by 2", "7-24-25 scaled by 2"], "12 and 16 are 3 and 4 scaled by 4."),
    answer("y8-pyth-trip-m8", "Find the hypotenuse for shorter sides 16 m and 12 m.", "16\\text{ m, }12\\text{ m}", "20", "3-4-5 scaled by 4 gives hypotenuse 20.", ["20 m"]),
    answer("y8-pyth-trip-m9", "A right triangle has hypotenuse 34 and one shorter side 16. Find the other shorter side.", "\\text{hypotenuse }34,\\text{ shorter }16", "30", "8-15-17 scaled by 2 gives 16-30-34.", ["30 m", "30"]),
    choice("y8-pyth-trip-m10", "Why can Pythagorean triples be used to give exact answers?", "C", ["They always produce decimals", "They follow a different theorem", "The three values satisfy the theorem exactly as whole numbers", "They only work with metric units"], "Whole-number triples produce exact integer answers without rounding."),
  ],
};

// ── Lesson 6: Distance between two points ────────────────────────────────────

const distanceBetweenPoints: LessonContent = {
  description:
    "Use Pythagoras' theorem to find the straight-line distance between two points on the Cartesian plane by treating the horizontal and vertical separations as the shorter sides.",
  learningIntention:
    "Apply Pythagoras' theorem to coordinate geometry to calculate the distance between two points.",
  successCriteria: [
    "Find the horizontal separation (Δx) and vertical separation (Δy) between two points.",
    "Recognise Δx and Δy as the shorter sides of a right-angled triangle.",
    "Apply Pythagoras' theorem to calculate the distance.",
    "Leave the answer exact when possible, or round as instructed.",
  ],
  teaching: {
    paragraphs: [
      "To find the straight-line distance between two points, draw a right-angled triangle by moving horizontally then vertically from one point to the other.",
      "The horizontal change (Δx) and vertical change (Δy) are the two shorter sides. The direct distance between the points is the hypotenuse.",
      "Use Pythagoras' theorem: distance equals the square root of Δx squared plus Δy squared. The sign of the change does not matter because you will square it.",
    ],
    latexBlocks: [
      "\\Delta x = x_2 - x_1,\\qquad \\Delta y = y_2 - y_1",
      "d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}",
    ],
  },
  workedExamples: [
    {
      title: "Distance between grid points",
      questionLatex: "\\text{Find the distance between }A(0,\\,0)\\text{ and }B(3,\\,4).",
      cartesianGraph: coordGraph(
        "Cartesian plane showing segment from A(0,0) to B(3,4).",
        { x: 0, y: 0, label: "A(0, 0)" },
        { x: 3, y: 4, label: "B(3, 4)" },
        { xMin: 0, xMax: 5, yMin: 0, yMax: 5, xStep: 1, yStep: 1 }
      ),
      steps: [
        { explanation: "Find the horizontal and vertical separations.", latex: "\\Delta x = 3,\\quad \\Delta y = 4" },
        { explanation: "Apply Pythagoras' theorem.", latex: "d = \\sqrt{3^2+4^2} = \\sqrt{9+16} = \\sqrt{25} = 5" },
      ],
      finalAnswerLatex: "5\\text{ units}",
    } as WorkedExample,
    {
      title: "Points not starting at the origin",
      questionLatex: "\\text{Find the distance between }P(1,\\,2)\\text{ and }Q(7,\\,10).",
      cartesianGraph: coordGraph(
        "Cartesian plane showing segment from P(1,2) to Q(7,10).",
        { x: 1, y: 2, label: "P(1, 2)" },
        { x: 7, y: 10, label: "Q(7, 10)" },
        { xMin: 0, xMax: 9, yMin: 0, yMax: 11, xStep: 1, yStep: 1 }
      ),
      steps: [
        { explanation: "Subtract coordinates to find the separations.", latex: "\\Delta x = 7-1 = 6,\\quad \\Delta y = 10-2 = 8" },
        { explanation: "Apply Pythagoras.", latex: "d = \\sqrt{6^2+8^2} = \\sqrt{36+64} = \\sqrt{100} = 10" },
      ],
      finalAnswerLatex: "10\\text{ units}",
    } as WorkedExample,
    {
      title: "Round a decimal distance",
      questionLatex: "\\text{Find the distance between }R(0,\\,0)\\text{ and }S(4,\\,6)\\text{. Round to 1 decimal place.}",
      steps: [
        { explanation: "Find the separations.", latex: "\\Delta x = 4,\\quad \\Delta y = 6" },
        { explanation: "Apply Pythagoras and round.", latex: "d = \\sqrt{16+36} = \\sqrt{52} \\approx 7.2" },
      ],
      finalAnswerLatex: "7.2\\text{ units}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-dist-g1", "Find the distance between (0, 0) and (5, 12) in units.", "\\Delta x=5,\\;\\Delta y=12", "13", "Square root of 25 plus 144 equals 13.", ["13 units"], undefined, coordGraph("Segment from (0,0) to (5,12).", { x: 0, y: 0, label: "A" }, { x: 5, y: 12, label: "B" }, { xMin: 0, xMax: 6, yMin: 0, yMax: 13, xStep: 1, yStep: 1 })),
    answer("y8-pyth-dist-g2", "Find the distance between (2, 1) and (5, 5) in units.", "\\Delta x=3,\\;\\Delta y=4", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
    choice("y8-pyth-dist-g3", "Two points are 8 units apart horizontally and 6 units apart vertically. What is the straight-line distance?", "A", ["10", "14", "100", "48"], "Square root of 64 plus 36 equals 10."),
    answer("y8-pyth-dist-g4", "Find the distance between (0, 0) and (4, 6) in units. Round to 1 decimal place.", "\\Delta x=4,\\;\\Delta y=6", "7.2", "Square root of 52 is approximately 7.2.", ["7.2 units"]),
  ],
  independentPractice: [
    answer("y8-pyth-dist-i1", "Find the distance between (1, 1) and (7, 9) in units.", "\\Delta x=6,\\;\\Delta y=8", "10", "Square root of 36 plus 64 equals 10.", ["10 units"]),
    answer("y8-pyth-dist-i2", "Find the distance between (3, 1) and (3, 8) in units.", "\\Delta x=0,\\;\\Delta y=7", "7", "The points are on the same vertical line. The distance is 7.", ["7 units"]),
    choice("y8-pyth-dist-i3", "Which formula finds the distance between two points?", "C", ["$\\Delta x + \\Delta y$", "$\\Delta x \\times \\Delta y$", "$\\sqrt{(\\Delta x)^2+(\\Delta y)^2}$", "$\\Delta x^2 + \\Delta y^2$"], "The square root of the sum of the squares of the separations."),
    answer("y8-pyth-dist-i4", "Find the distance between (1, 2) and (9, 17) in units.", "\\Delta x=8,\\;\\Delta y=15", "17", "Square root of 64 plus 225 equals 17.", ["17 units"]),
    answer("y8-pyth-dist-i5", "Find the distance between (2, 5) and (6, 8) in units. Round to 1 decimal place.", "\\Delta x=4,\\;\\Delta y=3", "5", "Square root of 16 plus 9 equals 5.", ["5 units"]),
  ],
  commonMistakes: [
    { mistake: "Adding Δx and Δy before squaring.", fix: "Square each separation first, then add, then take the square root." },
    { mistake: "Using only the horizontal or vertical separation.", fix: "Both Δx and Δy are needed as the two shorter sides of the right triangle." },
    { mistake: "Worrying about negative separations.", fix: "Squaring removes negatives: (−6)² = 36, the same as 6²." },
    { mistake: "Forgetting the square root at the end.", fix: "After adding the squared separations, take the square root to find the actual distance." },
  ],
  masteryQuiz: [
    answer("y8-pyth-dist-m1", "Find the distance between (0, 0) and (8, 6) in units.", "\\Delta x=8,\\;\\Delta y=6", "10", "Square root of 64 plus 36 equals 10.", ["10 units"]),
    answer("y8-pyth-dist-m2", "Find the distance between (1, 3) and (4, 7) in units.", "\\Delta x=3,\\;\\Delta y=4", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
    choice("y8-pyth-dist-m3", "Points A and B have Δx = 5 and Δy = 12. What is the distance AB?", "B", ["17", "13", "60", "169"], "Square root of 25 plus 144 equals 13."),
    answer("y8-pyth-dist-m4", "Find the distance between (−3, 0) and (0, 4) in units.", "\\Delta x=3,\\;\\Delta y=4", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
    answer("y8-pyth-dist-m5", "Find the distance between (2, 3) and (10, 18) in units.", "\\Delta x=8,\\;\\Delta y=15", "17", "Square root of 64 plus 225 equals 17.", ["17 units"]),
    choice("y8-pyth-dist-m6", "A student finds the distance from (0,0) to (6,8) by calculating 6 + 8 = 14. What is the correct answer?", "C", ["7", "100", "10", "14"], "Square root of 36 plus 64 equals 10."),
    answer("y8-pyth-dist-m7", "Find the distance between (0, 0) and (20, 21) in units.", "\\Delta x=20,\\;\\Delta y=21", "29", "Square root of 400 plus 441 equals 29.", ["29 units"]),
    answer("y8-pyth-dist-m8", "Find the distance between (3, 4) and (9, 12) in units.", "\\Delta x=6,\\;\\Delta y=8", "10", "Square root of 36 plus 64 equals 10.", ["10 units"]),
    choice("y8-pyth-dist-m9", "Why is the sign of Δx or Δy irrelevant for the distance calculation?", "A", ["Squaring makes any value positive", "Distance is always negative", "Subtraction removes the sign", "Only positive coordinates are used"], "Squaring converts negatives to positives."),
    answer("y8-pyth-dist-m10", "Find the distance between (1, 1) and (4, 5) in units.", "\\Delta x=3,\\;\\Delta y=4", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "right-angled-triangles-pythagoras": introTheorem,
  "finding-the-hypotenuse":            findingHypotenuse,
  "finding-a-shorter-side":            findingShorterSide,
  "pythagoras-real-contexts":          realContexts,
  "pythagorean-triples":               pythagoreanTriples,
  "distance-between-two-points":       distanceBetweenPoints,
};

export function year8PythagorasTheoremLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" ||
    unit.slug !== "pythagoras-theorem"
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
