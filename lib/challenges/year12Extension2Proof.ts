import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 2 "Proof" — the proof exemplar. Full proofs
// are not auto-markable, so each item targets the ONE computable value that captures the
// proof's key insight: the factor a contradiction forces, the smallest counterexample to a
// false claim, an inequality's equality case, or the reconstruction of an induction step /
// its base-case constraint. Difficulty is carried by proof STRUCTURE, not prose or notation.
// Single-answer, auto-markable, hand-verified. Registered per lesson slug, ≤2 per lesson.

// → proof-by-contradiction
export const proofContradictionChallenge: PracticeQuestion[] = [
  {
    // Contradiction-algebra: recover the shared factor that contradicts "lowest terms".
    id: "chal-y12e2-proof-1",
    prompt:
      "To prove √3 is irrational, assume √3 = p/q in lowest terms. Squaring gives p² = 3q², so 3 divides p; write p = 3r. Substituting gives q² = k·r². Find k.",
    latex: "p^2 = 3q^2,\\quad p = 3r \\ \\Rightarrow\\ q^2 = k\\,r^2",
    answer: "3",
    acceptedAnswers: ["k=3"],
    hint: "Substitute p = 3r into p² = 3q² and solve for q².",
    explanation:
      "p = 3r gives (3r)² = 3q², i.e. 9r² = 3q², so q² = 3r² and k = 3. Then 3 also divides q — but p/q was in lowest terms, the contradiction.",
  },
  {
    // Smallest counterexample to a false primality claim (must test up to 10).
    id: "chal-y12e2-proof-2",
    prompt:
      "Disprove the claim 'n² + n + 11 is prime for every integer n ≥ 0' by finding the smallest n ≥ 0 for which it fails.",
    latex: "n^2 + n + 11",
    answer: "10",
    acceptedAnswers: ["n=10"],
    hint: "Evaluate for n = 0, 1, 2, … and look for the first composite value.",
    explanation:
      "For n = 0…9 the values 11, 13, 17, 23, 31, 41, 53, 67, 83, 101 are all prime. At n = 10, n² + n + 11 = 121 = 11², which is composite. The smallest counterexample is n = 10.",
  },
];

// → proof-by-contrapositive
export const proofContrapositiveChallenge: PracticeQuestion[] = [
  {
    // Disproof that probes WHY the divisibility-proof technique needs a prime: 4 | a² does
    // not force 4 | a (reconstructable, not a recalled fact).
    id: "chal-y12e2-proof-3",
    prompt:
      "The argument '3 | n² ⟹ 3 | n' works because 3 is prime. Show the same claim fails for 4: find the smallest positive integer a for which 4 divides a² but 4 does not divide a.",
    latex: "4 \\mid a^2 \\ \\text{but}\\ 4 \\nmid a",
    answer: "2",
    acceptedAnswers: ["a=2"],
    hint: "Try small a: you need a² to be a multiple of 4 while a itself is not.",
    explanation:
      "a = 1 gives a² = 1 (not divisible by 4). a = 2 gives a² = 4, which is divisible by 4, yet 2 is not divisible by 4 — a counterexample. So the smallest a is 2. (The implication only holds when the divisor is prime.)",
  },
];

// → inequalities-algebraic-proof
export const proofInequalitiesChallenge: PracticeQuestion[] = [
  {
    // Inequality structure: use x² + y² ≥ 2xy and its equality case.
    id: "chal-y12e2-proof-4",
    prompt:
      "Using the proven inequality x² + y² ≥ 2xy, find the minimum value of (x² + y²)/(xy) for x, y > 0.",
    latex: "\\frac{x^2 + y^2}{xy},\\quad x, y > 0",
    answer: "2",
    acceptedAnswers: [],
    hint: "Divide both sides of x² + y² ≥ 2xy by xy (positive), then identify the equality case.",
    explanation:
      "For x, y > 0, dividing x² + y² ≥ 2xy by xy gives (x² + y²)/(xy) ≥ 2, with equality when x = y. The minimum value is 2.",
  },
];

// → proof-by-mathematical-induction
export const proofInductionChallenge: PracticeQuestion[] = [
  {
    // Induction-step reconstruction: the remainder that exposes the divisibility.
    id: "chal-y12e2-proof-5",
    prompt:
      "In an induction proof that 3 divides 4ⁿ − 1, the inductive step writes 4ᵏ⁺¹ − 1 = 4(4ᵏ − 1) + c. Find c.",
    latex: "4^{k+1} - 1 = 4\\,(4^{k} - 1) + c",
    answer: "3",
    acceptedAnswers: ["c=3"],
    hint: "Expand 4(4ᵏ − 1) and compare with 4ᵏ⁺¹ − 1.",
    explanation:
      "4(4ᵏ − 1) = 4ᵏ⁺¹ − 4, so 4ᵏ⁺¹ − 1 = 4(4ᵏ − 1) + 3, giving c = 3. Since 4ᵏ − 1 is divisible by 3 (hypothesis) and 3 is divisible by 3, so is 4ᵏ⁺¹ − 1.",
  },
  {
    // Parameterised base-case constraint: the induction step holds for any a, the base case
    // fixes a.
    id: "chal-y12e2-proof-6",
    prompt:
      "The statement 'n³ + an is divisible by 3 for all integers n ≥ 1' is to be proved by induction. The inductive step holds for any integer a, but the base case n = 1 requires 1 + a to be divisible by 3. Find the smallest positive integer a.",
    latex: "n^3 + an \\equiv 0 \\pmod 3,\\quad n = 1:\\ 1 + a \\equiv 0 \\pmod 3",
    answer: "2",
    acceptedAnswers: ["a=2"],
    hint: "Solve 1 + a ≡ 0 (mod 3) for the smallest positive a.",
    explanation:
      "The base case needs 1 + a ≡ 0 (mod 3), i.e. a ≡ 2 (mod 3). The smallest positive integer is a = 2 (then 1 + 2 = 3 is divisible by 3).",
  },
];
