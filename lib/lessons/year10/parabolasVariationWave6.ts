// Year 10 restructure — Wave 6 (Parabolas, Rates & Variation). Authors all hidden stubs in
// Unit 7 (parabolas-rates-variation): sketching-by-factorisation (7C),
// sketching-completing-square (7D), sketching-quadratic-formula-discriminant (7E),
// parabola-applications (7F), intersection-lines-parabolas (7G), rates-of-change (7H),
// average-instantaneous-rates (7I, extending), direct-inverse-variation (7J).
// Architecture untouched. Prose uses unicode superscripts (no raw ^ or _). Y10 audit:
// 3 worked examples + 4 commonMistakes + 4/5/10 + masteryPassMark 0.8.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CartesianGraph, CartesianPoint } from "../types";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Read the graph feature or relationship first, then compute.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Reason about the relationship, then check each option.", explanation };
}

function parabolaGraph(
  description: string,
  a: number,
  b: number,
  c: number,
  points: CartesianPoint[] = [],
  domain: Pick<CartesianGraph, "xMin" | "xMax" | "yMin" | "yMax"> = {
    xMin: -5,
    xMax: 5,
    yMin: -8,
    yMax: 10,
  }
): CartesianGraph {
  return {
    description,
    ...domain,
    showGrid: true,
    parabolas: [{ kind: "quadratic", a, b, c }],
    points,
  };
}

function graphMcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  graphs: [CartesianGraph, CartesianGraph, CartesianGraph, CartesianGraph],
  difficulty: number,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: "",
      cartesianGraph: graphs[index],
    })),
    answer,
    difficulty,
    hint: "Compare the opening direction, roots, vertex and y-intercept in each displayed option.",
    explanation,
  };
}

// ── 7C Sketching by Factorisation (path) ───────────────────────────────────────────────
const sketchFactorisation: Partial<ExplicitLesson> = {
  description: "Sketch a parabola by factorising to find its x-intercepts, y-intercept and axis of symmetry.",
  learningIntention: "Use factorisation to find a parabola's key features and locate its turning point.",
  successCriteria: ["Find x-intercepts (roots) from the factors.", "Find the y-intercept as the constant term.", "Find the axis of symmetry as the midpoint of the roots.", "Locate the turning point on the axis of symmetry."],
  teaching: {
    paragraphs: [
      "A parabola's graph is fully pinned down by a few MEANINGFUL features. Factorising y = ax² + bx + c gives its x-intercepts (the ROOTS) directly: where each factor is zero, the curve crosses the x-axis. For y = (x − 2)(x − 3) the x-intercepts are 2 and 3.",
      "The y-intercept is where x = 0, which is just the constant term c. For y = x² − 5x + 6 the y-intercept is 6.",
      "The AXIS OF SYMMETRY sits exactly halfway between the two x-intercepts, because a parabola is symmetric. With roots 2 and 3 the axis is x = 2.5 — the average of the roots.",
      "The TURNING POINT (vertex) always lies ON the axis of symmetry, so its x-coordinate is that midpoint. These features — roots, y-intercept, axis, vertex — are connected, not separate facts: the roots fix the axis, and the axis fixes the vertex.",
    ],
    latexBlocks: ["y=(x-2)(x-3):\\ \\text{x-intercepts } 2,3", "\\text{axis of symmetry} = \\text{midpoint of the roots}", "\\text{y-intercept} = c\\ (\\text{value at } x=0)"],
  },
  workedExamples: [
    {
      title: "Roots and axis",
      questionLatex: "\\text{For } y=x^2-5x+6, \\text{ find the x-intercepts and axis of symmetry.}",
      cartesianGraph: parabolaGraph("Upward-opening parabola y equals x squared minus five x plus six, crossing at x equals two and three with axis halfway at x equals two point five.", 1, -5, 6, [{ x: 2, y: 0, label: "(2, 0)" }, { x: 3, y: 0, label: "(3, 0)" }, { x: 2.5, y: -0.25, label: "vertex" }], { xMin: 0, xMax: 5, yMin: -2, yMax: 8 }),
      steps: [{ explanation: "Factorise the quadratic to expose both roots.", latex: "(x-2)(x-3)" }, { explanation: "Each x-intercept occurs when one factor is zero.", latex: "x=2,\\ x=3" }, { explanation: "The axis is the midpoint of the two roots.", latex: "x = 2.5" }],
      finalAnswerLatex: "x=2,3;\\ \\text{axis } x=2.5",
    },
    {
      title: "Symmetric roots",
      questionLatex: "\\text{Find the x-intercepts of } y=x^2-4.",
      cartesianGraph: parabolaGraph("Upward-opening parabola y equals x squared minus four, with symmetric roots negative two and two and vertex at zero comma negative four.", 1, 0, -4, [{ x: -2, y: 0, label: "(-2, 0)" }, { x: 2, y: 0, label: "(2, 0)" }, { x: 0, y: -4, label: "vertex" }], { xMin: -4, xMax: 4, yMin: -6, yMax: 8 }),
      steps: [{ explanation: "Recognise and factorise the difference of two squares.", latex: "(x-2)(x+2)" }, { explanation: "Set each factor equal to zero to obtain both roots.", latex: "x = 2,\\ -2" }],
      finalAnswerLatex: "x=2,\\ -2",
    },
    {
      title: "A root at zero",
      questionLatex: "\\text{Find the x-intercepts of } y=x^2+2x.",
      cartesianGraph: parabolaGraph("Upward-opening parabola y equals x squared plus two x, crossing at negative two and zero with vertex at negative one comma negative one.", 1, 2, 0, [{ x: -2, y: 0, label: "(-2, 0)" }, { x: 0, y: 0, label: "(0, 0)" }, { x: -1, y: -1, label: "vertex" }], { xMin: -4, xMax: 2, yMin: -3, yMax: 6 }),
      steps: [{ explanation: "Take out the common factor x before finding the roots.", latex: "x(x+2)" }, { explanation: "Set each factor equal to zero; one root is the common factor itself.", latex: "x=0,\\ -2" }],
      finalAnswerLatex: "x=0,\\ -2",
    },
  ],
  guidedPractice: [
    mcq("y10-pf-g1", "What are the x-intercepts of y = (x − 2)(x − 3)?", "A", ["2 and 3", "−2 and −3", "2 and −3", "5 and 6"], 1, "Setting each factor equal to zero gives x = 2 and x = 3, so the intercepts are (2, 0) and (3, 0)."),
    ans("y10-pf-g2", "Find the y-intercept of y = x² − 5x + 6.", "y=x^2-5x+6,\\ x=0", "6", 1, "At x = 0, both terms containing x vanish and the remaining y-value is the constant term 6.", ["6.0", "(0,6)", "(0, 6)", "0,6"]),
    ans("y10-pf-g3", "A parabola has x-intercepts 2 and 4. Find the axis of symmetry (give x).", "\\text{roots } 2,4", "3", 2, "The axis lies halfway between the two roots: (2 + 4) / 2 = 3, so its equation is x = 3.", ["x=3"]),
    graphMcq(
      "y10-pf-g4",
      "Which displayed sketch matches y = x squared - 9?",
      "B",
      [
        parabolaGraph("Upward-opening parabola with roots negative nine and nine.", 1 / 9, 0, -9, [{ x: -9, y: 0 }, { x: 9, y: 0 }], { xMin: -10, xMax: 10, yMin: -11, yMax: 5 }),
        parabolaGraph("Upward-opening parabola y equals x squared minus nine, with roots negative three and three and vertex zero comma negative nine.", 1, 0, -9, [{ x: -3, y: 0 }, { x: 3, y: 0 }, { x: 0, y: -9 }], { xMin: -5, xMax: 5, yMin: -11, yMax: 10 }),
        parabolaGraph("Downward-opening parabola with roots negative three and three and vertex zero comma nine.", -1, 0, 9, [{ x: -3, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 9 }], { xMin: -5, xMax: 5, yMin: -10, yMax: 11 }),
        parabolaGraph("Upward-opening parabola with vertex zero comma nine and no x-intercepts.", 1, 0, 9, [{ x: 0, y: 9 }], { xMin: -5, xMax: 5, yMin: -2, yMax: 18 }),
      ],
      2,
      "Factorising x squared minus 9 as (x - 3)(x + 3) gives roots -3 and 3; the positive leading coefficient opens upward and the y-intercept is -9."
    ),
  ],
  independentPractice: [
    mcq("y10-pf-i1", "What are the roots of y = x² + 5x + 6?", "B", ["2 and 3", "−2 and −3", "−1 and −6", "5 and 6"], 2, "Factorising gives (x + 2)(x + 3) = 0, so the roots are x = -2 and x = -3."),
    ans("y10-pf-i2", "Find the y-intercept of y = x² − 3x + 4.", "y=x^2-3x+4", "4", 1, "Substituting x = 0 removes both variable terms, leaving the y-intercept value 4.", ["4.0", "(0,4)", "(0, 4)", "0,4"]),
    ans("y10-pf-i3", "A parabola has roots −1 and 5. Find the axis of symmetry (give x).", "\\text{roots } -1,5", "2", 2, "The axis is halfway between the roots: (-1 + 5) / 2 = 2, so its equation is x = 2.", ["x=2"]),
    mcq("y10-pf-i4", "What are the x-intercepts of y = x(x − 4)?", "A", ["0 and 4", "0 and −4", "4 only", "−4 only"], 1, "The product is zero when x = 0 or when x - 4 = 0, giving intercepts at 0 and 4."),
    mcq("y10-pf-i5", "The axis of symmetry of a parabola passes through its:", "B", ["y-intercept", "vertex (turning point)", "focus only", "x-intercepts"], 1, "The vertex is the turning point, and the vertical axis of symmetry passes directly through it."),
  ],
  masteryQuiz: [
    mcq("y10-pf-m1", "What are the roots of y = (x + 1)(x − 6)?", "C", ["1 and 6", "−1 and −6", "−1 and 6", "1 and −6"], 1, "Setting x + 1 and x - 6 equal to zero gives the two roots x = -1 and x = 6."),
    mcq("y10-pf-m2", "The turning point of a parabola lies on the:", "A", ["axis of symmetry", "y-axis always", "x-axis always", "line y = x"], 1, "The vertex is the point where the curve turns, and the axis of symmetry passes through it."),
    ans("y10-pf-m3", "Find the y-intercept of y = x² + 2x − 8.", "y=x^2+2x-8", "-8", 1, "Substituting x = 0 leaves y = -8, so the graph crosses the y-axis at (0, -8).", ["−8", "-8.0", "(0,-8)", "(0, -8)", "0,-8"]),
    ans("y10-pf-m4", "A parabola has roots 0 and 8. Find the axis of symmetry (give x).", "\\text{roots } 0,8", "4", 2, "The axis is the midpoint of the roots: (0 + 8) / 2 = 4, so its equation is x = 4.", ["x=4"]),
    ans("y10-pf-m5", "For y = (x − 1)(x − 5), use the roots to locate the axis, then find the y-coordinate of the vertex.", "(x-1)(x-5)", "-4", 3, "The axis is x = 3, the midpoint of 1 and 5. Substituting x = 3 gives y = (2)(-2) = -4.", ["−4", "-4.0", "y=-4", "y = -4"]),
    mcq("y10-pf-m6", "What are the roots of y = x² − 7x + 12?", "A", ["3 and 4", "−3 and −4", "2 and 6", "1 and 12"], 2, "Factorising gives (x - 3)(x - 4) = 0, so the roots are x = 3 and x = 4."),
    graphMcq(
      "y10-pf-m7",
      "Which displayed sketch matches y = -2(x + 1)(x - 3)?",
      "C",
      [
        parabolaGraph("Upward-opening parabola with roots negative one and three.", 2, -4, -6, [{ x: -1, y: 0 }, { x: 3, y: 0 }, { x: 0, y: -6 }], { xMin: -4, xMax: 6, yMin: -10, yMax: 14 }),
        parabolaGraph("Downward-opening parabola with roots one and negative three.", -2, -4, 6, [{ x: 1, y: 0 }, { x: -3, y: 0 }, { x: 0, y: 6 }], { xMin: -6, xMax: 4, yMin: -14, yMax: 10 }),
        parabolaGraph("Downward-opening parabola with roots negative one and three and y-intercept six.", -2, 4, 6, [{ x: -1, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 6 }], { xMin: -4, xMax: 6, yMin: -14, yMax: 10 }),
        parabolaGraph("Downward-opening parabola with y-intercept negative six and no real x-intercepts.", -2, 4, -6, [{ x: 0, y: -6 }], { xMin: -4, xMax: 6, yMin: -16, yMax: 4 }),
      ],
      3,
      "The factors give roots -1 and 3, the negative coefficient makes the parabola open downward, and y(0) = -2(1)(-3) = 6."
    ),
    mcq("y10-pf-m8", "The y-intercept of y = ax² + bx + c is:", "C", ["a", "b", "c", "−c"], 1, "When x = 0, the terms ax squared and bx vanish, leaving y = c at the y-intercept."),
    mcq("y10-pf-m9", "What are the roots of y = x² − x − 12?", "B", ["3 and −4", "4 and −3", "6 and −2", "12 and 1"], 2, "Factorising gives (x - 4)(x + 3) = 0, so the roots are x = 4 and x = -3."),
    ans("y10-pf-m10", "A monic parabola has y-intercept -8 and one x-intercept 2. Use the product of the roots to find the other root, then enter the x-coordinate of the vertex.", "", "-1", 4, "For a monic quadratic, the product of the roots equals the constant term -8. The other root is -4, and the midpoint of 2 and -4 is -1.", ["−1", "-1.0", "x=-1", "x = -1"]),
  ],
  commonMistakes: [
    { mistake: "Reading the root straight from the bracket, e.g. (x + 2) → 2.", fix: "Set the factor to 0: (x + 2) = 0 gives x = −2." },
    { mistake: "Taking the y-intercept from a coefficient other than c.", fix: "The y-intercept is the constant term (value at x = 0)." },
    { mistake: "Guessing the axis instead of averaging the roots.", fix: "Axis of symmetry = midpoint (average) of the two roots." },
    { mistake: "Placing the vertex off the axis of symmetry.", fix: "The vertex always lies on the axis of symmetry." },
  ],
  masteryPassMark: 0.8,
};

