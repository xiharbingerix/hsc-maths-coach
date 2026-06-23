// Year 9 Wave 7 — Chapter 6, negative-index & scientific-notation sections (ADR-Y9-001):
// negative-indices (path), scientific-notation (core), scientific-notation-significant-figures (core).
// Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Use the index/scientific-notation rules.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the rule.", explanation };
}
// scientific-notation answer variants
const sci = (a: number, n: number) => {
  const sup: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  const u = String(n).split("").map((d) => sup[d]).join("");
  return [`${a}×10^${n}`, `${a}x10^${n}`, `${a}*10^${n}`, `${a}×10^{${n}}`, `${a}×10${u}`, `${a}e${n}`];
};

// ── negative-indices (path) ────────────────────────────────────────────────────────────
const negativeIndices: Partial<ExplicitLesson> = {
  description: "Use negative indices: a⁻ⁿ = 1/aⁿ.",
  learningIntention: "Rewrite and evaluate powers with negative indices.",
  successCriteria: ["Know a⁻ⁿ = 1/aⁿ.", "Evaluate negative-index numbers.", "Rewrite pronumeral powers.", "Combine with other laws."],
  teaching: {
    paragraphs: [
      "A NEGATIVE index means a RECIPROCAL: a⁻ⁿ = 1/aⁿ. So 2⁻³ = 1/2³ = 1/8 and x⁻² = 1/x².",
      "5⁻¹ = 1/5, and 10⁻¹ = 1/10.",
      "The bigger the negative index, the smaller the value.",
      "Negative indices follow all the usual index laws.",
    ],
    latexBlocks: ["a^{-n} = \\tfrac{1}{a^n}", "2^{-3} = \\tfrac{1}{8}"],
  },
  workedExamples: [
    { title: "Numeric", questionLatex: "\\text{Evaluate } 2^{-3}.", steps: [{ explanation: "1/2³.", latex: "\\tfrac18" }], finalAnswerLatex: "\\tfrac18" },
    { title: "Pronumeral", questionLatex: "\\text{Rewrite } x^{-2}.", steps: [{ explanation: "Reciprocal.", latex: "\\tfrac{1}{x^2}" }], finalAnswerLatex: "\\tfrac{1}{x^2}" },
    { title: "Index −1", questionLatex: "\\text{Evaluate } 5^{-1}.", steps: [{ explanation: "1/5.", latex: "\\tfrac15" }], finalAnswerLatex: "\\tfrac15" },
  ],
  guidedPractice: [
    ans("y9-ni-g1", "Evaluate 2⁻¹.", "2^{-1}", "1/2", 2, "1/2.", ["1 / 2", "0.5"]),
    ans("y9-ni-g2", "Evaluate 3⁻².", "3^{-2}", "1/9", 2, "1/3² = 1/9.", ["1 / 9"]),
    ans("y9-ni-g3", "Rewrite x⁻¹ with a positive index.", "x^{-1}", "1/x", 2, "1/x.", ["1 / x"]),
    mcq("y9-ni-g4", "a⁻ⁿ equals:", "B", ["−aⁿ", "1/aⁿ", "aⁿ", "0"], 2, "Reciprocal: 1/aⁿ."),
  ],
  independentPractice: [
    ans("y9-ni-i1", "Evaluate 2⁻².", "2^{-2}", "1/4", 2, "1/4.", ["1 / 4", "0.25"]),
    ans("y9-ni-i2", "Evaluate 10⁻¹.", "10^{-1}", "1/10", 2, "1/10.", ["1 / 10", "0.1"]),
    ans("y9-ni-i3", "Evaluate 4⁻¹.", "4^{-1}", "1/4", 2, "1/4.", ["1 / 4", "0.25"]),
    ans("y9-ni-i4", "Rewrite x⁻³ with a positive index.", "x^{-3}", "1/x^3", 2, "1/x³.", ["1/x³", "1 / x^3"]),
    mcq("y9-ni-i5", "2⁻² equals:", "C", ["−4", "4", "1/4", "1/2"], 2, "1/2² = 1/4."),
  ],
  masteryQuiz: [
    ans("y9-ni-m1", "Evaluate 2⁻³.", "2^{-3}", "1/8", 2, "1/8.", ["1 / 8", "0.125"]),
    ans("y9-ni-m2", "Evaluate 5⁻².", "5^{-2}", "1/25", 2, "1/25.", ["1 / 25"]),
    ans("y9-ni-m3", "Evaluate 10⁻².", "10^{-2}", "1/100", 2, "1/100.", ["1 / 100", "0.01"]),
    ans("y9-ni-m4", "Rewrite x⁻⁴ with a positive index.", "x^{-4}", "1/x^4", 2, "1/x⁴.", ["1/x⁴", "1 / x^4"]),
    mcq("y9-ni-m5", "3⁻¹ equals:", "A", ["1/3", "−3", "3", "1/9"], 2, "1/3."),
    ans("y9-ni-m6", "Evaluate 2⁻⁴.", "2^{-4}", "1/16", 2, "1/16.", ["1 / 16"]),
    ans("y9-ni-m7", "Evaluate 6⁻¹.", "6^{-1}", "1/6", 2, "1/6.", ["1 / 6"]),
    ans("y9-ni-m8", "Rewrite a⁻² with a positive index.", "a^{-2}", "1/a^2", 2, "1/a².", ["1/a²", "1 / a^2"]),
    ans("y9-ni-m9", "Evaluate 1⁻⁵.", "1^{-5}", "1", 2, "1/1⁵ = 1.", []),
    mcq("y9-ni-m10", "As the negative index gets bigger, the value gets:", "B", ["bigger", "smaller", "negative", "unchanged"], 3, "Smaller (a smaller fraction)."),
  ],
  masteryQuizPool: [
    ans("y9-ni-p1", "Simplify 2³ × 2⁻⁵ (as a fraction).", "2^3\\times2^{-5}", "1/4", 5, "2⁻² = 1/4.", ["1 / 4", "0.25"]),
    ans("y9-ni-p2", "Simplify x⁵ × x⁻² (positive index).", "x^5\\times x^{-2}", "x^3", 5, "x³.", ["x³"]),
    ans("y9-ni-p3", "Evaluate (2⁻¹)⁻².", "(2^{-1})^{-2}", "4", 5, "2² = 4.", []),
    ans("y9-ni-p4", "Evaluate 4⁻¹ + 2⁻¹ (as a fraction).", "4^{-1}+2^{-1}", "3/4", 5, "1/4 + 1/2 = 3/4.", ["3 / 4", "0.75"]),
    ans("y9-ni-p5", "Simplify x⁻³ × x⁵ (positive index).", "x^{-3}\\times x^5", "x^2", 5, "x².", ["x²"]),
    ans("y9-ni-p6", "Evaluate 3⁻² × 9.", "3^{-2}\\times9", "1", 5, "1/9 × 9 = 1.", []),
    ans("y9-ni-p7", "Evaluate (1/2)⁻¹.", "(1/2)^{-1}", "2", 5, "Reciprocal of 1/2 is 2.", []),
    ans("y9-ni-p8", "Simplify x⁴ ÷ x⁶ (positive index).", "x^4\\div x^6", "1/x^2", 5, "x⁻² = 1/x².", ["1/x²", "1 / x^2"]),
    ans("y9-ni-p9", "Evaluate 5⁻¹ + 5⁰.", "5^{-1}+5^0", "6/5", 5, "1/5 + 1 = 6/5.", ["6 / 5", "1.2"]),
    ans("y9-ni-p10", "Evaluate 2⁻³ + 2⁻³ (as a fraction).", "2^{-3}+2^{-3}", "1/4", 5, "1/8 + 1/8 = 1/4.", ["1 / 4", "0.25"]),
  ],
  commonMistakes: [
    { mistake: "Treating a⁻ⁿ as a negative number.", fix: "It is the reciprocal 1/aⁿ, which is positive." },
    { mistake: "Forgetting to reciprocate.", fix: "2⁻³ = 1/8, not −8." },
    { mistake: "Reciprocating the index instead of the base.", fix: "a⁻ⁿ = 1/(aⁿ)." },
    { mistake: "Errors combining with other laws.", fix: "Add/subtract indices, keeping the sign." },
  ],
  masteryPassMark: 0.8,
};

