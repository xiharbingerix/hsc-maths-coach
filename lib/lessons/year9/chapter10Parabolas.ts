// Year 9 Wave 11 — Chapter 10, parabola sections (ADR-Y9-001, all path): the-parabola,
// sketching-dilations-reflections, sketching-translations, sketching-parabolas-intercept-form.
// Full per-subtopic contract. Unique id prefixes (par/sdr/str/spi).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Compare with y = x²; the vertex form y = (x − h)² + k has vertex (h, k).", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the transformation.", explanation };
}
const pt = (a: string) => [a, `(${a})`, a.replace(/[()\s]/g, "")];

// ── the-parabola (path) ────────────────────────────────────────────────────────────────
const theParabola: Partial<ExplicitLesson> = {
  description: "Recognise the basic parabola y = x²: its vertex, axis of symmetry and shape.",
  learningIntention: "Describe the key features of y = x².",
  successCriteria: ["Evaluate y = x².", "State the vertex (0, 0).", "State the axis of symmetry x = 0.", "Know it opens upward."],
  teaching: {
    paragraphs: [
      "The basic PARABOLA is y = x². It is a U-shaped curve with its lowest point — the VERTEX — at the origin (0, 0).",
      "It is symmetric about the y-axis, so its AXIS OF SYMMETRY is x = 0. Points either side match: at x = 3 and x = −3 both give y = 9.",
      "Because the coefficient of x² is positive, it OPENS UPWARD (concave up).",
      "Substitute to find points: y = x² at x = 2 is 4.",
    ],
    latexBlocks: ["y = x^2:\\ \\text{vertex } (0,0),\\ \\text{axis } x = 0", "x = 3 \\Rightarrow y = 9"],
  },
  workedExamples: [
    { title: "Evaluate", questionLatex: "y = x^2 \\text{ at } x = 3.", steps: [{ explanation: "3².", latex: "9" }], finalAnswerLatex: "9" },
    { title: "Vertex", questionLatex: "\\text{Vertex of } y = x^2?", steps: [{ explanation: "Lowest point.", latex: "(0,0)" }], finalAnswerLatex: "(0,0)" },
    { title: "Axis", questionLatex: "\\text{Axis of symmetry of } y = x^2?", steps: [{ explanation: "The y-axis.", latex: "x = 0" }], finalAnswerLatex: "x = 0" },
  ],
  guidedPractice: [
    ans("y9-par-g1", "For y = x², find y when x = 2.", "y=x^2,x=2", "4", 2, "2² = 4.", []),
    ans("y9-par-g2", "For y = x², find y when x = −3.", "y=x^2,x=-3", "9", 2, "(−3)² = 9.", []),
    ans("y9-par-g3", "State the vertex of y = x². Give the point.", "vertex", "(0,0)", 2, "(0, 0).", pt("0,0")),
    mcq("y9-par-g4", "The parabola y = x² opens:", "A", ["upward", "downward", "left", "right"], 2, "Positive x² coefficient → up."),
  ],
  independentPractice: [
    ans("y9-par-i1", "For y = x², find y when x = 4.", "y=x^2,x=4", "16", 2, "16.", []),
    ans("y9-par-i2", "For y = x², find y when x = −5.", "y=x^2,x=-5", "25", 2, "25.", []),
    ans("y9-par-i3", "State the axis of symmetry of y = x².", "axis", "x=0", 2, "x = 0.", ["x = 0"]),
    mcq("y9-par-i4", "The lowest point of y = x² is called the:", "B", ["intercept", "vertex", "axis", "root"], 2, "Vertex."),
    ans("y9-par-i5", "For y = x², find y when x = 1.", "y=x^2,x=1", "1", 2, "1.", []),
  ],
  masteryQuiz: [
    ans("y9-par-m1", "For y = x², find y when x = 3.", "y=x^2,x=3", "9", 2, "9.", []),
    ans("y9-par-m2", "State the vertex of y = x². Give the point.", "vertex", "(0,0)", 2, "(0, 0).", pt("0,0")),
    ans("y9-par-m3", "State the axis of symmetry of y = x².", "axis", "x=0", 2, "x = 0.", ["x = 0"]),
    ans("y9-par-m4", "For y = x², find y when x = −4.", "y=x^2,x=-4", "16", 2, "16.", []),
    mcq("y9-par-m5", "y = x² is symmetric about the:", "C", ["x-axis", "line y = x", "y-axis", "origin only"], 2, "The y-axis."),
    ans("y9-par-m6", "For y = x², find y when x = 6.", "y=x^2,x=6", "36", 2, "36.", []),
    ans("y9-par-m7", "On y = x², the point with x = −2 has the same y-value as x =", "symmetry", "2", 3, "Symmetry: x = 2.", []),
    ans("y9-par-m8", "For y = x², find y when x = 0.", "y=x^2,x=0", "0", 2, "0 (the vertex).", []),
    mcq("y9-par-m9", "Because the x² coefficient is positive, y = x² is:", "A", ["concave up", "concave down", "a straight line", "a circle"], 2, "Concave up."),
    ans("y9-par-m10", "For y = x², find y when x = 10.", "y=x^2,x=10", "100", 2, "100.", []),
  ],
  masteryQuizPool: [
    ans("y9-par-p1", "On y = x², which positive x gives y = 49?", "y=49", "7", 5, "√49 = 7.", []),
    ans("y9-par-p2", "On y = x², which positive x gives y = 64?", "y=64", "8", 5, "√64 = 8.", []),
    ans("y9-par-p3", "For y = x², find y when x = −7.", "x=-7", "49", 5, "49.", []),
    ans("y9-par-p4", "Two points on y = x² have x = 5 and x = −5. What is each y-value?", "symmetry", "25", 5, "Both 25.", []),
    ans("y9-par-p5", "On y = x², which positive x gives y = 144?", "y=144", "12", 5, "12.", []),
    ans("y9-par-p6", "State the minimum value of y = x².", "min", "0", 5, "Minimum at the vertex = 0.", []),
    ans("y9-par-p7", "For y = x², find y when x = 1.5.", "x=1.5", "2.25", 5, "1.5² = 2.25.", []),
    ans("y9-par-p8", "On y = x², which positive x gives y = 0.25?", "y=0.25", "0.5", 5, "√0.25 = 0.5.", ["1/2"]),
    ans("y9-par-p9", "Does y = x² have a maximum or a minimum? (answer max/min)", "max/min", "min", 5, "It opens up → minimum.", []),
    ans("y9-par-p10", "For y = x², find y when x = −1.", "x=-1", "1", 5, "1.", []),
  ],
  commonMistakes: [
    { mistake: "Thinking (−3)² is negative.", fix: "(−3)² = 9." },
    { mistake: "Placing the vertex away from the origin.", fix: "y = x² has vertex (0, 0)." },
    { mistake: "Saying it opens downward.", fix: "Positive x² coefficient → opens up." },
    { mistake: "Confusing axis of symmetry with the x-axis.", fix: "It is the y-axis, x = 0." },
  ],
  masteryPassMark: 0.8,
};