// ── 7D Sketching by Completing the Square (path) ───────────────────────────────────────
const sketchCompletingSquare: Partial<ExplicitLesson> = {
  description: "Use completed-square form y = (x − h)² + k to read off the vertex and minimum value of a parabola.",
  learningIntention: "Find a parabola's vertex and minimum from completed-square form.",
  successCriteria: ["Read the vertex (h, k) from y = (x − h)² + k.", "State the minimum value as k.", "Complete the square on y = x² + bx + c.", "Identify the axis of symmetry x = h."],
  teaching: {
    paragraphs: [
      "Completed-square form, y = (x − h)² + k, shows the TURNING POINT directly: the vertex is at (h, k). The square (x − h)² is never negative, so the smallest value of y is k, reached when x = h.",
      "Watch the sign of h: y = (x − 2)² + 3 has vertex (2, 3) — flip the sign inside the bracket. And y = (x + 3)² − 2 has vertex (−3, −2).",
      "If a quadratic is given as y = x² + bx + c, complete the square to reveal the vertex. For y = x² − 4x + 7: halve −4 to get −2, so (x − 2)² − 4 + 7 = (x − 2)² + 3, vertex (2, 3).",
      "Because (x − h)² ≥ 0, an upward parabola has a MINIMUM of k at x = h; the axis of symmetry is x = h. Completing the square turns hidden structure into the graph's key point.",
    ],
    latexBlocks: ["y=(x-h)^2+k:\\ \\text{vertex } (h,k)", "\\text{minimum value} = k\\ \\text{at } x=h", "x^2-4x+7 = (x-2)^2+3"],
  },
  workedExamples: [
    {
      title: "Vertex from completed form",
      questionLatex: "\\text{State the vertex of } y=(x-2)^2+3.",
      cartesianGraph: parabolaGraph("Upward-opening parabola y equals x minus two squared plus three, with vertex at two comma three and axis x equals two.", 1, -4, 7, [{ x: 2, y: 3, label: "vertex (2, 3)" }], { xMin: -2, xMax: 6, yMin: 0, yMax: 15 }),
      steps: [{ explanation: "Completed-square form displays the vertex as (h, k).", latex: "(2, 3)" }],
      finalAnswerLatex: "(2, 3)",
    },
    {
      title: "Complete the square",
      questionLatex: "\\text{Write } y=x^2-4x+7 \\text{ in completed-square form.}",
      cartesianGraph: parabolaGraph("Upward-opening parabola y equals x squared minus four x plus seven, with vertex at two comma three revealed by completed-square form.", 1, -4, 7, [{ x: 2, y: 3, label: "vertex" }], { xMin: -2, xMax: 6, yMin: 0, yMax: 15 }),
      steps: [{ explanation: "Half of -4 is -2, and squaring -2 gives the adjustment 4.", latex: "(x-2)^2 - 4 + 7" }, { explanation: "Combine the remaining constants to expose the vertex form.", latex: "= (x-2)^2 + 3" }],
      finalAnswerLatex: "(x-2)^2+3",
    },
    {
      title: "Minimum value",
      questionLatex: "\\text{Find the minimum value of } y=(x-1)^2+5.",
      cartesianGraph: parabolaGraph("Upward-opening parabola y equals x minus one squared plus five, with minimum vertex at one comma five.", 1, -2, 6, [{ x: 1, y: 5, label: "minimum (1, 5)" }], { xMin: -3, xMax: 5, yMin: 2, yMax: 15 }),
      steps: [{ explanation: "The squared term cannot be negative, so its smallest value is zero and y is then 5.", latex: "\\text{min} = 5" }],
      finalAnswerLatex: "5",
    },
  ],
  guidedPractice: [
    graphMcq(
      "y10-pc-g1",
      "Which displayed graph matches y = (x - 2) squared + 3?",
      "A",
      [
        parabolaGraph("Upward-opening parabola with vertex at two comma three.", 1, -4, 7, [{ x: 2, y: 3 }], { xMin: -2, xMax: 6, yMin: 0, yMax: 15 }),
        parabolaGraph("Upward-opening parabola with vertex at negative two comma three.", 1, 4, 7, [{ x: -2, y: 3 }], { xMin: -6, xMax: 2, yMin: 0, yMax: 15 }),
        parabolaGraph("Upward-opening parabola with vertex at two comma negative three.", 1, -4, 1, [{ x: 2, y: -3 }], { xMin: -2, xMax: 6, yMin: -6, yMax: 9 }),
        parabolaGraph("Downward-opening parabola with vertex at two comma three.", -1, 4, -1, [{ x: 2, y: 3 }], { xMin: -2, xMax: 6, yMin: -10, yMax: 6 }),
      ],
      1,
      "In y = (x - h) squared + k, the vertex is (h, k) = (2, 3), and the positive coefficient makes the graph open upward."
    ),
    ans("y10-pc-g2", "Find the minimum value of y = (x − 1)² + 5.", "y=(x-1)^2+5", "5", 1, "The square is at least zero, so the smallest possible y-value is the vertical shift k = 5.", ["5.0"]),
    mcq("y10-pc-g3", "What is the vertex of y = (x + 3)² − 2?", "B", ["(3, −2)", "(−3, −2)", "(−3, 2)", "(3, 2)"], 1, "Writing x + 3 as x - (-3) gives h = -3, while k = -2, so the vertex is (-3, -2)."),
    ans("y10-pc-g4", "Find the x-coordinate of the vertex of y = (x − 4)².", "y=(x-4)^2", "4", 1, "The squared term is zero at x = 4, so the vertex has x-coordinate 4.", ["x=4", "4.0"]),
  ],
  independentPractice: [
    graphMcq(
      "y10-pc-i1",
      "Which displayed graph matches y = (x + 1) squared - 4?",
      "B",
      [
        parabolaGraph("Upward-opening parabola with vertex at one comma negative four.", 1, -2, -3, [{ x: 1, y: -4 }], { xMin: -4, xMax: 5, yMin: -7, yMax: 10 }),
        parabolaGraph("Upward-opening parabola with vertex at negative one comma negative four.", 1, 2, -3, [{ x: -1, y: -4 }], { xMin: -5, xMax: 4, yMin: -7, yMax: 10 }),
        parabolaGraph("Upward-opening parabola with vertex at negative one comma four.", 1, 2, 5, [{ x: -1, y: 4 }], { xMin: -5, xMax: 4, yMin: 1, yMax: 18 }),
        parabolaGraph("Downward-opening parabola with vertex at negative one comma negative four.", -1, -2, -5, [{ x: -1, y: -4 }], { xMin: -5, xMax: 4, yMin: -18, yMax: -1 }),
      ],
      2,
      "The bracket x + 1 gives h = -1, the outside constant gives k = -4, and the positive squared coefficient opens upward."
    ),
    ans("y10-pc-i2", "Complete the square: y = x² − 4x + 7 = (x − 2)² + ?", "y=x^2-4x+7", "3", 2, "Expanding (x - 2) squared gives x squared - 4x + 4, so an additional 3 is needed to recover the constant 7.", ["3.0"]),
    ans("y10-pc-i3", "Find the minimum value of y = (x − 5)² + 2.", "y=(x-5)^2+2", "2", 1, "The squared term is smallest at zero, leaving the minimum y-value k = 2.", ["2.0"]),
    ans("y10-pc-i4", "Find the y-coordinate of the vertex of y = (x − 3)² − 7.", "y=(x-3)^2-7", "-7", 1, "The outside constant k is the vertex's y-coordinate, so the required value is -7.", ["−7", "-7.0"]),
    mcq("y10-pc-i5", "y = (x − h)² + k has its minimum at:", "A", ["x = h", "x = k", "x = 0", "x = −h"], 2, "The square is smallest when x - h = 0, which occurs at x = h."),
  ],
  masteryQuiz: [
    graphMcq(
      "y10-pc-m1",
      "Which displayed graph matches y = -2(x + 1) squared + 3?",
      "D",
      [
        parabolaGraph("Upward-opening parabola with vertex at negative one comma three.", 2, 4, 5, [{ x: -1, y: 3 }], { xMin: -5, xMax: 4, yMin: 0, yMax: 18 }),
        parabolaGraph("Downward-opening parabola with vertex at one comma three.", -2, 4, 1, [{ x: 1, y: 3 }], { xMin: -4, xMax: 5, yMin: -18, yMax: 6 }),
        parabolaGraph("Downward-opening parabola with vertex at negative one comma negative three.", -2, -4, -5, [{ x: -1, y: -3 }], { xMin: -5, xMax: 4, yMin: -20, yMax: 0 }),
        parabolaGraph("Downward-opening parabola with vertex at negative one comma three.", -2, -4, 1, [{ x: -1, y: 3 }], { xMin: -5, xMax: 4, yMin: -18, yMax: 6 }),
      ],
      2,
      "The factor -2 makes the graph open downward, x + 1 gives vertex x-coordinate -1, and the outside constant gives vertex y-coordinate 3."
    ),
    mcq("y10-pc-m2", "The minimum value of y = (x − h)² + k is:", "C", ["h", "−k", "k", "0"], 1, "The squared term cannot be negative, so its minimum is zero and the smallest possible y-value is k."),
    ans("y10-pc-m3", "y = x² + 6x + 11 = (x + 3)² + ? Find the y-coordinate of the vertex.", "y=x^2+6x+11", "2", 2, "Completing the square gives (x + 3) squared - 9 + 11 = (x + 3) squared + 2, so the vertex y-coordinate is 2.", ["2.0"]),
    mcq("y10-pc-m4", "What is the vertex of y = (x + 5)² − 3?", "B", ["(5, −3)", "(−5, −3)", "(−5, 3)", "(5, 3)"], 1, "Writing x + 5 as x - (-5) gives h = -5 and k = -3, so the vertex is (-5, -3)."),
    mcq("y10-pc-m5", "The parabola y = (x − 2)² + 3 opens:", "A", ["upward", "downward", "left", "right"], 1, "The coefficient of the squared term is positive, so the arms of the parabola open upward."),
    ans("y10-pc-m6", "Find the minimum value of y = (x + 2)² + 6.", "y=(x+2)^2+6", "6", 1, "The squared term has minimum zero, leaving the minimum y-value 6.", ["6.0"]),
    ans("y10-pc-m7", "Find the x-coordinate of the vertex of y = (x − 7)² + 1.", "y=(x-7)^2+1", "7", 1, "The squared term becomes zero at x = 7, so the vertex has x-coordinate 7.", ["x=7", "7.0"]),
    mcq("y10-pc-m8", "Completing the square on a quadratic reveals its:", "C", ["x-intercepts only", "y-intercept", "vertex (turning point)", "gradient"], 1, "Completed-square form y = a(x - h) squared + k displays the vertex coordinates (h, k) directly."),
    ans("y10-pc-m9", "y = x² − 8x + 20 = (x − 4)² + ? Find the y-coordinate of the vertex.", "y=x^2-8x+20", "4", 2, "Completing the square gives (x - 4) squared - 16 + 20 = (x - 4) squared + 4, so the vertex y-coordinate is 4.", ["4.0"]),
    ans("y10-pc-m10", "A monic parabola y = x² + bx + c has axis of symmetry x = 3 and minimum value -4. Rewrite it mentally in completed-square form, then find c.", "", "5", 4, "The completed-square form is y = (x - 3) squared - 4. Expanding gives y = x squared - 6x + 9 - 4, so c = 5.", ["5.0", "c=5", "c = 5"]),
  ],
  commonMistakes: [
    { mistake: "Reading the vertex x-coordinate with the wrong sign.", fix: "y = (x − h)² + k has vertex x = h; (x + 3)² gives h = −3." },
    { mistake: "Taking the minimum as h instead of k.", fix: "The minimum value is k (the y-coordinate of the vertex)." },
    { mistake: "Forgetting to combine constants when completing the square.", fix: "(x − 2)² − 4 + 7 = (x − 2)² + 3." },
    { mistake: "Halving the constant instead of the x-coefficient.", fix: "Halve the coefficient of x to complete the square." },
  ],
  masteryPassMark: 0.8,
};

