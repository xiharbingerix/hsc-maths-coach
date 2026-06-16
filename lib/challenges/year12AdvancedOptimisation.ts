import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge set for the Year 12 Advanced "optimisation" lesson.
// Synoptic D6 items (modelling + calculus). Every answer SymPy-verified.
export const year12AdvancedOptimisationChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-opt-1",
    prompt:
      "A closed cylinder has a volume of 1000 cm³. Find the radius, to 2 decimal places, that minimises its total surface area.",
    latex: "V = 1000,\\quad S = 2\\pi r^2 + \\dfrac{2000}{r}",
    answer: "5.42",
    acceptedAnswers: ["5.4", "5.42 cm", "(500/pi)^(1/3)"],
    hint: "Use V = πr²h = 1000 to write h in terms of r, substitute into the surface area, then set S'(r) = 0.",
    explanation:
      "V = πr²h = 1000 gives h = 1000/(πr²). Then S = 2πr² + 2πrh = 2πr² + 2000/r. S'(r) = 4πr − 2000/r² = 0 ⟹ r³ = 500/π ⟹ r ≈ 5.42 cm (and S''(r) > 0, so it is a minimum).",
  },
  {
    id: "chal-y12a-opt-2",
    prompt:
      "A rectangle has its base on the x-axis and its two upper corners on the parabola y = 12 − x². Find the maximum possible area of the rectangle.",
    latex: "y = 12 - x^2",
    answer: "32",
    acceptedAnswers: ["32 units^2", "32 square units"],
    hint: "If a corner is at x, the rectangle has width 2x and height 12 − x². Maximise A(x) = 2x(12 − x²).",
    explanation:
      "A = 2x(12 − x²) = 24x − 2x³. A'(x) = 24 − 6x² = 0 ⟹ x = 2 (taking x > 0). Area = 2(2)(12 − 4) = 32 square units.",
  },
  {
    id: "chal-y12a-opt-3",
    prompt:
      "An open box is made from a 16 cm × 10 cm rectangular sheet by cutting a square of side x from each corner and folding up the sides. Find the maximum volume, in cm³.",
    latex: "V = x(16 - 2x)(10 - 2x)",
    answer: "144",
    acceptedAnswers: ["144 cm^3", "144 cm³"],
    hint: "Expand V(x), differentiate, solve V'(x) = 0, and reject any x outside 0 < x < 5.",
    explanation:
      "V = 160x − 52x² + 4x³. V'(x) = 160 − 104x + 12x² = 0 ⟹ 3x² − 26x + 40 = 0 ⟹ x = 2 (x = 20/3 is rejected as it exceeds 5). V(2) = 2(12)(6) = 144 cm³.",
  },
];
