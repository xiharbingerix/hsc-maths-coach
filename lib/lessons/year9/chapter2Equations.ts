// Year 9 Wave 3 — Chapter 2, equations/inequalities sections (ADR-Y9-001):
// linear-equations-one-side (core), linear-equations-both-sides (core), solving-word-problems (core),
// linear-inequalities (path). Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Use inverse operations to isolate the pronumeral.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about the first step.", explanation };
}
// inequality answer-variant helper (with/without spaces)
const iq = (a: string) => [a, a.replace(/\s+/g, ""), a.replace(/([<>]=?)/, " $1 ").replace(/\s+/g, " ").trim()];

// ── linear-equations-one-side (core) ───────────────────────────────────────────────────
const linearEquationsOneSide: Partial<ExplicitLesson> = {
  description: "Solve linear equations with the pronumeral on one side using inverse operations.",
  learningIntention: "Solve one- and two-step linear equations.",
  successCriteria: ["Solve by adding/subtracting.", "Solve by multiplying/dividing.", "Solve two-step equations.", "Check a solution by substitution."],
  teaching: {
    paragraphs: [
      "To SOLVE an equation, undo what has been done to the pronumeral using INVERSE OPERATIONS, keeping both sides equal. For x + 5 = 12, subtract 5 from both sides: x = 7.",
      "For 3x = 18, the inverse of ×3 is ÷3: x = 6.",
      "A TWO-STEP equation undoes operations in reverse order. For 2x + 1 = 9: subtract 1 (→ 2x = 8), then divide by 2 (→ x = 4).",
      "CHECK by substituting back: 2(4) + 1 = 9. ✓",
    ],
    latexBlocks: ["x + 5 = 12 \\Rightarrow x = 7", "3x = 18 \\Rightarrow x = 6", "2x + 1 = 9 \\Rightarrow x = 4"],
  },
  workedExamples: [
    { title: "One step (subtract)", questionLatex: "\\text{Solve } x + 5 = 12.", steps: [{ explanation: "Subtract 5.", latex: "x = 7" }], finalAnswerLatex: "x = 7" },
    { title: "One step (divide)", questionLatex: "\\text{Solve } 3x = 18.", steps: [{ explanation: "Divide by 3.", latex: "x = 6" }], finalAnswerLatex: "x = 6" },
    { title: "Two step", questionLatex: "\\text{Solve } 2x + 1 = 9.", steps: [{ explanation: "−1 then ÷2.", latex: "x = 4" }], finalAnswerLatex: "x = 4" },
  ],
  guidedPractice: [
    ans("y9-leo-g1", "Solve x − 4 = 6.", "x-4=6", "10", 2, "Add 4: x = 10.", ["x=10"]),
    ans("y9-leo-g2", "Solve 5x = 20.", "5x=20", "4", 2, "Divide by 5: x = 4.", ["x=4"]),
    ans("y9-leo-g3", "Solve x/2 = 6.", "\\tfrac{x}{2}=6", "12", 2, "Multiply by 2: x = 12.", ["x=12"]),
    mcq("y9-leo-g4", "To solve x + 7 = 10, the first step is:", "B", ["add 7", "subtract 7", "multiply by 7", "divide by 7"], 2, "Undo +7 by subtracting 7."),
  ],
  independentPractice: [
    ans("y9-leo-i1", "Solve 2x = 14.", "2x=14", "7", 2, "x = 7.", ["x=7"]),
    ans("y9-leo-i2", "Solve x + 9 = 15.", "x+9=15", "6", 2, "x = 6.", ["x=6"]),
    ans("y9-leo-i3", "Solve 3x − 2 = 10.", "3x-2=10", "4", 3, "3x = 12 → x = 4.", ["x=4"]),
    ans("y9-leo-i4", "Solve x/3 = 5.", "\\tfrac{x}{3}=5", "15", 2, "x = 15.", ["x=15"]),
    ans("y9-leo-i5", "Solve 4x + 1 = 13.", "4x+1=13", "3", 3, "4x = 12 → x = 3.", ["x=3"]),
  ],
  masteryQuiz: [
    ans("y9-leo-m1", "Solve x + 8 = 20.", "x+8=20", "12", 2, "x = 12.", ["x=12"]),
    ans("y9-leo-m2", "Solve 6x = 30.", "6x=30", "5", 2, "x = 5.", ["x=5"]),
    ans("y9-leo-m3", "Solve 2x + 3 = 11.", "2x+3=11", "4", 3, "2x = 8 → x = 4.", ["x=4"]),
    ans("y9-leo-m4", "Solve x − 7 = 2.", "x-7=2", "9", 2, "x = 9.", ["x=9"]),
    mcq("y9-leo-m5", "To solve 3x = 21, you:", "C", ["subtract 3", "add 3", "divide by 3", "multiply by 3"], 2, "Undo ×3 by ÷3."),
    ans("y9-leo-m6", "Solve 5x − 4 = 16.", "5x-4=16", "4", 3, "5x = 20 → x = 4.", ["x=4"]),
    ans("y9-leo-m7", "Solve x/4 = 3.", "\\tfrac{x}{4}=3", "12", 2, "x = 12.", ["x=12"]),
    ans("y9-leo-m8", "Solve 7 + 2x = 19.", "7+2x=19", "6", 3, "2x = 12 → x = 6.", ["x=6"]),
    ans("y9-leo-m9", "Solve 10 − x = 4.", "10-x=4", "6", 3, "−x = −6 → x = 6.", ["x=6"]),
    ans("y9-leo-m10", "Solve 3x + 5 = 5.", "3x+5=5", "0", 3, "3x = 0 → x = 0.", ["x=0"]),
  ],
  masteryQuizPool: [
    ans("y9-leo-p1", "Solve (x + 3)/2 = 5.", "\\tfrac{x+3}{2}=5", "7", 5, "x + 3 = 10 → x = 7.", ["x=7"]),
    ans("y9-leo-p2", "Solve 2x/3 = 8.", "\\tfrac{2x}{3}=8", "12", 5, "2x = 24 → x = 12.", ["x=12"]),
    ans("y9-leo-p3", "Solve 5 − 2x = −3.", "5-2x=-3", "4", 5, "−2x = −8 → x = 4.", ["x=4"]),
    ans("y9-leo-p4", "Solve −3x = 12.", "-3x=12", "-4", 5, "x = −4.", ["x=-4", "−4"]),
    ans("y9-leo-p5", "Solve (2x − 1)/3 = 3.", "\\tfrac{2x-1}{3}=3", "5", 5, "2x − 1 = 9 → x = 5.", ["x=5"]),
    ans("y9-leo-p6", "Solve 4 − x/2 = 1.", "4-\\tfrac{x}{2}=1", "6", 5, "−x/2 = −3 → x = 6.", ["x=6"]),
    ans("y9-leo-p7", "Solve 3(x + 2) = 21.", "3(x+2)=21", "5", 5, "x + 2 = 7 → x = 5.", ["x=5"]),
    ans("y9-leo-p8", "Solve 7 − 3x = 1.", "7-3x=1", "2", 5, "−3x = −6 → x = 2.", ["x=2"]),
    ans("y9-leo-p9", "Solve x/5 + 2 = 6.", "\\tfrac{x}{5}+2=6", "20", 5, "x/5 = 4 → x = 20.", ["x=20"]),
    ans("y9-leo-p10", "Solve 9 = 2x + 3.", "9=2x+3", "3", 5, "2x = 6 → x = 3.", ["x=3"]),
  ],
  commonMistakes: [
    { mistake: "Doing the same operation to only one side.", fix: "Whatever you do to one side, do to the other." },
    { mistake: "Undoing two-step equations in the wrong order.", fix: "Undo +/− first, then ×/÷." },
    { mistake: "Sign slip with 10 − x = 4.", fix: "−x = −6 means x = 6." },
    { mistake: "Not checking the answer.", fix: "Substitute back to confirm." },
  ],
  masteryPassMark: 0.8,
};

