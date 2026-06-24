// Year 9 Wave 11 — Chapter 10 (Quadratic Equations & Parabolas), equation sections (ADR-Y9-001, all
// path): quadratic-equations, solving-quadratics-factorising-basic, solving-quadratics-factorising,
// quadratic-equations-problems. Full per-subtopic contract. Unique id prefixes (qe/sqfb/sqf/qep).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Use the null factor law: if a product is 0, one factor is 0.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Set each factor to zero.", explanation };
}
const roots = (a: number, b: number) => [`${a}, ${b}`, `${b}, ${a}`, `${a},${b}`, `${b},${a}`, `x=${a}, x=${b}`];

// ── quadratic-equations (path) ─────────────────────────────────────────────────────────
const quadraticEquations: Partial<ExplicitLesson> = {
  description: "Solve factorised quadratic equations using the null factor law.",
  learningIntention: "Use the null factor law to solve quadratics in factor form.",
  successCriteria: ["State the null factor law.", "Solve (x − a)(x − b) = 0.", "Solve x(ax + b) = 0.", "Recognise two solutions."],
  teaching: {
    paragraphs: [
      "A QUADRATIC equation has an x² term and (usually) TWO solutions. The NULL FACTOR LAW says: if a product equals 0, then at least one factor is 0.",
      "So (x − 2)(x − 3) = 0 means x − 2 = 0 or x − 3 = 0, giving x = 2 or x = 3.",
      "x(x − 5) = 0 gives x = 0 or x = 5.",
      "Set EACH factor to zero and solve.",
    ],
    latexBlocks: ["ab = 0 \\Rightarrow a = 0 \\text{ or } b = 0", "(x-2)(x-3) = 0 \\Rightarrow x = 2, 3"],
  },
  workedExamples: [
    { title: "Two brackets", questionLatex: "(x-2)(x-3) = 0", steps: [{ explanation: "Each factor 0.", latex: "x = 2, 3" }], finalAnswerLatex: "x = 2, 3" },
    { title: "Common factor", questionLatex: "x(x-5) = 0", steps: [{ explanation: "x = 0 or x = 5.", latex: "x = 0, 5" }], finalAnswerLatex: "x = 0, 5" },
    { title: "Mixed signs", questionLatex: "(x+1)(x-4) = 0", steps: [{ explanation: "x = −1 or 4.", latex: "x = -1, 4" }], finalAnswerLatex: "x = -1, 4" },
  ],
  guidedPractice: [
    ans("y9-qe-g1", "Solve (x − 1)(x − 2) = 0. Give the larger solution.", "(x-1)(x-2)=0", "2", 3, "x = 1 or 2.", []),
    ans("y9-qe-g2", "Solve x(x − 3) = 0. Give the non-zero solution.", "x(x-3)=0", "3", 3, "x = 0 or 3.", []),
    ans("y9-qe-g3", "Solve (x + 2)(x − 5) = 0. Give the positive solution.", "(x+2)(x-5)=0", "5", 3, "x = −2 or 5.", []),
    mcq("y9-qe-g4", "The null factor law says if ab = 0 then:", "A", ["a = 0 or b = 0", "a = b", "a + b = 0", "a = 1"], 2, "One factor must be 0."),
  ],
  independentPractice: [
    ans("y9-qe-i1", "Solve (x − 3)(x − 7) = 0. Give the larger solution.", "(x-3)(x-7)=0", "7", 3, "3 or 7.", []),
    ans("y9-qe-i2", "Solve x(x + 4) = 0. Give the non-zero solution.", "x(x+4)=0", "-4", 3, "0 or −4.", ["−4"]),
    ans("y9-qe-i3", "Solve (x − 6)(x + 1) = 0. Give the positive solution.", "(x-6)(x+1)=0", "6", 3, "6 or −1.", []),
    ans("y9-qe-i4", "Solve (2x − 1)(x − 3) = 0. Give the whole-number solution.", "(2x-1)(x-3)=0", "3", 4, "x = 1/2 or 3.", []),
    mcq("y9-qe-i5", "How many solutions does (x − 1)(x − 4) = 0 have?", "B", ["1", "2", "0", "4"], 2, "x = 1 and x = 4."),
  ],
  masteryQuiz: [
    ans("y9-qe-m1", "Solve (x − 2)(x − 3) = 0. Give both solutions.", "(x-2)(x-3)=0", "2, 3", 3, "x = 2, 3.", roots(2, 3)),
    ans("y9-qe-m2", "Solve x(x − 5) = 0. Give the non-zero solution.", "x(x-5)=0", "5", 3, "0 or 5.", []),
    ans("y9-qe-m3", "Solve (x + 1)(x − 4) = 0. Give the positive solution.", "(x+1)(x-4)=0", "4", 3, "−1 or 4.", []),
    ans("y9-qe-m4", "Solve (x − 5)(x − 2) = 0. Give the smaller solution.", "(x-5)(x-2)=0", "2", 3, "2 or 5.", []),
    mcq("y9-qe-m5", "To solve (x − a)(x − b) = 0 you set:", "C", ["x = a × b", "x = a + b", "each factor to 0", "x = 0 only"], 2, "Each factor = 0."),
    ans("y9-qe-m6", "Solve x(x + 7) = 0. Give the non-zero solution.", "x(x+7)=0", "-7", 3, "0 or −7.", ["−7"]),
    ans("y9-qe-m7", "Solve (x − 8)(x + 3) = 0. Give the positive solution.", "(x-8)(x+3)=0", "8", 3, "8 or −3.", []),
    ans("y9-qe-m8", "Solve (x + 2)(x + 5) = 0. Give the larger solution.", "(x+2)(x+5)=0", "-2", 3, "−2 or −5; larger −2.", ["−2"]),
    ans("y9-qe-m9", "Solve (x − 1)(x − 6) = 0. Give both solutions.", "(x-1)(x-6)=0", "1, 6", 3, "1, 6.", roots(1, 6)),
    mcq("y9-qe-m10", "A quadratic equation usually has:", "B", ["one solution", "two solutions", "no solutions", "three solutions"], 2, "Usually two."),
  ],
  masteryQuizPool: [
    ans("y9-qe-p1", "Solve (2x − 3)(x + 4) = 0. Give the integer solution.", "(2x-3)(x+4)=0", "-4", 5, "x = 3/2 or −4.", ["−4"]),
    ans("y9-qe-p2", "Solve 3x(x − 2) = 0. Give the non-zero solution.", "3x(x-2)=0", "2", 5, "0 or 2.", []),
    ans("y9-qe-p3", "Solve (x − 4)(x − 4) = 0.", "(x-4)^2=0", "4", 5, "Repeated root x = 4.", []),
    ans("y9-qe-p4", "Solve (x + 3)(x − 3) = 0. Give the positive solution.", "(x+3)(x-3)=0", "3", 5, "±3.", []),
    ans("y9-qe-p5", "Solve (2x + 1)(2x − 1) = 0. Give the positive solution.", "(2x+1)(2x-1)=0", "1/2", 5, "x = ±1/2.", ["0.5"]),
    ans("y9-qe-p6", "Solve x(2x − 6) = 0. Give the non-zero solution.", "x(2x-6)=0", "3", 5, "0 or 3.", []),
    ans("y9-qe-p7", "Solve (x − 10)(x + 10) = 0. Give the positive solution.", "(x-10)(x+10)=0", "10", 5, "±10.", []),
    ans("y9-qe-p8", "Solve (3x − 6)(x + 1) = 0. Give the positive solution.", "(3x-6)(x+1)=0", "2", 5, "3x − 6 = 0 → x = 2; or −1.", []),
    ans("y9-qe-p9", "Solve (x − 2)(x − 3)(x) = 0. Give the largest solution.", "x(x-2)(x-3)=0", "3", 5, "0, 2, 3.", []),
    ans("y9-qe-p10", "Solve (x + 5)(x − 1) = 0. Give both solutions.", "(x+5)(x-1)=0", "-5, 1", 5, "−5, 1.", roots(-5, 1)),
  ],
  commonMistakes: [
    { mistake: "Setting the product to a non-zero value.", fix: "The null factor law needs the product = 0." },
    { mistake: "Giving only one solution.", fix: "Each factor gives a solution." },
    { mistake: "Sign error solving x − a = 0.", fix: "x − 2 = 0 gives x = 2 (not −2)." },
    { mistake: "Forgetting x = 0 from a common factor.", fix: "x(x − 5) = 0 includes x = 0." },
  ],
  masteryPassMark: 0.8,
};

