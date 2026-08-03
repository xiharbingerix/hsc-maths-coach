import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";

type QualityTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

type QualityPracticeQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

function expLogFeedback(prompt: string, latex: string, answer: string) {
  if (/integral|integrate|area/i.test(prompt)) {
    return `Identify whether the integrand has exponential form or the reciprocal pattern f'(x)/f(x), apply the matching reverse-chain factor, and include the constant or limits required. For ${latex || "the stated integrand"}, this gives ${answer}.`;
  }
  if (/gradient|tangent|stationary|concav/i.test(prompt)) {
    return `Differentiate the stated function first, then use the requested point or sign condition rather than substituting into the original function as a gradient. Applying that process to ${latex || "the given data"} gives ${answer}.`;
  }
  if (/dy\/dx|differentiat|derivative/i.test(prompt)) {
    return `Use the exponential or logarithmic derivative rule together with any required inner derivative. Preserve the original composite expression and simplify only after applying the chain rule; the result is ${answer}.`;
  }
  return `Select the exponential or logarithmic calculus relationship that matches the structure in ${latex || "the question"}, then apply it with its domain and constant factors intact. The required result is ${answer}.`;
}

function expLogHint(prompt: string) {
  if (/integral|integrate|area/i.test(prompt)) {
    return "Look for e^(ax+b) or an f'(x)/f(x) reciprocal pattern before integrating.";
  }
  if (/gradient|tangent|stationary|concav/i.test(prompt)) {
    return "Differentiate first, then apply the stated point, zero, or sign condition.";
  }
  return "Identify the inner function and multiply or divide by its derivative as appropriate.";
}

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: expLogHint(prompt),
    explanation: expLogFeedback(prompt, latex, answer),
  };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

function qualityAnswer({
  id,
  prompt,
  latex,
  answer,
  acceptedAnswers,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: string;
  acceptedAnswers: string[];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
  };
}

function qualityChoice({
  id,
  prompt,
  latex,
  answer,
  choices,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
  distractorMisconceptions,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: "A" | "B" | "C" | "D";
  choices: [string, string, string, string];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions: Partial<Record<"A" | "B" | "C" | "D", string>>;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
    distractorMisconceptions,
  };
}

// ─── L1: Differentiating Exponential Functions ────────────────────────────────

