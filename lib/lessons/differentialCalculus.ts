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
      prompt: "State the intervals:",
      latex:
        "f'(x)=2x-6, \\quad f'(0)<0, \\quad f'(4)>0",
      answer: "decreasing:(-infinity,3),increasing:(3,infinity)",
      hint: "Negative derivative means decreasing, positive derivative means increasing.",
      explanation:
        "The function is decreasing on $(-\\infty,3)$ and increasing on $(3,\\infty)$.",
    },
  ],

  independentPractice: [
    {
      id: "inc-dec-ind-1",
      prompt: "Determine where the function is increasing and decreasing:",
      latex: "y=x^2-6x+2",
      answer: "decreasing:(-infinity,3),increasing:(3,infinity)",
      hint: "Solve $2x-6=0$, then test each side.",
      explanation:
        "$\\frac{dy}{dx}=2x-6$, so $x=3$. The derivative is negative before $3$ and positive after $3$, so the function is decreasing on $(-\\infty,3)$ and increasing on $(3,\\infty)$.",
    },
    {
      id: "inc-dec-ind-2",
      prompt: "Determine where the function is increasing and decreasing:",
      latex: "y=x^3-6x^2+9x",
      answer: "increasing:(-infinity,1),(3,infinity),decreasing:(1,3)",
      hint: "The derivative factorises as $3(x-1)(x-3)$.",
      explanation:
        "$\\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)$. Testing intervals gives increasing on $(-\\infty,1)$ and $(3,\\infty)$, and decreasing on $(1,3)$.",
    },
    {
      id: "inc-dec-ind-3",
      prompt: "Determine where the function is increasing and decreasing:",
      latex: "y=-x^2+4x-1",
      answer: "increasing:(-infinity,2),decreasing:(2,infinity)",
      hint: "Be careful with the negative leading coefficient.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $x=2$. The derivative is positive before $2$ and negative after $2$, so the function is increasing on $(-\\infty,2)$ and decreasing on $(2,\\infty)$.",
    },
    {
      id: "inc-dec-ind-4",
      prompt: "Determine where the function is increasing and decreasing:",
      latex: "f(x)=-x^3+3x^2+9x",
      answer: "decreasing:(-infinity,-1),(3,infinity),increasing:(-1,3)",
      hint: "Use $f'(x)=-3(x-3)(x+1)$.",
      explanation:
        "$f'(x)=-3x^2+6x+9=-3(x-3)(x+1)$. Testing intervals gives decreasing on $(-\\infty,-1)$ and $(3,\\infty)$, and increasing on $(-1,3)$.",
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
      answer: "3x^2-12",
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=3x^2-12$.",
    },
    {
      id: "inc-dec-mastery-2",
      prompt: "Find the critical values:",
      latex: "3x^2-12=0",
      answer: "x=-2,2",
      hint: "Solve $x^2=4$.",
      explanation: "$3x^2-12=0$, so $x=-2$ or $x=2$.",
    },
    {
      id: "inc-dec-mastery-3",
      prompt: "Complete the sign pattern for $f'(x)$:",
      latex: "(-\\infty,-2), \\quad (-2,2), \\quad (2,\\infty)",
      answer: "+,-,+",
      hint: "Test $x=-3$, $x=0$, and $x=3$.",
      explanation: "$f'(-3)>0$, $f'(0)<0$, and $f'(3)>0$.",
    },
    {
      id: "inc-dec-mastery-4",
      prompt: "State where the function is increasing:",
      latex: "f'(x)>0 \\text{ on } (-\\infty,-2) \\text{ and } (2,\\infty)",
      answer: "(-infinity,-2),(2,infinity)",
      hint: "Increasing means $f'(x)>0$.",
      explanation: "The function is increasing on $(-\\infty,-2)$ and $(2,\\infty)$.",
    },
    {
      id: "inc-dec-mastery-5",
      prompt: "State where the function is decreasing:",
      latex: "f'(x)<0 \\text{ on } (-2,2)",
      answer: "(-2,2)",
      hint: "Decreasing means $f'(x)<0$.",
      explanation: "The function is decreasing on $(-2,2)$.",
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
      answer: "local minimum",
      hint: "A change from negative to positive gives a local minimum.",
      explanation: "$- \\to +$ means the stationary point is a local minimum.",
    },
  ],

  independentPractice: [
    {
      id: "fdt-ind-1",
      prompt: "Find and classify the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "local minimum at (4,-10)",
      hint: "This quadratic opens upwards.",
      explanation:
        "$\\frac{dy}{dx}=2x-8$, so $x=4$. The sign changes from negative to positive, and $y(4)=-10$, so there is a local minimum at $(4,-10)$.",
    },
    {
      id: "fdt-ind-2",
      prompt: "Find and classify the stationary point:",
      latex: "y=-x^2+4x-1",
      answer: "local maximum at (2,3)",
      hint: "This quadratic opens downwards.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $x=2$. The sign changes from positive to negative, and $y(2)=3$, so there is a local maximum at $(2,3)$.",
    },
    {
      id: "fdt-ind-3",
      prompt: "Find and classify the stationary points:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "local maximum at (1,5),local minimum at (3,1)",
      hint: "The derivative is $3(x-1)(x-3)$.",
      explanation:
        "$\\frac{dy}{dx}=3(x-1)(x-3)$, so $x=1,3$. The signs are $+,-,+$, so there is a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "fdt-ind-4",
      prompt: "Find and classify the stationary points:",
      latex: "f(x)=x^3-12x+5",
      answer: "local maximum at (-2,21),local minimum at (2,-11)",
      hint: "Use $f'(x)=3(x-2)(x+2)$.",
      explanation:
        "$f'(x)=3(x-2)(x+2)$, so $x=-2,2$. The signs are $+,-,+$, so there is a local maximum at $(-2,21)$ and a local minimum at $(2,-11)$.",
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
      answer: "3x^2-6x-24",
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=3x^2-6x-24$.",
    },
    {
      id: "fdt-mastery-2",
      prompt: "Find the stationary x-values:",
      latex: "3x^2-6x-24=0",
      answer: "x=-2,4",
      hint: "Factorise by taking out $3$ first.",
      explanation:
        "$3x^2-6x-24=3(x-4)(x+2)$, so $x=-2$ or $x=4$.",
    },
    {
      id: "fdt-mastery-3",
      prompt: "Complete the sign pattern for $f'(x)$:",
      latex: "(-\\infty,-2), \\quad (-2,4), \\quad (4,\\infty)",
      answer: "+,-,+",
      hint: "Test one value in each interval.",
      explanation: "The sign pattern is $+,-,+$.",
    },
    {
      id: "fdt-mastery-4",
      prompt: "Find the stationary point coordinates:",
      latex: "f(x)=x^3-3x^2-24x+4, \\quad x=-2,4",
      answer: "(-2,32),(4,-76)",
      hint: "Substitute both $x$-values into the original function.",
      explanation: "$f(-2)=32$ and $f(4)=-76$, so the points are $(-2,32)$ and $(4,-76)$.",
    },
    {
      id: "fdt-mastery-5",
      prompt: "Classify the stationary points:",
      latex: "\\text{sign pattern } +,-,+ \\quad \\text{at } x=-2,4",
      answer: "local maximum at (-2,32),local minimum at (4,-76)",
      hint: "$+ \\to -$ gives a local maximum, and $- \\to +$ gives a local minimum.",
      explanation:
        "There is a local maximum at $(-2,32)$ and a local minimum at $(4,-76)$.",
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
      answer: "local minimum",
      hint: "$f''(2)>0$ means concave up.",
      explanation: "$f''(2)=2>0$, so the stationary point is a local minimum.",
    },
  ],

  independentPractice: [
    {
      id: "sdt-ind-1",
      prompt: "Find and classify the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "local minimum at (4,-10)",
      hint: "Find $y'$ and $y''$.",
      explanation:
        "$y'=2x-8$, so $x=4$. Since $y''=2>0$ and $y(4)=-10$, there is a local minimum at $(4,-10)$.",
    },
    {
      id: "sdt-ind-2",
      prompt: "Find and classify the stationary point:",
      latex: "y=-x^2+4x-1",
      answer: "local maximum at (2,3)",
      hint: "The second derivative is negative.",
      explanation:
        "$y'=-2x+4$, so $x=2$. Since $y''=-2<0$ and $y(2)=3$, there is a local maximum at $(2,3)$.",
    },
    {
      id: "sdt-ind-3",
      prompt: "Find and classify the stationary points:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "local maximum at (1,5),local minimum at (3,1)",
      hint: "Use $y''=6x-12$ after finding the stationary values.",
      explanation:
        "$y'=3x^2-12x+9=3(x-1)(x-3)$, so $x=1,3$. Since $y''=6x-12$, $y''(1)<0$ and $y''(3)>0$. The points are a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "sdt-ind-4",
      prompt: "Use the second derivative test:",
      latex: "f(x)=x^3",
      answer: "inconclusive at (0,0)",
      hint: "Find $f'(x)$ and $f''(x)$, then evaluate at $x=0$.",
      explanation:
        "$f'(x)=3x^2$, so $x=0$. Since $f''(x)=6x$ and $f''(0)=0$, the second derivative test is inconclusive at $(0,0)$.",
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
      answer: "3x^2-6x-24",
      hint: "Find $f'(x)$.",
      explanation: "$f'(x)=3x^2-6x-24$.",
    },
    {
      id: "sdt-mastery-2",
      prompt: "Find the stationary x-values:",
      latex: "3x^2-6x-24=0",
      answer: "x=-2,4",
      hint: "Factorise the quadratic.",
      explanation: "$3x^2-6x-24=3(x-4)(x+2)$, so $x=-2$ or $x=4$.",
    },
    {
      id: "sdt-mastery-3",
      prompt: "Find the second derivative:",
      latex: "f'(x)=3x^2-6x-24",
      answer: "6x-6",
      hint: "Differentiate $f'(x)$.",
      explanation: "$f''(x)=6x-6$.",
    },
    {
      id: "sdt-mastery-4",
      prompt: "Evaluate the second derivative at the stationary x-values:",
      latex: "f''(x)=6x-6, \\quad x=-2,4",
      answer: "f''(-2)=-18,f''(4)=18",
      hint: "Substitute each $x$-value into $f''(x)$.",
      explanation: "$f''(-2)=-18<0$ and $f''(4)=18>0$.",
    },
    {
      id: "sdt-mastery-5",
      prompt: "Classify the stationary points:",
      latex: "f(-2)=32, \\quad f(4)=-76, \\quad f''(-2)<0, \\quad f''(4)>0",
      answer: "local maximum at (-2,32),local minimum at (4,-76)",
      hint: "Negative second derivative gives a local maximum; positive gives a local minimum.",
      explanation:
        "There is a local maximum at $(-2,32)$ and a local minimum at $(4,-76)$.",
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
      prompt: "Find the intercepts:",
      latex: "f(x)=x^2-5x+6",
      answer: "x=2,3;y=6",
      hint: "Solve $f(x)=0$ and find $f(0)$.",
      explanation: "$f(x)=(x-2)(x-3)$, so the $x$-intercepts are $2$ and $3$, and $f(0)=6$.",
    },
    {
      id: "curve-guided-2",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-5x+6",
      answer: "(5/2,-1/4)",
      hint: "Solve $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=2x-5$, so $x=\\frac{5}{2}$. Then $f\\left(\\frac{5}{2}\\right)=-\\frac{1}{4}$.",
    },
    {
      id: "curve-guided-3",
      prompt: "List the key features for sketching:",
      latex: "f(x)=x^2-5x+6",
      answer: "x-intercepts (2,0),(3,0);y-intercept (0,6);minimum (5/2,-1/4)",
      hint: "Include intercepts and the stationary point.",
      explanation:
        "Key features are $x$-intercepts $(2,0)$ and $(3,0)$, $y$-intercept $(0,6)$, and minimum $\\left(\\frac{5}{2},-\\frac{1}{4}\\right)$.",
    },
  ],

  independentPractice: [
    {
      id: "curve-ind-1",
      prompt: "List the key features for sketching:",
      latex: "y=x^2-2x-3",
      answer: "x-intercepts (-1,0),(3,0);y-intercept (0,-3);minimum (1,-4)",
      hint: "Find intercepts, then solve $y'=0$.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(3,0)$, the $y$-intercept is $(0,-3)$, and $y'=2x-2$ gives a minimum at $(1,-4)$.",
    },
    {
      id: "curve-ind-2",
      prompt: "List the key features for sketching:",
      latex: "y=x^3-3x",
      answer: "x-intercepts (-sqrt3,0),(0,0),(sqrt3,0);local maximum (-1,2);local minimum (1,-2)",
      hint: "Use $y'=3x^2-3$ for stationary points.",
      explanation:
        "$x$-intercepts are $(-\\sqrt{3},0)$, $(0,0)$, and $(\\sqrt{3},0)$. Since $y'=3x^2-3$, the stationary points are a local maximum at $(-1,2)$ and a local minimum at $(1,-2)$.",
    },
    {
      id: "curve-ind-3",
      prompt: "List the key features for sketching:",
      latex: "y=-x^2+4x+5",
      answer: "x-intercepts (-1,0),(5,0);y-intercept (0,5);maximum (2,9)",
      hint: "The graph opens downward.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(5,0)$, the $y$-intercept is $(0,5)$, and $y'=-2x+4$ gives a maximum at $(2,9)$.",
    },
    {
      id: "curve-ind-4",
      prompt: "State the key features needed to sketch the graph:",
      latex: "f(x)=x^3-6x^2+9x",
      answer: "x-intercepts (0,0),(3,0);local maximum (1,4);local minimum (3,0)",
      hint: "Factorise for intercepts and use $f'(x)$ for stationary points.",
      explanation:
        "$f(x)=x(x-3)^2$, so the $x$-intercepts are $(0,0)$ and $(3,0)$. Since $f'(x)=3(x-1)(x-3)$, there is a local maximum at $(1,4)$ and a local minimum at $(3,0)$.",
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
      prompt: "Identify the intercepts:",
      latex: "f(x)=x^2-4x+3",
      answer: "x-intercepts (1,0),(3,0);y-intercept (0,3)",
      hint: "Solve $f(x)=0$ and find $f(0)$.",
      explanation: "The intercepts are $(1,0)$, $(3,0)$, and $(0,3)$.",
    },
    {
      id: "curve-mastery-2",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-4x+3",
      answer: "(2,-1)",
      hint: "Solve $f'(x)=0$.",
      explanation: "$f'(x)=2x-4$, so $x=2$ and $f(2)=-1$.",
    },
    {
      id: "curve-mastery-3",
      prompt: "Classify the stationary point:",
      latex: "f''(x)=2, \\quad \\text{stationary point }(2,-1)",
      answer: "local minimum",
      hint: "$f''(x)>0$ means concave up.",
      explanation: "Since $f''(2)>0$, the point $(2,-1)$ is a local minimum.",
    },
    {
      id: "curve-mastery-4",
      prompt: "State the increasing and decreasing intervals:",
      latex: "f'(x)=2x-4",
      answer: "decreasing:(-infinity,2),increasing:(2,infinity)",
      hint: "Test either side of $x=2$.",
      explanation:
        "The graph is decreasing on $(-\\infty,2)$ and increasing on $(2,\\infty)$.",
    },
    {
      id: "curve-mastery-5",
      prompt: "State the key features needed to sketch the graph:",
      latex: "f(x)=x^2-4x+3",
      answer: "x-intercepts (1,0),(3,0);y-intercept (0,3);minimum (2,-1)",
      hint: "Combine intercepts, stationary point, and shape.",
      explanation:
        "Use $x$-intercepts $(1,0)$ and $(3,0)$, $y$-intercept $(0,3)$, minimum $(2,-1)$, and the upward-opening shape.",
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
  increasingDecreasingFunctionsLesson,
  firstDerivativeTestLesson,
  secondDerivativeTestLesson,
  curveSketchingLesson,
];
