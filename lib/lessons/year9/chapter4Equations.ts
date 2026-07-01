// Year 9 Wave 5 — Chapter 4, line-equation sections (ADR-Y9-001, all core):
// gradient-intercept-form, finding-equation-of-a-line, linear-modelling. Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Compare with y = mx + c.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Identify m and c.", explanation };
}

// ── gradient-intercept-form (core) ─────────────────────────────────────────────────────
const gradientInterceptForm: Partial<ExplicitLesson> = {
  description: "Read the gradient and y-intercept from the form y = mx + c.",
  learningIntention: "Identify m and c from a linear equation.",
  successCriteria: ["State the gradient m.", "State the y-intercept c.", "Rearrange to y = mx + c first.", "Interpret m and c."],
  teaching: {
    paragraphs: [
      "The GRADIENT-INTERCEPT form is y = mx + c, where m is the GRADIENT and c is the Y-INTERCEPT.",
      "For y = 2x + 3: the gradient is 2 and the y-intercept is 3. For y = −x + 5: gradient −1, y-intercept 5.",
      "If c is missing, it is 0: y = 3x has gradient 3 and y-intercept 0.",
      "If the equation isn't in this form, REARRANGE first (make y the subject), then read off m and c.",
    ],
    latexBlocks: ["y = mx + c", "y = 2x + 3 \\Rightarrow m = 2,\\ c = 3"],
  },
  workedExamples: [
    { title: "Read m and c", questionLatex: "y = 2x + 3.", steps: [{ explanation: "m = 2, c = 3.", latex: "m=2,\\ c=3" }], finalAnswerLatex: "m=2,\\ c=3" },
    { title: "Negative gradient", questionLatex: "y = -x + 5.", steps: [{ explanation: "m = −1, c = 5.", latex: "m=-1,\\ c=5" }], finalAnswerLatex: "m=-1,\\ c=5" },
    { title: "No constant", questionLatex: "y = 3x.", steps: [{ explanation: "c = 0.", latex: "m=3,\\ c=0" }], finalAnswerLatex: "m=3,\\ c=0" },
  ],
  guidedPractice: [
    ans("y9-gif-g1", "State the gradient of y = 4x + 1.", "y=4x+1", "4", 2, "m = 4.", []),
    ans("y9-gif-g2", "State the y-intercept of y = 4x + 1.", "y=4x+1", "1", 2, "c = 1.", []),
    ans("y9-gif-g3", "State the gradient of y = −2x + 7.", "y=-2x+7", "-2", 2, "m = −2.", ["−2"]),
    mcq("y9-gif-g4", "In y = mx + c, c is the:", "B", ["gradient", "y-intercept", "x-intercept", "midpoint"], 2, "c is the y-intercept."),
  ],
  independentPractice: [
    ans("y9-gif-i1", "State the gradient of y = 5x − 2.", "y=5x-2", "5", 2, "5.", []),
    ans("y9-gif-i2", "State the y-intercept of y = 5x − 2.", "y=5x-2", "-2", 2, "−2.", ["−2"]),
    ans("y9-gif-i3", "State the y-intercept of y = −3x + 6.", "y=-3x+6", "6", 2, "6.", []),
    ans("y9-gif-i4", "State the gradient of y = x.", "y=x", "1", 2, "m = 1.", []),
    mcq("y9-gif-i5", "In y = mx + c, m is the:", "A", ["gradient", "y-intercept", "x-value", "constant"], 2, "m is the gradient."),
  ],
  masteryQuiz: [
    ans("y9-gif-m1", "State the gradient of y = 6x + 2.", "y=6x+2", "6", 2, "6.", []),
    ans("y9-gif-m2", "State the y-intercept of y = 6x + 2.", "y=6x+2", "2", 2, "2.", []),
    ans("y9-gif-m3", "State the gradient of y = −4x − 1.", "y=-4x-1", "-4", 2, "−4.", ["−4"]),
    ans("y9-gif-m4", "State the y-intercept of y = 2x.", "y=2x", "0", 2, "c = 0.", []),
    mcq("y9-gif-m5", "The line y = 3x − 7 has gradient:", "C", ["−7", "7", "3", "−3"], 2, "m = 3."),
    ans("y9-gif-m6", "State the gradient of y = −x + 9.", "y=-x+9", "-1", 2, "−1.", ["−1"]),
    ans("y9-gif-m7", "State the y-intercept of y = 7x − 5.", "y=7x-5", "-5", 2, "−5.", ["−5"]),
    ans("y9-gif-m8", "State the gradient of y = 0.5x + 3.", "y=0.5x+3", "0.5", 2, "0.5.", ["1/2"]),
    mcq("y9-gif-m9", "Which line has y-intercept 4?", "A", ["y = 2x + 4", "y = 4x", "y = x − 4", "y = 4x + 1"], 2, "c = 4 in y = 2x + 4."),
    ans("y9-gif-m10", "State the y-intercept of y = −2x − 8.", "y=-2x-8", "-8", 2, "−8.", ["−8"]),
  ],
  masteryQuizPool: [
    ans("y9-gif-p1", "Rearrange 2y = 4x + 6 to y = mx + c and state m.", "2y=4x+6", "2", 5, "y = 2x + 3 → m = 2.", []),
    ans("y9-gif-p2", "Rearrange x + y = 5 and state the gradient.", "x+y=5", "-1", 5, "y = −x + 5 → m = −1.", ["−1"]),
    ans("y9-gif-p3", "Rearrange 3x − y = 2 and state the gradient.", "3x-y=2", "3", 5, "y = 3x − 2 → m = 3.", []),
    ans("y9-gif-p4", "Rearrange 2y = 6x − 8 and state the y-intercept.", "2y=6x-8", "-4", 5, "y = 3x − 4 → c = −4.", ["−4"]),
    ans("y9-gif-p5", "Rearrange x + 2y = 6 and state the gradient.", "x+2y=6", "-0.5", 5, "y = −0.5x + 3 → m = −0.5.", ["-1/2", "−0.5"]),
    ans("y9-gif-p6", "Rearrange 4x + y = 9 and state the gradient.", "4x+y=9", "-4", 5, "y = −4x + 9 → m = −4.", ["−4"]),
    ans("y9-gif-p7", "Rearrange 3y = 9x and state the gradient.", "3y=9x", "3", 5, "y = 3x → m = 3.", []),
    ans("y9-gif-p8", "Rearrange 2x − 2y = 8 and state the y-intercept.", "2x-2y=8", "-4", 5, "y = x − 4 → c = −4.", ["−4"]),
    ans("y9-gif-p9", "Rearrange 5x + y = 0 and state the gradient.", "5x+y=0", "-5", 5, "y = −5x → m = −5.", ["−5"]),
    ans("y9-gif-p10", "Rearrange y − 3 = 2x and state the y-intercept.", "y-3=2x", "3", 5, "y = 2x + 3 → c = 3.", []),
  ],
  commonMistakes: [
    { mistake: "Reading the constant as the gradient.", fix: "m is the coefficient of x; c is the constant." },
    { mistake: "Dropping a negative sign on m or c.", fix: "Keep the sign: y = −2x has m = −2." },
    { mistake: "Reading m and c before rearranging.", fix: "Make y the subject first." },
    { mistake: "Assuming c = 0 when it isn't (or vice versa).", fix: "y = 3x has c = 0; y = 3x + 1 has c = 1." },
  ],
  masteryPassMark: 0.8,
};

