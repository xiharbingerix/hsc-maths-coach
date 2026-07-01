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

const furtherCalculusRevision: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Activate the prior differentiation and integration skills needed for Further Calculus: the chain, product, and quotient rules; power-reduction identities sin²x and cos²x; and integration by substitution.",
  learningIntention:
    "Apply the chain, product, and quotient rules to differentiate composite and combined functions; use power-reduction identities to simplify trig integrals; and evaluate integrals by u-substitution.",
  successCriteria: [
    "Apply the chain rule d/dx[f(g(x))] = f'(g(x)) · g'(x).",
    "Apply the product rule (uv)' = u'v + uv'.",
    "Apply the quotient rule (u/v)' = (u'v − uv') / v².",
    "Rewrite sin²x and cos²x using the double-angle identities.",
    "Change variables under an integral using u-substitution.",
  ],
  teaching: {
    paragraphs: [
      "Further Calculus skills extend Year 12 Advanced differentiation and integration to composite, product, and quotient structures. These three rules are the workhorses of differentiation: chain, product, and quotient. If you can apply them fluently, the new Ext 1 techniques (parametric derivatives, inverse trig derivatives) follow naturally.",
      "Chain rule: $\\frac{d}{dx}[f(g(x))]=f'(g(x))\\cdot g'(x)$ — differentiate the outer function (evaluated at the inner), then multiply by the inner derivative. Product rule: $(uv)'=u'v+uv'$ — sum the two cross-terms. Quotient rule: $\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}$ — numerator minus denominator cross-terms, divided by the denominator squared.",
      "Two essential power-reduction identities come from the double-angle formula $\\cos 2x = 1-2\\sin^2 x$ (rearranged: $\\sin^2 x=\\frac{1-\\cos 2x}{2}$) and $\\cos 2x = 2\\cos^2 x-1$ (rearranged: $\\cos^2 x=\\frac{1+\\cos 2x}{2}$). They convert a squared trig function into a form that can be integrated directly.",
      "Integration by substitution: let $u=g(x)$, so $du=g'(x)\\,dx$. The integral $\\int f(g(x))\\,g'(x)\\,dx$ becomes $\\int f(u)\\,du = F(u)+C = F(g(x))+C$. The key skill is spotting that $g'(x)$ is already present as a factor.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}[f(g(x))]=f'(g(x))\\cdot g'(x),\\quad(uv)'=u'v+uv',\\quad\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}",
      "\\sin^2 x=\\frac{1-\\cos 2x}{2},\\qquad\\cos^2 x=\\frac{1+\\cos 2x}{2}",
      "\\int f(g(x))\\,g'(x)\\,dx=F(g(x))+C\\quad\\text{(substitution }u=g(x)\\text{)}",
    ],
  },
  workedExamples: [
    {
      title: "Chain rule — composite function",
      questionLatex: "\\text{Differentiate }y=\\sin(3x^2).",
      steps: [
        {
          explanation:
            "Identify the outer function f(u) = sin(u) and inner function g(x) = 3x². Apply the chain rule.",
          latex:
            "\\frac{dy}{dx}=\\cos(3x^2)\\cdot 6x=6x\\cos(3x^2)",
        },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=6x\\cos(3x^2)",
    },
    {
      title: "Integration by substitution",
      questionLatex: "\\text{Find }\\int 2x\\cos(x^2)\\,dx.",
      steps: [
        {
          explanation:
            "Let u = x², so du = 2x dx. The factor 2x is already present.",
          latex:
            "\\int 2x\\cos(x^2)\\,dx=\\int\\cos(u)\\,du=\\sin(u)+C",
        },
        {
          explanation: "Substitute back u = x².",
          latex: "=\\sin(x^2)+C",
        },
      ],
      finalAnswerLatex: "\\int 2x\\cos(x^2)\\,dx=\\sin(x^2)+C",
    },
  ],
  guidedPractice: [
    // g1 — MCQ
    choice(
      "y12e1-fcr-g1",
      "The chain rule states that d/dx[f(g(x))] =",
      "B",
      [
        "f'(x) · g'(x)",
        "f'(g(x)) · g'(x)",
        "f(g'(x))",
        "f'(x) + g'(x)",
      ],
      "The chain rule requires differentiating the outer function evaluated at the inner function, then multiplying by the inner derivative: f'(g(x)) · g'(x).",
      "\\text{Choose the best option.}",
      "Differentiate the outer, then multiply by the derivative of the inner."
    ),
    // g2 — typed
    answer(
      "y12e1-fcr-g2",
      "Differentiate y = (3x + 2)⁴ and evaluate dy/dx at x = 0.",
      "",
      "96",
      "dy/dx = 12(3x+2)³. At x = 0: 12(2)³ = 12 × 8 = 96.",
      ["96"],
      "Apply chain rule: 4(outer)³ × derivative of (3x+2). Then substitute x = 0."
    ),
    // g3 — typed
    answer(
      "y12e1-fcr-g3",
      "Using the product rule, differentiate y = x · eˣ and evaluate dy/dx at x = 0.",
      "",
      "1",
      "dy/dx = eˣ + x·eˣ = (1+x)eˣ. At x = 0: (1+0)e⁰ = 1.",
      ["1"],
      "Product rule: (u·v)' = u'v + uv'. Here u = x, v = eˣ."
    ),
    // g4 — typed
    answer(
      "y12e1-fcr-g4",
      "Express cos²(x) in terms of cos(2x) using the power-reduction identity.",
      "",
      "(1+cos(2x))/2",
      "cos²x = (1 + cos 2x)/2. This comes from rearranging cos 2x = 2cos²x − 1.",
      ["(1+cos(2x))/2", "(1+cos2x)/2"],
      "Start from cos 2x = 2cos²x − 1 and solve for cos²x."
    ),
  ],
  independentPractice: [
    // i1 — typed, D2
    answer(
      "y12e1-fcr-i1",
      "Differentiate y = cos(5x). Write dy/dx.",
      "",
      "-5sin(5x)",
      "Chain rule: outer = cos, inner = 5x. dy/dx = −sin(5x) × 5 = −5sin(5x).",
      ["-5sin(5x)", "-5sin5x"],
      "cos differentiates to −sin; multiply by the inner derivative 5."
    ),
    // i2 — typed, D2
    answer(
      "y12e1-fcr-i2",
      "If ∫cos²(x) dx = x/2 + A · sin(2x)/4 + C, find A using the power-reduction identity.",
      "",
      "1",
      "∫cos²x dx = ∫(1+cos2x)/2 dx = x/2 + sin(2x)/4 + C. The coefficient A = 1.",
      ["1"],
      "Substitute the power-reduction identity and integrate term by term."
    ),
    // i3 — typed, D2
    answer(
      "y12e1-fcr-i3",
      "Using the quotient rule, differentiate y = x / cos(x) and evaluate dy/dx at x = 0.",
      "",
      "1",
      "Quotient rule: u = x, v = cos x, u' = 1, v' = −sin x. dy/dx = (cos x + x·sin x)/cos²x. At x = 0: (1 + 0)/1 = 1.",
      ["1"],
      "Apply (u/v)' = (u'v − uv')/v² then substitute x = 0."
    ),
    // i4 — MCQ, D3
    choice(
      "y12e1-fcr-i4",
      "The product rule states (uv)' =",
      "B",
      ["u'v'", "u'v + uv'", "uv'", "u' + v'"],
      "The product rule is (uv)' = u'v + uv' — differentiate each factor in turn, keeping the other factor fixed, and add.",
      "\\text{Choose the best option.}",
      "Differentiate each factor while holding the other constant, then add the two results."
    ),
    // i5 — typed, D3
    answer(
      "y12e1-fcr-i5",
      "If ∫2cos(2x) dx = A · sin(2x) + C, find A using substitution u = 2x.",
      "",
      "1",
      "Let u = 2x, du = 2dx. ∫2cos(2x) dx = ∫cos(u) du = sin(u) + C = sin(2x) + C. So A = 1.",
      ["1"],
      "The factor 2 in the integrand matches du = 2 dx exactly."
    ),
  ],
  masteryQuiz: [
    // m1 — typed, D3
    answer(
      "y12e1-fcr-m1",
      "Differentiate y = e^(3x). Write dy/dx.",
      "",
      "3e^(3x)",
      "Chain rule: outer = eᵘ (self-derivative), inner = 3x (derivative = 3). So dy/dx = 3e^(3x).",
      ["3e^(3x)", "3e^{3x}"]
    ),
    // m2 — MCQ, D3
    choice(
      "y12e1-fcr-m2",
      "sin²(x) equals:",
      "B",
      [
        "(1 + cos 2x)/2",
        "(1 − cos 2x)/2",
        "2 sin(x) cos(x)",
        "1 − cos x",
      ],
      "sin²x = (1 − cos 2x)/2. This comes from the identity cos 2x = 1 − 2sin²x, rearranged. Option C is sin 2x, not sin²x."
    ),
    // m3 — typed, D3
    answer(
      "y12e1-fcr-m3",
      "Differentiate y = (x² + 1)³ using the chain rule. Evaluate dy/dx at x = 1.",
      "",
      "24",
      "dy/dx = 6x(x²+1)². At x = 1: 6(1)(2)² = 6 × 4 = 24.",
      ["24"]
    ),
    // m4 — typed, D3
    answer(
      "y12e1-fcr-m4",
      "If ∫sin(3x) dx = A · cos(3x) + C, find A using substitution.",
      "",
      "-1/3",
      "Let u = 3x, du = 3dx. ∫sin(3x) dx = (1/3)∫sin(u) du = −(1/3)cos(u) + C = −(1/3)cos(3x) + C. So A = −1/3.",
      ["-1/3"]
    ),
    // m5 — MCQ, D4
    choice(
      "y12e1-fcr-m5",
      "The quotient rule states d/dx[u/v] =",
      "B",
      [
        "(u'v' + uv') / v²",
        "(u'v − uv') / v²",
        "(uv' − u'v) / v²",
        "u'/v'",
      ],
      "(u/v)' = (u'v − uv') / v². A helpful mnemonic: 'low d-high minus high d-low, over the square of what's below.'"
    ),
    // m6 — typed, D4
    answer(
      "y12e1-fcr-m6",
      "Using the product rule, differentiate y = x² · eˣ and evaluate dy/dx at x = 0.",
      "",
      "0",
      "dy/dx = 2x·eˣ + x²·eˣ = x(2+x)eˣ. At x = 0: 0(2)(1) = 0.",
      ["0"]
    ),
    // m7 — typed, D4
    answer(
      "y12e1-fcr-m7",
      "If ∫sin²(x) dx = x/2 − A · sin(2x)/4 + C, find A using the power-reduction identity.",
      "",
      "1",
      "∫sin²x dx = ∫(1−cos2x)/2 dx = x/2 − sin(2x)/4 + C. So A = 1.",
      ["1"]
    ),
    // m8 — typed, D5
    answer(
      "y12e1-fcr-m8",
      "Differentiate y = ln(x² + 4) using the chain rule. Evaluate dy/dx at x = 0.",
      "",
      "0",
      "Chain rule: outer = ln(u), inner = x²+4. dy/dx = (1/(x²+4)) × 2x = 2x/(x²+4). At x = 0: 0/4 = 0.",
      ["0"]
    ),
    // m9 — typed, D5
    answer(
      "y12e1-fcr-m9",
      "Differentiate y = tan(x) = sin(x)/cos(x) using the quotient rule. Evaluate dy/dx at x = 0.",
      "",
      "1",
      "Quotient rule: u = sin x, v = cos x. dy/dx = (cos²x + sin²x)/cos²x = 1/cos²x. At x = 0: 1/1 = 1.",
      ["1"]
    ),
    // m10 — typed, D5
    answer(
      "y12e1-fcr-m10",
      "Using substitution u = x² + 1, find ∫2x(x² + 1)⁴ dx. The result is A(x² + 1)⁵ + C. Find A.",
      "",
      "1/5",
      "Let u = x²+1, du = 2x dx. ∫u⁴ du = u⁵/5 + C = (x²+1)⁵/5 + C. So A = 1/5.",
      ["1/5"]
    ),
  ],
};

export function year12Extension1FurtherCalculusRevisionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (
    course.slug === "year-12-extension-1" &&
    unit.slug === "further-calculus" &&
    lesson.slug === "further-calculus-revision"
  ) {
    return furtherCalculusRevision;
  }
  return undefined;
}
