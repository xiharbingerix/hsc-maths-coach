// Year 10 restructure — Wave 2 (Indices, Surds & Measurement). Authors hidden interim stubs in
//   Unit 3 (indices-exponentials-logarithms): review-index-laws, negative-indices,
//     scientific-notation-y10, fractional-indices, exponential-equations  [3A-3E]
//   Unit 4 (measurement-and-surds): irrational-numbers-surds, adding-subtracting-surds,
//     multiplying-dividing-surds, rationalising-denominator, review-of-length, pythagoras-3d,
//     area-triangles-quads-circles-sectors, accuracy-measuring-instruments  [4A-4H]
// The exponential-growth/logarithm strand (3G,3H-3K) is deferred to a later wave.
// Architecture untouched. Surd-FORM answers use MCQ (markability); integer/decimal answers are
// typed. Y10 audit requires 3 worked examples + 4 commonMistakes + 4/5/10 + masteryPassMark 0.8.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Identify the rule, then apply it step by step.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Apply the rule, then check each option.", explanation };
}

// ── 3A Review of Index Laws (core) ─────────────────────────────────────────────────────
const reviewIndexLaws: Partial<ExplicitLesson> = {
  description: "Apply the index laws for multiplying, dividing and raising powers, and the zero index.",
  learningIntention: "Use the index laws to simplify expressions involving powers with the same base.",
  successCriteria: ["Add indices when multiplying powers of the same base.", "Subtract indices when dividing powers of the same base.", "Multiply indices when raising a power to a power.", "Apply the zero-index rule a⁰ = 1."],
  teaching: {
    paragraphs: [
      "An index (power) tells you how many times a base is multiplied by itself: 2³ = 2 × 2 × 2. The index laws are shortcuts that come straight from this meaning, so you never have to write the multiplication out.",
      "Multiplying powers of the SAME base: add the indices, aᵐ × aⁿ = aᵐ⁺ⁿ. For example 2³ × 2⁴ = 2⁷, because you are multiplying seven 2s together.",
      "Dividing powers of the same base: subtract the indices, aᵐ ÷ aⁿ = aᵐ⁻ⁿ (the bottom factors cancel). Raising a power to a power: multiply the indices, (aᵐ)ⁿ = aᵐⁿ.",
      "Anything (except 0) to the power 0 equals 1: a⁰ = 1. This follows from dividing, since aⁿ ÷ aⁿ = aⁿ⁻ⁿ = a⁰ and also equals 1. The laws only combine powers with the SAME base.",
    ],
    latexBlocks: ["a^m \\times a^n = a^{m+n}", "a^m \\div a^n = a^{m-n},\\qquad (a^m)^n = a^{mn}", "a^0 = 1\\ (a \\ne 0)"],
  },
  workedExamples: [
    { title: "Multiplying powers", questionLatex: "\\text{Simplify } 2^3 \\times 2^4.", steps: [{ explanation: "Same base, so add the indices.", latex: "2^{3+4} = 2^7" }], finalAnswerLatex: "2^7" },
    { title: "Dividing powers", questionLatex: "\\text{Simplify } x^5 \\div x^2.", steps: [{ explanation: "Same base, so subtract the indices.", latex: "x^{5-2} = x^3" }], finalAnswerLatex: "x^3" },
    { title: "Power of a power", questionLatex: "\\text{Simplify } (x^2)^3.", steps: [{ explanation: "Multiply the indices.", latex: "x^{2\\times 3} = x^6" }], finalAnswerLatex: "x^6" },
  ],
  guidedPractice: [
    mcq("y10-ril-g1", "Simplify 2³ × 2².", "A", ["$2^5$", "$2^6$", "$4^5$", "$2^1$"], 2, "Same base: add indices, 3 + 2 = 5, giving 2⁵. The base stays 2 (not 4)."),
    ans("y10-ril-g2", "Simplify x⁴ × x³ (give your answer as a power of x).", "x^4 \\times x^3", "x^7", 2, "Add the indices: 4 + 3 = 7, so x⁷.", ["x7", "x^{7}"]),
    ans("y10-ril-g3", "Simplify x⁶ ÷ x² (give your answer as a power of x).", "x^6 \\div x^2", "x^4", 2, "Subtract the indices: 6 − 2 = 4, so x⁴.", ["x4", "x^{4}"]),
    ans("y10-ril-g4", "Simplify (x³)² (give your answer as a power of x).", "(x^3)^2", "x^6", 2, "Multiply the indices: 3 × 2 = 6, so x⁶.", ["x6", "x^{6}"]),
  ],
  independentPractice: [
    mcq("y10-ril-i1", "What is a⁰ (a ≠ 0)?", "C", ["0", "a", "1", "undefined"], 2, "Any non-zero base to the power 0 equals 1."),
    ans("y10-ril-i2", "Simplify 5² × 5³ (give your answer as a power of 5).", "5^2 \\times 5^3", "5^5", 2, "Add indices: 2 + 3 = 5, so 5⁵.", ["55", "5^{5}"]),
    ans("y10-ril-i3", "Simplify y⁷ ÷ y⁴ (give your answer as a power of y).", "y^7 \\div y^4", "y^3", 2, "Subtract indices: 7 − 4 = 3, so y³.", ["y3", "y^{3}"]),
    ans("y10-ril-i4", "Simplify (2x²)³.", "(2x^2)^3", "8x^6", 3, "Cube the 2 (2³ = 8) and multiply the index of x by 3 (2 × 3 = 6), giving 8x⁶.", ["8x6", "8x^{6}"]),
    ans("y10-ril-i5", "Simplify x³ × x⁰ (give your answer as a power of x).", "x^3 \\times x^0", "x^3", 2, "x⁰ = 1, so x³ × 1 = x³.", ["x3", "x^{3}"]),
  ],
  masteryQuiz: [
    ans("y10-ril-m1", "Simplify 3² × 3⁴ (give your answer as a power of 3).", "3^2 \\times 3^4", "3^6", 2, "Add indices: 2 + 4 = 6, so 3⁶.", ["36", "3^{6}"]),
    mcq("y10-ril-m2", "Simplify x⁵ ÷ x⁵.", "A", ["$1$", "$0$", "$x$", "$x^{10}$"], 2, "x⁵ ÷ x⁵ = x⁰ = 1."),
    ans("y10-ril-m3", "Simplify (a⁴)² (give your answer as a power of a).", "(a^4)^2", "a^8", 2, "Multiply indices: 4 × 2 = 8, so a⁸.", ["a8", "a^{8}"]),
    ans("y10-ril-m4", "Simplify 2x³ × 3x² .", "2x^3 \\times 3x^2", "6x^5", 3, "Multiply coefficients (2 × 3 = 6) and add indices (3 + 2 = 5), giving 6x⁵.", ["6x5", "6x^{5}"]),
    mcq("y10-ril-m5", "Which expression equals 1?", "B", ["$1^x$ only", "$7^0$", "$0^0$", "$x^1$"], 3, "Any non-zero base to the power 0 is 1, so 7⁰ = 1."),
    ans("y10-ril-m6", "Simplify m⁸ ÷ m³ (give your answer as a power of m).", "m^8 \\div m^3", "m^5", 2, "Subtract indices: 8 − 3 = 5, so m⁵.", ["m5", "m^{5}"]),
    ans("y10-ril-m7", "Simplify (x²y³)² .", "(x^2y^3)^2", "x^4y^6", 3, "Multiply each index by 2: x⁴y⁶.", ["x4y6", "x^{4}y^{6}"]),
    mcq("y10-ril-m8", "Simplify x⁴ × x³.", "A", ["$x^7$", "$x^{12}$", "$x^1$", "$2x^7$"], 2, "Add indices: 4 + 3 = 7, so x⁷."),
    ans("y10-ril-m9", "Evaluate 10⁶ ÷ 10⁴ .", "10^6 \\div 10^4", "100", 3, "Subtract indices: 6 − 4 = 2, so 10² = 100.", ["10^2"]),
    ans("y10-ril-m10", "Evaluate (3²)² .", "(3^2)^2", "81", 3, "Multiply indices: 3⁴ = 81.", ["3^4"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying the bases when multiplying powers, e.g. 2³ × 2² = 4⁵.", fix: "Keep the base and ADD the indices: 2³ × 2² = 2⁵." },
    { mistake: "Adding indices when raising a power to a power.", fix: "(aᵐ)ⁿ MULTIPLIES the indices: (x²)³ = x⁶." },
    { mistake: "Writing a⁰ = 0.", fix: "Any non-zero base to the power 0 is 1." },
    { mistake: "Forgetting to apply the power to the coefficient, e.g. (2x²)³ = 2x⁶.", fix: "Cube the coefficient too: 2³ = 8, giving 8x⁶." },
  ],
  masteryPassMark: 0.8,
};

// ── 3B Negative Indices (core) ─────────────────────────────────────────────────────────
const negativeIndices: Partial<ExplicitLesson> = {
  description: "Interpret and evaluate negative indices using a⁻ⁿ = 1/aⁿ.",
  learningIntention: "Rewrite negative indices as reciprocals and evaluate them.",
  successCriteria: ["State that a⁻ⁿ = 1/aⁿ.", "Evaluate numerical powers with negative indices.", "Rewrite reciprocals using negative indices.", "Combine the rule with division of powers."],
  teaching: {
    paragraphs: [
      "A negative index means a RECIPROCAL: a⁻ⁿ = 1/aⁿ. The minus sign does not make the answer negative — it flips the power into a fraction.",
      "So 2⁻³ = 1/2³ = 1/8, and x⁻² = 1/x². The size of the index still tells you the power; the negative just moves it to the denominator.",
      "This rule comes from the division law: x³ ÷ x⁵ = x³⁻⁵ = x⁻², and writing the division as a fraction and cancelling gives 1/x². The two results must agree, which is why a⁻ⁿ = 1/aⁿ.",
      "You can also go backwards: 1/aⁿ can be written as a⁻ⁿ. For example 1/x⁵ = x⁻⁵. This is handy for keeping expressions on one line.",
    ],
    latexBlocks: ["a^{-n} = \\frac{1}{a^n}", "2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}", "\\frac{1}{x^5} = x^{-5}"],
  },
  workedExamples: [
    { title: "Evaluating a negative index", questionLatex: "\\text{Evaluate } 2^{-3}.", steps: [{ explanation: "Rewrite as a reciprocal.", latex: "2^{-3} = \\frac{1}{2^3}" }, { explanation: "Evaluate.", latex: "= \\frac{1}{8}" }], finalAnswerLatex: "\\frac{1}{8}" },
    { title: "Negative index with a pronumeral", questionLatex: "\\text{Rewrite } x^{-2} \\text{ without a negative index.}", steps: [{ explanation: "Apply the rule.", latex: "x^{-2} = \\frac{1}{x^2}" }], finalAnswerLatex: "\\frac{1}{x^2}" },
    { title: "Going backwards", questionLatex: "\\text{Write } \\frac{1}{x^5} \\text{ with a negative index.}", steps: [{ explanation: "Move the power up with a negative sign.", latex: "\\frac{1}{x^5} = x^{-5}" }], finalAnswerLatex: "x^{-5}" },
  ],
  guidedPractice: [
    mcq("y10-ni-g1", "Evaluate 2⁻².", "B", ["$-4$", "$\\tfrac{1}{4}$", "$4$", "$-\\tfrac{1}{4}$"], 2, "2⁻² = 1/2² = 1/4. The negative index gives a reciprocal, not a negative number."),
    ans("y10-ni-g2", "Write 3⁻¹ as a fraction.", "3^{-1}", "1/3", 2, "3⁻¹ = 1/3¹ = 1/3.", ["1/3", "\\frac{1}{3}"]),
    ans("y10-ni-g3", "Rewrite x⁻³ without a negative index.", "x^{-3}", "1/x^3", 2, "x⁻³ = 1/x³.", ["1/x^3", "\\frac{1}{x^3}"]),
    ans("y10-ni-g4", "Evaluate 10⁻² as a decimal.", "10^{-2}", "0.01", 3, "10⁻² = 1/100 = 0.01.", ["1/100"]),
  ],
  independentPractice: [
    mcq("y10-ni-i1", "Evaluate 4⁻¹.", "C", ["$-4$", "$4$", "$\\tfrac{1}{4}$", "$0$"], 2, "4⁻¹ = 1/4."),
    ans("y10-ni-i2", "Evaluate 2⁻⁴ as a fraction.", "2^{-4}", "1/16", 3, "2⁻⁴ = 1/2⁴ = 1/16.", ["1/16", "\\frac{1}{16}"]),
    ans("y10-ni-i3", "Evaluate 5⁻² as a fraction.", "5^{-2}", "1/25", 3, "5⁻² = 1/5² = 1/25.", ["1/25", "\\frac{1}{25}"]),
    ans("y10-ni-i4", "Write 1/x⁵ using a negative index.", "\\frac{1}{x^5}", "x^{-5}", 3, "1/x⁵ = x⁻⁵.", ["x-5", "x^-5"]),
    ans("y10-ni-i5", "Simplify x³ ÷ x⁵ using a negative index.", "x^3 \\div x^5", "x^{-2}", 3, "Subtract indices: 3 − 5 = −2, so x⁻² (= 1/x²).", ["x-2", "1/x^2"]),
  ],
  masteryQuiz: [
    ans("y10-ni-m1", "Evaluate 3⁻² as a fraction.", "3^{-2}", "1/9", 2, "3⁻² = 1/9.", ["1/9", "\\frac{1}{9}"]),
    mcq("y10-ni-m2", "Evaluate 2⁻³.", "A", ["$\\tfrac{1}{8}$", "$-8$", "$8$", "$-\\tfrac{1}{8}$"], 2, "2⁻³ = 1/2³ = 1/8."),
    ans("y10-ni-m3", "Rewrite x⁻¹ without a negative index.", "x^{-1}", "1/x", 2, "x⁻¹ = 1/x.", ["1/x", "\\frac{1}{x}"]),
    ans("y10-ni-m4", "Evaluate 10⁻³ as a fraction.", "10^{-3}", "1/1000", 3, "10⁻³ = 1/1000.", ["1/1000", "0.001"]),
    mcq("y10-ni-m5", "Write 1/2³ using a negative index.", "B", ["$2^3$", "$2^{-3}$", "$-2^3$", "$3^{-2}$"], 2, "1/2³ = 2⁻³."),
    ans("y10-ni-m6", "Evaluate 5⁻¹ as a fraction.", "5^{-1}", "1/5", 2, "5⁻¹ = 1/5.", ["1/5", "\\frac{1}{5}"]),
    ans("y10-ni-m7", "Evaluate 4⁻² as a fraction.", "4^{-2}", "1/16", 3, "4⁻² = 1/16.", ["1/16", "\\frac{1}{16}"]),
    mcq("y10-ni-m8", "Simplify x² ÷ x⁵.", "C", ["$x^3$", "$x^{7}$", "$x^{-3}$", "$x^{-7}$"], 3, "2 − 5 = −3, so x⁻³."),
    ans("y10-ni-m9", "Evaluate 2⁻⁵ as a fraction.", "2^{-5}", "1/32", 3, "2⁻⁵ = 1/32.", ["1/32", "\\frac{1}{32}"]),
    ans("y10-ni-m10", "Evaluate 6⁻¹ as a fraction.", "6^{-1}", "1/6", 2, "6⁻¹ = 1/6.", ["1/6", "\\frac{1}{6}"]),
  ],
  commonMistakes: [
    { mistake: "Treating a negative index as a negative number, e.g. 2⁻³ = −8.", fix: "A negative index gives a reciprocal: 2⁻³ = 1/8." },
    { mistake: "Changing the base sign instead of taking a reciprocal.", fix: "The base is unchanged; only the power moves to the denominator." },
    { mistake: "Forgetting the index value, e.g. 2⁻³ = 1/2.", fix: "Keep the index: 2⁻³ = 1/2³ = 1/8." },
    { mistake: "Mis-subtracting indices in division.", fix: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ; a smaller top index gives a negative index." },
  ],
  masteryPassMark: 0.8,
};

// ── 3C Scientific Notation (core) ──────────────────────────────────────────────────────
const scientificNotation: Partial<ExplicitLesson> = {
  description: "Write large and small numbers in scientific notation a × 10ⁿ and convert back to ordinary form.",
  learningIntention: "Convert between ordinary numbers and scientific notation.",
  successCriteria: ["Write a large number as a × 10ⁿ with 1 ≤ a < 10.", "Write a small number using a negative power of 10.", "Convert scientific notation back to an ordinary number.", "Recognise correctly-formed scientific notation."],
  teaching: {
    paragraphs: [
      "Scientific notation writes any number as a × 10ⁿ, where a is between 1 and 10 (one non-zero digit before the decimal point) and n is a whole number. It keeps very large or very small numbers compact.",
      "For a LARGE number, count how many places the decimal point moves LEFT to leave one digit in front: 45 000 = 4.5 × 10⁴ (the point moved 4 places). The power is positive.",
      "For a SMALL number, count how many places the point moves RIGHT: 0.0032 = 3.2 × 10⁻³ (3 places). The power is negative for numbers less than 1.",
      "To convert back, move the decimal point the number of places shown by the power — right for positive, left for negative: 6 × 10³ = 6000, and 7 × 10⁻² = 0.07.",
    ],
    latexBlocks: ["a \\times 10^n,\\quad 1 \\le a < 10", "45000 = 4.5 \\times 10^4", "0.0032 = 3.2 \\times 10^{-3}"],
  },
  workedExamples: [
    { title: "Large number", questionLatex: "\\text{Write } 45000 \\text{ in scientific notation.}", steps: [{ explanation: "Move the point left to 4.5 (4 places).", latex: "4.5 \\times 10^4" }], finalAnswerLatex: "4.5 \\times 10^4" },
    { title: "Small number", questionLatex: "\\text{Write } 0.0032 \\text{ in scientific notation.}", steps: [{ explanation: "Move the point right to 3.2 (3 places).", latex: "3.2 \\times 10^{-3}" }], finalAnswerLatex: "3.2 \\times 10^{-3}" },
    { title: "Back to ordinary form", questionLatex: "\\text{Write } 6 \\times 10^3 \\text{ as an ordinary number.}", steps: [{ explanation: "Move the point 3 places right.", latex: "6000" }], finalAnswerLatex: "6000" },
  ],
  guidedPractice: [
    mcq("y10-sn-g1", "Write 3200 in scientific notation.", "A", ["$3.2 \\times 10^3$", "$32 \\times 10^2$", "$3.2 \\times 10^2$", "$0.32 \\times 10^4$"], 2, "Move the point 3 places: 3.2 × 10³. The 'a' value must be between 1 and 10."),
    ans("y10-sn-g2", "Write 50000 in scientific notation.", "50000", "5 \\times 10^4", 2, "Move the point 4 places left: 5 × 10⁴.", ["5x10^4", "5*10^4", "5e4"]),
    ans("y10-sn-g3", "Write 2.5 × 10³ as an ordinary number.", "2.5 \\times 10^3", "2500", 2, "Move the point 3 places right: 2500.", ["2500"]),
    ans("y10-sn-g4", "Write 0.004 in scientific notation.", "0.004", "4 \\times 10^{-3}", 3, "Move the point 3 places right: 4 × 10⁻³.", ["4x10^-3", "4e-3"]),
  ],
  independentPractice: [
    mcq("y10-sn-i1", "Which is 720000 in correct scientific notation?", "B", ["$72 \\times 10^4$", "$7.2 \\times 10^5$", "$7.2 \\times 10^4$", "$0.72 \\times 10^6$"], 3, "720000 = 7.2 × 10⁵ (point moves 5 places; 'a' is between 1 and 10)."),
    ans("y10-sn-i2", "Write 7 × 10⁻² as a decimal.", "7 \\times 10^{-2}", "0.07", 3, "Move the point 2 places left: 0.07.", ["0.07"]),
    ans("y10-sn-i3", "Write 0.00056 in scientific notation.", "0.00056", "5.6 \\times 10^{-4}", 3, "Move the point 4 places right: 5.6 × 10⁻⁴.", ["5.6x10^-4", "5.6e-4"]),
    ans("y10-sn-i4", "Write 9.1 × 10⁴ as an ordinary number.", "9.1 \\times 10^4", "91000", 2, "Move the point 4 places right: 91000.", ["91000"]),
    ans("y10-sn-i5", "Write 1200000 in scientific notation.", "1200000", "1.2 \\times 10^6", 3, "Move the point 6 places left: 1.2 × 10⁶.", ["1.2x10^6", "1.2e6"]),
  ],
  masteryQuiz: [
    ans("y10-sn-m1", "Write 8000 in scientific notation.", "8000", "8 \\times 10^3", 2, "8 × 10³.", ["8x10^3", "8e3"]),
    mcq("y10-sn-m2", "Write 6.3 × 10² as an ordinary number.", "B", ["63", "630", "6300", "0.063"], 2, "Move the point 2 places right: 630."),
    ans("y10-sn-m3", "Write 0.00009 in scientific notation.", "0.00009", "9 \\times 10^{-5}", 3, "Move the point 5 places right: 9 × 10⁻⁵.", ["9x10^-5", "9e-5"]),
    ans("y10-sn-m4", "Write 3.4 × 10⁵ as an ordinary number.", "3.4 \\times 10^5", "340000", 2, "Move the point 5 places right: 340000.", ["340000"]),
    mcq("y10-sn-m5", "Which number is written in correct scientific notation?", "A", ["$4.5 \\times 10^3$", "$45 \\times 10^2$", "$0.45 \\times 10^4$", "$4.5 \\times 10^{3.5}$"], 3, "Correct form needs 1 ≤ a < 10 and a whole-number power: 4.5 × 10³."),
    ans("y10-sn-m6", "Write 250000 in scientific notation.", "250000", "2.5 \\times 10^5", 3, "2.5 × 10⁵.", ["2.5x10^5", "2.5e5"]),
    ans("y10-sn-m7", "Write 2 × 10⁻³ as a decimal.", "2 \\times 10^{-3}", "0.002", 3, "Move the point 3 places left: 0.002.", ["0.002"]),
    mcq("y10-sn-m8", "Write 0.0007 in scientific notation.", "C", ["$7 \\times 10^{-3}$", "$7 \\times 10^{3}$", "$7 \\times 10^{-4}$", "$0.7 \\times 10^{-3}$"], 3, "Move the point 4 places right: 7 × 10⁻⁴."),
    ans("y10-sn-m9", "Write 1.5 × 10⁶ as an ordinary number.", "1.5 \\times 10^6", "1500000", 2, "Move the point 6 places right: 1500000.", ["1500000"]),
    ans("y10-sn-m10", "Write 60000 in scientific notation.", "60000", "6 \\times 10^4", 2, "6 × 10⁴.", ["6x10^4", "6e4"]),
  ],
  commonMistakes: [
    { mistake: "Leaving 'a' outside 1–10, e.g. 45 × 10³.", fix: "Adjust so one non-zero digit is before the point: 4.5 × 10⁴." },
    { mistake: "Using a positive power for a small number.", fix: "Numbers less than 1 use a NEGATIVE power of 10." },
    { mistake: "Miscounting the decimal places.", fix: "Count carefully how many places the point moves." },
    { mistake: "Moving the point the wrong way when converting back.", fix: "Positive power → move right; negative power → move left." },
  ],
  masteryPassMark: 0.8,
};

// ── 3D Fractional Indices (path) ───────────────────────────────────────────────────────
const fractionalIndices: Partial<ExplicitLesson> = {
  description: "Interpret fractional indices as roots and evaluate a^(1/n) and a^(m/n).",
  learningIntention: "Evaluate powers with fractional indices using roots.",
  successCriteria: ["State that the power 1/n means the n-th root.", "Evaluate square-root and cube-root powers for perfect powers.", "Evaluate the power m/n as the n-th root raised to the power m.", "Connect fractional indices to surd notation."],
  teaching: {
    paragraphs: [
      "A fractional index means a ROOT. The denominator of the fraction tells you which root: the power 1/2 is the square root (√a), the power 1/3 is the cube root (∛a), and the power 1/n is the n-th root of a.",
      "So 9 to the power 1/2 is √9 = 3, and 8 to the power 1/3 is ∛8 = 2. A fractional index is just another way to write a root.",
      "When the numerator is more than 1, the power m/n means: take the n-th root first (the denominator), then raise to the power m (the numerator). For 16 to the power 3/4 the 4th root of 16 is 2, then 2 cubed = 8.",
      "Reading the fraction as 'root then power' keeps the numbers small. Taking the root first (16 → 2) is much easier than computing 16³ first.",
    ],
    latexBlocks: ["a^{1/n} = \\sqrt[n]{a}", "9^{1/2} = \\sqrt{9} = 3,\\qquad 8^{1/3} = \\sqrt[3]{8} = 2", "a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m,\\quad 16^{3/4} = 2^3 = 8"],
  },
  workedExamples: [
    { title: "A unit fractional index", questionLatex: "\\text{Evaluate } 9^{1/2}.", steps: [{ explanation: "1/2 means square root.", latex: "9^{1/2} = \\sqrt{9} = 3" }], finalAnswerLatex: "3" },
    { title: "A cube root", questionLatex: "\\text{Evaluate } 8^{1/3}.", steps: [{ explanation: "1/3 means cube root.", latex: "8^{1/3} = \\sqrt[3]{8} = 2" }], finalAnswerLatex: "2" },
    { title: "Numerator greater than 1", questionLatex: "\\text{Evaluate } 16^{3/4}.", steps: [{ explanation: "Take the 4th root first.", latex: "\\sqrt[4]{16} = 2" }, { explanation: "Then raise to the power 3.", latex: "2^3 = 8" }], finalAnswerLatex: "8" },
  ],
  guidedPractice: [
    mcq("y10-fi-g1", "Evaluate 25^(1/2).", "A", ["5", "12.5", "625", "50"], 2, "25^(1/2) = √25 = 5."),
    ans("y10-fi-g2", "Evaluate 27^(1/3).", "27^{1/3}", "3", 2, "27^(1/3) = ∛27 = 3.", ["3"]),
    ans("y10-fi-g3", "Evaluate 16^(1/2).", "16^{1/2}", "4", 2, "16^(1/2) = √16 = 4.", ["4"]),
    ans("y10-fi-g4", "Evaluate 4^(1/2).", "4^{1/2}", "2", 1, "4^(1/2) = √4 = 2.", ["2"]),
  ],
  independentPractice: [
    mcq("y10-fi-i1", "Evaluate 8^(2/3).", "B", ["2", "4", "16", "6"], 4, "∛8 = 2, then 2² = 4."),
    ans("y10-fi-i2", "Evaluate 16^(1/4).", "16^{1/4}", "2", 3, "The 4th root of 16 is 2.", ["2"]),
    ans("y10-fi-i3", "Evaluate 100^(1/2).", "100^{1/2}", "10", 2, "√100 = 10.", ["10"]),
    ans("y10-fi-i4", "Evaluate 27^(2/3).", "27^{2/3}", "9", 4, "∛27 = 3, then 3² = 9.", ["9"]),
    ans("y10-fi-i5", "Evaluate 32^(1/5).", "32^{1/5}", "2", 3, "The 5th root of 32 is 2 (2⁵ = 32).", ["2"]),
  ],
  masteryQuiz: [
    ans("y10-fi-m1", "Evaluate 36^(1/2).", "36^{1/2}", "6", 2, "√36 = 6.", ["6"]),
    mcq("y10-fi-m2", "Evaluate 64^(1/3).", "B", ["8", "4", "16", "21.3"], 3, "∛64 = 4."),
    ans("y10-fi-m3", "Evaluate 81^(1/2).", "81^{1/2}", "9", 2, "√81 = 9.", ["9"]),
    ans("y10-fi-m4", "Evaluate 16^(3/4).", "16^{3/4}", "8", 4, "4th root of 16 is 2, then 2³ = 8.", ["8"]),
    mcq("y10-fi-m5", "What does the power 1/2 mean?", "A", ["$\\sqrt{a}$", "$\\tfrac{a}{2}$", "$2a$", "$a^2$"], 2, "The power 1/2 means the square root of a."),
    ans("y10-fi-m6", "Evaluate 125^(1/3).", "125^{1/3}", "5", 3, "∛125 = 5.", ["5"]),
    ans("y10-fi-m7", "Evaluate 9^(3/2).", "9^{3/2}", "27", 4, "√9 = 3, then 3³ = 27.", ["27"]),
    mcq("y10-fi-m8", "Evaluate 8^(1/3).", "C", ["4", "3", "2", "1.5"], 2, "∛8 = 2."),
    ans("y10-fi-m9", "Evaluate 4^(3/2).", "4^{3/2}", "8", 4, "√4 = 2, then 2³ = 8.", ["8"]),
    ans("y10-fi-m10", "Evaluate 1000^(1/3).", "1000^{1/3}", "10", 3, "∛1000 = 10.", ["10"]),
  ],
  commonMistakes: [
    { mistake: "Treating a^(1/2) as a ÷ 2.", fix: "a^(1/2) is the square root of a, not half of a." },
    { mistake: "Raising to the power before taking the root for a^(m/n).", fix: "Take the n-th root first, then raise to the m-th power — the numbers stay small." },
    { mistake: "Using the numerator as the root.", fix: "The DENOMINATOR is the root; the numerator is the power." },
    { mistake: "Forgetting which root the denominator gives.", fix: "1/3 → cube root, 1/4 → fourth root, etc." },
  ],
  masteryPassMark: 0.8,
};

// ── 3E Exponential Equations (path) ────────────────────────────────────────────────────
const exponentialEquations: Partial<ExplicitLesson> = {
  description: "Solve simple exponential equations by writing both sides with the same base and equating the indices.",
  learningIntention: "Solve aˣ = k by expressing k as a power of a and equating indices.",
  successCriteria: ["Write a number as a power of a given base.", "Equate the indices when the bases match.", "Solve for the unknown index.", "Use a⁰ = 1 to solve equations equal to 1."],
  teaching: {
    paragraphs: [
      "An exponential equation has the unknown in the INDEX, such as 2ˣ = 8. The strategy is to write both sides as powers of the SAME base, then the indices must be equal.",
      "Rewrite the right-hand side as a power of the base: 8 = 2³, so 2ˣ = 2³. Since the bases match, the indices match: x = 3.",
      "This works whenever the number is a neat power of the base: 3ˣ = 27 becomes 3ˣ = 3³, so x = 3; and 5ˣ = 125 becomes 5ˣ = 5³, so x = 3.",
      "A special case: anything to the power 0 is 1, so aˣ = 1 gives x = 0. For example 2ˣ = 1 means x = 0.",
    ],
    latexBlocks: ["a^x = a^k \\Rightarrow x = k", "2^x = 8 = 2^3 \\Rightarrow x = 3", "a^x = 1 \\Rightarrow x = 0"],
  },
  workedExamples: [
    { title: "Equating indices", questionLatex: "\\text{Solve } 2^x = 16.", steps: [{ explanation: "Write 16 as a power of 2.", latex: "16 = 2^4" }, { explanation: "Equate indices.", latex: "2^x = 2^4 \\Rightarrow x = 4" }], finalAnswerLatex: "x = 4" },
    { title: "A different base", questionLatex: "\\text{Solve } 3^x = 27.", steps: [{ explanation: "27 = 3³.", latex: "3^x = 3^3 \\Rightarrow x = 3" }], finalAnswerLatex: "x = 3" },
    { title: "Equal to one", questionLatex: "\\text{Solve } 5^x = 1.", steps: [{ explanation: "Any base to the power 0 is 1.", latex: "5^x = 5^0 \\Rightarrow x = 0" }], finalAnswerLatex: "x = 0" },
  ],
  guidedPractice: [
    mcq("y10-ee-g1", "Solve 2ˣ = 8.", "C", ["1", "2", "3", "4"], 2, "8 = 2³, so x = 3."),
    ans("y10-ee-g2", "Solve 3ˣ = 9.", "3^x=9", "2", 2, "9 = 3², so x = 2.", ["x=2"]),
    ans("y10-ee-g3", "Solve 2ˣ = 32.", "2^x=32", "5", 3, "32 = 2⁵, so x = 5.", ["x=5"]),
    ans("y10-ee-g4", "Solve 10ˣ = 1000.", "10^x=1000", "3", 2, "1000 = 10³, so x = 3.", ["x=3"]),
  ],
  independentPractice: [
    mcq("y10-ee-i1", "Solve 5ˣ = 25.", "B", ["1", "2", "3", "5"], 2, "25 = 5², so x = 2."),
    ans("y10-ee-i2", "Solve 2ˣ = 64.", "2^x=64", "6", 3, "64 = 2⁶, so x = 6.", ["x=6"]),
    ans("y10-ee-i3", "Solve 4ˣ = 16.", "4^x=16", "2", 2, "16 = 4², so x = 2.", ["x=2"]),
    ans("y10-ee-i4", "Solve 3ˣ = 81.", "3^x=81", "4", 3, "81 = 3⁴, so x = 4.", ["x=4"]),
    ans("y10-ee-i5", "Solve 2ˣ = 1.", "2^x=1", "0", 2, "1 = 2⁰, so x = 0.", ["x=0"]),
  ],
  masteryQuiz: [
    ans("y10-ee-m1", "Solve 2ˣ = 4.", "2^x=4", "2", 2, "4 = 2², so x = 2.", ["x=2"]),
    mcq("y10-ee-m2", "Solve 3ˣ = 27.", "C", ["1", "2", "3", "9"], 2, "27 = 3³, so x = 3."),
    ans("y10-ee-m3", "Solve 10ˣ = 100.", "10^x=100", "2", 2, "100 = 10², so x = 2.", ["x=2"]),
    ans("y10-ee-m4", "Solve 5ˣ = 125.", "5^x=125", "3", 3, "125 = 5³, so x = 3.", ["x=3"]),
    mcq("y10-ee-m5", "If aˣ = a⁵, then x equals:", "D", ["a", "0", "1", "5"], 2, "Equal bases mean equal indices, so x = 5."),
    ans("y10-ee-m6", "Solve 2ˣ = 128.", "2^x=128", "7", 4, "128 = 2⁷, so x = 7.", ["x=7"]),
    ans("y10-ee-m7", "Solve 4ˣ = 64.", "4^x=64", "3", 3, "64 = 4³, so x = 3.", ["x=3"]),
    mcq("y10-ee-m8", "Solve 2ˣ = 16.", "B", ["2", "4", "8", "3"], 2, "16 = 2⁴, so x = 4."),
    ans("y10-ee-m9", "Solve 3ˣ = 243.", "3^x=243", "5", 4, "243 = 3⁵, so x = 5.", ["x=5"]),
    ans("y10-ee-m10", "Solve 7ˣ = 49.", "7^x=49", "2", 2, "49 = 7², so x = 2.", ["x=2"]),
  ],
  commonMistakes: [
    { mistake: "Dividing instead of writing as a power, e.g. 2ˣ = 8 → x = 4.", fix: "Write 8 as 2³ and equate indices: x = 3." },
    { mistake: "Equating indices when the bases differ.", fix: "Make both sides the SAME base first." },
    { mistake: "Forgetting aˣ = 1 gives x = 0.", fix: "Any base to the power 0 is 1." },
    { mistake: "Mis-writing a number as a power, e.g. 64 = 2⁵.", fix: "Check: 2⁶ = 64, so the index is 6." },
  ],
  masteryPassMark: 0.8,
};

// ── 4A Irrational Numbers and Surds (path) ─────────────────────────────────────────────
const irrationalSurds: Partial<ExplicitLesson> = {
  description: "Identify surds as irrational roots and simplify them using the largest square factor.",
  learningIntention: "Recognise surds and simplify them using perfect-square factors.",
  successCriteria: ["Distinguish a surd from a rational root.", "Recognise √2, √3, √5 as irrational.", "Simplify a surd by extracting the largest square factor.", "Identify when a root is rational."],
  teaching: {
    paragraphs: [
      "A SURD is a root that cannot be simplified to a rational number — its decimal goes on forever without repeating. √2, √3 and √5 are surds; but √4 = 2 and √9 = 3 are rational, so they are NOT surds.",
      "To simplify a surd, split the number under the root into its LARGEST perfect-square factor times something else, then take the square root of the square part.",
      "For √12: the largest square factor of 12 is 4, so √12 = √4 × √3 = 2√3. For √50 = √25 × √2 = 5√2.",
      "Always use the LARGEST square factor — using a smaller one leaves more to simplify. Check the number left under the root has no square factors remaining.",
    ],
    latexBlocks: ["\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}", "\\sqrt{12} = \\sqrt{4}\\,\\sqrt{3} = 2\\sqrt{3}", "\\sqrt{50} = \\sqrt{25}\\,\\sqrt{2} = 5\\sqrt{2}"],
  },
  workedExamples: [
    { title: "Simplifying a surd", questionLatex: "\\text{Simplify } \\sqrt{12}.", steps: [{ explanation: "Largest square factor of 12 is 4.", latex: "\\sqrt{12} = \\sqrt{4}\\,\\sqrt{3}" }, { explanation: "Take the root of the square part.", latex: "= 2\\sqrt{3}" }], finalAnswerLatex: "2\\sqrt{3}" },
    { title: "A larger surd", questionLatex: "\\text{Simplify } \\sqrt{50}.", steps: [{ explanation: "50 = 25 × 2.", latex: "\\sqrt{50} = \\sqrt{25}\\,\\sqrt{2} = 5\\sqrt{2}" }], finalAnswerLatex: "5\\sqrt{2}" },
    { title: "Rational root (not a surd)", questionLatex: "\\text{Is } \\sqrt{9} \\text{ a surd?}", steps: [{ explanation: "√9 = 3, a whole number.", latex: "\\sqrt{9} = 3" }], finalAnswerLatex: "\\text{No — it is rational}" },
  ],
  guidedPractice: [
    mcq("y10-is-g1", "Which of these is a surd?", "C", ["$\\sqrt{4}$", "$\\sqrt{9}$", "$\\sqrt{5}$", "$\\sqrt{16}$"], 2, "√5 is irrational (a surd); √4, √9 and √16 are whole numbers."),
    mcq("y10-is-g2", "Simplify √8.", "A", ["$2\\sqrt{2}$", "$4\\sqrt{2}$", "$2\\sqrt{4}$", "$8$"], 2, "8 = 4 × 2, so √8 = √4·√2 = 2√2."),
    mcq("y10-is-g3", "Simplify √18.", "B", ["$2\\sqrt{3}$", "$3\\sqrt{2}$", "$9\\sqrt{2}$", "$6$"], 3, "18 = 9 × 2, so √18 = 3√2."),
    ans("y10-is-g4", "Is √16 rational? Answer yes or no.", "\\sqrt{16}", "yes", 1, "√16 = 4, a whole number, so it is rational.", ["Yes"]),
  ],
  independentPractice: [
    mcq("y10-is-i1", "Simplify √20.", "A", ["$2\\sqrt{5}$", "$4\\sqrt{5}$", "$5\\sqrt{2}$", "$10$"], 3, "20 = 4 × 5, so √20 = 2√5."),
    mcq("y10-is-i2", "Simplify √27.", "B", ["$9\\sqrt{3}$", "$3\\sqrt{3}$", "$3\\sqrt{9}$", "$5$"], 3, "27 = 9 × 3, so √27 = 3√3."),
    mcq("y10-is-i3", "Simplify √45.", "C", ["$5\\sqrt{3}$", "$9\\sqrt{5}$", "$3\\sqrt{5}$", "$15$"], 3, "45 = 9 × 5, so √45 = 3√5."),
    mcq("y10-is-i4", "Simplify √72.", "A", ["$6\\sqrt{2}$", "$2\\sqrt{6}$", "$3\\sqrt{8}$", "$8\\sqrt{3}$"], 4, "72 = 36 × 2, so √72 = 6√2."),
    ans("y10-is-i5", "Is √7 a surd? Answer yes or no.", "\\sqrt{7}", "yes", 1, "7 is not a perfect square, so √7 is irrational — a surd.", ["Yes"]),
  ],
  masteryQuiz: [
    mcq("y10-is-m1", "Simplify √32.", "A", ["$4\\sqrt{2}$", "$2\\sqrt{8}$", "$8\\sqrt{2}$", "$16$"], 3, "32 = 16 × 2, so √32 = 4√2."),
    mcq("y10-is-m2", "Which of these is rational?", "B", ["$\\sqrt{2}$", "$\\sqrt{25}$", "$\\sqrt{7}$", "$\\sqrt{10}$"], 2, "√25 = 5, a whole number; the others are surds."),
    mcq("y10-is-m3", "Simplify √48.", "C", ["$2\\sqrt{12}$", "$3\\sqrt{4}$", "$4\\sqrt{3}$", "$6\\sqrt{2}$"], 3, "48 = 16 × 3, so √48 = 4√3."),
    mcq("y10-is-m4", "Simplify √75.", "A", ["$5\\sqrt{3}$", "$3\\sqrt{5}$", "$15$", "$25\\sqrt{3}$"], 3, "75 = 25 × 3, so √75 = 5√3."),
    mcq("y10-is-m5", "√2 is best described as:", "B", ["rational", "irrational", "a whole number", "negative"], 2, "√2 cannot be written as a fraction; it is irrational."),
    mcq("y10-is-m6", "Simplify √98.", "A", ["$7\\sqrt{2}$", "$2\\sqrt{7}$", "$49\\sqrt{2}$", "$14$"], 4, "98 = 49 × 2, so √98 = 7√2."),
    mcq("y10-is-m7", "Simplify √200.", "C", ["$2\\sqrt{100}$", "$20\\sqrt{2}$", "$10\\sqrt{2}$", "$100\\sqrt{2}$"], 4, "200 = 100 × 2, so √200 = 10√2."),
    mcq("y10-is-m8", "Simplify √4.", "B", ["$\\sqrt{2}$", "$2$", "$2\\sqrt{2}$", "$4$"], 1, "√4 = 2 exactly."),
    mcq("y10-is-m9", "Simplify √63.", "A", ["$3\\sqrt{7}$", "$7\\sqrt{3}$", "$9\\sqrt{7}$", "$21$"], 3, "63 = 9 × 7, so √63 = 3√7."),
    mcq("y10-is-m10", "Simplify √500.", "B", ["$5\\sqrt{20}$", "$10\\sqrt{5}$", "$5\\sqrt{10}$", "$50$"], 4, "500 = 100 × 5, so √500 = 10√5."),
  ],
  commonMistakes: [
    { mistake: "Calling √9 or √16 a surd.", fix: "If the root is a whole number, it is rational, not a surd." },
    { mistake: "Using a non-largest square factor, e.g. √72 = 2√18.", fix: "Use the LARGEST square factor (36) to fully simplify: 6√2." },
    { mistake: "Taking the root of the wrong part.", fix: "Only the perfect-square factor comes out; the rest stays under the root." },
    { mistake: "Leaving a square factor under the root.", fix: "Check the remaining number has no perfect-square factors." },
  ],
  masteryPassMark: 0.8,
};

// ── 4B Adding and Subtracting Surds (path) ─────────────────────────────────────────────
const addSubtractSurds: Partial<ExplicitLesson> = {
  description: "Add and subtract like surds, simplifying first so that like terms can be combined.",
  learningIntention: "Combine like surds by simplifying first and adding or subtracting coefficients.",
  successCriteria: ["Recognise like surds (same number under the root).", "Add or subtract the coefficients of like surds.", "Simplify surds before combining.", "Recognise when surds cannot be combined."],
  teaching: {
    paragraphs: [
      "Surds behave like algebraic terms: only LIKE surds (the same number under the root) can be added or subtracted. Think of √3 as 'a unit' — 2√3 + 5√3 = 7√3, just like 2x + 5x = 7x.",
      "Unlike surds cannot be combined: √2 + √3 stays as √2 + √3, the same way x + y stays as x + y.",
      "Often surds look unlike but become like after SIMPLIFYING. √12 + √27 = 2√3 + 3√3 = 5√3 — simplify each first, then combine.",
      "So the routine is: simplify every surd, identify the like surds, then add or subtract their coefficients. The number under the root never changes when you combine.",
    ],
    latexBlocks: ["2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}", "\\sqrt{2} + \\sqrt{3}\\ \\text{cannot be combined}", "\\sqrt{12} + \\sqrt{27} = 2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}"],
  },
  workedExamples: [
    { title: "Like surds", questionLatex: "\\text{Simplify } 2\\sqrt{5} + 3\\sqrt{5}.", steps: [{ explanation: "Add the coefficients.", latex: "(2+3)\\sqrt{5} = 5\\sqrt{5}" }], finalAnswerLatex: "5\\sqrt{5}" },
    { title: "Simplify then combine", questionLatex: "\\text{Simplify } \\sqrt{12} + \\sqrt{27}.", steps: [{ explanation: "Simplify each surd.", latex: "2\\sqrt{3} + 3\\sqrt{3}" }, { explanation: "Add coefficients.", latex: "= 5\\sqrt{3}" }], finalAnswerLatex: "5\\sqrt{3}" },
    { title: "Subtraction", questionLatex: "\\text{Simplify } 4\\sqrt{2} - \\sqrt{2}.", steps: [{ explanation: "Subtract coefficients (√2 = 1√2).", latex: "(4-1)\\sqrt{2} = 3\\sqrt{2}" }], finalAnswerLatex: "3\\sqrt{2}" },
  ],
  guidedPractice: [
    mcq("y10-as-g1", "Simplify 3√2 + 4√2.", "A", ["$7\\sqrt{2}$", "$7\\sqrt{4}$", "$12\\sqrt{2}$", "$7$"], 2, "Like surds: add coefficients, 3 + 4 = 7, giving 7√2."),
    mcq("y10-as-g2", "Simplify 5√3 − 2√3.", "B", ["$7\\sqrt{3}$", "$3\\sqrt{3}$", "$3$", "$3\\sqrt{0}$"], 2, "5 − 2 = 3, giving 3√3."),
    mcq("y10-as-g3", "Simplify √8 + √2.", "A", ["$3\\sqrt{2}$", "$\\sqrt{10}$", "$2\\sqrt{10}$", "$4\\sqrt{2}$"], 3, "√8 = 2√2, so 2√2 + √2 = 3√2."),
    mcq("y10-as-g4", "Simplify 2√5 + √5.", "C", ["$2\\sqrt{10}$", "$3\\sqrt{10}$", "$3\\sqrt{5}$", "$2\\sqrt{5}$"], 2, "√5 = 1√5, so 2√5 + 1√5 = 3√5."),
  ],
  independentPractice: [
    mcq("y10-as-i1", "Can √2 + √3 be simplified to a single surd?", "B", ["Yes, √5", "No", "Yes, √6", "Yes, 5"], 2, "√2 and √3 are unlike surds, so they cannot be combined."),
    mcq("y10-as-i2", "Simplify √18 + √8.", "A", ["$5\\sqrt{2}$", "$\\sqrt{26}$", "$2\\sqrt{2}$", "$26$"], 3, "√18 = 3√2 and √8 = 2√2, so 3√2 + 2√2 = 5√2."),
    mcq("y10-as-i3", "Simplify √27 − √12.", "C", ["$\\sqrt{15}$", "$5\\sqrt{3}$", "$\\sqrt{3}$", "$2\\sqrt{3}$"], 3, "√27 = 3√3 and √12 = 2√3, so 3√3 − 2√3 = √3."),
    mcq("y10-as-i4", "Simplify 6√7 − 2√7.", "A", ["$4\\sqrt{7}$", "$4$", "$8\\sqrt{7}$", "$4\\sqrt{14}$"], 2, "6 − 2 = 4, giving 4√7."),
    mcq("y10-as-i5", "Simplify √50 + √32.", "B", ["$\\sqrt{82}$", "$9\\sqrt{2}$", "$2\\sqrt{2}$", "$82$"], 4, "√50 = 5√2 and √32 = 4√2, so 5√2 + 4√2 = 9√2."),
  ],
  masteryQuiz: [
    mcq("y10-as-m1", "Simplify 4√3 + √3.", "A", ["$5\\sqrt{3}$", "$4\\sqrt{6}$", "$5\\sqrt{6}$", "$4\\sqrt{3}$"], 2, "4 + 1 = 5, giving 5√3."),
    mcq("y10-as-m2", "Simplify 2√5 − 2√5.", "C", ["$4\\sqrt{5}$", "$2\\sqrt{5}$", "$0$", "$\\sqrt{5}$"], 2, "2 − 2 = 0."),
    mcq("y10-as-m3", "Simplify √20 + √45.", "A", ["$5\\sqrt{5}$", "$\\sqrt{65}$", "$2\\sqrt{5}$", "$65$"], 4, "√20 = 2√5 and √45 = 3√5, so 5√5."),
    mcq("y10-as-m4", "Simplify √75 − √12.", "B", ["$\\sqrt{63}$", "$3\\sqrt{3}$", "$7\\sqrt{3}$", "$\\sqrt{3}$"], 4, "√75 = 5√3 and √12 = 2√3, so 3√3."),
    mcq("y10-as-m5", "Simplify 3√2 + 2√3.", "D", ["$5\\sqrt{5}$", "$5\\sqrt{6}$", "$6\\sqrt{5}$", "It cannot be combined"], 3, "√2 and √3 are unlike surds, so the expression cannot be combined."),
    mcq("y10-as-m6", "Simplify 7√2 − 3√2.", "A", ["$4\\sqrt{2}$", "$4$", "$10\\sqrt{2}$", "$4\\sqrt{4}$"], 2, "7 − 3 = 4, giving 4√2."),
    mcq("y10-as-m7", "Simplify √48 + √27.", "C", ["$\\sqrt{75}$", "$5\\sqrt{3}$", "$7\\sqrt{3}$", "$12\\sqrt{3}$"], 4, "√48 = 4√3 and √27 = 3√3, so 7√3."),
    mcq("y10-as-m8", "Simplify √8 + √18.", "B", ["$\\sqrt{26}$", "$5\\sqrt{2}$", "$2\\sqrt{2}$", "$26$"], 3, "2√2 + 3√2 = 5√2."),
    mcq("y10-as-m9", "Simplify √98 − √50.", "A", ["$2\\sqrt{2}$", "$\\sqrt{48}$", "$12\\sqrt{2}$", "$48$"], 4, "√98 = 7√2 and √50 = 5√2, so 2√2."),
    mcq("y10-as-m10", "Simplify 2√3 + 3√3 + √3.", "C", ["$5\\sqrt{3}$", "$6\\sqrt{9}$", "$6\\sqrt{3}$", "$5\\sqrt{9}$"], 2, "2 + 3 + 1 = 6, giving 6√3."),
  ],
  commonMistakes: [
    { mistake: "Adding the numbers under the root, e.g. √2 + √3 = √5.", fix: "You cannot add the radicands; unlike surds stay separate." },
    { mistake: "Combining unlike surds.", fix: "Only surds with the same number under the root combine." },
    { mistake: "Forgetting to simplify first.", fix: "Simplify each surd; some unlike-looking surds become like." },
    { mistake: "Changing the number under the root when combining.", fix: "Only the coefficient changes: 2√3 + 5√3 = 7√3, not 7√9." },
  ],
  masteryPassMark: 0.8,
};

// ── 4C Multiplying and Dividing Surds (path) ───────────────────────────────────────────
const multiplyDivideSurds: Partial<ExplicitLesson> = {
  description: "Multiply and divide surds using √a × √b = √(ab) and √a ÷ √b = √(a/b).",
  learningIntention: "Apply the product and quotient rules for surds and simplify the result.",
  successCriteria: ["Multiply surds with √a × √b = √(ab).", "Use √a × √a = a.", "Divide surds with √a ÷ √b = √(a/b).", "Simplify the resulting surd or whole number."],
  teaching: {
    paragraphs: [
      "Surds multiply by combining what is under the roots: √a × √b = √(ab). So √2 × √3 = √6.",
      "A key special case is √a × √a = a, because √a × √a = √(a²) = a. For example √5 × √5 = 5.",
      "Surds divide the same way: √a ÷ √b = √(a/b). So √20 ÷ √5 = √4 = 2.",
      "After multiplying or dividing, always SIMPLIFY: √2 × √8 = √16 = 4, and √6 × √24 = √144 = 12. A neat product often becomes a whole number.",
    ],
    latexBlocks: ["\\sqrt{a}\\,\\sqrt{b} = \\sqrt{ab},\\qquad \\sqrt{a}\\,\\sqrt{a} = a", "\\sqrt{2}\\,\\sqrt{8} = \\sqrt{16} = 4", "\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\tfrac{a}{b}},\\quad \\sqrt{20} \\div \\sqrt{5} = \\sqrt{4} = 2"],
  },
  workedExamples: [
    { title: "Product becoming a whole number", questionLatex: "\\text{Simplify } \\sqrt{2} \\times \\sqrt{8}.", steps: [{ explanation: "Combine under one root.", latex: "\\sqrt{2 \\times 8} = \\sqrt{16}" }, { explanation: "Simplify.", latex: "= 4" }], finalAnswerLatex: "4" },
    { title: "Square of a surd", questionLatex: "\\text{Simplify } \\sqrt{3} \\times \\sqrt{3}.", steps: [{ explanation: "√a × √a = a.", latex: "\\sqrt{3}\\,\\sqrt{3} = 3" }], finalAnswerLatex: "3" },
    { title: "Dividing surds", questionLatex: "\\text{Simplify } \\sqrt{20} \\div \\sqrt{5}.", steps: [{ explanation: "Combine under one root.", latex: "\\sqrt{20/5} = \\sqrt{4}" }, { explanation: "Simplify.", latex: "= 2" }], finalAnswerLatex: "2" },
  ],
  guidedPractice: [
    mcq("y10-md-g1", "Simplify √2 × √3.", "A", ["$\\sqrt{6}$", "$\\sqrt{5}$", "$5$", "$6$"], 2, "√2 × √3 = √(2×3) = √6."),
    ans("y10-md-g2", "Simplify √5 × √5.", "\\sqrt{5}\\sqrt{5}", "5", 2, "√5 × √5 = 5.", ["5"]),
    ans("y10-md-g3", "Simplify √6 × √6.", "\\sqrt{6}\\sqrt{6}", "6", 2, "√6 × √6 = 6.", ["6"]),
    ans("y10-md-g4", "Simplify √12 ÷ √3.", "\\sqrt{12}\\div\\sqrt{3}", "2", 2, "√(12/3) = √4 = 2.", ["2"]),
  ],
  independentPractice: [
    mcq("y10-md-i1", "Simplify √3 × √12.", "C", ["$\\sqrt{15}$", "$\\sqrt{36}$", "$6$", "$36$"], 3, "√(3×12) = √36 = 6."),
    ans("y10-md-i2", "Simplify √2 × √18.", "\\sqrt{2}\\sqrt{18}", "6", 3, "√(2×18) = √36 = 6.", ["6"]),
    ans("y10-md-i3", "Simplify √8 × √2.", "\\sqrt{8}\\sqrt{2}", "4", 2, "√(8×2) = √16 = 4.", ["4"]),
    ans("y10-md-i4", "Simplify √50 ÷ √2.", "\\sqrt{50}\\div\\sqrt{2}", "5", 3, "√(50/2) = √25 = 5.", ["5"]),
    ans("y10-md-i5", "Simplify √7 × √7.", "\\sqrt{7}\\sqrt{7}", "7", 2, "√7 × √7 = 7.", ["7"]),
  ],
  masteryQuiz: [
    ans("y10-md-m1", "Simplify √3 × √27.", "\\sqrt{3}\\sqrt{27}", "9", 3, "√(3×27) = √81 = 9.", ["9"]),
    mcq("y10-md-m2", "Simplify √5 × √20.", "B", ["$\\sqrt{25}$", "$10$", "$5\\sqrt{4}$", "$25$"], 3, "√(5×20) = √100 = 10."),
    ans("y10-md-m3", "Simplify √2 × √2.", "\\sqrt{2}\\sqrt{2}", "2", 1, "√2 × √2 = 2.", ["2"]),
    ans("y10-md-m4", "Simplify √32 ÷ √2.", "\\sqrt{32}\\div\\sqrt{2}", "4", 3, "√(32/2) = √16 = 4.", ["4"]),
    mcq("y10-md-m5", "√a × √a equals:", "C", ["$2\\sqrt{a}$", "$\\sqrt{2a}$", "$a$", "$a^2$"], 2, "√a × √a = √(a²) = a."),
    ans("y10-md-m6", "Simplify √6 × √24.", "\\sqrt{6}\\sqrt{24}", "12", 4, "√(6×24) = √144 = 12.", ["12"]),
    ans("y10-md-m7", "Simplify √45 ÷ √5.", "\\sqrt{45}\\div\\sqrt{5}", "3", 3, "√(45/5) = √9 = 3.", ["3"]),
    mcq("y10-md-m8", "Simplify √2 × √8.", "A", ["$4$", "$\\sqrt{10}$", "$2\\sqrt{2}$", "$16$"], 2, "√(2×8) = √16 = 4."),
    ans("y10-md-m9", "Simplify √10 × √10.", "\\sqrt{10}\\sqrt{10}", "10", 1, "√10 × √10 = 10.", ["10"]),
    ans("y10-md-m10", "Simplify √48 ÷ √3.", "\\sqrt{48}\\div\\sqrt{3}", "4", 3, "√(48/3) = √16 = 4.", ["4"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying the roots separately and the outside, mixing them up.", fix: "√a × √b = √(ab): combine the numbers under one root." },
    { mistake: "Writing √a × √a = √a.", fix: "√a × √a = a (the root disappears)." },
    { mistake: "Forgetting to simplify the final root.", fix: "Simplify √16 to 4, √36 to 6, etc." },
    { mistake: "Dividing incorrectly.", fix: "√a ÷ √b = √(a/b); divide the numbers under one root." },
  ],
  masteryPassMark: 0.8,
};

// ── 4D Rationalising the Denominator (path) ────────────────────────────────────────────
const rationalisingDenominator: Partial<ExplicitLesson> = {
  description: "Rationalise a denominator containing a single surd by multiplying numerator and denominator by that surd.",
  learningIntention: "Remove a surd from a denominator by multiplying top and bottom by the surd.",
  successCriteria: ["Multiply numerator and denominator by the denominator's surd.", "Use √a × √a = a to clear the denominator.", "Simplify the resulting fraction.", "State why rationalising leaves the value unchanged."],
  teaching: {
    paragraphs: [
      "A surd in the DENOMINATOR is considered un-tidy. Rationalising removes it by multiplying the top and bottom by that same surd — which is multiplying by 1, so the value does not change.",
      "Because √a × √a = a, the denominator becomes a whole number. For 1/√2, multiply by √2/√2: (1 × √2)/(√2 × √2) = √2/2.",
      "If there is a number on top, it comes along: 2/√5 = (2√5)/(√5 × √5) = 2√5/5.",
      "Always simplify at the end. For 3/√3 = 3√3/3 = √3, and 6/√3 = 6√3/3 = 2√3 — the fraction often reduces neatly.",
    ],
    latexBlocks: ["\\frac{1}{\\sqrt{a}} \\times \\frac{\\sqrt{a}}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}", "\\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}", "\\frac{6}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}"],
  },
  workedExamples: [
    { title: "Basic rationalising", questionLatex: "\\text{Rationalise } \\frac{1}{\\sqrt{2}}.", steps: [{ explanation: "Multiply top and bottom by √2.", latex: "\\frac{1}{\\sqrt{2}} \\times \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}" }], finalAnswerLatex: "\\frac{\\sqrt{2}}{2}" },
    { title: "Number on top", questionLatex: "\\text{Rationalise } \\frac{2}{\\sqrt{5}}.", steps: [{ explanation: "Multiply by √5/√5.", latex: "\\frac{2\\sqrt{5}}{5}" }], finalAnswerLatex: "\\frac{2\\sqrt{5}}{5}" },
    { title: "Simplifying the result", questionLatex: "\\text{Rationalise } \\frac{3}{\\sqrt{3}}.", steps: [{ explanation: "Multiply by √3/√3.", latex: "\\frac{3\\sqrt{3}}{3}" }, { explanation: "Cancel the 3.", latex: "= \\sqrt{3}" }], finalAnswerLatex: "\\sqrt{3}" },
  ],
  guidedPractice: [
    mcq("y10-rd-g1", "To rationalise 1/√3, what do you multiply by?", "A", ["$\\tfrac{\\sqrt{3}}{\\sqrt{3}}$", "$\\tfrac{3}{3}$", "$\\sqrt{3}$", "$\\tfrac{1}{\\sqrt{3}}$"], 3, "Multiply top and bottom by √3 (i.e. by √3/√3 = 1) to clear the surd."),
    mcq("y10-rd-g2", "Rationalise 1/√2.", "B", ["$\\tfrac{1}{2}$", "$\\tfrac{\\sqrt{2}}{2}$", "$\\sqrt{2}$", "$2\\sqrt{2}$"], 3, "1/√2 × √2/√2 = √2/2."),
    mcq("y10-rd-g3", "Rationalise 1/√5.", "C", ["$\\tfrac{1}{5}$", "$5\\sqrt{5}$", "$\\tfrac{\\sqrt{5}}{5}$", "$\\sqrt{5}$"], 3, "1/√5 × √5/√5 = √5/5."),
    mcq("y10-rd-g4", "Rationalise 2/√2.", "A", ["$\\sqrt{2}$", "$\\tfrac{\\sqrt{2}}{2}$", "$2\\sqrt{2}$", "$\\tfrac{2}{\\sqrt{2}}$"], 3, "2/√2 = 2√2/2 = √2."),
  ],
  independentPractice: [
    mcq("y10-rd-i1", "Rationalise 6/√3.", "B", ["$\\tfrac{6\\sqrt{3}}{9}$", "$2\\sqrt{3}$", "$\\tfrac{\\sqrt{3}}{6}$", "$6\\sqrt{3}$"], 4, "6/√3 = 6√3/3 = 2√3."),
    mcq("y10-rd-i2", "Rationalise 1/√7.", "C", ["$\\tfrac{1}{7}$", "$\\sqrt{7}$", "$\\tfrac{\\sqrt{7}}{7}$", "$7\\sqrt{7}$"], 3, "1/√7 × √7/√7 = √7/7."),
    mcq("y10-rd-i3", "Rationalise 5/√5.", "A", ["$\\sqrt{5}$", "$\\tfrac{\\sqrt{5}}{5}$", "$5\\sqrt{5}$", "$\\tfrac{5}{\\sqrt{5}}$"], 3, "5/√5 = 5√5/5 = √5."),
    mcq("y10-rd-i4", "Rationalise 4/√2.", "B", ["$\\sqrt{2}$", "$2\\sqrt{2}$", "$4\\sqrt{2}$", "$\\tfrac{4\\sqrt{2}}{4}$"], 4, "4/√2 = 4√2/2 = 2√2."),
    mcq("y10-rd-i5", "Rationalise 3/√3.", "A", ["$\\sqrt{3}$", "$3\\sqrt{3}$", "$\\tfrac{\\sqrt{3}}{3}$", "$\\tfrac{3}{\\sqrt{3}}$"], 3, "3/√3 = 3√3/3 = √3."),
  ],
  masteryQuiz: [
    mcq("y10-rd-m1", "Rationalise 1/√6.", "C", ["$\\tfrac{1}{6}$", "$\\sqrt{6}$", "$\\tfrac{\\sqrt{6}}{6}$", "$6\\sqrt{6}$"], 3, "1/√6 × √6/√6 = √6/6."),
    mcq("y10-rd-m2", "Rationalise 10/√5.", "B", ["$\\sqrt{5}$", "$2\\sqrt{5}$", "$10\\sqrt{5}$", "$\\tfrac{\\sqrt{5}}{10}$"], 4, "10/√5 = 10√5/5 = 2√5."),
    mcq("y10-rd-m3", "Rationalise 1/√10.", "A", ["$\\tfrac{\\sqrt{10}}{10}$", "$\\tfrac{1}{10}$", "$\\sqrt{10}$", "$10\\sqrt{10}$"], 3, "1/√10 × √10/√10 = √10/10."),
    mcq("y10-rd-m4", "Rationalise 8/√2.", "B", ["$\\sqrt{2}$", "$4\\sqrt{2}$", "$8\\sqrt{2}$", "$2\\sqrt{2}$"], 4, "8/√2 = 8√2/2 = 4√2."),
    mcq("y10-rd-m5", "Rationalising removes the surd from the:", "B", ["numerator", "denominator", "whole fraction", "coefficient"], 2, "Rationalising clears the surd from the denominator."),
    mcq("y10-rd-m6", "Rationalise 1/√3.", "A", ["$\\tfrac{\\sqrt{3}}{3}$", "$\\tfrac{1}{3}$", "$\\sqrt{3}$", "$3\\sqrt{3}$"], 3, "1/√3 × √3/√3 = √3/3."),
    mcq("y10-rd-m7", "Rationalise 6/√2.", "C", ["$\\sqrt{2}$", "$6\\sqrt{2}$", "$3\\sqrt{2}$", "$\\tfrac{6\\sqrt{2}}{4}$"], 4, "6/√2 = 6√2/2 = 3√2."),
    mcq("y10-rd-m8", "1/√2 equals:", "B", ["$\\tfrac{1}{2}$", "$\\tfrac{\\sqrt{2}}{2}$", "$2$", "$\\sqrt{2}$"], 3, "1/√2 = √2/2."),
    mcq("y10-rd-m9", "Rationalise 12/√3.", "A", ["$4\\sqrt{3}$", "$\\sqrt{3}$", "$12\\sqrt{3}$", "$\\tfrac{12\\sqrt{3}}{9}$"], 4, "12/√3 = 12√3/3 = 4√3."),
    mcq("y10-rd-m10", "Rationalise 1/√11.", "C", ["$\\tfrac{1}{11}$", "$\\sqrt{11}$", "$\\tfrac{\\sqrt{11}}{11}$", "$11\\sqrt{11}$"], 3, "1/√11 × √11/√11 = √11/11."),
  ],
  commonMistakes: [
    { mistake: "Multiplying only the denominator by the surd.", fix: "Multiply BOTH top and bottom (by √a/√a = 1) so the value is unchanged." },
    { mistake: "Leaving the result unsimplified, e.g. 6√3/3.", fix: "Cancel the fraction: 6√3/3 = 2√3." },
    { mistake: "Thinking rationalising changes the value.", fix: "Multiplying by √a/√a = 1 keeps the value the same." },
    { mistake: "Forgetting √a × √a = a in the denominator.", fix: "The denominator √a becomes a after multiplying by √a." },
  ],
  masteryPassMark: 0.8,
};

// ── 4E Review of Length (core) ─────────────────────────────────────────────────────────
const reviewOfLength: Partial<ExplicitLesson> = {
  description: "Find perimeters and circle circumferences, and convert between length units.",
  learningIntention: "Calculate perimeter and circumference and convert between metric length units.",
  successCriteria: ["Find the perimeter of straight-sided shapes.", "Use C = 2πr or C = πd for a circle's circumference.", "Convert between mm, cm, m and km.", "Recall the metric conversion factors."],
  teaching: {
    paragraphs: [
      "Perimeter is the total distance around a shape — just add up all the side lengths. A rectangle with sides 5 and 3 has perimeter 5 + 3 + 5 + 3 = 16.",
      "For a circle, the perimeter is called the CIRCUMFERENCE: C = 2πr (using the radius) or C = πd (using the diameter, since d = 2r).",
      "Metric length units step by ×10, ×100, ×1000: 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km. To go to a SMALLER unit multiply; to a LARGER unit divide.",
      "Keep units consistent before adding. For circle problems, substitute the given value of π (often 3.14 or 22/7) as instructed.",
    ],
    latexBlocks: ["P = \\text{sum of all sides}", "C = 2\\pi r = \\pi d", "10\\,\\text{mm} = 1\\,\\text{cm},\\ 100\\,\\text{cm} = 1\\,\\text{m},\\ 1000\\,\\text{m} = 1\\,\\text{km}"],
  },
  workedExamples: [
    { title: "Perimeter of a rectangle", questionLatex: "\\text{Find the perimeter of a 5 by 3 rectangle.}", steps: [{ explanation: "Add all four sides.", latex: "5+3+5+3 = 16" }], finalAnswerLatex: "16" },
    { title: "Circumference", questionLatex: "\\text{Find the circumference of a circle with diameter 10 (use } \\pi = 3.14).", steps: [{ explanation: "C = πd.", latex: "3.14 \\times 10 = 31.4" }], finalAnswerLatex: "31.4" },
    { title: "Unit conversion", questionLatex: "\\text{Convert 250 cm to metres.}", steps: [{ explanation: "Divide by 100 (cm → m).", latex: "250 \\div 100 = 2.5" }], finalAnswerLatex: "2.5\\,\\text{m}" },
  ],
  guidedPractice: [
    mcq("y10-rl-g1", "Find the perimeter of a square with side 6.", "B", ["12", "24", "36", "18"], 1, "Perimeter = 4 × 6 = 24."),
    ans("y10-rl-g2", "Find the perimeter of an 8 by 2 rectangle.", "8 \\times 2 \\text{ rectangle}", "20", 2, "8 + 2 + 8 + 2 = 20.", ["20"]),
    ans("y10-rl-g3", "Convert 3 m to centimetres.", "3\\,\\text{m}", "300", 1, "3 × 100 = 300 cm.", ["300 cm"]),
    ans("y10-rl-g4", "Find the circumference of a circle with diameter 10 (use π = 3.14).", "C=\\pi d,\\ d=10", "31.4", 3, "C = 3.14 × 10 = 31.4.", ["31.4 cm", "31.4"]),
  ],
  independentPractice: [
    mcq("y10-rl-i1", "Convert 5000 m to kilometres.", "C", ["0.5", "50", "5", "500"], 2, "5000 ÷ 1000 = 5 km."),
    ans("y10-rl-i2", "Find the perimeter of a triangle with sides 3, 4 and 5.", "3,4,5", "12", 1, "3 + 4 + 5 = 12.", ["12"]),
    ans("y10-rl-i3", "Find the circumference of a circle with radius 5 (use π = 3.14).", "C=2\\pi r,\\ r=5", "31.4", 3, "C = 2 × 3.14 × 5 = 31.4.", ["31.4"]),
    ans("y10-rl-i4", "Convert 250 cm to metres.", "250\\,\\text{cm}", "2.5", 2, "250 ÷ 100 = 2.5 m.", ["2.5 m"]),
    ans("y10-rl-i5", "Find the perimeter of a rectangle with sides 6 and 4.", "6,4 \\text{ rectangle}", "20", 1, "6 + 4 + 6 + 4 = 20.", ["20"]),
  ],
  masteryQuiz: [
    ans("y10-rl-m1", "Find the perimeter of a square with side 9.", "\\text{square side }9", "36", 1, "4 × 9 = 36.", ["36"]),
    mcq("y10-rl-m2", "Convert 2 km to metres.", "B", ["200", "2000", "20000", "20"], 2, "2 × 1000 = 2000 m."),
    ans("y10-rl-m3", "Find the circumference of a circle with diameter 14 (use π = 22/7).", "C=\\pi d,\\ d=14", "44", 3, "C = 22/7 × 14 = 44.", ["44"]),
    ans("y10-rl-m4", "Find the perimeter of a 10 by 5 rectangle.", "10,5 \\text{ rectangle}", "30", 1, "10 + 5 + 10 + 5 = 30.", ["30"]),
    mcq("y10-rl-m5", "The circumference of a circle is given by:", "A", ["$2\\pi r$", "$\\pi r^2$", "$\\pi r$", "$4r$"], 2, "C = 2πr (or πd)."),
    ans("y10-rl-m6", "Convert 1500 mm to metres.", "1500\\,\\text{mm}", "1.5", 3, "1500 ÷ 1000 = 1.5 m.", ["1.5 m"]),
    ans("y10-rl-m7", "Find the perimeter of an equilateral triangle with side 7.", "\\text{side }7", "21", 1, "3 × 7 = 21.", ["21"]),
    mcq("y10-rl-m8", "Convert 4 m to centimetres.", "C", ["40", "4000", "400", "0.04"], 2, "4 × 100 = 400 cm."),
    ans("y10-rl-m9", "Find the circumference of a circle with radius 10 (use π = 3.14).", "C=2\\pi r,\\ r=10", "62.8", 3, "C = 2 × 3.14 × 10 = 62.8.", ["62.8"]),
    ans("y10-rl-m10", "Find the perimeter of a 12 by 3 rectangle.", "12,3 \\text{ rectangle}", "30", 1, "12 + 3 + 12 + 3 = 30.", ["30"]),
  ],
  commonMistakes: [
    { mistake: "Using πr² (area) for circumference.", fix: "Circumference is 2πr or πd; πr² is the area." },
    { mistake: "Multiplying when converting to a larger unit.", fix: "To a larger unit, DIVIDE (cm → m is ÷100)." },
    { mistake: "Forgetting a side when adding the perimeter.", fix: "Count every side; a rectangle has four." },
    { mistake: "Mixing units before adding.", fix: "Convert all lengths to the same unit first." },
  ],
  masteryPassMark: 0.8,
};

// ── 4F Pythagoras Including 3D (path) ──────────────────────────────────────────────────
const pythagoras3d: Partial<ExplicitLesson> = {
  description: "Apply Pythagoras' theorem in right triangles and to the space diagonal of a rectangular box.",
  learningIntention: "Use Pythagoras in 2D and extend it to the 3D space diagonal of a box.",
  successCriteria: ["Find the hypotenuse with c = √(a² + b²).", "Recognise Pythagorean triples.", "Apply the 3D rule d = √(l² + w² + h²).", "Evaluate the resulting square root."],
  teaching: {
    paragraphs: [
      "In a right-angled triangle, Pythagoras' theorem gives the hypotenuse (the longest side, opposite the right angle): c = √(a² + b²). For legs 3 and 4, c = √(9 + 16) = √25 = 5.",
      "Some side-sets come out whole — Pythagorean triples like 3-4-5, 5-12-13 and 8-15-17 are worth recognising.",
      "In THREE dimensions, the space diagonal of a rectangular box (corner to opposite corner) extends the rule with a third squared term: d = √(l² + w² + h²).",
      "For a 2 × 3 × 6 box: d = √(4 + 9 + 36) = √49 = 7. The method is the same — square each edge, add them, and take the square root.",
    ],
    latexBlocks: ["c = \\sqrt{a^2 + b^2}", "\\text{3-4-5},\\ \\text{5-12-13},\\ \\text{8-15-17 are triples}", "d = \\sqrt{l^2 + w^2 + h^2}"],
  },
  workedExamples: [
    { title: "2D hypotenuse", questionLatex: "\\text{Find the hypotenuse of a right triangle with legs 3 and 4.}", steps: [{ explanation: "Add the squares and root.", latex: "\\sqrt{3^2+4^2} = \\sqrt{25} = 5" }], finalAnswerLatex: "5" },
    { title: "Another triple", questionLatex: "\\text{Find the hypotenuse with legs 6 and 8.}", steps: [{ explanation: "√(36 + 64).", latex: "\\sqrt{100} = 10" }], finalAnswerLatex: "10" },
    { title: "3D space diagonal", questionLatex: "\\text{Find the space diagonal of a } 2 \\times 3 \\times 6 \\text{ box.}", steps: [{ explanation: "Square each edge and add.", latex: "4 + 9 + 36 = 49" }, { explanation: "Take the square root.", latex: "\\sqrt{49} = 7" }], finalAnswerLatex: "7" },
  ],
  guidedPractice: [
    mcq("y10-p3-g1", "Find the hypotenuse of a right triangle with legs 3 and 4.", "B", ["7", "5", "25", "12"], 1, "√(9 + 16) = √25 = 5."),
    ans("y10-p3-g2", "Find the hypotenuse of a right triangle with legs 5 and 12.", "5,12", "13", 2, "√(25 + 144) = √169 = 13.", ["13"]),
    ans("y10-p3-g3", "Find the hypotenuse of a right triangle with legs 8 and 15.", "8,15", "17", 2, "√(64 + 225) = √289 = 17.", ["17"]),
    ans("y10-p3-g4", "Find the space diagonal of a 1 × 2 × 2 box.", "1,2,2 \\text{ box}", "3", 3, "√(1 + 4 + 4) = √9 = 3.", ["3"]),
  ],
  independentPractice: [
    mcq("y10-p3-i1", "Find the hypotenuse of a right triangle with legs 9 and 12.", "A", ["15", "21", "13", "144"], 2, "√(81 + 144) = √225 = 15."),
    ans("y10-p3-i2", "Find the hypotenuse of a right triangle with legs 7 and 24.", "7,24", "25", 3, "√(49 + 576) = √625 = 25.", ["25"]),
    ans("y10-p3-i3", "Find the space diagonal of a 3 × 4 × 12 box.", "3,4,12 \\text{ box}", "13", 4, "√(9 + 16 + 144) = √169 = 13.", ["13"]),
    ans("y10-p3-i4", "Find the hypotenuse of a right triangle with legs 20 and 21.", "20,21", "29", 3, "√(400 + 441) = √841 = 29.", ["29"]),
    ans("y10-p3-i5", "Find the space diagonal of a 2 × 6 × 9 box.", "2,6,9 \\text{ box}", "11", 4, "√(4 + 36 + 81) = √121 = 11.", ["11"]),
  ],
  masteryQuiz: [
    ans("y10-p3-m1", "Find the hypotenuse of a right triangle with legs 6 and 8.", "6,8", "10", 1, "√(36 + 64) = √100 = 10.", ["10"]),
    mcq("y10-p3-m2", "The space diagonal of a box is found using:", "C", ["$\\sqrt{l^2+w^2}$", "$l+w+h$", "$\\sqrt{l^2+w^2+h^2}$", "$lwh$"], 2, "d = √(l² + w² + h²)."),
    ans("y10-p3-m3", "Find the space diagonal of a 4 × 4 × 7 box.", "4,4,7 \\text{ box}", "9", 4, "√(16 + 16 + 49) = √81 = 9.", ["9"]),
    ans("y10-p3-m4", "Find the hypotenuse of a right triangle with legs 10 and 24.", "10,24", "26", 3, "√(100 + 576) = √676 = 26.", ["26"]),
    mcq("y10-p3-m5", "Find the hypotenuse of a right triangle with legs 3 and 4.", "B", ["6", "5", "7", "12"], 1, "√(9 + 16) = 5."),
    ans("y10-p3-m6", "Find the space diagonal of a 1 × 4 × 8 box.", "1,4,8 \\text{ box}", "9", 4, "√(1 + 16 + 64) = √81 = 9.", ["9"]),
    ans("y10-p3-m7", "Find the hypotenuse of a right triangle with legs 9 and 40.", "9,40", "41", 3, "√(81 + 1600) = √1681 = 41.", ["41"]),
    mcq("y10-p3-m8", "Find the space diagonal of a 2 × 3 × 6 box.", "A", ["7", "11", "8", "5"], 3, "√(4 + 9 + 36) = √49 = 7."),
    ans("y10-p3-m9", "Find the hypotenuse of a right triangle with legs 12 and 16.", "12,16", "20", 2, "√(144 + 256) = √400 = 20.", ["20"]),
    ans("y10-p3-m10", "Find the space diagonal of a 6 × 6 × 7 box.", "6,6,7 \\text{ box}", "11", 4, "√(36 + 36 + 49) = √121 = 11.", ["11"]),
  ],
  commonMistakes: [
    { mistake: "Only using two terms for a 3D diagonal.", fix: "The space diagonal uses all three edges: √(l² + w² + h²)." },
    { mistake: "Forgetting the square root.", fix: "After adding the squares, take the square root." },
    { mistake: "Adding the sides instead of their squares.", fix: "Square each side first, then add." },
    { mistake: "Mislabelling the hypotenuse.", fix: "The hypotenuse is the longest side, opposite the right angle." },
  ],
  masteryPassMark: 0.8,
};

// ── 4G Area of Triangles, Quadrilaterals, Circles and Sectors (core) ───────────────────
const areaShapes: Partial<ExplicitLesson> = {
  description: "Find areas of rectangles, triangles, circles and sectors.",
  learningIntention: "Apply area formulas for rectangles, triangles, circles and sectors.",
  successCriteria: ["Find the area of a rectangle and a triangle.", "Use A = πr² for a circle.", "Find a sector area as a fraction of a circle.", "Substitute the given value of π."],
  teaching: {
    paragraphs: [
      "Area measures the space inside a shape. A rectangle is length × width; a triangle is half of that base × height: A = ½bh.",
      "A circle's area uses the radius: A = πr². With r = 5 and π = 3.14, A = 3.14 × 25 = 78.5.",
      "A SECTOR is a 'slice' of a circle. Its area is the matching fraction of the whole circle: A = (θ/360) × πr², where θ is the angle of the slice.",
      "For a 90° sector with r = 4: that is a quarter circle, so A = ¼ × 3.14 × 16 = 12.56. Always substitute the value of π you are told to use.",
    ],
    latexBlocks: ["A_{\\text{rectangle}} = lw,\\qquad A_{\\text{triangle}} = \\tfrac{1}{2}bh", "A_{\\text{circle}} = \\pi r^2", "A_{\\text{sector}} = \\frac{\\theta}{360}\\,\\pi r^2"],
  },
  workedExamples: [
    { title: "Triangle area", questionLatex: "\\text{Find the area of a triangle with base 6 and height 4.}", steps: [{ explanation: "A = ½bh.", latex: "\\tfrac{1}{2} \\times 6 \\times 4 = 12" }], finalAnswerLatex: "12" },
    { title: "Circle area", questionLatex: "\\text{Find the area of a circle with radius 5 (use } \\pi = 3.14).", steps: [{ explanation: "A = πr².", latex: "3.14 \\times 5^2 = 3.14 \\times 25 = 78.5" }], finalAnswerLatex: "78.5" },
    { title: "Sector area", questionLatex: "\\text{Find the area of a } 90^\\circ \\text{ sector, radius 4 (use } \\pi = 3.14).", steps: [{ explanation: "90° is a quarter circle.", latex: "\\tfrac{90}{360} \\times 3.14 \\times 16" }, { explanation: "Evaluate.", latex: "= \\tfrac{1}{4} \\times 50.24 = 12.56" }], finalAnswerLatex: "12.56" },
  ],
  guidedPractice: [
    mcq("y10-ar-g1", "Find the area of a triangle with base 10 and height 4.", "B", ["40", "20", "14", "28"], 1, "A = ½ × 10 × 4 = 20."),
    ans("y10-ar-g2", "Find the area of a 7 by 3 rectangle.", "7 \\times 3", "21", 1, "7 × 3 = 21.", ["21"]),
    ans("y10-ar-g3", "Find the area of a circle with radius 10 (use π = 3.14).", "A=\\pi r^2,\\ r=10", "314", 3, "3.14 × 100 = 314.", ["314"]),
    ans("y10-ar-g4", "Find the area of a triangle with base 8 and height 5.", "b=8,h=5", "20", 1, "½ × 8 × 5 = 20.", ["20"]),
  ],
  independentPractice: [
    mcq("y10-ar-i1", "Find the area of a circle with radius 2 (use π = 3.14).", "A", ["12.56", "6.28", "12.4", "4"], 3, "3.14 × 4 = 12.56."),
    ans("y10-ar-i2", "Find the area of a triangle with base 12 and height 6.", "b=12,h=6", "36", 2, "½ × 12 × 6 = 36.", ["36"]),
    ans("y10-ar-i3", "Find the area of a square with side 9.", "\\text{side }9", "81", 1, "9 × 9 = 81.", ["81"]),
    ans("y10-ar-i4", "Find the area of a 180° sector with radius 6 (use π = 3.14).", "\\tfrac{180}{360}\\pi r^2", "56.52", 4, "½ × 3.14 × 36 = 56.52.", ["56.52"]),
    ans("y10-ar-i5", "Find the area of a 15 by 4 rectangle.", "15 \\times 4", "60", 1, "15 × 4 = 60.", ["60"]),
  ],
  masteryQuiz: [
    ans("y10-ar-m1", "Find the area of a triangle with base 14 and height 10.", "b=14,h=10", "70", 2, "½ × 14 × 10 = 70.", ["70"]),
    mcq("y10-ar-m2", "The area of a circle is given by:", "B", ["$2\\pi r$", "$\\pi r^2$", "$\\pi d$", "$\\tfrac{1}{2}\\pi r$"], 2, "Area = πr²."),
    ans("y10-ar-m3", "Find the area of a circle with radius 3 (use π = 3.14).", "A=\\pi r^2,\\ r=3", "28.26", 3, "3.14 × 9 = 28.26.", ["28.26"]),
    ans("y10-ar-m4", "Find the area of a 20 by 5 rectangle.", "20 \\times 5", "100", 1, "20 × 5 = 100.", ["100"]),
    mcq("y10-ar-m5", "The area of a triangle is:", "A", ["$\\tfrac{1}{2}bh$", "$bh$", "$2bh$", "$b+h$"], 1, "A = ½ × base × height."),
    ans("y10-ar-m6", "Find the area of a 90° sector with radius 2 (use π = 3.14).", "\\tfrac{90}{360}\\pi r^2", "3.14", 4, "¼ × 3.14 × 4 = 3.14.", ["3.14"]),
    ans("y10-ar-m7", "Find the area of a triangle with base 9 and height 8.", "b=9,h=8", "36", 2, "½ × 9 × 8 = 36.", ["36"]),
    mcq("y10-ar-m8", "Find the area of a square with side 7.", "C", ["28", "14", "49", "21"], 1, "7 × 7 = 49."),
    ans("y10-ar-m9", "Find the area of a circle with radius 1 (use π = 3.14).", "A=\\pi r^2,\\ r=1", "3.14", 2, "3.14 × 1 = 3.14.", ["3.14"]),
    ans("y10-ar-m10", "Find the area of a 6 by 11 rectangle.", "6 \\times 11", "66", 1, "6 × 11 = 66.", ["66"]),
  ],
  commonMistakes: [
    { mistake: "Forgetting the ½ in the triangle area.", fix: "A triangle is half of base × height: ½bh." },
    { mistake: "Using 2πr (circumference) for circle area.", fix: "Area is πr²; 2πr is the circumference." },
    { mistake: "Squaring the diameter instead of the radius.", fix: "Use the RADIUS in πr²; halve the diameter first if needed." },
    { mistake: "Forgetting the fraction for a sector.", fix: "Multiply the full circle area by θ/360." },
  ],
  masteryPassMark: 0.8,
};

// ── 4H Accuracy of Measuring Instruments (core) ────────────────────────────────────────
const accuracyInstruments: Partial<ExplicitLesson> = {
  description: "Determine the absolute error and limits of accuracy of a measurement from the instrument's smallest unit.",
  learningIntention: "Find the absolute error and limits of accuracy of a recorded measurement.",
  successCriteria: ["Identify the smallest unit an instrument measures to.", "State the absolute error as half the smallest unit.", "Find the lower and upper limits of accuracy.", "Apply this to lengths, masses and rounded values."],
  teaching: {
    paragraphs: [
      "No measuring instrument is perfectly precise. The ABSOLUTE ERROR is half of the smallest unit the instrument can measure. A ruler marked in centimetres has an absolute error of ±0.5 cm.",
      "This sets the LIMITS OF ACCURACY: a measurement could be anywhere within ± the absolute error of the recorded value. A length recorded as 12 cm (to the nearest cm) lies between 11.5 cm and 12.5 cm.",
      "So: smallest unit → halve it for the error → add and subtract from the measurement for the limits. To the nearest mm, the error is ±0.5 mm; to the nearest 0.1, the error is ±0.05.",
      "If a value is rounded to the nearest 10, the smallest unit is 10, so the error is 5: 30 (nearest 10) lies between 25 and 35.",
    ],
    latexBlocks: ["\\text{absolute error} = \\tfrac{1}{2} \\times \\text{smallest unit}", "\\text{limits} = \\text{measurement} \\pm \\text{absolute error}", "12\\,\\text{cm (nearest cm)}: 11.5 \\le x < 12.5"],
  },
  workedExamples: [
    { title: "Absolute error", questionLatex: "\\text{A length is measured to the nearest cm. What is the absolute error?}", steps: [{ explanation: "Half the smallest unit (1 cm).", latex: "\\tfrac{1}{2} \\times 1 = 0.5\\,\\text{cm}" }], finalAnswerLatex: "\\pm 0.5\\,\\text{cm}" },
    { title: "Limits of accuracy", questionLatex: "\\text{A length is recorded as 8 cm (nearest cm). Find the limits.}", steps: [{ explanation: "Error ±0.5; subtract and add.", latex: "8 - 0.5 = 7.5,\\quad 8 + 0.5 = 8.5" }], finalAnswerLatex: "7.5\\,\\text{ to }8.5\\,\\text{cm}" },
    { title: "Rounded to the nearest 10", questionLatex: "\\text{A value is 30 (nearest 10). Find the error.}", steps: [{ explanation: "Half of 10.", latex: "\\tfrac{1}{2} \\times 10 = 5" }], finalAnswerLatex: "\\pm 5" },
  ],
  guidedPractice: [
    mcq("y10-ai-g1", "A length measured to the nearest cm has an absolute error of:", "B", ["±1 cm", "±0.5 cm", "±0.05 cm", "±2 cm"], 2, "Half the smallest unit (1 cm) is ±0.5 cm."),
    ans("y10-ai-g2", "A length is 8 cm (nearest cm). What is the lower limit of accuracy (in cm)?", "8\\,\\text{cm}", "7.5", 2, "8 − 0.5 = 7.5 cm.", ["7.5 cm"]),
    ans("y10-ai-g3", "A length is 8 cm (nearest cm). What is the upper limit (in cm)?", "8\\,\\text{cm}", "8.5", 2, "8 + 0.5 = 8.5 cm.", ["8.5 cm"]),
    ans("y10-ai-g4", "An instrument measures to the nearest cm. What is the absolute error (in cm)?", "\\text{nearest cm}", "0.5", 2, "Half of 1 cm = 0.5 cm.", ["0.5 cm"]),
  ],
  independentPractice: [
    mcq("y10-ai-i1", "A length is 15 cm (nearest cm). The limits of accuracy are:", "A", ["14.5 to 15.5 cm", "14 to 16 cm", "15 to 16 cm", "14.95 to 15.05 cm"], 3, "15 ± 0.5 = 14.5 to 15.5 cm."),
    ans("y10-ai-i2", "An instrument measures to the nearest mm. What is the absolute error (in mm)?", "\\text{nearest mm}", "0.5", 2, "Half of 1 mm = 0.5 mm.", ["0.5 mm"]),
    ans("y10-ai-i3", "A length is 20 m (nearest m). What is the lower limit (in m)?", "20\\,\\text{m}", "19.5", 2, "20 − 0.5 = 19.5 m.", ["19.5 m"]),
    ans("y10-ai-i4", "A value is measured to the nearest 0.1. What is the absolute error?", "\\text{nearest }0.1", "0.05", 3, "Half of 0.1 = 0.05.", ["0.05"]),
    ans("y10-ai-i5", "A mass is 100 g (nearest g). What is the upper limit (in g)?", "100\\,\\text{g}", "100.5", 2, "100 + 0.5 = 100.5 g.", ["100.5 g"]),
  ],
  masteryQuiz: [
    mcq("y10-ai-m1", "A value measured to the nearest 10 has an absolute error of:", "C", ["1", "10", "5", "0.5"], 3, "Half of 10 = 5."),
    ans("y10-ai-m2", "A length is 50 cm (nearest cm). What is the lower limit (in cm)?", "50\\,\\text{cm}", "49.5", 2, "50 − 0.5 = 49.5 cm.", ["49.5 cm"]),
    ans("y10-ai-m3", "A value is measured to the nearest 0.1. What is the absolute error?", "\\text{nearest }0.1", "0.05", 3, "Half of 0.1 = 0.05.", ["0.05"]),
    mcq("y10-ai-m4", "The limits of accuracy of 12 (nearest unit) are:", "A", ["11.5 to 12.5", "11 to 13", "12 to 13", "11.95 to 12.05"], 3, "12 ± 0.5 = 11.5 to 12.5."),
    ans("y10-ai-m5", "A length is 7 m (nearest m). What is the upper limit (in m)?", "7\\,\\text{m}", "7.5", 2, "7 + 0.5 = 7.5 m.", ["7.5 m"]),
    ans("y10-ai-m6", "An instrument measures to the nearest 2 cm. What is the absolute error (in cm)?", "\\text{nearest }2\\,\\text{cm}", "1", 3, "Half of 2 cm = 1 cm.", ["1 cm"]),
    mcq("y10-ai-m7", "The absolute error is half the:", "B", ["measurement", "smallest unit", "upper limit", "rounding"], 2, "Absolute error = ½ × smallest unit."),
    ans("y10-ai-m8", "A value is 30 (nearest 10). What is the lower limit?", "30\\,(\\text{nearest }10)", "25", 3, "Error 5, so 30 − 5 = 25.", ["25"]),
    ans("y10-ai-m9", "A length is 6.0 cm (nearest 0.1 cm). What is the absolute error (in cm)?", "\\text{nearest }0.1\\,\\text{cm}", "0.05", 3, "Half of 0.1 = 0.05 cm.", ["0.05 cm"]),
    mcq("y10-ai-m10", "A value is 200 (nearest 100). Its limits of accuracy are:", "A", ["150 to 250", "199.5 to 200.5", "100 to 300", "195 to 205"], 4, "Error = half of 100 = 50, so 150 to 250."),
  ],
  commonMistakes: [
    { mistake: "Using the whole smallest unit as the error.", fix: "The absolute error is HALF the smallest unit." },
    { mistake: "Forgetting to halve when the unit is not 1.", fix: "Nearest 10 → error 5; nearest 0.1 → error 0.05." },
    { mistake: "Adding/subtracting the wrong amount for the limits.", fix: "Limits = measurement ± absolute error." },
    { mistake: "Confusing precision with the measurement value.", fix: "Precision depends on the instrument's smallest unit, not the size of the reading." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "review-index-laws": reviewIndexLaws,
  "negative-indices": negativeIndices,
  "scientific-notation-y10": scientificNotation,
  "fractional-indices": fractionalIndices,
  "exponential-equations": exponentialEquations,
  "irrational-numbers-surds": irrationalSurds,
  "adding-subtracting-surds": addSubtractSurds,
  "multiplying-dividing-surds": multiplyDivideSurds,
  "rationalising-denominator": rationalisingDenominator,
  "review-of-length": reviewOfLength,
  "pythagoras-3d": pythagoras3d,
  "area-triangles-quads-circles-sectors": areaShapes,
  "accuracy-measuring-instruments": accuracyInstruments,
};

export function year10IndicesSurdsMeasurementWave2LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    !["indices-exponentials-logarithms", "measurement-and-surds"].includes(unit.slug)
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
