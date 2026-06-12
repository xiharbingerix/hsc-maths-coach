import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { CartesianGraph } from "../types";

function answer(id: string, prompt: string, latex: string, answer: string, explanation: string, acceptedAnswers: string[] = [], cartesianGraph?: CartesianGraph): PracticeQuestion {
  const autoVariants: string[] = [];

  // Plain integers → decimal form (e.g. 7 → 7.0)
  if (/^-?\d+$/.test(answer)) {
    autoVariants.push(`${answer}.0`);
  }

  // Decimals → one trailing zero (e.g. 2.5 → 2.50)
  if (/^-?\d*\.\d+$/.test(answer)) {
    autoVariants.push(`${answer}0`);
  }

  // Leading-zero decimal → no leading zero (e.g. 0.5 → .5)
  if (/^0\./.test(answer)) {
    autoVariants.push(answer.slice(1));
  }

  // Coordinate pairs like "(3, 4)" → compact and bare forms
  const coordMatch = answer.match(/^\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)$/);
  if (coordMatch) {
    autoVariants.push(`(${coordMatch[1]},${coordMatch[2]})`);
    autoVariants.push(`${coordMatch[1]}, ${coordMatch[2]}`);
    autoVariants.push(`${coordMatch[1]},${coordMatch[2]}`);
  }

  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...autoVariants])), hint: "Read the graph or relationship carefully, then calculate.", explanation, cartesianGraph };
}

function choice(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], explanation: string, latex = "\\text{Select A, B, C, or D.}", cartesianGraph?: CartesianGraph): PracticeQuestion {
  return { id, prompt, latex, choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })), answer, hint: "Use the graph features or rate information to compare the options.", explanation, cartesianGraph };
}

function lineGraph(description: string, lines: NonNullable<CartesianGraph["lines"]>, points: NonNullable<CartesianGraph["points"]> = [], domain = { xMin: -5, xMax: 5, yMin: -5, yMax: 5, xStep: 1, yStep: 1 }): CartesianGraph {
  return { description, ...domain, lines, points };
}

function pointGraph(description: string, points: NonNullable<CartesianGraph["points"]>, domain = { xMin: -5, xMax: 5, yMin: -5, yMax: 5, xStep: 1, yStep: 1 }): CartesianGraph {
  return { description, ...domain, points };
}

function journeyGraph(description: string, points: NonNullable<CartesianGraph["points"]>, lineSegments: NonNullable<CartesianGraph["lineSegments"]>): CartesianGraph {
  return { description, xMin: 0, xMax: 6, yMin: 0, yMax: 12, xStep: 1, yStep: 2, xAxisLabel: "time (h)", yAxisLabel: "distance (km)", points, lineSegments };
}

type LessonContent = Pick<ExplicitLesson, "description" | "learningIntention" | "successCriteria" | "teaching" | "workedExamples" | "guidedPractice" | "independentPractice" | "commonMistakes" | "masteryQuiz">;

const coordinateStimulus = pointGraph("Coordinate plane showing points A, B, C and D for reading ordered pairs and quadrants.", [
  { x: 3, y: 4, label: "A" }, { x: -4, y: 2, label: "B" }, { x: -3, y: -4, label: "C" }, { x: 4, y: -2, label: "D" },
]);

