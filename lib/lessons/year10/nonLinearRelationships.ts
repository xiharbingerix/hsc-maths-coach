import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { CartesianGraph, CartesianPoint } from "../types";

function answer(
  id: string,
  prompt: string,
  latex: string,
  expected: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  // Plain integers → decimal form (e.g. 7 → 7.0)
  if (/^-?\d+$/.test(expected)) {
    autoVariants.push(`${expected}.0`);
  }

  // Decimal → one trailing zero (e.g. 1.25 → 1.250)
  if (/^-?\d*\.\d+$/.test(expected)) {
    autoVariants.push(`${expected}0`);
  }

  // Leading-zero decimal → no leading zero (e.g. 0.5 → .5)
  if (/^0\./.test(expected)) {
    autoVariants.push(expected.slice(1));
  }

  // Coordinate pairs like "(3, 4)" → compact and bare forms
  const coordMatch = expected.match(/^\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)$/);
  if (coordMatch) {
    autoVariants.push(`(${coordMatch[1]},${coordMatch[2]})`);
    autoVariants.push(`${coordMatch[1]}, ${coordMatch[2]}`);
    autoVariants.push(`${coordMatch[1]},${coordMatch[2]}`);
  }

  return {
    id,
    prompt,
    latex,
    answer: expected,
    acceptedAnswers: Array.from(new Set([expected, ...acceptedAnswers, ...autoVariants])),
    hint: "Use the defining feature of the graph family, then keep the final answer short.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  expected: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: expected,
    hint: "Match the equation, graph feature or context to the most accurate option.",
    explanation,
  };
}

const standardDomain = { xMin: -5, xMax: 5, yMin: -5, yMax: 7 };
const circleDomain = { xMin: -8, xMax: 8, yMin: -6, yMax: 6 };

function parabolaGraph(
  description: string,
  parabolas: NonNullable<CartesianGraph["parabolas"]>,
  points: CartesianPoint[] = [],
  domain = standardDomain
): CartesianGraph {
  return { description, ...domain, parabolas, points };
}

function circleGraph(
  description: string,
  circles: NonNullable<CartesianGraph["circles"]>,
  points: CartesianPoint[] = []
): CartesianGraph {
  return { description, ...circleDomain, circles, points, xStep: 2, yStep: 2 };
}

function curveGraph(
  description: string,
  branches: CartesianPoint[][],
  domain: Pick<CartesianGraph, "xMin" | "xMax" | "yMin" | "yMax" | "xStep" | "yStep">
): CartesianGraph {
  return {
    description,
    ...domain,
    points: branches.flat(),
    lineSegments: branches.flatMap((branch) =>
      branch.slice(1).map((point, index) => ({ from: branch[index], to: point }))
    ),
  };
}

