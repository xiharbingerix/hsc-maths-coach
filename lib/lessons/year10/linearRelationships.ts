import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { CartesianGraph } from "../types";

function linearAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  // Plain integers → decimal form (e.g. 5 → 5.0)
  if (/^-?\d+$/.test(answer)) {
    autoVariants.push(`${answer}.0`);
  }

  // Decimals → one trailing zero (e.g. 7.07 → 7.070)
  if (/^-?\d*\.\d+$/.test(answer)) {
    autoVariants.push(`${answer}0`);
  }

  // Leading-zero decimal → no leading zero (e.g. 0.5 → .5)
  if (/^0\./.test(answer)) {
    autoVariants.push(answer.slice(1));
  }

  // Coordinate pairs like "(3, 4)" → compact and bare forms
  const coordMatch = answer.match(
    /^\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)$/
  );
  if (coordMatch) {
    autoVariants.push(`(${coordMatch[1]},${coordMatch[2]})`);
    autoVariants.push(`${coordMatch[1]}, ${coordMatch[2]}`);
    autoVariants.push(`${coordMatch[1]},${coordMatch[2]}`);
  }

  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...autoVariants])),
    hint: "Identify the linear relationship or coordinate formula, then calculate carefully.",
    explanation,
  };
}

function linearChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer,
    hint: "Match the graph or equation to the linear rule being tested.",
    explanation,
  };
}

function lineGraph(
  description: string,
  lines: NonNullable<CartesianGraph["lines"]>,
  points: NonNullable<CartesianGraph["points"]> = [],
  domain: Pick<CartesianGraph, "xMin" | "xMax" | "yMin" | "yMax" | "xStep" | "yStep"> = {
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
  }
): CartesianGraph {
  return { description, ...domain, lines, points };
}

function segmentGraph(
  description: string,
  from: { x: number; y: number; label?: string },
  to: { x: number; y: number; label?: string },
  extraPoints: NonNullable<CartesianGraph["points"]> = [],
  domain = { xMin: -1, xMax: 7, yMin: -1, yMax: 7 }
): CartesianGraph {
  return {
    description,
    ...domain,
    points: [from, to, ...extraPoints],
    lineSegments: [{ from, to }],
  };
}

const gradientWorked: WorkedExample[] = [
  {
    title: "Read gradient and y-intercept from a graph",
    questionLatex: "\\text{The displayed line follows }y=2x+1.\\text{ State its gradient and y-intercept.}",
    cartesianGraph: lineGraph("Coordinate graph of the line y equals 2x plus 1.", [{ kind: "linear", m: 2, b: 1, label: "y = 2x + 1" }], [{ x: 0, y: 1 }, { x: 1, y: 3 }]),
    steps: [
      { explanation: "The gradient is the change in y divided by the change in x.", latex: "m=\\frac{3-1}{1-0}=2" },
      { explanation: "The line crosses the y-axis at 1.", latex: "b=1" },
    ],
    finalAnswerLatex: "m=2,\\quad b=1",
  },
  {
    title: "Identify a negative gradient",
    questionLatex: "\\text{Find the gradient of the line through }(0,3)\\text{ and }(2,-1).",
    cartesianGraph: lineGraph("Coordinate graph of a decreasing straight line through zero comma three and two comma negative one.", [{ kind: "linear", m: -2, b: 3 }], [{ x: 0, y: 3, label: "(0, 3)" }, { x: 2, y: -1, label: "(2, -1)" }]),
    steps: [{ explanation: "Use rise over run.", latex: "m=\\frac{-1-3}{2-0}=\\frac{-4}{2}=-2" }],
    finalAnswerLatex: "m=-2",
  },
  {
    title: "Recognise a horizontal line",
    questionLatex: "\\text{Describe the gradient and y-intercept of }y=4.",
    cartesianGraph: lineGraph("Coordinate graph of the horizontal line y equals 4.", [{ kind: "linear", m: 0, b: 4, label: "y = 4" }]),
    steps: [
      { explanation: "A horizontal line has no vertical change.", latex: "m=0" },
      { explanation: "The line crosses the y-axis at 4.", latex: "b=4" },
    ],
    finalAnswerLatex: "m=0,\\quad b=4",
  },
];

const gradientGuided: PracticeQuestion[] = [
  { ...linearAnswer("y10-linear-grad-g1", "Find the gradient of the displayed line.", "", "2", "The line rises 2 units for every 1 unit across.", ["m=2"]), cartesianGraph: lineGraph("Coordinate graph of an increasing line through zero comma one and one comma three.", [{ kind: "linear", m: 2, b: 1 }], [{ x: 0, y: 1 }, { x: 1, y: 3 }]) },
  linearAnswer("y10-linear-grad-g2", "State the y-intercept of the line.", "y=3x-4", "-4", "The constant term is the y-intercept.", ["b=-4"]),
  linearChoice("y10-linear-grad-g3", "Which description matches a line with negative gradient?", "B", ["It rises from left to right", "It falls from left to right", "It is always vertical", "It must cross the origin"], "A negative-gradient line falls as x increases."),
  { ...linearAnswer("y10-linear-grad-g4", "Find the gradient of the displayed horizontal line.", "\\text{horizontal line}", "0", "A horizontal line has gradient zero.", ["m=0"]), cartesianGraph: lineGraph("Coordinate graph of the horizontal line y equals 3.", [{ kind: "linear", m: 0, b: 3 }]) },
];

