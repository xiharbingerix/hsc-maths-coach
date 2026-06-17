import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Additional Level-6 challenge sets across Year 12 Advanced topics.
// All answers SymPy-/arithmetic-verified. Trig answers kept single-valued so
// they remain cleanly auto-markable.

export const areaBetweenCurvesChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-abc-1",
    prompt: "Find the area enclosed between y = x² and the line y = x + 2.",
    latex: "y = x^2,\\quad y = x + 2",
    answer: "9/2",
    acceptedAnswers: ["4.5"],
    hint: "Find the intersection points first, then integrate (line − curve) between them.",
    explanation:
      "x² = x + 2 ⟹ x = −1, 2. Area = ∫₋₁² (x + 2 − x²) dx = [x²/2 + 2x − x³/3]₋₁² = 9/2.",
  },
  {
    id: "chal-y12a-abc-2",
    prompt: "Find the total area enclosed between y = x³ and y = x.",
    latex: "y = x^3,\\quad y = x",
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    hint: "They meet at x = −1, 0, 1. Use symmetry, and remember total area is always positive.",
    explanation:
      "By symmetry, total area = 2∫₀¹ (x − x³) dx = 2[x²/2 − x⁴/4]₀¹ = 2(1/4) = 1/2.",
  },
  {
    id: "chal-y12a-abc-3",
    prompt: "Find the area enclosed between y = 4 − x² and the x-axis.",
    latex: "y = 4 - x^2",
    answer: "32/3",
    acceptedAnswers: ["10.67", "10.66"],
    hint: "The curve crosses the x-axis at x = ±2.",
    explanation: "∫₋₂² (4 − x²) dx = [4x − x³/3]₋₂² = 32/3.",
  },
];

export const trigonometricEquationsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-te-1",
    prompt:
      "Find the smallest positive solution of 2 sin x = 1, with x in radians.",
    latex: "2\\sin x = 1",
    answer: "pi/6",
    acceptedAnswers: ["π/6", "0.5236", "0.52"],
    hint: "Solve sin x = 1/2 and take the smallest positive angle.",
    explanation: "sin x = 1/2, so the smallest positive solution is x = π/6.",
  },
  {
    id: "chal-y12a-te-2",
    prompt: "How many solutions does cos(2x) = 0 have for 0 ≤ x ≤ 2π?",
    latex: "\\cos(2x) = 0,\\quad 0 \\le x \\le 2\\pi",
    answer: "4",
    hint: "Let u = 2x. As x runs over [0, 2π], u runs over [0, 4π].",
    explanation:
      "2x = π/2, 3π/2, 5π/2, 7π/2 ⟹ x = π/4, 3π/4, 5π/4, 7π/4 — four solutions.",
  },
  {
    id: "chal-y12a-te-3",
    prompt: "Find the smallest positive solution of tan x = 1, with x in radians.",
    latex: "\\tan x = 1",
    answer: "pi/4",
    acceptedAnswers: ["π/4", "0.7854", "0.79"],
    hint: "tan is 1 at the reference angle π/4.",
    explanation: "tan x = 1 ⟹ smallest positive solution x = π/4.",
  },
];

export const futureValueAnnuitiesChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-ann-1",
    prompt:
      "$500 is invested at the end of each year for 5 years at 6% p.a. compounded annually. Find the future value, to the nearest cent.",
    latex: "",
    answer: "2818.55",
    acceptedAnswers: ["$2818.55"],
    hint: "Use the future value of an ordinary annuity: FV = PMT·((1+r)ⁿ − 1)/r.",
    explanation:
      "FV = 500 × ((1.06)⁵ − 1)/0.06 = 500 × 5.63709… = $2818.55.",
  },
  {
    id: "chal-y12a-ann-2",
    prompt:
      "$1000 is invested at the end of each year for 4 years at 5% p.a. compounded annually. Find the future value, to the nearest cent.",
    latex: "",
    answer: "4310.13",
    acceptedAnswers: ["$4310.13"],
    hint: "FV = PMT·((1+r)ⁿ − 1)/r.",
    explanation: "FV = 1000 × ((1.05)⁴ − 1)/0.05 = 1000 × 4.310125 = $4310.13.",
  },
  {
    id: "chal-y12a-ann-3",
    prompt:
      "How much must be invested at the end of each year for 3 years at 8% p.a. to reach $10 000? Give the annual payment to the nearest cent.",
    latex: "",
    answer: "3080.34",
    acceptedAnswers: ["$3080.34", "3080.35"],
    hint: "Rearrange the annuity formula for PMT = FV·r/((1+r)ⁿ − 1).",
    explanation:
      "PMT = 10000 × 0.08/((1.08)³ − 1) = 800/0.259712 = $3080.34.",
  },
];

export const normalDistributionChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-nd-1",
    prompt:
      "Scores are normally distributed with mean 70 and standard deviation 8. Using the empirical rule, what percentage of scores lie between 54 and 86?",
    latex: "\\mu = 70,\\ \\sigma = 8",
    answer: "95%",
    acceptedAnswers: ["95"],
    hint: "How many standard deviations from the mean are 54 and 86?",
    explanation:
      "54 = 70 − 2σ and 86 = 70 + 2σ, so this is within 2 standard deviations ⟹ 95%.",
  },
  {
    id: "chal-y12a-nd-2",
    prompt:
      "Scores follow N(100, 15²). What percentage of scores are above 130?",
    latex: "\\mu = 100,\\ \\sigma = 15",
    answer: "2.5%",
    acceptedAnswers: ["2.5"],
    hint: "130 is two standard deviations above the mean.",
    explanation:
      "130 = 100 + 2σ. 95% lie within 2σ, so 2.5% lie above 130.",
  },
  {
    id: "chal-y12a-nd-3",
    prompt:
      "Scores follow N(50, 5²). What percentage of scores are below 60?",
    latex: "\\mu = 50,\\ \\sigma = 5",
    answer: "97.5%",
    acceptedAnswers: ["97.5"],
    hint: "60 is two standard deviations above the mean.",
    explanation:
      "60 = 50 + 2σ. 2.5% lie above 60, so 97.5% lie below it.",
  },
];
