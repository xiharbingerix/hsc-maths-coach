import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Integral Calculus" (ma-c4). Mirrors the ma-c2
// rule: use the integral as INFORMATION, not as a computation exercise. Difficulty comes from
// antiderivative structure, signed-area reasoning, accumulation/net-change, and recovering
// functions/parameters from integral conditions — never "evaluate this horrible integral".
// Single-answer, auto-markable, hand-verified. (Existing area-between-curves D6 are separate.)

// → initial-conditions-particular-primitive
export const icReconstructionChallenge: PracticeQuestion[] = [
  {
    // Function reconstruction from f' + a single condition.
    id: "chal-y12a-ic-1",
    prompt:
      "f'(x) = 6x − 4 and f(2) = 5. Find f(0).",
    latex: "f'(x) = 6x - 4,\\quad f(2) = 5",
    answer: "1",
    acceptedAnswers: ["f(0)=1"],
    hint: "Antidifferentiate to get f(x) = 3x² − 4x + C, then use f(2) = 5 to find C.",
    explanation:
      "f(x) = 3x² − 4x + C. f(2) = 12 − 8 + C = 4 + C = 5 ⟹ C = 1. So f(0) = C = 1.",
  },
  {
    // Function reconstruction from f'' through two successive conditions.
    id: "chal-y12a-ic-2",
    prompt:
      "f''(x) = 6, with f'(1) = 2 and f(0) = 4. Find f(1).",
    latex: "f''(x) = 6,\\quad f'(1) = 2,\\quad f(0) = 4",
    answer: "3",
    acceptedAnswers: ["f(1)=3"],
    hint: "Integrate twice. The first constant comes from f'(1) = 2; the second from f(0) = 4.",
    explanation:
      "f'(x) = 6x + C₁; f'(1) = 6 + C₁ = 2 ⟹ C₁ = −4. f(x) = 3x² − 4x + C₂; f(0) = C₂ = 4. So f(1) = 3 − 4 + 4 = 3.",
  },
];

// → signed-area-total-area
export const icSignedAreaChallenge: PracticeQuestion[] = [
  {
    // Signed-area reasoning: net signed area zero ⟹ recover the upper limit.
    id: "chal-y12a-ic-3",
    prompt:
      "∫₀ᵏ (x − 2) dx = 0, where k > 0. Find k.",
    latex: "\\int_0^k (x-2)\\,dx = 0,\\quad k > 0",
    answer: "4",
    acceptedAnswers: ["k=4"],
    hint: "The integral measures signed area. Below the x-axis it is negative; set the total to zero.",
    explanation:
      "∫₀ᵏ(x−2)dx = k²/2 − 2k = 0 ⟹ k(k − 4)/2 = 0 ⟹ k = 4 (k > 0). The area below the axis on (0,2) exactly cancels the area above on (2,4).",
  },
];

// → definite-integrals-fundamental-theorem
export const icParameterChallenge: PracticeQuestion[] = [
  {
    // Parameter inference via an EQUAL-AREAS condition (not single-step substitution).
    id: "chal-y12a-ic-4",
    prompt:
      "Find the value of a > 0 for which the area under y = x² from x = 0 to x = a equals the area under y = 2x over the same interval.",
    latex: "\\int_0^a x^2\\,dx = \\int_0^a 2x\\,dx",
    answer: "3",
    acceptedAnswers: ["a=3"],
    hint: "Write both areas as functions of a, set them equal, and solve (divide through by a²).",
    explanation:
      "∫₀ᵃ x² dx = a³/3 and ∫₀ᵃ 2x dx = a². Setting a³/3 = a² and dividing by a² (a > 0): a/3 = 1 ⟹ a = 3.",
  },
];

// → applications-total-change-motion
export const icAccumulationChallenge: PracticeQuestion[] = [
  {
    // Accumulation / net-change: when does the accumulated change return to zero?
    id: "chal-y12a-ic-5",
    prompt:
      "Water flows into a tank at a rate r(t) = 6 − 2t litres per minute (t ≥ 0). At what time t > 0 does the tank return to its initial volume?",
    latex: "r(t) = 6 - 2t",
    answer: "6",
    acceptedAnswers: ["6 minutes", "t=6", "6 min"],
    hint: "Net change in volume is the integral of the rate. The tank returns to its start when the net change is zero.",
    explanation:
      "Net change = ∫₀ᵀ (6 − 2t) dt = 6T − T² = T(6 − T). This is zero at T = 6. (The rate is positive until t = 3, then negative; the inflow up to t = 3 is exactly undone by t = 6.)",
  },
];

// → mixed-integral-calculus-exam-practice
export const icExamChallenge: PracticeQuestion[] = [
  {
    // Multi-condition reconstruction: a point condition + an area condition.
    id: "chal-y12a-ic-6",
    prompt:
      "f(x) = ax + b passes through (0, 1), and ∫₀² f(x) dx = 6. Find a.",
    latex: "f(x) = ax + b",
    answer: "2",
    acceptedAnswers: ["a=2"],
    hint: "The point fixes b; the area condition then fixes a.",
    explanation:
      "f(0) = b = 1. ∫₀² (ax + 1) dx = [ax²/2 + x]₀² = 2a + 2 = 6 ⟹ 2a = 4 ⟹ a = 2.",
  },
];
