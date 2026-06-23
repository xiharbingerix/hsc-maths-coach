// Year 9 Wave 10 — Chapter 9 (Quadratic Expressions & Algebraic Techniques), expanding/DOTS sections
// (ADR-Y9-001, all path): expanding-binomial-products, perfect-squares-difference-of-squares,
// factorising-algebraic-expressions, factorising-difference-of-squares. Full per-subtopic contract.
// Unique id prefixes (ebp/psd/fae/fds) avoid clashes with Chapter 2/6 algebra ids.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Expand with the distributive law (every term by every term); factorise by reversing it.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the rule.", explanation };
}
// unicode-superscript accept variant for quadratics like "x^2+5x+6"
const q2 = (s: string) => [s, s.replace(/\^2/g, "²"), s.replace(/\s+/g, "")];
// two-factor product, accept reversed order
const ff = (a: string, b: string) => [`${a}${b}`, `${b}${a}`, `${a}${b}`.replace(/\s+/g, ""), `${b}${a}`.replace(/\s+/g, "")];

// ── expanding-binomial-products (path) ─────────────────────────────────────────────────
const expandingBinomial: Partial<ExplicitLesson> = {
  description: "Expand binomial products (a + b)(c + d) by multiplying every term and collecting.",
  learningIntention: "Expand and simplify products of two binomials.",
  successCriteria: ["Multiply each term in the first bracket by each in the second.", "Collect the middle terms.", "Handle negative terms.", "Expand products giving a difference of squares."],
  teaching: {
    paragraphs: [
      "To expand (a + b)(c + d), multiply EVERY term in the first bracket by EVERY term in the second (often remembered as FOIL: First, Outer, Inner, Last), then collect like terms.",
      "(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.",
      "Watch signs: (x + 5)(x − 2) = x² − 2x + 5x − 10 = x² + 3x − 10.",
      "With coefficients: (2x + 1)(x + 4) = 2x² + 8x + x + 4 = 2x² + 9x + 4.",
    ],
    latexBlocks: ["(a+b)(c+d) = ac + ad + bc + bd", "(x+2)(x+3) = x^2 + 5x + 6"],
  },
  workedExamples: [
    { title: "Both positive", questionLatex: "(x+2)(x+3)", steps: [{ explanation: "FOIL, collect.", latex: "x^2 + 5x + 6" }], finalAnswerLatex: "x^2+5x+6" },
    { title: "Mixed signs", questionLatex: "(x+5)(x-2)", steps: [{ explanation: "FOIL, collect.", latex: "x^2 + 3x - 10" }], finalAnswerLatex: "x^2+3x-10" },
    { title: "With coefficient", questionLatex: "(2x+1)(x+4)", steps: [{ explanation: "FOIL, collect.", latex: "2x^2 + 9x + 4" }], finalAnswerLatex: "2x^2+9x+4" },
  ],
  guidedPractice: [
    ans("y9-ebp-g1", "Expand (x + 1)(x + 2).", "(x+1)(x+2)", "x^2+3x+2", 3, "x²+2x+x+2.", q2("x^2+3x+2")),
    ans("y9-ebp-g2", "Expand (x + 3)(x + 4).", "(x+3)(x+4)", "x^2+7x+12", 3, "x²+7x+12.", q2("x^2+7x+12")),
    ans("y9-ebp-g3", "Expand (x − 1)(x − 2).", "(x-1)(x-2)", "x^2-3x+2", 3, "x²−3x+2.", q2("x^2-3x+2")),
    mcq("y9-ebp-g4", "Expanding (a + b)(c + d) means multiplying:", "A", ["every term by every term", "only the first terms", "only the last terms", "the brackets' sums"], 2, "Each term by each term."),
  ],
  independentPractice: [
    ans("y9-ebp-i1", "Expand (x + 2)(x + 5).", "(x+2)(x+5)", "x^2+7x+10", 3, "x²+7x+10.", q2("x^2+7x+10")),
    ans("y9-ebp-i2", "Expand (x − 3)(x + 4).", "(x-3)(x+4)", "x^2+x-12", 3, "x²+x−12.", q2("x^2+x-12")),
    ans("y9-ebp-i3", "Expand (2x + 1)(x + 3).", "(2x+1)(x+3)", "2x^2+7x+3", 4, "2x²+7x+3.", q2("2x^2+7x+3")),
    ans("y9-ebp-i4", "Expand (x + 6)(x − 6).", "(x+6)(x-6)", "x^2-36", 3, "Difference of squares: x²−36.", q2("x^2-36")),
    mcq("y9-ebp-i5", "The expansion of (x + 1)(x + 1) is:", "B", ["x² + 1", "x² + 2x + 1", "x² + x + 1", "2x + 2"], 3, "(x+1)² = x²+2x+1."),
  ],
  masteryQuiz: [
    ans("y9-ebp-m1", "Expand (x + 2)(x + 3).", "(x+2)(x+3)", "x^2+5x+6", 3, "x²+5x+6.", q2("x^2+5x+6")),
    ans("y9-ebp-m2", "Expand (x + 5)(x − 2).", "(x+5)(x-2)", "x^2+3x-10", 3, "x²+3x−10.", q2("x^2+3x-10")),
    ans("y9-ebp-m3", "Expand (x − 4)(x − 5).", "(x-4)(x-5)", "x^2-9x+20", 3, "x²−9x+20.", q2("x^2-9x+20")),
    ans("y9-ebp-m4", "Expand (2x + 3)(x + 1).", "(2x+3)(x+1)", "2x^2+5x+3", 4, "2x²+5x+3.", q2("2x^2+5x+3")),
    mcq("y9-ebp-m5", "(x + 4)(x − 4) expands to:", "C", ["x² + 16", "x² − 8x − 16", "x² − 16", "x² + 8x + 16"], 3, "Difference of squares."),
    ans("y9-ebp-m6", "Expand (x + 7)(x + 2).", "(x+7)(x+2)", "x^2+9x+14", 3, "x²+9x+14.", q2("x^2+9x+14")),
    ans("y9-ebp-m7", "Expand (x − 6)(x + 3).", "(x-6)(x+3)", "x^2-3x-18", 3, "x²−3x−18.", q2("x^2-3x-18")),
    ans("y9-ebp-m8", "Expand (3x + 1)(x + 2).", "(3x+1)(x+2)", "3x^2+7x+2", 4, "3x²+7x+2.", q2("3x^2+7x+2")),
    ans("y9-ebp-m9", "Expand (x + 1)(x − 1).", "(x+1)(x-1)", "x^2-1", 3, "x²−1.", q2("x^2-1")),
    mcq("y9-ebp-m10", "The middle term of (x + 3)(x + 5) is:", "A", ["8x", "15x", "2x", "x"], 3, "3x + 5x = 8x."),
  ],
  masteryQuizPool: [
    ans("y9-ebp-p1", "Expand (3x + 2)(2x − 5).", "(3x+2)(2x-5)", "6x^2-11x-10", 5, "6x²−15x+4x−10 = 6x²−11x−10.", q2("6x^2-11x-10")),
    ans("y9-ebp-p2", "Expand (2x − 3)(3x + 4).", "(2x-3)(3x+4)", "6x^2-x-12", 5, "6x²+8x−9x−12 = 6x²−x−12.", q2("6x^2-x-12")),
    ans("y9-ebp-p3", "Expand (x + 4)(x − 3).", "(x+4)(x-3)", "x^2+x-12", 5, "x²+x−12.", q2("x^2+x-12")),
    ans("y9-ebp-p4", "Expand (5x − 1)(x + 2).", "(5x-1)(x+2)", "5x^2+9x-2", 5, "5x²+10x−x−2 = 5x²+9x−2.", q2("5x^2+9x-2")),
    ans("y9-ebp-p5", "Expand (2x + 5)(2x − 5).", "(2x+5)(2x-5)", "4x^2-25", 5, "Difference of squares: 4x²−25.", q2("4x^2-25")),
    ans("y9-ebp-p6", "Expand (4x + 1)(2x + 3).", "(4x+1)(2x+3)", "8x^2+14x+3", 5, "8x²+12x+2x+3 = 8x²+14x+3.", q2("8x^2+14x+3")),
    ans("y9-ebp-p7", "Expand (x − 7)(x − 1).", "(x-7)(x-1)", "x^2-8x+7", 5, "x²−8x+7.", q2("x^2-8x+7")),
    ans("y9-ebp-p8", "Expand and simplify (x + 2)(x + 3) + (x + 1)(x − 1).", "(x+2)(x+3)+(x+1)(x-1)", "2x^2+5x+5", 5, "(x²+5x+6)+(x²−1) = 2x²+5x+5.", q2("2x^2+5x+5")),
    ans("y9-ebp-p9", "Expand (3x − 2)(3x + 2).", "(3x-2)(3x+2)", "9x^2-4", 5, "9x²−4.", q2("9x^2-4")),
    ans("y9-ebp-p10", "Expand (2x + 3)(x − 4).", "(2x+3)(x-4)", "2x^2-5x-12", 5, "2x²−8x+3x−12 = 2x²−5x−12.", q2("2x^2-5x-12")),
  ],
  commonMistakes: [
    { mistake: "Only multiplying the first and last terms.", fix: "Multiply all four products (FOIL)." },
    { mistake: "Sign errors on the inner/outer terms.", fix: "Track each sign carefully." },
    { mistake: "Forgetting to collect the middle terms.", fix: "Add the two x-terms." },
    { mistake: "Writing (x + a)(x − a) with a middle term.", fix: "It is a difference of squares: x² − a²." },
  ],
  masteryPassMark: 0.8,
};

