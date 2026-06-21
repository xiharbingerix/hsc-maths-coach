import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · The Binomial Distribution and
 * Sampling Distribution of the Mean.
 *
 * Five skill subtopics (D4 + D5) plus a D6 exam-practice band, all auto-markable
 * per docs/QUESTION_AUTHORING_STANDARD.md. The "Prior Knowledge Revision" lesson
 * is excluded. Subtopics are kept distinct: bernoulli-trials owns the model setup
 * (parameters, assumptions, independence); binomial-probabilities owns the
 * C(n,k) p^k q^{n-k} formula.
 *
 * Status: subtopic 1 "Bernoulli Trials" — D4 + D5. Remaining subtopics to follow.
 * Not yet registered in index.ts (register once the topic is complete).
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/binomial-distribution/${lesson}`;

// ── Subtopic 1: Bernoulli Trials ─────────────────────────────────────────────
// Identify n, p, q and X ~ B(n,p); model assumptions; and probabilities that
// follow from independence (all successes, none, at least one).
const bernoulliD4: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-bt-d4-1",
    prompt:
      "A die is rolled and 'success' is rolling a 6 or a 1. Find the success probability p.",
    latex: "\\text{success} = \\{6, 1\\}",
    marks: 2,
    difficulty: 4,
    answer: "1/3",
    acceptedAnswers: ["0.3333", "0.333", "2/6"],
    explanation: "Two of six faces count as success: p = 2/6 = 1/3.",
  },
  {
    id: "y12e1-binom-bt-d4-2",
    prompt:
      "For the die above (success = rolling a 6 or a 1), find the failure probability q.",
    latex: "q = 1 - p",
    marks: 2,
    difficulty: 4,
    answer: "2/3",
    acceptedAnswers: ["0.6667", "0.667", "4/6"],
    explanation: "q = 1 − 1/3 = 2/3.",
  },
  {
    id: "y12e1-binom-bt-d4-3",
    prompt:
      "A bag holds 3 red and 7 blue counters. A counter is drawn with replacement 5 times, 'success' = red. Find p.",
    latex: "3 \\text{ red}, \\ 7 \\text{ blue, with replacement}",
    marks: 2,
    difficulty: 4,
    answer: "0.3",
    acceptedAnswers: ["3/10"],
    explanation: "With replacement, p = 3/(3 + 7) = 3/10 = 0.3 each draw.",
  },
  {
    id: "y12e1-binom-bt-d4-4",
    prompt:
      "A coin is tossed 12 times and X is the number of heads. How many values can X take?",
    latex: "X \\sim B(12, 0.5)",
    marks: 2,
    difficulty: 4,
    answer: "13",
    explanation: "X can be 0, 1, 2, …, 12 — that is 13 possible values.",
  },
  {
    id: "y12e1-binom-bt-d4-5",
    prompt: "For X ~ B(20, 0.3), find q.",
    latex: "X \\sim B(20, 0.3)",
    marks: 2,
    difficulty: 4,
    answer: "0.7",
    acceptedAnswers: ["7/10"],
    explanation: "q = 1 − p = 1 − 0.3 = 0.7.",
  },
  {
    id: "y12e1-binom-bt-d4-6",
    prompt:
      "A multiple-choice test has questions with 4 options each. A student guesses. Find the probability p of a correct guess on one question.",
    latex: "4 \\text{ equally likely options}",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$0.25$" },
      { label: "B", text: "$0.2$" },
      { label: "C", text: "$0.75$" },
      { label: "D", text: "$4$" },
    ],
    answer: "A",
    explanation: "One of four options is correct: p = 1/4 = 0.25.",
  },
  {
    id: "y12e1-binom-bt-d4-7",
    prompt: "Which of the following is a valid binomial model?",
    latex: "\\text{Identify the binomial model.}",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "Rolling a die 10 times and counting sixes" },
      { label: "B", text: "Drawing cards without replacement until an ace appears" },
      { label: "C", text: "Measuring the heights of 20 students" },
      { label: "D", text: "Counting how many cars pass until 100 have passed" },
    ],
    answer: "A",
    explanation:
      "A binomial model needs a fixed number of independent trials, two outcomes, and constant p. B and D have no fixed n (and B changes p); C is a continuous measurement.",
  },
  {
    id: "y12e1-binom-bt-d4-8",
    prompt:
      "5% of items from a machine are defective. In a sample of 8, find the probability that none are defective (4 d.p.).",
    latex: "p = 0.05, \\ n = 8",
    marks: 3,
    difficulty: 4,
    answer: "0.6634",
    acceptedAnswers: ["0.66342", "0.663"],
    explanation: "P(none) = q⁸ = 0.95⁸ ≈ 0.6634 (independent trials).",
  },
  {
    id: "y12e1-binom-bt-d4-9",
    prompt:
      "A basketballer makes each free throw with probability 0.8. Find the probability of making all 5 of 5 throws (5 d.p.).",
    latex: "p = 0.8, \\ n = 5",
    marks: 2,
    difficulty: 4,
    answer: "0.32768",
    acceptedAnswers: ["0.3277", "0.328"],
    explanation: "P(all 5) = 0.8⁵ = 0.32768.",
  },
  {
    id: "y12e1-binom-bt-d4-10",
    prompt:
      "A die is rolled 4 times. Find the probability of at least one six (4 d.p.).",
    latex: "p = \\tfrac{1}{6}, \\ n = 4",
    marks: 3,
    difficulty: 4,
    answer: "0.5177",
    acceptedAnswers: ["0.51775", "0.518", "671/1296"],
    explanation: "P(at least one) = 1 − (5/6)⁴ = 1 − 625/1296 = 671/1296 ≈ 0.5177.",
  },
];

// D5: work backwards for n or p from an "all / none / at least one" condition,
// combine differing probabilities, or set up an equation in p.
const bernoulliD5: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-bt-d5-1",
    prompt:
      "A die is rolled n times. Find the smallest n for which the probability of at least one six exceeds 0.9.",
    latex: "1 - (5/6)^n > 0.9",
    marks: 4,
    difficulty: 5,
    answer: "13",
    explanation:
      "Need (5/6)ⁿ < 0.1. (5/6)¹² ≈ 0.112 and (5/6)¹³ ≈ 0.093 < 0.1, so the smallest n is 13.",
  },
  {
    id: "y12e1-binom-bt-d5-2",
    prompt:
      "A biased coin is tossed 3 times. The probability of at least one head is 0.875. Find p (the probability of a head).",
    latex: "1 - (1 - p)^3 = 0.875",
    marks: 4,
    difficulty: 5,
    answer: "0.5",
    acceptedAnswers: ["1/2"],
    explanation:
      "(1 − p)³ = 0.125 = (1/2)³, so 1 − p = 0.5 and p = 0.5.",
  },
  {
    id: "y12e1-binom-bt-d5-3",
    prompt:
      "Four components each work independently with probability p. The probability that all four work is 0.6561. Find p.",
    latex: "p^4 = 0.6561",
    marks: 3,
    difficulty: 5,
    answer: "0.9",
    acceptedAnswers: ["9/10"],
    explanation: "p⁴ = 0.6561 ⇒ p = 0.6561^{1/4} = 0.9.",
  },
  {
    id: "y12e1-binom-bt-d5-4",
    prompt:
      "On a guessing test each question is answered correctly with probability 0.2. The probability of getting none of the n questions correct is 0.32768. Find n.",
    latex: "0.8^n = 0.32768",
    marks: 4,
    difficulty: 5,
    answer: "5",
    explanation: "0.8ⁿ = 0.32768 = 0.8⁵, so n = 5.",
  },
  {
    id: "y12e1-binom-bt-d5-5",
    prompt:
      "Each item is defective with probability 0.05. Find the smallest number of items to sample so that the probability of at least one defective exceeds 0.5.",
    latex: "1 - 0.95^n > 0.5",
    marks: 4,
    difficulty: 5,
    answer: "14",
    explanation:
      "Need 0.95ⁿ < 0.5. 0.95¹³ ≈ 0.513 and 0.95¹⁴ ≈ 0.488 < 0.5, so the smallest n is 14.",
  },
  {
    id: "y12e1-binom-bt-d5-6",
    prompt:
      "A trial succeeds with probability 0.6. In 3 independent trials, find the probability that the first two succeed and the third fails.",
    latex: "p = 0.6",
    marks: 3,
    difficulty: 5,
    answer: "0.144",
    explanation: "P(S, S, F) = 0.6 × 0.6 × 0.4 = 0.144.",
  },
  {
    id: "y12e1-binom-bt-d5-7",
    prompt:
      "Machine A fails with probability 0.1 and machine B (independently) with probability 0.2. Find the probability that at least one machine fails.",
    latex: "P(A) = 0.1, \\ P(B) = 0.2",
    marks: 4,
    difficulty: 5,
    answer: "0.28",
    explanation:
      "P(at least one fails) = 1 − P(neither fails) = 1 − (0.9)(0.8) = 1 − 0.72 = 0.28.",
  },
  {
    id: "y12e1-binom-bt-d5-8",
    prompt:
      "A die is rolled twice. Find the probability of exactly one six (exact fraction).",
    latex: "p = \\tfrac{1}{6}, \\ n = 2",
    marks: 3,
    difficulty: 5,
    answer: "5/18",
    acceptedAnswers: ["0.2778", "0.278", "10/36"],
    explanation:
      "Two arrangements: (1/6)(5/6) + (5/6)(1/6) = 2 × 5/36 = 10/36 = 5/18.",
  },
  {
    id: "y12e1-binom-bt-d5-9",
    prompt:
      "A fair coin is tossed 3 times. Find the probability of exactly one head (exact fraction).",
    latex: "p = \\tfrac{1}{2}, \\ n = 3",
    marks: 3,
    difficulty: 5,
    answer: "3/8",
    acceptedAnswers: ["0.375"],
    explanation:
      "The head can occur on any one of three tosses: 3 × (1/2)³ = 3/8.",
  },
  {
    id: "y12e1-binom-bt-d5-10",
    prompt:
      "In 2 independent trials the probability of exactly one success equals the probability of two successes. Find p.",
    latex: "2p(1 - p) = p^2",
    marks: 4,
    difficulty: 5,
    answer: "2/3",
    acceptedAnswers: ["0.6667", "0.667"],
    explanation:
      "2p(1 − p) = p² ⇒ 2(1 − p) = p ⇒ 2 = 3p ⇒ p = 2/3 (rejecting p = 0).",
  },
];

// ── Subtopic 2: Binomial Probabilities ───────────────────────────────────────
// Apply P(X = k) = C(n,k) pᵏ qⁿ⁻ᵏ; complements; cumulative ranges; and finding a
// parameter from a probability.
const binomProbD4: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-bp-d4-1",
    prompt: "For X ~ B(5, 0.5), find P(X = 2) (exact fraction).",
    latex: "X \\sim B(5, 0.5)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{5}{16}$" },
      { label: "B", text: "$\\dfrac{1}{32}$" },
      { label: "C", text: "$\\dfrac{10}{16}$" },
      { label: "D", text: "$\\dfrac{1}{16}$" },
    ],
    answer: "A",
    explanation:
      "P(X=2) = C(5,2)(0.5)²(0.5)³ = 10/32 = 5/16. B omits the coefficient C(5,2).",
  },
  {
    id: "y12e1-binom-bp-d4-2",
    prompt: "For X ~ B(5, 0.4), find P(X ≤ 1) (4 d.p.).",
    latex: "X \\sim B(5, 0.4)",
    marks: 3,
    difficulty: 4,
    answer: "0.337",
    acceptedAnswers: ["0.33696", "0.3370"],
    explanation:
      "P(0) + P(1) = 0.6⁵ + 5(0.4)(0.6)⁴ = 0.07776 + 0.2592 = 0.33696.",
  },
  {
    id: "y12e1-binom-bp-d4-3",
    prompt: "For X ~ B(10, 0.2), find P(X = 2) (4 d.p.).",
    latex: "X \\sim B(10, 0.2)",
    marks: 3,
    difficulty: 4,
    answer: "0.302",
    acceptedAnswers: ["0.30199", "0.3020"],
    explanation: "C(10,2)(0.2)²(0.8)⁸ = 45 × 0.04 × 0.16777 ≈ 0.3020.",
  },
  {
    id: "y12e1-binom-bp-d4-4",
    prompt: "For X ~ B(8, 0.5), find P(X = 0) (exact fraction).",
    latex: "X \\sim B(8, 0.5)",
    marks: 2,
    difficulty: 4,
    answer: "1/256",
    acceptedAnswers: ["0.003906", "0.0039"],
    explanation: "P(X=0) = 0.5⁸ = 1/256 ≈ 0.0039.",
  },
  {
    id: "y12e1-binom-bp-d4-5",
    prompt: "For X ~ B(5, 0.3), find P(X = 1) (4 d.p.).",
    latex: "X \\sim B(5, 0.3)",
    marks: 2,
    difficulty: 4,
    answer: "0.3602",
    acceptedAnswers: ["0.36015", "0.360"],
    explanation: "C(5,1)(0.3)(0.7)⁴ = 5 × 0.3 × 0.2401 ≈ 0.3602.",
  },
  {
    id: "y12e1-binom-bp-d4-6",
    prompt: "For X ~ B(7, 0.4), find P(X = 7).",
    latex: "X \\sim B(7, 0.4)",
    marks: 2,
    difficulty: 4,
    answer: "0.0016384",
    acceptedAnswers: ["0.001638", "0.00164"],
    explanation: "P(X=7) = 0.4⁷ = 0.0016384.",
  },
  {
    id: "y12e1-binom-bp-d4-7",
    prompt: "For X ~ B(10, 0.5), find P(X ≥ 1) (exact fraction).",
    latex: "X \\sim B(10, 0.5)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{1023}{1024}$" },
      { label: "B", text: "$\\dfrac{1}{1024}$" },
      { label: "C", text: "$\\dfrac{1}{2}$" },
      { label: "D", text: "$1$" },
    ],
    answer: "A",
    explanation:
      "P(X≥1) = 1 − P(X=0) = 1 − 0.5¹⁰ = 1023/1024. B is P(X=0) itself.",
  },
  {
    id: "y12e1-binom-bp-d4-8",
    prompt: "For X ~ B(6, 0.2), find P(X = 0) (4 d.p.).",
    latex: "X \\sim B(6, 0.2)",
    marks: 2,
    difficulty: 4,
    answer: "0.2621",
    acceptedAnswers: ["0.262144", "0.262"],
    explanation: "P(X=0) = 0.8⁶ = 0.262144.",
  },
  {
    id: "y12e1-binom-bp-d4-9",
    prompt: "For X ~ B(3, 1/3), find P(X = 3) (exact fraction).",
    latex: "X \\sim B(3, \\tfrac{1}{3})",
    marks: 2,
    difficulty: 4,
    answer: "1/27",
    acceptedAnswers: ["0.037", "0.0370"],
    explanation: "P(X=3) = (1/3)³ = 1/27.",
  },
  {
    id: "y12e1-binom-bp-d4-10",
    prompt: "For X ~ B(12, 0.5), find P(X = 6) (4 d.p.).",
    latex: "X \\sim B(12, 0.5)",
    marks: 3,
    difficulty: 4,
    answer: "0.2256",
    acceptedAnswers: ["924/4096", "231/1024", "0.22559"],
    explanation: "C(12,6)(0.5)¹² = 924/4096 ≈ 0.2256.",
  },
];

// D5: cumulative ranges, find a parameter from a probability, the mode, a
// conditional probability, an equation in p, and an independent combination.
const binomProbD5: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-bp-d5-1",
    prompt: "For X ~ B(10, 0.3), find P(X ≥ 2) (4 d.p.).",
    latex: "X \\sim B(10, 0.3)",
    marks: 4,
    difficulty: 5,
    answer: "0.8507",
    acceptedAnswers: ["0.85069", "0.851"],
    explanation:
      "P(X≥2) = 1 − P(0) − P(1) = 1 − 0.7¹⁰ − 10(0.3)(0.7)⁹ ≈ 1 − 0.0282 − 0.1211 = 0.8507.",
  },
  {
    id: "y12e1-binom-bp-d5-2",
    prompt: "For X ~ B(6, 0.5), find P(2 ≤ X ≤ 4) (exact fraction).",
    latex: "X \\sim B(6, 0.5)",
    marks: 4,
    difficulty: 5,
    answer: "25/32",
    acceptedAnswers: ["0.78125", "0.781", "50/64"],
    explanation:
      "[C(6,2)+C(6,3)+C(6,4)]/64 = (15+20+15)/64 = 50/64 = 25/32.",
  },
  {
    id: "y12e1-binom-bp-d5-3",
    prompt: "For X ~ B(8, 0.25), find P(X ≤ 2) (4 d.p.).",
    latex: "X \\sim B(8, 0.25)",
    marks: 4,
    difficulty: 5,
    answer: "0.6785",
    acceptedAnswers: ["0.67854", "0.679"],
    explanation:
      "P(0)+P(1)+P(2) = 0.75⁸ + 8(0.25)(0.75)⁷ + 28(0.25)²(0.75)⁶ ≈ 0.1001 + 0.2670 + 0.3115 = 0.6785.",
  },
  {
    id: "y12e1-binom-bp-d5-4",
    prompt: "For X ~ B(n, 0.5), P(X = 0) = 1/64. Find n.",
    latex: "P(X = 0) = \\tfrac{1}{64}",
    marks: 3,
    difficulty: 5,
    answer: "6",
    explanation: "0.5ⁿ = 1/64 = 2⁻⁶, so n = 6.",
  },
  {
    id: "y12e1-binom-bp-d5-5",
    prompt: "For X ~ B(5, p), P(X = 5) = 0.07776. Find p.",
    latex: "P(X = 5) = 0.07776",
    marks: 3,
    difficulty: 5,
    answer: "0.6",
    acceptedAnswers: ["3/5"],
    explanation: "p⁵ = 0.07776 ⇒ p = 0.07776^{1/5} = 0.6.",
  },
  {
    id: "y12e1-binom-bp-d5-6",
    prompt: "For X ~ B(10, 0.5), find the value of X with the greatest probability (the mode).",
    latex: "X \\sim B(10, 0.5)",
    marks: 3,
    difficulty: 5,
    answer: "5",
    explanation: "The symmetric distribution peaks at the mean np = 5, so the mode is 5.",
  },
  {
    id: "y12e1-binom-bp-d5-7",
    prompt: "For X ~ B(6, 0.5), find P(X = 3 | X ≥ 3) (exact fraction).",
    latex: "X \\sim B(6, 0.5)",
    marks: 4,
    difficulty: 5,
    answer: "10/21",
    acceptedAnswers: ["0.4762", "0.476", "20/42"],
    explanation:
      "P(X=3) = 20/64; P(X≥3) = (20+15+6+1)/64 = 42/64. Ratio = 20/42 = 10/21.",
  },
  {
    id: "y12e1-binom-bp-d5-8",
    prompt: "For X ~ B(3, p), P(X = 2) = P(X = 3). Find p.",
    latex: "P(X = 2) = P(X = 3)",
    marks: 4,
    difficulty: 5,
    answer: "3/4",
    acceptedAnswers: ["0.75"],
    explanation:
      "C(3,2)p²(1−p) = C(3,3)p³ ⇒ 3p²(1−p) = p³ ⇒ 3(1−p) = p ⇒ p = 3/4.",
  },
  {
    id: "y12e1-binom-bp-d5-9",
    prompt:
      "Two students each independently sit a test modelled by X ~ B(4, 0.5). Find the probability that both score exactly 2 (exact fraction).",
    latex: "X \\sim B(4, 0.5)",
    marks: 4,
    difficulty: 5,
    answer: "9/64",
    acceptedAnswers: ["0.1406", "0.140625"],
    explanation:
      "P(X=2) = C(4,2)(0.5)⁴ = 6/16 = 3/8. Both: (3/8)² = 9/64.",
  },
  {
    id: "y12e1-binom-bp-d5-10",
    prompt:
      "For X ~ B(n, 0.2), find the smallest n for which P(X ≥ 1) > 0.9.",
    latex: "1 - 0.8^n > 0.9",
    marks: 4,
    difficulty: 5,
    answer: "11",
    explanation:
      "Need 0.8ⁿ < 0.1. 0.8¹⁰ ≈ 0.107 and 0.8¹¹ ≈ 0.086 < 0.1, so the smallest n is 11.",
  },
];

export const binomialDistributionPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "binomial-distribution",
  topicTitle: "The Binomial Distribution and Sampling Distribution of the Mean",
  subtopics: [
    {
      subtopicSlug: "bernoulli-trials",
      subtopicTitle: "Bernoulli Trials",
      remediationHref: href("bernoulli-trials"),
      d4: bernoulliD4,
      d5: bernoulliD5,
    },
    {
      subtopicSlug: "binomial-probabilities",
      subtopicTitle: "Binomial Probabilities",
      remediationHref: href("binomial-probabilities"),
      d4: binomProbD4,
      d5: binomProbD5,
    },
    {
      subtopicSlug: "mean-and-variance",
      subtopicTitle: "Mean and Variance",
      remediationHref: href("mean-and-variance"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "sampling-distribution-mean",
      subtopicTitle: "Distribution of the Sample Mean",
      remediationHref: href("sampling-distribution-mean"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "central-limit-theorem",
      subtopicTitle: "The Central Limit Theorem",
      remediationHref: href("central-limit-theorem"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "binomial-exam-practice",
      subtopicTitle: "Binomial Exam Practice",
      remediationHref: href("binomial-exam-practice"),
      d4: [],
      d5: [],
      d6: [],
    },
  ],
};
