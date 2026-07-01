// Year 9 Wave 5 — Chapter 4 (Linear Relationships), graphing-basics sections (ADR-Y9-001):
// introducing-linear-relationships (consol), graphing-lines-using-intercepts (path),
// lines-with-one-intercept (core), gradient-direct-proportion (path). Full per-subtopic contract.
// (gradient itself was authored in Wave 1 and is handled by its own override.)

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Substitute carefully; a line is y = mx + c.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about what each part of the equation means.", explanation };
}

// ── introducing-linear-relationships (consolidating) ───────────────────────────────────
const introducingLinear: Partial<ExplicitLesson> = {
  description: "Recognise linear relationships from tables and equations, and find values from a rule.",
  learningIntention: "Identify linear relationships and use a linear rule.",
  successCriteria: ["Find y from a linear rule.", "Recognise a linear relationship from a table.", "Know a linear graph is a straight line.", "Find x given y."],
  teaching: {
    paragraphs: [
      "A LINEAR relationship has a rule of the form y = mx + c and graphs as a STRAIGHT LINE. To find y, substitute the value of x: for y = 2x + 1 with x = 3, y = 7.",
      "In a TABLE, a relationship is linear when y changes by a CONSTANT amount each time x increases by 1 — a constant first difference.",
      "For x = 1, 2, 3 giving y = 3, 5, 7, the difference is always 2, so it is linear.",
      "You can also work backwards: given y, solve for x.",
    ],
    latexBlocks: ["y = 2x + 1,\\ x = 3 \\Rightarrow y = 7", "\\text{constant difference} \\Rightarrow \\text{linear}"],
  },
  workedExamples: [
    { title: "Find y", questionLatex: "y = 2x + 1, \\ x = 3.", steps: [{ explanation: "2(3) + 1.", latex: "7" }], finalAnswerLatex: "7" },
    { title: "Linear from table", questionLatex: "x: 1,2,3 \\to y: 3,5,7. \\text{ Linear?}", steps: [{ explanation: "Constant difference 2.", latex: "\\text{yes}" }], finalAnswerLatex: "\\text{yes}" },
    { title: "Find y at x=0", questionLatex: "y = x + 4, \\ x = 0.", steps: [{ explanation: "0 + 4.", latex: "4" }], finalAnswerLatex: "4" },
  ],
  guidedPractice: [
    ans("y9-ilr-g1", "For y = 3x, find y when x = 2.", "y=3x", "6", 2, "3 × 2 = 6.", []),
    ans("y9-ilr-g2", "For y = x + 5, find y when x = 1.", "y=x+5", "6", 2, "1 + 5 = 6.", []),
    ans("y9-ilr-g3", "For y = 2x − 1, find y when x = 4.", "y=2x-1", "7", 2, "8 − 1 = 7.", []),
    mcq("y9-ilr-g4", "The graph of a linear relationship is a:", "B", ["curve", "straight line", "parabola", "circle"], 2, "Linear → straight line."),
  ],
  independentPractice: [
    ans("y9-ilr-i1", "For y = 4x, find y when x = 3.", "y=4x", "12", 2, "12.", []),
    ans("y9-ilr-i2", "For y = 2x + 3, find y when x = 5.", "y=2x+3", "13", 2, "13.", []),
    ans("y9-ilr-i3", "For y = 5 − x, find y when x = 2.", "y=5-x", "3", 2, "5 − 2 = 3.", []),
    mcq("y9-ilr-i4", "A table shows a constant first difference. The relationship is:", "A", ["linear", "quadratic", "not a relationship", "circular"], 3, "Constant difference → linear."),
    ans("y9-ilr-i5", "For y = x − 7, find y when x = 10.", "y=x-7", "3", 2, "3.", []),
  ],
  masteryQuiz: [
    ans("y9-ilr-m1", "For y = 2x + 1, find y when x = 0.", "y=2x+1", "1", 2, "1.", []),
    ans("y9-ilr-m2", "For y = 3x − 2, find y when x = 4.", "y=3x-2", "10", 2, "10.", []),
    ans("y9-ilr-m3", "For y = 10 − 2x, find y when x = 3.", "y=10-2x", "4", 2, "10 − 6 = 4.", []),
    mcq("y9-ilr-m4", "Which rule is linear?", "A", ["y = 2x + 1", "y = x²", "y = 1/x", "y = x³"], 3, "y = 2x + 1 is linear."),
    ans("y9-ilr-m5", "For y = x/2, find y when x = 8.", "y=\\tfrac{x}{2}", "4", 2, "4.", []),
    ans("y9-ilr-m6", "For y = 6 − x, find y when x = 6.", "y=6-x", "0", 2, "0.", []),
    ans("y9-ilr-m7", "For y = 5x + 5, find y when x = 2.", "y=5x+5", "15", 2, "15.", []),
    mcq("y9-ilr-m8", "x: 0,1,2 → y: 5,8,11. The relationship is:", "A", ["linear (difference 3)", "quadratic", "not linear", "constant"], 3, "Constant difference 3 → linear."),
    ans("y9-ilr-m9", "For y = −x + 3, find y when x = 5.", "y=-x+3", "-2", 3, "−5 + 3 = −2.", ["−2"]),
    mcq("y9-ilr-m10", "A linear rule always has the form:", "C", ["y = ax²", "y = a/x", "y = mx + c", "y = aˣ"], 2, "Linear: y = mx + c."),
  ],
  masteryQuizPool: [
    ans("y9-ilr-p1", "For y = 2x + 1, find x when y = 11.", "y=2x+1,\\ y=11", "5", 5, "2x + 1 = 11 → x = 5.", []),
    ans("y9-ilr-p2", "x: 0,1,2 → y: 5,8,11. Find the rate of change.", "\\text{rate}", "3", 5, "Constant difference = 3.", []),
    ans("y9-ilr-p3", "For y = 3x − 4, find x when y = 11.", "y=3x-4,\\ y=11", "5", 5, "3x − 4 = 11 → x = 5.", []),
    ans("y9-ilr-p4", "For y = 10 − 2x, find x when y = 0.", "y=10-2x,\\ y=0", "5", 5, "10 − 2x = 0 → x = 5.", []),
    ans("y9-ilr-p5", "A line passes through (0, 4) and rises 3 for each step in x. Find y when x = 5.", "", "19", 5, "y = 3(5) + 4 = 19.", []),
    ans("y9-ilr-p6", "For y = 4x − 1, find x when y = 19.", "y=4x-1,\\ y=19", "5", 5, "4x − 1 = 19 → x = 5.", []),
    ans("y9-ilr-p7", "x: 1,2,3 → y: 4,7,10. Find y when x = 5.", "\\text{extend}", "16", 5, "Rule y = 3x + 1 → 16.", []),
    ans("y9-ilr-p8", "For y = 0.5x + 2, find y when x = 10.", "y=0.5x+2", "7", 5, "5 + 2 = 7.", []),
    ans("y9-ilr-p9", "For y = 100 − 5x, find x when y = 50.", "y=100-5x,\\ y=50", "10", 5, "100 − 5x = 50 → x = 10.", []),
    ans("y9-ilr-p10", "A table has y = 2, 5, 8, 11 for x = 0, 1, 2, 3. Find the value of c (when x = 0).", "c", "2", 5, "y-intercept is 2.", []),
  ],
  commonMistakes: [
    { mistake: "Treating any rule as linear.", fix: "Linear has the form y = mx + c (no x², 1/x, etc.)." },
    { mistake: "Order-of-operations slip when substituting.", fix: "Multiply before adding: 2x + 1." },
    { mistake: "Assuming a table is linear without checking.", fix: "Check the first difference is constant." },
    { mistake: "Confusing the rate with the starting value.", fix: "m is the rate; c is the value at x = 0." },
  ],
  masteryPassMark: 0.8,
};