// ── sketching-dilations-reflections (path) ─────────────────────────────────────────────
const dilationsReflections: Partial<ExplicitLesson> = {
  description: "Sketch y = ax²: dilations (narrower/wider) and reflections (opening down).",
  learningIntention: "Describe how a changes the parabola y = ax².",
  successCriteria: ["Evaluate y = ax².", "Know a > 1 is narrower, 0 < a < 1 is wider.", "Know a < 0 reflects (opens down).", "Keep the vertex at the origin."],
  teaching: {
    paragraphs: [
      "For y = ax², the value of a controls the shape. If a > 1 the parabola is NARROWER than y = x²; if 0 < a < 1 it is WIDER.",
      "If a is NEGATIVE, the parabola is REFLECTED and OPENS DOWNWARD. y = −x² opens down; y = −x² at x = 2 is −4.",
      "The vertex stays at the origin (0, 0) for y = ax².",
      "Evaluate as usual: y = 2x² at x = 2 is 8.",
    ],
    latexBlocks: ["y = ax^2:\\ a>1\\text{ narrower},\\ 0<a<1\\text{ wider}", "a<0 \\Rightarrow \\text{opens down}"],
  },
  workedExamples: [
    { title: "Evaluate", questionLatex: "y = 2x^2 \\text{ at } x = 2.", steps: [{ explanation: "2 × 4.", latex: "8" }], finalAnswerLatex: "8" },
    { title: "Reflection", questionLatex: "\\text{Which way does } y = -x^2 \\text{ open?}", steps: [{ explanation: "a < 0.", latex: "\\text{down}" }], finalAnswerLatex: "\\text{down}" },
    { title: "Width", questionLatex: "\\text{Is } y = 3x^2 \\text{ narrower or wider than } y=x^2?", steps: [{ explanation: "a > 1.", latex: "\\text{narrower}" }], finalAnswerLatex: "\\text{narrower}" },
  ],
  guidedPractice: [
    ans("y9-sdr-g1", "For y = 2x², find y when x = 1.", "y=2x^2,x=1", "2", 2, "2.", []),
    ans("y9-sdr-g2", "For y = −x², find y when x = 2.", "y=-x^2,x=2", "-4", 3, "−4.", ["−4"]),
    ans("y9-sdr-g3", "Which way does y = −x² open? (up/down)", "y=-x^2", "down", 2, "a < 0 → down.", []),
    mcq("y9-sdr-g4", "For y = ax², if a > 1 the parabola is:", "A", ["narrower than y = x²", "wider", "opens down", "a line"], 2, "Narrower."),
  ],
  independentPractice: [
    ans("y9-sdr-i1", "For y = 3x², find y when x = 2.", "y=3x^2,x=2", "12", 2, "3 × 4 = 12.", []),
    ans("y9-sdr-i2", "For y = −2x², find y when x = 3.", "y=-2x^2,x=3", "-18", 3, "−2 × 9 = −18.", ["−18"]),
    ans("y9-sdr-i3", "Is y = ½x² narrower or wider than y = x²?", "y=0.5x^2", "wider", 3, "0 < a < 1 → wider.", []),
    mcq("y9-sdr-i4", "y = −3x² opens:", "B", ["up", "down", "left", "right"], 2, "a < 0 → down."),
    ans("y9-sdr-i5", "For y = ½x², find y when x = 2.", "y=0.5x^2,x=2", "2", 3, "½ × 4 = 2.", []),
  ],
  masteryQuiz: [
    ans("y9-sdr-m1", "For y = 2x², find y when x = 2.", "y=2x^2,x=2", "8", 2, "8.", []),
    ans("y9-sdr-m2", "Which way does y = −x² open? (up/down)", "y=-x^2", "down", 2, "Down.", []),
    ans("y9-sdr-m3", "For y = −x², find y when x = 3.", "y=-x^2,x=3", "-9", 3, "−9.", ["−9"]),
    mcq("y9-sdr-m4", "y = 4x² compared with y = x² is:", "A", ["narrower", "wider", "the same", "opening down"], 2, "Narrower (a > 1)."),
    ans("y9-sdr-m5", "For y = 5x², find y when x = 2.", "y=5x^2,x=2", "20", 2, "5 × 4 = 20.", []),
    mcq("y9-sdr-m6", "A negative coefficient of x² causes a:", "C", ["dilation only", "translation", "reflection (opens down)", "shift up"], 2, "Reflection."),
    ans("y9-sdr-m7", "For y = −3x², find y when x = 1.", "y=-3x^2,x=1", "-3", 3, "−3.", ["−3"]),
    ans("y9-sdr-m8", "Is y = 0.25x² narrower or wider than y = x²?", "y=0.25x^2", "wider", 3, "Wider.", []),
    ans("y9-sdr-m9", "State the vertex of y = 2x². Give the point.", "vertex", "(0,0)", 3, "(0, 0).", pt("0,0")),
    mcq("y9-sdr-m10", "y = −2x² has its vertex as a:", "B", ["minimum", "maximum", "neither", "intercept"], 3, "Opens down → maximum at the vertex."),
  ],
  masteryQuizPool: [
    ans("y9-sdr-p1", "For y = −2x², find y when x = 4.", "y=-2x^2,x=4", "-32", 5, "−2 × 16 = −32.", ["−32"]),
    ans("y9-sdr-p2", "For y = 3x², find y when x = −2.", "y=3x^2,x=-2", "12", 5, "3 × 4 = 12.", []),
    ans("y9-sdr-p3", "Order y = x², y = 2x², y = ½x² from narrowest — give the narrowest's coefficient.", "narrowest", "2", 5, "Largest a is narrowest → 2.", []),
    ans("y9-sdr-p4", "For y = −½x², find y when x = 2.", "y=-0.5x^2,x=2", "-2", 5, "−½ × 4 = −2.", ["−2"]),
    ans("y9-sdr-p5", "y = ax² passes through (2, 12). Find a.", "(2,12)", "3", 5, "12 = a(4) → a = 3.", []),
    ans("y9-sdr-p6", "y = ax² passes through (1, −5). Find a.", "(1,-5)", "-5", 5, "−5 = a(1) → a = −5.", ["−5"]),
    ans("y9-sdr-p7", "For y = 4x², find y when x = 3.", "y=4x^2,x=3", "36", 5, "4 × 9 = 36.", []),
    ans("y9-sdr-p8", "Does y = −4x² have a maximum or minimum? (max/min)", "max/min", "max", 5, "Opens down → maximum.", []),
    ans("y9-sdr-p9", "y = ax² passes through (3, 18). Find a.", "(3,18)", "2", 5, "18 = a(9) → a = 2.", []),
    ans("y9-sdr-p10", "For y = −x², find y when x = −5.", "y=-x^2,x=-5", "-25", 5, "−(25) = −25.", ["−25"]),
  ],
  commonMistakes: [
    { mistake: "Thinking a larger a makes it wider.", fix: "a > 1 makes it narrower." },
    { mistake: "Forgetting the reflection for negative a.", fix: "a < 0 opens the parabola downward." },
    { mistake: "Sign error squaring then multiplying.", fix: "Square first, then apply a (incl. its sign)." },
    { mistake: "Moving the vertex.", fix: "y = ax² still has vertex (0, 0)." },
  ],
  masteryPassMark: 0.8,
};

