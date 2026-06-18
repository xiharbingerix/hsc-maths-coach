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
    moduleSlug: "ma-c4-integral-calculus",
    moduleTitle: "Integral Calculus",
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
      "Integration is differentiation run backwards. When you differentiate you ask 'what is the gradient of this function?'; when you integrate you ask the reverse question, 'what function has this as its gradient?' That answer is called an antiderivative. So far you have only reversed the power rule — turning $x^n$ back into $\\frac{x^{n+1}}{n+1}$. This lesson reverses the standard derivatives of $\\sin x$, $\\cos x$, $e^x$ and $\\frac{1}{x}$ instead. Nothing here is a new fact to memorise: every result is just a derivative you already know, read from right to left.",
      "Take $\\cos x$ first. You know $\\frac{d}{dx}(\\sin x)=\\cos x$. Read backwards, that says the function whose gradient is $\\cos x$ is $\\sin x$ — so $\\int\\cos x\\,dx=\\sin x+C$. Now $\\sin x$: you know $\\frac{d}{dx}(\\cos x)=-\\sin x$. That is the gradient of $-\\sin x$, not $+\\sin x$, so to land on $\\sin x$ you need to start from $-\\cos x$, because $\\frac{d}{dx}(-\\cos x)=\\sin x$. Hence $\\int\\sin x\\,dx=-\\cos x+C$. That stray minus sign is the single most common slip in the whole topic: integrating sine introduces a minus, integrating cosine does not.",
      "The exponential is the easy one. Because $e^x$ is its own derivative, it is also its own antiderivative: $\\int e^x\\,dx=e^x+C$. The curve whose gradient equals its own height is the same curve you started with.",
      "The reciprocal $\\frac{1}{x}$ is the special case the power rule cannot touch. The reverse power rule would add one to the index and divide, but $x^{-1}$ would become $\\frac{x^{0}}{0}$ — a division by zero. The escape is to recognise $\\frac{1}{x}$ as a derivative you already met: $\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$. So $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$. The absolute-value bars matter because $\\ln x$ is only defined for $x>0$, yet $\\frac{1}{x}$ exists for negative $x$ too; writing $\\ln|x|$ extends the antiderivative to both sides of zero, which is why it is the form examiners expect.",
      "Two combining rules carry over from differentiation unchanged. A constant multiple passes straight through the integral sign — $\\int c\\,f(x)\\,dx=c\\int f(x)\\,dx$ — and a sum integrates term by term. So $\\int(3e^x+\\frac{2}{x})\\,dx$ is just $3e^x+2\\ln|x|$ with the two pieces handled separately, then a single $+C$ at the end.",
      "That $+C$ is not decoration. Differentiating kills any constant, so infinitely many functions share the same gradient — $\\sin x$, $\\sin x+4$ and $\\sin x-7$ all differentiate to $\\cos x$. Running differentiation backwards therefore cannot recover the constant that was lost, and we record that uncertainty by adding an arbitrary $+C$ to every indefinite integral. Forgetting it is the classic mistake. The one time you drop it is a definite integral: there you substitute the upper and lower limits into the antiderivative and subtract, $F(b)-F(a)$, and any $+C$ cancels itself out.",
    ],
    latexBlocks: [
      "\\int \\sin x\\,dx=-\\cos x+C \\quad(\\text{because }\\tfrac{d}{dx}(-\\cos x)=\\sin x)",
      "\\int \\cos x\\,dx=\\sin x+C",
      "\\int e^x\\,dx=e^x+C",
      "\\int \\frac{1}{x}\\,dx=\\ln|x|+C \\quad(\\text{the power-rule exception})",
    ],
  },
  [
    {
      title: "Integrate sine and cosine",
      questionLatex: "\\int (\\sin x+2\\cos x)\\,dx",
      steps: [
        { explanation: "Integrate sine by asking what differentiates to sin x: it is negative cosine, since d/dx(-cos x) = sin x.", latex: "\\int \\sin x\\,dx=-\\cos x" },
        { explanation: "Integrate cosine as sine; the constant multiple 2 passes straight through the integral sign.", latex: "\\int 2\\cos x\\,dx=2\\sin x" },
        { explanation: "This is an indefinite integral, so add the constant of integration that differentiation destroyed.", latex: "-\\cos x+2\\sin x+C" },
      ],
      finalAnswerLatex: "-\\cos x+2\\sin x+C",
    },
    {
      title: "Integrate exponential and reciprocal terms",
      questionLatex: "\\int \\left(3e^x+\\frac{2}{x}\\right)\\,dx",
      steps: [
        { explanation: "The exponential is its own antiderivative, and the 3 stays in front.", latex: "3e^x" },
        { explanation: "The power rule cannot handle 1/x, so use the logarithmic form 2 ln|x| with the bars to cover negative x.", latex: "2\\ln|x|" },
        { explanation: "Add the two term-by-term results and a single constant of integration.", latex: "3e^x+2\\ln|x|+C" },
      ],
      finalAnswerLatex: "3e^x+2\\ln|x|+C",
    },
    {
      title: "Simple definite integral",
      questionLatex: "\\int_0^{\\pi/2}\\cos x\\,dx",
      steps: [
        { explanation: "Find the antiderivative first: the function whose gradient is cos x is sin x.", latex: "\\int \\cos x\\,dx=\\sin x" },
        { explanation: "For a definite integral substitute the upper limit then the lower limit and subtract; no +C is needed because it cancels.", latex: "\\sin\\frac{\\pi}{2}-\\sin0=1-0" },
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
    intChoice("fint-std-m5", "Choose the correct antiderivative.", "\\int (e^x - \\cos x)\\,dx", "A", ["$e^x - \\sin x + C$", "$e^x + \\sin x + C$", "$xe^x - \\sin x + C$", "$e^x + \\cos x + C$"], "Integrating $e^x$ gives $e^x$; integrating $-\\cos x$ gives $-\\sin x$."),
    intChoice("fint-std-m6", "Choose the correct antiderivative.", "\\int \\left(\\frac{1}{x} + \\sin x\\right)\\,dx", "C", ["$\\frac{1}{x} - \\cos x + C$", "$\\ln|x| + \\cos x + C$", "$\\ln|x| - \\cos x + C$", "$x\\ln x + \\sin x + C$"], "The reciprocal integrates to $\\ln|x|$ and $\\sin x$ integrates to $-\\cos x$."),
    intChoice("fint-std-m7", "Choose the correct antiderivative.", "\\int \\left(2e^x + \\frac{1}{x}\\right)\\,dx", "B", ["$2xe^x + \\ln|x| + C$", "$2e^x + \\ln|x| + C$", "$2e^x - \\ln|x| + C$", "$e^{2x} + \\ln|x| + C$"], "Both are standard forms: $2e^x$ integrates to $2e^x$, and $\\frac{1}{x}$ integrates to $\\ln|x|$."),
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
      "When you differentiate a composite like $e^{3x}$, the chain rule makes you multiply by the derivative of the inside: $\\frac{d}{dx}e^{3x}=e^{3x}\\cdot 3=3e^{3x}$. Integration is differentiation reversed, so to integrate a composite we have to undo that extra inner factor — which means dividing by it. That single idea, divide by the inner derivative, is the whole lesson.",
      "See it as a guess-and-correct. To integrate $e^{3x}$, your first guess is the obvious antiderivative $e^{3x}$. Check it by differentiating: $\\frac{d}{dx}e^{3x}=3e^{3x}$ — three times too big, because the chain rule supplied a factor of $3$. So scale the guess down by $\\frac{1}{3}$. Now $\\frac{d}{dx}\\!\\left(\\frac{1}{3}e^{3x}\\right)=\\frac{1}{3}\\cdot 3e^{3x}=e^{3x}$, exactly the integrand. Hence $\\int e^{3x}\\,dx=\\frac{1}{3}e^{3x}+C$.",
      "This works cleanly whenever the inside is linear, $ax+b$, because then the inner derivative is just the constant $a$ — the same number everywhere, so one division by $a$ fixes the whole thing. For any linear inside you integrate the outer function as usual and multiply by $\\frac{1}{a}$. In symbols $\\int e^{ax+b}\\,dx=\\frac{1}{a}e^{ax+b}+C$ and $\\int\\frac{1}{ax+b}\\,dx=\\frac{1}{a}\\ln|ax+b|+C$ — the $\\frac{1}{a}$ in front of the log is exactly this correction, and leaving it out is the most common error here.",
      "Trigonometric composites carry two things at once: the inner factor and a sign. For $\\int\\cos(ax+b)\\,dx$ the outer integral of cosine is $\\sin$, so the answer is $\\frac{1}{a}\\sin(ax+b)+C$. For $\\int\\sin(ax+b)\\,dx$ the outer integral of sine is $-\\cos$ — that minus survives from the standard forms — giving $-\\frac{1}{a}\\cos(ax+b)+C$. Handle the sign and the $\\frac{1}{a}$ separately and neither gets lost.",
      "The same reversed-chain logic also covers integrands that already contain the inner derivative as a factor. If you see $f'(x)$ sitting next to a composite of $f(x)$ — for instance $6x\\,e^{3x^2}$, where $6x$ is exactly $\\frac{d}{dx}(3x^2)$ — then no correction factor is needed at all: the chain-rule factor is already supplied, so $\\int 6x\\,e^{3x^2}\\,dx=e^{3x^2}+C$. A special case worth its own line is $\\int\\frac{f'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$, the reverse of $\\frac{d}{dx}\\ln|f(x)|=\\frac{f'(x)}{f(x)}$.",
      "Whenever you are unsure, differentiate your answer. The reverse chain rule is the one place where the check is faster than the integration: if differentiating your proposed antiderivative does not reproduce the integrand exactly — same function, same constant out front — your scale factor is wrong, and the chain rule will tell you by how much.",
    ],
    latexBlocks: [
      "\\int e^{ax+b}\\,dx=\\frac{1}{a}e^{ax+b}+C",
      "\\int \\frac{1}{ax+b}\\,dx=\\frac{1}{a}\\ln|ax+b|+C",
      "\\int \\cos(ax+b)\\,dx=\\frac{1}{a}\\sin(ax+b)+C,\\qquad \\int \\sin(ax+b)\\,dx=-\\frac{1}{a}\\cos(ax+b)+C",
      "\\int \\frac{f'(x)}{f(x)}\\,dx=\\ln|f(x)|+C \\quad(\\text{inner derivative already present})",
    ],
  },
  [
    {
      title: "Exponential reverse chain",
      questionLatex: "\\int e^{3x+1}\\,dx",
      steps: [
        { explanation: "Differentiating the obvious guess would bring out the inner derivative, so find it first.", latex: "\\frac{d}{dx}(3x+1)=3" },
        { explanation: "The naive guess is 3 times too big, so divide by the inner derivative 3 to correct it.", latex: "\\frac{1}{3}e^{3x+1}+C" },
      ],
      finalAnswerLatex: "\\frac13e^{3x+1}+C",
    },
    {
      title: "Logarithmic reverse chain",
      questionLatex: "\\int \\frac{1}{2x-5}\\,dx",
      steps: [
        { explanation: "The reciprocal of a linear expression integrates to a logarithm; first find the inner derivative.", latex: "\\frac{d}{dx}(2x-5)=2" },
        { explanation: "Use the log form ln|2x - 5| and divide by the inner derivative 2 to cancel the chain-rule factor.", latex: "\\frac12\\ln|2x-5|+C" },
      ],
      finalAnswerLatex: "\\frac12\\ln|2x-5|+C",
    },
    {
      title: "Trigonometric reverse chain",
      questionLatex: "\\int \\cos(4x)\\,dx",
      steps: [
        { explanation: "The inside is 4x, so the chain rule would multiply by its derivative, 4.", latex: "\\frac{d}{dx}(4x)=4" },
        { explanation: "Integrating cosine gives sine; divide by 4 to undo the inner factor (cosine carries no sign change).", latex: "\\frac14\\sin(4x)+C" },
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
      "An indefinite integral hands back a whole family of functions, $F(x)+C$. A definite integral instead returns a single number: it pins down the limits $a$ and $b$ and asks how much the antiderivative has changed across that interval. Geometrically that number is the signed area trapped between the curve and the $x$-axis from $x=a$ to $x=b$.",
      "The reason a single antiderivative delivers an area is the Fundamental Theorem of Calculus, the bridge between the two halves of calculus. It says $\\int_a^b f(x)\\,dx=F(b)-F(a)$, where $F$ is any antiderivative of $f$. Think of $F$ as a running total of area; the area over $[a,b]$ is simply the total up to $b$ minus the total already counted up to $a$. Because you subtract, the $+C$ cancels — $\\left(F(b)+C\\right)-\\left(F(a)+C\\right)=F(b)-F(a)$ — which is exactly why definite integrals carry no constant of integration.",
      "So every definite integral is a three-step routine: choose an antiderivative $F$, substitute the upper limit, substitute the lower limit, and subtract upper minus lower. Order matters — it is always top value minus bottom value. Reversing the subtraction flips the sign of your answer, a frequent and avoidable slip.",
      "Exam limits are chosen so the arithmetic stays exact. Radian values such as $0$, $\\frac{\\pi}{2}$ and $\\pi$ appear because $\\sin$ and $\\cos$ take clean values there ($\\sin\\frac{\\pi}{2}=1$, $\\cos\\frac{\\pi}{2}=0$). Limits like $1$ and $e$ appear with $\\frac{1}{x}$ because $\\int_1^e\\frac{1}{x}\\,dx=\\ln e-\\ln 1=1-0=1$ lands on a whole number. When a question says 'exact value', keep answers like $e-1$ or $\\ln 2$ as they are — do not reach for the calculator and round.",
      "The word 'signed' carries real meaning. Where the curve sits below the $x$-axis, every strip of area is counted as negative, so the integral there is negative even though the physical region has positive size. For example $\\int_0^\\pi(-\\sin x)\\,dx=-2$: the region genuinely has area $2$, but because it lies below the axis the signed integral records $-2$. If a curve crosses the axis inside the interval, positive and negative parts can even cancel — $\\int_0^\\pi\\cos x\\,dx=0$ — which is correct as a signed integral but is not the total geometric area. Read each question carefully: 'evaluate the integral' wants the signed value, while 'find the area' wants the positive size and may need splitting at the crossing.",
    ],
    latexBlocks: [
      "\\int_a^b f(x)\\,dx=F(b)-F(a)\\quad(\\text{Fundamental Theorem; }+C\\text{ cancels})",
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
        { explanation: "Find an antiderivative: sine integrates to negative cosine (the function whose gradient is sin x).", latex: "F(x)=-\\cos x" },
        { explanation: "Apply F(b) - F(a): substitute the upper limit then the lower limit and subtract.", latex: "F\\left(\\frac\\pi2\\right)-F(0)=0-(-1)" },
      ],
      finalAnswerLatex: "1",
    },
    {
      title: "Evaluate an exponential integral",
      questionLatex: "\\int_0^1 e^x\\,dx",
      steps: [
        { explanation: "The exponential is its own antiderivative.", latex: "F(x)=e^x" },
        { explanation: "Substitute upper minus lower; keep e exact rather than rounding.", latex: "e^1-e^0=e-1" },
      ],
      finalAnswerLatex: "e-1",
    },
    {
      title: "Signed area below the axis",
      questionLatex: "\\int_0^\\pi -\\sin x\\,dx",
      steps: [
        { explanation: "On 0 to pi the integrand -sin x is negative, so the region lies below the x-axis.", latex: "-\\sin x\\le 0 \\text{ on } [0,\\pi]" },
        { explanation: "The geometric area under sin x from 0 to pi is 2, so this integral records the signed value -2.", latex: "-\\int_0^\\pi \\sin x\\,dx=-2" },
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
      "You already know that $\\int_a^b f(x)\\,dx$ measures the area between a single curve and the $x$-axis. Finding the area between two curves uses the same machinery, but instead of measuring down to the axis you measure the gap between the two curves. Picture sweeping a thin vertical strip across the region: at each $x$ its height is the distance from the lower curve up to the upper curve, and its width is $dx$. Adding all those strips is the integral.",
      "So the area is $\\int_a^b(\\text{top}-\\text{bottom})\\,dx$ — the height of each strip is the top function minus the bottom function. Subtracting in that order guarantees a positive height, because at every point of the region the top curve is genuinely higher. This also explains why the axis version was just a special case: there the 'bottom curve' was the line $y=0$, so top minus bottom was simply $f(x)-0=f(x)$.",
      "If the two curves are given without an interval, the region is the patch enclosed between them, and the limits $a$ and $b$ are the $x$-values where they meet. Find those by setting the curves equal, $f(x)=g(x)$, and solving. For $y=x$ and $y=x^2$ that gives $x=x^2$, so $x=0$ and $x=1$; between them the line $y=x$ sits above the parabola, so the area is $\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}$.",
      "Getting the order top-minus-bottom right is the most common decision to make. If you accidentally write bottom minus top you get the correct area but with a minus sign, because the strip heights all come out negative. A quick safeguard: test one $x$-value inside the interval — substitute it into both functions and see which is larger. For $0<x<1$, $x$ beats $x^2$, confirming $y=x$ is on top.",
      "Trouble appears when the curves cross inside the interval, because then 'top' and 'bottom' swap roles partway through. A single $\\int(\\text{top}-\\text{bottom})\\,dx$ across the whole span would let the positive part and the negative part cancel, understating the true area — the same signed-versus-geometric trap as before. The fix is to split the interval at each crossing point, keep top-minus-bottom correct on each piece, and add the magnitudes. The line $y=x$ over $[-1,1]$ crossing the axis at $x=0$ is the simplest case: two triangles of area $\\frac{1}{2}$ each, total $1$, even though the straight signed integral would give $0$.",
      "One practical note on this lesson: the setup questions are multiple choice. That is deliberate — two algebraically equivalent integrals can look different as typed strings and be marked unfairly, so here you choose the correct setup rather than type it. The reasoning you must show is identical: which curve is on top, where they intersect, and whether the interval needs splitting.",
    ],
    latexBlocks: [
      "\\text{Area}=\\int_a^b (\\text{top}-\\text{bottom})\\,dx",
      "f(x)=g(x)\\ \\Rightarrow\\ \\text{intersection points = limits of integration}",
      "\\text{curves cross inside }[a,b]\\ \\Rightarrow\\ \\text{split and add the magnitudes}",
      "\\text{geometric area is non-negative; a signed integral can be negative}",
    ],
  },
  [
    {
      title: "Top minus bottom",
      questionLatex: "y=4,\\quad y=x,\\quad 0\\le x\\le2",
      steps: [
        { explanation: "Test a point: at x = 1 the line y = 4 sits above y = x, so y = 4 is the top curve and y = x is the bottom.", latex: "\\text{at }x=1:\\ 4>1" },
        { explanation: "Each strip has height top minus bottom, so integrate 4 - x across the interval.", latex: "\\int_0^2(4-x)\\,dx" },
        { explanation: "Antidifferentiate and substitute the limits to get the area.", latex: "\\left[4x-\\tfrac{x^2}{2}\\right]_0^2=8-2=6" },
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
        { explanation: "No interval is given, so the limits are where the curves meet: set them equal.", latex: "x=x^2" },
        { explanation: "Solve x - x^2 = 0, that is x(1 - x) = 0, giving the two intersection points.", latex: "x=0,\\ 1" },
        { explanation: "Test x = 1/2: x = 0.5 beats x^2 = 0.25, so the line is on top; integrate top minus bottom.", latex: "\\int_0^1(x-x^2)\\,dx=\\left[\\tfrac{x^2}{2}-\\tfrac{x^3}{3}\\right]_0^1=\\tfrac16" },
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
        { explanation: "The line y = x crosses the bottom curve y = 0 at x = 0, so top and bottom swap there.", latex: "x=0" },
        { explanation: "Split at the crossing: left of 0 the axis is on top, right of 0 the line is on top, so each piece stays positive.", latex: "\\int_{-1}^0(0-x)\\,dx+\\int_0^1(x-0)\\,dx" },
        { explanation: "Each integral is a triangle of area one half; adding the magnitudes avoids the cancellation a single signed integral would cause.", latex: "\\tfrac12+\\tfrac12=1" },
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
            color: "red",
            description: "Shaded triangle below the x-axis from x equals negative 1 to x equals 0.",
          },
          {
            kind: "under-function",
            functionType: "line",
            line: { m: 1, b: 0 },
            xMin: 0,
            xMax: 1,
            color: "green",
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
      "Many functions have no convenient antiderivative, and sometimes all you are given is a table of measured values with no formula at all. In those cases you cannot use $F(b)-F(a)$, so you estimate the area instead. The trapezoidal rule is the simplest honest estimate: replace the curve with straight chords joining known points and add up the areas of the trapezia underneath.",
      "Start with one trapezium. A trapezium with two parallel vertical sides of heights $y_0$ and $y_1$, separated by a horizontal width $h$, has area $\\frac{h}{2}(y_0+y_1)$ — the average of the two heights times the width. That is the whole rule in miniature: join the two endpoints of the curve by a straight line and take the area beneath that line as your estimate of the area beneath the curve.",
      "One straight chord across a curved region is usually a poor fit, so split the interval $[a,b]$ into $n$ equal pieces, each of width $h=\\frac{b-a}{n}$, and lay a trapezium over each piece. Here $n$ is the number of strips and $h$ is the width of one strip — confusing the two is a frequent error, so always compute $h=\\frac{b-a}{n}$ rather than guessing.",
      "Adding the separate trapezium areas gives $\\frac{h}{2}(y_0+y_1)+\\frac{h}{2}(y_1+y_2)+\\cdots$. Look at what happens to each interior height: $y_1$ appears in the strip on its left and again in the strip on its right, so it is counted twice, whereas the two end heights $y_0$ and $y_n$ belong to only one strip each. Collecting the terms gives the composite rule $\\frac{h}{2}\\left[y_0+2y_1+2y_2+\\cdots+2y_{n-1}+y_n\\right]$ — endpoints once, every interior ordinate doubled. Forgetting to double the interior values, or forgetting the $\\frac{h}{2}$ out front, are the two classic slips; the doubling is not a rule to memorise but a direct consequence of shared edges.",
      "Reading a table is exactly this with the $y$-values handed to you: check the $x$-values are equally spaced to fix $h$, then feed the heights into the bracket. Because the rule only needs heights and a spacing, it works whether the data came from a formula or from measurements.",
      "Finally, you can often say which way the estimate errs by looking at the curve's concavity — the direction it bends. On a concave-up (bowl-shaped) arc the straight chord lies above the curve, so each trapezium includes a sliver of extra area and the rule overestimates. On a concave-down (dome-shaped) arc the chord dips below the curve, so the rule underestimates. And more strips almost always help: as $n$ grows, $h$ shrinks and the short chords hug the curve more tightly, shrinking the error. The rule is only exact when the data is already straight, since then the chords lie exactly on the curve.",
    ],
    latexBlocks: [
      "h=\\frac{b-a}{n}\\quad(h\\text{ is the strip width, }n\\text{ the number of strips})",
      "\\int_a^b f(x)\\,dx\\approx\\frac h2\\left[y_0+2y_1+2y_2+\\cdots+2y_{n-1}+y_n\\right]",
      "\\text{one strip: }\\frac h2(y_0+y_1);\\quad\\text{endpoints once, interior ordinates doubled}",
      "\\text{concave up}\\Rightarrow\\text{overestimate};\\quad\\text{concave down}\\Rightarrow\\text{underestimate}",
    ],
  },
  [
    {
      title: "One trapezoid for a simple integral",
      questionLatex:
        "\\text{Use one trapezoid to approximate }\\int_0^2 x^2\\,dx.",
      steps: [
        { explanation: "One subinterval means the single strip spans the whole interval, so h = b - a.", latex: "h=\\frac{2-0}{1}=2" },
        { explanation: "Find the two endpoint heights by evaluating the function there.", latex: "y_0=f(0)=0,\\quad y_1=f(2)=4" },
        { explanation: "Apply the single-trapezium area: half the width times the sum of the two heights.", latex: "\\frac{h}{2}(y_0+y_1)=\\frac{2}{2}(0+4)=4" },
      ],
      finalAnswerLatex: "4",
      trapezoidalRuleDiagram: {
        description: "One lightly shaded trapezoid spans x equals 0 to x equals 2 under the straight top edge joining y zero equals 0 and y one equals 4.",
        xValues: [0, 2],
        yValues: [0, 4],
        showOrdinateLabels: true,
        showTrapezoidLabels: true,
        functionLabel: "values from y = x^2",
      },
    },
    {
      title: "Two trapezoids for a simple integral",
      questionLatex:
        "\\text{Use two subintervals to approximate }\\int_0^2 x^2\\,dx.",
      steps: [
        { explanation: "Two strips over a width of 2 means each strip has width h = (b - a)/n = 1.", latex: "h=\\frac{2-0}{2}=1" },
        { explanation: "Evaluate the function at x = 0, 1 and 2 to get the three ordinates.", latex: "y_0=0,\\quad y_1=1,\\quad y_2=4" },
        { explanation: "Endpoints y_0 and y_2 count once; the interior y_1 is shared by both strips so it is doubled.", latex: "\\frac{h}{2}\\big(y_0+2y_1+y_2\\big)=\\frac12(0+2(1)+4)=3" },
      ],
      finalAnswerLatex: "3",
      trapezoidalRuleDiagram: {
        description: "Two lightly shaded trapezoids span x equals 0 to x equals 2. The middle ordinate y one equals 1 is the shared edge of both trapezoids, which is why its value is counted twice.",
        xValues: [0, 1, 2],
        yValues: [0, 1, 4],
        showOrdinateLabels: true,
        showTrapezoidLabels: true,
        functionLabel: "values from y = x^2",
      },
    },
    {
      title: "Use a table of values",
      questionLatex:
        "\\begin{array}{c|cccc}x&0&1&2&3\\\\ y&2&5&6&8\\end{array}",
      steps: [
        { explanation: "Check the spacing: the x-values 0, 1, 2, 3 are equally spaced, so h = 1.", latex: "h=1" },
        { explanation: "The end heights 2 and 8 count once; the interior heights 5 and 6 are each doubled.", latex: "\\frac{h}{2}\\big(2+2(5)+2(6)+8\\big)" },
        { explanation: "Sum the bracket (32) and multiply by h/2 = 1/2.", latex: "\\tfrac12(32)=16" },
      ],
      finalAnswerLatex: "16",
      trapezoidalRuleDiagram: {
        description: "Four table points at x equals 0, 1, 2 and 3 have heights 2, 5, 6 and 8. Straight top edges create three lightly shaded trapezoids. The two interior ordinates are shared edges.",
        xValues: [0, 1, 2, 3],
        yValues: [2, 5, 6, 8],
        showOrdinateLabels: true,
        showTrapezoidLabels: true,
      },
    },
    {
      title: "Interpret concavity",
      questionLatex: "f(x)=x^2\\quad \\text{on }0\\le x\\le2",
      steps: [
        { explanation: "Test concavity with the second derivative; it is positive, so the curve bends upward (bowl-shaped).", latex: "f''(x)=2>0" },
        { explanation: "On a concave-up arc the straight chord joining two points lies above the curve.", latex: "\\text{chord above curve}" },
        { explanation: "Each trapezium therefore includes extra area above the curve, so the rule overestimates the true integral.", latex: "T>\\int_0^2 x^2\\,dx" },
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
    trapNumber("fint-trap-m1", "Use one trapezoid to approximate the integral.", "\\int_0^2 x^3\\,dx", "8", [], "The endpoint y-values are f(0)=0 and f(2)=8, and h=2. Approximation = (2/2)(0+8) = 8."),
    trapNumber("fint-trap-m2", "Use the trapezoidal rule to approximate the area from the table.", "\\begin{array}{c|ccc}x&0&1&2\\\\ y&0&2&6\\end{array}", "5", [], "h=1. Approximation = (1/2)(0 + 2×2 + 6) = (1/2)(10) = 5."),
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
      "Single-skill drills tell you which method to use; an exam does not. A mixed integration question hands you an integrand cold, and the first real decision — before any calculation — is classification: which kind of integral is this? Get that wrong and even flawless algebra lands on the wrong answer, so train yourself to name the form first.",
      "There are four families to recognise. A bare standard function ($\\sin x$, $\\cos x$, $e^x$, $\\frac{1}{x}$) is a direct standard form: read off its antiderivative, watching the sign on $\\int\\sin x\\,dx=-\\cos x$ and the $\\ln|x|$ exception for the reciprocal. A composite with a linear or recognisable inside ($e^{ax+b}$, $\\sin(ax+b)$, $\\frac{1}{ax+b}$, or an $f'(x)$-times-$g(f(x))$ pattern) is a reverse-chain question: integrate the outer function and divide by the inner derivative.",
      "The third family is definite integrals. Once you have the antiderivative $F$, the limits do the rest: substitute upper minus lower, $F(b)-F(a)$, in that order, and drop the $+C$ since it cancels. Keep exact values such as $e-1$ or $\\ln 2$ when the question says 'exact'.",
      "The fourth is area between curves. Here the decisions are which curve is on top, where the curves intersect, and whether they cross inside the interval. Integrate top minus bottom, and split at any crossing so positive and negative pieces cannot cancel when a total geometric area is asked for.",
      "Most lost marks in this topic are not conceptual but mechanical, and they cluster in three places: the dropped $+C$ on an indefinite integral, the missing $\\frac{1}{a}$ inner-derivative factor on a composite, and confusing a signed definite integral with a total area. Every one of them is caught by the same habit — differentiate your antiderivative and check it reproduces the integrand, and reread whether the question wanted a signed value or a positive area.",
    ],
    latexBlocks: [
      "\\text{standard: }\\int \\sin x\\,dx=-\\cos x+C,\\quad \\int e^x\\,dx=e^x+C,\\quad \\int\\tfrac1x\\,dx=\\ln|x|+C",
      "\\text{reverse chain: }\\int e^{ax+b}\\,dx=\\frac1a e^{ax+b}+C",
      "\\text{definite: }\\int_a^b f(x)\\,dx=F(b)-F(a)",
      "\\text{area: }\\int_a^b(\\text{top}-\\text{bottom})\\,dx,\\ \\text{splitting at any crossing}",
    ],
  },
  [
    {
      title: "Mixed standard form",
      questionLatex: "\\int (e^x-\\sin x)\\,dx",
      steps: [
        { explanation: "Classify: two bare standard functions, so integrate each directly. The exponential is its own antiderivative.", latex: "\\int e^x\\,dx=e^x" },
        { explanation: "Integrating sine introduces a minus, so integrating -sin x gives +cos x.", latex: "\\int -\\sin x\\,dx=\\cos x" },
        { explanation: "Indefinite integral, so add the constant of integration.", latex: "e^x+\\cos x+C" },
      ],
      finalAnswerLatex: "e^x+\\cos x+C",
    },
    {
      title: "Mixed definite integral",
      questionLatex: "\\int_0^{\\pi/2}(\\sin x+\\cos x)\\,dx",
      steps: [
        { explanation: "Find the antiderivative term by term: sine gives -cos x, cosine gives sin x.", latex: "F(x)=-\\cos x+\\sin x" },
        { explanation: "Substitute upper limit minus lower limit; no +C is needed as it cancels.", latex: "(0+1)-(-1+0)=2" },
      ],
      finalAnswerLatex: "2",
    },
    {
      title: "Mixed area setup",
      questionLatex: "y=2x,\\quad y=x^2",
      steps: [
        { explanation: "No interval is given, so the limits are the intersection points: set the curves equal and solve.", latex: "2x=x^2\\Rightarrow x(x-2)=0\\Rightarrow x=0,2" },
        { explanation: "Test x = 1: the line gives 2 and the parabola gives 1, so y = 2x is on top throughout.", latex: "2x>x^2\\text{ on }0<x<2" },
        { explanation: "Integrate top minus bottom between the intersections.", latex: "\\int_0^2(2x-x^2)\\,dx" },
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

// ---------------------------------------------------------------------------
// Band-6 depth: difficulty-ramped mastery pools + one HSC multi-part per lesson.
// Assigned post-hoc because furtherIntegralLesson() does not accept these fields.
// `latex` holds raw KaTeX (no $ delimiters); $...$ is used only inside choice
// text / prose, matching the integralCalculus.ts template shape.
// ---------------------------------------------------------------------------

standardIntegralsLesson.masteryQuizPool = [
  { id: "fint-std-p1", prompt: "Choose the correct antiderivative.", latex: "\\int \\sin x\\,dx", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\cos x+C$" }, { label: "B", text: "$-\\cos x+C$" }, { label: "C", text: "$\\sin x+C$" }, { label: "D", text: "$-\\sin x+C$" }], hint: "Differentiate $-\\cos x$.", explanation: "$\\frac{d}{dx}(-\\cos x)=\\sin x$, so $\\int\\sin x\\,dx=-\\cos x+C$." },
  { id: "fint-std-p2", prompt: "Choose the correct antiderivative.", latex: "\\int \\cos x\\,dx", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\sin x+C$" }, { label: "B", text: "$-\\sin x+C$" }, { label: "C", text: "$\\cos x+C$" }, { label: "D", text: "$-\\cos x+C$" }], hint: "Differentiate $\\sin x$.", explanation: "$\\frac{d}{dx}(\\sin x)=\\cos x$." },
  { id: "fint-std-p3", prompt: "Choose the correct antiderivative.", latex: "\\int e^x\\,dx", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$xe^x+C$" }, { label: "B", text: "$\\ln x+C$" }, { label: "C", text: "$e^x+C$" }, { label: "D", text: "$\\frac{1}{x}+C$" }], hint: "The exponential is its own derivative.", explanation: "$e^x$ integrates to itself." },
  { id: "fint-std-p4", prompt: "Choose the correct antiderivative.", latex: "\\int \\sec^2 x\\,dx", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\sec x+C$" }, { label: "B", text: "$\\tan x+C$" }, { label: "C", text: "$-\\tan x+C$" }, { label: "D", text: "$\\cot x+C$" }], hint: "Differentiate $\\tan x$.", explanation: "$\\frac{d}{dx}(\\tan x)=\\sec^2 x$." },
  { id: "fint-std-p5", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{1}{x}\\,dx", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$x^{-2}+C$" }, { label: "B", text: "$\\frac{x^2}{2}+C$" }, { label: "C", text: "$e^x+C$" }, { label: "D", text: "$\\ln|x|+C$" }], hint: "The power rule fails for $x^{-1}$.", explanation: "$\\int\\frac1x\\,dx=\\ln|x|+C$." },
  { id: "fint-std-p6", prompt: "Choose the correct antiderivative.", latex: "\\int 4e^x\\,dx", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$4e^x+C$" }, { label: "B", text: "$e^{4x}+C$" }, { label: "C", text: "$4xe^x+C$" }, { label: "D", text: "$\\frac14e^x+C$" }], hint: "A constant multiple stays outside.", explanation: "$\\int 4e^x\\,dx=4e^x+C$." },
  { id: "fint-std-p7", prompt: "Choose the correct antiderivative.", latex: "\\int 3\\cos x\\,dx", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$-3\\sin x+C$" }, { label: "B", text: "$3\\cos x+C$" }, { label: "C", text: "$3\\sin x+C$" }, { label: "D", text: "$\\frac13\\sin x+C$" }], hint: "Integrate, then keep the multiple.", explanation: "$\\int 3\\cos x\\,dx=3\\sin x+C$." },
  { id: "fint-std-p8", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{5}{x}\\,dx", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$5x^{-2}+C$" }, { label: "B", text: "$5\\ln|x|+C$" }, { label: "C", text: "$\\ln|5x|+C$" }, { label: "D", text: "$\\frac{5}{2}x^2+C$" }], hint: "Constant multiple of the log form.", explanation: "$\\int\\frac5x\\,dx=5\\ln|x|+C$." },
  { id: "fint-std-p9", prompt: "Choose the correct antiderivative.", latex: "\\int (\\sin x+\\cos x)\\,dx", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$-\\cos x+\\sin x+C$" }, { label: "B", text: "$\\cos x+\\sin x+C$" }, { label: "C", text: "$-\\cos x-\\sin x+C$" }, { label: "D", text: "$\\cos x-\\sin x+C$" }], hint: "Integrate each term.", explanation: "$\\int\\sin x\\,dx=-\\cos x$ and $\\int\\cos x\\,dx=\\sin x$." },
  { id: "fint-std-p10", prompt: "Choose the correct antiderivative.", latex: "\\int (e^x-\\cos x)\\,dx", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$e^x+\\sin x+C$" }, { label: "B", text: "$e^x+\\cos x+C$" }, { label: "C", text: "$e^x-\\sin x+C$" }, { label: "D", text: "$xe^x-\\sin x+C$" }], hint: "Integrate $-\\cos x$ as $-\\sin x$.", explanation: "$\\int e^x\\,dx=e^x$ and $\\int(-\\cos x)\\,dx=-\\sin x$." },
  { id: "fint-std-p11", prompt: "Choose the correct antiderivative.", latex: "\\int \\left(\\frac{1}{x}+\\sin x\\right)\\,dx", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac{1}{x}-\\cos x+C$" }, { label: "B", text: "$\\ln|x|+\\cos x+C$" }, { label: "C", text: "$\\ln|x|-\\cos x+C$" }, { label: "D", text: "$x\\ln x+\\sin x+C$" }], hint: "Two standard forms.", explanation: "$\\int\\frac1x\\,dx=\\ln|x|$ and $\\int\\sin x\\,dx=-\\cos x$." },
  { id: "fint-std-p12", prompt: "Choose the correct antiderivative.", latex: "\\int \\left(2e^x+\\frac{1}{x}\\right)\\,dx", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$2xe^x+\\ln|x|+C$" }, { label: "B", text: "$2e^x+\\ln|x|+C$" }, { label: "C", text: "$2e^x-\\ln|x|+C$" }, { label: "D", text: "$e^{2x}+\\ln|x|+C$" }], hint: "Both are standard forms.", explanation: "$2e^x$ integrates to $2e^x$; $\\frac1x$ to $\\ln|x|$." },
  { id: "fint-std-p13", prompt: "Choose the correct antiderivative.", latex: "\\int (3\\sec^2 x-\\sin x)\\,dx", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$3\\tan x+\\cos x+C$" }, { label: "B", text: "$3\\tan x-\\cos x+C$" }, { label: "C", text: "$3\\sec x+\\cos x+C$" }, { label: "D", text: "$3\\tan x-\\sin x+C$" }], hint: "Integrate $-\\sin x$ as $+\\cos x$.", explanation: "$\\int\\sec^2 x\\,dx=\\tan x$ and $\\int(-\\sin x)\\,dx=\\cos x$." },
  { id: "fint-std-p14", prompt: "A student writes $\\int \\sin x\\,dx=\\cos x+C$. Which issue is present?", latex: "\\int \\sin x\\,dx", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The constant is missing" }, { label: "B", text: "The sign is wrong" }, { label: "C", text: "The reciprocal rule is needed" }, { label: "D", text: "The answer should be $e^x+C$" }], hint: "Check by differentiating $\\cos x$.", explanation: "$\\frac{d}{dx}(\\cos x)=-\\sin x$, so the sign is wrong; it should be $-\\cos x+C$." },
  { id: "fint-std-p15", prompt: "Which answer correctly includes the constant of integration?", latex: "\\int (e^x+\\cos x)\\,dx", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$e^x-\\sin x$" }, { label: "B", text: "$xe^x+\\sin x+C$" }, { label: "C", text: "$e^x+\\sin x+C$" }, { label: "D", text: "$e^x+\\cos x+C$" }], hint: "Indefinite integrals need $+C$.", explanation: "$\\int(e^x+\\cos x)\\,dx=e^x+\\sin x+C$." },
  { id: "fint-std-p16", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi/2}\\cos x\\,dx", answer: "1", difficulty: 3, acceptedAnswers: ["1.0"], hint: "Use $\\sin x$ as the antiderivative.", explanation: "$[\\sin x]_0^{\\pi/2}=1-0=1$." },
  { id: "fint-std-p17", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi}\\sin x\\,dx", answer: "2", difficulty: 3, acceptedAnswers: ["2.0"], hint: "Use $-\\cos x$.", explanation: "$[-\\cos x]_0^{\\pi}=-(-1)-(-1)=2$." },
  { id: "fint-std-p18", prompt: "Evaluate the definite integral.", latex: "\\int_1^e \\frac{1}{x}\\,dx", answer: "1", difficulty: 3, acceptedAnswers: ["1.0"], hint: "The antiderivative is $\\ln x$.", explanation: "$[\\ln x]_1^e=\\ln e-\\ln1=1-0=1$." },
  { id: "fint-std-p19", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi/4}\\sec^2 x\\,dx", answer: "1", difficulty: 4, acceptedAnswers: ["1.0"], hint: "The antiderivative is $\\tan x$, and $\\tan\\frac\\pi4=1$.", explanation: "$[\\tan x]_0^{\\pi/4}=\\tan\\frac\\pi4-\\tan0=1-0=1$." },
  { id: "fint-std-p20", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_1^{e^2}\\frac{1}{x}\\,dx", answer: "2", difficulty: 4, acceptedAnswers: ["2.0"], hint: "$\\ln(e^2)=2$.", explanation: "$[\\ln x]_1^{e^2}=\\ln(e^2)-\\ln1=2-0=2$." },
  { id: "fint-std-p21", prompt: "Choose the correct antiderivative.", latex: "\\int \\left(\\frac{2}{x}-3\\sin x\\right)\\,dx", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$2\\ln|x|+3\\cos x+C$" }, { label: "B", text: "$2\\ln|x|-3\\cos x+C$" }, { label: "C", text: "$\\frac{2}{x^2}+3\\cos x+C$" }, { label: "D", text: "$2\\ln|x|-3\\sin x+C$" }], hint: "Integrating $-3\\sin x$ gives $+3\\cos x$.", explanation: "$\\int\\frac2x\\,dx=2\\ln|x|$ and $\\int(-3\\sin x)\\,dx=3\\cos x$." },
  { id: "fint-std-p22", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi/2}(\\sin x+\\cos x)\\,dx", answer: "2", difficulty: 4, acceptedAnswers: ["2.0"], hint: "Antiderivative is $-\\cos x+\\sin x$.", explanation: "$[-\\cos x+\\sin x]_0^{\\pi/2}=(0+1)-(-1+0)=2$." },
  { id: "fint-std-p23", prompt: "A student integrates $\\int \\frac1x\\,dx$ using the power rule and writes $\\frac{x^0}{0}+C$. Which standard form is correct?", latex: "\\int \\frac{1}{x}\\,dx", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$x^{-2}+C$" }, { label: "B", text: "$-x^{-2}+C$" }, { label: "C", text: "$e^x+C$" }, { label: "D", text: "$\\ln|x|+C$" }], hint: "The power rule breaks when the new power is $0$.", explanation: "The exception to the power rule is $\\int x^{-1}\\,dx=\\ln|x|+C$." },
  { id: "fint-std-p24", prompt: "Which combination of standard forms is needed to integrate the expression?", latex: "\\int \\left(e^x+\\sec^2 x+\\frac{1}{x}\\right)\\,dx", answer: "B", difficulty: 5, choices: [{ label: "A", text: "exponential, sine and power forms" }, { label: "B", text: "exponential, $\\sec^2$ and reciprocal-log forms" }, { label: "C", text: "reverse power rule only" }, { label: "D", text: "trapezoidal rule" }], hint: "Name the antiderivative of each term.", explanation: "$e^x\\to e^x$, $\\sec^2 x\\to\\tan x$, $\\frac1x\\to\\ln|x|$ — three different standard forms." },
  { id: "fint-std-p25", prompt: "Choose the correct antiderivative.", latex: "\\int \\left(4\\cos x-\\frac{3}{x}+2e^x\\right)\\,dx", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$4\\sin x-3\\ln|x|+2e^x+C$" }, { label: "B", text: "$-4\\sin x-3\\ln|x|+2e^x+C$" }, { label: "C", text: "$4\\sin x+3\\ln|x|+2e^x+C$" }, { label: "D", text: "$4\\sin x-3\\ln|x|+e^{2x}+C$" }], hint: "Integrate each term and watch every sign and constant.", explanation: "$4\\cos x\\to4\\sin x$, $-\\frac3x\\to-3\\ln|x|$, $2e^x\\to2e^x$." },
  { id: "fint-std-p26", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/2}(2\\cos x-\\sin x)\\,dx", answer: "1", difficulty: 5, acceptedAnswers: ["1.0"], hint: "Antiderivative is $2\\sin x+\\cos x$.", explanation: "$[2\\sin x+\\cos x]_0^{\\pi/2}=(2+0)-(0+1)=1$." },
  { id: "fint-std-p27", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_1^{e^3}\\frac{4}{x}\\,dx", answer: "12", difficulty: 5, acceptedAnswers: ["12.0"], hint: "Factor out 4; $\\ln(e^3)=3$.", explanation: "$4\\,[\\ln x]_1^{e^3}=4(3-0)=12$." },
  { id: "fint-std-p28", prompt: "A definite integral of $\\cos x$ over $[0,\\pi]$ gives $0$. Which interpretation is correct?", latex: "\\int_0^{\\pi}\\cos x\\,dx=0", answer: "B", difficulty: 5, choices: [{ label: "A", text: "The function is zero everywhere on the interval" }, { label: "B", text: "Equal positive and negative signed areas cancel" }, { label: "C", text: "The antiderivative does not exist" }, { label: "D", text: "A constant of integration was omitted" }], hint: "$\\cos x$ is positive then negative across $[0,\\pi]$.", explanation: "$[\\sin x]_0^{\\pi}=0$; the area above the axis on $[0,\\frac\\pi2]$ cancels the area below on $[\\frac\\pi2,\\pi]$." },
];

standardIntegralsLesson.multiPartPractice = [
  {
    id: "fint-std-mp1",
    prompt:
      "A function has derivative $f'(x)=2\\cos x+\\dfrac{3}{x}$ for $x>0$, and the curve $y=f(x)$ passes through the point $\\left(\\tfrac{\\pi}{2},\\,4\\right)$.",
    latex: "f'(x)=2\\cos x+\\frac{3}{x},\\quad x>0",
    answer: "2",
    hint: "Antidifferentiate using standard forms, then use the given point to find $C$.",
    explanation:
      "(a) $\\int\\left(2\\cos x+\\frac3x\\right)dx=2\\sin x+3\\ln|x|+C$, so the coefficient of $\\sin x$ is $2$. (b) At $x=\\frac\\pi2$: $f=2(1)+3\\ln\\frac\\pi2+C=4$. With $\\ln\\frac\\pi2\\approx0.4516$, $C=4-2-1.355=0.645$. (c) $\\int_{\\pi/2}^{\\pi}2\\cos x\\,dx=[2\\sin x]_{\\pi/2}^{\\pi}=0-2=-2$.",
    parts: [
      { key: "a", label: "(a)", prompt: "When $f'(x)$ is antidifferentiated to $a\\sin x+b\\ln|x|+C$, state the value of $a$.", latex: "f(x)=a\\sin x+b\\ln|x|+C", marks: 2, answer: "2", acceptedAnswers: ["2.0"], hint: "Integrate $2\\cos x$.", explanation: "$\\int 2\\cos x\\,dx=2\\sin x$, so $a=2$." },
      { key: "b", label: "(b)", prompt: "State the coefficient $b$ of $\\ln|x|$ in $f(x)$.", latex: "b\\ln|x|", marks: 1, answer: "3", acceptedAnswers: ["3.0"], hint: "Integrate $\\frac3x$.", explanation: "$\\int\\frac3x\\,dx=3\\ln|x|$, so $b=3$." },
      { key: "c", label: "(c)", prompt: "Evaluate $\\int_{\\pi/2}^{\\pi}2\\cos x\\,dx$.", latex: "\\int_{\\pi/2}^{\\pi}2\\cos x\\,dx", marks: 2, answer: "-2", acceptedAnswers: ["−2", "-2.0"], hint: "Antiderivative is $2\\sin x$.", explanation: "$[2\\sin x]_{\\pi/2}^{\\pi}=2\\sin\\pi-2\\sin\\frac\\pi2=0-2=-2$." },
    ],
  },
];

reverseChainRuleLesson.masteryQuizPool = [
  { id: "fint-chain-p1", prompt: "Choose the correct antiderivative.", latex: "\\int e^{2x}\\,dx", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$e^{2x}+C$" }, { label: "B", text: "$\\frac12e^{2x}+C$" }, { label: "C", text: "$2e^{2x}+C$" }, { label: "D", text: "$e^x+C$" }], hint: "Divide by the inner derivative $2$.", explanation: "$\\int e^{ax+b}\\,dx=\\frac1a e^{ax+b}+C$, so $\\frac12e^{2x}+C$." },
  { id: "fint-chain-p2", prompt: "Choose the correct antiderivative.", latex: "\\int e^{5x}\\,dx", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$e^{5x}+C$" }, { label: "B", text: "$5e^{5x}+C$" }, { label: "C", text: "$\\frac15e^{5x}+C$" }, { label: "D", text: "$e^x+C$" }], hint: "Divide by $5$.", explanation: "$\\int e^{5x}\\,dx=\\frac15e^{5x}+C$." },
  { id: "fint-chain-p3", prompt: "Choose the correct antiderivative.", latex: "\\int \\cos(3x)\\,dx", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$\\sin(3x)+C$" }, { label: "B", text: "$-\\frac13\\sin(3x)+C$" }, { label: "C", text: "$\\frac13\\sin(3x)+C$" }, { label: "D", text: "$3\\sin(3x)+C$" }], hint: "Cosine integrates to sine; divide by $3$.", explanation: "$\\int\\cos(ax)\\,dx=\\frac1a\\sin(ax)+C$." },
  { id: "fint-chain-p4", prompt: "Choose the missing factor.", latex: "\\int \\frac{dx}{5x+1}=\\boxed{\\ \\ }\\ln|5x+1|+C", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac15$" }, { label: "B", text: "$5$" }, { label: "C", text: "$-5$" }, { label: "D", text: "$1$" }], hint: "The inner derivative is $5$.", explanation: "$\\int\\frac{1}{ax+b}\\,dx=\\frac1a\\ln|ax+b|+C$, so the factor is $\\frac15$." },
  { id: "fint-chain-p5", prompt: "Choose the correct antiderivative.", latex: "\\int e^{4x-2}\\,dx", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac14e^{4x-2}+C$" }, { label: "B", text: "$4e^{4x-2}+C$" }, { label: "C", text: "$e^{4x-2}+C$" }, { label: "D", text: "$e^{4x}+C$" }], hint: "Inner derivative is $4$.", explanation: "$\\int e^{4x-2}\\,dx=\\frac14e^{4x-2}+C$." },
  { id: "fint-chain-p6", prompt: "Choose the correct antiderivative.", latex: "\\int \\sin(2x)\\,dx", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\frac12\\cos(2x)+C$" }, { label: "B", text: "$-\\frac12\\cos(2x)+C$" }, { label: "C", text: "$2\\cos(2x)+C$" }, { label: "D", text: "$-2\\cos(2x)+C$" }], hint: "Sine integrates to negative cosine.", explanation: "$\\int\\sin(2x)\\,dx=-\\frac12\\cos(2x)+C$." },
  { id: "fint-chain-p7", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{1}{3x-4}\\,dx", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\ln|3x-4|+C$" }, { label: "B", text: "$3\\ln|3x-4|+C$" }, { label: "C", text: "$\\frac13\\ln|3x-4|+C$" }, { label: "D", text: "$\\frac{1}{3x-4}+C$" }], hint: "Factor $\\frac13$.", explanation: "$\\int\\frac{1}{3x-4}\\,dx=\\frac13\\ln|3x-4|+C$." },
  { id: "fint-chain-p8", prompt: "Choose the correct antiderivative.", latex: "\\int (2x+1)^4\\,dx", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$\\frac15(2x+1)^5+C$" }, { label: "B", text: "$2(2x+1)^5+C$" }, { label: "C", text: "$(2x+1)^5+C$" }, { label: "D", text: "$\\frac{1}{10}(2x+1)^5+C$" }], hint: "Raise the power, then divide by $5$ and the inner derivative $2$.", explanation: "$\\int(2x+1)^4\\,dx=\\frac{(2x+1)^5}{5\\cdot2}=\\frac{1}{10}(2x+1)^5+C$." },
  { id: "fint-chain-p9", prompt: "Choose the correct antiderivative.", latex: "\\int \\cos(2x+1)\\,dx", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac12\\sin(2x+1)+C$" }, { label: "B", text: "$2\\sin(2x+1)+C$" }, { label: "C", text: "$-\\frac12\\sin(2x+1)+C$" }, { label: "D", text: "$\\cos(2x+1)+C$" }], hint: "Inner derivative is $2$.", explanation: "$\\int\\cos(2x+1)\\,dx=\\frac12\\sin(2x+1)+C$." },
  { id: "fint-chain-p10", prompt: "Choose the correct antiderivative.", latex: "\\int \\sin(3x-1)\\,dx", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\frac13\\cos(3x-1)+C$" }, { label: "B", text: "$3\\cos(3x-1)+C$" }, { label: "C", text: "$-3\\cos(3x-1)+C$" }, { label: "D", text: "$-\\frac13\\cos(3x-1)+C$" }], hint: "Negative cosine, divide by $3$.", explanation: "$\\int\\sin(3x-1)\\,dx=-\\frac13\\cos(3x-1)+C$." },
  { id: "fint-chain-p11", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{1}{4x+7}\\,dx", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\ln|4x+7|+C$" }, { label: "B", text: "$\\frac14\\ln|4x+7|+C$" }, { label: "C", text: "$4\\ln|4x+7|+C$" }, { label: "D", text: "$\\frac{1}{4x+7}+C$" }], hint: "Inner derivative is $4$.", explanation: "$\\int\\frac{1}{4x+7}\\,dx=\\frac14\\ln|4x+7|+C$." },
  { id: "fint-chain-p12", prompt: "Choose the correct antiderivative.", latex: "\\int (3x-2)^5\\,dx", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac16(3x-2)^6+C$" }, { label: "B", text: "$3(3x-2)^6+C$" }, { label: "C", text: "$\\frac{1}{18}(3x-2)^6+C$" }, { label: "D", text: "$\\frac13(3x-2)^6+C$" }], hint: "Divide by $6\\cdot3$.", explanation: "$\\int(3x-2)^5\\,dx=\\frac{(3x-2)^6}{18}+C$." },
  { id: "fint-chain-p13", prompt: "Which integrand is exactly $f'(x)$ times $e^{f(x)}$?", latex: "\\text{Select A, B, C, or D.}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$6x\\,e^{3x^2}$" }, { label: "B", text: "$x\\,e^{3x}$" }, { label: "C", text: "$e^x+x$" }, { label: "D", text: "$\\frac{1}{x^2+1}$" }], hint: "Check which inside function has the front factor as its derivative.", explanation: "$\\frac{d}{dx}(3x^2)=6x$, so $6x\\,e^{3x^2}$ is $f'(x)e^{f(x)}$." },
  { id: "fint-chain-p14", prompt: "Choose the correct antiderivative.", latex: "\\int 6x\\,e^{3x^2}\\,dx", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$e^{3x^2}+C$" }, { label: "B", text: "$6e^{3x^2}+C$" }, { label: "C", text: "$18x\\,e^{3x^2}+C$" }, { label: "D", text: "$\\frac16e^{3x^2}+C$" }], hint: "The front factor is the inner derivative.", explanation: "Since $6x=\\frac{d}{dx}(3x^2)$, $\\int 6x\\,e^{3x^2}\\,dx=e^{3x^2}+C$." },
  { id: "fint-chain-p15", prompt: "A student writes $\\int e^{2x}\\,dx=e^{2x}+C$. What is missing?", latex: "\\int e^{2x}\\,dx", answer: "B", difficulty: 3, choices: [{ label: "A", text: "a negative sign" }, { label: "B", text: "the factor $\\frac12$" }, { label: "C", text: "absolute value bars" }, { label: "D", text: "a squared term" }], hint: "Differentiate $e^{2x}$ to check.", explanation: "$\\frac{d}{dx}(e^{2x})=2e^{2x}$, so a factor $\\frac12$ is needed." },
  { id: "fint-chain-p16", prompt: "Choose the correct antiderivative.", latex: "\\int 2\\cos(2x)\\,dx", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$2\\sin(2x)+C$" }, { label: "B", text: "$-\\sin(2x)+C$" }, { label: "C", text: "$\\frac12\\sin(2x)+C$" }, { label: "D", text: "$\\sin(2x)+C$" }], hint: "The outside $2$ cancels the $\\frac12$ factor.", explanation: "$\\int 2\\cos(2x)\\,dx=2\\cdot\\frac12\\sin(2x)+C=\\sin(2x)+C$." },
  { id: "fint-chain-p17", prompt: "Choose the correct antiderivative.", latex: "\\int 8x(2x^2+1)^3\\,dx", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$(2x^2+1)^4+C$" }, { label: "B", text: "$\\frac12(2x^2+1)^4+C$" }, { label: "C", text: "$8(2x^2+1)^4+C$" }, { label: "D", text: "$2x^2(2x^2+1)^4+C$" }], hint: "Note $\\frac{d}{dx}(2x^2+1)=4x$.", explanation: "$\\frac{d}{dx}\\left[\\frac12(2x^2+1)^4\\right]=\\frac12\\cdot4(2x^2+1)^3\\cdot4x=8x(2x^2+1)^3$." },
  { id: "fint-chain-p18", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{2x}{x^2+1}\\,dx", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\ln(x^2+1)+C$" }, { label: "B", text: "$\\frac12\\ln(x^2+1)+C$" }, { label: "C", text: "$2\\ln(x^2+1)+C$" }, { label: "D", text: "$\\frac{1}{x^2+1}+C$" }], hint: "The numerator is the derivative of the denominator.", explanation: "$\\int\\frac{f'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$; here $f(x)=x^2+1$." },
  { id: "fint-chain-p19", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{x}{x^2+1}\\,dx", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\ln(x^2+1)+C$" }, { label: "B", text: "$\\frac12\\ln(x^2+1)+C$" }, { label: "C", text: "$2\\ln(x^2+1)+C$" }, { label: "D", text: "$\\frac{x^2}{x^2+1}+C$" }], hint: "Only half of the needed derivative $2x$ is present.", explanation: "$\\int\\frac{x}{x^2+1}\\,dx=\\frac12\\int\\frac{2x}{x^2+1}\\,dx=\\frac12\\ln(x^2+1)+C$." },
  { id: "fint-chain-p20", prompt: "Which is the strongest check that $\\frac12\\ln|2x+3|$ is the right antiderivative?", latex: "\\int \\frac{1}{2x+3}\\,dx", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Differentiate $\\ln|2x+3|$" }, { label: "B", text: "Differentiate $2\\ln|2x+3|$" }, { label: "C", text: "Differentiate $\\frac12\\ln|2x+3|$ and confirm it gives $\\frac{1}{2x+3}$" }, { label: "D", text: "Differentiate $\\frac{1}{2x+3}$" }], hint: "Differentiate the proposed answer.", explanation: "$\\frac{d}{dx}\\left[\\frac12\\ln|2x+3|\\right]=\\frac12\\cdot\\frac{2}{2x+3}=\\frac{1}{2x+3}$." },
  { id: "fint-chain-p21", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/4}\\cos(2x)\\,dx", answer: "1/2", difficulty: 4, acceptedAnswers: ["0.5", "0.50"], hint: "Antiderivative is $\\frac12\\sin(2x)$.", explanation: "$\\left[\\frac12\\sin(2x)\\right]_0^{\\pi/4}=\\frac12\\sin\\frac\\pi2-0=\\frac12$." },
  { id: "fint-chain-p22", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/6}\\sin(3x)\\,dx", answer: "1/3", difficulty: 4, acceptedAnswers: ["0.33", "0.333"], hint: "Antiderivative is $-\\frac13\\cos(3x)$; $\\cos\\frac\\pi2=0$.", explanation: "$\\left[-\\frac13\\cos(3x)\\right]_0^{\\pi/6}=-\\frac13(0)-\\left(-\\frac13\\right)=\\frac13$." },
  { id: "fint-chain-p23", prompt: "Evaluate the definite integral. Use $e^2\\approx7.389$; give 3 d.p.", latex: "\\int_0^1 e^{2x}\\,dx", answer: "3.195", difficulty: 5, acceptedAnswers: ["(e^2-1)/2", "3.19"], hint: "Antiderivative is $\\frac12e^{2x}$.", explanation: "$\\left[\\frac12e^{2x}\\right]_0^1=\\frac12(e^2-1)=\\frac12(6.389)\\approx3.195$." },
  { id: "fint-chain-p24", prompt: "Which integral requires the form $\\int \\frac{f'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$?", latex: "\\text{Select A, B, C, or D.}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$\\int e^{3x}\\,dx$" }, { label: "B", text: "$\\int (2x+1)^3\\,dx$" }, { label: "C", text: "$\\int \\frac{3x^2}{x^3+5}\\,dx$" }, { label: "D", text: "$\\int \\sin(4x)\\,dx$" }], hint: "Look for a numerator equal to the derivative of the denominator.", explanation: "$\\frac{d}{dx}(x^3+5)=3x^2$, the numerator, so $\\int\\frac{3x^2}{x^3+5}\\,dx=\\ln|x^3+5|+C$." },
  { id: "fint-chain-p25", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{3x^2}{x^3+5}\\,dx", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\ln|x^3+5|+C$" }, { label: "B", text: "$\\frac13\\ln|x^3+5|+C$" }, { label: "C", text: "$3\\ln|x^3+5|+C$" }, { label: "D", text: "$\\frac{1}{x^3+5}+C$" }], hint: "Numerator is exactly the derivative of the denominator.", explanation: "$\\int\\frac{f'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$ with $f(x)=x^3+5$." },
  { id: "fint-chain-p26", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^1 \\frac{2x}{x^2+1}\\,dx", answer: "ln2", difficulty: 5, acceptedAnswers: ["\\ln 2", "ln(2)", "0.693"], hint: "Antiderivative is $\\ln(x^2+1)$.", explanation: "$[\\ln(x^2+1)]_0^1=\\ln2-\\ln1=\\ln2\\approx0.693$." },
  { id: "fint-chain-p27", prompt: "A student integrates $\\int \\sin(2x)\\,dx$ and writes $-\\cos(2x)+C$. Which correction is needed?", latex: "\\int \\sin(2x)\\,dx", answer: "C", difficulty: 5, choices: [{ label: "A", text: "Change the sign to $+\\cos(2x)$" }, { label: "B", text: "Add absolute value bars" }, { label: "C", text: "Multiply by the factor $\\frac12$" }, { label: "D", text: "Use $\\ln$ instead" }], hint: "Differentiate $-\\cos(2x)$ to check the constant.", explanation: "$\\frac{d}{dx}[-\\cos(2x)]=2\\sin(2x)$, so the answer must be $-\\frac12\\cos(2x)+C$." },
  { id: "fint-chain-p28", prompt: "Choose the correct antiderivative.", latex: "\\int \\left(e^{2x}+\\frac{1}{2x+1}\\right)\\,dx", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\frac12e^{2x}+\\frac12\\ln|2x+1|+C$" }, { label: "B", text: "$2e^{2x}+2\\ln|2x+1|+C$" }, { label: "C", text: "$\\frac12e^{2x}+\\ln|2x+1|+C$" }, { label: "D", text: "$e^{2x}+\\frac12\\ln|2x+1|+C$" }], hint: "Both terms have inner derivative $2$.", explanation: "$\\int e^{2x}\\,dx=\\frac12e^{2x}$ and $\\int\\frac{1}{2x+1}\\,dx=\\frac12\\ln|2x+1|$." },
];

reverseChainRuleLesson.multiPartPractice = [
  {
    id: "fint-chain-mp1",
    prompt:
      "Consider the integral $\\int 8x(x^2+3)^3\\,dx$, which can be evaluated by the reverse chain rule with inside function $u=x^2+3$.",
    latex: "\\int 8x(x^2+3)^3\\,dx",
    answer: "2x",
    hint: "Differentiate the inside function, then write the antiderivative and evaluate it.",
    explanation:
      "(a) $\\frac{d}{dx}(x^2+3)=2x$. (b) $\\int 8x(x^2+3)^3\\,dx=8\\cdot\\frac{1}{2}\\cdot\\frac{(x^2+3)^4}{4}+C=(x^2+3)^4+C$, so the coefficient of $(x^2+3)^4$ is one. (c) $\\int_0^1 8x(x^2+3)^3\\,dx=[(x^2+3)^4]_0^1=4^4-3^4=256-81=175$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the derivative of the inside function $x^2+3$.", latex: "\\frac{d}{dx}(x^2+3)", marks: 1, answer: "2x", acceptedAnswers: ["2*x"], hint: "Differentiate term by term.", explanation: "$\\frac{d}{dx}(x^2+3)=2x$." },
      { key: "b", label: "(b)", prompt: "The antiderivative simplifies to $k(x^2+3)^4+C$. State the value of $k$.", latex: "k(x^2+3)^4+C", marks: 2, answer: "1", acceptedAnswers: ["1.0"], hint: "Combine the factors $8\\cdot\\frac12\\cdot\\frac14$.", explanation: "$8\\cdot\\frac12\\cdot\\frac14=1$, so $k=1$." },
      { key: "c", label: "(c)", prompt: "Hence evaluate $\\int_0^1 8x(x^2+3)^3\\,dx$.", latex: "\\int_0^1 8x(x^2+3)^3\\,dx", marks: 2, answer: "175", acceptedAnswers: ["175.0"], hint: "Use $(x^2+3)^4$ between the limits.", explanation: "$[(x^2+3)^4]_0^1=4^4-3^4=256-81=175$." },
    ],
  },
];

definiteIntegralsStandardFormsLesson.masteryQuizPool = [
  { id: "fint-def-p1", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi/2}\\sin x\\,dx", answer: "1", difficulty: 1, acceptedAnswers: ["1.0"], hint: "Antiderivative is $-\\cos x$.", explanation: "$[-\\cos x]_0^{\\pi/2}=0-(-1)=1$." },
  { id: "fint-def-p2", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi/2}\\cos x\\,dx", answer: "1", difficulty: 1, acceptedAnswers: ["1.0"], hint: "Antiderivative is $\\sin x$.", explanation: "$[\\sin x]_0^{\\pi/2}=1-0=1$." },
  { id: "fint-def-p3", prompt: "Choose the exact value.", latex: "\\int_0^1 e^x\\,dx", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$e-1$" }, { label: "B", text: "$e$" }, { label: "C", text: "$1-e$" }, { label: "D", text: "$1$" }], hint: "Antiderivative is $e^x$.", explanation: "$[e^x]_0^1=e-1$." },
  { id: "fint-def-p4", prompt: "Evaluate the definite integral.", latex: "\\int_1^e \\frac{1}{x}\\,dx", answer: "1", difficulty: 1, acceptedAnswers: ["1.0"], hint: "Antiderivative is $\\ln x$.", explanation: "$[\\ln x]_1^e=1-0=1$." },
  { id: "fint-def-p5", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi}\\sin x\\,dx", answer: "2", difficulty: 2, acceptedAnswers: ["2.0"], hint: "Antiderivative is $-\\cos x$.", explanation: "$[-\\cos x]_0^{\\pi}=1-(-1)=2$." },
  { id: "fint-def-p6", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi}\\cos x\\,dx", answer: "0", difficulty: 2, acceptedAnswers: ["0.0"], hint: "Antiderivative is $\\sin x$.", explanation: "$[\\sin x]_0^{\\pi}=0-0=0$." },
  { id: "fint-def-p7", prompt: "Choose the exact value.", latex: "\\int_0^2 e^x\\,dx", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$e^2$" }, { label: "B", text: "$2e$" }, { label: "C", text: "$e^2-1$" }, { label: "D", text: "$1-e^2$" }], hint: "Antiderivative is $e^x$.", explanation: "$[e^x]_0^2=e^2-1$." },
  { id: "fint-def-p8", prompt: "Choose the exact value.", latex: "\\int_1^{e^2}\\frac{1}{x}\\,dx", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$e^2-1$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\ln2$" }, { label: "D", text: "$2$" }], hint: "$\\ln(e^2)=2$.", explanation: "$[\\ln x]_1^{e^2}=2-0=2$." },
  { id: "fint-def-p9", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi/4}\\sec^2 x\\,dx", answer: "1", difficulty: 3, acceptedAnswers: ["1.0"], hint: "Antiderivative is $\\tan x$; $\\tan\\frac\\pi4=1$.", explanation: "$[\\tan x]_0^{\\pi/4}=1-0=1$." },
  { id: "fint-def-p10", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi} -\\sin x\\,dx", answer: "-2", difficulty: 3, acceptedAnswers: ["−2", "-2.0"], hint: "This is the negative of $\\int_0^\\pi\\sin x\\,dx$.", explanation: "$\\int_0^\\pi\\sin x\\,dx=2$, so the negative is $-2$." },
  { id: "fint-def-p11", prompt: "Choose the exact value.", latex: "\\int_1^{e} \\frac{2}{x}\\,dx", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$1$" }, { label: "B", text: "$e^2$" }, { label: "C", text: "$2e$" }, { label: "D", text: "$2$" }], hint: "Factor out $2$.", explanation: "$2[\\ln x]_1^e=2(1-0)=2$." },
  { id: "fint-def-p12", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi/2} 3\\cos x\\,dx", answer: "3", difficulty: 3, acceptedAnswers: ["3.0"], hint: "Antiderivative is $3\\sin x$.", explanation: "$[3\\sin x]_0^{\\pi/2}=3-0=3$." },
  { id: "fint-def-p13", prompt: "Which antiderivative should be used first?", latex: "\\int_0^{\\pi/2} 3\\cos x\\,dx", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$3\\sin x$" }, { label: "B", text: "$-3\\cos x$" }, { label: "C", text: "$3x\\cos x$" }, { label: "D", text: "$\\sin 3x$" }], hint: "Integrate $3\\cos x$.", explanation: "$\\int 3\\cos x\\,dx=3\\sin x$." },
  { id: "fint-def-p14", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/2}(\\sin x+\\cos x)\\,dx", answer: "2", difficulty: 4, acceptedAnswers: ["2.0"], hint: "Antiderivative is $-\\cos x+\\sin x$.", explanation: "$[-\\cos x+\\sin x]_0^{\\pi/2}=(0+1)-(-1+0)=2$." },
  { id: "fint-def-p15", prompt: "Choose the exact value.", latex: "\\int_1^{e^3}\\frac{1}{x}\\,dx", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$e^3-1$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\ln3$" }, { label: "D", text: "$3$" }], hint: "$\\ln(e^3)=3$.", explanation: "$[\\ln x]_1^{e^3}=3-0=3$." },
  { id: "fint-def-p16", prompt: "Evaluate the definite integral. Use $e^2\\approx7.389$; give 3 d.p.", latex: "\\int_0^2 e^x\\,dx", answer: "6.389", difficulty: 4, acceptedAnswers: ["e^2-1", "6.39"], hint: "$e^2-1$.", explanation: "$[e^x]_0^2=e^2-1\\approx6.389$." },
  { id: "fint-def-p17", prompt: "A student gets $-1$ for $\\int_0^{\\pi/2}\\sin x\\,dx$. Which error is most likely?", latex: "\\int_0^{\\pi/2}\\sin x\\,dx", answer: "B", difficulty: 4, choices: [{ label: "A", text: "They forgot logarithms" }, { label: "B", text: "They reversed the sign in the sine antiderivative or swapped the limits" }, { label: "C", text: "They used $\\tan x$" }, { label: "D", text: "They used area between curves" }], hint: "The correct value is $+1$.", explanation: "Using $+\\cos x$ instead of $-\\cos x$, or evaluating lower minus upper, flips the sign." },
  { id: "fint-def-p18", prompt: "What does a negative definite integral indicate?", latex: "\\int_a^b f(x)\\,dx<0", answer: "B", difficulty: 4, choices: [{ label: "A", text: "No area exists" }, { label: "B", text: "Signed area is negative over the interval" }, { label: "C", text: "The interval is invalid" }, { label: "D", text: "The antiderivative is impossible" }], hint: "A definite integral is signed accumulation.", explanation: "A negative value means the net signed area lies below the axis." },
  { id: "fint-def-p19", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/3}\\sin x\\,dx", answer: "1/2", difficulty: 4, acceptedAnswers: ["0.5", "0.50"], hint: "Antiderivative is $-\\cos x$; $\\cos\\frac\\pi3=\\frac12$.", explanation: "$[-\\cos x]_0^{\\pi/3}=-\\frac12-(-1)=\\frac12$." },
  { id: "fint-def-p20", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/2}(2\\cos x-\\sin x)\\,dx", answer: "1", difficulty: 5, acceptedAnswers: ["1.0"], hint: "Antiderivative is $2\\sin x+\\cos x$.", explanation: "$[2\\sin x+\\cos x]_0^{\\pi/2}=(2+0)-(0+1)=1$." },
  { id: "fint-def-p21", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_1^{e}\\left(\\frac{1}{x}+1\\right)\\,dx", answer: "e", difficulty: 5, acceptedAnswers: ["2.718", "2.72"], hint: "Antiderivative is $\\ln x+x$.", explanation: "$[\\ln x+x]_1^e=(1+e)-(0+1)=e\\approx2.718$." },
  { id: "fint-def-p22", prompt: "A curve $y=\\sin x$ is integrated over $[0,2\\pi]$. Evaluate the definite integral.", latex: "\\int_0^{2\\pi}\\sin x\\,dx", answer: "0", difficulty: 5, acceptedAnswers: ["0.0"], hint: "Equal positive and negative regions.", explanation: "$[-\\cos x]_0^{2\\pi}=-1-(-1)=0$: the area above the axis cancels the area below." },
  { id: "fint-def-p23", prompt: "Which interpretation of $\\int_0^\\pi -\\sin x\\,dx=-2$ is correct?", latex: "\\int_0^\\pi -\\sin x\\,dx=-2", answer: "A", difficulty: 5, choices: [{ label: "A", text: "Signed area is $-2$; geometric area is $2$" }, { label: "B", text: "Signed area and geometric area are both $-2$" }, { label: "C", text: "The integral cannot be negative" }, { label: "D", text: "The interval must be split" }], hint: "$-\\sin x$ is below the axis on $(0,\\pi)$.", explanation: "The curve lies below the axis, so the signed integral is negative while the geometric area is its magnitude $2$." },
  { id: "fint-def-p24", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_{e}^{e^2}\\frac{1}{x}\\,dx", answer: "1", difficulty: 5, acceptedAnswers: ["1.0"], hint: "$\\ln(e^2)-\\ln(e)$.", explanation: "$[\\ln x]_e^{e^2}=2-1=1$." },
  { id: "fint-def-p25", prompt: "Evaluate the definite integral. Use $e\\approx2.718$; give 3 d.p.", latex: "\\int_0^1 (e^x+\\cos x)\\,dx\\quad(\\sin1\\approx0.841)", answer: "2.559", difficulty: 5, acceptedAnswers: ["e-1+sin1", "2.56"], hint: "Antiderivative is $e^x+\\sin x$.", explanation: "$[e^x+\\sin x]_0^1=(e+\\sin1)-(1+0)=e-1+\\sin1\\approx1.718+0.841=2.559$." },
  { id: "fint-def-p26", prompt: "Evaluate the definite integral.", latex: "\\int_0^{\\pi}2\\sin x\\,dx", answer: "4", difficulty: 4, acceptedAnswers: ["4.0"], hint: "Factor out $2$.", explanation: "$2[-\\cos x]_0^{\\pi}=2(1+1)=4$." },
  { id: "fint-def-p27", prompt: "Using exact values is preferred over decimals because:", latex: "\\int_0^1 e^x\\,dx=e-1", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Exact forms such as $e-1$ avoid rounding error" }, { label: "B", text: "Decimals are never allowed" }, { label: "C", text: "$e-1$ equals $1$ exactly" }, { label: "D", text: "Exact values change the area" }], hint: "Think about accuracy.", explanation: "Keeping $e-1$ exact avoids accumulated rounding error in later steps." },
  { id: "fint-def-p28", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/4}\\sin x\\,dx\\quad\\left(\\cos\\tfrac\\pi4=\\tfrac{\\sqrt2}{2}\\right)", answer: "1-sqrt2/2", difficulty: 5, acceptedAnswers: ["1-\\frac{\\sqrt2}{2}", "0.293"], hint: "Antiderivative is $-\\cos x$.", explanation: "$[-\\cos x]_0^{\\pi/4}=-\\frac{\\sqrt2}{2}-(-1)=1-\\frac{\\sqrt2}{2}\\approx0.293$." },
];

definiteIntegralsStandardFormsLesson.multiPartPractice = [
  {
    id: "fint-def-mp1",
    prompt:
      "The curve $y=\\sin x$ is considered on the interval $0\\le x\\le\\pi$, together with the related integral of $\\cos x$ over the same interval.",
    latex: "y=\\sin x,\\quad 0\\le x\\le\\pi",
    answer: "2",
    hint: "Evaluate each standard definite integral, then combine the signed results.",
    explanation:
      "(a) $\\int_0^\\pi\\sin x\\,dx=[-\\cos x]_0^\\pi=1-(-1)=2$. (b) $\\int_0^\\pi\\cos x\\,dx=[\\sin x]_0^\\pi=0-0=0$. (c) $\\int_0^\\pi(\\sin x-\\cos x)\\,dx=2-0=2$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Evaluate $\\int_0^\\pi \\sin x\\,dx$.", latex: "\\int_0^\\pi \\sin x\\,dx", marks: 2, answer: "2", acceptedAnswers: ["2.0"], hint: "Antiderivative is $-\\cos x$.", explanation: "$[-\\cos x]_0^\\pi=1+1=2$." },
      { key: "b", label: "(b)", prompt: "Evaluate $\\int_0^\\pi \\cos x\\,dx$.", latex: "\\int_0^\\pi \\cos x\\,dx", marks: 1, answer: "0", acceptedAnswers: ["0.0"], hint: "Antiderivative is $\\sin x$.", explanation: "$[\\sin x]_0^\\pi=0-0=0$." },
      { key: "c", label: "(c)", prompt: "Hence evaluate $\\int_0^\\pi (\\sin x-\\cos x)\\,dx$.", latex: "\\int_0^\\pi (\\sin x-\\cos x)\\,dx", marks: 2, answer: "2", acceptedAnswers: ["2.0"], hint: "Subtract (b) from (a).", explanation: "$2-0=2$." },
    ],
  },
];

areaBetweenCurvesExtendedLesson.masteryQuizPool = [
  { id: "fint-area-p1", prompt: "Choose the correct setup for area.", latex: "y=5,\\quad y=x,\\quad 0\\le x\\le3", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\int_0^3(5-x)\\,dx$" }, { label: "B", text: "$\\int_0^3(x-5)\\,dx$" }, { label: "C", text: "$\\int_0^5(3-x)\\,dx$" }, { label: "D", text: "$5-3$" }], hint: "Top minus bottom.", explanation: "On $[0,3]$, $y=5$ is above $y=x$." },
  { id: "fint-area-p2", prompt: "Find the area.", latex: "y=4,\\quad y=x,\\quad 0\\le x\\le2", answer: "6", difficulty: 1, acceptedAnswers: ["6.0"], hint: "$\\int_0^2(4-x)\\,dx$.", explanation: "$[4x-\\frac{x^2}{2}]_0^2=8-2=6$." },
  { id: "fint-area-p3", prompt: "Find the intersection x-values.", latex: "x=x^2", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$x=1$ only" }, { label: "B", text: "$x=-1,1$" }, { label: "C", text: "$x=0,1$" }, { label: "D", text: "$x=0$ only" }], hint: "Solve $x(x-1)=0$.", explanation: "$x-x^2=0\\Rightarrow x=0,1$." },
  { id: "fint-area-p4", prompt: "What should you do if the curves cross inside the interval?", latex: "\\text{area between curves}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Ignore the crossing" }, { label: "B", text: "Split the interval at the crossing" }, { label: "C", text: "Use lower minus upper" }, { label: "D", text: "Add $+C$" }], hint: "Geometric area is non-negative.", explanation: "Split so each piece keeps a fixed top and bottom." },
  { id: "fint-area-p5", prompt: "Find the area between the horizontal lines over the interval.", latex: "y=6,\\quad y=2,\\quad 0\\le x\\le5", answer: "20", difficulty: 2, acceptedAnswers: ["20.0"], hint: "Gap is $4$, width is $5$.", explanation: "$\\int_0^5(6-2)\\,dx=4\\times5=20$." },
  { id: "fint-area-p6", prompt: "Choose the correct setup.", latex: "y=3,\\quad y=x^2,\\quad 0\\le x\\le1", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$\\int_0^1(x^2-3)\\,dx$" }, { label: "B", text: "$\\int_0^3(1-x^2)\\,dx$" }, { label: "C", text: "$\\int_0^1(3+x^2)\\,dx$" }, { label: "D", text: "$\\int_0^1(3-x^2)\\,dx$" }], hint: "On $[0,1]$, $y=3$ is above $y=x^2$.", explanation: "Top minus bottom is $3-x^2$." },
  { id: "fint-area-p7", prompt: "Which function is on top over the interval?", latex: "y=x,\\quad y=x^2,\\quad 0<x<1", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$y=x$" }, { label: "B", text: "$y=x^2$" }, { label: "C", text: "they are equal throughout" }, { label: "D", text: "neither curve exists" }], hint: "Test $x=\\frac12$.", explanation: "For $0<x<1$, $x>x^2$." },
  { id: "fint-area-p8", prompt: "Find the intersection x-values.", latex: "x^2=2x", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$x=2$ only" }, { label: "B", text: "$x=0,2$" }, { label: "C", text: "$x=-2,2$" }, { label: "D", text: "$x=0$ only" }], hint: "Solve $x(x-2)=0$.", explanation: "$2x-x^2=0\\Rightarrow x=0,2$." },
  { id: "fint-area-p9", prompt: "Find the area between the horizontal lines over the interval.", latex: "y=3,\\quad y=1,\\quad 0\\le x\\le4", answer: "8", difficulty: 2, acceptedAnswers: ["8.0"], hint: "Gap $2$, width $4$.", explanation: "$\\int_0^4(3-1)\\,dx=2\\times4=8$." },
  { id: "fint-area-p10", prompt: "Find the area between the curves.", latex: "y=2x,\\quad y=x^2,\\quad 0\\le x\\le2", answer: "4/3", difficulty: 3, acceptedAnswers: ["1.33", "1.333"], hint: "$\\int_0^2(2x-x^2)\\,dx$.", explanation: "$[x^2-\\frac{x^3}{3}]_0^2=4-\\frac83=\\frac43$." },
  { id: "fint-area-p11", prompt: "Find the area between the curves.", latex: "y=x,\\quad y=x^2,\\quad 0\\le x\\le1", answer: "1/6", difficulty: 3, acceptedAnswers: ["0.17", "0.167"], hint: "$\\int_0^1(x-x^2)\\,dx$.", explanation: "$[\\frac{x^2}{2}-\\frac{x^3}{3}]_0^1=\\frac12-\\frac13=\\frac16$." },
  { id: "fint-area-p12", prompt: "Choose the correct setup between intersections.", latex: "y=2x,\\quad y=x^2", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\int_0^2(x^2-2x)\\,dx$" }, { label: "B", text: "$\\int_{-2}^2(2x-x^2)\\,dx$" }, { label: "C", text: "$\\int_0^2(2x+x^2)\\,dx$" }, { label: "D", text: "$\\int_0^2(2x-x^2)\\,dx$" }], hint: "Intersections at $0$ and $2$.", explanation: "$2x$ is above $x^2$ on $(0,2)$." },
  { id: "fint-area-p13", prompt: "A line through the origin with gradient $2$ and a parabola are graphed on the interval. Which graph lies above the other there?", latex: "\\text{line: gradient }2,\\quad \\text{parabola: }y=x^2,\\quad 0<x<2", answer: "C", difficulty: 3, choices: [{ label: "A", text: "the parabola" }, { label: "B", text: "they are equal throughout" }, { label: "C", text: "the line" }, { label: "D", text: "neither curve" }], hint: "Test $x=1$.", explanation: "$2(1)=2>1=1^2$, so the line $2x$ is on top." },
  { id: "fint-area-p14", prompt: "Find the geometric area.", latex: "y=x,\\quad y=0,\\quad -1\\le x\\le1", answer: "1", difficulty: 3, acceptedAnswers: ["1.0"], hint: "Split at $x=0$ and add two triangles.", explanation: "Each triangle has area $\\frac12$, total $1$." },
  { id: "fint-area-p15", prompt: "Which setup gives the total geometric area?", latex: "y=x,\\quad y=0,\\quad -2\\le x\\le2", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\int_{-2}^2 x\\,dx$" }, { label: "B", text: "$\\int_{-2}^0(0-x)\\,dx+\\int_0^2 x\\,dx$" }, { label: "C", text: "$\\int_0^2 x\\,dx$" }, { label: "D", text: "$\\int_{-2}^2(0-x)\\,dx$" }], hint: "Split at $x=0$.", explanation: "The single signed integral is $0$; split and add positive areas." },
  { id: "fint-area-p16", prompt: "A student sets up $\\int_0^1(x^2-x)\\,dx$ for the area between $y=x$ and $y=x^2$ on $[0,1]$. What is the issue?", latex: "\\text{on }0\\le x\\le1", answer: "A", difficulty: 4, choices: [{ label: "A", text: "The order is lower minus upper" }, { label: "B", text: "The limits are reversed" }, { label: "C", text: "The curves do not intersect" }, { label: "D", text: "The answer needs $+C$" }], hint: "Which curve is on top here?", explanation: "On $[0,1]$, $x>x^2$, so the setup should be $x-x^2$." },
  { id: "fint-area-p17", prompt: "Find the area enclosed between the curves.", latex: "y=x^2,\\quad y=4", answer: "32/3", difficulty: 4, acceptedAnswers: ["10.67", "10.667"], hint: "Intersections at $x=\\pm2$; top is $y=4$.", explanation: "$\\int_{-2}^2(4-x^2)\\,dx=[4x-\\frac{x^3}{3}]_{-2}^2=\\frac{16}{3}+\\frac{16}{3}=\\frac{32}{3}$." },
  { id: "fint-area-p18", prompt: "Find the area enclosed between the line and the parabola.", latex: "y=x+2,\\quad y=x^2", answer: "9/2", difficulty: 4, acceptedAnswers: ["4.5", "4.50"], hint: "Solve $x^2=x+2$ first; line is on top.", explanation: "Intersections $x=-1,2$. $\\int_{-1}^2(x+2-x^2)\\,dx=[\\frac{x^2}{2}+2x-\\frac{x^3}{3}]_{-1}^2=\\frac{10}{3}-\\left(-\\frac{7}{6}\\right)=\\frac92$." },
  { id: "fint-area-p19", prompt: "Which method is safest for curves that cross twice inside an interval?", latex: "\\text{area between curves}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Use one signed integral only" }, { label: "B", text: "Ignore the intersections" }, { label: "C", text: "Split into intervals where the top and bottom are fixed" }, { label: "D", text: "Always use the trapezoidal rule" }], hint: "Avoid cancellation.", explanation: "Splitting where the curves swap order keeps each piece positive." },
  { id: "fint-area-p20", prompt: "Find the total geometric area between $y=x^3$ and the $x$-axis.", latex: "y=x^3,\\quad -1\\le x\\le1", answer: "1/2", difficulty: 5, acceptedAnswers: ["0.5", "0.50"], hint: "By symmetry, twice the area on $[0,1]$.", explanation: "$\\int_0^1 x^3\\,dx=\\frac14$; by symmetry total area $=2\\times\\frac14=\\frac12$. The signed integral over $[-1,1]$ is $0$." },
  { id: "fint-area-p21", prompt: "Find the area enclosed between the curves.", latex: "y=x^2,\\quad y=2x-x^2", answer: "1/3", difficulty: 5, acceptedAnswers: ["0.33", "0.333"], hint: "Solve $x^2=2x-x^2$; the upper curve is $2x-x^2$.", explanation: "Intersections $x=0,1$. $\\int_0^1((2x-x^2)-x^2)\\,dx=\\int_0^1(2x-2x^2)\\,dx=[x^2-\\frac{2x^3}{3}]_0^1=1-\\frac23=\\frac13$." },
  { id: "fint-area-p22", prompt: "The region between $y=x$ and $y=x^2$ from $x=0$ to $x=2$ requires splitting because the curves cross at $x=1$. Find the total geometric area.", latex: "y=x,\\quad y=x^2,\\quad 0\\le x\\le2", answer: "1", difficulty: 5, acceptedAnswers: ["1.0"], hint: "On $[0,1]$ use $x-x^2$; on $[1,2]$ use $x^2-x$.", explanation: "$\\int_0^1(x-x^2)\\,dx=\\frac16$ and $\\int_1^2(x^2-x)\\,dx=\\frac56$, total $\\frac16+\\frac56=1$." },
  { id: "fint-area-p23", prompt: "Choose the correct setup for the geometric area when the curve crosses the x-axis.", latex: "y=x,\\quad y=0,\\quad -1\\le x\\le1", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$\\int_{-1}^1 x\\,dx$" }, { label: "B", text: "$\\int_{-1}^1(0-x)\\,dx$" }, { label: "C", text: "$\\int_{-1}^0(0-x)\\,dx+\\int_0^1 x\\,dx$" }, { label: "D", text: "$\\int_0^1 x\\,dx$ only" }], hint: "Crossing at $x=0$.", explanation: "Split at the crossing and add the two positive pieces." },
  { id: "fint-area-p24", prompt: "Find the area enclosed between the parabola and the line.", latex: "y=4-x^2,\\quad y=0", answer: "32/3", difficulty: 5, acceptedAnswers: ["10.67", "10.667"], hint: "Intersections at $x=\\pm2$; curve is above the axis.", explanation: "$\\int_{-2}^2(4-x^2)\\,dx=[4x-\\frac{x^3}{3}]_{-2}^2=\\frac{16}{3}-\\left(-\\frac{16}{3}\\right)=\\frac{32}{3}$." },
  { id: "fint-area-p25", prompt: "A definite integral of (top minus bottom) gives a negative number. What does this tell you?", latex: "\\int_a^b(\\text{top}-\\text{bottom})\\,dx<0", answer: "B", difficulty: 5, choices: [{ label: "A", text: "The area is negative" }, { label: "B", text: "The chosen 'top' is actually below the other curve there" }, { label: "C", text: "The limits must be swapped" }, { label: "D", text: "The curves never meet" }], hint: "Areas cannot be negative.", explanation: "A negative result means the labelling of top and bottom was reversed on that interval." },
  { id: "fint-area-p26", prompt: "Find the area between the horizontal lines over the interval.", latex: "y=7,\\quad y=3,\\quad 0\\le x\\le4", answer: "16", difficulty: 3, acceptedAnswers: ["16.0"], hint: "Gap $4$, width $4$.", explanation: "$\\int_0^4(7-3)\\,dx=4\\times4=16$." },
  { id: "fint-area-p27", prompt: "Find the area between the horizontal lines over the interval.", latex: "y=5,\\quad y=2,\\quad 1\\le x\\le4", answer: "9", difficulty: 2, acceptedAnswers: ["9.0"], hint: "Gap $3$, width $3$.", explanation: "$\\int_1^4(5-2)\\,dx=3\\times3=9$." },
  { id: "fint-area-p28", prompt: "Find the area enclosed between the curves.", latex: "y=6x,\\quad y=3x^2,\\quad 0\\le x\\le2", answer: "4", difficulty: 5, acceptedAnswers: ["4.0"], hint: "Intersections at $x=0,2$; $6x$ is on top.", explanation: "$\\int_0^2(6x-3x^2)\\,dx=[3x^2-x^3]_0^2=12-8=4$." },
];

areaBetweenCurvesExtendedLesson.multiPartPractice = [
  {
    id: "fint-area-mp1",
    prompt:
      "The line $y=2x$ and the parabola $y=x^2$ enclose a region in the first quadrant.",
    latex: "y=2x,\\quad y=x^2",
    answer: "2",
    hint: "Find the intersections first, decide which curve is on top, then integrate the difference.",
    explanation:
      "(a) $2x=x^2\\Rightarrow x^2-2x=0\\Rightarrow x=0$ or $x=2$, so the larger intersection is $x=2$. (b) On $(0,2)$, $2x>x^2$, so the upper curve is $y=2x$. (c) $\\int_0^2(2x-x^2)\\,dx=[x^2-\\frac{x^3}{3}]_0^2=4-\\frac83=\\frac43$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the larger $x$-coordinate where the curves intersect.", latex: "2x=x^2", marks: 2, answer: "2", acceptedAnswers: ["2.0"], hint: "Solve $x^2-2x=0$.", explanation: "$x(x-2)=0$ gives $x=0$ or $x=2$; the larger is $2$." },
      { key: "b", label: "(b)", prompt: "At $x=1$, find the vertical gap (upper curve value minus lower curve value).", latex: "y=2x,\\ y=x^2,\\ x=1", marks: 1, answer: "1", acceptedAnswers: ["1.0"], hint: "Compute $2(1)-1^2$.", explanation: "$2(1)-1^2=2-1=1$, confirming $y=2x$ is on top." },
      { key: "c", label: "(c)", prompt: "Find the exact area enclosed between the curves.", latex: "\\int_0^2(2x-x^2)\\,dx", marks: 3, answer: "4/3", acceptedAnswers: ["1.33", "1.333"], hint: "Integrate $2x-x^2$ from $0$ to $2$.", explanation: "$[x^2-\\frac{x^3}{3}]_0^2=4-\\frac83=\\frac43$." },
    ],
  },
];

trapezoidalRuleLesson.masteryQuizPool = [
  { id: "fint-trap-p1", prompt: "What is the subinterval width?", latex: "a=1,\\quad b=5,\\quad n=4", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$4$" }, { label: "B", text: "$1$" }, { label: "C", text: "$5$" }, { label: "D", text: "$16$" }], hint: "$h=\\frac{b-a}{n}$.", explanation: "$h=\\frac{5-1}{4}=1$." },
  { id: "fint-trap-p2", prompt: "Which value is doubled in the two-subinterval trapezoidal rule?", latex: "y_0,\\ y_1,\\ y_2", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$y_0$ only" }, { label: "B", text: "$y_2$ only" }, { label: "C", text: "$y_1$ only" }, { label: "D", text: "all three" }], hint: "Interior ordinates are doubled.", explanation: "Only $y_1$ is interior, so only it is doubled." },
  { id: "fint-trap-p3", prompt: "Which expression gives the correct subinterval width?", latex: "\\text{limits }a\\text{ to }b,\\ n\\text{ subintervals}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{b-a}{n}$" }, { label: "B", text: "$\\frac{n}{b-a}$" }, { label: "C", text: "$b-a+n$" }, { label: "D", text: "$\\frac{b+a}{n}$" }], hint: "Total width divided by number of strips.", explanation: "$h=\\frac{b-a}{n}$." },
  { id: "fint-trap-p4", prompt: "Use one trapezoid to approximate the integral.", latex: "\\int_0^2 x^2\\,dx", answer: "4", difficulty: 2, acceptedAnswers: ["4.0"], hint: "Endpoints $y_0=0$, $y_1=4$; $h=2$.", explanation: "$\\frac{2}{2}(0+4)=4$." },
  { id: "fint-trap-p5", prompt: "Use two subintervals to approximate the integral.", latex: "\\int_0^2 x^2\\,dx", answer: "3", difficulty: 2, acceptedAnswers: ["3.0"], hint: "Use $y_0=0$, $y_1=1$, $y_2=4$; $h=1$.", explanation: "$\\frac12(0+2(1)+4)=3$." },
  { id: "fint-trap-p6", prompt: "Use one trapezoid to approximate the integral.", latex: "\\int_1^3 (x+1)\\,dx", answer: "6", difficulty: 2, acceptedAnswers: ["6.0"], hint: "Endpoints $y_0=2$, $y_1=4$; $h=2$.", explanation: "$\\frac{2}{2}(2+4)=6$." },
  { id: "fint-trap-p7", prompt: "Which setup correctly uses the trapezoidal rule for four y-values with spacing $h$?", latex: "y_0,\\ y_1,\\ y_2,\\ y_3", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$h(y_0+y_1+y_2+y_3)$" }, { label: "B", text: "$\\frac h2(y_0+y_1+y_2+y_3)$" }, { label: "C", text: "$\\frac h2(2y_0+y_1+y_2+2y_3)$" }, { label: "D", text: "$\\frac h2(y_0+2y_1+2y_2+y_3)$" }], hint: "Endpoints once, interiors doubled.", explanation: "$\\frac h2(y_0+2y_1+2y_2+y_3)$." },
  { id: "fint-trap-p8", prompt: "For a concave-up graph, the trapezoidal rule usually:", latex: "\\text{concave up on the interval}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "overestimates" }, { label: "B", text: "underestimates" }, { label: "C", text: "is always exact" }, { label: "D", text: "cannot be used" }], hint: "Chords lie above a concave-up curve.", explanation: "The straight tops sit above the curve, so it overestimates." },
  { id: "fint-trap-p9", prompt: "Use the trapezoidal rule to approximate the integral from the table.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ y&2&5&6&8\\end{array}", answer: "16", difficulty: 3, acceptedAnswers: ["16.0"], hint: "$h=1$; endpoints once, interiors doubled.", explanation: "$\\frac12(2+2(5)+2(6)+8)=\\frac12(32)=16$." },
  { id: "fint-trap-p10", prompt: "Use the trapezoidal rule with two subintervals.", latex: "\\begin{array}{c|ccc}x&0&2&4\\\\ y&3&7&11\\end{array}", answer: "28", difficulty: 3, acceptedAnswers: ["28.0"], hint: "$h=2$; double the interior $y_1=7$.", explanation: "$\\frac22(3+2(7)+11)=1\\times28=28$." },
  { id: "fint-trap-p11", prompt: "Use one trapezoid to approximate the integral.", latex: "\\int_0^2 x^3\\,dx", answer: "8", difficulty: 3, acceptedAnswers: ["8.0"], hint: "Endpoints $0$ and $8$; $h=2$.", explanation: "$\\frac22(0+8)=8$." },
  { id: "fint-trap-p12", prompt: "Use the trapezoidal rule to approximate the area from the table.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ y&0&2&6\\end{array}", answer: "5", difficulty: 3, acceptedAnswers: ["5.0"], hint: "$h=1$; double $y_1=2$.", explanation: "$\\frac12(0+2(2)+6)=\\frac12(10)=5$." },
  { id: "fint-trap-p13", prompt: "Use the trapezoidal rule to approximate the integral from the table.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ y&4&7&9&10\\end{array}", answer: "23", difficulty: 3, acceptedAnswers: ["23.0"], hint: "$h=1$; double the two interior values.", explanation: "$\\frac12(4+2(7)+2(9)+10)=\\frac12(46)=23$." },
  { id: "fint-trap-p14", prompt: "A student uses $h=4$ for four subintervals from $x=0$ to $x=8$. What is the error?", latex: "\\text{four subintervals on }0\\le x\\le8", answer: "B", difficulty: 3, choices: [{ label: "A", text: "They doubled the endpoints" }, { label: "B", text: "They used $n$ instead of $h$" }, { label: "C", text: "They forgot the final $y$-value" }, { label: "D", text: "They used exact integration" }], hint: "$h=\\frac{8}{4}$.", explanation: "$h=\\frac{8-0}{4}=2$, not $4$; they confused $h$ with $n$." },
  { id: "fint-trap-p15", prompt: "Which y-values should be doubled for five equally spaced table values?", latex: "y_0,\\ y_1,\\ y_2,\\ y_3,\\ y_4", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$y_0,y_4$" }, { label: "B", text: "all five" }, { label: "C", text: "$y_1,y_2,y_3$" }, { label: "D", text: "$y_2$ only" }], hint: "Only interior ordinates.", explanation: "The three interior values $y_1,y_2,y_3$ are doubled." },
  { id: "fint-trap-p16", prompt: "For a concave-down graph, the trapezoidal rule usually:", latex: "\\text{concave down on the interval}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "overestimates" }, { label: "B", text: "underestimates" }, { label: "C", text: "is always exact" }, { label: "D", text: "gives the derivative" }], hint: "Chords lie below a concave-down curve.", explanation: "The straight tops sit below the curve, so it underestimates." },
  { id: "fint-trap-p17", prompt: "Use the trapezoidal rule to approximate the area from the table.", latex: "\\begin{array}{c|ccccc}x&0&1&2&3&4\\\\ y&1&2&5&10&17\\end{array}", answer: "26", difficulty: 4, acceptedAnswers: ["26.0"], hint: "$h=1$; double the three interior values.", explanation: "$\\frac12(1+2(2)+2(5)+2(10)+17)=\\frac12(52)=26$." },
  { id: "fint-trap-p18", prompt: "A student claims the trapezoidal rule gives the exact area under every curve. Which option identifies the issue?", latex: "\\text{numerical integration}", answer: "D", difficulty: 4, choices: [{ label: "A", text: "It cannot use tables" }, { label: "B", text: "It only works for negative functions" }, { label: "C", text: "It must use radians" }, { label: "D", text: "It is usually only an approximation for curved graphs" }], hint: "When is it exact?", explanation: "It is exact only for straight-line data; curved graphs are approximated." },
  { id: "fint-trap-p19", prompt: "Use the trapezoidal rule with two subintervals.", latex: "\\begin{array}{c|ccc}x&1&3&5\\\\ y&2&8&18\\end{array}", answer: "36", difficulty: 4, acceptedAnswers: ["36.0"], hint: "$h=2$; double $y_1=8$.", explanation: "$\\frac22(2+2(8)+18)=1\\times36=36$." },
  { id: "fint-trap-p20", prompt: "Use the trapezoidal rule with three subintervals.", latex: "\\begin{array}{c|cccc}x&0&2&4&6\\\\ y&5&9&11&14\\end{array}", answer: "59", difficulty: 5, acceptedAnswers: ["59.0"], hint: "$h=2$; double the two interior values.", explanation: "$\\frac22(5+2(9)+2(11)+14)=1\\times(5+18+22+14)=59$." },
  { id: "fint-trap-p21", prompt: "Use the trapezoidal rule to approximate the integral with two subintervals. Use $f(x)=\\frac1x$ with $f(1)=1$, $f(1.5)\\approx0.667$, $f(2)=0.5$.", latex: "\\int_1^2 \\frac1x\\,dx,\\ n=2", answer: "0.708", difficulty: 5, acceptedAnswers: ["0.71", "0.7083"], hint: "$h=0.5$; double the interior value.", explanation: "$\\frac{0.5}{2}(1+2(0.667)+0.5)=0.25(2.834)\\approx0.708$." },
  { id: "fint-trap-p22", prompt: "A concave-up curve is approximated using two trapezoids and then four trapezoids. Which statement is most reasonable?", latex: "\\text{same interval, more subintervals}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "The four-trapezoid result must be exact" }, { label: "B", text: "The estimate must become negative" }, { label: "C", text: "The four-trapezoid estimate usually improves and $h$ becomes smaller" }, { label: "D", text: "The width $h$ becomes larger" }], hint: "More strips, smaller $h$.", explanation: "More subintervals make $h$ smaller and the segments follow the curve more closely." },
  { id: "fint-trap-p23", prompt: "The trapezoidal estimate of $\\int_0^2 x^2\\,dx$ with two strips is $3$, but the exact value is $\\frac83\\approx2.667$. This is consistent with which fact?", latex: "y=x^2\\ \\text{is concave up}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "Concave-up curves are overestimated by the trapezoidal rule" }, { label: "B", text: "The rule always underestimates" }, { label: "C", text: "The exact value is wrong" }, { label: "D", text: "More strips give a larger estimate" }], hint: "Compare $3$ with $2.667$.", explanation: "The estimate $3>2.667$, matching the overestimate expected for a concave-up graph." },
  { id: "fint-trap-p24", prompt: "Use the trapezoidal rule to approximate the area from the table.", latex: "\\begin{array}{c|cccc}x&2&4&6&8\\\\ y&3&5&4&6\\end{array}", answer: "27", difficulty: 4, acceptedAnswers: ["27.0"], hint: "$h=2$; double the two interior values.", explanation: "$\\frac22(3+2(5)+2(4)+6)=1\\times(3+10+8+6)=27$." },
  { id: "fint-trap-p25", prompt: "Use one trapezoid to approximate the integral.", latex: "\\int_0^4 \\sqrt{x}\\,dx", answer: "4", difficulty: 3, acceptedAnswers: ["4.0"], hint: "Endpoints $\\sqrt0=0$ and $\\sqrt4=2$; $h=4$.", explanation: "$\\frac42(0+2)=2\\times2=4$." },
  { id: "fint-trap-p26", prompt: "Forgetting which factor is the most common slip in the composite trapezoidal rule?", latex: "\\frac h2[\\ldots]", answer: "B", difficulty: 2, choices: [{ label: "A", text: "the endpoints" }, { label: "B", text: "the factor $\\frac h2$ in front" }, { label: "C", text: "the $x$-values" }, { label: "D", text: "the limits" }], hint: "Look at the leading multiplier.", explanation: "Students often omit the $\\frac h2$ multiplier on the bracket." },
  { id: "fint-trap-p27", prompt: "Use the trapezoidal rule to approximate the integral from the table.", latex: "\\begin{array}{c|ccccc}x&0&1&2&3&4\\\\ y&6&4&3&4&6\\end{array}", answer: "16", difficulty: 5, acceptedAnswers: ["16.0"], hint: "$h=1$; double $y_1,y_2,y_3$.", explanation: "$\\frac12(6+2(4)+2(3)+2(4)+6)=\\frac12(32)=16$." },
  { id: "fint-trap-p28", prompt: "Use two subintervals to approximate the integral.", latex: "\\int_0^4 x^2\\,dx", answer: "24", difficulty: 4, acceptedAnswers: ["24.0"], hint: "$h=2$; $y_0=0$, $y_1=4$, $y_2=16$.", explanation: "$\\frac22(0+2(4)+16)=1\\times24=24$." },
];

trapezoidalRuleLesson.multiPartPractice = [
  {
    id: "fint-trap-mp1",
    prompt:
      "A car's speed $v$ (in m/s) is recorded every 2 seconds, giving the table $\\begin{array}{c|ccc}t&0&2&4\\\\ v&0&6&10\\end{array}$. The distance travelled equals $\\int_0^4 v\\,dt$.",
    latex: "\\begin{array}{c|ccc}t&0&2&4\\\\ v&0&6&10\\end{array}",
    answer: "2",
    hint: "Find h, apply the trapezoidal rule, then relate the estimate to distance.",
    explanation:
      "(a) $h=\\frac{4-0}{2}=2$. (b) $\\int_0^4 v\\,dt\\approx\\frac{2}{2}(0+2(6)+10)=1\\times22=22$ metres. (c) Since the speed is increasing and (for this data) the underlying curve is concave down on $[2,4]$, the linear trapezoid tops can sit below the curve; the rule may underestimate. The numeric estimate of distance is $22$ m.",
    parts: [
      { key: "a", label: "(a)", prompt: "State the value of the subinterval width $h$.", latex: "h=\\frac{b-a}{n}", marks: 1, answer: "2", acceptedAnswers: ["2.0"], hint: "Two strips from $0$ to $4$.", explanation: "$h=\\frac{4-0}{2}=2$." },
      { key: "b", label: "(b)", prompt: "Use the trapezoidal rule to estimate the distance $\\int_0^4 v\\,dt$ in metres.", latex: "\\frac h2(v_0+2v_1+v_2)", marks: 2, answer: "22", acceptedAnswers: ["22.0"], hint: "Double the interior value $v_1=6$.", explanation: "$\\frac22(0+2(6)+10)=1\\times22=22$ m." },
      { key: "c", label: "(c)", prompt: "If a second estimate uses four strips of width $1$ instead of two strips of width $2$, the new $h$ equals what value?", latex: "n=4\\text{ on }0\\le t\\le4", marks: 2, answer: "1", acceptedAnswers: ["1.0"], hint: "$h=\\frac{4}{4}$.", explanation: "$h=\\frac{4-0}{4}=1$; more strips give a smaller width and usually a closer estimate." },
    ],
  },
];

furtherIntegralCalculusExamPracticeLesson.masteryQuizPool = [
  { id: "fint-exam-p1", prompt: "Choose the correct antiderivative.", latex: "\\int \\cos x\\,dx", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$-\\sin x+C$" }, { label: "B", text: "$\\sin x+C$" }, { label: "C", text: "$\\cos x+C$" }, { label: "D", text: "$-\\cos x+C$" }], hint: "Cosine integrates to sine.", explanation: "$\\int\\cos x\\,dx=\\sin x+C$." },
  { id: "fint-exam-p2", prompt: "Choose the correct antiderivative.", latex: "\\int e^{3x}\\,dx", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac13e^{3x}+C$" }, { label: "B", text: "$3e^{3x}+C$" }, { label: "C", text: "$e^{3x}+C$" }, { label: "D", text: "$e^x+C$" }], hint: "Divide by the inner derivative $3$.", explanation: "$\\int e^{3x}\\,dx=\\frac13e^{3x}+C$." },
  { id: "fint-exam-p3", prompt: "Evaluate the definite integral.", latex: "\\int_0^\\pi \\sin x\\,dx", answer: "2", difficulty: 1, acceptedAnswers: ["2.0"], hint: "Antiderivative is $-\\cos x$.", explanation: "$[-\\cos x]_0^\\pi=1+1=2$." },
  { id: "fint-exam-p4", prompt: "Choose the area setup.", latex: "y=3,\\quad y=x,\\quad 0\\le x\\le2", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$\\int_0^2(x-3)\\,dx$" }, { label: "B", text: "$\\int_0^3(2-x)\\,dx$" }, { label: "C", text: "$\\int_0^2(3-x)\\,dx$" }, { label: "D", text: "$3-2$" }], hint: "Top minus bottom.", explanation: "$y=3$ is above $y=x$ on $[0,2]$." },
  { id: "fint-exam-p5", prompt: "Choose the correct antiderivative.", latex: "\\int \\left(e^x+\\frac1x\\right)\\,dx", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$e^x+\\frac{x^2}{2}+C$" }, { label: "B", text: "$xe^x+\\ln|x|+C$" }, { label: "C", text: "$e^x+\\frac1x+C$" }, { label: "D", text: "$e^x+\\ln|x|+C$" }], hint: "Exponential and reciprocal forms.", explanation: "$\\int e^x\\,dx=e^x$ and $\\int\\frac1x\\,dx=\\ln|x|$." },
  { id: "fint-exam-p6", prompt: "Choose the correct antiderivative.", latex: "\\int \\sin(4x)\\,dx", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\frac14\\cos(4x)+C$" }, { label: "B", text: "$-\\frac14\\cos(4x)+C$" }, { label: "C", text: "$-4\\cos(4x)+C$" }, { label: "D", text: "$\\sin(4x)+C$" }], hint: "Sine to negative cosine; divide by $4$.", explanation: "$\\int\\sin(4x)\\,dx=-\\frac14\\cos(4x)+C$." },
  { id: "fint-exam-p7", prompt: "Choose the exact value.", latex: "\\int_0^1 e^x\\,dx", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$e-1$" }, { label: "B", text: "$e$" }, { label: "C", text: "$1-e$" }, { label: "D", text: "$1$" }], hint: "Antiderivative is $e^x$.", explanation: "$[e^x]_0^1=e-1$." },
  { id: "fint-exam-p8", prompt: "Choose the correct setup between intersections.", latex: "y=x,\\quad y=x^2", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\int_0^1(x^2-x)\\,dx$" }, { label: "B", text: "$\\int_{-1}^1(x-x^2)\\,dx$" }, { label: "C", text: "$\\int_0^1(x-x^2)\\,dx$" }, { label: "D", text: "$\\int_0^1(x+x^2)\\,dx$" }], hint: "On $(0,1)$, $x>x^2$.", explanation: "Intersections at $x=0,1$; top minus bottom is $x-x^2$." },
  { id: "fint-exam-p9", prompt: "Choose the correct antiderivative.", latex: "\\int (2e^x+\\cos x)\\,dx", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$2e^x+\\sin x+C$" }, { label: "B", text: "$2e^x-\\sin x+C$" }, { label: "C", text: "$2xe^x+\\sin x+C$" }, { label: "D", text: "$e^{2x}+\\sin x+C$" }], hint: "Integrate term by term.", explanation: "$\\int 2e^x\\,dx=2e^x$ and $\\int\\cos x\\,dx=\\sin x$." },
  { id: "fint-exam-p10", prompt: "Choose the correct antiderivative.", latex: "\\int e^{2x-1}\\,dx", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$e^{2x-1}+C$" }, { label: "B", text: "$\\frac12e^{2x-1}+C$" }, { label: "C", text: "$2e^{2x-1}+C$" }, { label: "D", text: "$e^{x-1}+C$" }], hint: "Inner derivative is $2$.", explanation: "$\\int e^{2x-1}\\,dx=\\frac12e^{2x-1}+C$." },
  { id: "fint-exam-p11", prompt: "Choose the correct antiderivative.", latex: "\\int \\cos(5x)\\,dx", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$5\\sin(5x)+C$" }, { label: "B", text: "$-\\frac15\\sin(5x)+C$" }, { label: "C", text: "$\\frac15\\sin(5x)+C$" }, { label: "D", text: "$\\cos(5x)+C$" }], hint: "Cosine to sine; divide by $5$.", explanation: "$\\int\\cos(5x)\\,dx=\\frac15\\sin(5x)+C$." },
  { id: "fint-exam-p12", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/2}(\\sin x+\\cos x)\\,dx", answer: "2", difficulty: 3, acceptedAnswers: ["2.0"], hint: "Antiderivative is $-\\cos x+\\sin x$.", explanation: "$[-\\cos x+\\sin x]_0^{\\pi/2}=(0+1)-(-1+0)=2$." },
  { id: "fint-exam-p13", prompt: "Choose the exact value.", latex: "\\int_1^{e^3}\\frac1x\\,dx", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$e^3-1$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\ln3$" }, { label: "D", text: "$3$" }], hint: "$\\ln(e^3)=3$.", explanation: "$[\\ln x]_1^{e^3}=3$." },
  { id: "fint-exam-p14", prompt: "Which setup gives the area between the curves?", latex: "y=2x,\\quad y=x^2", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\int_0^2(x^2-2x)\\,dx$" }, { label: "B", text: "$\\int_0^2(2x-x^2)\\,dx$" }, { label: "C", text: "$\\int_{-2}^2(2x-x^2)\\,dx$" }, { label: "D", text: "$\\int_0^2(2x+x^2)\\,dx$" }], hint: "Intersections $0,2$; $2x$ on top.", explanation: "Top minus bottom is $2x-x^2$ on $[0,2]$." },
  { id: "fint-exam-p15", prompt: "Find the area between the horizontal lines.", latex: "y=7,\\quad y=3,\\quad 0\\le x\\le4", answer: "16", difficulty: 3, acceptedAnswers: ["16.0"], hint: "Gap $4$, width $4$.", explanation: "$\\int_0^4(7-3)\\,dx=16$." },
  { id: "fint-exam-p16", prompt: "A student writes $\\int \\sin(2x)\\,dx=-\\cos(2x)+C$. Which issue is present?", latex: "\\int \\sin(2x)\\,dx", answer: "C", difficulty: 4, choices: [{ label: "A", text: "The sign is wrong" }, { label: "B", text: "The logarithm is missing" }, { label: "C", text: "The inner-derivative factor $\\frac12$ is missing" }, { label: "D", text: "The answer should be definite" }], hint: "Differentiate $-\\cos(2x)$.", explanation: "$\\frac{d}{dx}[-\\cos(2x)]=2\\sin(2x)$, so the answer is $-\\frac12\\cos(2x)+C$." },
  { id: "fint-exam-p17", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{2}{x}\\,dx", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$\\frac{2}{x^2}+C$" }, { label: "B", text: "$2x^{-2}+C$" }, { label: "C", text: "$\\ln|2x|+C$" }, { label: "D", text: "$2\\ln|x|+C$" }], hint: "Constant multiple of the log form.", explanation: "$\\int\\frac2x\\,dx=2\\ln|x|+C$." },
  { id: "fint-exam-p18", prompt: "Evaluate the definite integral. Give the exact value.", latex: "\\int_0^{\\pi/4}\\cos(2x)\\,dx", answer: "1/2", difficulty: 4, acceptedAnswers: ["0.5", "0.50"], hint: "Antiderivative is $\\frac12\\sin(2x)$.", explanation: "$\\left[\\frac12\\sin(2x)\\right]_0^{\\pi/4}=\\frac12-0=\\frac12$." },
  { id: "fint-exam-p19", prompt: "Find the area enclosed between the curves.", latex: "y=2x,\\quad y=x^2", answer: "4/3", difficulty: 4, acceptedAnswers: ["1.33", "1.333"], hint: "Intersections $x=0,2$; integrate $2x-x^2$.", explanation: "$\\int_0^2(2x-x^2)\\,dx=4-\\frac83=\\frac43$." },
  { id: "fint-exam-p20", prompt: "A curve crosses the x-axis inside the interval and the total area is requested. Which approach is best?", latex: "\\text{total area}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "Split at the crossing and add positive areas" }, { label: "B", text: "Use one signed integral only" }, { label: "C", text: "Add $+C$" }, { label: "D", text: "Use lower minus upper" }], hint: "Avoid cancellation.", explanation: "Splitting prevents positive and negative regions from cancelling." },
  { id: "fint-exam-p21", prompt: "Which standard form is required first?", latex: "\\int \\frac{6x}{3x^2+1}\\,dx", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$\\int e^{ax}\\,dx$" }, { label: "B", text: "$\\int \\frac{f'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$" }, { label: "C", text: "reverse power rule" }, { label: "D", text: "trapezoidal rule" }], hint: "Is the numerator the derivative of the denominator?", explanation: "$\\frac{d}{dx}(3x^2+1)=6x$, the numerator, so the log form applies." },
  { id: "fint-exam-p22", prompt: "Choose the correct antiderivative.", latex: "\\int \\frac{6x}{3x^2+1}\\,dx", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\ln|3x^2+1|+C$" }, { label: "B", text: "$\\frac16\\ln|3x^2+1|+C$" }, { label: "C", text: "$6\\ln|3x^2+1|+C$" }, { label: "D", text: "$\\frac{1}{3x^2+1}+C$" }], hint: "Numerator equals the derivative of the denominator.", explanation: "$\\int\\frac{f'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$ with $f(x)=3x^2+1$." },
  { id: "fint-exam-p23", prompt: "Evaluate the definite integral. Use $e^2\\approx7.389$; give 3 d.p.", latex: "\\int_0^1 e^{2x}\\,dx", answer: "3.195", difficulty: 5, acceptedAnswers: ["(e^2-1)/2", "3.19"], hint: "Antiderivative is $\\frac12e^{2x}$.", explanation: "$\\left[\\frac12e^{2x}\\right]_0^1=\\frac12(e^2-1)\\approx3.195$." },
  { id: "fint-exam-p24", prompt: "Find the total geometric area between $y=\\sin x$ and the x-axis.", latex: "y=\\sin x,\\quad 0\\le x\\le2\\pi", answer: "4", difficulty: 5, acceptedAnswers: ["4.0"], hint: "Area on $[0,\\pi]$ is $2$; by symmetry the area on $[\\pi,2\\pi]$ is also $2$.", explanation: "$\\int_0^\\pi\\sin x\\,dx=2$ and the region on $[\\pi,2\\pi]$ has magnitude $2$, so total area $=2+2=4$." },
  { id: "fint-exam-p25", prompt: "Find the area enclosed between the line and the parabola.", latex: "y=x+2,\\quad y=x^2", answer: "9/2", difficulty: 5, acceptedAnswers: ["4.5", "4.50"], hint: "Solve $x^2=x+2$; the line is on top.", explanation: "Intersections $x=-1,2$. $\\int_{-1}^2(x+2-x^2)\\,dx=\\frac92$." },
  { id: "fint-exam-p26", prompt: "Use the trapezoidal rule to approximate the integral from the table.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ y&1&4&9&16\\end{array}", answer: "21.5", difficulty: 4, acceptedAnswers: ["21.50"], hint: "$h=1$; double the two interior values.", explanation: "$\\frac12(1+2(4)+2(9)+16)=\\frac12(1+8+18+16)=\\frac12(43)=21.5$." },
  { id: "fint-exam-p27", prompt: "Which issue is shown?", latex: "\\int \\frac1x\\,dx=\\frac{x^0}{0}+C", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The sign is wrong" }, { label: "B", text: "The reverse power rule does not apply to $x^{-1}$" }, { label: "C", text: "The limit order is wrong" }, { label: "D", text: "This is an area-between-curves question" }], hint: "The new power would be $0$.", explanation: "$\\int x^{-1}\\,dx=\\ln|x|+C$, the exception to the power rule." },
  { id: "fint-exam-p28", prompt: "Choose the correct antiderivative.", latex: "\\int \\left(3\\sec^2 x-2e^x\\right)\\,dx", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$3\\tan x-2e^x+C$" }, { label: "B", text: "$3\\sec x-2e^x+C$" }, { label: "C", text: "$3\\tan x-e^{2x}+C$" }, { label: "D", text: "$3\\tan x+2e^x+C$" }], hint: "$\\sec^2 x$ integrates to $\\tan x$.", explanation: "$\\int 3\\sec^2 x\\,dx=3\\tan x$ and $\\int(-2e^x)\\,dx=-2e^x$." },
];

furtherIntegralCalculusExamPracticeLesson.multiPartPractice = [
  {
    id: "fint-exam-mp1",
    prompt:
      "A mixed integration task combines a standard form, a reverse-chain form and an area calculation. Work through the parts in order.",
    latex: "\\int e^{2x}\\,dx,\\quad \\int_0^\\pi \\sin x\\,dx,\\quad y=4x,\\ y=x^2",
    answer: "1/2",
    hint: "Identify the right form for each part: a reverse-chain coefficient, a definite trig integral, then an enclosed area.",
    explanation:
      "(a) $\\int e^{2x}\\,dx=\\frac12e^{2x}+C$, so the coefficient is $\\frac12$. (b) $\\int_0^\\pi\\sin x\\,dx=[-\\cos x]_0^\\pi=2$. (c) $y=4x$ and $y=x^2$ meet at $x=0,4$ with $4x$ on top: $\\int_0^4(4x-x^2)\\,dx=[2x^2-\\frac{x^3}{3}]_0^4=32-\\frac{64}{3}=\\frac{32}{3}$.",
    parts: [
      { key: "a", label: "(a)", prompt: "When $\\int e^{2x}\\,dx$ is written as $k\\,e^{2x}+C$, state the value of $k$.", latex: "k\\,e^{2x}+C", marks: 1, answer: "1/2", acceptedAnswers: ["0.5", "0.50"], hint: "Divide by the inner derivative $2$.", explanation: "$\\int e^{2x}\\,dx=\\frac12e^{2x}+C$, so $k=\\frac12$." },
      { key: "b", label: "(b)", prompt: "Evaluate $\\int_0^\\pi \\sin x\\,dx$.", latex: "\\int_0^\\pi \\sin x\\,dx", marks: 2, answer: "2", acceptedAnswers: ["2.0"], hint: "Antiderivative is $-\\cos x$.", explanation: "$[-\\cos x]_0^\\pi=1+1=2$." },
      { key: "c", label: "(c)", prompt: "Find the exact area enclosed between $y=4x$ and $y=x^2$.", latex: "\\int_0^4(4x-x^2)\\,dx", marks: 3, answer: "32/3", acceptedAnswers: ["10.67", "10.667"], hint: "Intersections at $x=0,4$; $4x$ is on top.", explanation: "$[2x^2-\\frac{x^3}{3}]_0^4=32-\\frac{64}{3}=\\frac{32}{3}$." },
    ],
  },
];

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
