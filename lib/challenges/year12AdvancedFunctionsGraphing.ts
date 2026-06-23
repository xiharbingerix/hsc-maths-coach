import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for the Year 12 Advanced "Graphing techniques" topic (ma-f2).
// Emphasises archetypes under-represented in ma-f1: intersection-count, asymptotic
// parameter, inverse constraint, absolute interaction, exp/log synthesis. All
// single-answer, auto-markable, hand-verified. Spread across 4 lessons (<=2 each).

// → asymptotes-reciprocal-graphs
export const functionsAsymptoteChallenge: PracticeQuestion[] = [
  {
    // D6 intersection-count: reciprocal sum, min via AM-GM, count solutions.
    id: "chal-y12a-f2-1",
    prompt:
      "For x > 0, find the values of k for which x + 4/x = k has two distinct solutions.",
    latex: "x + \\dfrac{4}{x} = k",
    answer: "k>4",
    acceptedAnswers: ["k > 4", "4 < k", "4<k"],
    hint: "For x > 0, what is the least possible value of x + 4/x? Compare it with k.",
    explanation:
      "For x > 0, by AM–GM x + 4/x ≥ 2√(x · 4/x) = 4, with equality at x = 2. So x + 4/x = k has two distinct solutions when k > 4 (exactly one when k = 4, none when k < 4).",
  },
  {
    // D6 asymptotic + parameter: HA gives a, point gives b, then x-intercept.
    id: "chal-y12a-f2-2",
    prompt:
      "The function y = (ax + b)/(x − 2) has a horizontal asymptote y = 3 and passes through (0, 1). Find the x-coordinate of its x-intercept.",
    latex: "y = \\dfrac{ax + b}{x - 2}",
    answer: "2/3",
    acceptedAnswers: ["x=2/3", "0.667"],
    hint: "The horizontal asymptote of (ax+b)/(x−2) is y = a. Use it to find a, the point to find b, then set the numerator to 0.",
    explanation:
      "The horizontal asymptote is y = a, so a = 3. Through (0, 1): b/(−2) = 1 ⟹ b = −2, giving y = (3x − 2)/(x − 2). The x-intercept is where 3x − 2 = 0 ⟹ x = 2/3.",
  },
];

// → exponential-logarithmic-graphs
export const functionsExpLogChallenge: PracticeQuestion[] = [
  {
    // D6 log synthesis: combine logs, solve quadratic, reject by domain.
    id: "chal-y12a-f2-3",
    prompt: "Solve log₂(x) + log₂(x − 2) = 3.",
    latex: "\\log_2 x + \\log_2 (x - 2) = 3",
    answer: "4",
    acceptedAnswers: ["x=4"],
    hint: "Combine the logarithms into one, rewrite in index form, and check the domain.",
    explanation:
      "log₂(x(x − 2)) = 3 ⟹ x(x − 2) = 2³ = 8 ⟹ x² − 2x − 8 = 0 ⟹ (x − 4)(x + 2) = 0. The domain requires x > 2, so x = −2 is rejected: x = 4.",
  },
  {
    // D6 exp synthesis: quadratic in 2^x, solve, back-substitute, select larger.
    id: "chal-y12a-f2-4",
    prompt: "Find the larger solution of 2^(2x) − 5·2^x + 4 = 0.",
    latex: "2^{2x} - 5\\cdot 2^x + 4 = 0",
    answer: "2",
    acceptedAnswers: ["x=2"],
    hint: "Let u = 2^x to get a quadratic in u; solve, then back-substitute.",
    explanation:
      "Let u = 2^x: u² − 5u + 4 = 0 ⟹ (u − 1)(u − 4) = 0 ⟹ u = 1 or u = 4, i.e. 2^x = 1 (x = 0) or 2^x = 4 (x = 2). The larger solution is x = 2.",
  },
];

// → inverse-functions
export const functionsInverseChallenge: PracticeQuestion[] = [
  {
    // D6 inverse constraint: f and f^-1 meet on y = x (f increasing).
    id: "chal-y12a-f2-5",
    prompt:
      "For x ≥ 0, f(x) = x² − 2. The graphs of y = f(x) and y = f⁻¹(x) intersect. Find the x-coordinate of their intersection.",
    latex: "f(x) = x^2 - 2,\\ x \\ge 0",
    answer: "2",
    acceptedAnswers: ["x=2", "(2,2)"],
    hint: "Because f is increasing, y = f(x) and y = f⁻¹(x) meet on the line y = x. Solve f(x) = x.",
    explanation:
      "Since f is increasing, its graph and that of f⁻¹ meet on y = x. Solve f(x) = x: x² − 2 = x ⟹ x² − x − 2 = 0 ⟹ (x − 2)(x + 1) = 0 ⟹ x = 2 (taking x ≥ 0).",
  },
];

// → absolute-value-functions
export const functionsAbsoluteChallenge: PracticeQuestion[] = [
  {
    // D6 intersection-count + absolute: count via the |x^2-4| graph shape.
    id: "chal-y12a-f2-6",
    prompt: "Find the value of k for which |x² − 4| = k has exactly three solutions.",
    latex: "|x^2 - 4| = k",
    answer: "4",
    acceptedAnswers: ["k=4"],
    hint: "Sketch y = |x² − 4|: it has minima of 0 at x = ±2 and a local maximum at x = 0. Where does a horizontal line meet it exactly three times?",
    explanation:
      "y = |x² − 4| has minimum value 0 at x = ±2 and a local maximum of 4 at x = 0. A horizontal line y = k meets it four times for 0 < k < 4, but exactly three times at the local-maximum height k = 4 (giving x = 0 and x = ±2√2).",
  },
];
