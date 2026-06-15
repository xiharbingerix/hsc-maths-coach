import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  opts: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}",
  hint?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: opts.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    answer: ans,
    ...(hint ? { hint } : {}),
    explanation,
  };
}

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers?: string[],
  hint?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: ans,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    ...(hint ? { hint } : {}),
    explanation,
  };
}

const base = { masteryPassMark: 0.8 };

const inverseTrigProperties: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Apply the complementary identity sin⁻¹(x) + cos⁻¹(x) = π/2 and evaluate composite expressions such as sin(cos⁻¹(x)) and tan(sin⁻¹(x)).",
  learningIntention:
    "Use the identity sin⁻¹(x) + cos⁻¹(x) = π/2 and the Pythagorean identity to simplify composite inverse trigonometric expressions.",
  successCriteria: [
    "State and prove the identity sin⁻¹(x) + cos⁻¹(x) = π/2.",
    "Apply the identity to find one inverse trig value given the other.",
    "Evaluate sin(cos⁻¹(a)) and cos(sin⁻¹(a)) for given values of a.",
    "Explain why sin(cos⁻¹(x)) = √(1 − x²) using the Pythagorean identity.",
    "Handle negative inputs correctly using the principal range of cos⁻¹.",
  ],
  teaching: {
    paragraphs: [
      "When you apply an inverse trig function, the output is always an angle. So sin⁻¹(x) and cos⁻¹(x) both produce angles — and those two angles are always complementary. This relationship, sin⁻¹(x) + cos⁻¹(x) = π/2, holds for every x in [−1, 1].",
      "Think about a right triangle. If one non-right angle is α, the other must be π/2 − α because the angles sum to π. If sin α = x, then by the complementary angle formula cos(π/2 − α) = x as well. So arcsin(x) and arccos(x) point to complementary angles in the same right triangle.",
      "Composite expressions like sin(cos⁻¹(x)) ask: what is the sine of the angle whose cosine is x? Name the angle θ = cos⁻¹(x), record that cos θ = x and θ ∈ [0, π], then use sin²θ + cos²θ = 1. Because θ ∈ [0, π], sin θ is always non-negative, giving sin θ = √(1 − x²).",
      "The common mistake is to think sin(cos⁻¹(x)) equals x — it doesn't. The same trap appears with a negative input: sin(cos⁻¹(−4/5)) is positive, not negative, because arccos(−4/5) lands in the second quadrant where sin is still positive.",
    ],
    latexBlocks: [
      "\\sin^{-1}(x)+\\cos^{-1}(x)=\\frac{\\pi}{2}, \\quad x\\in[-1,\\,1]",
      "\\sin\\!\\bigl(\\cos^{-1}(x)\\bigr)=\\sqrt{1-x^2}, \\quad \\cos\\!\\bigl(\\sin^{-1}(x)\\bigr)=\\sqrt{1-x^2}",
      "\\sin\\!\\bigl(\\sin^{-1}(x)\\bigr)=x, \\quad \\cos\\!\\bigl(\\cos^{-1}(x)\\bigr)=x \\quad (x\\in[-1,\\,1])",
    ],
  },
  workedExamples: [
    {
      title: "Prove the complementary identity",
      questionLatex:
        "\\text{Prove that }\\sin^{-1}(x)+\\cos^{-1}(x)=\\dfrac{\\pi}{2}\\text{ for all }x\\in[-1,1].",
      steps: [
        {
          explanation:
            "Name the angle sin⁻¹(x) as α, so sin α = x and α lies in the principal range of arcsin.",
          latex:
            "\\text{Let }\\alpha=\\sin^{-1}(x),\\quad\\sin\\alpha=x,\\quad\\alpha\\in\\left[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right]",
        },
        {
          explanation:
            "Use the complementary angle formula: the cosine of (π/2 − α) equals sin α.",
          latex:
            "\\cos\\!\\left(\\tfrac{\\pi}{2}-\\alpha\\right)=\\sin\\alpha=x",
        },
        {
          explanation:
            "Since α ∈ [−π/2, π/2], the angle π/2 − α lies in [0, π] — exactly the range of arccos — so cos⁻¹(x) = π/2 − α.",
          latex:
            "\\tfrac{\\pi}{2}-\\alpha\\in[0,\\pi]\\implies\\cos^{-1}(x)=\\tfrac{\\pi}{2}-\\alpha",
        },
        {
          explanation:
            "Substitute α = sin⁻¹(x) to complete the proof.",
          latex:
            "\\sin^{-1}(x)+\\cos^{-1}(x)=\\alpha+\\bigl(\\tfrac{\\pi}{2}-\\alpha\\bigr)=\\tfrac{\\pi}{2}",
        },
      ],
      finalAnswerLatex:
        "\\sin^{-1}(x)+\\cos^{-1}(x)=\\dfrac{\\pi}{2}\\text{ for all }x\\in[-1,1]",
    },
    {
      title: "Evaluate a composite expression using the triangle method",
      questionLatex:
        "\\text{Evaluate }\\sin\\!\\left(\\cos^{-1}\\!\\left(\\tfrac{3}{5}\\right)\\right).",
      cartesianGraph: {
        description:
          "Right triangle with angle θ = cos⁻¹(3/5) at the origin O. Vertices: O = (0,0), A = (0.6, 0), P = (0.6, 0.8). The hypotenuse OP (length 1) is the adjacent side to θ, OA (length 3/5) is the adjacent leg, and AP (length 4/5) is the opposite leg.",
        xMin: -0.1,
        xMax: 1.1,
        yMin: -0.1,
        yMax: 1.0,
        xStep: 0.5,
        yStep: 0.5,
        showGrid: false,
        lineSegments: [
          { from: { x: 0, y: 0 }, to: { x: 0.6, y: 0.8 }, label: "hyp = 1" },
          { from: { x: 0, y: 0 }, to: { x: 0.6, y: 0 }, label: "adj = 3/5" },
          { from: { x: 0.6, y: 0 }, to: { x: 0.6, y: 0.8 }, label: "opp = ?" },
        ],
        points: [
          { x: 0, y: 0, label: "O (θ)" },
          { x: 0.6, y: 0.8, label: "P = (3/5, 4/5)" },
        ],
      },
      steps: [
        {
          explanation:
            "Let θ = cos⁻¹(3/5). Then cos θ = 3/5 and θ ∈ [0, π], so the angle is in the first or second quadrant.",
          latex:
            "\\theta=\\cos^{-1}\\!\\left(\\tfrac35\\right),\\quad\\cos\\theta=\\tfrac35,\\quad\\theta\\in[0,\\pi]",
        },
        {
          explanation:
            "Use the Pythagorean identity to find sin θ. Since θ ∈ [0, π], sin θ ≥ 0 — take the positive root.",
          latex:
            "\\sin\\theta=\\sqrt{1-\\cos^2\\!\\theta}=\\sqrt{1-\\tfrac{9}{25}}=\\sqrt{\\tfrac{16}{25}}=\\tfrac{4}{5}",
        },
        {
          explanation:
            "The composite expression equals sin θ.",
          latex:
            "\\sin\\!\\left(\\cos^{-1}\\!\\left(\\tfrac35\\right)\\right)=\\sin\\theta=\\tfrac45",
        },
      ],
      finalAnswerLatex:
        "\\sin\\!\\left(\\cos^{-1}\\!\\left(\\dfrac{3}{5}\\right)\\right)=\\dfrac{4}{5}",
    },
    {
      title: "Apply the complementary identity",
      questionLatex:
        "\\text{Given }\\sin^{-1}(x)=\\dfrac{\\pi}{4},\\text{ find }\\cos^{-1}(x).",
      steps: [
        {
          explanation:
            "Write the complementary identity.",
          latex:
            "\\sin^{-1}(x)+\\cos^{-1}(x)=\\frac{\\pi}{2}",
        },
        {
          explanation:
            "Substitute sin⁻¹(x) = π/4.",
          latex:
            "\\frac{\\pi}{4}+\\cos^{-1}(x)=\\frac{\\pi}{2}",
        },
        {
          explanation:
            "Subtract π/4 from both sides to isolate cos⁻¹(x).",
          latex:
            "\\cos^{-1}(x)=\\frac{\\pi}{2}-\\frac{\\pi}{4}=\\frac{\\pi}{4}",
        },
      ],
      finalAnswerLatex:
        "\\cos^{-1}(x)=\\dfrac{\\pi}{4}",
    },
  ],
  guidedPractice: [
    // g1 — MCQ (only MCQ in guided)
    choice(
      "y12e1-itp-g1",
      "For x ∈ [−1, 1], sin⁻¹(x) + cos⁻¹(x) equals:",
      "B",
      ["π", "π/2", "0", "2π"],
      "The complementary identity gives sin⁻¹(x) + cos⁻¹(x) = π/2 for all x ∈ [−1, 1]. The other options are not the correct sum of complementary angles.",
      "\\text{Choose the best option.}",
      "Complementary angles in a right triangle always sum to π/2, not π."
    ),
    // g2 — typed (cancellation identity)
    answer(
      "y12e1-itp-g2",
      "Evaluate sin(sin⁻¹(1/2)).",
      "\\sin\\!\\left(\\sin^{-1}\\!\\left(\\tfrac{1}{2}\\right)\\right)",
      "1/2",
      "Applying sin and then its inverse function returns the original input: sin(sin⁻¹(1/2)) = 1/2. This holds for all x ∈ [−1, 1].",
      ["1/2", "0.5"],
      "sin and arcsin are inverse functions — they cancel each other for x ∈ [−1, 1]."
    ),
    // g3 — typed (use identity to find cos⁻¹)
    answer(
      "y12e1-itp-g3",
      "Given sin⁻¹(x) = π/6, use the complementary identity to find the exact value of cos⁻¹(x).",
      "\\sin^{-1}(x)+\\cos^{-1}(x)=\\frac{\\pi}{2}",
      "pi/3",
      "From the identity: cos⁻¹(x) = π/2 − π/6 = 3π/6 − π/6 = 2π/6 = π/3.",
      ["pi/3", "π/3"],
      "Rearrange: cos⁻¹(x) = π/2 − sin⁻¹(x), then substitute sin⁻¹(x) = π/6."
    ),
    // g4 — typed (composite with Pythagorean triple)
    answer(
      "y12e1-itp-g4",
      "Evaluate sin(cos⁻¹(4/5)). Let θ = cos⁻¹(4/5) and use sin²θ + cos²θ = 1.",
      "\\text{Let }\\theta=\\cos^{-1}\\!\\left(\\tfrac45\\right),\\quad\\cos\\theta=\\tfrac45",
      "3/5",
      "Let θ = cos⁻¹(4/5). Then cos θ = 4/5 and since θ ∈ [0, π], sin θ ≥ 0. By Pythagoras: sin θ = √(1 − 16/25) = √(9/25) = 3/5.",
      ["3/5", "0.6"],
      "Name θ = cos⁻¹(4/5), apply sin²θ + cos²θ = 1, and take the positive root because θ ∈ [0, π]."
    ),
  ],
  independentPractice: [
    // i1 — typed (direct cancellation, D2)
    answer(
      "y12e1-itp-i1",
      "Evaluate cos(cos⁻¹(0.6)).",
      "\\cos\\!\\left(\\cos^{-1}(0.6)\\right)",
      "0.6",
      "cos and arccos are inverse operations that cancel: cos(cos⁻¹(0.6)) = 0.6 for any input in [−1, 1].",
      ["0.6", "3/5"],
      "cos and arccos cancel each other for inputs in [−1, 1]."
    ),
    // i2 — typed (composite with arcsin, D2)
    answer(
      "y12e1-itp-i2",
      "Evaluate cos(sin⁻¹(3/5)).",
      "\\text{Let }\\theta=\\sin^{-1}\\!\\left(\\tfrac35\\right)",
      "4/5",
      "Let θ = sin⁻¹(3/5). Then sin θ = 3/5 and θ ∈ [−π/2, π/2], so cos θ ≥ 0. By Pythagoras: cos θ = √(1 − 9/25) = √(16/25) = 4/5.",
      ["4/5", "0.8"],
      "Use cos²θ = 1 − sin²θ. The range of arcsin is [−π/2, π/2], so cos θ ≥ 0 — take the positive root."
    ),
    // i3 — typed (identity with uncommon angle, D2)
    answer(
      "y12e1-itp-i3",
      "Given cos⁻¹(x) = π/5, find the exact value of sin⁻¹(x).",
      "\\sin^{-1}(x)+\\cos^{-1}(x)=\\frac{\\pi}{2}",
      "3pi/10",
      "From the identity: sin⁻¹(x) = π/2 − π/5 = 5π/10 − 2π/10 = 3π/10.",
      ["3pi/10", "3π/10"],
      "Use sin⁻¹(x) = π/2 − cos⁻¹(x) and find a common denominator of 10."
    ),
    // i4 — MCQ (domain of the identity, D3)
    choice(
      "y12e1-itp-i4",
      "For which set of x values does sin⁻¹(x) + cos⁻¹(x) = π/2 hold?",
      "B",
      ["x ∈ [0, 1]", "x ∈ [−1, 1]", "x ∈ [−π/2, π/2]", "x ∈ ℝ"],
      "Both sin⁻¹ and cos⁻¹ require inputs in [−1, 1]. The identity holds for all x in that closed interval, including negative values of x.",
      "\\text{Choose the best option.}",
      "Both arcsin and arccos are only defined for inputs in [−1, 1] — check what their domains are."
    ),
    // i5 — typed (negative input, Q2 reasoning, D3)
    answer(
      "y12e1-itp-i5",
      "Evaluate sin(cos⁻¹(−4/5)). Take care with the quadrant of cos⁻¹(−4/5).",
      "\\text{Let }\\theta=\\cos^{-1}\\!\\left(-\\tfrac45\\right),\\quad\\theta\\in\\left(\\tfrac{\\pi}{2},\\pi\\right)",
      "3/5",
      "Let θ = cos⁻¹(−4/5). Since cos θ = −4/5 < 0 and θ ∈ [0, π], the angle θ is in Q2. In Q2 sin θ > 0. By Pythagoras: sin θ = √(1 − 16/25) = √(9/25) = 3/5.",
      ["3/5", "0.6"],
      "arccos of a negative number lands in Q2 — sin is still positive there."
    ),
  ],
  masteryQuiz: [
    // m1 — typed, D3
    answer(
      "y12e1-itp-m1",
      "Evaluate sin(cos⁻¹(5/13)).",
      "\\text{Let }\\theta=\\cos^{-1}\\!\\left(\\tfrac{5}{13}\\right)",
      "12/13",
      "Let θ = cos⁻¹(5/13). Then cos θ = 5/13 and sin θ = √(1 − 25/169) = √(144/169) = 12/13. This is the (5, 12, 13) Pythagorean triple.",
      ["12/13"]
    ),
    // m2 — MCQ, D3 (cancellation misconception)
    choice(
      "y12e1-itp-m2",
      "Which expression always equals x for all x ∈ [−1, 1]?",
      "A",
      [
        "sin(sin⁻¹(x))",
        "sin⁻¹(sin(x))",
        "cos⁻¹(sin(x))",
        "sin(cos⁻¹(x))",
      ],
      "sin(sin⁻¹(x)) = x because sin and arcsin cancel within the domain [−1, 1]. sin⁻¹(sin(x)) only equals x when x is already in [−π/2, π/2]; outside that range the principal value differs.",
      "\\text{Choose the best option.}"
    ),
    // m3 — typed, D3
    answer(
      "y12e1-itp-m3",
      "Evaluate cos(sin⁻¹(12/13)).",
      "\\text{Let }\\theta=\\sin^{-1}\\!\\left(\\tfrac{12}{13}\\right)",
      "5/13",
      "Let θ = sin⁻¹(12/13). Then sin θ = 12/13 and θ ∈ [−π/2, π/2], so cos θ ≥ 0. By Pythagoras: cos θ = √(1 − 144/169) = √(25/169) = 5/13.",
      ["5/13"]
    ),
    // m4 — typed, D3 (identity with 2π/7)
    answer(
      "y12e1-itp-m4",
      "Given sin⁻¹(x) = 2π/7, find the exact value of cos⁻¹(x).",
      "\\sin^{-1}(x)+\\cos^{-1}(x)=\\frac{\\pi}{2}",
      "3pi/14",
      "cos⁻¹(x) = π/2 − 2π/7 = 7π/14 − 4π/14 = 3π/14.",
      ["3pi/14", "3π/14"]
    ),
    // m5 — MCQ, D4 (inequality reasoning with identity)
    choice(
      "y12e1-itp-m5",
      "If sin⁻¹(x) + cos⁻¹(x) = π/2 and sin⁻¹(x) > cos⁻¹(x), which must be true?",
      "A",
      ["x > √2/2", "x < √2/2", "x > 0", "x > 1/2"],
      "The two values are equal when both equal π/4, at x = sin(π/4) = √2/2. If sin⁻¹(x) > cos⁻¹(x), then sin⁻¹(x) > π/4, so x > sin(π/4) = √2/2.",
      "\\text{Choose the best option.}"
    ),
    // m6 — typed, D4 (tan of arcsin)
    answer(
      "y12e1-itp-m6",
      "Evaluate tan(sin⁻¹(3/5)).",
      "\\text{Let }\\theta=\\sin^{-1}\\!\\left(\\tfrac35\\right)",
      "3/4",
      "Let θ = sin⁻¹(3/5). Then sin θ = 3/5 and cos θ = 4/5 (positive since θ ∈ [−π/2, π/2]). So tan θ = sin θ ÷ cos θ = (3/5) ÷ (4/5) = 3/4.",
      ["3/4", "0.75"]
    ),
    // m7 — MCQ, D4 (range of arccos — common domain/range confusion)
    choice(
      "y12e1-itp-m7",
      "The range of cos⁻¹(x) is:",
      "C",
      ["[−π/2, π/2]", "[−1, 1]", "[0, π]", "(0, π)"],
      "The range of arccos is [0, π], including both endpoints 0 and π. The range [−π/2, π/2] belongs to arcsin. [−1, 1] is the domain (the input values), not the range.",
      "\\text{Choose the best option.}"
    ),
    // m8 — typed, D5 (negative input with Q2 reasoning)
    answer(
      "y12e1-itp-m8",
      "Evaluate sin(cos⁻¹(−3/5)).",
      "\\text{Let }\\theta=\\cos^{-1}\\!\\left(-\\tfrac35\\right),\\quad\\theta\\in\\left(\\tfrac{\\pi}{2},\\pi\\right)",
      "4/5",
      "Let θ = cos⁻¹(−3/5). Since cos θ = −3/5 < 0, θ lies in (π/2, π). In that range sin θ > 0. By Pythagoras: sin θ = √(1 − 9/25) = √(16/25) = 4/5.",
      ["4/5", "0.8"]
    ),
    // m9 — typed, D5 (identity with π/7)
    answer(
      "y12e1-itp-m9",
      "Given sin⁻¹(x) = π/7, find the exact value of cos⁻¹(x).",
      "\\sin^{-1}(x)+\\cos^{-1}(x)=\\frac{\\pi}{2}",
      "5pi/14",
      "cos⁻¹(x) = π/2 − π/7 = 7π/14 − 2π/14 = 5π/14.",
      ["5pi/14", "5π/14"]
    ),
    // m10 — typed, D5 (general expression)
    answer(
      "y12e1-itp-m10",
      "For x ∈ [−1, 1], express cos(sin⁻¹(x)) as a function of x.",
      "\\text{Let }\\theta=\\sin^{-1}(x),\\quad\\sin\\theta=x,\\quad\\theta\\in\\left[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right]",
      "sqrt(1-x^2)",
      "Let θ = sin⁻¹(x). Then sin θ = x and θ ∈ [−π/2, π/2], so cos θ ≥ 0. By Pythagoras: cos θ = √(1 − sin²θ) = √(1 − x²). Therefore cos(sin⁻¹(x)) = √(1 − x²).",
      ["sqrt(1-x^2)", "√(1-x²)", "\\sqrt{1-x^2}"]
    ),
  ],
};

export function year12Extension1InverseTrigPropertiesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (
    course.slug === "year-12-extension-1" &&
    unit.slug === "inverse-trig" &&
    lesson.slug === "inverse-trig-properties"
  ) {
    return inverseTrigProperties;
  }
  return undefined;
}
