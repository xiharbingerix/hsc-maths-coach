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

function trigCalculusFeedback(prompt: string, latex: string, answer: string) {
  if (/integral|integrate|area/i.test(prompt)) {
    return `Identify the sine or cosine antiderivative, reverse any constant inner derivative, and distinguish signed accumulation from total area. Applying that process to ${latex || "the stated integrand"} gives ${answer}.`;
  }
  if (/gradient|tangent|stationary|concav/i.test(prompt)) {
    return `Differentiate in radians first, then apply the requested point, zero, or sign condition. Using the derivative rather than the original function for ${latex || "the stated curve"} gives ${answer}.`;
  }
  return `Apply the sine, cosine, or tangent derivative rule and preserve every required chain, product, or sign factor. For ${latex || "the stated function"}, the resulting expression is ${answer}.`;
}

function trigCalculusHint(prompt: string) {
  if (/integral|integrate|area/i.test(prompt)) {
    return "Reverse the trig derivative and divide by any constant inner coefficient.";
  }
  if (/gradient|tangent|stationary|concav/i.test(prompt)) {
    return "Differentiate first, then evaluate or solve the required derivative condition.";
  }
  return "Identify the outer trig function and include every inner derivative factor.";
}

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: trigCalculusHint(prompt),
    explanation: trigCalculusFeedback(prompt, latex, answer),
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
  cartesianGraph,
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
  cartesianGraph?: PracticeQuestion["cartesianGraph"];
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
    cartesianGraph,
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
  cartesianGraph,
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
  cartesianGraph?: PracticeQuestion["cartesianGraph"];
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
    cartesianGraph,
  };
}

// ─── L1: Differentiating sin x and cos x ─────────────────────────────────────

const dsWorked: WorkedExample[] = [
  {
    title: "Differentiate y = 3 sin x − 2 cos x",
    questionLatex: "y = 3\\sin x - 2\\cos x",
    steps: [
      { explanation: "Apply d/dx(sin x) = cos x to the first term.", latex: "\\frac{d}{dx}(3\\sin x)=3\\cos x" },
      { explanation: "Apply d/dx(cos x) = −sin x to the second term.", latex: "\\frac{d}{dx}(-2\\cos x)=-2(-\\sin x)=2\\sin x" },
      { explanation: "Combine.", latex: "\\frac{dy}{dx}=3\\cos x+2\\sin x" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=3\\cos x+2\\sin x",
  },
  {
    title: "Find the gradient of y = sin x at x = π/2",
    questionLatex: "y = \\sin x\\text{ at }x=\\pi/2",
    steps: [
      { explanation: "Differentiate.", latex: "\\frac{dy}{dx}=\\cos x" },
      { explanation: "Evaluate at x = π/2.", latex: "\\cos\\frac{\\pi}{2}=0" },
    ],
    finalAnswerLatex: "\\text{Gradient}=0",
  },
];

const dsGuided: PracticeQuestion[] = [
  fa("y11adv-tc-ds-g1", "Differentiate the stated sine function.", "y = \\sin x", "cos x", ["\\cos x"]),
  mc("y11adv-tc-ds-g2", "Which expression equals d/dx(cos x)?", "D",
    [{ label: "A", text: "$\\cos x$" }, { label: "B", text: "$\\sin x$" }, { label: "C", text: "$-\\cos x$" }, { label: "D", text: "$-\\sin x$" }],
    "d/dx(cos x) = −sin x. The negative sign is important: differentiating cosine gives minus sine.", ""),
  fa("y11adv-tc-ds-g3", "Differentiate the stated cosine multiple.", "y = 4\\cos x", "-4sin x", ["-4\\sin x"]),
  mc("y11adv-tc-ds-g4", "The gradient of y = sin x at x = 0 is:", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$-1$" }, { label: "C", text: "$1$" }, { label: "D", text: "$\\pi$" }],
    "Differentiate first to obtain dy/dx = cos x. At x = 0, the exact value cos 0 = 1, so the gradient is 1.", "y=\\sin x"),
];

const dsIndep: PracticeQuestion[] = [
  fa("y11adv-tc-ds-i1", "Differentiate the stated sine multiple.", "y = 5\\sin x", "5cos x", ["5\\cos x"]),
  fa("y11adv-tc-ds-i2", "Find dy/dx.", "y = \\sin x + \\cos x", "cos x - sin x", ["\\cos x-\\sin x"]),
  mc("y11adv-tc-ds-i3", "Which is NOT a consequence of d/dx(sin x) = cos x?", "D",
    [{ label: "A", text: "d/dx(sin x) = 0 at x = π/2" }, { label: "B", text: "d/dx(sin x) = 1 at x = 0" }, { label: "C", text: "sin x has a stationary point at x = π/2" }, { label: "D", text: "The gradient of sin x is always positive" }],
    "cos(π/2) = 0 means sin x has a stationary point at x = π/2 (not that d/dx is not a consequence of the formula). The gradient cos x is positive on (0, π/2) but negative on (π/2, 3π/2) — it is not always positive.", ""),
  fa("y11adv-tc-ds-i4", "Find the gradient of y = cos x at x = π.", "", "0", ["-sin(π)", "\\sin 0"]),
  mc("y11adv-tc-ds-i5", "Why must angles be measured in radians when differentiating trig functions?", "B",
    [{ label: "A", text: "Degrees always give the same result" }, { label: "B", text: "The limit definition of d/dx(sin x) uses the small-angle approximation sin h ≈ h, which requires radians" }, { label: "C", text: "Radians are a convention only" }, { label: "D", text: "Degree mode gives complex numbers" }],
    "The derivative d/dx(sin x) = cos x is derived from lim(h→0)(sin h)/h = 1. This limit equals 1 only when h is in radians. In degrees, lim(h→0)(sin h°)/h = π/180 ≠ 1, giving a different derivative.", ""),
];

const dsMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-tc-ds-qm1",
    prompt: "Differentiate the linear combination.",
    latex: "y=3\\sin x-5\\cos x",
    answer: "y'=3cos(x)+5sin(x)",
    acceptedAnswers: ["dy/dx=3\\cos x+5\\sin x", "5sin x+3cos x"],
    hint: "Differentiate each term and remember that cosine contributes a negative sine.",
    explanation: "Differentiate term by term: d/dx[3sin x]=3cos x, while d/dx[-5cos x]=-5(-sin x)=5sin x. Therefore y′=3cos x+5sin x.",
    difficulty: 3,
    diagnosticIntent: "Checks direct trig differentiation and control of the double negative on cosine.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-tc-ds-qm2",
    prompt: "A student differentiates the function as shown. Which diagnosis is correct?",
    latex: "\\frac d{dx}(4\\cos x)=4\\sin x",
    answer: "B",
    choices: [
      "The coefficient 4 should be removed.",
      "The sine term needs a negative sign.",
      "Cosine differentiates to cosine, not sine.",
      "The result is correct only for x>0.",
    ],
    hint: "Recall the direction and sign of the four-step trig derivative cycle.",
    explanation: "The derivative cycle sends cos x to -sin x. The constant multiple 4 remains, so the correct derivative is -4sin x. Option B identifies the missing negative sign.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses the most common sign error when differentiating a cosine term.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Incorrectly discards a constant multiplier during differentiation.",
      C: "Assumes cosine is its own first derivative.",
      D: "Treats a differentiation identity as dependent on the sign of x.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ds-qm3",
    prompt: "Find the exact gradient at the stated point.",
    latex: "y=\\sin x,\\qquad x=\\frac\\pi3",
    answer: "1/2",
    acceptedAnswers: ["0.5", "\\frac12", "cos(π/3)=1/2"],
    hint: "Differentiate sine first, then use the exact cosine value at pi over three.",
    explanation: "Since y′=cos x, the required gradient is cos(π/3). The unit-circle exact value is cos(π/3)=1/2, so the gradient is positive one half.",
    difficulty: 3,
    diagnosticIntent: "Checks exact evaluation of a basic trigonometric derivative at a standard angle.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-ds-qm4",
    prompt: "Which second derivative is correct?",
    latex: "y=\\sin x",
    answer: "C",
    choices: ["cos x", "-cos x", "-sin x", "sin x"],
    hint: "Move two steps around the sine-cosine derivative cycle.",
    explanation: "The first derivative of sin x is cos x, and the derivative of cos x is -sin x. Therefore y′′=-sin x, so the function returns with its sign reversed after two derivatives.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses confusion between first and second positions in the trig derivative cycle.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Stops after taking only one derivative.",
      B: "Changes the sign but retains the wrong trig function.",
      D: "Assumes the two sign changes cancel after two derivatives.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ds-qm5",
    prompt: "Determine A and B, then reconstruct the function.",
    latex: "f(x)=A\\sin x+B\\cos x,\\qquad f(0)=3,\\qquad f'(0)=4",
    answer: "A=4, B=3; f(x)=4sin(x)+3cos(x)",
    acceptedAnswers: [
      "A=4,B=3,f(x)=4\\sin x+3\\cos x",
      "f(x)=3cos x+4sin x",
      "A = 4 and B = 3, so f=4sin x+3cos x",
    ],
    hint: "Evaluate f and its derivative at zero, using sin zero and cos zero.",
    explanation: "At x=0, f(0)=B because sin0=0 and cos0=1, so B=3. Also f′=Acos x-Bsin x, hence f′(0)=A=4. Thus f(x)=4sin x+3cos x.",
    difficulty: 4,
    diagnosticIntent: "Assesses parameter recovery from function and gradient data at a standard angle.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-tc-ds-qm6",
    prompt: "Investigate the second derivative and state the invariant for all real A and B.",
    latex: "f(x)=A\\sin x+B\\cos x",
    answer: "f''(x)=-f(x)",
    acceptedAnswers: [
      "f''+f=0",
      "d²f/dx²=-(A sin x+B cos x)",
      "every such linear combination satisfies f''=-f",
    ],
    hint: "Differentiate the general linear combination twice without assigning values to A or B.",
    explanation: "First, f′=Acos x-Bsin x. Differentiating again gives f′′=-Asin x-Bcos x=-(Asin x+Bcos x)=-f(x). The identity holds for every real A and B.",
    difficulty: 4,
    diagnosticIntent: "Investigates a structural differential-equation invariant of all sine-cosine combinations.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-tc-ds-qm7",
    prompt: "Find the equation of the tangent at the stated point.",
    latex: "y=\\sin x\\quad\\text{at}\\quad(\\pi,0)",
    answer: "y=-(x-π)",
    acceptedAnswers: ["y=-x+π", "y-0=-1(x-π)", "y=π-x"],
    hint: "The tangent gradient is cos pi; then use point-gradient form.",
    explanation: "The derivative is cos x, so the gradient at x=π is cosπ=-1. Through (π,0), point-gradient form gives y-0=-1(x-π), hence y=-(x-π)=π-x.",
    difficulty: 4,
    diagnosticIntent: "Combines exact trig differentiation with construction of a tangent line.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-ds-qm8",
    prompt: "Suppose x is measured in degrees. Which derivative is correct?",
    latex: "f(x)=\\sin(x^\\circ)",
    answer: "D",
    choices: [
      "cos(x°)",
      "180cos(x°)",
      "(180/π)cos(x°)",
      "(π/180)cos(x°)",
    ],
    hint: "Rewrite x degrees as pi x over 180 radians before differentiating.",
    explanation: "Since x° equals πx/180 radians, f(x)=sin(πx/180). The chain rule gives f′(x)=(π/180)cos(πx/180), written as (π/180)cos(x°).",
    difficulty: 5,
    diagnosticIntent: "Diagnoses why the familiar trig derivative rules require radian measure.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses the radian derivative without converting the input unit.",
      B: "Uses degrees as a direct multiplicative chain factor.",
      C: "Inverts the radians-per-degree conversion factor.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ds-qm9",
    prompt: "Reconstruct the function from value and gradient data at pi over two.",
    latex: "f(x)=A\\sin x+B\\cos x,\\qquad f(\\pi/2)=2,\\qquad f'(\\pi/2)=-3",
    answer: "f(x)=2sin(x)+3cos(x)",
    acceptedAnswers: [
      "A=2,B=3,f(x)=2\\sin x+3\\cos x",
      "3cos x+2sin x",
      "A = 2 and B = 3",
    ],
    hint: "At pi over two, sine is one and cosine is zero; evaluate f and f prime.",
    explanation: "The first condition gives A=2. Since f′=Acos x-Bsin x, evaluating at π/2 gives -B=-3, so B=3. Therefore f(x)=2sin x+3cos x.",
    difficulty: 5,
    diagnosticIntent: "Synthesises function and derivative constraints at a nonzero standard angle.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-tc-ds-qm10",
    prompt: "Find the member of the sine-cosine family satisfying all conditions.",
    latex: "f''+f=0,\\qquad f(0)=1,\\qquad f'(0)=2",
    answer: "f(x)=2sin(x)+cos(x)",
    acceptedAnswers: [
      "f(x)=\\cos x+2\\sin x",
      "A=2,B=1 in f=A sin x+B cos x",
      "cos x+2sin x",
    ],
    hint: "Use the general family A sin x plus B cos x, then impose the two initial conditions.",
    explanation: "Every function Asin x+Bcos x satisfies f′′+f=0. The condition f(0)=1 gives B=1, while f′(0)=A=2. Hence the required member is f(x)=2sin x+cos x.",
    difficulty: 5,
    diagnosticIntent: "Synthesises a differential equation, a general trig family, and two initial conditions.",
    taskType: "synthesis",
  }),
];

