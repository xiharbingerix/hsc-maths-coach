import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Inverse Trigonometric Functions.
 *
 * D4/D5 only, auto-markable, per docs/QUESTION_AUTHORING_STANDARD.md. Answers
 * are kept rational/numeric (composite expressions, double/compound angles,
 * solving, domain/range) rather than raw angle values, so string/CAS marking is
 * robust. Authored one subtopic / one band at a time, audited after each batch.
 *
 * Status: subtopic 1 "Inverse Sine and Cosine" — D4 batch (10). Remaining bands
 * and subtopics 2–4 to follow. Not yet registered in index.ts.
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/inverse-trig/${lesson}`;

// ── Subtopic 1: Inverse Sine and Cosine ──────────────────────────────────────
// D4: the key decision is the SIGN of the second ratio (arccos ranges over
// [0, π] ⇒ sine ≥ 0; arcsin over [−π/2, π/2] ⇒ cosine ≥ 0), then a triangle /
// identity / inversion step.
const sineCosineD4: TopicTestQuestion[] = [
  {
    id: "y12e1-itrig-sc-d4-1",
    prompt: "Find the exact value of sin(cos⁻¹(3/5)).",
    latex: "\\sin\\left(\\cos^{-1}\\tfrac{3}{5}\\right)",
    marks: 2,
    difficulty: 4,
    answer: "4/5",
    acceptedAnswers: ["0.8"],
    explanation:
      "Let θ = cos⁻¹(3/5), so cos θ = 3/5 with θ ∈ [0, π], where sin θ ≥ 0. sin θ = √(1 − 9/25) = 4/5.",
  },
  {
    id: "y12e1-itrig-sc-d4-2",
    prompt: "Find the exact value of cos(sin⁻¹(−5/13)).",
    latex: "\\cos\\left(\\sin^{-1}\\left(-\\tfrac{5}{13}\\right)\\right)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{12}{13}$" },
      { label: "B", text: "$-\\dfrac{12}{13}$" },
      { label: "C", text: "$\\dfrac{5}{13}$" },
      { label: "D", text: "$-\\dfrac{5}{13}$" },
    ],
    answer: "A",
    explanation:
      "sin⁻¹(−5/13) lies in [−π/2, 0], where cosine is positive. cos = √(1 − 25/169) = 12/13. B uses the wrong sign — cosine is never negative on the range of sin⁻¹.",
  },
  {
    id: "y12e1-itrig-sc-d4-3",
    prompt: "Find the exact value of sin(2 sin⁻¹(3/5)).",
    latex: "\\sin\\left(2\\sin^{-1}\\tfrac{3}{5}\\right)",
    marks: 3,
    difficulty: 4,
    answer: "24/25",
    acceptedAnswers: ["0.96"],
    explanation:
      "Let θ = sin⁻¹(3/5): sin θ = 3/5, cos θ = 4/5. sin 2θ = 2 sin θ cos θ = 2 × (3/5)(4/5) = 24/25.",
  },
  {
    id: "y12e1-itrig-sc-d4-4",
    prompt: "Find the exact value of cos(2 cos⁻¹(1/3)).",
    latex: "\\cos\\left(2\\cos^{-1}\\tfrac{1}{3}\\right)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$-\\dfrac{7}{9}$" },
      { label: "B", text: "$\\dfrac{7}{9}$" },
      { label: "C", text: "$\\dfrac{2}{3}$" },
      { label: "D", text: "$-\\dfrac{1}{3}$" },
    ],
    answer: "A",
    explanation:
      "With θ = cos⁻¹(1/3), cos 2θ = 2cos²θ − 1 = 2(1/9) − 1 = −7/9. C is 2cos θ (wrong identity); B drops the sign.",
  },
  {
    id: "y12e1-itrig-sc-d4-5",
    prompt: "Find the exact value of tan(cos⁻¹(3/5)).",
    latex: "\\tan\\left(\\cos^{-1}\\tfrac{3}{5}\\right)",
    marks: 2,
    difficulty: 4,
    answer: "4/3",
    explanation:
      "θ = cos⁻¹(3/5): cos θ = 3/5, sin θ = 4/5 (θ ∈ [0, π]). tan θ = sin θ / cos θ = (4/5)/(3/5) = 4/3.",
  },
  {
    id: "y12e1-itrig-sc-d4-6",
    prompt: "Find the exact value of sin(sin⁻¹(3/5) + cos⁻¹(3/5)).",
    latex: "\\sin\\left(\\sin^{-1}\\tfrac{3}{5} + \\cos^{-1}\\tfrac{3}{5}\\right)",
    marks: 3,
    difficulty: 4,
    answer: "1",
    explanation:
      "For any x, sin⁻¹x + cos⁻¹x = π/2, so the expression is sin(π/2) = 1. (Or expand: (3/5)(3/5) + (4/5)(4/5) = 1.)",
  },
  {
    id: "y12e1-itrig-sc-d4-7",
    prompt: "Solve sin⁻¹(x) + sin⁻¹(2x) = π/2 for x, where x > 0.",
    latex: "\\sin^{-1}(x) + \\sin^{-1}(2x) = \\tfrac{\\pi}{2}",
    marks: 3,
    difficulty: 4,
    answer: "sqrt(5)/5",
    acceptedAnswers: ["1/sqrt(5)", "1/√5", "√5/5", "0.447", "0.4472"],
    explanation:
      "Since sin⁻¹x + cos⁻¹x = π/2, the equation says sin⁻¹(2x) = π/2 − sin⁻¹(x) = cos⁻¹(x). Taking sine: 2x = sin(cos⁻¹x) = √(1 − x²). Then 4x² = 1 − x², so 5x² = 1 and x = 1/√5 = √5/5 (x > 0).",
  },
  {
    id: "y12e1-itrig-sc-d4-8",
    prompt: "Solve cos⁻¹(x) − sin⁻¹(x) = π/6 for x.",
    latex: "\\cos^{-1}(x) - \\sin^{-1}(x) = \\tfrac{\\pi}{6}",
    marks: 3,
    difficulty: 4,
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    explanation:
      "Use cos⁻¹x = π/2 − sin⁻¹x: (π/2 − sin⁻¹x) − sin⁻¹x = π/6, so π/2 − 2sin⁻¹x = π/6, giving sin⁻¹x = π/6 and x = sin(π/6) = 1/2.",
  },
  {
    id: "y12e1-itrig-sc-d4-9",
    prompt:
      "The function f(x) = cos⁻¹((x − 1)/2) is defined for a ≤ x ≤ b. Find b.",
    latex: "f(x) = \\cos^{-1}\\left(\\tfrac{x - 1}{2}\\right)",
    marks: 3,
    difficulty: 4,
    answer: "3",
    explanation:
      "cos⁻¹ requires −1 ≤ (x − 1)/2 ≤ 1, i.e. −2 ≤ x − 1 ≤ 2, so −1 ≤ x ≤ 3. The largest value is b = 3.",
  },
  {
    id: "y12e1-itrig-sc-d4-10",
    prompt: "Find the exact value of cos(sin⁻¹(3/5) − sin⁻¹(5/13)).",
    latex: "\\cos\\left(\\sin^{-1}\\tfrac{3}{5} - \\sin^{-1}\\tfrac{5}{13}\\right)",
    marks: 3,
    difficulty: 4,
    answer: "63/65",
    explanation:
      "Let α = sin⁻¹(3/5) (sin 3/5, cos 4/5) and β = sin⁻¹(5/13) (sin 5/13, cos 12/13). cos(α − β) = cos α cos β + sin α sin β = (4/5)(12/13) + (3/5)(5/13) = 48/65 + 15/65 = 63/65.",
  },
];

// D5: generalisation (express a composite as a function of x), solving with the
// complementary identity, and constant-/odd-function insight. Symbolic answers
// are fine — the CAS tier confirms equivalence (see QUESTION_AUTHORING_STANDARD).
const sineCosineD5: TopicTestQuestion[] = [
  {
    id: "y12e1-itrig-sc-d5-1",
    prompt: "Express cos(2 sin⁻¹ x) as a polynomial in x.",
    latex: "\\cos\\left(2\\sin^{-1} x\\right)",
    marks: 3,
    difficulty: 5,
    answer: "1-2x^2",
    acceptedAnswers: ["1 - 2x^2", "1-2x²", "-2x^2+1", "1-2*x^2"],
    explanation:
      "Let θ = sin⁻¹x, so sin θ = x. cos 2θ = 1 − 2sin²θ = 1 − 2x².",
  },
  {
    id: "y12e1-itrig-sc-d5-2",
    prompt: "Express sin(2 cos⁻¹ x) in terms of x.",
    latex: "\\sin\\left(2\\cos^{-1} x\\right)",
    marks: 3,
    difficulty: 5,
    answer: "2x*sqrt(1-x^2)",
    acceptedAnswers: ["2x sqrt(1-x^2)", "2x√(1-x^2)", "2x(1-x^2)^(1/2)", "2*x*sqrt(1-x^2)"],
    explanation:
      "Let θ = cos⁻¹x (θ ∈ [0, π]): cos θ = x, sin θ = √(1 − x²) ≥ 0. sin 2θ = 2 sin θ cos θ = 2x√(1 − x²).",
  },
  {
    id: "y12e1-itrig-sc-d5-3",
    prompt: "Express tan(sin⁻¹ x) in terms of x.",
    latex: "\\tan\\left(\\sin^{-1} x\\right)",
    marks: 3,
    difficulty: 5,
    answer: "x/sqrt(1-x^2)",
    acceptedAnswers: ["x/√(1-x^2)", "x/(1-x^2)^(1/2)", "x*(1-x^2)^(-1/2)"],
    explanation:
      "Let θ = sin⁻¹x (θ ∈ [−π/2, π/2]): sin θ = x, cos θ = √(1 − x²) ≥ 0. tan θ = sin θ / cos θ = x / √(1 − x²).",
  },
  {
    id: "y12e1-itrig-sc-d5-4",
    prompt: "Solve cos⁻¹(x) = 2 sin⁻¹(x) for x.",
    latex: "\\cos^{-1}(x) = 2\\sin^{-1}(x)",
    marks: 3,
    difficulty: 5,
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    explanation:
      "Write cos⁻¹x = π/2 − sin⁻¹x. Then π/2 − sin⁻¹x = 2 sin⁻¹x, so 3 sin⁻¹x = π/2, giving sin⁻¹x = π/6 and x = 1/2.",
  },
  {
    id: "y12e1-itrig-sc-d5-5",
    prompt: "Solve 4 sin⁻¹(x) = π for x.",
    latex: "4\\sin^{-1}(x) = \\pi",
    marks: 3,
    difficulty: 5,
    answer: "sqrt(2)/2",
    acceptedAnswers: ["1/sqrt(2)", "√2/2", "1/√2", "0.7071", "0.707"],
    explanation:
      "sin⁻¹x = π/4, so x = sin(π/4) = √2/2.",
  },
  {
    id: "y12e1-itrig-sc-d5-6",
    prompt: "Find the exact value of sin⁻¹(3/5) + sin⁻¹(4/5).",
    latex: "\\sin^{-1}\\tfrac{3}{5} + \\sin^{-1}\\tfrac{4}{5}",
    marks: 4,
    difficulty: 5,
    answer: "pi/2",
    acceptedAnswers: ["π/2", "1.5708", "1.571"],
    explanation:
      "Let α = sin⁻¹(3/5), β = sin⁻¹(4/5). sin(α + β) = (3/5)(3/5) + (4/5)(4/5) = 1, and both angles are acute, so α + β = π/2.",
  },
  {
    id: "y12e1-itrig-sc-d5-7",
    prompt:
      "For the function g(x) = 2 sin⁻¹(x) + 2 cos⁻¹(x), find the exact value of g(0.4).",
    latex: "g(x) = 2\\sin^{-1}(x) + 2\\cos^{-1}(x)",
    marks: 3,
    difficulty: 5,
    answer: "pi",
    acceptedAnswers: ["π", "3.1416", "3.142"],
    explanation:
      "Since sin⁻¹x + cos⁻¹x = π/2 for all x ∈ [−1, 1], g(x) = 2(π/2) = π — a constant, so g(0.4) = π.",
  },
  {
    id: "y12e1-itrig-sc-d5-8",
    prompt: "Find the exact value of cos(sin⁻¹(3/5) + cos⁻¹(1/2)).",
    latex: "\\cos\\left(\\sin^{-1}\\tfrac{3}{5} + \\cos^{-1}\\tfrac{1}{2}\\right)",
    marks: 4,
    difficulty: 5,
    answer: "(4-3sqrt(3))/10",
    acceptedAnswers: ["(4-3√3)/10", "(4 - 3sqrt(3))/10", "2/5 - 3sqrt(3)/10", "-0.1196", "-0.12"],
    explanation:
      "cos⁻¹(1/2) = π/3. With α = sin⁻¹(3/5) (cos α = 4/5): cos(α + π/3) = cos α·½ − sin α·(√3/2) = (4/5)(1/2) − (3/5)(√3/2) = (4 − 3√3)/10.",
  },
  {
    id: "y12e1-itrig-sc-d5-9",
    prompt: "Solve cos⁻¹(x) = sin⁻¹(3x) for x, where x > 0.",
    latex: "\\cos^{-1}(x) = \\sin^{-1}(3x)",
    marks: 4,
    difficulty: 5,
    answer: "sqrt(10)/10",
    acceptedAnswers: ["1/sqrt(10)", "√10/10", "1/√10", "0.3162", "0.316"],
    explanation:
      "Take cosine of both sides: x = cos(sin⁻¹(3x)) = √(1 − 9x²). Then x² = 1 − 9x², so 10x² = 1 and x = 1/√10 = √10/10 (x > 0).",
  },
  {
    id: "y12e1-itrig-sc-d5-10",
    prompt:
      "For the function h(x) = sin⁻¹(x) + sin⁻¹(−x), find the value of h(0.6).",
    latex: "h(x) = \\sin^{-1}(x) + \\sin^{-1}(-x)",
    marks: 3,
    difficulty: 5,
    answer: "0",
    explanation:
      "sin⁻¹ is an odd function, so sin⁻¹(−x) = −sin⁻¹(x) and h(x) = 0 for all x ∈ [−1, 1]. Hence h(0.6) = 0.",
  },
];

// ── Subtopic 2: Inverse Tangent ──────────────────────────────────────────────
// D4: composites via a right triangle (sign from the range (−π/2, π/2) where
// cosine is positive), the tan double-angle / addition formulas, arctan sums to
// standard angles, the complementary identity, and principal-value reasoning.
const inverseTangentD4: TopicTestQuestion[] = [
  {
    id: "y12e1-itrig-tan-d4-1",
    prompt: "Find the exact value of sin(tan⁻¹(3/4)).",
    latex: "\\sin\\left(\\tan^{-1}\\tfrac{3}{4}\\right)",
    marks: 2,
    difficulty: 4,
    answer: "3/5",
    acceptedAnswers: ["0.6"],
    explanation:
      "tan θ = 3/4 gives a 3–4–5 triangle (θ ∈ (−π/2, π/2), here acute), so sin θ = 3/5.",
  },
  {
    id: "y12e1-itrig-tan-d4-2",
    prompt: "Find the exact value of cos(tan⁻¹(−5/12)).",
    latex: "\\cos\\left(\\tan^{-1}\\left(-\\tfrac{5}{12}\\right)\\right)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{12}{13}$" },
      { label: "B", text: "$-\\dfrac{12}{13}$" },
      { label: "C", text: "$\\dfrac{5}{13}$" },
      { label: "D", text: "$-\\dfrac{5}{13}$" },
    ],
    answer: "A",
    explanation:
      "tan⁻¹(−5/12) lies in (−π/2, 0), where cosine is positive. With a 5–12–13 triangle, cos = 12/13. B uses the wrong sign — cosine is positive across the whole range of tan⁻¹.",
  },
  {
    id: "y12e1-itrig-tan-d4-3",
    prompt: "Find the exact value of tan(2 tan⁻¹(1/3)).",
    latex: "\\tan\\left(2\\tan^{-1}\\tfrac{1}{3}\\right)",
    marks: 3,
    difficulty: 4,
    answer: "3/4",
    acceptedAnswers: ["0.75"],
    explanation:
      "With t = tan θ = 1/3, tan 2θ = 2t/(1 − t²) = (2/3)/(1 − 1/9) = (2/3)/(8/9) = 3/4.",
  },
  {
    id: "y12e1-itrig-tan-d4-4",
    prompt: "Find the exact value of tan⁻¹(1/2) + tan⁻¹(1/3).",
    latex: "\\tan^{-1}\\tfrac{1}{2} + \\tan^{-1}\\tfrac{1}{3}",
    marks: 3,
    difficulty: 4,
    answer: "pi/4",
    acceptedAnswers: ["π/4", "0.7854", "0.785"],
    explanation:
      "tan of the sum = (1/2 + 1/3)/(1 − (1/2)(1/3)) = (5/6)/(5/6) = 1, and the sum is acute, so it equals π/4.",
  },
  {
    id: "y12e1-itrig-tan-d4-5",
    prompt: "Find the exact value of tan⁻¹(√3) − tan⁻¹(1/√3).",
    latex: "\\tan^{-1}\\left(\\sqrt{3}\\right) - \\tan^{-1}\\left(\\tfrac{1}{\\sqrt{3}}\\right)",
    marks: 2,
    difficulty: 4,
    answer: "pi/6",
    acceptedAnswers: ["π/6", "0.5236", "0.524"],
    explanation: "tan⁻¹(√3) = π/3 and tan⁻¹(1/√3) = π/6, so the difference is π/3 − π/6 = π/6.",
  },
  {
    id: "y12e1-itrig-tan-d4-6",
    prompt: "Solve tan⁻¹(x) + tan⁻¹(2) = π/2 for x.",
    latex: "\\tan^{-1}(x) + \\tan^{-1}(2) = \\tfrac{\\pi}{2}",
    marks: 3,
    difficulty: 4,
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    explanation:
      "Since tan⁻¹a + tan⁻¹(1/a) = π/2 for a > 0, tan⁻¹(x) = π/2 − tan⁻¹(2) = tan⁻¹(1/2), so x = 1/2.",
  },
  {
    id: "y12e1-itrig-tan-d4-7",
    prompt: "Solve tan⁻¹(2x − 1) = π/4 for x.",
    latex: "\\tan^{-1}(2x - 1) = \\tfrac{\\pi}{4}",
    marks: 2,
    difficulty: 4,
    answer: "1",
    explanation: "2x − 1 = tan(π/4) = 1, so 2x = 2 and x = 1.",
  },
  {
    id: "y12e1-itrig-tan-d4-8",
    prompt: "Find the exact value of cos(tan⁻¹(2)).",
    latex: "\\cos\\left(\\tan^{-1} 2\\right)",
    marks: 2,
    difficulty: 4,
    answer: "sqrt(5)/5",
    acceptedAnswers: ["1/sqrt(5)", "1/√5", "√5/5", "0.447", "0.4472"],
    explanation:
      "tan θ = 2 gives a 1–2–√5 triangle, so cos θ = 1/√5 = √5/5 (θ ∈ (−π/2, π/2), cosine positive).",
  },
  {
    id: "y12e1-itrig-tan-d4-9",
    prompt: "Find the exact value of tan⁻¹(tan(3π/4)).",
    latex: "\\tan^{-1}\\left(\\tan\\tfrac{3\\pi}{4}\\right)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{3\\pi}{4}$" },
      { label: "B", text: "$-\\dfrac{\\pi}{4}$" },
      { label: "C", text: "$\\dfrac{\\pi}{4}$" },
      { label: "D", text: "$-\\dfrac{3\\pi}{4}$" },
    ],
    answer: "B",
    explanation:
      "tan(3π/4) = −1, and tan⁻¹ returns a value in (−π/2, π/2), so tan⁻¹(−1) = −π/4. A is wrong because 3π/4 is outside the range of tan⁻¹.",
  },
  {
    id: "y12e1-itrig-tan-d4-10",
    prompt: "Find the exact value of tan(tan⁻¹(2) + tan⁻¹(3)).",
    latex: "\\tan\\left(\\tan^{-1} 2 + \\tan^{-1} 3\\right)",
    marks: 3,
    difficulty: 4,
    answer: "-1",
    acceptedAnswers: ["−1"],
    explanation:
      "tan of the sum = (2 + 3)/(1 − (2)(3)) = 5/(−5) = −1.",
  },
];

// D5: express composites as functions of x (generalisation), solve with the
// addition/double/subtraction formulas, identity insight, and the quadrant
// correction when an arctan sum exceeds π/2.
const inverseTangentD5: TopicTestQuestion[] = [
  {
    id: "y12e1-itrig-tan-d5-1",
    prompt: "Express sin(tan⁻¹ x) in terms of x.",
    latex: "\\sin\\left(\\tan^{-1} x\\right)",
    marks: 3,
    difficulty: 5,
    answer: "x/sqrt(1+x^2)",
    acceptedAnswers: ["x/√(1+x^2)", "x*(1+x^2)^(-1/2)", "x/(1+x^2)^(1/2)"],
    explanation:
      "tan θ = x with θ ∈ (−π/2, π/2) gives a triangle with opposite x, adjacent 1, hypotenuse √(1 + x²). So sin θ = x/√(1 + x²).",
  },
  {
    id: "y12e1-itrig-tan-d5-2",
    prompt: "Express cos(tan⁻¹ x) in terms of x.",
    latex: "\\cos\\left(\\tan^{-1} x\\right)",
    marks: 3,
    difficulty: 5,
    answer: "1/sqrt(1+x^2)",
    acceptedAnswers: ["1/√(1+x^2)", "(1+x^2)^(-1/2)"],
    explanation:
      "From the same 1, x, √(1 + x²) triangle (cosine positive on the range of tan⁻¹), cos θ = 1/√(1 + x²).",
  },
  {
    id: "y12e1-itrig-tan-d5-3",
    prompt: "Express tan(2 tan⁻¹ x) in terms of x.",
    latex: "\\tan\\left(2\\tan^{-1} x\\right)",
    marks: 3,
    difficulty: 5,
    answer: "2x/(1-x^2)",
    acceptedAnswers: ["2x/(1 - x^2)", "2*x/(1-x^2)"],
    explanation:
      "With t = tan θ = x, tan 2θ = 2t/(1 − t²) = 2x/(1 − x²).",
  },
  {
    id: "y12e1-itrig-tan-d5-4",
    prompt: "Solve tan⁻¹(2x) + tan⁻¹(3x) = π/4 for x.",
    latex: "\\tan^{-1}(2x) + \\tan^{-1}(3x) = \\tfrac{\\pi}{4}",
    marks: 4,
    difficulty: 5,
    answer: "1/6",
    acceptedAnswers: ["0.1667", "0.167"],
    explanation:
      "Take tan: (2x + 3x)/(1 − 6x²) = 1, so 5x = 1 − 6x², i.e. 6x² + 5x − 1 = (6x − 1)(x + 1) = 0. The valid solution is x = 1/6.",
  },
  {
    id: "y12e1-itrig-tan-d5-5",
    prompt:
      "For x > 0, the function f(x) = tan⁻¹(x) + tan⁻¹(1/x). Find the exact value of f(5).",
    latex: "f(x) = \\tan^{-1}(x) + \\tan^{-1}\\left(\\tfrac{1}{x}\\right)",
    marks: 3,
    difficulty: 5,
    answer: "pi/2",
    acceptedAnswers: ["π/2", "1.5708", "1.571"],
    explanation:
      "For x > 0, tan⁻¹x + tan⁻¹(1/x) = π/2 (the angles are complementary), so f is constant and f(5) = π/2.",
  },
  {
    id: "y12e1-itrig-tan-d5-6",
    prompt: "Find the exact value of tan⁻¹(1) + tan⁻¹(2) + tan⁻¹(3).",
    latex: "\\tan^{-1}(1) + \\tan^{-1}(2) + \\tan^{-1}(3)",
    marks: 4,
    difficulty: 5,
    answer: "pi",
    acceptedAnswers: ["π", "3.1416", "3.142"],
    explanation:
      "tan⁻¹2 + tan⁻¹3 = 3π/4 (tan of the sum is −1 and the sum lies in (π/2, π)). Adding tan⁻¹1 = π/4 gives π.",
  },
  {
    id: "y12e1-itrig-tan-d5-7",
    prompt:
      "For 0 < x < 1, simplify tan⁻¹((1 + x)/(1 − x)) − tan⁻¹(x). Give the exact value.",
    latex: "\\tan^{-1}\\left(\\tfrac{1 + x}{1 - x}\\right) - \\tan^{-1}(x)",
    marks: 4,
    difficulty: 5,
    answer: "pi/4",
    acceptedAnswers: ["π/4", "0.7854", "0.785"],
    explanation:
      "tan⁻¹((1 + x)/(1 − x)) = π/4 + tan⁻¹x for 0 < x < 1, so the difference is π/4. (Check: the tan of the difference is ((1+x)/(1−x) − x)/(1 + x(1+x)/(1−x)) = 1.)",
  },
  {
    id: "y12e1-itrig-tan-d5-8",
    prompt: "Solve 2 tan⁻¹(x) = tan⁻¹(4/3) for x.",
    latex: "2\\tan^{-1}(x) = \\tan^{-1}\\tfrac{4}{3}",
    marks: 4,
    difficulty: 5,
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    explanation:
      "tan(2 tan⁻¹x) = 2x/(1 − x²) = 4/3, so 6x = 4(1 − x²), i.e. 4x² + 6x − 4 = (2x − 1)(2x + 4) = 0. The valid solution is x = 1/2.",
  },
  {
    id: "y12e1-itrig-tan-d5-9",
    prompt: "Find the exact value of tan⁻¹(2) + tan⁻¹(3).",
    latex: "\\tan^{-1}(2) + \\tan^{-1}(3)",
    marks: 4,
    difficulty: 5,
    answer: "3pi/4",
    acceptedAnswers: ["3π/4", "2.3562", "2.356"],
    explanation:
      "tan of the sum is (2 + 3)/(1 − 6) = −1. Both tan⁻¹2 and tan⁻¹3 exceed π/4, so the sum lies in (π/2, π); the correct angle is 3π/4, not −π/4.",
  },
  {
    id: "y12e1-itrig-tan-d5-10",
    prompt:
      "Solve tan⁻¹(x + 1) − tan⁻¹(x − 1) = tan⁻¹(2) for x, where x > 0.",
    latex: "\\tan^{-1}(x + 1) - \\tan^{-1}(x - 1) = \\tan^{-1}(2)",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation:
      "tan of the LHS = ((x + 1) − (x − 1))/(1 + (x + 1)(x − 1)) = 2/x². Setting 2/x² = 2 gives x² = 1, so x = 1 (x > 0).",
  },
];

export const inverseTrigPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "inverse-trig",
  topicTitle: "Inverse Trigonometric Functions",
  subtopics: [
    {
      subtopicSlug: "inverse-sine-cosine",
      subtopicTitle: "Inverse Sine and Cosine",
      remediationHref: href("inverse-sine-cosine"),
      d4: sineCosineD4,
      d5: sineCosineD5,
    },
    {
      subtopicSlug: "inverse-tangent",
      subtopicTitle: "Inverse Tangent",
      remediationHref: href("inverse-tangent"),
      d4: inverseTangentD4,
      d5: inverseTangentD5,
    },
    {
      subtopicSlug: "differentiating-inverse-trig",
      subtopicTitle: "Differentiating Inverse Trig Functions",
      remediationHref: href("differentiating-inverse-trig"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "inverse-trig-properties",
      subtopicTitle: "Inverse Trig Identities and Composite Expressions",
      remediationHref: href("inverse-trig-properties"),
      d4: [],
      d5: [],
    },
  ],
};
