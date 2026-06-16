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
  syllabusArea: "Functions",
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

const inverseExamples: WorkedExample[] = [
  {
    title: "Find a linear inverse",
    questionLatex: "f(x)=3x-5",
    steps: [
      { explanation: "Write y in place of f(x).", latex: "y=3x-5" },
      { explanation: "Swap x and y, then solve for y.", latex: "x=3y-5" },
      { explanation: "Isolate y.", latex: "y=\\frac{x+5}{3}" },
    ],
    finalAnswerLatex: "f^{-1}(x)=\\frac{x+5}{3}",
  },
  {
    title: "Restrict a quadratic",
    questionLatex: "f(x)=x^2,\\quad x\\ge 0",
    steps: [
      { explanation: "The restriction makes the function one-to-one.", latex: "y=x^2,\\ x\\ge0" },
      { explanation: "Swap and solve, keeping the positive square root.", latex: "x=y^2\\Rightarrow y=\\sqrt{x}" },
    ],
    finalAnswerLatex: "f^{-1}(x)=\\sqrt{x}",
  },
  {
    title: "Use domain and range",
    questionLatex: "f:[2,\\infty)\\to[1,\\infty),\\quad f(x)=(x-2)^2+1",
    steps: [
      { explanation: "The domain of the inverse is the range of the original function.", latex: "\\operatorname{dom}(f^{-1})=[1,\\infty)" },
      { explanation: "The range of the inverse is the domain of the original function.", latex: "\\operatorname{range}(f^{-1})=[2,\\infty)" },
    ],
    finalAnswerLatex: "\\operatorname{dom}(f^{-1})=[1,\\infty),\\quad \\operatorname{range}(f^{-1})=[2,\\infty)",
  },
];

const parametricExamples: WorkedExample[] = [
  {
    title: "Eliminate the parameter",
    questionLatex: "x=t+1,\\quad y=2t-3",
    steps: [
      { explanation: "Solve the x equation for t.", latex: "t=x-1" },
      { explanation: "Substitute into the y equation.", latex: "y=2(x-1)-3" },
      { explanation: "Simplify.", latex: "y=2x-5" },
    ],
    finalAnswerLatex: "y=2x-5",
  },
  {
    title: "Recognise a parabola",
    questionLatex: "x=t,\\quad y=t^2+2",
    steps: [
      { explanation: "Since x equals t, replace t by x.", latex: "y=x^2+2" },
      { explanation: "The path is an upward parabola shifted up by 2." },
    ],
    finalAnswerLatex: "y=x^2+2",
  },
  {
    title: "Use a restricted parameter",
    questionLatex: "x=t^2,\\quad y=t,\\quad t\\ge0",
    steps: [
      { explanation: "Use y equals t.", latex: "t=y" },
      { explanation: "Substitute into x equals t squared.", latex: "x=y^2" },
      { explanation: "The restriction t greater than or equal to zero gives y greater than or equal to zero.", latex: "y=\\sqrt{x}" },
    ],
    finalAnswerLatex: "y=\\sqrt{x},\\quad x\\ge0",
  },
];

const remainderExamples: WorkedExample[] = [
  {
    title: "Find a remainder by substitution",
    questionLatex: "P(x)=x^3-3x+1\\text{ divided by }x-2",
    steps: [
      { explanation: "By the remainder theorem, the remainder on division by x minus a is P(a).", latex: "P(2)=2^3-3(2)+1" },
      { explanation: "Evaluate carefully.", latex: "8-6+1=3" },
    ],
    finalAnswerLatex: "3",
  },
  {
    title: "Use a factor result",
    questionLatex: "P(x)=x^3+2x^2-x-2",
    steps: [
      { explanation: "Test x equals negative 1.", latex: "P(-1)=-1+2+1-2=0" },
      { explanation: "A zero remainder means x plus 1 is a factor.", latex: "P(-1)=0\\Rightarrow (x+1)\\text{ is a factor}" },
    ],
    finalAnswerLatex: "(x+1)\\text{ is a factor}",
  },
  {
    title: "Divide a cubic",
    questionLatex: "(x^3+2x^2-5x-6)\\div(x-2)",
    steps: [
      { explanation: "Synthetic division with 2 uses coefficients 1, 2, negative 5, negative 6.", latex: "1,\\ 2,\\ -5,\\ -6" },
      { explanation: "The quotient coefficients are 1, 4, 3 and the remainder is 0.", latex: "x^2+4x+3" },
    ],
    finalAnswerLatex: "x^2+4x+3",
  },
];

const symmetryExamples: WorkedExample[] = [
  {
    title: "Test an even function",
    questionLatex: "f(x)=x^4-3x^2+2",
    steps: [
      { explanation: "Substitute negative x.", latex: "f(-x)=(-x)^4-3(-x)^2+2" },
      { explanation: "Simplify.", latex: "x^4-3x^2+2=f(x)" },
    ],
    finalAnswerLatex: "\\text{even}",
  },
  {
    title: "Test an odd function",
    questionLatex: "g(x)=x^3-4x",
    steps: [
      { explanation: "Substitute negative x.", latex: "g(-x)=(-x)^3-4(-x)=-x^3+4x" },
      { explanation: "Compare with negative g of x.", latex: "-g(x)=-(x^3-4x)=-x^3+4x" },
    ],
    finalAnswerLatex: "\\text{odd}",
  },
  {
    title: "Spot neither type",
    questionLatex: "h(x)=x^2+x",
    steps: [
      { explanation: "Substitute negative x.", latex: "h(-x)=x^2-x" },
      { explanation: "This is neither h(x) nor negative h(x).", latex: "x^2-x\\ne x^2+x,\\quad x^2-x\\ne -x^2-x" },
    ],
    finalAnswerLatex: "\\text{neither even nor odd}",
  },
];

const absoluteExamples: WorkedExample[] = [
  {
    title: "Solve an absolute value equation",
    questionLatex: "|2x-3|=5",
    steps: [
      { explanation: "Split into positive and negative cases.", latex: "2x-3=5\\quad\\text{or}\\quad 2x-3=-5" },
      { explanation: "Solve each linear equation.", latex: "x=4\\quad\\text{or}\\quad x=-1" },
    ],
    finalAnswerLatex: "x=-1,\\ 4",
  },
  {
    title: "Graph an absolute value of a function",
    questionLatex: "y=|x^2-4|",
    steps: [
      { explanation: "Find where the original graph is negative.", latex: "x^2-4<0\\Rightarrow -2<x<2" },
      { explanation: "Reflect the negative part above the x-axis." },
    ],
    finalAnswerLatex: "\\text{reflect }y=x^2-4\\text{ for }-2<x<2",
  },
  {
    title: "Solve an absolute value inequality",
    questionLatex: "|x-2|<3",
    steps: [
      { explanation: "Translate the distance statement.", latex: "-3<x-2<3" },
      { explanation: "Add 2 throughout.", latex: "-1<x<5" },
    ],
    finalAnswerLatex: "-1<x<5",
  },
];

function inverseLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Find and interpret inverse functions, including domain and range restrictions.", "Inverse functions"),
    learningIntention: "Find inverse functions algebraically and connect inverse graphs with domain and range.",
    successCriteria: [
      "Use the horizontal line test to decide whether an inverse is a function.",
      "Find inverses by swapping x and y and solving for y.",
      "State how domain and range swap under an inverse.",
      "Restrict a quadratic or square root relationship to make it one-to-one.",
    ],
    teaching: {
      paragraphs: [
        "An inverse function reverses the action of the original function.",
        "A function has an inverse function only when it is one-to-one on its stated domain.",
        "Algebraically, find an inverse by writing y equals f of x, swapping x and y, and solving for y.",
        "The domain of a function becomes the range of its inverse, and the range becomes the domain.",
      ],
      latexBlocks: [
        "f^{-1}(f(x))=x",
        "\\operatorname{dom}(f^{-1})=\\operatorname{range}(f)",
        "\\operatorname{range}(f^{-1})=\\operatorname{dom}(f)",
      ],
    },
    workedExamples: inverseExamples,
    guidedPractice: [
      countAnswer("ff-inv-g1", "Find the inverse of f(x)=x+4.", "f(x)=x+4", "x-4", "Swap x and y: x=y+4, so y=x-4.", ["f^{-1}(x)=x-4"]),
      countAnswer("ff-inv-g2", "Find the inverse of f(x)=2x-1.", "f(x)=2x-1", "(x+1)/2", "Swap and solve: x=2y-1, so y=(x+1)/2.", ["\\frac{x+1}{2}", "f^{-1}(x)=(x+1)/2"]),
      choice("ff-inv-g3", "Which test identifies whether a graph has an inverse function?", "B", ["Vertical line test", "Horizontal line test", "Gradient test", "Intercept test"], "The horizontal line test checks whether each y-value occurs once."),
      choice("ff-inv-g4", "For f with domain [2, infinity) and range [1, infinity), what is the domain of f inverse?", "A", ["[1, infinity)", "[2, infinity)", "all real x", "[0, infinity)"], "The inverse domain is the original range."),
    ],
    independentPractice: [
      countAnswer("ff-inv-i1", "Find the inverse of f(x)=3x+6.", "f(x)=3x+6", "(x-6)/3", "Swap and solve: x=3y+6, so y=(x-6)/3.", ["x/3-2", "\\frac{x-6}{3}"]),
      countAnswer("ff-inv-i2", "Find the inverse of f(x)=(x-5)/2.", "f(x)=\\frac{x-5}{2}", "2x+5", "Swap and solve: x=(y-5)/2, so y=2x+5."),
      countAnswer("ff-inv-i3", "For f(x)=x^2 with x>=0, find f inverse.", "f(x)=x^2,\\ x\\ge0", "sqrt(x)", "The restriction gives the positive square root inverse.", ["\\sqrt{x}", "f^{-1}(x)=sqrt(x)"]),
      countAnswer("ff-inv-i4", "For f with domain (-infinity, 4] and range [0, infinity), state the range of f inverse.", "\\operatorname{dom}(f)=(-\\infty,4],\\ \\operatorname{range}(f)=[0,\\infty)", "(-infinity,4]", "The inverse range is the original domain.", ["(-\\infty,4]"]),
      choice("ff-inv-i5", "Why is f(x)=x^2 on all real x not one-to-one?", "C", ["It has no y-intercept", "It is not continuous", "Two different x-values can give the same y-value", "It has no turning point"], "For example, f(2)=f(-2)=4."),
    ],
    commonMistakes: [
      { mistake: "Only changing f(x) to f inverse without swapping x and y.", fix: "Swap x and y first, then solve for y." },
      { mistake: "Forgetting that domain and range swap.", fix: "Write the original domain and range before stating the inverse restrictions." },
      { mistake: "Taking both square roots after a domain restriction.", fix: "Use the root branch allowed by the stated domain." },
      { mistake: "Using the vertical line test for an inverse.", fix: "Use the horizontal line test for one-to-one behaviour." },
    ],
    masteryQuiz: [
      countAnswer("ff-inv-m1", "Find the inverse of f(x)=4x-7.", "f(x)=4x-7", "(x+7)/4", "Swap and solve: x=4y-7, so y=(x+7)/4.", ["\\frac{x+7}{4}"]),
      countAnswer("ff-inv-m2", "Find the inverse of f(x)=5-2x.", "f(x)=5-2x", "(5-x)/2", "Swap and solve: x=5-2y, so y=(5-x)/2.", ["\\frac{5-x}{2}"]),
      countAnswer("ff-inv-m3", "If f has range [-3, 8], state the domain of f inverse.", "\\operatorname{range}(f)=[-3,8]", "[-3,8]", "The inverse domain is the original range."),
      countAnswer("ff-inv-m4", "For f(x)=(x+1)^2 with x>=-1, find f inverse.", "f(x)=(x+1)^2,\\ x\\ge-1", "sqrt(x)-1", "Swap and solve using the positive branch: y=sqrt(x)-1.", ["\\sqrt{x}-1"]),
      countAnswer("ff-inv-m5", "Find f inverse evaluated at 7 if f(x)=2x+3.", "f(x)=2x+3", "2", "f^{-1}(x)=(x-3)/2, so f^{-1}(7)=2."),
      choice("ff-inv-m6", "Which graph feature means a function fails the horizontal line test?", "D", ["One x-intercept", "A closed endpoint", "Positive gradient", "Some horizontal line cuts it twice"], "The horizontal line test fails when a y-value belongs to more than one x-value."),
      choice("ff-inv-m7", "If f maps 3 to 10, what does f inverse map 10 to?", "A", ["3", "7", "10", "13"], "The inverse reverses the input-output pair."),
      choice("ff-inv-m8", "Which restriction makes y=x^2 one-to-one?", "B", ["all real x", "x>=0", "y>=0 only", "x not equal 0"], "Restricting to x>=0 gives the right-hand branch only."),
      countAnswer("ff-inv-m9", "Find the inverse of f(x)=(2x+1)/3.", "f(x)=\\frac{2x+1}{3}", "(3x-1)/2", "Swap and solve: 3x=2y+1, so y=(3x-1)/2.", ["\\frac{3x-1}{2}"]),
      countAnswer("ff-inv-m10", "For f with domain [0, 6] and range [-2, 4], state the range of f inverse.", "\\operatorname{dom}(f)=[0,6],\\ \\operatorname{range}(f)=[-2,4]", "[0,6]", "The inverse range is the original domain."),
    ],
  };
}

function parametricLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Convert simple parametric equations to Cartesian form and interpret the traced path.", "Parametric equations"),
    learningIntention: "Eliminate a parameter and use parameter restrictions when sketching simple curves.",
    successCriteria: [
      "Substitute between parametric equations to remove the parameter.",
      "Convert simple linear and quadratic parametric forms to Cartesian equations.",
      "Use parameter restrictions to limit the traced curve.",
      "Interpret the direction of increasing parameter values.",
    ],
    teaching: {
      paragraphs: [
        "Parametric equations describe x and y in terms of a third variable, usually t.",
        "To find a Cartesian equation, solve one parametric equation for t and substitute into the other.",
        "The same Cartesian equation can represent different paths when the parameter has restrictions.",
        "A sketch should show both the shape and the part of the shape traced by the allowed parameter values.",
      ],
      latexBlocks: [
        "x=f(t),\\quad y=g(t)",
        "\\text{eliminate }t\\text{ to relate }x\\text{ and }y",
        "t\\text{ restrictions give }x\\text{ and }y\\text{ restrictions}",
      ],
    },
    workedExamples: parametricExamples,
    guidedPractice: [
      countAnswer("ff-param-g1", "Eliminate t: x=t+2, y=t-1.", "x=t+2,\\ y=t-1", "y=x-3", "From x=t+2, t=x-2. Substitute into y=t-1 to get y=x-3."),
      countAnswer("ff-param-g2", "Eliminate t: x=t, y=3t+4.", "x=t,\\ y=3t+4", "y=3x+4", "Since x=t, replace t by x."),
      choice("ff-param-g3", "Which variable is usually removed to get a Cartesian equation?", "C", ["x", "y", "t", "the coefficient"], "The parameter t is eliminated."),
      choice("ff-param-g4", "For x=t^2 and y=t with t>=0, which restriction applies to y?", "B", ["y<0", "y>=0", "y=0 only", "all real y"], "Since y=t and t>=0, y>=0."),
    ],
    independentPractice: [
      countAnswer("ff-param-i1", "Eliminate t: x=2t, y=t+5.", "x=2t,\\ y=t+5", "y=x/2+5", "From x=2t, t=x/2. Then y=x/2+5.", ["y=\\frac{x}{2}+5"]),
      countAnswer("ff-param-i2", "Eliminate t: x=t-3, y=t^2.", "x=t-3,\\ y=t^2", "y=(x+3)^2", "t=x+3, so y=(x+3)^2."),
      countAnswer("ff-param-i3", "For x=t+1, y=2t and t>=0, state the restriction on x.", "x=t+1,\\ t\\ge0", "x>=1", "If t>=0, then x=t+1>=1.", ["x\\ge1"]),
      countAnswer("ff-param-i4", "Eliminate t: x=t^2, y=t+1.", "x=t^2,\\ y=t+1", "x=(y-1)^2", "From y=t+1, t=y-1. Substitute into x=t^2."),
      choice("ff-param-i5", "Which Cartesian curve comes from x=t, y=t^2-4?", "A", ["$y=x^2-4$", "$x=y^2-4$", "$y=2x-4$", "$x=t^2$"], "Replace t by x."),
    ],
    commonMistakes: [
      { mistake: "Treating t as a constant instead of a variable.", fix: "Use t as the moving parameter that controls both coordinates." },
      { mistake: "Dropping restrictions after eliminating t.", fix: "Translate restrictions on t into restrictions on x or y." },
      { mistake: "Solving the harder parametric equation first.", fix: "Choose the equation that isolates t most directly." },
      { mistake: "Assuming every Cartesian curve is traced completely.", fix: "Check the allowed values of t." },
    ],
    masteryQuiz: [
      countAnswer("ff-param-m1", "Eliminate t: x=t-4, y=5t.", "x=t-4,\\ y=5t", "y=5x+20", "t=x+4, so y=5(x+4)=5x+20."),
      countAnswer("ff-param-m2", "Eliminate t: x=t+2, y=t^2+1.", "x=t+2,\\ y=t^2+1", "y=(x-2)^2+1", "t=x-2, so y=(x-2)^2+1."),
      countAnswer("ff-param-m3", "Eliminate t: x=3t-1, y=t.", "x=3t-1,\\ y=t", "x=3y-1", "Since y=t, substitute t=y into x=3t-1."),
      countAnswer("ff-param-m4", "For x=2t+1 with t<=3, state the restriction on x.", "x=2t+1,\\ t\\le3", "x<=7", "If t<=3, then x=2t+1<=7.", ["x\\le7"]),
      countAnswer("ff-param-m5", "Eliminate t: x=t^2, y=2t.", "x=t^2,\\ y=2t", "4x=y^2", "t=y/2, so x=(y/2)^2 and y^2=4x.", ["y^2=4x"]),
      choice("ff-param-m6", "What does increasing t usually show on a parametric sketch?", "D", ["The y-intercept only", "The turning point only", "The axis scale", "The direction of motion"], "As t increases, the point moves along the path."),
      choice("ff-param-m7", "Which equation is easiest to solve first for x=t+6, y=t^2?", "A", ["x=t+6", "y=t^2", "both are equally impossible", "neither equation"], "The linear x equation gives t=x-6 immediately."),
      choice("ff-param-m8", "If t is restricted to 0<=t<=2 and x=t+1, what interval contains x?", "C", ["0<=x<=2", "x>=0", "1<=x<=3", "x<=2"], "Add 1 throughout the t interval."),
      countAnswer("ff-param-m9", "Eliminate t: x=t-1, y=4-2t.", "x=t-1,\\ y=4-2t", "y=2-2x", "t=x+1, so y=4-2(x+1)=2-2x."),
      countAnswer("ff-param-m10", "Eliminate t: x=t+1, y=(t+1)^2.", "x=t+1,\\ y=(t+1)^2", "y=x^2", "Since x=t+1, y=x^2."),
    ],
  };
}

function remainderLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use polynomial division and the remainder theorem as tools for analysing functions.", "Polynomial division and remainders"),
    learningIntention: "Use division, remainders, and values of P(a) to interpret polynomial functions.",
    successCriteria: [
      "Apply the remainder theorem for division by x minus a.",
      "Use P(a)=0 to identify factors and x-intercepts.",
      "Perform simple polynomial division by a linear divisor.",
      "Connect a zero remainder with factorisation of a function.",
    ],
    teaching: {
      paragraphs: [
        "For a polynomial function P, division by x minus a has remainder P(a).",
        "This result lets you find a remainder by substitution instead of long division.",
        "If P(a)=0, then x minus a is a factor and x=a is an x-intercept of the graph.",
        "Polynomial division gives a quotient and a remainder, just like numerical division.",
      ],
      latexBlocks: [
        "P(x)=(x-a)Q(x)+R",
        "R=P(a)",
        "P(a)=0\\Rightarrow (x-a)\\text{ is a factor}",
      ],
    },
    workedExamples: remainderExamples,
    guidedPractice: [
      countAnswer("ff-rem-g1", "Find the remainder when P(x)=x^2+3x+1 is divided by x-2.", "P(2)", "11", "P(2)=4+6+1=11."),
      countAnswer("ff-rem-g2", "Find P(-1) for P(x)=x^3+2x^2-x-2.", "P(-1)", "0", "P(-1)=-1+2+1-2=0."),
      choice("ff-rem-g3", "If P(4)=0, which factor must P(x) have?", "A", ["$x-4$", "$x+4$", "$4x$", "$x^4$"], "P(4)=0 means x-4 is a factor."),
      choice("ff-rem-g4", "The remainder when dividing P(x) by x-a is equal to what?", "C", ["P(0)", "P(-a)", "P(a)", "aP(x)"], "This is the remainder theorem."),
    ],
    independentPractice: [
      countAnswer("ff-rem-i1", "Find the remainder when P(x)=x^3-3x+1 is divided by x-2.", "P(2)", "3", "P(2)=8-6+1=3."),
      countAnswer("ff-rem-i2", "Find the remainder when P(x)=2x^2-x+5 is divided by x+1.", "P(-1)", "8", "Dividing by x+1 means a=-1. P(-1)=2+1+5=8."),
      countAnswer("ff-rem-i3", "Find the quotient of (x^2+5x+6) divided by x+2.", "\\frac{x^2+5x+6}{x+2}", "x+3", "Since x^2+5x+6=(x+2)(x+3), the quotient is x+3."),
      countAnswer("ff-rem-i4", "Find k if x-1 is a factor of P(x)=x^2+kx+3.", "P(1)=0", "-4", "P(1)=1+k+3=0, so k=-4."),
      choice("ff-rem-i5", "If division by x+3 gives remainder 0, which x-value is a root?", "B", ["3", "-3", "0", "1"], "x+3=x-(-3), so the root is -3."),
    ],
    commonMistakes: [
      { mistake: "Using P(-a) for division by x-a.", fix: "For x-a, substitute x=a." },
      { mistake: "Confusing a remainder of zero with no quotient.", fix: "A zero remainder means exact division and a factor." },
      { mistake: "Forgetting the sign in x+a.", fix: "Rewrite x+a as x-(-a)." },
      { mistake: "Treating P(a) as a point's x-coordinate.", fix: "P(a) is the y-value at x=a." },
    ],
    masteryQuiz: [
      countAnswer("ff-rem-m1", "Find the remainder when P(x)=x^2-4x+7 is divided by x-3.", "P(3)", "4", "P(3)=9-12+7=4."),
      countAnswer("ff-rem-m2", "Find the remainder when P(x)=x^3+2x+1 is divided by x+2.", "P(-2)", "-11", "P(-2)=-8-4+1=-11."),
      countAnswer("ff-rem-m3", "Find P(2) for P(x)=x^3-3x+1.", "P(2)", "3", "P(2)=8-6+1=3."),
      countAnswer("ff-rem-m4", "Find k if x+1 is a factor of P(x)=x^2+kx-2.", "P(-1)=0", "-1", "P(-1)=1-k-2=0, so -k-1=0 and k=-1."),
      countAnswer("ff-rem-m5", "Divide x^2-9 by x-3 and give the quotient.", "\\frac{x^2-9}{x-3}", "x+3", "x^2-9=(x-3)(x+3)."),
      choice("ff-rem-m6", "What does P(a)=0 tell you about the graph y=P(x)?", "D", ["It has y-intercept a", "It is always positive", "It has no roots", "It has x-intercept a"], "P(a)=0 means the graph crosses or touches the x-axis at x=a."),
      choice("ff-rem-m7", "Which substitution gives the remainder for division by x+5?", "B", ["P(5)", "P(-5)", "P(0)", "P(1/5)"], "x+5 is x-(-5)."),
      choice("ff-rem-m8", "If P(2)=7, what is the remainder on division by x-2?", "A", ["7", "2", "-2", "0"], "By the remainder theorem, the remainder is P(2)."),
      countAnswer("ff-rem-m9", "Find the remainder when P(x)=2x^3-x^2+4 is divided by x-1.", "P(1)", "5", "P(1)=2-1+4=5."),
      countAnswer("ff-rem-m10", "Find k if x-2 is a factor of P(x)=x^2+kx-6.", "P(2)=0", "1", "P(2)=4+2k-6=0, so 2k=2 and k=1."),
    ],
  };
}

function symmetryLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Classify odd and even functions using algebraic tests and graph symmetry.", "Odd and even functions"),
    learningIntention: "Use f(-x) to classify functions and interpret their graph symmetry.",
    successCriteria: [
      "Test whether a function is even by checking f(-x)=f(x).",
      "Test whether a function is odd by checking f(-x)=-f(x).",
      "Connect even functions with y-axis symmetry.",
      "Connect odd functions with rotational symmetry about the origin.",
    ],
    teaching: {
      paragraphs: [
        "Odd and even classifications describe symmetry in a function's rule and graph.",
        "An even function is unchanged when x is replaced by negative x, so its graph has y-axis symmetry.",
        "An odd function changes sign when x is replaced by negative x, so its graph has rotational symmetry about the origin.",
        "Some functions are neither odd nor even, so both tests must be checked before deciding.",
      ],
      latexBlocks: [
        "\\text{even: }f(-x)=f(x)",
        "\\text{odd: }f(-x)=-f(x)",
        "\\text{even symmetry: y-axis}",
        "\\text{odd symmetry: origin}",
      ],
    },
    workedExamples: symmetryExamples,
    guidedPractice: [
      countAnswer("ff-sym-g1", "Classify f(x)=x^2+1 as even, odd, or neither.", "f(x)=x^2+1", "even", "f(-x)=(-x)^2+1=x^2+1=f(x)."),
      countAnswer("ff-sym-g2", "Classify f(x)=x^3 as even, odd, or neither.", "f(x)=x^3", "odd", "f(-x)=(-x)^3=-x^3=-f(x)."),
      choice("ff-sym-g3", "Which symmetry belongs to an even function?", "A", ["y-axis symmetry", "x-axis symmetry", "origin symmetry", "no possible symmetry"], "Even functions have y-axis symmetry."),
      choice("ff-sym-g4", "Which condition defines an odd function?", "D", ["f(-x)=f(x)", "f(x)=0", "f(-x)=x", "f(-x)=-f(x)"], "This is the algebraic test for odd functions."),
    ],
    independentPractice: [
      countAnswer("ff-sym-i1", "Classify f(x)=x^4-2x^2 as even, odd, or neither.", "f(x)=x^4-2x^2", "even", "All powers are even, so f(-x)=f(x)."),
      countAnswer("ff-sym-i2", "Classify f(x)=x^5-3x as even, odd, or neither.", "f(x)=x^5-3x", "odd", "f(-x)=-x^5+3x=-f(x)."),
      countAnswer("ff-sym-i3", "Classify f(x)=x^2+x as even, odd, or neither.", "f(x)=x^2+x", "neither", "f(-x)=x^2-x, which is neither f(x) nor -f(x)."),
      countAnswer("ff-sym-i4", "Classify f(x)=7 as even, odd, or neither.", "f(x)=7", "even", "f(-x)=7=f(x)."),
      choice("ff-sym-i5", "A graph has rotational symmetry about the origin. Which classification is likely?", "B", ["Even", "Odd", "Both for every function", "Neither always"], "Odd functions have origin symmetry."),
    ],
    commonMistakes: [
      { mistake: "Thinking even means even degree only.", fix: "Use the test f(-x)=f(x), including constants and combinations." },
      { mistake: "Calling a function odd because it has an odd degree term.", fix: "Every term must satisfy the odd test together." },
      { mistake: "Confusing origin symmetry with x-axis symmetry.", fix: "Odd function symmetry is rotation by 180 degrees about the origin." },
      { mistake: "Stopping after one test fails.", fix: "If the even test fails, still check whether the odd test works." },
    ],
    masteryQuiz: [
      countAnswer("ff-sym-m1", "Classify f(x)=x^6+2 as even, odd, or neither.", "f(x)=x^6+2", "even", "f(-x)=x^6+2=f(x)."),
      countAnswer("ff-sym-m2", "Classify f(x)=x^3+x as even, odd, or neither.", "f(x)=x^3+x", "odd", "f(-x)=-x^3-x=-f(x)."),
      countAnswer("ff-sym-m3", "Classify f(x)=x^3+1 as even, odd, or neither.", "f(x)=x^3+1", "neither", "f(-x)=-x^3+1, which is neither f(x) nor -f(x)."),
      countAnswer("ff-sym-m4", "Classify f(x)=x^2-4 as even, odd, or neither.", "f(x)=x^2-4", "even", "Replacing x by -x leaves the expression unchanged."),
      countAnswer("ff-sym-m5", "Classify f(x)=5x as even, odd, or neither.", "f(x)=5x", "odd", "f(-x)=-5x=-f(x)."),
      choice("ff-sym-m6", "Which test proves f is even?", "A", ["$f(-x)=f(x)$", "$f(-x)=-f(x)$", "$f(0)=0$", "$f(x)>0$"], "This is the defining even-function test."),
      choice("ff-sym-m7", "Which graph symmetry belongs to f(x)=x^3?", "C", ["y-axis only", "x-axis only", "origin", "no symmetry"], "x cubed is odd, so it has origin symmetry."),
      choice("ff-sym-m8", "A student says f(x)=x^2+x is odd because it has an x term. What is wrong?", "D", ["It has no x term", "It is automatically even", "Odd functions cannot be polynomials", "The whole function fails f(-x)=-f(x)"], "Classification applies to the whole function."),
      countAnswer("ff-sym-m9", "If f is even and f(3)=11, find f(-3).", "f(-x)=f(x)", "11", "For an even function, opposite inputs have the same output."),
      countAnswer("ff-sym-m10", "If g is odd and g(4)=-6, find g(-4).", "g(-x)=-g(x)", "6", "For an odd function, g(-4)=-g(4)=6."),
    ],
  };
}

function absoluteLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Graph, solve, and interpret equations and inequalities involving absolute value functions.", "Absolute value functions"),
    learningIntention: "Use absolute value as distance and reflection to solve equations, inequalities, and graph transformations.",
    successCriteria: [
      "Interpret absolute value as distance from zero.",
      "Solve equations of the form |linear expression|=k.",
      "Solve simple absolute value inequalities.",
      "Sketch y=|f(x)| by reflecting negative y-values above the x-axis.",
    ],
    teaching: {
      paragraphs: [
        "The absolute value of a number is its distance from zero, so it is never negative.",
        "An equation such as |A|=k splits into two cases when k is positive: A=k or A=-k.",
        "An inequality such as |x-a|<r describes points within distance r of a.",
        "The graph y=|f(x)| keeps the part of y=f(x) above the x-axis and reflects the negative part upward.",
      ],
      latexBlocks: [
        "|A|=k\\Rightarrow A=k\\text{ or }A=-k\\quad(k\\ge0)",
        "|x-a|<r\\Rightarrow a-r<x<a+r",
        "y=|f(x)|\\text{ reflects negative y-values upward}",
      ],
    },
    workedExamples: absoluteExamples,
    guidedPractice: [
      countAnswer("ff-abs-g1", "Solve |x-3|=4. Give the smaller solution.", "|x-3|=4", "-1", "x-3=4 or x-3=-4, so x=7 or x=-1. The smaller solution is -1."),
      countAnswer("ff-abs-g2", "Solve |2x|=6. Give the positive solution.", "|2x|=6", "3", "2x=6 gives x=3; 2x=-6 gives x=-3."),
      choice("ff-abs-g3", "What is the range of y=|x|?", "A", ["y>=0", "all real y", "y<=0", "y>1"], "Absolute value outputs are non-negative."),
      choice("ff-abs-g4", "In y=|f(x)|, what happens to parts of f below the x-axis?", "C", ["They disappear", "They stay below", "They reflect above the x-axis", "They move left"], "Absolute value makes negative outputs positive."),
    ],
    independentPractice: [
      countAnswer("ff-abs-i1", "Solve |x+2|=5. Give the larger solution.", "|x+2|=5", "3", "x+2=5 gives 3; x+2=-5 gives -7."),
      countAnswer("ff-abs-i2", "Solve |3x-1|=8. Give the positive solution.", "|3x-1|=8", "3", "3x-1=8 gives x=3; the other solution is -7/3."),
      countAnswer("ff-abs-i3", "Solve |x-2|<3 using interval notation.", "|x-2|<3", "(-1,5)", "-3<x-2<3, so -1<x<5.", ["-1<x<5"]),
      countAnswer("ff-abs-i4", "Solve |x+1|<=2 using interval notation.", "|x+1|\\le2", "[-3,1]", "-2<=x+1<=2, so -3<=x<=1.", ["-3<=x<=1"]),
      choice("ff-abs-i5", "How many solutions does |x-4|=-2 have?", "D", ["Two", "One", "Infinitely many", "None"], "Absolute value cannot be negative."),
    ],
    commonMistakes: [
      { mistake: "Solving only the positive case.", fix: "For |A|=k with k>0, solve A=k and A=-k." },
      { mistake: "Allowing a negative absolute value output.", fix: "Absolute value is always non-negative." },
      { mistake: "Reversing inequality signs without a reason.", fix: "Translate small absolute value inequalities as a double inequality." },
      { mistake: "Reflecting the graph in the y-axis for y=|f(x)|.", fix: "Reflect negative y-values in the x-axis." },
    ],
    masteryQuiz: [
      countAnswer("ff-abs-m1", "Solve |x-5|=2. Give the smaller solution.", "|x-5|=2", "3", "Solutions are x=7 and x=3."),
      countAnswer("ff-abs-m2", "Solve |2x+1|=7. Give the larger solution.", "|2x+1|=7", "3", "2x+1=7 gives x=3; the other solution is -4."),
      countAnswer("ff-abs-m3", "Solve |x|=9. Give the negative solution.", "|x|=9", "-9", "The solutions are x=9 and x=-9."),
      countAnswer("ff-abs-m4", "Solve |x-1|<4 using interval notation.", "|x-1|<4", "(-3,5)", "-4<x-1<4, so -3<x<5.", ["-3<x<5"]),
      countAnswer("ff-abs-m5", "Solve |x+3|<=1 using interval notation.", "|x+3|\\le1", "[-4,-2]", "-1<=x+3<=1, so -4<=x<=-2.", ["-4<=x<=-2"]),
      choice("ff-abs-m6", "Which equation has no real solution?", "B", ["$|x|=0$", "$|x|=-1$", "$|x|=5$", "$|x-2|=3$"], "Absolute value cannot equal a negative number."),
      choice("ff-abs-m7", "The vertex of y=|x-2| is where?", "A", ["(2,0)", "(0,2)", "(-2,0)", "(0,-2)"], "The expression inside the absolute value is zero at x=2."),
      choice("ff-abs-m8", "Which inequality matches points within 3 units of 5?", "C", ["$|x-3|<5$", "$|x+5|<3$", "$|x-5|<3$", "$|x|>3$"], "Distance from 5 is represented by |x-5|."),
      countAnswer("ff-abs-m9", "Solve |4x|=12. Give the positive solution.", "|4x|=12", "3", "4x=12 gives x=3; the other solution is -3."),
      countAnswer("ff-abs-m10", "Find the minimum value of y=|x+6|.", "y=|x+6|", "0", "Absolute value is minimized when x+6=0, giving y=0."),
    ],
  };
}