const deWorked: WorkedExample[] = [
  {
    title: "Differentiate y = e^(3x)",
    questionLatex: "y = e^{3x}",
    steps: [
      { explanation: "The function has the form e^(f(x)) where f(x) = 3x.", latex: "f(x)=3x,\\quad f'(x)=3" },
      { explanation: "Apply the chain rule: d/dx(e^(f(x))) = f'(x)·e^(f(x)).", latex: "\\frac{dy}{dx} = 3e^{3x}" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx} = 3e^{3x}",
  },
  {
    title: "Differentiate y = 5e^(2x−1) and evaluate the gradient at x = 0",
    questionLatex: "y = 5e^{2x-1}",
    steps: [
      { explanation: "The inner function is 2x − 1, which has derivative 2.", latex: "\\frac{d}{dx}(2x-1)=2" },
      { explanation: "Apply the chain rule.", latex: "\\frac{dy}{dx} = 5\\cdot 2e^{2x-1}=10e^{2x-1}" },
      { explanation: "Evaluate at x = 0.", latex: "\\left.\\frac{dy}{dx}\\right|_{x=0}=10e^{-1}=\\frac{10}{e}" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=10e^{2x-1};\\quad \\text{gradient at }x=0\\text{ is }\\frac{10}{e}",
  },
  {
    title: "Differentiate y = e^(x²)",
    questionLatex: "y = e^{x^2}",
    steps: [
      { explanation: "The inner function is x², with derivative 2x.", latex: "\\frac{d}{dx}(x^2)=2x" },
      { explanation: "Chain rule: multiply the outer derivative eˣ² by the inner derivative.", latex: "\\frac{dy}{dx}=2x\\,e^{x^2}" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=2xe^{x^2}",
  },
];

const deGuided: PracticeQuestion[] = [
  fa("y11adv-elc-de-g1", "Differentiate the exponential function.", "y = e^{4x}", "4e^(4x)", ["4e^{4x}"]),
  mc("y11adv-elc-de-g2", "What makes eˣ unique among all functions?", "B",
    [{ label: "A", text: "It is always positive" }, { label: "B", text: "It is its own derivative: d/dx(eˣ) = eˣ" }, { label: "C", text: "Its domain is x > 0" }, { label: "D", text: "Its integral is eˣ − 1" }],
    "eˣ is the unique function (up to scalar multiples) that equals its own derivative. This is why it appears throughout calculus and modelling.", ""),
  fa("y11adv-elc-de-g3", "Differentiate the exponential function.", "y = e^{-2x}", "-2e^(-2x)", ["-2e^{-2x}"]),
  mc("y11adv-elc-de-g4", "What is the gradient of y = e^(3x) at x = 0?", "C",
    [{ label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "3" }, { label: "D", text: "3e" }],
    "dy/dx = 3e^(3x). At x = 0: 3e⁰ = 3·1 = 3.", "y = e^{3x}"),
];

const deIndep: PracticeQuestion[] = [
  fa("y11adv-elc-de-i1", "Differentiate the exponential function.", "y = 4e^{5x}", "20e^(5x)", ["20e^{5x}"]),
  fa("y11adv-elc-de-i2", "Find dy/dx.", "y = e^{x^2+1}", "2xe^(x²+1)", ["2xe^{x^2+1}"]),
  mc("y11adv-elc-de-i3", "Find the gradient of y = e^(2x) at the point (0, 1).", "B",
    [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "2e" }, { label: "D", text: "e" }],
    "The chain rule gives dy/dx=2e^(2x). At x=0, the exponential factor is e⁰=1, so the tangent gradient is 2.", "y=e^{2x}"),
  fa("y11adv-elc-de-i4", "Differentiate the exponential function.", "y = 3e^{-x}", "-3e^(-x)", ["-3e^{-x}"]),
  mc("y11adv-elc-de-i5", "Which function satisfies f′(x) = f(x) and f(0) = 1?", "A",
    [{ label: "A", text: "$e^x$" }, { label: "B", text: "$e^{x+1}$" }, { label: "C", text: "$x^2+1$" }, { label: "D", text: "$\\ln x$" }],
    "Only f(x) = eˣ satisfies both conditions. f′(x) = eˣ = f(x) ✓, and f(0) = e⁰ = 1 ✓.", ""),
];

const deMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-elc-de-qm1",
    prompt: "Differentiate the exponential function.",
    latex: "y=e^{4x-1}",
    answer: "4e^(4x-1)",
    acceptedAnswers: ["4e^{4x-1}", "y'=4e^(4x-1)", "dy/dx=4e^{4x-1}"],
    hint: "Keep the exponential unchanged and multiply by the derivative of 4x-1.",
    explanation: "The outer exponential differentiates to itself, while the inner linear function 4x-1 has derivative 4. By the chain rule, y'=4e^(4x-1).",
    difficulty: 3,
    diagnosticIntent: "Checks direct chain-rule differentiation of an exponential with a linear exponent.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-elc-de-qm2",
    prompt: "Which derivative correctly includes the inner derivative?",
    latex: "y=e^{x^2+1}",
    answer: "C",
    choices: ["e^(2x+1)", "e^(x^2+1)", "2xe^(x^2+1)", "(x^2+1)e^(x^2)"],
    hint: "Differentiate x squared plus 1, then multiply by the original exponential.",
    explanation: "For y=e^(f(x)), the derivative is f'(x)e^(f(x)). Here f'(x)=2x, so y'=2xe^(x^2+1). Option C preserves the exponent and supplies the inner derivative.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses omission or corruption of the inner derivative for a nonlinear exponent.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Differentiates the exponent inside the exponential instead of multiplying outside.",
      B: "Differentiates only the outer exponential and omits the chain factor.",
      D: "Applies an unsupported product-like rule to the exponent.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-de-qm3",
    prompt: "Find the tangent gradient at x=0.",
    latex: "y=3e^{2x}",
    answer: "6",
    acceptedAnswers: ["m=6", "y'(0)=6", "gradient 6"],
    hint: "Differentiate to 6e^(2x), then use e^0=1.",
    explanation: "The derivative is y'=3×2e^(2x)=6e^(2x). At x=0, e^0=1, so y'(0)=6. The tangent gradient at the y-intercept is therefore 6.",
    difficulty: 3,
    diagnosticIntent: "Checks exponential differentiation followed by exact evaluation at zero.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-de-qm4",
    prompt: "A student obtains the displayed derivative. Which diagnosis is correct?",
    latex: "y=e^{3x+2},\\qquad y'=e^{3x+2}",
    answer: "B",
    choices: ["The exponent should decrease by one.", "The inner derivative 3 is missing.", "The constant 2 should be added outside.", "The exponential should become a logarithm."],
    hint: "Use the chain rule with inner function 3x+2.",
    explanation: "The exponential factor remains e^(3x+2), but the derivative of the inner function is 3. The missing chain factor makes the student's result incomplete; the correct derivative is 3e^(3x+2).",
    difficulty: 3,
    diagnosticIntent: "Diagnoses differentiation of only the outer exponential layer.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Misapplies the polynomial power rule to an exponential.",
      C: "Treats the exponent's constant as a separate derivative term.",
      D: "Confuses differentiation with inverse-function conversion.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-de-qm5",
    prompt: "Use the gradient condition to determine a.",
    latex: "f(x)=e^{ax},\\qquad f'(0)=7",
    answer: "a=7",
    acceptedAnswers: ["7", "a = 7", "7.0"],
    hint: "Differentiate to ae^(ax), then evaluate at zero.",
    explanation: "The derivative is f'(x)=ae^(ax). At x=0 this becomes f'(0)=a e^0=a. Since the measured gradient is 7, the exponent coefficient must be a=7.",
    difficulty: 4,
    diagnosticIntent: "Assesses reverse inference of an exponential rate parameter from a local gradient.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-elc-de-qm6",
    prompt: "For the family, find the relative growth rate F'_k(x)/F_k(x).",
    latex: "F_k(x)=e^{kx}",
    answer: "k",
    acceptedAnswers: ["F'_k/F_k=k", "k for all x", "relative rate k"],
    hint: "Differentiate F_k, then divide by the original function before simplifying.",
    explanation: "Differentiation gives F'_k(x)=ke^(kx). Dividing by F_k(x)=e^(kx) cancels the positive exponential factor, leaving F'_k/F_k=k for every x. The parameter is the constant relative growth rate.",
    difficulty: 4,
    diagnosticIntent: "Investigates the invariant relative rate that characterises exponential growth and decay.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-elc-de-qm7",
    prompt: "Find the tangent equation at x=0.",
    latex: "y=e^{2x}",
    answer: "y=2x+1",
    acceptedAnswers: ["y-1=2x", "y = 2x + 1", "2x-y+1=0"],
    hint: "At x=0 the point is (0,1) and the derivative value is 2.",
    explanation: "The curve passes through (0,1), and y'=2e^(2x) gives gradient 2 at x=0. Point-gradient form y-1=2(x-0) simplifies to y=2x+1.",
    difficulty: 4,
    diagnosticIntent: "Combines exponential differentiation, point evaluation, and tangent-line construction.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-de-qm8",
    prompt: "Which function satisfies both conditions?",
    latex: "y'=3y,\\qquad y(0)=2",
    answer: "D",
    choices: ["e^(3x)", "2e^x", "3e^(2x)", "2e^(3x)"],
    hint: "Use the differential equation to select the exponent rate, then use the initial value for the multiplier.",
    explanation: "A function Ae^(3x) has derivative 3Ae^(3x)=3y, so the exponent rate must be 3. The condition y(0)=A=2 fixes the multiplier, giving y=2e^(3x), option D.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses whether students coordinate relative growth rate with an initial condition.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses the correct rate but ignores the initial multiplier.",
      B: "Uses the initial multiplier but the wrong exponential rate.",
      C: "Confuses the derivative coefficient and exponent coefficient.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-de-qm9",
    prompt: "Reconstruct the exponential model.",
    latex: "y=Ae^{kx},\\qquad y(0)=3,\\qquad y'(0)=12",
    answer: "3e^(4x)",
    acceptedAnswers: ["y=3e^{4x}", "A=3,k=4", "3 exp(4x)"],
    hint: "The value at zero gives A; then y'(0)=Ak determines k.",
    explanation: "Since y(0)=A=3, the multiplier is fixed. Differentiation gives y'=Ake^(kx), so y'(0)=Ak=3k=12 and k=4. Therefore the model is y=3e^(4x).",
    difficulty: 5,
    diagnosticIntent: "Synthesises an initial value and initial gradient to reconstruct an exponential model.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-elc-de-qm10",
    prompt: "The function has a stationary maximum at x=4. Determine a.",
    latex: "f(x)=(x-a)e^{-x}",
    answer: "a=3",
    acceptedAnswers: ["3", "a = 3", "3.0"],
    hint: "Use the product rule and factor the positive exponential from f'(x).",
    explanation: "The product rule gives f'(x)=e^(-x)-(x-a)e^(-x)=e^(-x)(a+1-x). Since the exponential is never zero, stationarity occurs at x=a+1. Setting a+1=4 gives a=3; the sign changes from positive to negative, confirming a maximum.",
    difficulty: 5,
    diagnosticIntent: "Synthesises product differentiation, exponential positivity, stationarity, and classification.",
    taskType: "synthesis",
  }),
];

// ─── L2: Differentiating Logarithmic Functions ────────────────────────────────

const dlWorked: WorkedExample[] = [
  {
    title: "Differentiate y = ln(3x)",
    questionLatex: "y = \\ln(3x)",
    steps: [
      { explanation: "The inner function is f(x) = 3x, with f′(x) = 3.", latex: "f(x)=3x,\\quad f'(x)=3" },
      { explanation: "Apply the chain rule: d/dx(ln f(x)) = f′(x)/f(x).", latex: "\\frac{dy}{dx}=\\frac{3}{3x}=\\frac{1}{x}" },
      { explanation: "Note: ln(3x) = ln 3 + ln x, so d/dx(ln 3x) = 1/x — the constant disappears. This is always the case for ln(kx).", latex: "" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=\\frac{1}{x}",
  },
  {
    title: "Differentiate y = ln(x² + 1)",
    questionLatex: "y = \\ln(x^2+1)",
    steps: [
      { explanation: "Inner function: f(x) = x²+1, f′(x) = 2x.", latex: "f'(x)=2x" },
      { explanation: "Chain rule for log.", latex: "\\frac{dy}{dx}=\\frac{2x}{x^2+1}" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=\\frac{2x}{x^2+1}",
  },
  {
    title: "Differentiate y = 4 ln(2x − 5)",
    questionLatex: "y = 4\\ln(2x-5)",
    steps: [
      { explanation: "Inner function: 2x−5, derivative 2.", latex: "" },
      { explanation: "Chain rule, then multiply by the outer constant 4.", latex: "\\frac{dy}{dx}=4\\cdot\\frac{2}{2x-5}=\\frac{8}{2x-5}" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=\\frac{8}{2x-5}",
  },
];

const dlGuided: PracticeQuestion[] = [
  fa("y11adv-elc-dl-g1", "Differentiate the natural logarithm.", "y = \\ln x", "1/x", ["\\frac{1}{x}"]),
  mc("y11adv-elc-dl-g2", "Which expression is the derivative of ln(5x)?", "A",
    [{ label: "A", text: "$1/x$" }, { label: "B", text: "$5/x$" }, { label: "C", text: "$1/(5x)$" }, { label: "D", text: "$5\\ln x$" }],
    "ln(5x) = ln 5 + ln x. Differentiating: d/dx(ln 5) = 0, d/dx(ln x) = 1/x. So d/dx(ln 5x) = 1/x.", ""),
  fa("y11adv-elc-dl-g2b", "Find dy/dx.", "y = \\ln(x^2)", "2/x", ["\\frac{2}{x}"]),
  mc("y11adv-elc-dl-g3", "What is d/dx(ln(3x + 1))?", "C",
    [{ label: "A", text: "$\\ln 3$" }, { label: "B", text: "$1/(3x+1)$" }, { label: "C", text: "$3/(3x+1)$" }, { label: "D", text: "$3\\ln(3x+1)$" }],
    "Inner function 3x+1 has derivative 3. Chain rule: 3/(3x+1).", "y=\\ln(3x+1)"),
];

const dlIndep: PracticeQuestion[] = [
  fa("y11adv-elc-dl-i1", "Find dy/dx.", "y = \\ln(x^3)", "3/x", ["\\frac{3}{x}"]),
  fa("y11adv-elc-dl-i2", "Find dy/dx.", "y = 5\\ln(2x)", "5/x", ["\\frac{5}{x}"]),
  mc("y11adv-elc-dl-i3", "d/dx(ln(x² − 4)) at x = 3 equals:", "B",
    [{ label: "A", text: "1/5" }, { label: "B", text: "6/5" }, { label: "C", text: "2" }, { label: "D", text: "6" }],
    "d/dx(ln(x²−4)) = 2x/(x²−4). At x=3: 6/(9−4) = 6/5.", ""),
  fa("y11adv-elc-dl-i4", "Find dy/dx.", "y = \\ln(4x-3)", "4/(4x-3)", ["\\frac{4}{4x-3}"]),
  mc("y11adv-elc-dl-i5", "For y = ln x, on what domain is the function defined?", "C",
    [{ label: "A", text: "All real x" }, { label: "B", text: "$x \\geq 0$" }, { label: "C", text: "$x > 0$" }, { label: "D", text: "$x \\neq 0$" }],
    "ln x requires x > 0. The derivative 1/x also has this domain requirement.", ""),
];

const dlMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-elc-dl-qm1",
    prompt: "Differentiate the logarithmic function.",
    latex: "y=\\ln(x^2+1)",
    answer: "2x/(x^2+1)",
    acceptedAnswers: ["\\frac{2x}{x^2+1}", "y'=2x/(x^2+1)", "dy/dx=2x/(x^2+1)"],
    hint: "Use the derivative of the inside divided by the unchanged inside.",
    explanation: "For y=ln(f(x)), the derivative is f'(x)/f(x). Here f(x)=x^2+1 and f'(x)=2x, so y'=2x/(x^2+1). The positive denominator also shows the derivative is defined for every real x.",
    difficulty: 3,
    diagnosticIntent: "Checks direct logarithmic chain-rule differentiation with a quadratic inner function.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-elc-dl-qm2",
    prompt: "On which domain is the function and its derivative defined?",
    latex: "y=\\ln(3x-6)",
    answer: "C",
    choices: ["x≠2", "x≥2", "x>2", "all real x"],
    hint: "The logarithm's argument must be strictly positive.",
    explanation: "The condition 3x-6>0 gives x>2. Equality is excluded because ln(0) is undefined. The derivative 3/(3x-6)=1/(x-2) is considered only on that original logarithmic domain.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses confusion between a logarithm's positive-input domain and a reciprocal's nonzero domain.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses only the derivative denominator restriction and admits x<2.",
      B: "Allows the logarithm's argument to equal zero.",
      D: "Ignores the logarithmic domain restriction.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-dl-qm3",
    prompt: "Find the tangent gradient at x=1.",
    latex: "y=\\ln(2x+1)",
    answer: "2/3",
    acceptedAnswers: ["0.6666666667", "m=2/3", "y'(1)=2/3"],
    hint: "Differentiate to 2/(2x+1), then substitute x=1.",
    explanation: "The logarithmic chain rule gives y'=2/(2x+1). At x=1 the denominator is 3, so the tangent gradient is y'(1)=2/3.",
    difficulty: 3,
    diagnosticIntent: "Checks logarithmic differentiation followed by exact point evaluation.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-dl-qm4",
    prompt: "A student obtains the displayed derivative. Which diagnosis is correct?",
    latex: "y=\\ln(x^2),\\qquad y'=1/x^2",
    answer: "A",
    choices: ["The inner derivative 2x is missing; y'=2/x for x≠0.", "The logarithm should differentiate to e^(x^2).", "The exponent should decrease to x.", "The answer is correct on x>0."],
    hint: "Use f'(x)/f(x) with f(x)=x squared.",
    explanation: "The chain rule gives y'=(2x)/(x^2)=2/x. The original function ln(x^2) is defined for every x≠0, so the corrected derivative and domain are both needed. Option A states both.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses omission of the inner derivative and loss of the composite logarithm's domain.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Confuses logarithmic differentiation with exponentiation.",
      C: "Misapplies the polynomial power rule to the whole logarithm.",
      D: "Accepts the missing chain factor and unnecessarily restricts the domain.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-dl-qm5",
    prompt: "Use the gradient condition to determine a.",
    latex: "f(x)=\\ln(ax+1),\\qquad f'(0)=5",
    answer: "a=5",
    acceptedAnswers: ["5", "a = 5", "5.0"],
    hint: "Differentiate to a/(ax+1), then evaluate at zero.",
    explanation: "The derivative is f'(x)=a/(ax+1). At x=0 the denominator is 1, so f'(0)=a. Matching the given gradient gives a=5.",
    difficulty: 4,
    diagnosticIntent: "Assesses reverse inference of an inner logarithmic coefficient from a local gradient.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-elc-dl-qm6",
    prompt: "For k>0, find the derivative and explain why it is independent of k.",
    latex: "F_k(x)=\\ln(kx),\\qquad x>0",
    answer: "1/x",
    acceptedAnswers: ["F'_k(x)=1/x", "\\frac1x", "k/(kx)=1/x"],
    hint: "Differentiate by the chain rule or first split ln(kx) into a sum.",
    explanation: "The chain rule gives F'_k(x)=k/(kx)=1/x. Equivalently, ln(kx)=ln k+ln x and the constant ln k differentiates to zero. Thus every positive k gives the same derivative on x>0.",
    difficulty: 4,
    diagnosticIntent: "Investigates an invariant derivative across a parameterised logarithmic family.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-elc-dl-qm7",
    prompt: "Find the tangent equation at x=e.",
    latex: "y=\\ln x",
    answer: "y=x/e",
    acceptedAnswers: ["y-1=(1/e)(x-e)", "y = x/e", "ey=x"],
    hint: "The point is (e,1) and the derivative value there is 1/e.",
    explanation: "At x=e, the point is (e,1) and y'=1/x gives gradient 1/e. Point-gradient form y-1=(1/e)(x-e) simplifies because (1/e)e=1, leaving y=x/e.",
    difficulty: 4,
    diagnosticIntent: "Combines exact logarithmic values, derivative evaluation, and tangent-line simplification.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-dl-qm8",
    prompt: "Which derivative statement is fully correct, including the domain?",
    latex: "y=\\ln((x-1)^2)",
    answer: "D",
    choices: ["y'=1/(x-1)^2 for all x", "y'=2/(x-1) for x>1 only", "y'=2(x-1) for x≠1", "y'=2/(x-1) for x≠1"],
    hint: "Apply f'/f, simplify, then retain every input where the squared argument is positive.",
    explanation: "The derivative is 2(x-1)/(x-1)^2=2/(x-1). The logarithm's squared argument is positive for all x except x=1, so the full domain is x≠1. Option D includes both facts.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses both chain-rule simplification and the two-sided domain of a squared logarithmic argument.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Omits the inner derivative and ignores the excluded point.",
      B: "Uses the derivative correctly but discards the valid x<1 branch.",
      C: "Differentiates the inside but omits division by the logarithm's argument.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-dl-qm9",
    prompt: "Reconstruct the logarithmic function, where A>0 and b>0.",
    latex: "f(x)=A\\ln(bx),\\qquad f'(1)=3,\\qquad f(1)=0",
    answer: "3ln(x)",
    acceptedAnswers: ["f(x)=3\\ln x", "3 ln x", "A=3,b=1"],
    hint: "The derivative determines A; then the value condition determines b.",
    explanation: "Since f'(x)=A/x, the condition f'(1)=3 gives A=3. Then f(1)=3ln b=0, so ln b=0 and b=1. Therefore f(x)=3ln x.",
    difficulty: 5,
    diagnosticIntent: "Synthesises derivative invariance and a function value to reconstruct logarithmic parameters.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-elc-dl-qm10",
    prompt: "The function has a stationary minimum at x=4. Determine a.",
    latex: "f(x)=x-a\\ln x,\\qquad x>0,\\qquad a>0",
    answer: "a=4",
    acceptedAnswers: ["4", "a = 4", "4.0"],
    hint: "Differentiate to 1-a/x and solve the stationary condition.",
    explanation: "The derivative is f'(x)=1-a/x=(x-a)/x. Because x>0, it changes from negative to positive at x=a, so the stationary point is a minimum. Given that it occurs at x=4, a=4.",
    difficulty: 5,
    diagnosticIntent: "Synthesises logarithmic differentiation, domain-aware sign analysis, and parameter recovery.",
    taskType: "synthesis",
  }),
];

// ─── L3: Integrating Exponential Functions ────────────────────────────────────

const ieWorked: WorkedExample[] = [
  {
    title: "Find ∫e^(3x) dx",
    questionLatex: "\\int e^{3x}\\,dx",
    steps: [
      { explanation: "The antiderivative of e^(ax) is (1/a)e^(ax). Here a = 3.", latex: "\\int e^{3x}\\,dx = \\frac{1}{3}e^{3x}+C" },
      { explanation: "Check by differentiating: d/dx((1/3)e^(3x)) = (1/3)·3e^(3x) = e^(3x) ✓.", latex: "" },
    ],
    finalAnswerLatex: "\\frac{1}{3}e^{3x}+C",
  },
  {
    title: "Evaluate ∫₀¹ 2eˣ dx",
    questionLatex: "\\int_0^1 2e^x\\,dx",
    steps: [
      { explanation: "The antiderivative of 2eˣ is 2eˣ.", latex: "\\int 2e^x\\,dx=2e^x+C" },
      { explanation: "Evaluate between 0 and 1.", latex: "\\left[2e^x\\right]_0^1=2e^1-2e^0=2e-2" },
    ],
    finalAnswerLatex: "2e-2",
  },
  {
    title: "Find ∫(eˣ + e^(−x)) dx",
    questionLatex: "\\int (e^x+e^{-x})\\,dx",
    steps: [
      { explanation: "Integrate term by term.", latex: "" },
      { explanation: "∫eˣ dx = eˣ. For e^(−x): a = −1, so ∫e^(−x) dx = (1/(−1))e^(−x) = −e^(−x).", latex: "" },
      { explanation: "Combine.", latex: "e^x - e^{-x} + C" },
    ],
    finalAnswerLatex: "e^x-e^{-x}+C",
  },
];

const ieGuided: PracticeQuestion[] = [
  fa("y11adv-elc-ie-g1", "Find the integral.", "\\int e^{2x}\\,dx", "e^(2x)/2+C", ["\\frac{1}{2}e^{2x}+C", "(1/2)e^{2x}+C"]),
  mc("y11adv-elc-ie-g2", "Select the correct antiderivative of ∫3eˣ dx.", "C",
    [{ label: "A", text: "$3e^x/x+C$" }, { label: "B", text: "$3xe^x+C$" }, { label: "C", text: "$3e^x+C$" }, { label: "D", text: "$e^x+C$" }],
    "The antiderivative of eˣ is eˣ. The constant 3 carries through: ∫3eˣ dx = 3eˣ + C.", ""),
  fa("y11adv-elc-ie-g3", "Find the integral.", "\\int e^{-x}\\,dx", "-e^(-x)+C", ["-e^{-x}+C"]),
  mc("y11adv-elc-ie-g4", "Evaluate ∫₀¹ eˣ dx.", "B",
    [{ label: "A", text: "$1$" }, { label: "B", text: "$e-1$" }, { label: "C", text: "$e$" }, { label: "D", text: "$e+1$" }],
    "An antiderivative is eˣ. Applying the upper and lower limits gives [eˣ]₀¹ = e¹ − e⁰ = e − 1.", "\\int_0^1 e^x\\,dx"),
];

const ieIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ie-i1", "Find the integral.", "\\int e^{5x}\\,dx", "e^(5x)/5+C", ["(1/5)e^{5x}+C"]),
  fa("y11adv-elc-ie-i2", "Find the integral.", "\\int 6e^{3x}\\,dx", "2e^(3x)+C", ["2e^{3x}+C"]),
  mc("y11adv-elc-ie-i3", "Evaluate the definite integral ∫₀² e^(2x) dx exactly.", "C",
    [{ label: "A", text: "$e^4$" }, { label: "B", text: "$2e^4$" }, { label: "C", text: "$(e^4-1)/2$" }, { label: "D", text: "$e^4-1$" }],
    "[(1/2)e^(2x)]₀² = (1/2)e⁴ − (1/2)e⁰ = (e⁴−1)/2.", ""),
  fa("y11adv-elc-ie-i4", "Find the integral.", "\\int (2e^x + e^{-x})\\,dx", "2e^x - e^(-x)+C", ["2e^x-e^{-x}+C"]),
  mc("y11adv-elc-ie-i5", "Which expression equals the indefinite integral ∫e^(−2x) dx?", "D",
    [{ label: "A", text: "$e^{-2x}+C$" }, { label: "B", text: "$2e^{-2x}+C$" }, { label: "C", text: "$-e^{-2x}+C$" }, { label: "D", text: "$-e^{-2x}/2+C$" }],
    "a = −2, so ∫e^(−2x) dx = (1/(−2))e^(−2x) = −(1/2)e^(−2x) + C.", ""),
];

const ieMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-elc-ie-qm1",
    prompt: "Find the indefinite integral.",
    latex: "\\int e^{3x-1}\\,dx",
    answer: "(1/3)e^(3x-1)+C",
    acceptedAnswers: ["\\frac13e^{3x-1}+C", "e^(3x-1)/3+C", "(e^{3x-1})/3+C"],
    hint: "Divide by the constant inner derivative 3 and include the integration constant.",
    explanation: "Differentiating e^(3x-1) produces an extra factor 3, so integration must compensate by dividing by 3. Therefore the antiderivative is (1/3)e^(3x-1)+C.",
    difficulty: 3,
    diagnosticIntent: "Checks direct reverse-chain integration of an exponential with a linear exponent.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-elc-ie-qm2",
    prompt: "Which antiderivative has the correct sign and scale?",
    latex: "\\int e^{-2x}\\,dx",
    answer: "D",
    choices: ["2e^(-2x)+C", "e^(-2x)+C", "-2e^(-2x)+C", "-(1/2)e^(-2x)+C"],
    hint: "Differentiate each candidate mentally and look for exactly e^(-2x).",
    explanation: "The inner derivative is -2, so the compensating factor is -1/2. Differentiating -(1/2)e^(-2x) gives e^(-2x), making option D the only correct antiderivative.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses multiplication, sign, and reciprocal-scaling errors in exponential integration.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Multiplies by the inner derivative and loses the negative sign.",
      B: "Omits the reverse-chain factor entirely.",
      C: "Uses the correct sign but multiplies rather than divides by 2.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ie-qm3",
    prompt: "Evaluate the definite integral exactly.",
    latex: "\\int_0^1 2e^x\\,dx",
    answer: "2(e-1)",
    acceptedAnswers: ["2e-2", "2(e - 1)", "2e^1-2e^0"],
    hint: "Use antiderivative 2e^x and subtract its value at zero.",
    explanation: "An antiderivative is 2e^x. Evaluating at the limits gives 2e^1-2e^0=2e-2=2(e-1). The lower-limit contribution is 2, not zero.",
    difficulty: 3,
    diagnosticIntent: "Checks exact definite integration and correct use of e to the zero equals one.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ie-qm4",
    prompt: "A student writes the displayed antiderivative. Which diagnosis is correct?",
    latex: "\\int e^{5x}\\,dx=5e^{5x}+C",
    answer: "B",
    choices: ["The constant C should be omitted.", "The result should divide by 5, because differentiation multiplies by 5.", "The exponent should become 6x.", "The exponential should become a logarithm."],
    hint: "Differentiate the student's result and compare it with the original integrand.",
    explanation: "Differentiating 5e^(5x) gives 25e^(5x), not e^(5x). Since the chain rule introduces a factor 5, the antiderivative must divide by 5: (1/5)e^(5x)+C.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses failure to reverse the chain-rule scaling factor.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Rejects the required family constant for an indefinite integral.",
      C: "Treats integration as increasing an exponent coefficient.",
      D: "Confuses exponential integration with reciprocal integration.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ie-qm5",
    prompt: "Determine A from the stated antiderivative identity.",
    latex: "\\int Ae^{3x}\\,dx=4e^{3x}+C",
    answer: "A=12",
    acceptedAnswers: ["12", "A = 12", "12.0"],
    hint: "Differentiate the right-hand side and match its coefficient with the integrand.",
    explanation: "Differentiating 4e^(3x) gives 12e^(3x). Therefore the integrand coefficient must be A=12. Equivalently, integration would map A to A/3=4.",
    difficulty: 4,
    diagnosticIntent: "Assesses reverse coefficient inference through exponential antiderivative structure.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-elc-ie-qm6",
    prompt: "Compare the two exact integrals for a>0.",
    latex: "\\int_{-a}^{a}e^x\\,dx\\quad\\text{and}\\quad\\int_{-a}^{a}e^{-x}\\,dx",
    answer: "They are equal",
    acceptedAnswers: ["equal", "both equal e^a-e^(-a)", "same value"],
    hint: "Evaluate each integral or use the substitution x maps to negative x on the symmetric interval.",
    explanation: "The first integral is e^a-e^(-a). The second has antiderivative -e^(-x), giving -e^(-a)+e^a=e^a-e^(-a). Reflection across a symmetric interval leaves the total area unchanged.",
    difficulty: 4,
    diagnosticIntent: "Investigates symmetry under reflection for exponential accumulation.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-elc-ie-qm7",
    prompt: "Solve the initial-value problem.",
    latex: "F'(x)=2e^{3x},\\qquad F(0)=5",
    answer: "(2/3)e^(3x)+13/3",
    acceptedAnswers: ["F(x)=\\frac23e^{3x}+\\frac{13}{3}", "(2e^(3x)+13)/3", "2/3 e^(3x) + 13/3"],
    hint: "Integrate first, then use e^0=1 to determine the additive constant.",
    explanation: "Integration gives F(x)=(2/3)e^(3x)+C. The condition F(0)=5 gives 2/3+C=5, so C=13/3. Hence F(x)=(2/3)e^(3x)+13/3.",
    difficulty: 4,
    diagnosticIntent: "Combines reverse-chain integration with an initial condition and exact fractions.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ie-qm8",
    prompt: "Which evaluation of the proposed antiderivative is correct?",
    latex: "\\int e^{x^2}\\,dx\\stackrel{?}{=}\\frac{e^{x^2}}{2x}+C",
    answer: "C",
    choices: ["It is correct for x>0.", "It is correct after removing C.", "It is invalid: the inner derivative 2x is not a constant factor that can be divided out.", "It is invalid only at x=0 but correct elsewhere."],
    hint: "Differentiate the proposed quotient; dividing by a variable introduces extra terms.",
    explanation: "The simple rule applies to e^(ax+b) because the inner derivative is constant. For e^(x^2), the inner derivative 2x varies, and differentiating e^(x^2)/(2x) produces an additional quotient term. Option C identifies the structural failure.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses an invalid extension of reverse-chain scaling to a variable inner derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Assumes a domain restriction repairs a wrong differentiation identity.",
      B: "Treats the family constant as the source of the error.",
      D: "Recognises a singularity but misses the derivative mismatch for every nonzero x.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ie-qm9",
    prompt: "Determine A and reconstruct y.",
    latex: "y'=Ae^{2x},\\qquad y(0)=1,\\qquad y(1)=2e^2-1",
    answer: "y=2e^(2x)-1",
    acceptedAnswers: [
      "A=4, y=2e^{2x}-1",
      "A=4; y(x)=2e^(2x)-1",
      "A = 4 and y = 2e^(2x) - 1",
    ],
    hint: "Integrate using A/2, impose y(0), then use y(1) to determine A.",
    explanation: "Integration gives y=(A/2)e^(2x)+C. From y(0)=1, C=1-A/2. Using y(1)=2e^2-1 yields (A/2)(e^2-1)=2(e^2-1), so A=4 and C=-1.",
    difficulty: 5,
    diagnosticIntent: "Synthesises an exponential rate with two boundary values to reconstruct a model.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-elc-ie-qm10",
    prompt: "Reconstruct the accumulated-amount model.",
    latex: "Q(t)=\\int_0^t Ae^{-ks}\\,ds,\\qquad Q'(0)=5,\\qquad\\lim_{t\\to\\infty}Q(t)=10",
    answer: "Q(t)=10(1-e^(-t/2))",
    acceptedAnswers: ["A=5,k=1/2,Q=10(1-e^{-t/2})", "10-10e^(-t/2)", "Q(t)=10(1-e^{-0.5t})"],
    hint: "The initial rate gives A; the limiting total A/k gives k.",
    explanation: "By the Fundamental Theorem, Q'(0)=A=5. Integrating gives Q(t)=(A/k)(1-e^(-kt)), whose limiting value is A/k=10. Thus k=1/2 and Q(t)=10(1-e^(-t/2)).",
    difficulty: 5,
    diagnosticIntent: "Synthesises a rate integral, initial rate, limiting accumulation, and parameter reconstruction.",
    taskType: "synthesis",
  }),
];