const gradientIndependent: PracticeQuestion[] = [
  linearAnswer("y10-linear-grad-i1", "State the gradient of the line.", "y=-3x+5", "-3", "The coefficient of x is the gradient.", ["m=-3"]),
  linearAnswer("y10-linear-grad-i2", "State the y-intercept of the line.", "y=4x+2", "2", "The constant term is the y-intercept.", ["b=2"]),
  { ...linearAnswer("y10-linear-grad-i3", "Find the gradient of the displayed line.", "", "-1", "The line falls 1 unit for every 1 unit across.", ["m=-1"]), cartesianGraph: lineGraph("Coordinate graph of a decreasing line through zero comma two and two comma zero.", [{ kind: "linear", m: -1, b: 2 }], [{ x: 0, y: 2 }, { x: 2, y: 0 }]) },
  linearChoice("y10-linear-grad-i4", "Which equation represents a horizontal line crossing the y-axis at 6?", "C", ["$x=6$", "$y=6x$", "$y=6$", "$y=x+6$"], "A horizontal line has a constant y-value."),
  linearAnswer("y10-linear-grad-i5", "A line passes through (1, 4) and (3, 10). Find its gradient.", "(1,4),\\quad (3,10)", "3", "The rise is 6 and the run is 2.", ["m=3"]),
];

const gradientMastery: PracticeQuestion[] = [
  linearAnswer("y10-linear-grad-m1", "A line is written as 2y = 6x - 8. Find its gradient.", "2y=6x-8", "3", "Divide both sides by 2 to reach y = mx + b: y = 3x - 4. The gradient is the coefficient of x, which is 3 (not 6 — the equation must be rearranged first).", ["m=3"]),
  linearAnswer("y10-linear-grad-m2", "A line is written as x + 2y = 8. Find its y-intercept.", "x+2y=8", "4", "Rearrange into y = mx + b: 2y = -x + 8, so y = -x/2 + 4. The y-intercept is the constant term, 4.", ["b=4"]),
  linearChoice("y10-linear-grad-m3", "A horizontal line has which gradient?", "A", ["0", "1", "-1", "Undefined"], "A horizontal line has zero rise."),
  linearAnswer("y10-linear-grad-m4", "Find the gradient through the two points.", "(2,3),\\quad (5,12)", "3", "The rise is 9 and the run is 3.", ["m=3"]),
  linearChoice("y10-linear-grad-m5", "Which equation has gradient -4 and y-intercept 1?", "D", ["$y=x-4$", "$y=4x+1$", "$y=-x+4$", "$y=-4x+1$"], "Use the form y = mx + b."),
  { ...linearAnswer("y10-linear-grad-m6", "State the y-intercept of the displayed line.", "", "-2", "The line crosses the y-axis at -2.", ["b=-2"]), cartesianGraph: lineGraph("Coordinate graph of the line y equals x minus 2.", [{ kind: "linear", m: 1, b: -2 }]) },
  linearAnswer("y10-linear-grad-m7", "A line rises 8 units while moving 4 units to the right. Find its gradient.", "", "2", "Gradient is rise divided by run.", ["m=2"]),
  linearChoice("y10-linear-grad-m8", "A line passes through (-1, 5) and (3, -3). Which equation matches the line?", "B", ["$y=2x+3$", "$y=-2x+3$", "$y=-2x+5$", "$y=3x-2$"], "The gradient is -2. Substituting either point gives y-intercept 3."),
  linearAnswer("y10-linear-grad-m9", "A line has gradient 3 and passes through (2, 11). Find its y-intercept.", "m=3,\\quad (2,11)", "5", "Substitute into y = mx + b to find b = 5.", ["b=5"]),
  linearChoice("y10-linear-grad-m10", "A line crosses the y-axis below zero and rises from left to right. Which equation could represent it?", "C", ["$y=-2x+3$", "$y=-x-4$", "$y=2x-4$", "$y=4$"], "The line needs a positive gradient and a negative y-intercept."),
];

const parallelWorked: WorkedExample[] = [
  {
    title: "Recognise parallel lines",
    questionLatex: "\\text{Explain why }y=2x+1\\text{ and }y=2x-3\\text{ are parallel.}",
    cartesianGraph: lineGraph("Coordinate graph of two parallel lines with gradient 2 and different y-intercepts.", [{ kind: "linear", m: 2, b: 1, label: "y = 2x + 1" }, { kind: "linear", m: 2, b: -3, label: "y = 2x - 3" }], [], { xMin: -3, xMax: 3, yMin: -5, yMax: 5 }),
    steps: [{ explanation: "Both equations have the same gradient but different y-intercepts.", latex: "m_1=2,\\quad m_2=2" }],
    finalAnswerLatex: "\\text{The lines are parallel.}",
  },
  {
    title: "Recognise perpendicular gradients",
    questionLatex: "\\text{Explain why }y=2x+1\\text{ and }y=-\\frac12x+2\\text{ are perpendicular.}",
    cartesianGraph: lineGraph("Coordinate graph of two perpendicular lines with gradients 2 and negative one half.", [{ kind: "linear", m: 2, b: 1 }, { kind: "linear", m: -0.5, b: 2 }]),
    steps: [{ explanation: "Multiply the gradients.", latex: "2\\times\\left(-\\frac12\\right)=-1" }],
    finalAnswerLatex: "\\text{The lines are perpendicular.}",
  },
  {
    title: "Use horizontal and vertical caution",
    questionLatex: "\\text{Describe the relationship between }y=3\\text{ and }x=-2.",
    steps: [{ explanation: "A horizontal line and a vertical line meet at a right angle." }],
    finalAnswerLatex: "\\text{The lines are perpendicular.}",
  },
];

const parallelGuided: PracticeQuestion[] = [
  linearChoice("y10-linear-pp-g1", "Which line is parallel to y = 3x + 4?", "B", ["$y=-3x+1$", "$y=3x-7$", "$y=\\frac13x+2$", "$y=-\\frac13x+5$"], "Parallel lines have the same gradient."),
  linearChoice("y10-linear-pp-g2", "Which gradient is perpendicular to 4?", "C", ["4", "-4", "$-\\frac14$", "$\\frac14$"], "Perpendicular gradients multiply to -1."),
  { ...linearChoice("y10-linear-pp-g3", "What relationship do the two displayed lines have?", "A", ["Parallel", "Perpendicular", "Identical", "Neither"], "The displayed lines have the same gradient and different intercepts."), cartesianGraph: lineGraph("Coordinate graph of two parallel lines with gradient 1.", [{ kind: "linear", m: 1, b: 2 }, { kind: "linear", m: 1, b: -2 }]) },
  linearChoice("y10-linear-pp-g4", "A horizontal line and a vertical line meet. Which relationship applies?", "D", ["Parallel", "Identical", "No relationship", "Perpendicular"], "Horizontal and vertical lines meet at right angles."),
];

