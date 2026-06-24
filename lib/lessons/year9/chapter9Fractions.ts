// Year 9 Wave 10 — Chapter 9, algebraic-fraction sections (ADR-Y9-001, all path):
// simplifying-algebraic-fractions-multiply-divide, simplifying-algebraic-fractions-add-subtract,
// further-add-subtract-algebraic-fractions, equations-with-algebraic-fractions.
// Full per-subtopic contract. Unique id prefixes (afmd/afas/fafs/eaf).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Cancel common factors; for +/− use a common denominator; clear fractions to solve.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the fraction rule.", explanation };
}
const sp = (a: string) => [a, a.replace(/\s+/g, ""), a.replace(/\//g, " / ")];
const xv = (n: string) => [n, `x=${n}`, `x = ${n}`];

// ── simplifying-algebraic-fractions-multiply-divide (path) ──────────────────────────────
const afMultiplyDivide: Partial<ExplicitLesson> = {
  description: "Multiply and divide algebraic fractions by cancelling and using reciprocals.",
  learningIntention: "Multiply and divide simple algebraic fractions.",
  successCriteria: ["Multiply numerators and denominators.", "Cancel common factors.", "Divide by multiplying by the reciprocal.", "Simplify the result."],
  teaching: {
    paragraphs: [
      "To MULTIPLY algebraic fractions, multiply across the tops and across the bottoms, then CANCEL common factors. (x/2) × (4/x) = 4x/(2x) = 2.",
      "Cancel BEFORE multiplying where you can — it keeps numbers small.",
      "To DIVIDE, multiply by the RECIPROCAL of the second fraction: (x/3) ÷ (x/6) = (x/3) × (6/x) = 6x/(3x) = 2.",
      "Always give the simplest form.",
    ],
    latexBlocks: ["\\tfrac{x}{2}\\times\\tfrac{4}{x} = 2", "\\tfrac{x}{3}\\div\\tfrac{x}{6} = \\tfrac{x}{3}\\times\\tfrac{6}{x} = 2"],
  },
  workedExamples: [
    { title: "Multiply", questionLatex: "\\tfrac{x}{2}\\times\\tfrac{4}{x}", steps: [{ explanation: "4x/2x.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Multiply with cancel", questionLatex: "\\tfrac{2x}{3}\\times\\tfrac{9}{4x}", steps: [{ explanation: "18x/12x.", latex: "\\tfrac32" }], finalAnswerLatex: "\\tfrac32" },
    { title: "Divide", questionLatex: "\\tfrac{x}{3}\\div\\tfrac{x}{6}", steps: [{ explanation: "× reciprocal.", latex: "2" }], finalAnswerLatex: "2" },
  ],
  guidedPractice: [
    ans("y9-afmd-g1", "Simplify (x/2) × (6/x).", "\\tfrac{x}{2}\\times\\tfrac{6}{x}", "3", 3, "6x/2x = 3.", []),
    ans("y9-afmd-g2", "Simplify (3/x) × (x/9).", "\\tfrac{3}{x}\\times\\tfrac{x}{9}", "1/3", 3, "3x/9x = 1/3.", sp("1/3")),
    ans("y9-afmd-g3", "Simplify (x/4) ÷ (x/8).", "\\tfrac{x}{4}\\div\\tfrac{x}{8}", "2", 3, "(x/4)(8/x) = 2.", []),
    mcq("y9-afmd-g4", "To divide by a fraction, multiply by its:", "B", ["square", "reciprocal", "numerator", "denominator"], 2, "Reciprocal."),
  ],
  independentPractice: [
    ans("y9-afmd-i1", "Simplify (2/x) × (x/3).", "\\tfrac{2}{x}\\times\\tfrac{x}{3}", "2/3", 3, "2x/3x = 2/3.", sp("2/3")),
    ans("y9-afmd-i2", "Simplify (3x/4) ÷ (x/2).", "\\tfrac{3x}{4}\\div\\tfrac{x}{2}", "3/2", 4, "(3x/4)(2/x) = 6x/4x = 3/2.", sp("3/2")),
    ans("y9-afmd-i3", "Simplify (x/5) × (10/x).", "\\tfrac{x}{5}\\times\\tfrac{10}{x}", "2", 3, "10x/5x = 2.", []),
    ans("y9-afmd-i4", "Simplify (4/x) ÷ (2/x).", "\\tfrac{4}{x}\\div\\tfrac{2}{x}", "2", 3, "(4/x)(x/2) = 2.", []),
    mcq("y9-afmd-i5", "When multiplying fractions you should cancel:", "A", ["common factors", "only numbers", "nothing", "the variables only"], 2, "Cancel any common factors."),
  ],
  masteryQuiz: [
    ans("y9-afmd-m1", "Simplify (x/2) × (4/x).", "\\tfrac{x}{2}\\times\\tfrac{4}{x}", "2", 3, "2.", []),
    ans("y9-afmd-m2", "Simplify (2x/3) × (9/4x).", "\\tfrac{2x}{3}\\times\\tfrac{9}{4x}", "3/2", 4, "18x/12x = 3/2.", sp("3/2")),
    ans("y9-afmd-m3", "Simplify (x/3) ÷ (x/6).", "\\tfrac{x}{3}\\div\\tfrac{x}{6}", "2", 3, "2.", []),
    ans("y9-afmd-m4", "Simplify (5/x) × (x/10).", "\\tfrac{5}{x}\\times\\tfrac{x}{10}", "1/2", 3, "5x/10x = 1/2.", sp("1/2")),
    mcq("y9-afmd-m5", "(x/3) ÷ (x/6) becomes:", "C", ["(x/3)(x/6)", "(3/x)(x/6)", "(x/3)(6/x)", "(6/x)(3/x)"], 3, "Multiply by the reciprocal 6/x."),
    ans("y9-afmd-m6", "Simplify (6/x) × (x/2).", "\\tfrac{6}{x}\\times\\tfrac{x}{2}", "3", 3, "6x/2x = 3.", []),
    ans("y9-afmd-m7", "Simplify (x/8) ÷ (x/4).", "\\tfrac{x}{8}\\div\\tfrac{x}{4}", "1/2", 3, "(x/8)(4/x) = 1/2.", sp("1/2")),
    ans("y9-afmd-m8", "Simplify (3/x) × (2x/9).", "\\tfrac{3}{x}\\times\\tfrac{2x}{9}", "2/3", 4, "6x/9x = 2/3.", sp("2/3")),
    ans("y9-afmd-m9", "Simplify (4x/5) ÷ (2x/5).", "\\tfrac{4x}{5}\\div\\tfrac{2x}{5}", "2", 3, "(4x/5)(5/2x) = 2.", []),
    mcq("y9-afmd-m10", "(2/x) × (x/3) simplifies to:", "A", ["2/3", "2x/3", "6/x", "x²/6"], 3, "2x/3x = 2/3."),
  ],
  masteryQuizPool: [
    ans("y9-afmd-p1", "Simplify (3x/4) × (8/9x).", "\\tfrac{3x}{4}\\times\\tfrac{8}{9x}", "2/3", 5, "24x/36x = 2/3.", sp("2/3")),
    ans("y9-afmd-p2", "Simplify (x²/3) ÷ (x/6).", "\\tfrac{x^2}{3}\\div\\tfrac{x}{6}", "2x", 5, "(x²/3)(6/x) = 6x²/3x = 2x.", []),
    ans("y9-afmd-p3", "Simplify (2x/5) × (15/4x).", "\\tfrac{2x}{5}\\times\\tfrac{15}{4x}", "3/2", 5, "30x/20x = 3/2.", sp("3/2")),
    ans("y9-afmd-p4", "Simplify (6x/7) ÷ (3x/7).", "\\tfrac{6x}{7}\\div\\tfrac{3x}{7}", "2", 5, "(6x/7)(7/3x) = 2.", []),
    ans("y9-afmd-p5", "Simplify (4/x²) × (x/2).", "\\tfrac{4}{x^2}\\times\\tfrac{x}{2}", "2/x", 5, "4x/2x² = 2/x.", sp("2/x")),
    ans("y9-afmd-p6", "Simplify (x/2) × (x/3).", "\\tfrac{x}{2}\\times\\tfrac{x}{3}", "x^2/6", 5, "x²/6.", ["x²/6", "x^2/6"]),
    ans("y9-afmd-p7", "Simplify (9/2x) × (4x/3).", "\\tfrac{9}{2x}\\times\\tfrac{4x}{3}", "6", 5, "36x/6x = 6.", []),
    ans("y9-afmd-p8", "Simplify (x/4) ÷ (3/8).", "\\tfrac{x}{4}\\div\\tfrac{3}{8}", "2x/3", 5, "(x/4)(8/3) = 8x/12 = 2x/3.", sp("2x/3")),
    ans("y9-afmd-p9", "Simplify (5x/6) × (12/25x).", "\\tfrac{5x}{6}\\times\\tfrac{12}{25x}", "2/5", 5, "60x/150x = 2/5.", sp("2/5")),
    ans("y9-afmd-p10", "Simplify (2x²/9) ÷ (x/3).", "\\tfrac{2x^2}{9}\\div\\tfrac{x}{3}", "2x/3", 5, "(2x²/9)(3/x) = 6x²/9x = 2x/3.", sp("2x/3")),
  ],
  commonMistakes: [
    { mistake: "Adding numerators when multiplying.", fix: "Multiply across the tops and bottoms." },
    { mistake: "Forgetting to flip when dividing.", fix: "Divide = multiply by the reciprocal." },
    { mistake: "Not cancelling.", fix: "Cancel common factors to simplify." },
    { mistake: "Cancelling across a + or −.", fix: "Only cancel common FACTORS." },
  ],
  masteryPassMark: 0.8,
};

// ── simplifying-algebraic-fractions-add-subtract (path) ─────────────────────────────────
const afAddSubtract: Partial<ExplicitLesson> = {
  description: "Add and subtract algebraic fractions with numeric denominators.",
  learningIntention: "Add/subtract algebraic fractions using a common denominator.",
  successCriteria: ["Add fractions with the same denominator.", "Find a common denominator.", "Combine the numerators.", "Simplify the result."],
  teaching: {
    paragraphs: [
      "To ADD or SUBTRACT algebraic fractions, use a COMMON DENOMINATOR, just like number fractions. With the same denominator, add the numerators: x/5 + 2x/5 = 3x/5.",
      "Different denominators: x/2 + x/3 → common denominator 6 → 3x/6 + 2x/6 = 5x/6.",
      "Subtract similarly: 3x/4 − x/4 = 2x/4 = x/2.",
      "Simplify the final fraction.",
    ],
    latexBlocks: ["\\tfrac{x}{5}+\\tfrac{2x}{5} = \\tfrac{3x}{5}", "\\tfrac{x}{2}+\\tfrac{x}{3} = \\tfrac{5x}{6}"],
  },
  workedExamples: [
    { title: "Same denominator", questionLatex: "\\tfrac{x}{5}+\\tfrac{2x}{5}", steps: [{ explanation: "Add numerators.", latex: "\\tfrac{3x}{5}" }], finalAnswerLatex: "\\tfrac{3x}{5}" },
    { title: "Common denominator", questionLatex: "\\tfrac{x}{2}+\\tfrac{x}{3}", steps: [{ explanation: "3x/6 + 2x/6.", latex: "\\tfrac{5x}{6}" }], finalAnswerLatex: "\\tfrac{5x}{6}" },
    { title: "Subtract", questionLatex: "\\tfrac{3x}{4}-\\tfrac{x}{4}", steps: [{ explanation: "2x/4.", latex: "\\tfrac{x}{2}" }], finalAnswerLatex: "\\tfrac{x}{2}" },
  ],
  guidedPractice: [
    ans("y9-afas-g1", "Simplify x/3 + x/3.", "\\tfrac{x}{3}+\\tfrac{x}{3}", "2x/3", 3, "2x/3.", sp("2x/3")),
    ans("y9-afas-g2", "Simplify x/2 + x/4.", "\\tfrac{x}{2}+\\tfrac{x}{4}", "3x/4", 3, "2x/4 + x/4 = 3x/4.", sp("3x/4")),
    ans("y9-afas-g3", "Simplify 5x/6 − x/6.", "\\tfrac{5x}{6}-\\tfrac{x}{6}", "2x/3", 3, "4x/6 = 2x/3.", sp("2x/3")),
    mcq("y9-afas-g4", "To add fractions with different denominators you first find a:", "B", ["common numerator", "common denominator", "reciprocal", "product"], 2, "Common denominator."),
  ],
  independentPractice: [
    ans("y9-afas-i1", "Simplify x/5 + 2x/5.", "\\tfrac{x}{5}+\\tfrac{2x}{5}", "3x/5", 3, "3x/5.", sp("3x/5")),
    ans("y9-afas-i2", "Simplify x/2 + x/3.", "\\tfrac{x}{2}+\\tfrac{x}{3}", "5x/6", 3, "5x/6.", sp("5x/6")),
    ans("y9-afas-i3", "Simplify 2x/3 − x/6.", "\\tfrac{2x}{3}-\\tfrac{x}{6}", "x/2", 4, "4x/6 − x/6 = 3x/6 = x/2.", sp("x/2")),
    ans("y9-afas-i4", "Simplify x/4 + x/2.", "\\tfrac{x}{4}+\\tfrac{x}{2}", "3x/4", 3, "x/4 + 2x/4 = 3x/4.", sp("3x/4")),
    mcq("y9-afas-i5", "x/5 + 2x/5 equals:", "C", ["3x/10", "2x²/5", "3x/5", "x/5"], 2, "Add numerators: 3x/5."),
  ],
  masteryQuiz: [
    ans("y9-afas-m1", "Simplify x/4 + x/4.", "\\tfrac{x}{4}+\\tfrac{x}{4}", "x/2", 3, "2x/4 = x/2.", sp("x/2")),
    ans("y9-afas-m2", "Simplify x/2 + x/3.", "\\tfrac{x}{2}+\\tfrac{x}{3}", "5x/6", 3, "5x/6.", sp("5x/6")),
    ans("y9-afas-m3", "Simplify 3x/4 − x/4.", "\\tfrac{3x}{4}-\\tfrac{x}{4}", "x/2", 3, "2x/4 = x/2.", sp("x/2")),
    ans("y9-afas-m4", "Simplify 2x/5 + x/5.", "\\tfrac{2x}{5}+\\tfrac{x}{5}", "3x/5", 3, "3x/5.", sp("3x/5")),
    mcq("y9-afas-m5", "The common denominator for x/2 and x/3 is:", "A", ["6", "5", "2", "3"], 2, "LCD of 2 and 3 is 6."),
    ans("y9-afas-m6", "Simplify x/3 + x/6.", "\\tfrac{x}{3}+\\tfrac{x}{6}", "x/2", 4, "2x/6 + x/6 = 3x/6 = x/2.", sp("x/2")),
    ans("y9-afas-m7", "Simplify 5x/8 − x/8.", "\\tfrac{5x}{8}-\\tfrac{x}{8}", "x/2", 3, "4x/8 = x/2.", sp("x/2")),
    ans("y9-afas-m8", "Simplify x/2 + x/5.", "\\tfrac{x}{2}+\\tfrac{x}{5}", "7x/10", 4, "5x/10 + 2x/10 = 7x/10.", sp("7x/10")),
    ans("y9-afas-m9", "Simplify 3x/5 + x/5.", "\\tfrac{3x}{5}+\\tfrac{x}{5}", "4x/5", 3, "4x/5.", sp("4x/5")),
    mcq("y9-afas-m10", "When the denominators are the same, you:", "B", ["multiply them", "add the numerators", "add the denominators", "use a reciprocal"], 2, "Add numerators only."),
  ],
  masteryQuizPool: [
    ans("y9-afas-p1", "Simplify 2x/3 + 3x/4.", "\\tfrac{2x}{3}+\\tfrac{3x}{4}", "17x/12", 5, "8x/12 + 9x/12 = 17x/12.", sp("17x/12")),
    ans("y9-afas-p2", "Simplify 5x/6 − x/4.", "\\tfrac{5x}{6}-\\tfrac{x}{4}", "7x/12", 5, "10x/12 − 3x/12 = 7x/12.", sp("7x/12")),
    ans("y9-afas-p3", "Simplify x/2 + x/3 + x/6.", "\\tfrac{x}{2}+\\tfrac{x}{3}+\\tfrac{x}{6}", "x", 5, "3x/6 + 2x/6 + x/6 = 6x/6 = x.", []),
    ans("y9-afas-p4", "Simplify 3x/4 − x/3.", "\\tfrac{3x}{4}-\\tfrac{x}{3}", "5x/12", 5, "9x/12 − 4x/12 = 5x/12.", sp("5x/12")),
    ans("y9-afas-p5", "Simplify x/5 + 3x/10.", "\\tfrac{x}{5}+\\tfrac{3x}{10}", "x/2", 5, "2x/10 + 3x/10 = 5x/10 = x/2.", sp("x/2")),
    ans("y9-afas-p6", "Simplify 7x/8 − x/2.", "\\tfrac{7x}{8}-\\tfrac{x}{2}", "3x/8", 5, "7x/8 − 4x/8 = 3x/8.", sp("3x/8")),
    ans("y9-afas-p7", "Simplify x/3 + 2x/9.", "\\tfrac{x}{3}+\\tfrac{2x}{9}", "5x/9", 5, "3x/9 + 2x/9 = 5x/9.", sp("5x/9")),
    ans("y9-afas-p8", "Simplify 5x/6 + 2x/3.", "\\tfrac{5x}{6}+\\tfrac{2x}{3}", "3x/2", 5, "5x/6 + 4x/6 = 9x/6 = 3x/2.", sp("3x/2")),
    ans("y9-afas-p9", "Simplify 11x/12 − x/4.", "\\tfrac{11x}{12}-\\tfrac{x}{4}", "2x/3", 5, "11x/12 − 3x/12 = 8x/12 = 2x/3.", sp("2x/3")),
    ans("y9-afas-p10", "Simplify x/2 − x/6.", "\\tfrac{x}{2}-\\tfrac{x}{6}", "x/3", 5, "3x/6 − x/6 = 2x/6 = x/3.", sp("x/3")),
  ],
  commonMistakes: [
    { mistake: "Adding the denominators.", fix: "Keep the common denominator; add only the numerators." },
    { mistake: "Not converting to a common denominator.", fix: "Rewrite both with the LCD first." },
    { mistake: "Forgetting to simplify the result.", fix: "Reduce the final fraction." },
    { mistake: "Sign slip when subtracting.", fix: "Subtract the whole numerator." },
  ],
  masteryPassMark: 0.8,
};

// ── further-add-subtract-algebraic-fractions (path) ────────────────────────────────────
const furtherAddSubtract: Partial<ExplicitLesson> = {
  description: "Add and subtract algebraic fractions where the variable appears in the denominator.",
  learningIntention: "Combine fractions with variable denominators.",
  successCriteria: ["Add fractions like a/x + b/x.", "Use a common denominator with x terms.", "Combine numerators.", "Simplify."],
  teaching: {
    paragraphs: [
      "When the variable is in the DENOMINATOR, the same rules apply. With equal denominators: 2/x + 3/x = 5/x.",
      "Different denominators in x: 1/x + 1/(2x) → common denominator 2x → 2/(2x) + 1/(2x) = 3/(2x).",
      "Mixed: x/2 + x/4 = 2x/4 + x/4 = 3x/4.",
      "Always simplify the final fraction.",
    ],
    latexBlocks: ["\\tfrac{2}{x}+\\tfrac{3}{x} = \\tfrac{5}{x}", "\\tfrac{1}{x}+\\tfrac{1}{2x} = \\tfrac{3}{2x}"],
  },
  workedExamples: [
    { title: "Same denominator", questionLatex: "\\tfrac{2}{x}+\\tfrac{3}{x}", steps: [{ explanation: "Add numerators.", latex: "\\tfrac{5}{x}" }], finalAnswerLatex: "\\tfrac{5}{x}" },
    { title: "Common denom in x", questionLatex: "\\tfrac{1}{x}+\\tfrac{1}{2x}", steps: [{ explanation: "2/(2x) + 1/(2x).", latex: "\\tfrac{3}{2x}" }], finalAnswerLatex: "\\tfrac{3}{2x}" },
    { title: "Mixed", questionLatex: "\\tfrac{x}{2}+\\tfrac{x}{4}", steps: [{ explanation: "2x/4 + x/4.", latex: "\\tfrac{3x}{4}" }], finalAnswerLatex: "\\tfrac{3x}{4}" },
  ],
  guidedPractice: [
    ans("y9-fafs-g1", "Simplify 1/x + 2/x.", "\\tfrac{1}{x}+\\tfrac{2}{x}", "3/x", 3, "3/x.", sp("3/x")),
    ans("y9-fafs-g2", "Simplify 5/x − 2/x.", "\\tfrac{5}{x}-\\tfrac{2}{x}", "3/x", 3, "3/x.", sp("3/x")),
    ans("y9-fafs-g3", "Simplify 1/x + 1/(2x).", "\\tfrac{1}{x}+\\tfrac{1}{2x}", "3/2x", 4, "2/(2x) + 1/(2x) = 3/(2x).", sp("3/(2x)"), ),
    mcq("y9-fafs-g4", "2/x + 3/x equals:", "A", ["5/x", "5/2x", "6/x²", "5x"], 2, "Add numerators: 5/x."),
  ],
  independentPractice: [
    ans("y9-fafs-i1", "Simplify 3/x + 4/x.", "\\tfrac{3}{x}+\\tfrac{4}{x}", "7/x", 3, "7/x.", sp("7/x")),
    ans("y9-fafs-i2", "Simplify 7/x − 3/x.", "\\tfrac{7}{x}-\\tfrac{3}{x}", "4/x", 3, "4/x.", sp("4/x")),
    ans("y9-fafs-i3", "Simplify 1/(2x) + 1/(2x).", "\\tfrac{1}{2x}+\\tfrac{1}{2x}", "1/x", 4, "2/(2x) = 1/x.", sp("1/x")),
    ans("y9-fafs-i4", "Simplify x/3 + x/6.", "\\tfrac{x}{3}+\\tfrac{x}{6}", "x/2", 4, "2x/6 + x/6 = x/2.", sp("x/2")),
    mcq("y9-fafs-i5", "The common denominator of 1/x and 1/(2x) is:", "B", ["x", "2x", "3x", "x²"], 3, "2x."),
  ],
  masteryQuiz: [
    ans("y9-fafs-m1", "Simplify 2/x + 3/x.", "\\tfrac{2}{x}+\\tfrac{3}{x}", "5/x", 3, "5/x.", sp("5/x")),
    ans("y9-fafs-m2", "Simplify 1/x + 1/(2x).", "\\tfrac{1}{x}+\\tfrac{1}{2x}", "3/2x", 4, "3/(2x).", sp("3/(2x)")),
    ans("y9-fafs-m3", "Simplify 8/x − 5/x.", "\\tfrac{8}{x}-\\tfrac{5}{x}", "3/x", 3, "3/x.", sp("3/x")),
    ans("y9-fafs-m4", "Simplify x/2 + x/4.", "\\tfrac{x}{2}+\\tfrac{x}{4}", "3x/4", 3, "3x/4.", sp("3x/4")),
    mcq("y9-fafs-m5", "1/x + 1/(2x) needs the common denominator:", "C", ["x", "x²", "2x", "3x"], 3, "2x."),
    ans("y9-fafs-m6", "Simplify 4/x + 1/x.", "\\tfrac{4}{x}+\\tfrac{1}{x}", "5/x", 3, "5/x.", sp("5/x")),
    ans("y9-fafs-m7", "Simplify 3/(2x) + 1/(2x).", "\\tfrac{3}{2x}+\\tfrac{1}{2x}", "2/x", 4, "4/(2x) = 2/x.", sp("2/x")),
    ans("y9-fafs-m8", "Simplify 5/x − 1/x.", "\\tfrac{5}{x}-\\tfrac{1}{x}", "4/x", 3, "4/x.", sp("4/x")),
    ans("y9-fafs-m9", "Simplify x/4 + x/4 + x/4.", "3\\times\\tfrac{x}{4}", "3x/4", 3, "3x/4.", sp("3x/4")),
    mcq("y9-fafs-m10", "a/x + b/x equals:", "A", ["(a + b)/x", "(a + b)/2x", "ab/x", "(a + b)/x²"], 2, "Add the numerators."),
  ],
  masteryQuizPool: [
    ans("y9-fafs-p1", "Simplify 1/x + 1/(3x).", "\\tfrac{1}{x}+\\tfrac{1}{3x}", "4/3x", 5, "3/(3x) + 1/(3x) = 4/(3x).", sp("4/(3x)")),
    ans("y9-fafs-p2", "Simplify 2/x − 1/(2x).", "\\tfrac{2}{x}-\\tfrac{1}{2x}", "3/2x", 5, "4/(2x) − 1/(2x) = 3/(2x).", sp("3/(2x)")),
    ans("y9-fafs-p3", "Simplify 1/(2x) + 1/(3x).", "\\tfrac{1}{2x}+\\tfrac{1}{3x}", "5/6x", 5, "3/(6x) + 2/(6x) = 5/(6x).", sp("5/(6x)")),
    ans("y9-fafs-p4", "Simplify 3/x + x/3 — write over 3x.", "\\tfrac{3}{x}+\\tfrac{x}{3}", "(9+x^2)/3x", 5, "9/(3x) + x²/(3x) = (9 + x²)/(3x).", ["(9+x²)/3x", "(x²+9)/3x"]),
    ans("y9-fafs-p5", "Simplify 5/(2x) − 1/x.", "\\tfrac{5}{2x}-\\tfrac{1}{x}", "3/2x", 5, "5/(2x) − 2/(2x) = 3/(2x).", sp("3/(2x)")),
    ans("y9-fafs-p6", "Simplify 7/(3x) + 2/(3x).", "\\tfrac{7}{3x}+\\tfrac{2}{3x}", "3/x", 5, "9/(3x) = 3/x.", sp("3/x")),
    ans("y9-fafs-p7", "Simplify 2x/3 + x/2.", "\\tfrac{2x}{3}+\\tfrac{x}{2}", "7x/6", 5, "4x/6 + 3x/6 = 7x/6.", sp("7x/6")),
    ans("y9-fafs-p8", "Simplify 9/(4x) − 1/(4x).", "\\tfrac{9}{4x}-\\tfrac{1}{4x}", "2/x", 5, "8/(4x) = 2/x.", sp("2/x")),
    ans("y9-fafs-p9", "Simplify 1/x + 2/(5x).", "\\tfrac{1}{x}+\\tfrac{2}{5x}", "7/5x", 5, "5/(5x) + 2/(5x) = 7/(5x).", sp("7/(5x)")),
    ans("y9-fafs-p10", "Simplify 3x/4 − x/8.", "\\tfrac{3x}{4}-\\tfrac{x}{8}", "5x/8", 5, "6x/8 − x/8 = 5x/8.", sp("5x/8")),
  ],
  commonMistakes: [
    { mistake: "Adding x's in the denominator.", fix: "Use a common denominator; don't add denominators." },
    { mistake: "Treating 1/x + 1/(2x) as 2/(3x).", fix: "LCD is 2x → 3/(2x)." },
    { mistake: "Forgetting to simplify (e.g. 4/(2x)).", fix: "Reduce to 2/x." },
    { mistake: "Cancelling across + signs.", fix: "Only cancel common factors of the whole fraction." },
  ],
  masteryPassMark: 0.8,
};

// ── equations-with-algebraic-fractions (path) ──────────────────────────────────────────
const equationsWithFractions: Partial<ExplicitLesson> = {
  description: "Solve linear equations involving algebraic fractions by clearing the denominators.",
  learningIntention: "Solve equations with fractions by multiplying through.",
  successCriteria: ["Multiply both sides by the denominator.", "Clear multiple fractions with the LCD.", "Solve the resulting equation.", "Check the solution."],
  teaching: {
    paragraphs: [
      "To solve an equation with fractions, MULTIPLY BOTH SIDES by the denominator (or the LCD) to CLEAR the fractions, then solve normally.",
      "x/2 = 3 → multiply by 2 → x = 6.",
      "x/2 + x/3 = 5 → multiply by 6 → 3x + 2x = 30 → 5x = 30 → x = 6.",
      "(x + 1)/2 = 4 → multiply by 2 → x + 1 = 8 → x = 7.",
    ],
    latexBlocks: ["\\tfrac{x}{2} = 3 \\Rightarrow x = 6", "\\tfrac{x}{2}+\\tfrac{x}{3} = 5 \\Rightarrow x = 6"],
  },
  workedExamples: [
    { title: "One fraction", questionLatex: "\\text{Solve } \\tfrac{x}{2} = 3.", steps: [{ explanation: "× 2.", latex: "x = 6" }], finalAnswerLatex: "x = 6" },
    { title: "Two fractions", questionLatex: "\\text{Solve } \\tfrac{x}{2}+\\tfrac{x}{3} = 5.", steps: [{ explanation: "× 6.", latex: "x = 6" }], finalAnswerLatex: "x = 6" },
    { title: "Bracket", questionLatex: "\\text{Solve } \\tfrac{x+1}{2} = 4.", steps: [{ explanation: "× 2.", latex: "x = 7" }], finalAnswerLatex: "x = 7" },
  ],
  guidedPractice: [
    ans("y9-eaf-g1", "Solve x/3 = 4.", "\\tfrac{x}{3}=4", "12", 3, "x = 12.", xv("12")),
    ans("y9-eaf-g2", "Solve x/2 + 1 = 5.", "\\tfrac{x}{2}+1=5", "8", 3, "x/2 = 4 → x = 8.", xv("8")),
    ans("y9-eaf-g3", "Solve (x − 1)/3 = 2.", "\\tfrac{x-1}{3}=2", "7", 3, "x − 1 = 6 → x = 7.", xv("7")),
    mcq("y9-eaf-g4", "To clear fractions from an equation you:", "B", ["add the denominators", "multiply both sides by the denominator", "divide by x", "ignore them"], 2, "Multiply through by the denominator/LCD."),
  ],
  independentPractice: [
    ans("y9-eaf-i1", "Solve x/4 = 5.", "\\tfrac{x}{4}=5", "20", 3, "x = 20.", xv("20")),
    ans("y9-eaf-i2", "Solve x/2 + x/3 = 5.", "\\tfrac{x}{2}+\\tfrac{x}{3}=5", "6", 4, "×6: 5x = 30 → x = 6.", xv("6")),
    ans("y9-eaf-i3", "Solve (x + 2)/3 = 4.", "\\tfrac{x+2}{3}=4", "10", 3, "x + 2 = 12 → x = 10.", xv("10")),
    ans("y9-eaf-i4", "Solve 2x/5 = 4.", "\\tfrac{2x}{5}=4", "10", 3, "2x = 20 → x = 10.", xv("10")),
    mcq("y9-eaf-i5", "The LCD to clear x/2 + x/3 is:", "C", ["2", "3", "6", "5"], 2, "6."),
  ],
  masteryQuiz: [
    ans("y9-eaf-m1", "Solve x/2 = 3.", "\\tfrac{x}{2}=3", "6", 3, "x = 6.", xv("6")),
    ans("y9-eaf-m2", "Solve x/5 = 4.", "\\tfrac{x}{5}=4", "20", 3, "x = 20.", xv("20")),
    ans("y9-eaf-m3", "Solve x/2 + x/3 = 5.", "\\tfrac{x}{2}+\\tfrac{x}{3}=5", "6", 4, "×6: 5x = 30 → x = 6.", xv("6")),
    ans("y9-eaf-m4", "Solve (x + 1)/2 = 4.", "\\tfrac{x+1}{2}=4", "7", 3, "x + 1 = 8 → x = 7.", xv("7")),
    mcq("y9-eaf-m5", "After multiplying x/2 = 3 by 2 you get:", "A", ["x = 6", "x = 3/2", "x = 1.5", "x = 5"], 2, "x = 6."),
    ans("y9-eaf-m6", "Solve x/3 − 1 = 2.", "\\tfrac{x}{3}-1=2", "9", 3, "x/3 = 3 → x = 9.", xv("9")),
    ans("y9-eaf-m7", "Solve (x − 3)/4 = 2.", "\\tfrac{x-3}{4}=2", "11", 3, "x − 3 = 8 → x = 11.", xv("11")),
    ans("y9-eaf-m8", "Solve x/4 + x/2 = 6.", "\\tfrac{x}{4}+\\tfrac{x}{2}=6", "8", 4, "×4: x + 2x = 24 → 3x = 24 → x = 8.", xv("8")),
    ans("y9-eaf-m9", "Solve 3x/4 = 9.", "\\tfrac{3x}{4}=9", "12", 3, "3x = 36 → x = 12.", xv("12")),
    mcq("y9-eaf-m10", "Multiplying every term by the LCD is done to:", "B", ["increase the answer", "clear the fractions", "change the solution", "add a fraction"], 2, "Clear the fractions."),
  ],
  masteryQuizPool: [
    ans("y9-eaf-p1", "Solve x/2 + x/4 = 9.", "\\tfrac{x}{2}+\\tfrac{x}{4}=9", "12", 5, "×4: 2x + x = 36 → 3x = 36 → x = 12.", xv("12")),
    ans("y9-eaf-p2", "Solve (2x + 1)/3 = 5.", "\\tfrac{2x+1}{3}=5", "7", 5, "2x + 1 = 15 → x = 7.", xv("7")),
    ans("y9-eaf-p3", "Solve x/3 + x/6 = 3.", "\\tfrac{x}{3}+\\tfrac{x}{6}=3", "6", 5, "×6: 2x + x = 18 → 3x = 18 → x = 6.", xv("6")),
    ans("y9-eaf-p4", "Solve (x + 4)/2 = x − 1.", "\\tfrac{x+4}{2}=x-1", "6", 5, "x + 4 = 2x − 2 → x = 6.", xv("6")),
    ans("y9-eaf-p5", "Solve 2x/3 − x/6 = 2.", "\\tfrac{2x}{3}-\\tfrac{x}{6}=2", "4", 5, "×6: 4x − x = 12 → 3x = 12 → x = 4.", xv("4")),
    ans("y9-eaf-p6", "Solve (x − 2)/5 = 3.", "\\tfrac{x-2}{5}=3", "17", 5, "x − 2 = 15 → x = 17.", xv("17")),
    ans("y9-eaf-p7", "Solve x/2 + x/5 = 7.", "\\tfrac{x}{2}+\\tfrac{x}{5}=7", "10", 5, "×10: 5x + 2x = 70 → 7x = 70 → x = 10.", xv("10")),
    ans("y9-eaf-p8", "Solve (3x − 1)/4 = 5.", "\\tfrac{3x-1}{4}=5", "7", 5, "3x − 1 = 20 → 3x = 21 → x = 7.", xv("7")),
    ans("y9-eaf-p9", "Solve x/4 + 2 = x/2.", "\\tfrac{x}{4}+2=\\tfrac{x}{2}", "8", 5, "×4: x + 8 = 2x → x = 8.", xv("8")),
    ans("y9-eaf-p10", "Solve (x + 6)/3 = (x − 2)/2.", "\\tfrac{x+6}{3}=\\tfrac{x-2}{2}", "18", 5, "×6: 2(x+6) = 3(x−2) → 2x+12 = 3x−6 → x = 18.", xv("18")),
  ],
  commonMistakes: [
    { mistake: "Multiplying only one term by the LCD.", fix: "Multiply EVERY term on both sides." },
    { mistake: "Forgetting brackets around (x + 1).", fix: "Multiply the whole numerator." },
    { mistake: "Using the wrong LCD.", fix: "Use the lowest common multiple of the denominators." },
    { mistake: "Not checking the solution.", fix: "Substitute back into the original equation." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "simplifying-algebraic-fractions-multiply-divide": afMultiplyDivide,
  "simplifying-algebraic-fractions-add-subtract": afAddSubtract,
  "further-add-subtract-algebraic-fractions": furtherAddSubtract,
  "equations-with-algebraic-fractions": equationsWithFractions,
};

export function year9Chapter9FractionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "quadratic-expressions-algebraic-techniques") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