// ── linear-equations-both-sides (core) ─────────────────────────────────────────────────
const linearEquationsBothSides: Partial<ExplicitLesson> = {
  description: "Solve linear equations with brackets and the pronumeral on both sides.",
  learningIntention: "Gather pronumerals on one side and solve.",
  successCriteria: ["Expand brackets first.", "Gather pronumerals on one side.", "Gather constants on the other.", "Solve and check."],
  teaching: {
    paragraphs: [
      "When the pronumeral is on BOTH sides, first remove it from one side. For 2x + 1 = x + 5, subtract x from both sides: x + 1 = 5, so x = 4.",
      "If there are BRACKETS, EXPAND first: 3(x − 2) = x + 4 becomes 3x − 6 = x + 4.",
      "Then gather pronumerals on one side and constants on the other: 3x − x = 4 + 6, 2x = 10, x = 5.",
      "For 5x − 3 = 2x + 9: 3x = 12, x = 4. Always CHECK by substituting back.",
    ],
    latexBlocks: ["2x + 1 = x + 5 \\Rightarrow x = 4", "3(x-2) = x+4 \\Rightarrow x = 5", "5x - 3 = 2x + 9 \\Rightarrow x = 4"],
  },
  workedExamples: [
    { title: "Pronumeral both sides", questionLatex: "\\text{Solve } 2x + 1 = x + 5.", steps: [{ explanation: "Subtract x.", latex: "x = 4" }], finalAnswerLatex: "x = 4" },
    { title: "With brackets", questionLatex: "\\text{Solve } 3(x-2) = x+4.", steps: [{ explanation: "Expand, gather.", latex: "x = 5" }], finalAnswerLatex: "x = 5" },
    { title: "Both sides", questionLatex: "\\text{Solve } 5x - 3 = 2x + 9.", steps: [{ explanation: "3x = 12.", latex: "x = 4" }], finalAnswerLatex: "x = 4" },
  ],
  guidedPractice: [
    ans("y9-leb-g1", "Solve 4x = 2x + 6.", "4x=2x+6", "3", 2, "2x = 6 → x = 3.", ["x=3"]),
    ans("y9-leb-g2", "Solve x + 8 = 3x.", "x+8=3x", "4", 3, "8 = 2x → x = 4.", ["x=4"]),
    ans("y9-leb-g3", "Solve 2(x + 1) = 8.", "2(x+1)=8", "3", 2, "2x + 2 = 8 → x = 3.", ["x=3"]),
    mcq("y9-leb-g4", "First step to solve 3x = x + 4:", "B", ["add x", "subtract x", "divide by 3", "subtract 4"], 2, "Remove x from the right: subtract x."),
  ],
  independentPractice: [
    ans("y9-leb-i1", "Solve 5x = 2x + 12.", "5x=2x+12", "4", 2, "3x = 12 → x = 4.", ["x=4"]),
    ans("y9-leb-i2", "Solve 3x + 2 = x + 10.", "3x+2=x+10", "4", 3, "2x = 8 → x = 4.", ["x=4"]),
    ans("y9-leb-i3", "Solve 2(x − 3) = x.", "2(x-3)=x", "6", 3, "2x − 6 = x → x = 6.", ["x=6"]),
    ans("y9-leb-i4", "Solve 4x − 1 = 2x + 7.", "4x-1=2x+7", "4", 3, "2x = 8 → x = 4.", ["x=4"]),
    ans("y9-leb-i5", "Solve 3(x + 2) = 2x + 9.", "3(x+2)=2x+9", "3", 3, "3x + 6 = 2x + 9 → x = 3.", ["x=3"]),
  ],
  masteryQuiz: [
    ans("y9-leb-m1", "Solve 6x = 4x + 10.", "6x=4x+10", "5", 2, "2x = 10 → x = 5.", ["x=5"]),
    ans("y9-leb-m2", "Solve 2x + 5 = x + 9.", "2x+5=x+9", "4", 2, "x = 4.", ["x=4"]),
    ans("y9-leb-m3", "Solve 3(x − 1) = x + 5.", "3(x-1)=x+5", "4", 3, "3x − 3 = x + 5 → 2x = 8 → x = 4.", ["x=4"]),
    ans("y9-leb-m4", "Solve 5x − 2 = 3x + 8.", "5x-2=3x+8", "5", 3, "2x = 10 → x = 5.", ["x=5"]),
    mcq("y9-leb-m5", "First step to solve 2x = x + 7:", "B", ["add x", "subtract x", "multiply by 2", "subtract 7"], 2, "Subtract x from both sides."),
    ans("y9-leb-m6", "Solve 4(x + 1) = 2x + 10.", "4(x+1)=2x+10", "3", 3, "4x + 4 = 2x + 10 → 2x = 6 → x = 3.", ["x=3"]),
    ans("y9-leb-m7", "Solve 7x − 3 = 4x + 9.", "7x-3=4x+9", "4", 3, "3x = 12 → x = 4.", ["x=4"]),
    ans("y9-leb-m8", "Solve 2(2x − 1) = 3x + 4.", "2(2x-1)=3x+4", "6", 3, "4x − 2 = 3x + 4 → x = 6.", ["x=6"]),
    ans("y9-leb-m9", "Solve x + 10 = 4x + 1.", "x+10=4x+1", "3", 3, "9 = 3x → x = 3.", ["x=3"]),
    ans("y9-leb-m10", "Solve 5(x − 2) = 3x.", "5(x-2)=3x", "5", 3, "5x − 10 = 3x → 2x = 10 → x = 5.", ["x=5"]),
  ],
  masteryQuizPool: [
    ans("y9-leb-p1", "Solve 2(x + 3) = 3(x − 1).", "2(x+3)=3(x-1)", "9", 5, "2x + 6 = 3x − 3 → x = 9.", ["x=9"]),
    ans("y9-leb-p2", "Solve x/2 + 1 = x − 2.", "\\tfrac{x}{2}+1=x-2", "6", 5, "1 + 2 = x − x/2 → 3 = x/2 → x = 6.", ["x=6"]),
    ans("y9-leb-p3", "Solve 5 − x = 2x − 1.", "5-x=2x-1", "2", 5, "6 = 3x → x = 2.", ["x=2"]),
    ans("y9-leb-p4", "Solve 4(x − 1) = 2(x + 3).", "4(x-1)=2(x+3)", "5", 5, "4x − 4 = 2x + 6 → 2x = 10 → x = 5.", ["x=5"]),
    ans("y9-leb-p5", "Solve 3(2x − 1) = 4(x + 2).", "3(2x-1)=4(x+2)", "5.5", 5, "6x − 3 = 4x + 8 → 2x = 11 → x = 5.5.", ["x=5.5", "11/2"]),
    ans("y9-leb-p6", "Solve 2x − 7 = 5 − x.", "2x-7=5-x", "4", 5, "3x = 12 → x = 4.", ["x=4"]),
    ans("y9-leb-p7", "Solve 6(x − 2) = 2(2x + 1).", "6(x-2)=2(2x+1)", "7", 5, "6x − 12 = 4x + 2 → 2x = 14 → x = 7.", ["x=7"]),
    ans("y9-leb-p8", "Solve (x + 1)/2 = (x − 3).", "\\tfrac{x+1}{2}=x-3", "7", 5, "x + 1 = 2x − 6 → x = 7.", ["x=7"]),
    ans("y9-leb-p9", "Solve 4x + 3 = 7x − 9.", "4x+3=7x-9", "4", 5, "12 = 3x → x = 4.", ["x=4"]),
    ans("y9-leb-p10", "Solve 3(x + 4) = 5x − 2.", "3(x+4)=5x-2", "7", 5, "3x + 12 = 5x − 2 → 14 = 2x → x = 7.", ["x=7"]),
  ],
  commonMistakes: [
    { mistake: "Forgetting to expand brackets first.", fix: "Expand, then gather terms." },
    { mistake: "Moving a term without changing its sign.", fix: "Subtracting x from both sides changes its sign." },
    { mistake: "Gathering pronumerals and constants on the same side.", fix: "Pronumerals one side, constants the other." },
    { mistake: "Dividing only part of a side.", fix: "Divide the whole side by the coefficient." },
  ],
  masteryPassMark: 0.8,
};

