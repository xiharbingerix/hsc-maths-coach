// Year 9 Wave 3 — Chapter 2, simultaneous & quadratic sections (ADR-Y9-001, all path):
// simultaneous-substitution, simultaneous-elimination, simultaneous-equations-problems,
// quadratic-equations-ax2-c. Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Set up the equations, then eliminate or substitute.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Decide the method first.", explanation };
}
const pm = (n: number) => [`±${n}`, `+/-${n}`, `x=±${n}`, `${n},-${n}`, `${n} and -${n}`];

// ── simultaneous-substitution (path) ───────────────────────────────────────────────────
const simultaneousSubstitution: Partial<ExplicitLesson> = {
  description: "Solve a pair of linear simultaneous equations by substitution.",
  learningIntention: "Use substitution to solve simultaneous equations.",
  successCriteria: ["Substitute one equation into the other.", "Solve for the first unknown.", "Back-substitute for the second.", "Check the pair in both equations."],
  teaching: {
    paragraphs: [
      "SIMULTANEOUS equations are two equations that must both be true. SUBSTITUTION works well when one equation gives a variable on its own, e.g. y = 2x.",
      "SUBSTITUTE that expression into the OTHER equation. With y = 2x and x + y = 6: x + 2x = 6, so 3x = 6 and x = 2.",
      "Then BACK-SUBSTITUTE to find the other variable: y = 2(2) = 4. The solution is x = 2, y = 4.",
      "CHECK by putting both values into both equations.",
    ],
    latexBlocks: ["y = 2x,\\ x + y = 6", "x + 2x = 6 \\Rightarrow x = 2", "y = 2(2) = 4"],
  },
  workedExamples: [
    { title: "Substitute", questionLatex: "y = 2x, \\ x + y = 6. \\text{ Find } x.", steps: [{ explanation: "x + 2x = 6.", latex: "x = 2" }], finalAnswerLatex: "x = 2" },
    { title: "With +1", questionLatex: "y = x+1, \\ 2x + y = 7. \\text{ Find } x.", steps: [{ explanation: "2x + x + 1 = 7.", latex: "x = 2" }], finalAnswerLatex: "x = 2" },
    { title: "x in terms of y", questionLatex: "x = y+2, \\ x + y = 8. \\text{ Find } y.", steps: [{ explanation: "y + 2 + y = 8.", latex: "y = 3" }], finalAnswerLatex: "y = 3" },
  ],
  guidedPractice: [
    ans("y9-ss-g1", "y = 3x and x + y = 8. Find x.", "y=3x,\\ x+y=8", "2", 3, "x + 3x = 8 → x = 2.", ["x=2"]),
    ans("y9-ss-g2", "y = x + 2 and x + y = 10. Find x.", "y=x+2,\\ x+y=10", "4", 3, "2x + 2 = 10 → x = 4.", ["x=4"]),
    ans("y9-ss-g3", "x = 2y and x + y = 9. Find y.", "x=2y,\\ x+y=9", "3", 3, "3y = 9 → y = 3.", ["y=3"]),
    mcq("y9-ss-g4", "Substitution replaces a variable using:", "B", ["a guess", "one equation in the other", "a graph only", "trial and error"], 2, "Substitute one equation into the other."),
  ],
  independentPractice: [
    ans("y9-ss-i1", "y = 2x and x + y = 9. Find x.", "y=2x,\\ x+y=9", "3", 3, "3x = 9 → x = 3.", ["x=3"]),
    ans("y9-ss-i2", "y = x − 1 and x + y = 7. Find x.", "y=x-1,\\ x+y=7", "4", 3, "2x − 1 = 7 → x = 4.", ["x=4"]),
    ans("y9-ss-i3", "x = y + 3 and x + y = 11. Find y.", "x=y+3,\\ x+y=11", "4", 3, "2y + 3 = 11 → y = 4.", ["y=4"]),
    ans("y9-ss-i4", "y = 4x and x + y = 10. Find x.", "y=4x,\\ x+y=10", "2", 3, "5x = 10 → x = 2.", ["x=2"]),
    ans("y9-ss-i5", "y = 2x + 1 and x + y = 10. Find x.", "y=2x+1,\\ x+y=10", "3", 3, "3x + 1 = 10 → x = 3.", ["x=3"]),
  ],
  masteryQuiz: [
    ans("y9-ss-m1", "y = x and x + y = 10. Find x.", "y=x,\\ x+y=10", "5", 2, "2x = 10 → x = 5.", ["x=5"]),
    ans("y9-ss-m2", "y = 3x and x + y = 12. Find x.", "y=3x,\\ x+y=12", "3", 3, "4x = 12 → x = 3.", ["x=3"]),
    ans("y9-ss-m3", "y = x + 4 and x + y = 12. Find x.", "y=x+4,\\ x+y=12", "4", 3, "2x + 4 = 12 → x = 4.", ["x=4"]),
    ans("y9-ss-m4", "x = 2y and x + y = 12. Find y.", "x=2y,\\ x+y=12", "4", 3, "3y = 12 → y = 4.", ["y=4"]),
    mcq("y9-ss-m5", "If y = 2x and x = 3, then y =", "C", ["2", "5", "6", "3"], 2, "y = 2(3) = 6."),
    ans("y9-ss-m6", "y = x − 2 and x + y = 8. Find x.", "y=x-2,\\ x+y=8", "5", 3, "2x − 2 = 8 → x = 5.", ["x=5"]),
    ans("y9-ss-m7", "y = 5x and x + y = 18. Find x.", "y=5x,\\ x+y=18", "3", 3, "6x = 18 → x = 3.", ["x=3"]),
    ans("y9-ss-m8", "x = y + 1 and x + y = 9. Find y.", "x=y+1,\\ x+y=9", "4", 3, "2y + 1 = 9 → y = 4.", ["y=4"]),
    ans("y9-ss-m9", "y = 2x and 3x + y = 15. Find x.", "y=2x,\\ 3x+y=15", "3", 3, "5x = 15 → x = 3.", ["x=3"]),
    ans("y9-ss-m10", "y = x + 3 and 2x + y = 12. Find x.", "y=x+3,\\ 2x+y=12", "3", 3, "3x + 3 = 12 → x = 3.", ["x=3"]),
  ],
  masteryQuizPool: [
    ans("y9-ss-p1", "y = 2x − 1 and 3x + 2y = 12. Find x.", "y=2x-1,\\ 3x+2y=12", "2", 5, "3x + 2(2x − 1) = 12 → 7x = 14 → x = 2.", ["x=2"]),
    ans("y9-ss-p2", "y = x + 5 and x + y = 21. Find x.", "y=x+5,\\ x+y=21", "8", 5, "2x + 5 = 21 → x = 8.", ["x=8"]),
    ans("y9-ss-p3", "y = x + 1 and 2x + y = 10. Find x.", "y=x+1,\\ 2x+y=10", "3", 5, "3x + 1 = 10 → x = 3.", ["x=3"]),
    ans("y9-ss-p4", "x = 3y − 2 and x + 2y = 13. Find y.", "x=3y-2,\\ x+2y=13", "3", 5, "3y − 2 + 2y = 13 → 5y = 15 → y = 3.", ["y=3"]),
    ans("y9-ss-p5", "y = 4x + 1 and 2x + y = 13. Find x.", "y=4x+1,\\ 2x+y=13", "2", 5, "2x + 4x + 1 = 13 → 6x = 12 → x = 2.", ["x=2"]),
    ans("y9-ss-p6", "x = 2y + 1 and 3x − y = 18. Find y.", "x=2y+1,\\ 3x-y=18", "3", 5, "3(2y + 1) − y = 18 → 5y = 15 → y = 3.", ["y=3"]),
    ans("y9-ss-p7", "y = 3x − 4 and x + y = 8. Find x.", "y=3x-4,\\ x+y=8", "3", 5, "x + 3x − 4 = 8 → 4x = 12 → x = 3.", ["x=3"]),
    ans("y9-ss-p8", "y = 2x and 4x − y = 6. Find x.", "y=2x,\\ 4x-y=6", "3", 5, "4x − 2x = 6 → 2x = 6 → x = 3.", ["x=3"]),
    ans("y9-ss-p9", "x = y − 3 and 2x + 3y = 14. Find y.", "x=y-3,\\ 2x+3y=14", "4", 5, "2(y − 3) + 3y = 14 → 5y = 20 → y = 4.", ["y=4"]),
    ans("y9-ss-p10", "y = 5 − x and 3x + 2y = 12. Find x.", "y=5-x,\\ 3x+2y=12", "2", 5, "3x + 2(5 − x) = 12 → x = 2.", ["x=2"]),
  ],
  commonMistakes: [
    { mistake: "Substituting into the same equation it came from.", fix: "Substitute into the OTHER equation." },
    { mistake: "Forgetting to back-substitute for the second variable.", fix: "Find both x and y." },
    { mistake: "Dropping brackets around the substituted expression.", fix: "2(2x − 1) needs brackets, then expand." },
    { mistake: "Not checking in both equations.", fix: "Verify the pair satisfies both." },
  ],
  masteryPassMark: 0.8,
};

