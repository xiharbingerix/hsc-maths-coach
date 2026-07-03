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

const inverseTrigRevision: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Activate prior knowledge for inverse trigonometric functions: exact trig values at standard angles, quadrant sign rules (ASTC), and the sum/difference and double angle identities.",
  learningIntention:
    "Recall exact values of sin, cos and tan at standard angles; apply the ASTC rule to extend these to all four quadrants; and use the compound angle and double angle identities.",
  successCriteria: [
    "State exact values of sin, cos and tan at π/6, π/4, π/3 and their radian equivalents.",
    "Use the ASTC rule to find the sign of a trig ratio in any quadrant.",
    "Evaluate trig functions at angles in Q2, Q3, Q4 using the reference angle.",
    "Apply the double angle formulas sin(2θ) = 2sinθcosθ and cos(2θ) = cos²θ − sin²θ.",
    "Apply the sum formula sin(A+B) = sinAcosB + cosAsinB.",
  ],
  teaching: {
    paragraphs: [
      "Inverse trigonometric functions are built on top of the regular trig functions — so before working with $\\sin^{-1}$, $\\cos^{-1}$, and $\\tan^{-1}$, you need fluency with exact values, quadrant signs, and compound angle identities. This lesson reviews all three.",
      "Exact values come from two right triangles. The 30-60-90 triangle gives: $\\sin\\frac{\\pi}{6}=\\frac{1}{2}$, $\\cos\\frac{\\pi}{6}=\\frac{\\sqrt{3}}{2}$, $\\tan\\frac{\\pi}{6}=\\frac{1}{\\sqrt{3}}$; and $\\sin\\frac{\\pi}{3}=\\frac{\\sqrt{3}}{2}$, $\\cos\\frac{\\pi}{3}=\\frac{1}{2}$, $\\tan\\frac{\\pi}{3}=\\sqrt{3}$. The 45-45-90 triangle gives $\\sin\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}=\\frac{\\sqrt{2}}{2}$, $\\tan\\frac{\\pi}{4}=1$.",
      "Quadrant signs follow ASTC: All ratios are positive in Q1. Only Sin is positive in Q2. Only Tan is positive in Q3. Only Cos is positive in Q4. To evaluate a trig ratio at any angle: find the acute reference angle (angle to the x-axis), evaluate the ratio for that reference angle, then apply the correct sign for the quadrant.",
      "The key identities for this unit: $\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B$; $\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B$; $\\sin 2\\theta=2\\sin\\theta\\cos\\theta$; $\\cos 2\\theta=\\cos^2\\theta-\\sin^2\\theta=1-2\\sin^2\\theta=2\\cos^2\\theta-1$. Knowing which form of the double angle identity to choose will save time in integration questions.",
    ],
    latexBlocks: [
      "\\sin\\tfrac{\\pi}{6}=\\tfrac{1}{2},\\;\\cos\\tfrac{\\pi}{6}=\\tfrac{\\sqrt3}{2},\\;\\sin\\tfrac{\\pi}{4}=\\cos\\tfrac{\\pi}{4}=\\tfrac{\\sqrt2}{2},\\;\\sin\\tfrac{\\pi}{3}=\\tfrac{\\sqrt3}{2},\\;\\cos\\tfrac{\\pi}{3}=\\tfrac{1}{2}",
      "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B,\\quad\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B",
      "\\sin 2\\theta=2\\sin\\theta\\cos\\theta,\\quad\\cos 2\\theta=\\cos^2\\theta-\\sin^2\\theta=1-2\\sin^2\\theta",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a trig function in Q2 using the reference angle",
      questionLatex: "\\text{Find the exact value of }\\sin\\dfrac{5\\pi}{6}.",
      unitCircleDiagram: {
        description:
          "Unit circle showing angle 5π/6 (150°) in Q2. The reference angle is π/6 (30°). The terminal point is (−√3/2, 1/2). The reference triangle has base √3/2 on the negative x-axis side and height 1/2.",
        angleRadians: "\\frac{5\\pi}{6}",
        angleDegrees: "150",
        terminalPoint: {
          x: "-\\frac{\\sqrt{3}}{2}",
          y: "\\frac{1}{2}",
          label: "(-√3/2, 1/2)",
        },
        quadrant: 2,
        referenceAngle: "\\frac{\\pi}{6}",
        showReferenceTriangle: true,
      },
      steps: [
        {
          explanation:
            "5π/6 lies in Q2 (between π/2 and π). The reference angle is π minus the angle.",
          latex:
            "\\text{Reference angle: }\\pi-\\tfrac{5\\pi}{6}=\\tfrac{\\pi}{6}",
        },
        {
          explanation:
            "In Q2 only sin is positive (ASTC). So sin(5π/6) = +sin(π/6).",
          latex:
            "\\sin\\tfrac{5\\pi}{6}=+\\sin\\tfrac{\\pi}{6}=\\tfrac{1}{2}",
        },
      ],
      finalAnswerLatex: "\\sin\\dfrac{5\\pi}{6}=\\dfrac{1}{2}",
    },
    {
      title: "Apply the double angle formula",
      questionLatex:
        "\\text{Given }\\sin\\theta=\\dfrac{12}{13}\\text{ and }\\theta\\in\\left[0,\\tfrac{\\pi}{2}\\right],\\text{ find }\\sin(2\\theta).",
      steps: [
        {
          explanation:
            "Find cos θ using the Pythagorean identity. Since θ is in Q1, cos θ is positive.",
          latex:
            "\\cos\\theta=\\sqrt{1-\\sin^2\\theta}=\\sqrt{1-\\tfrac{144}{169}}=\\sqrt{\\tfrac{25}{169}}=\\tfrac{5}{13}",
        },
        {
          explanation:
            "Apply the double angle formula sin(2θ) = 2sinθcosθ.",
          latex:
            "\\sin 2\\theta=2\\cdot\\tfrac{12}{13}\\cdot\\tfrac{5}{13}=\\tfrac{120}{169}",
        },
      ],
      finalAnswerLatex: "\\sin 2\\theta=\\dfrac{120}{169}",
    },
  ],
  guidedPractice: [
    // g1 — MCQ
    choice(
      "y12e1-itr-g1",
      "sin(π/6) equals:",
      "B",
      ["√3/2", "1/2", "√2/2", "1"],
      "sin(π/6) = sin(30°) = 1/2. The 30-60-90 triangle has sides 1 (opp to 30°), √3 (adj), 2 (hyp), giving sin 30° = 1/2.",
      "\\text{Choose the best option.}",
      "Recall the 30-60-90 triangle: opposite side to 30° is 1, hypotenuse is 2."
    ),
    // g2 — typed
    answer(
      "y12e1-itr-g2",
      "Find the exact value of cos(π/3).",
      "\\cos\\frac{\\pi}{3}",
      "1/2",
      "cos(π/3) = cos(60°) = 1/2. The adjacent side to 60° in a 30-60-90 triangle is 1 out of hypotenuse 2.",
      ["1/2", "0.5"],
      "In a 30-60-90 triangle, the side adjacent to 60° is 1 and the hypotenuse is 2."
    ),
    // g3 — typed
    answer(
      "y12e1-itr-g3",
      "Find the exact value of sin(3π/4).",
      "",
      "sqrt(2)/2",
      "3π/4 is in Q2 (ref angle π/4). In Q2, sin is positive. sin(3π/4) = +sin(π/4) = √2/2.",
      ["sqrt(2)/2", "√2/2"],
      "3π/4 is in Q2 — find the reference angle and use the ASTC rule."
    ),
    // g4 — typed
    answer(
      "y12e1-itr-g4",
      "Given sin θ = 4/5 and θ ∈ [0, π/2], find sin(2θ).",
      "",
      "24/25",
      "cos θ = √(1 − 16/25) = 3/5. Then sin(2θ) = 2(4/5)(3/5) = 24/25.",
      ["24/25"],
      "Find cosθ from Pythagorean identity, then use sin(2θ) = 2sinθcosθ."
    ),
  ],
  independentPractice: [
    // i1 — typed, D2
    answer(
      "y12e1-itr-i1",
      "Find the exact value of tan(π/4).",
      "\\tan\\frac{\\pi}{4}",
      "1",
      "tan(π/4) = tan(45°) = 1. In the isosceles right triangle both legs are equal so the ratio is 1.",
      ["1"],
      "In a 45-45-90 triangle, opposite and adjacent sides are equal."
    ),
    // i2 — typed, D2
    answer(
      "y12e1-itr-i2",
      "Find the exact value of cos(2π/3).",
      "",
      "-1/2",
      "2π/3 is in Q2 (ref angle π/3). In Q2, cos is negative. cos(2π/3) = −cos(π/3) = −1/2.",
      ["-1/2", "-0.5"],
      "2π/3 is in Q2 — cos is negative in Q2. Use the reference angle π/3."
    ),
    // i3 — MCQ, D2
    choice(
      "y12e1-itr-i3",
      "cos(A + B) equals:",
      "B",
      [
        "cosA cosB + sinA sinB",
        "cosA cosB − sinA sinB",
        "cosA sinB + sinA cosB",
        "−cosA cosB + sinA sinB",
      ],
      "cos(A+B) = cosAcosB − sinAsinB. The minus sign distinguishes it from the sum formula for sin. A common error is adding instead of subtracting.",
      "\\text{Choose the best option.}",
      "The cosine compound formula subtracts; the sine compound formula adds or subtracts based on the ±."
    ),
    // i4 — typed, D3
    answer(
      "y12e1-itr-i4",
      "Given cos θ = 3/5 and θ ∈ [0, π/2], find cos(2θ).",
      "",
      "-7/25",
      "cos(2θ) = 2cos²θ − 1 = 2(9/25) − 1 = 18/25 − 25/25 = −7/25.",
      ["-7/25"],
      "Use cos(2θ) = 2cos²θ − 1, substituting cos θ = 3/5."
    ),
    // i5 — typed, D3
    answer(
      "y12e1-itr-i5",
      "Find the exact value of sin(11π/6).",
      "",
      "-1/2",
      "11π/6 is in Q4 (between 3π/2 and 2π). Reference angle = 2π − 11π/6 = π/6. In Q4, sin is negative: sin(11π/6) = −1/2.",
      ["-1/2", "-0.5"],
      "11π/6 is in Q4 where sin is negative. Reference angle = 2π − 11π/6."
    ),
  ],
  masteryQuiz: [
    // m1 — typed, D3
    answer(
      "y12e1-itr-m1",
      "Find the exact value of cos(5π/6).",
      "",
      "-sqrt(3)/2",
      "5π/6 is in Q2 (ref angle π/6). In Q2, cos is negative: cos(5π/6) = −cos(π/6) = −√3/2.",
      ["-sqrt(3)/2", "-√3/2"]
    ),
    // m2 — MCQ, D3
    choice(
      "y12e1-itr-m2",
      "sin(2A) in terms of sin A and cos A is:",
      "B",
      ["sin²A + cos²A", "2sinAcosA", "sinA + cosA", "2sinA"],
      "sin(2A) = 2sinAcosA, from the sum formula sin(A+A) = sinAcosA + cosAsinA = 2sinAcosA. Note sin²A + cos²A = 1, not sin(2A)."
    ),
    // m3 — typed, D3
    answer(
      "y12e1-itr-m3",
      "Find the exact value of tan(π/3).",
      "",
      "sqrt(3)",
      "tan(π/3) = sin(π/3)/cos(π/3) = (√3/2)/(1/2) = √3.",
      ["sqrt(3)", "√3"]
    ),
    // m4 — typed, D3
    answer(
      "y12e1-itr-m4",
      "Given sin θ = 5/13 and θ ∈ [0, π/2], find cos(2θ).",
      "",
      "119/169",
      "cos(2θ) = 1 − 2sin²θ = 1 − 2(25/169) = 1 − 50/169 = 119/169.",
      ["119/169"]
    ),
    // m5 — MCQ, D4
    choice(
      "y12e1-itr-m5",
      "In Q3 (π < θ < 3π/2), which trig ratio is positive?",
      "C",
      ["sin", "cos", "tan", "all three"],
      "In Q3 only tan is positive (ASTC: All, Sin, Tan, Cos). Both sin and cos are negative in Q3, but their ratio tan = sin/cos is positive (negative ÷ negative)."
    ),
    // m6 — typed, D4
    answer(
      "y12e1-itr-m6",
      "Given sin θ = 3/5 and cos θ = −4/5 (θ in Q2), find sin(2θ).",
      "",
      "-24/25",
      "sin(2θ) = 2 × (3/5) × (−4/5) = −24/25. The result is negative because 2θ is outside Q1.",
      ["-24/25"]
    ),
    // m7 — typed, D4
    answer(
      "y12e1-itr-m7",
      "Find the exact value of sin(7π/6).",
      "",
      "-1/2",
      "7π/6 is in Q3 (ref angle π/6). In Q3, sin is negative: sin(7π/6) = −sin(π/6) = −1/2.",
      ["-1/2", "-0.5"]
    ),
    // m8 — MCQ, D4
    choice(
      "y12e1-itr-m8",
      "cos²θ − sin²θ equals:",
      "A",
      ["cos(2θ)", "sin(2θ)", "2cos²θ", "1"],
      "cos²θ − sin²θ = cos(2θ). This is one of the three equivalent forms of the double angle formula for cosine. sin(2θ) = 2sinθcosθ, which is different."
    ),
    // m9 — typed, D5
    answer(
      "y12e1-itr-m9",
      "Find the exact value of cos(5π/4).",
      "",
      "-sqrt(2)/2",
      "5π/4 is in Q3 (ref angle π/4). In Q3, cos is negative: cos(5π/4) = −cos(π/4) = −√2/2.",
      ["-sqrt(2)/2", "-√2/2"]
    ),
    // m10 — typed, D5
    answer(
      "y12e1-itr-m10",
      "Given cos(2θ) = −1/2 and θ ∈ [0, π/2], find sin θ.",
      "",
      "sqrt(3)/2",
      "1 − 2sin²θ = −1/2 → 2sin²θ = 3/2 → sin²θ = 3/4 → sin θ = √3/2 (positive since θ ∈ [0, π/2]).",
      ["sqrt(3)/2", "√3/2"]
    ),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-invrev-pool-d5-1",
      prompt: "Find the exact value of sin(π/6).",
      latex: "\\sin\\left(\\tfrac{\\pi}{6}\\right)",
      answer: "1/2",
      acceptedAnswers: ["0.5"],
      hint: "π/6 is a standard angle (30°).",
      explanation: "sin(π/6) = 1/2.",
      difficulty: 5,
    },
  ],
};

export function year12Extension1InverseTrigRevisionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (
    course.slug === "year-12-extension-1" &&
    unit.slug === "inverse-trig" &&
    lesson.slug === "inverse-trig-revision"
  ) {
    return inverseTrigRevision;
  }
  return undefined;
}