// ─── L4: Integrating Reciprocal Functions ─────────────────────────────────────

const irWorked: WorkedExample[] = [
  {
    title: "Find ∫(1/x) dx",
    questionLatex: "\\int \\frac{1}{x}\\,dx",
    steps: [
      { explanation: "The power rule fails here: applying it to x^(−1) would give x⁰/0 = undefined.", latex: "" },
      { explanation: "Instead, use the known result: d/dx(ln|x|) = 1/x.", latex: "\\int \\frac{1}{x}\\,dx = \\ln|x|+C" },
      { explanation: "The absolute value is needed because ln is only defined for positive inputs, but 1/x is defined for x ≠ 0 (both positive and negative x).", latex: "" },
    ],
    finalAnswerLatex: "\\ln|x|+C",
  },
  {
    title: "Find ∫(2x/(x²+1)) dx",
    questionLatex: "\\int \\frac{2x}{x^2+1}\\,dx",
    steps: [
      { explanation: "The numerator (2x) is the derivative of the denominator (x²+1).", latex: "\\frac{d}{dx}(x^2+1)=2x" },
      { explanation: "This matches the pattern ∫(f′(x)/f(x)) dx = ln|f(x)| + C.", latex: "\\int \\frac{2x}{x^2+1}\\,dx = \\ln(x^2+1)+C" },
      { explanation: "No absolute value needed since x²+1 > 0 always.", latex: "" },
    ],
    finalAnswerLatex: "\\ln(x^2+1)+C",
  },
  {
    title: "Evaluate ∫₁ᵉ (1/x) dx",
    questionLatex: "\\int_1^e \\frac{1}{x}\\,dx",
    steps: [
      { explanation: "Antiderivative is ln|x| = ln x (since x > 0 on [1, e]).", latex: "" },
      { explanation: "Evaluate.", latex: "\\left[\\ln x\\right]_1^e = \\ln e - \\ln 1 = 1-0=1" },
    ],
    finalAnswerLatex: "1",
  },
];

