import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
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
  fa("y11adv-tc-ds-g1", "Find dy/dx.", "y = \\sin x", "cos x", ["\\cos x"]),
  mc("y11adv-tc-ds-g2", "What is d/dx(cos x)?", "D",
    [{ label: "A", text: "$\\cos x$" }, { label: "B", text: "$\\sin x$" }, { label: "C", text: "$-\\cos x$" }, { label: "D", text: "$-\\sin x$" }],
    "d/dx(cos x) = −sin x. The negative sign is important: differentiating cosine gives minus sine.", ""),
  fa("y11adv-tc-ds-g3", "Find dy/dx.", "y = 4\\cos x", "-4sin x", ["-4\\sin x"]),
  mc("y11adv-tc-ds-g4", "The gradient of y = sin x at x = 0 is:", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$-1$" }, { label: "C", text: "$1$" }, { label: "D", text: "$\\pi$" }],
    "dy/dx = cos x. At x = 0: cos 0 = 1.", "y=\\sin x"),
];

const dsIndep: PracticeQuestion[] = [
  fa("y11adv-tc-ds-i1", "Find dy/dx.", "y = 5\\sin x", "5cos x", ["5\\cos x"]),
  fa("y11adv-tc-ds-i2", "Find dy/dx.", "y = \\sin x + \\cos x", "cos x - sin x", ["\\cos x-\\sin x"]),
  mc("y11adv-tc-ds-i3", "Which is NOT a consequence of d/dx(sin x) = cos x?", "D",
    [{ label: "A", text: "d/dx(sin x) = 0 at x = π/2" }, { label: "B", text: "d/dx(sin x) = 1 at x = 0" }, { label: "C", text: "sin x has a stationary point at x = π/2" }, { label: "D", text: "The gradient of sin x is always positive" }],
    "cos(π/2) = 0 means sin x has a stationary point at x = π/2 (not that d/dx is not a consequence of the formula). The gradient cos x is positive on (0, π/2) but negative on (π/2, 3π/2) — it is not always positive.", ""),
  fa("y11adv-tc-ds-i4", "Find the gradient of y = cos x at x = π.", "", "0", ["0"]),
  mc("y11adv-tc-ds-i5", "Why must angles be measured in radians when differentiating trig functions?", "B",
    [{ label: "A", text: "Degrees always give the same result" }, { label: "B", text: "The limit definition of d/dx(sin x) uses the small-angle approximation sin h ≈ h, which requires radians" }, { label: "C", text: "Radians are a convention only" }, { label: "D", text: "Degree mode gives complex numbers" }],
    "The derivative d/dx(sin x) = cos x is derived from lim(h→0)(sin h)/h = 1. This limit equals 1 only when h is in radians. In degrees, lim(h→0)(sin h°)/h = π/180 ≠ 1, giving a different derivative.", ""),
];