// ─── L2: Differentiating Trig Functions with the Chain Rule ──────────────────

const dcWorked: WorkedExample[] = [
  {
    title: "Differentiate y = sin(3x + 1)",
    questionLatex: "y = \\sin(3x+1)",
    steps: [
      { explanation: "Inner function: 3x+1, inner derivative: 3.", latex: "" },
      { explanation: "Chain rule for sin: d/dx(sin(f(x))) = f′(x)·cos(f(x)).", latex: "\\frac{dy}{dx}=3\\cos(3x+1)" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=3\\cos(3x+1)",
  },
  {
    title: "Differentiate y = cos(2x − π/3)",
    questionLatex: "y = \\cos(2x-\\pi/3)",
    steps: [
      { explanation: "Inner function: 2x − π/3, inner derivative: 2.", latex: "" },
      { explanation: "Chain rule for cos: d/dx(cos(f(x))) = −f′(x)·sin(f(x)).", latex: "\\frac{dy}{dx}=-2\\sin(2x-\\pi/3)" },
    ],
    finalAnswerLatex: "\\frac{dy}{dx}=-2\\sin\\!\\left(2x-\\frac{\\pi}{3}\\right)",
  },
  {
    title: "Differentiate y = tan x",
    questionLatex: "y = \\tan x = \\frac{\\sin x}{\\cos x}",
    steps: [
      { explanation: "Apply the quotient rule: u = sin x, v = cos x.", latex: "u'=\\cos x,\\quad v'=-\\sin x" },
      { explanation: "Quotient rule.", latex: "\\frac{dy}{dx}=\\frac{\\cos x\\cdot\\cos x-\\sin x(-\\sin x)}{\\cos^2 x}=\\frac{\\cos^2 x+\\sin^2 x}{\\cos^2 x}" },
      { explanation: "Use sin²x + cos²x = 1.", latex: "\\frac{dy}{dx}=\\frac{1}{\\cos^2 x}=\\sec^2 x" },
    ],
    finalAnswerLatex: "\\frac{d}{dx}(\\tan x)=\\sec^2 x",
  },
];

const dcGuided: PracticeQuestion[] = [
  fa("y11adv-tc-dc-g1", "Find dy/dx.", "y = \\sin(2x)", "2cos(2x)", ["2\\cos(2x)"]),
  mc("y11adv-tc-dc-g2", "Which expression equals d/dx(cos(5x))?", "B",
    [{ label: "A", text: "$\\sin(5x)$" }, { label: "B", text: "$-5\\sin(5x)$" }, { label: "C", text: "$5\\cos(5x)$" }, { label: "D", text: "$-\\sin(5x)$" }],
    "Chain rule: inner function 5x has derivative 5. d/dx(cos(f(x))) = −f′·sin(f). So −5 sin(5x).", ""),
  fa("y11adv-tc-dc-g3", "Find dy/dx.", "y = \\cos(3x+\\pi)", "-3sin(3x+π)", ["-3\\sin(3x+\\pi)"]),
  mc("y11adv-tc-dc-g4", "Which general rule equals d/dx(sin(ax+b))?", "A",
    [{ label: "A", text: "$a\\cos(ax+b)$" }, { label: "B", text: "$\\cos(ax+b)$" }, { label: "C", text: "$-a\\cos(ax+b)$" }, { label: "D", text: "$a\\sin(ax+b)$" }],
    "Chain rule: inner derivative is a. Outer derivative of sin is cos. Result: a·cos(ax+b).", ""),
];

const dcIndep: PracticeQuestion[] = [
  fa("y11adv-tc-dc-i1", "Find dy/dx.", "y = \\sin(4x-1)", "4cos(4x-1)", ["4\\cos(4x-1)"]),
  fa("y11adv-tc-dc-i2", "Find dy/dx.", "y = 3\\cos(2x)", "-6sin(2x)", ["-6\\sin(2x)"]),
  mc("y11adv-tc-dc-i3", "Find the gradient of y = sin(πx) at x = 1.", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "$-\\pi$" }, { label: "D", text: "$\\pi$" }],
    "dy/dx = π cos(πx). At x=1: π cos(π) = π·(−1) = −π.", ""),
  fa("y11adv-tc-dc-i4", "Find dy/dx.", "y = \\tan(2x)", "2sec²(2x)", ["2\\sec^2(2x)", "2/cos²(2x)"]),
  mc("y11adv-tc-dc-i5", "Which general rule equals d/dx(cos(ax+b))?", "B",
    [{ label: "A", text: "$\\sin(ax+b)$" }, { label: "B", text: "$-a\\sin(ax+b)$" }, { label: "C", text: "$a\\sin(ax+b)$" }, { label: "D", text: "$-a\\cos(ax+b)$" }],
    "Chain rule: inner derivative a. Outer derivative of cos is −sin. Result: −a·sin(ax+b).", ""),
];

const dcMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-tc-dc-qm1",
    prompt: "Differentiate the composite sine function.",
    latex: "y=\\sin(5x+2)",
    answer: "y'=5cos(5x+2)",
    acceptedAnswers: ["dy/dx=5\\cos(5x+2)", "5 cos(5x+2)"],
    hint: "Differentiate the outer sine, then multiply by the derivative of 5x plus 2.",
    explanation: "The outer derivative of sine is cosine, while the inner function 5x+2 has derivative 5. The chain rule therefore gives y′=5cos(5x+2).",
    difficulty: 3,
    diagnosticIntent: "Checks direct use of the chain rule with a linear inner function.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-tc-dc-qm2",
    prompt: "Which derivative has the correct trig function, sign, and chain factor?",
    latex: "y=\\cos(3x-1)",
    answer: "C",
    choices: ["sin(3x-1)", "-sin(3x-1)", "-3sin(3x-1)", "3cos(3x-1)"],
    hint: "Differentiate cosine first, then multiply by the inner derivative three.",
    explanation: "Cosine differentiates to negative sine, and the inner function 3x-1 contributes a factor 3. Thus y′=-3sin(3x-1), which is option C.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses omission of either the cosine sign or the constant inner derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Omits both the negative sign and the inner derivative.",
      B: "Includes the cosine sign but omits the factor three.",
      D: "Retains cosine instead of differentiating the outer function.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-dc-qm3",
    prompt: "Differentiate the tangent function.",
    latex: "y=\\tan(2x)",
    answer: "y'=2sec²(2x)",
    acceptedAnswers: ["dy/dx=2\\sec^2(2x)", "2/cos²(2x)"],
    hint: "Use the derivative of tangent and multiply by the derivative of 2x.",
    explanation: "The derivative of tan u is sec²u times du/dx. With u=2x, du/dx=2, so y′=2sec²(2x). The inner factor must not be omitted.",
    difficulty: 3,
    diagnosticIntent: "Checks the tangent derivative combined with a constant chain-rule factor.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-tc-dc-qm4",
    prompt: "A student writes the displayed derivative. Which diagnosis is correct?",
    latex: "\\frac d{dx}\\sin(x^2)=\\cos(x^2)",
    answer: "B",
    choices: [
      "The cosine should be replaced by negative sine.",
      "The result is missing the inner derivative factor 2x.",
      "The exponent should become x.",
      "The derivative is correct for positive x.",
    ],
    hint: "Name the inner function and calculate its derivative before judging the result.",
    explanation: "For u=x², d/dx[sin u]=cos u·u′. Since u′=2x, the correct derivative is 2xcos(x²). Option B identifies the missing chain-rule factor.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses omission of a variable inner derivative in a composite trig function.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses the cosine derivative rule instead of the sine derivative rule.",
      C: "Applies a power-rule change directly inside the trig function.",
      D: "Assumes a domain restriction repairs a missing derivative factor.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-dc-qm5",
    prompt: "Determine the positive parameter k.",
    latex: "f(x)=\\sin(kx),\\qquad f'(0)=4,\\qquad k>0",
    answer: "k=4",
    acceptedAnswers: ["4", "k = 4", "f'(0)=k cos0=k=4"],
    hint: "Differentiate in terms of k and evaluate cosine at zero.",
    explanation: "Differentiation gives f′(x)=kcos(kx). At x=0, cos0=1, so f′(0)=k. The given gradient is 4 and k is positive, hence k=4.",
    difficulty: 4,
    diagnosticIntent: "Assesses reverse inference of an inner-frequency parameter from local gradient data.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-tc-dc-qm6",
    prompt: "For positive integer n, determine the number and form of all stationary points in the interval.",
    latex: "f_n(x)=\\sin(nx),\\qquad 0\\le x\\le2\\pi",
    answer: "There are 2n stationary points: x=(2k+1)π/(2n), k=0,...,2n-1",
    acceptedAnswers: [
      "2n points at x=(π/2+kπ)/n for k=0,...,2n-1",
      "x=(2k+1)π/(2n), 0≤k≤2n-1",
      "the family has exactly 2n stationary points",
    ],
    hint: "Set n cos(nx) equal to zero and count the cosine zeros as nx spans zero to 2n pi.",
    explanation: "Since f′n(x)=ncos(nx), stationary points satisfy nx=π/2+kπ. Thus x=(2k+1)π/(2n). As nx runs to 2nπ, k=0,...,2n-1, giving exactly 2n points.",
    difficulty: 4,
    diagnosticIntent: "Investigates how frequency controls the number and spacing of stationary points.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-tc-dc-qm7",
    prompt: "Find the tangent equation at the specified input.",
    latex: "y=\\sin(x^2),\\qquad x=\\sqrt\\pi",
    answer: "y=-2√π(x-√π)",
    acceptedAnswers: [
      "y=-2\\sqrt\\pi(x-\\sqrt\\pi)",
      "y=-2sqrt(pi)x+2pi",
      "y-0=-2√π(x-√π)",
    ],
    hint: "Evaluate both sin(x squared) and 2x cos(x squared) at x equals root pi.",
    explanation: "At x=√π, y=sinπ=0. The derivative is 2xcos(x²), so the gradient is 2√πcosπ=-2√π. Point-gradient form gives y=-2√π(x-√π).",
    difficulty: 4,
    diagnosticIntent: "Combines a nonlinear trig chain rule with exact tangent construction.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-dc-qm8",
    prompt: "Which derivative correctly applies both nested chain-rule layers?",
    latex: "y=\\sin^2(3x)",
    answer: "D",
    choices: [
      "2sin(3x)cos(3x)",
      "6sin²(3x)",
      "3sin(6x)",
      "6sin(3x)cos(3x)",
    ],
    hint: "Treat the square as the outer layer, sine as the next layer, and 3x as the inner layer.",
    explanation: "Write y=[sin(3x)]². Differentiating the square gives 2sin(3x), differentiating sine gives cos(3x), and differentiating 3x gives 3. Their product is 6sin(3x)cos(3x).",
    difficulty: 5,
    diagnosticIntent: "Diagnoses loss of one factor in a three-layer trigonometric chain rule.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Handles the square and sine but omits the inner factor three.",
      B: "Differentiates the outer square without differentiating sine.",
      C: "Misuses the double-angle identity and loses the correct coefficient.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-dc-qm9",
    prompt: "Determine k and b, then reconstruct f.",
    latex: "f(x)=\\sin(kx+b),\\quad k>0,\\quad0\\le b<2\\pi,\\quad f(0)=0,\\quad f'(0)=3",
    answer: "k=3, b=0; f(x)=sin(3x)",
    acceptedAnswers: [
      "b=0,k=3,f(x)=\\sin(3x)",
      "f(x)=sin(3x)",
      "k = 3 and b = 0",
    ],
    hint: "Use sin b equals zero, then use k cos b equals three with the parameter restrictions.",
    explanation: "The value condition gives sin b=0, so b is 0 or π in the stated range. Since f′(0)=kcos b=3 and k>0, cos b must be positive; hence b=0 and k=3.",
    difficulty: 5,
    diagnosticIntent: "Synthesises phase, frequency, value, gradient, and parameter restrictions.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-tc-dc-qm10",
    prompt: "The first positive stationary point occurs at x=1. Determine a and classify that point.",
    latex: "f(x)=\\sin(ax^2),\\qquad a>0",
    answer: "a=π/2 and x=1 is a maximum",
    acceptedAnswers: [
      "a=\\pi/2; local maximum at x=1",
      "a = π/2 and f(1)=1 is a maximum",
      "a=π/2, maximum",
    ],
    hint: "Differentiate, then use the first positive zero of cosine rather than the zero at x equals zero.",
    explanation: "Here f′=2axcos(ax²). After x=0, the first stationary point occurs when ax²=π/2. Setting x=1 gives a=π/2. The derivative changes positive-to-negative, so it is a maximum.",
    difficulty: 5,
    diagnosticIntent: "Synthesises nonlinear chain-rule structure, first-root ordering, parameter recovery, and classification.",
    taskType: "synthesis",
  }),
];