const irGuided: PracticeQuestion[] = [
  fa("y11adv-elc-ir-g1", "Find the integral.", "\\int \\frac{1}{x}\\,dx", "ln|x|+C", ["\\ln|x|+C", "ln|x| + C"]),
  mc("y11adv-elc-ir-g2", "Why is the antiderivative of 1/x written as ln|x|, not ln x?", "B",
    [{ label: "A", text: "ln x is not differentiable" }, { label: "B", text: "1/x is defined for negative x, but ln x is not — the absolute value extends the formula" }, { label: "C", text: "Both are equivalent" }, { label: "D", text: "The absolute value makes integration easier" }],
    "1/x is defined for all x ≠ 0, including negative values. ln x only exists for x > 0. Adding the absolute value allows the antiderivative formula to work on both x > 0 and x < 0.", ""),
  fa("y11adv-elc-ir-g3", "Find the integral.", "\\int \\frac{3}{x}\\,dx", "3ln|x|+C", ["3\\ln|x|+C"]),
  mc("y11adv-elc-ir-g4", "Evaluate the definite integral ∫₁ᵉ (1/x) dx exactly.", "A",
    [{ label: "A", text: "$1$" }, { label: "B", text: "$e$" }, { label: "C", text: "$\\ln 2$" }, { label: "D", text: "$0$" }],
    "An antiderivative on this positive interval is ln x. Therefore [ln x]₁ᵉ = ln e − ln 1 = 1 − 0 = 1.", ""),
];

const irIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ir-i1", "Find the integral.", "\\int \\frac{5}{x}\\,dx", "5ln|x|+C", ["5\\ln|x|+C"]),
  fa("y11adv-elc-ir-i2", "Find the integral.", "\\int \\frac{2x}{x^2+3}\\,dx", "ln(x²+3)+C", ["\\ln(x^2+3)+C"]),
  mc("y11adv-elc-ir-i3", "Which exact value equals the definite integral ∫₂⁴ (1/x) dx?", "C",
    [{ label: "A", text: "$\\ln 4$" }, { label: "B", text: "$\\ln 2$" }, { label: "C", text: "$\\ln 2$ (i.e., ln 4 − ln 2)" }, { label: "D", text: "$1/2$" }],
    "[ln x]₂⁴ = ln 4 − ln 2 = ln(4/2) = ln 2.", ""),
  fa("y11adv-elc-ir-i4", "Find the integral.", "\\int \\frac{4x}{2x^2+1}\\,dx", "ln(2x²+1)+C", ["\\ln(2x^2+1)+C"]),
  mc("y11adv-elc-ir-i5", "Which integral cannot be evaluated using the ∫(1/x) pattern?", "D",
    [{ label: "A", text: "$\\int 1/(x+2)\\,dx$" }, { label: "B", text: "$\\int 2x/(x^2+1)\\,dx$" }, { label: "C", text: "$\\int 3/x\\,dx$" }, { label: "D", text: "$\\int 1/x^2\\,dx$" }],
    "∫(1/x²) dx = ∫x^(−2) dx = x^(−1)/(−1) + C. The power rule works here since the power is −2 ≠ −1.", ""),
];

const irMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-elc-ir-qm1",
    prompt: "Find the indefinite integral and state the required domain restriction.",
    latex: "\\int \\frac{3}{x+2}\\,dx",
    answer: "3ln|x+2|+C, x≠-2",
    acceptedAnswers: [
      "3\\ln|x+2|+C; x\\ne-2",
      "3 ln(abs(x+2)) + C, x != -2",
      "x≠-2 and the integral is 3ln|x+2|+C",
    ],
    hint: "Match the denominator derivative, retain the absolute value, and exclude its zero.",
    explanation: "Let u=x+2, so du=dx. The integral becomes 3∫du/u=3ln|u|+C, hence 3ln|x+2|+C. The integrand is undefined where x+2=0, so x=-2 is excluded.",
    difficulty: 3,
    diagnosticIntent: "Checks reciprocal-pattern integration together with the domain carried by the original integrand.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-elc-ir-qm2",
    prompt: "Which antiderivative correctly matches both the numerator and denominator?",
    latex: "\\int \\frac{2x}{x^2+1}\\,dx",
    answer: "B",
    choices: [
      "2ln(x²+1)+C",
      "ln(x²+1)+C",
      "ln|2x|+C",
      "1/(x²+1)+C",
    ],
    hint: "Differentiate the denominator and compare it with the numerator before choosing.",
    explanation: "For f(x)=x²+1, f′(x)=2x, exactly the numerator. Therefore ∫f′/f dx=ln|f|+C. Since x²+1 is always positive, the answer simplifies to ln(x²+1)+C.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses coefficient matching and recognition of the logarithmic f-prime-over-f structure.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Adds an extra factor even though the numerator already equals the denominator derivative.",
      C: "Takes the logarithm of the numerator instead of the denominator.",
      D: "Confuses an antiderivative with the reciprocal of the denominator.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ir-qm3",
    prompt: "Evaluate the definite integral exactly.",
    latex: "\\int_1^e \\frac{4}{x}\\,dx",
    answer: "4",
    acceptedAnswers: ["4.0", "4ln(e)", "4(ln e-ln 1)"],
    hint: "Use 4ln x on this positive interval, then evaluate both limits.",
    explanation: "On [1,e], x is positive, so an antiderivative is 4ln x. The value is 4[ln e-ln 1]=4(1-0)=4. Both endpoints must be included in the subtraction.",
    difficulty: 3,
    diagnosticIntent: "Checks exact evaluation of a logarithmic definite integral at canonical endpoints.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ir-qm4",
    prompt: "A student applies the power rule to the displayed integral. Which diagnosis is correct?",
    latex: "\\int x^{-1}\\,dx\\stackrel{?}{=}\\frac{x^0}{0}+C",
    answer: "D",
    choices: [
      "The answer is valid whenever x is positive.",
      "Only the integration constant is incorrect.",
      "The numerator should be x rather than x⁰.",
      "The power rule excludes n=-1; the antiderivative is ln|x|+C.",
    ],
    hint: "Check the condition n≠-1 in the power-rule formula before substituting.",
    explanation: "The rule ∫x^n dx=x^(n+1)/(n+1)+C requires n≠-1. At n=-1 its denominator is zero, so it gives no antiderivative. The separate result is ∫1/x dx=ln|x|+C.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses misuse of the integration power rule at its excluded exponent.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Assumes restricting the domain can make division by zero valid.",
      B: "Treats the family constant as the source of the undefined expression.",
      C: "Changes the numerator without addressing the zero denominator.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ir-qm5",
    prompt: "Determine the parameter A from the antiderivative identity.",
    latex: "\\int \\frac{Ax}{x^2+4}\\,dx=3\\ln(x^2+4)+C",
    answer: "A=6",
    acceptedAnswers: ["6", "A = 6", "A=6 because d/dx[3ln(x²+4)]=6x/(x²+4)"],
    hint: "Differentiate the proposed antiderivative and match the numerator coefficient.",
    explanation: "Differentiating 3ln(x²+4) gives 3·2x/(x²+4)=6x/(x²+4). Matching this with Ax/(x²+4) requires A=6. The coefficient follows from the inner derivative.",
    difficulty: 4,
    diagnosticIntent: "Assesses reverse parameter inference from a logarithmic antiderivative identity.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-elc-ir-qm6",
    prompt: "Find the positive value of a that divides the logarithmic area into equal parts.",
    latex: "\\int_1^a\\frac1x\\,dx=\\int_a^9\\frac1x\\,dx",
    answer: "a=3",
    acceptedAnswers: ["3", "a = 3", "a=√9=3"],
    hint: "Write both integrals as logarithm differences and combine logarithms.",
    explanation: "The left side is ln a and the right side is ln 9-ln a=ln(9/a). Equality gives ln a=ln(9/a), so a=9/a. Since a is positive, a²=9 and a=3.",
    difficulty: 4,
    diagnosticIntent: "Investigates how equal reciprocal areas locate the geometric mean of the endpoints.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-elc-ir-qm7",
    prompt: "Solve the initial-value problem on its full real domain.",
    latex: "F'(x)=\\frac{2x}{x^2+1},\\qquad F(0)=5",
    answer: "F(x)=ln(x²+1)+5",
    acceptedAnswers: [
      "ln(x^2+1)+5",
      "F(x)=\\ln(x^2+1)+5, x∈R",
      "F(x)=5+ln(x²+1)",
    ],
    hint: "Recognise the derivative of x²+1, integrate, then impose F(0)=5.",
    explanation: "Because the numerator is the derivative of x²+1, integration gives F(x)=ln(x²+1)+C. Since F(0)=ln1+C=5, C=5. Also x²+1>0 for every real x.",
    difficulty: 4,
    diagnosticIntent: "Combines logarithmic reverse-chain integration, an initial condition, and domain reasoning.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ir-qm8",
    prompt: "Which general antiderivative is valid on every interval of the integrand's domain?",
    latex: "\\int \\frac{2x}{x^2-1}\\,dx",
    answer: "C",
    choices: [
      "ln(x²-1)+C for all real x",
      "2ln|x²-1|+C",
      "ln|x²-1|+C, on intervals excluding x=±1",
      "ln|2x|+C, for x≠0",
    ],
    hint: "Match f′/f, keep absolute values, and identify where the denominator vanishes.",
    explanation: "With f=x²-1, f′=2x, so the primitive is ln|x²-1|+C. The integrand is undefined at x=±1, and an antiderivative is considered separately on each interval cut by those points.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses the interaction between logarithmic absolute values and disconnected domains.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Drops the absolute value and ignores portions of the real domain.",
      B: "Introduces an unnecessary factor of two.",
      D: "Uses the numerator rather than the denominator inside the logarithm.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ir-qm9",
    prompt: "Determine c and reconstruct the indefinite integral.",
    latex: "\\int\\frac{2x-4}{x^2-4x+c}\\,dx=\\ln(x^2-4x+5)+C",
    answer: "c=5 and the integral is ln(x²-4x+5)+C",
    acceptedAnswers: [
      "c=5; ∫(2x-4)/(x²-4x+5)dx=ln(x²-4x+5)+C",
      "c = 5 and primitive = ln(x^2-4x+5)+C",
      "c=5, F(x)=ln((x-2)^2+1)+C",
    ],
    hint: "The numerator is already the derivative of the quadratic; match the denominator.",
    explanation: "The derivative of x²-4x+c is 2x-4, so the f′/f pattern applies for any fixed c where defined. Matching the stated logarithm requires c=5, giving ln(x²-4x+5)+C.",
    difficulty: 5,
    diagnosticIntent: "Synthesises structural pattern recognition with parameter reconstruction in a quadratic denominator.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-elc-ir-qm10",
    prompt: "Determine A, then find the accumulated amount at t=e².",
    latex: "Q(t)=\\int_1^t\\frac{A}{s}\\,ds,\\qquad Q(e)=6",
    answer: "A=6 and Q(e²)=12",
    acceptedAnswers: [
      "A=6, Q(e^2)=12",
      "A = 6; Q(e²) = 12",
      "Q(t)=6ln t, so Q(e²)=12",
    ],
    hint: "First use Q(t)=A ln t and the value at e; then evaluate at e².",
    explanation: "Since the lower limit is 1, Q(t)=A(ln t-ln1)=A ln t. The condition Q(e)=A=6 fixes the rate coefficient. Therefore Q(e²)=6ln(e²)=6·2=12.",
    difficulty: 5,
    diagnosticIntent: "Synthesises a reciprocal-rate accumulation model, calibration data, and exact prediction.",
    taskType: "synthesis",
  }),
];

