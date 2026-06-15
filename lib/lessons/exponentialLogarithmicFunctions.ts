import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";

function expChoice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Check the inverse relationship, log law, domain restriction, or model structure before choosing."
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

function expNumber(
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
    hint: "Give the requested integer or rounded decimal only.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function expLesson(
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
    moduleSlug: "exponential-logarithmic-functions",
    moduleTitle: "Exponential and Logarithmic Functions",
    courseTitle: "Year 12 Mathematics Advanced",
    title,
    description,
    syllabusArea: "Exponential and Logarithmic Functions",
    focus: "Exponential and logarithmic functions",
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

export const logarithmLawsChangeOfBaseLesson = expLesson(
  "logarithm-laws-change-of-base",
  "Logarithm Laws and Change of Base",
  "Apply product, quotient and power laws, use change of base, evaluate special logarithms, and check logarithm domains.",
  "Learn how logarithm laws and change of base support exact simplification, calculator evaluation, and domain-aware algebra.",
  [
    "Use product, quotient, and power laws for logarithms with the same base.",
    "Expand and collapse logarithmic expressions in valid forms.",
    "Evaluate special values such as $\\log_a1$, $\\log_aa$, and $\\log_a(a^n)$.",
    "Use the change of base formula to evaluate logarithms on a calculator.",
    "Identify domain restrictions for logarithmic expressions.",
    "Avoid applying logarithm laws to sums or invalid inputs.",
  ],
  {
    paragraphs: [
      "Logarithm laws are the exponent laws written in logarithmic language. They work when the logarithms have the same valid base and positive inputs.",
      "The product law turns multiplication inside one logarithm into addition of two logarithms. The quotient law turns division inside one logarithm into subtraction.",
      "The power law moves an exponent inside a logarithm to the front as a multiplier.",
      "Special values come from asking simple exponent questions: what power of a gives 1, a, or a power of a?",
      "Change of base rewrites a logarithm using a convenient base, usually base 10 or base e on a calculator.",
      "Before solving or simplifying with variables, check the domain. Every logarithm input must be positive, and the base must be positive and not equal to 1.",
    ],
    latexBlocks: [
      "\\log_a(MN)=\\log_aM+\\log_aN",
      "\\log_a\\left(\\frac{M}{N}\\right)=\\log_aM-\\log_aN",
      "\\log_a(M^p)=p\\log_aM",
      "\\log_a1=0,\\quad \\log_aa=1,\\quad \\log_a(a^n)=n",
      "\\log_ab=\\frac{\\log_cb}{\\log_ca}=\\frac{\\ln b}{\\ln a}",
      "\\log_a(M)\\text{ is defined when }a>0,\\ a\\ne1,\\ M>0",
    ],
  },
  [
    {
      title: "Expand a logarithmic expression",
      questionLatex: "\\log_3\\left(\\frac{9x^2}{y}\\right)",
      steps: [
        { explanation: "Use the quotient law to separate the numerator and denominator.", latex: "\\log_3(9x^2)-\\log_3y" },
        { explanation: "Use the product law on the numerator.", latex: "\\log_39+\\log_3(x^2)-\\log_3y" },
        { explanation: "Use the power law and evaluate the special value.", latex: "2+2\\log_3x-\\log_3y" },
      ],
      finalAnswerLatex: "2+2\\log_3x-\\log_3y",
    },
    {
      title: "Collapse logarithms into one logarithm",
      questionLatex: "2\\log_5x+\\log_5y",
      steps: [
        { explanation: "Use the power law in reverse.", latex: "2\\log_5x=\\log_5(x^2)" },
        { explanation: "Use the product law in reverse.", latex: "\\log_5(x^2)+\\log_5y=\\log_5(x^2y)" },
      ],
      finalAnswerLatex: "\\log_5(x^2y)",
    },
    {
      title: "Use change of base",
      questionLatex: "\\log_3 20",
      steps: [
        { explanation: "Rewrite using natural logarithms or common logarithms.", latex: "\\log_3 20=\\frac{\\ln20}{\\ln3}" },
        { explanation: "Evaluate with a calculator when a decimal is requested.", latex: "\\frac{\\ln20}{\\ln3}\\approx2.73" },
      ],
      finalAnswerLatex: "\\frac{\\ln20}{\\ln3}\\approx2.73",
    },
    {
      title: "Find a domain restriction",
      questionLatex: "\\log_2(x-4)",
      steps: [
        { explanation: "The input to the logarithm must be positive.", latex: "x-4>0" },
        { explanation: "Solve the inequality.", latex: "x>4" },
      ],
      finalAnswerLatex: "x>4",
    },
  ],
  [
    expChoice("exp-log-laws-g1", "Which expansion correctly uses the product law?", "\\log_2(8x)", "C", ["$\\log_2 8\\log_2 x$", "$\\log_2(8+x)$", "$\\log_2 8+\\log_2 x$", "$8+\\log_2 x$"], "A product inside one logarithm becomes a sum of logarithms."),
    expChoice("exp-log-laws-g2", "Which expression is equivalent by the power law?", "\\log_5(x^3)", "B", ["$\\log_5x+3$", "$3\\log_5x$", "$(\\log_5x)^3$", "$\\log_5(3x)$"], "The exponent moves to the front as a multiplier."),
    expNumber("exp-log-laws-g3", "Evaluate the special logarithm value.", "\\log_7(7^4)", "4"),
    expChoice("exp-log-laws-g4", "Which change of base expression is correct?", "\\log_4 13", "A", ["$\\frac{\\ln13}{\\ln4}$", "$\\frac{\\ln4}{\\ln13}$", "$\\ln(13-4)$", "$\\ln13\\ln4$"], "The input goes in the numerator and the base goes in the denominator."),
  ],
  [
    expChoice("exp-log-laws-i1", "Which collapsed expression is equivalent?", "\\log_3x+\\log_3y", "D", ["$\\log_3(x+y)$", "$\\log_3x\\log_3y$", "$\\log_3\\left(\\frac{x}{y}\\right)$", "$\\log_3(xy)$"], "The sum of logs with the same base collapses to the log of a product."),
    expChoice("exp-log-laws-i2", "Which expansion is correct?", "\\log_2\\left(\\frac{x^3}{5}\\right)", "B", ["$\\log_2x^3+\\log_25$", "$3\\log_2x-\\log_25$", "$\\log_2x-3\\log_25$", "$\\frac{3\\log_2x}{\\log_25}$"], "Use the power law and quotient law."),
    expNumber("exp-log-laws-i3", "Use change of base. Round to 2 decimal places.", "\\log_5 40", "2.29", ["2.292"], "$\\log_540=\\frac{\\ln40}{\\ln5}\\approx2.29$."),
    expChoice("exp-log-laws-i4", "Which domain statement is correct?", "\\log_6(x+2)", "C", ["$x>2$", "$x< -2$", "$x>-2$", "$x\\ge-2$"], "The input x + 2 must be positive."),
    expChoice("exp-log-laws-i5", "Which statement identifies the invalid log-law move?", "\\log_2(x+5)=\\log_2x+\\log_25", "A", ["Log laws do not split a sum inside a logarithm", "The bases should be multiplied", "The input must be negative", "The answer should be a decimal"], "There is no general law for the logarithm of a sum."),
  ],
  [
    { mistake: "$\\log(a+b)=\\log a+\\log b$.", fix: "Log laws split products, quotients and powers, not general sums." },
    { mistake: "Using the product law as a product of logarithms.", fix: "$\\log_a(MN)$ becomes $\\log_aM+\\log_aN$, not $\\log_aM\\log_aN$." },
    { mistake: "Inverting the change of base formula.", fix: "The input goes on top: $\\log_ab=\\frac{\\ln b}{\\ln a}$." },
    { mistake: "Ignoring domain restrictions.", fix: "Every logarithm input must be positive before the algebra is valid." },
  ],
  [
    expNumber("exp-log-laws-m1", "Evaluate the special logarithm value.", "\\log_9 1", "0"),
    expNumber("exp-log-laws-m2", "Evaluate the special logarithm value.", "\\log_4 4", "1"),
    expChoice("exp-log-laws-m3", "Which expansion is correct?", "\\log_7(3x^2)", "B", ["$\\log_73+\\log_7x+2$", "$\\log_73+2\\log_7x$", "$3\\log_7x^2$", "$\\log_7(3+x^2)$"], "Use product and power laws."),
    expChoice("exp-log-laws-m4", "Which expression is equivalent?", "\\log_5a-\\log_5b", "A", ["$\\log_5\\left(\\frac{a}{b}\\right)$", "$\\log_5(a-b)$", "$\\log_5(ab)$", "$\\frac{\\log_5b}{\\log_5a}$"], "Subtraction of logs collapses to the log of a quotient."),
    expChoice("exp-log-laws-m5", "Which change of base expression is correct?", "\\log_8 11", "C", ["$\\frac{\\ln8}{\\ln11}$", "$\\ln(88)$", "$\\frac{\\ln11}{\\ln8}$", "$\\frac{8}{11}$"], "Change of base places the input over the base."),
    expNumber("exp-log-laws-m6", "Use change of base. Round to 2 decimal places.", "\\log_2 50", "5.64", ["5.644", "5.643"], "$\\log_250\\approx5.64$."),
    expChoice("exp-log-laws-m7", "Which condition must be true for this expression to be defined?", "\\log_3(2x-6)", "D", ["$x<3$", "$x\\ne3$", "$x\\ge3$", "$x>3$"], "The input 2x - 6 must be positive."),
    expChoice("exp-log-laws-m8", "Choose the strongest simplification.", "\\log_2(16x^4)-\\log_2x", "A", ["$4+3\\log_2x$", "$16+3\\log_2x$", "$4\\log_2x-\\log_216$", "$\\log_2(16+x^3)$"], "Expand then combine: log base 2 of 16 is 4 and x powers reduce to x cubed."),
    expChoice("exp-log-laws-m9", "Which collapsed expression matches the logs?", "2\\log_3x-\\log_3y+\\log_35", "C", ["$\\log_3(2x-y+5)$", "$\\log_3\\left(\\frac{2xy}{5}\\right)$", "$\\log_3\\left(\\frac{5x^2}{y}\\right)$", "$\\log_3\\left(\\frac{y}{5x^2}\\right)$"], "Use the power, quotient and product laws in reverse."),
    expChoice("exp-log-laws-m10", "Which option gives the correct domain before any simplification?", "\\log_4(x-1)+\\log_4(7-x)", "B", ["$x>1$", "$1<x<7$", "$x<7$", "$x\\ne1,7$"], "Both inputs must be positive at the same time."),
  ]
);

export const eulersNumberNaturalLogarithmLesson = expLesson(
  "eulers-number-natural-logarithm",
  "Euler's Number and the Natural Logarithm",
  "Use e, natural logarithms, inverse identities, and special values such as ln 1, ln e, and ln(e^k).",
  "Learn how e and ln work as inverse operations and how their special values simplify exponential and logarithmic expressions.",
  [
    "Recognise $e$ as a constant used for continuous exponential change.",
    "Use $\\ln x=\\log_ex$.",
    "Apply $\\ln(e^x)=x$ and $e^{\\ln x}=x$ when the expressions are defined.",
    "Evaluate $\\ln1$, $\\ln e$, and $\\ln(e^k)$.",
    "Simplify simple numeric e and ln expressions.",
    "Recognise that $\\ln x$ is defined only for positive x.",
  ],
  {
    paragraphs: [
      "Euler's number, written e, is an irrational constant approximately equal to 2.718.",
      "The natural logarithm is logarithm base e. It is written ln x rather than log base e of x.",
      "Because ln and powers of e are inverse operations, applying one after the other can undo the operation.",
      "The identity $\\ln(e^x)=x$ works for every real x. The identity $e^{\\ln x}=x$ requires x to be positive because ln x must exist.",
      "These identities are essential in later calculus and modelling, but this lesson focuses only on algebraic and numeric simplification.",
      "When an answer is an exact expression involving e or ln, this course uses multiple choice so equivalent forms are marked reliably.",
    ],
    latexBlocks: [
      "e\\approx2.71828",
      "\\ln x=\\log_ex",
      "\\ln(e^x)=x",
      "e^{\\ln x}=x\\quad (x>0)",
      "\\ln1=0,\\quad \\ln e=1,\\quad \\ln(e^k)=k",
    ],
  },
  [
    {
      title: "Use the meaning of ln",
      questionLatex: "\\ln x",
      steps: [
        { explanation: "Natural logarithm means logarithm base e.", latex: "\\ln x=\\log_ex" },
        { explanation: "The input must be positive.", latex: "x>0" },
      ],
      finalAnswerLatex: "\\log_ex,\\quad x>0",
    },
    {
      title: "Simplify a natural logarithm of an exponential",
      questionLatex: "\\ln(e^7)",
      steps: [
        { explanation: "ln reverses a power of e.", latex: "\\ln(e^x)=x" },
        { explanation: "Here the exponent is 7.", latex: "\\ln(e^7)=7" },
      ],
      finalAnswerLatex: "7",
    },
    {
      title: "Simplify an exponential of a natural logarithm",
      questionLatex: "e^{\\ln 12}",
      steps: [
        { explanation: "The input 12 is positive, so ln 12 is defined.", latex: "12>0" },
        { explanation: "e to the power ln of a positive number returns that number.", latex: "e^{\\ln12}=12" },
      ],
      finalAnswerLatex: "12",
    },
    {
      title: "Identify a domain issue",
      questionLatex: "e^{\\ln(x-3)}",
      steps: [
        { explanation: "The logarithm input must be positive.", latex: "x-3>0" },
        { explanation: "Only then can the inverse identity be used.", latex: "x>3" },
      ],
      finalAnswerLatex: "x-3\\text{ when }x>3",
    },
  ],
  [
    expNumber("exp-ln-g1", "Evaluate the natural logarithm.", "\\ln(e^5)", "5"),
    expNumber("exp-ln-g2", "Evaluate the special value.", "\\ln 1", "0"),
    expChoice("exp-ln-g3", "Which statement correctly describes the natural logarithm?", "\\ln x", "B", ["Logarithm base 10", "Logarithm base e", "Multiplication by n", "Only a calculus symbol"], "The natural logarithm is logarithm base e."),
    expChoice("exp-ln-g4", "Which simplification is valid when the input is positive?", "e^{\\ln x}", "D", ["$e+x$", "$\\ln(ex)$", "$1$", "$x$"], "Powers of e reverse natural logarithms for positive inputs."),
  ],
  [
    expNumber("exp-ln-i1", "Evaluate the expression.", "e^{\\ln 9}", "9"),
    expNumber("exp-ln-i2", "Evaluate the expression.", "\\ln(e^{-3})", "-3"),
    expChoice("exp-ln-i3", "Which option is equivalent?", "\\ln(e^{2x+1})", "A", ["$2x+1$", "$e^{2x+1}$", "$\\ln(2x+1)$", "$x$"], "ln reverses the power of e."),
    expChoice("exp-ln-i4", "Which condition is needed before using the inverse identity?", "e^{\\ln(4-x)}", "C", ["$x>4$", "$x\\ne4$", "$x<4$", "$x\\ge4$"], "The input 4 - x must be positive."),
    expNumber("exp-ln-i5", "Use a calculator. Round e to 3 decimal places.", "e", "2.718", ["2.72"], "Euler's number is approximately 2.718."),
  ],
  [
    { mistake: "Treating $\\ln x$ as multiplication by n.", fix: "$\\ln x$ means logarithm base e." },
    { mistake: "Using $e^{\\ln x}=x$ without checking the logarithm input.", fix: "The input x must be positive for $\\ln x$ to be defined." },
    { mistake: "Changing $\\ln(e^x)$ into $e^x$.", fix: "ln reverses the e power, leaving the exponent." },
    { mistake: "Thinking e is a variable to solve for.", fix: "e is a fixed constant, approximately 2.718." },
  ],
  [
    expNumber("exp-ln-m1", "Evaluate the special value.", "\\ln e", "1"),
    expNumber("exp-ln-m2", "Evaluate the expression.", "\\ln(e^{12})", "12"),
    expNumber("exp-ln-m3", "Evaluate the expression.", "e^{\\ln 15}", "15"),
    expChoice("exp-ln-m4", "Which simplification is correct?", "\\ln(e^{x-4})", "C", ["$e^{x-4}$", "$\\ln(x-4)$", "$x-4$", "$4-x$"], "ln reverses the exponential base e."),
    expChoice("exp-ln-m5", "Which natural logarithm expression equals 1?", "\\text{Natural log special values}", "A", ["$\\ln e$", "$\\ln 1$", "$e$", "$\\ln(e^0)$"], "ln e equals 1. The other options are 0 or not a natural logarithm value of 1."),
    expChoice("exp-ln-m6", "Which condition is needed for the expression to be defined?", "\\ln(2x+6)", "D", ["$x>3$", "$x<-3$", "$x\\ge-3$", "$x>-3$"], "The input 2x + 6 must be positive."),
    expNumber("exp-ln-m7", "Evaluate the expression.", "e^{\\ln 4}+\\ln(e^3)", "7"),
    expChoice("exp-ln-m8", "Which simplification is correct and includes the domain idea?", "e^{\\ln(x^2-9)}", "B", ["$x^2-9$ for all real x", "$x^2-9$ when $x<-3$ or $x>3$", "$x-3$ when $x>3$", "$e(x^2-9)$"], "The inside of ln must be positive."),
    expChoice("exp-ln-m9", "Which expression has no real value?", "\\text{Natural logarithm domain}", "C", ["$\\ln(e^{-2})$", "$e^{\\ln 2}$", "$\\ln(-4)$", "$\\ln 1$"], "A natural logarithm of a negative number is not defined in this course."),
    expChoice("exp-ln-m10", "Which chain of simplification is valid?", "\\ln(e^{3x})+e^{\\ln 5}", "A", ["$3x+5$", "$3ex+5$", "$e^{3x}+\\ln5$", "$8x$"], "Use each inverse identity separately."),
  ]
);

export const solvingEquationsELnLesson = expLesson(
  "solving-equations-e-ln",
  "Solving Equations with e and ln",
  "Solve exponential and logarithmic equations using inverse operations, logarithm laws, exact forms, decimal approximations, and domain checks.",
  "Learn how to isolate exponential or logarithmic expressions, choose exact e or ln forms, and reject invalid logarithmic solutions.",
  [
    "Solve equations of the form $e^x=N$.",
    "Solve equations of the form $Ae^{kx}=B$ by isolating the exponential first.",
    "Solve equations of the form $\\ln x=c$.",
    "Use logarithm laws before solving combined logarithm equations.",
    "Check the domain of logarithmic equations and reject extraneous solutions.",
    "Distinguish exact symbolic forms from decimal approximations.",
  ],
  {
    paragraphs: [
      "The natural logarithm reverses powers of e, so it is the main tool for solving equations with e when the exponent is unknown.",
      "Before applying ln to an exponential equation, isolate the whole exponential term. This prevents coefficient errors.",
      "For equations involving ln, exponentiate both sides using base e.",
      "When logarithms are combined, use log laws first to form one logarithm where possible.",
      "Domain checks are part of the solution. A value that makes any logarithm input zero or negative must be rejected.",
      "Exact answers involving e or ln are presented as multiple choice here. Typed answers are used only for clean integers or rounded decimals.",
    ],
    latexBlocks: [
      "e^x=N\\Rightarrow x=\\ln N",
      "Ae^{kx}=B\\Rightarrow e^{kx}=\\frac BA\\Rightarrow kx=\\ln\\left(\\frac BA\\right)",
      "\\ln x=c\\Rightarrow x=e^c",
      "\\ln M+\\ln N=\\ln(MN)",
      "\\text{Check every logarithm input is positive.}",
    ],
  },
  [
    {
      title: "Solve an equation with e",
      questionLatex: "e^x=9",
      steps: [
        { explanation: "Apply natural logarithm to both sides.", latex: "\\ln(e^x)=\\ln9" },
        { explanation: "Use the inverse identity.", latex: "x=\\ln9" },
        { explanation: "A decimal approximation may also be requested.", latex: "x\\approx2.20" },
      ],
      finalAnswerLatex: "x=\\ln9\\approx2.20",
    },
    {
      title: "Isolate the exponential first",
      questionLatex: "4e^{2x}=28",
      steps: [
        { explanation: "Divide by 4 before applying ln.", latex: "e^{2x}=7" },
        { explanation: "Apply ln and use the inverse identity.", latex: "2x=\\ln7" },
        { explanation: "Divide by 2.", latex: "x=\\frac{\\ln7}{2}" },
      ],
      finalAnswerLatex: "\\frac{\\ln7}{2}",
    },
    {
      title: "Solve a natural logarithm equation",
      questionLatex: "\\ln(x-3)=2",
      steps: [
        { explanation: "Convert to exponential form.", latex: "x-3=e^2" },
        { explanation: "Solve for x.", latex: "x=e^2+3" },
      ],
      finalAnswerLatex: "x=e^2+3",
    },
    {
      title: "Reject an extraneous logarithm solution",
      questionLatex: "\\ln(x-2)+\\ln(x+4)=\\ln8",
      steps: [
        { explanation: "The domain requires x > 2 and x > -4, so x > 2.", latex: "x>2" },
        { explanation: "Combine the logarithms.", latex: "\\ln((x-2)(x+4))=\\ln8" },
        { explanation: "Solve the resulting quadratic.", latex: "(x-2)(x+4)=8\\Rightarrow x^2+2x-16=0" },
        { explanation: "Only the positive-domain solution is accepted.", latex: "x=-1+\\sqrt{17}" },
      ],
      finalAnswerLatex: "-1+\\sqrt{17}",
    },
  ],
  [
    expChoice("exp-solve-g1", "Which exact solution is correct?", "e^x=6", "A", ["$x=\\ln6$", "$x=e^6$", "$x=6e$", "$x=\\frac{1}{\\ln6}$"], "Natural logarithm reverses the exponential base e."),
    expChoice("exp-solve-g2", "Which first step is correct?", "5e^{2x}=40", "D", ["$\\ln5+2x=40$", "$e^{2x}=40$", "$2x=\\ln40$", "$e^{2x}=8$"], "Isolate the whole exponential term before applying ln."),
    expNumber("exp-solve-g3", "Solve the equation. Give the integer only.", "\\ln x=3\\ln2", "8", [], "$3\\ln2=\\ln(2^3)=\\ln8$, so x = 8."),
    expChoice("exp-solve-g4", "Which solution must be rejected?", "\\ln(x-5)=\\ln3,\\quad \\text{candidate solutions }8\\text{ and }2", "B", ["8", "2", "Both", "Neither"], "x = 2 makes x - 5 negative."),
  ],
  [
    expNumber("exp-solve-i1", "Solve. Round to 2 decimal places.", "e^x=10", "2.30", ["2.3", "2.303"], "$x=\\ln10\\approx2.30$."),
    expChoice("exp-solve-i2", "Which exact solution is correct?", "3e^{-2x}=12", "C", ["$x=\\ln4$", "$x=\\frac{\\ln4}{2}$", "$x=-\\frac{\\ln4}{2}$", "$x=-2\\ln4$"], "After dividing by 3, $e^{-2x}=4$, so $-2x=\\ln4$."),
    expChoice("exp-solve-i3", "Which exact solution is correct?", "\\ln(x+1)=4", "D", ["$x=\\ln4-1$", "$x=e^4$", "$x=4e-1$", "$x=e^4-1$"], "Convert from natural log form to exponential form."),
    expNumber("exp-solve-i4", "Solve after combining logs. Give the integer only.", "\\ln x+\\ln 5=\\ln 45", "9", [], "Combine to $\\ln(5x)=\\ln45$, so 5x = 45."),
    expChoice("exp-solve-i5", "Which domain condition is needed before solving?", "\\ln(x-1)+\\ln(x+2)=\\ln10", "A", ["$x>1$", "$x>-2$", "$-2<x<1$", "$x\\ne1$"], "Both log inputs must be positive, so the stricter condition is x > 1."),
  ],
  [
    { mistake: "Applying ln before isolating $e^{...}$.", fix: "Divide or subtract first so the exponential term is alone." },
    { mistake: "Forgetting domain restrictions.", fix: "Check every logarithm input before accepting a solution." },
    { mistake: "Accepting extraneous log-equation solutions.", fix: "Substitute candidates into the original logarithm inputs." },
    { mistake: "Typing exact ln or e-form answers into a free text field.", fix: "Use multiple choice for symbolic exact forms and typed answers only for clean numbers." },
  ],
  [
    expChoice("exp-solve-m1", "Which exact solution is correct?", "e^x=14", "B", ["$x=e^{14}$", "$x=\\ln14$", "$x=14\\ln e$", "$x=\\log_{14}e$"], "Apply ln to both sides."),
    expNumber("exp-solve-m2", "Solve. Round to 2 decimal places.", "e^{2x}=20", "1.50", ["1.5", "1.498"], "$2x=\\ln20$, so x is about 1.50."),
    expChoice("exp-solve-m3", "Which exact solution is correct?", "6e^{3x}=42", "A", ["$x=\\frac{\\ln7}{3}$", "$x=3\\ln7$", "$x=\\ln42-6$", "$x=\\frac{\\ln42}{3}$"], "Divide by 6 before applying ln."),
    expChoice("exp-solve-m4", "Which exact solution is correct?", "\\ln(2x)=5", "D", ["$x=e^5-2$", "$x=2e^5$", "$x=\\ln5$", "$x=\\frac{e^5}{2}$"], "Convert to $2x=e^5$."),
    expNumber("exp-solve-m5", "Solve after combining logs. Give the integer only.", "\\ln x+\\ln(x-2)=\\ln15", "5", [], "The candidates are 5 and -3; only 5 is in the domain."),
    expChoice("exp-solve-m6", "Which candidate must be rejected?", "\\ln(x-4)+\\ln x=\\ln12,\\quad \\text{candidates }6\\text{ and }-2", "C", ["6", "Neither", "-2", "Both"], "x = -2 makes both original logarithm inputs invalid."),
    expChoice("exp-solve-m7", "Which exact solution is correct?", "2e^{-0.5t}=0.5", "B", ["$t=\\ln4$", "$t=2\\ln4$", "$t=-2\\ln4$", "$t=\\frac{\\ln4}{2}$"], "After dividing, $e^{-0.5t}=0.25$, so $-0.5t=\\ln0.25=-\\ln4$."),
    expNumber("exp-solve-m8", "Solve. Round to 2 decimal places.", "7e^{0.4x}=30", "3.63", ["3.634", "3.63"], "$e^{0.4x}=30/7$, so x is about 3.63."),
    expChoice("exp-solve-m9", "Which exact solution follows from the log law?", "\\ln(x+6)-\\ln x=\\ln4", "A", ["$x=2$", "$x=6$", "$x=-2$", "$x=e^4$"], "The equation gives $(x+6)/x=4$, so x = 2."),
    expChoice("exp-solve-m10", "Which reasoning is strongest for this equation?", "\\ln(x-3)+\\ln(x+1)=\\ln5", "D", ["Solve the quadratic and accept both roots", "Apply ln again to both sides", "Cancel ln and ignore input restrictions", "Combine logs, solve, then reject any value outside x > 3"], "The domain check is essential before accepting a logarithmic solution."),
  ]
);

export const exponentialGrowthDecayModellingLesson = expLesson(
  "exponential-growth-decay-modelling",
  "Exponential Growth and Decay Modelling",
  "Use continuous exponential models, interpret parameters, solve for k or t, and handle half-life, doubling time, and contextual units.",
  "Learn how $A=A_0e^{kt}$ models continuous growth and decay, including solving for a rate constant or time from contextual information.",
  [
    "Interpret $A_0$, k, and t in the model $A=A_0e^{kt}$.",
    "Identify growth or decay from the sign of k.",
    "Find A from a continuous exponential model.",
    "Find k from two conditions.",
    "Find t from a target value.",
    "Use half-life and doubling time in continuous exponential models.",
    "State contextual units and interpret results realistically.",
  ],
  {
    paragraphs: [
      "The model $A=A_0e^{kt}$ describes continuous exponential change. $A_0$ is the initial amount, t is time, and k controls the rate and direction of change.",
      "If k is positive, the quantity grows. If k is negative, the quantity decays.",
      "To find k from two conditions, substitute the known amount and time, divide by the initial amount, then apply ln.",
      "To find t from a target amount, isolate the exponential term, apply ln, then divide by k.",
      "Half-life means the time for the amount to halve. Doubling time means the time for the amount to double.",
      "Always keep track of units. The units of k depend on the time unit used for t.",
    ],
    latexBlocks: [
      "A=A_0e^{kt}",
      "k>0\\Rightarrow \\text{growth},\\quad k<0\\Rightarrow \\text{decay}",
      "k=\\frac{1}{t}\\ln\\left(\\frac{A}{A_0}\\right)",
      "t=\\frac{1}{k}\\ln\\left(\\frac{A}{A_0}\\right)",
      "\\text{doubling time }=\\frac{\\ln2}{k},\\quad \\text{half-life }=\\frac{\\ln(1/2)}{k}",
    ],
  },
  [
    {
      title: "Evaluate a continuous growth model",
      questionLatex: "P=1200e^{0.04t},\\quad t=5",
      steps: [
        { explanation: "Substitute the time into the model.", latex: "P=1200e^{0.04(5)}" },
        { explanation: "Evaluate and round to the nearest whole number.", latex: "P\\approx1466" },
      ],
      finalAnswerLatex: "1466",
    },
    {
      title: "Find k from two conditions",
      questionLatex: "A_0=50,\\quad A=80\\text{ when }t=6",
      steps: [
        { explanation: "Substitute into the model.", latex: "80=50e^{6k}" },
        { explanation: "Divide by the initial amount.", latex: "1.6=e^{6k}" },
        { explanation: "Apply ln and divide by 6.", latex: "k=\\frac{\\ln1.6}{6}\\approx0.0783" },
      ],
      finalAnswerLatex: "k\\approx0.0783",
    },
    {
      title: "Find time from a target value",
      questionLatex: "M=200e^{-0.12t},\\quad M=50",
      steps: [
        { explanation: "Substitute the target amount.", latex: "50=200e^{-0.12t}" },
        { explanation: "Divide by the initial amount.", latex: "0.25=e^{-0.12t}" },
        { explanation: "Apply ln and divide by -0.12.", latex: "t=\\frac{\\ln0.25}{-0.12}\\approx11.55" },
      ],
      finalAnswerLatex: "11.55\\text{ time units}",
    },
    {
      title: "Use half-life information",
      questionLatex: "\\text{A sample has half-life }8\\text{ days. Find }k.",
      steps: [
        { explanation: "After 8 days, the amount is half the initial amount.", latex: "\\frac12=e^{8k}" },
        { explanation: "Apply ln and divide by 8.", latex: "k=\\frac{\\ln(1/2)}{8}" },
        { explanation: "The value is negative because this is decay.", latex: "k\\approx-0.0866" },
      ],
      finalAnswerLatex: "k\\approx-0.0866\\text{ per day}",
    },
  ],
  [
    expChoice("exp-model-g1", "Which interpretation is correct?", "A=400e^{-0.08t}", "B", ["Growth from 400", "Decay from 400", "Decay from 0.08", "Linear decrease"], "The initial amount is 400 and k is negative."),
    expNumber("exp-model-g2", "Find A. Round to the nearest whole number.", "A=100e^{0.2t},\\quad t=3", "182", ["182.2"], "$100e^{0.6}\\approx182$."),
    expChoice("exp-model-g3", "Which setup correctly finds k?", "90=60e^{5k}", "A", ["$k=\\frac{\\ln(90/60)}{5}$", "$k=5\\ln(90/60)$", "$k=\\frac{\\ln(60/90)}{5}$", "$k=\\ln(90-60)$"], "Divide by the initial amount, apply ln, then divide by time."),
    expNumber("exp-model-g4", "Find t. Round to 2 decimal places.", "300=500e^{-0.1t}", "5.11", ["5.108", "5.1"], "$t=\\ln(300/500)/(-0.1)\\approx5.11$."),
  ],
  [
    expChoice("exp-model-i1", "Which model represents continuous growth from 1200 at 3% per year?", "\\text{Continuous model}", "D", ["$A=1200e^{-0.03t}$", "$A=0.03e^{1200t}$", "$A=1200(0.03)^t$", "$A=1200e^{0.03t}$"], "Growth uses a positive k value."),
    expNumber("exp-model-i2", "Find A. Round to the nearest whole number.", "A=250e^{-0.15t},\\quad t=4", "137", ["137.2"], "$250e^{-0.6}\\approx137$."),
    expNumber("exp-model-i3", "Find k. Round to 3 decimal places.", "80=100e^{10k}", "-0.022", ["-0.0223"], "$k=\\ln(0.8)/10\\approx-0.022$."),
    expChoice("exp-model-i4", "Which exact expression gives the doubling time?", "A=A_0e^{0.07t}", "C", ["$\\frac{0.07}{\\ln2}$", "$\\ln(2)(0.07)$", "$\\frac{\\ln2}{0.07}$", "$\\frac{\\ln0.07}{2}$"], "Set A/A0 = 2 and solve for t."),
    expChoice("exp-model-i5", "Which modelling error is shown?", "A=500e^{-0.04}", "A", ["The time t has been left out of the exponent", "The initial amount should be negative", "Decay requires positive k", "The base should be 10"], "The continuous model needs kt in the exponent."),
  ],
  [
    { mistake: "Using the wrong sign of k for decay.", fix: "Continuous decay has k < 0." },
    { mistake: "Using $A=A_0e^k$ instead of $A=A_0e^{kt}$.", fix: "Include time in the exponent unless the model is specifically for one time unit." },
    { mistake: "Solving for k without first dividing by $A_0$.", fix: "Isolate the exponential term before applying ln." },
    { mistake: "Forgetting the time units.", fix: "If t is measured in years, k is per year and the solved time is in years." },
  ],
  [
    expNumber("exp-model-m1", "Find A. Round to the nearest whole number.", "A=600e^{0.05t},\\quad t=4", "733", ["733.7"], "$600e^{0.2}\\approx733$."),
    expChoice("exp-model-m2", "Which statement describes the model?", "N=900e^{-0.12t}", "C", ["Growth with initial amount 0.12", "Decay with initial amount 0", "Decay with initial amount 900", "Growth with initial amount 900"], "A negative k value gives decay."),
    expNumber("exp-model-m3", "Find k. Round to 3 decimal places.", "150=100e^{8k}", "0.051", ["0.0507"], "$k=\\ln(1.5)/8\\approx0.051$."),
    expNumber("exp-model-m4", "Find t. Round to 2 decimal places.", "100=350e^{-0.2t}", "6.26", ["6.263"], "$t=\\ln(100/350)/(-0.2)\\approx6.26$."),
    expChoice("exp-model-m5", "Which exact expression gives k for a half-life of 12 hours?", "A=A_0e^{kt}", "B", ["$k=\\frac{\\ln2}{12}$", "$k=\\frac{\\ln(1/2)}{12}$", "$k=12\\ln(1/2)$", "$k=\\ln(12/2)$"], "Half-life means A/A0 = 1/2 after 12 hours."),
    expNumber("exp-model-m6", "A culture doubles every 9 hours. Find k. Round to 3 decimal places.", "2=e^{9k}", "0.077", ["0.0770"], "$k=\\ln2/9\\approx0.077$."),
    expChoice("exp-model-m7", "Which setup correctly finds the time to reach a target?", "40=120e^{-0.18t}", "D", ["$t=\\frac{\\ln(120/40)}{0.18}$", "$t=-0.18\\ln(40/120)$", "$t=\\ln(40/120)-0.18$", "$t=\\frac{\\ln(40/120)}{-0.18}$"], "Divide by 120, apply ln, then divide by -0.18."),
    expNumber("exp-model-m8", "Find the half-life. Round to 2 decimal places.", "A=A_0e^{-0.08t}", "8.66", ["8.664", "8.7"], "$t=\\ln(1/2)/(-0.08)\\approx8.66$."),
    expChoice("exp-model-m9", "Which interpretation best matches the solved value k = -0.046 per day?", "\\text{Continuous model}", "A", ["The amount is decaying continuously, with t measured in days", "The amount grows by 4.6 each day", "The initial amount is -0.046", "The half-life is exactly 0.046 days"], "A negative k indicates decay, and the unit is tied to days."),
    expChoice("exp-model-m10", "A sample decreases from 500 g to 310 g in 7 days. Which expression finds k?", "A=A_0e^{kt}", "C", ["$k=\\frac{\\ln(500/310)}{7}$", "$k=7\\ln(310/500)$", "$k=\\frac{\\ln(310/500)}{7}$", "$k=\\ln(310-500)$"], "Use $k=\\ln(A/A_0)/t$, which is negative for decay."),
  ]
);

// MA-E1: rate of change in exponential growth/decay models (NSW dot-point: apply calculus to interpret instantaneous rate of change in exponential contexts)
exponentialGrowthDecayModellingLesson.multiPartPractice = [
  {
    id: "exp-model-mp1",
    prompt: "A population grows according to the model below, where $t$ is time in years.",
    latex: "P=500e^{0.04t}",
    answer: "500",
    hint: "Differentiate using the chain rule: $\\frac{d}{dt}[e^{kt}]=ke^{kt}$. Evaluate at each given time after differentiating.",
    explanation: "Part (a): $P=500e^0=500$. Part (b): $\\frac{dP}{dt}=20e^{0.04t}$; at $t=0$ this equals $20$. Part (c): At $t=10$, $\\frac{dP}{dt}=20e^{0.4}\\approx30$ per year.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the initial population.",
        marks: 1,
        answer: "500",
        acceptedAnswers: [],
        hint: "Substitute $t=0$ into the model.",
        explanation: "$P=500e^0=500$.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find $\\dfrac{dP}{dt}$ when $t=0$.",
        marks: 2,
        answer: "20",
        acceptedAnswers: [],
        hint: "Use the chain rule: $\\frac{dP}{dt}=500\\times0.04\\,e^{0.04t}$.",
        explanation: "$\\frac{dP}{dt}=20e^{0.04t}$. At $t=0$: $\\frac{dP}{dt}=20$ people per year.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find $\\dfrac{dP}{dt}$ when $t=10$. Give your answer to the nearest whole number.",
        marks: 2,
        answer: "30",
        acceptedAnswers: ["29", "30"],
        hint: "Substitute $t=10$ into $\\frac{dP}{dt}=20e^{0.04t}$.",
        explanation: "$\\frac{dP}{dt}=20e^{0.4}\\approx29.8$, which rounds to $30$ people per year.",
      },
    ],
  },
];

