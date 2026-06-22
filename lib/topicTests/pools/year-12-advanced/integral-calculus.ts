import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Mathematics Advanced · Integral Calculus (NESA MA-C4).
 * Legacy/canonical course, routed
 * /course/year-12-advanced/ma-c4-integral-calculus/<lesson>.
 *
 * The legacy unit merges basic Integral Calculus (10 lessons) with Further
 * Integral Calculus (6 lessons); three conceptual-overlap pairs exist
 * (area-between-curves, trapezoidal-rule, exam-practice). This pool uses the
 * deduped canonical set: the basic lessons + the genuinely-new further lessons
 * (standard integrals, reverse chain rule, definite-with-standard-forms), keeping
 * one of each overlapping pair. All slugs are route-reachable. Antiderivative
 * answers are marked by the CAS marker (+C), with decimal/fraction fallbacks.
 *
 * The redundant "indefinite-integrals-constant-of-integration" lesson is folded
 * into subtopic 1 (same skill: indefinite integration); not a separate subtopic.
 *
 * Status: subtopics 1–2 authored and audited (Antidifferentiation; Initial
 * Conditions). Remaining subtopics to follow; not yet registered.
 */

const href = (lesson: string) =>
  `/course/year-12-advanced/ma-c4-integral-calculus/${lesson}`;

