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
import type { CartesianGraph } from "../types";

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
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Substitute values carefully and show each step of working.",
    explanation,
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
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read each option carefully and eliminate those that don't fit.",
    explanation,
    cartesianGraph,
  };
}

function ptGraph(description: string, x: number, y: number): CartesianGraph {
  const lim = Math.max(6, Math.abs(x) + 2, Math.abs(y) + 2);
  return {
    description,
    xMin: -lim,
    xMax: lim,
    yMin: -lim,
    yMax: lim,
    xStep: 1,
    yStep: 1,
    points: [{ x, y, label: `(${x}, ${y})` }],
  };
}

function lineGraph(
  description: string,
  m: number,
  b: number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  xStep = 1,
  yStep = 1,
  highlightPoints?: { x: number; y: number }[]
): CartesianGraph {
  return {
    description,
    xMin,
    xMax,
    yMin,
    yMax,
    xStep,
    yStep,
    lines: [{ kind: "linear", m, b }],
    ...(highlightPoints?.length
      ? { points: highlightPoints.map((p) => ({ x: p.x, y: p.y, label: `(${p.x}, ${p.y})` })) }
      : {}),
  };
}

// ── Lesson 1: Number Patterns and Rules ──────────────────────────────────────

const numberPatternsAndRules: LessonContent = {
  description:
    "Identify the common difference in number patterns, extend sequences, and write rules of the form T = mn + c to describe linear patterns.",
  learningIntention:
    "Find the rule for a linear number pattern and use it to calculate any term.",
  successCriteria: [
    "Identify the common difference between consecutive terms of a linear pattern.",
    "Write a rule of the form T = mn + c for a given pattern.",
    "Use a rule to find the value of any term.",
    "Find the position n given the term value T.",
  ],
  teaching: {
    paragraphs: [
      "A number pattern (or sequence) is a list of numbers that follow a rule. In a linear pattern, the same amount is added or subtracted each time. This constant amount is called the common difference.",
      "To write a rule, use the position number n (1st term, 2nd term, etc.) and find what you multiply n by and what you add or subtract. The rule has the form T = mn + c, where m is the common difference and c is found by substituting n = 1 and solving.",
      "Once you have the rule, you can find any term by substituting n. You can also work backwards: if you know the term T, substitute into the rule and solve for n.",
    ],
    latexBlocks: [
      "\\text{Rule: } T = mn + c",
      "\\text{where }m\\text{ = common difference, }c\\text{ = constant}",
      "\\text{e.g. for }4, 7, 10, 13, \\ldots \\Rightarrow T = 3n + 1",
    ],
  },
  workedExamples: [
    {
      title: "Extend a pattern and find the common difference",
      questionLatex:
        "\\text{Pattern: }5,\\; 8,\\; 11,\\; 14,\\; \\ldots\\text{ Find the next two terms.}",
      steps: [
        {
          explanation: "Find the common difference: subtract consecutive terms.",
          latex: "8 - 5 = 3,\\quad 11 - 8 = 3",
        },
        {
          explanation: "Add the common difference to the last known term.",
          latex: "14 + 3 = 17,\\quad 17 + 3 = 20",
        },
      ],
      finalAnswerLatex: "17,\\; 20",
    } as WorkedExample,
    {
      title: "Write a rule from a table",
      questionLatex:
        "\\text{Table: }n=1\\to4,\\; n=2\\to7,\\; n=3\\to10.\\text{ Write the rule.}",
      steps: [
        {
          explanation: "Common difference = 7 − 4 = 3, so m = 3.",
          latex: "T = 3n + c",
        },
        {
          explanation: "Substitute n = 1, T = 4 to find c.",
          latex: "4 = 3(1) + c \\Rightarrow c = 1",
        },
        {
          explanation: "Check: n = 2 → 3(2) + 1 = 7 ✓, n = 3 → 3(3) + 1 = 10 ✓",
          latex: "T = 3n + 1",
        },
      ],
      finalAnswerLatex: "T = 3n + 1",
    } as WorkedExample,
    {
      title: "Find n given a term value",
      questionLatex: "\\text{Rule: }T = 4n - 2.\\text{ For which }n\\text{ is }T = 26?",
      steps: [
        {
          explanation: "Substitute T = 26 into the rule.",
          latex: "4n - 2 = 26",
        },
        {
          explanation: "Solve the equation.",
          latex: "4n = 28 \\Rightarrow n = 7",
        },
      ],
      finalAnswerLatex: "n = 7",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-lin-pat-g1",
      "What is the next term in the pattern 5, 8, 11, 14, …?",
      "A",
      ["17", "16", "18", "20"],
      "Common difference is 3. The next term is 14 + 3 = 17."
    ),
    answer(
      "y8-lin-pat-g2",
      "Rule: T = 3n + 1. Find T when n = 6.",
      "T = 3(6) + 1",
      "19",
      "T = 3 × 6 + 1 = 18 + 1 = 19."
    ),
    answer(
      "y8-lin-pat-g3",
      "Rule: T = 3n + 3. Find the 10th term.",
      "T = 3(10) + 3",
      "33",
      "T = 3 × 10 + 3 = 30 + 3 = 33."
    ),
    choice(
      "y8-lin-pat-g4",
      "Which rule matches the table: n = 1 → 4, n = 2 → 6, n = 3 → 8?",
      "B",
      ["T = 2n", "T = 2n + 2", "T = 3n + 1", "T = 2n − 1"],
      "Check T = 2n + 2: n = 1 → 4 ✓, n = 2 → 6 ✓, n = 3 → 8 ✓."
    ),
  ],
  independentPractice: [
    answer(
      "y8-lin-pat-i1",
      "Pattern: 7, 10, 13, 16, … Find the 6th term.",
      "\\text{common difference }= 3,\\; T_6 = 7 + 5 \\times 3",
      "22",
      "The 6th term is 7 + 5 × 3 = 7 + 15 = 22."
    ),
    answer(
      "y8-lin-pat-i2",
      "Rule: T = 5n − 3. Find T when n = 8.",
      "T = 5(8) - 3",
      "37",
      "T = 5 × 8 − 3 = 40 − 3 = 37."
    ),
    choice(
      "y8-lin-pat-i3",
      "What is the common difference of the pattern 3, 8, 13, 18, …?",
      "B",
      ["3", "5", "8", "4"],
      "8 − 3 = 5, 13 − 8 = 5, 18 − 13 = 5. The common difference is 5."
    ),
    answer(
      "y8-lin-pat-i4",
      "Rule: T = 2n + 7. For which value of n is T = 21?",
      "2n + 7 = 21",
      "7",
      "2n = 21 − 7 = 14, so n = 7."
    ),
    answer(
      "y8-lin-pat-i5",
      "Pattern: 100, 94, 88, 82, … Find the next term.",
      "\\text{common difference }= -6",
      "76",
      "The common difference is −6. The next term is 82 − 6 = 76."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the term value as the position number.",
      fix: "n is the position (1st, 2nd, 3rd, …). T is the value at that position. Keep them separate.",
    },
    {
      mistake: "Finding the wrong common difference by subtracting in the wrong direction.",
      fix: "Subtract the earlier term from the later term: difference = T₂ − T₁.",
    },
    {
      mistake: "Writing T = mn without checking the constant c.",
      fix: "Substitute n = 1 into T = mn + c and compare with the first term to find c.",
    },
    {
      mistake: "Treating a non-linear pattern (like 1, 4, 9, 16) as linear.",
      fix: "Check that the differences are constant. If not, the pattern is not linear.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-lin-pat-m1",
      "Pattern: 4, 7, 10, 13, … Find the next term.",
      "\\text{common difference }= 3",
      "16",
      "13 + 3 = 16."
    ),
    answer(
      "y8-lin-pat-m2",
      "Rule: T = 6n − 4. Find T when n = 5.",
      "T = 6(5) - 4",
      "26",
      "T = 30 − 4 = 26."
    ),
    answer(
      "y8-lin-pat-m3",
      "Table: n = 1 → 3, n = 2 → 5, n = 3 → 7. Rule is T = 2n + 1. Find the 10th term.",
      "T = 2(10) + 1",
      "21",
      "T = 20 + 1 = 21."
    ),
    choice(
      "y8-lin-pat-m4",
      "Which sequence has a common difference of 4?",
      "B",
      ["2, 5, 8, 11", "3, 7, 11, 15", "5, 9, 14, 20", "1, 4, 8, 12"],
      "7 − 3 = 4, 11 − 7 = 4, 15 − 11 = 4. Only option B has a constant difference of 4."
    ),
    answer(
      "y8-lin-pat-m5",
      "Rule: T = 4n − 1. Find T when n = 12.",
      "T = 4(12) - 1",
      "47",
      "T = 48 − 1 = 47."
    ),
    answer(
      "y8-lin-pat-m6",
      "Rule: T = 3n + 5. For which n is T = 29?",
      "3n + 5 = 29",
      "8",
      "3n = 24, so n = 8."
    ),
    choice(
      "y8-lin-pat-m7",
      "What is the 10th term of the pattern with rule T = 5n + 2?",
      "B",
      ["50", "52", "47", "55"],
      "T = 5 × 10 + 2 = 50 + 2 = 52."
    ),
    answer(
      "y8-lin-pat-m8",
      "Pattern: 50, 44, 38, 32, … Find the 5th term.",
      "\\text{common difference }= -6",
      "26",
      "32 − 6 = 26."
    ),
    answer(
      "y8-lin-pat-m9",
      "Rule: T = 4n + 3. Find T when n = 9.",
      "T = 4(9) + 3",
      "39",
      "T = 36 + 3 = 39."
    ),
    choice(
      "y8-lin-pat-m10",
      "Rule: T = 7n − 2. What is the 4th term?",
      "B",
      ["24", "26", "28", "30"],
      "T = 7 × 4 − 2 = 28 − 2 = 26."
    ),
  ],
};

