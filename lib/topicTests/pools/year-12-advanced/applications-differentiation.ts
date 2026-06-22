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

// ── Subtopic 2: Stationary Point Classification ──────────────────────────────
const sptD4: TopicTestQuestion[] = [
  { id: "y12a-c3-spt-d4-1", prompt: "Find the x-coordinate of the stationary point of y = x² − 6x.", latex: "y = x^2 - 6x", marks: 2, difficulty: 4,
    answer: "3", explanation: "dy/dx = 2x − 6 = 0 ⇒ x = 3." },
  { id: "y12a-c3-spt-d4-2", prompt: "Classify the stationary point of y = x² − 6x.", latex: "y = x^2 - 6x", marks: 2, difficulty: 4,
    choices: [ { label: "A", text: "Minimum" }, { label: "B", text: "Maximum" }, { label: "C", text: "Horizontal inflection" }, { label: "D", text: "None" } ],
    answer: "A", explanation: "Upward parabola (f''(x) = 2 > 0), so a minimum." },
  { id: "y12a-c3-spt-d4-3", prompt: "Classify the stationary point of y = −x² + 4x (minimum or maximum).", latex: "y = -x^2 + 4x", marks: 2, difficulty: 4,
    answer: "maximum", acceptedAnswers: ["max"], explanation: "Downward parabola (f''(x) = −2 < 0), so a maximum." },
  { id: "y12a-c3-spt-d4-4", prompt: "Find the x-coordinate of the local maximum of y = x³ − 3x.", latex: "y = x^3 - 3x", marks: 3, difficulty: 4,
    answer: "-1", acceptedAnswers: ["−1"], explanation: "dy/dx = 3x² − 3 = 0 ⇒ x = ±1; the maximum is at x = −1 (f''(−1) < 0)." },
  { id: "y12a-c3-spt-d4-5", prompt: "Find the x-coordinate of the local minimum of y = x³ − 3x.", latex: "y = x^3 - 3x", marks: 3, difficulty: 4,
    answer: "1", explanation: "The minimum is at x = 1 (f''(1) > 0)." },
  { id: "y12a-c3-spt-d4-6", prompt: "Classify the stationary point of y = x³ at x = 0.", latex: "y = x^3", marks: 3, difficulty: 4,
    choices: [ { label: "A", text: "Horizontal point of inflection" }, { label: "B", text: "Local minimum" }, { label: "C", text: "Local maximum" }, { label: "D", text: "Discontinuity" } ],
    answer: "A", explanation: "dy/dx = 3x² does not change sign at x = 0, so it is a horizontal point of inflection — neither a max nor a min." },
  { id: "y12a-c3-spt-d4-7", prompt: "y = x³ − 6x² + 9x has two stationary points. Find the larger x-coordinate.", latex: "y = x^3 - 6x^2 + 9x", marks: 3, difficulty: 4,
    answer: "3", explanation: "dy/dx = 3x² − 12x + 9 = 3(x − 1)(x − 3) = 0 ⇒ x = 1 or 3; the larger is 3." },
  { id: "y12a-c3-spt-d4-8", prompt: "Find the positive stationary-point x-value of y = 2x³ − 6x.", latex: "y = 2x^3 - 6x", marks: 3, difficulty: 4,
    answer: "1", explanation: "dy/dx = 6x² − 6 = 0 ⇒ x = ±1; positive is 1." },
  { id: "y12a-c3-spt-d4-9", prompt: "Find the x-coordinate of the local minimum of y = x³ − 3x².", latex: "y = x^3 - 3x^2", marks: 3, difficulty: 4,
    answer: "2", explanation: "dy/dx = 3x² − 6x = 3x(x − 2) = 0 ⇒ x = 0 or 2; the minimum is at x = 2." },
  { id: "y12a-c3-spt-d4-10", prompt: "How many stationary points does y = x⁴ − 2x² have?", latex: "y = x^4 - 2x^2", marks: 3, difficulty: 4,
    answer: "3", explanation: "dy/dx = 4x³ − 4x = 4x(x² − 1) = 0 ⇒ x = 0, 1, −1: three stationary points." },
];
const sptD5: TopicTestQuestion[] = [
  { id: "y12a-c3-spt-d5-1", prompt: "Classify the stationary point of y = x³ − 6x² + 9x at x = 1 (minimum or maximum).", latex: "y = x^3 - 6x^2 + 9x", marks: 4, difficulty: 5,
    answer: "maximum", acceptedAnswers: ["max"], explanation: "dy/dx = 3(x − 1)(x − 3); at x = 1, dy/dx goes + to −, so a local maximum." },
  { id: "y12a-c3-spt-d5-2", prompt: "Find the local minimum value of y = x³ − 6x² + 9x.", latex: "y = x^3 - 6x^2 + 9x", marks: 4, difficulty: 5,
    answer: "0", explanation: "The minimum is at x = 3; y(3) = 27 − 54 + 27 = 0." },
  { id: "y12a-c3-spt-d5-3", prompt: "y = x³ + ax has a stationary point at x = 2. Find a.", latex: "y = x^3 + ax", marks: 4, difficulty: 5,
    answer: "-12", acceptedAnswers: ["−12"], explanation: "dy/dx = 3x² + a = 0 at x = 2 ⇒ 12 + a = 0 ⇒ a = −12." },
  { id: "y12a-c3-spt-d5-4", prompt: "Classify the stationary point of y = x⁴ − 2x² at x = 0 (minimum or maximum).", latex: "y = x^4 - 2x^2", marks: 4, difficulty: 5,
    answer: "maximum", acceptedAnswers: ["max"], explanation: "dy/dx = 4x³ − 4x = 4x(x−1)(x+1); at x = 0 it goes + to −, so a local maximum (between the two minima)." },
  { id: "y12a-c3-spt-d5-5", prompt: "Find the local maximum value of y = x³ − 12x.", latex: "y = x^3 - 12x", marks: 4, difficulty: 5,
    answer: "16", explanation: "Maximum at x = −2; y(−2) = −8 + 24 = 16." },
  { id: "y12a-c3-spt-d5-6", prompt: "Find the local minimum value of y = x³ − 3x.", latex: "y = x^3 - 3x", marks: 4, difficulty: 5,
    answer: "-2", acceptedAnswers: ["−2"], explanation: "Minimum at x = 1; y(1) = 1 − 3 = −2." },
  { id: "y12a-c3-spt-d5-7", prompt: "Find the x-coordinate of the stationary point of y = x² + 16/x (x > 0).", latex: "y = x^2 + \\tfrac{16}{x}", marks: 4, difficulty: 5,
    answer: "2", explanation: "dy/dx = 2x − 16/x² = 0 ⇒ 2x³ = 16 ⇒ x³ = 8 ⇒ x = 2." },
  { id: "y12a-c3-spt-d5-8", prompt: "Classify the stationary point of y = 2x³ − 3x² − 12x at x = 2 (minimum or maximum).", latex: "y = 2x^3 - 3x^2 - 12x", marks: 4, difficulty: 5,
    answer: "minimum", acceptedAnswers: ["min"], explanation: "dy/dx = 6x² − 6x − 12 = 6(x − 2)(x + 1); at x = 2 it goes − to +, so a local minimum." },
  { id: "y12a-c3-spt-d5-9", prompt: "y = x³ − px² has a stationary point at x = 4 (other than x = 0). Find p.", latex: "y = x^3 - px^2", marks: 4, difficulty: 5,
    answer: "6", explanation: "dy/dx = 3x² − 2px = x(3x − 2p) = 0; the non-zero root is x = 2p/3 = 4 ⇒ p = 6." },
  { id: "y12a-c3-spt-d5-10", prompt: "Find the difference between the local maximum and local minimum values of y = x³ − 3x² + 1.", latex: "y = x^3 - 3x^2 + 1", marks: 4, difficulty: 5,
    answer: "4", explanation: "Max at x = 0: y = 1. Min at x = 2: y = 8 − 12 + 1 = −3. Difference = 1 − (−3) = 4." },
];

