export type PracticeQuestion = {
  id: string;
  prompt: string;
  latex: string;
  answer: string;
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
        "The original power is 4, so the coefficient becomes 6 × 4 = 24.",
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
      explanation: "Using the power rule, d/dx(-2x^5)=-10x^4.",
    },
  ],

  independentPractice: [
    {
      id: "ind-1",
      prompt: "Differentiate:",
      latex: "3x^2",
      answer: "6x",
      hint: "Multiply by the power 2.",
      explanation: "d/dx(3x^2)=6x.",
    },
    {
      id: "ind-2",
      prompt: "Differentiate:",
      latex: "8x^5",
      answer: "40x^4",
      hint: "Multiply 8 by 5, then reduce the power.",
      explanation: "d/dx(8x^5)=40x^4.",
    },
    {
      id: "ind-3",
      prompt: "Differentiate:",
      latex: "-6x^3",
      answer: "-18x^2",
      hint: "Keep the negative sign attached to the term.",
      explanation: "d/dx(-6x^3)=-18x^2.",
    },
    {
      id: "ind-4",
      prompt: "Differentiate:",
      latex: "11",
      answer: "0",
      hint: "A constant differentiates to zero.",
      explanation: "d/dx(11)=0.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to multiply by the power.",
      fix: "For 4x^5, the coefficient becomes 4 × 5 = 20.",
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
      answer: "21x^2",
      hint: "Multiply 7 by 3.",
      explanation: "d/dx(7x^3)=21x^2.",
    },
    {
      id: "mastery-2",
      prompt: "Differentiate:",
      latex: "-4x^5",
      answer: "-20x^4",
      hint: "Keep the negative sign.",
      explanation: "d/dx(-4x^5)=-20x^4.",
    },
    {
      id: "mastery-3",
      prompt: "Differentiate:",
      latex: "x^6",
      answer: "6x^5",
      hint: "The coefficient of x^6 is 1.",
      explanation: "d/dx(x^6)=6x^5.",
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
      answer: "-8x^3",
      hint: "Keep the negative sign and reduce the power.",
      explanation: "d/dx(-2x^4)=-8x^3.",
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
    "Use derivative notation correctly, including f'(x) and dy/dx.",
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
          explanation: "Differentiate 4x^5.",
          latex: "\\frac{d}{dx}\\left(4x^5\\right)=20x^4",
        },
        {
          explanation: "Differentiate -3x^2.",
          latex: "\\frac{d}{dx}\\left(-3x^2\\right)=-6x",
        },
        {
          explanation: "Differentiate 7x.",
          latex: "\\frac{d}{dx}\\left(7x\\right)=7",
        },
        {
          explanation: "Differentiate -9.",
          latex: "\\frac{d}{dx}\\left(-9\\right)=0",
        },
      ],
      finalAnswerLatex: "f'(x)=20x^4-6x+7",
    },
    {
      title: "Worked example 2: Use dy/dx notation",
      questionLatex: "y=2x^4-5x^3+x-11",
      steps: [
        {
          explanation: "Use dy/dx because the function is written as y.",
          latex: "\\frac{dy}{dx}=\\frac{d}{dx}\\left(2x^4-5x^3+x-11\\right)",
        },
        {
          explanation: "Differentiate 2x^4.",
          latex: "\\frac{d}{dx}\\left(2x^4\\right)=8x^3",
        },
        {
          explanation: "Differentiate -5x^3.",
          latex: "\\frac{d}{dx}\\left(-5x^3\\right)=-15x^2",
        },
        {
          explanation: "Differentiate x.",
          latex: "\\frac{d}{dx}\\left(x\\right)=1",
        },
        {
          explanation: "Differentiate -11.",
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
      hint: "Differentiate 3x^4.",
      explanation: "d/dx(3x^4)=12x^3, so f'(x)=12x^3-4x.",
    },
    {
      id: "poly-fn-guided-2",
      prompt: "Complete the derivative:",
      latex: "y=6x^5+x^2-8x+4 \\quad \\Rightarrow \\quad \\frac{dy}{dx}=30x^4+2x+\\Box",
      answer: "-8",
      hint: "The derivative of -8x is -8.",
      explanation: "dy/dx=30x^4+2x-8.",
    },
    {
      id: "poly-fn-guided-3",
      prompt: "Complete the missing term:",
      latex: "f(x)=x^4+3x^2-7 \\quad \\Rightarrow \\quad f'(x)=4x^3+\\Box",
      answer: "6x",
      hint: "Differentiate 3x^2.",
      explanation: "d/dx(3x^2)=6x, so f'(x)=4x^3+6x.",
    },
  ],

  independentPractice: [
    {
      id: "poly-fn-ind-1",
      prompt: "Differentiate:",
      latex: "f(x)=x^4+3x^2-7",
      answer: "4x^3+6x",
      hint: "Differentiate each term separately.",
      explanation: "f'(x)=4x^3+6x.",
    },
    {
      id: "poly-fn-ind-2",
      prompt: "Differentiate:",
      latex: "y=-2x^5+4x^3-9x",
      answer: "-10x^4+12x^2-9",
      hint: "Keep the negative sign on -2x^5.",
      explanation: "dy/dx=-10x^4+12x^2-9.",
    },
    {
      id: "poly-fn-ind-3",
      prompt: "Differentiate:",
      latex: "f(x)=5x^6-3x^4+x^2-12",
      answer: "30x^5-12x^3+2x",
      hint: "The derivative of -12 is 0.",
      explanation: "f'(x)=30x^5-12x^3+2x.",
    },
    {
      id: "poly-fn-ind-4",
      prompt: "Differentiate:",
      latex: "y=9x^3-4x^2+6",
      answer: "27x^2-8x",
      hint: "The derivative of 6 is 0.",
      explanation: "dy/dx=27x^2-8x.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to differentiate every term.",
      fix: "Move through the function term-by-term from left to right.",
    },
    {
      mistake: "Forgetting that constants differentiate to zero.",
      fix: "Terms without x, such as 5 or -12, disappear in the derivative.",
    },
    {
      mistake: "Losing negative signs.",
      fix: "Keep the sign attached to the term before applying the power rule.",
    },
    {
      mistake: "Using the wrong notation.",
      fix: "Use f'(x) when the function is written as f(x), and dy/dx when it is written as y.",
    },
  ],

  masteryQuiz: [
    {
      id: "poly-fn-mastery-1",
      prompt: "Differentiate:",
      latex: "f(x)=2x^5-4x^2+3x-1",
      answer: "10x^4-8x+3",
      hint: "Differentiate each term and remember the constant becomes 0.",
      explanation: "f'(x)=10x^4-8x+3.",
    },
    {
      id: "poly-fn-mastery-2",
      prompt: "Differentiate:",
      latex: "y=-x^4+6x^3-2x",
      answer: "-4x^3+18x^2-2",
      hint: "The derivative of -x^4 is -4x^3.",
      explanation: "dy/dx=-4x^3+18x^2-2.",
    },
    {
      id: "poly-fn-mastery-3",
      prompt: "Differentiate:",
      latex: "f(x)=7x^3-x^2+9",
      answer: "21x^2-2x",
      hint: "The derivative of 9 is 0.",
      explanation: "f'(x)=21x^2-2x.",
    },
    {
      id: "poly-fn-mastery-4",
      prompt: "Differentiate:",
      latex: "y=3x^6-5x^2+8x",
      answer: "18x^5-10x+8",
      hint: "Differentiate each term separately.",
      explanation: "dy/dx=18x^5-10x+8.",
    },
    {
      id: "poly-fn-mastery-5",
      prompt: "Differentiate:",
      latex: "f(x)=-2x^4+x^3-11",
      answer: "-8x^3+3x^2",
      hint: "The derivative of -11 is 0.",
      explanation: "f'(x)=-8x^3+3x^2.",
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
    status: "coming-soon",
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
    status: "coming-soon",
  },
  {
    id: "stationary-points",
    slug: "stationary-points",
    title: "Stationary points",
    description:
      "Solve f'(x)=0 and find the coordinates of stationary points.",
    status: "coming-soon",
  },
  {
    id: "increasing-decreasing-functions",
    slug: "increasing-decreasing-functions",
    title: "Increasing and decreasing functions",
    description:
      "Use the sign of the derivative to determine where a function is increasing or decreasing.",
    status: "coming-soon",
  },
  {
    id: "first-derivative-test",
    slug: "first-derivative-test",
    title: "First derivative test",
    description:
      "Classify stationary points using sign changes in the first derivative.",
    status: "coming-soon",
  },
  {
    id: "second-derivative-test",
    slug: "second-derivative-test",
    title: "Second derivative test",
    description:
      "Use the second derivative to classify local maxima and minima.",
    status: "coming-soon",
  },
  {
    id: "curve-sketching",
    slug: "curve-sketching",
    title: "Curve sketching with derivatives",
    description:
      "Combine intercepts, stationary points, derivative signs, and concavity to sketch curves.",
    status: "coming-soon",
  },
  {
    id: "optimisation",
    slug: "optimisation",
    title: "Optimisation problems",
    description:
      "Form objective functions and use derivatives to solve maximum and minimum problems.",
    status: "coming-soon",
  },
  {
    id: "rates-of-change-applications",
    slug: "rates-of-change-applications",
    title: "Rates of change applications",
    description:
      "Interpret derivatives as rates of change in applied contexts.",
    status: "coming-soon",
  },
  {
    id: "mixed-exam-practice",
    slug: "mixed-exam-practice",
    title: "Mixed differential calculus exam practice",
    description:
      "Practise mixed HSC-style questions across the differential calculus unit.",
    status: "coming-soon",
  },
];

export const differentialCalculusLessons = [
  differentiatingPolynomialTermsLesson,
  differentiatingPolynomialFunctionsLesson,
];