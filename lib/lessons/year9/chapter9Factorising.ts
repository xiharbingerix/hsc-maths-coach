// Year 9 Wave 10 — Chapter 9, factorising sections (ADR-Y9-001, all path):
// factorising-by-grouping, factorising-monic-trinomials, factorising-non-monic-trinomials.
// Full per-subtopic contract. Unique id prefixes (fbg/fmt/fnt).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Find two numbers with the right product and sum; group in pairs.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Check the product and sum.", explanation };
}
const ff = (a: string, b: string) => [`${a}${b}`, `${b}${a}`, `${a}${b}`.replace(/\s+/g, ""), `${b}${a}`.replace(/\s+/g, "")];

// ── factorising-by-grouping (path) ─────────────────────────────────────────────────────
const factorisingGrouping: Partial<ExplicitLesson> = {
  description: "Factorise four-term expressions by grouping in pairs.",
  learningIntention: "Use grouping to factorise four-term expressions.",
  successCriteria: ["Group terms in pairs.", "Take out the common factor of each pair.", "Identify the common binomial factor.", "Write the final factorisation."],
  teaching: {
    paragraphs: [
      "When an expression has FOUR terms, try GROUPING in pairs. Factor each pair, then take out the common bracket.",
      "x² + 2x + 3x + 6 = x(x + 2) + 3(x + 2) = (x + 2)(x + 3).",
      "ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y).",
      "The two pairs must share the SAME bracket — reorder the terms first if needed.",
    ],
    latexBlocks: ["x^2 + 2x + 3x + 6 = (x+2)(x+3)", "ax+ay+bx+by = (a+b)(x+y)"],
  },
  workedExamples: [
    { title: "Group", questionLatex: "\\text{Factorise } x^2 + 2x + 3x + 6.", steps: [{ explanation: "x(x+2)+3(x+2).", latex: "(x+2)(x+3)" }], finalAnswerLatex: "(x+2)(x+3)" },
    { title: "Two pronumerals", questionLatex: "\\text{Factorise } ax + ay + bx + by.", steps: [{ explanation: "a(x+y)+b(x+y).", latex: "(a+b)(x+y)" }], finalAnswerLatex: "(a+b)(x+y)" },
    { title: "Another", questionLatex: "\\text{Factorise } x^2 + 5x + 2x + 10.", steps: [{ explanation: "x(x+5)+2(x+5).", latex: "(x+5)(x+2)" }], finalAnswerLatex: "(x+5)(x+2)" },
  ],
  guidedPractice: [
    ans("y9-fbg-g1", "Factorise x² + 3x + 2x + 6.", "x^2+3x+2x+6", "(x+3)(x+2)", 4, "x(x+3)+2(x+3).", ff("(x+3)", "(x+2)")),
    ans("y9-fbg-g2", "Factorise xy + 2x + 3y + 6.", "xy+2x+3y+6", "(x+3)(y+2)", 4, "x(y+2)+3(y+2).", ff("(x+3)", "(y+2)")),
    ans("y9-fbg-g3", "Factorise x² + 4x + 5x + 20.", "x^2+4x+5x+20", "(x+4)(x+5)", 4, "x(x+4)+5(x+4).", ff("(x+4)", "(x+5)")),
    mcq("y9-fbg-g4", "Grouping is used when an expression has:", "C", ["one term", "two terms", "four terms", "no pronumerals"], 2, "Four terms."),
  ],
  independentPractice: [
    ans("y9-fbg-i1", "Factorise x² + 2x + 4x + 8.", "x^2+2x+4x+8", "(x+2)(x+4)", 4, "x(x+2)+4(x+2).", ff("(x+2)", "(x+4)")),
    ans("y9-fbg-i2", "Factorise ab + 3a + 2b + 6.", "ab+3a+2b+6", "(a+2)(b+3)", 4, "a(b+3)+2(b+3).", ff("(a+2)", "(b+3)")),
    ans("y9-fbg-i3", "Factorise x² + 6x + x + 6.", "x^2+6x+x+6", "(x+6)(x+1)", 4, "x(x+6)+1(x+6).", ff("(x+6)", "(x+1)")),
    ans("y9-fbg-i4", "Factorise 2x² + 4x + 3x + 6.", "2x^2+4x+3x+6", "(2x+3)(x+2)", 5, "2x(x+2)+3(x+2).", ff("(2x+3)", "(x+2)")),
    mcq("y9-fbg-i5", "After grouping, the two pairs should share the same:", "B", ["coefficient", "bracket (binomial factor)", "constant", "variable name"], 3, "The same binomial factor."),
  ],
  masteryQuiz: [
    ans("y9-fbg-m1", "Factorise x² + 2x + 3x + 6.", "x^2+2x+3x+6", "(x+2)(x+3)", 4, "(x+2)(x+3).", ff("(x+2)", "(x+3)")),
    ans("y9-fbg-m2", "Factorise xy + 2x + 3y + 6.", "xy+2x+3y+6", "(x+3)(y+2)", 4, "(x+3)(y+2).", ff("(x+3)", "(y+2)")),
    ans("y9-fbg-m3", "Factorise x² + 5x + 4x + 20.", "x^2+5x+4x+20", "(x+5)(x+4)", 4, "(x+5)(x+4).", ff("(x+5)", "(x+4)")),
    ans("y9-fbg-m4", "Factorise ab + 4a + 3b + 12.", "ab+4a+3b+12", "(a+3)(b+4)", 4, "a(b+4)+3(b+4).", ff("(a+3)", "(b+4)")),
    mcq("y9-fbg-m5", "x² + 2x + 3x + 6 first groups as:", "A", ["x(x + 2) + 3(x + 2)", "x(x + 3) + 2(x + 6)", "(x + 2)(x + 6)", "x² + 5x + 6"], 3, "Group the pairs."),
    ans("y9-fbg-m6", "Factorise x² + 7x + 2x + 14.", "x^2+7x+2x+14", "(x+7)(x+2)", 4, "(x+7)(x+2).", ff("(x+7)", "(x+2)")),
    ans("y9-fbg-m7", "Factorise 3x² + 6x + 2x + 4.", "3x^2+6x+2x+4", "(3x+2)(x+2)", 5, "3x(x+2)+2(x+2).", ff("(3x+2)", "(x+2)")),
    ans("y9-fbg-m8", "Factorise pq + 5p + 2q + 10.", "pq+5p+2q+10", "(p+2)(q+5)", 4, "p(q+5)+2(q+5).", ff("(p+2)", "(q+5)")),
    ans("y9-fbg-m9", "Factorise x² + 8x + 3x + 24.", "x^2+8x+3x+24", "(x+8)(x+3)", 4, "(x+8)(x+3).", ff("(x+8)", "(x+3)")),
    mcq("y9-fbg-m10", "Grouping factorisation produces a product of:", "B", ["three factors", "two binomials", "a single term", "a difference of squares"], 2, "Two binomial factors."),
  ],
  masteryQuizPool: [
    ans("y9-fbg-p1", "Factorise 2x² + 6x + x + 3.", "2x^2+6x+x+3", "(2x+1)(x+3)", 5, "2x(x+3)+1(x+3).", ff("(2x+1)", "(x+3)")),
    ans("y9-fbg-p2", "Factorise 3xy + 9x + 2y + 6.", "3xy+9x+2y+6", "(3x+2)(y+3)", 5, "3x(y+3)+2(y+3).", ff("(3x+2)", "(y+3)")),
    ans("y9-fbg-p3", "Factorise x² − 3x + 4x − 12.", "x^2-3x+4x-12", "(x-3)(x+4)", 5, "x(x−3)+4(x−3).", ff("(x-3)", "(x+4)")),
    ans("y9-fbg-p4", "Factorise 6x² + 4x + 9x + 6.", "6x^2+4x+9x+6", "(2x+3)(3x+2)", 5, "2x(3x+2)+3(3x+2).", ff("(2x+3)", "(3x+2)")),
    ans("y9-fbg-p5", "Factorise ab − 2a + 5b − 10.", "ab-2a+5b-10", "(a+5)(b-2)", 5, "a(b−2)+5(b−2).", ff("(a+5)", "(b-2)")),
    ans("y9-fbg-p6", "Factorise x² + 2x − 5x − 10.", "x^2+2x-5x-10", "(x+2)(x-5)", 5, "x(x+2)−5(x+2).", ff("(x+2)", "(x-5)")),
    ans("y9-fbg-p7", "Factorise 4x² + 8x + 3x + 6.", "4x^2+8x+3x+6", "(4x+3)(x+2)", 5, "4x(x+2)+3(x+2).", ff("(4x+3)", "(x+2)")),
    ans("y9-fbg-p8", "Factorise 2pq + 6p + 5q + 15.", "2pq+6p+5q+15", "(2p+5)(q+3)", 5, "2p(q+3)+5(q+3).", ff("(2p+5)", "(q+3)")),
    ans("y9-fbg-p9", "Factorise x² − 4x + 3x − 12.", "x^2-4x+3x-12", "(x-4)(x+3)", 5, "x(x−4)+3(x−4).", ff("(x-4)", "(x+3)")),
    ans("y9-fbg-p10", "Factorise 10x² + 5x + 2x + 1.", "10x^2+5x+2x+1", "(5x+1)(2x+1)", 5, "5x(2x+1)+1(2x+1).", ff("(5x+1)", "(2x+1)")),
  ],
  commonMistakes: [
    { mistake: "Grouping so the brackets don't match.", fix: "Reorder terms so both pairs give the same bracket." },
    { mistake: "Sign error taking out a negative.", fix: "x(x+2) − 5(x+2) needs −5 factored carefully." },
    { mistake: "Stopping after factoring each pair.", fix: "Take out the common binomial to finish." },
    { mistake: "Forgetting the +1 when a pair is just (x + a).", fix: "x + a = 1(x + a)." },
  ],
  masteryPassMark: 0.8,
};

