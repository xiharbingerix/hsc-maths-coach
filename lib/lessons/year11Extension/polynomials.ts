import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formulaAnswer, practicalChoice } from "../questionHelpers";

function countAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const intVal = Number(answer);
  const intVariant = Number.isInteger(intVal) && !Number.isNaN(intVal) ? [`${answer}.0`] : [];
  const question = formulaAnswer(id, prompt, latex, answer, [...intVariant, ...acceptedAnswers]);
  return { ...question, explanation };
}

function choice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return practicalChoice(id, prompt, answer, choices, explanation, latex);
}

const base = {
  syllabusArea: "Polynomials",
  masteryPassMark: 0.8,
};

function lessonBase(
  lesson: CourseLessonSeed,
  description: string,
  focus: string
): Partial<ExplicitLesson> {
  return {
    ...base,
    description,
    focus,
    status: "active",
  };
}

const terminologyExamples: WorkedExample[] = [
  {
    title: "Identify degree and leading coefficient",
    questionLatex: "P(x)=4x^5-2x^3+x-7",
    steps: [
      { explanation: "The highest power of x is 5.", latex: "\\deg P=5" },
      { explanation: "The coefficient of the highest-power term is 4.", latex: "\\text{leading coefficient}=4" },
    ],
    finalAnswerLatex: "\\deg P=5,\\quad \\text{leading coefficient}=4",
  },
  {
    title: "Find a constant term",
    questionLatex: "Q(x)=3x^4+x^2-9",
    steps: [
      { explanation: "The constant term is the term with no x.", latex: "-9" },
      { explanation: "It is also Q(0).", latex: "Q(0)=-9" },
    ],
    finalAnswerLatex: "-9",
  },
  {
    title: "Write in descending powers",
    questionLatex: "2-5x^3+x",
    steps: [
      { explanation: "Arrange powers from highest to lowest.", latex: "-5x^3+x+2" },
      { explanation: "The degree is then read from the first term.", latex: "\\deg=3" },
    ],
    finalAnswerLatex: "-5x^3+x+2",
  },
];

const divisionExamples: WorkedExample[] = [
  {
    title: "Use the remainder theorem",
    questionLatex: "P(x)=x^3-3x+1\\text{ divided by }x-2",
    steps: [
      { explanation: "The remainder is P(2).", latex: "P(2)=2^3-3(2)+1" },
      { explanation: "Evaluate.", latex: "8-6+1=3" },
    ],
    finalAnswerLatex: "3",
  },
  {
    title: "Divide by a linear factor",
    questionLatex: "(x^3-6x^2+11x-6)\\div(x-1)",
    steps: [
      { explanation: "Synthetic division by 1 gives quotient coefficients 1, -5, 6.", latex: "1,\\ -5,\\ 6" },
      { explanation: "The remainder is zero.", latex: "x^2-5x+6" },
    ],
    finalAnswerLatex: "x^2-5x+6",
  },
  {
    title: "Find an unknown coefficient",
    questionLatex: "P(x)=x^2+kx+6\\text{ has remainder }4\\text{ on division by }x-2",
    steps: [
      { explanation: "Use P(2)=4.", latex: "4+2k+6=4" },
      { explanation: "Solve for k.", latex: "2k=-6\\Rightarrow k=-3" },
    ],
    finalAnswerLatex: "k=-3",
  },
];

const factorExamples: WorkedExample[] = [
  {
    title: "Apply the factor theorem",
    questionLatex: "P(x)=x^3+2x^2-x-2",
    steps: [
      { explanation: "Test x equals negative 1.", latex: "P(-1)=-1+2+1-2=0" },
      { explanation: "Since the value is zero, x plus 1 is a factor.", latex: "(x+1)\\mid P(x)" },
    ],
    finalAnswerLatex: "(x+1)\\text{ is a factor}",
  },
  {
    title: "Fully factorise a cubic",
    questionLatex: "x^3-6x^2+11x-6",
    steps: [
      { explanation: "x equals 1 is a root, so x minus 1 is a factor.", latex: "P(1)=0" },
      { explanation: "Divide to get the quadratic quotient.", latex: "x^2-5x+6" },
      { explanation: "Factorise the quadratic.", latex: "x^2-5x+6=(x-2)(x-3)" },
    ],
    finalAnswerLatex: "(x-1)(x-2)(x-3)",
  },
  {
    title: "Use a known factor",
    questionLatex: "P(x)=x^3+x^2-4x-4",
    steps: [
      { explanation: "Group terms.", latex: "x^2(x+1)-4(x+1)" },
      { explanation: "Factor the common bracket.", latex: "(x+1)(x^2-4)" },
      { explanation: "Use difference of squares.", latex: "(x+1)(x-2)(x+2)" },
    ],
    finalAnswerLatex: "(x+1)(x-2)(x+2)",
  },
];