const parallelIndependent: PracticeQuestion[] = [
  linearChoice("y10-linear-pp-i1", "Which line is parallel to y = -2x + 5?", "A", ["$y=-2x-1$", "$y=2x+5$", "$y=\\frac12x-1$", "$y=-\\frac12x+5$"], "Parallel lines have the same gradient."),
  linearChoice("y10-linear-pp-i2", "Which gradient is perpendicular to -3?", "D", ["-3", "3", "$-\\frac13$", "$\\frac13$"], "The reciprocal changes sign."),
  { ...linearChoice("y10-linear-pp-i3", "What relationship do the two displayed lines have?", "B", ["Parallel", "Perpendicular", "Identical", "Neither"], "The gradients are 1 and -1, whose product is -1."), cartesianGraph: lineGraph("Coordinate graph of perpendicular lines with gradients 1 and negative 1.", [{ kind: "linear", m: 1, b: 0 }, { kind: "linear", m: -1, b: 0 }]) },
  linearChoice("y10-linear-pp-i4", "Which line is perpendicular to y = 2x - 4?", "C", ["$y=2x+1$", "$y=-2x+1$", "$y=-\\frac12x+1$", "$y=\\frac12x-4$"], "The perpendicular gradient is negative one half."),
  linearChoice("y10-linear-pp-i5", "Two different lines both have gradient 0. Which relationship applies?", "A", ["Parallel", "Perpendicular", "Identical in every case", "Undefined"], "Different horizontal lines are parallel."),
];

const parallelMastery: PracticeQuestion[] = [
  linearChoice("y10-linear-pp-m1", "Which line is parallel to y = 5x - 2?", "C", ["$y=-5x+1$", "$y=\\frac15x+3$", "$y=5x+6$", "$y=-\\frac15x+6$"], "Parallel lines have equal gradients."),
  linearChoice("y10-linear-pp-m2", "Which gradient is perpendicular to 2?", "B", ["2", "$-\\frac12$", "$\\frac12$", "-2"], "Two multiplied by negative one half equals negative one."),
  linearChoice("y10-linear-pp-m3", "Which relationship applies to y = -x + 4 and y = -x - 3?", "A", ["Parallel", "Perpendicular", "Identical", "Neither"], "The gradients match."),
  linearChoice("y10-linear-pp-m4", "Which line is perpendicular to y = -4x + 1?", "D", ["$y=-4x-2$", "$y=4x-2$", "$y=-\\frac14x+3$", "$y=\\frac14x+3$"], "The perpendicular gradient is one quarter."),
  linearChoice("y10-linear-pp-m5", "Two lines have gradients 3 and -1/3. Which relationship applies?", "B", ["Parallel", "Perpendicular", "Identical", "Horizontal"], "The gradients multiply to -1."),
  { ...linearChoice("y10-linear-pp-m6", "What relationship do the two displayed lines have?", "D", ["Parallel", "Perpendicular", "Identical", "Neither"], "The gradients are 2 and -1, so their product is not -1 and they are not equal."), cartesianGraph: lineGraph("Coordinate graph of two non-parallel and non-perpendicular lines.", [{ kind: "linear", m: 2, b: -1 }, { kind: "linear", m: -1, b: 2 }]) },
  linearChoice("y10-linear-pp-m7", "Which statement is always true for two distinct parallel non-vertical lines?", "C", ["Their y-intercepts match", "Their gradients multiply to -1", "Their gradients match", "Both gradients are zero"], "Distinct parallel lines have equal gradients."),
  linearChoice("y10-linear-pp-m8", "A line is perpendicular to y = 3x + 2 and crosses the y-axis at -4. Which equation represents it?", "A", ["$y=-\\frac13x-4$", "$y=3x-4$", "$y=-3x-4$", "$y=\\frac13x+4$"], "Use perpendicular gradient negative one third and y-intercept -4."),
  linearChoice("y10-linear-pp-m9", "Line A is y = -2x + 7. Line B passes through (0, -1) and (2, 3). What relationship applies?", "D", ["Parallel", "Perpendicular", "Identical", "Neither"], "Line B has gradient 2, so the product is -4. The lines are neither parallel nor perpendicular."),
  linearChoice("y10-linear-pp-m10", "A line is parallel to y = -3x + 5 and passes through (2, 1). Which equation represents it?", "D", ["$y=3x-5$", "$y=-\\frac13x+1$", "$y=-3x+5$", "$y=-3x+7$"], "Use gradient -3 and substitute the point to find y-intercept 7."),
];

const midpointWorked: WorkedExample[] = [
  {
    title: "Find a midpoint",
    questionLatex: "\\text{Find the midpoint of }A(1,2)\\text{ and }B(5,6).",
    cartesianGraph: segmentGraph("Coordinate graph showing segment AB from A one comma two to B five comma six.", { x: 1, y: 2, label: "A(1, 2)" }, { x: 5, y: 6, label: "B(5, 6)" }),
    steps: [{ explanation: "Average the x-coordinates and average the y-coordinates.", latex: "M=\\left(\\frac{1+5}{2},\\frac{2+6}{2}\\right)=(3,4)" }],
    finalAnswerLatex: "(3,4)",
  },
  {
    title: "Find a distance using Pythagoras",
    questionLatex: "\\text{Find the distance from }P(1,1)\\text{ to }Q(4,5).",
    cartesianGraph: segmentGraph("Coordinate graph showing segment PQ from P one comma one to Q four comma five.", { x: 1, y: 1, label: "P(1, 1)" }, { x: 4, y: 5, label: "Q(4, 5)" }),
    steps: [
      { explanation: "Find the horizontal and vertical changes.", latex: "\\Delta x=3,\\quad \\Delta y=4" },
      { explanation: "Use Pythagoras through the distance formula.", latex: "d=\\sqrt{3^2+4^2}=5" },
    ],
    finalAnswerLatex: "5",
  },
  {
    title: "Use a midpoint to find a missing endpoint",
    questionLatex: "\\text{The midpoint of }A(2,3)\\text{ and }B(x,7)\\text{ is }(5,5).\\text{ Find }x.",
    steps: [{ explanation: "Use the x-coordinate part of the midpoint formula.", latex: "\\frac{2+x}{2}=5,\\quad x=8" }],
    finalAnswerLatex: "8",
  },
];

