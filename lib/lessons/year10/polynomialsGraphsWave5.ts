// Year 10 restructure — Wave 5 (Polynomials & Graphs). Authors the polynomial/graph stubs in
// Unit 10 (functions-polynomials-graphs): introducing-polynomials (10B),
// expanding-simplifying-polynomials (10C), dividing-polynomials (10D),
// remainder-factor-theorem (10E), factorising-find-zeros (10F), graphing-cubics (10G),
// graphs-of-polynomials (10H), further-transformations (10K). (functions-notation 10A is Wave 4.)
// Architecture untouched. Prose uses unicode superscripts (no raw ^ or _). Y10 audit:
// 3 worked examples + 4 commonMistakes + 4/5/10 + masteryPassMark 0.8.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Look at the structure first, then work step by step.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Reason about the structure, then check each option.", explanation };
}

// ── 10B Introducing Polynomials (path) ─────────────────────────────────────────────────
const introPolynomials: Partial<ExplicitLesson> = {
  description: "Identify polynomials and describe them by degree, leading coefficient, constant term and number of terms.",
  learningIntention: "Recognise polynomials and read off their key structural features.",
  successCriteria: ["Decide whether an expression is a polynomial.", "State the degree (highest power).", "Identify the leading coefficient and constant term.", "Count the terms."],
  teaching: {
    paragraphs: [
      "A POLYNOMIAL is a sum of terms of the form (number) × xⁿ where every power n is a whole number (0, 1, 2, …). So 3x⁴ + 2x − 1 is a polynomial, but 3x² + 1/x is not, because 1/x is x⁻¹ — a negative power. Square roots of x (fractional powers) are also not allowed.",
      "The DEGREE is the highest power present. In 3x⁴ + 2x − 1 the degree is 4. A constant like 7 has degree 0 (it is 7x⁰).",
      "The LEADING COEFFICIENT is the number in front of the highest-power term — the 3 in 3x⁴ + …. The CONSTANT TERM is the term with no x (the −1). If there is no plain number, the constant term is 0.",
      "Reading these features first — degree, leading coefficient, constant — tells you the size and shape of the polynomial before you do any algebra. Structure before procedure.",
    ],
    latexBlocks: ["\\text{polynomial: } a_nx^n + \\dots + a_1x + a_0,\\ n \\text{ whole}", "\\text{degree} = \\text{highest power};\\ \\text{leading coeff} = a_n", "3x^2 + \\tfrac{1}{x}\\ \\text{is NOT a polynomial}"],
  },
  workedExamples: [
    { title: "Degree", questionLatex: "\\text{State the degree of } 3x^4 + 2x - 1.", steps: [{ explanation: "Highest power present.", latex: "\\text{degree} = 4" }], finalAnswerLatex: "4" },
    { title: "Leading coefficient", questionLatex: "\\text{State the leading coefficient of } 5x^3 + 2x.", steps: [{ explanation: "Number in front of the highest-power term.", latex: "5" }], finalAnswerLatex: "5" },
    { title: "Not a polynomial", questionLatex: "\\text{Is } 3x^2 + \\tfrac{1}{x} \\text{ a polynomial?}", steps: [{ explanation: "1/x is a negative power (x⁻¹), not allowed.", latex: "\\text{No}" }], finalAnswerLatex: "\\text{No}" },
  ],
  guidedPractice: [
    mcq("y10-ip-g1", "State the degree of x³ + 2x² + 1.", "C", ["1", "2", "3", "6"], 2, "The highest power present is 3, so the degree is 3."),
    ans("y10-ip-g2", "State the leading coefficient of 4x² + 3x.", "4x^2 + 3x", "4", 2, "The number in front of the highest-power term (x²) is 4.", []),
    ans("y10-ip-g3", "State the constant term of 2x³ + 5.", "2x^3 + 5", "5", 1, "The term with no x is 5.", []),
    mcq("y10-ip-g4", "Which of these is a polynomial?", "A", ["$x^2 + 3x$", "$x^{-1} + 1$", "$\\sqrt{x} + 2$", "$\\tfrac{1}{x} + x$"], 3, "x² + 3x has only whole-number powers; the others use negative or fractional powers."),
  ],
  independentPractice: [
    mcq("y10-ip-i1", "State the degree of the constant 7.", "C", ["7", "1", "0", "undefined"], 2, "A constant is 7x⁰, so its degree is 0."),
    ans("y10-ip-i2", "State the degree of 2x⁵ + x³.", "2x^5 + x^3", "5", 2, "Highest power is 5.", []),
    ans("y10-ip-i3", "State the constant term of x² + 4x + 9.", "x^2 + 4x + 9", "9", 1, "The term with no x is 9.", []),
    ans("y10-ip-i4", "State the leading coefficient of −3x⁴ + x.", "-3x^4 + x", "-3", 2, "The coefficient of the highest-power term (x⁴) is −3.", ["−3"]),
    mcq("y10-ip-i5", "Is x^(1/2) + 1 a polynomial?", "B", ["Yes", "No", "Only if x > 0", "Only for whole x"], 3, "x^(1/2) is a fractional power (a square root), so it is not a polynomial."),
  ],
  masteryQuiz: [
    ans("y10-ip-m1", "State the degree of 5x² + 2x⁶ + 1.", "5x^2 + 2x^6 + 1", "6", 2, "The highest power present is 6.", []),
    mcq("y10-ip-m2", "How many terms does 3x² + 2x + 1 have?", "C", ["1", "2", "3", "4"], 1, "Three separate terms: 3x², 2x and 1."),
    ans("y10-ip-m3", "State the leading coefficient of x³.", "x^3", "1", 2, "x³ has an implied coefficient of 1.", []),
    ans("y10-ip-m4", "State the constant term of 4x² + 7x.", "4x^2 + 7x", "0", 2, "There is no plain number term, so the constant term is 0.", []),
    mcq("y10-ip-m5", "The degree of a non-zero constant is:", "A", ["0", "1", "the constant", "undefined"], 2, "A constant is degree 0."),
    ans("y10-ip-m6", "State the degree of x + 1.", "x + 1", "1", 1, "Highest power is 1.", []),
    ans("y10-ip-m7", "State the leading coefficient of 6 − 2x³.", "6 - 2x^3", "-2", 2, "The highest-power term is −2x³, so the leading coefficient is −2.", ["−2"]),
    mcq("y10-ip-m8", "Which of these is NOT a polynomial?", "C", ["$x^4 - 1$", "$2x^2 + x$", "$\\tfrac{2}{x} + 1$", "$5$"], 3, "2/x is x⁻¹, a negative power, so it is not a polynomial."),
    ans("y10-ip-m9", "State the degree of 3x⁴ + 2x⁴ (after collecting).", "3x^4 + 2x^4", "4", 3, "Collecting gives 5x⁴, degree 4.", []),
    ans("y10-ip-m10", "State the constant term of 2x³ − 5x + 8.", "2x^3 - 5x + 8", "8", 1, "The term with no x is 8.", []),
  ],
  commonMistakes: [
    { mistake: "Calling x⁻¹ or √x terms polynomials.", fix: "Polynomials only allow whole-number powers." },
    { mistake: "Reading the degree from the first term rather than the highest power.", fix: "Find the highest power anywhere in the expression." },
    { mistake: "Confusing leading coefficient with constant term.", fix: "Leading coefficient is on the highest power; constant has no x." },
    { mistake: "Saying a constant has no degree.", fix: "A non-zero constant has degree 0." },
  ],
  masteryPassMark: 0.8,
};