const cartesianPlane: LessonContent = {
  description: "Review axes, ordered pairs, quadrants and simple reflections on the Cartesian plane.",
  learningIntention: "Read, plot and describe points on a Cartesian plane.",
  successCriteria: ["Read ordered pairs in x-then-y order.", "Identify axes and quadrants.", "Plot coordinates accurately.", "Reflect simple points across an axis."],
  teaching: { paragraphs: ["The horizontal axis is the x-axis and the vertical axis is the y-axis.", "An ordered pair is written (x, y): move across first, then move up or down.", "The axes divide the plane into four quadrants, numbered anticlockwise from the upper-right region.", "Reflecting across the x-axis changes the sign of y. Reflecting across the y-axis changes the sign of x."], latexBlocks: ["(x,y)", "\\text{across first, then up or down}", "(x,y)\\xrightarrow{\\text{reflect in x-axis}}(x,-y)"] },
  workedExamples: [
    { title: "Read a coordinate", questionLatex: "\\text{State the coordinates of point A on the displayed graph.}", cartesianGraph: coordinateStimulus, steps: [{ explanation: "Move 3 across and 4 up.", latex: "A=(3,4)" }], finalAnswerLatex: "(3,4)" },
    { title: "Identify a quadrant", questionLatex: "\\text{State the quadrant containing }(-4,2).", steps: [{ explanation: "The x-coordinate is negative and the y-coordinate is positive.", latex: "(-,+)\\Rightarrow\\text{Quadrant II}" }], finalAnswerLatex: "\\text{Quadrant II}" },
    { title: "Reflect a point", questionLatex: "\\text{Reflect }(2,-5)\\text{ across the x-axis.}", steps: [{ explanation: "Keep x and change the sign of y.", latex: "(2,-5)\\rightarrow(2,5)" }], finalAnswerLatex: "(2,5)" },
  ],
  guidedPractice: [
    answer("y9-rate-plane-g1", "State the coordinates of point A.", "\\text{Use the displayed graph.}", "(3,4)", "Point A is 3 across and 4 up.", ["3,4", "(3, 4)", "3, 4"], coordinateStimulus),
    choice("y9-rate-plane-g2", "Which quadrant contains point B?", "B", ["I", "II", "III", "IV"], "Point B has negative x and positive y.", "\\text{Use the displayed graph.}", coordinateStimulus),
    answer("y9-rate-plane-g3", "State the coordinates of point D.", "\\text{Use the displayed graph.}", "(4,-2)", "Point D is 4 across and 2 down.", ["4,-2", "(4, -2)", "4, -2"], coordinateStimulus),
    choice("y9-rate-plane-g4", "Which axis is horizontal?", "A", ["x-axis", "y-axis", "origin", "Quadrant I"], "The x-axis is horizontal."),
  ],
  independentPractice: [
    answer("y9-rate-plane-i1", "State the coordinates of point C.", "\\text{Use the displayed graph.}", "(-3,-4)", "Point C is 3 left and 4 down.", ["-3,-4", "(-3, -4)", "-3, -4"], coordinateStimulus),
    choice("y9-rate-plane-i2", "Which quadrant contains (5, -3)?", "D", ["I", "II", "III", "IV"], "Positive x and negative y is Quadrant IV."),
    answer("y9-rate-plane-i3", "Reflect the point across the x-axis.", "(4,-1)", "(4,1)", "Keep x and change the sign of y.", ["4,1", "(4, 1)", "4, 1"]),
    answer("y9-rate-plane-i4", "Reflect the point across the y-axis.", "(-2,5)", "(2,5)", "Change the sign of x and keep y.", ["2,5", "(2, 5)", "2, 5"]),
    choice("y9-rate-plane-i5", "Which point lies on the y-axis?", "C", ["$(4,0)$", "$(3,2)$", "$(0,-5)$", "$(-2,4)$"], "A point on the y-axis has x-coordinate zero."),
  ],
  commonMistakes: [
    { mistake: "Reading y before x.", fix: "Ordered pairs are always written x first, then y." },
    { mistake: "Calling the origin a quadrant.", fix: "The origin is the point (0, 0), where the axes meet." },
    { mistake: "Using the wrong sign in a quadrant.", fix: "Check whether each movement is right, left, up or down." },
    { mistake: "Changing both coordinates for an axis reflection.", fix: "Reflecting in one axis changes only the coordinate perpendicular to that axis." },
  ],
  masteryQuiz: [
    answer("y9-rate-plane-m1", "State the coordinates of point B.", "\\text{Use the displayed graph.}", "(-4,2)", "Point B is 4 left and 2 up.", ["-4,2", "(-4, 2)", "-4, 2"], coordinateStimulus),
    choice("y9-rate-plane-m2", "Which quadrant contains (-6, -1)?", "C", ["I", "II", "III", "IV"], "Both coordinates are negative."),
    choice("y9-rate-plane-m3", "Which point lies on the x-axis?", "A", ["$(5,0)$", "$(0,5)$", "$(5,1)$", "$(-1,5)$"], "A point on the x-axis has y-coordinate zero."),
    answer("y9-rate-plane-m4", "Reflect across the x-axis.", "(-3,7)", "(-3,-7)", "Change the sign of y.", ["-3,-7", "(-3, -7)", "-3, -7"]),
    answer("y9-rate-plane-m5", "Reflect across the y-axis.", "(6,-2)", "(-6,-2)", "Change the sign of x.", ["-6,-2", "(-6, -2)", "-6, -2"]),
    choice("y9-rate-plane-m6", "Which description matches (0, -4)?", "D", ["Quadrant I", "Quadrant III", "On the x-axis", "On the y-axis"], "The x-coordinate is zero."),
    answer("y9-rate-plane-m7", "A point is reflected across the y-axis to (5, 3). State the original point.", "\\text{reflect in y-axis}", "(-5,3)", "Reverse the sign change in x.", ["-5,3", "(-5, 3)", "-5, 3"]),
    choice("y9-rate-plane-m8", "Point P has negative x and positive y. Its reflection across the x-axis lies in which quadrant?", "C", ["I", "II", "III", "IV"], "The reflected point has negative x and negative y."),
    answer("y9-rate-plane-m9", "Point Q is reflected across both axes. Find the final coordinate.", "(4,-6)", "(-4,6)", "Both signs change.", ["-4,6", "(-4, 6)", "-4, 6"]),
    choice("y9-rate-plane-m10", "Which pair is symmetric across the y-axis?", "B", ["$(3,4)$ and $(3,-4)$", "$(3,4)$ and $(-3,4)$", "$(3,4)$ and $(-3,-4)$", "$(3,4)$ and $(4,3)$"], "A y-axis reflection changes x only."),
  ],
};

