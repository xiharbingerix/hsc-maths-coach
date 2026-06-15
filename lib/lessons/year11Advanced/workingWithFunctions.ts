import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { CartesianGraph } from "../types";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

function workingFunctionsFeedback(prompt: string, answer: string) {
  if (prompt.includes("Evaluate the displayed function")) {
    return `Function notation is an instruction to substitute the given input everywhere x appears. Use brackets around negative inputs before evaluating powers; this gives ${answer}.`;
  }
  if (
    prompt.includes("excluded from the domain") ||
    prompt.includes("excluded x-value")
  ) {
    return `A reciprocal function cannot use an input that makes its denominator zero. Set the denominator equal to zero and exclude that x-value, which gives ${answer}.`;
  }
  if (prompt.includes("vertical asymptote")) {
    return `A vertical asymptote occurs where the reciprocal denominator would be zero. Solve that denominator equation to find the vertical line ${answer}.`;
  }
  if (prompt.includes("horizontal asymptote")) {
    return `For a simple reciprocal function, the fraction shrinks towards zero as x moves far from the centre. The remaining vertical shift is the horizontal asymptote, so the answer is ${answer}.`;
  }
  if (prompt.includes("y-intercept")) {
    return `The y-intercept is where the graph crosses the y-axis, so use x = 0. Evaluating the function at zero gives ${answer}.`;
  }
  if (
    prompt.includes("zero") ||
    prompt.includes("x-intercept")
  ) {
    return `Zeros and x-intercepts occur where the output is zero. Set each factor or the full function equal to zero, then choose the requested solution; this gives ${answer}.`;
  }
  if (prompt.includes("absolute value") || prompt.includes("|")) {
    return `Absolute value measures distance from zero, so it is never negative. Work inside the absolute value first, then make the result positive if needed; this gives ${answer}.`;
  }
  if (prompt.includes("even") || prompt.includes("odd") || prompt.includes("symmetry")) {
    return `Even functions satisfy f(-x) = f(x) and have y-axis symmetry. Odd functions satisfy f(-x) = -f(x) and have origin symmetry. Applying the matching test gives ${answer}.`;
  }
  return `Identify whether the question asks for an output, a restriction, an intercept or an asymptote before calculating. Following that feature gives ${answer}.`;
}

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseFormulaAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: workingFunctionsFeedback(prompt, answer),
  };
}

function absoluteValueGraph(
  description: string,
  h: number,
  k: number,
  label: string
): CartesianGraph {
  return {
    description,
    xMin: -5,
    xMax: 5,
    yMin: -1,
    yMax: 7,
    xStep: 1,
    yStep: 1,
    lineSegments: [
      { from: { x: -5, y: Math.abs(-5 - h) + k }, to: { x: h, y: k } },
      { from: { x: h, y: k }, to: { x: 5, y: Math.abs(5 - h) + k } },
    ],
    points: [{ x: h, y: k, label }],
  };
}

function sampledCurveGraph(
  description: string,
  fn: (x: number) => number,
  points: CartesianGraph["points"]
): CartesianGraph {
  const curvePoints = Array.from({ length: 81 }, (_, index) => {
    const x = -3 + (6 * index) / 80;
    return { x, y: fn(x) };
  });

  return {
    description,
    xMin: -3,
    xMax: 3,
    yMin: -5,
    yMax: 5,
    xStep: 1,
    yStep: 1,
    lineSegments: curvePoints.slice(1).map((point, index) => ({
      from: curvePoints[index],
      to: point,
    })),
    points,
  };
}

