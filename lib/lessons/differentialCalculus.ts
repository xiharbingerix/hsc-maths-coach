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
      answer: "21x^2",
      hint: "Multiply 7 by 3.",
      explanation: "$\\frac{d}{dx}\\left(7x^3\\right)=21x^2$.",
    },
    {
      id: "mastery-2",
      prompt: "Differentiate:",
      latex: "-4x^5",
      answer: "-20x^4",
      hint: "Keep the negative sign.",
      explanation: "$\\frac{d}{dx}\\left(-4x^5\\right)=-20x^4$.",
    },
    {
      id: "mastery-3",
      prompt: "Differentiate:",
      latex: "x^6",
      answer: "6x^5",
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
      answer: "-8x^3",
      hint: "Keep the negative sign and reduce the power.",
      explanation: "$\\frac{d}{dx}\\left(-2x^4\\right)=-8x^3$.",
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
      answer: "10x^4-8x+3",
      hint: "Differentiate each term and remember the constant becomes 0.",
      explanation: "$f'(x)=10x^4-8x+3$.",
    },
    {
      id: "poly-fn-mastery-2",
      prompt: "Differentiate:",
      latex: "y=-x^4+6x^3-2x",
      answer: "-4x^3+18x^2-2",
      hint: "The derivative of $-x^4$ is $-4x^3$.",
      explanation: "$\\frac{dy}{dx}=-4x^3+18x^2-2$.",
    },
    {
      id: "poly-fn-mastery-3",
      prompt: "Differentiate:",
      latex: "f(x)=7x^3-x^2+9",
      answer: "21x^2-2x",
      hint: "The derivative of $9$ is $0$.",
      explanation: "$f'(x)=21x^2-2x$.",
    },
    {
      id: "poly-fn-mastery-4",
      prompt: "Differentiate:",
      latex: "y=3x^6-5x^2+8x",
      answer: "18x^5-10x+8",
      hint: "Differentiate each term separately.",
      explanation: "$\\frac{dy}{dx}=18x^5-10x+8$.",
    },
    {
      id: "poly-fn-mastery-5",
      prompt: "Differentiate:",
      latex: "f(x)=-2x^4+x^3-11",
      answer: "-8x^3+3x^2",
      hint: "The derivative of $-11$ is $0$.",
      explanation: "$f'(x)=-8x^3+3x^2$.",
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
      hint: "Use $m_n=-\\frac{1}{m_t}$.",
      explanation: "$m_n=-\\frac{1}{4}$.",
    },
  ],

  independentPractice: [
    {
      id: "tan-norm-ind-1",
      prompt: "Find the equation of the tangent:",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "y=4x-1",
      hint: "Find $\\frac{dy}{dx}$, then the point on the curve.",
      explanation:
        "$\\frac{dy}{dx}=2x+2$, so $m_t=4$ and $P=(1,3)$. Therefore $y-3=4(x-1)$, so $y=4x-1$.",
    },
    {
      id: "tan-norm-ind-2",
      prompt: "Find the equation of the normal:",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "y=-1/4x+13/4",
      hint: "The normal gradient is the negative reciprocal of the tangent gradient.",
      explanation:
        "$m_t=4$, so $m_n=-\\frac{1}{4}$ and $P=(1,3)$. Therefore $y-3=-\\frac{1}{4}(x-1)$, so $y=-\\frac{1}{4}x+\\frac{13}{4}$.",
    },
    {
      id: "tan-norm-ind-3",
      prompt: "Find the equation of the tangent:",
      latex: "y=x^2-6x+5, \\quad x=2",
      answer: "y=-2x+1",
      hint: "This tangent has a negative gradient.",
      explanation:
        "$\\frac{dy}{dx}=2x-6$, so $m_t=-2$ and $P=(2,-3)$. Therefore $y+3=-2(x-2)$, so $y=-2x+1$.",
    },
    {
      id: "tan-norm-ind-4",
      prompt: "Find the equation of the normal:",
      latex: "f(x)=x^2-3x+2, \\quad x=4",
      answer: "y=-1/5x+34/5",
      hint: "Use $f'(x)$ for the tangent gradient.",
      explanation:
        "$f'(x)=2x-3$, so $m_t=5$, $m_n=-\\frac{1}{5}$, and $P=(4,6)$. Therefore $y-6=-\\frac{1}{5}(x-4)$, so $y=-\\frac{1}{5}x+\\frac{34}{5}$.",
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
      answer: "2x-2",
      hint: "Differentiate term-by-term.",
      explanation: "$\\frac{dy}{dx}=2x-2$.",
    },
    {
      id: "tan-norm-mastery-2",
      prompt: "Find the tangent gradient:",
      latex: "y=x^2-2x+4, \\quad x=3",
      answer: "4",
      hint: "Substitute $x=3$ into the derivative.",
      explanation: "$m_t=2(3)-2=4$.",
    },
    {
      id: "tan-norm-mastery-3",
      prompt: "Find the point on the curve:",
      latex: "y=x^2-2x+4, \\quad x=3",
      answer: "(3,7)",
      hint: "Substitute $x=3$ into the original function.",
      explanation: "$y=3^2-2(3)+4=7$, so $P=(3,7)$.",
    },
    {
      id: "tan-norm-mastery-4",
      prompt: "Find the tangent equation:",
      latex: "y=x^2-2x+4, \\quad x=3",
      answer: "y=4x-5",
      hint: "Use $P=(3,7)$ and $m_t=4$.",
      explanation: "$y-7=4(x-3)$, so $y=4x-5$.",
    },
    {
      id: "tan-norm-mastery-5",
      prompt: "Find the normal equation:",
      latex: "y=x^2-2x+4, \\quad x=3",
      answer: "y=-1/4x+31/4",
      hint: "Use $m_n=-\\frac{1}{4}$ and $P=(3,7)$.",
      explanation:
        "$y-7=-\\frac{1}{4}(x-3)$, so $y=-\\frac{1}{4}x+\\frac{31}{4}$.",
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
      hint: "Substitute $x=2$ into the original function.",
      explanation: "$y=2^2-4(2)+1=-3$, so the stationary point is $(2,-3)$.",
    },
  ],

  independentPractice: [
    {
      id: "stationary-ind-1",
      prompt: "Find the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "(4,-10)",
      hint: "Differentiate, set the derivative equal to $0$, then substitute back into the original function.",
      explanation:
        "$\\frac{dy}{dx}=2x-8$, so $2x-8=0$ gives $x=4$. Then $y=4^2-8(4)+6=-10$, so the stationary point is $(4,-10)$.",
    },
    {
      id: "stationary-ind-2",
      prompt: "Find the stationary points:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "(1,5),(3,1)",
      hint: "This cubic has two solutions to $\\frac{dy}{dx}=0$.",
      explanation:
        "$\\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)$, so $x=1$ or $x=3$. Substituting into the original function gives $(1,5)$ and $(3,1)$.",
    },
    {
      id: "stationary-ind-3",
      prompt: "Find the stationary point:",
      latex: "y=-x^2+4x+1",
      answer: "(2,5)",
      hint: "Be careful with the negative sign when differentiating $-x^2$.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $-2x+4=0$ gives $x=2$. Then $y=-(2)^2+4(2)+1=5$, so the stationary point is $(2,5)$.",
    },
    {
      id: "stationary-ind-4",
      prompt: "Find the stationary points:",
      latex: "f(x)=x^3-12x+5",
      answer: "(-2,21),(2,-11)",
      hint: "Use $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=3x^2-12=3(x-2)(x+2)$, so $x=-2$ or $x=2$. Then $f(-2)=21$ and $f(2)=-11$, so the stationary points are $(-2,21)$ and $(2,-11)$.",
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
      answer: "3x^2-6x-24",
      hint: "Differentiate term-by-term.",
      explanation: "$\\frac{dy}{dx}=3x^2-6x-24$.",
    },
    {
      id: "stationary-mastery-2",
      prompt: "Solve for the x-values where the derivative is zero:",
      latex: "3x^2-6x-24=0",
      answer: "x=-2,4",
      hint: "Factorise by taking out $3$ first.",
      explanation:
        "$3x^2-6x-24=3(x^2-2x-8)=3(x-4)(x+2)$, so $x=-2$ or $x=4$.",
    },
    {
      id: "stationary-mastery-3",
      prompt: "Substitute the first x-value into the original function:",
      latex: "y=x^3-3x^2-24x+4, \\quad x=-2",
      answer: "32",
      hint: "Use the original function, not the derivative.",
      explanation: "$y=(-2)^3-3(-2)^2-24(-2)+4=32$.",
    },
    {
      id: "stationary-mastery-4",
      prompt: "Substitute the second x-value into the original function:",
      latex: "y=x^3-3x^2-24x+4, \\quad x=4",
      answer: "-76",
      hint: "Use the original function again.",
      explanation: "$y=4^3-3(4)^2-24(4)+4=-76$.",
    },
    {
      id: "stationary-mastery-5",
      prompt: "Write the stationary points as coordinates:",
      latex: "x=-2, \\quad y=32 \\qquad x=4, \\quad y=-76",
      answer: "(-2,32),(4,-76)",
      hint: "Pair each $x$-value with its matching $y$-value.",
      explanation:
        "The stationary points are $(-2,32)$ and $(4,-76)$.",
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
  tangentsAndNormalsLesson,
  stationaryPointsLesson,
];
