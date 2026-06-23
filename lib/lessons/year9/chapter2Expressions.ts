// Year 9 Wave 3 — Chapter 2 (Expressions, Equations & Inequalities), expressions/formulas sections
// (ADR-Y9-001): algebraic-expressions (consol), simplifying-algebraic-expressions (consol),
// expanding-algebraic-expressions (core), using-formulas (core). Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Work one step at a time and collect like terms.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Decide the rule before working.", explanation };
}

// ── algebraic-expressions (consolidating) ──────────────────────────────────────────────
const algebraicExpressions: Partial<ExplicitLesson> = {
  description: "Use pronumerals, identify terms and coefficients, and evaluate expressions by substitution.",
  learningIntention: "Read algebraic expressions and evaluate them by substitution.",
  successCriteria: ["Identify terms, coefficients and constants.", "Substitute values for pronumerals.", "Evaluate expressions with more than one pronumeral.", "Evaluate expressions involving powers."],
  teaching: {
    paragraphs: [
      "A PRONUMERAL is a letter that stands for a number. An expression like 3x + 2 is built from TERMS (3x and 2). In the term 3x, the 3 is the COEFFICIENT and 2 is a CONSTANT term.",
      "To EVALUATE an expression, SUBSTITUTE the given value for each pronumeral and compute. For 3x + 2 with x = 4: 3(4) + 2 = 14.",
      "With several pronumerals, substitute each: 2a + 3b with a = 1, b = 2 gives 2 + 6 = 8.",
      "Powers follow the same idea: x² with x = 3 is 3 × 3 = 9. Always apply order of operations after substituting.",
    ],
    latexBlocks: ["3x + 2 \\text{ at } x=4: \\ 3(4)+2 = 14", "2a+3b \\text{ at } a=1,b=2: \\ 2+6 = 8"],
  },
  workedExamples: [
    { title: "Substitute one value", questionLatex: "\\text{Evaluate } 3x+2 \\text{ when } x=4.", steps: [{ explanation: "3(4) + 2.", latex: "14" }], finalAnswerLatex: "14" },
    { title: "Coefficient", questionLatex: "\\text{State the coefficient of } x \\text{ in } 5x-7.", steps: [{ explanation: "The number multiplying x.", latex: "5" }], finalAnswerLatex: "5" },
    { title: "Two pronumerals", questionLatex: "\\text{Evaluate } 2a+3b \\text{ when } a=1, b=2.", steps: [{ explanation: "2 + 6.", latex: "8" }], finalAnswerLatex: "8" },
  ],
  guidedPractice: [
    ans("y9-aex-g1", "Evaluate 2x when x = 5.", "2x,\\ x=5", "10", 2, "2 × 5 = 10.", []),
    ans("y9-aex-g2", "Evaluate x + 7 when x = 3.", "x+7,\\ x=3", "10", 2, "3 + 7 = 10.", []),
    ans("y9-aex-g3", "State the coefficient of y in 4y.", "4y", "4", 2, "The number multiplying y is 4.", []),
    mcq("y9-aex-g4", "What is the constant term in 3x + 5?", "C", ["3", "x", "5", "3x"], 2, "The constant is the number with no pronumeral: 5."),
  ],
  independentPractice: [
    ans("y9-aex-i1", "Evaluate 5x − 3 when x = 2.", "5x-3,\\ x=2", "7", 2, "10 − 3 = 7.", []),
    ans("y9-aex-i2", "Evaluate 4a + b when a = 2, b = 3.", "4a+b", "11", 3, "8 + 3 = 11.", []),
    ans("y9-aex-i3", "Evaluate x² + 1 when x = 3.", "x^2+1,\\ x=3", "10", 3, "9 + 1 = 10.", []),
    ans("y9-aex-i4", "State the coefficient of x in 7 − 2x.", "7-2x", "-2", 3, "The coefficient of x is −2.", ["−2"]),
    mcq("y9-aex-i5", "How many terms are in 3x + 2y − 5?", "C", ["1", "2", "3", "4"], 2, "3x, 2y and −5 → 3 terms."),
  ],
  masteryQuiz: [
    ans("y9-aex-m1", "Evaluate 3x + 1 when x = 4.", "3x+1", "13", 2, "12 + 1 = 13.", []),
    ans("y9-aex-m2", "Evaluate 2(x + 3) when x = 5.", "2(x+3)", "16", 3, "2 × 8 = 16.", []),
    ans("y9-aex-m3", "Evaluate a² − a when a = 4.", "a^2-a", "12", 3, "16 − 4 = 12.", []),
    ans("y9-aex-m4", "State the coefficient of m in 6m.", "6m", "6", 2, "6.", []),
    mcq("y9-aex-m5", "What is the constant term in 2x − 7?", "D", ["2", "x", "2x", "−7"], 2, "Constant is −7."),
    ans("y9-aex-m6", "Evaluate xy when x = 3, y = 4.", "xy", "12", 2, "3 × 4 = 12.", []),
    ans("y9-aex-m7", "Evaluate 10 − 2x when x = 3.", "10-2x", "4", 2, "10 − 6 = 4.", []),
    ans("y9-aex-m8", "Evaluate 3a + 2b − c when a = 1, b = 2, c = 3.", "3a+2b-c", "4", 3, "3 + 4 − 3 = 4.", []),
    mcq("y9-aex-m9", "Which is the term containing a pronumeral in 4x + 9?", "A", ["4x", "9", "13", "x9"], 2, "4x contains the pronumeral x."),
    ans("y9-aex-m10", "Evaluate x/2 + 1 when x = 8.", "\\tfrac{x}{2}+1", "5", 3, "4 + 1 = 5.", []),
  ],
  masteryQuizPool: [
    ans("y9-aex-p1", "Evaluate 2x² − 3x when x = −2.", "2x^2-3x,\\ x=-2", "14", 5, "2(4) − 3(−2) = 8 + 6 = 14.", []),
    ans("y9-aex-p2", "Evaluate a² + b² when a = 3, b = 4.", "a^2+b^2", "25", 5, "9 + 16 = 25.", []),
    ans("y9-aex-p3", "Evaluate (x + y)/(x − y) when x = 5, y = 3.", "\\tfrac{x+y}{x-y}", "4", 5, "8 ÷ 2 = 4.", []),
    ans("y9-aex-p4", "Evaluate 3x² when x = −3.", "3x^2,\\ x=-3", "27", 5, "3 × 9 = 27.", []),
    ans("y9-aex-p5", "Evaluate −2a + 5 when a = −4.", "-2a+5,\\ a=-4", "13", 5, "−2(−4) + 5 = 8 + 5 = 13.", []),
    ans("y9-aex-p6", "Evaluate ab − b² when a = 5, b = 2.", "ab-b^2", "6", 5, "10 − 4 = 6.", []),
    ans("y9-aex-p7", "Evaluate (2x − 1)² when x = 3.", "(2x-1)^2,\\ x=3", "25", 5, "(5)² = 25.", []),
    ans("y9-aex-p8", "Evaluate x³ − x when x = −2.", "x^3-x,\\ x=-2", "-6", 5, "−8 − (−2) = −6.", ["−6"]),
    ans("y9-aex-p9", "Evaluate 5 − a²/2 when a = 4.", "5-\\tfrac{a^2}{2}", "-3", 5, "5 − 16/2 = 5 − 8 = −3.", ["−3"]),
    ans("y9-aex-p10", "Evaluate 2(a + b) − 3c when a = 4, b = 1, c = 2.", "2(a+b)-3c", "4", 5, "2(5) − 6 = 10 − 6 = 4.", []),
  ],
  commonMistakes: [
    { mistake: "Forgetting the coefficient's sign.", fix: "In 7 − 2x the coefficient of x is −2." },
    { mistake: "Adding before multiplying after substituting.", fix: "Apply order of operations: powers and × before +." },
    { mistake: "Squaring only part of a negative.", fix: "(−2)² = 4; substitute the whole value, in brackets." },
    { mistake: "Treating a constant as a term with a pronumeral.", fix: "The constant has no letter (e.g. −7)." },
  ],
  masteryPassMark: 0.8,
};