// ── factorising-monic-trinomials (path) ────────────────────────────────────────────────
const factorisingMonic: Partial<ExplicitLesson> = {
  description: "Factorise monic quadratic trinomials x² + bx + c into (x + m)(x + n).",
  learningIntention: "Factorise x² + bx + c by finding two numbers.",
  successCriteria: ["Find two numbers with product c and sum b.", "Write (x + m)(x + n).", "Handle negative c (different signs).", "Handle negative b with positive c."],
  teaching: {
    paragraphs: [
      "To factorise x² + bx + c, find two numbers that MULTIPLY to c and ADD to b. Then x² + bx + c = (x + m)(x + n).",
      "x² + 5x + 6: numbers 2 and 3 (2 × 3 = 6, 2 + 3 = 5) → (x + 2)(x + 3).",
      "If c is NEGATIVE, the numbers have different signs: x² − x − 6 = (x − 3)(x + 2).",
      "If b is negative but c positive, both numbers are negative: x² − 5x + 6 = (x − 2)(x − 3).",
    ],
    latexBlocks: ["x^2 + bx + c = (x+m)(x+n),\\ mn=c,\\ m+n=b", "x^2+5x+6 = (x+2)(x+3)"],
  },
  workedExamples: [
    { title: "Both positive", questionLatex: "\\text{Factorise } x^2 + 5x + 6.", steps: [{ explanation: "2, 3.", latex: "(x+2)(x+3)" }], finalAnswerLatex: "(x+2)(x+3)" },
    { title: "Both negative", questionLatex: "\\text{Factorise } x^2 - 5x + 6.", steps: [{ explanation: "−2, −3.", latex: "(x-2)(x-3)" }], finalAnswerLatex: "(x-2)(x-3)" },
    { title: "Different signs", questionLatex: "\\text{Factorise } x^2 - x - 6.", steps: [{ explanation: "−3, 2.", latex: "(x-3)(x+2)" }], finalAnswerLatex: "(x-3)(x+2)" },
  ],
  guidedPractice: [
    ans("y9-fmt-g1", "Factorise x² + 4x + 3.", "x^2+4x+3", "(x+1)(x+3)", 4, "1, 3.", ff("(x+1)", "(x+3)")),
    ans("y9-fmt-g2", "Factorise x² + 6x + 8.", "x^2+6x+8", "(x+2)(x+4)", 4, "2, 4.", ff("(x+2)", "(x+4)")),
    ans("y9-fmt-g3", "Factorise x² − x − 6.", "x^2-x-6", "(x-3)(x+2)", 4, "−3, 2.", ff("(x-3)", "(x+2)")),
    mcq("y9-fmt-g4", "To factorise x² + bx + c, find two numbers with:", "A", ["product c and sum b", "product b and sum c", "sum c only", "product c only"], 3, "Product c, sum b."),
  ],
  independentPractice: [
    ans("y9-fmt-i1", "Factorise x² + 7x + 12.", "x^2+7x+12", "(x+3)(x+4)", 4, "3, 4.", ff("(x+3)", "(x+4)")),
    ans("y9-fmt-i2", "Factorise x² − 5x + 6.", "x^2-5x+6", "(x-2)(x-3)", 4, "−2, −3.", ff("(x-2)", "(x-3)")),
    ans("y9-fmt-i3", "Factorise x² + 2x − 15.", "x^2+2x-15", "(x+5)(x-3)", 4, "5, −3.", ff("(x+5)", "(x-3)")),
    ans("y9-fmt-i4", "Factorise x² + 8x + 15.", "x^2+8x+15", "(x+3)(x+5)", 4, "3, 5.", ff("(x+3)", "(x+5)")),
    mcq("y9-fmt-i5", "For x² − x − 12 the two numbers are:", "C", ["3 and 4", "−3 and −4", "−4 and 3", "6 and −2"], 4, "−4 × 3 = −12, −4 + 3 = −1."),
  ],
  masteryQuiz: [
    ans("y9-fmt-m1", "Factorise x² + 5x + 6.", "x^2+5x+6", "(x+2)(x+3)", 4, "(x+2)(x+3).", ff("(x+2)", "(x+3)")),
    ans("y9-fmt-m2", "Factorise x² + 7x + 12.", "x^2+7x+12", "(x+3)(x+4)", 4, "(x+3)(x+4).", ff("(x+3)", "(x+4)")),
    ans("y9-fmt-m3", "Factorise x² − 5x + 6.", "x^2-5x+6", "(x-2)(x-3)", 4, "(x−2)(x−3).", ff("(x-2)", "(x-3)")),
    ans("y9-fmt-m4", "Factorise x² + x − 12.", "x^2+x-12", "(x+4)(x-3)", 4, "4, −3.", ff("(x+4)", "(x-3)")),
    mcq("y9-fmt-m5", "If c is negative, the two numbers have:", "B", ["the same sign", "different signs", "no sign", "both positive"], 3, "Different signs."),
    ans("y9-fmt-m6", "Factorise x² − 7x + 10.", "x^2-7x+10", "(x-2)(x-5)", 4, "−2, −5.", ff("(x-2)", "(x-5)")),
    ans("y9-fmt-m7", "Factorise x² + 9x + 20.", "x^2+9x+20", "(x+4)(x+5)", 4, "4, 5.", ff("(x+4)", "(x+5)")),
    ans("y9-fmt-m8", "Factorise x² − 2x − 8.", "x^2-2x-8", "(x-4)(x+2)", 4, "−4, 2.", ff("(x-4)", "(x+2)")),
    ans("y9-fmt-m9", "Factorise x² + 3x − 10.", "x^2+3x-10", "(x+5)(x-2)", 4, "5, −2.", ff("(x+5)", "(x-2)")),
    mcq("y9-fmt-m10", "x² − 9x + 20 factorises to:", "A", ["(x − 4)(x − 5)", "(x + 4)(x + 5)", "(x − 4)(x + 5)", "(x − 2)(x − 10)"], 4, "−4, −5."),
  ],
  masteryQuizPool: [
    ans("y9-fmt-p1", "Factorise x² − 7x + 12.", "x^2-7x+12", "(x-3)(x-4)", 5, "−3, −4.", ff("(x-3)", "(x-4)")),
    ans("y9-fmt-p2", "Factorise x² + 2x − 15.", "x^2+2x-15", "(x+5)(x-3)", 5, "5, −3.", ff("(x+5)", "(x-3)")),
    ans("y9-fmt-p3", "Factorise x² − 4x − 21.", "x^2-4x-21", "(x-7)(x+3)", 5, "−7, 3.", ff("(x-7)", "(x+3)")),
    ans("y9-fmt-p4", "Factorise x² + 10x + 21.", "x^2+10x+21", "(x+3)(x+7)", 5, "3, 7.", ff("(x+3)", "(x+7)")),
    ans("y9-fmt-p5", "Factorise x² − 11x + 24.", "x^2-11x+24", "(x-3)(x-8)", 5, "−3, −8.", ff("(x-3)", "(x-8)")),
    ans("y9-fmt-p6", "Factorise x² + 4x − 12.", "x^2+4x-12", "(x+6)(x-2)", 5, "6, −2.", ff("(x+6)", "(x-2)")),
    ans("y9-fmt-p7", "Factorise x² − 6x + 9.", "x^2-6x+9", "(x-3)(x-3)", 5, "−3, −3 → (x−3)².", ["(x-3)^2", "(x-3)²", "(x - 3)(x - 3)"]),
    ans("y9-fmt-p8", "Factorise x² + 12x + 35.", "x^2+12x+35", "(x+5)(x+7)", 5, "5, 7.", ff("(x+5)", "(x+7)")),
    ans("y9-fmt-p9", "Factorise x² − x − 20.", "x^2-x-20", "(x-5)(x+4)", 5, "−5, 4.", ff("(x-5)", "(x+4)")),
    ans("y9-fmt-p10", "Factorise x² + 6x + 9.", "x^2+6x+9", "(x+3)(x+3)", 5, "3, 3 → (x+3)².", ["(x+3)^2", "(x+3)²", "(x + 3)(x + 3)"]),
  ],
  commonMistakes: [
    { mistake: "Using sum c and product b.", fix: "Product is c, sum is b." },
    { mistake: "Wrong signs for a negative c.", fix: "Different signs; the larger-magnitude number takes b's sign." },
    { mistake: "Both signs positive when b is negative, c positive.", fix: "Both numbers are negative." },
    { mistake: "Not checking by expanding.", fix: "Expand to confirm." },
  ],
  masteryPassMark: 0.8,
};