// ── simultaneous-elimination (path) ────────────────────────────────────────────────────
const simultaneousElimination: Partial<ExplicitLesson> = {
  description: "Solve simultaneous equations by adding or subtracting to eliminate a variable.",
  learningIntention: "Use elimination to solve simultaneous equations.",
  successCriteria: ["Add equations to eliminate opposite terms.", "Subtract equations to eliminate equal terms.", "Multiply first when needed.", "Back-substitute and check."],
  teaching: {
    paragraphs: [
      "ELIMINATION removes a variable by ADDING or SUBTRACTING the two equations. If the y-terms are +y and −y, ADD: x + y = 10 and x − y = 4 give 2x = 14, x = 7.",
      "If a variable matches in both (e.g. +y and +y), SUBTRACT: 2x + y = 12 minus x + y = 8 gives x = 4.",
      "Then BACK-SUBSTITUTE: with x = 7, y = 10 − 7 = 3.",
      "Sometimes you MULTIPLY one equation first so a variable matches before eliminating.",
    ],
    latexBlocks: ["x+y=10,\\ x-y=4 \\Rightarrow 2x = 14", "(2x+y) - (x+y) = 12 - 8 \\Rightarrow x = 4"],
  },
  workedExamples: [
    { title: "Add to eliminate", questionLatex: "x+y=10, \\ x-y=4. \\text{ Find } x.", steps: [{ explanation: "Add: 2x = 14.", latex: "x = 7" }], finalAnswerLatex: "x = 7" },
    { title: "Subtract to eliminate", questionLatex: "2x+y=12, \\ x+y=8. \\text{ Find } x.", steps: [{ explanation: "Subtract.", latex: "x = 4" }], finalAnswerLatex: "x = 4" },
    { title: "Find the other", questionLatex: "x+y=9, \\ x-y=1. \\text{ Find } y.", steps: [{ explanation: "Add → x = 5; y = 4.", latex: "y = 4" }], finalAnswerLatex: "y = 4" },
  ],
  guidedPractice: [
    ans("y9-se-g1", "x + y = 8 and x − y = 2. Find x.", "x+y=8,\\ x-y=2", "5", 3, "Add: 2x = 10 → x = 5.", ["x=5"]),
    ans("y9-se-g2", "x + y = 10 and x − y = 6. Find x.", "x+y=10,\\ x-y=6", "8", 3, "Add: 2x = 16 → x = 8.", ["x=8"]),
    ans("y9-se-g3", "2x + y = 9 and x + y = 6. Find x.", "2x+y=9,\\ x+y=6", "3", 3, "Subtract: x = 3.", ["x=3"]),
    mcq("y9-se-g4", "Elimination removes a variable by:", "C", ["guessing", "graphing", "adding or subtracting the equations", "squaring"], 2, "Add/subtract the equations."),
  ],
  independentPractice: [
    ans("y9-se-i1", "x + y = 12 and x − y = 4. Find x.", "x+y=12,\\ x-y=4", "8", 3, "Add: 2x = 16 → x = 8.", ["x=8"]),
    ans("y9-se-i2", "x + y = 7 and x − y = 3. Find y.", "x+y=7,\\ x-y=3", "2", 3, "x = 5, y = 2.", ["y=2"]),
    ans("y9-se-i3", "3x + y = 10 and x + y = 6. Find x.", "3x+y=10,\\ x+y=6", "2", 3, "Subtract: 2x = 4 → x = 2.", ["x=2"]),
    ans("y9-se-i4", "2x + y = 11 and 2x − y = 5. Find x.", "2x+y=11,\\ 2x-y=5", "4", 3, "Add: 4x = 16 → x = 4.", ["x=4"]),
    ans("y9-se-i5", "x + 2y = 10 and x + y = 7. Find y.", "x+2y=10,\\ x+y=7", "3", 3, "Subtract: y = 3.", ["y=3"]),
  ],
  masteryQuiz: [
    ans("y9-se-m1", "x + y = 14 and x − y = 2. Find x.", "x+y=14,\\ x-y=2", "8", 3, "Add: 2x = 16 → x = 8.", ["x=8"]),
    ans("y9-se-m2", "x + y = 9 and x − y = 5. Find y.", "x+y=9,\\ x-y=5", "2", 3, "x = 7, y = 2.", ["y=2"]),
    ans("y9-se-m3", "2x + y = 13 and x + y = 9. Find x.", "2x+y=13,\\ x+y=9", "4", 3, "Subtract: x = 4.", ["x=4"]),
    ans("y9-se-m4", "3x + 2y = 16 and x + 2y = 8. Find x.", "3x+2y=16,\\ x+2y=8", "4", 3, "Subtract: 2x = 8 → x = 4.", ["x=4"]),
    mcq("y9-se-m5", "To eliminate y from x + y and x − y, you:", "A", ["add them", "subtract them", "multiply them", "divide them"], 2, "+y and −y cancel on adding."),
    ans("y9-se-m6", "x + y = 20 and x − y = 10. Find x.", "x+y=20,\\ x-y=10", "15", 3, "Add: 2x = 30 → x = 15.", ["x=15"]),
    ans("y9-se-m7", "2x + 3y = 18 and 2x + y = 10. Find y.", "2x+3y=18,\\ 2x+y=10", "4", 3, "Subtract: 2y = 8 → y = 4.", ["y=4"]),
    ans("y9-se-m8", "4x + y = 14 and 2x + y = 8. Find x.", "4x+y=14,\\ 2x+y=8", "3", 3, "Subtract: 2x = 6 → x = 3.", ["x=3"]),
    ans("y9-se-m9", "x + y = 6 and 2x + y = 9. Find x.", "x+y=6,\\ 2x+y=9", "3", 3, "Subtract: x = 3.", ["x=3"]),
    ans("y9-se-m10", "5x + 2y = 20 and 5x − 2y = 10. Find x.", "5x+2y=20,\\ 5x-2y=10", "3", 3, "Add: 10x = 30 → x = 3.", ["x=3"]),
  ],
  masteryQuizPool: [
    ans("y9-se-p1", "2x + 3y = 13 and x + y = 5. Find x.", "2x+3y=13,\\ x+y=5", "2", 5, "×2 second: 2x + 2y = 10; subtract → y = 3, x = 2.", ["x=2"]),
    ans("y9-se-p2", "3x + 2y = 12 and x − 2y = −4. Find x.", "3x+2y=12,\\ x-2y=-4", "2", 5, "Add: 4x = 8 → x = 2.", ["x=2"]),
    ans("y9-se-p3", "2x + y = 7 and 3x − y = 8. Find x.", "2x+y=7,\\ 3x-y=8", "3", 5, "Add: 5x = 15 → x = 3.", ["x=3"]),
    ans("y9-se-p4", "4x + 3y = 18 and 2x + 3y = 12. Find x.", "4x+3y=18,\\ 2x+3y=12", "3", 5, "Subtract: 2x = 6 → x = 3.", ["x=3"]),
    ans("y9-se-p5", "3x + y = 11 and x + y = 5. Find y.", "3x+y=11,\\ x+y=5", "2", 5, "Subtract: 2x = 6 → x = 3, y = 2.", ["y=2"]),
    ans("y9-se-p6", "5x + 2y = 16 and 3x + 2y = 12. Find x.", "5x+2y=16,\\ 3x+2y=12", "2", 5, "Subtract: 2x = 4 → x = 2.", ["x=2"]),
    ans("y9-se-p7", "x + 3y = 14 and x + y = 6. Find y.", "x+3y=14,\\ x+y=6", "4", 5, "Subtract: 2y = 8 → y = 4.", ["y=4"]),
    ans("y9-se-p8", "2x − y = 3 and x + y = 9. Find x.", "2x-y=3,\\ x+y=9", "4", 5, "Add: 3x = 12 → x = 4.", ["x=4"]),
    ans("y9-se-p9", "3x + 4y = 26 and 3x + y = 11. Find y.", "3x+4y=26,\\ 3x+y=11", "5", 5, "Subtract: 3y = 15 → y = 5.", ["y=5"]),
    ans("y9-se-p10", "4x − y = 10 and 2x + y = 8. Find x.", "4x-y=10,\\ 2x+y=8", "3", 5, "Add: 6x = 18 → x = 3.", ["x=3"]),
  ],
  commonMistakes: [
    { mistake: "Adding when you should subtract (and vice versa).", fix: "Add for opposite signs, subtract for equal signs." },
    { mistake: "Subtracting only some terms.", fix: "Subtract the whole equations, term by term." },
    { mistake: "Sign error when subtracting a negative.", fix: "Subtracting −y adds y." },
    { mistake: "Forgetting to multiply through when matching coefficients.", fix: "Scale a whole equation before eliminating." },
  ],
  masteryPassMark: 0.8,
};