const midpointGuided: PracticeQuestion[] = [
  { ...linearAnswer("y10-linear-mid-g1", "Find the midpoint of the displayed segment.", "", "(3,4)", "Average the coordinates.", ["3,4", "(3, 4)", "3, 4"]), cartesianGraph: segmentGraph("Coordinate graph showing segment AB from one comma two to five comma six.", { x: 1, y: 2, label: "A" }, { x: 5, y: 6, label: "B" }) },
  linearAnswer("y10-linear-mid-g2", "Find the midpoint of A(2, 1) and B(6, 5).", "A(2,1),\\quad B(6,5)", "(4,3)", "Average the x-coordinates and y-coordinates.", ["4,3", "(4, 3)", "4, 3"]),
  linearAnswer("y10-linear-mid-g3", "Find the distance between P(1, 1) and Q(4, 5).", "P(1,1),\\quad Q(4,5)", "5", "The coordinate changes are 3 and 4."),
  linearChoice("y10-linear-mid-g4", "Which idea explains the distance formula?", "C", ["Parallel gradients", "Simple interest", "Pythagoras' theorem", "A five-number summary"], "Horizontal and vertical changes form a right triangle."),
];

const midpointIndependent: PracticeQuestion[] = [
  linearAnswer("y10-linear-mid-i1", "Find the midpoint of A(-2, 4) and B(4, 8).", "A(-2,4),\\quad B(4,8)", "(1,6)", "Average each coordinate.", ["1,6", "(1, 6)", "1, 6"]),
  linearAnswer("y10-linear-mid-i2", "Find the distance between P(2, 3) and Q(8, 3).", "P(2,3),\\quad Q(8,3)", "6", "The segment is horizontal with length 6."),
  { ...linearAnswer("y10-linear-mid-i3", "Find the distance between the displayed points.", "", "10", "The changes are 6 and 8, giving distance 10."), cartesianGraph: segmentGraph("Coordinate graph showing segment PQ from zero comma zero to six comma eight.", { x: 0, y: 0, label: "P" }, { x: 6, y: 8, label: "Q" }, [], { xMin: -1, xMax: 7, yMin: -1, yMax: 9 }) },
  linearAnswer("y10-linear-mid-i4", "The midpoint of A(1, 5) and B(x, 9) is (4, 7). Find x.", "A(1,5),\\quad B(x,9),\\quad M(4,7)", "7", "Solve the x-coordinate midpoint equation."),
  linearChoice("y10-linear-mid-i5", "Which midpoint lies halfway between (-3, 2) and (5, 6)?", "B", ["$(2,4)$", "$(1,4)$", "$(1,8)$", "$(-1,4)$"], "Average the coordinates to get (1, 4)."),
];

const midpointMastery: PracticeQuestion[] = [
  linearAnswer("y10-linear-mid-m1", "Find the midpoint of A(0, 2) and B(4, 6).", "A(0,2),\\quad B(4,6)", "(2,4)", "Average each coordinate.", ["2,4", "(2, 4)", "2, 4"]),
  linearAnswer("y10-linear-mid-m2", "Find the distance between P(1, 2) and Q(4, 6).", "P(1,2),\\quad Q(4,6)", "5", "The coordinate changes are 3 and 4."),
  linearChoice("y10-linear-mid-m3", "A student gives the midpoint of A(2, 6) and B(8, 10) as (10, 16). What is the error?", "A", ["They added the coordinates without dividing each sum by 2", "They subtracted the coordinates instead of adding", "They swapped the x- and y-coordinates", "Nothing — (10, 16) is correct"], "The midpoint averages corresponding coordinates: ((2+8)/2, (6+10)/2) = (5, 8). The student added the coordinates (2+8=10, 6+10=16) but forgot to divide each sum by 2."),
  linearAnswer("y10-linear-mid-m4", "Find the midpoint of A(-4, -2) and B(6, 8).", "A(-4,-2),\\quad B(6,8)", "(1,3)", "Average each coordinate.", ["1,3", "(1, 3)", "1, 3"]),
  linearAnswer("y10-linear-mid-m5", "Find the distance between P(-1, 2) and Q(5, 10).", "P(-1,2),\\quad Q(5,10)", "10", "The coordinate changes are 6 and 8."),
  linearAnswer("y10-linear-mid-m6", "The midpoint of A(3, 2) and B(9, y) is (6, 5). Find y.", "A(3,2),\\quad B(9,y),\\quad M(6,5)", "8", "Solve the y-coordinate midpoint equation."),
  linearChoice("y10-linear-mid-m7", "A segment has horizontal change 5 and vertical change 12. What is its length?", "D", ["7", "12", "17", "13"], "Use the 5-12-13 right triangle."),
  linearAnswer("y10-linear-mid-m8", "Point M(4, 3) is the midpoint of A(1, -2) and B(x, y). Find x.", "M(4,3),\\quad A(1,-2)", "7", "Solve (1 + x) / 2 = 4."),
  linearAnswer("y10-linear-mid-m9", "Point M(4, 3) is the midpoint of A(1, -2) and B(x, y). Find y.", "M(4,3),\\quad A(1,-2)", "8", "Solve (-2 + y) / 2 = 3."),
  linearChoice("y10-linear-mid-m10", "A point is 13 units from (0, 0). Which point could it be?", "C", ["$(4,8)$", "$(5,5)$", "$(5,12)$", "$(6,8)$"], "The point (5, 12) forms a 5-12-13 right triangle."),
];

