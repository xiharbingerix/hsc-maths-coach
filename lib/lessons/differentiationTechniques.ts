import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";

function choice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  hint = "Choose the derivative rule first, then check coefficients and signs."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index] ?? ""),
    })),
    answer,
    hint,
    explanation,
  };
}

function numeric(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Differentiate first, then substitute the given value.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function lesson(
  id: string,
  title: string,
  description: string,
  learningIntention: string,
  successCriteria: string[],
  teaching: ExplicitLesson["teaching"],
  workedExamples: WorkedExample[],
  guidedPractice: PracticeQuestion[],
  independentPractice: PracticeQuestion[],
  commonMistakes: ExplicitLesson["commonMistakes"],
  masteryQuiz: PracticeQuestion[]
): ExplicitLesson {
  return {
    id,
    slug: id,
    moduleSlug: "ma-c2-differential-calculus",
    moduleTitle: "Differential Calculus",
    courseTitle: "Year 12 Mathematics Advanced",
    title,
    description,
    syllabusArea: "Calculus",
    focus: "Differentiation techniques",
    status: "active",
    video: {
      title,
      url: "/videos/placeholder-lesson.mp4",
    },
    learningIntention,
    successCriteria,
    teaching,
    workedExamples,
    guidedPractice,
    independentPractice,
    commonMistakes,
    masteryQuiz,
    masteryPassMark: 0.8,
  };
}

export const standardDerivativesLesson = lesson(
  "standard-derivatives",
  "Standard Derivatives: Trig, Exponential and Logarithmic Functions",
  "Use standard derivatives of trigonometric, exponential and logarithmic functions, including simple linear combinations and numeric evaluations.",
  "Differentiate standard trigonometric, exponential and logarithmic functions and evaluate derivatives at clean inputs.",
  [
    "Recall the standard derivatives of sin x, cos x and tan x.",
    "Recall the standard derivatives of e^x and ln x.",
    "Differentiate simple linear combinations of standard functions.",
    "Evaluate derivatives at clean values such as x = 0 or x = 1.",
    "Recognise sign errors in trigonometric derivatives.",
    "Choose the correct standard derivative before simplifying.",
  ],
  {
    paragraphs: [
      "So far you have differentiated powers of $x$ with the rule $\\frac{d}{dx}(x^n)=nx^{n-1}$. A derivative is just a gradient function: it tells you how steep the curve is at every point. This lesson adds the standard derivatives for the three function families that dominate Year 12 — trigonometric ($\\sin x$, $\\cos x$, $\\tan x$), exponential ($e^x$), and logarithmic ($\\ln x$). None of them are arbitrary facts to memorise; each one is the gradient of a curve you can already picture.",
      "Start with $\\sin x$. Picture its graph: it climbs most steeply as it crosses zero going up, flattens to a horizontal tangent at the peak, then falls. The gradient function that does exactly this — positive on the way up, zero at the peak, negative on the way down — is $\\cos x$. So $\\frac{d}{dx}(\\sin x)=\\cos x$. Now shift everything: $\\cos x$ is just $\\sin x$ slid left, and its gradient turns out to be $-\\sin x$. The minus sign is real, not a typo: at $x=0$ the cosine curve is already at its peak and turning downward, so its gradient there is negative. This sign is the single most common error in the topic — $\\frac{d}{dx}(\\cos x)=-\\sin x$, never $+\\sin x$.",
      "The derivative of $\\tan x$ is $\\sec^2 x$. You can see why it must always be positive: $\\tan x=\\frac{\\sin x}{\\cos x}$ is an ever-increasing curve between its asymptotes, so its gradient never dips below zero — and $\\sec^2 x=\\frac{1}{\\cos^2 x}$ is a square, hence always positive. (We derive this properly with the quotient rule in a later lesson; for now, recognise the result and its sign.)",
      "The exponential $e^x$ is the most remarkable function in calculus: it is its own derivative, $\\frac{d}{dx}(e^x)=e^x$. The number $e\\approx 2.718$ is defined precisely so that the curve $y=e^x$ has gradient equal to its own height at every point — where the curve is at height 5, it is also climbing at a rate of 5. That self-matching property is what makes $e^x$ model unrestricted growth and decay. Its inverse, $\\ln x$, has derivative $\\frac{1}{x}$: a positive, shrinking gradient that explains why $\\ln x$ keeps rising but ever more slowly. For a general base, $\\frac{d}{dx}(a^x)=a^x\\ln a$ — and notice this collapses to $e^x$ when $a=e$, because $\\ln e=1$.",
      "Two rules let you combine these. Constants pull straight through a derivative — $\\frac{d}{dx}(c\\,f(x))=c\\,f'(x)$ — because multiplying a function by 5 multiplies every gradient by 5. And sums differentiate term by term, since the gradient of a sum of heights is the sum of the gradients. So $4e^x+5\\ln x$ differentiates to $4e^x+\\frac{5}{x}$, each piece handled on its own.",
      "When a question asks for a numerical value such as $f'(0)$, always differentiate first and substitute second. Substituting the number into the original function before differentiating turns it into a constant, whose derivative is just zero — a guaranteed wrong answer. Get the gradient function, then feed in the point.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(\\sin x)=\\cos x,\\qquad \\frac{d}{dx}(\\cos x)=-\\sin x",
      "\\frac{d}{dx}(\\tan x)=\\sec^2 x",
      "\\frac{d}{dx}(e^x)=e^x,\\qquad \\frac{d}{dx}(\\ln x)=\\frac{1}{x}",
      "\\frac{d}{dx}(a^x)=a^x\\ln a\\quad(\\text{reduces to }e^x\\text{ when }a=e)",
      "\\text{constants pass through: }\\frac{d}{dx}(c\\,f)=c\\,f';\\quad\\text{differentiate sums term by term}",
    ],
  },
  [
    {
      title: "Differentiate a trigonometric function",
      questionLatex: "f(x)=3\\sin x-2\\cos x",
      steps: [
        { explanation: "Sums differentiate term by term, and the constant 3 passes straight through, so the first term gives 3 times the derivative of sin x, which is cos x.", latex: "\\frac{d}{dx}(3\\sin x)=3\\cos x" },
        { explanation: "The second term carries the crucial sign: cos x differentiates to -sin x, and that minus combines with the leading -2 to give +2 sin x.", latex: "\\frac{d}{dx}(-2\\cos x)=-2(-\\sin x)=2\\sin x" },
        { explanation: "Add the two derivatives back together.", latex: "f'(x)=3\\cos x+2\\sin x" },
      ],
      finalAnswerLatex: "3\\cos x+2\\sin x",
    },
    {
      title: "Differentiate exponential and logarithmic terms",
      questionLatex: "y=4e^x+5\\ln x",
      steps: [
        { explanation: "e^x is its own derivative, and the constant 4 passes through, so this term is unchanged apart from the coefficient.", latex: "\\frac{d}{dx}(4e^x)=4e^x" },
        { explanation: "ln x differentiates to 1/x, and the 5 multiplies that result.", latex: "\\frac{d}{dx}(5\\ln x)=\\frac{5}{x}" },
        { explanation: "Combine the two term-by-term derivatives.", latex: "y'=4e^x+\\frac{5}{x}" },
      ],
      finalAnswerLatex: "4e^x+\\frac{5}{x}",
    },
    {
      title: "Evaluate a derivative",
      questionLatex: "f(x)=\\sin x+e^x.\\quad \\text{Find }f'(0).",
      steps: [
        { explanation: "Differentiate first — never substitute x = 0 into f itself, or you would just be finding a constant whose gradient is zero.", latex: "f'(x)=\\cos x+e^x" },
        { explanation: "Now substitute x = 0 into the gradient function, using cos 0 = 1 and e^0 = 1.", latex: "f'(0)=\\cos 0+e^0=1+1" },
      ],
      finalAnswerLatex: "2",
    },
  ],
  [
    choice("diff-tech-std-g1", "Choose the derivative.", "y=\\sin x", "A", ["$\\cos x$", "$-\\sin x$", "$\\sec^2 x$", "$\\frac{1}{x}$"], "The derivative of sin x is cos x."),
    choice("diff-tech-std-g2", "Choose the derivative.", "y=\\cos x", "B", ["$\\sin x$", "$-\\sin x$", "$\\sec^2 x$", "$-\\cos x$"], "The derivative of cos x is negative sin x."),
    choice("diff-tech-std-g3", "Choose the derivative.", "y=3e^x+2\\ln x", "C", ["$3e^x+2\\ln x$", "$3e^x+2x$", "$3e^x+\\frac{2}{x}$", "$e^x+\\frac{1}{x}$"], "Differentiate term by term: 3e^x stays 3e^x and 2ln x becomes 2/x."),
    numeric("diff-tech-std-g4", "Find the value of the derivative at x = 0.", "f(x)=\\sin x+e^x", "2"),
  ],
  [
    choice("diff-tech-std-i1", "Choose the derivative.", "y=\\tan x", "D", ["$\\sin x$", "$\\cos x$", "$\\tan^2 x$", "$\\sec^2 x$"], "The derivative of tan x is sec squared x."),
    choice("diff-tech-std-i2", "Choose the derivative.", "y=5\\ln x-2e^x", "A", ["$\\frac{5}{x}-2e^x$", "$5x-2e^x$", "$\\frac{1}{5x}-2e^x$", "$5\\ln x-2e^x$"], "Use d/dx ln x = 1/x and d/dx e^x = e^x."),
    numeric("diff-tech-std-i3", "Find the gradient of the curve at x = 1.", "y=4\\ln x", "4"),
    choice("diff-tech-std-i4", "A student differentiates cos x as sin x. Which option identifies the error?", "\\text{Select A, B, C, or D.}", "C", ["The derivative should be sec^2 x", "The derivative should be 1/x", "The negative sign is missing", "cos x cannot be differentiated"], "The derivative of cos x is -sin x."),
    numeric("diff-tech-std-i5", "Find f'(0).", "f(x)=2\\cos x+3e^x", "3"),
  ],
  [
    { mistake: "Differentiating cos x as sin x.", fix: "The derivative of cos x is negative sin x." },
    { mistake: "Differentiating ln x as 1/ln x.", fix: "The derivative of ln x is 1/x." },
    { mistake: "Changing e^x into x e^{x-1}.", fix: "The derivative of e^x is e^x." },
    { mistake: "Substituting before differentiating.", fix: "Differentiate the function first, then substitute the input." },
  ],
  [
    choice("diff-tech-std-m1", "Choose the derivative.", "y=4\\sin x", "A", ["$4\\cos x$", "$-4\\sin x$", "$4\\sec^2 x$", "$\\cos 4x$"], "The derivative of sin x is cos x, with the coefficient unchanged."),
    choice("diff-tech-std-m2", "Choose the derivative.", "y=7\\cos x", "B", ["$7\\sin x$", "$-7\\sin x$", "$7\\cos x$", "$-7\\cos x$"], "The derivative of cos x is -sin x."),
    choice("diff-tech-std-m3", "Choose the derivative.", "y=2\\tan x-\\ln x", "C", ["$2\\tan x-\\frac{1}{x}$", "$2\\sec x-\\frac{1}{x}$", "$2\\sec^2 x-\\frac{1}{x}$", "$2\\sec^2 x-\\ln x$"], "Differentiate tan x to sec squared x and ln x to 1/x."),
    numeric("diff-tech-std-m4", "Find f'(0).", "f(x)=\\sin x+2e^x", "3"),
    numeric("diff-tech-std-m5", "Find the gradient at x = 1.", "y=6\\ln x", "6"),
    choice("diff-tech-std-m6", "Choose the derivative.", "y=e^x+\\cos x", "D", ["$xe^{x-1}+\\sin x$", "$e^x+\\sin x$", "$e^x-\\cos x$", "$e^x-\\sin x$"], "The derivative is e^x - sin x."),
    choice("diff-tech-std-m7", "Which derivative rule is needed for ln x?", "\\text{Select A, B, C, or D.}", "A", ["$\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$", "$\\frac{d}{dx}(\\ln x)=\\frac{1}{\\ln x}$", "$\\frac{d}{dx}(\\ln x)=e^x$", "$\\frac{d}{dx}(\\ln x)=x$"], "This checks the standard logarithmic derivative."),
    numeric("diff-tech-std-m8", "Find f'(0).", "f(x)=5\\cos x-3\\sin x", "-3"),
    choice("diff-tech-std-m9", "Choose the derivative of the full expression.", "y=3e^x-2\\cos x+\\tan x", "B", ["$3e^x-2\\sin x+\\sec^2 x$", "$3e^x+2\\sin x+\\sec^2 x$", "$3e^x+2\\cos x+\\tan x$", "$e^x+2\\sin x+\\sec^2 x$"], "The -2cos x term differentiates to +2sin x."),
    choice("diff-tech-std-m10", "Choose the value of f'(1).", "f(x)=e^x+\\ln x", "A", ["$e+1$", "$e$", "$1$", "$2e$"], "The derivative is e^x + 1/x, so f'(1) = e + 1."),
    choice("diff-tech-std-ax1", "Choose the derivative of $2^x$.", "y=2^x", "C", ["$x\\cdot 2^{x-1}$", "$2^x$", "$2^x\\ln 2$", "$\\frac{2^x}{\\ln 2}$"], "Use $\\frac{d}{dx}(a^x)=a^x\\ln a$ with $a=2$. The power rule does not apply when the variable is the exponent.", "Use the rule $\\frac{d}{dx}(a^x)=a^x\\ln a$."),
    choice("diff-tech-std-ax2", "Choose the derivative of $5^x$.", "y=5^x", "A", ["$5^x\\ln 5$", "$5x^4$", "$5^x$", "$\\ln 5$"], "Apply $\\frac{d}{dx}(a^x)=a^x\\ln a$ with $a=5$ to get $5^x\\ln 5$.", "Use the rule $\\frac{d}{dx}(a^x)=a^x\\ln a$."),
  ]
);

export const chainRuleLesson = lesson(
  "chain-rule",
  "The Chain Rule",
  "Differentiate composite functions using the chain rule, including powers, trigonometric, exponential and logarithmic composites.",
  "Use outer and inner functions to differentiate composite functions with the chain rule.",
  [
    "Identify inner and outer functions in a composite function.",
    "Apply the chain rule using the derivative of the outer function and the derivative of the inner function.",
    "Differentiate powers of linear expressions.",
    "Differentiate sin(ax + b), cos(ax + b), e^(ax + b) and ln(ax + b).",
    "Handle simple nonlinear inner functions such as x^2.",
    "Evaluate chain-rule derivatives at clean inputs.",
  ],
  {
    paragraphs: [
      "The chain rule is what you reach for when one function is buried inside another — a composite function. Something like $(3x-1)^5$ is built in two stages: first compute $3x-1$, then raise that result to the fifth power. The standard derivatives you know only handle a single bare function; the chain rule tells you how to differentiate the two-stage machine.",
      "Here is the intuition, and it is just rates multiplying. Imagine a gearbox: the inner function $u=g(x)$ turns at some rate as $x$ changes, and the outer function $y=f(u)$ turns at some rate as $u$ changes. If $u$ changes 3 times as fast as $x$, and $y$ changes 4 times as fast as $u$, then $y$ changes $4\\times 3=12$ times as fast as $x$. Rates along a chain multiply. In Leibniz notation this reads $\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}$ — and it looks like the $du$ simply cancels, which is exactly the picture to keep in mind.",
      "Writing the outer function as $f$ and the inner as $g$, that becomes $\\frac{d}{dx}f(g(x))=f'(g(x))\\cdot g'(x)$. In words: differentiate the outer function but leave the inner expression sitting untouched inside it, then multiply by the derivative of that inner expression. The phrase to repeat is 'derivative of the outside, times derivative of the inside.'",
      "Apply it to $(3x-1)^5$. The outer operation is 'fifth power', whose derivative brings the 5 down and drops the exponent by one: $5(3x-1)^4$ — note the inner $3x-1$ is copied across unchanged, not differentiated yet. The inner function is $3x-1$, whose derivative is $3$. Multiply: $5(3x-1)^4\\cdot 3=15(3x-1)^4$. That extra factor of 3 is the whole point of the rule.",
      "The same single idea drives every composite. For $\\sin(g(x))$ you get $\\cos(g(x))\\cdot g'(x)$; for $e^{g(x)}$ you get $e^{g(x)}\\cdot g'(x)$; and for $\\ln(g(x))$ the outer derivative $\\frac{1}{g(x)}$ times the inner $g'(x)$ gives the tidy form $\\frac{g'(x)}{g(x)}$. So $\\frac{d}{dx}\\ln(5x+2)=\\frac{5}{5x+2}$ — the inner derivative 5 lands on top.",
      "The classic chain-rule mistake is stopping after the outer step and forgetting the $\\times g'(x)$. Writing $\\frac{d}{dx}e^{2x}=e^{2x}$ is wrong; it is $2e^{2x}$, because the inner derivative is 2. A quick self-check: if the inside is just $x$, then $g'(x)=1$ and the extra factor is invisible — which is why your standard derivatives looked like they had no chain rule. The moment the inside is anything more than a plain $x$, that inner-derivative factor is doing real work and must appear.",
    ],
    latexBlocks: [
      "\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}\\quad\\text{(rates along the chain multiply)}",
      "\\frac{d}{dx}f(g(x))=f'(g(x))\\,g'(x)",
      "\\frac{d}{dx}(ax+b)^n=n(ax+b)^{n-1}\\cdot a",
      "\\frac{d}{dx}\\sin(g(x))=\\cos(g(x))\\,g'(x),\\qquad \\frac{d}{dx}e^{g(x)}=e^{g(x)}\\,g'(x)",
      "\\frac{d}{dx}\\ln(g(x))=\\frac{g'(x)}{g(x)}",
    ],
  },
  [
    {
      title: "Power of a linear expression",
      questionLatex: "y=(2x+3)^5",
      steps: [
        { explanation: "Identify the two stages: the inner function is 2x + 3, and the outer operation applied to it is 'fifth power'.", latex: "g(x)=2x+3,\\quad \\text{outer}=(\\;)^5" },
        { explanation: "Differentiate the outer power — bring the 5 down, drop the index by one — while copying the inner expression across untouched.", latex: "5(2x+3)^4" },
        { explanation: "Now multiply by the derivative of the inside; the derivative of 2x + 3 is 2.", latex: "5(2x+3)^4\\cdot 2" },
        { explanation: "Tidy the constants.", latex: "=10(2x+3)^4" },
      ],
      finalAnswerLatex: "10(2x+3)^4",
    },
    {
      title: "Trigonometric composite",
      questionLatex: "y=\\sin(3x-1)",
      steps: [
        { explanation: "The outer function is sin, which differentiates to cos; leave the inner 3x - 1 sitting inside.", latex: "\\cos(3x-1)" },
        { explanation: "Multiply by the derivative of the inside, where the derivative of 3x - 1 is 3.", latex: "\\cos(3x-1)\\cdot 3" },
        { explanation: "Write the constant in front.", latex: "=3\\cos(3x-1)" },
      ],
      finalAnswerLatex: "3\\cos(3x-1)",
    },
    {
      title: "Logarithmic composite",
      questionLatex: "y=\\ln(5x+2)",
      steps: [
        { explanation: "The outer function ln differentiates to 1/(inside), so the inner 5x + 2 becomes the denominator.", latex: "\\frac{1}{5x+2}" },
        { explanation: "Multiply by the derivative of the inside; the derivative of 5x + 2 is 5, which lands on top.", latex: "\\frac{1}{5x+2}\\cdot 5=\\frac{5}{5x+2}" },
      ],
      finalAnswerLatex: "\\frac{5}{5x+2}",
    },
  ],
  [
    choice("diff-tech-chain-g1", "Choose the derivative.", "y=(3x+1)^4", "C", ["$4(3x+1)^3$", "$12(3x+1)^4$", "$12(3x+1)^3$", "$(3x+1)^3$"], "Multiply the outer derivative by the inner derivative 3."),
    choice("diff-tech-chain-g2", "Choose the derivative.", "y=\\sin(2x)", "A", ["$2\\cos(2x)$", "$\\cos(2x)$", "$-2\\sin(2x)$", "$\\sin(2x)$"], "Differentiate sin to cos and multiply by 2."),
    choice("diff-tech-chain-g3", "Choose the derivative.", "y=e^{5x-1}", "B", ["$e^{5x-1}$", "$5e^{5x-1}$", "$(5x-1)e^{5x-2}$", "$\\frac{5}{5x-1}$"], "The derivative of the exponent is 5."),
    numeric("diff-tech-chain-g4", "Find the value of the derivative at x = 0.", "y=(x+2)^3", "12"),
  ],
  [
    choice("diff-tech-chain-i1", "Choose the derivative.", "y=\\cos(4x)", "D", ["$4\\sin(4x)$", "$-\\sin(4x)$", "$\\cos(4x)$", "$-4\\sin(4x)$"], "The derivative of cos is -sin, then multiply by 4."),
    choice("diff-tech-chain-i2", "Choose the derivative.", "y=\\ln(2x+7)", "A", ["$\\frac{2}{2x+7}$", "$\\frac{1}{2x+7}$", "$\\frac{2x+7}{2}$", "$2\\ln(2x+7)$"], "Use g'(x)/g(x)."),
    numeric("diff-tech-chain-i3", "Find the gradient at x = 1.", "y=(2x-1)^4", "8"),
    choice("diff-tech-chain-i4", "Choose the derivative.", "y=e^{x^2}", "C", ["$e^{x^2}$", "$2xe^x$", "$2xe^{x^2}$", "$x^2e^{x^2}$"], "The derivative of x^2 is 2x."),
    choice("diff-tech-chain-i5", "Which option identifies the inner function?", "y=\\sin(3x+2)", "B", ["$\\sin u$", "$3x+2$", "$\\cos(3x+2)$", "$3$"], "In sin(3x + 2), the inner function is 3x + 2."),
  ],
  [
    { mistake: "Forgetting the inner derivative.", fix: "After differentiating the outer function, multiply by the derivative of the inside." },
    { mistake: "Changing the inner expression while differentiating the outer function.", fix: "Leave the inner expression in place until the multiplication step." },
    { mistake: "Missing the negative sign when differentiating cos of an expression.", fix: "The derivative of cos(g(x)) is -sin(g(x))g'(x)." },
    { mistake: "Using the product rule for every expression with brackets.", fix: "A function inside another function needs the chain rule." },
  ],
  [
    choice("diff-tech-chain-m1", "Choose the derivative.", "y=(5x-2)^3", "B", ["$3(5x-2)^2$", "$15(5x-2)^2$", "$15(5x-2)^3$", "$5(5x-2)^2$"], "The outer derivative is $3(5x - 2)^2$ and the inner derivative is 5."),
    choice("diff-tech-chain-m2", "Choose the derivative.", "y=\\sin(6x+1)", "A", ["$6\\cos(6x+1)$", "$\\cos(6x+1)$", "$-6\\sin(6x+1)$", "$6\\sin(6x+1)$"], "Differentiate sin to cos and multiply by 6."),
    choice("diff-tech-chain-m3", "Choose the derivative.", "y=\\cos(2x-3)", "D", ["$2\\sin(2x-3)$", "$-\\sin(2x-3)$", "$\\cos(2x-3)$", "$-2\\sin(2x-3)$"], "Differentiate cos to -sin and multiply by 2."),
    choice("diff-tech-chain-m4", "Choose the derivative.", "y=e^{4x}", "C", ["$e^{4x}$", "$4e^x$", "$4e^{4x}$", "$\\frac{1}{4}e^{4x}$"], "The derivative of 4x is 4."),
    choice("diff-tech-chain-m5", "Choose the derivative.", "y=\\ln(7x-1)", "A", ["$\\frac{7}{7x-1}$", "$\\frac{1}{7x-1}$", "$7\\ln(7x-1)$", "$\\frac{7x-1}{7}$"], "For ln(g), use g'/g."),
    numeric("diff-tech-chain-m6", "Find the gradient at x = 0.", "y=(3x+2)^2", "12", [], "Use the chain rule: $y'=2(3x+2)\\cdot 3=6(3x+2)$. At $x=0$, $y'=6(2)=12$."),
    choice("diff-tech-chain-m7", "A student differentiates $e^{2x + 5}$ as $e^{2x + 5}$. Which option identifies the error?", "\\text{Select A, B, C, or D.}", "B", ["The derivative of e is zero", "The inner derivative 2 is missing", "The sign should be negative", "The quotient rule is needed"], "The chain rule requires multiplication by the derivative of 2x + 5."),
    numeric("diff-tech-chain-m8", "Find f'(1).", "f(x)=\\ln(3x+1)", "3/4", ["0.75"], "Differentiate the log by dividing the inside derivative by the inside: f'(x)=3/(3x+1). At x=1, f'(1)=3/4."),
    choice("diff-tech-chain-m9", "Choose the derivative.", "y=\\sin(x^2+1)", "C", ["$\\cos(x^2+1)$", "$2x\\sin(x^2+1)$", "$2x\\cos(x^2+1)$", "$-2x\\sin(x^2+1)$"], "The inner derivative is 2x and the derivative of sin is cos."),
    choice("diff-tech-chain-m10", "Choose the derivative of the full expression.", "y=e^{2x}-\\ln(3x+4)", "D", ["$e^{2x}-\\frac{1}{3x+4}$", "$2e^x-\\frac{3}{3x+4}$", "$2e^{2x}-\\ln(3x+4)$", "$2e^{2x}-\\frac{3}{3x+4}$"], "Use the chain rule on both terms."),
  ]
);

export const productQuotientRulesLesson = lesson(
  "product-quotient-rules",
  "Product and Quotient Rules",
  "Use product and quotient rules with standard derivatives, while avoiding unnecessary symbolic simplification.",
  "Select and apply the product rule or quotient rule for expressions made by multiplying or dividing functions.",
  [
    "Recognise when a product rule is required.",
    "Recognise when a quotient rule is required.",
    "Apply the product rule as f'g + fg'.",
    "Apply the quotient rule with the correct numerator order.",
    "Combine product or quotient rules with standard derivatives.",
    "Evaluate derivative values in clean product or quotient cases.",
  ],
  {
    paragraphs: [
      "When two functions that both depend on $x$ are multiplied together — like $x\\sin x$ or $x^2 e^x$ — you cannot just differentiate each piece and multiply the results. The tempting wrong move is to write $\\frac{d}{dx}(fg)=f'g'$. To see it fails, test it on $x\\cdot x=x^2$: the true derivative is $2x$, but $f'g'=1\\cdot 1=1$. The product rule exists precisely to fix this.",
      "The intuition is a rectangle. Think of $f$ and $g$ as the side lengths of a rectangle whose area is the product $fg$. As $x$ increases a little, both sides grow: $f$ grows by a sliver of width $f'$ and $g$ grows by a sliver of width $g'$. The new area added is one strip along the $g$ side (rate $f'g$) plus one strip along the $f$ side (rate $fg'$) — the tiny corner piece is negligible. Adding the two strips gives the rule: $\\frac{d}{dx}(fg)=f'g+fg'$. Two terms, because there are two sides growing.",
      "So for $y=x\\sin x$, take $f=x$ (so $f'=1$) and $g=\\sin x$ (so $g'=\\cos x$), and assemble $f'g+fg'=1\\cdot\\sin x+x\\cos x=\\sin x+x\\cos x$. The structure 'derivative of the first times the second, plus the first times derivative of the second' is worth saying out loud every time.",
      "Division needs the quotient rule. Writing $\\frac{f}{g}=f\\cdot g^{-1}$ and applying the product and chain rules to it produces, after putting everything over a common denominator, $\\frac{d}{dx}\\!\\left(\\frac{f}{g}\\right)=\\frac{f'g-fg'}{g^2}$. The order in the numerator matters: it is $f'g$ first, then minus $fg'$. Swap them and every sign flips, giving the negative of the right answer — a frequent and costly slip.",
      "A memory hook for the numerator: 'derivative of top times bottom, minus top times derivative of bottom, all over bottom squared.' The 'top first' ordering is what keeps the sign correct. The $g^2$ in the denominator comes directly from differentiating $g^{-1}$, so it is never optional.",
      "One exam-craft point: a correct unsimplified derivative usually earns full marks, and most algebra errors happen during simplification, not differentiation. If a question just asks you to differentiate, it is often safest to apply the rule cleanly and stop — for example leaving $\\frac{xe^x-e^x}{x^2}$ rather than risking a slip while factoring it to $\\frac{e^x(x-1)}{x^2}$.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(fg)=f'g+fg'\\quad(\\text{not }f'g')",
      "\\frac{d}{dx}\\left(\\frac{f}{g}\\right)=\\frac{f'g-fg'}{g^2}\\quad(\\text{top first})",
      "\\text{product: two functions multiplied}\\quad \\text{quotient: one divided by another}",
    ],
  },
  [
    {
      title: "Use the product rule",
      questionLatex: "y=x\\sin x",
      steps: [
        { explanation: "Both factors depend on x, so this is a genuine product; name the parts and differentiate each.", latex: "f=x,\\;f'=1,\\quad g=\\sin x,\\;g'=\\cos x" },
        { explanation: "Assemble f'g + fg': derivative of the first times the second, plus the first times derivative of the second.", latex: "y'=1\\cdot\\sin x+x\\cos x" },
        { explanation: "Read off the two terms.", latex: "=\\sin x+x\\cos x" },
      ],
      finalAnswerLatex: "\\sin x+x\\cos x",
    },
    {
      title: "Use the quotient rule",
      questionLatex: "y=\\frac{e^x}{x}",
      steps: [
        { explanation: "Label the top as f and the bottom as g, then differentiate each.", latex: "f=e^x,\\;f'=e^x,\\quad g=x,\\;g'=1" },
        { explanation: "Apply the quotient rule, numerator f'g minus fg' over g squared, keeping f'g first so the sign is correct.", latex: "y'=\\frac{e^x\\cdot x-e^x\\cdot 1}{x^2}" },
        { explanation: "Leaving it in this correct unsimplified form is safe; simplifying further risks a sign slip.", latex: "=\\frac{xe^x-e^x}{x^2}" },
      ],
      finalAnswerLatex: "\\frac{xe^x-e^x}{x^2}",
    },
    {
      title: "Evaluate a product-rule derivative",
      questionLatex: "y=x e^x.\\quad \\text{Find }y'\\text{ at }x=0.",
      steps: [
        { explanation: "With f = x and g = e^x, the product rule f'g + fg' gives both terms.", latex: "y'=1\\cdot e^x+x e^x=e^x+xe^x" },
        { explanation: "Differentiate first, then substitute x = 0, using e^0 = 1 so the second term vanishes.", latex: "y'(0)=e^0+0\\cdot e^0=1+0" },
      ],
      finalAnswerLatex: "1",
    },
  ],
  [
    choice("diff-tech-pq-g1", "Which rule is most direct?", "y=x\\sin x", "A", ["Product rule", "Quotient rule", "Limiting sum", "Implicit differentiation"], "The expression is a product of x and sin x."),
    choice("diff-tech-pq-g2", "Choose the derivative.", "y=x e^x", "B", ["$e^x$", "$e^x+xe^x$", "$xe^x$", "$x+e^x$"], "Use f'g + fg' with f = x and g = e^x."),
    choice("diff-tech-pq-g3", "Which rule is most direct?", "y=\\frac{\\ln x}{x}", "C", ["Chain rule only", "Product rule only", "Quotient rule", "Arithmetic series"], "The expression is a quotient of two variable expressions."),
    numeric("diff-tech-pq-g4", "Find the derivative value at x = 0.", "y=xe^x", "1"),
  ],
  [
    choice("diff-tech-pq-i1", "Choose the product-rule structure for y = f(x)g(x).", "y=f(x)g(x)", "D", ["$f'g'$", "$fg$", "$f'g-fg'$", "$f'g+fg'$"], "The product rule is f'g + fg'."),
    choice("diff-tech-pq-i2", "Choose the derivative.", "y=x\\cos x", "A", ["$\\cos x-x\\sin x$", "$-x\\sin x$", "$\\sin x+x\\cos x$", "$\\cos x+x\\sin x$"], "Use product rule and d/dx cos x = -sin x."),
    choice("diff-tech-pq-i3", "Choose the quotient-rule numerator for y = f/g.", "y=\\frac{f}{g}", "B", ["$fg'-f'g$", "$f'g-fg'$", "$f'g+fg'$", "$fg$"], "The quotient rule numerator is f'g - fg'."),
    numeric("diff-tech-pq-i4", "Find the derivative value at x = 1.", "y=x\\ln x", "1"),
    choice("diff-tech-pq-i5", "Choose the derivative.", "y=\\frac{x}{e^x}", "C", ["$\\frac{e^x}{e^{2x}}$", "$\\frac{x e^x-e^x}{e^{2x}}$", "$\\frac{e^x-xe^x}{e^{2x}}$", "$\\frac{1}{e^x}$"], "Use f = x, g = e^x, so f'g - fg' = e^x - xe^x."),
  ],
  [
    { mistake: "Writing the product rule as f'g'.", fix: "Use f'g + fg', which has two terms." },
    { mistake: "Reversing the quotient-rule numerator.", fix: "For f/g, use f'g - fg', all over g squared." },
    { mistake: "Using the quotient rule when a simpler product rewrite is obvious but then losing signs.", fix: "Choose a rule deliberately and keep the structure clear." },
    { mistake: "Over-simplifying and making algebra errors.", fix: "A correct unsimplified derivative is often safer than a flawed simplification." },
  ],
  [
    choice("diff-tech-pq-m1", "Which rule is most direct?", "y=(x^2+1)e^x", "A", ["Product rule", "Quotient rule", "Limiting sum", "First derivative test"], "The expression is a product of two variable functions."),
    choice("diff-tech-pq-m2", "Choose the derivative.", "y=x\\sin x", "C", ["$x\\cos x$", "$\\sin x\\cos x$", "$\\sin x+x\\cos x$", "$\\cos x-x\\sin x$"], "Use f'g + fg'."),
    choice("diff-tech-pq-m3", "Choose the derivative.", "y=x^2e^x", "D", ["$2xe^x$", "$x^2e^x$", "$2x^2e^x$", "$2xe^x+x^2e^x$"], "Use product rule with f = x^2 and g = e^x."),
    choice("diff-tech-pq-m4", "Which rule is most direct?", "y=\\frac{\\sin x}{x}", "B", ["Product rule", "Quotient rule", "Chain rule only", "Standard derivative only"], "The expression divides sin x by x."),
    choice("diff-tech-pq-m5", "Choose the derivative.", "y=\\frac{\\ln x}{x}", "A", ["$\\frac{1-\\ln x}{x^2}$", "$\\frac{\\ln x-1}{x^2}$", "$\\frac{1}{x^2}$", "$\\frac{1+\\ln x}{x^2}$"], "Using f = ln x and g = x gives ((1/x)x - ln x)/x^2."),
    numeric("diff-tech-pq-m6", "Find the derivative value at x = 0.", "y=x\\cos x", "1", [], "Use the product rule: $y'=1\\cdot\\cos x+x(-\\sin x)=\\cos x-x\\sin x$. At $x=0$, this gives 1."),
    choice("diff-tech-pq-m7", "Choose the derivative value at x = 1.", "y=xe^x", "D", ["$e$", "$1$", "$e+1$", "$2e$"], "The derivative is e^x + xe^x, so at x = 1 it is 2e."),
    choice("diff-tech-pq-m8", "A student differentiates x sin x as cos x. Which option identifies the error?", "\\text{Select A, B, C, or D.}", "D", ["The quotient rule sign is reversed", "The derivative of sin x is -cos x", "The expression is constant", "The product rule was not applied"], "Both x and sin x vary, so product rule is needed."),
    choice("diff-tech-pq-m9", "Choose the correct quotient-rule setup.", "y=\\frac{e^x}{x^2+1}", "B", ["$\\frac{e^x(x^2+1)+e^x(2x)}{(x^2+1)^2}$", "$\\frac{e^x(x^2+1)-e^x(2x)}{(x^2+1)^2}$", "$\\frac{e^x-2x}{x^2+1}$", "$\\frac{e^x(2x)-e^x(x^2+1)}{(x^2+1)^2}$"], "For f/g, use f'g - fg'."),
    choice("diff-tech-pq-m10", "Choose the derivative of the full expression.", "y=x\\ln x+\\frac{\\sin x}{x}", "C", ["$\\ln x+\\frac{x\\cos x-\\sin x}{x^2}$", "$1+\\ln x+\\frac{\\cos x}{1}$", "$\\ln x+1+\\frac{x\\cos x-\\sin x}{x^2}$", "$\\ln x+1+\\frac{\\sin x-x\\cos x}{x^2}$"], "Use product rule on x ln x and quotient rule on sin x over x."),
  ]
);

export const applicationsExtendedDifferentiationLesson = lesson(
  "applications-extended-differentiation",
  "Applications with Extended Differentiation",
  "Apply extended differentiation techniques to tangents, normals, rates of change and stationary point questions.",
  "Use chain, product and quotient rule derivatives in tangent, normal, rate and stationary point contexts.",
  [
    "Find gradients of tangents using extended derivatives.",
    "Use perpendicular gradients for normals.",
    "Evaluate non-polynomial rates of change in context.",
    "Identify stationary points by solving derivative equals zero in clean cases.",
    "Interpret positive, negative and zero derivative values in context.",
    "Choose a suitable derivative technique for an applied problem.",
  ],
  {
    paragraphs: [
      "Every application in this lesson rests on a single fact you already own: the derivative of a function is its gradient function, $f'(a)$ is the slope of the curve at $x=a$. What changes now is only the toolkit — the functions are composite, products or quotients, so finding $f'$ takes the chain, product or quotient rule. Once you have $f'(a)$, the application step is the same as it always was.",
      "A tangent is the straight line that just grazes the curve at a point, matching its direction there. 'Matching direction' means matching gradient, so the tangent's gradient at $x=a$ is exactly $f'(a)$. That is the entire connection: to find a tangent gradient, differentiate and substitute. For $y=(2x+1)^3$ the chain rule gives $y'=6(2x+1)^2$, and at $x=1$ that is $6\\cdot 9=54$ — the slope of the curve, and of its tangent, right there.",
      "A normal is the line perpendicular to the tangent at the same point. Perpendicular lines have gradients that multiply to $-1$, so the normal gradient is the negative reciprocal of the tangent gradient: $m_N=-\\frac{1}{m_T}$. If a tangent gradient is $4$, the normal gradient is $-\\frac14$. This only works when $m_T\\neq 0$; a horizontal tangent ($m_T=0$) has a vertical normal, which has no finite gradient.",
      "A rate of change is the same derivative wearing a context. $\\frac{ds}{dt}$ is how fast displacement changes with time — a velocity; $\\frac{dV}{dt}$ is how fast a volume fills. The number comes straight from the derivative, but a complete answer carries the units and sign: a positive rate means the quantity is increasing, a negative rate means it is decreasing. Always interpret, don't just state the figure.",
      "A stationary point is where the curve momentarily stops rising or falling — a horizontal tangent — which means zero gradient. So you solve $f'(x)=0$, not $f(x)=0$ (that would find where the curve crosses the axis, a completely different thing). Setting the gradient to zero is the defining condition.",
      "Watch for a recurring trap with exponential models: when $f'(x)=e^x(x+1)$, a product equals zero only if one of its factors is zero, but $e^x$ is positive for every $x$ and can never be zero. So the stationary point comes entirely from $x+1=0$, giving $x=-1$. Discarding the $e^x$ factor is correct precisely because it never vanishes — recognising that is what the exam is testing.",
    ],
    latexBlocks: [
      "m_{\\text{tangent}}=f'(a)\\quad(\\text{gradient of curve = derivative})",
      "m_{\\text{normal}}=-\\frac{1}{m_{\\text{tangent}}}\\quad(\\text{perpendicular: gradients multiply to }-1)",
      "\\text{stationary point: solve }f'(x)=0,\\ \\text{not }f(x)=0",
      "\\text{rate of change}=\\frac{dy}{dx}\\text{ or }\\frac{ds}{dt},\\text{ stated with sign and units}",
    ],
  },
  [
    {
      title: "Tangent gradient from a chain-rule derivative",
      questionLatex: "y=(2x+1)^3.\\quad \\text{Find the tangent gradient at }x=1.",
      steps: [
        { explanation: "The tangent gradient is the derivative, so differentiate; this is a composite, so use the chain rule: the outer cube gives three times the squared bracket, times the inner derivative 2.", latex: "y'=3(2x+1)^2\\cdot 2=6(2x+1)^2" },
        { explanation: "Substitute x = 1 into the gradient function, since 2(1)+1 = 3.", latex: "y'(1)=6(3)^2=54" },
      ],
      finalAnswerLatex: "54",
    },
    {
      title: "Normal gradient",
      questionLatex: "f'(2)=4.\\quad \\text{Find the normal gradient at }x=2.",
      steps: [
        { explanation: "The derivative value at the point is the tangent gradient.", latex: "m_T=f'(2)=4" },
        { explanation: "The normal is perpendicular to the tangent, so its gradient is the negative reciprocal: flip and change sign.", latex: "m_N=-\\frac{1}{m_T}=-\\frac{1}{4}" },
      ],
      finalAnswerLatex: "-\\frac{1}{4}",
    },
    {
      title: "Stationary point from an exponential model",
      questionLatex: "f'(x)=e^x(x+1).\\quad \\text{Find the stationary x-value.}",
      steps: [
        { explanation: "Stationary points occur where f'(x) = 0.", latex: "e^x(x+1)=0" },
        { explanation: "The exponential factor is never zero.", latex: "e^x\\ne0" },
        { explanation: "Set the remaining factor to zero.", latex: "x+1=0" },
      ],
      finalAnswerLatex: "x=-1",
    },
  ],
  [
    numeric("diff-tech-app-g1", "Find the tangent gradient at x = 1.", "y=(x+2)^2", "6"),
    numeric("diff-tech-app-g2", "The tangent gradient at a point is 5. Find the normal gradient.", "m_T=5", "-1/5", ["-0.2"]),
    choice("diff-tech-app-g3", "Which derivative technique is most direct before finding the tangent gradient?", "y=x e^x", "B", ["Chain rule", "Product rule", "Quotient rule", "Sigma notation"], "The function is a product of x and e^x."),
    numeric("diff-tech-app-g4", "Find the stationary x-value.", "f'(x)=2x-6", "3"),
  ],
  [
    numeric("diff-tech-app-i1", "Find the tangent gradient at x = 0.", "y=e^{2x}", "2"),
    choice("diff-tech-app-i2", "A curve has tangent gradient -3 at a point. Which normal gradient is correct?", "\\text{Select A, B, C, or D.}", "A", ["$\\frac{1}{3}$", "$-\\frac{1}{3}$", "$3$", "$-3$"], "The normal gradient is the negative reciprocal."),
    numeric("diff-tech-app-i3", "Find f'(0) for the rate model.", "f(t)=\\sin(2t)+t", "3"),
    choice("diff-tech-app-i4", "Which equation should be solved to find stationary points?", "\\text{Select A, B, C, or D.}", "B", ["$f(x)=0$", "$f'(x)=0$", "$f''(x)=0$ only", "$x=0$"], "Stationary points are found from f'(x) = 0."),
    choice("diff-tech-app-i5", "For y = ln(2x + 1), which value is the tangent gradient at x = 0?", "\\text{Select A, B, C, or D.}", "C", ["1", "1/2", "2", "0"], "The derivative is 2/(2x + 1), so the gradient at x = 0 is 2."),
  ],
  [
    { mistake: "Using the function value as the tangent gradient.", fix: "The tangent gradient is the derivative value, not the y-value." },
    { mistake: "Forgetting to use the negative reciprocal for a normal.", fix: "Normals are perpendicular to tangents." },
    { mistake: "Solving f(x) = 0 instead of f'(x) = 0 for stationary points.", fix: "Stationary points are about zero gradient." },
    { mistake: "Giving a rate without units or context.", fix: "Interpret the derivative value according to the quantities in the question." },
  ],
  [
    numeric("diff-tech-app-m1", "Find the tangent gradient at x = 1.", "y=(3x-1)^2", "12", [], "The tangent gradient is the derivative at that x-value. By the chain rule, y'=2(3x-1)\\cdot3=6(3x-1), so at x=1 the gradient is 12."),
    numeric("diff-tech-app-m2", "Find the normal gradient when the tangent gradient is 4.", "m_T=4", "-1/4", ["-0.25"], "A normal is perpendicular to the tangent, so its gradient is the negative reciprocal. For m_T=4, m_N=-1/4."),
    choice("diff-tech-app-m3", "Which derivative technique is most direct for the model before evaluating a rate?", "s(t)=t e^t", "A", ["Product rule", "Quotient rule", "Arithmetic series", "Limiting sum"], "The model is a product of t and e^t."),
    numeric("diff-tech-app-m4", "Find the rate at t = 0.", "s(t)=e^{3t}", "3", [], "Rate means derivative with respect to time. Since $s'(t)=3e^{3t}$, at $t=0$ the rate is $3e^0=3$."),
    numeric("diff-tech-app-m5", "Find the stationary x-value.", "f'(x)=3x+6", "-2", [], "A stationary point occurs when the derivative is zero. Solve 3x+6=0 to get x=-2."),
    choice("diff-tech-app-m6", "A tangent has gradient 0. Which statement is correct?", "\\text{Select A, B, C, or D.}", "B", ["The normal gradient is also 0", "The tangent is horizontal", "The derivative does not exist", "The curve must cross the x-axis"], "A zero derivative gives a horizontal tangent."),
    choice("diff-tech-app-m7", "Choose the tangent equation at x = 0.", "y=e^x", "C", ["$y=x$", "$y=2x+1$", "$y=x+1$", "$y=-x+1$"], "At x = 0, the point is (0, 1) and the gradient is 1."),
    numeric("diff-tech-app-m8", "Find f'(1).", "f(x)=x\\ln x", "1", [], "Use the product rule: $f'(x)=1\\cdot\\ln x+x\\cdot(1/x)=\\ln x+1$. At $x=1$, $f'(1)=0+1=1$."),
    choice("diff-tech-app-m9", "A curve has y = ln(3x + 1). Which tangent gradient at x = 1 is correct?", "\\text{Select A, B, C, or D.}", "D", ["3", "1", "1/3", "3/4"], "The derivative is 3/(3x + 1), so at x = 1 it is 3/4."),
    choice("diff-tech-app-m10", "For the function shown, which statement identifies the stationary x-value?", "f(x)=e^x(x-3)", "A", ["$x=2$, because $f'(x)=e^x(x-2)$ and $e^x$ is never zero", "$x=0$, because exponential graphs cross the axis", "$x=3$, because the bracket in the original function is zero", "$x=-2$, because the sign changes"], "Using the product rule gives f'(x)=e^x(x-2). Since e^x is never zero, the stationary x-value is x = 2."),
  ]
);

export const differentiationTechniquesExamPracticeLesson = lesson(
  "differentiation-techniques-exam-practice",
  "Differentiation Techniques Exam Practice",
  "Practise mixed HSC-style differentiation questions involving standard derivatives, chain rule, product rule, quotient rule and applications.",
  "Select and apply extended differentiation techniques in mixed HSC-style questions.",
  [
    "Select a suitable derivative rule for a given expression.",
    "Differentiate standard, composite, product and quotient expressions.",
    "Evaluate derivative values in clean cases.",
    "Use derivative values in tangent, normal and rate contexts.",
    "Identify stationary point conditions.",
    "Recognise common rule-selection and sign errors.",
  ],
  {
    paragraphs: [
      "Mixed exam questions don't tell you which rule to use — diagnosing the structure of the expression is the real skill, and it must happen before any differentiation. The whole topic comes down to one decision tree, and this lesson is about running it fast and correctly under pressure.",
      "First ask: is this a single standard function? If so, just quote the derivative — $\\sin x\\to\\cos x$, $\\cos x\\to-\\sin x$ (mind that minus), $\\tan x\\to\\sec^2 x$, $e^x\\to e^x$, $\\ln x\\to\\frac{1}{x}$. These are the atoms everything else is built from.",
      "If it isn't a bare standard function, read the outermost structure. One function wrapped inside another, like $\\ln(4x+1)$ or $e^{2x}$, is a composite — use the chain rule and remember the inner-derivative factor. Two $x$-dependent functions multiplied, like $x\\sin x$, is a product — use $f'g+fg'$. One function divided by another, like $\\frac{e^x}{x+1}$, is a quotient — use $\\frac{f'g-fg'}{g^2}$, top first.",
      "The rules also nest. In $x\\sin(2x)$ the outer structure is a product (so product rule), but differentiating the factor $\\sin(2x)$ itself needs the chain rule for the inner $2x$. Spot the outermost operation first to pick the main rule, then apply whatever each piece needs inside it.",
      "Most applied parts finish by asking for a single number — a tangent gradient, a rate, or a stationary $x$-value. The pattern is always the same: differentiate to get $f'$, then either substitute a point (for a gradient or rate) or solve $f'(x)=0$ (for a stationary point). The hard work is the derivative; the final number is one substitution away.",
      "A practical note on this exam format: typed answers here are numeric, while symbolic derivative tasks are multiple choice. That removes algebraic-marking ambiguity — for a 'choose the derivative' item, differentiate carefully on paper, then match your result to the option that agrees in every coefficient and sign, since the distractors are built from exactly the slips this lesson warns about.",
    ],
    latexBlocks: [
      "\\text{standard: }\\frac{d}{dx}(\\sin x)=\\cos x,\\quad \\frac{d}{dx}(\\cos x)=-\\sin x,\\quad \\frac{d}{dx}(e^x)=e^x,\\quad \\frac{d}{dx}(\\ln x)=\\frac{1}{x}",
      "\\text{composite}\\Rightarrow\\text{chain: }\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)",
      "\\text{product}\\Rightarrow \\frac{d}{dx}(fg)=f'g+fg'",
      "\\text{quotient}\\Rightarrow \\frac{d}{dx}\\left(\\frac{f}{g}\\right)=\\frac{f'g-fg'}{g^2}",
      "\\text{application: differentiate, then substitute a point or solve }f'(x)=0",
    ],
  },
  [
    {
      title: "Choose a rule in a mixed expression",
      questionLatex: "y=x\\sin(2x)",
      steps: [
        { explanation: "Read the outermost structure first: x and sin(2x) are two x-dependent factors multiplied, so the main rule is the product rule.", latex: "f=x,\\quad g=\\sin(2x)" },
        { explanation: "Differentiating the factor g = sin(2x) is itself a composite, so the chain rule is needed inside the product rule to get g' = 2cos(2x).", latex: "g'=\\cos(2x)\\cdot 2=2\\cos(2x)" },
        { explanation: "Assemble f'g + fg' with those pieces.", latex: "y'=\\sin(2x)+2x\\cos(2x)" },
      ],
      finalAnswerLatex: "y'=\\sin(2x)+2x\\cos(2x)\\quad(\\text{product rule with chain rule inside})",
    },
    {
      title: "Evaluate a mixed derivative",
      questionLatex: "f(x)=e^{2x}+x\\ln x.\\quad \\text{Find }f'(0)\\text{ for the first term only and }f'(1)\\text{ for the product term.}",
      steps: [
        { explanation: "The derivative of $e^{2x}$ is $2e^{2x}$, so its value at 0 is 2.", latex: "2e^0=2" },
        { explanation: "The derivative of x ln x is ln x + 1, so its value at 1 is 1.", latex: "\\ln 1+1=1" },
      ],
      finalAnswerLatex: "\\text{Values }2\\text{ and }1",
    },
    {
      title: "Stationary point condition",
      questionLatex: "f'(x)=e^x(x+3)",
      steps: [
        { explanation: "Set the derivative equal to zero.", latex: "e^x(x+3)=0" },
        { explanation: "Since e^x is never zero, solve x + 3 = 0.", latex: "x=-3" },
      ],
      finalAnswerLatex: "x=-3",
    },
  ],
  [
    choice("diff-tech-exam-g1", "Which rule is most direct?", "y=\\ln(4x+1)", "B", ["Product rule", "Chain rule", "Quotient rule", "Second derivative test"], "The logarithm contains an inner function."),
    choice("diff-tech-exam-g2", "Choose the derivative.", "y=x\\sin x", "A", ["$\\sin x+x\\cos x$", "$x\\cos x$", "$\\cos x-x\\sin x$", "$\\sin x\\cos x$"], "Use product rule."),
    numeric("diff-tech-exam-g3", "Find the tangent gradient at x = 0.", "y=e^{2x}", "2"),
    choice("diff-tech-exam-g4", "Which rule is most direct?", "y=\\frac{e^x}{x+1}", "C", ["Standard derivative only", "Product rule", "Quotient rule", "Arithmetic series"], "The expression is a quotient."),
  ],
  [
    choice("diff-tech-exam-i1", "Choose the derivative.", "y=\\cos(5x)", "D", ["$5\\sin(5x)$", "$-\\sin(5x)$", "$\\cos(5x)$", "$-5\\sin(5x)$"], "Use chain rule and the derivative of cos."),
    numeric("diff-tech-exam-i2", "Find f'(1).", "f(x)=\\ln(2x+1)", "2/3"),
    choice("diff-tech-exam-i3", "Which product-rule structure is correct?", "y=f(x)g(x)", "A", ["$f'g+fg'$", "$f'g'$", "$f'g-fg'$", "$\\frac{f'g-fg'}{g^2}$"], "Product rule has two terms."),
    numeric("diff-tech-exam-i4", "Find the stationary x-value.", "f'(x)=4x-12", "3"),
    choice("diff-tech-exam-i5", "A tangent gradient is -2. Which normal gradient is correct?", "\\text{Select A, B, C, or D.}", "B", ["$-\\frac{1}{2}$", "$\\frac{1}{2}$", "$2$", "$-2$"], "The normal gradient is the negative reciprocal."),
  ],
  [
    { mistake: "Applying a standard derivative rule when the function is composite.", fix: "Check for an inner function and use the chain rule when needed." },
    { mistake: "Using product rule for a quotient.", fix: "If one variable expression is divided by another, use the quotient rule or rewrite carefully." },
    { mistake: "Missing signs in trigonometric derivatives.", fix: "Memorise that cos differentiates to negative sin." },
    { mistake: "Typing unsimplified symbolic derivatives into numeric-answer questions.", fix: "For this renderer, symbolic derivative tasks are multiple choice and typed answers are numeric." },
  ],
  [
    choice("diff-tech-exam-m1", "Choose the derivative.", "y=\\sin(3x)", "A", ["$3\\cos(3x)$", "$\\cos(3x)$", "$-3\\sin(3x)$", "$3\\sin(3x)$"], "Use chain rule."),
    choice("diff-tech-exam-m2", "Choose the derivative.", "y=\\ln(5x)", "C", ["$\\frac{1}{5x}$", "$5\\ln x$", "$\\frac{1}{x}$", "$\\frac{5}{x}$"], "The derivative is 5/(5x), which simplifies to 1/x."),
    choice("diff-tech-exam-m3", "Choose the derivative.", "y=x e^x", "B", ["$xe^x$", "$e^x+xe^x$", "$x+e^x$", "$e^x-xe^x$"], "Use product rule."),
    choice("diff-tech-exam-m4", "Choose the quotient-rule setup.", "y=\\frac{\\sin x}{x+1}", "D", ["$\\frac{\\cos x(x+1)+\\sin x}{(x+1)^2}$", "$\\frac{\\sin x(x+1)-\\cos x}{(x+1)^2}$", "$\\frac{\\cos x-\\sin x}{x+1}$", "$\\frac{\\cos x(x+1)-\\sin x}{(x+1)^2}$"], "Use f'g - fg' over g squared."),
    numeric("diff-tech-exam-m5", "Find f'(0).", "f(x)=e^{4x}+\\sin x", "5"),
    numeric("diff-tech-exam-m6", "Find the tangent gradient at x = 1.", "y=(x+1)^3", "12"),
    choice("diff-tech-exam-m7", "Which statement best identifies the error in differentiating x cos x as -x sin x?", "\\text{Select A, B, C, or D.}", "B", ["The quotient-rule denominator is missing", "The derivative of the first factor is missing", "The inner derivative is missing", "The derivative of cos x should be sec squared x"], "Product rule also includes 1 times cos x."),
    choice("diff-tech-exam-m8", "Which function has derivative value 2 at x = 0?", "\\text{Select A, B, C, or D.}", "A", ["$e^{2x}$", "$\\ln(x+1)$", "$\\cos(2x)$", "$x\\sin x$"], "The derivative of $e^{2x}$ is $2e^{2x}$, which is 2 at $x = 0$."),
    choice("diff-tech-exam-m9", "For the function shown, which stationary x-value is correct?", "f(x)=e^x(x-5)", "C", ["0", "-4", "4", "5"], "Using the product rule gives f'(x)=e^x(x-4). Since e^x is never zero, solve x - 4 = 0."),
    choice("diff-tech-exam-m10", "A curve is y = x ln x. Which tangent gradient at x = 1 is correct?", "\\text{Select A, B, C, or D.}", "B", ["0", "1", "e", "2"], "The product-rule derivative is ln x + 1, so at x = 1 it is 1."),
  ]
);

export const reciprocalTrigDerivativesLesson: ExplicitLesson = {
  id: "reciprocal-trig-derivatives",
  slug: "reciprocal-trig-derivatives",
  moduleSlug: "ma-c2-differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Derivatives of the Reciprocal Trigonometric Functions",
  description:
    "Derive and use the derivatives of sec x, cosec x and cot x from the standard trigonometric derivatives.",
  syllabusArea: "Calculus",
  focus: "Differentiation techniques",
  status: "active",
  video: {
    title: "Derivatives of the Reciprocal Trigonometric Functions",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn the derivatives of sec x, cosec x and cot x and where they come from.",
  successCriteria: [
    "Recall $\\frac{d}{dx}(\\sec x)=\\sec x\\tan x$.",
    "Recall $\\frac{d}{dx}(\\operatorname{cosec} x)=-\\operatorname{cosec} x\\cot x$.",
    "Recall $\\frac{d}{dx}(\\cot x)=-\\operatorname{cosec}^2 x$.",
    "Derive each result from $\\sin x$, $\\cos x$ using the quotient or chain rule.",
    "Differentiate multiples and sums, and evaluate at standard angles.",
  ],
  teaching: {
    paragraphs: [
      "The reciprocal trigonometric functions are $\\sec x=\\dfrac{1}{\\cos x}$, $\\operatorname{cosec} x=\\dfrac{1}{\\sin x}$ and $\\cot x=\\dfrac{\\cos x}{\\sin x}$. Their derivatives are not new facts to memorise blindly — each one falls straight out of the standard derivatives of $\\sin x$ and $\\cos x$ together with the chain or quotient rule. Seeing the derivation makes the results stick and lets you reconstruct them under exam pressure.",
      "Take $\\sec x=(\\cos x)^{-1}$ and apply the chain rule: $\\frac{d}{dx}(\\cos x)^{-1}=-(\\cos x)^{-2}\\cdot(-\\sin x)=\\dfrac{\\sin x}{\\cos^2 x}$. Splitting that as $\\dfrac{1}{\\cos x}\\cdot\\dfrac{\\sin x}{\\cos x}$ gives $\\sec x\\tan x$. So $\\frac{d}{dx}(\\sec x)=\\sec x\\tan x$.",
      "The same method on $\\operatorname{cosec} x=(\\sin x)^{-1}$ gives $-(\\sin x)^{-2}\\cdot\\cos x=-\\dfrac{\\cos x}{\\sin^2 x}=-\\operatorname{cosec} x\\cot x$. And for $\\cot x=\\dfrac{\\cos x}{\\sin x}$, the quotient rule gives $\\dfrac{-\\sin x\\cdot\\sin x-\\cos x\\cdot\\cos x}{\\sin^2 x}=\\dfrac{-(\\sin^2 x+\\cos^2 x)}{\\sin^2 x}=\\dfrac{-1}{\\sin^2 x}=-\\operatorname{cosec}^2 x$, using the Pythagorean identity at the last step.",
      "There is a clean pattern that helps you remember which derivatives carry a minus sign: the three functions that begin with 'c' in the co-family — $\\cos$, $\\operatorname{cosec}$ and $\\cot$ — all differentiate to something negative. So $\\sec x$ (no leading 'c') has a positive derivative, while $\\operatorname{cosec} x$ and $\\cot x$ both pick up a minus sign.",
      "These combine with the chain rule just like any other standard derivative. For $\\sec(\\text{something})$ you multiply by the derivative of the inside, and constants multiply through as usual. When asked for a numerical value, differentiate first using the rule, then substitute the angle — and remember the reciprocal functions are undefined where their denominator is zero (for example $\\sec x$ at $x=\\frac{\\pi}{2}$).",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(\\sec x)=\\sec x\\tan x",
      "\\frac{d}{dx}(\\operatorname{cosec} x)=-\\operatorname{cosec} x\\cot x",
      "\\frac{d}{dx}(\\cot x)=-\\operatorname{cosec}^2 x",
      "\\text{co-family } (\\cos,\\ \\operatorname{cosec},\\ \\cot) \\Rightarrow \\text{negative derivative}",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: Derive the derivative of sec x",
      questionLatex: "\\text{Show that } \\frac{d}{dx}(\\sec x)=\\sec x\\tan x.",
      steps: [
        { explanation: "Write $\\sec x$ as a power of $\\cos x$ and apply the chain rule.", latex: "\\frac{d}{dx}(\\cos x)^{-1}=-(\\cos x)^{-2}\\cdot(-\\sin x)" },
        { explanation: "Simplify the double negative.", latex: "=\\frac{\\sin x}{\\cos^2 x}" },
        { explanation: "Split into reciprocal and ratio factors.", latex: "=\\frac{1}{\\cos x}\\cdot\\frac{\\sin x}{\\cos x}=\\sec x\\tan x" },
      ],
      finalAnswerLatex: "\\frac{d}{dx}(\\sec x)=\\sec x\\tan x",
    },
    {
      title: "Worked example 2: Differentiate a multiple",
      questionLatex: "y=3\\sec x. \\quad \\text{Find } \\frac{dy}{dx}.",
      steps: [
        { explanation: "Constants multiply through; use the sec rule.", latex: "\\frac{dy}{dx}=3\\sec x\\tan x" },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=3\\sec x\\tan x",
    },
    {
      title: "Worked example 3: A sum of reciprocal functions",
      questionLatex: "y=\\cot x+\\operatorname{cosec} x. \\quad \\text{Find } \\frac{dy}{dx}.",
      steps: [
        { explanation: "Differentiate each term; both are in the co-family, so both are negative.", latex: "\\frac{d}{dx}(\\cot x)=-\\operatorname{cosec}^2 x" },
        { explanation: "And the cosec term.", latex: "\\frac{d}{dx}(\\operatorname{cosec} x)=-\\operatorname{cosec} x\\cot x" },
        { explanation: "Combine.", latex: "\\frac{dy}{dx}=-\\operatorname{cosec}^2 x-\\operatorname{cosec} x\\cot x" },
      ],
      finalAnswerLatex: "-\\operatorname{cosec}^2 x-\\operatorname{cosec} x\\cot x",
    },
    {
      title: "Worked example 4: Evaluate at a standard angle",
      questionLatex: "f(x)=\\cot x. \\quad \\text{Find } f'\\!\\left(\\frac{\\pi}{6}\\right).",
      steps: [
        { explanation: "Differentiate using the cot rule.", latex: "f'(x)=-\\operatorname{cosec}^2 x" },
        { explanation: "At $x=\\frac{\\pi}{6}$, $\\sin\\frac{\\pi}{6}=\\frac12$, so $\\operatorname{cosec}\\frac{\\pi}{6}=2$.", latex: "f'\\!\\left(\\tfrac{\\pi}{6}\\right)=-(2)^2" },
        { explanation: "Evaluate.", latex: "=-4" },
      ],
      finalAnswerLatex: "f'\\!\\left(\\tfrac{\\pi}{6}\\right)=-4",
    },
  ],
  guidedPractice: [
    {
      id: "recip-guided-1",
      prompt: "Choose the derivative of $\\sec x$.",
      latex: "\\frac{d}{dx}(\\sec x)",
      answer: "C",
      choices: [
        { label: "A", text: "$-\\sec x\\tan x$" },
        { label: "B", text: "$\\operatorname{cosec}^2 x$" },
        { label: "C", text: "$\\sec x\\tan x$" },
        { label: "D", text: "$-\\operatorname{cosec} x\\cot x$" },
      ],
      hint: "Sec is not in the co-family, so its derivative is positive.",
      explanation: "$\\frac{d}{dx}(\\sec x)=\\sec x\\tan x$.",
    },
    {
      id: "recip-guided-2",
      prompt: "Choose the derivative of $\\cot x$.",
      latex: "\\frac{d}{dx}(\\cot x)",
      answer: "A",
      choices: [
        { label: "A", text: "$-\\operatorname{cosec}^2 x$" },
        { label: "B", text: "$\\operatorname{cosec}^2 x$" },
        { label: "C", text: "$\\sec^2 x$" },
        { label: "D", text: "$-\\sec x\\tan x$" },
      ],
      hint: "Cot is in the co-family.",
      explanation: "$\\frac{d}{dx}(\\cot x)=-\\operatorname{cosec}^2 x$.",
    },
    {
      id: "recip-guided-3",
      prompt: "Differentiate $y=2\\cot x$.",
      latex: "y=2\\cot x",
      answer: "A",
      choices: [
        { label: "A", text: "$-2\\operatorname{cosec}^2 x$" },
        { label: "B", text: "$2\\operatorname{cosec}^2 x$" },
        { label: "C", text: "$-2\\sec^2 x$" },
        { label: "D", text: "$2\\sec x\\tan x$" },
      ],
      hint: "Constant multiplies through.",
      explanation: "$\\frac{dy}{dx}=-2\\operatorname{cosec}^2 x$.",
    },
    {
      id: "recip-guided-4",
      prompt: "$f(x)=\\cot x$. Find $f'\\!\\left(\\frac{\\pi}{4}\\right)$.",
      latex: "f'(x)=-\\operatorname{cosec}^2 x",
      answer: "-2",
      hint: "$\\operatorname{cosec}\\frac{\\pi}{4}=\\sqrt 2$.",
      explanation: "$f'\\!\\left(\\tfrac{\\pi}{4}\\right)=-(\\sqrt 2)^2=-2$.",
    },
  ],
  independentPractice: [
    {
      id: "recip-ind-1",
      prompt: "Choose the derivative of $\\operatorname{cosec} x$.",
      latex: "\\frac{d}{dx}(\\operatorname{cosec} x)",
      answer: "B",
      choices: [
        { label: "A", text: "$\\operatorname{cosec} x\\cot x$" },
        { label: "B", text: "$-\\operatorname{cosec} x\\cot x$" },
        { label: "C", text: "$-\\operatorname{cosec}^2 x$" },
        { label: "D", text: "$\\sec x\\tan x$" },
      ],
      hint: "Cosec is in the co-family — negative.",
      explanation: "$\\frac{d}{dx}(\\operatorname{cosec} x)=-\\operatorname{cosec} x\\cot x$.",
    },
    {
      id: "recip-ind-2",
      prompt: "Differentiate $y=\\sec x+\\cot x$.",
      latex: "y=\\sec x+\\cot x",
      answer: "C",
      choices: [
        { label: "A", text: "$\\sec x\\tan x+\\operatorname{cosec}^2 x$" },
        { label: "B", text: "$-\\sec x\\tan x-\\operatorname{cosec}^2 x$" },
        { label: "C", text: "$\\sec x\\tan x-\\operatorname{cosec}^2 x$" },
        { label: "D", text: "$\\sec^2 x-\\operatorname{cosec}^2 x$" },
      ],
      hint: "Sec positive, cot negative.",
      explanation: "$\\sec x\\tan x+(-\\operatorname{cosec}^2 x)=\\sec x\\tan x-\\operatorname{cosec}^2 x$.",
    },
    {
      id: "recip-ind-3",
      prompt: "$f(x)=\\cot x$. Find $f'\\!\\left(\\frac{\\pi}{2}\\right)$.",
      latex: "f'(x)=-\\operatorname{cosec}^2 x",
      answer: "-1",
      hint: "$\\operatorname{cosec}\\frac{\\pi}{2}=1$.",
      explanation: "$f'\\!\\left(\\tfrac{\\pi}{2}\\right)=-(1)^2=-1$.",
    },
    {
      id: "recip-ind-4",
      prompt: "$f(x)=\\sec x$. Find $f'(0)$.",
      latex: "f'(x)=\\sec x\\tan x",
      answer: "0",
      hint: "$\\tan 0=0$.",
      explanation: "$f'(0)=\\sec 0\\tan 0=1\\cdot 0=0$.",
    },
    {
      id: "recip-ind-5",
      prompt:
        "Which is the correct derivation step for $\\frac{d}{dx}(\\cot x)$ using the quotient rule on $\\frac{\\cos x}{\\sin x}$?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{-\\sin x\\sin x-\\cos x\\cos x}{\\sin^2 x}=\\frac{-1}{\\sin^2 x}$" },
        { label: "B", text: "$\\frac{\\sin x\\sin x-\\cos x\\cos x}{\\sin^2 x}$" },
        { label: "C", text: "$\\frac{\\cos x\\cos x+\\sin x\\sin x}{\\cos^2 x}$" },
        { label: "D", text: "$\\frac{-\\cos x}{\\sin x}$" },
      ],
      hint: "Numerator uses the Pythagorean identity.",
      explanation:
        "The quotient rule gives $\\frac{-(\\sin^2 x+\\cos^2 x)}{\\sin^2 x}=\\frac{-1}{\\sin^2 x}=-\\operatorname{cosec}^2 x$.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Forgetting the minus sign on the derivatives of cosec x and cot x.",
      fix: "Use the co-family rule: $\\cos$, $\\operatorname{cosec}$ and $\\cot$ all have negative derivatives.",
    },
    {
      mistake: "Mixing up $\\frac{d}{dx}(\\cot x)$ with $\\sec^2 x$.",
      fix: "$\\frac{d}{dx}(\\tan x)=\\sec^2 x$ but $\\frac{d}{dx}(\\cot x)=-\\operatorname{cosec}^2 x$.",
    },
    {
      mistake: "Treating $\\sec x$ like a power of $x$.",
      fix: "$\\sec x=(\\cos x)^{-1}$; differentiate with the chain rule, giving $\\sec x\\tan x$.",
    },
    {
      mistake: "Evaluating where the function is undefined.",
      fix: "Reciprocal functions are undefined where the denominator is zero (e.g. $\\sec\\frac{\\pi}{2}$); check the angle is valid.",
    },
  ],
  masteryQuiz: [
    { id: "recip-m-1", prompt: "$\\frac{d}{dx}(\\sec x)=$", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\sec^2 x$" }, { label: "B", text: "$-\\sec x\\tan x$" }, { label: "C", text: "$\\sec x\\tan x$" }, { label: "D", text: "$\\operatorname{cosec} x\\cot x$" }], hint: "Sec is positive.", explanation: "$\\sec x\\tan x$." },
    { id: "recip-m-2", prompt: "$\\frac{d}{dx}(\\operatorname{cosec} x)=$", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\operatorname{cosec} x\\cot x$" }, { label: "B", text: "$-\\operatorname{cosec} x\\cot x$" }, { label: "C", text: "$-\\operatorname{cosec}^2 x$" }, { label: "D", text: "$\\sec x\\tan x$" }], hint: "Co-family.", explanation: "$-\\operatorname{cosec} x\\cot x$." },
    { id: "recip-m-3", prompt: "$\\frac{d}{dx}(\\cot x)=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$-\\operatorname{cosec}^2 x$" }, { label: "B", text: "$\\operatorname{cosec}^2 x$" }, { label: "C", text: "$\\sec^2 x$" }, { label: "D", text: "$-\\sec^2 x$" }], hint: "Co-family.", explanation: "$-\\operatorname{cosec}^2 x$." },
    { id: "recip-m-4", prompt: "Differentiate $y=4\\sec x$.", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$4\\sec^2 x$" }, { label: "B", text: "$4\\sec x\\tan x$" }, { label: "C", text: "$-4\\sec x\\tan x$" }, { label: "D", text: "$4\\tan x$" }], hint: "Constant through.", explanation: "$4\\sec x\\tan x$." },
    { id: "recip-m-5", prompt: "$f(x)=\\cot x$. Find $f'\\!\\left(\\frac{\\pi}{6}\\right)$.", latex: "-\\operatorname{cosec}^2 x", answer: "-4", difficulty: 4, hint: "$\\operatorname{cosec}\\frac{\\pi}{6}=2$.", explanation: "$-(2)^2=-4$." },
    { id: "recip-m-6", prompt: "$f(x)=\\cot x$. Find $f'\\!\\left(\\frac{\\pi}{4}\\right)$.", latex: "-\\operatorname{cosec}^2 x", answer: "-2", difficulty: 4, hint: "$\\operatorname{cosec}\\frac{\\pi}{4}=\\sqrt2$.", explanation: "$-(\\sqrt2)^2=-2$." },
    { id: "recip-m-7", prompt: "Differentiate $y=\\sec x-\\cot x$.", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\sec x\\tan x+\\operatorname{cosec}^2 x$" }, { label: "B", text: "$\\sec x\\tan x-\\operatorname{cosec}^2 x$" }, { label: "C", text: "$-\\sec x\\tan x+\\operatorname{cosec}^2 x$" }, { label: "D", text: "$\\sec^2 x+\\operatorname{cosec}^2 x$" }], hint: "Subtracting a negative derivative.", explanation: "$\\sec x\\tan x-(-\\operatorname{cosec}^2 x)=\\sec x\\tan x+\\operatorname{cosec}^2 x$." },
    { id: "recip-m-8", prompt: "$f(x)=\\sec x$. Find $f'(0)$.", latex: "\\sec x\\tan x", answer: "0", difficulty: 3, hint: "$\\tan 0=0$.", explanation: "$1\\cdot 0=0$." },
    { id: "recip-m-9", prompt: "Which function has a positive derivative?", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$\\cos x$" }, { label: "B", text: "$\\cot x$" }, { label: "C", text: "$\\sec x$" }, { label: "D", text: "$\\operatorname{cosec} x$" }], hint: "Which is NOT in the co-family?", explanation: "$\\sec x$ (not co-family) has derivative $\\sec x\\tan x$." },
    { id: "recip-m-10", prompt: "$f(x)=\\cot x$. Find $f'\\!\\left(\\frac{\\pi}{2}\\right)$.", latex: "-\\operatorname{cosec}^2 x", answer: "-1", difficulty: 4, hint: "$\\operatorname{cosec}\\frac{\\pi}{2}=1$.", explanation: "$-(1)^2=-1$." },
  ],
  masteryQuizPool: [
    { id: "recip-p-1", prompt: "$\\frac{d}{dx}(\\sec x)=$", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$\\sec^2 x$" }, { label: "B", text: "$-\\sec x\\tan x$" }, { label: "C", text: "$\\sec x\\tan x$" }, { label: "D", text: "$\\tan x$" }], hint: "Positive.", explanation: "$\\sec x\\tan x$." },
    { id: "recip-p-2", prompt: "$\\frac{d}{dx}(\\cot x)=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$-\\operatorname{cosec}^2 x$" }, { label: "B", text: "$\\operatorname{cosec}^2 x$" }, { label: "C", text: "$\\sec^2 x$" }, { label: "D", text: "$\\operatorname{cosec} x\\cot x$" }], hint: "Co-family.", explanation: "$-\\operatorname{cosec}^2 x$." },
    { id: "recip-p-3", prompt: "$\\frac{d}{dx}(\\operatorname{cosec} x)=$", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\operatorname{cosec} x\\cot x$" }, { label: "B", text: "$-\\operatorname{cosec} x\\cot x$" }, { label: "C", text: "$\\operatorname{cosec}^2 x$" }, { label: "D", text: "$-\\operatorname{cosec}^2 x$" }], hint: "Co-family.", explanation: "$-\\operatorname{cosec} x\\cot x$." },
    { id: "recip-p-4", prompt: "Which carries a minus sign in its derivative?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$\\sec x$" }, { label: "B", text: "$\\tan x$" }, { label: "C", text: "$\\sin x$" }, { label: "D", text: "$\\cot x$" }], hint: "Co-family.", explanation: "$\\cot x$ differentiates to $-\\operatorname{cosec}^2 x$." },
    { id: "recip-p-5", prompt: "Differentiate $y=5\\cot x$.", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$5\\operatorname{cosec}^2 x$" }, { label: "B", text: "$-5\\operatorname{cosec}^2 x$" }, { label: "C", text: "$-5\\sec^2 x$" }, { label: "D", text: "$5\\sec x\\tan x$" }], hint: "Constant through.", explanation: "$-5\\operatorname{cosec}^2 x$." },
    { id: "recip-p-6", prompt: "Differentiate $y=2\\operatorname{cosec} x$.", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$-2\\operatorname{cosec} x\\cot x$" }, { label: "B", text: "$2\\operatorname{cosec} x\\cot x$" }, { label: "C", text: "$-2\\operatorname{cosec}^2 x$" }, { label: "D", text: "$2\\sec x\\tan x$" }], hint: "Co-family.", explanation: "$-2\\operatorname{cosec} x\\cot x$." },
    { id: "recip-p-7", prompt: "Differentiate $y=\\sec x+\\tan x$.", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\sec x\\tan x-\\sec^2 x$" }, { label: "B", text: "$-\\sec x\\tan x+\\sec^2 x$" }, { label: "C", text: "$\\sec x\\tan x+\\sec^2 x$" }, { label: "D", text: "$\\operatorname{cosec}^2 x$" }], hint: "Both positive.", explanation: "$\\sec x\\tan x+\\sec^2 x$." },
    { id: "recip-p-8", prompt: "$f(x)=\\cot x$. $f'\\!\\left(\\frac{\\pi}{6}\\right)=$", latex: "-\\operatorname{cosec}^2 x", answer: "-4", difficulty: 3, hint: "$\\operatorname{cosec}\\frac{\\pi}{6}=2$.", explanation: "$-4$." },
    { id: "recip-p-9", prompt: "$f(x)=\\cot x$. $f'\\!\\left(\\frac{\\pi}{4}\\right)=$", latex: "-\\operatorname{cosec}^2 x", answer: "-2", difficulty: 3, hint: "$\\operatorname{cosec}\\frac{\\pi}{4}=\\sqrt2$.", explanation: "$-2$." },
    { id: "recip-p-10", prompt: "$f(x)=\\cot x$. $f'\\!\\left(\\frac{\\pi}{2}\\right)=$", latex: "-\\operatorname{cosec}^2 x", answer: "-1", difficulty: 3, hint: "$\\operatorname{cosec}\\frac{\\pi}{2}=1$.", explanation: "$-1$." },
    { id: "recip-p-11", prompt: "$f(x)=\\sec x$. $f'(0)=$", latex: "\\sec x\\tan x", answer: "0", difficulty: 3, hint: "$\\tan 0=0$.", explanation: "$0$." },
    { id: "recip-p-12", prompt: "$f(x)=\\operatorname{cosec} x$. $f'\\!\\left(\\frac{\\pi}{2}\\right)=$", latex: "-\\operatorname{cosec} x\\cot x", answer: "0", difficulty: 4, hint: "$\\cot\\frac{\\pi}{2}=0$.", explanation: "$-1\\cdot 0=0$." },
    { id: "recip-p-13", prompt: "$f(x)=\\sec x$. $f'\\!\\left(\\frac{\\pi}{4}\\right)$ (2 d.p.)$=$", latex: "\\sec x\\tan x", answer: "1.41", difficulty: 5, acceptedAnswers: ["√2", "1.414"], hint: "$\\sec\\frac{\\pi}{4}=\\sqrt2$, $\\tan\\frac{\\pi}{4}=1$.", explanation: "$\\sqrt2\\cdot1=\\sqrt2\\approx1.41$." },
    { id: "recip-p-14", prompt: "$f(x)=\\operatorname{cosec} x$. $f'\\!\\left(\\frac{\\pi}{4}\\right)$ (2 d.p.)$=$", latex: "-\\operatorname{cosec} x\\cot x", answer: "-1.41", difficulty: 5, acceptedAnswers: ["-√2", "-1.414"], hint: "$\\operatorname{cosec}\\frac{\\pi}{4}=\\sqrt2$, $\\cot\\frac{\\pi}{4}=1$.", explanation: "$-\\sqrt2\\cdot1=-\\sqrt2\\approx-1.41$." },
    { id: "recip-p-15", prompt: "$\\frac{d}{dx}(\\tan x)$ vs $\\frac{d}{dx}(\\cot x)$: the cot derivative is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\sec^2 x$" }, { label: "B", text: "$-\\operatorname{cosec}^2 x$" }, { label: "C", text: "$\\operatorname{cosec}^2 x$" }, { label: "D", text: "$-\\sec^2 x$" }], hint: "Co-family negative.", explanation: "$\\frac{d}{dx}(\\cot x)=-\\operatorname{cosec}^2 x$." },
    { id: "recip-p-16", prompt: "In deriving $\\frac{d}{dx}(\\sec x)$, $\\sec x$ is first written as:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$(\\cos x)^{-1}$" }, { label: "B", text: "$(\\sin x)^{-1}$" }, { label: "C", text: "$\\frac{\\cos x}{\\sin x}$" }, { label: "D", text: "$\\tan x$" }], hint: "Reciprocal of cos.", explanation: "$\\sec x=(\\cos x)^{-1}$." },
    { id: "recip-p-17", prompt: "The Pythagorean identity used in deriving $\\frac{d}{dx}(\\cot x)$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\sin^2 x+\\cos^2 x=1$" }, { label: "B", text: "$1+\\tan^2 x=\\sec^2 x$" }, { label: "C", text: "$\\sin 2x=2\\sin x\\cos x$" }, { label: "D", text: "$\\cos 2x$" }], hint: "Numerator collapses.", explanation: "$-(\\sin^2 x+\\cos^2 x)=-1$." },
    { id: "recip-p-18", prompt: "Differentiate $y=3\\sec x-2\\cot x$.", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$3\\sec x\\tan x-2\\operatorname{cosec}^2 x$" }, { label: "B", text: "$3\\sec x\\tan x-2\\sec^2 x$" }, { label: "C", text: "$3\\sec x\\tan x+2\\operatorname{cosec}^2 x$" }, { label: "D", text: "$-3\\sec x\\tan x+2\\operatorname{cosec}^2 x$" }], hint: "$-2\\times(-\\operatorname{cosec}^2 x)$.", explanation: "$3\\sec x\\tan x-2(-\\operatorname{cosec}^2 x)=3\\sec x\\tan x+2\\operatorname{cosec}^2 x$." },
    { id: "recip-p-19", prompt: "$f(x)=\\sec x$. $f'(0)$ is $0$ because:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\sec 0=0$" }, { label: "B", text: "$\\tan 0=0$" }, { label: "C", text: "$\\sec 0$ is undefined" }, { label: "D", text: "the derivative is always 0" }], hint: "Which factor is 0?", explanation: "$f'(0)=\\sec 0\\tan 0=1\\cdot 0=0$." },
    { id: "recip-p-20", prompt: "Why is $\\sec\\frac{\\pi}{2}$ a problem?", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "It equals 0" }, { label: "B", text: "$\\cos\\frac{\\pi}{2}=0$, so $\\sec$ is undefined" }, { label: "C", text: "It equals 1" }, { label: "D", text: "There is no problem" }], hint: "Reciprocal of cos.", explanation: "$\\cos\\frac{\\pi}{2}=0$, so $\\sec\\frac{\\pi}{2}$ (and its derivative) is undefined." },
    { id: "recip-p-21", prompt: "Differentiate $y=\\operatorname{cosec} x+\\cot x$.", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\operatorname{cosec} x\\cot x+\\operatorname{cosec}^2 x$" }, { label: "B", text: "$-\\operatorname{cosec} x\\cot x-\\operatorname{cosec}^2 x$" }, { label: "C", text: "$-\\operatorname{cosec} x\\cot x+\\operatorname{cosec}^2 x$" }, { label: "D", text: "$\\operatorname{cosec}^2 x$" }], hint: "Both co-family.", explanation: "$-\\operatorname{cosec} x\\cot x-\\operatorname{cosec}^2 x$." },
    { id: "recip-p-22", prompt: "$\\frac{d}{dx}(\\sec x)=\\sec x\\tan x$. The split used is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\sin x}{\\cos^2 x}=\\frac{1}{\\cos x}\\cdot\\frac{\\sin x}{\\cos x}$" }, { label: "B", text: "$\\frac{\\sin x}{\\cos^2 x}=\\sec^2 x$" }, { label: "C", text: "$\\frac{\\cos x}{\\sin^2 x}$" }, { label: "D", text: "$\\tan x$" }], hint: "$\\sec\\cdot\\tan$.", explanation: "$\\frac{1}{\\cos x}\\cdot\\frac{\\sin x}{\\cos x}=\\sec x\\tan x$." },
    { id: "recip-p-23", prompt: "$f(x)=2\\cot x$. $f'\\!\\left(\\frac{\\pi}{4}\\right)=$", latex: "-2\\operatorname{cosec}^2 x", answer: "-4", difficulty: 4, hint: "$-2(\\sqrt2)^2$.", explanation: "$-2\\cdot 2=-4$." },
    { id: "recip-p-24", prompt: "$f(x)=\\operatorname{cosec} x$. $f'\\!\\left(\\frac{\\pi}{6}\\right)$ (2 d.p.)$=$", latex: "-\\operatorname{cosec} x\\cot x", answer: "-3.46", difficulty: 5, acceptedAnswers: ["-2√3", "-3.464"], hint: "$\\operatorname{cosec}\\frac{\\pi}{6}=2$, $\\cot\\frac{\\pi}{6}=\\sqrt3$.", explanation: "$-2\\sqrt3\\approx-3.46$." },
    { id: "recip-p-25", prompt: "Which is the derivative of $\\tan x$ (for contrast)?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\sec^2 x$" }, { label: "B", text: "$-\\operatorname{cosec}^2 x$" }, { label: "C", text: "$\\sec x\\tan x$" }, { label: "D", text: "$-\\sec^2 x$" }], hint: "Tan is not co-family.", explanation: "$\\frac{d}{dx}(\\tan x)=\\sec^2 x$." },
    { id: "recip-p-26", prompt: "Differentiate $y=\\sec x\\,$ then evaluate the rule type: it is a", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "product $\\sec x\\tan x$" }, { label: "B", text: "$\\sec^2 x$" }, { label: "C", text: "constant" }, { label: "D", text: "$-\\operatorname{cosec}^2 x$" }], hint: "Recall the rule.", explanation: "$\\sec x\\tan x$." },
  ],
  multiPartPractice: [
    {
      id: "recip-mp-1",
      prompt:
        "Consider $f(x)=\\cot x$ on $0<x<\\pi$. You may use $f'(x)=-\\operatorname{cosec}^2 x$.",
      latex: "f(x)=\\cot x,\\quad f'(x)=-\\operatorname{cosec}^2 x",
      answer: "-1",
      hint: "Substitute each angle into $f'(x)=-\\operatorname{cosec}^2 x$, using $\\operatorname{cosec}\\theta=\\frac{1}{\\sin\\theta}$.",
      explanation:
        "(a) At $x=\\frac{\\pi}{2}$, $\\operatorname{cosec}\\frac{\\pi}{2}=1$, so $f'=-1$. (b) At $x=\\frac{\\pi}{4}$, $\\operatorname{cosec}\\frac{\\pi}{4}=\\sqrt2$, so $f'=-2$. (c) At $x=\\frac{\\pi}{6}$, $\\operatorname{cosec}\\frac{\\pi}{6}=2$, so $f'=-4$ — the gradient is steepest (most negative) here.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find $f'\\!\\left(\\frac{\\pi}{2}\\right)$.", latex: "-\\operatorname{cosec}^2\\tfrac{\\pi}{2}", marks: 1, answer: "-1", acceptedAnswers: ["−1"], hint: "$\\operatorname{cosec}\\frac{\\pi}{2}=1$.", explanation: "$-(1)^2=-1$." },
        { key: "b", label: "(b)", prompt: "Find $f'\\!\\left(\\frac{\\pi}{4}\\right)$.", latex: "-\\operatorname{cosec}^2\\tfrac{\\pi}{4}", marks: 2, answer: "-2", acceptedAnswers: ["−2"], hint: "$\\operatorname{cosec}\\frac{\\pi}{4}=\\sqrt2$.", explanation: "$-(\\sqrt2)^2=-2$." },
        { key: "c", label: "(c)", prompt: "Find $f'\\!\\left(\\frac{\\pi}{6}\\right)$.", latex: "-\\operatorname{cosec}^2\\tfrac{\\pi}{6}", marks: 2, answer: "-4", acceptedAnswers: ["−4"], hint: "$\\operatorname{cosec}\\frac{\\pi}{6}=2$.", explanation: "$-(2)^2=-4$." },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const logToAnyBaseDerivativeLesson: ExplicitLesson = {
  id: "log-to-any-base-derivative",
  slug: "log-to-any-base-derivative",
  moduleSlug: "ma-c2-differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Differentiating Logarithms to Any Base",
  description:
    "Prove and use the derivative of log base a of x, d/dx(log_a x)=1/(x ln a), via the change-of-base identity.",
  syllabusArea: "Calculus",
  focus: "Differentiation techniques",
  status: "active",
  video: {
    title: "Differentiating Logarithms to Any Base",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn how to differentiate a logarithm of any base by converting it to the natural logarithm.",
  successCriteria: [
    "State and prove $\\frac{d}{dx}(\\log_a x)=\\frac{1}{x\\ln a}$.",
    "Use the change-of-base identity $\\log_a x=\\frac{\\ln x}{\\ln a}$.",
    "Recognise $\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$ as the case $a=e$.",
    "Differentiate multiples of $\\log_a x$.",
    "Evaluate such derivatives at given points using a value of $\\ln a$.",
  ],
  teaching: {
    paragraphs: [
      "You already know that $\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$. To differentiate a logarithm to a different base — say $\\log_2 x$ or $\\log_{10} x$ — you do not need a new rule. You convert it to the natural logarithm first, and the natural-log derivative does the work.",
      "The tool is the change-of-base identity: $\\log_a x=\\dfrac{\\ln x}{\\ln a}$. The crucial observation is that $\\ln a$ is just a constant (for example $\\ln 2\\approx 0.693$). So $\\log_a x$ is simply a constant multiple of $\\ln x$, namely $\\dfrac{1}{\\ln a}\\,\\ln x$.",
      "Differentiating is now immediate. The constant $\\dfrac{1}{\\ln a}$ stays out the front, and $\\ln x$ differentiates to $\\dfrac{1}{x}$: $\\dfrac{d}{dx}(\\log_a x)=\\dfrac{1}{\\ln a}\\cdot\\dfrac{1}{x}=\\dfrac{1}{x\\ln a}$. That is the rule — and you have just proved it, which is exactly how the syllabus expects you to obtain it.",
      "This formula contains the natural-log rule as a special case. When the base is $e$, $\\ln a=\\ln e=1$, so $\\dfrac{1}{x\\ln e}=\\dfrac{1}{x}$, recovering $\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$. It is also a neat companion to the exponential rule $\\frac{d}{dx}(a^x)=a^x\\ln a$: differentiating $a^x$ multiplies by $\\ln a$, while differentiating $\\log_a x$ divides by it — fitting, since the two functions are inverses.",
      "In practice: constants multiply through as usual, so $\\frac{d}{dx}(k\\log_a x)=\\dfrac{k}{x\\ln a}$. For a numerical value, write the derivative as $\\dfrac{1}{x\\ln a}$, then substitute the given $x$ and the supplied value of $\\ln a$. Keep $\\ln a$ in the denominator — a common slip is to multiply by $\\ln a$ (the exponential rule) instead of dividing by it.",
    ],
    latexBlocks: [
      "\\log_a x=\\frac{\\ln x}{\\ln a} \\quad (\\text{change of base})",
      "\\frac{d}{dx}(\\log_a x)=\\frac{1}{x\\ln a}",
      "\\frac{d}{dx}(\\ln x)=\\frac{1}{x} \\quad (\\text{case } a=e)",
      "\\text{compare: } \\frac{d}{dx}(a^x)=a^x\\ln a",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: Prove the rule",
      questionLatex: "\\text{Show that } \\frac{d}{dx}(\\log_a x)=\\frac{1}{x\\ln a}.",
      steps: [
        { explanation: "Rewrite using change of base; $\\ln a$ is a constant.", latex: "\\log_a x=\\frac{\\ln x}{\\ln a}=\\frac{1}{\\ln a}\\,\\ln x" },
        { explanation: "Differentiate, keeping the constant out the front.", latex: "\\frac{d}{dx}\\left(\\frac{1}{\\ln a}\\,\\ln x\\right)=\\frac{1}{\\ln a}\\cdot\\frac{1}{x}" },
        { explanation: "Combine.", latex: "=\\frac{1}{x\\ln a}" },
      ],
      finalAnswerLatex: "\\frac{d}{dx}(\\log_a x)=\\frac{1}{x\\ln a}",
    },
    {
      title: "Worked example 2: A specific base",
      questionLatex: "y=\\log_2 x. \\quad \\text{Find } \\frac{dy}{dx}.",
      steps: [
        { explanation: "Apply the rule with $a=2$.", latex: "\\frac{dy}{dx}=\\frac{1}{x\\ln 2}" },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=\\frac{1}{x\\ln 2}",
    },
    {
      title: "Worked example 3: With a coefficient",
      questionLatex: "y=5\\log_{10} x. \\quad \\text{Find } \\frac{dy}{dx}.",
      steps: [
        { explanation: "The constant 5 multiplies through.", latex: "\\frac{dy}{dx}=\\frac{5}{x\\ln 10}" },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=\\frac{5}{x\\ln 10}",
    },
    {
      title: "Worked example 4: Evaluate a derivative",
      questionLatex:
        "f(x)=\\log_2 x. \\quad \\text{Using } \\ln 2\\approx 0.693, \\text{ find } f'(1) \\text{ to 3 d.p.}",
      steps: [
        { explanation: "Differentiate.", latex: "f'(x)=\\frac{1}{x\\ln 2}" },
        { explanation: "Substitute $x=1$ and $\\ln 2\\approx 0.693$.", latex: "f'(1)=\\frac{1}{1\\times 0.693}=\\frac{1}{0.693}" },
        { explanation: "Evaluate.", latex: "\\approx 1.443" },
      ],
      finalAnswerLatex: "f'(1)\\approx 1.443",
    },
  ],
  guidedPractice: [
    {
      id: "logbase-guided-1",
      prompt: "The change-of-base identity writes $\\log_a x$ as:",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "$\\ln x\\cdot\\ln a$" },
        { label: "B", text: "$\\frac{\\ln x}{\\ln a}$" },
        { label: "C", text: "$\\frac{\\ln a}{\\ln x}$" },
        { label: "D", text: "$\\ln(x-a)$" },
      ],
      hint: "Divide the natural logs.",
      explanation: "$\\log_a x=\\frac{\\ln x}{\\ln a}$.",
    },
    {
      id: "logbase-guided-2",
      prompt: "Choose the derivative of $\\log_a x$.",
      latex: "\\frac{d}{dx}(\\log_a x)",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{1}{x\\ln a}$" },
        { label: "B", text: "$\\frac{\\ln a}{x}$" },
        { label: "C", text: "$\\frac{1}{x}$" },
        { label: "D", text: "$x\\ln a$" },
      ],
      hint: "Divide by $\\ln a$.",
      explanation: "$\\frac{d}{dx}(\\log_a x)=\\frac{1}{x\\ln a}$.",
    },
    {
      id: "logbase-guided-3",
      prompt: "Choose the derivative of $\\log_2 x$.",
      latex: "\\frac{d}{dx}(\\log_2 x)",
      answer: "C",
      choices: [
        { label: "A", text: "$\\frac{\\ln 2}{x}$" },
        { label: "B", text: "$\\frac{1}{x}$" },
        { label: "C", text: "$\\frac{1}{x\\ln 2}$" },
        { label: "D", text: "$2^x\\ln 2$" },
      ],
      hint: "$a=2$.",
      explanation: "$\\frac{1}{x\\ln 2}$.",
    },
    {
      id: "logbase-guided-4",
      prompt:
        "$f(x)=\\log_2 x$. Using $\\ln 2\\approx 0.693$, find $f'(1)$ to 3 d.p.",
      latex: "f'(x)=\\frac{1}{x\\ln 2}",
      answer: "1.443",
      acceptedAnswers: ["1.44"],
      hint: "$\\frac{1}{0.693}$.",
      explanation: "$f'(1)=\\frac{1}{0.693}\\approx 1.443$.",
    },
  ],
  independentPractice: [
    {
      id: "logbase-ind-1",
      prompt: "Choose the derivative of $\\log_{10} x$.",
      latex: "\\frac{d}{dx}(\\log_{10} x)",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{1}{x\\ln 10}$" },
        { label: "B", text: "$\\frac{\\ln 10}{x}$" },
        { label: "C", text: "$\\frac{1}{10x}$" },
        { label: "D", text: "$\\frac{1}{x}$" },
      ],
      hint: "$a=10$.",
      explanation: "$\\frac{1}{x\\ln 10}$.",
    },
    {
      id: "logbase-ind-2",
      prompt: "Differentiate $y=3\\log_5 x$.",
      latex: "y=3\\log_5 x",
      answer: "B",
      choices: [
        { label: "A", text: "$\\frac{1}{x\\ln 5}$" },
        { label: "B", text: "$\\frac{3}{x\\ln 5}$" },
        { label: "C", text: "$\\frac{3\\ln 5}{x}$" },
        { label: "D", text: "$3\\cdot 5^x\\ln 5$" },
      ],
      hint: "Constant through.",
      explanation: "$\\frac{3}{x\\ln 5}$.",
    },
    {
      id: "logbase-ind-3",
      prompt:
        "$f(x)=\\log_{10} x$. Using $\\ln 10\\approx 2.303$, find $f'(1)$ to 3 d.p.",
      latex: "f'(x)=\\frac{1}{x\\ln 10}",
      answer: "0.434",
      acceptedAnswers: ["0.43"],
      hint: "$\\frac{1}{2.303}$.",
      explanation: "$f'(1)=\\frac{1}{2.303}\\approx 0.434$.",
    },
    {
      id: "logbase-ind-4",
      prompt: "Why does $\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$ follow from the general rule?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "Because $\\ln 1=0$" },
        { label: "B", text: "With $a=e$, $\\ln e=1$, so $\\frac{1}{x\\ln e}=\\frac{1}{x}$" },
        { label: "C", text: "Because $e\\approx 2.718$" },
        { label: "D", text: "It does not follow" },
      ],
      hint: "Put $a=e$.",
      explanation: "$\\ln e=1$ collapses $\\frac{1}{x\\ln a}$ to $\\frac{1}{x}$.",
    },
    {
      id: "logbase-ind-5",
      prompt:
        "$f(x)=\\log_3 x$. Using $\\ln 3\\approx 1.099$, find $f'(3)$ to 3 d.p.",
      latex: "f'(x)=\\frac{1}{x\\ln 3}",
      answer: "0.303",
      acceptedAnswers: ["0.30"],
      hint: "$\\frac{1}{3\\times 1.099}$.",
      explanation: "$f'(3)=\\frac{1}{3.297}\\approx 0.303$.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Multiplying by $\\ln a$ instead of dividing by it.",
      fix: "For $\\log_a x$ the derivative divides: $\\frac{1}{x\\ln a}$. Multiplying by $\\ln a$ is the rule for $a^x$.",
    },
    {
      mistake: "Treating $\\ln a$ as a variable and trying to differentiate it.",
      fix: "$\\ln a$ is a constant; it stays put as a coefficient.",
    },
    {
      mistake: "Forgetting change of base and inventing a separate rule.",
      fix: "Always rewrite $\\log_a x=\\frac{\\ln x}{\\ln a}$ first, then differentiate $\\ln x$.",
    },
    {
      mistake: "Confusing $\\log_a x$ with $a^x$.",
      fix: "They are inverses: $\\frac{d}{dx}(a^x)=a^x\\ln a$, but $\\frac{d}{dx}(\\log_a x)=\\frac{1}{x\\ln a}$.",
    },
  ],
  masteryQuiz: [
    { id: "logbase-m-1", prompt: "$\\frac{d}{dx}(\\log_a x)=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{1}{x\\ln a}$" }, { label: "B", text: "$\\frac{\\ln a}{x}$" }, { label: "C", text: "$\\frac{1}{x}$" }, { label: "D", text: "$a^x\\ln a$" }], hint: "Divide by ln a.", explanation: "$\\frac{1}{x\\ln a}$." },
    { id: "logbase-m-2", prompt: "Change of base: $\\log_a x=$", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\ln x\\ln a$" }, { label: "B", text: "$\\frac{\\ln a}{\\ln x}$" }, { label: "C", text: "$\\frac{\\ln x}{\\ln a}$" }, { label: "D", text: "$\\ln\\frac{x}{a}$" }], hint: "Natural logs.", explanation: "$\\frac{\\ln x}{\\ln a}$." },
    { id: "logbase-m-3", prompt: "$\\frac{d}{dx}(\\log_2 x)=$", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\ln 2}{x}$" }, { label: "B", text: "$\\frac{1}{x\\ln 2}$" }, { label: "C", text: "$\\frac{1}{2x}$" }, { label: "D", text: "$2^x\\ln 2$" }], hint: "$a=2$.", explanation: "$\\frac{1}{x\\ln 2}$." },
    { id: "logbase-m-4", prompt: "Differentiate $y=4\\log_3 x$.", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{4}{x\\ln 3}$" }, { label: "B", text: "$\\frac{1}{x\\ln 3}$" }, { label: "C", text: "$\\frac{4\\ln 3}{x}$" }, { label: "D", text: "$4\\cdot 3^x\\ln 3$" }], hint: "Constant through.", explanation: "$\\frac{4}{x\\ln 3}$." },
    { id: "logbase-m-5", prompt: "$f(x)=\\log_2 x$, $\\ln 2\\approx 0.693$. $f'(1)$ (3 d.p.)$=$", latex: "\\frac{1}{x\\ln 2}", answer: "1.443", difficulty: 4, acceptedAnswers: ["1.44"], hint: "$\\frac{1}{0.693}$.", explanation: "$1.443$." },
    { id: "logbase-m-6", prompt: "$f(x)=\\log_2 x$, $\\ln 2\\approx 0.693$. $f'(2)$ (3 d.p.)$=$", latex: "\\frac{1}{x\\ln 2}", answer: "0.721", difficulty: 5, acceptedAnswers: ["0.72"], hint: "$\\frac{1}{2\\times 0.693}$.", explanation: "$\\frac{1}{1.386}\\approx 0.721$." },
    { id: "logbase-m-7", prompt: "$\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$ is the rule with base:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$10$" }, { label: "B", text: "$2$" }, { label: "C", text: "$e$" }, { label: "D", text: "$1$" }], hint: "$\\ln e=1$.", explanation: "Base $e$: $\\ln e=1$." },
    { id: "logbase-m-8", prompt: "Compare: $\\frac{d}{dx}(a^x)$ multiplies by $\\ln a$; $\\frac{d}{dx}(\\log_a x)$:", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Also multiplies by $\\ln a$" }, { label: "B", text: "Divides by $\\ln a$" }, { label: "C", text: "Ignores $\\ln a$" }, { label: "D", text: "Squares $\\ln a$" }], hint: "Inverses.", explanation: "$\\frac{1}{x\\ln a}$ — divides by $\\ln a$." },
    { id: "logbase-m-9", prompt: "$f(x)=\\log_{10} x$, $\\ln 10\\approx 2.303$. $f'(10)$ (3 d.p.)$=$", latex: "\\frac{1}{x\\ln 10}", answer: "0.043", difficulty: 5, acceptedAnswers: ["0.0434", "0.04"], hint: "$\\frac{1}{10\\times 2.303}$.", explanation: "$\\frac{1}{23.03}\\approx 0.043$." },
    { id: "logbase-m-10", prompt: "$f(x)=\\log_5 x$, $\\ln 5\\approx 1.609$. $f'(1)$ (3 d.p.)$=$", latex: "\\frac{1}{x\\ln 5}", answer: "0.622", difficulty: 4, acceptedAnswers: ["0.62"], hint: "$\\frac{1}{1.609}$.", explanation: "$0.622$." },
  ],
  masteryQuizPool: [
    { id: "logbase-p-1", prompt: "$\\frac{d}{dx}(\\log_a x)=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{1}{x\\ln a}$" }, { label: "B", text: "$\\frac{1}{x}$" }, { label: "C", text: "$\\frac{\\ln a}{x}$" }, { label: "D", text: "$x\\ln a$" }], hint: "Divide by ln a.", explanation: "$\\frac{1}{x\\ln a}$." },
    { id: "logbase-p-2", prompt: "$\\log_a x=\\frac{\\ln x}{\\ln a}$ is called:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "the product rule" }, { label: "B", text: "change of base" }, { label: "C", text: "the chain rule" }, { label: "D", text: "the power rule" }], hint: "Base change.", explanation: "Change of base." },
    { id: "logbase-p-3", prompt: "$\\frac{d}{dx}(\\log_2 x)=$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\ln 2}{x}$" }, { label: "B", text: "$\\frac{1}{x\\ln 2}$" }, { label: "C", text: "$\\frac{1}{2x}$" }, { label: "D", text: "$2^x$" }], hint: "$a=2$.", explanation: "$\\frac{1}{x\\ln 2}$." },
    { id: "logbase-p-4", prompt: "$\\frac{d}{dx}(\\log_{10} x)=$", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{1}{x\\ln 10}$" }, { label: "B", text: "$\\frac{1}{10x}$" }, { label: "C", text: "$\\frac{\\ln 10}{x}$" }, { label: "D", text: "$\\frac{1}{x}$" }], hint: "$a=10$.", explanation: "$\\frac{1}{x\\ln 10}$." },
    { id: "logbase-p-5", prompt: "$\\frac{d}{dx}(\\log_5 x)=$", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\ln 5}{x}$" }, { label: "B", text: "$\\frac{1}{5x}$" }, { label: "C", text: "$\\frac{1}{x\\ln 5}$" }, { label: "D", text: "$5^x\\ln 5$" }], hint: "$a=5$.", explanation: "$\\frac{1}{x\\ln 5}$." },
    { id: "logbase-p-6", prompt: "Differentiate $y=2\\log_2 x$.", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{1}{x\\ln 2}$" }, { label: "B", text: "$\\frac{2}{x\\ln 2}$" }, { label: "C", text: "$\\frac{2\\ln 2}{x}$" }, { label: "D", text: "$2\\cdot 2^x$" }], hint: "Constant through.", explanation: "$\\frac{2}{x\\ln 2}$." },
    { id: "logbase-p-7", prompt: "Differentiate $y=6\\log_{10} x$.", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{6}{x\\ln 10}$" }, { label: "B", text: "$\\frac{1}{x\\ln 10}$" }, { label: "C", text: "$\\frac{6\\ln 10}{x}$" }, { label: "D", text: "$\\frac{6}{x}$" }], hint: "Constant through.", explanation: "$\\frac{6}{x\\ln 10}$." },
    { id: "logbase-p-8", prompt: "The natural-log rule is the case $a=$", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$10$" }, { label: "B", text: "$1$" }, { label: "C", text: "$e$" }, { label: "D", text: "$0$" }], hint: "$\\ln e=1$.", explanation: "Base $e$." },
    { id: "logbase-p-9", prompt: "$f(x)=\\log_2 x$, $\\ln 2=0.693$. $f'(1)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 2}", answer: "1.443", difficulty: 3, acceptedAnswers: ["1.44"], hint: "$1/0.693$.", explanation: "$1.443$." },
    { id: "logbase-p-10", prompt: "$f(x)=\\log_2 x$, $\\ln 2=0.693$. $f'(2)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 2}", answer: "0.721", difficulty: 4, acceptedAnswers: ["0.72"], hint: "$1/1.386$.", explanation: "$0.721$." },
    { id: "logbase-p-11", prompt: "$f(x)=\\log_2 x$, $\\ln 2=0.693$. $f'(4)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 2}", answer: "0.361", difficulty: 5, acceptedAnswers: ["0.36"], hint: "$1/(4\\cdot0.693)$.", explanation: "$\\frac{1}{2.772}\\approx 0.361$." },
    { id: "logbase-p-12", prompt: "$f(x)=\\log_{10} x$, $\\ln 10=2.303$. $f'(1)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 10}", answer: "0.434", difficulty: 3, acceptedAnswers: ["0.43"], hint: "$1/2.303$.", explanation: "$0.434$." },
    { id: "logbase-p-13", prompt: "$f(x)=\\log_{10} x$, $\\ln 10=2.303$. $f'(10)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 10}", answer: "0.043", difficulty: 5, acceptedAnswers: ["0.0434", "0.04"], hint: "$1/23.03$.", explanation: "$0.043$." },
    { id: "logbase-p-14", prompt: "$f(x)=\\log_3 x$, $\\ln 3=1.099$. $f'(1)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 3}", answer: "0.910", difficulty: 4, acceptedAnswers: ["0.91"], hint: "$1/1.099$.", explanation: "$0.910$." },
    { id: "logbase-p-15", prompt: "$f(x)=\\log_3 x$, $\\ln 3=1.099$. $f'(3)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 3}", answer: "0.303", difficulty: 4, acceptedAnswers: ["0.30"], hint: "$1/3.297$.", explanation: "$0.303$." },
    { id: "logbase-p-16", prompt: "$f(x)=\\log_5 x$, $\\ln 5=1.609$. $f'(1)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 5}", answer: "0.622", difficulty: 4, acceptedAnswers: ["0.62"], hint: "$1/1.609$.", explanation: "$0.622$." },
    { id: "logbase-p-17", prompt: "$f(x)=\\log_5 x$, $\\ln 5=1.609$. $f'(5)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 5}", answer: "0.124", difficulty: 5, acceptedAnswers: ["0.12"], hint: "$1/(5\\cdot1.609)$.", explanation: "$\\frac{1}{8.045}\\approx 0.124$." },
    { id: "logbase-p-18", prompt: "For $\\log_a x$ you should ___ by $\\ln a$:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "multiply" }, { label: "B", text: "divide" }, { label: "C", text: "add" }, { label: "D", text: "subtract" }], hint: "Denominator.", explanation: "Divide: $\\frac{1}{x\\ln a}$." },
    { id: "logbase-p-19", prompt: "$\\frac{d}{dx}(a^x)$ vs $\\frac{d}{dx}(\\log_a x)$: the exponential one is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$a^x\\ln a$" }, { label: "B", text: "$\\frac{1}{x\\ln a}$" }, { label: "C", text: "$x\\ln a$" }, { label: "D", text: "$\\frac{a^x}{\\ln a}$" }], hint: "Multiply by ln a.", explanation: "$a^x\\ln a$." },
    { id: "logbase-p-20", prompt: "How does $\\ln a$ behave when $x$ varies?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Constant" }, { label: "B", text: "Variable in $x$" }, { label: "C", text: "Depends on $x$" }, { label: "D", text: "Undefined" }], hint: "$a$ is fixed.", explanation: "$\\ln a$ is a constant." },
    { id: "logbase-p-21", prompt: "Differentiate $y=\\log_2 x+\\ln x$.", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{1}{x\\ln 2}+\\frac{1}{x}$" }, { label: "B", text: "$\\frac{1}{x\\ln 2}$" }, { label: "C", text: "$\\frac{2}{x}$" }, { label: "D", text: "$\\frac{1}{x\\ln 2}-\\frac{1}{x}$" }], hint: "Differentiate each.", explanation: "$\\frac{1}{x\\ln 2}+\\frac{1}{x}$." },
    { id: "logbase-p-22", prompt: "After change of base, $\\log_a x$ is a constant multiple of:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$x$" }, { label: "B", text: "$a^x$" }, { label: "C", text: "$\\ln x$" }, { label: "D", text: "$\\frac{1}{x}$" }], hint: "$\\frac{1}{\\ln a}\\ln x$.", explanation: "A constant times $\\ln x$." },
    { id: "logbase-p-23", prompt: "$f(x)=\\log_{10} x$, $\\ln 10=2.303$. $f'(2)$ (3 d.p.)", latex: "\\frac{1}{x\\ln 10}", answer: "0.217", difficulty: 5, acceptedAnswers: ["0.22"], hint: "$1/(2\\cdot2.303)$.", explanation: "$\\frac{1}{4.606}\\approx 0.217$." },
    { id: "logbase-p-24", prompt: "Which is the WRONG derivative of $\\log_a x$?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\frac{1}{x\\ln a}$" }, { label: "B", text: "$\\frac{1}{\\ln a}\\cdot\\frac{1}{x}$" }, { label: "C", text: "result of differentiating $\\frac{\\ln x}{\\ln a}$" }, { label: "D", text: "$a^x\\ln a$" }], hint: "One is the exponential rule.", explanation: "$a^x\\ln a$ is the derivative of $a^x$, not $\\log_a x$." },
  ],
  multiPartPractice: [
    {
      id: "logbase-mp-1",
      prompt:
        "Let $f(x)=\\log_3 x$. Use $\\ln 3\\approx 1.099$ and give answers to 3 decimal places.",
      latex: "f(x)=\\log_3 x,\\quad \\ln 3\\approx 1.099",
      answer: "0.910",
      hint: "Differentiate to $f'(x)=\\frac{1}{x\\ln 3}$, then substitute each $x$.",
      explanation:
        "$f'(x)=\\frac{1}{x\\ln 3}$. (a) $f'(1)=\\frac{1}{1.099}\\approx 0.910$. (b) $f'(3)=\\frac{1}{3.297}\\approx 0.303$. (c) $f'(9)=\\frac{1}{9.891}\\approx 0.101$ — the gradient decreases as $x$ increases.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find $f'(1)$.", latex: "\\frac{1}{1\\times 1.099}", marks: 2, answer: "0.910", acceptedAnswers: ["0.91"], hint: "$\\frac{1}{1.099}$.", explanation: "$0.910$." },
        { key: "b", label: "(b)", prompt: "Find $f'(3)$.", latex: "\\frac{1}{3\\times 1.099}", marks: 2, answer: "0.303", acceptedAnswers: ["0.30"], hint: "$\\frac{1}{3.297}$.", explanation: "$0.303$." },
        { key: "c", label: "(c)", prompt: "Find $f'(9)$.", latex: "\\frac{1}{9\\times 1.099}", marks: 1, answer: "0.101", acceptedAnswers: ["0.10"], hint: "$\\frac{1}{9.891}$.", explanation: "$0.101$." },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const differentiationTechniquesLessons = [
  standardDerivativesLesson,
  reciprocalTrigDerivativesLesson,
  logToAnyBaseDerivativeLesson,
  chainRuleLesson,
  productQuotientRulesLesson,
  applicationsExtendedDifferentiationLesson,
  differentiationTechniquesExamPracticeLesson,
];

// ---------------------------------------------------------------------------
// Band-6 depth: difficulty-ramped mastery pools + HSC-style multi-part items.
// Assigned post-hoc because the lesson(...) factory does not accept these fields
// (same pattern integralCalculus.ts uses for masteryQuiz).
// ---------------------------------------------------------------------------

standardDerivativesLesson.masteryQuizPool = [
  // --- D1: single standard derivative recall ---
  { id: "std-p-1", prompt: "Choose the derivative of $\\sin x$.", latex: "y=\\sin x", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\cos x$" }, { label: "B", text: "$-\\sin x$" }, { label: "C", text: "$\\sec^2 x$" }, { label: "D", text: "$-\\cos x$" }], hint: "Sin differentiates to cos.", explanation: "$\\frac{d}{dx}(\\sin x)=\\cos x$." },
  { id: "std-p-2", prompt: "Choose the derivative of $\\cos x$.", latex: "y=\\cos x", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\sin x$" }, { label: "B", text: "$-\\sin x$" }, { label: "C", text: "$-\\cos x$" }, { label: "D", text: "$\\sec^2 x$" }], hint: "Watch the sign.", explanation: "$\\frac{d}{dx}(\\cos x)=-\\sin x$." },
  { id: "std-p-3", prompt: "Choose the derivative of $\\tan x$.", latex: "y=\\tan x", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$\\sec x$" }, { label: "B", text: "$\\cos x$" }, { label: "C", text: "$\\sec^2 x$" }, { label: "D", text: "$-\\sin x$" }], hint: "Tan differentiates to sec squared.", explanation: "$\\frac{d}{dx}(\\tan x)=\\sec^2 x$." },
  { id: "std-p-4", prompt: "Choose the derivative of $e^x$.", latex: "y=e^x", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$e^x$" }, { label: "B", text: "$xe^{x-1}$" }, { label: "C", text: "$\\frac{1}{x}$" }, { label: "D", text: "$e^{x-1}$" }], hint: "It is unchanged.", explanation: "$\\frac{d}{dx}(e^x)=e^x$." },
  { id: "std-p-5", prompt: "Choose the derivative of $\\ln x$.", latex: "y=\\ln x", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\frac{1}{\\ln x}$" }, { label: "B", text: "$\\frac{1}{x}$" }, { label: "C", text: "$x\\ln x$" }, { label: "D", text: "$e^x$" }], hint: "Reciprocal of $x$.", explanation: "$\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$." },
  { id: "std-p-6", prompt: "Choose the derivative of $a^x$.", latex: "y=a^x", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$xa^{x-1}$" }, { label: "B", text: "$a^x$" }, { label: "C", text: "$\\frac{a^x}{\\ln a}$" }, { label: "D", text: "$a^x\\ln a$" }], hint: "Multiply by $\\ln a$.", explanation: "$\\frac{d}{dx}(a^x)=a^x\\ln a$." },
  // --- D2: coefficients + simple combinations ---
  { id: "std-p-7", prompt: "Choose the derivative of $5\\sin x$.", latex: "y=5\\sin x", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$5\\cos x$" }, { label: "B", text: "$-5\\sin x$" }, { label: "C", text: "$5\\sec^2 x$" }, { label: "D", text: "$\\cos x$" }], hint: "Constant stays.", explanation: "$5\\cos x$." },
  { id: "std-p-8", prompt: "Choose the derivative of $3\\cos x$.", latex: "y=3\\cos x", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$3\\sin x$" }, { label: "B", text: "$-3\\sin x$" }, { label: "C", text: "$-3\\cos x$" }, { label: "D", text: "$3\\sec^2 x$" }], hint: "Cos gives $-\\sin$.", explanation: "$-3\\sin x$." },
  { id: "std-p-9", prompt: "Choose the derivative of $4e^x-\\ln x$.", latex: "y=4e^x-\\ln x", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$4e^x-x$" }, { label: "B", text: "$4e^x-\\ln x$" }, { label: "C", text: "$4e^x-\\frac{1}{x}$" }, { label: "D", text: "$4xe^{x-1}-\\frac{1}{x}$" }], hint: "Differentiate term by term.", explanation: "$4e^x-\\frac{1}{x}$." },
  { id: "std-p-10", prompt: "Choose the derivative of $2\\tan x+3\\ln x$.", latex: "y=2\\tan x+3\\ln x", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$2\\sec^2 x+\\frac{3}{x}$" }, { label: "B", text: "$2\\sec x+\\frac{3}{x}$" }, { label: "C", text: "$2\\sec^2 x+3\\ln x$" }, { label: "D", text: "$2\\sec^2 x+\\frac{1}{x}$" }], hint: "Tan to sec², ln to 1/x.", explanation: "$2\\sec^2 x+\\frac{3}{x}$." },
  { id: "std-p-11", prompt: "Choose the derivative of $7\\sin x+2\\cos x$.", latex: "y=7\\sin x+2\\cos x", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$7\\cos x+2\\sin x$" }, { label: "B", text: "$7\\cos x-2\\sin x$" }, { label: "C", text: "$-7\\cos x-2\\sin x$" }, { label: "D", text: "$7\\sin x-2\\cos x$" }], hint: "Cos term gives $-\\sin$.", explanation: "$7\\cos x-2\\sin x$." },
  // --- D3: clean evaluations (typed) ---
  { id: "std-p-12", prompt: "$f(x)=\\sin x+e^x$. Find $f'(0)$.", latex: "f(x)=\\sin x+e^x", answer: "2", difficulty: 3, acceptedAnswers: [], hint: "$\\cos 0+e^0$.", explanation: "$f'(x)=\\cos x+e^x$, so $f'(0)=1+1=2$." },
  { id: "std-p-13", prompt: "$f(x)=2\\cos x+3e^x$. Find $f'(0)$.", latex: "f(x)=2\\cos x+3e^x", answer: "3", difficulty: 3, acceptedAnswers: [], hint: "$-2\\sin 0+3e^0$.", explanation: "$f'(x)=-2\\sin x+3e^x$, so $f'(0)=0+3=3$." },
  { id: "std-p-14", prompt: "$f(x)=5\\cos x-3\\sin x$. Find $f'(0)$.", latex: "f(x)=5\\cos x-3\\sin x", answer: "-3", difficulty: 3, acceptedAnswers: ["−3"], hint: "$-5\\sin 0-3\\cos 0$.", explanation: "$f'(x)=-5\\sin x-3\\cos x$, so $f'(0)=0-3=-3$." },
  { id: "std-p-15", prompt: "$y=6\\ln x$. Find the gradient at $x=1$.", latex: "y=6\\ln x", answer: "6", difficulty: 3, acceptedAnswers: [], hint: "$\\frac{6}{x}$ at $x=1$.", explanation: "$y'=\\frac{6}{x}$, so at $x=1$ it is $6$." },
  { id: "std-p-16", prompt: "$y=4\\ln x$. Find the gradient at $x=2$.", latex: "y=4\\ln x", answer: "2", difficulty: 3, acceptedAnswers: [], hint: "$\\frac{4}{x}$ at $x=2$.", explanation: "$y'=\\frac{4}{x}$, so at $x=2$ it is $2$." },
  { id: "std-p-17", prompt: "$f(x)=\\sin x+2e^x$. Find $f'(0)$.", latex: "f(x)=\\sin x+2e^x", answer: "3", difficulty: 3, acceptedAnswers: [], hint: "$\\cos 0+2e^0$.", explanation: "$f'(x)=\\cos x+2e^x$, so $f'(0)=1+2=3$." },
  { id: "std-p-18", prompt: "Choose the derivative of $e^x+\\cos x$.", latex: "y=e^x+\\cos x", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$xe^{x-1}+\\sin x$" }, { label: "B", text: "$e^x+\\sin x$" }, { label: "C", text: "$e^x-\\cos x$" }, { label: "D", text: "$e^x-\\sin x$" }], hint: "Cos gives $-\\sin$.", explanation: "$e^x-\\sin x$." },
  { id: "std-p-19", prompt: "A student writes $\\frac{d}{dx}(\\cos x)=\\sin x$. The error is:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Should be $\\sec^2 x$" }, { label: "B", text: "Should be $\\frac{1}{x}$" }, { label: "C", text: "The negative sign is missing" }, { label: "D", text: "Cos cannot be differentiated" }], hint: "Check the sign.", explanation: "$\\frac{d}{dx}(\\cos x)=-\\sin x$; the minus sign was dropped." },
  // --- D4: combine multiple sub-skills / a^x ---
  { id: "std-p-20", prompt: "Choose the derivative of $3e^x-2\\cos x+\\tan x$.", latex: "y=3e^x-2\\cos x+\\tan x", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$3e^x+2\\sin x+\\sec^2 x$" }, { label: "B", text: "$3e^x-2\\sin x+\\sec^2 x$" }, { label: "C", text: "$3e^x+2\\cos x+\\sec^2 x$" }, { label: "D", text: "$e^x+2\\sin x+\\sec^2 x$" }], hint: "$-2\\cos x$ differentiates to $+2\\sin x$.", explanation: "$3e^x+2\\sin x+\\sec^2 x$." },
  { id: "std-p-21", prompt: "$f(x)=e^x+\\ln x$. Choose $f'(1)$.", latex: "f(x)=e^x+\\ln x", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$e+1$" }, { label: "B", text: "$e$" }, { label: "C", text: "$1$" }, { label: "D", text: "$2e$" }], hint: "$f'(x)=e^x+\\frac{1}{x}$.", explanation: "$f'(1)=e^1+\\frac{1}{1}=e+1$." },
  { id: "std-p-22", prompt: "Choose the derivative of $2^x$.", latex: "y=2^x", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$x\\cdot 2^{x-1}$" }, { label: "B", text: "$2^x$" }, { label: "C", text: "$2^x\\ln 2$" }, { label: "D", text: "$\\frac{2^x}{\\ln 2}$" }], hint: "$\\frac{d}{dx}(a^x)=a^x\\ln a$.", explanation: "$2^x\\ln 2$; the power rule does not apply when $x$ is the exponent." },
  { id: "std-p-23", prompt: "Choose the derivative of $5^x$.", latex: "y=5^x", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$5^x\\ln 5$" }, { label: "B", text: "$5x^4$" }, { label: "C", text: "$5^x$" }, { label: "D", text: "$\\ln 5$" }], hint: "$a^x\\ln a$ with $a=5$.", explanation: "$5^x\\ln 5$." },
  { id: "std-p-24", prompt: "$f(x)=4\\sin x+e^x$. Find $f'(0)$.", latex: "f(x)=4\\sin x+e^x", answer: "5", difficulty: 4, acceptedAnswers: [], hint: "$4\\cos 0+e^0$.", explanation: "$f'(x)=4\\cos x+e^x$, so $f'(0)=4+1=5$." },
  { id: "std-p-25", prompt: "$f(x)=\\tan x+\\sin x$. Find $f'(0)$.", latex: "f(x)=\\tan x+\\sin x", answer: "2", difficulty: 4, acceptedAnswers: [], hint: "$\\sec^2 0+\\cos 0$.", explanation: "$f'(x)=\\sec^2 x+\\cos x$; $\\sec 0=1$, so $f'(0)=1+1=2$." },
  { id: "std-p-26", prompt: "Which derivative rule applies to $\\ln x$?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$" }, { label: "B", text: "$\\frac{d}{dx}(\\ln x)=\\frac{1}{\\ln x}$" }, { label: "C", text: "$\\frac{d}{dx}(\\ln x)=e^x$" }, { label: "D", text: "$\\frac{d}{dx}(\\ln x)=x$" }], hint: "Standard log derivative.", explanation: "$\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$." },
  // --- D5: Band-6 — multi-step, select-and-combine, unfamiliar framing ---
  { id: "std-p-27", prompt: "$f(x)=3\\sin x+2e^x-\\ln x$. Find $f'(1)$ to 3 d.p., using $\\cos 1\\approx 0.540$ and $e\\approx 2.718$.", latex: "f(x)=3\\sin x+2e^x-\\ln x", answer: "6.056", difficulty: 5, acceptedAnswers: ["6.057", "6.06"], hint: "$f'(x)=3\\cos x+2e^x-\\frac{1}{x}$; substitute $x=1$.", explanation: "$f'(x)=3\\cos x+2e^x-\\frac{1}{x}$, so $f'(1)=3(0.540)+2(2.718)-1=1.620+5.436-1\\approx 6.056$." },
  { id: "std-p-28", prompt: "The curve $y=e^x+\\sin x$ has the same gradient as $y=2x$ where $e^x+\\cos x=2$. Verify which $x$-value works: at $x=0$ the gradient of $y=e^x+\\sin x$ is:", latex: "y=e^x+\\sin x", answer: "2", difficulty: 5, acceptedAnswers: [], hint: "$y'=e^x+\\cos x$ at $x=0$.", explanation: "$y'(0)=e^0+\\cos 0=1+1=2$, which matches the gradient of $y=2x$." },
  { id: "std-p-29", prompt: "For which function is the derivative equal to the original function?", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$\\sin x$" }, { label: "B", text: "$e^x$" }, { label: "C", text: "$\\ln x$" }, { label: "D", text: "$\\tan x$" }], hint: "Which derivative is unchanged?", explanation: "Only $e^x$ satisfies $f'(x)=f(x)$." },
  { id: "std-p-30", prompt: "$f(x)=a^x$ has $f'(0)=\\ln a$. If $f'(0)=\\ln 3$, then $a=$", latex: "f(x)=a^x,\\ f'(0)=\\ln a", answer: "3", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=a^x\\ln a$, so $f'(0)=\\ln a$.", explanation: "$f'(0)=a^0\\ln a=\\ln a$. Setting $\\ln a=\\ln 3$ gives $a=3$." },
  { id: "std-p-31", prompt: "$f(x)=\\sin x-\\cos x$. The smallest positive $x$ where $f'(x)=0$ satisfies $\\cos x+\\sin x=0$, i.e. $\\tan x=-1$. Find $f'(0)$.", latex: "f(x)=\\sin x-\\cos x", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=\\cos x+\\sin x$ at $x=0$.", explanation: "$f'(x)=\\cos x+\\sin x$, so $f'(0)=1+0=1$." },
  { id: "std-p-32", prompt: "$g(x)=2e^x+5\\ln x$. Find $g'(1)$ to 3 d.p. (use $e\\approx 2.718$).", latex: "g(x)=2e^x+5\\ln x", answer: "10.437", difficulty: 5, acceptedAnswers: ["10.44"], hint: "$g'(x)=2e^x+\\frac{5}{x}$ at $x=1$.", explanation: "$g'(1)=2(2.718)+5=5.437+5\\approx 10.437$." },
];

standardDerivativesLesson.multiPartPractice = [
  {
    id: "std-mp-1",
    prompt:
      "A curve is given by $f(x)=2\\sin x+3e^x$. You may use $f'(x)$ to answer the parts below.",
    latex: "f(x)=2\\sin x+3e^x",
    answer: "5",
    hint: "Differentiate to $f'(x)=2\\cos x+3e^x$, then substitute clean values.",
    explanation:
      "Here $f'(x)=2\\cos x+3e^x$. (a) $f'(0)=2(1)+3(1)$ gives 5. (b) The tangent at $x=0$ passes through the point $(0,f(0))=(0,3)$ with gradient 5, so its $y$-intercept is 3. (c) The second derivative is $f''(x)=-2\\sin x+3e^x$, giving $f''(0)=0+3$, that is 3.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find $f'(0)$.", latex: "f'(x)=2\\cos x+3e^x", marks: 2, answer: "5", acceptedAnswers: [], hint: "$2\\cos 0+3e^0$.", explanation: "$f'(0)=2(1)+3(1)=5$." },
      { key: "b", label: "(b)", prompt: "The tangent to the curve at $x=0$ is drawn. Find its $y$-intercept.", latex: "f(0)=2\\sin 0+3e^0", marks: 2, answer: "3", acceptedAnswers: [], hint: "The tangent passes through $(0,f(0))$.", explanation: "$f(0)=0+3=3$, and the tangent meets the $y$-axis at this point, so the intercept is $3$." },
      { key: "c", label: "(c)", prompt: "Find $f''(0)$.", latex: "f''(x)=-2\\sin x+3e^x", marks: 2, answer: "3", acceptedAnswers: [], hint: "Differentiate $f'$ again, then set $x=0$.", explanation: "$f''(x)=-2\\sin x+3e^x$, so $f''(0)=0+3=3$." },
    ],
  },
];

chainRuleLesson.masteryQuizPool = [
  // --- D1: identify structure / basic composite ---
  { id: "chain-p-1", prompt: "A linear expression is raised to the fifth power. Identify the inner function.", latex: "y=(\\,\\text{linear in }x\\,)^5", answer: "B", difficulty: 1, choices: [{ label: "A", text: "the fifth power" }, { label: "B", text: "$2x+3$" }, { label: "C", text: "$5$" }, { label: "D", text: "$x^5$" }], hint: "What is inside the bracket?", explanation: "The inner function is $2x+3$." },
  { id: "chain-p-2", prompt: "Choose the derivative of $(3x+1)^4$.", latex: "y=(3x+1)^4", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$4(3x+1)^3$" }, { label: "B", text: "$12(3x+1)^4$" }, { label: "C", text: "$12(3x+1)^3$" }, { label: "D", text: "$(3x+1)^3$" }], hint: "Multiply by the inner derivative 3.", explanation: "$4(3x+1)^3\\cdot 3=12(3x+1)^3$." },
  { id: "chain-p-3", prompt: "Choose the derivative of $\\sin(2x)$.", latex: "y=\\sin(2x)", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$2\\cos(2x)$" }, { label: "B", text: "$\\cos(2x)$" }, { label: "C", text: "$-2\\sin(2x)$" }, { label: "D", text: "$2\\sin(2x)$" }], hint: "Differentiate sin, multiply by 2.", explanation: "$2\\cos(2x)$." },
  { id: "chain-p-4", prompt: "Choose the derivative of $e^{5x-1}$.", latex: "y=e^{5x-1}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$e^{5x-1}$" }, { label: "B", text: "$5e^{5x-1}$" }, { label: "C", text: "$(5x-1)e^{5x-2}$" }, { label: "D", text: "$\\frac{5}{5x-1}$" }], hint: "Inner derivative is 5.", explanation: "$5e^{5x-1}$." },
  { id: "chain-p-5", prompt: "Choose the derivative of $\\ln(5x+2)$.", latex: "y=\\ln(5x+2)", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{5}{5x+2}$" }, { label: "B", text: "$\\frac{1}{5x+2}$" }, { label: "C", text: "$\\frac{5x+2}{5}$" }, { label: "D", text: "$5\\ln(5x+2)$" }], hint: "Use $g'/g$.", explanation: "$\\frac{5}{5x+2}$." },
  { id: "chain-p-6", prompt: "Choose the derivative of $\\cos(4x)$.", latex: "y=\\cos(4x)", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$4\\sin(4x)$" }, { label: "B", text: "$-\\sin(4x)$" }, { label: "C", text: "$\\cos(4x)$" }, { label: "D", text: "$-4\\sin(4x)$" }], hint: "Cos to $-\\sin$, times 4.", explanation: "$-4\\sin(4x)$." },
  // --- D2/D3: more composites + identify ---
  { id: "chain-p-7", prompt: "Choose the derivative of $(5x-2)^3$.", latex: "y=(5x-2)^3", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$3(5x-2)^2$" }, { label: "B", text: "$15(5x-2)^2$" }, { label: "C", text: "$15(5x-2)^3$" }, { label: "D", text: "$5(5x-2)^2$" }], hint: "Inner derivative 5.", explanation: "$3(5x-2)^2\\cdot 5=15(5x-2)^2$." },
  { id: "chain-p-8", prompt: "Choose the derivative of $\\sin(6x+1)$.", latex: "y=\\sin(6x+1)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$6\\cos(6x+1)$" }, { label: "B", text: "$\\cos(6x+1)$" }, { label: "C", text: "$-6\\sin(6x+1)$" }, { label: "D", text: "$6\\sin(6x+1)$" }], hint: "Times 6.", explanation: "$6\\cos(6x+1)$." },
  { id: "chain-p-9", prompt: "Choose the derivative of $e^{x^2}$.", latex: "y=e^{x^2}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$e^{x^2}$" }, { label: "B", text: "$2xe^x$" }, { label: "C", text: "$2xe^{x^2}$" }, { label: "D", text: "$x^2e^{x^2}$" }], hint: "Inner derivative is $2x$.", explanation: "$2xe^{x^2}$." },
  { id: "chain-p-10", prompt: "Choose the derivative of $\\sin(x^2+1)$.", latex: "y=\\sin(x^2+1)", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\cos(x^2+1)$" }, { label: "B", text: "$2x\\sin(x^2+1)$" }, { label: "C", text: "$2x\\cos(x^2+1)$" }, { label: "D", text: "$-2x\\sin(x^2+1)$" }], hint: "Inner derivative $2x$, sin to cos.", explanation: "$2x\\cos(x^2+1)$." },
  { id: "chain-p-11", prompt: "Choose the derivative of $\\ln(7x-1)$.", latex: "y=\\ln(7x-1)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{7}{7x-1}$" }, { label: "B", text: "$\\frac{1}{7x-1}$" }, { label: "C", text: "$7\\ln(7x-1)$" }, { label: "D", text: "$\\frac{7x-1}{7}$" }], hint: "$g'/g$.", explanation: "$\\frac{7}{7x-1}$." },
  { id: "chain-p-12", prompt: "Choose the derivative of $\\cos(2x-3)$.", latex: "y=\\cos(2x-3)", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$2\\sin(2x-3)$" }, { label: "B", text: "$-\\sin(2x-3)$" }, { label: "C", text: "$\\cos(2x-3)$" }, { label: "D", text: "$-2\\sin(2x-3)$" }], hint: "Cos to $-\\sin$, times 2.", explanation: "$-2\\sin(2x-3)$." },
  // --- D3: clean typed evaluations ---
  { id: "chain-p-13", prompt: "$y=(x+2)^3$. Find $y'$ at $x=0$.", latex: "y=(x+2)^3", answer: "12", difficulty: 3, acceptedAnswers: [], hint: "$y'=3(x+2)^2$.", explanation: "$y'=3(x+2)^2$; at $x=0$, $y'=3(4)=12$." },
  { id: "chain-p-14", prompt: "$y=(2x-1)^4$. Find the gradient at $x=1$.", latex: "y=(2x-1)^4", answer: "8", difficulty: 3, acceptedAnswers: [], hint: "$y'=8(2x-1)^3$.", explanation: "$y'=4(2x-1)^3\\cdot 2=8(2x-1)^3$; at $x=1$, $y'=8(1)=8$." },
  { id: "chain-p-15", prompt: "$y=(3x+2)^2$. Find $y'$ at $x=0$.", latex: "y=(3x+2)^2", answer: "12", difficulty: 3, acceptedAnswers: [], hint: "$y'=6(3x+2)$.", explanation: "$y'=2(3x+2)\\cdot 3=6(3x+2)$; at $x=0$, $y'=6(2)=12$." },
  { id: "chain-p-16", prompt: "$f(x)=\\ln(3x+1)$. Find $f'(1)$.", latex: "f(x)=\\ln(3x+1)", answer: "3/4", difficulty: 4, acceptedAnswers: ["0.75"], hint: "$f'(x)=\\frac{3}{3x+1}$.", explanation: "$f'(x)=\\frac{3}{3x+1}$; at $x=1$, $f'(1)=\\frac{3}{4}$." },
  { id: "chain-p-17", prompt: "$f(x)=e^{2x}$. Find $f'(0)$.", latex: "f(x)=e^{2x}", answer: "2", difficulty: 3, acceptedAnswers: [], hint: "$f'(x)=2e^{2x}$.", explanation: "$f'(x)=2e^{2x}$; at $x=0$, $f'(0)=2$." },
  { id: "chain-p-18", prompt: "$f(x)=\\sin(3x)$. Find $f'(0)$.", latex: "f(x)=\\sin(3x)", answer: "3", difficulty: 3, acceptedAnswers: [], hint: "$f'(x)=3\\cos(3x)$.", explanation: "$f'(x)=3\\cos(3x)$; at $x=0$, $f'(0)=3$." },
  // --- D4: error spotting / mixed ---
  { id: "chain-p-19", prompt: "A student writes $\\frac{d}{dx}e^{2x+5}=e^{2x+5}$. The error is:", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "The derivative of $e$ is zero" }, { label: "B", text: "The inner derivative 2 is missing" }, { label: "C", text: "The sign should be negative" }, { label: "D", text: "The quotient rule is needed" }], hint: "Chain rule multiplies by $g'(x)$.", explanation: "The correct derivative is $2e^{2x+5}$; the factor of 2 was dropped." },
  { id: "chain-p-20", prompt: "Choose the derivative of $e^{2x}-\\ln(3x+4)$.", latex: "y=e^{2x}-\\ln(3x+4)", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$e^{2x}-\\frac{1}{3x+4}$" }, { label: "B", text: "$2e^x-\\frac{3}{3x+4}$" }, { label: "C", text: "$2e^{2x}-\\ln(3x+4)$" }, { label: "D", text: "$2e^{2x}-\\frac{3}{3x+4}$" }], hint: "Chain rule on both terms.", explanation: "$2e^{2x}-\\frac{3}{3x+4}$." },
  { id: "chain-p-21", prompt: "Choose the derivative of $(x^2+1)^3$.", latex: "y=(x^2+1)^3", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$6x(x^2+1)^2$" }, { label: "B", text: "$3(x^2+1)^2$" }, { label: "C", text: "$2x(x^2+1)^2$" }, { label: "D", text: "$6(x^2+1)^2$" }], hint: "Inner derivative is $2x$.", explanation: "$3(x^2+1)^2\\cdot 2x=6x(x^2+1)^2$." },
  { id: "chain-p-22", prompt: "Choose the derivative of $\\cos(x^2)$.", latex: "y=\\cos(x^2)", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$-\\sin(x^2)$" }, { label: "B", text: "$-2x\\sin(x^2)$" }, { label: "C", text: "$2x\\sin(x^2)$" }, { label: "D", text: "$-2x\\cos(x^2)$" }], hint: "Cos to $-\\sin$, inner $2x$.", explanation: "$-2x\\sin(x^2)$." },
  { id: "chain-p-23", prompt: "$f(x)=(2x+1)^5$. Find $f'(0)$.", latex: "f(x)=(2x+1)^5", answer: "10", difficulty: 4, acceptedAnswers: [], hint: "$f'(x)=10(2x+1)^4$.", explanation: "$f'(x)=5(2x+1)^4\\cdot 2=10(2x+1)^4$; at $x=0$, $f'(0)=10(1)=10$." },
  { id: "chain-p-24", prompt: "$f(x)=\\ln(x^2+1)$. Find $f'(1)$.", latex: "f(x)=\\ln(x^2+1)", answer: "1", difficulty: 4, acceptedAnswers: [], hint: "$f'(x)=\\frac{2x}{x^2+1}$.", explanation: "$f'(x)=\\frac{2x}{x^2+1}$; at $x=1$, $f'(1)=\\frac{2}{2}=1$." },
  // --- D5: Band-6 — chain inside, double application, unfamiliar ---
  { id: "chain-p-25", prompt: "$f(x)=e^{\\sin x}$. Find $f'(0)$.", latex: "f(x)=e^{\\sin x}", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=\\cos x\\,e^{\\sin x}$.", explanation: "$f'(x)=e^{\\sin x}\\cdot\\cos x$; at $x=0$, $f'(0)=e^0\\cos 0=1\\cdot 1=1$." },
  { id: "chain-p-26", prompt: "$f(x)=\\sin(e^x)$. Find $f'(0)$ to 3 d.p. (use $\\cos 1\\approx 0.540$).", latex: "f(x)=\\sin(e^x)", answer: "0.540", difficulty: 5, acceptedAnswers: ["0.54"], hint: "$f'(x)=e^x\\cos(e^x)$ at $x=0$.", explanation: "$f'(x)=\\cos(e^x)\\cdot e^x$; at $x=0$, $f'(0)=\\cos(1)\\cdot 1\\approx 0.540$." },
  { id: "chain-p-27", prompt: "$f(x)=\\ln(\\cos x)$ near $x=0$. Find $f'(0)$.", latex: "f(x)=\\ln(\\cos x)", answer: "0", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=\\frac{-\\sin x}{\\cos x}=-\\tan x$.", explanation: "$f'(x)=\\frac{-\\sin x}{\\cos x}=-\\tan x$; at $x=0$, $f'(0)=-\\tan 0=0$." },
  { id: "chain-p-28", prompt: "$f(x)=(e^x+1)^2$. Find $f'(0)$.", latex: "f(x)=(e^x+1)^2", answer: "4", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=2(e^x+1)\\cdot e^x$.", explanation: "$f'(x)=2(e^x+1)\\cdot e^x$; at $x=0$, $f'(0)=2(2)(1)=4$." },
  { id: "chain-p-29", prompt: "$f(x)=\\cos^2 x=(\\cos x)^2$. Find $f'\\!\\left(\\frac{\\pi}{4}\\right)$.", latex: "f(x)=(\\cos x)^2", answer: "-1", difficulty: 5, acceptedAnswers: ["−1"], hint: "$f'(x)=2\\cos x(-\\sin x)=-\\sin(2x)$.", explanation: "$f'(x)=2\\cos x\\cdot(-\\sin x)=-2\\sin x\\cos x=-\\sin(2x)$; at $x=\\frac{\\pi}{4}$, $-\\sin\\frac{\\pi}{2}=-1$." },
  { id: "chain-p-30", prompt: "$y=\\ln(2x+1)$ has gradient equal to $1$ where $\\frac{2}{2x+1}=1$. Solve for $x$.", latex: "\\frac{2}{2x+1}=1", answer: "1/2", difficulty: 5, acceptedAnswers: ["0.5"], hint: "$2=2x+1$.", explanation: "$\\frac{2}{2x+1}=1\\Rightarrow 2x+1=2\\Rightarrow x=\\frac{1}{2}$." },
  { id: "chain-p-31", prompt: "$f(x)=e^{3x}$. Find the value of $x$ where $f'(x)=3$.", latex: "f'(x)=3e^{3x}", answer: "0", difficulty: 5, acceptedAnswers: [], hint: "$3e^{3x}=3\\Rightarrow e^{3x}=1$.", explanation: "$f'(x)=3e^{3x}$; setting $3e^{3x}=3$ gives $e^{3x}=1$, so $3x=0$ and $x=0$." },
  { id: "chain-p-32", prompt: "Choose the derivative of $\\sin^3 x=(\\sin x)^3$.", latex: "y=(\\sin x)^3", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$3\\sin^2 x\\cos x$" }, { label: "B", text: "$3\\sin^2 x$" }, { label: "C", text: "$3\\cos^2 x\\sin x$" }, { label: "D", text: "$\\cos^3 x$" }], hint: "Power 3 outer, inner $\\cos x$.", explanation: "$3(\\sin x)^2\\cdot\\cos x=3\\sin^2 x\\cos x$." },
];

chainRuleLesson.multiPartPractice = [
  {
    id: "chain-mp-1",
    prompt:
      "A curve is defined by $y=(2x+1)^4$. Use the chain rule throughout.",
    latex: "y=(2x+1)^4",
    answer: "8",
    hint: "$\\frac{dy}{dx}=8(2x+1)^3$, then substitute the required $x$.",
    explanation:
      "$\\frac{dy}{dx}=4(2x+1)^3\\cdot 2=8(2x+1)^3$. (a) At $x=0$, $\\frac{dy}{dx}=8(1)^3=8$. (b) At $x=1$, $\\frac{dy}{dx}=8(3)^3=216$. (c) $\\frac{dy}{dx}=0$ requires $(2x+1)^3=0$, i.e. $x=-\\frac{1}{2}$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the gradient at $x=0$.", latex: "8(2x+1)^3", marks: 2, answer: "8", acceptedAnswers: [], hint: "$8(2(0)+1)^3$.", explanation: "$8(1)^3=8$." },
      { key: "b", label: "(b)", prompt: "Find the gradient at $x=1$.", latex: "8(2x+1)^3", marks: 2, answer: "216", acceptedAnswers: [], hint: "$8(3)^3$.", explanation: "$8(3)^3=8(27)=216$." },
      { key: "c", label: "(c)", prompt: "Find the $x$-value where the gradient is $0$.", latex: "8(2x+1)^3=0", marks: 2, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "Set $2x+1=0$.", explanation: "$8(2x+1)^3=0\\Rightarrow 2x+1=0\\Rightarrow x=-\\frac{1}{2}$." },
    ],
  },
];

productQuotientRulesLesson.masteryQuizPool = [
  // --- D1/D2: identify rule + basic product ---
  { id: "pq-p-1", prompt: "Which rule is most direct for $y=x\\sin x$?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Product rule" }, { label: "B", text: "Quotient rule" }, { label: "C", text: "Chain rule only" }, { label: "D", text: "Standard derivative only" }], hint: "Two factors multiplied.", explanation: "A product of $x$ and $\\sin x$ needs the product rule." },
  { id: "pq-p-2", prompt: "Which rule is most direct for $y=\\frac{\\ln x}{x}$?", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "Chain rule only" }, { label: "B", text: "Product rule only" }, { label: "C", text: "Quotient rule" }, { label: "D", text: "Standard derivative" }], hint: "One expression divided by another.", explanation: "A quotient of two variable expressions needs the quotient rule." },
  { id: "pq-p-3", prompt: "The product rule for $fg$ is:", latex: "\\text{Choose one}", answer: "D", difficulty: 1, choices: [{ label: "A", text: "$f'g'$" }, { label: "B", text: "$fg$" }, { label: "C", text: "$f'g-fg'$" }, { label: "D", text: "$f'g+fg'$" }], hint: "Two terms, both add.", explanation: "$\\frac{d}{dx}(fg)=f'g+fg'$." },
  { id: "pq-p-4", prompt: "The quotient-rule numerator for $\\frac{f}{g}$ is:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$fg'-f'g$" }, { label: "B", text: "$f'g-fg'$" }, { label: "C", text: "$f'g+fg'$" }, { label: "D", text: "$fg$" }], hint: "Order matters.", explanation: "Numerator is $f'g-fg'$, all over $g^2$." },
  { id: "pq-p-5", prompt: "Choose the derivative of $xe^x$.", latex: "y=xe^x", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$e^x$" }, { label: "B", text: "$e^x+xe^x$" }, { label: "C", text: "$xe^x$" }, { label: "D", text: "$x+e^x$" }], hint: "$f=x$, $g=e^x$.", explanation: "$1\\cdot e^x+x\\cdot e^x=e^x+xe^x$." },
  { id: "pq-p-6", prompt: "Choose the derivative of $x\\sin x$.", latex: "y=x\\sin x", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$x\\cos x$" }, { label: "B", text: "$\\sin x\\cos x$" }, { label: "C", text: "$\\sin x+x\\cos x$" }, { label: "D", text: "$\\cos x-x\\sin x$" }], hint: "$f'g+fg'$.", explanation: "$1\\cdot\\sin x+x\\cos x=\\sin x+x\\cos x$." },
  { id: "pq-p-7", prompt: "Choose the derivative of $x\\cos x$.", latex: "y=x\\cos x", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\cos x-x\\sin x$" }, { label: "B", text: "$-x\\sin x$" }, { label: "C", text: "$\\sin x+x\\cos x$" }, { label: "D", text: "$\\cos x+x\\sin x$" }], hint: "$\\frac{d}{dx}\\cos x=-\\sin x$.", explanation: "$1\\cdot\\cos x+x(-\\sin x)=\\cos x-x\\sin x$." },
  { id: "pq-p-8", prompt: "Choose the derivative of $x^2e^x$.", latex: "y=x^2e^x", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$2xe^x$" }, { label: "B", text: "$x^2e^x$" }, { label: "C", text: "$2x^2e^x$" }, { label: "D", text: "$2xe^x+x^2e^x$" }], hint: "$f=x^2$, $g=e^x$.", explanation: "$2xe^x+x^2e^x$." },
  { id: "pq-p-9", prompt: "Which rule is most direct for $y=\\frac{\\sin x}{x}$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Product rule" }, { label: "B", text: "Quotient rule" }, { label: "C", text: "Chain rule only" }, { label: "D", text: "Standard derivative only" }], hint: "Sin x divided by x.", explanation: "Quotient rule." },
  { id: "pq-p-10", prompt: "Which rule is most direct for $y=(x^2+1)e^x$?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Product rule" }, { label: "B", text: "Quotient rule" }, { label: "C", text: "Limiting sum" }, { label: "D", text: "First derivative test" }], hint: "Two factors multiplied.", explanation: "Product of two variable functions." },
  // --- D3: quotient derivatives ---
  { id: "pq-p-11", prompt: "Choose the derivative of $\\frac{\\ln x}{x}$.", latex: "y=\\frac{\\ln x}{x}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{1-\\ln x}{x^2}$" }, { label: "B", text: "$\\frac{\\ln x-1}{x^2}$" }, { label: "C", text: "$\\frac{1}{x^2}$" }, { label: "D", text: "$\\frac{1+\\ln x}{x^2}$" }], hint: "$f=\\ln x$, $g=x$.", explanation: "$\\frac{(1/x)x-\\ln x}{x^2}=\\frac{1-\\ln x}{x^2}$." },
  { id: "pq-p-12", prompt: "Choose the derivative of $\\frac{x}{e^x}$.", latex: "y=\\frac{x}{e^x}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac{e^x}{e^{2x}}$" }, { label: "B", text: "$\\frac{xe^x-e^x}{e^{2x}}$" }, { label: "C", text: "$\\frac{e^x-xe^x}{e^{2x}}$" }, { label: "D", text: "$\\frac{1}{e^x}$" }], hint: "$f=x$, $g=e^x$.", explanation: "$\\frac{1\\cdot e^x-x e^x}{e^{2x}}=\\frac{e^x-xe^x}{e^{2x}}$." },
  { id: "pq-p-13", prompt: "Choose the correct quotient-rule setup for $\\frac{e^x}{x^2+1}$.", latex: "y=\\frac{e^x}{x^2+1}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\frac{e^x(x^2+1)+e^x(2x)}{(x^2+1)^2}$" }, { label: "B", text: "$\\frac{e^x(x^2+1)-e^x(2x)}{(x^2+1)^2}$" }, { label: "C", text: "$\\frac{e^x-2x}{x^2+1}$" }, { label: "D", text: "$\\frac{e^x(2x)-e^x(x^2+1)}{(x^2+1)^2}$" }], hint: "$f'g-fg'$.", explanation: "$\\frac{e^x(x^2+1)-e^x(2x)}{(x^2+1)^2}$." },
  { id: "pq-p-14", prompt: "Choose the correct quotient-rule setup for $\\frac{\\sin x}{x+1}$.", latex: "y=\\frac{\\sin x}{x+1}", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$\\frac{\\cos x(x+1)+\\sin x}{(x+1)^2}$" }, { label: "B", text: "$\\frac{\\sin x(x+1)-\\cos x}{(x+1)^2}$" }, { label: "C", text: "$\\frac{\\cos x-\\sin x}{x+1}$" }, { label: "D", text: "$\\frac{\\cos x(x+1)-\\sin x}{(x+1)^2}$" }], hint: "$f'g-fg'$ over $g^2$.", explanation: "$\\frac{\\cos x(x+1)-\\sin x\\cdot 1}{(x+1)^2}$." },
  // --- D3/D4: clean typed evaluations ---
  { id: "pq-p-15", prompt: "$y=xe^x$. Find $y'$ at $x=0$.", latex: "y=xe^x", answer: "1", difficulty: 3, acceptedAnswers: [], hint: "$y'=e^x+xe^x$.", explanation: "$y'=e^x+xe^x$; at $x=0$, $y'=1+0=1$." },
  { id: "pq-p-16", prompt: "$y=x\\cos x$. Find $y'$ at $x=0$.", latex: "y=x\\cos x", answer: "1", difficulty: 3, acceptedAnswers: [], hint: "$y'=\\cos x-x\\sin x$.", explanation: "$y'=\\cos x-x\\sin x$; at $x=0$, $y'=1-0=1$." },
  { id: "pq-p-17", prompt: "$y=x\\ln x$. Find $y'$ at $x=1$.", latex: "y=x\\ln x", answer: "1", difficulty: 3, acceptedAnswers: [], hint: "$y'=\\ln x+1$.", explanation: "$y'=1\\cdot\\ln x+x\\cdot\\frac{1}{x}=\\ln x+1$; at $x=1$, $y'=0+1=1$." },
  { id: "pq-p-18", prompt: "$y=x\\sin x$. Find $y'$ at $x=0$.", latex: "y=x\\sin x", answer: "0", difficulty: 3, acceptedAnswers: [], hint: "$y'=\\sin x+x\\cos x$.", explanation: "$y'=\\sin x+x\\cos x$; at $x=0$, $y'=0+0=0$." },
  { id: "pq-p-19", prompt: "$y=x^2e^x$. Find $y'$ at $x=0$.", latex: "y=x^2e^x", answer: "0", difficulty: 4, acceptedAnswers: [], hint: "$y'=2xe^x+x^2e^x$.", explanation: "$y'=2xe^x+x^2e^x=xe^x(2+x)$; at $x=0$, $y'=0$." },
  { id: "pq-p-20", prompt: "$y=xe^x$. Choose $y'$ at $x=1$.", latex: "y=xe^x", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$e$" }, { label: "B", text: "$1$" }, { label: "C", text: "$e+1$" }, { label: "D", text: "$2e$" }], hint: "$y'=e^x+xe^x$.", explanation: "$y'=e^x+xe^x$; at $x=1$, $y'=e+e=2e$." },
  // --- D3: error spotting ---
  { id: "pq-p-21", prompt: "A student differentiates $x\\sin x$ as $\\cos x$. The error is:", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "The quotient-rule sign is reversed" }, { label: "B", text: "$\\frac{d}{dx}\\sin x=-\\cos x$" }, { label: "C", text: "The expression is constant" }, { label: "D", text: "The product rule was not applied" }], hint: "Both factors vary.", explanation: "$x$ and $\\sin x$ both vary, so the product rule is required: $\\sin x+x\\cos x$." },
  { id: "pq-p-22", prompt: "A student writes $\\frac{d}{dx}(fg)=f'g'$. The error is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "The product rule has two terms: $f'g+fg'$" }, { label: "B", text: "It should be $f'g-fg'$" }, { label: "C", text: "It should be $fg$" }, { label: "D", text: "No error" }], hint: "Count the terms.", explanation: "$\\frac{d}{dx}(fg)=f'g+fg'$, not $f'g'$." },
  // --- D4: combine product + standard ---
  { id: "pq-p-23", prompt: "Choose the derivative of $x^2\\ln x$.", latex: "y=x^2\\ln x", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$2x\\ln x+x$" }, { label: "B", text: "$2x\\ln x$" }, { label: "C", text: "$2x+\\frac{1}{x}$" }, { label: "D", text: "$x\\ln x+x$" }], hint: "$f=x^2$, $g=\\ln x$.", explanation: "$2x\\ln x+x^2\\cdot\\frac{1}{x}=2x\\ln x+x$." },
  { id: "pq-p-24", prompt: "Choose the derivative of $e^x\\sin x$.", latex: "y=e^x\\sin x", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$e^x\\cos x$" }, { label: "B", text: "$e^x\\sin x+e^x\\cos x$" }, { label: "C", text: "$e^x\\cos x-e^x\\sin x$" }, { label: "D", text: "$e^x\\cos x\\sin x$" }], hint: "$f=e^x$, $g=\\sin x$.", explanation: "$e^x\\sin x+e^x\\cos x=e^x(\\sin x+\\cos x)$." },
  { id: "pq-p-25", prompt: "Choose the derivative of $x\\ln x+\\frac{\\sin x}{x}$.", latex: "y=x\\ln x+\\frac{\\sin x}{x}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$\\ln x+\\frac{x\\cos x-\\sin x}{x^2}$" }, { label: "B", text: "$1+\\ln x+\\cos x$" }, { label: "C", text: "$\\ln x+1+\\frac{x\\cos x-\\sin x}{x^2}$" }, { label: "D", text: "$\\ln x+1+\\frac{\\sin x-x\\cos x}{x^2}$" }], hint: "Product rule then quotient rule.", explanation: "$(\\ln x+1)+\\frac{x\\cos x-\\sin x}{x^2}$." },
  // --- D5: Band-6 — multi-step evaluations, select rule, unfamiliar ---
  { id: "pq-p-26", prompt: "$f(x)=e^x\\sin x$. Find $f'(0)$.", latex: "f(x)=e^x\\sin x", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=e^x(\\sin x+\\cos x)$.", explanation: "$f'(x)=e^x\\sin x+e^x\\cos x=e^x(\\sin x+\\cos x)$; at $x=0$, $f'(0)=1(0+1)=1$." },
  { id: "pq-p-27", prompt: "$f(x)=e^x\\cos x$. Find $f'(0)$.", latex: "f(x)=e^x\\cos x", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=e^x(\\cos x-\\sin x)$.", explanation: "$f'(x)=e^x\\cos x-e^x\\sin x=e^x(\\cos x-\\sin x)$; at $x=0$, $f'(0)=1(1-0)=1$." },
  { id: "pq-p-28", prompt: "$f(x)=\\frac{e^x}{x}$. Find $f'(1)$.", latex: "f(x)=\\frac{e^x}{x}", answer: "0", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=\\frac{xe^x-e^x}{x^2}$.", explanation: "$f'(x)=\\frac{e^x\\cdot x-e^x\\cdot 1}{x^2}=\\frac{e^x(x-1)}{x^2}$; at $x=1$, the numerator is $0$, so $f'(1)=0$." },
  { id: "pq-p-29", prompt: "$f(x)=x^2\\ln x$. Find $f'(1)$.", latex: "f(x)=x^2\\ln x", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=2x\\ln x+x$.", explanation: "$f'(x)=2x\\ln x+x$; at $x=1$, $f'(1)=2(1)(0)+1=1$." },
  { id: "pq-p-30", prompt: "$y=x\\ln x$ has a stationary point where $\\ln x+1=0$. Find that $x$ to 3 d.p.", latex: "y'=\\ln x+1=0", answer: "0.368", difficulty: 5, acceptedAnswers: ["0.37", "1/e"], hint: "$\\ln x=-1\\Rightarrow x=e^{-1}$.", explanation: "$\\ln x+1=0\\Rightarrow \\ln x=-1\\Rightarrow x=e^{-1}\\approx 0.368$." },
  { id: "pq-p-31", prompt: "$f(x)=\\frac{x}{e^x}$ has $f'(x)=\\frac{e^x-xe^x}{e^{2x}}=\\frac{1-x}{e^x}$. Find the stationary $x$-value.", latex: "f'(x)=\\frac{1-x}{e^x}", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "Set the numerator $1-x=0$.", explanation: "$e^x\\ne 0$, so $f'(x)=0$ when $1-x=0$, i.e. $x=1$." },
  { id: "pq-p-32", prompt: "Choose the derivative of $\\frac{\\cos x}{e^x}$.", latex: "y=\\frac{\\cos x}{e^x}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\frac{-\\sin x-\\cos x}{e^x}$" }, { label: "B", text: "$\\frac{-\\sin x+\\cos x}{e^x}$" }, { label: "C", text: "$\\frac{\\sin x-\\cos x}{e^x}$" }, { label: "D", text: "$\\frac{-\\sin x}{e^x}$" }], hint: "$f=\\cos x$, $g=e^x$; cancel one $e^x$.", explanation: "$\\frac{-\\sin x\\cdot e^x-\\cos x\\cdot e^x}{e^{2x}}=\\frac{-\\sin x-\\cos x}{e^x}$." },
];

productQuotientRulesLesson.multiPartPractice = [
  {
    id: "pq-mp-1",
    prompt:
      "Consider the curve $f(x)=xe^x$. Use the product rule throughout.",
    latex: "f(x)=xe^x",
    answer: "1",
    hint: "$f'(x)=e^x+xe^x=e^x(1+x)$; substitute the required values.",
    explanation:
      "$f'(x)=e^x+xe^x=e^x(1+x)$. (a) $f'(0)=e^0(1+0)=1$. (b) A stationary point needs $f'(x)=0$; since $e^x\\ne 0$, $1+x=0$ gives $x=-1$. (c) The second derivative is $f''(x)=e^x(2+x)$, so $f''(0)=2$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find $f'(0)$.", latex: "f'(x)=e^x(1+x)", marks: 2, answer: "1", acceptedAnswers: [], hint: "$e^0(1+0)$.", explanation: "$f'(0)=1\\cdot 1=1$." },
      { key: "b", label: "(b)", prompt: "Find the $x$-value of the stationary point.", latex: "e^x(1+x)=0", marks: 2, answer: "-1", acceptedAnswers: ["−1"], hint: "$e^x$ is never zero.", explanation: "Since $e^x\\ne 0$, set $1+x=0$, giving $x=-1$." },
      { key: "c", label: "(c)", prompt: "Find $f''(0)$.", latex: "f''(x)=e^x(2+x)", marks: 2, answer: "2", acceptedAnswers: [], hint: "Differentiate $f'(x)=e^x(1+x)$ again.", explanation: "$f''(x)=e^x(1+x)+e^x=e^x(2+x)$, so $f''(0)=2$." },
    ],
  },
];

applicationsExtendedDifferentiationLesson.masteryQuizPool = [
  // --- D1/D2: basics ---
  { id: "app-p-1", prompt: "The tangent gradient at a point equals:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "the $y$-value" }, { label: "B", text: "the derivative value $f'(a)$" }, { label: "C", text: "the second derivative" }, { label: "D", text: "zero always" }], hint: "Gradient is the derivative.", explanation: "The tangent gradient is $f'(a)$." },
  { id: "app-p-2", prompt: "The normal gradient is:", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "the same as the tangent gradient" }, { label: "B", text: "$f'(a)$" }, { label: "C", text: "the negative reciprocal of the tangent gradient" }, { label: "D", text: "always zero" }], hint: "Normals are perpendicular.", explanation: "$m_N=-\\frac{1}{m_T}$." },
  { id: "app-p-3", prompt: "Stationary points are found by solving:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$f(x)=0$" }, { label: "B", text: "$f'(x)=0$" }, { label: "C", text: "$f''(x)=0$ only" }, { label: "D", text: "$x=0$" }], hint: "Zero gradient.", explanation: "Stationary points occur where $f'(x)=0$." },
  { id: "app-p-4", prompt: "$y=(x+2)^2$. Find the tangent gradient at $x=1$.", latex: "y=(x+2)^2", answer: "6", difficulty: 2, acceptedAnswers: [], hint: "$y'=2(x+2)$.", explanation: "$y'=2(x+2)$; at $x=1$, $y'=2(3)=6$." },
  { id: "app-p-5", prompt: "The tangent gradient is $5$. Find the normal gradient.", latex: "m_T=5", answer: "-1/5", difficulty: 2, acceptedAnswers: ["-0.2", "−1/5", "−0.2"], hint: "Negative reciprocal.", explanation: "$m_N=-\\frac{1}{5}$." },
  { id: "app-p-6", prompt: "$f'(x)=2x-6$. Find the stationary $x$-value.", latex: "f'(x)=2x-6", answer: "3", difficulty: 2, acceptedAnswers: [], hint: "Set $2x-6=0$.", explanation: "$2x-6=0\\Rightarrow x=3$." },
  { id: "app-p-7", prompt: "$f'(x)=3x+6$. Find the stationary $x$-value.", latex: "f'(x)=3x+6", answer: "-2", difficulty: 2, acceptedAnswers: ["−2"], hint: "Set $3x+6=0$.", explanation: "$3x+6=0\\Rightarrow x=-2$." },
  // --- D3: chain/product derivatives in context ---
  { id: "app-p-8", prompt: "$y=(3x-1)^2$. Find the tangent gradient at $x=1$.", latex: "y=(3x-1)^2", answer: "12", difficulty: 3, acceptedAnswers: [], hint: "$y'=6(3x-1)$.", explanation: "$y'=2(3x-1)\\cdot 3=6(3x-1)$; at $x=1$, $y'=6(2)=12$." },
  { id: "app-p-9", prompt: "$y=(2x+1)^3$. Find the tangent gradient at $x=1$.", latex: "y=(2x+1)^3", answer: "54", difficulty: 3, acceptedAnswers: [], hint: "$y'=6(2x+1)^2$.", explanation: "$y'=3(2x+1)^2\\cdot 2=6(2x+1)^2$; at $x=1$, $y'=6(9)=54$." },
  { id: "app-p-10", prompt: "$y=e^{2x}$. Find the tangent gradient at $x=0$.", latex: "y=e^{2x}", answer: "2", difficulty: 3, acceptedAnswers: [], hint: "$y'=2e^{2x}$.", explanation: "$y'=2e^{2x}$; at $x=0$, $y'=2$." },
  { id: "app-p-11", prompt: "$s(t)=e^{3t}$. Find the rate at $t=0$.", latex: "s(t)=e^{3t}", answer: "3", difficulty: 3, acceptedAnswers: [], hint: "$s'(t)=3e^{3t}$.", explanation: "$s'(t)=3e^{3t}$; at $t=0$, the rate is $3$." },
  { id: "app-p-12", prompt: "$f(t)=\\sin(2t)+t$. Find $f'(0)$.", latex: "f(t)=\\sin(2t)+t", answer: "3", difficulty: 3, acceptedAnswers: [], hint: "$f'(t)=2\\cos(2t)+1$.", explanation: "$f'(t)=2\\cos(2t)+1$; at $t=0$, $f'(0)=2+1=3$." },
  { id: "app-p-13", prompt: "A curve has tangent gradient $-3$. The normal gradient is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{1}{3}$" }, { label: "B", text: "$-\\frac{1}{3}$" }, { label: "C", text: "$3$" }, { label: "D", text: "$-3$" }], hint: "Negative reciprocal of $-3$.", explanation: "$m_N=-\\frac{1}{-3}=\\frac{1}{3}$." },
  { id: "app-p-14", prompt: "$f(x)=x\\ln x$. Find $f'(1)$.", latex: "f(x)=x\\ln x", answer: "1", difficulty: 3, acceptedAnswers: [], hint: "$f'(x)=\\ln x+1$.", explanation: "$f'(x)=\\ln x+1$; at $x=1$, $f'(1)=0+1=1$." },
  // --- D4: stationary points from product/log, tangent equations ---
  { id: "app-p-15", prompt: "$f'(x)=e^x(x+1)$. Find the stationary $x$-value.", latex: "f'(x)=e^x(x+1)", answer: "-1", difficulty: 4, acceptedAnswers: ["−1"], hint: "$e^x\\ne 0$.", explanation: "$e^x$ is never zero, so set $x+1=0$, giving $x=-1$." },
  { id: "app-p-16", prompt: "$f(x)=e^x(x-3)$ has $f'(x)=e^x(x-2)$. Choose the stationary $x$-value.", latex: "f(x)=e^x(x-3)", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$x=2$, since $e^x$ is never zero" }, { label: "B", text: "$x=0$" }, { label: "C", text: "$x=3$" }, { label: "D", text: "$x=-2$" }], hint: "Set $x-2=0$.", explanation: "$f'(x)=e^x(x-2)$; since $e^x\\ne 0$, $x=2$." },
  { id: "app-p-17", prompt: "Choose the tangent line to $y=e^x$ at $x=0$.", latex: "y=e^x", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$y=x$" }, { label: "B", text: "$y=2x+1$" }, { label: "C", text: "$y=x+1$" }, { label: "D", text: "$y=-x+1$" }], hint: "Point $(0,1)$, gradient $1$.", explanation: "At $x=0$: point $(0,1)$, $y'=e^0=1$, so $y=x+1$." },
  { id: "app-p-18", prompt: "$y=\\ln(3x+1)$. Choose the tangent gradient at $x=1$.", latex: "y=\\ln(3x+1)", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$3$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\frac{1}{3}$" }, { label: "D", text: "$\\frac{3}{4}$" }], hint: "$y'=\\frac{3}{3x+1}$.", explanation: "$y'=\\frac{3}{3x+1}$; at $x=1$, $y'=\\frac{3}{4}$." },
  { id: "app-p-19", prompt: "$y=\\ln(2x+1)$. Find the tangent gradient at $x=0$.", latex: "y=\\ln(2x+1)", answer: "2", difficulty: 4, acceptedAnswers: [], hint: "$y'=\\frac{2}{2x+1}$.", explanation: "$y'=\\frac{2}{2x+1}$; at $x=0$, $y'=2$." },
  { id: "app-p-20", prompt: "A tangent has gradient $0$. Which statement is correct?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The normal gradient is also $0$" }, { label: "B", text: "The tangent is horizontal" }, { label: "C", text: "The derivative does not exist" }, { label: "D", text: "The curve must cross the $x$-axis" }], hint: "Zero gradient.", explanation: "A zero derivative gives a horizontal tangent." },
  // --- D4: rate models, product ---
  { id: "app-p-21", prompt: "$s(t)=te^t$. Find the rate at $t=0$.", latex: "s(t)=te^t", answer: "1", difficulty: 4, acceptedAnswers: [], hint: "$s'(t)=e^t+te^t$.", explanation: "$s'(t)=e^t+te^t=e^t(1+t)$; at $t=0$, the rate is $1$." },
  { id: "app-p-22", prompt: "Which technique is most direct before finding the tangent gradient of $y=xe^x$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Chain rule" }, { label: "B", text: "Product rule" }, { label: "C", text: "Quotient rule" }, { label: "D", text: "Sigma notation" }], hint: "Two factors.", explanation: "$xe^x$ is a product, so use the product rule." },
  // --- D5: Band-6 — combine differentiate → solve → classify/interpret ---
  { id: "app-p-23", prompt: "$f(x)=x^2e^x$ has $f'(x)=xe^x(x+2)$. The non-zero stationary $x$-value is:", latex: "f'(x)=xe^x(x+2)", answer: "-2", difficulty: 5, acceptedAnswers: ["−2"], hint: "$f'(x)=0$ at $x=0$ or $x+2=0$.", explanation: "$e^x\\ne 0$, so $f'(x)=0$ when $x=0$ or $x=-2$. The non-zero value is $x=-2$." },
  { id: "app-p-24", prompt: "$y=(x-1)^2$ at $x=3$: the normal has gradient (give exact fraction):", latex: "y=(x-1)^2", answer: "-1/4", difficulty: 5, acceptedAnswers: ["-0.25", "−1/4", "−0.25"], hint: "Tangent gradient is $2(x-1)$ at $x=3$, then take negative reciprocal.", explanation: "$y'=2(x-1)$; at $x=3$, $m_T=4$. The normal gradient is $-\\frac{1}{4}$." },
  { id: "app-p-25", prompt: "$f(x)=x\\ln x$ has a stationary point where $\\ln x+1=0$. The $x$-value (3 d.p.) is:", latex: "f'(x)=\\ln x+1", answer: "0.368", difficulty: 5, acceptedAnswers: ["0.37", "1/e"], hint: "$\\ln x=-1\\Rightarrow x=e^{-1}$.", explanation: "$\\ln x+1=0\\Rightarrow x=e^{-1}\\approx 0.368$." },
  { id: "app-p-26", prompt: "$y=e^{2x}$ at $x=0$: the tangent meets the $x$-axis where $0=2x+1$. Find that $x$.", latex: "\\text{tangent } y=2x+1", answer: "-1/2", difficulty: 5, acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "The tangent is $y=2x+1$; set $y=0$.", explanation: "At $x=0$: point $(0,1)$, gradient $2$, tangent $y=2x+1$. Setting $y=0$ gives $x=-\\frac{1}{2}$." },
  { id: "app-p-27", prompt: "$f(x)=e^x(x-1)$. Find $f'(0)$.", latex: "f(x)=e^x(x-1)", answer: "0", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=e^x(x-1)+e^x=xe^x$.", explanation: "$f'(x)=e^x(x-1)+e^x\\cdot 1=e^x\\cdot x=xe^x$; at $x=0$, $f'(0)=0$. So $x=0$ is also a stationary point." },
  { id: "app-p-28", prompt: "$f(x)=\\frac{x}{e^x}$ has $f'(x)=\\frac{1-x}{e^x}$. At its stationary point $x=1$, classify using $f''$: $f''(x)=\\frac{x-2}{e^x}$, so $f''(1)<0$. The stationary point is a:", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "maximum" }, { label: "B", text: "minimum" }, { label: "C", text: "inflection" }, { label: "D", text: "cannot tell" }], hint: "$f''(1)=\\frac{-1}{e}<0$.", explanation: "$f''(1)=\\frac{1-2}{e}=\\frac{-1}{e}<0$, so the curve is concave down: a maximum." },
  { id: "app-p-29", prompt: "$f(x)=\\sin x+\\cos x$ on $[0,\\pi]$ has $f'(x)=\\cos x-\\sin x$. The stationary point occurs where $\\tan x=1$. Find $f'(0)$.", latex: "f'(x)=\\cos x-\\sin x", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(0)=\\cos 0-\\sin 0$.", explanation: "$f'(x)=\\cos x-\\sin x$; at $x=0$, $f'(0)=1-0=1$. (The stationary point is at $x=\\frac{\\pi}{4}$.)" },
  { id: "app-p-30", prompt: "A particle has displacement $s(t)=e^{-t}$. Its velocity at $t=0$ is:", latex: "s(t)=e^{-t}", answer: "-1", difficulty: 5, acceptedAnswers: ["−1"], hint: "$s'(t)=-e^{-t}$.", explanation: "$s'(t)=-e^{-t}$; at $t=0$, $v=-e^0=-1$ (moving in the negative direction)." },
  { id: "app-p-31", prompt: "The tangent to $y=\\ln x$ at $x=1$ has gradient $1$ and passes through $(1,0)$. Its $y$-intercept is:", latex: "y=\\ln x", answer: "-1", difficulty: 5, acceptedAnswers: ["−1"], hint: "Tangent: $y-0=1(x-1)$.", explanation: "$y'=\\frac{1}{x}$, so $m=1$ at $x=1$, point $(1,0)$. Tangent $y=x-1$, $y$-intercept $-1$." },
  { id: "app-p-32", prompt: "$N(t)=100e^{0.5t}$ models a population. The growth rate $N'(t)=50e^{0.5t}$ at $t=0$ is:", latex: "N(t)=100e^{0.5t}", answer: "50", difficulty: 5, acceptedAnswers: [], hint: "$N'(t)=100(0.5)e^{0.5t}$.", explanation: "$N'(t)=100\\cdot 0.5\\,e^{0.5t}=50e^{0.5t}$; at $t=0$, the rate is $50$." },
];

