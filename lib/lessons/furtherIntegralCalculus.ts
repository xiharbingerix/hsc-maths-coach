import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";

function intChoice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Choose the integration form first, then check signs, constants and limits."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
  };
}

function intNumber(
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
    hint: "Evaluate the antiderivative at the limits and give the requested value only.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function trapNumber(
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
    hint: "Identify h and combine the endpoint and interior y-values carefully.",
    explanation: explanation ?? `The trapezoidal approximation is ${answer}.`,
  };
}

function furtherIntegralLesson(
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
    moduleSlug: "further-integral-calculus",
    moduleTitle: "Further Integral Calculus",
    courseTitle: "Year 12 Mathematics Advanced",
    title,
    description,
    syllabusArea: "Calculus",
    focus: "Further integral calculus",
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

export const standardIntegralsLesson = furtherIntegralLesson(
  "standard-integrals",
  "Standard Integrals: Trigonometric, Exponential and Logarithmic Forms",
  "Use standard antiderivatives for sine, cosine, exponential and reciprocal functions, including constants of integration.",
  "Recognise and apply standard integration forms beyond polynomial reverse power rule.",
  [
    "Recall the antiderivatives of sin x and cos x.",
    "Recall the antiderivative of e^x.",
    "Recognise that integrating 1/x gives a logarithmic form.",
    "Include +C for indefinite integrals.",
    "Apply constant multiples and sums.",
    "Evaluate simple definite integrals using standard forms.",
  ],
  {
    paragraphs: [
      "Further integration extends the reverse power rule to standard functions.",
      "The integral of cosine is sine, but the integral of sine is negative cosine. The sign is a common trap.",
      "The exponential function e^x integrates to itself.",
      "The reciprocal function 1/x integrates to a logarithmic form. In general work, this is written as ln absolute x plus C.",
      "For indefinite integrals, include the constant of integration. For definite integrals, evaluate the antiderivative at the upper and lower limits.",
    ],
    latexBlocks: [
      "\\int \\sin x\\,dx=-\\cos x+C",
      "\\int \\cos x\\,dx=\\sin x+C",
      "\\int e^x\\,dx=e^x+C",
      "\\int \\frac{1}{x}\\,dx=\\ln|x|+C",
    ],
  },
  [
    {
      title: "Integrate sine and cosine",
      questionLatex: "\\int (\\sin x+2\\cos x)\\,dx",
      steps: [
        { explanation: "Integrate sine as negative cosine.", latex: "\\int \\sin x\\,dx=-\\cos x" },
        { explanation: "Integrate cosine as sine and keep the constant multiple.", latex: "\\int 2\\cos x\\,dx=2\\sin x" },
        { explanation: "Add the constant of integration.", latex: "-\\cos x+2\\sin x+C" },
      ],
      finalAnswerLatex: "-\\cos x+2\\sin x+C",
    },
    {
      title: "Integrate exponential and reciprocal terms",
      questionLatex: "\\int \\left(3e^x+\\frac{2}{x}\\right)\\,dx",
      steps: [
        { explanation: "The integral of e^x is e^x.", latex: "3e^x" },
        { explanation: "The integral of 1/x is logarithmic.", latex: "2\\ln|x|" },
        { explanation: "Include +C.", latex: "3e^x+2\\ln|x|+C" },
      ],
      finalAnswerLatex: "3e^x+2\\ln|x|+C",
    },
    {
      title: "Simple definite integral",
      questionLatex: "\\int_0^{\\pi/2}\\cos x\\,dx",
      steps: [
        { explanation: "Use sine as the antiderivative.", latex: "\\int \\cos x\\,dx=\\sin x" },
        { explanation: "Evaluate at the limits.", latex: "\\sin\\frac{\\pi}{2}-\\sin0=1-0" },
      ],
      finalAnswerLatex: "1",
    },
  ],
  [
    intChoice("fint-std-g1", "Choose the correct antiderivative.", "\\int \\sin x\\,dx", "B", ["$\\cos x+C$", "$-\\cos x+C$", "$\\sin x+C$", "$-\\sin x+C$"], "Differentiating $-\\cos x$ gives $\\sin x$."),
    intChoice("fint-std-g2", "Choose the correct antiderivative.", "\\int \\cos x\\,dx", "A", ["$\\sin x+C$", "$-\\sin x+C$", "$\\cos x+C$", "$-\\cos x+C$"], "Differentiating $\\sin x$ gives $\\cos x$."),
    intChoice("fint-std-g3", "Choose the correct antiderivative.", "\\int e^x\\,dx", "C", ["$xe^x+C$", "$\\ln x+C$", "$e^x+C$", "$\\frac{1}{x}+C$"], "The function e^x integrates to itself."),
    intNumber("fint-std-g4", "Evaluate the definite integral.", "\\int_0^{\\pi/2}\\cos x\\,dx", "1"),
  ],
  [
    intChoice("fint-std-i1", "Choose the correct antiderivative.", "\\int \\frac{1}{x}\\,dx", "D", ["$x^{-2}+C$", "$\\frac{x^2}{2}+C$", "$e^x+C$", "$\\ln|x|+C$"], "The reciprocal form integrates to $\\ln|x|+C$."),
    intChoice("fint-std-i2", "Choose the correct antiderivative.", "\\int 4e^x\\,dx", "A", ["$4e^x+C$", "$e^{4x}+C$", "$4xe^x+C$", "$4\\ln x+C$"], "The constant multiple remains outside the integral."),
    intChoice("fint-std-i3", "Choose the correct antiderivative.", "\\int (2\\cos x-\\sin x)\\,dx", "B", ["$2\\sin x-\\cos x+C$", "$2\\sin x+\\cos x+C$", "$-2\\sin x+\\cos x+C$", "$2\\cos x+\\sin x+C$"], "Integrating $-\\sin x$ gives $+\\cos x$."),
    intNumber("fint-std-i4", "Evaluate the definite integral.", "\\int_0^{\\pi}\\sin x\\,dx", "2"),
    intNumber("fint-std-i5", "Evaluate the definite integral.", "\\int_1^e \\frac{1}{x}\\,dx", "1"),
  ],
  [
    { mistake: "Integrating sin x as cos x.", fix: "The integral of sin x is $-\\cos x+C$." },
    { mistake: "Adding +C to a definite integral answer.", fix: "Use +C for indefinite integrals only." },
    { mistake: "Using the power rule on $x^{-1}$.", fix: "$\\int \\frac1x\\,dx=\\ln|x|+C$, not $x^0/0$." },
    { mistake: "Forgetting constant multiples.", fix: "Constants multiply the antiderivative." },
  ],
  [
    intChoice("fint-std-m1", "Choose the correct antiderivative.", "\\int \\sin x\\,dx", "A", ["$-\\cos x+C$", "$\\cos x+C$", "$-\\sin x+C$", "$\\sin x+C$"], "Differentiate $-\\cos x$ to get $\\sin x$."),
    intChoice("fint-std-m2", "Choose the correct antiderivative.", "\\int \\cos x\\,dx", "C", ["$-\\cos x+C$", "$\\cos x+C$", "$\\sin x+C$", "$-\\sin x+C$"], "Differentiating $\\sin x$ gives $\\cos x$."),
    intChoice("fint-std-m3", "Choose the correct antiderivative.", "\\int 5e^x\\,dx", "B", ["$e^{5x}+C$", "$5e^x+C$", "$5xe^x+C$", "$5\\ln x+C$"], "The antiderivative is $5e^x+C$."),
    intChoice("fint-std-m4", "Choose the correct antiderivative.", "\\int \\frac{3}{x}\\,dx", "D", ["$\\frac{3}{2}x^2+C$", "$3x^{-2}+C$", "$\\ln|3x|+C$", "$3\\ln|x|+C$"], "The constant multiple gives $3\\ln|x|+C$."),
    intNumber("fint-std-m5", "Evaluate the definite integral.", "\\int_0^{\\pi/2}\\cos x\\,dx", "1"),
    intNumber("fint-std-m6", "Evaluate the definite integral.", "\\int_0^{\\pi}\\sin x\\,dx", "2"),
    intNumber("fint-std-m7", "Evaluate the definite integral.", "\\int_1^e \\frac{1}{x}\\,dx", "1"),
    intChoice("fint-std-m8", "Which answer correctly includes the constant of integration?", "\\int (e^x+\\cos x)\\,dx", "C", ["$e^x-\\sin x$", "$xe^x+\\sin x+C$", "$e^x+\\sin x+C$", "$e^x+\\cos x+C$"], "For an indefinite integral, include +C after integrating each term."),
    intChoice("fint-std-m9", "A student writes $\\int \\sin x\\,dx=\\cos x+C$. Which issue is present?", "\\int \\sin x\\,dx", "B", ["The constant is missing", "The sign is wrong", "The reciprocal rule is needed", "The answer should be $e^x+C$"], "The derivative of $\\cos x$ is $-\\sin x$."),
    intChoice("fint-std-m10", "Which standard form is needed first?", "\\int \\left(\\frac{2}{x}-3\\sin x\\right)\\,dx", "A", ["reciprocal and sine forms", "reverse power rule only", "trapezoidal rule", "area between curves"], "The integral combines $1/x$ and $\\sin x$ standard forms."),
  ]
);

export const reverseChainRuleLesson = furtherIntegralLesson(
  "reverse-chain-rule",
  "Reverse Chain Rule and Simple Substitution Forms",
  "Recognise simple composite integrals where the inner derivative changes the coefficient of the antiderivative.",
  "Use reverse chain rule patterns for exponential, logarithmic, trigonometric and linear-power integrals.",
  [
    "Recognise simple $f'(x)g(f(x))$ patterns.",
    "Integrate $e^{ax+b}$ with the correct scale factor.",
    "Integrate reciprocal forms involving $ax+b$.",
    "Integrate sine and cosine of linear expressions.",
    "Integrate powers of linear expressions.",
    "Avoid missing the inner derivative factor.",
  ],
  {
    paragraphs: [
      "The reverse chain rule reverses differentiation of a composite function.",
      "When the inside function is linear, the antiderivative often needs a scale factor of one over the inner derivative.",
      "For $e^{ax+b}$, the antiderivative has a factor of $1/a$.",
      "For $1/(ax+b)$, the antiderivative has a factor of $1/a$ in front of the logarithm.",
      "For trigonometric composites, the sign and inner derivative both matter.",
    ],
    latexBlocks: [
      "\\int e^{ax+b}\\,dx=\\frac{1}{a}e^{ax+b}+C",
      "\\int \\frac{1}{ax+b}\\,dx=\\frac{1}{a}\\ln|ax+b|+C",
      "\\int \\cos(ax+b)\\,dx=\\frac{1}{a}\\sin(ax+b)+C",
      "\\int \\sin(ax+b)\\,dx=-\\frac{1}{a}\\cos(ax+b)+C",
    ],
  },
  [
    {
      title: "Exponential reverse chain",
      questionLatex: "\\int e^{3x+1}\\,dx",
      steps: [
        { explanation: "The inner derivative of 3x+1 is 3.", latex: "\\frac{d}{dx}(3x+1)=3" },
        { explanation: "Divide by the inner derivative.", latex: "\\frac{1}{3}e^{3x+1}+C" },
      ],
      finalAnswerLatex: "\\frac13e^{3x+1}+C",
    },
    {
      title: "Logarithmic reverse chain",
      questionLatex: "\\int \\frac{1}{2x-5}\\,dx",
      steps: [
        { explanation: "The inner derivative of 2x - 5 is 2." },
        { explanation: "Use the reciprocal-log form with a factor of one half.", latex: "\\frac12\\ln|2x-5|+C" },
      ],
      finalAnswerLatex: "\\frac12\\ln|2x-5|+C",
    },
    {
      title: "Trigonometric reverse chain",
      questionLatex: "\\int \\cos(4x)\\,dx",
      steps: [
        { explanation: "The inner derivative of 4x is 4." },
        { explanation: "Integrating cosine gives sine, then divide by 4.", latex: "\\frac14\\sin(4x)+C" },
      ],
      finalAnswerLatex: "\\frac14\\sin(4x)+C",
    },
  ],
  [
    intChoice("fint-chain-g1", "Choose the correct antiderivative.", "\\int e^{2x}\\,dx", "B", ["$e^{2x}+C$", "$\\frac12e^{2x}+C$", "$2e^{2x}+C$", "$e^x+C$"], "The inner derivative is 2, so divide by 2."),
    intChoice("fint-chain-g2", "Choose the correct antiderivative.", "\\int \\cos(3x)\\,dx", "C", ["$\\sin(3x)+C$", "$-\\frac13\\sin(3x)+C$", "$\\frac13\\sin(3x)+C$", "$3\\sin(3x)+C$"], "Integrating cosine gives sine, with factor $\\frac13$."),
    intChoice("fint-chain-g3", "Choose the missing factor.", "\\int \\frac{1}{5x+1}\\,dx", "A", ["$\\frac15$", "$5$", "$-5$", "$\\frac{1}{5x+1}$"], "The inner derivative is 5, so the logarithm needs factor $\\frac15$."),
    intChoice("fint-chain-g4", "Choose the correct antiderivative.", "\\int (2x+1)^4\\,dx", "D", ["$\\frac15(2x+1)^5+C$", "$2(2x+1)^5+C$", "$(2x+1)^5+C$", "$\\frac{1}{10}(2x+1)^5+C$"], "Increase the power to 5 and divide by both 5 and the inner derivative 2."),
  ],
  [
    intChoice("fint-chain-i1", "Choose the correct antiderivative.", "\\int e^{4x-2}\\,dx", "A", ["$\\frac14e^{4x-2}+C$", "$4e^{4x-2}+C$", "$e^{4x-2}+C$", "$e^{4x}+C$"], "Divide by the inner derivative 4."),
    intChoice("fint-chain-i2", "Choose the correct antiderivative.", "\\int \\sin(2x)\\,dx", "B", ["$\\frac12\\cos(2x)+C$", "$-\\frac12\\cos(2x)+C$", "$2\\cos(2x)+C$", "$-2\\cos(2x)+C$"], "Integrating sine gives negative cosine and divide by 2."),
    intChoice("fint-chain-i3", "Choose the correct antiderivative.", "\\int \\frac{1}{3x-4}\\,dx", "C", ["$\\ln|3x-4|+C$", "$3\\ln|3x-4|+C$", "$\\frac13\\ln|3x-4|+C$", "$\\frac{1}{3x-4}+C$"], "Use the factor $\\frac13$."),
    intChoice("fint-chain-i4", "Which pattern is present?", "\\int 6x e^{3x^2}\\,dx", "D", ["power rule only", "area between curves", "trapezoidal rule", "inner derivative times exponential composite"], "The derivative of $3x^2$ is $6x$."),
    intChoice("fint-chain-i5", "Choose the correct antiderivative.", "\\int 6x e^{3x^2}\\,dx", "A", ["$e^{3x^2}+C$", "$6e^{3x^2}+C$", "$18x e^{3x^2}+C$", "$\\frac16e^{3x^2}+C$"], "The integrand is exactly the inner derivative times $e^{3x^2}$."),
  ],
  [
    { mistake: "Forgetting to divide by the inner derivative.", fix: "Check by differentiating the proposed antiderivative." },
    { mistake: "Using the same sign for sine and cosine integrals.", fix: "Integrating sine gives negative cosine." },
    { mistake: "Writing $\\ln(ax+b)$ without a scale factor.", fix: "Include $\\frac1a$ for $\\int \\frac1{ax+b}\\,dx$." },
    { mistake: "Assuming every composite integral needs a new method.", fix: "Many syllabus examples are simple reverse-chain patterns." },
  ],
  [
    intChoice("fint-chain-m1", "Choose the correct antiderivative.", "\\int e^{5x}\\,dx", "C", ["$e^{5x}+C$", "$5e^{5x}+C$", "$\\frac15e^{5x}+C$", "$e^x+C$"], "Divide by the inner derivative 5."),
    intChoice("fint-chain-m2", "Choose the correct antiderivative.", "\\int \\cos(2x+1)\\,dx", "A", ["$\\frac12\\sin(2x+1)+C$", "$2\\sin(2x+1)+C$", "$-\\frac12\\sin(2x+1)+C$", "$\\cos(2x+1)+C$"], "Integrating cosine gives sine and divide by 2."),
    intChoice("fint-chain-m3", "Choose the correct antiderivative.", "\\int \\sin(3x-1)\\,dx", "D", ["$\\frac13\\cos(3x-1)+C$", "$3\\cos(3x-1)+C$", "$-3\\cos(3x-1)+C$", "$-\\frac13\\cos(3x-1)+C$"], "Integrating sine gives negative cosine and divide by 3."),
    intChoice("fint-chain-m4", "Choose the correct antiderivative.", "\\int \\frac{1}{4x+7}\\,dx", "B", ["$\\ln|4x+7|+C$", "$\\frac14\\ln|4x+7|+C$", "$4\\ln|4x+7|+C$", "$\\frac{1}{4x+7}+C$"], "The inner derivative is 4."),
    intChoice("fint-chain-m5", "Choose the correct antiderivative.", "\\int (3x-2)^5\\,dx", "C", ["$\\frac16(3x-2)^6+C$", "$3(3x-2)^6+C$", "$\\frac1{18}(3x-2)^6+C$", "$\\frac13(3x-2)^6+C$"], "Increase the power to 6 and divide by $6\\cdot3$."),
    intChoice("fint-chain-m6", "Which expression has an exact reverse-chain pattern?", "\\text{Select A, B, C, or D.}", "A", ["$6x e^{3x^2}$", "$x e^{3x}$", "$e^x+x$", "$\\frac{1}{x^2+1}$"], "$6x$ is the derivative of $3x^2$."),
    intChoice("fint-chain-m7", "A student writes $\\int e^{2x}\\,dx=e^{2x}+C$. What is missing?", "\\int e^{2x}\\,dx", "B", ["a negative sign", "the factor $\\frac12$", "absolute value bars", "a squared term"], "Differentiating $e^{2x}$ gives $2e^{2x}$."),
    intChoice("fint-chain-m8", "Choose the correct antiderivative.", "\\int 2\\cos(2x)\\,dx", "D", ["$2\\sin(2x)+C$", "$-\\sin(2x)+C$", "$\\frac12\\sin(2x)+C$", "$\\sin(2x)+C$"], "The outside 2 cancels the inner derivative factor."),
    intChoice("fint-chain-m9", "Choose the strongest check.", "\\int \\frac{1}{2x+3}\\,dx", "C", ["Differentiate $\\ln|2x+3|$", "Differentiate $2\\ln|2x+3|$", "Differentiate $\\frac12\\ln|2x+3|$", "Differentiate $\\frac{1}{2x+3}$"], "The factor $\\frac12$ accounts for the inner derivative."),
    intChoice("fint-chain-m10", "Which antiderivative is correct?", "\\int 8x(2x^2+1)^3\\,dx", "B", ["$(2x^2+1)^4+C$", "$\\frac12(2x^2+1)^4+C$", "$8(2x^2+1)^4+C$", "$2x^2(2x^2+1)^4+C$"], "The derivative of $\\frac12(2x^2+1)^4$ is $8x(2x^2+1)^3$."),
  ]
);

export const definiteIntegralsStandardFormsLesson = furtherIntegralLesson(
  "definite-integrals-standard-forms",
  "Definite Integrals with Standard Forms",
  "Evaluate definite integrals involving trigonometric, exponential and logarithmic standard forms at clean limits.",
  "Use standard antiderivatives to evaluate exact definite integrals and interpret signed area.",
  [
    "Choose a standard antiderivative before substituting limits.",
    "Evaluate trigonometric definite integrals at clean radian limits.",
    "Evaluate exponential definite integrals at clean limits.",
    "Evaluate reciprocal integrals using logarithms.",
    "Interpret negative definite integrals as signed area.",
    "Distinguish exact values from calculator approximations.",
  ],
  {
    paragraphs: [
      "A definite integral gives a signed accumulation over an interval.",
      "For standard forms, first choose the antiderivative, then substitute the upper and lower limits.",
      "Trigonometric limits such as 0, pi over 2 and pi are chosen because their exact values are known.",
      "For reciprocal integrals, logarithms appear after antidifferentiation.",
      "If a graph is below the x-axis, the definite integral is negative even though geometric area is positive.",
    ],
    latexBlocks: [
      "\\int_a^b f(x)\\,dx=F(b)-F(a)",
      "\\int_0^{\\pi/2}\\sin x\\,dx=1",
      "\\int_0^1 e^x\\,dx=e-1",
      "\\int_1^e \\frac1x\\,dx=1",
    ],
  },
  [
    {
      title: "Evaluate a sine integral",
      questionLatex: "\\int_0^{\\pi/2}\\sin x\\,dx",
      steps: [
        { explanation: "Use negative cosine as an antiderivative.", latex: "F(x)=-\\cos x" },
        { explanation: "Substitute the upper and lower limits.", latex: "F\\left(\\frac\\pi2\\right)-F(0)=0-(-1)" },
      ],
      finalAnswerLatex: "1",
    },
    {
      title: "Evaluate an exponential integral",
      questionLatex: "\\int_0^1 e^x\\,dx",
      steps: [
        { explanation: "The antiderivative of e^x is e^x.", latex: "F(x)=e^x" },
        { explanation: "Evaluate at the limits.", latex: "e^1-e^0=e-1" },
      ],
      finalAnswerLatex: "e-1",
    },
    {
      title: "Signed area below the axis",
      questionLatex: "\\int_0^\\pi -\\sin x\\,dx",
      steps: [
        { explanation: "The function is below the x-axis on the interval." },
        { explanation: "The integral is the negative of the area under sine from 0 to pi.", latex: "-2" },
      ],
      finalAnswerLatex: "-2",
    },
  ],
  [
    intNumber("fint-def-g1", "Evaluate the definite integral.", "\\int_0^{\\pi/2}\\sin x\\,dx", "1"),
    intNumber("fint-def-g2", "Evaluate the definite integral.", "\\int_0^{\\pi/2}\\cos x\\,dx", "1"),
    intChoice("fint-def-g3", "Choose the exact value.", "\\int_0^1 e^x\\,dx", "A", ["$e-1$", "$e$", "$1-e$", "$1$"], "The antiderivative is $e^x$, so the value is $e-1$."),
    intNumber("fint-def-g4", "Evaluate the definite integral.", "\\int_1^e \\frac1x\\,dx", "1"),
  ],
  [
    intNumber("fint-def-i1", "Evaluate the definite integral.", "\\int_0^{\\pi} \\sin x\\,dx", "2"),
    intNumber("fint-def-i2", "Evaluate the definite integral.", "\\int_0^{\\pi} \\cos x\\,dx", "0"),
    intChoice("fint-def-i3", "Choose the exact value.", "\\int_0^2 e^x\\,dx", "C", ["$e^2$", "$2e$", "$e^2-1$", "$1-e^2$"], "Evaluate $e^x$ from 0 to 2."),
    intChoice("fint-def-i4", "Choose the exact value.", "\\int_1^{e^2}\\frac1x\\,dx", "D", ["$e^2-1$", "$1$", "$\\ln2$", "$2$"], "The value is $\\ln(e^2)-\\ln1=2$."),
    intChoice("fint-def-i5", "What does a negative definite integral indicate?", "\\int_a^b f(x)\\,dx<0", "B", ["No area exists", "Signed area is negative over the interval", "The interval is invalid", "The antiderivative is impossible"], "A definite integral is signed accumulation."),
  ],
  [
    { mistake: "Adding +C after evaluating a definite integral.", fix: "Use +C only for indefinite integrals." },
    { mistake: "Substituting the lower limit first.", fix: "Compute upper value minus lower value." },
    { mistake: "Treating signed area as geometric area.", fix: "A negative integral may correspond to positive geometric area below the axis." },
    { mistake: "Using decimal approximations when exact values are expected.", fix: "Keep values such as $e-1$ and logarithms exact." },
  ],
  [
    intNumber("fint-def-m1", "Evaluate the definite integral.", "\\int_0^{\\pi/2}\\sin x\\,dx", "1"),
    intNumber("fint-def-m2", "Evaluate the definite integral.", "\\int_0^{\\pi}\\cos x\\,dx", "0"),
    intNumber("fint-def-m3", "Evaluate the definite integral.", "\\int_0^{\\pi} \\sin x\\,dx", "2"),
    intChoice("fint-def-m4", "Choose the exact value.", "\\int_0^1 e^x\\,dx", "B", ["$e$", "$e-1$", "$1-e$", "$0$"], "Evaluate $e^x$ from 0 to 1."),
    intChoice("fint-def-m5", "Choose the exact value.", "\\int_1^{e} \\frac{2}{x}\\,dx", "D", ["$1$", "$e^2$", "$2e$", "$2$"], "The value is $2(\\ln e-\\ln1)=2$."),
    intNumber("fint-def-m6", "Evaluate the definite integral.", "\\int_0^\\pi -\\sin x\\,dx", "-2"),
    intChoice("fint-def-m7", "Which antiderivative should be used first?", "\\int_0^{\\pi/2} 3\\cos x\\,dx", "A", ["$3\\sin x$", "$-3\\cos x$", "$3x\\cos x$", "$\\sin3x$"], "The antiderivative of $3\\cos x$ is $3\\sin x$."),
    intChoice("fint-def-m8", "Which value is exact?", "\\int_0^2 e^x\\,dx", "C", ["$2e$", "$e^2$", "$e^2-1$", "$1-e^2$"], "Evaluate $e^x$ at 2 and 0."),
    intChoice("fint-def-m9", "A student gets $-1$ for $\\int_0^{\\pi/2}\\sin x\\,dx$. Which error is likely?", "\\int_0^{\\pi/2}\\sin x\\,dx", "B", ["They forgot logarithms", "They reversed the sign in the sine antiderivative or limits", "They used tangent", "They used area between curves"], "The correct value is positive 1."),
    intChoice("fint-def-m10", "Which interpretation is correct?", "\\int_0^\\pi -\\sin x\\,dx=-2", "A", ["signed area is -2, geometric area is 2", "signed area and geometric area are both -2", "the integral cannot be negative", "the interval must be split"], "The curve is below the axis, so signed and geometric area differ."),
  ]
);

export const areaBetweenCurvesExtendedLesson = furtherIntegralLesson(
  "area-between-curves-extended",
  "Area Between Curves",
  "Find and interpret area between curves using top minus bottom, intersections and interval splitting where needed.",
  "Set up area between curves carefully, distinguishing signed integrals from geometric area.",
  [
    "Use top function minus bottom function on an interval.",
    "Find simple intersection points when needed.",
    "Recognise when curves cross and the interval must be split.",
    "Choose correct area setups from multiple-choice options.",
    "Distinguish geometric area from signed integral.",
    "Avoid reversing upper and lower curves.",
  ],
  {
    paragraphs: [
      "Area between curves is found by integrating the vertical distance between the curves.",
      "On an interval where one curve stays above the other, use top minus bottom.",
      "If the curves cross inside the interval, a single top-minus-bottom expression may become negative on part of the interval.",
      "When curves cross, split the interval at the intersection and add positive area pieces.",
      "Multiple-choice setups are used here because equivalent symbolic setup forms can be fragile to mark as typed answers.",
    ],
    latexBlocks: [
      "\\text{Area}=\\int_a^b (\\text{top}-\\text{bottom})\\,dx",
      "f(x)=g(x)\\Rightarrow \\text{intersection points}",
      "\\text{if curves cross, split the interval}",
      "\\text{geometric area is non-negative}",
    ],
  },
  [
    {
      title: "Top minus bottom",
      questionLatex: "y=4,\\quad y=x,\\quad 0\\le x\\le2",
      steps: [
        { explanation: "The top curve is y = 4 and the bottom curve is y = x on the interval." },
        { explanation: "Set up top minus bottom.", latex: "\\int_0^2(4-x)\\,dx" },
        { explanation: "Evaluate the area.", latex: "[4x-\\frac{x^2}{2}]_0^2=6" },
      ],
      finalAnswerLatex: "6",
      cartesianGraph: {
        description: "The horizontal line y equals 4 stays above the line y equals x from x equals 0 to x equals 2. The vertical gap between the lines is shaded.",
        xMin: -0.5, xMax: 2.5, yMin: -1, yMax: 5, xStep: 0.5, yStep: 1,
        lines: [
          { kind: "linear", m: 0, b: 4, label: "y = 4" },
          { kind: "linear", m: 1, b: 0, label: "y = x" },
        ],
        shadedRegions: [{
          kind: "between-functions",
          xMin: 0,
          xMax: 2,
          top: { functionType: "line", line: { m: 0, b: 4 } },
          bottom: { functionType: "line", line: { m: 1, b: 0 } },
          description: "Shaded vertical gap between y equals 4 and y equals x from x equals 0 to x equals 2.",
        }],
      },
    },
    {
      title: "Find intersections first",
      questionLatex: "y=x,\\quad y=x^2",
      steps: [
        { explanation: "Set the equations equal.", latex: "x=x^2" },
        { explanation: "Solve for intersections.", latex: "x=0,1" },
        { explanation: "On 0 to 1, x is above x squared.", latex: "\\int_0^1(x-x^2)\\,dx" },
      ],
      finalAnswerLatex: "\\frac16",
      cartesianGraph: {
        description: "The line y equals x and the parabola y equals x squared meet at x equals 0 and x equals 1. The gap between the curves is shaded on that interval.",
        xMin: -0.5, xMax: 1.5, yMin: -0.5, yMax: 2, xStep: 0.5, yStep: 0.5,
        lines: [{ kind: "linear", m: 1, b: 0, label: "y = x" }],
        parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y = x^2" }],
        shadedRegions: [{
          kind: "between-functions",
          xMin: 0,
          xMax: 1,
          top: { functionType: "line", line: { m: 1, b: 0 } },
          bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } },
          description: "Shaded region between y equals x and y equals x squared from x equals 0 to x equals 1.",
        }],
      },
    },
    {
      title: "Split when curves cross",
      questionLatex: "y=x,\\quad y=0,\\quad -1\\le x\\le1",
      steps: [
        { explanation: "The graph crosses the x-axis at x = 0." },
        { explanation: "Use absolute area by splitting.", latex: "\\int_{-1}^0(0-x)\\,dx+\\int_0^1(x-0)\\,dx" },
        { explanation: "Each triangular part has area one half." },
      ],
      finalAnswerLatex: "1",
      cartesianGraph: {
        description: "The line y equals x crosses the x-axis at x equals 0. The two triangular regions are shaded separately so their positive geometric areas can be added.",
        xMin: -1.5, xMax: 1.5, yMin: -1.5, yMax: 1.5, xStep: 0.5, yStep: 0.5,
        lines: [{ kind: "linear", m: 1, b: 0, label: "y = x" }],
        shadedRegions: [
          {
            kind: "under-function",
            functionType: "line",
            line: { m: 1, b: 0 },
            xMin: -1,
            xMax: 0,
            description: "Shaded triangle below the x-axis from x equals negative 1 to x equals 0.",
          },
          {
            kind: "under-function",
            functionType: "line",
            line: { m: 1, b: 0 },
            xMin: 0,
            xMax: 1,
            description: "Shaded triangle above the x-axis from x equals 0 to x equals 1.",
          },
        ],
      },
    },
  ],
  [
    intChoice("fint-area-g1", "Choose the correct setup for area.", "y=5,\\quad y=x,\\quad 0\\le x\\le3", "A", ["$\\int_0^3(5-x)\\,dx$", "$\\int_0^3(x-5)\\,dx$", "$\\int_0^5(3-x)\\,dx$", "$5-3$"], "Use top minus bottom."),
    intNumber("fint-area-g2", "Find the area.", "y=4,\\quad y=x,\\quad 0\\le x\\le2", "6"),
    intChoice("fint-area-g3", "Find the intersection x-values.", "x=x^2", "C", ["$x=1$ only", "$x=-1,1$", "$x=0,1$", "$x=0$ only"], "Solve $x(x-1)=0$."),
    intChoice("fint-area-g4", "What should happen if the curves cross inside the interval?", "\\text{area between curves}", "B", ["Ignore the crossing", "Split the interval or use absolute difference", "Use lower minus upper", "Add +C"], "Geometric area must stay non-negative."),
  ],
  [
    intChoice("fint-area-i1", "Choose the correct setup.", "y=3,\\quad y=x^2,\\quad 0\\le x\\le1", "D", ["$\\int_0^1(x^2-3)\\,dx$", "$\\int_0^3(1-x^2)\\,dx$", "$\\int_0^1(3+x^2)\\,dx$", "$\\int_0^1(3-x^2)\\,dx$"], "On this interval, y = 3 is above y = x squared."),
    intNumber("fint-area-i2", "Find the area.", "y=3,\\quad y=1,\\quad 0\\le x\\le4", "8"),
    intChoice("fint-area-i3", "Which function is on top over the interval?", "y=x,\\quad y=x^2,\\quad 0<x<1", "A", ["$y=x$", "$y=x^2$", "they are equal throughout", "neither curve exists"], "For values between 0 and 1, x is greater than x squared."),
    intChoice("fint-area-i4", "Choose the correct setup for geometric area.", "y=x,\\quad y=0,\\quad -1\\le x\\le1", "C", ["$\\int_{-1}^1x\\,dx$", "$\\int_{-1}^1(0-x)\\,dx$", "$\\int_{-1}^0(0-x)\\,dx+\\int_0^1x\\,dx$", "$\\int_0^1x\\,dx$ only"], "The curve crosses the axis at 0, so split the interval."),
    intNumber("fint-area-i5", "Find the area between the horizontal lines over the interval.", "y=6,\\quad y=2,\\quad 0\\le x\\le5", "20"),
  ],
  [
    { mistake: "Using lower minus upper.", fix: "Use top minus bottom for area on a fixed interval." },
    { mistake: "Forgetting to find intersections.", fix: "Intersections often become the limits of integration." },
    { mistake: "Failing to split when curves cross.", fix: "Split at crossing points for geometric area." },
    { mistake: "Reporting a negative geometric area.", fix: "Geometric area is non-negative; signed integrals can be negative." },
  ],
  [
    intChoice("fint-area-m1", "Choose the correct setup.", "y=4,\\quad y=x,\\quad 0\\le x\\le2", "A", ["$\\int_0^2(4-x)\\,dx$", "$\\int_0^2(x-4)\\,dx$", "$\\int_0^4(2-x)\\,dx$", "$\\int_0^2(4+x)\\,dx$"], "Use top minus bottom."),
    intNumber("fint-area-m2", "Find the area.", "y=4,\\quad y=x,\\quad 0\\le x\\le2", "6"),
    intChoice("fint-area-m3", "Find the intersection x-values.", "x^2=2x", "B", ["$x=2$ only", "$x=0,2$", "$x=-2,2$", "$x=0$ only"], "Solve $x(x-2)=0$."),
    intChoice("fint-area-m4", "Which curve is above on the interval?", "y=2x,\\quad y=x^2,\\quad 0<x<2", "C", ["$y=x^2$", "they are equal throughout", "$y=2x$", "neither curve"], "For 0 < x < 2, $2x>x^2$."),
    intChoice("fint-area-m5", "Choose the correct setup between intersections.", "y=2x,\\quad y=x^2", "D", ["$\\int_0^2(x^2-2x)\\,dx$", "$\\int_{-2}^2(2x-x^2)\\,dx$", "$\\int_0^2(2x+x^2)\\,dx$", "$\\int_0^2(2x-x^2)\\,dx$"], "The intersections are 0 and 2, and $2x$ is above $x^2$."),
    intNumber("fint-area-m6", "Find the area between the curves.", "y=5,\\quad y=2,\\quad 1\\le x\\le4", "9"),
    intChoice("fint-area-m7", "Which setup gives total geometric area?", "y=x,\\quad y=0,\\quad -2\\le x\\le2", "B", ["$\\int_{-2}^2x\\,dx$", "$\\int_{-2}^0(0-x)\\,dx+\\int_0^2x\\,dx$", "$\\int_0^2x\\,dx$", "$\\int_{-2}^2(0-x)\\,dx$"], "Split at x = 0 and add positive areas."),
    intNumber("fint-area-m8", "Find the geometric area.", "y=x,\\quad y=0,\\quad -1\\le x\\le1", "1"),
    intChoice("fint-area-m9", "A student sets up $\\int_0^1(x^2-x)\\,dx$ for the area between $y=x$ and $y=x^2$. What is the issue?", "\\text{on }0\\le x\\le1", "A", ["The order is lower minus upper", "The limits are reversed", "The curves do not intersect", "The answer needs +C"], "On this interval, x is above x squared."),
    intChoice("fint-area-m10", "Which method is safest for curves that cross twice inside an interval?", "\\text{area between curves}", "C", ["Use one signed integral only", "Ignore intersections", "Split into intervals where top and bottom are fixed", "Always use the trapezoidal rule"], "Splitting prevents cancellation of geometric area."),
  ]
);

