import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Analyse the structure of the integrand before selecting a method."
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
  };
}

function calcTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Set up the expression carefully, then simplify."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

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
      "x·cos(x) is a product of a polynomial and a trigonometric function. LIATE: Algebraic before Trigonometric, so choose u = x and apply integration by parts.",
      "Look for a product of two different function families."
    ),
    calcChoice(
      "y12e2-meth-g2",
      "Which method best applies to $\\int \\frac{1}{(x-1)(x+3)}\\,dx$?",
      "B",
      [
        "Standard form",
        "Partial fractions",
        "Substitution",
        "Integration by parts",
      ],
      "The denominator has two distinct linear factors, so decompose into partial fractions A/(x−1) + B/(x+3) before integrating.",
      "Factor the denominator and check for linear factors."
    ),
    calcChoice(
      "y12e2-meth-g3",
      "Which method best applies to $\\int \\frac{4x}{x^2+4}\\,dx$?",
      "C",
      [
        "Partial fractions",
        "Integration by parts",
        "Substitution",
        "Trigonometric identity",
      ],
      "4x is twice the derivative of x²+4. Substitution u = x²+4, du = 2x dx converts the integral to 2∫du/u.",
      "Check whether the numerator is proportional to the derivative of the denominator."
    ),
    calcChoice(
      "y12e2-meth-g4",
      "Which method best applies to $\\int \\sin^2(x)\\,dx$?",
      "D",
      [
        "Substitution",
        "Integration by parts",
        "Partial fractions",
        "Trigonometric identity",
      ],
      "Apply sin²(x) = (1 − cos(2x))/2 to reduce the power, then integrate each term as a standard form.",
      "A power of a single trig function calls for a half-angle identity."
    ),
  ],
  independentPractice: [
    calcChoice(
      "y12e2-meth-i1",
      "Which method best applies to $\\int x^3 e^x\\,dx$?",
      "A",
      [
        "Integration by parts, applied repeatedly",
        "Substitution",
        "Partial fractions",
        "Standard form",
      ],
      "A polynomial cubed times an exponential requires repeated integration by parts — three applications reduce x³ to a constant.",
      "Identify the two function families in the product."
    ),
    calcChoice(
      "y12e2-meth-i2",
      "Which method best applies to $\\int \\cos(x^2)\\cdot 2x\\,dx$?",
      "B",
      [
        "Integration by parts",
        "Substitution",
        "Partial fractions",
        "Standard form",
      ],
      "2x is the derivative of x², so substitution u = x² converts this to ∫cos(u)du = sin(u) + C.",
      "Check whether a factor of the integrand is the derivative of an inner function."
    ),
    calcChoice(
      "y12e2-meth-i3",
      "Which method best applies to $\\int \\frac{1}{x^2-9}\\,dx$?",
      "C",
      [
        "Standard form",
        "Substitution",
        "Partial fractions",
        "Integration by parts",
      ],
      "x² − 9 = (x − 3)(x + 3): two distinct linear factors → partial fractions with A/(x−3) + B/(x+3).",
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
    calcChoice(
      "y12e2-meth-i5",
      "Which method best applies to $\\int \\cos^4(x)\\,dx$?",
      "D",
      [
        "Substitution",
        "Integration by parts",
        "Partial fractions",
        "Trigonometric identity",
      ],
      "Repeated use of cos²(x) = (1 + cos(2x))/2 reduces cos⁴(x) = ((1 + cos(2x))/2)² to terms that can be integrated as standard forms.",
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
      mistake: "Integrating sin²(x) or cos²(x) without first applying the half-angle identity.",
      fix: "Always reduce powers of sin or cos using the identity before integrating.",
    },
  ],
  masteryQuiz: [
    calcChoice(
      "y12e2-meth-m1",
      "Which method best applies to $\\int x^3 e^x\\,dx$?",
      "B",
      [
        "Substitution",
        "Integration by parts, applied repeatedly",
        "Partial fractions",
        "Standard form",
      ],
      "Polynomial × exponential → repeated integration by parts. x³ has degree 3, so three applications are needed.",
      "Count the degree of the polynomial — that is how many times by parts must be applied."
    ),
    calcChoice(
      "y12e2-meth-m2",
      "Which method best applies to $\\int \\frac{1}{(x-1)(x+2)}\\,dx$?",
      "A",
      [
        "Partial fractions",
        "Substitution",
        "Integration by parts",
        "Standard form",
      ],
      "Two distinct linear factors in the denominator → partial fractions A/(x−1) + B/(x+2).",
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
    calcChoice(
      "y12e2-meth-m4",
      "Which method best applies to $\\int \\cos^2(x)\\,dx$?",
      "C",
      [
        "Substitution",
        "Integration by parts",
        "Trigonometric identity",
        "Partial fractions",
      ],
      "Apply cos²(x) = (1 + cos(2x))/2, then integrate each term: x/2 + sin(2x)/4 + C.",
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
      "2x is exactly the derivative of x²+1, so u = x²+1 converts ∫2x(x²+1)⁵dx to ∫u⁵du — a simple power form.",
      "The substitution works when a factor equals the derivative of the inner expression."
    ),
    calcTyped(
      "y12e2-meth-m6",
      "For $\\int 2x e^{x^2}\\,dx$, write the substitution that simplifies the integral.",
      "\\int 2x e^{x^2}\\,dx,\\quad u=\\,?",
      "x^2",
      ["x²"],
      "With u = x², du = 2x dx. The integral becomes ∫eᵘ du = eᵘ + C = e^(x²) + C.",
      "Look for a factor proportional to the derivative of the exponent."
    ),
    calcChoice(
      "y12e2-meth-m7",
      "Which method best applies to $\\int \\frac{x+1}{x^2+2x+3}\\,dx$?",
      "D",
      [
        "Partial fractions",
        "Integration by parts",
        "Standard form",
        "Substitution",
      ],
      "The derivative of x²+2x+3 is 2x+2 = 2(x+1), so the numerator x+1 is half the derivative. Substitution u = x²+2x+3 gives ∫du/(2u) = (1/2)ln|u| + C.",
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
      "In ∫x/(x²+1)dx, the numerator x is proportional to the derivative of x²+1 (which is 2x). Substitution u = x²+1 is simpler.",
      "Substitution works when the numerator is the derivative of the denominator."
    ),
    calcTyped(
      "y12e2-meth-m9",
      "For $\\int \\cos(5x)\\,dx = \\frac{\\sin(5x)}{k}+C$, find $k$.",
      "\\int \\cos(5x)\\,dx=\\frac{\\sin(5x)}{k}+C",
      "5",
      [],
      "Integrating cos(5x) is a standard form: the result is sin(5x) divided by the coefficient of x, which is 5. So k = 5.",
      "For ∫cos(ax)dx, divide the result sin(ax) by a."
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
      "The derivative of x³+1 is 3x², so x² is one-third the derivative. Substitution u = x³+1 gives (1/3)∫du/u = (1/3)ln|u| + C.",
      "Compare the numerator with the derivative of the denominator."
    ),
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
      "A reduction formula expresses Iₙ in terms of lower-index values I_{n-1} or I_{n-2}. Once a base case is known, successive values can be found by substitution.",
      "Reduction formulae are derived using integration by parts. In this lesson the formula is supplied; you focus on applying and iterating it correctly.",
      "Two standard families appear in Extension 2 HSC: Iₙ = ∫₀¹ xⁿeˣ dx satisfies Iₙ = e − n·I_{n-1} with base case I₀ = e − 1. The sine-power family Iₙ = ∫₀^(π/2) sinⁿ(x)dx satisfies Iₙ = ((n−1)/n)·I_{n-2} with I₀ = π/2 and I₁ = 1.",
      "For Iₙ = ((n−1)/n)·I_{n-2}, note that even-index and odd-index values form independent chains. Even values require I₀; odd values require I₁.",
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
      "I_n=e-n\\,I_{n-1},\\quad I_0=e-1",
      "1",
      [],
      "Substitute n = 1: I₁ = e − 1·(e−1) = e − e + 1 = 1.",
      "Substitute n = 1 directly into the reduction formula."
    ),
    calcTyped(
      "y12e2-red-g2",
      "Using $I_n = e - n\\,I_{n-1}$ and $I_1 = 1$, find $I_2$.",
      "I_n=e-n\\,I_{n-1},\\quad I_1=1",
      "e-2",
      ["e - 2"],
      "Substitute n = 2: I₂ = e − 2·I₁ = e − 2·1 = e − 2.",
      "Substitute n = 2 and the known value I₁ = 1."
    ),
    calcTyped(
      "y12e2-red-g3",
      "Given $I_n = \\frac{n-1}{n}\\,I_{n-2}$ with $I_0 = \\frac{\\pi}{2}$, find $I_2$.",
      "I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_0=\\frac{\\pi}{2}",
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
      "I_n=e-n\\,I_{n-1},\\quad I_2=e-2",
      "6-2e",
      ["6 - 2e", "-2e+6"],
      "Substitute n = 3: I₃ = e − 3·I₂ = e − 3(e−2) = e − 3e + 6 = 6 − 2e.",
      "Substitute n = 3 and I₂ = e − 2 into the formula."
    ),
    calcTyped(
      "y12e2-red-i2",
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$, $I_0=\\frac{\\pi}{2}$, $I_2=\\frac{\\pi}{4}$, find $I_4$.",
      "I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_2=\\frac{\\pi}{4}",
      "3pi/16",
      ["3π/16", "3*pi/16"],
      "Substitute n = 4: I₄ = (3/4)·I₂ = (3/4)·(π/4) = 3π/16.",
      "Substitute n = 4 and I₂ = π/4 into the formula."
    ),
    calcTyped(
      "y12e2-red-i3",
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$ with $I_1=1$, find $I_3$.",
      "I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_1=1",
      "2/3",
      [],
      "Substitute n = 3: I₃ = (2/3)·I₁ = (2/3)·1 = 2/3.",
      "Substitute n = 3 and I₁ = 1 into the formula."
    ),
    calcTyped(
      "y12e2-red-i4",
      "Given $I_0=e^x+C$ and $I_n=x^n e^x-n\\,I_{n-1}$, in $I_2=e^x(x^2+ax+b)+C$, find $a$.",
      "I_2=e^x(x^2+ax+b)+C",
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
      "I_n=e-n\\,I_{n-1},\\quad I_3=6-2e",
      "9e-24",
      ["9e - 24"],
      "I₄ = e − 4·I₃ = e − 4(6−2e) = e − 24 + 8e = 9e − 24.",
      "Substitute n = 4 and I₃ = 6 − 2e into the formula."
    ),
    calcTyped(
      "y12e2-red-m2",
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$ and $I_4=\\frac{3\\pi}{16}$, find $I_6$.",
      "I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_4=\\frac{3\\pi}{16}",
      "5pi/32",
      ["5π/32", "5*pi/32"],
      "I₆ = (5/6)·I₄ = (5/6)·(3π/16) = 15π/96 = 5π/32.",
      "Substitute n = 6 and I₄ = 3π/16 into the formula, then simplify."
    ),
    calcTyped(
      "y12e2-red-m3",
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$ with $I_3=\\frac{2}{3}$, find $I_5$.",
      "I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_3=\\frac{2}{3}",
      "8/15",
      [],
      "I₅ = (4/5)·I₃ = (4/5)·(2/3) = 8/15.",
      "Substitute n = 5 and I₃ = 2/3 into the formula."
    ),
    calcTyped(
      "y12e2-red-m4",
      "Given $I_0=e^x+C$ and $I_n=x^n e^x-n\\,I_{n-1}$, in $I_2=e^x(x^2+ax+b)+C$, find $b$.",
      "I_2=e^x(x^2+ax+b)+C",
      "2",
      [],
      "I₂ = eˣ(x²−2x+2)+C, so b = 2. This comes from the constant term after two by-parts steps.",
      "Complete both by-parts steps and read off the constant term in the bracket."
    ),
    calcTyped(
      "y12e2-red-m5",
      "Given $I_2=e^x(x^2-2x+2)+C$, evaluate $\\int_0^1 x^2 e^x\\,dx$.",
      "\\bigl[e^x(x^2-2x+2)\\bigr]_0^1",
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
    calcTyped(
      "y12e2-red-m8",
      "Given $I_n=e-n\\,I_{n-1}$ with $I_0=e-1$, what is $1\\cdot I_0$ as it appears in the step for $I_1$?",
      "I_1=e-1\\cdot I_0,\\quad I_0=e-1",
      "e-1",
      ["e - 1"],
      "1·I₀ = 1·(e−1) = e−1. So I₁ = e − (e−1) = 1.",
      "Multiply the coefficient 1 by the value of I₀."
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
      "Given $I_n=\\frac{n-1}{n}\\,I_{n-2}$ and $I_6=\\frac{5\\pi}{32}$, find $I_8$.",
      "I_n=\\frac{n-1}{n}\\,I_{n-2},\\quad I_6=\\frac{5\\pi}{32}",
      "35pi/256",
      ["35π/256", "35*pi/256"],
      "I₈ = (7/8)·I₆ = (7/8)·(5π/32) = 35π/256.",
      "Substitute n = 8 and I₆ = 5π/32 into the formula."
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
    default:
      return undefined;
  }
}
