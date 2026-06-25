import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
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
  fa("y11adv-elc-de-g1", "Find dy/dx.", "y = e^{4x}", "4e^(4x)", ["4e^{4x}"]),
  mc("y11adv-elc-de-g2", "What makes eˣ unique among all functions?", "B",
    [{ label: "A", text: "It is always positive" }, { label: "B", text: "It is its own derivative: d/dx(eˣ) = eˣ" }, { label: "C", text: "Its domain is x > 0" }, { label: "D", text: "Its integral is eˣ − 1" }],
    "eˣ is the unique function (up to scalar multiples) that equals its own derivative. This is why it appears throughout calculus and modelling.", ""),
  fa("y11adv-elc-de-g3", "Find dy/dx.", "y = e^{-2x}", "-2e^(-2x)", ["-2e^{-2x}"]),
  mc("y11adv-elc-de-g4", "What is the gradient of y = e^(3x) at x = 0?", "C",
    [{ label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "3" }, { label: "D", text: "3e" }],
    "dy/dx = 3e^(3x). At x = 0: 3e⁰ = 3·1 = 3.", "y = e^{3x}"),
];

const deIndep: PracticeQuestion[] = [
  fa("y11adv-elc-de-i1", "Find dy/dx.", "y = 4e^{5x}", "20e^(5x)", ["20e^{5x}"]),
  fa("y11adv-elc-de-i2", "Find dy/dx.", "y = e^{x^2+1}", "2xe^(x²+1)", ["2xe^{x^2+1}"]),
  mc("y11adv-elc-de-i3", "Find the gradient of y = e^(2x) at the point (0, 1).", "B",
    [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "2e" }, { label: "D", text: "e" }],
    "dy/dx = 2e^(2x). At x=0: 2e⁰ = 2.", "y=e^{2x}"),
  fa("y11adv-elc-de-i4", "Find dy/dx.", "y = 3e^{-x}", "-3e^(-x)", ["-3e^{-x}"]),
  mc("y11adv-elc-de-i5", "Which function satisfies f′(x) = f(x) and f(0) = 1?", "A",
    [{ label: "A", text: "$e^x$" }, { label: "B", text: "$e^{x+1}$" }, { label: "C", text: "$x^2+1$" }, { label: "D", text: "$\\ln x$" }],
    "Only f(x) = eˣ satisfies both conditions. f′(x) = eˣ = f(x) ✓, and f(0) = e⁰ = 1 ✓.", ""),
];

