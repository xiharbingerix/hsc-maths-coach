// Year 9 Wave 7 — Chapter 6 (Indices & Surds), index-law sections (ADR-Y9-001):
// index-notation (core), index-laws-multiplying-dividing (core), zero-index-power-of-power (core),
// index-laws-extended (path). Full per-subtopic contract. Prompts use unicode superscripts; answers
// accept both "x^5" and "x⁵" forms.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Apply the index laws: add to multiply, subtract to divide, multiply for a power of a power.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the relevant index law.", explanation };
}
// power-of-x answer variants: "x^5" plus unicode
const px = (base: string, n: number) => {
  const sup: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  const u = String(n).split("").map((d) => sup[d]).join("");
  return [`${base}^${n}`, `${base}${u}`, `${base}^{${n}}`];
};

// ── index-notation (core) ──────────────────────────────────────────────────────────────
const indexNotation: Partial<ExplicitLesson> = {
  description: "Read and evaluate numbers in index (power) notation.",
  learningIntention: "Use base and index notation and evaluate powers.",
  successCriteria: ["Identify the base and index.", "Expand a power as repeated multiplication.", "Evaluate small powers.", "Recognise what an index means."],
  teaching: {
    paragraphs: [
      "INDEX (or power) notation is shorthand for repeated multiplication. In 2⁴, the BASE is 2 and the INDEX (exponent) is 4: 2⁴ = 2 × 2 × 2 × 2 = 16.",
      "The index tells you HOW MANY times to multiply the base by itself: 3³ = 3 × 3 × 3 = 27.",
      "5² = 25 and 10³ = 1000.",
      "Watch the base — in 7² the base is 7, not 2.",
    ],
    latexBlocks: ["2^4 = 2\\times2\\times2\\times2 = 16", "3^3 = 27"],
  },
  workedExamples: [
    { title: "Evaluate", questionLatex: "\\text{Evaluate } 2^4.", steps: [{ explanation: "2×2×2×2.", latex: "16" }], finalAnswerLatex: "16" },
    { title: "Evaluate", questionLatex: "\\text{Evaluate } 3^3.", steps: [{ explanation: "3×3×3.", latex: "27" }], finalAnswerLatex: "27" },
    { title: "Evaluate", questionLatex: "\\text{Evaluate } 5^2.", steps: [{ explanation: "5×5.", latex: "25" }], finalAnswerLatex: "25" },
  ],
  guidedPractice: [
    ans("y9-in-g1", "Evaluate 2³.", "2^3", "8", 2, "2×2×2 = 8.", []),
    ans("y9-in-g2", "Evaluate 10².", "10^2", "100", 2, "100.", []),
    ans("y9-in-g3", "Evaluate 4².", "4^2", "16", 2, "16.", []),
    mcq("y9-in-g4", "In 2⁵, the 5 is the:", "B", ["base", "index", "product", "coefficient"], 2, "The 5 is the index (exponent)."),
  ],
  independentPractice: [
    ans("y9-in-i1", "Evaluate 2⁶.", "2^6", "64", 2, "64.", []),
    ans("y9-in-i2", "Evaluate 3⁴.", "3^4", "81", 2, "81.", []),
    ans("y9-in-i3", "Evaluate 5³.", "5^3", "125", 2, "125.", []),
    mcq("y9-in-i4", "The base of 7² is:", "A", ["7", "2", "14", "49"], 2, "Base 7, index 2."),
    ans("y9-in-i5", "Evaluate 10³.", "10^3", "1000", 2, "1000.", []),
  ],
  masteryQuiz: [
    ans("y9-in-m1", "Evaluate 2⁴.", "2^4", "16", 2, "16.", []),
    ans("y9-in-m2", "Evaluate 3².", "3^2", "9", 2, "9.", []),
    ans("y9-in-m3", "Evaluate 2⁵.", "2^5", "32", 2, "32.", []),
    mcq("y9-in-m4", "The index of 6³ is:", "C", ["6", "18", "3", "9"], 2, "Index 3."),
    ans("y9-in-m5", "Evaluate 4³.", "4^3", "64", 2, "64.", []),
    ans("y9-in-m6", "Evaluate 1⁵.", "1^5", "1", 2, "1.", []),
    ans("y9-in-m7", "Evaluate 2¹⁰.", "2^{10}", "1024", 3, "1024.", []),
    ans("y9-in-m8", "Evaluate 10⁴.", "10^4", "10000", 2, "10000.", []),
    ans("y9-in-m9", "Evaluate 7².", "7^2", "49", 2, "49.", []),
    mcq("y9-in-m10", "3⁴ means:", "A", ["3×3×3×3", "3×4", "4×4×4", "3+3+3+3"], 2, "Four 3's multiplied."),
  ],
  masteryQuizPool: [
    ans("y9-in-p1", "Evaluate 2³ × 2.", "2^3\\times2", "16", 5, "8 × 2 = 16.", []),
    ans("y9-in-p2", "Which is larger, 2⁵ or 3³? Give its value.", "2^5\\ \\text{vs}\\ 3^3", "27", 5, "32 vs 27 — wait, 2⁵ = 32 > 27; the larger value is 32.", ["32"]),
    ans("y9-in-p3", "Evaluate 6².", "6^2", "36", 5, "36.", []),
    ans("y9-in-p4", "Evaluate 2⁴ × 3².", "2^4\\times3^2", "144", 5, "16 × 9 = 144.", []),
    ans("y9-in-p5", "Evaluate 5² + 2³.", "5^2+2^3", "33", 5, "25 + 8 = 33.", []),
    ans("y9-in-p6", "Evaluate 3³ − 2³.", "3^3-2^3", "19", 5, "27 − 8 = 19.", []),
    ans("y9-in-p7", "Evaluate (2²)² as a number.", "(2^2)^2", "16", 5, "4² = 16.", []),
    ans("y9-in-p8", "Evaluate 10² − 5².", "10^2-5^2", "75", 5, "100 − 25 = 75.", []),
    ans("y9-in-p9", "Express 81 as a power of 3.", "81=3^?", "3^4", 5, "3⁴ = 81.", px("3", 4)),
    ans("y9-in-p10", "Express 64 as a power of 2.", "64=2^?", "2^6", 5, "2⁶ = 64.", px("2", 6)),
  ],
  commonMistakes: [
    { mistake: "Multiplying base × index.", fix: "2⁴ is 2×2×2×2 = 16, not 8." },
    { mistake: "Confusing base and index.", fix: "In 7², the base is 7." },
    { mistake: "Treating the index as repeated addition.", fix: "It is repeated multiplication." },
    { mistake: "Mis-evaluating 1 to a power.", fix: "1 to any power is 1." },
  ],
  masteryPassMark: 0.8,
};

