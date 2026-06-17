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

const calculusApplicationsRevision: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Activate the integration and differential-equation skills needed for Further Applications of Calculus: standard indefinite integrals, the Fundamental Theorem for definite integrals, and separation of variables for first-order DEs.",
  learningIntention:
    "Evaluate definite and indefinite integrals using standard forms, apply the Fundamental Theorem of Calculus, and solve first-order separable differential equations including dy/dx = ky.",
  successCriteria: [
    "Recall and apply the standard indefinite integrals for xⁿ, eˣ, 1/x, sin x, and cos x.",
    "Evaluate definite integrals using the Fundamental Theorem: ∫_a^b f(x) dx = F(b) − F(a).",
    "Separate variables to solve $dy/dx = ky$, obtaining $y = Ce^{kx}$.",
    "Apply an initial condition to find the constant C in the general solution.",
    "Solve a separable DE of the form dy/dx = f(x)·g(y).",
  ],
  teaching: {
    paragraphs: [
      "Further Applications of Calculus extends integration into volumes of revolution, advanced growth models, and slope fields. This lesson reviews the prerequisite skills: the standard integral table, using the Fundamental Theorem of Calculus to evaluate definite integrals, and separating variables to solve a first-order differential equation.",
      "Standard indefinite integrals to know fluently: $\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ (for $n\\neq-1$); $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$; $\\int e^x\\,dx=e^x+C$; $\\int\\sin x\\,dx=-\\cos x+C$; $\\int\\cos x\\,dx=\\sin x+C$. Every other standard form in this unit reduces to one of these.",
      "The Fundamental Theorem of Calculus: $\\int_a^b f(x)\\,dx=F(b)-F(a)$ where $F'=f$. Evaluate the antiderivative at the upper limit, subtract its value at the lower limit. The result is the signed area between the curve and the $x$-axis from $a$ to $b$.",
      "Separation of variables: for $\\frac{dy}{dx}=f(x)\\cdot g(y)$, rewrite as $\\frac{1}{g(y)}\\,dy=f(x)\\,dx$ and integrate both sides. The special case $\\frac{dy}{dx}=ky$ gives $\\ln|y|=kx+C_1$, so $y=Ce^{kx}$ where $C=\\pm e^{C_1}$. Apply an initial condition to find $C$.",
    ],
    latexBlocks: [
      "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C,\\quad\\int e^x\\,dx=e^x+C,\\quad\\int\\frac{1}{x}\\,dx=\\ln|x|+C",
      "\\int_a^b f(x)\\,dx=F(b)-F(a)\\quad\\text{where }F'(x)=f(x)",
      "\\frac{dy}{dx}=ky\\implies y=Ce^{kx}\\quad(\\text{apply initial condition to find }C)",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a definite integral",
      questionLatex:
        "\\text{Evaluate }\\int_0^2(3x^2+1)\\,dx.",
      steps: [
        {
          explanation:
            "Find the antiderivative F(x) = x³ + x.",
          latex:
            "\\int(3x^2+1)\\,dx=x^3+x",
        },
        {
          explanation:
            "Apply the Fundamental Theorem: substitute the upper limit, subtract the lower limit.",
          latex:
            "\\int_0^2(3x^2+1)\\,dx=\\bigl[x^3+x\\bigr]_0^2=(8+2)-(0+0)=10",
        },
      ],
      finalAnswerLatex: "\\int_0^2(3x^2+1)\\,dx=10",
    },
    {
      title: "Solve a separable DE with initial condition",
      questionLatex:
        "\\text{Solve }\\frac{dy}{dx}=2y\\text{ with }y(0)=3.",
      steps: [
        {
          explanation:
            "Separate variables: move dy/y to one side and 2 dx to the other.",
          latex:
            "\\frac{1}{y}\\,dy=2\\,dx",
        },
        {
          explanation:
            "Integrate both sides.",
          latex:
            "\\ln|y|=2x+C_1\\implies y=Ce^{2x}",
        },
        {
          explanation:
            "Apply y(0) = 3 to find C.",
          latex:
            "3=Ce^0=C\\implies y=3e^{2x}",
        },
      ],
      finalAnswerLatex: "y=3e^{2x}",
    },
  ],
  guidedPractice: [
    // g1 — MCQ
    choice(
      "y12e1-car-g1",
      "∫eˣ dx equals:",
      "B",
      ["x · eˣ + C", "eˣ + C", "eˣ⁺¹ + C", "x · eˣ⁻¹ + C"],
      "∫eˣ dx = eˣ + C. The exponential function is its own antiderivative.",
      "\\text{Choose the best option.}",
      "Which function has itself as its derivative?"
    ),
    // g2 — typed
    answer(
      "y12e1-car-g2",
      "Evaluate ∫₀¹ 2x dx.",
      "\\int_0^1 2x\\,dx=\\bigl[x^2\\bigr]_0^1",
      "1",
      "Antiderivative of 2x is x². [x²]₀¹ = 1² − 0² = 1.",
      ["1"],
      "Antiderivative of 2x is x². Then apply FTC."
    ),
    // g3 — typed
    answer(
      "y12e1-car-g3",
      "Evaluate ∫₁² (1/x) dx. Leave your answer in exact form.",
      "\\int_1^2\\frac{1}{x}\\,dx=\\bigl[\\ln|x|\\bigr]_1^2",
      "ln(2)",
      "∫(1/x)dx = ln|x|. [ln|x|]₁² = ln 2 − ln 1 = ln 2 − 0 = ln 2.",
      ["ln(2)", "ln 2"],
      "Recall ∫(1/x)dx = ln|x| + C, and ln(1) = 0."
    ),
    // g4 — typed
    answer(
      "y12e1-car-g4",
      "For the DE $dy/dx = 3y$, the general solution is $y = Ce^{kx}$. Find $k$.",
      "\\frac{dy}{dx}=3y\\implies y=Ce^{3x}",
      "3",
      "Separating variables: (1/y) dy = 3 dx → ln|y| = 3x + C₁ → y = Ce^(3x). So k = 3.",
      ["3"],
      "Separate variables and integrate. The coefficient of x in the exponent equals k."
    ),
  ],
  independentPractice: [
    // i1 — typed, D2
    answer(
      "y12e1-car-i1",
      "Evaluate ∫₀^π sin(x) dx.",
      "\\int_0^\\pi\\sin x\\,dx=\\bigl[-\\cos x\\bigr]_0^\\pi",
      "2",
      "[−cos x]₀^π = −cos(π) − (−cos 0) = −(−1) + 1 = 1 + 1 = 2.",
      ["2"],
      "Antiderivative of sin x is −cos x. Evaluate at π and 0."
    ),
    // i2 — typed, D2
    answer(
      "y12e1-car-i2",
      "Evaluate ∫₀¹ eˣ dx. Leave your answer in exact form.",
      "\\int_0^1 e^x\\,dx=\\bigl[e^x\\bigr]_0^1",
      "e-1",
      "[eˣ]₀¹ = e¹ − e⁰ = e − 1.",
      ["e-1", "e - 1"],
      "Antiderivative of eˣ is eˣ. Then apply FTC."
    ),
    // i3 — typed, D2
    answer(
      "y12e1-car-i3",
      "Evaluate ∫₀² (3x² + 1) dx.",
      "\\int_0^2(3x^2+1)\\,dx=\\bigl[x^3+x\\bigr]_0^2",
      "10",
      "[x³ + x]₀² = (8 + 2) − (0 + 0) = 10.",
      ["10"],
      "Antiderivative of 3x² + 1 is x³ + x. Evaluate at x = 2 and x = 0."
    ),
    // i4 — MCQ, D3
    choice(
      "y12e1-car-i4",
      "To solve dy/dx = ky by separation of variables, the first step is:",
      "B",
      [
        "Integrate both sides with respect to x",
        "Rewrite as (1/y) dy = k dx",
        "Divide both sides by y²",
        "Substitute y = Ce^x",
      ],
      "Separate the variables: move the 1/y term to the left side to get (1/y) dy = k dx, then integrate both sides.",
      "\\text{Choose the best option.}",
      "Rearrange so that every y term is on one side and every x term on the other."
    ),
    // i5 — typed, D3
    answer(
      "y12e1-car-i5",
      "Solve dy/dx = −2y with initial condition y(0) = 5. Find y(1). Leave in exact form.",
      "y=5e^{-2x}\\implies y(1)=5e^{-2}",
      "5e^(-2)",
      "Separation gives y = Ce^(−2x). At x = 0: C = 5. So y(1) = 5e^(−2).",
      ["5e^(-2)", "5e^{-2}", "5/e^2"]
    ),
  ],
  masteryQuiz: [
    // m1 — typed, D3
    answer(
      "y12e1-car-m1",
      "Evaluate ∫₁⁴ √x dx. Give an exact value.",
      "\\int_1^4 x^{1/2}\\,dx=\\left[\\frac{2x^{3/2}}{3}\\right]_1^4",
      "14/3",
      "[2x^(3/2)/3]₁⁴ = 2(4^(3/2))/3 − 2(1)/3 = 2(8)/3 − 2/3 = 16/3 − 2/3 = 14/3.",
      ["14/3"]
    ),
    // m2 — MCQ, D3
    choice(
      "y12e1-car-m2",
      "∫sin(x) dx equals:",
      "B",
      ["cos(x) + C", "−cos(x) + C", "sin(x) + C", "−sin(x) + C"],
      "∫sin(x) dx = −cos(x) + C. Check by differentiating: d/dx[−cos x] = sin x. ✓"
    ),
    // m3 — typed, D3
    answer(
      "y12e1-car-m3",
      "Evaluate ∫₀² (x² − x) dx.",
      "\\int_0^2(x^2-x)\\,dx=\\left[\\frac{x^3}{3}-\\frac{x^2}{2}\\right]_0^2",
      "2/3",
      "[x³/3 − x²/2]₀² = (8/3 − 4/2) − 0 = 8/3 − 2 = 8/3 − 6/3 = 2/3.",
      ["2/3"]
    ),
    // m4 — typed, D3
    answer(
      "y12e1-car-m4",
      "Solve dy/dx = 4x with y(0) = 1. Find y(2).",
      "y=2x^2+1\\implies y(2)=2(4)+1=9",
      "9",
      "Separate: dy = 4x dx → y = 2x² + C. At x = 0: C = 1. So y = 2x² + 1. At x = 2: y = 8 + 1 = 9.",
      ["9"]
    ),
    // m5 — typed, D4
    answer(
      "y12e1-car-m5",
      "Evaluate ∫₀^(π/2) cos(x) dx.",
      "\\int_0^{\\pi/2}\\cos x\\,dx=\\bigl[\\sin x\\bigr]_0^{\\pi/2}",
      "1",
      "[sin x]₀^(π/2) = sin(π/2) − sin(0) = 1 − 0 = 1.",
      ["1"]
    ),
    // m6 — MCQ, D4
    choice(
      "y12e1-car-m6",
      "The Fundamental Theorem of Calculus states ∫_a^b f(x) dx =",
      "B",
      ["F(a) − F(b)", "F(b) − F(a)", "f'(b) − f'(a)", "F(b) + F(a)"],
      "∫_a^b f(x) dx = F(b) − F(a), where F' = f. Upper limit minus lower limit — the order matters."
    ),
    // m7 — typed, D4
    answer(
      "y12e1-car-m7",
      "Solve dy/dx = x/y with y(0) = 2. Find y(4). Give an exact value.",
      "y\\,dy=x\\,dx\\implies\\frac{y^2}{2}=\\frac{x^2}{2}+C\\implies y^2=x^2+4",
      "2sqrt(5)",
      "Separate: y dy = x dx → y²/2 = x²/2 + C. At (0,2): 2 = 0 + C, so C = 2. Then y² = x² + 4. At x = 4: y² = 20, y = 2√5.",
      ["2sqrt(5)", "2√5"]
    ),
    // m8 — typed, D5
    answer(
      "y12e1-car-m8",
      "Evaluate ∫₁^e (2/x) dx.",
      "\\int_1^e\\frac{2}{x}\\,dx=\\bigl[2\\ln|x|\\bigr]_1^e",
      "2",
      "[2ln|x|]₁^e = 2ln(e) − 2ln(1) = 2(1) − 2(0) = 2.",
      ["2"]
    ),
    // m9 — typed, D5
    answer(
      "y12e1-car-m9",
      "A population satisfies dy/dt = ky with y(0) = 10 and y(1) = 10e². Find k.",
      "y(t)=10e^{kt}\\implies y(1)=10e^k=10e^2\\implies k=2",
      "2",
      "General solution: y = 10e^(kt). At t = 1: 10e^k = 10e², so k = 2.",
      ["2"]
    ),
    // m10 — typed, D5
    answer(
      "y12e1-car-m10",
      "Evaluate ∫₀¹ $3e^{3x}$ dx. Leave in exact form.",
      "\\int_0^1 3e^{3x}\\,dx=\\bigl[e^{3x}\\bigr]_0^1",
      "e^3-1",
      "Antiderivative of 3e^(3x) is e^(3x). [e^(3x)]₀¹ = e³ − e⁰ = e³ − 1.",
      ["e^3-1", "e³-1", "e^{3}-1"]
    ),
  ],
};

export function year12Extension1CalculusApplicationsRevisionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (
    course.slug === "year-12-extension-1" &&
    unit.slug === "calculus-applications" &&
    lesson.slug === "calculus-applications-revision"
  ) {
    return calculusApplicationsRevision;
  }
  return undefined;
}