// ── Lesson 2: Coordinates and Points ─────────────────────────────────────────

const coordinatesAndPoints: LessonContent = {
  description:
    "Read and plot points on the Cartesian plane, identify x- and y-coordinates, locate points on the axes, and name the quadrant a point lies in.",
  learningIntention:
    "Read and plot coordinates correctly on the Cartesian plane and identify their quadrant.",
  successCriteria: [
    "Read the x-coordinate (horizontal) and y-coordinate (vertical) of a plotted point.",
    "Identify which quadrant a point belongs to based on the signs of its coordinates.",
    "State that points on the x-axis have y = 0 and points on the y-axis have x = 0.",
    "State that the origin has coordinates (0, 0).",
  ],
  teaching: {
    paragraphs: [
      "The Cartesian plane is formed by two perpendicular number lines: the horizontal x-axis and the vertical y-axis. They meet at the origin (0, 0). Every point on the plane is described by an ordered pair (x, y).",
      "To read a point, move from the origin: the x-coordinate tells you how far to move left or right; the y-coordinate tells you how far to move up or down. Always write x first, then y.",
      "The plane is divided into four quadrants. Quadrant I has both coordinates positive (+, +). Quadrant II has a negative x and positive y (−, +). Quadrant III has both negative (−, −). Quadrant IV has positive x and negative y (+, −).",
    ],
    latexBlocks: [
      "\\text{Point }(x,\\, y):\\; x\\text{ first (horizontal), }y\\text{ second (vertical)}",
      "\\text{Quadrant I: }(+,+),\\quad \\text{II: }(-,+),\\quad \\text{III: }(-,-),\\quad \\text{IV: }(+,-)",
      "\\text{On x-axis: }y=0.\\quad\\text{On y-axis: }x=0.",
    ],
  },
  workedExamples: [
    {
      title: "Read the coordinates of a point",
      questionLatex:
        "\\text{A point is 3 units right and 5 units up from the origin. Write its coordinates.}",
      steps: [
        {
          explanation: "Right means positive x; up means positive y.",
          latex: "x = 3,\\quad y = 5",
        },
      ],
      finalAnswerLatex: "(3,\\; 5)",
    } as WorkedExample,
    {
      title: "Identify the quadrant",
      questionLatex: "\\text{State the quadrant for the point }(-4,\\; 2).",
      steps: [
        {
          explanation: "x is negative and y is positive.",
          latex: "x < 0,\\quad y > 0 \\Rightarrow \\text{Quadrant II}",
        },
      ],
      finalAnswerLatex: "\\text{Quadrant II}",
    } as WorkedExample,
    {
      title: "Locate a point on an axis",
      questionLatex:
        "\\text{Describe the position of the point }(0,\\; -6).",
      steps: [
        {
          explanation: "x = 0 means the point is on the y-axis.",
          latex: "x = 0 \\Rightarrow \\text{on the y-axis, 6 units below the origin}",
        },
      ],
      finalAnswerLatex: "\\text{On the y-axis at }(0,\\;-6)",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-lin-coo-g1",
      "The point (4, −3) is in which quadrant?",
      "D",
      ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      "x is positive and y is negative → Quadrant IV (+, −).",
      "\\text{Select A, B, C or D.}",
      ptGraph("Point (4, −3) plotted on the Cartesian plane", 4, -3)
    ),
    answer(
      "y8-lin-coo-g2",
      "What is the x-coordinate of the point (7, −2)?",
      "(7,\\; -2)",
      "7",
      "The x-coordinate is always the first number in the pair. It is 7.",
      [],
      ptGraph("Point (7, −2) plotted on the Cartesian plane", 7, -2)
    ),
    answer(
      "y8-lin-coo-g3",
      "What is the y-coordinate of the point (−3, 5)?",
      "(-3,\\; 5)",
      "5",
      "The y-coordinate is the second number in the pair. It is 5.",
      [],
      ptGraph("Point (−3, 5) plotted on the Cartesian plane", -3, 5)
    ),
    choice(
      "y8-lin-coo-g4",
      "What are the coordinates of the origin?",
      "A",
      ["(0, 0)", "(1, 1)", "(0, 1)", "(1, 0)"],
      "The origin is where the x-axis and y-axis meet. Its coordinates are (0, 0)."
    ),
  ],
  independentPractice: [
    answer(
      "y8-lin-coo-i1",
      "A point is 4 units right of the origin and 3 units below. What is its x-coordinate?",
      "\\text{right }4\\text{ units, down }3\\text{ units}",
      "4",
      "Right means positive x. The x-coordinate is 4. The full point is (4, −3)."
    ),
    answer(
      "y8-lin-coo-i2",
      "Points A(2, 5) and B(2, −3) both have the same x-coordinate. What is it?",
      "x_A = x_B",
      "2",
      "Both points have x = 2. They lie on the same vertical line x = 2."
    ),
    choice(
      "y8-lin-coo-i3",
      "Which point lies on the x-axis?",
      "B",
      ["(0, 3)", "(3, 0)", "(3, 3)", "(−3, −3)"],
      "A point on the x-axis has y = 0. Only (3, 0) satisfies y = 0."
    ),
    answer(
      "y8-lin-coo-i4",
      "A point lies on the y-axis. What is its x-coordinate?",
      "\\text{y-axis: }x = ?",
      "0",
      "Every point on the y-axis has x = 0."
    ),
    answer(
      "y8-lin-coo-i5",
      "What is the y-coordinate of the midpoint of (0, 0) and (0, 6)?",
      "\\text{midpoint y} = \\frac{0 + 6}{2}",
      "3",
      "The midpoint is halfway: (0 + 6) ÷ 2 = 3. The midpoint is (0, 3)."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing coordinates in the wrong order as (y, x) instead of (x, y).",
      fix: "Always write x first (horizontal), then y (vertical). Think: 'across before up'.",
    },
    {
      mistake: "Confusing Quadrant II (−, +) and Quadrant IV (+, −).",
      fix: "Draw the quadrant diagram: II is top-left (negative x, positive y). IV is bottom-right (positive x, negative y).",
    },
    {
      mistake: "Thinking a point on the y-axis must have y = 0.",
      fix: "A point on the y-axis has x = 0 (it sits on the vertical axis). A point on the x-axis has y = 0.",
    },
    {
      mistake: "Mixing up the x-coordinate and y-coordinate when reading a point.",
      fix: "Start at the origin. Move horizontally to find x, then vertically to find y.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-lin-coo-m1",
      "What is the y-coordinate of the point (−5, 2)?",
      "(-5,\\; 2)",
      "2",
      "The y-coordinate is the second number in the pair. It is 2."
    ),
    choice(
      "y8-lin-coo-m2",
      "In which quadrant are both coordinates negative?",
      "C",
      ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      "Both negative (−, −) → Quadrant III (bottom-left)."
    ),
    answer(
      "y8-lin-coo-m3",
      "What is the distance along the y-axis from (0, 0) to (0, 8)?",
      "(0,0)\\text{ to }(0,8)",
      "8",
      "Both points are on the y-axis. The distance is |8 − 0| = 8 units."
    ),
    answer(
      "y8-lin-coo-m4",
      "What is the x-coordinate of the point (−3, −4)?",
      "(-3,\\; -4)",
      "-3",
      "The x-coordinate is the first number: −3.",
      ["-3", "−3"]
    ),
    choice(
      "y8-lin-coo-m5",
      "Which point lies on the y-axis?",
      "B",
      ["(5, 0)", "(0, −4)", "(3, 4)", "(−2, −2)"],
      "A point on the y-axis has x = 0. Only (0, −4) has x = 0."
    ),
    answer(
      "y8-lin-coo-m6",
      "The point (x, 0) lies on which axis? Enter 'x-axis' or 'y-axis'.",
      "y = 0",
      "x-axis",
      "When y = 0, the point lies on the horizontal x-axis.",
      ["x-axis", "X-axis", "the x-axis"]
    ),
    answer(
      "y8-lin-coo-m7",
      "A point is 6 units left of the origin on the x-axis. What is its x-coordinate?",
      "\\text{left of origin: } x < 0",
      "-6",
      "Left of the origin means negative x. The x-coordinate is −6.",
      ["-6", "−6"]
    ),
    choice(
      "y8-lin-coo-m8",
      "A point is in Quadrant II. Which statement about its coordinates is correct?",
      "B",
      [
        "Both coordinates are positive.",
        "x is negative and y is positive.",
        "x is positive and y is negative.",
        "Both coordinates are negative.",
      ],
      "Quadrant II is the top-left region: x < 0 and y > 0."
    ),
    answer(
      "y8-lin-coo-m9",
      "A point lies on the y-axis. What is its x-coordinate?",
      "\\text{y-axis: } x = ?",
      "0",
      "Every point on the y-axis has x = 0."
    ),
    choice(
      "y8-lin-coo-m10",
      "The point (5, 5) lies in which quadrant?",
      "A",
      ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      "Both coordinates are positive → Quadrant I."
    ),
  ],
};

