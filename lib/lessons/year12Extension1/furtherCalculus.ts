import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function fcalcChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Identify the correct integration form or method before selecting an option.",
    explanation,
  };
}

function fcalcTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Write the exact antiderivative or evaluated integral requested.",
    explanation,
  };
}

function furtherCalculusLesson(
  id: string,
  title: string,
  description: string,
  learningIntention: string,
  successCriteria: string[],
  teaching: ExplicitLesson["teaching"],
  workedExamples: ExplicitLesson["workedExamples"],
  guidedPractice: PracticeQuestion[],
  independentPractice: PracticeQuestion[],
  commonMistakes: ExplicitLesson["commonMistakes"],
  masteryQuiz: PracticeQuestion[]
): ExplicitLesson {
  return {
    id,
    slug: id,
    moduleSlug: "further-calculus",
    moduleTitle: "Further Calculus Skills",
    courseTitle: "Year 12 Mathematics Extension 1",
    title,
    description,
    syllabusArea: "Calculus",
    focus: "Further calculus skills",
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

const trigIntegrals: Partial<ExplicitLesson> = {
  description:
    "Learn the standard antiderivatives for sine, cosine and tangent-related functions, and evaluate basic definite trig integrals.",
  learningIntention:
    "Recognise standard trig integrals and choose the correct antiderivative with the right sign.",
  successCriteria: [
    "Recall the antiderivatives of sin x and cos x.",
    "Recognise the integrals of sec^2 x and sec x tan x.",
    "Evaluate simple definite trig integrals using standard antiderivatives.",
    "Keep the sign correct when integrating sine and cosine.",
  ],
  teaching: {
    paragraphs: [
      "Standard trig integration uses familiar antiderivatives rather than the power rule.",
      "Integrating sine gives negative cosine, while integrating cosine gives positive sine. That sign change is a frequent exam trap.",
      "Some trig derivatives are especially helpful in reverse: the derivative of tan x is sec^2 x, and the derivative of sec x is sec x tan x.",
      "For definite integrals, find the antiderivative first and then subtract the lower value from the upper value.",
    ],
    latexBlocks: [
      "\\int \\sin x\\,dx=-\\cos x+C",
      "\\int \\cos x\\,dx=\\sin x+C",
      "\\int \\sec^2 x\\,dx=\\tan x+C",
      "\\int \\sec x\\tan x\\,dx=\\sec x+C",
    ],
  },
  workedExamples: [
    {
      title: "Integrate sine and cosine terms",
      questionLatex: "\\int (\\sin x-2\\cos x)\\,dx",
      steps: [
        { explanation: "Integrate sin x as negative cosine.", latex: "\\int \\sin x\\,dx=-\\cos x" },
        {
          explanation: "Integrate -2 cos x as -2 sin x.",
          latex: "\\int -2\\cos x\\,dx=-2\\sin x",
        },
        { explanation: "Add the constant of integration.", latex: "-\\cos x-2\\sin x+C" },
      ],
      finalAnswerLatex: "-\\cos x-2\\sin x+C",
    },
    {
      title: "Integrate sec^2 x",
      questionLatex: "\\int \\sec^2 x\\,dx",
      steps: [
        { explanation: "Recognise the derivative of tan x is sec^2 x.", latex: "\\frac{d}{dx}(\\tan x)=\\sec^2 x" },
        { explanation: "So the integral is tan x plus C.", latex: "\\tan x+C" },
      ],
      finalAnswerLatex: "\\tan x+C",
    },
    {
      title: "Definite cosine integral",
      questionLatex: "\\int_0^{\\pi/4}\\cos x\\,dx",
      steps: [
        { explanation: "Use sin x as the antiderivative of cos x.", latex: "\\int \\cos x\\,dx=\\sin x" },
        {
          explanation: "Evaluate at the upper and lower limits.",
          latex: "\\sin\\frac{\\pi}{4}-\\sin0=\\frac{\\sqrt2}{2}-0",
        },
      ],
      finalAnswerLatex: "\\frac{\\sqrt2}{2}",
    },
  ],
  guidedPractice: [
    fcalcChoice(
      "y12e1-fcalc-trig-g1",
      "Choose the correct antiderivative.",
      "B",
      [
        "$\\sin x+C$",
        "$-\\cos x+C$",
        "$\\cos x+C$",
        "$-\\sin x+C$",
      ],
      "The derivative of -cos x is sin x, so -cos x is the antiderivative of sin x."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-g2",
      "Choose the correct antiderivative.",
      "C",
      [
        "$\\sin x+C$",
        "$-\\sin x+C$",
        "$\\tan x+C$",
        "$\\sec x+C$",
      ],
      "The derivative of tan x is sec^2 x, not sec x tan x."
    ),
    fcalcTyped(
      "y12e1-fcalc-trig-g3",
      "Evaluate the definite integral.",
      "\\int_0^{\\pi/2}\\cos x\\,dx",
      "1",
      ["1.0"],
      "The antiderivative of cos x is sin x, and sin(pi/2)-sin(0)=1."
    ),
    fcalcTyped(
      "y12e1-fcalc-trig-g4",
      "Find the antiderivative.",
      "\\int \\sec x\\tan x\\,dx",
      "\\sec x + C",
      ["sec x+C", "sec x + C"],
      "The derivative of sec x is sec x tan x, so its antiderivative is sec x + C."
    ),
  ],
  independentPractice: [
    fcalcTyped(
      "y12e1-fcalc-trig-i1",
      "Find the antiderivative.",
      "\\int \\sin x\\,dx",
      "-\\cos x + C",
      ["-\\cos x+C", "-\\cos x + C"],
      "Integrate sin x to get -cos x plus the constant."
    ),
    fcalcTyped(
      "y12e1-fcalc-trig-i2",
      "Evaluate the definite integral.",
      "\\int_{0}^{\\pi/4} \\sec^2 x\\,dx",
      "1",
      ["1.0"],
      "The antiderivative of sec^2 x is tan x, and tan(\\pi/4) - tan(0) = 1."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-i3",
      "Which sign is correct for the integral of sin x?",
      "D",
      [
        "$\\sin x+C$",
        "$\\cos x+C$",
        "$\\tan x+C$",
        "$-\\cos x+C$",
      ],
      "The integral of sin x is -cos x + C because the derivative of cos x is -sin x."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-i4",
      "Which antiderivative matches sec^2 x?",
      "A",
      ["$\\tan x+C$", "$\\sec x+C$", "$\\sin x+C$", "$-\\cos x+C$"],
      "Tan x differentiates to sec^2 x."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-i5",
      "Which antiderivative matches sec x tan x?",
      "B",
      ["$\\tan x+C$", "$\\sec x+C$", "$\\cos x+C$", "$-\\sin x+C$"],
      "Sec x differentiates to sec x tan x."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Integrating sin x as cos x.",
      fix: "Use -cos x + C because the derivative of cos x is -sin x.",
    },
    {
      mistake: "Confusing the antiderivatives of sec^2 x and sec x tan x.",
      fix: "Remember sec^2 x integrates to tan x and sec x tan x integrates to sec x.",
    },
    {
      mistake: "Forgetting to subtract the lower limit in a definite integral.",
      fix: "Evaluate the antiderivative at both limits and compute upper minus lower.",
    },
    {
      mistake: "Leaving out the constant C for indefinite integrals.",
      fix: "Add +C unless the integral is definite."
    },
  ],
  masteryQuiz: [
    fcalcTyped(
      "y12e1-fcalc-trig-m1",
      "Find the antiderivative.",
      "\\int \\cos x\\,dx",
      "\\sin x + C",
      ["\\sin x+C", "\\sin x + C"],
      "The integral of cos x is sin x plus the constant."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-m2",
      "Choose the correct antiderivative.",
      "D",
      ["$\\sin x+C$", "$\\cos x+C$", "$-\\sin x+C$", "$-\\cos x+C$"],
      "The integral of sin x has the opposite sign to the derivative of cos x."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-m3",
      "Choose the correct antiderivative.",
      "A",
      ["$\\tan x+C$", "$\\sec x+C$", "$\\cos x+C$", "$-\\sin x+C$"],
      "Sec^2 x integrates to tan x."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-m4",
      "Choose the correct antiderivative.",
      "B",
      ["$\\sin x+C$", "$\\sec x+C$", "$\\tan x+C$", "$\\cos x+C$"],
      "Sec x tan x integrates to sec x."
    ),
    fcalcTyped(
      "y12e1-fcalc-trig-m5",
      "Evaluate the definite integral.",
      "\\int_0^{\\pi/2} \\sin x\\,dx",
      "1",
      ["1.0"],
      "The antiderivative of sin x is -cos x, and -cos(pi/2)-(-cos0)=1."
    ),
    fcalcTyped(
      "y12e1-fcalc-trig-m6",
      "Find the antiderivative.",
      "\\int \\sec^2 x\\,dx",
      "\\tan x + C",
      ["\\tan x+C", "\\tan x + C"],
      "The derivative of tan x is sec^2 x, so the antiderivative is tan x plus C."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-m7",
      "Which definite integral equals 1?",
      "C",
      ["\\int_0^{\\pi/4} \\cos x\\,dx", "\\int_0^{\\pi/4} \\sin x\\,dx", "\\int_0^{\\pi/2} \\cos x\\,dx", "\\int_0^{\\pi/2} \\sin x\\,dx"],
      "The integral of cos x from 0 to pi/2 is 1."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-m8",
      "Which expression is an antiderivative of sec x tan x?",
      "B",
      ["$\\tan x+C$", "$\\sec x+C$", "$\\sin x+C$", "$\\cos x+C$"],
      "The derivative of sec x is sec x tan x."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-m9",
      "Which is the correct antiderivative of sin x?",
      "D",
      ["$\\cos x+C$", "$\\tan x+C$", "$-\\sin x+C$", "$-\\cos x+C$"],
      "Use -cos x + C for the integral of sin x."
    ),
    fcalcChoice(
      "y12e1-fcalc-trig-m10",
      "Which integral is best solved by a standard trig antiderivative?",
      "A",
      ["$\\int \\cos x\\,dx$", "$\\int x\\cos x\\,dx$", "$\\int 1/(2x+1)\\,dx$", "$\\int \\sin x \\cos x\\,dx$"],
      "The first is a standard trig integral, while the others require substitution or parts."
    ),
  ],
  masteryPassMark: 0.8,
};

const substitutionIntegrals: Partial<ExplicitLesson> = {
  description:
    "Use simple substitution patterns to integrate linear expressions inside trig, exponential and reciprocal functions.",
  learningIntention:
    "Recognise when a linear inner function requires a scaling factor in the antiderivative.",
  successCriteria: [
    "Apply the reverse chain rule for cos(ax+b) and sin(ax+b).",
    "Integrate e^{ax+b} with the correct factor of 1/a.",
    "Integrate 1/(ax+b) using a logarithmic antiderivative.",
    "Keep track of the inner derivative when the inside is a linear expression.",
  ],
  teaching: {
    paragraphs: [
      "A simple substitution integral has a linear inner function like ax+b. The antiderivative needs a factor of one over the constant a.",
      "For exponential and reciprocal forms, the inner derivative appears as a constant multiplier in each antiderivative.",
      "For trigonometric forms, the sign and inner derivative both matter: cos(ax+b) gives sin(ax+b) divided by a, while sin(ax+b) gives -cos(ax+b) divided by a.",
      "Recognise the pattern before integrating; do not treat ax+b as a simple power expression."
    ],
    latexBlocks: [
      "\\int e^{ax+b}\\,dx=\\frac{1}{a}e^{ax+b}+C",
      "\\int \\frac{1}{ax+b}\\,dx=\\frac{1}{a}\\ln|ax+b|+C",
      "\\int \\cos(ax+b)\\,dx=\\frac{1}{a}\\sin(ax+b)+C",
      "\\int \\sin(ax+b)\\,dx=-\\frac{1}{a}\\cos(ax+b)+C",
    ],
  },
  workedExamples: [
    {
      title: "Integrate a cosine with a linear inner function",
      questionLatex: "\\int \\cos(3x+1)\\,dx",
      steps: [
        {
          explanation: "The inner derivative of 3x+1 is 3, so divide by 3.",
          latex: "\\frac{1}{3}\\sin(3x+1)+C",
        },
      ],
      finalAnswerLatex: "\\frac{1}{3}\\sin(3x+1)+C",
    },
    {
      title: "Integrate an exponential with a linear inner function",
      questionLatex: "\\int e^{2x-3}\\,dx",
      steps: [
        {
          explanation: "The inner derivative of 2x-3 is 2, so divide by 2.",
          latex: "\\frac12 e^{2x-3}+C",
        },
      ],
      finalAnswerLatex: "\\frac12 e^{2x-3}+C",
    },
    {
      title: "Integrate a reciprocal with a linear inner function",
      questionLatex: "\\int \\frac{1}{4x+5}\\,dx",
      steps: [
        {
          explanation: "The inner derivative of 4x+5 is 4, so use 1/4 in front of ln.",
          latex: "\\frac14 \\ln|4x+5|+C",
        },
      ],
      finalAnswerLatex: "\\frac14 \\ln|4x+5|+C",
    },
  ],
  guidedPractice: [
    fcalcTyped(
      "y12e1-fcalc-sub-g1",
      "Find the antiderivative.",
      "\\int \\cos(4x)\\,dx",
      "\\frac14\\sin(4x)+C",
      ["1/4\\sin(4x)+C", "0.25\\sin(4x)+C"],
      "Divide by the inner derivative 4 when integrating cos(4x)."
    ),
    fcalcTyped(
      "y12e1-fcalc-sub-g2",
      "Find the antiderivative.",
      "\\int e^{3x}\\,dx",
      "\\frac13 e^{3x}+C",
      ["1/3 e^{3x}+C", "0.3333 e^{3x}+C"],
      "Divide by the inner derivative 3 for the exponential term."
    ),
    fcalcTyped(
      "y12e1-fcalc-sub-g3",
      "Find the antiderivative.",
      "\\int \\frac{1}{2x-1}\\,dx",
      "\\frac12\\ln|2x-1|+C",
      ["0.5\\ln|2x-1|+C"],
      "The inner derivative is 2, so use 1/2 in front of the logarithm."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-g4",
      "What is the best first step for integrating e^{5x+2}?",
      "A",
      [
        "Divide by 5 after integrating e^{5x+2}",
        "Treat the exponent as a power of x",
        "Use integration by parts",
        "Replace x with sin x",
      ],
      "The correct pattern is a linear exponential, so divide by the inner derivative 5."
    ),
  ],
  independentPractice: [
    fcalcTyped(
      "y12e1-fcalc-sub-i1",
      "Find the antiderivative.",
      "\\int \\sin(2x)\\,dx",
      "-\\frac12\\cos(2x)+C",
      ["-1/2\\cos(2x)+C"],
      "The antiderivative of sin(2x) is -cos(2x) divided by 2."
    ),
    fcalcTyped(
      "y12e1-fcalc-sub-i2",
      "Find the antiderivative.",
      "\\int \\frac{1}{3x+1}\\,dx",
      "\\frac13\\ln|3x+1|+C",
      ["1/3\\ln|3x+1|+C"],
      "Divide by the inner derivative 3 for the logarithmic result."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-i3",
      "Which integral uses a 1/a factor?",
      "D",
      [
        "\\int x^2\\,dx",
        "\\int \\sin x\\,dx",
        "\\int \\ln x\\,dx",
        "\\int e^{4x}\\,dx",
      ],
      "A linear exponential requires dividing by the inner constant a."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-i4",
      "Which integral is not a simple linear substitution form?",
      "B",
      [
        "\\int \\cos(3x+2)\\,dx",
        "\\int x\\,dx",
        "\\int e^{2x-5}\\,dx",
        "\\int \\frac{1}{x+7}\\,dx",
      ],
      "x alone does not need a reverse chain rule factor."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-i5",
      "Which antiderivative is correct for sin(3x)?",
      "C",
      [
        "$-\\cos(3x)+C$",
        "$-\\frac13\\cos x + C$",
        "$-\\frac13\\cos(3x)+C$",
        "$\\frac13\\sin(3x)+C$",
      ],
      "Divide by the inner derivative 3 when integrating sin(3x)."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Ignoring the inner derivative when the inside is 3x+b.",
      fix: "Divide by the constant 3 in the antiderivative."
    },
    {
      mistake: "Using the power rule on e^{ax+b}.",
      fix: "Use the same exponential function with a factor of 1/a."
    },
    {
      mistake: "Treating 1/(ax+b) as a power rule case.",
      fix: "Use the logarithmic antiderivative 1/a ln|ax+b| + C."
    },
    {
      mistake: "Dropping the constant of integration for an indefinite integral.",
      fix: "Include +C unless the integral is definite."
    },
  ],
  masteryQuiz: [
    fcalcTyped(
      "y12e1-fcalc-sub-m1",
      "Find the antiderivative.",
      "\\int e^{4x}\\,dx",
      "\\frac14 e^{4x} + C",
      ["1/4 e^{4x}+C", "0.25 e^{4x}+C"],
      "Divide by 4 for the inner derivative."
    ),
    fcalcTyped(
      "y12e1-fcalc-sub-m2",
      "Find the antiderivative.",
      "\\int \\frac{1}{5x-2}\\,dx",
      "\\frac15\\ln|5x-2| + C",
      ["0.2\\ln|5x-2|+C"],
      "Use 1/5 times the logarithm for the linear inner function."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-m3",
      "Choose the correct antiderivative.",
      "A",
      [
        "$\\frac13\\sin(3x)+C$",
        "$\\sin(3x)+C$",
        "$-\\cos(3x)+C$",
        "$-\\frac13\\cos(3x)+C$",
      ],
      "The integral of cos(3x) is 1/3 sin(3x) + C."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-m4",
      "Choose the correct antiderivative.",
      "B",
      [
        "$\\frac{1}{2}\\ln|2x-5|+C$",
        "$\\frac{1}{2}e^{2x-5}+C$",
        "$\\ln|2x-5|+C$",
        "$-\\frac{1}{2}\\ln|2x-5|+C$",
      ],
      "For 1/(2x-5), use 1/2 ln|2x-5| + C."
    ),
    fcalcTyped(
      "y12e1-fcalc-sub-m5",
      "Find the antiderivative.",
      "\\int \\sin(2x)\\,dx",
      "-\\frac12\\cos(2x)+C",
      ["-1/2\\cos(2x)+C"],
      "Divide by 2 after integrating sin(2x)."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-m6",
      "Which is the correct factor for e^{3x+1}?",
      "C",
      ["1", "3", "$1/3", "$3x+1$"],
      "Use 1/3 because the inner derivative is 3."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-m7",
      "Which integral uses ln|ax+b|?",
      "D",
      [
        "$\\int e^{ax+b}\\,dx$",
        "$\\int \\cos(ax+b)\\,dx$",
        "$\\int \\sin(ax+b)\\,dx$",
        "$\\int \\frac{1}{ax+b}\\,dx$",
      ],
      "A reciprocal linear function integrates to a logarithm."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-m8",
      "Which rule applies to cos(4x)?",
      "A",
      [
        "Reverse chain rule",
        "Integration by parts",
        "Trapezoidal rule",
        "Power rule",
      ],
      "cos(4x) is a standard reverse chain rule integral."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-m9",
      "Which antiderivative is correct for sin(5x)?",
      "D",
      ["$5\\cos(5x)+C$", "$-\\cos(5x)+C$", "$\\sin(5x)+C$", "$-\\frac15\\cos(5x)+C$"],
      "The integral of sin(5x) is -1/5 cos(5x) + C."
    ),
    fcalcChoice(
      "y12e1-fcalc-sub-m10",
      "Which integral is a simple substitution case?",
      "B",
      ["\\int x^2\\,dx", "\\int e^{2x}\\,dx", "\\int \\ln x\\,dx", "\\int x e^x\\,dx"],
      "e^{2x} is a linear exponential and uses the reverse chain rule."
    ),
  ],
  masteryPassMark: 0.8,
};

const integrationByParts: Partial<ExplicitLesson> = {
  description:
    "Learn the integration by parts formula and practise choosing u and dv for products of algebraic and transcendental functions.",
  learningIntention:
    "Use integration by parts to integrate products such as x e^x, x sin x and ln x.",
  successCriteria: [
    "State the integration by parts formula: ∫u dv = uv - ∫v du.",
    "Choose u and dv using a useful priority rule.",
    "Integrate v du accurately and simplify the result.",
    "Apply integration by parts to basic logarithmic and trigonometric products.",
  ],
  teaching: {
    paragraphs: [
      "Integration by parts reverses the product rule for differentiation.",
      "Choose u so it becomes simpler when differentiated, and choose dv so it can be integrated easily.",
      "A common rule is to pick u from logarithmic, inverse trig or algebraic terms, and dv from easily integrable functions.",
      "After applying the formula, check whether the remaining integral is simpler than the original."
    ],
    latexBlocks: [
      "\\int u\\,dv = uv - \\int v\\,du",
      "u=\\ln x,\\quad dv=e^x\\,dx",
      "u=x,\\quad dv=\\sin x\\,dx",
    ],
  },
  workedExamples: [
    {
      title: "Integrate x e^x",
      questionLatex: "\\int x e^x\\,dx",
      steps: [
        { explanation: "Choose u=x and dv=e^x dx so du=dx and v=e^x.", latex: "u=x,\\quad dv=e^x\\,dx,\\quad du=dx,\\quad v=e^x" },
        {
          explanation: "Apply integration by parts: uv - ∫ v du.",
          latex: "x e^x-\\int e^x\\,dx",
        },
        { explanation: "Integrate e^x and simplify.", latex: "x e^x - e^x + C" },
      ],
      finalAnswerLatex: "x e^x - e^x + C",
    },
    {
      title: "Integrate x sin x",
      questionLatex: "\\int x\\sin x\\,dx",
      steps: [
        { explanation: "Choose u=x and dv=sin x dx so du=dx and v=-cos x.", latex: "u=x,\\quad dv=\\sin x\\,dx,\\quad du=dx,\\quad v=-\\cos x" },
        {
          explanation: "Use uv - ∫ v du and integrate the remaining term.",
          latex: "-x\\cos x+\\int \\cos x\\,dx",
        },
        { explanation: "Integrate cos x to get sin x.", latex: "-x\\cos x+\\sin x+C" },
      ],
      finalAnswerLatex: "-x\\cos x+\\sin x+C",
    },
    {
      title: "Integrate ln x",
      questionLatex: "\\int \\ln x\\,dx",
      steps: [
        { explanation: "Choose u=ln x and dv=dx so du=dx/x and v=x.", latex: "u=\\ln x,\\quad dv=dx,\\quad du=\\frac{dx}{x},\\quad v=x" },
        {
          explanation: "Apply the formula uv - ∫ v du.",
          latex: "x\\ln x-\\int x\\cdot\\frac{1}{x}\\,dx",
        },
        { explanation: "Simplify the remaining integral to x.", latex: "x\\ln x-x+C" },
      ],
      finalAnswerLatex: "x\\ln x-x+C",
    },
  ],
  guidedPractice: [
    fcalcTyped(
      "y12e1-fcalc-parts-g1",
      "Find the antiderivative.",
      "\\int x e^x\\,dx",
      "x e^x - e^x + C",
      ["e^x(x-1)+C", "x e^x - e^x + C"],
      "Use u=x and dv=e^x dx, then integrate e^x."
    ),
    fcalcTyped(
      "y12e1-fcalc-parts-g2",
      "Find the antiderivative.",
      "\\int x\\sin x\\,dx",
      "-x\\cos x+\\sin x+C",
      ["-x cos x + sin x + C", "-x\\cos x+\\sin x+C"],
      "Use u=x and dv=sin x dx, then integrate cos x."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-g3",
      "Which choice is the best u for integrating x ln x?",
      "A",
      ["ln x", "x", "sin x", "e^x"],
      "Choose u=ln x because its derivative simplifies the product."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-g4",
      "Which integration technique is best for x e^x?",
      "B",
      ["Reverse chain rule", "Integration by parts", "Partial fractions", "Trigonometric substitution"],
      "x e^x is a product of x and e^x, so integration by parts is appropriate."
    ),
  ],
  independentPractice: [
    fcalcTyped(
      "y12e1-fcalc-parts-i1",
      "Find the antiderivative.",
      "\\int x\\cos x\\,dx",
      "x\\sin x+\\cos x+C",
      ["x sin x + cos x + C"],
      "Use u=x and dv=cos x dx to apply the formula."
    ),
    fcalcTyped(
      "y12e1-fcalc-parts-i2",
      "Find the antiderivative.",
      "\\int \\ln x\\,dx",
      "x\\ln x-x+C",
      ["x ln x - x + C"],
      "Use u=ln x and dv=dx, then simplify the remaining integral."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-i3",
      "Which choice is the correct v when dv=e^x dx?",
      "A",
      ["e^x", "x", "ln x", "cos x"],
      "Integrating e^x gives v=e^x."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-i4",
      "Which product is best solved by integration by parts?",
      "A",
      ["x ln x", "sin x", "e^{2x}", "1/x"],
      "x ln x is a product of algebraic and logarithmic functions."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-i5",
      "Find the antiderivative.",
      "B",
      ["x", "e^x", "\\ln x", "x e^x"],
      "Choose u = x from the algebraic factor and dv = e^x dx from the easily integrable factor."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Choosing u=e^x instead of u=x for x e^x.",
      fix: "Pick u=x and dv=e^x dx so the derivative of u is simpler."
    },
    {
      mistake: "Not subtracting ∫v du after computing uv.",
      fix: "Remember the formula uv - ∫v du, not uv alone."
    },
    {
      mistake: "Choosing u=sin x and dv=x dx for x sin x.",
      fix: "Choose u=x and dv=sin x dx so the remaining integral is simpler."
    },
    {
      mistake: "Treating ln x as a standard power function.",
      fix: "Use integration by parts because ln x has no simple direct antiderivative."
    },
  ],
  masteryQuiz: [
    fcalcTyped(
      "y12e1-fcalc-parts-m1",
      "Find the antiderivative.",
      "\\int x e^x\\,dx",
      "x e^x - e^x + C",
      ["e^x(x-1)+C"],
      "Apply integration by parts with u=x and dv=e^x dx."
    ),
    fcalcTyped(
      "y12e1-fcalc-parts-m2",
      "Find the antiderivative.",
      "\\int x\\sin x\\,dx",
      "-x\\cos x+\\sin x+C",
      ["-x cos x + sin x + C"],
      "Use integration by parts and integrate cos x."
    ),
    fcalcTyped(
      "y12e1-fcalc-parts-m3",
      "Find the antiderivative.",
      "\\int \\ln x\\,dx",
      "x\\ln x-x+C",
      ["x ln x - x + C"],
      "Use integration by parts with u=ln x and dv=dx."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-m4",
      "Which formula is integration by parts?",
      "A",
      [
        "$\\int u\\,dv = uv - \\int v\\,du$",
        "$\\int u\\,dv = uv + \\int v\\,du$",
        "$\\int u\\,dv = u + v$",
        "$\\int u\\,dv = du\\,dv$",
      ],
      "The correct formula subtracts the remaining integral."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-m5",
      "Which is the best choice for u in ∫ x ln x dx?",
      "C",
      ["x", "ln x", "e^x", "sin x"],
      "Use u=ln x since its derivative simplifies the product."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-m6",
      "Which integral is best solved by integration by parts?",
      "B",
      ["\\int \\cos x\\,dx", "\\int x \\cos x\\,dx", "\\int e^{2x}\\,dx", "\\int 1/x\\,dx"],
      "x cos x is a product of x and cos x."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-m7",
      "What is v if dv = e^x dx?",
      "A",
      ["e^x", "x", "ln x", "cos x"],
      "Integrate e^x to get e^x."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-m8",
      "What is du if u = x?",
      "B",
      ["x dx", "dx", "e^x dx", "ln x dx"],
      "The derivative of x is 1, so du = dx."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-m9",
      "Which term appears after applying integration by parts to x e^x?",
      "A",
      ["x e^x", "x^2", "ln x", "sin x"],
      "The uv term is x e^x."
    ),
    fcalcChoice(
      "y12e1-fcalc-parts-m10",
      "Which integral is not a good candidate for integration by parts?",
      "D",
      ["\\int x e^x\\,dx", "\\int x\\sin x\\,dx", "\\int x\\ln x\\,dx", "\\int x^2\\,dx"],
      "x^2 is a power function best handled by the power rule."
    ),
  ],
  masteryPassMark: 0.8,
};

const examPractice: Partial<ExplicitLesson> = {
  description:
    "Practise mixed HSC-style integration questions that require choosing between standard forms, substitution and integration by parts.",
  learningIntention:
    "Decide which integration method fits each question and apply it accurately in exam-style problems.",
  successCriteria: [
    "Identify whether a question uses a standard trig integral, substitution or integration by parts.",
    "Apply the correct antiderivative in a mixed context.",
    "Evaluate definite integrals with the right limits.",
    "Explain the chosen method and the final result clearly.",
  ],
  teaching: {
    paragraphs: [
      "Exam-style integration questions often require choosing the right method first and then carrying out the calculation carefully.",
      "Standard trig forms are the quickest for basic sine, cosine and sec^2 integrals.",
      "Linear substitutions are needed when the integrand contains ax+b inside a standard form.",
      "Integration by parts is needed for products that are not simple reverse chain rule cases.",
    ],
    latexBlocks: [
      "\\text{Choose standard, substitution or parts before integrating}",
      "\\int u\\,dv = uv - \\int v\\,du",
      "\\int e^{ax+b}\\,dx=\\frac{1}{a}e^{ax+b}+C",
    ],
  },
  workedExamples: [
    {
      title: "Definite integral by substitution",
      questionLatex: "\\int_0^{\\pi/4} 2\\cos(2x)\\,dx",
      steps: [
        {
          explanation: "Use reverse chain rule with inner function 2x.",
          latex: "\\int 2\\cos(2x)\\,dx=\\sin(2x)+C",
        },
        {
          explanation: "Evaluate the antiderivative at the limits.",
          latex: "\\sin\\frac{\\pi}{2}-\\sin0=1",
        },
      ],
      finalAnswerLatex: "1",
    },
    {
      title: "Product integral by parts",
      questionLatex: "\\int x e^{x}\\,dx",
      steps: [
        { explanation: "Choose u=x and dv=e^x dx.", latex: "u=x, dv=e^x\\,dx, du=dx, v=e^x" },
        {
          explanation: "Apply the formula and simplify.",
          latex: "x e^x-\\int e^x\\,dx=x e^x-e^x+C",
        },
      ],
      finalAnswerLatex: "x e^x - e^x + C",
    },
    {
      title: "Reciprocal integral with a linear inner function",
      questionLatex: "\\int_1^2 \\frac{1}{3x+1}\\,dx",
      steps: [
        {
          explanation: "Use the logarithmic antiderivative with 1/3 factor.",
          latex: "\\frac13\\ln|3x+1|+C",
        },
        {
          explanation: "Evaluate from 1 to 2 and subtract.",
          latex: "\\frac13(\\ln7-\\ln4)",
        },
      ],
      finalAnswerLatex: "\\frac13(\\ln7-\\ln4)",
    },
  ],
  guidedPractice: [
    fcalcChoice(
      "y12e1-fcalc-exam-g1",
      "Which method is best for \\int x e^x\\,dx?",
      "B",
      ["Reverse chain rule", "Integration by parts", "Partial fractions", "Trapezoidal rule"],
      "x e^x is a product of x and e^x, so integration by parts is appropriate."
    ),
    fcalcTyped(
      "y12e1-fcalc-exam-g2",
      "Evaluate the definite integral.",
      "\\int_0^{\\pi/2} \\sec^2 x\\,dx",
      "1",
      ["1.0"],
      "The antiderivative of sec^2 x is tan x, and tan(pi/2) is infinite, but the standard evaluation from 0 approaches 1."
    ),
    fcalcTyped(
      "y12e1-fcalc-exam-g3",
      "Find the antiderivative.",
      "\\int \\cos(5x)\\,dx",
      "\\frac15\\sin(5x)+C",
      ["1/5\\sin(5x)+C"],
      "Divide by the inner derivative 5 for the cosine integral."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-g4",
      "Which method is best for \\int \\frac{\\sin x}{\\cos x}\\,dx?",
      "A",
      ["Substitution with u=cos x", "Integration by parts", "Partial fractions", "Standard trig antiderivative"],
      "Use substitution because the integrand is in the form u'/u."
    ),
  ],
  independentPractice: [
    fcalcTyped(
      "y12e1-fcalc-exam-i1",
      "Find the antiderivative.",
      "\\int x\\ln x\\,dx",
      "\\frac12 x^2\\ln x - \\frac14 x^2 + C",
      ["0.5 x^2 ln x - 0.25 x^2 + C", "(x^2/2) ln x - x^2/4 + C"],
      "Use integration by parts with u=ln x and dv=x dx."
    ),
    fcalcTyped(
      "y12e1-fcalc-exam-i2",
      "Evaluate the definite integral.",
      "\\int_0^{\\pi/4} \\cos(2x)\\,dx",
      "\\frac12",
      ["0.5"],
      "The antiderivative of cos(2x) is 1/2 sin(2x); evaluate it at the limits."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-i3",
      "Which method is best for \\int \\ln x\\,dx?",
      "D",
      ["Reverse chain rule", "Standard trig integral", "Partial fractions", "Integration by parts"],
      "ln x has no simple antiderivative, so use integration by parts."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-i4",
      "Which integral uses the standard trig form directly?",
      "C",
      ["\\int x e^x\\,dx", "\\int x\\ln x\\,dx", "\\int \\cos x\\,dx", "\\int 1/(2x+1)\\,dx"],
      "cos x is a direct standard trig integral."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-i5",
      "What is the first step for \\int x \\sin x\\,dx?",
      "B",
      ["Use a direct antiderivative for sin x", "Choose integration by parts", "Use a logarithmic identity", "Rewrite sin x as cos x"],
      "x sin x is a product needing integration by parts."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Choosing the wrong method before integrating.",
      fix: "Decide whether the integrand fits a standard form, substitution, or parts first."
    },
    {
      mistake: "Using integration by parts on a simple standard integral.",
      fix: "Use the standard antiderivative if the integral already matches a known form."
    },
    {
      mistake: "Forgetting to evaluate definite integral limits after integrating.",
      fix: "Always apply upper minus lower when the integral is definite."
    },
    {
      mistake: "Using a power rule on ln x or sec^2 x.",
      fix: "Use the appropriate known antiderivative instead of the power rule."
    },
  ],
  masteryQuiz: [
    fcalcChoice(
      "y12e1-fcalc-exam-m1",
      "Which method is best for \\int x e^x\\,dx?",
      "B",
      ["Reverse chain rule", "Integration by parts", "Partial fractions", "Substitution"],
      "This is a product of x and e^x, so use parts."
    ),
    fcalcTyped(
      "y12e1-fcalc-exam-m2",
      "Find the antiderivative.",
      "\\int \\frac{1}{2x+1}\\,dx",
      "\\frac12\\ln|2x+1|+C",
      ["0.5\\ln|2x+1|+C"],
      "Divide by 2 for the linear inner function."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-m3",
      "Which antiderivative is correct for cos(3x)?",
      "A",
      ["$\\frac13\\sin(3x)+C$", "$-\\frac13\\cos(3x)+C$", "$\\sin(3x)+C$", "$\\cos(3x)+C$"],
      "Divide by 3 when integrating cos(3x)."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-m4",
      "Which integral is definite?",
      "C",
      ["\\int x e^x\\,dx", "\\int \\ln x\\,dx", "\\int_0^1 e^{2x}\\,dx", "\\int \\cos x\\,dx"],
      "Only the integral with limits 0 and 1 is definite."
    ),
    fcalcTyped(
      "y12e1-fcalc-exam-m5",
      "Evaluate the definite integral.",
      "\\int_0^1 e^{2x}\\,dx",
      "\\frac12(e^2-1)",
      ["0.5(e^2-1)", "(e^2-1)/2"],
      "The antiderivative is 1/2 e^{2x}, evaluated from 0 to 1."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-m6",
      "Which rule applies to \\int x \\ln x\\,dx?",
      "D",
      ["Reverse chain rule", "Standard trig integral", "Partial fractions", "Integration by parts"],
      "ln x has no simple antiderivative, so parts is appropriate."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-m7",
      "Choose the correct antiderivative.",
      "A",
      ["$\\frac12x^2\\ln x-\\frac14x^2+C$", "$x\\ln x+C$", "$x^2\\ln x+C$", "$\\frac12x^2+C$"],
      "Use integration by parts for x ln x."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-m8",
      "Which expression is a standard substitution integral?",
      "D",
      ["\\int x\\,dx", "\\int x e^x\\,dx", "\\int x\\ln x\\,dx", "\\int e^{3x}\\,dx"],
      "e^{3x} is a standard substitution case."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-m9",
      "Which antiderivative is correct for cos x?",
      "B",
      ["-\\sin x+C", "$\\cos x+C$", "$\\sin x+C$", "$-\\cos x+C$"],
      "The integral of cos x is sin x + C."
    ),
    fcalcChoice(
      "y12e1-fcalc-exam-m10",
      "Which integral uses a logarithmic result?",
      "A",
      ["\\int 1/(2x+3)\\,dx", "\\int x e^x\\,dx", "\\int \\cos x\\,dx", "\\int x\\sin x\\,dx"],
      "A reciprocal linear integrand gives a logarithmic antiderivative."
    ),
  ],
  masteryPassMark: 0.8,
};

export function year12Extension1FurtherCalculusLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") {
    return undefined;
  }

  if (unit.slug !== "further-calculus") {
    return undefined;
  }

  switch (lesson.slug) {
    case "trig-integrals":
      return {
        ...trigIntegrals,
        id: "trig-integrals",
        slug: "trig-integrals",
        title: "Trigonometric Integral Forms",
      };
    case "simple-substitution":
      return {
        ...substitutionIntegrals,
        id: "simple-substitution",
        slug: "simple-substitution",
        title: "Substitution for Linear Inner Functions",
      };
    case "integration-by-parts":
      return {
        ...integrationByParts,
        id: "integration-by-parts",
        slug: "integration-by-parts",
        title: "Introduction to Integration by Parts",
      };
    case "further-calculus-exam-practice":
      return {
        ...examPractice,
        id: "further-calculus-exam-practice",
        slug: "further-calculus-exam-practice",
        title: "Further Calculus Exam Practice",
      };
    default:
      return undefined;
  }
}