// ── 10C Expanding and Simplifying Polynomials (path) ───────────────────────────────────
const expandSimplify: Partial<ExplicitLesson> = {
  description: "Expand products of polynomials and add or subtract polynomials by collecting like terms.",
  learningIntention: "Expand and simplify polynomial expressions, keeping track of every term.",
  successCriteria: ["Multiply each term of one factor by each term of the other.", "Collect like terms after expanding.", "Add and subtract polynomials term by term.", "State the degree of the result."],
  teaching: {
    paragraphs: [
      "Expanding a product means multiplying EVERY term in one bracket by every term in the other, then collecting like terms. It is the distributive law applied carefully — nothing in either bracket is skipped.",
      "For (x + 1)(x² + 2x + 3): multiply x by each term (x³ + 2x² + 3x), then 1 by each term (x² + 2x + 3), then add the like terms to get x³ + 3x² + 5x + 3.",
      "Adding or subtracting polynomials is just collecting like terms: (2x² + 3x) + (x² − x) = 3x² + 2x. Subtraction needs care with signs — subtract EVERY term, so (4x² + 3x − 1) − (x² + x − 1) = 3x² + 2x.",
      "Check the degree of your answer makes sense: multiplying a degree-1 by a degree-2 gives degree 3 (the degrees add). Structure first, then the arithmetic.",
    ],
    latexBlocks: ["(x+1)(x^2+2x+3) = x^3 + 3x^2 + 5x + 3", "(2x^2+3x)+(x^2-x) = 3x^2+2x", "\\deg(P \\cdot Q) = \\deg P + \\deg Q"],
  },
  workedExamples: [
    { title: "Two binomials", questionLatex: "\\text{Expand } (x+2)(x+3).", steps: [{ explanation: "Multiply each pair and collect.", latex: "x^2 + 3x + 2x + 6 = x^2 + 5x + 6" }], finalAnswerLatex: "x^2 + 5x + 6" },
    { title: "Binomial × trinomial", questionLatex: "\\text{Expand } (x+1)(x^2+x+1).", steps: [{ explanation: "x times each, then 1 times each.", latex: "x^3+x^2+x + x^2+x+1" }, { explanation: "Collect like terms.", latex: "= x^3 + 2x^2 + 2x + 1" }], finalAnswerLatex: "x^3 + 2x^2 + 2x + 1" },
    { title: "Subtracting polynomials", questionLatex: "\\text{Simplify } (4x^2+3x-1)-(x^2+x-1).", steps: [{ explanation: "Subtract every term.", latex: "4x^2-x^2 + 3x-x -1+1" }, { explanation: "Collect.", latex: "= 3x^2 + 2x" }], finalAnswerLatex: "3x^2 + 2x" },
  ],
  guidedPractice: [
    mcq("y10-es-g1", "Expand (x + 1)(x + 4).", "A", ["$x^2 + 5x + 4$", "$x^2 + 4x + 4$", "$x^2 + 5x + 5$", "$x^2 + 4$"], 2, "x² + 4x + x + 4 = x² + 5x + 4."),
    mcq("y10-es-g2", "Simplify (x² + 2x) + (3x² + x).", "B", ["$3x^2 + 3x$", "$4x^2 + 3x$", "$4x^2 + x$", "$3x^3 + 3x$"], 2, "x² + 3x² = 4x², 2x + x = 3x."),
    mcq("y10-es-g3", "Expand x(x² + 3).", "A", ["$x^3 + 3x$", "$x^2 + 3x$", "$x^3 + 3$", "$3x^3$"], 2, "x·x² = x³ and x·3 = 3x."),
    mcq("y10-es-g4", "Simplify (5x² − 2x) − (2x² − 2x).", "C", ["$3x^2 - 4x$", "$7x^2$", "$3x^2$", "$3x^2 - 2x$"], 3, "5x² − 2x² = 3x²; −2x − (−2x) = 0."),
  ],
  independentPractice: [
    mcq("y10-es-i1", "Expand (x + 2)(x² + 1).", "A", ["$x^3 + 2x^2 + x + 2$", "$x^3 + x + 2$", "$x^3 + 2x^2 + 2$", "$x^2 + 2x + 2$"], 3, "x³ + x + 2x² + 2, collected: x³ + 2x² + x + 2."),
    mcq("y10-es-i2", "Simplify (x³ + 2x) + (x³ − x).", "B", ["$x^3 + x$", "$2x^3 + x$", "$2x^3 + 3x$", "$x^6 + x$"], 2, "x³ + x³ = 2x³; 2x − x = x."),
    mcq("y10-es-i3", "Expand 2x(x² − x + 1).", "A", ["$2x^3 - 2x^2 + 2x$", "$2x^3 - x + 1$", "$2x^2 - 2x + 2$", "$2x^3 + 2x$"], 3, "2x times each term: 2x³ − 2x² + 2x."),
    mcq("y10-es-i4", "Simplify (4x² + 3x − 1) − (x² + x − 1).", "C", ["$3x^2 + 4x$", "$5x^2 + 2x$", "$3x^2 + 2x$", "$3x^2 + 2x - 2$"], 3, "3x² + 2x + 0."),
    mcq("y10-es-i5", "Expand (x − 1)(x + 1).", "A", ["$x^2 - 1$", "$x^2 + 1$", "$x^2 - 2x - 1$", "$x^2 - x$"], 2, "Difference of squares: x² − 1."),
  ],
  masteryQuiz: [
    mcq("y10-es-m1", "Expand (x + 3)(x + 5).", "A", ["$x^2 + 8x + 15$", "$x^2 + 15x + 8$", "$x^2 + 8x + 8$", "$x^2 + 15$"], 2, "x² + 5x + 3x + 15 = x² + 8x + 15."),
    mcq("y10-es-m2", "Simplify (x² + x) + (x² + x).", "B", ["$x^2 + 2x$", "$2x^2 + 2x$", "$2x^2 + x$", "$2x^4 + 2x$"], 2, "Double each like term: 2x² + 2x."),
    mcq("y10-es-m3", "Expand x²(x + 4).", "A", ["$x^3 + 4x^2$", "$x^3 + 4$", "$x^2 + 4x^2$", "$4x^3$"], 2, "x²·x = x³ and x²·4 = 4x²."),
    mcq("y10-es-m4", "Simplify (3x³ + 2x) − (x³ + 2x).", "C", ["$3x^3$", "$2x^3 + 4x$", "$2x^3$", "$4x^3$"], 3, "3x³ − x³ = 2x³; 2x − 2x = 0."),
    mcq("y10-es-m5", "The degree of the product (x + 1)(x² + 1) is:", "B", ["2", "3", "4", "1"], 3, "Degrees add: 1 + 2 = 3."),
    mcq("y10-es-m6", "Expand (x + 2)(x − 2).", "A", ["$x^2 - 4$", "$x^2 + 4$", "$x^2 - 4x$", "$x^2 - 2x - 4$"], 2, "Difference of squares: x² − 4."),
    mcq("y10-es-m7", "Simplify (2x² + 5) + (3x² − 5).", "B", ["$5x^2 + 10$", "$5x^2$", "$5x^2 - 10$", "$6x^2$"], 2, "2x² + 3x² = 5x²; 5 − 5 = 0."),
    mcq("y10-es-m8", "Expand (x − 3)(x − 4).", "A", ["$x^2 - 7x + 12$", "$x^2 + 7x + 12$", "$x^2 - 12x + 7$", "$x^2 - 12$"], 3, "x² − 4x − 3x + 12 = x² − 7x + 12."),
    mcq("y10-es-m9", "Expand 3x(2x² + x).", "A", ["$6x^3 + 3x^2$", "$6x^3 + x$", "$5x^3 + 3x^2$", "$6x^2 + 3x$"], 3, "3x·2x² = 6x³ and 3x·x = 3x²."),
    mcq("y10-es-m10", "Simplify (x³ + x² + x) − (x² + x).", "B", ["$x^3 + 2x^2 + 2x$", "$x^3$", "$x^3 + x$", "$x^3 - x^2$"], 3, "x³ + (x² − x²) + (x − x) = x³."),
  ],
  commonMistakes: [
    { mistake: "Multiplying only the first terms of each bracket.", fix: "Multiply EVERY term by every term, then collect." },
    { mistake: "Dropping a sign when subtracting a polynomial.", fix: "Subtract every term: −(x² + x − 1) = −x² − x + 1." },
    { mistake: "Adding powers when collecting like terms.", fix: "Like terms keep their power; only coefficients add." },
    { mistake: "Forgetting to collect after expanding.", fix: "Combine like terms so the answer is in simplest form." },
  ],
  masteryPassMark: 0.8,
};

