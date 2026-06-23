// Year 9 Wave 5 — Chapter 4, coordinate-geometry sections (ADR-Y9-001):
// midpoint-length-segment (core), perpendicular-parallel-lines (path),
// graphical-solutions-simultaneous (path). Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Use the midpoint (average) and distance (Pythagoras) ideas.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the relationship between the gradients.", explanation };
}
const pt = (a: string) => [a, `(${a})`, a.replace(/[()]/g, "")];

// ── midpoint-length-segment (core) ─────────────────────────────────────────────────────
const midpointLength: Partial<ExplicitLesson> = {
  description: "Find the midpoint (average of coordinates) and the length of a line segment.",
  learningIntention: "Find midpoints and lengths from coordinates.",
  successCriteria: ["Find the midpoint by averaging.", "Find the length using Pythagoras.", "Work with negative coordinates.", "Interpret the results."],
  teaching: {
    paragraphs: [
      "The MIDPOINT of a segment is the AVERAGE of the endpoints' coordinates: ((x₁ + x₂)/2, (y₁ + y₂)/2). For (2, 4) and (6, 8): ((2+6)/2, (4+8)/2) = (4, 6).",
      "The LENGTH uses Pythagoras on the horizontal and vertical gaps: length = √((Δx)² + (Δy)²). From (0, 0) to (3, 4): √(9 + 16) = 5.",
      "Average each coordinate separately for the midpoint; this works with negatives too.",
      "Recognise common right-triangle gaps (3-4-5, 5-12-13) to get clean lengths.",
    ],
    latexBlocks: ["M = \\left(\\tfrac{x_1+x_2}{2}, \\tfrac{y_1+y_2}{2}\\right)", "L = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}"],
  },
  workedExamples: [
    { title: "Midpoint", questionLatex: "\\text{Midpoint of } (2,4),(6,8)?", steps: [{ explanation: "Average each.", latex: "(4,6)" }], finalAnswerLatex: "(4,6)" },
    { title: "Length", questionLatex: "\\text{Length } (0,0) \\text{ to } (3,4)?", steps: [{ explanation: "√(9+16).", latex: "5" }], finalAnswerLatex: "5" },
    { title: "Midpoint on axis", questionLatex: "\\text{Midpoint of } (0,0),(10,0)?", steps: [{ explanation: "Average.", latex: "(5,0)" }], finalAnswerLatex: "(5,0)" },
  ],
  guidedPractice: [
    ans("y9-ml-g1", "Find the x-coordinate of the midpoint of (2, 6) and (8, 6).", "(2,6),(8,6)", "5", 2, "(2 + 8)/2 = 5.", []),
    ans("y9-ml-g2", "Find the length from (0, 0) to (6, 8).", "(0,0)-(6,8)", "10", 2, "√(36 + 64) = 10.", []),
    ans("y9-ml-g3", "Find the y-coordinate of the midpoint of (0, 0) and (4, 6).", "(0,0),(4,6)", "3", 2, "(0 + 6)/2 = 3.", []),
    mcq("y9-ml-g4", "The midpoint is found by:", "A", ["averaging the coordinates", "subtracting the coordinates", "multiplying the coordinates", "using the gradient"], 2, "Average the x's and the y's."),
  ],
  independentPractice: [
    ans("y9-ml-i1", "Find the length from (1, 2) to (4, 6).", "(1,2)-(4,6)", "5", 3, "√(9 + 16) = 5.", []),
    ans("y9-ml-i2", "Find the x-coordinate of the midpoint of (2, 3) and (8, 9).", "(2,3),(8,9)", "5", 2, "(2 + 8)/2 = 5.", []),
    ans("y9-ml-i3", "Find the y-coordinate of the midpoint of (2, 3) and (8, 9).", "(2,3),(8,9)", "6", 2, "(3 + 9)/2 = 6.", []),
    ans("y9-ml-i4", "Find the length from (0, 0) to (5, 12).", "(0,0)-(5,12)", "13", 3, "√(25 + 144) = 13.", []),
    mcq("y9-ml-i5", "The length of a segment uses:", "C", ["averaging", "the gradient", "Pythagoras' theorem", "the y-intercept"], 2, "Length = √((Δx)² + (Δy)²)."),
  ],
  masteryQuiz: [
    ans("y9-ml-m1", "Find the midpoint of (2, 4) and (6, 8). Give the x-coordinate.", "(2,4),(6,8)", "4", 2, "(2 + 6)/2 = 4.", []),
    ans("y9-ml-m2", "Find the length from (0, 0) to (8, 15).", "(0,0)-(8,15)", "17", 3, "√(64 + 225) = 17.", []),
    ans("y9-ml-m3", "Find the y-coordinate of the midpoint of (1, 2) and (5, 10).", "(1,2),(5,10)", "6", 2, "(2 + 10)/2 = 6.", []),
    ans("y9-ml-m4", "Find the length from (0, 0) to (9, 12).", "(0,0)-(9,12)", "15", 3, "√(81 + 144) = 15.", []),
    mcq("y9-ml-m5", "The midpoint of (0, 0) and (10, 4) is:", "A", ["(5, 2)", "(10, 4)", "(2, 5)", "(5, 4)"], 2, "Average: (5, 2)."),
    ans("y9-ml-m6", "Find the x-coordinate of the midpoint of (3, 1) and (9, 7).", "(3,1),(9,7)", "6", 2, "(3 + 9)/2 = 6.", []),
    ans("y9-ml-m7", "Find the length from (1, 1) to (4, 5).", "(1,1)-(4,5)", "5", 3, "√(9 + 16) = 5.", []),
    ans("y9-ml-m8", "Find the midpoint of (2, 2) and (6, 10). Give the y-coordinate.", "(2,2),(6,10)", "6", 2, "(2 + 10)/2 = 6.", []),
    ans("y9-ml-m9", "Find the length from (2, 3) to (2, 9).", "(2,3)-(2,9)", "6", 3, "Same x; |9 − 3| = 6.", []),
    mcq("y9-ml-m10", "The length from (0, 0) to (6, 8) is:", "B", ["14", "10", "48", "100"], 2, "√100 = 10."),
  ],
  masteryQuizPool: [
    ans("y9-ml-p1", "Find the midpoint of (−2, 3) and (4, −1). Give the point.", "(-2,3),(4,-1)", "(1,1)", 5, "((−2+4)/2, (3−1)/2) = (1, 1).", pt("1,1")),
    ans("y9-ml-p2", "Find the length from (1, 1) to (4, 5).", "(1,1)-(4,5)", "5", 5, "√(9 + 16) = 5.", []),
    ans("y9-ml-p3", "Find the length from (−1, −1) to (2, 3).", "(-1,-1)-(2,3)", "5", 5, "√(9 + 16) = 5.", []),
    ans("y9-ml-p4", "Find the midpoint of (3, 5) and (7, 11). Give the point.", "(3,5),(7,11)", "(5,8)", 5, "((3+7)/2, (5+11)/2) = (5, 8).", pt("5,8")),
    ans("y9-ml-p5", "Find the length from (2, 1) to (10, 7).", "(2,1)-(10,7)", "10", 5, "√(64 + 36) = 10.", []),
    ans("y9-ml-p6", "Find the midpoint of (0, 0) and (−6, 8). Give the point.", "(0,0),(-6,8)", "(-3,4)", 5, "(−3, 4).", pt("-3,4")),
    ans("y9-ml-p7", "Find the length from (−3, 0) to (0, 4).", "(-3,0)-(0,4)", "5", 5, "√(9 + 16) = 5.", []),
    ans("y9-ml-p8", "The midpoint of A and B is (4, 5); A is (2, 3). Find B.", "M=(4,5),A=(2,3)", "(6,7)", 5, "B = (2·4 − 2, 2·5 − 3) = (6, 7).", pt("6,7")),
    ans("y9-ml-p9", "Find the length from (1, 2) to (1, 10).", "(1,2)-(1,10)", "8", 5, "Same x; |10 − 2| = 8.", []),
    ans("y9-ml-p10", "Find the length from (0, 0) to (7, 24).", "(0,0)-(7,24)", "25", 5, "√(49 + 576) = 25.", []),
  ],
  commonMistakes: [
    { mistake: "Subtracting instead of averaging for the midpoint.", fix: "Midpoint = average of the coordinates." },
    { mistake: "Adding the gaps instead of using Pythagoras for length.", fix: "Length = √((Δx)² + (Δy)²)." },
    { mistake: "Sign slips with negative coordinates.", fix: "Keep signs when adding/subtracting." },
    { mistake: "Mixing up x and y in the answer point.", fix: "Write (x, y) in order." },
  ],
  masteryPassMark: 0.8,
};