// ── simplifying-algebraic-expressions (consolidating) ──────────────────────────────────
const simplifyingExpressions: Partial<ExplicitLesson> = {
  description: "Collect like terms and multiply or divide algebraic terms to simplify expressions.",
  learningIntention: "Simplify expressions by collecting like terms and multiplying terms.",
  successCriteria: ["Identify like terms.", "Collect like terms.", "Multiply algebraic terms.", "Divide algebraic terms."],
  teaching: {
    paragraphs: [
      "LIKE TERMS have exactly the same pronumeral part: 3x and 5x are like terms, but 3x and 3y (or 3x and 3x²) are not. Only like terms can be added or subtracted.",
      "To COLLECT like terms, add or subtract their coefficients: 3x + 2x = 5x, and 5a − 2a + 3 = 3a + 3.",
      "To MULTIPLY terms, multiply the numbers and the pronumerals: 3x × 4 = 12x and 2a × 3b = 6ab; a × a = a².",
      "To DIVIDE terms, divide the numbers and cancel common pronumerals: 12x ÷ 4 = 3x and 6ab ÷ 3a = 2b.",
    ],
    latexBlocks: ["3x + 2x = 5x", "2a \\times 3b = 6ab", "6ab \\div 3a = 2b"],
  },
  workedExamples: [
    { title: "Collect like terms", questionLatex: "\\text{Simplify } 3x + 2x.", steps: [{ explanation: "Add coefficients.", latex: "5x" }], finalAnswerLatex: "5x" },
    { title: "Collect and keep constant", questionLatex: "\\text{Simplify } 5a - 2a + 3.", steps: [{ explanation: "5a − 2a = 3a.", latex: "3a + 3" }], finalAnswerLatex: "3a+3" },
    { title: "Multiply terms", questionLatex: "\\text{Simplify } 2a \\times 3b.", steps: [{ explanation: "2×3, a×b.", latex: "6ab" }], finalAnswerLatex: "6ab" },
  ],
  guidedPractice: [
    ans("y9-sim-g1", "Simplify 4y + 3y.", "4y+3y", "7y", 2, "Add coefficients: 7y.", []),
    ans("y9-sim-g2", "Simplify 7m − 2m.", "7m-2m", "5m", 2, "7 − 2 = 5 → 5m.", []),
    ans("y9-sim-g3", "Simplify 2x × 5.", "2x\\times5", "10x", 2, "2 × 5 = 10 → 10x.", []),
    mcq("y9-sim-g4", "Which is a like term with 3x?", "B", ["3y", "5x", "3", "x²"], 2, "5x has the same pronumeral part as 3x."),
  ],
  independentPractice: [
    ans("y9-sim-i1", "Simplify 6a + 2a − 3a.", "6a+2a-3a", "5a", 2, "6 + 2 − 3 = 5 → 5a.", []),
    ans("y9-sim-i2", "Simplify 4x + 3y + 2x.", "4x+3y+2x", "6x+3y", 3, "4x + 2x = 6x; +3y.", ["3y+6x"]),
    ans("y9-sim-i3", "Simplify 3a × 2b.", "3a\\times2b", "6ab", 2, "3×2, a×b → 6ab.", ["6ba"]),
    ans("y9-sim-i4", "Simplify 12x ÷ 4.", "12x\\div4", "3x", 2, "12 ÷ 4 = 3 → 3x.", []),
    mcq("y9-sim-i5", "Simplify 5x − 5x.", "A", ["0", "5x", "10x", "x"], 2, "Coefficients cancel → 0."),
  ],
  masteryQuiz: [
    ans("y9-sim-m1", "Simplify 8p − 3p.", "8p-3p", "5p", 2, "5p.", []),
    ans("y9-sim-m2", "Simplify 2a + 3b + 4a.", "2a+3b+4a", "6a+3b", 3, "2a + 4a = 6a; +3b.", ["3b+6a"]),
    ans("y9-sim-m3", "Simplify 5 × 3x.", "5\\times3x", "15x", 2, "15x.", []),
    ans("y9-sim-m4", "Simplify 4xy ÷ 2.", "4xy\\div2", "2xy", 2, "2xy.", ["2yx"]),
    mcq("y9-sim-m5", "Can 2x + 3x² be simplified to a single term?", "B", ["yes, 5x³", "no, they are not like terms", "yes, 5x", "yes, 6x"], 3, "x and x² differ → not like terms."),
    ans("y9-sim-m6", "Simplify 7m + 2m − 4m.", "7m+2m-4m", "5m", 2, "5m.", []),
    ans("y9-sim-m7", "Simplify 3a × 4a.", "3a\\times4a", "12a^2", 3, "3×4 = 12, a×a = a² → 12a².", ["12a²"]),
    ans("y9-sim-m8", "Simplify 10x − x.", "10x-x", "9x", 2, "10x − 1x = 9x.", []),
    ans("y9-sim-m9", "Simplify 6ab ÷ 3a.", "6ab\\div3a", "2b", 3, "6÷3 = 2, a cancels → 2b.", []),
    mcq("y9-sim-m10", "Which is a like term with 4y?", "C", ["4x", "y²", "−2y", "4"], 2, "−2y matches the pronumeral y."),
  ],
  masteryQuizPool: [
    ans("y9-sim-p1", "Simplify 3(x + 2) + 2x.", "3(x+2)+2x", "5x+6", 5, "3x + 6 + 2x = 5x + 6.", ["6+5x"]),
    ans("y9-sim-p2", "Simplify 5a − 2(a − 3).", "5a-2(a-3)", "3a+6", 5, "5a − 2a + 6 = 3a + 6.", ["6+3a"]),
    ans("y9-sim-p3", "Simplify 2x² + 3x − x² + x.", "2x^2+3x-x^2+x", "x^2+4x", 5, "x² + 4x.", ["x²+4x"]),
    ans("y9-sim-p4", "Simplify 6a²b ÷ 2ab.", "6a^2b\\div2ab", "3a", 5, "6÷2 = 3, a²/a = a, b cancels → 3a.", []),
    ans("y9-sim-p5", "Simplify 4(2x − 1) − (x − 5).", "4(2x-1)-(x-5)", "7x+1", 5, "8x − 4 − x + 5 = 7x + 1.", ["1+7x"]),
    ans("y9-sim-p6", "Simplify 3xy × 2x.", "3xy\\times2x", "6x^2y", 5, "3×2 = 6, x×x = x² → 6x²y.", ["6x²y"]),
    ans("y9-sim-p7", "Simplify 7m − 3 + 2m − 5.", "7m-3+2m-5", "9m-8", 5, "9m − 8.", []),
    ans("y9-sim-p8", "Simplify (12a²) ÷ (4a).", "12a^2\\div4a", "3a", 5, "12÷4 = 3, a²/a = a → 3a.", []),
    ans("y9-sim-p9", "Simplify 2(3x + y) + 3(x − 2y).", "2(3x+y)+3(x-2y)", "9x-4y", 5, "6x + 2y + 3x − 6y = 9x − 4y.", []),
    ans("y9-sim-p10", "Simplify 5ab + 2ba − ab.", "5ab+2ba-ab", "6ab", 5, "ba = ab, so 5 + 2 − 1 = 6 → 6ab.", ["6ba"]),
  ],
  commonMistakes: [
    { mistake: "Combining unlike terms.", fix: "Only add/subtract terms with identical pronumeral parts." },
    { mistake: "Adding exponents when multiplying coefficients.", fix: "3a × 4a = 12a² (multiply numbers, add the a's powers)." },
    { mistake: "Forgetting a × a = a².", fix: "Same pronumeral multiplied raises the power." },
    { mistake: "Dropping a minus when distributing −(x − 5).", fix: "−(x − 5) = −x + 5." },
  ],
  masteryPassMark: 0.8,
};