const rootsExamples: WorkedExample[] = [
  {
    title: "Quadratic roots and coefficients",
    questionLatex: "2x^2-5x+3=0",
    steps: [
      { explanation: "For ax squared plus bx plus c, the sum of roots is negative b over a.", latex: "\\alpha+\\beta=-\\frac{b}{a}=\\frac{5}{2}" },
      { explanation: "The product of roots is c over a.", latex: "\\alpha\\beta=\\frac{3}{2}" },
    ],
    finalAnswerLatex: "\\alpha+\\beta=\\frac52,\\quad \\alpha\\beta=\\frac32",
  },
  {
    title: "Cubic Vieta relationships",
    questionLatex: "x^3-6x^2+11x-6=0",
    steps: [
      { explanation: "For monic cubics, the sum of roots is the negative coefficient of x squared.", latex: "\\alpha+\\beta+\\gamma=6" },
      { explanation: "The sum of pairwise products is the coefficient of x.", latex: "\\alpha\\beta+\\alpha\\gamma+\\beta\\gamma=11" },
      { explanation: "The product is the negative constant term.", latex: "\\alpha\\beta\\gamma=6" },
    ],
    finalAnswerLatex: "6,\\ 11,\\ 6",
  },
  {
    title: "Build a quadratic from roots",
    questionLatex: "\\text{roots }2\\text{ and }5",
    steps: [
      { explanation: "Use factors x minus each root.", latex: "(x-2)(x-5)" },
      { explanation: "Expand.", latex: "x^2-7x+10" },
    ],
    finalAnswerLatex: "x^2-7x+10=0",
  },
];

const graphExamples: WorkedExample[] = [
  {
    title: "End behaviour",
    questionLatex: "P(x)=-2x^3+5x-1",
    steps: [
      { explanation: "The degree is odd and the leading coefficient is negative.", latex: "-2x^3" },
      { explanation: "So the graph rises left and falls right.", latex: "x\\to -\\infty,\\ P(x)\\to\\infty;\\quad x\\to\\infty,\\ P(x)\\to-\\infty" },
    ],
    finalAnswerLatex: "\\text{left up, right down}",
  },
  {
    title: "Multiplicity at roots",
    questionLatex: "P(x)=(x-1)^2(x+3)",
    steps: [
      { explanation: "x equals 1 is a repeated root of even multiplicity.", latex: "(x-1)^2" },
      { explanation: "The graph touches at x equals 1 and crosses at x equals negative 3.", latex: "x=1\\text{ touch},\\ x=-3\\text{ cross}" },
    ],
    finalAnswerLatex: "\\text{touch at }1,\\quad \\text{cross at }-3",
  },
  {
    title: "Sketch from factored form",
    questionLatex: "P(x)=(x+2)(x-1)(x-4)",
    steps: [
      { explanation: "Read the x-intercepts from each factor.", latex: "x=-2,\\ 1,\\ 4" },
      { explanation: "The leading term is positive x cubed, so the graph falls left and rises right.", latex: "x^3" },
    ],
    finalAnswerLatex: "\\text{roots }-2,1,4\\text{ with positive cubic end behaviour}",
  },
];

function terminologyLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use polynomial vocabulary including degree, coefficients, leading term, and constant term.", "Polynomial terminology"),
    learningIntention: "Identify key features of polynomial expressions and write them in standard form.",
    successCriteria: [
      "Identify the degree of a polynomial.",
      "Identify leading coefficient and leading term.",
      "Identify the constant term.",
      "Write a polynomial in descending powers of x.",
    ],
    teaching: {
      paragraphs: [
        "A polynomial is a sum of terms with non-negative integer powers of the variable.",
        "The degree is the highest power with a non-zero coefficient.",
        "The leading term is the highest-degree term after the polynomial is written in descending powers.",
        "The constant term is the term independent of x, and it equals the value of the polynomial at x equals zero.",
      ],
      latexBlocks: [
        "a_nx^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0",
        "\\deg P=n\\quad\\text{if }a_n\\ne0",
        "\\text{constant term}=P(0)",
      ],
    },
    workedExamples: terminologyExamples,
    guidedPractice: [
      countAnswer("poly-term-g1", "Find the degree of P(x)=3x^4-2x+1.", "P(x)=3x^4-2x+1", "4", "The highest power is 4."),
      countAnswer("poly-term-g2", "Find the leading coefficient of P(x)=-5x^3+x^2+9.", "P(x)=-5x^3+x^2+9", "-5", "The leading term is -5x^3."),
      choice("poly-term-g3", "Which expression is not a polynomial?", "B", ["$x^2+1$", "$x^{-1}+2$", "$4x^3-x$", "$7$"], "Negative powers are not allowed in a polynomial."),
      choice("poly-term-g4", "What is the constant term of 2x^3-6x+8?", "D", ["2", "-6", "3", "8"], "The constant term has no x."),
    ],
    independentPractice: [
      countAnswer("poly-term-i1", "Find the degree of P(x)=7x^6-x^2+4.", "P(x)=7x^6-x^2+4", "6", "The highest power is 6."),
      countAnswer("poly-term-i2", "Find the leading coefficient of P(x)=1-4x^5+2x.", "P(x)=1-4x^5+2x", "-4", "In standard form, the leading term is -4x^5."),
      countAnswer("poly-term-i3", "Find P(0) for P(x)=9x^3-2x+11.", "P(0)", "11", "All terms with x become zero, leaving the constant term."),
      countAnswer("poly-term-i4", "How many terms are in 3x^4-2x^2+x-8?", "3x^4-2x^2+x-8", "4", "The terms are 3x^4, -2x^2, x, and -8."),
      choice("poly-term-i5", "Which is the leading term of 5-2x^2+9x^4?", "C", ["$5$", "$-2x^2$", "$9x^4$", "$x^4$"], "The highest-power term is 9x^4."),
    ],
    commonMistakes: [
      { mistake: "Reading the first written term as the leading term.", fix: "Rewrite in descending powers before identifying the leading term." },
      { mistake: "Counting missing powers as terms.", fix: "Only non-zero terms that appear count as terms." },
      { mistake: "Calling a negative power polynomial.", fix: "Polynomial powers must be non-negative integers." },
      { mistake: "Confusing degree with number of terms.", fix: "Degree is the highest exponent." },
    ],
    masteryQuiz: [
      countAnswer("poly-term-m1", "Find the degree of 2x^7-x+3.", "2x^7-x+3", "7", "The highest exponent is 7."),
      countAnswer("poly-term-m2", "Find the leading coefficient of -x^4+6x^2-1.", "-x^4+6x^2-1", "-1", "The leading term is -x^4, whose coefficient is -1."),
      countAnswer("poly-term-m3", "Find the constant term of 8x^5-4x^2+12.", "8x^5-4x^2+12", "12", "The constant term is 12."),
      countAnswer("poly-term-m4", "Find P(0) for P(x)=-3x^4+x-6.", "P(0)", "-6", "P(0) equals the constant term."),
      countAnswer("poly-term-m5", "Find the coefficient of x^2 in 5x^3-7x^2+x+1.", "5x^3-7x^2+x+1", "-7", "The x^2 term is -7x^2."),
      choice("poly-term-m6", "Which polynomial is written in descending powers?", "A", ["$4x^3+x^2-1$", "$1+x+x^2$", "$x-3x^4$", "$2+x^5$"], "Descending powers move from highest to lowest exponent."),
      choice("poly-term-m7", "Which expression has degree zero?", "D", ["$x$", "$x^2+1$", "$0x^4+x$", "$9$"], "A non-zero constant has degree zero."),
      choice("poly-term-m8", "Which term controls end behaviour?", "B", ["Constant term", "Leading term", "Middle term", "Coefficient of x only"], "For large x, the leading term dominates."),
      countAnswer("poly-term-m9", "How many non-zero terms are in x^5+0x^4-3?", "x^5+0x^4-3", "2", "The zero coefficient term is not counted."),
      countAnswer("poly-term-m10", "Find the degree of 6.", "6", "0", "A non-zero constant polynomial has degree 0."),
    ],
  };
}

function divisionLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Divide polynomials and use P(a) to find remainders efficiently.", "Polynomial division and the remainder theorem"),
    learningIntention: "Use polynomial division and the remainder theorem to calculate quotients, remainders, and unknown coefficients.",
    successCriteria: [
      "Use the remainder theorem for divisors of the form x-a.",
      "Divide simple polynomials by linear factors.",
      "Interpret zero remainders as exact division.",
      "Set up equations for unknown coefficients using P(a).",
    ],
    teaching: {
      paragraphs: [
        "Polynomial division rewrites a polynomial as divisor times quotient plus remainder.",
        "For division by x minus a, the remainder is P(a).",
        "Substitution is usually faster than division if only the remainder is needed.",
        "Unknown coefficients can be found by setting P(a) equal to a known remainder.",
      ],
      latexBlocks: [
        "P(x)=(x-a)Q(x)+R",
        "R=P(a)",
        "P(a)=0\\Rightarrow \\text{exact division by }x-a",
      ],
    },
    workedExamples: divisionExamples,
    guidedPractice: [
      countAnswer("poly-div-g1", "Find the remainder when P(x)=x^2+2x+5 is divided by x-1.", "P(1)", "8", "P(1)=1+2+5=8."),
      countAnswer("poly-div-g2", "Find the remainder when P(x)=x^2-4 is divided by x+2.", "P(-2)", "0", "P(-2)=4-4=0."),
      choice("poly-div-g3", "Which theorem gives the remainder as P(a)?", "A", ["Remainder theorem", "Cosine rule", "Binomial theorem", "Pythagoras theorem"], "The remainder theorem applies to division by x-a."),
      choice("poly-div-g4", "If division by x-3 has remainder 0, what is true?", "C", ["x+3 is a factor", "P(3)=1", "x-3 is a factor", "P(x) is linear"], "A zero remainder means exact division by x-3."),
    ],
    independentPractice: [
      countAnswer("poly-div-i1", "Find the remainder when P(x)=x^3-3x+1 is divided by x-2.", "P(2)", "3", "P(2)=8-6+1=3."),
      countAnswer("poly-div-i2", "Find the remainder when P(x)=2x^3+x-5 is divided by x+1.", "P(-1)", "-8", "P(-1)=-2-1-5=-8."),
      countAnswer("poly-div-i3", "Divide x^2+7x+12 by x+3 and give the quotient.", "\\frac{x^2+7x+12}{x+3}", "x+4", "x^2+7x+12=(x+3)(x+4)."),
      countAnswer("poly-div-i4", "Find k if P(x)=x^2+kx+2 has remainder 8 when divided by x-2.", "P(2)=8", "1", "4+2k+2=8, so 2k=2 and k=1."),
      choice("poly-div-i5", "For division by x+4, which value is substituted?", "B", ["4", "-4", "0", "1/4"], "x+4 is x-(-4)."),
    ],
    commonMistakes: [
      { mistake: "Substituting the wrong sign for x+a.", fix: "Use a=-a_value because x+a=x-(-a)." },
      { mistake: "Doing full division when only the remainder is asked.", fix: "Use P(a) for a divisor x-a." },
      { mistake: "Forgetting to include zero coefficients during division.", fix: "Insert missing powers with coefficient zero." },
      { mistake: "Confusing quotient and remainder.", fix: "The quotient is a polynomial; the remainder is lower degree than the divisor." },
    ],
    masteryQuiz: [
      countAnswer("poly-div-m1", "Find the remainder when P(x)=x^2+x+1 is divided by x-2.", "P(2)", "7", "P(2)=4+2+1=7."),
      countAnswer("poly-div-m2", "Find the remainder when P(x)=x^3+2x^2-x-2 is divided by x+1.", "P(-1)", "0", "P(-1)=-1+2+1-2=0."),
      countAnswer("poly-div-m3", "Find the quotient of x^2-5x+6 divided by x-2.", "\\frac{x^2-5x+6}{x-2}", "x-3", "x^2-5x+6=(x-2)(x-3)."),
      countAnswer("poly-div-m4", "Find k if x+2 is a factor of P(x)=x^2+kx-8.", "P(-2)=0", "-2", "P(-2)=4-2k-8=0, so -2k=4 and k=-2."),
      countAnswer("poly-div-m5", "Find the remainder when P(x)=3x^3-x+4 is divided by x-1.", "P(1)", "6", "P(1)=3-1+4=6."),
      choice("poly-div-m6", "Which statement is true when P(5)=9?", "A", ["Remainder on division by x-5 is 9", "x-5 is a factor", "P has degree 5", "Remainder on division by x+5 is 9"], "For divisor x-5, substitute 5."),
      choice("poly-div-m7", "If x+2 is a factor, which value of P is zero?", "D", ["P(2)", "P(0)", "P(1/2)", "P(-2)"], "x+2=x-(-2)."),
      choice("poly-div-m8", "What does exact division mean?", "C", ["The quotient is zero", "The divisor is constant", "The remainder is zero", "The polynomial has no roots"], "Exact division leaves no remainder."),
      countAnswer("poly-div-m9", "Find k if P(x)=x^3+kx+1 has remainder 3 on division by x-1.", "P(1)=3", "1", "1+k+1=3, so k=1."),
      countAnswer("poly-div-m10", "Find the quotient of x^3-1 divided by x-1.", "\\frac{x^3-1}{x-1}", "x^2+x+1", "x^3-1=(x-1)(x^2+x+1).", ["x^2 + x + 1"]),
    ],
    masteryQuizPool: [
      {
        ...countAnswer("poly-div-d5-1", "When $P(x)=x^3+2x^2-5x+k$ is divided by $x-2$ the remainder is $4$. Find $k$.", "P(2)=4", "-2", "By the remainder theorem $P(2)=8+8-10+k=6+k$. Setting $6+k=4$ gives $k=-2$.", ["k=-2"]),
        difficulty: 5,
      },
    ],
  };
}

function factorLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use the factor theorem to identify linear factors and fully factorise simple cubics.", "Factor theorem and factorisation"),
    learningIntention: "Use P(a)=0 to identify factors and factorise polynomial expressions.",
    successCriteria: [
      "State and apply the factor theorem.",
      "Test possible integer roots by substitution.",
      "Use a known linear factor to reduce a cubic to a quadratic.",
      "Fully factorise cubics that have simple integer roots.",
    ],
    teaching: {
      paragraphs: [
        "The factor theorem is the zero-remainder case of the remainder theorem.",
        "If P(a)=0, then x-a is a factor of P(x).",
        "For cubics, finding one root lets you divide by the matching linear factor and then factorise the quadratic quotient.",
        "Possible integer roots often come from factors of the constant term.",
      ],
      latexBlocks: [
        "P(a)=0\\iff (x-a)\\text{ is a factor}",
        "P(x)=(x-a)Q(x)",
        "\\text{integer roots often divide the constant term}",
      ],
    },
    workedExamples: factorExamples,
    guidedPractice: [
      countAnswer("poly-fac-g1", "Show the value P(1) for P(x)=x^2-1.", "P(1)", "0", "P(1)=1-1=0, so x-1 is a factor."),
      countAnswer("poly-fac-g2", "Fully factorise x^2-9.", "x^2-9", "(x-3)(x+3)", "This is a difference of squares."),
      choice("poly-fac-g3", "If P(-2)=0, which factor is guaranteed?", "B", ["$x-2$", "$x+2$", "$2x-1$", "$x^2+2$"], "P(-2)=0 gives factor x+2."),
      choice("poly-fac-g4", "What does P(a)=0 mean graphically?", "C", ["a is the y-intercept", "The graph is constant", "x=a is an x-intercept", "The degree is a"], "The graph has y-value zero at x=a."),
    ],
    independentPractice: [
      countAnswer("poly-fac-i1", "Fully factorise x^3-6x^2+11x-6.", "x^3-6x^2+11x-6", "(x-1)(x-2)(x-3)", "The roots are 1, 2 and 3.", ["(x-1)(x-3)(x-2)", "(x-2)(x-1)(x-3)", "(x-2)(x-3)(x-1)", "(x-3)(x-1)(x-2)", "(x-3)(x-2)(x-1)"]),
      countAnswer("poly-fac-i2", "Fully factorise x^3+x^2-4x-4.", "x^3+x^2-4x-4", "(x+1)(x-2)(x+2)", "Group terms: x^2(x+1)-4(x+1).", ["(x+1)(x+2)(x-2)", "(x-2)(x+1)(x+2)", "(x-2)(x+2)(x+1)", "(x+2)(x+1)(x-2)", "(x+2)(x-2)(x+1)"]),
      countAnswer("poly-fac-i3", "Find a factor of P(x)=x^3-4x if P(0)=0.", "P(x)=x^3-4x", "x", "P(x)=x(x^2-4), so x is a factor."),
      countAnswer("poly-fac-i4", "Find k if x-3 is a factor of P(x)=x^2+kx-6.", "P(3)=0", "-1", "9+3k-6=0, so 3k=-3 and k=-1."),
      choice("poly-fac-i5", "Which possible integer roots should be tested first for x^3-7x+6?", "A", ["Factors of 6", "Factors of 7 only", "All fractions", "No roots possible"], "Integer roots divide the constant term for a monic polynomial."),
    ],
    commonMistakes: [
      { mistake: "Using P(a)=0 but writing x+a as the factor.", fix: "If the root is a, the factor is x-a." },
      { mistake: "Stopping after finding one factor of a cubic.", fix: "Divide by the factor and factorise the remaining quadratic." },
      { mistake: "Assuming every divisor of the constant is a root.", fix: "Substitute to test each candidate." },
      { mistake: "Losing a negative sign during grouping.", fix: "Check by expanding the final factorisation." },
    ],
    masteryQuiz: [
      countAnswer("poly-fac-m1", "Evaluate P(-1) for P(x)=x^3+2x^2-x-2.", "P(-1)", "0", "P(-1)=-1+2+1-2=0."),
      countAnswer("poly-fac-m2", "Which linear factor follows from P(4)=0?", "P(4)=0", "x-4", "A root at x=4 gives factor x-4."),
      countAnswer("poly-fac-m3", "Fully factorise x^3-4x.", "x^3-4x", "x(x-2)(x+2)", "Factor out x, then use difference of squares.", ["x(x+2)(x-2)", "(x-2)x(x+2)", "(x-2)(x+2)x", "(x+2)x(x-2)", "(x+2)(x-2)x"]),
      countAnswer("poly-fac-m4", "Fully factorise x^3-3x^2-4x+12.", "x^3-3x^2-4x+12", "(x-3)(x-2)(x+2)", "Group: x^2(x-3)-4(x-3)=(x-3)(x^2-4).", ["(x-3)(x+2)(x-2)", "(x-2)(x-3)(x+2)", "(x-2)(x+2)(x-3)", "(x+2)(x-3)(x-2)", "(x+2)(x-2)(x-3)"]),
      countAnswer("poly-fac-m5", "Find k if x+1 is a factor of x^2+kx+5.", "P(-1)=0", "6", "1-k+5=0, so k=6."),
      choice("poly-fac-m6", "If x-2 is a factor, which root is present?", "A", ["2", "-2", "0", "1/2"], "x-2=0 gives x=2."),
      choice("poly-fac-m7", "Which theorem connects P(a)=0 with x-a being a factor?", "D", ["Sine rule", "Remainder estimate", "Index law", "Factor theorem"], "That equivalence is the factor theorem."),
      choice("poly-fac-m8", "After finding a factor of a cubic, what is the usual next step?", "B", ["Differentiate", "Divide to get a quadratic quotient", "Ignore it", "Square the factor"], "Division lowers the degree so the rest can be factorised."),
      countAnswer("poly-fac-m9", "Fully factorise x^3-2x^2-x+2.", "x^3-2x^2-x+2", "(x-2)(x-1)(x+1)", "Group: x^2(x-2)-1(x-2)=(x-2)(x^2-1).", ["(x-2)(x+1)(x-1)", "(x-1)(x-2)(x+1)", "(x-1)(x+1)(x-2)", "(x+1)(x-2)(x-1)", "(x+1)(x-1)(x-2)"]),
      countAnswer("poly-fac-m10", "Find P(2) for P(x)=x^3-6x^2+11x-6.", "P(2)", "0", "P(2)=8-24+22-6=0."),
    ],
    masteryQuizPool: [
      {
        ...countAnswer("poly-fac-d5-1", "Given that $x+1$ is a factor of $x^3+ax^2-x-2$, find $a$.", "P(-1)=0", "2", "By the factor theorem $P(-1)=-1+a+1-2=a-2=0$, so $a=2$.", ["a=2"]),
        difficulty: 5,
      },
    ],
  };
}

function rootsLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use relationships between roots and coefficients for quadratics and cubics.", "Roots and coefficients"),
    learningIntention: "Apply Vieta's relationships to connect polynomial coefficients with sums and products of roots.",
    successCriteria: [
      "Use sum and product of roots for quadratics.",
      "Use Vieta's relationships for monic cubics.",
      "Build simple polynomials from known roots.",
      "Check roots by substitution or factorisation.",
    ],
    teaching: {
      paragraphs: [
        "The coefficients of a polynomial encode information about its roots.",
        "For a quadratic ax squared plus bx plus c, the root sum is negative b over a and the product is c over a.",
        "For a monic cubic, the coefficient of x squared controls the sum of roots, the coefficient of x controls pairwise products, and the constant controls the product.",
        "Known roots can be turned into factors and multiplied to build a polynomial.",
      ],
      latexBlocks: [
        "ax^2+bx+c=0:\\quad \\alpha+\\beta=-\\frac ba,\\quad \\alpha\\beta=\\frac ca",
        "x^3+ax^2+bx+c=0:\\quad \\alpha+\\beta+\\gamma=-a",
        "\\alpha\\beta+\\alpha\\gamma+\\beta\\gamma=b,\\quad \\alpha\\beta\\gamma=-c",
      ],
    },
    workedExamples: rootsExamples,
    guidedPractice: [
      countAnswer("poly-root-g1", "For x^2-5x+6=0, find the sum of roots.", "x^2-5x+6=0", "5", "The sum is -b/a=5."),
      countAnswer("poly-root-g2", "For x^2-5x+6=0, find the product of roots.", "x^2-5x+6=0", "6", "The product is c/a=6."),
      choice("poly-root-g3", "For ax^2+bx+c=0, which expression gives the sum of roots?", "A", ["$-b/a$", "$c/a$", "$b/c$", "$a/c$"], "The sum of quadratic roots is -b/a."),
      choice("poly-root-g4", "Which polynomial has roots 2 and 3?", "C", ["$x^2+5x+6$", "$x^2-x+6$", "$x^2-5x+6$", "$x^2+6x-5$"], "Use (x-2)(x-3)=x^2-5x+6."),
    ],
    independentPractice: [
      countAnswer("poly-root-i1", "For 2x^2-7x+3=0, find the sum of roots.", "2x^2-7x+3=0", "7/2", "The sum is -b/a=7/2.", ["3.5"]),
      countAnswer("poly-root-i2", "For 2x^2-7x+3=0, find the product of roots.", "2x^2-7x+3=0", "3/2", "The product is c/a=3/2.", ["1.5"]),
      countAnswer("poly-root-i3", "For x^3-6x^2+11x-6=0, find the sum of roots.", "x^3-6x^2+11x-6=0", "6", "For a monic cubic, the root sum is the negative x^2 coefficient."),
      countAnswer("poly-root-i4", "For x^3-6x^2+11x-6=0, find the product of roots.", "x^3-6x^2+11x-6=0", "6", "For a monic cubic, the product is the negative constant term."),
      choice("poly-root-i5", "Roots 1, 2 and 3 have which sum?", "B", ["5", "6", "11", "12"], "1+2+3=6."),
    ],
    commonMistakes: [
      { mistake: "Forgetting the negative sign in the sum of roots.", fix: "For quadratics, use -b/a." },
      { mistake: "Using c instead of c/a for a non-monic quadratic.", fix: "Divide by the leading coefficient." },
      { mistake: "Using the wrong sign for the cubic product.", fix: "For x^3+ax^2+bx+c, the product is -c." },
      { mistake: "Expanding factors with sign errors.", fix: "Check that each factor x-r gives root r." },
    ],
    masteryQuiz: [
      countAnswer("poly-root-m1", "For x^2+4x-12=0, find the sum of roots.", "x^2+4x-12=0", "-4", "The sum is -b/a=-4."),
      countAnswer("poly-root-m2", "For x^2+4x-12=0, find the product of roots.", "x^2+4x-12=0", "-12", "The product is c/a=-12."),
      countAnswer("poly-root-m3", "For 3x^2-9x+6=0, find the sum of roots.", "3x^2-9x+6=0", "3", "The sum is 9/3=3."),
      countAnswer("poly-root-m4", "For 3x^2-9x+6=0, find the product of roots.", "3x^2-9x+6=0", "2", "The product is 6/3=2."),
      countAnswer("poly-root-m5", "For x^3-6x^2+11x-6=0, find the sum of pairwise products.", "x^3-6x^2+11x-6=0", "11", "Vieta gives pairwise sum equal to the coefficient of x."),
      choice("poly-root-m6", "For x^3+ax^2+bx+c=0, what is the product of roots?", "D", ["$a$", "$b$", "$c$", "$-c$"], "For a monic cubic, the product is -c."),
      choice("poly-root-m7", "Which factor corresponds to root -4?", "B", ["$x-4$", "$x+4$", "$4x-1$", "$x^2-4$"], "A root of -4 gives x+4."),
      choice("poly-root-m8", "A student says roots 1,2,3 have pairwise sum 6. What was calculated?", "A", ["The simple sum of roots", "The product", "The pairwise product sum", "The leading coefficient"], "1+2+3=6; the pairwise sum is 1*2+1*3+2*3=11."),
      countAnswer("poly-root-m9", "Build the monic quadratic with roots -1 and 5.", "\\text{roots }-1,5", "x^2-4x-5", "(x+1)(x-5)=x^2-4x-5.", ["x^2 - 4x - 5"]),
      countAnswer("poly-root-m10", "Build the monic cubic with roots 1, 2 and 3.", "\\text{roots }1,2,3", "x^3-6x^2+11x-6", "Multiply (x-1)(x-2)(x-3).", ["x^3 - 6x^2 + 11x - 6"]),
    ],
    masteryQuizPool: [
      {
        ...countAnswer("poly-root-d5-1", "The roots of $2x^2-8x+6=0$ are $\\alpha$ and $\\beta$. Find $\\alpha\\beta$.", "\\alpha\\beta = \\tfrac{c}{a}", "3", "Product of roots $=\\tfrac{c}{a}=\\tfrac{6}{2}=3$.", ["3"]),
        difficulty: 5,
      },
      {
        ...countAnswer("poly-root-d5-2", "Find the constant term of the monic quadratic with roots $3$ and $-5$.", "\\text{roots }3,-5", "-15", "$(x-3)(x+5)=x^2+2x-15$, so the constant term is $-15$.", ["-15"]),
        difficulty: 5,
      },
    ],
  };
}

function graphLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Sketch polynomial graphs from degree, leading coefficient, roots, and multiplicities.", "Polynomial graphs"),
    learningIntention: "Use factored form and leading terms to sketch key features of polynomial graphs.",
    successCriteria: [
      "Determine end behaviour from degree and leading coefficient.",
      "Find x-intercepts from factors.",
      "Use multiplicity to decide whether a graph crosses or touches at a root.",
      "Combine intercepts and end behaviour to make a coherent sketch.",
    ],
    teaching: {
      paragraphs: [
        "A polynomial graph's far-left and far-right behaviour is controlled by its leading term.",
        "Odd degree graphs have opposite end behaviour, while even degree graphs have matching end behaviour.",
        "A root with odd multiplicity is crossed by the graph; a root with even multiplicity is touched and turned around.",
        "Factored form is the most efficient form for reading x-intercepts and multiplicities.",
      ],
      latexBlocks: [
        "\\text{positive even degree: up on both ends}",
        "\\text{negative even degree: down on both ends}",
        "\\text{positive odd degree: left down, right up}",
        "\\text{even multiplicity: touch},\\quad \\text{odd multiplicity: cross}",
      ],
    },
    workedExamples: graphExamples,
    guidedPractice: [
      countAnswer("poly-graph-g1", "Find the x-intercepts of P(x)=(x-2)(x+1). Give them in increasing order.", "P(x)=(x-2)(x+1)", "-1,2", "Set each factor to zero: x=-1 and x=2.", ["-1, 2"]),
      countAnswer("poly-graph-g2", "For $P(x)=(x-3)^2$, does the graph touch or cross at $x=3$?", "(x-3)^2", "touch", "Even multiplicity roots touch the x-axis."),
      choice("poly-graph-g3", "A positive cubic has which end behaviour?", "C", ["left up, right up", "left up, right down", "left down, right up", "left down, right down"], "Positive odd degree graphs fall left and rise right."),
      choice("poly-graph-g4", "A negative quartic has which end behaviour?", "D", ["left down, right up", "left up, right down", "left up, right up", "left down, right down"], "Negative even degree graphs fall on both ends."),
    ],
    independentPractice: [
      countAnswer("poly-graph-i1", "Find the roots of P(x)=(x+4)(x-1)(x-5).", "P(x)=(x+4)(x-1)(x-5)", "-4,1,5", "Set each factor to zero.", ["-4, 1, 5"]),
      countAnswer("poly-graph-i2", "For $P(x)=(x+2)^2(x-3)$, at which root does the graph touch?", "P(x)=(x+2)^2(x-3)", "-2", "The repeated factor has even multiplicity at x=-2."),
      countAnswer("poly-graph-i3", "For P(x)=x^3-6x^2+11x-6, how many x-intercepts are suggested by roots 1,2,3?", "\\text{roots }1,2,3", "3", "There are three distinct roots, so three x-intercepts."),
      countAnswer("poly-graph-i4", "Find the y-intercept of P(x)=(x-1)(x-2)(x-3).", "P(0)", "-6", "P(0)=(-1)(-2)(-3)=-6."),
      choice("poly-graph-i5", "Which root is crossed for $P(x)=(x-1)^2(x+2)^3$?", "B", ["1", "-2", "both roots", "neither root"], "Odd multiplicity 3 at x=-2 means crossing."),
    ],
    commonMistakes: [
      { mistake: "Assuming every root is crossed.", fix: "Even multiplicity roots touch; odd multiplicity roots cross." },
      { mistake: "Using the constant term for end behaviour.", fix: "Use the leading term for far-left and far-right behaviour." },
      { mistake: "Forgetting roots from repeated factors.", fix: "Repeated factors still give x-intercepts." },
      { mistake: "Sketching without checking the y-intercept.", fix: "Use P(0) to anchor the graph near the y-axis." },
    ],
    masteryQuiz: [
      countAnswer("poly-graph-m1", "Find the roots of P(x)=(x-2)(x+3)(x-4).", "P(x)=(x-2)(x+3)(x-4)", "-3,2,4", "Set each factor to zero.", ["-3, 2, 4"]),
      countAnswer("poly-graph-m2", "For $P(x)=(x+1)^2(x-5)$, which root is touched?", "P(x)=(x+1)^2(x-5)", "-1", "The even multiplicity root is x=-1."),
      countAnswer("poly-graph-m3", "Find the y-intercept of P(x)=(x+1)(x-2).", "P(0)", "-2", "P(0)=1*(-2)=-2."),
      countAnswer("poly-graph-m4", "How many distinct x-intercepts does $(x-1)^2(x+2)^2$ have?", "(x-1)^2(x+2)^2", "2", "The distinct roots are 1 and -2."),
      countAnswer("poly-graph-m5", "For P(x)=-x^4+3x^2, does the graph go up or down on the right?", "P(x)=-x^4+3x^2", "down", "The leading term is negative even degree, so the right end goes down."),
      choice("poly-graph-m6", "Which factor gives a touch at x=4?", "A", ["$(x-4)^2$", "$(x+4)$", "$(x-4)^3$", "$(x+4)^3$"], "Even multiplicity at x=4 gives a touch."),
      choice("poly-graph-m7", "Which graph behaviour belongs to a positive quartic?", "C", ["left up, right down", "left down, right up", "left up, right up", "left down, right down"], "Positive even degree rises on both ends."),
      choice("poly-graph-m8", "What does multiplicity 3 usually mean at a root?", "D", ["No intercept", "Touch only", "A y-intercept", "Cross the x-axis"], "Odd multiplicity roots cross."),
      countAnswer("poly-graph-m9", "Find the y-intercept of P(x)=2(x-1)(x+3).", "P(0)", "-6", "P(0)=2*(-1)*3=-6."),
      countAnswer("poly-graph-m10", "For $P(x)=(x-1)^4$, does the graph touch or cross at $x=1$?", "(x-1)^4", "touch", "Multiplicity 4 is even, so the graph touches."),
    ],
    masteryQuizPool: [
      {
        ...countAnswer("poly-graph-d5-1", "The graph of $y=(x-2)^2(x+1)$ touches the $x$-axis. Find the $x$-coordinate of the touch point.", "y=(x-2)^2(x+1)", "2", "An even multiplicity gives a touch; the squared factor $(x-2)^2$ makes the curve touch at $x=2$.", ["x=2"]),
        difficulty: 5,
      },
      {
        ...countAnswer("poly-graph-d5-2", "A polynomial has degree $5$. At most how many turning points can its graph have?", "\\deg P = 5", "4", "A degree-$n$ polynomial has at most $n-1$ turning points, so at most $4$.", ["four"]),
        difficulty: 5,
      },
    ],
  };
}

export function year11ExtensionPolynomialsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-extension" || unit.slug !== "polynomials") {
    return null;
  }

  if (lesson.slug === "polynomial-terminology") {
    return terminologyLesson(lesson);
  }

  if (lesson.slug === "polynomial-division-remainder-theorem") {
    return divisionLesson(lesson);
  }

  if (lesson.slug === "factor-theorem-factorisation") {
    return factorLesson(lesson);
  }

  if (lesson.slug === "roots-and-coefficients") {
    return rootsLesson(lesson);
  }

  if (lesson.slug === "polynomial-graphs") {
    return graphLesson(lesson);
  }

  return null;
}