// ── perpendicular-parallel-lines (path) ────────────────────────────────────────────────
const perpendicularParallel: Partial<ExplicitLesson> = {
  description: "Use gradients to identify parallel and perpendicular lines.",
  learningIntention: "Relate gradients of parallel and perpendicular lines.",
  successCriteria: ["Know parallel lines have equal gradients.", "Know perpendicular gradients multiply to −1.", "Find a parallel gradient.", "Find a perpendicular gradient."],
  teaching: {
    paragraphs: [
      "PARALLEL lines have the SAME gradient. So any line parallel to y = 2x + 1 also has gradient 2.",
      "PERPENDICULAR lines have gradients whose product is −1 (negative reciprocals). A line perpendicular to y = 2x has gradient −1/2.",
      "To get a perpendicular gradient, flip the fraction and change the sign: 2 → −1/2; −3 → 1/3; 2/3 → −3/2.",
      "y = 3x + 1 and y = 3x − 4 are parallel (both gradient 3); y = 2x and y = −1/2 x are perpendicular.",
    ],
    latexBlocks: ["\\text{parallel: } m_1 = m_2", "\\text{perpendicular: } m_1 m_2 = -1"],
  },
  workedExamples: [
    { title: "Parallel", questionLatex: "\\text{Gradient parallel to } y = 2x + 1?", steps: [{ explanation: "Same gradient.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Perpendicular", questionLatex: "\\text{Gradient perpendicular to } y = 2x?", steps: [{ explanation: "Negative reciprocal.", latex: "-\\tfrac12" }], finalAnswerLatex: "-\\tfrac12" },
    { title: "Identify", questionLatex: "y = 3x+1 \\text{ and } y = 3x-4: \\text{ relationship?}", steps: [{ explanation: "Equal gradients.", latex: "\\text{parallel}" }], finalAnswerLatex: "\\text{parallel}" },
  ],
  guidedPractice: [
    ans("y9-pp-g1", "State the gradient of a line parallel to y = 4x.", "\\parallel y=4x", "4", 2, "Same gradient: 4.", []),
    ans("y9-pp-g2", "State the gradient of a line perpendicular to y = 2x.", "\\perp y=2x", "-1/2", 3, "Negative reciprocal of 2.", ["−1/2", "-0.5"]),
    ans("y9-pp-g3", "Are y = 2x + 1 and y = 2x − 3 parallel? (yes/no)", "y=2x+1,y=2x-3", "yes", 2, "Same gradient 2.", []),
    mcq("y9-pp-g4", "Perpendicular gradients multiply to:", "C", ["1", "0", "−1", "2"], 2, "m₁m₂ = −1."),
  ],
  independentPractice: [
    ans("y9-pp-i1", "State the gradient of a line parallel to y = −3x.", "\\parallel y=-3x", "-3", 2, "−3.", ["−3"]),
    ans("y9-pp-i2", "State the gradient of a line perpendicular to y = 4x.", "\\perp y=4x", "-1/4", 3, "Negative reciprocal of 4.", ["−1/4", "-0.25"]),
    ans("y9-pp-i3", "State the gradient of a line perpendicular to y = x.", "\\perp y=x", "-1", 3, "Negative reciprocal of 1.", ["−1"]),
    mcq("y9-pp-i4", "Parallel lines have:", "A", ["equal gradients", "gradients multiplying to −1", "the same intercept", "different y-values everywhere"], 2, "Equal gradients."),
    ans("y9-pp-i5", "State the gradient of a line perpendicular to y = ½x.", "\\perp y=\\tfrac12x", "-2", 3, "Negative reciprocal of 1/2.", ["−2"]),
  ],
  masteryQuiz: [
    ans("y9-pp-m1", "State the gradient of a line parallel to y = 5x + 2.", "\\parallel y=5x+2", "5", 2, "5.", []),
    ans("y9-pp-m2", "State the gradient of a line perpendicular to y = 3x.", "\\perp y=3x", "-1/3", 3, "Negative reciprocal of 3.", ["−1/3"]),
    ans("y9-pp-m3", "Are y = 4x − 1 and y = 4x + 5 parallel? (yes/no)", "parallel?", "yes", 2, "Same gradient 4.", []),
    mcq("y9-pp-m4", "A line perpendicular to one with gradient 2 has gradient:", "B", ["2", "−1/2", "1/2", "−2"], 3, "Negative reciprocal: −1/2."),
    ans("y9-pp-m5", "State the gradient of a line parallel to y = −x + 7.", "\\parallel y=-x+7", "-1", 2, "−1.", ["−1"]),
    ans("y9-pp-m6", "State the gradient of a line perpendicular to y = 5x.", "\\perp y=5x", "-1/5", 3, "Negative reciprocal of 5.", ["−1/5"]),
    ans("y9-pp-m7", "Are y = 2x and y = −½x perpendicular? (yes/no)", "perp?", "yes", 3, "2 × (−1/2) = −1.", []),
    ans("y9-pp-m8", "State the gradient of a line perpendicular to y = −2x.", "\\perp y=-2x", "1/2", 3, "Negative reciprocal of −2.", ["0.5"]),
    mcq("y9-pp-m9", "Two lines both with gradient 3 are:", "A", ["parallel", "perpendicular", "intersecting once at the origin", "the same line always"], 2, "Equal gradients → parallel."),
    ans("y9-pp-m10", "State the gradient of a line parallel to y = 7x − 9.", "\\parallel y=7x-9", "7", 2, "7.", []),
  ],
  masteryQuizPool: [
    ans("y9-pp-p1", "State the gradient of a line perpendicular to y = (2/3)x.", "\\perp y=\\tfrac23x", "-3/2", 5, "Negative reciprocal of 2/3.", ["−3/2", "-1.5"]),
    ans("y9-pp-p2", "Are y = 2x + 1 and y = −0.5x + 4 perpendicular? (yes/no)", "perp?", "yes", 5, "2 × (−0.5) = −1.", []),
    ans("y9-pp-p3", "State the gradient of a line perpendicular to y = (3/4)x.", "\\perp y=\\tfrac34x", "-4/3", 5, "Negative reciprocal of 3/4.", ["−4/3"]),
    ans("y9-pp-p4", "A line is parallel to 2x + y = 5. State its gradient.", "\\parallel 2x+y=5", "-2", 5, "y = −2x + 5 → m = −2.", ["−2"]),
    ans("y9-pp-p5", "A line is perpendicular to y = −4x + 1. State its gradient.", "\\perp y=-4x+1", "1/4", 5, "Negative reciprocal of −4.", ["0.25"]),
    ans("y9-pp-p6", "Are 3x − y = 1 and x + 3y = 6 perpendicular? (yes/no)", "perp?", "yes", 5, "Gradients 3 and −1/3; product −1.", []),
    ans("y9-pp-p7", "State the gradient of a line perpendicular to y = (5/2)x.", "\\perp y=\\tfrac52x", "-2/5", 5, "Negative reciprocal of 5/2.", ["−2/5", "-0.4"]),
    ans("y9-pp-p8", "A line parallel to y = −x + 2 passes through (0, 7). State its gradient.", "\\parallel y=-x+2", "-1", 5, "Same gradient −1.", ["−1"]),
    ans("y9-pp-p9", "Are y = 3x and y = 3x + 1 the same line? (yes/no)", "same?", "no", 5, "Parallel but different intercepts.", []),
    ans("y9-pp-p10", "A line is perpendicular to y = 6x. State its gradient.", "\\perp y=6x", "-1/6", 5, "Negative reciprocal of 6.", ["−1/6"]),
  ],
  commonMistakes: [
    { mistake: "Using the same gradient for perpendicular lines.", fix: "Perpendicular gradients are negative reciprocals." },
    { mistake: "Only changing the sign (not flipping).", fix: "Perpendicular: flip the fraction AND change sign." },
    { mistake: "Reading the gradient before rearranging.", fix: "Make y the subject, then compare gradients." },
    { mistake: "Calling parallel lines the same line.", fix: "Parallel lines have equal gradients but different intercepts." },
  ],
  masteryPassMark: 0.8,
};

// ── graphical-solutions-simultaneous (path) ────────────────────────────────────────────
const graphicalSimultaneous: Partial<ExplicitLesson> = {
  description: "Solve simultaneous equations graphically as the point where the lines intersect.",
  learningIntention: "Read or find the intersection point as the solution.",
  successCriteria: ["Know the solution is the intersection point.", "Read a solution from given lines.", "Find an intersection algebraically.", "Recognise parallel lines have no solution."],
  teaching: {
    paragraphs: [
      "Two lines drawn on the same axes meet (usually) at one point. That INTERSECTION POINT is the SOLUTION of the simultaneous equations — the (x, y) that satisfies both.",
      "For y = x and y = 2, the lines cross where x = 2 (and y = 2), so the solution is (2, 2).",
      "You can also find it algebraically by setting the expressions equal: y = x + 1 and y = 2x − 1 give x + 1 = 2x − 1, so x = 2, y = 3.",
      "PARALLEL lines never meet, so there is NO solution.",
    ],
    latexBlocks: ["\\text{solution} = \\text{intersection point}", "x+1 = 2x-1 \\Rightarrow x = 2"],
  },
  workedExamples: [
    { title: "Read intersection", questionLatex: "y = x \\text{ and } y = 2. \\text{ Find } x.", steps: [{ explanation: "x = 2.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Another", questionLatex: "y = x+1 \\text{ and } y = 3. \\text{ Find } x.", steps: [{ explanation: "x + 1 = 3.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Solve", questionLatex: "y = x+1, \\ y = 2x-1. \\text{ Find } x.", steps: [{ explanation: "x + 1 = 2x − 1.", latex: "2" }], finalAnswerLatex: "2" },
  ],
  guidedPractice: [
    ans("y9-gs-g1", "y = x and y = 4 intersect. Find x.", "y=x,y=4", "4", 2, "x = 4.", []),
    ans("y9-gs-g2", "y = 2x and y = 6 intersect. Find x.", "y=2x,y=6", "3", 2, "2x = 6 → x = 3.", []),
    ans("y9-gs-g3", "Two lines cross at (3, 5). State the x-value of the solution.", "(3,5)", "3", 2, "x = 3.", []),
    mcq("y9-gs-g4", "The graphical solution of simultaneous equations is:", "B", ["the y-intercept", "the intersection point", "the steeper gradient", "the origin"], 2, "Where the lines cross."),
  ],
  independentPractice: [
    ans("y9-gs-i1", "y = x + 2 and y = 5 intersect. Find x.", "y=x+2,y=5", "3", 2, "x + 2 = 5 → x = 3.", []),
    ans("y9-gs-i2", "y = 2x and y = 8 intersect. Find x.", "y=2x,y=8", "4", 2, "2x = 8 → x = 4.", []),
    ans("y9-gs-i3", "Do y = x and y = x + 1 intersect? (yes/no)", "y=x,y=x+1", "no", 3, "Parallel (same gradient) → never meet.", []),
    mcq("y9-gs-i4", "The solution of a pair of equations is where the graphs:", "C", ["are parallel", "have equal intercepts", "cross", "are steepest"], 2, "Where they cross."),
    ans("y9-gs-i5", "y = 3x and y = 9 intersect. Find x.", "y=3x,y=9", "3", 2, "3x = 9 → x = 3.", []),
  ],
  masteryQuiz: [
    ans("y9-gs-m1", "y = x and y = 5 intersect. Find x.", "y=x,y=5", "5", 2, "5.", []),
    ans("y9-gs-m2", "y = 2x and y = 10 intersect. Find x.", "y=2x,y=10", "5", 2, "2x = 10 → x = 5.", []),
    ans("y9-gs-m3", "Two lines cross at (4, 7). State the y-value of the solution.", "(4,7)", "7", 2, "y = 7.", []),
    ans("y9-gs-m4", "y = x + 3 and y = 8 intersect. Find x.", "y=x+3,y=8", "5", 2, "x + 3 = 8 → x = 5.", []),
    mcq("y9-gs-m5", "Two parallel lines have:", "A", ["no solution", "one solution", "two solutions", "infinite solutions"], 3, "Parallel → never meet → no solution."),
    ans("y9-gs-m6", "y = 4x and y = 12 intersect. Find x.", "y=4x,y=12", "3", 2, "4x = 12 → x = 3.", []),
    ans("y9-gs-m7", "y = x − 1 and y = 4 intersect. Find x.", "y=x-1,y=4", "5", 2, "x − 1 = 4 → x = 5.", []),
    ans("y9-gs-m8", "y = x + 1 and y = 2x − 1 intersect. Find x.", "y=x+1,y=2x-1", "2", 3, "x + 1 = 2x − 1 → x = 2.", []),
    mcq("y9-gs-m9", "The solution (x, y) must satisfy:", "C", ["one equation", "neither equation", "both equations", "the x-axis"], 2, "Both equations at once."),
    ans("y9-gs-m10", "y = 5x and y = 15 intersect. Find x.", "y=5x,y=15", "3", 2, "5x = 15 → x = 3.", []),
  ],
  masteryQuizPool: [
    ans("y9-gs-p1", "Solve graphically: y = x + 1 and y = 2x − 1. Find x.", "y=x+1,y=2x-1", "2", 5, "x + 1 = 2x − 1 → x = 2.", []),
    ans("y9-gs-p2", "Solve: y = 2x and y = x + 3. Find x.", "y=2x,y=x+3", "3", 5, "2x = x + 3 → x = 3.", []),
    ans("y9-gs-p3", "Solve: y = 3x − 2 and y = x + 4. Find x.", "y=3x-2,y=x+4", "3", 5, "3x − 2 = x + 4 → 2x = 6 → x = 3.", []),
    ans("y9-gs-p4", "Solve: y = x + 1 and y = 2x − 1, then give y.", "y", "3", 5, "x = 2 → y = 3.", []),
    ans("y9-gs-p5", "Solve: y = 4x and y = 2x + 6. Find x.", "y=4x,y=2x+6", "3", 5, "4x = 2x + 6 → 2x = 6 → x = 3.", []),
    ans("y9-gs-p6", "How many solutions do y = 2x + 1 and y = 2x + 5 have?", "parallel", "0", 5, "Parallel lines → no solution.", ["none"]),
    ans("y9-gs-p7", "Solve: y = 5 − x and y = x + 1. Find x.", "y=5-x,y=x+1", "2", 5, "5 − x = x + 1 → 2x = 4 → x = 2.", []),
    ans("y9-gs-p8", "Solve: y = 3x and y = 12 − x. Find x.", "y=3x,y=12-x", "3", 5, "3x = 12 − x → 4x = 12 → x = 3.", []),
    ans("y9-gs-p9", "Solve: y = x and y = −x + 8. Find x.", "y=x,y=-x+8", "4", 5, "x = −x + 8 → 2x = 8 → x = 4.", []),
    ans("y9-gs-p10", "Solve: y = 2x − 3 and y = x + 2, then give y.", "y", "7", 5, "x = 5; y = 5 + 2 = 7.", []),
  ],
  commonMistakes: [
    { mistake: "Reading only the x-value as the full solution.", fix: "The solution is the point (x, y)." },
    { mistake: "Thinking parallel lines have a solution.", fix: "Parallel lines never meet → no solution." },
    { mistake: "Setting the equations equal incorrectly.", fix: "Equate the y-expressions, then solve for x." },
    { mistake: "Forgetting to find y after x.", fix: "Substitute x back to get y." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "midpoint-length-segment": midpointLength,
  "perpendicular-parallel-lines": perpendicularParallel,
  "graphical-solutions-simultaneous": graphicalSimultaneous,
};

export function year9Chapter4GeometryLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "linear-relationships") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
