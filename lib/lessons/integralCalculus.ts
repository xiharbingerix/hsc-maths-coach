import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const antidifferentiationReversePowerRuleLesson: ExplicitLesson = {
  id: "antidifferentiation-reverse-power-rule",
  slug: "antidifferentiation-reverse-power-rule",
  moduleSlug: "integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Antidifferentiation and Reverse Power Rule",
  description:
    "Learn integration as the reverse process of differentiation and use the reverse power rule for polynomial terms.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Antidifferentiation and Reverse Power Rule",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to find simple antiderivatives using the reverse power rule.",

  successCriteria: [
    "Explain that antidifferentiation reverses differentiation.",
    "Use the reverse power rule for powers of x where the power is not -1.",
    "Increase the power by one, then divide by the new power.",
    "Check an antiderivative by differentiating it.",
    "Recognise that the reverse power rule in this lesson does not apply to x^{-1}.",
  ],

  teaching: {
    paragraphs: [
      "Antidifferentiation is the reverse process of differentiation.",
      "If differentiating a function gives a derivative, antidifferentiating works backwards from the derivative to a possible original function.",
      "For a power of x, the reverse power rule says to increase the power by one, then divide by the new power.",
      "You can check an antiderivative by differentiating it. If you get the original expression, your antiderivative is correct.",
      "This first lesson avoids the special case of x^{-1}. That case belongs with logarithmic integration later.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}\\left(x^4\\right)=4x^3 \\quad \\Rightarrow \\quad \\int 4x^3\\,dx=x^4",
      "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}, \\quad n\\ne -1",
      "\\int ax^n\\,dx=\\frac{a}{n+1}x^{n+1}, \\quad n\\ne -1",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Reverse a derivative",
      questionLatex: "\\int 6x^2\\,dx",
      steps: [
        {
          explanation: "Identify the power of x.",
          latex: "n=2",
        },
        {
          explanation: "Increase the power by one.",
          latex: "x^{2+1}=x^3",
        },
        {
          explanation: "Divide the coefficient by the new power.",
          latex: "\\frac{6}{3}x^3=2x^3",
        },
        {
          explanation: "Check by differentiating.",
          latex: "\\frac{d}{dx}\\left(2x^3\\right)=6x^2",
        },
      ],
      finalAnswerLatex: "2x^3",
    },
    {
      title: "Worked example 2: Fraction coefficient",
      questionLatex: "\\int 5x^4\\,dx",
      steps: [
        {
          explanation: "Increase the power from 4 to 5.",
          latex: "x^4 \\rightarrow x^5",
        },
        {
          explanation: "Divide by the new power.",
          latex: "\\frac{5}{5}x^5=x^5",
        },
      ],
      finalAnswerLatex: "x^5",
    },
    {
      title: "Worked example 3: Negative coefficient",
      questionLatex: "\\int -8x^3\\,dx",
      steps: [
        {
          explanation: "Keep the negative sign attached to the coefficient.",
          latex: "-8x^3",
        },
        {
          explanation: "Increase the power and divide by the new power.",
          latex: "\\frac{-8}{4}x^4=-2x^4",
        },
        {
          explanation: "Check by differentiating.",
          latex: "\\frac{d}{dx}\\left(-2x^4\\right)=-8x^3",
        },
      ],
      finalAnswerLatex: "-2x^4",
    },
  ],

  guidedPractice: [
    {
      id: "anti-guided-1",
      prompt: "Complete the new power:",
      latex: "\\int x^5\\,dx=\\frac{x^{\\Box}}{6}",
      answer: "6",
      hint: "Increase the original power by one.",
      explanation: "The original power is 5, so the new power is 6.",
    },
    {
      id: "anti-guided-2",
      prompt: "Complete the coefficient:",
      latex: "\\int 8x^3\\,dx=\\Box x^4",
      answer: "2",
      hint: "Divide 8 by the new power 4.",
      explanation: "$\\int 8x^3\\,dx=\\frac{8}{4}x^4=2x^4$.",
    },
    {
      id: "anti-guided-3",
      prompt: "Choose the correct antiderivative.",
      latex: "\\int 3x^2\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$x^3$" },
        { label: "B", text: "$6x$" },
        { label: "C", text: "$3x^3$" },
      ],
      hint: "Increase the power to 3, then divide by 3.",
      explanation: "$\\int 3x^2\\,dx=x^3$.",
    },
    {
      id: "anti-guided-4",
      prompt: "Check the antiderivative by differentiating:",
      latex: "\\frac{d}{dx}\\left(4x^5\\right)=\\Box x^4",
      answer: "20",
      hint: "Differentiate using the power rule.",
      explanation:
        "$\\frac{d}{dx}\\left(4x^5\\right)=20x^4$, so $4x^5$ is an antiderivative of $20x^4$.",
    },
  ],

  independentPractice: [
    {
      id: "anti-ind-1",
      prompt: "Find an antiderivative:",
      latex: "\\int 10x^4\\,dx",
      answer: "2x^5",
      hint: "Increase the power to 5 and divide 10 by 5.",
      explanation: "$\\int 10x^4\\,dx=2x^5$.",
    },
    {
      id: "anti-ind-2",
      prompt: "Find an antiderivative:",
      latex: "\\int -6x^2\\,dx",
      answer: "-2x^3",
      hint: "Keep the negative sign and divide by the new power.",
      explanation: "$\\int -6x^2\\,dx=-2x^3$.",
    },
    {
      id: "anti-ind-3",
      prompt: "Find an antiderivative:",
      latex: "\\int x^7\\,dx",
      answer: "x^8/8",
      acceptedAnswers: ["1/8x^8", "(1/8)x^8"],
      hint: "The coefficient of $x^7$ is 1.",
      explanation: "$\\int x^7\\,dx=\\frac{x^8}{8}$.",
    },
    {
      id: "anti-ind-4",
      prompt: "Choose the expression where this rule is not used in this lesson.",
      latex: "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}, \\quad n\\ne -1",
      answer: "C",
      choices: [
        { label: "A", text: "$\\int x^2\\,dx$" },
        { label: "B", text: "$\\int x^5\\,dx$" },
        { label: "C", text: "$\\int x^{-1}\\,dx$" },
      ],
      hint: "Look for the excluded power.",
      explanation: "The reverse power rule here excludes $n=-1$.",
    },
    {
      id: "anti-ind-5",
      prompt: "Which derivative check confirms the antiderivative?",
      latex: "\\int 12x^2\\,dx=4x^3",
      answer: "B",
      choices: [
        { label: "A", text: "$\\frac{d}{dx}(4x^3)=4x^2$" },
        { label: "B", text: "$\\frac{d}{dx}(4x^3)=12x^2$" },
        { label: "C", text: "$\\frac{d}{dx}(4x^3)=12x^3$" },
      ],
      hint: "Differentiate the proposed antiderivative.",
      explanation:
        "$\\frac{d}{dx}(4x^3)=12x^2$, which matches the integrand.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Reducing the power instead of increasing it.",
      fix: "Integration reverses differentiation, so increase the power by one.",
    },
    {
      mistake: "Multiplying by the new power instead of dividing.",
      fix: "After increasing the power, divide the coefficient by the new power.",
    },
    {
      mistake: "Dropping negative signs.",
      fix: "Keep the sign attached to the term before integrating.",
    },
    {
      mistake: "Using this rule for x^{-1}.",
      fix: "The reverse power rule in this form excludes $n=-1$.",
    },
  ],

  masteryQuiz: [
    {
      id: "anti-mastery-1",
      prompt: "Complete the sentence: antidifferentiation is the reverse of ____.",
      latex: "\\text{antidifferentiation}",
      answer: "A",
      acceptedAnswers: ["differentiation"],
      choices: [
        { label: "A", text: "differentiation" },
        { label: "B", text: "substitution" },
        { label: "C", text: "factorisation" },
      ],
      hint: "Think about working backwards from a derivative.",
      explanation: "Antidifferentiation reverses differentiation.",
    },
    {
      id: "anti-mastery-2",
      prompt: "Find an antiderivative:",
      latex: "\\int 4x^3\\,dx",
      answer: "x^4",
      hint: "Increase the power to 4 and divide 4 by 4.",
      explanation: "$\\int 4x^3\\,dx=x^4$.",
    },
    {
      id: "anti-mastery-3",
      prompt: "Find an antiderivative:",
      latex: "\\int 15x^2\\,dx",
      answer: "5x^3",
      hint: "Increase the power to 3 and divide 15 by 3.",
      explanation: "$\\int 15x^2\\,dx=5x^3$.",
    },
    {
      id: "anti-mastery-4",
      prompt: "Complete the new power:",
      latex: "\\int 7x^6\\,dx=x^{\\Box}\\text{ times a coefficient}",
      answer: "7",
      hint: "Increase the original power by one.",
      explanation: "The new power is $6+1=7$.",
    },
    {
      id: "anti-mastery-5",
      prompt: "Find an antiderivative:",
      latex: "\\int -12x^5\\,dx",
      answer: "-2x^6",
      hint: "Divide $-12$ by the new power 6.",
      explanation: "$\\int -12x^5\\,dx=-2x^6$.",
    },
    {
      id: "anti-mastery-6",
      prompt: "Find an antiderivative:",
      latex: "\\int x^4\\,dx",
      answer: "x^5/5",
      acceptedAnswers: ["1/5x^5", "(1/5)x^5"],
      hint: "The coefficient is 1.",
      explanation: "$\\int x^4\\,dx=\\frac{x^5}{5}$.",
    },
    {
      id: "anti-mastery-7",
      prompt: "Choose the correct antiderivative.",
      latex: "\\int 6x^5\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "$30x^4$" },
        { label: "B", text: "$x^6$" },
        { label: "C", text: "$6x^6$" },
      ],
      hint: "Increase the power to 6, then divide by 6.",
      explanation: "$\\int 6x^5\\,dx=x^6$.",
    },
    {
      id: "anti-mastery-8",
      prompt: "Which check is correct?",
      latex: "F(x)=3x^4",
      answer: "A",
      choices: [
        { label: "A", text: "$F'(x)=12x^3$" },
        { label: "B", text: "$F'(x)=3x^3$" },
        { label: "C", text: "$F'(x)=12x^4$" },
      ],
      hint: "Differentiate $3x^4$.",
      explanation: "$\\frac{d}{dx}(3x^4)=12x^3$.",
    },
    {
      id: "anti-mastery-9",
      prompt: "Choose the expression excluded from this rule for now.",
      latex: "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}, \\quad n\\ne -1",
      answer: "C",
      choices: [
        { label: "A", text: "$x^0$" },
        { label: "B", text: "$x^{-2}$" },
        { label: "C", text: "$x^{-1}$" },
      ],
      hint: "Look at the condition $n\\ne -1$.",
      explanation: "The case $x^{-1}$ is excluded from this rule.",
    },
    {
      id: "anti-mastery-10",
      prompt: "Find an antiderivative:",
      latex: "\\int 20x^3\\,dx",
      answer: "5x^4",
      hint: "Divide 20 by the new power 4.",
      explanation: "$\\int 20x^3\\,dx=5x^4$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const indefiniteIntegralsConstantOfIntegrationLesson: ExplicitLesson = {
  id: "indefinite-integrals-constant-of-integration",
  slug: "indefinite-integrals-constant-of-integration",
  moduleSlug: "integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Indefinite Integrals and the Constant of Integration",
  description:
    "Learn why indefinite integrals need a constant of integration and practise integrating polynomial expressions term-by-term.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Indefinite Integrals and the Constant of Integration",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to write indefinite integrals with the constant of integration and use simple initial conditions to find it.",

  successCriteria: [
    "Explain why indefinite integrals include $+C$.",
    "Integrate polynomial expressions term-by-term.",
    "Use the constant of integration correctly.",
    "Check an indefinite integral by differentiating.",
    "Use a simple initial condition to find the value of $C$.",
  ],

  teaching: {
    paragraphs: [
      "An indefinite integral gives a family of antiderivatives rather than one single function.",
      "This happens because constants differentiate to zero. For example, $x^2$, $x^2+5$, and $x^2-8$ all have derivative $2x$.",
      "The symbol $+C$ represents any constant that could have been present before differentiating.",
      "For polynomial expressions, integrate each term separately and then add $+C$.",
      "If an initial condition is given, substitute the values into the antiderivative to find the specific value of $C$.",
    ],
    latexBlocks: [
      "\\int 2x\\,dx=x^2+C",
      "\\int \\left(6x^2-4x+3\\right)\\,dx=2x^3-2x^2+3x+C",
      "F'(x)=f(x) \\quad \\Rightarrow \\quad \\int f(x)\\,dx=F(x)+C",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Add the constant of integration",
      questionLatex: "\\int \\left(6x^2-4x+3\\right)\\,dx",
      steps: [
        {
          explanation: "Integrate $6x^2$.",
          latex: "\\int 6x^2\\,dx=2x^3",
        },
        {
          explanation: "Integrate $-4x$.",
          latex: "\\int -4x\\,dx=-2x^2",
        },
        {
          explanation: "Integrate the constant term.",
          latex: "\\int 3\\,dx=3x",
        },
        {
          explanation: "Add the constant of integration.",
          latex: "2x^3-2x^2+3x+C",
        },
      ],
      finalAnswerLatex: "2x^3-2x^2+3x+C",
    },
    {
      title: "Worked example 2: Use an initial condition",
      questionLatex:
        "F'(x)=4x+1, \\quad F(2)=9. \\quad \\text{Find }F(x).",
      steps: [
        {
          explanation: "Integrate the derivative.",
          latex: "F(x)=2x^2+x+C",
        },
        {
          explanation: "Use the condition $F(2)=9$.",
          latex: "9=2(2)^2+2+C",
        },
        {
          explanation: "Solve for $C$.",
          latex: "9=10+C \\quad \\Rightarrow \\quad C=-1",
        },
      ],
      finalAnswerLatex: "F(x)=2x^2+x-1",
    },
    {
      title: "Worked example 3: Why +C matters",
      questionLatex:
        "\\frac{d}{dx}\\left(x^3+7\\right)=3x^2 \\quad \\text{and} \\quad \\frac{d}{dx}\\left(x^3-4\\right)=3x^2",
      steps: [
        {
          explanation:
            "Different constants disappear when differentiating, so the antiderivative is a family.",
          latex: "\\int 3x^2\\,dx=x^3+C",
        },
      ],
      finalAnswerLatex: "x^3+C",
    },
  ],

  guidedPractice: [
    {
      id: "indef-guided-1",
      prompt: "Complete the indefinite integral:",
      latex: "\\int 8x^3\\,dx=2x^4+\\Box",
      answer: "C",
      hint: "Indefinite integrals include the constant of integration.",
      explanation: "$\\int 8x^3\\,dx=2x^4+C$.",
    },
    {
      id: "indef-guided-2",
      prompt: "Integrate the constant term:",
      latex: "\\int 5\\,dx",
      answer: "5x+C",
      acceptedAnswers: ["5x + C", "C+5x"],
      hint: "A constant integrates to a linear term.",
      explanation: "$\\int 5\\,dx=5x+C$.",
    },
    {
      id: "indef-guided-3",
      prompt: "Choose why $+C$ is needed.",
      latex: "\\int f(x)\\,dx=F(x)+C",
      answer: "B",
      choices: [
        { label: "A", text: "Variables differentiate to zero." },
        { label: "B", text: "Constants differentiate to zero." },
        { label: "C", text: "Integrals always equal zero." },
      ],
      hint: "Think about what disappears when differentiating.",
      explanation:
        "$+C$ is needed because constants differentiate to zero.",
    },
    {
      id: "indef-guided-4",
      prompt: "Find $C$ from the initial condition:",
      latex: "F(x)=x^2+C, \\quad F(3)=12",
      answer: "3",
      hint: "Substitute $x=3$ and $F(3)=12$.",
      explanation: "$12=9+C$, so $C=3$.",
    },
  ],

  independentPractice: [
    {
      id: "indef-ind-1",
      prompt: "Find the indefinite integral:",
      latex: "\\int \\left(3x^2+4x\\right)\\,dx",
      answer: "x^3+2x^2+C",
      acceptedAnswers: ["x^3 + 2x^2 + C"],
      hint: "Integrate each term and add $+C$.",
      explanation:
        "$\\int (3x^2+4x)\\,dx=x^3+2x^2+C$.",
    },
    {
      id: "indef-ind-2",
      prompt: "Find the indefinite integral:",
      latex: "\\int \\left(10x^4-6x^2\\right)\\,dx",
      answer: "2x^5-2x^3+C",
      acceptedAnswers: ["2x^5 - 2x^3 + C"],
      hint: "Integrate term-by-term.",
      explanation:
        "$\\int (10x^4-6x^2)\\,dx=2x^5-2x^3+C$.",
    },
    {
      id: "indef-ind-3",
      prompt: "Find $F(x)$:",
      latex: "F'(x)=6x-4, \\quad F(1)=5",
      answer: "3x^2-4x+6",
      acceptedAnswers: ["3x^2 - 4x + 6"],
      hint: "Integrate first, then use $F(1)=5$.",
      explanation:
        "$F(x)=3x^2-4x+C$. Since $F(1)=5$, $5=3-4+C$, so $C=6$.",
    },
    {
      id: "indef-ind-4",
      prompt: "Choose the correct indefinite integral.",
      latex: "\\int \\left(2x+7\\right)\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$x^2+7x+C$" },
        { label: "B", text: "$2+C$" },
        { label: "C", text: "$2x^2+7+C$" },
      ],
      hint: "The constant 7 integrates to $7x$.",
      explanation: "$\\int (2x+7)\\,dx=x^2+7x+C$.",
    },
    {
      id: "indef-ind-5",
      prompt: "Which expression differentiates to $4x^3-2x$?",
      latex: "f(x)=4x^3-2x",
      answer: "B",
      choices: [
        { label: "A", text: "$12x^2-2$" },
        { label: "B", text: "$x^4-x^2+C$" },
        { label: "C", text: "$4x^4-2x^2+C$" },
      ],
      hint: "Differentiate each possible antiderivative.",
      explanation:
        "$\\frac{d}{dx}(x^4-x^2+C)=4x^3-2x$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting $+C$ in an indefinite integral.",
      fix: "Always include $+C$ unless a specific value of the constant has been found.",
    },
    {
      mistake: "Treating a constant term as zero when integrating.",
      fix: "Constants differentiate to zero, but they integrate to linear terms like $5x$.",
    },
    {
      mistake: "Using the initial condition in the derivative instead of the antiderivative.",
      fix: "Find $F(x)+C$ first, then substitute the initial condition.",
    },
    {
      mistake: "Only integrating the first term.",
      fix: "Integrate every term in the polynomial expression.",
    },
  ],

  masteryQuiz: [
    {
      id: "indef-mastery-1",
      prompt: "Choose why an indefinite integral includes $+C$.",
      latex: "\\int f(x)\\,dx=F(x)+C",
      answer: "B",
      choices: [
        { label: "A", text: "Powers of x disappear." },
        { label: "B", text: "Constants differentiate to zero." },
        { label: "C", text: "The derivative is always positive." },
      ],
      hint: "Think about what differentiates to zero.",
      explanation: "$+C$ accounts for constants that disappear when differentiating.",
    },
    {
      id: "indef-mastery-2",
      prompt: "Find the indefinite integral:",
      latex: "\\int 6x^2\\,dx",
      answer: "2x^3+C",
      acceptedAnswers: ["2x^3 + C", "C+2x^3"],
      hint: "Add the constant of integration.",
      explanation: "$\\int 6x^2\\,dx=2x^3+C$.",
    },
    {
      id: "indef-mastery-3",
      prompt: "Find the indefinite integral:",
      latex: "\\int \\left(4x^3+5\\right)\\,dx",
      answer: "x^4+5x+C",
      acceptedAnswers: ["x^4 + 5x + C"],
      hint: "The constant 5 integrates to $5x$.",
      explanation: "$\\int (4x^3+5)\\,dx=x^4+5x+C$.",
    },
    {
      id: "indef-mastery-4",
      prompt: "Choose the correct family of antiderivatives.",
      latex: "\\int 2x\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$x^2+C$" },
        { label: "B", text: "$2+C$" },
        { label: "C", text: "$2x^2+C$" },
      ],
      hint: "Differentiate each option.",
      explanation: "$\\frac{d}{dx}(x^2+C)=2x$.",
    },
    {
      id: "indef-mastery-5",
      prompt: "Find the indefinite integral:",
      latex: "\\int \\left(9x^2-8x+1\\right)\\,dx",
      answer: "3x^3-4x^2+x+C",
      acceptedAnswers: ["3x^3 - 4x^2 + x + C"],
      hint: "Integrate term-by-term.",
      explanation:
        "$\\int (9x^2-8x+1)\\,dx=3x^3-4x^2+x+C$.",
    },
    {
      id: "indef-mastery-6",
      prompt: "Find $C$:",
      latex: "F(x)=2x^2+C, \\quad F(1)=7",
      answer: "5",
      hint: "Substitute $x=1$.",
      explanation: "$7=2(1)^2+C$, so $C=5$.",
    },
    {
      id: "indef-mastery-7",
      prompt: "Find $F(x)$:",
      latex: "F'(x)=3x^2+2, \\quad F(0)=4",
      answer: "x^3+2x+4",
      acceptedAnswers: ["x^3 + 2x + 4"],
      hint: "Integrate, then use $F(0)=4$.",
      explanation:
        "$F(x)=x^3+2x+C$. Since $F(0)=4$, $C=4$.",
    },
    {
      id: "indef-mastery-8",
      prompt: "Choose the correct check.",
      latex: "F(x)=x^5-3x^2+C",
      answer: "C",
      choices: [
        { label: "A", text: "$F'(x)=5x^4-3x+C$" },
        { label: "B", text: "$F'(x)=x^4-6x$" },
        { label: "C", text: "$F'(x)=5x^4-6x$" },
      ],
      hint: "The derivative of $C$ is 0.",
      explanation: "$F'(x)=5x^4-6x$.",
    },
    {
      id: "indef-mastery-9",
      prompt: "Find the missing term:",
      latex: "\\int \\left(12x^5-4x\\right)\\,dx=2x^6+\\Box+C",
      answer: "-2x^2",
      hint: "Integrate $-4x$.",
      explanation: "$\\int -4x\\,dx=-2x^2$.",
    },
    {
      id: "indef-mastery-10",
      prompt: "Choose the best final answer for an indefinite integral.",
      latex: "\\int \\left(5x^4+6x\\right)\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "$x^5+3x^2$" },
        { label: "B", text: "$x^5+3x^2+C$" },
        { label: "C", text: "$20x^3+6+C$" },
      ],
      hint: "Do not forget $+C$.",
      explanation: "$\\int (5x^4+6x)\\,dx=x^5+3x^2+C$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const integralCalculusOutline: LessonOutlineItem[] = [
  {
    id: "antidifferentiation-reverse-power-rule",
    slug: "antidifferentiation-reverse-power-rule",
    title: "Antidifferentiation and reverse power rule",
    description:
      "Understand integration as reverse differentiation and use the reverse power rule.",
    status: "active",
  },
  {
    id: "indefinite-integrals-constant-of-integration",
    slug: "indefinite-integrals-constant-of-integration",
    title: "Indefinite integrals and the constant of integration",
    description:
      "Use +C, integrate polynomial expressions term-by-term, and find C from simple conditions.",
    status: "active",
  },
  {
    id: "definite-integrals",
    slug: "definite-integrals",
    title: "Definite integrals",
    description:
      "Evaluate definite integrals using upper and lower limits.",
    status: "coming-soon",
  },
  {
    id: "area-under-a-curve",
    slug: "area-under-a-curve",
    title: "Area under a curve",
    description:
      "Use definite integrals to calculate signed and geometric area under curves.",
    status: "coming-soon",
  },
  {
    id: "area-between-curve-and-x-axis",
    slug: "area-between-curve-and-x-axis",
    title: "Area between a curve and the x-axis",
    description:
      "Account for sections above and below the x-axis when finding area.",
    status: "coming-soon",
  },
  {
    id: "area-between-two-curves",
    slug: "area-between-two-curves",
    title: "Area between two curves",
    description:
      "Use upper minus lower functions to find area between curves.",
    status: "coming-soon",
  },
  {
    id: "applications-of-integration",
    slug: "applications-of-integration",
    title: "Applications of integration",
    description:
      "Apply integration to displacement, accumulation, and contextual quantities.",
    status: "coming-soon",
  },
  {
    id: "mixed-integral-calculus-exam-practice",
    slug: "mixed-integral-calculus-exam-practice",
    title: "Mixed integral calculus exam practice",
    description:
      "Practise HSC-style integration questions across the unit.",
    status: "coming-soon",
  },
];

export const integralCalculusLessons = [
  antidifferentiationReversePowerRuleLesson,
  indefiniteIntegralsConstantOfIntegrationLesson,
];