// ── 7E Discriminant and Number of Roots (path) ─────────────────────────────────────────
const discriminant: Partial<ExplicitLesson> = {
  description: "Use the discriminant Δ = b² − 4ac to count the real roots (x-intercepts) of a quadratic.",
  learningIntention: "Compute the discriminant and use its sign to count real roots.",
  successCriteria: ["Compute Δ = b² − 4ac.", "Use Δ > 0 → two roots, Δ = 0 → one, Δ < 0 → none.", "Relate the number of roots to x-intercepts.", "Identify a repeated root when Δ = 0."],
  teaching: {
    paragraphs: [
      "The DISCRIMINANT Δ = b² − 4ac is a single number that tells you HOW MANY times a parabola crosses the x-axis — without solving the equation. It is the part under the square root in the quadratic formula, and its SIGN is the signal.",
      "If Δ > 0 there are TWO distinct real roots (the parabola cuts the x-axis twice). If Δ = 0 there is ONE repeated root (the parabola just touches the x-axis at its vertex). If Δ < 0 there are NO real roots (the parabola misses the x-axis entirely).",
      "For y = x² − 5x + 6: a = 1, b = −5, c = 6, so Δ = 25 − 24 = 1 > 0 → two roots. For y = x² − 4x + 4: Δ = 16 − 16 = 0 → one (repeated) root.",
      "The number of real roots equals the number of x-intercepts. So the discriminant is a count-of-roots signal: read its sign, and you know the graph's relationship with the x-axis before sketching.",
    ],
    latexBlocks: ["\\Delta = b^2 - 4ac", "\\Delta > 0:\\ 2 \\text{ roots};\\ \\Delta = 0:\\ 1;\\ \\Delta < 0:\\ 0", "\\#\\text{roots} = \\#\\text{x-intercepts}"],
  },
  workedExamples: [
    { title: "Two roots", questionLatex: "\\text{How many roots does } x^2-5x+6 \\text{ have?}", steps: [{ explanation: "Δ = b² − 4ac with a=1, b=−5, c=6.", latex: "25 - 24 = 1 > 0" }, { explanation: "Positive discriminant.", latex: "2 \\text{ roots}" }], finalAnswerLatex: "2" },
    { title: "Repeated root", questionLatex: "\\text{How many roots does } x^2-4x+4 \\text{ have?}", steps: [{ explanation: "Δ = 16 − 16.", latex: "= 0" }, { explanation: "Zero discriminant.", latex: "1 \\text{ (repeated) root}" }], finalAnswerLatex: "1" },
    { title: "No real roots", questionLatex: "\\text{How many real roots does } x^2+x+1 \\text{ have?}", steps: [{ explanation: "Δ = 1 − 4.", latex: "= -3 < 0" }], finalAnswerLatex: "0" },
  ],
  guidedPractice: [
    mcq("y10-pd-g1", "The discriminant is:", "B", ["$b^2 + 4ac$", "$b^2 - 4ac$", "$2a + b$", "$\\sqrt{b^2-4ac}$"], 2, "Δ = b² − 4ac."),
    ans("y10-pd-g2", "Find the discriminant of x² − 5x + 6.", "x^2-5x+6", "1", 3, "Δ = (−5)² − 4(1)(6) = 25 − 24 = 1.", []),
    mcq("y10-pd-g3", "If Δ > 0, the number of real roots is:", "C", ["0", "1", "2", "infinite"], 2, "A positive discriminant gives two distinct real roots."),
    ans("y10-pd-g4", "Find the discriminant of x² − 4x + 4.", "x^2-4x+4", "0", 3, "Δ = 16 − 16 = 0.", []),
  ],
  independentPractice: [
    mcq("y10-pd-i1", "If Δ = 0, the parabola touches the x-axis at:", "B", ["0 points", "1 point", "2 points", "every point"], 3, "Δ = 0 gives one repeated root — the parabola touches the x-axis once."),
    ans("y10-pd-i2", "Find the discriminant of x² + 2x + 1.", "x^2+2x+1", "0", 3, "Δ = 4 − 4 = 0.", []),
    mcq("y10-pd-i3", "If Δ < 0, the number of x-intercepts is:", "A", ["0", "1", "2", "3"], 2, "A negative discriminant means no real roots, so no x-intercepts."),
    ans("y10-pd-i4", "Find the discriminant of x² + 3x + 2.", "x^2+3x+2", "1", 3, "Δ = 9 − 8 = 1.", []),
    ans("y10-pd-i5", "Find the discriminant of 2x² + 4x + 2.", "2x^2+4x+2", "0", 4, "Δ = 16 − 4(2)(2) = 16 − 16 = 0.", []),
  ],
  masteryQuiz: [
    ans("y10-pd-m1", "Find the discriminant of x² − 6x + 9.", "x^2-6x+9", "0", 3, "Δ = 36 − 36 = 0.", []),
    mcq("y10-pd-m2", "Δ < 0 means the graph:", "B", ["touches the x-axis", "does not cross the x-axis", "crosses twice", "is a straight line"], 2, "No real roots, so the parabola does not meet the x-axis."),
    ans("y10-pd-m3", "Find the discriminant of x² + 5x + 6.", "x^2+5x+6", "1", 3, "Δ = 25 − 24 = 1.", []),
    mcq("y10-pd-m4", "Two distinct real roots occur when:", "C", ["Δ < 0", "Δ = 0", "Δ > 0", "Δ = 1 only"], 2, "Two distinct real roots need a positive discriminant."),
    ans("y10-pd-m5", "Find the discriminant of x² − 2x + 5.", "x^2-2x+5", "-16", 4, "Δ = 4 − 20 = −16.", ["−16"]),
    ans("y10-pd-m6", "A quadratic has Δ = −16. How many real roots?", "\\Delta=-16", "0", 2, "A negative discriminant means 0 real roots.", []),
    ans("y10-pd-m7", "Find the discriminant of x² + 4x + 4.", "x^2+4x+4", "0", 3, "Δ = 16 − 16 = 0.", []),
    mcq("y10-pd-m8", "One repeated root occurs when:", "B", ["Δ > 0", "Δ = 0", "Δ < 0", "b = 0"], 2, "Δ = 0 gives a single repeated root."),
    ans("y10-pd-m9", "Find the discriminant of 3x² + 2x − 1.", "3x^2+2x-1", "16", 4, "Δ = 4 − 4(3)(−1) = 4 + 12 = 16.", []),
    ans("y10-pd-m10", "A quadratic has Δ = 16. How many real roots?", "\\Delta=16", "2", 2, "A positive discriminant gives 2 real roots.", []),
  ],
  commonMistakes: [
    { mistake: "Using b² + 4ac.", fix: "The discriminant is b² − 4ac (minus)." },
    { mistake: "Sign error with c when it is negative.", fix: "−4ac with c < 0 becomes a positive contribution: e.g. −4(3)(−1) = +12." },
    { mistake: "Thinking Δ = 0 means no roots.", fix: "Δ = 0 gives one repeated root (the curve touches the x-axis)." },
    { mistake: "Reporting a count for Δ < 0.", fix: "Δ < 0 means zero real roots." },
  ],
  masteryPassMark: 0.8,
};