applicationsExtendedDifferentiationLesson.multiPartPractice = [
  {
    id: "app-mp-1",
    prompt:
      "A curve has equation $y=(2x+1)^3$. A tangent is drawn at the point where $x=0$.",
    latex: "y=(2x+1)^3",
    answer: "6",
    hint: "$\\frac{dy}{dx}=6(2x+1)^2$; then use point–gradient form and the normal rule.",
    explanation:
      "$\\frac{dy}{dx}=3(2x+1)^2\\cdot 2=6(2x+1)^2$. (a) At $x=0$, the tangent gradient is $6(1)^2=6$. (b) The point is $(0,1)$, so the tangent $y=6x+1$ has $y$-intercept $1$. (c) The normal gradient is $-\\frac{1}{6}$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the tangent gradient at $x=0$.", latex: "6(2x+1)^2", marks: 2, answer: "6", acceptedAnswers: [], hint: "$6(2(0)+1)^2$.", explanation: "$6(1)^2=6$." },
      { key: "b", label: "(b)", prompt: "Find the $y$-intercept of the tangent line.", latex: "y=6x+c,\\ (0,1)", marks: 2, answer: "1", acceptedAnswers: [], hint: "The point of contact is $(0,(2(0)+1)^3)$.", explanation: "At $x=0$, $y=(1)^3=1$. With gradient $6$ the tangent is $y=6x+1$, so the $y$-intercept is $1$." },
      { key: "c", label: "(c)", prompt: "Find the gradient of the normal at $x=0$.", latex: "m_N=-\\frac{1}{m_T}", marks: 2, answer: "-1/6", acceptedAnswers: ["−1/6"], hint: "Negative reciprocal of $6$.", explanation: "$m_N=-\\frac{1}{6}$." },
    ],
  },
];