// ── graphing-lines-using-intercepts (path) ─────────────────────────────────────────────
const graphingIntercepts: Partial<ExplicitLesson> = {
  description: "Find the x- and y-intercepts of a line and use them to sketch it.",
  learningIntention: "Find both intercepts of a linear equation.",
  successCriteria: ["Find the x-intercept by setting y = 0.", "Find the y-intercept by setting x = 0.", "Work from either form of the equation.", "Use intercepts to sketch."],
  teaching: {
    paragraphs: [
      "A straight line usually crosses both axes. The X-INTERCEPT is where the line meets the x-axis, found by setting y = 0. The Y-INTERCEPT is where it meets the y-axis, found by setting x = 0.",
      "For 2x + 3y = 6: setting y = 0 gives 2x = 6, so x = 3 (x-intercept). Setting x = 0 gives 3y = 6, so y = 2 (y-intercept).",
      "From y = 2x − 4: the y-intercept is −4 (x = 0); the x-intercept is where 0 = 2x − 4, so x = 2.",
      "Plotting the two intercepts and joining them sketches the line.",
    ],
    latexBlocks: ["\\text{x-int: set } y=0;\\ \\text{y-int: set } x=0", "2x+3y=6:\\ x\\text{-int}=3,\\ y\\text{-int}=2"],
  },
  workedExamples: [
    { title: "x-intercept", questionLatex: "2x+3y=6. \\text{ Find the x-intercept.}", steps: [{ explanation: "y = 0 → 2x = 6.", latex: "x = 3" }], finalAnswerLatex: "3" },
    { title: "y-intercept", questionLatex: "2x+3y=6. \\text{ Find the y-intercept.}", steps: [{ explanation: "x = 0 → 3y = 6.", latex: "y = 2" }], finalAnswerLatex: "2" },
    { title: "From y = mx + c", questionLatex: "y = 2x - 4. \\text{ Find the x-intercept.}", steps: [{ explanation: "0 = 2x − 4.", latex: "x = 2" }], finalAnswerLatex: "2" },
  ],
  guidedPractice: [
    ans("y9-gi-g1", "Find the x-intercept of x + y = 4.", "x+y=4", "4", 2, "y = 0 → x = 4.", []),
    ans("y9-gi-g2", "Find the y-intercept of x + y = 4.", "x+y=4", "4", 2, "x = 0 → y = 4.", []),
    ans("y9-gi-g3", "Find the y-intercept of 2x + y = 6.", "2x+y=6", "6", 2, "x = 0 → y = 6.", []),
    mcq("y9-gi-g4", "The x-intercept is found by setting:", "A", ["y = 0", "x = 0", "y = x", "x = 1"], 2, "x-intercept: y = 0."),
  ],
  independentPractice: [
    ans("y9-gi-i1", "Find the x-intercept of 3x + 2y = 12.", "3x+2y=12", "4", 3, "y = 0 → 3x = 12 → x = 4.", []),
    ans("y9-gi-i2", "Find the y-intercept of 3x + 2y = 12.", "3x+2y=12", "6", 3, "x = 0 → 2y = 12 → y = 6.", []),
    ans("y9-gi-i3", "Find the x-intercept of y = x − 3.", "y=x-3", "3", 2, "0 = x − 3 → x = 3.", []),
    ans("y9-gi-i4", "Find the y-intercept of y = 2x + 8.", "y=2x+8", "8", 2, "x = 0 → y = 8.", []),
    mcq("y9-gi-i5", "The y-intercept is found by setting:", "B", ["y = 0", "x = 0", "y = 1", "x = y"], 2, "y-intercept: x = 0."),
  ],
  masteryQuiz: [
    ans("y9-gi-m1", "Find the x-intercept of x + y = 7.", "x+y=7", "7", 2, "7.", []),
    ans("y9-gi-m2", "Find the y-intercept of 2x + y = 8.", "2x+y=8", "8", 2, "8.", []),
    ans("y9-gi-m3", "Find the x-intercept of x − y = 5.", "x-y=5", "5", 2, "y = 0 → x = 5.", []),
    ans("y9-gi-m4", "Find the x-intercept of y = 3x − 6.", "y=3x-6", "2", 3, "0 = 3x − 6 → x = 2.", []),
    mcq("y9-gi-m5", "At the y-intercept, the value of x is:", "B", ["1", "0", "y", "−1"], 2, "x = 0 there."),
    ans("y9-gi-m6", "Find the x-intercept of 4x + 2y = 8.", "4x+2y=8", "2", 3, "y = 0 → 4x = 8 → x = 2.", []),
    ans("y9-gi-m7", "Find the y-intercept of 4x + 2y = 8.", "4x+2y=8", "4", 3, "x = 0 → 2y = 8 → y = 4.", []),
    ans("y9-gi-m8", "Find the y-intercept of y = x + 2.", "y=x+2", "2", 2, "2.", []),
    ans("y9-gi-m9", "Find the x-intercept of 5x − y = 10.", "5x-y=10", "2", 3, "y = 0 → 5x = 10 → x = 2.", []),
    mcq("y9-gi-m10", "To sketch a line from intercepts you need:", "C", ["one point", "the gradient only", "two points (the intercepts)", "three points"], 2, "Plot the two intercepts and join."),
  ],
  masteryQuizPool: [
    ans("y9-gi-p1", "Find the x-intercept of 3x − 4y = 12.", "3x-4y=12", "4", 5, "y = 0 → 3x = 12 → x = 4.", []),
    ans("y9-gi-p2", "Find the y-intercept of 3x − 4y = 12.", "3x-4y=12", "-3", 5, "x = 0 → −4y = 12 → y = −3.", ["−3"]),
    ans("y9-gi-p3", "Find the x-intercept of 2x + 5y = 20.", "2x+5y=20", "10", 5, "y = 0 → 2x = 20 → x = 10.", []),
    ans("y9-gi-p4", "Find the y-intercept of 2x + 5y = 20.", "2x+5y=20", "4", 5, "x = 0 → 5y = 20 → y = 4.", []),
    ans("y9-gi-p5", "Find the x-intercept of y = 4x + 8.", "y=4x+8", "-2", 5, "0 = 4x + 8 → x = −2.", ["−2"]),
    ans("y9-gi-p6", "Find the x-intercept of 6x + 3y = 18.", "6x+3y=18", "3", 5, "y = 0 → 6x = 18 → x = 3.", []),
    ans("y9-gi-p7", "Find the y-intercept of 6x + 3y = 18.", "6x+3y=18", "6", 5, "x = 0 → 3y = 18 → y = 6.", []),
    ans("y9-gi-p8", "Find the x-intercept of y = −2x + 10.", "y=-2x+10", "5", 5, "0 = −2x + 10 → x = 5.", []),
    ans("y9-gi-p9", "Find the y-intercept of 5x − 2y = 20.", "5x-2y=20", "-10", 5, "x = 0 → −2y = 20 → y = −10.", ["−10"]),
    ans("y9-gi-p10", "Find the x-intercept of 4x − 3y = 24.", "4x-3y=24", "6", 5, "y = 0 → 4x = 24 → x = 6.", []),
  ],
  commonMistakes: [
    { mistake: "Swapping which variable to zero.", fix: "x-intercept: set y = 0; y-intercept: set x = 0." },
    { mistake: "Dropping a negative when solving.", fix: "Watch signs: −4y = 12 → y = −3." },
    { mistake: "Reading the y-intercept as the x-intercept.", fix: "Check which axis the point is on." },
    { mistake: "Sketching from one intercept only.", fix: "Use both intercepts to draw the line." },
  ],
  masteryPassMark: 0.8,
};

