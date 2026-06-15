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
    moduleSlug: "differentiation-techniques",
    moduleTitle: "Differentiation Techniques",
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
      "Year 12 Advanced differentiation extends the polynomial rules by adding standard derivatives for trigonometric, exponential and logarithmic functions.",
      "The derivative of sin x is cos x, while the derivative of cos x is negative sin x. The negative sign is a common source of errors.",
      "The derivative of tan x is sec squared x. The derivative of e^x is itself, and the derivative of ln x is 1 over x.",
      "Constants multiply through derivatives. Sums and differences can be differentiated term by term.",
      "For numeric derivative values, differentiate first, then substitute the input.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(\\sin x)=\\cos x",
      "\\frac{d}{dx}(\\cos x)=-\\sin x",
      "\\frac{d}{dx}(\\tan x)=\\sec^2 x",
      "\\frac{d}{dx}(e^x)=e^x",
      "\\frac{d}{dx}(\\ln x)=\\frac{1}{x}",
      "\\frac{d}{dx}(a^x)=a^x\\ln a",
    ],
  },
  [
    {
      title: "Differentiate a trigonometric function",
      questionLatex: "f(x)=3\\sin x-2\\cos x",
      steps: [
        { explanation: "Differentiate each term separately.", latex: "\\frac{d}{dx}(3\\sin x)=3\\cos x" },
        { explanation: "The derivative of cos x is negative sin x.", latex: "\\frac{d}{dx}(-2\\cos x)=2\\sin x" },
        { explanation: "Combine the derivatives.", latex: "f'(x)=3\\cos x+2\\sin x" },
      ],
      finalAnswerLatex: "3\\cos x+2\\sin x",
    },
    {
      title: "Differentiate exponential and logarithmic terms",
      questionLatex: "y=4e^x+5\\ln x",
      steps: [
        { explanation: "The derivative of e^x is e^x.", latex: "\\frac{d}{dx}(4e^x)=4e^x" },
        { explanation: "The derivative of ln x is 1/x.", latex: "\\frac{d}{dx}(5\\ln x)=\\frac{5}{x}" },
      ],
      finalAnswerLatex: "4e^x+\\frac{5}{x}",
    },
    {
      title: "Evaluate a derivative",
      questionLatex: "f(x)=\\sin x+e^x.\\quad \\text{Find }f'(0).",
      steps: [
        { explanation: "Differentiate first.", latex: "f'(x)=\\cos x+e^x" },
        { explanation: "Substitute x = 0.", latex: "f'(0)=\\cos 0+e^0=1+1" },
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
      "The chain rule is used when one function is inside another function.",
      "Differentiate the outer function while leaving the inner expression in place, then multiply by the derivative of the inner expression.",
      "For powers such as (3x - 1)^5, the outer function is the fifth power and the inner function is 3x - 1.",
      "The same idea works for trigonometric, exponential and logarithmic composite functions.",
      "Many chain-rule errors come from forgetting to multiply by the derivative of the inner function.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)",
      "\\frac{d}{dx}(ax+b)^n=n(ax+b)^{n-1}\\cdot a",
      "\\frac{d}{dx}\\sin(g(x))=\\cos(g(x))g'(x)",
      "\\frac{d}{dx}e^{g(x)}=e^{g(x)}g'(x)",
      "\\frac{d}{dx}\\ln(g(x))=\\frac{g'(x)}{g(x)}",
    ],
  },
  [
    {
      title: "Power of a linear expression",
      questionLatex: "y=(2x+3)^5",
      steps: [
        { explanation: "The outer function is a fifth power and the inner function is 2x + 3.", latex: "g(x)=2x+3" },
        { explanation: "Differentiate the outer function, leaving the inner expression in place.", latex: "5(2x+3)^4" },
        { explanation: "Multiply by the derivative of the inner expression.", latex: "5(2x+3)^4\\cdot2" },
      ],
      finalAnswerLatex: "10(2x+3)^4",
    },
    {
      title: "Trigonometric composite",
      questionLatex: "y=\\sin(3x-1)",
      steps: [
        { explanation: "The derivative of sin is cos.", latex: "\\cos(3x-1)" },
        { explanation: "Multiply by the derivative of 3x - 1.", latex: "\\frac{d}{dx}(3x-1)=3" },
      ],
      finalAnswerLatex: "3\\cos(3x-1)",
    },
    {
      title: "Logarithmic composite",
      questionLatex: "y=\\ln(5x+2)",
      steps: [
        { explanation: "For ln(g(x)), the derivative is g'(x)/g(x).", latex: "g(x)=5x+2" },
        { explanation: "The inner derivative is 5.", latex: "g'(x)=5" },
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
    choice("diff-tech-chain-m1", "Choose the derivative.", "y=(5x-2)^3", "B", ["$3(5x-2)^2$", "$15(5x-2)^2$", "$15(5x-2)^3$", "$5(5x-2)^2$"], "The outer derivative is 3(5x - 2)^2 and the inner derivative is 5."),
    choice("diff-tech-chain-m2", "Choose the derivative.", "y=\\sin(6x+1)", "A", ["$6\\cos(6x+1)$", "$\\cos(6x+1)$", "$-6\\sin(6x+1)$", "$6\\sin(6x+1)$"], "Differentiate sin to cos and multiply by 6."),
    choice("diff-tech-chain-m3", "Choose the derivative.", "y=\\cos(2x-3)", "D", ["$2\\sin(2x-3)$", "$-\\sin(2x-3)$", "$\\cos(2x-3)$", "$-2\\sin(2x-3)$"], "Differentiate cos to -sin and multiply by 2."),
    choice("diff-tech-chain-m4", "Choose the derivative.", "y=e^{4x}", "C", ["$e^{4x}$", "$4e^x$", "$4e^{4x}$", "$\\frac{1}{4}e^{4x}$"], "The derivative of 4x is 4."),
    choice("diff-tech-chain-m5", "Choose the derivative.", "y=\\ln(7x-1)", "A", ["$\\frac{7}{7x-1}$", "$\\frac{1}{7x-1}$", "$7\\ln(7x-1)$", "$\\frac{7x-1}{7}$"], "For ln(g), use g'/g."),
    numeric("diff-tech-chain-m6", "Find the gradient at x = 0.", "y=(3x+2)^2", "12", [], "Use the chain rule: y'=2(3x+2)\\cdot 3=6(3x+2). At x=0, y'=6(2)=12."),
    choice("diff-tech-chain-m7", "A student differentiates e^(2x + 5) as e^(2x + 5). Which option identifies the error?", "\\text{Select A, B, C, or D.}", "B", ["The derivative of e is zero", "The inner derivative 2 is missing", "The sign should be negative", "The quotient rule is needed"], "The chain rule requires multiplication by the derivative of 2x + 5."),
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
      "The product rule is used when two variable expressions are multiplied.",
      "The quotient rule is used when one variable expression is divided by another.",
      "Do not differentiate a product by multiplying the two derivatives. The product rule has two terms.",
      "For the quotient rule, keep the numerator order as f'g - fg'. Reversing the order changes the sign.",
      "In HSC questions, it is often enough to show a correct derivative before heavy simplification.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(fg)=f'g+fg'",
      "\\frac{d}{dx}\\left(\\frac{f}{g}\\right)=\\frac{f'g-fg'}{g^2}",
      "\\text{product: multiply functions}\\quad \\text{quotient: divide functions}",
    ],
  },
  [
    {
      title: "Use the product rule",
      questionLatex: "y=x\\sin x",
      steps: [
        { explanation: "Let f = x and g = sin x.", latex: "f'=1,\\quad g'=\\cos x" },
        { explanation: "Apply f'g + fg'.", latex: "y'=1\\cdot\\sin x+x\\cos x" },
      ],
      finalAnswerLatex: "\\sin x+x\\cos x",
    },
    {
      title: "Use the quotient rule",
      questionLatex: "y=\\frac{e^x}{x}",
      steps: [
        { explanation: "Let f = e^x and g = x.", latex: "f'=e^x,\\quad g'=1" },
        { explanation: "Apply the quotient rule.", latex: "y'=\\frac{e^x\\cdot x-e^x\\cdot 1}{x^2}" },
      ],
      finalAnswerLatex: "\\frac{xe^x-e^x}{x^2}",
    },
    {
      title: "Evaluate a product-rule derivative",
      questionLatex: "y=x e^x.\\quad \\text{Find }y'\\text{ at }x=0.",
      steps: [
        { explanation: "Use the product rule.", latex: "y'=1\\cdot e^x+x e^x" },
        { explanation: "Substitute x = 0.", latex: "y'(0)=1" },
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
    numeric("diff-tech-pq-m6", "Find the derivative value at x = 0.", "y=x\\cos x", "1", [], "Use the product rule: y'=1\\cdot\\cos x+x(-\\sin x)=\\cos x-x\\sin x. At x=0, this gives 1."),
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
      "Applications still begin by finding the derivative, but the derivative may now require chain, product or quotient rules.",
      "For tangents, the derivative value gives the tangent gradient at the point.",
      "For normals, use the negative reciprocal of the tangent gradient when the tangent gradient is non-zero.",
      "For rates of change, the derivative value should be interpreted with units and context.",
      "Stationary points occur where the derivative is zero, provided the derivative exists.",
    ],
    latexBlocks: [
      "m_{\\text{tangent}}=f'(a)",
      "m_{\\text{normal}}=-\\frac{1}{m_{\\text{tangent}}}",
      "f'(a)=0\\Rightarrow \\text{stationary point candidate}",
      "\\text{rate of change}=\\frac{dy}{dx}\\text{ or }\\frac{ds}{dt}\\text{ in context}",
    ],
  },
  [
    {
      title: "Tangent gradient from a chain-rule derivative",
      questionLatex: "y=(2x+1)^3.\\quad \\text{Find the tangent gradient at }x=1.",
      steps: [
        { explanation: "Differentiate using the chain rule.", latex: "y'=6(2x+1)^2" },
        { explanation: "Substitute x = 1.", latex: "y'=6(3)^2=54" },
      ],
      finalAnswerLatex: "54",
    },
    {
      title: "Normal gradient",
      questionLatex: "f'(2)=4.\\quad \\text{Find the normal gradient at }x=2.",
      steps: [
        { explanation: "The tangent gradient is 4.", latex: "m_T=4" },
        { explanation: "The normal gradient is the negative reciprocal.", latex: "m_N=-\\frac{1}{4}" },
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
    numeric("diff-tech-app-m4", "Find the rate at t = 0.", "s(t)=e^{3t}", "3", [], "Rate means derivative with respect to time. Since s'(t)=3e^{3t}, at t=0 the rate is 3e^0=3."),
    numeric("diff-tech-app-m5", "Find the stationary x-value.", "f'(x)=3x+6", "-2", [], "A stationary point occurs when the derivative is zero. Solve 3x+6=0 to get x=-2."),
    choice("diff-tech-app-m6", "A tangent has gradient 0. Which statement is correct?", "\\text{Select A, B, C, or D.}", "B", ["The normal gradient is also 0", "The tangent is horizontal", "The derivative does not exist", "The curve must cross the x-axis"], "A zero derivative gives a horizontal tangent."),
    choice("diff-tech-app-m7", "Choose the tangent equation at x = 0.", "y=e^x", "C", ["$y=x$", "$y=2x+1$", "$y=x+1$", "$y=-x+1$"], "At x = 0, the point is (0, 1) and the gradient is 1."),
    numeric("diff-tech-app-m8", "Find f'(1).", "f(x)=x\\ln x", "1", [], "Use the product rule: f'(x)=1\\cdot\\ln x+x\\cdot(1/x)=\\ln x+1. At x=1, f'(1)=0+1=1."),
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
      "In mixed exam questions, the first step is rule selection.",
      "Standard derivatives cover sin x, cos x, tan x, e^x and ln x.",
      "Composite functions need the chain rule. Products need the product rule. Quotients need the quotient rule.",
      "Applications often ask for a number, such as a gradient, rate or stationary x-value, after the derivative has been found.",
      "To avoid algebraic marking ambiguity, symbolic derivative responses are best handled by selecting the correct option.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(\\sin x)=\\cos x,\\quad \\frac{d}{dx}(\\cos x)=-\\sin x",
      "\\frac{d}{dx}(e^x)=e^x,\\quad \\frac{d}{dx}(\\ln x)=\\frac{1}{x}",
      "\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)",
      "\\frac{d}{dx}(fg)=f'g+fg'",
      "\\frac{d}{dx}\\left(\\frac{f}{g}\\right)=\\frac{f'g-fg'}{g^2}",
    ],
  },
  [
    {
      title: "Choose a rule in a mixed expression",
      questionLatex: "y=x\\sin(2x)",
      steps: [
        { explanation: "The full expression is a product of x and sin(2x), so product rule is needed." },
        { explanation: "The second factor is composite, so chain rule is also needed inside the product rule." },
      ],
      finalAnswerLatex: "\\text{Product rule with chain rule inside.}",
    },
    {
      title: "Evaluate a mixed derivative",
      questionLatex: "f(x)=e^{2x}+x\\ln x.\\quad \\text{Find }f'(0)\\text{ for the first term only and }f'(1)\\text{ for the product term.}",
      steps: [
        { explanation: "The derivative of e^(2x) is 2e^(2x), so its value at 0 is 2.", latex: "2e^0=2" },
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
    choice("diff-tech-exam-m8", "Which function has derivative value 2 at x = 0?", "\\text{Select A, B, C, or D.}", "A", ["$e^{2x}$", "$\\ln(x+1)$", "$\\cos(2x)$", "$x\\sin x$"], "The derivative of e^(2x) is 2e^(2x), which is 2 at x = 0."),
    choice("diff-tech-exam-m9", "For the function shown, which stationary x-value is correct?", "f(x)=e^x(x-5)", "C", ["0", "-4", "4", "5"], "Using the product rule gives f'(x)=e^x(x-4). Since e^x is never zero, solve x - 4 = 0."),
    choice("diff-tech-exam-m10", "A curve is y = x ln x. Which tangent gradient at x = 1 is correct?", "\\text{Select A, B, C, or D.}", "B", ["0", "1", "e", "2"], "The product-rule derivative is ln x + 1, so at x = 1 it is 1."),
  ]
);

export const differentiationTechniquesLessons = [
  standardDerivativesLesson,
  chainRuleLesson,
  productQuotientRulesLesson,
  applicationsExtendedDifferentiationLesson,
  differentiationTechniquesExamPracticeLesson,
];

export const differentiationTechniquesOutline: LessonOutlineItem[] =
  differentiationTechniquesLessons.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    status: item.status,
  }));
