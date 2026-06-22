import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Mathematics Advanced · Applications of Differentiation
 * (NESA MA-C3). Legacy/canonical course, routed
 * /course/year-12-advanced/ma-c3-applications-of-differentiation/<lesson>.
 *
 * MA-C3 in the legacy data merges an older 5-lesson set with a newer, more
 * granular 6-lesson set (the duplicate `optimisation` slug is the seam). This pool
 * uses the NEWER/canonical set — the one newCourseCatalog.ts references with
 * stableSkillIds — all verified route-reachable. `optimisation` resolves to the
 * live "Optimisation Problems" lesson.
 *
 * Status: subtopic 1 "Second Derivative, Concavity and Points of Inflection" —
 * D4 + D5, authored and audited. Remaining subtopics to follow; not yet registered.
 */

const href = (lesson: string) =>
  `/course/year-12-advanced/ma-c3-applications-of-differentiation/${lesson}`;

// ── Subtopic 1: Second Derivative, Concavity and Points of Inflection ────────
const concD4: TopicTestQuestion[] = [
  { id: "y12a-c3-conc-d4-1", prompt: "For f(x) = x³, find f''(2).", latex: "f(x) = x^3", marks: 2, difficulty: 4,
    answer: "12", explanation: "f'(x) = 3x², f''(x) = 6x; f''(2) = 12." },
  { id: "y12a-c3-conc-d4-2", prompt: "For f(x) = x³ − 3x², find f''(0).", latex: "f(x) = x^3 - 3x^2", marks: 2, difficulty: 4,
    answer: "-6", acceptedAnswers: ["−6"], explanation: "f'(x) = 3x² − 6x, f''(x) = 6x − 6; f''(0) = −6." },
  { id: "y12a-c3-conc-d4-3", prompt: "For f(x) = 2x² + 3x, find f''(x).", latex: "f(x) = 2x^2 + 3x", marks: 2, difficulty: 4,
    answer: "4", explanation: "f'(x) = 4x + 3, f''(x) = 4 (constant)." },
  { id: "y12a-c3-conc-d4-4", prompt: "For f(x) = x³ + x, is the curve concave up or down at x = −1? Answer 'up' or 'down'.", latex: "f(x) = x^3 + x", marks: 2, difficulty: 4,
    answer: "down", acceptedAnswers: ["concave down", "concave-down", "downwards"], explanation: "f''(x) = 6x; f''(−1) = −6 < 0, so the curve is concave down at x = −1." },
  { id: "y12a-c3-conc-d4-5", prompt: "For f(x) = x³, is the curve concave up or concave down at x = 2?", latex: "f(x) = x^3", marks: 2, difficulty: 4,
    choices: [ { label: "A", text: "Concave up" }, { label: "B", text: "Concave down" }, { label: "C", text: "Neither" }, { label: "D", text: "A straight line" } ],
    answer: "A", explanation: "f''(2) = 12 > 0, so the curve is concave up at x = 2." },
  { id: "y12a-c3-conc-d4-6", prompt: "Find the x-coordinate of the point of inflection of y = x³.", latex: "y = x^3", marks: 3, difficulty: 4,
    answer: "0", explanation: "f''(x) = 6x = 0 at x = 0, and f'' changes sign there, so x = 0 is a point of inflection." },
  { id: "y12a-c3-conc-d4-7", prompt: "Find the x-coordinate of the point of inflection of y = x³ − 6x².", latex: "y = x^3 - 6x^2", marks: 3, difficulty: 4,
    answer: "2", explanation: "f''(x) = 6x − 12 = 0 ⇒ x = 2 (with a sign change)." },
  { id: "y12a-c3-conc-d4-8", prompt: "If f''(x) = 2x − 4, the curve is concave up for x > k. Find k.", latex: "f''(x) = 2x - 4", marks: 3, difficulty: 4,
    answer: "2", explanation: "Concave up ⇒ f''(x) > 0 ⇒ 2x − 4 > 0 ⇒ x > 2." },
  { id: "y12a-c3-conc-d4-9", prompt: "Classify the stationary point of y = x² − 4x using the second derivative.", latex: "y = x^2 - 4x", marks: 3, difficulty: 4,
    choices: [ { label: "A", text: "Minimum" }, { label: "B", text: "Maximum" }, { label: "C", text: "Point of inflection" }, { label: "D", text: "Cannot tell" } ],
    answer: "A", explanation: "f''(x) = 2 > 0, so the stationary point is a minimum." },
  { id: "y12a-c3-conc-d4-10", prompt: "If f''(x) = 6x, the curve is concave down for x < k. Find k.", latex: "f''(x) = 6x", marks: 3, difficulty: 4,
    answer: "0", explanation: "Concave down ⇒ f''(x) < 0 ⇒ 6x < 0 ⇒ x < 0." },
];
const concD5: TopicTestQuestion[] = [
  { id: "y12a-c3-conc-d5-1", prompt: "Find the positive x-coordinate of a point of inflection of y = x⁴ − 6x².", latex: "y = x^4 - 6x^2", marks: 4, difficulty: 5,
    answer: "1", explanation: "f''(x) = 12x² − 12 = 0 ⇒ x² = 1 ⇒ x = ±1; positive is 1." },
  { id: "y12a-c3-conc-d5-2", prompt: "y = x⁴ − 4x³ has two points of inflection. Find the larger x-coordinate.", latex: "y = x^4 - 4x^3", marks: 4, difficulty: 5,
    answer: "2", explanation: "f''(x) = 12x² − 24x = 12x(x − 2) = 0 ⇒ x = 0 or 2 (both with sign changes); the larger is 2." },
  { id: "y12a-c3-conc-d5-3", prompt: "y = x³ + ax² has a point of inflection at x = 1. Find a.", latex: "y = x^3 + ax^2", marks: 4, difficulty: 5,
    answer: "-3", acceptedAnswers: ["−3"], explanation: "f''(x) = 6x + 2a = 0 at x = 1 ⇒ 6 + 2a = 0 ⇒ a = −3." },
  { id: "y12a-c3-conc-d5-4", prompt: "Find the y-coordinate of the point of inflection of y = x³ − 6x² + 5.", latex: "y = x^3 - 6x^2 + 5", marks: 4, difficulty: 5,
    answer: "-11", acceptedAnswers: ["−11"], explanation: "Inflection at x = 2 (f''=6x−12=0); y(2) = 8 − 24 + 5 = −11." },
  { id: "y12a-c3-conc-d5-5", prompt: "For y = x³ − 6x² + 9x, find d²y/dx² at the stationary point x = 3.", latex: "y = x^3 - 6x^2 + 9x", marks: 4, difficulty: 5,
    answer: "6", explanation: "f''(x) = 6x − 12; f''(3) = 6 (> 0, so x = 3 is a minimum)." },
  { id: "y12a-c3-conc-d5-6", prompt: "Classify the stationary point of y = x³ − 12x at x = 2 using the second derivative.", latex: "y = x^3 - 12x", marks: 4, difficulty: 5,
    answer: "minimum", acceptedAnswers: ["min"], explanation: "f''(x) = 6x; f''(2) = 12 > 0, so x = 2 is a minimum." },
  { id: "y12a-c3-conc-d5-7", prompt: "Find the x-coordinate of the point of inflection of y = 2x³ − 9x² + 12x (exact fraction).", latex: "y = 2x^3 - 9x^2 + 12x", marks: 4, difficulty: 5,
    answer: "3/2", acceptedAnswers: ["1.5"], explanation: "f''(x) = 12x − 18 = 0 ⇒ x = 3/2." },
  { id: "y12a-c3-conc-d5-8", prompt: "Is x = 0 a point of inflection of y = x⁴? Answer 'yes' or 'no'.", latex: "y = x^4", marks: 4, difficulty: 5,
    answer: "no", acceptedAnswers: ["it is a minimum", "no it is a minimum"], explanation: "f''(x) = 12x² ≥ 0 with no sign change at x = 0, so it is not a point of inflection (it is a minimum)." },
  { id: "y12a-c3-conc-d5-9", prompt: "The curve y = x³ − 3x² is concave up for x > k. Find k.", latex: "y = x^3 - 3x^2", marks: 4, difficulty: 5,
    answer: "1", explanation: "f''(x) = 6x − 6 > 0 ⇒ x > 1." },
  { id: "y12a-c3-conc-d5-10", prompt: "y = x³ − kx² has a point of inflection at x = 2. Find k.", latex: "y = x^3 - kx^2", marks: 4, difficulty: 5,
    answer: "6", explanation: "f''(x) = 6x − 2k = 0 at x = 2 ⇒ 12 − 2k = 0 ⇒ k = 6." },
];