const tablesRules: LessonContent = {
  description: "Connect input-output tables, linear rules and straight-line graphs.",
  learningIntention: "Use a linear rule to complete tables, create points and predict values.",
  successCriteria: ["Substitute inputs into a rule.", "Complete input-output tables.", "Match a rule to a graph.", "Predict values from a constant-rate pattern."],
  teaching: { paragraphs: ["A rule describes how each input is changed to produce an output.", "For y = 2x + 1, multiply the input by 2 and then add 1.", "Each input-output pair becomes a point (x, y) on the graph.", "A constant-rate rule creates points that lie on a straight line."], latexBlocks: ["y=2x+1", "x=3\\Rightarrow y=2(3)+1=7", "(0,1),(1,3),(2,5)"] },
  workedExamples: [
    { title: "Complete a table value", questionLatex: "\\text{Use }y=2x+1\\text{ to find y when }x=4.", steps: [{ explanation: "Substitute x = 4.", latex: "y=2(4)+1=9" }], finalAnswerLatex: "9" },
    { title: "Create graph points", questionLatex: "\\text{Find three points for }y=x-2\\text{ using }x=0,2,4.", steps: [{ explanation: "Substitute each input.", latex: "(0,-2),(2,0),(4,2)" }], finalAnswerLatex: "(0,-2),(2,0),(4,2)" },
    { title: "Match a graph", questionLatex: "\\text{Describe the graph of }y=2x+1.", cartesianGraph: lineGraph("Straight line stimulus through zero comma one, one comma three and two comma five.", [{ kind: "linear", m: 2, b: 1 }], [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }]), steps: [{ explanation: "The outputs increase by 2 whenever x increases by 1.", latex: "\\Delta y=2" }], finalAnswerLatex: "\\text{A straight line with constant increase 2}" },
  ],
  guidedPractice: [
    answer("y9-rate-table-g1", "Use the rule to find y when x = 3.", "y=2x+1", "7", "Substitute 3."),
    answer("y9-rate-table-g2", "Use the rule to find y when x = 5.", "y=3x-2", "13", "Substitute 5."),
    choice("y9-rate-table-g3", "Which rule matches outputs 1, 3, 5, 7 for inputs 0, 1, 2, 3?", "B", ["$y=x+1$", "$y=2x+1$", "$y=3x$", "$y=2x-1$"], "The output starts at 1 and increases by 2."),
    choice("y9-rate-table-g4", "Which point lies on y = x + 4?", "D", ["$(1,4)$", "$(4,1)$", "$(3,8)$", "$(3,7)$"], "When x = 3, y = 7."),
  ],
  independentPractice: [
    answer("y9-rate-table-i1", "Use the rule to find y when x = -2.", "y=4x+3", "-5", "Substitute -2."),
    answer("y9-rate-table-i2", "The rule is y = 5x - 1. Find x when y = 19.", "y=5x-1", "4", "Solve 19 = 5x - 1."),
    choice("y9-rate-table-i3", "Which rule matches outputs -2, 1, 4, 7 for inputs 0, 1, 2, 3?", "D", ["$y=x-2$", "$y=2x-2$", "$y=3x+2$", "$y=3x-2$"], "The output starts at -2 and increases by 3."),
    choice("y9-rate-table-i4", "Which graph type is produced by a constant-rate rule?", "A", ["A straight line", "A circle", "A parabola", "A random cloud"], "A constant rate creates a straight line."),
    answer("y9-rate-table-i5", "Use the rule to predict the output for x = 10.", "y=2x+5", "25", "Substitute 10."),
  ],
  commonMistakes: [
    { mistake: "Adding before multiplying.", fix: "Use the usual order of operations after substitution." },
    { mistake: "Writing table pairs in y-then-x order.", fix: "Graph points are written (x, y)." },
    { mistake: "Assuming every graph is linear.", fix: "Check that outputs change by a constant amount for equal input steps." },
    { mistake: "Ignoring a negative starting value.", fix: "Keep the sign of the constant term." },
  ],
  masteryQuiz: [
    answer("y9-rate-table-m1", "Find y when x = 4.", "y=3x+2", "14", "Substitute 4."),
    answer("y9-rate-table-m2", "Find y when x = -1.", "y=2x-5", "-7", "Substitute -1."),
    choice("y9-rate-table-m3", "Which point lies on y = 4x - 1?", "A", ["$(2,7)$", "$(2,8)$", "$(1,4)$", "$(0,1)$"], "When x = 2, y = 7."),
    choice("y9-rate-table-m4", "Which rule matches outputs 4, 6, 8, 10 for inputs 0, 1, 2, 3?", "C", ["$y=4x+2$", "$y=x+4$", "$y=2x+4$", "$y=2x-4$"], "Start at 4 and increase by 2."),
    answer("y9-rate-table-m5", "Find x when y = 17.", "y=3x+2", "5", "Solve 17 = 3x + 2."),
    choice("y9-rate-table-m6", "A table output increases by 5 whenever input increases by 1. What is the constant rate?", "D", ["1", "-5", "0", "5"], "The rate is the output increase per input step."),
    answer("y9-rate-table-m7", "Predict the output for x = 12.", "y=4x-3", "45", "Substitute 12."),
    choice("y9-rate-table-m8", "A table contains (0, 6), (2, 12), (4, 18). Which rule matches?", "B", ["$y=6x$", "$y=3x+6$", "$y=2x+6$", "$y=6x+3$"], "The output starts at 6 and rises 6 over a run of 2, so the rate is 3."),
    answer("y9-rate-table-m9", "A rule gives y = -2 when x = 0 and y = 10 when x = 4. Find the constant rate.", "\\text{Use the two outputs.}", "3", "The output rises by 12 over 4 input steps.", ["m=3"]),
    choice("y9-rate-table-m10", "Which statement is true for y = -2x + 7?", "C", ["Outputs increase by 7 each step", "The graph is horizontal", "Outputs decrease by 2 each step", "The graph crosses the y-axis at -2"], "The coefficient -2 is the constant change."),
  ],
};