// ── solving-quadratics-factorising-basic (path) ────────────────────────────────────────
const solvingBasic: Partial<ExplicitLesson> = {
  description: "Solve quadratics of the form ax² + bx = 0 and x² − d = 0 by factorising.",
  learningIntention: "Solve simple quadratics by common factor or square roots.",
  successCriteria: ["Factor out x from ax² + bx.", "Solve x² − d = 0 by square roots.", "Give both solutions.", "Handle a coefficient."],
  teaching: {
    paragraphs: [
      "For ax² + bx = 0, take out the COMMON FACTOR x: x(ax + b) = 0, so x = 0 or ax + b = 0. e.g. x² + 3x = 0 → x(x + 3) = 0 → x = 0 or −3.",
      "For x² − d = 0, add d and take SQUARE ROOTS: x² = d, so x = ±√d. e.g. x² − 9 = 0 → x = ±3.",
      "With a coefficient: 2x² − 8 = 0 → x² = 4 → x = ±2.",
      "These have two solutions each (one is often 0 for the common-factor type).",
    ],
    latexBlocks: ["x^2 + 3x = 0 \\Rightarrow x = 0, -3", "x^2 - 9 = 0 \\Rightarrow x = \\pm 3"],
  },
  workedExamples: [
    { title: "Square roots", questionLatex: "\\text{Solve } x^2 - 9 = 0.", steps: [{ explanation: "x² = 9.", latex: "x = \\pm 3" }], finalAnswerLatex: "x = \\pm 3" },
    { title: "Common factor", questionLatex: "\\text{Solve } x^2 + 3x = 0.", steps: [{ explanation: "x(x+3)=0.", latex: "x = 0, -3" }], finalAnswerLatex: "x = 0, -3" },
    { title: "Coefficient", questionLatex: "\\text{Solve } 2x^2 - 8 = 0.", steps: [{ explanation: "x² = 4.", latex: "x = \\pm 2" }], finalAnswerLatex: "x = \\pm 2" },
  ],
  guidedPractice: [
    ans("y9-sqfb-g1", "Solve x² − 16 = 0. Give the positive solution.", "x^2-16=0", "4", 3, "x = ±4.", []),
    ans("y9-sqfb-g2", "Solve x² + 5x = 0. Give the non-zero solution.", "x^2+5x=0", "-5", 3, "x = 0 or −5.", ["−5"]),
    ans("y9-sqfb-g3", "Solve x² − 25 = 0. Give the positive solution.", "x^2-25=0", "5", 3, "±5.", []),
    mcq("y9-sqfb-g4", "To solve x² + 3x = 0 you take out the common factor:", "A", ["x", "3", "x²", "3x"], 2, "x(x + 3) = 0."),
  ],
  independentPractice: [
    ans("y9-sqfb-i1", "Solve x² − 36 = 0. Give the positive solution.", "x^2-36=0", "6", 3, "±6.", []),
    ans("y9-sqfb-i2", "Solve x² − 7x = 0. Give the non-zero solution.", "x^2-7x=0", "7", 3, "0 or 7.", []),
    ans("y9-sqfb-i3", "Solve 3x² − 12 = 0. Give the positive solution.", "3x^2-12=0", "2", 4, "x² = 4 → ±2.", []),
    ans("y9-sqfb-i4", "Solve 2x² + 6x = 0. Give the non-zero solution.", "2x^2+6x=0", "-3", 4, "2x(x+3)=0 → 0 or −3.", ["−3"]),
    mcq("y9-sqfb-i5", "x² − 9 = 0 has solutions:", "C", ["x = 3 only", "x = 9", "x = ±3", "x = 0, 9"], 3, "x = ±3."),
  ],
  masteryQuiz: [
    ans("y9-sqfb-m1", "Solve x² − 9 = 0. Give the positive solution.", "x^2-9=0", "3", 3, "±3.", []),
    ans("y9-sqfb-m2", "Solve x² + 3x = 0. Give the non-zero solution.", "x^2+3x=0", "-3", 3, "0 or −3.", ["−3"]),
    ans("y9-sqfb-m3", "Solve 2x² − 8 = 0. Give the positive solution.", "2x^2-8=0", "2", 4, "x² = 4 → ±2.", []),
    ans("y9-sqfb-m4", "Solve x² − 49 = 0. Give the positive solution.", "x^2-49=0", "7", 3, "±7.", []),
    mcq("y9-sqfb-m5", "x² + 5x = 0 factorises to:", "B", ["(x + 5)²", "x(x + 5)", "(x + 5)(x − 5)", "x²(5)"], 3, "x(x + 5)."),
    ans("y9-sqfb-m6", "Solve x² − 4x = 0. Give the non-zero solution.", "x^2-4x=0", "4", 3, "0 or 4.", []),
    ans("y9-sqfb-m7", "Solve x² − 100 = 0. Give the positive solution.", "x^2-100=0", "10", 3, "±10.", []),
    ans("y9-sqfb-m8", "Solve 5x² − 20 = 0. Give the positive solution.", "5x^2-20=0", "2", 4, "x² = 4 → ±2.", []),
    ans("y9-sqfb-m9", "Solve x² + 6x = 0. Give the non-zero solution.", "x^2+6x=0", "-6", 3, "0 or −6.", ["−6"]),
    mcq("y9-sqfb-m10", "One solution of x² + bx = 0 is always:", "A", ["x = 0", "x = b", "x = 1", "x = −1"], 3, "x = 0 (common factor)."),
  ],
  masteryQuizPool: [
    ans("y9-sqfb-p1", "Solve 3x² − 27 = 0. Give the positive solution.", "3x^2-27=0", "3", 5, "x² = 9 → ±3.", []),
    ans("y9-sqfb-p2", "Solve 2x² − 6x = 0. Give the non-zero solution.", "2x^2-6x=0", "3", 5, "2x(x−3)=0 → 0 or 3.", []),
    ans("y9-sqfb-p3", "Solve x² − 1 = 0. Give the positive solution.", "x^2-1=0", "1", 5, "±1.", []),
    ans("y9-sqfb-p4", "Solve 4x² − 16 = 0. Give the positive solution.", "4x^2-16=0", "2", 5, "x² = 4 → ±2.", []),
    ans("y9-sqfb-p5", "Solve 5x² + 10x = 0. Give the non-zero solution.", "5x^2+10x=0", "-2", 5, "5x(x+2)=0 → 0 or −2.", ["−2"]),
    ans("y9-sqfb-p6", "Solve x² − 0.25 = 0. Give the positive solution.", "x^2-0.25=0", "0.5", 5, "±0.5.", ["1/2"]),
    ans("y9-sqfb-p7", "Solve 9x² − 4 = 0. Give the positive solution as a fraction.", "9x^2-4=0", "2/3", 5, "x² = 4/9 → ±2/3.", ["2 / 3"]),
    ans("y9-sqfb-p8", "Solve 3x² − 9x = 0. Give the non-zero solution.", "3x^2-9x=0", "3", 5, "3x(x−3)=0 → 0 or 3.", []),
    ans("y9-sqfb-p9", "Solve 2x² − 50 = 0. Give the positive solution.", "2x^2-50=0", "5", 5, "x² = 25 → ±5.", []),
    ans("y9-sqfb-p10", "Solve x² − 144 = 0. Give the positive solution.", "x^2-144=0", "12", 5, "±12.", []),
  ],
  commonMistakes: [
    { mistake: "Forgetting the ± when square-rooting.", fix: "x² = d gives x = ±√d." },
    { mistake: "Dividing by x and losing x = 0.", fix: "Factor out x instead of dividing by it." },
    { mistake: "Not isolating x² before square-rooting.", fix: "Get x² alone first." },
    { mistake: "Square-rooting before dividing by the coefficient.", fix: "Divide by the coefficient first." },
  ],
  masteryPassMark: 0.8,
};