// ── 7F Parabola Applications (path) ────────────────────────────────────────────────────
const parabolaApplications: Partial<ExplicitLesson> = {
  description: "Apply parabolas to real situations: maximum height at the vertex and landing points at the x-intercepts.",
  learningIntention: "Use a parabola's vertex and intercepts to answer applied questions.",
  successCriteria: ["Identify the maximum/minimum as the vertex value.", "Find the time/position of the maximum from the vertex.", "Find when a quantity is zero from the x-intercepts.", "Interpret the model in context."],
  teaching: {
    paragraphs: [
      "Parabolas model anything that rises and falls — a thrown ball, a fountain, profit against price. The TURNING POINT carries the meaning: for a downward parabola the vertex is the MAXIMUM (greatest height, most profit), and its coordinates tell you both the peak value and when/where it happens.",
      "In completed-square form h = −(t − 3)² + 9, the maximum height is 9, reached at t = 3. The k tells you the peak value; the h tells you when it occurs.",
      "The x-intercepts answer 'when is it zero?'. A ball with height h = −t² + 4t lands when h = 0: −t(t − 4) = 0 gives t = 0 (launch) or t = 4 (landing).",
      "For an area like A = x(10 − x), the maximum is at the vertex — the average of the roots 0 and 10 — so x = 5, giving A = 25. Read the graph feature that matches the question: vertex for 'maximum', intercepts for 'when zero'.",
    ],
    latexBlocks: ["h=-(t-3)^2+9:\\ \\text{max height } 9 \\text{ at } t=3", "h=-t^2+4t=0 \\Rightarrow t=0,4\\ (\\text{landing})", "A=x(10-x):\\ \\text{max at } x=5"],
  },
  workedExamples: [
    { title: "Maximum height", questionLatex: "\\text{For } h=-(t-2)^2+16, \\text{ find the maximum height and when it occurs.}", steps: [{ explanation: "Vertex (h-value, k-value).", latex: "\\text{max} = 16 \\text{ at } t=2" }], finalAnswerLatex: "16 \\text{ at } t=2" },
    { title: "Landing time", questionLatex: "\\text{A ball has } h=-t^2+4t. \\text{ When does it land?}", steps: [{ explanation: "Set h = 0 and factorise.", latex: "-t(t-4)=0 \\Rightarrow t=0,4" }, { explanation: "Landing is the later time.", latex: "t = 4" }], finalAnswerLatex: "t=4" },
    { title: "Maximum area", questionLatex: "\\text{Maximise } A=x(10-x).", steps: [{ explanation: "Roots 0 and 10; vertex at the midpoint.", latex: "x = 5" }, { explanation: "Evaluate.", latex: "A = 5 \\times 5 = 25" }], finalAnswerLatex: "A=25 \\text{ at } x=5" },
  ],
  guidedPractice: [
    mcq("y10-pa-g1", "The maximum of a downward parabola is at its:", "B", ["y-intercept", "vertex", "x-intercepts", "axis end"], 2, "The vertex is the highest point of a downward parabola."),
    ans("y10-pa-g2", "For h = −(t − 2)² + 16, find the maximum height.", "h=-(t-2)^2+16", "16", 2, "Maximum is k = 16.", []),
    ans("y10-pa-g3", "For h = −(t − 2)² + 16, find the time of maximum height.", "h=-(t-2)^2+16", "2", 2, "Maximum at t = h-value = 2.", ["t=2"]),
    ans("y10-pa-g4", "A rectangle has area A = x(8 − x). Find the x that maximises the area.", "A=x(8-x)", "4", 3, "Roots 0 and 8; vertex at midpoint x = 4.", ["x=4"]),
  ],
  independentPractice: [
    mcq("y10-pa-i1", "A projectile's greatest height occurs at the:", "C", ["launch", "landing", "turning point", "x-intercept"], 2, "Greatest height is the vertex (turning point)."),
    ans("y10-pa-i2", "For h = −(t − 3)² + 25, find the maximum height.", "h=-(t-3)^2+25", "25", 2, "Maximum is 25.", []),
    ans("y10-pa-i3", "A ball has h = −t² + 6t. When does it land (h = 0, after launch)?", "h=-t^2+6t", "6", 3, "−t(t − 6) = 0 → t = 0 or 6; landing at t = 6.", ["t=6"]),
    ans("y10-pa-i4", "A rectangle has area A = x(12 − x). Find the x that maximises the area.", "A=x(12-x)", "6", 3, "Roots 0 and 12; vertex at x = 6.", ["x=6"]),
    ans("y10-pa-i5", "For h = −(t − 5)² + 30, find the time of maximum height.", "h=-(t-5)^2+30", "5", 2, "Maximum at t = 5.", ["t=5"]),
  ],
  masteryQuiz: [
    ans("y10-pa-m1", "For h = −(t − 4)² + 20, find the maximum height.", "h=-(t-4)^2+20", "20", 2, "Maximum is 20.", []),
    mcq("y10-pa-m2", "The vertex of a downward parabola gives the:", "A", ["maximum", "minimum", "y-intercept", "gradient"], 2, "A downward parabola peaks at its vertex."),
    ans("y10-pa-m3", "A ball has h = −t² + 8t. When does it land (h = 0, after launch)?", "h=-t^2+8t", "8", 3, "−t(t − 8) = 0 → t = 0 or 8; landing at t = 8.", ["t=8"]),
    ans("y10-pa-m4", "A rectangle has area A = x(20 − x). Find the x that maximises the area.", "A=x(20-x)", "10", 3, "Roots 0 and 20; vertex at x = 10.", ["x=10"]),
    mcq("y10-pa-m5", "For an upward parabola, the vertex gives the:", "B", ["maximum", "minimum", "x-intercept", "y-intercept"], 2, "An upward parabola has its lowest point at the vertex."),
    ans("y10-pa-m6", "For h = −(t − 1)² + 9, find the maximum height.", "h=-(t-1)^2+9", "9", 2, "Maximum is 9.", []),
    ans("y10-pa-m7", "A ball has h = −t² + 10t. Find the time of greatest height.", "h=-t^2+10t", "5", 4, "Vertex at t = −b/2a = −10/(−2) = 5.", ["t=5"]),
    mcq("y10-pa-m8", "The maximum area of A = x(10 − x) occurs at x =", "C", ["2", "10", "5", "0"], 3, "Vertex at the midpoint of roots 0 and 10, i.e. x = 5."),
    ans("y10-pa-m9", "For h = −(t − 6)² + 40, find the time of maximum height.", "h=-(t-6)^2+40", "6", 2, "Maximum at t = 6.", ["t=6"]),
    ans("y10-pa-m10", "A ball has h = −t² + 12t. When does it land (h = 0, after launch)?", "h=-t^2+12t", "12", 3, "−t(t − 12) = 0 → t = 0 or 12; landing at t = 12.", ["t=12"]),
  ],
  commonMistakes: [
    { mistake: "Reading the maximum from h instead of k.", fix: "In −(t − h)² + k, the maximum value is k; h is when it occurs." },
    { mistake: "Giving the launch time (0) as the landing time.", fix: "The landing is the non-zero x-intercept." },
    { mistake: "Forgetting the vertex of x(a − x) is the midpoint of the roots.", fix: "Maximum at x = a/2 (midpoint of 0 and a)." },
    { mistake: "Using the vertex when the question asks 'when zero'.", fix: "Use the x-intercepts for 'when is the quantity zero'." },
  ],
  masteryPassMark: 0.8,
};