// ── sketching-translations (path) ──────────────────────────────────────────────────────
const translations: Partial<ExplicitLesson> = {
  description: "Sketch translations of y = x²: y = x² + k (vertical) and y = (x − h)² (horizontal).",
  learningIntention: "Find the vertex of a translated parabola.",
  successCriteria: ["Know y = x² + k shifts up/down.", "Know y = (x − h)² shifts left/right.", "State the vertex (h, k).", "Combine both translations."],
  teaching: {
    paragraphs: [
      "y = x² + k shifts the parabola VERTICALLY: +k up, −k down. Vertex (0, k). So y = x² + 3 has vertex (0, 3).",
      "y = (x − h)² shifts HORIZONTALLY: (x − h) moves RIGHT by h; (x + h) moves LEFT. Vertex (h, 0). So y = (x − 2)² has vertex (2, 0).",
      "Combined, y = (x − h)² + k has vertex (h, k): y = (x − 1)² + 4 has vertex (1, 4).",
      "Read the vertex straight from this form.",
    ],
    latexBlocks: ["y = (x-h)^2 + k:\\ \\text{vertex } (h, k)", "y = x^2 + 3 \\Rightarrow (0, 3)"],
  },
  workedExamples: [
    { title: "Vertical", questionLatex: "\\text{Vertex of } y = x^2 + 3?", steps: [{ explanation: "(0, k).", latex: "(0, 3)" }], finalAnswerLatex: "(0,3)" },
    { title: "Horizontal", questionLatex: "\\text{Vertex of } y = (x - 2)^2?", steps: [{ explanation: "(h, 0).", latex: "(2, 0)" }], finalAnswerLatex: "(2,0)" },
    { title: "Combined", questionLatex: "\\text{Vertex of } y = (x - 1)^2 + 4?", steps: [{ explanation: "(h, k).", latex: "(1, 4)" }], finalAnswerLatex: "(1,4)" },
  ],
  guidedPractice: [
    ans("y9-str-g1", "State the vertex of y = x² + 5. Give the point.", "y=x^2+5", "(0,5)", 3, "(0, 5).", pt("0,5")),
    ans("y9-str-g2", "State the vertex of y = (x − 3)². Give the point.", "y=(x-3)^2", "(3,0)", 3, "(3, 0).", pt("3,0")),
    ans("y9-str-g3", "State the vertex of y = (x + 2)². Give the point.", "y=(x+2)^2", "(-2,0)", 3, "(−2, 0).", pt("-2,0")),
    mcq("y9-str-g4", "y = x² − 4 shifts the parabola:", "B", ["up 4", "down 4", "right 4", "left 4"], 2, "−4 → down 4."),
  ],
  independentPractice: [
    ans("y9-str-i1", "State the vertex of y = x² − 2. Give the point.", "y=x^2-2", "(0,-2)", 3, "(0, −2).", pt("0,-2")),
    ans("y9-str-i2", "State the vertex of y = (x − 5)². Give the point.", "y=(x-5)^2", "(5,0)", 3, "(5, 0).", pt("5,0")),
    ans("y9-str-i3", "State the vertex of y = (x − 2)² + 3. Give the point.", "y=(x-2)^2+3", "(2,3)", 4, "(2, 3).", pt("2,3")),
    mcq("y9-str-i4", "y = (x + 3)² shifts the parabola:", "D", ["up 3", "down 3", "right 3", "left 3"], 3, "(x + 3) → left 3."),
    ans("y9-str-i5", "State the vertex of y = x² + 7. Give the point.", "y=x^2+7", "(0,7)", 3, "(0, 7).", pt("0,7")),
  ],
  masteryQuiz: [
    ans("y9-str-m1", "State the vertex of y = x² + 3. Give the point.", "y=x^2+3", "(0,3)", 3, "(0, 3).", pt("0,3")),
    ans("y9-str-m2", "State the vertex of y = (x − 2)². Give the point.", "y=(x-2)^2", "(2,0)", 3, "(2, 0).", pt("2,0")),
    ans("y9-str-m3", "State the vertex of y = (x − 1)² + 4. Give the point.", "y=(x-1)^2+4", "(1,4)", 4, "(1, 4).", pt("1,4")),
    mcq("y9-str-m4", "The vertex of y = (x − h)² + k is:", "A", ["(h, k)", "(−h, k)", "(h, −k)", "(k, h)"], 3, "(h, k)."),
    ans("y9-str-m5", "State the vertex of y = (x + 4)². Give the point.", "y=(x+4)^2", "(-4,0)", 3, "(−4, 0).", pt("-4,0")),
    ans("y9-str-m6", "State the vertex of y = x² − 6. Give the point.", "y=x^2-6", "(0,-6)", 3, "(0, −6).", pt("0,-6")),
    ans("y9-str-m7", "State the vertex of y = (x + 1)² − 3. Give the point.", "y=(x+1)^2-3", "(-1,-3)", 4, "(−1, −3).", pt("-1,-3")),
    mcq("y9-str-m8", "y = x² + 5 compared with y = x² is shifted:", "A", ["up 5", "down 5", "right 5", "left 5"], 2, "Up 5."),
    ans("y9-str-m9", "State the vertex of y = (x − 6)² + 2. Give the point.", "y=(x-6)^2+2", "(6,2)", 4, "(6, 2).", pt("6,2")),
    mcq("y9-str-m10", "In y = (x − h)², a positive h shifts the curve:", "C", ["up", "down", "right", "left"], 3, "Right by h."),
  ],
  masteryQuizPool: [
    ans("y9-str-p1", "State the vertex of y = (x − 3)² + 5. Give the point.", "y=(x-3)^2+5", "(3,5)", 5, "(3, 5).", pt("3,5")),
    ans("y9-str-p2", "State the vertex of y = (x + 2)² − 4. Give the point.", "y=(x+2)^2-4", "(-2,-4)", 5, "(−2, −4).", pt("-2,-4")),
    ans("y9-str-p3", "State the vertex of y = (x − 4)² − 1. Give the point.", "y=(x-4)^2-1", "(4,-1)", 5, "(4, −1).", pt("4,-1")),
    ans("y9-str-p4", "A parabola y = x² is shifted right 5 and up 2. Give its vertex.", "shift R5 U2", "(5,2)", 5, "(5, 2).", pt("5,2")),
    ans("y9-str-p5", "State the vertex of y = (x + 5)² + 3. Give the point.", "y=(x+5)^2+3", "(-5,3)", 5, "(−5, 3).", pt("-5,3")),
    ans("y9-str-p6", "A parabola y = x² is shifted left 3 and down 4. Give its vertex.", "shift L3 D4", "(-3,-4)", 5, "(−3, −4).", pt("-3,-4")),
    ans("y9-str-p7", "The vertex of a parabola is (2, −5). Write it in the form y = (x − h)² + k — give k.", "vertex (2,-5)", "-5", 5, "k = −5.", ["−5"]),
    ans("y9-str-p8", "State the vertex of y = (x − 1)² − 1. Give the point.", "y=(x-1)^2-1", "(1,-1)", 5, "(1, −1).", pt("1,-1")),
    ans("y9-str-p9", "For y = (x − 2)² + 3, find y when x = 2.", "x=2", "3", 5, "At the vertex y = 3.", []),
    ans("y9-str-p10", "State the vertex of y = x² + 10. Give the point.", "y=x^2+10", "(0,10)", 5, "(0, 10).", pt("0,10")),
  ],
  commonMistakes: [
    { mistake: "Shifting (x − h)² the wrong way.", fix: "(x − h) moves RIGHT by h; (x + h) moves left." },
    { mistake: "Swapping the vertex coordinates.", fix: "y = (x − h)² + k has vertex (h, k)." },
    { mistake: "Confusing vertical and horizontal shifts.", fix: "+k is vertical; the bracket is horizontal." },
    { mistake: "Sign error reading h.", fix: "(x + 2)² means h = −2 → left 2." },
  ],
  masteryPassMark: 0.8,
};