const gradient: LessonContent = {
  description: "Calculate gradient from points and interpret it as a constant rate of change.",
  learningIntention: "Use rise over run to calculate and interpret gradient.",
  successCriteria: ["Calculate rise and run.", "Find gradient from two points.", "Recognise positive, negative and zero gradients.", "Interpret gradient as a rate."],
  teaching: { paragraphs: ["Gradient measures steepness and direction.", "Calculate gradient by dividing vertical change, or rise, by horizontal change, or run.", "A line rising left to right has positive gradient. A falling line has negative gradient. A horizontal line has gradient zero.", "In context, gradient represents a constant rate such as kilometres per hour or dollars per item."], latexBlocks: ["m=\\frac{\\text{rise}}{\\text{run}}=\\frac{y_2-y_1}{x_2-x_1}", "\\text{positive: rising}\\quad\\text{negative: falling}\\quad\\text{zero: horizontal}"] },
  workedExamples: [
    { title: "Calculate positive gradient", questionLatex: "\\text{Find the gradient through }(1,2)\\text{ and }(4,8).", cartesianGraph: lineGraph("Line stimulus through one comma two and four comma eight.", [{ kind: "linear", m: 2, b: 0 }], [{ x: 1, y: 2 }, { x: 4, y: 8 }], { xMin: 0, xMax: 5, yMin: 0, yMax: 10, xStep: 1, yStep: 2 }), steps: [{ explanation: "Find rise and run.", latex: "m=\\frac{8-2}{4-1}=\\frac63=2" }], finalAnswerLatex: "2" },
    { title: "Calculate negative gradient", questionLatex: "\\text{Find the gradient through }(0,4)\\text{ and }(2,0).", steps: [{ explanation: "The line falls by 4 over a run of 2.", latex: "m=\\frac{0-4}{2-0}=-2" }], finalAnswerLatex: "-2" },
    { title: "Interpret a rate", questionLatex: "\\text{Distance rises from 10 km to 40 km over 3 hours. Find the rate.}", steps: [{ explanation: "Divide distance change by time change.", latex: "\\frac{40-10}{3}=10" }], finalAnswerLatex: "10\\text{ km/h}" },
  ],
  guidedPractice: [
    answer("y9-rate-grad-g1", "Find the gradient through the points.", "(0,1),\\ (2,5)", "2", "The rise is 4 and run is 2.", ["m=2"]),
    choice("y9-rate-grad-g2", "A line falls from left to right. What sign does its gradient have?", "B", ["Positive", "Negative", "Zero", "Always undefined"], "A falling line has negative gradient."),
    answer("y9-rate-grad-g3", "Find the gradient through the points.", "(1,6),\\ (3,6)", "0", "There is no vertical change.", ["m=0"]),
    answer("y9-rate-grad-g4", "A cyclist travels 24 km in 2 hours at a constant rate. Find the rate.", "\\text{24 km in 2 h}", "12", "Divide distance by time.", ["12 km/h"]),
  ],
  independentPractice: [
    answer("y9-rate-grad-i1", "Find the gradient through the points.", "(2,3),\\ (5,12)", "3", "The rise is 9 and run is 3.", ["m=3"]),
    answer("y9-rate-grad-i2", "Find the gradient through the points.", "(0,5),\\ (4,1)", "-1", "The rise is -4 and run is 4.", ["m=-1"]),
    choice("y9-rate-grad-i3", "Which description matches gradient 0?", "C", ["Rising", "Falling", "Horizontal", "Vertical only"], "Zero gradient means no vertical change."),
    answer("y9-rate-grad-i4", "A tank fills from 20 L to 80 L in 5 minutes at a constant rate. Find the rate.", "\\text{20 L to 80 L in 5 min}", "12", "The change is 60 L over 5 minutes.", ["12 L/min"]),
    choice("y9-rate-grad-i5", "Which pair of points has gradient 2?", "D", ["$(0,0),(3,3)$", "$(1,4),(3,4)$", "$(0,4),(2,0)$", "$(1,3),(4,9)$"], "The last pair rises 6 over a run of 3."),
  ],
  commonMistakes: [
    { mistake: "Dividing run by rise.", fix: "Gradient is rise divided by run." },
    { mistake: "Dropping a negative sign.", fix: "A fall from left to right gives negative rise." },
    { mistake: "Calling a horizontal gradient undefined.", fix: "Horizontal lines have gradient zero." },
    { mistake: "Ignoring units in context.", fix: "Write rate units such as km/h or L/min." },
  ],
  masteryQuiz: [
    answer("y9-rate-grad-m1", "Find the gradient.", "(0,2),\\ (3,8)", "2", "Rise 6 over run 3.", ["m=2"]),
    answer("y9-rate-grad-m2", "Find the gradient.", "(1,7),\\ (4,1)", "-2", "Rise -6 over run 3.", ["m=-2"]),
    choice("y9-rate-grad-m3", "Which gradient represents a horizontal line?", "A", ["0", "1", "-1", "2"], "Horizontal lines have no rise."),
    answer("y9-rate-grad-m4", "Find the constant speed.", "\\text{45 km in 3 h}", "15", "Divide 45 by 3.", ["15 km/h"]),
    answer("y9-rate-grad-m5", "Find the gradient.", "(-2,-1),\\ (2,7)", "2", "Rise 8 over run 4.", ["m=2"]),
    choice("y9-rate-grad-m6", "Which line is steepest?", "D", ["gradient 1", "gradient -2", "gradient 0", "gradient 4"], "The largest magnitude is 4."),
    answer("y9-rate-grad-m7", "A savings balance rises from 80 dollars to 200 dollars over 6 weeks. Find the weekly rate.", "\\text{change over 6 weeks}", "20", "The increase is $120 over 6 weeks.", ["$20", "20 dollars per week"]),
    choice("y9-rate-grad-m8", "A line has gradient -3. Which statement is correct?", "B", ["It rises 3 for each step right", "It falls 3 for each step right", "It is horizontal", "It crosses the y-axis at -3"], "Negative gradient indicates a fall."),
    answer("y9-rate-grad-m9", "Find the gradient through the displayed marked points.", "\\text{Use the graph stimulus.}", "2", "The marked points are (1, 2) and (4, 8).", ["m=2"], lineGraph("Line stimulus through marked points one comma two and four comma eight.", [{ kind: "linear", m: 2, b: 0 }], [{ x: 1, y: 2 }, { x: 4, y: 8 }], { xMin: 0, xMax: 5, yMin: 0, yMax: 10, xStep: 1, yStep: 2 })),
    choice("y9-rate-grad-m10", "A line changes from y = 11 to y = -1 while x changes from 2 to 6. Which gradient is correct?", "C", ["3", "-2", "-3", "12"], "Rise is -12 and run is 4."),
  ],
};

