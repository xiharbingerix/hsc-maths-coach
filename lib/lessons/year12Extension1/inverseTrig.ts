import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function inverseTrigChoice(
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
    hint: "Think about the restricted range of the inverse function before choosing the angle.",
    explanation,
  };
}

function inverseTrigTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Use exact values and keep the answer in the principal range.",
    explanation,
  };
}

const base = {
  masteryPassMark: 0.8,
};

const inverseSineCosine: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Understand why sine and cosine need restricted domains before inverse functions exist, then evaluate and sketch arcsine and arccosine.",
  learningIntention:
    "Use the principal ranges of arcsin and arccos to evaluate exact inverse trigonometric values and describe graph features.",
  successCriteria: [
    "Explain why sine and cosine are restricted before forming inverse functions.",
    "State the domain and range of $y=\\arcsin x$.",
    "State the domain and range of $y=\\arccos x$.",
    "Evaluate exact inverse sine and inverse cosine values in their principal ranges.",
    "Describe key graph features of arcsine and arccosine.",
  ],
  teaching: {
    paragraphs: [
      "An inverse function must give one output for each input. The full sine and cosine graphs fail this because the same y-value happens many times.",
      "To make inverse sine, we restrict sine to $[-\\frac{\\pi}{2},\\frac{\\pi}{2}]$. That interval captures every sine value from -1 to 1 exactly once.",
      "To make inverse cosine, we restrict cosine to $[0,\\pi]$. That interval also covers every cosine value from -1 to 1 exactly once.",
      "The input of arcsin or arccos is a ratio, so it must lie between -1 and 1. The output is an angle in the selected principal range.",
    ],
    latexBlocks: [
      "y=\\arcsin x:\\quad \\text{domain }[-1,1],\\quad \\text{range }\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]",
      "y=\\arccos x:\\quad \\text{domain }[-1,1],\\quad \\text{range }[0,\\pi]",
      "\\arcsin\\left(\\frac12\\right)=\\frac{\\pi}{6},\\quad \\arccos\\left(\\frac12\\right)=\\frac{\\pi}{3}",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate an exact arcsine value",
      questionLatex: "\\arcsin\\left(\\frac12\\right)",
      steps: [
        {
          explanation:
            "Ask which angle in the arcsin range has sine equal to 1/2.",
          latex:
            "\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12",
        },
        {
          explanation:
            "The angle $\\frac{\\pi}{6}$ lies inside $[-\\frac{\\pi}{2},\\frac{\\pi}{2}]$, so it is the principal value.",
        },
      ],
      finalAnswerLatex: "\\frac{\\pi}{6}",
    },
    {
      title: "Evaluate an exact arccosine value",
      questionLatex: "\\arccos\\left(-\\frac12\\right)",
      steps: [
        {
          explanation:
            "Ask which angle in the arccos range has cosine equal to -1/2.",
          latex:
            "\\cos\\left(\\frac{2\\pi}{3}\\right)=-\\frac12",
        },
        {
          explanation:
            "The angle $\\frac{2\\pi}{3}$ lies in $[0,\\pi]$, so it is allowed for arccos.",
        },
      ],
      finalAnswerLatex: "\\frac{2\\pi}{3}",
    },
    {
      title: "Sketch inverse sine and inverse cosine features",
      questionLatex:
        "\\text{State key endpoints and ranges for }y=\\arcsin x\\text{ and }y=\\arccos x.",
      steps: [
        {
          explanation:
            "For arcsin, the graph runs from $(-1,-\\frac{\\pi}{2})$ through $(0,0)$ to $(1,\\frac{\\pi}{2})$.",
          latex:
            "(-1,-\\frac{\\pi}{2}),\\quad (0,0),\\quad (1,\\frac{\\pi}{2})",
        },
        {
          explanation:
            "For arccos, the graph decreases from $(-1,\\pi)$ through $(0,\\frac{\\pi}{2})$ to $(1,0)$.",
          latex:
            "(-1,\\pi),\\quad (0,\\frac{\\pi}{2}),\\quad (1,0)",
        },
      ],
      finalAnswerLatex:
        "\\arcsin x\\text{ increases; }\\arccos x\\text{ decreases on }[-1,1].",
    },
  ],
  guidedPractice: [
    inverseTrigTyped("y12e1-invsc-g1", "Evaluate the exact value.", "\\arcsin(0)", "0", ["0 radians"], "The angle in the arcsin range with sine 0 is 0."),
    inverseTrigTyped("y12e1-invsc-g2", "Evaluate the exact value.", "\\arccos(1)", "0", ["0 radians"], "The angle in [0, pi] with cosine 1 is 0."),
    inverseTrigChoice("y12e1-invsc-g3", "What is the domain of $y=\\arcsin x$?", "A", ["[-1,1]", "All real numbers", "[0,pi]", "[-pi,pi]"], "The input is a sine ratio, so it must be between -1 and 1."),
    inverseTrigChoice("y12e1-invsc-g4", "What is the range of $y=\\arccos x$?", "B", ["[-pi/2,pi/2]", "[0,pi]", "All real numbers", "[-1,1]"], "Arccos returns angles from 0 to pi."),
  ],
  independentPractice: [
    inverseTrigTyped("y12e1-invsc-i1", "Evaluate the exact value.", "\\arcsin\\left(-\\frac12\\right)", "-pi/6", ["-\\pi/6", "- pi/6"], "The arcsin range includes negative angles, and sine(-pi/6) = -1/2."),
    inverseTrigTyped("y12e1-invsc-i2", "Evaluate the exact value.", "\\arccos\\left(\\frac12\\right)", "pi/3", ["\\pi/3", "pi / 3"], "Cosine is 1/2 at pi/3 inside the arccos range."),
    inverseTrigChoice("y12e1-invsc-i3", "Why do we restrict sine before defining arcsin?", "C", ["To make the graph longer", "To remove exact values", "To make each output occur once", "To make all angles positive"], "An inverse function needs one output for each input."),
    inverseTrigChoice("y12e1-invsc-i4", "Which point lies on $y=\\arcsin x$?", "D", ["(pi/6,1/2)", "(1/2,pi/3)", "(0,pi/2)", "(1/2,pi/6)"], "The input is the ratio 1/2 and the output is the angle pi/6."),
    inverseTrigChoice("y12e1-invsc-i5", "Which graph description matches $y=\\arccos x$?", "A", ["Decreases from pi to 0 on [-1,1]", "Increases from -pi/2 to pi/2 on all real x", "Has vertical asymptotes", "Has domain all real numbers"], "Arccos has domain [-1,1] and range [0,pi]."),
  ],
  commonMistakes: [
    {
      mistake: "Using every possible angle with the same sine or cosine value.",
      fix: "Inverse trig returns the principal angle in the restricted range.",
    },
    {
      mistake: "Swapping domain and range.",
      fix: "For arcsin and arccos, the input domain is [-1,1]; the output range is an angle interval.",
    },
    {
      mistake: "Giving a negative answer for arccos.",
      fix: "Arccos values must lie in $[0,\\pi]$.",
    },
    {
      mistake: "Entering ratios outside [-1,1] into arcsin or arccos.",
      fix: "Sine and cosine ratios cannot be less than -1 or greater than 1.",
    },
  ],
  masteryQuiz: [
    inverseTrigTyped("y12e1-invsc-m1", "Evaluate.", "\\arcsin\\left(\\frac12\\right)", "pi/6", ["\\pi/6"], "The principal angle with sine 1/2 is pi/6."),
    inverseTrigTyped("y12e1-invsc-m2", "Evaluate.", "\\arccos\\left(-\\frac12\\right)", "2pi/3", ["2\\pi/3", "2 pi/3"], "Cosine is -1/2 at 2pi/3 in the arccos range."),
    inverseTrigChoice("y12e1-invsc-m3", "The range of arcsin is:", "A", ["[-pi/2,pi/2]", "[0,pi]", "[-1,1]", "All real numbers"], "Arcsin returns angles between -pi/2 and pi/2."),
    inverseTrigChoice("y12e1-invsc-m4", "The range of arccos is:", "B", ["[-pi/2,pi/2]", "[0,pi]", "[-1,1]", "All real numbers"], "Arccos returns angles between 0 and pi."),
    inverseTrigTyped("y12e1-invsc-m5", "Evaluate.", "\\arcsin(-1)", "-pi/2", ["-\\pi/2"], "The endpoint of the arcsin range with sine -1 is -pi/2."),
    inverseTrigTyped("y12e1-invsc-m6", "Evaluate.", "\\arccos(0)", "pi/2", ["\\pi/2"], "Cosine is zero at pi/2 in [0,pi]."),
    inverseTrigChoice("y12e1-invsc-m7", "Which input is not allowed for arcsin?", "D", ["-1", "0", "1/2", "2"], "The input must be in [-1,1]."),
    inverseTrigChoice("y12e1-invsc-m8", "Which point lies on arccos?", "C", ["(pi/3,1/2)", "(1/2,pi/6)", "(1/2,pi/3)", "(pi/2,0)"], "Arccos(1/2)=pi/3, so input first, output second."),
    inverseTrigChoice("y12e1-invsc-m9", "Why is $\\arcsin(1/2)$ not $5\\pi/6$?", "A", ["5pi/6 is outside the arcsin principal range", "5pi/6 has cosine 1/2", "arcsin has no exact values", "1/2 is outside the domain"], "Arcsin chooses the principal angle between -pi/2 and pi/2."),
    inverseTrigChoice("y12e1-invsc-m10", "Which inverse trig graph has domain [-1,1] and decreases?", "B", ["arcsin", "arccos", "arctan", "tan"], "Arccos decreases from pi to 0."),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-invsc-pool-d5-1",
      prompt: "Evaluate arcsin(√2/2).",
      latex: "\\arcsin\\left(\\tfrac{\\sqrt{2}}{2}\\right)",
      answer: "pi/4",
      acceptedAnswers: ["\\pi/4", "π/4"],
      hint: "Find the principal angle in [−π/2, π/2] whose sine is √2/2.",
      explanation: "sin(π/4) = √2/2 and π/4 is in the arcsin range, so arcsin(√2/2) = π/4.",
      difficulty: 5,
    },
    {
      id: "y12e1-invsc-pool-d5-2",
      prompt: "Evaluate arccos(1/2).",
      latex: "\\arccos\\left(\\tfrac{1}{2}\\right)",
      answer: "pi/3",
      acceptedAnswers: ["\\pi/3", "π/3"],
      hint: "Find the angle in [0, π] whose cosine is 1/2.",
      explanation: "cos(π/3) = 1/2 and π/3 is in the arccos range, so arccos(1/2) = π/3.",
      difficulty: 5,
    },
  ],
};

