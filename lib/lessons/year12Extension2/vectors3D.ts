import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type { Vector3DDiagram } from "../types";

function v3Choice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  hint = "Recall the key definition before choosing."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Choose the best option.}",
    choices: choices.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    answer,
    hint,
    explanation,
  };
}

function v3Typed(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Set up the calculation using the component form, then simplify.",
  diagram?: Vector3DDiagram
): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers, hint, explanation, vector3DDiagram: diagram };
}

// ─── Lesson 1: Vectors and Points in 3D ──────────────────────────────────────

const vectorsAndPoints3D: Partial<ExplicitLesson> = {
  description:
    "Represent points and vectors in three-dimensional space, perform vector addition, subtraction and scalar multiplication, and calculate the magnitude of a 3D vector.",
  learningIntention:
    "Work fluently with 3D vectors in component form: add, subtract, scale and find magnitudes.",
  successCriteria: [
    "Write a position vector from a point (x, y, z) in component form.",
    "Add and subtract 3D vectors component by component.",
    "Multiply a vector by a scalar.",
    "Find the magnitude |v| = √(x² + y² + z²) of a 3D vector.",
    "Find the unit vector in a given direction.",
  ],
  teaching: {
    paragraphs: [
      "A vector in three dimensions is written as v = (x, y, z) or as xi + yj + zk, where i, j, k are unit vectors along the x-, y- and z-axes. The position vector of the point P = (a, b, c) is OP = (a, b, c).",
      "Vector addition and subtraction work component by component: (a, b, c) ± (d, e, f) = (a ± d, b ± e, c ± f). Scalar multiplication scales every component: k(a, b, c) = (ka, kb, kc).",
      "The magnitude of v = (x, y, z) is |v| = √(x² + y² + z²). This extends Pythagoras from 2D to 3D. For example, |(1, 2, 2)| = √(1 + 4 + 4) = √9 = 3.",
      "The unit vector in the direction of v is v̂ = v / |v|. Its magnitude is always 1. Each component of the unit vector is the corresponding component of v divided by |v|.",
    ],
    latexBlocks: [
      "\\mathbf{v} = (x, y, z) = x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}",
      "\\mathbf{a} \\pm \\mathbf{b} = (a_1 \\pm b_1,\\; a_2 \\pm b_2,\\; a_3 \\pm b_3)",
      "|\\mathbf{v}| = \\sqrt{x^2 + y^2 + z^2}",
      "\\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{|\\mathbf{v}|}",
    ],
  },
  workedExamples: [
    {
      title: "Magnitude of a 3D vector",
      questionLatex: "\\text{Find }|\\mathbf{a}|\\text{ where }\\mathbf{a} = (1, 2, 2).",
      vector3DDiagram: {
        description: "The position vector a = (1, 2, 2) drawn as an arrow from the origin to the point (1, 2, 2).",
        axisLength: 3,
        vectors: [{ to: { x: 1, y: 2, z: 2 }, label: "a = (1, 2, 2)" }],
        points: [{ x: 1, y: 2, z: 2, label: "(1, 2, 2)" }],
      },
      steps: [
        { explanation: "Apply the 3D magnitude formula.", latex: "|\\mathbf{a}| = \\sqrt{1^2 + 2^2 + 2^2}" },
        { explanation: "Evaluate.", latex: "= \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3" },
      ],
      finalAnswerLatex: "|\\mathbf{a}| = 3",
    },
    {
      title: "Vector addition and unit vector",
      questionLatex: "\\text{Find the unit vector in the direction of }\\mathbf{b} = (2, 3, 6).",
      steps: [
        { explanation: "Find the magnitude.", latex: "|\\mathbf{b}| = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7" },
        { explanation: "Divide each component by the magnitude.", latex: "\\hat{\\mathbf{b}} = \\tfrac{1}{7}(2, 3, 6) = \\left(\\tfrac{2}{7}, \\tfrac{3}{7}, \\tfrac{6}{7}\\right)" },
      ],
      finalAnswerLatex: "\\hat{\\mathbf{b}} = \\left(\\tfrac{2}{7},\\, \\tfrac{3}{7},\\, \\tfrac{6}{7}\\right)",
    },
  ],
  guidedPractice: [
    v3Choice(
      "v3-g1",
      "What is the magnitude of the vector 3i + 4j + 0k?",
      "A",
      ["5", "7", "1", "25"],
      "|3i + 4j + 0k| = √(9 + 16 + 0) = √25 = 5.",
      "Use |v| = √(x² + y² + z²) with x=3, y=4, z=0."
    ),
    v3Typed(
      "v3-g2",
      "Find the magnitude of a = (1, 2, 2).",
      "\\mathbf{a}=(1,2,2)",
      "3",
      [],
      "|a| = √(1 + 4 + 4) = √9 = 3.",
      "Add the squares of all three components, then square root.",
      {
        description: "The vector a = (1, 2, 2) from the origin. Find its length.",
        axisLength: 3,
        vectors: [{ to: { x: 1, y: 2, z: 2 }, label: "a" }],
        points: [{ x: 1, y: 2, z: 2, label: "(1,2,2)" }],
      }
    ),
    v3Typed(
      "v3-g3",
      "Let a = (3, 1, 2) and b = (1, −1, 4). Find a + b.",
      "(3,1,2)+(1,-1,4)",
      "(4, 0, 6)",
      ["(4,0,6)"],
      "Add component by component: (3+1, 1+(−1), 2+4) = (4, 0, 6).",
      "Add the x, y and z components separately."
    ),
    v3Typed(
      "v3-g4",
      "Let v = (2, −3, 1). Find 2v.",
      "2\\mathbf{v}",
      "(4, -6, 2)",
      ["(4,-6,2)"],
      "Multiply each component by 2: (4, −6, 2).",
      "Multiply every component by the scalar."
    ),
  ],
  independentPractice: [
    v3Typed(
      "v3-i1",
      "Let a = (2, 2, 1) and b = (1, −1, 2). Find a − b.",
      "\\mathbf{a}-\\mathbf{b}",
      "(1, 3, -1)",
      ["(1,3,-1)"],
      "Subtract component by component: (2−1, 2−(−1), 1−2) = (1, 3, −1)."
    ),
    v3Typed(
      "v3-i2",
      "Find |v| where v = (6, 2, 3).",
      "\\mathbf{v}=(6,2,3)",
      "7",
      [],
      "|v| = √(36 + 4 + 9) = √49 = 7."
    ),
    v3Typed(
      "v3-i3",
      "Let a = (2, −1, 4). Find 3a.",
      "3\\mathbf{a}",
      "(6, -3, 12)",
      ["(6,-3,12)"],
      "Multiply each component by 3: (6, −3, 12)."
    ),
    v3Typed(
      "v3-i4",
      "Let v = (2, 2, 1). Find |3v|.",
      "|3\\mathbf{v}|",
      "9",
      [],
      "|v| = √(4+4+1) = 3. |3v| = 3|v| = 9.",
      "Scale property: |kv| = |k| · |v|. Find |v| first."
    ),
    v3Typed(
      "v3-i5",
      "Find the y-component of the unit vector in the direction of (0, 3, 4).",
      "\\mathbf{v}=(0,3,4)",
      "3/5",
      ["0.6", "3 / 5"],
      "|(0,3,4)| = √(0+9+16) = 5. Unit vector = (0, 3/5, 4/5). y-component = 3/5.",
      "Divide each component by the magnitude. The y-component is 3 ÷ 5."
    ),
  ],
  masteryQuiz: [
    v3Choice(
      "v3-m1",
      "What is |(1, 2, 2)|?",
      "A",
      ["3", "5", "√5", "9"],
      "|(1,2,2)| = √(1+4+4) = √9 = 3.",
      "Apply the 3D magnitude formula."
    ),
    v3Typed(
      "v3-m2",
      "Find |v| where v = (2, 4, 4).",
      "|\\mathbf{v}|",
      "6",
      [],
      "|v| = √(4+16+16) = √36 = 6."
    ),
    v3Choice(
      "v3-m3",
      "If a = (1, 2, 3) and b = −a, what is |a + b|?",
      "A",
      ["0", "√14", "2√14", "1"],
      "a + b = a + (−a) = (0,0,0). The zero vector has magnitude 0.",
      "b = −a means b is the negative of a. Their sum is the zero vector."
    ),
    v3Typed(
      "v3-m4",
      "Let a = (3, −1, 4) and b = (1, 5, −4). Find a + b.",
      "\\mathbf{a}+\\mathbf{b}",
      "(4, 4, 0)",
      ["(4,4,0)"],
      "(3+1, −1+5, 4+(−4)) = (4, 4, 0)."
    ),
    v3Typed(
      "v3-m5",
      "Find |v| where v = (5, 0, 12).",
      "|\\mathbf{v}|",
      "13",
      [],
      "|v| = √(25+0+144) = √169 = 13."
    ),
    v3Typed(
      "v3-m6",
      "Let a = (5, 0, 0) and b = (1, 2, 4). Find |a − b|.",
      "|\\mathbf{a}-\\mathbf{b}|",
      "6",
      [],
      "a − b = (4, −2, −4). |(4,−2,−4)| = √(16+4+16) = √36 = 6."
    ),
    v3Typed(
      "v3-m7",
      "Find |a| where a = (1, 4, 8).",
      "|\\mathbf{a}|",
      "9",
      [],
      "|a| = √(1+16+64) = √81 = 9."
    ),
    v3Typed(
      "v3-m8",
      "Find the value of t > 0 such that |(t, 4, 0)| = 5.",
      "\\mathbf{v}=(t,4,0),\\quad |\\mathbf{v}|=5",
      "3",
      [],
      "t² + 16 = 25, so t² = 9, t = 3.",
      "Square the magnitude equation: t² + 4² + 0² = 5². Solve for t."
    ),
    v3Typed(
      "v3-m9",
      "Find the z-component of the unit vector in the direction of v = (2, −1, 2).",
      "\\mathbf{v}=(2,-1,2)",
      "2/3",
      [],
      "|v| = √(4+1+4) = 3. Unit vector = (2/3, −1/3, 2/3). z-component = 2/3.",
      "Divide the z-component by the magnitude: 2 ÷ 3."
    ),
    v3Choice(
      "v3-m10",
      "Let a = (1, 2, 2) and b = (2, 4, 4). Which statement is true?",
      "A",
      ["b = 2a", "a · b = 0", "|a| = |b|", "a and b are perpendicular"],
      "b = 2(1,2,2) = (2,4,4) = b ✓. So b is a scalar multiple of a.",
      "Check each option: is b a scalar multiple of a?"
    ),
  ],
  masteryPassMark: 0.8,
  multiPartPractice: [
    {
      id: "v3-mp-1",
      prompt: "Let a = (2, 3, 6) and b = (1, −1, 2).",
      latex: "\\mathbf{a}=(2,3,6),\\quad \\mathbf{b}=(1,-1,2)",
      answer: "(3, 2, 8)",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find a + b.",
          marks: 1,
          answer: "(3, 2, 8)",
          acceptedAnswers: ["(3,2,8)"],
          hint: "Add corresponding components.",
          explanation: "(2+1, 3+(−1), 6+2) = (3, 2, 8).",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find |a|.",
          marks: 1,
          answer: "7",
          hint: "|a| = √(2² + 3² + 6²).",
          explanation: "|a| = √(4+9+36) = √49 = 7.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the z-component of the unit vector in the direction of a.",
          marks: 2,
          answer: "6/7",
          hint: "Divide the z-component of a by |a|.",
          explanation: "Unit vector = a/|a| = (2/7, 3/7, 6/7). z-component = 6/7.",
        },
      ],
    },
  ],
  masteryQuizPool: [
    { ...v3Choice("y12e2-vec-pts-pool-1", "The magnitude of a 3D vector (a, b, c) is given by:", "B", ["a + b + c", "√(a² + b² + c²)", "a² + b² + c²", "(a + b + c)/3"], "Magnitude is the 3D Pythagorean distance: |(a,b,c)| = √(a² + b² + c²)."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-pts-pool-2", "Find the magnitude |(2, 3, 6)|.", "|(2,3,6)| = \\sqrt{2^2+3^2+6^2}", "7", [], "√(4 + 9 + 36) = √49 = 7."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-pts-pool-3", "Find the magnitude |(1, 2, 2)|.", "|(1,2,2)| = \\sqrt{1^2+2^2+2^2}", "3", [], "√(1 + 4 + 4) = √9 = 3."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-pts-pool-4", "A unit vector in the direction of (1, 2, 2) is (1/k)(1, 2, 2). Find k.", "\\hat{u} = \\frac{1}{k}(1,2,2)", "3", [], "k = |(1,2,2)| = 3, so the unit vector is (1/3)(1,2,2)."), difficulty: 3 },
    { ...v3Choice("y12e2-vec-pts-pool-5", "A student computes |(3, 4, 0)| as 3 + 4 + 0 = 7. What is the error?", "C", ["The 0 should be ignored entirely.", "Magnitude is the largest component, 4.", "Magnitude is √(3² + 4² + 0²) = 5, not the sum of components.", "There is no error."], "Magnitude squares and roots the components: √(9 + 16 + 0) = 5. Adding components is not the magnitude."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-pts-pool-6", "For points A(1, 2, 3) and B(4, 6, 3), the displacement AB = B − A. Find |AB|.", "\\vec{AB} = B - A", "5", [], "AB = (3, 4, 0), so |AB| = √(9 + 16 + 0) = 5."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-pts-pool-7", "Find the x-coordinate of the midpoint of A(1, 2, 3) and B(3, 6, 5).", "M = \\tfrac12(A + B)", "2", [], "Midpoint x = (1 + 3)/2 = 2."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-pts-pool-8", "Vectors (2, 4, 6) and (1, 2, k) are parallel (one is a scalar multiple of the other). Find k.", "(2,4,6) = \\lambda(1,2,k)", "3", [], "(2,4,6) = 2(1,2,3), so the second vector is (1,2,3) and k = 3."), difficulty: 4 },
    { ...v3Choice("y12e2-vec-pts-pool-9", "Two non-zero vectors are parallel if and only if:", "B", ["Their dot product is zero.", "One is a scalar multiple of the other.", "They have the same magnitude.", "Their components add to zero."], "Parallel means one is a scalar multiple of the other. Dot product zero means perpendicular, not parallel."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-pts-pool-10", "Point P divides AB so that AP = 2·PB (ratio 2:1 from A). For A(0, 0, 0) and B(3, 3, 3), find the x-coordinate of P.", "P = A + \\tfrac{2}{3}(B - A)", "2", [], "P = A + (2/3)(B − A) = (2, 2, 2), so the x-coordinate is 2."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-pts-pool-11", "Find the positive value of t for which |(t, 2, 2)| = 3.", "|(t,2,2)| = 3", "1", [], "t² + 4 + 4 = 9, so t² = 1 and the positive value is t = 1."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-pts-pool-12", "Explain by result: the distance from the origin to the point (a, b, c) equals |(a, b, c)|. For the point (6, 6, 7), state this distance.", "d = \\sqrt{a^2+b^2+c^2}", "11", [], "√(36 + 36 + 49) = √121 = 11 — the position vector's magnitude IS the distance from the origin."), difficulty: 5 },
  ],
};

// ─── Lesson 2: Dot Product and Angle ─────────────────────────────────────────

const dotProductAndAngle: Partial<ExplicitLesson> = {
  description:
    "Compute the dot product of two 3D vectors, use it to find the angle between them, determine perpendicularity, and calculate scalar projections.",
  learningIntention:
    "Apply the dot product formula to find angles between vectors and test for perpendicularity.",
  successCriteria: [
    "Compute a · b = a₁b₁ + a₂b₂ + a₃b₃.",
    "Apply cos θ = (a · b) / (|a| |b|) to find the angle between two vectors.",
    "Recognise that a · b = 0 if and only if a and b are perpendicular.",
    "Find the value of an unknown parameter that makes two vectors perpendicular.",
    "Compute the scalar projection of a onto b as a · b̂ = (a · b) / |b|.",
  ],
  teaching: {
    paragraphs: [
      "The dot product of a = (a₁, a₂, a₃) and b = (b₁, b₂, b₃) is a · b = a₁b₁ + a₂b₂ + a₃b₃. It is a scalar, not a vector.",
      "The angle θ between a and b satisfies cos θ = (a · b) / (|a| |b|). Rearrange to θ = arccos((a · b) / (|a| |b|)).",
      "Two vectors are perpendicular if and only if their dot product is zero: a · b = 0 ↔ a ⊥ b. This is the quickest perpendicularity test.",
      "The scalar projection of a onto b is the signed length of the component of a in the direction of b: a · b̂ = (a · b) / |b|. If b is a unit vector, this simplifies to just a · b.",
    ],
    latexBlocks: [
      "\\mathbf{a}\\cdot\\mathbf{b} = a_1 b_1 + a_2 b_2 + a_3 b_3",
      "\\cos\\theta = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}",
      "\\mathbf{a}\\perp\\mathbf{b} \\iff \\mathbf{a}\\cdot\\mathbf{b}=0",
      "\\text{scalar projection of }\\mathbf{a}\\text{ onto }\\mathbf{b} = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|}",
    ],
  },
  workedExamples: [
    {
      title: "Dot product and angle",
      questionLatex: "\\text{Find the angle between }\\mathbf{a}=(1,2,2)\\text{ and }\\mathbf{b}=(2,2,1).",
      steps: [
        { explanation: "Compute the dot product.", latex: "\\mathbf{a}\\cdot\\mathbf{b}=1\\cdot2+2\\cdot2+2\\cdot1=2+4+2=8" },
        { explanation: "Find magnitudes: both equal 3.", latex: "|\\mathbf{a}|=\\sqrt{1+4+4}=3,\\quad |\\mathbf{b}|=\\sqrt{4+4+1}=3" },
        { explanation: "Apply the cosine formula.", latex: "\\cos\\theta=\\frac{8}{3\\cdot3}=\\frac{8}{9}" },
        { explanation: "Find θ.", latex: "\\theta=\\arccos\\!\\left(\\tfrac{8}{9}\\right)\\approx27.3^\\circ" },
      ],
      finalAnswerLatex: "\\theta = \\arccos\\!\\left(\\tfrac{8}{9}\\right)",
    },
    {
      title: "Perpendicularity condition",
      questionLatex: "\\text{Find }t\\text{ such that }\\mathbf{a}=(1,t,2)\\perp\\mathbf{b}=(2,1,-1).",
      steps: [
        { explanation: "Set the dot product equal to zero.", latex: "\\mathbf{a}\\cdot\\mathbf{b}=2+t-2=0" },
        { explanation: "Solve.", latex: "t=0" },
      ],
      finalAnswerLatex: "t = 0",
    },
  ],
  guidedPractice: [
    v3Choice(
      "v3d-g1",
      "Find (1, 2, 3) · (3, 2, 1).",
      "A",
      ["10", "6", "14", "0"],
      "1×3 + 2×2 + 3×1 = 3 + 4 + 3 = 10.",
      "Multiply matching components and add the results."
    ),
    v3Typed(
      "v3d-g2",
      "Find a · b where a = (2, 1, −1) and b = (1, 3, 2).",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "3",
      [],
      "2×1 + 1×3 + (−1)×2 = 2 + 3 − 2 = 3."
    ),
    v3Choice(
      "v3d-g3",
      "a = (1, 2, 2) and b = (2, 1, −2). Given that a · b = 0, what is the angle between a and b?",
      "A",
      ["90°", "0°", "45°", "180°"],
      "a · b = 0 means the vectors are perpendicular: θ = 90°.",
      "A zero dot product always means perpendicular vectors."
    ),
    v3Typed(
      "v3d-g4",
      "Find a · b where a = (3, 0, 0) and b = (3, 4, 0).",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "9",
      [],
      "3×3 + 0×4 + 0×0 = 9."
    ),
  ],
  independentPractice: [
    v3Typed(
      "v3d-i1",
      "Find a · b where a = (1, 2, 2) and b = (2, 1, −2).",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "0",
      [],
      "1×2 + 2×1 + 2×(−2) = 2 + 2 − 4 = 0."
    ),
    v3Typed(
      "v3d-i2",
      "a = (1, 2, 2) and b = (2, 1, −2). Using the dot product, find the angle between them in degrees.",
      "\\mathbf{a}=(1,2,2),\\quad \\mathbf{b}=(2,1,-2)",
      "90",
      ["90°"],
      "a · b = 0, so θ = 90°.",
      "If a · b = 0, the vectors are perpendicular without needing arccos."
    ),
    v3Typed(
      "v3d-i3",
      "Find the scalar projection of a = (3, 4, 0) onto b = (1, 0, 0).",
      "\\mathbf{a}=(3,4,0),\\quad \\mathbf{b}=(1,0,0)",
      "3",
      [],
      "a · b = 3. |b| = 1. Scalar projection = 3/1 = 3.",
      "Scalar projection = (a · b) / |b|. Here b is already a unit vector."
    ),
    v3Typed(
      "v3d-i4",
      "Find t such that a = (1, t, 2) and b = (2, 1, −1) are perpendicular.",
      "\\mathbf{a}=(1,t,2),\\quad \\mathbf{b}=(2,1,-1)",
      "0",
      [],
      "a · b = 2 + t − 2 = t = 0.",
      "Set the dot product equal to zero and solve for t."
    ),
    v3Typed(
      "v3d-i5",
      "Find a · b where a = (0, 3, 4) and b = (0, 4, 3).",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "24",
      [],
      "0×0 + 3×4 + 4×3 = 0 + 12 + 12 = 24."
    ),
  ],
  masteryQuiz: [
    v3Choice(
      "v3d-m1",
      "The dot product a · b equals…",
      "A",
      ["a₁b₁ + a₂b₂ + a₃b₃", "|a||b|", "(a₁+b₁) + (a₂+b₂) + (a₃+b₃)", "a₁² + b₁²"],
      "The dot product is the sum of the products of corresponding components.",
      "Match each component of a with the same-position component of b."
    ),
    v3Typed(
      "v3d-m2",
      "Find a · b where a = (2, 3, 1) and b = (1, −1, 4).",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "3",
      [],
      "2×1 + 3×(−1) + 1×4 = 2 − 3 + 4 = 3."
    ),
    v3Typed(
      "v3d-m3",
      "Find t such that a = (t, 2, 1) and b = (2, −1, 0) are perpendicular.",
      "\\mathbf{a}=(t,2,1),\\quad \\mathbf{b}=(2,-1,0)",
      "1",
      [],
      "2t − 2 + 0 = 0 → t = 1.",
      "Set a · b = 0 and solve: 2t + 2(−1) + 1(0) = 0."
    ),
    v3Choice(
      "v3d-m4",
      "Two vectors a and b are perpendicular when…",
      "A",
      ["a · b = 0", "|a| = |b|", "a + b = 0", "a · b = 1"],
      "Perpendicularity means the angle between vectors is 90°, which gives cos90° = 0, so a · b = 0.",
      "Recall: cos θ = (a · b)/(|a||b|). For θ = 90°, cos θ = 0."
    ),
    v3Typed(
      "v3d-m5",
      "Find a · b where a = (1, 2, 2) and b = (2, 2, 1).",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "8",
      [],
      "1×2 + 2×2 + 2×1 = 2 + 4 + 2 = 8."
    ),
    v3Typed(
      "v3d-m6",
      "a = (1, 2, 2) and b = (2, 2, 1). Both have |a| = |b| = 3. Find cos θ, where θ is the angle between them.",
      "\\mathbf{a}\\cdot\\mathbf{b}=8,\\quad |\\mathbf{a}|=|\\mathbf{b}|=3",
      "8/9",
      [],
      "cos θ = 8 / (3 × 3) = 8/9.",
      "Substitute a · b = 8 and |a||b| = 9 into the formula."
    ),
    v3Typed(
      "v3d-m7",
      "Find a · b where a = (1, 2, 2) and b = (2, −1, 0).",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "0",
      [],
      "1×2 + 2×(−1) + 2×0 = 2 − 2 + 0 = 0. The vectors are perpendicular."
    ),
    v3Typed(
      "v3d-m8",
      "Find the angle in degrees between d₁ = (1, 1, 0) and d₂ = (0, 1, 1).",
      "\\mathbf{d_1}=(1,1,0),\\quad \\mathbf{d_2}=(0,1,1)",
      "60",
      ["60°"],
      "d₁ · d₂ = 0+1+0 = 1. |d₁| = |d₂| = √2. cos θ = 1/2. θ = 60°.",
      "Compute the dot product, divide by |d₁||d₂| = 2, then identify the angle."
    ),
    v3Typed(
      "v3d-m9",
      "Find t such that a = (t, 1, −2) and b = (3, t, 1) are perpendicular.",
      "\\mathbf{a}=(t,1,-2),\\quad \\mathbf{b}=(3,t,1)",
      "1/2",
      ["0.5"],
      "3t + t − 2 = 0 → 4t = 2 → t = 1/2.",
      "Expand a · b = 3t + t(1) + (−2)(1) = 4t − 2 = 0."
    ),
    v3Typed(
      "v3d-m10",
      "Find the angle in degrees between a = (1, 0, 0) and b = (1, 1, 0).",
      "\\mathbf{a}=(1,0,0),\\quad \\mathbf{b}=(1,1,0)",
      "45",
      ["45°"],
      "a · b = 1. |a| = 1, |b| = √2. cos θ = 1/√2. θ = 45°.",
      "Compute a · b = 1, |a| = 1, |b| = √2. Then cos θ = 1/√2."
    ),
  ],
  masteryPassMark: 0.8,
  multiPartPractice: [
    {
      id: "v3d-mp-1",
      prompt: "Let a = (1, 2, 2) and b = (2, 2, 1). Both vectors have magnitude 3.",
      latex: "\\mathbf{a}=(1,2,2),\\quad \\mathbf{b}=(2,2,1),\\quad |\\mathbf{a}|=|\\mathbf{b}|=3",
      answer: "8",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find a · b.",
          marks: 1,
          answer: "8",
          hint: "Multiply corresponding components and add.",
          explanation: "a · b = 1×2 + 2×2 + 2×1 = 2 + 4 + 2 = 8.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find cos θ, where θ is the angle between a and b.",
          marks: 1,
          answer: "8/9",
          hint: "cos θ = (a · b) / (|a| |b|). Substitute your answer from (a) and |a| = |b| = 3.",
          explanation: "cos θ = 8 / (3 × 3) = 8/9.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find t such that c = (t, 1, −1) is perpendicular to a = (1, 2, 2).",
          marks: 2,
          answer: "0",
          hint: "Set a · c = 0: t + 2(1) + 2(−1) = 0. Solve for t.",
          explanation: "a · c = t + 2 − 2 = t = 0.",
        },
      ],
    },
  ],
  masteryQuizPool: [
    { ...v3Choice("y12e2-vec-dot-pool-1", "The dot product a·b equals zero exactly when:", "B", ["a and b are parallel.", "a and b are perpendicular.", "a and b are equal.", "a or b is a unit vector."], "a·b = |a||b|cosθ; this is zero (for non-zero vectors) precisely when cosθ = 0, i.e. θ = 90°."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-dot-pool-2", "Find the dot product (1, 2, 3)·(4, 5, 6).", "(1,2,3)\\cdot(4,5,6)", "32", [], "1·4 + 2·5 + 3·6 = 4 + 10 + 18 = 32."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-dot-pool-3", "Find the dot product (2, −1, 3)·(1, 4, 2).", "(2,-1,3)\\cdot(1,4,2)", "4", [], "2·1 + (−1)·4 + 3·2 = 2 − 4 + 6 = 4."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-dot-pool-4", "Find t so that (t, 2, 1) is perpendicular to (3, −1, −1).", "(t,2,1)\\cdot(3,-1,-1)=0", "1", [], "Dot = 3t − 2 − 1 = 3t − 3 = 0, so t = 1."), difficulty: 3 },
    { ...v3Choice("y12e2-vec-dot-pool-5", "A student says the dot product a·b is a vector. What is wrong?", "C", ["a·b is undefined in 3D.", "a·b is a matrix.", "a·b is a SCALAR (a single number), not a vector.", "a·b is always zero."], "The dot product combines two vectors into one number (a scalar). The cross product, by contrast, returns a vector."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-dot-pool-6", "The angle θ between two vectors satisfies cosθ = (a·b)/(|a||b|). If a·b = 0, find θ in degrees.", "\\cos\\theta = \\frac{a\\cdot b}{|a||b|}", "90", ["90°"], "cosθ = 0 gives θ = 90° — the vectors are perpendicular."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-dot-pool-7", "For a = (1, 0, 0) and b = (1, 1, 0): a·b = 1, |a| = 1, |b| = √2, so cosθ = 1/√2. Find θ in degrees.", "\\cos\\theta = \\tfrac{1}{\\sqrt2}", "45", ["45°"], "cosθ = 1/√2 gives θ = 45°."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-dot-pool-8", "If |a| = 3, |b| = 4, and the angle between them is 60°, find a·b. (a·b = |a||b|cosθ, cos60° = 1/2.)", "a\\cdot b = |a||b|\\cos\\theta", "6", [], "a·b = 3·4·cos60° = 12·(1/2) = 6."), difficulty: 4 },
    { ...v3Choice("y12e2-vec-dot-pool-9", "If a·b > 0 for two non-zero vectors, the angle between them is:", "B", ["Obtuse (greater than 90°).", "Acute (less than 90°).", "Exactly 90°.", "Exactly 180°."], "a·b = |a||b|cosθ. A positive dot product means cosθ > 0, so θ is acute."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-dot-pool-10", "The scalar projection of a onto b is (a·b)/|b|. For a = (3, 4, 0) and b = (0, 5, 0), find this projection.", "\\text{proj} = \\frac{a\\cdot b}{|b|}", "4", [], "a·b = 0 + 20 + 0 = 20 and |b| = 5, so the scalar projection is 20/5 = 4."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-dot-pool-11", "Find t so that (1, 1, 0) and (1, t, 0) are perpendicular.", "(1,1,0)\\cdot(1,t,0)=0", "-1", ["−1"], "Dot = 1 + t = 0, so t = −1."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-dot-pool-12", "Explain by result: a·a equals |a|² (a vector dotted with itself gives its magnitude squared). For a = (2, 3, 6), compute a·a.", "a\\cdot a = |a|^2", "49", [], "a·a = 4 + 9 + 36 = 49, which equals |a|² since |a| = 7 — dotting a vector with itself recovers its squared length."), difficulty: 5 },
  ],
};

// ─── Lesson 3: Equations of Lines in 3D ──────────────────────────────────────

const equationsOfLines3D: Partial<ExplicitLesson> = {
  description:
    "Write the vector and parametric equations of a line in three dimensions, find points on a line, and determine whether a given point lies on a line.",
  learningIntention:
    "Construct and use the vector equation r = a + td to describe and query lines in 3D space.",
  successCriteria: [
    "Write the vector equation of a line given a point on the line and a direction vector.",
    "Find a specific point on a line by substituting a given value of t.",
    "Write the parametric equations x, y, z in terms of t.",
    "Find the direction vector between two points and use it to write a line equation.",
    "Determine whether a given point lies on a line by solving for t and checking consistency.",
  ],
  teaching: {
    paragraphs: [
      "A line in 3D is described by r = a + td, where a is the position vector of a known point on the line, d is the direction vector, and t is a real parameter. Every value of t gives a different point on the line.",
      "The parametric form writes the three coordinates separately: x = a₁ + td₁, y = a₂ + td₂, z = a₃ + td₃. To find a specific point, substitute the value of t.",
      "To write the equation of the line through two points A and B, use direction d = B − A and anchor point a = A: r = A + t(B − A).",
      "To test whether a point P lies on the line, solve one parametric equation for t, then substitute that t into the other two equations. If all three are satisfied, P is on the line.",
    ],
    latexBlocks: [
      "\\mathbf{r} = \\mathbf{a} + t\\mathbf{d}\\quad (t\\in\\mathbb{R})",
      "x=a_1+td_1,\\quad y=a_2+td_2,\\quad z=a_3+td_3",
      "\\text{Line through }A\\text{ and }B:\\; \\mathbf{r}=A+t(B-A)",
    ],
  },
  workedExamples: [
    {
      title: "Vector equation of a line",
      questionLatex: "\\text{Write the equation of the line through }A=(1,2,3)\\text{ with direction }\\mathbf{d}=(2,-1,0).",
      vector3DDiagram: {
        description: "The line through A = (1, 2, 3) with direction vector d = (2, −1, 0).",
        axisLength: 5,
        points: [{ x: 1, y: 2, z: 3, label: "A" }],
        vectors: [{ from: { x: 1, y: 2, z: 3 }, to: { x: 3, y: 1, z: 3 }, label: "d" }],
        lines: [{ point: { x: 1, y: 2, z: 3 }, direction: { x: 2, y: -1, z: 0 }, tMin: -0.5, tMax: 1.5 }],
      },
      steps: [
        { explanation: "Use r = a + td with a = (1, 2, 3) and d = (2, −1, 0).", latex: "\\mathbf{r}=(1,2,3)+t(2,-1,0)" },
        { explanation: "Write parametric equations.", latex: "x=1+2t,\\quad y=2-t,\\quad z=3" },
      ],
      finalAnswerLatex: "\\mathbf{r}=(1,2,3)+t(2,-1,0)",
    },
    {
      title: "Testing whether a point is on a line",
      questionLatex: "\\text{Is }P=(4,5,7)\\text{ on the line }\\mathbf{r}=(1,2,1)+t(3,3,6)?",
      steps: [
        { explanation: "Solve the x-equation for t.", latex: "1+3t=4\\;\\Rightarrow\\;t=1" },
        { explanation: "Check y: 2+3(1)=5 ✓. Check z: 1+6(1)=7 ✓.", latex: "\\text{All three equations satisfied at }t=1" },
      ],
      finalAnswerLatex: "P\\text{ is on the line }(t=1)",
    },
  ],
  guidedPractice: [
    v3Choice(
      "v3l-g1",
      "The vector equation of the line through (1, 2, 3) with direction (2, −1, 4) is…",
      "A",
      ["r = (1,2,3) + t(2,−1,4)", "r = (2,−1,4) + t(1,2,3)", "r = t(1,2,3)", "r = (1,2,3) − t(2,−1,4)"],
      "r = a + td with a = (1,2,3) and d = (2,−1,4).",
      "The anchor point comes first, then + t times the direction."
    ),
    v3Typed(
      "v3l-g2",
      "The line r = (2, 0, 1) + t(1, 3, −2). Find the coordinates of the point when t = 1.",
      "\\mathbf{r}=(2,0,1)+t(1,3,-2),\\quad t=1",
      "(3, 3, -1)",
      ["(3,3,-1)"],
      "(2+1, 0+3, 1−2) = (3, 3, −1).",
      "Substitute t = 1 into each parametric equation: x, y, z.",
      {
        description: "The line r = (2,0,1) + t(1,3,−2). Point A = (2,0,1) is marked. Find the position at t = 1.",
        axisLength: 4,
        points: [{ x: 2, y: 0, z: 1, label: "A (t=0)" }],
        lines: [{ point: { x: 2, y: 0, z: 1 }, direction: { x: 1, y: 3, z: -2 }, tMin: 0, tMax: 1.5 }],
      }
    ),
    v3Choice(
      "v3l-g3",
      "A line is r = (0,0,0) + t(1,2,3). What is the parametric equation for y?",
      "A",
      ["y = 2t", "y = t", "y = 3t", "y = 2"],
      "y = a₂ + td₂ = 0 + t(2) = 2t.",
      "Pick the y-component of a and the y-component of d."
    ),
    v3Typed(
      "v3l-g4",
      "A line passes through A = (1, 2, −1) and B = (3, 4, 1). Find the direction vector AB.",
      "A=(1,2,-1),\\quad B=(3,4,1)",
      "(2, 2, 2)",
      ["(1, 1, 1)", "(1,1,1)", "(2,2,2)"],
      "AB = B − A = (3−1, 4−2, 1−(−1)) = (2, 2, 2), or simplified (1, 1, 1).",
      "Subtract the coordinates of A from those of B.",
      {
        description: "Points A = (1, 2, -1) and B = (3, 4, 1) joined by the direction vector AB.",
        axisLength: 5,
        points: [
          { x: 1, y: 2, z: -1, label: "A" },
          { x: 3, y: 4, z: 1, label: "B" },
        ],
        vectors: [{ from: { x: 1, y: 2, z: -1 }, to: { x: 3, y: 4, z: 1 }, label: "AB" }],
      }
    ),
  ],
  independentPractice: [
    v3Typed(
      "v3l-i1",
      "r = (3, 1, 2) + t(1, −1, 3). Find the coordinates when t = 2.",
      "\\mathbf{r}\\text{ at }t=2",
      "(5, -1, 8)",
      ["(5,-1,8)"],
      "(3+2, 1−2, 2+6) = (5, −1, 8)."
    ),
    v3Typed(
      "v3l-i2",
      "A line has equation r = (1, 0, −1) + t(2, 1, 0). Write the parametric equation for y.",
      "\\mathbf{r}=(1,0,-1)+t(2,1,0)",
      "t",
      ["y = t", "1t"],
      "y = 0 + 1·t = t.",
      "y-parametric: a₂ + t·d₂ = 0 + t(1) = t."
    ),
    v3Choice(
      "v3l-i3",
      "A line passes through A = (1, 2, 3) and B = (4, 2, 1). What is the direction vector AB?",
      "A",
      ["(3, 0, −2)", "(1, 2, 3)", "(4, 2, 1)", "(3, 2, 2)"],
      "AB = B − A = (4−1, 2−2, 1−3) = (3, 0, −2).",
      "Direction = B − A."
    ),
    v3Typed(
      "v3l-i4",
      "The point (4, 5, 7) lies on the line r = (1, 2, 1) + t(3, 3, 6). Find the value of t.",
      "P=(4,5,7),\\quad \\mathbf{r}=(1,2,1)+t(3,3,6)",
      "1",
      [],
      "From x: 1+3t=4 → t=1. Check: y=2+3=5✓, z=1+6=7✓.",
      "Use the x-equation to find t, then verify with y and z.",
      {
        description: "The line r = (1, 2, 1) + t(3, 3, 6) shown with the marked point P = (4, 5, 7), which lies on the line when t = 1.",
        axisLength: 8,
        points: [
          { x: 1, y: 2, z: 1, label: "A" },
          { x: 4, y: 5, z: 7, label: "P" },
        ],
        lines: [{ point: { x: 1, y: 2, z: 1 }, direction: { x: 3, y: 3, z: 6 }, tMin: 0, tMax: 1.2 }],
      }
    ),
    v3Typed(
      "v3l-i5",
      "A line passes through (2, 3, 4) and (5, 3, 4). Find the magnitude of the direction vector.",
      "A=(2,3,4),\\quad B=(5,3,4)",
      "3",
      [],
      "Direction = (5−2, 3−3, 4−4) = (3, 0, 0). |(3,0,0)| = 3."
    ),
  ],
  masteryQuiz: [
    v3Choice(
      "v3l-m1",
      "r = a + td represents…",
      "A",
      ["a line through point a with direction d", "a circle through a and d", "a plane containing d", "a line through the origin"],
      "r = a + td is the vector equation of the line through the point with position vector a, running in direction d.",
      "Identify what a and d each represent in the vector equation."
    ),
    v3Typed(
      "v3l-m2",
      "r = (1, 0, 2) + t(2, 1, −1). Find the coordinates when t = −1.",
      "\\mathbf{r}\\text{ at }t=-1",
      "(-1, -1, 3)",
      ["(-1,-1,3)"],
      "(1−2, 0−1, 2+1) = (−1, −1, 3)."
    ),
    v3Choice(
      "v3l-m3",
      "A line has direction (1, 2, 1). Which of the following is a direction vector of a parallel line?",
      "A",
      ["(2, 4, 2)", "(1, 2, −1)", "(−1, 2, 1)", "(2, 1, 2)"],
      "(2,4,2) = 2(1,2,1): a scalar multiple, so it defines the same direction.",
      "Parallel lines have direction vectors that are scalar multiples of each other."
    ),
    v3Typed(
      "v3l-m4",
      "The line r = (0, 0, 0) + t(1, 1, 1) crosses the plane x = 3. Find the coordinates of the crossing point.",
      "\\mathbf{r}=t(1,1,1),\\quad x=3",
      "(3, 3, 3)",
      ["(3,3,3)"],
      "x = t = 3. Then y = 3, z = 3. Point: (3, 3, 3)."
    ),
    v3Typed(
      "v3l-m5",
      "r = (2, −1, 3) + t(1, 2, −1). Find t when the z-coordinate equals 1.",
      "\\mathbf{r}=(2,-1,3)+t(1,2,-1),\\quad z=1",
      "2",
      [],
      "z = 3 − t = 1 → t = 2.",
      "Set the z-parametric equation equal to 1 and solve."
    ),
    v3Typed(
      "v3l-m6",
      "Find the midpoint of A = (1, 2, 3) and B = (3, 4, 3).",
      "\\frac{A+B}{2}",
      "(2, 3, 3)",
      ["(2,3,3)"],
      "Midpoint = ((1+3)/2, (2+4)/2, (3+3)/2) = (2, 3, 3)."
    ),
    v3Choice(
      "v3l-m7",
      "Lines with direction vectors d₁ = (1, 2, 3) and d₂ = (2, 4, 6) are…",
      "A",
      ["parallel", "perpendicular", "skew", "identical"],
      "d₂ = 2d₁, so the directions are scalar multiples — the lines are parallel.",
      "Check whether one direction vector is a scalar multiple of the other."
    ),
    v3Typed(
      "v3l-m8",
      "r = (0, 1, 0) + t(1, −1, 2). Find the y-coordinate when x = 3.",
      "\\mathbf{r}=(0,1,0)+t(1,-1,2),\\quad x=3",
      "-2",
      [],
      "From x: t = 3. y = 1 − 3 = −2.",
      "Use the x-equation to find t, then substitute into the y-equation."
    ),
    v3Typed(
      "v3l-m9",
      "Find the value of t such that the point (5, 4, 3) lies on r = (1, 2, 3) + t(2, 1, 0).",
      "P=(5,4,3),\\quad \\mathbf{r}=(1,2,3)+t(2,1,0)",
      "2",
      [],
      "From x: 1+2t=5 → t=2. Check: y=2+2=4✓, z=3✓."
    ),
    v3Typed(
      "v3l-m10",
      "The line r = (0, 0, 0) + t(3, 4, 0). Find the y-coordinate when t = 3.",
      "\\mathbf{r}=t(3,4,0),\\quad t=3",
      "12",
      [],
      "y = 4×3 = 12."
    ),
  ],
  masteryPassMark: 0.8,
  multiPartPractice: [
    {
      id: "v3l-mp-1",
      prompt: "A line passes through A = (2, 0, 1) with direction vector d = (1, 2, −1).",
      latex: "\\mathbf{r} = (2,0,1)+t(1,2,-1)",
      answer: "1-t",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Write the parametric equation for z.",
          marks: 1,
          answer: "1-t",
          acceptedAnswers: ["1 - t", "z = 1 - t", "z=1-t"],
          hint: "z = a₃ + t·d₃ = 1 + t(−1).",
          explanation: "z = 1 + t(−1) = 1 − t.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the coordinates of the point on the line when t = 2.",
          marks: 2,
          answer: "(4, 4, -1)",
          acceptedAnswers: ["(4,4,-1)"],
          hint: "Substitute t = 2 into all three parametric equations.",
          explanation: "x = 2+2 = 4, y = 0+4 = 4, z = 1−2 = −1. Point: (4, 4, −1).",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the value of t at which the line crosses the plane z = 0.",
          marks: 1,
          answer: "1",
          hint: "Set your z-parametric equation from (a) equal to 0 and solve.",
          explanation: "1 − t = 0 → t = 1.",
        },
      ],
    },
  ],
  masteryQuizPool: [
    { ...v3Choice("y12e2-vec-line-pool-1", "In the vector equation of a line r = a + λb, what does b represent?", "B", ["A second point on the line.", "The direction vector of the line.", "The midpoint of the line.", "A unit normal to the line."], "a is a fixed point (anchor) on the line and b is its direction vector; varying λ sweeps out every point of the line."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-line-pool-2", "For the line r = (1, 0, 2) + λ(2, 1, 3), find the x-coordinate of the point at λ = 1.", "r = (1,0,2) + \\lambda(2,1,3)", "3", [], "x = 1 + 2(1) = 3."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-line-pool-3", "For the same line r = (1, 0, 2) + λ(2, 1, 3), find the x-coordinate at λ = 2.", "r = (1,0,2) + \\lambda(2,1,3)", "5", [], "x = 1 + 2(2) = 5."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-line-pool-4", "For r = (1, 0, 2) + λ(2, 1, 3), find the value of λ at which the y-coordinate equals 4.", "y = 0 + \\lambda", "4", [], "y = 0 + λ = 4, so λ = 4."), difficulty: 3 },
    { ...v3Choice("y12e2-vec-line-pool-5", "Two lines have direction vectors (1, 2, 3) and (2, 4, 6). The lines are:", "B", ["Perpendicular.", "Parallel (one direction is a scalar multiple of the other).", "Skew.", "Always intersecting at the origin."], "(2, 4, 6) = 2(1, 2, 3), so the directions are scalar multiples — the lines are parallel."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-line-pool-6", "A line passes through A(1, 2, 3) with direction (4, 0, −1): r = (1, 2, 3) + λ(4, 0, −1). Find the z-coordinate at λ = 3.", "z = 3 + \\lambda(-1)", "0", [], "z = 3 + 3(−1) = 0."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-line-pool-7", "Does (5, 2, 2) lie on r = (1, 2, 3) + λ(4, 0, −1)? Find λ from the x-equation 1 + 4λ = 5 (the z-equation then confirms it).", "1 + 4\\lambda = 5", "1", [], "λ = 1 from x; check z: 3 + 1(−1) = 2 ✓ and y: 2 ✓. So the point lies on the line at λ = 1."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-line-pool-8", "A line passes through (1, 1, 1) and (3, 4, 5). Its direction vector is the displacement (3, 4, 5) − (1, 1, 1). Find the z-component of this direction.", "d = Q - P", "4", [], "(3, 4, 5) − (1, 1, 1) = (2, 3, 4), so the z-component is 4."), difficulty: 4 },
    { ...v3Choice("y12e2-vec-line-pool-9", "A student writes the direction of the line through P and Q as P + Q. What is wrong?", "C", ["The direction should be the midpoint.", "P + Q is correct.", "The direction is Q − P (the displacement between the points), not P + Q.", "A line through two points has no direction."], "The direction of a line through two points is their difference Q − P. Adding the position vectors gives an unrelated vector."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-line-pool-10", "Lines r = (1, 0, 0) + λ(1, 2, 0) and r = (0, 1, 0) + μ(2, 1, 0) intersect. Equating components gives 1 + λ = 2μ and 2λ = 1 + μ. Solve for λ.", "1+\\lambda = 2\\mu,\\ 2\\lambda = 1+\\mu", "1", [], "From the first, μ = (1 + λ)/2. Substituting: 2λ = 1 + (1 + λ)/2 → 4λ = 3 + λ → λ = 1."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-line-pool-11", "For the line r = (2, −1, 4) + λ(1, 3, −2), find the parameter λ at which the line crosses the plane z = 0.", "z = 4 - 2\\lambda = 0", "2", [], "z = 4 − 2λ = 0, so λ = 2."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-line-pool-12", "Explain by result: two lines are parallel iff their direction vectors are scalar multiples of one common direction. Directions (2, 4, 6) and (3, 6, 9) are both multiples of (1, 2, 3); the second is 3×(1,2,3). State the scalar for the first.", "(2,4,6) = k(1,2,3)", "2", [], "(2, 4, 6) = 2(1, 2, 3), so the scalar is 2 — both lines share the direction (1, 2, 3), confirming they are parallel."), difficulty: 5 },
  ],
};

// ─── Lesson 4: Vector Applications and Exam Practice ─────────────────────────

const vectorApplicationsExamPractice: Partial<ExplicitLesson> = {
  description:
    "Apply 3D vector techniques — dot product, angle between lines, projections and line equations — to solve combined exam-style problems.",
  learningIntention:
    "Combine dot product, line equations and magnitude skills to solve multi-step Extension 2 vector problems.",
  successCriteria: [
    "Find the angle between two lines using their direction vectors.",
    "Determine whether two lines are parallel, perpendicular or neither.",
    "Find the coordinates of a specific point on a line from a geometric condition.",
    "Solve problems that combine magnitude, dot product and parametric line skills.",
  ],
  teaching: {
    paragraphs: [
      "The angle between two lines in 3D is found from the angle between their direction vectors: cos θ = |d₁ · d₂| / (|d₁| |d₂|). Take the absolute value to always get the acute angle (0° ≤ θ ≤ 90°).",
      "Two lines are parallel when their direction vectors are scalar multiples: d₁ = k d₂. They are perpendicular when d₁ · d₂ = 0.",
      "Combining skills: you may need to (1) find a direction vector from two given points, (2) compute a dot product, (3) use the result to find an angle or test a condition.",
      "When a question asks for the coordinates of a point on a line satisfying a condition (e.g. z = 0, or |OP| = 5), substitute the parametric form into the condition and solve for t, then back-substitute.",
    ],
    latexBlocks: [
      "\\cos\\theta = \\frac{|\\mathbf{d_1}\\cdot\\mathbf{d_2}|}{|\\mathbf{d_1}||\\mathbf{d_2}|}",
      "\\text{Parallel: }\\mathbf{d_1}=k\\mathbf{d_2}\\text{ for some }k\\in\\mathbb{R}",
      "\\text{Perpendicular: }\\mathbf{d_1}\\cdot\\mathbf{d_2}=0",
    ],
  },
  workedExamples: [
    {
      title: "Angle between two lines",
      questionLatex: "\\text{Find the acute angle between lines with directions }\\mathbf{d_1}=(1,1,0)\\text{ and }\\mathbf{d_2}=(0,1,1).",
      steps: [
        { explanation: "Compute the dot product.", latex: "\\mathbf{d_1}\\cdot\\mathbf{d_2}=0+1+0=1" },
        { explanation: "Find the magnitudes.", latex: "|\\mathbf{d_1}|=\\sqrt{2},\\quad|\\mathbf{d_2}|=\\sqrt{2}" },
        { explanation: "Apply the formula.", latex: "\\cos\\theta=\\frac{1}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{1}{2}" },
        { explanation: "Find θ.", latex: "\\theta=\\arccos\\!\\left(\\tfrac{1}{2}\\right)=60^\\circ" },
      ],
      finalAnswerLatex: "\\theta = 60^\\circ",
    },
    {
      title: "Point on a line satisfying a condition",
      questionLatex: "\\text{Line }\\mathbf{r}=(2,3,1)+t(1,0,-1).\\text{ Find the point where }z=0.",
      steps: [
        { explanation: "Write the z-parametric equation and set it to 0.", latex: "z=1-t=0\\;\\Rightarrow\\;t=1" },
        { explanation: "Substitute t = 1 to find all coordinates.", latex: "(2+1,\\,3+0,\\,1-1)=(3,3,0)" },
      ],
      finalAnswerLatex: "(3, 3, 0)",
    },
  ],
  guidedPractice: [
    v3Choice(
      "v3a-g1",
      "The angle θ between two lines with direction vectors d₁ and d₂ satisfies…",
      "A",
      ["cos θ = (d₁·d₂)/(|d₁||d₂|)", "cos θ = d₁ × d₂", "θ = |d₁ − d₂|", "θ = d₁ + d₂"],
      "The angle formula uses the dot product: cos θ = (d₁·d₂)/(|d₁||d₂|).",
      "Recall the dot product angle formula."
    ),
    v3Typed(
      "v3a-g2",
      "Find the angle in degrees between lines with directions (1, 0, 0) and (0, 0, 1).",
      "\\mathbf{d_1}=(1,0,0),\\quad \\mathbf{d_2}=(0,0,1)",
      "90",
      ["90°"],
      "d₁·d₂ = 0, so θ = 90°.",
      "Compute the dot product first. A zero result means 90°."
    ),
    v3Choice(
      "v3a-g3",
      "d₁ · d₂ = 0. The lines are…",
      "A",
      ["perpendicular", "parallel", "identical", "skew"],
      "A zero dot product means cos θ = 0, so θ = 90°: the lines are perpendicular.",
      "Connect the dot product result to the geometric relationship."
    ),
    v3Typed(
      "v3a-g4",
      "Find the angle in degrees between lines with directions d₁ = (1, 0, 0) and d₂ = (1, 1, 0).",
      "\\mathbf{d_1}=(1,0,0),\\quad \\mathbf{d_2}=(1,1,0)",
      "45",
      ["45°"],
      "d₁·d₂ = 1. |d₁| = 1, |d₂| = √2. cos θ = 1/√2. θ = 45°.",
      "Find the dot product, then divide by |d₁||d₂| to get cos θ."
    ),
  ],
  independentPractice: [
    v3Typed(
      "v3a-i1",
      "Find d₁ · d₂ where d₁ = (1, 2, 2) and d₂ = (2, 1, −2).",
      "\\mathbf{d_1}\\cdot\\mathbf{d_2}",
      "0",
      [],
      "1×2 + 2×1 + 2×(−2) = 2 + 2 − 4 = 0."
    ),
    v3Typed(
      "v3a-i2",
      "Find the angle in degrees between lines with directions d₁ = (1, 1, 0) and d₂ = (1, 0, 1).",
      "\\mathbf{d_1}=(1,1,0),\\quad \\mathbf{d_2}=(1,0,1)",
      "60",
      ["60°"],
      "d₁·d₂ = 1. |d₁| = √2, |d₂| = √2. cos θ = 1/2. θ = 60°.",
      "Compute d₁·d₂ = 1, then divide by |d₁||d₂| = 2."
    ),
    v3Choice(
      "v3a-i3",
      "Two lines are parallel when…",
      "A",
      ["their direction vectors are scalar multiples of each other", "they share the same starting point", "their dot product is 0", "they always intersect"],
      "Parallel lines have the same direction or opposite directions: d₁ = k·d₂.",
      "Parallel means same direction — not perpendicular (that's dot product = 0)."
    ),
    v3Typed(
      "v3a-i4",
      "Find |AB| where A = (0, 0, 0) and B = (3, 4, 0).",
      "A=(0,0,0),\\quad B=(3,4,0)",
      "5",
      [],
      "AB = (3,4,0). |AB| = √(9+16+0) = 5."
    ),
    v3Typed(
      "v3a-i5",
      "Lines have direction vectors d₁ = (2, 2, 1) and d₂ = (−2, −2, −1). Are they parallel or perpendicular? Enter 'parallel' or 'perpendicular'.",
      "\\mathbf{d_1}=(2,2,1),\\quad \\mathbf{d_2}=(-2,-2,-1)",
      "parallel",
      ["Parallel"],
      "d₂ = −1·d₁, so the directions are scalar multiples: the lines are parallel.",
      "Check: is d₂ a scalar multiple of d₁?"
    ),
  ],
  masteryQuiz: [
    v3Choice(
      "v3a-m1",
      "To find the angle between two lines, the first step is to…",
      "A",
      ["find the dot product of their direction vectors", "subtract the direction vectors", "compute |d₁ − d₂|", "add the direction vectors"],
      "The angle formula cos θ = (d₁·d₂)/(|d₁||d₂|) starts with the dot product.",
      "The angle formula starts with the dot product of the direction vectors."
    ),
    v3Typed(
      "v3a-m2",
      "Find d₁ · d₂ where d₁ = (1, 2, 2) and d₂ = (2, 2, 1).",
      "\\mathbf{d_1}\\cdot\\mathbf{d_2}",
      "8",
      [],
      "1×2 + 2×2 + 2×1 = 2 + 4 + 2 = 8."
    ),
    v3Typed(
      "v3a-m3",
      "d₁ = (1, 2, 2) and d₂ = (2, 2, 1). Both have magnitude 3. Find cos θ.",
      "\\mathbf{d_1}\\cdot\\mathbf{d_2}=8,\\quad |\\mathbf{d_1}|=|\\mathbf{d_2}|=3",
      "8/9",
      [],
      "cos θ = 8 / (3 × 3) = 8/9.",
      "Substitute d₁·d₂ = 8 and |d₁||d₂| = 9."
    ),
    v3Choice(
      "v3a-m4",
      "The line r = a + td passes through position a when…",
      "A",
      ["t = 0", "t = 1", "t = |a|", "t = |d|"],
      "At t = 0: r = a + 0·d = a.",
      "Substitute t = 0 into r = a + td."
    ),
    v3Typed(
      "v3a-m5",
      "Find d₁ · d₂ where d₁ = (1, 1, 0) and d₂ = (0, 1, 1).",
      "\\mathbf{d_1}\\cdot\\mathbf{d_2}",
      "1",
      [],
      "0 + 1 + 0 = 1."
    ),
    v3Typed(
      "v3a-m6",
      "Find the angle in degrees between directions d₁ = (1, 1, 0) and d₂ = (0, 1, 1).",
      "\\mathbf{d_1}=(1,1,0),\\quad \\mathbf{d_2}=(0,1,1)",
      "60",
      ["60°"],
      "d₁·d₂ = 1. |d₁| = |d₂| = √2. cos θ = 1/2. θ = 60°."
    ),
    v3Typed(
      "v3a-m7",
      "Find d₁ · d₂ where d₁ = (1, 1, 1) and d₂ = (1, 1, −2).",
      "\\mathbf{d_1}\\cdot\\mathbf{d_2}",
      "0",
      [],
      "1+1−2 = 0. These direction vectors are perpendicular."
    ),
    v3Typed(
      "v3a-m8",
      "d₁ = (3, 4, 0) and d₂ = (0, 4, 3). Find cos θ between the two lines.",
      "\\mathbf{d_1}=(3,4,0),\\quad \\mathbf{d_2}=(0,4,3)",
      "16/25",
      [],
      "d₁·d₂ = 0+16+0 = 16. |d₁| = |d₂| = 5. cos θ = 16/25.",
      "Compute the dot product, then divide by |d₁||d₂| = 5 × 5."
    ),
    v3Typed(
      "v3a-m9",
      "A point P lies on r = (2, 3, 1) + t(1, 0, −1). The x-coordinate of P is 5. Find the y-coordinate of P.",
      "\\mathbf{r}=(2,3,1)+t(1,0,-1),\\quad x=5",
      "3",
      [],
      "t = 3. y = 3 + 0 = 3.",
      "Use the x-equation to find t = 3, then substitute into the y-equation."
    ),
    v3Typed(
      "v3a-m10",
      "The line r = (1, 2, 3) + t(2, 2, 1). Find the z-coordinate of the point where x = 7.",
      "\\mathbf{r}=(1,2,3)+t(2,2,1),\\quad x=7",
      "6",
      [],
      "1+2t = 7 → t = 3. z = 3+3 = 6.",
      "Find t from the x-equation, then substitute into the z-equation."
    ),
  ],
  masteryPassMark: 0.8,
  multiPartPractice: [
    {
      id: "v3a-mp-1",
      prompt: "Lines ℓ₁ and ℓ₂ have direction vectors d₁ = (3, 4, 0) and d₂ = (0, 4, 3) respectively.",
      latex: "\\mathbf{d_1}=(3,4,0),\\quad \\mathbf{d_2}=(0,4,3)",
      answer: "16",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find d₁ · d₂.",
          marks: 1,
          answer: "16",
          hint: "Multiply matching components and add.",
          explanation: "d₁ · d₂ = 3×0 + 4×4 + 0×3 = 0 + 16 + 0 = 16.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find |d₁|.",
          marks: 1,
          answer: "5",
          hint: "|d₁| = √(3² + 4² + 0²).",
          explanation: "|d₁| = √(9 + 16 + 0) = √25 = 5.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find cos θ, where θ is the acute angle between ℓ₁ and ℓ₂.",
          marks: 2,
          answer: "16/25",
          hint: "cos θ = (d₁·d₂) / (|d₁||d₂|). Note |d₂| = |d₁| = 5.",
          explanation: "|d₂| = √(0+16+9) = 5. cos θ = 16 / (5×5) = 16/25.",
        },
      ],
    },
  ],
  masteryQuizPool: [
    { ...v3Choice("y12e2-vec-app-pool-1", "The work done by a constant force F through a displacement d is given by:", "B", ["F + d", "F·d (the dot product)", "|F||d|", "F − d"], "Work is the dot product W = F·d = |F||d|cosθ — only the component of force along the displacement does work."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-app-pool-2", "Find the work W = F·d for F = (3, 0, 4) and d = (2, 0, 1).", "W = F\\cdot d", "10", [], "W = 3·2 + 0·0 + 4·1 = 6 + 0 + 4 = 10."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-app-pool-3", "Find the angle (in degrees) between (1, 0, 0) and (0, 1, 0).", "\\cos\\theta = \\frac{a\\cdot b}{|a||b|}", "90", ["90°"], "Dot product = 0, so cosθ = 0 and θ = 90°."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-app-pool-4", "Points A(0, 0, 0), B(1, 2, 3), C(2, 4, 6). Since AB = (1, 2, 3) and AC = (2, 4, 6), the points are collinear. Find the scalar λ with AC = λ·AB.", "\\vec{AC} = \\lambda\\,\\vec{AB}", "2", [], "(2, 4, 6) = 2(1, 2, 3), so λ = 2 — A, B, C lie on one line."), difficulty: 3 },
    { ...v3Choice("y12e2-vec-app-pool-5", "The work done by a force acting perpendicular to the displacement is:", "C", ["Equal to |F||d|.", "Negative.", "Zero, because F·d = 0.", "Undefined."], "If F ⊥ d then F·d = 0, so no work is done — this is why a normal force or a centripetal force does zero work."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-app-pool-6", "The scalar projection of a = (3, 4, 0) onto b = (1, 0, 0) is (a·b)/|b|. Find it.", "\\text{proj} = \\frac{a\\cdot b}{|b|}", "3", [], "a·b = 3 and |b| = 1, so the scalar projection is 3."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-app-pool-7", "A force F = (0, −5, 0) moves an object along d = (4, 0, 0). Find the work W = F·d.", "W = F\\cdot d", "0", [], "W = 0·4 + (−5)·0 + 0·0 = 0 — the force is perpendicular to the motion, so no work is done."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-app-pool-8", "Two lines have direction vectors (1, 0, 0) and (1, 1, 0). The angle between them satisfies cosθ = 1/√2. Find θ in degrees.", "\\cos\\theta = \\tfrac{1}{\\sqrt2}", "45", ["45°"], "cosθ = (1)/(1·√2) = 1/√2, so θ = 45°."), difficulty: 4 },
    { ...v3Choice("y12e2-vec-app-pool-9", "Three points A, B, C are collinear if and only if:", "B", ["AB·AC = 0.", "AB and AC are parallel (one is a scalar multiple of the other).", "|AB| = |AC|.", "AB + AC = 0."], "Collinear means the displacements AB and AC point along the same line, i.e. one is a scalar multiple of the other (parallel), not perpendicular."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-app-pool-10", "To find the foot of the perpendicular from a point P to a line, project AP onto the line's unit direction. For AP = (3, 4, 0) and unit direction d = (0, 1, 0), find the scalar projection AP·d.", "AP\\cdot \\hat{d}", "4", [], "AP·d = 3·0 + 4·1 + 0·0 = 4 — this is how far along the line the foot of the perpendicular sits."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-app-pool-11", "A force of magnitude 20 N acts at 60° to a displacement of magnitude 5 m. The work is W = |F||d|cosθ, with cos60° = 1/2. Find W.", "W = |F||d|\\cos\\theta", "50", ["50 J"], "W = 20·5·(1/2) = 50 J."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-app-pool-12", "Explain by result: when a force is perpendicular to the motion it does no work — this is why the normal reaction and the centripetal force do zero work. For F = (0, 0, 7) and motion d = (3, 4, 0), state W = F·d.", "W = F\\cdot d", "0", [], "F·d = 0·3 + 0·4 + 7·0 = 0 — F points purely in z while the motion lies in the xy-plane, so the force is perpendicular and does no work."), difficulty: 5 },
  ],
};

// ─── Lesson 5: Vector Equations of Curves, Circles and Spheres ───────────────

const vectorCurvesCirclesSpheres: Partial<ExplicitLesson> = {
  description:
    "Represent parametric curves as vector equations, recognise the vector forms of circles and spheres, and convert between vector and Cartesian forms.",
  learningIntention:
    "Write and interpret vector equations for parametric curves, circles and spheres, and convert to Cartesian form.",
  successCriteria: [
    "Write a parametric curve as a vector equation r(t) = (x(t), y(t)).",
    "Recognise |r| = R as the vector equation of a circle of radius R centred at the origin.",
    "Recognise |r − a| = R as the vector equation of a circle of radius R centred at the point with position vector a.",
    "Find the Cartesian equation of a circle from its vector form.",
    "Recognise |r − a| = R in three dimensions as the equation of a sphere.",
  ],
  teaching: {
    paragraphs: [
      "A parametric curve in 2D is described by a vector equation r(t) = (x(t), y(t)), where t is a parameter. Each value of t produces one point on the curve. For example, r(t) = (cos t, sin t) traces the unit circle as t varies from 0 to 2π.",
      "The vector equation |r| = R describes the set of all points at distance R from the origin: this is the circle of radius R centred at the origin. In Cartesian form: x² + y² = R².",
      "Shifting the centre: |r − a| = R is the circle of radius R centred at the point with position vector a = (a₁, a₂). Squaring: (x − a₁)² + (y − a₂)² = R². This is the standard Cartesian circle equation.",
      "In three dimensions, |r − a| = R describes all points at distance R from a = (a₁, a₂, a₃): a sphere. Its Cartesian form is (x − a₁)² + (y − a₂)² + (z − a₃)² = R².",
      "To convert from vector to Cartesian form: write r = (x, y), substitute, square both sides, and expand. To convert from Cartesian to vector form: read off the centre as a and the radius as R.",
    ],
    latexBlocks: [
      "\\mathbf{r}(t)=(x(t),\\,y(t))\\quad \\text{parametric vector curve}",
      "|\\mathbf{r}|=R\\;\\Longleftrightarrow\\; x^2+y^2=R^2\\quad\\text{(circle, centre O)}",
      "|\\mathbf{r}-\\mathbf{a}|=R\\;\\Longleftrightarrow\\;(x-a_1)^2+(y-a_2)^2=R^2\\quad\\text{(circle, centre }\\mathbf{a}\\text{)}",
      "|\\mathbf{r}-\\mathbf{a}|=R\\;\\Longleftrightarrow\\;(x-a_1)^2+(y-a_2)^2+(z-a_3)^2=R^2\\quad\\text{(sphere)}",
    ],
  },
  workedExamples: [
    {
      title: "Cartesian equation from vector form",
      questionLatex: "\\text{Find the Cartesian equation of the circle }|\\mathbf{r}-(1,2)|=3.",
      steps: [
        { explanation: "Write r = (x, y) and substitute into |r − a| = R.", latex: "|(x-1,\\,y-2)|=3" },
        { explanation: "Square both sides.", latex: "(x-1)^2+(y-2)^2=9" },
      ],
      finalAnswerLatex: "(x-1)^2+(y-2)^2=9",
    },
    {
      title: "Vector equation from Cartesian form",
      questionLatex: "\\text{Write the vector equation of the circle }(x+2)^2+(y-3)^2=25.",
      steps: [
        { explanation: "Read off centre: a = (−2, 3), radius R = 5.", latex: "\\mathbf{a}=(-2,3),\\quad R=5" },
        { explanation: "Write the vector equation.", latex: "|\\mathbf{r}-(-2,3)|=5" },
      ],
      finalAnswerLatex: "|\\mathbf{r}-(-2,3)|=5",
    },
  ],
  guidedPractice: [
    v3Choice(
      "v3c-g1",
      "The vector equation |r| = 4 represents which curve?",
      "A",
      ["A circle of radius 4 centred at the origin", "A circle of radius 16 centred at the origin", "A sphere of radius 4", "A line at distance 4 from the origin"],
      "|r| = 4 means all points at distance 4 from the origin — a circle of radius 4 centred at O.",
      "Recall: |r| = R is the circle centred at the origin."
    ),
    v3Typed(
      "v3c-g2",
      "Find the Cartesian equation of the circle |r − (3, 0)| = 5.",
      "|\\mathbf{r}-(3,0)|=5",
      "(x-3)^2+y^2=25",
      ["(x-3)²+y²=25"],
      "Square: (x−3)² + y² = 25.",
      "Set r = (x,y), subtract the centre, then square."
    ),
    v3Choice(
      "v3c-g3",
      "The vector equation |r − (1, 2, 3)| = R in 3D represents:",
      "A",
      ["A sphere of radius R centred at (1, 2, 3)", "A circle of radius R in the xy-plane", "A line through (1, 2, 3)", "A plane through (1, 2, 3)"],
      "In 3D, |r − a| = R is the set of all points at distance R from a: a sphere.",
      "In 3D the locus |r − a| = R is always a sphere."
    ),
    v3Typed(
      "v3c-g4",
      "The curve r(t) = (3cos t, 3sin t). Find its Cartesian equation.",
      "\\mathbf{r}(t)=(3\\cos t,3\\sin t)",
      "x^2+y^2=9",
      ["x²+y²=9"],
      "x² + y² = 9cos²t + 9sin²t = 9.",
      "Use cos²t + sin²t = 1."
    ),
  ],
  independentPractice: [
    v3Typed(
      "v3c-i1",
      "Find the Cartesian equation of the circle |r − (2, −1)| = 3.",
      "|\\mathbf{r}-(2,-1)|=3",
      "(x-2)^2+(y+1)^2=9",
      ["(x-2)²+(y+1)²=9"],
      "(x−2)² + (y+1)² = 9."
    ),
    v3Typed(
      "v3c-i2",
      "Write the vector equation of the circle x² + y² = 36.",
      "x^2+y^2=36",
      "|r|=6",
      ["| r | = 6"],
      "x² + y² = 36 is a circle of radius 6 centred at O. Vector form: |r| = 6.",
      "Read off the radius as √36 = 6 and centre at the origin."
    ),
    v3Typed(
      "v3c-i3",
      "A sphere has vector equation |r − (0, 1, 2)| = 4. State its radius.",
      "|\\mathbf{r}-(0,1,2)|=4",
      "4",
      [],
      "The radius R appears on the right-hand side: R = 4."
    ),
    v3Choice(
      "v3c-i4",
      "Which parametric vector equation traces the unit circle?",
      "A",
      ["r(t) = (cos t, sin t)", "r(t) = (t, t²)", "r(t) = (t, 1)", "r(t) = (sin t, sin t)"],
      "r(t) = (cos t, sin t) satisfies x² + y² = cos²t + sin²t = 1: the unit circle.",
      "Check which choice satisfies x² + y² = 1."
    ),
    v3Typed(
      "v3c-i5",
      "Find the Cartesian equation of the sphere |r − (1, 0, 0)| = 2.",
      "|\\mathbf{r}-(1,0,0)|=2",
      "(x-1)^2+y^2+z^2=4",
      ["(x-1)²+y²+z²=4"],
      "Square: (x−1)² + y² + z² = 4."
    ),
  ],
  masteryQuiz: [
    v3Choice(
      "v3c-m1",
      "|r − a| = R describes:",
      "A",
      ["A circle (2D) or sphere (3D) of radius R centred at a", "A line passing through a", "A circle of radius |a|", "All points closer than R to a"],
      "|r − a| = R is the set of all points exactly R from a: a circle in 2D, a sphere in 3D.",
      "Distance = R from a fixed point defines a circle or sphere."
    ),
    v3Typed(
      "v3c-m2",
      "State the radius of the circle |r − (3, 4)| = 7.",
      "|\\mathbf{r}-(3,4)|=7",
      "7",
      [],
      "The radius R appears on the right-hand side: R = 7."
    ),
    v3Typed(
      "v3c-m3",
      "Find the Cartesian equation of |r| = 5.",
      "|\\mathbf{r}|=5",
      "x^2+y^2=25",
      ["x²+y²=25"],
      "|r| = 5 → x² + y² = 25."
    ),
    v3Choice(
      "v3c-m4",
      "r(t) = (2cos t, 2sin t). The Cartesian equation is:",
      "A",
      ["x² + y² = 4", "x² + y² = 2", "x + y = 2", "x² − y² = 4"],
      "x = 2cos t, y = 2sin t → x² + y² = 4cos²t + 4sin²t = 4.",
      "Use cos²t + sin²t = 1."
    ),
    v3Typed(
      "v3c-m5",
      "Find the Cartesian equation of |r − (2, 3)| = √5.",
      "|\\mathbf{r}-(2,3)|=\\sqrt{5}",
      "(x-2)^2+(y-3)^2=5",
      ["(x-2)²+(y-3)²=5"],
      "Square: (x−2)² + (y−3)² = 5."
    ),
    v3Typed(
      "v3c-m6",
      "Write the vector equation of (x+1)² + y² = 16.",
      "(x+1)^2+y^2=16",
      "|r-(-1,0)|=4",
      ["| r - (-1,0) | = 4"],
      "Centre (−1, 0), radius 4. Vector form: |r − (−1, 0)| = 4."
    ),
    v3Typed(
      "v3c-m7",
      "State the centre of the sphere |r − (2, −1, 3)| = 6.",
      "|\\mathbf{r}-(2,-1,3)|=6",
      "(2, -1, 3)",
      ["(2,-1,3)"],
      "The centre has position vector a = (2, −1, 3)."
    ),
    v3Choice(
      "v3c-m8",
      "The vector form |r − a| = R is equivalent to which Cartesian equation (2D, a = (h,k))?",
      "A",
      ["(x−h)²+(y−k)²=R²", "(x+h)²+(y+k)²=R²", "x²+y²=R²−|a|²", "(x−h)+(y−k)=R"],
      "Squaring |r − a| = R gives (x−h)² + (y−k)² = R².",
      "Square both sides of |r − a| = R."
    ),
    v3Typed(
      "v3c-m9",
      "r(t) = (t, t²). Eliminate t to find the Cartesian equation.",
      "\\mathbf{r}(t)=(t,t^2)",
      "y=x^2",
      ["y = x²"],
      "From x = t: t = x. Substitute: y = x².",
      "Express t in terms of x from the first component."
    ),
    v3Typed(
      "v3c-m10",
      "A sphere is centred at (1, 2, 3) with radius 5. Write its Cartesian equation.",
      "\\text{centre }(1,2,3),\\quad R=5",
      "(x-1)^2+(y-2)^2+(z-3)^2=25",
      ["(x-1)²+(y-2)²+(z-3)²=25"],
      "Centre (1,2,3), R = 5, so R² = 25."
    ),
  ],
  masteryQuizPool: [
    { ...v3Choice("y12e2-vec-sph-pool-1", "The vector equation |r − c| = R describes:", "B", ["A plane through c.", "A sphere with centre c and radius R.", "A line in direction c.", "A single point c."], "|r − c| = R says every point r is a fixed distance R from the centre c — that is a sphere (a circle in 2D)."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-sph-pool-2", "A sphere is given by |r − (1, 2, 3)| = 5. State its radius.", "|r - (1,2,3)| = 5", "5", [], "The right-hand side is the radius, R = 5."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-sph-pool-3", "A sphere has equation (x − 1)² + (y − 2)² + (z − 3)² = 25. State its radius.", "(x-1)^2+(y-2)^2+(z-3)^2 = 25", "5", [], "R² = 25, so R = √25 = 5."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-sph-pool-4", "A sphere has centre (2, 3, 6) and passes through the origin. Its radius is the distance from the centre to the origin. Find the radius.", "R = |(2,3,6)|", "7", [], "R = √(4 + 9 + 36) = √49 = 7."), difficulty: 3 },
    { ...v3Choice("y12e2-vec-sph-pool-5", "The sphere (x − 1)² + (y − 2)² + (z − 3)² = 16 has radius:", "C", ["16", "8", "4 (the square root of 16)", "256"], "The right-hand side is R², so R = √16 = 4. Reading 16 as the radius is the classic error."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-sph-pool-6", "The sphere x² + y² + z² = 9 has centre at the origin. State its radius.", "x^2+y^2+z^2 = 9", "3", [], "R² = 9, so R = 3."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-sph-pool-7", "Test whether (3, 0, 0) lies on the sphere x² + y² + z² = 9 by computing x² + y² + z² at that point.", "x^2+y^2+z^2", "9", [], "3² + 0² + 0² = 9, which equals the right-hand side, so the point lies on the sphere."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-sph-pool-8", "A sphere has centre (1, 1, 1) and radius 2, written (x − 1)² + (y − 1)² + (z − 1)² = R². Find R².", "(x-1)^2+(y-1)^2+(z-1)^2 = R^2", "4", [], "R = 2, so R² = 4."), difficulty: 4 },
    { ...v3Choice("y12e2-vec-sph-pool-9", "A student claims that r(t) = (cos t, sin t, 0), for parameter t, describes a sphere. Why is that wrong?", "C", ["It describes a plane.", "It describes a single point.", "A single parameter t traces a one-dimensional CURVE (here a unit circle in the xy-plane), not a sphere.", "cos t and sin t are never both defined."], "One free parameter gives a curve. (cos t, sin t, 0) satisfies x² + y² = 1, z = 0 — a circle, not a 2D spherical surface."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-sph-pool-10", "Complete the square to find the radius of x² − 2x + y² + z² = 0. (x² − 2x = (x − 1)² − 1.)", "(x-1)^2 + y^2 + z^2 = 1", "1", [], "x² − 2x + y² + z² = (x − 1)² − 1 + y² + z² = 0, so (x − 1)² + y² + z² = 1 and R = 1."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-sph-pool-11", "A sphere has centre (3, 0, 0) and radius 2. The closest point on the sphere to the origin lies along the line from the origin to the centre; its distance from the origin is (distance to centre) − radius. Find that distance.", "d = |c| - R", "1", [], "Distance from origin to centre = 3; subtract the radius 2 to get 3 − 2 = 1."), difficulty: 5 },
    { ...v3Typed("y12e2-vec-sph-pool-12", "Explain by result: the parametric curve r(t) = (2cos t, 2sin t, 0) satisfies x² + y² = (2cos t)² + (2sin t)² = 4, so it lies on a circle. State the radius of that circle.", "x^2 + y^2 = 4", "2", [], "(2cos t)² + (2sin t)² = 4(cos²t + sin²t) = 4 = 2², so the curve is a circle of radius 2 — the Pythagorean identity collapses the parameter."), difficulty: 5 },
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson 6: Geometric Proofs Using Vectors ────────────────────────────────

const geometricProofsVectors: Partial<ExplicitLesson> = {
  description:
    "Use dot product identities — including a·a = |a|², distributivity, and the Cauchy–Schwarz inequality — to prove geometric results about triangles and quadrilaterals.",
  learningIntention:
    "Apply dot product properties to prove geometric results algebraically using vectors.",
  successCriteria: [
    "Apply a·a = |a|² to simplify vector expressions.",
    "Use dot product distributivity a·(b + c) = a·b + a·c to expand vector expressions.",
    "State the Cauchy–Schwarz inequality |a·b| ≤ |a||b| and verify it for given vectors.",
    "Prove that the diagonals of a rhombus are perpendicular using vectors.",
    "Prove a geometric result involving altitudes or midpoints using dot products.",
  ],
  teaching: {
    paragraphs: [
      "Key identity: a·a = |a|². Since a·a = a₁² + a₂² + a₃² = |a|², dotting a vector with itself gives its squared magnitude. This is used constantly in vector proofs.",
      "Distributivity: a·(b + c) = a·b + a·c. Combined with commutativity a·b = b·a, this lets us expand products like (a + b)·(a − b) = a·a − b·b = |a|² − |b|².",
      "Cauchy–Schwarz inequality: for any two vectors, |a·b| ≤ |a||b|. This follows directly from |cos θ| ≤ 1 in the dot product formula a·b = |a||b|cos θ. Equality holds when a and b are parallel.",
      "Geometric proofs strategy: represent geometric points as position vectors, express the relevant lines or distances using vector operations, then use dot products to verify perpendicularity, collinearity, or length conditions.",
      "Example — diagonals of a rhombus: a rhombus has sides a and b with |a| = |b|. Diagonals are (a + b) and (a − b). Then (a + b)·(a − b) = a·a − b·b = |a|² − |b|² = 0, so the diagonals are perpendicular.",
    ],
    latexBlocks: [
      "\\mathbf{a}\\cdot\\mathbf{a}=|\\mathbf{a}|^2",
      "\\mathbf{a}\\cdot(\\mathbf{b}+\\mathbf{c})=\\mathbf{a}\\cdot\\mathbf{b}+\\mathbf{a}\\cdot\\mathbf{c}",
      "(\\mathbf{a}+\\mathbf{b})\\cdot(\\mathbf{a}-\\mathbf{b})=|\\mathbf{a}|^2-|\\mathbf{b}|^2",
      "|\\mathbf{a}\\cdot\\mathbf{b}|\\leq|\\mathbf{a}||\\mathbf{b}|\\quad\\text{(Cauchy–Schwarz)}",
    ],
  },
  workedExamples: [
    {
      title: "Expand using distributivity",
      questionLatex: "\\text{Expand }(\\mathbf{a}+\\mathbf{b})\\cdot(\\mathbf{a}+\\mathbf{b}).",
      steps: [
        { explanation: "Apply distributivity twice.", latex: "=\\mathbf{a}\\cdot\\mathbf{a}+\\mathbf{a}\\cdot\\mathbf{b}+\\mathbf{b}\\cdot\\mathbf{a}+\\mathbf{b}\\cdot\\mathbf{b}" },
        { explanation: "Use commutativity a·b = b·a and a·a = |a|².", latex: "=|\\mathbf{a}|^2+2\\mathbf{a}\\cdot\\mathbf{b}+|\\mathbf{b}|^2" },
      ],
      finalAnswerLatex: "|\\mathbf{a}|^2+2\\mathbf{a}\\cdot\\mathbf{b}+|\\mathbf{b}|^2",
    },
    {
      title: "Diagonals of a rhombus are perpendicular",
      questionLatex: "\\text{A rhombus has adjacent sides }\\mathbf{a}\\text{ and }\\mathbf{b}\\text{ with }|\\mathbf{a}|=|\\mathbf{b}|.\\text{ Prove the diagonals are perpendicular.}",
      steps: [
        { explanation: "The diagonals are a + b and a − b.", latex: "\\text{diag}_1=\\mathbf{a}+\\mathbf{b},\\quad\\text{diag}_2=\\mathbf{a}-\\mathbf{b}" },
        { explanation: "Compute their dot product using the difference-of-squares identity.", latex: "(\\mathbf{a}+\\mathbf{b})\\cdot(\\mathbf{a}-\\mathbf{b})=|\\mathbf{a}|^2-|\\mathbf{b}|^2" },
        { explanation: "Since |a| = |b| for a rhombus, the result is zero.", latex: "=|\\mathbf{a}|^2-|\\mathbf{a}|^2=0" },
        { explanation: "A zero dot product means the diagonals are perpendicular.", latex: "\\therefore\\text{ diagonals are perpendicular}\\quad\\square" },
      ],
      finalAnswerLatex: "(\\mathbf{a}+\\mathbf{b})\\cdot(\\mathbf{a}-\\mathbf{b})=0",
    },
  ],
  guidedPractice: [
    v3Choice(
      "v3p-g1",
      "a·a equals:",
      "A",
      ["| a |²", "| a |", "2a", "a²"],
      "The dot product of a vector with itself equals its squared magnitude: a·a = |a|².",
      "Recall: a·a = a₁² + a₂² + a₃² = |a|²."
    ),
    v3Typed(
      "v3p-g2",
      "Let a = (3, 4). Find a·a. Confirm it equals |a|².",
      "\\mathbf{a}=(3,4)",
      "25",
      [],
      "a·a = 9 + 16 = 25. Also |a| = √(9+16) = 5, so |a|² = 25. ✓",
      "Compute a·a = 3²+4², then verify |a|² = (√25)² = 25."
    ),
    v3Choice(
      "v3p-g3",
      "By Cauchy–Schwarz, |a·b| ≤ …",
      "A",
      ["| a || b |", "| a | + | b |", "| a − b |", "| a |² + | b |²"],
      "The Cauchy–Schwarz inequality states |a·b| ≤ |a||b|.",
      "Recall the Cauchy–Schwarz inequality."
    ),
    v3Typed(
      "v3p-g4",
      "Verify Cauchy–Schwarz for a = (1, 2) and b = (3, 4). Find |a·b|, |a| and |b|.",
      "\\mathbf{a}=(1,2),\\quad \\mathbf{b}=(3,4)",
      "11<=5*sqrt(5)",
      ["11 ≤ 5√5"],
      "a·b = 3+8=11. |a|=√5, |b|=√25=5. |a||b|=5√5≈11.18. So 11 ≤ 5√5 ✓.",
      "Compute a·b, |a|, |b|, then check |a·b| ≤ |a||b|."
    ),
  ],
  independentPractice: [
    v3Typed(
      "v3p-i1",
      "Expand (a + b)·(a + b) using distributivity. Express in terms of |a|², |b|², and a·b.",
      "(\\mathbf{a}+\\mathbf{b})\\cdot(\\mathbf{a}+\\mathbf{b})",
      "|a|^2+2(a·b)+|b|^2",
      ["|a|²+2a·b+|b|²"],
      "|a|² + 2(a·b) + |b|².",
      "Expand: a·a + a·b + b·a + b·b = |a|² + 2(a·b) + |b|²."
    ),
    v3Typed(
      "v3p-i2",
      "Let a = (2, 0) and b = (0, 3). Verify Cauchy–Schwarz: find |a·b|, |a||b|.",
      "|\\mathbf{a}\\cdot\\mathbf{b}|\\leq|\\mathbf{a}||\\mathbf{b}|",
      "0<=6",
      ["0 ≤ 6"],
      "a·b = 0. |a| = 2, |b| = 3. |a||b| = 6. 0 ≤ 6 ✓. Equality fails: a and b are perpendicular, not parallel."
    ),
    v3Typed(
      "v3p-i3",
      "A rhombus has |a| = |b| = 5. Compute (a + b)·(a − b).",
      "|\\mathbf{a}|=|\\mathbf{b}|=5",
      "0",
      [],
      "|a|² − |b|² = 25 − 25 = 0. The diagonals are perpendicular."
    ),
    v3Choice(
      "v3p-i4",
      "Cauchy–Schwarz: equality |a·b| = |a||b| holds when…",
      "A",
      ["a and b are parallel (one is a scalar multiple of the other)", "a and b are perpendicular", "a = b", "|a| = |b|"],
      "a·b = |a||b|cos θ. |cos θ| = 1 iff θ = 0° or 180°, which means a = λb for some scalar λ.",
      "Consider when |cos θ| = 1."
    ),
    v3Typed(
      "v3p-i5",
      "Let a = (1, 2, 2). Find a·a and hence |a|.",
      "\\mathbf{a}=(1,2,2)",
      "3",
      [],
      "a·a = 1+4+4 = 9. |a| = √9 = 3.",
      "Find a·a, then |a| = √(a·a)."
    ),
  ],
  masteryQuiz: [
    v3Typed(
      "v3p-m1",
      "Let a = (2, 2, 1). Find a·a.",
      "\\mathbf{a}\\cdot\\mathbf{a}",
      "9",
      [],
      "4 + 4 + 1 = 9."
    ),
    v3Choice(
      "v3p-m2",
      "The distributive law for dot products states:",
      "A",
      ["a·(b + c) = a·b + a·c", "a·(b + c) = a·b · a·c", "(a + b)·c = a·c + b", "a·b + c = (a + c)·b"],
      "Dot product distributes over addition: a·(b + c) = a·b + a·c.",
      "The dot product distributes over vector addition."
    ),
    v3Typed(
      "v3p-m3",
      "Let a = (3, 0) and b = (0, 4). Find |a·b|, then find |a||b|. Is Cauchy–Schwarz satisfied?",
      "\\mathbf{a}=(3,0),\\quad \\mathbf{b}=(0,4)",
      "0<=12",
      ["0 ≤ 12"],
      "a·b = 0. |a| = 3, |b| = 4. |a||b| = 12. 0 ≤ 12 ✓."
    ),
    v3Typed(
      "v3p-m4",
      "Expand (a + b)·(a − b) using distributivity.",
      "(\\mathbf{a}+\\mathbf{b})\\cdot(\\mathbf{a}-\\mathbf{b})",
      "|a|^2-|b|^2",
      ["|a|²−|b|²"],
      "= a·a − a·b + b·a − b·b = |a|² − |b|²."
    ),
    v3Typed(
      "v3p-m5",
      "A rhombus has adjacent sides with |a| = |b| = 4. Compute (a + b)·(a − b).",
      "|\\mathbf{a}|=|\\mathbf{b}|=4",
      "0",
      [],
      "16 − 16 = 0. Diagonals perpendicular."
    ),
    v3Choice(
      "v3p-m6",
      "(a + b)·(a − b) = 0 implies:",
      "A",
      ["| a | = | b |", "a = b", "a · b = 0", "| a | = | b |²"],
      "(a+b)·(a−b) = |a|²−|b|² = 0 iff |a| = |b|: the two vectors have equal magnitude.",
      "Expand using the difference of squares identity."
    ),
    v3Typed(
      "v3p-m7",
      "Let a = (2, 2, 1) and b = (2, 2, −4). Find a·b.",
      "\\mathbf{a}\\cdot\\mathbf{b}",
      "0",
      [],
      "4 + 4 − 4 = 0. a and b are perpendicular."
    ),
    v3Typed(
      "v3p-m8",
      "a·a = 49. Find |a|.",
      "\\mathbf{a}\\cdot\\mathbf{a}=49",
      "7",
      [],
      "|a| = √49 = 7."
    ),
    v3Choice(
      "v3p-m9",
      "Which step correctly starts a vector proof that three points A, B, C are collinear?",
      "A",
      ["Show AB = λ AC for some scalar λ", "Show AB · AC = 0", "Show |AB| = |AC|", "Show AB + AC = 0"],
      "Three points are collinear iff one displacement vector is a scalar multiple of another.",
      "Collinearity means the direction vectors are parallel."
    ),
    v3Typed(
      "v3p-m10",
      "A parallelogram has sides a and b with a·b = 0. What does this imply about the shape?",
      "\\mathbf{a}\\cdot\\mathbf{b}=0",
      "rectangle",
      ["Rectangle", "a rectangle"],
      "a·b = 0 means a ⊥ b. A parallelogram with perpendicular adjacent sides is a rectangle.",
      "What does a ⊥ b mean for the shape of a parallelogram?"
    ),
  ],
  masteryQuizPool: [
    { ...v3Choice("y12e2-vec-proof-pool-1", "To prove two vectors are perpendicular, you show that:", "B", ["They have equal magnitude.", "Their dot product is zero.", "One is a scalar multiple of the other.", "Their sum is zero."], "Perpendicularity is captured by a·b = 0. Equal magnitude or scalar-multiple conditions describe other relationships."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-proof-pool-2", "To prove AB ⊥ BC you compute AB·BC and show it is zero. For AB = (1, 0, 0) and BC = (0, 1, 0), find AB·BC.", "\\vec{AB}\\cdot\\vec{BC}", "0", [], "1·0 + 0·1 + 0·0 = 0, so AB ⊥ BC."), difficulty: 2 },
    { ...v3Typed("y12e2-vec-proof-pool-3", "To prove AB is parallel to CD you show AB = λ·CD. For AB = (2, 4, 6) and CD = (1, 2, 3), find λ.", "\\vec{AB} = \\lambda\\,\\vec{CD}", "2", [], "(2, 4, 6) = 2(1, 2, 3), so λ = 2 and AB ∥ CD."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-proof-pool-4", "In a parallelogram the diagonals bisect each other, so the midpoint of AC equals the midpoint of BD. For A(0, 0, 0) and C(2, 2, 2), find the x-coordinate of the midpoint of AC.", "M = \\tfrac12(A + C)", "1", [], "Midpoint of AC = (1, 1, 1); its x-coordinate is 1. Showing it equals the midpoint of BD proves the diagonals bisect."), difficulty: 3 },
    { ...v3Choice("y12e2-vec-proof-pool-5", "To prove a triangle ABC is right-angled at B, the cleanest vector test is:", "B", ["Show |BA| = |BC|.", "Show BA·BC = 0 (the vectors from B are perpendicular).", "Show BA + BC = 0.", "Show BA = BC."], "A right angle at B means the two sides meeting at B are perpendicular, i.e. BA·BC = 0. Equal lengths would make it isosceles, not right-angled."), difficulty: 3 },
    { ...v3Typed("y12e2-vec-proof-pool-6", "Prove the triangle with A(1, 0, 0), B(0, 0, 0), C(0, 1, 0) is right-angled at B by computing BA·BC. (BA = A − B, BC = C − B.)", "\\vec{BA}\\cdot\\vec{BC}", "0", [], "BA = (1, 0, 0), BC = (0, 1, 0), so BA·BC = 0 — the right angle is at B."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-proof-pool-7", "Midpoint theorem: the segment joining the midpoints of two sides of a triangle is half the length of the third side. If the third side BC has length 8, find the length of that midsegment.", "\\text{midsegment} = \\tfrac12 |BC|", "4", [], "Half of 8 is 4 — the midsegment is parallel to BC and half its length."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-proof-pool-8", "To prove M is the midpoint of A and B you show 2M = A + B. For A(0, 0, 0) and B(4, 0, 0), find the x-component of A + B (which must equal 2 times the midpoint's x-coordinate).", "2M = A + B", "4", [], "A + B = (4, 0, 0), so its x-component is 4 = 2·2, confirming the midpoint x-coordinate is 2."), difficulty: 4 },
    { ...v3Choice("y12e2-vec-proof-pool-9", "To prove ABDC is a parallelogram from vertices A, B, C, D, the correct equal-vector condition is:", "B", ["AB = CD", "AB = DC (so AB and DC are equal and parallel)", "AB = BC", "AC = BD"], "For the parallelogram with that vertex order, opposite sides AB and DC must be equal vectors. Writing AB = CD reverses one side and gives a crossed (non-parallelogram) figure."), difficulty: 4 },
    { ...v3Typed("y12e2-vec-proof-pool-10", "The diagonals of a rhombus are p = a + b and q = a − b, where a, b are adjacent sides with |a| = |b|. Since p·q = |a|² − |b|², find p·q for a rhombus.", "p\\cdot q = |a|^2 - |b|^2", "0", [], "With |a| = |b|, |a|² − |b|² = 0, so p·q = 0 — the diagonals are perpendicular. (This is the whole proof in one line.)"), difficulty: 5 },
    { ...v3Typed("y12e2-vec-proof-pool-11", "Using the identity (a + b)·(a − b) = |a|² − |b|², evaluate it for a = (3, 0, 0) and b = (0, 4, 0).", "(a+b)\\cdot(a-b) = |a|^2 - |b|^2", "-7", ["−7"], "|a|² = 9, |b|² = 16, so the value is 9 − 16 = −7. (Non-zero here because |a| ≠ |b|.)"), difficulty: 5 },
    { ...v3Typed("y12e2-vec-proof-pool-12", "Explain by result: a·a = |a|², so proving |a| = |b| is the same as proving a·a = b·b — no square roots needed. For a = (2, 2, 1), compute a·a.", "a\\cdot a = |a|^2", "9", [], "a·a = 4 + 4 + 1 = 9 = |a|² (so |a| = 3). Working with a·a avoids taking square roots in length proofs."), difficulty: 5 },
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson builder ───────────────────────────────────────────────────────────

function v3Lesson(
  id: string,
  title: string,
  partial: Partial<ExplicitLesson>
): Partial<ExplicitLesson> {
  return {
    ...partial,
    id,
    slug: id,
    moduleSlug: "vectors-3d",
    moduleTitle: "Vectors in Three Dimensions",
    courseTitle: "Year 12 Mathematics Extension 2",
    syllabusArea: "Vectors in Three Dimensions",
    focus: "Vectors in three dimensions",
    status: "active",
    video: { title, url: "/videos/placeholder-lesson.mp4" },
    masteryPassMark: 0.8,
  };
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function year12Extension2Vectors3DLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-2") return undefined;
  if (unit.slug !== "vectors-3d") return undefined;

  switch (lesson.slug) {
    case "vectors-and-points-3d":
      return v3Lesson("vectors-and-points-3d", "Vectors and Points in 3D", vectorsAndPoints3D);
    case "dot-product-and-angle":
      return v3Lesson("dot-product-and-angle", "Dot Product and Angle", dotProductAndAngle);
    case "equations-of-lines-3d":
      return v3Lesson("equations-of-lines-3d", "Equations of Lines in 3D", equationsOfLines3D);
    case "vector-applications-exam-practice":
      return v3Lesson("vector-applications-exam-practice", "Vector Applications and Exam Practice", vectorApplicationsExamPractice);
    case "vector-curves-circles-spheres":
      return v3Lesson("vector-curves-circles-spheres", "Vector Equations of Curves, Circles and Spheres", vectorCurvesCirclesSpheres);
    case "geometric-proofs-vectors":
      return v3Lesson("geometric-proofs-vectors", "Geometric Proofs Using Vectors", geometricProofsVectors);
    default:
      return undefined;
  }
}