// ── Subtopic 1: Antidifferentiation and the Reverse Power Rule ────────────────
// ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, incl. negative/fractional powers, sums, rewrite-first.
const adD4: TopicTestQuestion[] = [
  { id: "y12a-c4-ad-d4-1", prompt: "Find ∫ 6x² dx.", latex: "\\int 6x^2\\, dx", marks: 2, difficulty: 4,
    answer: "2x^3 + C", acceptedAnswers: ["2x^3+C"], explanation: "6·x³/3 + C = 2x³ + C." },
  { id: "y12a-c4-ad-d4-2", prompt: "Find ∫ √x dx.", latex: "\\int \\sqrt{x}\\, dx", marks: 3, difficulty: 4,
    answer: "(2/3)x^(3/2) + C", acceptedAnswers: ["2x^(3/2)/3 + C", "2/3 x^(3/2) + C", "(2/3)x^1.5 + C"], explanation: "∫x^{1/2} dx = x^{3/2}/(3/2) + C = (2/3)x^{3/2} + C." },
  { id: "y12a-c4-ad-d4-3", prompt: "Find ∫ 3x⁻² dx.", latex: "\\int 3x^{-2}\\, dx", marks: 3, difficulty: 4,
    choices: [ { label: "A", text: "$-\\dfrac{3}{x} + C$" }, { label: "B", text: "$\\dfrac{3}{x} + C$" }, { label: "C", text: "$-\\dfrac{6}{x^3} + C$" }, { label: "D", text: "$-\\dfrac{1}{x} + C$" } ],
    answer: "A", explanation: "∫3x⁻² dx = 3·x⁻¹/(−1) + C = −3/x + C. C differentiates instead; B has the wrong sign." },
  { id: "y12a-c4-ad-d4-4", prompt: "Find ∫ (x² − 4x) dx.", latex: "\\int (x^2 - 4x)\\, dx", marks: 2, difficulty: 4,
    answer: "x^3/3 - 2x^2 + C", acceptedAnswers: ["(1/3)x^3 - 2x^2 + C"], explanation: "x³/3 − 2x² + C." },
  { id: "y12a-c4-ad-d4-5", prompt: "Find ∫ (6x² + 4x) dx.", latex: "\\int (6x^2 + 4x)\\, dx", marks: 2, difficulty: 4,
    answer: "2x^3 + 2x^2 + C", acceptedAnswers: ["2x^3+2x^2+C"], explanation: "6·x³/3 + 4·x²/2 + C = 2x³ + 2x² + C." },
  { id: "y12a-c4-ad-d4-6", prompt: "Find ∫ x^(2/3) dx.", latex: "\\int x^{2/3}\\, dx", marks: 3, difficulty: 4,
    answer: "(3/5)x^(5/3) + C", acceptedAnswers: ["3x^(5/3)/5 + C", "3/5 x^(5/3) + C"], explanation: "x^{5/3}/(5/3) + C = (3/5)x^{5/3} + C." },
  { id: "y12a-c4-ad-d4-7", prompt: "If ∫ f(x) dx = x⁵ + C, find f(x).", latex: "\\int f(x)\\, dx = x^5 + C", marks: 2, difficulty: 4,
    choices: [ { label: "A", text: "$5x^4$" }, { label: "B", text: "$\\dfrac{x^6}{6}$" }, { label: "C", text: "$x^4$" }, { label: "D", text: "$5x^6$" } ],
    answer: "A", explanation: "f is the derivative of x⁵, so f(x) = 5x⁴. B integrates again." },
  { id: "y12a-c4-ad-d4-8", prompt: "Find ∫ (2x + 3) dx.", latex: "\\int (2x + 3)\\, dx", marks: 2, difficulty: 4,
    answer: "x^2 + 3x + C", acceptedAnswers: ["x^2+3x+C"], explanation: "x² + 3x + C." },
  { id: "y12a-c4-ad-d4-9", prompt: "Find ∫ (4x³ − 1) dx.", latex: "\\int (4x^3 - 1)\\, dx", marks: 2, difficulty: 4,
    answer: "x^4 - x + C", acceptedAnswers: ["x^4-x+C"], explanation: "x⁴ − x + C." },
  { id: "y12a-c4-ad-d4-10", prompt: "Find ∫ 8x dx.", latex: "\\int 8x\\, dx", marks: 2, difficulty: 4,
    answer: "4x^2 + C", acceptedAnswers: ["4x^2+C"], explanation: "8·x²/2 + C = 4x² + C." },
];
const adD5: TopicTestQuestion[] = [
  { id: "y12a-c4-ad-d5-1", prompt: "Find ∫ x²·x³ dx.", latex: "\\int x^2 \\cdot x^3\\, dx", marks: 3, difficulty: 5,
    answer: "x^6/6 + C", acceptedAnswers: ["(1/6)x^6 + C"], explanation: "x²·x³ = x⁵, so ∫ = x⁶/6 + C." },
  { id: "y12a-c4-ad-d5-2", prompt: "Find ∫ 1/√x dx (exact form).", latex: "\\int \\tfrac{1}{\\sqrt{x}}\\, dx", marks: 4, difficulty: 5,
    answer: "2x^(1/2) + C", acceptedAnswers: ["2sqrt(x) + C", "2√x + C", "2x^0.5 + C"], explanation: "∫x^{-1/2} dx = 2x^{1/2} + C = 2√x + C." },
  { id: "y12a-c4-ad-d5-3", prompt: "Find ∫ (x³ + 2)/x² dx.", latex: "\\int \\tfrac{x^3 + 2}{x^2}\\, dx", marks: 4, difficulty: 5,
    answer: "x^2/2 - 2/x + C", acceptedAnswers: ["(1/2)x^2 - 2x^(-1) + C"], explanation: "Rewrite as x + 2x⁻²; ∫ = x²/2 − 2/x + C." },
  { id: "y12a-c4-ad-d5-4", prompt: "Find ∫ (x + 1)² dx.", latex: "\\int (x+1)^2\\, dx", marks: 4, difficulty: 5,
    answer: "x^3/3 + x^2 + x + C", acceptedAnswers: ["(1/3)x^3 + x^2 + x + C"], explanation: "Expand to x² + 2x + 1; ∫ = x³/3 + x² + x + C." },
  { id: "y12a-c4-ad-d5-5", prompt: "Find ∫ x²√x dx (exact form).", latex: "\\int x^2\\sqrt{x}\\, dx", marks: 4, difficulty: 5,
    answer: "(2/7)x^(7/2) + C", acceptedAnswers: ["2x^(7/2)/7 + C"], explanation: "x²√x = x^{5/2}; ∫ = (2/7)x^{7/2} + C." },
  { id: "y12a-c4-ad-d5-6", prompt: "Find ∫ (2x − 1)(x + 3) dx.", latex: "\\int (2x-1)(x+3)\\, dx", marks: 4, difficulty: 5,
    answer: "(2/3)x^3 + (5/2)x^2 - 3x + C", acceptedAnswers: ["2x^3/3 + 5x^2/2 - 3x + C"], explanation: "Expand to 2x² + 5x − 3; ∫ = (2/3)x³ + (5/2)x² − 3x + C." },
  { id: "y12a-c4-ad-d5-7", prompt: "Find ∫ (x⁴ − 1)/x² dx.", latex: "\\int \\tfrac{x^4 - 1}{x^2}\\, dx", marks: 4, difficulty: 5,
    answer: "x^3/3 + 1/x + C", acceptedAnswers: ["(1/3)x^3 + x^(-1) + C"], explanation: "Rewrite as x² − x⁻²; ∫ = x³/3 + 1/x + C." },
  { id: "y12a-c4-ad-d5-8", prompt: "Find ∫ (3x − 2)/√x dx (exact form).", latex: "\\int \\tfrac{3x - 2}{\\sqrt{x}}\\, dx", marks: 4, difficulty: 5,
    answer: "2x^(3/2) - 4x^(1/2) + C", acceptedAnswers: ["2x^(3/2) - 4sqrt(x) + C", "2x√x - 4√x + C"], explanation: "Split into 3x^{1/2} − 2x^{-1/2}; ∫ = 2x^{3/2} − 4x^{1/2} + C." },
  { id: "y12a-c4-ad-d5-9", prompt: "Find ∫ (√x)³ dx (exact form).", latex: "\\int (\\sqrt{x})^3\\, dx", marks: 3, difficulty: 5,
    answer: "(2/5)x^(5/2) + C", acceptedAnswers: ["2x^(5/2)/5 + C"], explanation: "(√x)³ = x^{3/2}; ∫ = (2/5)x^{5/2} + C." },
  { id: "y12a-c4-ad-d5-10", prompt: "The antiderivative of x³ has the form ax⁴ + C. Find a (exact fraction).", latex: "\\int x^3\\, dx = ax^4 + C", marks: 3, difficulty: 5,
    answer: "1/4", acceptedAnswers: ["0.25"], explanation: "∫x³ dx = x⁴/4 + C, so a = 1/4." },
];

