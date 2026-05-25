import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer } from "../questionHelpers";
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

  return null;
}

