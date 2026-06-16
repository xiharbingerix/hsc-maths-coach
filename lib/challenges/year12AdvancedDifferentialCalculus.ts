import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced differential-calculus lessons.
// All answers SymPy-verified. Synoptic / D6 where possible (reverse problems,
// systems from stationary-point conditions).

export const differentiatingPolynomialFunctionsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-dpf-1",
    prompt:
      "The tangent to y = x³ − 3x has gradient 9 at certain points. Find the x-coordinates of these points.",
    latex: "y = x^3 - 3x",
    answer: "2, -2",
    acceptedAnswers: ["-2, 2", "x=2, x=-2", "2 and -2"],
    hint: "Set dy/dx equal to 9 and solve the resulting equation.",
    explanation:
      "dy/dx = 3x² − 3 = 9 ⟹ x² = 4 ⟹ x = ±2.",
  },
  {
    id: "chal-y12a-dpf-2",
    prompt:
      "The curve y = 2x³ + ax² + bx has stationary points at x = 1 and x = −3.",
    latex: "y = 2x^3 + ax^2 + bx",
    answer: "",
    explanation:
      "y' = 6x² + 2ax + b has roots 1 and −3. Sum of roots = 1 + (−3) = −2 = −(2a)/6 ⟹ a = 6. Product = (1)(−3) = −3 = b/6 ⟹ b = −18.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the value of a.",
        marks: 1,
        answer: "6",
        explanation: "Sum of the roots 1 + (−3) = −(2a)/6 ⟹ a = 6.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the value of b.",
        marks: 1,
        answer: "-18",
        explanation: "Product of the roots (1)(−3) = b/6 ⟹ b = −18.",
      },
    ],
  },
  {
    id: "chal-y12a-dpf-3",
    prompt: "Find all the x-coordinates of the stationary points of y = x⁴ − 8x².",
    latex: "y = x^4 - 8x^2",
    answer: "0, 2, -2",
    acceptedAnswers: ["-2, 0, 2", "0, -2, 2", "2, -2, 0"],
    hint: "Factor y' completely before solving y' = 0.",
    explanation:
      "y' = 4x³ − 16x = 4x(x² − 4) = 4x(x − 2)(x + 2) = 0 ⟹ x = 0, 2, −2.",
  },
];

export const tangentsAndNormalsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-tn-1",
    prompt:
      "Find the equation of the tangent to y = x² at the point where x = 3.",
    latex: "y = x^2",
    answer: "y=6x-9",
    acceptedAnswers: ["6x-9", "y = 6x - 9"],
    hint: "Find the gradient with y'(3), then use the point (3, 9).",
    explanation:
      "y' = 2x = 6 at x = 3; the point is (3, 9). y − 9 = 6(x − 3) ⟹ y = 6x − 9.",
  },
  {
    id: "chal-y12a-tn-2",
    prompt:
      "Find the equation of the normal to y = x² at the point where x = 1.",
    latex: "y = x^2",
    answer: "y=-1/2x+3/2",
    acceptedAnswers: ["y=-0.5x+1.5", "y=(3-x)/2", "y = -x/2 + 3/2"],
    hint: "The normal's gradient is the negative reciprocal of the tangent's gradient.",
    explanation:
      "y' = 2 at x = 1, so the normal gradient is −1/2; the point is (1, 1). y − 1 = −½(x − 1) ⟹ y = −x/2 + 3/2.",
  },
  {
    id: "chal-y12a-tn-3",
    prompt:
      "At what point does the tangent to y = x² − 4x + 5 have gradient 2?",
    latex: "y = x^2 - 4x + 5",
    answer: "(3, 2)",
    acceptedAnswers: ["3, 2", "(3,2)", "x=3, y=2"],
    hint: "Solve y'(x) = 2 for x, then find y.",
    explanation:
      "y' = 2x − 4 = 2 ⟹ x = 3; y = 9 − 12 + 5 = 2. The point is (3, 2).",
  },
];

export const stationaryPointsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-sp-1",
    prompt:
      "Find the x-coordinates of the stationary points of f(x) = 2x³ − 9x² + 12x.",
    latex: "f(x) = 2x^3 - 9x^2 + 12x",
    answer: "1, 2",
    acceptedAnswers: ["2, 1", "1 and 2"],
    hint: "Factor f'(x) and set it to zero.",
    explanation:
      "f'(x) = 6x² − 18x + 12 = 6(x − 1)(x − 2) = 0 ⟹ x = 1, 2.",
  },
  {
    id: "chal-y12a-sp-2",
    prompt: "For f(x) = x³ − 3x² − 9x + 5:",
    latex: "f(x) = x^3 - 3x^2 - 9x + 5",
    answer: "",
    explanation:
      "f'(x) = 3x² − 6x − 9 = 3(x − 3)(x + 1) = 0 ⟹ x = −1, 3. f''(x) = 6x − 6: f''(−1) < 0 (maximum), f''(3) > 0 (minimum).",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "State the x-coordinate of the local maximum.",
        marks: 1,
        answer: "-1",
        explanation: "f''(−1) = −12 < 0, so x = −1 is the local maximum.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "State the x-coordinate of the local minimum.",
        marks: 1,
        answer: "3",
        explanation: "f''(3) = 12 > 0, so x = 3 is the local minimum.",
      },
    ],
  },
  {
    id: "chal-y12a-sp-3",
    prompt: "The curve y = x³ + px² + qx has a stationary point at (2, −4).",
    latex: "y = x^3 + px^2 + qx",
    answer: "",
    explanation:
      "Stationary: y'(2) = 12 + 4p + q = 0. On the curve: y(2) = 8 + 4p + 2q = −4. Solving simultaneously gives p = −3, q = 0.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the value of p.",
        marks: 1,
        answer: "-3",
        explanation: "From 12 + 4p + q = 0 and 8 + 4p + 2q = −4, p = −3.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the value of q.",
        marks: 1,
        answer: "0",
        explanation: "Substituting p = −3 back gives q = 0.",
      },
    ],
  },
];
