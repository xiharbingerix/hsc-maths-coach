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
      "Integration is differentiation run backwards. An integral asks one question: what function has THIS as its derivative? So there is nothing new to memorise here. Every standard integral below is just a standard derivative from MA-C2 read the other way. If you know the slope of a curve, you can recover the curve, and that recovered curve is the integral. This is why we never need a separate table of facts to forget - each result is recoverable by asking 'what differentiates to give the integrand?'",
      "Start with a concrete one: what differentiates to give cos x? From MA-C2 the slope of sin x is cos x, so sin x must be an antiderivative of cos x, and the integral of cos x is sin x. Now the sign trap: what differentiates to give sin x? It is NOT cos x, because the slope of cos x is -sin x, one sign out. To land on +sin x we need to differentiate -cos x, since the slope of -cos x is -(-sin x) = sin x. That extra minus is the whole reason the integral of sin x is -cos x, not cos x. You never have to recall the sign - just differentiate your candidate and see if it comes back to the integrand.",
      "The exponential is the easiest to reverse. From MA-C2, e^x is the one curve whose slope equals its own height, so d/dx(e^x) = e^x. Running that backwards, e^x is its own antiderivative too: the integral of e^x is e^x. Differentiate the answer and you land straight back on e^x, which is the check.",
      "The reciprocal 1/x is the interesting case. From MA-C2 the slope of ln x is 1/x, so ln x is an antiderivative of 1/x. But 1/x is defined for negative x as well (say x = -2), while ln x is not, so ln x alone cannot be the whole story. For x < 0 the antiderivative is ln(-x), and both branches are captured at once by ln|x|. Differentiating ln|x| gives 1/x on either side of zero, so the integral of 1/x is ln|x| + C - the absolute value is there precisely because the domain of 1/x includes negative numbers.",
      "Two housekeeping rules complete the toolkit. Because differentiating any constant gives 0, adding a constant to an antiderivative changes nothing when you differentiate back - so an indefinite integral always carries a +C to stand for every possible constant. A definite integral instead measures the signed area under the curve between two limits: you evaluate the antiderivative at the top limit minus the bottom limit, the constants cancel, and no +C survives. In NSW exams these four forms are the building blocks for areas, motion and reverse-chain problems, so recovering them by reverse-differentiation is faster and safer than trusting memory.",
    ],
    latexBlocks: [
      "\\int f'(x)\\,dx = f(x)+C \\qquad \\text{(integration reverses differentiation)}",
      "\\int \\cos x\\,dx=\\sin x+C \\qquad \\int \\sin x\\,dx=-\\cos x+C",
      "\\int e^x\\,dx=e^x+C \\qquad \\int \\frac{1}{x}\\,dx=\\ln|x|+C",
      "\\frac{d}{dx}\\ln|x|=\\frac{1}{x}\\ \\text{ for } x\\neq 0 \\quad\\Rightarrow\\quad \\text{absolute value covers } x<0",
    ],
  },
  [
    {
      title: "Worked example 1: sine and cosine, and the sign",
      questionLatex: "\\int (\\sin x+2\\cos x)\\,dx",
      steps: [
        {
          explanation:
            "Ask what differentiates to sin x. The slope of -cos x is -(-sin x) = sin x, so -cos x is the antiderivative of sin x. Choosing +cos x here would differentiate to -sin x, the wrong sign.",
          latex: "\\int \\sin x\\,dx=-\\cos x",
        },
        {
          explanation:
            "Ask what differentiates to cos x. The slope of sin x is cos x, so sin x is the antiderivative; the constant 2 rides along unchanged because it just scales the slope.",
          latex: "\\int 2\\cos x\\,dx=2\\sin x",
        },
        {
          explanation:
            "Add +C, since any constant differentiates to 0 and so is invisible to differentiation.",
          latex: "-\\cos x+2\\sin x+C",
        },
        {
          explanation:
            "Verify by differentiating back: d/dx(-cos x) = sin x and d/dx(2 sin x) = 2 cos x, which rebuilds the integrand exactly.",
          latex: "\\frac{d}{dx}(-\\cos x+2\\sin x)=\\sin x+2\\cos x",
        },
      ],
      finalAnswerLatex: "-\\cos x+2\\sin x+C",
    },
    {
      title: "Worked example 2: exponential and reciprocal terms",
      questionLatex: "\\int \\left(3e^x+\\frac{2}{x}\\right)\\,dx",
      steps: [
        {
          explanation:
            "Ask what differentiates to e^x. Because e^x is its own slope, it is its own antiderivative; the factor 3 stays out front.",
          latex: "\\int 3e^x\\,dx=3e^x",
        },
        {
          explanation:
            "Ask what differentiates to 1/x. The slope of ln|x| is 1/x on both sides of zero, so use ln|x|; the absolute value keeps the answer valid where x is negative.",
          latex: "\\int \\frac{2}{x}\\,dx=2\\ln|x|",
        },
        {
          explanation:
            "Combine and add +C for the indefinite integral. Check by differentiating: d/dx(3e^x) = 3e^x and d/dx(2 ln|x|) = 2/x, which is the integrand.",
          latex: "3e^x+2\\ln|x|+C",
        },
      ],
      finalAnswerLatex: "3e^x+2\\ln|x|+C",
    },
    {
      title: "Worked example 3: a definite integral as area",
      questionLatex: "\\int_0^{\\pi/2}\\cos x\\,dx",
      steps: [
        {
          explanation:
            "Find the antiderivative first: sin x differentiates to cos x, so sin x is the antiderivative of cos x. No +C is needed because it will cancel at the limits.",
          latex: "\\int \\cos x\\,dx=\\sin x",
        },
        {
          explanation:
            "Evaluate the antiderivative at the upper limit minus the lower limit. This subtraction is why the constant disappears from a definite integral.",
          latex: "\\Big[\\sin x\\Big]_0^{\\pi/2}=\\sin\\frac{\\pi}{2}-\\sin 0=1-0",
        },
        {
          explanation:
            "Interpret the number: the cosine curve stays above the x-axis from 0 to pi/2, so the answer 1 is the area of that region in square units.",
          latex: "\\text{area under } \\cos x \\text{ on } [0,\\tfrac{\\pi}{2}] = 1",
        },
      ],
      finalAnswerLatex: "1",
      cartesianGraph: {
        description: "The curve y equals cos x descends from (0, 1) to (pi/2, 0), staying above the x-axis across the interval. The definite integral is the area of the region between this curve and the x-axis from x equals 0 to x equals pi/2, which evaluates to 1 square unit. (A trig curve's region cannot be shaded by the renderer, so the boundary curve is drawn and the region is described.)",
        xMin: -0.2, xMax: 1.9, yMin: -0.2, yMax: 1.3, xStep: 0.5, yStep: 0.5,
        sinusoidals: [{ kind: "cos", a: 1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI / 2, label: "y = cos x" }],
        points: [
          { x: 0, y: 1, label: "(0, 1)" },
          { x: Math.PI / 2, y: 0, label: "(pi/2, 0)" },
        ],
      },
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
    { mistake: "Integrating sin x as cos x.", fix: "The integral of sin x is $-\\cos x+C$. Differentiating $\\cos x$ gives $-\\sin x$, the wrong sign, so the antiderivative must be $-\\cos x$." },
    { mistake: "Adding +C to a definite integral answer.", fix: "Use +C for indefinite integrals only. In a definite integral the constant cancels when you subtract the two limits." },
    { mistake: "Using the power rule on $x^{-1}$.", fix: "$\\int \\frac1x\\,dx=\\ln|x|+C$, not $x^0/0$. The power rule breaks at exponent $-1$; instead reverse $\\frac{d}{dx}\\ln|x|=\\frac1x$." },
    { mistake: "Forgetting constant multiples.", fix: "Constants multiply the antiderivative, because a constant factor just scales the slope." },
    { mistake: "Dropping the absolute value and writing $\\ln x$ for $\\int \\frac1x\\,dx$.", fix: "Use $\\ln|x|$: the integrand $\\frac1x$ is defined for negative $x$ too, and $\\ln|x|$ covers that domain while $\\ln x$ does not." },
    { mistake: "Not checking the answer.", fix: "Differentiate your antiderivative; if it does not return the integrand, the integral is wrong." },
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
      "Integrating a composite like $e^{3x+1}$ or $\\sin(4x)$ looks like a new skill, but it is just the chain rule from MA-C2 run backward. The method is always the same three moves: write down the obvious antiderivative you would expect, differentiate it to check, then divide out whatever extra constant the chain rule dragged out in front. Because the inside of every integral here is linear, that extra constant is always a single fixed number, and cancelling it is the whole technique.",
      "Try a specific one before any general rule: integrate $e^{3x}$. The obvious guess is $e^{3x}$ itself, since the exponential is its own antiderivative. But differentiate the guess to test it, and the chain rule brings the inner derivative of $3x$ down the front, giving $3e^{3x}$, which is three times too big. That extra 3 is the whole problem, so divide the guess by 3. The antiderivative is $\\tfrac13 e^{3x}$, and differentiating $\\tfrac13 e^{3x}$ now returns exactly $e^{3x}$.",
      "The same reasoning gives the general rule and shows where the $1/a$ comes from. Differentiating $e^{ax+b}$ by the chain rule gives $a\\,e^{ax+b}$, because the inner derivative of $ax+b$ is $a$. So the raw guess $e^{ax+b}$ always overshoots by a factor of $a$, and dividing by $a$ repairs it: the integral of $e^{ax+b}$ is $\\tfrac1a e^{ax+b}+C$. The $1/a$ is never a fact to memorise on its own; it is precisely the inner derivative you have to undo.",
      "Every linear composite behaves this way. Differentiating $\\sin(ax+b)$ gives $a\\cos(ax+b)$, so integrating $\\cos(ax+b)$ needs the $1/a$, giving $\\tfrac1a\\sin(ax+b)$; integrating $\\sin(ax+b)$ carries the same $1/a$ plus the minus sign from $\\tfrac{d}{dx}\\cos = -\\sin$, giving $-\\tfrac1a\\cos(ax+b)$. The reciprocal is the same story: $\\tfrac{d}{dx}\\ln|ax+b| = \\tfrac{a}{ax+b}$ by the chain rule, so the integral of $\\tfrac{1}{ax+b}$ is $\\tfrac1a\\ln|ax+b|+C$, with the absolute value kept for the same reason as $\\int\\tfrac1x\\,dx$: $ax+b$ can be negative.",
      "The one error that costs marks is writing the guess and forgetting to divide by $a$, for example giving $e^{2x}$ as the integral of $e^{2x}$. It always fails the check: differentiating $e^{2x}$ returns $2e^{2x}$, not $e^{2x}$, so the missing $\\tfrac12$ is exposed at once. Make differentiating your answer back a habit. In NSW exams these forms sit inside definite integrals, areas and motion problems, where a dropped $1/a$ quietly ruins the final number.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}e^{ax+b}=a\\,e^{ax+b}\\quad\\Rightarrow\\quad \\int e^{ax+b}\\,dx=\\frac{1}{a}e^{ax+b}+C",
      "\\int \\cos(ax+b)\\,dx=\\frac{1}{a}\\sin(ax+b)+C \\qquad \\int \\sin(ax+b)\\,dx=-\\frac{1}{a}\\cos(ax+b)+C",
      "\\frac{d}{dx}\\ln|ax+b|=\\frac{a}{ax+b}\\quad\\Rightarrow\\quad \\int \\frac{1}{ax+b}\\,dx=\\frac{1}{a}\\ln|ax+b|+C",
      "\\int (ax+b)^n\\,dx=\\frac{1}{a}\\cdot\\frac{(ax+b)^{n+1}}{n+1}+C\\qquad(n\\neq-1)",
    ],
  },
  [
    {
      title: "Exponential: guess, check, divide out",
      questionLatex: "\\int e^{3x+1}\\,dx",
      steps: [
        { explanation: "Write down the obvious guess. The exponential is its own antiderivative, so start with e^{3x+1} and expect to adjust the constant.", latex: "\\text{guess: } e^{3x+1}" },
        { explanation: "Differentiate the guess to test it. The chain rule brings the inner derivative of 3x+1, which is 3, down the front.", latex: "\\frac{d}{dx}e^{3x+1}=3e^{3x+1}" },
        { explanation: "The check overshoots by a factor of 3, so divide the guess by 3 to cancel it, and add +C for the indefinite integral.", latex: "\\frac{1}{3}e^{3x+1}+C" },
        { explanation: "Verify by differentiating the answer: the 1/3 and the inner derivative 3 cancel, rebuilding the integrand exactly.", latex: "\\frac{d}{dx}\\left(\\frac13 e^{3x+1}\\right)=\\frac13\\cdot 3\\,e^{3x+1}=e^{3x+1}" },
      ],
      finalAnswerLatex: "\\frac13e^{3x+1}+C",
    },
    {
      title: "Logarithmic: where the 1/a comes from",
      questionLatex: "\\int \\frac{1}{2x-5}\\,dx",
      steps: [
        { explanation: "A reciprocal integrand points to a logarithm, so guess ln|2x-5|. The absolute value keeps it valid when 2x-5 is negative.", latex: "\\text{guess: } \\ln|2x-5|" },
        { explanation: "Differentiate the guess. By the chain rule the inner derivative of 2x-5 is 2, so a factor of 2 lands on top.", latex: "\\frac{d}{dx}\\ln|2x-5|=\\frac{2}{2x-5}" },
        { explanation: "The check is twice too big, so divide the guess by 2 and add +C.", latex: "\\frac{1}{2}\\ln|2x-5|+C" },
        { explanation: "Verify: the 1/2 cancels the inner derivative 2, returning the original integrand.", latex: "\\frac{d}{dx}\\left(\\frac12\\ln|2x-5|\\right)=\\frac12\\cdot\\frac{2}{2x-5}=\\frac{1}{2x-5}" },
      ],
      finalAnswerLatex: "\\frac12\\ln|2x-5|+C",
    },
    {
      title: "Trigonometric: the same divide-by-a fix",
      questionLatex: "\\int \\cos(4x)\\,dx",
      steps: [
        { explanation: "Guess the antiderivative of cosine, which is sine, so start with sin(4x).", latex: "\\text{guess: } \\sin(4x)" },
        { explanation: "Differentiate to check. The slope of sine is cosine, and the chain rule brings the inner derivative 4 down the front.", latex: "\\frac{d}{dx}\\sin(4x)=4\\cos(4x)" },
        { explanation: "The extra 4 must be divided out, giving the antiderivative plus C.", latex: "\\frac{1}{4}\\sin(4x)+C" },
        { explanation: "Verify: the 1/4 cancels the inner derivative 4, returning cos(4x).", latex: "\\frac{d}{dx}\\left(\\frac14\\sin(4x)\\right)=\\frac14\\cdot 4\\cos(4x)=\\cos(4x)" },
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
    { mistake: "Forgetting to divide by the inner derivative.", fix: "Differentiating the antiderivative multiplies by the inner derivative $a$, so reversing it must divide by $a$. Differentiate your answer: if it comes back $a$ times too big, you dropped the $\\frac1a$." },
    { mistake: "Using the same sign for sine and cosine integrals.", fix: "Integrating sine gives negative cosine, because $\\frac{d}{dx}\\cos = -\\sin$. Differentiate your candidate and confirm the sign matches the integrand." },
    { mistake: "Writing $\\ln(ax+b)$ without a scale factor.", fix: "By the chain rule $\\frac{d}{dx}\\ln|ax+b|=\\frac{a}{ax+b}$, so $\\int \\frac1{ax+b}\\,dx$ needs the $\\frac1a$ to cancel that $a$." },
    { mistake: "Assuming every composite integral needs a new method.", fix: "Any linear inside $ax+b$ is handled by the same guess-check-divide routine; there is no separate rule to learn." },
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
      "A definite integral of a standard form measures the net signed area the curve sweeps out between two x-values, the lower limit a and the upper limit b. Picture the region between the curve and the x-axis from a to b: pieces above the axis count as positive area and pieces below the axis count as negative area, and the definite integral is their running balance. That signed-area picture is the mental model to keep. Even if you forget the mechanics, a definite integral is just accumulated signed area over an interval.",
      "Why does subtracting two antiderivative values give that accumulated area? Because an antiderivative F is the running total of the area. As x moves right, area builds up at the rate f(x), and F is precisely the function whose rate of change is f, so F(x) is the amount of signed area collected up to x. The area gathered between a and b is then the running total at the end minus the running total at the start, F(b) - F(a). This is the Fundamental Theorem of Calculus recalled: the change in the running total over the interval is the net accumulation across it. Any +C sits in both F(b) and F(a) and cancels in the subtraction, which is why a definite integral never carries a +C.",
      "Try one by hand before the general rule. For the integral of cos x from 0 to pi/2, first ask what differentiates to cos x: the slope of sin x is cos x, so the running total is F(x) = sin x. The area collected by x = pi/2 is F(pi/2) = sin(pi/2) = 1, and the area collected by the start x = 0 is F(0) = sin 0 = 0. Subtracting, the net accumulation is 1 - 0 = 1. The whole calculation is just three moves: find the running total, read it at both limits, subtract.",
      "The same three moves work for every standard form. Choose the antiderivative first (sin x for cos x, -cos x for sin x, e^x for e^x, ln|x| for 1/x), then substitute the upper limit and the lower limit and subtract. Trigonometric limits such as 0, pi/2 and pi are chosen because their sine and cosine values are exact, and reciprocal integrals turn into differences of logarithms, so answers like e - 1 or ln 2 should be left exact rather than rounded on a calculator.",
      "The sign of the result carries meaning, and this is where students slip. Sketch y = -sin x from 0 to pi: because sin x is positive across that interval, -sin x is negative, so the curve dips entirely below the x-axis. Its definite integral comes out negative, and that minus sign is not an error. It records that the region lies below the axis, so the signed area is negative while the geometric area, the actual size of the region, is positive. Read a negative definite integral as 'below the axis on balance', not as 'no area'.",
    ],
    latexBlocks: [
      "\\int_a^b f(x)\\,dx=\\Big[F(x)\\Big]_a^b=F(b)-F(a) \\qquad \\text{(running total at } b \\text{ minus running total at } a\\text{)}",
      "\\int \\cos x\\,dx=\\sin x,\\quad \\int \\sin x\\,dx=-\\cos x,\\quad \\int e^x\\,dx=e^x,\\quad \\int \\frac1x\\,dx=\\ln|x|",
      "\\int_0^{\\pi}(-\\sin x)\\,dx=\\big[\\cos x\\big]_0^{\\pi}=\\cos\\pi-\\cos 0=-1-1=-2 \\quad(\\text{signed area }-2,\\ \\text{geometric area }2)",
    ],
  },
  [
    {
      title: "Worked example 1: a sine integral, shown in full",
      questionLatex: "\\int_0^{\\pi/2}\\sin x\\,dx",
      steps: [
        {
          explanation:
            "Choose the running total first. Ask what differentiates to sin x: the slope of -cos x is -(-sin x) = sin x, so F(x) = -cos x. No +C is written, because on a definite integral the constant cancels when we subtract.",
          latex: "F(x)=-\\cos x",
        },
        {
          explanation:
            "Read the running total at the upper limit x = pi/2. This is the signed area collected by the top of the interval.",
          latex: "F\\left(\\tfrac{\\pi}{2}\\right)=-\\cos\\tfrac{\\pi}{2}=-0=0",
        },
        {
          explanation:
            "Read the running total at the lower limit x = 0. This is the signed area collected at the start.",
          latex: "F(0)=-\\cos 0=-1",
        },
        {
          explanation:
            "Subtract start from end: the net accumulation is F(pi/2) - F(0). The result is positive because sin x sits above the axis on this interval, so area builds up.",
          latex: "F\\left(\\tfrac{\\pi}{2}\\right)-F(0)=0-(-1)=1",
        },
      ],
      finalAnswerLatex: "1",
    },
    {
      title: "Worked example 2: a reciprocal integral, kept exact",
      questionLatex: "\\int_1^e \\frac1x\\,dx",
      steps: [
        {
          explanation:
            "The antiderivative of 1/x is ln|x|. On the interval from 1 to e every x is positive, so the absolute value is unnecessary and the running total is F(x) = ln x.",
          latex: "F(x)=\\ln x",
        },
        {
          explanation:
            "Read the running total at the upper limit x = e, using ln e = 1.",
          latex: "F(e)=\\ln e=1",
        },
        {
          explanation:
            "Read the running total at the lower limit x = 1, using ln 1 = 0.",
          latex: "F(1)=\\ln 1=0",
        },
        {
          explanation:
            "Subtract to get the net accumulation. The exact value is 1; leave it exact rather than as a rounded decimal.",
          latex: "F(e)-F(1)=1-0=1",
        },
      ],
      finalAnswerLatex: "1",
    },
    {
      title: "Worked example 3: signed area below the axis",
      questionLatex: "\\int_0^\\pi -\\sin x\\,dx",
      steps: [
        {
          explanation:
            "Sketch y = -sin x from 0 to pi. Since sin x is positive across this interval, -sin x is negative, so the curve lies entirely below the x-axis. Predict the signed value will be negative.",
        },
        {
          explanation:
            "Choose the running total. Ask what differentiates to -sin x: the slope of cos x is -sin x, so F(x) = cos x.",
          latex: "F(x)=\\cos x",
        },
        {
          explanation:
            "Read the running total at the upper limit x = pi.",
          latex: "F(\\pi)=\\cos\\pi=-1",
        },
        {
          explanation:
            "Read the running total at the lower limit x = 0.",
          latex: "F(0)=\\cos 0=1",
        },
        {
          explanation:
            "Subtract: the net accumulation is -2. The minus sign records that the region lies below the axis, so the signed area is -2 while the geometric area of the region is 2.",
          latex: "F(\\pi)-F(0)=-1-1=-2",
        },
      ],
      finalAnswerLatex: "-2",
      cartesianGraph: {
        description: "The curve y equals negative sin x lies entirely below the x-axis from x equals 0 to x equals pi, dipping to its lowest point (pi/2, -1). The region between the curve and the axis has geometric area 2, but because it sits below the axis the signed integral is negative 2. (A trig curve's region cannot be shaded by the renderer, so the boundary curve is drawn and the negative signed area is described.)",
        xMin: -0.2, xMax: 3.5, yMin: -1.3, yMax: 0.3, xStep: 0.5, yStep: 0.5,
        sinusoidals: [{ kind: "sin", a: -1, b: 1, c: 0, d: 0, xMin: 0, xMax: Math.PI, label: "y = -sin x" }],
        points: [
          { x: 0, y: 0, label: "(0, 0)" },
          { x: Math.PI / 2, y: -1, label: "(pi/2, -1)" },
          { x: Math.PI, y: 0, label: "(pi, 0)" },
        ],
      },
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
    { mistake: "Adding +C after evaluating a definite integral.", fix: "Use +C only for indefinite integrals; on a definite integral the constant sits in both F(b) and F(a) and cancels when you subtract." },
    { mistake: "Substituting the lower limit first.", fix: "Compute upper value minus lower value: F(b) - F(a) is the running total at the end minus the running total at the start." },
    { mistake: "Using cos x as the antiderivative of sin x.", fix: "Since d/dx(-cos x) = sin x, the antiderivative of sin x is -cos x; a lost minus sign flips the sign of the whole answer." },
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
      "Picture the region between two curves cut into a stack of thin vertical strips, exactly as you sliced the area under a single curve. Each strip is a tall rectangle whose top edge rests on the higher curve and whose bottom edge rests on the lower curve. Its height is therefore the vertical distance between the curves at that $x$, and its width is a tiny $dx$. That mental picture is the whole lesson: the area is just the sum of all these strips.",
      "Try one strip with numbers before any integral. Take the lines $y=4$ and $y=x$ and stand a strip at $x=1$. The top edge is at $4$ and the bottom edge is at $1$, so this strip has height $4-1=3$ and covers about $3\\,dx$ square units. Slide the strip to $x=2$ and its height becomes $4-2=2$: the height keeps changing, which is exactly why we cannot use one rectangle and must add infinitely many thin ones.",
      "A representative strip at position $x$ has height (top curve minus bottom curve) and width $dx$, so its area is $(\\text{top}-\\text{bottom})\\,dx$. Adding every strip from $x=a$ to $x=b$ and letting the width shrink to zero turns the sum into the definite integral $\\int_a^b(\\text{top}-\\text{bottom})\\,dx$. When you are not told where the region begins and ends, the bounds are the points where the curves meet, so set $f(x)=g(x)$ and solve to find them.",
      "The order of the subtraction is where signed area and geometric area part ways. Height is a distance, so top minus bottom must come out positive; if the curves swap which one is on top partway along, then a single $(f-g)$ written for the whole interval goes negative on the part where the roles are reversed. Those negative strip contributions cancel the positive ones, so the plain integral gives signed area, which can be zero even when the region clearly covers space. Geometric area is the true amount of space, and it is never negative. To get it, split the interval at each crossing and write top minus bottom correctly on each piece so every strip height is positive, then add the pieces.",
      "In NSW exam questions the bounds are usually the intersection points found by setting the curves equal, and a common trap is a curve that crosses the x-axis inside the interval. If a question asks for total area, split at the crossing and add positive pieces; if it asks for the value of a definite integral, leave the signs alone.",
    ],
    latexBlocks: [
      "\\text{one strip: area}\\approx(\\text{top}-\\text{bottom})\\times dx",
      "\\text{Area}=\\lim_{dx\\to0}\\sum(\\text{top}-\\text{bottom})\\,dx=\\int_a^b(\\text{top}-\\text{bottom})\\,dx",
      "f(x)=g(x)\\ \\Rightarrow\\ \\text{intersection bounds; split here if the curves cross}",
      "\\text{signed area can be }0\\text{ while geometric area}>0",
    ],
  },
  [
    {
      title: "Top minus bottom",
      questionLatex: "y=4,\\quad y=x,\\quad 0\\le x\\le2",
      steps: [
        { explanation: "Test a point inside the interval to see which curve is higher. At $x=1$ the line $y=4$ sits at $4$ and $y=x$ sits at $1$, and since $4$ stays above $x$ for every $x$ in $[0,2]$, the top is $y=4$ and the bottom is $y=x$.", latex: "\\text{at }x=1:\\ 4>1\\ \\Rightarrow\\ y=4\\text{ on top}" },
        { explanation: "A strip at position $x$ has height top minus bottom and width $dx$; summing the strips across the interval is the integral.", latex: "\\text{Area}=\\int_0^2(4-x)\\,dx" },
        { explanation: "Antidifferentiate the strip height term by term.", latex: "\\int(4-x)\\,dx=4x-\\frac{x^2}{2}" },
        { explanation: "Evaluate at the bounds and subtract to get the accumulated area of all strips.", latex: "\\left[4x-\\frac{x^2}{2}\\right]_0^2=(8-2)-0=6" },
      ],
      finalAnswerLatex: "6\\text{ square units}",
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
        { explanation: "No interval is given, so the region is the piece enclosed between the curves. Its edges are where the curves meet, found by setting them equal.", latex: "x=x^2\\ \\Rightarrow\\ x-x^2=0\\ \\Rightarrow\\ x(1-x)=0" },
        { explanation: "The two solutions are the bounds of the region.", latex: "x=0\\quad\\text{and}\\quad x=1" },
        { explanation: "Decide the top by testing a point between the bounds. At $x=\\tfrac12$ the line gives $0.5$ and the parabola gives $0.25$, so $y=x$ is above and each strip runs from $x^2$ up to $x$.", latex: "\\text{at }x=\\tfrac12:\\ x=0.5>x^2=0.25" },
        { explanation: "Set up top minus bottom and antidifferentiate.", latex: "\\int_0^1(x-x^2)\\,dx=\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1" },
        { explanation: "Evaluate at the bounds.", latex: "\\left(\\frac12-\\frac13\\right)-0=\\frac16" },
      ],
      finalAnswerLatex: "\\frac16\\text{ square units}",
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
      title: "Signed area versus geometric area",
      questionLatex: "y=x,\\quad y=0,\\quad -1\\le x\\le1",
      steps: [
        { explanation: "The bottom boundary is the x-axis, $y=0$. The line $y=x$ is below the axis on $(-1,0)$ and above it on $(0,1)$, so the two curves swap which is on top at the crossing $x=0$.", latex: "y=x=0\\ \\Rightarrow\\ \\text{crossing at }x=0" },
        { explanation: "First take one signed integral across the whole interval without splitting. The strips left of $0$ have negative height and cancel the positive strips on the right.", latex: "\\int_{-1}^1(x-0)\\,dx=\\left[\\frac{x^2}{2}\\right]_{-1}^1=\\frac12-\\frac12=0" },
        { explanation: "So the signed area is $0$, yet the region plainly covers two triangles of space. That zero is the cancellation warning, not the true area. To get geometric area, split at the crossing and write top minus bottom so each strip height is positive.", latex: "\\text{Area}=\\int_{-1}^0(0-x)\\,dx+\\int_0^1(x-0)\\,dx" },
        { explanation: "Left piece: below the axis the top is $y=0$ and the bottom is $y=x$.", latex: "\\int_{-1}^0(-x)\\,dx=\\left[-\\frac{x^2}{2}\\right]_{-1}^0=0-\\left(-\\frac12\\right)=\\frac12" },
        { explanation: "Right piece: above the axis the top is $y=x$. Add the two positive pieces.", latex: "\\int_0^1 x\\,dx=\\frac12,\\quad \\text{Area}=\\frac12+\\frac12=1" },
      ],
      finalAnswerLatex: "\\text{geometric area}=1\\text{ (signed integral}=0)",
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
    { mistake: "Reading a signed integral of zero as no area.", fix: "A crossing makes positive and negative strips cancel; split at the crossing to recover the true geometric area." },
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
        { explanation: "The width is one.", latex: "h=\\frac{2-0}{2}=1" },
        { explanation: "Use x-values 0, 1 and 2.", latex: "y_0=0,\\quad y_1=1,\\quad y_2=4" },
        { explanation: "Double the interior value.", latex: "\\frac12(0+2(1)+4)=3" },
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
        { explanation: "The x-values are one unit apart.", latex: "h=1" },
        { explanation: "Use endpoints once and interior values twice.", latex: "\\frac12(2+2(5)+2(6)+8)" },
        { explanation: "Evaluate the approximation.", latex: "16" },
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
