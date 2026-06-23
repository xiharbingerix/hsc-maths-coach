import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Probability" (ma-s1 — probability only;
// discrete random variables / E[X] / Var are the separate ma-s3 topic). Every item
// reasons from probabilistic structure (reverse conditional/Bayes, reconstruction,
// structural bounds, complement) rather than direct substitution. Single-answer,
// auto-markable, hand-verified.

// → conditional-probability-tree-diagrams
export const probabilityBayesChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-prob-1",
    prompt:
      "Given P(A|B) = 0.6, P(B) = 0.5 and P(A) = 0.4, find P(B|A).",
    latex: "P(B\\mid A) = \\frac{P(A\\mid B)\\,P(B)}{P(A)}",
    answer: "0.75",
    acceptedAnswers: ["3/4"],
    hint: "Use Bayes: P(B|A) = P(A|B)·P(B) / P(A). Note P(A∩B) = P(A|B)·P(B).",
    explanation:
      "P(A∩B) = P(A|B)·P(B) = 0.6 × 0.5 = 0.3. Then P(B|A) = P(A∩B)/P(A) = 0.3/0.4 = 0.75.",
  },
  {
    id: "chal-y12a-prob-2",
    prompt:
      "A bag contains r red balls and 3 blue balls. Two balls are drawn without replacement, and the probability that both are red is 5/14. Find r.",
    latex: "\\frac{r}{r+3}\\cdot\\frac{r-1}{r+2} = \\frac{5}{14}",
    answer: "5",
    acceptedAnswers: ["r=5"],
    hint: "Write P(both red) in terms of r and set it equal to 5/14, then solve the resulting quadratic.",
    explanation:
      "r(r−1)/[(r+3)(r+2)] = 5/14 ⟹ 14r(r−1) = 5(r+3)(r+2) ⟹ 9r² − 39r − 30 = 0 ⟹ 3r² − 13r − 10 = 0 ⟹ (3r + 2)(r − 5) = 0 ⟹ r = 5.",
  },
];

// → independence-multiplication-rule
export const probabilityIndependenceChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-prob-3",
    prompt:
      "Events A and B are independent. P(A) = 0.6 and P(A ∪ B) = 0.8. Find P(B).",
    latex: "P(A\\cup B) = P(A) + P(B) - P(A)P(B)",
    answer: "0.5",
    acceptedAnswers: ["1/2"],
    hint: "For independent events P(A∩B) = P(A)P(B); substitute into the addition rule and solve for P(B).",
    explanation:
      "0.8 = 0.6 + P(B) − 0.6·P(B) = 0.6 + 0.4·P(B) ⟹ 0.4·P(B) = 0.2 ⟹ P(B) = 0.5.",
  },
  {
    id: "chal-y12a-prob-4",
    prompt:
      "Two independent tests each detect a fault with probability p. The probability that at least one of the two tests detects the fault is 0.96. Find p.",
    latex: "1 - (1-p)^2 = 0.96",
    answer: "0.8",
    acceptedAnswers: ["4/5", "p=0.8"],
    hint: "'At least one' is the complement of 'neither detects'. Both tests miss with probability (1−p)².",
    explanation:
      "P(neither) = (1−p)² = 1 − 0.96 = 0.04 ⟹ 1 − p = 0.2 ⟹ p = 0.8.",
  },
];

// → probability-exam-practice
export const probabilityExamChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-prob-5",
    prompt:
      "Machine A makes 60% of the items, of which 2% are defective. Machine B makes the other 40%, of which 5% are defective. An item is found to be defective. Find the probability it was made by Machine B.",
    latex: "P(B\\mid D) = \\frac{P(B)P(D\\mid B)}{P(D)}",
    answer: "0.625",
    acceptedAnswers: ["5/8"],
    hint: "Find the total probability of a defective item, then the share coming from Machine B.",
    explanation:
      "P(defective) = 0.6×0.02 + 0.4×0.05 = 0.012 + 0.02 = 0.032. P(B|defective) = 0.02/0.032 = 0.625.",
  },
  {
    id: "chal-y12a-prob-6",
    prompt:
      "Events A and B have P(A) = 0.7 and P(B) = 0.6. Find the smallest possible value of P(A ∩ B).",
    latex: "P(A\\cap B) \\ge P(A) + P(B) - 1",
    answer: "0.3",
    acceptedAnswers: ["3/10"],
    hint: "Since P(A ∪ B) ≤ 1, the addition rule forces a minimum overlap. They cannot be mutually exclusive because P(A) + P(B) > 1.",
    explanation:
      "P(A∪B) = P(A) + P(B) − P(A∩B) ≤ 1 ⟹ P(A∩B) ≥ P(A) + P(B) − 1 = 0.7 + 0.6 − 1 = 0.3. The minimum is 0.3 (when P(A∪B) = 1).",
  },
];