const interceptForm: LessonContent = {
  description: "Use y = mx + b to read gradients, y-intercepts and simple line values.",
  learningIntention: "Interpret and use gradient-intercept form for straight lines.",
  successCriteria: ["Identify m as gradient.", "Identify b as y-intercept.", "Substitute an x-value.", "Match simple equations and graphs."],
  teaching: { paragraphs: ["Straight lines can be written in gradient-intercept form.", "The coefficient m tells us the gradient. The constant b tells us where the line crosses the y-axis.", "To sketch a line, mark the y-intercept and use the gradient to find another point.", "To find an output, substitute the x-value into the equation."], latexBlocks: ["y=mx+b", "m=\\text{gradient}", "b=\\text{y-intercept}"] },
  workedExamples: [
    { title: "Read m and b", questionLatex: "\\text{State the gradient and y-intercept of }y=3x-2.", steps: [{ explanation: "Compare with y = mx + b.", latex: "m=3,\\quad b=-2" }], finalAnswerLatex: "m=3,\\quad b=-2" },
    { title: "Evaluate a line", questionLatex: "\\text{Find y when }x=4\\text{ for }y=2x+1.", steps: [{ explanation: "Substitute x = 4.", latex: "y=2(4)+1=9" }], finalAnswerLatex: "9" },
    { title: "Match equation and graph", questionLatex: "\\text{Describe the displayed line.}", cartesianGraph: lineGraph("Straight line stimulus crossing the y-axis at one and rising two for each unit right.", [{ kind: "linear", m: 2, b: 1 }], [{ x: 0, y: 1 }, { x: 1, y: 3 }]), steps: [{ explanation: "Read the intercept and rise.", latex: "b=1,\\quad m=2" }], finalAnswerLatex: "y=2x+1" },
  ],
  guidedPractice: [
    answer("y9-rate-form-g1", "State the gradient.", "y=4x+3", "4", "The coefficient of x is the gradient.", ["m=4"]),
    answer("y9-rate-form-g2", "State the y-intercept.", "y=2x-5", "-5", "The constant term is the y-intercept.", ["b=-5"]),
    answer("y9-rate-form-g3", "Find y when x = 3.", "y=2x+4", "10", "Substitute 3."),
    choice("y9-rate-form-g4", "Which equation has gradient 3 and y-intercept 1?", "C", ["$y=x+3$", "$y=3+x$", "$y=3x+1$", "$y=-3x+1$"], "Use y = mx + b."),
  ],
  independentPractice: [
    answer("y9-rate-form-i1", "State the gradient.", "y=-2x+6", "-2", "Read the coefficient.", ["m=-2"]),
    answer("y9-rate-form-i2", "State the y-intercept.", "y=5x+7", "7", "Read the constant term.", ["b=7"]),
    answer("y9-rate-form-i3", "Find y when x = -1.", "y=3x+2", "-1", "Substitute -1."),
    choice("y9-rate-form-i4", "Which equation represents a horizontal line crossing y = 4?", "B", ["$x=4$", "$y=4$", "$y=4x$", "$y=x+4$"], "A horizontal line has constant y."),
    choice("y9-rate-form-i5", "Which equation has negative gradient and positive y-intercept?", "D", ["$y=2x-3$", "$y=2x+3$", "$y=-2x-3$", "$y=-2x+3$"], "The x-coefficient is negative and constant is positive."),
  ],
  commonMistakes: [
    { mistake: "Swapping m and b.", fix: "m multiplies x; b is the constant." },
    { mistake: "Losing the sign of the intercept.", fix: "Keep the sign shown in the equation." },
    { mistake: "Treating y = 4 as vertical.", fix: "A constant y-value creates a horizontal line." },
    { mistake: "Forgetting order of operations.", fix: "Multiply before adding the intercept." },
  ],
  masteryQuiz: [
    answer("y9-rate-form-m1", "State the gradient.", "y=6x-1", "6", "Read m.", ["m=6"]),
    answer("y9-rate-form-m2", "State the y-intercept.", "y=-3x+8", "8", "Read b.", ["b=8"]),
    answer("y9-rate-form-m3", "Find y when x = 5.", "y=2x-4", "6", "Substitute 5."),
    choice("y9-rate-form-m4", "Which equation has gradient -4 and intercept 2?", "A", ["$y=-4x+2$", "$y=4x-2$", "$y=-2x+4$", "$y=2x-4$"], "Use y = mx + b."),
    choice("y9-rate-form-m5", "Which line is horizontal?", "C", ["$y=x$", "$x=5$", "$y=5$", "$y=5x$"], "Horizontal lines have constant y."),
    answer("y9-rate-form-m6", "Find y when x = -2.", "y=-3x+1", "7", "Substitute -2."),
    choice("y9-rate-form-m7", "A graph crosses the y-axis below zero and rises left to right. Which equation could match?", "B", ["$y=-2x+3$", "$y=2x-3$", "$y=-2x-3$", "$y=3$"], "The gradient is positive and intercept negative."),
    choice("y9-rate-form-m8", "Which equation matches the displayed graph?", "D", ["$y=x+2$", "$y=-2x+1$", "$y=2x-1$", "$y=-x+2$"], "The line crosses at 2 and falls 1 for each step right.", "\\text{Use the graph stimulus.}", lineGraph("Straight line stimulus crossing y-axis at two and falling one per unit right.", [{ kind: "linear", m: -1, b: 2 }], [{ x: 0, y: 2 }, { x: 2, y: 0 }])),
    answer("y9-rate-form-m9", "A line has gradient 3 and passes through (0, -4). State its equation.", "m=3,\\quad b=-4", "y=3x-4", "Use y = mx + b.", ["y = 3x - 4"]),
    choice("y9-rate-form-m10", "A student says the line y = -5x + 2 has y-intercept -5. What is the correction?", "C", ["The gradient is 2", "The intercept is -2", "The y-intercept is 2", "The equation is horizontal"], "The constant term is the y-intercept."),
  ],
};