const dsMastery: PracticeQuestion[] = [
  fa("y11adv-tc-ds-m1", "Find dy/dx.", "y = 3\\sin x + 5\\cos x", "3cos x - 5sin x", ["3\\cos x-5\\sin x"]),
  mc("y11adv-tc-ds-m2", "At which x-value does y = cos x have a stationary point (in [0, 2π])?", "B",
    [{ label: "A", text: "$x = 0$" }, { label: "B", text: "$x = \\pi$" }, { label: "C", text: "$x = \\pi/2$" }, { label: "D", text: "$x = \\pi/4$" }],
    "dy/dx = −sin x = 0 in [0, 2π] at x = 0, π, 2π. The non-trivial answer among options is x = π. At x=0 and x=2π the function is at its endpoints.", "y=\\cos x"),
  fa("y11adv-tc-ds-m3", "Find dy/dx.", "y = 2\\sin x - \\cos x", "2cos x + sin x", ["2\\cos x+\\sin x"]),
  mc("y11adv-tc-ds-m4", "d²/dx²(sin x) equals:", "C",
    [{ label: "A", text: "$\\cos x$" }, { label: "B", text: "$-\\cos x$" }, { label: "C", text: "$-\\sin x$" }, { label: "D", text: "$\\sin x$" }],
    "d/dx(sin x) = cos x. d/dx(cos x) = −sin x. So d²/dx²(sin x) = −sin x.", ""),
  fa("y11adv-tc-ds-m5", "Find the x-values in [0, 2π] where y = sin x is stationary.", "", "x = π/2 and x = 3π/2", ["π/2, 3π/2"]),
  mc("y11adv-tc-ds-m6", "The tangent to y = sin x at (π, 0) has equation:", "B",
    [{ label: "A", text: "$y = x - \\pi$" }, { label: "B", text: "$y = -(x - \\pi)$" }, { label: "C", text: "$y = 0$" }, { label: "D", text: "$y = x$" }],
    "Gradient: cos π = −1. Point: (π, 0). Tangent: y − 0 = −1(x − π) → y = −(x − π) = −x + π.", "y=\\sin x"),
  fa("y11adv-tc-ds-m7", "Evaluate dy/dx at x = π/6.", "y = \\cos x", "-sin(π/6) = -1/2", ["−1/2", "-1/2"]),
  mc("y11adv-tc-ds-m8", "The second derivative of cos x is:", "D",
    [{ label: "A", text: "$\\sin x$" }, { label: "B", text: "$-\\sin x$" }, { label: "C", text: "$-\\cos x$" }, { label: "D", text: "$\\cos x$ — it's its own second derivative with a sign flip that cancels" }],
    "Wait — d/dx(cos x) = −sin x. d/dx(−sin x) = −cos x. So d²/dx²(cos x) = −cos x, not cos x. Option C is correct.", ""),
];

// Corrected mastery m8:
// d/dx(cos x) = -sin x; d/dx(-sin x) = -cos x, so d²/dx²(cos x) = -cos x → option C

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
  mc("y11adv-tc-dc-g2", "What is d/dx(cos(5x))?", "B",
    [{ label: "A", text: "$\\sin(5x)$" }, { label: "B", text: "$-5\\sin(5x)$" }, { label: "C", text: "$5\\cos(5x)$" }, { label: "D", text: "$-\\sin(5x)$" }],
    "Chain rule: inner function 5x has derivative 5. d/dx(cos(f(x))) = −f′·sin(f). So −5 sin(5x).", ""),
  fa("y11adv-tc-dc-g3", "Find dy/dx.", "y = \\cos(3x+\\pi)", "-3sin(3x+π)", ["-3\\sin(3x+\\pi)"]),
  mc("y11adv-tc-dc-g4", "d/dx(sin(ax+b)) equals:", "A",
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
  mc("y11adv-tc-dc-i5", "d/dx(cos(ax+b)) equals:", "B",
    [{ label: "A", text: "$\\sin(ax+b)$" }, { label: "B", text: "$-a\\sin(ax+b)$" }, { label: "C", text: "$a\\sin(ax+b)$" }, { label: "D", text: "$-a\\cos(ax+b)$" }],
    "Chain rule: inner derivative a. Outer derivative of cos is −sin. Result: −a·sin(ax+b).", ""),
];

