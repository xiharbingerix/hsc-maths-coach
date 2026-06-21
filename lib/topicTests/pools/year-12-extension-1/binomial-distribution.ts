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

// ── Subtopic 3: Mean and Variance ────────────────────────────────────────────
// E(X) = np, Var(X) = npq, SD(X) = √(npq). D4: compute these directly.
const meanVarD4: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-mv-d4-1",
    prompt: "For X ~ B(20, 0.3), find E(X).",
    latex: "X \\sim B(20, 0.3)",
    marks: 2,
    difficulty: 4,
    answer: "6",
    explanation: "E(X) = np = 20 × 0.3 = 6.",
  },
  {
    id: "y12e1-binom-mv-d4-2",
    prompt: "For X ~ B(20, 0.3), find Var(X).",
    latex: "X \\sim B(20, 0.3)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$4.2$" },
      { label: "B", text: "$6$" },
      { label: "C", text: "$14$" },
      { label: "D", text: "$0.7$" },
    ],
    answer: "A",
    explanation: "Var(X) = npq = 20 × 0.3 × 0.7 = 4.2. B is the mean np (forgets × q).",
  },
  {
    id: "y12e1-binom-mv-d4-3",
    prompt: "For X ~ B(20, 0.3), find the standard deviation (4 d.p.).",
    latex: "X \\sim B(20, 0.3)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$2.0494$" },
      { label: "B", text: "$4.2$" },
      { label: "C", text: "$2.4495$" },
      { label: "D", text: "$6$" },
    ],
    answer: "A",
    explanation: "SD = √(npq) = √4.2 ≈ 2.0494. B forgets the square root; C uses √(np).",
  },
  {
    id: "y12e1-binom-mv-d4-4",
    prompt: "For X ~ B(10, 0.5), find E(X).",
    latex: "X \\sim B(10, 0.5)",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "E(X) = np = 10 × 0.5 = 5.",
  },
  {
    id: "y12e1-binom-mv-d4-5",
    prompt: "For X ~ B(10, 0.5), find Var(X).",
    latex: "X \\sim B(10, 0.5)",
    marks: 2,
    difficulty: 4,
    answer: "2.5",
    acceptedAnswers: ["5/2"],
    explanation: "Var(X) = npq = 10 × 0.5 × 0.5 = 2.5.",
  },
  {
    id: "y12e1-binom-mv-d4-6",
    prompt: "For X ~ B(50, 0.2), find the standard deviation (exact form).",
    latex: "X \\sim B(50, 0.2)",
    marks: 3,
    difficulty: 4,
    answer: "2sqrt(2)",
    acceptedAnswers: ["2√2", "sqrt(8)", "2.828", "2.8284"],
    explanation: "Var = 50 × 0.2 × 0.8 = 8, so SD = √8 = 2√2 ≈ 2.83.",
  },
  {
    id: "y12e1-binom-mv-d4-7",
    prompt: "For X ~ B(50, 0.2), find Var(X).",
    latex: "X \\sim B(50, 0.2)",
    marks: 2,
    difficulty: 4,
    answer: "8",
    explanation: "Var(X) = npq = 50 × 0.2 × 0.8 = 8.",
  },
  {
    id: "y12e1-binom-mv-d4-8",
    prompt: "For X ~ B(100, 0.4), find the standard deviation (exact form).",
    latex: "X \\sim B(100, 0.4)",
    marks: 3,
    difficulty: 4,
    answer: "2sqrt(6)",
    acceptedAnswers: ["2√6", "sqrt(24)", "4.899", "4.8990"],
    explanation: "Var = 100 × 0.4 × 0.6 = 24, so SD = √24 = 2√6 ≈ 4.90.",
  },
  {
    id: "y12e1-binom-mv-d4-9",
    prompt: "For X ~ B(8, 0.25), find E(X).",
    latex: "X \\sim B(8, 0.25)",
    marks: 2,
    difficulty: 4,
    answer: "2",
    explanation: "E(X) = np = 8 × 0.25 = 2.",
  },
  {
    id: "y12e1-binom-mv-d4-10",
    prompt: "For X ~ B(12, 1/3), find Var(X) (exact fraction).",
    latex: "X \\sim B(12, \\tfrac{1}{3})",
    marks: 2,
    difficulty: 4,
    answer: "8/3",
    acceptedAnswers: ["2.667", "2.6667"],
    explanation: "Var = npq = 12 × (1/3) × (2/3) = 24/9 = 8/3.",
  },
];