// ── solving-word-problems (core) ───────────────────────────────────────────────────────
const solvingWordProblems: Partial<ExplicitLesson> = {
  description: "Translate word problems into linear equations and solve them.",
  learningIntention: "Form an equation from a description and solve it.",
  successCriteria: ["Choose a pronumeral for the unknown.", "Translate words into an equation.", "Solve the equation.", "Answer the original question."],
  teaching: {
    paragraphs: [
      "First CHOOSE a pronumeral for the unknown (let the number be x). Then TRANSLATE the words: ‘twice a number’ is 2x; ‘5 less than a number’ is x − 5; ‘a number increased by 6’ is x + 6.",
      "Form an EQUATION from the sentence. ‘3 more than twice a number is 11’ becomes 2x + 3 = 11.",
      "SOLVE it: 2x = 8, so x = 4. Then ANSWER the actual question (and check it makes sense).",
      "For consecutive integers, use x and x + 1 (or x, x + 2 for consecutive even/odd numbers).",
    ],
    latexBlocks: ["\\text{twice a number} = 2x", "2x + 3 = 11 \\Rightarrow x = 4", "\\text{consecutive: } x,\\ x+1"],
  },
  workedExamples: [
    { title: "Form and solve", questionLatex: "\\text{A number plus 7 is 15. Find it.}", steps: [{ explanation: "x + 7 = 15.", latex: "x = 8" }], finalAnswerLatex: "8" },
    { title: "Twice a number", questionLatex: "\\text{Twice a number is 18. Find it.}", steps: [{ explanation: "2x = 18.", latex: "x = 9" }], finalAnswerLatex: "9" },
    { title: "Two-step", questionLatex: "\\text{3 more than twice a number is 11.}", steps: [{ explanation: "2x + 3 = 11.", latex: "x = 4" }], finalAnswerLatex: "4" },
  ],
  guidedPractice: [
    ans("y9-wp-g1", "A number minus 5 is 10. Find the number.", "", "15", 2, "x = 15.", []),
    ans("y9-wp-g2", "5 times a number is 35. Find the number.", "", "7", 2, "x = 7.", []),
    ans("y9-wp-g3", "A number doubled then increased by 1 is 9. Find it.", "", "4", 3, "2x = 8 → x = 4.", []),
    mcq("y9-wp-g4", "‘Twice a number’ translates to:", "B", ["x + 2", "2x", "x − 2", "x/2"], 2, "Twice means × 2 → 2x."),
  ],
  independentPractice: [
    ans("y9-wp-i1", "A number plus 12 is 20. Find it.", "", "8", 2, "x = 8.", []),
    ans("y9-wp-i2", "Three times a number is 27. Find it.", "", "9", 2, "x = 9.", []),
    ans("y9-wp-i3", "Two consecutive integers sum to 25. Find the smaller.", "", "12", 4, "2n + 1 = 25 → n = 12.", []),
    ans("y9-wp-i4", "The perimeter of a square is 36. Find the side length.", "", "9", 3, "4s = 36 → s = 9.", []),
    mcq("y9-wp-i5", "‘5 less than a number’ translates to:", "C", ["5 − x", "5x", "x − 5", "x + 5"], 2, "Five less than x is x − 5."),
  ],
  masteryQuiz: [
    ans("y9-wp-m1", "A number plus 9 is 16. Find it.", "", "7", 2, "x = 7.", []),
    ans("y9-wp-m2", "4 times a number is 28. Find it.", "", "7", 2, "x = 7.", []),
    ans("y9-wp-m3", "2 more than 3 times a number is 14. Find it.", "", "4", 3, "3x = 12 → x = 4.", []),
    ans("y9-wp-m4", "A rectangle's length is twice its width and the perimeter is 30. Find the width.", "", "5", 4, "6w = 30 → w = 5.", []),
    mcq("y9-wp-m5", "‘A number increased by 6’ translates to:", "A", ["x + 6", "6x", "x − 6", "6 − x"], 2, "Increased by 6 → x + 6."),
    ans("y9-wp-m6", "Half a number is 8. Find it.", "", "16", 2, "x = 16.", []),
    ans("y9-wp-m7", "The sum of a number and 15 is 40. Find it.", "", "25", 2, "x = 25.", []),
    ans("y9-wp-m8", "5 times a number minus 3 is 22. Find it.", "", "5", 3, "5x = 25 → x = 5.", []),
    ans("y9-wp-m9", "Two consecutive numbers sum to 19. Find the smaller.", "", "9", 4, "2n + 1 = 19 → n = 9.", []),
    ans("y9-wp-m10", "A number times 6 then minus 4 is 20. Find it.", "", "4", 3, "6x = 24 → x = 4.", []),
  ],
  masteryQuizPool: [
    ans("y9-wp-p1", "A pen costs $x and a book costs $3 more. Together they cost $11. Find the pen's price.", "", "4", 5, "2x + 3 = 11 → x = 4.", ["$4"]),
    ans("y9-wp-p2", "Three consecutive even numbers sum to 48. Find the smallest.", "", "14", 5, "3n + 6 = 48 → n = 14.", []),
    ans("y9-wp-p3", "Tom is 4 years older than Sam. Their ages sum to 22. Find Sam's age.", "", "9", 5, "2s + 4 = 22 → s = 9.", []),
    ans("y9-wp-p4", "A number is multiplied by 3, then 7 is added, giving 25. Find the number.", "", "6", 5, "3x = 18 → x = 6.", []),
    ans("y9-wp-p5", "The perimeter of a rectangle is 26 cm; the length is 5 cm more than the width. Find the width.", "", "4", 5, "4w + 10 = 26 → w = 4.", ["4 cm"]),
    ans("y9-wp-p6", "Five times a number equals the number plus 16. Find the number.", "", "4", 5, "4x = 16 → x = 4.", []),
    ans("y9-wp-p7", "Two numbers differ by 6 and sum to 30. Find the smaller.", "", "12", 5, "2x + 6 = 30 → x = 12.", []),
    ans("y9-wp-p8", "A father is 3 times as old as his son; the difference is 24 years. Find the son's age.", "", "12", 5, "2x = 24 → x = 12.", []),
    ans("y9-wp-p9", "The sum of three consecutive integers is 72. Find the middle one.", "", "24", 5, "3n = 72 → n = 24.", []),
    ans("y9-wp-p10", "Apples cost $2 each. After buying some and paying a $3 bag fee, the total is $17. How many apples?", "", "7", 5, "2n = 14 → n = 7.", []),
  ],
  commonMistakes: [
    { mistake: "Translating ‘5 less than a number’ as 5 − x.", fix: "It is x − 5." },
    { mistake: "Not defining the pronumeral.", fix: "State ‘let the number be x’ first." },
    { mistake: "Solving but not answering the question.", fix: "Give the quantity actually asked for." },
    { mistake: "Wrong setup for consecutive numbers.", fix: "Use x, x + 1 (or x, x + 2 for even/odd)." },
  ],
  masteryPassMark: 0.8,
};

