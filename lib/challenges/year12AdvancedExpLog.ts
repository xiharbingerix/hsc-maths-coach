import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Exponential and Logarithmic Functions"
// (ma-e1). Difficulty is carried by inverse/structural reasoning (recover a base/rate,
// infer a model, combine logs strategically, intersect an asymptote with a feature, or an
// existence condition) — NOT by running a formula. Single-answer, auto-markable, verified.

// → eulers-number-natural-logarithm
export const expLogParamChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction: recover the continuous rate from two points.
    id: "chal-y12a-el-1",
    prompt:
      "The curve y = A·e^(kx) passes through (0, 5) and (2, 45). Find the exact value of k.",
    latex: "y = A e^{kx}",
    answer: "ln 3",
    acceptedAnswers: ["ln3", "(ln 9)/2", "0.5 ln 9", "1.0986", "1.099"],
    hint: "Use (0, 5) to find A, then (2, 45) to get an equation in e^(2k).",
    explanation:
      "At (0, 5): A = 5. At (2, 45): 5e^(2k) = 45 ⟹ e^(2k) = 9 ⟹ 2k = ln 9 ⟹ k = (ln 9)/2 = ln 3.",
  },
];

// → exponential-logarithmic-exam-practice
export const expLogExamChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from intercept + asymptote (two properties).
    id: "chal-y12a-el-2",
    prompt:
      "The curve y = a + b·2^x has a horizontal asymptote y = 3 and passes through (0, 5). Find y when x = 2.",
    latex: "y = a + b\\cdot 2^x",
    answer: "11",
    acceptedAnswers: [],
    hint: "As x → −∞, 2^x → 0, so the asymptote gives a. Then use the point to find b.",
    explanation:
      "Asymptote y = 3 ⟹ a = 3 (since 2^x → 0). At (0, 5): 3 + b = 5 ⟹ b = 2. So y = 3 + 2·2^x, and y(2) = 3 + 2·4 = 11.",
  },
  {
    // Multi-condition reconstruction: asymptote + intersection.
    id: "chal-y12a-el-6",
    prompt:
      "The curve y = a·2^x + c has a horizontal asymptote y = −1, and y = 7 when x = 3. Find a.",
    latex: "y = a\\cdot 2^x + c",
    answer: "1",
    acceptedAnswers: ["a=1"],
    hint: "The asymptote fixes c; then use the point (3, 7) to find a.",
    explanation:
      "As x → −∞, 2^x → 0, so the asymptote gives c = −1. At x = 3: a·8 − 1 = 7 ⟹ 8a = 8 ⟹ a = 1.",
  },
];

// → logarithm-laws-change-of-base
export const expLogIdentityChallenge: PracticeQuestion[] = [
  {
    // Log reconstruction: must derive log_a 3 first, then decompose 9/2 — not one log-law step.
    id: "chal-y12a-el-3",
    prompt:
      "Given that log_a 6 = 2 and log_a 2 = 0.8, find log_a 4.5.",
    latex: "\\log_a 6 = 2,\\quad \\log_a 2 = 0.8",
    answer: "1.6",
    acceptedAnswers: [],
    hint: "First find log_a 3 from the two given logs, then write 4.5 = 9/2.",
    explanation:
      "log_a 3 = log_a 6 − log_a 2 = 2 − 0.8 = 1.2. Then log_a 4.5 = log_a(9/2) = 2·log_a 3 − log_a 2 = 2.4 − 0.8 = 1.6.",
  },
];

// → exponential-growth-decay-modelling
export const expLogGrowthChallenge: PracticeQuestion[] = [
  {
    // Growth-model inference: infer the doubling structure rather than plugging a formula.
    id: "chal-y12a-el-4",
    prompt:
      "A population grows exponentially. It is 200 at t = 0 and 800 after 4 hours. Find the time (in hours) at which it reaches 3200.",
    latex: "P = P_0 b^{t}",
    answer: "8",
    acceptedAnswers: ["8 hours", "8 h"],
    hint: "How does the population scale every 4 hours? Express 3200 as a multiple of 200.",
    explanation:
      "From 200 to 800 is ×4 over 4 hours. 3200/200 = 16 = 4², so it takes two such 4-hour periods: t = 8 hours.",
  },
];

// → solving-equations-e-ln
export const expLogExistenceChallenge: PracticeQuestion[] = [
  {
    // Existence/domain constraint that drives the reasoning.
    id: "chal-y12a-el-5",
    prompt:
      "For what values of k does the equation log₂(x − 1) = log₂(k − x) have a solution?",
    latex: "\\log_2(x-1) = \\log_2(k-x)",
    answer: "k>1",
    acceptedAnswers: ["k > 1", "1 < k", "1<k"],
    hint: "Equate the arguments to find x, then require both x − 1 > 0 and k − x > 0.",
    explanation:
      "Equal logs ⟹ x − 1 = k − x ⟹ x = (k + 1)/2. Existence needs both arguments positive: x − 1 > 0 ⟹ k > 1, and k − x > 0 ⟹ (k+1)/2 < k ⟹ k > 1. So a solution exists exactly when k > 1.",
  },
];