// ── perfect-squares-difference-of-squares (path) ───────────────────────────────────────
const perfectSquaresDots: Partial<ExplicitLesson> = {
  description: "Expand perfect squares (a ± b)² and difference-of-squares products (a + b)(a − b).",
  learningIntention: "Use the special-product patterns.",
  successCriteria: ["Expand (a + b)² = a² + 2ab + b².", "Expand (a − b)² = a² − 2ab + b².", "Expand (a + b)(a − b) = a² − b².", "Apply with coefficients."],
  teaching: {
    paragraphs: [
      "A PERFECT SQUARE: (a + b)² = a² + 2ab + b². So (x + 3)² = x² + 6x + 9 (the middle term is twice the product).",
      "Similarly (a − b)² = a² − 2ab + b²: (x − 4)² = x² − 8x + 16.",
      "DIFFERENCE OF SQUARES: (a + b)(a − b) = a² − b² (no middle term): (x + 5)(x − 5) = x² − 25.",
      "These patterns also work with coefficients: (2x + 3)² = 4x² + 12x + 9.",
    ],
    latexBlocks: ["(a+b)^2 = a^2 + 2ab + b^2", "(a+b)(a-b) = a^2 - b^2"],
  },
  workedExamples: [
    { title: "Perfect square", questionLatex: "(x+3)^2", steps: [{ explanation: "x² + 2(3)x + 9.", latex: "x^2 + 6x + 9" }], finalAnswerLatex: "x^2+6x+9" },
    { title: "Minus", questionLatex: "(x-4)^2", steps: [{ explanation: "x² − 8x + 16.", latex: "x^2 - 8x + 16" }], finalAnswerLatex: "x^2-8x+16" },
    { title: "DOTS", questionLatex: "(x+5)(x-5)", steps: [{ explanation: "x² − 25.", latex: "x^2 - 25" }], finalAnswerLatex: "x^2-25" },
  ],
  guidedPractice: [
    ans("y9-psd-g1", "Expand (x + 2)².", "(x+2)^2", "x^2+4x+4", 3, "x²+4x+4.", q2("x^2+4x+4")),
    ans("y9-psd-g2", "Expand (x − 1)².", "(x-1)^2", "x^2-2x+1", 3, "x²−2x+1.", q2("x^2-2x+1")),
    ans("y9-psd-g3", "Expand (x + 7)(x − 7).", "(x+7)(x-7)", "x^2-49", 3, "x²−49.", q2("x^2-49")),
    mcq("y9-psd-g4", "(a + b)² equals:", "B", ["a² + b²", "a² + 2ab + b²", "a² − b²", "2a + 2b"], 2, "a² + 2ab + b²."),
  ],
  independentPractice: [
    ans("y9-psd-i1", "Expand (x + 5)².", "(x+5)^2", "x^2+10x+25", 3, "x²+10x+25.", q2("x^2+10x+25")),
    ans("y9-psd-i2", "Expand (x − 3)².", "(x-3)^2", "x^2-6x+9", 3, "x²−6x+9.", q2("x^2-6x+9")),
    ans("y9-psd-i3", "Expand (x + 8)(x − 8).", "(x+8)(x-8)", "x^2-64", 3, "x²−64.", q2("x^2-64")),
    ans("y9-psd-i4", "Expand (2x + 1)².", "(2x+1)^2", "4x^2+4x+1", 4, "4x²+4x+1.", q2("4x^2+4x+1")),
    mcq("y9-psd-i5", "(a + b)(a − b) equals:", "C", ["a² + 2ab + b²", "a² − 2ab + b²", "a² − b²", "a² + b²"], 2, "Difference of squares."),
  ],
  masteryQuiz: [
    ans("y9-psd-m1", "Expand (x + 3)².", "(x+3)^2", "x^2+6x+9", 3, "x²+6x+9.", q2("x^2+6x+9")),
    ans("y9-psd-m2", "Expand (x − 4)².", "(x-4)^2", "x^2-8x+16", 3, "x²−8x+16.", q2("x^2-8x+16")),
    ans("y9-psd-m3", "Expand (x + 6)(x − 6).", "(x+6)(x-6)", "x^2-36", 3, "x²−36.", q2("x^2-36")),
    ans("y9-psd-m4", "Expand (3x + 1)².", "(3x+1)^2", "9x^2+6x+1", 4, "9x²+6x+1.", q2("9x^2+6x+1")),
    mcq("y9-psd-m5", "The middle term of (x − 5)² is:", "A", ["−10x", "10x", "−25x", "−5x"], 3, "2(−5)x = −10x."),
    ans("y9-psd-m6", "Expand (x − 2)².", "(x-2)^2", "x^2-4x+4", 3, "x²−4x+4.", q2("x^2-4x+4")),
    ans("y9-psd-m7", "Expand (x + 9)(x − 9).", "(x+9)(x-9)", "x^2-81", 3, "x²−81.", q2("x^2-81")),
    ans("y9-psd-m8", "Expand (2x − 5)(2x + 5).", "(2x-5)(2x+5)", "4x^2-25", 4, "4x²−25.", q2("4x^2-25")),
    ans("y9-psd-m9", "Expand (x + 10)².", "(x+10)^2", "x^2+20x+100", 3, "x²+20x+100.", q2("x^2+20x+100")),
    mcq("y9-psd-m10", "(a − b)² differs from (a + b)² only in the:", "B", ["first term", "sign of the middle term", "last term", "number of terms"], 3, "The middle term's sign."),
  ],
  masteryQuizPool: [
    ans("y9-psd-p1", "Expand (2x + 3)².", "(2x+3)^2", "4x^2+12x+9", 5, "4x²+12x+9.", q2("4x^2+12x+9")),
    ans("y9-psd-p2", "Expand (3x − 2)².", "(3x-2)^2", "9x^2-12x+4", 5, "9x²−12x+4.", q2("9x^2-12x+4")),
    ans("y9-psd-p3", "Expand (4x + 1)(4x − 1).", "(4x+1)(4x-1)", "16x^2-1", 5, "16x²−1.", q2("16x^2-1")),
    ans("y9-psd-p4", "Expand (5x − 2)².", "(5x-2)^2", "25x^2-20x+4", 5, "25x²−20x+4.", q2("25x^2-20x+4")),
    ans("y9-psd-p5", "Expand (x + 1/2)... use (2x + 1)(2x − 1).", "(2x+1)(2x-1)", "4x^2-1", 5, "4x²−1.", q2("4x^2-1")),
    ans("y9-psd-p6", "Expand (3x + 4)².", "(3x+4)^2", "9x^2+24x+16", 5, "9x²+24x+16.", q2("9x^2+24x+16")),
    ans("y9-psd-p7", "Expand (6x + 5)(6x − 5).", "(6x+5)(6x-5)", "36x^2-25", 5, "36x²−25.", q2("36x^2-25")),
    ans("y9-psd-p8", "Expand (x − 6)².", "(x-6)^2", "x^2-12x+36", 5, "x²−12x+36.", q2("x^2-12x+36")),
    ans("y9-psd-p9", "Expand and simplify (x + 3)² − (x − 3)².", "(x+3)^2-(x-3)^2", "12x", 5, "(x²+6x+9)−(x²−6x+9) = 12x.", []),
    ans("y9-psd-p10", "Expand (2x + 7)(2x − 7).", "(2x+7)(2x-7)", "4x^2-49", 5, "4x²−49.", q2("4x^2-49")),
  ],
  commonMistakes: [
    { mistake: "Writing (a + b)² = a² + b².", fix: "Include the 2ab middle term." },
    { mistake: "Wrong sign in (a − b)².", fix: "Middle term is −2ab; last term +b²." },
    { mistake: "Adding a middle term to a difference of squares.", fix: "(a + b)(a − b) = a² − b², no middle term." },
    { mistake: "Forgetting to square the coefficient.", fix: "(2x)² = 4x²." },
  ],
  masteryPassMark: 0.8,
};