// D5: recover n or p from a given mean / variance / SD, including a quadratic in
// p and mean+variance combined conditions.
const meanVarD5: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-mv-d5-1",
    prompt: "X ~ B(n, 0.4) has mean 8. Find n.",
    latex: "E(X) = 8, \\ p = 0.4",
    marks: 3,
    difficulty: 5,
    answer: "20",
    explanation: "np = 8 ⇒ 0.4n = 8 ⇒ n = 20.",
  },
  {
    id: "y12e1-binom-mv-d5-2",
    prompt: "X ~ B(25, p) has mean 10. Find p.",
    latex: "E(X) = 10, \\ n = 25",
    marks: 3,
    difficulty: 5,
    answer: "0.4",
    acceptedAnswers: ["2/5"],
    explanation: "25p = 10 ⇒ p = 0.4.",
  },
  {
    id: "y12e1-binom-mv-d5-3",
    prompt: "X ~ B(n, 0.5) has variance 4. Find n.",
    latex: "Var(X) = 4, \\ p = 0.5",
    marks: 3,
    difficulty: 5,
    answer: "16",
    explanation: "npq = n(0.25) = 4 ⇒ n = 16.",
  },
  {
    id: "y12e1-binom-mv-d5-4",
    prompt: "X ~ B(20, p) has variance 4.2, with p < 0.5. Find p.",
    latex: "Var(X) = 4.2, \\ n = 20",
    marks: 4,
    difficulty: 5,
    answer: "0.3",
    acceptedAnswers: ["3/10"],
    explanation:
      "20p(1−p) = 4.2 ⇒ p(1−p) = 0.21 ⇒ p² − p + 0.21 = 0 ⇒ p = 0.3 or 0.7; take p = 0.3.",
  },
  {
    id: "y12e1-binom-mv-d5-5",
    prompt: "A binomial variable has mean 12 and variance 4.8. Find n.",
    latex: "E(X) = 12, \\ Var(X) = 4.8",
    marks: 4,
    difficulty: 5,
    answer: "20",
    explanation:
      "q = Var/mean = 4.8/12 = 0.4, so p = 0.6. Then n = mean/p = 12/0.6 = 20.",
  },
  {
    id: "y12e1-binom-mv-d5-6",
    prompt: "A binomial variable has mean 15 and variance 6. Find p.",
    latex: "E(X) = 15, \\ Var(X) = 6",
    marks: 4,
    difficulty: 5,
    answer: "0.6",
    acceptedAnswers: ["3/5"],
    explanation: "q = Var/mean = 6/15 = 0.4, so p = 1 − 0.4 = 0.6.",
  },
  {
    id: "y12e1-binom-mv-d5-7",
    prompt: "A binomial variable has mean 8 and standard deviation 2. Find n.",
    latex: "E(X) = 8, \\ SD(X) = 2",
    marks: 4,
    difficulty: 5,
    answer: "16",
    explanation:
      "Var = SD² = 4. q = Var/mean = 4/8 = 0.5, so p = 0.5 and n = 8/0.5 = 16.",
  },
  {
    id: "y12e1-binom-mv-d5-8",
    prompt: "A binomial variable has mean 10 and variance 5. Find p.",
    latex: "E(X) = 10, \\ Var(X) = 5",
    marks: 3,
    difficulty: 5,
    answer: "0.5",
    acceptedAnswers: ["1/2"],
    explanation: "q = Var/mean = 5/10 = 0.5, so p = 0.5.",
  },
  {
    id: "y12e1-binom-mv-d5-9",
    prompt:
      "X ~ B(20, 0.5) and Y ~ B(20, 0.3). Find Var(X) − Var(Y).",
    latex: "X \\sim B(20, 0.5), \\ Y \\sim B(20, 0.3)",
    marks: 4,
    difficulty: 5,
    answer: "0.8",
    acceptedAnswers: ["4/5"],
    explanation: "Var(X) = 20(0.25) = 5; Var(Y) = 20(0.21) = 4.2; difference = 0.8.",
  },
  {
    id: "y12e1-binom-mv-d5-10",
    prompt: "A binomial variable has mean 9 and variance 6.3. Find n.",
    latex: "E(X) = 9, \\ Var(X) = 6.3",
    marks: 4,
    difficulty: 5,
    answer: "30",
    explanation:
      "q = Var/mean = 6.3/9 = 0.7, so p = 0.3. Then n = 9/0.3 = 30.",
  },
];