// ── 10D Dividing Polynomials (path) ────────────────────────────────────────────────────
const dividingPolynomials: Partial<ExplicitLesson> = {
  description: "Divide a polynomial by a linear factor, finding the quotient and any remainder.",
  learningIntention: "Divide polynomials and interpret the quotient and remainder.",
  successCriteria: ["Divide a polynomial by a linear factor for an exact result.", "Identify a non-zero remainder.", "Use degree to predict the quotient's degree.", "Relate division to P(x) = D(x)Q(x) + R."],
  teaching: {
    paragraphs: [
      "Dividing polynomials works like dividing numbers: P(x) ÷ D(x) gives a QUOTIENT Q(x) and a REMAINDER R, so that P(x) = D(x) × Q(x) + R. When R = 0 the division is exact and D(x) is a factor.",
      "When the factors are known this is quick: (x² + 5x + 6) ÷ (x + 2) = x + 3, because (x + 2)(x + 3) = x² + 5x + 6 exactly (remainder 0).",
      "If it does not divide exactly there is a remainder: (x² + 3x + 5) ÷ (x + 1) = x + 2 remainder 3, because (x + 1)(x + 2) = x² + 3x + 2, which is 3 short of x² + 3x + 5.",
      "Degrees guide you: dividing a degree-3 polynomial by a degree-1 gives a degree-2 quotient (the degrees subtract). Single terms divide by the index laws: x⁶ ÷ x² = x⁴.",
    ],
    latexBlocks: ["P(x) = D(x)\\,Q(x) + R", "(x^2+5x+6) \\div (x+2) = x+3", "\\deg Q = \\deg P - \\deg D"],
  },
  workedExamples: [
    { title: "Exact division", questionLatex: "\\text{Divide } (x^2+5x+6) \\div (x+2).", steps: [{ explanation: "Find Q so (x+2)Q = x²+5x+6.", latex: "(x+2)(x+3) = x^2+5x+6" }], finalAnswerLatex: "x+3" },
    { title: "With a remainder", questionLatex: "\\text{Divide } (x^2+3x+5) \\div (x+1).", steps: [{ explanation: "(x+1)(x+2) = x²+3x+2.", latex: "x^2+3x+5 = (x+1)(x+2) + 3" }], finalAnswerLatex: "x+2\\ \\text{remainder } 3" },
    { title: "Single terms", questionLatex: "\\text{Divide } x^6 \\div x^2.", steps: [{ explanation: "Subtract indices.", latex: "x^{6-2} = x^4" }], finalAnswerLatex: "x^4" },
  ],
  guidedPractice: [
    mcq("y10-dp-g1", "Divide (x² + 5x + 6) ÷ (x + 2).", "A", ["$x + 3$", "$x + 2$", "$x + 6$", "$x - 3$"], 2, "(x + 2)(x + 3) = x² + 5x + 6, so the quotient is x + 3."),
    mcq("y10-dp-g2", "Divide (x² − x − 6) ÷ (x − 3).", "B", ["$x - 2$", "$x + 2$", "$x - 3$", "$x + 6$"], 3, "(x − 3)(x + 2) = x² − x − 6, so the quotient is x + 2."),
    ans("y10-dp-g3", "Divide x⁶ ÷ x² (give as a power of x).", "x^6 \\div x^2", "x^4", 2, "Subtract indices: 6 − 2 = 4, so x⁴.", ["x4"]),
    mcq("y10-dp-g4", "Divide (2x² + 4x) ÷ (2x).", "A", ["$x + 2$", "$2x + 2$", "$x + 4$", "$x$"], 2, "Divide each term by 2x: x + 2."),
  ],
  independentPractice: [
    mcq("y10-dp-i1", "Divide (x² + 7x + 12) ÷ (x + 3).", "A", ["$x + 4$", "$x + 3$", "$x + 12$", "$x - 4$"], 3, "(x + 3)(x + 4) = x² + 7x + 12."),
    mcq("y10-dp-i2", "Divide (x² + 2x + 1) ÷ (x + 1).", "B", ["$x + 2$", "$x + 1$", "$x - 1$", "$x$"], 2, "(x + 1)² = x² + 2x + 1, so quotient x + 1."),
    ans("y10-dp-i3", "Divide 6x³ ÷ 3x (give the result).", "6x^3 \\div 3x", "2x^2", 2, "6 ÷ 3 = 2 and x³ ÷ x = x², so 2x².", ["2x2"]),
    mcq("y10-dp-i4", "Divide (x³ + x²) ÷ x².", "A", ["$x + 1$", "$x^2 + 1$", "$x + x^2$", "$x$"], 3, "x³ ÷ x² = x and x² ÷ x² = 1, so x + 1."),
    mcq("y10-dp-i5", "Divide (x² − 9) ÷ (x − 3).", "A", ["$x + 3$", "$x - 3$", "$x + 9$", "$x - 9$"], 3, "x² − 9 = (x − 3)(x + 3), so quotient x + 3."),
  ],
  masteryQuiz: [
    mcq("y10-dp-m1", "Divide (x² + 8x + 15) ÷ (x + 5).", "A", ["$x + 3$", "$x + 5$", "$x + 15$", "$x - 3$"], 3, "(x + 5)(x + 3) = x² + 8x + 15."),
    mcq("y10-dp-m2", "In P(x) = D(x)Q(x) + R, R is the:", "C", ["divisor", "quotient", "remainder", "dividend"], 2, "R is the remainder."),
    ans("y10-dp-m3", "Divide 10x⁴ ÷ 2x² (give the result).", "10x^4 \\div 2x^2", "5x^2", 2, "10 ÷ 2 = 5 and x⁴ ÷ x² = x², so 5x².", ["5x2"]),
    mcq("y10-dp-m4", "Divide (x² − 16) ÷ (x + 4).", "B", ["$x + 4$", "$x - 4$", "$x + 16$", "$x - 16$"], 3, "x² − 16 = (x + 4)(x − 4), so quotient x − 4."),
    mcq("y10-dp-m5", "Divide (x² + 3x + 2) ÷ (x + 1).", "A", ["$x + 2$", "$x + 1$", "$x + 3$", "$x - 2$"], 2, "(x + 1)(x + 2) = x² + 3x + 2."),
    mcq("y10-dp-m6", "Divide (x³ + 2x²) ÷ x.", "A", ["$x^2 + 2x$", "$x^2 + 2$", "$x + 2x^2$", "$x^2$"], 3, "x³ ÷ x = x² and 2x² ÷ x = 2x, so x² + 2x."),
    mcq("y10-dp-m7", "Divide (x² + 6x + 9) ÷ (x + 3).", "A", ["$x + 3$", "$x - 3$", "$x + 9$", "$x + 6$"], 2, "(x + 3)² = x² + 6x + 9, so quotient x + 3."),
    mcq("y10-dp-m8", "Dividing a degree-3 polynomial by a degree-1 gives a quotient of degree:", "B", ["1", "2", "3", "4"], 3, "Degrees subtract: 3 − 1 = 2."),
    mcq("y10-dp-m9", "Divide (4x² + 2x) ÷ 2x.", "C", ["$2x$", "$2x + 2$", "$2x + 1$", "$x + 1$"], 2, "4x² ÷ 2x = 2x and 2x ÷ 2x = 1, so 2x + 1."),
    mcq("y10-dp-m10", "Divide (x² − 25) ÷ (x − 5).", "A", ["$x + 5$", "$x - 5$", "$x + 25$", "$x - 25$"], 3, "x² − 25 = (x − 5)(x + 5), so quotient x + 5."),
  ],
  commonMistakes: [
    { mistake: "Forgetting the remainder when the division is not exact.", fix: "Write P(x) = D(x)Q(x) + R; state R when it is non-zero." },
    { mistake: "Adding indices when dividing single terms.", fix: "Dividing subtracts indices: x⁶ ÷ x² = x⁴." },
    { mistake: "Dividing only one term by the divisor.", fix: "Every term of the dividend is divided." },
    { mistake: "Expecting the quotient to have the same degree as the dividend.", fix: "Degrees subtract: degree of P minus degree of D." },
  ],
  masteryPassMark: 0.8,
};