const dcMastery: PracticeQuestion[] = [
  fa("y11adv-tc-dc-m1", "Find dy/dx.", "y = \\sin(5x+2)", "5cos(5x+2)", ["5\\cos(5x+2)"]),
  mc("y11adv-tc-dc-m2", "d/dx(tan(3x)) equals:", "C",
    [{ label: "A", text: "$3\\tan(3x)$" }, { label: "B", text: "$\\sec^2(3x)$" }, { label: "C", text: "$3\\sec^2(3x)$" }, { label: "D", text: "$-3\\sec^2(3x)$" }],
    "d/dx(tan(ax)) = a·sec²(ax). Here a = 3: 3 sec²(3x).", ""),
  fa("y11adv-tc-dc-m3", "Find dy/dx.", "y = 2\\cos(\\pi x)", "-2π sin(πx)", ["-2\\pi\\sin(\\pi x)"]),
  mc("y11adv-tc-dc-m4", "The gradient of y = cos(2x) at x = π/4 is:", "A",
    [{ label: "A", text: "$-2$" }, { label: "B", text: "$0$" }, { label: "C", text: "$2$" }, { label: "D", text: "$-1$" }],
    "dy/dx = −2 sin(2x). At x = π/4: −2 sin(π/2) = −2·1 = −2.", ""),
  fa("y11adv-tc-dc-m5", "Find dy/dx.", "y = \\sin(x^2)", "2x cos(x²)", ["2x\\cos(x^2)"]),
  mc("y11adv-tc-dc-m6", "d/dx(sin(2x) + cos(3x)) equals:", "C",
    [{ label: "A", text: "$\\cos(2x)+\\sin(3x)$" }, { label: "B", text: "$2\\cos(2x)+3\\sin(3x)$" }, { label: "C", text: "$2\\cos(2x)-3\\sin(3x)$" }, { label: "D", text: "$-2\\sin(2x)-3\\cos(3x)$" }],
    "d/dx(sin(2x)) = 2cos(2x). d/dx(cos(3x)) = −3sin(3x). Sum: 2cos(2x) − 3sin(3x).", ""),
  fa("y11adv-tc-dc-m7", "Find the x-value in (0, π) where y = sin(2x) is stationary.", "", "x = π/4 and x = 3π/4", ["π/4, 3π/4"]),
  mc("y11adv-tc-dc-m8", "Which correctly states d/dx(tan x) = sec²x?", "B",
    [{ label: "A", text: "This is a definition, not a derived result" }, { label: "B", text: "Derived by applying the quotient rule to sin x/cos x and using sin²x+cos²x = 1" }, { label: "C", text: "Derived from the chain rule applied to cos x" }, { label: "D", text: "Only valid near x = 0" }],
    "tan x = sin x/cos x. Quotient rule gives (cos²x+sin²x)/cos²x = 1/cos²x = sec²x.", ""),
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
  mc("y11adv-tc-is-g2", "What is ∫sin x dx?", "C",
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
  mc("y11adv-tc-is-i3", "Evaluate ∫₀^π sin x dx.", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$-2$" }, { label: "C", text: "$2$" }, { label: "D", text: "$1$" }],
    "[−cos x]₀^π = −cos π − (−cos 0) = 1 − (−1) = 2.", ""),
  fa("y11adv-tc-is-i4", "Evaluate.", "\\int_0^{\\pi} \\cos x\\,dx", "0", ["0"]),
  mc("y11adv-tc-is-i5", "Which is the correct antiderivative pair?", "D",
    [{ label: "A", text: "$\\sin x$ and $\\cos x$" }, { label: "B", text: "$\\cos x$ and $\\sin x$" }, { label: "C", text: "$-\\sin x$ and $\\cos x$" }, { label: "D", text: "$\\cos x$ and $-\\sin x$" }],
    "d/dx(sin x) = cos x → ∫cos x dx = sin x. d/dx(−cos x) = sin x → ∫sin x dx = −cos x.", ""),
];

const isMastery: PracticeQuestion[] = [
  fa("y11adv-tc-is-m1", "Find the integral.", "\\int 4\\sin x\\,dx", "-4cos x+C", ["-4\\cos x+C"]),
  mc("y11adv-tc-is-m2", "∫(cos x − sin x) dx equals:", "B",
    [{ label: "A", text: "$-\\sin x-\\cos x+C$" }, { label: "B", text: "$\\sin x+\\cos x+C$" }, { label: "C", text: "$\\sin x-\\cos x+C$" }, { label: "D", text: "$-\\sin x+\\cos x+C$" }],
    "∫cos x dx = sin x; ∫(−sin x) dx = cos x. Sum: sin x + cos x + C.", ""),
  fa("y11adv-tc-is-m3", "Evaluate.", "\\int_0^{\\pi/2} (\\sin x+\\cos x)\\,dx", "2", ["2"]),
  mc("y11adv-tc-is-m4", "Why does ∫₀^(2π) sin x dx = 0?", "B",
    [{ label: "A", text: "sin x has no area" }, { label: "B", text: "The positive area [0, π] and negative area [π, 2π] cancel exactly" }, { label: "C", text: "The derivative of sin x is cos x, and cos(2π) = cos(0)" }, { label: "D", text: "The formula gives sin(2π) − sin(0) = 0" }],
    "sin x is positive on (0, π) and negative on (π, 2π), with equal areas by symmetry. The definite integral (signed area) gives zero. To find the total enclosed area, split at x = π.", ""),
  fa("y11adv-tc-is-m5", "Find the integral.", "\\int (2\\sin x - 3\\cos x)\\,dx", "-2cos x - 3sin x+C", ["-2\\cos x-3\\sin x+C"]),
  mc("y11adv-tc-is-m6", "∫₋π^π sin x dx equals:", "A",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$2$" }, { label: "C", text: "$-2$" }, { label: "D", text: "$\\pi$" }],
    "sin x is an odd function. ∫₋ₐᵃ f(x) dx = 0 for odd f. Alternatively: [−cos x]₋π^π = −cos π − (−cos(−π)) = 1 − 1 = 0.", ""),
  fa("y11adv-tc-is-m7", "Evaluate.", "\\int_{\\pi/2}^{\\pi} \\cos x\\,dx", "-1", ["-1"]),
  mc("y11adv-tc-is-m8", "Which integral gives the area between y = cos x and the x-axis for 0 ≤ x ≤ π?", "C",
    [{ label: "A", text: "$\\int_0^\\pi \\cos x\\,dx$" }, { label: "B", text: "$\\int_0^{\\pi/2} \\cos x\\,dx+\\int_{\\pi/2}^{\\pi} \\cos x\\,dx$" }, { label: "C", text: "$\\int_0^{\\pi/2} \\cos x\\,dx-\\int_{\\pi/2}^{\\pi} \\cos x\\,dx$" }, { label: "D", text: "$2\\int_0^\\pi \\cos x\\,dx$" }],
    "cos x ≥ 0 on [0, π/2] and cos x ≤ 0 on [π/2, π]. For area, take the absolute value of each part: ∫₀^(π/2) cos x dx − ∫_(π/2)^π cos x dx.", ""),
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
  mc("y11adv-tc-ic-g2", "∫sin(4x) dx equals:", "C",
    [{ label: "A", text: "$4\\cos(4x)+C$" }, { label: "B", text: "$\\cos(4x)+C$" }, { label: "C", text: "$-\\cos(4x)/4+C$" }, { label: "D", text: "$-\\cos(4x)+C$" }],
    "∫sin(ax) dx = −(1/a)cos(ax) + C. Here a = 4: −(1/4)cos(4x) + C.", ""),
  fa("y11adv-tc-ic-g3", "Evaluate.", "\\int_0^{\\pi/6} \\sin(3x)\\,dx", "2/3", ["2/3"]),
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
  mc("y11adv-tc-ic-i5", "∫cos(x/2) dx equals:", "D",
    [{ label: "A", text: "$\\sin(x/2)+C$" }, { label: "B", text: "$-2\\sin(x/2)+C$" }, { label: "C", text: "$(1/2)\\sin(x/2)+C$" }, { label: "D", text: "$2\\sin(x/2)+C$" }],
    "Inner coefficient a = 1/2. ∫cos(ax) dx = (1/a)sin(ax) + C. Here 1/a = 1/(1/2) = 2. Result: 2sin(x/2) + C.", ""),
];

const icMastery: PracticeQuestion[] = [
  fa("y11adv-tc-ic-m1", "Find the integral.", "\\int \\sin(2x+1)\\,dx", "-cos(2x+1)/2+C", ["-\\frac{1}{2}\\cos(2x+1)+C"]),
  mc("y11adv-tc-ic-m2", "∫₀^(π/3) sin(3x) dx equals:", "B",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$2/3$" }, { label: "C", text: "$1$" }, { label: "D", text: "$1/3$" }],
    "[−(1/3)cos(3x)]₀^(π/3) = −(1/3)cos(π) + (1/3)cos(0) = 1/3 + 1/3 = 2/3.", ""),
  fa("y11adv-tc-ic-m3", "Find the integral.", "\\int 6\\cos(3x)\\,dx", "2sin(3x)+C", ["2\\sin(3x)+C"]),
  mc("y11adv-tc-ic-m4", "Why is the antiderivative of sin(ax) equal to −(1/a)cos(ax) + C?", "A",
    [{ label: "A", text: "Because d/dx(−(1/a)cos(ax)) = (1/a)·a·sin(ax) = sin(ax)" }, { label: "B", text: "Because sin and cos are inverses of each other" }, { label: "C", text: "The factor (1/a) cancels with the coefficient a in the original" }, { label: "D", text: "Integration always introduces a 1/a factor" }],
    "The check: d/dx(−(1/a)cos(ax)) = −(1/a)·(−a)sin(ax) = sin(ax). This confirms the formula by differentiation.", ""),
  fa("y11adv-tc-ic-m5", "Evaluate.", "\\int_0^{\\pi} \\cos(x/2)\\,dx", "2", ["2"]),
  mc("y11adv-tc-ic-m6", "∫₀^(2π) cos(x) dx = 0 geometrically because:", "B",
    [{ label: "A", text: "cos(2π) = cos(0) = 1, so they cancel" }, { label: "B", text: "The positive area on [0, π/2] ∪ [3π/2, 2π] equals the negative area on [π/2, 3π/2]" }, { label: "C", text: "cos x is odd over [0, 2π]" }, { label: "D", text: "cos(2π) − cos(0) = 0" }],
    "cos x ≥ 0 on [0, π/2] and [3π/2, 2π], and cos x ≤ 0 on [π/2, 3π/2]. By symmetry these areas cancel, giving a signed area of 0.", ""),
  fa("y11adv-tc-ic-m7", "Find the integral.", "\\int (2\\sin(x)-3\\cos(2x))\\,dx", "-2cos x - 3sin(2x)/2+C", ["-2\\cos x-\\frac{3}{2}\\sin(2x)+C"]),
  mc("y11adv-tc-ic-m8", "The total area enclosed between y = sin x and the x-axis for 0 ≤ x ≤ 2π is:", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "$4$" }, { label: "D", text: "$2$" }],
    "Area = ∫₀^π sin x dx + |∫_π^(2π) sin x dx| = [−cos x]₀^π + |[−cos x]_π^(2π)| = 2 + |−2| = 2 + 2 = 4.", ""),
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
  mc("y11adv-tc-at-g1", "Find the x-values in [0, 2π] where y = cos x has stationary points.", "B",
    [{ label: "A", text: "$x=\\pi/2,\\;3\\pi/2$" }, { label: "B", text: "$x=0,\\;\\pi,\\;2\\pi$" }, { label: "C", text: "$x=\\pi/4,\\;3\\pi/4$" }, { label: "D", text: "$x=\\pi$" }],
    "dy/dx = −sin x = 0 in [0, 2π] at x = 0, π, 2π.", "y=\\cos x"),
  fa("y11adv-tc-at-g2", "Find the area under y = cos x between x = 0 and x = π/2.", "", "1", ["1"]),
  mc("y11adv-tc-at-g3", "Why must you split ∫₀^(2π) |sin x| dx at x = π to find total area?", "A",
    [{ label: "A", text: "sin x is negative on (π, 2π), so the definite integral there is negative — you subtract to get area" }, { label: "B", text: "The function is undefined at x = π" }, { label: "C", text: "The antiderivative changes form at x = π" }, { label: "D", text: "The area formula requires splitting at every multiple of π/2" }],
    "For area (not signed area), you need ∫|f(x)| dx. When f changes sign, split and take absolute values of each portion.", ""),
  fa("y11adv-tc-at-g4", "Find the equation of the tangent to y = sin x at x = π/6.", "", "y = (√3/2)(x − π/6) + 1/2", ["y = (x-π/6)(√3/2)+1/2"]),
];