const parallel: LessonContent = {
  description: "Recognise parallel, horizontal and vertical lines using simple equations and graphs.",
  learningIntention: "Use equal gradients to identify parallel lines and recognise horizontal and vertical lines.",
  successCriteria: ["Identify equal gradients for parallel lines.", "Recognise horizontal lines.", "Recognise vertical lines.", "Use light right-angle recognition for horizontal and vertical lines."],
  teaching: { paragraphs: ["Parallel lines travel in the same direction and do not meet.", "Distinct non-vertical parallel lines have the same gradient but different y-intercepts.", "Horizontal lines have equations such as y = 3 and gradient zero.", "Vertical lines have equations such as x = 4. A horizontal and a vertical line meet at a right angle."], latexBlocks: ["m_1=m_2\\quad\\text{for parallel non-vertical lines}", "y=3\\quad\\text{horizontal}", "x=4\\quad\\text{vertical}"] },
  workedExamples: [
    { title: "Recognise parallel equations", questionLatex: "\\text{Explain why }y=2x+1\\text{ and }y=2x-4\\text{ are parallel.}", cartesianGraph: lineGraph("Two parallel straight-line stimuli with equal gradient two.", [{ kind: "linear", m: 2, b: 1 }, { kind: "linear", m: 2, b: -4 }]), steps: [{ explanation: "The gradients are equal.", latex: "m_1=m_2=2" }], finalAnswerLatex: "\\text{parallel}" },
    { title: "Recognise horizontal and vertical", questionLatex: "\\text{Describe }y=5\\text{ and }x=-2.", steps: [{ explanation: "A constant y is horizontal; a constant x is vertical." }], finalAnswerLatex: "\\text{horizontal and vertical}" },
    { title: "Use light perpendicular recognition", questionLatex: "\\text{What angle is formed by a horizontal line and a vertical line?}", steps: [{ explanation: "They meet at a right angle.", latex: "90^\\circ" }], finalAnswerLatex: "90^\\circ" },
  ],
  guidedPractice: [
    choice("y9-rate-par-g1", "Which line is parallel to y = 3x + 1?", "B", ["$y=-3x+2$", "$y=3x-5$", "$y=x+3$", "$x=3$"], "Parallel lines share gradient 3."),
    choice("y9-rate-par-g2", "Which equation represents a horizontal line?", "C", ["$x=4$", "$y=4x$", "$y=4$", "$y=x+4$"], "A horizontal line has constant y."),
    choice("y9-rate-par-g3", "Which equation represents a vertical line?", "A", ["$x=-2$", "$y=-2$", "$y=-2x$", "$y=x-2$"], "A vertical line has constant x."),
    choice("y9-rate-par-g4", "What relationship do different lines y = 0 and y = 6 have?", "D", ["Identical", "Vertical", "Crossing", "Parallel"], "Both are horizontal."),
  ],
  independentPractice: [
    choice("y9-rate-par-i1", "Which line is parallel to y = -2x + 7?", "A", ["$y=-2x-1$", "$y=2x+7$", "$y=-x+2$", "$x=-2$"], "The gradient must remain -2."),
    choice("y9-rate-par-i2", "Which line is horizontal?", "B", ["$x=8$", "$y=-3$", "$y=-3x$", "$y=x-3$"], "A constant y-value is horizontal."),
    choice("y9-rate-par-i3", "A horizontal and vertical line meet. Which angle is formed?", "C", ["$0^\\circ$", "$45^\\circ$", "$90^\\circ$", "$180^\\circ$"], "They meet at a right angle."),
    choice("y9-rate-par-i4", "Which pair is parallel?", "D", ["$y=x+1$ and $y=-x+1$", "$y=2x$ and $y=3x$", "$x=2$ and $y=2$", "$y=-4x+1$ and $y=-4x-6$"], "The gradients in the last pair match."),
    choice("y9-rate-par-i5", "Two different lines have gradient 0. What relationship do they have?", "A", ["Parallel", "Vertical", "Identical in every case", "No relationship"], "Different horizontal lines are parallel."),
  ],
  commonMistakes: [
    { mistake: "Comparing intercepts instead of gradients.", fix: "Parallel direction is determined by gradient." },
    { mistake: "Calling x = 3 horizontal.", fix: "A constant x-value makes a vertical line." },
    { mistake: "Calling y = 3 vertical.", fix: "A constant y-value makes a horizontal line." },
    { mistake: "Going too far into perpendicular formulas.", fix: "At this stage, focus on simple horizontal-vertical right-angle recognition." },
  ],
  masteryQuiz: [
    choice("y9-rate-par-m1", "Which line is parallel to y = 5x - 2?", "C", ["$y=-5x+1$", "$y=x+5$", "$y=5x+8$", "$x=5$"], "Keep gradient 5."),
    choice("y9-rate-par-m2", "Which equation is vertical?", "A", ["$x=6$", "$y=6$", "$y=6x$", "$y=x+6$"], "Vertical means constant x."),
    choice("y9-rate-par-m3", "Which equation is horizontal?", "D", ["$x=-4$", "$y=-4x$", "$y=x-4$", "$y=-4$"], "Horizontal means constant y."),
    choice("y9-rate-par-m4", "Which pair has equal gradients?", "B", ["$y=2x+1$ and $y=-2x+1$", "$y=3x-1$ and $y=3x+5$", "$y=x$ and $y=2x$", "$x=2$ and $y=2$"], "Both gradients are 3."),
    choice("y9-rate-par-m5", "What is the gradient of a horizontal line?", "A", ["0", "1", "-1", "Undefined"], "No rise means zero gradient."),
    choice("y9-rate-par-m6", "Which line is parallel to y = -x + 4?", "D", ["$y=x+4$", "$y=-4x+1$", "$x=-1$", "$y=-x-3$"], "Keep gradient -1."),
    choice("y9-rate-par-m7", "A horizontal line meets x = 7. Which statement is correct?", "C", ["They are parallel", "They never meet", "They meet at a right angle", "They have equal gradients"], "x = 7 is vertical."),
    choice("y9-rate-par-m8", "Which equation could describe a line parallel to the displayed line?", "B", ["$y=-2x+4$", "$y=2x-4$", "$y=x+2$", "$x=2$"], "The displayed line has gradient 2.", "\\text{Use the graph stimulus.}", lineGraph("Straight line stimulus rising two units per unit right.", [{ kind: "linear", m: 2, b: 1 }])),
    choice("y9-rate-par-m9", "Line A is y = 4x - 3. Line B passes through (0, 5) and (2, 13). What relationship applies?", "A", ["Parallel", "Horizontal", "Vertical", "No relationship"], "Line B rises 8 over run 2, so its gradient is 4."),
    choice("y9-rate-par-m10", "A student says y = 7 and x = 7 are parallel because both contain 7. What is the correction?", "D", ["Both are horizontal", "Both are vertical", "They are identical", "One is horizontal and one is vertical, so they meet at a right angle"], "The variable held constant determines direction."),
  ],
};

const journey = journeyGraph("Distance-time graph stimulus: travel from zero to six kilometres in two hours, stop for one hour, then travel to twelve kilometres by hour five.", [
  { x: 0, y: 0 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 12 },
], [
  { from: { x: 0, y: 0 }, to: { x: 2, y: 6 } },
  { from: { x: 2, y: 6 }, to: { x: 3, y: 6 } },
  { from: { x: 3, y: 6 }, to: { x: 5, y: 12 } },
]);

// Separate stimulus for m6: values (1, 4) to (4, 16) do not appear on the journey graph.
const speedSegment: CartesianGraph = {
  description: "Distance-time graph showing a single constant-speed segment from 4 km at hour 1 to 16 km at hour 4.",
  xMin: 0, xMax: 5, yMin: 0, yMax: 20, xStep: 1, yStep: 4,
  xAxisLabel: "time (h)", yAxisLabel: "distance (km)",
  lineSegments: [{ from: { x: 1, y: 4 }, to: { x: 4, y: 16 } }],
  points: [{ x: 1, y: 4, label: "4" }, { x: 4, y: 16, label: "16" }],
};