// ── lines-with-one-intercept (core) ────────────────────────────────────────────────────
const linesOneIntercept: Partial<ExplicitLesson> = {
  description: "Recognise and describe horizontal lines (y = c) and vertical lines (x = c).",
  learningIntention: "Work with horizontal and vertical lines.",
  successCriteria: ["Identify y = c as horizontal.", "Identify x = c as vertical.", "State the gradient of horizontal/vertical lines.", "Name the axes as lines."],
  teaching: {
    paragraphs: [
      "A line of the form y = c (a number) is HORIZONTAL — every point has the same y-value. Its gradient is 0.",
      "A line of the form x = c is VERTICAL — every point has the same x-value. Its gradient is UNDEFINED.",
      "The x-axis is the line y = 0; the y-axis is the line x = 0.",
      "These lines cross only one axis (unless they are an axis themselves).",
    ],
    latexBlocks: ["y = c \\text{ horizontal (gradient } 0)", "x = c \\text{ vertical (gradient undefined)}"],
  },
  workedExamples: [
    { title: "Horizontal", questionLatex: "\\text{Describe } y = 3.", steps: [{ explanation: "Same y everywhere.", latex: "\\text{horizontal}" }], finalAnswerLatex: "\\text{horizontal}" },
    { title: "Vertical", questionLatex: "\\text{Describe } x = -2.", steps: [{ explanation: "Same x everywhere.", latex: "\\text{vertical}" }], finalAnswerLatex: "\\text{vertical}" },
    { title: "An axis", questionLatex: "\\text{What line is the x-axis?}", steps: [{ explanation: "y is 0 along it.", latex: "y = 0" }], finalAnswerLatex: "y = 0" },
  ],
  guidedPractice: [
    ans("y9-loi-g1", "Is y = 5 horizontal or vertical?", "y=5", "horizontal", 2, "y = c is horizontal.", []),
    ans("y9-loi-g2", "Is x = 4 horizontal or vertical?", "x=4", "vertical", 2, "x = c is vertical.", []),
    ans("y9-loi-g3", "The line y = 2 has every point with y-value equal to:", "y=2", "2", 2, "y = 2.", []),
    mcq("y9-loi-g4", "The line x = 0 is the:", "B", ["x-axis", "y-axis", "line y = x", "origin"], 2, "x = 0 is the y-axis."),
  ],
  independentPractice: [
    ans("y9-loi-i1", "State the gradient of y = 4.", "y=4", "0", 2, "Horizontal → gradient 0.", []),
    ans("y9-loi-i2", "Is x = 7 horizontal or vertical?", "x=7", "vertical", 2, "Vertical.", []),
    ans("y9-loi-i3", "The line y = −3 crosses the y-axis at:", "y=-3", "-3", 2, "y = −3.", ["−3"]),
    mcq("y9-loi-i4", "A vertical line has gradient:", "C", ["0", "1", "not defined", "−1"], 3, "A vertical line's gradient is not defined."),
    ans("y9-loi-i5", "The x-axis is the line with equation:", "\\text{x-axis}", "y=0", 2, "y = 0.", ["y = 0"]),
  ],
  masteryQuiz: [
    ans("y9-loi-m1", "Is y = 6 horizontal or vertical?", "y=6", "horizontal", 2, "Horizontal.", []),
    ans("y9-loi-m2", "State the gradient of y = −2.", "y=-2", "0", 2, "0.", []),
    ans("y9-loi-m3", "Is x = 3 horizontal or vertical?", "x=3", "vertical", 2, "Vertical.", []),
    mcq("y9-loi-m4", "Which equation is a horizontal line?", "A", ["y = 5", "x = 5", "y = x", "y = 2x"], 2, "y = 5 is horizontal."),
    ans("y9-loi-m5", "Write the equation of the horizontal line through (0, 5).", "(0,5)", "y=5", 3, "y = 5.", ["y = 5"]),
    ans("y9-loi-m6", "The y-axis has equation:", "\\text{y-axis}", "x=0", 2, "x = 0.", ["x = 0"]),
    ans("y9-loi-m7", "State the gradient of a vertical line.", "\\text{vertical}", "not defined", 3, "A vertical line's gradient is not defined.", ["undefined", "no gradient"]),
    ans("y9-loi-m8", "The line y = 0 is the:", "y=0", "x-axis", 2, "x-axis.", ["x axis"]),
    ans("y9-loi-m9", "The line x = −5 crosses the x-axis at:", "x=-5", "-5", 2, "−5.", ["−5"]),
    mcq("y9-loi-m10", "Which equation is a vertical line?", "B", ["y = 3", "x = 3", "y = 3x", "y = x + 3"], 2, "x = 3 is vertical."),
  ],
  masteryQuizPool: [
    ans("y9-loi-p1", "Write the equation of the vertical line through (4, 7).", "(4,7)", "x=4", 5, "x = 4.", ["x = 4"]),
    ans("y9-loi-p2", "Write the equation of the horizontal line through (−2, 3).", "(-2,3)", "y=3", 5, "y = 3.", ["y = 3"]),
    ans("y9-loi-p3", "Two horizontal lines y = 2 and y = 5 — are they parallel? (yes/no)", "y=2,\\ y=5", "yes", 5, "Both horizontal (gradient 0) → parallel.", []),
    ans("y9-loi-p4", "Where do x = 3 and y = 5 intersect? Give the point.", "x=3,y=5", "(3,5)", 5, "x = 3 and y = 5 → (3, 5).", ["3,5"]),
    ans("y9-loi-p5", "State the gradient of the line through (1, 4) and (6, 4).", "(1,4)-(6,4)", "0", 5, "Same y → horizontal → gradient 0.", []),
    ans("y9-loi-p6", "Is the line through (2, 1) and (2, 7) horizontal or vertical?", "(2,1)-(2,7)", "vertical", 5, "Same x = 2 → vertical.", []),
    ans("y9-loi-p7", "Write the equation of the line through (2, 1) and (2, 7).", "(2,1)-(2,7)", "x=2", 5, "Vertical line x = 2.", ["x = 2"]),
    ans("y9-loi-p8", "Where does y = −4 cross the y-axis? Give the point.", "y=-4", "(0,-4)", 5, "(0, −4).", ["0,-4", "(0,−4)"]),
    ans("y9-loi-p9", "Are x = 1 and x = 4 parallel? (yes/no)", "x=1,\\ x=4", "yes", 5, "Both vertical → parallel.", []),
    ans("y9-loi-p10", "The horizontal line through (3, −2) has equation:", "(3,-2)", "y=-2", 5, "y = −2.", ["y = −2"]),
  ],
  commonMistakes: [
    { mistake: "Swapping horizontal and vertical.", fix: "y = c is horizontal; x = c is vertical." },
    { mistake: "Giving a vertical line a gradient of 0.", fix: "Vertical gradient is undefined; horizontal is 0." },
    { mistake: "Mixing up the axes' equations.", fix: "x-axis: y = 0; y-axis: x = 0." },
    { mistake: "Writing y = c as x = c.", fix: "Match the constant to the axis it fixes." },
  ],
  masteryPassMark: 0.8,
};