// ── 10E Remainder and Factor Theorem (path) ────────────────────────────────────────────
const remainderFactor: Partial<ExplicitLesson> = {
  description: "Use the remainder theorem (remainder = P(a)) and the factor theorem ((x − a) is a factor iff P(a) = 0).",
  learningIntention: "Apply the remainder and factor theorems by evaluating the polynomial.",
  successCriteria: ["State that dividing by (x − a) leaves remainder P(a).", "Evaluate P(a).", "Use P(a) = 0 to identify a factor.", "Connect zeros and factors."],
  teaching: {
    paragraphs: [
      "The REMAINDER THEOREM is a shortcut: the remainder when P(x) is divided by (x − a) is simply P(a) — you just substitute a, no long division needed. For P(x) = x² + 3x + 2, dividing by (x − 1) leaves P(1) = 1 + 3 + 2 = 6.",
      "The FACTOR THEOREM is the special case when the remainder is zero: (x − a) is a FACTOR of P(x) exactly when P(a) = 0. A zero remainder means (x − a) divides P(x) cleanly.",
      "So to test whether (x − 2) is a factor of P(x) = x² − 4, evaluate P(2) = 4 − 4 = 0. Because it is zero, (x − 2) IS a factor.",
      "This links factors and ZEROS: P(a) = 0 means both that x = a is a zero (root) of the polynomial and that (x − a) is a factor. Substitution, not division, does the work.",
    ],
    latexBlocks: ["\\text{remainder of } P(x) \\div (x-a) = P(a)", "(x-a) \\text{ is a factor} \\iff P(a) = 0", "P(2) = 0 \\Rightarrow (x-2) \\text{ is a factor}"],
  },
  workedExamples: [
    { title: "Remainder theorem", questionLatex: "\\text{Find the remainder of } P(x)=x^2+3x+2 \\div (x-1).", steps: [{ explanation: "Substitute a = 1.", latex: "P(1) = 1 + 3 + 2 = 6" }], finalAnswerLatex: "6" },
    { title: "Factor theorem test", questionLatex: "\\text{Is } (x-2) \\text{ a factor of } P(x)=x^2-4?", steps: [{ explanation: "Evaluate P(2).", latex: "P(2) = 4 - 4 = 0" }, { explanation: "Zero remainder means it is a factor.", latex: "\\text{Yes}" }], finalAnswerLatex: "\\text{Yes}" },
    { title: "Evaluating", questionLatex: "\\text{If } P(x)=x^2-5x+6, \\text{ find } P(2).", steps: [{ explanation: "Substitute.", latex: "4 - 10 + 6 = 0" }], finalAnswerLatex: "0" },
  ],
  guidedPractice: [
    mcq("y10-rf-g1", "The remainder when P(x) is divided by (x − a) is:", "C", ["$P(0)$", "$a$", "$P(a)$", "$0$"], 2, "By the remainder theorem, the remainder is P(a)."),
    ans("y10-rf-g2", "If P(x) = x² + 1, find P(2).", "P(x)=x^2+1", "5", 2, "P(2) = 4 + 1 = 5.", []),
    ans("y10-rf-g3", "If P(x) = x² − 5x + 6, find P(2).", "P(x)=x^2-5x+6", "0", 3, "P(2) = 4 − 10 + 6 = 0.", []),
    mcq("y10-rf-g4", "If P(3) = 0, then a factor of P(x) is:", "A", ["$(x-3)$", "$(x+3)$", "$3$", "$(3-x)$ only"], 2, "P(3) = 0 means (x − 3) is a factor by the factor theorem."),
  ],
  independentPractice: [
    ans("y10-rf-i1", "If P(x) = x² + 2x, find P(3).", "P(x)=x^2+2x", "15", 2, "P(3) = 9 + 6 = 15.", []),
    mcq("y10-rf-i2", "(x − a) is a factor of P(x) if and only if:", "B", ["$P(0) = a$", "$P(a) = 0$", "$P(a) = a$", "$P(1) = 0$"], 3, "Factor theorem: (x − a) is a factor exactly when P(a) = 0."),
    ans("y10-rf-i3", "If P(x) = x³ − 1, find P(1).", "P(x)=x^3-1", "0", 2, "P(1) = 1 − 1 = 0.", []),
    ans("y10-rf-i4", "Find the remainder of P(x) = 2x + 1 divided by (x − 1).", "P(x)=2x+1,\\ (x-1)", "3", 2, "Remainder = P(1) = 2 + 1 = 3.", []),
    ans("y10-rf-i5", "Is (x − 3) a factor of x² − 9? Evaluate P(3) and answer yes or no.", "P(x)=x^2-9", "yes", 3, "P(3) = 9 − 9 = 0, so (x − 3) is a factor.", ["Yes"]),
  ],
  masteryQuiz: [
    ans("y10-rf-m1", "If P(x) = x² + x, find P(2).", "P(x)=x^2+x", "6", 2, "P(2) = 4 + 2 = 6.", []),
    mcq("y10-rf-m2", "P(a) = 0 tells you (x − a) is a:", "C", ["remainder", "quotient", "factor", "constant"], 2, "By the factor theorem, P(a) = 0 means (x − a) is a factor."),
    ans("y10-rf-m3", "If P(x) = x² − 7x + 10, find P(5).", "P(x)=x^2-7x+10", "0", 3, "P(5) = 25 − 35 + 10 = 0.", []),
    ans("y10-rf-m4", "If P(x) = x³, find P(2).", "P(x)=x^3", "8", 2, "P(2) = 2³ = 8.", []),
    mcq("y10-rf-m5", "The remainder when dividing by (x − 2) is:", "B", ["$P(0)$", "$P(2)$", "$2$", "$P(-2)$"], 2, "By the remainder theorem it is P(2)."),
    ans("y10-rf-m6", "If P(x) = x² + 4, find P(0).", "P(x)=x^2+4", "4", 2, "P(0) = 0 + 4 = 4.", []),
    ans("y10-rf-m7", "If P(x) = x² − 4, find P(−2).", "P(x)=x^2-4", "0", 3, "P(−2) = 4 − 4 = 0.", []),
    mcq("y10-rf-m8", "If P(1) = 0, then (x − 1) is a:", "A", ["factor", "remainder", "quotient", "constant"], 2, "P(1) = 0 means (x − 1) is a factor."),
    ans("y10-rf-m9", "If P(x) = 2x² − 3, find P(1).", "P(x)=2x^2-3", "-1", 3, "P(1) = 2 − 3 = −1.", ["−1"]),
    ans("y10-rf-m10", "If P(x) = x³ − 8, find P(2).", "P(x)=x^3-8", "0", 3, "P(2) = 8 − 8 = 0.", []),
  ],
  commonMistakes: [
    { mistake: "Substituting −a instead of a for division by (x − a).", fix: "For (x − a), substitute x = a; the remainder is P(a)." },
    { mistake: "Thinking a non-zero P(a) means (x − a) is a factor.", fix: "Only P(a) = 0 makes (x − a) a factor." },
    { mistake: "Doing long division when substitution suffices.", fix: "Use the remainder theorem: just evaluate P(a)." },
    { mistake: "Separating zeros from factors.", fix: "P(a) = 0 means x = a is a zero AND (x − a) is a factor." },
  ],
  masteryPassMark: 0.8,
};