// ── Lesson 3: Tables of Values ────────────────────────────────────────────────

const tablesOfValues: LessonContent = {
  description:
    "Complete tables of values for linear rules of the form y = mx + c, identify the constant difference in output values, and determine a rule from a table.",
  learningIntention:
    "Complete a table of values from a rule and find the rule that matches a given table.",
  successCriteria: [
    "Substitute x-values into a rule of the form y = mx + c to complete a table.",
    "Recognise that a linear rule produces a constant difference in y-values.",
    "Find the gradient m and y-intercept c from a table of values.",
    "Solve a linear equation to find the input x for a given output y.",
  ],
  teaching: {
    paragraphs: [
      "A table of values lists input (x) and output (y) pairs for a rule. To complete a table, substitute each x-value into the rule and calculate y.",
      "For a linear rule y = mx + c, the y-values increase by the same amount m each time x increases by 1. This constant increase is the gradient. If the table has equal x-steps, look for the constant difference in y to find m.",
      "To find c, substitute any known (x, y) pair into y = mx + c and solve. Then check the rule against at least one other pair in the table.",
    ],
    latexBlocks: [
      "\\text{Rule: } y = mx + c",
      "\\text{e.g. }y = 3x - 2:\\; x=0\\to-2,\\; x=1\\to1,\\; x=2\\to4",
      "\\text{Constant difference in }y = m\\text{ (gradient)}",
    ],
  },
  workedExamples: [
    {
      title: "Complete a table from a rule",
      questionLatex:
        "\\text{Rule: }y = 2x + 3.\\text{ Complete the table for }x = 0, 1, 2, 3.",
      steps: [
        {
          explanation: "Substitute each x into y = 2x + 3.",
          latex: "x=0\\!:\\; 2(0)+3=3,\\quad x=1\\!:\\; 2(1)+3=5",
        },
        {
          explanation: "Continue for x = 2 and x = 3.",
          latex: "x=2\\!:\\; 7,\\quad x=3\\!:\\; 9",
        },
      ],
      finalAnswerLatex: "3,\\; 5,\\; 7,\\; 9",
    } as WorkedExample,
    {
      title: "Find the rule from a table",
      questionLatex:
        "\\text{Table: }x=1\\to9,\\; x=2\\to13,\\; x=3\\to17.\\text{ Find the rule.}",
      steps: [
        {
          explanation: "Constant difference: 13 − 9 = 4, so m = 4.",
          latex: "y = 4x + c",
        },
        {
          explanation: "Substitute x = 1, y = 9 to find c.",
          latex: "9 = 4(1) + c \\Rightarrow c = 5",
        },
        {
          explanation: "Check: x = 2 → 4(2) + 5 = 13 ✓",
          latex: "y = 4x + 5",
        },
      ],
      finalAnswerLatex: "y = 4x + 5",
    } as WorkedExample,
    {
      title: "Find the input given the output",
      questionLatex:
        "\\text{Rule: }y = 2x + 1.\\text{ For which }x\\text{ is }y = 15?",
      steps: [
        {
          explanation: "Substitute y = 15.",
          latex: "15 = 2x + 1",
        },
        {
          explanation: "Solve.",
          latex: "2x = 14 \\Rightarrow x = 7",
        },
      ],
      finalAnswerLatex: "x = 7",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-lin-tab-g1",
      "Rule: y = 2x + 1. Find y when x = 3.",
      "y = 2(3) + 1",
      "7",
      "y = 6 + 1 = 7."
    ),
    answer(
      "y8-lin-tab-g2",
      "Rule: y = 3x − 2. Find y when x = 4.",
      "y = 3(4) - 2",
      "10",
      "y = 12 − 2 = 10."
    ),
    choice(
      "y8-lin-tab-g3",
      "Which rule matches the table: x = 0 → 5, x = 1 → 7, x = 2 → 9?",
      "B",
      ["y = 2x + 3", "y = 2x + 5", "y = 3x + 2", "y = x + 5"],
      "Check y = 2x + 5: x = 0 → 5 ✓, x = 1 → 7 ✓, x = 2 → 9 ✓."
    ),
    answer(
      "y8-lin-tab-g4",
      "Rule: y = 5x + 3. Find y when x = 0.",
      "y = 5(0) + 3",
      "3",
      "y = 0 + 3 = 3. Substituting x = 0 always gives the y-intercept c."
    ),
  ],
  independentPractice: [
    answer(
      "y8-lin-tab-i1",
      "Rule: y = 4x − 1. Find y when x = 5.",
      "y = 4(5) - 1",
      "19",
      "y = 20 − 1 = 19."
    ),
    answer(
      "y8-lin-tab-i2",
      "Rule: y = −2x + 8. Find y when x = 3.",
      "y = -2(3) + 8",
      "2",
      "y = −6 + 8 = 2.",
      ["2"]
    ),
    choice(
      "y8-lin-tab-i3",
      "Table: x = 1 → 9, x = 2 → 13, x = 3 → 17. Which rule matches?",
      "A",
      ["y = 4x + 5", "y = 3x + 6", "y = 5x + 4", "y = 4x + 3"],
      "Constant difference = 4, so m = 4. Substituting x = 1, y = 9: 9 = 4 + c → c = 5. Rule: y = 4x + 5."
    ),
    answer(
      "y8-lin-tab-i4",
      "Rule: y = x + 6. Find y when x = 14.",
      "y = 14 + 6",
      "20",
      "y = 14 + 6 = 20."
    ),
    answer(
      "y8-lin-tab-i5",
      "Rule: y = 3x. Find y when x = 7.",
      "y = 3(7)",
      "21",
      "y = 3 × 7 = 21."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Multiplying by x before adding c, but then not adding c at all.",
      fix: "Work through the rule in full: substitute x, multiply, then add or subtract c.",
    },
    {
      mistake: "Reading the constant difference as the y-intercept.",
      fix: "The constant difference between y-values gives m (gradient), not c. Find c by substituting a point.",
    },
    {
      mistake: "Choosing the wrong rule because only one pair is checked.",
      fix: "Always verify the rule against at least two pairs in the table.",
    },
    {
      mistake: "Forgetting to change the sign when moving c to the other side of the equation.",
      fix: "Use inverse operations: if the rule is y = 2x + 1 and y = 15, subtract 1 first: 2x = 14.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-lin-tab-m1",
      "Rule: y = 2x + 4. Find y when x = 6.",
      "y = 2(6) + 4",
      "16",
      "y = 12 + 4 = 16."
    ),
    answer(
      "y8-lin-tab-m2",
      "Table: x = 0 → 3, x = 1 → 5, x = 2 → 7, x = 3 → 9. What is the constant difference in y?",
      "5 - 3 = 2,\\; 7 - 5 = 2",
      "2",
      "Each y increases by 2 as x increases by 1. The constant difference is 2."
    ),
    answer(
      "y8-lin-tab-m3",
      "Rule: y = 6x − 5. Find y when x = 3.",
      "y = 6(3) - 5",
      "13",
      "y = 18 − 5 = 13."
    ),
    choice(
      "y8-lin-tab-m4",
      "Which rule gives y = 0 when x = 3?",
      "A",
      ["y = 2x − 6", "y = x + 3", "y = 3x + 1", "y = 2x − 3"],
      "Check A: y = 2(3) − 6 = 0 ✓. Option D gives y = 6 − 3 = 3, not 0."
    ),
    answer(
      "y8-lin-tab-m5",
      "Rule: y = −x + 10. Find y when x = 7.",
      "y = -(7) + 10",
      "3",
      "y = −7 + 10 = 3."
    ),
    answer(
      "y8-lin-tab-m6",
      "Rule: y = 2x + 1. For which x is y = 15?",
      "2x + 1 = 15",
      "7",
      "2x = 14, so x = 7."
    ),
    choice(
      "y8-lin-tab-m7",
      "Table: x = 0 → 0, x = 1 → 3, x = 2 → 6, x = 3 → 9. Which rule fits?",
      "B",
      ["y = 2x", "y = 3x", "y = x + 3", "y = 4x − 1"],
      "Check y = 3x: x = 0 → 0 ✓, x = 1 → 3 ✓, x = 2 → 6 ✓."
    ),
    answer(
      "y8-lin-tab-m8",
      "Rule: y = 10x − 3. Find y when x = 4.",
      "y = 10(4) - 3",
      "37",
      "y = 40 − 3 = 37."
    ),
    answer(
      "y8-lin-tab-m9",
      "Rule: y = 5x + 1. Find y when x = 8.",
      "y = 5(8) + 1",
      "41",
      "y = 40 + 1 = 41."
    ),
    choice(
      "y8-lin-tab-m10",
      "Table: x = 5 → 10, x = 10 → 20, x = 15 → 30. Which rule matches?",
      "B",
      ["y = 3x − 5", "y = 2x", "y = x + 5", "y = 2x + 2"],
      "Check y = 2x: x = 5 → 10 ✓, x = 10 → 20 ✓, x = 15 → 30 ✓."
    ),
  ],
};