// ── gradient-direct-proportion (path) ──────────────────────────────────────────────────
const gradientDirectProportion: Partial<ExplicitLesson> = {
  description: "Connect direct proportion y = kx with gradient through the origin.",
  learningIntention: "Use y = kx, where the gradient is the constant of proportionality.",
  successCriteria: ["Recognise y = kx passes through the origin.", "Find the constant k.", "Use the rule to find y or x.", "Interpret k in context."],
  teaching: {
    paragraphs: [
      "DIRECT PROPORTION means y = kx — y is a constant multiple of x. Its graph is a straight line THROUGH THE ORIGIN (0, 0), and the GRADIENT is the constant k.",
      "If y = 3x then k = 3. If y is 12 when x is 4, then k = 12 ÷ 4 = 3, so y = 3x.",
      "Once you have k, find any value: y = 3x at x = 10 gives 30.",
      "In context, k is a rate — e.g. cost per item, or speed.",
    ],
    latexBlocks: ["y = kx \\text{ (through the origin)}", "y = 12, x = 4 \\Rightarrow k = 3"],
  },
  workedExamples: [
    { title: "Read k", questionLatex: "y = 3x. \\text{ Find } k.", steps: [{ explanation: "Coefficient of x.", latex: "3" }], finalAnswerLatex: "3" },
    { title: "Find k", questionLatex: "y = 12 \\text{ when } x = 4. \\text{ Find } k.", steps: [{ explanation: "12 ÷ 4.", latex: "3" }], finalAnswerLatex: "3" },
    { title: "Gradient", questionLatex: "\\text{Gradient of } y = 5x?", steps: [{ explanation: "k = 5.", latex: "5" }], finalAnswerLatex: "5" },
  ],
  guidedPractice: [
    ans("y9-gdp-g1", "For y = 2x, state k.", "y=2x", "2", 2, "k = 2.", []),
    ans("y9-gdp-g2", "y = 10 when x = 2 and y = kx. Find k.", "y=kx", "5", 2, "10 ÷ 2 = 5.", []),
    ans("y9-gdp-g3", "For y = 4x, find y when x = 3.", "y=4x", "12", 2, "12.", []),
    mcq("y9-gdp-g4", "A direct proportion graph passes through:", "A", ["the origin", "(0, 1)", "(1, 0)", "(1, 1)"], 2, "y = kx passes through (0, 0)."),
  ],
  independentPractice: [
    ans("y9-gdp-i1", "State the gradient of y = 7x.", "y=7x", "7", 2, "7.", []),
    ans("y9-gdp-i2", "y = 20 when x = 5 and y = kx. Find k.", "y=kx", "4", 2, "20 ÷ 5 = 4.", []),
    ans("y9-gdp-i3", "For y = 6x, find y when x = 5.", "y=6x", "30", 2, "30.", []),
    mcq("y9-gdp-i4", "The graph of y = kx is a straight line through:", "C", ["(1, 0)", "(0, k)", "(0, 0)", "(k, 0)"], 2, "Through the origin."),
    ans("y9-gdp-i5", "For y = 3x, find y when x = 10.", "y=3x", "30", 2, "30.", []),
  ],
  masteryQuiz: [
    ans("y9-gdp-m1", "State k for y = 8x.", "y=8x", "8", 2, "8.", []),
    ans("y9-gdp-m2", "y = 15 when x = 3 and y = kx. Find k.", "y=kx", "5", 2, "5.", []),
    ans("y9-gdp-m3", "For y = 5x, find y when x = 6.", "y=5x", "30", 2, "30.", []),
    mcq("y9-gdp-m4", "In y = kx, the constant k is the:", "A", ["gradient", "y-intercept", "x-intercept", "midpoint"], 2, "k is the gradient."),
    ans("y9-gdp-m5", "y = 24 when x = 6 and y = kx. Find k.", "y=kx", "4", 2, "4.", []),
    ans("y9-gdp-m6", "For y = 2x, find x when y = 14.", "y=2x", "7", 3, "14 ÷ 2 = 7.", []),
    ans("y9-gdp-m7", "State k for y = 11x.", "y=11x", "11", 2, "11.", []),
    ans("y9-gdp-m8", "For y = 9x, find y when x = 4.", "y=9x", "36", 2, "36.", []),
    mcq("y9-gdp-m9", "Which equation is a direct proportion?", "B", ["y = x + 2", "y = 4x", "y = x²", "y = 5"], 2, "y = 4x (through origin)."),
    ans("y9-gdp-m10", "y = 18 when x = 2 and y = kx. Find k.", "y=kx", "9", 2, "9.", []),
  ],
  masteryQuizPool: [
    ans("y9-gdp-p1", "5 pens cost $15 (cost ∝ number). Find the cost of 8 pens.", "C=kn", "24", 5, "k = 3; 8 × 3 = $24.", ["$24"]),
    ans("y9-gdp-p2", "y = kx, y = 21 when x = 7. Find y when x = 10.", "y=kx", "30", 5, "k = 3; y = 30.", []),
    ans("y9-gdp-p3", "A car travels 180 km in 3 h (distance ∝ time). How far in 5 h?", "d=kt", "300", 5, "k = 60; 5 × 60 = 300 km.", ["300 km"]),
    ans("y9-gdp-p4", "y = kx, y = 40 when x = 8. Find x when y = 25.", "y=kx", "5", 5, "k = 5; x = 25 ÷ 5 = 5.", []),
    ans("y9-gdp-p5", "3 kg of apples cost $7.50 (cost ∝ mass). Find the cost of 5 kg.", "C=km", "12.50", 5, "k = 2.5; 5 × 2.5 = $12.50.", ["$12.50", "12.5"]),
    ans("y9-gdp-p6", "y = kx, y = 100 when x = 25. Find k.", "y=kx", "4", 5, "100 ÷ 25 = 4.", []),
    ans("y9-gdp-p7", "A worker earns $96 for 8 hours (pay ∝ hours). Find pay for 5 hours.", "P=kh", "60", 5, "k = 12; 5 × 12 = $60.", ["$60"]),
    ans("y9-gdp-p8", "y = kx through (4, 10). Find y when x = 6.", "y=kx", "15", 5, "k = 2.5; 6 × 2.5 = 15.", []),
    ans("y9-gdp-p9", "Petrol: 40 L costs $72 (cost ∝ litres). Find the cost of 25 L.", "C=kL", "45", 5, "k = 1.8; 25 × 1.8 = $45.", ["$45"]),
    ans("y9-gdp-p10", "y = kx, y = 56 when x = 8. Find y when x = 11.", "y=kx", "77", 5, "k = 7; 11 × 7 = 77.", []),
  ],
  commonMistakes: [
    { mistake: "Adding a y-intercept to a direct proportion.", fix: "Direct proportion is y = kx (c = 0)." },
    { mistake: "Computing k as x ÷ y.", fix: "k = y ÷ x." },
    { mistake: "Forgetting the graph passes through the origin.", fix: "y = kx always goes through (0, 0)." },
    { mistake: "Mixing up the rate with a total.", fix: "k is the per-unit rate." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "introducing-linear-relationships": introducingLinear,
  "graphing-lines-using-intercepts": graphingIntercepts,
  "lines-with-one-intercept": linesOneIntercept,
  "gradient-direct-proportion": gradientDirectProportion,
};

export function year9Chapter4GraphingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "linear-relationships") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