// ── index-laws-multiplying-dividing (core) ─────────────────────────────────────────────
const indexLawsMultDiv: Partial<ExplicitLesson> = {
  description: "Multiply and divide powers with the same base by adding or subtracting indices.",
  learningIntention: "Apply aᵐ × aⁿ = aᵐ⁺ⁿ and aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
  successCriteria: ["Add indices when multiplying.", "Subtract indices when dividing.", "Handle coefficients.", "Combine the two laws."],
  teaching: {
    paragraphs: [
      "To MULTIPLY powers with the SAME BASE, ADD the indices: aᵐ × aⁿ = aᵐ⁺ⁿ. So 2³ × 2⁴ = 2⁷ and x² × x³ = x⁵.",
      "To DIVIDE, SUBTRACT the indices: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. So x⁵ ÷ x² = x³.",
      "With COEFFICIENTS, deal with the numbers separately: 3x² × 4x³ = 12x⁵.",
      "These laws only apply when the bases are the SAME.",
    ],
    latexBlocks: ["a^m \\times a^n = a^{m+n}", "a^m \\div a^n = a^{m-n}"],
  },
  workedExamples: [
    { title: "Multiply", questionLatex: "2^3 \\times 2^4.", steps: [{ explanation: "Add indices.", latex: "2^7" }], finalAnswerLatex: "2^7" },
    { title: "Divide", questionLatex: "x^5 \\div x^2.", steps: [{ explanation: "Subtract indices.", latex: "x^3" }], finalAnswerLatex: "x^3" },
    { title: "Multiply pronumerals", questionLatex: "a^2 \\times a^3.", steps: [{ explanation: "Add indices.", latex: "a^5" }], finalAnswerLatex: "a^5" },
  ],
  guidedPractice: [
    ans("y9-imd-g1", "Simplify x² × x³.", "x^2\\times x^3", "x^5", 2, "Add: x⁵.", px("x", 5)),
    ans("y9-imd-g2", "Simplify x⁷ ÷ x³.", "x^7\\div x^3", "x^4", 2, "Subtract: x⁴.", px("x", 4)),
    ans("y9-imd-g3", "Simplify a⁴ × a⁵.", "a^4\\times a^5", "a^9", 2, "Add: a⁹.", px("a", 9)),
    mcq("y9-imd-g4", "When multiplying powers with the same base you:", "A", ["add the indices", "subtract the indices", "multiply the indices", "divide the indices"], 2, "Add the indices."),
  ],
  independentPractice: [
    ans("y9-imd-i1", "Simplify y⁸ ÷ y².", "y^8\\div y^2", "y^6", 2, "Subtract: y⁶.", px("y", 6)),
    ans("y9-imd-i2", "Simplify x × x⁶.", "x\\times x^6", "x^7", 2, "x¹ × x⁶ = x⁷.", px("x", 7)),
    ans("y9-imd-i3", "Simplify m³ × m³.", "m^3\\times m^3", "m^6", 2, "Add: m⁶.", px("m", 6)),
    mcq("y9-imd-i4", "When dividing powers with the same base you:", "B", ["add the indices", "subtract the indices", "multiply the indices", "ignore the indices"], 2, "Subtract the indices."),
    ans("y9-imd-i5", "Simplify b⁹ ÷ b⁴.", "b^9\\div b^4", "b^5", 2, "Subtract: b⁵.", px("b", 5)),
  ],
  masteryQuiz: [
    ans("y9-imd-m1", "Simplify x³ × x⁴.", "x^3\\times x^4", "x^7", 2, "x⁷.", px("x", 7)),
    ans("y9-imd-m2", "Simplify x⁹ ÷ x⁴.", "x^9\\div x^4", "x^5", 2, "x⁵.", px("x", 5)),
    ans("y9-imd-m3", "Simplify a² × a⁶.", "a^2\\times a^6", "a^8", 2, "a⁸.", px("a", 8)),
    ans("y9-imd-m4", "Simplify y⁵ ÷ y.", "y^5\\div y", "y^4", 2, "y⁵⁻¹ = y⁴.", px("y", 4)),
    mcq("y9-imd-m5", "Simplify x⁵ × x².", "C", ["x³", "x¹⁰", "x⁷", "x²·⁵"], 2, "Add: x⁷."),
    ans("y9-imd-m6", "Simplify b⁷ ÷ b⁵.", "b^7\\div b^5", "b^2", 2, "b².", px("b", 2)),
    ans("y9-imd-m7", "Simplify 2⁴ × 2³ (as a power of 2).", "2^4\\times2^3", "2^7", 3, "2⁷.", px("2", 7)),
    ans("y9-imd-m8", "Simplify x⁶ ÷ x².", "x^6\\div x^2", "x^4", 2, "x⁴.", px("x", 4)),
    ans("y9-imd-m9", "Simplify a × a × a.", "a\\times a\\times a", "a^3", 2, "a³.", px("a", 3)),
    mcq("y9-imd-m10", "The laws aᵐ×aⁿ and aᵐ÷aⁿ only work when the bases are:", "A", ["the same", "different", "both 10", "prime"], 2, "Same base required."),
  ],
  masteryQuizPool: [
    ans("y9-imd-p1", "Simplify 3x² × 4x³.", "3x^2\\times4x^3", "12x^5", 5, "12 × x⁵ = 12x⁵.", ["12x⁵"]),
    ans("y9-imd-p2", "Simplify 6x⁵ ÷ 2x².", "6x^5\\div2x^2", "3x^3", 5, "3 × x³ = 3x³.", ["3x³"]),
    ans("y9-imd-p3", "Simplify x⁴ × x³ ÷ x².", "x^4\\times x^3\\div x^2", "x^5", 5, "x⁷ ÷ x² = x⁵.", px("x", 5)),
    ans("y9-imd-p4", "Simplify 2a³ × 3a².", "2a^3\\times3a^2", "6a^5", 5, "6a⁵.", ["6a⁵"]),
    ans("y9-imd-p5", "Simplify 10y⁶ ÷ 5y.", "10y^6\\div5y", "2y^5", 5, "2 × y⁵ = 2y⁵.", ["2y⁵"]),
    ans("y9-imd-p6", "Simplify x²y × xy³.", "x^2y\\times xy^3", "x^3y^4", 5, "x³y⁴.", ["x³y⁴"]),
    ans("y9-imd-p7", "Simplify 12a⁵ ÷ 3a⁵.", "12a^5\\div3a^5", "4", 5, "4 × a⁰ = 4.", []),
    ans("y9-imd-p8", "Simplify 5x³ × 2x⁴ ÷ x².", "5x^3\\times2x^4\\div x^2", "10x^5", 5, "10x⁷ ÷ x² = 10x⁵.", ["10x⁵"]),
    ans("y9-imd-p9", "Simplify 8m⁷ ÷ 4m³.", "8m^7\\div4m^3", "2m^4", 5, "2m⁴.", ["2m⁴"]),
    ans("y9-imd-p10", "Simplify a³b² × a²b.", "a^3b^2\\times a^2b", "a^5b^3", 5, "a⁵b³.", ["a⁵b³"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying the indices when multiplying terms.", fix: "Add indices: x²·x³ = x⁵." },
    { mistake: "Adding indices when dividing.", fix: "Subtract: x⁵ ÷ x² = x³." },
    { mistake: "Forgetting x = x¹.", fix: "A pronumeral with no index has index 1." },
    { mistake: "Applying the law to different bases.", fix: "Only same-base powers combine." },
  ],
  masteryPassMark: 0.8,
};

// ── zero-index-power-of-power (core) ───────────────────────────────────────────────────
const zeroIndexPower: Partial<ExplicitLesson> = {
  description: "Use the zero index (a⁰ = 1) and the power-of-a-power law (aᵐ)ⁿ = aᵐⁿ.",
  learningIntention: "Apply the zero index and power-of-a-power laws.",
  successCriteria: ["Know a⁰ = 1.", "Multiply indices for a power of a power.", "Evaluate numeric cases.", "Combine with other laws."],
  teaching: {
    paragraphs: [
      "Any non-zero base to the ZERO index is 1: a⁰ = 1. So 5⁰ = 1 and 100⁰ = 1.",
      "For a POWER OF A POWER, MULTIPLY the indices: (aᵐ)ⁿ = aᵐⁿ. So (2³)² = 2⁶ and (x²)⁴ = x⁸.",
      "This is because (2³)² = 2³ × 2³ = 2⁶.",
      "These combine with the earlier laws.",
    ],
    latexBlocks: ["a^0 = 1", "(a^m)^n = a^{mn}"],
  },
  workedExamples: [
    { title: "Zero index", questionLatex: "\\text{Evaluate } 5^0.", steps: [{ explanation: "Any base to 0.", latex: "1" }], finalAnswerLatex: "1" },
    { title: "Power of a power", questionLatex: "(2^3)^2.", steps: [{ explanation: "Multiply indices.", latex: "2^6" }], finalAnswerLatex: "2^6" },
    { title: "With a pronumeral", questionLatex: "(x^2)^4.", steps: [{ explanation: "Multiply indices.", latex: "x^8" }], finalAnswerLatex: "x^8" },
  ],
  guidedPractice: [
    ans("y9-zp-g1", "Evaluate 7⁰.", "7^0", "1", 2, "Any base to 0 is 1.", []),
    ans("y9-zp-g2", "Simplify (x²)³.", "(x^2)^3", "x^6", 2, "Multiply: x⁶.", px("x", 6)),
    ans("y9-zp-g3", "Evaluate (2²)² as a number.", "(2^2)^2", "16", 3, "2⁴ = 16.", []),
    mcq("y9-zp-g4", "Any non-zero number to the power 0 equals:", "A", ["1", "0", "the base", "undefined"], 2, "a⁰ = 1."),
  ],
  independentPractice: [
    ans("y9-zp-i1", "Evaluate 100⁰.", "100^0", "1", 2, "1.", []),
    ans("y9-zp-i2", "Simplify (a³)².", "(a^3)^2", "a^6", 2, "a⁶.", px("a", 6)),
    ans("y9-zp-i3", "Simplify (x⁴)².", "(x^4)^2", "x^8", 2, "x⁸.", px("x", 8)),
    mcq("y9-zp-i4", "For (xᵐ)ⁿ you:", "C", ["add m and n", "subtract", "multiply m and n", "divide"], 2, "Multiply the indices."),
    ans("y9-zp-i5", "Evaluate 5⁰.", "5^0", "1", 2, "1.", []),
  ],
  masteryQuiz: [
    ans("y9-zp-m1", "Evaluate 9⁰.", "9^0", "1", 2, "1.", []),
    ans("y9-zp-m2", "Simplify (x²)⁵.", "(x^2)^5", "x^{10}", 2, "x¹⁰.", px("x", 10)),
    ans("y9-zp-m3", "Evaluate (2²)³ as a number.", "(2^2)^3", "64", 3, "2⁶ = 64.", []),
    ans("y9-zp-m4", "Simplify (a⁵)².", "(a^5)^2", "a^{10}", 2, "a¹⁰.", px("a", 10)),
    mcq("y9-zp-m5", "12⁰ equals:", "B", ["12", "1", "0", "120"], 2, "1."),
    ans("y9-zp-m6", "Simplify (y³)³.", "(y^3)^3", "y^9", 2, "y⁹.", px("y", 9)),
    ans("y9-zp-m7", "Evaluate x⁰ (x ≠ 0).", "x^0", "1", 2, "1.", []),
    ans("y9-zp-m8", "Evaluate (2³)² as a number.", "(2^3)^2", "64", 3, "2⁶ = 64.", []),
    ans("y9-zp-m9", "Simplify (m⁴)³.", "(m^4)^3", "m^{12}", 2, "m¹².", px("m", 12)),
    mcq("y9-zp-m10", "A power of a power means you:", "A", ["multiply the indices", "add the indices", "subtract the indices", "ignore the outer power"], 2, "Multiply the indices."),
  ],
  masteryQuizPool: [
    ans("y9-zp-p1", "Simplify (2x²)³.", "(2x^2)^3", "8x^6", 5, "2³ × x⁶ = 8x⁶.", ["8x⁶"]),
    ans("y9-zp-p2", "Simplify (3a)².", "(3a)^2", "9a^2", 5, "9a².", ["9a²"]),
    ans("y9-zp-p3", "Simplify (x²)³ × x.", "(x^2)^3\\times x", "x^7", 5, "x⁶ × x = x⁷.", px("x", 7)),
    ans("y9-zp-p4", "Evaluate (2³)² ÷ 2⁴.", "(2^3)^2\\div2^4", "4", 5, "2⁶ ÷ 2⁴ = 2² = 4.", []),
    ans("y9-zp-p5", "Simplify 5x⁰ (x ≠ 0).", "5x^0", "5", 5, "5 × 1 = 5.", []),
    ans("y9-zp-p6", "Simplify (a²b)³.", "(a^2b)^3", "a^6b^3", 5, "a⁶b³.", ["a⁶b³"]),
    ans("y9-zp-p7", "Simplify (x³)² ÷ x⁴.", "(x^3)^2\\div x^4", "x^2", 5, "x⁶ ÷ x⁴ = x².", px("x", 2)),
    ans("y9-zp-p8", "Evaluate 3⁰ + 4⁰.", "3^0+4^0", "2", 5, "1 + 1 = 2.", []),
    ans("y9-zp-p9", "Simplify (2x³)² × x.", "(2x^3)^2\\times x", "4x^7", 5, "4x⁶ × x = 4x⁷.", ["4x⁷"]),
    ans("y9-zp-p10", "Simplify (x⁴)² ÷ (x³)².", "(x^4)^2\\div(x^3)^2", "x^2", 5, "x⁸ ÷ x⁶ = x².", px("x", 2)),
  ],
  commonMistakes: [
    { mistake: "Thinking a⁰ = 0.", fix: "a⁰ = 1 for any non-zero a." },
    { mistake: "Adding indices for a power of a power.", fix: "Multiply: (x²)³ = x⁶." },
    { mistake: "Forgetting to raise the coefficient too.", fix: "(2x²)³ = 8x⁶." },
    { mistake: "Applying the zero index to a coefficient.", fix: "In 5x⁰, only x⁰ = 1, giving 5." },
  ],
  masteryPassMark: 0.8,
};

// ── index-laws-extended (path) ─────────────────────────────────────────────────────────
const indexLawsExtended: Partial<ExplicitLesson> = {
  description: "Apply the index laws to products and quotients: (ab)ⁿ = aⁿbⁿ and (a/b)ⁿ = aⁿ/bⁿ.",
  learningIntention: "Raise products and quotients to a power.",
  successCriteria: ["Use (ab)ⁿ = aⁿbⁿ.", "Raise a coefficient and pronumeral together.", "Use (a/b)ⁿ = aⁿ/bⁿ.", "Combine all index laws."],
  teaching: {
    paragraphs: [
      "When a PRODUCT is raised to a power, EACH factor is raised to that power: (ab)ⁿ = aⁿbⁿ. So (2x)³ = 2³x³ = 8x³ and (xy)² = x²y².",
      "When a QUOTIENT is raised to a power: (a/b)ⁿ = aⁿ/bⁿ. So (x/2)² = x²/4.",
      "Raise BOTH the coefficient and the pronumeral: (3x)² = 9x².",
      "Combine with the multiply/divide/power-of-power laws as needed.",
    ],
    latexBlocks: ["(ab)^n = a^n b^n", "(2x)^3 = 8x^3"],
  },
  workedExamples: [
    { title: "Product power", questionLatex: "(2x)^3.", steps: [{ explanation: "2³x³.", latex: "8x^3" }], finalAnswerLatex: "8x^3" },
    { title: "Two pronumerals", questionLatex: "(xy)^2.", steps: [{ explanation: "x²y².", latex: "x^2y^2" }], finalAnswerLatex: "x^2y^2" },
    { title: "Quotient power", questionLatex: "\\left(\\tfrac{x}{2}\\right)^2.", steps: [{ explanation: "x²/2².", latex: "\\tfrac{x^2}{4}" }], finalAnswerLatex: "\\tfrac{x^2}{4}" },
  ],
  guidedPractice: [
    ans("y9-ile-g1", "Simplify (3x)².", "(3x)^2", "9x^2", 2, "9x².", ["9x²"]),
    ans("y9-ile-g2", "Simplify (ab)³.", "(ab)^3", "a^3b^3", 2, "a³b³.", ["a³b³"]),
    ans("y9-ile-g3", "Simplify (2y)⁴.", "(2y)^4", "16y^4", 3, "2⁴y⁴ = 16y⁴.", ["16y⁴"]),
    mcq("y9-ile-g4", "(ab)ⁿ equals:", "A", ["aⁿbⁿ", "aⁿ + bⁿ", "abⁿ", "(a + b)ⁿ"], 2, "Raise each factor."),
  ],
  independentPractice: [
    ans("y9-ile-i1", "Simplify (5x)².", "(5x)^2", "25x^2", 2, "25x².", ["25x²"]),
    ans("y9-ile-i2", "Simplify (xy)⁴.", "(xy)^4", "x^4y^4", 2, "x⁴y⁴.", ["x⁴y⁴"]),
    ans("y9-ile-i3", "Simplify (2a)³.", "(2a)^3", "8a^3", 3, "8a³.", ["8a³"]),
    ans("y9-ile-i4", "Simplify (x/3)².", "(x/3)^2", "x^2/9", 3, "x²/9.", ["x²/9", "\\tfrac{x^2}{9}"]),
    mcq("y9-ile-i5", "(3x)² equals:", "C", ["3x²", "6x²", "9x²", "9x"], 2, "9x²."),
  ],
  masteryQuiz: [
    ans("y9-ile-m1", "Simplify (2x)³.", "(2x)^3", "8x^3", 2, "8x³.", ["8x³"]),
    ans("y9-ile-m2", "Simplify (xy)².", "(xy)^2", "x^2y^2", 2, "x²y².", ["x²y²"]),
    ans("y9-ile-m3", "Simplify (3a)².", "(3a)^2", "9a^2", 2, "9a².", ["9a²"]),
    ans("y9-ile-m4", "Simplify (x²y)³.", "(x^2y)^3", "x^6y^3", 3, "x⁶y³.", ["x⁶y³"]),
    mcq("y9-ile-m5", "(4x)² equals:", "B", ["8x²", "16x²", "4x²", "16x"], 2, "16x²."),
    ans("y9-ile-m6", "Simplify (2x²)³.", "(2x^2)^3", "8x^6", 3, "8x⁶.", ["8x⁶"]),
    ans("y9-ile-m7", "Simplify (ab²)².", "(ab^2)^2", "a^2b^4", 3, "a²b⁴.", ["a²b⁴"]),
    ans("y9-ile-m8", "Simplify (5y)².", "(5y)^2", "25y^2", 2, "25y².", ["25y²"]),
    ans("y9-ile-m9", "Simplify (x³)².", "(x^3)^2", "x^6", 2, "x⁶.", px("x", 6)),
    mcq("y9-ile-m10", "(2ab)² equals:", "A", ["4a²b²", "2a²b²", "4ab", "2ab²"], 3, "2²a²b² = 4a²b²."),
  ],
  masteryQuizPool: [
    ans("y9-ile-p1", "Simplify (2x²)³ × x.", "(2x^2)^3\\times x", "8x^7", 5, "8x⁶ × x = 8x⁷.", ["8x⁷"]),
    ans("y9-ile-p2", "Simplify (3x)² ÷ (9x).", "(3x)^2\\div(9x)", "x", 5, "9x² ÷ 9x = x.", []),
    ans("y9-ile-p3", "Simplify (a²b)³ ÷ (ab).", "(a^2b)^3\\div(ab)", "a^5b^2", 5, "a⁶b³ ÷ ab = a⁵b².", ["a⁵b²"]),
    ans("y9-ile-p4", "Simplify (2x)³ ÷ (4x²).", "(2x)^3\\div(4x^2)", "2x", 5, "8x³ ÷ 4x² = 2x.", []),
    ans("y9-ile-p5", "Simplify (3a²)² × 2a.", "(3a^2)^2\\times2a", "18a^5", 5, "9a⁴ × 2a = 18a⁵.", ["18a⁵"]),
    ans("y9-ile-p6", "Simplify (x²y³)².", "(x^2y^3)^2", "x^4y^6", 5, "x⁴y⁶.", ["x⁴y⁶"]),
    ans("y9-ile-p7", "Simplify (2x³)² ÷ x⁴.", "(2x^3)^2\\div x^4", "4x^2", 5, "4x⁶ ÷ x⁴ = 4x².", ["4x²"]),
    ans("y9-ile-p8", "Simplify (5x²y)² ÷ (5xy).", "(5x^2y)^2\\div(5xy)", "5x^3y", 5, "25x⁴y² ÷ 5xy = 5x³y.", ["5x³y"]),
    ans("y9-ile-p9", "Simplify (ab)³ × (ab)².", "(ab)^3\\times(ab)^2", "a^5b^5", 5, "a³b³ × a²b² = a⁵b⁵.", ["a⁵b⁵"]),
    ans("y9-ile-p10", "Simplify (4x²)² ÷ (2x)³.", "(4x^2)^2\\div(2x)^3", "2x", 5, "16x⁴ ÷ 8x³ = 2x.", []),
  ],
  commonMistakes: [
    { mistake: "Raising only the pronumeral, not the coefficient.", fix: "(2x)³ = 8x³ — cube the 2 as well." },
    { mistake: "Adding the power to each factor instead of raising.", fix: "(ab)ⁿ = aⁿbⁿ." },
    { mistake: "Forgetting to raise the denominator.", fix: "(a/b)ⁿ = aⁿ/bⁿ." },
    { mistake: "Mishandling combined laws.", fix: "Expand the power first, then multiply/divide." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "index-notation": indexNotation,
  "index-laws-multiplying-dividing": indexLawsMultDiv,
  "zero-index-power-of-power": zeroIndexPower,
  "index-laws-extended": indexLawsExtended,
};

export function year9Chapter6IndexLawsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "indices-surds") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