// ── factorising-non-monic-trinomials (path) ────────────────────────────────────────────
const factorisingNonMonic: Partial<ExplicitLesson> = {
  description: "Factorise non-monic quadratic trinomials ax² + bx + c (a ≠ 1).",
  learningIntention: "Factorise ax² + bx + c using the product ac.",
  successCriteria: ["Find two numbers with product ac and sum b.", "Split the middle term.", "Factorise by grouping.", "Write the two binomial factors."],
  teaching: {
    paragraphs: [
      "For ax² + bx + c (with a ≠ 1), find two numbers with product a × c and sum b, SPLIT the middle term, then factorise by grouping.",
      "2x² + 7x + 3: ac = 6, two numbers 6 and 1 (sum 7). 2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3).",
      "3x² + 8x + 4: ac = 12, numbers 6 and 2. → (3x + 2)(x + 2).",
      "Check by expanding the factors.",
    ],
    latexBlocks: ["ax^2+bx+c:\\ \\text{product } ac,\\ \\text{sum } b", "2x^2+7x+3 = (2x+1)(x+3)"],
  },
  workedExamples: [
    { title: "ac = 6", questionLatex: "\\text{Factorise } 2x^2 + 7x + 3.", steps: [{ explanation: "Split 7x = 6x + x.", latex: "(2x+1)(x+3)" }], finalAnswerLatex: "(2x+1)(x+3)" },
    { title: "ac = 12", questionLatex: "\\text{Factorise } 3x^2 + 8x + 4.", steps: [{ explanation: "6 and 2.", latex: "(3x+2)(x+2)" }], finalAnswerLatex: "(3x+2)(x+2)" },
    { title: "ac = 4", questionLatex: "\\text{Factorise } 2x^2 + 5x + 2.", steps: [{ explanation: "4 and 1.", latex: "(2x+1)(x+2)" }], finalAnswerLatex: "(2x+1)(x+2)" },
  ],
  guidedPractice: [
    ans("y9-fnt-g1", "Factorise 2x² + 5x + 2.", "2x^2+5x+2", "(2x+1)(x+2)", 4, "Split 5x = 4x + x.", ff("(2x+1)", "(x+2)")),
    ans("y9-fnt-g2", "Factorise 3x² + 7x + 2.", "3x^2+7x+2", "(3x+1)(x+2)", 5, "ac = 6; 6, 1.", ff("(3x+1)", "(x+2)")),
    ans("y9-fnt-g3", "Factorise 2x² + 7x + 6.", "2x^2+7x+6", "(2x+3)(x+2)", 5, "ac = 12; 4, 3.", ff("(2x+3)", "(x+2)")),
    mcq("y9-fnt-g4", "For ax² + bx + c, the two numbers multiply to:", "B", ["c", "ac", "a", "b"], 3, "Product ac."),
  ],
  independentPractice: [
    ans("y9-fnt-i1", "Factorise 2x² + 9x + 4.", "2x^2+9x+4", "(2x+1)(x+4)", 5, "ac = 8; 8, 1.", ff("(2x+1)", "(x+4)")),
    ans("y9-fnt-i2", "Factorise 3x² + 8x + 4.", "3x^2+8x+4", "(3x+2)(x+2)", 5, "6, 2.", ff("(3x+2)", "(x+2)")),
    ans("y9-fnt-i3", "Factorise 2x² + 11x + 5.", "2x^2+11x+5", "(2x+1)(x+5)", 5, "10, 1.", ff("(2x+1)", "(x+5)")),
    ans("y9-fnt-i4", "Factorise 5x² + 7x + 2.", "5x^2+7x+2", "(5x+2)(x+1)", 5, "5, 2.", ff("(5x+2)", "(x+1)")),
    mcq("y9-fnt-i5", "After finding the two numbers, you:", "A", ["split the middle term and group", "add them to c", "divide by a", "square them"], 3, "Split the middle term, then group."),
  ],
  masteryQuiz: [
    ans("y9-fnt-m1", "Factorise 2x² + 7x + 3.", "2x^2+7x+3", "(2x+1)(x+3)", 4, "(2x+1)(x+3).", ff("(2x+1)", "(x+3)")),
    ans("y9-fnt-m2", "Factorise 3x² + 8x + 4.", "3x^2+8x+4", "(3x+2)(x+2)", 5, "(3x+2)(x+2).", ff("(3x+2)", "(x+2)")),
    ans("y9-fnt-m3", "Factorise 2x² + 5x + 2.", "2x^2+5x+2", "(2x+1)(x+2)", 4, "(2x+1)(x+2).", ff("(2x+1)", "(x+2)")),
    ans("y9-fnt-m4", "Factorise 3x² + 10x + 3.", "3x^2+10x+3", "(3x+1)(x+3)", 5, "9, 1.", ff("(3x+1)", "(x+3)")),
    mcq("y9-fnt-m5", "For 2x² + 7x + 3, ac equals:", "C", ["3", "7", "6", "2"], 3, "2 × 3 = 6."),
    ans("y9-fnt-m6", "Factorise 2x² + 11x + 12.", "2x^2+11x+12", "(2x+3)(x+4)", 5, "8, 3.", ff("(2x+3)", "(x+4)")),
    ans("y9-fnt-m7", "Factorise 5x² + 11x + 2.", "5x^2+11x+2", "(5x+1)(x+2)", 5, "10, 1.", ff("(5x+1)", "(x+2)")),
    ans("y9-fnt-m8", "Factorise 3x² + 7x + 2.", "3x^2+7x+2", "(3x+1)(x+2)", 5, "6, 1.", ff("(3x+1)", "(x+2)")),
    ans("y9-fnt-m9", "Factorise 4x² + 8x + 3.", "4x^2+8x+3", "(2x+1)(2x+3)", 5, "ac = 12; 6, 2.", ff("(2x+1)", "(2x+3)")),
    mcq("y9-fnt-m10", "Splitting the middle term then grouping is the method for:", "B", ["monic trinomials only", "non-monic trinomials", "difference of squares", "common factors"], 2, "Non-monic ax² + bx + c."),
  ],
  masteryQuizPool: [
    ans("y9-fnt-p1", "Factorise 6x² + 11x + 3.", "6x^2+11x+3", "(3x+1)(2x+3)", 5, "ac = 18; 9, 2.", ff("(3x+1)", "(2x+3)")),
    ans("y9-fnt-p2", "Factorise 2x² − x − 1.", "2x^2-x-1", "(2x+1)(x-1)", 5, "ac = −2; −2, 1.", ff("(2x+1)", "(x-1)")),
    ans("y9-fnt-p3", "Factorise 3x² + 5x − 2.", "3x^2+5x-2", "(3x-1)(x+2)", 5, "ac = −6; 6, −1.", ff("(3x-1)", "(x+2)")),
    ans("y9-fnt-p4", "Factorise 4x² + 4x − 3.", "4x^2+4x-3", "(2x+3)(2x-1)", 5, "ac = −12; 6, −2.", ff("(2x+3)", "(2x-1)")),
    ans("y9-fnt-p5", "Factorise 6x² + 7x + 2.", "6x^2+7x+2", "(3x+2)(2x+1)", 5, "ac = 12; 4, 3.", ff("(3x+2)", "(2x+1)")),
    ans("y9-fnt-p6", "Factorise 2x² + 7x − 4.", "2x^2+7x-4", "(2x-1)(x+4)", 5, "ac = −8; 8, −1.", ff("(2x-1)", "(x+4)")),
    ans("y9-fnt-p7", "Factorise 3x² − 7x + 2.", "3x^2-7x+2", "(3x-1)(x-2)", 5, "ac = 6; −6, −1.", ff("(3x-1)", "(x-2)")),
    ans("y9-fnt-p8", "Factorise 5x² + 13x + 6.", "5x^2+13x+6", "(5x+3)(x+2)", 5, "ac = 30; 10, 3.", ff("(5x+3)", "(x+2)")),
    ans("y9-fnt-p9", "Factorise 4x² + 12x + 9.", "4x^2+12x+9", "(2x+3)(2x+3)", 5, "Perfect square (2x+3)².", ["(2x+3)^2", "(2x+3)²", "(2x + 3)(2x + 3)"]),
    ans("y9-fnt-p10", "Factorise 6x² − 5x + 1.", "6x^2-5x+1", "(3x-1)(2x-1)", 5, "ac = 6; −3, −2.", ff("(3x-1)", "(2x-1)")),
  ],
  commonMistakes: [
    { mistake: "Using product c instead of ac.", fix: "The product is a × c for non-monic." },
    { mistake: "Splitting the middle term wrongly.", fix: "Use the two numbers found from ac and b." },
    { mistake: "Forgetting to group after splitting.", fix: "Factor each pair and take out the bracket." },
    { mistake: "Sign errors with negative c.", fix: "Track signs through the split and grouping." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "factorising-by-grouping": factorisingGrouping,
  "factorising-monic-trinomials": factorisingMonic,
  "factorising-non-monic-trinomials": factorisingNonMonic,
};

export function year9Chapter9FactorisingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "quadratic-expressions-algebraic-techniques") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