// ── finding-equation-of-a-line (core) ──────────────────────────────────────────────────
const findingEquationOfLine: Partial<ExplicitLesson> = {
  description: "Find the equation y = mx + c from a gradient and a point, or from two points.",
  learningIntention: "Build the equation of a line from given information.",
  successCriteria: ["Find the gradient from two points.", "Find c by substituting a point.", "Write y = mx + c.", "Handle a point on the y-axis directly."],
  teaching: {
    paragraphs: [
      "To find a line's equation you need the GRADIENT m and the y-intercept c. If a point is on the y-axis (x = 0), c is its y-value: gradient 2 through (0, 3) gives y = 2x + 3.",
      "Given the gradient and any point, SUBSTITUTE to find c. With m = 3 through (1, 5): 5 = 3(1) + c, so c = 2, giving y = 3x + 2.",
      "Given TWO points, first find the gradient m = (rise)/(run) = (change in y)/(change in x), then substitute one point for c.",
      "Through (0, 0) and (2, 4): m = 4/2 = 2, c = 0, so y = 2x.",
    ],
    latexBlocks: ["c = y - mx \\text{ (substitute a point)}", "m = \\tfrac{\\Delta y}{\\Delta x}"],
  },
  workedExamples: [
    { title: "Point on y-axis", questionLatex: "m=2 \\text{ through } (0,3).", steps: [{ explanation: "c = 3.", latex: "y = 2x + 3" }], finalAnswerLatex: "y = 2x + 3" },
    { title: "Find c", questionLatex: "m=3 \\text{ through } (1,5).", steps: [{ explanation: "5 = 3 + c → c = 2.", latex: "y = 3x + 2" }], finalAnswerLatex: "y = 3x + 2" },
    { title: "Two points", questionLatex: "\\text{Through } (0,0),(2,4).", steps: [{ explanation: "m = 2, c = 0.", latex: "y = 2x" }], finalAnswerLatex: "y = 2x" },
  ],
  guidedPractice: [
    ans("y9-fel-g1", "A line has m = 2 through (0, 4). Find c.", "m=2,(0,4)", "4", 2, "c = 4.", []),
    ans("y9-fel-g2", "A line has m = 1 through (2, 5). Find c.", "m=1,(2,5)", "3", 3, "5 = 2 + c → c = 3.", []),
    ans("y9-fel-g3", "A line passes through (0, 1) and (1, 3). Find the gradient.", "(0,1),(1,3)", "2", 3, "m = (3 − 1)/(1 − 0) = 2.", []),
    mcq("y9-fel-g4", "To find c you can:", "B", ["guess", "substitute a known point", "use the x-intercept only", "ignore the point"], 2, "Substitute a point into y = mx + c."),
  ],
  independentPractice: [
    ans("y9-fel-i1", "A line has m = 3 through (1, 7). Find c.", "m=3,(1,7)", "4", 3, "7 = 3 + c → c = 4.", []),
    ans("y9-fel-i2", "A line has m = −2 through (0, 5). Find c.", "m=-2,(0,5)", "5", 2, "c = 5.", []),
    ans("y9-fel-i3", "A line passes through (0, 2) and (3, 8). Find the gradient.", "(0,2),(3,8)", "2", 3, "m = 6/3 = 2.", []),
    ans("y9-fel-i4", "A line has m = 4 through (2, 10). Find c.", "m=4,(2,10)", "2", 3, "10 = 8 + c → c = 2.", []),
    mcq("y9-fel-i5", "The gradient from two points is:", "C", ["run ÷ rise", "rise × run", "rise ÷ run", "rise + run"], 2, "m = rise/run."),
  ],
  masteryQuiz: [
    ans("y9-fel-m1", "A line has m = 2 through (0, 7). Find c.", "m=2,(0,7)", "7", 2, "c = 7.", []),
    ans("y9-fel-m2", "A line has m = 5 through (1, 8). Find c.", "m=5,(1,8)", "3", 3, "8 = 5 + c → c = 3.", []),
    ans("y9-fel-m3", "A line passes through (0, 0) and (4, 12). Find the gradient.", "(0,0),(4,12)", "3", 3, "m = 12/4 = 3.", []),
    ans("y9-fel-m4", "A line has m = −1 through (3, 1). Find c.", "m=-1,(3,1)", "4", 3, "1 = −3 + c → c = 4.", []),
    mcq("y9-fel-m5", "A line with gradient 2 through (0, 3) is:", "A", ["y = 2x + 3", "y = 3x + 2", "y = 2x − 3", "y = 3x"], 2, "c = 3 → y = 2x + 3."),
    ans("y9-fel-m6", "A line passes through (1, 2) and (3, 6). Find the gradient.", "(1,2),(3,6)", "2", 3, "m = 4/2 = 2.", []),
    ans("y9-fel-m7", "A line has m = 3 through (2, 9). Find c.", "m=3,(2,9)", "3", 3, "9 = 6 + c → c = 3.", []),
    ans("y9-fel-m8", "A line has m = 4 through (0, −1). Find c.", "m=4,(0,-1)", "-1", 2, "c = −1.", ["−1"]),
    ans("y9-fel-m9", "A line passes through (0, 5) and (2, 9). Find the gradient.", "(0,5),(2,9)", "2", 3, "m = 4/2 = 2.", []),
    mcq("y9-fel-m10", "To write y = mx + c you need:", "C", ["only m", "only c", "both m and c", "neither"], 2, "Both the gradient and the y-intercept."),
  ],
  masteryQuizPool: [
    ans("y9-fel-p1", "A line passes through (1, 4) and (3, 10). Find c.", "(1,4),(3,10)", "1", 5, "m = 3; 4 = 3 + c → c = 1.", []),
    ans("y9-fel-p2", "A line passes through (2, 3) and (4, 7). Find c.", "(2,3),(4,7)", "-1", 5, "m = 2; 3 = 4 + c → c = −1.", ["−1"]),
    ans("y9-fel-p3", "A line has gradient 2 and passes through (3, 10). Find c.", "m=2,(3,10)", "4", 5, "10 = 6 + c → c = 4.", []),
    ans("y9-fel-p4", "A line passes through (0, −2) and (4, 6). Find the gradient.", "(0,-2),(4,6)", "2", 5, "m = 8/4 = 2.", []),
    ans("y9-fel-p5", "A line passes through (1, 1) and (4, 7). Find c.", "(1,1),(4,7)", "-1", 5, "m = 2; 1 = 2 + c → c = −1.", ["−1"]),
    ans("y9-fel-p6", "A line has gradient −3 through (2, 1). Find c.", "m=-3,(2,1)", "7", 5, "1 = −6 + c → c = 7.", []),
    ans("y9-fel-p7", "A line passes through (−1, 2) and (1, 6). Find the gradient.", "(-1,2),(1,6)", "2", 5, "m = 4/2 = 2.", []),
    ans("y9-fel-p8", "A line passes through (2, 5) and (5, 14). Find c.", "(2,5),(5,14)", "-1", 5, "m = 3; 5 = 6 + c → c = −1.", ["−1"]),
    ans("y9-fel-p9", "A line has gradient 0.5 through (4, 5). Find c.", "m=0.5,(4,5)", "3", 5, "5 = 2 + c → c = 3.", []),
    ans("y9-fel-p10", "A line passes through (0, 3) and (2, −1). Find the gradient.", "(0,3),(2,-1)", "-2", 5, "m = (−1 − 3)/2 = −2.", ["−2"]),
  ],
  commonMistakes: [
    { mistake: "Computing the gradient as run/rise.", fix: "m = rise/run = Δy/Δx." },
    { mistake: "Forgetting to find c after the gradient.", fix: "Substitute a point to get c." },
    { mistake: "Sign error solving for c.", fix: "c = y − mx with the actual point values." },
    { mistake: "Reading the wrong coordinate as c.", fix: "c is the y-value only when x = 0." },
  ],
  masteryPassMark: 0.8,
};