// ── 10F Factorising to Find Zeros (path) ───────────────────────────────────────────────
const factorisingZeros: Partial<ExplicitLesson> = {
  description: "Factorise polynomials and read off their zeros, using the factor–zero relationship.",
  learningIntention: "Factorise a polynomial and state its zeros, connecting factors to x-intercepts.",
  successCriteria: ["State that each factor (x − a) gives a zero at x = a.", "Find the zeros from a factorised form.", "Factorise a quadratic and list its zeros.", "Relate zeros to where a graph crosses the x-axis."],
  teaching: {
    paragraphs: [
      "The ZEROS (or roots) of a polynomial are the inputs that make it equal zero — and on a graph they are exactly where the curve crosses the x-axis. Each FACTOR points straight to a zero.",
      "From a factorised form you read the zeros off directly: (x − 2)(x − 3) = 0 when x = 2 or x = 3. The factor (x − a) gives the zero x = a — flip the sign inside the bracket.",
      "If a polynomial is not yet factorised, factorise it first: x² − 5x + 6 = (x − 2)(x − 3), so the zeros are 2 and 3. The factor ↔ zero link works both ways: knowing a zero gives a factor, and a factor gives a zero.",
      "Watch the signs: (x + 3) gives a zero at x = −3, not +3. And a repeated factor like (x + 5)² gives a single repeated zero at x = −5.",
    ],
    latexBlocks: ["(x-a) \\text{ factor} \\iff x = a \\text{ is a zero}", "(x-2)(x-3) = 0 \\Rightarrow x = 2 \\text{ or } 3", "x^2 - 5x + 6 = (x-2)(x-3)"],
  },
  workedExamples: [
    { title: "Zeros from factors", questionLatex: "\\text{Find the zeros of } (x-2)(x-3).", steps: [{ explanation: "Set each factor to zero.", latex: "x - 2 = 0 \\text{ or } x - 3 = 0" }], finalAnswerLatex: "x = 2 \\text{ or } 3" },
    { title: "Factorise then read zeros", questionLatex: "\\text{Find the zeros of } x^2 - 5x + 6.", steps: [{ explanation: "Factorise.", latex: "(x-2)(x-3)" }, { explanation: "Read the zeros.", latex: "x = 2 \\text{ or } 3" }], finalAnswerLatex: "2 \\text{ and } 3" },
    { title: "Watch the sign", questionLatex: "\\text{Find a zero of } (x+4)(x-1).", steps: [{ explanation: "(x + 4) gives x = −4.", latex: "x = -4 \\text{ or } 1" }], finalAnswerLatex: "-4 \\text{ or } 1" },
  ],
  guidedPractice: [
    mcq("y10-fz-g1", "The zeros of (x − 2)(x − 3) are:", "A", ["2 and 3", "−2 and −3", "2 and −3", "5 and 6"], 2, "Set each factor to 0: x = 2 or x = 3."),
    ans("y10-fz-g2", "State a zero of (x − 5)(x + 1).", "(x-5)(x+1)", "5", 2, "x − 5 = 0 gives x = 5 (the other zero is −1).", ["-1", "−1"]),
    mcq("y10-fz-g3", "Factorise x² − 9.", "A", ["$(x-3)(x+3)$", "$(x-3)^2$", "$(x-9)(x+1)$", "$(x+9)(x-1)$"], 2, "Difference of squares: (x − 3)(x + 3)."),
    mcq("y10-fz-g4", "If (x − a) is a factor, then x = a is a:", "B", ["turning point", "zero (root)", "y-intercept", "remainder"], 2, "(x − a) factor means x = a is a zero of the polynomial."),
  ],
  independentPractice: [
    mcq("y10-fz-i1", "The zeros of (x + 4)(x − 1) are:", "C", ["4 and 1", "4 and −1", "−4 and 1", "−4 and −1"], 3, "(x + 4) → −4 and (x − 1) → 1."),
    mcq("y10-fz-i2", "Factorise x² + 5x + 6.", "A", ["$(x+2)(x+3)$", "$(x-2)(x-3)$", "$(x+1)(x+6)$", "$(x+5)(x+1)$"], 3, "Numbers with product 6 and sum 5 are 2 and 3."),
    ans("y10-fz-i3", "State a positive zero of x² − 16.", "x^2 - 16", "4", 3, "x² − 16 = (x − 4)(x + 4), so a zero is x = 4 (the other is −4).", ["-4", "−4"]),
    mcq("y10-fz-i4", "The zeros of x(x − 3) are:", "A", ["0 and 3", "0 and −3", "3 only", "−3 only"], 2, "x = 0 or x − 3 = 0 → x = 3."),
    mcq("y10-fz-i5", "The zeros of a polynomial are where its graph:", "B", ["turns around", "crosses the x-axis", "crosses the y-axis", "is steepest"], 2, "Zeros are the x-intercepts — where the curve meets the x-axis."),
  ],
  masteryQuiz: [
    mcq("y10-fz-m1", "The zeros of (x − 1)(x − 6) are:", "A", ["1 and 6", "−1 and −6", "1 and −6", "7 and 6"], 2, "x = 1 or x = 6."),
    mcq("y10-fz-m2", "If (x + 3) is a factor, the zero is at x =", "C", ["3", "0", "−3", "1/3"], 2, "(x + 3) = 0 gives x = −3."),
    mcq("y10-fz-m3", "Factorise x² − 4x.", "A", ["$x(x-4)$", "$(x-2)^2$", "$(x-4)(x+1)$", "$x(x+4)$"], 2, "Common factor x: x(x − 4)."),
    mcq("y10-fz-m4", "The zeros of (2x)(x − 5) are:", "B", ["2 and 5", "0 and 5", "0 and −5", "2 and −5"], 3, "2x = 0 → x = 0; x − 5 = 0 → x = 5."),
    mcq("y10-fz-m5", "A quadratic has at most how many real zeros?", "B", ["1", "2", "3", "0"], 2, "A degree-2 polynomial has at most 2 zeros."),
    ans("y10-fz-m6", "State a positive zero of (x − 7)(x + 7).", "(x-7)(x+7)", "7", 2, "x − 7 = 0 gives x = 7 (the other is −7).", ["-7", "−7"]),
    mcq("y10-fz-m7", "Factorise x² − 2x − 8.", "A", ["$(x-4)(x+2)$", "$(x+4)(x-2)$", "$(x-8)(x+1)$", "$(x-4)(x-2)$"], 3, "Product −8, sum −2: −4 and +2."),
    mcq("y10-fz-m8", "x = 3 is a zero means (x − 3) is a:", "A", ["factor", "remainder", "y-intercept", "turning point"], 2, "A zero at x = 3 corresponds to the factor (x − 3)."),
    ans("y10-fz-m9", "State the (repeated) zero of (x + 5)².", "(x+5)^2", "-5", 3, "(x + 5)² = 0 gives the repeated zero x = −5.", ["−5"]),
    mcq("y10-fz-m10", "The zeros of (x − 2)(x − 2)(x + 1) are:", "B", ["2 and 1", "2 and −1", "−2 and 1", "−2 and −1"], 3, "Repeated factor (x − 2) gives zero 2; (x + 1) gives −1."),
  ],
  commonMistakes: [
    { mistake: "Reading the zero straight from the bracket, e.g. (x + 3) → 3.", fix: "Set the factor to 0: (x + 3) = 0 gives x = −3." },
    { mistake: "Forgetting a zero (e.g. the x = 0 from a factor of x).", fix: "Every factor gives a zero, including a lone x." },
    { mistake: "Confusing zeros with the y-intercept.", fix: "Zeros are x-intercepts (where y = 0)." },
    { mistake: "Listing a repeated factor's zero twice as different values.", fix: "(x + 5)² has one repeated zero, x = −5." },
  ],
  masteryPassMark: 0.8,
};