const modellingWorked: WorkedExample[] = [
  {
    title: "Interpret a starting value and rate",
    questionLatex: "\\text{A hire cost follows }C=40+15h.\\text{ Interpret the numbers.}",
    steps: [
      { explanation: "The constant term is the starting fee.", latex: "\\text{starting fee}=\\$40" },
      { explanation: "The coefficient of hours is the hourly rate.", latex: "\\text{hourly rate}=\\$15" },
    ],
    finalAnswerLatex: "\\$40\\text{ starting fee and }\\$15\\text{ per hour}",
  },
  {
    title: "Predict from a linear model",
    questionLatex: "\\text{A taxi fare follows }C=5+3d.\\text{ Find the fare for }d=8\\text{ km.}",
    steps: [{ explanation: "Substitute the distance into the model.", latex: "C=5+3(8)=29" }],
    finalAnswerLatex: "\\$29",
  },
  {
    title: "Compare two linear models",
    questionLatex: "\\text{Plan A: }C=20+4h.\\quad \\text{Plan B: }C=8+6h.\\text{ Find when the costs match.}",
    cartesianGraph: lineGraph("Coordinate graph of two linear cost models crossing at six comma forty four.", [{ kind: "linear", m: 4, b: 20, label: "Plan A" }, { kind: "linear", m: 6, b: 8, label: "Plan B" }], [], { xMin: 0, xMax: 10, yMin: 0, yMax: 60, xStep: 1, yStep: 10 }),
    steps: [{ explanation: "Set the costs equal and solve.", latex: "20+4h=8+6h,\\quad h=6" }],
    finalAnswerLatex: "6\\text{ hours}",
  },
];

const modellingGuided: PracticeQuestion[] = [
  linearAnswer("y10-linear-model-g1", "A service cost follows C = 25 + 10h. Find the cost for 4 hours.", "C=25+10h,\\quad h=4", "65", "Substitute 4 hours into the model.", ["$65"]),
  linearChoice("y10-linear-model-g2", "In C = 30 + 12h, what does 30 represent?", "A", ["The starting fee", "The hourly rate", "The number of hours", "The gradient of a vertical line"], "The constant term is the starting value."),
  linearChoice("y10-linear-model-g3", "In C = 30 + 12h, what does 12 represent?", "B", ["The starting fee", "The hourly rate", "The total cost after 12 hours", "The y-intercept only with no context"], "The coefficient of hours is the hourly rate."),
  { ...linearChoice("y10-linear-model-g4", "Which plan is cheaper at 2 hours?", "B", ["Plan A", "Plan B", "They cost the same", "The graph contains no cost information"], "At 2 hours, Plan A costs 28 and Plan B costs 20."), cartesianGraph: lineGraph("Coordinate graph of Plan A with cost 20 plus 4 hours and Plan B with cost 8 plus 6 hours.", [{ kind: "linear", m: 4, b: 20, label: "Plan A" }, { kind: "linear", m: 6, b: 8, label: "Plan B" }], [], { xMin: 0, xMax: 10, yMin: 0, yMax: 60, xStep: 1, yStep: 10 }) },
];

const modellingIndependent: PracticeQuestion[] = [
  linearAnswer("y10-linear-model-i1", "A taxi fare follows C = 6 + 2d. Find the fare for 9 km.", "C=6+2d,\\quad d=9", "24", "Substitute 9 kilometres.", ["$24"]),
  linearChoice("y10-linear-model-i2", "Which model represents a 50 dollar starting fee and 8 dollars per hour?", "D", ["$C=8+50h$", "$C=58h$", "$C=50-8h$", "$C=50+8h$"], "Starting value is the constant term and hourly rate is the coefficient."),
  linearAnswer("y10-linear-model-i3", "A cost follows C = 18 + 7h. The total cost is 60 dollars. Find the number of hours.", "C=18+7h,\\quad C=60", "6", "Solve 18 + 7h = 60."),
  linearChoice("y10-linear-model-i4", "Two plans cross on a cost graph. What does the crossing point represent?", "C", ["Both plans have zero cost", "The hourly rates are equal", "The plans have the same cost at that usage", "The graph is not linear"], "At the intersection, both models produce the same cost."),
  linearAnswer("y10-linear-model-i5", "Plan A follows C = 10 + 5h and Plan B follows C = 22 + 3h. Find the number of hours when the costs match.", "C_A=10+5h,\\quad C_B=22+3h", "6", "Set the two costs equal and solve."),
];

const modellingMastery: PracticeQuestion[] = [
  linearChoice("y10-linear-model-m1", "In C = 45 + 9h, what is the starting fee?", "C", ["9 dollars", "36 dollars", "45 dollars", "54 dollars"], "The constant term is the starting fee."),
  linearAnswer("y10-linear-model-m2", "A hire cost follows C = 15 + 6h. Find the cost for 5 hours.", "C=15+6h,\\quad h=5", "45", "Substitute 5 hours.", ["$45"]),
  linearChoice("y10-linear-model-m3", "Which model has starting value 12 and rate 4?", "A", ["$y=12+4x$", "$y=4+12x$", "$y=16x$", "$y=12-4x$"], "Use starting value plus rate multiplied by input."),
  linearAnswer("y10-linear-model-m4", "A taxi model is C = 7 + 3d. Find the fare for 10 km.", "C=7+3d,\\quad d=10", "37", "Substitute 10 kilometres.", ["$37"]),
  linearAnswer("y10-linear-model-m5", "A cost follows C = 20 + 5h. The total cost is 55 dollars. Find h.", "C=20+5h,\\quad C=55", "7", "Solve the linear equation."),
  linearChoice("y10-linear-model-m6", "Plan A has a lower starting fee but a higher hourly rate than Plan B. Which statement is safest?", "D", ["Plan A is always cheaper", "Plan B is always cheaper", "The costs can never match", "The cheaper plan can depend on the number of hours"], "A lower intercept and higher gradient can create a crossing point."),
  linearAnswer("y10-linear-model-m7", "Plan A follows C = 18 + 4h and Plan B follows C = 6 + 6h. Find when the costs match.", "C_A=18+4h,\\quad C_B=6+6h", "6", "Set the models equal."),
  linearChoice("y10-linear-model-m8", "Plan A follows C = 18 + 4h and Plan B follows C = 6 + 6h. Which plan is cheaper after 10 hours?", "A", ["Plan A", "Plan B", "They cost the same", "The rates cannot be compared"], "After 10 hours, Plan A costs 58 and Plan B costs 66."),
  linearAnswer("y10-linear-model-m9", "A linear cost graph crosses the y-axis at 35 and passes through (4, 67). Find the hourly rate.", "b=35,\\quad (4,67)", "8", "The rise from 35 to 67 is 32 over 4 hours.", ["m=8"]),
  linearChoice("y10-linear-model-m10", "A gym charges 25 dollars to join and 12 dollars per week. Which statement about the graph is correct?", "B", ["It crosses the y-axis at 12 and has gradient 25", "It crosses the y-axis at 25 and has gradient 12", "It is horizontal at 25", "It has negative gradient"], "The join fee is the intercept and the weekly cost is the gradient."),
];