// ── linear-inequalities (path) ─────────────────────────────────────────────────────────
const linearInequalities: Partial<ExplicitLesson> = {
  description: "Solve linear inequalities, reversing the sign when multiplying or dividing by a negative.",
  learningIntention: "Solve inequalities and represent the solution.",
  successCriteria: ["Solve using inverse operations.", "Reverse the inequality when dividing by a negative.", "Solve two-step inequalities.", "Interpret the solution set."],
  teaching: {
    paragraphs: [
      "Inequalities are solved like equations using INVERSE OPERATIONS: for x + 3 > 7, subtract 3 to get x > 4.",
      "The KEY DIFFERENCE: when you MULTIPLY or DIVIDE both sides by a NEGATIVE number, REVERSE the inequality sign. So −2x < 6 becomes x > −3.",
      "TWO-STEP inequalities work the same way: 2x + 1 < 11 → 2x < 10 → x < 5.",
      "The solution is a RANGE of values. x ≥ 2 means 2 and every number above it.",
    ],
    latexBlocks: ["x + 3 > 7 \\Rightarrow x > 4", "-2x < 6 \\Rightarrow x > -3", "2x + 1 < 11 \\Rightarrow x < 5"],
  },
  workedExamples: [
    { title: "One step", questionLatex: "\\text{Solve } x + 3 > 7.", steps: [{ explanation: "Subtract 3.", latex: "x > 4" }], finalAnswerLatex: "x > 4" },
    { title: "Divide (positive)", questionLatex: "\\text{Solve } 2x \\le 10.", steps: [{ explanation: "Divide by 2.", latex: "x \\le 5" }], finalAnswerLatex: "x \\le 5" },
    { title: "Divide by negative", questionLatex: "\\text{Solve } -2x < 6.", steps: [{ explanation: "÷(−2), reverse sign.", latex: "x > -3" }], finalAnswerLatex: "x > -3" },
  ],
  guidedPractice: [
    ans("y9-li-g1", "Solve x − 2 > 5.", "x-2>5", "x > 7", 2, "Add 2: x > 7.", iq("x>7")),
    ans("y9-li-g2", "Solve 3x < 12.", "3x<12", "x < 4", 2, "Divide by 3: x < 4.", iq("x<4")),
    ans("y9-li-g3", "Solve x + 4 ≥ 9.", "x+4\\ge9", "x ≥ 5", 2, "x ≥ 5.", ["x>=5", "x≥5"]),
    mcq("y9-li-g4", "When you divide an inequality by a negative number, you must:", "B", ["keep the sign", "reverse the sign", "make it an equals", "add the number"], 3, "Dividing by a negative reverses the inequality."),
  ],
  independentPractice: [
    ans("y9-li-i1", "Solve 2x > 8.", "2x>8", "x > 4", 2, "x > 4.", iq("x>4")),
    ans("y9-li-i2", "Solve x + 5 ≤ 11.", "x+5\\le11", "x ≤ 6", 2, "x ≤ 6.", ["x<=6", "x≤6"]),
    ans("y9-li-i3", "Solve −x > 3.", "-x>3", "x < -3", 3, "÷(−1), reverse: x < −3.", ["x<-3", "x < −3"]),
    ans("y9-li-i4", "Solve 4x − 1 < 7.", "4x-1<7", "x < 2", 3, "4x < 8 → x < 2.", iq("x<2")),
    mcq("y9-li-i5", "The solution x ≥ 2 includes:", "A", ["2 and all larger numbers", "only 2", "numbers below 2", "no numbers"], 2, "≥ means 2 and above."),
  ],
  masteryQuiz: [
    ans("y9-li-m1", "Solve x + 1 > 6.", "x+1>6", "x > 5", 2, "x > 5.", iq("x>5")),
    ans("y9-li-m2", "Solve 3x ≤ 15.", "3x\\le15", "x ≤ 5", 2, "x ≤ 5.", ["x<=5", "x≤5"]),
    ans("y9-li-m3", "Solve −3x > 9.", "-3x>9", "x < -3", 3, "÷(−3), reverse: x < −3.", ["x<-3", "x < −3"]),
    ans("y9-li-m4", "Solve 2x + 1 < 11.", "2x+1<11", "x < 5", 3, "2x < 10 → x < 5.", iq("x<5")),
    mcq("y9-li-m5", "Solve −x < 4.", "C", ["x < 4", "x < −4", "x > −4", "x > 4"], 3, "÷(−1), reverse: x > −4."),
    ans("y9-li-m6", "Solve x − 6 ≥ 0.", "x-6\\ge0", "x ≥ 6", 2, "x ≥ 6.", ["x>=6", "x≥6"]),
    ans("y9-li-m7", "Solve 5x > 20.", "5x>20", "x > 4", 2, "x > 4.", iq("x>4")),
    ans("y9-li-m8", "Solve 2x − 3 ≤ 7.", "2x-3\\le7", "x ≤ 5", 3, "2x ≤ 10 → x ≤ 5.", ["x<=5", "x≤5"]),
    ans("y9-li-m9", "Solve −2x ≥ 8.", "-2x\\ge8", "x ≤ -4", 3, "÷(−2), reverse: x ≤ −4.", ["x<=-4", "x ≤ −4"]),
    mcq("y9-li-m10", "Which value satisfies x > 3?", "D", ["1", "2", "3", "4"], 2, "Only 4 is greater than 3."),
  ],
  masteryQuizPool: [
    ans("y9-li-p1", "Solve 5 − 2x > 1.", "5-2x>1", "x < 2", 5, "−2x > −4 → x < 2 (reverse).", iq("x<2")),
    ans("y9-li-p2", "Solve 3(x − 1) ≤ 9.", "3(x-1)\\le9", "x ≤ 4", 5, "x − 1 ≤ 3 → x ≤ 4.", ["x<=4", "x≤4"]),
    ans("y9-li-p3", "Solve −4x + 2 < 10.", "-4x+2<10", "x > -2", 5, "−4x < 8 → x > −2 (reverse).", ["x>-2", "x > −2"]),
    ans("y9-li-p4", "Solve 2x + 1 ≥ x + 5.", "2x+1\\ge x+5", "x ≥ 4", 5, "x + 1 ≥ 5 → x ≥ 4.", ["x>=4", "x≥4"]),
    ans("y9-li-p5", "Solve 7 − x ≤ 3.", "7-x\\le3", "x ≥ 4", 5, "−x ≤ −4 → x ≥ 4 (reverse).", ["x>=4", "x≥4"]),
    ans("y9-li-p6", "Solve 4x − 5 > 2x + 1.", "4x-5>2x+1", "x > 3", 5, "2x > 6 → x > 3.", iq("x>3")),
    ans("y9-li-p7", "Solve (x + 2)/3 < 4.", "\\tfrac{x+2}{3}<4", "x < 10", 5, "x + 2 < 12 → x < 10.", iq("x<10")),
    ans("y9-li-p8", "Solve −3x − 4 ≤ 5.", "-3x-4\\le5", "x ≥ -3", 5, "−3x ≤ 9 → x ≥ −3 (reverse).", ["x>=-3", "x ≥ −3"]),
    ans("y9-li-p9", "Solve 2(x − 3) > x + 1.", "2(x-3)>x+1", "x > 7", 5, "2x − 6 > x + 1 → x > 7.", iq("x>7")),
    ans("y9-li-p10", "Solve 10 − 3x ≥ 1.", "10-3x\\ge1", "x ≤ 3", 5, "−3x ≥ −9 → x ≤ 3 (reverse).", ["x<=3", "x≤3"]),
  ],
  commonMistakes: [
    { mistake: "Not reversing the sign when dividing by a negative.", fix: "−2x < 6 → x > −3." },
    { mistake: "Treating the inequality as a single value.", fix: "The answer is a range of values." },
    { mistake: "Flipping the sign when dividing by a positive.", fix: "Only reverse for a negative multiplier/divisor." },
    { mistake: "Misreading ≥ and >.", fix: "≥ includes the endpoint; > does not." },
  ],
  masteryPassMark: 0.8,
};