const deMastery: PracticeQuestion[] = [
  fa("y11adv-elc-de-m1", "Find dy/dx.", "y = e^{6x}", "6e^(6x)", ["6e^{6x}"]),
  mc("y11adv-elc-de-m2", "What is d/dx(e^(−x))?", "D",
    [{ label: "A", text: "$e^{-x}$" }, { label: "B", text: "$e^x$" }, { label: "C", text: "$-1$" }, { label: "D", text: "$-e^{-x}$" }],
    "The inner function is −x, with derivative −1. Chain rule: d/dx(e^(−x)) = −1·e^(−x) = −e^(−x).", ""),
  fa("y11adv-elc-de-m3", "Evaluate dy/dx at x = 1.", "y = e^{2x}", "2e^2", ["2e²"]),
  mc("y11adv-elc-de-m4", "The tangent to y = eˣ at (0, 1) has equation:", "B",
    [{ label: "A", text: "$y = x$" }, { label: "B", text: "$y = x + 1$" }, { label: "C", text: "$y = ex + 1$" }, { label: "D", text: "$y = 1$" }],
    "At x=0: gradient = e⁰ = 1; point is (0,1). Tangent: y−1 = 1(x−0) → y = x+1.", "y=e^x"),
  fa("y11adv-elc-de-m5", "Find dy/dx.", "y = e^{x+3}", "e^(x+3)", ["e^{x+3}"]),
  mc("y11adv-elc-de-m6", "d/dx(2e^(x/2)) equals:", "C",
    [{ label: "A", text: "$2e^{x/2}$" }, { label: "B", text: "$e^{x/2}/2$" }, { label: "C", text: "$e^{x/2}$" }, { label: "D", text: "$4e^{x/2}$" }],
    "Inner derivative of x/2 is 1/2. Chain rule: 2·(1/2)·e^(x/2) = e^(x/2).", ""),
  fa("y11adv-elc-de-m7", "Find dy/dx.", "y = e^{3x-2}", "3e^(3x-2)", ["3e^{3x-2}"]),
  mc("y11adv-elc-de-m8", "If y = e^(kx) and dy/dx = 5e^(5x), what is k?", "A",
    [{ label: "A", text: "5" }, { label: "B", text: "1/5" }, { label: "C", text: "25" }, { label: "D", text: "0" }],
    "dy/dx = ke^(kx). Matching with 5e^(5x) gives k = 5.", ""),
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
  fa("y11adv-elc-dl-g1", "Find dy/dx.", "y = \\ln x", "1/x", ["\\frac{1}{x}"]),
  mc("y11adv-elc-dl-g2", "What is d/dx(ln(5x))?", "A",
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
  fa("y11adv-elc-dl-m1", "Find dy/dx.", "y = \\ln(7x)", "1/x", ["\\frac{1}{x}"]),
  mc("y11adv-elc-dl-m2", "What is d/dx(ln(x⁴))?", "B",
    [{ label: "A", text: "$4x^3$" }, { label: "B", text: "$4/x$" }, { label: "C", text: "$1/(4x^3)$" }, { label: "D", text: "$4\\ln x$" }],
    "ln(x⁴) = 4 ln x. Differentiating: 4/x. (Alternatively, chain rule: 4x³/x⁴ = 4/x.)", ""),
  fa("y11adv-elc-dl-m3", "Find dy/dx.", "y = 3\\ln(x^2+4)", "6x/(x²+4)", ["\\frac{6x}{x^2+4}"]),
  mc("y11adv-elc-dl-m4", "The gradient of y = ln x at x = e is:", "C",
    [{ label: "A", text: "$e$" }, { label: "B", text: "$0$" }, { label: "C", text: "$1/e$" }, { label: "D", text: "$1$" }],
    "dy/dx = 1/x. At x = e: gradient = 1/e.", ""),
  fa("y11adv-elc-dl-m5", "Find dy/dx.", "y = \\ln(5x^2-2x)", "(10x-2)/(5x²-2x)", ["\\frac{10x-2}{5x^2-2x}"]),
  mc("y11adv-elc-dl-m6", "Why does d/dx(ln(kx)) = 1/x regardless of the constant k?", "A",
    [{ label: "A", text: "ln(kx) = ln k + ln x, and ln k is a constant with zero derivative" }, { label: "B", text: "The chain rule cancels the k" }, { label: "C", text: "k must equal 1 for this formula" }, { label: "D", text: "This only holds for positive k" }],
    "ln(kx) = ln k + ln x. Since ln k is a constant, d/dx(ln k + ln x) = 0 + 1/x = 1/x.", ""),
  fa("y11adv-elc-dl-m7", "Find dy/dx.", "y = \\ln(2x+1)^3", "6/(2x+1)", ["\\frac{6}{2x+1}"]),
  mc("y11adv-elc-dl-m8", "d/dx(ln(e^x)) simplifies to:", "B",
    [{ label: "A", text: "$e^x$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\ln x$" }, { label: "D", text: "$1/e^x$" }],
    "ln(eˣ) = x (log and exponential are inverses). So d/dx(x) = 1.", ""),
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
  mc("y11adv-elc-ie-g2", "What is ∫3eˣ dx?", "C",
    [{ label: "A", text: "$3e^x/x+C$" }, { label: "B", text: "$3xe^x+C$" }, { label: "C", text: "$3e^x+C$" }, { label: "D", text: "$e^x+C$" }],
    "The antiderivative of eˣ is eˣ. The constant 3 carries through: ∫3eˣ dx = 3eˣ + C.", ""),
  fa("y11adv-elc-ie-g3", "Find the integral.", "\\int e^{-x}\\,dx", "-e^(-x)+C", ["-e^{-x}+C"]),
  mc("y11adv-elc-ie-g4", "Evaluate ∫₀¹ eˣ dx.", "B",
    [{ label: "A", text: "$1$" }, { label: "B", text: "$e-1$" }, { label: "C", text: "$e$" }, { label: "D", text: "$e+1$" }],
    "[eˣ]₀¹ = e¹ − e⁰ = e − 1.", "\\int_0^1 e^x\\,dx"),
];

const ieIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ie-i1", "Find the integral.", "\\int e^{5x}\\,dx", "e^(5x)/5+C", ["(1/5)e^{5x}+C"]),
  fa("y11adv-elc-ie-i2", "Find the integral.", "\\int 6e^{3x}\\,dx", "2e^(3x)+C", ["2e^{3x}+C"]),
  mc("y11adv-elc-ie-i3", "Evaluate ∫₀² e^(2x) dx.", "C",
    [{ label: "A", text: "$e^4$" }, { label: "B", text: "$2e^4$" }, { label: "C", text: "$(e^4-1)/2$" }, { label: "D", text: "$e^4-1$" }],
    "[(1/2)e^(2x)]₀² = (1/2)e⁴ − (1/2)e⁰ = (e⁴−1)/2.", ""),
  fa("y11adv-elc-ie-i4", "Find the integral.", "\\int (2e^x + e^{-x})\\,dx", "2e^x - e^(-x)+C", ["2e^x-e^{-x}+C"]),
  mc("y11adv-elc-ie-i5", "∫e^(−2x) dx equals:", "D",
    [{ label: "A", text: "$e^{-2x}+C$" }, { label: "B", text: "$2e^{-2x}+C$" }, { label: "C", text: "$-e^{-2x}+C$" }, { label: "D", text: "$-e^{-2x}/2+C$" }],
    "a = −2, so ∫e^(−2x) dx = (1/(−2))e^(−2x) = −(1/2)e^(−2x) + C.", ""),
];