// ─── Lesson 5: Equation of a Line ────────────────────────────────────────────

const equationOfLineWorked: WorkedExample[] = [
  {
    title: "Find the equation given gradient and a point",
    questionLatex: "\\text{Find the equation of the line with gradient }3\\text{ passing through }(2,7).",
    steps: [
      { explanation: "Use the point-slope form.", latex: "y-y_1=m(x-x_1)" },
      { explanation: "Substitute m = 3, x₁ = 2, y₁ = 7.", latex: "y-7=3(x-2)" },
      { explanation: "Expand and simplify.", latex: "y=3x-6+7=3x+1" },
    ],
    finalAnswerLatex: "y=3x+1",
  },
  {
    title: "Find the equation given two points",
    questionLatex: "\\text{Find the equation of the line through }(1,4)\\text{ and }(3,10).",
    steps: [
      { explanation: "Find the gradient using rise over run.", latex: "m=\\frac{10-4}{3-1}=\\frac{6}{2}=3" },
      { explanation: "Substitute m = 3 and either point into y − y₁ = m(x − x₁).", latex: "y-4=3(x-1)" },
      { explanation: "Expand and simplify.", latex: "y=3x-3+4=3x+1" },
    ],
    finalAnswerLatex: "y=3x+1",
  },
  {
    title: "Find the equation using y = mx + b with substitution",
    questionLatex: "\\text{Find the equation of the line with gradient }−2\\text{ through }(4,1).",
    steps: [
      { explanation: "Start with y = mx + b and substitute the gradient.", latex: "y=-2x+b" },
      { explanation: "Substitute the point (4, 1) to find b.", latex: "1=-2(4)+b\\implies 1=-8+b\\implies b=9" },
      { explanation: "Write the equation.", latex: "y=-2x+9" },
    ],
    finalAnswerLatex: "y=-2x+9",
  },
];

const equationOfLineGuided: PracticeQuestion[] = [
  linearChoice("y10-eol-g1", "Which is the point-slope form for gradient 3 through the point (2, 7)?", "A",
    ["$y-7=3(x-2)$", "$y-2=3(x-7)$", "$y+7=3(x-2)$", "$y-7=3(x+2)$"],
    "Point-slope form is y − y₁ = m(x − x₁). With m = 3, x₁ = 2, y₁ = 7: y − 7 = 3(x − 2)."),
  linearAnswer("y10-eol-g2", "The line through (4, 3) has gradient 2. Its equation is y = 2x + b. Find b.", "m=2,\\quad(4,3)", "-5", "Substitute: 3 = 2(4) + b → 3 = 8 + b → b = −5.", ["b=-5"]),
  linearChoice("y10-eol-g3", "Which equation represents the line through (0, 5) and (2, 11)?", "A",
    ["$y=3x+5$", "$y=2x+5$", "$y=3x-5$", "$y=6x+5$"],
    "Gradient: (11−5)/(2−0) = 3. The line passes through (0, 5) so b = 5. Equation: y = 3x + 5."),
  linearAnswer("y10-eol-g4", "Find the gradient of the line through (2, 5) and (6, 13).", "(2,5)\\text{ and }(6,13)", "2", "Rise = 8, run = 4. Gradient = 8 ÷ 4 = 2.", ["m=2"]),
];

const equationOfLineIndependent: PracticeQuestion[] = [
  linearChoice("y10-eol-i1", "Which equation has gradient −2 and passes through (3, 1)?", "A",
    ["$y=-2x+7$", "$y=2x-7$", "$y=-2x-7$", "$y=-2x+1$"],
    "y − 1 = −2(x − 3) → y = −2x + 6 + 1 = −2x + 7."),
  linearAnswer("y10-eol-i2", "Find the y-intercept of the line with gradient 3 through (2, 8).", "m=3,\\quad(2,8)", "2", "8 = 3(2) + b → b = 2.", ["b=2"]),
  linearChoice("y10-eol-i3", "Which equation passes through (1, 3) and (3, 9)?", "A",
    ["$y=3x$", "$y=3x+3$", "$y=2x+1$", "$y=3x-3$"],
    "Gradient = (9−3)/(3−1) = 3. y − 3 = 3(x − 1) → y = 3x. Check: (1, 3) and (3, 9) both satisfy y = 3x ✓."),
  linearAnswer("y10-eol-i4", "Find the gradient of the line through (−2, 1) and (4, 13).", "(-2,1)\\text{ and }(4,13)", "2", "Rise = 12, run = 6. Gradient = 12 ÷ 6 = 2.", ["m=2"]),
  linearChoice("y10-eol-i5", "Which equation passes through (0, −4) and (2, 0)?", "A",
    ["$y=2x-4$", "$y=2x+4$", "$y=-2x-4$", "$y=4x-4$"],
    "Gradient = (0−(−4))/(2−0) = 2. y-intercept is −4. Equation: y = 2x − 4."),
];

