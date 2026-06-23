import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 11 Extension "Polynomials" (top-up of the existing
// roots-and-coefficients D6). Every item exploits GLOBAL polynomial structure (Vieta,
// multiplicity, factor theorem, end-behaviour) rather than solving an equation; two of
// the six are non-cubic (quartics). All single-answer, auto-markable, hand-verified.

// → roots-and-coefficients (merged with the existing rootsCoefficientsChallenge)
export const polynomialsVietaChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11e-poly-1",
    prompt:
      "The cubic x³ − 6x² + 11x − 6 has roots α, β, γ. Find 1/α + 1/β + 1/γ.",
    latex: "x^3 - 6x^2 + 11x - 6",
    answer: "11/6",
    acceptedAnswers: ["1.833", "11/6"],
    hint: "1/α + 1/β + 1/γ = (βγ + γα + αβ)/(αβγ). Read the sum of pairwise products and the product from the coefficients.",
    explanation:
      "By Vieta: αβ + βγ + γα = 11 and αβγ = 6. So 1/α + 1/β + 1/γ = (βγ + γα + αβ)/(αβγ) = 11/6.",
  },
  {
    // Non-cubic (quartic), even structure.
    id: "chal-y11e-poly-2",
    prompt:
      "The quartic x⁴ − 5x² + 4 = 0 has four roots. Find the sum of the squares of the roots.",
    latex: "x^4 - 5x^2 + 4 = 0",
    answer: "10",
    acceptedAnswers: ["10"],
    hint: "Use Vieta on the quartic: there is no x³ term (so Σr = 0) and the x² coefficient gives Σ(pairwise). Then Σr² = (Σr)² − 2Σ(pairwise).",
    explanation:
      "There is no x³ term so Σr = 0, and the sum of pairwise products = −5 (the x² coefficient). Σr² = (Σr)² − 2(−5) = 0 + 10 = 10. (Check: roots ±1, ±2 give 1 + 1 + 4 + 4 = 10.)",
  },
];

// → factor-theorem-factorisation
export const polynomialsFactorChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11e-poly-3",
    prompt:
      "Find the positive value of k for which x³ − 3x + k has a repeated root.",
    latex: "x^3 - 3x + k",
    answer: "2",
    acceptedAnswers: ["k=2"],
    hint: "A repeated root is shared by P(x) and P′(x). Find the roots of P′(x) = 0, then force one of them to satisfy P(x) = 0.",
    explanation:
      "A repeated root satisfies both P and P′. P′(x) = 3x² − 3 = 0 ⟹ x = ±1. P(1) = 1 − 3 + k = k − 2 and P(−1) = −1 + 3 + k = k + 2. The positive k making one zero is k = 2 (repeated root at x = 1).",
  },
  {
    id: "chal-y11e-poly-4",
    prompt:
      "x³ + ax² + bx − 6 is divisible by both (x − 1) and (x − 2). Find b.",
    latex: "x^3 + ax^2 + bx - 6",
    answer: "11",
    acceptedAnswers: ["b=11"],
    hint: "Each factor gives P(root) = 0. Solve the two equations for a and b.",
    explanation:
      "P(1) = 1 + a + b − 6 = 0 ⟹ a + b = 5. P(2) = 8 + 4a + 2b − 6 = 0 ⟹ 2a + b = −1. Subtracting: a = −6, so b = 11. (The cubic is (x − 1)(x − 2)(x − 3).)",
  },
];

// → polynomial-graphs
export const polynomialsGraphChallenge: PracticeQuestion[] = [
  {
    // Non-cubic (quartic), multiplicity/touch via the substitution u = x^2.
    id: "chal-y11e-poly-5",
    prompt:
      "Find the value of k for which the graph of y = x⁴ − 8x² + k touches the x-axis.",
    latex: "y = x^4 - 8x^2 + k",
    answer: "16",
    acceptedAnswers: ["k=16"],
    hint: "Let u = x². The graph touches the axis when the quadratic in u has a repeated (double) root.",
    explanation:
      "Let u = x²: u² − 8u + k = 0 touches when its discriminant is 0: 64 − 4k = 0 ⟹ k = 16 (then u = 4, so x = ±2 are double roots — the graph touches at x = ±2).",
  },
  {
    id: "chal-y11e-poly-6",
    prompt:
      "Find the range of values of k for which x³ − 3x + k = 0 has three distinct real roots.",
    latex: "x^3 - 3x + k = 0",
    answer: "-2<k<2",
    acceptedAnswers: ["-2 < k < 2", "−2<k<2"],
    hint: "Three distinct real roots occur when the local maximum is above the x-axis and the local minimum is below it.",
    explanation:
      "P(x) = x³ − 3x + k has turning points at x = ±1: local maximum P(−1) = 2 + k, local minimum P(1) = −2 + k. Three distinct real roots require 2 + k > 0 and −2 + k < 0, i.e. −2 < k < 2.",
  },
];
