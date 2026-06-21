import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Introduction to Vectors.
 *
 * Seven skill subtopics (D4 + D5), all auto-markable per
 * docs/QUESTION_AUTHORING_STANDARD.md. Subtopic 5 (vectors-projection) is the
 * "Proof of the Projection Formula" lesson — it carries the topic's computational
 * D4/D5 AND a few free-response proof items graded by the AI proof marker
 * (responseType:"proof"); those are only drawn when PROOF_MARKER_ENABLED is set
 * (the assembler filters them out otherwise). The "Prior Knowledge Revision"
 * lesson is excluded.
 *
 * Status: subtopic 1 "Vectors, Scalars and Notation" — D4 + D5. Remaining
 * subtopics to follow. Not yet registered in index.ts (register once complete).
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/vectors/${lesson}`;

// ── Subtopic 1: Vectors, Scalars and Notation ────────────────────────────────
// Magnitude, unit vectors, components, vectors between points, parallel test.
const notationD4: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-not-d4-1",
    prompt: "Find the magnitude of the vector (3, 4).",
    latex: "\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "|(3,4)| = √(3² + 4²) = √25 = 5.",
  },
  {
    id: "y12e1-vec-not-d4-2",
    prompt: "Find the magnitude of the vector (8, 15).",
    latex: "\\begin{pmatrix} 8 \\\\ 15 \\end{pmatrix}",
    marks: 2,
    difficulty: 4,
    answer: "17",
    explanation: "√(8² + 15²) = √289 = 17.",
  },
  {
    id: "y12e1-vec-not-d4-3",
    prompt: "Find the distance from A(1, 2) to B(7, 10).",
    latex: "A(1, 2), \\ B(7, 10)",
    marks: 2,
    difficulty: 4,
    answer: "10",
    explanation: "AB = (6, 8), so |AB| = √(36 + 64) = √100 = 10.",
  },
  {
    id: "y12e1-vec-not-d4-4",
    prompt:
      "Find the i-component of the unit vector in the direction of (6, 8).",
    latex: "\\hat{u} \\text{ of } (6, 8)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$0.6$" },
      { label: "B", text: "$6$" },
      { label: "C", text: "$0.75$" },
      { label: "D", text: "$0.8$" },
    ],
    answer: "A",
    explanation:
      "|(6,8)| = 10, so û = (6,8)/10 = (0.6, 0.8); the i-component is 0.6. B forgets to divide by the magnitude; D is the j-component.",
  },
  {
    id: "y12e1-vec-not-d4-5",
    prompt:
      "A vector of magnitude 10 points in the direction of (3, 4). Find its i-component.",
    latex: "|v| = 10 \\text{ along } (3, 4)",
    marks: 3,
    difficulty: 4,
    answer: "6",
    explanation: "Unit vector (3,4)/5 = (0.6, 0.8); v = 10(0.6, 0.8) = (6, 8), so the i-component is 6.",
  },
  {
    id: "y12e1-vec-not-d4-6",
    prompt: "If a = (2, −3), find |3a| (exact form).",
    latex: "a = (2, -3)",
    marks: 2,
    difficulty: 4,
    answer: "3sqrt(13)",
    acceptedAnswers: ["3√13", "10.817", "10.82"],
    explanation: "|3a| = 3|a| = 3√(4 + 9) = 3√13.",
  },
  {
    id: "y12e1-vec-not-d4-7",
    prompt: "Find the value of k for which (k, 3) is parallel to (4, 6).",
    latex: "(k, 3) \\parallel (4, 6)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$2$" },
      { label: "B", text: "$\\dfrac{1}{2}$" },
      { label: "C", text: "$6$" },
      { label: "D", text: "$9$" },
    ],
    answer: "A",
    explanation: "Parallel ⇒ k/4 = 3/6 = 1/2, so k = 2. B inverts the ratio.",
  },
  {
    id: "y12e1-vec-not-d4-8",
    prompt: "Find the magnitude of 7i − 24j.",
    latex: "7\\mathbf{i} - 24\\mathbf{j}",
    marks: 2,
    difficulty: 4,
    answer: "25",
    explanation: "√(7² + 24²) = √625 = 25.",
  },
  {
    id: "y12e1-vec-not-d4-9",
    prompt: "Find the distance from A(2, 5) to B(−1, 1).",
    latex: "A(2, 5), \\ B(-1, 1)",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "AB = (−3, −4), so |AB| = √(9 + 16) = 5.",
  },
  {
    id: "y12e1-vec-not-d4-10",
    prompt:
      "Find the j-component of the unit vector in the direction of (−5, 12) (exact fraction).",
    latex: "\\hat{u} \\text{ of } (-5, 12)",
    marks: 3,
    difficulty: 4,
    answer: "12/13",
    acceptedAnswers: ["0.923", "0.9231"],
    explanation: "|(−5,12)| = 13, so û = (−5,12)/13; the j-component is 12/13.",
  },
];

// D5: solve for an unknown component given a magnitude, midpoint / section /
// parallelogram constructions, parallel and equal-vector conditions.
const notationD5: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-not-d5-1",
    prompt: "Find the positive value of k for which |(k, 4)| = 5.",
    latex: "|(k, 4)| = 5",
    marks: 3,
    difficulty: 5,
    answer: "3",
    explanation: "k² + 16 = 25 ⇒ k² = 9 ⇒ k = 3 (taking k > 0).",
  },
  {
    id: "y12e1-vec-not-d5-2",
    prompt: "Find the positive value of t for which |(t, t + 1)| = √5.",
    latex: "|(t, t + 1)| = \\sqrt{5}",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation:
      "t² + (t+1)² = 5 ⇒ 2t² + 2t − 4 = 0 ⇒ t² + t − 2 = 0 ⇒ (t+2)(t−1) = 0 ⇒ t = 1.",
  },
  {
    id: "y12e1-vec-not-d5-3",
    prompt:
      "A(1, 2) and B(5, 10). Find the magnitude of the position vector of the midpoint M of AB (exact form).",
    latex: "A(1, 2), \\ B(5, 10)",
    marks: 4,
    difficulty: 5,
    answer: "3sqrt(5)",
    acceptedAnswers: ["3√5", "6.708", "6.7082"],
    explanation: "M = (3, 6), so |OM| = √(9 + 36) = √45 = 3√5.",
  },
  {
    id: "y12e1-vec-not-d5-4",
    prompt:
      "A vector of magnitude 15 points in the direction of (−3, 4). Find its j-component.",
    latex: "|v| = 15 \\text{ along } (-3, 4)",
    marks: 3,
    difficulty: 5,
    answer: "12",
    explanation: "Unit vector (−3,4)/5; v = 15(−3,4)/5 = (−9, 12), so the j-component is 12.",
  },
  {
    id: "y12e1-vec-not-d5-5",
    prompt:
      "P divides AB in the ratio 1:2, where A(0, 0) and B(6, 9). Find the magnitude of OP (exact form).",
    latex: "AP:PB = 1:2, \\ A(0,0), \\ B(6,9)",
    marks: 4,
    difficulty: 5,
    answer: "sqrt(13)",
    acceptedAnswers: ["√13", "3.606", "3.6056"],
    explanation: "P = A + ⅓·AB = (2, 3), so |OP| = √(4 + 9) = √13.",
  },
  {
    id: "y12e1-vec-not-d5-6",
    prompt: "Find the value of k for which (k, k − 1) is parallel to (3, 1).",
    latex: "(k, k - 1) \\parallel (3, 1)",
    marks: 4,
    difficulty: 5,
    answer: "3/2",
    acceptedAnswers: ["1.5"],
    explanation: "Parallel ⇒ k(1) = 3(k − 1) ⇒ k = 3k − 3 ⇒ 2k = 3 ⇒ k = 3/2.",
  },
  {
    id: "y12e1-vec-not-d5-7",
    prompt:
      "The vectors (a + 1, 5) and (3, b − 2) are equal. Find a + b.",
    latex: "(a + 1, 5) = (3, b - 2)",
    marks: 3,
    difficulty: 5,
    answer: "9",
    explanation: "a + 1 = 3 ⇒ a = 2; b − 2 = 5 ⇒ b = 7; a + b = 9.",
  },
  {
    id: "y12e1-vec-not-d5-8",
    prompt:
      "ABCD is a parallelogram with A(0, 0), B(3, 1) and C(5, 4). Find the i-component of D.",
    latex: "ABCD \\text{ parallelogram}",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation:
      "In parallelogram ABCD, D = A + C − B = (0 + 5 − 3, 0 + 4 − 1) = (2, 3), so the i-component is 2.",
  },
  {
    id: "y12e1-vec-not-d5-9",
    prompt:
      "B(4, 5) is the midpoint of AC, where A(1, 1). Find the i-component of C.",
    latex: "B \\text{ midpoint of } AC",
    marks: 4,
    difficulty: 5,
    answer: "7",
    explanation: "C = 2B − A = (8 − 1, 10 − 1) = (7, 9), so the i-component is 7.",
  },
  {
    id: "y12e1-vec-not-d5-10",
    prompt:
      "A vector v = (a, a) with a > 0 has magnitude 10. Find a (exact form).",
    latex: "v = (a, a), \\ |v| = 10",
    marks: 4,
    difficulty: 5,
    answer: "5sqrt(2)",
    acceptedAnswers: ["5√2", "7.071", "7.0711"],
    explanation: "2a² = 100 ⇒ a² = 50 ⇒ a = √50 = 5√2.",
  },
];

// ── Subtopic 2: Vector Addition and Subtraction ──────────────────────────────
// Component sums/differences, scalar multiples, linear combinations, resultants.
const additionD4: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-add-d4-1",
    prompt: "a = (2, 3) and b = (1, 4). Find the i-component of a + b.",
    latex: "a = (2,3), \\ b = (1,4)",
    marks: 2,
    difficulty: 4,
    answer: "3",
    explanation: "a + b = (3, 7); the i-component is 3.",
  },
  {
    id: "y12e1-vec-add-d4-2",
    prompt: "a = (5, 1) and b = (2, −3). Find |a − b|.",
    latex: "a = (5,1), \\ b = (2,-3)",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "a − b = (3, 4), so |a − b| = √(9 + 16) = 5.",
  },
  {
    id: "y12e1-vec-add-d4-3",
    prompt: "a = (1, 2) and b = (3, −1). Find |2a + b| (exact form).",
    latex: "a = (1,2), \\ b = (3,-1)",
    marks: 3,
    difficulty: 4,
    answer: "sqrt(34)",
    acceptedAnswers: ["√34", "5.831", "5.8310"],
    explanation: "2a + b = (5, 3), so |2a + b| = √(25 + 9) = √34.",
  },
  {
    id: "y12e1-vec-add-d4-4",
    prompt: "a = (4, 0) and b = (0, 3). Find |a + b|.",
    latex: "a = (4,0), \\ b = (0,3)",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "a + b = (4, 3), so |a + b| = 5.",
  },
  {
    id: "y12e1-vec-add-d4-5",
    prompt: "a = (6, 8) and b = (−6, −8). Find |a + b|.",
    latex: "a = (6,8), \\ b = (-6,-8)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$0$" },
      { label: "B", text: "$20$" },
      { label: "C", text: "$10$" },
      { label: "D", text: "$28$" },
    ],
    answer: "A",
    explanation:
      "a + b = (0, 0), so |a + b| = 0 (b is the opposite of a). B wrongly adds the magnitudes.",
  },
  {
    id: "y12e1-vec-add-d4-6",
    prompt: "a = (3, 4). Find |2a|.",
    latex: "a = (3,4)",
    marks: 2,
    difficulty: 4,
    answer: "10",
    explanation: "|2a| = 2|a| = 2(5) = 10.",
  },
  {
    id: "y12e1-vec-add-d4-7",
    prompt: "a = (1, 5) and b = (4, 1). Find the i-component of a − b.",
    latex: "a = (1,5), \\ b = (4,1)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$-3$" },
      { label: "B", text: "$3$" },
      { label: "C", text: "$5$" },
      { label: "D", text: "$-4$" },
    ],
    answer: "A",
    explanation: "a − b = (−3, 4); the i-component is −3. B computes b − a.",
  },
  {
    id: "y12e1-vec-add-d4-8",
    prompt: "a = (2, −1), b = (−3, 4) and c = (1, 1). Find |a + b + c|.",
    latex: "a + b + c",
    marks: 3,
    difficulty: 4,
    answer: "4",
    explanation: "a + b + c = (0, 4), so the magnitude is 4.",
  },
  {
    id: "y12e1-vec-add-d4-9",
    prompt: "a = (7, 2) and b = (3, 2). Find the j-component of a − b.",
    latex: "a = (7,2), \\ b = (3,2)",
    marks: 2,
    difficulty: 4,
    answer: "0",
    explanation: "a − b = (4, 0); the j-component is 0.",
  },
  {
    id: "y12e1-vec-add-d4-10",
    prompt: "a = (1, 1) and b = (2, 2). Find |a + b| (exact form).",
    latex: "a = (1,1), \\ b = (2,2)",
    marks: 2,
    difficulty: 4,
    answer: "3sqrt(2)",
    acceptedAnswers: ["3√2", "4.243", "4.2426"],
    explanation: "a + b = (3, 3), so |a + b| = √18 = 3√2.",
  },
];

// D5: solve for an unknown vector/scalar, parallel sums/differences, linear
// systems, equilibrium, diagonals and collinearity.
const additionD5: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-add-d5-1",
    prompt: "a = (2, 5) and b = (7, 1). Find |x| where a + x = b (exact form).",
    latex: "a + x = b",
    marks: 3,
    difficulty: 5,
    answer: "sqrt(41)",
    acceptedAnswers: ["√41", "6.403", "6.4031"],
    explanation: "x = b − a = (5, −4), so |x| = √(25 + 16) = √41.",
  },
  {
    id: "y12e1-vec-add-d5-2",
    prompt:
      "a = (3, 2) and b = (1, −1). Find t so that a + tb is parallel to the x-axis.",
    latex: "a + tb \\parallel x\\text{-axis}",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation:
      "a + tb = (3 + t, 2 − t). Parallel to the x-axis ⇒ j-component 0 ⇒ 2 − t = 0 ⇒ t = 2.",
  },
  {
    id: "y12e1-vec-add-d5-3",
    prompt:
      "a = (2, 3) and b = (4, k). If a + b is parallel to (1, 1), find k.",
    latex: "a + b \\parallel (1, 1)",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation: "a + b = (6, 3 + k). Parallel to (1,1) ⇒ 6 = 3 + k ⇒ k = 3.",
  },
  {
    id: "y12e1-vec-add-d5-4",
    prompt:
      "a = (1, 2) and b = (3, 1). Find s + t where sa + tb = (5, 5).",
    latex: "sa + tb = (5, 5)",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation:
      "s + 3t = 5 and 2s + t = 5 ⇒ s = 2, t = 1 ⇒ s + t = 3.",
  },
  {
    id: "y12e1-vec-add-d5-5",
    prompt:
      "Three forces (2, 3), (−1, 4) and (k, m) are in equilibrium (sum to zero). Find k.",
    latex: "(2,3) + (-1,4) + (k,m) = 0",
    marks: 3,
    difficulty: 5,
    answer: "-1",
    acceptedAnswers: ["−1"],
    explanation: "2 − 1 + k = 0 ⇒ k = −1.",
  },
  {
    id: "y12e1-vec-add-d5-6",
    prompt:
      "In parallelogram ABCD, AB = (3, 1) and AD = (2, 4). Find |AC| (exact form).",
    latex: "AB = (3,1), \\ AD = (2,4)",
    marks: 4,
    difficulty: 5,
    answer: "5sqrt(2)",
    acceptedAnswers: ["5√2", "7.071", "7.0711"],
    explanation: "AC = AB + AD = (5, 5), so |AC| = √50 = 5√2.",
  },
  {
    id: "y12e1-vec-add-d5-7",
    prompt:
      "a = (k, 6) and b = (2, 4). If a − b is parallel to (1, 4), find k.",
    latex: "a - b \\parallel (1, 4)",
    marks: 4,
    difficulty: 5,
    answer: "5/2",
    acceptedAnswers: ["2.5"],
    explanation:
      "a − b = (k − 2, 2). Parallel to (1,4) ⇒ (k − 2)/1 = 2/4 ⇒ k − 2 = ½ ⇒ k = 5/2.",
  },
  {
    id: "y12e1-vec-add-d5-8",
    prompt:
      "Forces (5, 0) and (0, 12) act on a body. Find the magnitude of the extra force needed for equilibrium.",
    latex: "(5,0) + (0,12) + F = 0",
    marks: 4,
    difficulty: 5,
    answer: "13",
    explanation: "F = −(5, 12), so |F| = √(25 + 144) = 13.",
  },
  {
    id: "y12e1-vec-add-d5-9",
    prompt: "a = (2, 1) and b = (1, 3). Find |2a − 3b| (exact form).",
    latex: "a = (2,1), \\ b = (1,3)",
    marks: 4,
    difficulty: 5,
    answer: "5sqrt(2)",
    acceptedAnswers: ["5√2", "7.071", "7.0711"],
    explanation: "2a − 3b = (1, −7), so |2a − 3b| = √50 = 5√2.",
  },
  {
    id: "y12e1-vec-add-d5-10",
    prompt:
      "A(1, 2), B(4, 3) and C(10, 5) are collinear. Find k where BC = k·AB.",
    latex: "A(1,2), \\ B(4,3), \\ C(10,5)",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation: "AB = (3, 1) and BC = (6, 2) = 2(3, 1), so k = 2.",
  },
];

// ── Subtopic 3: The Dot Product ──────────────────────────────────────────────
// a·b = x₁x₂ + y₁y₂ = |a||b|cosθ; perpendicularity (a·b = 0); angle between.
const dotD4: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-dot-d4-1",
    prompt: "Find (3, 4) · (2, 1).",
    latex: "(3,4) \\cdot (2,1)",
    marks: 2,
    difficulty: 4,
    answer: "10",
    explanation: "(3)(2) + (4)(1) = 6 + 4 = 10.",
  },
  {
    id: "y12e1-vec-dot-d4-2",
    prompt: "Find (5, −2) · (1, 3).",
    latex: "(5,-2) \\cdot (1,3)",
    marks: 2,
    difficulty: 4,
    answer: "-1",
    acceptedAnswers: ["−1"],
    explanation: "(5)(1) + (−2)(3) = 5 − 6 = −1.",
  },
  {
    id: "y12e1-vec-dot-d4-3",
    prompt: "Find (2, 3) · (2, 3).",
    latex: "(2,3) \\cdot (2,3)",
    marks: 2,
    difficulty: 4,
    answer: "13",
    explanation: "a·a = |a|² = 4 + 9 = 13.",
  },
  {
    id: "y12e1-vec-dot-d4-4",
    prompt: "Find k so that (2, k) is perpendicular to (4, −3).",
    latex: "(2, k) \\perp (4, -3)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{8}{3}$" },
      { label: "B", text: "$-\\dfrac{8}{3}$" },
      { label: "C", text: "$\\dfrac{3}{8}$" },
      { label: "D", text: "$6$" },
    ],
    answer: "A",
    explanation: "Perpendicular ⇒ dot = 0 ⇒ 8 − 3k = 0 ⇒ k = 8/3. B has the wrong sign.",
  },
  {
    id: "y12e1-vec-dot-d4-5",
    prompt: "Find (1, 0) · (0, 1).",
    latex: "(1,0) \\cdot (0,1)",
    marks: 2,
    difficulty: 4,
    answer: "0",
    explanation: "(1)(0) + (0)(1) = 0 — the axes are perpendicular.",
  },
  {
    id: "y12e1-vec-dot-d4-6",
    prompt:
      "a·b = 12, |a| = 3 and |b| = 8. Find cos θ, the cosine of the angle between them.",
    latex: "a \\cdot b = |a||b|\\cos\\theta",
    marks: 3,
    difficulty: 4,
    answer: "0.5",
    acceptedAnswers: ["1/2"],
    explanation: "cos θ = (a·b)/(|a||b|) = 12/24 = 0.5.",
  },
  {
    id: "y12e1-vec-dot-d4-7",
    prompt: "Find (6, 8) · (8, −6).",
    latex: "(6,8) \\cdot (8,-6)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$0$" },
      { label: "B", text: "$96$" },
      { label: "C", text: "$48$" },
      { label: "D", text: "$-96$" },
    ],
    answer: "A",
    explanation: "48 + (−48) = 0 (the vectors are perpendicular). B adds the magnitudes of the terms.",
  },
  {
    id: "y12e1-vec-dot-d4-8",
    prompt: "Find the angle between (1, 0) and (1, 1), in degrees.",
    latex: "\\theta \\text{ between } (1,0), (1,1)",
    marks: 3,
    difficulty: 4,
    answer: "45",
    explanation: "cos θ = 1/(1·√2) = 1/√2, so θ = 45°.",
  },
  {
    id: "y12e1-vec-dot-d4-9",
    prompt: "Find k so that (k, 2) is perpendicular to (3, 6).",
    latex: "(k, 2) \\perp (3, 6)",
    marks: 3,
    difficulty: 4,
    answer: "-4",
    acceptedAnswers: ["−4"],
    explanation: "3k + 12 = 0 ⇒ k = −4.",
  },
  {
    id: "y12e1-vec-dot-d4-10",
    prompt: "Find a·b given |a| = 5, |b| = 4 and the angle between them is 60°.",
    latex: "|a| = 5, \\ |b| = 4, \\ \\theta = 60°",
    marks: 2,
    difficulty: 4,
    answer: "10",
    explanation: "a·b = |a||b|cos 60° = 5 × 4 × 0.5 = 10.",
  },
];

// D5: angles (acute/obtuse), find a parameter for a given angle, magnitudes via
// a·b, perpendicular constructions, and the distributive law.
const dotD5: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-dot-d5-1",
    prompt: "Find the angle between (1, 2) and (3, 1), in degrees.",
    latex: "\\theta \\text{ between } (1,2), (3,1)",
    marks: 4,
    difficulty: 5,
    answer: "45",
    explanation: "cos θ = 5/(√5·√10) = 5/√50 = 1/√2, so θ = 45°.",
  },
  {
    id: "y12e1-vec-dot-d5-2",
    prompt:
      "Find the positive value of k so that the angle between (1, 0) and (1, k) is 45°.",
    latex: "\\theta = 45° \\text{ between } (1,0), (1,k)",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation:
      "cos 45° = 1/√(1 + k²) = 1/√2 ⇒ 1 + k² = 2 ⇒ k = 1.",
  },
  {
    id: "y12e1-vec-dot-d5-3",
    prompt: "a·b = −6, |a| = 2 and |b| = 6. Find the angle between them, in degrees.",
    latex: "a \\cdot b = -6, \\ |a| = 2, \\ |b| = 6",
    marks: 4,
    difficulty: 5,
    answer: "120",
    explanation: "cos θ = −6/12 = −0.5, so θ = 120°.",
  },
  {
    id: "y12e1-vec-dot-d5-4",
    prompt:
      "|a| = 3, |b| = 5 and a·b = 6. Find |a + b| (exact form).",
    latex: "|a| = 3, \\ |b| = 5, \\ a\\cdot b = 6",
    marks: 4,
    difficulty: 5,
    answer: "sqrt(46)",
    acceptedAnswers: ["√46", "6.782", "6.7823"],
    explanation: "|a + b|² = |a|² + 2a·b + |b|² = 9 + 12 + 25 = 46, so |a + b| = √46.",
  },
  {
    id: "y12e1-vec-dot-d5-5",
    prompt: "|a| = 4, |b| = 3 and the angle between them is 60°. Find |a − b| (exact form).",
    latex: "|a| = 4, \\ |b| = 3, \\ \\theta = 60°",
    marks: 4,
    difficulty: 5,
    answer: "sqrt(13)",
    acceptedAnswers: ["√13", "3.606", "3.6056"],
    explanation:
      "a·b = 4·3·0.5 = 6. |a − b|² = 16 − 12 + 9 = 13, so |a − b| = √13.",
  },
  {
    id: "y12e1-vec-dot-d5-6",
    prompt: "Find the positive value of k for which (k, 3) is perpendicular to (k, −3).",
    latex: "(k, 3) \\perp (k, -3)",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation: "Dot = k² − 9 = 0 ⇒ k = 3 (taking k > 0).",
  },
  {
    id: "y12e1-vec-dot-d5-7",
    prompt:
      "A vector (a, b) with a > 0 is perpendicular to (2, 1) and has magnitude √5. Find a.",
    latex: "(a,b) \\perp (2,1), \\ |(a,b)| = \\sqrt{5}",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation:
      "Perpendicular to (2,1) means the direction (1, −2); it already has magnitude √5, so (a, b) = (1, −2) and a = 1.",
  },
  {
    id: "y12e1-vec-dot-d5-8",
    prompt: "Given a·b = 10 and a·c = 4, find a·(b + c).",
    latex: "a\\cdot b = 10, \\ a\\cdot c = 4",
    marks: 3,
    difficulty: 5,
    answer: "14",
    explanation: "By the distributive law, a·(b + c) = a·b + a·c = 10 + 4 = 14.",
  },
  {
    id: "y12e1-vec-dot-d5-9",
    prompt:
      "a and b are perpendicular with |a| = 5 and |b| = 7. Find |a + b| (exact form).",
    latex: "a \\perp b, \\ |a| = 5, \\ |b| = 7",
    marks: 3,
    difficulty: 5,
    answer: "sqrt(74)",
    acceptedAnswers: ["√74", "8.602", "8.6023"],
    explanation: "Perpendicular ⇒ a·b = 0, so |a + b|² = 25 + 49 = 74 and |a + b| = √74.",
  },
  {
    id: "y12e1-vec-dot-d5-10",
    prompt: "Find cos θ, the cosine of the angle between (3, 4) and (4, 3).",
    latex: "\\theta \\text{ between } (3,4), (4,3)",
    marks: 4,
    difficulty: 5,
    answer: "0.96",
    acceptedAnswers: ["24/25"],
    explanation: "cos θ = (12 + 12)/(5·5) = 24/25 = 0.96.",
  },
];

// ── Subtopic 4: Vector Projections and Applications ──────────────────────────
// Scalar projection a·b/|b|, vector projection (a·b/|b|²)b, work F·d, resolving.
const projAppD4: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-proj-d4-1",
    prompt: "Find the scalar projection of (4, 3) onto (1, 0).",
    latex: "\\text{proj}_{(1,0)}(4,3)",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$4$" },
      { label: "B", text: "$3$" },
      { label: "C", text: "$5$" },
      { label: "D", text: "$7$" },
    ],
    answer: "A",
    explanation: "Scalar projection = a·b/|b| = 4/1 = 4. C is |a|, not the projection.",
  },
  {
    id: "y12e1-vec-proj-d4-2",
    prompt: "Find the scalar projection of (6, 8) onto (3, 4).",
    latex: "\\text{scalar proj of } (6,8) \\text{ on } (3,4)",
    marks: 3,
    difficulty: 4,
    answer: "10",
    explanation: "a·b = 18 + 32 = 50; |b| = 5; scalar projection = 50/5 = 10.",
  },
  {
    id: "y12e1-vec-proj-d4-3",
    prompt: "Find the scalar projection of (3, 4) onto (6, 8).",
    latex: "\\text{scalar proj of } (3,4) \\text{ on } (6,8)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$5$" },
      { label: "B", text: "$10$" },
      { label: "C", text: "$50$" },
      { label: "D", text: "$0$" },
    ],
    answer: "A",
    explanation: "a·b = 50; |b| = 10; scalar projection = 50/10 = 5. C is a·b; B uses the wrong magnitude.",
  },
  {
    id: "y12e1-vec-proj-d4-4",
    prompt: "Find the i-component of the vector projection of (4, 2) onto (1, 0).",
    latex: "\\text{vector proj of } (4,2) \\text{ on } (1,0)",
    marks: 2,
    difficulty: 4,
    answer: "4",
    explanation: "Vector projection = (4/1)(1, 0) = (4, 0); the i-component is 4.",
  },
  {
    id: "y12e1-vec-proj-d4-5",
    prompt: "Find the magnitude of the vector projection of (6, 8) onto (1, 0).",
    latex: "|\\text{vector proj of } (6,8) \\text{ on } (1,0)|",
    marks: 2,
    difficulty: 4,
    answer: "6",
    explanation: "Vector projection = (6, 0), so its magnitude is 6.",
  },
  {
    id: "y12e1-vec-proj-d4-6",
    prompt: "Find the scalar projection of (2, 3) onto (4, 0).",
    latex: "\\text{scalar proj of } (2,3) \\text{ on } (4,0)",
    marks: 2,
    difficulty: 4,
    answer: "2",
    explanation: "a·b = 8; |b| = 4; scalar projection = 8/4 = 2.",
  },
  {
    id: "y12e1-vec-proj-d4-7",
    prompt: "A force F = (3, 4) acts over a displacement d = (2, 0). Find the work done (W = F·d).",
    latex: "F = (3,4), \\ d = (2,0)",
    marks: 2,
    difficulty: 4,
    answer: "6",
    explanation: "W = F·d = (3)(2) + (4)(0) = 6.",
  },
  {
    id: "y12e1-vec-proj-d4-8",
    prompt: "A force F = (5, 2) acts over a displacement d = (0, 4). Find the work done.",
    latex: "F = (5,2), \\ d = (0,4)",
    marks: 2,
    difficulty: 4,
    answer: "8",
    explanation: "W = F·d = (5)(0) + (2)(4) = 8.",
  },
  {
    id: "y12e1-vec-proj-d4-9",
    prompt: "Find the j-component of the vector projection of (3, 4) onto (0, 1).",
    latex: "\\text{vector proj of } (3,4) \\text{ on } (0,1)",
    marks: 2,
    difficulty: 4,
    answer: "4",
    explanation: "Vector projection = (4)(0, 1) = (0, 4); the j-component is 4.",
  },
  {
    id: "y12e1-vec-proj-d4-10",
    prompt: "Find the scalar projection of (1, 1) onto (1, 1) (exact form).",
    latex: "\\text{scalar proj of } (1,1) \\text{ on } (1,1)",
    marks: 2,
    difficulty: 4,
    answer: "sqrt(2)",
    acceptedAnswers: ["√2", "1.414", "1.4142"],
    explanation: "Projecting a vector onto itself gives its magnitude: |(1,1)| = √2.",
  },
];

// D5: perpendicular component, full vector projection, find a parameter from a
// projection, resolving forces and work at an angle.
const projAppD5: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-proj-d5-1",
    prompt:
      "Decompose (3, 5) parallel and perpendicular to (1, 0). Find the magnitude of the perpendicular component.",
    latex: "(3,5) \\text{ rel. to } (1,0)",
    marks: 3,
    difficulty: 5,
    answer: "5",
    explanation: "Parallel part = (3, 0), so the perpendicular part is (0, 5), of magnitude 5.",
  },
  {
    id: "y12e1-vec-proj-d5-2",
    prompt:
      "Decompose (4, 3) parallel and perpendicular to (1, 0). Find the magnitude of the perpendicular component.",
    latex: "(4,3) \\text{ rel. to } (1,0)",
    marks: 3,
    difficulty: 5,
    answer: "3",
    explanation: "Parallel part = (4, 0), so the perpendicular part is (0, 3), of magnitude 3.",
  },
  {
    id: "y12e1-vec-proj-d5-3",
    prompt: "Find the scalar projection of (5, 12) onto (3, 4).",
    latex: "\\text{scalar proj of } (5,12) \\text{ on } (3,4)",
    marks: 4,
    difficulty: 5,
    answer: "12.6",
    acceptedAnswers: ["63/5"],
    explanation: "a·b = 15 + 48 = 63; |b| = 5; scalar projection = 63/5 = 12.6.",
  },
  {
    id: "y12e1-vec-proj-d5-4",
    prompt: "Find the magnitude of the vector projection of (2, 4) onto (3, 4).",
    latex: "|\\text{vector proj of } (2,4) \\text{ on } (3,4)|",
    marks: 4,
    difficulty: 5,
    answer: "4.4",
    acceptedAnswers: ["22/5"],
    explanation: "The magnitude equals the (positive) scalar projection: a·b/|b| = 22/5 = 4.4.",
  },
  {
    id: "y12e1-vec-proj-d5-5",
    prompt:
      "A force F = (4, 3) moves an object from A(0, 0) to B(2, 2). Find the work done.",
    latex: "F = (4,3), \\ A(0,0) \\to B(2,2)",
    marks: 4,
    difficulty: 5,
    answer: "14",
    explanation: "Displacement d = (2, 2); W = F·d = 8 + 6 = 14.",
  },
  {
    id: "y12e1-vec-proj-d5-6",
    prompt: "Find k so that the scalar projection of (k, 3) onto (4, 3) is 5.",
    latex: "\\text{scalar proj of } (k,3) \\text{ on } (4,3) = 5",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation: "(4k + 9)/5 = 5 ⇒ 4k + 9 = 25 ⇒ k = 4.",
  },
  {
    id: "y12e1-vec-proj-d5-7",
    prompt:
      "Resolve (5, 2) into parts parallel and perpendicular to (1, 0). Find the magnitude of the perpendicular part.",
    latex: "(5,2) \\text{ rel. to } (1,0)",
    marks: 3,
    difficulty: 5,
    answer: "2",
    explanation: "Parallel part = (5, 0), perpendicular part = (0, 2), of magnitude 2.",
  },
  {
    id: "y12e1-vec-proj-d5-8",
    prompt:
      "Find the i-component of the vector projection of (3, 4) onto (1, 1) (exact form).",
    latex: "\\text{vector proj of } (3,4) \\text{ on } (1,1)",
    marks: 4,
    difficulty: 5,
    answer: "7/2",
    acceptedAnswers: ["3.5"],
    explanation: "a·b = 7, |b|² = 2; vector projection = (7/2)(1, 1), so the i-component is 7/2.",
  },
  {
    id: "y12e1-vec-proj-d5-9",
    prompt: "A 10 N force acts at 60° to the horizontal. Find its horizontal component.",
    latex: "F = 10\\,\\text{N at } 60°",
    marks: 3,
    difficulty: 5,
    answer: "5",
    explanation: "Horizontal component = 10 cos 60° = 10 × 0.5 = 5 N.",
  },
  {
    id: "y12e1-vec-proj-d5-10",
    prompt:
      "A 20 N force pulls at 30° to a displacement of 4 m. Find the work done (exact form).",
    latex: "W = Fd\\cos\\theta, \\ F=20, \\ d=4, \\ \\theta=30°",
    marks: 4,
    difficulty: 5,
    answer: "40sqrt(3)",
    acceptedAnswers: ["40√3", "69.28", "69.282"],
    explanation: "W = 20 × 4 × cos 30° = 80 × (√3/2) = 40√3 ≈ 69.3 J.",
  },
];

// ── Subtopic 5: Proof of the Projection Formula and Perpendicular Component ───
// Computational D4/D5 (parallel/perpendicular decomposition) PLUS a D6 band of
// free-response proofs graded by the AI marker (responseType:"proof"). The proofs
// are only drawn when PROOF_MARKER_ENABLED — the assembler filters them otherwise.
const projProofD4: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-pproof-d4-1",
    prompt:
      "Find the j-component of the perpendicular component of (4, 3) relative to (1, 0).",
    latex: "a = (4,3), \\ b = (1,0)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$3$" },
      { label: "B", text: "$4$" },
      { label: "C", text: "$0$" },
      { label: "D", text: "$7$" },
    ],
    answer: "A",
    explanation:
      "Parallel part = (4, 0), so the perpendicular part is (4,3) − (4,0) = (0, 3); its j-component is 3.",
  },
  {
    id: "y12e1-vec-pproof-d4-2",
    prompt: "Find the i-component of the vector projection of (3, 1) onto (1, 1).",
    latex: "a = (3,1), \\ b = (1,1)",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$2$" },
      { label: "B", text: "$4$" },
      { label: "C", text: "$1$" },
      { label: "D", text: "$3$" },
    ],
    answer: "A",
    explanation:
      "proj = (a·b/|b|²)b = (4/2)(1,1) = (2, 2); the i-component is 2. B is a·b without dividing by |b|².",
  },
  {
    id: "y12e1-vec-pproof-d4-3",
    prompt:
      "Find the magnitude of the perpendicular component of (3, 1) relative to (1, 1) (exact form).",
    latex: "a = (3,1), \\ b = (1,1)",
    marks: 3,
    difficulty: 4,
    answer: "sqrt(2)",
    acceptedAnswers: ["√2", "1.414", "1.4142"],
    explanation: "perp = a − proj = (3,1) − (2,2) = (1, −1), of magnitude √2.",
  },
  {
    id: "y12e1-vec-pproof-d4-4",
    prompt: "Find the magnitude of the vector projection of (6, 8) onto (1, 0).",
    latex: "a = (6,8), \\ b = (1,0)",
    marks: 2,
    difficulty: 4,
    answer: "6",
    explanation: "Projection = (6, 0), of magnitude 6.",
  },
  {
    id: "y12e1-vec-pproof-d4-5",
    prompt: "Find the i-component of the vector projection of (5, 0) onto (3, 4).",
    latex: "a = (5,0), \\ b = (3,4)",
    marks: 3,
    difficulty: 4,
    answer: "1.8",
    acceptedAnswers: ["9/5"],
    explanation: "proj = (15/25)(3,4) = (1.8, 2.4); the i-component is 1.8.",
  },
  {
    id: "y12e1-vec-pproof-d4-6",
    prompt:
      "Find the i-component of the perpendicular component of (2, 3) relative to (0, 1).",
    latex: "a = (2,3), \\ b = (0,1)",
    marks: 2,
    difficulty: 4,
    answer: "2",
    explanation: "Parallel part = (0, 3), so perp = (2, 0); its i-component is 2.",
  },
  {
    id: "y12e1-vec-pproof-d4-7",
    prompt: "Find the magnitude of the vector projection of (7, 1) onto (1, 0).",
    latex: "a = (7,1), \\ b = (1,0)",
    marks: 2,
    difficulty: 4,
    answer: "7",
    explanation: "Projection = (7, 0), of magnitude 7.",
  },
  {
    id: "y12e1-vec-pproof-d4-8",
    prompt: "Find the i-component of the vector projection of (1, 2) onto (2, 1).",
    latex: "a = (1,2), \\ b = (2,1)",
    marks: 3,
    difficulty: 4,
    answer: "1.6",
    acceptedAnswers: ["8/5"],
    explanation: "proj = (4/5)(2,1) = (1.6, 0.8); the i-component is 1.6.",
  },
  {
    id: "y12e1-vec-pproof-d4-9",
    prompt:
      "Find the magnitude of the perpendicular component of (3, 3) relative to (1, 0).",
    latex: "a = (3,3), \\ b = (1,0)",
    marks: 2,
    difficulty: 4,
    answer: "3",
    explanation: "Parallel = (3, 0), perp = (0, 3), of magnitude 3.",
  },
  {
    id: "y12e1-vec-pproof-d4-10",
    prompt:
      "The vector (4, 3) splits into a parallel part of magnitude 4 and a perpendicular part of magnitude 3 (relative to (1, 0)). Verify |a|² = 4² + 3² and state |a|.",
    latex: "|a|^2 = |a_\\parallel|^2 + |a_\\perp|^2",
    marks: 2,
    difficulty: 4,
    answer: "5",
    explanation: "|a| = √(16 + 9) = √25 = 5, confirming the orthogonal decomposition.",
  },
];

const projProofD5: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-pproof-d5-1",
    prompt: "Find the magnitude of the vector projection of (5, 2) onto (3, 4).",
    latex: "a = (5,2), \\ b = (3,4)",
    marks: 4,
    difficulty: 5,
    answer: "4.6",
    acceptedAnswers: ["23/5"],
    explanation: "a·b = 23, |b| = 5, so |proj| = 23/5 = 4.6.",
  },
  {
    id: "y12e1-vec-pproof-d5-2",
    prompt:
      "Find the magnitude of the perpendicular component of (5, 2) relative to (3, 4).",
    latex: "a = (5,2), \\ b = (3,4)",
    marks: 4,
    difficulty: 5,
    answer: "2.8",
    acceptedAnswers: ["14/5"],
    explanation:
      "|perp| = √(|a|² − |proj|²) = √(29 − 21.16) = √7.84 = 2.8 (equivalently |5·4 − 2·3|/5).",
  },
  {
    id: "y12e1-vec-pproof-d5-3",
    prompt:
      "Find the magnitude of the perpendicular component of (1, 7) relative to (1, 1) (exact form).",
    latex: "a = (1,7), \\ b = (1,1)",
    marks: 4,
    difficulty: 5,
    answer: "3sqrt(2)",
    acceptedAnswers: ["3√2", "4.243", "4.2426"],
    explanation: "proj = (8/2)(1,1) = (4,4); perp = (−3, 3), of magnitude 3√2.",
  },
  {
    id: "y12e1-vec-pproof-d5-4",
    prompt: "The vector projection of (a, 2) onto (1, 1) is (3, 3). Find a.",
    latex: "\\text{proj}_{(1,1)}(a,2) = (3,3)",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation: "proj = ((a + 2)/2)(1,1) = (3,3) ⇒ (a + 2)/2 = 3 ⇒ a = 4.",
  },
  {
    id: "y12e1-vec-pproof-d5-5",
    prompt:
      "Find the magnitude of the perpendicular component of (2, 1) relative to (3, 4).",
    latex: "a = (2,1), \\ b = (3,4)",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation: "|perp| = |2·4 − 1·3|/5 = 5/5 = 1.",
  },
  {
    id: "y12e1-vec-pproof-d5-6",
    prompt: "Find the magnitude of the vector projection of (6, 8) onto (2, 1) (exact form).",
    latex: "a = (6,8), \\ b = (2,1)",
    marks: 4,
    difficulty: 5,
    answer: "4sqrt(5)",
    acceptedAnswers: ["4√5", "8.944", "8.9443"],
    explanation: "a·b = 20, |b| = √5, so |proj| = 20/√5 = 4√5.",
  },
  {
    id: "y12e1-vec-pproof-d5-7",
    prompt:
      "Find the magnitude of the perpendicular component of (7, 1) relative to (3, 4).",
    latex: "a = (7,1), \\ b = (3,4)",
    marks: 4,
    difficulty: 5,
    answer: "5",
    explanation: "|perp| = |7·4 − 1·3|/5 = 25/5 = 5.",
  },
  {
    id: "y12e1-vec-pproof-d5-8",
    prompt: "Find the magnitude of the vector projection of (5, 5) onto (3, 4).",
    latex: "a = (5,5), \\ b = (3,4)",
    marks: 3,
    difficulty: 5,
    answer: "7",
    explanation: "a·b = 35, |b| = 5, so |proj| = 35/5 = 7.",
  },
  {
    id: "y12e1-vec-pproof-d5-9",
    prompt:
      "Find the magnitude of the perpendicular component of (0, 5) relative to (3, 4).",
    latex: "a = (0,5), \\ b = (3,4)",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation: "|perp| = |0·4 − 5·3|/5 = 15/5 = 3.",
  },
  {
    id: "y12e1-vec-pproof-d5-10",
    prompt: "Find the magnitude of the vector projection of (8, 1) onto (3, 4).",
    latex: "a = (8,1), \\ b = (3,4)",
    marks: 4,
    difficulty: 5,
    answer: "5.6",
    acceptedAnswers: ["28/5"],
    explanation: "a·b = 28, |b| = 5, so |proj| = 28/5 = 5.6.",
  },
];

// D6 — free-response proofs graded by the AI marker. responseType:"proof" with a
// server-only modelSolution; drawn only when PROOF_MARKER_ENABLED.
const projProofD6: TopicTestQuestion[] = [
  {
    id: "y12e1-vec-pproof-d6-1",
    prompt:
      "Let a and b be vectors with b ≠ 0. Prove that the vector w = a − ((a·b)/|b|²) b is perpendicular to b.",
    latex: "w = a - \\dfrac{a\\cdot b}{|b|^2}\\,b",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "Compute w·b = a·b − ((a·b)/|b|²)(b·b) = a·b − ((a·b)/|b|²)|b|² = a·b − a·b = 0. Since w·b = 0 and b ≠ 0, w is perpendicular to b.",
    modelSolution:
      "Take the dot product of w with b: w·b = [a − ((a·b)/|b|²) b]·b = a·b − ((a·b)/|b|²)(b·b). Since b·b = |b|², this is a·b − ((a·b)/|b|²)|b|² = a·b − a·b = 0. As w·b = 0 with b ≠ 0, w ⊥ b. (A complete proof must take w·b, use b·b = |b|², and conclude w·b = 0 ⇒ perpendicular.)",
  },
  {
    id: "y12e1-vec-pproof-d6-2",
    prompt:
      "Prove that the scalar projection of a onto b equals |a|cos θ, where θ is the angle between a and b.",
    latex: "\\text{scalar proj} = \\dfrac{a\\cdot b}{|b|}",
    marks: 2,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "By definition a·b = |a||b|cos θ. The scalar projection is (a·b)/|b| = |a||b|cos θ / |b| = |a|cos θ.",
    modelSolution:
      "Start from a·b = |a||b|cos θ. The scalar projection of a onto b is (a·b)/|b|. Substituting: (a·b)/|b| = |a||b|cos θ / |b| = |a|cos θ. (Must use a·b = |a||b|cos θ and divide by |b|.)",
  },
  {
    id: "y12e1-vec-pproof-d6-3",
    prompt:
      "A vector a is written as a = a∥ + a⊥, where a∥ = ((a·b)/|b|²) b. Prove that a⊥ = a − a∥ is perpendicular to b, so the decomposition is orthogonal.",
    latex: "a = a_\\parallel + a_\\perp, \\quad a_\\parallel = \\dfrac{a\\cdot b}{|b|^2}\\,b",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "a⊥·b = (a − a∥)·b = a·b − a∥·b = a·b − ((a·b)/|b|²)(b·b) = a·b − a·b = 0, so a⊥ ⊥ b.",
    modelSolution:
      "Compute a⊥·b = (a − a∥)·b = a·b − a∥·b. Now a∥·b = ((a·b)/|b|²)(b·b) = ((a·b)/|b|²)|b|² = a·b. Hence a⊥·b = a·b − a·b = 0, so a⊥ is perpendicular to b and the split a = a∥ + a⊥ is orthogonal. (Must show a∥·b = a·b and conclude a⊥·b = 0.)",
  },
  {
    id: "y12e1-vec-pproof-d6-4",
    prompt:
      "Prove that the vector projection of a onto b is unchanged when b is replaced by λb for any scalar λ > 0.",
    latex: "\\text{proj}_{\\lambda b}(a) = \\text{proj}_b(a)",
    marks: 3,
    difficulty: 6,
    responseType: "proof",
    explanation:
      "proj_{λb}(a) = ((a·λb)/|λb|²)(λb) = ((λ(a·b))/(λ²|b|²))(λb) = ((a·b)/|b|²)b = proj_b(a).",
    modelSolution:
      "proj_{λb}(a) = ((a·(λb))/|λb|²)(λb). Now a·(λb) = λ(a·b) and |λb|² = λ²|b|², so this is (λ(a·b)/(λ²|b|²))(λb) = ((a·b)/(λ|b|²))(λb) = ((a·b)/|b|²)b = proj_b(a). (Must use a·(λb)=λ(a·b), |λb|²=λ²|b|², and cancel λ.)",
  },
];

export const vectorsPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "vectors",
  topicTitle: "Introduction to Vectors",
  subtopics: [
    {
      subtopicSlug: "vectors-scalars-notation",
      subtopicTitle: "Vectors, Scalars and Notation",
      remediationHref: href("vectors-scalars-notation"),
      d4: notationD4,
      d5: notationD5,
    },
    {
      subtopicSlug: "vector-addition-subtraction",
      subtopicTitle: "Vector Addition and Subtraction",
      remediationHref: href("vector-addition-subtraction"),
      d4: additionD4,
      d5: additionD5,
    },
    {
      subtopicSlug: "dot-product",
      subtopicTitle: "The Dot Product",
      remediationHref: href("dot-product"),
      d4: dotD4,
      d5: dotD5,
    },
    {
      subtopicSlug: "vector-projections-applications",
      subtopicTitle: "Vector Projections and Applications",
      remediationHref: href("vector-projections-applications"),
      d4: projAppD4,
      d5: projAppD5,
    },
    {
      subtopicSlug: "vectors-projection",
      subtopicTitle: "Proof of the Projection Formula and Perpendicular Component",
      remediationHref: href("vectors-projection"),
      d4: projProofD4,
      d5: projProofD5,
      d6: projProofD6,
    },
    {
      subtopicSlug: "vectors-motion-2d",
      subtopicTitle: "Vector Functions of Time: Position, Velocity and Acceleration",
      remediationHref: href("vectors-motion-2d"),
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "vectors-projectile-parametric",
      subtopicTitle: "Projectile Motion in Vector and Parametric Form",
      remediationHref: href("vectors-projectile-parametric"),
      d4: [],
      d5: [],
    },
  ],
};