const equationOfLineMastery: PracticeQuestion[] = [
  linearChoice("y10-eol-m1", "Which equation has gradient −1 and passes through (3, 5)?", "A",
    ["$y=-x+8$", "$y=-x-8$", "$y=x+8$", "$y=-x+2$"],
    "y − 5 = −1(x − 3) → y = −x + 3 + 5 = −x + 8."),
  linearAnswer("y10-eol-m2", "Find the y-intercept of the line with gradient 4 through (2, 11).", "m=4,\\quad(2,11)", "3", "11 = 4(2) + b → b = 3.", ["b=3"]),
  linearChoice("y10-eol-m3", "Which equation passes through (3, 2) and (6, 5)?", "A",
    ["$y=x-1$", "$y=x+1$", "$y=2x-1$", "$y=x+3$"],
    "Gradient = (5−2)/(6−3) = 1. y − 2 = 1(x − 3) → y = x − 1. Check: (3, 2) → 3−1=2 ✓, (6, 5) → 6−1=5 ✓."),
  linearAnswer("y10-eol-m4", "Find the gradient of the line through (5, 1) and (1, 9).", "(5,1)\\text{ and }(1,9)", "-2", "Rise = 9−1 = 8, run = 1−5 = −4. Gradient = 8/(−4) = −2.", ["m=-2"]),
  linearChoice("y10-eol-m5", "Which equation has gradient 0 and passes through (2, 5)?", "A",
    ["$y=5$", "$x=2$", "$y=0$", "$y=2x+5$"],
    "A horizontal line through (2, 5) has equation y = 5. Gradient 0 means the y-value is constant."),
  linearAnswer("y10-eol-m6", "Find the gradient of the line through (−1, 4) and (3, 8).", "(-1,4)\\text{ and }(3,8)", "1", "Rise = 4, run = 4. Gradient = 4 ÷ 4 = 1.", ["m=1"]),
  linearChoice("y10-eol-m7", "Which equation passes through (1, −2) and (4, 7)?", "A",
    ["$y=3x-5$", "$y=3x+5$", "$y=3x-2$", "$y=9x-5$"],
    "Gradient = (7−(−2))/(4−1) = 9/3 = 3. Then y − (−2) = 3(x − 1) → y + 2 = 3x − 3 → y = 3x − 5."),
  linearAnswer("y10-eol-m8", "A line passes through (0, 6) and (3, 0). Find its gradient.", "(0,6)\\text{ and }(3,0)", "-2", "Rise = 0−6 = −6, run = 3−0 = 3. Gradient = −6 ÷ 3 = −2.", ["m=-2"]),
  linearChoice("y10-eol-m9", "Which equation passes through (−2, 3) with gradient 2?", "A",
    ["$y=2x+7$", "$y=2x-7$", "$y=2x+3$", "$y=2x-1$"],
    "y − 3 = 2(x − (−2)) → y − 3 = 2x + 4 → y = 2x + 7."),
  linearAnswer("y10-eol-m10", "The line through (1, 5) and (3, 11) has equation y = mx + b. Find b.", "(1,5)\\text{ and }(3,11)", "2", "Gradient = (11−5)/(3−1) = 3. Then 5 = 3(1) + b → b = 2.", ["b=2"]),
];

function mistakes(topic: string) {
  return {
    gradient: [
      { mistake: "Swapping rise and run.", fix: "Gradient is vertical change divided by horizontal change." },
      { mistake: "Ignoring the sign of a decreasing line.", fix: "A line falling from left to right has negative gradient." },
      { mistake: "Calling the coefficient of x the y-intercept.", fix: "In y = mx + b, m is the gradient and b is the y-intercept." },
      { mistake: "Giving a horizontal line gradient 1.", fix: "A horizontal line has zero vertical change, so its gradient is 0." },
    ],
    parallel: [
      { mistake: "Using opposite gradients for parallel lines.", fix: "Parallel non-vertical lines have the same gradient." },
      { mistake: "Changing only the sign for perpendicular gradients.", fix: "Use the negative reciprocal so the gradients multiply to -1." },
      { mistake: "Assuming equal y-intercepts make lines parallel.", fix: "Compare gradients first. Equal intercepts alone do not show parallel lines." },
      { mistake: "Forgetting the horizontal-vertical case.", fix: "A horizontal line and a vertical line are perpendicular." },
    ],
    midpoint: [
      { mistake: "Adding coordinates without dividing by 2 for a midpoint.", fix: "Average the x-coordinates and average the y-coordinates." },
      { mistake: "Using the gradient formula when distance is required.", fix: "Distance uses Pythagoras with the horizontal and vertical changes." },
      { mistake: "Losing a negative coordinate.", fix: "Keep brackets around negative values when substituting." },
      { mistake: "Typing a midpoint as one number.", fix: "A midpoint is a coordinate pair." },
    ],
    equationOfLine: [
      { mistake: "Computing the gradient as (x₂ − x₁)/(y₂ − y₁) instead of (y₂ − y₁)/(x₂ − x₁).", fix: "Gradient is rise over run: vertical change divided by horizontal change. Rise = y₂ − y₁ and run = x₂ − x₁." },
      { mistake: "Substituting the wrong point when finding b, e.g. using the x-value from one point and the y-value from another.", fix: "Use a single coordinate pair consistently: substitute both x and y values from the same point." },
      { mistake: "Confusing the point-slope form by writing y + y₁ = m(x + x₁) with positive signs.", fix: "Point-slope form uses subtraction: y − y₁ = m(x − x₁). If the point is (3, 7), write y − 7 = m(x − 3)." },
      { mistake: "Forgetting to verify the equation with both given points after finding it.", fix: "Substitute both points into the equation. If a point does not satisfy it, recheck the gradient or the value of b." },
    ],
    modelling: [
      { mistake: "Treating the starting fee as the hourly rate.", fix: "The constant term is the starting value. The coefficient of the input is the rate." },
      { mistake: "Substituting the rate where the number of hours belongs.", fix: "Label the variable before substituting." },
      { mistake: "Comparing rates only when plans have different starting fees.", fix: "Calculate costs at the relevant usage or find the crossing point." },
      { mistake: "Assuming a model prediction is unrelated to its context.", fix: "Include units such as dollars, hours or kilometres in the interpretation." },
    ],
  }[topic]!;
}