// ── 7G Line–Parabola Intersections (path) ──────────────────────────────────────────────
const lineParabolaIntersection: Partial<ExplicitLesson> = {
  description: "Find where a line meets a parabola by solving the two equations simultaneously, and count the intersection points.",
  learningIntention: "Solve a line and a parabola together and interpret the number of intersections.",
  successCriteria: ["Set the two equations equal to find x.", "Solve the resulting quadratic.", "Count intersection points (2, 1 tangent, or 0).", "Relate the count to the discriminant."],
  teaching: {
    paragraphs: [
      "Two graphs INTERSECT where they share a point — the same x and the same y. So to find where a line meets a parabola, you SOLVE THE TWO EQUATIONS TOGETHER: set their y-expressions equal and solve for x.",
      "For y = x² and y = 4, setting equal gives x² = 4, so x = 2 or x = −2 — two intersection points. For y = x² and y = 2x: x² = 2x → x² − 2x = 0 → x(x − 2) = 0, so x = 0 or x = 2.",
      "The NUMBER of solutions of that quadratic is the number of intersection points. Two solutions → the line cuts the parabola twice; one solution → the line is a TANGENT (touches once); no real solutions → they never meet.",
      "This connects to the discriminant: after substituting, a quadratic with Δ > 0 gives two intersections, Δ = 0 gives a tangent, Δ < 0 gives none. Intersection is simultaneous solving, not separate graph-reading.",
    ],
    latexBlocks: ["\\text{set } y_{\\text{line}} = y_{\\text{parabola}}", "y=x^2,\\ y=4 \\Rightarrow x^2=4 \\Rightarrow x=\\pm 2", "1 \\text{ solution} \\Rightarrow \\text{tangent}"],
  },
  workedExamples: [
    { title: "Two intersections", questionLatex: "\\text{Find where } y=x^2 \\text{ meets } y=4.", steps: [{ explanation: "Set equal.", latex: "x^2 = 4" }, { explanation: "Solve.", latex: "x = 2 \\text{ or } -2" }], finalAnswerLatex: "x = \\pm 2" },
    { title: "Meeting a line", questionLatex: "\\text{Find where } y=x^2 \\text{ meets } y=2x.", steps: [{ explanation: "Set equal and rearrange.", latex: "x^2 - 2x = 0" }, { explanation: "Factorise.", latex: "x(x-2)=0 \\Rightarrow x=0,2" }], finalAnswerLatex: "x=0,\\ 2" },
    { title: "A tangent", questionLatex: "\\text{How many points where } y=x^2+1 \\text{ meets } y=1?", steps: [{ explanation: "x² + 1 = 1 → x² = 0.", latex: "x = 0 \\text{ (one solution)}" }], finalAnswerLatex: "1 \\text{ (tangent)}" },
  ],
  guidedPractice: [
    mcq("y10-pi-g1", "To find where a line meets a parabola, you:", "C", ["add the equations", "subtract the y-intercepts", "solve the two equations simultaneously", "compare gradients"], 2, "Set the y-expressions equal and solve together."),
    mcq("y10-pi-g2", "Where does y = x² meet y = 9?", "A", ["x = 3 and −3", "x = 9 and −9", "x = 3 only", "x = 0 and 9"], 2, "x² = 9 → x = ±3."),
    ans("y10-pi-g3", "y = x² and y = x meet where x² = x. Find the non-zero solution.", "", "1", 3, "x² − x = 0 → x(x − 1) = 0 → x = 0 or 1; the non-zero is 1.", ["x=1"]),
    ans("y10-pi-g4", "How many points do y = x² and y = 4 intersect at?", "y=x^2,\\ y=4", "2", 2, "x² = 4 has two solutions, so 2 points.", []),
  ],
  independentPractice: [
    mcq("y10-pi-i1", "How many points do y = x² and y = −1 intersect at?", "A", ["0", "1", "2", "infinite"], 3, "x² = −1 has no real solution, so 0 points."),
    mcq("y10-pi-i2", "Where does y = x² meet y = 16?", "B", ["x = 8 and −8", "x = 4 and −4", "x = 4 only", "x = 16"], 2, "x² = 16 → x = ±4."),
    ans("y10-pi-i3", "y = x² and y = 3x meet where x² = 3x. Find the non-zero solution.", "", "3", 3, "x² − 3x = 0 → x(x − 3) = 0 → x = 0 or 3.", ["x=3"]),
    ans("y10-pi-i4", "How many points do y = x² + 2 and y = 2 intersect at?", "y=x^2+2,\\ y=2", "1", 3, "x² = 0 → x = 0, one point (tangent at the vertex).", []),
    mcq("y10-pi-i5", "If substituting gives a quadratic with Δ = 0, the line is a:", "C", ["secant (2 points)", "non-intersecting line", "tangent (1 point)", "vertical line"], 4, "Δ = 0 means one solution — the line touches the parabola once (tangent)."),
  ],
  masteryQuiz: [
    mcq("y10-pi-m1", "Where does y = x² meet y = 25?", "A", ["x = 5 and −5", "x = 25", "x = 5 only", "x = 0 and 25"], 2, "x² = 25 → x = ±5."),
    mcq("y10-pi-m2", "Intersections of a line and parabola are found by:", "B", ["reading the graph only", "setting the equations equal", "adding gradients", "halving the constant"], 2, "Set the equations equal and solve simultaneously."),
    ans("y10-pi-m3", "y = x² and y = 4x meet where x² = 4x. Find the non-zero solution.", "", "4", 3, "x(x − 4) = 0 → x = 0 or 4.", ["x=4"]),
    mcq("y10-pi-m4", "How many points do y = x² and y = −4 intersect at?", "A", ["0", "1", "2", "4"], 2, "x² = −4 has no real solution, so 0 points."),
    mcq("y10-pi-m5", "Two intersection points correspond to a discriminant that is:", "C", ["negative", "zero", "positive", "exactly 4"], 3, "Two real solutions need Δ > 0."),
    mcq("y10-pi-m6", "Where does y = x² meet y = 1?", "A", ["x = 1 and −1", "x = 1 only", "x = 0 and 1", "x = ±2"], 2, "x² = 1 → x = ±1."),
    ans("y10-pi-m7", "y = x² and y = 5x meet where x² = 5x. Find the non-zero solution.", "", "5", 3, "x(x − 5) = 0 → x = 0 or 5.", ["x=5"]),
    mcq("y10-pi-m8", "A tangent line meets a parabola at:", "B", ["0 points", "1 point", "2 points", "3 points"], 2, "A tangent touches at exactly one point."),
    ans("y10-pi-m9", "How many points do y = x² + 3 and y = 3 intersect at?", "y=x^2+3,\\ y=3", "1", 3, "x² = 0 → x = 0, one point.", []),
    mcq("y10-pi-m10", "Where does y = x² meet y = 36?", "A", ["x = 6 and −6", "x = 6 only", "x = 36", "x = ±18"], 2, "x² = 36 → x = ±6."),
  ],
  commonMistakes: [
    { mistake: "Reading intersections off a sketch instead of solving.", fix: "Set the equations equal and solve the resulting quadratic." },
    { mistake: "Dropping the negative root, e.g. x² = 9 → x = 3 only.", fix: "x² = 9 gives x = 3 AND x = −3." },
    { mistake: "Losing the x = 0 solution when factorising x² = kx.", fix: "x(x − k) = 0 gives x = 0 and x = k." },
    { mistake: "Calling one solution 'no intersection'.", fix: "One solution means the line is a tangent (touches once)." },
  ],
  masteryPassMark: 0.8,
};