// ── Subtopic 4: Distribution of the Sample Mean ──────────────────────────────
// E(x̄) = μ, Var(x̄) = σ²/n, SD(x̄) = σ/√n (the standard error). D4: compute these.
const sampleMeanD4: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-sm-d4-1",
    prompt:
      "A population has μ = 50, σ = 10. For samples of size n = 25, find E(x̄).",
    latex: "\\mu = 50, \\ \\sigma = 10, \\ n = 25",
    marks: 2,
    difficulty: 4,
    answer: "50",
    explanation: "E(x̄) = μ = 50 (the sample mean is unbiased).",
  },
  {
    id: "y12e1-binom-sm-d4-2",
    prompt:
      "A population has μ = 50, σ = 10. For samples of size n = 25, find Var(x̄).",
    latex: "\\sigma = 10, \\ n = 25",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$4$" },
      { label: "B", text: "$100$" },
      { label: "C", text: "$0.4$" },
      { label: "D", text: "$2$" },
    ],
    answer: "A",
    explanation: "Var(x̄) = σ²/n = 100/25 = 4. B is σ² (forgets ÷ n); C is σ/n.",
  },
  {
    id: "y12e1-binom-sm-d4-3",
    prompt:
      "A population has μ = 50, σ = 10. For samples of size n = 25, find the standard error of x̄.",
    latex: "\\sigma = 10, \\ n = 25",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$2$" },
      { label: "B", text: "$0.4$" },
      { label: "C", text: "$4$" },
      { label: "D", text: "$10$" },
    ],
    answer: "A",
    explanation: "SD(x̄) = σ/√n = 10/5 = 2. B is σ/n; C is the variance σ²/n.",
  },
  {
    id: "y12e1-binom-sm-d4-4",
    prompt:
      "A population has σ = 15. For samples of size n = 9, find the standard error of x̄.",
    latex: "\\sigma = 15, \\ n = 9",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "SD(x̄) = σ/√n = 15/3 = 5.",
  },
  {
    id: "y12e1-binom-sm-d4-5",
    prompt:
      "A population has σ = 6. For samples of size n = 36, find the standard error of x̄.",
    latex: "\\sigma = 6, \\ n = 36",
    marks: 2,
    difficulty: 4,
    answer: "1",
    explanation: "SD(x̄) = σ/√n = 6/6 = 1.",
  },
  {
    id: "y12e1-binom-sm-d4-6",
    prompt:
      "A population has μ = 80, σ = 12. For samples of size n = 16, find E(x̄).",
    latex: "\\mu = 80, \\ \\sigma = 12, \\ n = 16",
    marks: 2,
    difficulty: 4,
    answer: "80",
    explanation: "E(x̄) = μ = 80.",
  },
  {
    id: "y12e1-binom-sm-d4-7",
    prompt:
      "A population has σ = 12. For samples of size n = 16, find Var(x̄).",
    latex: "\\sigma = 12, \\ n = 16",
    marks: 2,
    difficulty: 4,
    answer: "9",
    explanation: "Var(x̄) = σ²/n = 144/16 = 9.",
  },
  {
    id: "y12e1-binom-sm-d4-8",
    prompt:
      "A population has σ = 12. For samples of size n = 16, find the standard error of x̄.",
    latex: "\\sigma = 12, \\ n = 16",
    marks: 2,
    difficulty: 4,
    answer: "3",
    explanation: "SD(x̄) = σ/√n = 12/4 = 3.",
  },
  {
    id: "y12e1-binom-sm-d4-9",
    prompt:
      "A population has μ = 120, σ = 25. For samples of size n = 100, find E(x̄).",
    latex: "\\mu = 120, \\ n = 100",
    marks: 2,
    difficulty: 4,
    answer: "120",
    explanation: "E(x̄) = μ = 120.",
  },
  {
    id: "y12e1-binom-sm-d4-10",
    prompt:
      "A population has σ = 40. For samples of size n = 4, find Var(x̄).",
    latex: "\\sigma = 40, \\ n = 4",
    marks: 2,
    difficulty: 4,
    answer: "400",
    explanation: "Var(x̄) = σ²/n = 1600/4 = 400.",
  },
];

// D5: find n for a target standard error, scaling effects, an inequality for the
// smallest n, and recovering σ.
const sampleMeanD5: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-sm-d5-1",
    prompt: "A population has σ = 20. Find the sample size n giving a standard error of 4.",
    latex: "\\tfrac{\\sigma}{\\sqrt{n}} = 4, \\ \\sigma = 20",
    marks: 4,
    difficulty: 5,
    answer: "25",
    explanation: "20/√n = 4 ⇒ √n = 5 ⇒ n = 25.",
  },
  {
    id: "y12e1-binom-sm-d5-2",
    prompt: "A population has σ = 12. Find n so that SD(x̄) = 2.",
    latex: "\\tfrac{\\sigma}{\\sqrt{n}} = 2, \\ \\sigma = 12",
    marks: 4,
    difficulty: 5,
    answer: "36",
    explanation: "12/√n = 2 ⇒ √n = 6 ⇒ n = 36.",
  },
  {
    id: "y12e1-binom-sm-d5-3",
    prompt:
      "If the sample size is quadrupled, by what factor is the standard error of x̄ multiplied?",
    latex: "SD(\\bar{x}) = \\tfrac{\\sigma}{\\sqrt{n}}",
    marks: 3,
    difficulty: 5,
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    explanation: "SD(x̄) ∝ 1/√n, so multiplying n by 4 multiplies the SE by 1/√4 = 1/2.",
  },
  {
    id: "y12e1-binom-sm-d5-4",
    prompt:
      "Samples of size 25 are taken. To halve the standard error of x̄, what new sample size is required?",
    latex: "n = 25",
    marks: 4,
    difficulty: 5,
    answer: "100",
    explanation: "Halving the SE needs √n to double, i.e. n × 4 = 25 × 4 = 100.",
  },
  {
    id: "y12e1-binom-sm-d5-5",
    prompt:
      "A population has σ = 10. Find the smallest sample size n for which SD(x̄) < 0.5.",
    latex: "\\tfrac{10}{\\sqrt{n}} < 0.5",
    marks: 4,
    difficulty: 5,
    answer: "401",
    explanation: "10/√n < 0.5 ⇒ √n > 20 ⇒ n > 400, so the smallest n is 401.",
  },
  {
    id: "y12e1-binom-sm-d5-6",
    prompt: "A population has σ = 8 and Var(x̄) = 2. Find n.",
    latex: "Var(\\bar{x}) = \\tfrac{\\sigma^2}{n} = 2, \\ \\sigma = 8",
    marks: 3,
    difficulty: 5,
    answer: "32",
    explanation: "64/n = 2 ⇒ n = 32.",
  },
  {
    id: "y12e1-binom-sm-d5-7",
    prompt: "Samples of size 16 give SD(x̄) = 3. Find the population standard deviation σ.",
    latex: "\\tfrac{\\sigma}{\\sqrt{16}} = 3",
    marks: 3,
    difficulty: 5,
    answer: "12",
    explanation: "σ/4 = 3 ⇒ σ = 12.",
  },
  {
    id: "y12e1-binom-sm-d5-8",
    prompt:
      "A population has variance σ² = 50. For samples of size n = 25, find SD(x̄) (exact form).",
    latex: "\\sigma^2 = 50, \\ n = 25",
    marks: 4,
    difficulty: 5,
    answer: "sqrt(2)",
    acceptedAnswers: ["√2", "1.414", "1.4142"],
    explanation: "σ = √50, so SD(x̄) = √50/√25 = √50/5 = (5√2)/5 = √2.",
  },
  {
    id: "y12e1-binom-sm-d5-9",
    prompt:
      "From a population with σ = 20, find the ratio SD(x̄) for n = 25 to SD(x̄) for n = 100.",
    latex: "\\sigma = 20",
    marks: 4,
    difficulty: 5,
    answer: "2",
    acceptedAnswers: ["2:1"],
    explanation: "SE₂₅ = 20/5 = 4, SE₁₀₀ = 20/10 = 2, so the ratio is 4 : 2 = 2.",
  },
  {
    id: "y12e1-binom-sm-d5-10",
    prompt:
      "For samples of size n, the standard error of x̄ equals one-tenth of σ. Find n.",
    latex: "\\tfrac{\\sigma}{\\sqrt{n}} = \\tfrac{\\sigma}{10}",
    marks: 4,
    difficulty: 5,
    answer: "100",
    explanation: "σ/√n = σ/10 ⇒ √n = 10 ⇒ n = 100.",
  },
];