const ieMastery: PracticeQuestion[] = [
  fa("y11adv-elc-ie-m1", "Find the integral.", "\\int e^{4x}\\,dx", "e^(4x)/4+C", ["(1/4)e^{4x}+C"]),
  mc("y11adv-elc-ie-m2", "∫(eˣ + 1) dx equals:", "B",
    [{ label: "A", text: "$e^x+C$" }, { label: "B", text: "$e^x+x+C$" }, { label: "C", text: "$xe^x+C$" }, { label: "D", text: "$e^x+x^2/2+C$" }],
    "Integrate term by term: ∫eˣ dx + ∫1 dx = eˣ + x + C.", ""),
  fa("y11adv-elc-ie-m3", "Evaluate.", "\\int_0^2 e^x\\,dx", "e²-1", ["e^2-1"]),
  mc("y11adv-elc-ie-m4", "The antiderivative of e^(ax) (a ≠ 0) is:", "C",
    [{ label: "A", text: "$ae^{ax}+C$" }, { label: "B", text: "$e^{ax}+C$" }, { label: "C", text: "$(1/a)e^{ax}+C$" }, { label: "D", text: "$e^{ax}/x+C$" }],
    "Differentiating (1/a)e^(ax) gives (1/a)·a·e^(ax) = e^(ax) ✓.", ""),
  fa("y11adv-elc-ie-m5", "Find the integral.", "\\int 4e^{-2x}\\,dx", "-2e^(-2x)+C", ["-2e^{-2x}+C"]),
  mc("y11adv-elc-ie-m6", "∫₁² 3eˣ dx equals:", "A",
    [{ label: "A", text: "$3e^2-3e$" }, { label: "B", text: "$3e^2$" }, { label: "C", text: "$3(e^2-1)$" }, { label: "D", text: "$e^2-e$" }],
    "[3eˣ]₁² = 3e² − 3e¹ = 3(e²−e).", "\\int_1^2 3e^x\\,dx"),
  fa("y11adv-elc-ie-m7", "Find the integral.", "\\int 10e^{5x}\\,dx", "2e^(5x)+C", ["2e^{5x}+C"]),
  mc("y11adv-elc-ie-m8", "If ∫eˣ dx = F(x) + C and F(0) = 2, then F(x) =", "B",
    [{ label: "A", text: "$e^x$" }, { label: "B", text: "$e^x+1$" }, { label: "C", text: "$e^x+2$" }, { label: "D", text: "$e^x-1$" }],
    "F(x) = eˣ + C. F(0) = e⁰ + C = 1 + C = 2 → C = 1. So F(x) = eˣ + 1.", ""),
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
  mc("y11adv-elc-ir-g4", "Evaluate ∫₁ᵉ (1/x) dx.", "A",
    [{ label: "A", text: "$1$" }, { label: "B", text: "$e$" }, { label: "C", text: "$\\ln 2$" }, { label: "D", text: "$0$" }],
    "[ln x]₁ᵉ = ln e − ln 1 = 1 − 0 = 1.", ""),
];

const irIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ir-i1", "Find the integral.", "\\int \\frac{5}{x}\\,dx", "5ln|x|+C", ["5\\ln|x|+C"]),
  fa("y11adv-elc-ir-i2", "Find the integral.", "\\int \\frac{2x}{x^2+3}\\,dx", "ln(x²+3)+C", ["\\ln(x^2+3)+C"]),
  mc("y11adv-elc-ir-i3", "∫₂⁴ (1/x) dx equals:", "C",
    [{ label: "A", text: "$\\ln 4$" }, { label: "B", text: "$\\ln 2$" }, { label: "C", text: "$\\ln 2$ (i.e., ln 4 − ln 2)" }, { label: "D", text: "$1/2$" }],
    "[ln x]₂⁴ = ln 4 − ln 2 = ln(4/2) = ln 2.", ""),
  fa("y11adv-elc-ir-i4", "Find the integral.", "\\int \\frac{4x}{2x^2+1}\\,dx", "ln(2x²+1)+C", ["\\ln(2x^2+1)+C"]),
  mc("y11adv-elc-ir-i5", "Which integral cannot be evaluated using the ∫(1/x) pattern?", "D",
    [{ label: "A", text: "$\\int 1/(x+2)\\,dx$" }, { label: "B", text: "$\\int 2x/(x^2+1)\\,dx$" }, { label: "C", text: "$\\int 3/x\\,dx$" }, { label: "D", text: "$\\int 1/x^2\\,dx$" }],
    "∫(1/x²) dx = ∫x^(−2) dx = x^(−1)/(−1) + C. The power rule works here since the power is −2 ≠ −1.", ""),
];

