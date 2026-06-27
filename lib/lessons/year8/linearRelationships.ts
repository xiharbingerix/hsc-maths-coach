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
import { linearGraphQuestionVisuals } from "./linearGraphVisuals";

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

// Pool question with explicit difficulty (1–5). Typed-answer variant.
function poolA(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  difficulty: number,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Substitute values carefully and show each step of working.",
    explanation,
  };
}

// Pool question with explicit difficulty (1–5). Multiple-choice variant.
function poolC(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  difficulty: number,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read each option carefully and eliminate those that don't fit.",
    explanation,
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
      "Why does the rule have the form T = mn + c? Build the terms by repeated addition: the 1st term is c + m, the 2nd is c + 2m, and the nth is c + mn — each step adds exactly one more copy of the common difference m. So m is the rate the pattern grows by and c is a fixed offset that shifts the whole sequence up or down. This is the same structure as the straight line y = mx + c, which is exactly why a linear pattern graphs as a straight line.",
      "You never have to guess c. The rule must reproduce the first term, so set n = 1: c = (first term) − m. For 4, 7, 10, … the difference m = 3, so c = 4 − 3 = 1 and T = 3n + 1. Checking a second term (n = 2 gives 7 ✓) confirms it — two points are always enough to pin down a straight line, so once two terms agree the whole rule is locked in.",
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
    {
      title: "Find the rule from two non-consecutive terms",
      questionLatex:
        "\\text{A linear pattern has }T_3 = 11\\text{ and }T_7 = 23.\\text{ Find the rule.}",
      steps: [
        {
          explanation:
            "The common difference m is the change in T divided by the change in n (just like a gradient).",
          latex: "m = \\frac{23 - 11}{7 - 3} = \\frac{12}{4} = 3",
        },
        {
          explanation: "Substitute one known term, say n = 3, T = 11, to find c.",
          latex: "11 = 3(3) + c \\Rightarrow c = 2",
        },
        {
          explanation: "Check the other term: n = 7 → 3(7) + 2 = 23 ✓.",
          latex: "T = 3n + 2",
        },
      ],
      finalAnswerLatex: "T = 3n + 2",
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
      "",
      "19",
      "T = 3 × 6 + 1 = 18 + 1 = 19."
    ),
    answer(
      "y8-lin-pat-g3",
      "Rule: T = 3n + 3. Find the 10th term.",
      "",
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
      "",
      "22",
      "The 6th term is 7 + 5 × 3 = 7 + 15 = 22."
    ),
    answer(
      "y8-lin-pat-i2",
      "Rule: T = 5n − 3. Find T when n = 8.",
      "",
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
      "",
      "7",
      "2n = 21 − 7 = 14, so n = 7."
    ),
    answer(
      "y8-lin-pat-i5",
      "Pattern: 100, 94, 88, 82, … Find the next term.",
      "",
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
      "",
      "16",
      "13 + 3 = 16."
    ),
    answer(
      "y8-lin-pat-m2",
      "Rule: T = 6n − 4. Find T when n = 5.",
      "",
      "26",
      "T = 30 − 4 = 26."
    ),
    answer(
      "y8-lin-pat-m3",
      "Table: n = 1 → 3, n = 2 → 5, n = 3 → 7. Rule is T = 2n + 1. Find the 10th term.",
      "",
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
      "",
      "47",
      "T = 48 − 1 = 47."
    ),
    answer(
      "y8-lin-pat-m6",
      "Rule: T = 3n + 5. For which n is T = 29?",
      "",
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
      "",
      "26",
      "32 − 6 = 26."
    ),
    answer(
      "y8-lin-pat-m9",
      "Rule: T = 4n + 3. Find T when n = 9.",
      "",
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
  masteryQuizPool: [
    poolA(
      "y8-lin-pat-p1",
      "Pattern: 2, 6, 10, 14, … Find the next term.",
      "",
      "18",
      "14 + 4 = 18.",
      1
    ),
    poolA(
      "y8-lin-pat-p2",
      "Rule: T = 2n + 5. Find T when n = 3.",
      "",
      "11",
      "T = 6 + 5 = 11.",
      1
    ),
    poolC(
      "y8-lin-pat-p3",
      "What is the common difference of 9, 14, 19, 24, …?",
      "B",
      ["4", "5", "6", "9"],
      "14 − 9 = 5, and each step adds 5.",
      1
    ),
    poolA(
      "y8-lin-pat-p4",
      "Rule: T = 5n. Find the 4th term.",
      "",
      "20",
      "T = 5 × 4 = 20.",
      1
    ),
    poolA(
      "y8-lin-pat-p5",
      "Pattern: 11, 14, 17, 20, … Find the next term.",
      "",
      "23",
      "20 + 3 = 23.",
      1
    ),
    poolA(
      "y8-lin-pat-p6",
      "Rule: T = 3n − 1. Find T when n = 7.",
      "",
      "20",
      "T = 21 − 1 = 20.",
      2
    ),
    poolA(
      "y8-lin-pat-p7",
      "Rule: T = 6n + 2. Find T when n = 5.",
      "",
      "32",
      "T = 30 + 2 = 32.",
      2
    ),
    poolC(
      "y8-lin-pat-p8",
      "Which rule matches: n = 1 → 7, n = 2 → 10, n = 3 → 13?",
      "C",
      ["T = 3n", "T = 3n + 1", "T = 3n + 4", "T = 4n + 3"],
      "Common difference 3, and 3(1) + 4 = 7. So T = 3n + 4.",
      2
    ),
    poolA(
      "y8-lin-pat-p9",
      "Pattern: 80, 73, 66, 59, … Find the next term.",
      "",
      "52",
      "59 − 7 = 52.",
      2
    ),
    poolA(
      "y8-lin-pat-p10",
      "Rule: T = 4n + 1. For which n is T = 21?",
      "",
      "5",
      "4n = 20, so n = 5.",
      2
    ),
    poolA(
      "y8-lin-pat-p11",
      "Pattern: 6, 11, 16, 21, … Find the 7th term.",
      "",
      "36",
      "Common difference 5. The 7th term is 6 + 6 × 5 = 6 + 30 = 36.",
      3
    ),
    poolA(
      "y8-lin-pat-p12",
      "Write the rule for the pattern 8, 11, 14, 17, … in the form T = mn + c. Enter the value of c.",
      "",
      "5",
      "m = 3 and 3(1) + c = 8, so c = 5. The rule is T = 3n + 5.",
      3
    ),
    poolA(
      "y8-lin-pat-p13",
      "Rule: T = 7n − 3. For which n is T = 39?",
      "",
      "6",
      "7n = 42, so n = 6.",
      3
    ),
    poolC(
      "y8-lin-pat-p14",
      "Which sequence has a common difference of 6?",
      "C",
      ["3, 8, 13, 18", "2, 9, 16, 23", "4, 10, 16, 22", "5, 10, 15, 20"],
      "10 − 4 = 6, 16 − 10 = 6, 22 − 16 = 6. Only option C steps by 6.",
      3
    ),
    poolA(
      "y8-lin-pat-p15",
      "Pattern: 100, 92, 84, 76, … Find the 6th term.",
      "",
      "60",
      "Common difference −8. Terms: 100, 92, 84, 76, 68, 60. The 6th term is 60.",
      3
    ),
    poolA(
      "y8-lin-pat-p16",
      "Rule: T = 5n + 2. Find the 12th term.",
      "",
      "62",
      "T = 60 + 2 = 62.",
      3
    ),
    poolA(
      "y8-lin-pat-p17",
      "Find the rule for 4, 9, 14, 19, … and use it to find the 20th term.",
      "",
      "99",
      "m = 5, c = −1, so T = 5n − 1. The 20th term is 5 × 20 − 1 = 99.",
      4
    ),
    poolA(
      "y8-lin-pat-p18",
      "Rule: T = 6n − 5. For which n is T = 73?",
      "",
      "13",
      "6n = 78, so n = 13.",
      4
    ),
    poolA(
      "y8-lin-pat-p19",
      "A pattern has a common difference of 4 and its 10th term is 41. What is its first term?",
      "",
      "5",
      "From the 1st to the 10th term is 9 steps of 4 = 36. So T₁ = 41 − 36 = 5.",
      4
    ),
    poolC(
      "y8-lin-pat-p20",
      "The rule T = mn + c gives T = 13 when n = 2 and T = 23 when n = 4. What is m?",
      "C",
      ["3", "4", "5", "6"],
      "From n = 2 to n = 4 is 2 steps and T rises by 10, so m = 10 ÷ 2 = 5.",
      4
    ),
    poolA(
      "y8-lin-pat-p21",
      "A pattern starts 3, 10, 17, … For which n does the term first exceed 100?",
      "",
      "15",
      "T = 7n − 4. Solve 7n − 4 > 100: 7n > 104, n > 14.86, so the first whole n is 15.",
      4
    ),
    poolA(
      "y8-lin-pat-p22",
      "Pattern A is 4, 7, 10, 13, … and pattern B is 1, 7, 13, 19, … At which position n are their terms equal?",
      "",
      "2",
      "A: T = 3n + 1. B: T = 6n − 5. Set equal: 3n + 1 = 6n − 5, so 6 = 3n and n = 2. (Check: A's 2nd term = 7, B's 2nd term = 7.)",
      5
    ),
    poolA(
      "y8-lin-pat-p23",
      "The 5th term of a linear pattern is 23 and the 9th term is 43. Find the common difference.",
      "",
      "5",
      "From the 5th to the 9th term is 4 steps and the value rises by 20, so d = 20 ÷ 4 = 5.",
      5
    ),
    poolA(
      "y8-lin-pat-p24",
      "The 3rd term of a linear pattern is 17 and the 7th term is 37. Find the 1st term.",
      "",
      "7",
      "Common difference d = 20 ÷ 4 = 5. The 1st term is 2 steps before the 3rd: 17 − 2 × 5 = 7.",
      5
    ),
    poolA(
      "y8-lin-pat-p25",
      "A linear pattern has rule T = 8n + c. Its 4th term is 35. Find c, then find the 10th term.",
      "",
      "83",
      "32 + c = 35, so c = 3 and T = 8n + 3. The 10th term is 8 × 10 + 3 = 83.",
      5
    ),
    poolA(
      "y8-lin-pat-p26",
      "Pattern: 5, 9, 13, 17, … How many terms are less than 50?",
      "",
      "12",
      "T = 4n + 1. Solve 4n + 1 < 50: 4n < 49, n < 12.25, so 12 terms (n = 1 to 12) are below 50.",
      5
    ),
  ],
  multiPartPractice: [
    {
      id: "y8-lin-pat-mp1",
      prompt:
        "A linear number pattern begins 6, 10, 14, 18, … Use the rule T = mn + c.",
      latex: "",
      answer: "4",
      hint: "Find the common difference for m, then substitute n = 1 to find c.",
      explanation:
        "Part (a): the common difference is 4, so m = 4. Part (b): 4(1) + c = 6, so c = 2 and T = 4n + 2. Part (c): the 20th term is 4 × 20 + 2 = 82. Part (d): solve 4n + 2 = 50 to get n = 12.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the common difference m.",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Subtract consecutive terms.",
          explanation: "10 − 6 = 4, so m = 4.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the constant c in the rule T = mn + c.",
          marks: 1,
          answer: "2",
          acceptedAnswers: [],
          hint: "Substitute n = 1, T = 6 into T = 4n + c.",
          explanation: "4(1) + c = 6, so c = 2. The rule is T = 4n + 2.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the 20th term.",
          marks: 1,
          answer: "82",
          acceptedAnswers: [],
          hint: "Substitute n = 20 into the rule.",
          explanation: "T = 4 × 20 + 2 = 82.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "For which n is the term equal to 50?",
          marks: 2,
          answer: "12",
          acceptedAnswers: [],
          hint: "Solve 4n + 2 = 50.",
          explanation: "4n = 48, so n = 12.",
        },
      ],
    },
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
      "Why two numbers, and why in a fixed order? A single number can only place you along one line. To pin down a point anywhere on a flat surface you need two independent directions — how far across and how far up. The pair (x, y) follows an agreed convention (x always first) so everyone reads the same point; swapping them, e.g. (3, 5) versus (5, 3), lands you somewhere completely different.",
      "The signs of the coordinates are exactly what carve the plane into quadrants. The x-axis (where y = 0) and the y-axis (where x = 0) cross like two roads, and which corner you stand in is decided purely by whether x and y are positive or negative. So you can name the quadrant from the signs alone: (−, +) must be Quadrant II before you plot anything.",
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
    {
      title: "Find the midpoint of two points",
      questionLatex:
        "\\text{Find the midpoint of }(2,\\;4)\\text{ and }(8,\\;10).",
      steps: [
        {
          explanation:
            "The midpoint sits exactly halfway, so average the x-coordinates and average the y-coordinates separately.",
          latex: "x = \\frac{2+8}{2} = 5,\\quad y = \\frac{4+10}{2} = 7",
        },
      ],
      finalAnswerLatex: "(5,\\; 7)",
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
      "",
      "7",
      "The x-coordinate is always the first number in the pair. It is 7.",
      [],
      ptGraph("Point (7, −2) plotted on the Cartesian plane", 7, -2)
    ),
    answer(
      "y8-lin-coo-g3",
      "What is the y-coordinate of the point (−3, 5)?",
      "",
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
      "",
      "4",
      "Right means positive x. The x-coordinate is 4. The full point is (4, −3)."
    ),
    answer(
      "y8-lin-coo-i2",
      "Points A(2, 5) and B(2, −3) both have the same x-coordinate. What is it?",
      "",
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
      "",
      "0",
      "Every point on the y-axis has x = 0."
    ),
    answer(
      "y8-lin-coo-i5",
      "What is the y-coordinate of the midpoint of (0, 0) and (0, 6)?",
      "",
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
      "",
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
      "",
      "8",
      "Both points are on the y-axis. The distance is |8 − 0| = 8 units."
    ),
    answer(
      "y8-lin-coo-m4",
      "What is the x-coordinate of the point (−3, −4)?",
      "",
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
      "",
      "x-axis",
      "When y = 0, the point lies on the horizontal x-axis.",
      ["x-axis", "X-axis", "the x-axis"]
    ),
    answer(
      "y8-lin-coo-m7",
      "A point is 6 units left of the origin on the x-axis. What is its x-coordinate?",
      "",
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
      "",
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
  masteryQuizPool: [
    poolA(
      "y8-lin-coo-p1",
      "What is the x-coordinate of the point (8, 3)?",
      "",
      "8",
      "The x-coordinate is the first number: 8.",
      1
    ),
    poolA(
      "y8-lin-coo-p2",
      "What is the y-coordinate of the point (2, 9)?",
      "",
      "9",
      "The y-coordinate is the second number: 9.",
      1
    ),
    poolC(
      "y8-lin-coo-p3",
      "The point (3, 6) lies in which quadrant?",
      "A",
      ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      "Both coordinates positive → Quadrant I.",
      1
    ),
    poolA(
      "y8-lin-coo-p4",
      "A point on the x-axis has which y-coordinate?",
      "",
      "0",
      "Every point on the x-axis has y = 0.",
      1
    ),
    poolC(
      "y8-lin-coo-p5",
      "What are the coordinates of the origin?",
      "A",
      ["(0, 0)", "(1, 0)", "(0, 1)", "(1, 1)"],
      "The origin is where the axes meet: (0, 0).",
      1
    ),
    poolC(
      "y8-lin-coo-p6",
      "The point (−2, 7) lies in which quadrant?",
      "B",
      ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      "x negative, y positive → Quadrant II.",
      2
    ),
    poolA(
      "y8-lin-coo-p7",
      "What is the x-coordinate of the point (−6, −1)?",
      "",
      "-6",
      "The x-coordinate is the first number: −6.",
      2,
      ["−6"]
    ),
    poolC(
      "y8-lin-coo-p8",
      "Which point lies on the y-axis?",
      "C",
      ["(4, 0)", "(2, 3)", "(0, −7)", "(−5, −5)"],
      "A point on the y-axis has x = 0. Only (0, −7) qualifies.",
      2
    ),
    poolA(
      "y8-lin-coo-p9",
      "A point is 5 units left of the origin on the x-axis. What is its x-coordinate?",
      "",
      "-5",
      "Left means negative x. The x-coordinate is −5.",
      2,
      ["−5"]
    ),
    poolC(
      "y8-lin-coo-p10",
      "The point (6, −2) lies in which quadrant?",
      "D",
      ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      "x positive, y negative → Quadrant IV.",
      2
    ),
    poolA(
      "y8-lin-coo-p11",
      "Points A(5, 1) and B(5, 9) share the same x-coordinate. What is it?",
      "",
      "5",
      "Both have x = 5; they lie on the vertical line x = 5.",
      3
    ),
    poolA(
      "y8-lin-coo-p12",
      "What is the y-coordinate of the midpoint of (0, 2) and (0, 10)?",
      "",
      "6",
      "Midpoint y = (2 + 10) ÷ 2 = 6.",
      3
    ),
    poolA(
      "y8-lin-coo-p13",
      "What is the distance along the x-axis from (3, 0) to (11, 0)?",
      "",
      "8",
      "Distance = |11 − 3| = 8 units.",
      3
    ),
    poolA(
      "y8-lin-coo-p14",
      "The point (0, k) lies on which axis? Enter 'x-axis' or 'y-axis'.",
      "",
      "y-axis",
      "When x = 0 the point lies on the vertical y-axis.",
      3,
      ["the y-axis", "Y-axis"]
    ),
    poolA(
      "y8-lin-coo-p15",
      "What is the x-coordinate of the midpoint of (2, 4) and (8, 4)?",
      "",
      "5",
      "Midpoint x = (2 + 8) ÷ 2 = 5.",
      3
    ),
    poolC(
      "y8-lin-coo-p16",
      "A point has a negative x-coordinate and a negative y-coordinate. Which quadrant is it in?",
      "C",
      ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      "Both negative → Quadrant III.",
      3
    ),
    poolA(
      "y8-lin-coo-p17",
      "A(−4, 3) and B(2, 3) are joined by a line segment. What is its length?",
      "",
      "6",
      "Same y, so length = |2 − (−4)| = 6 units.",
      4
    ),
    poolA(
      "y8-lin-coo-p18",
      "Find the x-coordinate of the midpoint of (−3, 0) and (9, 0).",
      "",
      "3",
      "Midpoint x = (−3 + 9) ÷ 2 = 6 ÷ 2 = 3.",
      4
    ),
    poolA(
      "y8-lin-coo-p19",
      "Find the y-coordinate of the midpoint of (1, −2) and (1, 8).",
      "",
      "3",
      "Midpoint y = (−2 + 8) ÷ 2 = 3.",
      4
    ),
    poolA(
      "y8-lin-coo-p20",
      "A square has corners (0, 0), (6, 0), (6, 6) and (0, 6). What is the x-coordinate of its centre?",
      "",
      "3",
      "The centre is the midpoint of a diagonal: x = (0 + 6) ÷ 2 = 3.",
      4
    ),
    poolA(
      "y8-lin-coo-p21",
      "The midpoint of A(2, 5) and B is (5, 5). Find the x-coordinate of B.",
      "",
      "8",
      "(2 + x_B) ÷ 2 = 5, so 2 + x_B = 10 and x_B = 8.",
      4
    ),
    poolA(
      "y8-lin-coo-p22",
      "Three corners of a rectangle are (1, 1), (7, 1) and (7, 4). Find the x-coordinate of the fourth corner.",
      "",
      "1",
      "The fourth corner is above (1, 1), so it is (1, 4). Its x-coordinate is 1.",
      5
    ),
    poolA(
      "y8-lin-coo-p23",
      "The midpoint of P(−1, 4) and Q is (3, 4). Find the x-coordinate of Q.",
      "",
      "7",
      "(−1 + x_Q) ÷ 2 = 3, so −1 + x_Q = 6 and x_Q = 7.",
      5
    ),
    poolA(
      "y8-lin-coo-p24",
      "A(−5, 2) and B(7, 2) are the ends of a horizontal segment. What is the x-coordinate of its midpoint?",
      "",
      "1",
      "Midpoint x = (−5 + 7) ÷ 2 = 2 ÷ 2 = 1.",
      5
    ),
    poolA(
      "y8-lin-coo-p25",
      "The point (a, b) is in Quadrant II and lies on the line y = 5. If its distance from the y-axis is 3 units, find a.",
      "",
      "-3",
      "In Quadrant II, x is negative. A distance of 3 from the y-axis means a = −3.",
      5,
      ["−3"]
    ),
    poolA(
      "y8-lin-coo-p26",
      "A line segment from (2, 1) to (2, 9) is divided into 4 equal parts. What is the y-coordinate of the first division point above (2, 1)?",
      "",
      "3",
      "Each part is (9 − 1) ÷ 4 = 2 units. The first division point is at y = 1 + 2 = 3.",
      5
    ),
  ],
  multiPartPractice: [
    {
      id: "y8-lin-coo-mp1",
      prompt:
        "On the Cartesian plane, A = (−2, 3), B = (6, 3) and C = (6, −1).",
      latex: "",
      answer: "8",
      hint: "AB is horizontal and BC is vertical; use coordinate differences for lengths and midpoints.",
      explanation:
        "Part (a): AB is horizontal, length |6 − (−2)| = 8. Part (b): BC is vertical, length |3 − (−1)| = 4. Part (c): the midpoint of AB has x = (−2 + 6) ÷ 2 = 2. Part (d): B is in Quadrant I (positive, positive).",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the length of AB.",
          marks: 1,
          answer: "8",
          acceptedAnswers: [],
          hint: "A and B share the same y-coordinate.",
          explanation: "Length = |6 − (−2)| = 8 units.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the length of BC.",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "B and C share the same x-coordinate.",
          explanation: "Length = |3 − (−1)| = 4 units.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the x-coordinate of the midpoint of AB.",
          marks: 1,
          answer: "2",
          acceptedAnswers: [],
          hint: "Average the two x-coordinates.",
          explanation: "x = (−2 + 6) ÷ 2 = 2.",
        },
        {
          key: "d",
          label: "(d)",
          prompt:
            "State the quadrant number (1, 2, 3 or 4) that point B lies in.",
          marks: 1,
          answer: "1",
          acceptedAnswers: ["I", "Quadrant I"],
          hint: "Both coordinates of B are positive.",
          explanation: "B = (6, 3) has positive x and y, so it is in Quadrant I.",
        },
      ],
    },
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
      "Why do the y-values step up evenly for a linear rule? Each time x rises by 1, the term mx gains exactly m while c stays fixed — so the y-column climbs by the constant amount m. That steady step is the fingerprint of a straight line. If the differences are not constant, the relationship is not linear and no rule y = mx + c can fit it.",
      "This gives a fast way to read the rule straight off a table with equal x-steps: m is the constant jump in y, and c is the value of y when x = 0 (the starting height). If x = 0 is not shown, find c by substituting any row into y = mx + c. Two rows fix the whole line, so always confirm with a third before trusting the rule.",
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
    {
      title: "Read a decreasing rule and extend it",
      questionLatex:
        "\\text{Table: }x=1\\to20,\\; x=2\\to17,\\; x=3\\to14.\\text{ Find }y\\text{ when }x=6.",
      steps: [
        {
          explanation:
            "The y-values drop by 3 for each step of 1 in x, so the gradient is m = −3.",
          latex: "m = 17 - 20 = -3",
        },
        {
          explanation: "Find c by substituting a row, say x = 1, y = 20.",
          latex: "20 = -3(1) + c \\Rightarrow c = 23,\\quad y = -3x + 23",
        },
        {
          explanation: "Substitute x = 6 into the rule.",
          latex: "y = -3(6) + 23 = 5",
        },
      ],
      finalAnswerLatex: "y = 5",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-lin-tab-g1",
      "Rule: y = 2x + 1. Find y when x = 3.",
      "",
      "7",
      "y = 6 + 1 = 7."
    ),
    answer(
      "y8-lin-tab-g2",
      "Rule: y = 3x − 2. Find y when x = 4.",
      "",
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
      "",
      "3",
      "y = 0 + 3 = 3. Substituting x = 0 always gives the y-intercept c."
    ),
  ],
  independentPractice: [
    answer(
      "y8-lin-tab-i1",
      "Rule: y = 4x − 1. Find y when x = 5.",
      "",
      "19",
      "y = 20 − 1 = 19."
    ),
    answer(
      "y8-lin-tab-i2",
      "Rule: y = −2x + 8. Find y when x = 3.",
      "",
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
      "",
      "20",
      "y = 14 + 6 = 20."
    ),
    answer(
      "y8-lin-tab-i5",
      "Rule: y = 3x. Find y when x = 7.",
      "",
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
      "",
      "16",
      "y = 12 + 4 = 16."
    ),
    answer(
      "y8-lin-tab-m2",
      "Table: x = 0 → 3, x = 1 → 5, x = 2 → 7, x = 3 → 9. What is the constant difference in y?",
      "",
      "2",
      "Each y increases by 2 as x increases by 1. The constant difference is 2."
    ),
    answer(
      "y8-lin-tab-m3",
      "Rule: y = 6x − 5. Find y when x = 3.",
      "",
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
      "",
      "3",
      "y = −7 + 10 = 3."
    ),
    answer(
      "y8-lin-tab-m6",
      "Rule: y = 2x + 1. For which x is y = 15?",
      "",
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
      "",
      "37",
      "y = 40 − 3 = 37."
    ),
    answer(
      "y8-lin-tab-m9",
      "Rule: y = 5x + 1. Find y when x = 8.",
      "",
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
  masteryQuizPool: [
    poolA(
      "y8-lin-tab-p1",
      "Rule: y = 2x + 1. Find y when x = 4.",
      "",
      "9",
      "y = 8 + 1 = 9.",
      1
    ),
    poolA(
      "y8-lin-tab-p2",
      "Rule: y = 3x. Find y when x = 5.",
      "",
      "15",
      "y = 3 × 5 = 15.",
      1
    ),
    poolA(
      "y8-lin-tab-p3",
      "Rule: y = x + 9. Find y when x = 6.",
      "",
      "15",
      "y = 6 + 9 = 15.",
      1
    ),
    poolA(
      "y8-lin-tab-p4",
      "Rule: y = 4x − 1. Find y when x = 2.",
      "",
      "7",
      "y = 8 − 1 = 7.",
      1
    ),
    poolA(
      "y8-lin-tab-p5",
      "Rule: y = 5x + 2. Find y when x = 0.",
      "",
      "2",
      "y = 0 + 2 = 2. At x = 0, y equals the constant.",
      1
    ),
    poolA(
      "y8-lin-tab-p6",
      "Rule: y = 3x + 7. Find y when x = 6.",
      "",
      "25",
      "y = 18 + 7 = 25.",
      2
    ),
    poolC(
      "y8-lin-tab-p7",
      "Which rule matches: x = 0 → 4, x = 1 → 6, x = 2 → 8?",
      "B",
      ["y = 2x + 2", "y = 2x + 4", "y = 4x", "y = x + 4"],
      "Constant difference 2 and y = 4 at x = 0, so y = 2x + 4.",
      2
    ),
    poolA(
      "y8-lin-tab-p8",
      "Rule: y = −2x + 10. Find y when x = 4.",
      "",
      "2",
      "y = −8 + 10 = 2.",
      2
    ),
    poolA(
      "y8-lin-tab-p9",
      "Table: x = 0 → 7, x = 1 → 11, x = 2 → 15. What is the constant difference in y?",
      "",
      "4",
      "Each y rises by 4 as x rises by 1.",
      2
    ),
    poolA(
      "y8-lin-tab-p10",
      "Rule: y = 6x − 4. For which x is y = 14?",
      "",
      "3",
      "6x = 18, so x = 3.",
      2
    ),
    poolA(
      "y8-lin-tab-p11",
      "Rule: y = 7x + 3. Find y when x = 8.",
      "",
      "59",
      "y = 56 + 3 = 59.",
      3
    ),
    poolC(
      "y8-lin-tab-p12",
      "Table: x = 1 → 6, x = 2 → 11, x = 3 → 16. Which rule fits?",
      "A",
      ["y = 5x + 1", "y = 5x − 1", "y = 6x", "y = 4x + 2"],
      "Constant difference 5; at x = 1, 5(1) + 1 = 6. So y = 5x + 1.",
      3
    ),
    poolA(
      "y8-lin-tab-p13",
      "Rule: y = −3x + 20. Find y when x = 5.",
      "",
      "5",
      "y = −15 + 20 = 5.",
      3
    ),
    poolA(
      "y8-lin-tab-p14",
      "Rule: y = 4x + 5. For which x is y = 33?",
      "",
      "7",
      "4x = 28, so x = 7.",
      3
    ),
    poolA(
      "y8-lin-tab-p15",
      "Table: x = 2 → 11, x = 4 → 19, x = 6 → 27. The rule is y = mx + c. Find m.",
      "",
      "4",
      "y rises 8 as x rises 2, so m = 8 ÷ 2 = 4.",
      3
    ),
    poolA(
      "y8-lin-tab-p16",
      "Rule: y = 10x − 7. Find y when x = 4.",
      "",
      "33",
      "y = 40 − 7 = 33.",
      3
    ),
    poolA(
      "y8-lin-tab-p17",
      "Table: x = 1 → 8, x = 3 → 18, x = 5 → 28. Find the rule y = mx + c and give c.",
      "",
      "3",
      "m = (18 − 8) ÷ (3 − 1) = 5. Then 5(1) + c = 8, so c = 3.",
      4
    ),
    poolA(
      "y8-lin-tab-p18",
      "Rule: y = 8x − 5. For which x is y = 51?",
      "",
      "7",
      "8x = 56, so x = 7.",
      4
    ),
    poolA(
      "y8-lin-tab-p19",
      "A rule y = mx + c gives y = 13 at x = 2 and y = 25 at x = 5. Find m.",
      "",
      "4",
      "m = (25 − 13) ÷ (5 − 2) = 12 ÷ 3 = 4.",
      4
    ),
    poolA(
      "y8-lin-tab-p20",
      "A rule y = mx + c gives y = 13 at x = 2 and y = 25 at x = 5. Find c.",
      "",
      "5",
      "With m = 4: 13 = 8 + c, so c = 5.",
      4
    ),
    poolA(
      "y8-lin-tab-p21",
      "Rule: y = −4x + 30. For which x is y = 2?",
      "",
      "7",
      "−4x = −28, so x = 7.",
      4
    ),
    poolA(
      "y8-lin-tab-p22",
      "A table of y = 3x + c includes the pair x = 4, y = 17. Find c.",
      "",
      "5",
      "12 + c = 17, so c = 5.",
      5
    ),
    poolA(
      "y8-lin-tab-p23",
      "Two rules y = 2x + 3 and y = 5x − 9 give the same y at one value of x. Find that x.",
      "",
      "4",
      "2x + 3 = 5x − 9 gives 12 = 3x, so x = 4.",
      5
    ),
    poolA(
      "y8-lin-tab-p24",
      "For the x-value where y = 2x + 3 and y = 5x − 9 are equal, what is the common y-value?",
      "",
      "11",
      "At x = 4: y = 2(4) + 3 = 11 (and 5(4) − 9 = 11).",
      5
    ),
    poolA(
      "y8-lin-tab-p25",
      "A linear rule gives y = 20 at x = 3 and y = 32 at x = 7. Find y when x = 10.",
      "",
      "41",
      "m = 12 ÷ 4 = 3, and 20 = 3(3) + c gives c = 11. So y = 3x + 11 and at x = 10, y = 41.",
      5
    ),
    poolA(
      "y8-lin-tab-p26",
      "A table follows y = mx + c with y = −1 at x = 1 and y = 11 at x = 4. Find y when x = 0.",
      "",
      "-5",
      "m = 12 ÷ 3 = 4. Then −1 = 4(1) + c gives c = −5. At x = 0, y = c = −5.",
      5,
      ["−5"]
    ),
  ],
  multiPartPractice: [
    {
      id: "y8-lin-tab-mp1",
      prompt:
        "A linear rule produces this table: x = 1 → 9, x = 2 → 13, x = 3 → 17.",
      latex: "",
      answer: "4",
      hint: "The constant difference gives m; substitute a point to find c.",
      explanation:
        "Part (a): the constant difference is 4, so m = 4. Part (b): 4(1) + c = 9 gives c = 5, so y = 4x + 5. Part (c): at x = 10, y = 45. Part (d): solve 4x + 5 = 45 to get x = 10.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the constant difference m in y = mx + c.",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Subtract consecutive y-values.",
          explanation: "13 − 9 = 4, so m = 4.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the constant c.",
          marks: 1,
          answer: "5",
          acceptedAnswers: [],
          hint: "Substitute x = 1, y = 9 into y = 4x + c.",
          explanation: "4(1) + c = 9, so c = 5. The rule is y = 4x + 5.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find y when x = 10.",
          marks: 1,
          answer: "45",
          acceptedAnswers: [],
          hint: "Substitute x = 10 into y = 4x + 5.",
          explanation: "y = 4 × 10 + 5 = 45.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "For which x is y = 45?",
          marks: 2,
          answer: "10",
          acceptedAnswers: [],
          hint: "Solve 4x + 5 = 45.",
          explanation: "4x = 40, so x = 10.",
        },
      ],
    },
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
      "Why is the graph straight at all? Because equal steps in x always produce equal steps in y — the gradient m never changes — so the points march in one even direction without bending. That is also why two points are enough: a single straight direction cannot curve back, so two plotted points fix the entire line and a third only guards against an arithmetic slip.",
      "The two intercepts are just the two easiest points to find. The y-intercept is the starting height c (let x = 0); the x-intercept is where the line crosses zero height (let y = 0 and solve). Plotting those two crossings and ruling a line through them is normally the quickest accurate sketch.",
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
    {
      title: "Read the gradient and y-intercept, then find a point",
      questionLatex:
        "\\text{For }y = -2x + 5,\\text{ state the gradient and y-intercept, then find }y\\text{ when }x = 3.",
      steps: [
        {
          explanation:
            "Compare with y = mx + c: m is the coefficient of x, c is the constant.",
          latex: "m = -2\\quad(\\text{falls 2 each step}),\\quad \\text{y-intercept }(0,\\;5)",
        },
        {
          explanation: "Substitute x = 3 into the rule.",
          latex: "y = -2(3) + 5 = -1",
        },
      ],
      finalAnswerLatex: "m=-2,\\;(0,5),\\;\\text{and }(3,-1)",
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
      "",
      "2",
      "The y-intercept is y = 2. The graph crosses the y-axis at (0, 2).",
      [],
      lineGraph("Graph of y = x + 2", 1, 2, -4, 4, -3, 7)
    ),
    answer(
      "y8-lin-gra-g3",
      "Rule: y = 2x − 1. Find y when x = 3.",
      "",
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
      "",
      "-3",
      "y = −3. The graph crosses the y-axis at (0, −3).",
      ["-3", "−3"],
      lineGraph("Graph of y = x − 3", 1, -3, -4, 5, -8, 3)
    ),
    answer(
      "y8-lin-gra-i2",
      "Rule: y = 2x + 5. Find y when x = −1.",
      "",
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
      "",
      "0",
      "y = 0. The graph passes through the origin (0, 0)."
    ),
    answer(
      "y8-lin-gra-i5",
      "Find the y-intercept of y = 3x + 7.",
      "",
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
      "",
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
      "",
      "-4",
      "x = −4. The graph crosses the x-axis at (−4, 0).",
      ["-4", "−4"],
      lineGraph("Graph of y = x + 4", 1, 4, -6, 3, -3, 7)
    ),
    answer(
      "y8-lin-gra-m4",
      "Rule: y = 3x − 6. Find y when x = 2.",
      "",
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
      "",
      "22",
      "y = 20 + 2 = 22."
    ),
    answer(
      "y8-lin-gra-m7",
      "Rule: y = x. Find y when x = 7.",
      "",
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
      "",
      "2",
      "2x = 4, so x = 2. The x-intercept is (2, 0)."
    ),
    answer(
      "y8-lin-gra-m10",
      "Rule: y = −x + 8. Find y when x = 5.",
      "",
      "3",
      "y = −5 + 8 = 3."
    ),
  ],
  masteryQuizPool: [
    poolA(
      "y8-lin-gra-p1",
      "Find the y-intercept of y = 2x + 5 (let x = 0).",
      "",
      "5",
      "y = 5. The graph crosses the y-axis at (0, 5).",
      1
    ),
    poolC(
      "y8-lin-gra-p2",
      "What shape is the graph of a linear relationship?",
      "B",
      ["A curve", "A straight line", "A circle", "A wave"],
      "Linear relationships always graph as straight lines.",
      1
    ),
    poolA(
      "y8-lin-gra-p3",
      "Rule: y = x + 6. Find y when x = 0.",
      "",
      "6",
      "y = 6. This is the y-intercept.",
      1
    ),
    poolA(
      "y8-lin-gra-p4",
      "Rule: y = 3x. Find y when x = 0.",
      "",
      "0",
      "y = 0. The line passes through the origin.",
      1
    ),
    poolA(
      "y8-lin-gra-p5",
      "Find the y-intercept of y = 4x + 9.",
      "",
      "9",
      "At x = 0, y = 9.",
      1
    ),
    poolA(
      "y8-lin-gra-p6",
      "Find the x-intercept of y = x − 5 (let y = 0).",
      "",
      "5",
      "x = 5. The graph crosses the x-axis at (5, 0).",
      2
    ),
    poolA(
      "y8-lin-gra-p7",
      "Rule: y = 2x + 3. Find y when x = −1.",
      "",
      "1",
      "y = −2 + 3 = 1.",
      2
    ),
    poolC(
      "y8-lin-gra-p8",
      "Where does y = 5x + 2 cross the y-axis?",
      "B",
      ["(0, 5)", "(0, 2)", "(2, 0)", "(5, 2)"],
      "Set x = 0: y = 2. The y-intercept is (0, 2).",
      2
    ),
    poolA(
      "y8-lin-gra-p9",
      "Rule: y = 3x − 9. Find y when x = 3.",
      "",
      "0",
      "y = 9 − 9 = 0. (3, 0) is the x-intercept.",
      2
    ),
    poolA(
      "y8-lin-gra-p10",
      "Find the x-intercept of y = 2x − 8 (let y = 0).",
      "",
      "4",
      "2x = 8, so x = 4.",
      2
    ),
    poolA(
      "y8-lin-gra-p11",
      "Find the x-intercept of y = x + 7 (let y = 0).",
      "",
      "-7",
      "x = −7. The graph crosses the x-axis at (−7, 0).",
      3,
      ["−7"]
    ),
    poolA(
      "y8-lin-gra-p12",
      "Rule: y = 2x + 6. Find y when x = −3.",
      "",
      "0",
      "y = −6 + 6 = 0. (−3, 0) is the x-intercept.",
      3
    ),
    poolC(
      "y8-lin-gra-p13",
      "A line passes through (0, 4) and (1, 6). Which rule fits?",
      "B",
      ["y = x + 4", "y = 2x + 4", "y = 4x + 2", "y = 2x + 6"],
      "Gradient (6 − 4) ÷ 1 = 2 and y-intercept 4, so y = 2x + 4.",
      3
    ),
    poolA(
      "y8-lin-gra-p14",
      "Is the point (3, 10) on the line y = 3x + 1? Enter 'yes' or 'no'.",
      "",
      "yes",
      "3(3) + 1 = 10, which matches, so the point is on the line.",
      3,
      ["Yes", "YES"]
    ),
    poolA(
      "y8-lin-gra-p15",
      "Find the x-intercept of y = 3x − 12 (let y = 0).",
      "",
      "4",
      "3x = 12, so x = 4.",
      3
    ),
    poolA(
      "y8-lin-gra-p16",
      "Rule: y = −2x + 8. Find the x-intercept (let y = 0).",
      "",
      "4",
      "2x = 8, so x = 4. The x-intercept is (4, 0).",
      3
    ),
    poolA(
      "y8-lin-gra-p17",
      "Find the x-intercept of y = 2x + 7 (let y = 0). Give your answer as a decimal.",
      "",
      "-3.5",
      "2x = −7, so x = −3.5.",
      4,
      ["−3.5", "-7/2"]
    ),
    poolA(
      "y8-lin-gra-p18",
      "A line has y-intercept 6 and passes through (2, 0). What is its x-intercept?",
      "",
      "2",
      "The x-intercept is where y = 0, which is the point (2, 0). The x-intercept is 2.",
      4
    ),
    poolC(
      "y8-lin-gra-p19",
      "A line passes through (0, −3) and (2, 1). Which rule fits?",
      "B",
      ["y = x − 3", "y = 2x − 3", "y = 3x − 2", "y = 2x + 1"],
      "Gradient (1 − (−3)) ÷ 2 = 2 and y-intercept −3, so y = 2x − 3.",
      4
    ),
    poolA(
      "y8-lin-gra-p20",
      "The line y = 4x + c passes through (2, 11). Find c.",
      "",
      "3",
      "8 + c = 11, so c = 3.",
      4
    ),
    poolA(
      "y8-lin-gra-p21",
      "A line has x-intercept (5, 0) and gradient 2. Find its y-intercept.",
      "",
      "-10",
      "0 = 10 + c, so c = −10. The y-intercept is (0, −10).",
      4,
      ["−10"]
    ),
    poolA(
      "y8-lin-gra-p22",
      "A line passes through (1, 5) and (4, 11). Find its y-intercept.",
      "",
      "3",
      "Gradient = 6 ÷ 3 = 2. Then 5 = 2(1) + c gives c = 3.",
      5
    ),
    poolA(
      "y8-lin-gra-p23",
      "A line has gradient 3 and passes through (2, 4). Find its x-intercept. Give a fraction or decimal.",
      "",
      "0.6667",
      "y = 3x + c with 4 = 3(2) + c gives c = −2, so y = 3x − 2. Setting y = 0: x = 2/3 ≈ 0.6667.",
      5,
      ["2/3", "0.67"]
    ),
    poolA(
      "y8-lin-gra-p24",
      "The line y = 5x − 8 and the line y = 2x + 7 cross. Find the x-coordinate of the crossing point.",
      "",
      "5",
      "5x − 8 = 2x + 7 gives 3x = 15, so x = 5.",
      5
    ),
    poolA(
      "y8-lin-gra-p25",
      "At the point where y = 5x − 8 and y = 2x + 7 cross, what is the y-coordinate?",
      "",
      "17",
      "At x = 5: y = 5(5) − 8 = 17 (and 2(5) + 7 = 17).",
      5
    ),
    poolA(
      "y8-lin-gra-p26",
      "A line crosses the x-axis at (3, 0) and the y-axis at (0, 12). Find its gradient.",
      "",
      "-4",
      "Gradient = (12 − 0) ÷ (0 − 3) = 12 ÷ (−3) = −4.",
      5,
      ["−4"]
    ),
  ],
  multiPartPractice: [
    {
      id: "y8-lin-gra-mp1",
      prompt:
        "Consider the linear rule y = 2x − 6.",
      latex: "",
      answer: "-6",
      hint: "y-intercept: set x = 0. x-intercept: set y = 0. Substitute x-values to find points.",
      explanation:
        "Part (a): at x = 0, y = −6, so the y-intercept is −6. Part (b): setting y = 0 gives 2x = 6, so the x-intercept is 3. Part (c): at x = 5, y = 4. Part (d): the gradient (coefficient of x) is 2.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the y-intercept (the y-value when x = 0).",
          marks: 1,
          answer: "-6",
          acceptedAnswers: ["−6"],
          hint: "Substitute x = 0.",
          explanation: "y = 2(0) − 6 = −6.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the x-intercept (the x-value when y = 0).",
          marks: 2,
          answer: "3",
          acceptedAnswers: [],
          hint: "Set y = 0 and solve 0 = 2x − 6.",
          explanation: "2x = 6, so x = 3.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find y when x = 5.",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Substitute x = 5.",
          explanation: "y = 2(5) − 6 = 4.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "State the gradient of the line.",
          marks: 1,
          answer: "2",
          acceptedAnswers: [],
          hint: "The gradient is the coefficient of x.",
          explanation: "In y = 2x − 6, the gradient is 2.",
        },
      ],
    },
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
      "Why divide rise by run? Gradient answers the question 'for every 1 unit across, how much up?' Dividing the total rise by the total run scales the climb down to a per-unit rate — and because a straight line climbs at one fixed rate everywhere, it does not matter which two points you choose: a long section and a short section of the same line give the identical ratio.",
      "Both the sign and the size carry meaning. A positive gradient means y grows as x grows; a negative gradient means y shrinks; zero means no change (a flat line). The larger the number, the steeper the climb. Reading the gradient as 'units of y per 1 unit of x' is exactly what turns it into a real-world rate — dollars per item, metres per second, degrees per hour.",
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
    {
      title: "Interpret a negative rate",
      questionLatex:
        "\\text{A tank drains from 50 L to 20 L in 6 minutes. Find the gradient and say what it means.}",
      steps: [
        {
          explanation: "Gradient = change in volume ÷ change in time. The volume falls, so the rise is negative.",
          latex: "\\text{gradient} = \\frac{20 - 50}{6} = \\frac{-30}{6} = -5",
        },
        {
          explanation: "The negative sign means decreasing; the size is the rate.",
          latex: "-5 \\Rightarrow \\text{the tank loses 5 L per minute}",
        },
      ],
      finalAnswerLatex: "-5\\text{ L/min}",
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
      "",
      "2",
      "Gradient = 6 ÷ 3 = 2."
    ),
    answer(
      "y8-lin-grd-g3",
      "A line falls 4 units for every 2 units it runs. Find the gradient.",
      "",
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
      "",
      "3",
      "Gradient = 6 ÷ 2 = 3."
    ),
    answer(
      "y8-lin-grd-i2",
      "A line falls 10 units for every 5 units of run. Find the gradient.",
      "",
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
      "",
      "50",
      "Gradient = 200 ÷ 4 = 50 km/h."
    ),
    answer(
      "y8-lin-grd-i5",
      "A line passes through (0, 0) and (4, 8). Find the gradient.",
      "",
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
      "",
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
      "",
      "3",
      "Rise = 6, run = 2. Gradient = 6 ÷ 2 = 3."
    ),
    answer(
      "y8-lin-grd-m4",
      "Find the gradient of the line through (2, 5) and (6, 1).",
      "",
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
      "",
      "-50",
      "Volume decreases by 50 each hour, so the gradient is −50.",
      ["-50", "−50"]
    ),
    answer(
      "y8-lin-grd-m7",
      "Find the gradient of the line through (0, 3) and (4, 11).",
      "",
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
      "",
      "3",
      "Gradient = 15 ÷ 5 = 3."
    ),
    answer(
      "y8-lin-grd-m10",
      "Find the gradient of the line through (1, 7) and (3, 3).",
      "",
      "-2",
      "Rise = 3 − 7 = −4, run = 3 − 1 = 2. Gradient = −4 ÷ 2 = −2.",
      ["-2", "−2"]
    ),
  ],
  masteryQuizPool: [
    poolA(
      "y8-lin-grd-p1",
      "Rise = 12, run = 4. Find the gradient.",
      "",
      "3",
      "12 ÷ 4 = 3.",
      1
    ),
    poolA(
      "y8-lin-grd-p2",
      "Rise = 10, run = 5. Find the gradient.",
      "",
      "2",
      "10 ÷ 5 = 2.",
      1
    ),
    poolC(
      "y8-lin-grd-p3",
      "Gradient is calculated as…",
      "B",
      ["run ÷ rise", "rise ÷ run", "rise − run", "rise + run"],
      "Gradient = rise ÷ run.",
      1
    ),
    poolC(
      "y8-lin-grd-p4",
      "A horizontal line has gradient…",
      "C",
      ["1", "−1", "0", "undefined"],
      "No rise, so gradient = 0.",
      1
    ),
    poolA(
      "y8-lin-grd-p5",
      "A line rises 8 units over a run of 2 units. Find the gradient.",
      "",
      "4",
      "8 ÷ 2 = 4.",
      1
    ),
    poolA(
      "y8-lin-grd-p6",
      "A line falls 6 units over a run of 3 units. Find the gradient.",
      "",
      "-2",
      "A falling line is negative: −6 ÷ 3 = −2.",
      2,
      ["−2"]
    ),
    poolA(
      "y8-lin-grd-p7",
      "Find the gradient of the line through (0, 1) and (3, 7).",
      "",
      "2",
      "Rise 6, run 3. Gradient = 2.",
      2
    ),
    poolC(
      "y8-lin-grd-p8",
      "A line with a negative gradient…",
      "B",
      ["rises left to right", "falls left to right", "is horizontal", "is vertical"],
      "A negative gradient means the line falls from left to right.",
      2
    ),
    poolA(
      "y8-lin-grd-p9",
      "A car travels 300 km in 5 hours. Find the gradient of the distance-time graph in km/h.",
      "",
      "60",
      "300 ÷ 5 = 60 km/h.",
      2
    ),
    poolA(
      "y8-lin-grd-p10",
      "Find the gradient of the line through (2, 3) and (5, 12).",
      "",
      "3",
      "Rise 9, run 3. Gradient = 3.",
      2
    ),
    poolA(
      "y8-lin-grd-p11",
      "Find the gradient of the line through (1, 8) and (4, 2).",
      "",
      "-2",
      "Rise = 2 − 8 = −6, run = 3. Gradient = −2.",
      3,
      ["−2"]
    ),
    poolC(
      "y8-lin-grd-p12",
      "Which line is steepest?",
      "C",
      ["gradient = 2", "gradient = −1", "gradient = −4", "gradient = 3"],
      "Steepness uses absolute value: |−4| = 4 is largest.",
      3
    ),
    poolA(
      "y8-lin-grd-p13",
      "A tank fills at 25 litres per minute. What is the gradient of the volume-time graph?",
      "",
      "25",
      "Volume rises 25 each minute, so the gradient is 25.",
      3
    ),
    poolA(
      "y8-lin-grd-p14",
      "Find the gradient of the line through (−1, 2) and (3, 10).",
      "",
      "2",
      "Rise 8, run 4. Gradient = 2.",
      3
    ),
    poolA(
      "y8-lin-grd-p15",
      "A pool drains 30 litres per hour. What is the gradient of the volume-time graph?",
      "",
      "-30",
      "Volume falls 30 each hour, so the gradient is −30.",
      3,
      ["−30"]
    ),
    poolA(
      "y8-lin-grd-p16",
      "Find the gradient of the line through (2, 9) and (6, 1).",
      "",
      "-2",
      "Rise = −8, run = 4. Gradient = −2.",
      3,
      ["−2"]
    ),
    poolA(
      "y8-lin-grd-p17",
      "A line passes through (−2, −3) and (2, 5). Find the gradient.",
      "",
      "2",
      "Rise = 5 − (−3) = 8, run = 2 − (−2) = 4. Gradient = 2.",
      4
    ),
    poolA(
      "y8-lin-grd-p18",
      "A line passes through (3, 11) and (8, 1). Find the gradient.",
      "",
      "-2",
      "Rise = −10, run = 5. Gradient = −2.",
      4,
      ["−2"]
    ),
    poolA(
      "y8-lin-grd-p19",
      "A line has gradient 4 and passes through (1, 5) and (4, k). Find k.",
      "",
      "17",
      "Rise = k − 5 over run 3 equals 4, so k − 5 = 12 and k = 17.",
      4
    ),
    poolA(
      "y8-lin-grd-p20",
      "A line has gradient −3 and passes through (2, 10) and (5, k). Find k.",
      "",
      "1",
      "k − 10 over 3 equals −3, so k − 10 = −9 and k = 1.",
      4
    ),
    poolA(
      "y8-lin-grd-p21",
      "A hiker climbs 450 m of altitude over a horizontal distance of 1500 m. Find the gradient as a decimal.",
      "",
      "0.3",
      "450 ÷ 1500 = 0.3.",
      4,
      ["3/10"]
    ),
    poolA(
      "y8-lin-grd-p22",
      "A line passes through (1, 2) and (5, k) with gradient 3. Find k.",
      "",
      "14",
      "k − 2 over 4 equals 3, so k − 2 = 12 and k = 14.",
      5
    ),
    poolA(
      "y8-lin-grd-p23",
      "Points (2, 7), (4, 13) and (6, k) are collinear. Find k.",
      "",
      "19",
      "Gradient = 6 ÷ 2 = 3. From (4, 13), the next point 2 across rises 6: k = 13 + 6 = 19.",
      5
    ),
    poolA(
      "y8-lin-grd-p24",
      "A line through (−3, k) and (1, 5) has gradient 2. Find k.",
      "",
      "-3",
      "(5 − k) ÷ 4 = 2, so 5 − k = 8 and k = −3.",
      5,
      ["−3"]
    ),
    poolA(
      "y8-lin-grd-p25",
      "A phone is charged 5% every 4 minutes. What is the gradient of the charge-time graph in percent per minute? Give a decimal.",
      "",
      "1.25",
      "5 ÷ 4 = 1.25 percent per minute.",
      5,
      ["5/4"]
    ),
    poolA(
      "y8-lin-grd-p26",
      "A line has gradient −2 and passes through (0, 8). At what x-value does the line reach y = 0?",
      "",
      "4",
      "Using y = −2x + 8, set y = 0: 2x = 8, so x = 4.",
      5
    ),
  ],
  multiPartPractice: [
    {
      id: "y8-lin-grd-mp1",
      prompt:
        "A water tank holds 200 litres at the start. It drains so that after 4 minutes it holds 120 litres, with the volume falling at a steady rate. Volume V (litres) is graphed against time t (minutes).",
      latex: "",
      answer: "-20",
      hint: "Gradient = change in volume ÷ change in time. The starting value is the V-intercept.",
      explanation:
        "Part (a): gradient = (120 − 200) ÷ (4 − 0) = −80 ÷ 4 = −20 litres per minute. Part (b): the starting volume (t = 0) is 200 litres. Part (c): the rule is V = −20t + 200, so at t = 6, V = 80. Part (d): the tank is empty when V = 0, i.e. −20t + 200 = 0, giving t = 10 minutes.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the gradient of the volume-time graph (litres per minute).",
          marks: 2,
          answer: "-20",
          acceptedAnswers: ["−20"],
          hint: "Use (120 − 200) ÷ (4 − 0).",
          explanation: "Gradient = −80 ÷ 4 = −20 litres/min.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "State the starting volume (the V-intercept).",
          marks: 1,
          answer: "200",
          acceptedAnswers: [],
          hint: "The starting volume is at t = 0.",
          explanation: "At t = 0 the tank holds 200 litres.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Using V = −20t + 200, find the volume after 6 minutes.",
          marks: 1,
          answer: "80",
          acceptedAnswers: [],
          hint: "Substitute t = 6.",
          explanation: "V = −20(6) + 200 = −120 + 200 = 80 litres.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "After how many minutes is the tank empty (V = 0)?",
          marks: 2,
          answer: "10",
          acceptedAnswers: [],
          hint: "Solve −20t + 200 = 0.",
          explanation: "20t = 200, so t = 10 minutes.",
        },
      ],
    },
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
      "Reading a linear model is really translating between three views of the same thing: the rule y = mx + c, the table, and the graph. c is where you start (at x = 0) and m is how fast it changes, so every prediction is just 'start, then add the rate that many times.' Because the relationship is linear, a value between two known points can be read off by following the straight line (interpolation) and a value beyond them by continuing it (extrapolation) — reliable only while the real situation stays linear.",
      "Where two linear models cross, both give the same y for the same x — that intersection is the 'break-even' or same-value point. Find it by setting the two rules equal and solving for x, then substitute back for y. On a distance–time graph this is where two travellers meet; on a cost graph it is where two plans cost exactly the same.",
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
    {
      title: "Find where two plans cost the same (break-even)",
      questionLatex:
        "\\text{Plan A: }C = 2n + 10.\\text{ Plan B: }C = 4n.\\text{ For how many items }n\\text{ do they cost the same?}",
      steps: [
        {
          explanation: "At the break-even point both plans give the same cost, so set the rules equal.",
          latex: "2n + 10 = 4n",
        },
        {
          explanation: "Solve for n.",
          latex: "10 = 2n \\Rightarrow n = 5",
        },
        {
          explanation: "Check: both give the same cost at n = 5.",
          latex: "2(5)+10 = 20,\\quad 4(5) = 20\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "n = 5\\;(\\text{both cost }\\$20)",
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
      "",
      "10",
      "When x = 0, y = 10. The starting value (y-intercept) is 10."
    ),
    answer(
      "y8-lin-int-g3",
      "Cost rule: C = 4n + 8. Find C when n = 6.",
      "",
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
      "",
      "140",
      "C = 90 + 50 = 140. The total cost for 3 hours is $140."
    ),
    answer(
      "y8-lin-int-i2",
      "Rule: C = 5n + 20. Find C when n = 8.",
      "",
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
      "",
      "25",
      "C = 5 + 20 = 25."
    ),
    answer(
      "y8-lin-int-i5",
      "A distance-time graph has gradient 60 (km/h). How far does the object travel in 3 hours?",
      "",
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
      "",
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
      "",
      "75",
      "C = 60 + 15 = 75."
    ),
    answer(
      "y8-lin-int-m4",
      "What is the y-intercept of y = −3x + 24?",
      "",
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
      "",
      "200",
      "W = 250 − 50 = 200 kg."
    ),
    answer(
      "y8-lin-int-m7",
      "Rule: P = 12h − 4, where P = profit ($) and h = hours. Find P when h = 5.",
      "",
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
      "",
      "62",
      "F = 30 + 32 = 62°F."
    ),
    answer(
      "y8-lin-int-m10",
      "Rule: C = 7n + 3. For which n is C = 31?",
      "",
      "4",
      "7n = 28, so n = 4."
    ),
  ],
  masteryQuizPool: [
    poolA(
      "y8-lin-int-p1",
      "Rule: y = 3x + 8. What is the starting value when x = 0?",
      "",
      "8",
      "At x = 0, y = 8.",
      1
    ),
    poolA(
      "y8-lin-int-p2",
      "Rule: C = 5n + 10. Find C when n = 4.",
      "",
      "30",
      "C = 20 + 10 = 30.",
      1
    ),
    poolA(
      "y8-lin-int-p3",
      "Rule: D = 60t. Find D when t = 3.",
      "",
      "180",
      "D = 180 km.",
      1
    ),
    poolC(
      "y8-lin-int-p4",
      "A distance-time graph shows a horizontal line. What does this mean?",
      "C",
      ["Moving fast", "Moving slowly", "Standing still", "Speeding up"],
      "No change in distance means the object is stationary.",
      1
    ),
    poolA(
      "y8-lin-int-p5",
      "Rule: C = 4n + 6. Find C when n = 5.",
      "",
      "26",
      "C = 20 + 6 = 26.",
      1
    ),
    poolA(
      "y8-lin-int-p6",
      "A hire car costs $40 plus $20 per hour: C = 20h + 40. Find C when h = 3.",
      "",
      "100",
      "C = 60 + 40 = 100.",
      2
    ),
    poolC(
      "y8-lin-int-p7",
      "A cost graph passes through (0, 10) and (2, 16). What is the gradient?",
      "B",
      ["2", "3", "6", "10"],
      "Gradient = (16 − 10) ÷ (2 − 0) = 3.",
      2
    ),
    poolA(
      "y8-lin-int-p8",
      "Rule: C = 6n + 12. Find C when n = 8.",
      "",
      "60",
      "C = 48 + 12 = 60.",
      2
    ),
    poolA(
      "y8-lin-int-p9",
      "What is the y-intercept of y = −2x + 18?",
      "",
      "18",
      "At x = 0, y = 18.",
      2
    ),
    poolA(
      "y8-lin-int-p10",
      "A distance-time graph has gradient 70 km/h. How far is travelled in 4 hours?",
      "",
      "280",
      "Distance = 70 × 4 = 280 km.",
      2
    ),
    poolA(
      "y8-lin-int-p11",
      "Rule: C = 8n + 15. For which n is C = 95?",
      "",
      "10",
      "8n = 80, so n = 10.",
      3
    ),
    poolA(
      "y8-lin-int-p12",
      "Rule: W = 300 − 4d. Find W when d = 25.",
      "",
      "200",
      "W = 300 − 100 = 200.",
      3
    ),
    poolC(
      "y8-lin-int-p13",
      "Rule: C = 12n + 50 models a job: $50 call-out plus an hourly rate. What does 12 represent?",
      "B",
      ["The call-out fee", "The hourly rate ($/hour)", "The total cost", "The number of hours"],
      "The gradient 12 is the rate of change: $12 per hour.",
      3
    ),
    poolA(
      "y8-lin-int-p14",
      "A phone plan costs $15 per month plus $0.20 per call: C = 0.20c + 15. Find C for 40 calls.",
      "",
      "23",
      "C = 8 + 15 = 23.",
      3
    ),
    poolA(
      "y8-lin-int-p15",
      "Rule: P = 15h − 20. Find P when h = 6.",
      "",
      "70",
      "P = 90 − 20 = 70.",
      3
    ),
    poolA(
      "y8-lin-int-p16",
      "Rule: F = 2C + 30. Find F when C = 20.",
      "",
      "70",
      "F = 40 + 30 = 70.",
      3
    ),
    poolA(
      "y8-lin-int-p17",
      "Two phone plans: A is C = 0.10t + 30 and B is C = 0.20t + 20. For how many texts t do they cost the same?",
      "",
      "100",
      "0.10t + 30 = 0.20t + 20 gives 10 = 0.10t, so t = 100.",
      4
    ),
    poolA(
      "y8-lin-int-p18",
      "A gym costs $25 joining plus $12 per visit: C = 12v + 25. After how many visits does the total reach $169?",
      "",
      "12",
      "12v = 144, so v = 12.",
      4
    ),
    poolA(
      "y8-lin-int-p19",
      "A candle is 20 cm tall and burns 4 cm per hour: H = 20 − 4t. After how many hours is it fully burnt (H = 0)?",
      "",
      "5",
      "4t = 20, so t = 5 hours.",
      4
    ),
    poolA(
      "y8-lin-int-p20",
      "A taxi charges a $4 flag fall plus $2 per km. A trip costs $30. How many km was it?",
      "",
      "13",
      "2k = 26, so k = 13 km.",
      4
    ),
    poolA(
      "y8-lin-int-p21",
      "A graph passes through (0, 24) and (4, 8). Find its gradient.",
      "",
      "-4",
      "Gradient = (8 − 24) ÷ 4 = −16 ÷ 4 = −4.",
      4,
      ["−4"]
    ),
    poolA(
      "y8-lin-int-p22",
      "A tank starts at 5 L and fills at 3 L/min while another starts at 50 L and drains at 2 L/min. After how many minutes are the volumes equal?",
      "",
      "9",
      "5 + 3t = 50 − 2t gives 5t = 45, so t = 9 minutes.",
      5
    ),
    poolA(
      "y8-lin-int-p23",
      "At the time the two tanks (5 + 3t and 50 − 2t) have equal volume, what is that volume in litres?",
      "",
      "32",
      "At t = 9: V = 5 + 3(9) = 32 litres (and 50 − 2(9) = 32).",
      5
    ),
    poolA(
      "y8-lin-int-p24",
      "A plumber charges C = 45n + 80. A job cost $440. How many hours n did it take?",
      "",
      "8",
      "45n = 360, so n = 8 hours.",
      5
    ),
    poolA(
      "y8-lin-int-p25",
      "A car's fuel follows F = 60 − 0.08d litres, where d is km driven. After how many km is the fuel down to 36 L?",
      "",
      "300",
      "0.08d = 24, so d = 300 km.",
      5
    ),
    poolA(
      "y8-lin-int-p26",
      "Plan A: C = 50 + 8m. Plan B: C = 20 + 14m. Beyond how many months m is plan A cheaper than plan B?",
      "",
      "5",
      "50 + 8m < 20 + 14m gives 30 < 6m, so m > 5. Plan A is cheaper once m exceeds 5 months.",
      5
    ),
  ],
  multiPartPractice: [
    {
      id: "y8-lin-int-mp1",
      prompt:
        "A scooter hire company charges a fixed fee plus an hourly rate. The total cost is modelled by C = 9h + 20, where C is the cost in dollars and h is the number of hours.",
      latex: "",
      answer: "20",
      hint: "The fixed fee is the C-value when h = 0; the hourly rate is the gradient. Substitute or solve as needed.",
      explanation:
        "Part (a): at h = 0, C = 20, so the fixed fee is $20. Part (b): the gradient 9 is the hourly rate, $9 per hour. Part (c): for h = 5, C = 9(5) + 20 = 65. Part (d): solving 9h + 20 = 110 gives h = 10.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "State the fixed fee (the cost when h = 0).",
          marks: 1,
          answer: "20",
          acceptedAnswers: [],
          hint: "Substitute h = 0.",
          explanation: "C = 9(0) + 20 = 20 dollars.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "State the hourly rate in dollars per hour.",
          marks: 1,
          answer: "9",
          acceptedAnswers: [],
          hint: "The hourly rate is the gradient (coefficient of h).",
          explanation: "The gradient is 9, so the rate is $9 per hour.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the cost of hiring the scooter for 5 hours.",
          marks: 1,
          answer: "65",
          acceptedAnswers: [],
          hint: "Substitute h = 5.",
          explanation: "C = 9(5) + 20 = 45 + 20 = 65 dollars.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "For how many hours can the scooter be hired for a total of $110?",
          marks: 2,
          answer: "10",
          acceptedAnswers: [],
          hint: "Solve 9h + 20 = 110.",
          explanation: "9h = 90, so h = 10 hours.",
        },
      ],
    },
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

function addLinearGraphVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = linearGraphQuestionVisuals[question.id];
  return visual ? { ...question, ...visual } : question;
}

function addLinearGraphVisuals(content: LessonContent): LessonContent {
  return {
    ...content,
    guidedPractice: content.guidedPractice.map(addLinearGraphVisual),
    independentPractice: content.independentPractice.map(addLinearGraphVisual),
    masteryQuiz: content.masteryQuiz.map(addLinearGraphVisual),
    masteryQuizPool: content.masteryQuizPool?.map(addLinearGraphVisual),
    multiPartPractice: content.multiPartPractice?.map(addLinearGraphVisual),
  };
}

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
  const scopedContent = addLinearGraphVisuals(content);

  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...scopedContent,
  };
}