// ── Subtopic 2: Initial Conditions and the Particular Primitive ──────────────
// Use a condition (a point, or f(a) = b) to pin the constant, then answer.
const icD4: TopicTestQuestion[] = [
  { id: "y12a-c4-ic-d4-1", prompt: "f'(x) = 2x and f(0) = 5. Find the constant of integration C.", latex: "f'(x) = 2x, \\ f(0) = 5", marks: 2, difficulty: 4,
    answer: "5", explanation: "f(x) = x² + C; f(0) = C = 5." },
  { id: "y12a-c4-ic-d4-2", prompt: "f'(x) = 3x² and f(1) = 2. Find C.", latex: "f'(x) = 3x^2, \\ f(1) = 2", marks: 2, difficulty: 4,
    answer: "1", explanation: "f(x) = x³ + C; f(1) = 1 + C = 2 ⇒ C = 1." },
  { id: "y12a-c4-ic-d4-3", prompt: "f'(x) = 2x and f(0) = 3. Find f(2).", latex: "f'(x) = 2x, \\ f(0) = 3", marks: 3, difficulty: 4,
    choices: [ { label: "A", text: "$7$" }, { label: "B", text: "$4$" }, { label: "C", text: "$3$" }, { label: "D", text: "$12$" } ],
    answer: "A", explanation: "f(x) = x² + 3; f(2) = 4 + 3 = 7. B forgets the constant." },
  { id: "y12a-c4-ic-d4-4", prompt: "A curve has dy/dx = 4x and passes through (1, 5). Find C.", latex: "\\tfrac{dy}{dx} = 4x, \\ (1, 5)", marks: 3, difficulty: 4,
    choices: [ { label: "A", text: "$3$" }, { label: "B", text: "$5$" }, { label: "C", text: "$2$" }, { label: "D", text: "$9$" } ],
    answer: "A", explanation: "y = 2x² + C; 2 + C = 5 ⇒ C = 3. B mistakes the point's y-value for C." },
  { id: "y12a-c4-ic-d4-5", prompt: "f'(x) = 6x² − 2 and f(1) = 0. Find C.", latex: "f'(x) = 6x^2 - 2, \\ f(1) = 0", marks: 3, difficulty: 4,
    answer: "0", explanation: "f(x) = 2x³ − 2x + C; f(1) = 0 + C = 0 ⇒ C = 0." },
  { id: "y12a-c4-ic-d4-6", prompt: "f'(x) = x and f(2) = 4. Find f(0).", latex: "f'(x) = x, \\ f(2) = 4", marks: 3, difficulty: 4,
    answer: "2", explanation: "f(x) = x²/2 + C; f(2) = 2 + C = 4 ⇒ C = 2; f(0) = 2." },
  { id: "y12a-c4-ic-d4-7", prompt: "A curve has dy/dx = 3x² + 1 and passes through (0, −4). Find y when x = 1.", latex: "\\tfrac{dy}{dx} = 3x^2 + 1, \\ (0, -4)", marks: 3, difficulty: 4,
    answer: "-2", acceptedAnswers: ["−2"], explanation: "y = x³ + x + C; C = −4; y(1) = 1 + 1 − 4 = −2." },
  { id: "y12a-c4-ic-d4-8", prompt: "f'(x) = 2x − 3 and f(0) = 7. Find f(2).", latex: "f'(x) = 2x - 3, \\ f(0) = 7", marks: 3, difficulty: 4,
    answer: "5", explanation: "f(x) = x² − 3x + 7; f(2) = 4 − 6 + 7 = 5." },
  { id: "y12a-c4-ic-d4-9", prompt: "A particle has velocity v = 2t and initial displacement s(0) = 10. Find s(3).", latex: "v = 2t, \\ s(0) = 10", marks: 3, difficulty: 4,
    answer: "19", explanation: "s = t² + 10; s(3) = 9 + 10 = 19." },
  { id: "y12a-c4-ic-d4-10", prompt: "f'(x) = 4x³ and f(1) = 2. Find C.", latex: "f'(x) = 4x^3, \\ f(1) = 2", marks: 2, difficulty: 4,
    answer: "1", explanation: "f(x) = x⁴ + C; f(1) = 1 + C = 2 ⇒ C = 1." },
];
const icD5: TopicTestQuestion[] = [
  { id: "y12a-c4-ic-d5-1", prompt: "f''(x) = 6x, f'(0) = 2 and f(0) = 1. Find f(1).", latex: "f''(x) = 6x, \\ f'(0) = 2, \\ f(0) = 1", marks: 4, difficulty: 5,
    answer: "4", explanation: "f'(x) = 3x² + 2 (since f'(0) = 2); f(x) = x³ + 2x + 1; f(1) = 1 + 2 + 1 = 4." },
  { id: "y12a-c4-ic-d5-2", prompt: "A particle has acceleration a = 6t − 2 and v(0) = 1. Find v(2).", latex: "a = 6t - 2, \\ v(0) = 1", marks: 4, difficulty: 5,
    answer: "9", explanation: "v = 3t² − 2t + 1; v(2) = 12 − 4 + 1 = 9." },
  { id: "y12a-c4-ic-d5-3", prompt: "A particle has acceleration a = 12t with v(0) = 0 and s(0) = 0. Find s(2).", latex: "a = 12t, \\ v(0)=0, \\ s(0)=0", marks: 4, difficulty: 5,
    answer: "16", explanation: "v = 6t², s = 2t³; s(2) = 16." },
  { id: "y12a-c4-ic-d5-4", prompt: "f'(x) = 3x² − 6x and f(2) = 5. Find f(0).", latex: "f'(x) = 3x^2 - 6x, \\ f(2) = 5", marks: 4, difficulty: 5,
    answer: "9", explanation: "f(x) = x³ − 3x² + C; f(2) = 8 − 12 + C = 5 ⇒ C = 9; f(0) = 9." },
  { id: "y12a-c4-ic-d5-5", prompt: "A curve has dy/dx = 2x − 4 and a minimum value of 1. Find C.", latex: "\\tfrac{dy}{dx} = 2x - 4, \\ y_{\\min} = 1", marks: 4, difficulty: 5,
    answer: "5", explanation: "Minimum where dy/dx = 0 ⇒ x = 2; y = x² − 4x + C, y(2) = C − 4 = 1 ⇒ C = 5." },
  { id: "y12a-c4-ic-d5-6", prompt: "f''(x) = 12x² and f'(1) = 5. Find f'(2).", latex: "f''(x) = 12x^2, \\ f'(1) = 5", marks: 4, difficulty: 5,
    answer: "33", explanation: "f'(x) = 4x³ + C₁; f'(1) = 4 + C₁ = 5 ⇒ C₁ = 1; f'(2) = 32 + 1 = 33." },
  { id: "y12a-c4-ic-d5-7", prompt: "A particle has velocity v = t² − 4t + 3 and s(0) = 2. Find s(3).", latex: "v = t^2 - 4t + 3, \\ s(0) = 2", marks: 4, difficulty: 5,
    answer: "2", explanation: "s = t³/3 − 2t² + 3t + 2; s(3) = 9 − 18 + 9 + 2 = 2." },
  { id: "y12a-c4-ic-d5-8", prompt: "A ball thrown up has acceleration a = −10, v(0) = 20, s(0) = 0. Find its height s at t = 2.", latex: "a = -10, \\ v(0) = 20, \\ s(0) = 0", marks: 4, difficulty: 5,
    answer: "20", explanation: "v = −10t + 20; s = −5t² + 20t; s(2) = −20 + 40 = 20." },
  { id: "y12a-c4-ic-d5-9", prompt: "A curve has dy/dx = 6x and passes through (1, 4). Find y when x = 2.", latex: "\\tfrac{dy}{dx} = 6x, \\ (1, 4)", marks: 3, difficulty: 5,
    answer: "13", explanation: "y = 3x² + C; 3 + C = 4 ⇒ C = 1; y(2) = 12 + 1 = 13." },
  { id: "y12a-c4-ic-d5-10", prompt: "f''(x) = 2, f'(3) = 4 and f(0) = 1. Find f(2).", latex: "f''(x) = 2, \\ f'(3) = 4, \\ f(0) = 1", marks: 4, difficulty: 5,
    answer: "1", explanation: "f'(x) = 2x + C₁; f'(3) = 6 + C₁ = 4 ⇒ C₁ = −2; f(x) = x² − 2x + C₂; f(0) = C₂ = 1; f(2) = 4 − 4 + 1 = 1." },
];

