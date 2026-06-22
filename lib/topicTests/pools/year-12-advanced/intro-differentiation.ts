import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Mathematics Advanced · Introduction to Differentiation
 * (NESA MA-C1). This is the legacy/canonical Y12 Advanced course (routed under
 * /course/year-12-advanced/<unit>/<lesson>, outside the new catalog).
 *
 * Seven skill subtopics (D4 + D5), all auto-markable per
 * docs/QUESTION_AUTHORING_STANDARD.md. No exam-practice lesson in this unit; a D6
 * synoptic band is attached to the final subtopic (precedent: inverse-trig).
 *
 * Status: subtopic 1 "The Derivative as Rate of Change" — D4 + D5. Remaining
 * subtopics to follow. Not yet registered in index.ts (register once complete).
 */

const href = (lesson: string) =>
  `/course/year-12-advanced/ma-c1-introduction-to-differentiation/${lesson}`;

// ── Subtopic 1: The Derivative as Rate of Change ─────────────────────────────
// Average vs instantaneous rate, evaluating f'(x), interpreting the sign.
const rocD4: TopicTestQuestion[] = [
  {
    id: "y12a-c1-roc-d4-1",
    prompt: "Find the average rate of change of f(x) = x² from x = 1 to x = 3.",
    latex: "f(x) = x^2",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$4$" },
      { label: "B", text: "$2$" },
      { label: "C", text: "$8$" },
      { label: "D", text: "$5$" },
    ],
    answer: "A",
    explanation:
      "(f(3) − f(1))/(3 − 1) = (9 − 1)/2 = 4. C forgets to divide by the change in x.",
  },
  {
    id: "y12a-c1-roc-d4-2",
    prompt: "For f(x) = x², find the instantaneous rate of change at x = 3.",
    latex: "f(x) = x^2",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$6$" },
      { label: "B", text: "$9$" },
      { label: "C", text: "$4$" },
      { label: "D", text: "$3$" },
    ],
    answer: "A",
    explanation: "f'(x) = 2x, so f'(3) = 6. B gives f(3) instead of f'(3).",
  },
  {
    id: "y12a-c1-roc-d4-3",
    prompt: "For f(x) = x² − 4x, find the instantaneous rate of change at x = 5.",
    latex: "f(x) = x^2 - 4x",
    marks: 2,
    difficulty: 4,
    answer: "6",
    explanation: "f'(x) = 2x − 4, so f'(5) = 6.",
  },
  {
    id: "y12a-c1-roc-d4-4",
    prompt: "Find the average rate of change of f(x) = x³ from x = 0 to x = 2.",
    latex: "f(x) = x^3",
    marks: 2,
    difficulty: 4,
    answer: "4",
    explanation: "(8 − 0)/(2 − 0) = 4.",
  },
  {
    id: "y12a-c1-roc-d4-5",
    prompt: "For f(x) = 3x² + 2x, find f'(1).",
    latex: "f(x) = 3x^2 + 2x",
    marks: 2,
    difficulty: 4,
    answer: "8",
    explanation: "f'(x) = 6x + 2, so f'(1) = 8.",
  },
  {
    id: "y12a-c1-roc-d4-6",
    prompt:
      "For f(x) with f'(x) = 2x − 6, is the sign of the rate of change at x = 2 positive or negative?",
    latex: "f'(x) = 2x - 6",
    marks: 2,
    difficulty: 4,
    answer: "negative",
    acceptedAnswers: ["-ve", "neg"],
    explanation: "f'(2) = 2(2) − 6 = −2 < 0, so the rate is negative (f is decreasing there).",
  },
  {
    id: "y12a-c1-roc-d4-7",
    prompt: "For f(x) = x² − 6x, find the value of x where the instantaneous rate of change is 0.",
    latex: "f(x) = x^2 - 6x",
    marks: 3,
    difficulty: 4,
    answer: "3",
    explanation: "f'(x) = 2x − 6 = 0 ⇒ x = 3.",
  },
  {
    id: "y12a-c1-roc-d4-8",
    prompt: "Find the average rate of change of f(x) = 2x² + 1 from x = 1 to x = 4.",
    latex: "f(x) = 2x^2 + 1",
    marks: 3,
    difficulty: 4,
    answer: "10",
    explanation: "(f(4) − f(1))/(4 − 1) = (33 − 3)/3 = 10.",
  },
  {
    id: "y12a-c1-roc-d4-9",
    prompt: "Find the gradient of the tangent to y = x² at x = 4.",
    latex: "y = x^2",
    marks: 2,
    difficulty: 4,
    answer: "8",
    explanation: "dy/dx = 2x, so at x = 4 the gradient is 8.",
  },
  {
    id: "y12a-c1-roc-d4-10",
    prompt: "If f'(4) = −2, is f increasing or decreasing at x = 4? Answer 'increasing' or 'decreasing'.",
    latex: "f'(4) = -2",
    marks: 2,
    difficulty: 4,
    answer: "decreasing",
    acceptedAnswers: ["it is decreasing", "decreasing at x=4"],
    explanation: "A negative derivative means the function is decreasing at that point.",
  },
];