// ── Subtopic 5: The Central Limit Theorem ────────────────────────────────────
// z = (x̄ − μ)/(σ/√n); probabilities via standard normal values
// (P(z<1)=0.8413, P(z<2)=0.9772, P(−1<z<1)=0.6826, P(−2<z<2)=0.9544, z₀.₉₇₅=1.96).
const cltD4: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-clt-d4-1",
    prompt:
      "A population has μ = 100, σ = 20. For samples of size 25, find the z-score of x̄ = 104.",
    latex: "\\mu = 100, \\ \\sigma = 20, \\ n = 25, \\ \\bar{x} = 104",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$1$" },
      { label: "B", text: "$0.2$" },
      { label: "C", text: "$5$" },
      { label: "D", text: "$0.04$" },
    ],
    answer: "A",
    explanation:
      "z = (x̄ − μ)/(σ/√n) = (104 − 100)/(20/5) = 4/4 = 1. B uses σ instead of the standard error σ/√n.",
  },
  {
    id: "y12e1-binom-clt-d4-2",
    prompt:
      "A population has μ = 50, σ = 10. For samples of size 4, find the z-score of x̄ = 45.",
    latex: "\\mu = 50, \\ \\sigma = 10, \\ n = 4, \\ \\bar{x} = 45",
    marks: 3,
    difficulty: 4,
    answer: "-1",
    acceptedAnswers: ["−1"],
    explanation: "z = (45 − 50)/(10/2) = −5/5 = −1.",
  },
  {
    id: "y12e1-binom-clt-d4-3",
    prompt:
      "A population has μ = 60, σ = 12. For samples of size 16, find the z-score of x̄ = 63.",
    latex: "\\mu = 60, \\ \\sigma = 12, \\ n = 16, \\ \\bar{x} = 63",
    marks: 3,
    difficulty: 4,
    answer: "1",
    explanation: "z = (63 − 60)/(12/4) = 3/3 = 1.",
  },
  {
    id: "y12e1-binom-clt-d4-4",
    prompt:
      "A population has μ = 200, σ = 40. For samples of size 100, find the z-score of x̄ = 208.",
    latex: "\\mu = 200, \\ \\sigma = 40, \\ n = 100, \\ \\bar{x} = 208",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$2$" },
      { label: "B", text: "$0.2$" },
      { label: "C", text: "$20$" },
      { label: "D", text: "$0.5$" },
    ],
    answer: "A",
    explanation:
      "z = (208 − 200)/(40/10) = 8/4 = 2. B forgets the √n in the standard error.",
  },
  {
    id: "y12e1-binom-clt-d4-5",
    prompt:
      "A population has μ = 400, σ = 60. For samples of size 36, find P(x̄ < 410) (4 d.p.).",
    latex: "\\mu = 400, \\ \\sigma = 60, \\ n = 36",
    marks: 3,
    difficulty: 4,
    answer: "0.8413",
    acceptedAnswers: ["0.841", "0.84"],
    explanation:
      "SE = 60/6 = 10, z = (410 − 400)/10 = 1, so P(x̄ < 410) = P(z < 1) = 0.8413.",
  },
  {
    id: "y12e1-binom-clt-d4-6",
    prompt: "Using the standard normal distribution, find P(z < 1) (4 d.p.).",
    latex: "P(z < 1)",
    marks: 2,
    difficulty: 4,
    answer: "0.8413",
    acceptedAnswers: ["0.841", "0.84"],
    explanation: "From standard normal values, P(z < 1) ≈ 0.8413.",
  },
  {
    id: "y12e1-binom-clt-d4-7",
    prompt: "Using the standard normal distribution, find P(z < −1) (4 d.p.).",
    latex: "P(z < -1)",
    marks: 2,
    difficulty: 4,
    answer: "0.1587",
    acceptedAnswers: ["0.159", "0.16"],
    explanation: "P(z < −1) = 1 − P(z < 1) = 1 − 0.8413 = 0.1587.",
  },
  {
    id: "y12e1-binom-clt-d4-8",
    prompt: "Using the standard normal distribution, find P(z < 2) (4 d.p.).",
    latex: "P(z < 2)",
    marks: 2,
    difficulty: 4,
    answer: "0.9772",
    acceptedAnswers: ["0.977", "0.98"],
    explanation: "From standard normal values, P(z < 2) ≈ 0.9772.",
  },
  {
    id: "y12e1-binom-clt-d4-9",
    prompt: "Find P(−1 < z < 1) for the standard normal distribution (4 d.p.).",
    latex: "P(-1 < z < 1)",
    marks: 2,
    difficulty: 4,
    answer: "0.6826",
    acceptedAnswers: ["0.683", "0.68"],
    explanation: "P(−1 < z < 1) = 0.8413 − 0.1587 = 0.6826.",
  },
  {
    id: "y12e1-binom-clt-d4-10",
    prompt: "Find P(−2 < z < 2) for the standard normal distribution (4 d.p.).",
    latex: "P(-2 < z < 2)",
    marks: 2,
    difficulty: 4,
    answer: "0.9544",
    acceptedAnswers: ["0.954", "0.95"],
    explanation: "P(−2 < z < 2) = 0.9772 − 0.0228 = 0.9544.",
  },
];