// ── solving-quadratics-factorising (path) ──────────────────────────────────────────────
const solvingFactorising: Partial<ExplicitLesson> = {
  description: "Solve x² + bx + c = 0 by factorising into two binomials.",
  learningIntention: "Factorise a trinomial quadratic and solve it.",
  successCriteria: ["Factorise x² + bx + c.", "Apply the null factor law.", "Give both solutions.", "Handle negative roots."],
  teaching: {
    paragraphs: [
      "To solve x² + bx + c = 0, FACTORISE the trinomial, then use the null factor law.",
      "x² + 5x + 6 = 0 → (x + 2)(x + 3) = 0 → x = −2 or x = −3.",
      "x² − x − 6 = 0 → (x − 3)(x + 2) = 0 → x = 3 or x = −2.",
      "x² − 7x + 12 = 0 → (x − 3)(x − 4) = 0 → x = 3 or 4.",
    ],
    latexBlocks: ["x^2 + 5x + 6 = 0 \\Rightarrow (x+2)(x+3) = 0", "x = -2, -3"],
  },
  workedExamples: [
    { title: "Positive c", questionLatex: "\\text{Solve } x^2 + 5x + 6 = 0.", steps: [{ explanation: "(x+2)(x+3).", latex: "x = -2, -3" }], finalAnswerLatex: "x = -2, -3" },
    { title: "Negative c", questionLatex: "\\text{Solve } x^2 - x - 6 = 0.", steps: [{ explanation: "(x−3)(x+2).", latex: "x = 3, -2" }], finalAnswerLatex: "x = 3, -2" },
    { title: "Both negative roots", questionLatex: "\\text{Solve } x^2 - 7x + 12 = 0.", steps: [{ explanation: "(x−3)(x−4).", latex: "x = 3, 4" }], finalAnswerLatex: "x = 3, 4" },
  ],
  guidedPractice: [
    ans("y9-sqf-g1", "Solve x² + 4x + 3 = 0. Give the larger solution.", "x^2+4x+3=0", "-1", 4, "(x+1)(x+3) → −1, −3.", ["−1"]),
    ans("y9-sqf-g2", "Solve x² − 5x + 6 = 0. Give the larger solution.", "x^2-5x+6=0", "3", 4, "(x−2)(x−3) → 2, 3.", []),
    ans("y9-sqf-g3", "Solve x² − x − 12 = 0. Give the positive solution.", "x^2-x-12=0", "4", 4, "(x−4)(x+3) → 4, −3.", []),
    mcq("y9-sqf-g4", "To solve x² + bx + c = 0 you first:", "A", ["factorise the trinomial", "square both sides", "divide by x", "add c"], 2, "Factorise, then null factor law."),
  ],
  independentPractice: [
    ans("y9-sqf-i1", "Solve x² + 7x + 12 = 0. Give the larger solution.", "x^2+7x+12=0", "-3", 4, "(x+3)(x+4) → −3, −4.", ["−3"]),
    ans("y9-sqf-i2", "Solve x² − 6x + 8 = 0. Give the larger solution.", "x^2-6x+8=0", "4", 4, "(x−2)(x−4) → 2, 4.", []),
    ans("y9-sqf-i3", "Solve x² + 2x − 15 = 0. Give the positive solution.", "x^2+2x-15=0", "3", 4, "(x+5)(x−3) → −5, 3.", []),
    ans("y9-sqf-i4", "Solve x² − 9x + 20 = 0. Give the larger solution.", "x^2-9x+20=0", "5", 4, "(x−4)(x−5) → 4, 5.", []),
    mcq("y9-sqf-i5", "x² + 5x + 6 = 0 has solutions:", "C", ["2 and 3", "−2 and 3", "−2 and −3", "5 and 6"], 4, "(x+2)(x+3) = 0."),
  ],
  masteryQuiz: [
    ans("y9-sqf-m1", "Solve x² + 5x + 6 = 0. Give the larger solution.", "x^2+5x+6=0", "-2", 4, "−2, −3.", ["−2"]),
    ans("y9-sqf-m2", "Solve x² − x − 6 = 0. Give the positive solution.", "x^2-x-6=0", "3", 4, "3, −2.", []),
    ans("y9-sqf-m3", "Solve x² − 7x + 12 = 0. Give both solutions.", "x^2-7x+12=0", "3, 4", 4, "3, 4.", roots(3, 4)),
    ans("y9-sqf-m4", "Solve x² + 8x + 15 = 0. Give the larger solution.", "x^2+8x+15=0", "-3", 4, "−3, −5.", ["−3"]),
    mcq("y9-sqf-m5", "After factorising, the solutions come from the:", "B", ["coefficients", "null factor law", "discriminant", "y-intercept"], 3, "Set each factor to 0."),
    ans("y9-sqf-m6", "Solve x² − 2x − 8 = 0. Give the positive solution.", "x^2-2x-8=0", "4", 4, "(x−4)(x+2) → 4, −2.", []),
    ans("y9-sqf-m7", "Solve x² + 3x − 10 = 0. Give the positive solution.", "x^2+3x-10=0", "2", 4, "(x+5)(x−2) → −5, 2.", []),
    ans("y9-sqf-m8", "Solve x² − 8x + 15 = 0. Give both solutions.", "x^2-8x+15=0", "3, 5", 4, "3, 5.", roots(3, 5)),
    ans("y9-sqf-m9", "Solve x² + 6x + 9 = 0.", "x^2+6x+9=0", "-3", 4, "(x+3)² → x = −3.", ["−3"]),
    mcq("y9-sqf-m10", "x² − 5x + 6 = 0 factorises to:", "A", ["(x − 2)(x − 3)", "(x + 2)(x + 3)", "(x − 1)(x − 6)", "(x − 2)(x + 3)"], 4, "−2, −3 multiply to 6, add to −5."),
  ],
  masteryQuizPool: [
    ans("y9-sqf-p1", "Solve x² − 7x + 10 = 0. Give the larger solution.", "x^2-7x+10=0", "5", 5, "(x−2)(x−5) → 2, 5.", []),
    ans("y9-sqf-p2", "Solve x² + x − 12 = 0. Give the positive solution.", "x^2+x-12=0", "3", 5, "(x+4)(x−3) → −4, 3.", []),
    ans("y9-sqf-p3", "Solve x² − 4x − 21 = 0. Give the positive solution.", "x^2-4x-21=0", "7", 5, "(x−7)(x+3) → 7, −3.", []),
    ans("y9-sqf-p4", "Solve x² + 10x + 21 = 0. Give the larger solution.", "x^2+10x+21=0", "-3", 5, "(x+3)(x+7) → −3, −7.", ["−3"]),
    ans("y9-sqf-p5", "Solve x² − 11x + 24 = 0. Give the larger solution.", "x^2-11x+24=0", "8", 5, "(x−3)(x−8) → 3, 8.", []),
    ans("y9-sqf-p6", "Solve x² + 4x − 12 = 0. Give the positive solution.", "x^2+4x-12=0", "2", 5, "(x+6)(x−2) → −6, 2.", []),
    ans("y9-sqf-p7", "Solve x² − 9 = 0 by factorising. Give the positive solution.", "x^2-9=0", "3", 5, "(x+3)(x−3) → ±3.", []),
    ans("y9-sqf-p8", "Solve x² + 12x + 35 = 0. Give the larger solution.", "x^2+12x+35=0", "-5", 5, "(x+5)(x+7) → −5, −7.", ["−5"]),
    ans("y9-sqf-p9", "Solve x² − x − 20 = 0. Give the positive solution.", "x^2-x-20=0", "5", 5, "(x−5)(x+4) → 5, −4.", []),
    ans("y9-sqf-p10", "Solve x² − 10x + 25 = 0.", "x^2-10x+25=0", "5", 5, "(x−5)² → x = 5.", []),
  ],
  commonMistakes: [
    { mistake: "Reading roots with the wrong sign.", fix: "(x + 2) = 0 gives x = −2." },
    { mistake: "Stopping after factorising.", fix: "Apply the null factor law to get the solutions." },
    { mistake: "Wrong numbers in the factorisation.", fix: "They multiply to c and add to b." },
    { mistake: "Missing the repeated root case.", fix: "(x − 5)² = 0 gives only x = 5." },
  ],
  masteryPassMark: 0.8,
};