const irMastery: PracticeQuestion[] = [
  fa("y11adv-elc-ir-m1", "Find the integral.", "\\int \\frac{1}{x}\\,dx", "ln|x|+C", ["\\ln|x|+C"]),
  mc("y11adv-elc-ir-m2", "∫(6x²/(x³+4)) dx equals:", "B",
    [{ label: "A", text: "$2x^3/(x^3+4)^2+C$" }, { label: "B", text: "$2\\ln(x^3+4)+C$" }, { label: "C", text: "$\\ln(x^3+4)+C$" }, { label: "D", text: "$6\\ln(x^3+4)+C$" }],
    "The numerator 6x² is the derivative of x³+4. Pattern: ∫(f′/f) = ln|f|. So ∫6x²/(x³+4) dx = ln(x³+4)+C. Wait — check: d/dx(x³+4) = 3x². Numerator is 6x² = 2·3x². So result is 2ln(x³+4)+C.", ""),
  fa("y11adv-elc-ir-m3", "Evaluate.", "\\int_1^e \\frac{3}{x}\\,dx", "3", ["3"]),
  mc("y11adv-elc-ir-m4", "What is ∫(1/(2x)) dx?", "C",
    [{ label: "A", text: "$2\\ln|x|+C$" }, { label: "B", text: "$\\ln|2x|+C$" }, { label: "C", text: "$(1/2)\\ln|x|+C$" }, { label: "D", text: "$\\ln|x|/x+C$" }],
    "1/(2x) = (1/2)·(1/x). Integrating: (1/2)·ln|x| + C.", ""),
  fa("y11adv-elc-ir-m5", "Find the integral.", "\\int \\frac{x}{x^2-1}\\,dx", "ln|x²-1|/2+C", ["(1/2)\\ln|x^2-1|+C"]),
  mc("y11adv-elc-ir-m6", "∫₁ᵉ² (1/x) dx equals:", "D",
    [{ label: "A", text: "$1$" }, { label: "B", text: "$e$" }, { label: "C", text: "$e^2-1$" }, { label: "D", text: "$2$" }],
    "[ln x]₁^(e²) = ln(e²) − ln 1 = 2 − 0 = 2.", ""),
  fa("y11adv-elc-ir-m7", "Find the integral.", "\\int \\frac{1}{3x+1}\\,dx", "ln|3x+1|/3+C", ["(1/3)\\ln|3x+1|+C"]),
  mc("y11adv-elc-ir-m8", "The fundamental result ∫(1/x) dx = ln|x| + C is needed because:", "A",
    [{ label: "A", text: "The power rule ∫xⁿ dx = xⁿ⁺¹/(n+1) fails at n = −1" }, { label: "B", text: "ln x differentiates to x" }, { label: "C", text: "It only applies when x > 0" }, { label: "D", text: "The power rule works but gives a complex number" }],
    "At n = −1 the power rule gives x⁰/0, which is undefined. The result ∫(1/x) dx = ln|x| + C fills this gap.", ""),
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
    "dy/dx = 1 − 1/x = 0 → 1/x = 1 → x = 1.", "y=x-\\ln x"),
  fa("y11adv-elc-ap-g3", "Find the area under y = eˣ between x = 0 and x = 2.", "", "e²-1", ["e^2-1"]),
  mc("y11adv-elc-ap-g4", "For y = ln x (x > 0), is the curve concave up or concave down?", "B",
    [{ label: "A", text: "Concave up for all x > 0" }, { label: "B", text: "Concave down for all x > 0" }, { label: "C", text: "Concave up for x > 1, concave down for 0 < x < 1" }, { label: "D", text: "Has an inflection point at x = 1" }],
    "y′ = 1/x, y″ = −1/x² < 0 for all x > 0 → always concave down.", ""),
];

const apIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ap-i1", "Find the gradient of y = ln(x²) at x = e.", "", "2/e", ["2/e"]),
  mc("y11adv-elc-ap-i2", "The function y = eˣ is always:", "C",
    [{ label: "A", text: "Concave down" }, { label: "B", text: "Decreasing" }, { label: "C", text: "Concave up" }, { label: "D", text: "Equal to its own second derivative" }],
    "y = eˣ, y′ = eˣ, y″ = eˣ > 0 always → always concave up. (And y does equal its own second derivative: y″ = eˣ = y.)", ""),
  fa("y11adv-elc-ap-i3", "Find the area enclosed between y = 1/x, the x-axis, x = 1 and x = e².", "", "2", ["2"]),
  mc("y11adv-elc-ap-i4", "For y = xe^(−x), the stationary point is at x = 1. Classify it.", "A",
    [{ label: "A", text: "Local maximum at (1, 1/e)" }, { label: "B", text: "Local minimum at (1, 1/e)" }, { label: "C", text: "Horizontal inflection at (1, 1/e)" }, { label: "D", text: "Cannot be classified without more information" }],
    "y″ = e^(−x)(x−2). At x=1: e^(−1)(−1) = −1/e < 0 → local maximum.", ""),
  fa("y11adv-elc-ap-i5", "Find the equation of the tangent to y = ln x at x = e.", "", "y = (1/e)(x-e)+1", ["y = x/e - 1 + 1", "y = (x-e)/e + 1"]),
];