// ─── L3: Integrating sin x and cos x ─────────────────────────────────────────

const isWorked: WorkedExample[] = [
  {
    title: "Find ∫sin x dx",
    questionLatex: "\\int \\sin x\\,dx",
    steps: [
      { explanation: "We need a function whose derivative is sin x. Recall d/dx(cos x) = −sin x.", latex: "" },
      { explanation: "So d/dx(−cos x) = sin x. Therefore the antiderivative of sin x is −cos x.", latex: "\\int \\sin x\\,dx=-\\cos x+C" },
      { explanation: "Check: d/dx(−cos x + C) = −(−sin x) = sin x ✓.", latex: "" },
    ],
    finalAnswerLatex: "-\\cos x+C",
  },
  {
    title: "Evaluate ∫₀^(π/2) cos x dx",
    questionLatex: "\\int_0^{\\pi/2} \\cos x\\,dx",
    steps: [
      { explanation: "Antiderivative of cos x is sin x.", latex: "" },
      { explanation: "Evaluate.", latex: "\\left[\\sin x\\right]_0^{\\pi/2}=\\sin\\frac{\\pi}{2}-\\sin 0=1-0=1" },
    ],
    finalAnswerLatex: "1",
  },
];

const isGuided: PracticeQuestion[] = [
  fa("y11adv-tc-is-g1", "Find the integral.", "\\int \\cos x\\,dx", "sin x+C", ["\\sin x+C"]),
  mc("y11adv-tc-is-g2", "Which expression is the general antiderivative ∫sin x dx?", "C",
    [{ label: "A", text: "$\\cos x+C$" }, { label: "B", text: "$-\\cos x$" }, { label: "C", text: "$-\\cos x+C$" }, { label: "D", text: "$\\sin x+C$" }],
    "The antiderivative of sin x is −cos x + C. The negative sign is essential — differentiating −cos x gives sin x.", ""),
  fa("y11adv-tc-is-g3", "Find the integral.", "\\int 3\\cos x\\,dx", "3sin x+C", ["3\\sin x+C"]),
  mc("y11adv-tc-is-g4", "Evaluate ∫₀^(π/2) sin x dx.", "B",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "$-1$" }, { label: "D", text: "$2$" }],
    "[−cos x]₀^(π/2) = −cos(π/2) − (−cos 0) = 0 − (−1) = 1.", ""),
];

const isIndep: PracticeQuestion[] = [
  fa("y11adv-tc-is-i1", "Find the integral.", "\\int 2\\sin x\\,dx", "-2cos x+C", ["-2\\cos x+C"]),
  fa("y11adv-tc-is-i2", "Find the integral.", "\\int (\\sin x+\\cos x)\\,dx", "-cos x + sin x+C", ["\\sin x-\\cos x+C"]),
  mc("y11adv-tc-is-i3", "Evaluate the definite integral ∫₀^π sin x dx exactly.", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$-2$" }, { label: "C", text: "$2$" }, { label: "D", text: "$1$" }],
    "[−cos x]₀^π = −cos π − (−cos 0) = 1 − (−1) = 2.", ""),
  fa("y11adv-tc-is-i4", "Evaluate.", "\\int_0^{\\pi} \\cos x\\,dx", "0", ["sin(π)-sin(0)", "\\sin\\pi-\\sin0"]),
  mc("y11adv-tc-is-i5", "Which ordered pair gives (∫cos x dx, ∫sin x dx), ignoring constants?", "D",
    [{ label: "A", text: "$\\sin x$ and $\\cos x$" }, { label: "B", text: "$\\cos x$ and $\\sin x$" }, { label: "C", text: "$-\\sin x$ and $\\cos x$" }, { label: "D", text: "$\\sin x$ and $-\\cos x$" }],
    "d/dx(sin x) = cos x → ∫cos x dx = sin x. d/dx(−cos x) = sin x → ∫sin x dx = −cos x.", ""),
];

const isMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-tc-is-qm1",
    prompt: "Find the general antiderivative.",
    latex: "\\int(3\\cos x-2\\sin x)\\,dx",
    answer: "3sin(x)+2cos(x)+C",
    acceptedAnswers: ["3\\sin x+2\\cos x+C", "2cos x+3sin x+C"],
    hint: "Integrate term by term and remember that the antiderivative of negative sine is positive cosine.",
    explanation: "The antiderivative of 3cos x is 3sin x. Since d/dx[2cos x]=-2sin x, the second antiderivative is 2cos x. Thus the result is 3sin x+2cos x+C.",
    difficulty: 3,
    diagnosticIntent: "Checks direct antiderivatives of a linear sine-cosine combination with signs.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-tc-is-qm2",
    prompt: "Which expression is the complete general antiderivative?",
    latex: "\\int\\sin x\\,dx",
    answer: "C",
    choices: ["cos x+C", "-cos x", "-cos x+C", "sin x+C"],
    hint: "Differentiate each candidate and check both the sign and the family constant.",
    explanation: "Because d/dx[-cos x]=sin x, the required primitive is -cos x+C. The negative sign and arbitrary constant are both necessary, making option C complete.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses sign loss and omission of the arbitrary constant in trig integration.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Forgets that differentiating cosine introduces a negative sign.",
      B: "Finds one primitive but omits the full family constant.",
      D: "Treats sine as its own antiderivative.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-is-qm3",
    prompt: "Evaluate the definite integral exactly.",
    latex: "\\int_0^{\\pi/2}(\\sin x+\\cos x)\\,dx",
    answer: "2",
    acceptedAnswers: ["2.0", "[-cos x+sin x]_0^(π/2)=2", "1+1"],
    hint: "Use negative cosine plus sine as the antiderivative and evaluate both endpoints.",
    explanation: "An antiderivative is -cos x+sin x. At π/2 its value is 1, while at 0 its value is -1. Subtracting gives 1-(-1)=2.",
    difficulty: 3,
    diagnosticIntent: "Checks exact definite integration of combined sine and cosine terms.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-is-qm4",
    prompt: "Why is the displayed definite integral zero even though the curve is not zero?",
    latex: "\\int_0^{2\\pi}\\sin x\\,dx=0",
    answer: "B",
    choices: [
      "Sine has no area on a complete period.",
      "Equal positive and negative signed contributions cancel.",
      "The antiderivative of sine is sine, with equal endpoint values.",
      "Every periodic function integrates to zero over a period.",
    ],
    hint: "Distinguish a signed definite integral from total geometric area.",
    explanation: "Sine is positive on (0,π) and negative on (π,2π), with equal magnitudes by symmetry. A definite integral is signed accumulation, so these contributions cancel to zero.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses confusion between signed accumulation, total area, and periodicity.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Interprets cancellation as absence of geometric area.",
      C: "Uses the wrong antiderivative for sine.",
      D: "Overgeneralises a symmetry result to every periodic function.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-is-qm5",
    prompt: "Determine A and B from the antiderivative identity.",
    latex: "\\int(A\\sin x+B\\cos x)\\,dx=4\\cos x+3\\sin x+C",
    answer: "A=-4, B=3",
    acceptedAnswers: ["A=−4,B=3", "A = -4 and B = 3", "(-4,3)"],
    hint: "Differentiate the right-hand side and match the sine and cosine coefficients.",
    explanation: "Differentiating 4cos x+3sin x gives -4sin x+3cos x. Matching this with Asin x+Bcos x yields A=-4 and B=3.",
    difficulty: 4,
    diagnosticIntent: "Assesses reverse coefficient inference from a trigonometric primitive.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-tc-is-qm6",
    prompt: "Compare the two symmetric-interval integrals for a>0 and explain the pattern.",
    latex: "\\int_{-a}^{a}\\sin x\\,dx\\quad\\text{and}\\quad\\int_{-a}^{a}\\cos x\\,dx",
    answer: "The sine integral is 0; the cosine integral is 2sin(a)",
    acceptedAnswers: [
      "0 and 2\\sin a",
      "sine cancels by odd symmetry; cosine gives 2sin a",
      "∫_-a^a sin x dx=0, ∫_-a^a cos x dx=2sin a",
    ],
    hint: "Use odd-even symmetry or evaluate the antiderivatives at plus and minus a.",
    explanation: "Sine is odd, so its values cancel across a symmetric interval and the integral is zero. Cosine is even, so its integral doubles: 2∫₀ᵃcos x dx=2sin a.",
    difficulty: 4,
    diagnosticIntent: "Investigates how parity changes trigonometric accumulation on symmetric intervals.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-tc-is-qm7",
    prompt: "Solve the initial-value problem.",
    latex: "F'(x)=2\\sin x-3\\cos x,\\qquad F(0)=4",
    answer: "F(x)=-2cos(x)-3sin(x)+6",
    acceptedAnswers: [
      "F(x)=-2\\cos x-3\\sin x+6",
      "6-2cos x-3sin x",
      "F=-3sin x-2cos x+6",
    ],
    hint: "Integrate first, then use sine zero and cosine zero values at x equals zero.",
    explanation: "Integration gives F=-2cos x-3sin x+C. At x=0, this becomes -2+C=4, so C=6. Therefore F(x)=-2cos x-3sin x+6.",
    difficulty: 4,
    diagnosticIntent: "Combines basic trig integration with an initial condition and exact values.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-is-qm8",
    prompt: "A student claims the total enclosed area is zero. Which correction is valid?",
    latex: "\\int_0^\\pi\\cos x\\,dx=0",
    answer: "D",
    choices: [
      "The integral should equal π because the interval has width π.",
      "Cosine is always positive, so the integral cannot be zero.",
      "The antiderivative should be negative sine.",
      "The signed integral is zero, but total area is 2 after splitting at π/2.",
    ],
    hint: "Locate where cosine changes sign and distinguish its signed integral from total area.",
    explanation: "Cosine is positive on [0,π/2] and negative on [π/2,π]. The signed contributions cancel, but total area takes both magnitudes: 1+1=2. Option D makes the required distinction.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses an invalid conversion from zero signed accumulation to zero geometric area.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses interval width as area without considering function height.",
      B: "Ignores the negative half of cosine on the interval.",
      C: "Uses the wrong antiderivative and still does not address total area.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-is-qm9",
    prompt: "Determine A, B, and C, then reconstruct F.",
    latex: "F'(x)=A\\sin x+B\\cos x,\\quad F(0)=1,\\quad F'(0)=2,\\quad F(\\pi)=5",
    answer: "A=2, B=2, C=3; F(x)=-2cos(x)+2sin(x)+3",
    acceptedAnswers: [
      "F(x)=-2\\cos x+2\\sin x+3",
      "A=2,B=2,C=3,F=-2cos x+2sin x+3",
      "F=2sin x-2cos x+3",
    ],
    hint: "Write F=-A cos x+B sin x+C, then apply the three conditions.",
    explanation: "A primitive is F=-Acos x+Bsin x+C. From F′(0)=B=2. The values F(0)=-A+C=1 and F(π)=A+C=5 give A=2 and C=3.",
    difficulty: 5,
    diagnosticIntent: "Synthesises derivative and endpoint data to reconstruct all coefficients of a primitive.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-tc-is-qm10",
    prompt: "Reconstruct the displacement function from its velocity and two observations.",
    latex: "v(x)=A\\cos x+B\\sin x,\\quad s(0)=0,\\quad s(\\pi/2)=3,\\quad s(\\pi)=4",
    answer: "A=1, B=2; s(x)=sin(x)-2cos(x)+2",
    acceptedAnswers: [
      "s(x)=\\sin x-2\\cos x+2",
      "A=1,B=2,s=sin x-2cos x+2",
      "s=2+sin x-2cos x",
    ],
    hint: "Integrate velocity, use s zero to express C in terms of B, then solve the endpoint equations.",
    explanation: "Integration gives s=Asin x-Bcos x+C. From s(0)=0, C=B. Then s(π)=2B=4 gives B=2, and s(π/2)=A+B=3 gives A=1.",
    difficulty: 5,
    diagnosticIntent: "Synthesises a velocity model, integration constant, and two displacement constraints.",
    taskType: "synthesis",
  }),
];