// ── 10G Graphing Cubics (path) ─────────────────────────────────────────────────────────
const graphingCubics: Partial<ExplicitLesson> = {
  description: "Graph y = x³ and its transformations y = (x − h)³ + k, using shifts of the parent cubic.",
  learningIntention: "Sketch and read cubics as transformations of the parent curve y = x³.",
  successCriteria: ["Describe the shape of y = x³ (through the origin, increasing).", "Apply a vertical shift y = x³ + k.", "Apply a horizontal shift y = (x − h)³.", "Evaluate points on a cubic."],
  teaching: {
    paragraphs: [
      "The parent cubic y = x³ passes through the origin and increases everywhere — flat near 0, then rising steeply. Useful points: (0, 0), (1, 1), (2, 8), (−1, −1), (−2, −8).",
      "Adding a constant shifts it VERTICALLY: y = x³ + k moves every point up by k. So y = x³ + 2 passes through (0, 2) instead of (0, 0).",
      "Subtracting inside the bracket shifts it HORIZONTALLY: y = (x − h)³ moves the curve right by h. So y = (x − 1)³ has its centre (and only x-intercept) at x = 1, not 0.",
      "Combining them, y = (x − h)³ + k is the parent cubic moved right h and up k. To evaluate a point, substitute and cube carefully — remember (−2)³ = −8.",
    ],
    latexBlocks: ["y = x^3:\\ (0,0),(1,1),(2,8),(-1,-1)", "y = x^3 + k\\ \\text{shifts up } k", "y = (x-h)^3\\ \\text{shifts right } h"],
  },
  workedExamples: [
    { title: "Vertical shift", questionLatex: "\\text{Find the y-intercept of } y = x^3 + 3.", steps: [{ explanation: "At x = 0, y = 0 + 3.", latex: "y = 3" }], finalAnswerLatex: "3" },
    { title: "Horizontal shift", questionLatex: "\\text{For } y = (x-2)^3, \\text{ find the x-value where } y = 0.", steps: [{ explanation: "(x − 2)³ = 0 when x − 2 = 0.", latex: "x = 2" }], finalAnswerLatex: "2" },
    { title: "Evaluating", questionLatex: "\\text{Find } y \\text{ on } y = x^3 \\text{ at } x = -2.", steps: [{ explanation: "Cube the negative.", latex: "(-2)^3 = -8" }], finalAnswerLatex: "-8" },
  ],
  guidedPractice: [
    mcq("y10-gc-g1", "Does y = x³ pass through the origin?", "A", ["Yes", "No", "Only for x > 0", "Only at x = 1"], 1, "At x = 0, y = 0, so it passes through (0, 0)."),
    ans("y10-gc-g2", "Find the y-intercept of y = x³ + 3.", "y=x^3+3", "3", 2, "At x = 0, y = 3.", []),
    ans("y10-gc-g3", "For y = (x − 2)³, find the x-value giving y = 0.", "y=(x-2)^3", "2", 2, "(x − 2)³ = 0 when x = 2.", []),
    mcq("y10-gc-g4", "The curve y = x³ is:", "A", ["increasing for all x", "decreasing for all x", "always positive", "a parabola"], 2, "y = x³ rises everywhere as x increases."),
  ],
  independentPractice: [
    ans("y10-gc-i1", "Find the y-intercept of y = x³ − 1.", "y=x^3-1", "-1", 2, "At x = 0, y = −1.", ["−1"]),
    ans("y10-gc-i2", "Find y on y = x³ at x = 2.", "y=x^3,\\ x=2", "8", 2, "2³ = 8.", []),
    ans("y10-gc-i3", "For y = (x + 3)³, find the x-value giving y = 0.", "y=(x+3)^3", "-3", 3, "(x + 3)³ = 0 when x = −3.", ["−3"]),
    ans("y10-gc-i4", "Find y on y = x³ at x = −2.", "y=x^3,\\ x=-2", "-8", 2, "(−2)³ = −8.", ["−8"]),
    mcq("y10-gc-i5", "Compared with y = x³, the curve y = 2x³ is:", "A", ["steeper", "flatter", "shifted up", "shifted right"], 3, "The factor 2 stretches it vertically, making it steeper."),
  ],
  masteryQuiz: [
    ans("y10-gc-m1", "Find the y-intercept of y = x³ + 5.", "y=x^3+5", "5", 2, "At x = 0, y = 5.", []),
    mcq("y10-gc-m2", "y = (x − h)³ shifts y = x³:", "A", ["right by h", "left by h", "up by h", "down by h"], 2, "Subtracting h inside shifts the curve right by h."),
    ans("y10-gc-m3", "Find y on y = x³ at x = 3.", "y=x^3,\\ x=3", "27", 2, "3³ = 27.", []),
    ans("y10-gc-m4", "For y = (x − 4)³, find the x-value giving y = 0.", "y=(x-4)^3", "4", 2, "(x − 4)³ = 0 when x = 4.", []),
    mcq("y10-gc-m5", "What is y on y = x³ at x = 0?", "C", ["1", "3", "0", "undefined"], 1, "0³ = 0."),
    ans("y10-gc-m6", "For y = x³ − 8, find the x-intercept (where y = 0).", "y=x^3-8", "2", 4, "x³ = 8 gives x = 2.", []),
    ans("y10-gc-m7", "Find y on y = x³ at x = −1.", "y=x^3,\\ x=-1", "-1", 2, "(−1)³ = −1.", ["−1"]),
    mcq("y10-gc-m8", "y = x³ + k shifts the curve:", "A", ["up by k", "down by k", "right by k", "left by k"], 2, "Adding k shifts every point up by k."),
    ans("y10-gc-m9", "For y = (x + 1)³, find the x-value giving y = 0.", "y=(x+1)^3", "-1", 3, "(x + 1)³ = 0 when x = −1.", ["−1"]),
    ans("y10-gc-m10", "Find y on y = x³ at x = 4.", "y=x^3,\\ x=4", "64", 2, "4³ = 64.", []),
  ],
  commonMistakes: [
    { mistake: "Treating y = (x − h)³ as shifting left.", fix: "Subtracting h inside shifts RIGHT by h." },
    { mistake: "Getting the sign wrong when cubing a negative.", fix: "(−2)³ = −8: an odd power keeps the sign." },
    { mistake: "Thinking a cubic is a parabola.", fix: "A cubic (degree 3) has an S-shape, not a U-shape." },
    { mistake: "Confusing vertical and horizontal shifts.", fix: "+k outside moves up; −h inside moves right." },
  ],
  masteryPassMark: 0.8,
};

