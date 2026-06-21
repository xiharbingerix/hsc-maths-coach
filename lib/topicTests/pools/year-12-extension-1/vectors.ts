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
      d4: [],
      d5: [],
    },
    {
      subtopicSlug: "dot-product",
      subtopicTitle: "The Dot Product",
      remediationHref: href("dot-product"),
      d4: [],
      d5: [],
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