// ── simultaneous-equations-problems (path) ─────────────────────────────────────────────
const simultaneousProblems: Partial<ExplicitLesson> = {
  description: "Set up and solve simultaneous equations from word problems.",
  learningIntention: "Translate a two-unknown problem into a pair of equations and solve.",
  successCriteria: ["Define two pronumerals.", "Form two equations.", "Solve by substitution or elimination.", "Answer the question."],
  teaching: {
    paragraphs: [
      "When a problem has TWO unknowns, you need TWO equations. Define both pronumerals first (let the numbers be x and y).",
      "Translate each fact into an equation. ‘The sum of two numbers is 12 and their difference is 4’ gives x + y = 12 and x − y = 4.",
      "SOLVE by elimination or substitution: adding gives 2x = 16, x = 8, then y = 4. The larger number is 8.",
      "Always ANSWER the actual question — which number, which price, whose age.",
    ],
    latexBlocks: ["x + y = 12,\\ x - y = 4", "2x = 16 \\Rightarrow x = 8,\\ y = 4"],
  },
  workedExamples: [
    { title: "Sum and difference", questionLatex: "\\text{Sum } 12, \\text{ difference } 4. \\text{ Larger?}", steps: [{ explanation: "x + y = 12, x − y = 4.", latex: "8" }], finalAnswerLatex: "8" },
    { title: "One is a multiple", questionLatex: "\\text{Sum } 20, \\text{ one is } 3\\times \\text{the other. Larger?}", steps: [{ explanation: "x = 3y, x + y = 20 → 4y = 20.", latex: "15" }], finalAnswerLatex: "15" },
    { title: "Tickets", questionLatex: "\\text{Adult} = \\text{child} + 4, \\text{ sum } 20. \\text{ Adult?}", steps: [{ explanation: "c + 4 + c = 20 → c = 8.", latex: "12" }], finalAnswerLatex: "12" },
  ],
  guidedPractice: [
    ans("y9-sp-g1", "Two numbers have sum 15 and difference 3. Find the larger.", "x+y=15,\\ x-y=3", "9", 3, "2x = 18 → x = 9.", []),
    ans("y9-sp-g2", "Sum 10 and one number is 4 times the other. Find the smaller.", "x=4y,\\ x+y=10", "2", 3, "5y = 10 → y = 2.", []),
    ans("y9-sp-g3", "Two numbers have sum 7 and difference 1. Find the larger.", "x+y=7,\\ x-y=1", "4", 3, "2x = 8 → x = 4.", []),
    mcq("y9-sp-g4", "A word problem with two unknowns needs:", "C", ["one equation", "no equations", "two equations", "a guess"], 2, "Two unknowns → two equations."),
  ],
  independentPractice: [
    ans("y9-sp-i1", "Two numbers have sum 30 and difference 10. Find the larger.", "x+y=30,\\ x-y=10", "20", 3, "2x = 40 → x = 20.", []),
    ans("y9-sp-i2", "x is twice y and their sum is 18. Find y.", "x=2y,\\ x+y=18", "6", 3, "3y = 18 → y = 6.", []),
    ans("y9-sp-i3", "a + b = 11 and a = b + 3. Find a.", "a+b=11,\\ a=b+3", "7", 3, "2b + 3 = 11 → b = 4, a = 7.", []),
    ans("y9-sp-i4", "Two numbers have sum 25; one is 5 more than the other. Find the smaller.", "x+(x+5)=25", "10", 3, "2x + 5 = 25 → x = 10.", []),
    mcq("y9-sp-i5", "‘One number is 5 more than the other’ can be written:", "A", ["x = y + 5", "x = 5y", "x + 5 = y + 5", "xy = 5"], 2, "5 more → x = y + 5."),
  ],
  masteryQuiz: [
    ans("y9-sp-m1", "Two numbers have sum 16 and difference 4. Find the larger.", "x+y=16,\\ x-y=4", "10", 3, "2x = 20 → x = 10.", []),
    ans("y9-sp-m2", "x = 3y and their sum is 16. Find y.", "x=3y,\\ x+y=16", "4", 3, "4y = 16 → y = 4.", []),
    ans("y9-sp-m3", "a + b = 14 and a = b + 2. Find a.", "a+b=14,\\ a=b+2", "8", 3, "2b + 2 = 14 → b = 6, a = 8.", []),
    ans("y9-sp-m4", "Sum 40 and one is 4 times the other. Find the smaller.", "x=4y,\\ x+y=40", "8", 3, "5y = 40 → y = 8.", []),
    mcq("y9-sp-m5", "The best first step in a two-unknown word problem is to:", "B", ["graph it", "define two pronumerals and form two equations", "guess values", "round the numbers"], 2, "Define the unknowns and form the equations."),
    ans("y9-sp-m6", "Two numbers have sum 9 and difference 5. Find the larger.", "x+y=9,\\ x-y=5", "7", 3, "2x = 14 → x = 7.", []),
    ans("y9-sp-m7", "x is twice y and their sum is 21. Find y.", "x=2y,\\ x+y=21", "7", 3, "3y = 21 → y = 7.", []),
    ans("y9-sp-m8", "a + b = 20 and a = b + 6. Find a.", "a+b=20,\\ a=b+6", "13", 3, "2b + 6 = 20 → b = 7, a = 13.", []),
    ans("y9-sp-m9", "Two numbers have sum 35; one is 5 more than the other. Find the smaller.", "x+(x+5)=35", "15", 3, "2x + 5 = 35 → x = 15.", []),
    mcq("y9-sp-m10", "‘Twice as many adults as children’ can be written:", "A", ["a = 2c", "c = 2a", "a + c = 2", "ac = 2"], 2, "Twice as many adults → a = 2c."),
  ],
  masteryQuizPool: [
    ans("y9-sp-p1", "An adult ticket is $10 more than a child's; 2 adults and 1 child cost $80. Find the child's price.", "a=c+10,\\ 2a+c=80", "20", 5, "2(c + 10) + c = 80 → 3c = 60 → c = 20.", ["$20"]),
    ans("y9-sp-p2", "Two numbers have sum 100 and difference 20. Find the larger.", "x+y=100,\\ x-y=20", "60", 5, "2x = 120 → x = 60.", []),
    ans("y9-sp-p3", "3 pens and 2 books cost $13; a pen and a book cost $5. Find the cost of a book.", "3p+2b=13,\\ p+b=5", "2", 5, "×2: 2p+2b=10; subtract → p = 3, b = 2.", ["$2"]),
    ans("y9-sp-p4", "A father is 3 times his son's age; in total they are 48. Find the son's age.", "f=3s,\\ f+s=48", "12", 5, "4s = 48 → s = 12.", []),
    ans("y9-sp-p5", "Two numbers: 3 times the first plus the second is 17, and the second is 2. Find the first.", "3x+y=17,\\ y=2", "5", 5, "3x + 2 = 17 → x = 5.", []),
    ans("y9-sp-p6", "A rectangle's length is 4 cm more than its width; the perimeter is 28 cm. Find the width.", "2(w+(w+4))=28", "5", 5, "4w + 8 = 28 → w = 5.", ["5 cm"]),
    ans("y9-sp-p7", "5 apples and 2 oranges cost $9; 1 apple and 2 oranges cost $5. Find the price of an apple.", "5a+2o=9,\\ a+2o=5", "1", 5, "Subtract: 4a = 4 → a = 1.", ["$1"]),
    ans("y9-sp-p8", "Two numbers have sum 50; the larger is 4 times the smaller. Find the larger.", "x=4y,\\ x+y=50", "40", 5, "5y = 50 → y = 10, x = 40.", []),
    ans("y9-sp-p9", "Anna has $6 more than Ben; together they have $30. How much does Ben have?", "a=b+6,\\ a+b=30", "12", 5, "2b + 6 = 30 → b = 12.", ["$12"]),
    ans("y9-sp-p10", "2 coffees and 3 teas cost $16; 2 coffees and 1 tea cost $10. Find the price of a tea.", "2c+3t=16,\\ 2c+t=10", "3", 5, "Subtract: 2t = 6 → t = 3.", ["$3"]),
  ],
  commonMistakes: [
    { mistake: "Trying to solve with only one equation.", fix: "Two unknowns require two equations." },
    { mistake: "Not defining what each pronumeral means.", fix: "State the unknowns clearly first." },
    { mistake: "Mis-translating ‘more than’ or ‘times’.", fix: "‘5 more’ → +5; ‘3 times’ → ×3." },
    { mistake: "Answering with the wrong variable.", fix: "Give the quantity the question asks for." },
  ],
  masteryPassMark: 0.8,
};

