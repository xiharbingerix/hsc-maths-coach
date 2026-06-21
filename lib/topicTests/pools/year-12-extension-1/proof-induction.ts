import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Proof by Mathematical Induction.
 *
 * Induction is proof-centric, so each subtopic pairs genuine auto-markable D4/D5
 * fluency items (evaluate the formula, the k+1 step's added term/constant, the
 * smallest n, divisibility quotients) with a D6 band of free-response proofs
 * graded by the AI proof marker (responseType:"proof"). The proofs are drawn only
 * when PROOF_MARKER_ENABLED; the assembler filters them otherwise, so the test
 * still works (computationally) if the marker is off. "Prior Knowledge Revision"
 * is excluded.
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/proof-induction/${lesson}`;

// ── Subtopic 1: Introduction to Mathematical Induction (series/sum formulas) ──
const introD4: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-intro-d4-1",
    prompt: "For 1 + 2 + … + n = n(n+1)/2, evaluate the right-hand side at n = 10.",
    latex: "1 + 2 + \\dots + n = \\tfrac{n(n+1)}{2}",
    marks: 2,
    difficulty: 4,
    answer: "55",
    explanation: "10(11)/2 = 55.",
  },
  {
    id: "y12e1-ind-intro-d4-2",
    prompt: "The sum 1 + 3 + 5 + … + (2n − 1) = n². Find the sum of the first 8 odd numbers.",
    latex: "1 + 3 + \\dots + (2n-1) = n^2",
    marks: 2,
    difficulty: 4,
    answer: "64",
    explanation: "8² = 64.",
  },
  {
    id: "y12e1-ind-intro-d4-3",
    prompt: "For Σr² = n(n+1)(2n+1)/6, evaluate at n = 3.",
    latex: "\\sum_{r=1}^{n} r^2 = \\tfrac{n(n+1)(2n+1)}{6}",
    marks: 2,
    difficulty: 4,
    answer: "14",
    explanation: "3(4)(7)/6 = 84/6 = 14 (= 1 + 4 + 9).",
  },
  {
    id: "y12e1-ind-intro-d4-4",
    prompt:
      "In proving 1 + 2 + … + n = n(n+1)/2, the term added going from the n = 4 case to the n = 5 case is the new last term. What is its value?",
    latex: "P(k) \\to P(k+1)",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "Going from n = 4 to n = 5 adds the term (k + 1) = 5.",
  },
  {
    id: "y12e1-ind-intro-d4-5",
    prompt: "Evaluate the right-hand side of 1 + 2 + … + n = n(n+1)/2 for the base case n = 1.",
    latex: "n = 1",
    marks: 2,
    difficulty: 4,
    answer: "1",
    explanation: "1(2)/2 = 1, matching the left-hand side (just the term 1).",
  },
  {
    id: "y12e1-ind-intro-d4-6",
    prompt: "For 1³ + 2³ + … + n³ = [n(n+1)/2]², evaluate at n = 4.",
    latex: "\\sum_{r=1}^{n} r^3 = \\left[\\tfrac{n(n+1)}{2}\\right]^2",
    marks: 2,
    difficulty: 4,
    answer: "100",
    explanation: "[4(5)/2]² = 10² = 100.",
  },
  {
    id: "y12e1-ind-intro-d4-7",
    prompt: "The sum 2 + 4 + … + 2n = n(n+1). Find the sum of the first 6 even numbers.",
    latex: "2 + 4 + \\dots + 2n = n(n+1)",
    marks: 2,
    difficulty: 4,
    answer: "42",
    explanation: "6(7) = 42.",
  },
  {
    id: "y12e1-ind-intro-d4-8",
    prompt: "The sum 1 + 2 + 4 + … + 2ⁿ⁻¹ = 2ⁿ − 1. Evaluate at n = 5.",
    latex: "1 + 2 + 4 + \\dots + 2^{n-1} = 2^n - 1",
    marks: 2,
    difficulty: 4,
    answer: "31",
    explanation: "2⁵ − 1 = 31.",
  },
  {
    id: "y12e1-ind-intro-d4-9",
    prompt: "Find n for which n(n+1)/2 = 55.",
    latex: "\\tfrac{n(n+1)}{2} = 55",
    marks: 3,
    difficulty: 4,
    answer: "10",
    explanation: "n(n+1) = 110 = 10(11), so n = 10.",
  },
  {
    id: "y12e1-ind-intro-d4-10",
    prompt: "The sum 1 + 2 + … + n equals 210. Find n.",
    latex: "\\tfrac{n(n+1)}{2} = 210",
    marks: 3,
    difficulty: 4,
    answer: "20",
    explanation: "n(n+1) = 420 = 20(21), so n = 20.",
  },
];

const introD5: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-intro-d5-1",
    prompt:
      "Assuming 1 + 2 + … + k = k(k+1)/2, the sum to (k+1) terms simplifies to (k+1)(k+2)/2. Evaluate this for the sum to 6 terms.",
    latex: "\\tfrac{(k+1)(k+2)}{2}",
    marks: 4,
    difficulty: 5,
    answer: "21",
    explanation: "Sum to 6 (k+1 = 6): 6(7)/2 = 21.",
  },
  {
    id: "y12e1-ind-intro-d5-2",
    prompt: "For Σr² = n(n+1)(2n+1)/6, evaluate at n = 10.",
    latex: "\\sum_{r=1}^{10} r^2",
    marks: 3,
    difficulty: 5,
    answer: "385",
    explanation: "10(11)(21)/6 = 2310/6 = 385.",
  },
  {
    id: "y12e1-ind-intro-d5-3",
    prompt: "For Σr³ = [n(n+1)/2]², evaluate at n = 5.",
    latex: "\\sum_{r=1}^{5} r^3",
    marks: 3,
    difficulty: 5,
    answer: "225",
    explanation: "[5(6)/2]² = 15² = 225.",
  },
  {
    id: "y12e1-ind-intro-d5-4",
    prompt: "Find the smallest n for which 1 + 2 + … + n exceeds 100.",
    latex: "\\tfrac{n(n+1)}{2} > 100",
    marks: 4,
    difficulty: 5,
    answer: "14",
    explanation: "n(n+1) > 200: 13(14) = 182, 14(15) = 210 ⇒ smallest n = 14 (sum 105).",
  },
  {
    id: "y12e1-ind-intro-d5-5",
    prompt: "The sum 2 + 5 + 8 + … + (3n − 1) = n(3n+1)/2. Evaluate at n = 5.",
    latex: "\\sum_{r=1}^{n}(3r-1) = \\tfrac{n(3n+1)}{2}",
    marks: 4,
    difficulty: 5,
    answer: "40",
    explanation: "5(16)/2 = 40.",
  },
  {
    id: "y12e1-ind-intro-d5-6",
    prompt: "The sum Σ r·r! = (n+1)! − 1. Evaluate at n = 4.",
    latex: "\\sum_{r=1}^{n} r\\cdot r! = (n+1)! - 1",
    marks: 4,
    difficulty: 5,
    answer: "119",
    explanation: "5! − 1 = 120 − 1 = 119.",
  },
  {
    id: "y12e1-ind-intro-d5-7",
    prompt: "The sum 1 + 3 + 9 + … + 3ⁿ⁻¹ = (3ⁿ − 1)/2. Evaluate at n = 4.",
    latex: "\\sum_{r=1}^{n} 3^{r-1} = \\tfrac{3^n - 1}{2}",
    marks: 3,
    difficulty: 5,
    answer: "40",
    explanation: "(3⁴ − 1)/2 = 80/2 = 40.",
  },
  {
    id: "y12e1-ind-intro-d5-8",
    prompt: "The sum Σ 1/(r(r+1)) = n/(n+1). Evaluate at n = 4 (exact fraction).",
    latex: "\\sum_{r=1}^{n} \\tfrac{1}{r(r+1)} = \\tfrac{n}{n+1}",
    marks: 4,
    difficulty: 5,
    answer: "4/5",
    acceptedAnswers: ["0.8"],
    explanation: "n/(n+1) = 4/5.",
  },
  {
    id: "y12e1-ind-intro-d5-9",
    prompt:
      "In the inductive step for 1 + 2 + … + n = n(n+1)/2, both sides at n = k+1 equal (k+1)(k+2)/2. Evaluate this expression at k = 10.",
    latex: "\\tfrac{(k+1)(k+2)}{2}, \\ k = 10",
    marks: 3,
    difficulty: 5,
    answer: "66",
    explanation: "11(12)/2 = 66.",
  },
  {
    id: "y12e1-ind-intro-d5-10",
    prompt: "The sum of the first n even numbers is n(n+1). Find n if this sum is 110.",
    latex: "n(n+1) = 110",
    marks: 3,
    difficulty: 5,
    answer: "10",
    explanation: "110 = 10(11), so n = 10.",
  },
];

const introD6: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-intro-d6-1",
    prompt: "Prove by mathematical induction that 1 + 2 + 3 + … + n = n(n+1)/2 for all integers n ≥ 1.",
    latex: "1 + 2 + \\dots + n = \\tfrac{n(n+1)}{2}",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base case n = 1: LHS = 1, RHS = 1(2)/2 = 1. Assume true for n = k: 1 + … + k = k(k+1)/2. Then 1 + … + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2, which is the formula at n = k+1. By induction it holds for all n ≥ 1.",
    modelSolution:
      "Base case n=1: LHS = 1; RHS = 1(1+1)/2 = 1; equal. Inductive hypothesis: assume 1+2+…+k = k(k+1)/2. Inductive step: 1+2+…+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)[k/2 + 1] = (k+1)(k+2)/2, which is the formula with n = k+1. Hence by mathematical induction the result holds for all integers n ≥ 1. (A complete proof needs: base case verified, a clearly stated hypothesis at n=k, a valid step deriving n=k+1 from it, and a conclusion.)",
  },
  {
    id: "y12e1-ind-intro-d6-2",
    prompt: "Prove by mathematical induction that 1 + 3 + 5 + … + (2n − 1) = n² for all integers n ≥ 1.",
    latex: "1 + 3 + \\dots + (2n-1) = n^2",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base case n = 1: LHS = 1, RHS = 1² = 1. Assume 1 + … + (2k−1) = k². Then adding the next odd term (2k+1): k² + (2k+1) = (k+1)². So it holds for k+1, and by induction for all n ≥ 1.",
    modelSolution:
      "Base case n=1: LHS = 1 = 1² = RHS. Hypothesis: assume 1+3+…+(2k−1) = k². Step: the next term is 2(k+1)−1 = 2k+1, so the sum to k+1 terms is k² + (2k+1) = (k+1)². This is n² with n = k+1. By induction the result holds for all n ≥ 1. (Must verify base case, state hypothesis, add the (2k+1) term and factor to (k+1)², conclude.)",
  },
  {
    id: "y12e1-ind-intro-d6-3",
    prompt: "Prove by mathematical induction that Σ_{r=1}^{n} r² = n(n+1)(2n+1)/6 for all integers n ≥ 1.",
    latex: "\\sum_{r=1}^{n} r^2 = \\tfrac{n(n+1)(2n+1)}{6}",
    marks: 4,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: LHS = 1, RHS = 1(2)(3)/6 = 1. Assume Σ_{r=1}^{k} r² = k(k+1)(2k+1)/6. Add (k+1)²: k(k+1)(2k+1)/6 + (k+1)² = (k+1)[k(2k+1) + 6(k+1)]/6 = (k+1)(2k² + 7k + 6)/6 = (k+1)(k+2)(2k+3)/6, the formula at k+1. By induction it holds for all n ≥ 1.",
    modelSolution:
      "Base case n=1: LHS = 1; RHS = 1·2·3/6 = 1. Hypothesis: assume Σ_{r=1}^{k} r² = k(k+1)(2k+1)/6. Step: add (k+1)²: k(k+1)(2k+1)/6 + (k+1)² = (k+1)[k(2k+1) + 6(k+1)]/6 = (k+1)(2k²+7k+6)/6 = (k+1)(k+2)(2k+3)/6, which equals the formula with n = k+1 since 2(k+1)+1 = 2k+3. By induction the result holds for all n ≥ 1. (Must factor out (k+1) and show the bracket factors to (k+2)(2k+3).)",
  },
  {
    id: "y12e1-ind-intro-d6-4",
    prompt: "Prove by mathematical induction that 1 + 2 + 4 + … + 2ⁿ⁻¹ = 2ⁿ − 1 for all integers n ≥ 1.",
    latex: "\\sum_{r=1}^{n} 2^{r-1} = 2^n - 1",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: LHS = 1, RHS = 2¹ − 1 = 1. Assume sum to k terms = 2ᵏ − 1. Add 2ᵏ: (2ᵏ − 1) + 2ᵏ = 2·2ᵏ − 1 = 2ᵏ⁺¹ − 1. So it holds for k+1, and by induction for all n ≥ 1.",
    modelSolution:
      "Base case n=1: LHS = 1; RHS = 2¹ − 1 = 1. Hypothesis: assume 1+2+…+2^{k−1} = 2^k − 1. Step: the next term is 2^k, so the new sum is (2^k − 1) + 2^k = 2·2^k − 1 = 2^{k+1} − 1, the formula with n = k+1. By induction the result holds for all n ≥ 1. (Must add 2^k and combine to 2^{k+1} − 1.)",
  },
];

// ── Subtopic 2: Induction Divisibility Proofs ────────────────────────────────
// Fluency: evaluate f(n), quotients, and the constant exposed in the k+1 step
// a^{k+1} − 1 = a(a^k − 1) + (a − 1).
const divD4: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-div-d4-1",
    prompt: "To show 7ⁿ − 1 is divisible by 6, evaluate 7² − 1.",
    latex: "7^n - 1",
    marks: 2,
    difficulty: 4,
    answer: "48",
    explanation: "7² − 1 = 48 = 6 × 8.",
  },
  {
    id: "y12e1-ind-div-d4-2",
    prompt: "Evaluate 7³ − 1.",
    latex: "7^3 - 1",
    marks: 2,
    difficulty: 4,
    answer: "342",
    explanation: "343 − 1 = 342 = 6 × 57.",
  },
  {
    id: "y12e1-ind-div-d4-3",
    prompt: "n³ − n is divisible by 6 for all n. Evaluate it at n = 4.",
    latex: "n^3 - n",
    marks: 2,
    difficulty: 4,
    answer: "60",
    explanation: "4³ − 4 = 64 − 4 = 60 = 6 × 10.",
  },
  {
    id: "y12e1-ind-div-d4-4",
    prompt: "To show 5ⁿ − 1 is divisible by 4, evaluate 5³ − 1.",
    latex: "5^n - 1",
    marks: 2,
    difficulty: 4,
    answer: "124",
    explanation: "125 − 1 = 124 = 4 × 31.",
  },
  {
    id: "y12e1-ind-div-d4-5",
    prompt: "Evaluate 9² − 1 (showing 9ⁿ − 1 is divisible by 8).",
    latex: "9^2 - 1",
    marks: 2,
    difficulty: 4,
    answer: "80",
    explanation: "81 − 1 = 80 = 8 × 10.",
  },
  {
    id: "y12e1-ind-div-d4-6",
    prompt: "Evaluate 4³ − 1 (showing 4ⁿ − 1 is divisible by 3).",
    latex: "4^3 - 1",
    marks: 2,
    difficulty: 4,
    answer: "63",
    explanation: "64 − 1 = 63 = 3 × 21.",
  },
  {
    id: "y12e1-ind-div-d4-7",
    prompt: "Evaluate 6² − 1 (showing 6ⁿ − 1 is divisible by 5).",
    latex: "6^2 - 1",
    marks: 2,
    difficulty: 4,
    answer: "35",
    explanation: "36 − 1 = 35 = 5 × 7.",
  },
  {
    id: "y12e1-ind-div-d4-8",
    prompt: "Evaluate 10³ − 1 (showing 10ⁿ − 1 is divisible by 9).",
    latex: "10^3 - 1",
    marks: 2,
    difficulty: 4,
    answer: "999",
    explanation: "1000 − 1 = 999 = 9 × 111.",
  },
];

const divD5: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-div-d5-1",
    prompt:
      "Writing 7ᵏ⁺¹ − 1 = 7(7ᵏ − 1) + c exposes a known multiple of 6 plus a constant c. Find c.",
    latex: "7^{k+1} - 1 = 7(7^k - 1) + c",
    marks: 4,
    difficulty: 5,
    answer: "6",
    explanation: "7(7ᵏ − 1) + 6 = 7·7ᵏ − 7 + 6 = 7ᵏ⁺¹ − 1, so c = 6 (itself a multiple of 6).",
  },
  {
    id: "y12e1-ind-div-d5-2",
    prompt: "Writing 5ᵏ⁺¹ − 1 = 5(5ᵏ − 1) + c, find c.",
    latex: "5^{k+1} - 1 = 5(5^k - 1) + c",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation: "5(5ᵏ − 1) + 4 = 5ᵏ⁺¹ − 5 + 4 = 5ᵏ⁺¹ − 1, so c = 4 (a multiple of 4).",
  },
  {
    id: "y12e1-ind-div-d5-3",
    prompt: "Writing 6ᵏ⁺¹ − 1 = 6(6ᵏ − 1) + c, find c.",
    latex: "6^{k+1} - 1 = 6(6^k - 1) + c",
    marks: 3,
    difficulty: 5,
    answer: "5",
    explanation: "c = 6 − 1 = 5 (a multiple of 5).",
  },
  {
    id: "y12e1-ind-div-d5-4",
    prompt: "342 is divisible by 6. Find the quotient 342 ÷ 6.",
    latex: "342 \\div 6",
    marks: 3,
    difficulty: 5,
    answer: "57",
    explanation: "342 = 6 × 57.",
  },
  {
    id: "y12e1-ind-div-d5-5",
    prompt: "n³ − n factors as (n−1)n(n+1). Evaluate this product at n = 5.",
    latex: "(n-1)n(n+1)",
    marks: 4,
    difficulty: 5,
    answer: "120",
    explanation: "4 × 5 × 6 = 120 (three consecutive integers, divisible by 6).",
  },
  {
    id: "y12e1-ind-div-d5-6",
    prompt: "999 is divisible by 9. Find the quotient 999 ÷ 9.",
    latex: "999 \\div 9",
    marks: 3,
    difficulty: 5,
    answer: "111",
    explanation: "999 = 9 × 111.",
  },
];

const divD6: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-div-d6-1",
    prompt: "Prove by mathematical induction that 7ⁿ − 1 is divisible by 6 for all integers n ≥ 1.",
    latex: "6 \\mid (7^n - 1)",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: 7 − 1 = 6, divisible by 6. Assume 7ᵏ − 1 = 6m. Then 7ᵏ⁺¹ − 1 = 7·7ᵏ − 1 = 7(6m + 1) − 1 = 42m + 6 = 6(7m + 1), divisible by 6. By induction it holds for all n ≥ 1.",
    modelSolution:
      "Base case n=1: 7¹ − 1 = 6 = 6×1. Hypothesis: assume 7^k − 1 = 6m for some integer m, i.e. 7^k = 6m + 1. Step: 7^{k+1} − 1 = 7·7^k − 1 = 7(6m + 1) − 1 = 42m + 6 = 6(7m + 1), a multiple of 6. By induction 6 | (7^n − 1) for all n ≥ 1. (Must write the hypothesis as a multiple of 6, substitute into 7^{k+1} − 1, and factor out 6.)",
  },
  {
    id: "y12e1-ind-div-d6-2",
    prompt: "Prove by mathematical induction that 5ⁿ − 1 is divisible by 4 for all integers n ≥ 1.",
    latex: "4 \\mid (5^n - 1)",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: 5 − 1 = 4. Assume 5ᵏ − 1 = 4m. Then 5ᵏ⁺¹ − 1 = 5(4m + 1) − 1 = 20m + 4 = 4(5m + 1). By induction divisible by 4 for all n ≥ 1.",
    modelSolution:
      "Base case n=1: 5 − 1 = 4 = 4×1. Hypothesis: assume 5^k − 1 = 4m, so 5^k = 4m + 1. Step: 5^{k+1} − 1 = 5·5^k − 1 = 5(4m + 1) − 1 = 20m + 4 = 4(5m + 1), a multiple of 4. By induction 4 | (5^n − 1) for all n ≥ 1. (Must use the hypothesis as a multiple of 4 and factor 4 from the k+1 expression.)",
  },
  {
    id: "y12e1-ind-div-d6-3",
    prompt: "Prove by mathematical induction that n³ − n is divisible by 6 for all integers n ≥ 1.",
    latex: "6 \\mid (n^3 - n)",
    marks: 4,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: 1 − 1 = 0 = 6×0. Assume k³ − k = 6m. Then (k+1)³ − (k+1) = k³ + 3k² + 3k + 1 − k − 1 = (k³ − k) + 3k² + 3k = 6m + 3k(k+1). Since k(k+1) is even, 3k(k+1) is divisible by 6, so the total is divisible by 6. By induction true for all n ≥ 1.",
    modelSolution:
      "Base case n=1: 1³ − 1 = 0, divisible by 6. Hypothesis: assume k³ − k = 6m. Step: (k+1)³ − (k+1) = (k³ − k) + 3k² + 3k = 6m + 3k(k+1). As k(k+1) is a product of consecutive integers it is even, so 3k(k+1) is a multiple of 6; hence the whole expression is a multiple of 6. By induction 6 | (n³ − n) for all n ≥ 1. (Must expand (k+1)³ − (k+1), recover k³ − k, and argue 3k(k+1) is divisible by 6.)",
  },
  {
    id: "y12e1-ind-div-d6-4",
    prompt: "Prove by mathematical induction that 9ⁿ − 1 is divisible by 8 for all integers n ≥ 1.",
    latex: "8 \\mid (9^n - 1)",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: 9 − 1 = 8. Assume 9ᵏ − 1 = 8m. Then 9ᵏ⁺¹ − 1 = 9(8m + 1) − 1 = 72m + 8 = 8(9m + 1). By induction divisible by 8 for all n ≥ 1.",
    modelSolution:
      "Base case n=1: 9 − 1 = 8 = 8×1. Hypothesis: assume 9^k − 1 = 8m, so 9^k = 8m + 1. Step: 9^{k+1} − 1 = 9·9^k − 1 = 9(8m + 1) − 1 = 72m + 8 = 8(9m + 1), a multiple of 8. By induction 8 | (9^n − 1) for all n ≥ 1.",
  },
];

// ── Subtopic 3: Induction Inequality Proofs ──────────────────────────────────
// Fluency: evaluate both sides, find where an inequality starts to hold.
const ineqD4: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-ineq-d4-1",
    prompt: "For the inequality 2ⁿ > n², evaluate 2⁵.",
    latex: "2^n > n^2",
    marks: 2,
    difficulty: 4,
    answer: "32",
    explanation: "2⁵ = 32 (and 5² = 25, so the inequality holds at n = 5).",
  },
  {
    id: "y12e1-ind-ineq-d4-2",
    prompt: "Evaluate 5² (the right-hand side of 2ⁿ > n² at n = 5).",
    latex: "5^2",
    marks: 2,
    difficulty: 4,
    answer: "25",
    explanation: "5² = 25.",
  },
  {
    id: "y12e1-ind-ineq-d4-3",
    prompt: "For the inequality n! > 2ⁿ, evaluate 4!.",
    latex: "n! > 2^n",
    marks: 2,
    difficulty: 4,
    answer: "24",
    explanation: "4! = 24.",
  },
  {
    id: "y12e1-ind-ineq-d4-4",
    prompt: "Evaluate 2⁴ (the right-hand side of n! > 2ⁿ at n = 4).",
    latex: "2^4",
    marks: 2,
    difficulty: 4,
    answer: "16",
    explanation: "2⁴ = 16 (and 4! = 24 > 16, so it holds at n = 4).",
  },
  {
    id: "y12e1-ind-ineq-d4-5",
    prompt: "For 3ⁿ > 2ⁿ + n, evaluate 3² (the left-hand side at n = 2).",
    latex: "3^n > 2^n + n",
    marks: 2,
    difficulty: 4,
    answer: "9",
    explanation: "3² = 9 (and 2² + 2 = 6, so the inequality holds at n = 2).",
  },
  {
    id: "y12e1-ind-ineq-d4-6",
    prompt: "For the base case of 2ⁿ ≥ n + 1, evaluate the left-hand side at n = 1.",
    latex: "2^n \\ge n + 1, \\ n = 1",
    marks: 2,
    difficulty: 4,
    answer: "2",
    explanation: "2¹ = 2 = 1 + 1, so the base case holds (with equality).",
  },
];

const ineqD5: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-ineq-d5-1",
    prompt: "Find the smallest integer n ≥ 3 for which 2ⁿ > n².",
    latex: "2^n > n^2",
    marks: 4,
    difficulty: 5,
    answer: "5",
    explanation: "n = 3: 8 < 9; n = 4: 16 = 16; n = 5: 32 > 25 ✓. Smallest is n = 5 (and it holds for all n ≥ 5).",
  },
  {
    id: "y12e1-ind-ineq-d5-2",
    prompt: "Find the smallest integer n for which n! > 2ⁿ.",
    latex: "n! > 2^n",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation: "n = 3: 6 < 8; n = 4: 24 > 16 ✓. Smallest is n = 4.",
  },
  {
    id: "y12e1-ind-ineq-d5-3",
    prompt: "Find the smallest integer n for which n² > 2n + 1.",
    latex: "n^2 > 2n + 1",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation: "n = 2: 4 < 5; n = 3: 9 > 7 ✓. Smallest is n = 3.",
  },
  {
    id: "y12e1-ind-ineq-d5-4",
    prompt:
      "The base case of 2ⁿ ≥ n + 1 is checked at n = 1, where both sides equal the same value. What is that value?",
    latex: "2^1 \\text{ and } 1 + 1",
    marks: 3,
    difficulty: 5,
    answer: "2",
    explanation: "2¹ = 2 and 1 + 1 = 2, so the base case holds with equality at value 2.",
  },
];

const ineqD6: TopicTestQuestion[] = [
  {
    id: "y12e1-ind-ineq-d6-1",
    prompt: "Prove by mathematical induction that 2ⁿ > n² for all integers n ≥ 5.",
    latex: "2^n > n^2, \\ n \\ge 5",
    marks: 4,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 5: 32 > 25. Assume 2ᵏ > k² for some k ≥ 5. Then 2ᵏ⁺¹ = 2·2ᵏ > 2k². It suffices that 2k² ≥ (k+1)², i.e. k² − 2k − 1 ≥ 0, true for k ≥ 3 (so certainly k ≥ 5). Hence 2ᵏ⁺¹ > (k+1)². By induction true for all n ≥ 5.",
    modelSolution:
      "Base case n=5: 2⁵ = 32 > 25 = 5². Hypothesis: assume 2^k > k² for some k ≥ 5. Step: 2^{k+1} = 2·2^k > 2k². Now 2k² − (k+1)² = k² − 2k − 1 ≥ 0 for k ≥ 3 (since k² ≥ 2k + 1 there), so 2k² ≥ (k+1)². Therefore 2^{k+1} > (k+1)². By induction 2^n > n² for all n ≥ 5. (Must verify base at n=5, use 2·2^k > 2k², and justify 2k² ≥ (k+1)² for k ≥ 5.)",
  },
  {
    id: "y12e1-ind-ineq-d6-2",
    prompt: "Prove by mathematical induction that n! > 2ⁿ for all integers n ≥ 4.",
    latex: "n! > 2^n, \\ n \\ge 4",
    marks: 4,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 4: 24 > 16. Assume k! > 2ᵏ for k ≥ 4. Then (k+1)! = (k+1)·k! > (k+1)·2ᵏ > 2·2ᵏ = 2ᵏ⁺¹ since k+1 > 2. By induction true for all n ≥ 4.",
    modelSolution:
      "Base case n=4: 4! = 24 > 16 = 2⁴. Hypothesis: assume k! > 2^k for some k ≥ 4. Step: (k+1)! = (k+1)·k! > (k+1)·2^k. Since k ≥ 4, k+1 ≥ 5 > 2, so (k+1)·2^k > 2·2^k = 2^{k+1}. Hence (k+1)! > 2^{k+1}. By induction n! > 2^n for all n ≥ 4. (Must use (k+1)! = (k+1)·k! and k+1 > 2.)",
  },
  {
    id: "y12e1-ind-ineq-d6-3",
    prompt:
      "Prove by mathematical induction that (1 + x)ⁿ ≥ 1 + nx for all integers n ≥ 1, where x > −1 (Bernoulli's inequality).",
    latex: "(1 + x)^n \\ge 1 + nx",
    marks: 4,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: (1+x)¹ = 1 + x ≥ 1 + x. Assume (1+x)ᵏ ≥ 1 + kx. Multiply both sides by (1+x) > 0: (1+x)ᵏ⁺¹ ≥ (1 + kx)(1 + x) = 1 + (k+1)x + kx² ≥ 1 + (k+1)x since kx² ≥ 0. By induction true for all n ≥ 1.",
    modelSolution:
      "Base case n=1: (1+x)¹ = 1 + x = 1 + 1·x, so equality holds. Hypothesis: assume (1+x)^k ≥ 1 + kx. Step: since x > −1, 1 + x > 0, so multiplying preserves the inequality: (1+x)^{k+1} = (1+x)^k(1+x) ≥ (1 + kx)(1 + x) = 1 + (k+1)x + kx². As kx² ≥ 0, this is ≥ 1 + (k+1)x. By induction (1+x)^n ≥ 1 + nx for all n ≥ 1. (Must multiply the hypothesis by (1+x) > 0 and drop the kx² ≥ 0 term.)",
  },
  {
    id: "y12e1-ind-ineq-d6-4",
    prompt: "Prove by mathematical induction that 2ⁿ ≥ n + 1 for all integers n ≥ 1.",
    latex: "2^n \\ge n + 1",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Base n = 1: 2 ≥ 2. Assume 2ᵏ ≥ k + 1. Then 2ᵏ⁺¹ = 2·2ᵏ ≥ 2(k+1) = 2k + 2 ≥ k + 2 = (k+1) + 1 since k ≥ 0. By induction true for all n ≥ 1.",
    modelSolution:
      "Base case n=1: 2¹ = 2 ≥ 1 + 1 = 2. Hypothesis: assume 2^k ≥ k + 1. Step: 2^{k+1} = 2·2^k ≥ 2(k + 1) = 2k + 2. Since k ≥ 1, 2k + 2 ≥ k + 2 = (k+1) + 1. Hence 2^{k+1} ≥ (k+1) + 1. By induction 2^n ≥ n + 1 for all n ≥ 1.",
  },
];

export const proofInductionPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "proof-induction",
  topicTitle: "Proof by Mathematical Induction",
  subtopics: [
    {
      subtopicSlug: "intro-to-mathematical-induction",
      subtopicTitle: "Introduction to Mathematical Induction",
      remediationHref: href("intro-to-mathematical-induction"),
      d4: introD4,
      d5: introD5,
      d6: introD6,
    },
    {
      subtopicSlug: "induction-divisibility",
      subtopicTitle: "Induction Divisibility Proofs",
      remediationHref: href("induction-divisibility"),
      d4: divD4,
      d5: divD5,
      d6: divD6,
    },
    {
      subtopicSlug: "induction-inequalities",
      subtopicTitle: "Induction Inequality Proofs",
      remediationHref: href("induction-inequalities"),
      d4: ineqD4,
      d5: ineqD5,
      d6: ineqD6,
    },
  ],
};
