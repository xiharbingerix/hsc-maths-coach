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
      d4: [],
      d5: [],
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