// ── sketching-parabolas-intercept-form (path) ──────────────────────────────────────────
const interceptForm: Partial<ExplicitLesson> = {
  description: "Sketch parabolas in intercept form y = (x − a)(x − b): x-intercepts, y-intercept and axis of symmetry.",
  learningIntention: "Read intercepts and the axis from y = (x − a)(x − b).",
  successCriteria: ["Find the x-intercepts a and b.", "Find the y-intercept (set x = 0).", "Find the axis of symmetry (midpoint of roots).", "Use these to sketch."],
  teaching: {
    paragraphs: [
      "In INTERCEPT (factor) form y = (x − a)(x − b), the X-INTERCEPTS are x = a and x = b (where y = 0).",
      "The Y-INTERCEPT is found by setting x = 0: for y = (x − 2)(x − 4), y = (−2)(−4) = 8.",
      "The AXIS OF SYMMETRY is halfway between the x-intercepts: x = (a + b)/2. For roots 2 and 4, axis x = 3.",
      "These three features let you sketch the parabola.",
    ],
    latexBlocks: ["y = (x-a)(x-b):\\ x\\text{-ints } a, b", "\\text{axis } x = \\tfrac{a+b}{2}"],
  },
  workedExamples: [
    { title: "x-intercepts", questionLatex: "\\text{x-ints of } y = (x-2)(x-4)?", steps: [{ explanation: "y = 0.", latex: "2, 4" }], finalAnswerLatex: "2, 4" },
    { title: "y-intercept", questionLatex: "\\text{y-int of } y = (x-2)(x-4)?", steps: [{ explanation: "x = 0.", latex: "8" }], finalAnswerLatex: "8" },
    { title: "Axis", questionLatex: "\\text{Axis of } y = (x-2)(x-4)?", steps: [{ explanation: "(2 + 4)/2.", latex: "x = 3" }], finalAnswerLatex: "x = 3" },
  ],
  guidedPractice: [
    ans("y9-spi-g1", "Find the x-intercepts of y = (x − 1)(x − 5). Give the larger.", "(x-1)(x-5)", "5", 3, "x = 1 or 5.", []),
    ans("y9-spi-g2", "Find the y-intercept of y = (x − 1)(x − 5).", "(x-1)(x-5),x=0", "5", 3, "(−1)(−5) = 5.", []),
    ans("y9-spi-g3", "Find the axis of symmetry of y = (x − 1)(x − 5).", "axis", "3", 3, "(1 + 5)/2 = 3.", ["x=3", "x = 3"]),
    mcq("y9-spi-g4", "The x-intercepts of a parabola are where:", "A", ["y = 0", "x = 0", "y = x", "the vertex is"], 2, "y = 0."),
  ],
  independentPractice: [
    ans("y9-spi-i1", "Find the x-intercepts of y = (x − 2)(x − 6). Give the larger.", "(x-2)(x-6)", "6", 3, "2 or 6.", []),
    ans("y9-spi-i2", "Find the y-intercept of y = (x − 2)(x − 6).", "(x-2)(x-6),x=0", "12", 3, "(−2)(−6) = 12.", []),
    ans("y9-spi-i3", "Find the axis of symmetry of y = (x − 2)(x − 6).", "axis", "4", 3, "(2 + 6)/2 = 4.", ["x=4", "x = 4"]),
    ans("y9-spi-i4", "Find the x-intercepts of y = x(x − 4). Give the non-zero one.", "x(x-4)", "4", 3, "0 or 4.", []),
    mcq("y9-spi-i5", "The axis of symmetry is at the x-value:", "C", ["of the y-intercept", "0 always", "midway between the x-intercepts", "of the larger root"], 3, "Midpoint of the roots."),
  ],
  masteryQuiz: [
    ans("y9-spi-m1", "Find the x-intercepts of y = (x − 2)(x − 4). Give the larger.", "(x-2)(x-4)", "4", 3, "2 or 4.", []),
    ans("y9-spi-m2", "Find the y-intercept of y = (x − 2)(x − 4).", "(x-2)(x-4),x=0", "8", 3, "8.", []),
    ans("y9-spi-m3", "Find the axis of symmetry of y = (x − 2)(x − 4).", "axis", "3", 3, "x = 3.", ["x=3", "x = 3"]),
    ans("y9-spi-m4", "Find the x-intercepts of y = (x + 1)(x − 3). Give the positive one.", "(x+1)(x-3)", "3", 3, "−1 or 3.", []),
    mcq("y9-spi-m5", "To find the y-intercept of y = (x − a)(x − b) you set:", "B", ["y = 0", "x = 0", "x = a", "x = b"], 2, "x = 0."),
    ans("y9-spi-m6", "Find the y-intercept of y = (x + 1)(x − 3).", "(x+1)(x-3),x=0", "-3", 3, "(1)(−3) = −3.", ["−3"]),
    ans("y9-spi-m7", "Find the axis of symmetry of y = (x + 1)(x − 3).", "axis", "1", 4, "(−1 + 3)/2 = 1.", ["x=1", "x = 1"]),
    ans("y9-spi-m8", "Find the x-intercepts of y = (x − 3)(x − 7). Give the smaller.", "(x-3)(x-7)", "3", 3, "3 or 7.", []),
    ans("y9-spi-m9", "Find the y-intercept of y = (x − 3)(x − 7).", "(x-3)(x-7),x=0", "21", 4, "(−3)(−7) = 21.", []),
    mcq("y9-spi-m10", "The x-intercepts of y = (x − a)(x − b) are:", "A", ["a and b", "−a and −b", "ab", "(a + b)/2"], 2, "x = a and x = b."),
  ],
  masteryQuizPool: [
    ans("y9-spi-p1", "Find the axis of symmetry of y = (x − 1)(x − 7).", "(x-1)(x-7)", "4", 5, "(1 + 7)/2 = 4.", ["x=4", "x = 4"]),
    ans("y9-spi-p2", "Find the y-intercept of y = (x − 5)(x + 2).", "(x-5)(x+2),x=0", "-10", 5, "(−5)(2) = −10.", ["−10"]),
    ans("y9-spi-p3", "Find the x-intercepts of y = (x + 3)(x + 5). Give the larger.", "(x+3)(x+5)", "-3", 5, "−3 or −5.", ["−3"]),
    ans("y9-spi-p4", "Find the axis of symmetry of y = (x + 3)(x + 5).", "axis", "-4", 5, "(−3 + −5)/2 = −4.", ["x=-4", "x = −4"]),
    ans("y9-spi-p5", "Find the y-intercept of y = x(x − 6).", "x(x-6),x=0", "0", 5, "0 × (−6) = 0.", []),
    ans("y9-spi-p6", "Find the axis of symmetry of y = x(x − 6).", "axis", "3", 5, "(0 + 6)/2 = 3.", ["x=3", "x = 3"]),
    ans("y9-spi-p7", "Find the x-intercepts of y = (2x − 4)(x − 3). Give the smaller.", "(2x-4)(x-3)", "2", 5, "2x − 4 = 0 → x = 2; or 3.", []),
    ans("y9-spi-p8", "Find the y-intercept of y = (x − 2)(x − 4) − wait, of y = (x + 1)(x + 6).", "(x+1)(x+6),x=0", "6", 5, "(1)(6) = 6.", []),
    ans("y9-spi-p9", "Find the axis of symmetry of y = (x − 2)(x − 8).", "(x-2)(x-8)", "5", 5, "(2 + 8)/2 = 5.", ["x=5", "x = 5"]),
    ans("y9-spi-p10", "Find the x-intercepts of y = (x − 4)(x + 4). Give the positive one.", "(x-4)(x+4)", "4", 5, "±4.", []),
  ],
  commonMistakes: [
    { mistake: "Reading x-intercepts with the wrong sign.", fix: "(x − 2) = 0 gives x = 2." },
    { mistake: "Forgetting to set x = 0 for the y-intercept.", fix: "y-intercept = (−a)(−b)." },
    { mistake: "Taking the axis as a root.", fix: "Axis is the midpoint (a + b)/2." },
    { mistake: "Sign error multiplying for the y-intercept.", fix: "Two negatives multiply to a positive." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "the-parabola": theParabola,
  "sketching-dilations-reflections": dilationsReflections,
  "sketching-translations": translations,
  "sketching-parabolas-intercept-form": interceptForm,
};

export function year9Chapter10ParabolasLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "quadratic-equations-parabolas") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