// ── quadratic-equations-problems (path) ────────────────────────────────────────────────
const quadraticProblems: Partial<ExplicitLesson> = {
  description: "Set up and solve quadratic equations from word problems.",
  learningIntention: "Translate a problem into a quadratic and solve it.",
  successCriteria: ["Form a quadratic equation.", "Solve by factorising.", "Choose the sensible solution.", "Answer the question."],
  teaching: {
    paragraphs: [
      "Some problems lead to a QUADRATIC. Define the unknown, form the equation, solve by factorising, then choose the solution that makes sense (e.g. a length can't be negative).",
      "‘The product of two consecutive integers is 12’: n(n + 1) = 12 → n² + n − 12 = 0 → (n + 4)(n − 3) = 0 → n = 3 (positive).",
      "‘A number squared is 25’: x² = 25 → x = 5 (positive value).",
      "A rectangle with area 24 and length 2 more than width: w(w + 2) = 24 → w = 4.",
    ],
    latexBlocks: ["n(n+1) = 12 \\Rightarrow n = 3", "w(w+2) = 24 \\Rightarrow w = 4"],
  },
  workedExamples: [
    { title: "Consecutive", questionLatex: "\\text{Product of } n, n{+}1 \\text{ is } 12. \\text{ Find } n>0.", steps: [{ explanation: "n² + n − 12 = 0.", latex: "n = 3" }], finalAnswerLatex: "3" },
    { title: "Square", questionLatex: "x^2 = 25. \\text{ Positive value?}", steps: [{ explanation: "√25.", latex: "5" }], finalAnswerLatex: "5" },
    { title: "Rectangle", questionLatex: "w(w+2) = 24. \\text{ Find } w>0.", steps: [{ explanation: "w² + 2w − 24 = 0.", latex: "w = 4" }], finalAnswerLatex: "4" },
  ],
  guidedPractice: [
    ans("y9-qep-g1", "A number squared is 16. Find the positive value.", "x^2=16", "4", 3, "√16 = 4.", []),
    ans("y9-qep-g2", "Two consecutive integers have product 20. Find the smaller positive one.", "n(n+1)=20", "4", 4, "n²+n−20=0 → (n+5)(n−4) → 4.", []),
    ans("y9-qep-g3", "A square has area 49. Find its side length.", "s^2=49", "7", 3, "√49 = 7.", []),
    mcq("y9-qep-g4", "When a quadratic gives two solutions in a length problem, you:", "A", ["choose the positive (sensible) one", "add them", "choose the negative one", "use both"], 2, "Pick the physically sensible solution."),
  ],
  independentPractice: [
    ans("y9-qep-i1", "A number squared is 36. Find the positive value.", "x^2=36", "6", 3, "6.", []),
    ans("y9-qep-i2", "Two consecutive integers have product 30. Find the smaller positive one.", "n(n+1)=30", "5", 4, "(n+6)(n−5) → 5.", []),
    ans("y9-qep-i3", "A rectangle's length is 3 more than its width and its area is 28. Find the width.", "w(w+3)=28", "4", 4, "w²+3w−28=0 → (w+7)(w−4) → 4.", []),
    ans("y9-qep-i4", "A square's area is 64. Find its side length.", "s^2=64", "8", 3, "8.", []),
    mcq("y9-qep-i5", "‘The product of two consecutive integers’ is modelled by:", "B", ["n + (n + 1)", "n(n + 1)", "2n", "n²"], 3, "n(n + 1)."),
  ],
  masteryQuiz: [
    ans("y9-qep-m1", "A number squared is 25. Find the positive value.", "x^2=25", "5", 3, "5.", []),
    ans("y9-qep-m2", "Two consecutive integers have product 12. Find the smaller positive one.", "n(n+1)=12", "3", 4, "3.", []),
    ans("y9-qep-m3", "A rectangle with length 2 more than width has area 24. Find the width.", "w(w+2)=24", "4", 4, "4.", []),
    ans("y9-qep-m4", "A square has area 81. Find its side length.", "s^2=81", "9", 3, "9.", []),
    mcq("y9-qep-m5", "A length solution of −5 from a quadratic should be:", "C", ["kept", "doubled", "rejected (use the positive root)", "added to the other"], 2, "Reject the negative length."),
    ans("y9-qep-m6", "A number squared is 100. Find the positive value.", "x^2=100", "10", 3, "10.", []),
    ans("y9-qep-m7", "Two consecutive integers have product 42. Find the smaller positive one.", "n(n+1)=42", "6", 4, "(n+7)(n−6) → 6.", []),
    ans("y9-qep-m8", "A rectangle's length is 5 more than its width and its area is 36. Find the width.", "w(w+5)=36", "4", 5, "w²+5w−36=0 → (w+9)(w−4) → 4.", []),
    ans("y9-qep-m9", "A square has area 121. Find its side length.", "s^2=121", "11", 3, "11.", []),
    mcq("y9-qep-m10", "The first step in a quadratic word problem is to:", "A", ["define the unknown and form an equation", "guess", "square the answer", "draw a parabola"], 2, "Define the unknown and set up the equation."),
  ],
  masteryQuizPool: [
    ans("y9-qep-p1", "Two consecutive even integers have product 48. Find the smaller positive one.", "n(n+2)=48", "6", 5, "n²+2n−48=0 → (n+8)(n−6) → 6.", []),
    ans("y9-qep-p2", "A rectangle's length is 4 more than its width; area 45. Find the width.", "w(w+4)=45", "5", 5, "w²+4w−45=0 → (w+9)(w−5) → 5.", []),
    ans("y9-qep-p3", "The sum of a number and its square is 30. Find the positive number.", "x+x^2=30", "5", 5, "x²+x−30=0 → (x+6)(x−5) → 5.", []),
    ans("y9-qep-p4", "A square's area equals its perimeter (side s). Find s (s ≠ 0).", "s^2=4s", "4", 5, "s² = 4s → s = 4.", []),
    ans("y9-qep-p5", "Two consecutive integers have product 56. Find the smaller positive one.", "n(n+1)=56", "7", 5, "(n+8)(n−7) → 7.", []),
    ans("y9-qep-p6", "A number squared minus the number is 12. Find the positive number.", "x^2-x=12", "4", 5, "x²−x−12=0 → (x−4)(x+3) → 4.", []),
    ans("y9-qep-p7", "A rectangle's length is twice its width; area 50. Find the width.", "2w^2=50", "5", 5, "2w² = 50 → w² = 25 → 5.", []),
    ans("y9-qep-p8", "Two consecutive odd integers have product 35. Find the smaller positive one.", "n(n+2)=35", "5", 5, "n²+2n−35=0 → (n+7)(n−5) → 5.", []),
    ans("y9-qep-p9", "The square of a number is 6 more than the number. Find the positive number.", "x^2=x+6", "3", 5, "x²−x−6=0 → (x−3)(x+2) → 3.", []),
    ans("y9-qep-p10", "A rectangle's length is 3 more than its width; area 40. Find the width.", "w(w+3)=40", "5", 5, "w²+3w−40=0 → (w+8)(w−5) → 5.", []),
  ],
  commonMistakes: [
    { mistake: "Keeping a negative solution for a length.", fix: "Reject solutions that don't make sense in context." },
    { mistake: "Not forming a quadratic (missing the x² term).", fix: "Products of unknowns create the x² term." },
    { mistake: "Forgetting to factorise/solve fully.", fix: "Solve the quadratic, then interpret." },
    { mistake: "Answering with x instead of the asked quantity.", fix: "Give the quantity the question wants." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "quadratic-equations": quadraticEquations,
  "solving-quadratics-factorising-basic": solvingBasic,
  "solving-quadratics-factorising": solvingFactorising,
  "quadratic-equations-problems": quadraticProblems,
};

export function year9Chapter10QuadraticEquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "quadratic-equations-parabolas") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