// ── 7H Rates of Change (path) ──────────────────────────────────────────────────────────
const ratesOfChange: Partial<ExplicitLesson> = {
  description: "Find an average rate of change as change in output per change in input — the gradient between two points.",
  learningIntention: "Calculate average rates of change and interpret them as gradients.",
  successCriteria: ["State a rate as change in output per change in input.", "Compute (y₂ − y₁)/(x₂ − x₁).", "Recognise a constant rate as a straight line.", "Interpret the sign of a rate."],
  teaching: {
    paragraphs: [
      "A RATE OF CHANGE measures how fast one quantity changes compared with another: change in OUTPUT per change in INPUT. Speed (km per hour), filling rate (litres per minute) and price growth are all rates.",
      "The AVERAGE rate of change between two points is the change in y divided by the change in x: (y₂ − y₁)/(x₂ − x₁). This is exactly the GRADIENT of the line joining the two points.",
      "For a car going 0 to 100 km in 2 hours, the rate is 100 ÷ 2 = 50 km/h. Between points (1, 3) and (4, 12): (12 − 3)/(4 − 1) = 9/3 = 3.",
      "A CONSTANT rate of change gives a straight line (the gradient never changes); a curve has a rate that VARIES. The sign matters too: a negative rate means the output is decreasing.",
    ],
    latexBlocks: ["\\text{rate} = \\frac{\\text{change in output}}{\\text{change in input}}", "\\text{average rate} = \\frac{y_2 - y_1}{x_2 - x_1}", "\\text{constant rate} \\Rightarrow \\text{straight line}"],
  },
  workedExamples: [
    { title: "Speed as a rate", questionLatex: "\\text{A car travels 100 km in 2 hours. Find the rate.}", steps: [{ explanation: "Output per input.", latex: "\\frac{100}{2} = 50 \\text{ km/h}" }], finalAnswerLatex: "50 \\text{ km/h}" },
    { title: "Rate between points", questionLatex: "\\text{Find the average rate of change from } (1,3) \\text{ to } (4,12).", steps: [{ explanation: "(y₂ − y₁)/(x₂ − x₁).", latex: "\\frac{12-3}{4-1} = \\frac{9}{3} = 3" }], finalAnswerLatex: "3" },
    { title: "A negative rate", questionLatex: "\\text{Find the rate from } (1,10) \\text{ to } (3,4).", steps: [{ explanation: "Change in y over change in x.", latex: "\\frac{4-10}{3-1} = \\frac{-6}{2} = -3" }], finalAnswerLatex: "-3" },
  ],
  guidedPractice: [
    mcq("y10-rc-g1", "A rate of change is:", "B", ["the total output", "change in output per change in input", "the input value", "the y-intercept"], 2, "A rate compares the change in output to the change in input."),
    ans("y10-rc-g2", "A car travels 150 km in 3 hours. Find the rate (km/h).", "150 \\text{ km in } 3 \\text{ h}", "50", 2, "150 ÷ 3 = 50 km/h.", ["50 km/h"]),
    ans("y10-rc-g3", "Find the average rate of change from (0, 0) to (5, 20).", "(0,0) \\to (5,20)", "4", 2, "(20 − 0)/(5 − 0) = 4.", []),
    ans("y10-rc-g4", "Temperature rises 12° in 4 hours. Find the rate (degrees/hour).", "12^\\circ \\text{ in } 4 \\text{ h}", "3", 2, "12 ÷ 4 = 3 °/h.", []),
  ],
  independentPractice: [
    mcq("y10-rc-i1", "The average rate of change between two points equals the:", "B", ["y-intercept", "gradient of the line joining them", "area under the curve", "product of the coordinates"], 2, "Average rate = rise/run = gradient."),
    ans("y10-rc-i2", "Find the average rate of change from (2, 5) to (6, 17).", "(2,5) \\to (6,17)", "3", 3, "(17 − 5)/(6 − 2) = 12/4 = 3.", []),
    ans("y10-rc-i3", "A car travels 240 km in 4 hours. Find the rate (km/h).", "240 \\text{ km in } 4 \\text{ h}", "60", 2, "240 ÷ 4 = 60 km/h.", ["60 km/h"]),
    ans("y10-rc-i4", "Find the average rate of change from (1, 10) to (3, 4).", "(1,10) \\to (3,4)", "-3", 3, "(4 − 10)/(3 − 1) = −6/2 = −3.", ["−3"]),
    mcq("y10-rc-i5", "A constant rate of change produces a:", "A", ["straight line", "parabola", "circle", "curve that steepens"], 2, "A constant gradient is a straight line."),
  ],
  masteryQuiz: [
    ans("y10-rc-m1", "Find the average rate of change from (0, 2) to (4, 14).", "(0,2) \\to (4,14)", "3", 3, "(14 − 2)/(4 − 0) = 12/4 = 3.", []),
    mcq("y10-rc-m2", "The average rate of change is the:", "B", ["y-intercept", "gradient between two points", "highest point", "x-intercept"], 2, "It is the gradient of the line joining the two points."),
    ans("y10-rc-m3", "A runner covers 100 m in 20 s. Find the rate (m/s).", "100 \\text{ m in } 20 \\text{ s}", "5", 2, "100 ÷ 20 = 5 m/s.", ["5 m/s"]),
    ans("y10-rc-m4", "Find the average rate of change from (1, 1) to (5, 9).", "(1,1) \\to (5,9)", "2", 2, "(9 − 1)/(5 − 1) = 8/4 = 2.", []),
    mcq("y10-rc-m5", "A curve (not a line) has a rate of change that:", "C", ["is always zero", "is constant", "varies", "is undefined"], 2, "On a curve the gradient changes from point to point."),
    ans("y10-rc-m6", "A tank fills 60 L in 5 minutes. Find the rate (L/min).", "60 \\text{ L in } 5 \\text{ min}", "12", 2, "60 ÷ 5 = 12 L/min.", ["12 L/min"]),
    ans("y10-rc-m7", "Find the average rate of change from (3, 12) to (7, 4).", "(3,12) \\to (7,4)", "-2", 3, "(4 − 12)/(7 − 3) = −8/4 = −2.", ["−2"]),
    mcq("y10-rc-m8", "The units of a rate of change are:", "C", ["input only", "output only", "output per input", "input per output"], 2, "A rate is output-units per input-units (e.g. km per hour)."),
    ans("y10-rc-m9", "Find the average rate of change from (2, 8) to (6, 8).", "(2,8) \\to (6,8)", "0", 3, "(8 − 8)/(6 − 2) = 0 — no change in output.", []),
    ans("y10-rc-m10", "A car travels 90 km in 1.5 hours. Find the rate (km/h).", "90 \\text{ km in } 1.5 \\text{ h}", "60", 3, "90 ÷ 1.5 = 60 km/h.", ["60 km/h"]),
  ],
  commonMistakes: [
    { mistake: "Dividing input by output instead of output by input.", fix: "Rate = change in output ÷ change in input." },
    { mistake: "Ignoring the sign of the change.", fix: "A decreasing output gives a negative rate." },
    { mistake: "Subtracting in inconsistent order.", fix: "Keep the same order top and bottom: (y₂ − y₁)/(x₂ − x₁)." },
    { mistake: "Expecting a curve to have one fixed rate.", fix: "Only a straight line has a constant rate of change." },
  ],
  masteryPassMark: 0.8,
};

