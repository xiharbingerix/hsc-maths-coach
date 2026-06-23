import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Differential Calculus" (ma-c2 — the
// differentiation-TECHNIQUES unit, distinct from ma-c1/ma-c3). Each item uses a genuine
// ma-c2 technique (product / quotient / chain rule, derivatives of e^x and ln x), but the
// difficulty lives in REASONING FROM the derivative — reconstruct coefficients, infer a
// parameter from a stationary condition, classify by 2nd-derivative, recover a parameter
// from an extremum value, or deduce monotonicity from a factored derivative. No item is
// solved by "differentiate this horrible expression". Single-answer, auto-markable, verified.

// → standard-derivatives
export const diffTechStandardChallenge: PracticeQuestion[] = [
  {
    // Function reconstruction from two gradient conditions (uses the ln derivative).
    id: "chal-y12a-dt-3",
    prompt:
      "A curve y = a·ln x + bx has gradient 5 at x = 1 and gradient 4 at x = 2. Find a.",
    latex: "y = a\\ln x + bx",
    answer: "2",
    acceptedAnswers: ["a=2"],
    hint: "Write y' = a/x + b, then use the two gradient conditions as simultaneous equations.",
    explanation:
      "y' = a/x + b. At x = 1: a + b = 5. At x = 2: a/2 + b = 4. Subtracting: a/2 = 1 ⟹ a = 2.",
  },
];

// → product-quotient-rules
export const diffTechProductQuotientChallenge: PracticeQuestion[] = [
  {
    // Parameter inference from a stationary condition (product rule).
    id: "chal-y12a-dt-2",
    prompt:
      "f(x) = x·e^(kx) has a stationary point at x = −2. Find k.",
    latex: "f(x) = x e^{kx}",
    answer: "1/2",
    acceptedAnswers: ["0.5", "k=1/2", "k=0.5"],
    hint: "Differentiate with the product rule, factor out e^(kx) (never zero), and set the remaining factor to zero at x = −2.",
    explanation:
      "f'(x) = e^(kx)(1 + kx). Since e^(kx) ≠ 0, a stationary point needs 1 + kx = 0. At x = −2: 1 − 2k = 0 ⟹ k = 1/2.",
  },
  {
    // Stationary-point classification via the 2nd-derivative test.
    id: "chal-y12a-dt-4",
    prompt:
      "f(x) = x·e^x has a single stationary point. Classify it as a maximum or a minimum.",
    latex: "f(x) = x e^x",
    answer: "minimum",
    acceptedAnswers: ["min", "a minimum"],
    hint: "Find the stationary point from f'(x) = e^x(1 + x), then test the sign of f''(x) there.",
    explanation:
      "f'(x) = e^x(1 + x) = 0 ⟹ x = −1. f''(x) = e^x(2 + x), so f''(−1) = e^(−1)(1) > 0. A positive second derivative means a minimum.",
  },
];

// → applications-extended-differentiation
export const diffTechApplicationsChallenge: PracticeQuestion[] = [
  {
    // Function reconstruction: recover a from a tangent condition + two values.
    id: "chal-y12a-dt-1",
    prompt:
      "f(x) = ax³ + bx + c has a horizontal tangent at x = 1, f(1) = 2 and f(0) = 4. Find a.",
    latex: "f(x) = ax^3 + bx + c",
    answer: "1",
    acceptedAnswers: ["a=1"],
    hint: "The horizontal tangent gives f'(1) = 0; f(0) fixes c; then use f(1).",
    explanation:
      "f'(x) = 3ax² + b, so f'(1) = 3a + b = 0 ⟹ b = −3a. f(0) = c = 4. f(1) = a + b + c = 2 ⟹ a + b = −2 ⟹ a − 3a = −2 ⟹ a = 1.",
  },
  {
    // Optimisation/extremum structure: recover a from the maximum VALUE (quotient rule).
    id: "chal-y12a-dt-5",
    prompt:
      "f(x) = x/(x² + a) has a maximum value of 1/4 for x > 0. Find a.",
    latex: "f(x) = \\frac{x}{x^2 + a}",
    answer: "4",
    acceptedAnswers: ["a=4"],
    hint: "Use the quotient rule to locate the maximum at x = √a, then set the maximum value equal to 1/4.",
    explanation:
      "f'(x) = (a − x²)/(x² + a)² = 0 ⟹ x = √a (for x > 0). f(√a) = √a/(2a) = 1/(2√a). Setting 1/(2√a) = 1/4 ⟹ √a = 2 ⟹ a = 4.",
  },
];

// → differentiation-techniques-exam-practice
export const diffTechExamChallenge: PracticeQuestion[] = [
  {
    // Derivative-sign / monotonicity from a factored derivative with a parameter.
    id: "chal-y12a-dt-6",
    prompt:
      "A function has derivative f'(x) = (x − 2)(x − k), where k > 2. Find the interval on which f is decreasing.",
    latex: "f'(x) = (x-2)(x-k),\\quad k > 2",
    answer: "2<x<k",
    acceptedAnswers: ["2 < x < k", "(2, k)"],
    hint: "f' is an upward parabola with roots at x = 2 and x = k. Where is it negative?",
    explanation:
      "f'(x) is an upward-opening parabola with zeros at x = 2 and x = k (k > 2). It is negative between its roots, so f is decreasing for 2 < x < k.",
  },
];