// ── expanding-algebraic-expressions (core) ─────────────────────────────────────────────
const expandingExpressions: Partial<ExplicitLesson> = {
  description: "Expand expressions with brackets using the distributive law, then collect like terms.",
  learningIntention: "Expand single brackets and simplify the result.",
  successCriteria: ["Apply the distributive law a(b + c) = ab + ac.", "Expand with negative factors.", "Expand a pronumeral times a bracket.", "Expand and collect like terms."],
  teaching: {
    paragraphs: [
      "EXPANDING uses the DISTRIBUTIVE LAW: multiply the term outside the bracket by every term inside. 3(x + 2) = 3x + 6.",
      "Watch the SIGNS. 2(3x − 4) = 6x − 8, and a NEGATIVE factor flips signs: −3(x + 2) = −3x − 6. Also −(x − 4) = −x + 4.",
      "A PRONUMERAL can be the multiplier: x(x + 5) = x² + 5x.",
      "After expanding several brackets, COLLECT like terms: 2(x + 1) + 3(x + 2) = 2x + 2 + 3x + 6 = 5x + 8.",
    ],
    latexBlocks: ["a(b+c) = ab + ac", "-3(x+2) = -3x - 6", "x(x+5) = x^2 + 5x"],
  },
  workedExamples: [
    { title: "Single bracket", questionLatex: "\\text{Expand } 3(x+2).", steps: [{ explanation: "3×x, 3×2.", latex: "3x + 6" }], finalAnswerLatex: "3x+6" },
    { title: "Negative inside", questionLatex: "\\text{Expand } 2(3x-4).", steps: [{ explanation: "2×3x, 2×(−4).", latex: "6x - 8" }], finalAnswerLatex: "6x-8" },
    { title: "Pronumeral factor", questionLatex: "\\text{Expand } x(x+5).", steps: [{ explanation: "x×x, x×5.", latex: "x^2 + 5x" }], finalAnswerLatex: "x^2+5x" },
  ],
  guidedPractice: [
    ans("y9-exp-g1", "Expand 2(x + 3).", "2(x+3)", "2x+6", 2, "2x + 6.", ["6+2x"]),
    ans("y9-exp-g2", "Expand 4(a − 1).", "4(a-1)", "4a-4", 2, "4a − 4.", []),
    ans("y9-exp-g3", "Expand −3(x + 2).", "-3(x+2)", "-3x-6", 3, "−3x − 6.", ["−3x−6"]),
    mcq("y9-exp-g4", "Expand 5(2x).", "A", ["10x", "7x", "52x", "10"], 2, "5 × 2x = 10x."),
  ],
  independentPractice: [
    ans("y9-exp-i1", "Expand 3(2x + 5).", "3(2x+5)", "6x+15", 2, "6x + 15.", ["15+6x"]),
    ans("y9-exp-i2", "Expand −2(3a − 4).", "-2(3a-4)", "-6a+8", 3, "−6a + 8.", ["8-6a"]),
    ans("y9-exp-i3", "Expand x(x − 3).", "x(x-3)", "x^2-3x", 3, "x² − 3x.", ["x²-3x"]),
    ans("y9-exp-i4", "Expand and simplify 2(x + 1) + 3(x + 2).", "2(x+1)+3(x+2)", "5x+8", 3, "2x+2+3x+6 = 5x+8.", ["8+5x"]),
    mcq("y9-exp-i5", "Expand −(x − 4).", "B", ["−x − 4", "−x + 4", "x − 4", "x + 4"], 3, "Distribute −1: −x + 4."),
  ],
  masteryQuiz: [
    ans("y9-exp-m1", "Expand 4(x + 2).", "4(x+2)", "4x+8", 2, "4x + 8.", ["8+4x"]),
    ans("y9-exp-m2", "Expand 3(2a − 5).", "3(2a-5)", "6a-15", 2, "6a − 15.", []),
    ans("y9-exp-m3", "Expand −2(x + 6).", "-2(x+6)", "-2x-12", 3, "−2x − 12.", ["−2x−12"]),
    ans("y9-exp-m4", "Expand 2x(x + 3).", "2x(x+3)", "2x^2+6x", 3, "2x² + 6x.", ["2x²+6x"]),
    mcq("y9-exp-m5", "Expand 5(x − 2).", "C", ["5x − 2", "5x + 10", "5x − 10", "x − 10"], 2, "5x − 10."),
    ans("y9-exp-m6", "Expand and simplify 3(x + 1) + 2(x − 4).", "3(x+1)+2(x-4)", "5x-5", 3, "3x+3+2x−8 = 5x−5.", []),
    ans("y9-exp-m7", "Expand −(2x − 7).", "-(2x-7)", "-2x+7", 3, "−2x + 7.", ["7-2x"]),
    ans("y9-exp-m8", "Expand a(2a + 3).", "a(2a+3)", "2a^2+3a", 3, "2a² + 3a.", ["2a²+3a"]),
    ans("y9-exp-m9", "Expand and simplify 4(2x − 1) − 3.", "4(2x-1)-3", "8x-7", 3, "8x − 4 − 3 = 8x − 7.", []),
    mcq("y9-exp-m10", "Expand −4(2 − x).", "D", ["−8 − 4x", "8 − 4x", "−8 − x", "−8 + 4x"], 3, "−4×2 = −8, −4×(−x) = +4x → −8 + 4x."),
  ],
  masteryQuizPool: [
    ans("y9-exp-p1", "Expand and simplify (x + 2)(x + 3).", "(x+2)(x+3)", "x^2+5x+6", 5, "x²+3x+2x+6 = x²+5x+6.", ["x²+5x+6"]),
    ans("y9-exp-p2", "Expand and simplify 2(x + 3) − (x − 4).", "2(x+3)-(x-4)", "x+10", 5, "2x+6−x+4 = x+10.", ["10+x"]),
    ans("y9-exp-p3", "Expand and simplify (x − 5)(x + 5).", "(x-5)(x+5)", "x^2-25", 5, "Difference of squares: x² − 25.", ["x²-25"]),
    ans("y9-exp-p4", "Expand and simplify 3(2x − 1) − 2(x + 4).", "3(2x-1)-2(x+4)", "4x-11", 5, "6x−3−2x−8 = 4x−11.", []),
    ans("y9-exp-p5", "Expand and simplify (2x + 1)(x − 3).", "(2x+1)(x-3)", "2x^2-5x-3", 5, "2x²−6x+x−3 = 2x²−5x−3.", ["2x²-5x-3"]),
    ans("y9-exp-p6", "Expand and simplify (x + 4)².", "(x+4)^2", "x^2+8x+16", 5, "(x+4)(x+4) = x²+8x+16.", ["x²+8x+16"]),
    ans("y9-exp-p7", "Expand and simplify x(x + 2) + 3(x + 2).", "x(x+2)+3(x+2)", "x^2+5x+6", 5, "x²+2x+3x+6 = x²+5x+6.", ["x²+5x+6"]),
    ans("y9-exp-p8", "Expand and simplify −2(x − 3) + 4(2x − 1).", "-2(x-3)+4(2x-1)", "6x+2", 5, "−2x+6+8x−4 = 6x+2.", ["2+6x"]),
    ans("y9-exp-p9", "Expand and simplify (3x − 2)(x + 1).", "(3x-2)(x+1)", "3x^2+x-2", 5, "3x²+3x−2x−2 = 3x²+x−2.", ["3x²+x-2"]),
    ans("y9-exp-p10", "Expand and simplify (x − 3)².", "(x-3)^2", "x^2-6x+9", 5, "(x−3)(x−3) = x²−6x+9.", ["x²-6x+9"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying only the first term inside the bracket.", fix: "Multiply the outside term by EVERY term inside." },
    { mistake: "Mishandling a negative factor.", fix: "−3(x + 2) = −3x − 6 (both signs change)." },
    { mistake: "Writing x·x as 2x.", fix: "x × x = x²." },
    { mistake: "Forgetting to collect like terms after expanding.", fix: "Combine like terms for the final answer." },
  ],
  masteryPassMark: 0.8,
};

// ── using-formulas (core) ──────────────────────────────────────────────────────────────
const usingFormulas: Partial<ExplicitLesson> = {
  description: "Substitute values into formulas to find a result, and solve for an unknown in a formula.",
  learningIntention: "Use formulas by substitution and find an unknown quantity.",
  successCriteria: ["Substitute values into a formula.", "Use area, perimeter and motion formulas.", "Find a subject value by computing.", "Solve for an unknown given the others."],
  teaching: {
    paragraphs: [
      "A FORMULA is a rule connecting quantities, e.g. area A = lw. To use it, SUBSTITUTE the known values and compute: with l = 5, w = 3, A = 5 × 3 = 15.",
      "Other common formulas: perimeter P = 2(l + w), area of a triangle A = ½bh, and motion v = u + at.",
      "Substitute carefully, keeping units and order of operations: v = u + at with u = 2, a = 3, t = 4 gives 2 + 12 = 14.",
      "To find an UNKNOWN that isn't the subject, substitute what you know and solve the resulting equation: in v = u + at with v = 20, u = 5, t = 3, then 20 = 5 + 3a, so a = 5.",
    ],
    latexBlocks: ["A = lw,\\ P = 2(l+w)", "A = \\tfrac12 bh,\\ v = u + at", "20 = 5 + 3a \\Rightarrow a = 5"],
  },
  workedExamples: [
    { title: "Area", questionLatex: "A = lw, \\ l=5, w=3.", steps: [{ explanation: "5 × 3.", latex: "15" }], finalAnswerLatex: "15" },
    { title: "Perimeter", questionLatex: "P = 2(l+w), \\ l=4, w=6.", steps: [{ explanation: "2 × 10.", latex: "20" }], finalAnswerLatex: "20" },
    { title: "Motion", questionLatex: "v = u + at, \\ u=2, a=3, t=4.", steps: [{ explanation: "2 + 12.", latex: "14" }], finalAnswerLatex: "14" },
  ],
  guidedPractice: [
    ans("y9-frm-g1", "A = ½bh. Find A when b = 6, h = 4.", "A=\\tfrac12bh", "12", 2, "½ × 6 × 4 = 12.", []),
    ans("y9-frm-g2", "C = πd (use π ≈ 3.14). Find C when d = 10.", "C=\\pi d", "31.4", 3, "3.14 × 10 = 31.4.", []),
    ans("y9-frm-g3", "s = d/t. Find s when d = 100, t = 4.", "s=\\tfrac{d}{t}", "25", 2, "100 ÷ 4 = 25.", []),
    mcq("y9-frm-g4", "In A = lw, A represents the:", "B", ["perimeter", "area", "length", "width"], 2, "A = length × width is the area."),
  ],
  independentPractice: [
    ans("y9-frm-i1", "A = s². Find A when s = 7.", "A=s^2", "49", 2, "7² = 49.", []),
    ans("y9-frm-i2", "v = u + at. Find v when u = 5, a = 2, t = 3.", "v=u+at", "11", 2, "5 + 6 = 11.", []),
    ans("y9-frm-i3", "P = 4s. Find P when s = 9.", "P=4s", "36", 2, "4 × 9 = 36.", []),
    ans("y9-frm-i4", "F = ma. Find F when m = 10, a = 3.", "F=ma", "30", 2, "10 × 3 = 30.", []),
    ans("y9-frm-i5", "C = 2πr (use π ≈ 3.14). Find C when r = 5.", "C=2\\pi r", "31.4", 3, "2 × 3.14 × 5 = 31.4.", []),
  ],
  masteryQuiz: [
    ans("y9-frm-m1", "A = lw. Find A when l = 8, w = 4.", "A=lw", "32", 2, "32.", []),
    ans("y9-frm-m2", "P = 2(l + w). Find P when l = 7, w = 3.", "P=2(l+w)", "20", 2, "2 × 10 = 20.", []),
    ans("y9-frm-m3", "A = ½bh. Find A when b = 10, h = 6.", "A=\\tfrac12bh", "30", 2, "½ × 60 = 30.", []),
    ans("y9-frm-m4", "v = u + at. Find v when u = 0, a = 10, t = 5.", "v=u+at", "50", 2, "0 + 50 = 50.", []),
    mcq("y9-frm-m5", "In C = πd, if d doubles then C:", "A", ["doubles", "halves", "stays the same", "quadruples"], 3, "C is proportional to d."),
    ans("y9-frm-m6", "s = d/t. Find s when d = 120, t = 3.", "s=\\tfrac{d}{t}", "40", 2, "40.", []),
    ans("y9-frm-m7", "V = lwh. Find V when l = 2, w = 3, h = 4.", "V=lwh", "24", 2, "24.", []),
    ans("y9-frm-m8", "A = πr² (use π ≈ 3.14). Find A when r = 10.", "A=\\pi r^2", "314", 3, "3.14 × 100 = 314.", []),
    ans("y9-frm-m9", "d = st. Find d when s = 60, t = 2.", "d=st", "120", 2, "120.", []),
    mcq("y9-frm-m10", "In F = ma, if m doubles (a fixed) then F:", "A", ["doubles", "halves", "is unchanged", "becomes zero"], 3, "F is proportional to m."),
  ],
  masteryQuizPool: [
    ans("y9-frm-p1", "v = u + at. Find a when v = 20, u = 5, t = 3.", "v=u+at", "5", 5, "20 = 5 + 3a → 3a = 15 → a = 5.", []),
    ans("y9-frm-p2", "A = ½bh. Find h when A = 24, b = 8.", "A=\\tfrac12bh", "6", 5, "24 = ½(8)h = 4h → h = 6.", []),
    ans("y9-frm-p3", "C = 2πr (π ≈ 3.14). Find r when C = 31.4.", "C=2\\pi r", "5", 5, "31.4 = 6.28r → r = 5.", []),
    ans("y9-frm-p4", "P = 2(l + w). Find w when P = 30, l = 8.", "P=2(l+w)", "7", 5, "30 = 2(8 + w) → 8 + w = 15 → w = 7.", []),
    ans("y9-frm-p5", "A = lw. Find l when A = 48, w = 6.", "A=lw", "8", 5, "48 = 6l → l = 8.", []),
    ans("y9-frm-p6", "s = d/t. Find d when s = 25, t = 4.", "s=\\tfrac{d}{t}", "100", 5, "d = s × t = 100.", []),
    ans("y9-frm-p7", "F = ma. Find m when F = 45, a = 9.", "F=ma", "5", 5, "45 = 9m → m = 5.", []),
    ans("y9-frm-p8", "A = πr² (π ≈ 3.14). Find A when r = 3.", "A=\\pi r^2", "28.26", 5, "3.14 × 9 = 28.26.", []),
    ans("y9-frm-p9", "v = u + at. Find t when v = 30, u = 6, a = 4.", "v=u+at", "6", 5, "30 = 6 + 4t → 4t = 24 → t = 6.", []),
    ans("y9-frm-p10", "V = lwh. Find h when V = 60, l = 5, w = 3.", "V=lwh", "4", 5, "60 = 15h → h = 4.", []),
  ],
  commonMistakes: [
    { mistake: "Substituting into the wrong variable.", fix: "Match each value to its pronumeral before computing." },
    { mistake: "Ignoring order of operations.", fix: "Do multiplication in u + at before adding u." },
    { mistake: "Forgetting the ½ in the triangle area.", fix: "A = ½bh, not bh." },
    { mistake: "Not solving the equation when the unknown isn't the subject.", fix: "Substitute, then solve for the unknown." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "algebraic-expressions": algebraicExpressions,
  "simplifying-algebraic-expressions": simplifyingExpressions,
  "expanding-algebraic-expressions": expandingExpressions,
  "using-formulas": usingFormulas,
};

export function year9Chapter2ExpressionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "expressions-equations-inequalities") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