// ── Lesson 4: Graphing Linear Relationships ───────────────────────────────────

const graphingLinearRelationships: LessonContent = {
  description:
    "Plot linear relationships from tables of values, recognise that the graph is a straight line, and identify the y-intercept and x-intercept of a linear graph.",
  learningIntention:
    "Plot a linear relationship from a table of values and identify key features of the graph.",
  successCriteria: [
    "Complete a table of values and plot the points on the Cartesian plane.",
    "Recognise that points from a linear rule lie on a straight line.",
    "Find the y-intercept by substituting x = 0 into the rule.",
    "Find the x-intercept by substituting y = 0 and solving.",
  ],
  teaching: {
    paragraphs: [
      "A linear relationship produces a straight-line graph when plotted on the Cartesian plane. To draw the graph, complete a table of values, plot each (x, y) point, then draw a line through them.",
      "The y-intercept is where the graph crosses the y-axis. It occurs when x = 0. Substitute x = 0 into the rule to find the y-intercept, which always equals the constant c in y = mx + c.",
      "The x-intercept is where the graph crosses the x-axis. It occurs when y = 0. Substitute y = 0 into the rule and solve for x.",
    ],
    latexBlocks: [
      "\\text{y-intercept: let }x=0 \\Rightarrow y = c",
      "\\text{x-intercept: let }y=0\\text{ and solve for }x",
      "\\text{Two points are enough to draw the line; a third point checks accuracy.}",
    ],
  },
  workedExamples: [
    {
      title: "Find the y-intercept",
      questionLatex: "\\text{Find the y-intercept of }y = 3x + 4.",
      steps: [
        {
          explanation: "Substitute x = 0.",
          latex: "y = 3(0) + 4 = 4",
        },
      ],
      finalAnswerLatex: "\\text{y-intercept: }(0,\\; 4)",
    } as WorkedExample,
    {
      title: "Find the x-intercept",
      questionLatex: "\\text{Find the x-intercept of }y = 2x - 6.",
      steps: [
        {
          explanation: "Let y = 0 and solve for x.",
          latex: "0 = 2x - 6",
        },
        {
          explanation: "Solve.",
          latex: "2x = 6 \\Rightarrow x = 3",
        },
      ],
      finalAnswerLatex: "\\text{x-intercept: }(3,\\; 0)",
    } as WorkedExample,
    {
      title: "Check whether a point is on the line",
      questionLatex:
        "\\text{Is the point }(2,\\; 7)\\text{ on the line }y = 3x + 1?",
      steps: [
        {
          explanation: "Substitute x = 2 into the rule.",
          latex: "y = 3(2) + 1 = 7",
        },
        {
          explanation: "The calculated y equals the given y.",
          latex: "7 = 7 \\Rightarrow \\text{yes, the point is on the line}",
        },
      ],
      finalAnswerLatex: "\\text{Yes. }(2, 7)\\text{ lies on }y = 3x + 1.",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-lin-gra-g1",
      "What shape is the graph of a linear relationship?",
      "B",
      ["A curved line", "A straight line", "A circle", "A zigzag"],
      "A linear relationship produces a straight-line graph — that is why it is called 'linear'."
    ),
    answer(
      "y8-lin-gra-g2",
      "Rule: y = x + 2. Find y when x = 0 (the y-intercept).",
      "y = 0 + 2",
      "2",
      "The y-intercept is y = 2. The graph crosses the y-axis at (0, 2).",
      [],
      lineGraph("Graph of y = x + 2", 1, 2, -4, 4, -3, 7)
    ),
    answer(
      "y8-lin-gra-g3",
      "Rule: y = 2x − 1. Find y when x = 3.",
      "y = 2(3) - 1",
      "5",
      "y = 6 − 1 = 5. The point (3, 5) is on the line.",
      [],
      lineGraph("Graph of y = 2x − 1", 2, -1, -3, 5, -7, 9, 1, 1, [{ x: 3, y: 5 }])
    ),
    choice(
      "y8-lin-gra-g4",
      "Where does the graph of y = 3x + 4 cross the y-axis?",
      "B",
      ["(0, 3)", "(0, 4)", "(4, 0)", "(3, 4)"],
      "Set x = 0: y = 3(0) + 4 = 4. The y-intercept is (0, 4).",
      "\\text{Select A, B, C or D.}",
      lineGraph("Graph of y = 3x + 4", 3, 4, -3, 3, -6, 14, 1, 2)
    ),
  ],
  independentPractice: [
    answer(
      "y8-lin-gra-i1",
      "Rule: y = x − 3. Find the y-intercept (let x = 0).",
      "y = 0 - 3",
      "-3",
      "y = −3. The graph crosses the y-axis at (0, −3).",
      ["-3", "−3"],
      lineGraph("Graph of y = x − 3", 1, -3, -4, 5, -8, 3)
    ),
    answer(
      "y8-lin-gra-i2",
      "Rule: y = 2x + 5. Find y when x = −1.",
      "y = 2(-1) + 5",
      "3",
      "y = −2 + 5 = 3.",
      [],
      lineGraph("Graph of y = 2x + 5", 2, 5, -4, 3, -3, 12, 1, 1, [{ x: -1, y: 3 }])
    ),
    choice(
      "y8-lin-gra-i3",
      "Which statement about a linear relationship is NOT correct?",
      "C",
      [
        "Its graph is a straight line.",
        "It has a constant rate of change.",
        "Its graph is always a parabola.",
        "Values can be found using a table.",
      ],
      "A linear relationship produces a straight line, not a parabola. Parabolas come from quadratic rules."
    ),
    answer(
      "y8-lin-gra-i4",
      "Rule: y = 4x. Find y when x = 0.",
      "y = 4(0)",
      "0",
      "y = 0. The graph passes through the origin (0, 0)."
    ),
    answer(
      "y8-lin-gra-i5",
      "Find the y-intercept of y = 3x + 7.",
      "\\text{let }x = 0:\\; y = 3(0) + 7",
      "7",
      "The y-intercept is 7. The graph crosses the y-axis at (0, 7)."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Plotting (y, x) instead of (x, y) when drawing the graph.",
      fix: "Always plot the x-coordinate on the horizontal axis and the y-coordinate on the vertical axis.",
    },
    {
      mistake: "Thinking the y-intercept is the coefficient of x (m) instead of the constant (c).",
      fix: "The y-intercept is found by substituting x = 0, which gives y = c.",
    },
    {
      mistake: "Only plotting two points and assuming any line through them is correct.",
      fix: "Plot at least three points and check they are collinear before drawing the line.",
    },
    {
      mistake: "Confusing the x-intercept and y-intercept.",
      fix: "y-intercept: let x = 0 (where the line crosses the y-axis). x-intercept: let y = 0 (where the line crosses the x-axis).",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-lin-gra-m1",
      "Rule: y = 2x + 3. Find y when x = −2.",
      "y = 2(-2) + 3",
      "-1",
      "y = −4 + 3 = −1.",
      ["-1", "−1"]
    ),
    choice(
      "y8-lin-gra-m2",
      "A graph passes through (0, 5) and (1, 7). Which rule fits?",
      "B",
      ["y = x + 5", "y = 2x + 5", "y = 3x + 2", "y = 2x + 3"],
      "Check y = 2x + 5: x = 0 → 5 ✓, x = 1 → 7 ✓.",
      "\\text{Select A, B, C or D.}",
      {
        description: "Two points at (0, 5) and (1, 7) plotted on the Cartesian plane",
        xMin: -1,
        xMax: 3,
        yMin: 3,
        yMax: 9,
        xStep: 1,
        yStep: 1,
        points: [
          { x: 0, y: 5, label: "(0, 5)" },
          { x: 1, y: 7, label: "(1, 7)" },
        ],
      }
    ),
    answer(
      "y8-lin-gra-m3",
      "Find the x-intercept of y = x + 4 (let y = 0).",
      "0 = x + 4",
      "-4",
      "x = −4. The graph crosses the x-axis at (−4, 0).",
      ["-4", "−4"],
      lineGraph("Graph of y = x + 4", 1, 4, -6, 3, -3, 7)
    ),
    answer(
      "y8-lin-gra-m4",
      "Rule: y = 3x − 6. Find y when x = 2.",
      "y = 3(2) - 6",
      "0",
      "y = 6 − 6 = 0. The point (2, 0) is the x-intercept."
    ),
    choice(
      "y8-lin-gra-m5",
      "What is the y-intercept of y = −2x + 9?",
      "B",
      ["(0, −2)", "(0, 9)", "(9, 0)", "(−2, 0)"],
      "Set x = 0: y = −2(0) + 9 = 9. The y-intercept is (0, 9).",
      "\\text{Select A, B, C or D.}",
      lineGraph("Graph of y = −2x + 9", -2, 9, -1, 6, -3, 12, 1, 2)
    ),
    answer(
      "y8-lin-gra-m6",
      "Rule: y = 5x + 2. Find y when x = 4.",
      "y = 5(4) + 2",
      "22",
      "y = 20 + 2 = 22."
    ),
    answer(
      "y8-lin-gra-m7",
      "Rule: y = x. Find y when x = 7.",
      "y = 7",
      "7",
      "y = 7. The graph y = x passes through all points where y equals x."
    ),
    choice(
      "y8-lin-gra-m8",
      "How many points are needed to draw a straight line?",
      "B",
      ["1", "2", "3", "4"],
      "Two points define a unique straight line. A third point is used to verify accuracy."
    ),
    answer(
      "y8-lin-gra-m9",
      "Find the x-intercept of y = 2x − 4 (let y = 0).",
      "0 = 2x - 4",
      "2",
      "2x = 4, so x = 2. The x-intercept is (2, 0)."
    ),
    answer(
      "y8-lin-gra-m10",
      "Rule: y = −x + 8. Find y when x = 5.",
      "y = -(5) + 8",
      "3",
      "y = −5 + 8 = 3."
    ),
  ],
};