// D5: upper / two-tail probabilities, inverse problems (z→x̄, percentile→x̄),
// recovering σ or n from a probability, and margin of error.
const cltD5: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-clt-d5-1",
    prompt:
      "A population has μ = 100, σ = 20. For samples of size 25, find P(x̄ > 104) (4 d.p.).",
    latex: "\\mu = 100, \\ \\sigma = 20, \\ n = 25",
    marks: 4,
    difficulty: 5,
    answer: "0.1587",
    acceptedAnswers: ["0.159", "0.16"],
    explanation: "z = 1, so P(x̄ > 104) = P(z > 1) = 1 − 0.8413 = 0.1587.",
  },
  {
    id: "y12e1-binom-clt-d5-2",
    prompt:
      "A population has μ = 50, σ = 10. For samples of size 100, find P(48 < x̄ < 52) (4 d.p.).",
    latex: "\\mu = 50, \\ \\sigma = 10, \\ n = 100",
    marks: 4,
    difficulty: 5,
    answer: "0.9544",
    acceptedAnswers: ["0.954", "0.95"],
    explanation: "SE = 1, so 48 and 52 are at z = ±2: P = P(−2 < z < 2) = 0.9544.",
  },
  {
    id: "y12e1-binom-clt-d5-3",
    prompt:
      "A population has μ = 80, σ = 20. For samples of size 25, find P(x̄ > 76) (4 d.p.).",
    latex: "\\mu = 80, \\ \\sigma = 20, \\ n = 25",
    marks: 4,
    difficulty: 5,
    answer: "0.8413",
    acceptedAnswers: ["0.841", "0.84"],
    explanation: "SE = 4, z = (76 − 80)/4 = −1, so P(x̄ > 76) = P(z > −1) = 0.8413.",
  },
  {
    id: "y12e1-binom-clt-d5-4",
    prompt:
      "A population has μ = 100, σ = 15. For samples of size 9, find the value of x̄ with z-score 2.",
    latex: "\\mu = 100, \\ \\sigma = 15, \\ n = 9, \\ z = 2",
    marks: 3,
    difficulty: 5,
    answer: "110",
    explanation: "x̄ = μ + z(σ/√n) = 100 + 2(15/3) = 100 + 10 = 110.",
  },
  {
    id: "y12e1-binom-clt-d5-5",
    prompt:
      "A population has μ = 60, σ = 24. For samples of size 16, find the value below which 97.5% of sample means lie.",
    latex: "\\mu = 60, \\ \\sigma = 24, \\ n = 16",
    marks: 4,
    difficulty: 5,
    answer: "71.76",
    acceptedAnswers: ["71.8"],
    explanation: "z₀.₉₇₅ = 1.96, SE = 6, so x̄ = 60 + 1.96(6) = 60 + 11.76 = 71.76.",
  },
  {
    id: "y12e1-binom-clt-d5-6",
    prompt:
      "A sample mean x̄ = 85 has z-score 1.5, where μ = 70 and n = 36. Find σ.",
    latex: "\\bar{x} = 85, \\ z = 1.5, \\ \\mu = 70, \\ n = 36",
    marks: 4,
    difficulty: 5,
    answer: "60",
    explanation: "z = (85 − 70)/(σ/6) = 90/σ = 1.5 ⇒ σ = 60.",
  },
  {
    id: "y12e1-binom-clt-d5-7",
    prompt:
      "A population has μ = 500, σ = 100. Find the sample size n for which P(x̄ > 520) = 0.0228.",
    latex: "P(\\bar{x} > 520) = 0.0228",
    marks: 4,
    difficulty: 5,
    answer: "100",
    explanation:
      "P = 0.0228 corresponds to z = 2. (520 − 500)/(100/√n) = 2 ⇒ 20√n/100 = 2 ⇒ √n = 10 ⇒ n = 100.",
  },
  {
    id: "y12e1-binom-clt-d5-8",
    prompt:
      "A population has μ = 200, σ = 50. For samples of size 25, find P(x̄ < 190 or x̄ > 210) (4 d.p.).",
    latex: "\\mu = 200, \\ \\sigma = 50, \\ n = 25",
    marks: 4,
    difficulty: 5,
    answer: "0.3174",
    acceptedAnswers: ["0.317", "0.32"],
    explanation: "SE = 10, so 190 and 210 are at z = ±1: P(outside) = 2(0.1587) = 0.3174.",
  },
  {
    id: "y12e1-binom-clt-d5-9",
    prompt:
      "A population has μ = 100, σ = 30. For samples of size 36, find the distance from μ within which 95% of sample means lie.",
    latex: "\\mu = 100, \\ \\sigma = 30, \\ n = 36",
    marks: 4,
    difficulty: 5,
    answer: "9.8",
    explanation: "Margin = 1.96 × SE = 1.96 × (30/6) = 1.96 × 5 = 9.8.",
  },
  {
    id: "y12e1-binom-clt-d5-10",
    prompt:
      "A population has μ = 150, σ = 40. For samples of size 64, find P(145 < x̄ < 155) (4 d.p.).",
    latex: "\\mu = 150, \\ \\sigma = 40, \\ n = 64",
    marks: 4,
    difficulty: 5,
    answer: "0.6826",
    acceptedAnswers: ["0.683", "0.68"],
    explanation: "SE = 5, so 145 and 155 are at z = ±1: P = P(−1 < z < 1) = 0.6826.",
  },
];