// ── scientific-notation (core) ─────────────────────────────────────────────────────────
const scientificNotation: Partial<ExplicitLesson> = {
  description: "Write numbers in scientific notation a × 10ⁿ with 1 ≤ a < 10, and convert back.",
  learningIntention: "Convert between ordinary numbers and scientific notation.",
  successCriteria: ["Write large numbers as a × 10ⁿ.", "Write small numbers with a negative power.", "Convert scientific notation back to a number.", "Keep 1 ≤ a < 10."],
  teaching: {
    paragraphs: [
      "SCIENTIFIC NOTATION writes a number as a × 10ⁿ, where a is between 1 and 10 (1 ≤ a < 10) and n is an integer.",
      "For large numbers, n is positive: 3000 = 3 × 10³ and 45000 = 4.5 × 10⁴.",
      "For small numbers, n is negative: 0.002 = 2 × 10⁻³.",
      "To convert back, move the decimal point n places (right for positive n, left for negative).",
    ],
    latexBlocks: ["a \\times 10^n,\\ 1 \\le a < 10", "3000 = 3\\times10^3,\\ 0.002 = 2\\times10^{-3}"],
  },
  workedExamples: [
    { title: "Large number", questionLatex: "\\text{Write } 3000.", steps: [{ explanation: "3 × 10³.", latex: "3\\times10^3" }], finalAnswerLatex: "3\\times10^3" },
    { title: "Decimal a", questionLatex: "\\text{Write } 45000.", steps: [{ explanation: "4.5 × 10⁴.", latex: "4.5\\times10^4" }], finalAnswerLatex: "4.5\\times10^4" },
    { title: "Small number", questionLatex: "\\text{Write } 0.002.", steps: [{ explanation: "2 × 10⁻³.", latex: "2\\times10^{-3}" }], finalAnswerLatex: "2\\times10^{-3}" },
  ],
  guidedPractice: [
    ans("y9-sn-g1", "Write 200 in scientific notation.", "200", "2×10^2", 2, "2 × 10².", sci(2, 2)),
    ans("y9-sn-g2", "Write 5000 in scientific notation.", "5000", "5×10^3", 2, "5 × 10³.", sci(5, 3)),
    ans("y9-sn-g3", "Write 0.03 in scientific notation.", "0.03", "3×10^-2", 3, "3 × 10⁻².", sci(3, -2)),
    mcq("y9-sn-g4", "In scientific notation a × 10ⁿ, the value a is:", "B", ["any number", "between 1 and 10", "always a whole number", "less than 1"], 2, "1 ≤ a < 10."),
  ],
  independentPractice: [
    ans("y9-sn-i1", "Write 60000 in scientific notation.", "60000", "6×10^4", 2, "6 × 10⁴.", sci(6, 4)),
    ans("y9-sn-i2", "Write 720 in scientific notation.", "720", "7.2×10^2", 3, "7.2 × 10².", sci(7.2, 2)),
    ans("y9-sn-i3", "Write 0.0005 in scientific notation.", "0.0005", "5×10^-4", 3, "5 × 10⁻⁴.", sci(5, -4)),
    ans("y9-sn-i4", "Write 1200000 in scientific notation.", "1200000", "1.2×10^6", 3, "1.2 × 10⁶.", sci(1.2, 6)),
    mcq("y9-sn-i5", "0.002 in scientific notation is:", "C", ["2 × 10²", "2 × 10³", "2 × 10⁻³", "2 × 10⁻²"], 2, "Three places → 10⁻³."),
  ],
  masteryQuiz: [
    ans("y9-sn-m1", "Write 3000 in scientific notation.", "3000", "3×10^3", 2, "3 × 10³.", sci(3, 3)),
    ans("y9-sn-m2", "Write 45000 in scientific notation.", "45000", "4.5×10^4", 3, "4.5 × 10⁴.", sci(4.5, 4)),
    ans("y9-sn-m3", "Write 0.002 in scientific notation.", "0.002", "2×10^-3", 3, "2 × 10⁻³.", sci(2, -3)),
    ans("y9-sn-m4", "Write 850 in scientific notation.", "850", "8.5×10^2", 3, "8.5 × 10².", sci(8.5, 2)),
    mcq("y9-sn-m5", "10⁻³ as an ordinary number is:", "A", ["0.001", "0.01", "1000", "−1000"], 2, "0.001."),
    ans("y9-sn-m6", "Write 90000 in scientific notation.", "90000", "9×10^4", 2, "9 × 10⁴.", sci(9, 4)),
    ans("y9-sn-m7", "Write 0.07 in scientific notation.", "0.07", "7×10^-2", 3, "7 × 10⁻².", sci(7, -2)),
    ans("y9-sn-m8", "Write 6300 in scientific notation.", "6300", "6.3×10^3", 3, "6.3 × 10³.", sci(6.3, 3)),
    ans("y9-sn-m9", "Convert 5 × 10³ to an ordinary number.", "5\\times10^3", "5000", 2, "5000.", []),
    mcq("y9-sn-m10", "Which number is written correctly in scientific notation?", "B", ["12 × 10³", "1.2 × 10⁴", "0.5 × 10³", "12.0 × 10²"], 3, "a must satisfy 1 ≤ a < 10."),
  ],
  masteryQuizPool: [
    ans("y9-sn-p1", "Convert 4.5 × 10⁴ to an ordinary number.", "4.5\\times10^4", "45000", 5, "45000.", []),
    ans("y9-sn-p2", "Calculate (2 × 10³) × (3 × 10²) in scientific notation.", "2\\times10^3\\cdot3\\times10^2", "6×10^5", 5, "6 × 10⁵.", sci(6, 5)),
    ans("y9-sn-p3", "Convert 7 × 10⁻³ to an ordinary number.", "7\\times10^{-3}", "0.007", 5, "0.007.", []),
    ans("y9-sn-p4", "Calculate (6 × 10⁵) ÷ (2 × 10²) in scientific notation.", "6\\times10^5\\div2\\times10^2", "3×10^3", 5, "3 × 10³.", sci(3, 3)),
    ans("y9-sn-p5", "Write 0.00045 in scientific notation.", "0.00045", "4.5×10^-4", 5, "4.5 × 10⁻⁴.", sci(4.5, -4)),
    ans("y9-sn-p6", "Convert 3.2 × 10⁻² to an ordinary number.", "3.2\\times10^{-2}", "0.032", 5, "0.032.", []),
    ans("y9-sn-p7", "Calculate (4 × 10³) × (2 × 10⁴) in scientific notation.", "4\\times10^3\\cdot2\\times10^4", "8×10^7", 5, "8 × 10⁷.", sci(8, 7)),
    ans("y9-sn-p8", "Write 95000000 in scientific notation.", "95000000", "9.5×10^7", 5, "9.5 × 10⁷.", sci(9.5, 7)),
    ans("y9-sn-p9", "Convert 1.5 × 10⁶ to an ordinary number.", "1.5\\times10^6", "1500000", 5, "1500000.", []),
    ans("y9-sn-p10", "Calculate (9 × 10⁴) ÷ (3 × 10⁶) in scientific notation.", "9\\times10^4\\div3\\times10^6", "3×10^-2", 5, "3 × 10⁻².", sci(3, -2)),
  ],
  commonMistakes: [
    { mistake: "Leaving a outside 1 ≤ a < 10.", fix: "Adjust so a is between 1 and 10 (e.g. 12×10³ → 1.2×10⁴)." },
    { mistake: "Wrong sign on the power.", fix: "Small numbers use a negative power." },
    { mistake: "Miscounting decimal places.", fix: "Count places carefully to set n." },
    { mistake: "Moving the decimal the wrong way converting back.", fix: "Positive n → right; negative n → left." },
  ],
  masteryPassMark: 0.8,
};