// ─── L4: Integrating Trig Functions with the Reverse Chain Rule ───────────────

const icWorked: WorkedExample[] = [
  {
    title: "Find ∫sin(3x) dx",
    questionLatex: "\\int \\sin(3x)\\,dx",
    steps: [
      { explanation: "The antiderivative of sin(ax) is −(1/a)cos(ax). Here a = 3.", latex: "" },
      { explanation: "Divide by the inner coefficient 3.", latex: "\\int \\sin(3x)\\,dx=-\\frac{1}{3}\\cos(3x)+C" },
      { explanation: "Check: d/dx(−(1/3)cos(3x)) = −(1/3)·(−3)sin(3x) = sin(3x) ✓.", latex: "" },
    ],
    finalAnswerLatex: "-\\frac{1}{3}\\cos(3x)+C",
  },
  {
    title: "Evaluate ∫₀^(π/4) cos(2x) dx",
    questionLatex: "\\int_0^{\\pi/4} \\cos(2x)\\,dx",
    steps: [
      { explanation: "Antiderivative of cos(2x) is (1/2)sin(2x).", latex: "" },
      { explanation: "Evaluate.", latex: "\\left[\\frac{1}{2}\\sin(2x)\\right]_0^{\\pi/4}=\\frac{1}{2}\\sin\\frac{\\pi}{2}-\\frac{1}{2}\\sin 0=\\frac{1}{2}(1)-0=\\frac{1}{2}" },
    ],
    finalAnswerLatex: "\\frac{1}{2}",
  },
];

const icGuided: PracticeQuestion[] = [
  fa("y11adv-tc-ic-g1", "Find the integral.", "\\int \\cos(2x)\\,dx", "sin(2x)/2+C", ["\\frac{1}{2}\\sin(2x)+C"]),
  mc("y11adv-tc-ic-g2", "Which expression equals the general antiderivative ∫sin(4x) dx?", "C",
    [{ label: "A", text: "$4\\cos(4x)+C$" }, { label: "B", text: "$\\cos(4x)+C$" }, { label: "C", text: "$-\\cos(4x)/4+C$" }, { label: "D", text: "$-\\cos(4x)+C$" }],
    "∫sin(ax) dx = −(1/a)cos(ax) + C. Here a = 4: −(1/4)cos(4x) + C.", ""),
  fa("y11adv-tc-ic-g3", "Evaluate.", "\\int_0^{\\pi/6} \\sin(3x)\\,dx", "1/3", ["\\frac13", "(1-cos(π/2))/3"]),
  mc("y11adv-tc-ic-g4", "The antiderivative of cos(ax+b) is:", "B",
    [{ label: "A", text: "$-\\sin(ax+b)/a+C$" }, { label: "B", text: "$\\sin(ax+b)/a+C$" }, { label: "C", text: "$a\\sin(ax+b)+C$" }, { label: "D", text: "$\\sin(ax+b)+C$" }],
    "∫cos(ax+b) dx = (1/a)sin(ax+b) + C. Dividing by a undoes the chain rule factor of a that appears when differentiating.", ""),
];

const icIndep: PracticeQuestion[] = [
  fa("y11adv-tc-ic-i1", "Find the integral.", "\\int \\sin(5x)\\,dx", "-cos(5x)/5+C", ["-\\frac{1}{5}\\cos(5x)+C"]),
  fa("y11adv-tc-ic-i2", "Find the integral.", "\\int 2\\cos(3x)\\,dx", "2sin(3x)/3+C", ["\\frac{2}{3}\\sin(3x)+C"]),
  mc("y11adv-tc-ic-i3", "Evaluate ∫₀^(π/2) sin(2x) dx.", "A",
    [{ label: "A", text: "$1$" }, { label: "B", text: "$0$" }, { label: "C", text: "$2$" }, { label: "D", text: "$1/2$" }],
    "[−(1/2)cos(2x)]₀^(π/2) = −(1/2)cos(π) − (−(1/2)cos(0)) = (1/2) + (1/2) = 1.", ""),
  fa("y11adv-tc-ic-i4", "Find the integral.", "\\int (\\sin(2x)+\\cos(3x))\\,dx", "-cos(2x)/2 + sin(3x)/3+C", ["-\\frac{1}{2}\\cos(2x)+\\frac{1}{3}\\sin(3x)+C"]),
  mc("y11adv-tc-ic-i5", "Which expression equals the general antiderivative ∫cos(x/2) dx?", "D",
    [{ label: "A", text: "$\\sin(x/2)+C$" }, { label: "B", text: "$-2\\sin(x/2)+C$" }, { label: "C", text: "$(1/2)\\sin(x/2)+C$" }, { label: "D", text: "$2\\sin(x/2)+C$" }],
    "Inner coefficient a = 1/2. ∫cos(ax) dx = (1/a)sin(ax) + C. Here 1/a = 1/(1/2) = 2. Result: 2sin(x/2) + C.", ""),
];

const icMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-tc-ic-qm1",
    prompt: "Find the general antiderivative.",
    latex: "\\int\\sin(3x)\\,dx",
    answer: "-(1/3)cos(3x)+C",
    acceptedAnswers: ["-\\frac13\\cos(3x)+C", "-cos(3x)/3+C"],
    hint: "Reverse the sine derivative and divide by the inner coefficient three.",
    explanation: "A cosine primitive needs a negative sign because d/dx[cos(3x)]=-3sin(3x). Dividing by 3 compensates for the chain factor, giving -(1/3)cos(3x)+C.",
    difficulty: 3,
    diagnosticIntent: "Checks direct reverse-chain integration of sine with a linear inner function.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-tc-ic-qm2",
    prompt: "Which antiderivative has the correct scale?",
    latex: "\\int\\cos(4x)\\,dx",
    answer: "B",
    choices: ["4sin(4x)+C", "(1/4)sin(4x)+C", "-(1/4)sin(4x)+C", "sin(4x)+C"],
    hint: "Differentiate each sine candidate and look for exactly cosine of 4x.",
    explanation: "Differentiating sin(4x) produces 4cos(4x), so integration must divide by 4. There is no negative sign for a cosine integrand. Thus option B is correct.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses multiplication, division, and sign errors in reverse-chain trig integration.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Multiplies by the inner derivative instead of dividing.",
      C: "Adds the negative sign associated with integrating sine.",
      D: "Omits the reverse-chain factor entirely.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ic-qm3",
    prompt: "Evaluate the definite integral exactly.",
    latex: "\\int_0^{\\pi/4}\\cos(2x)\\,dx",
    answer: "1/2",
    acceptedAnswers: ["0.5", "\\frac12", "(sin(π/2)-sin0)/2"],
    hint: "Use one half sine of 2x and evaluate at both endpoints.",
    explanation: "An antiderivative is (1/2)sin(2x). At π/4 this is (1/2)sin(π/2)=1/2, and at zero it is zero. The definite integral is therefore 1/2.",
    difficulty: 3,
    diagnosticIntent: "Checks exact definite integration with a constant reverse-chain factor.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-ic-qm4",
    prompt: "A student writes the displayed antiderivative. Which diagnosis is correct?",
    latex: "\\int\\sin(5x)\\,dx=-5\\cos(5x)+C",
    answer: "C",
    choices: [
      "The negative sign should be removed.",
      "The exponent of cosine should increase.",
      "The coefficient should be -1/5, not -5.",
      "The result is correct because differentiation reverses integration.",
    ],
    hint: "Differentiate the proposed answer and compare its coefficient with the integrand.",
    explanation: "Differentiating -5cos(5x) gives 25sin(5x), not sin(5x). The chain rule multiplies by 5, so the antiderivative must divide by 5: -(1/5)cos(5x)+C.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses multiplication instead of division by the constant inner derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Removes the sign needed to turn the cosine derivative into positive sine.",
      B: "Applies a polynomial-style exponent rule to a trig argument.",
      D: "Assumes inverse operations guarantee correctness without differentiation.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ic-qm5",
    prompt: "Determine the coefficient A from the antiderivative identity.",
    latex: "\\int A\\sin(2x)\\,dx=3\\cos(2x)+C",
    answer: "A=-6",
    acceptedAnswers: ["-6", "A = -6", "A=-6 because d/dx[3cos2x]=-6sin2x"],
    hint: "Differentiate the right-hand side and match its sine coefficient.",
    explanation: "Differentiating 3cos(2x) gives 3·[-2sin(2x)]=-6sin(2x). Therefore the integrand coefficient must be A=-6.",
    difficulty: 4,
    diagnosticIntent: "Assesses reverse coefficient inference from a scaled trig antiderivative.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-tc-ic-qm6",
    prompt: "For a>0, evaluate the family and state a scale-invariant relationship.",
    latex: "I(a)=\\int_0^{\\pi/a}\\sin(ax)\\,dx",
    answer: "I(a)=2/a, so aI(a)=2",
    acceptedAnswers: [
      "I(a)=\\frac2a and aI(a)=2",
      "2/a; the product with a is always 2",
      "a∫_0^(π/a) sin(ax)dx=2",
    ],
    hint: "Use negative cosine of ax over a and evaluate the scaled endpoint.",
    explanation: "An antiderivative is -(1/a)cos(ax). The limits give [-(1/a)cos(ax)]₀^(π/a)=1/a+1/a=2/a. Hence multiplying by a always gives aI(a)=2.",
    difficulty: 4,
    diagnosticIntent: "Investigates the inverse relationship between frequency and accumulated half-wave area.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-tc-ic-qm7",
    prompt: "Solve the initial-value problem.",
    latex: "F'(x)=4\\cos(2x)-3\\sin(3x),\\qquad F(0)=1",
    answer: "F(x)=2sin(2x)+cos(3x)",
    acceptedAnswers: [
      "F(x)=2\\sin(2x)+\\cos(3x)",
      "cos3x+2sin2x",
      "F=2sin(2x)+cos(3x)+0",
    ],
    hint: "Integrate each term with its own inner coefficient, then apply F zero.",
    explanation: "Integration gives F=2sin(2x)+cos(3x)+C. At x=0 this becomes 0+1+C=1, so C=0. Therefore F(x)=2sin(2x)+cos(3x).",
    difficulty: 4,
    diagnosticIntent: "Combines two reverse-chain trig integrals with an initial condition.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-ic-qm8",
    prompt: "Which evaluation of the proposed antiderivative is correct?",
    latex: "\\int\\sin(x^2)\\,dx\\stackrel?= -\\frac{\\cos(x^2)}{2x}+C",
    answer: "D",
    choices: [
      "It is correct for x>0.",
      "It becomes correct after removing C.",
      "It fails only at x=0.",
      "It is invalid because 2x is variable and quotient differentiation creates extra terms.",
    ],
    hint: "Differentiate the quotient; dividing by a variable is not constant reverse-chain scaling.",
    explanation: "The shortcut works for sin(ax+b) because the inner derivative is constant. Here 2x varies, and differentiating -cos(x²)/(2x) creates an additional quotient term. Option D identifies the structural failure.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses an invalid extension of reverse-chain scaling to a variable inner derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Assumes a domain restriction repairs the derivative mismatch.",
      B: "Treats the family constant as the source of the error.",
      C: "Notices a singularity but misses the mismatch for every nonzero x.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ic-qm9",
    prompt: "Reconstruct F from the initial gradient, first positive gradient zero, and initial value.",
    latex: "F'(x)=A\\cos(kx),\\quad A,k>0,\\quad F'(0)=4,\\quad\\text{first }F'(x)=0\\text{ at }x=\\pi/4,\\quad F(0)=1",
    answer: "A=4, k=2; F(x)=2sin(2x)+1",
    acceptedAnswers: [
      "A=4,k=2,F(x)=2\\sin(2x)+1",
      "F=1+2sin2x",
      "A = 4 and k = 2, so F=2sin(2x)+1",
    ],
    hint: "The first cosine zero fixes k; then F prime at zero fixes A before integration.",
    explanation: "The first positive zero of cos(kx) occurs when kx=π/2. At x=π/4 this gives k=2. Then F′(0)=A=4. Integration gives F=2sin(2x)+C, and F(0)=1 gives C=1.",
    difficulty: 5,
    diagnosticIntent: "Synthesises frequency from zero ordering, amplitude from gradient, and integration from an initial value.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-tc-ic-qm10",
    prompt: "Reconstruct the nonnegative accumulation model over its first pulse.",
    latex: "Q(t)=\\int_0^t A\\sin(ks)\\,ds,\\quad A,k>0,\\quad\\text{first positive zero of the rate at }t=\\pi,\\quad Q(\\pi)=6",
    answer: "A=3, k=1; Q(t)=3(1-cos t)",
    acceptedAnswers: [
      "A=3,k=1,Q(t)=3(1-\\cos t)",
      "Q(t)=3-3cos t",
      "k=1 and A=3; Q=3(1-cos t)",
    ],
    hint: "The first rate zero determines k; integrate the rate and use the total at pi.",
    explanation: "The first positive zero of sin(kt) is at t=π/k, so k=1. Then Q(π)=A∫₀^πsin s ds=2A=6, giving A=3 and Q(t)=3(1-cos t).",
    difficulty: 5,
    diagnosticIntent: "Synthesises a periodic rate, zero timing, total accumulation, and parameter reconstruction.",
    taskType: "synthesis",
  }),
];