function qa(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

export function year11AdvancedWorkingFunctionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "working-with-functions"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "function-notation-domain-range") {
    return {
      ...base,
      description:
        "Evaluate functions, handle negative inputs carefully, and identify domain and range restrictions from algebraic and table descriptions.",
      learningIntention:
        "Use function notation accurately and determine domain and range restrictions from algebraic rules, denominators, square roots, tables, and graph descriptions.",
      successCriteria: [
        "Evaluate function values using correct substitution and brackets.",
        "Identify domain restrictions caused by denominators and square roots.",
        "Read simple domain and range information from a table or graph description.",
        "Recognise common errors involving negative inputs, domain, and range.",
      ],
      teaching: {
        paragraphs: [
          "Function notation such as f(x) means the output produced when the input is x. Evaluating f(-2) means replacing every x with (-2), including brackets around the negative input.",
          "The domain is the set of allowed input values. Denominators cannot be zero, and square roots need the expression inside the root to be non-negative for real-valued functions.",
          "The range is the set of possible output values. In Year 11 Advanced, range can often be read from a table, a graph description, or a simple vertex description.",
          "A strong answer separates input restrictions from output behaviour. Do not list an excluded x-value as a range restriction.",
        ],
        latexBlocks: [
          "f(-2)=2(-2)^2-3(-2)+1",
          "\\text{For } g(x)=\\frac{1}{x-4},\\quad x\\neq 4",
          "\\text{For } h(x)=\\sqrt{x+3},\\quad x\\ge -3",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a function with a negative input",
          questionLatex: "f(x)=2x^2-3x+1,\\quad \\text{find } f(-2)",
          steps: [
            {
              explanation:
                "Replace every x with (-2). Brackets matter because the input is negative.",
              latex: "f(-2)=2(-2)^2-3(-2)+1",
            },
            {
              explanation: "Evaluate powers first, then multiplication and addition.",
              latex: "2(4)+6+1=15",
            },
          ],
          finalAnswerLatex: "f(-2)=15",
        },
        {
          title: "Find a rational function domain restriction",
          questionLatex: "g(x)=\\frac{1}{x-4}",
          steps: [
            {
              explanation:
                "The denominator cannot be zero, so set the denominator equal to zero to find the excluded value.",
              latex: "x-4=0",
            },
            {
              explanation: "Solve for the excluded input.",
              latex: "x=4",
            },
          ],
          finalAnswerLatex: "\\text{Domain: }x\\neq 4",
        },
        {
          title: "Read domain and range from a table",
          questionLatex:
            "\\begin{array}{c|ccccc}x&-2&-1&0&1&2\\\\ f(x)&4&1&0&1&4\\end{array}",
          steps: [
            {
              explanation:
                "The listed x-values are the inputs shown in the table.",
              latex: "\\{-2,-1,0,1,2\\}",
            },
            {
              explanation:
                "The distinct output values are 0, 1, and 4.",
              latex: "\\{0,1,4\\}",
            },
          ],
          finalAnswerLatex:
            "\\text{Domain }\\{-2,-1,0,1,2\\},\\quad \\text{range }\\{0,1,4\\}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-fn-g1", "Evaluate the displayed function at the given input.", "f(x)=2x^2-3x+1,\\quad f(-2)", "15", ["f(-2)=15"]),
        formulaAnswer("y11adv-fn-g2", "Which x-value is excluded from the domain of the displayed function?", "g(x)=\\frac{1}{x-4},\\quad x-4\\ne0", "4", ["x=4"]),
        practicalChoice("y11adv-fn-g3", "For the displayed square-root function, which domain is correct?", "B", ["x > 3", "x >= -3", "x <= -3", "x != -3"], "The expression under the square root must be non-negative.", "h(x)=\\sqrt{x+3}"),
        practicalChoice("y11adv-fn-g4", "A table has x-values -2, -1, 0, 1, 2 and outputs 4, 1, 0, 1, 4. Which range is correct?", "C", ["{-2,-1,0,1,2}", "{4,1,0,1,4}", "{0,1,4}", "All real numbers"], "The range uses distinct output values."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-fn-i1", "Evaluate the displayed function at the given input.", "p(x)=x^2-5x,\\quad p(-3)", "24", ["p(-3)=24"]),
        formulaAnswer("y11adv-fn-i2", "Which x-value is excluded from the domain of the displayed function?", "q(x)=\\frac{3}{x+2},\\quad x+2\\ne0", "-2", ["x=-2"]),
        practicalChoice("y11adv-fn-i3", "For the displayed square-root function, which domain is correct?", "D", ["x >= 5", "x != 5", "x < -5", "x <= 5"], "The expression 5 - x must be at least zero.", "r(x)=\\sqrt{5-x}"),
        practicalChoice("y11adv-fn-i4", "A graph description says the lowest y-value is -4 and the graph continues upward forever. Which range matches?", "A", ["y >= -4", "x >= -4", "y <= -4", "x != -4"], "Range describes output y-values."),
        formulaAnswer("y11adv-fn-i5", "Which x-value is excluded from the domain of the displayed function?", "f(x)=\\frac{x+1}{x-6},\\quad x-6\\ne0", "6", ["x=6"]),
      ],
      commonMistakes: [
        { mistake: "Substituting a negative input without brackets.", fix: "Use brackets, for example (-2)^2, so the sign is handled correctly." },
        { mistake: "Confusing domain and range.", fix: "Domain is input x-values; range is output y-values." },
        { mistake: "Allowing a denominator to equal zero.", fix: "Set the denominator not equal to zero and exclude that x-value." },
        { mistake: "Forgetting square-root restrictions.", fix: "For real-valued functions, the expression under a square root must be at least zero." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-fn-m1", "Evaluate the displayed function at the given input.", "f(x)=2x^2-3x+1,\\quad f(-1)", "6", ["f(-1)=6"]),
        formulaAnswer("y11adv-fn-m2", "Which x-value is excluded from the domain of the displayed function?", "g(x)=\\frac{1}{x-7},\\quad x-7\\ne0", "7", ["x=7"]),
        practicalChoice("y11adv-fn-m3", "For the displayed square-root function, which domain is correct?", "A", ["x >= 2", "x <= 2", "x != 2", "x > -2"], "x - 2 must be at least zero.", "h(x)=\\sqrt{x-2}"),
        practicalChoice("y11adv-fn-m4", "A table gives outputs 9, 4, 1, 0, 1. Which set could be the range?", "B", ["{-2,-1,0,1,2}", "{0,1,4,9}", "{9,4,1,0,1}", "All real numbers"], "Range records distinct output values."),
        formulaAnswer("y11adv-fn-m5", "Evaluate the displayed function at the given input.", "p(x)=x^2+4x,\\quad p(-5)", "5", ["p(-5)=5"]),
        practicalChoice("y11adv-fn-m6", "Which error would most likely give the wrong sign when evaluating the displayed function?", "C", ["Using $x=2$", "Writing the range first", "Not using brackets around -2", "Finding the y-intercept"], "Negative inputs should be substituted with brackets.", "f(-2)=3(-2)^2+(-2)"),
        formulaAnswer("y11adv-fn-m7", "Which x-value is excluded from the domain of the displayed function?", "q(x)=\\frac{x-3}{x+5},\\quad x+5\\ne0", "-5", ["x=-5"]),
        practicalChoice("y11adv-fn-m8", "A graph has outputs from -1 to 6 inclusive. Which range matches?", "D", ["-1 <= x <= 6", "x != 6", "y < -1", "-1 <= y <= 6"], "Range uses y-values."),
        formulaAnswer("y11adv-fn-m9", "Evaluate the displayed function at the given input.", "f(x)=4-x^2,\\quad f(3)", "-5", ["f(3)=-5"]),
        practicalChoice("y11adv-fn-m10", "For the displayed reciprocal function, the domain restriction is:", "A", ["x != -1", "x != 1", "y != -1", "x >= -1"], "The denominator x + 1 cannot be zero.", "y=\\frac{1}{x+1}"),
      ],
    };
  }

  if (lesson.slug === "linear-quadratic-cubic-functions") {
    return {
      ...base,
      description:
        "Compare linear, quadratic, and cubic functions using intercepts, roots, turning points, tables, and graph descriptions.",
      learningIntention:
        "Identify linear, quadratic, and cubic functions and interpret their key features from equations, factors, tables, and graph descriptions.",
      successCriteria: [
        "Recognise linear, quadratic, and cubic function families.",
        "Find roots or zeros from factorised forms.",
        "Interpret intercepts, turning points, and simple end behaviour.",
        "Match a function type to an equation, table, or graph description.",
      ],
      teaching: {
        paragraphs: [
          "Linear functions have a constant first difference and graph as straight lines. Quadratic functions have an x^2 term and graph as parabolas.",
          "Cubic functions have an x^3 term and can have up to three real zeros. Factorised forms make zeros easier to identify.",
          "An x-intercept occurs where y = 0. A y-intercept occurs where x = 0. These are different features and must not be swapped.",
          "Quadratic turning points describe a maximum or minimum. Cubic end behaviour can be described by what happens as x becomes very large positive or negative.",
        ],
        latexBlocks: [
          "\\text{linear: }f(x)=mx+b",
          "\\text{quadratic: }f(x)=a(x-r_1)(x-r_2)",
          "\\text{cubic: }f(x)=a(x-r_1)(x-r_2)(x-r_3)",
        ],
      },
      workedExamples: [
        {
          title: "Identify function type and key features",
          questionLatex: "f(x)=2x^2-8x+6",
          steps: [
            {
              explanation:
                "The highest power is x^2, so this is a quadratic function.",
              latex: "\\deg(f)=2",
            },
            {
              explanation:
                "A quadratic graph is a parabola. Since the coefficient of x^2 is positive, it opens upward.",
            },
          ],
          finalAnswerLatex: "\\text{Quadratic; upward-opening parabola.}",
        },
        {
          title: "Find roots from a factorised function",
          questionLatex: "g(x)=(x+2)(x-1)(x-4)",
          steps: [
            {
              explanation:
                "Zeros occur when any factor equals zero.",
              latex: "x+2=0,\\quad x-1=0,\\quad x-4=0",
            },
            {
              explanation: "Solve each equation.",
              latex: "x=-2,\\ 1,\\ 4",
            },
          ],
          finalAnswerLatex: "\\text{Zeros: }-2,\\ 1,\\ 4",
        },
        {
          title: "Match a table to a function type",
          questionLatex:
            "\\begin{array}{c|ccccc}x&-2&-1&0&1&2\\\\ y&-8&-1&0&1&8\\end{array}",
          steps: [
            {
              explanation:
                "The outputs match the pattern y = x^3.",
            },
            {
              explanation:
                "A cubic has opposite signs for negative and positive inputs when it is like x^3.",
              latex: "(-2)^3=-8,\\quad 2^3=8",
            },
          ],
          finalAnswerLatex: "\\text{Cubic function}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-lqc-g1", "Which function family does the displayed function belong to?", "A", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "The highest power of x is 1.", "f(x)=3x-5"),
        formulaAnswer("y11adv-lqc-g2", "Find the zeros of the displayed function. Enter the smaller zero.", "f(x)=(x-3)(x+2),\\quad (x-3)(x+2)=0", "-2", ["x=-2"]),
        practicalChoice("y11adv-lqc-g3", "A graph is a parabola opening upward with a lowest point. Which function type is most likely?", "B", ["Linear", "Quadratic", "Cubic", "Constant only"], "A parabola is the graph of a quadratic function."),
        formulaAnswer("y11adv-lqc-g4", "For the displayed function, enter the largest zero.", "g(x)=(x+1)(x-4)(x-6),\\quad (x+1)(x-4)(x-6)=0", "6", ["x=6"]),
      ],
      independentPractice: [
        practicalChoice("y11adv-lqc-i1", "A table has constant first differences of 4. Which function type is suggested?", "A", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "Constant first differences suggest a linear relationship."),
        formulaAnswer("y11adv-lqc-i2", "For the displayed function, give the positive x-intercept.", "f(x)=x^2-9,\\quad x^2-9=0", "3", ["x=3", "(3,0)"]),
        practicalChoice("y11adv-lqc-i3", "A cubic function has zeros at -2, 1 and 4. Which expression could represent it?", "C", ["(x-2)(x+1)(x+4)", "(x+2)(x+1)(x-4)", "(x+2)(x-1)(x-4)", "x^2-3x+4"], "A zero at r corresponds to a factor x - r."),
        formulaAnswer("y11adv-lqc-i4", "For the displayed function, find the y-intercept.", "f(x)=2x+7,\\quad f(0)=7", "7", ["(0,7)", "y=7"]),
        practicalChoice("y11adv-lqc-i5", "Which feature is a turning point of a quadratic?", "D", ["The x-value excluded from a denominator", "The slope of a line only", "A repeated table heading", "A maximum or minimum point"], "A quadratic has a vertex that is a maximum or minimum."),
      ],
      commonMistakes: [
        { mistake: "Treating every function as linear.", fix: "Check the highest power and the pattern in the table before choosing a method." },
        { mistake: "Confusing zeros with factors.", fix: "If x = r is a zero, then x - r is a factor." },
        { mistake: "Swapping x-intercepts and y-intercepts.", fix: "x-intercepts happen when y = 0; the y-intercept happens when x = 0." },
        { mistake: "Ignoring the sign of the leading coefficient.", fix: "For quadratics, the sign tells whether the parabola opens up or down." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-lqc-m1", "Which function family does the displayed function belong to?", "B", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "The highest power is x^2.", "f(x)=-2x^2+5"),
        practicalChoice("y11adv-lqc-m2", "Which function family does the displayed function belong to?", "C", ["Linear", "Quadratic", "Cubic", "Exponential"], "The highest power is x^3.", "f(x)=x^3-4x"),
        formulaAnswer("y11adv-lqc-m3", "For the displayed function, enter the larger zero.", "f(x)=(x-5)(x+1),\\quad (x-5)(x+1)=0", "5", ["x=5"]),
        formulaAnswer("y11adv-lqc-m4", "For the displayed function, enter the negative zero.", "g(x)=x^2-16,\\quad x^2-16=0", "-4", ["x=-4"]),
        practicalChoice("y11adv-lqc-m5", "A straight-line graph with y-intercept 3 is most likely:", "A", ["Linear", "Quadratic only", "Cubic only", "A reciprocal asymptote"], "Straight-line graphs are linear."),
        formulaAnswer("y11adv-lqc-m6", "For the displayed function, enter the smallest zero.", "h(x)=(x+2)(x-1)(x-4),\\quad (x+2)(x-1)(x-4)=0", "-2", ["x=-2"]),
        practicalChoice("y11adv-lqc-m7", "A table follows the displayed rule and sample values. Which function type is it?", "C", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "The outputs match a cubic pattern.", "y=x^3,\\quad x=-2\\Rightarrow y=-8,\\quad x=2\\Rightarrow y=8"),
        formulaAnswer("y11adv-lqc-m8", "For the displayed function, find the x-intercept.", "f(x)=-3x+12,\\quad -3x+12=0", "4", ["x=4", "(4,0)"]),
        practicalChoice("y11adv-lqc-m9", "For the displayed function, the parabola opens:", "B", ["Upward", "Downward", "Sideways", "Not at all"], "The coefficient of x^2 is negative.", "f(x)=-x^2+6x-5"),
        practicalChoice("y11adv-lqc-m10", "A factor x + 3 means the matching zero is:", "D", ["3", "0", "x + 3", "-3"], "Set x + 3 = 0."),
      ],
    };
  }

  if (lesson.slug === "polynomial-reciprocal-functions") {
    return {
      ...base,
      description:
        "Use degree, leading coefficient, roots, factors, reciprocal functions, and asymptotes to interpret polynomial and reciprocal graphs.",
      learningIntention:
        "Connect polynomial factors to roots and identify reciprocal function restrictions and asymptotes from algebraic rules.",
      successCriteria: [
        "Identify polynomial degree and leading coefficient from a rule.",
        "Use factors to determine zeros of a polynomial.",
        "Identify vertical asymptotes from reciprocal denominators.",
        "Match graph-feature descriptions to possible polynomial or reciprocal functions.",
      ],
      teaching: {
        paragraphs: [
          "A polynomial is built from powers of x with whole-number exponents, such as x^3 - 2x + 1. The degree is the highest power of x.",
          "Factors reveal roots. If a polynomial contains the factor x - 4, then x = 4 is a zero.",
          "A reciprocal function includes a variable in the denominator. Values that make the denominator zero are excluded from the domain and often create vertical asymptotes.",
          "For simple reciprocal functions such as y = 1/(x - h) + k, the vertical asymptote is x = h and the horizontal asymptote is y = k.",
        ],
        latexBlocks: [
          "p(x)=a(x-r_1)(x-r_2)\\Rightarrow \\text{zeros }r_1,r_2",
          "y=\\frac{1}{x-h}+k\\Rightarrow x=h\\text{ is a vertical asymptote, }y=k\\text{ is a horizontal asymptote}",
        ],
      },
      workedExamples: [
        {
          title: "Use factors to identify zeros",
          questionLatex: "p(x)=(x+3)(x-2)(x-5)",
          steps: [
            {
              explanation:
                "Set each factor equal to zero.",
              latex: "x+3=0,\\quad x-2=0,\\quad x-5=0",
            },
            {
              explanation: "Solve each simple equation.",
              latex: "x=-3,\\ 2,\\ 5",
            },
          ],
          finalAnswerLatex: "\\text{Zeros: }-3,\\ 2,\\ 5",
        },
        {
          title: "Identify a vertical asymptote",
          questionLatex: "g(x)=\\frac{1}{x-4}",
          steps: [
            {
              explanation:
                "The vertical asymptote occurs where the denominator would be zero.",
              latex: "x-4=0",
            },
            {
              explanation: "Solve for x.",
              latex: "x=4",
            },
          ],
          finalAnswerLatex: "\\text{Vertical asymptote: }x=4",
        },
        {
          title: "Choose a possible equation from features",
          questionLatex:
            "\\text{Zeros at }-2\\text{ and }3,\\quad \\text{vertical asymptote at }x=5",
          steps: [
            {
              explanation:
                "Zeros at -2 and 3 suggest numerator factors x + 2 and x - 3.",
              latex: "(x+2)(x-3)",
            },
            {
              explanation:
                "A vertical asymptote at x = 5 suggests denominator x - 5.",
              latex: "x-5",
            },
          ],
          finalAnswerLatex: "y=\\frac{(x+2)(x-3)}{x-5}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-poly-g1", "For the displayed function, enter the positive zero.", "p(x)=(x-4)(x+1),\\quad (x-4)(x+1)=0", "4", ["x=4"]),
        formulaAnswer("y11adv-poly-g2", "For the displayed reciprocal function, what is the vertical asymptote?", "g(x)=\\frac{1}{x-6},\\quad x-6=0", "x=6", ["6"]),
        practicalChoice("y11adv-poly-g3", "Which statement best describes the displayed function?", "C", ["It is linear", "It is reciprocal", "It is a degree 4 polynomial", "It has vertical asymptote $x=4$"], "The highest power is 4.", "p(x)=3x^4-2x+1"),
        practicalChoice("y11adv-poly-g4", "A reciprocal graph has vertical asymptote x = -2. Which denominator matches?", "A", ["x + 2", "x - 2", "x^2", "2x"], "x + 2 = 0 gives x = -2."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-poly-i1", "For the displayed function, enter the largest zero.", "p(x)=(x+5)(x-2)(x-7),\\quad (x+5)(x-2)(x-7)=0", "7", ["x=7"]),
        formulaAnswer("y11adv-poly-i2", "For the displayed reciprocal function, enter the vertical asymptote.", "y=\\frac{1}{x+3}-2,\\quad x+3=0", "x=-3", ["-3"]),
        formulaAnswer("y11adv-poly-i3", "For the displayed reciprocal function, enter the horizontal asymptote.", "y=\\frac{1}{x+3}-2,\\quad y=-2", "y=-2", ["-2"]),
        practicalChoice("y11adv-poly-i4", "A polynomial has zeros at -1 and 4. Which factor pair matches?", "B", ["(x-1)(x-4)", "(x+1)(x-4)", "(x-1)(x+4)", "(x+1)(x+4)"], "A zero at -1 gives x + 1, and a zero at 4 gives x - 4."),
        practicalChoice("y11adv-poly-i5", "Which feature is most associated with a simple reciprocal function?", "D", ["Constant first difference", "Always a parabola", "No domain restrictions", "A vertical asymptote"], "A reciprocal denominator creates a vertical asymptote."),
      ],
      commonMistakes: [
        { mistake: "Confusing a factor with a zero.", fix: "Set the factor equal to zero to find the zero." },
        { mistake: "Forgetting denominator restrictions.", fix: "Find the x-value that makes the denominator zero and exclude it." },
        { mistake: "Calling every curved graph a quadratic.", fix: "Check whether the rule is polynomial, reciprocal, or another function type." },
        { mistake: "Reversing horizontal shifts in reciprocal denominators.", fix: "For x - h in the denominator, the vertical asymptote is x = h." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-poly-m1", "For the displayed polynomial, the degree is:", "C", ["1", "2", "3", "8"], "The highest power of x is 3.", "p(x)=-2x^3+x-8"),
        formulaAnswer("y11adv-poly-m2", "For the displayed function, enter the negative zero.", "p(x)=(x-2)(x+6),\\quad (x-2)(x+6)=0", "-6", ["x=-6"]),
        formulaAnswer("y11adv-poly-m3", "For the displayed reciprocal function, enter the excluded x-value.", "g(x)=\\frac{1}{x-9},\\quad x-9\\ne0", "9", ["x=9"]),
        formulaAnswer("y11adv-poly-m4", "For the displayed reciprocal function, enter the horizontal asymptote.", "y=\\frac{1}{x-1}+5", "y=5", ["5"]),
        practicalChoice("y11adv-poly-m5", "Zeros at -2, 1 and 4 match which expression?", "B", ["(x-2)(x+1)(x+4)", "(x+2)(x-1)(x-4)", "(x-2)(x-1)(x+4)", "x^2+3x+2"], "Use factor x - r for zero r."),
        formulaAnswer("y11adv-poly-m6", "For the displayed reciprocal function, enter the vertical asymptote.", "y=\\frac{1}{x+8},\\quad x+8=0", "x=-8", ["-8"]),
        practicalChoice("y11adv-poly-m7", "Which function is reciprocal rather than polynomial?", "D", ["x^2 - 4", "3x^3 + 1", "x - 7", "1/(x - 4)"], "The variable appears in the denominator."),
        formulaAnswer("y11adv-poly-m8", "For the displayed function, enter the zero that is neither positive nor negative.", "p(x)=x(x-3)(x+2),\\quad x=0", "0", ["x=0"]),
        practicalChoice("y11adv-poly-m9", "For the displayed reciprocal function, the graph cannot cross which vertical line?", "A", ["x = 4", "x = -4", "y = 4", "y = 0"], "x = 4 is the vertical asymptote.", "y=\\frac{1}{x-4}"),
        practicalChoice("y11adv-poly-m10", "A factor x - 5 means the graph has an x-intercept at:", "C", ["(-5,0)", "(0,5)", "(5,0)", "(0,-5)"], "Set x - 5 = 0, so x = 5."),
      ],
    };
  }

  if (lesson.slug === "absolute-value-functions") {
    const basicAbsGraph = absoluteValueGraph(
      "Graph of y = |x| with vertex at the origin and two straight arms forming a V-shape.",
      0,
      0,
      "vertex (0, 0)"
    );
    const shiftedAbsGraph = absoluteValueGraph(
      "Graph of y = |x - 2| + 1 with vertex at (2, 1), shifted right two units and up one unit.",
      2,
      1,
      "vertex (2, 1)"
    );

    return {
      ...base,
      description:
        "Evaluate, sketch and interpret absolute-value functions, including transformations of y = |x|.",
      learningIntention:
        "Understand absolute value as distance from zero and use it to evaluate, solve and identify features of simple V-shaped graphs.",
      successCriteria: [
        "Evaluate absolute-value expressions such as |x - a|.",
        "Identify the vertex and axis of symmetry of y = |x - a| + b.",
        "Solve simple absolute-value equations by considering both positive and negative cases.",
        "Match absolute-value rules to V-shaped graph features.",
      ],
      teaching: {
        paragraphs: [
          "Absolute value tells you distance from zero on the number line. That is why |3| = 3 and |-3| = 3: both numbers are three units from zero.",
          "The graph of y = |x| is a V-shape. It has vertex (0, 0), slopes down to the left of the vertex, and slopes up to the right.",
          "A function like y = |x - a| + b shifts the V-shape. The vertex moves to (a, b), so y = |x - 2| + 1 has vertex (2, 1).",
          "When solving |x - a| = c, remember there are usually two x-values because two points can be the same distance from a.",
        ],
        latexBlocks: [
          "|x|=\\begin{cases}x,&x\\ge0\\\\-x,&x<0\\end{cases}",
          "y=|x-a|+b\\Rightarrow \\text{vertex }(a,b)",
          "|x-a|=c\\Rightarrow x-a=c\\text{ or }x-a=-c",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate an absolute-value expression",
          questionLatex: "\\text{Find } |{-4}|+2",
          cartesianGraph: basicAbsGraph,
          steps: [
            { explanation: "Absolute value gives the distance from zero, so |-4| becomes 4.", latex: "|-4|=4" },
            { explanation: "Add the remaining 2 after evaluating the absolute value.", latex: "4+2=6" },
          ],
          finalAnswerLatex: "6",
        },
        {
          title: "Find the vertex of a shifted absolute-value graph",
          questionLatex: "y=|x-2|+1",
          cartesianGraph: shiftedAbsGraph,
          steps: [
            { explanation: "Compare the rule with y = |x - a| + b.", latex: "a=2,\\quad b=1" },
            { explanation: "The vertex is the point (a, b).", latex: "(2,1)" },
          ],
          finalAnswerLatex: "\\text{Vertex }(2,1)",
        },
        {
          title: "Solve a simple absolute-value equation",
          questionLatex: "|x-3|=5",
          steps: [
            { explanation: "The expression x - 3 can be 5 or -5 because both have absolute value 5.", latex: "x-3=5\\quad \\text{or}\\quad x-3=-5" },
            { explanation: "Solve both linear equations.", latex: "x=8\\quad \\text{or}\\quad x=-2" },
          ],
          finalAnswerLatex: "x=-2,\\ 8",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-abs-g1", "What does absolute value measure?", "B", ["Gradient from left to right", "Distance from zero", "The largest x-value", "The y-intercept only"], "Absolute value gives distance from zero, so it is never negative."),
        formulaAnswer("y11adv-abs-g2", "Evaluate the absolute value expression.", "|-7|", "7", ["|-7|=7"]),
        formulaAnswer("y11adv-abs-g3", "Find the vertex of the absolute-value function.", "y=|x-3|+2", "(3,2)", ["(3, 2)", "3,2", "3, 2", "vertex (3,2)", "vertex (3, 2)"]),
        formulaAnswer("y11adv-abs-g4", "Solve the absolute-value equation. Enter the positive solution.", "|x|=4", "4", ["x=4"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-abs-i1", "Evaluate the absolute value expression.", "|-5|+3", "8", ["|-5|+3=8"]),
        formulaAnswer("y11adv-abs-i2", "Find the vertex of the absolute-value function.", "y=|x+1|-4", "(-1,-4)", ["(-1, -4)", "-1,-4", "-1, -4", "vertex (-1,-4)", "vertex (-1, -4)"]),
        formulaAnswer("y11adv-abs-i3", "Solve the absolute-value equation. Enter the smaller solution.", "|x-2|=5", "-3", ["x=-3"]),
        practicalChoice("y11adv-abs-i4", "Which graph feature belongs to y = |x - 4|?", "C", ["A horizontal asymptote", "A cubic turning point", "Vertex at (4, 0)", "Vertex at (-4, 0)"], "For y = |x - a|, the vertex is (a, 0)."),
        formulaAnswer("y11adv-abs-i5", "Find the minimum value of the absolute-value function.", "y=|x-6|+2", "2", ["minimum=2", "min=2", "y=2"]),
      ],
      commonMistakes: [
        { mistake: "Leaving absolute values negative.", fix: "Absolute value is distance, so |negative number| becomes positive." },
        { mistake: "Reversing the horizontal shift in |x - a|.", fix: "The vertex of y = |x - a| + b is (a, b), not (-a, b)." },
        { mistake: "Giving only one solution to |x - a| = c.", fix: "Use both x - a = c and x - a = -c when c is positive." },
        { mistake: "Treating the V-shaped graph as a parabola.", fix: "Absolute-value graphs are made from straight-line arms, not a smooth quadratic curve." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-abs-m1", "Evaluate the absolute value expression.", "|-9|-2", "7", ["|-9|-2=7"]),
        formulaAnswer("y11adv-abs-m2", "Find the vertex of the absolute-value function.", "y=|x-5|-3", "(5,-3)", ["(5, -3)", "5,-3", "5, -3", "vertex (5,-3)", "vertex (5, -3)"]),
        practicalChoice("y11adv-abs-m3", "Which equation has vertex (-2, 1)?", "D", ["y=|x-2|+1", "y=|x+1|-2", "y=|x-1|-2", "y=|x+2|+1"], "A vertex at (-2, 1) matches y = |x - (-2)| + 1 = |x + 2| + 1."),
        formulaAnswer("y11adv-abs-m4", "Solve the absolute-value equation. Enter the larger solution.", "|x+3|=6", "3", ["x=3"]),
        formulaAnswer("y11adv-abs-m5", "Find the y-intercept of the absolute-value function.", "y=|x-2|+1,\\quad x=0", "3", ["(0,3)", "y=3"]),
        practicalChoice("y11adv-abs-m6", "Which statement about y = |x| is true?", "A", ["It has vertex (0, 0)", "It is negative for x < 0", "It has no y-intercept", "It is a cubic graph"], "The graph y = |x| has vertex at the origin."),
        formulaAnswer("y11adv-abs-m7", "Solve the absolute-value equation. Enter the smaller solution.", "|x-1|=4", "-3", ["x=-3"]),
        formulaAnswer("y11adv-abs-m8", "Find the axis of symmetry of the absolute-value function.", "y=|x+4|-1", "x=-4", ["-4"]),
        formulaAnswer("y11adv-abs-m9", "Find the minimum value of the absolute-value function.", "y=|x+2|-5", "-5", ["minimum=-5", "min=-5", "y=-5"]),
        practicalChoice("y11adv-abs-m10", "A student says y = |x - 3| has vertex (-3, 0). What is the error?", "B", ["They used the wrong y-intercept", "They reversed the horizontal shift", "They treated |-3| as 0", "They used a reciprocal asymptote"], "In y = |x - a|, the vertex x-value is a."),
      ],
    };
  }

  if (lesson.slug === "odd-even-functions") {
    const evenGraph = sampledCurveGraph(
      "Graph of y = x squared, showing matching points (-2, 4) and (2, 4) reflected across the y-axis.",
      (x) => x * x,
      [
        { x: -2, y: 4, label: "(-2, 4)" },
        { x: 2, y: 4, label: "(2, 4)" },
        { x: 0, y: 0, label: "y-axis symmetry" },
      ]
    );
    const oddGraph = sampledCurveGraph(
      "Graph of y = x cubed, showing points (-1, -1) and (1, 1) related by origin symmetry.",
      (x) => x * x * x,
      [
        { x: -1, y: -1, label: "(-1, -1)" },
        { x: 1, y: 1, label: "(1, 1)" },
        { x: 0, y: 0, label: "origin" },
      ]
    );

    return {
      ...base,
      description:
        "Identify even, odd and neither functions using algebraic tests and graph symmetry.",
      learningIntention:
        "Use f(-x) to classify functions as even, odd or neither, and connect the algebraic test to graph symmetry.",
      successCriteria: [
        "Use f(-x) = f(x) to identify even functions.",
        "Use f(-x) = -f(x) to identify odd functions.",
        "Recognise y-axis symmetry for even functions and origin symmetry for odd functions.",
        "Classify simple polynomial functions as even, odd or neither.",
      ],
      teaching: {
        paragraphs: [
          "Even and odd are symmetry labels for functions. They are not about whether the powers look visually even or odd in isolation; the whole function must pass the test.",
          "A function is even when f(-x) = f(x). Its graph has y-axis symmetry, so the left side mirrors the right side.",
          "A function is odd when f(-x) = -f(x). Its graph has origin symmetry, meaning a point (a, b) is matched by (-a, -b).",
          "Some functions are neither. If f(-x) is not the same as f(x) and not the negative of f(x), do not force a symmetry label.",
        ],
        latexBlocks: [
          "\\text{Even: }f(-x)=f(x)",
          "\\text{Odd: }f(-x)=-f(x)",
          "\\text{Even symmetry: y-axis;}\\quad \\text{odd symmetry: origin}",
        ],
      },
      workedExamples: [
        {
          title: "Classify an even function",
          questionLatex: "f(x)=x^2+1",
          cartesianGraph: evenGraph,
          steps: [
            { explanation: "Substitute -x into the function.", latex: "f(-x)=(-x)^2+1" },
            { explanation: "Simplify and compare with f(x).", latex: "x^2+1=f(x)" },
          ],
          finalAnswerLatex: "\\text{Even function}",
        },
        {
          title: "Classify an odd function",
          questionLatex: "g(x)=x^3",
          cartesianGraph: oddGraph,
          steps: [
            { explanation: "Substitute -x into the function.", latex: "g(-x)=(-x)^3" },
            { explanation: "Simplify and compare with -g(x).", latex: "-x^3=-g(x)" },
          ],
          finalAnswerLatex: "\\text{Odd function}",
        },
        {
          title: "Recognise a function that is neither",
          questionLatex: "h(x)=x^2+x",
          steps: [
            { explanation: "Substitute -x into the function.", latex: "h(-x)=(-x)^2+(-x)=x^2-x" },
            { explanation: "This is not h(x) and not -h(x).", latex: "x^2-x\\ne x^2+x,\\quad x^2-x\\ne -x^2-x" },
          ],
          finalAnswerLatex: "\\text{Neither even nor odd}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-sym-g1", "An even function has which graph symmetry?", "A", ["Symmetry about the y-axis", "Symmetry about the x-axis", "Symmetry about x = 1", "No possible symmetry"], "Even functions satisfy f(-x) = f(x), which gives y-axis symmetry."),
        practicalChoice("y11adv-sym-g2", "An odd function has which graph symmetry?", "C", ["Symmetry about the y-axis", "Symmetry about y = 1", "Symmetry about the origin", "Symmetry about the x-axis"], "Odd functions satisfy f(-x) = -f(x), which gives origin symmetry."),
        formulaAnswer("y11adv-sym-g3", "Classify the function as even, odd or neither.", "f(x)=x^2", "even", ["even function"]),
        formulaAnswer("y11adv-sym-g4", "Classify the function as even, odd or neither.", "f(x)=x^3", "odd", ["odd function"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-sym-i1", "Classify the function as even, odd or neither.", "f(x)=x^4+2", "even", ["even function"]),
        formulaAnswer("y11adv-sym-i2", "Classify the function as even, odd or neither.", "g(x)=x^3+x", "odd", ["odd function"]),
        formulaAnswer("y11adv-sym-i3", "Classify the function as even, odd or neither.", "h(x)=x^2+x", "neither", ["neither even nor odd", "neither odd nor even"]),
        practicalChoice("y11adv-sym-i4", "If a graph contains (2, 5) and is even, which point must also be on it?", "B", ["(2, -5)", "(-2, 5)", "(-2, -5)", "(5, 2)"], "Even symmetry reflects across the y-axis, changing x but not y."),
        practicalChoice("y11adv-sym-i5", "If a graph contains (3, -4) and is odd, which point must also be on it?", "C", ["(-3, -4)", "(3, 4)", "(-3, 4)", "(4, -3)"], "Origin symmetry changes both coordinates' signs."),
      ],
      commonMistakes: [
        { mistake: "Classifying from one term instead of the whole function.", fix: "Substitute -x into the entire function before deciding." },
        { mistake: "Confusing y-axis symmetry with origin symmetry.", fix: "Even means y-axis symmetry; odd means origin symmetry." },
        { mistake: "Thinking every function must be even or odd.", fix: "Many functions are neither when neither test works." },
        { mistake: "Forgetting to compare f(-x) with -f(x) for odd functions.", fix: "For odd functions, the whole output changes sign." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-sym-m1", "Classify the function as even, odd or neither.", "f(x)=x^6-3x^2", "even", ["even function"]),
        formulaAnswer("y11adv-sym-m2", "Classify the function as even, odd or neither.", "g(x)=2x^5-x", "odd", ["odd function"]),
        formulaAnswer("y11adv-sym-m3", "Classify the function as even, odd or neither.", "h(x)=x^3+1", "neither", ["neither even nor odd", "neither odd nor even"]),
        practicalChoice("y11adv-sym-m4", "Which condition defines an even function?", "A", ["f(-x)=f(x)", "f(-x)=-f(x)", "f(x)=0", "f(-x)=x"], "Even functions have the same output for x and -x."),
        practicalChoice("y11adv-sym-m5", "Which condition defines an odd function?", "B", ["f(-x)=f(x)", "f(-x)=-f(x)", "f(x)=x^2", "f(0)=1"], "Odd functions change sign when x changes to -x."),
        formulaAnswer("y11adv-sym-m6", "For the even function, find f(-4).", "f(4)=9", "9", ["f(-4)=9"]),
        formulaAnswer("y11adv-sym-m7", "For the odd function, find f(-2).", "f(2)=7", "-7", ["f(-2)=-7"]),
        practicalChoice("y11adv-sym-m8", "A graph contains (-1, -3) and (1, 3). Which symmetry does this suggest?", "C", ["Y-axis symmetry", "X-axis symmetry", "Origin symmetry", "No function symmetry"], "The coordinates both change sign, matching origin symmetry."),
        formulaAnswer("y11adv-sym-m9", "Classify the function as even, odd or neither.", "p(x)=x^4+x^2+5", "even", ["even function"]),
        formulaAnswer("y11adv-sym-m10", "Classify the function as even, odd or neither.", "q(x)=x^5+x^2", "neither", ["neither even nor odd", "neither odd nor even"]),
      ],
    };
  }

  if (lesson.slug === "working-with-functions-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed function notation, domain, range, roots, intercepts, polynomial features, reciprocal asymptotes, and common-error recognition.",
      learningIntention:
        "Apply function notation, domain and range, intercepts, roots, polynomial features, and reciprocal asymptotes in mixed assessment-style questions.",
      successCriteria: [
        "Evaluate functions and recognise substitution errors.",
        "Identify domain, range, intercepts, roots, factors, and asymptotes.",
        "Choose possible equations from graph-feature descriptions.",
        "Give concise answers that match the feature being asked for.",
      ],
      teaching: {
        paragraphs: [
          "Mixed function questions often combine algebraic rules with graph features. Start by deciding whether the question is asking about an input, an output, a restriction, or an intercept.",
          "For function notation, substitute carefully. For domain, look for denominators and square roots. For roots and intercepts, set y = 0 or x = 0 as needed.",
          "For polynomial questions, use factors and degree. For reciprocal questions, use denominator restrictions to identify vertical asymptotes.",
          "Assessment questions often test common errors, such as confusing roots with factors or domain with range.",
        ],
        latexBlocks: [
          "f(a)=\\text{output when }x=a",
          "x\\text{-intercepts: solve }f(x)=0",
          "\\frac{1}{x-h}+k\\Rightarrow x=h,\\ y=k\\text{ are asymptotes}",
        ],
      },
      workedExamples: [
        {
          title: "Combine substitution and error recognition",
          questionLatex: "f(x)=2x^2-3x+1,\\quad f(-2)",
          steps: [
            {
              explanation:
                "Use brackets around the negative input.",
              latex: "2(-2)^2-3(-2)+1",
            },
            {
              explanation:
                "The common wrong answer comes from treating (-2)^2 as -4.",
              latex: "8+6+1=15",
            },
          ],
          finalAnswerLatex: "f(-2)=15",
        },
        {
          title: "Identify a domain restriction and asymptote",
          questionLatex: "g(x)=\\frac{1}{x+5}-2",
          steps: [
            {
              explanation:
                "The denominator cannot be zero, so x + 5 cannot equal zero.",
              latex: "x+5=0\\Rightarrow x=-5",
            },
            {
              explanation:
                "The vertical asymptote is the excluded x-value.",
              latex: "x=-5",
            },
          ],
          finalAnswerLatex: "\\text{Domain: }x\\neq -5,\\quad \\text{vertical asymptote }x=-5",
        },
        {
          title: "Match roots to a possible equation",
          questionLatex: "\\text{Zeros at }-2,\\ 1,\\ 4",
          steps: [
            {
              explanation:
                "A zero at -2 gives factor x + 2.",
            },
            {
              explanation:
                "Zeros at 1 and 4 give factors x - 1 and x - 4.",
              latex: "(x+2)(x-1)(x-4)",
            },
          ],
          finalAnswerLatex: "f(x)=(x+2)(x-1)(x-4)",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-func-exam-g1", "Evaluate the displayed function at the given input.", "f(x)=x^2-4x+2,\\quad f(-1)", "7", ["f(-1)=7"]),
        formulaAnswer("y11adv-func-exam-g2", "For the displayed reciprocal function, enter the excluded x-value.", "g(x)=\\frac{1}{x+5},\\quad x+5\\ne0", "-5", ["x=-5"]),
        practicalChoice("y11adv-func-exam-g3", "A function has zeros at -2 and 3. Which expression could represent it?", "B", ["(x-2)(x-3)", "(x+2)(x-3)", "(x-2)(x+3)", "1/(x-3)"], "Zeros -2 and 3 match factors x + 2 and x - 3."),
        practicalChoice("y11adv-func-exam-g4", "A student says the range of a table is the listed x-values. What is the error?", "C", ["They found the y-intercept", "They found the vertical asymptote", "They confused domain and range", "They found the cubic degree"], "The listed x-values are the domain."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-func-exam-i1", "Evaluate the displayed function at the given input.", "p(x)=3x^2+2x,\\quad p(-2)", "8", ["p(-2)=8"]),
        formulaAnswer("y11adv-func-exam-i2", "For the displayed reciprocal function, enter the vertical asymptote.", "y=\\frac{1}{x-4}+1,\\quad x-4=0", "x=4", ["4"]),
        formulaAnswer("y11adv-func-exam-i3", "For the displayed function, enter the larger zero.", "f(x)=(x+1)(x-5),\\quad (x+1)(x-5)=0", "5", ["x=5"]),
        practicalChoice("y11adv-func-exam-i4", "A graph has the displayed lowest point and continues upward. Which range is correct?", "D", ["x >= -3", "y <= -3", "x != -3", "y >= -3"], "The range is the set of output y-values.", "y=-3\\text{ is the lowest output}"),
        practicalChoice("y11adv-func-exam-i5", "Which feature belongs to the displayed reciprocal function?", "A", ["Vertical asymptote $x=2$", "Zero at $x=2$", "No domain restriction", "Quadratic turning point at $x=2$"], "The denominator restriction creates the vertical asymptote.", "y=\\frac{1}{x-2}"),
      ],
      commonMistakes: [
        { mistake: "Answering with a root when the question asks for a factor.", fix: "Translate carefully: zero r corresponds to factor x - r." },
        { mistake: "Using y-values when asked for domain.", fix: "Domain is about allowed x-values." },
        { mistake: "Forgetting brackets in function substitution.", fix: "Put negative inputs in brackets before evaluating powers." },
        { mistake: "Treating an asymptote as an intercept.", fix: "An asymptote is approached by the graph; it is not usually crossed as an intercept." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-func-exam-m1", "Evaluate the displayed function at the given input.", "f(x)=2x^2-3x+1,\\quad f(-2)", "15", ["f(-2)=15"]),
        formulaAnswer("y11adv-func-exam-m2", "For the displayed reciprocal function, enter the excluded x-value.", "g(x)=\\frac{1}{x-4},\\quad x-4\\ne0", "4", ["x=4"]),
        practicalChoice("y11adv-func-exam-m3", "For the displayed square-root function, which domain is correct?", "A", ["x >= -6", "x <= -6", "x != -6", "x >= 6"], "x + 6 must be at least zero.", "h(x)=\\sqrt{x+6}"),
        formulaAnswer("y11adv-func-exam-m4", "For the displayed function, enter the negative zero.", "f(x)=(x-2)(x+7),\\quad (x-2)(x+7)=0", "-7", ["x=-7"]),
        practicalChoice("y11adv-func-exam-m5", "A cubic function has zeros at -2, 1 and 4. Which expression could represent it?", "B", ["(x-2)(x+1)(x+4)", "(x+2)(x-1)(x-4)", "(x+2)(x+1)(x-4)", "x^2-3x+2"], "Use x - r for each zero r."),
        formulaAnswer("y11adv-func-exam-m6", "For the displayed reciprocal function, enter the horizontal asymptote.", "y=\\frac{1}{x+3}-2", "y=-2", ["-2"]),
        practicalChoice("y11adv-func-exam-m7", "In the displayed factorised function, the highlighted factor gives which x-intercept?", "C", ["(-6,0)", "(0,6)", "(6,0)", "(0,-6)"], "Set x - 6 = 0.", "f(x)=(x-6)(x+1),\\quad x-6=0"),
        formulaAnswer("y11adv-func-exam-m8", "For the displayed function, enter the positive x-intercept.", "f(x)=-x^2+9,\\quad -x^2+9=0", "3", ["x=3", "(3,0)"]),
        practicalChoice("y11adv-func-exam-m9", "A table lists inputs -1, 0, 1 and outputs 2, 5, 10. Which set is the domain?", "D", ["{2,5,10}", "{-1,2,5}", "{0,5,10}", "{-1,0,1}"], "Domain is the set of input x-values."),
        practicalChoice("y11adv-func-exam-m10", "Which common error would change the value of the displayed function for the negative input?", "A", ["Writing $-3^2$ instead of $(-3)^2$", "Finding the y-intercept", "Using the range first", "Factoring the denominator"], "Brackets are needed around a negative input.", "f(x)=x^2+2x,\\quad f(-3)"),
      ],
    };
  }

  // ─── FA1 new lessons ────────────────────────────────────────────────────────

  if (lesson.slug === "algebraic-techniques") {
    return {
      ...base,
      description:
        "Apply index laws to positive, negative, zero and fractional indices; expand and simplify algebraic expressions; simplify algebraic fractions; expand and simplify surds; rationalise denominators using conjugates.",
      learningIntention:
        "Use index laws, surd laws and conjugate rationalisation to simplify algebraic expressions accurately.",
      successCriteria: [
        "Apply the index multiplication, division and power laws to simplify expressions.",
        "Evaluate expressions with zero, negative and fractional indices.",
        "Expand and simplify surd expressions by identifying like surd terms.",
        "Rationalise a denominator of the form 1/(√a ± √b) using the conjugate.",
      ],
      teaching: {
        paragraphs: [
          "Index laws tell you what happens when you multiply, divide or raise powers of the same base. The key idea is that an exponent is just counting how many times the base is multiplied. So a³ × a² = a^(3+2) = a⁵ — the five multiplications are added together.",
          "Negative and zero indices extend the pattern. a⁰ = 1 for any non-zero base because dividing a^n by a^n gives 1. a^(−n) = 1/a^n because it reverses the multiplication: a^3 × a^(−3) = a^0 = 1, so a^(−3) = 1/a^3.",
          "Surds are square roots that cannot be simplified to a whole number, such as √3 or √5. Like surds — those with the same number under the root — can be added or subtracted. For example, 2√3 + 5√3 = 7√3, just like 2x + 5x = 7x. Unlike surds such as √3 and √5 cannot be combined directly.",
          "To rationalise 1/(√a + √b), multiply the numerator and denominator by the conjugate (√a − √b). The denominator becomes (√a + √b)(√a − √b) = a − b, which is rational. Expand the numerator carefully and simplify.",
        ],
        latexBlocks: [
          "a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}",
          "a^0 = 1, \\quad a^{-n} = \\frac{1}{a^n}, \\quad a^{1/n} = \\sqrt[n]{a}",
          "\\frac{1}{\\sqrt{a}+\\sqrt{b}} = \\frac{\\sqrt{a}-\\sqrt{b}}{a-b} \\quad \\text{(conjugate rationalisation)}",
        ],
      },
      workedExamples: [
        {
          title: "Simplify using index laws",
          questionLatex: "\\text{Simplify } x^5 \\cdot x^{-3}",
          steps: [
            {
              explanation: "When multiplying same-base powers, add the indices.",
              latex: "x^5 \\cdot x^{-3} = x^{5+(-3)}",
            },
            {
              explanation: "Evaluate the sum of the indices.",
              latex: "x^{5-3} = x^2",
            },
          ],
          finalAnswerLatex: "x^2",
        },
        {
          title: "Expand and simplify a surd product",
          questionLatex: "\\text{Expand and simplify } (2+\\sqrt{3})(1-\\sqrt{3})",
          steps: [
            {
              explanation: "Expand each pair of terms using the distributive law.",
              latex: "2(1) + 2(-\\sqrt{3}) + \\sqrt{3}(1) + \\sqrt{3}(-\\sqrt{3})",
            },
            {
              explanation: "Simplify: (√3)² = 3 and collect rational and surd terms.",
              latex: "2 - 2\\sqrt{3} + \\sqrt{3} - 3 = -1 - \\sqrt{3}",
            },
          ],
          finalAnswerLatex: "-1 - \\sqrt{3}",
        },
        {
          title: "Rationalise a denominator using the conjugate",
          questionLatex: "\\text{Simplify } \\frac{1}{1+\\sqrt{5}}",
          steps: [
            {
              explanation: "Multiply numerator and denominator by the conjugate of the denominator.",
              latex: "\\frac{1}{1+\\sqrt{5}} \\times \\frac{1-\\sqrt{5}}{1-\\sqrt{5}}",
            },
            {
              explanation: "The denominator becomes (1)² − (√5)² = 1 − 5 = −4.",
              latex: "\\frac{1-\\sqrt{5}}{-4}",
            },
            {
              explanation: "Divide every term in the numerator by −4.",
              latex: "\\frac{\\sqrt{5}-1}{4}",
            },
          ],
          finalAnswerLatex: "\\frac{\\sqrt{5}-1}{4}",
        },
      ],
      guidedPractice: [
        qa("y11adv-alg-g1", "Simplify the expression using the index multiplication law.", "x^5 \\cdot x^{-3}", "x^2", "Add the indices: 5 + (−3).", "Multiplying same-base powers adds the indices: x^5 · x^{−3} = x^{5+(−3)} = x^2.", ["x^(2)"]),
        qa("y11adv-alg-g2", "Simplify the expression using the index power law.", "(a^2)^3", "a^6", "Multiply the indices: 2 × 3.", "Raising a power to a power multiplies the indices: (a^2)^3 = a^{2×3} = a^6.", ["a^(6)"]),
        practicalChoice("y11adv-alg-g3", "Which expression correctly simplifies $\\sqrt{12} + \\sqrt{3}$?", "C", ["$\\sqrt{15}$", "$2\\sqrt{3}$", "$3\\sqrt{3}$", "$\\sqrt{15+3}$"], "√12 = 2√3, so √12 + √3 = 2√3 + √3 = 3√3. Unlike surds cannot be combined under one root."),
        qa("y11adv-alg-g4", "Simplify $\\sqrt{12} + \\sqrt{3}$ to the form $a\\sqrt{3}$. What is $a$?", "\\sqrt{12} + \\sqrt{3} = a\\sqrt{3}", "3", "Write √12 as a multiple of √3 first: √12 = 2√3.", "√12 = √(4×3) = 2√3. So 2√3 + √3 = 3√3. The coefficient a = 3."),
      ],
      independentPractice: [
        qa("y11adv-alg-i1", "Simplify $x^0 \\cdot x^4$.", "x^0 \\cdot x^4", "x^4", "Any base to the power 0 equals 1.", "x^0 = 1, so x^0 · x^4 = 1 · x^4 = x^4.", ["x^(4)"]),
        qa("y11adv-alg-i2", "Expand $(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})$.", "(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})", "2", "Use the difference of two squares: (a+b)(a−b) = a² − b².", "(√5 + √3)(√5 − √3) = (√5)² − (√3)² = 5 − 3 = 2."),
        qa("y11adv-alg-i3", "Evaluate $8^{2/3}$.", "8^{2/3}", "4", "Write as (8^{1/3})^2 and find the cube root first.", "8^{1/3} = ∛8 = 2, so 8^{2/3} = (8^{1/3})^2 = 2^2 = 4."),
        practicalChoice("y11adv-alg-i4", "Simplify $3\\sqrt{2} \\times 2\\sqrt{2}$.", "C", ["$5\\sqrt{2}$", "$5\\sqrt{4}$", "$12$", "$6\\sqrt{2}$"], "Multiply integer parts (3 × 2 = 6) and surd parts (√2 × √2 = 2) separately: 6 × 2 = 12."),
        qa("y11adv-alg-i5", "Simplify $2\\sqrt{18}$ to the form $a\\sqrt{2}$. What is $a$?", "2\\sqrt{18} = a\\sqrt{2}", "6", "Write 18 = 9 × 2 to extract the perfect-square factor.", "√18 = √(9×2) = 3√2, so 2√18 = 2 × 3√2 = 6√2. The coefficient a = 6."),
      ],
      commonMistakes: [
        { mistake: "Adding indices when the bases are different (e.g., x² · y³ = xy⁵).", fix: "Index laws only apply when the bases are identical. x² · y³ cannot be simplified further." },
        { mistake: "Writing a^{−n} as −a^n instead of 1/a^n.", fix: "A negative index means the reciprocal, not a negative sign: a^{−n} = 1/a^n." },
        { mistake: "Adding unlike surds (e.g., √3 + √5 = √8).", fix: "Surds can only be added when they have the same value under the root, like 2√3 + 5√3 = 7√3." },
        { mistake: "Forgetting to apply the index to the coefficient in (2x³)², writing x^6 instead of 4x^6.", fix: "The index outside the bracket applies to every factor inside: (2x³)² = 2² · (x³)² = 4x^6." },
      ],
      masteryQuiz: [
        qa("y11adv-alg-m1", "Simplify $x^4 \\div x^{-2}$.", "x^4 \\div x^{-2}", "x^6", "Subtract indices when dividing: 4 − (−2).", "Dividing same-base powers subtracts indices: x^4 ÷ x^{−2} = x^{4−(−2)} = x^6.", ["x^(6)"]),
        qa("y11adv-alg-m2", "Evaluate $27^{1/3}$.", "27^{1/3}", "3", "27^{1/3} is the cube root of 27.", "27^{1/3} = ∛27 = 3, since 3³ = 27."),
        practicalChoice("y11adv-alg-m3", "Which expression is equal to $x^{-3}$?", "B", ["$x^3$", "$\\frac{1}{x^3}$", "$-x^3$", "$\\frac{3}{x}$"], "A negative index means the reciprocal: x^{−3} = 1/x^3."),
        qa("y11adv-alg-m4", "In the expansion $(1+\\sqrt{3})^2 = a + b\\sqrt{3}$, find $a$.", "(1+\\sqrt{3})^2 = a+b\\sqrt{3}", "4", "Expand using (p+q)² = p² + 2pq + q².", "(1+√3)² = 1 + 2√3 + (√3)² = 1 + 2√3 + 3 = 4 + 2√3. So a = 4."),
        qa("y11adv-alg-m5", "Simplify $\\sqrt{50} - \\sqrt{8}$ to the form $a\\sqrt{2}$. What is $a$?", "\\sqrt{50} - \\sqrt{8} = a\\sqrt{2}", "3", "√50 = 5√2, √8 = 2√2.", "√50 = √(25×2) = 5√2. √8 = √(4×2) = 2√2. 5√2 − 2√2 = 3√2. Coefficient a = 3."),
        practicalChoice("y11adv-alg-m6", "To rationalise $\\frac{1}{\\sqrt{5}-1}$, you multiply top and bottom by:", "B", ["$\\sqrt{5}-1$", "$\\sqrt{5}+1$", "$\\sqrt{5}-2$", "$\\frac{1}{\\sqrt{5}}$"], "The conjugate of (√5 − 1) is (√5 + 1). Their product is (√5)² − 1² = 4, which is rational."),
        qa("y11adv-alg-m7", "Simplify $(2x^3)^2$.", "(2x^3)^2", "4x^6", "Apply the index to both 2 and x³: 2² = 4, (x³)² = x^6.", "(2x³)² = 2² · (x³)² = 4x^6.", ["4x^(6)"]),
        qa("y11adv-alg-m8", "Simplify $(2\\sqrt{3})(3\\sqrt{3})$.", "(2\\sqrt{3})(3\\sqrt{3})", "18", "Multiply integer parts and surd parts separately.", "(2×3)(√3×√3) = 6 × 3 = 18."),
        qa("y11adv-alg-m9", "Simplify $x^{1/2} \\cdot x^{3/2}$.", "x^{1/2} \\cdot x^{3/2}", "x^2", "Add fractional indices: 1/2 + 3/2 = 2.", "x^{1/2} · x^{3/2} = x^{1/2 + 3/2} = x^{4/2} = x^2.", ["x^(2)"]),
        practicalChoice("y11adv-alg-m10", "Evaluate $16^{3/4}$.", "B", ["$4$", "$8$", "$12$", "$64$"], "16^{1/4} = ∜16 = 2 (since 2^4 = 16), so 16^{3/4} = (16^{1/4})^3 = 2^3 = 8.", "16^{3/4}"),
      ],
    };
  }

  if (lesson.slug === "quadratic-equations-discriminant") {
    return {
      ...base,
      description:
        "Solve quadratic equations by factorisation, completing the square and the quadratic formula; define and evaluate the discriminant; use conditions on the discriminant to determine the nature of roots.",
      learningIntention:
        "Solve any quadratic equation and use the discriminant to predict whether roots are real, repeated or complex without solving.",
      successCriteria: [
        "Solve a quadratic by factorisation when integer factors exist.",
        "Apply the quadratic formula to solve any quadratic equation.",
        "Calculate the discriminant Δ = b² − 4ac from the equation ax² + bx + c = 0.",
        "Interpret Δ to state whether roots are two distinct real, one repeated, or no real solutions.",
      ],
      teaching: {
        paragraphs: [
          "A quadratic equation is any equation that can be written as ax² + bx + c = 0. Three methods exist: factorisation (fastest when integer factors exist), completing the square (always works and reveals the vertex form), and the quadratic formula (always works and is most direct).",
          "Factorisation: find two numbers that multiply to ac and add to b. Rewrite the middle term bx as the sum of those two numbers times x, then factor by grouping. For example, x² − 5x + 6 = 0 factors as (x−2)(x−3) = 0, giving x = 2 or x = 3.",
          "The quadratic formula always works: x = (−b ± √(b²−4ac)) / (2a). The expression under the root, b² − 4ac, is called the discriminant and written Δ. It controls how many real solutions exist without you needing to solve completely.",
          "If Δ > 0, the ± produces two distinct real roots. If Δ = 0, the ± vanishes and there is one repeated root x = −b/(2a). If Δ < 0, the square root is imaginary and there are no real roots.",
        ],
        latexBlocks: [
          "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          "\\Delta = b^2 - 4ac",
          "\\Delta > 0: \\text{ two distinct real roots}, \\quad \\Delta = 0: \\text{ one repeated root}, \\quad \\Delta < 0: \\text{ no real roots}",
        ],
      },
      workedExamples: [
        {
          title: "Solve by factorisation",
          questionLatex: "\\text{Solve } x^2 - 5x + 6 = 0",
          steps: [
            {
              explanation: "Find two numbers that multiply to 6 and add to −5: they are −2 and −3.",
              latex: "(x-2)(x-3) = 0",
            },
            {
              explanation: "Set each factor equal to zero and solve.",
              latex: "x = 2 \\quad \\text{or} \\quad x = 3",
            },
          ],
          finalAnswerLatex: "x = 2 \\text{ or } x = 3",
        },
        {
          title: "Evaluate the discriminant and state the nature of roots",
          questionLatex: "\\text{Find } \\Delta \\text{ for } 2x^2 - 4x + 5 = 0",
          steps: [
            {
              explanation: "Identify a = 2, b = −4, c = 5.",
              latex: "\\Delta = (-4)^2 - 4(2)(5) = 16 - 40",
            },
            {
              explanation: "Since Δ < 0, there are no real roots.",
              latex: "\\Delta = -24",
            },
          ],
          finalAnswerLatex: "\\Delta = -24 \\Rightarrow \\text{no real roots}",
        },
        {
          title: "Solve using the quadratic formula",
          questionLatex: "\\text{Solve } x^2 + 2x - 3 = 0",
          steps: [
            {
              explanation: "Identify a = 1, b = 2, c = −3. Compute the discriminant.",
              latex: "\\Delta = 4 + 12 = 16",
            },
            {
              explanation: "Substitute into the formula.",
              latex: "x = \\frac{-2 \\pm \\sqrt{16}}{2} = \\frac{-2 \\pm 4}{2}",
            },
            {
              explanation: "Evaluate each sign option.",
              latex: "x = 1 \\quad \\text{or} \\quad x = -3",
            },
          ],
          finalAnswerLatex: "x = 1 \\text{ or } x = -3",
        },
      ],
      guidedPractice: [
        qa("y11adv-quad-g1", "Solve $x^2 - 7x + 12 = 0$ by factorisation. Enter the smaller root.", "x^2 - 7x + 12 = 0", "3", "Find two numbers that multiply to 12 and add to −7.", "(x−3)(x−4) = 0 gives x = 3 or x = 4. The smaller root is 3."),
        qa("y11adv-quad-g2", "Compute the discriminant for $3x^2 - 5x + 2 = 0$.", "\\Delta = b^2 - 4ac,\\quad a=3,\\,b=-5,\\,c=2", "1", "Δ = (−5)² − 4(3)(2) = 25 − 24.", "Δ = 25 − 24 = 1."),
        practicalChoice("y11adv-quad-g3", "What does $\\Delta = 0$ indicate about the roots of a quadratic?", "C", ["Two distinct rational roots", "Two distinct irrational roots", "One repeated root", "No real roots"], "When Δ = 0, the ± term vanishes and there is exactly one root value x = −b/(2a) — a repeated or double root."),
        qa("y11adv-quad-g4", "Solve $x^2 - 2x - 8 = 0$ using the quadratic formula. Enter the positive root.", "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a},\\quad a=1,\\,b=-2,\\,c=-8", "4", "Δ = 4 + 32 = 36. Then x = (2 ± 6)/2.", "Δ = 36. x = (2 ± 6)/2 gives x = 4 or x = −2. The positive root is 4."),
      ],
      independentPractice: [
        qa("y11adv-quad-i1", "Solve $x^2 + 5x + 4 = 0$ by factorisation. Enter the larger (less negative) root.", "x^2 + 5x + 4 = 0", "-1", "Find two numbers that multiply to 4 and add to 5.", "(x+1)(x+4) = 0 gives x = −1 or x = −4. The larger root is −1.", ["-1", "−1"]),
        practicalChoice("y11adv-quad-i2", "The discriminant of $x^2 + 2x + 5 = 0$ is $\\Delta = 4 - 20 = -16$. This means:", "D", ["Two distinct rational roots", "One repeated root", "Two distinct irrational roots", "No real roots"], "Δ < 0 means the square root in the formula is imaginary — there are no real solutions."),
        qa("y11adv-quad-i3", "Compute $\\Delta$ for $x^2 - 6x + 9 = 0$.", "\\Delta = b^2 - 4ac,\\quad a=1,\\,b=-6,\\,c=9", "0", "Δ = 36 − 36.", "Δ = (−6)² − 4(1)(9) = 36 − 36 = 0. One repeated root."),
        qa("y11adv-quad-i4", "Solve $2x^2 + x - 3 = 0$ by factorisation. Enter the positive root.", "2x^2 + x - 3 = 0", "1", "Try (2x + a)(x + b) where ab = −3.", "(2x + 3)(x − 1) = 0 gives x = −3/2 or x = 1. The positive root is 1."),
        practicalChoice("y11adv-quad-i5", "For the roots of a quadratic to be rational, the discriminant must be:", "C", ["Negative", "Zero only", "A perfect square and non-negative", "Any positive number"], "Rational roots require √Δ to be a whole number. Δ must be a non-negative perfect square (Δ = 0 gives a rational double root; a positive perfect square gives two rational roots)."),
      ],
      commonMistakes: [
        { mistake: "Writing b² + 4ac instead of b² − 4ac for the discriminant.", fix: "The discriminant formula uses subtraction: Δ = b² − 4ac. Write out a, b, c before substituting." },
        { mistake: "Assuming negative roots mean Δ is negative.", fix: "The sign of Δ tells you how many roots exist — not whether the roots are positive or negative." },
        { mistake: "Writing the formula as x = (b ± √Δ)/(2a) instead of x = (−b ± √Δ)/(2a).", fix: "The quadratic formula has −b, not b. Check the sign of b before substituting." },
        { mistake: "Concluding that a repeated root means x = 0.", fix: "A double root occurs at x = −b/(2a), which is rarely zero unless b = 0." },
      ],
      masteryQuiz: [
        qa("y11adv-quad-m1", "Solve $x^2 - x - 6 = 0$ by factorisation. Enter the positive root.", "x^2 - x - 6 = 0", "3", "Find two numbers that multiply to −6 and add to −1.", "(x−3)(x+2) = 0. Roots: x = 3 or x = −2. Positive root is 3."),
        qa("y11adv-quad-m2", "Compute $\\Delta$ for $2x^2 + 3x + 5 = 0$.", "\\Delta = b^2 - 4ac,\\quad a=2,\\,b=3,\\,c=5", "-31", "Δ = 9 − 40.", "Δ = 3² − 4(2)(5) = 9 − 40 = −31.", ["-31", "−31"]),
        practicalChoice("y11adv-quad-m3", "A discriminant of $-31$ indicates the quadratic has:", "D", ["Two distinct rational roots", "One repeated root", "Two distinct irrational roots", "No real roots"], "Δ < 0 means no real roots — the formula would require the square root of a negative number."),
        qa("y11adv-quad-m4", "Solve $x^2 - 4x + 4 = 0$. Enter the repeated root.", "x^2 - 4x + 4 = (x-2)^2 = 0", "2", "Δ = 0 means one repeated root.", "x² − 4x + 4 = (x−2)² = 0, giving the repeated root x = 2."),
        qa("y11adv-quad-m5", "Solve $x^2 + 2x - 3 = 0$ using the formula. Enter the positive root.", "x = \\frac{-2 \\pm \\sqrt{4+12}}{2}", "1", "Δ = 16. Then x = (−2 ± 4)/2.", "Δ = 16. x = (−2 + 4)/2 = 1 or x = (−2 − 4)/2 = −3. Positive root is 1."),
        practicalChoice("y11adv-quad-m6", "For $3x^2 + 2x - 1 = 0$, why are the roots rational?", "C", ["$\\Delta < 0$", "$\\Delta$ is a negative perfect square", "$\\Delta = 4 + 12 = 16$, a perfect square", "$\\Delta = 4 - 12 = -8$"], "Δ = 4 + 12 = 16 = 4². A non-negative perfect square discriminant guarantees rational roots."),
        practicalChoice("y11adv-quad-m7", "When $\\Delta > 0$ but is not a perfect square, the roots are:", "C", ["Rational", "Equal", "Two distinct irrational real numbers", "Imaginary"], "Δ > 0 guarantees two distinct real roots. If Δ is not a perfect square, √Δ is irrational, making both roots irrational."),
        qa("y11adv-quad-m8", "Compute $b^2 - 4ac$ for $x^2 - 6x + 9 = 0$.", "b^2 - 4ac,\\quad a=1,\\,b=-6,\\,c=9", "0", "Δ = 36 − 36.", "Δ = (−6)² − 4(1)(9) = 36 − 36 = 0."),
        qa("y11adv-quad-m9", "Solve $x^2 - 5x = 0$ by factorisation. Enter the non-zero solution.", "x^2 - 5x = 0,\\quad x(x-5) = 0", "5", "Factor out x: x(x − 5) = 0.", "x(x − 5) = 0 gives x = 0 or x = 5. The non-zero solution is 5."),
        practicalChoice("y11adv-quad-m10", "Which equation has no real roots?", "C", ["$x^2-4=0$", "$x^2+4x+4=0$", "$x^2+4x+5=0$", "$x^2-4x+3=0$"], "For x² + 4x + 5 = 0: Δ = 16 − 20 = −4 < 0, so no real roots. The other equations have Δ ≥ 0."),
      ],
    };
  }

  if (lesson.slug === "linear-functions") {
    return {
      ...base,
      description:
        "Use gradient-intercept, general and point-gradient forms of linear equations; find x- and y-intercepts; graph linear functions; identify parallel and perpendicular relationships; solve and graph linear inequalities.",
      learningIntention:
        "Write, interpret and solve linear equations and inequalities, and identify parallel and perpendicular lines from their equations.",
      successCriteria: [
        "Read the gradient and y-intercept from gradient-intercept form y = mx + c.",
        "Find x- and y-intercepts by substituting y = 0 and x = 0 respectively.",
        "State whether two lines are parallel or perpendicular using their gradients.",
        "Solve a linear inequality and correctly reverse the inequality sign when dividing by a negative.",
      ],
      teaching: {
        paragraphs: [
          "A linear function produces a straight-line graph because equal changes in x always produce equal changes in y. The gradient m measures how much y changes for each unit increase in x. A gradient of 3 means y increases by 3 every time x increases by 1.",
          "The three most useful equation forms are: gradient-intercept form y = mx + c (m is the gradient, c is the y-intercept), point-gradient form y − y₁ = m(x − x₁) (uses a known point and gradient), and general form ax + by + c = 0. You can convert between them algebraically.",
          "Parallel lines have exactly the same gradient. Perpendicular lines have gradients that multiply to −1: if one line has gradient m, the perpendicular gradient is −1/m (the negative reciprocal). For example, lines with gradients 2 and −1/2 are perpendicular.",
          "A linear inequality such as 3x − 5 > 1 is solved like an equation with one critical rule: when you multiply or divide both sides by a negative number, the inequality sign reverses. For example, −2x > 4 → x < −2.",
        ],
        latexBlocks: [
          "y = mx + c, \\quad m = \\frac{y_2-y_1}{x_2-x_1}",
          "y - y_1 = m(x - x_1) \\quad \\text{(point-gradient form)}",
          "\\text{Perpendicular gradients: } m_1 \\times m_2 = -1",
        ],
      },
      workedExamples: [
        {
          title: "Find gradient and y-intercept from general form",
          questionLatex: "\\text{Find gradient and y-intercept of } 3x - 2y + 6 = 0",
          steps: [
            {
              explanation: "Rearrange to gradient-intercept form by making y the subject.",
              latex: "-2y = -3x - 6",
            },
            {
              explanation: "Divide both sides by −2.",
              latex: "y = \\frac{3}{2}x + 3",
            },
          ],
          finalAnswerLatex: "m = \\tfrac{3}{2},\\quad \\text{y-intercept } (0,\\,3)",
        },
        {
          title: "Write a line through a point parallel to a given line",
          questionLatex: "\\text{Line through }(2,3)\\text{ parallel to }y=2x-1",
          steps: [
            {
              explanation: "Parallel lines share the same gradient, so m = 2.",
              latex: "m = 2",
            },
            {
              explanation: "Use point-gradient form with the known point (2, 3).",
              latex: "y - 3 = 2(x - 2)",
            },
            {
              explanation: "Expand and simplify.",
              latex: "y = 2x - 1",
            },
          ],
          finalAnswerLatex: "y = 2x - 1",
        },
        {
          title: "Solve a linear inequality",
          questionLatex: "\\text{Solve } 2x - 5 > 3",
          steps: [
            {
              explanation: "Add 5 to both sides.",
              latex: "2x > 8",
            },
            {
              explanation: "Divide both sides by 2 (positive, so the sign stays the same).",
              latex: "x > 4",
            },
          ],
          finalAnswerLatex: "x > 4",
        },
      ],
      guidedPractice: [
        qa("y11adv-lin-g1", "State the gradient of $y = 3x - 7$.", "y = 3x - 7", "3", "In y = mx + c, m is the gradient.", "The equation is in y = mx + c form with m = 3."),
        qa("y11adv-lin-g2", "Find the y-intercept of $2x + y - 5 = 0$ by setting $x = 0$.", "2x + y - 5 = 0,\\quad x = 0", "5", "Set x = 0 and solve for y.", "When x = 0: 0 + y − 5 = 0, so y = 5. The y-intercept is 5."),
        practicalChoice("y11adv-lin-g3", "A line has gradient 2. What is the gradient of a perpendicular line?", "D", ["$2$", "$-2$", "$\\frac{1}{2}$", "$-\\frac{1}{2}$"], "Perpendicular gradients multiply to −1: if m₁ = 2 then m₂ = −1/2."),
        qa("y11adv-lin-g4", "Find the x-intercept of $y = 4x - 8$ by setting $y = 0$.", "y = 4x - 8,\\quad y = 0", "2", "Set y = 0: 4x − 8 = 0.", "0 = 4x − 8 → 4x = 8 → x = 2."),
      ],
      independentPractice: [
        qa("y11adv-lin-i1", "Find the gradient of the line through $(1,\\,3)$ and $(3,\\,7)$.", "m = \\frac{7-3}{3-1}", "2", "Rise = 7 − 3 = 4. Run = 3 − 1 = 2.", "m = (7 − 3)/(3 − 1) = 4/2 = 2."),
        qa("y11adv-lin-i2", "Solve $3x + 5 > 11$. Enter in the form $x > ...$", "3x + 5 > 11", "x>2", "Subtract 5, then divide by 3.", "3x + 5 > 11 → 3x > 6 → x > 2.", ["x > 2"]),
        qa("y11adv-lin-i3", "State the y-intercept of $y = -3x + 9$.", "y = -3x + 9", "9", "In y = mx + c, c is the y-intercept.", "The constant term c = 9 gives the y-intercept."),
        practicalChoice("y11adv-lin-i4", "Which line is parallel to $y = -2x + 5$?", "B", ["$y=2x+5$", "$y=-2x-3$", "$y=\\frac{1}{2}x+5$", "$y=2x-5$"], "Parallel lines have the same gradient. Only y = −2x − 3 has gradient −2, matching y = −2x + 5."),
        qa("y11adv-lin-i5", "Find the x-intercept of $2x - 3y + 6 = 0$ by setting $y = 0$.", "2x - 3y + 6 = 0,\\quad y = 0", "-3", "Set y = 0: 2x + 6 = 0.", "When y = 0: 2x + 6 = 0 → 2x = −6 → x = −3.", ["-3", "−3"]),
      ],
      commonMistakes: [
        { mistake: "Dividing by a negative in an inequality without reversing the sign.", fix: "When multiplying or dividing both sides of an inequality by a negative number, always flip the inequality sign." },
        { mistake: "Confusing gradient m with y-intercept c in y = mx + c.", fix: "m is the coefficient of x (gradient); c is the constant term (y-intercept)." },
        { mistake: "Using m₂ = −m₁ for perpendicular lines instead of m₂ = −1/m₁.", fix: "Perpendicular gradients are negative reciprocals: m₁ × m₂ = −1, so m₂ = −1/m₁." },
        { mistake: "Substituting x = 0 to find the x-intercept instead of y = 0.", fix: "The x-intercept is where y = 0. Set y = 0 and solve for x. The y-intercept is where x = 0." },
      ],
      masteryQuiz: [
        qa("y11adv-lin-m1", "State the gradient of $y = -5x + 2$.", "y = -5x + 2", "-5", "In y = mx + c, m is the coefficient of x.", "The gradient is the coefficient of x, which is −5.", ["-5", "−5"]),
        qa("y11adv-lin-m2", "Find the y-intercept of $3x - y - 6 = 0$ by setting $x = 0$.", "3x - y - 6 = 0,\\quad x=0", "-6", "Set x = 0: −y − 6 = 0.", "When x = 0: −y − 6 = 0 → y = −6.", ["-6", "−6"]),
        qa("y11adv-lin-m3", "Find the gradient of the line through $(0,\\,4)$ and $(2,\\,0)$.", "m = \\frac{0-4}{2-0}", "-2", "Rise = 0 − 4 = −4. Run = 2 − 0 = 2.", "m = (0 − 4)/(2 − 0) = −4/2 = −2.", ["-2", "−2"]),
        practicalChoice("y11adv-lin-m4", "The gradient of a line perpendicular to $y = -3x + 1$ is:", "C", ["$-3$", "$3$", "$\\frac{1}{3}$", "$-\\frac{1}{3}$"], "m₁ × m₂ = −1. If m₁ = −3, then m₂ = −1/(−3) = 1/3."),
        qa("y11adv-lin-m5", "Solve $5 - 2x \\le 1$. Enter in the form $x \\ge ...$", "5 - 2x \\le 1", "x>=2", "Subtract 5, then divide by −2 and reverse the sign.", "5 − 2x ≤ 1 → −2x ≤ −4 → x ≥ 2 (sign reverses when dividing by −2).", ["x >= 2", "x≥2"]),
        qa("y11adv-lin-m6", "Find the x-intercept of $y = 2x + 6$ by setting $y = 0$.", "y = 2x + 6,\\quad y=0", "-3", "0 = 2x + 6, so 2x = −6.", "0 = 2x + 6 → 2x = −6 → x = −3.", ["-3", "−3"]),
        practicalChoice("y11adv-lin-m7", "Which form of a linear equation uses a known point $(x_1, y_1)$ and gradient $m$?", "B", ["$y=mx+c$", "$y-y_1=m(x-x_1)$", "$ax+by+c=0$", "$y=mx$"], "The point-gradient form y − y₁ = m(x − x₁) uses a known point and gradient directly without first finding the y-intercept."),
        qa("y11adv-lin-m8", "State the y-intercept of $y = 7 - 4x$.", "y = -4x + 7", "7", "The y-intercept is the constant term in y = mx + c form.", "Rewritten: y = −4x + 7. The y-intercept c = 7."),
        qa("y11adv-lin-m9", "Solve $3(x-1) > 6$. Enter in the form $x > ...$", "3(x-1) > 6", "x>3", "Divide both sides by 3, then add 1.", "3(x − 1) > 6 → x − 1 > 2 → x > 3.", ["x > 3"]),
        qa("y11adv-lin-m10", "Find the gradient of a line perpendicular to $y = \\frac{1}{3}x + 5$.", "m_1 = \\frac{1}{3},\\quad m_1 \\times m_2 = -1", "-3", "m₂ = −1/m₁ = −1/(1/3).", "m₂ = −1/(1/3) = −3.", ["-3", "−3"]),
      ],
    };
  }

  if (lesson.slug === "constructing-using-functions") {
    return {
      ...base,
      description:
        "Construct and use linear and quadratic functions as mathematical models; apply linear inequalities in context; solve simultaneous linear equations by substitution and elimination; interpret cost-revenue and break-even problems.",
      learningIntention:
        "Set up and solve linear models, simultaneous equations and break-even problems using function notation and algebraic methods.",
      successCriteria: [
        "Write a linear function from a word problem by identifying the rate (gradient) and fixed value (y-intercept).",
        "Solve simultaneous linear equations by substitution and by elimination.",
        "Set up and solve a break-even equation by equating revenue and cost functions.",
        "Interpret the gradient and y-intercept in the context of a practical model.",
      ],
      teaching: {
        paragraphs: [
          "A linear model links two quantities with a constant rate of change. If a cost increases by the same amount per unit, that relationship is linear: C = mn + c, where m is the cost per unit and c is the fixed cost. The gradient m is always the rate — the cost per item, the speed, the charge per hour.",
          "Simultaneous equations arise when two conditions must hold at the same time. Substitution: rearrange one equation to make one variable the subject, then substitute into the other. Elimination: add or subtract multiples of the equations to cancel one variable.",
          "A break-even point occurs when revenue equals cost: R = C. At this point, profit is zero. Setting R(n) = C(n) and solving gives the exact quantity where the business neither gains nor loses money.",
          "In modelling problems, identify the input (independent variable) and the output before writing the function. Confirm the gradient and intercept make sense in context — a negative gradient for cost per item would be unrealistic.",
        ],
        latexBlocks: [
          "C = mn + c \\quad \\text{(m = variable rate, c = fixed cost, n = quantity)}",
          "\\text{Break-even: } R(n) = C(n)",
          "\\text{Profit} = R(n) - C(n)",
        ],
      },
      workedExamples: [
        {
          title: "Build and use a linear cost model",
          questionLatex: "\\text{A car hire costs } \\$40 \\text{ plus } \\$0.25 \\text{ per km. Find the cost for 120 km.}",
          steps: [
            {
              explanation: "Identify the fixed cost ($40) and the variable rate ($0.25 per km).",
              latex: "C = 0.25n + 40",
            },
            {
              explanation: "Substitute n = 120.",
              latex: "C = 0.25(120) + 40 = 30 + 40 = 70",
            },
          ],
          finalAnswerLatex: "C = \\$70",
        },
        {
          title: "Solve simultaneous equations by elimination",
          questionLatex: "2x + y = 7, \\quad x - y = 2",
          steps: [
            {
              explanation: "Add both equations to eliminate y.",
              latex: "3x = 9 \\Rightarrow x = 3",
            },
            {
              explanation: "Substitute x = 3 into the first equation to find y.",
              latex: "2(3) + y = 7 \\Rightarrow y = 1",
            },
          ],
          finalAnswerLatex: "x = 3,\\quad y = 1",
        },
        {
          title: "Find the break-even quantity",
          questionLatex: "R = 15n,\\quad C = 8n + 210",
          steps: [
            {
              explanation: "Set revenue equal to cost.",
              latex: "15n = 8n + 210",
            },
            {
              explanation: "Solve for n.",
              latex: "7n = 210 \\Rightarrow n = 30",
            },
          ],
          finalAnswerLatex: "\\text{Break-even at } n = 30",
        },
      ],
      guidedPractice: [
        qa("y11adv-model-g1", "A cost model is $C = 5n + 20$ where $n$ is the number of items. Find $C$ when $n = 8$.", "C = 5n + 20,\\quad n = 8", "60", "Substitute n = 8.", "C = 5(8) + 20 = 40 + 20 = 60."),
        qa("y11adv-model-g2", "Solve the simultaneous equations by adding them. Enter the value of $x$.", "x + y = 10,\\quad x - y = 4", "7", "Add both equations to eliminate y: 2x = 14.", "Adding: 2x = 14 → x = 7."),
        practicalChoice("y11adv-model-g3", "Break-even occurs when:", "B", ["Revenue is greater than cost", "Revenue equals cost", "Cost is greater than revenue", "Revenue minus cost equals 100"], "Break-even is where R = C — the business makes zero profit."),
        qa("y11adv-model-g4", "Revenue $R = 12n$ and cost $C = 8n + 40$. Find the break-even quantity.", "12n = 8n + 40", "10", "Set R = C: 12n = 8n + 40. Solve for n.", "12n − 8n = 40 → 4n = 40 → n = 10."),
      ],
      independentPractice: [
        qa("y11adv-model-i1", "Find $n$ when $C = 36$ in the model $C = 3n + 15$.", "3n + 15 = 36", "7", "Subtract 15, then divide by 3.", "3n = 21 → n = 7."),
        qa("y11adv-model-i2", "Solve simultaneously by substitution. Enter the value of $y$.", "x + 2y = 8,\\quad x = y + 2", "2", "Substitute x = y + 2 into x + 2y = 8.", "(y + 2) + 2y = 8 → 3y = 6 → y = 2."),
        qa("y11adv-model-i3", "Revenue $R = 20n$, cost $C = 12n + 120$. Find the profit when $n = 20$.", "P = 20n - (12n+120),\\quad n=20", "40", "P = 8n − 120. Substitute n = 20.", "P = 8(20) − 120 = 160 − 120 = 40."),
        practicalChoice("y11adv-model-i4", "In a linear cost model $C = mn + c$, what does the y-intercept $c$ represent?", "C", ["Variable cost per unit", "Total cost for c items", "Fixed cost", "Break-even quantity"], "The y-intercept c is the cost when n = 0 — the fixed cost that applies regardless of quantity."),
        qa("y11adv-model-i5", "Solve simultaneously. Enter the value of $x$.", "2x + 3y = 12,\\quad x = 6 - y", "6", "Substitute x = 6 − y into 2x + 3y = 12.", "2(6 − y) + 3y = 12 → 12 + y = 12 → y = 0, x = 6."),
      ],
      commonMistakes: [
        { mistake: "Confusing the gradient (variable cost per unit) with the y-intercept (fixed cost) in linear models.", fix: "The gradient m tells you the rate per unit; the y-intercept c is the initial cost when zero units are produced." },
        { mistake: "Substituting incorrectly by not replacing every instance of the variable.", fix: "Replace every occurrence of the variable being substituted. Verify by substituting both values back into both original equations." },
        { mistake: "Setting profit to zero when finding break-even instead of setting R = C.", fix: "Break-even is where R − C = 0, which is the same as R = C. Setting them equal directly is the clearest method." },
        { mistake: "Treating break-even as a revenue or cost value rather than a quantity.", fix: "Solving R = C gives the break-even quantity n. Substitute n back to find the break-even revenue or cost if needed." },
      ],
      masteryQuiz: [
        qa("y11adv-model-m1", "A cost model is $C = 7n + 30$. Find $C$ when $n = 5$.", "C = 7n + 30,\\quad n = 5", "65", "Substitute n = 5.", "C = 7(5) + 30 = 35 + 30 = 65."),
        qa("y11adv-model-m2", "Solve the simultaneous equations by subtraction. Enter $y$.", "x + y = 9,\\quad x - y = 3", "3", "Subtract the second from the first: 2y = 6.", "Subtracting: 2y = 6 → y = 3."),
        qa("y11adv-model-m3", "Revenue $R = 15n$, cost $C = 9n + 48$. Find the break-even quantity.", "15n = 9n + 48", "8", "Set R = C. Solve 6n = 48.", "15n = 9n + 48 → 6n = 48 → n = 8."),
        practicalChoice("y11adv-model-m4", "In a linear cost model $C = mn + c$, the gradient $m$ represents:", "B", ["The fixed cost", "The variable cost per unit", "The break-even point", "The total revenue"], "The gradient m is how much cost changes for each additional unit — the variable (marginal) cost per unit."),
        qa("y11adv-model-m5", "Revenue $R = 10n$, cost $C = 4n + 60$. Find the profit when $n = 15$.", "P = R - C = 10n - (4n+60),\\quad n=15", "30", "P = 6n − 60. Substitute n = 15.", "P = 6(15) − 60 = 90 − 60 = 30."),
        qa("y11adv-model-m6", "Solve by elimination. Enter $y$.", "3x + y = 11,\\quad 2x - y = 4", "2", "Add both equations to eliminate y: 5x = 15, x = 3.", "Adding: 5x = 15 → x = 3. Sub into 3(3) + y = 11 → y = 2."),
        qa("y11adv-model-m7", "A plumber charges a $80 callout fee plus $45 per hour. Find the cost of a 3-hour job.", "C = 80 + 45 \\times 3", "215", "Cost = fixed fee + rate × hours.", "C = 80 + 45 × 3 = 80 + 135 = 215."),
        practicalChoice("y11adv-model-m8", "Two straight lines with different gradients will:", "C", ["Be parallel", "Have no intersection", "Intersect at exactly one point", "Have the same y-intercept"], "Different gradients mean the lines are not parallel, so they must cross at exactly one point."),
        qa("y11adv-model-m9", "Revenue $R = 25n$, cost $C = 15n + 80$. What is the minimum integer $n$ for profit?", "25n > 15n + 80", "9", "10n > 80 → n > 8. Smallest integer is 9.", "25n − 15n > 80 → 10n > 80 → n > 8. Smallest integer n = 9."),
        qa("y11adv-model-m10", "Solve simultaneously. Enter $x$.", "x = 2y,\\quad x + y = 12", "8", "Substitute x = 2y into x + y = 12: 3y = 12.", "2y + y = 12 → y = 4. x = 2(4) = 8."),
      ],
    };
  }

  if (lesson.slug === "direct-inverse-variation") {
    return {
      ...base,
      description:
        "Model direct variation y = kx and inverse variation y = k/x; identify the constant of variation k; use the model to find unknown values; interpret graphs of direct and inverse variation.",
      learningIntention:
        "Identify, set up and use direct and inverse variation relationships to find unknown values.",
      successCriteria: [
        "Recognise direct variation y = kx and inverse variation y = k/x from given information.",
        "Calculate the constant of variation k from a known pair of values.",
        "Use the model to find unknown outputs or inputs.",
        "Distinguish between y = kx (line through origin) and a general linear function with non-zero y-intercept.",
      ],
      teaching: {
        paragraphs: [
          "In direct variation, y is always proportional to x — doubling x doubles y, halving x halves y. The relationship is y = kx, where k is the constant of variation. On a graph, y = kx is a straight line that passes through the origin.",
          "In inverse variation, y decreases as x increases and their product is always constant. The relationship is y = k/x. On a graph, y = k/x is a hyperbola passing through quadrants I and III when k > 0 — it never passes through the origin.",
          "To find k for direct variation, divide a known y-value by the corresponding x-value: k = y/x. For inverse variation, multiply: k = xy. Once k is known, substitute any new x or y to find the unknown.",
          "Direct variation y = kx always passes through (0, 0). A line like y = 3x + 5 is NOT direct variation because it has a y-intercept of 5. Do not confuse a proportional relationship with a general linear function.",
        ],
        latexBlocks: [
          "y = kx \\quad \\text{(direct variation — line through origin)}",
          "y = \\frac{k}{x} \\quad \\text{(inverse variation — hyperbola)}",
          "k = \\frac{y}{x} \\text{ for direct}, \\quad k = xy \\text{ for inverse}",
        ],
      },
      workedExamples: [
        {
          title: "Direct variation — find k and a missing value",
          questionLatex: "y \\propto x.\\text{ When } x=4,\\, y=12.\\text{ Find } y \\text{ when } x=7.",
          steps: [
            {
              explanation: "Find k by dividing the known y by the known x.",
              latex: "k = \\frac{12}{4} = 3",
            },
            {
              explanation: "Write the direct variation equation and substitute x = 7.",
              latex: "y = 3 \\times 7 = 21",
            },
          ],
          finalAnswerLatex: "y = 21",
        },
        {
          title: "Inverse variation — find k and a missing value",
          questionLatex: "y \\propto \\frac{1}{x}.\\text{ When } x=3,\\, y=8.\\text{ Find } y \\text{ when } x=6.",
          steps: [
            {
              explanation: "Find k by multiplying the known x and y values.",
              latex: "k = 3 \\times 8 = 24",
            },
            {
              explanation: "Write the inverse variation equation and substitute x = 6.",
              latex: "y = \\frac{24}{6} = 4",
            },
          ],
          finalAnswerLatex: "y = 4",
        },
      ],
      guidedPractice: [
        qa("y11adv-var-g1", "If $y = kx$ and $y = 20$ when $x = 5$, find $k$.", "k = \\frac{y}{x} = \\frac{20}{5}", "4", "k = y/x.", "k = 20/5 = 4."),
        qa("y11adv-var-g2", "If $y = k/x$ and $y = 10$ when $x = 2$, find $k$.", "k = xy = 2 \\times 10", "20", "k = xy.", "k = 2 × 10 = 20."),
        practicalChoice("y11adv-var-g3", "The equation $y = 4x$ describes:", "B", ["Inverse variation with k = 4", "Direct variation with k = 4", "Quadratic variation", "A constant function"], "y = kx with k = 4 is direct variation. The graph is a line through the origin with gradient 4."),
        qa("y11adv-var-g4", "Using direct variation $y = 4x$, find $y$ when $x = 6$.", "y = 4 \\times 6", "24", "Substitute x = 6 directly.", "y = 4(6) = 24."),
      ],
      independentPractice: [
        qa("y11adv-var-i1", "If $y \\propto x$ and $y = 15$ when $x = 3$, find $y$ when $x = 8$.", "k = \\frac{15}{3} = 5,\\quad y = 5 \\times 8", "40", "Find k = 15/3 = 5, then y = 5 × 8.", "k = 5. y = 5 × 8 = 40."),
        qa("y11adv-var-i2", "If $y \\propto 1/x$ and $y = 6$ when $x = 4$, find $k$.", "k = xy = 4 \\times 6", "24", "k = xy.", "k = 4 × 6 = 24."),
        practicalChoice("y11adv-var-i3", "The graph of $y = k/x$ with $k > 0$ passes through which quadrants?", "B", ["I and II", "I and III", "II and IV", "I and IV"], "For k > 0, when x > 0 then y > 0 (quadrant I), and when x < 0 then y < 0 (quadrant III). The curve never passes through II or IV."),
        qa("y11adv-var-i4", "If $y = k/x$ and $k = 30$, find $y$ when $x = 5$.", "y = \\frac{30}{5}", "6", "Divide k by x.", "y = 30/5 = 6."),
        qa("y11adv-var-i5", "If $y \\propto x$ and $y = 56$ when $x = 7$, find $k$.", "k = \\frac{56}{7}", "8", "k = y/x.", "k = 56/7 = 8."),
      ],
      commonMistakes: [
        { mistake: "Confusing direct variation y = kx with a general linear function y = mx + c.", fix: "Direct variation always passes through (0, 0). If there is a non-zero y-intercept, it is not direct variation." },
        { mistake: "Computing k = x/y instead of k = y/x for direct variation.", fix: "From y = kx, isolate k by dividing both sides by x: k = y/x." },
        { mistake: "Computing k = y/x instead of k = xy for inverse variation.", fix: "From y = k/x, multiply both sides by x: k = xy." },
        { mistake: "Expecting the graph of y = k/x to pass through the origin.", fix: "The inverse variation curve never crosses the origin — the function is undefined at x = 0." },
      ],
      masteryQuiz: [
        qa("y11adv-var-m1", "If $y = kx$ and $y = 16$ when $x = 4$, find $k$.", "k = \\frac{16}{4}", "4", "k = y/x.", "k = 16/4 = 4."),
        qa("y11adv-var-m2", "If $y \\propto 1/x$ and $y = 4$ when $x = 5$, find $k$.", "k = xy = 5 \\times 4", "20", "k = xy.", "k = 5 × 4 = 20."),
        practicalChoice("y11adv-var-m3", "Which equation represents inverse variation between $y$ and $x$?", "C", ["$y=5x$", "$y=5x+2$", "$y=\\frac{5}{x}$", "$y=\\frac{x^2}{5}$"], "Inverse variation has the form y = k/x. Only y = 5/x matches this structure."),
        qa("y11adv-var-m4", "If $y = 3x$, find $y$ when $x = 11$.", "y = 3 \\times 11", "33", "Substitute x = 11.", "y = 3 × 11 = 33."),
        qa("y11adv-var-m5", "If $y = 20/x$, find $y$ when $x = 4$.", "y = \\frac{20}{4}", "5", "Divide 20 by 4.", "y = 20/4 = 5."),
        qa("y11adv-var-m6", "If $y \\propto x$ and $y = 42$ when $x = 6$, find $k$.", "k = \\frac{42}{6}", "7", "k = y/x.", "k = 42/6 = 7."),
        practicalChoice("y11adv-var-m7", "The graph of $y = kx$ (direct variation) always passes through:", "B", ["$(0,\\,k)$", "$(0,\\,0)$", "$(1,\\,0)$", "$(k,\\,1)$"], "When x = 0, y = k(0) = 0, so the graph always passes through the origin."),
        qa("y11adv-var-m8", "If $y \\propto 1/x$ and $y = 3$ when $x = 8$, find $y$ when $x = 6$.", "k = 8 \\times 3 = 24,\\quad y = \\frac{24}{6}", "4", "k = 24. Then y = 24/6.", "k = 8 × 3 = 24. y = 24/6 = 4."),
        qa("y11adv-var-m9", "If $y \\propto x$ and $y = 3$ when $x = 12$, find $y$ when $x = 20$.", "k = \\frac{3}{12} = \\frac{1}{4},\\quad y = \\frac{1}{4} \\times 20", "5", "k = 1/4. Then y = (1/4)(20).", "k = 3/12 = 1/4. y = (1/4)(20) = 5."),
        practicalChoice("y11adv-var-m10", "If $y$ doubles when $x$ doubles, the relationship is:", "C", ["Inverse variation", "Quadratic variation", "Direct variation", "Constant variation"], "In y = kx, doubling x doubles y — equal proportional increases define direct variation."),
      ],
    };
  }

  if (lesson.slug === "circles-semicircles") {
    return {
      ...base,
      description:
        "Derive x² + y² = r² using the distance formula; graph circles centred at the origin; identify and graph upper and lower semicircles y = ±√(r² − x²); determine domain and range.",
      learningIntention:
        "Use the equation x² + y² = r² to describe circles and derive semicircle equations with correct domain and range.",
      successCriteria: [
        "Derive x² + y² = r² from the distance formula applied to a point (x, y) on a circle of radius r.",
        "Verify whether a point lies on a circle by substituting its coordinates.",
        "Write the equations of the upper and lower semicircles from a given circle equation.",
        "State the domain and range of a semicircle.",
      ],
      teaching: {
        paragraphs: [
          "A circle centred at the origin with radius r consists of all points (x, y) whose distance from (0, 0) equals r. Using the distance formula, the distance from (x, y) to the origin is √(x² + y²). Setting this equal to r and squaring both sides gives the circle equation x² + y² = r².",
          "To check whether a point lies on the circle, substitute its coordinates into x² + y² and compare the result with r². If x² + y² = r², the point is on the circle; if it is less, the point is inside; if it is greater, the point is outside.",
          "Rearranging the circle equation for y gives y² = r² − x², so y = ±√(r² − x²). The positive square root y = √(r² − x²) gives only the upper semicircle (y ≥ 0). The equation y = −√(r² − x²) gives only the lower semicircle (y ≤ 0). Neither equation alone is a full circle.",
          "Both semicircles have the same domain: −r ≤ x ≤ r (the expression under the root cannot be negative). The upper semicircle has range 0 ≤ y ≤ r; the lower has range −r ≤ y ≤ 0.",
        ],
        latexBlocks: [
          "x^2 + y^2 = r^2 \\quad \\text{(circle centred at origin, radius } r\\text{)}",
          "y = \\sqrt{r^2 - x^2} \\text{ (upper semicircle)}, \\quad y = -\\sqrt{r^2 - x^2} \\text{ (lower semicircle)}",
          "\\text{Domain: } -r \\le x \\le r, \\quad \\text{Range upper: } 0 \\le y \\le r",
        ],
      },
      workedExamples: [
        {
          title: "Derive the circle equation and verify a point",
          questionLatex: "\\text{Circle centre origin, radius 5. Does }(3,4)\\text{ lie on it?}",
          steps: [
            {
              explanation: "The circle equation is x² + y² = r² = 25.",
              latex: "x^2 + y^2 = 25",
            },
            {
              explanation: "Substitute (3, 4) and check.",
              latex: "3^2 + 4^2 = 9 + 16 = 25 \\checkmark",
            },
          ],
          finalAnswerLatex: "\\text{Yes — }(3,4)\\text{ lies on the circle.}",
        },
        {
          title: "State domain and range of a semicircle",
          questionLatex: "y = \\sqrt{25 - x^2}",
          steps: [
            {
              explanation: "The expression under the root must be non-negative: 25 − x² ≥ 0, so x² ≤ 25.",
              latex: "-5 \\le x \\le 5",
            },
            {
              explanation: "The square root is always non-negative, and its maximum is when x = 0.",
              latex: "0 \\le y \\le 5",
            },
          ],
          finalAnswerLatex: "\\text{Domain: }[-5,5],\\quad \\text{Range: }[0,5]",
        },
      ],
      guidedPractice: [
        qa("y11adv-cir-g1", "A circle centred at the origin has radius 4. What is $r^2$ in its equation $x^2 + y^2 = r^2$?", "r^2 = 4^2", "16", "Square the radius.", "r² = 4² = 16, so the equation is x² + y² = 16."),
        practicalChoice("y11adv-cir-g2", "Does the point $(3,\\,4)$ lie on the circle $x^2 + y^2 = 25$?", "C", ["No, because $3+4 \\ne 25$", "No, because $9+4=13 \\ne 25$", "Yes, because $9+16=25$", "Yes, because $3+4=7<25$"], "Substitute: 3² + 4² = 9 + 16 = 25 = r². The point lies on the circle."),
        practicalChoice("y11adv-cir-g3", "The graph of $y = \\sqrt{r^2 - x^2}$ represents:", "C", ["A full circle", "The lower semicircle ($y \\le 0$)", "The upper semicircle ($y \\ge 0$)", "An ellipse"], "The square root always returns a non-negative value, so y ≥ 0 — this is only the upper half."),
        qa("y11adv-cir-g4", "For the upper semicircle $x^2 + y^2 = 36$, find $y$ when $x = 0$.", "y = \\sqrt{36 - 0^2}", "6", "y = √36.", "y = √(36 − 0) = √36 = 6."),
      ],
      independentPractice: [
        qa("y11adv-cir-i1", "Find the radius of the circle $x^2 + y^2 = 49$.", "r^2 = 49,\\quad r = \\sqrt{49}", "7", "Take the positive square root of 49.", "r = √49 = 7."),
        practicalChoice("y11adv-cir-i2", "What is the domain of $y = \\sqrt{9 - x^2}$?", "B", ["$x \\le 3$", "$-3 \\le x \\le 3$", "$x \\ge 0$", "All real numbers"], "9 − x² ≥ 0 → x² ≤ 9 → −3 ≤ x ≤ 3."),
        qa("y11adv-cir-i3", "Upper semicircle $x^2 + y^2 = 100$. Find $y$ when $x = 6$.", "y = \\sqrt{100 - 6^2} = \\sqrt{64}", "8", "Subtract 36 from 100, then take the square root.", "y = √(100 − 36) = √64 = 8."),
        qa("y11adv-cir-i4", "Lower semicircle: $y = -\\sqrt{25 - x^2}$. Find $y$ when $x = 3$.", "y = -\\sqrt{25 - 9} = -\\sqrt{16}", "-4", "y = −√16.", "y = −√(25 − 9) = −√16 = −4.", ["-4", "−4"]),
        qa("y11adv-cir-i5", "A circle centred at the origin passes through $(5,\\,12)$. Find $r$.", "r^2 = 5^2 + 12^2 = 25 + 144", "13", "r² = 25 + 144 = 169. Take the square root.", "r² = 25 + 144 = 169. r = √169 = 13."),
      ],
      commonMistakes: [
        { mistake: "Treating x² + y² = r² as x + y = r (confusing sum with sum of squares).", fix: "Each coordinate is squared before adding. (3, 4) on a circle of radius 5 satisfies 3² + 4² = 25, not 3 + 4 = 5." },
        { mistake: "Saying y = √(r² − x²) represents a full circle.", fix: "The √ sign always returns a non-negative value, so this equation gives only the upper semicircle." },
        { mistake: "Stating the domain of a semicircle as 0 ≤ x ≤ r instead of −r ≤ x ≤ r.", fix: "The semicircle exists for both positive and negative x. The domain is −r ≤ x ≤ r." },
        { mistake: "Confusing radius r with r² when writing the equation.", fix: "The equation uses r², not r. A circle of radius 5 has equation x² + y² = 25, not x² + y² = 5." },
      ],
      masteryQuiz: [
        qa("y11adv-cir-m1", "A circle has radius 3. What is $r^2$?", "r^2 = 3^2", "9", "Square the radius.", "r² = 9."),
        practicalChoice("y11adv-cir-m2", "Which point lies on $x^2 + y^2 = 25$?", "C", ["$(3,\\,5)$", "$(4,\\,4)$", "$(3,\\,4)$", "$(5,\\,5)$"], "Check (3, 4): 3² + 4² = 9 + 16 = 25 ✓. The others give 34, 32, and 50 respectively."),
        qa("y11adv-cir-m3", "Upper semicircle $x^2 + y^2 = 16$. Find $y$ when $x = 0$.", "y = \\sqrt{16 - 0}", "4", "y = √16.", "y = √16 = 4."),
        qa("y11adv-cir-m4", "Find the largest $x$-value in the domain of $y = \\sqrt{36 - x^2}$.", "-6 \\le x \\le 6", "6", "Domain is −6 ≤ x ≤ 6. Largest value is 6.", "36 − x² ≥ 0 → x² ≤ 36 → −6 ≤ x ≤ 6. Largest x = 6."),
        practicalChoice("y11adv-cir-m5", "The graph of $y = -\\sqrt{r^2 - x^2}$ is:", "C", ["Upper semicircle", "Full circle", "Lower semicircle", "Parabola"], "The negative sign gives y ≤ 0 — this is only the lower half of the circle."),
        qa("y11adv-cir-m6", "The point $(a,\\,0)$ with $a > 0$ lies on $x^2 + y^2 = 64$. Find $a$.", "a^2 + 0 = 64", "8", "a² = 64. Take the positive root.", "a² = 64 → a = 8."),
        qa("y11adv-cir-m7", "A circle centred at origin passes through $(6,\\,8)$. Find $r$.", "r^2 = 6^2 + 8^2 = 36 + 64", "10", "r² = 100. Take the square root.", "r² = 36 + 64 = 100. r = 10."),
        practicalChoice("y11adv-cir-m8", "What is the range of $y = \\sqrt{25 - x^2}$?", "B", ["$-5 \\le y \\le 5$", "$0 \\le y \\le 5$", "$y \\ge 0$", "All real numbers"], "The square root is non-negative and at most 5 (when x = 0). Range: 0 ≤ y ≤ 5."),
        qa("y11adv-cir-m9", "Does $(5,\\,5)$ lie on $x^2 + y^2 = 50$? Enter yes or no.", "5^2 + 5^2 = 25 + 25", "yes", "Check 25 + 25 against r².", "5² + 5² = 25 + 25 = 50 = r². Yes, the point lies on the circle."),
        qa("y11adv-cir-m10", "A circle passes through $(0,\\,11)$. Find its radius.", "r^2 = 0^2 + 11^2 = 121", "11", "r² = 0 + 121 = 121.", "r² = 0² + 11² = 121. r = √121 = 11."),
      ],
    };
  }

  if (lesson.slug === "piecewise-defined-functions") {
    return {
      ...base,
      description:
        "Interpret and graph piecewise-defined functions; evaluate piecewise rules at specific inputs; determine domain, range and continuity; test for even or odd symmetry.",
      learningIntention:
        "Evaluate, interpret and classify piecewise-defined functions, including identifying continuity and symmetry.",
      successCriteria: [
        "Evaluate a piecewise function at a given input by selecting the correct rule.",
        "State the domain and range of a piecewise-defined function.",
        "Determine whether a piecewise function is continuous at a boundary point.",
        "Test whether a piecewise function is even, odd or neither using the f(−x) test.",
      ],
      teaching: {
        paragraphs: [
          "A piecewise-defined function uses different rules on different parts of its domain. Each rule applies only to the inputs in its specified interval. To evaluate f(a), find which interval contains a and use only that rule.",
          "Pay careful attention to strict inequalities (< or >) versus non-strict inequalities (≤ or ≥) at boundary values. The boundary value belongs to exactly one piece — whichever uses ≤ or ≥ at that value.",
          "A piecewise function is continuous if its pieces join without gaps or jumps. At each boundary value x = a, calculate the output from each piece: if both give the same value, the function is continuous there. If they differ, the function is discontinuous at x = a.",
          "To test for even or odd symmetry, apply the f(−x) test to every piece. If f(−x) = f(x) for all x in the domain, the function is even. If f(−x) = −f(x) for all x, it is odd. If neither condition holds for all x, the function is neither even nor odd.",
        ],
        latexBlocks: [
          "f(x) = \\begin{cases} g(x) & x < a \\\\ h(x) & x \\ge a \\end{cases}",
          "\\text{Even: } f(-x) = f(x) \\text{ for all } x \\quad \\text{Odd: } f(-x) = -f(x) \\text{ for all } x",
          "\\text{Continuous at } x=a \\text{ if output from each side equals } f(a)",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a piecewise function at two inputs",
          questionLatex: "f(x) = \\begin{cases} 2x & x < 0 \\\\ x^2+1 & x \\ge 0 \\end{cases}, \\quad f(3) \\text{ and } f(-2)",
          steps: [
            {
              explanation: "For f(3): x = 3 ≥ 0, so use the rule x² + 1.",
              latex: "f(3) = 3^2 + 1 = 10",
            },
            {
              explanation: "For f(−2): x = −2 < 0, so use the rule 2x.",
              latex: "f(-2) = 2(-2) = -4",
            },
          ],
          finalAnswerLatex: "f(3) = 10, \\quad f(-2) = -4",
        },
        {
          title: "Test continuity at a boundary",
          questionLatex: "f(x) = \\begin{cases} x+4 & x < 1 \\\\ 2x+3 & x \\ge 1 \\end{cases}",
          steps: [
            {
              explanation: "Evaluate the left-side rule as x approaches 1.",
              latex: "\\lim_{x \\to 1^-} (x+4) = 1+4 = 5",
            },
            {
              explanation: "Evaluate the right-side rule at x = 1.",
              latex: "f(1) = 2(1)+3 = 5",
            },
            {
              explanation: "Both sides give 5, so the function is continuous at x = 1.",
            },
          ],
          finalAnswerLatex: "\\text{Continuous at }x=1 \\text{ (both sides equal 5)}",
        },
        {
          title: "Test whether a piecewise function is odd",
          questionLatex: "f(x) = \\begin{cases} x^2 & x \\ge 0 \\\\ -x^2 & x < 0 \\end{cases}",
          steps: [
            {
              explanation: "Compute f(−x) using the appropriate piece for each region.",
              latex: "f(-x) = -(-x)^2 = -x^2 \\quad (\\text{when } {-x} < 0 \\text{, i.e. } x > 0)",
            },
            {
              explanation: "Compare f(−x) with −f(x). For x > 0: f(x) = x², so −f(x) = −x².",
              latex: "f(-x) = -x^2 = -f(x) \\checkmark",
            },
          ],
          finalAnswerLatex: "f \\text{ is odd}",
        },
      ],
      guidedPractice: [
        qa("y11adv-piece-g1", "Evaluate $f(3)$ for the displayed piecewise function.", "f(x) = \\begin{cases} 2x & x < 0 \\\\ x^2+1 & x \\ge 0 \\end{cases}", "10", "x = 3 ≥ 0, so use the rule x² + 1.", "Since 3 ≥ 0, use f(x) = x² + 1: f(3) = 9 + 1 = 10."),
        qa("y11adv-piece-g2", "Evaluate $f(-2)$ for the displayed piecewise function.", "f(x) = \\begin{cases} 2x & x < 0 \\\\ x^2+1 & x \\ge 0 \\end{cases}", "-4", "x = −2 < 0, so use the rule 2x.", "Since −2 < 0, use f(x) = 2x: f(−2) = 2(−2) = −4.", ["-4", "−4"]),
        practicalChoice("y11adv-piece-g3", "A piecewise function's pieces join without any gap or jump at the boundary. This means the function is:", "B", ["Discontinuous", "Continuous", "Undefined at the boundary", "Neither odd nor even"], "When output values from both sides of a boundary are equal, the function is continuous — its graph has no gap or jump."),
        practicalChoice("y11adv-piece-g4", "The function $f(x) = \\begin{cases} 1/x & x < -1 \\\\ x+2 & x > 1 \\end{cases}$ is not defined for:", "D", ["$x=-1$ only", "$x=1$ only", "$x=0$ only", "$-1 \\le x \\le 1$"], "The function is only defined for x < −1 and x > 1. Every value in the closed interval [−1, 1] is excluded from the domain."),
      ],
      independentPractice: [
        qa("y11adv-piece-i1", "Evaluate $f(2)$ for the displayed piecewise function.", "f(x) = \\begin{cases} x+5 & x \\le 2 \\\\ 3x-1 & x > 2 \\end{cases}", "7", "x = 2 satisfies x ≤ 2, so use x + 5.", "Since 2 ≤ 2, use f(x) = x + 5: f(2) = 2 + 5 = 7."),
        qa("y11adv-piece-i2", "Evaluate $f(4)$ for the displayed piecewise function.", "f(x) = \\begin{cases} x+5 & x \\le 2 \\\\ 3x-1 & x > 2 \\end{cases}", "11", "x = 4 > 2, so use 3x − 1.", "Since 4 > 2, use f(x) = 3x − 1: f(4) = 12 − 1 = 11."),
        practicalChoice("y11adv-piece-i3", "For $f(x) = \\begin{cases} x^2 & x \\ge 0 \\\\ -x^2 & x < 0 \\end{cases}$, we find $f(-x) = -f(x)$ for all $x$. The function is:", "B", ["Even", "Odd", "Neither", "Both even and odd"], "f(−x) = −f(x) is the defining condition for an odd function. The function has origin symmetry."),
        qa("y11adv-piece-i4", "Evaluate $f(-5)$ for the displayed function.", "f(x) = \\begin{cases} 3 & x < 0 \\\\ 0 & x = 0 \\\\ -3 & x > 0 \\end{cases}", "3", "x = −5 < 0, use the rule for negative x.", "Since −5 < 0, f(−5) = 3."),
        qa("y11adv-piece-i5", "Evaluate $f(5)$ for the displayed function.", "f(x) = \\begin{cases} x+3 & x < 2 \\\\ 7 & x \\ge 2 \\end{cases}", "7", "x = 5 ≥ 2, so use the constant rule.", "Since 5 ≥ 2, f(5) = 7."),
      ],
      commonMistakes: [
        { mistake: "Using the wrong piece when a boundary value can appear in two conditions.", fix: "Only one inequality at each boundary can include equality. The boundary belongs to the piece that uses ≤ or ≥ at that value." },
        { mistake: "Evaluating all pieces and combining or averaging the outputs.", fix: "Only one rule applies at each x-value. Find which interval contains x and apply that rule alone." },
        { mistake: "Assuming a piecewise function is always discontinuous.", fix: "A piecewise function is continuous if outputs match at every boundary. The piecewise form does not automatically mean discontinuous." },
        { mistake: "Applying the even/odd test to only one piece rather than checking all pieces.", fix: "f(−x) = ±f(x) must hold for every x in the domain — verify the test on both pieces and at boundary values." },
      ],
      masteryQuiz: [
        qa("y11adv-piece-m1", "Evaluate $f(-3)$ for the displayed function.", "f(x) = \\begin{cases} 2x+1 & x < 0 \\\\ x-3 & x \\ge 0 \\end{cases}", "-5", "x = −3 < 0, use 2x + 1.", "f(−3) = 2(−3) + 1 = −6 + 1 = −5.", ["-5", "−5"]),
        qa("y11adv-piece-m2", "Evaluate $f(0)$ for the displayed function.", "f(x) = \\begin{cases} 2x+1 & x < 0 \\\\ x-3 & x \\ge 0 \\end{cases}", "-3", "x = 0 ≥ 0, use x − 3.", "f(0) = 0 − 3 = −3.", ["-3", "−3"]),
        qa("y11adv-piece-m3", "Evaluate $f(3)$ for the displayed function.", "f(x) = \\begin{cases} x^2-1 & x \\le 3 \\\\ 2x+5 & x > 3 \\end{cases}", "8", "x = 3 satisfies x ≤ 3, use x² − 1.", "f(3) = 3² − 1 = 9 − 1 = 8."),
        qa("y11adv-piece-m4", "Evaluate $f(5)$ for the displayed function.", "f(x) = \\begin{cases} x^2-1 & x \\le 3 \\\\ 2x+5 & x > 3 \\end{cases}", "15", "x = 5 > 3, use 2x + 5.", "f(5) = 2(5) + 5 = 10 + 5 = 15."),
        practicalChoice("y11adv-piece-m5", "The function $f(x) = x^2$ satisfies $f(-x) = x^2 = f(x)$ for all $x$. It is:", "B", ["Odd", "Even", "Neither", "Piecewise only"], "f(−x) = (−x)² = x² = f(x) for all x confirms the function is even."),
        practicalChoice("y11adv-piece-m6", "The constant function $f(x) = 3$ for all $x$ satisfies $f(-x) = ?$", "B", ["$-3$", "$3$", "$0$", "Undefined"], "f(−x) = 3 = f(x) for all x. The constant function is even."),
        qa("y11adv-piece-m7", "For $f(x) = \\begin{cases} x+4 & x < 1 \\\\ 2x+3 & x \\ge 1 \\end{cases}$, find the common boundary value (from each side at $x = 1$).", "\\lim_{x \\to 1^-}(x+4)=5,\\quad f(1)=2(1)+3=5", "5", "Evaluate each piece at x = 1 and compare.", "Left: 1 + 4 = 5. Right: 2(1) + 3 = 5. Both equal 5, so f is continuous at x = 1. The common value is 5."),
        practicalChoice("y11adv-piece-m8", "Which piecewise rule is equivalent to $|x|$?", "B", ["$f(x)=\\begin{cases} -x & x \\ge 0 \\\\ x & x < 0 \\end{cases}$", "$f(x)=\\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}$", "$f(x)=x$ for all $x$", "$f(x)=x^2$ for all $x$"], "|x| returns x for non-negative inputs and −x for negative inputs. This matches option B."),
        qa("y11adv-piece-m9", "Evaluate $f(-7)$ for $f(x) = \\begin{cases} x & x > 0 \\\\ -x & x < 0 \\\\ 0 & x = 0 \\end{cases}$.", "f(x) = |x|", "7", "x = −7 < 0, so f(−7) = −(−7).", "Since −7 < 0, use f(x) = −x: f(−7) = −(−7) = 7."),
        practicalChoice("y11adv-piece-m10", "The domain of $f(x) = \\begin{cases} 1/(x-2) & x > 3 \\\\ x+1 & x \\le 1 \\end{cases}$ is:", "C", ["All real numbers", "$x \\ne 2$", "$x > 3$ or $x \\le 1$", "$1 < x < 3$"], "The function is defined only where x > 3 or x ≤ 1. The interval (1, 3] is not covered by either piece."),
      ],
    };
  }

  if (lesson.slug === "quadratic-inequalities") {
    return {
      ...base,
      description:
        "Solve quadratic inequalities by factorising to find roots, then using the parabola's sign to determine where the expression is positive or negative.",
      learningIntention:
        "Use the graph of a quadratic to identify where it is positive or negative, and express the solution to a quadratic inequality using correct notation.",
      successCriteria: [
        "Find the roots of a quadratic expression by factorisation.",
        "State that an upward parabola is negative between its roots and positive outside them.",
        "Solve and express the solution to a quadratic inequality such as ax² + bx + c < 0 or > 0.",
        "Identify the integer solutions in the solution set of a quadratic inequality.",
      ],
      teaching: {
        paragraphs: [
          "A quadratic inequality asks: for which values of x is the quadratic expression positive, negative, zero, or a mixture? The key is first to find the roots of f(x), then read the sign from the parabola.",
          "For an upward-opening parabola y = (x − a)(x − b) with a < b: the parabola dips below the x-axis between the roots. So f(x) < 0 for a < x < b, and f(x) > 0 for x < a or x > b.",
          "To solve a quadratic inequality: (1) rearrange so one side is 0; (2) factorise to find the roots; (3) reason about the parabola sign; (4) write the solution. For ≤ or ≥, include the roots.",
          "Check by substituting a value inside the claimed solution set. If the value makes the inequality true, the solution is correct.",
        ],
        latexBlocks: [
          "(x-a)(x-b) < 0 \\Rightarrow a < x < b \\quad (\\text{between the roots})",
          "(x-a)(x-b) > 0 \\Rightarrow x < a \\text{ or } x > b \\quad (\\text{outside the roots})",
        ],
      },
      workedExamples: [
        {
          title: "Solve a quadratic inequality (< 0)",
          questionLatex: "\\text{Solve } x^2 - 5x + 6 < 0",
          steps: [
            { explanation: "Factorise to find the roots.", latex: "x^2-5x+6=(x-2)(x-3)" },
            { explanation: "Roots at x = 2 and x = 3.", latex: "x=2 \\text{ or } x=3" },
            { explanation: "Upward parabola is negative between its roots.", latex: "x^2-5x+6 < 0 \\text{ for } 2 < x < 3" },
          ],
          finalAnswerLatex: "2 < x < 3",
        },
        {
          title: "Solve a quadratic inequality (> 0)",
          questionLatex: "\\text{Solve } x^2 - 5x + 6 > 0",
          steps: [
            { explanation: "Same roots: x = 2 and x = 3.", latex: "(x-2)(x-3) > 0" },
            { explanation: "Upward parabola is positive outside its roots.", latex: "x < 2 \\text{ or } x > 3" },
          ],
          finalAnswerLatex: "x < 2 \\text{ or } x > 3",
        },
        {
          title: "Find integers in the solution set",
          questionLatex: "\\text{Find all integers satisfying } x^2 - 5x + 4 < 0",
          steps: [
            { explanation: "Factorise: roots at x = 1 and x = 4.", latex: "(x-1)(x-4) < 0" },
            { explanation: "Solution: 1 < x < 4.", latex: "1 < x < 4" },
            { explanation: "Integers strictly between 1 and 4.", latex: "x \\in \\{2,\\,3\\}" },
          ],
          finalAnswerLatex: "x \\in \\{2,\\,3\\}",
        },
      ],
      guidedPractice: [
        qa("y11adv-qi-g1", "Solve $x^2-5x+6=0$. Enter the smaller root.", "x^2-5x+6=(x-2)(x-3)=0", "2", "Factorise as (x−2)(x−3)=0.", "x²−5x+6=(x−2)(x−3). Roots: x=2 and x=3. Smaller = 2."),
        qa("y11adv-qi-g2", "Solve $x^2-5x+6=0$. Enter the larger root.", "x^2-5x+6=(x-2)(x-3)=0", "3", "Roots are x=2 and x=3.", "Larger root = 3."),
        practicalChoice("y11adv-qi-g3", "Which values of $x$ satisfy $x^2-5x+6<0$?", "B", ["$x<2$ or $x>3$", "$2<x<3$", "$x<3$", "$x>2$"], "The upward parabola is below zero between its roots. So the solution is 2 < x < 3.", "x^2-5x+6<0"),
        practicalChoice("y11adv-qi-g4", "Which values of $x$ satisfy $x^2-5x+6>0$?", "A", ["$x<2$ or $x>3$", "$2<x<3$", "$x>3$ only", "$x<2$ only"], "The upward parabola is above zero outside its roots. So the solution is x < 2 or x > 3.", "x^2-5x+6>0"),
      ],
      independentPractice: [
        qa("y11adv-qi-i1", "Solve $x^2-4x+3=0$. Enter the smaller root.", "x^2-4x+3=(x-1)(x-3)=0", "1", "Factorise: (x−1)(x−3)=0.", "x²−4x+3=(x−1)(x−3). Roots: 1 and 3. Smaller = 1."),
        qa("y11adv-qi-i2", "Solve $x^2-4x+3=0$. Enter the larger root.", "x^2-4x+3=(x-1)(x-3)=0", "3", "The roots are x=1 and x=3.", "Larger root = 3."),
        practicalChoice("y11adv-qi-i3", "Solve $(x-1)(x-3)<0$.", "B", ["$x<1$ or $x>3$", "$1<x<3$", "$x>1$", "$x<3$"], "Negative between the roots 1 and 3. Solution: 1 < x < 3.", "(x-1)(x-3)<0"),
        practicalChoice("y11adv-qi-i4", "Solve $x(x-4)\\geq 0$.", "D", ["$0\\leq x\\leq 4$", "$x>4$", "$0<x<4$", "$x\\leq 0$ or $x\\geq 4$"], "Roots at 0 and 4. The upward parabola is non-negative on or outside the roots: x ≤ 0 or x ≥ 4.", "x(x-4)\\geq 0"),
        qa("y11adv-qi-i5", "Find the largest integer satisfying $x^2-5x+4<0$.", "(x-1)(x-4)<0 \\Rightarrow 1<x<4", "3", "Solution is 1 < x < 4. Integers strictly inside: 2 and 3.", "1 < x < 4. Integers: 2 and 3. Largest = 3."),
      ],
      commonMistakes: [
        { mistake: "Writing x < 2 or x < 3 instead of 2 < x < 3 for (x−2)(x−3) < 0.", fix: "The parabola is negative between the roots, not to the left of both. The correct solution is 2 < x < 3." },
        { mistake: "Forgetting to rearrange so one side is zero before factorising.", fix: "Always rewrite as f(x) > 0 or f(x) < 0 first. For example, x² > 3x becomes x²−3x > 0 = x(x−3) > 0." },
        { mistake: "Reversing the direction — writing outside the roots when the expression should be negative.", fix: "Draw a quick sketch. The upward parabola is below zero between the roots (for < 0) and above zero outside them (for > 0)." },
        { mistake: "Including endpoints when strict inequality (< or >) is used.", fix: "Strict inequalities exclude roots. Non-strict (≤ ≥) include them. Always check the inequality symbol." },
      ],
      masteryQuiz: [
        qa("y11adv-qi-m1", "Solve $x^2+x-6=0$. Enter the smaller root.", "x^2+x-6=(x+3)(x-2)=0", "-3", "Factorise: (x+3)(x−2)=0. Roots: −3 and 2.", "Smaller root = −3.", ["-3", "−3"]),
        qa("y11adv-qi-m2", "Solve $x^2+x-6=0$. Enter the larger root.", "x^2+x-6=(x+3)(x-2)=0", "2", "Roots are −3 and 2.", "Larger root = 2."),
        practicalChoice("y11adv-qi-m3", "Solve $(x+3)(x-2)>0$.", "A", ["$x<-3$ or $x>2$", "$-3<x<2$", "$x>2$", "$x<-3$"], "Positive outside the roots at −3 and 2. Solution: x < −3 or x > 2.", "(x+3)(x-2)>0"),
        practicalChoice("y11adv-qi-m4", "Solve $x^2+x-6<0$.", "B", ["$x<-3$ or $x>2$", "$-3<x<2$", "$x>-3$", "$x<2$"], "Negative between the roots at −3 and 2. Solution: −3 < x < 2.", "x^2+x-6<0"),
        qa("y11adv-qi-m5", "Solve $x^2-9=0$. Enter the smaller root.", "x^2-9=(x-3)(x+3)=0", "-3", "Difference of two squares: (x−3)(x+3)=0. Roots: 3 and −3.", "Smaller root = −3.", ["-3", "−3"]),
        practicalChoice("y11adv-qi-m6", "Solve $x^2\\leq 9$.", "C", ["$x\\leq 3$", "$x\\geq -3$", "$-3\\leq x\\leq 3$", "$x\\leq -3$ or $x\\geq 3$"], "x²−9≤0. Roots ±3. Non-strict inequality: between and including roots → −3 ≤ x ≤ 3.", "x^2\\leq 9"),
        qa("y11adv-qi-m7", "Solve $x^2-7x+6=0$. Enter the larger root.", "x^2-7x+6=(x-1)(x-6)=0", "6", "Factorise: (x−1)(x−6)=0. Roots 1 and 6.", "Larger root = 6."),
        practicalChoice("y11adv-qi-m8", "Solve $(x-2)^2>0$.", "B", ["All real $x$", "$x\\neq 2$", "$x>2$", "$x<2$"], "(x−2)²=0 only at x=2 and is positive everywhere else. Solution: all x except x=2.", "(x-2)^2>0"),
        practicalChoice("y11adv-qi-m9", "Solve $x^2+2x\\leq 0$.", "D", ["$x\\leq 0$", "$x\\geq -2$", "$x\\leq -2$ or $x\\geq 0$", "$-2\\leq x\\leq 0$"], "x(x+2)≤0. Roots 0 and −2. Non-strict, between and including: −2 ≤ x ≤ 0.", "x^2+2x\\leq 0"),
        qa("y11adv-qi-m10", "Find the largest integer satisfying $x^2-7x+6\\leq 0$.", "(x-1)(x-6)\\leq 0 \\Rightarrow 1\\leq x\\leq 6", "6", "Solution is 1 ≤ x ≤ 6. Largest integer = 6.", "1 ≤ x ≤ 6. Integers: 1, 2, 3, 4, 5, 6. Largest = 6."),
      ],
      multiPartPractice: [
        {
          id: "y11adv-qi-mp1",
          prompt: "Let $f(x) = x^2 - 7x + 10$.",
          latex: "f(x) = x^2 - 7x + 10",
          answer: "2",
          hint: "Factorise f(x) to find the roots, then use the parabola sign for the inequality. Check f(3) to verify.",
          explanation: "(a) Smaller root = 2. (b) Larger root = 5. (c) f(3) = 9−21+10 = −2, confirming 3 is in the solution 2 < x < 5.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the smaller root of $f(x)=0$.", marks: 2, answer: "2", hint: "Factorise: (x−2)(x−5)=0.", explanation: "x²−7x+10=(x−2)(x−5). Roots: 2 and 5. Smaller = 2." },
            { key: "b", label: "(b)", prompt: "Find the larger root of $f(x)=0$.", marks: 1, answer: "5", hint: "The other factor gives x=5.", explanation: "Larger root = 5." },
            { key: "c", label: "(c)", prompt: "Evaluate $f(3)$.", marks: 1, answer: "-2", acceptedAnswers: ["-2", "−2"], hint: "Substitute x=3: f(3)=9−21+10.", explanation: "f(3)=9−21+10=−2. Since f(3)<0 and 2<3<5, this confirms the solution to f(x)<0 is 2<x<5." },
          ],
        },
        {
          id: "y11adv-qi-mp2",
          prompt: "Let $g(x) = x^2 - 2x - 3$.",
          latex: "g(x) = x^2 - 2x - 3",
          answer: "-1",
          hint: "Factorise g(x). The roots tell you where the parabola crosses zero. Then read the parabola sign.",
          explanation: "(a) Smaller root = −1. (b) Larger root = 3. (c) g(1) = 1−2−3 = −4, confirming 1 is in the solution −1 < x < 3.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the smaller root of $g(x)=0$.", marks: 2, answer: "-1", acceptedAnswers: ["-1", "−1"], hint: "Factorise: (x−3)(x+1)=0.", explanation: "g(x)=(x−3)(x+1). Roots: −1 and 3. Smaller = −1." },
            { key: "b", label: "(b)", prompt: "Find the larger root of $g(x)=0$.", marks: 1, answer: "3", hint: "x−3=0 gives x=3.", explanation: "Larger root = 3." },
            { key: "c", label: "(c)", prompt: "Evaluate $g(1)$.", marks: 1, answer: "-4", acceptedAnswers: ["-4", "−4"], hint: "Substitute x=1: g(1)=1−2−3.", explanation: "g(1)=1−2−3=−4. Since g(1)<0 and −1<1<3, this confirms the solution to g(x)<0 is −1<x<3." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "composite-functions") {
    return {
      ...base,
      description:
        "Form and evaluate composite functions f∘g; distinguish f(g(x)) from g(f(x)); find the domain of a composite function.",
      learningIntention:
        "Apply and interpret composite function notation, evaluate composites step by step, and determine when composition is defined.",
      successCriteria: [
        "Evaluate (f∘g)(a) by first computing g(a) then applying f to the result.",
        "Distinguish (f∘g)(x) from (g∘f)(x) and give an example where they differ.",
        "Write the rule for (f∘g)(x) as an algebraic expression.",
        "State the domain of f∘g by identifying which inputs are valid for both g and then f.",
      ],
      teaching: {
        paragraphs: [
          "A composite function applies two functions in sequence. The notation (f∘g)(x) — read as 'f of g of x' — means: substitute x into g first, then substitute the result into f. The right-hand function always goes first.",
          "To evaluate (f∘g)(2): find g(2) to get a number, then put that number into f. For example, if g(2) = 5 and f(5) = 13, then (f∘g)(2) = 13. Never apply f first — that gives (g∘f) instead.",
          "To write the algebraic rule for (f∘g)(x), substitute the entire expression g(x) in place of every x in the formula for f. For example, if f(x) = x² + 1 and g(x) = 2x − 3, then (f∘g)(x) = (2x − 3)² + 1 = 4x² − 12x + 10.",
          "The domain of f∘g is more restrictive than either function alone: the input x must be valid for g, and the output g(x) must also be valid for f. For example, if f(x) = √x and g(x) = x − 4, then f∘g requires x − 4 ≥ 0, giving domain x ≥ 4.",
        ],
        latexBlocks: [
          "(f \\circ g)(x) = f(g(x)) \\quad \\text{— apply } g \\text{ first, then } f",
          "\\text{Domain of } f \\circ g: \\{x \\in \\operatorname{dom}(g) : g(x) \\in \\operatorname{dom}(f)\\}",
          "f \\circ g \\neq g \\circ f \\text{ in general}",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a composite function from given values",
          questionLatex: "g(1)=2,\\quad f(2)=5.\\quad \\text{Find }(f\\circ g)(1).",
          steps: [
            {
              explanation: "Apply g first: substitute x = 1 into g.",
              latex: "g(1) = 2",
            },
            {
              explanation: "Use the output of g as the input to f.",
              latex: "f(g(1)) = f(2) = 5",
            },
          ],
          finalAnswerLatex: "(f\\circ g)(1) = 5",
        },
        {
          title: "Write the algebraic rule for a composite function",
          questionLatex: "f(x)=x^2+1,\\quad g(x)=2x-3.\\quad \\text{Find }(f\\circ g)(x).",
          steps: [
            {
              explanation: "Replace every x in f(x) with the expression g(x) = 2x − 3.",
              latex: "(f\\circ g)(x) = (2x-3)^2 + 1",
            },
            {
              explanation: "Expand (2x − 3)² = 4x² − 12x + 9, then add 1.",
              latex: "4x^2 - 12x + 9 + 1 = 4x^2 - 12x + 10",
            },
          ],
          finalAnswerLatex: "(f\\circ g)(x) = 4x^2 - 12x + 10",
        },
        {
          title: "Show that f∘g ≠ g∘f",
          questionLatex: "f(x)=x+2,\\quad g(x)=3x.\\quad \\text{Find }(f\\circ g)(x)\\text{ and }(g\\circ f)(x).",
          steps: [
            {
              explanation: "For (f∘g)(x): apply g first, then f.",
              latex: "(f\\circ g)(x) = f(3x) = 3x + 2",
            },
            {
              explanation: "For (g∘f)(x): apply f first, then g.",
              latex: "(g\\circ f)(x) = g(x+2) = 3(x+2) = 3x + 6",
            },
            {
              explanation: "The two expressions differ, confirming f∘g ≠ g∘f.",
            },
          ],
          finalAnswerLatex: "(f\\circ g)(x)=3x+2\\neq (g\\circ f)(x)=3x+6",
        },
      ],
      guidedPractice: [
        qa("y11adv-comp-g1", "Evaluate the inner function first. $f(x)=x^2+1$, $g(x)=2x-3$. Find $g(2)$.", "g(2) = 2(2)-3", "1", "Substitute x = 2 into g(x) = 2x − 3.", "g(2) = 2(2) − 3 = 4 − 3 = 1."),
        qa("y11adv-comp-g2", "Now find $(f\\circ g)(2)$ using $g(2)=1$ and $f(x)=x^2+1$.", "f(g(2)) = f(1) = 1^2+1", "2", "Substitute x = 1 into f(x) = x² + 1.", "f(1) = 1² + 1 = 2. So (f∘g)(2) = 2."),
        practicalChoice("y11adv-comp-g3", "The notation $(f\\circ g)(x)$ means:", "C", ["Apply $f$ first, then $g$", "Multiply $f(x)$ and $g(x)$", "Apply $g$ first, then $f$", "Add $f(x)$ and $g(x)$"], "f∘g means f of g of x — the right-hand function g is applied first, then f is applied to the result."),
        qa("y11adv-comp-g4", "$f(x)=2x+5$, $g(x)=x-3$. Evaluate $(f\\circ g)(4)$.", "g(4)=1,\\quad f(1)=2(1)+5", "7", "g(4) = 4 − 3 = 1. Then f(1) = 2(1) + 5.", "g(4) = 1. f(g(4)) = f(1) = 2 + 5 = 7."),
      ],
      independentPractice: [
        qa("y11adv-comp-i1", "$f(x)=x^2$, $g(x)=x+1$. Evaluate $(f\\circ g)(3)$.", "g(3)=4,\\quad f(4)=4^2", "16", "g(3) = 4, then f(4) = 4².", "g(3) = 4. f(4) = 16. So (f∘g)(3) = 16."),
        qa("y11adv-comp-i2", "$f(x)=x^2$, $g(x)=x+1$. Evaluate $(g\\circ f)(3)$.", "f(3)=9,\\quad g(9)=9+1", "10", "f(3) = 9, then g(9) = 9 + 1.", "f(3) = 9. g(9) = 10. So (g∘f)(3) = 10."),
        practicalChoice("y11adv-comp-i3", "$f(x)=x^2$, $g(x)=x+1$. From your answers above, $(f\\circ g)(3)=16$ and $(g\\circ f)(3)=10$. What does this show?", "B", ["$f\\circ g$ always equals $g\\circ f$", "Composition is generally not commutative — order matters", "Composite functions always give equal results", "The inner function always gives a larger output"], "The two compositions give different values (16 ≠ 10), confirming that order matters in composition."),
        qa("y11adv-comp-i4", "$f(x)=3x-1$, $g(x)=x^2$. Evaluate $(f\\circ g)(2)$.", "g(2)=4,\\quad f(4)=3(4)-1", "11", "g(2) = 4, then f(4) = 12 − 1.", "g(2) = 4. f(4) = 3(4) − 1 = 11."),
        qa("y11adv-comp-i5", "$f(x)=\\sqrt{x}$, $g(x)=x-4$. What is the minimum $x$-value in the domain of $f\\circ g$?", "x - 4 \\ge 0 \\Rightarrow x \\ge 4", "4", "For f(g(x)) = √(x−4) to be defined, x − 4 ≥ 0.", "f∘g = √(x−4). The square root requires x − 4 ≥ 0, so x ≥ 4. Minimum x is 4."),
      ],
      commonMistakes: [
        { mistake: "Evaluating f first and then g when computing (f∘g)(x).", fix: "For (f∘g)(x), always apply g first (the right-hand function). Then apply f to the output." },
        { mistake: "Confusing (f∘g)(x) with f(x) × g(x).", fix: "The ∘ symbol means composition — substituting g(x) into f — not multiplication." },
        { mistake: "Assuming (f∘g)(x) always equals (g∘f)(x).", fix: "Composition is generally not commutative. Always check both orders if asked." },
        { mistake: "Ignoring domain restrictions when composing functions.", fix: "The domain of f∘g requires x to be valid for g AND g(x) to be valid for f. Check both conditions." },
      ],
      masteryQuiz: [
        qa("y11adv-comp-m1", "$f(x)=x+3$, $g(x)=2x$. Evaluate $(f\\circ g)(5)$.", "g(5)=10,\\quad f(10)=10+3", "13", "g(5) = 10, then f(10) = 13.", "g(5) = 10. f(10) = 13."),
        qa("y11adv-comp-m2", "$f(x)=x+3$, $g(x)=2x$. Evaluate $(g\\circ f)(5)$.", "f(5)=8,\\quad g(8)=2(8)", "16", "f(5) = 8, then g(8) = 16.", "f(5) = 8. g(8) = 16."),
        practicalChoice("y11adv-comp-m3", "Is it always true that $(f\\circ g)(x) = (g\\circ f)(x)$?", "B", ["Yes — composition is commutative", "No — the two orders generally differ", "Yes — only when both functions are linear", "No — only when one function is a constant"], "Composition is not commutative in general. (f∘g)(5) = 13 ≠ 16 = (g∘f)(5) for the functions above."),
        qa("y11adv-comp-m4", "$f(x)=x^2-1$, $g(x)=x+2$. Evaluate $(f\\circ g)(1)$.", "g(1)=3,\\quad f(3)=9-1", "8", "g(1) = 3, then f(3) = 9 − 1.", "g(1) = 3. f(3) = 8."),
        qa("y11adv-comp-m5", "$f(x)=x^2-1$, $g(x)=x+2$. Evaluate $(g\\circ f)(1)$.", "f(1)=0,\\quad g(0)=0+2", "2", "f(1) = 0, then g(0) = 2.", "f(1) = 0. g(0) = 2."),
        qa("y11adv-comp-m6", "$f(x)=2x$, $g(x)=x+4$. Write $(f\\circ g)(x)$ in simplest form. Enter the constant term.", "f(g(x)) = 2(x+4) = 2x+8", "8", "f(x+4) = 2(x+4) = 2x + 8. Constant term is 8.", "(f∘g)(x) = 2(x+4) = 2x + 8. The constant term is 8."),
        qa("y11adv-comp-m7", "$f(x)=x^2$, $g(x)=3x$. Write $(g\\circ f)(x)$ in simplest form. Enter the coefficient of $x^2$.", "g(f(x)) = 3x^2", "3", "g(x²) = 3x². The coefficient is 3.", "(g∘f)(x) = g(x²) = 3x². Coefficient of x² is 3."),
        practicalChoice("y11adv-comp-m8", "$f(x)=\\frac{1}{x}$, $g(x)=x-1$. The domain of $f\\circ g$ excludes which value?", "B", ["$x=0$", "$x=1$", "$x=-1$", "$x=2$"], "f(g(x)) = 1/(x−1). The denominator is zero when x − 1 = 0, i.e. x = 1. So x = 1 is excluded."),
        qa("y11adv-comp-m9", "$f(x)=\\sqrt{x}$, $g(x)=4-x$. What is the largest $x$-value in the domain of $f\\circ g$?", "4-x \\ge 0 \\Rightarrow x \\le 4", "4", "Need 4 − x ≥ 0, so x ≤ 4. Largest x is 4.", "f∘g = √(4−x). Need 4 − x ≥ 0 → x ≤ 4. Largest x-value is 4."),
        qa("y11adv-comp-m10", "$f(x)=x+2$, $g(x)=x-2$. Find the constant term of $(f\\circ g)(x)$.", "f(g(x)) = f(x-2) = (x-2)+2 = x", "0", "f(x−2) = (x−2) + 2 = x. Constant term is 0.", "(f∘g)(x) = (x−2) + 2 = x. The constant term is 0."),
      ],
      multiPartPractice: [
        {
          id: "y11adv-comp-mp1",
          prompt: "Let $f(x) = x^2 + 1$ and $g(x) = 2x - 3$.",
          latex: "f(x) = x^2 + 1, \\quad g(x) = 2x - 3",
          answer: "10",
          hint: "For (a): substitute g(x) into f and expand. For (b): substitute x = 2 step by step. For (c): substitute x = 2 into g first.",
          explanation: "(a) (f∘g)(x) = (2x−3)² + 1 = 4x² − 12x + 10. Constant = 10. (b) g(2) = 1, f(1) = 2. (c) f(2) = 5, g(5) = 7.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the constant term of $(f\\circ g)(x)$ when fully expanded.",
              marks: 2,
              answer: "10",
              hint: "Substitute g(x) = 2x − 3 for x in f(x) = x² + 1, then expand.",
              explanation: "(f∘g)(x) = (2x−3)² + 1 = 4x² − 12x + 9 + 1 = 4x² − 12x + 10. Constant term = 10.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Evaluate $(f\\circ g)(2)$.",
              marks: 1,
              answer: "2",
              hint: "g(2) = 1. Then find f(1).",
              explanation: "g(2) = 2(2) − 3 = 1. f(1) = 1² + 1 = 2.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Evaluate $(g\\circ f)(2)$.",
              marks: 1,
              answer: "7",
              hint: "f(2) = 5. Then find g(5).",
              explanation: "f(2) = 4 + 1 = 5. g(5) = 2(5) − 3 = 7.",
            },
          ],
        },
        {
          id: "y11adv-comp-mp2",
          prompt: "Let $f(x) = \\sqrt{x}$ and $g(x) = x - 9$.",
          latex: "f(x) = \\sqrt{x}, \\quad g(x) = x - 9",
          answer: "9",
          hint: "For (a): the square root requires x − 9 ≥ 0. For (b) and (c): substitute the x-value and simplify.",
          explanation: "(a) Domain: x ≥ 9. (b) (f∘g)(25) = √16 = 4. (c) (f∘g)(13) = √4 = 2.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the minimum $x$-value in the domain of $f\\circ g$.",
              marks: 1,
              answer: "9",
              hint: "For f(g(x)) = √(x−9) to be defined, x − 9 must be non-negative.",
              explanation: "x − 9 ≥ 0 → x ≥ 9. Minimum x-value is 9.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Evaluate $(f\\circ g)(25)$.",
              marks: 1,
              answer: "4",
              hint: "g(25) = 16. Then find √16.",
              explanation: "g(25) = 16. f(16) = √16 = 4.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Evaluate $(f\\circ g)(13)$.",
              marks: 1,
              answer: "2",
              hint: "g(13) = 4. Then find √4.",
              explanation: "g(13) = 4. f(4) = √4 = 2.",
            },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "completing-the-square") {
    return {
      ...base,
      description:
        "Rewrite quadratics in vertex form a(x − h)² + k; identify vertex and axis of symmetry; solve quadratic equations by completing the square.",
      learningIntention:
        "Complete the square to write any quadratic in vertex form and use this form to identify key features and solve equations.",
      successCriteria: [
        "Complete the square for x² + bx + c to write it as (x + h)² + k.",
        "Complete the square for ax² + bx + c with a ≠ 1 by first factoring out a.",
        "Read the vertex (h, k) and axis of symmetry x = h directly from vertex form.",
        "Solve a quadratic equation using the completed-square form.",
      ],
      teaching: {
        paragraphs: [
          "Any quadratic ax² + bx + c can be rewritten in vertex form a(x − h)² + k. This form is useful because the vertex (h, k) and axis of symmetry x = h are immediately visible — no differentiation needed.",
          "The key step is to complete the square. For x² + bx, add and subtract (b/2)² to create a perfect square trinomial: x² + bx = (x + b/2)² − (b/2)². For example, x² + 6x = (x + 3)² − 9.",
          "When a ≠ 1, factor out a from the first two terms before completing the square. For 2x² − 8x + 3: factor to get 2(x² − 4x) + 3. Complete the square inside the bracket: 2[(x−2)² − 4] + 3 = 2(x−2)² − 5.",
          "To solve a quadratic by completing the square: write it in the form (x − h)² = c, then take the square root of both sides: x − h = ±√c, giving x = h ± √c. This method always works, even when the quadratic does not factorise over the integers.",
        ],
        latexBlocks: [
          "x^2 + bx = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2",
          "ax^2 + bx + c = a(x-h)^2 + k, \\quad h = -\\frac{b}{2a}, \\quad k = c - \\frac{b^2}{4a}",
          "\\text{Vertex: }(h,\\,k), \\quad \\text{Axis of symmetry: } x = h",
        ],
      },
      workedExamples: [
        {
          title: "Complete the square for a monic quadratic",
          questionLatex: "\\text{Write } x^2 + 6x + 5 \\text{ in the form }(x+h)^2 + k.",
          steps: [
            {
              explanation: "Take half the coefficient of x: (6/2)² = 9. Add and subtract 9.",
              latex: "x^2 + 6x + 5 = (x^2 + 6x + 9) - 9 + 5",
            },
            {
              explanation: "The trinomial x² + 6x + 9 is the perfect square (x+3)².",
              latex: "(x+3)^2 - 4",
            },
          ],
          finalAnswerLatex: "(x+3)^2 - 4, \\quad \\text{vertex }(-3,\\,-4)",
        },
        {
          title: "Complete the square when a ≠ 1",
          questionLatex: "\\text{Write } 2x^2 - 8x + 3 \\text{ in the form }a(x-h)^2 + k.",
          steps: [
            {
              explanation: "Factor 2 from the first two terms.",
              latex: "2(x^2 - 4x) + 3",
            },
            {
              explanation: "Complete the square inside the bracket: (4/2)² = 4.",
              latex: "2[(x-2)^2 - 4] + 3",
            },
            {
              explanation: "Expand the factor of 2 and simplify.",
              latex: "2(x-2)^2 - 8 + 3 = 2(x-2)^2 - 5",
            },
          ],
          finalAnswerLatex: "2(x-2)^2 - 5, \\quad \\text{vertex }(2,\\,-5)",
        },
        {
          title: "Solve a quadratic by completing the square",
          questionLatex: "\\text{Solve } x^2 + 4x - 3 = 0",
          steps: [
            {
              explanation: "Complete the square: (4/2)² = 4. Add and subtract 4.",
              latex: "(x+2)^2 - 4 - 3 = 0",
            },
            {
              explanation: "Isolate the perfect square.",
              latex: "(x+2)^2 = 7",
            },
            {
              explanation: "Take the square root of both sides.",
              latex: "x + 2 = \\pm\\sqrt{7}",
            },
            {
              explanation: "Solve for x.",
              latex: "x = -2 \\pm \\sqrt{7}",
            },
          ],
          finalAnswerLatex: "x = -2 + \\sqrt{7} \\quad \\text{or} \\quad x = -2 - \\sqrt{7}",
        },
      ],
      guidedPractice: [
        qa("y11adv-cts-g1", "Complete the square for $x^2 + 4x + 1$. Find $k$ in $(x+2)^2 + k$.", "x^2 + 4x + 1 = (x+2)^2 + k", "-3", "Expand (x+2)² = x² + 4x + 4. Then k = 1 − 4.", "(x+2)² = x² + 4x + 4. So k = 1 − 4 = −3.", ["-3", "−3"]),
        qa("y11adv-cts-g2", "For $x^2 - 10x + 20 = (x-h)^2 + k$, find $h$.", "x^2 - 10x + 20 = (x-h)^2 + k", "5", "h = half the coefficient of x (with sign): −10/2 = −5, so h = 5.", "Half of −10 is −5, so we write (x−5)². Here h = 5."),
        practicalChoice("y11adv-cts-g3", "The vertex form $a(x-h)^2 + k$ directly reveals which features?", "C", ["The x-intercepts", "The y-intercept only", "The vertex and axis of symmetry", "The leading coefficient only"], "Reading off h and k gives the vertex (h, k) and axis x = h without any further calculation."),
        qa("y11adv-cts-g4", "Find the x-coordinate of the vertex of $f(x) = x^2 + 4x - 3$.", "f(x) = (x+2)^2 - 7,\\quad \\text{vertex at }x=?", "-2", "Complete the square: (x+2)² − 7. Vertex x-coordinate is −2.", "f(x) = (x+2)² − 4 − 3 = (x+2)² − 7. Vertex is (−2, −7). x-coordinate = −2.", ["-2", "−2"]),
      ],
      independentPractice: [
        qa("y11adv-cts-i1", "Find $k$ for $x^2 + 2x + 5 = (x+1)^2 + k$.", "x^2 + 2x + 5 = (x+1)^2 + k", "4", "Expand (x+1)² = x²+2x+1. Then k = 5 − 1.", "k = 5 − 1 = 4."),
        qa("y11adv-cts-i2", "Find the y-coordinate of the vertex of $f(x) = x^2 - 6x + 2$.", "f(x) = (x-3)^2 - 9 + 2 = (x-3)^2 - 7", "-7", "Complete the square: (x−3)² − 7. Vertex y-coordinate is −7.", "f(x) = (x−3)² − 9 + 2 = (x−3)² − 7. Vertex y-coordinate = −7.", ["-7", "−7"]),
        qa("y11adv-cts-i3", "Solve $x^2 + 2x - 8 = 0$ by completing the square. Enter the positive root.", "(x+1)^2 = 9,\\quad x = -1 \\pm 3", "2", "(x+1)² − 1 − 8 = 0 → (x+1)² = 9 → x = −1 ± 3.", "(x+1)² = 9 → x = −1 + 3 = 2 or x = −1 − 3 = −4. Positive root = 2."),
        practicalChoice("y11adv-cts-i4", "The axis of symmetry of $f(x) = a(x-h)^2 + k$ is:", "A", ["$x = h$", "$x = k$", "$x = -h$", "$x = -k$"], "The axis of symmetry is the vertical line through the vertex. The vertex is (h, k), so the axis is x = h."),
        qa("y11adv-cts-i5", "Find $k$ for $3x^2 - 12x + 7 = 3(x-2)^2 + k$.", "3(x-2)^2 = 3x^2-12x+12,\\quad k=7-12", "-5", "3(x−2)² = 3x² − 12x + 12. So k = 7 − 12.", "3(x−2)² = 3x² − 12x + 12. k = 7 − 12 = −5.", ["-5", "−5"]),
      ],
      commonMistakes: [
        { mistake: "Adding (b/2)² without subtracting it, changing the value of the expression.", fix: "Always add and subtract (b/2)² — or equivalently, complete the square and then adjust the constant to compensate." },
        { mistake: "Reading h as positive when the vertex form is (x + h)² + k, giving the wrong vertex sign.", fix: "The form is (x − h)², so if you see (x + 3)², that means x − (−3)², giving vertex x = −3, not x = 3." },
        { mistake: "Forgetting to multiply (b/2)² by a when a ≠ 1.", fix: "When factoring out a before completing the square, the adjustment inside the bracket is then multiplied by a when redistributed: a[(x−h)² − c] = a(x−h)² − ac." },
        { mistake: "Only taking the positive square root when solving (x−h)² = c.", fix: "Taking the square root gives ±√c. Both solutions must be considered: x = h + √c and x = h − √c." },
      ],
      masteryQuiz: [
        qa("y11adv-cts-m1", "Find $k$ for $x^2 + 8x + 7 = (x+4)^2 + k$.", "x^2+8x+7=(x+4)^2+k", "-9", "Expand (x+4)² = x²+8x+16. k = 7 − 16.", "k = 7 − 16 = −9.", ["-9", "−9"]),
        qa("y11adv-cts-m2", "State the x-coordinate of the vertex of $f(x) = (x-5)^2 + 3$.", "f(x)=(x-5)^2+3,\\quad \\text{vertex at }(h,k)", "5", "Read h directly: (x − h)² with h = 5.", "Vertex form (x−5)² + 3: h = 5, k = 3. Vertex x-coordinate = 5."),
        qa("y11adv-cts-m3", "Solve $x^2 - 6x - 7 = 0$ by completing the square. Enter the larger root.", "(x-3)^2 = 16,\\quad x = 3 \\pm 4", "7", "(x−3)² − 9 − 7 = 0 → (x−3)² = 16 → x = 7 or x = −1.", "(x−3)² = 16 → x = 3 + 4 = 7 or x = 3 − 4 = −1. Larger root = 7."),
        practicalChoice("y11adv-cts-m4", "In the form $a(x-h)^2 + k$ with $a < 0$, the parabola:", "B", ["Opens upward (minimum at vertex)", "Opens downward (maximum at vertex)", "Has no vertex", "Has two axes of symmetry"], "When a < 0 the squared term is always ≤ 0, so the vertex gives the maximum value of f."),
        qa("y11adv-cts-m5", "Find $k$ for $2x^2 + 4x + 9 = 2(x+1)^2 + k$.", "2(x+1)^2 = 2x^2+4x+2,\\quad k=9-2", "7", "2(x+1)² = 2x²+4x+2. k = 9 − 2.", "k = 9 − 2 = 7."),
        qa("y11adv-cts-m6", "Find the y-coordinate of the vertex of $f(x) = 3x^2 - 6x + 1$.", "3x^2-6x+1=3(x-1)^2-2,\\quad \\text{vertex }y=?", "-2", "3(x−1)² = 3x²−6x+3. k = 1 − 3 = −2.", "3x²−6x+1 = 3(x−1)² − 3 + 1 = 3(x−1)² − 2. Vertex y-coordinate = −2.", ["-2", "−2"]),
        practicalChoice("y11adv-cts-m7", "Which method is guaranteed to solve any quadratic equation?", "C", ["Factorisation over the integers", "Inspection only", "Completing the square", "Using the axis of symmetry only"], "Completing the square always works because every quadratic can be written in vertex form, and then (x−h)² = c can always be solved (with real solutions when c ≥ 0)."),
        qa("y11adv-cts-m8", "Solve $y = (x-3)^2 - 16 = 0$. Enter the smaller root.", "(x-3)^2=16,\\quad x=3\\pm 4", "-1", "(x−3) = ±4 → x = 7 or x = −1. Smaller root = −1.", "x = 3 − 4 = −1 or x = 3 + 4 = 7. Smaller root = −1.", ["-1", "−1"]),
        qa("y11adv-cts-m9", "Find $h$ for $4x^2 - 24x + 11 = 4(x-h)^2 + k$.", "h = \\frac{24}{2 \\times 4} = 3", "3", "h = coefficient of x ÷ (2a) = 24 ÷ 8 = 3.", "Factoring: 4(x² − 6x) + 11. Half of −6 is −3, so (x−3)². h = 3."),
        practicalChoice("y11adv-cts-m10", "The vertex form $a(x-h)^2 + k$ is useful for graphing because:", "A", ["It gives the vertex and axis of symmetry directly without calculus", "It shows the x-intercepts directly", "It always has integer coefficients", "It is the only form that shows the y-intercept"], "Reading (h, k) from vertex form gives the vertex and therefore the axis of symmetry — all without differentiation."),
      ],
      multiPartPractice: [
        {
          id: "y11adv-cts-mp1",
          prompt: "Let $f(x) = x^2 + 6x + 5$.",
          latex: "f(x) = x^2 + 6x + 5",
          answer: "-4",
          hint: "Complete the square by adding and subtracting (6/2)² = 9. The vertex is at (−3, −4). For (c), set f(x) = 0 and use the vertex form.",
          explanation: "(a) k = 5 − 9 = −4. (b) Vertex x = −3. (c) (x+3)² = 4 → x = −3 ± 2, roots −1 and −5. Larger = −1.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Complete the square to write $f(x) = (x+3)^2 + k$. Find $k$.",
              latex: "f(x) = (x+3)^2 + k",
              marks: 2,
              answer: "-4",
              acceptedAnswers: ["-4", "−4"],
              hint: "Expand (x+3)² = x²+6x+9. Then k = 5 − 9.",
              explanation: "(x+3)² = x²+6x+9. So f(x) = (x+3)² − 9 + 5 = (x+3)² − 4. k = −4.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the x-coordinate of the vertex.",
              marks: 1,
              answer: "-3",
              acceptedAnswers: ["-3", "−3"],
              hint: "The vertex is at (h, k) where the form is (x − h)².",
              explanation: "f(x) = (x+3)² − 4 = (x−(−3))² − 4. Vertex x = −3.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Solve $f(x) = 0$ using the completed-square form. Enter the larger root.",
              marks: 2,
              answer: "-1",
              acceptedAnswers: ["-1", "−1"],
              hint: "(x+3)² = 4 → x + 3 = ±2.",
              explanation: "(x+3)² − 4 = 0 → (x+3)² = 4 → x = −3 ± 2. Roots: −1 and −5. Larger = −1.",
            },
          ],
        },
        {
          id: "y11adv-cts-mp2",
          prompt: "Let $g(x) = 2x^2 - 8x + 3$.",
          latex: "g(x) = 2x^2 - 8x + 3",
          answer: "2",
          hint: "Factor 2 from the first two terms. Complete the square inside the bracket. For (c), look at the sign of a.",
          explanation: "(a) h = 2 (since 8/(2×2) = 2). (b) 2(x−2)² = 2x²−8x+8, so k = 3 − 8 = −5. (c) a = 2 > 0, so minimum.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Write $g(x) = 2(x-h)^2 + k$. Find $h$.",
              marks: 1,
              answer: "2",
              hint: "Factor out 2: g(x) = 2(x² − 4x) + 3. Half of 4 is 2.",
              explanation: "2(x² − 4x) + 3 = 2[(x−2)² − 4] + 3. So h = 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find $k$.",
              marks: 2,
              answer: "-5",
              acceptedAnswers: ["-5", "−5"],
              hint: "Expand 2[(x−2)² − 4] = 2(x−2)² − 8. Then add 3.",
              explanation: "g(x) = 2(x−2)² − 8 + 3 = 2(x−2)² − 5. k = −5.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Does the vertex give a minimum or maximum value of $g(x)$?",
              marks: 1,
              answer: "minimum",
              acceptedAnswers: ["minimum", "min"],
              hint: "Look at the sign of a in a(x−h)² + k.",
              explanation: "a = 2 > 0, so the parabola opens upward and the vertex is a minimum.",
            },
          ],
        },
      ],
    };
  }

  return null;
}

