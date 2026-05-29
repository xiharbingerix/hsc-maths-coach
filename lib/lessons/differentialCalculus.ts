import type { NetworkDiagram, TriangleDiagram } from "./types";

export type PracticeQuestion = {
  id: string;
  prompt: string;
  latex: string;
  diagram?: NetworkDiagram;
  triangleDiagram?: TriangleDiagram;
  solutionDiagram?: NetworkDiagram;
  answer: string;
  acceptedAnswers?: string[];
  choices?: {
    label: string;
    text: string;
  }[];
  hint?: string;
  explanation?: string;
};

export type WorkedExampleStep = {
  explanation: string;
  latex?: string;
};

export type WorkedExample = {
  title: string;
  questionLatex: string;
  diagram?: NetworkDiagram;
  triangleDiagram?: TriangleDiagram;
  steps: WorkedExampleStep[];
  finalAnswerLatex: string;
};

export type ExplicitLesson = {
  id: string;
  slug: string;
  moduleSlug: string;
  moduleTitle: string;
  courseTitle: string;
  title: string;
  description: string;
  syllabusArea: string;
  focus: string;
  status: "active" | "coming-soon";

  video: {
    title: string;
    url: string;
  };

  learningIntention: string;
  successCriteria: string[];

  teaching: {
    paragraphs: string[];
    latexBlocks: string[];
  };

  workedExamples: WorkedExample[];
  guidedPractice: PracticeQuestion[];
  independentPractice: PracticeQuestion[];
  commonMistakes: {
    mistake: string;
    fix: string;
  }[];

  masteryQuiz: PracticeQuestion[];
  masteryPassMark: number;
};

export type LessonOutlineItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "active" | "coming-soon";
};

