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
    "Recognise that the reverse power rule in this lesson does not apply to x^{-1}.",
  ],

  teaching: {
    paragraphs: [
      "Antidifferentiation is the reverse process of differentiation.",
      "A primitive, or antiderivative, is a function that differentiates to give the expression you started with.",
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
    },
    {
      id: "trap-ind-2",
      prompt: "Approximate using values of $y=x^2$ from $x=0$ to $x=2$ with $n=2$.",
      latex: "y\\text{-values: }0,1,4",
      answer: "3",
      hint: "$h=1$.",
      explanation: "$T=\\frac{1}{2}[0+2(1)+4]=3$.",
    },
    {
      id: "trap-ind-3",
      prompt: "Which values are doubled?",
      latex: "y_0, y_1, y_2, y_3, y_4",
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
  masteryTyped("definite-mastery-5", "Evaluate the definite integral.", "\\int_{-1}^{2} (4x-1)\\,dx", "0", ["zero"]),
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
  masteryTyped("trap-mastery-5", "Use the listed equally spaced y-values to approximate the area.", "y=x^2+1,\\quad 0\\le x\\le3,\\quad h=1,\\quad y:1,2,5,10", "14", ["14 square units", "14 units^2"]),
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
  masteryTyped("apps-mastery-4", "Find the net change.", "Q'(t)=6t-4,\\quad 1\\le t\\le3", "20", ["20 units"]),
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
  applicationsTotalChangeMotionLesson,
  mixedIntegralCalculusExamPracticeLesson,
];