// D5: difference quotient / first principles, solving rate conditions, recovering
// a coefficient from a rate, and an MVT-style comparison.
const rocD5: TopicTestQuestion[] = [
  {
    id: "y12a-c1-roc-d5-1",
    prompt:
      "For f(x) = x², the average rate of change from x = 2 to x = 2 + h simplifies to 4 + h. Find it when h = 0.5.",
    latex: "\\tfrac{f(2+h) - f(2)}{h} = 4 + h",
    marks: 4,
    difficulty: 5,
    answer: "4.5",
    acceptedAnswers: ["9/2"],
    explanation: "((2.5)² − 4)/0.5 = (6.25 − 4)/0.5 = 4.5 = 4 + 0.5.",
  },
  {
    id: "y12a-c1-roc-d5-2",
    prompt:
      "Evaluate lim(h→0) [f(2+h) − f(2)]/h for f(x) = x² (the derivative at x = 2).",
    latex: "\\lim_{h\\to 0} \\tfrac{f(2+h)-f(2)}{h}",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation: "The limit is f'(2) = 2(2) = 4 (the difference quotient 4 + h → 4).",
  },
  {
    id: "y12a-c1-roc-d5-3",
    prompt: "For f(x) = x³ − 12x, find the positive x at which the instantaneous rate of change is 0.",
    latex: "f(x) = x^3 - 12x",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation: "f'(x) = 3x² − 12 = 0 ⇒ x² = 4 ⇒ x = 2 (positive).",
  },
  {
    id: "y12a-c1-roc-d5-4",
    prompt: "The average rate of change of f(x) = x² over [a, a + 2] equals 10. Find a.",
    latex: "\\tfrac{f(a+2) - f(a)}{2} = 10",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation: "((a+2)² − a²)/2 = (4a + 4)/2 = 2a + 2 = 10 ⇒ a = 4.",
  },
  {
    id: "y12a-c1-roc-d5-5",
    prompt: "A particle has position s(t) = t² − 4t. Find the time when its velocity (instantaneous rate) is 0.",
    latex: "s(t) = t^2 - 4t",
    marks: 3,
    difficulty: 5,
    answer: "2",
    explanation: "s'(t) = 2t − 4 = 0 ⇒ t = 2.",
  },
  {
    id: "y12a-c1-roc-d5-6",
    prompt:
      "For f(x) = x² on [1, 3], find the value c where the instantaneous rate equals the average rate over [1, 3].",
    latex: "f'(c) = \\tfrac{f(3)-f(1)}{2}",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation: "Average rate = 4; f'(c) = 2c = 4 ⇒ c = 2.",
  },
  {
    id: "y12a-c1-roc-d5-7",
    prompt: "For f(x) = x² + bx, the instantaneous rate of change at x = 2 is 7. Find b.",
    latex: "f(x) = x^2 + bx, \\ f'(2) = 7",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation: "f'(x) = 2x + b, so f'(2) = 4 + b = 7 ⇒ b = 3.",
  },
  {
    id: "y12a-c1-roc-d5-8",
    prompt: "For f(x) = ax², the instantaneous rate of change at x = 3 is 12. Find a.",
    latex: "f(x) = ax^2, \\ f'(3) = 12",
    marks: 3,
    difficulty: 5,
    answer: "2",
    explanation: "f'(x) = 2ax, so f'(3) = 6a = 12 ⇒ a = 2.",
  },
  {
    id: "y12a-c1-roc-d5-9",
    prompt:
      "For f(x) = x³, how many times larger is the instantaneous rate of change at x = 2 than at x = 1?",
    latex: "f(x) = x^3",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation: "f'(x) = 3x²; f'(2)/f'(1) = 12/3 = 4.",
  },
  {
    id: "y12a-c1-roc-d5-10",
    prompt: "Find the average rate of change of f(x) = √x from x = 1 to x = 4 (exact fraction).",
    latex: "f(x) = \\sqrt{x}",
    marks: 4,
    difficulty: 5,
    answer: "1/3",
    acceptedAnswers: ["0.333", "0.3333"],
    explanation: "(√4 − √1)/(4 − 1) = (2 − 1)/3 = 1/3.",
  },
];

const empty = { d4: [] as TopicTestQuestion[], d5: [] as TopicTestQuestion[] };

export const introDifferentiationPool: TopicTestPool = {
  courseSlug: "year-12-advanced",
  courseTitle: "Year 12 Mathematics Advanced",
  topicSlug: "ma-c1-introduction-to-differentiation",
  topicTitle: "Introduction to Differentiation",
  subtopics: [
    {
      subtopicSlug: "rate-of-change",
      subtopicTitle: "The Derivative as Rate of Change",
      remediationHref: href("rate-of-change"),
      d4: rocD4,
      d5: rocD5,
    },
    {
      subtopicSlug: "differentiating-polynomial-terms",
      subtopicTitle: "Differentiating Polynomial Terms",
      remediationHref: href("differentiating-polynomial-terms"),
      ...empty,
    },
    {
      subtopicSlug: "differentiating-polynomial-functions",
      subtopicTitle: "Differentiating Polynomial Functions",
      remediationHref: href("differentiating-polynomial-functions"),
      ...empty,
    },
    {
      subtopicSlug: "tangents-and-normals",
      subtopicTitle: "Tangents and Normals",
      remediationHref: href("tangents-and-normals"),
      ...empty,
    },
    {
      subtopicSlug: "stationary-points",
      subtopicTitle: "Stationary Points",
      remediationHref: href("stationary-points"),
      ...empty,
    },
    {
      subtopicSlug: "increasing-decreasing-functions",
      subtopicTitle: "Increasing and Decreasing Functions",
      remediationHref: href("increasing-decreasing-functions"),
      ...empty,
    },
    {
      subtopicSlug: "first-derivative-test",
      subtopicTitle: "First Derivative Test",
      remediationHref: href("first-derivative-test"),
      ...empty,
    },
  ],
};