const apMastery: PracticeQuestion[] = [
  fa("y11adv-elc-ap-m1", "Find the exact area under y = eˣ between x = 0 and x = 1.", "", "e-1", ["e-1"]),
  mc("y11adv-elc-ap-m2", "The function y = e^(−x²) has a stationary point at:", "B",
    [{ label: "A", text: "x = 1" }, { label: "B", text: "x = 0" }, { label: "C", text: "x = ±1" }, { label: "D", text: "No stationary points" }],
    "dy/dx = −2xe^(−x²) = 0 → x = 0 (since e^(−x²) > 0 always). So x = 0 is the only stationary point.", ""),
  fa("y11adv-elc-ap-m3", "Find the gradient of y = ln(2x) at x = 1.", "", "1", ["1"]),
  mc("y11adv-elc-ap-m4", "∫₀¹ eˣ dx and ∫₁ᵉ (1/x) dx both equal:", "C",
    [{ label: "A", text: "$e$" }, { label: "B", text: "$e-2$" }, { label: "C", text: "$e-1$ and $1$ respectively — not equal" }, { label: "D", text: "1" }],
    "∫₀¹ eˣ dx = [eˣ]₀¹ = e−1 ≈ 1.718. ∫₁ᵉ (1/x) dx = [ln x]₁ᵉ = 1. These are different values.", ""),
  fa("y11adv-elc-ap-m5", "Differentiate y = x ln x using the product rule.", "", "ln x + 1", ["1+\\ln x", "\\ln x+1"]),
  mc("y11adv-elc-ap-m6", "At the stationary point of y = x − ln x (x > 0), y equals:", "B",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "$e$" }, { label: "D", text: "$-1$" }],
    "Stationary point at x=1. y(1) = 1 − ln 1 = 1 − 0 = 1.", ""),
  fa("y11adv-elc-ap-m6b", "Find the exact area between y = 1/x and the x-axis from x = 2 to x = 6.", "", "ln 3", ["\\ln 3"]),
  mc("y11adv-elc-ap-m7", "The tangent to y = eˣ at any point (a, eᵃ) has:", "A",
    [{ label: "A", text: "Gradient equal to the y-coordinate at that point" }, { label: "B", text: "A y-intercept of 0" }, { label: "C", text: "Gradient equal to a" }, { label: "D", text: "Always passes through the origin" }],
    "dy/dx = eˣ. At x = a, the gradient is eᵃ — which is the same as the y-value. This is the self-derivative property of eˣ in geometric form.", ""),
];

// ─── L6: Exam Practice ────────────────────────────────────────────────────────

const exGuided: PracticeQuestion[] = [
  fa("y11adv-elc-ex-g1", "Find dy/dx.", "y = e^{3x} + \\ln(2x)", "3e^(3x) + 1/x", ["3e^{3x}+\\frac{1}{x}"]),
  mc("y11adv-elc-ex-g2", "What is ∫(eˣ + 1/x) dx?", "B",
    [{ label: "A", text: "$e^x + \\ln x + C$" }, { label: "B", text: "$e^x + \\ln|x| + C$" }, { label: "C", text: "$e^x + x + C$" }, { label: "D", text: "$xe^x + \\ln x + C$" }],
    "∫eˣ dx = eˣ; ∫(1/x) dx = ln|x|. Combine: eˣ + ln|x| + C.", ""),
  fa("y11adv-elc-ex-g3", "Evaluate ∫₁² (3/x) dx. Give an exact answer.", "\\int_1^2 \\frac{3}{x}\\,dx", "3 ln 2", ["3\\ln 2"]),
  mc("y11adv-elc-ex-g4", "A curve has dy/dx = 2/x and passes through (1, 5). Find y in terms of x.", "A",
    [{ label: "A", text: "$y = 2\\ln x + 5$" }, { label: "B", text: "$y = 2\\ln x + C$" }, { label: "C", text: "$y = x^2 + 5$" }, { label: "D", text: "$y = 2\\ln|x| + 3$" }],
    "Integrate: y = 2 ln x + C. Substitute (1,5): 5 = 2 ln 1 + C = 0 + C → C = 5. So y = 2 ln x + 5.", ""),
];