// ── Subtopic 3: Curve Sketching with Calculus ────────────────────────────────
const csD4: TopicTestQuestion[] = [
  { id: "y12a-c3-cs-d4-1", prompt: "Find the larger x-intercept of y = x² − 5x + 6.", latex: "y = x^2 - 5x + 6", marks: 2, difficulty: 4,
    answer: "3", explanation: "(x − 2)(x − 3) = 0 ⇒ x = 2 or 3; the larger is 3." },
  { id: "y12a-c3-cs-d4-2", prompt: "Find the y-intercept of y = x² − 4x + 3.", latex: "y = x^2 - 4x + 3", marks: 2, difficulty: 4,
    answer: "3", explanation: "At x = 0, y = 3." },
  { id: "y12a-c3-cs-d4-3", prompt: "Find the sum of the x-intercepts of y = (x − 1)(x − 2)(x − 3).", latex: "y = (x-1)(x-2)(x-3)", marks: 2, difficulty: 4,
    answer: "6", explanation: "Roots are x = 1, 2, 3, so the sum is 6." },
  { id: "y12a-c3-cs-d4-4", prompt: "How many stationary points does y = x³ − 3x have?", latex: "y = x^3 - 3x", marks: 2, difficulty: 4,
    answer: "2", explanation: "dy/dx = 3x² − 3 = 0 has two solutions x = ±1." },
  { id: "y12a-c3-cs-d4-5", prompt: "How many x-intercepts does y = x² + 1 have?", latex: "y = x^2 + 1", marks: 2, difficulty: 4,
    choices: [ { label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "$2$" }, { label: "D", text: "$-1$" } ],
    answer: "A", explanation: "x² + 1 = 0 has no real solutions, so the curve never crosses the x-axis." },
  { id: "y12a-c3-cs-d4-6", prompt: "Find the x-intercept of y = (x + 2)².", latex: "y = (x+2)^2", marks: 2, difficulty: 4,
    answer: "-2", acceptedAnswers: ["−2"], explanation: "(x + 2)² = 0 ⇒ x = −2 (a double root — the curve touches the axis)." },
  { id: "y12a-c3-cs-d4-7", prompt: "As x → +∞, what happens to y = −x³?", latex: "y = -x^3", marks: 2, difficulty: 4,
    choices: [ { label: "A", text: "$y \\to -\\infty$" }, { label: "B", text: "$y \\to +\\infty$" }, { label: "C", text: "$y \\to 0$" }, { label: "D", text: "$y \\to -1$" } ],
    answer: "A", explanation: "Negative leading coefficient on an odd power: as x → +∞, y → −∞." },
  { id: "y12a-c3-cs-d4-8", prompt: "How many x-intercepts does y = x³ − 12x have?", latex: "y = x^3 - 12x", marks: 3, difficulty: 4,
    answer: "3", explanation: "x(x² − 12) = 0 ⇒ x = 0, ±√12: three x-intercepts." },
  { id: "y12a-c3-cs-d4-9", prompt: "Find the y-coordinate of the minimum turning point of y = x² − 6x.", latex: "y = x^2 - 6x", marks: 3, difficulty: 4,
    answer: "-9", acceptedAnswers: ["−9"], explanation: "Minimum at x = 3; y(3) = 9 − 18 = −9." },
  { id: "y12a-c3-cs-d4-10", prompt: "How many points of inflection does y = x³ have?", latex: "y = x^3", marks: 2, difficulty: 4,
    answer: "1", explanation: "f''(x) = 6x changes sign at x = 0: one point of inflection." },
];
const csD5: TopicTestQuestion[] = [
  { id: "y12a-c3-cs-d5-1", prompt: "Find the y-coordinate of the local maximum of y = x³ − 3x.", latex: "y = x^3 - 3x", marks: 4, difficulty: 5,
    answer: "2", explanation: "Local max at x = −1; y(−1) = −1 + 3 = 2." },
  { id: "y12a-c3-cs-d5-2", prompt: "How many distinct x-intercepts does y = x³ − 6x² + 9x have?", latex: "y = x^3 - 6x^2 + 9x", marks: 4, difficulty: 5,
    answer: "2", explanation: "x(x − 3)² = 0 ⇒ x = 0 and x = 3 (double): two distinct x-intercepts." },
  { id: "y12a-c3-cs-d5-3", prompt: "How many distinct x-intercepts does y = x⁴ − 4x² have?", latex: "y = x^4 - 4x^2", marks: 4, difficulty: 5,
    answer: "3", explanation: "x²(x² − 4) = 0 ⇒ x = 0, ±2: three distinct x-intercepts." },
  { id: "y12a-c3-cs-d5-4", prompt: "Find the y-coordinate of the minimum turning point of y = x³ − 3x².", latex: "y = x^3 - 3x^2", marks: 4, difficulty: 5,
    answer: "-4", acceptedAnswers: ["−4"], explanation: "Minimum at x = 2; y(2) = 8 − 12 = −4." },
  { id: "y12a-c3-cs-d5-5", prompt: "How many stationary points does y = x²(x − 3) have?", latex: "y = x^2(x-3)", marks: 4, difficulty: 5,
    answer: "2", explanation: "y = x³ − 3x², dy/dx = 3x² − 6x = 3x(x − 2): two stationary points." },
  { id: "y12a-c3-cs-d5-6", prompt: "Find the y-intercept of y = (x − 1)²(x + 2).", latex: "y = (x-1)^2(x+2)", marks: 3, difficulty: 5,
    answer: "2", explanation: "At x = 0: (−1)²(2) = 2." },
  { id: "y12a-c3-cs-d5-7", prompt: "The turning points of y = x³ − 12x are at x = −2 and x = 2. Find the distance between their x-values.", latex: "y = x^3 - 12x", marks: 4, difficulty: 5,
    answer: "4", explanation: "From x = −2 to x = 2 the distance is 4." },
  { id: "y12a-c3-cs-d5-8", prompt: "Find the x-coordinate of the local maximum of y = x³ + 3x² − 9x.", latex: "y = x^3 + 3x^2 - 9x", marks: 4, difficulty: 5,
    answer: "-3", acceptedAnswers: ["−3"], explanation: "dy/dx = 3(x + 3)(x − 1) = 0 ⇒ x = −3 (max) or 1 (min); the max is at x = −3." },
  { id: "y12a-c3-cs-d5-9", prompt: "Find the sum of the x-intercepts of y = x³ − x.", latex: "y = x^3 - x", marks: 4, difficulty: 5,
    answer: "0", explanation: "x(x − 1)(x + 1) = 0 ⇒ roots −1, 0, 1; sum = 0." },
  { id: "y12a-c3-cs-d5-10", prompt: "y = x³ − 3x + 2 has a repeated root. Find it.", latex: "y = x^3 - 3x + 2", marks: 4, difficulty: 5,
    answer: "1", explanation: "x³ − 3x + 2 = (x − 1)²(x + 2), so the repeated root is x = 1." },
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
      d4: sptD4,
      d5: sptD5,
    },
    {
      subtopicSlug: "curve-sketching-calculus",
      subtopicTitle: "Curve Sketching with Calculus",
      remediationHref: href("curve-sketching-calculus"),
      d4: csD4,
      d5: csD5,
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