// ── quadratic-equations-ax2-c (path) ───────────────────────────────────────────────────
const quadraticAx2c: Partial<ExplicitLesson> = {
  description: "Solve quadratic equations of the form ax^2 = c by taking square roots.",
  learningIntention: "Solve simple quadratics and recognise the two solutions.",
  successCriteria: ["Isolate x^2.", "Take the square root.", "Give both the positive and negative solution.", "Handle non-perfect and fractional cases."],
  teaching: {
    paragraphs: [
      "A quadratic like x² = 16 is solved by TAKING THE SQUARE ROOT — and there are TWO answers, because both 4 and −4 square to 16: x = ±4.",
      "If there's a coefficient, ISOLATE x² first: 2x² = 18 → x² = 9 → x = ±3.",
      "Every positive value of c gives two solutions (±). x² = 0 has the single solution x = 0; a negative value has no real solution.",
      "The same method handles fractions: x² = ¼ → x = ±½.",
    ],
    latexBlocks: ["x^2 = 16 \\Rightarrow x = \\pm 4", "2x^2 = 18 \\Rightarrow x^2 = 9 \\Rightarrow x = \\pm 3"],
  },
  workedExamples: [
    { title: "Square root", questionLatex: "\\text{Solve } x^2 = 16.", steps: [{ explanation: "±√16.", latex: "x = \\pm 4" }], finalAnswerLatex: "x = \\pm 4" },
    { title: "With a coefficient", questionLatex: "\\text{Solve } 2x^2 = 18.", steps: [{ explanation: "x² = 9.", latex: "x = \\pm 3" }], finalAnswerLatex: "x = \\pm 3" },
    { title: "Another", questionLatex: "\\text{Solve } x^2 = 25.", steps: [{ explanation: "±√25.", latex: "x = \\pm 5" }], finalAnswerLatex: "x = \\pm 5" },
  ],
  guidedPractice: [
    ans("y9-q-g1", "Solve x² = 9. Give the positive solution.", "x^2=9", "3", 2, "√9 = 3 (also −3).", []),
    ans("y9-q-g2", "Solve x² = 49. Give the positive solution.", "x^2=49", "7", 2, "√49 = 7.", []),
    ans("y9-q-g3", "Solve 3x² = 12. Give the positive solution.", "3x^2=12", "2", 3, "x² = 4 → x = 2.", []),
    mcq("y9-q-g4", "How many solutions does x² = 16 have?", "B", ["1", "2", "0", "4"], 2, "x = 4 and x = −4 → two solutions."),
  ],
  independentPractice: [
    ans("y9-q-i1", "Solve x² = 36. Give the positive solution.", "x^2=36", "6", 2, "√36 = 6.", []),
    ans("y9-q-i2", "Solve 2x² = 50. Give the positive solution.", "2x^2=50", "5", 3, "x² = 25 → x = 5.", []),
    ans("y9-q-i3", "Solve x² = 100. Give the positive solution.", "x^2=100", "10", 2, "√100 = 10.", []),
    ans("y9-q-i4", "Solve 5x² = 45. Give the positive solution.", "5x^2=45", "3", 3, "x² = 9 → x = 3.", []),
    mcq("y9-q-i5", "The solutions of x² = 4 are:", "C", ["x = 4 only", "x = 2 only", "x = 2 and x = −2", "x = 16"], 2, "Both 2 and −2 square to 4."),
  ],
  masteryQuiz: [
    ans("y9-q-m1", "Solve x² = 64. Give the positive solution.", "x^2=64", "8", 2, "√64 = 8.", []),
    ans("y9-q-m2", "Solve x² = 81. Give the positive solution.", "x^2=81", "9", 2, "√81 = 9.", []),
    ans("y9-q-m3", "Solve 4x² = 36. Give the positive solution.", "4x^2=36", "3", 3, "x² = 9 → x = 3.", []),
    ans("y9-q-m4", "Solve x² = 1. Give the positive solution.", "x^2=1", "1", 2, "√1 = 1.", []),
    mcq("y9-q-m5", "How many solutions does x² = 0 have?", "A", ["one (x = 0)", "two", "none", "infinitely many"], 3, "Only x = 0."),
    ans("y9-q-m6", "Solve 2x² = 8. Give the positive solution.", "2x^2=8", "2", 3, "x² = 4 → x = 2.", []),
    ans("y9-q-m7", "Solve x² = 121. Give the positive solution.", "x^2=121", "11", 2, "√121 = 11.", []),
    ans("y9-q-m8", "Solve 3x² = 75. Give the positive solution.", "3x^2=75", "5", 3, "x² = 25 → x = 5.", []),
    ans("y9-q-m9", "Solve x² = 144. Give the positive solution.", "x^2=144", "12", 2, "√144 = 12.", []),
    mcq("y9-q-m10", "The negative solution of x² = 9 is:", "B", ["3", "−3", "−9", "0"], 2, "−3 squares to 9."),
  ],
  masteryQuizPool: [
    ans("y9-q-p1", "Solve x² = 0.25. Give the positive solution.", "x^2=0.25", "0.5", 5, "√0.25 = 0.5.", ["1/2"]),
    ans("y9-q-p2", "Solve x²/2 = 8. Give the positive solution.", "\\tfrac{x^2}{2}=8", "4", 5, "x² = 16 → x = 4.", []),
    ans("y9-q-p3", "Solve 2x² − 8 = 0. Give the positive solution.", "2x^2-8=0", "2", 5, "2x² = 8 → x² = 4 → x = 2.", []),
    ans("y9-q-p4", "Solve 9x² = 4. Give the positive solution as a fraction.", "9x^2=4", "2/3", 5, "x² = 4/9 → x = 2/3.", ["2 / 3"]),
    ans("y9-q-p5", "Solve x² = 0.04. Give the positive solution.", "x^2=0.04", "0.2", 5, "√0.04 = 0.2.", []),
    ans("y9-q-p6", "Solve 3x² = 27. Give both solutions.", "3x^2=27", "±3", 5, "x² = 9 → x = ±3.", pm(3)),
    ans("y9-q-p7", "Solve x² − 49 = 0. Give the positive solution.", "x^2-49=0", "7", 5, "x² = 49 → x = 7.", []),
    ans("y9-q-p8", "Solve 5x² = 20. Give both solutions.", "5x^2=20", "±2", 5, "x² = 4 → x = ±2.", pm(2)),
    ans("y9-q-p9", "Solve x²/4 = 9. Give the positive solution.", "\\tfrac{x^2}{4}=9", "6", 5, "x² = 36 → x = 6.", []),
    ans("y9-q-p10", "Solve 4x² = 1. Give the positive solution as a fraction.", "4x^2=1", "1/2", 5, "x² = 1/4 → x = 1/2.", ["0.5"]),
  ],
  commonMistakes: [
    { mistake: "Giving only the positive root.", fix: "x² = c (c > 0) has two solutions, ±√c." },
    { mistake: "Square-rooting before isolating x².", fix: "Divide by the coefficient first." },
    { mistake: "Thinking x² = negative has a real solution.", fix: "No real solution when c < 0." },
    { mistake: "Forgetting x² = 0 gives a single root.", fix: "x = 0 only." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "simultaneous-substitution": simultaneousSubstitution,
  "simultaneous-elimination": simultaneousElimination,
  "simultaneous-equations-problems": simultaneousProblems,
  "quadratic-equations-ax2-c": quadraticAx2c,
};

export function year9Chapter2SimultaneousLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "expressions-equations-inequalities") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
