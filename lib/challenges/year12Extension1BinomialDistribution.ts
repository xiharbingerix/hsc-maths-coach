import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 1 "Binomial Distribution and Sampling
// Distribution of the Mean" — the probability-distribution exemplar. Difficulty is carried
// by reconstructing n/p from moments or tail probabilities, interacting expectation with
// variance and a linear transform, exposing an impossible binomial via Var < mean, and
// comparing two models by equal variance — NOT by grinding binomial coefficients.
// Single-answer, auto-markable, hand-verified. Registered per lesson slug, ≤2 per lesson.

// → mean-and-variance
export const bdMeanVarianceChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from BOTH moments (recover n via 1−p = Var/mean).
    id: "chal-y12e1-bd-1",
    prompt:
      "A binomial random variable X ~ B(n, p) has mean 12 and variance 3. Find n.",
    latex: "E(X) = np = 12,\\ \\mathrm{Var}(X) = np(1-p) = 3",
    answer: "16",
    acceptedAnswers: ["n=16"],
    hint: "Divide the variance by the mean to get (1−p); that gives p, then n from the mean.",
    explanation:
      "Var/E = (1−p) = 3/12 = 0.25, so p = 0.75. Then n = E/p = 12/0.75 = 16.",
  },
  {
    // Expectation–variance interaction: recover n from the variance, then a linear transform.
    id: "chal-y12e1-bd-4",
    prompt:
      "A binomial variable X ~ B(n, 0.4) has variance 2.4. Find E(2X − 1).",
    latex: "X \\sim B(n, 0.4),\\ \\mathrm{Var}(X) = 2.4",
    answer: "7",
    acceptedAnswers: [],
    hint: "Use Var = np(1−p) to find n, then E(X) = np, then E(2X − 1) = 2E(X) − 1.",
    explanation:
      "Var = n(0.4)(0.6) = 0.24n = 2.4 ⟹ n = 10. E(X) = np = 10(0.4) = 4. E(2X − 1) = 2(4) − 1 = 7.",
  },
];

// → sampling-distribution-mean
export const bdSamplingChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from the sampling distribution: recover sample size.
    id: "chal-y12e1-bd-2",
    prompt:
      "Samples of size n are drawn from a population with variance 36. The sample mean x̄ has variance 4. Find n.",
    latex: "\\mathrm{Var}(\\bar{x}) = \\sigma^2/n",
    answer: "9",
    acceptedAnswers: ["n=9"],
    hint: "Var(x̄) = σ²/n; rearrange for n.",
    explanation:
      "Var(x̄) = σ²/n ⟹ 4 = 36/n ⟹ n = 36/4 = 9.",
  },
];

// → binomial-probabilities
export const bdProbabilitiesChallenge: PracticeQuestion[] = [
  {
    // Tail/probability constraint with a complement layer (not a single exponential ID).
    id: "chal-y12e1-bd-3",
    prompt:
      "For X ~ B(n, 1/3), the probability of at least one success is 65/81. Find n.",
    latex: "P(X \\ge 1) = \\tfrac{65}{81}",
    answer: "4",
    acceptedAnswers: ["n=4"],
    hint: "P(X ≥ 1) = 1 − P(X = 0) = 1 − (2/3)ⁿ. Solve for the power.",
    explanation:
      "1 − (2/3)ⁿ = 65/81 ⟹ (2/3)ⁿ = 16/81 = (2/3)⁴ (since 16 = 2⁴, 81 = 3⁴), so n = 4.",
  },
];

// → binomial-exam-practice
export const bdExamChallenge: PracticeQuestion[] = [
  {
    // Validity/contradiction: a binomial cannot have variance > mean (1−p would exceed 1).
    id: "chal-y12e1-bd-5",
    prompt:
      "A binomial variable is claimed to have mean 6 and variance 8. Find the value of (1 − p) these conditions require, and hence explain why no such binomial exists.",
    latex: "E(X) = 6,\\ \\mathrm{Var}(X) = 8",
    answer: "4/3",
    acceptedAnswers: ["1-p=4/3", "1.333"],
    hint: "For a binomial, Var/mean = (1 − p). What goes wrong if that exceeds 1?",
    explanation:
      "Var/E = (1 − p) = 8/6 = 4/3 > 1, which would force p = −1/3 < 0. Since 0 ≤ p ≤ 1 (and Var = mean·(1−p) < mean for any binomial), no such binomial exists.",
  },
  {
    // Model comparison/equivalence: two different binomials with equal variance.
    id: "chal-y12e1-bd-6",
    prompt:
      "X ~ B(12, 0.5) and Y ~ B(n, 0.25) have equal variance. Find n.",
    latex: "\\mathrm{Var}(X) = \\mathrm{Var}(Y)",
    answer: "16",
    acceptedAnswers: ["n=16"],
    hint: "Compute Var(X) = np(1−p), then set Var(Y) = n(0.25)(0.75) equal to it.",
    explanation:
      "Var(X) = 12(0.5)(0.5) = 3. Var(Y) = n(0.25)(0.75) = 0.1875n. Setting 0.1875n = 3 ⟹ n = 16.",
  },
];