// ── linear-modelling (core) ────────────────────────────────────────────────────────────
const linearModelling: Partial<ExplicitLesson> = {
  description: "Model real situations with y = mx + c and interpret the gradient and intercept.",
  learningIntention: "Use and interpret linear models in context.",
  successCriteria: ["Evaluate a linear model.", "Interpret the gradient as a rate.", "Interpret the y-intercept as an initial value.", "Solve for the input given an output."],
  teaching: {
    paragraphs: [
      "Many situations are modelled by y = mx + c. The GRADIENT m is a RATE (per unit) and the Y-INTERCEPT c is the INITIAL or FIXED value.",
      "A plumber charging C = 5n + 20 ($ for n parts): the call-out fee is $20 (c) and each part costs $5 (m). For 10 parts, C = 5(10) + 20 = $70.",
      "Interpret each number: in C = 5n + 20, 20 is the fixed cost and 5 is the cost per item.",
      "You can also work backwards — given the output, solve for the input.",
    ],
    latexBlocks: ["C = 5n + 20", "n=10 \\Rightarrow C = 70"],
  },
  workedExamples: [
    { title: "Evaluate", questionLatex: "C = 5n + 20, \\ n = 10.", steps: [{ explanation: "50 + 20.", latex: "70" }], finalAnswerLatex: "70" },
    { title: "Fixed cost", questionLatex: "\\text{Fixed cost in } C = 5n + 20?", steps: [{ explanation: "The c value.", latex: "20" }], finalAnswerLatex: "20" },
    { title: "Evaluate again", questionLatex: "C = 2t + 3, \\ t = 4.", steps: [{ explanation: "8 + 3.", latex: "11" }], finalAnswerLatex: "11" },
  ],
  guidedPractice: [
    ans("y9-lm-g1", "For C = 3n + 10, find C when n = 5.", "C=3n+10", "25", 2, "15 + 10 = 25.", []),
    ans("y9-lm-g2", "In C = 3n + 10, what is the fixed cost?", "C=3n+10", "10", 2, "c = 10.", []),
    ans("y9-lm-g3", "In C = 3n + 10, what is the cost per item?", "C=3n+10", "3", 2, "m = 3.", []),
    mcq("y9-lm-g4", "The y-intercept of a model represents the:", "A", ["initial or fixed value", "rate", "final value", "gradient"], 2, "c is the initial/fixed value."),
  ],
  independentPractice: [
    ans("y9-lm-i1", "For C = 4n + 12, find C when n = 8.", "C=4n+12", "44", 2, "32 + 12 = 44.", []),
    ans("y9-lm-i2", "In C = 4n + 12, what is the rate per item?", "C=4n+12", "4", 2, "m = 4.", []),
    ans("y9-lm-i3", "In C = 4n + 12, what is the fixed cost?", "C=4n+12", "12", 2, "c = 12.", []),
    ans("y9-lm-i4", "For d = 60t, find d when t = 3.", "d=60t", "180", 2, "180.", []),
    mcq("y9-lm-i5", "The gradient of a model represents the:", "B", ["fixed value", "rate of change", "y-intercept", "starting point"], 2, "m is the rate."),
  ],
  masteryQuiz: [
    ans("y9-lm-m1", "For C = 5n + 20, find C when n = 6.", "C=5n+20", "50", 2, "30 + 20 = 50.", []),
    ans("y9-lm-m2", "In C = 5n + 20, the fixed cost is:", "C=5n+20", "20", 2, "20.", []),
    ans("y9-lm-m3", "In C = 5n + 20, the cost per item is:", "C=5n+20", "5", 2, "5.", []),
    ans("y9-lm-m4", "For C = 2t + 3, find C when t = 4.", "C=2t+3", "11", 2, "11.", []),
    mcq("y9-lm-m5", "In a phone plan C = 0.1m + 30, the 30 represents the:", "A", ["monthly fixed fee", "cost per minute", "number of minutes", "gradient"], 3, "30 is the fixed monthly fee."),
    ans("y9-lm-m6", "For d = 50t, find d when t = 6.", "d=50t", "300", 2, "300.", []),
    ans("y9-lm-m7", "In C = 8n + 15, the rate per item is:", "C=8n+15", "8", 2, "8.", []),
    ans("y9-lm-m8", "For C = 3n + 10, find C when n = 0.", "C=3n+10", "10", 2, "Just the fixed cost 10.", []),
    mcq("y9-lm-m9", "In C = 0.1m + 30, the 0.1 represents the:", "B", ["fixed fee", "cost per minute", "number of minutes", "y-intercept"], 3, "0.1 is the per-minute rate."),
    ans("y9-lm-m10", "For C = 6n + 5, find C when n = 10.", "C=6n+5", "65", 2, "60 + 5 = 65.", []),
  ],
  masteryQuizPool: [
    ans("y9-lm-p1", "For C = 5n + 20, find n when C = 70.", "C=5n+20,\\ C=70", "10", 5, "5n = 50 → n = 10.", []),
    ans("y9-lm-p2", "A phone plan costs $30 plus $0.10/min. Find the cost of 100 minutes.", "", "40", 5, "30 + 10 = $40.", ["$40"]),
    ans("y9-lm-p3", "A taxi charges $4 plus $2/km. Find the cost of a 12 km trip.", "", "28", 5, "24 + 4 = $28.", ["$28"]),
    ans("y9-lm-p4", "For C = 4n + 12, find n when C = 60.", "C=4n+12,\\ C=60", "12", 5, "4n = 48 → n = 12.", []),
    ans("y9-lm-p5", "Water in a tank: V = 200 − 5t (litres, t min). Find V at t = 10.", "V=200-5t", "150", 5, "200 − 50 = 150 L.", ["150 L"]),
    ans("y9-lm-p6", "For V = 200 − 5t, after how many minutes is the tank empty (V = 0)?", "V=200-5t,\\ V=0", "40", 5, "5t = 200 → t = 40 min.", ["40 min"]),
    ans("y9-lm-p7", "A gym charges $50 joining plus $20/month. Find the cost after 6 months.", "", "170", 5, "120 + 50 = $170.", ["$170"]),
    ans("y9-lm-p8", "For C = 20m + 50, find m when C = 250.", "C=20m+50,\\ C=250", "10", 5, "20m = 200 → m = 10 months.", ["10 months"]),
    ans("y9-lm-p9", "A candle burns from 24 cm at 2 cm/hour: H = 24 − 2t. Find H at t = 5.", "H=24-2t", "14", 5, "24 − 10 = 14 cm.", ["14 cm"]),
    ans("y9-lm-p10", "A car rental is $40/day plus $0.20/km. Find the cost for 3 days and 100 km.", "", "140", 5, "120 + 20 = $140.", ["$140"]),
  ],
  commonMistakes: [
    { mistake: "Swapping the rate and the fixed value.", fix: "m is the per-unit rate; c is the starting/fixed amount." },
    { mistake: "Forgetting the fixed value when evaluating.", fix: "Add c after multiplying by m." },
    { mistake: "Not solving back for the input.", fix: "Set the output equal and solve for the variable." },
    { mistake: "Misreading a decreasing model's sign.", fix: "A negative gradient means the quantity falls." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "gradient-intercept-form": gradientInterceptForm,
  "finding-equation-of-a-line": findingEquationOfLine,
  "linear-modelling": linearModelling,
};

export function year9Chapter4EquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "linear-relationships") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
