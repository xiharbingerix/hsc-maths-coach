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
  masteryQuiz: PracticeQuestion[],
  masteryQuizPool: PracticeQuestion[] = []
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
    ...(masteryQuizPool.length ? { masteryQuizPool } : {}),
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
      "A derivative is still what it was in MA-C1: the slope of the curve, the instantaneous rate at which the output changes as x moves. Each 'standard derivative' below is just the answer to one question for a particular curve - how steep is it at every point. So the goal is not to memorise a table but to know the shape of each slope; the formulas are then consequences you can reconstruct.",
      "Walk along y = sin x from x = 0. The curve climbs at its steepest as it leaves the origin, is momentarily flat at the peak (x = pi/2), then falls. If you record that slope at every point, you trace out a new wave: it starts high, drops to 0 at the peak, then goes negative - and that wave is exactly cos x. We can pin the steepest slope down: the gradient of sin x at 0 is the limit of (sin h - 0)/h as h tends to 0, and on the unit circle a tiny angle and its sine are almost equal, so (sin h)/h tends to 1. The slope at x = 0 is therefore 1, which is cos 0. Hence d/dx(sin x) = cos x, and slope-tracing the cosine wave once more gives d/dx(cos x) = -sin x. The derivative of tan x is sec^2 x, which is always positive - tan keeps increasing between its asymptotes.",
      "Exponentials grow at a rate proportional to how big they already are: the more there is, the faster it climbs. Among all the curves y = a^x there is exactly one base for which the slope equals the height itself at every point, and we name that base e (about 2.718). So e^x is the special function that is its own derivative: d/dx(e^x) = e^x. Any other exponential can be rewritten as a^x = e^{x ln a}, which climbs ln a times as fast, giving d/dx(a^x) = a^x ln a. Sense-check the base: when a = e, ln e = 1, so the formula returns e^x as it must.",
      "The natural logarithm undoes e^x, so y = ln x is the reflection of y = e^x in the line y = x. Reflecting swaps rise and run, which turns a steep slope into a shallow one, so where e^x climbs fast ln x climbs slowly. The result is d/dx(ln x) = 1/x: large for small x and shrinking as x grows, exactly the mirror of the steepening e^x.",
      "Two slips are worth naming. Dropping the minus sign on d/dx(cos x) treats cosine as if it rose like sine, but at x = 0 the cosine curve sits at a peak, so its slope must start at 0 and turn negative - which is what -sin x does. The other slip is using the power rule on e^x to get x e^{x-1}; the power rule only applies when the variable is the base and the exponent is a constant, whereas in e^x the variable is the exponent, so a different rule governs it. In NSW exams these derivatives sit inside tangents, rates and optimisation, where a value such as f'(a) is read as the gradient of the curve at x = a.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(\\sin x)=\\cos x \\qquad \\text{because } \\lim_{h\\to 0}\\frac{\\sin h}{h}=1",
      "\\frac{d}{dx}(\\cos x)=-\\sin x \\qquad \\frac{d}{dx}(\\tan x)=\\sec^2 x",
      "\\frac{d}{dx}(e^x)=e^x \\qquad \\frac{d}{dx}(\\ln x)=\\frac{1}{x}",
      "\\frac{d}{dx}(a^x)=\\frac{d}{dx}\\,e^{x\\ln a}=a^x\\ln a",
    ],
  },
  [
    {
      title: "Worked example 1: The slope of sine is cosine",
      questionLatex:
        "y=\\sin x.\\quad \\text{Describe the gradient, then find it at } x=0 \\text{ and } x=\\tfrac{\\pi}{2}.",
      cartesianGraph: {
        description:
          "Two waves on the same axes over x = 0 to 2pi. The solid curve is y = sin x; the dashed curve is y = cos x. At every point the height of the cosine curve equals the slope of the sine curve: cos x is 1 where sin x climbs fastest (x = 0), 0 where sin x peaks and is momentarily flat (x = pi/2), and negative where sin x is falling.",
        xMin: 0,
        xMax: 6.5,
        yMin: -1.5,
        yMax: 1.5,
        xStep: 1,
        yStep: 1,
        sinusoidals: [
          { kind: "sin", a: 1, b: 1, c: 0, d: 0, label: "y = sin x" },
          { kind: "cos", a: 1, b: 1, c: 0, d: 0, label: "y = cos x (the slope of sin x)" },
        ],
        points: [
          { x: 0, y: 0, label: "sin climbs fastest: slope 1" },
          { x: 1.5708, y: 1, label: "peak: slope 0" },
        ],
      },
      steps: [
        {
          explanation:
            "Read the slope straight off the curve. Sine climbs fastest leaving the origin, so the gradient is largest there; at the peak the curve is momentarily flat, so the gradient is 0.",
        },
        {
          explanation:
            "Tracking that gradient at every point traces a second wave that starts at its maximum, falls to 0 at the peak, then goes negative. That wave is cosine, so the gradient function is cos x.",
          latex: "\\frac{dy}{dx}=\\cos x",
        },
        {
          explanation:
            "At x = 0 the gradient is cos 0 = 1: the tangent rises one unit for each unit across, the steepest climb on the whole curve.",
          latex: "\\left.\\frac{dy}{dx}\\right|_{x=0}=\\cos 0=1",
        },
        {
          explanation:
            "At x = pi/2 the gradient is cos(pi/2) = 0: the tangent is horizontal, matching the flat top we read off the graph at the peak.",
          latex: "\\left.\\frac{dy}{dx}\\right|_{x=\\pi/2}=\\cos\\tfrac{\\pi}{2}=0",
        },
      ],
      finalAnswerLatex:
        "\\frac{dy}{dx}=\\cos x,\\quad \\text{gradient}=1\\text{ at }x=0,\\ \\ 0\\text{ at }x=\\tfrac{\\pi}{2}",
    },
    {
      title: "Worked example 2: A combination, and the cosine sign",
      questionLatex: "f(x)=3\\sin x-2\\cos x.\\quad \\text{Find } f'(x) \\text{ and } f'(0).",
      steps: [
        {
          explanation:
            "Differentiate each term on its own, because the derivative of a sum is the sum of the derivatives. The slope of sin x is cos x, so the 3 sin x term contributes 3 cos x.",
          latex: "\\frac{d}{dx}(3\\sin x)=3\\cos x",
        },
        {
          explanation:
            "For -2 cos x, the slope of cosine is -sin x, so the two minus signs combine to give +2 sin x. This is exactly where the cosine sign rule earns its keep.",
          latex: "\\frac{d}{dx}(-2\\cos x)=-2(-\\sin x)=2\\sin x",
        },
        {
          explanation: "Add the pieces to get the gradient function.",
          latex: "f'(x)=3\\cos x+2\\sin x",
        },
        {
          explanation:
            "At x = 0, cos 0 = 1 and sin 0 = 0, so the gradient is 3: the curve is rising steeply as it crosses x = 0.",
          latex: "f'(0)=3\\cos 0+2\\sin 0=3",
        },
      ],
      finalAnswerLatex: "f'(x)=3\\cos x+2\\sin x,\\quad f'(0)=3",
    },
    {
      title: "Worked example 3: e^x is its own slope",
      questionLatex: "f(x)=e^x+\\ln x.\\quad \\text{Find } f'(1).",
      steps: [
        {
          explanation:
            "Differentiate e^x. Because e is the base whose curve has slope equal to its own height, differentiating leaves e^x unchanged.",
          latex: "\\frac{d}{dx}(e^x)=e^x",
        },
        {
          explanation:
            "Differentiate ln x. As the mirror image of e^x, its slope is 1/x - steep for small x and flattening as x grows.",
          latex: "\\frac{d}{dx}(\\ln x)=\\frac{1}{x}",
        },
        {
          explanation: "Substitute x = 1 into the gradient function f'(x) = e^x + 1/x.",
          latex: "f'(1)=e^1+\\frac{1}{1}=e+1",
        },
        {
          explanation:
            "So the gradient at x = 1 is e + 1, about 3.72: the curve is climbing steeply through that point.",
          latex: "f'(1)=e+1\\approx 3.72",
        },
      ],
      finalAnswerLatex: "f'(1)=e+1\\approx 3.72",
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
    { mistake: "Differentiating cos x as +sin x, dropping the minus sign.", fix: "At x = 0 the cosine curve sits at a peak, so its slope must start at 0 and turn negative. Sine does the opposite, so d/dx(cos x) = -sin x, not sin x." },
    { mistake: "Differentiating ln x as 1/ln x.", fix: "This confuses 'reciprocal of the function' with 'derivative'. The slope of ln x is 1/x, which follows from ln x being the mirror image of e^x in y = x." },
    { mistake: "Changing e^x into x e^{x-1} with the power rule.", fix: "The power rule only applies when the variable is the base and the exponent is a constant. In e^x the variable is the exponent, so the rule does not apply; e^x is its own derivative." },
    { mistake: "Substituting the value before differentiating.", fix: "f(a) is a fixed number, whose derivative would be 0. Differentiate first to get the gradient function f'(x), then substitute x = a." },
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
  ],
  [
    { id: "diff-tech-std-d5-1", prompt: "$f(x) = x^2 + kx$ has $f'(3) = 10$. Find $k$.", latex: "f'(3) = 10", answer: "4", acceptedAnswers: ["k=4"], hint: "Differentiate, substitute $x = 3$, then solve for $k$.", explanation: "$f'(x) = 2x + k$, so $f'(3) = 6 + k = 10 \\Rightarrow k = 4$.", difficulty: 5 },
    { id: "diff-tech-std-d5-2", prompt: "Find the gradient of the tangent to $y = e^x$ at $x = 0$.", latex: "y = e^x", answer: "1", acceptedAnswers: [], hint: "The derivative of $e^x$ is $e^x$; evaluate at $x = 0$.", explanation: "$y' = e^x$, so the gradient at $x = 0$ is $e^0 = 1$.", difficulty: 5 },
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
      "A composite function is one process feeding into another: an outer function acts on the result of an inner function. Think of two meshed gears. Turn the input shaft and suppose the middle gear spins 3 times as fast; suppose the output gear then spins 4 times as fast as the middle gear. For every 1 turn of the input the middle gear makes 3 turns, and each of those drives the output 4 turns, so the output makes 3 times 4 = 12 turns. The two rates multiply. The chain rule is exactly this idea for curves: if the inside changes at one rate and the outside responds at another, the overall rate is the product of the two.",
      "Take y = (2x + 3)^5. To differentiate it we split the chain into two simple links: let u = 2x + 3 be the inner step, so the job becomes y = u^5. The mapping reads x -> u = 2x + 3 -> y = u^5. Each link is something we already know how to handle: the inner link 2x + 3 has slope 2, so it changes twice as fast as x, and the outer link u^5 has slope 5u^4 by the power rule. Composition is the only new layer; the individual derivatives are the standard ones from earlier lessons.",
      "Why do the two rates multiply rather than add? Over a small step a derivative is a ratio of changes, so dy/dx is close to the ratio of a small change in y to a small change in x, written Delta y / Delta x. We route that change through u by inserting Delta u on top and bottom: Delta y / Delta x = (Delta y / Delta u) times (Delta u / Delta x). The two Delta u factors cancel, so the identity holds exactly for any nonzero Delta u. Now let the step shrink: Delta y / Delta u tends to dy/du and Delta u / Delta x tends to du/dx, which gives dy/dx = (dy/du)(du/dx). The cancelling Delta u is the reason the rates multiply.",
      "In function notation, if y = f(g(x)) then the outer derivative f'(g(x)) plays the role of dy/du and the inner derivative g'(x) plays the role of du/dx, so dy/dx = f'(g(x)) g'(x). Every special case below is this one rule with a particular outer function: a power gives n(ax + b)^{n-1} times the inner derivative, sine gives cos(g(x)) times g'(x), e^{g(x)} reproduces itself times g'(x), and ln(g(x)) gives g'(x)/g(x). There is one idea to carry, not five formulas to memorise.",
      "The most common error is to differentiate the outer function and stop, forgetting the inner derivative; the gears picture guards against it, since leaving out a rate is like ignoring one of the meshed gears. A second error is mutating the inner expression while differentiating the outside, for example turning (2x + 3)^5 straight into (2)^5; the inside is carried along unchanged until the final multiplication. In NSW exams the chain rule sits inside tangents, rates of change and optimisation, where f'(a) is read as the gradient of the composite curve at x = a.",
    ],
    latexBlocks: [
      "\\frac{dy}{dx}\\approx\\frac{\\Delta y}{\\Delta x}=\\frac{\\Delta y}{\\Delta u}\\cdot\\frac{\\Delta u}{\\Delta x}\\;\\longrightarrow\\;\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}",
      "\\frac{d}{dx}f(g(x))=f'(g(x))\\,g'(x)",
      "\\frac{d}{dx}(ax+b)^n=n(ax+b)^{n-1}\\cdot a\\qquad \\frac{d}{dx}\\sin(g(x))=\\cos(g(x))\\,g'(x)",
      "\\frac{d}{dx}e^{g(x)}=e^{g(x)}g'(x)\\qquad \\frac{d}{dx}\\ln(g(x))=\\frac{g'(x)}{g(x)}",
    ],
  },
  [
    {
      title: "Power of a linear expression",
      questionLatex: "y=(2x+3)^5",
      steps: [
        {
          explanation:
            "Name the links. The inner function is the expression sitting inside the bracket, u = 2x + 3, and the outer function is the fifth power, y = u^5. The mapping is x -> u = 2x + 3 -> y = u^5.",
          latex: "u=2x+3,\\quad y=u^5",
        },
        {
          explanation:
            "Differentiate the outer link with the power rule, treating u as a single variable. Bringing down the 5 gives dy/du = 5u^4.",
          latex: "\\frac{dy}{du}=5u^4",
        },
        {
          explanation:
            "Differentiate the inner link on its own. The line 2x + 3 rises 2 units for every 1 unit of x, so du/dx = 2.",
          latex: "\\frac{du}{dx}=2",
        },
        {
          explanation:
            "Assemble the product dy/dx = (dy/du)(du/dx), then put u = 2x + 3 back so the answer is in terms of x.",
          latex: "\\frac{dy}{dx}=5u^4\\cdot 2=10(2x+3)^4",
        },
        {
          explanation:
            "Read the result as a gradient function: the composite climbs at 10(2x + 3)^4 at each x, always positive and steepest where 2x + 3 is large.",
        },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=10(2x+3)^4",
    },
    {
      title: "Exponential with a nonlinear inside",
      questionLatex: "y=e^{x^2}",
      steps: [
        {
          explanation:
            "Name the links. The inner function is what the exponential acts on, u = x^2, and the outer function is y = e^u. Here the inner derivative will not be a constant.",
          latex: "u=x^2,\\quad y=e^u",
        },
        {
          explanation:
            "Differentiate the outer link. The exponential is its own derivative, so dy/du = e^u.",
          latex: "\\frac{dy}{du}=e^u",
        },
        {
          explanation:
            "Differentiate the inner link with the power rule: du/dx = 2x.",
          latex: "\\frac{du}{dx}=2x",
        },
        {
          explanation:
            "Assemble the product and restore u = x^2. The inner derivative 2x is the factor that is easy to forget when the inside is not linear.",
          latex: "\\frac{dy}{dx}=e^u\\cdot 2x=2x\\,e^{x^2}",
        },
        {
          explanation:
            "The factor 2x makes the gradient 0 at x = 0 and steeply positive for large x, matching the way e^{x^2} is flat at its base and then rises sharply.",
        },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=2x\\,e^{x^2}",
    },
    {
      title: "Logarithmic composite",
      questionLatex: "y=\\ln(5x+2)",
      steps: [
        {
          explanation:
            "Name the links. The inner function is the argument of the log, u = 5x + 2, and the outer function is y = ln u.",
          latex: "u=5x+2,\\quad y=\\ln u",
        },
        {
          explanation:
            "Differentiate the outer link. The slope of ln u is 1/u.",
          latex: "\\frac{dy}{du}=\\frac{1}{u}",
        },
        {
          explanation:
            "Differentiate the inner link: du/dx = 5.",
          latex: "\\frac{du}{dx}=5",
        },
        {
          explanation:
            "Assemble the product explicitly and restore u = 5x + 2. This is the multiplication step that is easy to skip, which would leave the answer as 1/(5x + 2) and lose the factor of 5.",
          latex: "\\frac{dy}{dx}=\\frac{1}{u}\\cdot 5=\\frac{5}{5x+2}",
        },
        {
          explanation:
            "The gradient 5/(5x + 2) is positive and shrinks as x grows, so the curve always rises but flattens out, just as ln does.",
        },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=\\frac{5}{5x+2}",
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
    { mistake: "Forgetting the inner derivative.", fix: "The chain rule is two rates multiplied, so leaving out g'(x) drops one of the meshed gears and the rate comes out wrong. After differentiating the outer function, multiply by the derivative of the inside." },
    { mistake: "Changing the inner expression while differentiating the outer function.", fix: "The inside is carried along unchanged, like a label, and is only differentiated in its own separate link. Leave (2x + 3) in place until the final multiplication rather than turning it into a number." },
    { mistake: "Missing the negative sign when differentiating cos of an expression.", fix: "The minus comes from the outer derivative: the slope of cos is -sin, so the chain rule gives -sin(g(x))g'(x), not sin(g(x))g'(x)." },
    { mistake: "Using the product rule for every expression with brackets.", fix: "A product rule is for two functions multiplied; a function inside another function is a composition and needs the chain rule. Check whether the brackets hold a separate factor or an argument fed into an outer function." },
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
  ],
  [
    { id: "diff-tech-chain-d5-1", prompt: "Find $\\frac{dy}{dx}$ for $y = (2x+1)^3$ at $x = 0$.", latex: "y = (2x+1)^3", answer: "6", acceptedAnswers: [], hint: "Chain rule: bring down the power, then multiply by the derivative of the inside.", explanation: "$\\frac{dy}{dx} = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$; at $x = 0$ this is $6$.", difficulty: 5 },
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
      "When two functions are multiplied, the tempting shortcut is to multiply their derivatives, and it is wrong. Sense-check it on something we already know: x times x^2 is x^3, whose derivative is 3x^2. But multiplying the separate derivatives gives 1 times 2x = 2x, which is not 3x^2. Multiplying functions does not multiply their rates of change, so a product needs its own rule.",
      "Here is a picture that survives forgetting the formula. Think of the product uv as the area of a rectangle with width u and height v. As x increases a little, the width grows by a small amount Delta u and the height grows by Delta v. The area gains a thin vertical strip down one side (height v, width Delta u) and a thin horizontal strip along the other (width u, height Delta v), plus a tiny corner square of size Delta u by Delta v. Each side that grows adds one strip, which is why two terms appear: the rate of change of a product collects one contribution from each factor changing while the other is held fixed.",
      "Turning the picture into algebra gives the derivation. The change in area is Delta(uv) = u Delta v + v Delta u + Delta u Delta v. Divide every term by Delta x, then let the step shrink to zero. The corner term Delta u Delta v / Delta x carries an extra shrinking factor and vanishes, while Delta v / Delta x tends to v' and Delta u / Delta x tends to u'. What is left is (uv)' = u'v + uv', the product rule: differentiate one factor at a time and keep the other unchanged.",
      "The quotient rule is not a new mystery; it is the product rule wearing a disguise. Write the quotient f/g as the product f times g^{-1}. The product rule gives (f g^{-1})' = f' g^{-1} + f (g^{-1})', and the chain rule from the previous lesson differentiates g^{-1} as -g^{-2} g'. Substituting and putting everything over the common denominator g^2 gives (f/g)' = (f'g - fg')/g^2. The numerator order f'g - fg' is fixed by this derivation, so it is not arbitrary to remember.",
      "Two mistakes follow from skipping the reasoning. Writing the product rule as f'g' drops a whole strip from the rectangle, so the rate comes out too small; the cure is to remember that each growing side adds a term. Reversing the quotient numerator to fg' - f'g flips every sign, because the derivation fixed which factor is differentiated first. In NSW exams these rules sit inside tangents, rates and stationary points, where a correctly assembled derivative usually earns the marks before any simplification.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}(x\\cdot x^2)=\\frac{d}{dx}x^3=3x^2\\neq 1\\cdot 2x",
      "\\Delta(uv)=u\\,\\Delta v+v\\,\\Delta u+\\Delta u\\,\\Delta v\\;\\longrightarrow\\;(uv)'=u'v+uv'",
      "\\frac{d}{dx}\\left(\\frac{f}{g}\\right)=\\frac{d}{dx}\\left(f\\,g^{-1}\\right)=\\frac{f'g-fg'}{g^2}",
    ],
  },
  [
    {
      title: "Use the product rule",
      questionLatex: "y=x\\sin x",
      steps: [
        {
          explanation:
            "Both x and sin x change as x moves, so this is a product of two varying functions, not a single standard derivative. Name the factors f = x and g = sin x; the labels can be swapped, provided each factor keeps its own derivative.",
          latex: "f=x,\\quad g=\\sin x",
        },
        {
          explanation:
            "Differentiate each factor on its own. The line x has slope 1, and the derivative of sin x is cos x.",
          latex: "f'=1,\\quad g'=\\cos x",
        },
        {
          explanation:
            "Assemble f'g + fg'. The first term is the strip from x growing (rate 1 times the current height sin x); the second is the strip from sin x growing (current width x times rate cos x).",
          latex: "y'=1\\cdot\\sin x+x\\cos x",
        },
      ],
      finalAnswerLatex: "\\sin x+x\\cos x",
    },
    {
      title: "Use the quotient rule",
      questionLatex: "y=\\frac{e^x}{x}",
      steps: [
        {
          explanation:
            "A function divided by a function calls for the quotient rule. Take f as the top, e^x, and g as the bottom, x; the rule differentiates the top first, so getting these the right way round matters.",
          latex: "f=e^x,\\quad g=x",
        },
        {
          explanation:
            "Differentiate top and bottom separately. The exponential is its own derivative, and x has slope 1.",
          latex: "f'=e^x,\\quad g'=1",
        },
        {
          explanation:
            "Apply (f'g - fg')/g^2: derivative of the top times the bottom, minus the top times the derivative of the bottom, all over the bottom squared.",
          latex: "y'=\\frac{e^x\\cdot x-e^x\\cdot 1}{x^2}=\\frac{e^x(x-1)}{x^2}",
        },
        {
          explanation:
            "Read the result as a gradient function. The numerator e^x(x - 1) is zero at x = 1, so the curve is momentarily flat there, which marks a stationary point of e^x / x.",
        },
      ],
      finalAnswerLatex: "\\frac{e^x(x-1)}{x^2}",
    },
    {
      title: "Evaluate and interpret a product-rule derivative",
      questionLatex: "y=x e^x.\\quad \\text{Find the gradient at }x=0.",
      steps: [
        {
          explanation:
            "This is a product of f = x and g = e^x, both varying, so use the product rule.",
          latex: "f=x,\\quad g=e^x",
        },
        {
          explanation:
            "Assemble f'g + fg' with f' = 1 and g' = e^x, then factor the common e^x.",
          latex: "y'=1\\cdot e^x+x e^x=e^x(1+x)",
        },
        {
          explanation:
            "Substitute x = 0, using e^0 = 1.",
          latex: "y'(0)=e^0(1+0)=1",
        },
        {
          explanation:
            "Interpret the value. The curve passes through the origin, and a gradient of 1 there means it leaves the origin along the line y = x, climbing at 45 degrees.",
        },
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
    { mistake: "Writing the product rule as f'g'.", fix: "This copies the shortcut that works for sums, but a product of rates is not the rate of a product: x times x^2 has derivative 3x^2, not 1 times 2x. In the rectangle picture, f'g' is a single corner, not the two strips. Use f'g + fg', one term for each factor that grows." },
    { mistake: "Reversing the quotient-rule numerator to fg' - f'g.", fix: "The order is not a free choice; the derivation from f times g^{-1} fixes the derivative of the top to come first. Swapping the terms flips every sign, so keep f'g - fg', all over g squared." },
    { mistake: "Using the quotient rule when a simpler product rewrite is obvious but then losing signs.", fix: "A quotient can be rewritten as a product with a negative power, which has only plus signs and fewer chances to drop a sign. Choose the rule deliberately and keep the structure visible." },
    { mistake: "Over-simplifying and making algebra errors.", fix: "Marks are awarded for a correct derivative, and forced simplification is where signs and factors get lost. A correct unsimplified derivative is often safer than a flawed tidy one." },
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
      "Every question in this lesson is really one of four familiar questions from MA-C1, just asked about harder functions. How steep is the curve here? What line cuts across it at right angles? How fast is something changing? Where does the curve go momentarily flat? The mathematics of the application has not changed at all. What changes is the one step in the middle, finding the gradient function: because the curve is now built from a chain, a product or a quotient, you reach for the chain, product or quotient rule to differentiate, and then carry on exactly as you did before.",
      "Start with tangents and normals. The tangent gradient is just the curve's instantaneous steepness at a point, so you differentiate to get the gradient function and substitute the x-value to read off the slope there. The normal is the line through the same point at right angles to the tangent, like a kerb running straight across a bending road. From MA-C1, perpendicular gradients multiply to -1, so once you know the tangent gradient $m_T$ (and it is not zero) the normal gradient is its negative reciprocal $m_N=-\\frac{1}{m_T}$. If a chain-rule derivative gives $m_T=2$ at the point, the normal gradient is $-\\tfrac{1}{2}$: a line falling one unit for every two across, crossing the tangent at a right angle. You are not memorising a new rule here, you are recalling the perpendicular-gradients fact and feeding it a gradient that happened to come from a chain or product rule.",
      "A rate of change is the same derivative wearing a different hat. When $y$ depends on time, $\\frac{dy}{dt}$ measures how fast $y$ is changing at an instant, and its sign gives the direction: positive means growing, negative means shrinking. The number means nothing without its units and context. For a tank holding $V(t)$ litres after $t$ minutes, $\\frac{dV}{dt}=-10$ does not say '$-10$', it says the water is draining at 10 litres per minute right now. These models are often exponential or trigonometric, so the chain rule does the differentiating, but the interpretation step, attaching the units and reading the sign, is what the marks are for.",
      "A stationary point is the spot where the curve is momentarily flat, neither rising nor falling, like the top of a hill or the bottom of a valley. Flat means zero gradient, so we find these points by solving $f'(x)=0$, again recalling MA-C1 rather than learning something new. The twist now is that $f'(x)$ often comes out as a product, such as $e^x(x+1)$. To solve a product equal to zero you set each factor to zero, but check each factor first: $e^x$ is positive for every $x$ and can never be zero, so it is discarded and only $x+1=0$ matters, giving $x=-1$. That reasoning about the factors, not just 'solve the equation', is where these harder functions earn their place.",
      "Three slips cause most lost marks, and each one confuses two related quantities. Reading the $y$-value off as the gradient confuses height with steepness: the tangent gradient is $f'(a)$, never $f(a)$, because the derivative reports slope and not position. Forgetting the negative reciprocal confuses the tangent with the normal: the perpendicular line has gradient $-\\frac{1}{m_T}$, not $m_T$. Solving $f(x)=0$ instead of $f'(x)=0$ confuses the curve being zero with the gradient being zero; only zero gradient makes the curve flat. In NSW exams these appear as 'find the equation of the tangent or normal', 'find the rate of change at this instant', and 'find the stationary points', almost always on a composite, product or quotient so that a derivative rule from this module is needed first.",
    ],
    latexBlocks: [
      "m_{\\text{tangent}}=f'(a)\\quad\\text{(differentiate, then substitute }x=a)",
      "m_{\\text{normal}}=-\\frac{1}{m_{\\text{tangent}}}\\;(m_{\\text{tangent}}\\ne 0)\\quad\\text{since}\\;m_T\\,m_N=-1",
      "\\frac{dy}{dt}>0\\;\\text{growing},\\quad \\frac{dy}{dt}<0\\;\\text{shrinking},\\quad \\frac{dy}{dt}=0\\;\\text{momentarily steady}",
      "f'(x)=0\\Rightarrow\\text{curve momentarily flat};\\quad e^x(x+1)=0\\Rightarrow x=-1\\;(e^x\\ne 0)",
    ],
  },
  [
    {
      title: "Tangent and normal using a chain-rule derivative",
      questionLatex: "y=(2x-1)^4.\\quad \\text{Find the tangent and normal gradients at }x=1.",
      steps: [
        {
          explanation:
            "The tangent gradient is the curve's steepness, which is the gradient function evaluated at the point. The curve is a power of an inner expression $2x-1$, a composite, so the chain rule is the right tool: differentiate the outer power and multiply by the derivative of the inside.",
          latex: "y'=4(2x-1)^3\\cdot 2=8(2x-1)^3",
        },
        {
          explanation:
            "Substitute $x=1$ because we want the gradient at that one point, not everywhere. This number is the tangent's slope.",
          latex: "m_T=8(2\\cdot 1-1)^3=8",
        },
        {
          explanation:
            "The normal is perpendicular to the tangent, and perpendicular gradients multiply to $-1$, so the normal gradient is the negative reciprocal of $m_T$.",
          latex: "m_N=-\\frac{1}{m_T}=-\\frac{1}{8}",
        },
      ],
      finalAnswerLatex:
        "m_T=8\\;\\text{(steep, rising)},\\quad m_N=-\\tfrac{1}{8}\\;\\text{(gentle, crossing at a right angle)}",
    },
    {
      title: "Rate of change in context",
      questionLatex:
        "\\text{A cup of tea cools so that }T(t)=20+70e^{-0.1t}\\text{ degrees after }t\\text{ minutes.}\\\\\\text{Find the rate of change of temperature at }t=0.",
      steps: [
        {
          explanation:
            "A rate of change is a derivative, so differentiate $T$ with respect to time. The constant $20$ differentiates to $0$, and $70e^{-0.1t}$ is composite, so the chain rule brings down the inner derivative $-0.1$.",
          latex: "T'(t)=70\\cdot(-0.1)e^{-0.1t}=-7e^{-0.1t}",
        },
        {
          explanation:
            "Substitute $t=0$ to get the instantaneous rate at the start, since the question asks for the rate at that one moment.",
          latex: "T'(0)=-7e^{0}=-7",
        },
        {
          explanation:
            "Interpret the number with units and sign. The value is a temperature change per minute, and the negative sign means the temperature is falling: the tea is cooling at 7 degrees per minute at that instant.",
          latex: "T'(0)=-7\\;^{\\circ}\\text{C per minute}",
        },
      ],
      finalAnswerLatex:
        "-7\\;^{\\circ}\\text{C per minute (cooling at }t=0)",
    },
    {
      title: "Stationary point of a product model",
      questionLatex: "f(x)=x e^x.\\quad \\text{Find the }x\\text{-value of the stationary point.}",
      steps: [
        {
          explanation:
            "A stationary point is where the curve is momentarily flat, so its gradient is zero and we need $f'(x)=0$. First differentiate: $f$ is a product of $x$ and $e^x$, so use the product rule.",
          latex: "f'(x)=1\\cdot e^x+x\\cdot e^x=e^x(1+x)",
        },
        {
          explanation:
            "Set the gradient to zero. The factor $e^x$ is positive for every $x$, so it can never be zero and is discarded; only the other factor can make the product zero.",
          latex: "e^x(1+x)=0\\quad\\Rightarrow\\quad 1+x=0",
        },
        {
          explanation:
            "Solve for $x$. This is the single value where the curve $y=xe^x$ has a horizontal tangent, its one flat instant.",
          latex: "x=-1",
        },
      ],
      finalAnswerLatex: "x=-1\\;\\text{(horizontal tangent, the curve is momentarily flat here)}",
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
    { mistake: "Using the function value as the tangent gradient.", fix: "The derivative reports steepness, not height, so the tangent gradient is f'(a); the y-value f(a) only locates the point." },
    { mistake: "Forgetting to use the negative reciprocal for a normal.", fix: "A normal is perpendicular to the tangent, and perpendicular gradients multiply to -1, so its gradient is -1/m_T, not m_T." },
    { mistake: "Solving f(x) = 0 instead of f'(x) = 0 for stationary points.", fix: "f(x)=0 finds where the curve meets the x-axis; only f'(x)=0 finds where the gradient vanishes and the curve is flat." },
    { mistake: "Giving a rate without units or context.", fix: "A bare number is meaningless: attach the units and read the sign, e.g. -10 means draining at 10 litres per minute." },
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
  ],
  [
    { id: "diff-tech-app-d5-1", prompt: "Find the $x$-coordinate of the stationary point of $y = x^2 - 8x$.", latex: "y = x^2 - 8x", answer: "4", acceptedAnswers: ["x=4"], hint: "Set the derivative equal to zero.", explanation: "$y' = 2x - 8 = 0 \\Rightarrow x = 4$.", difficulty: 5 },
    { id: "diff-tech-app-d5-2", prompt: "For what values of $x$ is $y = x^2 - 6x$ decreasing?", latex: "y = x^2 - 6x", answer: "x<3", acceptedAnswers: ["x < 3"], hint: "The function decreases where its derivative is negative.", explanation: "$y' = 2x - 6 < 0 \\Rightarrow x < 3$.", difficulty: 5 },
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
  ],
  [
    { id: "diff-tech-exam-d5-1", prompt: "A particle has position $x = t^2 - 4t$. Find the time when its velocity is zero.", latex: "x = t^2 - 4t", answer: "2", acceptedAnswers: ["t=2", "2 s"], hint: "Velocity is the derivative of position; set it to zero.", explanation: "$v = \\frac{dx}{dt} = 2t - 4 = 0 \\Rightarrow t = 2$.", difficulty: 5 },
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