export const derivativeAsRateOfChangeLesson: ExplicitLesson = {
  id: "rate-of-change",
  slug: "rate-of-change",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "The Derivative as Rate of Change",
  description:
    "Understand average rate of change, instantaneous rate of change, tangent gradients, derivative notation, signs, and units.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "The Derivative as Rate of Change",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to interpret the derivative as an instantaneous rate of change.",

  successCriteria: [
    "Explain that a rate of change compares how one quantity changes compared to another.",
    "Calculate average rate of change from two function values.",
    "Recognise average rate of change as the gradient of a secant line.",
    "Recognise instantaneous rate of change as the gradient of a tangent line.",
    "Interpret derivative notation such as $f'(x)$, $\\frac{dy}{dx}$, and $\\frac{ds}{dt}$.",
    "Use the sign and units of a derivative to interpret a contextual rate.",
  ],

  teaching: {
    paragraphs: [
      "A rate of change compares how one quantity changes compared to another quantity.",
      "Average rate of change looks across an interval. It is the change in output divided by the change in input.",
      "On a graph, average rate of change is the gradient of the secant line joining two points.",
      "Instantaneous rate of change looks at one instant or one point. On a graph, it is the gradient of the tangent line.",
      "The derivative gives the instantaneous rate of change. The notation used depends on the context, such as $f'(x)$, $\\frac{dy}{dx}$, or $\\frac{ds}{dt}$.",
      "A positive derivative means the quantity is increasing, a negative derivative means it is decreasing, and a zero derivative means it is momentarily not changing.",
      "Units matter. If displacement is measured in metres and time in seconds, then $\\frac{ds}{dt}$ is measured in metres per second.",
    ],
    latexBlocks: [
      "\\text{average rate of change}=\\frac{\\text{change in output}}{\\text{change in input}}",
      "\\frac{f(b)-f(a)}{b-a}",
      "\\text{instantaneous rate of change}=f'(a)",
      "f'(x)>0 \\Rightarrow \\text{increasing}, \\quad f'(x)<0 \\Rightarrow \\text{decreasing}, \\quad f'(x)=0 \\Rightarrow \\text{momentarily not changing}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Average rate of change",
      questionLatex:
        "f(1)=3, \\quad f(5)=15. \\quad \\text{Find the average rate of change from }x=1\\text{ to }x=5.",
      steps: [
        {
          explanation: "Use change in output divided by change in input.",
          latex: "\\frac{f(5)-f(1)}{5-1}",
        },
        {
          explanation: "Substitute the function values.",
          latex: "\\frac{15-3}{5-1}=\\frac{12}{4}",
        },
        {
          explanation: "Simplify the rate.",
          latex: "3",
        },
      ],
      finalAnswerLatex: "3",
    },
    {
      title: "Worked example 2: Instantaneous rate from a derivative",
      questionLatex:
        "s(t)=t^2+3t, \\quad s'(t)=2t+3. \\quad \\text{Find and interpret }s'(4).",
      steps: [
        {
          explanation: "$s'(4)$ means the instantaneous rate at $t=4$.",
          latex: "s'(4)=2(4)+3",
        },
        {
          explanation: "Evaluate the derivative value.",
          latex: "s'(4)=11",
        },
        {
          explanation: "Interpret the positive sign.",
          latex:
            "s'(4)>0 \\Rightarrow \\text{the displacement is increasing at }11\\text{ units per time unit}",
        },
      ],
      finalAnswerLatex:
        "s'(4)=11, \\quad \\text{so }s\\text{ is increasing at }11\\text{ units per time unit when }t=4.",
    },
    {
      title: "Worked example 3: Sign of a derivative",
      questionLatex:
        "h'(2)=-6\\text{ metres per second}. \\quad \\text{Interpret this rate.}",
      steps: [
        {
          explanation: "The negative sign means the quantity is decreasing.",
          latex: "h'(2)<0",
        },
        {
          explanation: "Use the magnitude and units in the interpretation.",
          latex: "6\\text{ metres per second}",
        },
      ],
      finalAnswerLatex:
        "\\text{At }t=2,\\text{ the height is decreasing at }6\\text{ metres per second.}",
    },
  ],

  guidedPractice: [
    {
      id: "roc-guided-1",
      prompt: "Identify the numerator for average rate of change:",
      latex: "f(2)=7, \\quad f(6)=19, \\quad \\frac{f(6)-f(2)}{6-2}",
      answer: "12",
      hint: "Find the change in output.",
      explanation: "$f(6)-f(2)=19-7=12$.",
    },
    {
      id: "roc-guided-2",
      prompt: "Find the average rate of change.",
      latex: "f(1)=4, \\quad f(5)=16",
      answer: "3",
      hint: "Use $\\frac{16-4}{5-1}$.",
      explanation: "$\\frac{16-4}{5-1}=\\frac{12}{4}=3$.",
    },
    {
      id: "roc-guided-3",
      prompt:
        "Choose the correct description. A: secant gradient. B: tangent gradient. C: y-intercept.",
      latex: "\\text{Instantaneous rate of change at one point}",
      answer: "B",
      choices: [
        { label: "A", text: "secant gradient" },
        { label: "B", text: "tangent gradient" },
        { label: "C", text: "y-intercept" },
      ],
      hint: "Instantaneous rate uses a tangent.",
      explanation:
        "Instantaneous rate of change is the gradient of the tangent at a point.",
    },
    {
      id: "roc-guided-4",
      prompt: "Complete the interpretation: $P'(3)>0$ means the quantity is ____.",
      latex: "P'(3)>0",
      answer: "A",
      acceptedAnswers: ["increasing"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Positive derivative means increasing.",
      explanation: "Since $P'(3)>0$, the quantity is increasing at that instant.",
    },
  ],

  independentPractice: [
    {
      id: "roc-ind-1",
      prompt: "Find the average rate of change.",
      latex: "f(0)=2, \\quad f(4)=18",
      answer: "4",
      hint: "Use change in output over change in input.",
      explanation: "$\\frac{18-2}{4-0}=4$.",
    },
    {
      id: "roc-ind-2",
      prompt: "Find the instantaneous rate at $t=3$.",
      latex: "v(t)=s'(t)=5t-2",
      answer: "13",
      hint: "Substitute $t=3$.",
      explanation: "$s'(3)=5(3)-2=13$.",
    },
    {
      id: "roc-ind-3",
      prompt: "Complete the interpretation: $h'(5)=-4$ means height is ____.",
      latex: "h'(5)=-4\\text{ metres per second}",
      answer: "B",
      acceptedAnswers: ["decreasing"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Use the sign of the derivative.",
      explanation:
        "The height is decreasing at $4$ metres per second when $t=5$.",
    },
    {
      id: "roc-ind-4",
      prompt:
        "A displacement $s$ depends on time $t$. Choose the best notation for velocity.",
      latex: "s=s(t)",
      answer: "C",
      choices: [
        { label: "A", text: "$\\frac{dt}{ds}$" },
        { label: "B", text: "$s(t)$" },
        { label: "C", text: "$\\frac{ds}{dt}$" },
      ],
      hint: "Velocity is change in displacement over change in time.",
      explanation: "Velocity is $\\frac{ds}{dt}$.",
    },
    {
      id: "roc-ind-5",
      prompt: "Choose the correct units for $\\frac{ds}{dt}$.",
      latex: "s\\text{ is metres}, \\quad t\\text{ is seconds}",
      answer: "A",
      acceptedAnswers: ["metres per second", "m/s"],
      choices: [
        { label: "A", text: "metres per second" },
        { label: "B", text: "seconds per metre" },
        { label: "C", text: "metres" },
      ],
      hint: "Rate units are output units per input unit.",
      explanation:
        "$\\frac{ds}{dt}$ is measured in metres per second.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Mixing up average and instantaneous rate of change.",
      fix: "Average rate uses two points. Instantaneous rate uses a tangent at one point.",
    },
    {
      mistake: "Using change in input over change in output.",
      fix: "Average rate is change in output divided by change in input.",
    },
    {
      mistake: "Ignoring the sign of the derivative.",
      fix: "A negative derivative means the quantity is decreasing at that instant.",
    },
    {
      mistake: "Leaving off units in a context question.",
      fix: "Write rates as output units per input unit, such as metres per second.",
    },
  ],

  masteryQuiz: [
    {
      id: "roc-mastery-1",
      prompt: "Choose the best meaning of rate of change.",
      latex: "\\text{rate of change}",
      answer: "B",
      choices: [
        { label: "A", text: "the value of a quantity" },
        { label: "B", text: "how one quantity changes compared to another" },
        { label: "C", text: "only the highest point of a graph" },
      ],
      hint: "Rate compares two changes.",
      explanation:
        "A rate of change compares how one quantity changes compared to another.",
    },
    {
      id: "roc-mastery-2",
      prompt: "Find the average rate of change.",
      latex: "f(2)=5, \\quad f(6)=17",
      answer: "3",
      hint: "Use $\\frac{17-5}{6-2}$.",
      explanation: "$\\frac{17-5}{6-2}=3$.",
    },
    {
      id: "roc-mastery-3",
      prompt: "Average rate of change is the gradient of which line?",
      latex: "\\text{average rate of change}",
      answer: "A",
      choices: [
        { label: "A", text: "secant line" },
        { label: "B", text: "tangent line" },
        { label: "C", text: "vertical line" },
      ],
      hint: "Average rate joins two points.",
      explanation: "Average rate of change is the gradient of a secant line.",
    },
    {
      id: "roc-mastery-4",
      prompt: "Instantaneous rate of change is the gradient of which line?",
      latex: "\\text{instantaneous rate of change}",
      answer: "B",
      choices: [
        { label: "A", text: "secant line" },
        { label: "B", text: "tangent line" },
        { label: "C", text: "axis of symmetry" },
      ],
      hint: "Instantaneous rate is at one point.",
      explanation:
        "Instantaneous rate of change is the gradient of the tangent line.",
    },
    {
      id: "roc-mastery-5",
      prompt: "Evaluate the instantaneous rate at $t=2$.",
      latex: "s'(t)=4t+1",
      answer: "9",
      hint: "Substitute $t=2$.",
      explanation: "$s'(2)=4(2)+1=9$.",
    },
    {
      id: "roc-mastery-6",
      prompt: "Choose the derivative notation for rate of change of $y$ with respect to $x$.",
      latex: "y=y(x)",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{dy}{dx}$" },
        { label: "B", text: "$\\frac{dx}{dy}$" },
        { label: "C", text: "$xy$" },
      ],
      hint: "Read $\\frac{dy}{dx}$ as change in y with respect to x.",
      explanation: "$\\frac{dy}{dx}$ is the rate of change of $y$ with respect to $x$.",
    },
    {
      id: "roc-mastery-7",
      prompt: "Complete the interpretation: $C'(8)>0$ means cost is ____.",
      latex: "C'(8)>0",
      answer: "A",
      acceptedAnswers: ["increasing"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Positive derivative means increasing.",
      explanation: "The cost is increasing at that instant.",
    },
    {
      id: "roc-mastery-8",
      prompt: "Choose the correct interpretation.",
      latex: "h'(2)=-6\\text{ metres per second}",
      answer: "B",
      choices: [
        { label: "A", text: "height is increasing at 6 metres per second" },
        { label: "B", text: "height is decreasing at 6 metres per second" },
        { label: "C", text: "height is equal to -6 metres" },
      ],
      hint: "A negative derivative means decreasing.",
      explanation:
        "$h'(2)=-6$ means height is decreasing at $6$ metres per second.",
    },
    {
      id: "roc-mastery-9",
      prompt: "A population model has $P'(4)=0$. Choose the best interpretation.",
      latex: "P'(4)=0",
      answer: "C",
      acceptedAnswers: ["momentarily not changing", "not changing"],
      choices: [
        { label: "A", text: "population is increasing quickly" },
        { label: "B", text: "population is decreasing quickly" },
        { label: "C", text: "population is momentarily not changing" },
      ],
      hint: "Zero derivative means zero instantaneous rate.",
      explanation: "The population is momentarily not changing when $t=4$.",
    },
    {
      id: "roc-mastery-10",
      prompt: "Find the average speed from the displacement values.",
      latex: "s(1)=10\\text{ m}, \\quad s(5)=30\\text{ m}",
      answer: "5",
      acceptedAnswers: ["5 m/s", "5 metres per second"],
      hint: "Use $\\frac{30-10}{5-1}$.",
      explanation:
        "$\\frac{30-10}{5-1}=5$, so the average speed is $5$ metres per second.",
    },
  ],

  masteryPassMark: 0.8,
};

export const differentiatingPolynomialTermsLesson: ExplicitLesson = {
  id: "differentiating-polynomial-terms",
  slug: "differentiating-polynomial-terms",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Differentiating Polynomial Terms",
  description:
    "Learn how to differentiate polynomial terms using the power rule, with a focus on coefficients, powers, constants, and common mark-losing mistakes.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Differentiating Polynomial Terms",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to differentiate polynomial terms using the power rule.",

  successCriteria: [
    "Identify the coefficient and power in a polynomial term.",
    "Apply the power rule correctly.",
    "Differentiate polynomial terms with positive and negative coefficients.",
    "Recognise that constants differentiate to zero.",
    "Avoid common coefficient, power, and sign errors.",
  ],

  teaching: {
    paragraphs: [
      "A polynomial term is a single algebraic term involving a coefficient, a variable, and a power.",
      "The coefficient is the number multiplying the variable term. The power is the exponent on the variable.",
      "To differentiate a polynomial term, multiply the coefficient by the power, then reduce the power by one.",
      "A constant differentiates to zero because its value does not change as the variable changes.",
    ],
    latexBlocks: [
      "ax^n",
      "\\frac{d}{dx}\\left(ax^n\\right)=anx^{n-1}",
      "\\frac{d}{dx}\\left(c\\right)=0",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: One polynomial term",
      questionLatex: "\\frac{d}{dx}\\left(4x^5\\right)",
      steps: [
        {
          explanation: "Identify the coefficient and power.",
          latex: "a=4, \\quad n=5",
        },
        {
          explanation: "Multiply the coefficient by the power.",
          latex: "4 \\times 5 = 20",
        },
        {
          explanation: "Reduce the power by one.",
          latex: "x^{5-1}=x^4",
        },
      ],
      finalAnswerLatex: "20x^4",
    },
    {
      title: "Worked example 2: A negative coefficient",
      questionLatex: "\\frac{d}{dx}\\left(-3x^2\\right)",
      steps: [
        {
          explanation: "Identify the coefficient and power.",
          latex: "a=-3, \\quad n=2",
        },
        {
          explanation: "Multiply the coefficient by the power.",
          latex: "-3 \\times 2 = -6",
        },
        {
          explanation: "Reduce the power by one.",
          latex: "x^{2-1}=x",
        },
      ],
      finalAnswerLatex: "-6x",
    },
    {
      title: "Worked example 3: Constant term",
      questionLatex: "\\frac{d}{dx}\\left(7\\right)",
      steps: [
        {
          explanation:
            "A constant does not change as x changes, so its derivative is zero.",
          latex: "\\frac{d}{dx}\\left(7\\right)=0",
        },
      ],
      finalAnswerLatex: "0",
    },
  ],

  guidedPractice: [
    {
      id: "guided-1",
      prompt: "Complete the missing value:",
      latex: "\\frac{d}{dx}\\left(6x^4\\right)=6 \\times \\Box \\times x^{4-1}",
      answer: "4",
      hint: "The missing value is the original power.",
      explanation:
        "The original power is $4$, so the coefficient becomes $6 \\times 4 = 24$.",
    },
    {
      id: "guided-2",
      prompt: "Complete the missing exponent:",
      latex: "\\frac{d}{dx}\\left(5x^3\\right)=15x^{\\Box}",
      answer: "2",
      hint: "Reduce the original power by one.",
      explanation: "The original power is 3, so the new power is 2.",
    },
    {
      id: "guided-3",
      prompt: "Differentiate:",
      latex: "-2x^5",
      answer: "-10x^4",
      hint: "Keep the negative sign, multiply 2 by 5, then reduce the power.",
      explanation:
        "Using the power rule, $\\frac{d}{dx}\\left(-2x^5\\right)=-10x^4$.",
    },
    {
      id: "guided-4",
      prompt: "Complete the missing exponent:",
      latex: "\\frac{d}{dx}\\left(6x^7\\right)=42x^{\\Box}",
      answer: "6",
      hint: "The new power is one less than the original power.",
      explanation:
        "Using the power rule, $\\frac{d}{dx}\\left(6x^7\\right)=42x^6$, so the missing exponent is $6$.",
    },
  ],

  independentPractice: [
    {
      id: "ind-1",
      prompt: "Differentiate:",
      latex: "3x^2",
      answer: "6x",
      hint: "Multiply by the power 2.",
      explanation: "$\\frac{d}{dx}\\left(3x^2\\right)=6x$.",
    },
    {
      id: "ind-2",
      prompt: "Differentiate:",
      latex: "8x^5",
      answer: "40x^4",
      hint: "Multiply 8 by 5, then reduce the power.",
      explanation: "$\\frac{d}{dx}\\left(8x^5\\right)=40x^4$.",
    },
    {
      id: "ind-3",
      prompt: "Differentiate:",
      latex: "-6x^3",
      answer: "-18x^2",
      hint: "Keep the negative sign attached to the term.",
      explanation: "$\\frac{d}{dx}\\left(-6x^3\\right)=-18x^2$.",
    },
    {
      id: "ind-4",
      prompt: "Differentiate:",
      latex: "11",
      answer: "0",
      hint: "A constant differentiates to zero.",
      explanation: "$\\frac{d}{dx}\\left(11\\right)=0$.",
    },
    {
      id: "ind-5",
      prompt:
        "A revenue model includes the term below. Find its marginal contribution.",
      latex: "-8x^3",
      answer: "-24x^2",
      hint: "Differentiate the term with respect to $x$.",
      explanation:
        "$\\frac{d}{dx}\\left(-8x^3\\right)=-24x^2$. This is a transfer use of the same power rule in a context.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to multiply by the power.",
      fix: "For $4x^5$, the coefficient becomes $4 \\times 5 = 20$.",
    },
    {
      mistake: "Reducing the coefficient instead of the power.",
      fix: "The power reduces by 1. The coefficient is multiplied by the original power.",
    },
    {
      mistake: "Forgetting that constants differentiate to zero.",
      fix: "A constant like -9 has derivative 0.",
    },
    {
      mistake: "Dropping negative signs.",
      fix: "Keep the sign attached to the term when differentiating.",
    },
  ],

  masteryQuiz: [
    {
      id: "mastery-1",
      prompt: "Differentiate:",
      latex: "7x^3",
      answer: "A",
      choices: [
        { label: "A", text: "$21x^2$" },
        { label: "B", text: "$21x^3$" },
        { label: "C", text: "$7x^2$" },
        { label: "D", text: "$10x^2$" },
      ],
      hint: "Multiply 7 by 3.",
      explanation: "$\\frac{d}{dx}\\left(7x^3\\right)=21x^2$.",
    },
    {
      id: "mastery-2",
      prompt: "Differentiate:",
      latex: "-4x^5",
      answer: "B",
      choices: [
        { label: "A", text: "$20x^4$" },
        { label: "B", text: "$-20x^4$" },
        { label: "C", text: "$-20x^5$" },
        { label: "D", text: "$-4x^4$" },
      ],
      hint: "Keep the negative sign.",
      explanation: "$\\frac{d}{dx}\\left(-4x^5\\right)=-20x^4$.",
    },
    {
      id: "mastery-3",
      prompt: "Differentiate:",
      latex: "x^6",
      answer: "C",
      choices: [
        { label: "A", text: "$x^5$" },
        { label: "B", text: "$6x^6$" },
        { label: "C", text: "$6x^5$" },
        { label: "D", text: "$x^7$" },
      ],
      hint: "The coefficient of $x^6$ is $1$.",
      explanation: "$\\frac{d}{dx}\\left(x^6\\right)=6x^5$.",
    },
    {
      id: "mastery-4",
      prompt: "Differentiate:",
      latex: "9",
      answer: "0",
      hint: "This is a constant.",
      explanation: "The derivative of a constant is 0.",
    },
    {
      id: "mastery-5",
      prompt: "Differentiate:",
      latex: "-2x^4",
      answer: "A",
      choices: [
        { label: "A", text: "$-8x^3$" },
        { label: "B", text: "$8x^3$" },
        { label: "C", text: "$-8x^4$" },
        { label: "D", text: "$-2x^3$" },
      ],
      hint: "Keep the negative sign and reduce the power.",
      explanation: "$\\frac{d}{dx}\\left(-2x^4\\right)=-8x^3$.",
    },
    {
      id: "mastery-6",
      prompt: "Differentiate:",
      latex: "12x^2",
      answer: "D",
      choices: [
        { label: "A", text: "$12x$" },
        { label: "B", text: "$24x^2$" },
        { label: "C", text: "$14x$" },
        { label: "D", text: "$24x$" },
      ],
      hint: "Multiply the coefficient by the power.",
      explanation: "$\\frac{d}{dx}\\left(12x^2\\right)=24x$.",
    },
    {
      id: "mastery-7",
      prompt:
        "A height model contains the term below. Find the derivative of this term with respect to time.",
      latex: "5t^3",
      answer: "B",
      choices: [
        { label: "A", text: "$15t^3$" },
        { label: "B", text: "$15t^2$" },
        { label: "C", text: "$5t^2$" },
        { label: "D", text: "$8t^2$" },
      ],
      hint: "Use the power rule with variable $t$.",
      explanation: "$\\frac{d}{dt}\\left(5t^3\\right)=15t^2$.",
    },
    {
      id: "mastery-8",
      prompt: "Find the coefficient of $x^3$ in the derivative:",
      latex: "\\frac{d}{dx}\\left(-7x^4\\right)",
      answer: "-28",
      hint: "Multiply $-7$ by $4$.",
      explanation:
        "$\\frac{d}{dx}\\left(-7x^4\\right)=-28x^3$, so the missing coefficient is $-28$.",
    },
    {
      id: "mastery-9",
      prompt: "Choose the correct derivative: A: $5x^4$, B: $-5x^4$, C: $-x^4$.",
      latex: "\\frac{d}{dx}\\left(-x^5\\right)",
      answer: "B",
      choices: [
        { label: "A", text: "$5x^4$" },
        { label: "B", text: "$-5x^4$" },
        { label: "C", text: "$-x^4$" },
      ],
      hint: "The coefficient is $-1$.",
      explanation:
        "$\\frac{d}{dx}\\left(-x^5\\right)=-5x^4$, so option B is correct.",
    },
    {
      id: "mastery-10",
      prompt:
        "A model includes the term below. What is its instantaneous rate contribution?",
      latex: "-3t^6",
      answer: "C",
      choices: [
        { label: "A", text: "$18t^5$" },
        { label: "B", text: "$-18t^6$" },
        { label: "C", text: "$-18t^5$" },
        { label: "D", text: "$-3t^5$" },
      ],
      hint: "Differentiate the term with respect to $t$.",
      explanation:
        "$\\frac{d}{dt}\\left(-3t^6\\right)=-18t^5$. The negative sign stays attached to the derivative.",
    },
  ],

  masteryPassMark: 0.8,
};

export const differentiatingPolynomialFunctionsLesson: ExplicitLesson = {
  id: "differentiating-polynomial-functions",
  slug: "differentiating-polynomial-functions",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Differentiating Polynomial Functions",
  description:
    "Learn how to differentiate full polynomial functions term-by-term using correct derivative notation and simplification.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Differentiating Polynomial Functions",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to differentiate polynomial functions by applying the power rule to each term.",

  successCriteria: [
    "Use derivative notation correctly, including $f'(x)$ and $\\frac{dy}{dx}$.",
    "Differentiate each term in a polynomial function.",
    "Simplify the derivative after differentiating.",
    "Correctly differentiate constant and linear terms.",
    "Avoid sign errors when differentiating negative terms.",
  ],

  teaching: {
    paragraphs: [
      "A polynomial function is made up of polynomial terms added or subtracted together.",
      "To differentiate a polynomial function, differentiate each term separately.",
      "Keep the sign attached to each term before applying the power rule.",
      "A linear term differentiates to its coefficient. A constant differentiates to zero.",
      "After differentiating, simplify the derivative and use the correct notation.",
    ],
    latexBlocks: [
      "f(x)=4x^5-3x^2+7x-9",
      "f'(x)=\\frac{d}{dx}\\left(4x^5\\right)-\\frac{d}{dx}\\left(3x^2\\right)+\\frac{d}{dx}\\left(7x\\right)-\\frac{d}{dx}\\left(9\\right)",
      "f'(x)=20x^4-6x+7",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Differentiate a polynomial function",
      questionLatex: "f(x)=4x^5-3x^2+7x-9",
      steps: [
        {
          explanation: "Write the derivative notation.",
          latex: "f'(x)=\\frac{d}{dx}\\left(4x^5-3x^2+7x-9\\right)",
        },
        {
          explanation: "Differentiate $4x^5$.",
          latex: "\\frac{d}{dx}\\left(4x^5\\right)=20x^4",
        },
        {
          explanation: "Differentiate $-3x^2$.",
          latex: "\\frac{d}{dx}\\left(-3x^2\\right)=-6x",
        },
        {
          explanation: "Differentiate $7x$.",
          latex: "\\frac{d}{dx}\\left(7x\\right)=7",
        },
        {
          explanation: "Differentiate $-9$.",
          latex: "\\frac{d}{dx}\\left(-9\\right)=0",
        },
      ],
      finalAnswerLatex: "f'(x)=20x^4-6x+7",
    },
    {
      title: "Worked example 2: Use $\\frac{dy}{dx}$ notation",
      questionLatex: "y=2x^4-5x^3+x-11",
      steps: [
        {
          explanation:
            "Use $\\frac{dy}{dx}$ because the function is written as $y$.",
          latex: "\\frac{dy}{dx}=\\frac{d}{dx}\\left(2x^4-5x^3+x-11\\right)",
        },
        {
          explanation: "Differentiate $2x^4$.",
          latex: "\\frac{d}{dx}\\left(2x^4\\right)=8x^3",
        },
        {
          explanation: "Differentiate $-5x^3$.",
          latex: "\\frac{d}{dx}\\left(-5x^3\\right)=-15x^2",
        },
        {
          explanation: "Differentiate $x$.",
          latex: "\\frac{d}{dx}\\left(x\\right)=1",
        },
        {
          explanation: "Differentiate $-11$.",
          latex: "\\frac{d}{dx}\\left(-11\\right)=0",
        },
      ],
      finalAnswerLatex: "\\frac{dy}{dx}=8x^3-15x^2+1",
    },
  ],

  guidedPractice: [
    {
      id: "poly-fn-guided-1",
      prompt: "Complete the derivative:",
      latex: "f(x)=3x^4-2x^2+5 \\quad \\Rightarrow \\quad f'(x)=\\Box x^3-4x",
      answer: "12",
      hint: "Differentiate $3x^4$.",
      explanation:
        "$\\frac{d}{dx}\\left(3x^4\\right)=12x^3$, so $f'(x)=12x^3-4x$.",
    },
    {
      id: "poly-fn-guided-2",
      prompt: "Complete the derivative:",
      latex: "y=6x^5+x^2-8x+4 \\quad \\Rightarrow \\quad \\frac{dy}{dx}=30x^4+2x+\\Box",
      answer: "-8",
      hint: "The derivative of $-8x$ is $-8$.",
      explanation: "$\\frac{dy}{dx}=30x^4+2x-8$.",
    },
    {
      id: "poly-fn-guided-3",
      prompt: "Complete the missing term:",
      latex: "f(x)=x^4+3x^2-7 \\quad \\Rightarrow \\quad f'(x)=4x^3+\\Box",
      answer: "6x",
      hint: "Differentiate $3x^2$.",
      explanation:
        "$\\frac{d}{dx}\\left(3x^2\\right)=6x$, so $f'(x)=4x^3+6x$.",
    },
    {
      id: "poly-fn-guided-4",
      prompt:
        "Choose the correct next term in the derivative. A: $+5$, B: $+5x$, C: $0$.",
      latex: "f(x)=3x^4-2x^2+5x-9",
      answer: "A",
      choices: [
        { label: "A", text: "$+5$" },
        { label: "B", text: "$+5x$" },
        { label: "C", text: "$0$" },
      ],
      hint: "The derivative of $5x$ is a constant.",
      explanation:
        "$\\frac{d}{dx}(5x)=5$, so the next derivative term is $+5$. Option A is correct.",
    },
  ],

  independentPractice: [
    {
      id: "poly-fn-ind-1",
      prompt: "Differentiate:",
      latex: "f(x)=x^4+3x^2-7",
      answer: "4x^3+6x",
      hint: "Differentiate each term separately.",
      explanation: "$f'(x)=4x^3+6x$.",
    },
    {
      id: "poly-fn-ind-2",
      prompt: "Differentiate:",
      latex: "y=-2x^5+4x^3-9x",
      answer: "-10x^4+12x^2-9",
      hint: "Keep the negative sign on $-2x^5$.",
      explanation: "$\\frac{dy}{dx}=-10x^4+12x^2-9$.",
    },
    {
      id: "poly-fn-ind-3",
      prompt: "Differentiate:",
      latex: "f(x)=5x^6-3x^4+x^2-12",
      answer: "30x^5-12x^3+2x",
      hint: "The derivative of $-12$ is $0$.",
      explanation: "$f'(x)=30x^5-12x^3+2x$.",
    },
    {
      id: "poly-fn-ind-4",
      prompt: "Differentiate:",
      latex: "y=9x^3-4x^2+6",
      answer: "27x^2-8x",
      hint: "The derivative of $6$ is $0$.",
      explanation: "$\\frac{dy}{dx}=27x^2-8x$.",
    },
    {
      id: "poly-fn-ind-5",
      prompt:
        "A particle has displacement $s(t)$. Find the velocity function.",
      latex: "s(t)=-t^4+6t^2-3t+8",
      answer: "-4t^3+12t-3",
      hint: "Velocity is the derivative of displacement.",
      explanation:
        "$v(t)=s'(t)=-4t^3+12t-3$. The constant $8$ contributes $0$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to differentiate every term.",
      fix: "Move through the function term-by-term from left to right.",
    },
    {
      mistake: "Forgetting that constants differentiate to zero.",
      fix: "Terms without $x$, such as $5$ or $-12$, disappear in the derivative.",
    },
    {
      mistake: "Losing negative signs.",
      fix: "Keep the sign attached to the term before applying the power rule.",
    },
    {
      mistake: "Using the wrong notation.",
      fix: "Use $f'(x)$ when the function is written as $f(x)$, and $\\frac{dy}{dx}$ when it is written as $y$.",
    },
  ],

  masteryQuiz: [
    {
      id: "poly-fn-mastery-1",
      prompt: "Differentiate:",
      latex: "f(x)=2x^5-4x^2+3x-1",
      answer: "A",
      choices: [
        { label: "A", text: "$10x^4-8x+3$" },
        { label: "B", text: "$10x^4-8x$" },
        { label: "C", text: "$2x^4-4x+3$" },
        { label: "D", text: "$10x^5-8x+3$" },
      ],
      hint: "Differentiate each term and remember the constant becomes 0.",
      explanation: "$f'(x)=10x^4-8x+3$.",
    },
    {
      id: "poly-fn-mastery-2",
      prompt: "Differentiate:",
      latex: "y=-x^4+6x^3-2x",
      answer: "B",
      choices: [
        { label: "A", text: "$4x^3+18x^2-2$" },
        { label: "B", text: "$-4x^3+18x^2-2$" },
        { label: "C", text: "$-x^3+18x^2-2$" },
        { label: "D", text: "$-4x^3+18x^2-2x$" },
      ],
      hint: "The derivative of $-x^4$ is $-4x^3$.",
      explanation: "$\\frac{dy}{dx}=-4x^3+18x^2-2$.",
    },
    {
      id: "poly-fn-mastery-3",
      prompt: "Differentiate:",
      latex: "f(x)=7x^3-x^2+9",
      answer: "C",
      choices: [
        { label: "A", text: "$21x^2-2x+9$" },
        { label: "B", text: "$7x^2-2x$" },
        { label: "C", text: "$21x^2-2x$" },
        { label: "D", text: "$21x^3-2x$" },
      ],
      hint: "The derivative of $9$ is $0$.",
      explanation: "$f'(x)=21x^2-2x$.",
    },
    {
      id: "poly-fn-mastery-4",
      prompt: "Differentiate:",
      latex: "y=3x^6-5x^2+8x",
      answer: "D",
      choices: [
        { label: "A", text: "$18x^6-10x+8$" },
        { label: "B", text: "$18x^5-5x+8$" },
        { label: "C", text: "$18x^5-10x$" },
        { label: "D", text: "$18x^5-10x+8$" },
      ],
      hint: "Differentiate each term separately.",
      explanation: "$\\frac{dy}{dx}=18x^5-10x+8$.",
    },
    {
      id: "poly-fn-mastery-5",
      prompt: "Differentiate:",
      latex: "f(x)=-2x^4+x^3-11",
      answer: "A",
      choices: [
        { label: "A", text: "$-8x^3+3x^2$" },
        { label: "B", text: "$8x^3+3x^2$" },
        { label: "C", text: "$-8x^3+3x^2-11$" },
        { label: "D", text: "$-2x^3+3x^2$" },
      ],
      hint: "The derivative of $-11$ is $0$.",
      explanation: "$f'(x)=-8x^3+3x^2$.",
    },
    {
      id: "poly-fn-mastery-6",
      prompt: "Differentiate:",
      latex: "y=4x^4-2x^2+9",
      answer: "B",
      choices: [
        { label: "A", text: "$16x^3-4x+9$" },
        { label: "B", text: "$16x^3-4x$" },
        { label: "C", text: "$4x^3-2x$" },
        { label: "D", text: "$16x^4-4x$" },
      ],
      hint: "Differentiate each term, and remember the constant disappears.",
      explanation: "$\\frac{dy}{dx}=16x^3-4x$.",
    },
    {
      id: "poly-fn-mastery-7",
      prompt: "Find the gradient of the curve at $x=2$:",
      latex: "f(x)=x^3+2x^2",
      answer: "20",
      hint: "Find $f'(x)$, then substitute $x=2$.",
      explanation:
        "$f'(x)=3x^2+4x$, so $f'(2)=3(2)^2+4(2)=20$.",
    },
    {
      id: "poly-fn-mastery-8",
      prompt: "Find the derivative of the constant term:",
      latex: "P(x)=6x^3-4x+18",
      answer: "0",
      hint: "Constants do not change as $x$ changes.",
      explanation:
        "The derivative of any constant is $0$, so the constant term contributes nothing to $P'(x)$.",
    },
    {
      id: "poly-fn-mastery-9",
      prompt: "A displacement function is given. Find the velocity function.",
      latex: "s(t)=2t^3-5t^2+t",
      answer: "C",
      choices: [
        { label: "A", text: "$6t^2-10t$" },
        { label: "B", text: "$2t^2-5t+1$" },
        { label: "C", text: "$6t^2-10t+1$" },
        { label: "D", text: "$6t^3-10t+1$" },
      ],
      hint: "Velocity is the derivative of displacement.",
      explanation:
        "$v(t)=s'(t)=6t^2-10t+1$. This is a standard rate-of-change use of differentiation.",
    },
    {
      id: "poly-fn-mastery-10",
      prompt:
        "Choose the correct derivative. A: $-4x^3+6x-8$, B: $-4x^3+3x-8$, C: $4x^3+6x-8$.",
      latex: "f(x)=-x^4+3x^2-8x+5",
      answer: "A",
      choices: [
        { label: "A", text: "$-4x^3+6x-8$" },
        { label: "B", text: "$-4x^3+3x-8$" },
        { label: "C", text: "$4x^3+6x-8$" },
      ],
      hint: "Differentiate each term and keep the negative sign on $-x^4$.",
      explanation:
        "$f'(x)=-4x^3+6x-8$. The constant $5$ differentiates to $0$, so option A is correct.",
    },
  ],

  masteryPassMark: 0.8,
};

export const tangentsAndNormalsLesson: ExplicitLesson = {
  id: "tangents-and-normals",
  slug: "tangents-and-normals",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Tangents and Normals",
  description:
    "Use derivatives to find gradients and equations of tangents and normals to curves.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Tangents and Normals",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use derivatives to find equations of tangents and normals to curves.",

  successCriteria: [
    "Find the gradient of a tangent by differentiating and substituting the given $x$-coordinate.",
    "Find the point on the curve by substituting the $x$-coordinate into the original function.",
    "Use point-gradient form to write the tangent equation.",
    "Find the normal gradient using $m_n=-\\frac{1}{m_t}$ when $m_t \\ne 0$.",
    "Use point-gradient form to write the normal equation.",
  ],

  teaching: {
    paragraphs: [
      "The derivative gives the gradient of the tangent to a curve at a point.",
      "To find a tangent gradient, differentiate the function and substitute the given $x$-coordinate into the derivative.",
      "The tangent and the normal both pass through the point on the curve, so find the $y$-coordinate using the original function.",
      "Use point-gradient form with the point and gradient to write the tangent equation.",
      "The normal is perpendicular to the tangent. If the tangent gradient is $m_t$, then the normal gradient is $m_n=-\\frac{1}{m_t}$, as long as $m_t \\ne 0$.",
      "Use point-gradient form again with the same point and the normal gradient to write the normal equation.",
    ],
    latexBlocks: [
      "m_t=\\left.\\frac{dy}{dx}\\right|_{x=a}",
      "P=(a, f(a))",
      "y-y_1=m(x-x_1)",
      "m_n=-\\frac{1}{m_t}, \\quad m_t \\ne 0",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Tangent only",
      questionLatex:
        "y=x^2+3x \\quad \\text{at} \\quad x=2, \\quad \\text{find the equation of the tangent.}",
      steps: [
        {
          explanation: "Differentiate to find the gradient function.",
          latex: "\\frac{dy}{dx}=2x+3",
        },
        {
          explanation: "Substitute $x=2$ to find the tangent gradient.",
          latex: "m_t=2(2)+3=7",
        },
        {
          explanation: "Find the point on the curve.",
          latex: "y=2^2+3(2)=10 \\quad \\Rightarrow \\quad P=(2,10)",
        },
        {
          explanation: "Use point-gradient form.",
          latex: "y-10=7(x-2)",
        },
        {
          explanation: "Expand and simplify.",
          latex: "y=7x-4",
        },
      ],
      finalAnswerLatex: "y=7x-4",
    },
    {
      title: "Worked example 2: Tangent and normal",
      questionLatex:
        "y=x^2-4x+1 \\quad \\text{at} \\quad x=3, \\quad \\text{find the equations of the tangent and normal.}",
      steps: [
        {
          explanation: "Differentiate to find the gradient function.",
          latex: "\\frac{dy}{dx}=2x-4",
        },
        {
          explanation: "Substitute $x=3$ to find the tangent gradient.",
          latex: "m_t=2(3)-4=2",
        },
        {
          explanation: "Find the point on the curve.",
          latex: "y=3^2-4(3)+1=-2 \\quad \\Rightarrow \\quad P=(3,-2)",
        },
        {
          explanation: "Use point-gradient form for the tangent.",
          latex: "y+2=2(x-3) \\quad \\Rightarrow \\quad y=2x-8",
        },
        {
          explanation: "Find the normal gradient.",
          latex: "m_n=-\\frac{1}{2}",
        },
        {
          explanation: "Use point-gradient form for the normal.",
          latex:
            "y+2=-\\frac{1}{2}(x-3) \\quad \\Rightarrow \\quad y=-\\frac{1}{2}x-\\frac{1}{2}",
        },
      ],
      finalAnswerLatex:
        "\\text{Tangent: } y=2x-8, \\quad \\text{Normal: } y=-\\frac{1}{2}x-\\frac{1}{2}",
    },
  ],

  guidedPractice: [
    {
      id: "tan-norm-guided-1",
      prompt: "Find the derivative:",
      latex: "y=x^2+5x-1",
      answer: "2x+5",
      hint: "Differentiate each term.",
      explanation: "$\\frac{dy}{dx}=2x+5$.",
    },
    {
      id: "tan-norm-guided-2",
      prompt: "Find the tangent gradient at the given x-value:",
      latex: "y=x^2+5x-1, \\quad x=2",
      answer: "9",
      hint: "Use $\\frac{dy}{dx}=2x+5$, then substitute $x=2$.",
      explanation: "$m_t=2(2)+5=9$.",
    },
    {
      id: "tan-norm-guided-3",
      prompt: "Complete the normal gradient:",
      latex: "m_t=4 \\quad \\Rightarrow \\quad m_n=\\Box",
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "Use $m_n=-\\frac{1}{m_t}$.",
      explanation: "$m_n=-\\frac{1}{4}$.",
    },
    {
      id: "tan-norm-guided-4",
      prompt: "Complete the point-gradient equation for the tangent:",
      latex: "P=(2,9), \\quad m_t=7 \\quad \\Rightarrow \\quad y-\\Box=7(x-2)",
      answer: "9",
      hint: "Use the y-coordinate of the point.",
      explanation:
        "Point-gradient form is $y-y_1=m(x-x_1)$. With $P=(2,9)$ and $m=7$, the equation starts $y-9=7(x-2)$.",
    },
  ],

  independentPractice: [
    {
      id: "tan-norm-ind-1",
      prompt: "Find the tangent gradient:",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "4",
      hint: "Find $\\frac{dy}{dx}$, then the point on the curve.",
      explanation:
        "$\\frac{dy}{dx}=2x+2$, so $m_t=4$ and $P=(1,3)$. Therefore $y-3=4(x-1)$, so $y=4x-1$.",
    },
    {
      id: "tan-norm-ind-2",
      prompt: "Find the normal gradient:",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "The normal gradient is the negative reciprocal of the tangent gradient.",
      explanation:
        "$m_t=4$, so $m_n=-\\frac{1}{4}$ and $P=(1,3)$. Therefore $y-3=-\\frac{1}{4}(x-1)$, so $y=-\\frac{1}{4}x+\\frac{13}{4}$.",
    },
    {
      id: "tan-norm-ind-3",
      prompt: "Find the tangent gradient:",
      latex: "y=x^2-6x+5, \\quad x=2",
      answer: "-2",
      hint: "This tangent has a negative gradient.",
      explanation:
        "$\\frac{dy}{dx}=2x-6$, so $m_t=-2$ and $P=(2,-3)$. Therefore $y+3=-2(x-2)$, so $y=-2x+1$.",
    },
    {
      id: "tan-norm-ind-4",
      prompt: "Find the normal gradient:",
      latex: "f(x)=x^2-3x+2, \\quad x=4",
      answer: "-1/5",
      acceptedAnswers: ["-0.2"],
      hint: "Use $f'(x)$ for the tangent gradient.",
      explanation:
        "$f'(x)=2x-3$, so $m_t=5$, $m_n=-\\frac{1}{5}$, and $P=(4,6)$. Therefore $y-6=-\\frac{1}{5}(x-4)$, so $y=-\\frac{1}{5}x+\\frac{34}{5}$.",
    },
    {
      id: "tan-norm-ind-5",
      prompt:
        "A path is modelled by $f(x)$. Find the normal gradient at the given point.",
      latex: "f(x)=-x^2+4x+1, \\quad x=1",
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "Find the tangent gradient, then take the negative reciprocal.",
      explanation:
        "$f'(x)=-2x+4$, so $m_t=2$ at $x=1$ and $m_n=-\\frac{1}{2}$. The point is $(1,4)$, so $y-4=-\\frac{1}{2}(x-1)$ and $y=-\\frac{1}{2}x+\\frac{9}{2}$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Substituting into the original function to find the gradient.",
      fix: "Use the original function to find the point, but use the derivative to find the tangent gradient.",
    },
    {
      mistake: "Using the tangent gradient for the normal.",
      fix: "The normal gradient is the negative reciprocal: $m_n=-\\frac{1}{m_t}$.",
    },
    {
      mistake: "Forgetting that the tangent and normal pass through the same point.",
      fix: "Find $P=(a,f(a))$ first, then use that point for both equations.",
    },
    {
      mistake: "Making sign errors with negative reciprocals.",
      fix: "If $m_t=-2$, then $m_n=\\frac{1}{2}$.",
    },
  ],

  masteryQuiz: [
    {
      id: "tan-norm-mastery-1",
      prompt: "Find the derivative:",
      latex: "y=x^2-2x+4",
      answer: "A",
      choices: [
        { label: "A", text: "$2x-2$" },
        { label: "B", text: "$x^2-2$" },
        { label: "C", text: "$2x-2x$" },
        { label: "D", text: "$2x-2+4$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "$\\frac{dy}{dx}=2x-2$.",
    },
    {
      id: "tan-norm-mastery-2",
      prompt: "Find the tangent gradient at $x=3$:",
      latex: "y=x^2-2x+4",
      answer: "4",
      hint: "Substitute $x=3$ into the derivative.",
      explanation: "$m_t=2(3)-2=4$.",
    },
    {
      id: "tan-norm-mastery-3",
      prompt: "Find the point on the curve when $x=3$:",
      latex: "y=x^2-2x+4",
      answer: "(3,7)",
      acceptedAnswers: ["3,7", "3, 7", "(3, 7)"],
      hint: "Substitute $x=3$ into the original function.",
      explanation: "$y=3^2-2(3)+4=7$, so $P=(3,7)$.",
    },
    {
      id: "tan-norm-mastery-4",
      prompt: "Find $c$ in the tangent equation $y=4x+c$ at $x=3$.",
      latex: "y=x^2-2x+4",
      answer: "-5",
      hint: "Use $P=(3,7)$ and $m_t=4$.",
      explanation: "$y-7=4(x-3)$, so $y=4x-5$.",
    },
    {
      id: "tan-norm-mastery-5",
      prompt: "Find $c$ in the normal equation $y=-\\frac{1}{4}x+c$ at $x=3$.",
      latex: "y=x^2-2x+4",
      answer: "31/4",
      acceptedAnswers: ["7.75"],
      hint: "Use $m_n=-\\frac{1}{4}$ and $P=(3,7)$.",
      explanation:
        "$y-7=-\\frac{1}{4}(x-3)$, so $y=-\\frac{1}{4}x+\\frac{31}{4}$.",
    },
    {
      id: "tan-norm-mastery-6",
      prompt: "Find the tangent gradient at $x=1$:",
      latex: "y=3x^2-x",
      answer: "5",
      hint: "Differentiate, then substitute $x=1$.",
      explanation: "$\\frac{dy}{dx}=6x-1$, so the tangent gradient is $6(1)-1=5$.",
    },
    {
      id: "tan-norm-mastery-7",
      prompt: "Find the point on the curve when $x=3$:",
      latex: "y=x^2+2x",
      answer: "(3,15)",
      acceptedAnswers: ["3,15", "3, 15", "(3, 15)"],
      hint: "Substitute $x=3$ into the original function.",
      explanation: "$y=3^2+2(3)=15$, so the point is $(3,15)$.",
    },
    {
      id: "tan-norm-mastery-8",
      prompt: "Find $c$ in the tangent equation $y=8x+c$ at $x=3$.",
      latex: "y=x^2+2x",
      answer: "-9",
      hint: "Use the point $(3,15)$ and tangent gradient $8$.",
      explanation:
        "$\\frac{dy}{dx}=2x+2$, so $m_t=8$ at $x=3$. Then $y-15=8(x-3)$, so $y=8x-9$.",
    },
    {
      id: "tan-norm-mastery-9",
      prompt: "Find $c$ in the normal equation $y=-\\frac{1}{8}x+c$ at $x=3$.",
      latex: "y=x^2+2x",
      answer: "123/8",
      acceptedAnswers: ["15.375"],
      hint: "Use the negative reciprocal of the tangent gradient.",
      explanation:
        "$m_t=8$, so $m_n=-\\frac{1}{8}$. With point $(3,15)$, $y-15=-\\frac{1}{8}(x-3)$, so $y=-\\frac{1}{8}x+\\frac{123}{8}$.",
    },
    {
      id: "tan-norm-mastery-10",
      prompt:
        "A temperature model is given. Find the tangent gradient at $t=3$.",
      latex: "T(t)=t^2-4t+10",
      answer: "2",
      hint: "The tangent gradient is $T'(3)$.",
      explanation:
        "$T'(t)=2t-4$, so $T'(3)=2$. At $t=3$, the temperature curve has gradient $2$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const stationaryPointsLesson: ExplicitLesson = {
  id: "stationary-points",
  slug: "stationary-points",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Stationary Points",
  description:
    "Find stationary points by solving where the derivative is equal to zero.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Stationary Points",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to find stationary points by solving $f'(x)=0$ and writing the results as coordinates.",

  successCriteria: [
    "Explain that a stationary point occurs where the tangent is horizontal.",
    "Recognise that a horizontal tangent has gradient $0$.",
    "Differentiate a polynomial function to find $f'(x)$ or $\\frac{dy}{dx}$.",
    "Solve $f'(x)=0$ to find possible $x$-values for stationary points.",
    "Substitute each $x$-value into the original function and write each stationary point as a coordinate.",
  ],

  teaching: {
    paragraphs: [
      "A stationary point occurs where the tangent to the curve is horizontal.",
      "A horizontal tangent has gradient $0$, so stationary points occur where the derivative is equal to $0$.",
      "To find stationary points, first differentiate the function.",
      "Next, set the derivative equal to $0$ and solve for $x$.",
      "Then substitute each $x$-value into the original function, not the derivative, to find the matching $y$-value.",
      "This lesson focuses only on finding stationary points. Classifying them as maximum or minimum points comes later.",
    ],
    latexBlocks: [
      "\\text{Stationary point} \\quad \\Rightarrow \\quad \\text{horizontal tangent}",
      "m=0",
      "f'(x)=0",
      "P=(x, f(x))",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: One stationary point",
      questionLatex:
        "f(x)=x^2-6x+5 \\quad \\text{find the stationary point.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "f'(x)=2x-6",
        },
        {
          explanation: "Set the derivative equal to $0$.",
          latex: "2x-6=0",
        },
        {
          explanation: "Solve for $x$.",
          latex: "2x=6 \\quad \\Rightarrow \\quad x=3",
        },
        {
          explanation: "Substitute $x=3$ into the original function.",
          latex: "f(3)=3^2-6(3)+5=-4",
        },
        {
          explanation: "Write the stationary point as a coordinate.",
          latex: "(3,-4)",
        },
      ],
      finalAnswerLatex: "(3,-4)",
    },
    {
      title: "Worked example 2: Two stationary points",
      questionLatex:
        "y=x^3-3x^2-9x+2 \\quad \\text{find the stationary points.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "\\frac{dy}{dx}=3x^2-6x-9",
        },
        {
          explanation: "Set the derivative equal to $0$.",
          latex: "3x^2-6x-9=0",
        },
        {
          explanation: "Factorise and solve for $x$.",
          latex:
            "3(x^2-2x-3)=0 \\quad \\Rightarrow \\quad 3(x-3)(x+1)=0",
        },
        {
          explanation: "List the $x$-values.",
          latex: "x=3 \\quad \\text{or} \\quad x=-1",
        },
        {
          explanation: "Substitute each value into the original function.",
          latex:
            "y(3)=3^3-3(3)^2-9(3)+2=-25, \\quad y(-1)=(-1)^3-3(-1)^2-9(-1)+2=7",
        },
        {
          explanation: "Write the stationary points as coordinates.",
          latex: "(-1,7) \\quad \\text{and} \\quad (3,-25)",
        },
      ],
      finalAnswerLatex: "(-1,7), \\quad (3,-25)",
    },
  ],

  guidedPractice: [
    {
      id: "stationary-guided-1",
      prompt: "Find the derivative:",
      latex: "y=x^2-4x+1",
      answer: "2x-4",
      hint: "Differentiate term-by-term.",
      explanation: "$\\frac{dy}{dx}=2x-4$.",
    },
    {
      id: "stationary-guided-2",
      prompt: "Solve for the x-value of the stationary point:",
      latex: "2x-4=0",
      answer: "2",
      hint: "Set the derivative equal to $0$ and solve.",
      explanation: "$2x-4=0$, so $x=2$.",
    },
    {
      id: "stationary-guided-3",
      prompt: "Write the stationary point as a coordinate:",
      latex: "y=x^2-4x+1, \\quad x=2",
      answer: "(2,-3)",
      acceptedAnswers: ["2,-3", "2, -3", "(2, -3)"],
      hint: "Substitute $x=2$ into the original function.",
      explanation: "$y=2^2-4(2)+1=-3$, so the stationary point is $(2,-3)$.",
    },
    {
      id: "stationary-guided-4",
      prompt: "Complete the y-value for the stationary point:",
      latex: "f(x)=x^2-6x+5, \\quad x=3, \\quad f(3)=\\Box",
      answer: "-4",
      hint: "Substitute into the original function, not the derivative.",
      explanation:
        "$f(3)=3^2-6(3)+5=-4$, so the stationary point would be $(3,-4)$.",
    },
  ],

  independentPractice: [
    {
      id: "stationary-ind-1",
      prompt: "Find the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "(4,-10)",
      acceptedAnswers: ["4,-10", "4, -10", "(4, -10)"],
      hint: "Differentiate, set the derivative equal to $0$, then substitute back into the original function.",
      explanation:
        "$\\frac{dy}{dx}=2x-8$, so $2x-8=0$ gives $x=4$. Then $y=4^2-8(4)+6=-10$, so the stationary point is $(4,-10)$.",
    },
    {
      id: "stationary-ind-2",
      prompt: "Find the smaller stationary x-value:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "1",
      hint: "This cubic has two solutions to $\\frac{dy}{dx}=0$.",
      explanation:
        "$\\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)$, so $x=1$ or $x=3$. Substituting into the original function gives $(1,5)$ and $(3,1)$.",
    },
    {
      id: "stationary-ind-3",
      prompt: "Find the stationary point:",
      latex: "y=-x^2+4x+1",
      answer: "(2,5)",
      acceptedAnswers: ["2,5", "2, 5", "(2, 5)"],
      hint: "Be careful with the negative sign when differentiating $-x^2$.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $-2x+4=0$ gives $x=2$. Then $y=-(2)^2+4(2)+1=5$, so the stationary point is $(2,5)$.",
    },
    {
      id: "stationary-ind-4",
      prompt: "Find the positive stationary x-value:",
      latex: "f(x)=x^3-12x+5",
      answer: "2",
      hint: "Use $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=3x^2-12=3(x-2)(x+2)$, so $x=-2$ or $x=2$. Then $f(-2)=21$ and $f(2)=-11$, so the stationary points are $(-2,21)$ and $(2,-11)$.",
    },
    {
      id: "stationary-ind-5",
      prompt:
        "A profit model is given. Find the stationary point coordinate.",
      latex: "P(x)=-x^2+14x-20",
      answer: "(7,29)",
      acceptedAnswers: ["7,29", "7, 29", "(7, 29)"],
      hint: "Solve $P'(x)=0$, then substitute into $P(x)$.",
      explanation:
        "$P'(x)=-2x+14$, so $x=7$. Then $P(7)=-49+98-20=29$, giving stationary point $(7,29)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Substituting into the derivative to find the y-value.",
      fix: "Use the derivative to find $x$, then use the original function to find $y$.",
    },
    {
      mistake: "Forgetting to set the derivative equal to zero.",
      fix: "Stationary points occur where $f'(x)=0$.",
    },
    {
      mistake: "Writing only the x-value as the final answer.",
      fix: "A stationary point is a coordinate, so write it as $(x,y)$.",
    },
    {
      mistake: "Classifying the point too early.",
      fix: "For this lesson, only find the stationary point coordinates. Classification comes later.",
    },
  ],

  masteryQuiz: [
    {
      id: "stationary-mastery-1",
      prompt: "Differentiate:",
      latex: "y=x^3-3x^2-24x+4",
      answer: "B",
      choices: [
        { label: "A", text: "$3x^2-6x-24+4$" },
        { label: "B", text: "$3x^2-6x-24$" },
        { label: "C", text: "$x^2-6x-24$" },
        { label: "D", text: "$3x^3-6x-24$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "$\\frac{dy}{dx}=3x^2-6x-24$.",
    },
    {
      id: "stationary-mastery-2",
      prompt: "Find the smaller x-value where the derivative is zero:",
      latex: "3x^2-6x-24=0",
      answer: "-2",
      hint: "Factorise by taking out $3$ first.",
      explanation:
        "$3x^2-6x-24=3(x^2-2x-8)=3(x-4)(x+2)$, so $x=-2$ or $x=4$.",
    },
    {
      id: "stationary-mastery-3",
      prompt: "Find the y-value of the stationary point where $x=-2$.",
      latex: "y=x^3-3x^2-24x+4",
      answer: "32",
      hint: "Use the original function, not the derivative.",
      explanation: "$y=(-2)^3-3(-2)^2-24(-2)+4=32$.",
    },
    {
      id: "stationary-mastery-4",
      prompt: "Find the y-value of the stationary point where $x=4$.",
      latex: "y=x^3-3x^2-24x+4",
      answer: "-76",
      hint: "Use the original function again.",
      explanation: "$y=4^3-3(4)^2-24(4)+4=-76$.",
    },
    {
      id: "stationary-mastery-5",
      prompt: "Write the stationary point with the smaller x-value as a coordinate:",
      latex: "y=x^3-3x^2-24x+4",
      answer: "(-2,32)",
      acceptedAnswers: ["-2,32", "-2, 32", "(-2, 32)"],
      hint: "Pair each $x$-value with its matching $y$-value.",
      explanation:
        "The stationary points are $(-2,32)$ and $(4,-76)$.",
    },
    {
      id: "stationary-mastery-6",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-10x+3",
      answer: "(5,-22)",
      acceptedAnswers: ["5,-22", "5, -22", "(5, -22)"],
      hint: "Solve $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=2x-10$, so $x=5$. Then $f(5)=25-50+3=-22$, giving stationary point $(5,-22)$.",
    },
    {
      id: "stationary-mastery-7",
      prompt: "Find the positive stationary x-value:",
      latex: "y=x^3-12x+1",
      answer: "2",
      hint: "Differentiate and solve $y'=0$.",
      explanation:
        "$y'=3x^2-12=3(x-2)(x+2)$, so the stationary x-values are $x=-2$ and $x=2$.",
    },
    {
      id: "stationary-mastery-8",
      prompt: "Write the stationary point with positive x-value as a coordinate:",
      latex: "y=x^3-12x+1",
      answer: "(2,-15)",
      acceptedAnswers: ["2,-15", "2, -15", "(2, -15)"],
      hint: "Substitute each x-value into the original function.",
      explanation:
        "$y(-2)=17$ and $y(2)=-15$, so the stationary points are $(-2,17)$ and $(2,-15)$.",
    },
    {
      id: "stationary-mastery-9",
      prompt:
        "A profit model is given. Find the value of $x$ where the stationary profit occurs.",
      latex: "P(x)=-x^2+12x-5",
      answer: "6",
      hint: "Find $P'(x)$ and solve $P'(x)=0$.",
      explanation:
        "$P'(x)=-2x+12$. Solving $-2x+12=0$ gives $x=6$, so the stationary profit occurs when $x=6$.",
    },
    {
      id: "stationary-mastery-10",
      prompt:
        "Choose the correct statement about where stationary points occur.",
      latex: "f'(x)=0",
      answer: "B",
      choices: [
        { label: "A", text: "stationary points occur where $f(x)=0$" },
        { label: "B", text: "stationary points occur where $f'(x)=0$" },
        { label: "C", text: "stationary points occur where $f''(x)=0$" },
      ],
      hint: "A stationary point has a horizontal tangent.",
      explanation:
        "A horizontal tangent has gradient $0$, so stationary points occur where $f'(x)=0$. Option B is correct.",
    },
  ],

  masteryPassMark: 0.8,
};

export const increasingDecreasingFunctionsLesson: ExplicitLesson = {
  id: "increasing-decreasing-functions",
  slug: "increasing-decreasing-functions",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Increasing and Decreasing Functions",
  description:
    "Use the sign of the derivative to determine where a function is increasing or decreasing.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Increasing and Decreasing Functions",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use the sign of $f'(x)$ to determine intervals where a function is increasing or decreasing.",

  successCriteria: [
    "Explain that the derivative gives the gradient of the tangent.",
    "Use $f'(x)>0$ to identify intervals where a function is increasing.",
    "Use $f'(x)<0$ to identify intervals where a function is decreasing.",
    "Find critical values by solving $f'(x)=0$.",
    "Use test points or a sign table to state intervals clearly.",
  ],

  teaching: {
    paragraphs: [
      "The derivative tells us the gradient of the tangent to a curve.",
      "If $f'(x)>0$ on an interval, the tangent gradients are positive and the function is increasing on that interval.",
      "If $f'(x)<0$ on an interval, the tangent gradients are negative and the function is decreasing on that interval.",
      "To determine intervals of increase and decrease, differentiate the function, solve $f'(x)=0$, then test the sign of the derivative in each interval.",
      "This lesson focuses on intervals of increase and decrease. Classifying stationary points belongs in the next lesson.",
    ],
    latexBlocks: [
      "f'(x)>0 \\quad \\Rightarrow \\quad \\text{increasing}",
      "f'(x)<0 \\quad \\Rightarrow \\quad \\text{decreasing}",
      "f'(x)=0 \\quad \\Rightarrow \\quad \\text{critical value}",
      "\\text{test points} \\quad \\Rightarrow \\quad \\text{sign table} \\quad \\Rightarrow \\quad \\text{intervals}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: A quadratic",
      questionLatex:
        "f(x)=x^2-4x+1 \\quad \\text{determine where the function is increasing and decreasing.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "f'(x)=2x-4",
        },
        {
          explanation: "Find where $f'(x)=0$.",
          latex: "2x-4=0 \\quad \\Rightarrow \\quad x=2",
        },
        {
          explanation: "Test one value on each side of $x=2$.",
          latex:
            "f'(0)=-4<0, \\quad f'(3)=2>0",
        },
        {
          explanation: "Use the signs to state the intervals.",
          latex:
            "\\text{decreasing on }(-\\infty,2), \\quad \\text{increasing on }(2,\\infty)",
        },
      ],
      finalAnswerLatex:
        "\\text{Decreasing on }(-\\infty,2), \\quad \\text{increasing on }(2,\\infty)",
    },
    {
      title: "Worked example 2: A cubic",
      questionLatex:
        "f(x)=x^3-3x^2 \\quad \\text{determine intervals of increase and decrease.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "f'(x)=3x^2-6x",
        },
        {
          explanation: "Factorise and solve $f'(x)=0$.",
          latex:
            "3x^2-6x=0 \\quad \\Rightarrow \\quad 3x(x-2)=0 \\quad \\Rightarrow \\quad x=0,2",
        },
        {
          explanation: "Test intervals around the critical values.",
          latex:
            "f'(-1)=9>0, \\quad f'(1)=-3<0, \\quad f'(3)=9>0",
        },
        {
          explanation: "State the increasing and decreasing intervals.",
          latex:
            "\\text{increasing on }(-\\infty,0)\\cup(2,\\infty), \\quad \\text{decreasing on }(0,2)",
        },
      ],
      finalAnswerLatex:
        "\\text{Increasing on }(-\\infty,0)\\cup(2,\\infty), \\quad \\text{decreasing on }(0,2)",
    },
  ],

  guidedPractice: [
    {
      id: "inc-dec-guided-1",
      prompt: "Find the derivative:",
      latex: "f(x)=x^2-6x+2",
      answer: "2x-6",
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=2x-6$.",
    },
    {
      id: "inc-dec-guided-2",
      prompt: "Solve for the critical value:",
      latex: "2x-6=0",
      answer: "3",
      hint: "Critical values occur where $f'(x)=0$.",
      explanation: "$2x-6=0$, so $x=3$.",
    },
    {
      id: "inc-dec-guided-3",
      prompt: "On $x<3$, is the function increasing or decreasing?",
      latex:
        "f'(x)=2x-6, \\quad f'(0)<0, \\quad f'(4)>0",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Negative derivative means decreasing, positive derivative means increasing.",
      explanation:
        "The function is decreasing on $(-\\infty,3)$ and increasing on $(3,\\infty)$.",
    },
    {
      id: "inc-dec-guided-4",
      prompt: "Fill in the missing sign in the sign table:",
      latex: "f'(x)=(x-1)(x-3), \\quad \\text{on }(1,3), \\quad f'(2)=\\Box",
      answer: "-",
      hint: "Substitute $x=2$ into the derivative.",
      explanation:
        "$f'(2)=(2-1)(2-3)=-1$, so the sign on $(1,3)$ is negative.",
    },
  ],

  independentPractice: [
    {
      id: "inc-dec-ind-1",
      prompt: "For $x>3$, is the function increasing or decreasing?",
      latex: "y=x^2-6x+2",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Find the derivative sign on each side of the critical value $x=3$.",
      explanation:
        "$\\frac{dy}{dx}=2x-6$, so $x=3$. The derivative is negative before $3$ and positive after $3$, so the function is decreasing on $(-\\infty,3)$ and increasing on $(3,\\infty)$.",
    },
    {
      id: "inc-dec-ind-2",
      prompt: "For $1<x<3$, is the function increasing or decreasing?",
      latex: "y=x^3-6x^2+9x",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "The derivative factorises as $3(x-1)(x-3)$.",
      explanation:
        "$\\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)$. Testing intervals gives increasing on $(-\\infty,1)$ and $(3,\\infty)$, and decreasing on $(1,3)$.",
    },
    {
      id: "inc-dec-ind-3",
      prompt: "For $x>2$, is the function increasing or decreasing?",
      latex: "y=-x^2+4x-1",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Be careful with the negative leading coefficient.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $x=2$. The derivative is positive before $2$ and negative after $2$, so the function is increasing on $(-\\infty,2)$ and decreasing on $(2,\\infty)$.",
    },
    {
      id: "inc-dec-ind-4",
      prompt: "For $-1<x<3$, is the function increasing or decreasing?",
      latex: "f(x)=-x^3+3x^2+9x",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Use $f'(x)=-3(x-3)(x+1)$.",
      explanation:
        "$f'(x)=-3x^2+6x+9=-3(x-3)(x+1)$. Testing intervals gives decreasing on $(-\\infty,-1)$ and $(3,\\infty)$, and increasing on $(-1,3)$.",
    },
    {
      id: "inc-dec-ind-5",
      prompt:
        "A model has derivative below. For $-4<x<2$, is the original function increasing or decreasing?",
      latex: "f'(x)=-3(x-2)(x+4)",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "The negative leading factor reverses the usual outside-positive pattern.",
      explanation:
        "Testing intervals around $x=-4$ and $x=2$ gives signs $-,+,-$. Therefore the function is increasing on $(-4,2)$ and decreasing on $(-\\infty,-4)$ and $(2,\\infty)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using the original function to test signs.",
      fix: "Test signs using the derivative $f'(x)$, not $f(x)$.",
    },
    {
      mistake: "Forgetting to split the number line at every critical value.",
      fix: "Each solution to $f'(x)=0$ creates a boundary for the sign table.",
    },
    {
      mistake: "Reversing the meaning of positive and negative derivative signs.",
      fix: "$f'(x)>0$ means increasing and $f'(x)<0$ means decreasing.",
    },
    {
      mistake: "Classifying stationary points in this lesson.",
      fix: "Only state intervals of increase and decrease here. Classification comes next.",
    },
  ],

  masteryQuiz: [
    {
      id: "inc-dec-mastery-1",
      prompt: "Find the derivative:",
      latex: "f(x)=x^3-12x+1",
      answer: "C",
      choices: [
        { label: "A", text: "$3x^2-12+1$" },
        { label: "B", text: "$x^2-12$" },
        { label: "C", text: "$3x^2-12$" },
        { label: "D", text: "$3x^3-12$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=3x^2-12$.",
    },
    {
      id: "inc-dec-mastery-2",
      prompt: "Find the positive critical value:",
      latex: "3x^2-12=0",
      answer: "2",
      hint: "Solve $x^2=4$.",
      explanation: "$3x^2-12=0$, so $x=-2$ or $x=2$.",
    },
    {
      id: "inc-dec-mastery-3",
      prompt: "On $-2<x<2$, is $f'(x)$ positive or negative?",
      latex: "(-\\infty,-2), \\quad (-2,2), \\quad (2,\\infty)",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
        { label: "C", text: "zero" },
      ],
      hint: "Substitute a test value into $f'(x)$ and check whether the derivative is positive or negative.",
      explanation: "$f'(-3)>0$, $f'(0)<0$, and $f'(3)>0$.",
    },
    {
      id: "inc-dec-mastery-4",
      prompt: "On $x<-2$, is the function increasing or decreasing?",
      latex: "f'(x)>0 \\text{ on } (-\\infty,-2) \\text{ and } (2,\\infty)",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Increasing means $f'(x)>0$.",
      explanation: "The function is increasing on $(-\\infty,-2)$ and $(2,\\infty)$.",
    },
    {
      id: "inc-dec-mastery-5",
      prompt: "On $-2<x<2$, is the function increasing or decreasing?",
      latex: "f'(x)<0 \\text{ on } (-2,2)",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Decreasing means $f'(x)<0$.",
      explanation: "The function is decreasing on $(-2,2)$.",
    },
    {
      id: "inc-dec-mastery-6",
      prompt: "On $1<x<4$, is $f'(x)$ positive or negative?",
      latex: "f'(x)=(x-1)(x-4)",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
        { label: "C", text: "zero" },
      ],
      hint: "A positive quadratic factorisation is positive outside its roots.",
      explanation:
        "Testing intervals around $x=1$ and $x=4$ gives the sign pattern $+,-,+$.",
    },
    {
      id: "inc-dec-mastery-7",
      prompt: "On $x>4$, is the function increasing or decreasing?",
      latex: "f'(x)=(x-1)(x-4)",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Increasing means $f'(x)>0$.",
      explanation:
        "$f'(x)>0$ on $(-\\infty,1)$ and $(4,\\infty)$, so the function is increasing on those intervals.",
    },
    {
      id: "inc-dec-mastery-8",
      prompt: "On $1<x<4$, is the function increasing or decreasing?",
      latex: "f'(x)=(x-1)(x-4)",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Decreasing means $f'(x)<0$.",
      explanation:
        "$f'(x)<0$ on $(1,4)$, so the function is decreasing on that interval.",
    },
    {
      id: "inc-dec-mastery-9",
      prompt:
        "A height function has $h'(2)=-3$. Complete the sentence: at $t=2$, the height is ____.",
      latex: "h'(2)=-3",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "A negative derivative means the quantity is decreasing.",
      explanation:
        "Since $h'(2)<0$, the height is decreasing at $t=2$.",
    },
    {
      id: "inc-dec-mastery-10",
      prompt:
        "Choose the correct statement. A: $f$ is increasing on $(2,5)$. B: $f$ is decreasing on $(2,5)$. C: $f$ is stationary for every $x$ in $(2,5)$.",
      latex: "f'(x)<0 \\quad \\text{for }2<x<5",
      answer: "B",
      choices: [
        { label: "A", text: "$f$ is increasing on $(2,5)$" },
        { label: "B", text: "$f$ is decreasing on $(2,5)$" },
        { label: "C", text: "$f$ is stationary for every $x$ in $(2,5)$" },
      ],
      hint: "Negative derivative means decreasing.",
      explanation:
        "Since $f'(x)<0$ throughout $(2,5)$, the function is decreasing on that interval. Option B is correct.",
    },
  ],

  masteryPassMark: 0.8,
};