// ─── L5: Applications of Exponential and Logarithmic Calculus ─────────────────

const apWorked: WorkedExample[] = [
  {
    title: "Find the stationary point of y = xe^(−x) and classify it",
    questionLatex: "y = xe^{-x}",
    steps: [
      { explanation: "Differentiate using the product rule: u = x, v = e^(−x), u′ = 1, v′ = −e^(−x).", latex: "\\frac{dy}{dx}=e^{-x}+x(-e^{-x})=e^{-x}(1-x)" },
      { explanation: "Set equal to zero: e^(−x)(1−x) = 0. Since e^(−x) > 0 always, solve 1−x = 0 → x = 1.", latex: "x=1" },
      { explanation: "Find y: y(1) = 1·e^(−1) = 1/e.", latex: "y(1)=\\frac{1}{e}" },
      { explanation: "Second derivative test: dy/dx = e^(−x)(1−x). Differentiate again: d²y/dx² = −e^(−x)(1−x) + e^(−x)(−1) = e^(−x)(x−2). At x=1: e^(−1)(1−2) = −1/e < 0 → local maximum.", latex: "\\frac{d^2y}{dx^2}\\bigg|_{x=1}=-\\frac{1}{e}<0\\implies\\text{local max}" },
    ],
    finalAnswerLatex: "\\text{Local maximum at }\\left(1,\\,\\frac{1}{e}\\right)",
  },
  {
    title: "Find the equation of the tangent to y = ln x at x = 1",
    questionLatex: "y = \\ln x,\\quad x=1",
    steps: [
      { explanation: "Point: y(1) = ln 1 = 0. So the point is (1, 0).", latex: "" },
      { explanation: "Gradient: dy/dx = 1/x. At x=1: gradient = 1.", latex: "m=1" },
      { explanation: "Tangent equation.", latex: "y-0=1(x-1)\\implies y=x-1" },
    ],
    finalAnswerLatex: "y=x-1",
  },
];

const apGuided: PracticeQuestion[] = [
  fa("y11adv-elc-ap-g1", "Find the equation of the tangent to y = eˣ at the point (1, e).", "", "y = ex", ["y=ex"]),
  mc("y11adv-elc-ap-g2", "Find the x-coordinate of the stationary point of y = x − ln x (x > 0).", "B",
    [{ label: "A", text: "$x = 0$" }, { label: "B", text: "$x = 1$" }, { label: "C", text: "$x = e$" }, { label: "D", text: "$x = -1$" }],
    "Differentiate to obtain dy/dx = 1 − 1/x. Setting this to zero gives 1/x = 1, so the stationary point occurs at x = 1.", "y=x-\\ln x"),
  fa("y11adv-elc-ap-g3", "Find the area under y = eˣ between x = 0 and x = 2.", "", "e²-1", ["e^2-1"]),
  mc("y11adv-elc-ap-g4", "For y = ln x (x > 0), is the curve concave up or concave down?", "B",
    [{ label: "A", text: "Concave up for all x > 0" }, { label: "B", text: "Concave down for all x > 0" }, { label: "C", text: "Concave up for x > 1, concave down for 0 < x < 1" }, { label: "D", text: "Has an inflection point at x = 1" }],
    "y′ = 1/x, y″ = −1/x² < 0 for all x > 0 → always concave down.", ""),
];

const apIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ap-i1", "Find the gradient of y = ln(x²) at x = e.", "", "2/e", ["2e^(-1)", "\\frac{2}{e}"]),
  mc("y11adv-elc-ap-i2", "The function y = eˣ is always:", "C",
    [{ label: "A", text: "Concave down" }, { label: "B", text: "Decreasing" }, { label: "C", text: "Concave up" }, { label: "D", text: "Stationary at x = 0" }],
    "For y = eˣ, both y′ = eˣ and y″ = eˣ are positive for every real x. Thus the curve is increasing and always concave up, with no stationary point at x = 0.", ""),
  fa("y11adv-elc-ap-i3", "Find the area enclosed between y = 1/x, the x-axis, x = 1 and x = e².", "", "2", ["ln(e²)", "\\ln(e^2)-\\ln 1"]),
  mc("y11adv-elc-ap-i4", "For y = xe^(−x), the stationary point is at x = 1. Classify it.", "A",
    [{ label: "A", text: "Local maximum at (1, 1/e)" }, { label: "B", text: "Local minimum at (1, 1/e)" }, { label: "C", text: "Horizontal inflection at (1, 1/e)" }, { label: "D", text: "Cannot be classified without more information" }],
    "y″ = e^(−x)(x−2). At x=1: e^(−1)(−1) = −1/e < 0 → local maximum.", ""),
  fa("y11adv-elc-ap-i5", "Find the equation of the tangent to y = ln x at x = e.", "", "y = (1/e)(x-e)+1", ["y = x/e - 1 + 1", "y = (x-e)/e + 1"]),
];

const apMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-elc-ap-qm1",
    prompt: "Differentiate the product and present the result in factorised form.",
    latex: "y=xe^x",
    answer: "y'=e^x(x+1)",
    acceptedAnswers: ["dy/dx=e^x(x+1)", "(x+1)e^x", "e^x+xe^x"],
    hint: "Use the product rule with u=x and v=e^x, then factorise.",
    explanation: "The product rule gives y′=1·e^x+x·e^x. Both terms contain e^x, so y′=e^x(1+x)=e^x(x+1). The exponential factor remains positive for every real x.",
    difficulty: 3,
    diagnosticIntent: "Checks product-rule differentiation when one factor is the self-derivative exponential.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-elc-ap-qm2",
    prompt: "Which statement correctly describes stationary points of the curve?",
    latex: "y=e^x",
    answer: "C",
    choices: [
      "There is a stationary point at x=0 because e⁰=1.",
      "There is a stationary point as x approaches negative infinity.",
      "There are no stationary points because y′=e^x>0 for all real x.",
      "Every point is stationary because the function equals its derivative.",
    ],
    hint: "A stationary point requires a finite x-value where the derivative equals zero.",
    explanation: "For y=e^x, the derivative is y′=e^x. Exponential values are strictly positive for every real x, so the derivative never equals zero. Approaching zero as x→-∞ does not create a stationary point.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses confusion between an intercept, asymptotic behaviour, and a zero derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Confuses the y-intercept with a stationary point.",
      B: "Treats a limiting gradient as a derivative attained at a finite point.",
      D: "Misinterprets the self-derivative property as a zero derivative.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ap-qm3",
    prompt: "Find the equation of the tangent at the stated point.",
    latex: "y=\\ln x,\\qquad x=1",
    answer: "y=x-1",
    acceptedAnswers: ["y-0=1(x-1)", "y = x - 1", "x-y=1"],
    hint: "Find both ln 1 and the gradient 1/x at x=1.",
    explanation: "The point is (1,ln1)=(1,0). Since y′=1/x, the gradient at x=1 is 1. Point-gradient form gives y-0=1(x-1), so the tangent is y=x-1.",
    difficulty: 3,
    diagnosticIntent: "Checks coordinated use of function value, logarithmic derivative, and tangent-line form.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ap-qm4",
    prompt: "Which conclusion about the curve's concavity is justified?",
    latex: "y=\\ln x,\\qquad x>0",
    answer: "B",
    choices: [
      "It is concave up because y′=1/x is positive.",
      "It is concave down because y″=-1/x² is negative.",
      "It changes concavity at x=1 because ln1=0.",
      "Its concavity cannot be determined without an interval endpoint.",
    ],
    hint: "Concavity is determined by the sign of the second derivative, not the first.",
    explanation: "Differentiating twice gives y′=1/x and y″=-1/x². For every x>0, x² is positive, so y″ is negative and the logarithmic curve is concave down throughout its domain.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses use of first-derivative information in place of the second-derivative concavity test.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses increasing behaviour to infer concavity.",
      C: "Confuses an x-intercept with an inflection point.",
      D: "Assumes a global sign cannot be established algebraically.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ap-qm5",
    prompt: "The curve has its positive stationary point at x=2. Determine k and classify the point.",
    latex: "f(x)=xe^{-kx},\\qquad k>0",
    answer: "k=1/2 and the point is a maximum",
    acceptedAnswers: [
      "k=0.5, local maximum",
      "k=1/2; maximum at x=2",
      "k = 1/2 and f has a local maximum",
    ],
    hint: "Factor the derivative as e^(-kx)(1-kx), then inspect its sign.",
    explanation: "The derivative is f′(x)=e^(-kx)(1-kx). Its positive zero is x=1/k, so 1/k=2 and k=1/2. The factor 1-kx changes from positive to negative there, making the point a maximum.",
    difficulty: 4,
    diagnosticIntent: "Assesses parameter inference and classification from a factorised exponential derivative.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-elc-ap-qm6",
    prompt: "Investigate the x-intercept of the tangent at a general point and state the pattern.",
    latex: "y=e^x\\quad\\text{at}\\quad(a,e^a)",
    answer: "The tangent crosses the x-axis at x=a-1",
    acceptedAnswers: [
      "x-intercept=(a-1,0)",
      "x=a-1",
      "the intercept is one unit left of the tangency point",
    ],
    hint: "Write the tangent using gradient e^a, set y=0, and solve for x.",
    explanation: "The tangent is y-e^a=e^a(x-a), or y=e^a(x-a+1). Since e^a is never zero, setting y=0 gives x-a+1=0, hence x=a-1: always one unit to the left.",
    difficulty: 4,
    diagnosticIntent: "Investigates a general geometric invariant produced by the exponential self-derivative property.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-elc-ap-qm7",
    prompt: "An accumulated quantity is modelled by A(b). Find A(2) exactly.",
    latex: "A(b)=\\int_0^{\\ln b}e^x\\,dx,\\qquad b>1",
    answer: "1",
    acceptedAnswers: ["1 square unit", "e^(ln2)-e^0=1", "2-1=1"],
    hint: "Integrate e^x, then use e^(ln 2)=2 and e^0=1.",
    explanation: "The curve is positive, so the area is ∫₀^(ln2)e^x dx=[e^x]₀^(ln2). Using inverse functions gives e^(ln2)=2, while e^0=1, so the exact area is 1.",
    difficulty: 4,
    diagnosticIntent: "Combines exponential integration with inverse-function exact values in an area context.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ap-qm8",
    prompt: "Which classification is fully supported by derivative analysis?",
    latex: "f(x)=e^{-x^2}",
    answer: "D",
    choices: [
      "No stationary point exists because the exponential factor is positive.",
      "x=0 is a minimum because f(0)=1.",
      "x=±1 are maxima because the exponent contains x².",
      "x=0 is the unique maximum because f′ changes from positive to negative there.",
    ],
    hint: "Factor f′=-2xe^(-x²) and use the exponential factor's positive sign.",
    explanation: "Here f′(x)=-2xe^(-x²). The exponential factor is positive, so f′ is positive for x<0, zero at x=0, and negative for x>0. Thus x=0 is the unique stationary maximum.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses classification by coordinating a chain-rule derivative with a sign change.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Ignores the factor -2x that can make the derivative zero.",
      B: "Classifies from function height without analysing derivative signs.",
      C: "Treats values suggested by x² as derivative zeros.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ap-qm9",
    prompt: "Reconstruct A and k from the maximum's location and value.",
    latex: "f(x)=Axe^{-kx},\\quad A,k>0,\\quad\\max f=f(2)=\\frac4e",
    answer: "A=2 and k=1/2",
    acceptedAnswers: [
      "A=2,k=0.5",
      "k=1/2 and A=2",
      "f(x)=2xe^{-x/2}",
    ],
    hint: "The stationary location determines k first; then substitute x=2 into f.",
    explanation: "Since f′=Ae^(-kx)(1-kx), the maximum occurs at x=1/k. Therefore k=1/2. Then f(2)=2A/e=4/e, so A=2 and the reconstructed model is f(x)=2xe^(-x/2).",
    difficulty: 5,
    diagnosticIntent: "Synthesises optimisation conditions and a function value to reconstruct two model parameters.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-elc-ap-qm10",
    prompt: "A tangent passes through the origin. Determine a and then find the stated exact area.",
    latex: "y=\\ln x\\text{ at }x=a>0,\\qquad \\int_1^a\\frac1x\\,dx",
    answer: "a=e and the area is 1",
    acceptedAnswers: [
      "a=e, integral=1",
      "a = e and area = 1 square unit",
      "the tangent condition gives a=e; ∫₁ᵉ1/x dx=1",
    ],
    hint: "Set x=0,y=0 in the general tangent y-ln a=(x-a)/a.",
    explanation: "The tangent at x=a is y-ln a=(x-a)/a. Passing through (0,0) gives -ln a=-1, so ln a=1 and a=e. The area is then ∫₁ᵉ1/x dx=[ln x]₁ᵉ=1.",
    difficulty: 5,
    diagnosticIntent: "Synthesises a logarithmic tangent constraint, inverse functions, and exact reciprocal area.",
    taskType: "synthesis",
  }),
];

// ─── L6: Exam Practice ────────────────────────────────────────────────────────

const exGuided: PracticeQuestion[] = [
  fa("y11adv-elc-ex-g1", "Find dy/dx.", "y = e^{3x} + \\ln(2x)", "3e^(3x) + 1/x", ["3e^{3x}+\\frac{1}{x}"]),
  mc("y11adv-elc-ex-g2", "Which expression is the general antiderivative of ∫(eˣ + 1/x) dx?", "B",
    [{ label: "A", text: "$e^x + \\ln x + C$" }, { label: "B", text: "$e^x + \\ln|x| + C$" }, { label: "C", text: "$e^x + x + C$" }, { label: "D", text: "$xe^x + \\ln x + C$" }],
    "∫eˣ dx = eˣ; ∫(1/x) dx = ln|x|. Combine: eˣ + ln|x| + C.", ""),
  fa("y11adv-elc-ex-g3", "Evaluate ∫₁² (3/x) dx. Give an exact answer.", "\\int_1^2 \\frac{3}{x}\\,dx", "3 ln 2", ["3\\ln 2"]),
  mc("y11adv-elc-ex-g4", "A curve has dy/dx = 2/x and passes through (1, 5). Find y in terms of x.", "A",
    [{ label: "A", text: "$y = 2\\ln x + 5$" }, { label: "B", text: "$y = 2\\ln x + C$" }, { label: "C", text: "$y = x^2 + 5$" }, { label: "D", text: "$y = 2\\ln|x| + 3$" }],
    "Integrate: y = 2 ln x + C. Substitute (1,5): 5 = 2 ln 1 + C = 0 + C → C = 5. So y = 2 ln x + 5.", ""),
];

const exIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ex-i1", "Differentiate y = x·eˣ using the product rule.", "", "e^x(x+1)", ["e^x(x+1)", "(x+1)e^x"]),
  fa("y11adv-elc-ex-i2", "Find the equation of the tangent to y = ln x at x = e².", "", "y = x/e² + 1", ["y=(x-e²)/e²+2", "y-2=(x-e²)/e²"]),
  mc("y11adv-elc-ex-i3", "Which of the following cannot be found using the standard antiderivative results for eˣ and 1/x alone?", "D",
    [{ label: "A", text: "$\\int e^{2x}\\,dx$" }, { label: "B", text: "$\\int 1/(x+1)\\,dx$" }, { label: "C", text: "$\\int 2x/(x^2+1)\\,dx$" }, { label: "D", text: "$\\int e^{x^2}\\,dx$" }],
    "∫e^(x²) dx has no elementary closed form. The others all fit the ∫e^(ax) or ∫f′/f pattern.", ""),
  fa("y11adv-elc-ex-i4", "Find the area enclosed between y = eˣ, the x-axis, and x = −1 to x = 1.", "", "e-1/e", ["e - e^{-1}", "e-1/e"]),
  mc("y11adv-elc-ex-i5", "The function y = ln x has a y-intercept of:", "D",
    [{ label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "−1" }, { label: "D", text: "No y-intercept — ln x is not defined at x = 0" }],
    "ln x is defined only for x > 0. At x = 0 it is undefined, so the graph does not cross the y-axis.", ""),
];

const exMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-elc-ex-qm1",
    prompt: "Differentiate the combined exponential and logarithmic function.",
    latex: "y=e^{3x}+\\ln(2x),\\qquad x>0",
    answer: "y'=3e^(3x)+1/x",
    acceptedAnswers: [
      "dy/dx=3e^{3x}+\\frac1x",
      "3e^(3x) + x^(-1)",
      "1/x+3e^(3x)",
    ],
    hint: "Use the exponential chain rule and simplify the logarithmic chain-rule factor.",
    explanation: "The chain rule gives d/dx[e^(3x)]=3e^(3x). Also d/dx[ln(2x)]=2/(2x)=1/x. Adding the derivatives gives y′=3e^(3x)+1/x on x>0.",
    difficulty: 3,
    diagnosticIntent: "Checks coordinated chain-rule differentiation across exponential and logarithmic terms.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-elc-ex-qm2",
    prompt: "Which expression is the complete general antiderivative?",
    latex: "\\int\\left(e^{2x}+\\frac3x\\right)dx",
    answer: "A",
    choices: [
      "(1/2)e^(2x)+3ln|x|+C",
      "2e^(2x)+3ln|x|+C",
      "(1/2)e^(2x)+ln|3x|+C",
      "(1/2)e^(2x)+3/x+C",
    ],
    hint: "Integrate the two terms separately and retain the absolute value for 1/x.",
    explanation: "Reverse-chain scaling gives ∫e^(2x)dx=(1/2)e^(2x). The reciprocal term gives ∫3/x dx=3ln|x|. Their sum, with one family constant, is option A.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses exponential scaling, reciprocal integration, and omission of the family constant.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Multiplies by the exponent coefficient instead of dividing.",
      C: "Moves the coefficient inside the logarithm rather than multiplying the logarithm.",
      D: "Treats the original reciprocal term as its own antiderivative.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ex-qm3",
    prompt: "Find the particular curve on the positive-x domain.",
    latex: "\\frac{dy}{dx}=\\frac2x,\\qquad y(1)=5",
    answer: "y=2ln(x)+5, x>0",
    acceptedAnswers: [
      "y=2\\ln x+5 for x>0",
      "y = 5 + 2ln(x), x positive",
      "f(x)=2ln(x)+5, domain x>0",
    ],
    hint: "Integrate to 2ln x+C, then use ln1=0 to determine C.",
    explanation: "On x>0, integration gives y=2ln x+C. Substituting the point (1,5) gives 5=2ln1+C=C. Therefore the particular curve is y=2ln x+5 for x>0.",
    difficulty: 3,
    diagnosticIntent: "Checks logarithmic integration, use of an initial condition, and retention of domain.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ex-qm4",
    prompt: "Which exact value does the definite integral have?",
    latex: "\\int_0^{\\ln2}e^x\\,dx",
    answer: "B",
    choices: ["ln2", "1", "2", "e·ln2"],
    hint: "Evaluate the exponential antiderivative at both limits and use inverse functions.",
    explanation: "The antiderivative is e^x. Thus [e^x]₀^(ln2)=e^(ln2)-e^0=2-1=1. Option B includes the lower-limit contribution that is often omitted.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses exact limit evaluation using e to the ln of two and e to the zero.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Treats the interval width as the integral value.",
      C: "Omits the lower-limit value e^0=1.",
      D: "Uses rectangle area rather than an antiderivative.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ex-qm5",
    prompt: "Reconstruct the exponential function from its value and gradient at zero.",
    latex: "f(x)=Ae^{kx},\\qquad f(0)=3,\\qquad f'(0)=6",
    answer: "f(x)=3e^(2x)",
    acceptedAnswers: [
      "A=3,k=2,f(x)=3e^{2x}",
      "A = 3 and k = 2, so f(x)=3e^(2x)",
      "f(x)=3exp(2x)",
    ],
    hint: "Use f(0) to determine A, then use f′(0)=Ak.",
    explanation: "Since e^0=1, f(0)=A=3. Differentiation gives f′(x)=Ake^(kx), so f′(0)=Ak=3k=6 and k=2. Hence the reconstructed function is f(x)=3e^(2x).",
    difficulty: 4,
    diagnosticIntent: "Assesses reconstruction of exponential parameters from local value and gradient data.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-elc-ex-qm6",
    prompt: "Compare the gradients at corresponding points on these inverse curves.",
    latex: "y=e^x\\text{ at }x=a,\\qquad y=\\ln x\\text{ at }x=e^a",
    answer: "The gradients are e^a and e^(-a), so their product is 1",
    acceptedAnswers: [
      "m_exp=e^a, m_log=1/e^a, product=1",
      "the slopes are reciprocals",
      "e^a·e^(-a)=1",
    ],
    hint: "Differentiate each function, evaluate at the stated x-value, and multiply.",
    explanation: "The exponential gradient at x=a is e^a. The logarithmic gradient at x=e^a is 1/e^a=e^(-a). Their product is one, matching the reciprocal slopes of inverse curves at reflected points.",
    difficulty: 4,
    diagnosticIntent: "Investigates the reciprocal-gradient relationship between exponential and logarithmic inverse functions.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-elc-ex-qm7",
    prompt: "Find and classify every stationary point.",
    latex: "f(x)=x^2e^{-x}",
    answer: "minimum at x=0 and maximum at x=2",
    acceptedAnswers: [
      "x=0 local min; x=2 local max",
      "(0,0) is a minimum and (2,4/e²) is a maximum",
      "stationary points: min (0,0), max (2,4e^(-2))",
    ],
    hint: "Factor f′ as xe^(-x)(2-x) and construct a sign chart.",
    explanation: "The derivative is f′=e^(-x)(2x-x²)=xe^(-x)(2-x). Since e^(-x)>0, the sign changes negative-to-positive at x=0 and positive-to-negative at x=2, giving a minimum then a maximum.",
    difficulty: 4,
    diagnosticIntent: "Combines product-rule differentiation, factorisation, and first-derivative classification.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-elc-ex-qm8",
    prompt: "Which derivative statement is correct, including the function's domain?",
    latex: "f(x)=\\ln(e^x)+e^{\\ln x}",
    answer: "D",
    choices: [
      "f′(x)=1+1/x for x>0",
      "f′(x)=2 for every real x",
      "f′(x)=2x for x>0",
      "f′(x)=2 for x>0",
    ],
    hint: "Simplify both inverse-function compositions, but preserve the domain of ln x.",
    explanation: "We have ln(e^x)=x for all real x, while e^(ln x)=x only where ln x exists, namely x>0. Thus f(x)=2x on x>0 and f′(x)=2 on that domain.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses inverse-function simplification that incorrectly discards the original logarithmic domain.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Differentiates e^(ln x) without completing the chain-rule cancellation.",
      B: "Obtains the derivative but discards the original domain restriction.",
      C: "Confuses the simplified function 2x with its derivative.",
    },
  }),
  qualityAnswer({
    id: "y11adv-elc-ex-qm9",
    prompt: "Determine all parameters and reconstruct the function.",
    latex: "f(x)=Ae^{kx}+B,\\quad f(0)=3,\\quad f'(0)=4,\\quad f''(0)=8",
    answer: "A=2, k=2, B=1; f(x)=2e^(2x)+1",
    acceptedAnswers: [
      "A=2,k=2,B=1,f(x)=2e^{2x}+1",
      "f(x)=2exp(2x)+1",
      "k=2, A=2 and B=1",
    ],
    hint: "Divide f′′(0)=Ak² by f′(0)=Ak to find k first.",
    explanation: "Because f′(0)=Ak=4 and f′′(0)=Ak²=8, division gives k=2. Then A=4/k=2. Finally f(0)=A+B=3 gives B=1, so f(x)=2e^(2x)+1.",
    difficulty: 5,
    diagnosticIntent: "Synthesises value, first-derivative, and second-derivative data to reconstruct a model.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-elc-ex-qm10",
    prompt: "Determine A and B, then reconstruct the curve on its stated domain.",
    latex: "y'=Ae^{2x}+\\frac{B}{x+1},\\quad y'(0)=5,\\quad y''(0)=1,\\quad y(0)=4,\\quad x>-1",
    answer: "A=2, B=3; y=e^(2x)+3ln(x+1)+3",
    acceptedAnswers: [
      "A=2,B=3,y=e^{2x}+3\\ln(x+1)+3",
      "y=exp(2x)+3ln(x+1)+3, x>-1",
      "A = 2 and B = 3; y(x)=e^(2x)+3ln(x+1)+3",
    ],
    hint: "Use y′(0) and y′′(0) as simultaneous equations before integrating.",
    explanation: "At zero, y′ gives A+B=5. Since y′′=2Ae^(2x)-B/(x+1)², y′′(0) gives 2A-B=1. Solving yields A=2,B=3. Integration and y(0)=4 then give y=e^(2x)+3ln(x+1)+3.",
    difficulty: 5,
    diagnosticIntent: "Synthesises derivative data, simultaneous parameter recovery, integration, and an initial value.",
    taskType: "synthesis",
  }),
];

// ─── Export ───────────────────────────────────────────────────────────────────

export function year11AdvancedExpLogCalculusLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "exp-log-calculus") return null;

  const base = {
    moduleSlug: lesson.slug,
    syllabusRef: "MA-C2",
  };

  if (lesson.slug === "differentiating-exponential-functions") {
    return {
      ...base,
      description: "Differentiate eˣ and e^(f(x)) using the chain rule, and evaluate exponential derivatives at specific points.",
      learningIntention: "Apply d/dx(eˣ) = eˣ and the chain rule to differentiate exponential functions of the form e^(f(x)).",
      successCriteria: [
        "State that d/dx(eˣ) = eˣ — the exponential function is its own derivative.",
        "Apply the chain rule to differentiate e^(ax): d/dx(e^(ax)) = ae^(ax).",
        "Differentiate e^(f(x)) for polynomial f(x) using d/dx(e^(f(x))) = f′(x)e^(f(x)).",
        "Evaluate an exponential derivative at a given x-value.",
        "Find the equation of the tangent to an exponential curve at a given point.",
      ],
      teaching: {
        paragraphs: [
          "The exponential function eˣ has a remarkable property: it is its own derivative. d/dx(eˣ) = eˣ. No other function (except constant multiples of eˣ) has this property. It is the reason eˣ appears in every differential equation modelling growth and decay.",
          "When the exponent is a function of x, use the chain rule. Think of e^(f(x)) as 'e to the power of something'. The derivative is: d/dx(e^(f(x))) = f′(x) · e^(f(x)). The outer derivative (eˣ evaluated at f(x), which is just e^(f(x))) multiplies the inner derivative f′(x).",
          "For the common case e^(ax+b): the inner function is ax+b, with derivative a. So d/dx(e^(ax+b)) = a·e^(ax+b). The constant b in the exponent has no effect on the derivative — shifting the exponent vertically just scales the function by a constant.",
          "To find the gradient at a point: differentiate, then substitute the x-value. To find a tangent equation: use gradient m = dy/dx and the point (x₀, y₀) in y − y₀ = m(x − x₀).",
          "Always check by differentiating your answer. If you claim ∫e^(ax) dx = (1/a)e^(ax) + C, differentiate it: (1/a)·a·e^(ax) = e^(ax) ✓.",
        ],
        latexBlocks: [
          "\\frac{d}{dx}(e^x) = e^x",
          "\\frac{d}{dx}(e^{ax+b}) = ae^{ax+b}",
          "\\frac{d}{dx}(e^{f(x)}) = f'(x)\\,e^{f(x)}",
        ],
      },
      workedExamples: deWorked,
      guidedPractice: deGuided,
      independentPractice: deIndep,
      commonMistakes: [
        { mistake: "Writing d/dx(eˣ) = xeˣ⁻¹ by applying the power rule.", fix: "The power rule applies to xⁿ, not to eˣ. The special result for exponential functions is d/dx(eˣ) = eˣ." },
        { mistake: "Forgetting to multiply by the inner derivative when differentiating e^(f(x)).", fix: "Chain rule: d/dx(e^(f(x))) = f′(x)·e^(f(x)). The e^(f(x)) factor alone is not the answer." },
        { mistake: "Differentiating e^(2x+3) and writing 2e^(2x+3)+3 instead of 2e^(2x+3).", fix: "Only the coefficient of x matters. d/dx(2x+3) = 2, so d/dx(e^(2x+3)) = 2e^(2x+3). The constant +3 has no extra effect on the derivative." },
      ],
      masteryQuiz: deMastery,
    };
  }

  if (lesson.slug === "differentiating-logarithmic-functions") {
    return {
      ...base,
      description: "Differentiate ln x and ln(f(x)) using d/dx(ln x) = 1/x and the chain rule.",
      learningIntention: "Apply d/dx(ln x) = 1/x and the chain rule to differentiate logarithmic functions.",
      successCriteria: [
        "State d/dx(ln x) = 1/x and identify the domain restriction x > 0.",
        "Apply the chain rule: d/dx(ln(f(x))) = f′(x)/f(x).",
        "Explain why d/dx(ln(kx)) = 1/x regardless of the constant k.",
        "Differentiate expressions combining logarithms with other functions.",
        "Evaluate a logarithmic derivative at a given x-value.",
      ],
      teaching: {
        paragraphs: [
          "The derivative of the natural logarithm is d/dx(ln x) = 1/x, for x > 0. This result is the inverse of d/dx(eˣ) = eˣ, which makes sense: ln x and eˣ are inverse functions, so their derivatives are reciprocally related.",
          "For the chain rule applied to logarithms: d/dx(ln(f(x))) = f′(x)/f(x). In words: the derivative of the log is the derivative of the inside divided by the inside. This formula is sometimes written as d/dx(ln u) = (1/u)·(du/dx).",
          "A useful simplification: d/dx(ln(kx)) = 1/x for any constant k > 0. This is because ln(kx) = ln k + ln x, and ln k is a constant with zero derivative. So the k disappears entirely from the derivative — unlike for polynomials, constants inside a logarithm don't affect the result.",
          "Remember that ln x has a restricted domain: x > 0. The derivative 1/x is also only valid for x > 0 when working with ln x. This domain restriction matters when stating where the derivative is defined.",
          "Products involving ln: if y = x ln x, use the product rule. d/dx(x ln x) = 1·ln x + x·(1/x) = ln x + 1. Products of logarithms with polynomials appear frequently in HSC questions.",
        ],
        latexBlocks: [
          "\\frac{d}{dx}(\\ln x) = \\frac{1}{x},\\quad x>0",
          "\\frac{d}{dx}(\\ln(f(x))) = \\frac{f'(x)}{f(x)}",
          "\\frac{d}{dx}(\\ln(kx)) = \\frac{1}{x}\\quad \\text{(constant }k\\text{ disappears)}",
        ],
      },
      workedExamples: dlWorked,
      guidedPractice: dlGuided,
      independentPractice: dlIndep,
      commonMistakes: [
        { mistake: "Writing d/dx(ln(3x)) = 3/x by carrying the 3 into the numerator.", fix: "ln(3x) = ln 3 + ln x, so d/dx(ln(3x)) = 0 + 1/x = 1/x. The constant multiplier inside the log disappears." },
        { mistake: "Applying d/dx(ln(x²)) = 1/x² without using the chain rule.", fix: "The chain rule gives d/dx(ln(x²)) = 2x/x² = 2/x. Alternatively, ln(x²) = 2 ln x → d/dx = 2/x." },
        { mistake: "Stating d/dx(ln x) = 1/x for all x ≠ 0.", fix: "ln x is only defined for x > 0, so the derivative 1/x is valid only for x > 0 in this context." },
      ],
      masteryQuiz: dlMastery,
    };
  }

  if (lesson.slug === "integrating-exponential-functions") {
    return {
      ...base,
      description: "Integrate eˣ and e^(ax) using the reverse chain rule, and evaluate definite integrals involving exponential functions.",
      learningIntention: "Apply ∫eˣ dx = eˣ + C and ∫e^(ax) dx = (1/a)e^(ax) + C to find antiderivatives and definite integrals.",
      successCriteria: [
        "State ∫eˣ dx = eˣ + C from the self-derivative property.",
        "Apply ∫e^(ax) dx = (1/a)e^(ax) + C using the reverse chain rule.",
        "Evaluate definite integrals of exponential functions between given limits.",
        "Integrate sums involving exponential and polynomial terms.",
        "Check integration by differentiating the result.",
      ],
      teaching: {
        paragraphs: [
          "Since d/dx(eˣ) = eˣ, the antiderivative of eˣ is eˣ + C. The exponential function is its own integral too — another unique property.",
          "For e^(ax): d/dx((1/a)e^(ax)) = (1/a)·a·e^(ax) = e^(ax). So ∫e^(ax) dx = (1/a)e^(ax) + C. The (1/a) factor compensates for the inner derivative a that the chain rule produces. Divide by the coefficient of x.",
          "For e^(ax+b): the integral is still (1/a)e^(ax+b) + C. The constant b in the exponent does not change the integration process — only the coefficient of x (which is a) matters.",
          "Always check: differentiate your integral result and verify you recover the original integrand. This habit catches errors from incorrect constants.",
          "For definite integrals: evaluate the antiderivative at the upper limit, then subtract its value at the lower limit. Recall that e⁰ = 1 and simplify carefully.",
        ],
        latexBlocks: [
          "\\int e^x\\,dx = e^x+C",
          "\\int e^{ax}\\,dx = \\frac{1}{a}e^{ax}+C",
          "\\int e^{ax+b}\\,dx = \\frac{1}{a}e^{ax+b}+C",
        ],
      },
      workedExamples: ieWorked,
      guidedPractice: ieGuided,
      independentPractice: ieIndep,
      commonMistakes: [
        { mistake: "Writing ∫e^(2x) dx = 2e^(2x) + C by multiplying instead of dividing by 2.", fix: "The factor of 2 in the exponent produced a factor of 2 when you differentiated. To undo this (anti-differentiate), divide by 2. ∫e^(2x) dx = (1/2)e^(2x) + C." },
        { mistake: "Writing ∫e^(x²) dx = e^(x²)/(2x) + C by extending the e^(ax) rule.", fix: "The formula ∫e^(ax) dx = (1/a)e^(ax) works only when a is a constant. When the exponent is x², the inner derivative 2x is not constant, and the simple reverse chain rule does not apply." },
        { mistake: "Forgetting e⁰ = 1 when evaluating definite integrals at x = 0.", fix: "At the lower limit x = 0: e⁰ = 1, not 0. [eˣ]₀¹ = e¹ − e⁰ = e − 1, not just e." },
      ],
      masteryQuiz: ieMastery,
    };
  }

  if (lesson.slug === "integrating-reciprocal-functions") {
    return {
      ...base,
      description: "Integrate 1/x using ∫(1/x) dx = ln|x| + C and recognise the f′(x)/f(x) pattern for logarithmic integration.",
      learningIntention: "Apply ∫(1/x) dx = ln|x| + C and identify the reverse chain rule pattern ∫(f′(x)/f(x)) dx = ln|f(x)| + C.",
      successCriteria: [
        "Explain why the power rule fails at n = −1 and why ∫(1/x) dx = ln|x| + C fills this gap.",
        "Evaluate ∫(k/x) dx for any constant k.",
        "Recognise when a fraction has the form f′(x)/f(x) and integrate using ln|f(x)| + C.",
        "Evaluate definite integrals involving 1/x between positive limits.",
        "State the exact value of ∫₁ᵉ (1/x) dx = 1.",
      ],
      teaching: {
        paragraphs: [
          "The power rule ∫xⁿ dx = xⁿ⁺¹/(n+1) works for all n except n = −1, where division by zero occurs. The antiderivative of x^(−1) = 1/x is ln|x| + C, filling this gap.",
          "The absolute value in ln|x| is needed because 1/x is defined for all x ≠ 0 — including negative x — but ln x only accepts positive inputs. For most HSC problems where x > 0, you can write ln x, but ln|x| is the fully general form.",
          "The pattern ∫(f′(x)/f(x)) dx = ln|f(x)| + C is the most powerful version of this result. It applies whenever the numerator is (or can be made into) the derivative of the denominator. Check: is the numerator f′(x)? If yes, the integral is ln|f(x)|.",
          "The definite integral ∫₁ᵉ (1/x) dx = [ln x]₁ᵉ = ln e − ln 1 = 1 − 0 = 1. This is why e was chosen as the base of the natural logarithm: it makes this canonical area equal to exactly 1.",
          "To use the f′/f pattern, sometimes you need to factorise a constant. For example, ∫(x/(x²+1)) dx: the numerator x is (1/2) times the derivative 2x of x²+1. Factor out (1/2): (1/2)∫(2x/(x²+1)) dx = (1/2)ln(x²+1) + C.",
        ],
        latexBlocks: [
          "\\int \\frac{1}{x}\\,dx = \\ln|x|+C",
          "\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln|f(x)|+C",
          "\\int_1^e \\frac{1}{x}\\,dx = 1",
        ],
      },
      workedExamples: irWorked,
      guidedPractice: irGuided,
      independentPractice: irIndep,
      commonMistakes: [
        { mistake: "Writing ∫(1/x) dx = −x^(−2) + C by applying the power rule with n = −1.", fix: "The power rule gives xⁿ⁺¹/(n+1). At n = −1: x⁰/0 is undefined. Use ∫(1/x) dx = ln|x| + C instead." },
        { mistake: "Forgetting to check whether the numerator is the derivative of the denominator before applying ln.", fix: "Always compute d/dx(denominator) and check it matches (or is a scalar multiple of) the numerator. If not, the f′/f pattern does not apply." },
        { mistake: "Omitting the absolute value and writing ln(x) + C when x could be negative.", fix: "Write ln|x| + C for the general antiderivative. In specific problems where the domain guarantees x > 0, you may write ln(x) + C with a comment about the domain." },
      ],
      masteryQuiz: irMastery,
    };
  }

  if (lesson.slug === "applications-exp-log-calculus") {
    return {
      ...base,
      description: "Apply exponential and logarithmic derivatives and integrals to find tangents, stationary points, concavity, and areas.",
      learningIntention: "Use calculus results for eˣ and ln x to analyse curves, find tangents, locate stationary points, and calculate exact areas.",
      successCriteria: [
        "Find and classify stationary points of functions involving eˣ or ln x.",
        "Find the equation of a tangent to an exponential or logarithmic curve at a given point.",
        "Determine concavity of y = eˣ and y = ln x.",
        "Calculate exact areas under or between exponential and logarithmic curves.",
        "Apply the product rule to differentiate expressions like xe^x or x ln x.",
      ],
      teaching: {
        paragraphs: [
          "Curve sketching with eˣ and ln x follows the same six-step hierarchy as polynomial sketching. The new elements: eˣ > 0 always (no x-intercepts for y = eˣ alone), y = ln x has an x-intercept at (1, 0), and asymptotic behaviour must be described (eˣ → 0 as x → −∞; ln x → −∞ as x → 0⁺).",
          "For products like y = xeˣ or y = x ln x, the product rule is essential. These products often have elegant stationary points: y = xe^(−x) has a maximum at x = 1; y = x − ln x has a minimum at x = 1.",
          "Concavity: y = eˣ has y″ = eˣ > 0 always → always concave up (the graph is a bowl that opens upward). y = ln x has y″ = −1/x² < 0 for all x > 0 → always concave down. Neither has an inflection point.",
          "For tangent lines to y = eˣ: the gradient at x = a is eᵃ, and the point is (a, eᵃ). The tangent equation y = eᵃ(x − a) + eᵃ = eᵃ(x − a + 1) passes through (a − 1, 0) on the x-axis, a useful geometric fact.",
          "Area calculations: ∫₀¹ eˣ dx = e − 1 ≈ 1.718; ∫₁ᵉ (1/x) dx = 1. These exact values appear frequently in HSC exam questions — know them by heart.",
        ],
        latexBlocks: [
          "\\text{Product rule: }\\frac{d}{dx}(xe^x)=e^x(1+x);\\quad \\frac{d}{dx}(x\\ln x)=\\ln x+1",
          "y=e^x:\\;y''>0\\;\\forall x\\;(\\text{always concave up})",
          "y=\\ln x:\\;y''=-\\frac{1}{x^2}<0\\;\\forall x>0\\;(\\text{always concave down})",
        ],
      },
      workedExamples: apWorked,
      guidedPractice: apGuided,
      independentPractice: apIndep,
      commonMistakes: [
        { mistake: "Claiming y = eˣ has a stationary point at (0, 1).", fix: "y′ = eˣ > 0 always. The curve is strictly increasing — (0,1) is just the y-intercept, not a stationary point." },
        { mistake: "Evaluating area as ∫₀¹ eˣ dx = e without subtracting e⁰.", fix: "[eˣ]₀¹ = e¹ − e⁰ = e − 1. Always substitute both limits and subtract." },
        { mistake: "Forgetting d/dx(x ln x) requires the product rule.", fix: "x and ln x are separate functions multiplied together. Apply product rule: d/dx(x·ln x) = 1·ln x + x·(1/x) = ln x + 1." },
      ],
      masteryQuiz: apMastery,
    };
  }

  if (lesson.slug === "exp-log-calculus-exam-practice") {
    return {
      ...base,
      description: "HSC-style problems combining exponential and logarithmic differentiation, integration, curve analysis, and area calculations.",
      learningIntention: "Apply all exp/log calculus results to exam-standard problems: derivatives, integrals, tangents, stationary points, and areas.",
      successCriteria: [
        "Differentiate expressions combining eˣ, ln x, polynomials, and chain/product rules.",
        "Integrate expressions of the form e^(ax), k/x, and f′(x)/f(x).",
        "Find a function from its derivative using initial conditions.",
        "Calculate exact areas under exponential and reciprocal curves.",
        "Identify which integration technique applies from the form of the integrand.",
      ],
      teaching: {
        paragraphs: [
          "HSC exam questions on exponential and logarithmic calculus typically combine multiple skills: chain rule differentiation, product rule, integration with initial conditions, and area calculations. The key is to identify the structure of the expression first.",
          "Identifying the integration technique: if the integrand is e^(ax+b), divide by a. If the integrand is k/x or f′(x)/f(x), use ln. If neither applies (e.g., eˣ², ln(ln x)), the integral may be out of scope for this course.",
          "Initial value problems: given dy/dx, integrate to find y + C, then substitute the given point to find C. These appear as two-mark questions in HSC papers.",
          "Exact values matter in the HSC. Answers like e − 1, 2 ln 3, or 3/e are exact and should not be rounded. Leave answers in these forms unless decimal approximations are requested.",
          "The two key benchmark integrals: ∫₀¹ eˣ dx = e − 1 and ∫₁ᵉ (1/x) dx = 1. These define the fundamental meaning of e and ln, and appear as sub-questions in longer problems.",
        ],
        latexBlocks: [
          "\\text{Key benchmarks: }\\int_0^1 e^x\\,dx=e-1;\\quad \\int_1^e\\frac{1}{x}\\,dx=1",
          "\\text{Identify the form: }e^{ax}\\to\\frac{1}{a}e^{ax}+C;\\quad \\frac{f'}{f}\\to\\ln|f|+C",
        ],
      },
      workedExamples: [],
      guidedPractice: exGuided,
      independentPractice: exIndep,
      commonMistakes: [
        { mistake: "Integrating (eˣ + 1/x) and writing eˣ + ln x instead of eˣ + ln|x|.", fix: "The antiderivative of 1/x is ln|x|, not ln x. Include the absolute value in the general case." },
        { mistake: "Solving dy/dx = 2/x by writing y = 2 ln x and forgetting to apply the initial condition.", fix: "After integrating to y = 2 ln x + C, always substitute the given point to find the specific value of C." },
        { mistake: "Treating ∫e^(x²) dx as (1/(2x))e^(x²) + C.", fix: "The reverse chain rule only works when the 'inner derivative' is a constant. d/dx(x²) = 2x is not constant, so this shortcut does not apply." },
      ],
      masteryQuiz: exMastery,
    };
  }

  return null;
}
