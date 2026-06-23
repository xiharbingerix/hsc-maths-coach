import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Trigonometric Functions and Identities" (ma-t2).
// Difficulty comes from SEEING STRUCTURE, not surviving algebra: parameter/angle reconstruction,
// identity recognition (square-the-sum; double-angle), existence/range constraints, function
// behaviour from extrema, and combining a value with a quadrant sign. Two items depend
// materially on an identity (dt2-2 double-angle, dt2-3 Pythagorean). Single-answer, verified.
// (Existing 3 D6 on the trigonometric-equations lesson are separate and retained.)

// → amplitude-period-phase-vertical-shift
export const trigParamChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from amplitude + period (two properties).
    id: "chal-y12a-dt2-1",
    prompt:
      "y = a·sin(bx) has amplitude 3 and period π, with a, b > 0. Find a + b.",
    latex: "y = a\\sin(bx)",
    answer: "5",
    acceptedAnswers: [],
    hint: "Amplitude gives a directly; period = 2π/b gives b.",
    explanation:
      "Amplitude ⟹ a = 3. Period 2π/b = π ⟹ b = 2. So a + b = 5.",
  },
];

// → double-angle-formulas
export const trigDoubleAngleChallenge: PracticeQuestion[] = [
  {
    // Angle reconstruction that requires a double-angle identity, then a quadratic in sin θ.
    id: "chal-y12a-dt2-2",
    prompt:
      "Solve sin θ = cos 2θ for 0° ≤ θ ≤ 90°.",
    latex: "\\sin\\theta = \\cos 2\\theta",
    answer: "30",
    acceptedAnswers: ["30°", "30 degrees"],
    hint: "Replace cos 2θ using cos 2θ = 1 − 2sin²θ, then solve the quadratic in sin θ.",
    explanation:
      "cos 2θ = 1 − 2sin²θ, so sin θ = 1 − 2sin²θ ⟹ 2sin²θ + sin θ − 1 = 0 ⟹ (2sin θ − 1)(sin θ + 1) = 0. In [0°, 90°], sin θ = 1/2 ⟹ θ = 30° (sin θ = −1 is rejected).",
  },
];

// → trigonometric-identities-simplification
export const trigIdentityChallenge: PracticeQuestion[] = [
  {
    // Identity structure: square the sum and use sin² + cos² = 1.
    id: "chal-y12a-dt2-3",
    prompt:
      "Given sin θ + cos θ = 1.2, find sin θ cos θ.",
    latex: "\\sin\\theta + \\cos\\theta = 1.2",
    answer: "0.22",
    acceptedAnswers: ["11/50"],
    hint: "Square both sides; the cross term contains sin θ cos θ and sin² + cos² = 1.",
    explanation:
      "(sin θ + cos θ)² = sin²θ + cos²θ + 2sin θ cos θ = 1 + 2sin θ cos θ = 1.44 ⟹ 2sin θ cos θ = 0.44 ⟹ sin θ cos θ = 0.22.",
  },
];

// → graphs-sine-cosine-tangent
export const trigExistenceChallenge: PracticeQuestion[] = [
  {
    // Existence / validity from the range of sine.
    id: "chal-y12a-dt2-4",
    prompt:
      "For what values of m does the equation sin θ = 2m − 1 have a real solution?",
    latex: "\\sin\\theta = 2m - 1",
    answer: "0≤m≤1",
    acceptedAnswers: ["0 ≤ m ≤ 1", "0<=m<=1", "[0,1]"],
    hint: "sin θ only takes values in [−1, 1]; require 2m − 1 to lie in that interval.",
    explanation:
      "A solution exists iff −1 ≤ 2m − 1 ≤ 1 ⟹ 0 ≤ 2m ≤ 2 ⟹ 0 ≤ m ≤ 1.",
  },
];

// → modelling-periodic-phenomena
export const trigBehaviourChallenge: PracticeQuestion[] = [
  {
    // Function-behaviour reconstruction from extrema (vertical shift from max & min).
    id: "chal-y12a-dt2-5",
    prompt:
      "f(x) = a + b·sin(x) has a maximum value of 5 and a minimum value of −1, with b > 0. Find a.",
    latex: "f(x) = a + b\\sin(x)",
    answer: "2",
    acceptedAnswers: ["a=2"],
    hint: "The maximum is a + b and the minimum is a − b; the vertical shift a is their average.",
    explanation:
      "Max a + b = 5 and min a − b = −1. Adding: 2a = 4 ⟹ a = 2 (the midline is the average of the extrema; here b = 3).",
  },
];

// → mixed-trigonometric-functions-exam-practice
export const trigQuadrantChallenge: PracticeQuestion[] = [
  {
    // Multi-condition reconstruction: a value plus a quadrant sign.
    id: "chal-y12a-dt2-6",
    prompt:
      "θ lies in the second quadrant and sin θ = 3/5. Find tan θ.",
    latex: "\\sin\\theta = \\tfrac{3}{5},\\ \\theta \\in Q2",
    answer: "-3/4",
    acceptedAnswers: ["−3/4", "-0.75"],
    hint: "Use sin² + cos² = 1 to get |cos θ|, then fix its sign from the quadrant.",
    explanation:
      "cos²θ = 1 − 9/25 = 16/25 ⟹ |cos θ| = 4/5. In the second quadrant cosine is negative, so cos θ = −4/5 and tan θ = (3/5)/(−4/5) = −3/4.",
  },
];