// ─── L5: Applications of Trigonometric Calculus ───────────────────────────────

const atWorked: WorkedExample[] = [
  {
    title: "Find the stationary points of y = sin x + cos x on [0, 2π]",
    questionLatex: "y = \\sin x + \\cos x,\\quad 0\\leq x\\leq 2\\pi",
    steps: [
      { explanation: "Differentiate.", latex: "\\frac{dy}{dx}=\\cos x-\\sin x" },
      { explanation: "Set equal to zero: cos x = sin x → tan x = 1.", latex: "x=\\frac{\\pi}{4},\\;\\frac{5\\pi}{4}" },
      { explanation: "Evaluate y at each.", latex: "y(\\pi/4)=\\frac{1}{\\sqrt{2}}+\\frac{1}{\\sqrt{2}}=\\sqrt{2};\\quad y(5\\pi/4)=-\\sqrt{2}" },
      { explanation: "Use the second derivative y″ = −sin x − cos x to classify.", latex: "y''(\\pi/4)=-\\sqrt{2}<0\\implies\\text{max};\\quad y''(5\\pi/4)=\\sqrt{2}>0\\implies\\text{min}" },
    ],
    finalAnswerLatex: "\\text{Max }(\\pi/4,\\sqrt{2}),\\;\\text{min }(5\\pi/4,-\\sqrt{2})",
  },
  {
    title: "Find the area enclosed between y = sin x and the x-axis on [0, π]",
    questionLatex: "\\text{Area under }y=\\sin x,\\quad 0\\leq x\\leq\\pi",
    steps: [
      { explanation: "sin x ≥ 0 on [0, π], so Area = ∫₀^π sin x dx.", latex: "" },
      { explanation: "Integrate.", latex: "\\left[-\\cos x\\right]_0^\\pi=-\\cos\\pi-(-\\cos 0)=1+1=2" },
    ],
    finalAnswerLatex: "\\text{Area}=2",
  },
];

const atGuided: PracticeQuestion[] = [
  mc("y11adv-tc-at-g1", "Find the x-values in [0, 2π] where dy/dx = 0 for y = cos x.", "B",
    [{ label: "A", text: "$x=\\pi/2,\\;3\\pi/2$" }, { label: "B", text: "$x=0,\\;\\pi,\\;2\\pi$" }, { label: "C", text: "$x=\\pi/4,\\;3\\pi/4$" }, { label: "D", text: "$x=\\pi$" }],
    "dy/dx = −sin x = 0 in [0, 2π] at x = 0, π, 2π.", "y=\\cos x"),
  fa("y11adv-tc-at-g2", "Find the area under y = cos x between x = 0 and x = π/2.", "", "1", ["1 square unit", "sin(π/2)-sin0"]),
  mc("y11adv-tc-at-g3", "Why must you split ∫₀^(2π) |sin x| dx at x = π to find total area?", "A",
    [{ label: "A", text: "sin x is negative on (π, 2π), so the definite integral there is negative — you subtract to get area" }, { label: "B", text: "The function is undefined at x = π" }, { label: "C", text: "The antiderivative changes form at x = π" }, { label: "D", text: "The area formula requires splitting at every multiple of π/2" }],
    "For area (not signed area), you need ∫|f(x)| dx. When f changes sign, split and take absolute values of each portion.", ""),
  fa("y11adv-tc-at-g4", "Find the equation of the tangent to y = sin x at x = π/6.", "", "y = (√3/2)(x − π/6) + 1/2", ["y = (x-π/6)(√3/2)+1/2"]),
];

const atIndep: PracticeQuestion[] = [
  fa("y11adv-tc-at-i1", "Find the total area enclosed between y = sin x and the x-axis on [0, 2π].", "", "4", ["4 square units", "2+2"]),
  mc("y11adv-tc-at-i2", "y = sin x + cos x is concave down at x = π/4 because:", "A",
    [{ label: "A", text: "y″ = −sin x − cos x < 0 at x = π/4" }, { label: "B", text: "y′ = 0 at x = π/4" }, { label: "C", text: "y > 0 at x = π/4" }, { label: "D", text: "sin(π/4) > cos(π/4)" }],
    "y″(π/4) = −sin(π/4) − cos(π/4) = −1/√2 − 1/√2 = −√2 < 0 → concave down → local maximum.", ""),
  fa("y11adv-tc-at-i3", "Find the area bounded by y = cos(2x), the x-axis, x = 0 and x = π/4.", "", "1/2", ["\\frac12", "0.5"]),
  mc("y11adv-tc-at-i4", "The gradient of y = sin(2x) is zero at x = π/4 in (0, π/2). Is this a max or min?", "A",
    [{ label: "A", text: "Maximum: y″ = −4sin(2x) < 0 at x = π/4" }, { label: "B", text: "Minimum: y″ = 4sin(2x) > 0 at x = π/4" }, { label: "C", text: "Horizontal inflection" }, { label: "D", text: "Cannot be determined from the second derivative" }],
    "y = sin(2x), y′ = 2cos(2x), y″ = −4sin(2x). At x = π/4: y″ = −4 sin(π/2) = −4 < 0 → local maximum.", ""),
  fa("y11adv-tc-at-i5", "Find the area enclosed between y = sin x, y = 0, x = 0 and x = π.", "", "2", ["2 square units", "1-(-1)"]),
];

const atMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-tc-at-qm1",
    prompt: "Find the equation of the tangent at the stated input.",
    latex: "y=\\sin x,\\qquad x=\\frac\\pi6",
    answer: "y-1/2=(√3/2)(x-π/6)",
    acceptedAnswers: [
      "y=\\frac{\\sqrt3}{2}(x-\\frac\\pi6)+\\frac12",
      "y-0.5=(sqrt(3)/2)(x-pi/6)",
      "y=(√3/2)(x-π/6)+1/2",
    ],
    hint: "Use the exact point value sine pi over six and gradient cosine pi over six.",
    explanation: "At x=π/6, the point is (π/6,1/2) and the derivative cos x gives gradient √3/2. Point-gradient form is y-1/2=(√3/2)(x-π/6).",
    difficulty: 3,
    diagnosticIntent: "Checks exact tangent construction for a trigonometric curve at a standard angle.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-tc-at-qm2",
    prompt: "Which statement correctly classifies the stationary point?",
    latex: "f(x)=\\sin x+\\cos x\\quad\\text{at}\\quad x=\\pi/4",
    answer: "A",
    choices: [
      "It is a maximum because f′=0 and f′′=-√2<0.",
      "It is a minimum because f(π/4)=√2>0.",
      "It is a horizontal inflection because f′=0.",
      "It cannot be classified without graphing.",
    ],
    hint: "Differentiate twice and evaluate both the stationary and concavity conditions.",
    explanation: "Here f′=cos x-sin x, so f′(π/4)=0. Also f′′=-sin x-cos x gives f′′(π/4)=-√2<0. Therefore the point is a local maximum.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses classification based on function height or zero gradient without second-derivative evidence.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Uses a positive function value to infer a minimum.",
      C: "Assumes every stationary point is an inflection point.",
      D: "Ignores sufficient algebraic second-derivative evidence.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-at-qm3",
    prompt: "Find the exact bounded accumulation over the positive half-wave.",
    latex: "\\int_0^{\\pi/2}\\sin(2x)\\,dx",
    answer: "1",
    acceptedAnswers: ["1 square unit", "[-cos(2x)/2]_0^(π/2)=1", "1.0"],
    hint: "Use negative one half cosine of 2x and evaluate both endpoints.",
    explanation: "Sine of 2x is nonnegative on [0,π/2]. Its antiderivative is -(1/2)cos(2x), so the value is -(1/2)cosπ+(1/2)cos0=1.",
    difficulty: 3,
    diagnosticIntent: "Checks exact reverse-chain integration in a simple positive-area application.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-at-qm4",
    prompt: "Which value is the total area between the curve and the x-axis?",
    latex: "y=\\cos x,\\qquad0\\le x\\le\\pi",
    answer: "D",
    choices: ["0", "1", "π", "2"],
    hint: "Split at the zero x equals pi over two and add the magnitudes.",
    explanation: "Cosine contributes area 1 above the axis on [0,π/2] and area 1 below it on [π/2,π]. The signed integral is zero, but total area is 1+1=2.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses the difference between signed integral and total geometric area.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Reports the signed integral after cancellation.",
      B: "Counts only one side of the sign change.",
      C: "Uses the interval width as if the height were one throughout.",
    },
    cartesianGraph: {
      description: "Cosine curve from zero to pi, above the x-axis until pi over two and below it afterwards, showing the two equal area regions.",
      xMin: -0.3,
      xMax: Math.PI + 0.3,
      yMin: -1.3,
      yMax: 1.3,
      sinusoidals: [
        {
          kind: "cos",
          a: 1,
          b: 1,
          c: 0,
          d: 0,
          xMin: 0,
          xMax: Math.PI,
          label: "y=cos x",
        },
      ],
      points: [
        { x: 0, y: 1 },
        { x: Math.PI / 2, y: 0, label: "π/2" },
        { x: Math.PI, y: -1, label: "π" },
      ],
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-at-qm5",
    prompt: "The curve is stationary at x=π/4. Determine a and classify the point.",
    latex: "f(x)=\\sin x+a\\cos x",
    answer: "a=1 and the point is a maximum",
    acceptedAnswers: [
      "a=1; local maximum",
      "a = 1 and f''(π/4)=-√2<0",
      "a=1, maximum at x=π/4",
    ],
    hint: "Set cos x minus a sin x to zero, then evaluate the second derivative.",
    explanation: "The derivative is f′=cos x-a sin x. At π/4, f′=0 gives a=1. Then f′′=-sin x-a cos x=-√2 at π/4, so the point is a maximum.",
    difficulty: 4,
    diagnosticIntent: "Assesses parameter recovery and classification from a trigonometric stationary condition.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-tc-at-qm6",
    prompt: "Investigate the x-intercept of the tangent at a general point where cos(a)≠0.",
    latex: "y=\\sin x\\quad\\text{at}\\quad(a,\\sin a)",
    answer: "The tangent crosses at x=a-tan(a)",
    acceptedAnswers: [
      "x-intercept=(a-\\tan a,0)",
      "x=a-tan a",
      "the tangent equation gives a minus tangent a",
    ],
    hint: "Write the tangent with gradient cos a, set y equal to zero, and solve for x.",
    explanation: "The tangent is y-sin a=cos a(x-a). Setting y=0 gives x-a=-sin a/cos a=-tan a. Hence its x-intercept is x=a-tan a.",
    difficulty: 4,
    diagnosticIntent: "Investigates a general tangent-intercept relationship rather than a single numerical case.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-tc-at-qm7",
    prompt: "Find every increasing interval and the maximum and minimum values.",
    latex: "h(x)=3+2\\sin x,\\qquad0\\le x\\le2\\pi",
    answer: "Increasing on (0,π/2) and (3π/2,2π); max 5, min 1",
    acceptedAnswers: [
      "h increases where cos x>0: (0,π/2)∪(3π/2,2π), maximum=5, minimum=1",
      "increasing intervals (0,π/2),(3π/2,2π); range [1,5]",
      "max h=5 at π/2; min h=1 at 3π/2, with the stated increasing intervals",
    ],
    hint: "Use h prime equals 2 cosine x for monotonicity, then evaluate the extrema.",
    explanation: "Since h′=2cos x, h increases where cosine is positive: (0,π/2) and (3π/2,2π). At π/2 the value is 5, while at 3π/2 it is 1.",
    difficulty: 4,
    diagnosticIntent: "Combines derivative sign intervals with exact extrema in a shifted periodic model.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-at-qm8",
    prompt: "Which conclusion gives the global maximum on the closed interval?",
    latex: "f(x)=\\sin x-\\frac x2,\\qquad0\\le x\\le\\pi",
    answer: "C",
    choices: [
      "The maximum is f(0)=0 because zero is an endpoint.",
      "The maximum is f(π)=-π/2 because π is the other endpoint.",
      "The maximum is f(π/3)=√3/2-π/6 after comparing the stationary point and endpoints.",
      "No maximum exists because the function is not periodic on the interval.",
    ],
    hint: "Solve cosine x equals one half, then compare that candidate with both endpoints.",
    explanation: "The derivative is cos x-1/2, so the interior candidate is x=π/3. Its value √3/2-π/6 is positive, while endpoint values are 0 and -π/2. Thus option C is the global maximum.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses failure to compare stationary values with endpoints in closed-interval optimisation.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Assumes an endpoint is maximal without comparing the interior candidate.",
      B: "Chooses the other endpoint despite its lower value.",
      D: "Confuses lack of periodicity with lack of a closed-interval maximum.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-at-qm9",
    prompt: "Reconstruct f from the location and value of its maximum.",
    latex: "f(x)=A\\sin x+B\\cos x,\\quad A,B>0,\\quad\\max f=5\\text{ at }x=\\alpha,\\quad\\sin\\alpha=3/5,\\quad\\cos\\alpha=4/5",
    answer: "A=3, B=4; f(x)=3sin(x)+4cos(x)",
    acceptedAnswers: [
      "A=3,B=4,f=3\\sin x+4\\cos x",
      "f(x)=4cos x+3sin x",
      "A = 3 and B = 4",
    ],
    hint: "Use f prime at alpha equals zero together with f of alpha equals five.",
    explanation: "Stationarity gives A(4/5)-B(3/5)=0, so 4A=3B. The maximum value gives (3A+4B)/5=5. Solving yields A=3 and B=4.",
    difficulty: 5,
    diagnosticIntent: "Synthesises stationary and value constraints to reconstruct a two-parameter trig model.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-tc-at-qm10",
    prompt: "Reconstruct the displacement model and classify the first stopping point.",
    latex: "s(t)=A\\sin t+B\\cos t-B,\\quad A,B>0,\\quad\\text{first }s'(t)=0\\text{ at }t=\\pi/4,\\quad s(\\pi/4)=2(\\sqrt2-1)",
    answer: "A=B=2; s(t)=2sin(t)+2cos(t)-2, with a maximum at π/4",
    acceptedAnswers: [
      "A=2,B=2,s=2\\sin t+2\\cos t-2; maximum",
      "s(t)=2(sin t+cos t-1), max at π/4",
      "A=B=2 and the first stop is a maximum",
    ],
    hint: "The stopping condition makes A and B equal; then use the displacement value and a sign change.",
    explanation: "Velocity is s′=Acos t-Bsin t. At π/4, stopping gives A=B. Then s(π/4)=A(√2-1)=2(√2-1), so A=B=2. Velocity changes positive-to-negative, making a maximum.",
    difficulty: 5,
    diagnosticIntent: "Synthesises motion, stationary timing, exact displacement, parameter recovery, and classification.",
    taskType: "synthesis",
  }),
];