export const firstDerivativeTestLesson: ExplicitLesson = {
  id: "first-derivative-test",
  slug: "first-derivative-test",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "First Derivative Test",
  description:
    "Classify stationary points by testing the sign of the first derivative on either side.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "First Derivative Test",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use the first derivative test to classify stationary points as local maxima or local minima.",

  successCriteria: [
    "Find stationary $x$-values by solving $f'(x)=0$.",
    "Use test points to determine the sign of $f'(x)$ around each stationary point.",
    "Identify a local maximum when $f'(x)$ changes from positive to negative.",
    "Identify a local minimum when $f'(x)$ changes from negative to positive.",
    "Find the coordinates of each stationary point and state its classification.",
  ],

  teaching: {
    paragraphs: [
      "The first derivative test uses the sign of $f'(x)$ around a stationary point.",
      "If $f'(x)$ changes from positive to negative, the function changes from increasing to decreasing, so there is a local maximum.",
      "If $f'(x)$ changes from negative to positive, the function changes from decreasing to increasing, so there is a local minimum.",
      "If $f'(x)$ does not change sign, the stationary point is not a local maximum or local minimum.",
      "This test builds directly on increasing and decreasing intervals.",
      "Always give the coordinates of the stationary point as well as the classification.",
    ],
    latexBlocks: [
      "+ \\; \\to \\; - \\quad \\Rightarrow \\quad \\text{local maximum}",
      "- \\; \\to \\; + \\quad \\Rightarrow \\quad \\text{local minimum}",
      "+ \\; \\to \\; + \\text{ or } - \\; \\to \\; - \\quad \\Rightarrow \\quad \\text{not a local maximum or minimum}",
      "f'(x)=0 \\quad \\Rightarrow \\quad \\text{test signs around the stationary point}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Classify one stationary point",
      questionLatex:
        "f(x)=x^2-6x+5 \\quad \\text{use the first derivative test to classify the stationary point.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "f'(x)=2x-6",
        },
        {
          explanation: "Solve $f'(x)=0$.",
          latex: "2x-6=0 \\quad \\Rightarrow \\quad x=3",
        },
        {
          explanation: "Test signs around $x=3$.",
          latex: "f'(0)=-6<0, \\quad f'(4)=2>0",
        },
        {
          explanation: "Classify using the sign change.",
          latex: "- \\; \\to \\; + \\quad \\Rightarrow \\quad \\text{local minimum}",
        },
        {
          explanation: "Find the coordinate.",
          latex: "f(3)=3^2-6(3)+5=-4",
        },
      ],
      finalAnswerLatex: "\\text{Local minimum at }(3,-4)",
    },
    {
      title: "Worked example 2: Classify two stationary points",
      questionLatex:
        "f(x)=x^3-3x^2-9x+2 \\quad \\text{use the first derivative test to classify the stationary points.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "f'(x)=3x^2-6x-9",
        },
        {
          explanation: "Solve $f'(x)=0$.",
          latex:
            "3x^2-6x-9=0 \\quad \\Rightarrow \\quad 3(x-3)(x+1)=0 \\quad \\Rightarrow \\quad x=-1,3",
        },
        {
          explanation: "Test signs across the intervals.",
          latex: "f'(-2)>0, \\quad f'(0)<0, \\quad f'(4)>0",
        },
        {
          explanation: "Classify each stationary point.",
          latex:
            "x=-1: + \\to - \\Rightarrow \\text{local maximum}, \\quad x=3: - \\to + \\Rightarrow \\text{local minimum}",
        },
        {
          explanation: "Find the coordinates.",
          latex: "f(-1)=7, \\quad f(3)=-25",
        },
      ],
      finalAnswerLatex:
        "\\text{Local maximum at }(-1,7), \\quad \\text{local minimum at }(3,-25)",
    },
  ],

  guidedPractice: [
    {
      id: "fdt-guided-1",
      prompt: "Find the derivative:",
      latex: "f(x)=x^2-4x+1",
      answer: "2x-4",
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=2x-4$.",
    },
    {
      id: "fdt-guided-2",
      prompt: "Find the stationary x-value:",
      latex: "2x-4=0",
      answer: "2",
      hint: "Solve $f'(x)=0$.",
      explanation: "$x=2$.",
    },
    {
      id: "fdt-guided-3",
      prompt: "Classify the stationary point:",
      latex: "f'(1)<0, \\quad f'(3)>0",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A change from negative to positive gives a local minimum.",
      explanation: "$- \\to +$ means the stationary point is a local minimum.",
    },
    {
      id: "fdt-guided-4",
      prompt: "Complete the classification from the sign change:",
      latex: "f'(x): \\quad + \\to -",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A first-derivative sign change from positive to negative gives a local maximum.",
      explanation:
        "A change from positive to negative means the stationary point is a local maximum.",
    },
  ],

  independentPractice: [
    {
      id: "fdt-ind-1",
      prompt: "Classify the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "This quadratic opens upwards.",
      explanation:
        "$\\frac{dy}{dx}=2x-8$, so $x=4$. The sign changes from negative to positive, and $y(4)=-10$, so there is a local minimum at $(4,-10)$.",
    },
    {
      id: "fdt-ind-2",
      prompt: "Classify the stationary point:",
      latex: "y=-x^2+4x-1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "This quadratic opens downwards.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $x=2$. The sign changes from positive to negative, and $y(2)=3$, so there is a local maximum at $(2,3)$.",
    },
    {
      id: "fdt-ind-3",
      prompt: "Classify the stationary point at $x=1$:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "The derivative is $3(x-1)(x-3)$.",
      explanation:
        "$\\frac{dy}{dx}=3(x-1)(x-3)$, so $x=1,3$. The signs are $+,-,+$, so there is a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "fdt-ind-4",
      prompt: "Classify the stationary point at $x=2$:",
      latex: "f(x)=x^3-12x+5",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the sign of $f'(x)=3(x-2)(x+2)$ on each side of $x=2$.",
      explanation:
        "$f'(x)=3(x-2)(x+2)$, so $x=-2,2$. The signs are $+,-,+$, so there is a local maximum at $(-2,21)$ and a local minimum at $(2,-11)$.",
    },
    {
      id: "fdt-ind-5",
      prompt:
        "A revenue model has one stationary point. Classify it.",
      latex: "R(x)=-x^2+10x+3",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the first derivative sign change around the stationary point.",
      explanation:
        "$R'(x)=-2x+10$, so $x=5$. The derivative changes from positive to negative, and $R(5)=28$, so there is a local maximum at $(5,28)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Classifying from the y-value instead of the derivative sign.",
      fix: "Use the sign change in $f'(x)$, not the size of the $y$-value.",
    },
    {
      mistake: "Forgetting to find the coordinates.",
      fix: "After classifying, substitute each stationary $x$-value into the original function.",
    },
    {
      mistake: "Reversing maximum and minimum sign changes.",
      fix: "$+ \\to -$ gives a local maximum, while $- \\to +$ gives a local minimum.",
    },
    {
      mistake: "Assuming every stationary point is a maximum or minimum.",
      fix: "If $f'(x)$ does not change sign, it is not a local maximum or local minimum.",
    },
  ],

  masteryQuiz: [
    {
      id: "fdt-mastery-1",
      prompt: "Differentiate:",
      latex: "f(x)=x^3-3x^2-24x+4",
      answer: "D",
      choices: [
        { label: "A", text: "$3x^2-3x-24$" },
        { label: "B", text: "$x^2-6x-24$" },
        { label: "C", text: "$3x^2-6x-24+4$" },
        { label: "D", text: "$3x^2-6x-24$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=3x^2-6x-24$.",
    },
    {
      id: "fdt-mastery-2",
      prompt: "Find the larger stationary x-value:",
      latex: "3x^2-6x-24=0",
      answer: "4",
      hint: "Factorise by taking out $3$ first.",
      explanation:
        "$3x^2-6x-24=3(x-4)(x+2)$, so $x=-2$ or $x=4$.",
    },
    {
      id: "fdt-mastery-3",
      prompt: "On $-2<x<4$, is $f'(x)$ positive or negative?",
      latex: "(-\\infty,-2), \\quad (-2,4), \\quad (4,\\infty)",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
        { label: "C", text: "zero" },
      ],
      hint: "Substitute a test value into $f'(x)$ on the interval and check its sign.",
      explanation: "The sign pattern is $+,-,+$.",
    },
    {
      id: "fdt-mastery-4",
      prompt: "Find the stationary point coordinate for $x=4$:",
      latex: "f(x)=x^3-3x^2-24x+4",
      answer: "(4,-76)",
      acceptedAnswers: ["4,-76", "4, -76", "(4, -76)"],
      hint: "Substitute both $x$-values into the original function.",
      explanation: "$f(-2)=32$ and $f(4)=-76$, so the points are $(-2,32)$ and $(4,-76)$.",
    },
    {
      id: "fdt-mastery-5",
      prompt: "Classify the stationary point at $x=-2$:",
      latex: "\\text{sign pattern } +,-,+ \\quad \\text{at } x=-2,4",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "$+ \\to -$ gives a local maximum, and $- \\to +$ gives a local minimum.",
      explanation:
        "There is a local maximum at $(-2,32)$ and a local minimum at $(4,-76)$.",
    },
    {
      id: "fdt-mastery-6",
      prompt: "Classify the stationary point from the sign change:",
      latex: "f'(x): \\quad + \\to -",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "In the first derivative test, increasing then decreasing means a local maximum.",
      explanation:
        "A change in $f'(x)$ from positive to negative means the stationary point is a local maximum.",
    },
    {
      id: "fdt-mastery-7",
      prompt: "Classify the stationary point at $x=3$ from the sign pattern:",
      latex: "x=1,3 \\qquad f'(x): \\quad +,-,+",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Look at the sign change at each stationary x-value.",
      explanation:
        "At $x=1$, $f'(x)$ changes from positive to negative, giving a local maximum. At $x=3$, it changes from negative to positive, giving a local minimum.",
    },
    {
      id: "fdt-mastery-8",
      prompt: "Classify the stationary point at $x=1$:",
      latex: "f(x)=x^3-6x^2+9x+1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "The derivative factorises as $3(x-1)(x-3)$.",
      explanation:
        "$f'(x)=3x^2-12x+9=3(x-1)(x-3)$. The sign pattern is $+,-,+$, so the points are a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "fdt-mastery-9",
      prompt:
        "The derivative is positive on both sides of a stationary point at $x=0$. Choose the best classification.",
      latex: "f'(x): \\quad +,+",
      answer: "C",
      acceptedAnswers: [
        "not a local maximum or minimum",
        "not maximum or minimum",
        "not max or min",
      ],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A maximum or minimum needs a sign change in $f'(x)$.",
      explanation:
        "If $f'(x)$ does not change sign, the stationary point is not a local maximum or local minimum.",
    },
    {
      id: "fdt-mastery-10",
      prompt:
        "A profit function has a stationary point where $x=5$ and $P(5)=40$. The derivative changes from positive to negative. Complete the classification.",
      latex: "P'(x): \\quad + \\to -",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Positive to negative means a local maximum.",
      explanation:
        "The profit increases before $x=5$ and decreases after $x=5$, so there is a local maximum profit of $40$ at $x=5$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const secondDerivativeTestLesson: ExplicitLesson = {
  id: "second-derivative-test",
  slug: "second-derivative-test",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Second Derivative Test",
  description:
    "Use the second derivative to classify stationary points as local maxima or local minima.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Second Derivative Test",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use the second derivative test to classify stationary points and write their coordinates.",

  successCriteria: [
    "Find stationary $x$-values by solving $f'(x)=0$.",
    "Find the second derivative $f''(x)$.",
    "Use $f''(x)>0$ to identify a local minimum at a stationary point.",
    "Use $f''(x)<0$ to identify a local maximum at a stationary point.",
    "Recognise that $f''(x)=0$ makes the second derivative test inconclusive.",
  ],

  teaching: {
    paragraphs: [
      "The second derivative is the derivative of the first derivative.",
      "The second derivative can be used to test concavity at a stationary point.",
      "Students must still find the stationary point first by solving $f'(x)=0$.",
      "If $f''(x)>0$ at a stationary point, the graph is concave up there and the point is a local minimum.",
      "If $f''(x)<0$ at a stationary point, the graph is concave down there and the point is a local maximum.",
      "If $f''(x)=0$, the second derivative test is inconclusive, so another method is needed.",
    ],
    latexBlocks: [
      "f''(x)=\\frac{d}{dx}\\left(f'(x)\\right)",
      "f''(a)>0 \\quad \\Rightarrow \\quad \\text{local minimum at }x=a",
      "f''(a)<0 \\quad \\Rightarrow \\quad \\text{local maximum at }x=a",
      "f''(a)=0 \\quad \\Rightarrow \\quad \\text{inconclusive}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: One stationary point",
      questionLatex:
        "f(x)=x^2-6x+5 \\quad \\text{use the second derivative test to classify the stationary point.}",
      steps: [
        {
          explanation: "Find the first derivative.",
          latex: "f'(x)=2x-6",
        },
        {
          explanation: "Solve $f'(x)=0$.",
          latex: "2x-6=0 \\quad \\Rightarrow \\quad x=3",
        },
        {
          explanation: "Find the second derivative.",
          latex: "f''(x)=2",
        },
        {
          explanation: "Evaluate $f''(x)$ at the stationary $x$-value.",
          latex: "f''(3)=2>0",
        },
        {
          explanation: "Find the coordinate and classify.",
          latex: "f(3)=-4 \\quad \\Rightarrow \\quad \\text{local minimum at }(3,-4)",
        },
      ],
      finalAnswerLatex: "\\text{Local minimum at }(3,-4)",
    },
    {
      title: "Worked example 2: Two stationary points",
      questionLatex:
        "f(x)=x^3-3x^2-9x+2 \\quad \\text{use the second derivative test to classify the stationary points.}",
      steps: [
        {
          explanation: "Find the first derivative.",
          latex: "f'(x)=3x^2-6x-9",
        },
        {
          explanation: "Solve $f'(x)=0$.",
          latex:
            "3x^2-6x-9=0 \\quad \\Rightarrow \\quad 3(x-3)(x+1)=0 \\quad \\Rightarrow \\quad x=-1,3",
        },
        {
          explanation: "Find the second derivative.",
          latex: "f''(x)=6x-6",
        },
        {
          explanation: "Evaluate $f''(x)$ at each stationary $x$-value.",
          latex: "f''(-1)=-12<0, \\quad f''(3)=12>0",
        },
        {
          explanation: "Find the coordinates and classify.",
          latex:
            "f(-1)=7, \\quad f(3)=-25 \\quad \\Rightarrow \\quad \\text{local maximum at }(-1,7), \\quad \\text{local minimum at }(3,-25)",
        },
      ],
      finalAnswerLatex:
        "\\text{Local maximum at }(-1,7), \\quad \\text{local minimum at }(3,-25)",
    },
  ],

  guidedPractice: [
    {
      id: "sdt-guided-1",
      prompt: "Find the first derivative:",
      latex: "f(x)=x^2-4x+1",
      answer: "2x-4",
      hint: "Differentiate $f(x)$.",
      explanation: "$f'(x)=2x-4$.",
    },
    {
      id: "sdt-guided-2",
      prompt: "Find the stationary x-value:",
      latex: "2x-4=0",
      answer: "2",
      hint: "Solve $f'(x)=0$.",
      explanation: "$x=2$.",
    },
    {
      id: "sdt-guided-3",
      prompt: "Use the second derivative to classify:",
      latex: "f''(x)=2, \\quad x=2",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "$f''(2)>0$ means concave up.",
      explanation: "$f''(2)=2>0$, so the stationary point is a local minimum.",
    },
    {
      id: "sdt-guided-4",
      prompt: "Complete the second derivative:",
      latex: "f'(x)=3x^2-12x+9 \\quad \\Rightarrow \\quad f''(x)=\\Box",
      answer: "6x-12",
      hint: "Differentiate the first derivative.",
      explanation:
        "$f''(x)=6x-12$. This can then be evaluated at each stationary x-value.",
    },
  ],

  independentPractice: [
    {
      id: "sdt-ind-1",
      prompt: "Classify the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Use $y''$: a positive second derivative gives a local minimum.",
      explanation:
        "$y'=2x-8$, so $x=4$. Since $y''=2>0$ and $y(4)=-10$, there is a local minimum at $(4,-10)$.",
    },
    {
      id: "sdt-ind-2",
      prompt: "Classify the stationary point:",
      latex: "y=-x^2+4x-1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "The second derivative is negative.",
      explanation:
        "$y'=-2x+4$, so $x=2$. Since $y''=-2<0$ and $y(2)=3$, there is a local maximum at $(2,3)$.",
    },
    {
      id: "sdt-ind-3",
      prompt: "Classify the stationary point at $x=3$:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Evaluate $y''=6x-12$ at $x=3$; positive means local minimum.",
      explanation:
        "$y'=3x^2-12x+9=3(x-1)(x-3)$, so $x=1,3$. Since $y''=6x-12$, $y''(1)<0$ and $y''(3)>0$. The points are a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "sdt-ind-4",
      prompt: "Use the second derivative test:",
      latex: "f(x)=x^3",
      answer: "C",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Find $f'(x)$ and $f''(x)$, then evaluate at $x=0$.",
      explanation:
        "$f'(x)=3x^2$, so $x=0$. Since $f''(x)=6x$ and $f''(0)=0$, the second derivative test is inconclusive at $(0,0)$.",
    },
    {
      id: "sdt-ind-5",
      prompt:
        "A profit model has a stationary point at $x=4$. Use the second derivative test to classify it.",
      latex: "P(4)=48, \\quad P''(4)=-6",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A negative second derivative gives a local maximum.",
      explanation:
        "Since $P''(4)=-6<0$, the stationary point is a local maximum. With $P(4)=48$, the coordinate is $(4,48)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using $f''(x)$ before finding stationary points.",
      fix: "First solve $f'(x)=0$, then evaluate $f''(x)$ at those $x$-values.",
    },
    {
      mistake: "Reversing the second derivative classifications.",
      fix: "$f''(x)>0$ gives a local minimum, while $f''(x)<0$ gives a local maximum.",
    },
    {
      mistake: "Treating $f''(x)=0$ as a maximum or minimum.",
      fix: "When $f''(x)=0$, the second derivative test is inconclusive.",
    },
    {
      mistake: "Forgetting coordinates.",
      fix: "After classifying, substitute into the original function to find the $y$-value.",
    },
  ],

  masteryQuiz: [
    {
      id: "sdt-mastery-1",
      prompt: "Differentiate:",
      latex: "f(x)=x^3-3x^2-24x+4",
      answer: "A",
      choices: [
        { label: "A", text: "$3x^2-6x-24$" },
        { label: "B", text: "$3x^2-6x-24+4$" },
        { label: "C", text: "$x^2-6x-24$" },
        { label: "D", text: "$3x^3-6x-24$" },
      ],
      hint: "Find $f'(x)$.",
      explanation: "$f'(x)=3x^2-6x-24$.",
    },
    {
      id: "sdt-mastery-2",
      prompt: "Find the larger stationary x-value:",
      latex: "3x^2-6x-24=0",
      answer: "4",
      hint: "Factorise the quadratic.",
      explanation: "$3x^2-6x-24=3(x-4)(x+2)$, so $x=-2$ or $x=4$.",
    },
    {
      id: "sdt-mastery-3",
      prompt: "Find the second derivative:",
      latex: "f'(x)=3x^2-6x-24",
      answer: "B",
      choices: [
        { label: "A", text: "$6x-24$" },
        { label: "B", text: "$6x-6$" },
        { label: "C", text: "$3x-6$" },
        { label: "D", text: "$6x^2-6$" },
      ],
      hint: "Differentiate $f'(x)$.",
      explanation: "$f''(x)=6x-6$.",
    },
    {
      id: "sdt-mastery-4",
      prompt: "Evaluate the second derivative at $x=4$:",
      latex: "f''(x)=6x-6",
      answer: "18",
      hint: "Substitute each $x$-value into $f''(x)$.",
      explanation: "$f''(-2)=-18<0$ and $f''(4)=18>0$.",
    },
    {
      id: "sdt-mastery-5",
      prompt: "Classify the stationary point at $x=-2$:",
      latex: "f(-2)=32, \\quad f(4)=-76, \\quad f''(-2)<0, \\quad f''(4)>0",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Negative second derivative gives a local maximum; positive gives a local minimum.",
      explanation:
        "There is a local maximum at $(-2,32)$ and a local minimum at $(4,-76)$.",
    },
    {
      id: "sdt-mastery-6",
      prompt: "Evaluate the second derivative at $x=2$:",
      latex: "f''(x)=6x-6",
      answer: "6",
      hint: "Substitute $x=2$ into $6x-6$.",
      explanation: "$f''(2)=6(2)-6=6$.",
    },
    {
      id: "sdt-mastery-7",
      prompt: "Classify the stationary point:",
      latex: "f''(2)=6",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A positive second derivative means concave up.",
      explanation:
        "Since $f''(2)=6>0$, the graph is concave up at the stationary point, so it is a local minimum.",
    },
    {
      id: "sdt-mastery-8",
      prompt: "Classify the stationary point:",
      latex: "f''(-1)=-12",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A negative second derivative means concave down.",
      explanation:
        "Since $f''(-1)=-12<0$, the graph is concave down at the stationary point, so it is a local maximum.",
    },
    {
      id: "sdt-mastery-9",
      prompt: "Complete the classification from the second derivative test:",
      latex: "f''(0)=0",
      answer: "C",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "The second derivative test does not decide when $f''(x)=0$.",
      explanation:
        "When $f''(0)=0$, the second derivative test is inconclusive. Another method, such as the first derivative test, is needed.",
    },
    {
      id: "sdt-mastery-10",
      prompt:
        "A profit function has a stationary point where $x=4$, $P(4)=120$, and $P''(4)<0$. Complete the classification.",
      latex: "P''(4)<0",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A negative second derivative gives a local maximum.",
      explanation:
        "Since $P''(4)<0$, the stationary point is a local maximum. The maximum profit value is $120$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const curveSketchingLesson: ExplicitLesson = {
  id: "curve-sketching",
  slug: "curve-sketching",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Curve Sketching with Derivatives",
  description:
    "Combine intercepts, stationary points, derivative signs, and concavity to sketch polynomial curves.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Curve Sketching with Derivatives",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to combine intercepts, stationary points, derivative signs, and concavity to sketch key features of polynomial graphs.",

  successCriteria: [
    "Find intercepts where appropriate.",
    "Find $f'(x)$ and solve $f'(x)=0$ to locate stationary points.",
    "Find stationary point coordinates.",
    "Use first derivative signs or the second derivative to describe the graph shape.",
    "List key features clearly before sketching the curve.",
  ],

  teaching: {
    paragraphs: [
      "Curve sketching combines information about intercepts, stationary points, increasing and decreasing intervals, and concavity.",
      "Derivatives help identify the key features and shape of the graph.",
      "To sketch a curve using derivatives, find intercepts where appropriate, then find $f'(x)$.",
      "Solve $f'(x)=0$ to find stationary $x$-values, then substitute into the original function to find stationary point coordinates.",
      "Use first derivative signs or the second derivative to understand whether the graph turns up or down at key points.",
      "This lesson focuses on polynomial functions suitable for Year 12 Mathematics Advanced, without requiring highly complex graphing.",
    ],
    latexBlocks: [
      "x\\text{-intercepts: } f(x)=0",
      "y\\text{-intercept: } f(0)",
      "f'(x)=0 \\quad \\Rightarrow \\quad \\text{stationary points}",
      "\\text{key features} \\quad \\Rightarrow \\quad \\text{sketch the general shape}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Sketch key features of a quadratic",
      questionLatex:
        "f(x)=x^2-4x+3 \\quad \\text{sketch the key features using derivatives.}",
      steps: [
        {
          explanation: "Find the intercepts.",
          latex:
            "x^2-4x+3=0 \\Rightarrow (x-1)(x-3)=0 \\Rightarrow x=1,3; \\quad f(0)=3",
        },
        {
          explanation: "Find the derivative and stationary point.",
          latex: "f'(x)=2x-4, \\quad 2x-4=0 \\Rightarrow x=2",
        },
        {
          explanation: "Find the stationary point coordinate.",
          latex: "f(2)=2^2-4(2)+3=-1 \\quad \\Rightarrow \\quad (2,-1)",
        },
        {
          explanation: "Use the second derivative to describe shape.",
          latex: "f''(x)=2>0 \\quad \\Rightarrow \\quad \\text{concave up, local minimum}",
        },
        {
          explanation: "List the key features for the sketch.",
          latex:
            "x\\text{-intercepts }(1,0),(3,0), \\quad y\\text{-intercept }(0,3), \\quad \\text{minimum }(2,-1)",
        },
      ],
      finalAnswerLatex:
        "(1,0),(3,0), \\quad (0,3), \\quad \\text{minimum at }(2,-1), \\quad \\text{opens upward}",
    },
    {
      title: "Worked example 2: Sketch key features of a cubic",
      questionLatex:
        "f(x)=x^3-3x^2 \\quad \\text{sketch the key features using derivatives.}",
      steps: [
        {
          explanation: "Find the intercepts.",
          latex:
            "x^3-3x^2=x^2(x-3) \\Rightarrow x=0,3; \\quad f(0)=0",
        },
        {
          explanation: "Find the derivative and stationary values.",
          latex:
            "f'(x)=3x^2-6x=3x(x-2) \\Rightarrow x=0,2",
        },
        {
          explanation: "Find stationary point coordinates.",
          latex: "f(0)=0, \\quad f(2)=8-12=-4",
        },
        {
          explanation: "Classify or describe shape.",
          latex:
            "f''(x)=6x-6, \\quad f''(0)<0, \\quad f''(2)>0",
        },
        {
          explanation: "List the key features for the sketch.",
          latex:
            "\\text{local maximum }(0,0), \\quad \\text{local minimum }(2,-4), \\quad x\\text{-intercepts }(0,0),(3,0)",
        },
      ],
      finalAnswerLatex:
        "\\text{local maximum }(0,0), \\quad \\text{local minimum }(2,-4), \\quad x\\text{-intercepts }(0,0),(3,0)",
    },
  ],

  guidedPractice: [
    {
      id: "curve-guided-1",
      prompt: "Find the y-intercept value:",
      latex: "f(x)=x^2-5x+6",
      answer: "6",
      hint: "Solve $f(x)=0$ and find $f(0)$.",
      explanation: "$f(x)=(x-2)(x-3)$, so the $x$-intercepts are $2$ and $3$, and $f(0)=6$.",
    },
    {
      id: "curve-guided-2",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-5x+6",
      answer: "(5/2,-1/4)",
      acceptedAnswers: ["5/2,-1/4", "5/2, -1/4", "(5/2, -1/4)", "(2.5,-0.25)", "(2.5, -0.25)", "2.5,-0.25", "2.5, -0.25"],
      hint: "Solve $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=2x-5$, so $x=\\frac{5}{2}$. Then $f\\left(\\frac{5}{2}\\right)=-\\frac{1}{4}$.",
    },
    {
      id: "curve-guided-3",
      prompt: "Classify the stationary point:",
      latex: "f(x)=x^2-5x+6",
      answer: "B",
      acceptedAnswers: ["min"],
      choices: [
        { label: "A", text: "maximum" },
        { label: "B", text: "minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the second derivative or the opening direction to decide maximum or minimum.",
      explanation:
        "Key features are $x$-intercepts $(2,0)$ and $(3,0)$, $y$-intercept $(0,6)$, and minimum $\\left(\\frac{5}{2},-\\frac{1}{4}\\right)$.",
    },
    {
      id: "curve-guided-4",
      prompt: "Choose the correct classification. A: minimum, B: maximum, C: neither.",
      latex: "f''\\left(\\frac{5}{2}\\right)=2",
      answer: "A",
      choices: [
        { label: "A", text: "minimum" },
        { label: "B", text: "maximum" },
        { label: "C", text: "neither" },
      ],
      hint: "Positive second derivative means concave up.",
      explanation:
        "Since $f''\\left(\\frac{5}{2}\\right)>0$, the stationary point is a minimum. Option A is correct.",
    },
  ],

  independentPractice: [
    {
      id: "curve-ind-1",
      prompt: "Find the stationary point:",
      latex: "y=x^2-2x-3",
      answer: "(1,-4)",
      acceptedAnswers: ["1,-4", "1, -4", "(1, -4)"],
      hint: "Find intercepts, then solve $y'=0$.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(3,0)$, the $y$-intercept is $(0,-3)$, and $y'=2x-2$ gives a minimum at $(1,-4)$.",
    },
    {
      id: "curve-ind-2",
      prompt: "Classify the stationary point at $x=-1$:",
      latex: "y=x^3-3x",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the derivative sign change around $x=-1$ to classify the point.",
      explanation:
        "$x$-intercepts are $(-\\sqrt{3},0)$, $(0,0)$, and $(\\sqrt{3},0)$. Since $y'=3x^2-3$, the stationary points are a local maximum at $(-1,2)$ and a local minimum at $(1,-2)$.",
    },
    {
      id: "curve-ind-3",
      prompt: "Find the maximum value:",
      latex: "y=-x^2+4x+5",
      answer: "9",
      hint: "The graph opens downward.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(5,0)$, the $y$-intercept is $(0,5)$, and $y'=-2x+4$ gives a maximum at $(2,9)$.",
    },
    {
      id: "curve-ind-4",
      prompt: "Find the local maximum point:",
      latex: "f(x)=x^3-6x^2+9x",
      answer: "(1,4)",
      acceptedAnswers: ["1,4", "1, 4", "(1, 4)"],
      hint: "Factorise for intercepts and use $f'(x)$ for stationary points.",
      explanation:
        "$f(x)=x(x-3)^2$, so the $x$-intercepts are $(0,0)$ and $(3,0)$. Since $f'(x)=3(x-1)(x-3)$, there is a local maximum at $(1,4)$ and a local minimum at $(3,0)$.",
    },
    {
      id: "curve-ind-5",
      prompt:
        "A curve sketching question asks for key features only. Find the maximum value.",
      latex: "f(x)=-x^2+6x-5",
      answer: "4",
      hint: "A downward-opening quadratic has a maximum at its stationary point.",
      explanation:
        "$f(x)=-(x-1)(x-5)$, so the x-intercepts are $(1,0)$ and $(5,0)$, and the y-intercept is $(0,-5)$. Since $f'(x)=-2x+6$, the stationary point is a maximum at $(3,4)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Sketching before finding key features.",
      fix: "Find intercepts and stationary points first, then sketch the general shape.",
    },
    {
      mistake: "Using $f'(x)=0$ to find intercepts.",
      fix: "Use $f(x)=0$ for $x$-intercepts and $f'(x)=0$ for stationary points.",
    },
    {
      mistake: "Forgetting the y-intercept.",
      fix: "Find the $y$-intercept by substituting $x=0$ into the original function.",
    },
    {
      mistake: "Drawing a graph that does not match the derivative information.",
      fix: "The sketch should match increasing and decreasing intervals, stationary points, and concavity.",
    },
  ],

  masteryQuiz: [
    {
      id: "curve-mastery-1",
      prompt: "Find the y-intercept value:",
      latex: "f(x)=x^2-4x+3",
      answer: "3",
      hint: "Solve $f(x)=0$ and find $f(0)$.",
      explanation: "The intercepts are $(1,0)$, $(3,0)$, and $(0,3)$.",
    },
    {
      id: "curve-mastery-2",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-4x+3",
      answer: "(2,-1)",
      acceptedAnswers: ["2,-1", "2, -1", "(2, -1)"],
      hint: "Solve $f'(x)=0$.",
      explanation: "$f'(x)=2x-4$, so $x=2$ and $f(2)=-1$.",
    },
    {
      id: "curve-mastery-3",
      prompt: "Classify the stationary point:",
      latex: "f''(x)=2, \\quad \\text{stationary point }(2,-1)",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "$f''(x)>0$ means concave up.",
      explanation: "Since $f''(2)>0$, the point $(2,-1)$ is a local minimum.",
    },
    {
      id: "curve-mastery-4",
      prompt: "For $x<2$, is the graph increasing or decreasing?",
      latex: "f'(x)=2x-4",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Check the sign of $f'(x)$ on the interval $x<2$.",
      explanation:
        "The graph is decreasing on $(-\\infty,2)$ and increasing on $(2,\\infty)$.",
    },
    {
      id: "curve-mastery-5",
      prompt: "Find the minimum value:",
      latex: "f(x)=x^2-4x+3",
      answer: "-1",
      hint: "Combine intercepts, stationary point, and shape.",
      explanation:
        "Use $x$-intercepts $(1,0)$ and $(3,0)$, $y$-intercept $(0,3)$, minimum $(2,-1)$, and the upward-opening shape.",
    },
    {
      id: "curve-mastery-6",
      prompt: "Find the maximum value:",
      latex: "y=-x^2+4x+5",
      answer: "9",
      hint: "Find intercepts and use $y'=0$ for the stationary point.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(5,0)$, the $y$-intercept is $(0,5)$, and $y'=-2x+4$ gives a maximum at $(2,9)$.",
    },
    {
      id: "curve-mastery-7",
      prompt: "Classify the stationary point at $x=-1$:",
      latex: "y=x^3-3x",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the derivative sign change around $x=-1$ to classify the point.",
      explanation:
        "$y'=3x^2-3=3(x-1)(x+1)$, so $x=-1,1$. The derivative changes $+,-,+$, giving a local maximum at $(-1,2)$ and a local minimum at $(1,-2)$.",
    },
    {
      id: "curve-mastery-8",
      prompt: "For $1<x<3$, is the graph increasing or decreasing?",
      latex: "f'(x)=3(x-1)(x-3)",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Check the sign of $f'(x)$ on the interval $1<x<3$.",
      explanation:
        "The sign pattern is $+,-,+$, so the function is increasing on $(-\\infty,1)$ and $(3,\\infty)$, and decreasing on $(1,3)$.",
    },
    {
      id: "curve-mastery-9",
      prompt:
        "Choose the best sketch description. A: downward parabola with a maximum. B: upward parabola with two x-intercepts and a minimum below the x-axis. C: cubic with two stationary points.",
      latex: "f(x)=x^2-2x-3",
      answer: "B",
      choices: [
        { label: "A", text: "downward parabola with a maximum" },
        { label: "B", text: "upward parabola with two x-intercepts and a minimum below the x-axis" },
        { label: "C", text: "cubic with two stationary points" },
      ],
      hint: "Check the leading coefficient and the stationary point.",
      explanation:
        "The leading coefficient is positive, so the parabola opens upward. It has x-intercepts at $x=-1$ and $x=3$, and a minimum at $(1,-4)$, so option B is correct.",
    },
    {
      id: "curve-mastery-10",
      prompt: "Find the local maximum point:",
      latex: "f(x)=x^3-6x^2+9x",
      answer: "(1,4)",
      acceptedAnswers: ["1,4", "1, 4", "(1, 4)"],
      hint: "Factorise for intercepts and use $f'(x)=0$ for stationary points.",
      explanation:
        "$f(x)=x(x-3)^2$, so the x-intercepts are $(0,0)$ and $(3,0)$. Since $f'(x)=3(x-1)(x-3)$, the stationary points are a local maximum at $(1,4)$ and a local minimum at $(3,0)$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const optimisationLesson: ExplicitLesson = {
  id: "optimisation",
  slug: "optimisation",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Optimisation Problems",
  description:
    "Form objective functions and use derivatives to solve maximum and minimum problems.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Optimisation Problems",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to model and solve optimisation problems using derivatives, then interpret the answer in context.",

  successCriteria: [
    "Define variables clearly for an optimisation problem.",
    "Write the quantity to maximise or minimise as a function of one variable.",
    "Use constraints to simplify the objective function.",
    "Differentiate and solve $f'(x)=0$.",
    "Check whether the value gives a maximum or minimum and answer in context with units where relevant.",
  ],

  teaching: {
    paragraphs: [
      "Optimisation means finding a maximum or minimum value.",
      "Many optimisation problems require building a function before differentiating.",
      "Start by defining variables and writing the quantity to maximise or minimise.",
      "Use any constraint to write the quantity as a function of one variable, and state the domain if it matters.",
      "Differentiate, solve $f'(x)=0$, then check whether the value gives a maximum or minimum.",
      "Finish by answering the question in context, including units where relevant.",
    ],
    latexBlocks: [
      "\\text{define variables} \\quad \\Rightarrow \\quad \\text{write objective function}",
      "\\text{constraint} \\quad \\Rightarrow \\quad Q=Q(x)",
      "Q'(x)=0",
      "\\text{check maximum or minimum} \\quad \\Rightarrow \\quad \\text{answer in context}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Rectangle area",
      questionLatex:
        "\\text{A rectangle has perimeter }40\\text{ cm. Find the dimensions that maximise its area.}",
      steps: [
        {
          explanation: "Define variables and write the constraint.",
          latex: "2x+2y=40 \\quad \\Rightarrow \\quad x+y=20",
        },
        {
          explanation: "Write one variable in terms of the other.",
          latex: "y=20-x",
        },
        {
          explanation: "Write the area as a function of one variable.",
          latex: "A=x y=x(20-x)=20x-x^2",
        },
        {
          explanation: "Differentiate and solve $A'(x)=0$.",
          latex: "A'(x)=20-2x, \\quad 20-2x=0 \\Rightarrow x=10",
        },
        {
          explanation: "Find the other dimension and check the maximum.",
          latex: "y=20-10=10, \\quad A''(x)=-2<0",
        },
      ],
      finalAnswerLatex:
        "\\text{The maximum area occurs when the rectangle is }10\\text{ cm by }10\\text{ cm.}",
    },
    {
      title: "Worked example 2: Maximum profit",
      questionLatex:
        "P(x)=-2x^2+80x-300 \\quad \\text{find the value of }x\\text{ that maximises profit and the maximum profit.}",
      steps: [
        {
          explanation: "Differentiate the profit function.",
          latex: "P'(x)=-4x+80",
        },
        {
          explanation: "Solve $P'(x)=0$.",
          latex: "-4x+80=0 \\quad \\Rightarrow \\quad x=20",
        },
        {
          explanation: "Check that this gives a maximum.",
          latex: "P''(x)=-4<0",
        },
        {
          explanation: "Find the maximum profit.",
          latex: "P(20)=-2(20)^2+80(20)-300=500",
        },
      ],
      finalAnswerLatex:
        "\\text{Profit is maximised when }x=20, \\quad \\text{with maximum profit }500.",
    },
  ],

  guidedPractice: [
    {
      id: "optimisation-guided-1",
      prompt: "Complete the missing constant:",
      latex: "2x+2y=40",
      answer: "20",
      hint: "Divide by $2$, then rearrange.",
      explanation: "$2x+2y=40$ gives $x+y=20$, so $y=20-x$.",
    },
    {
      id: "optimisation-guided-2",
      prompt: "Complete the area function coefficient:",
      latex: "A=x(20-x)=\\Box x-x^2",
      answer: "20",
      hint: "Substitute $y=20-x$ into $A=xy$.",
      explanation: "$A=x(20-x)=20x-x^2$.",
    },
    {
      id: "optimisation-guided-3",
      prompt: "Find the x-value that maximises the function:",
      latex: "A(x)=20x-x^2",
      answer: "10",
      hint: "Differentiate and solve $A'(x)=0$.",
      explanation: "$A'(x)=20-2x$, so $x=10$.",
    },
    {
      id: "optimisation-guided-4",
      prompt: "Find the other dimension:",
      latex: "x=10, \\quad y=20-x",
      answer: "10",
      hint: "Find the other dimension and include units.",
      explanation:
        "$y=20-10=10$, so the rectangle with maximum area is $10$ cm by $10$ cm.",
    },
  ],

  independentPractice: [
    {
      id: "optimisation-ind-1",
      prompt: "A rectangle has perimeter 60 cm. Find the side length that maximises area.",
      latex: "2x+2y=60, \\quad A=xy",
      answer: "15",
      hint: "Use $y=30-x$ and maximise $A=x(30-x)$.",
      explanation:
        "$A=x(30-x)=30x-x^2$, so $A'(x)=30-2x=0$ gives $x=15$ and $y=15$. The dimensions are $15$ cm by $15$ cm.",
    },
    {
      id: "optimisation-ind-2",
      prompt: "Find the value of x that maximises revenue:",
      latex: "R(x)=-x^2+50x",
      answer: "25",
      hint: "Solve $R'(x)=0$.",
      explanation:
        "$R'(x)=-2x+50$, so $x=25$. Since $R''(x)=-2<0$, this is a maximum and $R(25)=625$.",
    },
    {
      id: "optimisation-ind-3",
      prompt: "Find the minimum value of the function:",
      latex: "C(x)=x^2-12x+50",
      answer: "14",
      hint: "Find the stationary point and use $C''(x)>0$.",
      explanation:
        "$C'(x)=2x-12$, so $x=6$. Since $C''(x)=2>0$, this is a minimum and $C(6)=14$.",
    },
    {
      id: "optimisation-ind-4",
      prompt: "A profit model is given. Find the x-value that maximises profit.",
      latex: "P(x)=-3x^2+90x-200",
      answer: "15",
      hint: "Differentiate, solve $P'(x)=0$, then substitute into $P(x)$.",
      explanation:
        "$P'(x)=-6x+90$, so $x=15$. Since $P''(x)=-6<0$, profit is maximised. $P(15)=475$, so the maximum profit is $475$ when $x=15$.",
    },
    {
      id: "optimisation-ind-5",
      prompt:
        "A rectangular pen is built against a wall using $36$ m of fencing for three sides. Find the shorter side length.",
      latex: "2x+y=36, \\quad A=xy",
      answer: "9",
      hint: "Use $y=36-2x$ and maximise $A=x(36-2x)$.",
      explanation:
        "$A=36x-2x^2$, so $A'(x)=36-4x=0$ gives $x=9$. Then $y=18$, so the maximum area occurs with dimensions $9$ m by $18$ m.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Differentiating before forming a function of one variable.",
      fix: "Use constraints first so the objective is written as $Q(x)$.",
    },
    {
      mistake: "Forgetting to answer in context.",
      fix: "State what the number means and include units where relevant.",
    },
    {
      mistake: "Assuming every stationary value is a maximum.",
      fix: "Check with the second derivative, first derivative signs, or the context.",
    },
    {
      mistake: "Dropping restrictions from the problem.",
      fix: "Consider the domain, such as lengths being positive.",
    },
  ],

  masteryQuiz: [
    {
      id: "optimisation-mastery-1",
      prompt: "Complete the missing constant in $y=\\Box-x$:",
      latex: "2x+2y=48",
      answer: "24",
      hint: "Divide by $2$ first.",
      explanation: "$x+y=24$, so $y=24-x$.",
    },
    {
      id: "optimisation-mastery-2",
      prompt: "Find the coefficient of $x$ after writing the area as a function of $x$.",
      latex: "2x+2y=48, \\quad A=xy",
      answer: "24",
      hint: "Substitute into $A=xy$.",
      explanation: "$A=x(24-x)=24x-x^2$.",
    },
    {
      id: "optimisation-mastery-3",
      prompt: "Differentiate and solve $A'(x)=0$:",
      latex: "A(x)=24x-x^2",
      answer: "12",
      hint: "$A'(x)=24-2x$.",
      explanation: "$A'(x)=24-2x$, so $x=12$.",
    },
    {
      id: "optimisation-mastery-4",
      prompt: "Justify whether this is a maximum or minimum:",
      latex: "A''(x)=-2",
      answer: "A",
      acceptedAnswers: ["max"],
      choices: [
        { label: "A", text: "maximum" },
        { label: "B", text: "minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A negative second derivative means the stationary value is a maximum.",
      explanation: "Since $A''(x)=-2<0$, the stationary value is a maximum.",
    },
    {
      id: "optimisation-mastery-5",
      prompt: "Find the other dimension when $x=12$.",
      latex: "y=24-x",
      answer: "12",
      hint: "Find $y$ and include units.",
      explanation: "$y=12$, so the rectangle with maximum area is $12$ cm by $12$ cm.",
    },
    {
      id: "optimisation-mastery-6",
      prompt: "Find the value of $x$ that maximises revenue:",
      latex: "R(x)=-2x^2+80x",
      answer: "20",
      hint: "Solve $R'(x)=0$.",
      explanation:
        "$R'(x)=-4x+80$. Solving $-4x+80=0$ gives $x=20$, and $R''(x)=-4<0$ confirms a maximum.",
    },
    {
      id: "optimisation-mastery-7",
      prompt: "Find the maximum revenue:",
      latex: "R(x)=-2x^2+80x",
      answer: "800",
      hint: "Substitute $x=20$ into $R(x)$.",
      explanation:
        "$R(20)=-2(20)^2+80(20)=800$, so the maximum revenue is $800$.",
    },
    {
      id: "optimisation-mastery-8",
      prompt: "Find the minimum value of the cost function:",
      latex: "C(x)=x^2-8x+30",
      answer: "14",
      hint: "Solve $C'(x)=0$, then substitute.",
      explanation:
        "$C'(x)=2x-8$, so $x=4$. Since $C''(x)=2>0$, this is a minimum, and $C(4)=14$.",
    },
    {
      id: "optimisation-mastery-9",
      prompt:
        "A rectangular pen is built against a wall with $50$ m of fencing for three sides. Find the shorter side length.",
      latex: "2x+y=50, \\quad A=xy",
      answer: "12.5",
      acceptedAnswers: ["25/2"],
      hint: "Use $y=50-2x$ and maximise $A=x(50-2x)$.",
      explanation:
        "$A=50x-2x^2$, so $A'(x)=50-4x=0$ gives $x=12.5$. Then $y=25$, so the maximum area occurs for dimensions $12.5$ m by $25$ m.",
    },
    {
      id: "optimisation-mastery-10",
      prompt:
        "Choose the best first step in a worded optimisation problem. A: Differentiate immediately. B: Define variables and form a function. C: Guess the maximum.",
      latex: "\\text{Optimisation process}",
      answer: "B",
      choices: [
        { label: "A", text: "Differentiate immediately" },
        { label: "B", text: "Define variables and form a function" },
        { label: "C", text: "Guess the maximum" },
      ],
      hint: "Most worded problems need a model before differentiation.",
      explanation:
        "Before differentiating, define variables, use constraints, and form the quantity to optimise as a function. Option B is correct.",
    },
  ],

  masteryPassMark: 0.8,
};

export const ratesOfChangeApplicationsLesson: ExplicitLesson = {
  id: "rates-of-change-applications",
  slug: "rates-of-change-applications",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Rates of Change Applications",
  description:
    "Interpret derivatives as instantaneous rates of change in applied contexts.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Rates of Change Applications",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to differentiate contextual functions and interpret instantaneous rates of change with units.",

  successCriteria: [
    "Explain that the derivative represents an instantaneous rate of change.",
    "Differentiate a quantity written as a function of time or another variable.",
    "Substitute the given value into the derivative.",
    "Interpret positive, negative, and zero rates of change.",
    "Include appropriate units in contextual answers.",
  ],

  teaching: {
    paragraphs: [
      "The derivative represents an instantaneous rate of change.",
      "If a quantity is written as a function of time, its derivative gives the rate at which it is changing.",
      "A positive rate means the quantity is increasing, while a negative rate means it is decreasing.",
      "A zero rate means the quantity is momentarily not changing.",
      "To solve a rate of change problem, identify the function, differentiate, substitute the given value, and interpret the result with units.",
    ],
    latexBlocks: [
      "\\text{rate of change}=\\frac{d}{dt}\\left(\\text{quantity}\\right)",
      "Q'(t)>0 \\quad \\Rightarrow \\quad \\text{increasing}",
      "Q'(t)<0 \\quad \\Rightarrow \\quad \\text{decreasing}",
      "Q'(t)=0 \\quad \\Rightarrow \\quad \\text{momentarily not changing}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Velocity from height",
      questionLatex:
        "h(t)=-5t^2+20t+1 \\quad \\text{find the velocity at }t=2.",
      steps: [
        {
          explanation: "Recognise that velocity is the rate of change of height.",
          latex: "v(t)=h'(t)",
        },
        {
          explanation: "Differentiate the height function.",
          latex: "h'(t)=-10t+20",
        },
        {
          explanation: "Substitute $t=2$.",
          latex: "h'(2)=-10(2)+20=0",
        },
        {
          explanation: "Interpret the result with units.",
          latex: "v=0\\text{ m/s}",
        },
      ],
      finalAnswerLatex: "\\text{The velocity at }t=2\\text{ is }0\\text{ m/s.}",
    },
    {
      title: "Worked example 2: Interpreting a population rate",
      questionLatex:
        "P(t)=t^3-6t^2+20t+100 \\quad \\text{find and interpret }P'(3).",
      steps: [
        {
          explanation: "Differentiate the population model.",
          latex: "P'(t)=3t^2-12t+20",
        },
        {
          explanation: "Substitute $t=3$.",
          latex: "P'(3)=3(3)^2-12(3)+20=11",
        },
        {
          explanation: "Interpret the positive rate.",
          latex: "P'(3)=11>0",
        },
        {
          explanation: "Write the answer in context.",
          latex: "\\text{The population is increasing at }11\\text{ units per time unit when }t=3.",
        },
      ],
      finalAnswerLatex:
        "P'(3)=11, \\quad \\text{so the population is increasing at }11\\text{ units per time unit.}",
    },
  ],

  guidedPractice: [
    {
      id: "rates-guided-1",
      prompt: "Identify the rate function:",
      latex: "s(t)=3t^2+2t",
      answer: "s'(t)",
      hint: "The derivative gives the instantaneous rate of change.",
      explanation: "The rate function is $s'(t)$.",
    },
    {
      id: "rates-guided-2",
      prompt: "Differentiate:",
      latex: "s(t)=3t^2+2t",
      answer: "6t+2",
      hint: "Differentiate term-by-term.",
      explanation: "$s'(t)=6t+2$.",
    },
    {
      id: "rates-guided-3",
      prompt: "Find the rate value at $t=2$:",
      latex: "s'(t)=6t+2",
      answer: "14",
      hint: "Substitute $t=2$ and interpret the positive sign.",
      explanation: "$s'(2)=14$, so the quantity is increasing at $14$ units per time unit.",
    },
    {
      id: "rates-guided-4",
      prompt: "Complete the sentence: The height is ____.",
      latex: "h'(3)=-6 \\quad \\text{metres per second}",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "A negative derivative means decreasing.",
      explanation:
        "Since $h'(3)=-6$, the height is decreasing at $6$ metres per second when $t=3$.",
    },
  ],

  independentPractice: [
    {
      id: "rates-ind-1",
      prompt: "The height of an object is given. Find the velocity at $t=1$.",
      latex: "h(t)=-5t^2+15t+2",
      answer: "5 m/s",
      acceptedAnswers: ["5 metres per second", "5 meters per second"],
      hint: "Velocity is $h'(t)$.",
      explanation: "$h'(t)=-10t+15$, so $h'(1)=5$. The velocity is $5$ m/s.",
    },
    {
      id: "rates-ind-2",
      prompt: "Find the population rate value at $t=4$.",
      latex: "P(t)=2t^2+5t+100",
      answer: "21",
      hint: "Differentiate, then substitute $t=4$.",
      explanation: "$P'(t)=4t+5$, so $P'(4)=21$. The population is increasing at $21$ people per year.",
    },
    {
      id: "rates-ind-3",
      prompt: "Find the rate of change value when $x=10$.",
      latex: "R(x)=-x^2+40x",
      answer: "20",
      hint: "Use $R'(x)$.",
      explanation: "$R'(x)=-2x+40$, so $R'(10)=20$. Revenue is increasing at $20$ dollars per item.",
    },
    {
      id: "rates-ind-4",
      prompt: "Find the rate value at $t=3$.",
      latex: "Q(t)=-2t^2+8t+5",
      answer: "-4",
      hint: "A negative rate means the quantity is decreasing.",
      explanation: "$Q'(t)=-4t+8$, so $Q'(3)=-4$. The quantity is decreasing at $4$ units per second.",
    },
    {
      id: "rates-ind-5",
      prompt:
        "A tank volume is modelled by $V(t)$. At $t=4$, is the volume increasing or decreasing?",
      latex: "V(t)=-t^2+6t+20",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Differentiate, substitute $t=4$, then interpret the negative sign.",
      explanation:
        "$V'(t)=-2t+6$, so $V'(4)=-2$. The tank volume is decreasing at $2$ litres per minute when $t=4$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Giving only the derivative without substituting the given value.",
      fix: "After differentiating, substitute the specified value into the derivative.",
    },
    {
      mistake: "Forgetting units.",
      fix: "Rates need units such as metres per second, dollars per item, or people per year.",
    },
    {
      mistake: "Interpreting a negative rate as a negative quantity.",
      fix: "A negative rate means the quantity is decreasing at that instant.",
    },
    {
      mistake: "Using the original function value as the rate.",
      fix: "Use the derivative value, not the original function value, for the instantaneous rate.",
    },
  ],

  masteryQuiz: [
    {
      id: "rates-mastery-1",
      prompt: "Differentiate the contextual function:",
      latex: "h(t)=-4t^2+24t+3",
      answer: "C",
      choices: [
        { label: "A", text: "$-8t+24+3$" },
        { label: "B", text: "$-4t+24$" },
        { label: "C", text: "$-8t+24$" },
        { label: "D", text: "$8t+24$" },
      ],
      hint: "Find $h'(t)$.",
      explanation: "$h'(t)=-8t+24$.",
    },
    {
      id: "rates-mastery-2",
      prompt: "Find the rate at $t=2$:",
      latex: "h'(t)=-8t+24",
      answer: "8",
      hint: "Substitute $t=2$.",
      explanation: "$h'(2)=8$.",
    },
    {
      id: "rates-mastery-3",
      prompt: "Complete the sentence: the height is ____.",
      latex: "h'(2)=8",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Positive rate means increasing.",
      explanation: "The height is increasing at $8$ m/s when $t=2$.",
    },
    {
      id: "rates-mastery-4",
      prompt: "Complete the sentence: the quantity is ____.",
      latex: "P'(5)=-12",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "A negative derivative means the quantity is decreasing.",
      explanation: "The quantity is decreasing at $12$ units per time unit.",
    },
    {
      id: "rates-mastery-5",
      prompt: "Interpret a zero rate:",
      latex: "Q'(3)=0",
      answer: "C",
      acceptedAnswers: ["not changing", "zero rate"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Zero rate means no instantaneous change at that moment.",
      explanation: "The quantity is momentarily not changing when $t=3$.",
    },
    {
      id: "rates-mastery-6",
      prompt: "Find the rate of change at $t=3$:",
      latex: "P(t)=t^3-6t^2+20t+100",
      answer: "11",
      hint: "Differentiate, then substitute $t=3$.",
      explanation:
        "$P'(t)=3t^2-12t+20$, so $P'(3)=27-36+20=11$.",
    },
    {
      id: "rates-mastery-7",
      prompt:
        "Choose the correct interpretation. A: decreasing. B: increasing. C: momentarily not changing.",
      latex: "P'(3)=11",
      answer: "B",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "A positive derivative means increasing.",
      explanation:
        "Since $P'(3)=11>0$, the quantity is increasing at $t=3$. Option B is correct.",
    },
    {
      id: "rates-mastery-8",
      prompt:
        "Complete the sentence for the displayed rate of change: the quantity is ____.",
      latex: "Q'(5)=0",
      answer: "C",
      acceptedAnswers: ["not changing", "zero rate"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Zero derivative means zero instantaneous rate.",
      explanation:
        "A derivative value of $0$ means the quantity is momentarily not changing at that instant.",
    },
    {
      id: "rates-mastery-9",
      prompt:
        "A tank has $V'(4)=-7$. What is the rate magnitude?",
      latex: "V'(4)=-7 \\text{ litres per minute}",
      answer: "7",
      hint: "A negative rate means decreasing.",
      explanation:
        "Since $V'(4)=-7$, the volume is decreasing at $7$ litres per minute.",
    },
    {
      id: "rates-mastery-10",
      prompt:
        "A cost function is given. At $x=8$, is the cost increasing or decreasing?",
      latex: "C(x)=x^2-10x+60",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Differentiate, substitute $x=8$, then use the sign of the derivative.",
      explanation:
        "$C'(x)=2x-10$, so $C'(8)=6$. The cost is increasing at $6$ dollars per item when $x=8$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const mixedExamPracticeLesson: ExplicitLesson = {
  id: "mixed-exam-practice",
  slug: "mixed-exam-practice",
  moduleSlug: "differential-calculus",
  moduleTitle: "Differential Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Mixed Differential Calculus Exam Practice",
  description:
    "Practise mixed HSC-style differential calculus questions that combine skills, reasoning, and interpretation.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Mixed Differential Calculus Exam Practice",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to choose and combine differential calculus skills in mixed exam-style questions.",

  successCriteria: [
    "Identify whether a question is asking for a derivative, gradient, tangent, normal, stationary point, maximum or minimum, interval behaviour, or rate of change.",
    "Show clear working and define variables in worded problems.",
    "Use derivatives to support exam reasoning rather than only performing calculations.",
    "Include units where relevant and answer worded questions in context.",
    "Transfer known differential calculus skills to unfamiliar situations.",
  ],

  teaching: {
    paragraphs: [
      "Exam questions often combine multiple differential calculus skills.",
      "The first step is not always obvious from the wording, so begin by identifying what the question is really asking.",
      "A question may require a derivative, gradient, tangent, normal, stationary point, maximum or minimum, interval behaviour, or rate of change.",
      "In worded problems, define variables clearly and connect each calculation back to the context.",
      "Good exam responses show working, include units where relevant, and finish with a sentence that answers the question.",
      "Transfer means applying known skills in unfamiliar situations rather than waiting for a familiar template.",
    ],
    latexBlocks: [
      "\\text{read} \\quad \\Rightarrow \\quad \\text{identify the skill} \\quad \\Rightarrow \\quad \\text{choose a method}",
      "\\text{tangent gradient}=f'(a)",
      "f'(x)=0 \\quad \\Rightarrow \\quad \\text{stationary points or optimisation}",
      "\\frac{d}{dt}\\left(\\text{quantity}\\right) \\quad \\Rightarrow \\quad \\text{rate of change}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Tangent and interpretation",
      questionLatex:
        "s(t)=t^3-6t^2+9t+2, \\quad t\\ge 0. \\quad \\text{a) Find }v(t). \\quad \\text{b) Find }v(2). \\quad \\text{c) Interpret the sign.}",
      steps: [
        {
          explanation: "Velocity is the derivative of displacement.",
          latex: "v(t)=s'(t)",
        },
        {
          explanation: "Differentiate the displacement function.",
          latex: "v(t)=3t^2-12t+9",
        },
        {
          explanation: "Substitute $t=2$.",
          latex: "v(2)=3(2)^2-12(2)+9=-3",
        },
        {
          explanation: "Interpret the negative sign in context.",
          latex:
            "v(2)<0 \\quad \\Rightarrow \\quad \\text{the particle is moving in the negative direction at }t=2",
        },
      ],
      finalAnswerLatex:
        "v(t)=3t^2-12t+9, \\quad v(2)=-3. \\quad \\text{The particle is moving in the negative direction at }t=2.",
    },
    {
      title: "Worked example 2: Stationary points and classification",
      questionLatex:
        "P(x)=-x^3+9x^2-15x+20, \\quad 0\\le x\\le 6. \\quad \\text{Find and classify stationary points in the domain.}",
      steps: [
        {
          explanation: "Differentiate the profit function.",
          latex: "P'(x)=-3x^2+18x-15",
        },
        {
          explanation: "Solve $P'(x)=0$.",
          latex:
            "-3x^2+18x-15=0 \\Rightarrow x^2-6x+5=0 \\Rightarrow x=1,5",
        },
        {
          explanation: "Both values are in the domain.",
          latex: "0\\le 1\\le 6, \\quad 0\\le 5\\le 6",
        },
        {
          explanation: "Use the second derivative to classify.",
          latex: "P''(x)=-6x+18, \\quad P''(1)=12>0, \\quad P''(5)=-12<0",
        },
        {
          explanation: "Find the coordinates.",
          latex: "P(1)=13, \\quad P(5)=45",
        },
      ],
      finalAnswerLatex:
        "\\text{Local minimum at }(1,13), \\quad \\text{local maximum at }(5,45).",
    },
    {
      title: "Worked example 3: Optimisation transfer",
      questionLatex:
        "\\text{A farmer has }60\\text{ m of fencing for a rectangular pen against a wall. Fencing is needed for three sides. Find the dimensions that maximise area.}",
      steps: [
        {
          explanation: "Define variables and write the fencing constraint.",
          latex: "2x+y=60",
        },
        {
          explanation: "Write the area in terms of one variable.",
          latex: "A=xy, \\quad y=60-2x \\Rightarrow A=x(60-2x)=60x-2x^2",
        },
        {
          explanation: "Differentiate and solve $A'(x)=0$.",
          latex: "A'(x)=60-4x, \\quad 60-4x=0 \\Rightarrow x=15",
        },
        {
          explanation: "Find the remaining dimension and check maximum.",
          latex: "y=60-2(15)=30, \\quad A''(x)=-4<0",
        },
        {
          explanation: "Answer in context.",
          latex: "\\text{two widths of }15\\text{ m and one length of }30\\text{ m}",
        },
      ],
      finalAnswerLatex:
        "\\text{The maximum area occurs when the pen is }15\\text{ m by }30\\text{ m.}",
    },
  ],

  guidedPractice: [
    {
      id: "mixed-guided-1",
      prompt: "Identify the calculus skill needed:",
      latex:
        "\\text{A question asks for the gradient of the curve }y=x^2+3x\\text{ at }x=2.",
      answer: "derivative",
      hint: "Gradient of a curve at a point comes from the derivative.",
      explanation:
        "The skill needed is differentiation, because the derivative gives the tangent gradient at a point.",
    },
    {
      id: "mixed-guided-2",
      prompt: "Work through a tangent question in context:",
      latex:
        "h(t)=-t^2+6t+1. \\quad \\text{Find the gradient of the tangent when }t=2.",
      answer: "2",
      hint: "Find $h'(t)$, then substitute $t=2$.",
      explanation:
        "$h'(t)=-2t+6$, so $h'(2)=2$. The tangent gradient at $t=2$ is $2$.",
    },
    {
      id: "mixed-guided-3",
      prompt: "Classify the stationary point:",
      latex: "f'(x)=2x-8, \\quad f(4)=3",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use $f'(x)=0$ and the sign of the derivative around $x=4$.",
      explanation:
        "$2x-8=0$ gives $x=4$. Since $f'(x)$ changes from negative to positive at $x=4$, there is a local minimum at $(4,3)$.",
    },
    {
      id: "mixed-guided-4",
      prompt: "Optimise using a constraint. Find $x$:",
      latex: "2x+y=30, \\quad A=xy",
      answer: "15/2",
      acceptedAnswers: ["7.5"],
      hint: "Use $y=30-2x$, then maximise $A=x(30-2x)$.",
      explanation:
        "$A=30x-2x^2$, so $A'(x)=30-4x=0$ gives $x=\\frac{15}{2}$. Then $y=15$.",
    },
  ],

  independentPractice: [
    {
      id: "mixed-ind-1",
      prompt: "Tangent and normal transfer: find the normal gradient.",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "Find the tangent gradient, then use the negative reciprocal.",
      explanation:
        "$y'=2x+2$, so $m_t=4$ at $x=1$. The point is $(1,3)$ and $m_n=-\\frac{1}{4}$. Hence $y-3=-\\frac{1}{4}(x-1)$, so $y=-\\frac{1}{4}x+\\frac{13}{4}$.",
    },
    {
      id: "mixed-ind-2",
      prompt: "Find the rate value:",
      latex: "C(t)=2t^2+5t+100 \\quad \\text{dollars, find and interpret }C'(3).",
      answer: "17",
      hint: "Differentiate and substitute $t=3$.",
      explanation:
        "$C'(t)=4t+5$, so $C'(3)=17$. The cost is increasing at $17$ dollars per hour when $t=3$.",
    },
    {
      id: "mixed-ind-3",
      prompt: "Classify the stationary point:",
      latex: "f(x)=x^2-10x+8",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Find the stationary point, then use $f''$ or a derivative sign test to classify it.",
      explanation:
        "$f'(x)=2x-10$, so $x=5$. Since $f''(x)=2>0$ and $f(5)=-17$, there is a local minimum at $(5,-17)$.",
    },
    {
      id: "mixed-ind-4",
      prompt: "Optimisation word problem. Find one side length:",
      latex:
        "\\text{A rectangle has perimeter }32\\text{ cm. Find dimensions for maximum area.}",
      answer: "8",
      hint: "Let the sides be $x$ and $y$, then use $x+y=16$.",
      explanation:
        "$y=16-x$ and $A=x(16-x)=16x-x^2$. $A'(x)=16-2x=0$ gives $x=8$, so $y=8$. The maximum area occurs for an $8$ cm by $8$ cm rectangle.",
    },
    {
      id: "mixed-ind-5",
      prompt: "Curve-sketching key features. Find the minimum value:",
      latex: "f(x)=x^2-6x+8",
      answer: "-1",
      hint: "Find intercepts and the stationary point.",
      explanation:
        "$f(x)=(x-2)(x-4)$, so the $x$-intercepts are $(2,0)$ and $(4,0)$, and the $y$-intercept is $(0,8)$. Since $f'(x)=2x-6$, the minimum is at $(3,-1)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Starting with differentiation without reading the question carefully.",
      fix: "First identify whether the question asks for a tangent, normal, stationary point, optimisation, interval behaviour, or rate.",
    },
    {
      mistake: "Leaving answers as raw calculations.",
      fix: "Write a final sentence that answers the question in context.",
    },
    {
      mistake: "Forgetting units in worded problems.",
      fix: "Include units for rates, lengths, areas, costs, and other contextual quantities.",
    },
    {
      mistake: "Mixing up function values and derivative values.",
      fix: "Use $f(x)$ for coordinates or quantities, and $f'(x)$ for gradients and rates.",
    },
  ],

  masteryQuiz: [
    {
      id: "mixed-mastery-1",
      prompt: "Find the tangent gradient in context at $t=2$:",
      latex: "s(t)=t^2+3t+1",
      answer: "7",
      hint: "Find the gradient and point at $t=2$.",
      explanation:
        "$s'(t)=2t+3$, so $s'(2)=7$. Also $s(2)=11$. The tangent is $s-11=7(t-2)$, so $s=7t-3$.",
    },
    {
      id: "mixed-mastery-2",
      prompt: "Find the normal gradient at the point where $x=3$.",
      latex: "y=x^2-4x+1",
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "Find the tangent gradient, then use the negative reciprocal.",
      explanation:
        "$y'=2x-4$, so at $x=3$, $m_t=2$ and $m_n=-\\frac{1}{2}$. The point is $(3,-2)$, so $y+2=-\\frac{1}{2}(x-3)$ and $y=-\\frac{1}{2}x-\\frac{1}{2}$.",
    },
    {
      id: "mixed-mastery-3",
      prompt: "Find stationary point coordinates:",
      latex: "f(x)=x^2-8x+5",
      answer: "(4,-11)",
      acceptedAnswers: ["4,-11", "4, -11", "(4, -11)"],
      hint: "Solve $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=2x-8$, so $x=4$. Then $f(4)=16-32+5=-11$, giving stationary point $(4,-11)$.",
    },
    {
      id: "mixed-mastery-4",
      prompt: "For $1<x<3$, is the function increasing or decreasing?",
      latex: "f'(x)=3(x-1)(x-3)",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Check the sign of $f'(x)$ on the interval $1<x<3$.",
      explanation:
        "The sign pattern is $+,-,+$, so the function is increasing on $(-\\infty,1)$ and $(3,\\infty)$, and decreasing on $(1,3)$.",
    },
    {
      id: "mixed-mastery-5",
      prompt: "Optimisation with a worded constraint. Find the shorter side length:",
      latex:
        "\\text{A pen against a wall uses }40\\text{ m of fencing for three sides. Find dimensions for maximum area.}",
      answer: "10",
      hint: "Use $2x+y=40$ and maximise $A=xy$.",
      explanation:
        "$y=40-2x$, so $A=x(40-2x)=40x-2x^2$. $A'(x)=40-4x=0$ gives $x=10$ and $y=20$. The maximum area occurs for dimensions $10$ m by $20$ m.",
    },
    {
      id: "mixed-mastery-6",
      prompt: "Complete the sentence: the height is ____.",
      latex: "h(t)=-5t^2+30t+2 \\quad \\text{metres. Interpret }h'(4).",
      answer: "B",
      acceptedAnswers: ["negative"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Differentiate, substitute $t=4$, and interpret the sign.",
      explanation:
        "$h'(t)=-10t+30$, so $h'(4)=-10$. The height is decreasing at $10$ m/s when $t=4$.",
    },
    {
      id: "mixed-mastery-7",
      prompt: "Classify the stationary point at $x=1$:",
      latex: "f(x)=x^3-6x^2+9x+1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Find $f'(x)$ and use the derivative sign change around $x=1$.",
      explanation:
        "$f'(x)=3x^2-12x+9=3(x-1)(x-3)$, so $x=1,3$. The sign pattern is $+,-,+$, giving a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "mixed-mastery-8",
      prompt: "Find the minimum value:",
      latex: "f(x)=x^2-2x-3",
      answer: "-4",
      hint: "Find intercepts and the stationary point.",
      explanation:
        "$f(x)=(x-3)(x+1)$, so the x-intercepts are $(-1,0)$ and $(3,0)$, and the y-intercept is $(0,-3)$. Since $f'(x)=2x-2$, the minimum is at $(1,-4)$.",
    },
    {
      id: "mixed-mastery-9",
      prompt:
        "A profit model is given. Find the maximum profit value.",
      latex: "P(x)=-2x^2+80x-300",
      answer: "500",
      hint: "Solve $P'(x)=0$, then substitute into $P(x)$.",
      explanation:
        "$P'(x)=-4x+80$, so $x=20$. Since $P''(x)=-4<0$, this gives a maximum. $P(20)=500$, so the maximum profit is $500$ when $x=20$.",
    },
    {
      id: "mixed-mastery-10",
      prompt:
        "A question asks for the normal equation to a curve at a point. Choose the best plan.",
      latex: "\\text{Normal equation strategy}",
      answer: "B",
      choices: [
        { label: "A", text: "Set $f(x)=0$" },
        { label: "B", text: "Find the tangent gradient, use the negative reciprocal, then use point-gradient form" },
        { label: "C", text: "Find only the y-intercept" },
      ],
      hint: "Normals are perpendicular to tangents.",
      explanation:
        "To find a normal, first find the tangent gradient using the derivative. Then use the negative reciprocal for the normal gradient and substitute the point into point-gradient form. Option B is correct.",
    },
  ],

  masteryPassMark: 0.8,
};

export const differentialCalculusOutline: LessonOutlineItem[] = [
  {
    id: "rate-of-change",
    slug: "rate-of-change",
    title: "The derivative as rate of change",
    description:
      "Understand average rate of change, instantaneous rate of change, tangent gradients, and derivative notation.",
    status: "active",
  },
  {
    id: "differentiating-polynomial-terms",
    slug: "differentiating-polynomial-terms",
    title: "Differentiating polynomial terms",
    description:
      "Use the power rule to differentiate individual polynomial terms accurately.",
    status: "active",
  },
  {
    id: "differentiating-polynomial-functions",
    slug: "differentiating-polynomial-functions",
    title: "Differentiating polynomial functions",
    description:
      "Differentiate full polynomial expressions term-by-term and simplify the derivative.",
    status: "active",
  },
  {
    id: "tangents-and-normals",
    slug: "tangents-and-normals",
    title: "Tangents and normals",
    description:
      "Use derivatives to find gradients and equations of tangents and normals.",
    status: "active",
  },
  {
    id: "stationary-points",
    slug: "stationary-points",
    title: "Stationary points",
    description:
      "Solve derivative equations and find the coordinates of stationary points.",
    status: "active",
  },
  {
    id: "increasing-decreasing-functions",
    slug: "increasing-decreasing-functions",
    title: "Increasing and decreasing functions",
    description:
      "Use the sign of the derivative to determine where a function is increasing or decreasing.",
    status: "active",
  },
  {
    id: "first-derivative-test",
    slug: "first-derivative-test",
    title: "First derivative test",
    description:
      "Classify stationary points using sign changes in the first derivative.",
    status: "active",
  },
  {
    id: "second-derivative-test",
    slug: "second-derivative-test",
    title: "Second derivative test",
    description:
      "Use the second derivative to classify local maxima and minima.",
    status: "active",
  },
  {
    id: "curve-sketching",
    slug: "curve-sketching",
    title: "Curve sketching with derivatives",
    description:
      "Combine intercepts, stationary points, derivative signs, and concavity to sketch curves.",
    status: "active",
  },
  {
    id: "optimisation",
    slug: "optimisation",
    title: "Optimisation problems",
    description:
      "Form objective functions and use derivatives to solve maximum and minimum problems.",
    status: "active",
  },
  {
    id: "rates-of-change-applications",
    slug: "rates-of-change-applications",
    title: "Rates of change applications",
    description:
      "Interpret derivatives as rates of change in applied contexts.",
    status: "active",
  },
  {
    id: "mixed-exam-practice",
    slug: "mixed-exam-practice",
    title: "Mixed differential calculus exam practice",
    description:
      "Practise mixed HSC-style questions across the differential calculus unit.",
    status: "active",
  },
];

export const differentialCalculusLessons = [
  derivativeAsRateOfChangeLesson,
  differentiatingPolynomialTermsLesson,
  differentiatingPolynomialFunctionsLesson,
  tangentsAndNormalsLesson,
  stationaryPointsLesson,
  increasingDecreasingFunctionsLesson,
  firstDerivativeTestLesson,
  secondDerivativeTestLesson,
  curveSketchingLesson,
  optimisationLesson,
  ratesOfChangeApplicationsLesson,
  mixedExamPracticeLesson,
];