// ── Lesson 5: Gradient as Rate of Change ─────────────────────────────────────

const gradientAsRateOfChange: LessonContent = {
  description:
    "Calculate the gradient of a line using rise over run, interpret positive and negative gradients, and connect gradient to rates of change in practical contexts.",
  learningIntention:
    "Calculate gradient using rise ÷ run and interpret it as a rate of change.",
  successCriteria: [
    "Calculate gradient using the formula: gradient = rise ÷ run.",
    "Attach a negative sign to a gradient when the line falls from left to right.",
    "Find the gradient between two given points.",
    "Interpret gradient as a rate of change in a practical context.",
  ],
  teaching: {
    paragraphs: [
      "The gradient of a line measures its steepness. A steeper line has a larger gradient. Gradient is calculated as rise ÷ run: the vertical change divided by the horizontal change.",
      "A line that rises from left to right has a positive gradient. A line that falls from left to right has a negative gradient. A horizontal line has gradient 0.",
      "In practical situations, the gradient represents a rate of change. For example, on a distance-time graph, gradient gives speed (km/h). On a cost graph, gradient gives cost per item.",
    ],
    latexBlocks: [
      "\\text{gradient} = \\frac{\\text{rise}}{\\text{run}} = \\frac{\\text{vertical change}}{\\text{horizontal change}}",
      "\\text{From two points: gradient} = \\frac{y_2 - y_1}{x_2 - x_1}",
      "\\text{Positive gradient: rises left to right.}\\quad\\text{Negative: falls.}\\quad\\text{Zero: horizontal.}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate gradient from rise and run",
      questionLatex:
        "\\text{A line rises 8 units over a horizontal distance of 4 units. Find its gradient.}",
      steps: [
        {
          explanation: "Gradient = rise ÷ run.",
          latex: "\\text{gradient} = \\frac{8}{4} = 2",
        },
      ],
      finalAnswerLatex: "\\text{gradient} = 2",
    } as WorkedExample,
    {
      title: "Find gradient from two points",
      questionLatex:
        "\\text{Find the gradient of the line through }(1,\\; 2)\\text{ and }(3,\\; 8).",
      steps: [
        {
          explanation: "Rise = difference in y-values; run = difference in x-values.",
          latex: "\\text{rise} = 8 - 2 = 6,\\quad \\text{run} = 3 - 1 = 2",
        },
        {
          explanation: "Divide rise by run.",
          latex: "\\text{gradient} = \\frac{6}{2} = 3",
        },
      ],
      finalAnswerLatex: "\\text{gradient} = 3",
    } as WorkedExample,
    {
      title: "Interpret gradient in context",
      questionLatex:
        "\\text{A car travels 240 km in 4 hours. Find the gradient of the distance-time graph.}",
      steps: [
        {
          explanation: "Gradient = rise ÷ run = change in distance ÷ change in time.",
          latex: "\\text{gradient} = \\frac{240}{4} = 60",
        },
        {
          explanation: "The gradient equals the speed.",
          latex: "\\text{speed} = 60\\text{ km/h}",
        },
      ],
      finalAnswerLatex: "60\\text{ km/h}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-lin-grd-g1",
      "Gradient is calculated as…",
      "B",
      ["run ÷ rise", "rise ÷ run", "rise × run", "rise + run"],
      "Gradient = rise ÷ run (vertical change divided by horizontal change)."
    ),
    answer(
      "y8-lin-grd-g2",
      "A line rises 6 units for every 3 units it runs. Find the gradient.",
      "\\text{gradient} = \\frac{6}{3}",
      "2",
      "Gradient = 6 ÷ 3 = 2."
    ),
    answer(
      "y8-lin-grd-g3",
      "A line falls 4 units for every 2 units it runs. Find the gradient.",
      "\\text{gradient} = \\frac{-4}{2}",
      "-2",
      "A falling line has a negative gradient. Gradient = −4 ÷ 2 = −2.",
      ["-2", "−2"]
    ),
    choice(
      "y8-lin-grd-g4",
      "A line with a positive gradient…",
      "B",
      [
        "goes downhill from left to right",
        "goes uphill from left to right",
        "is horizontal",
        "is vertical",
      ],
      "A positive gradient means the line rises as you move from left to right."
    ),
  ],
  independentPractice: [
    answer(
      "y8-lin-grd-i1",
      "A line rises 6 units over a run of 2 units. Find the gradient.",
      "\\text{gradient} = \\frac{6}{2}",
      "3",
      "Gradient = 6 ÷ 2 = 3."
    ),
    answer(
      "y8-lin-grd-i2",
      "A line falls 10 units for every 5 units of run. Find the gradient.",
      "\\text{gradient} = \\frac{-10}{5}",
      "-2",
      "A falling line has a negative gradient. Gradient = −10 ÷ 5 = −2.",
      ["-2", "−2"]
    ),
    choice(
      "y8-lin-grd-i3",
      "Which line is steepest?",
      "B",
      ["gradient = 1", "gradient = −3", "gradient = 2", "gradient = −1"],
      "Steepness depends on the absolute value. |−3| = 3, which is the largest. The line with gradient −3 is steepest."
    ),
    answer(
      "y8-lin-grd-i4",
      "A car travels 200 km in 4 hours. What is the gradient of the distance-time graph in km/h?",
      "\\text{gradient} = \\frac{200}{4}",
      "50",
      "Gradient = 200 ÷ 4 = 50 km/h."
    ),
    answer(
      "y8-lin-grd-i5",
      "A line passes through (0, 0) and (4, 8). Find the gradient.",
      "\\text{gradient} = \\frac{8 - 0}{4 - 0}",
      "2",
      "Rise = 8, run = 4. Gradient = 8 ÷ 4 = 2."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing gradient as run ÷ rise instead of rise ÷ run.",
      fix: "Rise is the vertical change and run is the horizontal change. Gradient = rise ÷ run.",
    },
    {
      mistake: "Forgetting the negative sign when the line falls from left to right.",
      fix: "If the line falls, the rise is negative. Divide a negative rise by a positive run to get a negative gradient.",
    },
    {
      mistake: "Thinking a steeper line always has a larger positive gradient.",
      fix: "Steepness depends on absolute value. A gradient of −5 is steeper than a gradient of 3.",
    },
    {
      mistake: "Swapping the y-values when finding rise from two points.",
      fix: "Rise = y₂ − y₁ (second point minus first). Keep the order consistent for rise and run.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-lin-grd-m1",
      "Rise = 9, run = 3. Find the gradient.",
      "\\text{gradient} = \\frac{9}{3}",
      "3",
      "Gradient = 9 ÷ 3 = 3."
    ),
    choice(
      "y8-lin-grd-m2",
      "A horizontal line has gradient…",
      "D",
      ["1", "−1", "undefined", "0"],
      "A horizontal line has no rise, so gradient = 0 ÷ run = 0."
    ),
    answer(
      "y8-lin-grd-m3",
      "Find the gradient of the line through (1, 2) and (3, 8).",
      "\\text{gradient} = \\frac{8-2}{3-1}",
      "3",
      "Rise = 6, run = 2. Gradient = 6 ÷ 2 = 3."
    ),
    answer(
      "y8-lin-grd-m4",
      "Find the gradient of the line through (2, 5) and (6, 1).",
      "\\text{gradient} = \\frac{1-5}{6-2}",
      "-1",
      "Rise = 1 − 5 = −4, run = 6 − 2 = 4. Gradient = −4 ÷ 4 = −1.",
      ["-1", "−1"]
    ),
    choice(
      "y8-lin-grd-m5",
      "Which phrase best describes a line with gradient −2?",
      "B",
      [
        "Rises 2 units for every 1 unit of run",
        "Falls 2 units for every 1 unit of run",
        "Rises 1 unit for every 2 units of run",
        "Is horizontal",
      ],
      "Gradient = −2 means rise = −2 for run = 1: the line falls 2 units per unit of run."
    ),
    answer(
      "y8-lin-grd-m6",
      "A swimming pool drains 50 litres per hour. What is the gradient of the volume-time graph?",
      "\\text{gradient} = \\frac{-50}{1}",
      "-50",
      "Volume decreases by 50 each hour, so the gradient is −50.",
      ["-50", "−50"]
    ),
    answer(
      "y8-lin-grd-m7",
      "Find the gradient of the line through (0, 3) and (4, 11).",
      "\\text{gradient} = \\frac{11-3}{4-0}",
      "2",
      "Rise = 8, run = 4. Gradient = 8 ÷ 4 = 2."
    ),
    choice(
      "y8-lin-grd-m8",
      "A cost graph has cost ($) on the y-axis and number of items on the x-axis. The gradient is 5. What does this mean?",
      "A",
      [
        "The cost increases by $5 per item.",
        "The cost is always $5.",
        "There are 5 items.",
        "The total cost is $50.",
      ],
      "The gradient is the rate of change: cost increases by $5 for each additional item."
    ),
    answer(
      "y8-lin-grd-m9",
      "A line rises 15 units over a run of 5 units. Find the gradient.",
      "\\text{gradient} = \\frac{15}{5}",
      "3",
      "Gradient = 15 ÷ 5 = 3."
    ),
    answer(
      "y8-lin-grd-m10",
      "Find the gradient of the line through (1, 7) and (3, 3).",
      "\\text{gradient} = \\frac{3-7}{3-1}",
      "-2",
      "Rise = 3 − 7 = −4, run = 3 − 1 = 2. Gradient = −4 ÷ 2 = −2.",
      ["-2", "−2"]
    ),
  ],
};