const inverseTangent: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Evaluate and interpret arctangent, including its domain, range, asymptotes and triangle-angle applications.",
  learningIntention:
    "Use $y=\\arctan x$ to find principal tangent angles and express triangle angles with inverse trig values.",
  successCriteria: [
    "State the domain and range of $y=\\arctan x$.",
    "Identify the horizontal asymptotes of the arctangent graph.",
    "Evaluate exact arctangent values.",
    "Express angles in right triangles using inverse trig functions.",
  ],
  teaching: {
    paragraphs: [
      "Tangent can take every real value, so arctan accepts every real input. Its output is restricted to angles between $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$.",
      "The arctan graph increases forever but levels off towards horizontal asymptotes. It approaches $\\frac{\\pi}{2}$ and $-\\frac{\\pi}{2}$ but never reaches them.",
      "Exact arctan values come from exact tangent values. For example, tangent of $\\frac{\\pi}{4}$ is 1.",
      "In triangles, inverse trig is used when a ratio is known and the angle is unknown.",
    ],
    latexBlocks: [
      "y=\\arctan x:\\quad \\text{domain }\\mathbb{R},\\quad \\text{range }\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)",
      "\\arctan(1)=\\frac{\\pi}{4},\\quad \\arctan(-\\sqrt3)=-\\frac{\\pi}{3}",
      "\\theta=\\arctan\\left(\\frac{\\text{opposite}}{\\text{adjacent}}\\right)",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate $\\arctan(1)$",
      questionLatex: "\\arctan(1)",
      steps: [
        {
          explanation:
            "Ask which angle in the arctan range has tangent equal to 1.",
          latex: "\\tan\\left(\\frac{\\pi}{4}\\right)=1",
        },
        {
          explanation:
            "The angle $\\frac{\\pi}{4}$ lies in $(-\\frac{\\pi}{2},\\frac{\\pi}{2})$.",
        },
      ],
      finalAnswerLatex: "\\frac{\\pi}{4}",
    },
    {
      title: "Evaluate $\\arctan(-\\sqrt3)$",
      questionLatex: "\\arctan(-\\sqrt3)",
      steps: [
        {
          explanation:
            "Tangent is $\\sqrt3$ at $\\frac{\\pi}{3}$, so the negative value gives the negative principal angle.",
          latex:
            "\\tan\\left(-\\frac{\\pi}{3}\\right)=-\\sqrt3",
        },
        {
          explanation:
            "The answer is inside the arctan principal range.",
        },
      ],
      finalAnswerLatex: "-\\frac{\\pi}{3}",
    },
    {
      title: "Express triangle angles using inverse trig",
      questionLatex:
        "\\text{A right triangle has opposite side }5\\text{ and adjacent side }12\\text{ to angle }\\theta.\\text{ Express }\\theta.",
      steps: [
        {
          explanation:
            "The known sides are opposite and adjacent, so tangent is the matching ratio.",
          latex: "\\tan\\theta=\\frac{5}{12}",
        },
        {
          explanation:
            "Use inverse tangent to turn the ratio into an angle.",
          latex: "\\theta=\\arctan\\left(\\frac{5}{12}\\right)",
        },
      ],
      finalAnswerLatex: "\\theta=\\arctan\\left(\\frac{5}{12}\\right)",
    },
  ],
  guidedPractice: [
    inverseTrigTyped("y12e1-invtan-g1", "Evaluate.", "\\arctan(0)", "0", ["0 radians"], "The angle with tangent 0 in the arctan range is 0."),
    inverseTrigTyped("y12e1-invtan-g2", "Evaluate.", "\\arctan(1)", "pi/4", ["\\pi/4"], "Tangent pi/4 equals 1."),
    inverseTrigChoice("y12e1-invtan-g3", "What is the domain of arctan?", "C", ["[-1,1]", "[0,pi]", "All real numbers", "Only positive real numbers"], "Tangent outputs all real values, so arctan accepts all real inputs."),
    inverseTrigChoice("y12e1-invtan-g4", "The horizontal asymptotes of arctan are:", "A", ["$y=\\pm\\frac{\\pi}{2}$", "$x=\\pm\\frac{\\pi}{2}$", "$y=\\pm1$", "$x=\\pm1$"], "The graph approaches its range endpoints as horizontal lines."),
  ],
  independentPractice: [
    inverseTrigTyped("y12e1-invtan-i1", "Evaluate.", "\\arctan(-1)", "-pi/4", ["-\\pi/4"], "The principal angle with tangent -1 is -pi/4."),
    inverseTrigTyped("y12e1-invtan-i2", "Evaluate.", "\\arctan(\\sqrt3)", "pi/3", ["\\pi/3"], "Tangent pi/3 equals sqrt(3)."),
    inverseTrigChoice("y12e1-invtan-i3", "What is the range of arctan?", "D", ["[-1,1]", "[0,pi]", "All real numbers", "(-pi/2,pi/2)"], "Arctan returns angles strictly between -pi/2 and pi/2."),
    inverseTrigChoice("y12e1-invtan-i4", "A triangle question gives opposite and adjacent sides. Which inverse trig function is most direct?", "B", ["arcsin", "arctan", "arccos", "arccos then arcsin"], "Tangent connects opposite and adjacent."),
    inverseTrigTyped("y12e1-invtan-i5", "Express the angle.", "\\tan\\theta=\\frac{3}{7}", "arctan(3/7)", ["\\arctan(3/7)", "tan^-1(3/7)"], "Use inverse tangent to undo tangent."),
  ],
  commonMistakes: [
    {
      mistake: "Using a closed range for arctan.",
      fix: "Arctan approaches $\\pm\\frac{\\pi}{2}$ but never reaches them, so the range is open.",
    },
    {
      mistake: "Forgetting the sign of arctan.",
      fix: "A negative input gives a negative angle in the principal range.",
    },
    {
      mistake: "Writing vertical asymptotes for arctan.",
      fix: "Arctan has horizontal asymptotes $y=\\pm\\frac{\\pi}{2}$.",
    },
    {
      mistake: "Choosing inverse sine when opposite and adjacent are given.",
      fix: "Opposite over adjacent is tangent, so use arctan.",
    },
  ],
  masteryQuiz: [
    inverseTrigTyped("y12e1-invtan-m1", "Evaluate.", "\\arctan(1)", "pi/4", ["\\pi/4"], "tan(pi/4)=1."),
    inverseTrigTyped("y12e1-invtan-m2", "Evaluate.", "\\arctan(-\\sqrt3)", "-pi/3", ["-\\pi/3"], "tan(-pi/3)=-sqrt(3)."),
    inverseTrigChoice("y12e1-invtan-m3", "The domain of arctan is:", "A", ["All real numbers", "[-1,1]", "[0,pi]", "Only integers"], "Arctan can accept any real input."),
    inverseTrigChoice("y12e1-invtan-m4", "The range of arctan is:", "B", ["[-pi/2,pi/2]", "(-pi/2,pi/2)", "[0,pi]", "[-1,1]"], "The endpoints are not included."),
    inverseTrigChoice("y12e1-invtan-m5", "Which graph feature belongs to arctan?", "C", ["Vertical asymptotes at x=+-1", "Domain [-1,1]", "Horizontal asymptotes at y=+-pi/2", "Maximum value 1"], "Arctan levels off at its range endpoints."),
    inverseTrigTyped("y12e1-invtan-m6", "Evaluate.", "\\arctan(-1)", "-pi/4", ["-\\pi/4"], "The negative input gives the negative principal angle."),
    inverseTrigTyped("y12e1-invtan-m7", "Express the angle.", "\\frac{\\text{opposite}}{\\text{adjacent}}=\\frac{5}{12}", "arctan(5/12)", ["\\arctan(5/12)", "tan^-1(5/12)"], "Use inverse tangent for opposite over adjacent."),
    inverseTrigChoice("y12e1-invtan-m8", "Which exact value is correct?", "D", ["arctan(1)=pi/2", "arctan(0)=pi", "arctan(sqrt3)=pi/6", "arctan(sqrt3)=pi/3"], "tan(pi/3)=sqrt(3)."),
    inverseTrigChoice("y12e1-invtan-m9", "Why is $\\arctan(\\sqrt3)$ not $4\\pi/3$?", "A", ["4pi/3 is outside the principal range", "sqrt3 is outside the domain", "arctan only takes negative values", "tan(4pi/3)=0"], "Arctan returns an angle between -pi/2 and pi/2."),
    inverseTrigChoice("y12e1-invtan-m10", "Combining arcsin, arccos and arctan in triangle problems means:", "C", ["Always use arcsin", "Ignore the side labels", "Choose the inverse function matching the known ratio", "Always use arctan because its domain is largest"], "The side ratio decides the inverse trig function."),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-invtan-pool-d5-1",
      prompt: "Evaluate arctan(1).",
      latex: "\\arctan(1)",
      answer: "pi/4",
      acceptedAnswers: ["\\pi/4", "π/4"],
      hint: "Find the angle in (−π/2, π/2) whose tangent is 1.",
      explanation: "tan(π/4) = 1 and π/4 is in the arctan range, so arctan(1) = π/4.",
      difficulty: 5,
    },
  ],
};

