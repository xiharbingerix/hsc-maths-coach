import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 1 "Vectors". First senior Extension topic in the
// high-difficulty program. Difficulty is carried by vector STRUCTURE — abstract dot-product /
// magnitude identities used without coordinates (proof, not grind), geometric reconstruction
// (collinearity, section), parameterised-line parameter recovery, perpendicular/parallel
// constraints solved backwards, and projection + perpendicular decomposition. All single-answer,
// auto-markable, hand-verified. Registered per lesson slug, ≤2 per lesson.

// → vectors-scalars-notation
export const vectorsCollinearityChallenge: PracticeQuestion[] = [
  {
    // Collinearity reconstruction: AB ∥ AC recovers the unknown coordinate.
    id: "chal-y12e1-vec-3",
    vector2DDiagram: {
      description: "Schematic straight line through collinear points A(1, 2), B(4, 6), and C(k, 14), with C furthest from A.",
      xMin: 0, xMax: 11, yMin: 0, yMax: 16, showGrid: false, showAxes: false,
      segments: [{ from: { x: 1, y: 2 }, to: { x: 10, y: 14 }, color: "blue" }],
      points: [{ x: 1, y: 2, label: "A(1,2)" }, { x: 4, y: 6, label: "B(4,6)" }, { x: 10, y: 14, label: "C(k,14)" }],
    },
    prompt:
      "The points A(1, 2), B(4, 6) and C(k, 14) are collinear. Find the value of k.",
    latex: "A(1,2),\\ B(4,6),\\ C(k,14)\\text{ collinear}",
    answer: "10",
    acceptedAnswers: ["k=10"],
    hint: "Collinear points mean AB and AC are parallel: equate the ratios of their components.",
    explanation:
      "AB = (3, 4) and AC = (k − 1, 12). Parallel ⟹ 3·12 = 4·(k − 1) ⟹ 36 = 4k − 4 ⟹ k = 10.",
  },
];

// → vector-addition-subtraction
export const vectorsGeometryChallenge: PracticeQuestion[] = [
  {
    // Section/ratio reconstruction in REVERSE: recover the far endpoint from P, A and the ratio.
    id: "chal-y12e1-vec-4",
    vector2DDiagram: {
      description: "Schematic interval AB with A(1, 2), P(5, 4) between A and B, and AP to PB in the ratio 2 to 1.",
      xMin: 0, xMax: 8, yMin: 0, yMax: 6, showGrid: false, showAxes: false,
      segments: [{ from: { x: 1, y: 2 }, to: { x: 7, y: 5 }, color: "blue" }],
      points: [{ x: 1, y: 2, label: "A(1,2)" }, { x: 5, y: 4, label: "P(5,4)" }, { x: 7, y: 5, label: "B" }],
    },
    prompt:
      "The point P(5, 4) divides the interval AB in the ratio AP : PB = 2 : 1, where A = (1, 2). Find the coordinates of B.",
    latex: "P=(5,4),\\ AP:PB=2:1,\\ A=(1,2)",
    answer: "(7,5)",
    acceptedAnswers: ["(7, 5)", "7,5"],
    hint: "P = A + (2/3)(B − A). Rearrange to make B the subject.",
    explanation:
      "P = A + ⅔(B − A) ⟹ (5, 4) = (1, 2) + ⅔(B − (1, 2)). So ⅔(B − A) = (4, 2) ⟹ B − A = (6, 3) ⟹ B = (7, 5).",
  },
  {
    // Parameterised-line parameter recovery: intersection forced onto the x-axis fixes a.
    id: "chal-y12e1-vec-5",
    vector2DDiagram: {
      description: "Two parameterised lines intersect at a point on the x-axis. The first passes through (1, 0) in direction (2, 1); the second passes through (a, 3) in direction (-1, 1).",
      xMin: -4, xMax: 5, yMin: -4, yMax: 6,
      segments: [
        { from: { x: -3, y: -2 }, to: { x: 5, y: 2 }, label: "r = (1,0) + t(2,1)", color: "blue" },
        { from: { x: 2, y: -1 }, to: { x: -4, y: 5 }, label: "r = (a,3) + s(-1,1)", color: "violet" },
      ],
      points: [{ x: 1, y: 0, label: "intersection" }],
    },
    prompt:
      "The lines r = (1, 0) + t(2, 1) and r = (a, 3) + s(−1, 1) intersect at a point on the x-axis. Find a.",
    latex: "r=(1,0)+t(2,1),\\quad r=(a,3)+s(-1,1)",
    answer: "-2",
    acceptedAnswers: ["a=-2", "−2"],
    hint: "On the first line, the x-axis point has y = 0, which fixes t. Then require the second line to pass through it.",
    explanation:
      "First line meets the x-axis when its y-component t = 0, giving the point (1, 0). The second line passes through (1, 0): 3 + s = 0 ⟹ s = −3, and a − s = 1 ⟹ a + 3 = 1 ⟹ a = −2.",
  },
];

// → dot-product
export const vectorsDotProductChallenge: PracticeQuestion[] = [
  {
    // Perpendicular-constraint reconstruction: expand (a + λb)·b = 0.
    id: "chal-y12e1-vec-1",
    prompt:
      "Given a = 2i + 3j and b = i − j, find the scalar λ such that a + λb is perpendicular to b.",
    latex: "\\mathbf{a}=2\\mathbf{i}+3\\mathbf{j},\\ \\mathbf{b}=\\mathbf{i}-\\mathbf{j}",
    answer: "1/2",
    acceptedAnswers: ["0.5", "\\frac12", "λ=1/2"],
    hint: "Perpendicular means (a + λb)·b = 0; expand using a·b and |b|².",
    explanation:
      "(a + λb)·b = a·b + λ|b|² = 0. a·b = 2(1) + 3(−1) = −1, |b|² = 2. So −1 + 2λ = 0 ⟹ λ = 1/2.",
  },
  {
    // Abstract dot-product/magnitude identity (proof, no coordinates).
    id: "chal-y12e1-vec-2",
    prompt:
      "Vectors a and b satisfy |a| = 3, |b| = 4 and a·b = 6. Find |a + b|.",
    latex: "|\\mathbf{a}|=3,\\ |\\mathbf{b}|=4,\\ \\mathbf{a}\\cdot\\mathbf{b}=6",
    answer: "√37",
    acceptedAnswers: ["sqrt(37)", "\\sqrt{37}", "37^(1/2)"],
    hint: "Use |a + b|² = |a|² + 2(a·b) + |b|².",
    explanation:
      "|a + b|² = |a|² + 2(a·b) + |b|² = 9 + 12 + 16 = 37, so |a + b| = √37.",
  },
];

// → vector-projections-applications
export const vectorsProjectionChallenge: PracticeQuestion[] = [
  {
    // Projection + perpendicular decomposition (abstract, no coordinates).
    id: "chal-y12e1-vec-6",
    prompt:
      "A vector a has magnitude |a| = 5, and the scalar projection of a onto another vector b is 4. Find the magnitude of the component of a perpendicular to b.",
    latex: "|\\mathbf{a}|=5,\\ \\text{scalar proj of }\\mathbf{a}\\text{ on }\\mathbf{b}=4",
    answer: "3",
    acceptedAnswers: ["3 units"],
    hint: "a splits into a component along b and a component perpendicular to b; the three magnitudes form a right triangle.",
    explanation:
      "The scalar projection is the magnitude of the component of a along b. By the right-angle decomposition, |a|² = (along)² + (perp)², so (perp)² = 5² − 4² = 9 ⟹ perpendicular component = 3.",
  },
];