// ── scientific-notation-significant-figures (core) ─────────────────────────────────────
const scientificNotationSigFigs: Partial<ExplicitLesson> = {
  description: "Round numbers to significant figures and write them in scientific notation.",
  learningIntention: "Combine rounding to significant figures with scientific notation.",
  successCriteria: ["Round to a given number of significant figures.", "Express the result as a × 10ⁿ.", "Handle large and small numbers.", "Keep 1 ≤ a < 10."],
  teaching: {
    paragraphs: [
      "Scientific notation is ideal for giving a number to a stated number of SIGNIFICANT FIGURES, because the digits of a carry the significant figures.",
      "3456 to 2 significant figures is 3500 = 3.5 × 10³.",
      "0.004567 to 2 significant figures is 0.0046 = 4.6 × 10⁻³.",
      "89000 to 1 significant figure is 90000 = 9 × 10⁴.",
    ],
    latexBlocks: ["3456 \\to 3.5\\times10^3\\ (2\\text{ s.f.})", "0.004567 \\to 4.6\\times10^{-3}\\ (2\\text{ s.f.})"],
  },
  workedExamples: [
    { title: "Large, 2 s.f.", questionLatex: "3456 \\to 2\\text{ s.f.}", steps: [{ explanation: "3.5 × 10³.", latex: "3.5\\times10^3" }], finalAnswerLatex: "3.5\\times10^3" },
    { title: "Small, 2 s.f.", questionLatex: "0.004567 \\to 2\\text{ s.f.}", steps: [{ explanation: "4.6 × 10⁻³.", latex: "4.6\\times10^{-3}" }], finalAnswerLatex: "4.6\\times10^{-3}" },
    { title: "1 s.f.", questionLatex: "89000 \\to 1\\text{ s.f.}", steps: [{ explanation: "9 × 10⁴.", latex: "9\\times10^4" }], finalAnswerLatex: "9\\times10^4" },
  ],
  guidedPractice: [
    ans("y9-snsf-g1", "Write 1234 to 2 s.f. in scientific notation.", "1234,2sf", "1.2×10^3", 3, "1.2 × 10³.", sci(1.2, 3)),
    ans("y9-snsf-g2", "Write 0.0678 to 2 s.f. in scientific notation.", "0.0678,2sf", "6.8×10^-2", 3, "6.8 × 10⁻².", sci(6.8, -2)),
    ans("y9-snsf-g3", "Write 56789 to 1 s.f. in scientific notation.", "56789,1sf", "6×10^4", 3, "6 × 10⁴.", sci(6, 4)),
    mcq("y9-snsf-g4", "Scientific notation suits significant figures because:", "A", ["the digits of a are the significant figures", "10ⁿ is always 1", "it removes all zeros", "a is always 1"], 3, "a carries the significant figures."),
  ],
  independentPractice: [
    ans("y9-snsf-i1", "Write 4567 to 2 s.f. in scientific notation.", "4567,2sf", "4.6×10^3", 3, "4.6 × 10³.", sci(4.6, 3)),
    ans("y9-snsf-i2", "Write 0.00234 to 2 s.f. in scientific notation.", "0.00234,2sf", "2.3×10^-3", 3, "2.3 × 10⁻³.", sci(2.3, -3)),
    ans("y9-snsf-i3", "Write 78000 to 1 s.f. in scientific notation.", "78000,1sf", "8×10^4", 3, "8 × 10⁴.", sci(8, 4)),
    ans("y9-snsf-i4", "Write 123456 to 3 s.f. in scientific notation.", "123456,3sf", "1.23×10^5", 4, "1.23 × 10⁵.", sci(1.23, 5)),
    mcq("y9-snsf-i5", "346 to 2 s.f. is:", "B", ["3.4 × 10²", "3.5 × 10²", "35 × 10¹", "3.46 × 10²"], 3, "346 → 350 = 3.5 × 10²."),
  ],
  masteryQuiz: [
    ans("y9-snsf-m1", "Write 3456 to 2 s.f. in scientific notation.", "3456,2sf", "3.5×10^3", 3, "3.5 × 10³.", sci(3.5, 3)),
    ans("y9-snsf-m2", "Write 0.004567 to 2 s.f. in scientific notation.", "0.004567,2sf", "4.6×10^-3", 3, "4.6 × 10⁻³.", sci(4.6, -3)),
    ans("y9-snsf-m3", "Write 89000 to 1 s.f. in scientific notation.", "89000,1sf", "9×10^4", 3, "9 × 10⁴.", sci(9, 4)),
    ans("y9-snsf-m4", "Write 6789 to 2 s.f. in scientific notation.", "6789,2sf", "6.8×10^3", 3, "6.8 × 10³.", sci(6.8, 3)),
    mcq("y9-snsf-m5", "0.0452 to 2 s.f. is:", "A", ["4.5 × 10⁻²", "4.5 × 10⁻³", "45 × 10⁻³", "4.52 × 10⁻²"], 3, "4.5 × 10⁻²."),
    ans("y9-snsf-m6", "Write 12345 to 3 s.f. in scientific notation.", "12345,3sf", "1.23×10^4", 4, "1.23 × 10⁴.", sci(1.23, 4)),
    ans("y9-snsf-m7", "Write 0.0789 to 1 s.f. in scientific notation.", "0.0789,1sf", "8×10^-2", 3, "8 × 10⁻².", sci(8, -2)),
    ans("y9-snsf-m8", "Write 950 to 2 s.f. in scientific notation.", "950,2sf", "9.5×10^2", 3, "9.5 × 10².", sci(9.5, 2)),
    ans("y9-snsf-m9", "Write 0.00671 to 2 s.f. in scientific notation.", "0.00671,2sf", "6.7×10^-3", 3, "6.7 × 10⁻³.", sci(6.7, -3)),
    mcq("y9-snsf-m10", "Rounding 9.96 × 10³ already to 2 s.f. needs care because it becomes:", "C", ["9.9 × 10³", "9.96 × 10³", "1.0 × 10⁴", "10 × 10³"], 4, "9.96 → 10.0, rewritten as 1.0 × 10⁴."),
  ],
  masteryQuizPool: [
    ans("y9-snsf-p1", "Write 9960 to 2 s.f. in scientific notation.", "9960,2sf", "1.0×10^4", 5, "9960 → 10000 = 1.0 × 10⁴.", ["1×10^4", ...sci(1, 4)]),
    ans("y9-snsf-p2", "Write 0.009951 to 2 s.f. in scientific notation.", "0.009951,2sf", "1.0×10^-2", 5, "→ 0.010 = 1.0 × 10⁻².", ["1×10^-2", ...sci(1, -2)]),
    ans("y9-snsf-p3", "Write 1499 to 2 s.f. in scientific notation.", "1499,2sf", "1.5×10^3", 5, "1499 → 1500 = 1.5 × 10³.", sci(1.5, 3)),
    ans("y9-snsf-p4", "Write 0.04953 to 3 s.f. in scientific notation.", "0.04953,3sf", "4.95×10^-2", 5, "4.95 × 10⁻².", sci(4.95, -2)),
    ans("y9-snsf-p5", "Write 749000 to 1 s.f. in scientific notation.", "749000,1sf", "7×10^5", 5, "7 × 10⁵.", sci(7, 5)),
    ans("y9-snsf-p6", "Write 0.0006501 to 2 s.f. in scientific notation.", "0.0006501,2sf", "6.5×10^-4", 5, "6.5 × 10⁻⁴.", sci(6.5, -4)),
    ans("y9-snsf-p7", "Write 25500 to 2 s.f. in scientific notation.", "25500,2sf", "2.6×10^4", 5, "25500 → 26000 = 2.6 × 10⁴.", sci(2.6, 4)),
    ans("y9-snsf-p8", "Write 0.003299 to 3 s.f. in scientific notation.", "0.003299,3sf", "3.30×10^-3", 5, "3.30 × 10⁻³.", ["3.3×10^-3", ...sci(3.3, -3)]),
    ans("y9-snsf-p9", "Write 8245 to 3 s.f. in scientific notation.", "8245,3sf", "8.25×10^3", 5, "8.25 × 10³ (5 rounds up).", sci(8.25, 3)),
    ans("y9-snsf-p10", "Write 0.09996 to 2 s.f. in scientific notation.", "0.09996,2sf", "1.0×10^-1", 5, "→ 0.10 = 1.0 × 10⁻¹.", ["1×10^-1", ...sci(1, -1)]),
  ],
  commonMistakes: [
    { mistake: "Counting leading zeros as significant.", fix: "Significant figures start at the first non-zero digit." },
    { mistake: "Leaving a outside 1 ≤ a < 10 after rounding.", fix: "9960 → 1.0 × 10⁴, not 10 × 10³." },
    { mistake: "Wrong power after rounding up a 9.", fix: "A carry can change the power (9.96 → 1.0 × 10⁴)." },
    { mistake: "Dropping a significant trailing zero.", fix: "Keep it (e.g. 1.0 × 10⁻²)." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "negative-indices": negativeIndices,
  "scientific-notation": scientificNotation,
  "scientific-notation-significant-figures": scientificNotationSigFigs,
};

export function year9Chapter6ScientificNotationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "indices-surds") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
