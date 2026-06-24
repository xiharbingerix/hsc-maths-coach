import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Trigonometric Equations" (ma-t3). Difficulty is
// carried by equation STRUCTURE — periodicity/solution-count, identity recognition before solving,
// existence/range inferred through a transformation, reflection symmetry, and reconstructing an angle
// parameter under a period interaction — NOT by grinding algebra once the equation type is identified.
// All single-answer, auto-markable, hand-verified. Two lessons, three items each.

// → further-trig-equations-identities
export const trigEqCountChallenge: PracticeQuestion[] = [
  {
    // Solution-count via frequency: reason from the number of periods, do not enumerate by solving.
    id: "chal-y12a-teq-1",
    prompt:
      "How many solutions does sin(3x) = 1/2 have for 0 ≤ x ≤ 2π?",
    latex: "\\sin 3x = \\tfrac12,\\quad 0\\le x\\le 2\\pi",
    answer: "6",
    acceptedAnswers: ["six"],
    hint: "As x runs over [0, 2π], the argument 3x runs over [0, 6π] — how many full periods is that?",
    explanation:
      "Let u = 3x, so u ∈ [0, 6π] = three full periods. sin u = 1/2 has 2 solutions per period, so there are 3 × 2 = 6 solutions.",
  },
  {
    // Identity-first transformation, then a count: must factor after the double-angle substitution.
    id: "chal-y12a-teq-2",
    prompt:
      "How many solutions does sin 2x = cos x have for 0 ≤ x ≤ 2π?",
    latex: "\\sin 2x = \\cos x,\\quad 0\\le x\\le 2\\pi",
    answer: "4",
    acceptedAnswers: ["four"],
    hint: "Replace sin 2x with 2 sin x cos x and bring everything to one side — a common factor appears.",
    explanation:
      "2 sin x cos x = cos x ⟹ cos x(2 sin x − 1) = 0. cos x = 0 gives x = π/2, 3π/2; 2 sin x − 1 = 0 gives x = π/6, 5π/6. That is 4 solutions.",
  },
  {
    // Quadratic-in-cos → factor → count (a count consequence, not direct solving).
    id: "chal-y12a-teq-3",
    prompt:
      "How many solutions does 2cos²x − cos x − 1 = 0 have for 0 ≤ x ≤ 2π?",
    latex: "2\\cos^2 x - \\cos x - 1 = 0,\\quad 0\\le x\\le 2\\pi",
    answer: "4",
    acceptedAnswers: ["four"],
    hint: "Treat it as a quadratic in cos x and factorise before solving.",
    explanation:
      "(2 cos x + 1)(cos x − 1) = 0. cos x = 1 gives x = 0 and x = 2π; cos x = −1/2 gives x = 2π/3 and x = 4π/3. That is 4 solutions on the closed interval.",
  },
];

// → further-trigonometry-exam-practice
export const trigEqStructureChallenge: PracticeQuestion[] = [
  {
    // Existence/range inferred via transformation to a quadratic in cos x and its range over [-1,1].
    id: "chal-y12a-teq-4",
    prompt:
      "For what values of k does the equation cos x + sin²x = k have a solution? Give the range of k.",
    latex: "\\cos x + \\sin^2 x = k",
    answer: "-1 ≤ k ≤ 5/4",
    acceptedAnswers: ["−1 ≤ k ≤ 5/4", "-1<=k<=5/4", "[-1, 5/4]", "[-1,5/4]"],
    hint: "Use sin²x = 1 − cos²x to write k as a quadratic in c = cos x, then find its range over −1 ≤ c ≤ 1.",
    explanation:
      "k = cos x + (1 − cos²x) = −c² + c + 1 with c = cos x ∈ [−1, 1]. This parabola peaks at c = 1/2 (k = 5/4) and is smallest at c = −1 (k = −1). So a solution exists exactly when −1 ≤ k ≤ 5/4.",
  },
  {
    // Parameter reconstruction with a period interaction: the 2x makes the period π, so "smallest
    // positive" must be confirmed against the n = -1 member.
    id: "chal-y12a-teq-5",
    prompt:
      "The equation sin(2x − a) = 1, where 0 < a < 2π, has its smallest positive solution at x = π/3. Find a.",
    latex: "\\sin(2x - a) = 1,\\quad 0<a<2\\pi",
    answer: "π/6",
    acceptedAnswers: ["pi/6", "\\frac{\\pi}{6}", "30°"],
    hint: "sin(θ) = 1 ⟹ θ = π/2 + 2πn. Solve for x, note the solutions are spaced π apart, and check that π/3 really is the smallest positive one.",
    explanation:
      "2x − a = π/2 + 2πn ⟹ x = a/2 + π/4 + πn, so solutions are π apart. Setting the n = 0 value to π/3: a/2 + π/4 = π/3 ⟹ a = π/6. The previous member (n = −1) is π/3 − π = −2π/3 < 0, confirming π/3 is the smallest positive solution. So a = π/6.",
  },
  {
    // Structural symmetry: the two solutions are reflections about x = π, so their sum is fixed.
    id: "chal-y12a-teq-6",
    prompt:
      "The equation cos x = 0.4 has exactly two solutions x = α and x = β on 0 ≤ x ≤ 2π. Find α + β.",
    latex: "\\cos x = 0.4,\\quad 0\\le x\\le 2\\pi",
    answer: "2π",
    acceptedAnswers: ["2pi", "2\\pi", "6.283", "6.28"],
    hint: "You do not need α itself — how are the two solutions of cos x = c positioned relative to each other?",
    explanation:
      "For cos x = c the two solutions on [0, 2π] are α and 2π − α (reflections about x = π). Their sum is α + (2π − α) = 2π, independent of the value 0.4.",
  },
];
