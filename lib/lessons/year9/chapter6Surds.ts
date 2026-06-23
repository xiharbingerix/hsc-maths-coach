// Year 9 Wave 7 — Chapter 6, surd sections (ADR-Y9-001, both path):
// fractional-indices-surds, operations-with-surds. Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "A fractional index is a root; simplify surds by pulling out perfect squares.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the surd/index rule.", explanation };
}
const sd = (k: number, r: number) => [`${k}√${r}`, `${k}\\sqrt{${r}}`, `${k}sqrt${r}`, `${k} root ${r}`];

// ── fractional-indices-surds (path) ────────────────────────────────────────────────────
const fractionalIndices: Partial<ExplicitLesson> = {
  description: "Interpret fractional indices as roots: a^(1/2) = √a, a^(1/n) = the nth root, a^(m/n).",
  learningIntention: "Evaluate fractional-index expressions as roots.",
  successCriteria: ["Know the one-half power is the square root.", "Know the one-over-n power is the nth root.", "Evaluate an m-over-n power.", "Handle a negative fractional index."],
  teaching: {
    paragraphs: [
      "A fractional index means a ROOT. An index of one-half is the SQUARE ROOT — the one-half power of 9 is 3, and of 16 is 4.",
      "In general, an index of one-over-n gives the nth ROOT: the one-third power of 8 is the cube root ∛8 = 2, and the one-quarter power of 16 is 2.",
      "For an index of m-over-n, take the nth root then raise it to the m: the two-thirds power of 8 is (∛8)² = 2² = 4.",
      "A negative fractional index combines both ideas: the negative-one-half power of 9 is 1 ÷ √9 = 1/3.",
    ],
    latexBlocks: ["a^{1/2} = \\sqrt{a},\\ a^{1/n} = \\sqrt[n]{a}", "8^{2/3} = (\\sqrt[3]{8})^2 = 4"],
  },
  workedExamples: [
    { title: "Square root", questionLatex: "\\text{Evaluate } 9^{1/2}.", steps: [{ explanation: "√9.", latex: "3" }], finalAnswerLatex: "3" },
    { title: "Cube root", questionLatex: "\\text{Evaluate } 8^{1/3}.", steps: [{ explanation: "∛8.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Another", questionLatex: "\\text{Evaluate } 16^{1/2}.", steps: [{ explanation: "√16.", latex: "4" }], finalAnswerLatex: "4" },
  ],
  guidedPractice: [
    ans("y9-fis-g1", "Evaluate 4^(1/2).", "4^{1/2}", "2", 2, "√4 = 2.", []),
    ans("y9-fis-g2", "Evaluate 25^(1/2).", "25^{1/2}", "5", 2, "√25 = 5.", []),
    ans("y9-fis-g3", "Evaluate 27^(1/3).", "27^{1/3}", "3", 3, "∛27 = 3.", []),
    mcq("y9-fis-g4", "a^(1/2) means:", "A", ["√a", "a/2", "2a", "a²"], 2, "The square root of a."),
  ],
  independentPractice: [
    ans("y9-fis-i1", "Evaluate 36^(1/2).", "36^{1/2}", "6", 2, "√36 = 6.", []),
    ans("y9-fis-i2", "Evaluate 64^(1/3).", "64^{1/3}", "4", 3, "∛64 = 4.", []),
    ans("y9-fis-i3", "Evaluate 100^(1/2).", "100^{1/2}", "10", 2, "√100 = 10.", []),
    ans("y9-fis-i4", "Evaluate 8^(2/3).", "8^{2/3}", "4", 4, "(∛8)² = 2² = 4.", []),
    mcq("y9-fis-i5", "16^(1/4) equals:", "B", ["4", "2", "8", "1/4"], 3, "The 4th root of 16 is 2."),
  ],
  masteryQuiz: [
    ans("y9-fis-m1", "Evaluate 49^(1/2).", "49^{1/2}", "7", 2, "7.", []),
    ans("y9-fis-m2", "Evaluate 1000^(1/3).", "1000^{1/3}", "10", 3, "∛1000 = 10.", []),
    ans("y9-fis-m3", "Evaluate 16^(1/4).", "16^{1/4}", "2", 3, "2.", []),
    ans("y9-fis-m4", "Evaluate 81^(1/2).", "81^{1/2}", "9", 2, "9.", []),
    mcq("y9-fis-m5", "9^(1/2) equals:", "A", ["3", "4.5", "18", "81"], 2, "√9 = 3."),
    ans("y9-fis-m6", "Evaluate 125^(1/3).", "125^{1/3}", "5", 3, "∛125 = 5.", []),
    ans("y9-fis-m7", "Evaluate 4^(3/2).", "4^{3/2}", "8", 4, "(√4)³ = 2³ = 8.", []),
    ans("y9-fis-m8", "Evaluate 144^(1/2).", "144^{1/2}", "12", 2, "12.", []),
    ans("y9-fis-m9", "Evaluate 32^(1/5).", "32^{1/5}", "2", 4, "The 5th root of 32 is 2.", []),
    mcq("y9-fis-m10", "8^(2/3) means:", "C", ["8 ÷ 3 × 2", "(√8)²", "(∛8)²", "8 × 2/3"], 3, "Take the cube root, then square."),
  ],
  masteryQuizPool: [
    ans("y9-fis-p1", "Evaluate 8^(2/3).", "8^{2/3}", "4", 5, "(∛8)² = 4.", []),
    ans("y9-fis-p2", "Evaluate 16^(3/4).", "16^{3/4}", "8", 5, "(16^(1/4))³ = 2³ = 8.", []),
    ans("y9-fis-p3", "Evaluate 27^(2/3).", "27^{2/3}", "9", 5, "(∛27)² = 3² = 9.", []),
    ans("y9-fis-p4", "Evaluate 9^(−1/2).", "9^{-1/2}", "1/3", 5, "1/√9 = 1/3.", ["1 / 3"]),
    ans("y9-fis-p5", "Evaluate 4^(5/2).", "4^{5/2}", "32", 5, "(√4)⁵ = 2⁵ = 32.", []),
    ans("y9-fis-p6", "Evaluate 25^(3/2).", "25^{3/2}", "125", 5, "(√25)³ = 5³ = 125.", []),
    ans("y9-fis-p7", "Evaluate 8^(−1/3).", "8^{-1/3}", "1/2", 5, "1/∛8 = 1/2.", ["1 / 2", "0.5"]),
    ans("y9-fis-p8", "Evaluate 32^(2/5).", "32^{2/5}", "4", 5, "(32^(1/5))² = 2² = 4.", []),
    ans("y9-fis-p9", "Evaluate 100^(3/2).", "100^{3/2}", "1000", 5, "(√100)³ = 10³ = 1000.", []),
    ans("y9-fis-p10", "Evaluate 16^(−1/2).", "16^{-1/2}", "1/4", 5, "1/√16 = 1/4.", ["1 / 4", "0.25"]),
  ],
  commonMistakes: [
    { mistake: "Reading a^(1/2) as a ÷ 2.", fix: "It is the square root √a." },
    { mistake: "Forgetting the m in a^(m/n).", fix: "Take the nth root, then raise to m." },
    { mistake: "Mishandling the negative sign.", fix: "a^(−m/n) = 1 / a^(m/n)." },
    { mistake: "Using the wrong root.", fix: "The denominator gives the root index." },
  ],
  masteryPassMark: 0.8,
};

// ── operations-with-surds (path) ───────────────────────────────────────────────────────
const operationsWithSurds: Partial<ExplicitLesson> = {
  description: "Simplify surds, add like surds and multiply surds.",
  learningIntention: "Carry out simple operations with surds.",
  successCriteria: ["Simplify a surd using perfect-square factors.", "Use √a × √a = a.", "Multiply surds.", "Add and subtract like surds."],
  teaching: {
    paragraphs: [
      "A SURD is an irrational root like √2. SIMPLIFY by pulling out the largest PERFECT-SQUARE factor: √8 = √(4×2) = 2√2 and √18 = 3√2.",
      "MULTIPLYING: √a × √b = √(ab), and √a × √a = a. So √2 × √2 = 2 and √3 × √12 = √36 = 6.",
      "ADD or SUBTRACT only LIKE surds (same root): 2√3 + 3√3 = 5√3, but √2 + √3 cannot be combined.",
      "Always simplify each surd first — then like surds may appear.",
    ],
    latexBlocks: ["\\sqrt8 = 2\\sqrt2", "\\sqrt a \\times \\sqrt a = a", "2\\sqrt3 + 3\\sqrt3 = 5\\sqrt3"],
  },
  workedExamples: [
    { title: "Simplify", questionLatex: "\\text{Simplify } \\sqrt8.", steps: [{ explanation: "√(4×2).", latex: "2\\sqrt2" }], finalAnswerLatex: "2\\sqrt2" },
    { title: "Multiply", questionLatex: "\\sqrt2 \\times \\sqrt2.", steps: [{ explanation: "√a×√a = a.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Add like surds", questionLatex: "2\\sqrt3 + 3\\sqrt3.", steps: [{ explanation: "Add coefficients.", latex: "5\\sqrt3" }], finalAnswerLatex: "5\\sqrt3" },
  ],
  guidedPractice: [
    ans("y9-ows-g1", "Evaluate √4.", "\\sqrt4", "2", 2, "2.", []),
    ans("y9-ows-g2", "Evaluate √2 × √8.", "\\sqrt2\\times\\sqrt8", "4", 3, "√16 = 4.", []),
    ans("y9-ows-g3", "Evaluate √3 × √3.", "\\sqrt3\\times\\sqrt3", "3", 2, "√a × √a = a = 3.", []),
    mcq("y9-ows-g4", "√a × √a equals:", "A", ["a", "2√a", "a²", "√(2a)"], 2, "It is a."),
  ],
  independentPractice: [
    ans("y9-ows-i1", "Evaluate √9.", "\\sqrt9", "3", 2, "3.", []),
    ans("y9-ows-i2", "Simplify √12.", "\\sqrt{12}", "2√3", 3, "√(4×3) = 2√3.", sd(2, 3)),
    ans("y9-ows-i3", "Simplify 2√5 + 3√5.", "2\\sqrt5+3\\sqrt5", "5√5", 2, "5√5.", sd(5, 5)),
    ans("y9-ows-i4", "Evaluate √5 × √5.", "\\sqrt5\\times\\sqrt5", "5", 2, "5.", []),
    mcq("y9-ows-i5", "√8 simplifies to:", "B", ["4√2", "2√2", "2√4", "8√1"], 3, "√(4×2) = 2√2."),
  ],
  masteryQuiz: [
    ans("y9-ows-m1", "Evaluate √16.", "\\sqrt{16}", "4", 2, "4.", []),
    ans("y9-ows-m2", "Simplify √18.", "\\sqrt{18}", "3√2", 3, "√(9×2) = 3√2.", sd(3, 2)),
    ans("y9-ows-m3", "Evaluate √3 × √12.", "\\sqrt3\\times\\sqrt{12}", "6", 3, "√36 = 6.", []),
    ans("y9-ows-m4", "Simplify 4√2 + √2.", "4\\sqrt2+\\sqrt2", "5√2", 2, "5√2.", sd(5, 2)),
    mcq("y9-ows-m5", "√2 × √2 equals:", "C", ["√2", "2√2", "2", "4"], 2, "= 2."),
    ans("y9-ows-m6", "Simplify √50.", "\\sqrt{50}", "5√2", 3, "√(25×2) = 5√2.", sd(5, 2)),
    ans("y9-ows-m7", "Evaluate √6 × √6.", "\\sqrt6\\times\\sqrt6", "6", 2, "6.", []),
    ans("y9-ows-m8", "Simplify 5√3 − 2√3.", "5\\sqrt3-2\\sqrt3", "3√3", 2, "3√3.", sd(3, 3)),
    ans("y9-ows-m9", "Simplify √20.", "\\sqrt{20}", "2√5", 3, "√(4×5) = 2√5.", sd(2, 5)),
    mcq("y9-ows-m10", "Which surds can be added directly?", "B", ["√2 and √3", "2√5 and 3√5", "√2 and √8 (unsimplified)", "√3 and √12 (unsimplified)"], 3, "Like surds (same root) — 2√5 and 3√5."),
  ],
  masteryQuizPool: [
    ans("y9-ows-p1", "Expand √2(√2 + 1).", "\\sqrt2(\\sqrt2+1)", "2+√2", 5, "2 + √2.", ["2 + √2", "√2+2", "2+\\sqrt2"]),
    ans("y9-ows-p2", "Evaluate (√3)².", "(\\sqrt3)^2", "3", 5, "3.", []),
    ans("y9-ows-p3", "Simplify √8 + √2.", "\\sqrt8+\\sqrt2", "3√2", 5, "2√2 + √2 = 3√2.", sd(3, 2)),
    ans("y9-ows-p4", "Simplify √27 − √3.", "\\sqrt{27}-\\sqrt3", "2√3", 5, "3√3 − √3 = 2√3.", sd(2, 3)),
    ans("y9-ows-p5", "Simplify √12 + √3.", "\\sqrt{12}+\\sqrt3", "3√3", 5, "2√3 + √3 = 3√3.", sd(3, 3)),
    ans("y9-ows-p6", "Evaluate √5 × √20.", "\\sqrt5\\times\\sqrt{20}", "10", 5, "√100 = 10.", []),
    ans("y9-ows-p7", "Simplify √72.", "\\sqrt{72}", "6√2", 5, "√(36×2) = 6√2.", sd(6, 2)),
    ans("y9-ows-p8", "Expand √3(√3 − 2).", "\\sqrt3(\\sqrt3-2)", "3-2√3", 5, "3 − 2√3.", ["3 - 2√3", "3-2\\sqrt3"]),
    ans("y9-ows-p9", "Simplify √50 − √18.", "\\sqrt{50}-\\sqrt{18}", "2√2", 5, "5√2 − 3√2 = 2√2.", sd(2, 2)),
    ans("y9-ows-p10", "Evaluate (2√3)².", "(2\\sqrt3)^2", "12", 5, "4 × 3 = 12.", []),
  ],
  commonMistakes: [
    { mistake: "Adding unlike surds.", fix: "Only add surds with the same root (like surds)." },
    { mistake: "Not pulling out the largest perfect square.", fix: "√8 = 2√2, not √4·√2 left unfinished." },
    { mistake: "Writing √a × √a as √(a²) then stopping.", fix: "It equals a." },
    { mistake: "Forgetting to simplify before combining.", fix: "Simplify each surd; like surds may then appear." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "fractional-indices-surds": fractionalIndices,
  "operations-with-surds": operationsWithSurds,
};

export function year9Chapter6SurdsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "indices-surds") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