const parabolaWorked: WorkedExample[] = [
  {
    title: "Read the vertex and axis of symmetry",
    questionLatex: "\\text{Describe the key features of }y=x^2.",
    cartesianGraph: parabolaGraph("Coordinate graph of y equals x squared with vertex at the origin.", [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y = x^2" }], [{ x: 0, y: 0, label: "(0, 0)" }]),
    steps: [
      { explanation: "The lowest point is the vertex.", latex: "\\text{vertex}=(0,0)" },
      { explanation: "The left and right sides mirror across the y-axis.", latex: "\\text{axis of symmetry: }x=0" },
    ],
    finalAnswerLatex: "\\text{vertex }(0,0),\\quad \\text{axis of symmetry }x=0",
  },
  {
    title: "Use the sign of the leading coefficient",
    questionLatex: "\\text{Compare }y=x^2\\text{ and }y=-x^2.",
    cartesianGraph: parabolaGraph("Coordinate graph comparing y equals x squared and y equals negative x squared.", [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y = x^2" }, { kind: "quadratic", a: -1, b: 0, c: 0, label: "y = -x^2" }], [], { xMin: -3, xMax: 3, yMin: -5, yMax: 5 }),
    steps: [{ explanation: "A positive coefficient opens upward. A negative coefficient opens downward.", latex: "a>0:\\ \\text{upward},\\quad a<0:\\ \\text{downward}" }],
    finalAnswerLatex: "y=x^2\\text{ opens upward; }y=-x^2\\text{ opens downward.}",
  },
  {
    title: "Recognise a vertical shift",
    questionLatex: "\\text{Describe the vertex of }y=x^2+2.",
    cartesianGraph: parabolaGraph("Coordinate graph of y equals x squared plus two with vertex at zero comma two.", [{ kind: "quadratic", a: 1, b: 0, c: 2, label: "y = x^2 + 2" }], [{ x: 0, y: 2, label: "(0, 2)" }]),
    steps: [{ explanation: "Adding 2 moves every y-value up by 2.", latex: "(0,0)\\rightarrow(0,2)" }],
    finalAnswerLatex: "\\text{vertex }(0,2)",
  },
];

const parabolaGuided: PracticeQuestion[] = [
  { ...choice("y10-nonlinear-intro-g1", "Which direction does the displayed parabola open?", "A", ["Upward", "Downward", "Left", "Right"], "The arms rise on both sides of the vertex."), cartesianGraph: parabolaGraph("Coordinate graph of y equals two x squared.", [{ kind: "quadratic", a: 2, b: 0, c: 0 }]) },
  answer("y10-nonlinear-intro-g2", "State the y-intercept.", "y=x^2+4", "4", "At x = 0, the graph has y-value 4.", ["(0,4)", "0,4", "(0, 4)"]),
  choice("y10-nonlinear-intro-g3", "Which equation has a parabola opening downward?", "C", ["$y=x^2$", "$y=2x^2+1$", "$y=-x^2+3$", "$y=x+3$"], "A negative coefficient of x squared gives a downward-opening parabola."),
  { ...answer("y10-nonlinear-intro-g4", "State the vertex of the displayed parabola.", "", "(0,2)", "The turning point is at zero comma two.", ["0,2", "(0, 2)", "0, 2"]), cartesianGraph: parabolaGraph("Coordinate graph of y equals x squared plus two.", [{ kind: "quadratic", a: 1, b: 0, c: 2 }], [{ x: 0, y: 2 }]) },
];

const parabolaIndependent: PracticeQuestion[] = [
  answer("y10-nonlinear-intro-i1", "State the y-intercept.", "y=-x^2+5", "5", "Set x to zero.", ["(0,5)", "0,5", "(0, 5)"]),
  choice("y10-nonlinear-intro-i2", "Which equation is a quadratic relationship?", "B", ["$y=3x+1$", "$y=2x^2-1$", "$y=4/x$", "$y=2^x$"], "A quadratic relationship contains an x-squared term."),
  choice("y10-nonlinear-intro-i3", "How does the graph change from y = x squared to y = 2x squared?", "D", ["It moves right", "It opens downward", "It becomes a line", "It becomes narrower"], "Doubling the positive coefficient makes y-values grow faster away from the vertex."),
  { ...choice("y10-nonlinear-intro-i4", "Which equation matches the displayed graph?", "C", ["$y=x^2$", "$y=x^2-2$", "$y=-x^2+2$", "$y=-x^2$"], "The graph opens downward and has vertex zero comma two."), cartesianGraph: parabolaGraph("Coordinate graph of a downward-opening parabola with vertex zero comma two.", [{ kind: "quadratic", a: -1, b: 0, c: 2 }], [{ x: 0, y: 2 }]) },
  answer("y10-nonlinear-intro-i5", "State the axis of symmetry.", "y=x^2-3", "x=0", "This basic parabola is symmetric about the y-axis.", ["0"]),
];

const parabolaMastery: PracticeQuestion[] = [
  choice("y10-nonlinear-intro-m1", "Which graph family contains y = x squared?", "B", ["Linear", "Quadratic", "Circular", "Reciprocal"], "A graph with an x-squared term is quadratic."),
  answer("y10-nonlinear-intro-m2", "State the vertex.", "y=x^2", "(0,0)", "The basic parabola turns at the origin.", ["0,0", "(0, 0)", "0, 0"]),
  choice("y10-nonlinear-intro-m3", "Which parabola opens downward?", "D", ["$y=x^2+4$", "$y=3x^2$", "$y=\\frac12x^2$", "$y=-2x^2+1$"], "Its x-squared coefficient is negative."),
  answer("y10-nonlinear-intro-m4", "State the y-intercept.", "y=x^2-6", "-6", "Set x to zero.", ["(0,-6)", "0,-6", "(0, -6)"]),
  choice("y10-nonlinear-intro-m5", "Which statement describes y = 3x squared compared with y = x squared?", "A", ["It is narrower", "It shifts left", "It shifts down", "It opens downward"], "The larger positive coefficient makes the arms steeper."),
  answer("y10-nonlinear-intro-m6", "State the vertex.", "y=-x^2+4", "(0,4)", "The turning point is at zero comma four.", ["0,4", "(0, 4)", "0, 4"]),
  choice("y10-nonlinear-intro-m7", "Which equation has vertex (0, -3) and opens upward?", "C", ["$y=-x^2-3$", "$y=x^2+3$", "$y=x^2-3$", "$y=3x^2$"], "Subtracting 3 shifts the upward-opening basic parabola down."),
  choice("y10-nonlinear-intro-m8", "A parabola has vertex (0, 2), opens downward and passes through (1, 1). Which equation matches it?", "B", ["$y=x^2+2$", "$y=-x^2+2$", "$y=-2x^2+2$", "$y=x^2-2$"], "The downward-opening rule with vertex two gives y = 1 when x = 1."),
  answer("y10-nonlinear-intro-m9", "A parabola follows y = ax squared and passes through (2, 8). Find a.", "y=ax^2,\\quad (2,8)", "2", "Substitute the point: 8 = 4a."),
  choice("y10-nonlinear-intro-m10", "Which statement must be true for y = ax squared + c when a is negative?", "D", ["The vertex is always the origin", "The y-intercept is always negative", "The graph has no axis of symmetry", "The graph opens downward"], "The sign of a controls the opening direction."),
];

const sketchWorked: WorkedExample[] = [
  {
    title: "Find intercepts before sketching",
    questionLatex: "\\text{Sketch }y=x^2-4.",
    cartesianGraph: parabolaGraph("Coordinate graph of y equals x squared minus four crossing the x-axis at negative two and two.", [{ kind: "quadratic", a: 1, b: 0, c: -4, label: "y = x^2 - 4" }], [{ x: -2, y: 0, label: "(-2, 0)" }, { x: 2, y: 0, label: "(2, 0)" }, { x: 0, y: -4, label: "(0, -4)" }], { xMin: -4, xMax: 4, yMin: -5, yMax: 6 }),
    steps: [
      { explanation: "Set y to zero and factorise.", latex: "0=x^2-4=(x-2)(x+2)" },
      { explanation: "The x-intercepts are symmetric around the y-axis.", latex: "x=-2,\\quad x=2" },
    ],
    finalAnswerLatex: "\\text{x-intercepts }(-2,0)\\text{ and }(2,0)",
  },
  {
    title: "Use a table of values",
    questionLatex: "\\text{Create points for }y=(x-2)^2.",
    cartesianGraph: parabolaGraph("Coordinate graph of y equals open bracket x minus two close bracket squared with vertex two comma zero.", [{ kind: "quadratic", a: 1, b: -4, c: 4, label: "y = (x - 2)^2" }], [{ x: 0, y: 4 }, { x: 1, y: 1 }, { x: 2, y: 0, label: "(2, 0)" }, { x: 3, y: 1 }, { x: 4, y: 4 }], { xMin: -1, xMax: 5, yMin: -1, yMax: 6 }),
    steps: [{ explanation: "Choose x-values around 2 and substitute.", latex: "\\begin{array}{c|ccccc}x&0&1&2&3&4\\\\y&4&1&0&1&4\\end{array}" }],
    finalAnswerLatex: "\\text{vertex }(2,0)",
  },
  {
    title: "Factorise to locate x-intercepts",
    questionLatex: "\\text{Find the x-intercepts of }y=x^2-2x-3.",
    cartesianGraph: parabolaGraph("Coordinate graph of y equals x squared minus two x minus three crossing at negative one and three.", [{ kind: "quadratic", a: 1, b: -2, c: -3, label: "y = x^2 - 2x - 3" }], [{ x: -1, y: 0, label: "(-1, 0)" }, { x: 3, y: 0, label: "(3, 0)" }], { xMin: -3, xMax: 5, yMin: -5, yMax: 7 }),
    steps: [{ explanation: "Set y to zero and factorise.", latex: "0=x^2-2x-3=(x-3)(x+1)" }],
    finalAnswerLatex: "x=-1,\\quad x=3",
  },
];

const sketchGuided: PracticeQuestion[] = [
  answer("y10-nonlinear-sketch-g1", "Find the y-intercept.", "y=x^2-4", "-4", "Set x to zero.", ["(0,-4)", "0,-4", "(0, -4)"]),
  choice("y10-nonlinear-sketch-g2", "Which pair gives the x-intercepts?", "A", ["$(-3,0)$ and $(3,0)$", "$(0,-3)$ and $(0,3)$", "$(-9,0)$ and $(9,0)$", "There are no x-intercepts"], "Factor x squared minus nine as a difference of squares.", "y=x^2-9"),
  { ...answer("y10-nonlinear-sketch-g3", "State the vertex of the displayed parabola.", "", "(2,0)", "The graph turns at two comma zero.", ["2,0", "(2, 0)", "2, 0"]), cartesianGraph: parabolaGraph("Coordinate graph of y equals open bracket x minus two close bracket squared.", [{ kind: "quadratic", a: 1, b: -4, c: 4 }], [{ x: 2, y: 0 }], { xMin: -1, xMax: 5, yMin: -1, yMax: 6 }) },
  answer("y10-nonlinear-sketch-g4", "Find the x-intercepts.", "y=(x-1)(x+4)", "x=1,-4", "Each factor can equal zero.", ["1,-4", "-4,1", "x=-4,1", "x=-4,x=1"]),
];

const sketchIndependent: PracticeQuestion[] = [
  answer("y10-nonlinear-sketch-i1", "Find the x-intercepts.", "y=x^2-16", "x=-4,4", "Use the difference of squares.", ["-4,4", "x=-4,x=4", "x=4,-4"]),
  choice("y10-nonlinear-sketch-i2", "Which table row is correct for y = x squared - 1 when x is -1, 0, 1?", "B", ["$1,0,1$", "$0,-1,0$", "$-2,-1,0$", "$2,1,2$"], "Substituting gives zero, negative one, zero."),
  { ...choice("y10-nonlinear-sketch-i3", "Which equation matches the displayed graph?", "D", ["$y=x^2+4$", "$y=-x^2+4$", "$y=(x+2)^2$", "$y=x^2-4$"], "The parabola opens upward and crosses at negative two and two."), cartesianGraph: parabolaGraph("Coordinate graph of an upward-opening parabola with x-intercepts negative two and two.", [{ kind: "quadratic", a: 1, b: 0, c: -4 }], [{ x: -2, y: 0 }, { x: 2, y: 0 }], { xMin: -4, xMax: 4, yMin: -5, yMax: 6 }) },
  answer("y10-nonlinear-sketch-i4", "Find the y-intercept.", "y=x^2+3x-4", "-4", "Set x to zero.", ["(0,-4)", "0,-4", "(0, -4)"]),
  choice("y10-nonlinear-sketch-i5", "Why is a table with x-values on both sides of the vertex useful?", "C", ["It changes the equation", "It removes the y-intercept", "It shows the symmetry of the parabola", "It makes every y-value negative"], "Points on both sides reveal the mirrored shape."),
];

const sketchMastery: PracticeQuestion[] = [
  answer("y10-nonlinear-sketch-m1", "Find the y-intercept.", "y=x^2+2x-3", "-3", "Set x to zero.", ["(0,-3)", "0,-3"]),
  answer("y10-nonlinear-sketch-m2", "Find the x-intercepts.", "y=x^2-25", "x=-5,5", "Use the difference of squares.", ["-5,5", "x=-5,x=5", "x=5,-5"]),
  choice("y10-nonlinear-sketch-m3", "Which equation has x-intercepts -2 and 4?", "C", ["$y=(x-2)(x+4)$", "$y=(x+2)(x+4)$", "$y=(x+2)(x-4)$", "$y=(x-2)(x-4)$"], "The factors are x plus two and x minus four."),
  answer("y10-nonlinear-sketch-m4", "Find the y-value when x = 2.", "y=x^2-3x+1", "-1", "Substitute two."),
  choice("y10-nonlinear-sketch-m5", "Which feature can always be found by setting x = 0?", "B", ["Axis of symmetry", "y-intercept", "Both x-intercepts", "Opening direction"], "A point on the y-axis has x-coordinate zero."),
  answer("y10-nonlinear-sketch-m6", "Find the x-intercepts.", "y=(x-3)(x+5)", "x=3,-5", "Set each factor to zero.", ["3,-5", "-5,3", "x=-5,x=3"]),
  choice("y10-nonlinear-sketch-m7", "A parabola crosses the x-axis at -1 and 3. Which axis of symmetry is consistent with the graph?", "A", ["$x=1$", "$x=2$", "$x=-1$", "$x=3$"], "The axis lies halfway between the intercepts."),
  answer("y10-nonlinear-sketch-m8", "A parabola has x-intercepts -2 and 5. Find the x-coordinate of its axis of symmetry.", "x=\\frac{-2+5}{2}", "1.5", "The axis lies halfway between the intercepts.", ["x=1.5", "3/2"]),
  choice("y10-nonlinear-sketch-m9", "A parabola opens upward, has x-intercepts -3 and 1, and y-intercept -3. Which rule matches?", "B", ["$y=(x-3)(x+1)$", "$y=(x+3)(x-1)$", "$y=-(x+3)(x-1)$", "$y=x^2-3$"], "The factors give the stated intercepts, and substituting zero gives negative three."),
  choice("y10-nonlinear-sketch-m10", "A sketch of y = x squared - 2x - 3 must include which three points?", "D", ["$(0,3),(-1,0),(3,0)$", "$(0,-3),(1,0),(-3,0)$", "$(0,-2),(-1,0),(3,0)$", "$(0,-3),(-1,0),(3,0)$"], "The y-intercept is negative three and the factorised form gives x-intercepts negative one and three."),
];

const circleWorked: WorkedExample[] = [
  {
    title: "Read the radius from a circle equation",
    questionLatex: "\\text{Describe the circle }x^2+y^2=9.",
    cartesianGraph: circleGraph("Coordinate graph of a circle centred at the origin with radius three.", [{ h: 0, k: 0, r: 3, label: "x^2 + y^2 = 9" }], [{ x: 3, y: 0 }, { x: -3, y: 0 }, { x: 0, y: 3 }, { x: 0, y: -3 }]),
    steps: [{ explanation: "The radius is the square root of the number on the right.", latex: "r=\\sqrt{9}=3" }],
    finalAnswerLatex: "\\text{centre }(0,0),\\quad r=3",
  },
  {
    title: "Find the intercepts",
    questionLatex: "\\text{Find the axis intercepts of }x^2+y^2=16.",
    cartesianGraph: circleGraph("Coordinate graph of a circle centred at the origin with radius four.", [{ h: 0, k: 0, r: 4, label: "x^2 + y^2 = 16" }], [{ x: 4, y: 0 }, { x: -4, y: 0 }, { x: 0, y: 4 }, { x: 0, y: -4 }]),
    steps: [{ explanation: "A radius of 4 reaches four units from the origin in each axis direction.", latex: "(\\pm4,0),\\quad(0,\\pm4)" }],
    finalAnswerLatex: "(4,0),\\ (-4,0),\\ (0,4),\\ (0,-4)",
  },
  {
    title: "Interpret a translated circle",
    questionLatex: "\\text{Describe }(x-2)^2+(y+1)^2=9.",
    cartesianGraph: circleGraph("Coordinate graph of a circle centred at two comma negative one with radius three.", [{ h: 2, k: -1, r: 3, label: "(x - 2)^2 + (y + 1)^2 = 9" }], [{ x: 2, y: -1, label: "(2, -1)" }]),
    steps: [{ explanation: "The signs inside the brackets are opposite to the centre coordinates.", latex: "(h,k)=(2,-1),\\quad r=3" }],
    finalAnswerLatex: "\\text{centre }(2,-1),\\quad r=3",
  },
];

const circleGuided: PracticeQuestion[] = [
  answer("y10-nonlinear-circle-g1", "Find the radius.", "x^2+y^2=25", "5", "The radius is the square root of 25."),
  choice("y10-nonlinear-circle-g2", "Which point lies on the circle?", "B", ["$(2,2)$", "$(0,4)$", "$(4,4)$", "$(5,0)$"], "Zero squared plus four squared equals sixteen.", "x^2+y^2=16"),
  { ...answer("y10-nonlinear-circle-g3", "State the radius of the displayed circle.", "", "3", "The circle reaches three units from the origin."), cartesianGraph: circleGraph("Coordinate graph of a circle centred at the origin with radius three.", [{ h: 0, k: 0, r: 3 }]) },
  answer("y10-nonlinear-circle-g4", "State the centre.", "(x-2)^2+(y+1)^2=9", "(2,-1)", "Reverse the signs inside the brackets.", ["2,-1", "(2, -1)", "2, -1"]),
];

const circleIndependent: PracticeQuestion[] = [
  answer("y10-nonlinear-circle-i1", "Find the radius.", "x^2+y^2=49", "7", "Take the square root of 49."),
  choice("y10-nonlinear-circle-i2", "Which equation represents a circle of radius 6 centred at the origin?", "C", ["$x^2+y^2=6$", "$x+y=36$", "$x^2+y^2=36$", "$x^2-y^2=36$"], "The number on the right is radius squared."),
  answer("y10-nonlinear-circle-i3", "State the positive x-intercept.", "x^2+y^2=64", "(8,0)", "The positive x-axis point is eight units from the origin.", ["8,0", "(8, 0)", "8, 0"]),
  { ...choice("y10-nonlinear-circle-i4", "Which description matches the displayed circle?", "D", ["Centre (0, 0), radius 9", "Centre (-2, 1), radius 3", "Centre (2, -1), radius 9", "Centre (2, -1), radius 3"], "The graph shows centre two comma negative one and radius three."), cartesianGraph: circleGraph("Coordinate graph of a circle centred at two comma negative one with radius three.", [{ h: 2, k: -1, r: 3 }], [{ x: 2, y: -1 }]) },
  choice("y10-nonlinear-circle-i5", "Which point is outside the circle?", "A", ["$(4,4)$", "$(3,0)$", "$(0,-3)$", "$(-2,2)$"], "Four squared plus four squared is greater than nine.", "x^2+y^2=9"),
];

const circleMastery: PracticeQuestion[] = [
  answer("y10-nonlinear-circle-m1", "Find the radius.", "x^2+y^2=36", "6", "Take the square root of 36."),
  choice("y10-nonlinear-circle-m2", "Which point lies on the circle?", "A", ["$(3,4)$", "$(4,4)$", "$(5,5)$", "$(0,4)$"], "Three squared plus four squared equals 25.", "x^2+y^2=25"),
  answer("y10-nonlinear-circle-m3", "State the centre.", "(x+3)^2+(y-2)^2=16", "(-3,2)", "Reverse the bracket signs.", ["-3,2", "(-3, 2)", "-3, 2"]),
  answer("y10-nonlinear-circle-m4", "State the radius.", "(x-1)^2+(y+4)^2=49", "7", "The radius is the square root of 49."),
  choice("y10-nonlinear-circle-m5", "Which equation has centre (2, -1) and radius 4?", "B", ["$(x+2)^2+(y-1)^2=16$", "$(x-2)^2+(y+1)^2=16$", "$(x-2)^2+(y+1)^2=4$", "$(x+2)^2+(y-1)^2=4$"], "Use opposite signs in the brackets and radius squared on the right."),
  answer("y10-nonlinear-circle-m6", "State the positive y-intercept.", "x^2+y^2=81", "(0,9)", "The radius is 9.", ["0,9", "(0, 9)", "0, 9"]),
  choice("y10-nonlinear-circle-m7", "Which point is inside the circle?", "D", ["$(5,0)$", "$(4,4)$", "$(0,-5)$", "$(2,3)$"], "Two squared plus three squared is less than sixteen.", "x^2+y^2=16"),
  choice("y10-nonlinear-circle-m8", "A circle centred at the origin passes through (6, 8). Which equation represents it?", "C", ["$x^2+y^2=14$", "$x^2+y^2=50$", "$x^2+y^2=100$", "$x^2+y^2=196$"], "The radius is 10 by Pythagoras, so radius squared is 100."),
  answer("y10-nonlinear-circle-m9", "A circle follows x squared plus y squared equals r squared and contains the point (5, 12). Find r.", "x^2+y^2=r^2,\\quad (5,12)", "13", "Use Pythagoras: the radius is 13."),
  choice("y10-nonlinear-circle-m10", "A translated circle has centre (-2, 3) and passes through (1, 3). Which equation matches?", "A", ["$(x+2)^2+(y-3)^2=9$", "$(x-2)^2+(y+3)^2=9$", "$(x+2)^2+(y-3)^2=3$", "$x^2+y^2=9$"], "The radius is 3 and the centre controls the bracket signs."),
];

const exponentialPoints = [{ x: -2, y: 0.25 }, { x: -1, y: 0.5 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 8 }];
const decayPoints = [{ x: -2, y: 4 }, { x: -1, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0.5 }, { x: 2, y: 0.25 }, { x: 3, y: 0.125 }];

const exponentialWorked: WorkedExample[] = [
  {
    title: "Recognise exponential growth",
    questionLatex: "\\text{Describe the pattern in }y=2^x.",
    cartesianGraph: curveGraph("Coordinate graph approximating y equals two to the power of x through labelled sample points.", [exponentialPoints], { xMin: -3, xMax: 4, yMin: 0, yMax: 9, xStep: 1, yStep: 1 }),
    steps: [{ explanation: "Each increase of 1 in x multiplies the output by 2.", latex: "1,\\ 2,\\ 4,\\ 8" }],
    finalAnswerLatex: "\\text{exponential growth with base }2",
  },
  {
    title: "Recognise exponential decay",
    questionLatex: "\\text{Describe }y=\\left(\\frac12\\right)^x.",
    cartesianGraph: curveGraph("Coordinate graph approximating y equals one half to the power of x through sample points.", [decayPoints], { xMin: -3, xMax: 4, yMin: 0, yMax: 5, xStep: 1, yStep: 1 }),
    steps: [{ explanation: "Each increase of 1 in x multiplies the output by one half.", latex: "1,\\ \\frac12,\\ \\frac14" }],
    finalAnswerLatex: "\\text{exponential decay with base }\\frac12",
  },
  {
    title: "Find an exponential y-intercept",
    questionLatex: "\\text{Find the y-intercept of }y=3\\cdot2^x.",
    steps: [{ explanation: "Set x to zero. Any non-zero base to the power zero equals 1.", latex: "y=3\\cdot2^0=3" }],
    finalAnswerLatex: "(0,3)",
  },
];

const exponentialGuided: PracticeQuestion[] = [
  choice("y10-nonlinear-exp-g1", "Which rule represents exponential growth?", "A", ["$y=3^x$", "$y=(1/3)^x$", "$y=3x$", "$y=x^3$"], "A base greater than one gives exponential growth."),
  answer("y10-nonlinear-exp-g2", "Find the y-intercept.", "y=5\\cdot2^x", "(0,5)", "Set x to zero.", ["0,5", "(0, 5)", "5"]),
  { ...choice("y10-nonlinear-exp-g3", "Does the displayed graph show growth or decay?", "B", ["Growth", "Decay", "A straight line", "A circle"], "The output decreases as x increases."), cartesianGraph: curveGraph("Coordinate graph approximating exponential decay through sample points.", [decayPoints], { xMin: -3, xMax: 4, yMin: 0, yMax: 5, xStep: 1, yStep: 1 }) },
  answer("y10-nonlinear-exp-g4", "Find the value when x = 3.", "y=2^x,\\quad x=3", "8", "Two cubed is eight."),
];

const exponentialIndependent: PracticeQuestion[] = [
  choice("y10-nonlinear-exp-i1", "Which base produces exponential decay?", "C", ["2", "5", "$\\frac14$", "10"], "A positive base between zero and one gives decay."),
  answer("y10-nonlinear-exp-i2", "Find the value when x = 2.", "y=3\\cdot2^x,\\quad x=2", "12", "Three times four equals twelve."),
  answer("y10-nonlinear-exp-i3", "State the y-intercept.", "y=4\\left(\\frac12\\right)^x", "(0,4)", "At x equals zero, the power equals one.", ["0,4", "(0, 4)", "4"]),
  { ...choice("y10-nonlinear-exp-i4", "Which rule matches the displayed sample points?", "D", ["$y=x+1$", "$y=x^2$", "$y=(1/2)^x$", "$y=2^x$"], "The values double for each increase of one in x."), cartesianGraph: curveGraph("Coordinate graph approximating exponential growth through sample points.", [exponentialPoints], { xMin: -3, xMax: 4, yMin: 0, yMax: 9, xStep: 1, yStep: 1 }) },
  choice("y10-nonlinear-exp-i5", "Which statement is true for y = 7 times 3 to the power of x?", "B", ["The y-intercept is 3", "The y-intercept is 7", "The graph shows decay", "The graph is linear"], "At x equals zero, the exponential factor is one."),
];

const exponentialMastery: PracticeQuestion[] = [
  choice("y10-nonlinear-exp-m1", "Which rule is exponential?", "D", ["$y=4x$", "$y=x^2$", "$y=4/x$", "$y=4^x$"], "The variable is in the exponent."),
  answer("y10-nonlinear-exp-m2", "Find the value when x = 3.", "y=3^x,\\quad x=3", "27", "Three cubed is twenty-seven."),
  choice("y10-nonlinear-exp-m3", "Which rule represents decay?", "A", ["$y=(1/2)^x$", "$y=2^x$", "$y=x/2$", "$y=x^2/2$"], "A base between zero and one gives decay."),
  answer("y10-nonlinear-exp-m4", "State the y-intercept.", "y=6\\cdot4^x", "(0,6)", "Set x to zero.", ["0,6", "(0, 6)", "6"]),
  answer("y10-nonlinear-exp-m5", "Find the value when x = 2.", "y=5\\left(\\frac12\\right)^x,\\quad x=2", "1.25", "Multiply five by one quarter."),
  choice("y10-nonlinear-exp-m6", "A quantity doubles every hour. Which base should appear in an exponential model?", "C", ["$\\frac12$", "1", "2", "10"], "Doubling uses growth factor two."),
  answer("y10-nonlinear-exp-m7", "A rule is y = a times 2 to the power of x and its y-intercept is (0, 7). Find a.", "y=a\\cdot2^x,\\quad (0,7)", "7", "At x equals zero, the exponential factor is one."),
  choice("y10-nonlinear-exp-m8", "A graph passes through (0, 3), (1, 6) and (2, 12). Which rule matches?", "B", ["$y=3x+3$", "$y=3\\cdot2^x$", "$y=2\\cdot3^x$", "$y=x^2+3$"], "The initial value is three and the outputs double."),
  answer("y10-nonlinear-exp-m9", "A model follows y = 4 times b to the power of x and passes through (1, 12). Find b.", "y=4b^x,\\quad (1,12)", "3", "At x equals one, twelve equals four times b."),
  choice("y10-nonlinear-exp-m10", "Model A starts at 8 and doubles each step. Model B starts at 20 and grows by 5 each step. Which statement is safest?", "D", ["Model A is always larger", "Model B is always larger", "The models are both linear", "Model A can eventually overtake Model B"], "Repeated multiplication can eventually exceed constant additive growth."),
];

const reciprocalPositive = [[{ x: -4, y: -1 }, { x: -2, y: -2 }, { x: -1, y: -4 }], [{ x: 1, y: 4 }, { x: 2, y: 2 }, { x: 4, y: 1 }]];
const reciprocalNegative = [[{ x: -4, y: 1 }, { x: -2, y: 2 }, { x: -1, y: 4 }], [{ x: 1, y: -4 }, { x: 2, y: -2 }, { x: 4, y: -1 }]];

const hyperbolaWorked: WorkedExample[] = [
  {
    title: "Read the branches of a reciprocal graph",
    questionLatex: "\\text{Describe the graph of }y=\\frac4x.",
    cartesianGraph: curveGraph("Coordinate graph approximating y equals four divided by x with separate branches in quadrants one and three.", reciprocalPositive, { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }),
    steps: [{ explanation: "Positive x-values give positive y-values, while negative x-values give negative y-values.", latex: "\\text{branches in quadrants I and III}" }],
    finalAnswerLatex: "\\text{two branches approaching }x=0\\text{ and }y=0",
  },
  {
    title: "Explain the undefined value",
    questionLatex: "\\text{Why is }y=\\frac1x\\text{ undefined at }x=0?",
    steps: [{ explanation: "Division by zero is not defined.", latex: "\\frac10\\text{ is undefined}" }],
    finalAnswerLatex: "x=0\\text{ is excluded}",
  },
  {
    title: "Use the sign of k",
    questionLatex: "\\text{Describe the branch locations for }y=-\\frac4x.",
    cartesianGraph: curveGraph("Coordinate graph approximating y equals negative four divided by x with separate branches in quadrants two and four.", reciprocalNegative, { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }),
    steps: [{ explanation: "The output has the opposite sign to the input.", latex: "\\text{branches in quadrants II and IV}" }],
    finalAnswerLatex: "\\text{branches in quadrants II and IV}",
  },
];

const hyperbolaGuided: PracticeQuestion[] = [
  answer("y10-nonlinear-hyp-g1", "Find the y-value when x = 2.", "y=\\frac4x,\\quad x=2", "2", "Four divided by two is two."),
  choice("y10-nonlinear-hyp-g2", "Which x-value is excluded?", "C", ["-1", "1", "0", "4"], "Division by zero is undefined.", "y=\\frac4x"),
  { ...choice("y10-nonlinear-hyp-g3", "Which quadrants contain the displayed branches?", "A", ["I and III", "II and IV", "I and II", "III and IV"], "Positive k gives outputs with the same sign as the inputs."), cartesianGraph: curveGraph("Coordinate graph approximating y equals four divided by x with branches in quadrants one and three.", reciprocalPositive, { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }) },
  choice("y10-nonlinear-hyp-g4", "Which statement describes the axes for a reciprocal graph?", "D", ["The graph crosses both axes", "Only the x-axis is crossed", "Only the y-axis is crossed", "The graph approaches both axes without crossing them"], "The axes act as asymptotes."),
];

const hyperbolaIndependent: PracticeQuestion[] = [
  answer("y10-nonlinear-hyp-i1", "Find the y-value when x = -2.", "y=\\frac6x,\\quad x=-2", "-3", "Six divided by negative two is negative three."),
  choice("y10-nonlinear-hyp-i2", "Which rule has branches in quadrants II and IV?", "B", ["$y=3/x$", "$y=-3/x$", "$y=3x$", "$y=x^2$"], "A negative reciprocal constant gives opposite signs."),
  choice("y10-nonlinear-hyp-i3", "Which point lies on the graph?", "A", ["$(2,3)$", "$(3,3)$", "$(0,6)$", "$(-2,3)$"], "Two times three equals six.", "y=\\frac6x"),
  { ...choice("y10-nonlinear-hyp-i4", "Which rule matches the displayed branches?", "C", ["$y=x^2$", "$y=4x$", "$y=-4/x$", "$y=4/x$"], "Branches in quadrants two and four match a negative reciprocal constant."), cartesianGraph: curveGraph("Coordinate graph approximating y equals negative four divided by x.", reciprocalNegative, { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }) },
  answer("y10-nonlinear-hyp-i5", "Find the value of k.", "y=\\frac{k}{x},\\quad (3,4)", "12", "Substitute the point: four equals k divided by three."),
];

const hyperbolaMastery: PracticeQuestion[] = [
  choice("y10-nonlinear-hyp-m1", "Which rule is reciprocal?", "B", ["$y=2x$", "$y=2/x$", "$y=x^2$", "$y=2^x$"], "A reciprocal rule divides a constant by x."),
  answer("y10-nonlinear-hyp-m2", "Find the y-value when x = 4.", "y=\\frac8x,\\quad x=4", "2", "Eight divided by four is two."),
  choice("y10-nonlinear-hyp-m3", "Which value is excluded from y = 9 divided by x?", "A", ["0", "1", "9", "-9"], "The denominator cannot be zero."),
  choice("y10-nonlinear-hyp-m4", "For positive k, which quadrants contain y = k divided by x?", "D", ["I and II", "II and III", "II and IV", "I and III"], "Input and output have the same sign."),
  answer("y10-nonlinear-hyp-m5", "Find the y-value when x = -3.", "y=-\\frac{12}{x},\\quad x=-3", "4", "Negative twelve divided by negative three is four."),
  choice("y10-nonlinear-hyp-m6", "What happens to y = 4 divided by x as positive x-values become very large?", "C", ["The values grow rapidly", "The values become negative", "The values approach zero", "The values equal four"], "Four divided by larger positive values becomes closer to zero."),
  answer("y10-nonlinear-hyp-m7", "Find k if the graph y = k divided by x passes through (2, 5).", "y=\\frac{k}{x},\\quad (2,5)", "10", "Substitute the point to get five equals k divided by two."),
  choice("y10-nonlinear-hyp-m8", "A reciprocal graph passes through (-3, 4). Which rule matches?", "A", ["$y=-12/x$", "$y=12/x$", "$y=-7/x$", "$y=x/12$"], "Multiply the coordinates to find k = -12."),
  answer("y10-nonlinear-hyp-m9", "A graph follows y = 18 divided by x. Find x when y = 3.", "y=\\frac{18}{x},\\quad y=3", "6", "Solve three equals eighteen divided by x."),
  choice("y10-nonlinear-hyp-m10", "Which comparison is correct?", "B", ["Both y = 2 to the power of x and y = 2 divided by x are defined at x = 0", "Only y = 2 to the power of x is defined at x = 0", "Only y = 2 divided by x is defined at x = 0", "Neither rule is defined at x = 0"], "The reciprocal rule is undefined at zero, while two to the power zero equals one."),
];

function mistakes(topic: "intro" | "sketch" | "circle" | "exponential" | "hyperbola") {
  return {
    intro: [
      { mistake: "Treating a parabola as a straight line.", fix: "A quadratic graph curves and has a turning point." },
      { mistake: "Ignoring the sign of the x-squared coefficient.", fix: "A positive coefficient opens upward and a negative coefficient opens downward." },
      { mistake: "Calling the y-intercept the axis of symmetry.", fix: "The y-intercept is a point. The axis of symmetry is a vertical line." },
      { mistake: "Assuming every parabola has vertex at the origin.", fix: "Vertical shifts move the vertex up or down." },
    ],
    sketch: [
      { mistake: "Plotting points from only one side of the vertex.", fix: "Choose x-values on both sides to show the symmetric shape." },
      { mistake: "Finding x-intercepts by setting x to zero.", fix: "Set y to zero when finding x-intercepts." },
      { mistake: "Forgetting to factorise a difference of squares.", fix: "Use the two factors to locate simple symmetric intercepts." },
      { mistake: "Drawing a sharp corner at the vertex.", fix: "A parabola is a smooth curve." },
    ],
    circle: [
      { mistake: "Using the number on the right as the radius.", fix: "The right side is radius squared, so take the square root." },
      { mistake: "Drawing a circle with unequal horizontal and vertical radii.", fix: "A circle reaches the same distance from its centre in every direction." },
      { mistake: "Copying bracket signs directly into the centre.", fix: "The centre coordinates use the opposite signs." },
      { mistake: "Testing a point without squaring both coordinates.", fix: "Substitute into the full circle equation." },
    ],
    exponential: [
      { mistake: "Treating exponential growth as repeated addition.", fix: "Exponential change multiplies by the same factor each step." },
      { mistake: "Assuming every exponential rule shows growth.", fix: "A positive base between zero and one gives decay." },
      { mistake: "Forgetting that a non-zero number to the power zero is one.", fix: "Use this fact to find the y-intercept." },
      { mistake: "Confusing x squared with two to the power x.", fix: "In an exponential rule, the variable is in the exponent." },
    ],
    hyperbola: [
      { mistake: "Substituting zero into the denominator.", fix: "Division by zero is undefined, so x equals zero is excluded." },
      { mistake: "Joining the two branches across an axis.", fix: "The graph approaches the axes but does not cross them." },
      { mistake: "Ignoring the sign of k.", fix: "The sign of k controls which opposite quadrants contain the branches." },
      { mistake: "Treating k divided by x as k times x.", fix: "Substitute into the denominator carefully." },
    ],
  }[topic];
}

export function year10NonLinearRelationshipsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) || !["parabolas-rates-variation", "functions-polynomials-graphs", "indices-exponentials-logarithms"].includes(unit.slug)) return null;
  const base = { syllabusArea: "Number and Algebra", masteryPassMark: 0.8 };

  if (lesson.slug === "introduction-to-parabolas") return {
    ...base, description: "Recognise basic parabola features including vertex, symmetry, opening direction and y-intercept.", learningIntention: "Describe the features of basic quadratic graphs.", successCriteria: ["Recognise a parabola.", "Identify a vertex and axis of symmetry.", "Use the sign of the x-squared coefficient.", "Read a y-intercept."], teaching: { paragraphs: ["A quadratic graph is called a parabola. It is a smooth curve with a turning point called the vertex.", "The axis of symmetry is the vertical line through the vertex.", "For a basic quadratic rule, the sign of the x-squared coefficient controls whether the graph opens upward or downward.", "Adding a constant shifts the graph vertically and changes the y-intercept."], latexBlocks: ["y=ax^2+c", "a>0:\\ \\text{opens upward},\\qquad a<0:\\ \\text{opens downward}"] }, workedExamples: parabolaWorked, guidedPractice: parabolaGuided, independentPractice: parabolaIndependent, commonMistakes: mistakes("intro"), masteryQuiz: parabolaMastery,
  };
  if (lesson.slug === "sketching-parabolas") return {
    ...base, description: "Sketch simple parabolas using tables, symmetry, y-intercepts and factorised x-intercepts.", learningIntention: "Use key points and symmetry to sketch simple parabolas.", successCriteria: ["Create a useful table of values.", "Find a y-intercept.", "Find simple x-intercepts by factorising.", "Use symmetry to check a sketch."], teaching: { paragraphs: ["A good parabola sketch begins with key points rather than guesswork.", "A table of values helps you plot points on both sides of the turning point.", "The y-intercept is found by setting x to zero. Simple x-intercepts are found by setting y to zero and factorising.", "The two sides of the parabola should mirror across its axis of symmetry."], latexBlocks: ["\\text{y-intercept: set }x=0", "\\text{x-intercepts: set }y=0"] }, workedExamples: sketchWorked, guidedPractice: sketchGuided, independentPractice: sketchIndependent, commonMistakes: mistakes("sketch"), masteryQuiz: sketchMastery,
  };
  if (lesson.slug === "circle-graphs") return {
    ...base, description: "Interpret circle equations using centre, radius and intercepts.", learningIntention: "Connect simple circle equations with their graphs.", successCriteria: ["Read the radius of an origin-centred circle.", "Find axis intercepts.", "Test whether a point lies on a circle.", "Interpret a simple translated circle."], teaching: { paragraphs: ["A circle contains every point that is the same distance from its centre.", "For a circle centred at the origin, the equation uses radius squared on the right.", "The axis intercepts of an origin-centred circle are one radius away from the origin.", "A translated circle uses brackets to show the centre. The signs inside the brackets are opposite to the centre coordinates."], latexBlocks: ["x^2+y^2=r^2", "(x-h)^2+(y-k)^2=r^2"] }, workedExamples: circleWorked, guidedPractice: circleGuided, independentPractice: circleIndependent, commonMistakes: mistakes("circle"), masteryQuiz: circleMastery,
  };
  if (lesson.slug === "exponential-functions") return {
    ...base, description: "Recognise introductory exponential growth and decay rules using tables, points and simple graphs.", learningIntention: "Interpret simple exponential functions without logarithms.", successCriteria: ["Recognise the variable in the exponent.", "Distinguish growth from decay.", "Find an exponential y-intercept.", "Use a growth or decay factor."], teaching: { paragraphs: ["An exponential rule has the variable in the exponent. Its outputs change by repeated multiplication.", "A base greater than one produces growth. A positive base between zero and one produces decay.", "At x equals zero, the exponential factor equals one. This makes the y-intercept straightforward to find.", "Exponential growth can eventually increase faster than a linear model because the change compounds."], latexBlocks: ["y=a\\cdot b^x", "b>1:\\ \\text{growth},\\qquad 0<b<1:\\ \\text{decay}", "b^0=1"] }, workedExamples: exponentialWorked, guidedPractice: exponentialGuided, independentPractice: exponentialIndependent, commonMistakes: mistakes("exponential"), masteryQuiz: exponentialMastery,
  };
  if (lesson.slug === "hyperbolas") return {
    ...base, description: "Interpret reciprocal graphs, excluded values, asymptotes and branch locations.", learningIntention: "Describe simple reciprocal graphs of the form y = k divided by x.", successCriteria: ["Recognise a reciprocal rule.", "Explain why x cannot equal zero.", "Identify branch quadrants from the sign of k.", "Find a simple missing value or parameter."], teaching: { paragraphs: ["A reciprocal graph has two curved branches and is often called a hyperbola.", "The rule is undefined at x equals zero because division by zero is not defined.", "The branches approach the axes without crossing them. These axes are asymptotes.", "For positive k, the branches are in quadrants one and three. For negative k, they are in quadrants two and four."], latexBlocks: ["y=\\frac{k}{x}", "x\\ne0", "x=0\\text{ and }y=0\\text{ are asymptotes}"] }, workedExamples: hyperbolaWorked, guidedPractice: hyperbolaGuided, independentPractice: hyperbolaIndependent, commonMistakes: mistakes("hyperbola"), masteryQuiz: hyperbolaMastery,
  };
  return null;
}