const todo = { d4: [] as TopicTestQuestion[], d5: [] as TopicTestQuestion[] };

export const integralCalculusPool: TopicTestPool = {
  courseSlug: "year-12-advanced",
  courseTitle: "Year 12 Mathematics Advanced",
  topicSlug: "ma-c4-integral-calculus",
  topicTitle: "Integral Calculus",
  subtopics: [
    {
      subtopicSlug: "antidifferentiation-reverse-power-rule",
      subtopicTitle: "Antidifferentiation and the Reverse Power Rule",
      remediationHref: href("antidifferentiation-reverse-power-rule"),
      d4: adD4,
      d5: adD5,
    },
    { subtopicSlug: "initial-conditions-particular-primitive", subtopicTitle: "Initial Conditions and Finding the Particular Primitive", remediationHref: href("initial-conditions-particular-primitive"), d4: icD4, d5: icD5 },
    { subtopicSlug: "standard-integrals", subtopicTitle: "Standard Integrals: Trigonometric, Exponential and Logarithmic Forms", remediationHref: href("standard-integrals"), ...todo },
    { subtopicSlug: "reverse-chain-rule", subtopicTitle: "Reverse Chain Rule and Simple Substitution Forms", remediationHref: href("reverse-chain-rule"), ...todo },
    { subtopicSlug: "definite-integrals-fundamental-theorem", subtopicTitle: "Definite Integrals and the Fundamental Theorem of Calculus", remediationHref: href("definite-integrals-fundamental-theorem"), ...todo },
    { subtopicSlug: "signed-area-total-area", subtopicTitle: "Signed Area and Total Area", remediationHref: href("signed-area-total-area"), ...todo },
    { subtopicSlug: "area-under-a-curve", subtopicTitle: "Area Under a Curve", remediationHref: href("area-under-a-curve"), ...todo },
    { subtopicSlug: "area-between-two-curves", subtopicTitle: "Area Between Two Curves", remediationHref: href("area-between-two-curves"), ...todo },
    { subtopicSlug: "trapezoidal-rule-area-approximation", subtopicTitle: "The Trapezoidal Rule and Area Approximation", remediationHref: href("trapezoidal-rule-area-approximation"), ...todo },
    { subtopicSlug: "applications-total-change-motion", subtopicTitle: "Applications of Integration: Total Change and Motion", remediationHref: href("applications-total-change-motion"), ...todo },
    { subtopicSlug: "mixed-integral-calculus-exam-practice", subtopicTitle: "Mixed Integral Calculus Exam Practice", remediationHref: href("mixed-integral-calculus-exam-practice"), d4: [], d5: [], d6: [] },
  ],
};