// ── factorising-algebraic-expressions (path) ───────────────────────────────────────────
const factorisingCommon: Partial<ExplicitLesson> = {
  description: "Factorise expressions by taking out the highest common factor.",
  learningIntention: "Factorise using a common factor.",
  successCriteria: ["Find the highest common factor.", "Factorise out a number.", "Factorise out a pronumeral.", "Factorise out a combined factor."],
  teaching: {
    paragraphs: [
      "FACTORISING reverses expanding. Take out the HIGHEST COMMON FACTOR (HCF) of all terms.",
      "3x + 6 = 3(x + 2) (HCF 3). x² + x = x(x + 1) (HCF x).",
      "Combine number and pronumeral factors: 6x² − 9x = 3x(2x − 3) (HCF 3x).",
      "Check by expanding: 3x(2x − 3) = 6x² − 9x. ✓",
    ],
    latexBlocks: ["3x + 6 = 3(x + 2)", "6x^2 - 9x = 3x(2x - 3)"],
  },
  workedExamples: [
    { title: "Number HCF", questionLatex: "\\text{Factorise } 3x + 6.", steps: [{ explanation: "HCF 3.", latex: "3(x + 2)" }], finalAnswerLatex: "3(x+2)" },
    { title: "Pronumeral HCF", questionLatex: "\\text{Factorise } x^2 + x.", steps: [{ explanation: "HCF x.", latex: "x(x + 1)" }], finalAnswerLatex: "x(x+1)" },
    { title: "Combined", questionLatex: "\\text{Factorise } 6x^2 - 9x.", steps: [{ explanation: "HCF 3x.", latex: "3x(2x - 3)" }], finalAnswerLatex: "3x(2x-3)" },
  ],
  guidedPractice: [
    ans("y9-fae-g1", "Factorise 2x + 4.", "2x+4", "2(x+2)", 3, "HCF 2.", ["2(x + 2)"]),
    ans("y9-fae-g2", "Factorise 5x − 10.", "5x-10", "5(x-2)", 3, "HCF 5.", ["5(x - 2)"]),
    ans("y9-fae-g3", "Factorise x² + 3x.", "x^2+3x", "x(x+3)", 3, "HCF x.", ["x(x + 3)"]),
    mcq("y9-fae-g4", "Factorising uses the:", "A", ["highest common factor", "lowest term", "largest coefficient", "constant only"], 2, "Take out the HCF."),
  ],
  independentPractice: [
    ans("y9-fae-i1", "Factorise 3x + 12.", "3x+12", "3(x+4)", 3, "HCF 3.", ["3(x + 4)"]),
    ans("y9-fae-i2", "Factorise 4x² + 8x.", "4x^2+8x", "4x(x+2)", 4, "HCF 4x.", ["4x(x + 2)"]),
    ans("y9-fae-i3", "Factorise 6x − 9.", "6x-9", "3(2x-3)", 3, "HCF 3.", ["3(2x - 3)"]),
    ans("y9-fae-i4", "Factorise x² − 5x.", "x^2-5x", "x(x-5)", 3, "HCF x.", ["x(x - 5)"]),
    mcq("y9-fae-i5", "The HCF of 6x² and 9x is:", "C", ["x", "3", "3x", "6x"], 4, "3x."),
  ],
  masteryQuiz: [
    ans("y9-fae-m1", "Factorise 3x + 6.", "3x+6", "3(x+2)", 3, "3(x+2).", ["3(x + 2)"]),
    ans("y9-fae-m2", "Factorise x² + x.", "x^2+x", "x(x+1)", 3, "x(x+1).", ["x(x + 1)"]),
    ans("y9-fae-m3", "Factorise 6x² − 9x.", "6x^2-9x", "3x(2x-3)", 4, "3x(2x−3).", ["3x(2x - 3)"]),
    ans("y9-fae-m4", "Factorise 10x + 15.", "10x+15", "5(2x+3)", 3, "5(2x+3).", ["5(2x + 3)"]),
    mcq("y9-fae-m5", "Factorising is the reverse of:", "B", ["adding", "expanding", "dividing", "rounding"], 2, "Expanding."),
    ans("y9-fae-m6", "Factorise 12a − 18.", "12a-18", "6(2a-3)", 3, "6(2a−3).", ["6(2a - 3)"]),
    ans("y9-fae-m7", "Factorise 2x² + 4x.", "2x^2+4x", "2x(x+2)", 4, "2x(x+2).", ["2x(x + 2)"]),
    ans("y9-fae-m8", "Factorise 7x − 14.", "7x-14", "7(x-2)", 3, "7(x−2).", ["7(x - 2)"]),
    ans("y9-fae-m9", "Factorise x² − 8x.", "x^2-8x", "x(x-8)", 3, "x(x−8).", ["x(x - 8)"]),
    mcq("y9-fae-m10", "8x + 12 factorises to:", "A", ["4(2x + 3)", "2(4x + 12)", "8(x + 12)", "x(8 + 12)"], 3, "HCF 4 → 4(2x + 3)."),
  ],
  masteryQuizPool: [
    ans("y9-fae-p1", "Factorise 12x² − 18x.", "12x^2-18x", "6x(2x-3)", 5, "HCF 6x.", ["6x(2x - 3)"]),
    ans("y9-fae-p2", "Factorise 2x²y + 4xy.", "2x^2y+4xy", "2xy(x+2)", 5, "HCF 2xy.", ["2xy(x + 2)"]),
    ans("y9-fae-p3", "Factorise 15x + 25.", "15x+25", "5(3x+5)", 5, "HCF 5.", ["5(3x + 5)"]),
    ans("y9-fae-p4", "Factorise 9x² + 6x.", "9x^2+6x", "3x(3x+2)", 5, "HCF 3x.", ["3x(3x + 2)"]),
    ans("y9-fae-p5", "Factorise 8a² − 12a.", "8a^2-12a", "4a(2a-3)", 5, "HCF 4a.", ["4a(2a - 3)"]),
    ans("y9-fae-p6", "Factorise 5x² + 10x.", "5x^2+10x", "5x(x+2)", 5, "HCF 5x.", ["5x(x + 2)"]),
    ans("y9-fae-p7", "Factorise 3ab + 6a.", "3ab+6a", "3a(b+2)", 5, "HCF 3a.", ["3a(b + 2)"]),
    ans("y9-fae-p8", "Factorise 20x − 16.", "20x-16", "4(5x-4)", 5, "HCF 4.", ["4(5x - 4)"]),
    ans("y9-fae-p9", "Factorise 6x³ + 9x².", "6x^3+9x^2", "3x^2(2x+3)", 5, "HCF 3x².", ["3x²(2x+3)", "3x^2(2x + 3)"]),
    ans("y9-fae-p10", "Factorise 14x²y − 7xy².", "14x^2y-7xy^2", "7xy(2x-y)", 5, "HCF 7xy.", ["7xy(2x - y)"]),
  ],
  commonMistakes: [
    { mistake: "Taking out a factor that isn't common to all terms.", fix: "The factor must divide every term." },
    { mistake: "Not taking the HIGHEST common factor.", fix: "Remove the greatest shared factor." },
    { mistake: "Sign slips inside the bracket.", fix: "Check by expanding." },
    { mistake: "Dropping a pronumeral that's common.", fix: "Include common pronumerals in the HCF." },
  ],
  masteryPassMark: 0.8,
};

