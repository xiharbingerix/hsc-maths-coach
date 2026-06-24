import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 1 "Inverse Trigonometric Functions" — the
// inverse-trig exemplar. Difficulty is carried by principal-value range reasoning (a
// composition is NOT the inner angle), domain reconstruction, identity-driven composite
// evaluation, parameter recovery from a stated range, parameter constraints from principal
// ranges, and identity-converted equation solving — NOT by evaluating an inverse-trig
// function. Single-answer, auto-markable, hand-verified. Registered per lesson slug, ≤2 each.

// → inverse-sine-cosine
export const itPrincipalChallenge: PracticeQuestion[] = [
  {
    // Principal-value composition: arcsin(sin θ) ≠ θ when θ is outside [−π/2, π/2].
    id: "chal-y12e1-it-1",
    prompt:
      "Find the exact value of arcsin(sin(5π/6)).",
    latex: "\\arcsin\\!\\left(\\sin\\tfrac{5\\pi}{6}\\right)",
    answer: "pi/6",
    acceptedAnswers: ["\\pi/6", "π/6"],
    hint: "sin(5π/6) = 1/2, but arcsin returns the principal angle in [−π/2, π/2] — not 5π/6.",
    explanation:
      "sin(5π/6) = sin(π − 5π/6) = sin(π/6) = 1/2. Since arcsin returns a value in [−π/2, π/2], arcsin(1/2) = π/6 (not 5π/6, which lies outside the range).",
  },
  {
    // Validity/parameter constraint: a parameter forces the inverse-trig output within range.
    id: "chal-y12e1-it-5",
    prompt:
      "The equation arcsin(x) = 2k − π has a real solution for x. Find the set of values of k for which this is possible, and give the length of that interval.",
    latex: "\\arcsin(x) = 2k - \\pi",
    answer: "pi/2",
    acceptedAnswers: ["\\pi/2", "π/2"],
    hint: "arcsin(x) can only take values in [−π/2, π/2]; require 2k − π to lie in that interval.",
    explanation:
      "A solution needs 2k − π ∈ [−π/2, π/2]. Adding π: π/2 ≤ 2k ≤ 3π/2, so π/4 ≤ k ≤ 3π/4. The interval length is 3π/4 − π/4 = π/2.",
  },
];

// → inverse-tangent
export const itTangentChallenge: PracticeQuestion[] = [
  {
    // Inverse-composition + identity interaction: both inverse angles reduce to the same α.
    id: "chal-y12e1-it-3",
    prompt:
      "Find the exact value of sin(arctan(3/4) + arccos(4/5)).",
    latex: "\\sin\\!\\left(\\arctan\\tfrac{3}{4} + \\arccos\\tfrac{4}{5}\\right)",
    answer: "24/25",
    acceptedAnswers: ["0.96"],
    hint: "Show both angles have sin = 3/5 and cos = 4/5, so they are equal; then use sin(2α).",
    explanation:
      "arctan(3/4) = α with sin α = 3/5, cos α = 4/5. arccos(4/5) = β with cos β = 4/5, sin β = 3/5, so β = α. Then sin(α + β) = sin(2α) = 2 sin α cos α = 2(3/5)(4/5) = 24/25.",
  },
];

// → differentiating-inverse-trig
export const itDifferentiatingChallenge: PracticeQuestion[] = [
  {
    // Domain reconstruction: the inner expression must lie in [−1, 1] for arcsin to be defined.
    id: "chal-y12e1-it-2",
    prompt:
      "The function f(x) = arcsin(2x − 1) is defined on an interval. Find the length of that interval (its domain).",
    latex: "f(x) = \\arcsin(2x - 1)",
    answer: "1",
    acceptedAnswers: [],
    hint: "arcsin is defined only when its input lies in [−1, 1]; solve −1 ≤ 2x − 1 ≤ 1.",
    explanation:
      "Require −1 ≤ 2x − 1 ≤ 1 ⟹ 0 ≤ 2x ≤ 2 ⟹ 0 ≤ x ≤ 1. The domain is [0, 1], of length 1.",
  },
];

// → inverse-trig-properties
export const itPropertiesChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from a stated range.
    id: "chal-y12e1-it-4",
    prompt:
      "The curve y = a·arcsin(x), with a > 0, has range [−π, π]. Find a.",
    latex: "y = a\\,\\arcsin(x),\\ \\text{range } [-\\pi, \\pi]",
    answer: "2",
    acceptedAnswers: ["a=2"],
    hint: "arcsin has range [−π/2, π/2]; multiplying by a scales it to [−aπ/2, aπ/2].",
    explanation:
      "arcsin(x) ∈ [−π/2, π/2], so a·arcsin(x) ∈ [−aπ/2, aπ/2]. Setting aπ/2 = π gives a = 2.",
  },
  {
    // Equation/constraint structure: use the identity to convert, then solve.
    id: "chal-y12e1-it-6",
    prompt:
      "Find the value of x in [−1, 1] for which arcsin(x) = arccos(x).",
    latex: "\\arcsin(x) = \\arccos(x)",
    answer: "√2/2",
    acceptedAnswers: ["sqrt(2)/2", "1/sqrt(2)", "0.707", "\\frac{\\sqrt{2}}{2}"],
    hint: "Use arcsin x + arccos x = π/2 to replace arccos x, then solve for arcsin x.",
    explanation:
      "Since arcsin x + arccos x = π/2, setting arcsin x = arccos x gives 2 arcsin x = π/2, so arcsin x = π/4 and x = sin(π/4) = √2/2.",
  },
];
