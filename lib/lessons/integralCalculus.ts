import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
} from "./differentialCalculus";

export const antidifferentiationReversePowerRuleLesson: ExplicitLesson = {
  id: "antidifferentiation-reverse-power-rule",
  slug: "antidifferentiation-reverse-power-rule",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Antidifferentiation and the Reverse Power Rule",
  description:
    "Learn integration as the reverse process of differentiation and use the reverse power rule for polynomial terms.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Antidifferentiation and the Reverse Power Rule",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to find simple antiderivatives using the reverse power rule.",

  successCriteria: [
    "Explain that antidifferentiation reverses differentiation.",
    "Use primitive and antiderivative language correctly.",
    "Use the reverse power rule for powers of x where the power is not -1.",
    "Increase the power by one, then divide by the new power.",
    "Check an antiderivative by differentiating it.",
    "Recognise that the reverse power rule in this lesson does not apply to $x^{-1}$.",
  ],

  teaching: {
    paragraphs: [
      "Antidifferentiation is the reverse process of differentiation.",
      "A primitive, or antiderivative, is a function that differentiates to give the expression you started with.",
      "If differentiating a function gives a derivative, antidifferentiating works backwards from the derivative to a possible original function.",
      "For a power of x, the reverse power rule says to increase the power by one, then divide by the new power.",
      "You can check an antiderivative by differentiating it. If you get the original expression, your antiderivative is correct.",
      "This first lesson avoids the special case of $x^{-1}$. That case belongs with logarithmic integration later.",
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
      latex: "\\int 12x^2\\,dx",
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
      mistake: "Using the reverse power rule when the power is -1.",
      fix: "The integral of $x^{-1}$ is handled using logarithms later, not by dividing by zero.",
    },
  ],

  masteryQuiz: [
    {
      id: "anti-mastery-1",
      prompt: "Finding an antiderivative is the reverse of which process?",
      latex: "\\int f'(x)\\,dx = f(x)+C",
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
      answer: "A",
      choices: [
        { label: "A", text: "$x^4$" },
        { label: "B", text: "$16x^2$" },
        { label: "C", text: "$4x^4$" },
      ],
      hint: "Increase the power to 4 and divide 4 by 4.",
      explanation: "$\\int 4x^3\\,dx=x^4$.",
    },
    {
      id: "anti-mastery-3",
      prompt: "Find an antiderivative:",
      latex: "\\int 15x^2\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "$30x$" },
        { label: "B", text: "$5x^3$" },
        { label: "C", text: "$15x^3$" },
      ],
      hint: "Increase the power to 3 and divide 15 by 3.",
      explanation: "$\\int 15x^2\\,dx=5x^3$.",
    },
    {
      id: "anti-mastery-4",
      prompt: "Find the new power in the antiderivative:",
      latex: "\\int 7x^6\\,dx",
      answer: "7",
      hint: "Increase the original power by one.",
      explanation: "The new power is $6+1=7$.",
    },
    {
      id: "anti-mastery-5",
      prompt: "Find an antiderivative:",
      latex: "\\int -12x^5\\,dx",
      answer: "C",
      choices: [
        { label: "A", text: "$-60x^4$" },
        { label: "B", text: "$2x^6$" },
        { label: "C", text: "$-2x^6$" },
      ],
      hint: "Divide $-12$ by the new power 6.",
      explanation: "$\\int -12x^5\\,dx=-2x^6$.",
    },
    {
      id: "anti-mastery-6",
      prompt: "Find an antiderivative:",
      latex: "\\int x^4\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{x^5}{5}$" },
        { label: "B", text: "$4x^3$" },
        { label: "C", text: "$x^5$" },
      ],
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
      answer: "B",
      choices: [
        { label: "A", text: "$60x^2$" },
        { label: "B", text: "$5x^4$" },
        { label: "C", text: "$20x^4$" },
      ],
      hint: "Divide 20 by the new power 4.",
      explanation: "$\\int 20x^3\\,dx=5x^4$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const indefiniteIntegralsConstantOfIntegrationLesson: ExplicitLesson = {
  id: "indefinite-integrals-constant-of-integration",
  slug: "indefinite-integrals-constant-of-integration",
  moduleSlug: "ma-c4-integral-calculus",
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
    "Learn how to write indefinite integrals with the constant of integration.",

  successCriteria: [
    "Explain why indefinite integrals include $+C$.",
    "Integrate polynomial expressions term-by-term.",
    "Use the constant of integration correctly.",
    "Check an indefinite integral by differentiating.",
  ],

  teaching: {
    paragraphs: [
      "An indefinite integral gives a family of antiderivatives rather than one single function.",
      "This happens because constants differentiate to zero. For example, $x^2$, $x^2+5$, and $x^2-8$ all have derivative $2x$.",
      "The symbol $+C$ represents any constant that could have been present before differentiating.",
      "For polynomial expressions, integrate each term separately and then add $+C$.",
      "Initial conditions can later be used to find a particular value of $C$, but this lesson focuses mainly on writing the family of antiderivatives.",
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
      title: "Worked example 2: Integrate term-by-term",
      questionLatex:
        "\\int \\left(4x^3+2x-5\\right)\\,dx",
      steps: [
        {
          explanation: "Integrate $4x^3$.",
          latex: "\\int 4x^3\\,dx=x^4",
        },
        {
          explanation: "Integrate $2x$.",
          latex: "\\int 2x\\,dx=x^2",
        },
        {
          explanation: "Integrate the constant term and add $+C$.",
          latex: "\\int -5\\,dx=-5x, \\quad \\text{so add }+C",
        },
      ],
      finalAnswerLatex: "x^4+x^2-5x+C",
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
      prompt: "Complete the missing constant of integration:",
      latex: "\\int \\left(2x+1\\right)\\,dx=x^2+x+\\Box",
      answer: "C",
      hint: "Indefinite integrals need the constant of integration.",
      explanation: "$\\int (2x+1)\\,dx=x^2+x+C$.",
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
      prompt: "Find the indefinite integral:",
      latex: "\\int \\left(6x-4\\right)\\,dx",
      answer: "3x^2-4x+C",
      acceptedAnswers: ["3x^2 - 4x + C"],
      hint: "Integrate each term and include $+C$.",
      explanation:
        "$\\int (6x-4)\\,dx=3x^2-4x+C$.",
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
      mistake: "Forgetting that $+C$ belongs after the whole integrated expression.",
      fix: "Integrate every term, then write one $+C$ at the end of the indefinite integral.",
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
      answer: "A",
      choices: [
        { label: "A", text: "$2x^3+C$" },
        { label: "B", text: "$18x+C$" },
        { label: "C", text: "$2x^2+C$" },
      ],
      hint: "Add the constant of integration.",
      explanation: "$\\int 6x^2\\,dx=2x^3+C$.",
    },
    {
      id: "indef-mastery-3",
      prompt: "Find the indefinite integral:",
      latex: "\\int \\left(4x^3+5\\right)\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "$x^4+5+C$" },
        { label: "B", text: "$x^4+5x+C$" },
        { label: "C", text: "$12x^2+5+C$" },
      ],
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
      answer: "C",
      choices: [
        { label: "A", text: "$18x-8+C$" },
        { label: "B", text: "$3x^3-8x^2+x+C$" },
        { label: "C", text: "$3x^3-4x^2+x+C$" },
      ],
      hint: "Integrate term-by-term.",
      explanation:
        "$\\int (9x^2-8x+1)\\,dx=3x^3-4x^2+x+C$.",
    },
    {
      id: "indef-mastery-6",
      prompt: "Find the indefinite integral:",
      latex: "\\int 8x^3\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "$24x^2+C$" },
        { label: "B", text: "$2x^4+C$" },
        { label: "C", text: "$8x^4+C$" },
      ],
      hint: "Increase the power, divide by the new power, and add $+C$.",
      explanation: "$\\int 8x^3\\,dx=2x^4+C$.",
    },
    {
      id: "indef-mastery-7",
      prompt: "Choose the answer that correctly includes the family of primitives.",
      latex: "\\int \\left(3x^2+2\\right)\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "$x^3+2$" },
        { label: "B", text: "$x^3+2x+C$" },
        { label: "C", text: "$6x$" },
      ],
      hint: "Indefinite integrals need $+C$.",
      explanation:
        "$\\int (3x^2+2)\\,dx=x^3+2x+C$.",
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
      prompt: "Choose the term produced by integrating $-4x$ in the displayed integral.",
      latex: "\\int \\left(12x^5-4x\\right)\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$-2x^2$" },
        { label: "B", text: "$-4x^2$" },
        { label: "C", text: "$-4$" },
      ],
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

export const initialConditionsParticularPrimitiveLesson: ExplicitLesson = {
  id: "initial-conditions-particular-primitive",
  slug: "initial-conditions-particular-primitive",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Initial Conditions and Finding the Particular Primitive",
  description:
    "Use an initial condition or point on a curve to find the value of C and write the particular primitive.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Initial Conditions and Finding the Particular Primitive",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use an initial condition to find the particular primitive from a derivative.",

  successCriteria: [
    "Integrate a derivative to find the general primitive.",
    "Include the constant of integration before using the initial condition.",
    "Substitute the given x-value and function value into the primitive.",
    "Solve for the value of C.",
    "Write the final particular primitive using correct notation.",
  ],

  teaching: {
    paragraphs: [
      "An indefinite integral gives a family of primitives because different constants can have the same derivative.",
      "A particular primitive is found when extra information is given, such as $f(2)=7$ or a point on the curve.",
      "The process is: integrate to find the general primitive, substitute the given x-value and function value, solve for $C$, then write the final function.",
      "The initial condition must be substituted into the primitive, not into the derivative.",
      "Use notation carefully. If the question gives $f'(x)$, write $f(x)$. If it gives $\\frac{dy}{dx}$, write $y=...$.",
    ],
    latexBlocks: [
      "f'(x)=g(x) \\quad \\Rightarrow \\quad f(x)=\\int g(x)\\,dx",
      "f(x)=F(x)+C",
      "f(a)=b \\quad \\Rightarrow \\quad b=F(a)+C",
      "\\text{particular primitive}=F(x)+\\text{specific }C",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Find f(x)",
      questionLatex:
        "f'(x)=6x+4, \\quad f(1)=9. \\quad \\text{Find }f(x).",
      steps: [
        {
          explanation: "Integrate to find the general primitive.",
          latex: "f(x)=\\int (6x+4)\\,dx=3x^2+4x+C",
        },
        {
          explanation: "Substitute the initial condition.",
          latex: "9=3(1)^2+4(1)+C",
        },
        {
          explanation: "Solve for C.",
          latex: "9=7+C \\Rightarrow C=2",
        },
        {
          explanation: "Write the particular primitive.",
          latex: "f(x)=3x^2+4x+2",
        },
      ],
      finalAnswerLatex: "f(x)=3x^2+4x+2",
    },
    {
      title: "Worked example 2: Use dy/dx notation",
      questionLatex:
        "\\frac{dy}{dx}=3x^2-4x, \\quad y(2)=5. \\quad \\text{Find }y.",
      steps: [
        {
          explanation: "Integrate the derivative.",
          latex: "y=\\int (3x^2-4x)\\,dx=x^3-2x^2+C",
        },
        {
          explanation: "Substitute $x=2$ and $y=5$.",
          latex: "5=2^3-2(2)^2+C",
        },
        {
          explanation: "Solve for C.",
          latex: "5=8-8+C \\Rightarrow C=5",
        },
        {
          explanation: "Write the final function.",
          latex: "y=x^3-2x^2+5",
        },
      ],
      finalAnswerLatex: "y=x^3-2x^2+5",
    },
  ],

  guidedPractice: [
    {
      id: "initial-guided-1",
      prompt: "Find the general primitive:",
      latex: "f'(x)=4x+3",
      answer: "2x^2+3x+C",
      acceptedAnswers: ["2x^2 + 3x + C", "C+2x^2+3x"],
      hint: "Integrate each term and include $+C$.",
      explanation: "$f(x)=2x^2+3x+C$.",
    },
    {
      id: "initial-guided-2",
      prompt: "Complete the substitution step:",
      latex: "f(x)=2x^2+3x+C, \\quad f(1)=8 \\Rightarrow 8=2(1)^2+3(1)+\\Box",
      answer: "C",
      hint: "Substitute into the primitive.",
      explanation: "The missing term is $C$.",
    },
    {
      id: "initial-guided-3",
      prompt: "Solve for C:",
      latex: "8=5+C",
      answer: "3",
      hint: "Subtract 5 from both sides.",
      explanation: "$C=3$.",
    },
    {
      id: "initial-guided-4",
      prompt: "Write the particular primitive:",
      latex: "f(x)=2x^2+3x+C, \\quad C=3",
      answer: "2x^2+3x+3",
      acceptedAnswers: ["f(x)=2x^2+3x+3", "2x^2 + 3x + 3"],
      hint: "Replace $C$ with 3.",
      explanation: "The particular primitive is $f(x)=2x^2+3x+3$.",
    },
  ],

  independentPractice: [
    {
      id: "initial-ind-1",
      prompt: "Find the particular primitive:",
      latex: "f'(x)=2x+5, \\quad f(1)=10",
      answer: "x^2+5x+4",
      acceptedAnswers: ["f(x)=x^2+5x+4", "x^2 + 5x + 4"],
      hint: "Integrate first, then use $f(1)=10$.",
      explanation:
        "$f(x)=x^2+5x+C$. Since $10=1+5+C$, $C=4$.",
    },
    {
      id: "initial-ind-2",
      prompt: "Find the particular primitive:",
      latex: "f'(x)=3x^2+4x, \\quad f(0)=7",
      answer: "x^3+2x^2+7",
      acceptedAnswers: ["f(x)=x^3+2x^2+7", "x^3 + 2x^2 + 7"],
      hint: "The initial condition makes $C$ easy here.",
      explanation:
        "$f(x)=x^3+2x^2+C$. Since $f(0)=7$, $C=7$.",
    },
    {
      id: "initial-ind-3",
      prompt: "Find the particular primitive:",
      latex: "y'=-4x+6, \\quad y(2)=1",
      answer: "-2x^2+6x-3",
      acceptedAnswers: ["y=-2x^2+6x-3", "-2x^2 + 6x - 3"],
      hint: "Keep the negative sign when integrating.",
      explanation:
        "$y=-2x^2+6x+C$. Since $1=-8+12+C$, $C=-3$.",
    },
    {
      id: "initial-ind-4",
      prompt: "A velocity is given. Find the displacement function:",
      latex: "s'(t)=6t, \\quad s(1)=5",
      answer: "3t^2+2",
      acceptedAnswers: ["s(t)=3t^2+2", "3t^2 + 2"],
      hint: "Integrate velocity to get displacement.",
      explanation:
        "$s(t)=3t^2+C$. Since $5=3(1)^2+C$, $C=2$.",
    },
    {
      id: "initial-ind-5",
      prompt: "Find C only:",
      latex: "F(x)=x^2-4x+C, \\quad F(3)=2",
      answer: "5",
      hint: "Substitute $x=3$.",
      explanation: "$2=9-12+C$, so $C=5$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting +C.",
      fix: "Include $+C$ before substituting the initial condition.",
    },
    {
      mistake: "Substituting into the derivative instead of the primitive.",
      fix: "Use the condition in $f(x)$ or $y$, not in $f'(x)$ or $\\frac{dy}{dx}$.",
    },
    {
      mistake: "Using the x-value as C.",
      fix: "The x-value is substituted into the primitive. Then solve for $C$.",
    },
    {
      mistake: "Writing only C when asked for the primitive.",
      fix: "After finding $C$, write the full function as the final answer.",
    },
  ],

  masteryQuiz: [
    {
      id: "initial-mastery-1",
      prompt: "Find the general primitive:",
      latex: "f'(x)=8x",
      answer: "A",
      choices: [
        { label: "A", text: "$f(x)=4x^2+C$" },
        { label: "B", text: "$f(x)=8+C$" },
        { label: "C", text: "$f(x)=8x^2+C$" },
      ],
      hint: "Integrate and include $+C$.",
      explanation: "$f(x)=4x^2+C$.",
    },
    {
      id: "initial-mastery-2",
      prompt: "Choose why $+C$ is needed before using a condition.",
      latex: "f'(x)=g(x)",
      answer: "B",
      choices: [
        { label: "A", text: "the derivative is unknown" },
        { label: "B", text: "there is a family of primitives" },
        { label: "C", text: "the x-value is always zero" },
      ],
      hint: "Different constants can have the same derivative.",
      explanation:
        "$+C$ represents the family of primitives before the condition selects one.",
    },
    {
      id: "initial-mastery-3",
      prompt: "Find the general primitive:",
      latex: "\\frac{dy}{dx}=5x^4",
      answer: "B",
      choices: [
        { label: "A", text: "$y=20x^3+C$" },
        { label: "B", text: "$y=x^5+C$" },
        { label: "C", text: "$y=5x^5+C$" },
      ],
      hint: "Increase the power to 5 and divide by 5.",
      explanation: "$y=x^5+C$.",
    },
    {
      id: "initial-mastery-4",
      prompt: "Use $f(3)=11$ to solve for C.",
      latex: "f(x)=x^2+C",
      answer: "2",
      hint: "Use $11=9+C$.",
      explanation: "$11=3^2+C$, so $C=2$.",
    },
    {
      id: "initial-mastery-5",
      prompt: "Find C when $y(1)=6$.",
      latex: "y=2x^2-x+C",
      answer: "5",
      hint: "Substitute $x=1$ and $y=6$.",
      explanation: "$6=2-1+C$, so $C=5$.",
    },
    {
      id: "initial-mastery-6",
      prompt: "Find C when $F(0)=-2$.",
      latex: "F(x)=x^3+4x+C",
      answer: "-2",
      hint: "Substitute $x=0$.",
      explanation: "$-2=0+0+C$, so $C=-2$.",
    },
    {
      id: "initial-mastery-7",
      prompt: "Find the particular primitive with $f(4)=20$.",
      latex: "f'(x)=2x",
      answer: "C",
      choices: [
        { label: "A", text: "$f(x)=2$" },
        { label: "B", text: "$f(x)=x^2+C$" },
        { label: "C", text: "$f(x)=x^2+4$" },
      ],
      hint: "First write $f(x)=x^2+C$.",
      explanation: "$20=16+C$, so $C=4$ and $f(x)=x^2+4$.",
    },
    {
      id: "initial-mastery-8",
      prompt: "Find the particular primitive with $y(1)=3$.",
      latex: "y'=6x-2",
      answer: "A",
      choices: [
        { label: "A", text: "$y=3x^2-2x+2$" },
        { label: "B", text: "$y=6x^2-2x+2$" },
        { label: "C", text: "$y=3x^2-2x+C$" },
      ],
      hint: "Integrate, then substitute $x=1$.",
      explanation:
        "$y=3x^2-2x+C$. Since $3=3-2+C$, $C=2$.",
    },
    {
      id: "initial-mastery-9",
      prompt: "A rate of change is given. Find the quantity model with $Q(0)=6$.",
      latex: "Q'(t)=4t+1",
      answer: "B",
      choices: [
        { label: "A", text: "$Q(t)=4t+1$" },
        { label: "B", text: "$Q(t)=2t^2+t+6$" },
        { label: "C", text: "$Q(t)=2t^2+t+C$" },
      ],
      hint: "Integrate $4t+1$.",
      explanation:
        "$Q(t)=2t^2+t+C$. Since $Q(0)=6$, $C=6$.",
    },
    {
      id: "initial-mastery-10",
      prompt: "Choose the correct first substitution step when $f(2)=10$.",
      latex: "f'(x)=3x^2",
      answer: "C",
      choices: [
        { label: "A", text: "$10=3(2)^2$" },
        { label: "B", text: "$C=2$" },
        { label: "C", text: "$10=2^3+C$" },
      ],
      hint: "Integrate first, then substitute into the primitive.",
      explanation:
        "Since $f(x)=x^3+C$, the condition gives $10=2^3+C$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const definiteIntegralsFundamentalTheoremLesson: ExplicitLesson = {
  id: "definite-integrals-fundamental-theorem",
  slug: "definite-integrals-fundamental-theorem",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Definite Integrals and the Fundamental Theorem of Calculus",
  description:
    "Evaluate definite integrals using antiderivatives and the Fundamental Theorem of Calculus.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Definite Integrals and the Fundamental Theorem of Calculus",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to evaluate definite integrals using the Fundamental Theorem of Calculus.",

  successCriteria: [
    "Identify the lower and upper bounds of a definite integral.",
    "Find an antiderivative for the integrand.",
    "Use $F(b)-F(a)$ to evaluate a definite integral.",
    "Recognise that definite integral answers are numbers, not families of functions.",
    "Interpret positive, negative, and zero definite integral values as signed area.",
  ],

  teaching: {
    paragraphs: [
      "A definite integral has a lower bound and an upper bound. These bounds define the interval being accumulated over.",
      "To evaluate a definite integral, first find an antiderivative of the integrand.",
      "The Fundamental Theorem of Calculus connects antiderivatives with definite integrals.",
      "If $F'(x)=f(x)$, then $\\int_a^b f(x)\\,dx=F(b)-F(a)$.",
      "A definite integral gives a number. Do not include $+C$ in the final value.",
      "Definite integrals can be positive, negative, or zero because they represent signed area.",
    ],
    latexBlocks: [
      "\\int_a^b f(x)\\,dx",
      "F'(x)=f(x)",
      "\\int_a^b f(x)\\,dx=F(b)-F(a)",
      "\\left[F(x)\\right]_a^b=F(b)-F(a)",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Evaluate a polynomial definite integral",
      questionLatex: "\\int_0^2 (3x^2+1)\\,dx",
      steps: [
        {
          explanation: "Find an antiderivative.",
          latex: "\\int (3x^2+1)\\,dx=x^3+x",
        },
        {
          explanation: "Substitute the upper and lower bounds.",
          latex: "\\left[x^3+x\\right]_0^2",
        },
        {
          explanation: "Subtract $F(0)$ from $F(2)$.",
          latex: "(2^3+2)-(0^3+0)=10",
        },
      ],
      finalAnswerLatex: "10",
    },
    {
      title: "Worked example 2: A zero definite integral",
      questionLatex:
        "\\int_1^3 (2x-4)\\,dx \\quad \\text{and interpret why the result is zero.}",
      steps: [
        {
          explanation: "Find an antiderivative.",
          latex: "\\int (2x-4)\\,dx=x^2-4x",
        },
        {
          explanation: "Evaluate using $F(3)-F(1)$.",
          latex:
            "\\left[x^2-4x\\right]_1^3=(9-12)-(1-4)=-3-(-3)=0",
        },
        {
          explanation:
            "The signed area below the x-axis cancels the signed area above the x-axis.",
          latex: "\\int_1^3 (2x-4)\\,dx=0",
        },
      ],
      finalAnswerLatex:
        "0. \\quad \\text{The positive and negative signed areas cancel.}",
    },
  ],

  guidedPractice: [
    {
      id: "definite-guided-1",
      prompt: "Identify the lower bound:",
      latex: "\\int_1^4 f(x)\\,dx",
      answer: "1",
      hint: "The lower bound is written below the integral sign.",
      explanation: "The lower bound is $1$.",
    },
    {
      id: "definite-guided-2",
      prompt: "Find an antiderivative:",
      latex: "f(x)=4x+2",
      answer: "2x^2+2x",
      acceptedAnswers: ["2x^2+2x+C", "2x^2 + 2x"],
      hint: "For the definite integral process, any antiderivative works.",
      explanation: "An antiderivative is $F(x)=2x^2+2x$.",
    },
    {
      id: "definite-guided-3",
      prompt: "Substitute the upper bound:",
      latex: "F(x)=x^2+1, \\quad b=3",
      answer: "10",
      hint: "Find $F(3)$.",
      explanation: "$F(3)=3^2+1=10$.",
    },
    {
      id: "definite-guided-4",
      prompt: "Evaluate using $F(b)-F(a)$:",
      latex: "F(3)=10, \\quad F(1)=2",
      answer: "8",
      hint: "Subtract lower from upper.",
      explanation: "$F(3)-F(1)=10-2=8$.",
    },
  ],

  independentPractice: [
    {
      id: "definite-ind-1",
      prompt: "Evaluate:",
      latex: "\\int_0^2 (6x^2+1)\\,dx",
      answer: "18",
      hint: "Use antiderivative $2x^3+x$.",
      explanation: "$\\left[2x^3+x\\right]_0^2=16+2=18$.",
    },
    {
      id: "definite-ind-2",
      prompt: "Evaluate:",
      latex: "\\int_0^2 (-3x)\\,dx",
      answer: "-6",
      hint: "A definite integral can be negative.",
      explanation: "$\\left[-\\frac{3x^2}{2}\\right]_0^2=-6$.",
    },
    {
      id: "definite-ind-3",
      prompt: "Evaluate:",
      latex: "\\int_1^3 2x\\,dx",
      answer: "8",
      hint: "Use $[x^2]_1^3$.",
      explanation: "$\\int_1^3 2x\\,dx=3^2-1^2=8$.",
    },
    {
      id: "definite-ind-4",
      prompt: "Evaluate:",
      latex: "\\int_1^3 (2x-4)\\,dx",
      answer: "0",
      hint: "Use $x^2-4x$.",
      explanation: "$[x^2-4x]_1^3=-3-(-3)=0$.",
    },
    {
      id: "definite-ind-5",
      prompt: "Should the final answer include $+C$?",
      latex: "\\int_0^2 f(x)\\,dx",
      answer: "B",
      acceptedAnswers: ["no"],
      choices: [
        { label: "A", text: "yes" },
        { label: "B", text: "no" },
      ],
      hint: "This is a definite integral.",
      explanation: "A definite integral gives a number, so the final answer does not include $+C$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Adding +C to a definite integral answer.",
      fix: "Use an antiderivative to evaluate the bounds, but the final definite integral value is a number.",
    },
    {
      mistake: "Subtracting in the wrong order.",
      fix: "Always calculate $F(b)-F(a)$: upper bound first, then lower bound.",
    },
    {
      mistake: "Substituting only the upper bound.",
      fix: "Evaluate both bounds and subtract.",
    },
    {
      mistake: "Assuming definite integrals are always positive.",
      fix: "Definite integrals give signed area, so they can be positive, negative, or zero.",
    },
  ],

  masteryQuiz: [
    {
      id: "definite-mastery-1",
      prompt: "Identify the upper bound:",
      latex: "\\int_2^7 f(x)\\,dx",
      answer: "7",
      hint: "The upper bound is written above the integral sign.",
      explanation: "The upper bound is $7$.",
    },
    {
      id: "definite-mastery-2",
      prompt: "Choose the correct antiderivative:",
      latex: "f(x)=3x^2+4",
      answer: "A",
      choices: [
        { label: "A", text: "$F(x)=x^3+4x$" },
        { label: "B", text: "$F(x)=6x$" },
        { label: "C", text: "$F(x)=3x^3+4$" },
      ],
      hint: "Differentiate each option if unsure.",
      explanation: "An antiderivative of $3x^2+4$ is $x^3+4x$.",
    },
    {
      id: "definite-mastery-3",
      prompt: "Choose the correct Fundamental Theorem setup.",
      latex: "F'(x)=f(x)",
      answer: "B",
      choices: [
        { label: "A", text: "$\\int_a^b f(x)\\,dx=F(a)-F(b)$" },
        { label: "B", text: "$\\int_a^b f(x)\\,dx=F(b)-F(a)$" },
        { label: "C", text: "$\\int_a^b f(x)\\,dx=F(a)+F(b)$" },
      ],
      hint: "Upper bound first, lower bound second.",
      explanation: "$\\int_a^b f(x)\\,dx=F(b)-F(a)$.",
    },
    {
      id: "definite-mastery-4",
      prompt: "Evaluate:",
      latex: "\\int_0^2 3x^2\\,dx",
      answer: "8",
      hint: "Use $x^3$.",
      explanation: "$[x^3]_0^2=8$.",
    },
    {
      id: "definite-mastery-5",
      prompt: "Evaluate:",
      latex: "\\int_1^4 2x\\,dx",
      answer: "15",
      hint: "Use $x^2$.",
      explanation: "$[x^2]_1^4=16-1=15$.",
    },
    {
      id: "definite-mastery-6",
      prompt: "Evaluate:",
      latex: "\\int_0^3 (2x+1)\\,dx",
      answer: "12",
      hint: "Use $x^2+x$.",
      explanation: "$[x^2+x]_0^3=9+3=12$.",
    },
    {
      id: "definite-mastery-7",
      prompt: "A definite integral is negative. Choose the correct interpretation.",
      latex: "\\int_a^b f(x)\\,dx<0",
      answer: "A",
      choices: [
        { label: "A", text: "it has negative signed area overall" },
        { label: "B", text: "it is impossible" },
        { label: "C", text: "the answer must be changed to positive" },
      ],
      hint: "Definite integrals are signed.",
      explanation:
        "A definite integral can be negative because it represents signed area.",
    },
    {
      id: "definite-mastery-8",
      prompt: "Why can this integral equal zero?",
      latex: "\\int_1^3 (2x-4)\\,dx=0",
      answer: "B",
      choices: [
        { label: "A", text: "there is no graph" },
        { label: "B", text: "positive and negative signed areas cancel" },
        { label: "C", text: "definite integrals always equal zero" },
      ],
      hint: "Think signed area.",
      explanation: "The below-axis and above-axis signed areas cancel.",
    },
    {
      id: "definite-mastery-9",
      prompt: "Evaluate:",
      latex: "\\int_1^2 (4x^3-2x)\\,dx",
      answer: "12",
      hint: "Use $x^4-x^2$.",
      explanation:
        "$[x^4-x^2]_1^2=(16-4)-(1-1)=12$.",
    },
    {
      id: "definite-mastery-10",
      prompt: "Evaluate:",
      latex: "\\int_0^2 (x^2+2x)\\,dx",
      answer: "20/3",
      acceptedAnswers: ["6.6666666667", "6.67"],
      hint: "Use $\\frac{x^3}{3}+x^2$.",
      explanation:
        "$\\left[\\frac{x^3}{3}+x^2\\right]_0^2=\\frac{8}{3}+4=\\frac{20}{3}$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const signedAreaTotalAreaLesson: ExplicitLesson = {
  id: "signed-area-total-area",
  slug: "signed-area-total-area",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Signed Area and Total Area",
  description:
    "Distinguish between signed area from a definite integral and total geometric area, especially when a graph crosses the x-axis.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Signed Area and Total Area",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to distinguish signed area from total area when using definite integrals.",

  successCriteria: [
    "Explain that a definite integral gives signed area.",
    "Identify whether a graph is above or below the x-axis on an interval.",
    "Split an interval when a curve crosses the x-axis.",
    "Find signed area pieces using definite integrals.",
    "Find total area by adding the absolute values of signed pieces.",
  ],

  teaching: {
    paragraphs: [
      "A definite integral gives signed area. Area above the x-axis contributes positively, and area below the x-axis contributes negatively.",
      "Total geometric area is always non-negative. It measures physical area, so below-axis pieces must be counted as positive.",
      "If a curve crosses the x-axis inside the interval, split the integral at the x-intercept before finding total area.",
      "To find total area, calculate each signed piece separately, then add the absolute values.",
      "This distinction is a major HSC mark leak because the signed area and the total area can be different numbers.",
    ],
    latexBlocks: [
      "\\int_a^b f(x)\\,dx=\\text{signed area}",
      "\\text{area above the }x\\text{-axis}>0, \\quad \\text{area below the }x\\text{-axis}<0",
      "\\text{total area}=\\left|\\int_a^c f(x)\\,dx\\right|+\\left|\\int_c^b f(x)\\,dx\\right|",
      "f(c)=0 \\quad \\Rightarrow \\quad \\text{split at }x=c",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Signed area",
      questionLatex:
        "\\int_0^3 (x-1)\\,dx \\quad \\text{and explain why it is a signed area.}",
      steps: [
        {
          explanation: "Find an antiderivative.",
          latex: "\\int (x-1)\\,dx=\\frac{x^2}{2}-x",
        },
        {
          explanation: "Evaluate between 0 and 3.",
          latex:
            "\\left[\\frac{x^2}{2}-x\\right]_0^3=\\left(\\frac{9}{2}-3\\right)-0=\\frac{3}{2}",
        },
        {
          explanation:
            "The graph is below the x-axis on part of the interval and above it on another part, so the integral adds signed contributions.",
          latex: "x-1=0 \\Rightarrow x=1",
        },
      ],
      finalAnswerLatex:
        "\\frac{3}{2}. \\quad \\text{This is signed area because below-axis area counts negatively.}",
      cartesianGraph: {
        description: "The line y equals x minus 1 crosses the x-axis at x equals 1. The below-axis and above-axis pieces are shaded separately to show how signed area combines negative and positive contributions.",
        xMin: -0.5, xMax: 3.5, yMin: -2, yMax: 3, xStep: 0.5, yStep: 1,
        lines: [{ kind: "linear", m: 1, b: -1, label: "y = x - 1" }],
        shadedRegions: [
          {
            kind: "under-function",
            functionType: "line",
            line: { m: 1, b: -1 },
            xMin: 0,
            xMax: 1,
            color: "red",
            description: "Shaded region below the x-axis from x equals 0 to x equals 1. This part contributes negative signed area.",
          },
          {
            kind: "under-function",
            functionType: "line",
            line: { m: 1, b: -1 },
            xMin: 1,
            xMax: 3,
            color: "green",
            description: "Shaded region above the x-axis from x equals 1 to x equals 3. This part contributes positive signed area.",
          },
        ],
      },
    },
    {
      title: "Worked example 2: Total area",
      questionLatex:
        "\\text{Find the total area between }y=x-1\\text{ and the }x\\text{-axis from }x=0\\text{ to }x=3.",
      steps: [
        {
          explanation: "Find where the graph crosses the x-axis.",
          latex: "x-1=0 \\Rightarrow x=1",
        },
        {
          explanation: "Split the interval at the x-intercept.",
          latex:
            "\\int_0^1 (x-1)\\,dx=-\\frac{1}{2}, \\quad \\int_1^3 (x-1)\\,dx=2",
        },
        {
          explanation: "Add absolute values to get total area.",
          latex:
            "\\left|-\\frac{1}{2}\\right|+|2|=\\frac{1}{2}+2=\\frac{5}{2}",
        },
      ],
      finalAnswerLatex: "\\frac{5}{2}\\text{ square units}",
      cartesianGraph: {
        description: "The line y equals x minus 1 crosses the x-axis at x equals 1. Both bounded pieces from x equals 0 to x equals 3 are shaded to show total geometric area.",
        xMin: -0.5, xMax: 3.5, yMin: -2, yMax: 3, xStep: 0.5, yStep: 1,
        lines: [{ kind: "linear", m: 1, b: -1, label: "y = x - 1" }],
        shadedRegions: [
          {
            kind: "under-function",
            functionType: "line",
            line: { m: 1, b: -1 },
            xMin: 0,
            xMax: 1,
            color: "red",
            description: "Shaded below-axis piece from x equals 0 to x equals 1. It contributes negative signed area but positive total area.",
          },
          {
            kind: "under-function",
            functionType: "line",
            line: { m: 1, b: -1 },
            xMin: 1,
            xMax: 3,
            color: "green",
            description: "Shaded above-axis piece from x equals 1 to x equals 3. It contributes positive signed area and positive total area.",
          },
        ],
      },
    },
  ],

  guidedPractice: [
    {
      id: "signed-guided-1",
      prompt: "Find the x-intercept where the interval should be split:",
      latex: "y=x-2",
      answer: "2",
      hint: "Set $x-2=0$.",
      explanation: "$x-2=0$ gives $x=2$.",
    },
    {
      id: "signed-guided-2",
      prompt: "Does this total area question need splitting?",
      latex: "y=x-2, \\quad 0\\le x\\le 4",
      answer: "A",
      acceptedAnswers: ["yes"],
      choices: [
        { label: "A", text: "yes" },
        { label: "B", text: "no" },
      ],
      hint: "Check whether the x-intercept lies inside the interval.",
      explanation:
        "The graph crosses the x-axis at $x=2$, which is inside $0\\le x\\le4$, so the interval must be split.",
    },
    {
      id: "signed-guided-3",
      prompt: "Find the signed area on the first interval:",
      latex: "\\int_0^2 (x-2)\\,dx",
      answer: "-2",
      hint: "Use $\\frac{x^2}{2}-2x$.",
      explanation:
        "$\\left[\\frac{x^2}{2}-2x\\right]_0^2=2-4=-2$.",
    },
    {
      id: "signed-guided-4",
      prompt: "Find the total area from the signed pieces:",
      latex: "\\int_0^2 (x-2)\\,dx=-2, \\quad \\int_2^4 (x-2)\\,dx=2",
      answer: "4",
      hint: "Add absolute values.",
      explanation: "Total area is $|-2|+|2|=4$ square units.",
    },
  ],

  independentPractice: [
    {
      id: "signed-ind-1",
      prompt: "Find the total area:",
      latex: "y=x-2, \\quad 0\\le x\\le 4",
      answer: "4",
      hint: "Split at $x=2$ and add absolute values.",
      explanation:
        "$\\int_0^2(x-2)\\,dx=-2$ and $\\int_2^4(x-2)\\,dx=2$, so total area is $4$.",
    },
    {
      id: "signed-ind-2",
      prompt: "Find the area. The curve is above the x-axis on this interval.",
      latex: "y=x^2+1, \\quad 0\\le x\\le 2",
      answer: "14/3",
      acceptedAnswers: ["4.6666666667", "4.67"],
      hint: "Evaluate $\\int_0^2(x^2+1)\\,dx$.",
      explanation:
        "$\\int_0^2(x^2+1)\\,dx=\\left[\\frac{x^3}{3}+x\\right]_0^2=\\frac{14}{3}$.",
    },
    {
      id: "signed-ind-3",
      prompt: "Find the total area. The graph is below the x-axis.",
      latex: "y=x-3, \\quad 0\\le x\\le 2",
      answer: "4",
      hint: "The definite integral is negative, but area is positive.",
      explanation:
        "$\\int_0^2(x-3)\\,dx=-4$, so the total area is $4$ square units.",
    },
    {
      id: "signed-ind-4",
      prompt: "Is splitting required to find total area?",
      latex: "y=x^2+1, \\quad 0\\le x\\le 2",
      answer: "B",
      acceptedAnswers: ["no"],
      choices: [
        { label: "A", text: "yes" },
        { label: "B", text: "no" },
      ],
      hint: "$x^2+1$ is always positive.",
      explanation:
        "No split is needed because $x^2+1$ is above the x-axis for all real $x$.",
    },
    {
      id: "signed-ind-5",
      prompt: "Transfer question: find the total area.",
      latex: "y=2x-2, \\quad 0\\le x\\le 3",
      answer: "5",
      hint: "Split at $x=1$.",
      explanation:
        "$\\int_0^1(2x-2)\\,dx=-1$ and $\\int_1^3(2x-2)\\,dx=4$, so total area is $5$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Assuming a definite integral always gives total area.",
      fix: "A definite integral gives signed area. Total area needs absolute values when pieces are below the x-axis.",
    },
    {
      mistake: "Not splitting when the graph crosses the x-axis.",
      fix: "Find x-intercepts inside the interval and split there before calculating total area.",
    },
    {
      mistake: "Forgetting to take the absolute value for below-axis area.",
      fix: "Below-axis signed area is negative, but geometric area is positive.",
    },
    {
      mistake: "Adding signed pieces when total area was required.",
      fix: "For total area, add $|\\text{piece 1}|+|\\text{piece 2}|+\\cdots$.",
    },
  ],

  masteryQuiz: [
    {
      id: "signed-mastery-1",
      prompt: "Choose the correct statement.",
      latex: "\\int_a^b f(x)\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "always gives total area" },
        { label: "B", text: "gives signed area" },
        { label: "C", text: "is always positive" },
      ],
      hint: "Area below the x-axis contributes negatively.",
      explanation: "A definite integral gives signed area.",
    },
    {
      id: "signed-mastery-2",
      prompt: "Find the x-axis crossing:",
      latex: "y=x-4",
      answer: "4",
      hint: "Set $y=0$.",
      explanation: "$x-4=0$, so $x=4$.",
    },
    {
      id: "signed-mastery-3",
      prompt: "Does the total area calculation need splitting?",
      latex: "y=x-4, \\quad 0\\le x\\le 6",
      answer: "A",
      acceptedAnswers: ["yes"],
      choices: [
        { label: "A", text: "yes" },
        { label: "B", text: "no" },
      ],
      hint: "The x-intercept is inside the interval.",
      explanation: "The graph crosses at $x=4$, so split the interval there.",
    },
    {
      id: "signed-mastery-4",
      prompt: "Calculate the signed area:",
      latex: "\\int_0^1 (x-1)\\,dx",
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "Use $\\frac{x^2}{2}-x$.",
      explanation: "$\\int_0^1(x-1)\\,dx=-\\frac{1}{2}$.",
    },
    {
      id: "signed-mastery-5",
      prompt: "Calculate the signed area:",
      latex: "\\int_1^3 (x-1)\\,dx",
      answer: "2",
      hint: "Use $\\frac{x^2}{2}-x$.",
      explanation: "$\\int_1^3(x-1)\\,dx=2$.",
    },
    {
      id: "signed-mastery-6",
      prompt: "Calculate the signed area:",
      latex: "\\int_0^2 (-x)\\,dx",
      answer: "-2",
      hint: "Use $-\\frac{x^2}{2}$.",
      explanation: "$\\int_0^2(-x)\\,dx=-2$.",
    },
    {
      id: "signed-mastery-7",
      prompt: "Find the total area from the signed pieces:",
      latex: "-\\frac{1}{2}, \\quad 2",
      answer: "5/2",
      acceptedAnswers: ["2.5"],
      hint: "Add absolute values.",
      explanation: "$\\left|-\\frac{1}{2}\\right|+|2|=\\frac{5}{2}$.",
    },
    {
      id: "signed-mastery-8",
      prompt: "Find the total area:",
      latex: "y=x-1, \\quad 0\\le x\\le 3",
      answer: "5/2",
      acceptedAnswers: ["2.5"],
      hint: "Split at $x=1$.",
      explanation:
        "The signed pieces are $-\\frac{1}{2}$ and $2$, so total area is $\\frac{5}{2}$.",
    },
    {
      id: "signed-mastery-9",
      prompt: "A definite integral is negative. What does that usually mean geometrically?",
      latex: "\\int_a^b f(x)\\,dx<0",
      answer: "A",
      choices: [
        { label: "A", text: "more signed area is below the x-axis" },
        { label: "B", text: "the total area is negative" },
        { label: "C", text: "there is no area" },
      ],
      hint: "Total geometric area is never negative.",
      explanation:
        "A negative definite integral means the below-axis signed contribution is larger.",
    },
    {
      id: "signed-mastery-10",
      prompt: "Choose the best plan for total area when a graph crosses the x-axis.",
      latex: "\\text{total area}",
      answer: "C",
      choices: [
        { label: "A", text: "evaluate one integral and keep the sign" },
        { label: "B", text: "ignore the x-intercept" },
        { label: "C", text: "split at the x-intercept and add absolute values" },
      ],
      hint: "Crossing the x-axis changes the sign of area contribution.",
      explanation:
        "For total area, split at x-intercepts and add absolute values of the pieces.",
    },
  ],

  masteryPassMark: 0.8,
};

export const areaUnderCurveLesson: ExplicitLesson = {
  id: "area-under-a-curve",
  slug: "area-under-a-curve",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Area Under a Curve",
  description:
    "Use definite integrals to find area under a curve, including positive, below-axis, and split-interval cases.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Area Under a Curve",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to calculate area under a curve using definite integrals.",

  successCriteria: [
    "Identify the bounds of the required area.",
    "Set up a definite integral for area under a curve.",
    "Find and evaluate an antiderivative using the bounds.",
    "Check whether the curve is above or below the x-axis on the interval.",
    "State area using square units.",
  ],

  teaching: {
    paragraphs: [
      "Area under a curve can be found using a definite integral when the curve is above the x-axis on the interval.",
      "The bounds define the interval of the area. For example, from $x=a$ to $x=b$ means the integral has lower bound $a$ and upper bound $b$.",
      "If the curve is below the x-axis, the definite integral is negative but the geometric area is positive.",
      "Before giving an area answer, check whether the curve is above or below the x-axis. If the curve crosses the x-axis, split the interval as in the signed area lesson.",
      "Area is measured in square units.",
    ],
    latexBlocks: [
      "\\text{Area}=\\int_a^b f(x)\\,dx \\quad \\text{if } f(x)\\ge 0 \\text{ on }[a,b]",
      "\\text{Area}=\\left|\\int_a^b f(x)\\,dx\\right| \\quad \\text{if } f(x)\\le 0 \\text{ on }[a,b]",
      "\\int_a^b f(x)\\,dx=\\left[F(x)\\right]_a^b=F(b)-F(a)",
      "\\text{area units}=\\text{square units}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Area above the x-axis",
      questionLatex:
        "\\text{Find the area under }y=x^2+1\\text{ from }x=0\\text{ to }x=2.",
      steps: [
        {
          explanation: "The curve is above the x-axis, so use the definite integral directly.",
          latex: "\\text{Area}=\\int_0^2 (x^2+1)\\,dx",
        },
        {
          explanation: "Find an antiderivative.",
          latex: "\\int (x^2+1)\\,dx=\\frac{x^3}{3}+x",
        },
        {
          explanation: "Evaluate between 0 and 2.",
          latex:
            "\\left[\\frac{x^3}{3}+x\\right]_0^2=\\frac{8}{3}+2=\\frac{14}{3}",
        },
      ],
      finalAnswerLatex: "\\frac{14}{3}\\text{ square units}",
      cartesianGraph: {
        description: "The parabola y equals x squared plus 1 stays above the x-axis. The region under the curve is shaded from x equals 0 to x equals 2.",
        xMin: -0.5, xMax: 2.5, yMin: -1, yMax: 6, xStep: 0.5, yStep: 1,
        parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 1, label: "y = x^2 + 1" }],
        shadedRegions: [{
          kind: "under-function",
          functionType: "quadratic",
          quadratic: { a: 1, b: 0, c: 1 },
          xMin: 0,
          xMax: 2,
          description: "Shaded area under y equals x squared plus 1 and above the x-axis from x equals 0 to x equals 2.",
        }],
      },
    },
    {
      title: "Worked example 2: Area bounded by the x-axis",
      questionLatex:
        "\\text{Find the area between }y=4-x^2\\text{ and the }x\\text{-axis from }x=0\\text{ to }x=2.",
      steps: [
        {
          explanation: "The curve is non-negative on $0\\le x\\le2$.",
          latex: "4-x^2\\ge 0",
        },
        {
          explanation: "Set up the definite integral.",
          latex: "\\text{Area}=\\int_0^2 (4-x^2)\\,dx",
        },
        {
          explanation: "Evaluate the integral.",
          latex:
            "\\left[4x-\\frac{x^3}{3}\\right]_0^2=8-\\frac{8}{3}=\\frac{16}{3}",
        },
      ],
      finalAnswerLatex: "\\frac{16}{3}\\text{ square units}",
      cartesianGraph: {
        description: "The parabola y equals 4 minus x squared, with the area between the curve and the x-axis shaded from x equals 0 to x equals 2.",
        xMin: -0.5, xMax: 2.5, yMin: -1, yMax: 5, xStep: 0.5, yStep: 1,
        parabolas: [{ kind: "quadratic", a: -1, b: 0, c: 4, label: "y = 4 - x^2" }],
        shadedRegions: [{
          kind: "under-function",
          functionType: "quadratic",
          quadratic: { a: -1, b: 0, c: 4 },
          xMin: 0,
          xMax: 2,
          description: "Shaded area under y equals 4 minus x squared and above the x-axis from x equals 0 to x equals 2.",
        }],
      },
    },
  ],

  guidedPractice: [
    {
      id: "area-guided-1",
      prompt: "Identify the lower bound:",
      latex: "\\text{Area from }x=1\\text{ to }x=4",
      answer: "1",
      hint: "The lower bound is the starting x-value.",
      explanation: "The lower bound is $1$.",
    },
    {
      id: "area-guided-2",
      prompt: "Choose the correct setup:",
      latex: "\\text{Area under }y=x+1\\text{ from }x=0\\text{ to }x=2",
      answer: "A",
      choices: [
        { label: "A", text: "$\\int_0^2 (x+1)\\,dx$" },
        { label: "B", text: "$\\int_2^0 (x+1)\\,dx$" },
        { label: "C", text: "$\\int_0^2 (x-1)\\,dx$" },
      ],
      hint: "Use the function and the given bounds.",
      explanation: "The correct setup is $\\int_0^2 (x+1)\\,dx$.",
    },
    {
      id: "area-guided-3",
      prompt: "Find an antiderivative:",
      latex: "\\int 2x\\,dx",
      answer: "x^2",
      acceptedAnswers: ["x^2+C"],
      hint: "For a definite integral, the $+C$ cancels.",
      explanation: "An antiderivative of $2x$ is $x^2$.",
    },
    {
      id: "area-guided-4",
      prompt: "Evaluate the area:",
      latex: "\\int_0^2 2x\\,dx",
      answer: "4",
      hint: "Use $[x^2]_0^2$.",
      explanation: "$\\int_0^2 2x\\,dx=[x^2]_0^2=4$ square units.",
    },
  ],

  independentPractice: [
    {
      id: "area-ind-1",
      prompt: "Find the area under the curve:",
      latex: "y=x^2, \\quad 0\\le x\\le 3",
      answer: "9",
      hint: "Evaluate $\\int_0^3 x^2\\,dx$.",
      explanation: "$\\int_0^3 x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_0^3=9$.",
    },
    {
      id: "area-ind-2",
      prompt: "Find the area. The graph is below the x-axis.",
      latex: "y=-x, \\quad 0\\le x\\le 2",
      answer: "2",
      hint: "Evaluate the integral, then take the absolute value.",
      explanation:
        "$\\int_0^2(-x)\\,dx=-2$, so the area is $2$ square units.",
    },
    {
      id: "area-ind-3",
      prompt: "Find the area under the curve:",
      latex: "y=3, \\quad 1\\le x\\le 4",
      answer: "9",
      hint: "This is also a rectangle with width 3 and height 3.",
      explanation: "$\\int_1^4 3\\,dx=[3x]_1^4=9$.",
    },
    {
      id: "area-ind-4",
      prompt: "Choose the correct units for an area answer.",
      latex: "\\text{length units are metres}",
      answer: "B",
      acceptedAnswers: ["square metres", "m^2"],
      choices: [
        { label: "A", text: "metres" },
        { label: "B", text: "square metres" },
        { label: "C", text: "metres per second" },
      ],
      hint: "Area uses square units.",
      explanation: "If length is measured in metres, area is measured in square metres.",
    },
    {
      id: "area-ind-5",
      prompt: "Is splitting required before finding total area?",
      latex: "y=x-1, \\quad 0\\le x\\le 3",
      answer: "A",
      acceptedAnswers: ["yes"],
      choices: [
        { label: "A", text: "yes" },
        { label: "B", text: "no" },
      ],
      hint: "Check whether the graph crosses the x-axis inside the interval.",
      explanation:
        "The graph crosses at $x=1$, so split the interval before finding total area.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting the bounds.",
      fix: "Area under a curve over an interval needs lower and upper x-values.",
    },
    {
      mistake: "Writing the antiderivative but not evaluating it.",
      fix: "Use $F(b)-F(a)$ after finding the antiderivative.",
    },
    {
      mistake: "Giving a negative value for area.",
      fix: "If the integral is negative, the geometric area is its absolute value.",
    },
    {
      mistake: "Forgetting square units.",
      fix: "Area is measured in square units, such as square metres or square centimetres.",
    },
  ],

  masteryQuiz: [
    {
      id: "area-mastery-1",
      prompt: "Identify the lower bound:",
      latex: "\\int_2^5 f(x)\\,dx",
      answer: "2",
      hint: "The lower bound is written below the integral sign.",
      explanation: "The lower bound is $2$.",
    },
    {
      id: "area-mastery-2",
      prompt: "Choose the correct setup:",
      latex: "\\text{Area under }y=x^2+1\\text{ from }x=0\\text{ to }x=2",
      answer: "B",
      choices: [
        { label: "A", text: "$\\int_2^0 (x^2+1)\\,dx$" },
        { label: "B", text: "$\\int_0^2 (x^2+1)\\,dx$" },
        { label: "C", text: "$\\int_0^2 (x^2-1)\\,dx$" },
      ],
      hint: "Use the lower and upper x-values in order.",
      explanation: "The correct setup is $\\int_0^2(x^2+1)\\,dx$.",
    },
    {
      id: "area-mastery-3",
      prompt: "Choose the correct antiderivative for evaluating the area.",
      latex: "\\int (x^2+1)\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{x^3}{3}+x$" },
        { label: "B", text: "$2x$" },
        { label: "C", text: "$x^3+x$" },
      ],
      hint: "Integrate each term.",
      explanation: "An antiderivative is $\\frac{x^3}{3}+x$.",
    },
    {
      id: "area-mastery-4",
      prompt: "Calculate the area:",
      latex: "\\int_0^2 (x+1)\\,dx",
      answer: "4",
      hint: "Use $\\frac{x^2}{2}+x$.",
      explanation: "$\\int_0^2(x+1)\\,dx=4$.",
    },
    {
      id: "area-mastery-5",
      prompt: "Calculate the area:",
      latex: "\\int_0^3 x^2\\,dx",
      answer: "9",
      hint: "Use $\\frac{x^3}{3}$.",
      explanation: "$\\int_0^3x^2\\,dx=9$.",
    },
    {
      id: "area-mastery-6",
      prompt: "Calculate the area:",
      latex: "\\int_1^3 2x\\,dx",
      answer: "8",
      hint: "Use $x^2$.",
      explanation: "$\\int_1^3 2x\\,dx=[x^2]_1^3=8$.",
    },
    {
      id: "area-mastery-7",
      prompt: "Find the area. The curve is below the x-axis.",
      latex: "y=-2, \\quad 0\\le x\\le 3",
      answer: "6",
      hint: "The integral is $-6$, but area is positive.",
      explanation: "$\\int_0^3 -2\\,dx=-6$, so area is $6$ square units.",
    },
    {
      id: "area-mastery-8",
      prompt: "Find the area. The curve is below the x-axis on the interval.",
      latex: "y=x-2, \\quad 0\\le x\\le 1",
      answer: "3/2",
      acceptedAnswers: ["1.5"],
      hint: "Evaluate the signed integral and take the absolute value.",
      explanation:
        "$\\int_0^1(x-2)\\,dx=-\\frac{3}{2}$, so area is $\\frac{3}{2}$.",
    },
    {
      id: "area-mastery-9",
      prompt: "Choose the correct final units.",
      latex: "\\text{Area}=12",
      answer: "B",
      choices: [
        { label: "A", text: "units" },
        { label: "B", text: "square units" },
        { label: "C", text: "units per second" },
      ],
      hint: "Area uses square units.",
      explanation: "The final answer should be $12$ square units.",
    },
    {
      id: "area-mastery-10",
      prompt: "Choose the best plan if the curve crosses the x-axis inside the interval.",
      latex: "\\text{area under a curve}",
      answer: "C",
      choices: [
        { label: "A", text: "use one integral and keep a negative area" },
        { label: "B", text: "ignore the crossing" },
        { label: "C", text: "split the interval and add positive areas" },
      ],
      hint: "This connects to signed area and total area.",
      explanation:
        "If the curve crosses the x-axis, split the interval and add the positive areas.",
    },
  ],

  masteryPassMark: 0.8,
};

export const trapezoidalRuleAreaApproximationLesson: ExplicitLesson = {
  id: "trapezoidal-rule-area-approximation",
  slug: "trapezoidal-rule-area-approximation",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "The Trapezoidal Rule and Area Approximation",
  description:
    "Approximate area under a curve using the Trapezoidal rule with table values or evenly spaced function values.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "The Trapezoidal Rule and Area Approximation",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use the Trapezoidal rule to approximate area under a curve.",

  successCriteria: [
    "Explain that the Trapezoidal rule approximates area using trapezia.",
    "Find the subinterval width $h$ from the bounds and number of subintervals.",
    "Identify first, last, and middle y-values correctly.",
    "Substitute values into the Trapezoidal rule formula.",
    "State that the result is an approximation with square units where appropriate.",
  ],

  teaching: {
    paragraphs: [
      "The Trapezoidal rule approximates area under a curve by replacing curved sections with straight-sided trapezia.",
      "It is useful when exact integration is difficult or when the information is given in a table.",
      "For $n$ equal subintervals from $x=a$ to $x=b$, the width is $h=\\frac{b-a}{n}$.",
      "The first and last y-values are counted once. The middle y-values are counted twice.",
      "The result is an approximation, not necessarily the exact area. Use square units when approximating area.",
    ],
    latexBlocks: [
      "h=\\frac{b-a}{n}",
      "T=\\frac{h}{2}\\left[y_0+2(y_1+y_2+\\cdots+y_{n-1})+y_n\\right]",
      "\\text{end values: }y_0,y_n \\quad \\text{middle values: }y_1,\\ldots,y_{n-1}",
      "T\\approx \\int_a^b f(x)\\,dx",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Table values",
      questionLatex:
        "\\text{Use the Trapezoidal rule with }h=1\\text{ and }y\\text{-values }2,5,10,17\\text{ to approximate the area.}",
      steps: [
        {
          explanation: "Identify the first, middle, and last y-values.",
          latex: "y_0=2, \\quad y_1=5, \\quad y_2=10, \\quad y_3=17",
        },
        {
          explanation: "Substitute into the Trapezoidal rule.",
          latex: "T=\\frac{1}{2}\\left[2+2(5+10)+17\\right]",
        },
        {
          explanation: "Calculate the approximation.",
          latex: "T=\\frac{49}{2}=24.5",
        },
      ],
      finalAnswerLatex: "24.5\\text{ square units}",
      trapezoidalRuleDiagram: {
        description: "Four ordinates at x equals 0, 1, 2 and 3 have heights 2, 5, 10 and 17. Straight top edges join adjacent points, creating three lightly shaded trapezia. The two middle ordinates are shared by neighbouring trapezia.",
        xValues: [0, 1, 2, 3],
        yValues: [2, 5, 10, 17],
        showOrdinateLabels: true,
        showTrapezoidLabels: true,
      },
    },
    {
      title: "Worked example 2: Function values",
      questionLatex:
        "\\text{Approximate the area under }y=x^2+1\\text{ from }x=0\\text{ to }x=4\\text{ using }4\\text{ equal subintervals.}",
      steps: [
        {
          explanation: "Find the width.",
          latex: "h=\\frac{4-0}{4}=1",
        },
        {
          explanation: "Find the y-values at $x=0,1,2,3,4$.",
          latex: "1,\\;2,\\;5,\\;10,\\;17",
        },
        {
          explanation: "Substitute into the formula.",
          latex: "T=\\frac{1}{2}\\left[1+2(2+5+10)+17\\right]",
        },
        {
          explanation: "Calculate the approximation.",
          latex: "T=26",
        },
      ],
      finalAnswerLatex: "26\\text{ square units}",
      trapezoidalRuleDiagram: {
        description: "Five ordinates for y equals x squared plus 1 are drawn at x equals 0, 1, 2, 3 and 4. Straight top edges form four lightly shaded trapezia. The three middle ordinates belong to two adjacent trapezia.",
        xValues: [0, 1, 2, 3, 4],
        yValues: [1, 2, 5, 10, 17],
        showOrdinateLabels: true,
        showTrapezoidLabels: true,
        functionLabel: "y = x^2 + 1",
      },
    },
  ],

  guidedPractice: [
    {
      id: "trap-guided-1",
      prompt: "Find the subinterval width:",
      latex: "a=0, \\quad b=6, \\quad n=3",
      answer: "2",
      hint: "Use $h=\\frac{b-a}{n}$.",
      explanation: "$h=\\frac{6-0}{3}=2$.",
    },
    {
      id: "trap-guided-2",
      prompt: "Identify the first and last y-values:",
      latex: "y\\text{-values: }4,7,9,12",
      answer: "B",
      choices: [
        { label: "A", text: "$7$ and $9$" },
        { label: "B", text: "$4$ and $12$" },
        { label: "C", text: "$4$ and $7$" },
      ],
      hint: "Use the two end values.",
      explanation: "The first and last y-values are $4$ and $12$.",
    },
    {
      id: "trap-guided-3",
      prompt: "Identify the middle y-values:",
      latex: "y\\text{-values: }4,7,9,12",
      answer: "B",
      choices: [
        { label: "A", text: "$4$ and $12$" },
        { label: "B", text: "$7$ and $9$" },
        { label: "C", text: "$4$ and $7$" },
      ],
      hint: "Middle values are all values except the two ends.",
      explanation: "The middle y-values are $7$ and $9$.",
    },
    {
      id: "trap-guided-4",
      prompt: "Calculate the Trapezoidal rule approximation:",
      latex: "h=2, \\quad y\\text{-values: }4,7,9,12",
      answer: "48",
      hint: "Use $\\frac{2}{2}[4+2(7+9)+12]$.",
      explanation: "$T=1[4+32+12]=48$.",
      trapezoidalRuleDiagram: {
        description:
          "Four function values 4, 7, 9 and 12 plotted at x = 0, 2, 4, 6 with three trapezoidal strips of width 2.",
        xValues: [0, 2, 4, 6],
        yValues: [4, 7, 9, 12],
      },
    },
  ],

  independentPractice: [
    {
      id: "trap-ind-1",
      prompt: "Use the Trapezoidal rule:",
      latex: "h=1, \\quad y\\text{-values: }3,4,7",
      answer: "9",
      hint: "There is one middle value.",
      explanation: "$T=\\frac{1}{2}[3+2(4)+7]=9$.",
      trapezoidalRuleDiagram: {
        description:
          "Three function values 3, 4 and 7 plotted at x = 0, 1, 2 with two trapezoidal strips of width 1.",
        xValues: [0, 1, 2],
        yValues: [3, 4, 7],
      },
    },
    {
      id: "trap-ind-2",
      prompt: "Approximate using values of $y=x^2$ from $x=0$ to $x=2$ with $n=2$.",
      latex: "y\\text{-values: }0,1,4",
      answer: "3",
      hint: "$h=1$.",
      explanation: "$T=\\frac{1}{2}[0+2(1)+4]=3$.",
      trapezoidalRuleDiagram: {
        description:
          "Values of y = x^2 (0, 1 and 4) plotted at x = 0, 1, 2 with two trapezoidal strips of width 1.",
        xValues: [0, 1, 2],
        yValues: [0, 1, 4],
      },
    },
    {
      id: "trap-ind-3",
      prompt: "In the trapezoidal rule with five ordinates, which values are doubled?",
      latex: "T=\\frac{h}{2}\\left[(y_0+y_4)+2(\\ldots)\\right]",
      answer: "B",
      choices: [
        { label: "A", text: "$y_0$ and $y_4$" },
        { label: "B", text: "$y_1,y_2,y_3$" },
        { label: "C", text: "all values" },
      ],
      hint: "Only middle values are doubled.",
      explanation: "The middle values $y_1,y_2,y_3$ are doubled.",
    },
    {
      id: "trap-ind-4",
      prompt: "Find $h$:",
      latex: "a=2, \\quad b=10, \\quad n=4",
      answer: "2",
      hint: "Use $h=\\frac{10-2}{4}$.",
      explanation: "$h=2$.",
    },
    {
      id: "trap-ind-5",
      prompt: "A tank flow-rate table has readings $1,3,5,4$ every 2 minutes. Approximate the total amount.",
      latex: "h=2, \\quad y\\text{-values: }1,3,5,4",
      answer: "21",
      hint: "Use the Trapezoidal rule.",
      explanation: "$T=\\frac{2}{2}[1+2(3+5)+4]=21$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Doubling the first and last values.",
      fix: "Only the middle y-values are doubled.",
    },
    {
      mistake: "Forgetting to multiply by $\\frac{h}{2}$.",
      fix: "After forming the bracket, multiply by $\\frac{h}{2}$.",
    },
    {
      mistake: "Using the number of points instead of the number of subintervals.",
      fix: "If there are 5 points, there are 4 equal subintervals.",
    },
    {
      mistake: "Treating the approximation as exact without justification.",
      fix: "The Trapezoidal rule gives an approximation unless the question or graph justifies exactness.",
    },
  ],

  masteryQuiz: [
    {
      id: "trap-mastery-1",
      prompt: "Find $h$:",
      latex: "a=0, \\quad b=8, \\quad n=4",
      answer: "2",
      hint: "Use $h=\\frac{b-a}{n}$.",
      explanation: "$h=\\frac{8}{4}=2$.",
    },
    {
      id: "trap-mastery-2",
      prompt: "Identify the first y-value:",
      latex: "y\\text{-values: }2,6,8,9",
      answer: "2",
      hint: "Use the first listed value.",
      explanation: "$y_0=2$.",
    },
    {
      id: "trap-mastery-3",
      prompt: "Which y-values are doubled?",
      latex: "y\\text{-values: }2,6,8,9",
      answer: "B",
      choices: [
        { label: "A", text: "$2$ and $9$" },
        { label: "B", text: "$6$ and $8$" },
        { label: "C", text: "$2,6,8,9$" },
      ],
      hint: "Double the middle values.",
      explanation: "$6$ and $8$ are the middle y-values.",
    },
    {
      id: "trap-mastery-4",
      prompt: "Approximate the area:",
      latex: "h=1, \\quad y\\text{-values: }2,6,8",
      answer: "11",
      hint: "Use $\\frac{1}{2}[2+2(6)+8]$.",
      explanation: "$T=11$.",
    },
    {
      id: "trap-mastery-5",
      prompt: "Approximate the area:",
      latex: "h=2, \\quad y\\text{-values: }1,4,7",
      answer: "12",
      hint: "Use $\\frac{2}{2}[1+2(4)+7]$.",
      explanation: "$T=12$.",
    },
    {
      id: "trap-mastery-6",
      prompt: "Approximate the area:",
      latex: "h=1, \\quad y\\text{-values: }1,2,5,10,17",
      answer: "26",
      hint: "Use $\\frac{1}{2}[1+2(2+5+10)+17]$.",
      explanation: "$T=26$.",
    },
    {
      id: "trap-mastery-7",
      prompt: "Use values of $y=x^2+1$ from $x=0$ to $x=2$ with $n=2$.",
      latex: "y\\text{-values: }1,2,5",
      answer: "5",
      hint: "$h=1$.",
      explanation: "$T=\\frac{1}{2}[1+2(2)+5]=5$.",
    },
    {
      id: "trap-mastery-8",
      prompt: "Use values of $y=2x+1$ from $x=0$ to $x=3$ with $n=3$.",
      latex: "y\\text{-values: }1,3,5,7",
      answer: "12",
      hint: "$h=1$.",
      explanation: "$T=\\frac{1}{2}[1+2(3+5)+7]=12$.",
    },
    {
      id: "trap-mastery-9",
      prompt: "Choose the correct interpretation.",
      latex: "\\text{Trapezoidal rule result}",
      answer: "A",
      choices: [
        { label: "A", text: "an approximation" },
        { label: "B", text: "always exact" },
        { label: "C", text: "always zero" },
      ],
      hint: "The rule uses trapezia to approximate curved area.",
      explanation: "The Trapezoidal rule usually gives an approximation.",
    },
    {
      id: "trap-mastery-10",
      prompt: "A table has 6 equally spaced points. How many subintervals are there?",
      latex: "y_0,y_1,y_2,y_3,y_4,y_5",
      answer: "5",
      hint: "Subintervals are the gaps between points.",
      explanation: "Six points create five subintervals.",
    },
  ],

  masteryPassMark: 0.8,
};

export const areaBetweenTwoCurvesLesson: ExplicitLesson = {
  id: "area-between-two-curves",
  slug: "area-between-two-curves",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Area Between Two Curves",
  description:
    "Find areas enclosed between two curves by integrating top function minus bottom function.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Area Between Two Curves",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to calculate the area between two curves using definite integrals.",

  successCriteria: [
    "Identify the top curve and bottom curve on an interval.",
    "Set up the area integral as top minus bottom.",
    "Use given bounds or find intersection points when needed.",
    "Evaluate the definite integral accurately.",
    "Recognise when curves cross and the interval may need to be split.",
  ],

  teaching: {
    paragraphs: [
      "Area between two curves is found by integrating the vertical distance between them.",
      "The vertical distance is top function minus bottom function.",
      "From $x=a$ to $x=b$, the area between $y=f(x)$ and $y=g(x)$ is $\\int_a^b(\\text{top}-\\text{bottom})\\,dx$.",
      "You must identify which curve is above on the interval. If the curves cross, the top and bottom functions may swap, so splitting may be needed.",
      "Area should be non-negative and is measured in square units.",
    ],
    latexBlocks: [
      "\\text{Area}=\\int_a^b \\left(\\text{top}-\\text{bottom}\\right)\\,dx",
      "\\text{Area}=\\int_a^b \\left(f(x)-g(x)\\right)\\,dx \\quad \\text{if } f(x)\\ge g(x)",
      "f(x)=g(x) \\quad \\Rightarrow \\quad \\text{intersection bounds}",
      "\\text{area units}=\\text{square units}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Line above parabola",
      questionLatex:
        "\\text{Find the area between }y=x+4\\text{ and }y=x^2\\text{ from }x=0\\text{ to }x=2.",
      steps: [
        {
          explanation: "Identify the top and bottom curves on the interval.",
          latex: "x+4 \\ge x^2 \\quad \\text{for }0\\le x\\le2",
        },
        {
          explanation: "Set up top minus bottom.",
          latex: "\\text{Area}=\\int_0^2 \\left[(x+4)-x^2\\right]\\,dx",
        },
        {
          explanation: "Evaluate the integral.",
          latex:
            "\\left[\\frac{x^2}{2}+4x-\\frac{x^3}{3}\\right]_0^2=2+8-\\frac{8}{3}=\\frac{22}{3}",
        },
      ],
      finalAnswerLatex: "\\frac{22}{3}\\text{ square units}",
      cartesianGraph: {
        description: "The line y equals x plus 4 sits above the parabola y equals x squared from x equals 0 to x equals 2. The region between the curves is shaded.",
        xMin: -0.5, xMax: 2.5, yMin: -1, yMax: 7, xStep: 0.5, yStep: 1,
        lines: [{ kind: "linear", m: 1, b: 4, label: "y = x + 4" }],
        parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y = x^2" }],
        shadedRegions: [{
          kind: "between-functions",
          xMin: 0,
          xMax: 2,
          top: { functionType: "line", line: { m: 1, b: 4 } },
          bottom: { functionType: "quadratic", quadratic: { a: 1, b: 0, c: 0 } },
          description: "Shaded vertical gap between y equals x plus 4 and y equals x squared from x equals 0 to x equals 2.",
        }],
      },
    },
    {
      title: "Worked example 2: Curve and the x-axis",
      questionLatex:
        "\\text{Find the area enclosed by }y=4-x^2\\text{ and }y=0\\text{ from }x=-2\\text{ to }x=2.",
      steps: [
        {
          explanation: "Here the top curve is $4-x^2$ and the bottom curve is $0$.",
          latex: "4-x^2 \\ge 0 \\quad \\text{on }[-2,2]",
        },
        {
          explanation: "Set up the area integral.",
          latex: "\\text{Area}=\\int_{-2}^{2}\\left[(4-x^2)-0\\right]\\,dx",
        },
        {
          explanation: "Evaluate the integral.",
          latex:
            "\\left[4x-\\frac{x^3}{3}\\right]_{-2}^{2}=\\frac{16}{3}-\\left(-\\frac{16}{3}\\right)=\\frac{32}{3}",
        },
      ],
      finalAnswerLatex: "\\frac{32}{3}\\text{ square units}",
      cartesianGraph: {
        description: "The parabola y equals 4 minus x squared meets the x-axis at x equals negative 2 and x equals 2. The enclosed region is shaded.",
        xMin: -2.5, xMax: 2.5, yMin: -1, yMax: 5, xStep: 0.5, yStep: 1,
        parabolas: [{ kind: "quadratic", a: -1, b: 0, c: 4, label: "y = 4 - x^2" }],
        shadedRegions: [{
          kind: "under-function",
          functionType: "quadratic",
          quadratic: { a: -1, b: 0, c: 4 },
          xMin: -2,
          xMax: 2,
          description: "Shaded region enclosed by y equals 4 minus x squared and the x-axis from x equals negative 2 to x equals 2.",
        }],
      },
    },
  ],

  guidedPractice: [
    {
      id: "between-guided-1",
      prompt: "Identify the top curve on the interval:",
      latex: "y=x+3, \\quad y=x, \\quad 0\\le x\\le2",
      answer: "A",
      choices: [
        { label: "A", text: "$y=x+3$" },
        { label: "B", text: "$y=x$" },
      ],
      hint: "$x+3$ is always 3 above $x$.",
      explanation: "$y=x+3$ is the top curve.",
    },
    {
      id: "between-guided-2",
      prompt: "Identify the bottom curve:",
      latex: "y=5, \\quad y=x^2, \\quad 0\\le x\\le2",
      answer: "B",
      choices: [
        { label: "A", text: "$y=5$" },
        { label: "B", text: "$y=x^2$" },
      ],
      hint: "$x^2\\le4$ on this interval.",
      explanation: "$y=x^2$ is below $y=5$ on $0\\le x\\le2$.",
    },
    {
      id: "between-guided-3",
      prompt: "Choose the correct setup:",
      latex: "y=5, \\quad y=x^2, \\quad 0\\le x\\le2",
      answer: "A",
      choices: [
        { label: "A", text: "$\\int_0^2(5-x^2)\\,dx$" },
        { label: "B", text: "$\\int_0^2(x^2-5)\\,dx$" },
        { label: "C", text: "$\\int_0^2(5+x^2)\\,dx$" },
      ],
      hint: "Use top minus bottom.",
      explanation: "The setup is $\\int_0^2(5-x^2)\\,dx$.",
    },
    {
      id: "between-guided-4",
      prompt: "Evaluate the area:",
      latex: "\\int_0^2(5-x^2)\\,dx",
      answer: "22/3",
      acceptedAnswers: ["7.3333333333", "7.33"],
      hint: "Use $5x-\\frac{x^3}{3}$.",
      explanation:
        "$\\left[5x-\\frac{x^3}{3}\\right]_0^2=10-\\frac{8}{3}=\\frac{22}{3}$.",
    },
  ],

  independentPractice: [
    {
      id: "between-ind-1",
      prompt: "Find the area between the curves:",
      latex: "y=x+4, \\quad y=x^2, \\quad 0\\le x\\le2",
      answer: "22/3",
      acceptedAnswers: ["7.3333333333", "7.33"],
      hint: "Use $\\int_0^2[(x+4)-x^2]\\,dx$.",
      explanation: "The area is $\\frac{22}{3}$ square units.",
    },
    {
      id: "between-ind-2",
      prompt: "Find the area between the parabola and the x-axis:",
      latex: "y=9-x^2, \\quad y=0, \\quad 0\\le x\\le3",
      answer: "18",
      hint: "Use $\\int_0^3(9-x^2)\\,dx$.",
      explanation: "$\\left[9x-\\frac{x^3}{3}\\right]_0^3=27-9=18$.",
    },
    {
      id: "between-ind-3",
      prompt: "Find the area between the curves with given intersection points:",
      latex: "y=4, \\quad y=x^2, \\quad -2\\le x\\le2",
      answer: "32/3",
      acceptedAnswers: ["10.6666666667", "10.67"],
      hint: "$y=4$ is above $y=x^2$ between $-2$ and $2$.",
      explanation:
        "$\\int_{-2}^{2}(4-x^2)\\,dx=\\frac{32}{3}$.",
    },
    {
      id: "between-ind-4",
      prompt: "Which curve is on top?",
      latex: "y=2x+1, \\quad y=x, \\quad 0\\le x\\le3",
      answer: "A",
      choices: [
        { label: "A", text: "$y=2x+1$" },
        { label: "B", text: "$y=x$" },
      ],
      hint: "Compare $2x+1$ and $x$ on the interval.",
      explanation: "$2x+1$ is greater than $x$ on $0\\le x\\le3$.",
    },
    {
      id: "between-ind-5",
      prompt: "Revenue and cost are shown. Find the area between the curves:",
      latex: "R(x)=6x, \\quad C(x)=2x, \\quad 0\\le x\\le5",
      answer: "50",
      hint: "Use $\\int_0^5(R-C)\\,dx$.",
      explanation:
        "$\\int_0^5(6x-2x)\\,dx=\\int_0^5 4x\\,dx=50$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Subtracting bottom minus top.",
      fix: "Set up the integral as top function minus bottom function.",
    },
    {
      mistake: "Forgetting to find or use the correct bounds.",
      fix: "Use given bounds or solve intersections to find the limits.",
    },
    {
      mistake: "Giving a negative area.",
      fix: "Area should be non-negative. A negative result usually means the subtraction order is reversed.",
    },
    {
      mistake: "Not splitting when curves cross.",
      fix: "If the top curve changes, split the interval at the intersection point.",
    },
  ],

  masteryQuiz: [
    {
      id: "between-mastery-1",
      prompt: "Choose the correct area setup.",
      latex: "\\text{top}=f(x), \\quad \\text{bottom}=g(x)",
      answer: "A",
      choices: [
        { label: "A", text: "$\\int_a^b(f(x)-g(x))\\,dx$" },
        { label: "B", text: "$\\int_a^b(g(x)-f(x))\\,dx$" },
        { label: "C", text: "$\\int_a^b(f(x)+g(x))\\,dx$" },
      ],
      hint: "Use top minus bottom.",
      explanation: "Area between curves is top minus bottom.",
    },
    {
      id: "between-mastery-2",
      prompt: "Which curve is on top?",
      latex: "y=4, \\quad y=x^2, \\quad 0\\le x\\le2",
      answer: "A",
      choices: [
        { label: "A", text: "$y=4$" },
        { label: "B", text: "$y=x^2$" },
      ],
      hint: "$x^2\\le4$ on this interval.",
      explanation: "$y=4$ is on top.",
    },
    {
      id: "between-mastery-3",
      prompt: "Choose the correct setup:",
      latex: "y=4, \\quad y=x^2, \\quad 0\\le x\\le2",
      answer: "B",
      choices: [
        { label: "A", text: "$\\int_0^2(x^2-4)\\,dx$" },
        { label: "B", text: "$\\int_0^2(4-x^2)\\,dx$" },
        { label: "C", text: "$\\int_0^2(4+x^2)\\,dx$" },
      ],
      hint: "Use top minus bottom.",
      explanation: "The setup is $\\int_0^2(4-x^2)\\,dx$.",
    },
    {
      id: "between-mastery-4",
      prompt: "Calculate the area:",
      latex: "\\int_0^2(4-x^2)\\,dx",
      answer: "16/3",
      acceptedAnswers: ["5.3333333333", "5.33"],
      hint: "Use $4x-\\frac{x^3}{3}$.",
      explanation: "$\\left[4x-\\frac{x^3}{3}\\right]_0^2=\\frac{16}{3}$.",
    },
    {
      id: "between-mastery-5",
      prompt: "Calculate the area:",
      latex: "\\int_0^3(6-2x)\\,dx",
      answer: "9",
      hint: "Use $6x-x^2$.",
      explanation: "$[6x-x^2]_0^3=18-9=9$.",
    },
    {
      id: "between-mastery-6",
      prompt: "Calculate the area:",
      latex: "\\int_1^3(5-x)\\,dx",
      answer: "6",
      hint: "Use $5x-\\frac{x^2}{2}$.",
      explanation:
        "$\\left[5x-\\frac{x^2}{2}\\right]_1^3=\\frac{21}{2}-\\frac{9}{2}=6$.",
    },
    {
      id: "between-mastery-7",
      prompt: "Find the intersection x-values:",
      latex: "x^2=4",
      answer: "A",
      acceptedAnswers: ["-2,2", "2,-2"],
      choices: [
        { label: "A", text: "$x=-2,2$" },
        { label: "B", text: "$x=4$" },
        { label: "C", text: "$x=-4,4$" },
      ],
      hint: "Solve $x^2=4$.",
      explanation: "$x=-2$ and $x=2$.",
    },
    {
      id: "between-mastery-8",
      prompt: "If two curves cross inside the interval, what may be needed?",
      latex: "\\text{area between curves}",
      answer: "B",
      choices: [
        { label: "A", text: "ignore the crossing" },
        { label: "B", text: "split the interval" },
        { label: "C", text: "make the area negative" },
      ],
      hint: "Top and bottom may swap.",
      explanation: "If curves cross and swap order, split the interval.",
    },
    {
      id: "between-mastery-9",
      prompt: "Transfer: find the area between revenue and cost.",
      latex: "R(x)=5x, \\quad C(x)=3x, \\quad 0\\le x\\le4",
      answer: "16",
      hint: "Use $\\int_0^4(R-C)\\,dx$.",
      explanation: "$\\int_0^4(2x)\\,dx=16$.",
    },
    {
      id: "between-mastery-10",
      prompt: "Choose the best exam plan for area between two curves.",
      latex: "\\text{area between curves}",
      answer: "C",
      choices: [
        { label: "A", text: "always subtract the first function listed" },
        { label: "B", text: "differentiate both curves" },
        { label: "C", text: "identify top and bottom, then integrate top minus bottom" },
      ],
      hint: "Area comes from vertical distance.",
      explanation:
        "The reliable plan is to identify top and bottom, then integrate top minus bottom.",
    },
  ],

  masteryPassMark: 0.8,
};

export const applicationsTotalChangeMotionLesson: ExplicitLesson = {
  id: "applications-total-change-motion",
  slug: "applications-total-change-motion",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Applications of Integration: Total Change and Motion",
  description:
    "Use definite integrals to calculate total change, displacement, and contextual quantities from rates.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Applications of Integration: Total Change and Motion",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use integration to find total change and motion quantities from rates.",

  successCriteria: [
    "Explain that integrating a rate over an interval gives net change.",
    "Set up a definite integral from a contextual rate function.",
    "Use velocity integrals to find displacement.",
    "Distinguish displacement from total distance when velocity changes sign.",
    "Include appropriate units in contextual answers.",
  ],

  teaching: {
    paragraphs: [
      "A definite integral can represent total change. If a rate of change is given, integrating that rate over an interval gives the net change in the original quantity.",
      "In motion, integrating velocity gives displacement. Displacement can be positive, negative, or zero.",
      "Total distance is not always the same as displacement. If velocity changes sign, total distance requires splitting the interval and adding absolute values.",
      "Units matter. If velocity is measured in metres per second and time is measured in seconds, displacement is measured in metres.",
      "In contextual questions, finish with a sentence that answers the question with units.",
    ],
    latexBlocks: [
      "\\text{net change}=\\int_a^b \\text{rate}\\,dt",
      "\\text{displacement}=\\int_a^b v(t)\\,dt",
      "\\text{distance}=\\int_a^b |v(t)|\\,dt",
      "\\text{rate units}\\times\\text{input units}=\\text{quantity units}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Displacement from velocity",
      questionLatex:
        "v(t)=3t^2-4t\\text{ m/s}. \\quad \\text{Find the displacement from }t=0\\text{ to }t=2.",
      steps: [
        {
          explanation: "Displacement is the integral of velocity.",
          latex: "\\int_0^2 (3t^2-4t)\\,dt",
        },
        {
          explanation: "Find an antiderivative.",
          latex: "\\int (3t^2-4t)\\,dt=t^3-2t^2",
        },
        {
          explanation: "Evaluate between 0 and 2.",
          latex: "\\left[t^3-2t^2\\right]_0^2=(8-8)-0=0",
        },
      ],
      finalAnswerLatex: "0\\text{ metres}",
    },
    {
      title: "Worked example 2: Total amount from a rate",
      questionLatex:
        "R(t)=2t+5\\text{ litres per minute}. \\quad \\text{Find the total amount of water added from }t=0\\text{ to }t=4.",
      steps: [
        {
          explanation: "Integrate the flow rate over the time interval.",
          latex: "\\int_0^4 (2t+5)\\,dt",
        },
        {
          explanation: "Find an antiderivative and evaluate.",
          latex: "\\left[t^2+5t\\right]_0^4=16+20=36",
        },
        {
          explanation: "Use quantity units.",
          latex: "36\\text{ litres}",
        },
      ],
      finalAnswerLatex: "36\\text{ litres}",
    },
  ],

  guidedPractice: [
    {
      id: "apps-guided-1",
      prompt: "Identify the rate function:",
      latex: "R(t)=3t+2\\text{ litres per minute}",
      answer: "R(t)",
      acceptedAnswers: ["3t+2"],
      hint: "The rate function is the expression being integrated.",
      explanation: "The rate function is $R(t)=3t+2$.",
    },
    {
      id: "apps-guided-2",
      prompt: "Identify the interval:",
      latex: "\\text{from }t=1\\text{ to }t=5",
      answer: "1 to 5",
      acceptedAnswers: ["1,5", "[1,5]"],
      hint: "Use the starting and ending t-values.",
      explanation: "The interval is from $t=1$ to $t=5$.",
    },
    {
      id: "apps-guided-3",
      prompt: "Choose the correct setup for net change:",
      latex: "R(t)=3t+2, \\quad 1\\le t\\le5",
      answer: "B",
      choices: [
        { label: "A", text: "$\\int_5^1(3t+2)\\,dt$" },
        { label: "B", text: "$\\int_1^5(3t+2)\\,dt$" },
        { label: "C", text: "$\\int_1^5(3t-2)\\,dt$" },
      ],
      hint: "Use lower bound 1 and upper bound 5.",
      explanation: "The correct setup is $\\int_1^5(3t+2)\\,dt$.",
    },
    {
      id: "apps-guided-4",
      prompt: "Evaluate the net change:",
      latex: "\\int_0^3 4t\\,dt",
      answer: "18",
      hint: "Use $2t^2$.",
      explanation: "$\\int_0^3 4t\\,dt=[2t^2]_0^3=18$.",
    },
  ],

  independentPractice: [
    {
      id: "apps-ind-1",
      prompt: "Find the displacement:",
      latex: "v(t)=2t+1, \\quad 0\\le t\\le3",
      answer: "12",
      hint: "Evaluate $\\int_0^3(2t+1)\\,dt$.",
      explanation: "$[t^2+t]_0^3=12$, so the displacement is 12 units.",
    },
    {
      id: "apps-ind-2",
      prompt: "Find the total change:",
      latex: "Q'(t)=6t, \\quad 1\\le t\\le4",
      answer: "45",
      hint: "Evaluate $\\int_1^4 6t\\,dt$.",
      explanation: "$[3t^2]_1^4=48-3=45$.",
    },
    {
      id: "apps-ind-3",
      prompt: "Find the amount of water added:",
      latex: "R(t)=t+4\\text{ L/min}, \\quad 0\\le t\\le6",
      answer: "42",
      acceptedAnswers: ["42 litres", "42 L"],
      hint: "Integrate the flow rate.",
      explanation: "$\\int_0^6(t+4)\\,dt=18+24=42$ litres.",
    },
    {
      id: "apps-ind-4",
      prompt: "A population changes at this rate. Find the increase:",
      latex: "P'(t)=10t+20\\text{ people/year}, \\quad 0\\le t\\le2",
      answer: "60",
      acceptedAnswers: ["60 people"],
      hint: "Integrate from 0 to 2.",
      explanation: "$\\int_0^2(10t+20)\\,dt=20+40=60$ people.",
    },
    {
      id: "apps-ind-5",
      prompt: "Choose the correct statement when velocity changes sign.",
      latex: "\\text{motion over an interval}",
      answer: "B",
      choices: [
        { label: "A", text: "displacement and total distance are always equal" },
        { label: "B", text: "total distance needs absolute values or splitting" },
        { label: "C", text: "displacement cannot be zero" },
      ],
      hint: "Direction changes matter for distance.",
      explanation:
        "When velocity changes sign, total distance requires splitting and adding absolute values.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Confusing rate with total amount.",
      fix: "A rate must be integrated over an interval to find total change.",
    },
    {
      mistake: "Forgetting units.",
      fix: "Use the original quantity units, such as metres, litres, dollars, or people.",
    },
    {
      mistake: "Treating displacement and total distance as always the same.",
      fix: "Displacement is signed. Total distance counts all movement positively.",
    },
    {
      mistake: "Not splitting when velocity changes sign and total distance is required.",
      fix: "Split at zeros of velocity, then add absolute values of each displacement piece.",
    },
  ],

  masteryQuiz: [
    {
      id: "apps-mastery-1",
      prompt: "Identify the rate function:",
      latex: "v(t)=5t-1\\text{ m/s}",
      answer: "A",
      choices: [
        { label: "A", text: "$v(t)$" },
        { label: "B", text: "$t$" },
        { label: "C", text: "$5$" },
      ],
      hint: "Velocity is the rate function in motion.",
      explanation: "$v(t)$ is the rate function.",
    },
    {
      id: "apps-mastery-2",
      prompt: "Identify the interval:",
      latex: "0\\le t\\le4",
      answer: "0 to 4",
      acceptedAnswers: ["0,4", "[0,4]"],
      hint: "Use the lower and upper t-values.",
      explanation: "The interval is from $0$ to $4$.",
    },
    {
      id: "apps-mastery-3",
      prompt: "Choose the units for displacement:",
      latex: "v(t)\\text{ is metres per second, }t\\text{ is seconds}",
      answer: "A",
      acceptedAnswers: ["metres", "meters", "m"],
      choices: [
        { label: "A", text: "metres" },
        { label: "B", text: "metres per second" },
        { label: "C", text: "seconds" },
      ],
      hint: "Rate multiplied by time gives quantity units.",
      explanation: "Displacement is measured in metres.",
    },
    {
      id: "apps-mastery-4",
      prompt: "Find the displacement:",
      latex: "\\int_0^2 (3t^2-4t)\\,dt",
      answer: "0",
      hint: "Use $t^3-2t^2$.",
      explanation: "$[t^3-2t^2]_0^2=0$.",
    },
    {
      id: "apps-mastery-5",
      prompt: "Find the total amount added:",
      latex: "\\int_0^4 (2t+5)\\,dt",
      answer: "36",
      hint: "Use $t^2+5t$.",
      explanation: "$[t^2+5t]_0^4=36$.",
    },
    {
      id: "apps-mastery-6",
      prompt: "Find the net change:",
      latex: "\\int_1^3 6t\\,dt",
      answer: "24",
      hint: "Use $3t^2$.",
      explanation: "$[3t^2]_1^3=27-3=24$.",
    },
    {
      id: "apps-mastery-7",
      prompt: "A net change integral is negative. Choose the best interpretation.",
      latex: "\\int_a^b R(t)\\,dt<0",
      answer: "B",
      choices: [
        { label: "A", text: "the quantity increased" },
        { label: "B", text: "the quantity decreased overall" },
        { label: "C", text: "the calculation is impossible" },
      ],
      hint: "Negative net change means decrease.",
      explanation: "A negative net change means the original quantity decreased overall.",
    },
    {
      id: "apps-mastery-8",
      prompt: "Choose the correct unit for total water added:",
      latex: "R(t)\\text{ is litres per minute, }t\\text{ is minutes}",
      answer: "C",
      acceptedAnswers: ["litres", "liters", "L"],
      choices: [
        { label: "A", text: "litres per minute" },
        { label: "B", text: "minutes" },
        { label: "C", text: "litres" },
      ],
      hint: "Integrating a rate gives an amount.",
      explanation: "The amount of water is measured in litres.",
    },
    {
      id: "apps-mastery-9",
      prompt: "A cost rate is given. Find the total cost change:",
      latex: "C'(x)=4x+10, \\quad 0\\le x\\le5",
      answer: "100",
      hint: "Integrate $4x+10$ from 0 to 5.",
      explanation: "$\\int_0^5(4x+10)\\,dx=50+50=100$.",
    },
    {
      id: "apps-mastery-10",
      prompt: "Choose the best plan for total distance when velocity changes sign.",
      latex: "v(t)=0\\text{ inside the interval}",
      answer: "A",
      choices: [
        { label: "A", text: "split at zeros of velocity and add absolute values" },
        { label: "B", text: "use one integral and keep the sign" },
        { label: "C", text: "ignore the sign change" },
      ],
      hint: "Distance counts movement positively.",
      explanation:
        "For total distance, split where velocity is zero and add absolute values.",
    },
  ],

  masteryPassMark: 0.8,
};

export const mixedIntegralCalculusExamPracticeLesson: ExplicitLesson = {
  id: "mixed-integral-calculus-exam-practice",
  slug: "mixed-integral-calculus-exam-practice",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Mixed Integral Calculus Exam Practice",
  description:
    "Practise mixed HSC-style integration questions involving primitives, definite integrals, area, approximation, and applications.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",

  video: {
    title: "Mixed Integral Calculus Exam Practice",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to choose and combine integration methods in exam-style questions.",

  successCriteria: [
    "Identify whether a question needs an antiderivative, particular primitive, definite integral, area, approximation, or application.",
    "Choose the correct setup before calculating.",
    "Use $+C$ only when an indefinite integral or primitive is required.",
    "Use splitting or absolute values when total area or total distance requires it.",
    "Answer contextual questions with appropriate units.",
  ],

  teaching: {
    paragraphs: [
      "Exam questions often combine multiple integration skills. The first step is deciding what type of question you are dealing with.",
      "A question may ask for an antiderivative, a particular primitive, a definite integral, signed area, total area, a Trapezoidal approximation, area between curves, or total change from a rate.",
      "Transfer means applying familiar tools in unfamiliar wording. Look for clues such as $+C$, initial conditions, bounds, area, approximation, velocity, or rate of change.",
      "Use $+C$ for indefinite integrals and general primitives. Do not use $+C$ for a final definite integral value.",
      "Include units and context when the question is worded.",
    ],
    latexBlocks: [
      "\\int f(x)\\,dx=F(x)+C",
      "\\int_a^b f(x)\\,dx=F(b)-F(a)",
      "\\text{total area}=\\sum |\\text{signed pieces}|",
      "T=\\frac{h}{2}\\left[y_0+2(y_1+\\cdots+y_{n-1})+y_n\\right]",
      "\\text{net change}=\\int_a^b \\text{rate}\\,dt",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Particular primitive",
      questionLatex:
        "f'(x)=4x-3, \\quad f(2)=7. \\quad \\text{Find }f(x).",
      steps: [
        {
          explanation: "Integrate and include $+C$.",
          latex: "f(x)=2x^2-3x+C",
        },
        {
          explanation: "Use the initial condition.",
          latex: "7=2(2)^2-3(2)+C",
        },
        {
          explanation: "Solve for $C$ and write the function.",
          latex: "7=2+C \\Rightarrow C=5, \\quad f(x)=2x^2-3x+5",
        },
      ],
      finalAnswerLatex: "f(x)=2x^2-3x+5",
    },
    {
      title: "Worked example 2: Total area",
      questionLatex:
        "\\text{Find the total area between }y=x-2\\text{ and the }x\\text{-axis from }x=0\\text{ to }x=4.",
      steps: [
        {
          explanation: "Split where the graph crosses the x-axis.",
          latex: "x-2=0 \\Rightarrow x=2",
        },
        {
          explanation: "Find the signed pieces.",
          latex:
            "\\int_0^2(x-2)\\,dx=-2, \\quad \\int_2^4(x-2)\\,dx=2",
        },
        {
          explanation: "Add absolute values.",
          latex: "|-2|+|2|=4",
        },
      ],
      finalAnswerLatex: "4\\text{ square units}",
    },
    {
      title: "Worked example 3: Total change",
      questionLatex:
        "P'(t)=6t+10\\text{ people per year}. \\quad \\text{Find the increase from }t=0\\text{ to }t=5.",
      steps: [
        {
          explanation: "Integrate the rate of change.",
          latex: "\\int_0^5(6t+10)\\,dt",
        },
        {
          explanation: "Evaluate the definite integral.",
          latex: "\\left[3t^2+10t\\right]_0^5=75+50=125",
        },
      ],
      finalAnswerLatex: "125\\text{ people}",
    },
  ],

  guidedPractice: [
    {
      id: "mixed-int-guided-1",
      prompt: "Identify the integration skill needed:",
      latex: "\\text{A question gives }f'(x)\\text{ and }f(1).",
      answer: "B",
      choices: [
        { label: "A", text: "Trapezoidal rule" },
        { label: "B", text: "particular primitive" },
        { label: "C", text: "area between curves" },
      ],
      hint: "A condition is used to find $C$.",
      explanation: "This is a particular primitive question.",
    },
    {
      id: "mixed-int-guided-2",
      prompt: "Choose the correct setup:",
      latex: "\\text{Area under }y=x^2\\text{ from }x=0\\text{ to }x=3",
      answer: "A",
      choices: [
        { label: "A", text: "$\\int_0^3x^2\\,dx$" },
        { label: "B", text: "$\\int x^2\\,dx+C$" },
        { label: "C", text: "$\\int_3^0x^2\\,dx$" },
      ],
      hint: "Use a definite integral with the given bounds.",
      explanation: "The setup is $\\int_0^3x^2\\,dx$.",
    },
    {
      id: "mixed-int-guided-3",
      prompt: "Calculate the result:",
      latex: "\\int_0^3 x^2\\,dx",
      answer: "9",
      hint: "Use $\\frac{x^3}{3}$.",
      explanation: "$\\int_0^3x^2\\,dx=9$.",
    },
    {
      id: "mixed-int-guided-4",
      prompt: "Should the final answer include $+C$?",
      latex: "\\int_0^3x^2\\,dx",
      answer: "B",
      acceptedAnswers: ["no"],
      choices: [
        { label: "A", text: "yes" },
        { label: "B", text: "no" },
      ],
      hint: "This is a definite integral.",
      explanation: "A definite integral gives a number, so the final answer does not include $+C$.",
    },
  ],

  independentPractice: [
    {
      id: "mixed-int-ind-1",
      prompt: "Find the particular primitive:",
      latex: "f'(x)=6x, \\quad f(1)=5",
      answer: "3x^2+2",
      acceptedAnswers: ["f(x)=3x^2+2", "3x^2 + 2"],
      hint: "Integrate, then use the condition.",
      explanation: "$f(x)=3x^2+C$. Since $5=3+C$, $C=2$.",
    },
    {
      id: "mixed-int-ind-2",
      prompt: "Evaluate:",
      latex: "\\int_1^3 2x\\,dx",
      answer: "8",
      hint: "Use $x^2$.",
      explanation: "$[x^2]_1^3=8$.",
    },
    {
      id: "mixed-int-ind-3",
      prompt: "Find the total area:",
      latex: "y=x-1, \\quad 0\\le x\\le2",
      answer: "1",
      hint: "Split at $x=1$.",
      explanation:
        "$\\int_0^1(x-1)\\,dx=-\\frac{1}{2}$ and $\\int_1^2(x-1)\\,dx=\\frac{1}{2}$, so total area is $1$.",
    },
    {
      id: "mixed-int-ind-4",
      prompt: "Use the Trapezoidal rule:",
      latex: "h=1, \\quad y\\text{-values: }2,4,8",
      answer: "9",
      hint: "Use $\\frac{1}{2}[2+2(4)+8]$.",
      explanation: "$T=9$.",
      trapezoidalRuleDiagram: {
        description:
          "Three function values 2, 4 and 8 plotted at x = 0, 1, 2 with two trapezoidal strips of width 1.",
        xValues: [0, 1, 2],
        yValues: [2, 4, 8],
      },
    },
    {
      id: "mixed-int-ind-5",
      prompt: "Find the total change:",
      latex: "R(t)=2t+3, \\quad 0\\le t\\le4",
      answer: "28",
      hint: "Evaluate $\\int_0^4(2t+3)\\,dt$.",
      explanation: "$[t^2+3t]_0^4=16+12=28$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using +C in a definite integral.",
      fix: "Use $+C$ for indefinite integrals, but final definite integral values are numbers.",
    },
    {
      mistake: "Forgetting +C in an indefinite integral.",
      fix: "Include $+C$ when finding a general primitive.",
    },
    {
      mistake: "Not splitting total area problems.",
      fix: "If the graph crosses the x-axis, split and add absolute values.",
    },
    {
      mistake: "Choosing the wrong integration method for the wording.",
      fix: "Pause first: identify whether the question asks for a primitive, definite integral, area, approximation, or total change.",
    },
  ],

  masteryQuiz: [
    {
      id: "mixed-int-mastery-1",
      prompt: "Choose the method when a derivative and a condition such as $f(3)=12$ are given.",
      latex: "f'(x)=2x",
      answer: "B",
      choices: [
        { label: "A", text: "definite integral only" },
        { label: "B", text: "particular primitive" },
        { label: "C", text: "Trapezoidal rule" },
      ],
      hint: "Use the condition to find $C$.",
      explanation: "This asks for a particular primitive.",
    },
    {
      id: "mixed-int-mastery-2",
      prompt: "Choose the setup for total change:",
      latex: "Q'(t)=5t, \\quad 0\\le t\\le2",
      answer: "A",
      choices: [
        { label: "A", text: "$\\int_0^2 5t\\,dt$" },
        { label: "B", text: "$\\int 5t\\,dt+C$" },
        { label: "C", text: "$\\int_2^0 5t\\,dt$" },
      ],
      hint: "Use the rate and the interval.",
      explanation: "The setup is $\\int_0^2 5t\\,dt$.",
    },
    {
      id: "mixed-int-mastery-3",
      prompt: "Choose the setup for area between curves:",
      latex: "\\text{top}=x+3, \\quad \\text{bottom}=x, \\quad 0\\le x\\le2",
      answer: "C",
      choices: [
        { label: "A", text: "$\\int_0^2(x-(x+3))\\,dx$" },
        { label: "B", text: "$\\int_0^2(2x+3)\\,dx$" },
        { label: "C", text: "$\\int_0^2((x+3)-x)\\,dx$" },
      ],
      hint: "Top minus bottom.",
      explanation: "Use $\\int_0^2((x+3)-x)\\,dx$.",
    },
    {
      id: "mixed-int-mastery-4",
      prompt: "Find the primitive:",
      latex: "\\int (4x-3)\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$2x^2-3x+C$" },
        { label: "B", text: "$4x^2-3+C$" },
        { label: "C", text: "$4-3+C$" },
      ],
      hint: "This is an indefinite integral.",
      explanation: "$\\int(4x-3)\\,dx=2x^2-3x+C$.",
    },
    {
      id: "mixed-int-mastery-5",
      prompt: "Evaluate:",
      latex: "\\int_0^2(3x^2+1)\\,dx",
      answer: "10",
      hint: "Use $x^3+x$.",
      explanation: "$[x^3+x]_0^2=10$.",
    },
    {
      id: "mixed-int-mastery-6",
      prompt: "Find the particular primitive with $f(2)=7$.",
      latex: "f'(x)=4x-3",
      answer: "C",
      choices: [
        { label: "A", text: "$f(x)=4x-3$" },
        { label: "B", text: "$f(x)=2x^2-3x+C$" },
        { label: "C", text: "$f(x)=2x^2-3x+5$" },
      ],
      hint: "This is the same structure as the worked example.",
      explanation: "$f(x)=2x^2-3x+C$ and $C=5$.",
    },
    {
      id: "mixed-int-mastery-7",
      prompt: "Find the total area:",
      latex: "y=x-2, \\quad 0\\le x\\le4",
      answer: "4",
      hint: "Split at $x=2$.",
      explanation: "The signed pieces are $-2$ and $2$, so total area is $4$.",
    },
    {
      id: "mixed-int-mastery-8",
      prompt: "Use the Trapezoidal rule:",
      latex: "h=2, \\quad y\\text{-values: }1,3,5",
      answer: "12",
      hint: "Use $\\frac{2}{2}[1+2(3)+5]$.",
      explanation: "$T=12$.",
    },
    {
      id: "mixed-int-mastery-9",
      prompt: "A population changes at rate $P'(t)=6t+10$. Find the increase from $t=0$ to $t=5$.",
      latex: "P'(t)=6t+10",
      answer: "125",
      acceptedAnswers: ["125 people"],
      hint: "Integrate from 0 to 5.",
      explanation: "$\\int_0^5(6t+10)\\,dt=125$.",
    },
    {
      id: "mixed-int-mastery-10",
      prompt: "Choose the best first step in a mixed integration question.",
      latex: "\\text{mixed exam practice}",
      answer: "B",
      choices: [
        { label: "A", text: "differentiate immediately" },
        { label: "B", text: "identify the integration skill needed" },
        { label: "C", text: "always use the Trapezoidal rule" },
      ],
      hint: "The wording tells you the method.",
      explanation:
        "In mixed questions, first identify whether the question needs a primitive, definite integral, area method, approximation, or application.",
    },
  ],

  masteryPassMark: 0.8,
};

function masteryChoice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Choose the option that matches the integration meaning."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    hint,
    explanation,
  };
}

function masteryTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  hint = "Set up the integral carefully, then calculate."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint,
    explanation: `The answer is ${answer}.`,
  };
}

antidifferentiationReversePowerRuleLesson.masteryQuiz = [
  masteryChoice("anti-mastery-1", "Find an antiderivative using the reverse power rule.", "\\int 12x^3\\,dx", "A", ["$3x^4$", "$36x^2$", "$12x^4$", "$4x^3$"], "Increase the power to 4 and divide 12 by 4."),
  masteryChoice("anti-mastery-2", "Find an antiderivative of the polynomial term.", "\\int -15x^4\\,dx", "B", ["$-60x^3$", "$-3x^5$", "$3x^5$", "$-15x^5$"], "Increase the power to 5 and divide -15 by 5."),
  masteryChoice("anti-mastery-3", "Which integral is excluded from the reverse power rule in this lesson?", "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1},\\ n\\ne -1", "C", ["$\\int x^3\\,dx$", "$\\int x^{-2}\\,dx$", "$\\int x^{-1}\\,dx$", "$\\int 7\\,dx$"], "The rule excludes $n=-1$ because it would require division by zero."),
  masteryChoice("anti-mastery-4", "Use the given derivative to find a possible original function.", "f'(x)=8x^3-6x", "C", ["$24x^2-6$", "$8x^4-6x^2$", "$2x^4-3x^2$", "$2x^4-6x^2$"], "Antidifferentiate each term: $8x^3$ gives $2x^4$ and $-6x$ gives $-3x^2$."),
  masteryChoice("anti-mastery-5", "Which antiderivative differentiates back to the displayed expression?", "9x^2-4", "B", ["$18x-4$", "$3x^3-4x$", "$9x^3-4x$", "$3x^3-4$"], "Differentiate $3x^3-4x$ to get $9x^2-4$."),
  masteryTyped("anti-mastery-6", "Find the missing coefficient in the antiderivative.", "\\int ax^5\\,dx=4x^6", "24", ["a=24"], "Differentiate 4x^6 to recover ax^5."),
  masteryChoice("anti-mastery-7", "A student writes the displayed integral with the shown incorrect result. What is the mistake?", "\\int 10x^4\\,dx=50x^5", "A", ["They multiplied by the new power instead of dividing", "They forgot the old power was 4", "They used a definite integral", "They excluded $x^{-1}$"], "The coefficient should be 10 divided by 5."),
  masteryChoice("anti-mastery-8", "Which derivative check confirms the proposed antiderivative?", "F(x)=-2x^4", "D", ["$F'(x)=-2x^3$", "$F'(x)=-8x^4$", "$F'(x)=8x^3$", "$F'(x)=-8x^3$"], "Differentiate the proposed antiderivative."),
  masteryChoice("anti-mastery-9", "A displacement function has the displayed derivative. Find a possible displacement function.", "s'(t)=6t^2-4t", "D", ["$12t-4$", "$6t^3-4t^2$", "$2t^3-4t^2$", "$2t^3-2t^2$"], "Reverse the power rule term-by-term."),
  masteryChoice("anti-mastery-10", "Which expression is the best first antiderivative step before using any condition?", "f'(x)=4x^3-2x+7", "B", ["$f(x)=12x^2-2$", "$f(x)=x^4-x^2+7x+C$", "$f(x)=4x^4-2x^2+7+C$", "$f(x)=x^4-x+C$"], "Integrate each term and include a constant before using conditions."),
];

indefiniteIntegralsConstantOfIntegrationLesson.masteryQuiz = [
  masteryChoice("indef-mastery-1", "Why must an indefinite integral include +C?", "\\int f(x)\\,dx=F(x)+C", "B", ["Powers of x disappear", "Constants differentiate to zero", "Definite integrals need units", "The upper bound is missing"], "+C represents the family of primitives."),
  masteryChoice("indef-mastery-2", "Find the indefinite integral.", "\\int (6x^2-4x+5)\\,dx", "A", ["$2x^3-2x^2+5x+C$", "$18x-4+C$", "$2x^3-4x^2+5+C$", "$6x^3-2x^2+5x+C$"], "Integrate every term and include one constant of integration."),
  masteryChoice("indef-mastery-3", "Integrate the constant term correctly.", "\\int -7\\,dx", "B", ["$-7+C$", "$-7x+C$", "$7x+C$", "$0+C$"], "A constant integrates to a linear term, and indefinite integrals include $+C$."),
  masteryChoice("indef-mastery-4", "Find the family of primitives.", "\\int (8x^3+3x^2-2)\\,dx", "C", ["$24x^2+6x+C$", "$2x^4+x^3-2+C$", "$2x^4+x^3-2x+C$", "$8x^4+3x^3-2x+C$"], "The constant term $-2$ integrates to $-2x$, and $+C$ is needed."),
  masteryChoice("indef-mastery-5", "Which answer correctly integrates every term?", "\\int (4x^3-6x+9)\\,dx", "C", ["$x^4-3x^2+C$", "$16x^2-6+C$", "$x^4-3x^2+9x+C$", "$4x^4-6x^2+9+C$"], "The constant 9 integrates to 9x and +C is needed."),
  masteryChoice("indef-mastery-6", "Find the general primitive for the displayed derivative.", "F'(x)=10x^4-12x", "D", ["$40x^3-12+C$", "$10x^5-12x^2+C$", "$2x^5-12x^2+C$", "$2x^5-6x^2+C$"], "Reverse the power rule for both terms and include $+C$."),
  masteryChoice("indef-mastery-7", "A student writes the displayed integral with the shown incorrect result. What is wrong?", "\\int (3x^2+5)\\,dx=x^3+5+C", "A", ["The constant 5 should integrate to $5x$", "The $x^2$ term should stay $x^2$", "The $+C$ should be removed", "The answer should be definite"], "A constant term becomes a linear term when integrated."),
  masteryChoice("indef-mastery-8", "Which derivative check is correct for the displayed primitive?", "F(x)=x^4-2x^2+5x+C", "D", ["$F'(x)=4x^3-4x+5+C$", "$F'(x)=x^3-2x+5$", "$F'(x)=4x^3-2x+5$", "$F'(x)=4x^3-4x+5$"], "The derivative of $C$ is zero."),
  masteryChoice("indef-mastery-9", "A rate of change is given. Write the general accumulated quantity.", "Q'(t)=3t^2-4t+6", "A", ["$Q(t)=t^3-2t^2+6t+C$", "$Q(t)=6t-4+C$", "$Q(t)=3t^3-4t^2+6t+C$", "$Q(t)=t^3-4t^2+6+C$"], "Accumulated quantity comes from integrating the rate term-by-term."),
  masteryChoice("indef-mastery-10", "Which response best separates indefinite and definite integrals?", "\\int f(x)\\,dx\\quad \\text{vs}\\quad \\int_a^b f(x)\\,dx", "B", ["Both final answers must include +C", "Only the indefinite integral has +C", "Only the definite integral has +C", "Neither can be checked by differentiating"], "The definite integral evaluates to a number; the indefinite integral gives a family."),
];

initialConditionsParticularPrimitiveLesson.masteryQuiz = [
  masteryChoice("initial-mastery-1", "Find the general primitive before using the condition.", "f'(x)=6x-4", "A", ["$f(x)=3x^2-4x+C$", "$f(x)=6x^2-4+C$", "$f(x)=6-4x+C$", "$f(x)=3x^2-4x$"], "Integrate first and keep the constant of integration before using the condition."),
  masteryTyped("initial-mastery-2", "Solve for C after substituting the condition.", "f(x)=3x^2-4x+C,\\quad f(2)=9", "5", ["C=5"]),
  masteryChoice("initial-mastery-3", "Which is the correct first substitution step?", "f'(x)=4x+1,\\quad f(3)=20", "C", ["$20=4(3)+1$", "$C=3$", "$20=2(3)^2+3+C$", "$20=4x+1+C$"], "Integrate first, then substitute into $f(x)$."),
  masteryChoice("initial-mastery-4", "Find the particular primitive.", "f'(x)=4x-3,\\quad f(2)=7", "B", ["$f(x)=4x^2-3x+5$", "$f(x)=2x^2-3x+5$", "$f(x)=2x^2-3x+C$", "$f(x)=4x-3$"], "Integrate to $2x^2-3x+C$, then use $f(2)=7$ to get $C=5$."),
  masteryChoice("initial-mastery-5", "Find the particular primitive using the derivative and condition.", "\\frac{dy}{dx}=3x^2-2x,\\quad y(1)=4", "C", ["$y=6x-2$", "$y=x^3-x^2+C$", "$y=x^3-x^2+4$", "$y=3x^3-x^2+4$"], "Integrate to $y=x^3-x^2+C$, then substitute $y(1)=4$ to get $C=4$."),
  masteryChoice("initial-mastery-6", "A velocity function and initial displacement are given. Find the displacement function.", "s'(t)=6t+2,\\quad s(0)=5", "D", ["$s(t)=6t+2$", "$s(t)=6t^2+2t+5$", "$s(t)=3t^2+2t+C$", "$s(t)=3t^2+2t+5$"], "Integrate velocity, then use $s(0)=5$ to find the constant."),
  masteryChoice("initial-mastery-7", "A student substitutes the condition into the derivative before integrating. What is the issue?", "f'(x)=4x-3,\\quad f(2)=7", "A", ["The condition belongs in the primitive, not the derivative", "The derivative must include $+C$ first", "The x-value should be ignored", "The upper bound is missing"], "Initial conditions are applied after integrating."),
  masteryChoice("initial-mastery-8", "Which result is impossible as a final answer when asked for a particular primitive?", "\\text{particular primitive}", "D", ["$f(x)=x^2+3$", "$y=2x^3-x+1$", "$s(t)=3t^2+2t+5$", "$C=4$ only"], "A particular primitive must be the full function, not just $C$."),
  masteryChoice("initial-mastery-9", "Use the rate of change and condition to find the quantity function.", "Q'(t)=2t+8,\\quad Q(3)=30", "A", ["$Q(t)=t^2+8t-3$", "$Q(t)=2t^2+8t-3$", "$Q(t)=t^2+8t+C$", "$Q(t)=2t+8$"], "Integrate to $Q(t)=t^2+8t+C$, then use $Q(3)=30$ to get $C=-3$."),
  masteryChoice("initial-mastery-10", "A derivative and condition are given with an unknown input value. What extra information is still needed?", "f'(x)=6x,\\quad f(a)=20", "B", ["The derivative rule", "The value of $a$", "The coefficient of $x$", "The pass mark"], "A numerical x-value is needed to solve for $C$."),
];

definiteIntegralsFundamentalTheoremLesson.masteryQuiz = [
  masteryTyped("definite-mastery-1", "Identify the upper bound.", "\\int_{-1}^{4} f(x)\\,dx", "4", ["x=4", "upper bound 4"]),
  masteryChoice("definite-mastery-2", "Choose the Fundamental Theorem setup.", "F'(x)=f(x)", "B", ["$\\int_a^b f(x)\\,dx=F(a)-F(b)$", "$\\int_a^b f(x)\\,dx=F(b)-F(a)$", "$\\int_a^b f(x)\\,dx=F(a)+F(b)$", "$\\int_a^b f(x)\\,dx=F'(b)-F'(a)$"], "Use upper minus lower: $F(b)-F(a)$."),
  masteryTyped("definite-mastery-3", "Evaluate the definite integral.", "\\int_0^2 (3x^2+2)\\,dx", "12", ["12 units"]),
  masteryTyped("definite-mastery-4", "Evaluate using upper minus lower.", "\\int_1^3 2x\\,dx", "8", ["8 units"]),
  masteryTyped("definite-mastery-5", "Evaluate the definite integral.", "\\int_{-1}^{2} (4x-1)\\,dx", "3", ["3 units"]),
  masteryTyped("definite-mastery-6", "Evaluate exactly.", "\\int_0^2 (x^2+2x)\\,dx", "20/3", ["6.6666666667", "6.67"]),
  masteryChoice("definite-mastery-7", "A student gets F(a)-F(b). What mistake has occurred?", "\\int_a^b f(x)\\,dx", "A", ["They reversed the bound order", "They forgot +C", "They found total area", "They used a table"], "Definite integrals use F(b)-F(a)."),
  masteryChoice("definite-mastery-8", "Should the final evaluated definite integral include +C?", "\\int_0^3 f(x)\\,dx", "D", ["Yes, always", "Only if the answer is negative", "Only for area", "No"], "The final definite integral is a number, so no +C is included."),
  masteryTyped("definite-mastery-9", "Use the given antiderivative values to evaluate the definite integral.", "F(5)=18,\\quad F(2)=7,\\quad \\int_2^5 f(x)\\,dx", "11", ["11 units"]),
  masteryChoice("definite-mastery-10", "A graph-based question gives signed areas 6 above and 9 below the x-axis. What is the definite integral?", "\\int_a^b f(x)\\,dx", "C", ["15", "3", "-3", "-15"], "Signed area is 6 - 9 = -3."),
];

signedAreaTotalAreaLesson.masteryQuiz = [
  masteryChoice("signed-mastery-1", "What does a definite integral calculate by default?", "\\int_a^b f(x)\\,dx", "B", ["Total area", "Signed area", "Always positive area", "The x-intercept"], "A definite integral gives signed area."),
  masteryTyped("signed-mastery-2", "Find the x-intercept where total area should be split.", "y=x-3", "3", ["x=3"]),
  masteryChoice("signed-mastery-3", "Does total area require splitting?", "y=x-3,\\quad 0\\le x\\le5", "A", ["Yes", "No", "Only if +C appears", "Only if the area is above the axis"], "The graph crosses the x-axis at x = 3 inside the interval."),
  masteryTyped("signed-mastery-4", "Find the signed area on the first piece.", "\\int_0^3 (x-3)\\,dx", "-9/2", ["-4.5"]),
  masteryTyped("signed-mastery-5", "Find the total area from the displayed signed pieces.", "-\\frac{9}{2},\\quad 2", "13/2", ["6.5"]),
  masteryTyped("signed-mastery-6", "Find the total area when the graph is below the x-axis.", "y=x-4,\\quad 0\\le x\\le2", "6", ["6 square units", "6 units^2"]),
  masteryChoice("signed-mastery-7", "A student reports -6 square units for total area. What is the issue?", "\\text{total area}", "C", ["They used +C", "They reversed x and y", "Total area cannot be negative", "They used too many bounds"], "Total geometric area is non-negative."),
  masteryChoice("signed-mastery-8", "Which plan is best when the curve crosses the x-axis?", "\\text{total area}", "D", ["Use one integral and keep the sign", "Differentiate the function", "Ignore the intercept", "Split and add absolute values"], "Total area needs positive contributions from each piece."),
  masteryTyped("signed-mastery-9", "A graph has the following signed area pieces. Find the total geometric area.", "\\int_0^2 f(x)\\,dx=-4,\\quad \\int_2^5 f(x)\\,dx=7", "11", ["11 square units", "11 units^2"]),
  masteryChoice("signed-mastery-10", "A graph has equal positive and negative signed areas. Which statement is correct?", "\\int_a^b f(x)\\,dx=0", "B", ["Total area is zero", "Signed area is zero but total area may be positive", "There is no graph", "The function must be constant"], "Signed pieces can cancel while total area remains positive."),
];

areaUnderCurveLesson.masteryQuiz = [
  masteryChoice("area-mastery-1", "Choose the correct setup for area under a positive curve.", "y=x^2+1,\\quad 0\\le x\\le2", "B", ["$\\int_2^0(x^2+1)\\,dx$", "$\\int_0^2(x^2+1)\\,dx$", "$\\int_0^2(x^2-1)\\,dx$", "$\\int(x^2+1)\\,dx+C$"], "Use the given bounds and function."),
  masteryTyped("area-mastery-2", "Calculate the area under the positive curve.", "\\int_0^2 (x^2+1)\\,dx", "14/3", ["4.6666666667", "4.67"]),
  masteryTyped("area-mastery-3", "Find the area when the curve is below the x-axis.", "y=-2x,\\quad 0\\le x\\le3", "9", ["9 square units", "9 units^2"]),
  masteryTyped("area-mastery-4", "Find the area under the curve.", "y=4-x,\\quad 0\\le x\\le4", "8", ["8 square units", "8 units^2"]),
  masteryTyped("area-mastery-5", "Find the area bounded by the curve and the x-axis on the given interval.", "y=9-x^2,\\quad 0\\le x\\le3", "18", ["18 square units", "18 units^2"]),
  masteryTyped("area-mastery-6", "Find the area below the x-axis.", "y=x-5,\\quad 0\\le x\\le2", "8", ["8 square units", "8 units^2"]),
  masteryChoice("area-mastery-7", "Which units are appropriate for an area answer if x and y are measured in metres?", "\\text{area}", "C", ["metres", "metres per second", "square metres", "seconds"], "Area uses square units."),
  masteryChoice("area-mastery-8", "A definite integral for a below-axis curve gives -8. What is the geometric area?", "\\int_a^b f(x)\\,dx=-8", "A", ["8", "-8", "0", "cannot be found"], "Area is the absolute value when the graph stays below the axis."),
  masteryTyped("area-mastery-9", "Find the total area between the curve and the x-axis on the given interval.", "y=x-1,\\quad 0\\le x\\le3", "5/2", ["2.5"]),
  masteryChoice("area-mastery-10", "A curve crosses the x-axis inside the interval. What is the best plan for total area?", "\\text{area under a curve}", "D", ["Use the definite integral once", "Add +C", "Reverse the bounds", "Split at the crossing and add positive areas"], "Crossing the axis changes the sign of signed area."),
];

trapezoidalRuleAreaApproximationLesson.masteryQuiz = [
  masteryTyped("trap-mastery-1", "Find the subinterval width.", "a=1,\\quad b=9,\\quad n=4", "2", ["h=2"]),
  masteryChoice("trap-mastery-2", "Which y-values are doubled?", "y_0,y_1,y_2,y_3,y_4", "B", ["y_0 and y_4", "y_1,y_2,y_3", "all five values", "no values"], "Only middle y-values are doubled."),
  masteryTyped("trap-mastery-3", "Use the Trapezoidal rule.", "h=1,\\quad y\\text{-values }2,5,10", "11", ["11 square units", "11 units^2"]),
  masteryTyped("trap-mastery-4", "Approximate the area.", "h=2,\\quad y\\text{-values }3,4,8,9", "36", ["36 square units", "36 units^2"]),
  masteryTyped("trap-mastery-5", "Use the listed equally spaced y-values to approximate the area.", "y=x^2+1,\\quad 0\\le x\\le3,\\quad h=1,\\quad y:1,2,5,10", "12.5", ["12.5 square units", "12.5 units^2"]),
  masteryTyped("trap-mastery-6", "A flow-rate table is recorded at equal time intervals. Approximate the total amount.", "h=5,\\quad y\\text{-values: }2,6,8\\text{ L/min}", "55", ["55 L", "55 litres", "55 liters"]),
  masteryChoice("trap-mastery-7", "What does the Trapezoidal rule usually give for a curved graph?", "\\text{Trapezoidal rule}", "C", ["An exact derivative", "A family of primitives", "An approximation", "A signed x-intercept"], "It approximates area using trapezia."),
  masteryChoice("trap-mastery-8", "A student doubles the first and last y-values. What is the mistake?", "T=\\frac h2[y_0+2(y_1+...)+y_n]", "A", ["Only middle values should be doubled", "All values should be squared", "The width should be ignored", "+C is needed"], "End values are counted once."),
  masteryTyped("trap-mastery-9", "A table has equally spaced x-values over the given interval. Find the subinterval width.", "0\\le x\\le12,\\quad x_0,\\ldots,x_6", "2", ["h=2"]),
  masteryChoice("trap-mastery-10", "A table gives velocity in m/s every second. What unit should the trapezoidal estimate for displacement use?", "v(t)\\text{ m/s},\\quad t\\text{ seconds}", "D", ["m/s", "seconds", "square metres", "metres"], "Velocity multiplied by time gives metres."),
];

areaBetweenTwoCurvesLesson.masteryQuiz = [
  masteryChoice("between-mastery-1", "Choose the correct setup for area between curves.", "\\text{top}=f(x),\\quad \\text{bottom}=g(x)", "A", ["$\\int_a^b(f(x)-g(x))\\,dx$", "$\\int_a^b(g(x)-f(x))\\,dx$", "$\\int_a^b(f(x)+g(x))\\,dx$", "$\\int f'(x)\\,dx$"], "Area is top minus bottom."),
  masteryChoice("between-mastery-2", "Which curve is on top on the given interval?", "y=5,\\quad y=x^2,\\quad 0\\le x\\le2", "B", ["$y=x^2$", "$y=5$", "neither", "both switch"], "$x^2\\le4$ on this interval, so $y=5$ is above."),
  masteryTyped("between-mastery-3", "Find the area.", "\\int_0^2(5-x^2)\\,dx", "22/3", ["7.3333333333", "7.33"]),
  masteryTyped("between-mastery-4", "Find the area between the two curves on the given interval.", "y=2x+1,\\quad y=x,\\quad 0\\le x\\le3", "15/2", ["7.5"]),
  masteryTyped("between-mastery-5", "Find the intersection x-values.", "x^2=4", "-2,2", ["2,-2", "x=-2,2", "x=-2,x=2"]),
  masteryTyped("between-mastery-6", "Find the enclosed area between the two curves on the given interval.", "y=4,\\quad y=x^2,\\quad -2\\le x\\le2", "32/3", ["10.6666666667", "10.67"]),
  masteryChoice("between-mastery-7", "A student calculates bottom minus top and gets a negative answer. What is the likely issue?", "\\text{area between curves}", "C", ["They forgot +C", "They used too many intersections", "They reversed top and bottom", "They used the Trapezoidal rule"], "Area should be set up as top minus bottom."),
  masteryChoice("between-mastery-8", "If two curves cross inside the interval and swap order, what may be needed?", "\\text{area between curves}", "B", ["Add +C", "Split the interval", "Use one top curve anyway", "Differentiate both curves"], "Top and bottom can change at an intersection."),
  masteryTyped("between-mastery-9", "Revenue is above cost on the given interval. Find the area between the two models.", "R(x)=8x,\\quad C(x)=3x+10,\\quad 2\\le x\\le5", "45/2", ["22.5"]),
  masteryChoice("between-mastery-10", "Which setup matches the area between the two curves on the given interval?", "y=x^2,\\quad y=x,\\quad 0\\le x\\le1", "D", ["$\\int_0^1(x^2-x)\\,dx$", "$\\int_1^0(x-x^2)\\,dx$", "$\\int_0^1(x+x^2)\\,dx$", "$\\int_0^1(x-x^2)\\,dx$"], "On $0\\le x\\le1$, $x$ is above $x^2$."),
];

applicationsTotalChangeMotionLesson.masteryQuiz = [
  masteryChoice("apps-mastery-1", "What does integrating a rate over an interval give?", "\\int_a^b R(t)\\,dt", "A", ["Net change in the quantity", "The instantaneous rate", "The derivative of R", "Always total distance"], "Accumulating a rate gives net change."),
  masteryTyped("apps-mastery-2", "Find displacement.", "v(t)=3t^2-4t,\\quad 0\\le t\\le2", "0", ["0 m", "0 metres", "0 meters"]),
  masteryTyped("apps-mastery-3", "Find total water added.", "R(t)=2t+5\\text{ L/min},\\quad 0\\le t\\le4", "36", ["36 L", "36 litres", "36 liters"]),
  masteryTyped("apps-mastery-4", "Find the net change.", "Q'(t)=6t-4,\\quad 1\\le t\\le3", "16", ["16 units"]),
  masteryTyped("apps-mastery-5", "Velocity changes sign at the time shown. Use the signed displacements to find total distance.", "t=2,\\quad -4,\\quad 9", "13", ["13 m", "13 metres"]),
  masteryTyped("apps-mastery-6", "A cost rate is given. Find the total cost change on the interval.", "C'(x)=4x+10,\\quad 0\\le x\\le5", "100", ["$100", "100 dollars"]),
  masteryChoice("apps-mastery-7", "Which statement is correct when velocity changes sign?", "\\text{motion}", "B", ["Displacement and distance are always equal", "Distance requires splitting or absolute values", "Displacement cannot be negative", "The integral is impossible"], "Total distance counts all motion positively."),
  masteryChoice("apps-mastery-8", "Choose the correct units for water added from a rate over time.", "R(t)\\text{ L/min},\\quad t\\text{ in minutes}", "C", ["litres per minute", "minutes", "litres", "square litres"], "Rate times time gives litres."),
  masteryTyped("apps-mastery-9", "A population rate is given. Find the increase on the interval.", "P'(t)=6t+10,\\quad 0\\le t\\le5", "125", ["125 people"]),
  masteryChoice("apps-mastery-10", "A displacement integral equals 0 but the object moved. What is likely true?", "\\int_a^b v(t)\\,dt=0", "D", ["The object did not move", "The total distance is zero", "Velocity was never negative", "Positive and negative displacements cancelled"], "Zero displacement can happen after movement in opposite directions."),
];

mixedIntegralCalculusExamPracticeLesson.masteryQuiz = [
  masteryChoice("mixed-int-mastery-1", "A derivative and one function value are given. Which method is needed?", "f'(x),\\quad f(1)", "B", ["Definite integral only", "Particular primitive", "Trapezoidal rule", "Area between curves"], "Use the condition to find $C$ after integrating."),
  masteryChoice("mixed-int-mastery-2", "Choose the setup for total change.", "Q'(t)=5t,\\quad 0\\le t\\le2", "A", ["$\\int_0^2 5t\\,dt$", "$\\int 5t\\,dt+C$", "$\\int_2^0 5t\\,dt$", "$5(2)$"], "Use the rate over the interval."),
  masteryTyped("mixed-int-mastery-3", "Evaluate the definite integral.", "\\int_0^2(3x^2+1)\\,dx", "10", ["10 units"]),
  masteryChoice("mixed-int-mastery-4", "Find the particular primitive.", "f'(x)=4x-3,\\quad f(2)=7", "C", ["$f(x)=4x^2-3x+5$", "$f(x)=2x^2-3x+C$", "$f(x)=2x^2-3x+5$", "$f(x)=4x-3$"], "Integrate first, then use the condition to find $C=5$."),
  masteryTyped("mixed-int-mastery-5", "Find total area.", "y=x-2,\\quad 0\\le x\\le4", "4", ["4 square units", "4 units^2"]),
  masteryTyped("mixed-int-mastery-6", "Use the Trapezoidal rule.", "h=2,\\quad y\\text{-values }1,3,5", "12", ["12 square units", "12 units^2"]),
  masteryChoice("mixed-int-mastery-7", "Which answer should include a constant of integration?", "\\text{choose the expression}", "C", ["$\\int_0^2 x^2\\,dx$", "area under a curve from 0 to 2", "$\\int x^2\\,dx$", "$\\int_a^b f(x)\\,dx$"], "Only an indefinite integral needs $+C$."),
  masteryChoice("mixed-int-mastery-8", "Which setup is correct for the displayed area-between-curves situation?", "\\text{top}=x+3,\\quad \\text{bottom}=x,\\quad 0\\le x\\le2", "D", ["$\\int_0^2(x-(x+3))\\,dx$", "$\\int_2^0((x+3)-x)\\,dx$", "$\\int_0^2(2x+3)\\,dx$", "$\\int_0^2((x+3)-x)\\,dx$"], "Area between curves is top minus bottom."),
  masteryTyped("mixed-int-mastery-9", "A graph has the following signed area pieces. Find the definite integral.", "\\int_a^b f(x)\\,dx=3,\\quad \\int_b^c f(x)\\,dx=-5,\\quad \\int_c^d f(x)\\,dx=4", "2", ["2 units"]),
  masteryChoice("mixed-int-mastery-10", "In a mixed exam question, what is the best first move?", "\\text{mixed integration}", "B", ["Start differentiating", "Identify whether it asks for primitive, area, approximation, or total change", "Always add +C", "Always use the Trapezoidal rule"], "The wording determines the integration method."),
];

// ===========================================================================
// Band-6 depth pools + multi-part practice (post-hoc assignment)
// ===========================================================================

antidifferentiationReversePowerRuleLesson.masteryQuizPool = [
  { id: "anti-p-1", prompt: "$\\int x^3\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{x^4}{4}+C$" }, { label: "B", text: "$3x^2+C$" }, { label: "C", text: "$\\frac{x^4}{3}+C$" }, { label: "D", text: "$4x^4+C$" }], hint: "Raise the power by 1, divide by the new power.", explanation: "$\\int x^3\\,dx=\\frac{x^4}{4}+C$." },
  { id: "anti-p-2", prompt: "$\\int x^5\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$5x^4+C$" }, { label: "B", text: "$\\frac{x^5}{5}+C$" }, { label: "C", text: "$\\frac{x^6}{6}+C$" }, { label: "D", text: "$6x^6+C$" }], hint: "New power is 6.", explanation: "$\\frac{x^6}{6}+C$." },
  { id: "anti-p-3", prompt: "$\\int 6x^2\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$2x^3+C$" }, { label: "B", text: "$3x^3+C$" }, { label: "C", text: "$12x^3+C$" }, { label: "D", text: "$6x^3+C$" }], hint: "$\\frac{6}{3}=2$.", explanation: "$\\frac{6x^3}{3}=2x^3$, so $2x^3+C$." },
  { id: "anti-p-4", prompt: "$\\int 10x^4\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$40x^5+C$" }, { label: "B", text: "$2x^5+C$" }, { label: "C", text: "$10x^5+C$" }, { label: "D", text: "$\\frac{10x^5}{4}+C$" }], hint: "$\\frac{10}{5}=2$.", explanation: "$\\frac{10x^5}{5}=2x^5$, so $2x^5+C$." },
  { id: "anti-p-5", prompt: "$\\int 7\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$7+C$" }, { label: "B", text: "$0+C$" }, { label: "C", text: "$7x+C$" }, { label: "D", text: "$\\frac{7x^2}{2}+C$" }], hint: "A constant integrates to a linear term.", explanation: "$\\int 7\\,dx=7x+C$." },
  { id: "anti-p-6", prompt: "$\\int x^{-3}\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$-\\frac{1}{2}x^{-2}+C$" }, { label: "B", text: "$\\frac{x^{-2}}{-2}\\,$ (no $+C$)" }, { label: "C", text: "$-3x^{-4}+C$" }, { label: "D", text: "$\\frac{x^{-4}}{-4}+C$" }], hint: "New power is $-2$; divide by $-2$.", explanation: "$\\frac{x^{-2}}{-2}=-\\frac{1}{2}x^{-2}+C$." },
  { id: "anti-p-7", prompt: "$\\int \\sqrt{x}\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{1}{2}x^{-1/2}+C$" }, { label: "B", text: "$\\frac{2}{3}x^{3/2}+C$" }, { label: "C", text: "$\\frac{3}{2}x^{3/2}+C$" }, { label: "D", text: "$x^{3/2}+C$" }], hint: "$\\sqrt x=x^{1/2}$; new power $\\frac32$.", explanation: "$\\int x^{1/2}\\,dx=\\frac{x^{3/2}}{3/2}=\\frac23 x^{3/2}+C$." },
  { id: "anti-p-8", prompt: "Which integral is excluded from the reverse power rule?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\int x^{-2}\\,dx$" }, { label: "B", text: "$\\int x^{0}\\,dx$" }, { label: "C", text: "$\\int x^{-1}\\,dx$" }, { label: "D", text: "$\\int x^{5}\\,dx$" }], hint: "The rule needs $n\\ne -1$.", explanation: "$n=-1$ would divide by $n+1=0$." },
  { id: "anti-p-9", prompt: "$\\int (4x^3-6x)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$x^4-3x^2+C$" }, { label: "B", text: "$12x^2-6+C$" }, { label: "C", text: "$x^4-6x^2+C$" }, { label: "D", text: "$4x^4-3x^2+C$" }], hint: "Integrate each term.", explanation: "$\\frac{4x^4}{4}-\\frac{6x^2}{2}=x^4-3x^2+C$." },
  { id: "anti-p-10", prompt: "$\\int 12x^3\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$4x^4+C$" }, { label: "B", text: "$3x^4+C$" }, { label: "C", text: "$36x^2+C$" }, { label: "D", text: "$12x^4+C$" }], hint: "$\\frac{12}{4}=3$.", explanation: "$\\frac{12x^4}{4}=3x^4+C$." },
  { id: "anti-p-11", prompt: "Find the missing coefficient $a$.", latex: "\\int ax^5\\,dx=4x^6+C", answer: "24", difficulty: 3, acceptedAnswers: ["a=24"], hint: "Differentiate $4x^6$.", explanation: "$\\frac{d}{dx}(4x^6)=24x^5$, so $a=24$." },
  { id: "anti-p-12", prompt: "$\\int (ax+b)^n\\,dx$ equals (for $n\\ne -1$):", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{(ax+b)^{n+1}}{a(n+1)}+C$" }, { label: "B", text: "$\\frac{(ax+b)^{n+1}}{n+1}+C$" }, { label: "C", text: "$a(ax+b)^{n+1}+C$" }, { label: "D", text: "$\\frac{(ax+b)^{n-1}}{a(n-1)}+C$" }], hint: "Reverse the chain rule: divide by $a$ as well.", explanation: "$\\frac{(ax+b)^{n+1}}{a(n+1)}+C$." },
  { id: "anti-p-13", prompt: "$\\int (2x+1)^3\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\frac{(2x+1)^4}{4}+C$" }, { label: "B", text: "$\\frac{(2x+1)^4}{8}+C$" }, { label: "C", text: "$3(2x+1)^2+C$" }, { label: "D", text: "$\\frac{(2x+1)^4}{2}+C$" }], hint: "Divide by $a(n+1)=2\\times 4=8$.", explanation: "$\\frac{(2x+1)^4}{8}+C$." },
  { id: "anti-p-14", prompt: "$\\int (3x-2)^4\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{(3x-2)^5}{15}+C$" }, { label: "B", text: "$\\frac{(3x-2)^5}{5}+C$" }, { label: "C", text: "$\\frac{(3x-2)^5}{3}+C$" }, { label: "D", text: "$4(3x-2)^3+C$" }], hint: "$a(n+1)=3\\times 5=15$.", explanation: "$\\frac{(3x-2)^5}{15}+C$." },
  { id: "anti-p-15", prompt: "A proposed antiderivative is $F(x)=2x^4$. Differentiating gives:", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$2x^3$" }, { label: "B", text: "$4x^3$" }, { label: "C", text: "$2x^5$" }, { label: "D", text: "$8x^3$" }], hint: "Check by differentiating.", explanation: "$\\frac{d}{dx}(2x^4)=8x^3$." },
  { id: "anti-p-16", prompt: "$\\int x^{2/3}\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$\\frac{2}{3}x^{-1/3}+C$" }, { label: "B", text: "$\\frac{5}{3}x^{5/3}+C$" }, { label: "C", text: "$\\frac{3}{5}x^{5/3}+C$" }, { label: "D", text: "$x^{5/3}+C$" }], hint: "New power $\\frac53$; divide by $\\frac53$.", explanation: "$\\frac{x^{5/3}}{5/3}=\\frac35 x^{5/3}+C$." },
  { id: "anti-p-17", prompt: "$\\int \\frac{1}{x^2}\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$-\\frac{1}{x}+C$" }, { label: "B", text: "$\\frac{1}{x}+C$" }, { label: "C", text: "$\\ln x^2+C$" }, { label: "D", text: "$-2x^{-3}+C$" }], hint: "$\\frac{1}{x^2}=x^{-2}$; new power $-1$.", explanation: "$\\frac{x^{-1}}{-1}=-x^{-1}=-\\frac1x+C$." },
  { id: "anti-p-18", prompt: "A student writes $\\int 10x^4\\,dx=50x^5$. The error is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "They forgot $+C$ only" }, { label: "B", text: "They multiplied by the new power instead of dividing" }, { label: "C", text: "They used the wrong new power" }, { label: "D", text: "There is no error" }], hint: "Coefficient should be $10\\div 5$.", explanation: "Should divide by 5: $2x^5+C$." },
  { id: "anti-p-19", prompt: "$\\int (8x^3+3x^2-2)\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$24x^2+6x+C$" }, { label: "B", text: "$2x^4+x^3-2+C$" }, { label: "C", text: "$2x^4+x^3-2x+C$" }, { label: "D", text: "$8x^4+3x^3-2x+C$" }], hint: "The constant $-2$ becomes $-2x$.", explanation: "$2x^4+x^3-2x+C$." },
  { id: "anti-p-20", prompt: "$\\int (5x-4)^2\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{(5x-4)^3}{15}+C$" }, { label: "B", text: "$\\frac{(5x-4)^3}{3}+C$" }, { label: "C", text: "$\\frac{(5x-4)^3}{5}+C$" }, { label: "D", text: "$2(5x-4)+C$" }], hint: "$a(n+1)=5\\times 3=15$.", explanation: "$\\frac{(5x-4)^3}{15}+C$." },
  { id: "anti-p-21", prompt: "$\\int (x^4-2x+7)\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$4x^3-2+C$" }, { label: "B", text: "$\\frac{x^5}{5}-x^2+7x+C$" }, { label: "C", text: "$\\frac{x^5}{5}-2x^2+7x+C$" }, { label: "D", text: "$\\frac{x^5}{4}-x^2+7x+C$" }], hint: "Integrate each term.", explanation: "$\\frac{x^5}{5}-x^2+7x+C$." },
  { id: "anti-p-22", prompt: "$\\int (4x+3)^5\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$\\frac{(4x+3)^6}{6}+C$" }, { label: "B", text: "$\\frac{(4x+3)^6}{4}+C$" }, { label: "C", text: "$\\frac{(4x+3)^6}{24}+C$" }, { label: "D", text: "$5(4x+3)^4+C$" }], hint: "$a(n+1)=4\\times 6=24$.", explanation: "$\\frac{(4x+3)^6}{24}+C$." },
  { id: "anti-p-23", prompt: "$\\int \\frac{1}{(2x-1)^2}\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$-\\frac{1}{2(2x-1)}+C$" }, { label: "B", text: "$-\\frac{1}{(2x-1)}+C$" }, { label: "C", text: "$\\frac{1}{2(2x-1)}+C$" }, { label: "D", text: "$\\ln(2x-1)+C$" }], hint: "Write as $(2x-1)^{-2}$; new power $-1$, divide by $a(n+1)=2\\times(-1)=-2$.", explanation: "$\\frac{(2x-1)^{-1}}{-2}=-\\frac{1}{2(2x-1)}+C$." },
  { id: "anti-p-24", prompt: "$\\int (6\\sqrt{x}+\\frac{1}{x^2})\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$4x^{3/2}+\\frac{1}{x}+C$" }, { label: "B", text: "$4x^{3/2}-\\frac{1}{x}+C$" }, { label: "C", text: "$6x^{3/2}-\\frac1x+C$" }, { label: "D", text: "$\\frac{2}{3}x^{3/2}-\\frac1x+C$" }], hint: "$6\\cdot\\frac23 x^{3/2}=4x^{3/2}$; $\\int x^{-2}=-x^{-1}$.", explanation: "$4x^{3/2}-\\frac1x+C$." },
  { id: "anti-p-25", prompt: "$\\int (10x^4-9x^2+4)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$2x^5-3x^3+4x+C$" }, { label: "B", text: "$2x^5-3x^3+4+C$" }, { label: "C", text: "$40x^3-18x+C$" }, { label: "D", text: "$2x^5-9x^3+4x+C$" }], hint: "Integrate term-by-term; $\\frac{9}{3}=3$.", explanation: "$2x^5-3x^3+4x+C$." },
  { id: "anti-p-26", prompt: "$\\int (3x-1)^{-2}\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$-\\frac{1}{(3x-1)}+C$" }, { label: "B", text: "$\\frac{1}{3(3x-1)}+C$" }, { label: "C", text: "$-\\frac{1}{3(3x-1)}+C$" }, { label: "D", text: "$\\ln(3x-1)+C$" }], hint: "New power $-1$; divide by $a(n+1)=3\\times(-1)=-3$.", explanation: "$\\frac{(3x-1)^{-1}}{-3}=-\\frac{1}{3(3x-1)}+C$." },
  { id: "anti-p-27", prompt: "$\\int 0\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$0$" }, { label: "B", text: "$C$" }, { label: "C", text: "$x$" }, { label: "D", text: "$x+C$" }], hint: "Antiderivative of zero is a constant.", explanation: "$\\int 0\\,dx=C$." },
  { id: "anti-p-28", prompt: "$\\int (x+2)^3\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{(x+2)^4}{4}+C$" }, { label: "B", text: "$\\frac{(x+2)^4}{8}+C$" }, { label: "C", text: "$3(x+2)^2+C$" }, { label: "D", text: "$\\frac{(x+2)^4}{2}+C$" }], hint: "Here $a=1$, so divide by $1\\times 4=4$.", explanation: "$\\frac{(x+2)^4}{4}+C$." },
  { id: "anti-p-29", prompt: "$\\int 15x^{4}\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$60x^3+C$" }, { label: "B", text: "$3x^5+C$" }, { label: "C", text: "$15x^5+C$" }, { label: "D", text: "$\\frac{15x^5}{4}+C$" }], hint: "$\\frac{15}{5}=3$.", explanation: "$3x^5+C$." },
  { id: "anti-p-30", prompt: "$\\int (2x+5)^4\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$\\frac{(2x+5)^5}{5}+C$" }, { label: "B", text: "$\\frac{(2x+5)^5}{2}+C$" }, { label: "C", text: "$\\frac{(2x+5)^5}{10}+C$" }, { label: "D", text: "$4(2x+5)^3+C$" }], hint: "$a(n+1)=2\\times 5=10$.", explanation: "$\\frac{(2x+5)^5}{10}+C$." },
];

antidifferentiationReversePowerRuleLesson.multiPartPractice = [
  {
    id: "anti-mp-1",
    prompt: "A curve has gradient function $f'(x)=12x^2-6x$. Work with its antiderivatives.",
    latex: "f'(x)=12x^2-6x",
    answer: "16",
    hint: "Integrate term-by-term using the reverse power rule, then substitute the given $x$-values.",
    explanation:
      "(a) $f(x)=4x^3-3x^2+C$, coefficient of $x^3$ is $4$. (b) With $C=0$, $f(2)=4(8)-3(4)=20$. (c) $f(1)=4-3=1$, so $f(2)-f(1)=20-1=19$ (the constant $C$ cancels in the difference).",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the coefficient of $x^3$ in the general antiderivative $f(x)$.", latex: "\\int 12x^2\\,dx", marks: 1, answer: "4", hint: "$\\frac{12}{3}=4$.", explanation: "$\\int 12x^2\\,dx=4x^3$, so the coefficient is $4$." },
      { key: "b", label: "(b)", prompt: "Taking $C=0$, evaluate $f(2)$.", latex: "f(x)=4x^3-3x^2", marks: 2, answer: "20", hint: "Substitute $x=2$ into $4x^3-3x^2$.", explanation: "$4(8)-3(4)=32-12=20$." },
      { key: "c", label: "(c)", prompt: "Taking $C=0$, evaluate $f(2)-f(1)$.", latex: "f(2)-f(1)", marks: 2, answer: "19", hint: "$f(1)=4-3=1$.", explanation: "$f(1)=4(1)-3(1)=1$, so $f(2)-f(1)=20-1=19$." },
    ],
  },
];

indefiniteIntegralsConstantOfIntegrationLesson.masteryQuizPool = [
  { id: "indef-p-1", prompt: "An indefinite integral needs $+C$ because:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "powers of $x$ vanish" }, { label: "B", text: "constants differentiate to zero, so many primitives share a derivative" }, { label: "C", text: "definite integrals need units" }, { label: "D", text: "the upper bound is missing" }], hint: "Family of primitives.", explanation: "$+C$ captures every primitive." },
  { id: "indef-p-2", prompt: "$\\int (6x^2-4x+5)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$2x^3-2x^2+5x+C$" }, { label: "B", text: "$18x-4+C$" }, { label: "C", text: "$2x^3-4x^2+5+C$" }, { label: "D", text: "$6x^3-2x^2+5x+C$" }], hint: "Integrate each term.", explanation: "$2x^3-2x^2+5x+C$." },
  { id: "indef-p-3", prompt: "$\\int -7\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$-7+C$" }, { label: "B", text: "$-7x+C$" }, { label: "C", text: "$7x+C$" }, { label: "D", text: "$0+C$" }], hint: "Constant integrates to a linear term.", explanation: "$-7x+C$." },
  { id: "indef-p-4", prompt: "$\\int (8x^3+3x^2-2)\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$24x^2+6x+C$" }, { label: "B", text: "$2x^4+x^3-2+C$" }, { label: "C", text: "$2x^4+x^3-2x+C$" }, { label: "D", text: "$8x^4+3x^3-2x+C$" }], hint: "$-2$ becomes $-2x$.", explanation: "$2x^4+x^3-2x+C$." },
  { id: "indef-p-5", prompt: "$\\int (4x^3-6x+9)\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$x^4-3x^2+C$" }, { label: "B", text: "$16x^2-6+C$" }, { label: "C", text: "$x^4-3x^2+9x+C$" }, { label: "D", text: "$4x^4-6x^2+9+C$" }], hint: "$9$ becomes $9x$.", explanation: "$x^4-3x^2+9x+C$." },
  { id: "indef-p-6", prompt: "$\\int (10x^4-12x)\\,dx=$", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$40x^3-12+C$" }, { label: "B", text: "$10x^5-12x^2+C$" }, { label: "C", text: "$2x^5-12x^2+C$" }, { label: "D", text: "$2x^5-6x^2+C$" }], hint: "$\\frac{12}{2}=6$.", explanation: "$2x^5-6x^2+C$." },
  { id: "indef-p-7", prompt: "A student writes $\\int (3x^2+5)\\,dx=x^3+5+C$. The error is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "the constant $5$ should integrate to $5x$" }, { label: "B", text: "$x^2$ should stay $x^2$" }, { label: "C", text: "$+C$ should be removed" }, { label: "D", text: "it should be definite" }], hint: "A constant becomes linear.", explanation: "Correct: $x^3+5x+C$." },
  { id: "indef-p-8", prompt: "Which derivative check is correct for $F(x)=x^4-2x^2+5x+C$?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$4x^3-4x+5+C$" }, { label: "B", text: "$x^3-2x+5$" }, { label: "C", text: "$4x^3-2x+5$" }, { label: "D", text: "$4x^3-4x+5$" }], hint: "$\\frac{d}{dx}C=0$.", explanation: "$F'(x)=4x^3-4x+5$." },
  { id: "indef-p-9", prompt: "$\\int x^2\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{x^3}{3}+C$" }, { label: "B", text: "$2x+C$" }, { label: "C", text: "$3x^3+C$" }, { label: "D", text: "$\\frac{x^3}{2}+C$" }], hint: "New power 3.", explanation: "$\\frac{x^3}{3}+C$." },
  { id: "indef-p-10", prompt: "$\\int (x^3-x)\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\frac{x^4}{4}-1+C$" }, { label: "B", text: "$\\frac{x^4}{4}-\\frac{x^2}{2}+C$" }, { label: "C", text: "$\\frac{x^4}{3}-\\frac{x^2}{2}+C$" }, { label: "D", text: "$3x^2-1+C$" }], hint: "Integrate each.", explanation: "$\\frac{x^4}{4}-\\frac{x^2}{2}+C$." },
  { id: "indef-p-11", prompt: "$\\int (x-3)^2\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{(x-3)^3}{3}+C$" }, { label: "B", text: "$\\frac{(x-3)^3}{1}+C$" }, { label: "C", text: "$2(x-3)+C$" }, { label: "D", text: "$\\frac{(x-3)^3}{6}+C$" }], hint: "$a=1$, divide by $1\\times 3$.", explanation: "$\\frac{(x-3)^3}{3}+C$." },
  { id: "indef-p-12", prompt: "$\\int \\frac{x^3-2x}{1}\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$3x^2-2+C$" }, { label: "B", text: "$\\frac{x^4}{4}-2+C$" }, { label: "C", text: "$\\frac{x^4}{4}-x^2+C$" }, { label: "D", text: "$\\frac{x^4}{3}-x^2+C$" }], hint: "Integrate each.", explanation: "$\\frac{x^4}{4}-x^2+C$." },
  { id: "indef-p-13", prompt: "$\\int (12x^3+2x)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$3x^4+x^2+C$" }, { label: "B", text: "$3x^4+2x^2+C$" }, { label: "C", text: "$36x^2+2+C$" }, { label: "D", text: "$4x^4+x^2+C$" }], hint: "$\\frac{12}{4}=3$, $\\frac{2}{2}=1$.", explanation: "$3x^4+x^2+C$." },
  { id: "indef-p-14", prompt: "Indefinite vs definite integral — which is correct?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "both answers include $+C$" }, { label: "B", text: "only the indefinite integral has $+C$" }, { label: "C", text: "only the definite integral has $+C$" }, { label: "D", text: "neither can be checked by differentiating" }], hint: "Definite gives a number.", explanation: "Only the indefinite integral has $+C$." },
  { id: "indef-p-15", prompt: "$\\int (6x^5-4x^3)\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$30x^4-12x^2+C$" }, { label: "B", text: "$x^6-4x^4+C$" }, { label: "C", text: "$x^6-x^4+C$" }, { label: "D", text: "$x^6-x^4$" }], hint: "$\\frac{6}{6}=1$, $\\frac{4}{4}=1$; include $+C$.", explanation: "$x^6-x^4+C$." },
  { id: "indef-p-16", prompt: "$\\int \\sqrt[3]{x}\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{3}{4}x^{4/3}+C$" }, { label: "B", text: "$\\frac{4}{3}x^{4/3}+C$" }, { label: "C", text: "$x^{4/3}+C$" }, { label: "D", text: "$\\frac{1}{3}x^{-2/3}+C$" }], hint: "$x^{1/3}$, new power $\\frac43$.", explanation: "$\\frac{x^{4/3}}{4/3}=\\frac34 x^{4/3}+C$." },
  { id: "indef-p-17", prompt: "$\\int (2x+1)^2\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\frac{(2x+1)^3}{3}+C$" }, { label: "B", text: "$\\frac{(2x+1)^3}{6}+C$" }, { label: "C", text: "$\\frac{(2x+1)^3}{2}+C$" }, { label: "D", text: "$2(2x+1)+C$" }], hint: "$a(n+1)=2\\times 3=6$.", explanation: "$\\frac{(2x+1)^3}{6}+C$." },
  { id: "indef-p-18", prompt: "$\\int (x^4-x^2+1)\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$4x^3-2x+C$" }, { label: "B", text: "$\\frac{x^5}{5}-\\frac{x^3}{3}+1+C$" }, { label: "C", text: "$\\frac{x^5}{5}-\\frac{x^3}{3}+x+C$" }, { label: "D", text: "$\\frac{x^5}{4}-\\frac{x^3}{3}+x+C$" }], hint: "$1$ becomes $x$.", explanation: "$\\frac{x^5}{5}-\\frac{x^3}{3}+x+C$." },
  { id: "indef-p-19", prompt: "A rate $Q'(t)=3t^2-4t+6$. The general primitive is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$t^3-2t^2+6t+C$" }, { label: "B", text: "$6t-4+C$" }, { label: "C", text: "$3t^3-4t^2+6t+C$" }, { label: "D", text: "$t^3-4t^2+6+C$" }], hint: "Integrate each term.", explanation: "$t^3-2t^2+6t+C$." },
  { id: "indef-p-20", prompt: "$\\int (x+1)(x-1)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{x^3}{3}-x+C$" }, { label: "B", text: "$\\frac{x^3}{3}+x+C$" }, { label: "C", text: "$\\frac{x^3}{3}-x^2+C$" }, { label: "D", text: "$x^2-1+C$" }], hint: "Expand to $x^2-1$ first.", explanation: "$(x+1)(x-1)=x^2-1$, so $\\frac{x^3}{3}-x+C$." },
  { id: "indef-p-21", prompt: "$\\int \\frac{6}{x^2}\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\frac{6}{x}+C$" }, { label: "B", text: "$-\\frac{6}{x}+C$" }, { label: "C", text: "$6\\ln x+C$" }, { label: "D", text: "$-12x^{-3}+C$" }], hint: "$6x^{-2}$; new power $-1$.", explanation: "$\\frac{6x^{-1}}{-1}=-\\frac6x+C$." },
  { id: "indef-p-22", prompt: "$\\int (5x^4-3x^2+2x)\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$20x^3-6x+2+C$" }, { label: "B", text: "$x^5-x^3+x+C$" }, { label: "C", text: "$x^5-x^3+x^2+C$" }, { label: "D", text: "$x^5-3x^3+x^2+C$" }], hint: "$\\frac{3}{3}=1$, $\\frac{2}{2}=1$.", explanation: "$x^5-x^3+x^2+C$." },
  { id: "indef-p-23", prompt: "$\\int (3x-2)^2\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\frac{(3x-2)^3}{9}+C$" }, { label: "B", text: "$\\frac{(3x-2)^3}{3}+C$" }, { label: "C", text: "$\\frac{(3x-2)^3}{6}+C$" }, { label: "D", text: "$2(3x-2)+C$" }], hint: "$a(n+1)=3\\times 3=9$.", explanation: "$\\frac{(3x-2)^3}{9}+C$." },
  { id: "indef-p-24", prompt: "$\\int \\left(x^3+\\frac{1}{x^2}\\right)\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$\\frac{x^4}{4}+\\frac1x+C$" }, { label: "B", text: "$\\frac{x^4}{4}-\\frac1x+C$" }, { label: "C", text: "$\\frac{x^4}{4}-x+C$" }, { label: "D", text: "$3x^2-2x^{-3}+C$" }], hint: "$\\int x^{-2}=-x^{-1}$.", explanation: "$\\frac{x^4}{4}-\\frac1x+C$." },
  { id: "indef-p-25", prompt: "$\\int (4x+3)^3\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$\\frac{(4x+3)^4}{4}+C$" }, { label: "B", text: "$\\frac{(4x+3)^4}{12}+C$" }, { label: "C", text: "$\\frac{(4x+3)^4}{16}+C$" }, { label: "D", text: "$3(4x+3)^2+C$" }], hint: "$a(n+1)=4\\times 4=16$.", explanation: "$\\frac{(4x+3)^4}{16}+C$." },
  { id: "indef-p-26", prompt: "$\\int (9x^2-1)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$3x^3-x+C$" }, { label: "B", text: "$3x^3+C$" }, { label: "C", text: "$18x+C$" }, { label: "D", text: "$3x^3-1+C$" }], hint: "$-1$ becomes $-x$.", explanation: "$3x^3-x+C$." },
  { id: "indef-p-27", prompt: "$\\int (x^5+4x^3-2x)\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$\\frac{x^6}{6}+x^4-x^2$" }, { label: "B", text: "$\\frac{x^6}{6}+x^4-x^2+C$" }, { label: "C", text: "$\\frac{x^6}{6}+4x^4-2x^2+C$" }, { label: "D", text: "$6x^5+12x^2-2+C$" }], hint: "$\\frac{4}{4}=1$, $\\frac{2}{2}=1$; include $+C$.", explanation: "$\\frac{x^6}{6}+x^4-x^2+C$." },
  { id: "indef-p-28", prompt: "Two students give $x^3+C$ and $x^3+7$ for the same integral. Which is true?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$x^3+7$ is the case $C=7$, so both are valid primitives" }, { label: "B", text: "only $x^3+C$ is correct" }, { label: "C", text: "only $x^3+7$ is correct" }, { label: "D", text: "they cannot both be primitives" }], hint: "$+C$ is any constant.", explanation: "$x^3+7$ is one member of the family $x^3+C$." },
  { id: "indef-p-29", prompt: "$\\int (8x-6)\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$8-0+C$" }, { label: "B", text: "$4x^2-6+C$" }, { label: "C", text: "$4x^2-6x+C$" }, { label: "D", text: "$8x^2-6x+C$" }], hint: "$\\frac82=4$; $-6$ becomes $-6x$.", explanation: "$4x^2-6x+C$." },
  { id: "indef-p-30", prompt: "$\\int (2x+5)^3\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\frac{(2x+5)^4}{8}+C$" }, { label: "B", text: "$\\frac{(2x+5)^4}{4}+C$" }, { label: "C", text: "$\\frac{(2x+5)^4}{2}+C$" }, { label: "D", text: "$3(2x+5)^2+C$" }], hint: "$a(n+1)=2\\times 4=8$.", explanation: "$\\frac{(2x+5)^4}{8}+C$." },
];

indefiniteIntegralsConstantOfIntegrationLesson.multiPartPractice = [
  {
    id: "indef-mp-1",
    prompt: "Consider the indefinite integral $\\int (6x^2-4x+1)\\,dx=F(x)+C$.",
    latex: "\\int (6x^2-4x+1)\\,dx",
    answer: "2",
    hint: "Integrate term-by-term, then read off the requested coefficients and evaluate the difference.",
    explanation:
      "(a) $F(x)=2x^3-2x^2+x$, so the coefficient of $x^3$ is $2$. (b) The constant term $1$ integrates to $x$, coefficient $1$. (c) With $C=0$, $F(1)=2-2+1=1$ and $F(0)=0$, so $F(1)-F(0)=1$.",
    parts: [
      { key: "a", label: "(a)", prompt: "State the coefficient of $x^3$ in $F(x)$.", latex: "\\int 6x^2\\,dx", marks: 2, answer: "2", hint: "$\\frac{6}{3}=2$.", explanation: "$\\int 6x^2\\,dx=2x^3$." },
      { key: "b", label: "(b)", prompt: "State the coefficient of $x$ in $F(x)$.", latex: "\\int 1\\,dx", marks: 1, answer: "1", hint: "The constant $1$ integrates to $1x$.", explanation: "$\\int 1\\,dx=x$, coefficient $1$." },
      { key: "c", label: "(c)", prompt: "Taking $C=0$, evaluate $F(1)-F(0)$.", latex: "F(1)-F(0)", marks: 2, answer: "1", hint: "$F(0)=0$.", explanation: "$F(1)=2-2+1=1$, $F(0)=0$, difference $=1$." },
    ],
  },
];

initialConditionsParticularPrimitiveLesson.masteryQuizPool = [
  { id: "initial-p-1", prompt: "To find a particular primitive you first:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "substitute the condition into $f'(x)$" }, { label: "B", text: "integrate (keeping $+C$), then use the condition" }, { label: "C", text: "differentiate the condition" }, { label: "D", text: "ignore $+C$" }], hint: "Integrate, then substitute.", explanation: "Integrate first, then apply the condition to find $C$." },
  { id: "initial-p-2", prompt: "$f'(x)=6x-4$, $f(2)=9$. Find $C$ in $f(x)=3x^2-4x+C$.", latex: "9=3(2)^2-4(2)+C", answer: "5", difficulty: 2, acceptedAnswers: ["C=5"], hint: "$9=12-8+C$.", explanation: "$9=4+C$, so $C=5$." },
  { id: "initial-p-3", prompt: "$f'(x)=4x-3$, $f(2)=7$. Find $f(x)$ at $x=0$.", latex: "f(x)=2x^2-3x+C", answer: "5", difficulty: 3, acceptedAnswers: ["f(0)=5"], hint: "Find $C$ first: $7=8-6+C$.", explanation: "$C=5$; $f(0)=C=5$." },
  { id: "initial-p-4", prompt: "$\\frac{dy}{dx}=3x^2-2x$, $y(1)=4$. Find $C$.", latex: "y=x^3-x^2+C", answer: "4", difficulty: 2, acceptedAnswers: ["C=4"], hint: "$4=1-1+C$.", explanation: "$4=0+C$, so $C=4$." },
  { id: "initial-p-5", prompt: "$s'(t)=6t+2$, $s(0)=5$. Find $s(2)$.", latex: "s(t)=3t^2+2t+C", answer: "21", difficulty: 3, acceptedAnswers: ["21 m", "21 metres"], hint: "$C=5$; $s(2)=12+4+5$.", explanation: "$s(t)=3t^2+2t+5$; $s(2)=12+4+5=21$." },
  { id: "initial-p-6", prompt: "$Q'(t)=2t+8$, $Q(3)=30$. Find $C$.", latex: "Q(t)=t^2+8t+C", answer: "-3", difficulty: 3, acceptedAnswers: ["−3", "C=-3", "C=−3"], hint: "$30=9+24+C$.", explanation: "$30=33+C$, so $C=-3$." },
  { id: "initial-p-7", prompt: "A student substitutes the condition into $f'(x)$ before integrating. The issue is:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "the condition belongs in $f(x)$, not $f'(x)$" }, { label: "B", text: "$f'(x)$ must include $+C$ first" }, { label: "C", text: "the $x$-value should be ignored" }, { label: "D", text: "the upper bound is missing" }], hint: "Apply conditions after integrating.", explanation: "Conditions are used on the primitive $f(x)$." },
  { id: "initial-p-8", prompt: "$f'(x)=4x+1$, $f(3)=20$. The correct substitution is:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$20=4(3)+1$" }, { label: "B", text: "$C=3$" }, { label: "C", text: "$20=2(3)^2+3+C$" }, { label: "D", text: "$20=4x+1+C$" }], hint: "Integrate to $2x^2+x+C$.", explanation: "$f(x)=2x^2+x+C$; substitute $x=3$." },
  { id: "initial-p-9", prompt: "$f'(x)=4x+1$, $f(3)=20$. Find $C$.", latex: "20=2(3)^2+3+C", answer: "-1", difficulty: 3, acceptedAnswers: ["−1", "C=-1", "C=−1"], hint: "$20=18+3+C$.", explanation: "$20=21+C$, so $C=-1$." },
  { id: "initial-p-10", prompt: "$P'(t)=6t+10$, $P(0)=200$. Find $P(5)$.", latex: "P(t)=3t^2+10t+C", answer: "325", difficulty: 4, acceptedAnswers: ["325 people"], hint: "$C=200$; $P(5)=75+50+200$.", explanation: "$P(t)=3t^2+10t+200$; $P(5)=75+50+200=325$." },
  { id: "initial-p-11", prompt: "$f'(x)=6x$, $f(a)=20$. What extra information is needed?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "the derivative rule" }, { label: "B", text: "the value of $a$" }, { label: "C", text: "the coefficient of $x$" }, { label: "D", text: "the pass mark" }], hint: "Need a numeric $x$.", explanation: "A numerical $x$-value is needed to solve for $C$." },
  { id: "initial-p-12", prompt: "$f''(x)=6$, $f'(0)=2$, $f(0)=1$. Find $f'(x)$ at $x=3$.", latex: "f'(x)=6x+2", answer: "20", difficulty: 4, acceptedAnswers: ["f'(3)=20"], hint: "$f'(x)=6x+C_1$, $f'(0)=2\\Rightarrow C_1=2$.", explanation: "$f'(x)=6x+2$; $f'(3)=18+2=20$." },
  { id: "initial-p-13", prompt: "$v(t)=3t^2-4t$, $s(0)=0$. Find the displacement $s(2)$.", latex: "s(t)=t^3-2t^2+C", answer: "0", difficulty: 4, acceptedAnswers: ["0 m", "0 metres"], hint: "$C=0$; $s(2)=8-8$.", explanation: "$s(t)=t^3-2t^2$; $s(2)=8-8=0$." },
  { id: "initial-p-14", prompt: "$f'(x)=2x-5$, $f(1)=-2$. Find $C$.", latex: "f(x)=x^2-5x+C", answer: "2", difficulty: 3, acceptedAnswers: ["C=2"], hint: "$-2=1-5+C$.", explanation: "$-2=-4+C$, so $C=2$." },
  { id: "initial-p-15", prompt: "$\\frac{dy}{dx}=4x^3$, the curve passes through $(1,5)$. Find $C$.", latex: "y=x^4+C", answer: "4", difficulty: 3, acceptedAnswers: ["C=4"], hint: "$5=1+C$.", explanation: "$5=1+C$, so $C=4$." },
  { id: "initial-p-16", prompt: "$f'(x)=3x^2+2$, $f(2)=15$. Find $C$.", latex: "f(x)=x^3+2x+C", answer: "3", difficulty: 3, acceptedAnswers: ["C=3"], hint: "$15=8+4+C$.", explanation: "$15=12+C$, so $C=3$." },
  { id: "initial-p-17", prompt: "$v(t)=2t+1$, $s(1)=4$. Find $s(t)$ at $t=3$.", latex: "s(t)=t^2+t+C", answer: "14", difficulty: 4, acceptedAnswers: ["14 m", "14 metres"], hint: "$4=1+1+C\\Rightarrow C=2$; $s(3)=9+3+2$.", explanation: "$C=2$; $s(3)=9+3+2=14$." },
  { id: "initial-p-18", prompt: "A particular primitive must be:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "the value of $C$ only" }, { label: "B", text: "the full function with $C$ determined" }, { label: "C", text: "$f'(x)$" }, { label: "D", text: "a number" }], hint: "Full function.", explanation: "It is the specific primitive with $C$ found." },
  { id: "initial-p-19", prompt: "$f'(x)=6x^2-4x$, $f(1)=3$. Find $C$.", latex: "f(x)=2x^3-2x^2+C", answer: "3", difficulty: 4, acceptedAnswers: ["C=3"], hint: "$3=2-2+C$.", explanation: "$3=0+C$, so $C=3$." },
  { id: "initial-p-20", prompt: "$Q'(t)=4t+3$, $Q(2)=20$. Find $Q(0)$.", latex: "Q(t)=2t^2+3t+C", answer: "6", difficulty: 4, acceptedAnswers: ["Q(0)=6"], hint: "$20=8+6+C\\Rightarrow C=6$; $Q(0)=C$.", explanation: "$C=6$; $Q(0)=6$." },
  { id: "initial-p-21", prompt: "$\\frac{dy}{dx}=2x+3$, passes through $(2,1)$. Find $y$ at $x=0$.", latex: "y=x^2+3x+C", answer: "-9", difficulty: 4, acceptedAnswers: ["−9", "y=-9", "y=−9"], hint: "$1=4+6+C\\Rightarrow C=-9$; $y(0)=C$.", explanation: "$C=-9$; $y(0)=-9$." },
  { id: "initial-p-22", prompt: "$a(t)=6t$, $v(0)=4$, $s(0)=0$. Find $v(2)$.", latex: "v(t)=3t^2+C_1", answer: "16", difficulty: 5, acceptedAnswers: ["16 m/s"], hint: "$v(t)=3t^2+4$; $v(2)=12+4$.", explanation: "$v(t)=3t^2+4$; $v(2)=12+4=16$." },
  { id: "initial-p-23", prompt: "$a(t)=6t$, $v(0)=4$, $s(0)=0$. Find $s(2)$.", latex: "s(t)=t^3+4t+C_2", answer: "16", difficulty: 5, acceptedAnswers: ["16 m", "16 metres"], hint: "$v(t)=3t^2+4$, integrate: $s(t)=t^3+4t$; $s(2)=8+8$.", explanation: "$s(t)=t^3+4t$; $s(2)=8+8=16$." },
  { id: "initial-p-24", prompt: "$f'(x)=12x^2-2$, $f(-1)=0$. Find $C$.", latex: "f(x)=4x^3-2x+C", answer: "2", difficulty: 5, acceptedAnswers: ["C=2"], hint: "$f(-1)=4(-1)^3-2(-1)+C=-4+2+C$.", explanation: "$-4+2+C=0$, so $C=2$." },
  { id: "initial-p-25", prompt: "$f'(x)=8x-6$, $f(3)=10$. Find $C$.", latex: "f(x)=4x^2-6x+C", answer: "-8", difficulty: 4, acceptedAnswers: ["−8", "C=-8", "C=−8"], hint: "$10=36-18+C$.", explanation: "$10=18+C$, so $C=-8$." },
  { id: "initial-p-26", prompt: "$v(t)=t^2-4$ (m/s), $s(0)=2$. Find $s(3)$.", latex: "s(t)=\\frac{t^3}{3}-4t+C", answer: "-1", difficulty: 5, acceptedAnswers: ["−1", "-1 m", "−1 m"], hint: "$C=2$; $s(3)=9-12+2$.", explanation: "$s(t)=\\frac{t^3}{3}-4t+2$; $s(3)=9-12+2=-1$." },
  { id: "initial-p-27", prompt: "$f'(x)=3x^2$, $f(2)=10$. Find $f(x)$ at $x=1$.", latex: "f(x)=x^3+C", answer: "3", difficulty: 4, acceptedAnswers: ["f(1)=3"], hint: "$10=8+C\\Rightarrow C=2$; $f(1)=1+2$.", explanation: "$C=2$; $f(1)=1+2=3$." },
  { id: "initial-p-28", prompt: "$\\frac{dP}{dt}=10-2t$, $P(0)=50$. Find $P(5)$.", latex: "P(t)=10t-t^2+C", answer: "75", difficulty: 5, acceptedAnswers: ["75"], hint: "$C=50$; $P(5)=50-25+50$.", explanation: "$P(t)=10t-t^2+50$; $P(5)=50-25+50=75$." },
  { id: "initial-p-29", prompt: "$f'(x)=6x+1$, $f(0)=-3$. Find $C$.", latex: "f(x)=3x^2+x+C", answer: "-3", difficulty: 2, acceptedAnswers: ["−3", "C=-3", "C=−3"], hint: "$f(0)=C$.", explanation: "$f(0)=C=-3$." },
  { id: "initial-p-30", prompt: "$v(t)=4-2t$ (m/s), $s(0)=0$. Find $s(4)$.", latex: "s(t)=4t-t^2+C", answer: "0", difficulty: 5, acceptedAnswers: ["0 m", "0 metres"], hint: "$C=0$; $s(4)=16-16$.", explanation: "$s(t)=4t-t^2$; $s(4)=16-16=0$." },
];

initialConditionsParticularPrimitiveLesson.multiPartPractice = [
  {
    id: "initial-mp-1",
    prompt: "A particle moves so that its velocity is $v(t)=3t^2-12$ (in m/s). At $t=0$ its displacement is $s(0)=5$ m.",
    latex: "v(t)=3t^2-12",
    answer: "-3",
    hint: "Integrate $v(t)$ to get $s(t)$, use $s(0)=5$ to find the constant, then evaluate.",
    explanation:
      "(a) $s(t)=t^3-12t+C$, and $s(0)=C=5$, so $C=5$. (b) $s(2)=8-24+5=-11$. (c) $s(3)=27-36+5=-4$, so $s(3)-s(2)=-4-(-11)=7$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the constant $C$ in $s(t)=t^3-12t+C$.", latex: "s(0)=5", marks: 1, answer: "5", hint: "$s(0)=C$.", explanation: "$s(0)=C=5$." },
      { key: "b", label: "(b)", prompt: "Find the displacement $s(2)$.", latex: "s(t)=t^3-12t+5", marks: 2, answer: "-11", acceptedAnswers: ["−11", "-11 m", "−11 m"], hint: "$8-24+5$.", explanation: "$s(2)=8-24+5=-11$." },
      { key: "c", label: "(c)", prompt: "Find $s(3)-s(2)$.", latex: "s(3)-s(2)", marks: 2, answer: "7", acceptedAnswers: ["7 m", "7 metres"], hint: "$s(3)=27-36+5=-4$.", explanation: "$s(3)=-4$, so $s(3)-s(2)=-4-(-11)=7$." },
    ],
  },
];

definiteIntegralsFundamentalTheoremLesson.masteryQuizPool = [
  { id: "definite-p-1", prompt: "The Fundamental Theorem gives $\\int_a^b f(x)\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$F(a)-F(b)$" }, { label: "B", text: "$F(b)-F(a)$" }, { label: "C", text: "$F(a)+F(b)$" }, { label: "D", text: "$F'(b)-F'(a)$" }], hint: "Upper minus lower.", explanation: "$F(b)-F(a)$." },
  { id: "definite-p-2", prompt: "$\\int_0^2 (3x^2+2)\\,dx=$", latex: "[x^3+2x]_0^2", answer: "12", difficulty: 2, acceptedAnswers: ["12 units"], hint: "$8+4-0$.", explanation: "$[x^3+2x]_0^2=(8+4)-0=12$." },
  { id: "definite-p-3", prompt: "$\\int_1^3 2x\\,dx=$", latex: "[x^2]_1^3", answer: "8", difficulty: 2, acceptedAnswers: ["8 units"], hint: "$9-1$.", explanation: "$[x^2]_1^3=9-1=8$." },
  { id: "definite-p-4", prompt: "$\\int_{-1}^{2} (4x-1)\\,dx=$", latex: "[2x^2-x]_{-1}^{2}", answer: "3", difficulty: 3, acceptedAnswers: ["3 units"], hint: "$(8-2)-(2+1)$.", explanation: "$[2x^2-x]_{-1}^{2}=(8-2)-(2-(-1))=6-3=3$." },
  { id: "definite-p-5", prompt: "$\\int_0^2 (x^2+2x)\\,dx=$", latex: "\\left[\\frac{x^3}{3}+x^2\\right]_0^2", answer: "20/3", difficulty: 3, acceptedAnswers: ["6.67", "6.6666666667"], hint: "$\\frac83+4$.", explanation: "$\\frac83+4=\\frac{20}{3}$." },
  { id: "definite-p-6", prompt: "$\\int_0^3 f(x)\\,dx$ where $F(3)=18$, $F(0)=7$:", latex: "F(3)-F(0)", answer: "11", difficulty: 2, acceptedAnswers: ["11 units"], hint: "$18-7$.", explanation: "$18-7=11$." },
  { id: "definite-p-7", prompt: "A student computes $F(a)-F(b)$. The mistake is:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "they reversed the bound order" }, { label: "B", text: "they forgot $+C$" }, { label: "C", text: "they found total area" }, { label: "D", text: "they used a table" }], hint: "It should be $F(b)-F(a)$.", explanation: "Definite integral is upper minus lower." },
  { id: "definite-p-8", prompt: "Should an evaluated definite integral include $+C$?", latex: "\\text{Choose one}", answer: "D", difficulty: 1, choices: [{ label: "A", text: "yes, always" }, { label: "B", text: "only if negative" }, { label: "C", text: "only for area" }, { label: "D", text: "no — it is a number" }], hint: "$C$ cancels.", explanation: "$C$ cancels in $F(b)-F(a)$." },
  { id: "definite-p-9", prompt: "$\\int_1^2 (2x+1)\\,dx=$", latex: "[x^2+x]_1^2", answer: "4", difficulty: 2, acceptedAnswers: ["4 units"], hint: "$(4+2)-(1+1)$.", explanation: "$6-2=4$." },
  { id: "definite-p-10", prompt: "$\\int_0^1 (3x^2)\\,dx=$", latex: "[x^3]_0^1", answer: "1", difficulty: 1, acceptedAnswers: ["1 unit"], hint: "$1-0$.", explanation: "$[x^3]_0^1=1$." },
  { id: "definite-p-11", prompt: "$\\int_2^4 3\\,dx=$", latex: "[3x]_2^4", answer: "6", difficulty: 2, acceptedAnswers: ["6 units"], hint: "$12-6$.", explanation: "$[3x]_2^4=12-6=6$." },
  { id: "definite-p-12", prompt: "$\\int_0^2 (6x^2-2x)\\,dx=$", latex: "[2x^3-x^2]_0^2", answer: "12", difficulty: 3, acceptedAnswers: ["12 units"], hint: "$16-4$.", explanation: "$[2x^3-x^2]_0^2=16-4=12$." },
  { id: "definite-p-13", prompt: "$\\int_1^2 x^3\\,dx=$", latex: "\\left[\\frac{x^4}{4}\\right]_1^2", answer: "15/4", difficulty: 3, acceptedAnswers: ["3.75"], hint: "$\\frac{16-1}{4}$.", explanation: "$\\frac{16}{4}-\\frac14=\\frac{15}{4}$." },
  { id: "definite-p-14", prompt: "$\\int_{-2}^{2} x^2\\,dx=$", latex: "\\left[\\frac{x^3}{3}\\right]_{-2}^{2}", answer: "16/3", difficulty: 3, acceptedAnswers: ["5.33", "5.3333333333"], hint: "$\\frac{8}{3}-\\frac{-8}{3}$.", explanation: "$\\frac83-(-\\frac83)=\\frac{16}{3}$." },
  { id: "definite-p-15", prompt: "$\\int_0^3 (x^2-3x)\\,dx=$", latex: "\\left[\\frac{x^3}{3}-\\frac{3x^2}{2}\\right]_0^3", answer: "-9/2", difficulty: 4, acceptedAnswers: ["-4.5", "−9/2", "−4.5"], hint: "$9-\\frac{27}{2}$.", explanation: "$9-13.5=-4.5=-\\frac92$." },
  { id: "definite-p-16", prompt: "$\\int_{-1}^{1} (3x^2+1)\\,dx=$", latex: "[x^3+x]_{-1}^{1}", answer: "4", difficulty: 3, acceptedAnswers: ["4 units"], hint: "$(1+1)-(-1-1)$.", explanation: "$2-(-2)=4$." },
  { id: "definite-p-17", prompt: "Signed areas are $6$ above and $9$ below the axis. The definite integral is:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$15$" }, { label: "B", text: "$3$" }, { label: "C", text: "$-3$" }, { label: "D", text: "$-15$" }], hint: "Below counts negative.", explanation: "$6-9=-3$." },
  { id: "definite-p-18", prompt: "$\\int_2^5 f(x)\\,dx$ given $F(5)=18$, $F(2)=7$:", latex: "F(5)-F(2)", answer: "11", difficulty: 2, acceptedAnswers: ["11 units"], hint: "$18-7$.", explanation: "$11$." },
  { id: "definite-p-19", prompt: "$\\int_3^1 2x\\,dx=$ (note bound order)", latex: "[x^2]_3^1", answer: "-8", difficulty: 4, acceptedAnswers: ["−8", "-8 units"], hint: "$1-9$.", explanation: "$[x^2]_3^1=1-9=-8$ (reversed bounds negate)." },
  { id: "definite-p-20", prompt: "$\\int_0^4 (2x-3)\\,dx=$", latex: "[x^2-3x]_0^4", answer: "4", difficulty: 3, acceptedAnswers: ["4 units"], hint: "$16-12$.", explanation: "$[x^2-3x]_0^4=16-12=4$." },
  { id: "definite-p-21", prompt: "$\\int_1^4 \\sqrt{x}\\,dx=$", latex: "\\left[\\frac{2}{3}x^{3/2}\\right]_1^4", answer: "14/3", difficulty: 5, acceptedAnswers: ["4.67", "4.6666666667"], hint: "$\\frac23(8-1)$.", explanation: "$\\frac23(4^{3/2}-1)=\\frac23(8-1)=\\frac{14}{3}$." },
  { id: "definite-p-22", prompt: "$\\int_1^2 \\frac{1}{x^2}\\,dx=$", latex: "\\left[-\\frac1x\\right]_1^2", answer: "1/2", difficulty: 5, acceptedAnswers: ["0.5"], hint: "$-\\frac12-(-1)$.", explanation: "$-\\frac12+1=\\frac12$." },
  { id: "definite-p-23", prompt: "$\\int_0^2 (x^3-4x)\\,dx=$", latex: "\\left[\\frac{x^4}{4}-2x^2\\right]_0^2", answer: "-4", difficulty: 5, acceptedAnswers: ["−4", "-4 units"], hint: "$4-8$.", explanation: "$\\frac{16}{4}-2(4)=4-8=-4$." },
  { id: "definite-p-24", prompt: "Given $\\int_0^2 f(x)\\,dx=5$ and $\\int_2^6 f(x)\\,dx=3$, find $\\int_0^6 f(x)\\,dx$.", latex: "5+3", answer: "8", difficulty: 4, acceptedAnswers: ["8 units"], hint: "Add adjacent intervals.", explanation: "$\\int_0^6=\\int_0^2+\\int_2^6=5+3=8$." },
  { id: "definite-p-25", prompt: "Given $\\int_0^5 f(x)\\,dx=12$ and $\\int_0^2 f(x)\\,dx=4$, find $\\int_2^5 f(x)\\,dx$.", latex: "12-4", answer: "8", difficulty: 5, acceptedAnswers: ["8 units"], hint: "Subtract.", explanation: "$\\int_2^5=\\int_0^5-\\int_0^2=12-4=8$." },
  { id: "definite-p-26", prompt: "$\\int_{-3}^{3} x^3\\,dx=$ (odd function)", latex: "\\left[\\frac{x^4}{4}\\right]_{-3}^{3}", answer: "0", difficulty: 4, acceptedAnswers: ["0 units"], hint: "$\\frac{81}{4}-\\frac{81}{4}$.", explanation: "Odd function over a symmetric interval gives $0$." },
  { id: "definite-p-27", prompt: "$\\int_0^1 (4x^3+3x^2)\\,dx=$", latex: "[x^4+x^3]_0^1", answer: "2", difficulty: 3, acceptedAnswers: ["2 units"], hint: "$1+1$.", explanation: "$[x^4+x^3]_0^1=1+1=2$." },
  { id: "definite-p-28", prompt: "$\\int_2^3 (6x-4)\\,dx=$", latex: "[3x^2-4x]_2^3", answer: "11", difficulty: 4, acceptedAnswers: ["11 units"], hint: "$(27-12)-(12-8)$.", explanation: "$(27-12)-(12-8)=15-4=11$." },
  { id: "definite-p-29", prompt: "$\\int_0^2 (3x^2-6x+2)\\,dx=$", latex: "[x^3-3x^2+2x]_0^2", answer: "0", difficulty: 5, acceptedAnswers: ["0 units"], hint: "$8-12+4$.", explanation: "$8-12+4=0$." },
  { id: "definite-p-30", prompt: "Why does the constant $C$ not affect a definite integral?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$(F(b)+C)-(F(a)+C)$ cancels $C$" }, { label: "B", text: "$C$ is always zero" }, { label: "C", text: "definite integrals ignore antiderivatives" }, { label: "D", text: "$C$ becomes the answer" }], hint: "$C$ appears in both terms.", explanation: "$C$ cancels in the subtraction." },
];

definiteIntegralsFundamentalTheoremLesson.multiPartPractice = [
  {
    id: "definite-mp-1",
    prompt: "Let $f(x)=3x^2-6x$.",
    latex: "f(x)=3x^2-6x",
    answer: "-4",
    hint: "An antiderivative is $F(x)=x^3-3x^2$; evaluate $F(b)-F(a)$ for each interval.",
    explanation:
      "Using $F(x)=x^3-3x^2$: (a) $\\int_0^2 f\\,dx=F(2)-F(0)=(8-12)-0=-4$. (b) $\\int_2^3 f\\,dx=F(3)-F(2)=(27-27)-(8-12)=0-(-4)=4$. (c) $\\int_0^3 f\\,dx=F(3)-F(0)=0-0=0$ (which is also $-4+4$).",
    parts: [
      { key: "a", label: "(a)", prompt: "Evaluate $\\int_0^2 (3x^2-6x)\\,dx$.", latex: "[x^3-3x^2]_0^2", marks: 2, answer: "-4", acceptedAnswers: ["−4", "-4 units"], hint: "$F(2)=8-12$.", explanation: "$(8-12)-0=-4$." },
      { key: "b", label: "(b)", prompt: "Evaluate $\\int_2^3 (3x^2-6x)\\,dx$.", latex: "[x^3-3x^2]_2^3", marks: 2, answer: "4", acceptedAnswers: ["4 units"], hint: "$F(3)=27-27=0$.", explanation: "$0-(-4)=4$." },
      { key: "c", label: "(c)", prompt: "Hence evaluate $\\int_0^3 (3x^2-6x)\\,dx$.", latex: "(-4)+4", marks: 1, answer: "0", acceptedAnswers: ["0 units"], hint: "Add (a) and (b).", explanation: "$-4+4=0$." },
    ],
  },
];

signedAreaTotalAreaLesson.masteryQuizPool = [
  { id: "signed-p-1", prompt: "By default a definite integral gives:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "total area" }, { label: "B", text: "signed area" }, { label: "C", text: "always positive area" }, { label: "D", text: "the $x$-intercept" }], hint: "Below-axis is negative.", explanation: "A definite integral gives signed area." },
  { id: "signed-p-2", prompt: "Where should total area be split for $y=x-3$ on $[0,5]$?", latex: "y=x-3", answer: "3", difficulty: 2, acceptedAnswers: ["x=3"], hint: "Set $y=0$.", explanation: "$x-3=0$ at $x=3$." },
  { id: "signed-p-3", prompt: "Total area requires splitting when:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "the curve crosses the $x$-axis inside the interval" }, { label: "B", text: "$+C$ appears" }, { label: "C", text: "the area is above the axis" }, { label: "D", text: "never" }], hint: "Sign change.", explanation: "Split where $f$ changes sign." },
  { id: "signed-p-4", prompt: "Signed area on the first piece $\\int_0^3 (x-3)\\,dx=$", latex: "\\left[\\frac{x^2}{2}-3x\\right]_0^3", answer: "-9/2", difficulty: 3, acceptedAnswers: ["-4.5", "−9/2", "−4.5"], hint: "$\\frac92-9$.", explanation: "$\\frac92-9=-\\frac92$." },
  { id: "signed-p-5", prompt: "Signed pieces are $-\\frac92$ and $2$. The total area is:", latex: "\\left|-\\tfrac92\\right|+|2|", answer: "13/2", difficulty: 3, acceptedAnswers: ["6.5"], hint: "Add magnitudes.", explanation: "$\\frac92+2=\\frac{13}{2}$." },
  { id: "signed-p-6", prompt: "Total area of $y=x-4$ on $[0,2]$ (all below axis):", latex: "\\left|\\int_0^2(x-4)\\,dx\\right|", answer: "6", difficulty: 3, acceptedAnswers: ["6 square units", "6 units^2"], hint: "$\\int_0^2(x-4)=2-8=-6$.", explanation: "Signed $=-6$; area $=6$." },
  { id: "signed-p-7", prompt: "A student reports total area $=-6$. The issue is:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "they used $+C$" }, { label: "B", text: "they reversed $x$ and $y$" }, { label: "C", text: "total area cannot be negative" }, { label: "D", text: "too many bounds" }], hint: "Area is non-negative.", explanation: "Total geometric area is $\\ge 0$." },
  { id: "signed-p-8", prompt: "Best plan when the curve crosses the axis (for total area):", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "use one integral, keep the sign" }, { label: "B", text: "differentiate" }, { label: "C", text: "ignore the intercept" }, { label: "D", text: "split and add absolute values" }], hint: "Each piece counts positively.", explanation: "Split at the crossing, add magnitudes." },
  { id: "signed-p-9", prompt: "Pieces $\\int_0^2 f=-4$, $\\int_2^5 f=7$. Total area is:", latex: "|-4|+|7|", answer: "11", difficulty: 3, acceptedAnswers: ["11 square units", "11 units^2"], hint: "Add magnitudes.", explanation: "$4+7=11$." },
  { id: "signed-p-10", prompt: "Pieces $\\int_0^2 f=-4$, $\\int_2^5 f=7$. The definite integral $\\int_0^5 f$ is:", latex: "-4+7", answer: "3", difficulty: 3, acceptedAnswers: ["3 units"], hint: "Add signed values.", explanation: "$-4+7=3$." },
  { id: "signed-p-11", prompt: "Equal positive and negative signed areas mean:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "total area is zero" }, { label: "B", text: "signed area is zero but total area may be positive" }, { label: "C", text: "there is no graph" }, { label: "D", text: "the function is constant" }], hint: "Cancellation.", explanation: "Signed pieces cancel; total area can be positive." },
  { id: "signed-p-12", prompt: "$y=x^2-4$ crosses the $x$-axis at:", latex: "x^2-4=0", answer: "-2,2", difficulty: 2, acceptedAnswers: ["2,-2", "x=-2,2", "-2 and 2", "−2,2"], hint: "Solve $x^2=4$.", explanation: "$x=\\pm 2$." },
  { id: "signed-p-13", prompt: "Total area of $y=x^2-4$ on $[0,2]$:", latex: "\\left|\\int_0^2(x^2-4)\\,dx\\right|", answer: "16/3", difficulty: 4, acceptedAnswers: ["5.33", "5.3333333333"], hint: "$\\int_0^2(x^2-4)=\\frac83-8=-\\frac{16}{3}$.", explanation: "Signed $=-\\frac{16}{3}$; area $=\\frac{16}{3}$." },
  { id: "signed-p-14", prompt: "Signed area $\\int_0^4 (x-2)\\,dx=$", latex: "\\left[\\frac{x^2}{2}-2x\\right]_0^4", answer: "0", difficulty: 4, acceptedAnswers: ["0 units"], hint: "$8-8$.", explanation: "$8-8=0$ (equal areas cancel)." },
  { id: "signed-p-15", prompt: "Total area of $y=x-2$ on $[0,4]$:", latex: "|\\int_0^2|+|\\int_2^4|", answer: "4", difficulty: 4, acceptedAnswers: ["4 square units", "4 units^2"], hint: "Each triangle has area $2$.", explanation: "$\\int_0^2(x-2)=-2$, $\\int_2^4(x-2)=2$; total $=2+2=4$." },
  { id: "signed-p-16", prompt: "$\\int_2^5 f(x)\\,dx=-4$ tells us about the region on $[2,5]$:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "it lies above the axis" }, { label: "B", text: "it lies below the axis, area $4$" }, { label: "C", text: "area is $-4$" }, { label: "D", text: "no region exists" }], hint: "Negative signed area.", explanation: "Below the axis; area $=4$." },
  { id: "signed-p-17", prompt: "Total area of $y=x^2-1$ on $[0,2]$:", latex: "|\\int_0^1|+|\\int_1^2|", answer: "2", difficulty: 5, acceptedAnswers: ["2 square units", "2 units^2"], hint: "Split at $x=1$.", explanation: "$\\int_0^1(x^2-1)=\\frac13-1=-\\frac23$; $\\int_1^2(x^2-1)=(\\frac83-2)-(\\frac13-1)=\\frac23-(-\\frac23)=\\frac43$. Total $=\\frac23+\\frac43=2$." },
  { id: "signed-p-18", prompt: "Where does $y=x^3-x$ cross the axis on $[-1,1]$?", latex: "x^3-x=0", answer: "-1,0,1", difficulty: 3, acceptedAnswers: ["0,-1,1", "x=-1,0,1", "−1,0,1"], hint: "$x(x^2-1)=0$.", explanation: "$x=-1,0,1$." },
  { id: "signed-p-19", prompt: "$\\int_{-1}^{1} (x^3-x)\\,dx=$ (signed)", latex: "\\left[\\frac{x^4}{4}-\\frac{x^2}{2}\\right]_{-1}^{1}", answer: "0", difficulty: 4, acceptedAnswers: ["0 units"], hint: "Odd function, symmetric interval.", explanation: "$0$ (signed areas cancel)." },
  { id: "signed-p-20", prompt: "Total area of $y=4-x^2$ on $[0,3]$ (crosses at $x=2$):", latex: "|\\int_0^2|+|\\int_2^3|", answer: "23/3", difficulty: 5, acceptedAnswers: ["7.67", "7.6666666667"], hint: "$\\int_0^2(4-x^2)=8-\\frac83=\\frac{16}{3}$; $\\int_2^3(4-x^2)=(12-9)-(8-\\frac83)=3-\\frac{16}{3}=-\\frac73$.", explanation: "Area $=\\frac{16}{3}+\\frac73=\\frac{23}{3}$." },
  { id: "signed-p-21", prompt: "Total distance idea: pieces with signed areas $-5$ and $8$ give total magnitude:", latex: "|-5|+|8|", answer: "13", difficulty: 3, acceptedAnswers: ["13 units"], hint: "Add magnitudes.", explanation: "$5+8=13$." },
  { id: "signed-p-22", prompt: "If $\\int_a^b f=0$ but $f$ is not identically zero, then:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "positive and negative areas balanced" }, { label: "B", text: "$f$ must be constant" }, { label: "C", text: "the interval is a point" }, { label: "D", text: "total area is zero" }], hint: "Cancellation.", explanation: "Equal above/below areas cancel." },
  { id: "signed-p-23", prompt: "Total area of $y=x-1$ on $[0,3]$:", latex: "|\\int_0^1|+|\\int_1^3|", answer: "5/2", difficulty: 4, acceptedAnswers: ["2.5"], hint: "$\\int_0^1(x-1)=-\\frac12$; $\\int_1^3(x-1)=2$.", explanation: "$\\frac12+2=\\frac52$." },
  { id: "signed-p-24", prompt: "For $y=x^2-9$ on $[0,4]$, the split point is:", latex: "x^2-9=0,\\ x\\ge0", answer: "3", difficulty: 3, acceptedAnswers: ["x=3"], hint: "$x^2=9$.", explanation: "$x=3$ inside $[0,4]$." },
  { id: "signed-p-25", prompt: "Total area of $y=x^2-9$ on $[0,4]$:", latex: "|\\int_0^3|+|\\int_3^4|", answer: "64/3", difficulty: 5, acceptedAnswers: ["21.33", "21.3333333333"], hint: "$\\int_0^3(x^2-9)=9-27=-18$; $\\int_3^4(x^2-9)=(\\frac{64}{3}-36)-(9-27)=-\\frac{44}{3}+18=\\frac{10}{3}$.", explanation: "Area $=18+\\frac{10}{3}=\\frac{64}{3}$." },
  { id: "signed-p-26", prompt: "A signed area of $0$ over $[a,b]$ means the total geometric area is:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "always $0$" }, { label: "B", text: "negative" }, { label: "C", text: "$0$ or positive, depending on the graph" }, { label: "D", text: "undefined" }], hint: "Could be cancellation.", explanation: "Zero signed area can hide a positive total area." },
  { id: "signed-p-27", prompt: "Total area of $y=2x-6$ on $[0,5]$ (crosses at $x=3$):", latex: "|\\int_0^3|+|\\int_3^5|", answer: "13", difficulty: 5, acceptedAnswers: ["13 square units", "13 units^2"], hint: "$\\int_0^3(2x-6)=9-18=-9$; $\\int_3^5(2x-6)=(25-30)-(9-18)=-5+9=4$.", explanation: "Area $=9+4=13$." },
  { id: "signed-p-28", prompt: "Pieces $\\int_0^1 f=2$, $\\int_1^3 f=-5$, $\\int_3^4 f=1$. Total area:", latex: "|2|+|-5|+|1|", answer: "8", difficulty: 4, acceptedAnswers: ["8 square units", "8 units^2"], hint: "Add magnitudes.", explanation: "$2+5+1=8$." },
  { id: "signed-p-29", prompt: "Pieces $\\int_0^1 f=2$, $\\int_1^3 f=-5$, $\\int_3^4 f=1$. Definite integral $\\int_0^4 f$:", latex: "2+(-5)+1", answer: "-2", difficulty: 4, acceptedAnswers: ["−2", "-2 units"], hint: "Add signed values.", explanation: "$2-5+1=-2$." },
  { id: "signed-p-30", prompt: "Total area of $y=x^2-2x$ on $[0,3]$ (crosses at $x=2$):", latex: "|\\int_0^2|+|\\int_2^3|", answer: "8/3", difficulty: 5, acceptedAnswers: ["2.67", "2.6666666667"], hint: "$\\int_0^2(x^2-2x)=\\frac83-4=-\\frac43$; $\\int_2^3(x^2-2x)=(9-9)-(\\frac83-4)=0+\\frac43=\\frac43$.", explanation: "Area $=\\frac43+\\frac43=\\frac83$." },
];

signedAreaTotalAreaLesson.multiPartPractice = [
  {
    id: "signed-mp-1",
    prompt: "The curve $y=x^2-4$ is considered on the interval $0\\le x\\le 3$. It crosses the $x$-axis at $x=2$.",
    latex: "y=x^2-4",
    answer: "2",
    hint: "Split at $x=2$, compute the signed integral on each piece, then add magnitudes for total area.",
    explanation:
      "(a) $\\int_0^2 (x^2-4)\\,dx=\\frac83-8=-\\frac{16}{3}$. (b) $\\int_2^3 (x^2-4)\\,dx=(9-12)-(\\frac83-8)=-3+\\frac{16}{3}=\\frac73$. (c) Total area $=\\frac{16}{3}+\\frac73=\\frac{23}{3}$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find $\\int_0^2 (x^2-4)\\,dx$.", latex: "\\left[\\frac{x^3}{3}-4x\\right]_0^2", marks: 2, answer: "-16/3", acceptedAnswers: ["−16/3", "-5.33", "−5.33", "-5.3333333333"], hint: "$\\frac83-8$.", explanation: "$\\frac83-8=-\\frac{16}{3}$." },
      { key: "b", label: "(b)", prompt: "Find $\\int_2^3 (x^2-4)\\,dx$.", latex: "\\left[\\frac{x^3}{3}-4x\\right]_2^3", marks: 2, answer: "7/3", acceptedAnswers: ["2.33", "2.3333333333"], hint: "$(9-12)-(\\frac83-8)$.", explanation: "$-3-(-\\frac{16}{3})=\\frac73$." },
      { key: "c", label: "(c)", prompt: "Find the total area between the curve and the $x$-axis on $0\\le x\\le 3$.", latex: "\\frac{16}{3}+\\frac{7}{3}", marks: 2, answer: "23/3", acceptedAnswers: ["7.67", "7.6666666667"], hint: "Add the magnitudes.", explanation: "$\\frac{16}{3}+\\frac73=\\frac{23}{3}$." },
    ],
  },
];

areaUnderCurveLesson.masteryQuizPool = [
  { id: "area-p-1", prompt: "Setup for area under a positive curve $y=x^2+1$ on $[0,2]$:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\int_2^0(x^2+1)\\,dx$" }, { label: "B", text: "$\\int_0^2(x^2+1)\\,dx$" }, { label: "C", text: "$\\int_0^2(x^2-1)\\,dx$" }, { label: "D", text: "$\\int(x^2+1)\\,dx+C$" }], hint: "Lower bound first.", explanation: "$\\int_0^2(x^2+1)\\,dx$." },
  { id: "area-p-2", prompt: "Area under $y=x^2+1$ on $[0,2]$:", latex: "\\int_0^2 (x^2+1)\\,dx", answer: "14/3", difficulty: 2, acceptedAnswers: ["4.67", "4.6666666667"], hint: "$\\frac83+2$.", explanation: "$\\frac83+2=\\frac{14}{3}$." },
  { id: "area-p-3", prompt: "Area between $y=-2x$ and the $x$-axis on $[0,3]$ (below axis):", latex: "\\left|\\int_0^3(-2x)\\,dx\\right|", answer: "9", difficulty: 3, acceptedAnswers: ["9 square units", "9 units^2"], hint: "$\\int_0^3(-2x)=-9$.", explanation: "Signed $=-9$; area $=9$." },
  { id: "area-p-4", prompt: "Area under $y=4-x$ on $[0,4]$:", latex: "\\int_0^4 (4-x)\\,dx", answer: "8", difficulty: 2, acceptedAnswers: ["8 square units", "8 units^2"], hint: "$16-8$.", explanation: "$[4x-\\frac{x^2}{2}]_0^4=16-8=8$." },
  { id: "area-p-5", prompt: "Area under $y=9-x^2$ on $[0,3]$:", latex: "\\int_0^3 (9-x^2)\\,dx", answer: "18", difficulty: 3, acceptedAnswers: ["18 square units", "18 units^2"], hint: "$27-9$.", explanation: "$[9x-\\frac{x^3}{3}]_0^3=27-9=18$." },
  { id: "area-p-6", prompt: "Area between $y=x-5$ and axis on $[0,2]$ (below axis):", latex: "\\left|\\int_0^2(x-5)\\,dx\\right|", answer: "8", difficulty: 3, acceptedAnswers: ["8 square units", "8 units^2"], hint: "$\\int_0^2(x-5)=2-10=-8$.", explanation: "Signed $=-8$; area $=8$." },
  { id: "area-p-7", prompt: "If $x,y$ are in metres, area is measured in:", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "metres" }, { label: "B", text: "metres per second" }, { label: "C", text: "square metres" }, { label: "D", text: "seconds" }], hint: "Area units.", explanation: "Square metres." },
  { id: "area-p-8", prompt: "A definite integral for a below-axis curve gives $-8$. The geometric area is:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$8$" }, { label: "B", text: "$-8$" }, { label: "C", text: "$0$" }, { label: "D", text: "cannot be found" }], hint: "Take magnitude.", explanation: "Area $=|-8|=8$." },
  { id: "area-p-9", prompt: "Total area between $y=x-1$ and axis on $[0,3]$ (crosses at $x=1$):", latex: "|\\int_0^1|+|\\int_1^3|", answer: "5/2", difficulty: 4, acceptedAnswers: ["2.5"], hint: "$\\int_0^1(x-1)=-\\frac12$, $\\int_1^3(x-1)=2$.", explanation: "$\\frac12+2=\\frac52$." },
  { id: "area-p-10", prompt: "When a curve crosses the axis inside the interval, total area requires:", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "one definite integral" }, { label: "B", text: "adding $+C$" }, { label: "C", text: "reversing bounds" }, { label: "D", text: "splitting at the crossing and adding positive areas" }], hint: "Sign change.", explanation: "Split and add magnitudes." },
  { id: "area-p-11", prompt: "Area under $y=x^2$ on $[0,3]$:", latex: "\\int_0^3 x^2\\,dx", answer: "9", difficulty: 2, acceptedAnswers: ["9 square units", "9 units^2"], hint: "$\\frac{27}{3}$.", explanation: "$[\\frac{x^3}{3}]_0^3=9$." },
  { id: "area-p-12", prompt: "Area under $y=2x+1$ on $[0,3]$:", latex: "\\int_0^3 (2x+1)\\,dx", answer: "12", difficulty: 2, acceptedAnswers: ["12 square units", "12 units^2"], hint: "$9+3$.", explanation: "$[x^2+x]_0^3=9+3=12$." },
  { id: "area-p-13", prompt: "Area under $y=3x^2$ on $[1,2]$:", latex: "\\int_1^2 3x^2\\,dx", answer: "7", difficulty: 3, acceptedAnswers: ["7 square units", "7 units^2"], hint: "$8-1$.", explanation: "$[x^3]_1^2=8-1=7$." },
  { id: "area-p-14", prompt: "Area under $y=\\sqrt{x}$ on $[0,4]$:", latex: "\\int_0^4 x^{1/2}\\,dx", answer: "16/3", difficulty: 4, acceptedAnswers: ["5.33", "5.3333333333"], hint: "$\\frac23\\cdot 8$.", explanation: "$[\\frac23 x^{3/2}]_0^4=\\frac23\\cdot 8=\\frac{16}{3}$." },
  { id: "area-p-15", prompt: "Area under $y=6-2x$ on $[0,3]$:", latex: "\\int_0^3 (6-2x)\\,dx", answer: "9", difficulty: 3, acceptedAnswers: ["9 square units", "9 units^2"], hint: "$18-9$.", explanation: "$[6x-x^2]_0^3=18-9=9$." },
  { id: "area-p-16", prompt: "Area under $y=x^3$ on $[0,2]$:", latex: "\\int_0^2 x^3\\,dx", answer: "4", difficulty: 3, acceptedAnswers: ["4 square units", "4 units^2"], hint: "$\\frac{16}{4}$.", explanation: "$[\\frac{x^4}{4}]_0^2=4$." },
  { id: "area-p-17", prompt: "Area between $y=x^2-4$ and axis on $[0,2]$ (all below):", latex: "\\left|\\int_0^2(x^2-4)\\,dx\\right|", answer: "16/3", difficulty: 4, acceptedAnswers: ["5.33", "5.3333333333"], hint: "$\\int_0^2(x^2-4)=\\frac83-8$.", explanation: "Signed $=-\\frac{16}{3}$; area $=\\frac{16}{3}$." },
  { id: "area-p-18", prompt: "Area under $y=\\frac{1}{x^2}$ on $[1,2]$:", latex: "\\int_1^2 x^{-2}\\,dx", answer: "1/2", difficulty: 4, acceptedAnswers: ["0.5"], hint: "$-\\frac12-(-1)$.", explanation: "$[-\\frac1x]_1^2=-\\frac12+1=\\frac12$." },
  { id: "area-p-19", prompt: "Total area between $y=x-2$ and axis on $[0,4]$ (crosses at $x=2$):", latex: "|\\int_0^2|+|\\int_2^4|", answer: "4", difficulty: 4, acceptedAnswers: ["4 square units", "4 units^2"], hint: "Two triangles each area $2$.", explanation: "$2+2=4$." },
  { id: "area-p-20", prompt: "Area under $y=12-3x^2$ on $[0,2]$:", latex: "\\int_0^2 (12-3x^2)\\,dx", answer: "16", difficulty: 4, acceptedAnswers: ["16 square units", "16 units^2"], hint: "$24-8$.", explanation: "$[12x-x^3]_0^2=24-8=16$." },
  { id: "area-p-21", prompt: "Total area between $y=x^2-9$ and axis on $[0,4]$ (crosses at $x=3$):", latex: "|\\int_0^3|+|\\int_3^4|", answer: "64/3", difficulty: 5, acceptedAnswers: ["21.33", "21.3333333333"], hint: "$\\int_0^3(x^2-9)=-18$; $\\int_3^4(x^2-9)=\\frac{10}{3}$.", explanation: "Area $=18+\\frac{10}{3}=\\frac{64}{3}$." },
  { id: "area-p-22", prompt: "Area under $y=4x-x^2$ between its $x$-intercepts:", latex: "\\int_0^4 (4x-x^2)\\,dx", answer: "32/3", difficulty: 5, acceptedAnswers: ["10.67", "10.6666666667"], hint: "Intercepts at $0,4$; $32-\\frac{64}{3}$.", explanation: "$[2x^2-\\frac{x^3}{3}]_0^4=32-\\frac{64}{3}=\\frac{32}{3}$." },
  { id: "area-p-23", prompt: "Area under $y=x^2+2x$ on $[0,2]$:", latex: "\\int_0^2 (x^2+2x)\\,dx", answer: "20/3", difficulty: 4, acceptedAnswers: ["6.67", "6.6666666667"], hint: "$\\frac83+4$.", explanation: "$[\\frac{x^3}{3}+x^2]_0^2=\\frac83+4=\\frac{20}{3}$." },
  { id: "area-p-24", prompt: "Total area between $y=9-x^2$ and axis on $[0,4]$ (crosses at $x=3$):", latex: "|\\int_0^3|+|\\int_3^4|", answer: "64/3", difficulty: 5, acceptedAnswers: ["21.33", "21.3333333333"], hint: "$\\int_0^3(9-x^2)=18$; $\\int_3^4(9-x^2)=-\\frac{10}{3}$.", explanation: "Area $=18+\\frac{10}{3}=\\frac{64}{3}$." },
  { id: "area-p-25", prompt: "Area under $y=e^x$ on $[0,1]$ ($e\\approx 2.718$, 3 d.p.):", latex: "\\int_0^1 e^x\\,dx", answer: "1.718", difficulty: 4, acceptedAnswers: ["e-1", "1.72"], hint: "$e-1$.", explanation: "$[e^x]_0^1=e-1\\approx 1.718$." },
  { id: "area-p-26", prompt: "Area under $y=x^2$ on $[1,3]$:", latex: "\\int_1^3 x^2\\,dx", answer: "26/3", difficulty: 3, acceptedAnswers: ["8.67", "8.6666666667"], hint: "$\\frac{27}{3}-\\frac13$.", explanation: "$[\\frac{x^3}{3}]_1^3=9-\\frac13=\\frac{26}{3}$." },
  { id: "area-p-27", prompt: "Total area between $y=x^3-4x$ and axis on $[0,2]$ (crosses at $x=2$):", latex: "\\left|\\int_0^2(x^3-4x)\\,dx\\right|", answer: "4", difficulty: 5, acceptedAnswers: ["4 square units", "4 units^2"], hint: "On $(0,2)$ the curve stays below axis; $\\int_0^2(x^3-4x)=4-8=-4$.", explanation: "Signed $=-4$; area $=4$." },
  { id: "area-p-28", prompt: "Area under $y=2-x$ on $[0,2]$:", latex: "\\int_0^2 (2-x)\\,dx", answer: "2", difficulty: 2, acceptedAnswers: ["2 square units", "2 units^2"], hint: "$4-2$.", explanation: "$[2x-\\frac{x^2}{2}]_0^2=4-2=2$." },
  { id: "area-p-29", prompt: "Area enclosed by $y=x(4-x)$ and the $x$-axis:", latex: "\\int_0^4 (4x-x^2)\\,dx", answer: "32/3", difficulty: 5, acceptedAnswers: ["10.67", "10.6666666667"], hint: "Intercepts at $0,4$.", explanation: "$\\frac{32}{3}$." },
  { id: "area-p-30", prompt: "Area under $y=3x^2+2$ on $[0,2]$:", latex: "\\int_0^2 (3x^2+2)\\,dx", answer: "12", difficulty: 3, acceptedAnswers: ["12 square units", "12 units^2"], hint: "$8+4$.", explanation: "$[x^3+2x]_0^2=8+4=12$." },
];

areaUnderCurveLesson.multiPartPractice = [
  {
    id: "area-mp-1",
    prompt: "The curve $y=x(4-x)=4x-x^2$ meets the $x$-axis at $x=0$ and $x=4$.",
    latex: "y=4x-x^2",
    answer: "0",
    hint: "Find the intercepts, then integrate between them; on $[0,4]$ the curve is above the axis.",
    explanation:
      "(a) The smaller $x$-intercept is at $x=0$. (b) The area enclosed is $\\int_0^4 (4x-x^2)\\,dx=[2x^2-\\frac{x^3}{3}]_0^4=32-\\frac{64}{3}=\\frac{32}{3}$. (c) The area from $x=0$ to $x=2$ is $[2x^2-\\frac{x^3}{3}]_0^2=8-\\frac83=\\frac{16}{3}$, exactly half by symmetry about $x=2$.",
    parts: [
      { key: "a", label: "(a)", prompt: "State the smaller $x$-intercept of the curve.", latex: "x(4-x)=0", marks: 1, answer: "0", hint: "Solve $x(4-x)=0$.", explanation: "$x=0$ or $x=4$; the smaller is $0$." },
      { key: "b", label: "(b)", prompt: "Find the total area enclosed between the curve and the $x$-axis.", latex: "\\int_0^4 (4x-x^2)\\,dx", marks: 3, answer: "32/3", acceptedAnswers: ["10.67", "10.6666666667"], hint: "$32-\\frac{64}{3}$.", explanation: "$32-\\frac{64}{3}=\\frac{32}{3}$." },
      { key: "c", label: "(c)", prompt: "Find the area between the curve and the $x$-axis from $x=0$ to $x=2$.", latex: "\\int_0^2 (4x-x^2)\\,dx", marks: 2, answer: "16/3", acceptedAnswers: ["5.33", "5.3333333333"], hint: "$8-\\frac83$.", explanation: "$8-\\frac83=\\frac{16}{3}$ (half of (b))." },
    ],
  },
];

trapezoidalRuleAreaApproximationLesson.masteryQuizPool = [
  { id: "trap-p-1", prompt: "Find the strip width $h$ for $a=1$, $b=9$, $n=4$.", latex: "h=\\frac{b-a}{n}", answer: "2", difficulty: 1, acceptedAnswers: ["h=2"], hint: "$\\frac{9-1}{4}$.", explanation: "$h=\\frac{8}{4}=2$." },
  { id: "trap-p-2", prompt: "In $\\frac h2[y_0+2(y_1+y_2+y_3)+y_4]$, which values are doubled?", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$y_0$ and $y_4$" }, { label: "B", text: "$y_1,y_2,y_3$" }, { label: "C", text: "all five" }, { label: "D", text: "none" }], hint: "Interior values.", explanation: "Interior ordinates are doubled." },
  { id: "trap-p-3", prompt: "Trapezoidal estimate with $h=1$ and $y$-values $2,5,10$:", latex: "\\frac{1}{2}[2+2(5)+10]", answer: "11", difficulty: 2, acceptedAnswers: ["11 square units", "11 units^2"], hint: "$\\frac12(2+10+10)$.", explanation: "$\\frac12(22)=11$." },
  { id: "trap-p-4", prompt: "Trapezoidal estimate with $h=2$ and $y$-values $3,4,8,9$:", latex: "\\frac{2}{2}[3+2(4+8)+9]", answer: "36", difficulty: 3, acceptedAnswers: ["36 square units", "36 units^2"], hint: "$1\\times(3+24+9)$.", explanation: "$1\\times 36=36$." },
  { id: "trap-p-5", prompt: "Estimate area under $y=x^2+1$, $h=1$, ordinates $1,2,5,10$:", latex: "\\frac{1}{2}[1+2(2+5)+10]", answer: "12.5", difficulty: 3, acceptedAnswers: ["12.5 square units", "25/2"], hint: "$\\frac12(1+14+10)$.", explanation: "$\\frac12(25)=12.5$." },
  { id: "trap-p-6", prompt: "Flow rates $2,6,8$ L/min at $h=5$ min — total amount:", latex: "\\frac{5}{2}[2+2(6)+8]", answer: "55", difficulty: 3, acceptedAnswers: ["55 L", "55 litres", "55 liters"], hint: "$\\frac52(2+12+8)$.", explanation: "$\\frac52(22)=55$." },
  { id: "trap-p-7", prompt: "For a curved graph the Trapezoidal rule usually gives:", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "an exact derivative" }, { label: "B", text: "a family of primitives" }, { label: "C", text: "an approximation" }, { label: "D", text: "a signed $x$-intercept" }], hint: "Trapezia.", explanation: "It approximates the area." },
  { id: "trap-p-8", prompt: "A student doubles the first and last ordinates. The mistake is:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "only interior values should be doubled" }, { label: "B", text: "all values should be squared" }, { label: "C", text: "the width should be ignored" }, { label: "D", text: "$+C$ is needed" }], hint: "Ends counted once.", explanation: "End ordinates are counted once." },
  { id: "trap-p-9", prompt: "$x$-values $x_0,\\ldots,x_6$ over $[0,12]$: find $h$.", latex: "h=\\frac{12-0}{6}", answer: "2", difficulty: 2, acceptedAnswers: ["h=2"], hint: "6 strips.", explanation: "$h=\\frac{12}{6}=2$." },
  { id: "trap-p-10", prompt: "Velocity in m/s sampled every second, estimated by the rule. The displacement estimate is in:", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "m/s" }, { label: "B", text: "seconds" }, { label: "C", text: "square metres" }, { label: "D", text: "metres" }], hint: "Velocity $\\times$ time.", explanation: "Metres." },
  { id: "trap-p-11", prompt: "Trapezoidal estimate with $h=3$ and ordinates $0,4,4,0$:", latex: "\\frac{3}{2}[0+2(4+4)+0]", answer: "24", difficulty: 3, acceptedAnswers: ["24 square units", "24 units^2"], hint: "$\\frac32(0+16+0)$.", explanation: "$\\frac32(16)=24$." },
  { id: "trap-p-12", prompt: "Trapezoidal estimate with $h=0.5$ and ordinates $1,3,5$:", latex: "\\frac{0.5}{2}[1+2(3)+5]", answer: "3", difficulty: 3, acceptedAnswers: ["3 square units", "3 units^2"], hint: "$0.25(1+6+5)$.", explanation: "$0.25(12)=3$." },
  { id: "trap-p-13", prompt: "Estimate $\\int_0^4 x^2\\,dx$ with $h=1$, ordinates $0,1,4,9,16$:", latex: "\\frac{1}{2}[0+2(1+4+9)+16]", answer: "22", difficulty: 4, acceptedAnswers: ["22 square units", "22 units^2"], hint: "$\\frac12(0+28+16)$.", explanation: "$\\frac12(44)=22$." },
  { id: "trap-p-14", prompt: "Two strips, $h=2$, ordinates $5,7,5$ — estimate:", latex: "\\frac{2}{2}[5+2(7)+5]", answer: "24", difficulty: 3, acceptedAnswers: ["24 square units", "24 units^2"], hint: "$1(5+14+5)$.", explanation: "$24$." },
  { id: "trap-p-15", prompt: "Estimate $\\int_1^3 \\frac1x\\,dx$ with $h=1$, ordinates $1,0.5,0.333$ (3 d.p.):", latex: "\\frac{1}{2}[1+2(0.5)+0.333]", answer: "1.167", difficulty: 4, acceptedAnswers: ["1.17"], hint: "$\\frac12(1+1+0.333)$.", explanation: "$\\frac12(2.333)\\approx 1.167$." },
  { id: "trap-p-16", prompt: "Number of strips when there are 5 ordinates:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "5" }, { label: "B", text: "4" }, { label: "C", text: "6" }, { label: "D", text: "3" }], hint: "Strips $=$ ordinates $-1$.", explanation: "$5-1=4$ strips." },
  { id: "trap-p-17", prompt: "Estimate with $h=10$ and ordinates $20,30,40,30$:", latex: "\\frac{10}{2}[20+2(30+40)+30]", answer: "950", difficulty: 4, acceptedAnswers: ["950 square units", "950 units^2"], hint: "$5(20+140+30)$.", explanation: "$5(190)=950$." },
  { id: "trap-p-18", prompt: "For a concave-up curve the trapezoidal rule tends to:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "overestimate the area" }, { label: "B", text: "underestimate the area" }, { label: "C", text: "give the exact area" }, { label: "D", text: "give zero" }], hint: "Trapezia sit above a concave-up curve.", explanation: "Concave-up curves are overestimated." },
  { id: "trap-p-19", prompt: "Estimate with $h=2$, ordinates $1,4,9,16,25$:", latex: "\\frac{2}{2}[1+2(4+9+16)+25]", answer: "84", difficulty: 4, acceptedAnswers: ["84 square units", "84 units^2"], hint: "$1(1+58+25)$.", explanation: "$1(84)=84$." },
  { id: "trap-p-20", prompt: "Speed (m/s) every 2 s: $0,8,12,10,0$. Distance estimate ($h=2$):", latex: "\\frac{2}{2}[0+2(8+12+10)+0]", answer: "60", difficulty: 4, acceptedAnswers: ["60 m", "60 metres"], hint: "$1(0+60+0)$.", explanation: "$60$ m." },
  { id: "trap-p-21", prompt: "Estimate $\\int_0^2 e^x\\,dx$ with $h=1$, ordinates $1,2.718,7.389$ (3 d.p.):", latex: "\\frac{1}{2}[1+2(2.718)+7.389]", answer: "6.912", difficulty: 5, acceptedAnswers: ["6.91"], hint: "$\\frac12(1+5.436+7.389)$.", explanation: "$\\frac12(13.825)\\approx 6.912$." },
  { id: "trap-p-22", prompt: "Estimate with $h=3$, ordinates $2,5,8,11$:", latex: "\\frac{3}{2}[2+2(5+8)+11]", answer: "58.5", difficulty: 4, acceptedAnswers: ["58.5 square units", "117/2"], hint: "$\\frac32(2+26+11)$.", explanation: "$\\frac32(39)=58.5$." },
  { id: "trap-p-23", prompt: "Estimate $\\int_0^6 f\\,dx$, $h=1.5$, ordinates $4,6,7,6,4$:", latex: "\\frac{1.5}{2}[4+2(6+7+6)+4]", answer: "34.5", difficulty: 5, acceptedAnswers: ["34.5 square units", "69/2"], hint: "$0.75(4+38+4)$.", explanation: "$0.75(46)=34.5$." },
  { id: "trap-p-24", prompt: "Estimate with $h=4$, ordinates $10,15,10$:", latex: "\\frac{4}{2}[10+2(15)+10]", answer: "100", difficulty: 3, acceptedAnswers: ["100 square units", "100 units^2"], hint: "$2(10+30+10)$.", explanation: "$2(50)=100$." },
  { id: "trap-p-25", prompt: "Estimate $\\int_2^8 g\\,dx$, $h=2$, ordinates $3,5,4,2$:", latex: "\\frac{2}{2}[3+2(5+4)+2]", answer: "23", difficulty: 4, acceptedAnswers: ["23 square units", "23 units^2"], hint: "$1(3+18+2)$.", explanation: "$1(23)=23$." },
  { id: "trap-p-26", prompt: "Two-ordinate trapezoidal rule with $h=4$, $y_0=3$, $y_1=7$:", latex: "\\frac{4}{2}[3+7]", answer: "20", difficulty: 2, acceptedAnswers: ["20 square units", "20 units^2"], hint: "Single trapezium $\\frac h2(y_0+y_1)$.", explanation: "$2(10)=20$." },
  { id: "trap-p-27", prompt: "Estimate with $h=5$, ordinates $0,12,16,12,0$:", latex: "\\frac{5}{2}[0+2(12+16+12)+0]", answer: "200", difficulty: 5, acceptedAnswers: ["200 square units", "200 units^2"], hint: "$\\frac52(0+80+0)$.", explanation: "$\\frac52(80)=200$." },
  { id: "trap-p-28", prompt: "Rainfall rate (mm/h) each hour $0,2,5,3$, $h=1$. Total rainfall estimate:", latex: "\\frac{1}{2}[0+2(2+5)+3]", answer: "8.5", difficulty: 4, acceptedAnswers: ["8.5 mm", "17/2"], hint: "$\\frac12(0+14+3)$.", explanation: "$\\frac12(17)=8.5$ mm." },
  { id: "trap-p-29", prompt: "Estimate $\\int_0^8 f\\,dx$, $h=2$, ordinates $1,3,5,7,9$:", latex: "\\frac{2}{2}[1+2(3+5+7)+9]", answer: "40", difficulty: 4, acceptedAnswers: ["40 square units", "40 units^2"], hint: "$1(1+30+9)$.", explanation: "$1(40)=40$." },
  { id: "trap-p-30", prompt: "Estimate with $h=0.25$, ordinates $4,4.2,4.5$ (2 d.p.):", latex: "\\frac{0.25}{2}[4+2(4.2)+4.5]", answer: "2.11", difficulty: 5, acceptedAnswers: ["2.1125"], hint: "$0.125(4+8.4+4.5)$.", explanation: "$0.125(16.9)=2.1125\\approx 2.11$." },
];

trapezoidalRuleAreaApproximationLesson.multiPartPractice = [
  {
    id: "trap-mp-1",
    prompt: "A car's speed (in m/s) is recorded every 2 seconds over a 6-second interval: at $t=0,2,4,6$ the speeds are $0,8,12,6$.",
    latex: "v:\\ 0,\\ 8,\\ 12,\\ 6",
    answer: "2",
    hint: "Use $h$ from the time spacing and apply the Trapezoidal rule with the recorded speeds as ordinates.",
    explanation:
      "(a) $h=2$ s. (b) Distance $\\approx\\frac{2}{2}[0+2(8+12)+6]=1\\times(0+40+6)=46$ m. (c) Over only the first 4 seconds ($t=0,2,4$): $\\frac{2}{2}[0+2(8)+12]=1\\times 28=28$ m.",
    parts: [
      { key: "a", label: "(a)", prompt: "State the time step $h$ (in seconds).", latex: "h", marks: 1, answer: "2", acceptedAnswers: ["2 s", "2 seconds"], hint: "Spacing between readings.", explanation: "$h=2$ s." },
      { key: "b", label: "(b)", prompt: "Estimate the distance travelled over the 6 seconds, in metres.", latex: "\\frac{2}{2}[0+2(8+12)+6]", marks: 3, answer: "46", acceptedAnswers: ["46 m", "46 metres"], hint: "$1\\times(0+40+6)$.", explanation: "$1\\times 46=46$ m." },
      { key: "c", label: "(c)", prompt: "Estimate the distance travelled over only the first 4 seconds, in metres.", latex: "\\frac{2}{2}[0+2(8)+12]", marks: 2, answer: "28", acceptedAnswers: ["28 m", "28 metres"], hint: "Use ordinates $0,8,12$.", explanation: "$1\\times(0+16+12)=28$ m." },
    ],
  },
];

areaBetweenTwoCurvesLesson.masteryQuizPool = [
  { id: "between-p-1", prompt: "Setup for area between curves (top $f$, bottom $g$):", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\int_a^b(f(x)-g(x))\\,dx$" }, { label: "B", text: "$\\int_a^b(g(x)-f(x))\\,dx$" }, { label: "C", text: "$\\int_a^b(f(x)+g(x))\\,dx$" }, { label: "D", text: "$\\int f'(x)\\,dx$" }], hint: "Top minus bottom.", explanation: "$\\int_a^b(f-g)\\,dx$." },
  { id: "between-p-2", prompt: "Which curve is on top on $[0,2]$: $y=5$ or $y=x^2$?", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$y=x^2$" }, { label: "B", text: "$y=5$" }, { label: "C", text: "neither" }, { label: "D", text: "both switch" }], hint: "$x^2\\le 4<5$.", explanation: "$y=5$ is above on $[0,2]$." },
  { id: "between-p-3", prompt: "Area between $y=5$ and $y=x^2$ on $[0,2]$:", latex: "\\int_0^2 (5-x^2)\\,dx", answer: "22/3", difficulty: 3, acceptedAnswers: ["7.33", "7.3333333333"], hint: "$10-\\frac83$.", explanation: "$[5x-\\frac{x^3}{3}]_0^2=10-\\frac83=\\frac{22}{3}$." },
  { id: "between-p-4", prompt: "Area between $y=2x+1$ and $y=x$ on $[0,3]$:", latex: "\\int_0^3 ((2x+1)-x)\\,dx", answer: "15/2", difficulty: 3, acceptedAnswers: ["7.5"], hint: "$\\int_0^3(x+1)$.", explanation: "$[\\frac{x^2}{2}+x]_0^3=\\frac92+3=\\frac{15}{2}$." },
  { id: "between-p-5", prompt: "Intersection $x$-values of $y=x^2$ and $y=4$:", latex: "x^2=4", answer: "-2,2", difficulty: 2, acceptedAnswers: ["2,-2", "x=-2,2", "-2 and 2", "−2,2"], hint: "$x^2=4$.", explanation: "$x=\\pm 2$." },
  { id: "between-p-6", prompt: "Area enclosed between $y=4$ and $y=x^2$ on $[-2,2]$:", latex: "\\int_{-2}^{2} (4-x^2)\\,dx", answer: "32/3", difficulty: 4, acceptedAnswers: ["10.67", "10.6666666667"], hint: "$[4x-\\frac{x^3}{3}]_{-2}^{2}$.", explanation: "$(8-\\frac83)-(-8+\\frac83)=\\frac{16}{3}+\\frac{16}{3}=\\frac{32}{3}$." },
  { id: "between-p-7", prompt: "A student computes bottom minus top and gets a negative answer. The issue is:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "they forgot $+C$" }, { label: "B", text: "too many intersections" }, { label: "C", text: "they reversed top and bottom" }, { label: "D", text: "they used the Trapezoidal rule" }], hint: "Top minus bottom.", explanation: "Reversed order gives a negative; swap them." },
  { id: "between-p-8", prompt: "If two curves cross inside the interval and swap order, you should:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "add $+C$" }, { label: "B", text: "split the interval at the crossing" }, { label: "C", text: "use one top curve anyway" }, { label: "D", text: "differentiate both curves" }], hint: "Top/bottom changes.", explanation: "Split where they cross." },
  { id: "between-p-9", prompt: "Revenue $R(x)=8x$ above cost $C(x)=3x+10$ on $[2,5]$. Area between:", latex: "\\int_2^5 ((8x)-(3x+10))\\,dx", answer: "45/2", difficulty: 4, acceptedAnswers: ["22.5"], hint: "$\\int_2^5(5x-10)$.", explanation: "$[\\frac{5x^2}{2}-10x]_2^5=(62.5-50)-(10-20)=12.5+10=22.5$." },
  { id: "between-p-10", prompt: "Setup for area between $y=x$ and $y=x^2$ on $[0,1]$ ($x$ above $x^2$):", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$\\int_0^1(x^2-x)\\,dx$" }, { label: "B", text: "$\\int_1^0(x-x^2)\\,dx$" }, { label: "C", text: "$\\int_0^1(x+x^2)\\,dx$" }, { label: "D", text: "$\\int_0^1(x-x^2)\\,dx$" }], hint: "Top minus bottom.", explanation: "$\\int_0^1(x-x^2)\\,dx$." },
  { id: "between-p-11", prompt: "Area between $y=x$ and $y=x^2$ on $[0,1]$:", latex: "\\int_0^1 (x-x^2)\\,dx", answer: "1/6", difficulty: 3, acceptedAnswers: ["0.17", "0.1666666667"], hint: "$\\frac12-\\frac13$.", explanation: "$\\frac12-\\frac13=\\frac16$." },
  { id: "between-p-12", prompt: "Intersections of $y=x^2$ and $y=2x$:", latex: "x^2=2x", answer: "0,2", difficulty: 2, acceptedAnswers: ["2,0", "x=0,2", "0 and 2"], hint: "$x^2-2x=0$.", explanation: "$x(x-2)=0$, so $x=0,2$." },
  { id: "between-p-13", prompt: "Area between $y=2x$ and $y=x^2$ on $[0,2]$:", latex: "\\int_0^2 (2x-x^2)\\,dx", answer: "4/3", difficulty: 4, acceptedAnswers: ["1.33", "1.3333333333"], hint: "$4-\\frac83$.", explanation: "$[x^2-\\frac{x^3}{3}]_0^2=4-\\frac83=\\frac43$." },
  { id: "between-p-14", prompt: "Intersections of $y=6-x^2$ and $y=x$:", latex: "6-x^2=x", answer: "-3,2", difficulty: 3, acceptedAnswers: ["2,-3", "x=-3,2", "−3,2"], hint: "$x^2+x-6=0$.", explanation: "$(x+3)(x-2)=0$, so $x=-3,2$." },
  { id: "between-p-15", prompt: "Area between $y=x+6$ and $y=x^2$ on $[-2,3]$ (line above):", latex: "\\int_{-2}^{3} ((x+6)-x^2)\\,dx", answer: "125/6", difficulty: 5, acceptedAnswers: ["20.83", "20.8333333333"], hint: "$\\int(x+6-x^2)$; intersections at $-2,3$.", explanation: "$[\\frac{x^2}{2}+6x-\\frac{x^3}{3}]_{-2}^{3}=\\frac{125}{6}$." },
  { id: "between-p-16", prompt: "Area between $y=x^2$ and $y=8-x^2$ on $[-2,2]$:", latex: "\\int_{-2}^{2} ((8-x^2)-x^2)\\,dx", answer: "64/3", difficulty: 5, acceptedAnswers: ["21.33", "21.3333333333"], hint: "$\\int_{-2}^{2}(8-2x^2)$.", explanation: "$[8x-\\frac{2x^3}{3}]_{-2}^{2}=(16-\\frac{16}{3})-(-16+\\frac{16}{3})=\\frac{64}{3}$." },
  { id: "between-p-17", prompt: "Area between $y=3$ and $y=x^2-1$ on $[-2,2]$:", latex: "\\int_{-2}^{2} (3-(x^2-1))\\,dx", answer: "32/3", difficulty: 4, acceptedAnswers: ["10.67", "10.6666666667"], hint: "$\\int_{-2}^{2}(4-x^2)$.", explanation: "$\\int_{-2}^{2}(4-x^2)=\\frac{32}{3}$." },
  { id: "between-p-18", prompt: "Which is on top between $y=x^3$ and $y=x$ on $(0,1)$?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$y=x^3$" }, { label: "B", text: "$y=x$" }, { label: "C", text: "they are equal" }, { label: "D", text: "$y=x^3$ then $y=x$" }], hint: "Test $x=0.5$.", explanation: "$0.5>0.125$, so $y=x$ is above." },
  { id: "between-p-19", prompt: "Area between $y=x$ and $y=x^3$ on $[0,1]$:", latex: "\\int_0^1 (x-x^3)\\,dx", answer: "1/4", difficulty: 4, acceptedAnswers: ["0.25"], hint: "$\\frac12-\\frac14$.", explanation: "$\\frac12-\\frac14=\\frac14$." },
  { id: "between-p-20", prompt: "Area between $y=4-x^2$ and $y=x^2-4$ on $[-2,2]$:", latex: "\\int_{-2}^{2} ((4-x^2)-(x^2-4))\\,dx", answer: "64/3", difficulty: 5, acceptedAnswers: ["21.33", "21.3333333333"], hint: "$\\int_{-2}^{2}(8-2x^2)$.", explanation: "$[8x-\\frac{2x^3}{3}]_{-2}^{2}=\\frac{64}{3}$." },
  { id: "between-p-21", prompt: "Intersections of $y=x^2-2x$ and $y=0$:", latex: "x^2-2x=0", answer: "0,2", difficulty: 2, acceptedAnswers: ["2,0", "x=0,2", "0 and 2"], hint: "$x(x-2)=0$.", explanation: "$x=0,2$." },
  { id: "between-p-22", prompt: "Area between $y=2x+3$ and $y=x^2$, which meet at $x=-1$ and $x=3$:", latex: "\\int_{-1}^{3} ((2x+3)-x^2)\\,dx", answer: "32/3", difficulty: 5, acceptedAnswers: ["10.67", "10.6666666667"], hint: "$2x+3=x^2\\Rightarrow x=-1,3$.", explanation: "$[x^2+3x-\\frac{x^3}{3}]_{-1}^{3}=\\frac{32}{3}$." },
  { id: "between-p-23", prompt: "Area between $y=10$ and $y=2x$ on $[0,4]$:", latex: "\\int_0^4 (10-2x)\\,dx", answer: "24", difficulty: 3, acceptedAnswers: ["24 square units", "24 units^2"], hint: "$40-16$.", explanation: "$[10x-x^2]_0^4=40-16=24$." },
  { id: "between-p-24", prompt: "Area between $y=x^2+1$ and $y=x$ on $[0,2]$ ($x^2+1$ above):", latex: "\\int_0^2 ((x^2+1)-x)\\,dx", answer: "8/3", difficulty: 4, acceptedAnswers: ["2.67", "2.6666666667"], hint: "$\\int_0^2(x^2-x+1)$.", explanation: "$[\\frac{x^3}{3}-\\frac{x^2}{2}+x]_0^2=\\frac83-2+2=\\frac83$." },
  { id: "between-p-25", prompt: "Area between $y=9-x^2$ and $y=5$ on the interval where $9-x^2\\ge 5$ (i.e. $[-2,2]$):", latex: "\\int_{-2}^{2} ((9-x^2)-5)\\,dx", answer: "32/3", difficulty: 5, acceptedAnswers: ["10.67", "10.6666666667"], hint: "$\\int_{-2}^{2}(4-x^2)$.", explanation: "$\\frac{32}{3}$." },
  { id: "between-p-26", prompt: "Area between $y=x^2$ and $y=4x$ on $[0,4]$:", latex: "\\int_0^4 (4x-x^2)\\,dx", answer: "32/3", difficulty: 4, acceptedAnswers: ["10.67", "10.6666666667"], hint: "$32-\\frac{64}{3}$.", explanation: "$[2x^2-\\frac{x^3}{3}]_0^4=32-\\frac{64}{3}=\\frac{32}{3}$." },
  { id: "between-p-27", prompt: "Two cost models meet at $x=1$ and $x=4$. To find the area between them you integrate over:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$[0,4]$" }, { label: "B", text: "$[1,4]$ (between the intersections)" }, { label: "C", text: "$[0,1]$" }, { label: "D", text: "all real $x$" }], hint: "Use the intersection $x$-values as limits.", explanation: "Integrate between the intersection points." },
  { id: "between-p-28", prompt: "Area between $y=x+2$ and $y=x^2$ on $[-1,2]$ (line above):", latex: "\\int_{-1}^{2} ((x+2)-x^2)\\,dx", answer: "9/2", difficulty: 5, acceptedAnswers: ["4.5"], hint: "Intersections at $-1,2$.", explanation: "$[\\frac{x^2}{2}+2x-\\frac{x^3}{3}]_{-1}^{2}=\\frac92$." },
  { id: "between-p-29", prompt: "Area between $y=6x$ and $y=3x^2$ on $[0,2]$ ($6x$ above):", latex: "\\int_0^2 (6x-3x^2)\\,dx", answer: "4", difficulty: 4, acceptedAnswers: ["4 square units", "4 units^2"], hint: "$12-8$.", explanation: "$[3x^2-x^3]_0^2=12-8=4$." },
  { id: "between-p-30", prompt: "Area between $y=8-x^2$ and $y=2x$ (parabola above), which meet at $x=-4$ and $x=2$:", latex: "\\int_{-4}^{2} ((8-x^2)-2x)\\,dx", answer: "36", difficulty: 5, acceptedAnswers: ["36 square units", "36 units^2"], hint: "$8-x^2=2x\\Rightarrow x=-4,2$.", explanation: "$[8x-\\frac{x^3}{3}-x^2]_{-4}^{2}=36$." },
];

areaBetweenTwoCurvesLesson.multiPartPractice = [
  {
    id: "between-mp-1",
    prompt: "The curves $y=x^2$ and $y=2x$ enclose a region.",
    latex: "y=x^2,\\ y=2x",
    answer: "2",
    hint: "Find the intersection points first, decide which curve is on top, then integrate top minus bottom between them.",
    explanation:
      "(a) $x^2=2x\\Rightarrow x(x-2)=0$, so the larger intersection is $x=2$. (b) On $(0,2)$, $2x\\ge x^2$, so the enclosed area is $\\int_0^2 (2x-x^2)\\,dx=[x^2-\\frac{x^3}{3}]_0^2=4-\\frac83=\\frac43$. (c) From $x=0$ to $x=1$ the area is $[x^2-\\frac{x^3}{3}]_0^1=1-\\frac13=\\frac23$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the larger $x$-coordinate where the curves intersect.", latex: "x^2=2x", marks: 1, answer: "2", hint: "Solve $x(x-2)=0$.", explanation: "$x=0$ or $x=2$; the larger is $2$." },
      { key: "b", label: "(b)", prompt: "Find the total area enclosed between the two curves.", latex: "\\int_0^2 (2x-x^2)\\,dx", marks: 3, answer: "4/3", acceptedAnswers: ["1.33", "1.3333333333"], hint: "$4-\\frac83$.", explanation: "$4-\\frac83=\\frac43$." },
      { key: "c", label: "(c)", prompt: "Find the area between the two curves from $x=0$ to $x=1$.", latex: "\\int_0^1 (2x-x^2)\\,dx", marks: 2, answer: "2/3", acceptedAnswers: ["0.67", "0.6666666667"], hint: "$1-\\frac13$.", explanation: "$1-\\frac13=\\frac23$." },
    ],
  },
];

applicationsTotalChangeMotionLesson.masteryQuizPool = [
  { id: "apps-p-1", prompt: "Integrating a rate over an interval gives:", latex: "\\int_a^b R(t)\\,dt", answer: "A", difficulty: 1, choices: [{ label: "A", text: "the net change in the quantity" }, { label: "B", text: "the instantaneous rate" }, { label: "C", text: "the derivative of $R$" }, { label: "D", text: "always the total distance" }], hint: "Accumulated rate.", explanation: "It gives net change." },
  { id: "apps-p-2", prompt: "Displacement of a particle: $\\int_0^2 (3t^2-4t)\\,dt$:", latex: "[t^3-2t^2]_0^2", answer: "0", difficulty: 3, acceptedAnswers: ["0 m", "0 metres"], hint: "$8-8$.", explanation: "$[t^3-2t^2]_0^2=8-8=0$." },
  { id: "apps-p-3", prompt: "Total water added: $\\int_0^4 (2t+5)\\,dt$ L:", latex: "[t^2+5t]_0^4", answer: "36", difficulty: 2, acceptedAnswers: ["36 L", "36 litres", "36 liters"], hint: "$16+20$.", explanation: "$16+20=36$ L." },
  { id: "apps-p-4", prompt: "Net change: $\\int_1^3 (6t-4)\\,dt$:", latex: "[3t^2-4t]_1^3", answer: "16", difficulty: 3, acceptedAnswers: ["16 units"], hint: "$(27-12)-(3-4)$.", explanation: "$15-(-1)=16$." },
  { id: "apps-p-5", prompt: "Velocity changes sign at $t=2$; signed displacements are $-4$ and $9$. Total distance:", latex: "|-4|+|9|", answer: "13", difficulty: 4, acceptedAnswers: ["13 m", "13 metres"], hint: "Add magnitudes.", explanation: "$4+9=13$ m." },
  { id: "apps-p-6", prompt: "Total cost change: $\\int_0^5 (4x+10)\\,dx$:", latex: "[2x^2+10x]_0^5", answer: "100", difficulty: 3, acceptedAnswers: ["$100", "100 dollars"], hint: "$50+50$.", explanation: "$50+50=100$." },
  { id: "apps-p-7", prompt: "When velocity changes sign, which is correct?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "displacement and distance are always equal" }, { label: "B", text: "distance requires splitting or absolute values" }, { label: "C", text: "displacement cannot be negative" }, { label: "D", text: "the integral is impossible" }], hint: "Distance counts all motion.", explanation: "Total distance adds magnitudes of each piece." },
  { id: "apps-p-8", prompt: "Units for water added from a rate in L/min over minutes:", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "litres per minute" }, { label: "B", text: "minutes" }, { label: "C", text: "litres" }, { label: "D", text: "square litres" }], hint: "Rate $\\times$ time.", explanation: "Litres." },
  { id: "apps-p-9", prompt: "Population increase: $\\int_0^5 (6t+10)\\,dt$:", latex: "[3t^2+10t]_0^5", answer: "125", difficulty: 3, acceptedAnswers: ["125 people"], hint: "$75+50$.", explanation: "$75+50=125$." },
  { id: "apps-p-10", prompt: "A displacement integral equals $0$ but the object moved. Most likely:", latex: "\\int_a^b v\\,dt=0", answer: "D", difficulty: 3, choices: [{ label: "A", text: "the object did not move" }, { label: "B", text: "total distance is zero" }, { label: "C", text: "velocity was never negative" }, { label: "D", text: "positive and negative displacements cancelled" }], hint: "Net vs total.", explanation: "Equal forward/back motion cancels in displacement." },
  { id: "apps-p-11", prompt: "Displacement: $\\int_0^3 (2t-2)\\,dt$:", latex: "[t^2-2t]_0^3", answer: "3", difficulty: 3, acceptedAnswers: ["3 m", "3 metres"], hint: "$9-6$.", explanation: "$9-6=3$ m." },
  { id: "apps-p-12", prompt: "Velocity $v(t)=2t-2$ changes sign at:", latex: "2t-2=0", answer: "1", difficulty: 2, acceptedAnswers: ["t=1"], hint: "$v=0$.", explanation: "$t=1$." },
  { id: "apps-p-13", prompt: "For $v(t)=2t-2$ on $[0,3]$, displacement from $0$ to $1$ is:", latex: "[t^2-2t]_0^1", answer: "-1", difficulty: 4, acceptedAnswers: ["−1", "-1 m", "−1 m"], hint: "$1-2$.", explanation: "$1-2=-1$ m." },
  { id: "apps-p-14", prompt: "For $v(t)=2t-2$ on $[0,3]$, displacement from $1$ to $3$ is:", latex: "[t^2-2t]_1^3", answer: "4", difficulty: 4, acceptedAnswers: ["4 m", "4 metres"], hint: "$(9-6)-(1-2)$.", explanation: "$3-(-1)=4$ m." },
  { id: "apps-p-15", prompt: "For $v(t)=2t-2$ on $[0,3]$, total distance travelled is:", latex: "|-1|+|4|", answer: "5", difficulty: 5, acceptedAnswers: ["5 m", "5 metres"], hint: "Add magnitudes of the two pieces.", explanation: "$1+4=5$ m (displacement was $3$ m)." },
  { id: "apps-p-16", prompt: "Net displacement for $v(t)=2t-2$ on $[0,3]$:", latex: "[t^2-2t]_0^3", answer: "3", difficulty: 3, acceptedAnswers: ["3 m", "3 metres"], hint: "$9-6$.", explanation: "$3$ m." },
  { id: "apps-p-17", prompt: "Water flows in at $R(t)=t^2$ L/min for $0\\le t\\le 3$. Total water:", latex: "\\int_0^3 t^2\\,dt", answer: "9", difficulty: 3, acceptedAnswers: ["9 L", "9 litres", "9 liters"], hint: "$\\frac{27}{3}$.", explanation: "$[\\frac{t^3}{3}]_0^3=9$ L." },
  { id: "apps-p-18", prompt: "A tank drains at $R(t)=-(4-t)$ L/min for $0\\le t\\le 4$. Net change in volume:", latex: "\\int_0^4 -(4-t)\\,dt", answer: "-8", difficulty: 4, acceptedAnswers: ["−8", "-8 L", "−8 L"], hint: "$\\int_0^4 (t-4)$.", explanation: "$[\\frac{t^2}{2}-4t]_0^4=8-16=-8$ L." },
  { id: "apps-p-19", prompt: "$v(t)=t^2-4$ (m/s) changes sign at:", latex: "t^2-4=0,\\ t\\ge0", answer: "2", difficulty: 2, acceptedAnswers: ["t=2"], hint: "$t^2=4$.", explanation: "$t=2$." },
  { id: "apps-p-20", prompt: "$v(t)=t^2-4$ on $[0,2]$: displacement is:", latex: "\\left[\\frac{t^3}{3}-4t\\right]_0^2", answer: "-16/3", difficulty: 4, acceptedAnswers: ["−16/3", "-5.33", "−5.33"], hint: "$\\frac83-8$.", explanation: "$\\frac83-8=-\\frac{16}{3}$ m." },
  { id: "apps-p-21", prompt: "$v(t)=t^2-4$ on $[2,3]$: displacement is:", latex: "\\left[\\frac{t^3}{3}-4t\\right]_2^3", answer: "7/3", difficulty: 5, acceptedAnswers: ["2.33", "2.3333333333"], hint: "$(9-12)-(\\frac83-8)$.", explanation: "$-3-(-\\frac{16}{3})=\\frac73$ m." },
  { id: "apps-p-22", prompt: "$v(t)=t^2-4$ on $[0,3]$: total distance travelled:", latex: "\\frac{16}{3}+\\frac{7}{3}", answer: "23/3", difficulty: 5, acceptedAnswers: ["7.67", "7.6666666667"], hint: "Add magnitudes from $[0,2]$ and $[2,3]$.", explanation: "$\\frac{16}{3}+\\frac73=\\frac{23}{3}$ m." },
  { id: "apps-p-23", prompt: "$v(t)=3-t$ (m/s) on $[0,5]$: net displacement:", latex: "\\left[3t-\\frac{t^2}{2}\\right]_0^5", answer: "5/2", difficulty: 4, acceptedAnswers: ["2.5"], hint: "$15-\\frac{25}{2}$.", explanation: "$15-12.5=2.5$ m." },
  { id: "apps-p-24", prompt: "$v(t)=3-t$ changes sign at $t=3$. Total distance on $[0,5]$:", latex: "|\\int_0^3|+|\\int_3^5|", answer: "13/2", difficulty: 5, acceptedAnswers: ["6.5"], hint: "$\\int_0^3(3-t)=\\frac92$; $\\int_3^5(3-t)=-2$.", explanation: "$\\frac92+2=\\frac{13}{2}$ m." },
  { id: "apps-p-25", prompt: "Marginal cost $C'(x)=3x^2$ ($/unit). Cost of producing units $0$ to $4$:", latex: "\\int_0^4 3x^2\\,dx", answer: "64", difficulty: 3, acceptedAnswers: ["$64", "64 dollars"], hint: "$[x^3]_0^4$.", explanation: "$64-0=64$." },
  { id: "apps-p-26", prompt: "Energy use rate $P(t)=12-2t$ kW over $0\\le t\\le 4$. Total energy (kWh):", latex: "\\int_0^4 (12-2t)\\,dt", answer: "32", difficulty: 4, acceptedAnswers: ["32 kWh"], hint: "$48-16$.", explanation: "$[12t-t^2]_0^4=48-16=32$ kWh." },
  { id: "apps-p-27", prompt: "A ball has $v(t)=10-2t$ (m/s, up positive). Net displacement on $[0,10]$:", latex: "\\left[10t-t^2\\right]_0^{10}", answer: "0", difficulty: 4, acceptedAnswers: ["0 m", "0 metres"], hint: "$100-100$.", explanation: "$100-100=0$ m (returns to start)." },
  { id: "apps-p-28", prompt: "For $v(t)=10-2t$ on $[0,10]$ (sign change at $t=5$): total distance:", latex: "|\\int_0^5|+|\\int_5^{10}|", answer: "50", difficulty: 5, acceptedAnswers: ["50 m", "50 metres"], hint: "$\\int_0^5(10-2t)=25$; $\\int_5^{10}(10-2t)=-25$.", explanation: "$25+25=50$ m." },
  { id: "apps-p-29", prompt: "Rate of change of temperature $T'(t)=6-2t$ °C/h. Net change over $[0,4]$:", latex: "\\int_0^4 (6-2t)\\,dt", answer: "8", difficulty: 4, acceptedAnswers: ["8 °C", "8 degrees"], hint: "$24-16$.", explanation: "$[6t-t^2]_0^4=24-16=8$ °C." },
  { id: "apps-p-30", prompt: "$v(t)=4t-t^2$ (m/s) on $[0,4]$ stays $\\ge0$. Distance equals displacement:", latex: "\\int_0^4 (4t-t^2)\\,dt", answer: "32/3", difficulty: 4, acceptedAnswers: ["10.67", "10.6666666667"], hint: "No sign change on $(0,4)$.", explanation: "$\\frac{32}{3}$ m (distance = displacement)." },
];

applicationsTotalChangeMotionLesson.multiPartPractice = [
  {
    id: "apps-mp-1",
    prompt: "A particle moves with velocity $v(t)=t^2-4$ (in m/s) for $0\\le t\\le 3$. It starts at the origin.",
    latex: "v(t)=t^2-4",
    answer: "2",
    hint: "The velocity changes sign where $v=0$. Compute displacement on each piece, then combine for net displacement and (using magnitudes) total distance.",
    explanation:
      "(a) $v=0$ at $t=2$. (b) Net displacement $=\\int_0^3 (t^2-4)\\,dt=[\\frac{t^3}{3}-4t]_0^3=9-12=-3$ m. (c) On $[0,2]$ displacement is $-\\frac{16}{3}$ m and on $[2,3]$ it is $\\frac73$ m, so total distance $=\\frac{16}{3}+\\frac73=\\frac{23}{3}$ m.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the time $t>0$ at which the velocity is zero.", latex: "t^2-4=0", marks: 1, answer: "2", acceptedAnswers: ["t=2", "2 s"], hint: "$t^2=4$.", explanation: "$t=2$ s." },
      { key: "b", label: "(b)", prompt: "Find the net displacement over $0\\le t\\le 3$, in metres.", latex: "\\int_0^3 (t^2-4)\\,dt", marks: 2, answer: "-3", acceptedAnswers: ["−3", "-3 m", "−3 m"], hint: "$9-12$.", explanation: "$[\\frac{t^3}{3}-4t]_0^3=9-12=-3$ m." },
      { key: "c", label: "(c)", prompt: "Find the total distance travelled over $0\\le t\\le 3$, in metres.", latex: "\\frac{16}{3}+\\frac{7}{3}", marks: 3, answer: "23/3", acceptedAnswers: ["7.67", "7.6666666667"], hint: "Split at $t=2$ and add magnitudes.", explanation: "$\\frac{16}{3}+\\frac73=\\frac{23}{3}$ m." },
    ],
  },
];

mixedIntegralCalculusExamPracticeLesson.masteryQuizPool = [
  { id: "mixed-p-1", prompt: "A derivative $f'(x)$ and one value $f(1)$ are given. The method needed is:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "definite integral only" }, { label: "B", text: "particular primitive (find $C$)" }, { label: "C", text: "Trapezoidal rule" }, { label: "D", text: "area between curves" }], hint: "Use the condition.", explanation: "Integrate, then use $f(1)$ to find $C$." },
  { id: "mixed-p-2", prompt: "Setup for total change of $Q'(t)=5t$ on $[0,2]$:", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\int_0^2 5t\\,dt$" }, { label: "B", text: "$\\int 5t\\,dt+C$" }, { label: "C", text: "$\\int_2^0 5t\\,dt$" }, { label: "D", text: "$5(2)$" }], hint: "Rate over interval.", explanation: "$\\int_0^2 5t\\,dt$." },
  { id: "mixed-p-3", prompt: "$\\int_0^2 (3x^2+1)\\,dx=$", latex: "[x^3+x]_0^2", answer: "10", difficulty: 2, acceptedAnswers: ["10 units"], hint: "$8+2$.", explanation: "$8+2=10$." },
  { id: "mixed-p-4", prompt: "$f'(x)=4x-3$, $f(2)=7$. Find $C$.", latex: "f(x)=2x^2-3x+C", answer: "5", difficulty: 3, acceptedAnswers: ["C=5"], hint: "$7=8-6+C$.", explanation: "$C=5$." },
  { id: "mixed-p-5", prompt: "Total area between $y=x-2$ and the axis on $[0,4]$ (crosses at $x=2$):", latex: "|\\int_0^2|+|\\int_2^4|", answer: "4", difficulty: 3, acceptedAnswers: ["4 square units", "4 units^2"], hint: "Two triangles area $2$ each.", explanation: "$2+2=4$." },
  { id: "mixed-p-6", prompt: "Trapezoidal estimate, $h=2$, ordinates $1,3,5$:", latex: "\\frac{2}{2}[1+2(3)+5]", answer: "12", difficulty: 2, acceptedAnswers: ["12 square units", "12 units^2"], hint: "$1(1+6+5)$.", explanation: "$12$." },
  { id: "mixed-p-7", prompt: "Which expression needs $+C$?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\int_0^2 x^2\\,dx$" }, { label: "B", text: "area under a curve from $0$ to $2$" }, { label: "C", text: "$\\int x^2\\,dx$" }, { label: "D", text: "$\\int_a^b f(x)\\,dx$" }], hint: "Indefinite.", explanation: "Only the indefinite integral." },
  { id: "mixed-p-8", prompt: "Setup for area between $y=x+3$ (top) and $y=x$ on $[0,2]$:", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$\\int_0^2(x-(x+3))\\,dx$" }, { label: "B", text: "$\\int_2^0((x+3)-x)\\,dx$" }, { label: "C", text: "$\\int_0^2(2x+3)\\,dx$" }, { label: "D", text: "$\\int_0^2((x+3)-x)\\,dx$" }], hint: "Top minus bottom.", explanation: "$\\int_0^2((x+3)-x)\\,dx$." },
  { id: "mixed-p-9", prompt: "Pieces $\\int_a^b f=3$, $\\int_b^c f=-5$, $\\int_c^d f=4$. Find $\\int_a^d f$.", latex: "3+(-5)+4", answer: "2", difficulty: 3, acceptedAnswers: ["2 units"], hint: "Add signed values.", explanation: "$3-5+4=2$." },
  { id: "mixed-p-10", prompt: "First move in a mixed exam question:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "start differentiating" }, { label: "B", text: "identify if it asks for primitive, area, approximation, or total change" }, { label: "C", text: "always add $+C$" }, { label: "D", text: "always use the Trapezoidal rule" }], hint: "Read the wording.", explanation: "The wording chooses the method." },
  { id: "mixed-p-11", prompt: "$\\int 12x^3\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$3x^4+C$" }, { label: "B", text: "$4x^4+C$" }, { label: "C", text: "$36x^2+C$" }, { label: "D", text: "$12x^4+C$" }], hint: "$\\frac{12}{4}=3$.", explanation: "$3x^4+C$." },
  { id: "mixed-p-12", prompt: "$\\int_1^2 (4x^3)\\,dx=$", latex: "[x^4]_1^2", answer: "15", difficulty: 3, acceptedAnswers: ["15 units"], hint: "$16-1$.", explanation: "$[x^4]_1^2=16-1=15$." },
  { id: "mixed-p-13", prompt: "Area under $y=x^2+2$ on $[0,3]$:", latex: "\\int_0^3 (x^2+2)\\,dx", answer: "15", difficulty: 3, acceptedAnswers: ["15 square units", "15 units^2"], hint: "$9+6$.", explanation: "$[\\frac{x^3}{3}+2x]_0^3=9+6=15$." },
  { id: "mixed-p-14", prompt: "$v(t)=6t-4$, $s(0)=2$. Find $s(2)$.", latex: "s(t)=3t^2-4t+C", answer: "6", difficulty: 4, acceptedAnswers: ["6 m", "6 metres"], hint: "$C=2$; $s(2)=12-8+2$.", explanation: "$s(t)=3t^2-4t+2$; $s(2)=12-8+2=6$." },
  { id: "mixed-p-15", prompt: "Area between $y=4$ and $y=x^2$ on $[-2,2]$:", latex: "\\int_{-2}^{2} (4-x^2)\\,dx", answer: "32/3", difficulty: 4, acceptedAnswers: ["10.67", "10.6666666667"], hint: "Symmetric.", explanation: "$\\frac{32}{3}$." },
  { id: "mixed-p-16", prompt: "$\\int (3x^2-4x+1)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$x^3-2x^2+x+C$" }, { label: "B", text: "$x^3-4x^2+x+C$" }, { label: "C", text: "$6x-4+C$" }, { label: "D", text: "$x^3-2x^2+1+C$" }], hint: "Integrate each.", explanation: "$x^3-2x^2+x+C$." },
  { id: "mixed-p-17", prompt: "Total water: $\\int_0^4 (3t+2)\\,dt$ L:", latex: "[\\tfrac{3t^2}{2}+2t]_0^4", answer: "32", difficulty: 3, acceptedAnswers: ["32 L", "32 litres"], hint: "$24+8$.", explanation: "$24+8=32$ L." },
  { id: "mixed-p-18", prompt: "Trapezoidal estimate $\\int_0^4 f$, $h=1$, ordinates $2,3,5,8,12$:", latex: "\\frac{1}{2}[2+2(3+5+8)+12]", answer: "23", difficulty: 4, acceptedAnswers: ["23 square units", "23 units^2"], hint: "$\\frac12(2+32+12)$.", explanation: "$\\frac12(46)=23$." },
  { id: "mixed-p-19", prompt: "$v(t)=t-3$ (m/s) on $[0,5]$, sign change at $t=3$. Total distance:", latex: "|\\int_0^3|+|\\int_3^5|", answer: "13/2", difficulty: 5, acceptedAnswers: ["6.5"], hint: "$\\int_0^3(t-3)=-\\frac92$; $\\int_3^5(t-3)=2$.", explanation: "$\\frac92+2=\\frac{13}{2}$ m." },
  { id: "mixed-p-20", prompt: "Area between $y=2x$ and $y=x^2$ on $[0,2]$:", latex: "\\int_0^2 (2x-x^2)\\,dx", answer: "4/3", difficulty: 4, acceptedAnswers: ["1.33", "1.3333333333"], hint: "$4-\\frac83$.", explanation: "$\\frac43$." },
  { id: "mixed-p-21", prompt: "$\\int_0^2 (x^3-2x)\\,dx=$", latex: "\\left[\\frac{x^4}{4}-x^2\\right]_0^2", answer: "0", difficulty: 4, acceptedAnswers: ["0 units"], hint: "$4-4$.", explanation: "$4-4=0$." },
  { id: "mixed-p-22", prompt: "$f'(x)=6x^2$, $f(1)=5$. Find $f(2)$.", latex: "f(x)=2x^3+C", answer: "19", difficulty: 5, acceptedAnswers: ["f(2)=19"], hint: "$5=2+C\\Rightarrow C=3$; $f(2)=16+3$.", explanation: "$C=3$; $f(2)=16+3=19$." },
  { id: "mixed-p-23", prompt: "Total area between $y=x^2-1$ and axis on $[0,2]$ (crosses at $x=1$):", latex: "|\\int_0^1|+|\\int_1^2|", answer: "2", difficulty: 5, acceptedAnswers: ["2 square units", "2 units^2"], hint: "$\\int_0^1(x^2-1)=-\\frac23$; $\\int_1^2(x^2-1)=\\frac43$.", explanation: "$\\frac23+\\frac43=2$." },
  { id: "mixed-p-24", prompt: "$\\int_1^4 \\sqrt{x}\\,dx=$", latex: "\\left[\\frac{2}{3}x^{3/2}\\right]_1^4", answer: "14/3", difficulty: 5, acceptedAnswers: ["4.67", "4.6666666667"], hint: "$\\frac23(8-1)$.", explanation: "$\\frac{14}{3}$." },
  { id: "mixed-p-25", prompt: "Estimate $\\int_0^2 e^x\\,dx$, $h=1$, ordinates $1,2.718,7.389$ (3 d.p.):", latex: "\\frac{1}{2}[1+2(2.718)+7.389]", answer: "6.912", difficulty: 5, acceptedAnswers: ["6.91"], hint: "$\\frac12(1+5.436+7.389)$.", explanation: "$\\approx 6.912$." },
  { id: "mixed-p-26", prompt: "Area between $y=x+6$ and $y=x^2$ on $[-2,3]$:", latex: "\\int_{-2}^{3} ((x+6)-x^2)\\,dx", answer: "125/6", difficulty: 5, acceptedAnswers: ["20.83", "20.8333333333"], hint: "Intersections at $-2,3$.", explanation: "$\\frac{125}{6}$." },
  { id: "mixed-p-27", prompt: "$\\int_0^3 (2x-6)\\,dx=$", latex: "[x^2-6x]_0^3", answer: "-9", difficulty: 4, acceptedAnswers: ["−9", "-9 units"], hint: "$9-18$.", explanation: "$9-18=-9$." },
  { id: "mixed-p-28", prompt: "Population rate $P'(t)=4t+6$ over $[0,5]$. Increase:", latex: "\\int_0^5 (4t+6)\\,dt", answer: "80", difficulty: 4, acceptedAnswers: ["80 people"], hint: "$50+30$.", explanation: "$[2t^2+6t]_0^5=50+30=80$." },
  { id: "mixed-p-29", prompt: "Which needs splitting before integrating for total area?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$y=x^2+1$ on $[0,3]$ (always positive)" }, { label: "B", text: "$y=x^2-4$ on $[0,3]$ (crosses at $x=2$)" }, { label: "C", text: "$y=2x+1$ on $[1,4]$ (always positive)" }, { label: "D", text: "$y=5$ on $[0,2]$" }], hint: "Look for a sign change.", explanation: "$y=x^2-4$ changes sign at $x=2$." },
  { id: "mixed-p-30", prompt: "$\\int_0^2 (6x^2+2x-1)\\,dx=$", latex: "[2x^3+x^2-x]_0^2", answer: "18", difficulty: 4, acceptedAnswers: ["18 units"], hint: "$16+4-2$.", explanation: "$16+4-2=18$." },
];

mixedIntegralCalculusExamPracticeLesson.multiPartPractice = [
  {
    id: "mixed-mp-1",
    prompt: "A particle's velocity is $v(t)=3t^2-12t+9$ (in m/s) for $0\\le t\\le 4$, starting at the origin. Note $v(t)=3(t-1)(t-3)$.",
    latex: "v(t)=3t^2-12t+9",
    answer: "1",
    hint: "Find where the velocity is zero, then integrate to get displacement; net displacement uses the signed integral over the whole interval.",
    explanation:
      "(a) $v=0$ when $3(t-1)(t-3)=0$, so the smaller time is $t=1$. (b) Net displacement $=\\int_0^4 (3t^2-12t+9)\\,dt=[t^3-6t^2+9t]_0^4=64-96+36=4$ m. (c) Displacement over the first second $=\\int_0^1 (3t^2-12t+9)\\,dt=[t^3-6t^2+9t]_0^1=1-6+9=4$ m.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the smaller time $t$ at which the velocity is zero.", latex: "3(t-1)(t-3)=0", marks: 1, answer: "1", acceptedAnswers: ["t=1", "1 s"], hint: "Factors give $t=1,3$.", explanation: "$t=1$ s." },
      { key: "b", label: "(b)", prompt: "Find the net displacement over $0\\le t\\le 4$, in metres.", latex: "\\int_0^4 (3t^2-12t+9)\\,dt", marks: 3, answer: "4", acceptedAnswers: ["4 m", "4 metres"], hint: "$64-96+36$.", explanation: "$[t^3-6t^2+9t]_0^4=64-96+36=4$ m." },
      { key: "c", label: "(c)", prompt: "Find the displacement over the first second ($0\\le t\\le 1$), in metres.", latex: "\\int_0^1 (3t^2-12t+9)\\,dt", marks: 2, answer: "4", acceptedAnswers: ["4 m", "4 metres"], hint: "$1-6+9$.", explanation: "$[t^3-6t^2+9t]_0^1=1-6+9=4$ m." },
    ],
  },
];

export const integratingExponentialsAnyBaseLesson: ExplicitLesson = {
  id: "integrating-exponentials-any-base",
  slug: "integrating-exponentials-any-base",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Integrating Exponentials to Any Base",
  description:
    "Establish and use the standard integral of a base-a exponential, ∫aˣ dx = aˣ/ln a + C, including definite integrals.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",
  video: {
    title: "Integrating Exponentials to Any Base",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn how to integrate an exponential function whose base is not e, using the rule ∫aˣ dx = aˣ/ln a + C.",
  successCriteria: [
    "State and derive $\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C$.",
    "Recognise $\\int e^x\\,dx=e^x+C$ as the case $a=e$.",
    "Integrate multiples of $a^x$.",
    "Evaluate definite integrals of $a^x$ using a value of $\\ln a$.",
    "Avoid applying the power rule to $a^x$.",
  ],
  teaching: {
    paragraphs: [
      "You can already integrate $e^x$ — it is its own integral, $\\int e^x\\,dx=e^x+C$. For an exponential with a different base, such as $2^x$ or $10^x$, there is one extra factor to deal with, and it comes straight from the matching derivative.",
      "Recall the derivative rule $\\frac{d}{dx}(a^x)=a^x\\ln a$. Integration reverses differentiation, so $\\int a^x\\ln a\\,dx=a^x$. Since $\\ln a$ is a constant, divide both sides by it: $\\int a^x\\,dx=\\dfrac{a^x}{\\ln a}+C$. That is the rule, and you have just derived it from the derivative — exactly the connection the course expects you to see.",
      "This contains the natural exponential as a special case. With $a=e$, $\\ln a=\\ln e=1$, so $\\dfrac{a^x}{\\ln a}=e^x$, recovering $\\int e^x\\,dx=e^x+C$. Notice the pattern across bases: differentiating $a^x$ multiplies by $\\ln a$, integrating $a^x$ divides by $\\ln a$ — a clean mirror image, since integration undoes differentiation.",
      "Constants multiply through as always: $\\int k\\,a^x\\,dx=\\dfrac{k\\,a^x}{\\ln a}+C$. For a definite integral, find the primitive $\\dfrac{a^x}{\\ln a}$, then evaluate top minus bottom; the $\\ln a$ in the denominator is a constant factor you can take outside.",
      "The single biggest trap is using the power rule. The power rule $\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}$ applies when the variable is the base and the power is constant. For $a^x$ the variable is the exponent and the base is constant, so the power rule does not apply at all — you must use $\\dfrac{a^x}{\\ln a}$.",
    ],
    latexBlocks: [
      "\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C \\quad (a>0,\\ a\\ne 1)",
      "\\int e^x\\,dx=e^x+C \\quad (\\text{case } a=e)",
      "\\int k\\,a^x\\,dx=\\frac{k\\,a^x}{\\ln a}+C",
      "\\text{compare: } \\frac{d}{dx}(a^x)=a^x\\ln a",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: Derive the rule",
      questionLatex: "\\text{Show that } \\int a^x\\,dx=\\frac{a^x}{\\ln a}+C.",
      steps: [
        { explanation: "Start from the derivative of $a^x$.", latex: "\\frac{d}{dx}(a^x)=a^x\\ln a" },
        { explanation: "Reverse it: integrate both sides.", latex: "\\int a^x\\ln a\\,dx=a^x" },
        { explanation: "Divide by the constant $\\ln a$.", latex: "\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C" },
      ],
      finalAnswerLatex: "\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C",
    },
    {
      title: "Worked example 2: A specific base",
      questionLatex: "\\int 2^x\\,dx",
      steps: [
        { explanation: "Apply the rule with $a=2$.", latex: "\\int 2^x\\,dx=\\frac{2^x}{\\ln 2}+C" },
      ],
      finalAnswerLatex: "\\frac{2^x}{\\ln 2}+C",
    },
    {
      title: "Worked example 3: With a coefficient",
      questionLatex: "\\int 5\\cdot 3^x\\,dx",
      steps: [
        { explanation: "The constant 5 multiplies through.", latex: "=\\frac{5\\cdot 3^x}{\\ln 3}+C" },
      ],
      finalAnswerLatex: "\\frac{5\\cdot 3^x}{\\ln 3}+C",
    },
    {
      title: "Worked example 4: A definite integral",
      questionLatex:
        "\\int_0^1 2^x\\,dx. \\quad \\text{Use } \\ln 2\\approx 0.693; \\text{ give 3 d.p.}",
      steps: [
        { explanation: "Find the primitive.", latex: "\\int 2^x\\,dx=\\frac{2^x}{\\ln 2}" },
        { explanation: "Evaluate top minus bottom.", latex: "\\left[\\frac{2^x}{\\ln 2}\\right]_0^1=\\frac{2-1}{\\ln 2}=\\frac{1}{0.693}" },
        { explanation: "Evaluate.", latex: "\\approx 1.443" },
      ],
      finalAnswerLatex: "\\int_0^1 2^x\\,dx\\approx 1.443",
    },
  ],
  guidedPractice: [
    {
      id: "intax-guided-1",
      prompt: "Choose the integral of $a^x$.",
      latex: "\\int a^x\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{a^x}{\\ln a}+C$" },
        { label: "B", text: "$a^x\\ln a+C$" },
        { label: "C", text: "$\\frac{a^{x+1}}{x+1}+C$" },
        { label: "D", text: "$a^x+C$" },
      ],
      hint: "Divide by $\\ln a$.",
      explanation: "$\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C$.",
    },
    {
      id: "intax-guided-2",
      prompt: "Choose the integral of $2^x$.",
      latex: "\\int 2^x\\,dx",
      answer: "C",
      choices: [
        { label: "A", text: "$2^x\\ln 2+C$" },
        { label: "B", text: "$\\frac{2^{x+1}}{x+1}+C$" },
        { label: "C", text: "$\\frac{2^x}{\\ln 2}+C$" },
        { label: "D", text: "$2^x+C$" },
      ],
      hint: "$a=2$.",
      explanation: "$\\frac{2^x}{\\ln 2}+C$.",
    },
    {
      id: "intax-guided-3",
      prompt: "$\\int e^x\\,dx$ is the rule with base $a=e$ because:",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "$\\ln e=0$" },
        { label: "B", text: "$\\ln e=1$, so $\\frac{e^x}{\\ln e}=e^x$" },
        { label: "C", text: "$e=2.718$" },
        { label: "D", text: "it is unrelated" },
      ],
      hint: "$\\ln e=1$.",
      explanation: "$\\ln e=1$ makes $\\frac{e^x}{\\ln e}=e^x$.",
    },
    {
      id: "intax-guided-4",
      prompt: "Evaluate $\\int_0^1 2^x\\,dx$ using $\\ln 2\\approx 0.693$ (3 d.p.).",
      latex: "\\left[\\frac{2^x}{\\ln 2}\\right]_0^1",
      answer: "1.443",
      acceptedAnswers: ["1.44"],
      hint: "$\\frac{2-1}{0.693}$.",
      explanation: "$\\frac{1}{0.693}\\approx 1.443$.",
    },
  ],
  independentPractice: [
    {
      id: "intax-ind-1",
      prompt: "Choose the integral of $10^x$.",
      latex: "\\int 10^x\\,dx",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{10^x}{\\ln 10}+C$" },
        { label: "B", text: "$10^x\\ln 10+C$" },
        { label: "C", text: "$\\frac{10^{x+1}}{x+1}+C$" },
        { label: "D", text: "$\\frac{10^x}{10}+C$" },
      ],
      hint: "$a=10$.",
      explanation: "$\\frac{10^x}{\\ln 10}+C$.",
    },
    {
      id: "intax-ind-2",
      prompt: "Integrate $\\int 4\\cdot 5^x\\,dx$.",
      latex: "\\int 4\\cdot 5^x\\,dx",
      answer: "B",
      choices: [
        { label: "A", text: "$\\frac{5^x}{\\ln 5}+C$" },
        { label: "B", text: "$\\frac{4\\cdot 5^x}{\\ln 5}+C$" },
        { label: "C", text: "$4\\cdot 5^x\\ln 5+C$" },
        { label: "D", text: "$\\frac{4\\cdot 5^{x+1}}{x+1}+C$" },
      ],
      hint: "Constant through.",
      explanation: "$\\frac{4\\cdot 5^x}{\\ln 5}+C$.",
    },
    {
      id: "intax-ind-3",
      prompt: "Evaluate $\\int_0^2 2^x\\,dx$ using $\\ln 2\\approx 0.693$ (3 d.p.).",
      latex: "\\left[\\frac{2^x}{\\ln 2}\\right]_0^2",
      answer: "4.329",
      acceptedAnswers: ["4.33"],
      hint: "$\\frac{4-1}{0.693}$.",
      explanation: "$\\frac{3}{0.693}\\approx 4.329$.",
    },
    {
      id: "intax-ind-4",
      prompt: "Why does the power rule NOT apply to $\\int 2^x\\,dx$?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "Because 2 is even" },
        { label: "B", text: "The variable is the exponent, not the base" },
        { label: "C", text: "Because $2^x$ is negative" },
        { label: "D", text: "It does apply" },
      ],
      hint: "Power rule needs a constant power.",
      explanation:
        "The power rule is for $x^n$ (variable base, constant power); $2^x$ has a constant base and variable power.",
    },
    {
      id: "intax-ind-5",
      prompt: "Evaluate $\\int_0^1 3^x\\,dx$ using $\\ln 3\\approx 1.099$ (3 d.p.).",
      latex: "\\left[\\frac{3^x}{\\ln 3}\\right]_0^1",
      answer: "1.820",
      acceptedAnswers: ["1.82"],
      hint: "$\\frac{3-1}{1.099}$.",
      explanation: "$\\frac{2}{1.099}\\approx 1.820$.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Applying the power rule to $a^x$.",
      fix: "The power rule is only for $x^n$. For $a^x$ use $\\frac{a^x}{\\ln a}+C$.",
    },
    {
      mistake: "Multiplying by $\\ln a$ instead of dividing.",
      fix: "Differentiating multiplies by $\\ln a$; integrating divides by it: $\\frac{a^x}{\\ln a}$.",
    },
    {
      mistake: "Forgetting the constant of integration on an indefinite integral.",
      fix: "Always add $+C$ to an indefinite integral.",
    },
    {
      mistake: "Writing $\\int e^x\\,dx=\\frac{e^x}{\\ln e}$ and leaving $\\ln e$ in.",
      fix: "$\\ln e=1$, so it simplifies to $e^x+C$.",
    },
  ],
  masteryQuiz: [
    { id: "intax-m-1", prompt: "$\\int a^x\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{a^x}{\\ln a}+C$" }, { label: "B", text: "$a^x\\ln a+C$" }, { label: "C", text: "$\\frac{a^{x+1}}{x+1}+C$" }, { label: "D", text: "$a^x+C$" }], hint: "Divide by ln a.", explanation: "$\\frac{a^x}{\\ln a}+C$." },
    { id: "intax-m-2", prompt: "$\\int 2^x\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$2^x\\ln 2+C$" }, { label: "B", text: "$\\frac{2^{x+1}}{x+1}+C$" }, { label: "C", text: "$\\frac{2^x}{\\ln 2}+C$" }, { label: "D", text: "$2^x+C$" }], hint: "$a=2$.", explanation: "$\\frac{2^x}{\\ln 2}+C$." },
    { id: "intax-m-3", prompt: "$\\int 7\\cdot 4^x\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{7\\cdot 4^x}{\\ln 4}+C$" }, { label: "B", text: "$\\frac{4^x}{\\ln 4}+C$" }, { label: "C", text: "$7\\cdot 4^x\\ln 4+C$" }, { label: "D", text: "$\\frac{7\\cdot 4^{x+1}}{x+1}+C$" }], hint: "Constant through.", explanation: "$\\frac{7\\cdot 4^x}{\\ln 4}+C$." },
    { id: "intax-m-4", prompt: "$\\int_0^1 2^x\\,dx$, $\\ln 2\\approx0.693$ (3 d.p.):", latex: "\\frac{2-1}{\\ln 2}", answer: "1.443", difficulty: 4, acceptedAnswers: ["1.44"], hint: "$\\frac{1}{0.693}$.", explanation: "$1.443$." },
    { id: "intax-m-5", prompt: "$\\int_0^2 2^x\\,dx$, $\\ln 2\\approx0.693$ (3 d.p.):", latex: "\\frac{4-1}{\\ln 2}", answer: "4.329", difficulty: 5, acceptedAnswers: ["4.33"], hint: "$\\frac{3}{0.693}$.", explanation: "$4.329$." },
    { id: "intax-m-6", prompt: "$\\int e^x\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{e^x}{\\ln e}\\ne e^x$" }, { label: "B", text: "$e^x+C$" }, { label: "C", text: "$\\frac{e^{x+1}}{x+1}+C$" }, { label: "D", text: "$e^x\\ln e+C$" }], hint: "$\\ln e=1$.", explanation: "$e^x+C$." },
    { id: "intax-m-7", prompt: "Which rule applies to $\\int 5^x\\,dx$?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Power rule" }, { label: "B", text: "$\\frac{a^x}{\\ln a}$" }, { label: "C", text: "Product rule" }, { label: "D", text: "$5^x$ has no integral" }], hint: "Exponential form.", explanation: "$\\frac{5^x}{\\ln 5}+C$." },
    { id: "intax-m-8", prompt: "$\\int_0^1 3^x\\,dx$, $\\ln 3\\approx1.099$ (3 d.p.):", latex: "\\frac{3-1}{\\ln 3}", answer: "1.820", difficulty: 5, acceptedAnswers: ["1.82"], hint: "$\\frac{2}{1.099}$.", explanation: "$1.820$." },
    { id: "intax-m-9", prompt: "Integrating $a^x$ ___ by $\\ln a$:", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "multiplies" }, { label: "B", text: "divides" }, { label: "C", text: "adds" }, { label: "D", text: "ignores" }], hint: "Opposite of differentiating.", explanation: "Integrating divides by $\\ln a$." },
    { id: "intax-m-10", prompt: "$\\int_0^1 10^x\\,dx$, $\\ln 10\\approx2.303$ (3 d.p.):", latex: "\\frac{10-1}{\\ln 10}", answer: "3.909", difficulty: 5, acceptedAnswers: ["3.91"], hint: "$\\frac{9}{2.303}$.", explanation: "$3.909$." },
  ],
  masteryQuizPool: [
    { id: "intax-p-1", prompt: "$\\int a^x\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{a^x}{\\ln a}+C$" }, { label: "B", text: "$a^x\\ln a+C$" }, { label: "C", text: "$a^x+C$" }, { label: "D", text: "$\\frac{a^{x+1}}{x+1}+C$" }], hint: "Divide by ln a.", explanation: "$\\frac{a^x}{\\ln a}+C$." },
    { id: "intax-p-2", prompt: "$\\int 2^x\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$2^x\\ln 2+C$" }, { label: "B", text: "$2^x+C$" }, { label: "C", text: "$\\frac{2^x}{\\ln 2}+C$" }, { label: "D", text: "$\\frac{2^{x+1}}{x+1}+C$" }], hint: "$a=2$.", explanation: "$\\frac{2^x}{\\ln 2}+C$." },
    { id: "intax-p-3", prompt: "$\\int 3^x\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{3^x}{\\ln 3}+C$" }, { label: "B", text: "$3^x\\ln 3+C$" }, { label: "C", text: "$3^x+C$" }, { label: "D", text: "$\\frac{3^{x+1}}{x+1}+C$" }], hint: "$a=3$.", explanation: "$\\frac{3^x}{\\ln 3}+C$." },
    { id: "intax-p-4", prompt: "$\\int 10^x\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$10^x\\ln 10+C$" }, { label: "B", text: "$\\frac{10^x}{\\ln 10}+C$" }, { label: "C", text: "$10^x+C$" }, { label: "D", text: "$\\frac{10^{x+1}}{x+1}+C$" }], hint: "$a=10$.", explanation: "$\\frac{10^x}{\\ln 10}+C$." },
    { id: "intax-p-5", prompt: "$\\int e^x\\,dx=$", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$\\frac{e^x}{\\ln e}$ (not simplified)" }, { label: "B", text: "$e^x\\ln e+C$" }, { label: "C", text: "$e^x+C$" }, { label: "D", text: "$\\frac{e^{x+1}}{x+1}+C$" }], hint: "$\\ln e=1$.", explanation: "$e^x+C$." },
    { id: "intax-p-6", prompt: "$\\int 6\\cdot 2^x\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{6\\cdot 2^x}{\\ln 2}+C$" }, { label: "B", text: "$\\frac{2^x}{\\ln 2}+C$" }, { label: "C", text: "$6\\cdot 2^x\\ln 2+C$" }, { label: "D", text: "$\\frac{6\\cdot 2^{x+1}}{x+1}+C$" }], hint: "Constant.", explanation: "$\\frac{6\\cdot 2^x}{\\ln 2}+C$." },
    { id: "intax-p-7", prompt: "$\\int \\frac{4^x}{2}\\,dx=$", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{4^x}{\\ln 4}+C$" }, { label: "B", text: "$\\frac{4^x}{2\\ln 4}+C$" }, { label: "C", text: "$\\frac{4^x}{2}\\ln 4+C$" }, { label: "D", text: "$\\frac{4^{x+1}}{x+1}+C$" }], hint: "$\\frac12$ coefficient.", explanation: "$\\frac{4^x}{2\\ln 4}+C$." },
    { id: "intax-p-8", prompt: "Power rule applies to $\\int a^x\\,dx$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Yes" }, { label: "B", text: "No — variable is the exponent" }, { label: "C", text: "Only if $a=2$" }, { label: "D", text: "Only for definite integrals" }], hint: "Constant base.", explanation: "No; use $\\frac{a^x}{\\ln a}$." },
    { id: "intax-p-9", prompt: "$\\int_0^1 2^x\\,dx$, $\\ln 2=0.693$ (3 d.p.):", latex: "\\frac{2-1}{\\ln 2}", answer: "1.443", difficulty: 3, acceptedAnswers: ["1.44"], hint: "$\\frac{1}{0.693}$.", explanation: "$1.443$." },
    { id: "intax-p-10", prompt: "$\\int_0^2 2^x\\,dx$, $\\ln 2=0.693$ (3 d.p.):", latex: "\\frac{4-1}{\\ln 2}", answer: "4.329", difficulty: 4, acceptedAnswers: ["4.33"], hint: "$\\frac{3}{0.693}$.", explanation: "$4.329$." },
    { id: "intax-p-11", prompt: "$\\int_1^2 2^x\\,dx$, $\\ln 2=0.693$ (3 d.p.):", latex: "\\frac{4-2}{\\ln 2}", answer: "2.886", difficulty: 4, acceptedAnswers: ["2.89"], hint: "$\\frac{2}{0.693}$.", explanation: "$2.886$." },
    { id: "intax-p-12", prompt: "$\\int_0^1 3^x\\,dx$, $\\ln 3=1.099$ (3 d.p.):", latex: "\\frac{3-1}{\\ln 3}", answer: "1.820", difficulty: 4, acceptedAnswers: ["1.82"], hint: "$\\frac{2}{1.099}$.", explanation: "$1.820$." },
    { id: "intax-p-13", prompt: "$\\int_0^1 10^x\\,dx$, $\\ln 10=2.303$ (3 d.p.):", latex: "\\frac{10-1}{\\ln 10}", answer: "3.909", difficulty: 5, acceptedAnswers: ["3.91"], hint: "$\\frac{9}{2.303}$.", explanation: "$3.909$." },
    { id: "intax-p-14", prompt: "$\\int_0^1 5^x\\,dx$, $\\ln 5=1.609$ (3 d.p.):", latex: "\\frac{5-1}{\\ln 5}", answer: "2.486", difficulty: 5, acceptedAnswers: ["2.49"], hint: "$\\frac{4}{1.609}$.", explanation: "$2.486$." },
    { id: "intax-p-15", prompt: "Differentiating $a^x$ multiplies by $\\ln a$; integrating:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "also multiplies" }, { label: "B", text: "divides" }, { label: "C", text: "squares" }, { label: "D", text: "ignores" }], hint: "Inverse operations.", explanation: "Divides by $\\ln a$." },
    { id: "intax-p-16", prompt: "Primitive of $2^x$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{2^x}{\\ln 2}$" }, { label: "B", text: "$2^x\\ln 2$" }, { label: "C", text: "$\\frac{2^{x+1}}{x+1}$" }, { label: "D", text: "$x2^{x-1}$" }], hint: "Divide by ln 2.", explanation: "$\\frac{2^x}{\\ln 2}$." },
    { id: "intax-p-17", prompt: "$\\int (2^x+e^x)\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{2^x}{\\ln 2}+e^x+C$" }, { label: "B", text: "$\\frac{2^x}{\\ln 2}+\\frac{e^x}{\\ln e}+C$ unsimplified" }, { label: "C", text: "$2^x\\ln 2+e^x+C$" }, { label: "D", text: "$\\frac{2^{x+1}}{x+1}+e^x+C$" }], hint: "Integrate each.", explanation: "$\\frac{2^x}{\\ln 2}+e^x+C$." },
    { id: "intax-p-18", prompt: "The $+C$ is needed for:", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "an indefinite integral" }, { label: "B", text: "a definite integral" }, { label: "C", text: "never" }, { label: "D", text: "only base e" }], hint: "Indefinite.", explanation: "Indefinite integrals need $+C$." },
    { id: "intax-p-19", prompt: "$\\int_0^3 2^x\\,dx$, $\\ln 2=0.693$ (3 d.p.):", latex: "\\frac{8-1}{\\ln 2}", answer: "10.101", difficulty: 5, acceptedAnswers: ["10.10", "10.1"], hint: "$\\frac{7}{0.693}$.", explanation: "$\\frac{7}{0.693}\\approx 10.101$." },
    { id: "intax-p-20", prompt: "$\\int 3\\cdot 10^x\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{3\\cdot 10^x}{\\ln 10}+C$" }, { label: "B", text: "$\\frac{10^x}{\\ln 10}+C$" }, { label: "C", text: "$3\\cdot 10^x\\ln 10+C$" }, { label: "D", text: "$\\frac{3\\cdot 10^{x+1}}{x+1}+C$" }], hint: "Constant.", explanation: "$\\frac{3\\cdot 10^x}{\\ln 10}+C$." },
    { id: "intax-p-21", prompt: "Which is WRONG for $\\int 2^x\\,dx$?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\frac{2^x}{\\ln 2}+C$" }, { label: "B", text: "primitive is $\\frac{2^x}{\\ln 2}$" }, { label: "C", text: "needs $+C$" }, { label: "D", text: "$\\frac{2^{x+1}}{x+1}+C$" }], hint: "Power rule is wrong here.", explanation: "The power-rule form is wrong for $2^x$." },
    { id: "intax-p-22", prompt: "$\\int_1^2 3^x\\,dx$, $\\ln 3=1.099$ (3 d.p.):", latex: "\\frac{9-3}{\\ln 3}", answer: "5.460", difficulty: 5, acceptedAnswers: ["5.46"], hint: "$\\frac{6}{1.099}$.", explanation: "$\\frac{6}{1.099}\\approx 5.460$." },
    { id: "intax-p-23", prompt: "$\\int 2^x\\,dx$ — base and exponent: which is variable?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "the base" }, { label: "B", text: "the exponent" }, { label: "C", text: "both" }, { label: "D", text: "neither" }], hint: "$2^x$.", explanation: "The exponent $x$ is variable; the base 2 is constant." },
    { id: "intax-p-24", prompt: "$\\int 4^x\\,dx=$", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{4^x}{\\ln 4}+C$" }, { label: "B", text: "$4^x\\ln 4+C$" }, { label: "C", text: "$\\frac{4^{x+1}}{x+1}+C$" }, { label: "D", text: "$4^x+C$" }], hint: "$a=4$.", explanation: "$\\frac{4^x}{\\ln 4}+C$." },
  ],
  multiPartPractice: [
    {
      id: "intax-mp-1",
      prompt:
        "Evaluate definite integrals of $f(x)=2^x$. Use $\\ln 2\\approx 0.693$ and give answers to 3 decimal places.",
      latex: "\\int 2^x\\,dx=\\frac{2^x}{\\ln 2}+C",
      answer: "1.443",
      hint: "Find the primitive $\\frac{2^x}{\\ln 2}$, then evaluate top minus bottom.",
      explanation:
        "(a) $\\int_0^1 2^x\\,dx=\\frac{2-1}{0.693}\\approx 1.443$. (b) $\\int_0^2 2^x\\,dx=\\frac{4-1}{0.693}\\approx 4.329$. (c) $\\int_1^2 2^x\\,dx=\\frac{4-2}{0.693}\\approx 2.886$ (which is (b) minus (a)).",
      parts: [
        { key: "a", label: "(a)", prompt: "Find $\\int_0^1 2^x\\,dx$.", latex: "\\frac{2-1}{\\ln 2}", marks: 2, answer: "1.443", acceptedAnswers: ["1.44"], hint: "$\\frac{1}{0.693}$.", explanation: "$1.443$." },
        { key: "b", label: "(b)", prompt: "Find $\\int_0^2 2^x\\,dx$.", latex: "\\frac{4-1}{\\ln 2}", marks: 2, answer: "4.329", acceptedAnswers: ["4.33"], hint: "$\\frac{3}{0.693}$.", explanation: "$4.329$." },
        { key: "c", label: "(c)", prompt: "Hence find $\\int_1^2 2^x\\,dx$.", latex: "\\frac{4-2}{\\ln 2}", marks: 1, answer: "2.886", acceptedAnswers: ["2.89"], hint: "(b) minus (a).", explanation: "$4.329-1.443=2.886$." },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const areasWithRespectToYAxisLesson: ExplicitLesson = {
  id: "areas-with-respect-to-y-axis",
  slug: "areas-with-respect-to-y-axis",
  moduleSlug: "ma-c4-integral-calculus",
  moduleTitle: "Integral Calculus",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Areas With Respect to the y-axis",
  description:
    "Find the area between a curve and the y-axis using ∫x dy, and use the reflection of y=aˣ and y=log_a x in y=x to evaluate areas involving exponential and logarithmic curves.",
  syllabusArea: "Calculus",
  focus: "Integral calculus",
  status: "active",
  video: {
    title: "Areas With Respect to the y-axis",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn how to find areas measured against the y-axis by integrating x with respect to y, and how to use reflection in y=x for exponential and logarithmic curves.",
  successCriteria: [
    "Set up the area between a curve and the y-axis as $\\int_a^b x\\,dy$.",
    "Rearrange $y=f(x)$ into $x=g(y)$ before integrating.",
    "Handle signs: a negative integral means the region lies left of the y-axis.",
    "Use that $y=a^x$ and $y=\\log_a x$ are reflections in $y=x$ to evaluate awkward log areas.",
    "Solve practical area problems measured against the y-axis.",
  ],
  teaching: {
    paragraphs: [
      "To find the area between a curve and the $x$-axis you sum vertical strips of height $y$ and width $dx$, giving $\\int y\\,dx$. The area between a curve and the $y$-axis is the same idea rotated through ninety degrees: you sum horizontal strips, each of width $x$ (the distance out to the curve) and thickness $dy$. Adding them up gives $\\int_a^b x\\,dy$, where $a$ and $b$ are now $y$-values.",
      "The one new demand is that the integrand must be written in terms of $y$. So before integrating you rearrange the equation $y=f(x)$ into the form $x=g(y)$. For $y=x^2$ with $x\\ge 0$ this gives $x=\\sqrt{y}$; for $y=2x$ it gives $x=\\tfrac{y}{2}$. Then integrate $g(y)$ between the two $y$-limits, exactly as you would integrate a function of $x$ between two $x$-limits.",
      "Signs behave just as they do for $x$-axis areas, but mirrored. If the curve lies to the right of the $y$-axis then $x>0$ and the integral is positive; if it lies to the left then $x<0$ and the integral is negative. For a true area, take the absolute value, and if $x$ changes sign between the limits, split the integral at the $y$-value where $x=0$ and add the magnitudes.",
      "Logarithmic curves create a difficulty: integrating $\\log_a x$ directly is awkward in this course. The syllabus gives an elegant way around it. The graphs of $y=a^x$ and $y=\\log_a x$ are reflections of each other in the line $y=x$ — they are inverse functions. Reflection in $y=x$ swaps the roles of $x$ and $y$, and so swaps 'area against the $x$-axis' with 'area against the $y$-axis', while preserving the size of the area.",
      "So an area involving a logarithmic curve can be replaced by the corresponding area involving its exponential reflection, which you can integrate easily. For example, the area between $y=\\ln x$ and the $y$-axis from $y=0$ to $y=1$ is, by reflection in $y=x$, equal to the area between $y=e^x$ and the $x$-axis from $x=0$ to $x=1$, namely $\\int_0^1 e^x\\,dx=e-1$. You never had to integrate $\\ln x$.",
      "In short: to integrate against the $y$-axis, write $x$ as a function of $y$ and compute $\\int x\\,dy$; and whenever a logarithm makes the integral awkward, reflect in $y=x$ to turn it into an exponential area you already know how to evaluate.",
    ],
    latexBlocks: [
      "\\text{area between curve and }y\\text{-axis}=\\int_a^b x\\,dy \\quad (a,b\\text{ are }y\\text{-values})",
      "y=f(x) \\;\\Rightarrow\\; x=g(y) \\text{ before integrating}",
      "y=a^x \\text{ and } y=\\log_a x \\text{ are reflections in } y=x",
      "\\text{(reflection) area vs }y\\text{-axis of }\\log \\;=\\; \\text{area vs }x\\text{-axis of its }\\exp",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: A square-root strip",
      questionLatex:
        "\\text{Find the area between } y=x^2\\ (x\\ge 0), \\text{ the } y\\text{-axis, } y=0 \\text{ and } y=4.",
      steps: [
        { explanation: "Rearrange to make $x$ the subject.", latex: "y=x^2 \\Rightarrow x=\\sqrt{y}=y^{1/2}" },
        { explanation: "Integrate with respect to $y$ between the $y$-limits.", latex: "\\int_0^4 y^{1/2}\\,dy=\\left[\\frac{2}{3}y^{3/2}\\right]_0^4" },
        { explanation: "Evaluate, using $4^{3/2}=8$.", latex: "=\\frac{2}{3}\\times 8=\\frac{16}{3}" },
      ],
      finalAnswerLatex: "\\text{Area}=\\frac{16}{3}\\text{ square units}",
    },
    {
      title: "Worked example 2: A linear boundary",
      questionLatex:
        "\\text{Find the area between } y=2x, \\text{ the } y\\text{-axis, } y=0 \\text{ and } y=6.",
      steps: [
        { explanation: "Make $x$ the subject.", latex: "y=2x \\Rightarrow x=\\frac{y}{2}" },
        { explanation: "Integrate.", latex: "\\int_0^6 \\frac{y}{2}\\,dy=\\frac{1}{2}\\left[\\frac{y^2}{2}\\right]_0^6=\\frac{1}{2}\\times 18" },
        { explanation: "Evaluate.", latex: "=9" },
      ],
      finalAnswerLatex: "\\text{Area}=9\\text{ square units}",
    },
    {
      title: "Worked example 3: An exponential area (the reflection's partner)",
      questionLatex:
        "\\text{Find the area between } y=e^x, \\text{ the } x\\text{-axis, } x=0 \\text{ and } x=1.",
      steps: [
        { explanation: "Integrate $e^x$ with respect to $x$.", latex: "\\int_0^1 e^x\\,dx=\\left[e^x\\right]_0^1" },
        { explanation: "Evaluate.", latex: "=e^1-e^0=e-1\\approx 1.718" },
      ],
      finalAnswerLatex: "\\text{Area}=e-1\\approx 1.718",
    },
    {
      title: "Worked example 4: Use reflection to avoid integrating ln x",
      questionLatex:
        "\\text{Find the area between } y=\\ln x, \\text{ the } y\\text{-axis, } y=0 \\text{ and } y=1.",
      steps: [
        { explanation: "Reflecting in $y=x$ sends $y=\\ln x$ to $y=e^x$ and swaps the $y$-axis area for an $x$-axis area.", latex: "\\text{area}=\\int_0^1 e^x\\,dx" },
        { explanation: "This is the area from Worked example 3.", latex: "=e-1\\approx 1.718" },
      ],
      finalAnswerLatex: "\\text{Area}=e-1\\approx 1.718",
    },
  ],
  guidedPractice: [
    {
      id: "yaxis-guided-1",
      prompt: "The area between a curve and the y-axis is given by:",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "$\\int y\\,dx$" },
        { label: "B", text: "$\\int x\\,dy$" },
        { label: "C", text: "$\\int y\\,dy$" },
        { label: "D", text: "$\\int x\\,dx$" },
      ],
      hint: "Horizontal strips of width $x$ and thickness $dy$.",
      explanation: "Area against the y-axis is $\\int x\\,dy$.",
    },
    {
      id: "yaxis-guided-2",
      prompt: "Rearrange $y=x^2$ (with $x\\ge 0$) to make $x$ the subject.",
      latex: "y=x^2,\\ x\\ge 0",
      answer: "B",
      choices: [
        { label: "A", text: "$x=y^2$" },
        { label: "B", text: "$x=\\sqrt{y}$" },
        { label: "C", text: "$x=2y$" },
        { label: "D", text: "$x=\\frac{y}{2}$" },
      ],
      hint: "Take the (positive) square root.",
      explanation: "$x=\\sqrt{y}$ for $x\\ge 0$.",
    },
    {
      id: "yaxis-guided-3",
      prompt: "Find the area between $y=2x$, the y-axis, $y=0$ and $y=4$.",
      latex: "\\int_0^4 \\frac{y}{2}\\,dy",
      answer: "4",
      hint: "$x=\\frac{y}{2}$; integrate from 0 to 4.",
      explanation: "$\\frac{1}{2}\\left[\\frac{y^2}{2}\\right]_0^4=\\frac{1}{2}\\times 8=4$.",
    },
    {
      id: "yaxis-guided-4",
      prompt: "$y=\\log_a x$ is the reflection of which curve in the line $y=x$?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "$y=\\frac{1}{x}$" },
        { label: "B", text: "$y=x^a$" },
        { label: "C", text: "$y=a^x$" },
        { label: "D", text: "$y=-\\log_a x$" },
      ],
      hint: "Inverse functions reflect in $y=x$.",
      explanation: "$y=\\log_a x$ and $y=a^x$ are inverses, reflections in $y=x$.",
    },
  ],
  independentPractice: [
    {
      id: "yaxis-ind-1",
      prompt: "Find the area between $y=x^2$ ($x\\ge 0$), the y-axis, $y=0$ and $y=9$.",
      latex: "\\int_0^9 \\sqrt{y}\\,dy",
      answer: "18",
      hint: "$\\frac{2}{3}\\times 9^{3/2}$, and $9^{3/2}=27$.",
      explanation: "$\\left[\\frac{2}{3}y^{3/2}\\right]_0^9=\\frac{2}{3}\\times 27=18$.",
    },
    {
      id: "yaxis-ind-2",
      prompt: "Find the area between $y=x^3$ ($x\\ge 0$), the y-axis, $y=0$ and $y=8$.",
      latex: "\\int_0^8 y^{1/3}\\,dy",
      answer: "12",
      hint: "$x=y^{1/3}$; $\\frac{3}{4}\\times 8^{4/3}$, and $8^{4/3}=16$.",
      explanation: "$\\left[\\frac{3}{4}y^{4/3}\\right]_0^8=\\frac{3}{4}\\times 16=12$.",
    },
    {
      id: "yaxis-ind-3",
      prompt: "Find the area between $y=e^x$, the x-axis, $x=0$ and $x=2$. Use $e^2\\approx 7.389$; give 3 d.p.",
      latex: "\\int_0^2 e^x\\,dx",
      answer: "6.389",
      acceptedAnswers: ["e^2-1", "6.39"],
      hint: "$e^2-1$.",
      explanation: "$[e^x]_0^2=e^2-1\\approx 6.389$.",
    },
    {
      id: "yaxis-ind-4",
      prompt:
        "The area between $y=\\ln x$, the y-axis, $y=0$ and $y=2$ equals the area between which curve and the x-axis?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "$y=e^x$ from $x=0$ to $x=2$" },
        { label: "B", text: "$y=e^x$ from $x=0$ to $x=1$" },
        { label: "C", text: "$y=x^2$ from $x=0$ to $x=2$" },
        { label: "D", text: "$y=\\frac{1}{x}$ from $x=1$ to $x=2$" },
      ],
      hint: "Reflect in $y=x$; the limits swap roles.",
      explanation: "Reflection gives the area under $y=e^x$ from $x=0$ to $x=2$.",
    },
    {
      id: "yaxis-ind-5",
      prompt: "Find the area between $y=3x$, the y-axis, $y=0$ and $y=6$.",
      latex: "\\int_0^6 \\frac{y}{3}\\,dy",
      answer: "6",
      hint: "$x=\\frac{y}{3}$.",
      explanation: "$\\frac{1}{3}\\left[\\frac{y^2}{2}\\right]_0^6=\\frac{1}{3}\\times 18=6$.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Integrating $y$ with respect to $x$ for a y-axis area.",
      fix: "Against the y-axis the area is $\\int x\\,dy$ — integrate $x$ (as a function of $y$) with respect to $y$.",
    },
    {
      mistake: "Forgetting to rearrange $y=f(x)$ into $x=g(y)$.",
      fix: "Make $x$ the subject first, then integrate the result with respect to $y$.",
    },
    {
      mistake: "Using $x$-limits instead of $y$-limits.",
      fix: "The limits of $\\int x\\,dy$ are $y$-values; read them off the y-axis.",
    },
    {
      mistake: "Trying to integrate $\\ln x$ directly.",
      fix: "Reflect in $y=x$ to convert the log area into an exponential area you can integrate.",
    },
  ],
  masteryQuiz: [
    { id: "yaxis-m-1", prompt: "Area against the y-axis is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\int y\\,dx$" }, { label: "B", text: "$\\int x\\,dy$" }, { label: "C", text: "$\\int x\\,dx$" }, { label: "D", text: "$\\int \\frac{1}{x}\\,dy$" }], hint: "Horizontal strips.", explanation: "$\\int x\\,dy$." },
    { id: "yaxis-m-2", prompt: "For $y=x^2$ ($x\\ge0$), $x=$", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\sqrt{y}$" }, { label: "B", text: "$y^2$" }, { label: "C", text: "$2y$" }, { label: "D", text: "$\\frac{1}{y}$" }], hint: "Square root.", explanation: "$x=\\sqrt{y}$." },
    { id: "yaxis-m-3", prompt: "Area between $y=x^2$ ($x\\ge0$), y-axis, $y=0$ to $y=4$:", latex: "\\int_0^4 \\sqrt{y}\\,dy", answer: "16/3", difficulty: 4, acceptedAnswers: ["5.33", "5.333"], hint: "$\\frac23\\cdot 8$.", explanation: "$\\frac{16}{3}$." },
    { id: "yaxis-m-4", prompt: "Area between $y=2x$, y-axis, $y=0$ to $y=6$:", latex: "\\int_0^6 \\frac{y}{2}\\,dy", answer: "9", difficulty: 3, hint: "$\\frac12\\cdot 18$.", explanation: "$9$." },
    { id: "yaxis-m-5", prompt: "Area between $y=x^3$ ($x\\ge0$), y-axis, $y=0$ to $y=8$:", latex: "\\int_0^8 y^{1/3}\\,dy", answer: "12", difficulty: 4, hint: "$\\frac34\\cdot 16$.", explanation: "$12$." },
    { id: "yaxis-m-6", prompt: "$y=\\log_a x$ reflects in $y=x$ to:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$y=x^a$" }, { label: "B", text: "$y=\\frac1x$" }, { label: "C", text: "$y=a^x$" }, { label: "D", text: "$y=-a^x$" }], hint: "Inverse.", explanation: "$y=a^x$." },
    { id: "yaxis-m-7", prompt: "Area between $y=e^x$, x-axis, $x=0$ to $x=1$ ($e\\approx2.718$):", latex: "\\int_0^1 e^x\\,dx", answer: "1.718", difficulty: 4, acceptedAnswers: ["e-1", "1.72"], hint: "$e-1$.", explanation: "$e-1\\approx 1.718$." },
    { id: "yaxis-m-8", prompt: "Area between $y=\\ln x$, y-axis, $y=0$ to $y=1$ (use reflection):", latex: "\\int_0^1 e^x\\,dx", answer: "1.718", difficulty: 5, acceptedAnswers: ["e-1", "1.72"], hint: "Reflect to $e^x$.", explanation: "Equals area under $e^x$ from 0 to 1, $=e-1\\approx 1.718$." },
    { id: "yaxis-m-9", prompt: "Area between $y=x^2$ ($x\\ge0$), y-axis, $y=0$ to $y=9$:", latex: "\\int_0^9 \\sqrt{y}\\,dy", answer: "18", difficulty: 4, hint: "$\\frac23\\cdot 27$.", explanation: "$18$." },
    { id: "yaxis-m-10", prompt: "Which limits does $\\int x\\,dy$ use?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "x-values" }, { label: "B", text: "y-values" }, { label: "C", text: "both" }, { label: "D", text: "neither" }], hint: "Integrating w.r.t. $y$.", explanation: "$y$-values." },
  ],
  masteryQuizPool: [
    { id: "yaxis-p-1", prompt: "Area against the y-axis is:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\int y\\,dx$" }, { label: "B", text: "$\\int x\\,dy$" }, { label: "C", text: "$\\int x\\,dx$" }, { label: "D", text: "$\\int y\\,dy$" }], hint: "Horizontal strips.", explanation: "$\\int x\\,dy$." },
    { id: "yaxis-p-2", prompt: "Before integrating against the y-axis you write:", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$x$ as a function of $y$" }, { label: "B", text: "$y$ as a function of $x$" }, { label: "C", text: "$\\frac{dy}{dx}$" }, { label: "D", text: "$+C$" }], hint: "Make $x$ the subject.", explanation: "$x=g(y)$." },
    { id: "yaxis-p-3", prompt: "$y=x^2$ ($x\\ge0$): $x=$", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\sqrt{y}$" }, { label: "B", text: "$y^2$" }, { label: "C", text: "$2y$" }, { label: "D", text: "$\\frac{y}{2}$" }], hint: "Root.", explanation: "$\\sqrt y$." },
    { id: "yaxis-p-4", prompt: "$y=3x$: $x=$", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$3y$" }, { label: "B", text: "$y-3$" }, { label: "C", text: "$\\frac{y}{3}$" }, { label: "D", text: "$\\sqrt{y}$" }], hint: "Divide.", explanation: "$\\frac{y}{3}$." },
    { id: "yaxis-p-5", prompt: "$y=x^3$ ($x\\ge0$): $x=$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$3y$" }, { label: "B", text: "$y^{1/3}$" }, { label: "C", text: "$y^3$" }, { label: "D", text: "$\\sqrt{y}$" }], hint: "Cube root.", explanation: "$y^{1/3}$." },
    { id: "yaxis-p-6", prompt: "Area $y=2x$, y-axis, $y=0$ to $4$:", latex: "\\int_0^4 \\frac{y}{2}\\,dy", answer: "4", difficulty: 2, hint: "$\\frac12\\cdot 8$.", explanation: "$4$." },
    { id: "yaxis-p-7", prompt: "Area $y=2x$, y-axis, $y=0$ to $6$:", latex: "\\int_0^6 \\frac{y}{2}\\,dy", answer: "9", difficulty: 2, hint: "$\\frac12\\cdot 18$.", explanation: "$9$." },
    { id: "yaxis-p-8", prompt: "Area $y=2x$, y-axis, $y=0$ to $10$:", latex: "\\int_0^{10} \\frac{y}{2}\\,dy", answer: "25", difficulty: 3, hint: "$\\frac12\\cdot 50$.", explanation: "$25$." },
    { id: "yaxis-p-9", prompt: "Area $y=3x$, y-axis, $y=0$ to $6$:", latex: "\\int_0^6 \\frac{y}{3}\\,dy", answer: "6", difficulty: 3, hint: "$\\frac13\\cdot 18$.", explanation: "$6$." },
    { id: "yaxis-p-10", prompt: "Area $y=3x$, y-axis, $y=0$ to $12$:", latex: "\\int_0^{12} \\frac{y}{3}\\,dy", answer: "24", difficulty: 3, hint: "$\\frac13\\cdot 72$.", explanation: "$24$." },
    { id: "yaxis-p-11", prompt: "Area $y=x^2$ ($x\\ge0$), y-axis, $y=0$ to $1$:", latex: "\\int_0^1 \\sqrt{y}\\,dy", answer: "2/3", difficulty: 3, acceptedAnswers: ["0.67", "0.667"], hint: "$\\frac23\\cdot 1$.", explanation: "$\\frac23$." },
    { id: "yaxis-p-12", prompt: "Area $y=x^2$ ($x\\ge0$), y-axis, $y=0$ to $4$:", latex: "\\int_0^4 \\sqrt{y}\\,dy", answer: "16/3", difficulty: 3, acceptedAnswers: ["5.33", "5.333"], hint: "$\\frac23\\cdot 8$.", explanation: "$\\frac{16}{3}$." },
    { id: "yaxis-p-13", prompt: "Area $y=x^2$ ($x\\ge0$), y-axis, $y=0$ to $9$:", latex: "\\int_0^9 \\sqrt{y}\\,dy", answer: "18", difficulty: 4, hint: "$\\frac23\\cdot 27$.", explanation: "$18$." },
    { id: "yaxis-p-14", prompt: "Area $y=x^3$ ($x\\ge0$), y-axis, $y=0$ to $8$:", latex: "\\int_0^8 y^{1/3}\\,dy", answer: "12", difficulty: 4, hint: "$\\frac34\\cdot 16$.", explanation: "$12$." },
    { id: "yaxis-p-15", prompt: "Area $y=x^3$ ($x\\ge0$), y-axis, $y=0$ to $1$:", latex: "\\int_0^1 y^{1/3}\\,dy", answer: "3/4", difficulty: 4, acceptedAnswers: ["0.75"], hint: "$\\frac34\\cdot 1$.", explanation: "$\\frac34$." },
    { id: "yaxis-p-16", prompt: "$y=a^x$ and $y=\\log_a x$ are reflections in:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "the x-axis" }, { label: "B", text: "the y-axis" }, { label: "C", text: "$y=x$" }, { label: "D", text: "$y=-x$" }], hint: "Inverses.", explanation: "$y=x$." },
    { id: "yaxis-p-17", prompt: "Reflection in $y=x$ swaps:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "x-axis areas with y-axis areas" }, { label: "B", text: "areas with volumes" }, { label: "C", text: "nothing" }, { label: "D", text: "positive with negative" }], hint: "$x\\leftrightarrow y$.", explanation: "It swaps the roles of $x$ and $y$." },
    { id: "yaxis-p-18", prompt: "Area $y=e^x$, x-axis, $x=0$ to $1$ ($e\\approx2.718$):", latex: "\\int_0^1 e^x\\,dx", answer: "1.718", difficulty: 3, acceptedAnswers: ["e-1", "1.72"], hint: "$e-1$.", explanation: "$1.718$." },
    { id: "yaxis-p-19", prompt: "Area $y=e^x$, x-axis, $x=0$ to $2$ ($e^2\\approx7.389$):", latex: "\\int_0^2 e^x\\,dx", answer: "6.389", difficulty: 4, acceptedAnswers: ["e^2-1", "6.39"], hint: "$e^2-1$.", explanation: "$6.389$." },
    { id: "yaxis-p-20", prompt: "Area $y=\\ln x$, y-axis, $y=0$ to $1$ (reflection):", latex: "=\\int_0^1 e^x\\,dx", answer: "1.718", difficulty: 5, acceptedAnswers: ["e-1", "1.72"], hint: "Reflect to $e^x$.", explanation: "$e-1\\approx 1.718$." },
    { id: "yaxis-p-21", prompt: "Area $y=\\ln x$, y-axis, $y=0$ to $2$ (reflection):", latex: "=\\int_0^2 e^x\\,dx", answer: "6.389", difficulty: 5, acceptedAnswers: ["e^2-1", "6.39"], hint: "Reflect to $e^x$, $x=0$ to $2$.", explanation: "$e^2-1\\approx 6.389$." },
    { id: "yaxis-p-22", prompt: "The limits in $\\int x\\,dy$ are:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "x-values" }, { label: "B", text: "y-values" }, { label: "C", text: "always 0 and 1" }, { label: "D", text: "x-intercepts" }], hint: "w.r.t. $y$.", explanation: "$y$-values." },
    { id: "yaxis-p-23", prompt: "If $x<0$ throughout the region, $\\int x\\,dy$ is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "positive" }, { label: "B", text: "negative (take $|\\,\\cdot\\,|$ for area)" }, { label: "C", text: "zero" }, { label: "D", text: "undefined" }], hint: "Sign of $x$.", explanation: "Negative; use the magnitude for area." },
    { id: "yaxis-p-24", prompt: "Why reflect a log area in $y=x$?", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "To turn it into an exponential area, which is easy to integrate" }, { label: "B", text: "To make it negative" }, { label: "C", text: "To change the answer" }, { label: "D", text: "It is never useful" }], hint: "Integrating $\\ln x$ is awkward.", explanation: "The exponential reflection integrates easily and has the same area." },
    { id: "yaxis-p-25", prompt: "Area $y=x^2$ ($x\\ge0$), y-axis, $y=0$ to $16$:", latex: "\\int_0^{16} \\sqrt{y}\\,dy", answer: "128/3", difficulty: 5, acceptedAnswers: ["42.67", "42.667"], hint: "$\\frac23\\cdot 64$.", explanation: "$\\frac{128}{3}$." },
    { id: "yaxis-p-26", prompt: "Area $y=4x$, y-axis, $y=0$ to $8$:", latex: "\\int_0^8 \\frac{y}{4}\\,dy", answer: "8", difficulty: 3, hint: "$\\frac14\\cdot 32$.", explanation: "$8$." },
  ],
  multiPartPractice: [
    {
      id: "yaxis-mp-1",
      prompt:
        "The region $R$ is bounded by the curve $y=x^2$ (with $x\\ge 0$), the $y$-axis, and the lines $y=0$ and $y=4$.",
      latex: "y=x^2,\\ x\\ge 0",
      answer: "2/3",
      hint: "Write $x=\\sqrt{y}$ and integrate $\\int x\\,dy$ between the stated $y$-limits.",
      explanation:
        "With $x=\\sqrt y$: (a) $\\int_0^1 \\sqrt y\\,dy=\\frac23$. (b) $\\int_0^4 \\sqrt y\\,dy=\\frac{2}{3}\\cdot 8=\\frac{16}{3}$. (c) the area for $1\\le y\\le 4$ is $\\frac{16}{3}-\\frac23=\\frac{14}{3}$.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the area for $0\\le y\\le 1$.", latex: "\\int_0^1 \\sqrt{y}\\,dy", marks: 2, answer: "2/3", acceptedAnswers: ["0.67", "0.667"], hint: "$\\frac23\\cdot 1$.", explanation: "$\\frac23$." },
        { key: "b", label: "(b)", prompt: "Find the area for $0\\le y\\le 4$.", latex: "\\int_0^4 \\sqrt{y}\\,dy", marks: 2, answer: "16/3", acceptedAnswers: ["5.33", "5.333"], hint: "$\\frac23\\cdot 8$.", explanation: "$\\frac{16}{3}$." },
        { key: "c", label: "(c)", prompt: "Hence find the area for $1\\le y\\le 4$.", latex: "\\frac{16}{3}-\\frac{2}{3}", marks: 1, answer: "14/3", acceptedAnswers: ["4.67", "4.667"], hint: "Subtract (a) from (b).", explanation: "$\\frac{16}{3}-\\frac{2}{3}=\\frac{14}{3}$." },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const integralCalculusOutline: LessonOutlineItem[] = [
  {
    id: "antidifferentiation-reverse-power-rule",
    slug: "antidifferentiation-reverse-power-rule",
    title: "Antidifferentiation and the reverse power rule",
    description:
      "Understand integration as reverse differentiation and use the reverse power rule.",
    status: "active",
  },
  {
    id: "indefinite-integrals-constant-of-integration",
    slug: "indefinite-integrals-constant-of-integration",
    title: "Indefinite integrals and the constant of integration",
    description:
      "Use +C and integrate polynomial expressions term-by-term.",
    status: "active",
  },
  {
    id: "initial-conditions-particular-primitive",
    slug: "initial-conditions-particular-primitive",
    title: "Initial conditions and finding the particular primitive",
    description:
      "Use a point or condition to find the value of C in an indefinite integral.",
    status: "active",
  },
  {
    id: "definite-integrals-fundamental-theorem",
    slug: "definite-integrals-fundamental-theorem",
    title: "Definite integrals and the Fundamental Theorem of Calculus",
    description:
      "Evaluate definite integrals using antiderivatives and understand what the bounds mean.",
    status: "active",
  },
  {
    id: "signed-area-total-area",
    slug: "signed-area-total-area",
    title: "Signed area and total area",
    description:
      "Distinguish between signed area from a definite integral and total geometric area.",
    status: "active",
  },
  {
    id: "area-under-a-curve",
    slug: "area-under-a-curve",
    title: "Area under a curve",
    description:
      "Use definite integrals to calculate areas bounded by curves and the x-axis.",
    status: "active",
  },
  {
    id: "trapezoidal-rule-area-approximation",
    slug: "trapezoidal-rule-area-approximation",
    title: "The Trapezoidal rule and area approximation",
    description:
      "Approximate area under a curve using the Trapezoidal rule.",
    status: "active",
  },
  {
    id: "area-between-two-curves",
    slug: "area-between-two-curves",
    title: "Area between two curves",
    description:
      "Find areas enclosed between two curves by integrating the difference between functions.",
    status: "active",
  },
  {
    id: "applications-total-change-motion",
    slug: "applications-total-change-motion",
    title: "Applications of integration: total change and motion",
    description:
      "Use integration to calculate total change, displacement, and other contextual quantities from rates.",
    status: "active",
  },
  {
    id: "mixed-integral-calculus-exam-practice",
    slug: "mixed-integral-calculus-exam-practice",
    title: "Mixed integral calculus exam practice",
    description:
      "Practise mixed HSC-style integration questions involving primitives, definite integrals, area, approximation, and applications.",
    status: "active",
  },
];

export const integralCalculusLessons = [
  antidifferentiationReversePowerRuleLesson,
  indefiniteIntegralsConstantOfIntegrationLesson,
  initialConditionsParticularPrimitiveLesson,
  definiteIntegralsFundamentalTheoremLesson,
  signedAreaTotalAreaLesson,
  areaUnderCurveLesson,
  trapezoidalRuleAreaApproximationLesson,
  areaBetweenTwoCurvesLesson,
  integratingExponentialsAnyBaseLesson,
  areasWithRespectToYAxisLesson,
  applicationsTotalChangeMotionLesson,
  mixedIntegralCalculusExamPracticeLesson,
];