// ── 10H Graphs of Polynomials (path) ───────────────────────────────────────────────────
const graphsOfPolynomials: Partial<ExplicitLesson> = {
  description: "Relate a polynomial's degree to its maximum turning points and x-intercepts, and use the leading term for end behaviour.",
  learningIntention: "Use degree and leading coefficient to predict a polynomial graph's key features.",
  successCriteria: ["State that a degree-n polynomial has at most n x-intercepts.", "State that it has at most n − 1 turning points.", "Describe end behaviour from degree and leading coefficient.", "Reason about graph shape from structure."],
  teaching: {
    paragraphs: [
      "A polynomial's DEGREE controls how 'wiggly' its graph can be. A degree-n polynomial has at most n x-intercepts (zeros) and at most n − 1 turning points. A quadratic (degree 2) has at most 2 intercepts and 1 turning point; a cubic (degree 3) has at most 3 intercepts and 2 turning points.",
      "These are MAXIMUMS — a graph may have fewer. But it can never have more turning points than degree − 1, which is a quick reasonableness check on any sketch.",
      "END BEHAVIOUR (what happens for very large positive or negative x) is set by the LEADING term. A positive leading coefficient with EVEN degree sends both ends UP; with ODD degree the left end goes down and the right end up.",
      "A negative leading coefficient flips that vertical behaviour. So you can describe the overall shape from just two facts — the degree and the sign of the leading coefficient — before plotting a single point.",
    ],
    latexBlocks: ["\\text{degree } n:\\ \\le n \\text{ x-intercepts},\\ \\le n-1 \\text{ turning points}", "\\text{even degree, +leading: both ends up}", "\\text{odd degree, +leading: left down, right up}"],
  },
  workedExamples: [
    { title: "Maximum intercepts", questionLatex: "\\text{What is the most x-intercepts a degree-3 polynomial can have?}", steps: [{ explanation: "At most n intercepts.", latex: "3" }], finalAnswerLatex: "3" },
    { title: "Maximum turning points", questionLatex: "\\text{What is the most turning points a degree-4 polynomial can have?}", steps: [{ explanation: "At most n − 1.", latex: "4 - 1 = 3" }], finalAnswerLatex: "3" },
    { title: "End behaviour", questionLatex: "\\text{Even degree, positive leading coefficient: describe the ends.}", steps: [{ explanation: "Even degree with +leading.", latex: "\\text{both ends up}" }], finalAnswerLatex: "\\text{both ends up}" },
  ],
  guidedPractice: [
    mcq("y10-gp-g1", "The most x-intercepts a degree-3 polynomial can have is:", "C", ["1", "2", "3", "4"], 2, "A degree-n polynomial has at most n x-intercepts."),
    ans("y10-gp-g2", "What is the most turning points a quadratic can have?", "\\text{quadratic}", "1", 2, "Degree 2 has at most 2 − 1 = 1 turning point.", []),
    mcq("y10-gp-g3", "A cubic with a positive leading coefficient: as x gets very large positive, y becomes very large:", "A", ["positive", "negative", "zero", "constant"], 3, "An odd-degree polynomial with +leading rises to +∞ on the right."),
    ans("y10-gp-g4", "What is the most turning points a cubic can have?", "\\text{cubic}", "2", 2, "Degree 3 has at most 3 − 1 = 2 turning points.", []),
  ],
  independentPractice: [
    mcq("y10-gp-i1", "The most x-intercepts a degree-4 polynomial can have is:", "C", ["2", "3", "4", "5"], 2, "At most n = 4 intercepts."),
    ans("y10-gp-i2", "What is the most turning points a degree-4 polynomial can have?", "\\text{degree 4}", "3", 2, "4 − 1 = 3.", []),
    mcq("y10-gp-i3", "A degree-5 polynomial has at most how many turning points?", "B", ["3", "4", "5", "6"], 3, "n − 1 = 5 − 1 = 4."),
    ans("y10-gp-i4", "How many real zeros can a quadratic have at most?", "\\text{quadratic}", "2", 2, "At most 2 (degree 2).", []),
    mcq("y10-gp-i5", "Even degree with a positive leading coefficient: the two ends:", "A", ["both go up", "both go down", "one up one down", "stay flat"], 3, "Even degree, +leading: both ends up."),
  ],
  masteryQuiz: [
    ans("y10-gp-m1", "What is the most turning points a degree-3 polynomial can have?", "\\text{degree 3}", "2", 2, "3 − 1 = 2.", []),
    mcq("y10-gp-m2", "The number of x-intercepts is at most:", "B", ["the number of terms", "the degree", "the leading coefficient", "the constant"], 2, "At most equal to the degree."),
    ans("y10-gp-m3", "The most x-intercepts a degree-5 polynomial can have is:", "\\text{degree 5}", "5", 2, "At most n = 5.", []),
    ans("y10-gp-m4", "What is the most turning points a degree-6 polynomial can have?", "\\text{degree 6}", "5", 3, "6 − 1 = 5.", []),
    mcq("y10-gp-m5", "A cubic (odd degree) always has at least how many real zeros?", "A", ["1", "0", "2", "3"], 3, "An odd-degree polynomial must cross the x-axis at least once, so at least 1 real zero."),
    ans("y10-gp-m6", "What is the most turning points a quadratic can have?", "\\text{quadratic}", "1", 2, "2 − 1 = 1.", []),
    mcq("y10-gp-m7", "Even degree with a NEGATIVE leading coefficient: both ends go:", "B", ["up", "down", "one each way", "flat"], 3, "A negative leading coefficient flips even-degree ends downward."),
    ans("y10-gp-m8", "A polynomial has at most 3 turning points. Its degree is at least:", "\\text{at most 3 turning points}", "4", 4, "Turning points ≤ degree − 1, so degree ≥ 4.", []),
    mcq("y10-gp-m9", "As the degree increases, the maximum number of turning points:", "A", ["increases (degree − 1)", "stays the same", "decreases", "is always 2"], 3, "Max turning points is degree − 1, which grows with the degree."),
    ans("y10-gp-m10", "The most real zeros a degree-7 polynomial can have is:", "\\text{degree 7}", "7", 2, "At most n = 7.", []),
  ],
  commonMistakes: [
    { mistake: "Allowing more turning points than degree − 1.", fix: "A degree-n graph has at most n − 1 turning points." },
    { mistake: "Allowing more x-intercepts than the degree.", fix: "At most n x-intercepts for degree n." },
    { mistake: "Ignoring the leading coefficient's sign for end behaviour.", fix: "A negative leading coefficient flips the vertical end behaviour." },
    { mistake: "Forgetting an odd-degree graph must cross the x-axis.", fix: "Odd degree means at least one real zero." },
  ],
  masteryPassMark: 0.8,
};