export const trapezoidalRuleLesson = furtherIntegralLesson(
  "trapezoidal-rule",
  "The Trapezoidal Rule",
  "Approximate definite integrals from functions or tables using one or more trapezoids, and interpret the effect of concavity.",
  "Use the trapezoidal rule to approximate definite integrals and judge when the approximation is likely to overestimate or underestimate.",
  [
    "Identify the subinterval width h from limits and number of subintervals.",
    "Apply the trapezoidal rule using endpoint and interior y-values.",
    "Use one trapezoid and two trapezoids in simple function examples.",
    "Approximate an integral from a table of values.",
    "Recognise common coefficient errors in the trapezoidal formula.",
    "Use concavity to decide whether the approximation overestimates or underestimates.",
  ],
  {
    paragraphs: [
      "The trapezoidal rule approximates a definite integral by replacing a curve with straight line segments and adding the areas of trapezoids.",
      "The interval from a to b is split into n equal subintervals. The width of each subinterval is h.",
      "Endpoint y-values are used once. Interior y-values are used twice because each interior height belongs to two neighbouring trapezoids.",
      "With one subinterval, the rule is just the area of one trapezoid. With more subintervals, the straight segments usually follow the curve more closely.",
      "Concavity helps interpret the error. For a concave-up graph, the trapezoids sit above the curve and tend to overestimate. For a concave-down graph, they tend to underestimate.",
    ],
    latexBlocks: [
      "h=\\frac{b-a}{n}",
      "\\int_a^b f(x)\\,dx\\approx\\frac h2\\left[y_0+2y_1+2y_2+\\cdots+2y_{n-1}+y_n\\right]",
      "\\text{one subinterval: }\\frac h2(y_0+y_1)",
      "\\text{more subintervals usually improve the approximation}",
    ],
  },
  [
    {
      title: "One trapezoid for a simple integral",
      questionLatex:
        "\\text{Use one trapezoid to approximate }\\int_0^2 x^2\\,dx.",
      steps: [
        { explanation: "With one subinterval, the width is 2.", latex: "h=2" },
        { explanation: "Find the endpoint y-values.", latex: "y_0=f(0)=0,\\quad y_1=f(2)=4" },
        { explanation: "Use the one-trapezoid rule.", latex: "\\frac{2}{2}(0+4)=4" },
      ],
      finalAnswerLatex: "4",
    },
    {
      title: "Two trapezoids for a simple integral",
      questionLatex:
        "\\text{Use two subintervals to approximate }\\int_0^2 x^2\\,dx.",
      steps: [
        { explanation: "The width is one.", latex: "h=\\frac{2-0}{2}=1" },
        { explanation: "Use x-values 0, 1 and 2.", latex: "y_0=0,\\quad y_1=1,\\quad y_2=4" },
        { explanation: "Double the interior value.", latex: "\\frac12(0+2(1)+4)=3" },
      ],
      finalAnswerLatex: "3",
    },
    {
      title: "Use a table of values",
      questionLatex:
        "\\begin{array}{c|cccc}x&0&1&2&3\\\\ y&2&5&6&8\\end{array}",
      steps: [
        { explanation: "The x-values are one unit apart.", latex: "h=1" },
        { explanation: "Use endpoints once and interior values twice.", latex: "\\frac12(2+2(5)+2(6)+8)" },
        { explanation: "Evaluate the approximation.", latex: "16" },
      ],
      finalAnswerLatex: "16",
    },
    {
      title: "Interpret concavity",
      questionLatex: "f(x)=x^2\\quad \\text{on }0\\le x\\le2",
      steps: [
        { explanation: "The graph is concave up.", latex: "f''(x)=2>0" },
        { explanation: "Straight chords lie above a concave-up curve." },
        { explanation: "So the trapezoidal approximation overestimates the integral." },
      ],
      finalAnswerLatex: "\\text{overestimate}",
    },
  ],
  [
    trapNumber("fint-trap-g1", "Use one trapezoid to approximate the integral.", "\\int_0^2 x^2\\,dx", "4", [], "The endpoint y-values are 0 and 4, and the width is 2."),
    trapNumber("fint-trap-g2", "Use two subintervals to approximate the integral.", "\\int_0^2 x^2\\,dx", "3", [], "Use y-values 0, 1 and 4 with the interior value doubled."),
    intChoice("fint-trap-g3", "What is the subinterval width?", "a=1,\\quad b=5,\\quad n=4", "B", ["4", "1", "5", "16"], "The width is (5-1)/4=1."),
    intChoice("fint-trap-g4", "Which value is doubled in the two-subinterval trapezoidal rule?", "y_0,\\ y_1,\\ y_2", "C", ["$y_0$ only", "$y_2$ only", "$y_1$ only", "all three values"], "Interior y-values are doubled; here only y1 is interior."),
  ],
  [
    trapNumber("fint-trap-i1", "Use the trapezoidal rule to approximate the integral from the table.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ y&2&5&6&8\\end{array}", "16", [], "The width is 1, so the approximation is half of endpoint values plus twice the interior values."),
    trapNumber("fint-trap-i2", "Use one trapezoid to approximate the integral.", "\\int_1^3 (x+1)\\,dx", "6", [], "The endpoint y-values are 2 and 4, and the width is 2."),
    intChoice("fint-trap-i3", "For a concave-up graph, what does the trapezoidal rule usually do?", "\\text{concave up on the interval}", "A", ["overestimates", "underestimates", "is always exact", "cannot be used"], "For concave-up graphs, chords lie above the curve."),
    intChoice("fint-trap-i4", "Which setup correctly uses the trapezoidal rule for four y-values with equal spacing h?", "y_0,\\ y_1,\\ y_2,\\ y_3", "D", ["$h(y_0+y_1+y_2+y_3)$", "$\\frac h2(y_0+y_1+y_2+y_3)$", "$\\frac h2(2y_0+y_1+y_2+2y_3)$", "$\\frac h2(y_0+2y_1+2y_2+y_3)$"], "Endpoints are used once and interior values are doubled."),
    trapNumber("fint-trap-i5", "Use the trapezoidal rule with two subintervals.", "\\begin{array}{c|ccc}x&0&2&4\\\\ y&3&7&11\\end{array}", "28", [], "The width is 2, so the approximation is 1 times 3+2(7)+11."),
  ],
  [
    { mistake: "Using n as the width.", fix: "The width is h=(b-a)/n, not the number of subintervals." },
    { mistake: "Forgetting to double interior values.", fix: "Every interior y-value has coefficient 2 in the composite trapezoidal rule." },
    { mistake: "Forgetting the factor h/2.", fix: "The final bracket must be multiplied by h/2." },
    { mistake: "Assuming the rule is exact for all curves.", fix: "It is exact for straight-line data, but curved graphs are usually only approximated." },
  ],
  [
    trapNumber("fint-trap-m1", "Use one trapezoid to approximate the integral.", "\\int_0^2 x^2\\,dx", "4", [], "With one trapezoid, the endpoint heights are 0 and 4."),
    trapNumber("fint-trap-m2", "Use two subintervals to approximate the integral.", "\\int_0^2 x^2\\,dx", "3", [], "Use y-values 0, 1 and 4, with the interior value doubled."),
    intChoice("fint-trap-m3", "Which expression gives the correct subinterval width?", "\\text{limits }a\\text{ to }b,\\quad n\\text{ subintervals}", "A", ["$\\frac{b-a}{n}$", "$\\frac{n}{b-a}$", "$b-a+n$", "$\\frac{b+a}{n}$"], "The total interval width is divided by the number of subintervals."),
    trapNumber("fint-trap-m4", "Use the trapezoidal rule to approximate the integral from the table.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ y&4&7&9&10\\end{array}", "23", [], "The width is 1: (1/2)(4 + 2×7 + 2×9 + 10) = (1/2)(46) = 23."),
    intChoice("fint-trap-m5", "A student uses h=4 for four subintervals from x=0 to x=8. What is the error?", "\\text{four subintervals on }0\\le x\\le8", "B", ["They doubled the endpoints", "They used n instead of h", "They forgot the final y-value", "They used exact integration"], "The width is 8 divided by 4, so h=2."),
    intChoice("fint-trap-m6", "Which y-values should be doubled for five equally spaced table values?", "y_0,\\ y_1,\\ y_2,\\ y_3,\\ y_4", "C", ["$y_0,y_4$", "$y_0,y_1,y_2,y_3,y_4$", "$y_1,y_2,y_3$", "$y_2$ only"], "All interior values are doubled."),
    intChoice("fint-trap-m7", "For a concave-down graph, what does the trapezoidal rule usually do?", "\\text{concave down on the interval}", "B", ["overestimates", "underestimates", "is always exact", "gives the derivative"], "For concave-down graphs, chords lie below the curve."),
    intChoice("fint-trap-m8", "A student says the trapezoidal rule gives the exact area under every curve. Which option identifies the issue?", "\\text{numerical integration}", "D", ["It cannot use tables", "It only works with negative functions", "It must use radians", "It is usually an approximation for curved graphs"], "Straight trapezoids approximate curved regions unless the function is linear over each subinterval."),
    trapNumber("fint-trap-m9", "Use the trapezoidal rule to approximate the area from the table.", "\\begin{array}{c|ccccc}x&0&1&2&3&4\\\\ y&1&2&5&10&17\\end{array}", "26", [], "The width is 1: (1/2)(1 + 2×2 + 2×5 + 2×10 + 17) = (1/2)(52) = 26."),
    intChoice("fint-trap-m10", "A concave-up curve is approximated using two trapezoids and then four trapezoids. Which statement is most reasonable?", "\\text{same interval, more subintervals}", "C", ["The four-trapezoid result must be exact", "The estimate must become negative", "The four-trapezoid estimate usually improves", "The width h becomes larger"], "More subintervals usually make the straight segments follow the curve more closely, and h becomes smaller."),
  ]
);

