// Year 12 Standard 1 — Unit 5 "Simultaneous Linear Equations" — Wave 2 authored sections.
//
//   5A Linear Functions                  (linear-functions)
//   5C Simultaneous Equations Graphically(simultaneous-equations-graphical)
//   5E Break-Even Analysis               (break-even-analysis)
//
// Surviving sections 5B (linear-relationships-modelling) and 5D (simultaneous-equations-
// context) keep their existing overrides. Same authoring pattern as Wave 1
// (lib/lessons/year12Standard1Rates.ts): Feynman teaching, 4 guided / 5 independent /
// 10 mastery with EXACTLY 1 / 1 / 3 MCQs per section (so normalize's enforceChoiceCount
// leaves authored questions intact), authored cognitive-demand difficulty, markable answers.
// IDs are unprefixed; `y12s1-` is auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";

const UNIT = "simultaneous-linear-equations";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  hint: string,
  explanation: string,
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    acceptedAnswers: [],
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

// ── 5A Linear Functions ──────────────────────────────────────────────────────────────
export function year12Standard1LinearFunctionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "linear-functions"
  ) {
    return null;
  }
  return {
    description:
      "Graph and interpret linear functions y = mx + b: gradient, y-intercept, x-intercept, and gradient from two points.",
    learningIntention:
      "Read the gradient and intercepts of a linear function and find the gradient from two points.",
    successCriteria: [
      "Identify the gradient and y-intercept directly from y = mx + b.",
      "Decide whether a line rises, falls or is horizontal from the sign of the gradient.",
      "Find the gradient from two points using rise over run.",
      "Find the x-intercept by setting y = 0.",
    ],
    teaching: {
      paragraphs: [
        "A linear function y = mx + b is a recipe for a straight line, and the two letters do two different jobs. b is the y-intercept — where the line crosses the y-axis, which is just the value of y when x = 0 (start here). m is the gradient — the steepness — telling you how much y changes every time x goes up by 1. Read them straight off: in y = 3x + 2, the line starts at 2 and climbs 3 for every step right.",
        "The SIGN of the gradient is the line's mood. Positive m rises left-to-right, negative m falls, and m = 0 is flat (a horizontal line). A bigger size of m (steeper) means faster change. So you can describe a line before plotting a single point, just from m and b.",
        "When you only have two points, the gradient is rise over run: how much the y changes divided by how much the x changes, m = (y₂ − y₁)/(x₂ − x₁). Keep the points in the same order top and bottom; swapping one but not the other flips the sign. A common slip is run-over-rise — always vertical change ÷ horizontal change.",
        "The x-intercept is where the line crosses the x-axis, which is where y = 0. Set y to 0 and solve for x — do not confuse it with the y-intercept b. Intercepts are the two anchor points that make a line quick to sketch.",
      ],
      latexBlocks: [
        "y = mx + b\\quad(m = \\text{gradient},\\ b = y\\text{-intercept})",
        "m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}",
        "\\text{x-intercept: set } y = 0 \\text{ and solve for } x",
      ],
    },
    workedExamples: [
      {
        title: "Read gradient and y-intercept",
        questionLatex: "\\text{For } y = 2x - 3\\text{, state the gradient and y-intercept, then find } y \\text{ at } x = 4.",
        steps: [
          { explanation: "Compare with y = mx + b.", latex: "m = 2,\\quad b = -3" },
          { explanation: "Substitute x = 4.", latex: "y = 2(4) - 3 = 5" },
        ],
        finalAnswerLatex: "m = 2,\\ b = -3,\\ y = 5",
      },
      {
        title: "Gradient from two points",
        questionLatex: "\\text{Find the gradient of the line through } (1, 5) \\text{ and } (3, 11).",
        steps: [
          { explanation: "Rise over run, keeping the order consistent.", latex: "m = \\frac{11 - 5}{3 - 1} = \\frac{6}{2} = 3" },
        ],
        finalAnswerLatex: "m = 3",
      },
    ],
    guidedPractice: [
      mcq(
        "lf-g1",
        "In the linear function y = mx + b, what does b represent?",
        "B",
        ["The gradient", "The y-intercept", "The x-intercept", "The steepness"],
        1,
        "b is the value of y when x = 0.",
        "b is the y-intercept — where the line crosses the y-axis (the value of y when x = 0). m is the gradient."
      ),
      ans(
        "lf-g2",
        "For y = 3x + 2, find y when x = 5.",
        "y = 3(5) + 2",
        "17",
        2,
        "Substitute x = 5 into the function.",
        "y = 3 × 5 + 2 = 15 + 2 = 17."
      ),
      ans(
        "lf-g3",
        "State the gradient of the line y = 4x − 7.",
        "y = 4x - 7",
        "4",
        2,
        "The gradient is the coefficient of x.",
        "Comparing with y = mx + b, the gradient m = 4."
      ),
      ans(
        "lf-g4",
        "State the y-intercept of the line y = −2x + 9.",
        "y = -2x + 9",
        "9",
        2,
        "The y-intercept is the constant term b.",
        "Comparing with y = mx + b, the y-intercept b = 9 (the value of y when x = 0)."
      ),
    ],
    independentPractice: [
      ans(
        "lf-i1",
        "Find the gradient of the line through (2, 5) and (4, 11).",
        "m = \\frac{11 - 5}{4 - 2}",
        "3",
        3,
        "Rise over run: change in y ÷ change in x.",
        "m = (11 − 5) ÷ (4 − 2) = 6 ÷ 2 = 3."
      ),
      ans(
        "lf-i2",
        "Find the x-intercept of the line y = 3x − 12.",
        "0 = 3x - 12",
        "4",
        3,
        "Set y = 0 and solve for x.",
        "Set y = 0: 0 = 3x − 12, so 3x = 12 and x = 4. The x-intercept is at x = 4."
      ),
      mcq(
        "lf-i3",
        "Which of these lines is decreasing (falls from left to right)?",
        "B",
        ["y = 2x + 1", "y = −x + 4", "y = 5", "y = 3x"],
        3,
        "A decreasing line has a negative gradient.",
        "A line falls when its gradient is negative. Only y = −x + 4 has a negative gradient (−1); y = 5 is horizontal and the others rise."
      ),
      ans(
        "lf-i4",
        "A line has gradient −2 and passes through (0, 7). Find y when x = 3.",
        "y = -2x + 7",
        "1",
        3,
        "The point (0, 7) gives the y-intercept; build the equation then substitute.",
        "Through (0, 7) with gradient −2 the line is y = −2x + 7. At x = 3: y = −2(3) + 7 = 1."
      ),
      ans(
        "lf-i5",
        "Find the gradient of the line through (1, 4) and (3, 4).",
        "m = \\frac{4 - 4}{3 - 1}",
        "0",
        3,
        "What is the change in y between the points?",
        "m = (4 − 4) ÷ (3 − 1) = 0 ÷ 2 = 0. The y-values are equal, so the line is horizontal (gradient 0)."
      ),
    ],
    masteryQuiz: [
      ans(
        "lf-m1",
        "State the gradient of the line y = −5x + 2.",
        "y = -5x + 2",
        "-5",
        2,
        "The gradient is the coefficient of x, including its sign.",
        "Comparing with y = mx + b, the gradient m = −5.",
        ["−5"]
      ),
      mcq(
        "lf-m2",
        "A line passes through (0, −3) with gradient 2. What is its equation?",
        "A",
        ["y = 2x − 3", "y = −3x + 2", "y = 2x + 3", "y = 3x − 2"],
        3,
        "The point (0, −3) is the y-intercept.",
        "Gradient 2 and y-intercept −3 give y = 2x − 3. Option B swaps gradient and intercept; C has the wrong intercept sign."
      ),
      ans(
        "lf-m3",
        "Find the gradient of the line through (−1, 2) and (2, 8).",
        "m = \\frac{8 - 2}{2 - (-1)}",
        "2",
        3,
        "Rise over run; mind the negative coordinate.",
        "m = (8 − 2) ÷ (2 − (−1)) = 6 ÷ 3 = 2."
      ),
      ans(
        "lf-m4",
        "Find the x-intercept of the line y = −4x + 12.",
        "0 = -4x + 12",
        "3",
        3,
        "Set y = 0 and solve for x.",
        "0 = −4x + 12, so 4x = 12 and x = 3. The x-intercept is at x = 3."
      ),
      mcq(
        "lf-m5",
        "Which statement about the line y = −3x + 5 is correct?",
        "C",
        [
          "It rises with y-intercept 5",
          "It falls with y-intercept −3",
          "It falls with y-intercept 5",
          "It is horizontal",
        ],
        3,
        "Read the sign of the gradient and the constant term.",
        "Gradient −3 (negative) means it falls; the constant 5 is the y-intercept. So it falls with y-intercept 5."
      ),
      ans(
        "lf-m6",
        "For y = 0.5x + 4, find y when x = 10.",
        "y = 0.5(10) + 4",
        "9",
        2,
        "Substitute x = 10.",
        "y = 0.5 × 10 + 4 = 5 + 4 = 9."
      ),
      ans(
        "lf-m7",
        "A line passes through (2, 7) and (5, 16). Find its y-intercept.",
        "m = \\frac{16 - 7}{5 - 2}",
        "1",
        4,
        "Find the gradient first, then work back to where x = 0.",
        "Gradient = (16 − 7) ÷ (5 − 2) = 3. Using y = 3x + b through (2, 7): 7 = 3(2) + b, so b = 1. The y-intercept is 1.",
        ["b = 1", "(0, 1)"]
      ),
      mcq(
        "lf-m8",
        "A line passes through (0, 5) and (2, 9). What is its gradient?",
        "A",
        ["2", "4", "−2", "0.5"],
        3,
        "Rise over run between the two points.",
        "m = (9 − 5) ÷ (2 − 0) = 4 ÷ 2 = 2. Option B forgets to divide by the run."
      ),
      ans(
        "lf-m9",
        "A line passes through (0, 20) and (4, 60). Find its gradient.",
        "m = \\frac{60 - 20}{4 - 0}",
        "10",
        4,
        "Rise over run; this gradient is the constant rate of change.",
        "m = (60 − 20) ÷ (4 − 0) = 40 ÷ 4 = 10 — the line increases by 10 for each unit of x."
      ),
      ans(
        "lf-m10",
        "A line falls 6 units over a run of 3 units. Find its gradient.",
        "m = \\frac{-6}{3}",
        "-2",
        4,
        "A fall makes the rise negative.",
        "Falling 6 means a rise of −6 over a run of 3: m = −6 ÷ 3 = −2 (negative because the line falls).",
        ["−2"]
      ),
    ],
    commonMistakes: [
      { mistake: "Swapping the gradient and the y-intercept.", fix: "In y = mx + b, m multiplies x (gradient) and b stands alone (y-intercept)." },
      { mistake: "Using run over rise for the gradient.", fix: "Gradient = rise ÷ run = change in y ÷ change in x." },
      { mistake: "Confusing the x-intercept with the y-intercept.", fix: "x-intercept: set y = 0; y-intercept: the value of b (x = 0)." },
      { mistake: "Dropping the negative sign of a falling gradient.", fix: "A line that falls has a negative gradient." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 5C Simultaneous Equations Graphically ────────────────────────────────────────────
export function year12Standard1SimultaneousGraphicalLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "simultaneous-equations-graphical"
  ) {
    return null;
  }
  const twoLineGraph = (
    description: string,
    a: { m: number; b: number; label: string },
    c: { m: number; b: number; label: string },
    bounds: { xMax: number; yMax: number }
  ) => ({
    description,
    xMin: 0,
    xMax: bounds.xMax,
    yMin: 0,
    yMax: bounds.yMax,
    xStep: 1,
    yStep: Math.max(1, Math.round(bounds.yMax / 6)),
    showGrid: true,
    xAxisLabel: "x",
    yAxisLabel: "y",
    lines: [
      { kind: "linear" as const, m: a.m, b: a.b, label: a.label },
      { kind: "linear" as const, m: c.m, b: c.b, label: c.label },
    ],
  });
  const graphA = twoLineGraph(
    "Two lines on the same axes, y = x + 1 and y = −x + 5, crossing at the point (2, 3).",
    { m: 1, b: 1, label: "y = x + 1" },
    { m: -1, b: 5, label: "y = -x + 5" },
    { xMax: 6, yMax: 8 }
  );
  const graphB = twoLineGraph(
    "Two lines on the same axes, y = x − 2 and y = −0.5x + 4, crossing at the point (4, 2).",
    { m: 1, b: -2, label: "y = x - 2" },
    { m: -0.5, b: 4, label: "y = -0.5x + 4" },
    { xMax: 8, yMax: 8 }
  );
  const graphC = twoLineGraph(
    "Two lines on the same axes, y = 2x − 2 and y = −x + 7, crossing at the point (3, 4).",
    { m: 2, b: -2, label: "y = 2x - 2" },
    { m: -1, b: 7, label: "y = -x + 7" },
    { xMax: 6, yMax: 10 }
  );
  return {
    description:
      "Solve a pair of simultaneous linear equations from their graph by reading the point of intersection, and recognise when there is no solution or infinitely many.",
    learningIntention:
      "Read the solution of two simultaneous linear equations as the point where their graphs intersect.",
    successCriteria: [
      "Read the solution of a simultaneous pair as the coordinates of the intersection point.",
      "Verify a proposed solution by substituting into both equations.",
      "Recognise parallel lines as having no solution.",
      "Recognise identical lines as having infinitely many solutions.",
    ],
    teaching: {
      paragraphs: [
        "Two linear equations drawn on the same axes tell one story each; solving them simultaneously asks where BOTH stories are true at once. On a graph that is exactly the point where the two lines cross. At the intersection, the same (x, y) sits on both lines, so it satisfies both equations — that single point is the solution.",
        "Reading the solution means reading the coordinates of the crossing point: go across for x, up for y, and write it as (x, y). The classic slip is to read only one number, or to swap x and y. The intersection is not a y-intercept and not an x-intercept — it is wherever the lines actually meet.",
        "You can check a solution without the graph: substitute the x and y into BOTH equations. If both are true, it is the solution; if only one works, it is not. This is the same idea as the graph — the true solution is the one point lying on both lines.",
        "Sometimes the lines never cross. Parallel lines (same gradient, different y-intercept) stay the same distance apart forever, so there is NO solution. If the two equations are really the same line, they overlap completely and every point is a solution — infinitely many. Different gradients always cross exactly once.",
      ],
      latexBlocks: [
        "\\text{solution} = \\text{point where the two lines intersect } (x, y)",
        "\\text{check: substitute } (x, y) \\text{ into BOTH equations}",
        "\\text{parallel (equal gradient)} \\Rightarrow \\text{no solution}",
      ],
    },
    workedExamples: [
      {
        title: "Read the solution from the intersection",
        questionLatex: "\\text{The lines } y = x + 1 \\text{ and } y = -x + 5 \\text{ are graphed. Find the solution.}",
        steps: [
          { explanation: "Find where the two lines cross by reading the graph.", latex: "\\text{they cross at } (2, 3)" },
          { explanation: "The crossing point satisfies both equations, so it is the solution.", latex: "x = 2,\\ y = 3" },
        ],
        finalAnswerLatex: "(2, 3)",
        cartesianGraph: graphA,
      },
      {
        title: "Parallel lines — no solution",
        questionLatex: "\\text{How many solutions do } y = 2x + 1 \\text{ and } y = 2x - 3 \\text{ have?}",
        steps: [
          { explanation: "Both have gradient 2 but different y-intercepts, so they are parallel.", latex: "m = 2 = 2,\\ b: 1 \\ne -3" },
          { explanation: "Parallel lines never cross.", latex: "\\text{no solution}" },
        ],
        finalAnswerLatex: "\\text{No solution}",
      },
    ],
    guidedPractice: [
      mcq(
        "simg-g1",
        "When two linear equations are graphed, the solution of the pair is:",
        "B",
        [
          "where each line crosses the y-axis",
          "the point where the two lines intersect",
          "where each line crosses the x-axis",
          "the steeper of the two lines",
        ],
        1,
        "The solution must lie on both lines at once.",
        "The solution is the single point that lies on both lines — where they intersect. That point satisfies both equations."
      ),
      ans(
        "simg-g2",
        "Using the graph, state the x-value of the point where the two lines cross.",
        "\\text{read across}",
        "2",
        2,
        "Read across from the intersection to the x-axis.",
        "The lines cross at (2, 3), so the x-value of the intersection is 2.",
        [],
        { cartesianGraph: graphA }
      ),
      ans(
        "simg-g3",
        "Using the graph, state the y-value of the point where the two lines cross.",
        "\\text{read up}",
        "3",
        2,
        "Read up from the intersection to the y-axis.",
        "The lines cross at (2, 3), so the y-value of the intersection is 3.",
        [],
        { cartesianGraph: graphA }
      ),
      ans(
        "simg-g4",
        "Does the point (2, 3) satisfy the equation y = x + 1? Answer yes or no.",
        "3 = 2 + 1",
        "yes",
        2,
        "Substitute x = 2 and check whether y equals 3.",
        "Substituting x = 2: y = 2 + 1 = 3, which matches, so yes, (2, 3) satisfies y = x + 1.",
        ["Yes"]
      ),
    ],
    independentPractice: [
      ans(
        "simg-i1",
        "Two lines intersect at the point (4, 2). Write the solution of the simultaneous pair as coordinates.",
        "(x, y)",
        "(4,2)",
        2,
        "The solution is the intersection point written (x, y).",
        "The intersection (4, 2) is the point on both lines, so the solution is (4, 2).",
        ["(4, 2)", "4,2", "x=4, y=2"]
      ),
      mcq(
        "simg-i2",
        "Two lines have the same gradient but different y-intercepts. How many solutions does the pair have?",
        "C",
        ["Exactly one", "Two", "None", "Infinitely many"],
        3,
        "Same gradient means the lines are parallel.",
        "Equal gradients with different y-intercepts means the lines are parallel — they never cross, so there is no solution."
      ),
      ans(
        "simg-i3",
        "Using the graph, state the x-value of the solution (the intersection point).",
        "\\text{read across}",
        "4",
        3,
        "Read across from where the two lines meet.",
        "The two lines meet at (4, 2), so the x-value of the solution is 4.",
        [],
        { cartesianGraph: graphB }
      ),
      ans(
        "simg-i4",
        "Verify whether (1, 5) is the solution of y = 2x + 3 and y = −x + 6. Answer yes or no.",
        "5 = 2(1)+3,\\ 5 = -1+6",
        "yes",
        3,
        "Substitute into BOTH equations; it must satisfy both.",
        "y = 2(1) + 3 = 5 ✓ and y = −(1) + 6 = 5 ✓. Both are satisfied, so yes, (1, 5) is the solution.",
        ["Yes"]
      ),
      ans(
        "simg-i5",
        "The lines y = x and y = 6 − x cross at one point. Find the x-value of that point.",
        "x = 6 - x",
        "3",
        3,
        "At the intersection both expressions for y are equal.",
        "Setting the lines equal: x = 6 − x, so 2x = 6 and x = 3 (then y = 3). The intersection is at x = 3."
      ),
    ],
    masteryQuiz: [
      ans(
        "simg-m1",
        "Using the graph, write the solution of the simultaneous pair as coordinates.",
        "(x, y)",
        "(3,4)",
        3,
        "Read the intersection point and write it (x, y).",
        "The lines cross at (3, 4), so the solution is (3, 4).",
        ["(3, 4)", "3,4", "x=3, y=4"],
        { cartesianGraph: graphC }
      ),
      mcq(
        "simg-m2",
        "Two equations turn out to describe exactly the same line. How many solutions does the pair have?",
        "D",
        ["None", "Exactly one", "Exactly two", "Infinitely many"],
        3,
        "Identical lines overlap completely.",
        "If both equations are the same line, every point lies on both, so there are infinitely many solutions."
      ),
      ans(
        "simg-m3",
        "Solve simultaneously: y = 2x and y = x + 4. Give the x-value.",
        "2x = x + 4",
        "4",
        3,
        "Set the two expressions for y equal.",
        "2x = x + 4, so x = 4 (and y = 8). The solution is (4, 8); the x-value is 4."
      ),
      mcq(
        "simg-m4",
        "Which pair of equations has NO solution?",
        "B",
        [
          "y = 2x + 1 and y = −x + 4",
          "y = 3x + 2 and y = 3x − 5",
          "y = x and y = 2x",
          "y = 4x + 1 and y = x + 1",
        ],
        3,
        "No solution means parallel: equal gradients, different intercepts.",
        "y = 3x + 2 and y = 3x − 5 both have gradient 3 with different intercepts, so they are parallel — no solution. The other pairs have different gradients and cross once."
      ),
      ans(
        "simg-m5",
        "Using the graph, state the y-value of the intersection point.",
        "\\text{read up}",
        "2",
        3,
        "Read up from the crossing point to the y-axis.",
        "The lines cross at (4, 2), so the y-value of the intersection is 2.",
        [],
        { cartesianGraph: graphB }
      ),
      ans(
        "simg-m6",
        "Two lines cross at (−1, 2). A student writes the solution as x = 2, y = −1. What is the correct x-value?",
        "(-1, 2)",
        "-1",
        3,
        "The intersection is (x, y) = (−1, 2); do not swap the coordinates.",
        "The crossing point is (−1, 2), so x = −1 and y = 2. The student swapped the coordinates; the correct x-value is −1.",
        ["−1"]
      ),
      mcq(
        "simg-m7",
        "Two distinct lines have different gradients. How many solutions does the simultaneous pair have?",
        "A",
        ["Exactly one", "None", "Infinitely many", "Two"],
        3,
        "Different gradients must cross.",
        "Lines with different gradients cross at exactly one point, so the pair has exactly one solution."
      ),
      ans(
        "simg-m8",
        "Solve simultaneously: y = 3x − 1 and y = x + 5. Give the x-value.",
        "3x - 1 = x + 5",
        "3",
        4,
        "Set the expressions for y equal and solve.",
        "3x − 1 = x + 5, so 2x = 6 and x = 3 (then y = 8). The x-value of the solution is 3."
      ),
      ans(
        "simg-m9",
        "Solve simultaneously: y = −2x + 10 and y = x + 1. Give the x-value.",
        "-2x + 10 = x + 1",
        "3",
        4,
        "Set the two expressions for y equal.",
        "−2x + 10 = x + 1, so 9 = 3x and x = 3 (then y = 4). The x-value of the solution is 3."
      ),
      ans(
        "simg-m10",
        "The lines y = x + 2 and y = −x + 8 cross at one point. Write the solution as coordinates.",
        "x + 2 = -x + 8",
        "(3,5)",
        4,
        "Set the expressions equal to find x, then find y.",
        "x + 2 = −x + 8, so 2x = 6 and x = 3; then y = 3 + 2 = 5. The solution is (3, 5).",
        ["(3, 5)", "3,5", "x=3, y=5"]
      ),
    ],
    commonMistakes: [
      { mistake: "Reading only the x-value (or only the y-value) of the intersection.", fix: "The solution is a point: read both coordinates and write (x, y)." },
      { mistake: "Swapping the x and y of the intersection point.", fix: "Read across for x, up for y; (−1, 2) is x = −1, y = 2." },
      { mistake: "Thinking parallel lines eventually meet.", fix: "Equal gradients never cross — no solution." },
      { mistake: "Confusing the intersection with the intercepts.", fix: "The solution is where the two lines meet each other, not where they meet an axis." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 5E Break-Even Analysis ───────────────────────────────────────────────────────────
export function year12Standard1BreakEvenAnalysisLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "break-even-analysis"
  ) {
    return null;
  }
  const breakEvenGraph = {
    description:
      "Cost and revenue lines on the same axes: Cost C = 200 + 5x and Revenue R = 15x, crossing at the break-even point (20, 300).",
    xMin: 0,
    xMax: 40,
    yMin: 0,
    yMax: 600,
    xStep: 5,
    yStep: 100,
    showGrid: true,
    xAxisLabel: "Units (x)",
    yAxisLabel: "Dollars ($)",
    lines: [
      { kind: "linear" as const, m: 5, b: 200, label: "Cost" },
      { kind: "linear" as const, m: 15, b: 0, label: "Revenue" },
    ],
  };
  return {
    description:
      "Find and interpret the break-even point where revenue equals cost, and identify profit and loss regions.",
    learningIntention:
      "Find the break-even point by setting revenue equal to cost, and interpret profit and loss either side of it.",
    successCriteria: [
      "Set up cost as a fixed cost plus a variable cost per unit, and revenue as price per unit times units.",
      "Find the break-even quantity by setting revenue equal to cost and solving.",
      "Interpret regions below and above break-even as loss and profit.",
      "Calculate the profit or loss at a given number of units.",
    ],
    teaching: {
      paragraphs: [
        "Every business has two competing lines: what it spends (cost) and what it earns (revenue). Cost is usually a fixed cost you pay no matter what — rent, equipment — plus a variable cost for each unit you make. Revenue is simpler: the price times the number of units sold. The whole question of break-even is: when do these two finally meet?",
        "The BREAK-EVEN point is where revenue equals cost (R = C). At that exact number of units there is no profit and no loss — every dollar earned has covered a dollar spent. Find it by setting the two expressions equal and solving for the number of units, just like a simultaneous-equation intersection.",
        "Either side of break-even tells the real story. BELOW the break-even quantity, cost is still ahead of revenue, so the business makes a LOSS. ABOVE it, revenue overtakes cost, so it makes a PROFIT. On a graph the revenue line starts lower, crosses the cost line at break-even, and stays above it after — profit is the gap between them.",
        "To find the actual profit (or loss) at some number of units, work out revenue and cost separately and subtract: profit = revenue − cost. A negative answer is a loss. A frequent error is thinking break-even means costs are zero — it does not; it means costs are exactly covered.",
      ],
      latexBlocks: [
        "\\text{Cost } C = \\text{fixed cost} + (\\text{cost per unit}) \\times x",
        "\\text{Break-even: set } R = C \\text{ and solve for } x",
        "\\text{Profit} = \\text{Revenue} - \\text{Cost}\\ (\\text{negative} = \\text{loss})",
      ],
    },
    workedExamples: [
      {
        title: "Find the break-even quantity",
        questionLatex: "\\text{Cost } C = 200 + 5x,\\ \\text{Revenue } R = 15x.\\ \\text{Find the break-even number of units.}",
        steps: [
          { explanation: "Set revenue equal to cost.", latex: "15x = 200 + 5x" },
          { explanation: "Solve for x.", latex: "10x = 200 \\Rightarrow x = 20" },
        ],
        finalAnswerLatex: "x = 20\\text{ units}",
        cartesianGraph: breakEvenGraph,
      },
      {
        title: "Profit above break-even",
        questionLatex: "\\text{For the same business, find the profit when } x = 30.",
        steps: [
          { explanation: "Find revenue and cost at x = 30.", latex: "R = 15(30) = 450,\\ C = 200 + 5(30) = 350" },
          { explanation: "Profit = revenue − cost.", latex: "450 - 350 = \\$100" },
        ],
        finalAnswerLatex: "\\$100\\text{ profit}",
      },
    ],
    guidedPractice: [
      mcq(
        "bev-g1",
        "The break-even point of a business is where:",
        "B",
        ["the cost is zero", "the revenue equals the cost", "the profit is greatest", "the revenue is zero"],
        1,
        "Break-even means costs are exactly covered.",
        "Break-even is where revenue equals cost (R = C): no profit and no loss. It does not mean cost is zero."
      ),
      ans(
        "bev-g2",
        "Cost is C = 100 + 4x and revenue is R = 9x. Find the break-even number of units.",
        "9x = 100 + 4x",
        "20",
        2,
        "Set R = C and solve for x.",
        "9x = 100 + 4x, so 5x = 100 and x = 20 units to break even."
      ),
      ans(
        "bev-g3",
        "For R = 9x, find the revenue at the break-even quantity of 20 units.",
        "R = 9(20)",
        "180",
        2,
        "Substitute x = 20 into the revenue.",
        "R = 9 × 20 = $180 (which also equals the cost at break-even).",
        ["$180"]
      ),
      ans(
        "bev-g4",
        "A business has cost C = 50 + 2x. Find the total cost of producing 10 units.",
        "C = 50 + 2(10)",
        "70",
        2,
        "Substitute x = 10 into the cost.",
        "C = 50 + 2 × 10 = 50 + 20 = $70.",
        ["$70"]
      ),
    ],
    independentPractice: [
      ans(
        "bev-i1",
        "Cost is C = 300 + 8x and revenue is R = 20x. Find the break-even number of units.",
        "20x = 300 + 8x",
        "25",
        3,
        "Set R = C and solve.",
        "20x = 300 + 8x, so 12x = 300 and x = 25 units."
      ),
      mcq(
        "bev-i2",
        "When a business sells fewer units than the break-even quantity, it makes:",
        "C",
        ["a profit", "no profit and no loss", "a loss", "nothing at all"],
        3,
        "Below break-even, cost is still ahead of revenue.",
        "Below the break-even quantity, cost exceeds revenue, so the business makes a loss."
      ),
      ans(
        "bev-i3",
        "Cost is C = 500 + 10x and revenue is R = 30x. Find the profit when x = 40 units.",
        "30(40) - (500 + 10(40))",
        "300",
        3,
        "Profit = revenue − cost at x = 40.",
        "R = 30 × 40 = 1200; C = 500 + 10 × 40 = 900. Profit = 1200 − 900 = $300.",
        ["$300"]
      ),
      ans(
        "bev-i4",
        "Using the graph, state the break-even number of units (where the cost and revenue lines cross).",
        "\\text{read across}",
        "20",
        3,
        "Read the x-value where the two lines meet.",
        "The cost and revenue lines cross at (20, 300), so the break-even quantity is 20 units.",
        [],
        { cartesianGraph: breakEvenGraph }
      ),
      ans(
        "bev-i5",
        "A market stall has fixed costs of $80. Each item sells for $6 and costs $2 to make. Find the break-even number of items.",
        "\\frac{80}{6 - 2}",
        "20",
        3,
        "Each item earns price minus making cost toward the fixed cost.",
        "Each item contributes 6 − 2 = $4 toward the fixed cost. Break-even = 80 ÷ 4 = 20 items."
      ),
    ],
    masteryQuiz: [
      ans(
        "bev-m1",
        "Cost is C = 150 + 5x and revenue is R = 20x. Find the break-even number of units.",
        "20x = 150 + 5x",
        "10",
        2,
        "Set R = C and solve.",
        "20x = 150 + 5x, so 15x = 150 and x = 10 units."
      ),
      mcq(
        "bev-m2",
        "At the break-even point, the profit is:",
        "A",
        ["zero", "at its maximum", "equal to the fixed cost", "equal to the revenue"],
        2,
        "Break-even means revenue exactly covers cost.",
        "At break-even, revenue equals cost, so profit = revenue − cost = zero."
      ),
      ans(
        "bev-m3",
        "For the business in m1 (R = 20x), find the revenue at the break-even quantity of 10 units.",
        "R = 20(10)",
        "200",
        3,
        "Substitute the break-even quantity into the revenue.",
        "R = 20 × 10 = $200 (equal to the cost at break-even).",
        ["$200"]
      ),
      ans(
        "bev-m4",
        "A product has fixed costs of $240. It sells for $11 and costs $5 to make. Find the break-even number of units.",
        "\\frac{240}{11 - 5}",
        "40",
        3,
        "Each unit contributes price minus making cost.",
        "Contribution per unit = 11 − 5 = $6. Break-even = 240 ÷ 6 = 40 units."
      ),
      mcq(
        "bev-m5",
        "A business that sells MORE than its break-even quantity makes:",
        "C",
        ["a loss", "no profit and no loss", "a profit", "zero revenue"],
        2,
        "Above break-even, revenue overtakes cost.",
        "Above the break-even quantity, revenue exceeds cost, so the business makes a profit."
      ),
      ans(
        "bev-m6",
        "Cost is C = 400 + 6x and revenue is R = 14x. How many units are needed to make a profit of $200?",
        "14x - (400 + 6x) = 200",
        "75",
        4,
        "Set revenue − cost equal to the target profit, then solve.",
        "Profit = R − C = 14x − (400 + 6x) = 8x − 400. Set 8x − 400 = 200, so 8x = 600 and x = 75 units.",
        ["75 units"]
      ),
      ans(
        "bev-m7",
        "A business has C = 200 + 5x and R = 15x (break-even at 20 units). Find the size of the loss, in dollars, when only 10 units are sold.",
        "(200 + 5(10)) - 15(10)",
        "100",
        4,
        "Find cost and revenue at x = 10; the loss is cost − revenue.",
        "C = 200 + 5 × 10 = 250; R = 15 × 10 = 150. Loss = 250 − 150 = $100 (revenue is $100 short of cost).",
        ["$100"]
      ),
      mcq(
        "bev-m8",
        "Two stalls have these break-even setups. Stall P: fixed $120, contribution $4/item. Stall Q: fixed $150, contribution $6/item. Which has the LOWER break-even quantity?",
        "B",
        ["Stall P (30 items)", "Stall Q (25 items)", "They are equal", "Stall P (40 items)"],
        4,
        "Break-even quantity = fixed cost ÷ contribution per item for each.",
        "P: 120 ÷ 4 = 30 items. Q: 150 ÷ 6 = 25 items. Stall Q has the lower break-even quantity (25)."
      ),
      ans(
        "bev-m9",
        "A company reduces its fixed cost from $500 to $300. Each unit sells for $25 and costs $5 to make. Find the new break-even number of units.",
        "\\frac{300}{25 - 5}",
        "15",
        4,
        "Use the NEW fixed cost ÷ contribution per unit.",
        "Contribution = 25 − 5 = $20. New break-even = 300 ÷ 20 = 15 units (down from 25 with the old fixed cost).",
        ["15 units"]
      ),
      ans(
        "bev-m10",
        "Using the graph, state the dollar amount where the cost and revenue lines cross (the break-even revenue).",
        "\\text{read up}",
        "300",
        3,
        "Read the y-value of the intersection point.",
        "The cost and revenue lines cross at (20, 300), so the break-even revenue is $300.",
        ["$300"],
        { cartesianGraph: breakEvenGraph }
      ),
    ],
    commonMistakes: [
      { mistake: "Thinking break-even means costs are zero.", fix: "Break-even means revenue exactly covers cost (R = C), not that cost is zero." },
      { mistake: "Forgetting the fixed cost when finding break-even.", fix: "Break-even quantity = fixed cost ÷ (price − cost per unit)." },
      { mistake: "Reading profit at the break-even point.", fix: "Profit is zero at break-even; profit appears only above it." },
      { mistake: "Reporting a loss as a positive profit.", fix: "Profit = revenue − cost; a negative value is a loss of that amount." },
    ],
    masteryPassMark: 0.8,
  };
}