export function year10LinearRelationshipsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) || !["algebra-equations-linear-relationships"].includes(unit.slug)) return null;
  const base = { syllabusArea: "Number and Algebra", masteryPassMark: 0.8 };

  if (lesson.slug === "gradient-y-intercept") return {
    ...base, description: "Interpret gradient and y-intercept from equations, coordinates and straight-line graphs.", learningIntention: "Use rise over run and the form y = mx + b to describe straight lines.", successCriteria: ["Calculate gradient from two points.", "Identify positive, negative and zero gradients.", "Read a y-intercept.", "Interpret m and b in the equation of a line."], teaching: { paragraphs: ["Gradient measures how steep a line is. It compares vertical change with horizontal change.", "A rising line has positive gradient. A falling line has negative gradient. A horizontal line has gradient zero.", "The y-intercept is where a line crosses the y-axis.", "In the straight-line form, the coefficient of x is the gradient and the constant term is the y-intercept."], latexBlocks: ["m=\\frac{\\text{rise}}{\\text{run}}=\\frac{y_2-y_1}{x_2-x_1}", "y=mx+b"] }, workedExamples: gradientWorked, guidedPractice: gradientGuided, independentPractice: gradientIndependent, commonMistakes: mistakes("gradient"), masteryQuiz: gradientMastery,
  };
  if (lesson.slug === "parallel-perpendicular-lines") return {
    ...base, description: "Identify parallel and perpendicular lines using gradients and simple graph relationships.", learningIntention: "Use gradients to recognise and write parallel and perpendicular lines.", successCriteria: ["Recognise equal gradients for parallel lines.", "Use negative reciprocal gradients for perpendicular lines.", "Identify relationships from equations.", "Handle horizontal and vertical lines carefully."], teaching: { paragraphs: ["Parallel lines travel in the same direction and do not meet. Distinct non-vertical parallel lines have the same gradient.", "Perpendicular lines meet at a right angle. For non-vertical lines, their gradients are negative reciprocals.", "A quick check for perpendicular non-vertical lines is that the product of the gradients is negative one.", "A horizontal line and a vertical line are also perpendicular."], latexBlocks: ["m_1=m_2\\quad\\text{for parallel lines}", "m_1m_2=-1\\quad\\text{for perpendicular non-vertical lines}"] }, workedExamples: parallelWorked, guidedPractice: parallelGuided, independentPractice: parallelIndependent, commonMistakes: mistakes("parallel"), masteryQuiz: parallelMastery,
  };
  if (lesson.slug === "midpoint-distance") return {
    ...base, description: "Calculate midpoints and distances between coordinate pairs using averages and Pythagoras.", learningIntention: "Use coordinate formulas to describe the position and length of a line segment.", successCriteria: ["Find a midpoint by averaging coordinates.", "Calculate horizontal and vertical changes.", "Use the distance formula.", "Solve simple missing-endpoint questions."], teaching: { paragraphs: ["A midpoint lies halfway between two endpoints.", "To find a midpoint, average the two x-coordinates and average the two y-coordinates.", "The distance formula comes from Pythagoras' theorem. Horizontal and vertical changes form the legs of a right triangle.", "Keep negative coordinates inside brackets when substituting."], latexBlocks: ["M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)", "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"] }, workedExamples: midpointWorked, guidedPractice: midpointGuided, independentPractice: midpointIndependent, commonMistakes: mistakes("midpoint"), masteryQuiz: midpointMastery,
  };
  if (lesson.slug === "equation-of-a-line") return {
    ...base, description: "Find the equation of a straight line given its gradient and a point, or two points on the line.", learningIntention: "Use the point-slope form and y = mx + b to find the equation of a straight line.", successCriteria: ["Apply the point-slope form y − y₁ = m(x − x₁) given gradient and a point.", "Find the gradient from two coordinate pairs, then determine the equation.", "Identify b by substituting a known point into y = mx + b.", "Verify the equation by checking that both given points satisfy it."], teaching: { paragraphs: ["The point-slope form gives the equation of any non-vertical line from its gradient m and one point (x₁, y₁): y − y₁ = m(x − x₁).", "Given two points, first calculate the gradient using rise over run. Then substitute the gradient and either point into the point-slope form.", "An equivalent approach: write y = mx + b, substitute the known point, and solve for b.", "Always verify: substitute both given points and confirm both sides match."], latexBlocks: ["y-y_1=m(x-x_1)\\quad\\text{(point-slope form)}", "m=\\frac{y_2-y_1}{x_2-x_1}\\quad\\text{(gradient from two points)}", "\\text{e.g. }m=3,\\;(2,7):\\quad y-7=3(x-2)\\implies y=3x+1"] }, workedExamples: equationOfLineWorked, guidedPractice: equationOfLineGuided, independentPractice: equationOfLineIndependent, commonMistakes: mistakes("equationOfLine"), masteryQuiz: equationOfLineMastery,
  };
  if (lesson.slug === "linear-modelling") return {
    ...base, description: "Use linear models to interpret starting values, rates, predictions and comparisons.", learningIntention: "Apply y = mx + b to practical cost and rate situations.", successCriteria: ["Interpret a starting value and rate.", "Substitute an input to make a prediction.", "Reverse a linear model to find an input.", "Compare two linear models and interpret a crossing point."], teaching: { paragraphs: ["A linear model combines a starting value with a constant rate of change.", "In a cost model, the constant term can represent a starting fee and the coefficient can represent a rate per hour, week or kilometre.", "Substitute an input to make a prediction. Reverse the substitution when the output is known and the input is required.", "When two linear models cross, they have the same output at that input."], latexBlocks: ["y=mx+b", "\\text{output}=\\text{starting value}+\\text{rate}\\times\\text{input}"] }, workedExamples: modellingWorked, guidedPractice: modellingGuided, independentPractice: modellingIndependent, commonMistakes: mistakes("modelling"), masteryQuiz: modellingMastery,
  };
  return null;
}