const differentiatingInverseTrig: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Differentiate inverse trigonometric functions, apply the chain rule, and recognise basic inverse-trig antiderivatives.",
  learningIntention:
    "Use standard inverse-trig derivative results and recognise their matching integration forms.",
  successCriteria: [
    "Differentiate $\\arcsin x$, $\\arccos x$ and $\\arctan x$.",
    "Apply the chain rule to inverse trig functions.",
    "Recognise $\\int \\frac{1}{\\sqrt{1-x^2}}dx$ as an arcsine result.",
    "Recognise $\\int \\frac{1}{1+x^2}dx$ as an arctangent result.",
  ],
  teaching: {
    paragraphs: [
      "Inverse trig derivatives are standard results. The key is recognising which shape you have before differentiating.",
      "Arcsin and arccos share the same denominator, but arccos has a negative sign. That sign is a common source of lost marks.",
      "When the input is not just x, use the chain rule. Differentiate the outside inverse trig function, then multiply by the derivative of the inside.",
      "The integration results are the reverse recognition patterns. If the derivative of arcsin is $1/\\sqrt{1-x^2}$, then the integral of that expression is arcsin x plus C.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}\\arcsin x=\\frac{1}{\\sqrt{1-x^2}}",
      "\\frac{d}{dx}\\arccos x=\\frac{-1}{\\sqrt{1-x^2}}",
      "\\frac{d}{dx}\\arctan x=\\frac{1}{1+x^2}",
      "\\int\\frac{1}{\\sqrt{1-x^2}}\\,dx=\\arcsin x+C,\\quad \\int\\frac{1}{1+x^2}\\,dx=\\arctan x+C",
    ],
  },
  workedExamples: [
    {
      title: "Differentiate $\\arcsin(2x)$",
      questionLatex: "y=\\arcsin(2x)",
      steps: [
        {
          explanation:
            "Use the arcsin derivative with the inside expression u = 2x.",
          latex:
            "\\frac{d}{dx}\\arcsin(u)=\\frac{u'}{\\sqrt{1-u^2}}",
        },
        {
          explanation: "Here u' = 2, so substitute u = 2x.",
          latex:
            "\\frac{dy}{dx}=\\frac{2}{\\sqrt{1-(2x)^2}}=\\frac{2}{\\sqrt{1-4x^2}}",
        },
      ],
      finalAnswerLatex: "\\frac{2}{\\sqrt{1-4x^2}}",
    },
    {
      title: "Differentiate $\\arctan(x^2)$",
      questionLatex: "y=\\arctan(x^2)",
      steps: [
        {
          explanation:
            "Use the arctan derivative with inside expression u = x^2.",
          latex:
            "\\frac{d}{dx}\\arctan(u)=\\frac{u'}{1+u^2}",
        },
        {
          explanation:
            "Since u' = 2x, multiply by 2x in the numerator.",
          latex:
            "\\frac{dy}{dx}=\\frac{2x}{1+(x^2)^2}=\\frac{2x}{1+x^4}",
        },
      ],
      finalAnswerLatex: "\\frac{2x}{1+x^4}",
    },
    {
      title: "Recognise inverse-trig integrals",
      questionLatex:
        "\\int\\frac{1}{\\sqrt{1-x^2}}\\,dx\\quad\\text{and}\\quad \\int\\frac{1}{1+x^2}\\,dx",
      steps: [
        {
          explanation:
            "The first integrand is exactly the derivative of arcsin x.",
          latex:
            "\\int\\frac{1}{\\sqrt{1-x^2}}\\,dx=\\arcsin x+C",
        },
        {
          explanation:
            "The second integrand is exactly the derivative of arctan x.",
          latex:
            "\\int\\frac{1}{1+x^2}\\,dx=\\arctan x+C",
        },
      ],
      finalAnswerLatex: "\\arcsin x+C,\\quad \\arctan x+C",
    },
  ],
  guidedPractice: [
    inverseTrigChoice("y12e1-diff-inv-g1", "Which derivative is correct?", "A", ["$\\frac{d}{dx}\\arcsin x=\\frac{1}{\\sqrt{1-x^2}}$", "$\\frac{d}{dx}\\arcsin x=\\sqrt{1-x^2}$", "$\\frac{d}{dx}\\arcsin x=\\frac{-1}{1+x^2}$", "$\\frac{d}{dx}\\arcsin x=\\cos x$"], "This is the standard arcsin derivative."),
    inverseTrigChoice("y12e1-diff-inv-g2", "Which inverse trig derivative has the negative sign?", "B", ["arcsin x", "arccos x", "arctan x", "sin x"], "Arccos has derivative -1/sqrt(1-x^2)."),
    inverseTrigTyped("y12e1-diff-inv-g3", "Differentiate.", "y=\\arctan(3x)", "3/(1+9x^2)", ["\\frac{3}{1+9x^2}"], "Use u = 3x, so u' = 3 and u^2 = 9x^2."),
    inverseTrigChoice("y12e1-diff-inv-g4", "Recognise the integral.", "C", ["$\\arcsin x+C$", "$\\arccos x+C$", "$\\arctan x+C$", "$\\tan x+C$"], "This is the reverse of the arctan derivative.", "\\int\\frac{1}{1+x^2}\\,dx"),
  ],
  independentPractice: [
    inverseTrigTyped("y12e1-diff-inv-i1", "Differentiate.", "y=\\arcsin(5x)", "5/sqrt(1-25x^2)", ["\\frac{5}{\\sqrt{1-25x^2}}"], "Use the chain rule with u = 5x."),
    inverseTrigTyped("y12e1-diff-inv-i2", "Differentiate.", "y=\\arctan(x^2)", "2x/(1+x^4)", ["\\frac{2x}{1+x^4}"], "Use u = x^2, so u' = 2x and u^2 = x^4."),
    inverseTrigChoice("y12e1-diff-inv-i3", "Which integral gives $\\arcsin x+C$?", "A", ["$\\int\\frac{1}{\\sqrt{1-x^2}}dx$", "$\\int\\frac{1}{1+x^2}dx$", "$\\int\\sqrt{1-x^2}dx$", "$\\int\\frac{-1}{\\sqrt{1-x^2}}dx$"], "The derivative of arcsin x is 1/sqrt(1-x^2)."),
    inverseTrigTyped("y12e1-diff-inv-i4", "Differentiate.", "y=\\arccos(2x)", "-2/sqrt(1-4x^2)", ["\\frac{-2}{\\sqrt{1-4x^2}}"], "Arccos contributes the negative sign and the chain rule contributes 2."),
    inverseTrigChoice("y12e1-diff-inv-i5", "What is the main chain-rule step in $\\arcsin(2x)$?", "D", ["Square the outside", "Ignore the 2", "Differentiate as sine", "Multiply by the derivative of 2x"], "The inside derivative is essential."),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting the negative sign for arccos.",
      fix: "Arccos has derivative $-1/\\sqrt{1-x^2}$.",
    },
    {
      mistake: "Forgetting the chain rule.",
      fix: "If the input is u(x), multiply by u'(x).",
    },
    {
      mistake: "Writing $1-x^2$ instead of $1-u^2$ for a composite input.",
      fix: "Square the entire inside expression, such as $(2x)^2=4x^2$.",
    },
    {
      mistake: "Confusing the arcsin and arctan integration patterns.",
      fix: "Arcsin has the square-root denominator; arctan has $1+x^2$.",
    },
  ],
  masteryQuiz: [
    inverseTrigChoice("y12e1-diff-inv-m1", "Differentiate $\\arcsin x$.", "A", ["$1/\\sqrt{1-x^2}$", "$-1/\\sqrt{1-x^2}$", "$1/(1+x^2)$", "$\\cos x$"], "This is the standard arcsin derivative."),
    inverseTrigChoice("y12e1-diff-inv-m2", "Differentiate $\\arccos x$.", "B", ["$1/\\sqrt{1-x^2}$", "$-1/\\sqrt{1-x^2}$", "$1/(1+x^2)$", "$-\\sin x$"], "Arccos carries the negative sign."),
    inverseTrigChoice("y12e1-diff-inv-m3", "Differentiate $\\arctan x$.", "C", ["$1/\\sqrt{1-x^2}$", "$-1/\\sqrt{1-x^2}$", "$1/(1+x^2)$", "$\\sec^2x$"], "This is the standard arctan derivative."),
    inverseTrigTyped("y12e1-diff-inv-m4", "Differentiate.", "y=\\arcsin(2x)", "2/sqrt(1-4x^2)", ["\\frac{2}{\\sqrt{1-4x^2}}"], "Chain rule with u = 2x."),
    inverseTrigTyped("y12e1-diff-inv-m5", "Differentiate.", "y=\\arctan(x^2)", "2x/(1+x^4)", ["\\frac{2x}{1+x^4}"], "Chain rule with u = x^2."),
    inverseTrigChoice("y12e1-diff-inv-m6", "Which integral equals $\\arctan x+C$?", "D", ["$\\int\\frac{1}{\\sqrt{1-x^2}}dx$", "$\\int\\sqrt{1-x^2}dx$", "$\\int\\frac{-1}{\\sqrt{1-x^2}}dx$", "$\\int\\frac{1}{1+x^2}dx$"], "This is the reverse of the arctan derivative."),
    inverseTrigChoice("y12e1-diff-inv-m7", "Which integral equals $\\arcsin x+C$?", "A", ["$\\int\\frac{1}{\\sqrt{1-x^2}}dx$", "$\\int\\frac{1}{1+x^2}dx$", "$\\int\\frac{-1}{\\sqrt{1-x^2}}dx$", "$\\int\\cos x\\,dx$"], "This is the reverse of the arcsin derivative."),
    inverseTrigTyped("y12e1-diff-inv-m8", "Differentiate.", "y=\\arccos(3x)", "-3/sqrt(1-9x^2)", ["\\frac{-3}{\\sqrt{1-9x^2}}"], "The negative arccos derivative and u' = 3 combine."),
    inverseTrigChoice("y12e1-diff-inv-m9", "In $\\arctan(4x)$, the denominator after differentiating is:", "B", ["$1+4x^2$", "$1+16x^2$", "$1-16x^2$", "$\\sqrt{1-16x^2}$"], "The inside expression is squared: $(4x)^2 = 16x^2$."),
    inverseTrigChoice("y12e1-diff-inv-m10", "Which pair is correctly matched?", "C", ["arcsin: $1/(1+x^2)$", "arctan: $-1/\\sqrt{1-x^2}$", "arccos: $-1/\\sqrt{1-x^2}$", "arctan: $\\sqrt{1-x^2}$"], "Arccos is the inverse trig derivative with the negative square-root form."),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-diff-inv-pool-d5-1",
      prompt: "Find the value of the derivative of arcsin(x) at x = 0.",
      latex: "",
      answer: "1",
      acceptedAnswers: [],
      hint: "The derivative is 1/√(1−x²); substitute x = 0.",
      explanation: "d/dx[arcsin x] = 1/√(1−x²); at x = 0 this is 1/√1 = 1.",
      difficulty: 5,
    },
  ],
};

export function year12Extension1InverseTrigLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-extension-1" || unit.slug !== "inverse-trig") {
    return null;
  }

  if (lesson.slug === "inverse-sine-cosine") {
    return inverseSineCosine;
  }

  if (lesson.slug === "inverse-tangent") {
    return inverseTangent;
  }

  if (lesson.slug === "differentiating-inverse-trig") {
    return differentiatingInverseTrig;
  }

  return null;
}