export const exponentialLogarithmicExamPracticeLesson = expLesson(
  "exponential-logarithmic-exam-practice",
  "Exponential and Logarithmic Functions Exam Practice",
  "Apply logarithm laws, change of base, e and ln identities, equation solving, domain checks, and growth-decay modelling in mixed HSC-style questions.",
  "Consolidate exponential and logarithmic function skills in mixed HSC-style practice with exact forms, domain checks, and modelling interpretation.",
  [
    "Choose appropriate logarithm laws in mixed settings.",
    "Use change of base for exact and approximate logarithm values.",
    "Simplify expressions using e and ln inverse identities.",
    "Solve equations involving e and ln.",
    "Reject solutions that break logarithm domain restrictions.",
    "Set up and solve continuous growth and decay models.",
  ],
  {
    paragraphs: [
      "Mixed exam questions often test the decision before the calculation: identify whether the expression needs a log law, change of base, an inverse identity, or a model equation.",
      "When exact symbolic forms appear, compare the structure of the options carefully. Equivalent-looking forms can have inverted change of base or missing coefficients.",
      "For logarithmic equations, the domain check is not optional. It can remove algebraic candidates.",
      "For modelling questions, write the ratio A/A0 before applying ln. This usually reveals whether the sign of k or t is sensible.",
      "Mastery questions near the end deliberately combine several skills, such as domain, log laws, exact forms, and continuous modelling.",
    ],
    latexBlocks: [
      "\\log_a(MN)=\\log_aM+\\log_aN",
      "\\log_ab=\\frac{\\ln b}{\\ln a}",
      "\\ln(e^x)=x,\\quad e^{\\ln x}=x\\ (x>0)",
      "e^x=N\\Rightarrow x=\\ln N",
      "A=A_0e^{kt}",
    ],
  },
  [
    {
      title: "Mixed logarithm law and domain",
      questionLatex: "\\log_2(x-1)+\\log_2(x+3)",
      steps: [
        { explanation: "Check both inputs are positive.", latex: "x-1>0,\\quad x+3>0\\Rightarrow x>1" },
        { explanation: "Use the product law only on valid inputs.", latex: "\\log_2((x-1)(x+3))" },
      ],
      finalAnswerLatex: "\\log_2((x-1)(x+3)),\\quad x>1",
    },
    {
      title: "Mixed e and ln equation",
      questionLatex: "2e^{0.5x}=18",
      steps: [
        { explanation: "Isolate the exponential.", latex: "e^{0.5x}=9" },
        { explanation: "Apply ln.", latex: "0.5x=\\ln9" },
        { explanation: "Solve for x.", latex: "x=2\\ln9\\approx4.39" },
      ],
      finalAnswerLatex: "2\\ln9\\approx4.39",
    },
    {
      title: "Mixed modelling question",
      questionLatex: "A=200e^{kt},\\quad A=320\\text{ when }t=4",
      steps: [
        { explanation: "Substitute the known condition.", latex: "320=200e^{4k}" },
        { explanation: "Divide by the initial amount.", latex: "1.6=e^{4k}" },
        { explanation: "Apply ln and divide by 4.", latex: "k=\\frac{\\ln1.6}{4}\\approx0.118" },
      ],
      finalAnswerLatex: "0.118",
    },
  ],
  [
    expChoice("exp-exam-g1", "Which expansion is correct?", "\\log_4(8x^2)", "B", ["$8+2\\log_4x$", "$\\log_48+2\\log_4x$", "$\\log_4(8+x^2)$", "$2\\log_4(8x)$"], "Use product and power laws."),
    expChoice("exp-exam-g2", "Which exact solution is correct?", "e^{3x}=11", "C", ["$x=3\\ln11$", "$x=e^{11}/3$", "$x=\\frac{\\ln11}{3}$", "$x=\\ln(11/3)$"], "Apply ln then divide by 3."),
    expNumber("exp-exam-g3", "Evaluate the expression.", "\\ln(e^6)+e^{\\ln4}", "10"),
    expChoice("exp-exam-g4", "Which setup correctly models the condition?", "\\text{Initial }70,\\ \\text{amount }98\\text{ after }5\\text{ years}", "A", ["$98=70e^{5k}$", "$70=98e^{5k}$", "$98=5e^{70k}$", "$98=70e^k$"], "Use A = A0 e^(kt) with t = 5."),
  ],
  [
    expNumber("exp-exam-i1", "Use change of base. Round to 2 decimal places.", "\\log_3 25", "2.93", ["2.929"], "$\\log_325\\approx2.93$."),
    expChoice("exp-exam-i2", "Which collapsed expression is equivalent?", "3\\log_2x-\\log_2y", "D", ["$\\log_2(3x-y)$", "$\\log_2\\left(\\frac{y}{x^3}\\right)$", "$\\log_2(3x/y)$", "$\\log_2\\left(\\frac{x^3}{y}\\right)$"], "Use the power law, then quotient law."),
    expChoice("exp-exam-i3", "Which domain condition is needed?", "\\ln(5-2x)", "A", ["$x<\\frac52$", "$x>\\frac52$", "$x\\ne\\frac52$", "$x\\ge\\frac52$"], "The input 5 - 2x must be positive."),
    expNumber("exp-exam-i4", "Solve. Round to 2 decimal places.", "4e^{0.3x}=20", "5.36", ["5.365", "5.36"], "$e^{0.3x}=5$, so x is about 5.36."),
    expChoice("exp-exam-i5", "Which model indicates continuous decay?", "\\text{Models}", "B", ["$A=120e^{0.03t}$", "$A=120e^{-0.03t}$", "$A=120+0.03t$", "$A=0.03e^{120t}$"], "A negative k value gives decay."),
  ],
  [
    { mistake: "$\\log(a+b)=\\log a+\\log b$.", fix: "Do not split sums inside logarithms." },
    { mistake: "Change of base inverted.", fix: "Use input over base, such as $\\log_ab=\\frac{\\ln b}{\\ln a}$." },
    { mistake: "Applying ln before isolating $e^{...}$.", fix: "Move coefficients outside the exponential first." },
    { mistake: "Accepting extraneous log-equation solutions.", fix: "Check each solution in the original logarithm inputs." },
    { mistake: "Using the wrong sign of k for decay.", fix: "Decay has k negative in $A=A_0e^{kt}$." },
  ],
  [
    expChoice("exp-exam-m1", "Which change of base expression is correct?", "\\log_6 19", "A", ["$\\frac{\\ln19}{\\ln6}$", "$\\frac{\\ln6}{\\ln19}$", "$\\ln(19-6)$", "$\\ln19-\\ln6$"], "The input is in the numerator."),
    expNumber("exp-exam-m2", "Evaluate the expression.", "\\ln(e^{-4})+e^{\\ln9}", "5"),
    expChoice("exp-exam-m3", "Which exact solution is correct?", "9e^{-2x}=3", "C", ["$x=\\ln3$", "$x=-2\\ln3$", "$x=\\frac{\\ln3}{2}$", "$x=-\\frac{\\ln3}{2}$"], "After dividing by 9, $e^{-2x}=1/3$, so $-2x=-\\ln3$ and x is half ln 3."),
    expChoice("exp-exam-m4", "Which solution is accepted after checking the domain?", "\\ln(x-2)+\\ln(x+1)=\\ln10", "B", ["$-4$", "$4$", "Both", "Neither"], "The quadratic gives 4 and -3, but the domain requires x > 2."),
    expNumber("exp-exam-m5", "Find k. Round to 3 decimal places.", "240=150e^{6k}", "0.078", ["0.0783"], "$k=\\ln(240/150)/6\\approx0.078$."),
    expChoice("exp-exam-m6", "Which expression is equivalent and respects the log laws?", "\\log_3(x^2-9)", "D", ["$2\\log_3x-\\log_39$", "$\\log_3x^2-\\log_39$", "$\\log_3(x-3)+9$", "$\\log_3(x-3)+\\log_3(x+3)$"], "Factor first, then use the product law where the domain is valid."),
    expChoice("exp-exam-m7", "Which exact expression gives the time to decay to 35% of the initial amount?", "A=A_0e^{-0.12t}", "A", ["$t=\\frac{\\ln0.35}{-0.12}$", "$t=-0.12\\ln0.35$", "$t=\\frac{\\ln(1/0.35)}{-0.12}$", "$t=\\ln(0.35-0.12)$"], "Set A/A0 = 0.35 and solve."),
    expChoice("exp-exam-m8", "Which domain must be checked before collapsing the expression?", "\\ln(x-4)-\\ln(2x+1)", "C", ["$x>-\\frac12$", "$x>4$ only after collapsing", "$x>4$", "$x<4$"], "Both inputs must be positive; x > 4 is stricter."),
    expNumber("exp-exam-m9", "Find the time. Round to 2 decimal places.", "60=180e^{-0.25t}", "4.39", ["4.394", "4.4"], "$t=\\ln(60/180)/(-0.25)\\approx4.39$."),
    expChoice("exp-exam-m10", "Which option is the strongest full solution strategy?", "\\ln(x-1)+\\ln(x-5)=\\ln14", "D", ["Cancel ln term by term and solve a linear equation", "Apply e to only the right side", "Use change of base first", "Set x > 5, combine logs, solve the quadratic, and reject invalid candidates"], "The domain and the combined-log equation are both needed."),
  ]
);

export const exponentialLogarithmicFunctionsLessons = [
  logarithmLawsChangeOfBaseLesson,
  eulersNumberNaturalLogarithmLesson,
  solvingEquationsELnLesson,
  exponentialGrowthDecayModellingLesson,
  exponentialLogarithmicExamPracticeLesson,
];

export const exponentialLogarithmicFunctionsOutline: LessonOutlineItem[] =
  exponentialLogarithmicFunctionsLessons.map((lesson) => ({
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    status: lesson.status,
  }));