export const furtherIntegralCalculusExamPracticeLesson = furtherIntegralLesson(
  "further-integral-calculus-exam-practice",
  "Further Integral Calculus Exam Practice",
  "Practise mixed HSC-style integration questions involving standard forms, reverse chain rule, definite integrals and area between curves.",
  "Choose and apply the right integration form in mixed HSC-style questions.",
  [
    "Identify which standard integration form is required.",
    "Use reverse chain rule patterns in composite integrals.",
    "Evaluate exact definite integrals at clean limits.",
    "Set up area between curves using top minus bottom.",
    "Interpret signed area and total geometric area.",
    "Recognise common errors in constants, signs and inner derivative factors.",
  ],
  {
    paragraphs: [
      "Mixed integration questions require you to identify the form before calculating.",
      "Standard forms cover trigonometric, exponential and reciprocal functions.",
      "Reverse chain rule questions usually contain a composite function and a missing or present inner derivative factor.",
      "Definite integrals need careful upper-minus-lower substitution.",
      "Area questions require a decision about top minus bottom and whether the interval needs to be split.",
    ],
    latexBlocks: [
      "\\int \\sin x\\,dx=-\\cos x+C",
      "\\int e^{ax+b}\\,dx=\\frac1a e^{ax+b}+C",
      "\\int_a^b f(x)\\,dx=F(b)-F(a)",
      "\\text{Area}=\\int_a^b(\\text{top}-\\text{bottom})\\,dx",
    ],
  },
  [
    {
      title: "Mixed standard form",
      questionLatex: "\\int (e^x-\\sin x)\\,dx",
      steps: [
        { explanation: "Integrate e^x as e^x.", latex: "e^x" },
        { explanation: "Integrating negative sine gives positive cosine.", latex: "\\int -\\sin x\\,dx=\\cos x" },
        { explanation: "Include the constant of integration.", latex: "e^x+\\cos x+C" },
      ],
      finalAnswerLatex: "e^x+\\cos x+C",
    },
    {
      title: "Mixed definite integral",
      questionLatex: "\\int_0^{\\pi/2}(\\sin x+\\cos x)\\,dx",
      steps: [
        { explanation: "Use standard antiderivatives.", latex: "-\\cos x+\\sin x" },
        { explanation: "Evaluate upper minus lower.", latex: "(0+1)-(-1+0)=2" },
      ],
      finalAnswerLatex: "2",
    },
    {
      title: "Mixed area setup",
      questionLatex: "y=2x,\\quad y=x^2",
      steps: [
        { explanation: "Find intersections.", latex: "2x=x^2\\Rightarrow x=0,2" },
        { explanation: "Determine which curve is on top.", latex: "2x>x^2\\text{ on }0<x<2" },
        { explanation: "Set up the area.", latex: "\\int_0^2(2x-x^2)\\,dx" },
      ],
      finalAnswerLatex: "\\int_0^2(2x-x^2)\\,dx",
    },
  ],
  [
    intChoice("fint-exam-g1", "Choose the correct antiderivative.", "\\int \\cos x\\,dx", "B", ["$-\\sin x+C$", "$\\sin x+C$", "$\\cos x+C$", "$-\\cos x+C$"], "The antiderivative of cosine is sine."),
    intChoice("fint-exam-g2", "Choose the correct antiderivative.", "\\int e^{3x}\\,dx", "A", ["$\\frac13e^{3x}+C$", "$3e^{3x}+C$", "$e^{3x}+C$", "$e^x+C$"], "Divide by the inner derivative 3."),
    intNumber("fint-exam-g3", "Evaluate the definite integral.", "\\int_0^\\pi \\sin x\\,dx", "2"),
    intChoice("fint-exam-g4", "Choose the area setup.", "y=3,\\quad y=x,\\quad 0\\le x\\le2", "C", ["$\\int_0^2(x-3)\\,dx$", "$\\int_0^3(2-x)\\,dx$", "$\\int_0^2(3-x)\\,dx$", "$3-2$"], "Use top minus bottom."),
  ],
  [
    intChoice("fint-exam-i1", "Choose the correct antiderivative.", "\\int \\left(e^x+\\frac1x\\right)\\,dx", "D", ["$e^x+\\frac{x^2}{2}+C$", "$xe^x+\\ln|x|+C$", "$e^x+\\frac1x+C$", "$e^x+\\ln|x|+C$"], "Use the exponential and reciprocal standard forms."),
    intChoice("fint-exam-i2", "Choose the correct antiderivative.", "\\int \\sin(4x)\\,dx", "B", ["$\\frac14\\cos(4x)+C$", "$-\\frac14\\cos(4x)+C$", "$-4\\cos(4x)+C$", "$\\sin(4x)+C$"], "Integrating sine gives negative cosine and divide by 4."),
    intChoice("fint-exam-i3", "Choose the exact value.", "\\int_0^1 e^x\\,dx", "A", ["$e-1$", "$e$", "$1-e$", "$1$"], "Evaluate $e^x$ at 1 and 0."),
    intChoice("fint-exam-i4", "Choose the correct setup between intersections.", "y=x,\\quad y=x^2", "C", ["$\\int_0^1(x^2-x)\\,dx$", "$\\int_{-1}^1(x-x^2)\\,dx$", "$\\int_0^1(x-x^2)\\,dx$", "$\\int_0^1(x+x^2)\\,dx$"], "On 0 to 1, x is above x squared."),
    intChoice("fint-exam-i5", "Which issue is shown?", "\\int \\frac1x\\,dx=\\frac{x^0}{0}+C", "B", ["The sign is wrong", "The reverse power rule does not apply to $x^{-1}$", "The limit order is wrong", "This is an area between curves question"], "The reciprocal form integrates to a logarithm."),
  ],
  [
    { mistake: "Choosing a rule before identifying the integrand type.", fix: "Classify the form first: trig, exponential, reciprocal, composite or area." },
    { mistake: "Forgetting the inner derivative in reverse chain rule.", fix: "Differentiate the answer to check the coefficient." },
    { mistake: "Confusing signed definite integral with total area.", fix: "Split or take absolute areas when geometric area is requested." },
    { mistake: "Using bottom minus top for area between curves.", fix: "Use top minus bottom on each interval." },
  ],
  [
    intChoice("fint-exam-m1", "Choose the correct antiderivative.", "\\int (2e^x+\\cos x)\\,dx", "A", ["$2e^x+\\sin x+C$", "$2e^x-\\sin x+C$", "$2xe^x+\\sin x+C$", "$e^{2x}+\\sin x+C$"], "Integrate term by term."),
    intChoice("fint-exam-m2", "Choose the correct antiderivative.", "\\int \\frac{2}{x}\\,dx", "D", ["$\\frac{2}{x^2}+C$", "$2x^{-2}+C$", "$\\ln|2x|+C$", "$2\\ln|x|+C$"], "The constant multiple gives $2\\ln|x|+C$."),
    intChoice("fint-exam-m3", "Choose the correct antiderivative.", "\\int e^{2x-1}\\,dx", "B", ["$e^{2x-1}+C$", "$\\frac12e^{2x-1}+C$", "$2e^{2x-1}+C$", "$e^{x-1}+C$"], "Divide by the inner derivative 2."),
    intChoice("fint-exam-m4", "Choose the correct antiderivative.", "\\int \\cos(5x)\\,dx", "C", ["$5\\sin(5x)+C$", "$-\\frac15\\sin(5x)+C$", "$\\frac15\\sin(5x)+C$", "$\\cos(5x)+C$"], "Integrating cosine gives sine and divide by 5."),
    intNumber("fint-exam-m5", "Evaluate the definite integral.", "\\int_0^{\\pi/2}(\\sin x+\\cos x)\\,dx", "2"),
    intChoice("fint-exam-m6", "Choose the exact value.", "\\int_1^{e^3}\\frac1x\\,dx", "D", ["$e^3-1$", "$1$", "$\\ln3$", "$3$"], "The value is $\\ln(e^3)-\\ln1=3$."),
    intChoice("fint-exam-m7", "Which setup gives the area between the curves?", "y=2x,\\quad y=x^2", "B", ["$\\int_0^2(x^2-2x)\\,dx$", "$\\int_0^2(2x-x^2)\\,dx$", "$\\int_{-2}^2(2x-x^2)\\,dx$", "$\\int_0^2(2x+x^2)\\,dx$"], "The intersections are 0 and 2, and $2x$ is above $x^2$."),
    intNumber("fint-exam-m8", "Find the area between the horizontal lines.", "y=7,\\quad y=3,\\quad 0\\le x\\le4", "16"),
    intChoice("fint-exam-m9", "A student writes $\\int \\sin(2x)\\,dx=-\\cos(2x)+C$. Which issue is present?", "\\int \\sin(2x)\\,dx", "C", ["The sign is wrong", "The logarithm is missing", "The inner derivative factor is missing", "The answer should be definite"], "The correct antiderivative is $-\\frac12\\cos(2x)+C$."),
    intChoice("fint-exam-m10", "A curve crosses the x-axis inside the interval and total area is requested. Which approach is best?", "\\text{total area}", "A", ["Split at the crossing and add positive areas", "Use one signed integral only", "Add +C", "Use lower minus upper"], "Total area should not cancel positive and negative regions."),
  ]
);

export const furtherIntegralCalculusLessons = [
  standardIntegralsLesson,
  reverseChainRuleLesson,
  definiteIntegralsStandardFormsLesson,
  areaBetweenCurvesExtendedLesson,
  trapezoidalRuleLesson,
  furtherIntegralCalculusExamPracticeLesson,
];

export const furtherIntegralCalculusOutline: LessonOutlineItem[] =
  furtherIntegralCalculusLessons.map((lesson) => ({
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    status: lesson.status,
  }));
