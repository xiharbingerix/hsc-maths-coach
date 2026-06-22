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
 * Status: subtopic 1 "Antidifferentiation and the Reverse Power Rule" — D4 + D5,
 * authored and audited. Remaining subtopics to follow; not yet registered.
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
    { subtopicSlug: "indefinite-integrals-constant-of-integration", subtopicTitle: "Indefinite Integrals and the Constant of Integration", remediationHref: href("indefinite-integrals-constant-of-integration"), ...todo },
    { subtopicSlug: "initial-conditions-particular-primitive", subtopicTitle: "Initial Conditions and Finding the Particular Primitive", remediationHref: href("initial-conditions-particular-primitive"), ...todo },
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