const distanceTime: LessonContent = {
  description: "Interpret distance-time graphs using distance, time, speed and stopped intervals.",
  learningIntention: "Read and compare constant speeds from distance-time graphs.",
  successCriteria: ["Read distance at a given time.", "Calculate speed from a segment.", "Identify stopped intervals.", "Compare speeds using steepness."],
  teaching: { paragraphs: ["On a distance-time graph, time is on the horizontal axis and distance is on the vertical axis.", "The gradient of a segment represents speed.", "A horizontal segment means distance is unchanged, so the traveller has stopped.", "A steeper rising segment represents a faster speed."], latexBlocks: ["\\text{speed}=\\frac{\\text{change in distance}}{\\text{change in time}}", "\\text{horizontal segment}\\Rightarrow\\text{stopped}"] },
  workedExamples: [
    { title: "Read distance", questionLatex: "\\text{Use the displayed graph. Find the distance after 2 hours.}", cartesianGraph: journey, steps: [{ explanation: "Read the vertical value above time 2.", latex: "6\\text{ km}" }], finalAnswerLatex: "6\\text{ km}" },
    { title: "Find speed", questionLatex: "\\text{Find the speed during the first 2 hours.}", cartesianGraph: journey, steps: [{ explanation: "Divide change in distance by change in time.", latex: "\\frac{6-0}{2-0}=3" }], finalAnswerLatex: "3\\text{ km/h}" },
    { title: "Identify a stop", questionLatex: "\\text{When is the traveller stopped?}", cartesianGraph: journey, steps: [{ explanation: "Look for a horizontal segment.", latex: "2\\text{ h to }3\\text{ h}" }], finalAnswerLatex: "\\text{from 2 h to 3 h}" },
  ],
  guidedPractice: [
    answer("y9-rate-dist-g1", "Read the distance after 2 hours.", "\\text{Use the graph stimulus.}", "6", "The graph reaches 6 km.", ["6 km"], journey),
    answer("y9-rate-dist-g2", "Find the speed during the first 2 hours.", "\\text{Use the graph stimulus.}", "3", "Six kilometres over two hours.", ["3 km/h"], journey),
    choice("y9-rate-dist-g3", "During which interval is the traveller stopped?", "B", ["0 to 2 h", "2 to 3 h", "3 to 5 h", "5 to 6 h"], "The graph is flat from 2 to 3 hours.", "\\text{Use the graph stimulus.}", journey),
    choice("y9-rate-dist-g4", "What does a steeper rising segment mean?", "A", ["Faster speed", "A stop", "Lower distance", "Negative time"], "A steeper rise means more distance per unit time.", "\\text{Select A, B, C, or D.}", journey),
  ],
  independentPractice: [
    answer("y9-rate-dist-i1", "Read the final distance shown.", "\\text{Use the graph stimulus.}", "12", "The final point is at 12 km.", ["12 km"], journey),
    answer("y9-rate-dist-i2", "Find the speed from hour 3 to hour 5.", "\\text{Use the graph stimulus.}", "3", "Distance rises 6 km over 2 hours.", ["3 km/h"], journey),
    choice("y9-rate-dist-i3", "What does a horizontal distance-time segment show?", "C", ["Moving faster", "Moving backwards", "Stopped", "Changing time scale"], "Distance remains unchanged.", "\\text{Select A, B, C, or D.}", journey),
    answer("y9-rate-dist-i4", "A traveller covers 20 km in 4 hours at constant speed. Find the speed.", "\\text{20 km in 4 h}", "5", "Divide 20 by 4.", ["5 km/h"]),
    choice("y9-rate-dist-i5", "Which graph segment represents the greater speed?", "D", ["The flatter rising segment", "The horizontal segment", "Both always match", "The steeper rising segment"], "Steeper gradient means faster speed.", "\\text{Select A, B, C, or D.}", journey),
  ],
  commonMistakes: [
    { mistake: "Reading time from the vertical axis.", fix: "Time belongs on the horizontal axis." },
    { mistake: "Calling a flat segment slow movement.", fix: "A flat distance segment means stopped." },
    { mistake: "Using total distance without the matching time interval.", fix: "Use changes from the same graph segment." },
    { mistake: "Assuming every rising segment has the same speed.", fix: "Compare steepness or calculate gradients." },
  ],
  masteryQuiz: [
    answer("y9-rate-dist-m1", "A traveller covers 18 km in 3 hours. Find the speed.", "\\text{18 km in 3 h}", "6", "Divide 18 by 3.", ["6 km/h"]),
    choice("y9-rate-dist-m2", "What does a flat section show?", "B", ["Fast travel", "Stopped", "Negative distance", "Vertical travel"], "Distance is unchanged.", "\\text{Select A, B, C, or D.}", journey),
    answer("y9-rate-dist-m3", "Read the final distance.", "\\text{Use the graph stimulus.}", "12", "The final point is 12 km.", ["12 km"], journey),
    answer("y9-rate-dist-m4", "How long is the stopped interval?", "\\text{Use the graph stimulus.}", "1", "The stop lasts from hour 2 to hour 3.", ["1 hour", "1 h"], journey),
    choice("y9-rate-dist-m5", "Which quantity is the gradient of a distance-time graph?", "C", ["Distance only", "Time only", "Speed", "Starting position only"], "Gradient is distance change over time change.", "\\text{Select A, B, C, or D.}", journey),
    answer("y9-rate-dist-m6", "A graph rises from 4 km at hour 1 to 16 km at hour 4. Find the speed.", "\\text{Use the two graph values.}", "4", "Rise 12 over 3 hours.", ["4 km/h"], speedSegment),
    choice("y9-rate-dist-m7", "Segment A rises 8 km in 2 h. Segment B rises 9 km in 3 h. Which is faster?", "A", ["Segment A", "Segment B", "They match", "Cannot compare"], "The speeds are 4 km/h and 3 km/h."),
    answer("y9-rate-dist-m8", "A trip covers 30 km in the first 2 hours, stops for 1 hour, then covers 20 km in 2 hours. Find the total distance.", "\\text{Add travelled distances only.}", "50", "Add 30 and 20.", ["50 km"]),
    choice("y9-rate-dist-m9", "A distance-time graph rises, becomes flat, then rises more steeply. Which description fits?", "D", ["Slow down continuously", "Move backwards", "Stop permanently", "Travel, stop, then travel faster"], "The final steeper section represents a faster speed.", "\\text{Select A, B, C, or D.}", journey),
    answer("y9-rate-dist-m10", "A traveller is 5 km from home at hour 1 and 29 km from home at hour 5 on one straight segment. Find the constant speed.", "\\text{Use change in distance over change in time.}", "6", "Rise 24 over 4 hours.", ["6 km/h"]),
  ],
};

