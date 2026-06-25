import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type { CartesianGraph } from "../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Analyse the structure of the integrand before selecting a method.",
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select the best option.}",
    choices: choices.map((text, i) => ({
      label: String.fromCharCode(65 + i),
      text,
    })),
    answer,
    acceptedAnswers: [],
    hint,
    explanation,
    cartesianGraph,
  };
}

function calcTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Set up the expression carefully, then simplify.",
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    cartesianGraph,
  };
}

function sampledSegments(points: { x: number; y: number }[]) {
  return points.slice(1).map((point, index) => ({
    from: points[index],
    to: point,
  }));
}

const parabolaXAxisGraph: CartesianGraph = {
  description:
    "Cartesian graph showing y = x^2 from x = 0 to x = 2 with the region under the curve above the x-axis shaded.",
  xMin: -0.5,
  xMax: 2.5,
  yMin: -0.5,
  yMax: 4.5,
  xStep: 0.5,
  yStep: 1,
  xAxisLabel: "x",
  yAxisLabel: "y",
  parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, xMin: 0, xMax: 2, label: "y = x^2" }],
  points: [
    { x: 0, y: 0, label: "(0, 0)" },
    { x: 2, y: 4, label: "(2, 4)" },
  ],
  shadedRegions: [
    {
      kind: "under-function",
      functionType: "quadratic",
      quadratic: { a: 1, b: 0, c: 0 },
      xMin: 0,
      xMax: 2,
      baseline: 0,
      color: "blue",
      description: "Region under y = x^2 from x = 0 to x = 2.",
    },
  ],
};

const sqrtVsLineUnitGraph: CartesianGraph = {
  description:
    "Cartesian graph showing y = sqrt(x) and y = x from x = 0 to x = 1, with the region between the curves shaded.",
  xMin: -0.1,
  xMax: 1.1,
  yMin: -0.1,
  yMax: 1.1,
  xStep: 0.2,
  yStep: 0.2,
  xAxisLabel: "x",
  yAxisLabel: "y",
  curves: [{ kind: "squareRoot", xMin: 0, xMax: 1, label: "y = sqrt(x)" }],
  lines: [{ kind: "linear", m: 1, b: 0, xMin: 0, xMax: 1, label: "y = x" }],
  points: [
    { x: 0, y: 0, label: "(0, 0)" },
    { x: 1, y: 1, label: "(1, 1)" },
  ],
};

const parabolaYAxisGraph: CartesianGraph = {
  description:
    "Cartesian graph showing y = x^2 from x = 0 to x = 2 and the line y = 4, with the region between the parabola and y = 4 shaded in the first quadrant.",
  xMin: -0.5,
  xMax: 2.5,
  yMin: -0.5,
  yMax: 4.5,
  xStep: 0.5,
  yStep: 1,
  xAxisLabel: "x",
  yAxisLabel: "y",
  parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, xMin: 0, xMax: 2, label: "y = x^2" }],
  lines: [{ kind: "linear", m: 0, b: 4, xMin: 0, xMax: 2, label: "y = 4" }],
  points: [
    { x: 0, y: 0, label: "(0, 0)" },
    { x: 2, y: 4, label: "(2, 4)" },
  ],
  shadedRegions: [
    {
      kind: "between-functions",
      xMin: 0,
      xMax: 2,
      top: { functionType: "line", line: { m: 0, b: 4 } },
      bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } },
      color: "green",
      description: "Region between y = x^2 and y = 4 for 0 <= x <= 2.",
    },
  ],
};

const parabolaUnitYAxisGraph: CartesianGraph = {
  description:
    "Cartesian graph showing y = x^2 from x = 0 to x = 1 and the line y = 1, with the region between the parabola and y = 1 shaded.",
  xMin: -0.1,
  xMax: 1.1,
  yMin: -0.1,
  yMax: 1.1,
  xStep: 0.2,
  yStep: 0.2,
  xAxisLabel: "x",
  yAxisLabel: "y",
  parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, xMin: 0, xMax: 1, label: "y = x^2" }],
  lines: [{ kind: "linear", m: 0, b: 1, xMin: 0, xMax: 1, label: "y = 1" }],
  points: [
    { x: 0, y: 0, label: "(0, 0)" },
    { x: 1, y: 1, label: "(1, 1)" },
  ],
  shadedRegions: [
    {
      kind: "between-functions",
      xMin: 0,
      xMax: 1,
      top: { functionType: "line", line: { m: 0, b: 1 } },
      bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } },
      color: "amber",
      description: "Region between y = x^2 and y = 1 for 0 <= x <= 1.",
    },
  ],
};

const lineVsParabolaUnitGraph: CartesianGraph = {
  description:
    "Cartesian graph showing y = x and y = x^2 from x = 0 to x = 1, with the region between the line and the parabola shaded.",
  xMin: -0.1,
  xMax: 1.1,
  yMin: -0.1,
  yMax: 1.1,
  xStep: 0.2,
  yStep: 0.2,
  xAxisLabel: "x",
  yAxisLabel: "y",
  parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, xMin: 0, xMax: 1, label: "y = x^2" }],
  lines: [{ kind: "linear", m: 1, b: 0, xMin: 0, xMax: 1, label: "y = x" }],
  points: [
    { x: 0, y: 0, label: "(0, 0)" },
    { x: 1, y: 1, label: "(1, 1)" },
  ],
  shadedRegions: [
    {
      kind: "between-functions",
      xMin: 0,
      xMax: 1,
      top: { functionType: "line", line: { m: 1, b: 0 } },
      bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } },
      color: "blue",
      description: "Region between y = x and y = x^2 for 0 <= x <= 1.",
    },
  ],
};

const quarterCircleGraph: CartesianGraph = {
  description:
    "Cartesian graph showing the quarter circle y = sqrt(4 - x^2) from x = 0 to x = 2 in the first quadrant, with the intercepts at (0, 2) and (2, 0).",
  xMin: -0.2,
  xMax: 2.2,
  yMin: -0.2,
  yMax: 2.2,
  xStep: 0.5,
  yStep: 0.5,
  xAxisLabel: "x",
  yAxisLabel: "y",
  points: [
    { x: 0, y: 2, label: "(0, 2)" },
    { x: 1, y: 1.732, label: "(1, sqrt(3))" },
    { x: 2, y: 0, label: "(2, 0)" },
  ],
  lineSegments: sampledSegments([
    { x: 0, y: 2 },
    { x: 0.5, y: 1.936 },
    { x: 1, y: 1.732 },
    { x: 1.5, y: 1.323 },
    { x: 2, y: 0 },
  ]),
};

const yEqualsXTriangleGraph: CartesianGraph = {
  description:
    "Cartesian graph showing y = x from x = 0 to x = 2 and the line y = 2, with the triangular region between them shaded in the first quadrant.",
  xMin: -0.2,
  xMax: 2.2,
  yMin: -0.2,
  yMax: 2.2,
  xStep: 0.5,
  yStep: 0.5,
  xAxisLabel: "x",
  yAxisLabel: "y",
  lines: [
    { kind: "linear", m: 1, b: 0, xMin: 0, xMax: 2, label: "y = x" },
    { kind: "linear", m: 0, b: 2, xMin: 0, xMax: 2, label: "y = 2" },
  ],
  points: [
    { x: 0, y: 0, label: "(0, 0)" },
    { x: 0, y: 2, label: "(0, 2)" },
    { x: 2, y: 2, label: "(2, 2)" },
  ],
  shadedRegions: [
    {
      kind: "between-functions",
      xMin: 0,
      xMax: 2,
      top: { functionType: "line", line: { m: 0, b: 2 } },
      bottom: { functionType: "line", line: { m: 1, b: 0 } },
      color: "green",
      description: "Region between y = x and y = 2 for 0 <= x <= 2.",
    },
  ],
};

const sqrtVsHalfXGraph: CartesianGraph = {
  description:
    "Cartesian graph showing y = sqrt(x) and y = x/2 from x = 0 to x = 4, with intersection points at (0, 0) and (4, 2).",
  xMin: -0.2,
  xMax: 4.2,
  yMin: -0.2,
  yMax: 2.4,
  xStep: 1,
  yStep: 0.5,
  xAxisLabel: "x",
  yAxisLabel: "y",
  curves: [{ kind: "squareRoot", xMin: 0, xMax: 4, label: "y = sqrt(x)" }],
  lines: [{ kind: "linear", m: 0.5, b: 0, xMin: 0, xMax: 4, label: "y = x/2" }],
  points: [
    { x: 0, y: 0, label: "(0, 0)" },
    { x: 4, y: 2, label: "(4, 2)" },
  ],
};

// ─── Lesson 1: Advanced Integration Method Selection ─────────────────────────