// ── factorising-difference-of-squares (path) ───────────────────────────────────────────
const factorisingDots: Partial<ExplicitLesson> = {
  description: "Factorise a difference of two squares: a² − b² = (a + b)(a − b).",
  learningIntention: "Recognise and factorise differences of squares.",
  successCriteria: ["Recognise a² − b².", "Write it as (a + b)(a − b).", "Handle coefficients (perfect-square terms).", "Take out a common factor first if needed."],
  teaching: {
    paragraphs: [
      "A DIFFERENCE OF TWO SQUARES factorises as a² − b² = (a + b)(a − b).",
      "x² − 9 = (x + 3)(x − 3); x² − 25 = (x + 5)(x − 5).",
      "With coefficients: 4x² − 1 = (2x + 1)(2x − 1) (since 4x² = (2x)²).",
      "If there's a common factor, take it out first: 2x² − 8 = 2(x² − 4) = 2(x + 2)(x − 2).",
    ],
    latexBlocks: ["a^2 - b^2 = (a+b)(a-b)", "4x^2 - 1 = (2x+1)(2x-1)"],
  },
  workedExamples: [
    { title: "x² − 9", questionLatex: "\\text{Factorise } x^2 - 9.", steps: [{ explanation: "3² = 9.", latex: "(x+3)(x-3)" }], finalAnswerLatex: "(x+3)(x-3)" },
    { title: "x² − 25", questionLatex: "\\text{Factorise } x^2 - 25.", steps: [{ explanation: "5² = 25.", latex: "(x+5)(x-5)" }], finalAnswerLatex: "(x+5)(x-5)" },
    { title: "4x² − 1", questionLatex: "\\text{Factorise } 4x^2 - 1.", steps: [{ explanation: "(2x)² − 1².", latex: "(2x+1)(2x-1)" }], finalAnswerLatex: "(2x+1)(2x-1)" },
  ],
  guidedPractice: [
    ans("y9-fds-g1", "Factorise x² − 4.", "x^2-4", "(x+2)(x-2)", 3, "(x+2)(x−2).", ff("(x+2)", "(x-2)")),
    ans("y9-fds-g2", "Factorise x² − 16.", "x^2-16", "(x+4)(x-4)", 3, "(x+4)(x−4).", ff("(x+4)", "(x-4)")),
    ans("y9-fds-g3", "Factorise x² − 1.", "x^2-1", "(x+1)(x-1)", 3, "(x+1)(x−1).", ff("(x+1)", "(x-1)")),
    mcq("y9-fds-g4", "a² − b² factorises to:", "B", ["(a − b)²", "(a + b)(a − b)", "(a + b)²", "a² + b²"], 2, "(a + b)(a − b)."),
  ],
  independentPractice: [
    ans("y9-fds-i1", "Factorise x² − 36.", "x^2-36", "(x+6)(x-6)", 3, "(x+6)(x−6).", ff("(x+6)", "(x-6)")),
    ans("y9-fds-i2", "Factorise x² − 49.", "x^2-49", "(x+7)(x-7)", 3, "(x+7)(x−7).", ff("(x+7)", "(x-7)")),
    ans("y9-fds-i3", "Factorise 9x² − 16.", "9x^2-16", "(3x+4)(3x-4)", 4, "(3x+4)(3x−4).", ff("(3x+4)", "(3x-4)")),
    ans("y9-fds-i4", "Factorise x² − 100.", "x^2-100", "(x+10)(x-10)", 3, "(x+10)(x−10).", ff("(x+10)", "(x-10)")),
    mcq("y9-fds-i5", "Which is a difference of two squares?", "C", ["x² + 9", "x² + 6x + 9", "x² − 9", "x² − 6x"], 3, "x² − 9 = x² − 3²."),
  ],
  masteryQuiz: [
    ans("y9-fds-m1", "Factorise x² − 9.", "x^2-9", "(x+3)(x-3)", 3, "(x+3)(x−3).", ff("(x+3)", "(x-3)")),
    ans("y9-fds-m2", "Factorise x² − 25.", "x^2-25", "(x+5)(x-5)", 3, "(x+5)(x−5).", ff("(x+5)", "(x-5)")),
    ans("y9-fds-m3", "Factorise 4x² − 1.", "4x^2-1", "(2x+1)(2x-1)", 4, "(2x+1)(2x−1).", ff("(2x+1)", "(2x-1)")),
    ans("y9-fds-m4", "Factorise x² − 64.", "x^2-64", "(x+8)(x-8)", 3, "(x+8)(x−8).", ff("(x+8)", "(x-8)")),
    mcq("y9-fds-m5", "x² + 16 can be factorised as a difference of squares: (T/F)", "B", ["true", "false", "only with surds", "only if x = 4"], 3, "It's a SUM of squares — not factorisable this way."),
    ans("y9-fds-m6", "Factorise 25x² − 9.", "25x^2-9", "(5x+3)(5x-3)", 4, "(5x+3)(5x−3).", ff("(5x+3)", "(5x-3)")),
    ans("y9-fds-m7", "Factorise x² − 81.", "x^2-81", "(x+9)(x-9)", 3, "(x+9)(x−9).", ff("(x+9)", "(x-9)")),
    ans("y9-fds-m8", "Factorise 16x² − 25.", "16x^2-25", "(4x+5)(4x-5)", 4, "(4x+5)(4x−5).", ff("(4x+5)", "(4x-5)")),
    ans("y9-fds-m9", "Factorise x² − 121.", "x^2-121", "(x+11)(x-11)", 3, "(x+11)(x−11).", ff("(x+11)", "(x-11)")),
    mcq("y9-fds-m10", "Before factorising 2x² − 8 as a difference of squares, you should:", "A", ["take out the common factor 2", "add 8", "square it", "divide by x"], 4, "2(x² − 4) = 2(x+2)(x−2)."),
  ],
  masteryQuizPool: [
    ans("y9-fds-p1", "Factorise 9x² − 16.", "9x^2-16", "(3x+4)(3x-4)", 5, "(3x+4)(3x−4).", ff("(3x+4)", "(3x-4)")),
    ans("y9-fds-p2", "Factorise 2x² − 8 fully.", "2x^2-8", "2(x+2)(x-2)", 5, "2(x²−4) = 2(x+2)(x−2).", ["2(x-2)(x+2)"]),
    ans("y9-fds-p3", "Factorise 25 − x².", "25-x^2", "(5+x)(5-x)", 5, "(5+x)(5−x).", ff("(5+x)", "(5-x)")),
    ans("y9-fds-p4", "Factorise 49x² − 4.", "49x^2-4", "(7x+2)(7x-2)", 5, "(7x+2)(7x−2).", ff("(7x+2)", "(7x-2)")),
    ans("y9-fds-p5", "Factorise 3x² − 27 fully.", "3x^2-27", "3(x+3)(x-3)", 5, "3(x²−9) = 3(x+3)(x−3).", ["3(x-3)(x+3)"]),
    ans("y9-fds-p6", "Factorise 100x² − 1.", "100x^2-1", "(10x+1)(10x-1)", 5, "(10x+1)(10x−1).", ff("(10x+1)", "(10x-1)")),
    ans("y9-fds-p7", "Factorise x²y² − 9.", "x^2y^2-9", "(xy+3)(xy-3)", 5, "(xy+3)(xy−3).", ff("(xy+3)", "(xy-3)")),
    ans("y9-fds-p8", "Factorise 5x² − 20 fully.", "5x^2-20", "5(x+2)(x-2)", 5, "5(x²−4) = 5(x+2)(x−2).", ["5(x-2)(x+2)"]),
    ans("y9-fds-p9", "Factorise 36 − 25x².", "36-25x^2", "(6+5x)(6-5x)", 5, "(6+5x)(6−5x).", ff("(6+5x)", "(6-5x)")),
    ans("y9-fds-p10", "Factorise 4x² − 81.", "4x^2-81", "(2x+9)(2x-9)", 5, "(2x+9)(2x−9).", ff("(2x+9)", "(2x-9)")),
  ],
  commonMistakes: [
    { mistake: "Trying to factorise a SUM of squares.", fix: "a² + b² doesn't factorise over the reals." },
    { mistake: "Forgetting to take out a common factor first.", fix: "2x² − 8 = 2(x+2)(x−2)." },
    { mistake: "Not square-rooting the coefficient.", fix: "4x² = (2x)², so use 2x." },
    { mistake: "Writing (a − b)² instead of (a + b)(a − b).", fix: "Difference of squares has both signs." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "expanding-binomial-products": expandingBinomial,
  "perfect-squares-difference-of-squares": perfectSquaresDots,
  "factorising-algebraic-expressions": factorisingCommon,
  "factorising-difference-of-squares": factorisingDots,
};

export function year9Chapter9ExpandingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "quadratic-expressions-algebraic-techniques") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
