import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Further Calculus Skills.
 *
 * D4/D5 + a D6 exam-practice band, auto-markable per
 * docs/QUESTION_AUTHORING_STANDARD.md. Antiderivative answers use a trailing
 * "+ C" (the CAS marker compares derivatives, so equivalent forms are accepted);
 * standard inverse-trig forms are posed as definite integrals so the answers are
 * clean exact values rather than inverse-trig expressions.
 *
 * Status: subtopic 1 "Trigonometric Integral Forms" — D4 batch (10). Remaining
 * bands / subtopics to follow. Not yet registered in index.ts.
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/further-calculus/${lesson}`;

// ── Subtopic 1: Trigonometric Integral Forms ─────────────────────────────────
// D4: choose the right tool — a half-angle/Pythagorean identity, the reverse
// chain rule with its coefficient, or a standard inverse-trig form — then
// integrate (and evaluate exactly for the definite ones).
const trigIntegralsD4: TopicTestQuestion[] = [
  {
    id: "y12e1-fcalc-ti-d4-1",
    prompt: "Find ∫ sin²x dx.",
    latex: "\\int \\sin^2 x \\, dx",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{x}{2} - \\dfrac{\\sin 2x}{4} + C$" },
      { label: "B", text: "$\\dfrac{\\sin^3 x}{3} + C$" },
      { label: "C", text: "$\\dfrac{x}{2} + \\dfrac{\\sin 2x}{4} + C$" },
      { label: "D", text: "$-\\dfrac{\\cos 2x}{2} + C$" },
    ],
    answer: "A",
    explanation:
      "Use sin²x = (1 − cos 2x)/2. ∫(1 − cos 2x)/2 dx = x/2 − (sin 2x)/4 + C. C is ∫cos²x; B and D ignore the identity.",
  },
  {
    id: "y12e1-fcalc-ti-d4-2",
    prompt: "Evaluate ∫₀^{π/2} cos(2x) dx.",
    latex: "\\int_0^{\\pi/2} \\cos(2x)\\, dx",
    marks: 2,
    difficulty: 4,
    answer: "0",
    explanation:
      "∫cos 2x dx = (sin 2x)/2. [sin 2x / 2]₀^{π/2} = sin π / 2 − 0 = 0.",
  },
  {
    id: "y12e1-fcalc-ti-d4-3",
    prompt: "Evaluate ∫₀² 1/(4 + x²) dx.",
    latex: "\\int_0^{2} \\dfrac{1}{4 + x^2}\\, dx",
    marks: 3,
    difficulty: 4,
    answer: "pi/8",
    acceptedAnswers: ["π/8", "0.3927", "0.393"],
    explanation:
      "∫1/(a² + x²) dx = (1/a)tan⁻¹(x/a) with a = 2: (1/2)tan⁻¹(x/2). Evaluated 0→2: (1/2)tan⁻¹(1) = (1/2)(π/4) = π/8.",
  },
  {
    id: "y12e1-fcalc-ti-d4-4",
    prompt: "Evaluate ∫₀^{3/2} 1/√(9 − x²) dx.",
    latex: "\\int_0^{3/2} \\dfrac{1}{\\sqrt{9 - x^2}}\\, dx",
    marks: 3,
    difficulty: 4,
    answer: "pi/6",
    acceptedAnswers: ["π/6", "0.5236", "0.524"],
    explanation:
      "∫1/√(a² − x²) dx = sin⁻¹(x/a) with a = 3: sin⁻¹(x/3). Evaluated 0→3/2: sin⁻¹(1/2) = π/6.",
  },
  {
    id: "y12e1-fcalc-ti-d4-5",
    prompt: "Evaluate ∫₀^{√3} 1/(1 + x²) dx.",
    latex: "\\int_0^{\\sqrt{3}} \\dfrac{1}{1 + x^2}\\, dx",
    marks: 2,
    difficulty: 4,
    answer: "pi/3",
    acceptedAnswers: ["π/3", "1.0472", "1.047"],
    explanation: "∫1/(1 + x²) dx = tan⁻¹x. [tan⁻¹x]₀^{√3} = tan⁻¹(√3) = π/3.",
  },
  {
    id: "y12e1-fcalc-ti-d4-6",
    prompt: "Find ∫ tan²x dx.",
    latex: "\\int \\tan^2 x \\, dx",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\tan x - x + C$" },
      { label: "B", text: "$\\sec^2 x + C$" },
      { label: "C", text: "$\\dfrac{\\tan^2 x}{2} + C$" },
      { label: "D", text: "$\\tan x + C$" },
    ],
    answer: "A",
    explanation:
      "Use tan²x = sec²x − 1. ∫(sec²x − 1) dx = tan x − x + C. D forgets the −x; B is the integrand's relative, not the integral.",
  },
  {
    id: "y12e1-fcalc-ti-d4-7",
    prompt: "Find ∫ sec²(3x) dx.",
    latex: "\\int \\sec^2(3x)\\, dx",
    marks: 2,
    difficulty: 4,
    answer: "(1/3)tan(3x)+C",
    acceptedAnswers: ["tan(3x)/3 + C", "(1/3)*tan(3x)+C", "1/3 tan(3x) + C"],
    explanation:
      "Reverse chain rule: ∫sec²(3x) dx = (1/3)tan(3x) + C (the 1/3 undoes the inner derivative 3).",
  },
  {
    id: "y12e1-fcalc-ti-d4-8",
    prompt: "Find ∫ sin x cos x dx.",
    latex: "\\int \\sin x \\cos x \\, dx",
    marks: 3,
    difficulty: 4,
    answer: "-(1/4)cos(2x)+C",
    acceptedAnswers: ["-cos(2x)/4 + C", "(1/2)sin(x)^2 + C", "sin(x)^2/2 + C", "-(1/4)*cos(2x)+C"],
    explanation:
      "sin x cos x = (1/2)sin 2x, so ∫ = (1/2)(−(1/2)cos 2x) + C = −(1/4)cos 2x + C. (Equivalently (1/2)sin²x + C.)",
  },
  {
    id: "y12e1-fcalc-ti-d4-9",
    prompt: "Evaluate ∫₀^{π/6} cos(3x) dx.",
    latex: "\\int_0^{\\pi/6} \\cos(3x)\\, dx",
    marks: 2,
    difficulty: 4,
    answer: "1/3",
    acceptedAnswers: ["0.3333", "0.333"],
    explanation:
      "∫cos 3x dx = (1/3)sin 3x. [(1/3)sin 3x]₀^{π/6} = (1/3)sin(π/2) = 1/3.",
  },
  {
    id: "y12e1-fcalc-ti-d4-10",
    prompt: "Evaluate ∫₀^{π/4} (sin²x − cos²x) dx.",
    latex: "\\int_0^{\\pi/4} (\\sin^2 x - \\cos^2 x)\\, dx",
    marks: 3,
    difficulty: 4,
    answer: "-1/2",
    acceptedAnswers: ["−1/2", "-0.5"],
    explanation:
      "sin²x − cos²x = −cos 2x, so ∫ = −(sin 2x)/2. [−(sin 2x)/2]₀^{π/4} = −sin(π/2)/2 = −1/2.",
  },
];

// D5: multi-step synthesis — double-angle squared, odd-power splitting,
// completing the square into a standard form, product-to-sum, solving for a
// limit, area between curves, and recognising a derivative pattern.
const trigIntegralsD5: TopicTestQuestion[] = [
  {
    id: "y12e1-fcalc-ti-d5-1",
    prompt: "Find ∫ sin²x cos²x dx.",
    latex: "\\int \\sin^2 x \\cos^2 x \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "x/8 - sin(4x)/32 + C",
    acceptedAnswers: ["x/8 - (1/32)sin(4x) + C", "x/8-sin(4x)/32+C", "(4x - sin(4x))/32 + C"],
    explanation:
      "sin²x cos²x = (1/4)sin²2x = (1 − cos 4x)/8. ∫ = x/8 − (sin 4x)/32 + C.",
  },
  {
    id: "y12e1-fcalc-ti-d5-2",
    prompt: "Evaluate ∫₀^{π/2} sin²x cos²x dx.",
    latex: "\\int_0^{\\pi/2} \\sin^2 x \\cos^2 x \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "pi/16",
    acceptedAnswers: ["π/16", "0.19635", "0.196"],
    explanation:
      "From ∫ = x/8 − (sin 4x)/32: [x/8 − (sin 4x)/32]₀^{π/2} = π/16 − sin(2π)/32 = π/16.",
  },
  {
    id: "y12e1-fcalc-ti-d5-3",
    prompt: "Find ∫ cos³x dx.",
    latex: "\\int \\cos^3 x \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "sin(x) - sin(x)^3/3 + C",
    acceptedAnswers: ["sin(x)-sin(x)^3/3+C", "sin(x) - (1/3)sin(x)^3 + C", "sin x - sin^3 x / 3 + C"],
    explanation:
      "cos³x = cos x(1 − sin²x). With the split, ∫ = sin x − (sin³x)/3 + C.",
  },
  {
    id: "y12e1-fcalc-ti-d5-4",
    prompt: "Evaluate ∫₀^{π/2} cos³x dx.",
    latex: "\\int_0^{\\pi/2} \\cos^3 x \\, dx",
    marks: 3,
    difficulty: 5,
    answer: "2/3",
    acceptedAnswers: ["0.6667", "0.667"],
    explanation:
      "[sin x − (sin³x)/3]₀^{π/2} = (1 − 1/3) − 0 = 2/3.",
  },
  {
    id: "y12e1-fcalc-ti-d5-5",
    prompt: "Evaluate ∫₋₁¹ 1/(x² + 2x + 5) dx.",
    latex: "\\int_{-1}^{1} \\dfrac{1}{x^2 + 2x + 5}\\, dx",
    marks: 4,
    difficulty: 5,
    answer: "pi/8",
    acceptedAnswers: ["π/8", "0.3927", "0.393"],
    explanation:
      "Complete the square: x² + 2x + 5 = (x + 1)² + 4. ∫ = (1/2)tan⁻¹((x+1)/2). From −1 to 1: (1/2)(tan⁻¹1 − tan⁻¹0) = (1/2)(π/4) = π/8.",
  },
  {
    id: "y12e1-fcalc-ti-d5-6",
    prompt: "Evaluate ∫₀² 1/√(8 − x²) dx.",
    latex: "\\int_0^{2} \\dfrac{1}{\\sqrt{8 - x^2}}\\, dx",
    marks: 4,
    difficulty: 5,
    answer: "pi/4",
    acceptedAnswers: ["π/4", "0.7854", "0.785"],
    explanation:
      "a² = 8 so a = 2√2: ∫ = sin⁻¹(x/(2√2)). At x = 2: sin⁻¹(2/(2√2)) = sin⁻¹(1/√2) = π/4.",
  },
  {
    id: "y12e1-fcalc-ti-d5-7",
    prompt: "Find the value of a (0 < a < π/2) for which ∫₀ᵃ sec²x dx = √3.",
    latex: "\\int_0^{a} \\sec^2 x \\, dx = \\sqrt{3}",
    marks: 4,
    difficulty: 5,
    answer: "pi/3",
    acceptedAnswers: ["π/3", "1.0472", "1.047"],
    explanation:
      "∫₀ᵃ sec²x dx = tan a. Setting tan a = √3 gives a = π/3.",
  },
  {
    id: "y12e1-fcalc-ti-d5-8",
    prompt: "Find ∫ sin(3x) cos(x) dx.",
    latex: "\\int \\sin(3x)\\cos(x)\\, dx",
    marks: 4,
    difficulty: 5,
    answer: "-cos(4x)/8 - cos(2x)/4 + C",
    acceptedAnswers: ["-(1/8)cos(4x) - (1/4)cos(2x) + C", "-cos(4x)/8-cos(2x)/4+C"],
    explanation:
      "Product-to-sum: sin 3x cos x = (1/2)(sin 4x + sin 2x). ∫ = (1/2)(−(cos 4x)/4 − (cos 2x)/2) + C = −(cos 4x)/8 − (cos 2x)/4 + C.",
  },
  {
    id: "y12e1-fcalc-ti-d5-9",
    prompt:
      "Find the exact area enclosed between y = cos x and y = sin x from x = 0 to x = π/4.",
    latex: "y = \\cos x, \\quad y = \\sin x, \\quad 0 \\le x \\le \\tfrac{\\pi}{4}",
    marks: 4,
    difficulty: 5,
    answer: "sqrt(2)-1",
    acceptedAnswers: ["√2-1", "sqrt(2) - 1", "0.4142", "0.414"],
    explanation:
      "On [0, π/4], cos x ≥ sin x. Area = ∫₀^{π/4}(cos x − sin x) dx = [sin x + cos x]₀^{π/4} = (√2) − 1.",
  },
  {
    id: "y12e1-fcalc-ti-d5-10",
    prompt: "Evaluate ∫₀^{π/4} tan²x sec²x dx.",
    latex: "\\int_0^{\\pi/4} \\tan^2 x \\sec^2 x \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "1/3",
    acceptedAnswers: ["0.3333", "0.333"],
    explanation:
      "Recognise sec²x as the derivative of tan x: ∫tan²x sec²x dx = (tan³x)/3. [tan³x/3]₀^{π/4} = 1/3.",
  },
];

// ── Subtopic 2: Substitution for Linear Inner Functions ──────────────────────
// D4: ∫ f(ax + b) dx = (1/a)F(ax + b) — apply the 1/a factor across power, exp,
// log, trig and root forms, indefinite and definite.
const substitutionD4: TopicTestQuestion[] = [
  {
    id: "y12e1-fcalc-sub-d4-1",
    prompt: "Find ∫ (2x + 1)⁴ dx.",
    latex: "\\int (2x + 1)^4 \\, dx",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{(2x+1)^5}{10} + C$" },
      { label: "B", text: "$\\dfrac{(2x+1)^5}{5} + C$" },
      { label: "C", text: "$\\dfrac{(2x+1)^5}{2} + C$" },
      { label: "D", text: "$4(2x+1)^3 + C$" },
    ],
    answer: "A",
    explanation:
      "Raise the power and divide by the new power and the inner derivative 2: (2x+1)⁵/(5·2) = (2x+1)⁵/10 + C. B forgets the 1/2 factor; D differentiates.",
  },
  {
    id: "y12e1-fcalc-sub-d4-2",
    prompt: "Find ∫ (3x − 2)³ dx.",
    latex: "\\int (3x - 2)^3 \\, dx",
    marks: 2,
    difficulty: 4,
    answer: "(3x-2)^4/12 + C",
    acceptedAnswers: ["(3x-2)^4/12+C", "(1/12)(3x-2)^4 + C"],
    explanation: "(3x−2)⁴/(4·3) = (3x−2)⁴/12 + C.",
  },
  {
    id: "y12e1-fcalc-sub-d4-3",
    prompt: "Find ∫ e^{2x} dx.",
    latex: "\\int e^{2x} \\, dx",
    marks: 2,
    difficulty: 4,
    answer: "(1/2)e^(2x) + C",
    acceptedAnswers: ["e^(2x)/2 + C", "(1/2)*e^(2x)+C", "e^(2x)/2+C"],
    explanation: "∫e^{ax} dx = (1/a)e^{ax}: (1/2)e^{2x} + C.",
  },
  {
    id: "y12e1-fcalc-sub-d4-4",
    prompt: "Find ∫ 1/(2x + 1) dx.",
    latex: "\\int \\dfrac{1}{2x + 1} \\, dx",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{1}{2}\\ln|2x+1| + C$" },
      { label: "B", text: "$\\ln|2x+1| + C$" },
      { label: "C", text: "$2\\ln|2x+1| + C$" },
      { label: "D", text: "$-\\dfrac{1}{(2x+1)^2} + C$" },
    ],
    answer: "A",
    explanation:
      "∫1/(ax+b) dx = (1/a)ln|ax+b|: (1/2)ln|2x+1| + C. B forgets the 1/2; D treats it as a power.",
  },
  {
    id: "y12e1-fcalc-sub-d4-5",
    prompt: "Find ∫ sin(2x + 1) dx.",
    latex: "\\int \\sin(2x + 1) \\, dx",
    marks: 2,
    difficulty: 4,
    answer: "-(1/2)cos(2x+1) + C",
    acceptedAnswers: ["-cos(2x+1)/2 + C", "-(1/2)*cos(2x+1)+C"],
    explanation: "∫sin(ax+b) dx = −(1/a)cos(ax+b): −(1/2)cos(2x+1) + C.",
  },
  {
    id: "y12e1-fcalc-sub-d4-6",
    prompt: "Find ∫ √(4x + 1) dx.",
    latex: "\\int \\sqrt{4x + 1} \\, dx",
    marks: 3,
    difficulty: 4,
    answer: "(1/6)(4x+1)^(3/2) + C",
    acceptedAnswers: ["(4x+1)^(3/2)/6 + C", "(1/6)*(4x+1)^(3/2)+C"],
    explanation:
      "∫(4x+1)^{1/2} dx = (4x+1)^{3/2}/((3/2)·4) = (1/6)(4x+1)^{3/2} + C.",
  },
  {
    id: "y12e1-fcalc-sub-d4-7",
    prompt: "Evaluate ∫₀¹ (2x + 1)³ dx.",
    latex: "\\int_0^{1} (2x + 1)^3 \\, dx",
    marks: 3,
    difficulty: 4,
    answer: "10",
    explanation: "[(2x+1)⁴/8]₀¹ = 81/8 − 1/8 = 80/8 = 10.",
  },
  {
    id: "y12e1-fcalc-sub-d4-8",
    prompt: "Evaluate ∫₀^{1/2} e^{2x} dx.",
    latex: "\\int_0^{1/2} e^{2x} \\, dx",
    marks: 2,
    difficulty: 4,
    answer: "(e-1)/2",
    acceptedAnswers: ["(1/2)(e-1)", "(e - 1)/2", "0.8591", "0.859"],
    explanation: "[(1/2)e^{2x}]₀^{1/2} = (1/2)(e¹ − e⁰) = (e − 1)/2.",
  },
  {
    id: "y12e1-fcalc-sub-d4-9",
    prompt: "Evaluate ∫₁² 1/(2x − 1) dx.",
    latex: "\\int_1^{2} \\dfrac{1}{2x - 1} \\, dx",
    marks: 3,
    difficulty: 4,
    answer: "(1/2)ln(3)",
    acceptedAnswers: ["ln(3)/2", "(1/2)*ln(3)", "0.5493", "0.549"],
    explanation: "[(1/2)ln|2x−1|]₁² = (1/2)(ln 3 − ln 1) = (1/2)ln 3.",
  },
  {
    id: "y12e1-fcalc-sub-d4-10",
    prompt: "Find ∫ (5x + 2)^{-2} dx.",
    latex: "\\int (5x + 2)^{-2} \\, dx",
    marks: 3,
    difficulty: 4,
    answer: "-1/(5(5x+2)) + C",
    acceptedAnswers: ["-1/(25x+10) + C", "-(1/5)(5x+2)^(-1) + C"],
    explanation:
      "∫(5x+2)^{-2} dx = (5x+2)^{-1}/((−1)·5) = −1/(5(5x+2)) + C.",
  },
];

// D5: substitution needing back-substitution of an extra x-factor, algebraic
// manipulation before integrating, definite limits, work-backwards, and an
// initial condition.
const substitutionD5: TopicTestQuestion[] = [
  {
    id: "y12e1-fcalc-sub-d5-1",
    prompt: "Find ∫ x(2x + 1)³ dx.",
    latex: "\\int x(2x + 1)^3 \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "(2x+1)^5/20 - (2x+1)^4/16 + C",
    acceptedAnswers: ["(2x+1)^5/20-(2x+1)^4/16+C"],
    explanation:
      "Let u = 2x + 1, so x = (u − 1)/2, dx = du/2. ∫ = (1/4)∫(u⁴ − u³) du = (2x+1)⁵/20 − (2x+1)⁴/16 + C.",
  },
  {
    id: "y12e1-fcalc-sub-d5-2",
    prompt: "Evaluate ∫₀¹ x(x + 1)⁴ dx.",
    latex: "\\int_0^{1} x(x + 1)^4 \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "43/10",
    acceptedAnswers: ["4.3"],
    explanation:
      "u = x + 1, x = u − 1, limits 1→2. ∫₁²(u⁵ − u⁴) du = [u⁶/6 − u⁵/5]₁² = 63/6 − 31/5 = 43/10.",
  },
  {
    id: "y12e1-fcalc-sub-d5-3",
    prompt: "Find ∫ (2x + 3)/(x + 1) dx.",
    latex: "\\int \\dfrac{2x + 3}{x + 1} \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "2x + ln|x+1| + C",
    acceptedAnswers: ["2x + ln(x+1) + C", "2*x+ln(x+1)+C"],
    explanation:
      "Rewrite (2x+3)/(x+1) = 2 + 1/(x+1). ∫ = 2x + ln|x+1| + C.",
  },
  {
    id: "y12e1-fcalc-sub-d5-4",
    prompt: "Find ∫ x/(2x + 1) dx.",
    latex: "\\int \\dfrac{x}{2x + 1} \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "x/2 - (1/4)ln|2x+1| + C",
    acceptedAnswers: ["x/2 - ln(2x+1)/4 + C", "x/2-(1/4)ln(2x+1)+C"],
    explanation:
      "x/(2x+1) = (1/2)(1 − 1/(2x+1)) = 1/2 − 1/(2(2x+1)). ∫ = x/2 − (1/4)ln|2x+1| + C.",
  },
  {
    id: "y12e1-fcalc-sub-d5-5",
    prompt: "Find the exact area under y = √(2x + 1) from x = 0 to x = 4.",
    latex: "y = \\sqrt{2x + 1}, \\quad 0 \\le x \\le 4",
    marks: 4,
    difficulty: 5,
    answer: "26/3",
    acceptedAnswers: ["8.6667", "8.667"],
    explanation:
      "∫₀⁴(2x+1)^{1/2} dx = [(2x+1)^{3/2}/3]₀⁴ = (27 − 1)/3 = 26/3.",
  },
  {
    id: "y12e1-fcalc-sub-d5-6",
    prompt: "Find the value of a (a > 0) for which ∫₀ᵃ e^{2x} dx = (e⁶ − 1)/2.",
    latex: "\\int_0^{a} e^{2x} \\, dx = \\dfrac{e^6 - 1}{2}",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation:
      "∫₀ᵃ e^{2x} dx = (1/2)(e^{2a} − 1). Setting this equal to (e⁶ − 1)/2 gives e^{2a} = e⁶, so a = 3.",
  },
  {
    id: "y12e1-fcalc-sub-d5-7",
    prompt: "Find ∫ x²/(x + 1) dx.",
    latex: "\\int \\dfrac{x^2}{x + 1} \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "x^2/2 - x + ln|x+1| + C",
    acceptedAnswers: ["x^2/2 - x + ln(x+1) + C", "x^2/2-x+ln(x+1)+C"],
    explanation:
      "Polynomial division: x²/(x+1) = x − 1 + 1/(x+1). ∫ = x²/2 − x + ln|x+1| + C.",
  },
  {
    id: "y12e1-fcalc-sub-d5-8",
    prompt:
      "F(x) = ∫ (2x + 1)³ dx and F(0) = 2. Find F(1).",
    latex: "F'(x) = (2x + 1)^3, \\quad F(0) = 2",
    marks: 4,
    difficulty: 5,
    answer: "12",
    explanation:
      "F(x) = (2x+1)⁴/8 + C. F(0) = 1/8 + C = 2 gives C = 15/8. F(1) = 81/8 + 15/8 = 96/8 = 12.",
  },
  {
    id: "y12e1-fcalc-sub-d5-9",
    prompt: "Evaluate ∫₀¹ 1/√(4x + 1) dx.",
    latex: "\\int_0^{1} \\dfrac{1}{\\sqrt{4x + 1}} \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "(sqrt(5)-1)/2",
    acceptedAnswers: ["(√5-1)/2", "(sqrt(5) - 1)/2", "0.618", "0.6180"],
    explanation:
      "∫(4x+1)^{-1/2} dx = (1/2)(4x+1)^{1/2}. [½(4x+1)^{1/2}]₀¹ = (√5 − 1)/2.",
  },
  {
    id: "y12e1-fcalc-sub-d5-10",
    prompt: "Find ∫ x√(x + 1) dx.",
    latex: "\\int x\\sqrt{x + 1} \\, dx",
    marks: 4,
    difficulty: 5,
    answer: "(2/5)(x+1)^(5/2) - (2/3)(x+1)^(3/2) + C",
    acceptedAnswers: ["(2/5)(x+1)^(5/2)-(2/3)(x+1)^(3/2)+C"],
    explanation:
      "u = x + 1, x = u − 1. ∫(u − 1)u^{1/2} du = ∫(u^{3/2} − u^{1/2}) du = (2/5)(x+1)^{5/2} − (2/3)(x+1)^{3/2} + C.",
  },
];

export const furtherCalculusPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "further-calculus",
  topicTitle: "Further Calculus Skills",
  subtopics: [
    {
      subtopicSlug: "trig-integrals",
      subtopicTitle: "Trigonometric Integral Forms",
      remediationHref: href("trig-integrals"),
      d4: trigIntegralsD4,
      d5: trigIntegralsD5,
    },
    {
      subtopicSlug: "simple-substitution",
      subtopicTitle: "Substitution for Linear Inner Functions",
      remediationHref: href("simple-substitution"),
      d4: substitutionD4,
      d5: substitutionD5,
    },
    {
      subtopicSlug: "integration-by-parts",
      subtopicTitle: "Introduction to Integration by Parts",
      remediationHref: href("integration-by-parts"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "further-calculus-exam-practice",
      subtopicTitle: "Further Calculus Exam Practice",
      remediationHref: href("further-calculus-exam-practice"),
      d4: [],
      d5: [],
      d6: [],
    },
  ],
};