const reciprocalSquaredExamples: WorkedExample[] = [
  {
    title: "How to sketch y = 1/f(x) from y = f(x)",
    questionLatex: "\\text{Given a graph of }y=f(x)\\text{, sketch }y=\\tfrac{1}{f(x)}.",
    steps: [
      {
        explanation: "Step 1: Mark vertical asymptotes. Wherever f(x) = 0, draw a vertical asymptote on the sketch of 1/f(x).",
        latex: "f(x)=0\\Rightarrow \\text{vertical asymptote in }\\tfrac{1}{f(x)}",
      },
      {
        explanation: "Step 2: Mark invariant points. Where f(x) = 1 or f(x) = −1, the reciprocal equals the original, so plot those points as fixed.",
        latex: "f(x)=1\\Rightarrow\\tfrac{1}{f(x)}=1,\\qquad f(x)=-1\\Rightarrow\\tfrac{1}{f(x)}=-1",
      },
      {
        explanation: "Step 3: Determine sign. 1/f(x) is positive where f is positive and negative where f is negative.",
        latex: "\\operatorname{sign}\\!\\left(\\tfrac{1}{f(x)}\\right)=\\operatorname{sign}(f(x))",
      },
      {
        explanation: "Step 4: Apply the magnitude rule. Large |f(x)| produces small |1/f(x)| and vice versa. Where f→±∞, 1/f→0.",
        latex: "|f(x)|\\to\\infty\\Rightarrow\\tfrac{1}{f(x)}\\to 0",
      },
      {
        explanation: "Step 5: Identify local extrema. A local maximum of f at y = k > 0 becomes a local minimum of 1/f at y = 1/k.",
        latex: "f\\text{ has local max }k>0\\Rightarrow\\tfrac{1}{f}\\text{ has local min }\\tfrac{1}{k}",
      },
    ],
    finalAnswerLatex: "\\tfrac{1}{f(x)}\\text{ is sketched using asymptotes, invariant points, sign, and magnitude.}",
  },
  {
    title: "How to sketch y = [f(x)]² from y = f(x)",
    questionLatex: "\\text{Given a graph of }y=f(x)\\text{, sketch }y=[f(x)]^2.",
    steps: [
      {
        explanation: "Step 1: The graph of [f(x)]² is always on or above the x-axis because squares are non-negative.",
        latex: "[f(x)]^2\\ge 0\\text{ for all }x",
      },
      {
        explanation: "Step 2: Mark zeros. Wherever f(x) = 0, [f(x)]² = 0 as well. The curve touches the x-axis there and bounces back up.",
        latex: "f(x)=0\\Rightarrow [f(x)]^2=0\\text{ (touching zero)}",
      },
      {
        explanation: "Step 3: Apply the magnitude rule. Where |f(x)| > 1 the square is larger; where 0 < |f(x)| < 1 the square is smaller.",
        latex: "|f(x)|>1\\Rightarrow [f(x)]^2>|f(x)|,\\qquad |f(x)|<1\\Rightarrow [f(x)]^2<|f(x)|",
      },
      {
        explanation: "Step 4: Negative parts of f become positive. Reflect any portion of f that lies below the x-axis upward, then square its magnitude.",
        latex: "f(x)<0\\Rightarrow [f(x)]^2=[{|f(x)|}]^2>0",
      },
    ],
    finalAnswerLatex: "[f(x)]^2\\text{ lies above the x-axis, touching it at zeros of }f\\text{ and squaring all magnitudes.}",
  },
  {
    title: "Evaluate 1/f(x) and [f(x)]² at specific points",
    questionLatex: "f(0)=2,\\quad f(1)=0,\\quad f(2)=-1",
    steps: [
      {
        explanation: "At x = 0: f(0) = 2, so 1/f(0) = 1/2 and [f(0)]² = 4.",
        latex: "\\tfrac{1}{f(0)}=\\tfrac{1}{2},\\qquad [f(0)]^2=4",
      },
      {
        explanation: "At x = 1: f(1) = 0, so 1/f(1) is undefined (vertical asymptote) and [f(1)]² = 0.",
        latex: "\\tfrac{1}{f(1)}\\text{ undefined},\\qquad [f(1)]^2=0",
      },
      {
        explanation: "At x = 2: f(2) = −1, so 1/f(2) = −1 (invariant point) and [f(2)]² = 1.",
        latex: "\\tfrac{1}{f(2)}=-1,\\qquad [f(2)]^2=1",
      },
    ],
    finalAnswerLatex: "x=0:\\;\\tfrac{1}{2},\\;4\\qquad x=1:\\;\\text{undef},\\;0\\qquad x=2:\\;-1,\\;1",
  },
];

function reciprocalSquaredLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Sketch y = 1/f(x) and y = [f(x)]² from a given graph of y = f(x) using key graphical rules.",
      "Reciprocal and squared function graphs"
    ),
    learningIntention:
      "Use graphical reasoning to sketch y = 1/f(x) and y = [f(x)]² from a known graph of y = f(x).",
    successCriteria: [
      "Identify vertical asymptotes of y = 1/f(x) at the zeros of f.",
      "Locate invariant points where f(x) = 1 or f(x) = −1.",
      "Apply magnitude and sign rules to sketch y = 1/f(x).",
      "Recognise that y = [f(x)]² is always non-negative and touches zero where f does.",
      "Describe the squaring effect on large and small values of |f(x)|.",
    ],
    teaching: {
      paragraphs: [
        "When a graph of y = f(x) is given, two derived graphs are frequently examined in NSW Extension 1: y = 1/f(x) and y = [f(x)]². Neither requires an explicit formula — both are constructed purely from graphical features of the original.",
        "For y = 1/f(x), the most important rule is that every zero of f produces a vertical asymptote, because division by zero is undefined. Conversely, where f grows without bound, 1/f approaches zero, creating a horizontal approach to y = 0. The sign of 1/f(x) always matches the sign of f(x). Two special points — called invariant points — occur where f(x) = 1 or f(x) = −1, because 1/1 = 1 and 1/(−1) = −1, so the reciprocal graph passes through those exact points on the original curve.",
        "A common misconception is that y = 1/f(x) is simply a reflection of y = f(x). This is incorrect: the transformation is a reciprocal, not a flip. Students who make this error will place the graph on the wrong side of the x-axis or miss the asymptotes entirely. Always return to the definition: the y-value of the reciprocal graph at each x equals one divided by the y-value of the original.",
        "For y = [f(x)]², the key insight is that squaring can never produce a negative output, so the entire graph lies on or above the x-axis. Zeros of f remain zeros of [f(x)]², but the curve merely touches the axis there rather than crossing it, producing a local minimum of zero with zero gradient — a 'bounce'. Where |f(x)| > 1 the squared graph is stretched away from the axis, and where 0 < |f(x)| < 1 it is compressed toward the axis. Negative portions of f are folded upward before squaring, so a local minimum of f at y = −k becomes a local maximum of [f(x)]² at y = k².",
        "Practising both transformations on the same sketch is an effective study strategy: draw f, then reason about asymptotes and invariant points for 1/f on one side, and about zeros, bounces, and squaring effects for [f]² on the other side.",
      ],
      latexBlocks: [
        "f(x)=0\\Rightarrow\\text{vertical asymptote in }\\tfrac{1}{f(x)}",
        "f(x)=\\pm1\\Rightarrow\\text{invariant point: }\\tfrac{1}{f(x)}=\\pm1",
        "[f(x)]^2\\ge0\\text{ for all }x",
        "f(x)=0\\Rightarrow[f(x)]^2=0\\text{ (touches x-axis)}",
        "f\\text{ local min at }y=k<0\\Rightarrow[f]^2\\text{ local max at }y=k^2",
      ],
    },
    workedExamples: reciprocalSquaredExamples,
    guidedPractice: [
      choice(
        "y11ext-ff-rsg-g1",
        "The graph of y = f(x) has a zero at x = 3. On the graph of y = 1/f(x), what occurs at x = 3?",
        "B",
        ["A zero", "A vertical asymptote", "An invariant point", "A local maximum"],
        "Because f(3) = 0, division by f(3) is undefined, so x = 3 is a vertical asymptote of y = 1/f(x).",
        "\\text{What happens at a zero of }f\\text{ on }y=\\tfrac{1}{f(x)}?"
      ),
      choice(
        "y11ext-ff-rsg-g2",
        "The graph of y = f(x) passes through (2, 1). Which statement about y = 1/f(x) is correct at x = 2?",
        "B",
        ["It has a zero", "It has the value 1", "It has a vertical asymptote", "It has the value 0"],
        "Since f(2) = 1, we get 1/f(2) = 1/1 = 1. This is an invariant point where the reciprocal curve passes through the original.",
        "\\text{What is }\\tfrac{1}{f(2)}\\text{ when }f(2)=1?"
      ),
      countAnswer(
        "y11ext-ff-rsg-g3",
        "f(x) has zeros at x = 1 and x = 4. How many vertical asymptotes does y = 1/f(x) have from these zeros?",
        "f(x)=0\\text{ at }x=1\\text{ and }x=4",
        "2",
        "Each zero of f produces one vertical asymptote in 1/f(x). Two zeros give two vertical asymptotes."
      ),
      choice(
        "y11ext-ff-rsg-g4",
        "The graph of y = f(x) is negative on the interval (a, b). On this interval, y = [f(x)]² is:",
        "C",
        ["Negative", "Zero", "Positive", "Undefined"],
        "Squaring any non-zero real number gives a positive result, so [f(x)]² > 0 wherever f(x) ≠ 0.",
        "\\text{What is the sign of }[f(x)]^2\\text{ when }f(x)<0?"
      ),
    ],
    independentPractice: [
      countAnswer(
        "y11ext-ff-rsg-i1",
        "f(x) has exactly three zeros and no vertical asymptotes. How many vertical asymptotes does y = 1/f(x) have?",
        "f\\text{ has exactly 3 zeros}",
        "3",
        "Each zero of f becomes a vertical asymptote of 1/f(x). Three zeros produce three asymptotes."
      ),
      choice(
        "y11ext-ff-rsg-i2",
        "Where f(x) = 2, what is the value of 1/f(x)?",
        "B",
        ["−2", "0.5", "2", "4"],
        "1/f(x) = 1/2 = 0.5 when f(x) = 2.",
        "\\tfrac{1}{f(x)}\\text{ when }f(x)=2"
      ),
      countAnswer(
        "y11ext-ff-rsg-i3",
        "The graph of y = f(x) has a local maximum value of 4. What is the local minimum value of y = 1/f(x) near that point? Give a decimal.",
        "f\\text{ has local max }4",
        "0.25",
        "A local maximum of f at y = 4 > 0 produces a local minimum of 1/f at y = 1/4 = 0.25.",
        ["1/4"]
      ),
      choice(
        "y11ext-ff-rsg-i4",
        "Where does y = [f(x)]² equal zero?",
        "B",
        ["Where f(x) < 0", "Only where f(x) = 0", "Where f(x) = ±1", "Where f(x) → ∞"],
        "[f(x)]² = 0 only when f(x) = 0 because a square equals zero only when its base equals zero.",
        "[f(x)]^2=0\\text{ when?}"
      ),
      countAnswer(
        "y11ext-ff-rsg-i5",
        "y = f(x) has the value 0.5 at a certain point. What is [f(x)]² at that point?",
        "f(x)=0.5",
        "0.25",
        "[0.5]² = 0.25. Because |f(x)| < 1, the square is smaller than the original value."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Treating y = 1/f(x) as a reflection of y = f(x).",
        fix: "The reciprocal transformation is not a flip. Calculate 1/(y-value) at each x — this changes magnitude and may shift the curve to the other side of y = 0 only where f is negative.",
      },
      {
        mistake: "Forgetting invariant points at f(x) = 1 and f(x) = −1.",
        fix: "Mark these on the original graph first. The reciprocal curve must pass through those exact points, providing reliable anchor values for the sketch.",
      },
      {
        mistake: "Assuming [f(x)]² can be negative or can cross the x-axis.",
        fix: "Squares are always non-negative. The graph of [f(x)]² only touches zero where f has a zero and lies strictly above the x-axis everywhere else.",
      },
    ],
    masteryQuiz: [
      choice(
        "y11ext-ff-rsg-m1",
        "f(x) has a local minimum at y = −3. On the graph of y = [f(x)]², this point becomes:",
        "C",
        ["A local minimum at y = −9", "A local minimum at y = 3", "A local maximum at y = 9", "A zero"],
        "Squaring −3 gives 9. Because the negative portion of f is folded upward, that local minimum of f at y = −3 becomes a local maximum of [f(x)]² at y = 9.",
        "f\\text{ local min at }y=-3\\Rightarrow [f]^2\\text{ at that point}?"
      ),
      choice(
        "y11ext-ff-rsg-m2",
        "On an interval where 0 < f(x) < 1, which comparison is correct?",
        "C",
        ["[f(x)]² > f(x)", "[f(x)]² = f(x)", "[f(x)]² < f(x)", "1/f(x) < 1"],
        "When 0 < f(x) < 1, squaring makes the value smaller: for example, (0.5)² = 0.25 < 0.5.",
        "0<f(x)<1\\Rightarrow [f(x)]^2\\text{ vs }f(x)?"
      ),
      countAnswer(
        "y11ext-ff-rsg-m3",
        "f(x) has 2 zeros and 1 vertical asymptote. How many vertical asymptotes does y = 1/f(x) have from the zeros of f?",
        "f\\text{ has 2 zeros}",
        "2",
        "Each zero of f contributes one vertical asymptote to 1/f. The existing vertical asymptote of f is a separate feature."
      ),
      choice(
        "y11ext-ff-rsg-m4",
        "A graph of y = 1/f(x) has a vertical asymptote at x = a. What does this tell you about f(x)?",
        "B",
        ["f(a) is undefined", "f(a) = 0", "f(a) = 1", "f(a) is a local maximum"],
        "A vertical asymptote in 1/f at x = a means f(a) = 0, because that causes division by zero.",
        "\\text{Vertical asymptote of }\\tfrac{1}{f}\\Rightarrow f(a)=?"
      ),
      countAnswer(
        "y11ext-ff-rsg-m5",
        "f(x) passes through (0, −4). What is [f(0)]²?",
        "f(0)=-4",
        "16",
        "[f(0)]² = (−4)² = 16."
      ),
      countAnswer(
        "y11ext-ff-rsg-m6",
        "f(x) passes through (3, −1). What is 1/f(3)?",
        "f(3)=-1",
        "-1",
        "1/f(3) = 1/(−1) = −1. This is an invariant point at y = −1."
      ),
      choice(
        "y11ext-ff-rsg-m7",
        "Near a zero of f(x), the graph of [f(x)]² behaves like:",
        "B",
        ["Crosses the x-axis like f(x) does", "Touches the x-axis and bounces", "Has a vertical asymptote", "Goes to infinity"],
        "Because [f(x)]² ≥ 0, the graph cannot cross the x-axis. At a zero of f it touches the axis with zero gradient and curves back upward.",
        "[f(x)]^2\\text{ near a zero of }f"
      ),
      countAnswer(
        "y11ext-ff-rsg-m8",
        "If the maximum value of f(x) on an interval is 5, what is the maximum value of [f(x)]² on the same interval?",
        "\\max f=5",
        "25",
        "[f(x)]² is maximised when |f(x)| is maximised. (5)² = 25."
      ),
      choice(
        "y11ext-ff-rsg-m9",
        "A student says '1/f(x) always has more features than f(x).' Which counterexample best challenges this claim?",
        "C",
        [
          "f(x) = x (no zeros on a bounded interval)",
          "f(x) = x² (zero at 0 adds one asymptote)",
          "f(x) = sin x (infinitely many zeros add infinitely many asymptotes)",
          "All are counterexamples",
        ],
        "f(x) = sin x has infinitely many zeros, so 1/f(x) has infinitely many vertical asymptotes, demonstrating the most dramatic growth in complexity. This is the clearest illustration that zeros of f can create abundant new features.",
        "\\text{Which }f\\text{ shows the most dramatic increase in features for }\\tfrac{1}{f}?"
      ),
      countAnswer(
        "y11ext-ff-rsg-m10",
        "f(x) takes values 3 at x=1, −2 at x=2, 0 at x=3, and 1 at x=4. How many invariant points for y = 1/f(x) are among these four x-values?",
        "f(1)=3,\\;f(2)=-2,\\;f(3)=0,\\;f(4)=1",
        "1",
        "Invariant points occur where f(x) = 1 or f(x) = −1. Only x = 4 satisfies this (f(4) = 1). At x = 3 the function is zero, which gives an asymptote, not an invariant point."
      ),
    ],
  };
}

export function year11ExtensionFurtherFunctionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-extension" || unit.slug !== "further-functions") {
    return null;
  }

  if (lesson.slug === "inverse-functions") {
    return inverseLesson(lesson);
  }

  if (lesson.slug === "parametric-equations") {
    return parametricLesson(lesson);
  }

  if (lesson.slug === "polynomial-division-remainder-functions") {
    return remainderLesson(lesson);
  }

  if (lesson.slug === "odd-even-functions-symmetry") {
    return symmetryLesson(lesson);
  }

  if (lesson.slug === "absolute-value-functions") {
    return absoluteLesson(lesson);
  }

  if (lesson.slug === "reciprocal-and-squared-function-graphs") {
    return reciprocalSquaredLesson(lesson);
  }

  return null;
}