// ── 10K Further Transformations (path) ─────────────────────────────────────────────────
const furtherTransformations: Partial<ExplicitLesson> = {
  description: "Apply transformations to a parent function: vertical/horizontal shifts, vertical stretch and reflection in the x-axis.",
  learningIntention: "Describe how y = f(x) ± k, y = f(x − h), y = a·f(x) and y = −f(x) transform a graph.",
  successCriteria: ["Apply a vertical shift y = f(x) + k.", "Apply a horizontal shift y = f(x − h).", "Recognise a vertical stretch y = a·f(x).", "Recognise a reflection y = −f(x)."],
  teaching: {
    paragraphs: [
      "Transformations describe how a new graph relates to a PARENT graph y = f(x) — you change the parent, you do not start from scratch. Adding outside shifts vertically: y = f(x) + k moves the graph UP by k (and down for negative k).",
      "Subtracting inside the bracket shifts HORIZONTALLY: y = f(x − h) moves the graph RIGHT by h. The 'inside' change feels backwards — minus moves right — because it is the input that is adjusted.",
      "Multiplying outside by a number stretches it VERTICALLY: y = a·f(x) makes the graph a times taller (steeper for a > 1). And a minus sign outside, y = −f(x), REFLECTS the graph in the x-axis (flips it upside down).",
      "For example, the parabola y = (x − 5)² is y = x² moved right 5, with its vertex at x = 5; y = x² + 7 moves the vertex up to (0, 7). Read each transformation as a change to the parent relationship.",
    ],
    latexBlocks: ["y = f(x) + k:\\ \\text{up } k;\\quad y = f(x-h):\\ \\text{right } h", "y = a\\,f(x):\\ \\text{vertical stretch by } a", "y = -f(x):\\ \\text{reflect in the x-axis}"],
  },
  workedExamples: [
    { title: "Vertical shift", questionLatex: "\\text{How does } y = f(x) + 3 \\text{ transform the graph?}", steps: [{ explanation: "Outside addition shifts vertically.", latex: "\\text{up by 3}" }], finalAnswerLatex: "\\text{up 3}" },
    { title: "Horizontal shift", questionLatex: "\\text{How does } y = f(x-2) \\text{ transform the graph?}", steps: [{ explanation: "Inside subtraction shifts right.", latex: "\\text{right by 2}" }], finalAnswerLatex: "\\text{right 2}" },
    { title: "Reflection", questionLatex: "\\text{How does } y = -f(x) \\text{ transform the graph?}", steps: [{ explanation: "A minus outside flips vertically.", latex: "\\text{reflect in the x-axis}" }], finalAnswerLatex: "\\text{reflect in x-axis}" },
  ],
  guidedPractice: [
    mcq("y10-ft-g1", "y = f(x) + 5 shifts the graph:", "A", ["up 5", "down 5", "right 5", "left 5"], 2, "Adding 5 outside moves every point up 5."),
    mcq("y10-ft-g2", "y = f(x − 3) shifts the graph:", "A", ["right 3", "left 3", "up 3", "down 3"], 2, "Subtracting inside shifts right by 3."),
    ans("y10-ft-g3", "For y = x² + 4, state the y-coordinate of the vertex.", "y=x^2+4", "4", 2, "y = x² (vertex (0,0)) shifted up 4 → vertex y-coordinate 4.", []),
    mcq("y10-ft-g4", "y = −f(x) is a reflection in the:", "A", ["x-axis", "y-axis", "line y = x", "origin"], 2, "A minus outside reflects the graph in the x-axis."),
  ],
  independentPractice: [
    mcq("y10-ft-i1", "y = f(x) − 2 shifts the graph:", "B", ["up 2", "down 2", "right 2", "left 2"], 2, "Subtracting 2 outside moves the graph down 2."),
    mcq("y10-ft-i2", "y = f(x + 1) shifts the graph:", "B", ["right 1", "left 1", "up 1", "down 1"], 3, "Adding inside shifts LEFT by 1."),
    ans("y10-ft-i3", "For y = (x − 5)², state the x-coordinate of the vertex.", "y=(x-5)^2", "5", 2, "y = x² shifted right 5 → vertex at x = 5.", []),
    mcq("y10-ft-i4", "y = 2f(x) is a vertical:", "A", ["stretch", "shift", "reflection", "translation"], 3, "Multiplying outside by 2 stretches the graph vertically."),
    ans("y10-ft-i5", "For y = x² − 3, state the y-coordinate of the vertex.", "y=x^2-3", "-3", 2, "y = x² shifted down 3 → vertex y-coordinate −3.", ["−3"]),
  ],
  masteryQuiz: [
    mcq("y10-ft-m1", "y = f(x) + k (k > 0) moves the graph:", "A", ["up k", "down k", "right k", "left k"], 2, "Adding k outside moves up by k."),
    mcq("y10-ft-m2", "y = f(x − h) (h > 0) moves the graph:", "A", ["right h", "left h", "up h", "down h"], 2, "Subtracting h inside moves right by h."),
    ans("y10-ft-m3", "For y = (x + 2)², state the x-coordinate of the vertex.", "y=(x+2)^2", "-2", 3, "y = x² shifted left 2 → vertex at x = −2.", ["−2"]),
    mcq("y10-ft-m4", "y = −f(x) reflects the graph in the:", "A", ["x-axis", "y-axis", "line y = x", "origin"], 2, "A minus outside reflects in the x-axis."),
    ans("y10-ft-m5", "For y = x² + 7, state the y-coordinate of the vertex.", "y=x^2+7", "7", 2, "Shifted up 7 → vertex y-coordinate 7.", []),
    mcq("y10-ft-m6", "y = f(x + 4) moves the graph:", "B", ["right 4", "left 4", "up 4", "down 4"], 3, "Adding inside moves LEFT by 4."),
    ans("y10-ft-m7", "For y = (x − 6)², state the x-coordinate of the vertex.", "y=(x-6)^2", "6", 2, "Shifted right 6 → vertex at x = 6.", []),
    mcq("y10-ft-m8", "y = 3f(x) is a:", "C", ["horizontal shift", "reflection", "vertical stretch", "translation"], 3, "Multiplying outside by 3 stretches the graph vertically."),
    ans("y10-ft-m9", "For y = x² − 10, state the y-coordinate of the vertex.", "y=x^2-10", "-10", 2, "Shifted down 10 → vertex y-coordinate −10.", ["−10"]),
    mcq("y10-ft-m10", "y = f(x) − 6 moves the graph:", "B", ["up 6", "down 6", "right 6", "left 6"], 2, "Subtracting 6 outside moves down 6."),
  ],
  commonMistakes: [
    { mistake: "Reading y = f(x − h) as a left shift.", fix: "Minus inside moves RIGHT; plus inside moves LEFT." },
    { mistake: "Treating a + k inside as a vertical shift.", fix: "Inside changes are horizontal; outside changes are vertical." },
    { mistake: "Confusing a stretch with a shift.", fix: "Multiplying outside (a·f(x)) stretches; adding (f(x)+k) shifts." },
    { mistake: "Reflecting in the wrong axis.", fix: "y = −f(x) reflects in the x-axis (flips up/down)." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "introducing-polynomials": introPolynomials,
  "expanding-simplifying-polynomials": expandSimplify,
  "dividing-polynomials": dividingPolynomials,
  "remainder-factor-theorem": remainderFactor,
  "factorising-find-zeros": factorisingZeros,
  "graphing-cubics": graphingCubics,
  "graphs-of-polynomials": graphsOfPolynomials,
  "further-transformations": furtherTransformations,
};

export function year10PolynomialsGraphsWave5LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "functions-polynomials-graphs"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
