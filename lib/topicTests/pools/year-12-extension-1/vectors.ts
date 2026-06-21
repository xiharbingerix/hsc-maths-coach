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
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "vectors-projection",
      subtopicTitle: "Proof of the Projection Formula and Perpendicular Component",
      remediationHref: href("vectors-projection"),
      d4: [],
      d5: [],
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
