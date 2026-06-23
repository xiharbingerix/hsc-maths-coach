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
  {
    // D6 reverse + perpendicularity: two tangents from a point on the y-axis are
    // perpendicular ⟹ find c (this point is the directrix of y = x²).
    id: "chal-y12a-tn-4",
    prompt:
      "Two tangents to the parabola y = x² are drawn from the point (0, c). Find the value of c for which the two tangents are perpendicular.",
    latex: "y = x^2",
    answer: "-1/4",
    acceptedAnswers: ["-0.25", "−1/4", "c=-1/4"],
    hint: "A tangent at (a, a²) is y = 2ax − a². Make it pass through (0, c) to relate the two contact points, then impose m₁m₂ = −1.",
    explanation:
      "The tangent at (a, a²) is y = 2ax − a². Through (0, c): c = −a², so the two contact points are a = ±√(−c) with gradients ±2√(−c). Their product is (2√(−c))(−2√(−c)) = 4c. Perpendicular ⟹ 4c = −1 ⟹ c = −1/4.",
  },
  {
    // D6 geometry/intersection: a tangent meets a cubic again; the contact point
    // is a DOUBLE root, so factor it out to find the third intersection.
    id: "chal-y12a-tn-5",
    prompt:
      "The tangent to y = x³ − 3x at the point (2, 2) meets the curve again at a second point. Find the x-coordinate of that point.",
    latex: "y = x^3 - 3x",
    answer: "-4",
    acceptedAnswers: ["x=-4", "−4"],
    hint: "Find the tangent, set it equal to the curve, and remember x = 2 is a repeated (double) root of the resulting cubic.",
    explanation:
      "At (2, 2): y' = 3x² − 3 = 9, so the tangent is y = 9x − 16. Then x³ − 3x = 9x − 16 ⟹ x³ − 12x + 16 = 0 = (x − 2)²(x + 4). The double root x = 2 is the contact point; the curve is met again at x = −4.",
  },
  {
    // D6 reverse: find c so a line is tangent to a cubic (equal value AND gradient).
    id: "chal-y12a-tn-6",
    prompt:
      "The line y = 3x + c is a tangent to the curve y = x³. Find the positive value of c.",
    latex: "y = x^3",
    answer: "2",
    acceptedAnswers: ["c=2"],
    hint: "At the point of tangency the gradients are equal (3x² = 3) AND the y-values are equal. Solve both, then take the positive c.",
    explanation:
      "Equal gradients: 3x² = 3 ⟹ x = ±1. Equal values: c = x³ − 3x. At x = 1, c = 1 − 3 = −2; at x = −1, c = −1 + 3 = 2. The positive value is c = 2 (the line y = 3x + 2 touches y = x³ at (−1, −2)).",
  },
  {
    // D6 geometry/intersection: a normal meets the parabola again (double-root factor).
    id: "chal-y12a-tn-7",
    prompt:
      "The normal to y = x² at the point (2, 4) meets the parabola again at another point. Find the x-coordinate of that point.",
    latex: "y = x^2",
    answer: "-9/4",
    acceptedAnswers: ["-2.25", "x=-9/4", "−9/4"],
    hint: "Find the normal line, set it equal to x², and solve; one root is x = 2.",
    explanation:
      "Normal at (2, 4): gradient −1/4, so y = −¼x + 9/2. Setting x² = −¼x + 9/2 gives 4x² + x − 18 = 0 = (4x + 9)(x − 2), so the parabola is met again at x = −9/4.",
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
  {
    // D6 synoptic: roots of y' (sum/product) + second-derivative classification.
    id: "chal-y12a-sp-4",
    prompt:
      "The curve y = x³ + ax² + bx + 5 has stationary points at x = −1 and x = 3.",
    latex: "y = x^3 + ax^2 + bx + 5",
    answer: "-3",
    explanation:
      "y' = 3x² + 2ax + b has roots −1 and 3. Sum of roots: −1 + 3 = 2 = −(2a)/3 ⟹ a = −3. Product of roots: (−1)(3) = −3 = b/3 ⟹ b = −9. Then y'' = 6x + 2a = 6x − 6, and y''(3) = 12 > 0, so x = 3 is a minimum.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the value of a.",
        marks: 1,
        answer: "-3",
        explanation:
          "The sum of the roots of y' is −1 + 3 = 2 = −(2a)/3, so a = −3.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the value of b.",
        marks: 1,
        answer: "-9",
        explanation:
          "The product of the roots of y' is (−1)(3) = −3 = b/3, so b = −9.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Classify the stationary point at x = 3 as a maximum or minimum.",
        marks: 1,
        answer: "minimum",
        acceptedAnswers: ["min", "local minimum", "local min"],
        explanation:
          "y'' = 6x − 6, and y''(3) = 12 > 0, so the curve is concave up there: x = 3 is a local minimum.",
      },
    ],
  },
  {
    // D6 synoptic: minimise squared distance from a point to a parabola.
    id: "chal-y12a-sp-5",
    prompt:
      "Find the square of the shortest distance from the point (0, 3) to the parabola y = x².",
    latex: "y = x^2",
    answer: "2.75",
    acceptedAnswers: ["11/4", "2.75 units"],
    hint: "Minimise the squared distance D = x² + (y − 3)² with y = x²; solve D'(x) = 0.",
    explanation:
      "Squared distance: D(x) = x² + (x² − 3)². D'(x) = 2x + 2(x² − 3)(2x) = 4x³ − 10x = 2x(2x² − 5). Stationary at x = 0 or x² = 5/2. At x² = 5/2: D = 5/2 + (5/2 − 3)² = 5/2 + 1/4 = 11/4 = 2.75. (x = 0 gives D = 9, larger.) The shortest squared distance is 2.75.",
  },
  {
    // D6 synoptic: stationary points + turning-point values + horizontal-line cuts.
    id: "chal-y12a-sp-6",
    prompt: "Consider the curve y = x³ − 6x² + 9x + 1.",
    latex: "y = x^3 - 6x^2 + 9x + 1",
    answer: "1, 3",
    explanation:
      "y' = 3x² − 12x + 9 = 3(x − 1)(x − 3), so stationary points are at x = 1 and x = 3. y(1) = 5 (local max) and y(3) = 1 (local min). A horizontal line y = k meets the curve at three distinct points exactly when k lies strictly between the min and max values: 1 < k < 5.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the two x-values of the stationary points.",
        marks: 1,
        answer: "1, 3",
        acceptedAnswers: ["1 and 3", "3, 1", "x=1, x=3"],
        explanation:
          "y' = 3x² − 12x + 9 = 3(x − 1)(x − 3) = 0 gives x = 1 and x = 3.",
      },
      {
        key: "b",
        label: "(b)",
        prompt:
          "Find the local maximum y-value minus the local minimum y-value.",
        marks: 2,
        answer: "4",
        explanation:
          "y(1) = 1 − 6 + 9 + 1 = 5 (local max); y(3) = 27 − 54 + 27 + 1 = 1 (local min). Difference = 5 − 1 = 4.",
      },
      {
        key: "c",
        label: "(c)",
        prompt:
          "For which values of k does the line y = k cross the curve at exactly three distinct points? Give an inequality.",
        marks: 2,
        answer: "1<k<5",
        acceptedAnswers: ["1 < k < 5"],
        explanation:
          "Three distinct intersections occur when k is strictly between the turning-point values: 1 < k < 5.",
      },
    ],
  },
  {
    // D6 synoptic: build the volume model, differentiate (product rule), reject root.
    id: "chal-y12a-sp-7",
    prompt:
      "An open box is made from a square sheet of side 12 cm by cutting equal squares of side x cm from each corner and folding up the sides. Find the value of x (cm) that maximises the volume.",
    latex: "V = x(12 - 2x)^2",
    answer: "2",
    acceptedAnswers: ["2 cm", "x=2"],
    hint: "Form V = x(12 − 2x)², find dV/dx, set it to 0, and reject the root that gives zero volume.",
    explanation:
      "V = x(12 − 2x)². dV/dx = (12 − 2x)² + x·2(12 − 2x)(−2) = (12 − 2x)(12 − 6x). Setting dV/dx = 0 gives x = 6 (which makes V = 0, rejected) or x = 2. Since 0 < x < 6, the volume is maximised at x = 2.",
  },
];