// ── 7I Average and Instantaneous Rates (extending) ─────────────────────────────────────
const avgInstRates: Partial<ExplicitLesson> = {
  description: "Distinguish the average rate of change over an interval (gradient of a chord) from the instantaneous rate at a point (gradient of a tangent).",
  learningIntention: "Compute average rates over an interval and understand the instantaneous rate as a limit.",
  successCriteria: ["Compute the average rate over an interval as the gradient of a chord.", "Recognise the instantaneous rate as the gradient of the tangent at a point.", "See the instantaneous rate as the limit of average rates over shrinking intervals.", "Apply this to a simple curve such as y = x²."],
  teaching: {
    paragraphs: [
      "On a CURVE the rate of change is not fixed, so we distinguish two ideas. The AVERAGE rate of change over an interval is the gradient of the CHORD (secant) joining the two endpoints — exactly the rates-of-change calculation, (y₂ − y₁)/(x₂ − x₁).",
      "The INSTANTANEOUS rate of change is the rate at a SINGLE point — the gradient of the TANGENT line that just touches the curve there. It tells you how fast the quantity is changing at that exact instant.",
      "For y = x², the average rate from x = 1 to x = 3 is (9 − 1)/(3 − 1) = 4. Helpfully, for y = x² the average rate over [x₁, x₂] is just x₁ + x₂.",
      "The instantaneous rate is the LIMIT of the average rate as the interval shrinks to a point: take the chord's endpoints closer and closer together, and its gradient approaches the tangent's gradient. Average uses two points; instantaneous is the limiting value at one.",
    ],
    latexBlocks: ["\\text{average rate} = \\text{gradient of chord} = \\frac{y_2-y_1}{x_2-x_1}", "\\text{instantaneous rate} = \\text{gradient of tangent}", "\\text{for } y=x^2:\\ \\text{average over } [x_1,x_2] = x_1+x_2"],
  },
  workedExamples: [
    { title: "Average rate on a curve", questionLatex: "\\text{For } y=x^2, \\text{ find the average rate of change from } x=1 \\text{ to } x=3.", steps: [{ explanation: "Gradient of the chord.", latex: "\\frac{9-1}{3-1} = \\frac{8}{2} = 4" }], finalAnswerLatex: "4" },
    { title: "Instantaneous rate", questionLatex: "\\text{What gives the instantaneous rate at a point?}", steps: [{ explanation: "The tangent's gradient at that point.", latex: "\\text{gradient of the tangent}" }], finalAnswerLatex: "\\text{tangent gradient}" },
    { title: "Another interval", questionLatex: "\\text{For } y=x^2, \\text{ find the average rate from } x=2 \\text{ to } x=4.", steps: [{ explanation: "(16 − 4)/(4 − 2).", latex: "= \\frac{12}{2} = 6" }], finalAnswerLatex: "6" },
  ],
  guidedPractice: [
    mcq("y10-air-g1", "The average rate of change is the gradient of a:", "B", ["tangent", "chord (secant)", "vertical line", "axis"], 4, "Average rate = gradient of the chord joining the two endpoints."),
    ans("y10-air-g2", "For y = x², find the average rate of change from x = 1 to x = 3.", "y=x^2,\\ [1,3]", "4", 4, "(9 − 1)/(3 − 1) = 8/2 = 4.", []),
    mcq("y10-air-g3", "The instantaneous rate of change is the gradient of the:", "A", ["tangent", "chord", "x-axis", "secant"], 4, "Instantaneous rate is the tangent's gradient at that point."),
    ans("y10-air-g4", "For y = x², find the average rate of change from x = 0 to x = 2.", "y=x^2,\\ [0,2]", "2", 4, "(4 − 0)/(2 − 0) = 2.", []),
  ],
  independentPractice: [
    mcq("y10-air-i1", "An instantaneous rate of change is found at:", "B", ["two points", "a single point", "the y-intercept", "the x-intercepts"], 4, "It is the rate at one exact point (tangent gradient)."),
    ans("y10-air-i2", "For y = x², find the average rate of change from x = 2 to x = 4.", "y=x^2,\\ [2,4]", "6", 4, "(16 − 4)/(4 − 2) = 6.", []),
    mcq("y10-air-i3", "As the interval shrinks, the average rate approaches the:", "C", ["y-intercept", "average of the endpoints", "instantaneous rate", "axis of symmetry"], 5, "The chord gradient approaches the tangent gradient — the instantaneous rate."),
    ans("y10-air-i4", "For y = x², find the average rate of change from x = 3 to x = 5.", "y=x^2,\\ [3,5]", "8", 4, "(25 − 9)/(5 − 3) = 16/2 = 8.", []),
    ans("y10-air-i5", "For y = x², find the average rate of change from x = 1 to x = 2.", "y=x^2,\\ [1,2]", "3", 4, "(4 − 1)/(2 − 1) = 3.", []),
  ],
  masteryQuiz: [
    ans("y10-air-m1", "For y = x², find the average rate of change from x = 0 to x = 4.", "y=x^2,\\ [0,4]", "4", 4, "(16 − 0)/4 = 4.", []),
    mcq("y10-air-m2", "A chord gives the:", "A", ["average rate", "instantaneous rate", "maximum", "minimum"], 4, "The gradient of a chord is the average rate over the interval."),
    ans("y10-air-m3", "For y = x², find the average rate of change from x = 4 to x = 6.", "y=x^2,\\ [4,6]", "10", 4, "(36 − 16)/2 = 10 (= 4 + 6).", []),
    mcq("y10-air-m4", "A tangent gives the:", "B", ["average rate", "instantaneous rate", "y-intercept", "discriminant"], 4, "A tangent's gradient is the instantaneous rate."),
    ans("y10-air-m5", "For y = x², find the average rate of change from x = 1 to x = 5.", "y=x^2,\\ [1,5]", "6", 4, "(25 − 1)/4 = 6 (= 1 + 5).", []),
    mcq("y10-air-m6", "The instantaneous rate is the limit of the:", "A", ["average rate as the interval shrinks", "y-values", "x-intercepts", "constant term"], 5, "Shrinking the interval drives the average rate to the instantaneous rate."),
    ans("y10-air-m7", "For y = x², find the average rate of change from x = 2 to x = 6.", "y=x^2,\\ [2,6]", "8", 4, "(36 − 4)/4 = 8 (= 2 + 6).", []),
    mcq("y10-air-m8", "The average rate of change uses:", "C", ["one point", "the vertex", "two points", "the focus"], 4, "Average rate needs two points (the chord endpoints)."),
    ans("y10-air-m9", "For y = x², find the average rate of change from x = 0 to x = 3.", "y=x^2,\\ [0,3]", "3", 4, "(9 − 0)/3 = 3.", []),
    ans("y10-air-m10", "For y = x², find the average rate of change from x = 5 to x = 7.", "y=x^2,\\ [5,7]", "12", 4, "(49 − 25)/2 = 12 (= 5 + 7).", []),
  ],
  commonMistakes: [
    { mistake: "Confusing the chord (average) with the tangent (instantaneous).", fix: "Average = chord over an interval; instantaneous = tangent at a point." },
    { mistake: "Trying to find an instantaneous rate from two separated points.", fix: "Instantaneous rate is at a single point; average uses two." },
    { mistake: "Subtracting the squares in the wrong order.", fix: "Keep (y₂ − y₁)/(x₂ − x₁) consistent." },
    { mistake: "Thinking the average rate equals the value at the midpoint.", fix: "For y = x² the average over [x₁, x₂] is x₁ + x₂, the sum of the endpoints." },
  ],
  masteryPassMark: 0.8,
};