const todo = { d4: [] as TopicTestQuestion[], d5: [] as TopicTestQuestion[] };

export const applicationsDifferentiationPool: TopicTestPool = {
  courseSlug: "year-12-advanced",
  courseTitle: "Year 12 Mathematics Advanced",
  topicSlug: "ma-c3-applications-of-differentiation",
  topicTitle: "Applications of Differentiation",
  subtopics: [
    {
      subtopicSlug: "second-derivative-concavity",
      subtopicTitle: "Second Derivative, Concavity and Points of Inflection",
      remediationHref: href("second-derivative-concavity"),
      d4: concD4,
      d5: concD5,
    },
    {
      subtopicSlug: "stationary-point-classification",
      subtopicTitle: "Stationary Point Classification",
      remediationHref: href("stationary-point-classification"),
      ...todo,
    },
    {
      subtopicSlug: "curve-sketching-calculus",
      subtopicTitle: "Curve Sketching with Calculus",
      remediationHref: href("curve-sketching-calculus"),
      ...todo,
    },
    {
      subtopicSlug: "optimisation",
      subtopicTitle: "Optimisation Problems",
      remediationHref: href("optimisation"),
      ...todo,
    },
    {
      subtopicSlug: "kinematics-rates-change",
      subtopicTitle: "Kinematics and Rates of Change",
      remediationHref: href("kinematics-rates-change"),
      ...todo,
    },
    {
      subtopicSlug: "applications-differentiation-exam-practice",
      subtopicTitle: "Applications of Differentiation Exam Practice",
      remediationHref: href("applications-differentiation-exam-practice"),
      d4: [],
      d5: [],
      d6: [],
    },
  ],
};