const atIndep: PracticeQuestion[] = [
  fa("y11adv-tc-at-i1", "Find the total area enclosed between y = sin x and the x-axis on [0, 2π].", "", "4", ["4"]),
  mc("y11adv-tc-at-i2", "y = sin x + cos x is concave down at x = π/4 because:", "A",
    [{ label: "A", text: "y″ = −sin x − cos x < 0 at x = π/4" }, { label: "B", text: "y′ = 0 at x = π/4" }, { label: "C", text: "y > 0 at x = π/4" }, { label: "D", text: "sin(π/4) > cos(π/4)" }],
    "y″(π/4) = −sin(π/4) − cos(π/4) = −1/√2 − 1/√2 = −√2 < 0 → concave down → local maximum.", ""),
  fa("y11adv-tc-at-i3", "Find the area bounded by y = cos(2x), the x-axis, x = 0 and x = π/4.", "", "1/2", ["1/2"]),
  mc("y11adv-tc-at-i4", "The gradient of y = sin(2x) is zero at x = π/4 in (0, π/2). Is this a max or min?", "A",
    [{ label: "A", text: "Maximum: y″ = −4sin(2x) < 0 at x = π/4" }, { label: "B", text: "Minimum: y″ = 4sin(2x) > 0 at x = π/4" }, { label: "C", text: "Horizontal inflection" }, { label: "D", text: "Cannot be determined from the second derivative" }],
    "y = sin(2x), y′ = 2cos(2x), y″ = −4sin(2x). At x = π/4: y″ = −4 sin(π/2) = −4 < 0 → local maximum.", ""),
  fa("y11adv-tc-at-i5", "Find the area enclosed between y = sin x, y = 0, x = 0 and x = π.", "", "2", ["2"]),
];