// ─── L6: Exam Practice ────────────────────────────────────────────────────────

const tcExGuided: PracticeQuestion[] = [
  fa("y11adv-tc-ex-g1", "Find dy/dx.", "y = 2\\sin(3x) - \\cos(x/2)", "6cos(3x)+sin(x/2)/2", ["6\\cos(3x)+\\frac{1}{2}\\sin(x/2)"]),
  mc("y11adv-tc-ex-g2", "Evaluate ∫₀^(π/2) (sin x + cos x) dx.", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "$2$" }, { label: "D", text: "$\\pi$" }],
    "[−cos x + sin x]₀^(π/2) = (0 + 1) − (−1 + 0) = 1 + 1 = 2.", ""),
  fa("y11adv-tc-ex-g3", "A curve has dy/dx = cos(2x) and y = 1 when x = 0. Find y.", "\\frac{dy}{dx}=\\cos(2x)", "y = sin(2x)/2 + 1", ["y=\\frac{1}{2}\\sin(2x)+1"]),
  mc("y11adv-tc-ex-g4", "Find all x in [0, π] where d/dx(sin(2x)) = 0.", "B",
    [{ label: "A", text: "$x = \\pi/2$" }, { label: "B", text: "$x = \\pi/4,\\;3\\pi/4$" }, { label: "C", text: "$x = 0,\\;\\pi$" }, { label: "D", text: "$x = \\pi/6,\\;5\\pi/6$" }],
    "d/dx(sin(2x)) = 2cos(2x) = 0 → cos(2x) = 0 → 2x = π/2, 3π/2 → x = π/4, 3π/4.", ""),
];

const tcExIndep: PracticeQuestion[] = [
  fa("y11adv-tc-ex-i1", "Find the exact area bounded by y = sin(2x), the x-axis, x = 0 and x = π.", "", "2", ["2 square units", "1+1"]),
  mc("y11adv-tc-ex-i2", "Which correctly pairs the function with its derivative?", "D",
    [{ label: "A", text: "$\\sin(2x)$ and $2\\sin(2x)$" }, { label: "B", text: "$\\cos(3x)$ and $\\sin(3x)$" }, { label: "C", text: "$\\tan x$ and $\\sin^2 x$" }, { label: "D", text: "$\\sin(2x)$ and $2\\cos(2x)$" }],
    "d/dx(sin(2x)) = 2cos(2x). All other options have errors: A has wrong function; B is missing the negative sign; C: d/dx(tan x) = sec²x, not sin²x.", ""),
  fa("y11adv-tc-ex-i3", "Differentiate y = x·sin x using the product rule.", "", "sin x + x cos x", ["\\sin x+x\\cos x"]),
  mc("y11adv-tc-ex-i4", "The function y = sin x + cos x on [0, 2π] has a minimum value of:", "B",
    [{ label: "A", text: "$-1$" }, { label: "B", text: "$-\\sqrt{2}$" }, { label: "C", text: "$0$" }, { label: "D", text: "$-2$" }],
    "The minimum occurs at the stationary point x = 5π/4. y(5π/4) = sin(5π/4) + cos(5π/4) = −1/√2 − 1/√2 = −√2.", ""),
  fa("y11adv-tc-ex-i5", "Find ∫(sin(3x) + cos(2x)) dx.", "", "-cos(3x)/3 + sin(2x)/2+C", ["-\\frac{1}{3}\\cos(3x)+\\frac{1}{2}\\sin(2x)+C"]),
];

const tcExMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-tc-ex-qm1",
    prompt: "Differentiate and simplify with a double-angle identity.",
    latex: "y=\\sin^2x",
    answer: "y'=sin(2x)",
    acceptedAnswers: ["dy/dx=2\\sin x\\cos x", "\\sin(2x)", "2sin x cos x"],
    hint: "Apply the chain rule to the square, then recognise two sine x cosine x.",
    explanation: "Treat y as [sin x]². The chain rule gives y′=2sin x cos x. Using the identity sin(2x)=2sin x cos x, the simplified derivative is y′=sin(2x).",
    difficulty: 3,
    diagnosticIntent: "Checks a nested trig derivative and equivalent double-angle simplification.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-tc-ex-qm2",
    prompt: "Which expression is the complete general antiderivative?",
    latex: "\\int(2\\sin(3x)+4\\cos(2x))\\,dx",
    answer: "B",
    choices: [
      "-6cos(3x)+8sin(2x)+C",
      "-(2/3)cos(3x)+2sin(2x)+C",
      "(2/3)cos(3x)+2sin(2x)+C",
      "-(2/3)cos(3x)+4sin(2x)+C",
    ],
    hint: "Integrate each term separately, dividing by its own inner coefficient.",
    explanation: "The sine term integrates to -(2/3)cos(3x), while the cosine term integrates to 2sin(2x). Combining them with one constant gives option B.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses signs and separate reverse-chain factors in a mixed trig integral.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Multiplies by both inner derivatives rather than dividing.",
      C: "Loses the negative sign when integrating sine.",
      D: "Fails to divide the cosine term by its inner coefficient two.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ex-qm3",
    prompt: "Solve the initial-value problem.",
    latex: "y'=3\\cos(3x)-2\\sin x,\\qquad y(0)=4",
    answer: "y=sin(3x)+2cos(x)+2",
    acceptedAnswers: [
      "y=\\sin(3x)+2\\cos x+2",
      "2+2cos x+sin3x",
      "f(x)=sin(3x)+2cos x+2",
    ],
    hint: "Integrate both terms, then use sine zero and cosine zero values.",
    explanation: "Integration gives y=sin(3x)+2cos x+C. At x=0, this is 0+2+C=4, so C=2. Therefore y=sin(3x)+2cos x+2.",
    difficulty: 3,
    diagnosticIntent: "Checks mixed reverse-chain integration followed by an initial condition.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-tc-ex-qm4",
    prompt: "Which list contains every stationary input in the interval?",
    latex: "f(x)=\\sin(2x),\\qquad0\\le x\\le\\pi",
    answer: "C",
    choices: ["0, π/2, π", "π/2", "π/4, 3π/4", "π/6, 5π/6"],
    hint: "Set 2 cosine of 2x equal to zero and solve over the doubled interval.",
    explanation: "The derivative is f′=2cos(2x). Setting it to zero gives 2x=π/2 or 3π/2 in [0,2π], hence x=π/4 and 3π/4. Option C is complete.",
    difficulty: 3,
    diagnosticIntent: "Diagnoses confusion between zeros of a function and zeros of its derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses zeros of sine of 2x rather than its derivative.",
      B: "Finds only the midpoint and misses both derivative zeros.",
      D: "Uses standard sine values unrelated to cosine zeros.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ex-qm5",
    prompt: "Reconstruct f from its initial gradient and first maximum.",
    latex: "f(x)=A\\sin(kx),\\quad A,k>0,\\quad f'(0)=6,\\quad\\text{first maximum at }x=\\pi/6",
    answer: "A=2, k=3; f(x)=2sin(3x)",
    acceptedAnswers: [
      "A=2,k=3,f(x)=2\\sin(3x)",
      "f(x)=2sin3x",
      "k = 3 and A = 2",
    ],
    hint: "The first maximum fixes k through kx equals pi over two; then use Ak equals six.",
    explanation: "The first maximum of sin(kx) occurs when kx=π/2. At x=π/6 this gives k=3. Since f′(0)=Ak=6, A=2. Thus f(x)=2sin(3x).",
    difficulty: 4,
    diagnosticIntent: "Assesses reconstruction of amplitude and frequency from feature and gradient data.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-tc-ex-qm6",
    prompt: "Describe the nth derivative for every nonnegative integer n.",
    latex: "f(x)=\\sin x",
    answer: "f^(n)(x)=sin(x+nπ/2), determined by n mod 4",
    acceptedAnswers: [
      "the cycle is sin, cos, -sin, -cos according to n modulo 4",
      "f^{(n)}(x)=\\sin(x+n\\pi/2)",
      "n mod4: 0 sin, 1 cos, 2 -sin, 3 -cos",
    ],
    hint: "List four successive derivatives, then express the repeating pattern using n modulo four.",
    explanation: "Successive derivatives are sin x, cos x, -sin x, and -cos x before repeating. Equivalently f^(n)(x)=sin(x+nπ/2), with the form determined by n modulo 4.",
    difficulty: 4,
    diagnosticIntent: "Investigates and generalises the cyclic structure of repeated trig differentiation.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-tc-ex-qm7",
    prompt: "Find the total area between the curve and the x-axis.",
    latex: "y=\\sin(2x),\\qquad0\\le x\\le\\pi",
    answer: "2",
    acceptedAnswers: [
      "2 square units",
      "∫_0^(π/2)sin2x dx-∫_(π/2)^π sin2x dx=2",
      "1+1=2",
    ],
    hint: "Split at x equals pi over two, where sine of 2x changes sign.",
    explanation: "The first lobe on [0,π/2] has area 1. The second lobe on [π/2,π] has signed integral -1, so its geometric area is 1. The total is 2.",
    difficulty: 4,
    diagnosticIntent: "Combines reverse-chain integration, sign analysis, and total-area interpretation.",
    taskType: "problem-solving",
    cartesianGraph: {
      description: "Sine of two x from zero to pi, with one positive lobe followed by one equal negative lobe separated at pi over two.",
      xMin: -0.3,
      xMax: Math.PI + 0.3,
      yMin: -1.3,
      yMax: 1.3,
      sinusoidals: [
        {
          kind: "sin",
          a: 1,
          b: 2,
          c: 0,
          d: 0,
          xMin: 0,
          xMax: Math.PI,
          label: "y=sin(2x)",
        },
      ],
      points: [
        { x: 0, y: 0 },
        { x: Math.PI / 2, y: 0, label: "π/2" },
        { x: Math.PI, y: 0, label: "π" },
      ],
    },
  }),
  qualityChoice({
    id: "y11adv-tc-ex-qm8",
    prompt: "Which method and exact value are both correct?",
    latex: "\\int_0^{\\pi/2}\\sin^2x\\,dx",
    answer: "A",
    choices: [
      "Use sin²x=(1-cos2x)/2; the value is π/4.",
      "Use sin²x=1-cos²x; the value is zero.",
      "Treat sin²x as sin(2x); the value is one.",
      "Use the power rule; the value is π³/24.",
    ],
    hint: "Use the half-angle identity that converts the square into a constant and cosine term.",
    explanation: "The identity sin²x=(1-cos2x)/2 makes the integral [x/2-sin(2x)/4]₀^(π/2)=π/4. Option A gives both a valid method and exact value.",
    difficulty: 5,
    diagnosticIntent: "Diagnoses method selection for a squared trig integrand beyond direct standard primitives.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Uses a true identity without completing a valid or correct integral.",
      C: "Confuses the square of sine with sine of the double angle.",
      D: "Applies a polynomial power rule to a trigonometric function.",
    },
  }),
  qualityAnswer({
    id: "y11adv-tc-ex-qm9",
    prompt: "Reconstruct the complete trigonometric model from its extrema and maximum location.",
    latex: "f(x)=A\\sin x+B\\cos x+C,\\quad\\max f=9,\\quad\\min f=-1,\\quad\\max\\text{ at }x=\\alpha,\\quad\\sin\\alpha=3/5,\\quad\\cos\\alpha=4/5",
    answer: "A=3, B=4, C=4; f(x)=3sin(x)+4cos(x)+4",
    acceptedAnswers: [
      "A=3,B=4,C=4,f=3\\sin x+4\\cos x+4",
      "f(x)=4+3sin x+4cos x",
      "A = 3, B = 4 and C = 4",
    ],
    hint: "Use the midpoint and half-range for C and amplitude, then use the stationary direction.",
    explanation: "The midline is C=(9-1)/2=4 and amplitude is 5. At the maximum, the unit direction (sinα,cosα)=(3/5,4/5) aligns with (A,B), so A=3 and B=4.",
    difficulty: 5,
    diagnosticIntent: "Synthesises extrema, phase information, amplitude geometry, and parameter reconstruction.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-tc-ex-qm10",
    prompt: "Determine A and B, reconstruct y, and evaluate y at pi over two.",
    latex: "y'=A\\cos(2x)+B\\cos x,\\quad y'(0)=5,\\quad y'(\\pi/2)=-2,\\quad y(0)=1",
    answer: "A=2, B=3; y=sin(2x)+3sin(x)+1 and y(π/2)=4",
    acceptedAnswers: [
      "A=2,B=3,y=\\sin(2x)+3\\sin x+1,y(π/2)=4",
      "y(x)=1+sin2x+3sinx; y(pi/2)=4",
      "A = 2 and B = 3, so y=sin(2x)+3sin x+1 and the value is 4",
    ],
    hint: "Use the two gradient values as simultaneous equations, then integrate and apply y zero.",
    explanation: "At zero, A+B=5. At π/2, -A=-2, so A=2 and B=3. Integration gives y=sin(2x)+3sin x+C, and y(0)=1 gives C=1. Hence y(π/2)=4.",
    difficulty: 5,
    diagnosticIntent: "Synthesises derivative observations, simultaneous parameters, reverse-chain integration, and evaluation.",
    taskType: "synthesis",
  }),
];

// ─── Export ───────────────────────────────────────────────────────────────────

export function year11AdvancedTrigCalculusLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "trig-calculus") return null;

  const base = { moduleSlug: lesson.slug, syllabusRef: "MA-T4" };

  if (lesson.slug === "differentiating-sin-cos") {
    return {
      ...base,
      description: "Differentiate sin x and cos x and evaluate trigonometric derivatives at standard angles.",
      learningIntention: "Apply d/dx(sin x) = cos x and d/dx(cos x) = −sin x to differentiate trigonometric functions.",
      successCriteria: [
        "State d/dx(sin x) = cos x and d/dx(cos x) = −sin x.",
        "Explain why radian measure is required for these derivative rules.",
        "Differentiate linear combinations of sin x and cos x.",
        "Evaluate trig derivatives at standard angles (0, π/6, π/4, π/3, π/2, π).",
        "Find equations of tangents to y = sin x and y = cos x at given points.",
      ],
      teaching: {
        paragraphs: [
          "The derivative of sin x is cos x, and the derivative of cos x is −sin x. These results are only valid when angles are measured in radians. The radian requirement comes from the limit lim(h→0)(sin h)/h = 1, which equals 1 only in radians.",
          "The cyclic pattern of trig derivatives: d/dx(sin x) = cos x → d/dx(cos x) = −sin x → d/dx(−sin x) = −cos x → d/dx(−cos x) = sin x → and back to d/dx(sin x) = cos x. Differentiating four times returns you to the original function.",
          "Geometrically, this makes sense: the gradient of y = sin x at any x-value is exactly the height of y = cos x at that same x-value. At x = 0, sin x has its steepest positive gradient (= 1), matching cos 0 = 1. At x = π/2, sin x is at its peak so its gradient is 0, matching cos(π/2) = 0.",
          "Because the gradient of sin x is cos x, the stationary points of sin x occur where cos x = 0, i.e., x = π/2, 3π/2, etc. This connects the shapes of the two graphs directly.",
          "To find a tangent line at (x₀, f(x₀)): compute the gradient f′(x₀), then form y − f(x₀) = m(x − x₀). For y = sin x at x = π/6: gradient = cos(π/6) = √3/2, point = (π/6, 1/2).",
        ],
        latexBlocks: [
          "\\frac{d}{dx}(\\sin x)=\\cos x\\qquad\\frac{d}{dx}(\\cos x)=-\\sin x",
          "\\text{Cyclic pattern: }\\sin x\\to\\cos x\\to-\\sin x\\to-\\cos x\\to\\sin x",
        ],
      },
      workedExamples: dsWorked,
      guidedPractice: dsGuided,
      independentPractice: dsIndep,
      commonMistakes: [
        { mistake: "Writing d/dx(cos x) = sin x (missing the negative sign).", fix: "d/dx(cos x) = −sin x. The negative is essential. Remember: differentiation sends sin → cos → −sin → −cos → sin in a cycle." },
        { mistake: "Using angles in degrees rather than radians.", fix: "The formulas d/dx(sin x) = cos x only hold in radians. For degrees: d/dx(sin x°) = (π/180)cos x°." },
        { mistake: "Confusing the gradient of sin x with the value of sin x.", fix: "The gradient at x is cos x, not sin x. At x = π/2, sin(π/2) = 1 but the gradient cos(π/2) = 0 (the peak has zero slope)." },
      ],
      masteryQuiz: dsMastery,
    };
  }

  if (lesson.slug === "differentiating-trig-chain-rule") {
    return {
      ...base,
      description: "Differentiate sin(ax+b), cos(ax+b), and tan x using the chain rule.",
      learningIntention: "Apply the chain rule to differentiate composite trigonometric functions of the form sin(f(x)) and cos(f(x)).",
      successCriteria: [
        "Differentiate sin(ax+b) and cos(ax+b) using the chain rule.",
        "State and apply d/dx(tan x) = sec²x.",
        "Differentiate d/dx(tan(ax)) = a·sec²(ax).",
        "Find stationary points of functions involving sin(ax+b).",
        "Differentiate compositions like sin(x²) or cos(eˣ).",
      ],
      teaching: {
        paragraphs: [
          "The chain rule extends the basic trig derivatives. For sin(f(x)): d/dx(sin(f(x))) = f′(x)·cos(f(x)). For cos(f(x)): d/dx(cos(f(x))) = −f′(x)·sin(f(x)). The inner derivative f′(x) multiplies the outer derivative.",
          "For the common case sin(ax+b): inner function is ax+b with derivative a. So d/dx(sin(ax+b)) = a·cos(ax+b). Similarly, d/dx(cos(ax+b)) = −a·sin(ax+b). The amplitude of the derivative is a times the amplitude of the original.",
          "The derivative of tan x: using the quotient rule on sin x/cos x gives d/dx(tan x) = sec²x = 1/cos²x. For tan(ax): chain rule gives a·sec²(ax).",
          "Stationary points of y = sin(2x): dy/dx = 2cos(2x) = 0 → cos(2x) = 0 → 2x = π/2, 3π/2, 5π/2, 7π/2 → x = π/4, 3π/4, 5π/4, 7π/4 in [0, 2π]. The doubling of frequency halves the period of the stationary points.",
          "More complex chains: d/dx(sin(x²)) = 2x·cos(x²). The inner function x² has derivative 2x, and the outer derivative of sin is cos. Always identify inner and outer functions first.",
        ],
        latexBlocks: [
          "\\frac{d}{dx}(\\sin(ax+b))=a\\cos(ax+b)",
          "\\frac{d}{dx}(\\cos(ax+b))=-a\\sin(ax+b)",
          "\\frac{d}{dx}(\\tan x)=\\sec^2 x=\\frac{1}{\\cos^2 x}",
        ],
      },
      workedExamples: dcWorked,
      guidedPractice: dcGuided,
      independentPractice: dcIndep,
      commonMistakes: [
        { mistake: "Writing d/dx(sin(2x)) = cos(2x) without the factor of 2.", fix: "The chain rule requires multiplying by the inner derivative. d/dx(sin(2x)) = 2·cos(2x). The 2 in the exponent must appear in the derivative." },
        { mistake: "Writing d/dx(cos(3x)) = sin(3x)·3 without the negative sign.", fix: "d/dx(cos(3x)) = −3·sin(3x). The derivative of cos is MINUS sin, so the chain rule gives −3 sin(3x)." },
        { mistake: "Applying the quotient rule to tan x but writing d/dx(tan x) = sec x.", fix: "d/dx(tan x) = sec²x (secant squared). The quotient rule on sin/cos gives (cos²x + sin²x)/cos²x = 1/cos²x = sec²x." },
      ],
      masteryQuiz: dcMastery,
    };
  }

  if (lesson.slug === "integrating-sin-cos") {
    return {
      ...base,
      description: "Integrate sin x and cos x using antiderivative rules and evaluate definite integrals of basic trig functions.",
      learningIntention: "Apply ∫sin x dx = −cos x + C and ∫cos x dx = sin x + C to find integrals and compute exact areas.",
      successCriteria: [
        "State ∫cos x dx = sin x + C and ∫sin x dx = −cos x + C.",
        "Verify antiderivatives by differentiating the result.",
        "Evaluate definite integrals of sin x and cos x between standard limits.",
        "Find the exact area under one arch of y = sin x or y = cos x.",
        "Explain why ∫₀^(2π) sin x dx = 0 and how to find the total enclosed area.",
      ],
      teaching: {
        paragraphs: [
          "Since d/dx(sin x) = cos x, the antiderivative of cos x is sin x. Since d/dx(−cos x) = sin x, the antiderivative of sin x is −cos x. Note the asymmetry: integrating cos gives sin, but integrating sin gives MINUS cos.",
          "Always verify antiderivatives by differentiation. If you write ∫sin x dx = −cos x + C, check: d/dx(−cos x + C) = −(−sin x) = sin x ✓. If you accidentally write +cos x, differentiating gives −sin x, which does not match.",
          "Definite integrals: evaluate at each limit and subtract. Key values: sin 0 = 0, sin(π/2) = 1, sin π = 0, cos 0 = 1, cos(π/2) = 0, cos π = −1. These appear often in trig integration.",
          "Signed vs. total area: ∫₀^(2π) sin x dx = 0 because the positive area on [0, π] exactly cancels the negative area on [π, 2π] (each has area 2). For the total enclosed area, compute ∫₀^π sin x dx + |∫_π^(2π) sin x dx| = 2 + 2 = 4.",
          "The area under one arch of sin x on [0, π] equals 2 — this is one of the benchmark values to know, alongside ∫₀^(π/2) cos x dx = 1.",
        ],
        latexBlocks: [
          "\\int \\cos x\\,dx=\\sin x+C\\qquad\\int \\sin x\\,dx=-\\cos x+C",
          "\\int_0^\\pi \\sin x\\,dx=2\\qquad\\int_0^{\\pi/2}\\cos x\\,dx=1",
        ],
      },
      workedExamples: isWorked,
      guidedPractice: isGuided,
      independentPractice: isIndep,
      commonMistakes: [
        { mistake: "Writing ∫sin x dx = cos x + C (missing the negative).", fix: "The antiderivative of sin x is −cos x + C. Verify: d/dx(−cos x) = sin x ✓. The negative is essential." },
        { mistake: "Treating ∫₀^(2π) sin x dx = 0 as 'zero area'.", fix: "The definite integral being zero means the signed areas cancel. The actual (total) area enclosed is 4 (two units of positive area plus two units of negative area)." },
        { mistake: "Substituting degree values like sin(90) instead of sin(π/2).", fix: "Integration results use radian measure. sin(π/2) = 1, not sin(90) ≈ 0.988 (degrees mode). Always use radians." },
      ],
      masteryQuiz: isMastery,
    };
  }

  if (lesson.slug === "integrating-trig-chain-rule") {
    return {
      ...base,
      description: "Integrate sin(ax+b) and cos(ax+b) using the reverse chain rule, and evaluate definite integrals of composite trig functions.",
      learningIntention: "Apply the reverse chain rule to integrate composite trigonometric functions of the form sin(ax+b) and cos(ax+b).",
      successCriteria: [
        "Apply ∫sin(ax) dx = −(1/a)cos(ax) + C and ∫cos(ax) dx = (1/a)sin(ax) + C.",
        "Integrate sin(ax+b) and cos(ax+b) using the same approach.",
        "Evaluate definite integrals of composite trig functions between standard limits.",
        "Compute exact areas under y = sin(ax) or y = cos(ax).",
        "Integrate sums of composite trig functions.",
      ],
      teaching: {
        paragraphs: [
          "The reverse chain rule for trig: to integrate sin(ax), we need a function whose derivative is sin(ax). Since d/dx(−(1/a)cos(ax)) = (1/a)·a·sin(ax) = sin(ax), the antiderivative is −(1/a)cos(ax) + C. Divide by the coefficient a — the same principle as integrating e^(ax).",
          "For cos(ax): d/dx((1/a)sin(ax)) = (1/a)·a·cos(ax) = cos(ax). So ∫cos(ax) dx = (1/a)sin(ax) + C.",
          "The constant b in sin(ax+b) does not change the result: ∫sin(ax+b) dx = −(1/a)cos(ax+b) + C. The inner derivative of ax+b is still a.",
          "To check: differentiate your result and verify you recover the integrand. This habit catches sign errors and missing factors quickly.",
          "Exact values needed: sin(π/2) = 1, cos(π) = −1, sin(π) = 0. Many definite integral evaluations reduce to arithmetic using these values.",
        ],
        latexBlocks: [
          "\\int\\sin(ax)\\,dx=-\\frac{1}{a}\\cos(ax)+C",
          "\\int\\cos(ax)\\,dx=\\frac{1}{a}\\sin(ax)+C",
          "\\int\\sin(ax+b)\\,dx=-\\frac{1}{a}\\cos(ax+b)+C",
        ],
      },
      workedExamples: icWorked,
      guidedPractice: icGuided,
      independentPractice: icIndep,
      commonMistakes: [
        { mistake: "Writing ∫sin(2x) dx = −cos(2x) + C without the factor of 1/2.", fix: "∫sin(2x) dx = −(1/2)cos(2x) + C. Check: d/dx(−(1/2)cos(2x)) = (1/2)·2·sin(2x) = sin(2x) ✓." },
        { mistake: "Writing ∫cos(x/2) dx = sin(x/2) + C without adjusting for the coefficient 1/2.", fix: "The inner coefficient is 1/2. ∫cos(ax) dx = (1/a)sin(ax), so 1/a = 2. Result: 2 sin(x/2) + C." },
        { mistake: "Confusing area with definite integral and not splitting at sign changes.", fix: "For area between a trig function and the x-axis, identify where the function changes sign and split the integral there, taking absolute values of each part." },
      ],
      masteryQuiz: icMastery,
    };
  }

  if (lesson.slug === "applications-trig-calculus") {
    return {
      ...base,
      description: "Apply trig calculus to find stationary points, classify them, compute exact areas, and find tangent equations.",
      learningIntention: "Use trigonometric derivatives and integrals to analyse trig curves, find stationary points, and calculate exact areas.",
      successCriteria: [
        "Find and classify stationary points of trig functions using the first and second derivative tests.",
        "Find the equation of a tangent to a trig curve at a given point.",
        "Distinguish between the definite integral (signed area) and the total enclosed area.",
        "Calculate exact areas bounded by trig curves and the x-axis.",
        "Apply the second derivative test using trig identities to classify turning points.",
      ],
      teaching: {
        paragraphs: [
          "Stationary points of y = sin(ax+b) occur where dy/dx = a·cos(ax+b) = 0, i.e., cos(ax+b) = 0, i.e., ax+b = π/2 + nπ. Solve for x. The second derivative d²y/dx² = −a²·sin(ax+b); substitute x to classify.",
          "For area calculations with trig functions, always sketch first (or sign-analyse) to identify where the function is above or below the x-axis. Combine |∫ on each interval| for total area.",
          "Concavity of sin and cos: y = sin x has y″ = −sin x. Where sin x > 0 (i.e., on (0, π)): y″ < 0 → concave down. Where sin x < 0 (i.e., on (π, 2π)): y″ > 0 → concave up. Inflection points are at x = 0, π, 2π.",
          "Tangent lines to trig curves: the process is the same as for polynomial curves — evaluate the derivative at the x-value to get the gradient, then use y − y₀ = m(x − x₀). Exact gradients like cos(π/6) = √3/2 should be left as exact values.",
          "The area under one arch of y = sin(ax) on [0, π/a] equals 2/a. For y = cos(ax) on [0, π/(2a)] (one quarter-arch) equals 1/a. These are useful area benchmarks.",
        ],
        latexBlocks: [
          "\\text{Area under one arch of }\\sin(ax):\\;\\int_0^{\\pi/a}\\sin(ax)\\,dx=\\frac{2}{a}",
          "y''=-\\sin x:\\;\\text{concave down on }(0,\\pi),\\;\\text{concave up on }(\\pi,2\\pi)",
        ],
      },
      workedExamples: atWorked,
      guidedPractice: atGuided,
      independentPractice: atIndep,
      commonMistakes: [
        { mistake: "Computing ∫₀^(2π) sin x dx = 0 and concluding the area is 0.", fix: "The definite integral being 0 means signed areas cancel. The enclosed area is |2| + |−2| = 4. Always check if the function changes sign on the interval." },
        { mistake: "Finding stationary points of sin(2x) at x = π/2 instead of π/4.", fix: "d/dx(sin(2x)) = 2cos(2x) = 0 → 2x = π/2 → x = π/4. Doubling the frequency halves the x-values of stationary points." },
        { mistake: "Using degree-mode exact values like sin 30° = 1/2 in radian problems.", fix: "Always use radian equivalents: sin(π/6) = 1/2, cos(π/3) = 1/2, etc. Mixing degree and radian notation gives wrong answers." },
      ],
      masteryQuiz: atMastery,
    };
  }

  if (lesson.slug === "trig-calculus-exam-practice") {
    return {
      ...base,
      description: "HSC-style problems combining trigonometric differentiation, integration, initial value problems, curve analysis, and area calculations.",
      learningIntention: "Apply all trig calculus results to exam-standard problems requiring differentiation, integration, and curve analysis.",
      successCriteria: [
        "Differentiate composite trig expressions using the chain and product rules.",
        "Integrate composite trig expressions and evaluate definite integrals.",
        "Solve initial value problems with trig derivatives.",
        "Calculate exact enclosed areas involving trig functions.",
        "Identify sign errors: correct negative signs in trig antiderivatives.",
      ],
      teaching: {
        paragraphs: [
          "In HSC exams, trig calculus questions test the chain rule (differentiating sin(2x), cos(3x)), the product rule (differentiating x·sin x), integration (finding antiderivatives and evaluating definite integrals), and area calculations (including those requiring sign analysis).",
          "Sign discipline: the three most common errors are (1) d/dx(cos x) = +sin x instead of −sin x; (2) ∫sin(2x) dx = cos(2x)/2 instead of −cos(2x)/2; (3) claiming total area = signed area when the function changes sign.",
          "Initial value problems: given dy/dx = f(x) and a point (x₀, y₀), integrate to get y = F(x) + C, then solve for C using the given point. The C makes the solution unique.",
          "Product rule with trig: d/dx(x·sin x) = sin x + x·cos x. d/dx(x²·cos x) = 2x·cos x − x²·sin x. These are two-mark HSC questions.",
          "Chain rule compositions: d/dx(sin²x) = 2 sin x cos x = sin(2x); d/dx(cos³x) = −3 cos²x sin x. These appear in harder questions.",
        ],
        latexBlocks: [
          "\\text{Sign chain: }\\sin\\to\\cos\\to-\\sin\\to-\\cos\\to\\sin",
          "\\text{Area vs integral: total area}=\\sum|\\text{signed areas between sign changes}|",
        ],
      },
      workedExamples: [],
      guidedPractice: tcExGuided,
      independentPractice: tcExIndep,
      commonMistakes: [
        { mistake: "Differentiating sin(3x) + cos(2x) and writing 3cos(3x) + 2sin(2x).", fix: "The derivative of cos(2x) is −2sin(2x), not +2sin(2x). d/dx(sin(3x) + cos(2x)) = 3cos(3x) − 2sin(2x)." },
        { mistake: "Evaluating ∫₀^π sin(2x) dx = 0 and treating this as the area.", fix: "sin(2x) is positive on (0, π/2) and negative on (π/2, π). Total area = ∫₀^(π/2) sin(2x) dx + |∫_(π/2)^π sin(2x) dx| = 1 + 1 = 2." },
        { mistake: "Applying the product rule to sin(2x) as if it were a product of two functions.", fix: "sin(2x) is a composition, not a product. Use the chain rule: d/dx(sin(2x)) = 2cos(2x). Save the product rule for functions like x·sin(x)." },
      ],
      masteryQuiz: tcExMastery,
    };
  }

  return null;
}