const modelling: LessonContent = {
  description: "Build and use linear models with a starting value and constant rate.",
  learningIntention: "Represent practical constant-rate situations with simple linear models.",
  successCriteria: ["Identify a starting value.", "Identify a constant rate.", "Write a simple model.", "Predict and compare model values."],
  teaching: { paragraphs: ["A linear model combines a starting value with a constant rate.", "The starting value is the amount present when the input is zero. The rate tells us how much the output changes for each input step.", "A model can represent taxi fares, savings or equipment hire.", "Substitute an input to predict an output. For simple comparisons, calculate both model values at the same input."], latexBlocks: ["y=mx+b", "\\text{output}=\\text{rate}\\times\\text{input}+\\text{starting value}"] },
  workedExamples: [
    { title: "Write a taxi model", questionLatex: "\\text{A taxi fare has a }\\$5\\text{ starting fee and costs }\\$3\\text{ per km. Write a model.}", steps: [{ explanation: "Use rate times distance plus starting fee.", latex: "C=3d+5" }], finalAnswerLatex: "C=3d+5" },
    { title: "Predict a hire cost", questionLatex: "\\text{Equipment hire follows }C=12h+20.\\text{ Find the cost for 4 hours.}", steps: [{ explanation: "Substitute h = 4.", latex: "C=12(4)+20=68" }], finalAnswerLatex: "\\$68" },
    { title: "Compare two options", questionLatex: "\\text{Plan A: }C=4h+10.\\quad\\text{Plan B: }C=3h+18.\\text{ Compare at 5 hours.}", steps: [{ explanation: "Calculate both costs.", latex: "A=30,\\quad B=33" }], finalAnswerLatex: "\\text{Plan A is cheaper by }\\$3" },
  ],
  guidedPractice: [
    answer("y9-rate-model-g1", "A cost follows C = 6h + 15. Find the exact cost for 4 hours.", "C=6h+15", "39", "Substitute 4.", ["$39"]),
    choice("y9-rate-model-g2", "In C = 8h + 25, what does 25 represent?", "A", ["Starting fee", "Hourly rate", "Hours", "Total after 25 hours"], "The constant is the starting value."),
    choice("y9-rate-model-g3", "Which model represents 7 dollars per week added to starting savings of 40 dollars?", "C", ["$S=40w+7$", "$S=47w$", "$S=7w+40$", "$S=7-w$"], "Rate multiplies weeks; starting amount is constant."),
    answer("y9-rate-model-g4", "Savings follow S = 12w + 30. Find the exact balance after 5 weeks.", "S=12w+30", "90", "Substitute 5.", ["$90"]),
  ],
  independentPractice: [
    answer("y9-rate-model-i1", "A taxi fare follows C = 4d + 6. Find the exact fare for 8 km.", "C=4d+6", "38", "Substitute 8.", ["$38"]),
    choice("y9-rate-model-i2", "Which model has starting value 18 and rate 5?", "B", ["$y=18x+5$", "$y=5x+18$", "$y=23x$", "$y=18-5x$"], "Use rate times input plus starting value."),
    answer("y9-rate-model-i3", "A hire cost follows C = 9h + 12. The exact cost is 57 dollars. Find h.", "C=9h+12", "5", "Solve 57 = 9h + 12."),
    choice("y9-rate-model-i4", "Plan A costs 5h + 10. Plan B costs 3h + 18. Which is cheaper at 3 hours?", "A", ["Plan A", "Plan B", "They match", "Cannot compare"], "The costs are $25 and $27."),
    answer("y9-rate-model-i5", "A balance starts at 75 dollars and rises by 20 dollars each week. Find the exact balance after 6 weeks.", "\\text{starting }\\$75,\\quad \\text{rate }\\$20/\\text{week}", "195", "Add 6 lots of $20.", ["$195"]),
  ],
  commonMistakes: [
    { mistake: "Swapping rate and starting value.", fix: "The rate multiplies the input; the starting value stands alone." },
    { mistake: "Ignoring the starting fee.", fix: "Add the initial amount after calculating the rate component." },
    { mistake: "Comparing rates only.", fix: "When starting values differ, calculate both outputs at the relevant input." },
    { mistake: "Forgetting units.", fix: "Interpret rates in context, such as dollars per hour." },
  ],
  masteryQuiz: [
    choice("y9-rate-model-m1", "In C = 11h + 30, what is the hourly rate?", "B", ["$30", "$11", "41 hours", "$330"], "The coefficient of h is the hourly rate."),
    answer("y9-rate-model-m2", "Find the exact cost for 3 hours.", "C=8h+14", "38", "Substitute 3.", ["$38"]),
    choice("y9-rate-model-m3", "Which model represents a 9 dollar starting fee and 4 dollars per km?", "D", ["$C=9d+4$", "$C=13d$", "$C=9-4d$", "$C=4d+9$"], "Use rate times distance plus starting fee."),
    answer("y9-rate-model-m4", "Savings follow S = 15w + 50. Find the exact balance after 8 weeks.", "S=15w+50", "170", "Substitute 8.", ["$170"]),
    answer("y9-rate-model-m5", "A fare follows C = 3d + 7. The exact fare is 31 dollars. Find d.", "C=3d+7", "8", "Solve 31 = 3d + 7."),
    choice("y9-rate-model-m6", "Plan A has lower starting fee but higher hourly rate than Plan B. Which statement is safest?", "C", ["A is always cheaper", "B is always cheaper", "The cheaper plan can depend on the hours", "The plans cannot be graphed"], "Different rates and starts may create a crossing."),
    answer("y9-rate-model-m7", "A balance starts at 120 dollars and rises by 18 dollars per week. Find the exact balance after 7 weeks.", "\\text{starting }\\$120,\\quad \\text{rate }\\$18/\\text{week}", "246", "Add 7 lots of $18.", ["$246"]),
    choice("y9-rate-model-m8", "Plan A costs 4h + 20. Plan B costs 6h + 8. Which is cheaper at 8 hours?", "A", ["Plan A by $4", "Plan B by $4", "They match", "Plan A by $12"], "Plan A costs $52 and Plan B costs $56."),
    answer("y9-rate-model-m9", "A linear cost starts at 35 dollars and reaches 67 dollars after 4 hours. Find the hourly rate.", "\\text{starting }\\$35,\\quad \\text{4-hour cost }\\$67", "8", "The increase is $32 over 4 hours.", ["$8", "8 dollars per hour"]),
    choice("y9-rate-model-m10", "A savings graph crosses the vertical axis at 60 and rises 25 for each week. Which model matches?", "B", ["$S=60w+25$", "$S=25w+60$", "$S=25w-60$", "$S=60-25w$"], "The rate is 25 and starting value is 60."),
  ],
};

const lessons: Record<string, LessonContent> = {
  "cartesian-plane-review": cartesianPlane,
  "tables-rules-and-graphs": tablesRules,
  "gradient-from-points": gradient,
  "gradient-intercept-form": interceptForm,
  "parallel-lines-foundations": parallel,
  "distance-time-graphs": distanceTime,
  "linear-modelling": modelling,
};

export function year9ConstantRatesOfChangeLessonOverride(course: CoursePathwaySeed, unit: CourseUnitSeed, lesson: CourseLessonSeed): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) || unit.slug !== "constant-rates-of-change") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return { syllabusArea: "Number and Algebra", masteryPassMark: 0.8, ...content };
}