const methodSelectionLesson: Partial<ExplicitLesson> = {
  description:
    "Identify which integration technique to apply before computing: substitution, integration by parts, partial fractions, standard form, or trigonometric identities.",
  learningIntention:
    "Recognise the structure of an integrand and select the most efficient technique.",
  successCriteria: [
    "Identify when substitution is appropriate: a composite function where the derivative of the inner function is present.",
    "Identify when integration by parts applies: a product of different function families.",
    "Identify when partial fractions applies: a rational function with a factorable denominator.",
    "Distinguish standard-form integrals from those requiring a technique.",
  ],
  teaching: {
    paragraphs: [
      "Before computing, examine the integrand's structure. Choosing the wrong technique wastes time; choosing the right one often makes the integral straightforward.",
      "Substitution suits composite functions where the derivative of the inner function also appears: ∫f(g(x))g'(x)dx. Set u = g(x).",
      "Integration by parts suits products of different function families such as polynomial × exponential or polynomial × trigonometric. LIATE helps choose u: Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential.",
      "Partial fractions suits rational functions where the denominator factors into distinct linear or quadratic factors. Decompose first, then integrate each term.",
      "Trigonometric identities transform powers of sin or cos before integrating: sin²(x) = (1 − cos(2x))/2 and cos²(x) = (1 + cos(2x))/2 reduce powers to integrable terms.",
    ],
    latexBlocks: [
      "\\text{Substitution: }\\int f(g(x))\\,g'(x)\\,dx,\\quad u=g(x)",
      "\\text{By parts: }\\int u\\,dv = uv - \\int v\\,du\\quad (\\text{LIATE})",
      "\\frac{1}{(x+a)(x+b)}=\\frac{A}{x+a}+\\frac{B}{x+b}",
      "\\sin^2 x=\\frac{1-\\cos 2x}{2},\\quad \\cos^2 x=\\frac{1+\\cos 2x}{2}",
    ],
  },
  workedExamples: [
    {
      title: "Product of polynomial and exponential — integration by parts",
      questionLatex: "\\int x e^x \\,dx",
      steps: [
        {
          explanation:
            "The integrand is a product of a polynomial (x) and an exponential (eˣ). LIATE places Algebraic before Exponential, so choose u = x and dv = eˣ dx.",
          latex: "u=x,\\quad dv=e^x\\,dx,\\quad du=dx,\\quad v=e^x",
        },
        {
          explanation: "Apply ∫u dv = uv − ∫v du.",
          latex: "xe^x-\\int e^x\\,dx=xe^x-e^x+C",
        },
      ],
      finalAnswerLatex: "e^x(x-1)+C",
    },
    {
      title: "Rational function with linear factors — partial fractions",
      questionLatex: "\\int \\frac{1}{(x+1)(x-2)}\\,dx",
      steps: [
        {
          explanation:
            "Two distinct linear factors in the denominator call for partial fractions.",
          latex:
            "\\frac{1}{(x+1)(x-2)}=\\frac{A}{x+1}+\\frac{B}{x-2}",
        },
        {
          explanation:
            "Cover-up: at x = 2, B = 1/(2+1) = 1/3. At x = −1, A = 1/(−1−2) = −1/3.",
          latex: "A=-\\tfrac{1}{3},\\quad B=\\tfrac{1}{3}",
        },
        {
          explanation: "Integrate each term separately.",
          latex:
            "-\\tfrac{1}{3}\\ln|x+1|+\\tfrac{1}{3}\\ln|x-2|+C",
        },
      ],
      finalAnswerLatex:
        "\\tfrac{1}{3}\\ln\\left|\\tfrac{x-2}{x+1}\\right|+C",
    },
    {
      title: "Numerator is derivative of denominator — substitution",
      questionLatex: "\\int \\frac{2x}{x^2+1}\\,dx",
      steps: [
        {
          explanation:
            "The numerator 2x is the derivative of x²+1. Set u = x²+1 so du = 2x dx.",
          latex: "u=x^2+1,\\quad du=2x\\,dx",
        },
        {
          explanation: "Substitute and integrate.",
          latex: "\\int\\frac{du}{u}=\\ln|u|+C",
        },
        {
          explanation: "Substitute back.",
          latex: "\\ln(x^2+1)+C",
        },
      ],
      finalAnswerLatex: "\\ln(x^2+1)+C",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-meth-g1",
      "Which method best applies to $\\int x\\cos(x)\\,dx$?",
      "A",
      [
        "Integration by parts",
        "Substitution",
        "Partial fractions",
        "Standard form",
      ],
      "x cos(x) is a product of a polynomial and a trigonometric function. LIATE places Algebraic before Trigonometric, so choose u = x and apply integration by parts.",
      "Look for a product of two different function families."
    ),
    calcTyped(
      "y12e2-meth-g2",
      "For $\\int \\frac{1}{(x-1)(x+3)}\\,dx$, name the best method.",
      "",
      "partial fractions",
      ["Partial fractions"],
      "The denominator has two distinct linear factors, so decompose into partial fractions A/(x-1) + B/(x+3) before integrating.",
      "Factor the denominator and check for linear factors."
    ),
    calcTyped(
      "y12e2-meth-g3",
      "For $\\int \\frac{4x}{x^2+4}\\,dx$, name the best method.",
      "",
      "substitution",
      ["Substitution"],
      "4x is twice the derivative of x^2+4. With u = x^2+4 and du = 2x dx, the integral becomes 2 times the integral of du/u.",
      "Check whether the numerator is proportional to the derivative of the denominator."
    ),
    calcTyped(
      "y12e2-meth-g4",
      "For $\\int \\sin^2(x)\\,dx$, name the best method.",
      "",
      "trigonometric identity",
      ["Trig identity", "trig identity", "Trigonometric identity"],
      "Apply sin^2(x) = (1 - cos(2x))/2 to reduce the power, then integrate each term as a standard form.",
      "A power of a single trig function calls for a half-angle identity."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-meth-i1",
      "For $\\int x^3 e^x\\,dx$, name the best method.",
      "",
      "integration by parts",
      ["Integration by parts", "repeated integration by parts"],
      "A cubic polynomial times an exponential is a by-parts structure. Repeated integration by parts reduces x^3 step by step until only a constant remains.",
      "Identify the two function families in the product."
    ),
    calcTyped(
      "y12e2-meth-i2",
      "For $\\int \\cos(x^2)\\cdot 2x\\,dx$, name the best method.",
      "",
      "substitution",
      ["Substitution"],
      "2x is the derivative of x^2, so substitution u = x^2 converts this to the integral of cos(u) du, which is sin(u) + C.",
      "Check whether a factor of the integrand is the derivative of an inner function."
    ),
    calcTyped(
      "y12e2-meth-i3",
      "For $\\int \\frac{1}{x^2-9}\\,dx$, name the best method.",
      "",
      "partial fractions",
      ["Partial fractions"],
      "x^2 - 9 factors as (x - 3)(x + 3), so the denominator has two distinct linear factors and partial fractions apply: A/(x-3) + B/(x+3).",
      "Factor the denominator first."
    ),
    calcTyped(
      "y12e2-meth-i4",
      "For $\\int x\\ln(x)\\,dx$ by parts, which factor should be $u$ by LIATE?",
      "\\int x\\ln(x)\\,dx,\\quad u=\\,?",
      "ln(x)",
      ["ln x", "\\ln(x)"],
      "LIATE places Logarithm before Algebraic. Choosing u = ln(x) means du = (1/x)dx, which removes the logarithm from the remaining integral.",
      "Apply LIATE: Logarithm appears before Algebraic."
    ),
    calcTyped(
      "y12e2-meth-i5",
      "For $\\int \\cos^4(x)\\,dx$, name the best method.",
      "",
      "trigonometric identity",
      ["Trig identity", "trig identity", "Trigonometric identity"],
      "Repeated use of cos^2(x) = (1 + cos(2x))/2 reduces cos^4(x) to lower powers and standard trigonometric terms that can then be integrated.",
      "A power of cos greater than 1 requires the half-angle identity."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Choosing integration by parts for every product.",
      fix: "If the numerator is proportional to the derivative of the denominator, substitution is simpler and sufficient.",
    },
    {
      mistake:
        "Applying partial fractions when the numerator degree is not less than the denominator degree.",
      fix: "Perform polynomial long division first to reduce the rational function to proper form.",
    },
    {
      mistake: "Forgetting LIATE when choosing u for integration by parts.",
      fix: "LIATE order prevents circular loops: Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential.",
    },
    {
      mistake: "Integrating sin^2(x) or cos^2(x) without first applying the half-angle identity.",
      fix: "Always reduce powers of sin or cos using the identity before integrating.",
    },
  ],
  masteryQuiz: [
    calcTyped(
      "y12e2-meth-m1",
      "For $\\int x^3 e^x\\,dx$, name the best method.",
      "",
      "integration by parts",
      ["Integration by parts", "repeated integration by parts"],
      "A polynomial times an exponential is a by-parts structure. Here x^3 has degree 3, so repeated integration by parts is the efficient method.",
      "Count the degree of the polynomial. That tells you how many by-parts rounds are needed before it disappears."
    ),
    calcTyped(
      "y12e2-meth-m2",
      "For $\\int \\frac{1}{(x-1)(x+2)}\\,dx$, name the best method.",
      "",
      "partial fractions",
      ["Partial fractions"],
      "Two distinct linear factors in the denominator point to partial fractions, using A/(x-1) + B/(x+2).",
      "Factor the denominator and check for linear pieces."
    ),
    calcTyped(
      "y12e2-meth-m3",
      "For $\\int x\\sin(x)\\,dx$ by parts, which factor should be $u$ by LIATE?",
      "\\int x\\sin(x)\\,dx,\\quad u=\\,?",
      "x",
      [],
      "LIATE: Algebraic (x) before Trigonometric (sin(x)), so u = x. Differentiating x gives 1, removing the polynomial factor after one step.",
      "Apply LIATE to select the correct u."
    ),
    calcTyped(
      "y12e2-meth-m4",
      "For $\\int \\cos^2(x)\\,dx$, name the best method.",
      "",
      "trigonometric identity",
      ["Trig identity", "trig identity", "Trigonometric identity"],
      "Apply cos^2(x) = (1 + cos(2x))/2, then integrate each term: x/2 + sin(2x)/4 + C.",
      "Recognise a power of a single trig function."
    ),
    calcChoice(
      "y12e2-meth-m5",
      "Which integral is most efficiently evaluated with the substitution $u = x^2+1$?",
      "A",
      [
        "$\\int 2x(x^2+1)^5\\,dx$",
        "$\\int x^2(x+1)^5\\,dx$",
        "$\\int \\frac{1}{x^2}\\,dx$",
        "$\\int e^x(x^2+1)\\,dx$",
      ],
      "2x is exactly the derivative of x^2+1, so u = x^2+1 converts the integral to the simple power form integral of u^5 du.",
      "The substitution works when a factor equals the derivative of the inner expression."
    ),
    calcTyped(
      "y12e2-meth-m6",
      "For $\\int 2x e^{x^2}\\,dx$, write the substitution that simplifies the integral.",
      "\\int 2x e^{x^2}\\,dx,\\quad u=\\,?",
      "x^2",
      ["x²"],
      "With $u = x^2$, $du = 2x\\,dx$. The integral becomes $\\int e^u\\,du = e^u + C$, so substituting back gives $e^{x^2} + C$.",
      "Look for a factor proportional to the derivative of the exponent."
    ),
    calcTyped(
      "y12e2-meth-m7",
      "For $\\int \\frac{x+1}{x^2+2x+3}\\,dx$, name the best method.",
      "",
      "substitution",
      ["Substitution"],
      "The derivative of x^2+2x+3 is 2x+2 = 2(x+1), so the numerator x+1 is half the derivative. With u = x^2+2x+3, the integral becomes one-half times the integral of du/u = (1/2)ln|u| + C.",
      "Compare the numerator with the derivative of the denominator."
    ),
    calcChoice(
      "y12e2-meth-m8",
      "Which integral does NOT require integration by parts?",
      "B",
      [
        "$\\int x e^x\\,dx$",
        "$\\int \\frac{x}{x^2+1}\\,dx$",
        "$\\int x\\sin(x)\\,dx$",
        "$\\int x^2\\cos(x)\\,dx$",
      ],
      "In the integral x/(x^2+1) dx, the numerator x is proportional to the derivative of x^2+1, which is 2x. So substitution u = x^2+1 is simpler than by parts.",
      "Substitution works when the numerator is the derivative of the denominator."
    ),
    calcTyped(
      "y12e2-meth-m9",
      "For $\\int \\cos(5x)\\,dx = \\frac{\\sin(5x)}{k}+C$, find $k$.",
      "\\int \\cos(5x)\\,dx=\\frac{\\sin(5x)}{k}+C",
      "5",
      [],
      "Integrating cos(5x) is a standard form: the result is sin(5x) divided by the coefficient of x, which is 5. So k = 5.",
      "For the integral of cos(ax) dx, divide the result sin(ax) by a."
    ),
    calcChoice(
      "y12e2-meth-m10",
      "Which method best applies to $\\int \\frac{x^2}{x^3+1}\\,dx$?",
      "C",
      [
        "Integration by parts",
        "Partial fractions",
        "Substitution",
        "Standard form",
      ],
      "The derivative of x^3+1 is 3x^2, so x^2 is one-third of that derivative. With u = x^3+1, the integral becomes one-third times the integral of du/u = (1/3)ln|u| + C.",
      "Compare the numerator with the derivative of the denominator."
    ),
  ],
  masteryQuizPool: [
    { ...calcChoice("y12e2-calc-ms-pool-1", "Which integral is best evaluated by recognising that the numerator is the derivative of the denominator?", "B", ["∫ x² dx", "∫ 2x/(x²+1) dx", "∫ sin x dx", "∫ eˣ dx"], "2x is the derivative of x²+1, so ∫ 2x/(x²+1) dx = ln(x²+1) + C — the f′/f pattern."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-ms-pool-2", "Recognising the f′/f pattern, ∫ 2x/(x²+1) dx = ln(x²+1) + C. Evaluate the definite integral from 0 to 1.", "\\int_0^1 \\frac{2x}{x^2+1}\\,dx", "ln 2", ["ln2", "\\ln 2", "0.693"], "[ln(x²+1)]₀¹ = ln 2 − ln 1 = ln 2."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-ms-pool-3", "Recognising a hidden substitution u = x²+1 (du = 2x dx): ∫ x√(x²+1) dx = ½∫√u du. Evaluate the integral of x√(x²+1) from x = 0 to x = √3.", "\\int_0^{\\sqrt3} x\\sqrt{x^2+1}\\,dx,\\quad u = x^2+1", "7/3", ["2.333"], "u: 1→4. ½∫₁⁴ √u du = ½·⅔[u^{3/2}]₁⁴ = ⅓(8 − 1) = 7/3."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-ms-pool-4", "Recognising a product that needs integration by parts: ∫ x eˣ dx = (x − 1)eˣ + C. Evaluate ∫₀¹ x eˣ dx.", "\\int_0^1 x e^x\\,dx", "1", [], "[(x − 1)eˣ]₀¹ = (0) − (−1) = 1."), difficulty: 3 },
    { ...calcChoice("y12e2-calc-ms-pool-5", "A student tries the substitution u = x²+1 on ∫ 1/(x²+1) dx. Why does it fail?", "A", ["The integrand has no x factor to match du = 2x dx, so substitution does not apply — this is an arctan integral.", "Because x²+1 is always positive.", "Because the integral diverges.", "Because substitution never works on fractions."], "Substitution needs a factor matching du = 2x dx. There is none, so ∫ 1/(x²+1) dx = arctan x + C instead."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-ms-pool-6", "Recognising that ∫ 1/(x²−4) dx needs partial fractions: 1/((x−2)(x+2)) = (1/A)[1/(x−2) − 1/(x+2)]. Find A.", "\\frac{1}{(x-2)(x+2)} = \\frac{1}{A}\\left(\\frac{1}{x-2}-\\frac{1}{x+2}\\right)", "4", [], "1/(x−2) − 1/(x+2) = 4/((x−2)(x+2)), so the fraction equals ¼ of that bracket and A = 4."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-ms-pool-7", "Recognising the power-reduction identity sin²x = (1 − cos 2x)/2. Evaluate the integral of sin²x from 0 to π/2.", "\\int_0^{\\pi/2} \\sin^2 x\\,dx", "π/4", ["pi/4", "\\pi/4", "0.785"], "∫₀^(π/2) (1 − cos 2x)/2 dx = ½[x − ½sin 2x]₀^(π/2) = ½(π/2) = π/4."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-ms-pool-8", "Recognising that ∫ 1/(x²+2x+5) dx needs completing the square: x²+2x+5 = (x+1)² + a². Find a.", "x^2+2x+5 = (x+1)^2 + a^2", "2", [], "x²+2x+5 = (x+1)² + 4 = (x+1)² + 2², so a = 2; the integral becomes ½·arctan((x+1)/2) + C."), difficulty: 4 },
    { ...calcChoice("y12e2-calc-ms-pool-9", "Which is the correct antiderivative of 1/(x²+1)?", "B", ["ln(x²+1)/(2x)", "arctan x", "ln(x²+1)", "1/(x³/3 + x)"], "1/(x²+1) integrates to arctan x. You cannot integrate it by dividing by the derivative of the denominator — a common method-selection error."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-ms-pool-10", "Recognising integration by parts applied to a single logarithm: ∫ ln x dx = x ln x − x + C. Evaluate the integral of ln x from 1 to e.", "\\int_1^e \\ln x\\,dx", "1", [], "[x ln x − x]₁^e = (e − e) − (0 − 1) = 1."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-ms-pool-11", "Recognising a partial-fraction decomposition: (3x+5)/((x+1)(x+2)) = A/(x+1) + B/(x+2). Find A using the cover-up at x = −1.", "\\frac{3x+5}{(x+1)(x+2)} = \\frac{A}{x+1}+\\frac{B}{x+2}", "2", [], "Cover-up at x = −1: A = (3(−1)+5)/((−1)+2) = 2/1 = 2."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-ms-pool-12", "Recognising odd symmetry: for ∫₋₁¹ x³ cos x dx the integrand is odd over a symmetric interval. State the value of the integral.", "\\int_{-1}^{1} x^3 \\cos x\\,dx", "0", [], "x³ cos x is odd (odd × even), so its integral over the symmetric interval [−1, 1] is 0 — recognising the symmetry avoids any antidifferentiation."), difficulty: 5 },
  ],
};

// ─── Lesson 2: Integration by Parts Extension ────────────────────────────────

const integrationByPartsLesson: Partial<ExplicitLesson> = {
  description:
    "Extend integration by parts to repeated applications, logarithmic integrands, and definite integrals with exact answers.",
  learningIntention:
    "Apply ∫u dv = uv − ∫v du to multi-step products, ∫ln(x)dx, and definite integrals.",
  successCriteria: [
    "Apply integration by parts using LIATE to choose u correctly.",
    "Perform repeated by-parts steps for polynomial × exponential products.",
    "Integrate ∫ln(x)dx and ∫x·ln(x)dx by treating 1 or x as dv.",
    "Evaluate definite integrals using by parts, applying limits after completing all algebra.",
  ],
  teaching: {
    paragraphs: [
      "The by-parts formula ∫u dv = uv − ∫v du transfers difficulty from one integral to another. The new integral ∫v du must be simpler than the original.",
      "LIATE orders the choice of u: Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential. The remaining factor becomes dv.",
      "When a polynomial of degree n multiplies an exponential or trig function, apply by parts n times. Each application reduces the polynomial degree by 1.",
      "For ∫ln(x)dx, write ln(x)·1 and set u = ln(x), dv = dx. Then du = (1/x)dx and v = x, leaving ∫x·(1/x)dx = ∫1 dx, which is immediate.",
      "For definite integrals, complete all by-parts steps symbolically first, then substitute limits: ∫ₐᵇ u dv = [uv]ₐᵇ − ∫ₐᵇ v du.",
    ],
    latexBlocks: [
      "\\int u\\,dv = uv - \\int v\\,du",
      "\\text{LIATE: Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential}",
      "\\int \\ln(x)\\,dx = x\\ln(x)-x+C",
      "\\int_a^b u\\,dv = \\bigl[uv\\bigr]_a^b - \\int_a^b v\\,du",
    ],
  },
  workedExamples: [
    {
      title: "Repeated integration by parts for x²eˣ",
      questionLatex: "\\int x^2 e^x\\,dx",
      steps: [
        {
          explanation:
            "First application: u = x², dv = eˣ dx. So du = 2x dx and v = eˣ.",
          latex: "x^2 e^x - \\int 2x e^x\\,dx",
        },
        {
          explanation:
            "Second application on ∫2xeˣ dx: u = 2x, dv = eˣ dx, v = eˣ.",
          latex: "x^2 e^x - \\bigl(2xe^x - \\int 2e^x\\,dx\\bigr)",
        },
        {
          explanation: "Integrate the remaining standard form and simplify.",
          latex: "x^2 e^x - 2xe^x + 2e^x + C",
        },
      ],
      finalAnswerLatex: "e^x(x^2-2x+2)+C",
    },
    {
      title: "Integrating ln(x) by parts",
      questionLatex: "\\int \\ln(x)\\,dx",
      steps: [
        {
          explanation:
            "Write ln(x)·1. Set u = ln(x) and dv = dx, so du = (1/x)dx and v = x.",
          latex: "x\\ln(x)-\\int x\\cdot\\frac{1}{x}\\,dx",
        },
        {
          explanation: "The remaining integral simplifies to ∫1 dx = x.",
          latex: "x\\ln(x)-x+C",
        },
      ],
      finalAnswerLatex: "x\\ln(x)-x+C",
    },
    {
      title: "Definite by-parts integral",
      questionLatex: "\\int_0^1 x e^x\\,dx",
      steps: [
        {
          explanation:
            "Apply by parts with u = x, dv = eˣ dx, giving v = eˣ.",
          latex: "\\bigl[xe^x\\bigr]_0^1 - \\int_0^1 e^x\\,dx",
        },
        {
          explanation: "Evaluate the first term at the limits.",
          latex: "(1\\cdot e - 0) - \\bigl[e^x\\bigr]_0^1",
        },
        {
          explanation: "Substitute limits into the second term and simplify.",
          latex: "e-(e-1)=1",
        },
      ],
      finalAnswerLatex: "1",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-ibp-g1",
      "For $\\int x e^x\\,dx$, which choice of $u$ is correct by LIATE?",
      "A",
      ["$u=x$", "$u=e^x$", "$u=xe^x$", "$u=1$"],
      "LIATE places Algebraic (x) before Exponential (eˣ), so u = x and dv = eˣ dx. Differentiating x gives 1, which simplifies the next integral.",
      "Apply LIATE: choose the factor that appears earlier in the list."
    ),
    calcTyped(
      "y12e2-ibp-g2",
      "In $\\int \\ln(x)\\,dx$ by parts with $u = \\ln(x)$ and $dv = dx$, what is $v$?",
      "\\int \\ln(x)\\,dx:\\quad u=\\ln(x),\\; dv=dx,\\; v=\\,?",
      "x",
      [],
      "Integrating dv = dx gives v = x. The formula then gives x·ln(x) − ∫x·(1/x)dx = x·ln(x) − x + C.",
      "Integrate dv = dx to find v."
    ),
    calcTyped(
      "y12e2-ibp-g3",
      "Evaluate $\\int_0^1 x e^x\\,dx$ exactly.",
      "\\int_0^1 x e^x\\,dx",
      "1",
      [],
      "By parts with u = x, v = eˣ: [xeˣ]₀¹ − [eˣ]₀¹ = (e − 0) − (e − 1) = 1.",
      "Apply the by-parts formula, then substitute the limits 1 and 0."
    ),
    calcChoice(
      "y12e2-ibp-g4",
      "After one application of by parts to $\\int x^2 e^x\\,dx$, the remaining integral is:",
      "A",
      [
        "$\\int 2xe^x\\,dx$",
        "$\\int x^2 e^x\\,dx$",
        "$\\int e^x\\,dx$",
        "$\\int 2e^x\\,dx$",
      ],
      "With u = x² and v = eˣ, the formula gives x²eˣ − ∫2xeˣ dx. The remaining integral is ∫2xeˣ dx.",
      "Apply uv − ∫v du and identify what integral remains."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-ibp-i1",
      "For $\\int x\\sin(x)\\,dx$ by parts with $u = x$, $dv = \\sin(x)\\,dx$, find $v$.",
      "\\int x\\sin(x)\\,dx:\\quad u=x,\\; dv=\\sin(x)\\,dx,\\; v=\\,?",
      "-cos(x)",
      ["-cos x", "-\\cos(x)"],
      "Integrating sin(x)dx gives v = −cos(x). The formula gives −x·cos(x) + ∫cos(x)dx = −x·cos(x) + sin(x) + C.",
      "Integrate dv = sin(x)dx to find v."
    ),
    calcTyped(
      "y12e2-ibp-i2",
      "Evaluate $\\int_0^{\\pi/2} x\\cos(x)\\,dx$ exactly.",
      "\\int_0^{\\pi/2} x\\cos(x)\\,dx",
      "pi/2 - 1",
      ["π/2 - 1", "(pi-2)/2", "(π-2)/2"],
      "By parts with u = x, v = sin(x): [x·sin(x)]₀^(π/2) + [cos(x)]₀^(π/2) = π/2 + cos(π/2) − cos(0) = π/2 + 0 − 1 = π/2 − 1.",
      "Apply by parts, then substitute the limits π/2 and 0."
    ),
    calcChoice(
      "y12e2-ibp-i3",
      "How many applications of integration by parts are needed to evaluate $\\int x^3 e^x\\,dx$?",
      "B",
      ["2", "3", "4", "1"],
      "Each application reduces the polynomial degree by 1. Starting at degree 3 (x³) requires three applications.",
      "The number of applications equals the degree of the polynomial factor."
    ),
    calcTyped(
      "y12e2-ibp-i4",
      "For $\\int x\\ln(x)\\,dx$ by parts with $u = \\ln(x)$, $dv = x\\,dx$, find $v$.",
      "\\int x\\ln(x)\\,dx:\\quad u=\\ln(x),\\; dv=x\\,dx,\\; v=\\,?",
      "x^2/2",
      ["x²/2", "x^2 / 2", "(x^2)/2"],
      "Integrating x dx gives v = x²/2. The formula gives (x²/2)·ln(x) − ∫(x²/2)·(1/x)dx = (x²/2)·ln(x) − x²/4 + C.",
      "Integrate dv = x dx to find v."
    ),
    calcTyped(
      "y12e2-ibp-i5",
      "Evaluate $\\int_1^e \\ln(x)\\,dx$ exactly.",
      "\\int_1^e \\ln(x)\\,dx",
      "1",
      [],
      "Using x·ln(x) − x + C: at x=e, e·1 − e = 0; at x=1, 1·0 − 1 = −1. Result: 0 − (−1) = 1.",
      "Use ∫ln(x)dx = x·ln(x) − x + C, then substitute the limits e and 1."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Choosing u = eˣ over u = polynomial.",
      fix: "LIATE: Algebraic comes before Exponential. Choosing u = eˣ does not reduce the polynomial in the next step.",
    },
    {
      mistake:
        "Dropping the coefficient when repeating by parts.",
      fix: "After one step the remaining integral may carry a coefficient (e.g. ∫2xeˣ dx). Carry that coefficient into the next application.",
    },
    {
      mistake: "Substituting limits before all by-parts steps are complete.",
      fix: "Complete all algebraic integration steps first, then substitute the limits at the very end.",
    },
    {
      mistake: "Omitting +C in indefinite integrals.",
      fix: "Always add the constant of integration after evaluating the final standard-form integral.",
    },
  ],
  masteryQuiz: [
    calcChoice(
      "y12e2-ibp-m1",
      "By LIATE, for $\\int x^2\\cos(x)\\,dx$, what should $u$ be?",
      "A",
      ["$u=x^2$", "$u=\\cos(x)$", "$u=x^2\\cos(x)$", "$u=\\sin(x)$"],
      "LIATE: Algebraic (x²) before Trigonometric (cos(x)), so u = x². Two by-parts applications are needed.",
      "Apply LIATE to choose u."
    ),
    calcTyped(
      "y12e2-ibp-m2",
      "For $\\int x^2 e^x\\,dx = e^x(x^2+ax+b)+C$, find $a$.",
      "\\int x^2 e^x\\,dx = e^x(x^2+ax+b)+C",
      "-2",
      ["−2"],
      "Repeated by parts gives x²eˣ − 2xeˣ + 2eˣ + C = eˣ(x²−2x+2)+C. Comparing, a = −2.",
      "Carry out repeated by parts and read off the coefficient of x in the bracket."
    ),
    calcTyped(
      "y12e2-ibp-m3",
      "Evaluate $\\int_0^1 x^2 e^x\\,dx$ exactly.",
      "\\int_0^1 x^2 e^x\\,dx",
      "e-2",
      ["e - 2"],
      "Using eˣ(x²−2x+2)+C: at x=1, e(1−2+2) = e; at x=0, 1·(0−0+2) = 2. Result: e − 2.",
      "Evaluate [eˣ(x²−2x+2)]₀¹."
    ),
    calcChoice(
      "y12e2-ibp-m4",
      "For $\\int e^x\\cos(x)\\,dx$, which approach gives the antiderivative?",
      "A",
      [
        "Apply by parts twice, then solve the resulting equation for the integral",
        "Use the substitution $u=e^x$",
        "Apply partial fractions to the integrand",
        "Use the identity $\\cos(x)=(e^{ix}+e^{-ix})/2$",
      ],
      "Two applications return ∫eˣcos(x)dx on the right side, giving an equation 2∫eˣcos(x)dx = eˣ(sin(x)+cos(x)) + C. Solve for the integral.",
      "Recognise that two by-parts steps create a solvable equation."
    ),
    calcTyped(
      "y12e2-ibp-m5",
      "In $\\int x\\ln(x)\\,dx = \\frac{x^2}{2}\\ln(x)-\\frac{x^2}{4}+C$, what is the coefficient of $x^2\\ln(x)$?",
      "\\int x\\ln(x)\\,dx = \\frac{x^2}{2}\\ln(x)-\\frac{x^2}{4}+C",
      "1/2",
      ["0.5"],
      "The antiderivative is (x²/2)ln(x) − x²/4 + C. The coefficient of x²ln(x) is 1/2.",
      "Read the coefficient of x²ln(x) directly from the antiderivative."
    ),
    calcTyped(
      "y12e2-ibp-m6",
      "Evaluate $\\int_1^e x\\ln(x)\\,dx$ exactly.",
      "\\int_1^e x\\ln(x)\\,dx",
      "(e^2+1)/4",
      ["(e^2 + 1)/4", "(e²+1)/4"],
      "Using (x²/2)ln(x) − x²/4: at x=e, e²/2 − e²/4 = e²/4; at x=1, 0 − 1/4 = −1/4. Result: e²/4 − (−1/4) = (e²+1)/4.",
      "Evaluate [(x²/2)ln(x) − x²/4]₁ᵉ."
    ),
    calcChoice(
      "y12e2-ibp-m7",
      "How many by-parts applications are needed for $\\int x^3 e^x\\,dx$?",
      "B",
      ["2", "3", "4", "1"],
      "x³ has degree 3; each application reduces the degree by 1, requiring exactly three applications.",
      "The degree of the polynomial determines the number of applications."
    ),
    calcTyped(
      "y12e2-ibp-m8",
      "Given $\\int e^x\\sin(x)\\,dx = \\frac{e^x}{2}(\\sin(x)-\\cos(x))+C$, evaluate $\\int_0^{\\pi} e^x\\sin(x)\\,dx$ exactly.",
      "\\int_0^{\\pi} e^x\\sin(x)\\,dx",
      "(e^pi+1)/2",
      ["(e^π+1)/2", "(e^pi + 1)/2"],
      "At x=π: (eπ/2)(0−(−1)) = eπ/2. At x=0: (1/2)(0−1) = −1/2. Result: eπ/2 − (−1/2) = (eπ+1)/2.",
      "Substitute the limits into (eˣ/2)(sin(x)−cos(x))."
    ),
    calcChoice(
      "y12e2-ibp-m9",
      "Why is $u = \\ln(x)$ chosen rather than $u = x$ for $\\int x\\ln(x)\\,dx$?",
      "A",
      [
        "Differentiating $\\ln(x)$ gives $1/x$, which removes the logarithm from the remaining integral",
        "Integrating $\\ln(x)$ is simpler than integrating $x$",
        "LIATE places Algebraic before Logarithm",
        "Both choices produce the same antiderivative",
      ],
      "Differentiating ln(x) gives 1/x, so the remaining integral ∫(x²/2)·(1/x)dx = ∫x/2 dx is a simple power form.",
      "Consider which choice makes the remaining ∫v du simpler."
    ),
    calcTyped(
      "y12e2-ibp-m10",
      "For $\\int x\\cos(2x)\\,dx$ by parts with $u=x$, $dv=\\cos(2x)\\,dx$, find $v$.",
      "\\int x\\cos(2x)\\,dx:\\quad u=x,\\; dv=\\cos(2x)\\,dx,\\; v=\\,?",
      "sin(2x)/2",
      ["(sin(2x))/2", "(1/2)sin(2x)", "\\frac{\\sin(2x)}{2}"],
      "∫cos(2x)dx = sin(2x)/2. The full result is x·sin(2x)/2 − ∫sin(2x)/2 dx = x·sin(2x)/2 + cos(2x)/4 + C.",
      "Integrate dv = cos(2x)dx using the standard form ∫cos(ax)dx = sin(ax)/a."
    ),
  ],
  masteryQuizPool: [
    { ...calcChoice("y12e2-calc-ibp-pool-1", "How many times must integration by parts be applied to evaluate ∫ x² eˣ dx?", "B", ["Once.", "Twice — each application lowers the power of x by one.", "Three times.", "It cannot be done by parts."], "Each application of parts (u = power of x) reduces the power by 1: x² → x → constant, so two applications are needed."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-ibp-pool-2", "Integration by parts twice gives ∫ x² eˣ dx = (x² − 2x + 2)eˣ + C. Evaluate this antiderivative at x = 0.", "(x^2 - 2x + 2)e^x", "2", [], "At x = 0: (0 − 0 + 2)·e⁰ = 2·1 = 2."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-ibp-pool-3", "By parts, ∫ x sin x dx = −x cos x + sin x + C. Evaluate the integral of x sin x from 0 to π.", "\\int_0^{\\pi} x\\sin x\\,dx = [-x\\cos x + \\sin x]_0^{\\pi}", "π", ["pi", "\\pi", "3.142"], "[−x cos x + sin x]₀^π = (−π·(−1) + 0) − (0 + 0) = π."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-ibp-pool-4", "Using ∫ x² eˣ dx = (x² − 2x + 2)eˣ + C, evaluate the integral of x² eˣ from 0 to 1.", "\\int_0^1 x^2 e^x\\,dx", "e - 2", ["e-2", "0.718"], "(1 − 2 + 2)e¹ − (0 − 0 + 2)e⁰ = e − 2."), difficulty: 3 },
    { ...calcChoice("y12e2-calc-ibp-pool-5", "For ∫ x eˣ dx a student chooses u = eˣ, dv = x dx. Why is this a poor choice?", "C", ["It is not allowed.", "Both factors must be differentiated.", "It makes the next integral ∫ (x²/2)eˣ dx harder, not simpler; choosing u = x makes du simpler.", "eˣ has no antiderivative."], "The point of parts is to make ∫ v du simpler. Choosing u = x (du = dx) lowers the polynomial; choosing u = eˣ raises the polynomial power instead."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-ibp-pool-6", "For I = ∫ eˣ sin x dx, applying parts twice gives I = eˣ sin x − eˣ cos x − I. Solving, I = (eˣ sin x − eˣ cos x)/d + C. Find d.", "I = e^x\\sin x - e^x\\cos x - I", "2", [], "I + I = eˣ sin x − eˣ cos x, so 2I = eˣ sin x − eˣ cos x and I = (eˣ sin x − eˣ cos x)/2; d = 2."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-ibp-pool-7", "By parts, ∫ x ln x dx = (x²/2)ln x − x²/4 + C. Evaluate this antiderivative at x = 1 (the lower-limit contribution).", "\\tfrac{x^2}{2}\\ln x - \\tfrac{x^2}{4}", "-1/4", ["−1/4", "-0.25"], "At x = 1: (1/2)·ln 1 − 1/4 = 0 − 1/4 = −1/4."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-ibp-pool-8", "Repeated parts give ∫ x² cos x dx = x² sin x + 2x cos x − 2 sin x + C. Evaluate this antiderivative at x = 0.", "x^2\\sin x + 2x\\cos x - 2\\sin x", "0", [], "At x = 0: 0·0 + 0·1 − 2·0 = 0."), difficulty: 4 },
    { ...calcChoice("y12e2-calc-ibp-pool-9", "Which integral requires integration by parts applied twice with a cyclic (self-referencing) argument?", "B", ["∫ 2x√(1+x²) dx", "∫ eˣ cos x dx", "∫ 1/x dx", "∫ x/(x²+1) dx"], "∫ eˣ cos x dx returns a multiple of itself after two applications of parts, giving a cyclic equation to solve for I. The others are substitution or standard forms."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-ibp-pool-10", "Reduction by parts: Iₙ = ∫₀¹ xⁿ eˣ dx satisfies Iₙ = e − n·Iₙ₋₁ (since [xⁿeˣ]₀¹ = e). Given I₀ = e − 1, find I₁.", "I_n = e - n\\,I_{n-1}", "1", [], "I₁ = e − 1·I₀ = e − (e − 1) = 1."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-ibp-pool-11", "For I = ∫ eˣ cos x dx, applying parts twice gives I = eˣ cos x + eˣ sin x − I, so I = (eˣ cos x + eˣ sin x)/d + C. Find d.", "I = e^x\\cos x + e^x\\sin x - I", "2", [], "2I = eˣ cos x + eˣ sin x, so I = (eˣ cos x + eˣ sin x)/2; d = 2."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-ibp-pool-12", "Before applying integration by parts to ∫₋₁¹ x³ dx, recognise the integrand is odd over the symmetric interval. State the value of the integral.", "\\int_{-1}^{1} x^3\\,dx", "0", [], "x³ is odd, so its integral over the symmetric interval [−1, 1] is 0 — no integration by parts is needed."), difficulty: 5 },
  ],
};

// ─── Lesson 3: Reduction Formulae Introduction ───────────────────────────────

const reductionFormulaeLesson: Partial<ExplicitLesson> = {
  description:
    "Use supplied reduction formulae to evaluate families of integrals recursively from base cases.",
  learningIntention:
    "Apply a given reduction formula Iₙ = f(n)·I_{n-1} or I_{n-2} to find successive values, starting from a supplied base case.",
  successCriteria: [
    "Identify which base case(s) are required to initialise a recurrence.",
    "Substitute a given n into a reduction formula to compute the next value.",
    "Evaluate several successive terms of a recurrence from supplied initial values.",
    "Use a reduction result to evaluate a definite integral exactly.",
  ],
  teaching: {
    paragraphs: [
      "A reduction formula expresses Iₙ in terms of lower-index values $I_{n-1}$ or $I_{n-2}$. Once a base case is known, successive values can be found by substitution.",
      "Reduction formulae are derived using integration by parts. In this lesson the formula is supplied; you focus on applying and iterating it correctly.",
      "Two standard families appear in Extension 2 HSC: Iₙ = ∫₀¹ xⁿeˣ dx satisfies $I_n = e − n·I_{n-1}$ with base case I₀ = e − 1. The sine-power family Iₙ = ∫ sinⁿ(x) dx from 0 to π/2 satisfies $I_n = ((n−1)/n)·I_{n-2}$ with I₀ = π/2 and I₁ = 1.",
      "For $I_n = ((n−1)/n)·I_{n-2}$, note that even-index and odd-index values form independent chains. Even values require I₀; odd values require I₁.",
    ],
    latexBlocks: [
      "I_n=\\int_0^1 x^n e^x\\,dx,\\quad I_n=e-n\\,I_{n-1},\\quad I_0=e-1",
      "I_n=\\int_0^{\\pi/2}\\sin^n(x)\\,dx,\\quad I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_0=\\frac{\\pi}{2},\\; I_1=1",
      "I_n=x^n e^x-n\\,I_{n-1}\\quad (\\text{indefinite, }I_0=e^x+C)",
    ],
  },
  workedExamples: [
    {
      title: "Apply the definite reduction formula for xⁿeˣ",
      questionLatex:
        "I_n=e-n\\,I_{n-1},\\; I_0=e-1.\\text{ Find }I_1\\text{ and }I_2.",
      steps: [
        {
          explanation: "Substitute n = 1 into the formula.",
          latex: "I_1=e-1\\cdot I_0=e-(e-1)=1",
        },
        {
          explanation: "Substitute n = 2, using the value I₁ = 1.",
          latex: "I_2=e-2\\cdot I_1=e-2\\cdot 1=e-2",
        },
      ],
      finalAnswerLatex: "I_1=1,\\quad I_2=e-2",
    },
    {
      title: "Apply the sine-power reduction formula",
      questionLatex:
        "I_n=\\frac{n-1}{n}\\,I_{n-2},\\; I_0=\\frac{\\pi}{2}.\\text{ Find }I_4.",
      steps: [
        {
          explanation: "Find I₂ first by substituting n = 2.",
          latex: "I_2=\\frac{1}{2}\\cdot I_0=\\frac{1}{2}\\cdot\\frac{\\pi}{2}=\\frac{\\pi}{4}",
        },
        {
          explanation: "Find I₄ by substituting n = 4 and using I₂.",
          latex: "I_4=\\frac{3}{4}\\cdot I_2=\\frac{3}{4}\\cdot\\frac{\\pi}{4}=\\frac{3\\pi}{16}",
        },
      ],
      finalAnswerLatex: "I_4=\\frac{3\\pi}{16}",
    },
    {
      title: "Use the indefinite reduction formula to find I₁",
      questionLatex:
        "I_n=x^n e^x-n\\,I_{n-1},\\; I_0=e^x+C.\\text{ Find }I_1.",
      steps: [
        {
          explanation: "Substitute n = 1 into the indefinite formula.",
          latex: "I_1=x e^x-1\\cdot(e^x+C)",
        },
        {
          explanation: "Simplify, absorbing C into the constant of integration.",
          latex: "I_1=xe^x-e^x+C=e^x(x-1)+C",
        },
      ],
      finalAnswerLatex: "I_1=e^x(x-1)+C",
    },
  ],
  guidedPractice: [
    calcTyped(
      "y12e2-red-g1",
      "Given $I_n = e - n\\,I_{n-1}$ with $I_0 = e-1$, find $I_1$.",
      "",
      "1",
      [],
      "Substitute n = 1: I₁ = e − 1·(e−1) = e − e + 1 = 1.",
      "Substitute n = 1 directly into the reduction formula."
    ),
    calcChoice(
      "y12e2-red-g2",
      "For $I_n = \\frac{n-1}{n}\\,I_{n-2}$, which base case do you need in order to begin finding $I_5$?",
      "B",
      [
        "$I_0$",
        "$I_1$",
        "$I_2$",
        "Both $I_0$ and $I_2$",
      ],
      "Odd-index terms chain backward by 2: I₅ depends on I₃, and I₃ depends on I₁. So I₁ is the base case needed to start the odd chain.",
      "Follow the parity: odd terms connect only to earlier odd terms."
    ),
    calcTyped(
      "y12e2-red-g3",
      "Given $I_n = \\frac{n-1}{n}\\,I_{n-2}$ with $I_0 = \\frac{\\pi}{2}$, find $I_2$.",
      "",
      "pi/4",
      ["π/4", "pi / 4"],
      "Substitute n = 2: I₂ = (1/2)·I₀ = (1/2)·(π/2) = π/4.",
      "Substitute n = 2 and the base case I₀ = π/2."
    ),
    calcChoice(
      "y12e2-red-g4",
      "In the formula $I_n = e - n\\,I_{n-1}$ where $I_n = \\int_0^1 x^n e^x\\,dx$, what is $I_0$?",
      "A",
      [
        "$e-1$, from $\\int_0^1 e^x\\,dx$",
        "$1$",
        "$e$",
        "$0$",
      ],
      "I₀ = ∫₀¹ x⁰·eˣ dx = ∫₀¹ eˣ dx = [eˣ]₀¹ = e − 1. This is the base case.",
      "Evaluate ∫₀¹ eˣ dx directly."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-red-i1",
      "Given $I_n=e-n\\,I_{n-1}$, $I_0=e-1$, $I_1=1$, $I_2=e-2$, find $I_3$.",
      "",
      "6-2e",
      ["6 - 2e", "-2e+6"],
      "Substitute n = 3: I₃ = e − 3·I₂ = e − 3(e−2) = e − 3e + 6 = 6 − 2e.",
      "Substitute n = 3 and I₂ = e − 2 into the formula."
    ),
    calcChoice(
      "y12e2-red-i2",
      "For $I_n=\\frac{n-1}{n}\\,I_{n-2}$ with $I_0=\\frac{\\pi}{2}$, which chain correctly reaches $I_6$?",
      "C",
      [
        "$I_6 \\to I_5 \\to I_4 \\to I_3$",
        "$I_6 \\to I_4 \\to I_1$",
        "$I_6 \\to I_4 \\to I_2 \\to I_0$",
        "$I_6 \\to I_3 \\to I_1$",
      ],
      "The recurrence lowers the index by 2 each time, so even terms stay on the even chain: I₆ depends on I₄, then I₂, then I₀.",
      "Reduction by 2 preserves parity."
    ),
    calcTyped(
      "y12e2-red-i3",
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$ with $I_1=1$, find $I_5$.",
      "",
      "8/15",
      [],
      "First I₃ = (2/3)·I₁ = 2/3. Then I₅ = (4/5)·I₃ = (4/5)·(2/3) = 8/15.",
      "Stay on the odd chain: find I₃ first, then use it to find I₅."
    ),
    calcTyped(
      "y12e2-red-i4",
      "Given $I_0=e^x+C$ and $I_n=x^n e^x-n\\,I_{n-1}$, in $I_2=e^x(x^2+ax+b)+C$, find $a$.",
      "",
      "-2",
      ["−2"],
      "I₁ = xeˣ − eˣ + C = eˣ(x−1)+C. Then I₂ = x²eˣ − 2·I₁ = x²eˣ − 2(xeˣ−eˣ+C) = eˣ(x²−2x+2)+C. So a = −2.",
      "Build I₁ from I₀ first, then compute I₂ = x²eˣ − 2·I₁."
    ),
    calcChoice(
      "y12e2-red-i5",
      "Why are derivations of reduction formulae shown as worked examples rather than marked questions?",
      "A",
      [
        "Derivations require 'show that' steps that cannot be auto-marked",
        "Derivations are too short to be useful practice",
        "Reduction formulae cannot be derived from integration by parts",
        "Derivations always produce the wrong base case",
      ],
      "Auto-marking cannot verify a 'prove' or 'show that' derivation. The formula is supplied so practice can focus on applying and iterating the recurrence.",
      "Consider what kind of answer a derivation produces."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the wrong base case for the recurrence.",
      fix: "Identify whether the formula chains through all indices or only odd/even indices. Use I₀ or I₁ as appropriate.",
    },
    {
      mistake: "Applying the formula in the upward direction.",
      fix: "A reduction formula always lowers n. Substitute the given n and use the already-computed lower-index value.",
    },
    {
      mistake: "Mixing odd and even chains for Iₙ = ((n−1)/n)·I_{n-2}.",
      fix: "Even-index values depend on I₀; odd-index values depend on I₁. Do not use I₂ to find I₃.",
    },
    {
      mistake: "Dropping +C when iterating the indefinite reduction formula.",
      fix: "Each Iₙ in the indefinite chain carries +C. Do not drop it when substituting one step into the next.",
    },
  ],
  masteryQuiz: [
    calcTyped(
      "y12e2-red-m1",
      "Given $I_n=e-n\\,I_{n-1}$, $I_3=6-2e$, find $I_4$.",
      "",
      "9e-24",
      ["9e - 24"],
      "I₄ = e − 4·I₃ = e − 4(6−2e) = e − 24 + 8e = 9e − 24.",
      "Substitute n = 4 and I₃ = 6 − 2e into the formula."
    ),
    calcTyped(
      "y12e2-red-m2",
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$ with $I_0=\\frac{\\pi}{2}$, find $I_8$.",
      "",
      "35pi/256",
      ["35π/256", "35*pi/256"],
      "Follow the even chain: I₂ = π/4, I₄ = 3π/16, I₆ = 5π/32, then I₈ = (7/8)·I₆ = (7/8)·(5π/32) = 35π/256.",
      "Work down the even chain step by step from I₀."
    ),
    calcChoice(
      "y12e2-red-m3",
      "A student wants to find $I_7$ using $I_n=\\frac{n-1}{n}\\,I_{n-2}$. Which supplied value lets them continue immediately with one substitution?",
      "B",
      [
        "$I_4$",
        "$I_5$",
        "$I_6$",
        "$I_0$",
      ],
      "To find I₇ directly, the recurrence needs I₅ because I₇ = (6/7)·I₅. Values from the even chain do not connect to I₇.",
      "The recurrence always uses $I_{n-2}$; for $I_7$ that means $I_5$."
    ),
    calcTyped(
      "y12e2-red-m4",
      "Given $I_0=e^x+C$ and $I_n=x^n e^x-n\\,I_{n-1}$, in $I_2=e^x(x^2+ax+b)+C$, find $b$.",
      "",
      "2",
      [],
      "I₂ = eˣ(x²−2x+2)+C, so b = 2. This comes from the constant term after two by-parts steps.",
      "Complete both by-parts steps and read off the constant term in the bracket."
    ),
    calcTyped(
      "y12e2-red-m5",
      "Given $I_2=e^x(x^2-2x+2)+C$, evaluate $\\int_0^1 x^2 e^x\\,dx$.",
      "",
      "e-2",
      ["e - 2"],
      "At x=1: e(1−2+2) = e. At x=0: 1·(0−0+2) = 2. Result: e − 2.",
      "Substitute x=1 and x=0 into eˣ(x²−2x+2) and subtract."
    ),
    calcTyped(
      "y12e2-red-m6",
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$ and $I_5=\\frac{8}{15}$, find $I_7$.",
      "I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_5=\\frac{8}{15}",
      "16/35",
      [],
      "I₇ = (6/7)·I₅ = (6/7)·(8/15) = 48/105 = 16/35.",
      "Substitute n = 7 and I₅ = 8/15 into the formula, then simplify."
    ),
    calcChoice(
      "y12e2-red-m7",
      "Which two base cases are needed to evaluate all $I_n$ from $I_n=\\frac{n-1}{n}\\,I_{n-2}$?",
      "A",
      [
        "$I_0=\\pi/2$ and $I_1=1$",
        "$I_0=\\pi/2$ and $I_2=\\pi/4$",
        "$I_1=1$ and $I_3=2/3$",
        "$I_0=\\pi/2$ only",
      ],
      "Even-index values chain through I₀, I₂, I₄, … and odd-index values chain through I₁, I₃, I₅, … Both I₀ and I₁ are required to evaluate any Iₙ.",
      "Trace which base case each parity chain requires."
    ),
    calcChoice(
      "y12e2-red-m8",
      "Which sequence correctly computes $I_8$ from the recurrence $I_n=\\frac{n-1}{n}\\,I_{n-2}$?",
      "D",
      [
        "$I_8 \\to I_7 \\to I_6 \\to I_5$",
        "$I_8 \\to I_6 \\to I_3 \\to I_1$",
        "$I_8 \\to I_5 \\to I_3 \\to I_1$",
        "$I_8 \\to I_6 \\to I_4 \\to I_2 \\to I_0$",
      ],
      "Each application lowers the index by 2, so the even chain for I₈ is I₈ → I₆ → I₄ → I₂ → I₀.",
      "A reduction by 2 keeps the index parity unchanged."
    ),
    calcChoice(
      "y12e2-red-m9",
      "A student uses $I_n=\\frac{n-1}{n}\\,I_{n-2}$ and $I_1=1$ to find $I_3$. Which step is correct?",
      "A",
      [
        "$I_3=\\frac{2}{3}\\cdot I_1=\\frac{2}{3}$",
        "$I_3=\\frac{3}{2}\\cdot I_1=\\frac{3}{2}$",
        "$I_3=\\frac{2}{3}\\cdot I_2$",
        "$I_3=\\frac{2}{3}\\cdot I_0$",
      ],
      "Substitute n = 3: I₃ = ((3−1)/3)·I₁ = (2/3)·I₁ = (2/3)·1 = 2/3. Option A is correct.",
      "Substitute n = 3 and use I_{n-2} = I₁."
    ),
    calcTyped(
      "y12e2-red-m10",
      "If $I_4=\\frac{3\\pi}{16}$ for $I_n=\\int_0^{\\pi/2}\\sin^n(x)\\,dx$, evaluate $\\int_0^{\\pi/2} \\left(1+\\sin^4 x\\right)dx$.",
      "",
      "11pi/16",
      ["11π/16", "11*pi/16"],
      "Split the integral: $\\int_0^{\\pi/2} 1\\,dx + \\int_0^{\\pi/2}\\sin^4 x\\,dx = \\pi/2 + I_4 = \\pi/2 + 3\\pi/16 = 11\\pi/16$.",
      "Use the supplied value of I₄ and add the area from the constant term separately."
    ),
  ],
  masteryQuizPool: [
    { ...calcChoice("y12e2-calc-red-pool-1", "A reduction formula expresses the integral Iₙ in terms of what?", "B", ["A higher-index integral such as Iₙ₊₂.", "A lower-index integral such as Iₙ₋₂ or Iₙ₋₁.", "The derivative of the integrand.", "A definite numerical constant only."], "A reduction formula relates Iₙ to a lower index (e.g. Iₙ₋₂), so repeated application drops to a known base integral."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-red-pool-2", "For Iₙ = ∫ sinⁿx dx from 0 to π/2, evaluate the base case I₀ (the integral of 1 from 0 to π/2).", "I_0 = \\int_0^{\\pi/2} 1\\,dx", "π/2", ["pi/2", "\\pi/2", "1.571"], "I₀ = ∫ 1 dx from 0 to π/2 = π/2."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-red-pool-3", "The reduction formula is Iₙ = ((n−1)/n)·Iₙ₋₂ with I₀ = π/2. Find I₂.", "I_n = \\tfrac{n-1}{n} I_{n-2}", "π/4", ["pi/4", "\\pi/4", "0.785"], "I₂ = (1/2)·I₀ = (1/2)(π/2) = π/4."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-red-pool-4", "Using Iₙ = ((n−1)/n)·Iₙ₋₂ with I₂ = π/4, find I₄.", "I_4 = \\tfrac{3}{4} I_2", "3π/16", ["3pi/16", "0.589"], "I₄ = (3/4)·I₂ = (3/4)(π/4) = 3π/16."), difficulty: 3 },
    { ...calcChoice("y12e2-calc-red-pool-5", "To evaluate I₅ using Iₙ = ((n−1)/n)·Iₙ₋₂, which base case is ultimately needed?", "B", ["I₀, because the chain always ends at I₀.", "I₁, because odd indices chain down to I₁ (5 → 3 → 1).", "I₂, halfway down.", "No base case is needed."], "The recurrence steps down by 2, so an odd index 5 → 3 → 1 ends at I₁, while even indices end at I₀."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-red-pool-6", "Evaluate the odd base case I₁ = ∫ sin x dx from 0 to π/2.", "I_1 = \\int_0^{\\pi/2} \\sin x\\,dx", "1", [], "[−cos x] from 0 to π/2 = 0 − (−1) = 1."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-red-pool-7", "Using I₅ = (4/5)·I₃ = (4/5)(2/3)·I₁ and I₁ = 1, find I₅.", "I_5 = \\tfrac{4}{5}\\cdot\\tfrac{2}{3}\\cdot I_1", "8/15", ["0.533"], "I₅ = (4/5)(2/3)(1) = 8/15."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-red-pool-8", "The reduction Iₙ = ((n−1)/n)·Iₙ₋₂ comes from integration by parts on ∫ sin x · sinⁿ⁻¹x dx; the factor (n−1) appears when differentiating sinⁿ⁻¹x. For n = 4, state the value of (n−1).", "I_n = \\tfrac{n-1}{n} I_{n-2}", "3", [], "For n = 4, n − 1 = 3 — the coefficient produced by differentiating sin³x in the by-parts step."), difficulty: 4 },
    { ...calcChoice("y12e2-calc-red-pool-9", "A student writes the reduction as Iₙ = ((n−1)/n)·Iₙ₋₁ (stepping down by one). Why is this wrong?", "C", ["The fraction should be n/(n−1).", "There is no base case.", "Integration by parts on ∫ sinⁿx dx produces sinⁿ⁻²x, so the index drops by TWO; the correct recurrence is Iₙ = ((n−1)/n)·Iₙ₋₂.", "Reduction formulae only work for even n."], "Parts turns one sin factor into a cos² = 1 − sin², lowering the power by 2. The recurrence therefore links Iₙ to Iₙ₋₂, not Iₙ₋₁."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-red-pool-10", "A different reduction: Iₙ = ∫ xⁿ eˣ dx from 0 to 1 satisfies Iₙ = e − n·Iₙ₋₁, with I₀ = e − 1. Find I₂.", "I_n = e - n\\,I_{n-1}", "e - 2", ["e-2", "0.718"], "I₁ = e − 1·I₀ = e − (e − 1) = 1; then I₂ = e − 2·I₁ = e − 2."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-red-pool-11", "For Iₙ = ∫ sinⁿx dx from 0 to π/2, the recurrence gives the ratio I₄/I₂. Using Iₙ = ((n−1)/n)·Iₙ₋₂, state this ratio.", "\\frac{I_4}{I_2} = \\frac{n-1}{n}\\big|_{n=4}", "3/4", ["0.75"], "I₄ = (3/4)·I₂, so I₄/I₂ = 3/4 (the recurrence factor at n = 4)."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-red-pool-12", "Wallis pattern: I₆ = (5/6)(3/4)(1/2)·I₀ with I₀ = π/2. Compute I₆ (give it as a multiple of π).", "I_6 = \\tfrac{5}{6}\\cdot\\tfrac{3}{4}\\cdot\\tfrac{1}{2}\\cdot I_0", "5π/32", ["5pi/32", "0.491"], "I₆ = (5/6)(3/4)(1/2)(π/2) = (5/16)(π/2) = 5π/32."), difficulty: 5 },
  ],
};

// ─── Lesson 4: Partial Fractions Integration ──────────────────────────────────

const partialFractionsLesson: Partial<ExplicitLesson> = {
  description:
    "Decompose proper rational functions into partial fractions over distinct or repeated linear factors, then integrate each term to produce logarithmic or power expressions.",
  learningIntention:
    "Apply partial fraction decomposition to integrate rational functions with linear denominators.",
  successCriteria: [
    "Identify whether a rational function has distinct or repeated linear factors.",
    "Use the cover-up rule or simultaneous equations to find numerator constants.",
    "Integrate each partial fraction term as A·ln|x−a| or $A/(x−a)^k$.",
    "Combine constants of integration correctly.",
  ],
  teaching: {
    paragraphs: [
      "Partial fractions split a rational function P(x)/Q(x) into a sum of simpler fractions whose denominators are the factors of Q(x). This makes integration straightforward.",
      "For distinct linear factors: A/(x−a) + B/(x−b). The cover-up rule finds A by setting x = a and covering the (x−a) factor; similarly for B.",
      "For a repeated factor (x−a)²: write A/(x−a) + B/(x−a)². Equate coefficients or substitute convenient values to find A and B.",
      "Each term integrates easily: ∫A/(x−a) dx = A ln|x−a| + C, and ∫B/(x−a)² dx = −B/(x−a) + C.",
    ],
    latexBlocks: [
      "\\frac{P(x)}{(x-a)(x-b)}=\\frac{A}{x-a}+\\frac{B}{x-b}",
      "A=\\left.\\frac{P(x)}{x-b}\\right|_{x=a}\\;(\\text{cover-up})",
      "\\int\\frac{A}{x-a}\\,dx=A\\ln|x-a|+C,\\quad\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}+C",
    ],
  },
  workedExamples: [
    {
      title: "Distinct linear factors",
      questionLatex:
        "\\int\\frac{1}{(x-1)(x+3)}\\,dx",
      steps: [
        {
          explanation: "Set up partial fractions.",
          latex: "\\frac{1}{(x-1)(x+3)}=\\frac{A}{x-1}+\\frac{B}{x+3}",
        },
        {
          explanation: "Cover-up for A (set x = 1): A = 1/(1+3) = 1/4.",
          latex: "A=\\frac{1}{4}",
        },
        {
          explanation: "Cover-up for B (set x = −3): B = 1/(−3−1) = −1/4.",
          latex: "B=-\\frac{1}{4}",
        },
        {
          explanation: "Integrate term by term.",
          latex:
            "\\int\\left(\\frac{1/4}{x-1}-\\frac{1/4}{x+3}\\right)dx=\\frac{1}{4}\\ln|x-1|-\\frac{1}{4}\\ln|x+3|+C",
        },
      ],
      finalAnswerLatex:
        "\\frac{1}{4}\\ln\\left|\\frac{x-1}{x+3}\\right|+C",
    },
    {
      title: "Repeated linear factor",
      questionLatex:
        "\\int\\frac{3x}{(x+1)^2}\\,dx",
      steps: [
        {
          explanation: "Decompose: A/(x+1) + B/(x+1)².",
          latex: "\\frac{3x}{(x+1)^2}=\\frac{A}{x+1}+\\frac{B}{(x+1)^2}",
        },
        {
          explanation: "Multiply through and equate coefficients.",
          latex:
            "3x=A(x+1)+B.\\;\\text{Coeffs of }x:\\;A=3.\\;\\text{At }x=-1:\\;-3=B.",
        },
        {
          explanation: "Integrate.",
          latex:
            "\\int\\left(\\frac{3}{x+1}-\\frac{3}{(x+1)^2}\\right)dx=3\\ln|x+1|+\\frac{3}{x+1}+C",
        },
      ],
      finalAnswerLatex:
        "3\\ln|x+1|+\\frac{3}{x+1}+C",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-pf-g1",
      "Which decomposition form is correct for $\\dfrac{5}{(x-2)(x+1)}$?",
      "A",
      [
        "$\\dfrac{A}{x-2}+\\dfrac{B}{x+1}$",
        "$\\dfrac{Ax+B}{x-2}+\\dfrac{C}{x+1}$",
        "$\\dfrac{A}{x^2-x-2}$",
        "$\\dfrac{A}{x-2}\\cdot\\dfrac{B}{x+1}$",
      ],
      "Distinct linear factors use A/(x−2) + B/(x+1).",
      "Write one constant per distinct linear factor."
    ),
    calcTyped(
      "y12e2-pf-g2",
      "Use cover-up to find $A$ in $\\dfrac{1}{(x-1)(x+3)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+3}$.",
      "A=\\left.\\frac{1}{x+3}\\right|_{x=1}",
      "1/4",
      ["0.25"],
      "At x = 1: A = 1/(1+3) = 1/4.",
      "Cover the (x−1) factor and substitute x = 1."
    ),
    calcTyped(
      "y12e2-pf-g3",
      "Integrate $\\dfrac{1}{x-5}$ with respect to $x$.",
      "\\int\\frac{1}{x-5}\\,dx",
      "ln|x-5|+C",
      ["ln|x − 5| + C", "ln(x-5)+C"],
      "∫1/(x−5) dx = ln|x−5| + C.",
      "Standard result: ∫1/(x−a) dx = ln|x−a| + C."
    ),
    calcChoice(
      "y12e2-pf-g4",
      "For a repeated factor $(x+2)^2$, the correct partial fraction terms are:",
      "B",
      [
        "$\\dfrac{A}{(x+2)^2}$ only",
        "$\\dfrac{A}{x+2}+\\dfrac{B}{(x+2)^2}$",
        "$\\dfrac{Ax+B}{(x+2)^2}$",
        "$\\dfrac{A}{x+2}+\\dfrac{Bx}{(x+2)^2}$",
      ],
      "A repeated linear factor (x+a)² requires both A/(x+a) and B/(x+a)² terms.",
      "Include one term per power up to the multiplicity."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-pf-i1",
      "Find $B$ in $\\dfrac{1}{(x-1)(x+3)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+3}$ using cover-up.",
      "B=\\left.\\frac{1}{x-1}\\right|_{x=-3}",
      "-1/4",
      ["−1/4", "-0.25"],
      "At x = −3: B = 1/(−3−1) = −1/4.",
      "Cover (x+3) and substitute x = −3."
    ),
    calcTyped(
      "y12e2-pf-i2",
      "Evaluate $\\displaystyle\\int\\frac{1}{(x-1)(x+3)}\\,dx$, using $A=\\tfrac{1}{4}$, $B=-\\tfrac{1}{4}$.",
      "\\int\\left(\\frac{1/4}{x-1}-\\frac{1/4}{x+3}\\right)dx",
      "(1/4)ln|x-1|-(1/4)ln|x+3|+C",
      [
        "\\frac{1}{4}\\ln|x-1|-\\frac{1}{4}\\ln|x+3|+C",
        "(1/4)ln|(x-1)/(x+3)|+C",
        "1/4 ln|(x-1)/(x+3)|+C",
        "1/4ln|(x-1)/(x+3)|+C",
        "1/4 ln|(x-1)/(x+3)|+c",
        "ln|(x-1)/(x+3)|/4+C",
      ],
      "Integrate each term: (1/4)ln|x−1| − (1/4)ln|x+3| + C.",
      "Use ∫A/(x−a) dx = A ln|x−a| + C for each term."
    ),
    calcTyped(
      "y12e2-pf-i3",
      "Find $A$ and $B$ for $\\dfrac{4}{(x-2)(x+2)}=\\dfrac{A}{x-2}+\\dfrac{B}{x+2}$.",
      "A=\\left.\\frac{4}{x+2}\\right|_{x=2},\\;B=\\left.\\frac{4}{x-2}\\right|_{x=-2}",
      "A=1, B=-1",
      [
        "A = 1, B = −1",
        "A=1, B=-1",
        "A=1 B=-1",
        "A = 1 and B = -1",
      ],
      "A = 4/4 = 1. B = 4/(−4) = −1.",
      "Cover-up at x = 2 for A, at x = −2 for B."
    ),
    calcChoice(
      "y12e2-pf-i4",
      "Which is the integral of $\\dfrac{2}{(x+1)^2}$?",
      "A",
      [
        "$-\\dfrac{2}{x+1}+C$",
        "$2\\ln|x+1|+C$",
        "$\\dfrac{2}{(x+1)^3}+C$",
        "$\\dfrac{1}{(x+1)^2}+C$",
      ],
      "∫2/(x+1)² dx = 2·∫(x+1)^{−2} dx = 2·(−1/(x+1)) + C = −2/(x+1) + C.",
      "Treat (x+1)² as a power function."
    ),
    calcTyped(
      "y12e2-pf-i5",
      "Evaluate $\\displaystyle\\int_0^1\\frac{4}{(x-2)(x+2)}\\,dx$ using $A=1$, $B=-1$.",
      "\\int_0^1\\left(\\frac{1}{x-2}-\\frac{1}{x+2}\\right)dx",
      "-ln3",
      ["-ln 3", "-ln(3)", "ln(1/3)", "\\ln(1/3)", "-\\ln 3"],
      "[ln|x−2| − ln|x+2|]₀¹ = (ln1 − ln3) − (ln2 − ln2) = (0 − ln3) − 0 = −ln3 = ln(1/3). The integrand is negative on [0,1], consistent with a negative result.",
      "Substitute limits after integrating each term."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Applying the cover-up rule to a repeated factor.",
      fix: "Cover-up only works directly for distinct linear factors. For (x−a)², use equating coefficients or substitute convenient values.",
    },
    {
      mistake: "Writing ∫A/(x−a) dx = A/(x−a) + C.",
      fix: "The integral of 1/(x−a) is ln|x−a|, not 1/(x−a). That form arises only with negative-power integrals like ∫(x−a)^{−2} dx.",
    },
    {
      mistake: "Forgetting absolute value signs in logarithms.",
      fix: "For indefinite integrals, write ln|x−a| not ln(x−a). The absolute value handles negative inputs.",
    },
  ],
  masteryQuiz: [
    calcChoice(
      "y12e2-pf-m1",
      "Which decomposition is correct for $\\dfrac{3}{x(x-3)}$?",
      "A",
      [
        "$\\dfrac{A}{x}+\\dfrac{B}{x-3}$",
        "$\\dfrac{Ax+B}{x(x-3)}$",
        "$\\dfrac{A}{x}\\cdot\\dfrac{B}{x-3}$",
        "$\\dfrac{A+B}{x(x-3)}$",
      ],
      "Two distinct linear factors give A/x + B/(x−3).",
      "One constant per distinct factor."
    ),
    calcTyped(
      "y12e2-pf-m2",
      "Find $A$ in $\\dfrac{3}{x(x-3)}=\\dfrac{A}{x}+\\dfrac{B}{x-3}$ by cover-up.",
      "A=\\left.\\frac{3}{x-3}\\right|_{x=0}",
      "-1",
      ["−1"],
      "A = 3/(0−3) = −1.",
      "Cover x and substitute x = 0."
    ),
    calcTyped(
      "y12e2-pf-m3",
      "Find $B$ in $\\dfrac{3}{x(x-3)}=\\dfrac{A}{x}+\\dfrac{B}{x-3}$ by cover-up.",
      "B=\\left.\\frac{3}{x}\\right|_{x=3}",
      "1",
      [],
      "B = 3/3 = 1.",
      "Cover (x−3) and substitute x = 3."
    ),
    calcChoice(
      "y12e2-pf-m4",
      "What is $\\displaystyle\\int\\frac{1}{x}\\,dx$?",
      "B",
      [
        "$-\\dfrac{1}{x^2}+C$",
        "$\\ln|x|+C$",
        "$x^2/2+C$",
        "$e^x+C$",
      ],
      "The standard result: ∫1/x dx = ln|x| + C.",
      "Recall the integral of 1/x."
    ),
    calcTyped(
      "y12e2-pf-m5",
      "Integrate $\\displaystyle\\int\\frac{3}{x(x-3)}\\,dx$ using $A=-1$, $B=1$.",
      "\\int\\left(-\\frac{1}{x}+\\frac{1}{x-3}\\right)dx",
      "-ln|x|+ln|x-3|+C",
      ["ln|x-3|-ln|x|+C", "\\ln\\left|\\frac{x-3}{x}\\right|+C"],
      "−ln|x| + ln|x−3| + C.",
      "Integrate each partial fraction term."
    ),
    calcTyped(
      "y12e2-pf-m6",
      "For $\\dfrac{2x+1}{(x+1)^2}=\\dfrac{A}{x+1}+\\dfrac{B}{(x+1)^2}$, find $A$.",
      "2x+1=A(x+1)+B:\\;\\text{coeff of }x",
      "2",
      [],
      "Equating coefficients of x: A = 2. Confirm: at x = −1: 2(−1)+1 = −1 = B, so B = −1.",
      "Multiply both sides by (x+1)² and equate coefficients of x."
    ),
    calcChoice(
      "y12e2-pf-m7",
      "For a proper rational function $P(x)/Q(x)$, the degree of $P$ must be:",
      "B",
      [
        "Equal to the degree of $Q$",
        "Less than the degree of $Q$",
        "Greater than the degree of $Q$",
        "Exactly 1",
      ],
      "Partial fractions work directly when deg P < deg Q (proper fraction). If not, long-divide first.",
      "Recall the definition of a proper rational function."
    ),
    calcTyped(
      "y12e2-pf-m8",
      "Evaluate $\\displaystyle\\int\\frac{1}{(x+1)^2}\\,dx$.",
      "\\int(x+1)^{-2}\\,dx",
      "-1/(x+1)+C",
      ["−1/(x+1) + C", "-(x+1)^{-1}+C"],
      "Power rule: ∫(x+1)^{−2} dx = (x+1)^{−1}/(−1) = −1/(x+1) + C.",
      "Apply the power rule with n = −2."
    ),
    calcChoice(
      "y12e2-pf-m9",
      "After decomposing $\\dfrac{5}{(x-1)(x-4)}=\\dfrac{A}{x-1}+\\dfrac{B}{x-4}$ and integrating, the answer involves:",
      "A",
      [
        "$\\ln|x-1|$ and $\\ln|x-4|$",
        "$\\dfrac{1}{x-1}$ and $\\dfrac{1}{x-4}$",
        "$(x-1)^2$ and $(x-4)^2$",
        "$e^{x-1}$ and $e^{x-4}$",
      ],
      "Each 1/(x−a) term integrates to ln|x−a|.",
      "Recall ∫1/(x−a) dx = ln|x−a| + C."
    ),
    calcTyped(
      "y12e2-pf-m10",
      "Find $A$ and $B$ in $\\dfrac{x+5}{(x-1)(x+2)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+2}$.",
      "A=\\left.\\frac{x+5}{x+2}\\right|_{x=1},\\;B=\\left.\\frac{x+5}{x-1}\\right|_{x=-2}",
      "A=2, B=-1",
      ["A = 2, B = −1"],
      "A = 6/3 = 2. B = 3/(−3) = −1.",
      "Cover-up at x = 1 for A and x = −2 for B."
    ),
  ],
  masteryQuizPool: [
    { ...calcChoice("y12e2-calc-pf-pool-1", "To integrate a proper rational function whose denominator is factorised, what is the first step?", "B", ["Integrate term by term immediately.", "Decompose it into partial fractions.", "Differentiate the denominator.", "Complete the square on the numerator."], "A proper rational function is split into simple partial fractions first; each piece then integrates to a log or arctan."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-pf-pool-2", "Decompose 5/((x−1)(x+4)) = A/(x−1) + B/(x+4). Find A using the cover-up at x = 1.", "\\frac{5}{(x-1)(x+4)} = \\frac{A}{x-1} + \\frac{B}{x+4}", "1", [], "Cover-up at x = 1: A = 5/(1 + 4) = 1."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-pf-pool-3", "For 5/((x−1)(x+4)) = A/(x−1) + B/(x+4), find B using the cover-up at x = −4.", "\\frac{B}{x+4}", "-1", ["−1"], "Cover-up at x = −4: B = 5/(−4 − 1) = −1."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-pf-pool-4", "Decompose (2x+3)/((x+1)(x+2)) = A/(x+1) + B/(x+2). Find A.", "\\frac{2x+3}{(x+1)(x+2)} = \\frac{A}{x+1}+\\frac{B}{x+2}", "1", [], "Cover-up at x = −1: A = (2(−1)+3)/(−1+2) = 1/1 = 1."), difficulty: 3 },
    { ...calcChoice("y12e2-calc-pf-pool-5", "For 1/((x−1)²(x+2)), a student writes A/(x−1)² + B/(x+2). What is missing?", "C", ["Nothing — that is complete.", "A numerator of the form Cx + D.", "A term C/(x−1): a repeated factor needs BOTH C/(x−1) and A/(x−1)².", "The factor (x+2) should be squared."], "A repeated linear factor (x−1)² contributes two terms: C/(x−1) and A/(x−1)². Omitting C/(x−1) makes the decomposition impossible to match."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-pf-pool-6", "∫ 2/(x²−1) dx = ∫ [1/(x−1) − 1/(x+1)] dx = ln|(x−1)/(x+1)| + C. Evaluate the integral from x = 2 to x = 3 (answer as a single logarithm).", "\\ln\\left|\\frac{x-1}{x+1}\\right|", "ln(3/2)", ["ln 3/2", "ln1.5", "0.405"], "[ln((x−1)/(x+1))] from 2 to 3 = ln(2/4) − ln(1/3) = ln(1/2) + ln 3 = ln(3/2)."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-pf-pool-7", "An irreducible quadratic factor: ∫ 1/(x²+4) dx = (1/k)·arctan(x/2) + C. Find k.", "\\int \\frac{1}{x^2+4}\\,dx = \\tfrac{1}{k}\\arctan\\tfrac{x}{2}", "2", [], "∫ 1/(x²+a²) dx = (1/a)·arctan(x/a). Here a = 2, so k = 2."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-pf-pool-8", "For (3x+5)/((x+1)(x+2)) = A/(x+1) + B/(x+2), find A + B.", "\\frac{3x+5}{(x+1)(x+2)}", "3", [], "A = 2 (cover-up at −1) and B = 1 (cover-up at −2), so A + B = 3 — matching the coefficient of x in the numerator."), difficulty: 4 },
    { ...calcChoice("y12e2-calc-pf-pool-9", "A student integrates 1/(x²+9) as ln(x²+9)/(2x). Why is this wrong?", "C", ["x²+9 factorises over the reals.", "The integral diverges.", "x²+9 is irreducible, so this is an arctan integral: ∫ 1/(x²+9) dx = (1/3)·arctan(x/3) + C, not a logarithm.", "You cannot integrate 1/(x²+9)."], "An irreducible quadratic denominator with no x in the numerator gives an arctan, not a log. Dividing by the derivative of the denominator is invalid."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-pf-pool-10", "Repeated factor: (3x−1)/(x−1)² = A/(x−1) + B/(x−1)². Find B by multiplying through by (x−1)² and setting x = 1.", "(3x-1) = A(x-1) + B", "2", [], "Multiplying by (x−1)²: 3x − 1 = A(x − 1) + B. At x = 1: B = 3(1) − 1 = 2."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-pf-pool-11", "∫ (3x+5)/((x+1)(x+2)) dx = 2 ln|x+1| + ln|x+2| + C. Evaluate the integral from x = 1 to x = 2; it equals ln k. Find k.", "2\\ln|x+1| + \\ln|x+2|", "3", [], "(2 ln 3 + ln 4) − (2 ln 2 + ln 3) = ln 3 + (ln 4 − 2 ln 2) = ln 3, so k = 3."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-pf-pool-12", "Improper fraction: in (x²+1)/((x−1)(x+1)) the numerator's degree equals the denominator's, so polynomial division is needed first. After dividing, (x²+1)/(x²−1) = q + 2/(x²−1). State the quotient q.", "\\frac{x^2+1}{x^2-1} = q + \\frac{2}{x^2-1}", "1", [], "Dividing x²+1 by x²−1 gives quotient 1, remainder 2, so the expression is 1 + 2/(x²−1) — you must divide before decomposing an improper fraction."), difficulty: 5 },
  ],
};

// ─── Lesson 5: t-Substitution (Weierstrass) ───────────────────────────────────

const tSubstitutionLesson: Partial<ExplicitLesson> = {
  description:
    "Apply the Weierstrass substitution t = tan(x/2) to convert integrands involving sin x and cos x into rational functions of t, then integrate using standard techniques.",
  learningIntention:
    "Use t = tan(x/2) to transform trigonometric integrals into rational integrals.",
  successCriteria: [
    "State sin x, cos x and dx in terms of t = tan(x/2).",
    "Substitute to convert a trig integrand into a rational function of t.",
    "Integrate the rational function using partial fractions or standard forms.",
    "Back-substitute t = tan(x/2) to express the answer in x.",
  ],
  teaching: {
    paragraphs: [
      "The Weierstrass (half-angle) substitution t = tan(x/2) converts any rational function of sin x and cos x into a rational function of t, which can then be integrated.",
      "From t = tan(x/2): sin x = 2t/(1+t²), cos x = (1−t²)/(1+t²), and dx = 2/(1+t²) dt. Memorise these three formulas.",
      "The method is powerful but can produce large expressions. Use it when simpler techniques (substitution, identities) do not apply cleanly.",
      "After integrating in t, back-substitute t = tan(x/2) to return to the original variable x.",
    ],
    latexBlocks: [
      "t=\\tan\\frac{x}{2}:\\quad\\sin x=\\frac{2t}{1+t^2},\\quad\\cos x=\\frac{1-t^2}{1+t^2},\\quad dx=\\frac{2}{1+t^2}\\,dt",
      "\\int R(\\sin x,\\cos x)\\,dx\\;\\xrightarrow{t=\\tan(x/2)}\\;\\int R\\!\\left(\\frac{2t}{1+t^2},\\frac{1-t^2}{1+t^2}\\right)\\frac{2}{1+t^2}\\,dt",
    ],
  },
  workedExamples: [
    {
      title: "Integrate 1/(1 + sin x) using t-substitution",
      questionLatex: "\\int\\frac{1}{1+\\sin x}\\,dx",
      steps: [
        {
          explanation: "Substitute sin x = 2t/(1+t²) and dx = 2/(1+t²) dt.",
          latex:
            "\\frac{1}{1+\\frac{2t}{1+t^2}}\\cdot\\frac{2}{1+t^2}\\,dt=\\frac{1+t^2}{1+t^2+2t}\\cdot\\frac{2}{1+t^2}\\,dt=\\frac{2}{(1+t)^2}\\,dt",
        },
        {
          explanation: "Integrate the resulting rational function.",
          latex:
            "\\int\\frac{2}{(1+t)^2}\\,dt=-\\frac{2}{1+t}+C",
        },
        {
          explanation: "Back-substitute t = tan(x/2).",
          latex:
            "-\\frac{2}{1+\\tan(x/2)}+C",
        },
      ],
      finalAnswerLatex: "-\\frac{2}{1+\\tan(x/2)}+C",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-tsub-g1",
      "Under the substitution $t=\\tan(x/2)$, which expression equals $\\sin x$?",
      "B",
      [
        "$\\dfrac{1-t^2}{1+t^2}$",
        "$\\dfrac{2t}{1+t^2}$",
        "$\\dfrac{t}{1+t^2}$",
        "$\\dfrac{2}{1+t^2}$",
      ],
      "The formula is sin x = 2t/(1+t²).",
      "Recall the three Weierstrass formulas."
    ),
    calcChoice(
      "y12e2-tsub-g2",
      "Under $t=\\tan(x/2)$, which expression equals $\\cos x$?",
      "A",
      [
        "$\\dfrac{1-t^2}{1+t^2}$",
        "$\\dfrac{2t}{1+t^2}$",
        "$\\dfrac{1}{1+t^2}$",
        "$\\dfrac{t^2-1}{1+t^2}$",
      ],
      "The formula is cos x = (1−t²)/(1+t²).",
      "Recall the Weierstrass substitution formulas."
    ),
    calcTyped(
      "y12e2-tsub-g3",
      "Under $t=\\tan(x/2)$, write $dx$ in terms of $dt$.",
      "dx=\\,?\\,dt",
      "2/(1+t^2)",
      ["\\frac{2}{1+t^2}", "2dt/(1+t^2)"],
      "dx = 2/(1+t²) dt. This follows from differentiating x = 2 arctan t.",
      "Differentiate t = tan(x/2) implicitly."
    ),
    calcChoice(
      "y12e2-tsub-g4",
      "After applying $t=\\tan(x/2)$ to $\\displaystyle\\int\\frac{1}{1+\\cos x}\\,dx$, the integrand simplifies to:",
      "C",
      [
        "$\\dfrac{2}{1-t^2}$",
        "$\\dfrac{1}{1+t^2}$",
        "$\\dfrac{1}{1}=1$",
        "$\\dfrac{2t}{1+t^2}$",
      ],
      "cos x = (1−t²)/(1+t²). So 1+cos x = 2/(1+t²). With dx = 2/(1+t²)dt: integrand = (1+t²)/2 × 2/(1+t²) = 1.",
      "Substitute cos x and dx, then simplify."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-tsub-i1",
      "Using $t=\\tan(x/2)$, express $1+\\sin x$ in terms of $t$.",
      "",
      "(1+t)^2/(1+t^2)",
      ["(1+t)²/(1+t²)", "\\frac{(1+t)^2}{1+t^2}"],
      "1 + 2t/(1+t²) = (1+t²+2t)/(1+t²) = (1+t)²/(1+t²).",
      "Combine over a common denominator, then factor."
    ),
    calcTyped(
      "y12e2-tsub-i2",
      "Simplify $\\dfrac{1}{1+\\sin x}\\cdot\\dfrac{2}{1+t^2}$ using $1+\\sin x=\\dfrac{(1+t)^2}{1+t^2}$.",
      "",
      "2/(1+t)^2",
      ["\\frac{2}{(1+t)^2}"],
      "The (1+t²) terms cancel, leaving 2/(1+t)².",
      "Cancel the (1+t²) factor."
    ),
    calcTyped(
      "y12e2-tsub-i3",
      "Evaluate $\\displaystyle\\int\\frac{2}{(1+t)^2}\\,dt$.",
      "",
      "-2/(1+t)+C",
      ["−2/(1+t) + C"],
      "∫2(1+t)^{−2} dt = 2·(−1/(1+t)) + C = −2/(1+t) + C.",
      "Apply the power rule with substitution u = 1+t."
    ),
    calcChoice(
      "y12e2-tsub-i4",
      "For $\\displaystyle\\int\\frac{1}{1+\\cos x}\\,dx$, after the $t$-substitution the integrand becomes 1 (a constant). The integral is:",
      "A",
      [
        "$t+C=\\tan(x/2)+C$",
        "$x+C$",
        "$\\sin x+C$",
        "$2t+C$",
      ],
      "∫1 dt = t + C. Back-substituting t = tan(x/2) gives tan(x/2) + C.",
      "Integrate the simplified integrand and back-substitute."
    ),
    calcTyped(
      "y12e2-tsub-i5",
      "After evaluating $-\\dfrac{2}{1+t}+C$, back-substitute $t=\\tan(x/2)$.",
      "",
      "-2/(1+tan(x/2))+C",
      ["-2/(1+tan x/2)+C"],
      "Replace t with tan(x/2): the answer is −2/(1+tan(x/2)) + C.",
      "Substitute t = tan(x/2) into the result."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Mixing up sin x and cos x formulas.",
      fix: "sin x = 2t/(1+t²) and cos x = (1−t²)/(1+t²). Note cos has a minus sign in the numerator; sin has 2t.",
    },
    {
      mistake: "Forgetting to substitute dx.",
      fix: "dx = 2/(1+t²) dt. Always replace dx as part of the substitution — it must appear in the integrand.",
    },
    {
      mistake: "Not back-substituting at the end.",
      fix: "The final answer must be in terms of x. Replace t = tan(x/2) in the integrated expression.",
    },
  ],
  masteryQuiz: [
    calcChoice(
      "y12e2-tsub-m1",
      "The Weierstrass substitution sets $t$ equal to:",
      "B",
      ["$\\tan x$", "$\\tan(x/2)$", "$\\sin x$", "$\\cos(x/2)$"],
      "The substitution is t = tan(x/2), not tan x."
    ),
    calcTyped(
      "y12e2-tsub-m2",
      "Write $\\sin x$ in terms of $t=\\tan(x/2)$.",
      "\\sin x=\\,?",
      "2t/(1+t^2)",
      ["\\frac{2t}{1+t^2}"],
      "sin x = 2t/(1+t²).",
      "Recall the Weierstrass formula for sin x."
    ),
    calcTyped(
      "y12e2-tsub-m3",
      "Write $\\cos x$ in terms of $t=\\tan(x/2)$.",
      "\\cos x=\\,?",
      "(1-t^2)/(1+t^2)",
      ["\\frac{1-t^2}{1+t^2}"],
      "cos x = (1−t²)/(1+t²).",
      "Recall the Weierstrass formula for cos x."
    ),
    calcChoice(
      "y12e2-tsub-m4",
      "Under $t=\\tan(x/2)$, $1+\\cos x$ simplifies to:",
      "A",
      [
        "$\\dfrac{2}{1+t^2}$",
        "$\\dfrac{2t}{1+t^2}$",
        "$\\dfrac{1}{1+t^2}$",
        "$\\dfrac{2(1+t^2)}{1+t^2}=2$",
      ],
      "1 + (1−t²)/(1+t²) = (1+t²+1−t²)/(1+t²) = 2/(1+t²).",
      "Combine 1 and (1−t²)/(1+t²) over a common denominator."
    ),
    calcTyped(
      "y12e2-tsub-m5",
      "Under $t=\\tan(x/2)$, simplify the integral $\\displaystyle\\int\\frac{1}{1+\\cos x}\\,dx$.",
      "",
      "t+C",
      ["tan(x/2)+C", "\\tan(x/2)+C"],
      "After substitution the integrand is 1 (as shown in guided practice). ∫1 dt = t = tan(x/2) + C.",
      "After substituting, the integrand simplifies to 1; integrate and back-substitute."
    ),
    calcTyped(
      "y12e2-tsub-m6",
      "What is the back-substitution step for $t$ in terms of $x$?",
      "t=?",
      "tan(x/2)",
      ["\\tan(x/2)", "tan x/2"],
      "The substitution defined t = tan(x/2), so at the end replace t with tan(x/2).",
      "Recall the original substitution."
    ),
    calcChoice(
      "y12e2-tsub-m7",
      "The main purpose of the $t$-substitution in integration is to:",
      "C",
      [
        "Eliminate all trigonometry by converting to exponentials",
        "Convert any trig function to sin",
        "Turn a rational function of $\\sin x$ and $\\cos x$ into a rational function of $t$",
        "Remove the limits of a definite integral",
      ],
      "The substitution t = tan(x/2) converts R(sin x, cos x) into a rational function of t that can be integrated with standard algebraic techniques.",
      "Recall the purpose of the Weierstrass substitution."
    ),
    calcTyped(
      "y12e2-tsub-m8",
      "Express $\\dfrac{2}{(1+t)^2}$ as a power: $2(1+t)^{\\square}$.",
      "2(1+t)^n",
      "-2",
      ["−2"],
      "$1/(1+t)^2 = (1+t)^{−2}$. So the expression is $2(1+t)^{−2}$.",
      "Write the denominator as a negative power."
    ),
    calcChoice(
      "y12e2-tsub-m9",
      "For which integrand is the $t$-substitution most necessary?",
      "D",
      [
        "$\\int\\cos x\\,dx$",
        "$\\int\\frac{\\cos x}{\\sin x}\\,dx$",
        "$\\int\\sin^2 x\\,dx$",
        "$\\int\\frac{1}{3+5\\cos x}\\,dx$",
      ],
      "The t-substitution handles integrands that are rational in sin x and cos x where other methods fail. 1/(3+5cos x) is not easily handled by identities or simple substitution.",
      "Look for integrands that are rational combinations of sin x and cos x with no obvious alternative."
    ),
    calcTyped(
      "y12e2-tsub-m10",
      "Under $t=\\tan(x/2)$, express $dx$ in terms of $dt$ and $t$.",
      "dx=\\,?\\,dt",
      "2/(1+t^2)dt",
      ["\\frac{2}{1+t^2}dt", "2dt/(1+t^2)"],
      "dx = 2/(1+t²) dt. This is the differential conversion in the Weierstrass substitution.",
      "Recall the third Weierstrass formula."
    ),
  ],
  masteryQuizPool: [
    { ...calcChoice("y12e2-calc-tsub-pool-1", "The Weierstrass substitution t = tan(x/2) is used to convert which kind of integral?", "B", ["Any product of a polynomial and a trig function.", "A rational function of sin x and cos x into a rational function of t.", "An integral with a square-root denominator.", "Only definite integrals."], "Setting t = tan(x/2) turns sin x, cos x and dx into rational expressions in t, so a rational trig integral becomes an ordinary rational-function integral."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-tsub-pool-2", "Under t = tan(x/2), sin x = 2t/(1+t²). State the value of sin x when t = 1.", "\\sin x = \\frac{2t}{1+t^2}", "1", [], "At t = 1: sin x = 2(1)/(1+1) = 2/2 = 1 (consistent with x = π/2)."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-tsub-pool-3", "Under t = tan(x/2), cos x = (1−t²)/(1+t²). State the value of cos x when t = 1.", "\\cos x = \\frac{1-t^2}{1+t^2}", "0", [], "At t = 1: cos x = (1 − 1)/(1 + 1) = 0 (consistent with x = π/2)."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-tsub-pool-4", "Under t = tan(x/2), dx = 2/(1+t²) dt. Find dx/dt when t = 0.", "dx = \\frac{2}{1+t^2}\\,dt", "2", [], "dx/dt = 2/(1+t²); at t = 0 this is 2/1 = 2."), difficulty: 3 },
    { ...calcChoice("y12e2-calc-tsub-pool-5", "A student substitutes t = tan(x/2), replaces sin x and cos x, but leaves dx unchanged. What is wrong?", "C", ["Nothing — dx is unaffected.", "sin x should not be replaced.", "dx must also be converted to 2/(1+t²) dt; using the old dx gives a completely different integral.", "t should be tan x."], "All three pieces — sin x, cos x AND dx — must be converted. Forgetting dx = 2/(1+t²) dt is the most common t-substitution error."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-tsub-pool-6", "Using t = tan(x/2), ∫ 1/(1+sin x) dx becomes ∫ 2/(1+t)² dt. Evaluate this from t = 0 to t = 1.", "\\int_0^1 \\frac{2}{(1+t)^2}\\,dt", "1", [], "[−2/(1+t)] from 0 to 1 = −2/2 − (−2/1) = −1 + 2 = 1."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-tsub-pool-7", "With t = tan(x/2), ∫ 1/(1+cos x) dx simplifies to ∫ 1 dt = tan(x/2) + C. Evaluate the integral of 1/(1+cos x) from x = 0 to x = π/2.", "\\int \\frac{1}{1+\\cos x}\\,dx = \\tan\\tfrac{x}{2} + C", "1", [], "[tan(x/2)] from 0 to π/2 = tan(π/4) − tan 0 = 1 − 0 = 1."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-tsub-pool-8", "Under t = tan(x/2), 1 + sin x = (1 + 2t/(1+t²)) = (1+t)²/(1+t²). State the value of the numerator (1+t)² when t = 1.", "1 + \\sin x = \\frac{(1+t)^2}{1+t^2}", "4", [], "(1 + t)² at t = 1 is (1 + 1)² = 4."), difficulty: 4 },
    { ...calcChoice("y12e2-calc-tsub-pool-9", "A student applies t = tan(x/2) to ∫ x cos x dx. Why is that the wrong tool?", "C", ["t-substitution cannot handle cosine.", "The integral has no answer.", "t-substitution is for RATIONAL functions of sin and cos; ∫ x cos x dx is a polynomial × trig product, which needs integration by parts.", "The bounds cannot be transformed."], "Weierstrass converts rational trig expressions. A product like x cos x is not rational in sin/cos — it needs integration by parts instead."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-tsub-pool-10", "For ∫ 1/(2+cos x) dx, t = tan(x/2) gives 2 + cos x = (3 + t²)/(1+t²), so the integrand becomes 2/(3+t²) dt, integrating to (2/√k)·arctan(t/√k). Find k.", "\\int \\frac{2}{3+t^2}\\,dt", "3", [], "2 + cos x = (2(1+t²) + (1−t²))/(1+t²) = (3+t²)/(1+t²). Then 2/(3+t²) integrates to (2/√3)·arctan(t/√3); k = 3."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-tsub-pool-11", "For ∫ 1/(5+4cos x) dx, t = tan(x/2) gives 5 + 4cos x = (9 + t²)/(1+t²), so the integrand becomes 2/(9+t²) dt = (2/3)·arctan(t/3). The arctan uses √k = 3; state k.", "\\int \\frac{2}{9+t^2}\\,dt", "9", [], "5(1+t²) + 4(1−t²) = 9 + t², so the integrand is 2/(9+t²) = 2/(t² + 3²); k = 9 (√k = 3)."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-tsub-pool-12", "When evaluating a definite integral, t = tan(x/2) also transforms the bounds. For the upper bound x = π/2, find t = tan(x/2).", "t = \\tan\\tfrac{x}{2}", "1", [], "t = tan((π/2)/2) = tan(π/4) = 1 — the bounds must be converted along with the integrand."), difficulty: 5 },
  ],
};

// ─── Lesson 6: Integration Using Trigonometric Identities ─────────────────────

const trigIdentityIntegrationLesson: Partial<ExplicitLesson> = {
  description:
    "Use half-angle identities sin²x = (1−cos2x)/2 and cos²x = (1+cos2x)/2 to reduce powers of sine and cosine before integrating, and handle mixed products using product-to-sum identities.",
  learningIntention:
    "Reduce powers of sin and cos using half-angle identities, then integrate the resulting standard forms.",
  successCriteria: [
    "Apply sin²x = (1−cos2x)/2 and cos²x = (1+cos2x)/2 before integrating.",
    "Integrate cos(2x) correctly, dividing by 2.",
    "Use product-to-sum identities to convert sin(ax)cos(bx) into a sum.",
    "Evaluate definite integrals of trig powers to exact values.",
  ],
  teaching: {
    paragraphs: [
      "Powers of sine and cosine cannot be integrated directly; instead, use half-angle identities to convert them into integrable forms.",
      "Half-angle identities: sin²x = (1−cos2x)/2 and cos²x = (1+cos2x)/2. These follow from the double-angle formulas cos2x = 1−2sin²x and cos2x = 2cos²x−1.",
      "Product-to-sum: sin(A)cos(B) = [sin(A+B) + sin(A−B)]/2. This converts mixed products like sin(3x)cos(x) into a sum of sines.",
      "For ∫cos(2x) dx, remember to divide by 2: ∫cos(2x) dx = sin(2x)/2 + C.",
    ],
    latexBlocks: [
      "\\sin^2 x=\\frac{1-\\cos 2x}{2},\\quad\\cos^2 x=\\frac{1+\\cos 2x}{2}",
      "\\int\\sin^2 x\\,dx=\\frac{x}{2}-\\frac{\\sin 2x}{4}+C",
      "\\int\\cos^2 x\\,dx=\\frac{x}{2}+\\frac{\\sin 2x}{4}+C",
      "\\sin A\\cos B=\\frac{\\sin(A+B)+\\sin(A-B)}{2}",
    ],
  },
  workedExamples: [
    {
      title: "Integrate sin²x",
      questionLatex: "\\int\\sin^2 x\\,dx",
      steps: [
        {
          explanation: "Apply the half-angle identity.",
          latex: "\\sin^2 x=\\frac{1-\\cos 2x}{2}",
        },
        {
          explanation: "Integrate term by term.",
          latex:
            "\\int\\frac{1-\\cos 2x}{2}\\,dx=\\frac{x}{2}-\\frac{\\sin 2x}{4}+C",
        },
      ],
      finalAnswerLatex: "\\frac{x}{2}-\\frac{\\sin 2x}{4}+C",
    },
    {
      title: "Evaluate a definite integral of cos²x",
      questionLatex: "\\int_0^{\\pi/2}\\cos^2 x\\,dx",
      steps: [
        {
          explanation: "Apply the half-angle identity.",
          latex: "\\cos^2 x=\\frac{1+\\cos 2x}{2}",
        },
        {
          explanation: "Integrate.",
          latex:
            "\\left[\\frac{x}{2}+\\frac{\\sin 2x}{4}\\right]_0^{\\pi/2}",
        },
        {
          explanation: "Substitute limits: at π/2 gives π/4 + sin(π)/4 = π/4; at 0 gives 0.",
          latex: "\\frac{\\pi}{4}+0-0=\\frac{\\pi}{4}",
        },
      ],
      finalAnswerLatex: "\\frac{\\pi}{4}",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-trig-g1",
      "The half-angle identity for $\\sin^2 x$ is:",
      "A",
      [
        "$\\dfrac{1-\\cos 2x}{2}$",
        "$\\dfrac{1+\\cos 2x}{2}$",
        "$\\dfrac{1-\\sin 2x}{2}$",
        "$\\cos^2 x-1$",
      ],
      "sin²x = (1−cos2x)/2. Remember: sin has a minus sign.",
      "Derive from cos2x = 1 − 2sin²x."
    ),
    calcChoice(
      "y12e2-trig-g2",
      "The half-angle identity for $\\cos^2 x$ is:",
      "B",
      [
        "$\\dfrac{1-\\cos 2x}{2}$",
        "$\\dfrac{1+\\cos 2x}{2}$",
        "$\\dfrac{1-\\sin 2x}{2}$",
        "$1-\\sin^2 x$",
      ],
      "cos²x = (1+cos2x)/2. Remember: cos has a plus sign.",
      "Derive from cos2x = 2cos²x − 1."
    ),
    calcTyped(
      "y12e2-trig-g3",
      "Evaluate $\\displaystyle\\int\\cos(2x)\\,dx$.",
      "\\int\\cos(2x)\\,dx",
      "sin(2x)/2+C",
      ["\\frac{\\sin(2x)}{2}+C", "(sin 2x)/2+C"],
      "∫cos(2x) dx = sin(2x)/2 + C. The standard form gives sin(2x) divided by the coefficient 2.",
      "Apply ∫cos(ax) dx = sin(ax)/a + C with a = 2."
    ),
    calcChoice(
      "y12e2-trig-g4",
      "Which identity converts $\\sin(3x)\\cos(x)$ to a sum?",
      "A",
      [
        "$\\sin A\\cos B=\\dfrac{\\sin(A+B)+\\sin(A-B)}{2}$",
        "$\\cos^2 x-\\sin^2 x=\\cos 2x$",
        "$\\sin^2 x+\\cos^2 x=1$",
        "$\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B$",
      ],
      "The product-to-sum identity sin A cos B = [sin(A+B)+sin(A−B)]/2 converts products into sums.",
      "Look for the formula that turns a product of sin and cos into a sum."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-trig-i1",
      "Use the half-angle identity to write $\\sin^2 x$ as a sum.",
      "\\sin^2 x=\\frac{1-\\cos 2x}{2}",
      "(1-cos(2x))/2",
      ["\\frac{1-\\cos 2x}{2}"],
      "sin²x = (1−cos2x)/2.",
      "Apply the half-angle identity for sin²x."
    ),
    calcTyped(
      "y12e2-trig-i2",
      "Evaluate $\\displaystyle\\int\\sin^2 x\\,dx$.",
      "\\int\\frac{1-\\cos 2x}{2}\\,dx",
      "x/2-sin(2x)/4+C",
      ["\\frac{x}{2}-\\frac{\\sin 2x}{4}+C"],
      "∫(1−cos2x)/2 dx = x/2 − sin(2x)/4 + C.",
      "Integrate (1−cos2x)/2 term by term."
    ),
    calcTyped(
      "y12e2-trig-i3",
      "Evaluate $\\displaystyle\\int_0^{\\pi/2}\\sin^2 x\\,dx$.",
      "\\left[\\frac{x}{2}-\\frac{\\sin 2x}{4}\\right]_0^{\\pi/2}",
      "pi/4",
      ["π/4", "\\pi/4"],
      "At π/2: π/4 − sin(π)/4 = π/4 − 0 = π/4. At 0: 0. Result = π/4.",
      "Substitute limits into x/2 − sin(2x)/4."
    ),
    calcTyped(
      "y12e2-trig-i4",
      "Apply the product-to-sum identity to $\\sin(3x)\\cos(x)$.",
      "\\sin(3x)\\cos(x)=\\frac{\\sin(4x)+\\sin(2x)}{2}",
      "(sin(4x)+sin(2x))/2",
      ["\\frac{\\sin 4x+\\sin 2x}{2}"],
      "A=3x, B=x: [sin(4x)+sin(2x)]/2.",
      "Apply sin A cos B = [sin(A+B)+sin(A−B)]/2 with A=3x, B=x."
    ),
    calcTyped(
      "y12e2-trig-i5",
      "Evaluate $\\displaystyle\\int\\sin(3x)\\cos(x)\\,dx$ using the product-to-sum identity.",
      "\\int\\frac{\\sin 4x+\\sin 2x}{2}\\,dx",
      "-cos(4x)/8-cos(2x)/4+C",
      ["−cos(4x)/8 − cos(2x)/4 + C"],
      "∫(sin4x+sin2x)/2 dx = (−cos4x/4 − cos2x/2)/2 = −cos4x/8 − cos2x/4 + C.",
      "Integrate each sine term: ∫sin(ax)dx = −cos(ax)/a."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing sin² and cos² half-angle identities.",
      fix: "sin²x has a MINUS: (1−cos2x)/2. cos²x has a PLUS: (1+cos2x)/2.",
    },
    {
      mistake: "Integrating cos(2x) as sin(2x) without dividing by 2.",
      fix: "∫cos(2x) dx = sin(2x)/2 + C. Always divide by the coefficient of x inside the trig function.",
    },
    {
      mistake: "Using sin²x + cos²x = 1 to 'integrate' trig powers.",
      fix: "The Pythagorean identity does not directly help with integration. Use half-angle identities to lower the power.",
    },
  ],
  masteryQuiz: [
    calcChoice(
      "y12e2-trig-m1",
      "$\\sin^2 x$ expressed using a half-angle identity is:",
      "A",
      [
        "$\\dfrac{1-\\cos 2x}{2}$",
        "$\\dfrac{1+\\cos 2x}{2}$",
        "$\\dfrac{1-\\sin 2x}{2}$",
        "$1-\\cos^2 x$",
      ],
      "sin²x = (1−cos2x)/2."
    ),
    calcTyped(
      "y12e2-trig-m2",
      "Evaluate $\\displaystyle\\int\\cos^2 x\\,dx$.",
      "\\int\\frac{1+\\cos 2x}{2}\\,dx",
      "x/2+sin(2x)/4+C",
      ["\\frac{x}{2}+\\frac{\\sin 2x}{4}+C"],
      "∫(1+cos2x)/2 dx = x/2 + sin(2x)/4 + C.",
      "Apply the half-angle identity for cos²x, then integrate."
    ),
    calcTyped(
      "y12e2-trig-m3",
      "Evaluate $\\displaystyle\\int_0^{\\pi/2}\\cos^2 x\\,dx$.",
      "\\left[\\frac{x}{2}+\\frac{\\sin 2x}{4}\\right]_0^{\\pi/2}",
      "pi/4",
      ["π/4", "\\pi/4"],
      "At π/2: π/4 + sin(π)/4 = π/4 + 0 = π/4. At 0: 0. Result = π/4.",
      "Substitute limits into x/2 + sin(2x)/4."
    ),
    calcChoice(
      "y12e2-trig-m4",
      "The correct integral of $\\cos(4x)$ is:",
      "A",
      [
        "$\\dfrac{\\sin(4x)}{4}+C$",
        "$\\sin(4x)+C$",
        "$4\\sin(4x)+C$",
        "$-\\sin(4x)/4+C$",
      ],
      "∫cos(4x) dx = sin(4x)/4 + C.",
      "Apply ∫cos(ax) dx = sin(ax)/a + C with a = 4."
    ),
    calcTyped(
      "y12e2-trig-m5",
      "Apply product-to-sum to $\\sin(2x)\\cos(x)$.",
      "\\sin(2x)\\cos(x)=\\frac{\\sin(3x)+\\sin(x)}{2}",
      "(sin(3x)+sin(x))/2",
      ["\\frac{\\sin 3x+\\sin x}{2}"],
      "A=2x, B=x: [sin(3x)+sin(x)]/2.",
      "Apply sin A cos B = [sin(A+B)+sin(A−B)]/2."
    ),
    calcTyped(
      "y12e2-trig-m6",
      "Evaluate $\\displaystyle\\int\\sin(2x)\\cos(x)\\,dx$.",
      "\\int\\frac{\\sin 3x+\\sin x}{2}\\,dx",
      "-cos(3x)/6-cos(x)/2+C",
      ["−cos(3x)/6 − cos(x)/2 + C"],
      "∫(sin3x+sinx)/2 dx = (−cos3x/3 − cosx)/2 = −cos3x/6 − cosx/2 + C.",
      "Integrate each term using ∫sin(ax) dx = −cos(ax)/a."
    ),
    calcChoice(
      "y12e2-trig-m7",
      "Both $\\displaystyle\\int_0^{\\pi/2}\\sin^2 x\\,dx$ and $\\displaystyle\\int_0^{\\pi/2}\\cos^2 x\\,dx$ equal:",
      "B",
      ["$0$", "$\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{2}$", "$1$"],
      "By symmetry and half-angle integration, both equal π/4.",
      "Both integrals use the same method with identical limits and yield π/4."
    ),
    calcTyped(
      "y12e2-trig-m8",
      "Write $\\cos^2 x$ using a half-angle identity.",
      "\\cos^2 x=\\frac{1+\\cos 2x}{2}",
      "(1+cos(2x))/2",
      ["\\frac{1+\\cos 2x}{2}"],
      "cos²x = (1+cos2x)/2.",
      "Derive from cos2x = 2cos²x − 1."
    ),
    calcChoice(
      "y12e2-trig-m9",
      "Which step is needed before integrating $\\sin^3 x$?",
      "D",
      [
        "Apply $\\sin^3 x=(\\sin^2 x)\\sin x$, then use $\\sin^2 x=1-\\cos^2 x$",
        "Use the half-angle identity directly",
        "Differentiate $\\cos x$",
        "Both A steps: $\\sin^3 x=\\sin x(1-\\cos^2 x)$, then substitute $u=\\cos x$",
      ],
      "Write sin³x = sinx(1−cos²x), set u = cosx, du = −sinx dx. This is not a half-angle identity approach but a substitution approach for odd powers.",
      "Odd powers of sin use a different method: write $sin^{2k+1}x = (1−cos^2 x)^k sin x$ and substitute."
    ),
    calcTyped(
      "y12e2-trig-m10",
      "Evaluate $\\displaystyle\\int_0^\\pi\\sin^2 x\\,dx$.",
      "\\left[\\frac{x}{2}-\\frac{\\sin 2x}{4}\\right]_0^\\pi",
      "pi/2",
      ["π/2", "\\pi/2"],
      "At π: π/2 − sin(2π)/4 = π/2 − 0 = π/2. At 0: 0. Result = π/2.",
      "Substitute limits 0 and π into x/2 − sin(2x)/4."
    ),
  ],
  masteryQuizPool: [
    { ...calcChoice("y12e2-calc-trig-pool-1", "To integrate sin²x, which identity is most useful?", "B", ["sin²x = 1 − cos²x", "sin²x = (1 − cos 2x)/2", "sin²x = 2 sin x cos x", "sin²x = (1 + cos 2x)/2"], "The power-reduction identity sin²x = (1 − cos 2x)/2 turns the square into a term you can integrate directly."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-trig-pool-2", "Using sin²x = (1 − cos 2x)/2, an antiderivative of sin²x is x/2 − (sin 2x)/4 + C. Evaluate this antiderivative at x = 0.", "\\tfrac{x}{2} - \\tfrac{\\sin 2x}{4}", "0", [], "At x = 0: 0/2 − sin 0/4 = 0."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-trig-pool-3", "Evaluate the integral of sin²x from 0 to π/2.", "\\int_0^{\\pi/2} \\sin^2 x\\,dx", "π/4", ["pi/4", "\\pi/4", "0.785"], "∫ (1 − cos 2x)/2 dx = [x/2 − sin 2x/4] from 0 to π/2 = π/4."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-trig-pool-4", "Using cos²x = (1 + cos 2x)/2, evaluate the integral of cos²x from 0 to π/2.", "\\cos^2 x = \\tfrac{1+\\cos 2x}{2}", "π/4", ["pi/4", "\\pi/4", "0.785"], "∫ (1 + cos 2x)/2 dx = [x/2 + sin 2x/4] from 0 to π/2 = π/4."), difficulty: 3 },
    { ...calcChoice("y12e2-calc-trig-pool-5", "A student integrates sin²x as (sin³x)/3. Why is this wrong?", "C", ["sin²x has no antiderivative.", "The answer should be cos²x.", "(sin³x)/3 differentiates to sin²x·cos x, not sin²x; you must use the power-reduction identity first.", "You may only integrate sin x, never sin²x."], "Treating sin²x like a simple power ignores the chain rule. Differentiating (sin³x)/3 gives sin²x cos x. The correct route is sin²x = (1 − cos 2x)/2."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-trig-pool-6", "For sin³x = sin x(1 − cos²x), the substitution u = cos x gives ∫ sin³x dx = −cos x + (cos³x)/3 + C. Evaluate this antiderivative at x = 0.", "-\\cos x + \\tfrac{\\cos^3 x}{3}", "-2/3", ["−2/3", "-0.667"], "At x = 0: −cos 0 + (cos³0)/3 = −1 + 1/3 = −2/3."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-trig-pool-7", "Using the double-angle identity 2 sin x cos x = sin 2x, an antiderivative of 2 sin x cos x is −(cos 2x)/2 + C. Evaluate the integral of 2 sin x cos x from 0 to π/2.", "\\int_0^{\\pi/2} 2\\sin x\\cos x\\,dx", "1", [], "[−cos 2x/2] from 0 to π/2 = −½(cos π − cos 0) = −½(−1 − 1) = 1."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-trig-pool-8", "Using sin²x cos²x = (sin 2x)²/4 = (1 − cos 4x)/8, evaluate the integral of sin²x cos²x from 0 to π/2.", "\\sin^2 x\\cos^2 x = \\tfrac{1-\\cos 4x}{8}", "π/16", ["pi/16", "0.196"], "∫ (1 − cos 4x)/8 dx = (1/8)[x − sin 4x/4] from 0 to π/2 = (1/8)(π/2) = π/16."), difficulty: 4 },
    { ...calcChoice("y12e2-calc-trig-pool-9", "A student writes an antiderivative of sin²x as x − (sin 2x)/2 (forgetting the factor of ½ from the identity). What is the correct antiderivative?", "C", ["x − sin 2x", "2x − sin 2x", "x/2 − (sin 2x)/4", "x/2 + (sin 2x)/2"], "sin²x = (1 − cos 2x)/2, so ∫ sin²x dx = x/2 − (sin 2x)/4 + C. The factor of ½ from the identity must be kept."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-trig-pool-10", "For cos³x = cos x(1 − sin²x), the substitution u = sin x gives ∫ cos³x dx = sin x − (sin³x)/3 + C. Evaluate the integral of cos³x from 0 to π/2.", "\\sin x - \\tfrac{\\sin^3 x}{3}", "2/3", ["0.667"], "[sin x − sin³x/3] from 0 to π/2 = (1 − 1/3) − 0 = 2/3."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-trig-pool-11", "Using sin⁴x = ((1 − cos 2x)/2)² and cos²2x = (1 + cos 4x)/2, the constant term works out to 3/8, so an antiderivative is (3/8)x + (oscillating terms). Evaluate the integral of sin⁴x from 0 to π/2.", "\\int_0^{\\pi/2} \\sin^4 x\\,dx", "3π/16", ["3pi/16", "0.589"], "The constant term of sin⁴x is 3/8, and the oscillating terms vanish over [0, π/2], so the integral is (3/8)(π/2) = 3π/16."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-trig-pool-12", "For the integral of sin x · cos²x from −π/2 to π/2, recognise the symmetry: sin x is odd and cos²x is even, so the product is odd over the symmetric interval. State the value of the integral.", "\\int_{-\\pi/2}^{\\pi/2} \\sin x\\,\\cos^2 x\\,dx", "0", [], "An odd integrand over a symmetric interval integrates to 0 — recognising the symmetry avoids any identity work."), difficulty: 5 },
  ],
};

// ─── Lesson 7: Integration by Completing the Square ──────────────────────────

const completingSquareIntegrationLesson: Partial<ExplicitLesson> = {
  description:
    "Complete the square on a quadratic denominator and use the standard arctan form ∫dx/(x²+a²) = (1/a)arctan(x/a)+C to evaluate integrals of rational functions.",
  learningIntention:
    "Reduce quadratic denominators to standard arctan form by completing the square.",
  successCriteria: [
    "Complete the square on x² + bx + c to write it as (x + h)² + k².",
    "Apply the standard form ∫dx/(x² + a²) = (1/a)arctan(x/a) + C.",
    "Integrate ∫dx/((x + h)² + k²) using the substitution u = x + h.",
    "Evaluate definite integrals involving arctan using exact values.",
  ],
  teaching: {
    paragraphs: [
      "Many rational integrands have a quadratic denominator that doesn't factor over ℝ. The technique: complete the square on the denominator to reach a standard arctan form.",
      "Completing the square: x² + bx + c = (x + b/2)² + (c − b²/4). The second term must be positive for the quadratic to be irreducible.",
      "Standard form: ∫dx/(x² + a²) = (1/a)arctan(x/a) + C. Memorise this result.",
      "For a shifted denominator (x + h)² + k², substitute u = x + h, du = dx: ∫dx/((x+h)²+k²) = ∫du/(u²+k²) = (1/k)arctan(u/k) + C = (1/k)arctan((x+h)/k) + C.",
      "If the numerator contains a linear term such as (2x + b), split it into a multiple of the derivative of the denominator plus a constant, then integrate using log and arctan.",
    ],
    latexBlocks: [
      "x^2+bx+c=\\left(x+\\frac{b}{2}\\right)^2+\\left(c-\\frac{b^2}{4}\\right)",
      "\\int\\frac{dx}{x^2+a^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+C",
      "\\int\\frac{dx}{(x+h)^2+k^2}=\\frac{1}{k}\\arctan\\frac{x+h}{k}+C",
    ],
  },
  workedExamples: [
    {
      title: "Integrate using the standard arctan form",
      questionLatex: "\\int\\frac{dx}{x^2+9}",
      steps: [
        { explanation: "The denominator is already x² + a² with a² = 9, a = 3.", latex: "\\int\\frac{dx}{x^2+3^2}" },
        { explanation: "Apply the standard form.", latex: "=\\frac{1}{3}\\arctan\\frac{x}{3}+C" },
      ],
      finalAnswerLatex: "\\frac{1}{3}\\arctan\\frac{x}{3}+C",
    },
    {
      title: "Complete the square then integrate",
      questionLatex: "\\int\\frac{dx}{x^2+4x+5}",
      steps: [
        { explanation: "Complete the square: x²+4x+5 = (x+2)²+1.", latex: "(x+2)^2+1" },
        { explanation: "Apply the standard form with h = 2, k = 1.", latex: "\\int\\frac{dx}{(x+2)^2+1}=\\arctan(x+2)+C" },
      ],
      finalAnswerLatex: "\\arctan(x+2)+C",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-csq-g1",
      "Complete the square: x² + 4x + 5 = ?",
      "A",
      [
        "$(x+2)^2+1$",
        "$(x+2)^2-1$",
        "$(x+4)^2+5$",
        "$(x+2)^2+5$",
      ],
      "x² + 4x + 5 = (x+2)² − 4 + 5 = (x+2)² + 1.",
      "Add and subtract (b/2)² = 4 inside."
    ),
    calcTyped(
      "y12e2-csq-g2",
      "Evaluate $\\displaystyle\\int\\frac{dx}{x^2+4}$.",
      "\\int\\frac{dx}{x^2+2^2}",
      "(1/2)arctan(x/2)+C",
      ["\\frac{1}{2}\\arctan\\frac{x}{2}+C"],
      "a = 2: ∫dx/(x²+4) = (1/2)arctan(x/2) + C.",
      "Identify a² = 4, so a = 2. Apply ∫dx/(x²+a²) = (1/a)arctan(x/a)+C."
    ),
    calcTyped(
      "y12e2-csq-g3",
      "Complete the square on $x^2+6x+10$.",
      "x^2+6x+10",
      "(x+3)^2+1",
      ["(x+3)²+1"],
      "x² + 6x + 10 = (x+3)² − 9 + 10 = (x+3)² + 1.",
      "Half of 6 is 3; subtract 3² = 9, then add 10."
    ),
    calcChoice(
      "y12e2-csq-g4",
      "$\\displaystyle\\int\\frac{dx}{x^2+9}$ equals:",
      "A",
      [
        "$\\dfrac{1}{3}\\arctan\\dfrac{x}{3}+C$",
        "$\\arctan(3x)+C$",
        "$3\\arctan(x/3)+C$",
        "$\\ln(x^2+9)+C$",
      ],
      "a = 3: (1/3)arctan(x/3) + C.",
      "Identify a = 3 and apply the standard formula."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-csq-i1",
      "Evaluate $\\displaystyle\\int\\frac{dx}{x^2+1}$.",
      "",
      "arctan(x)+C",
      ["\\arctan x+C"],
      "a = 1: arctan(x) + C.",
      "Apply the standard form with a = 1."
    ),
    calcTyped(
      "y12e2-csq-i2",
      "Complete the square on $x^2-2x+5$, then integrate $\\displaystyle\\int\\frac{dx}{x^2-2x+5}$.",
      "",
      "(1/2)arctan((x-1)/2)+C",
      ["\\frac{1}{2}\\arctan\\frac{x-1}{2}+C"],
      "x²−2x+5 = (x−1)²+4. Then (1/2)arctan((x−1)/2)+C.",
      "Complete the square first: x²−2x+5 = (x−1)²+4."
    ),
    calcTyped(
      "y12e2-csq-i3",
      "Evaluate $\\displaystyle\\int\\frac{dx}{x^2+6x+10}$.",
      "",
      "arctan(x+3)+C",
      ["\\arctan(x+3)+C"],
      "x²+6x+10 = (x+3)²+1. Integral = arctan(x+3)+C.",
      "Complete the square: x²+6x+10 = (x+3)²+1. Then k=1."
    ),
    calcTyped(
      "y12e2-csq-i4",
      "Evaluate $\\displaystyle\\int\\frac{dx}{(x+3)^2+4}$.",
      "",
      "(1/2)arctan((x+3)/2)+C",
      ["\\frac{1}{2}\\arctan\\frac{x+3}{2}+C"],
      "u = x+3, k = 2: (1/2)arctan((x+3)/2)+C.",
      "Substitute u = x+3, so the integral becomes ∫du/(u²+4)."
    ),
    calcChoice(
      "y12e2-csq-i5",
      "To integrate $\\displaystyle\\int\\frac{dx}{(x+2)^2+9}$, the first substitution is:",
      "A",
      ["$u = x+2$", "$u = x^2+9$", "$u = \\tan x$", "$u = (x+2)^2$"],
      "Substitute u = x+2, du = dx. The integral becomes ∫du/(u²+9) = (1/3)arctan(u/3)+C.",
      "Shift to remove the linear term inside the square."
    ),
  ],
  masteryQuiz: [
    calcTyped(
      "y12e2-csq-m1",
      "Evaluate $\\displaystyle\\int\\frac{dx}{x^2+4}$.",
      "",
      "(1/2)arctan(x/2)+C",
      ["\\frac{1}{2}\\arctan\\frac{x}{2}+C"],
      "a = 2: (1/2)arctan(x/2)+C."
    ),
    calcTyped(
      "y12e2-csq-m2",
      "Complete the square on $x^2+4x+7$.",
      "x^2+4x+7",
      "(x+2)^2+3",
      ["(x+2)²+3"],
      "(x+2)² − 4 + 7 = (x+2)² + 3."
    ),
    calcChoice(
      "y12e2-csq-m3",
      "$\\displaystyle\\int\\frac{du}{u^2+a^2}$ equals:",
      "A",
      [
        "$\\dfrac{1}{a}\\arctan\\dfrac{u}{a}+C$",
        "$a\\arctan(au)+C$",
        "$\\dfrac{1}{a^2}\\arctan u+C$",
        "$\\ln(u^2+a^2)+C$",
      ],
      "Standard result: ∫du/(u²+a²) = (1/a)arctan(u/a)+C.",
      "This is the standard arctan integral formula."
    ),
    calcTyped(
      "y12e2-csq-m4",
      "Evaluate $\\displaystyle\\int\\frac{dx}{x^2-4x+5}$.",
      "",
      "arctan(x-2)+C",
      ["\\arctan(x-2)+C"],
      "x²−4x+5 = (x−2)²+1. Integral = arctan(x−2)+C."
    ),
    calcTyped(
      "y12e2-csq-m5",
      "Evaluate $\\displaystyle\\int\\frac{dx}{x^2+2x+2}$.",
      "",
      "arctan(x+1)+C",
      ["\\arctan(x+1)+C"],
      "(x+1)²+1. Integral = arctan(x+1)+C."
    ),
    calcChoice(
      "y12e2-csq-m6",
      "To integrate $\\displaystyle\\int\\frac{dx}{x^2+6x+13}$, the first step is:",
      "B",
      [
        "Substitute $u=x^2+6x+13$",
        "Complete the square: $x^2+6x+13=(x+3)^2+4$",
        "Use partial fractions",
        "Differentiate the denominator",
      ],
      "Complete the square first: x²+6x+13 = (x+3)²+4. Then apply the standard arctan form.",
      "The denominator is a shifted, irreducible quadratic — complete the square."
    ),
    calcTyped(
      "y12e2-csq-m7",
      "Evaluate $\\displaystyle\\int_0^1\\frac{dx}{x^2+1}$.",
      "",
      "pi/4",
      ["π/4", "\\pi/4"],
      "[arctan x]₀¹ = arctan(1) − arctan(0) = π/4 − 0 = π/4."
    ),
    calcTyped(
      "y12e2-csq-m8",
      "Evaluate $\\displaystyle\\int\\frac{dx}{x^2+4x+8}$.",
      "",
      "(1/2)arctan((x+2)/2)+C",
      ["\\frac{1}{2}\\arctan\\frac{x+2}{2}+C"],
      "(x+2)²+4. k=2: (1/2)arctan((x+2)/2)+C."
    ),
    calcChoice(
      "y12e2-csq-m9",
      "$\\displaystyle\\int\\frac{dx}{x^2+a^2}$:",
      "A",
      [
        "$\\dfrac{1}{a}\\arctan\\dfrac{x}{a}+C$",
        "$\\arctan(ax)+C$",
        "$\\dfrac{1}{2a}\\ln(x^2+a^2)+C$",
        "$\\dfrac{x}{a^2}+C$",
      ],
      "Standard arctan form: (1/a)arctan(x/a)+C.",
      "Recall the standard arctan integral."
    ),
    calcTyped(
      "y12e2-csq-m10",
      "Evaluate $\\displaystyle\\int\\frac{dx}{4x^2+1}$. (Hint: write as $\\int\\frac{dx}{(2x)^2+1}$ and use substitution $u=2x$.)",
      "",
      "(1/2)arctan(2x)+C",
      ["\\frac{1}{2}\\arctan(2x)+C"],
      "u = 2x, du = 2dx. (1/2)∫du/(u²+1) = (1/2)arctan(2x)+C.",
      "Factor 4 from the denominator or substitute u = 2x."
    ),
  ],
  masteryQuizPool: [
    { ...calcChoice("y12e2-calc-cs-pool-1", "Completing the square on a quadratic denominator is needed to integrate which form?", "B", ["1/(x − a) — a single linear factor.", "1/(x²+bx+c) where the quadratic has no real roots (giving an arctan).", "A polynomial.", "1/x."], "When x²+bx+c does not factorise over the reals, completing the square turns it into (x+h)² + k², an arctan-type integral."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-cs-pool-2", "Complete the square: x²+2x+5 = (x+1)² + c. Find c.", "x^2+2x+5 = (x+1)^2 + c", "4", [], "(x+1)² = x²+2x+1, so x²+2x+5 = (x+1)² + 4 and c = 4."), difficulty: 2 },
    { ...calcTyped("y12e2-calc-cs-pool-3", "Hence ∫ 1/(x²+2x+5) dx = (1/k)·arctan((x+1)/2) + C. Find k.", "\\int \\frac{1}{(x+1)^2+4}\\,dx", "2", [], "With (x+1)² + 2², ∫ 1/((x+1)²+2²) dx = (1/2)·arctan((x+1)/2) + C; k = 2."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-cs-pool-4", "Complete the square: x²−6x+13 = (x−3)² + c. Find c.", "x^2-6x+13 = (x-3)^2 + c", "4", [], "(x−3)² = x²−6x+9, so x²−6x+13 = (x−3)² + 4 and c = 4."), difficulty: 3 },
    { ...calcChoice("y12e2-calc-cs-pool-5", "A student integrates 1/(x²+2x+5) as ln(x²+2x+5)/(2x+2). Why is this wrong?", "C", ["x²+2x+5 factorises.", "The integral diverges.", "There is no x factor matching the derivative in the numerator; completing the square gives an arctan, not a log.", "ln cannot appear in integration."], "Dividing by the derivative of the denominator is invalid. The denominator is irreducible, so completing the square yields (1/2)arctan((x+1)/2)."), difficulty: 3 },
    { ...calcTyped("y12e2-calc-cs-pool-6", "∫ 1/(x²−4x+8) dx completes to (x−2)² + 4, giving (1/2)·arctan((x−2)/2) + C. Evaluate the integral from x = 2 to x = 4; it equals π/k. Find k.", "\\int_2^4 \\frac{1}{(x-2)^2+4}\\,dx", "8", [], "[(1/2)arctan((x−2)/2)] from 2 to 4 = (1/2)(arctan 1 − arctan 0) = (1/2)(π/4) = π/8, so k = 8."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-cs-pool-7", "Recognising a square-root denominator: ∫ 1/√(4−x²) dx = arcsin(x/a) + C. Find a.", "\\int \\frac{1}{\\sqrt{4-x^2}}\\,dx = \\arcsin\\tfrac{x}{a}", "2", [], "∫ 1/√(a²−x²) dx = arcsin(x/a). Here 4 = 2², so a = 2."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-cs-pool-8", "Complete the square: x²+4x+13 = (x+2)² + a². Find a.", "x^2+4x+13 = (x+2)^2 + a^2", "3", [], "(x+2)² = x²+4x+4, so x²+4x+13 = (x+2)² + 9 = (x+2)² + 3²; a = 3."), difficulty: 4 },
    { ...calcChoice("y12e2-calc-cs-pool-9", "A student completes the square as x²+2x+5 = (x+1)² + 5. What is the error?", "C", ["The coefficient of x should be 4.", "(x+1)² should be (x−1)².", "(x+1)² already includes +1, so you must subtract it: x²+2x+5 = (x+1)² + 4, not + 5.", "There is no error."], "Expanding (x+1)² gives x²+2x+1. To recover +5 you add 4, not 5, so the constant is +4."), difficulty: 4 },
    { ...calcTyped("y12e2-calc-cs-pool-10", "For ∫ (2x+3)/(x²+2x+5) dx, split the numerator as (2x+2) + d so the first part is the derivative of the denominator. Find d.", "2x+3 = (2x+2) + d", "1", [], "The derivative of x²+2x+5 is 2x+2, so 2x+3 = (2x+2) + 1; d = 1. The integral splits into a log part and an arctan part."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-cs-pool-11", "Complete the square on the non-monic-looking quadratic x²+x+1 = (x + 1/2)² + a². Find a².", "x^2+x+1 = (x+\\tfrac12)^2 + a^2", "3/4", ["0.75"], "(x + 1/2)² = x²+x+1/4, so x²+x+1 = (x+1/2)² + 3/4; a² = 3/4."), difficulty: 5 },
    { ...calcTyped("y12e2-calc-cs-pool-12", "For ∫ 1/(x²−6x+5) dx, completing the square gives (x−3)² + c. Evaluate c (its sign tells you whether to use arctan or partial fractions).", "x^2-6x+5 = (x-3)^2 + c", "-4", ["−4"], "(x−3)² = x²−6x+9, so x²−6x+5 = (x−3)² − 4; c = −4. The NEGATIVE constant means the quadratic factors as (x−1)(x−5), so use partial fractions (logs), not arctan."), difficulty: 5 },
  ],
};

// ─── Lesson 8: Partial Fractions with Quadratic Factors ───────────────────────

const partialFractionsQuadraticLesson: Partial<ExplicitLesson> = {
  description:
    "Decompose rational functions containing irreducible quadratic factors into partial fractions, and use polynomial long division when the degree of the numerator is not less than the degree of the denominator.",
  learningIntention:
    "Extend partial fraction decomposition to irreducible quadratic factors, and handle improper rational functions using long division.",
  successCriteria: [
    "Identify an irreducible quadratic factor (discriminant b² − 4ac < 0).",
    "Set up the partial fraction form (Ax + B)/(x² + bx + c) for each irreducible quadratic factor.",
    "Find coefficients by equating numerators and solving the system.",
    "Perform polynomial long division when deg(numerator) ≥ deg(denominator).",
    "Integrate the decomposed form using log and arctan standard results.",
  ],
  teaching: {
    paragraphs: [
      "An irreducible quadratic ax² + bx + c has discriminant b² − 4ac < 0 and cannot be factored into real linear factors. For each such factor in the denominator, the partial fraction contribution has the form (Ax + B)/(ax² + bx + c).",
      "Setting up: for a denominator like x(x² + 1), the decomposition is A/x + (Bx + C)/(x² + 1). Multiply through by the full denominator, then substitute convenient values of x or equate coefficients to find A, B, C.",
      "Integrating (Ax + B)/(x² + k²): split the numerator into a multiple of the derivative of the denominator plus a remainder. The derivative of x² + k² is 2x, so write Ax + B = (A/2)(2x) + B. This gives (A/2)·∫2x/(x²+k²)dx + B∫dx/(x²+k²) = (A/2)ln(x²+k²) + (B/k)arctan(x/k) + C.",
      "Improper fractions: if deg(numerator) ≥ deg(denominator), perform polynomial long division first to write the integrand as a polynomial plus a proper rational function, then decompose the remainder.",
    ],
    latexBlocks: [
      "\\frac{P(x)}{x(x^2+k^2)}=\\frac{A}{x}+\\frac{Bx+C}{x^2+k^2}",
      "\\int\\frac{Ax+B}{x^2+k^2}\\,dx=\\frac{A}{2}\\ln(x^2+k^2)+\\frac{B}{k}\\arctan\\frac{x}{k}+C",
      "\\text{If }\\deg P\\geq\\deg Q:\\quad\\frac{P(x)}{Q(x)}=\\text{quotient}+\\frac{\\text{remainder}}{Q(x)}",
    ],
  },
  workedExamples: [
    {
      title: "Partial fractions with an irreducible quadratic",
      questionLatex: "\\text{Decompose }\\frac{1}{x(x^2+1)}.",
      steps: [
        { explanation: "Set up: A/x + (Bx+C)/(x²+1).", latex: "\\frac{1}{x(x^2+1)}=\\frac{A}{x}+\\frac{Bx+C}{x^2+1}" },
        { explanation: "Multiply through by x(x²+1).", latex: "1=A(x^2+1)+(Bx+C)x" },
        { explanation: "Substitute x = 0: 1 = A(1) → A = 1.", latex: "A=1" },
        { explanation: "Expand and compare coefficients of x²: 0 = A + B → B = −1.", latex: "B=-1" },
        { explanation: "Compare coefficients of x: 0 = C.", latex: "C=0" },
      ],
      finalAnswerLatex: "\\frac{1}{x}-\\frac{x}{x^2+1}",
    },
    {
      title: "Long division before integrating",
      questionLatex: "\\int\\frac{x^2}{x+1}\\,dx",
      steps: [
        { explanation: "Divide: x² ÷ (x+1) = x − 1 remainder 1.", latex: "\\frac{x^2}{x+1}=x-1+\\frac{1}{x+1}" },
        { explanation: "Integrate each term.", latex: "\\int\\!\\left(x-1+\\frac{1}{x+1}\\right)dx=\\frac{x^2}{2}-x+\\ln|x+1|+C" },
      ],
      finalAnswerLatex: "\\frac{x^2}{2}-x+\\ln|x+1|+C",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-pfq-g1",
      "Which of the following is an irreducible quadratic?",
      "C",
      [
        "$x^2-4$ (factors as $(x-2)(x+2)$)",
        "$x^2-1$ (factors as $(x-1)(x+1)$)",
        "$x^2+1$ (discriminant $-4 < 0$)",
        "$x^2+3x+2$ (factors as $(x+1)(x+2)$)",
      ],
      "x² + 1 has discriminant 0 − 4 = −4 < 0: it does not factor over ℝ.",
      "Check discriminant b² − 4ac. Negative means irreducible."
    ),
    calcChoice(
      "y12e2-pfq-g2",
      "For $\\dfrac{2}{x(x^2+1)}$, the correct partial fraction form is:",
      "A",
      [
        "$\\dfrac{A}{x}+\\dfrac{Bx+C}{x^2+1}$",
        "$\\dfrac{A}{x}+\\dfrac{B}{x^2+1}$",
        "$\\dfrac{A}{x}+\\dfrac{B}{x}+\\dfrac{C}{x^2+1}$",
        "$\\dfrac{Ax+B}{x(x^2+1)}$",
      ],
      "For an irreducible quadratic factor, use (Bx+C) in the numerator.",
      "An irreducible quadratic factor x²+1 requires a linear numerator Bx+C."
    ),
    calcTyped(
      "y12e2-pfq-g3",
      "For $\\dfrac{1}{x(x^2+1)}=\\dfrac{A}{x}+\\dfrac{Bx+C}{x^2+1}$, multiply through by $x(x^2+1)$ and set $x=0$ to find $A$.",
      "1=A(x^2+1)+(Bx+C)x,\\;x=0",
      "1",
      [],
      "At x = 0: 1 = A(1) → A = 1.",
      "Substitute x = 0 to isolate A."
    ),
    calcTyped(
      "y12e2-pfq-g4",
      "Perform polynomial long division: divide $x^2+1$ by $x+1$.",
      "x^2+1=(x+1)(\\,?\\,)+\\text{remainder}",
      "x-1 remainder 2",
      ["quotient x-1, remainder 2", "x-1 r 2"],
      "x²+1 = (x+1)(x−1) + 2. Quotient: x−1, remainder: 2.",
      "Divide: x² ÷ x = x. Subtract x(x+1) = x²+x. Remainder: −x+1. Then −x ÷ x = −1. Subtract −1(x+1) = −x−1. Remainder: 2."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-pfq-i1",
      "From $\\dfrac{1}{x(x^2+1)}=\\dfrac{1}{x}+\\dfrac{Bx+C}{x^2+1}$, use the coefficient of $x^2$ to find $B$.",
      "0=A+B=1+B",
      "-1",
      [],
      "Coefficient of x²: 0 = A + B = 1 + B → B = −1.",
      "Expand 1 = A(x²+1) + (Bx+C)x and compare the x² coefficients."
    ),
    calcTyped(
      "y12e2-pfq-i2",
      "Given $\\dfrac{1}{x(x^2+1)}=\\dfrac{1}{x}-\\dfrac{x}{x^2+1}$, evaluate $\\displaystyle\\int\\frac{1}{x(x^2+1)}\\,dx$.",
      "\\int\\!\\left(\\frac{1}{x}-\\frac{x}{x^2+1}\\right)dx",
      "ln|x|-(1/2)ln(x^2+1)+C",
      ["\\ln|x|-\\tfrac{1}{2}\\ln(x^2+1)+C"],
      "∫1/x dx = ln|x|. ∫x/(x²+1) dx = (1/2)ln(x²+1). Result: ln|x| − (1/2)ln(x²+1) + C.",
      "∫x/(x²+1)dx: let u = x²+1, du = 2x dx → (1/2)∫du/u = (1/2)ln(x²+1)."
    ),
    calcTyped(
      "y12e2-pfq-i3",
      "Evaluate $\\displaystyle\\int\\frac{1}{x^2+1}\\,dx$.",
      "\\int\\frac{dx}{x^2+1}",
      "arctan(x)+C",
      ["\\arctan x+C"],
      "Standard result: arctan(x) + C."
    ),
    calcChoice(
      "y12e2-pfq-i4",
      "After long division, $\\dfrac{x^3+x}{x^2+1}$ equals:",
      "A",
      [
        "$x$ (since $x^3+x = x(x^2+1)$, so the remainder is 0)",
        "$x^2+1$",
        "$x-1+\\dfrac{2}{x^2+1}$",
        "$x^2$",
      ],
      "x³+x = x(x²+1) exactly, so x³+x ÷ (x²+1) = x with no remainder.",
      "Check: x × (x²+1) = x³+x. The division is exact."
    ),
    calcTyped(
      "y12e2-pfq-i5",
      "Divide $x^2$ by $(x+1)$ using long division.",
      "x^2=(x+1)(\\,?\\,)+\\text{remainder}",
      "x-1 remainder 1",
      ["quotient x-1, remainder 1"],
      "x² = (x+1)(x−1) + 1. Quotient x−1, remainder 1.",
      "x² ÷ x = x. Subtract x(x+1). Then: −x ÷ x = −1. Subtract −(x+1). Remainder: 1."
    ),
  ],
  masteryQuiz: [
    calcChoice(
      "y12e2-pfq-m1",
      "An irreducible quadratic factor has discriminant:",
      "B",
      ["Greater than zero", "Less than zero", "Equal to zero", "Equal to one"],
      "Discriminant b²−4ac < 0 means no real roots — the quadratic is irreducible over ℝ.",
      "Irreducible over ℝ means the discriminant is negative."
    ),
    calcTyped(
      "y12e2-pfq-m2",
      "For $\\dfrac{x+2}{x(x^2+1)}=\\dfrac{A}{x}+\\dfrac{Bx+C}{x^2+1}$, find $A$ by substituting $x=0$.",
      "x=0:\\;x+2=A(x^2+1)",
      "2",
      [],
      "At x=0: 0+2 = A(1) → A = 2.",
      "Multiply both sides by x(x²+1) then set x=0."
    ),
    calcTyped(
      "y12e2-pfq-m3",
      "Evaluate $\\displaystyle\\int\\frac{x}{x^2+1}\\,dx$.",
      "\\int\\frac{x}{x^2+1}\\,dx",
      "(1/2)ln(x^2+1)+C",
      ["\\tfrac{1}{2}\\ln(x^2+1)+C"],
      "Let u = x²+1, du = 2x dx. (1/2)∫du/u = (1/2)ln(x²+1)+C."
    ),
    calcChoice(
      "y12e2-pfq-m4",
      "$\\displaystyle\\int\\frac{Ax+B}{x^2+k^2}\\,dx$ can be split into:",
      "A",
      [
        "A log term from $Ax/(x^2+k^2)$ and an arctan term from $B/(x^2+k^2)$",
        "Two arctan terms",
        "Two log terms",
        "A power term and a log term",
      ],
      "∫Ax/(x²+k²) dx = (A/2)ln(x²+k²). ∫B/(x²+k²) dx = (B/k)arctan(x/k).",
      "Split the numerator: Ax integrates via log, B integrates via arctan."
    ),
    calcTyped(
      "y12e2-pfq-m5",
      "Integrate $\\displaystyle\\int\\frac{x}{x^2+4}\\,dx$.",
      "\\int\\frac{x}{x^2+4}\\,dx",
      "(1/2)ln(x^2+4)+C",
      ["\\tfrac{1}{2}\\ln(x^2+4)+C"],
      "Let u = x²+4, du = 2x dx. (1/2)ln(x²+4)+C."
    ),
    calcTyped(
      "y12e2-pfq-m6",
      "Long divide: $\\dfrac{x^2+2x}{x+1}$. Write as quotient + remainder/(x+1).",
      "x^2+2x=(x+1)(\\,?\\,)+\\text{rem}",
      "x+1 remainder -1",
      ["x+1, remainder -1", "quotient x+1, remainder -1"],
      "x²+2x = (x+1)(x+1) − 1. Quotient: x+1, remainder: −1.",
      "Divide: x²+2x ÷ (x+1). First term: x. Subtract x(x+1)=x²+x. Remainder: x. Next: x÷x=1. Subtract 1(x+1)=x+1. Remainder: −1."
    ),
    calcChoice(
      "y12e2-pfq-m7",
      "After long division, $\\dfrac{x^2}{x+1} = x-1+\\dfrac{\\square}{x+1}$. What goes in the box?",
      "A",
      ["1", "2", "x", "0"],
      "x² = (x+1)(x−1) + 1. So x²/(x+1) = x−1 + 1/(x+1).",
      "Long divide: x²÷(x+1). The remainder when x²=(x+1)(x-1)+1 is 1."
    ),
    calcTyped(
      "y12e2-pfq-m8",
      "Evaluate $\\displaystyle\\int\\frac{x^2+1}{x-1}\\,dx$ (long divide first).",
      "\\frac{x^2+1}{x-1}=x+1+\\frac{2}{x-1}",
      "x^2/2+x+2ln|x-1|+C",
      ["\\frac{x^2}{2}+x+2\\ln|x-1|+C"],
      "x²+1 = (x−1)(x+1)+2. Integrate: x²/2+x+2ln|x−1|+C.",
      "Divide x²+1 by (x−1): quotient x+1, remainder 2."
    ),
    calcTyped(
      "y12e2-pfq-m9",
      "Given $\\dfrac{1}{(x-1)(x^2+1)}=\\dfrac{A}{x-1}+\\dfrac{Bx+C}{x^2+1}$, find $A$.",
      "x=1:\\;1=A(1^2+1)",
      "1/2",
      ["0.5"],
      "At x=1: 1 = A(2) → A = 1/2.",
      "Substitute x = 1 to find A."
    ),
    calcChoice(
      "y12e2-pfq-m10",
      "$\\displaystyle\\int\\frac{Ax+B}{x^2+a^2}\\,dx$ — the arctan part comes from:",
      "B",
      [
        "The $Ax$ in the numerator",
        "The constant $B$ in the numerator",
        "The $a^2$ in the denominator",
        "Long division",
      ],
      "∫B/(x²+a²) dx = (B/a)arctan(x/a)+C. The constant B in the numerator produces the arctan term.",
      "Split the numerator: ∫Ax/(x²+a²) → log; ∫B/(x²+a²) → arctan."
    ),
  ],
};

// ─── Lesson 9: Volumes of Revolution ─────────────────────────────────────────

const volumesOfRevolutionLesson: Partial<ExplicitLesson> = {
  description:
    "Calculate volumes of solids of revolution by rotating regions about the x-axis or y-axis, using the disk method and washer method.",
  learningIntention:
    "Apply the disk and washer methods to find exact volumes of solids formed by rotating curves about coordinate axes.",
  successCriteria: [
    "Set up V = π∫[f(x)]² dx for rotation about the x-axis.",
    "Apply the washer method V = π∫([f(x)]² − [g(x)]²) dx for regions between two curves.",
    "Convert to x as a function of y and integrate with respect to y for rotation about the y-axis.",
    "Identify correct limits of integration from intercepts or intersection points.",
    "Avoid the common errors of forgetting to square, forgetting π, or squaring the difference instead of subtracting the squares.",
  ],
  teaching: {
    paragraphs: [
      "Imagine slicing the solid of revolution into thin disks of thickness δx. Each disk at position x has radius f(x), so its volume is approximately δV ≈ π[f(x)]² δx. Summing infinitely many such slices and letting δx → 0 gives the definite integral for the total volume.",
      "Disk method (rotation about the x-axis): V = π∫[a to b] [f(x)]² dx. The limits a and b are the x-values bounding the region. Note that π is a constant factor sitting outside the integral — it is not part of the integrand.",
      "Washer method: when the region is bounded by an outer curve f(x) and an inner curve g(x), each thin slice is a disk with a hole (a washer). The volume is V = π∫[a to b] ([f(x)]² − [g(x)]²) dx. Find the limits from the intersection points of the two curves.",
      "Rotation about the y-axis: slice horizontally instead. Express x as a function of y (rearrange y = f(x) to get x = g(y)), use y-values as limits, and integrate V = π∫[c to d] [x(y)]² dy.",
      "Common errors: integrating f(x) instead of [f(x)]² (forgetting to square); omitting the π factor entirely; and — especially with the washer method — computing π∫(f − g)² dx (squaring the difference) instead of the correct π∫(f² − g²) dx (difference of squares).",
    ],
    latexBlocks: [
      "V = \\pi\\int_a^b [f(x)]^2\\,dx",
      "V = \\pi\\int_a^b \\left([f(x)]^2 - [g(x)]^2\\right)dx",
      "V = \\pi\\int_c^d [x(y)]^2\\,dy",
      "\\delta V \\approx \\pi [f(x)]^2\\,\\delta x",
    ],
  },
  workedExamples: [
    {
      title: "Rotate y = x² about the x-axis from x = 0 to x = 2",
      questionLatex: "V=\\pi\\int_0^2 (x^2)^2\\,dx",
      cartesianGraph: parabolaXAxisGraph,
      steps: [
        {
          explanation: "Square the function: [f(x)]² = (x²)² = x⁴.",
          latex: "V=\\pi\\int_0^2 x^4\\,dx",
        },
        {
          explanation: "Integrate using the power rule.",
          latex: "V=\\pi\\left[\\frac{x^5}{5}\\right]_0^2=\\pi\\cdot\\frac{32}{5}",
        },
      ],
      finalAnswerLatex: "\\frac{32\\pi}{5}",
    },
    {
      title: "Washer method: region between y = √x and y = x, rotated about x-axis",
      questionLatex: "V=\\pi\\int_0^1\\left[(\\sqrt{x})^2-x^2\\right]dx",
      cartesianGraph: sqrtVsLineUnitGraph,
      steps: [
        {
          explanation: "Find intersections: √x = x gives x = 0 and x = 1. On (0,1), √x > x so f(x) = √x is outer, g(x) = x is inner.",
          latex: "\\text{Limits: }x=0\\text{ to }x=1",
        },
        {
          explanation: "Set up the washer integral: [f(x)]² − [g(x)]² = x − x².",
          latex: "V=\\pi\\int_0^1(x-x^2)\\,dx",
        },
        {
          explanation: "Integrate and evaluate.",
          latex: "V=\\pi\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1=\\pi\\left(\\frac{1}{2}-\\frac{1}{3}\\right)=\\frac{\\pi}{6}",
        },
      ],
      finalAnswerLatex: "\\frac{\\pi}{6}",
    },
    {
      title: "Rotate y = x² about the y-axis from y = 0 to y = 4",
      questionLatex: "V=\\pi\\int_0^4 x^2\\,dy,\\quad x^2=y",
      cartesianGraph: parabolaYAxisGraph,
      steps: [
        {
          explanation: "Express x² in terms of y: from y = x², we get x² = y.",
          latex: "V=\\pi\\int_0^4 y\\,dy",
        },
        {
          explanation: "Integrate with respect to y.",
          latex: "V=\\pi\\left[\\frac{y^2}{2}\\right]_0^4=\\pi\\cdot\\frac{16}{2}=8\\pi",
        },
      ],
      finalAnswerLatex: "8\\pi",
    },
  ],
  guidedPractice: [
    calcChoice(
      "y12e2-vor-g1",
      "What formula gives the volume when $y = f(x)$ is rotated about the $x$-axis from $x = a$ to $x = b$?",
      "A",
      [
        "$\\pi\\displaystyle\\int_a^b [f(x)]^2\\,dx$",
        "$\\displaystyle\\int_a^b [f(x)]^2\\,dx$",
        "$2\\pi\\displaystyle\\int_a^b f(x)\\,dx$",
        "$\\pi\\displaystyle\\int_a^b f(x)\\,dx$",
      ],
      "The disk method gives V = π∫[f(x)]² dx. The π factor is essential and sits outside the integral.",
      "Recall the disk method formula: square the function, multiply by π, integrate."
    ),
    calcTyped(
      "y12e2-vor-g2",
      "Rotate $y = 3$ about the $x$-axis from $x = 0$ to $x = 4$. Find the exact volume.",
      "",
      "36pi",
      [],
      "V = π∫₀⁴ 9 dx = π[9x]₀⁴ = 36π.",
      "Square the constant function first, then integrate."
    ),
    calcTyped(
      "y12e2-vor-g3",
      "Rotate $y = x$ about the $x$-axis from $x = 0$ to $x = 3$. Find the exact volume.",
      "",
      "9pi",
      [],
      "V = π∫₀³ x² dx = π[x³/3]₀³ = π(27/3) = 9π.",
      "Square f(x) = x to get x², then integrate."
    ),
    calcChoice(
      "y12e2-vor-g4",
      "When rotating a region about the $y$-axis, which variable should the integral be in?",
      "B",
      ["$x$", "$y$", "Either $x$ or $y$", "$t$ (parametric)"],
      "Rotating about the y-axis requires slicing horizontally, expressing x as a function of y, and integrating with respect to y.",
      "The axis of rotation determines the integration variable: y-axis → integrate in y."
    ),
  ],
  independentPractice: [
    calcTyped(
      "y12e2-vor-i1",
      "Rotate $y = \\sqrt{x}$ about the $x$-axis from $x = 1$ to $x = 4$. Find the exact volume.",
      "",
      "15pi/2",
      [],
      "V = π∫₁⁴ (√x)² dx = π∫₁⁴ x dx = π[x²/2]₁⁴ = π(8 − 1/2) = 15π/2.",
      "Square √x to get x, then integrate from 1 to 4."
    ),
    calcTyped(
      "y12e2-vor-i2",
      "Rotate $y = 2x$ about the $x$-axis from $x = 0$ to $x = 1$. Find the exact volume.",
      "",
      "4pi/3",
      [],
      "V = π∫₀¹ 4x² dx = 4π[x³/3]₀¹ = 4π/3.",
      "Square 2x to get 4x², then integrate."
    ),
    calcChoice(
      "y12e2-vor-i3",
      "For the washer method, which expression gives the volume when $f(x)$ is the outer curve and $g(x)$ is the inner curve?",
      "C",
      [
        "$\\pi\\displaystyle\\int(f(x)-g(x))^2\\,dx$",
        "$\\pi\\displaystyle\\int f(x)g(x)\\,dx$",
        "$\\pi\\displaystyle\\int\\left([f(x)]^2-[g(x)]^2\\right)dx$",
        "$\\pi\\displaystyle\\int(f(x)-g(x))\\,dx$",
      ],
      "The washer volume is π∫([f(x)]² − [g(x)]²) dx — subtract the squares, not square the difference.",
      "Each washer has area π(outer²) − π(inner²). Do not square the difference."
    ),
    calcTyped(
      "y12e2-vor-i4",
      "Rotate $y = x^2$ about the $y$-axis from $y = 0$ to $y = 1$. Find the exact volume.",
      "",
      "pi/2",
      [],
      "From y = x², x² = y. V = π∫₀¹ y dy = π[y²/2]₀¹ = π/2.",
      "Express x² = y, then integrate with respect to y from 0 to 1.",
      parabolaUnitYAxisGraph
    ),
    calcTyped(
      "y12e2-vor-i5",
      "The region between $y = x$ and $y = x^2$ for $0 \\le x \\le 1$ is rotated about the $x$-axis. Find the exact volume.",
      "",
      "2pi/15",
      [],
      "Outer: y = x, inner: y = x². V = π∫₀¹(x² − x⁴) dx = π[x³/3 − x⁵/5]₀¹ = π(1/3 − 1/5) = 2π/15.",
      "Outer radius is x (larger on [0,1]), inner is x². Subtract squares and integrate.",
      lineVsParabolaUnitGraph
    ),
  ],
  commonMistakes: [
    {
      mistake: "Integrating f(x) instead of [f(x)]².",
      fix: "Always square the radius function before integrating. The disk volume formula requires [f(x)]², not f(x).",
    },
    {
      mistake: "Omitting the π factor.",
      fix: "π is a constant in V = π∫[f(x)]² dx. It cannot be dropped — it comes from the area of each circular cross-section.",
    },
    {
      mistake: "Using π∫(f(x) − g(x))² dx for the washer method instead of π∫([f(x)]² − [g(x)]²) dx.",
      fix: "Subtract the squares of the radii, not square the difference. The washer area is π(R² − r²) where R is outer and r is inner.",
    },
  ],
  masteryQuiz: [
    calcChoice(
      "y12e2-vor-m1",
      "Why is the $\\pi$ factor placed outside the integral in $V = \\pi\\displaystyle\\int[f(x)]^2\\,dx$?",
      "A",
      [
        "It is a constant factor and can be factored out of the integral",
        "It represents the angle of rotation",
        "It only applies when rotating about the $x$-axis",
        "It is an approximation of 3.14...",
      ],
      "π is a constant and can be factored out of any integral. It arises from the area of a circle (πr²) and applies to both x-axis and y-axis rotations.",
      "Recall why constants can be moved outside integrals."
    ),
    calcTyped(
      "y12e2-vor-m2",
      "Rotate $y = x^3$ about the $x$-axis from $x = 0$ to $x = 1$. Find the exact volume.",
      "",
      "pi/7",
      [],
      "V = π∫₀¹ x⁶ dx = π[x⁷/7]₀¹ = π/7.",
      "Square x³ to get x⁶, then integrate."
    ),
    calcTyped(
      "y12e2-vor-m3",
      "Rotate $y = 1/x$ about the $x$-axis from $x = 1$ to $x = 3$. Find the exact volume.",
      "",
      "2pi/3",
      [],
      "V = π∫₁³ x⁻² dx = π[−1/x]₁³ = π(−1/3 − (−1)) = π(2/3) = 2π/3.",
      "Square 1/x to get 1/x², then use the power rule."
    ),
    calcChoice(
      "y12e2-vor-m4",
      "The region bounded by $y = x$ and $y = x^2$ is rotated about the $x$-axis. Which correctly identifies the outer and inner radii?",
      "B",
      [
        "Outer: $x^2$; inner: $x$",
        "Outer: $x$; inner: $x^2$ for $0 \\le x \\le 1$",
        "Outer: $x^2$; inner: $0$",
        "There is no washer — only a disk",
      ],
      "On 0 ≤ x ≤ 1, the line y = x lies above the parabola y = x². So y = x is the outer radius and y = x² is the inner radius.",
      "Check which curve is further from the x-axis on the interval [0,1].",
      lineVsParabolaUnitGraph
    ),
    calcTyped(
      "y12e2-vor-m5",
      "Rotate $y = \\sqrt{4-x^2}$ about the $x$-axis from $x = 0$ to $x = 2$. Find the exact volume.",
      "",
      "16pi/3",
      [],
      "V = π∫₀²(4−x²) dx = π[4x − x³/3]₀² = π(8 − 8/3) = π(16/3) = 16π/3.",
      "Square √(4−x²) to get 4−x², then integrate.",
      quarterCircleGraph
    ),
    calcTyped(
      "y12e2-vor-m6",
      "Rotate $y = e^x$ about the $x$-axis from $x = 0$ to $x = 1$. Find the exact volume.",
      "",
      "pi*(e^2-1)/2",
      ["(pi/2)*(e^2-1)", "pi(e^2-1)/2"],
      "V = π∫₀¹ e^{2x} dx = π[e^{2x}/2]₀¹ = π(e²/2 − 1/2) = π(e²−1)/2.",
      "Square eˣ to get e^{2x}, then integrate: ∫e^{2x} dx = e^{2x}/2."
    ),
    calcTyped(
      "y12e2-vor-m7",
      "Rotate $y = \\sin x$ about the $x$-axis from $x = 0$ to $x = \\pi$. Find the exact volume.",
      "",
      "pi^2/2",
      [],
      "V = π∫₀π sin²x dx = π∫₀π(1−cos2x)/2 dx = π[x/2 − sin2x/4]₀π = π(π/2) = π²/2.",
      "Use sin²x = (1−cos2x)/2 to reduce the power before integrating."
    ),
    calcTyped(
      "y12e2-vor-m8",
      "Rotate $y = x$ about the $y$-axis from $y = 0$ to $y = 2$. Find the exact volume.",
      "",
      "8pi/3",
      [],
      "From y = x, x = y so x² = y². V = π∫₀² y² dy = π[y³/3]₀² = 8π/3.",
      "Express x in terms of y: x = y. Then integrate [x(y)]² = y² from y=0 to y=2.",
      yEqualsXTriangleGraph
    ),
    calcChoice(
      "y12e2-vor-m9",
      "A student rotates $y = x^2$ about the $x$-axis from $x = 0$ to $x = 2$ and gets $V = \\pi\\displaystyle\\int_0^2 x^2\\,dx = \\frac{8\\pi}{3}$. What is the error?",
      "C",
      [
        "The limits are wrong",
        "The $\\pi$ factor is missing",
        "The function should be squared: $[f(x)]^2 = x^4$ not $x^2$",
        "There is no error",
      ],
      "The disk formula requires [f(x)]². Here f(x) = x², so [f(x)]² = x⁴, not x². The correct integral is π∫₀² x⁴ dx = 32π/5.",
      "Always square f(x) before integrating — the student integrated f(x) = x² instead of [f(x)]² = x⁴."
    ),
    calcTyped(
      "y12e2-vor-m10",
      "The region between $y = \\sqrt{x}$ and $y = x/2$ (intersecting at $x = 0$ and $x = 4$) is rotated about the $x$-axis. Find the exact volume.",
      "",
      "8pi/3",
      [],
      "Outer: √x (since √x > x/2 for 0 < x < 4). Outer² = x, inner² = x²/4. V = π∫₀⁴(x − x²/4) dx = π[x²/2 − x³/12]₀⁴ = π(8 − 64/12) = π(8 − 16/3) = 8π/3.",
      "Check which curve is larger on (0,4), set up outer² − inner², then integrate.",
      sqrtVsHalfXGraph
    ),
  ],
};

// ─── Export ───────────────────────────────────────────────────────────────────

export function year12Extension2CalculusLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-2") return undefined;
  if (unit.slug !== "calculus") return undefined;

  const base = { masteryPassMark: 0.8 };

  switch (lesson.slug) {
    case "advanced-integration-method-selection":
      return { ...base, ...methodSelectionLesson };
    case "integration-by-parts-extension":
      return { ...base, ...integrationByPartsLesson };
    case "reduction-formulae-introduction":
      return { ...base, ...reductionFormulaeLesson };
    case "partial-fractions-integration":
      return { ...base, ...partialFractionsLesson };
    case "t-substitution-weierstrass":
      return { ...base, ...tSubstitutionLesson };
    case "trig-identity-integration":
      return { ...base, ...trigIdentityIntegrationLesson };
    case "completing-square-integration":
      return { ...base, ...completingSquareIntegrationLesson };
    case "partial-fractions-quadratic":
      return { ...base, ...partialFractionsQuadraticLesson };
    case "volumes-of-revolution":
      return { ...base, ...volumesOfRevolutionLesson };
    default:
      return undefined;
  }
}