// ── linear-equations-involving-fractions (core) ────────────────────────────────────────
// Cambridge Core & Standard Paths Year 9, 3F. Net-new Core section (Year 9 Core conformance).
const linearEquationsInvolvingFractions: Partial<ExplicitLesson> = {
  description: "Solve linear equations involving fractions by clearing denominators with the lowest common denominator.",
  learningIntention: "Clear fractions from a linear equation and solve.",
  successCriteria: [
    "Solve x/a = b by multiplying both sides by a.",
    "Clear a single fraction such as (x + c)/a = b.",
    "Clear two fractions by multiplying every term by the lowest common denominator (LCD).",
    "Check the solution by substituting back.",
  ],
  teaching: {
    paragraphs: [
      "To solve an equation with a fraction, MULTIPLY both sides by the denominator to clear it. For x/4 = 3, multiply both sides by 4: x = 12.",
      "If a whole expression is over a number, multiply the whole side by that number first. For (x + 2)/5 = 3, multiply by 5: x + 2 = 15, so x = 13.",
      "When there are TWO fractions with different denominators, multiply EVERY term by the lowest common denominator (LCD). For x/2 + x/3 = 5 the LCD is 6: 3x + 2x = 30, so 5x = 30 and x = 6.",
      "Multiply every term — including any whole numbers — by the LCD, expand any brackets that appear, then solve and CHECK by substituting back.",
    ],
    latexBlocks: ["\\tfrac{x}{4} = 3 \\Rightarrow x = 12", "\\tfrac{x+2}{5} = 3 \\Rightarrow x = 13", "\\tfrac{x}{2} + \\tfrac{x}{3} = 5 \\Rightarrow x = 6"],
  },
  workedExamples: [
    { title: "Single fraction", questionLatex: "\\text{Solve } \\tfrac{x}{3} = 5.", steps: [{ explanation: "Multiply both sides by 3.", latex: "x = 15" }], finalAnswerLatex: "x = 15" },
    { title: "Expression over a number", questionLatex: "\\text{Solve } \\tfrac{x-1}{4} = 2.", steps: [{ explanation: "Multiply by 4, then add 1.", latex: "x - 1 = 8 \\Rightarrow x = 9" }], finalAnswerLatex: "x = 9" },
    { title: "Two fractions (LCD)", questionLatex: "\\text{Solve } \\tfrac{x}{2} + \\tfrac{x}{4} = 9.", steps: [{ explanation: "Multiply every term by 4.", latex: "2x + x = 36 \\Rightarrow x = 12" }], finalAnswerLatex: "x = 12" },
  ],
  guidedPractice: [
    ans("y9-lef-g1", "Solve x/5 = 4.", "\\tfrac{x}{5}=4", "20", 2, "Multiply both sides by 5: x = 20.", ["x=20"]),
    ans("y9-lef-g2", "Solve (x + 3)/2 = 6.", "\\tfrac{x+3}{2}=6", "9", 2, "Multiply by 2: x + 3 = 12, so x = 9.", ["x=9"]),
    ans("y9-lef-g3", "Solve x/3 + 1 = 4.", "\\tfrac{x}{3}+1=4", "9", 3, "x/3 = 3, so x = 9.", ["x=9"]),
    mcq("y9-lef-g4", "To solve x/4 = 3, the first step is to multiply both sides by:", "C", ["3", "12", "4", "7"], 2, "Multiply by the denominator, 4, to clear the fraction."),
  ],
  independentPractice: [
    ans("y9-lef-i1", "Solve x/6 = 3.", "\\tfrac{x}{6}=3", "18", 2, "Multiply by 6: x = 18.", ["x=18"]),
    ans("y9-lef-i2", "Solve (x − 2)/3 = 4.", "\\tfrac{x-2}{3}=4", "14", 3, "x − 2 = 12, so x = 14.", ["x=14"]),
    ans("y9-lef-i3", "Solve x/2 + x/3 = 10.", "\\tfrac{x}{2}+\\tfrac{x}{3}=10", "12", 3, "×6: 3x + 2x = 60, so 5x = 60 and x = 12.", ["x=12"]),
    ans("y9-lef-i4", "Solve (2x + 1)/3 = 5.", "\\tfrac{2x+1}{3}=5", "7", 3, "2x + 1 = 15, so 2x = 14 and x = 7.", ["x=7"]),
    mcq("y9-lef-i5", "The lowest common denominator of x/2 and x/3 is:", "B", ["5", "6", "2", "3"], 2, "The LCD is the smallest number both 2 and 3 divide into, which is 6."),
  ],
  masteryQuiz: [
    ans("y9-lef-m1", "Solve x/7 = 2.", "\\tfrac{x}{7}=2", "14", 2, "Multiply by 7: x = 14.", ["x=14"]),
    ans("y9-lef-m2", "Solve (x + 4)/2 = 5.", "\\tfrac{x+4}{2}=5", "6", 3, "x + 4 = 10, so x = 6.", ["x=6"]),
    ans("y9-lef-m3", "Solve x/4 − 1 = 2.", "\\tfrac{x}{4}-1=2", "12", 3, "x/4 = 3, so x = 12.", ["x=12"]),
    ans("y9-lef-m4", "Solve x/2 + x/5 = 7.", "\\tfrac{x}{2}+\\tfrac{x}{5}=7", "10", 3, "×10: 5x + 2x = 70, so 7x = 70 and x = 10.", ["x=10"]),
    mcq("y9-lef-m5", "To clear the fraction in (x − 3)/5 = 2, you first:", "C", ["subtract 3", "divide by 5", "multiply both sides by 5", "add 2"], 2, "Multiply both sides by 5 to remove the denominator."),
    ans("y9-lef-m6", "Solve (3x − 2)/4 = 4.", "\\tfrac{3x-2}{4}=4", "6", 3, "3x − 2 = 16, so 3x = 18 and x = 6.", ["x=6"]),
    ans("y9-lef-m7", "Solve x/3 = x/4 + 1.", "\\tfrac{x}{3}=\\tfrac{x}{4}+1", "12", 3, "×12: 4x = 3x + 12, so x = 12.", ["x=12"]),
    ans("y9-lef-m8", "Solve (x + 1)/2 + (x − 1)/3 = 6.", "\\tfrac{x+1}{2}+\\tfrac{x-1}{3}=6", "7", 3, "×6: 3(x + 1) + 2(x − 1) = 36, so 5x + 1 = 36 and x = 7.", ["x=7"]),
    ans("y9-lef-m9", "Solve 2x/3 = 8.", "\\tfrac{2x}{3}=8", "12", 2, "2x = 24, so x = 12.", ["x=12"]),
    ans("y9-lef-m10", "Solve (x − 5)/2 = x/4.", "\\tfrac{x-5}{2}=\\tfrac{x}{4}", "10", 3, "×4: 2(x − 5) = x, so 2x − 10 = x and x = 10.", ["x=10"]),
  ],
  masteryQuizPool: [
    ans("y9-lef-p1", "Solve (2x − 1)/3 = (x + 1)/2.", "\\tfrac{2x-1}{3}=\\tfrac{x+1}{2}", "5", 5, "×6: 2(2x − 1) = 3(x + 1), so 4x − 2 = 3x + 3 and x = 5.", ["x=5"]),
    ans("y9-lef-p2", "Solve x/2 + x/3 + x/6 = 6.", "\\tfrac{x}{2}+\\tfrac{x}{3}+\\tfrac{x}{6}=6", "6", 5, "×6: 3x + 2x + x = 36, so 6x = 36 and x = 6.", ["x=6"]),
    ans("y9-lef-p3", "Solve (x + 4)/3 = (x − 2)/2.", "\\tfrac{x+4}{3}=\\tfrac{x-2}{2}", "14", 5, "×6: 2(x + 4) = 3(x − 2), so 2x + 8 = 3x − 6 and x = 14.", ["x=14"]),
    ans("y9-lef-p4", "Solve x/4 + 5 = x/2.", "\\tfrac{x}{4}+5=\\tfrac{x}{2}", "20", 5, "×4: x + 20 = 2x, so x = 20.", ["x=20"]),
    ans("y9-lef-p5", "Solve (3x + 1)/4 = (x + 3)/2.", "\\tfrac{3x+1}{4}=\\tfrac{x+3}{2}", "5", 5, "×4: 3x + 1 = 2(x + 3) = 2x + 6, so x = 5.", ["x=5"]),
    ans("y9-lef-p6", "Solve 2x/3 − x/6 = 4.", "\\tfrac{2x}{3}-\\tfrac{x}{6}=4", "8", 5, "×6: 4x − x = 24, so 3x = 24 and x = 8.", ["x=8"]),
    ans("y9-lef-p7", "Solve (x − 1)/2 + (x + 1)/4 = 5.", "\\tfrac{x-1}{2}+\\tfrac{x+1}{4}=5", "7", 5, "×4: 2(x − 1) + (x + 1) = 20, so 3x − 1 = 20 and x = 7.", ["x=7"]),
    ans("y9-lef-p8", "Solve (5x − 3)/2 = 2x + 1.", "\\tfrac{5x-3}{2}=2x+1", "5", 5, "×2: 5x − 3 = 4x + 2, so x = 5.", ["x=5"]),
    ans("y9-lef-p9", "Solve x/3 + (x − 2)/2 = 4.", "\\tfrac{x}{3}+\\tfrac{x-2}{2}=4", "6", 5, "×6: 2x + 3(x − 2) = 24, so 5x − 6 = 24 and x = 6.", ["x=6"]),
    ans("y9-lef-p10", "Solve (x + 6)/4 = (2x − 3)/3.", "\\tfrac{x+6}{4}=\\tfrac{2x-3}{3}", "6", 5, "×12: 3(x + 6) = 4(2x − 3), so 3x + 18 = 8x − 12 and 5x = 30, x = 6.", ["x=6"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying only the fraction by the denominator, not every term.", fix: "Multiply EVERY term on both sides (including whole numbers) by the LCD." },
    { mistake: "Using the wrong common denominator for two different fractions.", fix: "The LCD is the smallest number every denominator divides into — e.g. for halves and thirds it is 6." },
    { mistake: "Forgetting to expand a bracket after clearing, e.g. 3(x + 1).", fix: "After multiplying out, expand each bracket before collecting like terms." },
    { mistake: "Not checking the solution.", fix: "Substitute your answer back into the original equation to confirm it works." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "linear-equations-one-side": linearEquationsOneSide,
  "linear-equations-both-sides": linearEquationsBothSides,
  "linear-equations-involving-fractions": linearEquationsInvolvingFractions,
  "solving-word-problems": solvingWordProblems,
  "linear-inequalities": linearInequalities,
};

export function year9Chapter2EquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "expressions-equations-inequalities") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
