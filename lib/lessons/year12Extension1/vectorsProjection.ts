import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function vpChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "The perpendicular component is a − proj_b(a). Check it by computing its dot product with b — the result should be 0.",
    explanation,
  };
}

function vpTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Find λ = (a·b)/|b|², then proj_b(a) = λb, and a⊥ = a − proj_b(a).",
    explanation,
  };
}

// ─── Lesson: Proof of projection formula + perpendicular component ──────────

const vectorsProjection: Partial<ExplicitLesson> = {
  description:
    "Derive the vector projection formula from the perpendicularity condition, find the perpendicular component of one vector with respect to another, and verify the decomposition using the dot product.",
  learningIntention:
    "Prove that proj_b(a) = ((a·b)/|b|²)b by requiring the residual to be perpendicular to b, then decompose any vector into its parallel and perpendicular parts.",
  successCriteria: [
    "State the perpendicularity condition that defines a projection: (a − λb)·b = 0.",
    "Solve for λ = (a·b)/|b|² and write proj_b(a) = λb.",
    "Find the perpendicular component a⊥ = a − proj_b(a).",
    "Verify a⊥ ⊥ b by computing a⊥·b = 0.",
    "Write the full decomposition a = proj_b(a) + a⊥ and explain what each part represents geometrically.",
  ],
  teaching: {
    paragraphs: [
      "The projection of **a** onto **b** is the part of **a** that points in the direction of **b**. We write it as proj_b(**a**) = λ**b** for some scalar λ, since the projection must lie along **b**.",
      "To find λ, we use the defining property of a projection: the leftover part (**a** − λ**b**) must be perpendicular to **b**. Two vectors are perpendicular when their dot product is zero, so (**a** − λ**b**)·**b** = 0.",
      "Expanding: **a**·**b** − λ|**b**|² = 0, giving λ = (**a**·**b**)/|**b**|². This proves the formula. The perpendicular component is **a**⊥ = **a** − proj_b(**a**), and it can always be verified by computing **a**⊥·**b** = 0.",
      "Together, proj_b(**a**) and **a**⊥ form a right-angle decomposition of **a**: **a** = proj_b(**a**) + **a**⊥. This is useful in physics (resolving a force into a direction and its perpendicular), navigation, and geometry.",
    ],
    latexBlocks: [
      "\\text{Proof: let }\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=\\lambda\\mathbf{b}\\text{. Require }(\\mathbf{a}-\\lambda\\mathbf{b})\\cdot\\mathbf{b}=0",
      "\\mathbf{a}\\cdot\\mathbf{b}-\\lambda|\\mathbf{b}|^2=0\\;\\Rightarrow\\;\\lambda=\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|^2}\\;\\Rightarrow\\;\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|^2}\\mathbf{b}",
      "\\mathbf{a}^\\perp=\\mathbf{a}-\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a},\\qquad \\mathbf{a}^\\perp\\cdot\\mathbf{b}=0",
      "\\mathbf{a}=\\underbrace{\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}}_{\\parallel\\,\\mathbf{b}}+\\underbrace{\\mathbf{a}^\\perp}_{\\perp\\,\\mathbf{b}}",
    ],
  },
  workedExamples: [
    {
      title: "Derive the projection formula and find the perpendicular component",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}7\\\\1\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}2\\\\1\\end{pmatrix}.\\\\\\text{(a) Prove that }\\lambda=\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|^2}\\text{ and find }\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}.\\\\\\text{(b) Find }\\mathbf{a}^\\perp=\\mathbf{a}-\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}\\text{ and verify it is perpendicular to }\\mathbf{b}.",
      steps: [
        {
          explanation: "Write proj_b(a) = λb. The residual (a − λb) must be perpendicular to b.",
          latex:
            "(\\mathbf{a}-\\lambda\\mathbf{b})\\cdot\\mathbf{b}=0\\;\\Rightarrow\\;\\mathbf{a}\\cdot\\mathbf{b}-\\lambda|\\mathbf{b}|^2=0",
        },
        {
          explanation: "Compute a·b and |b|² to find λ.",
          latex:
            "\\mathbf{a}\\cdot\\mathbf{b}=7(2)+1(1)=15,\\quad|\\mathbf{b}|^2=4+1=5,\\quad\\lambda=\\frac{15}{5}=3",
        },
        {
          explanation: "Hence find the projection vector.",
          latex:
            "\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=3\\begin{pmatrix}2\\\\1\\end{pmatrix}=\\begin{pmatrix}6\\\\3\\end{pmatrix}",
        },
        {
          explanation: "Find the perpendicular component.",
          latex:
            "\\mathbf{a}^\\perp=\\begin{pmatrix}7\\\\1\\end{pmatrix}-\\begin{pmatrix}6\\\\3\\end{pmatrix}=\\begin{pmatrix}1\\\\-2\\end{pmatrix}",
        },
        {
          explanation: "Verify perpendicularity: the dot product with b must be zero.",
          latex:
            "\\begin{pmatrix}1\\\\-2\\end{pmatrix}\\cdot\\begin{pmatrix}2\\\\1\\end{pmatrix}=2-2=0\\;\\checkmark",
        },
      ],
      finalAnswerLatex:
        "\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=\\begin{pmatrix}6\\\\3\\end{pmatrix},\\quad\\mathbf{a}^\\perp=\\begin{pmatrix}1\\\\-2\\end{pmatrix}",
      cartesianGraph: {
        description:
          "Geometric picture of the decomposition a = proj_b(a) + a⊥. The line through the origin in the direction of b (slope 1/2) represents the b-direction. The point (7, 1) is the tip of a. The projection lands at (6, 3) on the b-direction line. The perpendicular component (1, −2) goes from the projection point (6, 3) to the tip of a at (7, 1), meeting the b-direction line at a right angle.",
        xMin: -0.5,
        xMax: 8,
        yMin: -2.5,
        yMax: 4,
        xStep: 1,
        yStep: 1,
        showGrid: true,
        xAxisLabel: "x",
        yAxisLabel: "y",
        lines: [{ kind: "linear", m: 0.5, b: 0, label: "b direction (slope 1/2)" }],
        points: [
          { x: 0, y: 0, label: "O" },
          { x: 7, y: 1, label: "a = (7,1)" },
          { x: 6, y: 3, label: "proj = (6,3)" },
        ],
      },
    },
    {
      title: "Full vector decomposition along an axis direction",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}5\\\\0\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\4\\end{pmatrix}.\\\\\\text{Find }\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}\\text{ and }\\mathbf{a}^\\perp.\\text{ Verify }\\mathbf{a}=\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}+\\mathbf{a}^\\perp.",
      steps: [
        {
          explanation: "Find λ using the projection formula.",
          latex:
            "\\mathbf{a}\\cdot\\mathbf{b}=15,\\quad|\\mathbf{b}|^2=25,\\quad\\lambda=\\frac{15}{25}=\\frac{3}{5}",
        },
        {
          explanation: "Compute the projection vector.",
          latex:
            "\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=\\frac{3}{5}\\begin{pmatrix}3\\\\4\\end{pmatrix}=\\begin{pmatrix}\\tfrac{9}{5}\\\\\\tfrac{12}{5}\\end{pmatrix}",
        },
        {
          explanation: "Find the perpendicular component.",
          latex:
            "\\mathbf{a}^\\perp=\\begin{pmatrix}5\\\\0\\end{pmatrix}-\\begin{pmatrix}\\tfrac{9}{5}\\\\\\tfrac{12}{5}\\end{pmatrix}=\\begin{pmatrix}\\tfrac{16}{5}\\\\-\\tfrac{12}{5}\\end{pmatrix}",
        },
        {
          explanation: "Verify: proj + a⊥ = a.",
          latex:
            "\\begin{pmatrix}\\tfrac{9}{5}\\\\\\tfrac{12}{5}\\end{pmatrix}+\\begin{pmatrix}\\tfrac{16}{5}\\\\-\\tfrac{12}{5}\\end{pmatrix}=\\begin{pmatrix}5\\\\0\\end{pmatrix}=\\mathbf{a}\\;\\checkmark",
        },
        {
          explanation: "Verify perpendicularity.",
          latex:
            "\\begin{pmatrix}\\tfrac{16}{5}\\\\-\\tfrac{12}{5}\\end{pmatrix}\\cdot\\begin{pmatrix}3\\\\4\\end{pmatrix}=\\frac{48}{5}-\\frac{48}{5}=0\\;\\checkmark",
        },
      ],
      finalAnswerLatex:
        "\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=\\left(\\tfrac{9}{5},\\tfrac{12}{5}\\right),\\quad\\mathbf{a}^\\perp=\\left(\\tfrac{16}{5},-\\tfrac{12}{5}\\right)",
    },
  ],
  guidedPractice: [
    vpChoice(
      "y12e1-vp-g1",
      "The projection condition (a − λb)·b = 0 is used because:",
      "C",
      [
        "The dot product measures length.",
        "The projection has the same magnitude as a.",
        "The residual must be perpendicular to b.",
        "λ must equal 1.",
      ],
      "The defining property of a projection is that what remains after removing the parallel part (a − λb) must be perpendicular to b."
    ),
    vpTyped(
      "y12e1-vp-g2",
      "Find λ = (a·b)/|b|² for a = (7, 1), b = (2, 1).",
      "\\mathbf{a}\\cdot\\mathbf{b}=15,\\quad|\\mathbf{b}|^2=5",
      "3",
      [],
      "λ = 15/5 = 3."
    ),
    vpTyped(
      "y12e1-vp-g3",
      "Using λ = 3 and b = (2, 1), write a⊥ = a − λb for a = (7, 1).",
      "\\mathbf{a}^\\perp = \\begin{pmatrix}7\\\\1\\end{pmatrix}-3\\begin{pmatrix}2\\\\1\\end{pmatrix}",
      "(1,-2)",
      ["(1, -2)", "1,-2"],
      "(7, 1) − (6, 3) = (1, −2)."
    ),
    vpChoice(
      "y12e1-vp-g4",
      "The full decomposition of a with respect to b is:",
      "A",
      [
        "a = proj_b(a) + a⊥",
        "a = proj_b(a) × a⊥",
        "a = a⊥ − proj_b(a)",
        "a = |a|b̂",
      ],
      "Every vector can be written as the sum of its projection (parallel to b) and its perpendicular component."
    ),
  ],
  independentPractice: [
    vpTyped(
      "y12e1-vp-i1",
      "a = (4, 3), b = (1, 0). Find proj_b(a).",
      "\\lambda=\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|^2}=\\frac{4}{1}=4",
      "(4,0)",
      ["(4, 0)", "4,0"],
      "λ = 4/1 = 4. proj_b(a) = 4(1, 0) = (4, 0) — the horizontal component."
    ),
    vpTyped(
      "y12e1-vp-i2",
      "Using your answer from i1, find a⊥ = a − proj_b(a).",
      "\\mathbf{a}^\\perp=\\begin{pmatrix}4\\\\3\\end{pmatrix}-\\begin{pmatrix}4\\\\0\\end{pmatrix}",
      "(0,3)",
      ["(0, 3)", "0,3"],
      "(4, 3) − (4, 0) = (0, 3) — the vertical component. Check: (0, 3)·(1, 0) = 0 ✓"
    ),
    vpTyped(
      "y12e1-vp-i3",
      "a = (5, 2), b = (2, 1). Find λ = (a·b)/|b|².",
      "\\mathbf{a}\\cdot\\mathbf{b}=12,\\quad|\\mathbf{b}|^2=5",
      "12/5",
      ["2.4"],
      "a·b = 10 + 2 = 12. |b|² = 4 + 1 = 5. λ = 12/5."
    ),
    vpChoice(
      "y12e1-vp-i4",
      "a = (3, 3), b = (1, 1). The scalar λ for proj_b(a) = λb is:",
      "C",
      ["1", "2", "3", "6"],
      "a·b = 3 + 3 = 6. |b|² = 1 + 1 = 2. λ = 6/2 = 3."
    ),
    vpTyped(
      "y12e1-vp-i5",
      "a = (5, 0), b = (3, 4). Find |a⊥|.",
      "\\mathbf{a}^\\perp=\\left(\\tfrac{16}{5},-\\tfrac{12}{5}\\right)",
      "4",
      [],
      "|a⊥| = (1/5)√(256 + 144) = (1/5)√400 = (1/5)·20 = 4."
    ),
  ],
  masteryQuiz: [
    vpChoice(
      "y12e1-vp-m1",
      "In proj_b(a) = λb, what is λ?",
      "B",
      [
        "(a·b)/|a|²",
        "(a·b)/|b|²",
        "|a|/|b|",
        "a·b",
      ],
      "λ = (a·b)/|b|² — divide the dot product by the squared magnitude of the direction vector."
    ),
    vpTyped(
      "y12e1-vp-m2",
      "a = (7, 1), b = (2, 1). Find a·b.",
      "7(2)+1(1)",
      "15",
      [],
      "7·2 + 1·1 = 14 + 1 = 15."
    ),
    vpTyped(
      "y12e1-vp-m3",
      "a = (7, 1), b = (2, 1). Find |b|².",
      "2^2+1^2",
      "5",
      [],
      "4 + 1 = 5."
    ),
    vpTyped(
      "y12e1-vp-m4",
      "a = (7, 1), b = (2, 1). Find proj_b(a).",
      "\\lambda=\\frac{15}{5}=3,\\quad\\operatorname{proj}=3\\begin{pmatrix}2\\\\1\\end{pmatrix}",
      "(6,3)",
      ["(6, 3)", "6,3"],
      "λ = 3. proj_b(a) = 3(2, 1) = (6, 3)."
    ),
    vpTyped(
      "y12e1-vp-m5",
      "a = (7, 1), b = (2, 1). Find a⊥ = a − proj_b(a).",
      "\\begin{pmatrix}7\\\\1\\end{pmatrix}-\\begin{pmatrix}6\\\\3\\end{pmatrix}",
      "(1,-2)",
      ["(1, -2)", "1,-2"],
      "(7 − 6, 1 − 3) = (1, −2)."
    ),
    vpTyped(
      "y12e1-vp-m6",
      "Verify a⊥ ⊥ b: compute (1, −2)·(2, 1).",
      "(1)(2)+(-2)(1)",
      "0",
      [],
      "2 − 2 = 0 ✓ Perpendicularity confirmed."
    ),
    vpChoice(
      "y12e1-vp-m7",
      "The perpendicular component of a with respect to b is:",
      "D",
      [
        "proj_b(a)",
        "a + proj_b(a)",
        "λb",
        "a − proj_b(a)",
      ],
      "a⊥ = a − proj_b(a). It is the part of a that is not captured by the projection."
    ),
    vpTyped(
      "y12e1-vp-m8",
      "a = (4, 3), b = (4, 0). Find proj_b(a).",
      "\\mathbf{a}\\cdot\\mathbf{b}=16,\\;|\\mathbf{b}|^2=16,\\;\\lambda=1",
      "(4,0)",
      ["(4, 0)", "4,0"],
      "λ = 16/16 = 1. proj_b(a) = 1·(4, 0) = (4, 0)."
    ),
    vpTyped(
      "y12e1-vp-m9",
      "a = (4, 3), b = (4, 0). Find a⊥.",
      "\\begin{pmatrix}4\\\\3\\end{pmatrix}-\\begin{pmatrix}4\\\\0\\end{pmatrix}",
      "(0,3)",
      ["(0, 3)", "0,3"],
      "(4 − 4, 3 − 0) = (0, 3). Check: (0, 3)·(4, 0) = 0 ✓"
    ),
    vpChoice(
      "y12e1-vp-m10",
      "In the proof of the projection formula, we solve (a − λb)·b = 0. The key reason we set this to zero is:",
      "C",
      [
        "Because a·b = 0 by definition.",
        "To make λ as large as possible.",
        "Because the residual (a − λb) must be perpendicular to b.",
        "Because |b| = 1 for a unit vector.",
      ],
      "Projection is defined so that what remains after removing the parallel part is perpendicular to the direction vector. That perpendicularity gives the equation that uniquely determines λ."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Registry ────────────────────────────────────────────────────────────────

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "vectors-projection": vectorsProjection,
};

export function year12Extension1VectorsProjectionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "vectors") return undefined;
  return lessons[lesson.slug];
}