const atMastery: PracticeQuestion[] = [
  fa("y11adv-tc-at-m1", "Find all stationary points of y = 2 sin x on [0, 2π].", "", "(π/2, 2) and (3π/2, -2)", ["π/2,3π/2"]),
  mc("y11adv-tc-at-m2", "The area under y = cos x on [0, π] is:", "B",
    [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2$ (split at π/2 since cos x changes sign)" }, { label: "C", text: "$0$" }, { label: "D", text: "$1$" }],
    "Area = ∫₀^(π/2) cos x dx + |∫_(π/2)^π cos x dx| = [sin x]₀^(π/2) + |[sin x]_(π/2)^π| = 1 + |sin π − sin(π/2)| = 1 + 1 = 2.", ""),
  fa("y11adv-tc-at-m3", "Find the stationary points of y = sin x − cos x on [0, 2π].", "", "(3π/4, √2) and (7π/4, -√2)", ["x=3π/4, 7π/4"]),
  mc("y11adv-tc-at-m4", "The area bounded by y = sin(2x), the x-axis, x = 0, x = π/2 is:", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$2$" }, { label: "C", text: "$1$" }, { label: "D", text: "$1/2$" }],
    "sin(2x) ≥ 0 on [0, π/2]. Area = ∫₀^(π/2) sin(2x) dx = [−(1/2)cos(2x)]₀^(π/2) = −(1/2)cos(π) + (1/2)cos(0) = 1/2 + 1/2 = 1.", ""),
  fa("y11adv-tc-at-m5", "Find the equation of the tangent to y = cos x at (0, 1).", "", "y = 1", ["y=1"]),
  mc("y11adv-tc-at-m6", "On [0, 2π], y = sin x + cos x has its maximum value at:", "A",
    [{ label: "A", text: "$x = \\pi/4$" }, { label: "B", text: "$x = \\pi/2$" }, { label: "C", text: "$x = 0$" }, { label: "D", text: "$x = 3\\pi/4$" }],
    "The stationary point at x = π/4 is a maximum (y″ < 0 there) with y(π/4) = √2.", ""),
  fa("y11adv-tc-at-m7", "Find the area enclosed between y = cos(x/2) and the x-axis for 0 ≤ x ≤ π.", "", "2", ["2"]),
  mc("y11adv-tc-at-m8", "The gradient of y = sin x is greatest at:", "B",
    [{ label: "A", text: "$x = \\pi/2$" }, { label: "B", text: "$x = 0$ (and $x = 2\\pi$)" }, { label: "C", text: "$x = \\pi$" }, { label: "D", text: "$x = \\pi/4$" }],
    "The gradient of sin x is cos x. cos x reaches its maximum value of 1 at x = 0 (and x = 2π). At x = π/2: gradient = cos(π/2) = 0.", ""),
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
  fa("y11adv-tc-ex-i1", "Find the exact area bounded by y = sin(2x), the x-axis, x = 0 and x = π.", "", "2", ["2"]),
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
  fa("y11adv-tc-ex-m1", "Find dy/dx.", "y = \\sin^2(x)", "2sin x cos x = sin(2x)", ["\\sin(2x)", "2\\sin x\\cos x"]),
  mc("y11adv-tc-ex-m2", "d/dx(sin³x) using the chain rule equals:", "C",
    [{ label: "A", text: "$\\cos^3 x$" }, { label: "B", text: "$3\\sin^2 x$" }, { label: "C", text: "$3\\sin^2 x\\cos x$" }, { label: "D", text: "$3\\cos^2 x$" }],
    "Write sin³x = (sin x)³. Chain rule: 3(sin x)²·cos x = 3sin²x cos x.", ""),
  fa("y11adv-tc-ex-m3", "Evaluate.", "\\int_0^\\pi \\sin\\!\\left(\\frac{x}{2}\\right)\\,dx", "4", ["4"]),
  mc("y11adv-tc-ex-m4", "The area between y = cos x and y = 0 on [0, 3π/2] is:", "B",
    [{ label: "A", text: "$1$" }, { label: "B", text: "$3$ (area = 1 + 1 + 1 in three quarter-periods)" }, { label: "C", text: "$0$" }, { label: "D", text: "$2$" }],
    "Split: ∫₀^(π/2) cos x dx = 1; |∫_(π/2)^(3π/2) cos x dx| = |[sin x]| = |sin(3π/2) − sin(π/2)| = |−1−1| = 2. Total = 1 + 2 = 3.", ""),
  fa("y11adv-tc-ex-m5", "Differentiate y = cos²x.", "", "-sin(2x)", ["-\\sin(2x)", "-2\\sin x\\cos x"]),
  mc("y11adv-tc-ex-m6", "∫₀^(π/2) sin²x dx can be evaluated by substituting sin²x =:", "B",
    [{ label: "A", text: "$1-\\cos^2 x$" }, { label: "B", text: "$(1-\\cos(2x))/2$" }, { label: "C", text: "$\\cos(2x)/2$" }, { label: "D", text: "$1/2$ (always)" }],
    "The half-angle identity sin²x = (1 − cos(2x))/2 converts the integral to one involving cos(2x), which we can integrate directly.", ""),
  fa("y11adv-tc-ex-m7", "Find dy/dx for y = sin(eˣ).", "", "e^x cos(e^x)", ["e^x\\cos(e^x)"]),
  mc("y11adv-tc-ex-m8", "Which describes the behaviour of y = sin x as x → ∞?", "C",
    [{ label: "A", text: "Approaches 0" }, { label: "B", text: "Approaches ∞" }, { label: "C", text: "Oscillates between −1 and 1 indefinitely" }, { label: "D", text: "Approaches 1" }],
    "sin x oscillates between −1 and 1 with period 2π. It does not converge to any limit as x → ∞.", ""),
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