// ── Lesson 6: Interpreting Linear Graphs ─────────────────────────────────────

const interpretingLinearGraphs: LessonContent = {
  description:
    "Read values from linear graphs, find starting values and rates of change from rules, and interpret gradient and y-intercept in practical contexts.",
  learningIntention:
    "Interpret the gradient and y-intercept of a linear graph in practical contexts and use rules to make predictions.",
  successCriteria: [
    "Identify the starting value (y-intercept) and the rate of change (gradient) from a linear rule.",
    "Use a rule to find the output for a given input.",
    "Solve the rule to find the input for a given output.",
    "Interpret the gradient and y-intercept in the context of a practical problem.",
  ],
  teaching: {
    paragraphs: [
      "In a practical linear model, the rule y = mx + c has a clear meaning. The y-intercept c is the starting value when x = 0 (e.g. a fixed fee). The gradient m is the rate of change (e.g. cost per item, speed, or fill rate).",
      "To make a prediction, substitute the known value into the rule and calculate. To work backwards, substitute the known output and solve for the unknown input.",
      "On a distance-time graph, a horizontal line means the object is not moving. A steeper line means a greater speed. A downward slope means the object is moving back towards the starting point.",
    ],
    latexBlocks: [
      "y = mx + c",
      "m = \\text{rate of change (gradient)},\\quad c = \\text{starting value (y-intercept)}",
      "\\text{e.g. }C = 3n + 10:\\; \\$10\\text{ fixed cost, }\\$3\\text{ per item}",
    ],
  },
  workedExamples: [
    {
      title: "Interpret a linear rule in context",
      questionLatex:
        "\\text{A hire rule is }C = 25h + 40,\\text{ where }C\\text{ is cost (\\$) and }h\\text{ is hours.}",
      steps: [
        {
          explanation: "The y-intercept (40) is the fixed starting cost.",
          latex: "\\text{Fixed cost: }\\$40",
        },
        {
          explanation: "The gradient (25) is the hourly rate.",
          latex: "\\text{Rate: }\\$25\\text{ per hour}",
        },
        {
          explanation: "Find the cost for 3 hours.",
          latex: "C = 25(3) + 40 = 75 + 40 = 115",
        },
      ],
      finalAnswerLatex: "\\$115",
    } as WorkedExample,
    {
      title: "Find the gradient from two points on a context graph",
      questionLatex:
        "\\text{A graph of cost passes through }(0,\\;8)\\text{ and }(2,\\;14).\\text{ Find the gradient.}",
      steps: [
        {
          explanation: "Gradient = rise ÷ run.",
          latex: "\\text{gradient} = \\frac{14 - 8}{2 - 0} = \\frac{6}{2} = 3",
        },
      ],
      finalAnswerLatex: "\\text{gradient} = 3",
    } as WorkedExample,
    {
      title: "Solve for the input",
      questionLatex:
        "\\text{Rule: }C = 7n + 3.\\text{ For which }n\\text{ is }C = 31?",
      steps: [
        {
          explanation: "Substitute C = 31.",
          latex: "7n + 3 = 31",
        },
        {
          explanation: "Solve.",
          latex: "7n = 28 \\Rightarrow n = 4",
        },
      ],
      finalAnswerLatex: "n = 4",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-lin-int-g1",
      "A distance-time graph shows a horizontal line. What does this mean?",
      "C",
      ["Moving forward", "Moving backward", "Standing still", "Accelerating"],
      "A horizontal line means no change in distance: the object is stationary."
    ),
    answer(
      "y8-lin-int-g2",
      "Rule: y = 2x + 10. What is the starting value when x = 0?",
      "y = 2(0) + 10",
      "10",
      "When x = 0, y = 10. The starting value (y-intercept) is 10."
    ),
    answer(
      "y8-lin-int-g3",
      "Cost rule: C = 4n + 8. Find C when n = 6.",
      "C = 4(6) + 8",
      "32",
      "C = 24 + 8 = 32."
    ),
    choice(
      "y8-lin-int-g4",
      "On a straight-line graph with a positive gradient, as x increases, y…",
      "C",
      ["decreases", "stays the same", "increases", "becomes zero"],
      "A positive gradient means the line rises from left to right, so y increases as x increases."
    ),
  ],
  independentPractice: [
    answer(
      "y8-lin-int-i1",
      "A hire car costs $50 plus $30 per hour. Rule: C = 30h + 50. Find C when h = 3.",
      "C = 30(3) + 50",
      "140",
      "C = 90 + 50 = 140. The total cost for 3 hours is $140."
    ),
    answer(
      "y8-lin-int-i2",
      "Rule: C = 5n + 20. Find C when n = 8.",
      "C = 5(8) + 20",
      "60",
      "C = 40 + 20 = 60."
    ),
    choice(
      "y8-lin-int-i3",
      "A cost graph passes through (0, 8) and (2, 14). What is the gradient?",
      "A",
      ["3", "8", "6", "4"],
      "Gradient = (14 − 8) ÷ (2 − 0) = 6 ÷ 2 = 3."
    ),
    answer(
      "y8-lin-int-i4",
      "A phone plan costs $20 per month plus $0.10 per text. Rule: C = 0.10t + 20. Find C for 50 texts.",
      "C = 0.10(50) + 20",
      "25",
      "C = 5 + 20 = 25."
    ),
    answer(
      "y8-lin-int-i5",
      "A distance-time graph has gradient 60 (km/h). How far does the object travel in 3 hours?",
      "\\text{distance} = 60 \\times 3",
      "180",
      "Distance = gradient × time = 60 × 3 = 180 km."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing the gradient (rate of change) with the y-intercept (starting value).",
      fix: "In y = mx + c: m is the gradient (how fast y changes). c is the y-intercept (the starting value when x = 0).",
    },
    {
      mistake: "Reading the y-intercept from the graph as the x-intercept.",
      fix: "The y-intercept is where the line crosses the vertical y-axis (at x = 0), not the horizontal axis.",
    },
    {
      mistake: "Using subtraction in the wrong order when finding the gradient from two points.",
      fix: "Use gradient = (y₂ − y₁) ÷ (x₂ − x₁). Keep the same order for both the numerator and denominator.",
    },
    {
      mistake: "Not interpreting the gradient with the correct units in practical problems.",
      fix: "Always state units. If cost is in $ and items is the x-axis, the gradient is in $/item.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-lin-int-m1",
      "Rule: D = 80t, where D = distance (km) and t = time (hours). Find D when t = 4.",
      "D = 80(4)",
      "320",
      "D = 80 × 4 = 320 km."
    ),
    choice(
      "y8-lin-int-m2",
      "A graph has y-intercept at (0, 12) and passes through (2, 20). What is the gradient?",
      "A",
      ["4", "8", "6", "12"],
      "Gradient = (20 − 12) ÷ (2 − 0) = 8 ÷ 2 = 4."
    ),
    answer(
      "y8-lin-int-m3",
      "Rule: C = 6n + 15. Find C when n = 10.",
      "C = 6(10) + 15",
      "75",
      "C = 60 + 15 = 75."
    ),
    answer(
      "y8-lin-int-m4",
      "What is the y-intercept of y = −3x + 24?",
      "\\text{let }x = 0:\\; y = 24",
      "24",
      "Substitute x = 0: y = −3(0) + 24 = 24."
    ),
    choice(
      "y8-lin-int-m5",
      "Which statement about the gradient of a practical linear graph is correct?",
      "B",
      [
        "It has no practical meaning.",
        "It describes the rate of change between the two quantities.",
        "It is always positive.",
        "It only matters when the y-intercept is zero.",
      ],
      "The gradient represents how fast the output quantity changes relative to the input quantity."
    ),
    answer(
      "y8-lin-int-m6",
      "Rule: W = 250 − 5d, where W = weight (kg) and d = days. Find W when d = 10.",
      "W = 250 - 5(10)",
      "200",
      "W = 250 − 50 = 200 kg."
    ),
    answer(
      "y8-lin-int-m7",
      "Rule: P = 12h − 4, where P = profit ($) and h = hours. Find P when h = 5.",
      "P = 12(5) - 4",
      "56",
      "P = 60 − 4 = 56."
    ),
    choice(
      "y8-lin-int-m8",
      "Rule: W = −3t + 60, where W = water level (L) and t = time (min). What is the starting water level?",
      "B",
      ["3 L", "60 L", "20 min", "−3 L"],
      "The starting value is the y-intercept: when t = 0, W = −3(0) + 60 = 60 L."
    ),
    answer(
      "y8-lin-int-m9",
      "Rule: F = 2C + 32 converts Celsius to Fahrenheit. Find F when C = 15.",
      "F = 2(15) + 32",
      "62",
      "F = 30 + 32 = 62°F."
    ),
    answer(
      "y8-lin-int-m10",
      "Rule: C = 7n + 3. For which n is C = 31?",
      "7n + 3 = 31",
      "4",
      "7n = 28, so n = 4."
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "number-patterns-and-rules":      numberPatternsAndRules,
  "coordinates-and-points":         coordinatesAndPoints,
  "tables-of-values":               tablesOfValues,
  "graphing-linear-relationships":  graphingLinearRelationships,
  "gradient-as-rate-of-change":     gradientAsRateOfChange,
  "interpreting-linear-graphs":     interpretingLinearGraphs,
};

export function year8LinearRelationshipsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" ||
    unit.slug !== "linear-relationships"
  ) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) return null;

  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