differentiationTechniquesExamPracticeLesson.masteryQuizPool = [
  // --- D1/D2: rule selection ---
  { id: "exam-p-1", prompt: "Which rule is most direct for $y=\\ln(4x+1)$?", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Product rule" }, { label: "B", text: "Chain rule" }, { label: "C", text: "Quotient rule" }, { label: "D", text: "Standard derivative only" }], hint: "Inner function inside the log.", explanation: "The log has an inner function $4x+1$: chain rule." },
  { id: "exam-p-2", prompt: "Which rule is most direct for $y=\\frac{e^x}{x+1}$?", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "Standard derivative only" }, { label: "B", text: "Product rule" }, { label: "C", text: "Quotient rule" }, { label: "D", text: "Arithmetic series" }], hint: "A division of expressions.", explanation: "Quotient rule." },
  { id: "exam-p-3", prompt: "Which rule is most direct for $y=x\\sin(2x)$?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Product rule (with chain rule inside)" }, { label: "B", text: "Quotient rule" }, { label: "C", text: "Chain rule only" }, { label: "D", text: "Standard derivative only" }], hint: "A product where one factor is composite.", explanation: "Product of $x$ and $\\sin(2x)$, with the chain rule needed inside." },
  { id: "exam-p-4", prompt: "Choose the derivative of $\\sin(3x)$.", latex: "y=\\sin(3x)", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$3\\cos(3x)$" }, { label: "B", text: "$\\cos(3x)$" }, { label: "C", text: "$-3\\sin(3x)$" }, { label: "D", text: "$3\\sin(3x)$" }], hint: "Chain rule.", explanation: "$3\\cos(3x)$." },
  { id: "exam-p-5", prompt: "Choose the derivative of $\\cos(5x)$.", latex: "y=\\cos(5x)", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$5\\sin(5x)$" }, { label: "B", text: "$-\\sin(5x)$" }, { label: "C", text: "$\\cos(5x)$" }, { label: "D", text: "$-5\\sin(5x)$" }], hint: "Cos to $-\\sin$, times 5.", explanation: "$-5\\sin(5x)$." },
  { id: "exam-p-6", prompt: "Choose the derivative of $\\ln(5x)$.", latex: "y=\\ln(5x)", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac{1}{5x}$" }, { label: "B", text: "$5\\ln x$" }, { label: "C", text: "$\\frac{1}{x}$" }, { label: "D", text: "$\\frac{5}{x}$" }], hint: "$\\frac{5}{5x}$ simplifies.", explanation: "$\\frac{5}{5x}=\\frac{1}{x}$." },
  { id: "exam-p-7", prompt: "Choose the derivative of $xe^x$.", latex: "y=xe^x", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$xe^x$" }, { label: "B", text: "$e^x+xe^x$" }, { label: "C", text: "$x+e^x$" }, { label: "D", text: "$e^x-xe^x$" }], hint: "Product rule.", explanation: "$e^x+xe^x$." },
  { id: "exam-p-8", prompt: "Choose the derivative of $x\\sin x$.", latex: "y=x\\sin x", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\sin x+x\\cos x$" }, { label: "B", text: "$x\\cos x$" }, { label: "C", text: "$\\cos x-x\\sin x$" }, { label: "D", text: "$\\sin x\\cos x$" }], hint: "Product rule.", explanation: "$\\sin x+x\\cos x$." },
  // --- D3: typed evaluations + setups ---
  { id: "exam-p-9", prompt: "Find the tangent gradient at $x=0$ of $y=e^{2x}$.", latex: "y=e^{2x}", answer: "2", difficulty: 3, acceptedAnswers: [], hint: "$y'=2e^{2x}$.", explanation: "$y'=2e^{2x}$; at $x=0$, $y'=2$." },
  { id: "exam-p-10", prompt: "$f(x)=\\ln(2x+1)$. Find $f'(1)$.", latex: "f(x)=\\ln(2x+1)", answer: "2/3", difficulty: 3, acceptedAnswers: ["0.667", "0.6667"], hint: "$f'(x)=\\frac{2}{2x+1}$.", explanation: "$f'(x)=\\frac{2}{2x+1}$; at $x=1$, $f'(1)=\\frac{2}{3}$." },
  { id: "exam-p-11", prompt: "$f'(x)=4x-12$. Find the stationary $x$-value.", latex: "f'(x)=4x-12", answer: "3", difficulty: 3, acceptedAnswers: [], hint: "Set $4x-12=0$.", explanation: "$4x-12=0\\Rightarrow x=3$." },
  { id: "exam-p-12", prompt: "A tangent gradient is $-2$. The normal gradient is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$-\\frac{1}{2}$" }, { label: "B", text: "$\\frac{1}{2}$" }, { label: "C", text: "$2$" }, { label: "D", text: "$-2$" }], hint: "Negative reciprocal.", explanation: "$m_N=-\\frac{1}{-2}=\\frac{1}{2}$." },
  { id: "exam-p-13", prompt: "$f(x)=e^{4x}+\\sin x$. Find $f'(0)$.", latex: "f(x)=e^{4x}+\\sin x", answer: "5", difficulty: 3, acceptedAnswers: [], hint: "$f'(x)=4e^{4x}+\\cos x$.", explanation: "$f'(x)=4e^{4x}+\\cos x$; at $x=0$, $f'(0)=4+1=5$." },
  { id: "exam-p-14", prompt: "$y=(x+1)^3$. Find the tangent gradient at $x=1$.", latex: "y=(x+1)^3", answer: "12", difficulty: 3, acceptedAnswers: [], hint: "$y'=3(x+1)^2$.", explanation: "$y'=3(x+1)^2$; at $x=1$, $y'=3(4)=12$." },
  { id: "exam-p-15", prompt: "Choose the product-rule structure for $y=f(x)g(x)$.", latex: "y=f(x)g(x)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$f'g+fg'$" }, { label: "B", text: "$f'g'$" }, { label: "C", text: "$f'g-fg'$" }, { label: "D", text: "$\\frac{f'g-fg'}{g^2}$" }], hint: "Two terms.", explanation: "$f'g+fg'$." },
  // --- D4: combined setups + error spotting ---
  { id: "exam-p-16", prompt: "Choose the quotient-rule setup for $y=\\frac{\\sin x}{x+1}$.", latex: "y=\\frac{\\sin x}{x+1}", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$\\frac{\\cos x(x+1)+\\sin x}{(x+1)^2}$" }, { label: "B", text: "$\\frac{\\sin x(x+1)-\\cos x}{(x+1)^2}$" }, { label: "C", text: "$\\frac{\\cos x-\\sin x}{x+1}$" }, { label: "D", text: "$\\frac{\\cos x(x+1)-\\sin x}{(x+1)^2}$" }], hint: "$f'g-fg'$ over $g^2$.", explanation: "$\\frac{\\cos x(x+1)-\\sin x}{(x+1)^2}$." },
  { id: "exam-p-17", prompt: "A student differentiates $x\\cos x$ as $-x\\sin x$. The error is:", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "The quotient-rule denominator is missing" }, { label: "B", text: "The derivative of the first factor ($1\\cdot\\cos x$) is missing" }, { label: "C", text: "The inner derivative is missing" }, { label: "D", text: "$\\frac{d}{dx}\\cos x=\\sec^2 x$" }], hint: "Product rule has two terms.", explanation: "The product rule gives $\\cos x-x\\sin x$; the $\\cos x$ term was dropped." },
  { id: "exam-p-18", prompt: "Which function has derivative value $2$ at $x=0$?", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$e^{2x}$" }, { label: "B", text: "$\\ln(x+1)$" }, { label: "C", text: "$\\cos(2x)$" }, { label: "D", text: "$x\\sin x$" }], hint: "Differentiate each, set $x=0$.", explanation: "$\\frac{d}{dx}e^{2x}=2e^{2x}$, which is $2$ at $x=0$." },
  { id: "exam-p-19", prompt: "$f(x)=e^x(x-5)$ has $f'(x)=e^x(x-4)$. Choose the stationary $x$-value.", latex: "f(x)=e^x(x-5)", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$0$" }, { label: "B", text: "$-4$" }, { label: "C", text: "$4$" }, { label: "D", text: "$5$" }], hint: "Set $x-4=0$.", explanation: "$e^x\\ne 0$, so $x-4=0$ gives $x=4$." },
  { id: "exam-p-20", prompt: "$y=x\\ln x$. Choose the tangent gradient at $x=1$.", latex: "y=x\\ln x", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$0$" }, { label: "B", text: "$1$" }, { label: "C", text: "$e$" }, { label: "D", text: "$2$" }], hint: "$y'=\\ln x+1$.", explanation: "$y'=\\ln x+1$; at $x=1$, $y'=1$." },
  { id: "exam-p-21", prompt: "$f(x)=e^x(x+3)$. The stationary $x$-value satisfies $e^x(x+4)=0$, giving:", latex: "f'(x)=e^x(x+4)", answer: "-4", difficulty: 4, acceptedAnswers: ["−4"], hint: "$e^x\\ne 0$.", explanation: "$f'(x)=e^x(x+3)+e^x=e^x(x+4)$; since $e^x\\ne 0$, $x=-4$." },
  { id: "exam-p-22", prompt: "Choose the derivative of $\\frac{e^x}{x}$.", latex: "y=\\frac{e^x}{x}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{xe^x-e^x}{x^2}$" }, { label: "B", text: "$\\frac{e^x}{x^2}$" }, { label: "C", text: "$\\frac{e^x-xe^x}{x^2}$" }, { label: "D", text: "$e^x$" }], hint: "$f=e^x$, $g=x$.", explanation: "$\\frac{e^x\\cdot x-e^x\\cdot 1}{x^2}=\\frac{xe^x-e^x}{x^2}$." },
  // --- D5: Band-6 — multi-step, select-and-execute, unfamiliar ---
  { id: "exam-p-23", prompt: "$f(x)=x^2e^x$. Find $f'(1)$ to 3 d.p. (use $e\\approx 2.718$).", latex: "f(x)=x^2e^x", answer: "8.155", difficulty: 5, acceptedAnswers: ["8.15", "8.154"], hint: "$f'(x)=2xe^x+x^2e^x=xe^x(2+x)$.", explanation: "$f'(x)=xe^x(2+x)$; at $x=1$, $f'(1)=1\\cdot e\\cdot 3=3e\\approx 8.155$." },
  { id: "exam-p-24", prompt: "$f(x)=\\sin(x^2)$. Find $f'(\\sqrt{\\pi})$ — note $2\\sqrt{\\pi}\\cos(\\pi)$. Evaluate to 3 d.p.", latex: "f(x)=\\sin(x^2)", answer: "-3.545", difficulty: 5, acceptedAnswers: ["-3.54", "-3.545"], hint: "$f'(x)=2x\\cos(x^2)$; at $x=\\sqrt\\pi$, $\\cos\\pi=-1$.", explanation: "$f'(x)=2x\\cos(x^2)$; at $x=\\sqrt\\pi$, $f'=2\\sqrt\\pi\\cos\\pi=-2\\sqrt\\pi\\approx -3.545$." },
  { id: "exam-p-25", prompt: "$y=e^{2x}$ at $x=0$ has tangent $y=2x+1$. Where does this tangent cross the $x$-axis?", latex: "y=2x+1", answer: "-1/2", difficulty: 5, acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "Set $2x+1=0$.", explanation: "$2x+1=0\\Rightarrow x=-\\frac{1}{2}$." },
  { id: "exam-p-26", prompt: "$f(x)=\\ln(x^2+1)$. Find $f'(1)$.", latex: "f(x)=\\ln(x^2+1)", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=\\frac{2x}{x^2+1}$.", explanation: "$f'(x)=\\frac{2x}{x^2+1}$; at $x=1$, $f'(1)=\\frac{2}{2}=1$." },
  { id: "exam-p-27", prompt: "$f(x)=x e^{-x}$ has $f'(x)=e^{-x}(1-x)$. The stationary $x$-value is:", latex: "f'(x)=e^{-x}(1-x)", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$e^{-x}\\ne 0$.", explanation: "$f'(x)=e^{-x}-xe^{-x}=e^{-x}(1-x)$; since $e^{-x}\\ne 0$, $x=1$." },
  { id: "exam-p-28", prompt: "$f(x)=\\frac{\\ln x}{x}$. The stationary point is where $1-\\ln x=0$. Find that $x$ to 3 d.p. (use $e\\approx 2.718$).", latex: "f'(x)=\\frac{1-\\ln x}{x^2}", answer: "2.718", difficulty: 5, acceptedAnswers: ["2.72", "e"], hint: "$\\ln x=1\\Rightarrow x=e$.", explanation: "$1-\\ln x=0\\Rightarrow \\ln x=1\\Rightarrow x=e\\approx 2.718$." },
  { id: "exam-p-29", prompt: "$f(x)=\\cos(2x)$. Find $f'\\!\\left(\\frac{\\pi}{4}\\right)$.", latex: "f(x)=\\cos(2x)", answer: "-2", difficulty: 5, acceptedAnswers: ["−2"], hint: "$f'(x)=-2\\sin(2x)$; $\\sin\\frac{\\pi}{2}=1$.", explanation: "$f'(x)=-2\\sin(2x)$; at $x=\\frac{\\pi}{4}$, $f'=-2\\sin\\frac{\\pi}{2}=-2$." },
  { id: "exam-p-30", prompt: "$f(x)=e^x\\cos x$. Find $f'(0)$.", latex: "f(x)=e^x\\cos x", answer: "1", difficulty: 5, acceptedAnswers: [], hint: "$f'(x)=e^x(\\cos x-\\sin x)$.", explanation: "$f'(x)=e^x\\cos x-e^x\\sin x=e^x(\\cos x-\\sin x)$; at $x=0$, $f'(0)=1(1-0)=1$." },
  { id: "exam-p-31", prompt: "Which expression needs BOTH the product rule and the chain rule?", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$x+\\sin x$" }, { label: "B", text: "$\\frac{x}{e^x}$" }, { label: "C", text: "$x\\,e^{3x}$" }, { label: "D", text: "$\\ln x$" }], hint: "Product of $x$ and a composite.", explanation: "$x e^{3x}$ is a product, and $e^{3x}$ needs the chain rule inside." },
  { id: "exam-p-32", prompt: "$f(x)=\\ln(3x+1)$. Find the value of $x$ where $f'(x)=1$.", latex: "f'(x)=\\frac{3}{3x+1}", answer: "2/3", difficulty: 5, acceptedAnswers: ["0.667", "0.6667"], hint: "$\\frac{3}{3x+1}=1\\Rightarrow 3x+1=3$.", explanation: "$\\frac{3}{3x+1}=1\\Rightarrow 3x+1=3\\Rightarrow x=\\frac{2}{3}$." },
];

differentiationTechniquesExamPracticeLesson.multiPartPractice = [
  {
    id: "exam-mp-1",
    prompt:
      "A function is defined by $f(x)=x e^{2x}$. Use the product and chain rules together.",
    latex: "f(x)=xe^{2x}",
    answer: "1",
    hint: "$f'(x)=e^{2x}+x\\cdot 2e^{2x}=e^{2x}(1+2x)$; then evaluate and solve.",
    explanation:
      "$f'(x)=e^{2x}+x\\cdot 2e^{2x}=e^{2x}(1+2x)$. (a) $f'(0)=e^0(1+0)=1$. (b) A stationary point needs $f'(x)=0$; since $e^{2x}\\ne 0$, $1+2x=0$ gives $x=-\\frac{1}{2}$. (c) At $x=0$ the curve passes through $(0,0)$ with gradient $1$, so the tangent is $y=x$, which has $y$-intercept $0$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find $f'(0)$.", latex: "f'(x)=e^{2x}(1+2x)", marks: 2, answer: "1", acceptedAnswers: [], hint: "$e^0(1+0)$.", explanation: "$f'(0)=1\\cdot 1=1$." },
      { key: "b", label: "(b)", prompt: "Find the $x$-value of the stationary point.", latex: "e^{2x}(1+2x)=0", marks: 2, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "$e^{2x}$ is never zero.", explanation: "Since $e^{2x}\\ne 0$, set $1+2x=0$, giving $x=-\\frac{1}{2}$." },
      { key: "c", label: "(c)", prompt: "Find the $y$-intercept of the tangent at $x=0$.", latex: "f(0)=0\\cdot e^0", marks: 2, answer: "0", acceptedAnswers: [], hint: "The point of contact is $(0,f(0))$.", explanation: "$f(0)=0$, so the tangent $y=x$ passes through the origin: $y$-intercept $0$." },
    ],
  },
];

export const differentiationTechniquesOutline: LessonOutlineItem[] =
  differentiationTechniquesLessons.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    status: item.status,
  }));