// ── 7J Direct and Inverse Variation (path) ─────────────────────────────────────────────
const directInverseVariation: Partial<ExplicitLesson> = {
  description: "Model direct variation (y = kx, constant ratio) and inverse variation (y = k/x, constant product).",
  learningIntention: "Set up and use direct and inverse variation relationships.",
  successCriteria: ["Recognise direct variation as a constant ratio y/x = k.", "Recognise inverse variation as a constant product xy = k.", "Find k from a given pair of values.", "Use the relationship to find an unknown value."],
  teaching: {
    paragraphs: [
      "Two quantities VARY DIRECTLY when their RATIO is constant: y = kx, so y/x = k always. Doubling x doubles y. The graph is a straight line through the origin, and k is its gradient.",
      "Find k from one known pair, then use it. If y = 12 when x = 4, then k = 12/4 = 3, so y = 3x; when x = 6, y = 18.",
      "Two quantities VARY INVERSELY when their PRODUCT is constant: y = k/x, so xy = k always. Doubling x HALVES y (more workers, less time). Find k by multiplying a known pair.",
      "If y = 6 when x = 2, then k = 6 × 2 = 12, so y = 12/x; when x = 4, y = 3. The key contrast: direct keeps the ratio constant (line through origin); inverse keeps the product constant (a curve).",
    ],
    latexBlocks: ["\\text{direct: } y = kx,\\ \\tfrac{y}{x} = k", "\\text{inverse: } y = \\tfrac{k}{x},\\ xy = k", "\\text{direct doubles, inverse halves when } x \\text{ doubles}"],
  },
  workedExamples: [
    { title: "Direct variation", questionLatex: "\\text{y varies directly with x; } y=12 \\text{ when } x=4. \\text{ Find y when } x=6.", steps: [{ explanation: "Find k = y/x.", latex: "k = 12/4 = 3" }, { explanation: "Use y = 3x.", latex: "y = 3 \\times 6 = 18" }], finalAnswerLatex: "18" },
    { title: "Inverse variation", questionLatex: "\\text{y varies inversely with x; } y=6 \\text{ when } x=2. \\text{ Find y when } x=4.", steps: [{ explanation: "Find k = xy.", latex: "k = 6 \\times 2 = 12" }, { explanation: "Use y = 12/x.", latex: "y = 12/4 = 3" }], finalAnswerLatex: "3" },
    { title: "Identifying", questionLatex: "\\text{If } xy \\text{ stays constant, which kind of variation is it?}", steps: [{ explanation: "Constant product.", latex: "\\text{inverse}" }], finalAnswerLatex: "\\text{inverse}" },
  ],
  guidedPractice: [
    mcq("y10-dv-g1", "In direct variation, which stays constant?", "A", ["the ratio y/x", "the product xy", "the sum x + y", "the difference y − x"], 2, "Direct variation keeps the ratio y/x = k constant."),
    ans("y10-dv-g2", "y varies directly with x and y = 10 when x = 2. Find k.", "y=kx,\\ y=10,x=2", "5", 2, "k = y/x = 10/2 = 5.", []),
    ans("y10-dv-g3", "y = kx with k = 5. Find y when x = 4.", "y=5x", "20", 2, "y = 5 × 4 = 20.", []),
    mcq("y10-dv-g4", "In inverse variation, which stays constant?", "B", ["the ratio y/x", "the product xy", "the sum x + y", "the gradient"], 2, "Inverse variation keeps the product xy = k constant."),
  ],
  independentPractice: [
    ans("y10-dv-i1", "y varies directly with x and y = 15 when x = 3. Find k.", "y=kx,\\ y=15,x=3", "5", 2, "k = 15/3 = 5.", []),
    mcq("y10-dv-i2", "In inverse variation, doubling x:", "B", ["doubles y", "halves y", "leaves y unchanged", "squares y"], 3, "Since xy is constant, doubling x halves y."),
    ans("y10-dv-i3", "y varies inversely with x and y = 4 when x = 3. Find k.", "xy=k,\\ y=4,x=3", "12", 2, "k = xy = 4 × 3 = 12.", []),
    ans("y10-dv-i4", "y = 12/x. Find y when x = 6.", "y=12/x", "2", 2, "y = 12/6 = 2.", []),
    mcq("y10-dv-i5", "The graph of a direct variation is a:", "A", ["straight line through the origin", "parabola", "curve with asymptotes", "horizontal line"], 2, "y = kx is a straight line through (0, 0)."),
  ],
  masteryQuiz: [
    ans("y10-dv-m1", "y varies directly with x and y = 20 when x = 5. Find k.", "y=kx,\\ y=20,x=5", "4", 2, "k = 20/5 = 4.", []),
    mcq("y10-dv-m2", "y = k/x represents:", "B", ["direct variation", "inverse variation", "a quadratic", "no variation"], 2, "y = k/x is inverse variation (constant product)."),
    ans("y10-dv-m3", "y = 3x (direct). Find y when x = 7.", "y=3x", "21", 2, "y = 3 × 7 = 21.", []),
    ans("y10-dv-m4", "y varies inversely with x and y = 2 when x = 10. Find k.", "xy=k,\\ y=2,x=10", "20", 3, "k = 2 × 10 = 20.", []),
    mcq("y10-dv-m5", "If y varies directly with x, doubling x:", "A", ["doubles y", "halves y", "leaves y unchanged", "squares y"], 2, "y = kx, so doubling x doubles y."),
    ans("y10-dv-m6", "y = 24/x (inverse). Find y when x = 8.", "y=24/x", "3", 3, "y = 24/8 = 3.", []),
    ans("y10-dv-m7", "y varies directly with x and y = 18 when x = 2. Find k.", "y=kx,\\ y=18,x=2", "9", 2, "k = 18/2 = 9.", []),
    mcq("y10-dv-m8", "A constant product xy = k describes:", "B", ["direct variation", "inverse variation", "linear growth", "a tangent"], 2, "Constant product is inverse variation."),
    ans("y10-dv-m9", "y = 6x (direct). Find y when x = 5.", "y=6x", "30", 2, "y = 6 × 5 = 30.", []),
    ans("y10-dv-m10", "y = 36/x (inverse). Find y when x = 9.", "y=36/x", "4", 3, "y = 36/9 = 4.", []),
  ],
  commonMistakes: [
    { mistake: "Mixing up direct and inverse.", fix: "Direct keeps the ratio y/x constant; inverse keeps the product xy constant." },
    { mistake: "Adding instead of multiplying to find k for inverse variation.", fix: "Inverse k = x × y from a known pair." },
    { mistake: "Expecting y to rise when x rises in inverse variation.", fix: "In inverse variation, as x increases y decreases." },
    { mistake: "Forgetting a direct-variation line passes through the origin.", fix: "y = kx has y-intercept 0." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "sketching-by-factorisation": sketchFactorisation,
  "sketching-completing-square": sketchCompletingSquare,
  "sketching-quadratic-formula-discriminant": discriminant,
  "parabola-applications": parabolaApplications,
  "intersection-lines-parabolas": lineParabolaIntersection,
  "rates-of-change": ratesOfChange,
  "average-instantaneous-rates": avgInstRates,
  "direct-inverse-variation": directInverseVariation,
};

export function year10ParabolasVariationWave6LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "parabolas-rates-variation"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