const exIndep: PracticeQuestion[] = [
  fa("y11adv-elc-ex-i1", "Differentiate y = x·eˣ using the product rule.", "", "e^x(x+1)", ["e^x(x+1)", "(x+1)e^x"]),
  fa("y11adv-elc-ex-i2", "Find the equation of the tangent to y = ln x at x = e².", "", "y = x/e² - 1", ["y=(x-e²)/e²+2"]),
  mc("y11adv-elc-ex-i3", "Which of the following cannot be found using the standard antiderivative results for eˣ and 1/x alone?", "D",
    [{ label: "A", text: "$\\int e^{2x}\\,dx$" }, { label: "B", text: "$\\int 1/(x+1)\\,dx$" }, { label: "C", text: "$\\int 2x/(x^2+1)\\,dx$" }, { label: "D", text: "$\\int e^{x^2}\\,dx$" }],
    "∫e^(x²) dx has no elementary closed form. The others all fit the ∫e^(ax) or ∫f′/f pattern.", ""),
  fa("y11adv-elc-ex-i4", "Find the area enclosed between y = eˣ, the x-axis, and x = −1 to x = 1.", "", "e-1/e", ["e - e^{-1}", "e-1/e"]),
  mc("y11adv-elc-ex-i5", "The function y = ln x has a y-intercept of:", "D",
    [{ label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "−1" }, { label: "D", text: "No y-intercept — ln x is not defined at x = 0" }],
    "ln x is defined only for x > 0. At x = 0 it is undefined, so the graph does not cross the y-axis.", ""),
];

const exMastery: PracticeQuestion[] = [
  fa("y11adv-elc-ex-m1", "Find dy/dx.", "y = \\ln(e^x) + e^{\\ln x}", "1+1", ["2"]),
  mc("y11adv-elc-ex-m2", "The gradient of y = e^(−x) is always:", "C",
    [{ label: "A", text: "Positive" }, { label: "B", text: "Zero" }, { label: "C", text: "Negative" }, { label: "D", text: "Positive for x < 0, negative for x > 0" }],
    "dy/dx = −e^(−x). Since e^(−x) > 0 always, −e^(−x) < 0 always. The curve is strictly decreasing.", ""),
  fa("y11adv-elc-ex-m3", "Find the x-coordinate of the stationary point of y = x²e^(−x).", "", "x=0 and x=2", ["x = 0 or x = 2"]),
  mc("y11adv-elc-ex-m4", "∫₀^(ln 2) eˣ dx equals:", "B",
    [{ label: "A", text: "$\\ln 2$" }, { label: "B", text: "$1$" }, { label: "C", text: "$2$" }, { label: "D", text: "$e^{\\ln 2}$" }],
    "[eˣ]₀^(ln2) = e^(ln 2) − e⁰ = 2 − 1 = 1.", ""),
  fa("y11adv-elc-ex-m5", "A curve has dy/dx = e^(2x) − 1 and y = 0 when x = 0. Find y.", "", "e^(2x)/2 - x - 1/2", ["(e^{2x}-1)/2-x"]),
  mc("y11adv-elc-ex-m6", "The area under y = 1/x between x = a and x = b (0 < a < b) equals:", "A",
    [{ label: "A", text: "$\\ln b - \\ln a = \\ln(b/a)$" }, { label: "B", text: "$\\ln(b-a)$" }, { label: "C", text: "$1/a - 1/b$" }, { label: "D", text: "$b/a$" }],
    "[ln x]ₐᵇ = ln b − ln a = ln(b/a). This logarithm property is important for area calculations.", ""),
  fa("y11adv-elc-ex-m7", "Find dy/dx for y = ln(sin x).", "", "cos x/sin x", ["\\cot x", "\\cos x/\\sin x"]),
  mc("y11adv-elc-ex-m8", "Which pair is a derivative–antiderivative match?", "C",
    [{ label: "A", text: "$\\ln x$ and $1/x$" }, { label: "B", text: "$e^x$ and $xe^x$" }, { label: "C", text: "$1/x$ and $\\ln|x|$" }, { label: "D", text: "$e^x$ and $e^x/x$" }],
    "d/dx(ln|x|) = 1/x → ∫(1/x) dx = ln|x| + C. Option A reverses the relationship.", ""),
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