// ── Subtopic 6: Binomial Exam Practice — D6 (exam-mastery synoptic) ───────────
// Multi-part Section II-style items, each combining ≥2 strands (binomial
// probabilities, mean/variance, parameter recovery, sampling distribution, CLT).
const examPracticeD6: TopicTestQuestion[] = [
  {
    id: "y12e1-binom-ex-d6-1",
    prompt: "A random variable X ~ B(10, 0.4).",
    latex: "X \\sim B(10, 0.4)",
    marks: 6,
    difficulty: 6,
    explanation: "A binomial probability, the mean and variance, then a complement.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find P(X = 4) (4 d.p.).", marks: 2,
        answer: "0.2508", acceptedAnswers: ["0.251", "0.25"],
        explanation: "C(10,4)(0.4)⁴(0.6)⁶ ≈ 0.2508." },
      { key: "b", label: "(b)", prompt: "Find E(X).", marks: 1, answer: "4",
        explanation: "E(X) = np = 10(0.4) = 4." },
      { key: "c", label: "(c)", prompt: "Find Var(X).", marks: 1, answer: "2.4",
        acceptedAnswers: ["12/5"], explanation: "Var(X) = npq = 10(0.4)(0.6) = 2.4." },
      { key: "d", label: "(d)", prompt: "Find P(X ≥ 1) (4 d.p.).", marks: 2,
        answer: "0.9940", acceptedAnswers: ["0.994", "0.9939"],
        explanation: "1 − P(X=0) = 1 − 0.6¹⁰ ≈ 0.9940." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-2",
    prompt: "A random variable X ~ B(6, 0.5).",
    latex: "X \\sim B(6, 0.5)",
    marks: 6,
    difficulty: 6,
    explanation: "Single and cumulative probabilities, then the mean and SD.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find P(X = 3) (exact fraction).", marks: 2,
        answer: "5/16", acceptedAnswers: ["0.3125", "20/64"],
        explanation: "C(6,3)/64 = 20/64 = 5/16." },
      { key: "b", label: "(b)", prompt: "Find P(X ≥ 4) (exact fraction).", marks: 2,
        answer: "11/32", acceptedAnswers: ["0.34375", "22/64"],
        explanation: "(C(6,4)+C(6,5)+C(6,6))/64 = (15+6+1)/64 = 22/64 = 11/32." },
      { key: "c", label: "(c)", prompt: "Find E(X).", marks: 1, answer: "3",
        explanation: "E(X) = np = 6(0.5) = 3." },
      { key: "d", label: "(d)", prompt: "Find the standard deviation (4 d.p.).", marks: 1,
        answer: "1.2247", acceptedAnswers: ["sqrt(1.5)", "√1.5", "1.225", "1.22"],
        explanation: "SD = √(npq) = √1.5 ≈ 1.2247." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-3",
    prompt:
      "5% of items from a production line are defective. A sample of 20 items is taken; X is the number of defectives.",
    latex: "X \\sim B(20, 0.05)",
    marks: 6,
    difficulty: 6,
    explanation: "Mean, then 'none', 'at least one', and 'exactly two' probabilities.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the expected number of defectives.", marks: 1,
        answer: "1", explanation: "E(X) = np = 20(0.05) = 1." },
      { key: "b", label: "(b)", prompt: "Find P(no defectives) (4 d.p.).", marks: 2,
        answer: "0.3585", acceptedAnswers: ["0.358", "0.36"],
        explanation: "P(X=0) = 0.95²⁰ ≈ 0.3585." },
      { key: "c", label: "(c)", prompt: "Find P(at least one defective) (4 d.p.).", marks: 1,
        answer: "0.6415", acceptedAnswers: ["0.642", "0.64"],
        explanation: "1 − 0.3585 = 0.6415." },
      { key: "d", label: "(d)", prompt: "Find P(exactly two defectives) (4 d.p.).", marks: 2,
        answer: "0.1887", acceptedAnswers: ["0.189", "0.19"],
        explanation: "C(20,2)(0.05)²(0.95)¹⁸ ≈ 0.1887." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-4",
    prompt: "A binomial variable X ~ B(n, p) has mean 12 and variance 3.",
    latex: "E(X) = 12, \\ Var(X) = 3",
    marks: 6,
    difficulty: 6,
    explanation: "Recover q, p and n from the mean and variance, then a probability.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find q.", marks: 1, answer: "0.25",
        acceptedAnswers: ["1/4"], explanation: "q = Var/mean = 3/12 = 0.25." },
      { key: "b", label: "(b)", prompt: "Find p.", marks: 1, answer: "0.75",
        acceptedAnswers: ["3/4"], explanation: "p = 1 − q = 0.75." },
      { key: "c", label: "(c)", prompt: "Find n.", marks: 2, answer: "16",
        explanation: "n = mean/p = 12/0.75 = 16." },
      { key: "d", label: "(d)", prompt: "Find P(X = n) (4 d.p.).", marks: 2,
        answer: "0.0100", acceptedAnswers: ["0.01", "0.0100226"],
        explanation: "P(X=16) = 0.75¹⁶ ≈ 0.0100." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-5",
    prompt:
      "A population has μ = 500, σ = 80. Samples of size 64 are taken.",
    latex: "\\mu = 500, \\ \\sigma = 80, \\ n = 64",
    marks: 6,
    difficulty: 6,
    explanation: "Standard error, two probabilities about x̄, then a percentile.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the standard error of x̄.", marks: 1,
        answer: "10", explanation: "SD(x̄) = σ/√n = 80/8 = 10." },
      { key: "b", label: "(b)", prompt: "Find P(x̄ > 510) (4 d.p.).", marks: 2,
        answer: "0.1587", acceptedAnswers: ["0.159", "0.16"],
        explanation: "z = 1, so P(x̄ > 510) = 1 − 0.8413 = 0.1587." },
      { key: "c", label: "(c)", prompt: "Find P(490 < x̄ < 520) (4 d.p.).", marks: 2,
        answer: "0.8185", acceptedAnswers: ["0.819", "0.82"],
        explanation: "z = −1 to 2: 0.9772 − 0.1587 = 0.8185." },
      { key: "d", label: "(d)", prompt: "Find the value exceeded by only 2.5% of sample means.", marks: 1,
        answer: "519.6", explanation: "μ + 1.96(SE) = 500 + 1.96(10) = 519.6." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-6",
    prompt: "A population has μ = 70, σ = 12.",
    latex: "\\mu = 70, \\ \\sigma = 12",
    marks: 6,
    difficulty: 6,
    explanation: "Standard error, find n for a target SE, then two probabilities.",
    parts: [
      { key: "a", label: "(a)", prompt: "For n = 36, find the standard error of x̄.", marks: 1,
        answer: "2", explanation: "SD(x̄) = 12/6 = 2." },
      { key: "b", label: "(b)", prompt: "Find n so that the standard error is 1.5.", marks: 2,
        answer: "64", explanation: "12/√n = 1.5 ⇒ √n = 8 ⇒ n = 64." },
      { key: "c", label: "(c)", prompt: "For n = 36, find P(x̄ < 68) (4 d.p.).", marks: 2,
        answer: "0.1587", acceptedAnswers: ["0.159", "0.16"],
        explanation: "z = (68 − 70)/2 = −1, so P = 0.1587." },
      { key: "d", label: "(d)", prompt: "For n = 36, find P(x̄ > 66) (4 d.p.).", marks: 1,
        answer: "0.9772", acceptedAnswers: ["0.977", "0.98"],
        explanation: "z = (66 − 70)/2 = −2, so P(x̄ > 66) = P(z > −2) = 0.9772." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-7",
    prompt: "A fair die is rolled 5 times; X is the number of sixes.",
    latex: "X \\sim B(5, \\tfrac{1}{6})",
    marks: 6,
    difficulty: 6,
    explanation: "Probabilities of none / at least one, the mean, and exactly one.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find P(X = 0) (4 d.p.).", marks: 2,
        answer: "0.4019", acceptedAnswers: ["0.402", "0.40"],
        explanation: "(5/6)⁵ ≈ 0.4019." },
      { key: "b", label: "(b)", prompt: "Find P(X ≥ 1) (4 d.p.).", marks: 1,
        answer: "0.5981", acceptedAnswers: ["0.598", "0.60"],
        explanation: "1 − 0.4019 = 0.5981." },
      { key: "c", label: "(c)", prompt: "Find E(X) (4 d.p.).", marks: 1,
        answer: "0.8333", acceptedAnswers: ["5/6", "0.833", "0.83"],
        explanation: "E(X) = np = 5(1/6) = 5/6 ≈ 0.8333." },
      { key: "d", label: "(d)", prompt: "Find P(X = 1) (4 d.p.).", marks: 2,
        answer: "0.4019", acceptedAnswers: ["0.402", "0.40"],
        explanation: "C(5,1)(1/6)(5/6)⁴ ≈ 0.4019." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-8",
    prompt: "A random variable X ~ B(4, 0.5).",
    latex: "X \\sim B(4, 0.5)",
    marks: 6,
    difficulty: 6,
    explanation: "A probability, a cumulative probability, a conditional, and the mean.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find P(X = 2) (exact fraction).", marks: 1,
        answer: "3/8", acceptedAnswers: ["0.375", "6/16"],
        explanation: "C(4,2)/16 = 6/16 = 3/8." },
      { key: "b", label: "(b)", prompt: "Find P(X ≥ 2) (exact fraction).", marks: 2,
        answer: "11/16", acceptedAnswers: ["0.6875"],
        explanation: "(6+4+1)/16 = 11/16." },
      { key: "c", label: "(c)", prompt: "Find P(X = 2 | X ≥ 2) (exact fraction).", marks: 2,
        answer: "6/11", acceptedAnswers: ["0.5455", "0.545"],
        explanation: "P(X=2)/P(X≥2) = (6/16)/(11/16) = 6/11." },
      { key: "d", label: "(d)", prompt: "Find E(X).", marks: 1, answer: "2",
        explanation: "E(X) = np = 4(0.5) = 2." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-9",
    prompt: "Consider binomial experiments with constant success probability.",
    latex: "\\text{Binomial parameters}",
    marks: 6,
    difficulty: 6,
    explanation: "Recover n from a probability, evaluate, then a smallest-n threshold.",
    parts: [
      { key: "a", label: "(a)", prompt: "For X ~ B(n, 0.5), P(X = 0) = 1/32. Find n.", marks: 2,
        answer: "5", explanation: "0.5ⁿ = 1/32 = 2⁻⁵, so n = 5." },
      { key: "b", label: "(b)", prompt: "For that value of n, find P(X = 5) (exact fraction).", marks: 1,
        answer: "1/32", acceptedAnswers: ["0.03125"],
        explanation: "P(X=5) = 0.5⁵ = 1/32." },
      { key: "c", label: "(c)", prompt: "A die is rolled n times. Find the smallest n for which P(at least one six) > 0.95.", marks: 3,
        answer: "17",
        explanation: "Need (5/6)ⁿ < 0.05. (5/6)¹⁶ ≈ 0.054 and (5/6)¹⁷ ≈ 0.045 < 0.05, so n = 17." },
    ],
  },
  {
    id: "y12e1-binom-ex-d6-10",
    prompt: "A population has μ = 100, σ = 25.",
    latex: "\\mu = 100, \\ \\sigma = 25",
    marks: 6,
    difficulty: 6,
    explanation: "Standard error, a probability about x̄, then find n for a margin of error.",
    parts: [
      { key: "a", label: "(a)", prompt: "For n = 25, find the standard error of x̄.", marks: 1,
        answer: "5", explanation: "SD(x̄) = 25/√25 = 25/5 = 5." },
      { key: "b", label: "(b)", prompt: "For n = 25, find P(x̄ < 110) (4 d.p.).", marks: 2,
        answer: "0.9772", acceptedAnswers: ["0.977", "0.98"],
        explanation: "z = (110 − 100)/5 = 2, so P = 0.9772." },
      { key: "c", label: "(c)", prompt: "Find n so that 95% of sample means lie within 4.9 of μ.", marks: 3,
        answer: "100",
        explanation: "1.96(25/√n) = 4.9 ⇒ 25/√n = 2.5 ⇒ √n = 10 ⇒ n = 100." },
    ],
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
      d4: meanVarD4,
      d5: meanVarD5,
    },
    {
      subtopicSlug: "sampling-distribution-mean",
      subtopicTitle: "Distribution of the Sample Mean",
      remediationHref: href("sampling-distribution-mean"),
      d4: sampleMeanD4,
      d5: sampleMeanD5,
    },
    {
      subtopicSlug: "central-limit-theorem",
      subtopicTitle: "The Central Limit Theorem",
      remediationHref: href("central-limit-theorem"),
      d4: cltD4,
      d5: cltD5,
    },
    {
      subtopicSlug: "binomial-exam-practice",
      subtopicTitle: "Binomial Exam Practice",
      remediationHref: href("binomial-exam-practice"),
      d4: [],
      d5: [],
      d6: examPracticeD6,
    },
  ],
};
