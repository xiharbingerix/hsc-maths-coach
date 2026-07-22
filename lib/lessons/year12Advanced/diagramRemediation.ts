import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { CartesianGraph } from "../types";

type QuestionPatch = Partial<PracticeQuestion>;

const positivePoints = [
  { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4.5 },
  { x: 4, y: 5 }, { x: 5, y: 7 }, { x: 6, y: 8 },
];
const negativePoints = positivePoints.map(({ x, y }) => ({ x, y: 10 - y }));

const QUESTION_PATCHES: Record<string, QuestionPatch> = {
  "graphsolve-ind-4": {
    prompt: "Use the graph to identify the solutions of f(x) = 0.",
    latex: "",
    cartesianGraph: {
      description: "Upward-opening parabola crossing the x-axis at negative 4 and 2.",
      xMin: -6, xMax: 4, yMin: -10, yMax: 14, showGrid: true,
      parabolas: [{ kind: "quadratic", a: 1, b: 2, c: -8, label: "y=f(x)" }],
      points: [{ x: -4, y: 0, label: "(-4, 0)" }, { x: 2, y: 0, label: "(2, 0)" }],
    },
  },
  "asym-ind-5": {
    prompt: "Which description matches the displayed graph?",
    cartesianGraph: {
      description: "Reciprocal graph y equals 1 over x minus 2, plus 4, with asymptotes x equals 2 and y equals 4.",
      xMin: -4, xMax: 8, yMin: -3, yMax: 10, showGrid: true,
      curves: [{ kind: "reciprocal", a: 1, h: 2, k: 4, label: "y=1/(x-2)+4" }],
    },
  },
  "asym-pool-d5-1": {
    prompt: "The displayed reciprocal curve has equation y = a + 4/(x - 2) and horizontal asymptote y = 3. Find its y-intercept.",
    cartesianGraph: {
      description: "Reciprocal curve y equals 3 plus 4 over x minus 2, with horizontal asymptote y equals 3 and vertical asymptote x equals 2.",
      xMin: -5, xMax: 8, yMin: -5, yMax: 11, showGrid: true,
      curves: [{ kind: "reciprocal", a: 4, h: 2, k: 3, label: "y=a+4/(x-2)" }],
      points: [{ x: 0, y: 1, label: "y-intercept" }],
    },
  },
  "radians-guided-4": {
    prompt: "Complete the coordinate rule represented by the unit circle: (x, y) = (□θ, sin θ).",
    latex: "",
    unitCircleDiagram: {
      description: "Unit circle with a first-quadrant terminal point labelled with its cosine x-coordinate and sine y-coordinate.",
      angleRadians: "θ", terminalPoint: { x: "cos θ", y: "sin θ", label: "P" },
      quadrant: 1, showReferenceTriangle: true, highlightRadius: true,
    },
  },
  "trig-graphs-ind-3": {
    prompt: "Which function is represented by the displayed graph with period π and vertical asymptotes?",
    latex: "",
    trigGraphDiagram: {
      description: "Graph of y equals tan x from negative pi to pi, with vertical asymptotes at negative pi over 2 and pi over 2.",
      functionType: "tan", equationLabel: "y = tan x", xMin: "-pi", xMax: "pi",
      asymptotes: [{ x: "-pi/2" }, { x: "pi/2" }],
    },
  },
  "trig-graphs-mastery-3": {
    prompt: "Which function is represented by the displayed graph?",
    latex: "",
    trigGraphDiagram: {
      description: "Graph of y equals tan x, with repeating branches separated by vertical asymptotes and period pi.",
      functionType: "tan", equationLabel: "y = tan x", xMin: "-pi", xMax: "pi",
      asymptotes: [{ x: "-pi/2" }, { x: "pi/2" }], periodMarkers: [{ x: "0" }, { x: "pi" }],
    },
  },
  "inc-dec-guided-4": {
    prompt: "Use the sign table for f'(x) = (x - 1)(x - 3). Fill in the missing sign on 1 < x < 3.",
    latex: "",
    dataTableDiagram: {
      description: "Sign table for f prime with zeros at x equals 1 and x equals 3; the middle interval sign is missing.",
      columnHeaders: ["Interval", "x < 1", "x = 1", "1 < x < 3", "x = 3", "x > 3"],
      values: [["sign of f'(x)", "+", "0", "?", "0", "+"]], highlight: { rowIndex: 0, columnIndex: 3 },
    },
  },
  "appdiff-conc-m10": {
    prompt: "Which conclusion is justified by the displayed derivative sign table?",
    latex: "",
    dataTableDiagram: {
      description: "Derivative sign table around x equals 2: f prime is positive on both sides and zero at 2, while f double prime changes from negative to positive.",
      columnHeaders: ["", "x < 2", "x = 2", "x > 2"], rowHeaders: ["f'(x)", "f''(x)"],
      values: [["+", "0", "+"], ["−", "0", "+"]],
    },
  },
  "mixed-int-mastery-6": {
    prompt: "Use the displayed ordinates and trapezoids to estimate the integral.",
    trapezoidalRuleDiagram: {
      description: "Three ordinates at x equals 0, 2 and 4 with heights 1, 3 and 5, joined by two trapezoids of width 2.",
      xValues: [0, 2, 4], yValues: [1, 3, 5], showOrdinateLabels: true, showTrapezoidLabels: true,
    },
  },
  "prob-basic-m3": {
    prompt: "Use the Venn diagram to find P(A ∪ B).",
    latex: "",
    vennDiagram: {
      description: "Venn diagram with 5 outcomes in A only, 2 in both A and B, 3 in B only and 4 in neither.",
      setALabel: "A", setBLabel: "B", aOnly: 5, intersection: 2, bOnly: 3, neither: 4, total: 14, showCounts: true,
    },
  },
  "prob-cond-m7": {
    prompt: "Use the probability tree. To find P(B), which path probabilities should be combined?",
    latex: "",
    probabilityTreeDiagram: {
      description: "Two-stage probability tree with event A on the first stage and event B on the second stage; the A then B path is highlighted.",
      rootLabel: "Start", stages: ["First event", "Second event"],
      branches: [
        { id: "A", label: "A", probability: "P(A)", children: [{ id: "AB", label: "B", probability: "P(B|A)" }, { id: "ABc", label: "B'", probability: "P(B'|A)" }] },
        { id: "Ac", label: "A'", probability: "P(A')", children: [{ id: "AcB", label: "B", probability: "P(B|A')" }, { id: "AcBc", label: "B'", probability: "P(B'|A')" }] },
      ], highlightedPaths: [["A", "AB"]],
    },
  },
  "prob-exam-g1": {
    prompt: "Use the two-way table to find P(A | B).",
    latex: "",
    twoWayTableDiagram: {
      description: "Frequency table in which 12 of the 40 outcomes in B are also in A.",
      rowLabels: ["A", "A'"], columnLabels: ["B", "B'"], values: [[12, 18], [28, 42]],
      rowTotals: [30, 70], columnTotals: [40, 60], grandTotal: 100, highlight: { kind: "column", columnIndex: 0 },
    },
  },
  "prob-exam-i1": {
    prompt: "Use the two-way table to find P(A | B).",
    latex: "",
    twoWayTableDiagram: {
      description: "Frequency table in which 15 of the 50 outcomes in B are also in A.",
      rowLabels: ["A", "A'"], columnLabels: ["B", "B'"], values: [[15, 25], [35, 25]],
      rowTotals: [40, 60], columnTotals: [50, 50], grandTotal: 100, highlight: { kind: "column", columnIndex: 0 },
    },
  },
  "prob-exam-m10": {
    prompt: "Use the probability table to decide whether A and B are independent.",
    latex: "",
    twoWayTableDiagram: {
      description: "Probability table where P of A is 0.4 and, within column B, P of A given B is also 0.4.",
      rowLabels: ["A", "A'"], columnLabels: ["B", "B'"], values: [["0.20", "0.20"], ["0.30", "0.30"]],
      rowTotals: ["0.40", "0.60"], columnTotals: ["0.50", "0.50"], grandTotal: "1.00", highlight: { kind: "column", columnIndex: 0 },
    },
  },
  "spread-mastery-8": {
    prompt: "Use the box plot to find the interquartile range.",
    latex: "",
    boxPlotDiagram: {
      description: "Box plot with first quartile 6, median 10 and third quartile 14, with whiskers at 2 and 18.",
      plots: [{ label: "Data", min: 2, q1: 6, median: 10, q3: 14, max: 18 }], showValueLabels: true,
    },
  },
  "correlation-ind-4": {
    prompt: "The scatterplot shows a strong association. Which statement about causation is valid?",
    latex: "",
    scatterPlotDiagram: { description: "Scatterplot showing a strong positive linear association.", xAxisLabel: "x", yAxisLabel: "y", points: positivePoints, lineOfBestFit: "auto" },
  },
  "regression-pool-d5-2": {
    prompt: "Use the scatterplot and its correlation coefficient to describe the relationship.",
    latex: "",
    scatterPlotDiagram: { description: "Scatterplot showing a strong negative linear association.", xAxisLabel: "x", yAxisLabel: "y", points: negativePoints, correlationLabel: "r = −0.92" },
  },
  "residual-mastery-8": {
    prompt: "What does the shape of the displayed residual plot suggest?",
    latex: "",
    scatterPlotDiagram: {
      description: "Residual plot with a clear U-shaped pattern: positive residuals at low and high fitted values and negative residuals in the middle.",
      xAxisLabel: "Fitted value", yAxisLabel: "Residual", yMin: -4, yMax: 5,
      points: [{ x: 1, y: 4 }, { x: 2, y: 1 }, { x: 3, y: -2 }, { x: 4, y: -3 }, { x: 5, y: -1 }, { x: 6, y: 2 }, { x: 7, y: 4 }],
      lineOfBestFit: { m: 0, b: 0 },
    },
  },
  "residual-mastery-10": {
    prompt: "Use the scatterplot to identify the feature most likely to have a large residual.",
    latex: "",
    scatterPlotDiagram: {
      description: "Scatterplot with a positive linear trend and one point far below the trend line.",
      xAxisLabel: "x", yAxisLabel: "y", points: [...positivePoints, { x: 5, y: 1, label: "P" }], lineOfBestFit: { m: 1.2, b: 0.7 },
    },
  },
  "mixed-stats-ind-4": {
    prompt: "Which conclusion is supported by the displayed residual plot?",
    latex: "",
    scatterPlotDiagram: {
      description: "Residual plot with points randomly scattered above and below the zero line and no visible pattern.",
      xAxisLabel: "Fitted value", yAxisLabel: "Residual", yMin: -3, yMax: 3,
      points: [{ x: 1, y: 1 }, { x: 2, y: -1.5 }, { x: 3, y: 0.4 }, { x: 4, y: 1.6 }, { x: 5, y: -0.8 }, { x: 6, y: 0.7 }, { x: 7, y: -1.2 }],
      lineOfBestFit: { m: 0, b: 0 },
    },
  },
  "normal-mastery-1": {
    prompt: "Which description matches the displayed normal distribution?",
    latex: "",
    normalDistributionDiagram: { description: "A symmetric, bell-shaped normal distribution centred at zero.", mean: 0, standardDeviation: 1, showStandardDeviationLabels: true },
  },
  "ma-s3-normal-g2": {
    prompt: "Use the cumulative standard normal table entry to find P(Z ≤ 1.32).",
    latex: "",
    dataTableDiagram: { description: "Cumulative standard normal table entry at z equals 1.32.", columnHeaders: ["z", "Φ(z)"], values: [["1.32", "0.9066"]], highlight: { rowIndex: 0, columnIndex: 1 } },
  },
  "y12adv-ssfm-fin-m6": {
    prompt: "A savings sequence starts with term u₀ = P. Which exponent appears in the first term?",
  },
};

const plane = (description: string, content: Omit<CartesianGraph, "description">): Partial<WorkedExample> => ({
  cartesianGraph: { description, showGrid: true, ...content },
});

const WORKED_EXAMPLE_PATCHES: Record<string, Partial<WorkedExample>> = {
  "graph-transformations:0": plane("Graphs of y equals x squared and its translation three units right and five units up.", { xMin: -5, xMax: 8, yMin: -2, yMax: 25, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=x²" }, { kind: "quadratic", a: 1, b: -6, c: 14, label: "y=(x−3)²+5" }] }),
  "graph-transformations:1": plane("Graphs of y equals x squared and its reflected, stretched and translated image y equals negative 2 times x plus 1 squared minus 4.", { xMin: -6, xMax: 4, yMin: -24, yMax: 14, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=x²" }, { kind: "quadratic", a: -2, b: -4, c: -6, label: "y=−2(x+1)²−4" }] }),
  "graph-transformations:2": plane("Representative graph showing y equals f of x and the image y equals f of x minus 2, minus 1, using f of x equals x squared.", { xMin: -4, xMax: 7, yMin: -3, yMax: 18, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "y=f(x)" }, { kind: "quadratic", a: 1, b: -4, c: 3, label: "y=f(x−2)−1" }] }),
  "intercepts-key-features:0": plane("Parabola y equals x minus 2 squared minus 9, showing its vertex and intercepts.", { xMin: -4, xMax: 8, yMin: -12, yMax: 18, parabolas: [{ kind: "quadratic", a: 1, b: -4, c: -5, label: "y=(x−2)²−9" }], points: [{ x: -1, y: 0, label: "x-intercept" }, { x: 5, y: 0, label: "x-intercept" }, { x: 2, y: -9, label: "vertex" }, { x: 0, y: -5, label: "y-intercept" }] }),
  "intercepts-key-features:1": plane("Downward-opening parabola y equals negative x squared plus 4x plus 5, showing its vertex and intercepts.", { xMin: -4, xMax: 8, yMin: -12, yMax: 12, parabolas: [{ kind: "quadratic", a: -1, b: 4, c: 5, label: "y=−x²+4x+5" }], points: [{ x: -1, y: 0 }, { x: 5, y: 0 }, { x: 2, y: 9, label: "vertex" }, { x: 0, y: 5 }] }),
  "solving-equations-inequalities-graphically:0": plane("Graph of y equals x squared minus 4, whose x-intercepts give the equation's solutions.", { xMin: -4, xMax: 4, yMin: -6, yMax: 10, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: -4, label: "y=x²−4" }], points: [{ x: -2, y: 0 }, { x: 2, y: 0 }] }),
  "solving-equations-inequalities-graphically:1": plane("Graphs of f of x equals x squared and g of x equals 2x plus 3; intersections solve f equals g and relative height shows the inequality.", { xMin: -4, xMax: 6, yMin: -5, yMax: 24, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "f(x)=x²" }], lines: [{ kind: "linear", m: 2, b: 3, label: "g(x)=2x+3" }], points: [{ x: -1, y: 1 }, { x: 3, y: 9 }] }),
  "mixed-functions-graphing-exam-practice:0": plane("Parabola f of x equals x minus 2 squared minus 9 with key features marked.", { xMin: -4, xMax: 8, yMin: -12, yMax: 18, parabolas: [{ kind: "quadratic", a: 1, b: -4, c: -5, label: "f(x)=(x−2)²−9" }], points: [{ x: -1, y: 0 }, { x: 5, y: 0 }, { x: 2, y: -9, label: "vertex" }] }),
  "mixed-functions-graphing-exam-practice:1": plane("Reciprocal graph y equals 1 over x minus 3 plus 2, approaching x equals 3 and y equals 2.", { xMin: -5, xMax: 10, yMin: -5, yMax: 9, curves: [{ kind: "reciprocal", a: 1, h: 3, k: 2, label: "y=1/(x−3)+2" }] }),
  "mixed-functions-graphing-exam-practice:2": plane("Graphs of f of x equals x squared and g of x equals x plus 6 with their intersections shown.", { xMin: -5, xMax: 6, yMin: -5, yMax: 24, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "f(x)=x²" }], lines: [{ kind: "linear", m: 1, b: 6, label: "g(x)=x+6" }], points: [{ x: -2, y: 4 }, { x: 3, y: 9 }] }),
  "asymptotes-reciprocal-graphs:0": plane("Reciprocal graph y equals 1 over x minus 2 plus 3, approaching vertical asymptote x equals 2 and horizontal asymptote y equals 3.", { xMin: -5, xMax: 9, yMin: -5, yMax: 10, curves: [{ kind: "reciprocal", a: 1, h: 2, k: 3, label: "y=1/(x−2)+3" }] }),
  "asymptotes-reciprocal-graphs:1": plane("Reciprocal graph y equals negative 2 over x plus 1 minus 4, approaching x equals negative 1 and y equals negative 4.", { xMin: -8, xMax: 6, yMin: -11, yMax: 4, curves: [{ kind: "reciprocal", a: -2, h: -1, k: -4, label: "y=−2/(x+1)−4" }] }),
  "exponential-logarithmic-graphs:0": plane("Increasing exponential graph y equals 2 to the power x plus 3, approaching horizontal asymptote y equals 3.", { xMin: -5, xMax: 5, yMin: 0, yMax: 20, curves: [{ kind: "exponential", base: 2, d: 3, label: "y=2ˣ+3" }] }),
  "exponential-logarithmic-graphs:1": plane("Logarithmic graph y equals log base 2 of x minus 1, with vertical asymptote x equals 1.", { xMin: -2, xMax: 10, yMin: -5, yMax: 5, curves: [{ kind: "logarithmic", base: 2, c: 1, label: "y=log₂(x−1)" }] }),
  "exponential-logarithmic-graphs:2": plane("Logarithmic graph y equals log base 2 of x minus 3 plus 4, with vertical asymptote x equals 3.", { xMin: 0, xMax: 13, yMin: -2, yMax: 8, curves: [{ kind: "logarithmic", base: 2, c: 3, d: 4, label: "y=log₂(x−3)+4" }] }),
  "absolute-value-functions:1": plane("Representative transformation y equals absolute value of f of x using f of x equals x squared minus 4; the portion below the x-axis is reflected upward.", { xMin: -4, xMax: 4, yMin: -1, yMax: 12, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: -4, xMax: -2, label: "y=|f(x)|" }, { kind: "quadratic", a: -1, b: 0, c: 4, xMin: -2, xMax: 2, label: "reflected section" }, { kind: "quadratic", a: 1, b: 0, c: -4, xMin: 2 }] }),
  "absolute-value-functions:2": plane("Representative graph for y equals f of absolute x using f of x equals x minus 2; the right half is reflected across the y-axis.", { xMin: -6, xMax: 6, yMin: -4, yMax: 6, curves: [{ kind: "absolute", a: 1, h: 0, k: -2, label: "y=|x|−2" }] }),
  "inverse-functions:2": plane("Parabola y equals x squared restricted to x greater than or equal to zero so that it is one-to-one and has an inverse.", { xMin: -1, xMax: 6, yMin: -1, yMax: 25, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, xMin: 0, label: "f(x)=x², x≥0" }] }),
  "radians-exact-values-unit-circle:0": { unitCircleDiagram: { description: "Unit circle terminal side at 150 degrees, or five pi over six, in quadrant two.", angleDegrees: "150°", angleRadians: "5π/6", quadrant: 2, referenceAngle: "π/6", highlightRadius: true } },
  "radians-exact-values-unit-circle:1": { unitCircleDiagram: { description: "Unit circle reference points used for the exact values at pi over 3, pi and pi over 4.", angleRadians: "π/3", terminalPoint: { x: "1/2", y: "√3/2" }, quadrant: 1, symmetryPoints: [{ x: "−1", y: "0", label: "π" }, { x: "√2/2", y: "√2/2", label: "π/4" }], highlightRadius: true } },
  "radians-exact-values-unit-circle:2": { unitCircleDiagram: { description: "Unit circle terminal side at five pi over six in quadrant two, where sine is positive and cosine is negative.", angleRadians: "5π/6", terminalPoint: { x: "−√3/2", y: "1/2" }, quadrant: 2, referenceAngle: "π/6", showReferenceTriangle: true } },
  "probability-basics-venn-diagrams:0": { vennDiagram: { description: "Venn diagram probabilities with A only 0.3, intersection 0.1, B only 0.2 and neither 0.4.", setALabel: "A", setBLabel: "B", aOnly: "0.3", intersection: "0.1", bOnly: "0.2", neither: "0.4", total: "1", showCounts: true } },
  "probability-basics-venn-diagrams:1": { vennDiagram: { description: "Venn diagram probabilities with A only 0.35, intersection 0.15, B only 0.25 and neither 0.25.", setALabel: "A", setBLabel: "B", aOnly: "0.35", intersection: "0.15", bOnly: "0.25", neither: "0.25", total: "1", showCounts: true } },
  "conditional-probability-tree-diagrams:0": { probabilityTreeDiagram: { description: "Two-stage probability tree for A then B, with conditional probabilities on the second-stage branches.", rootLabel: "Start", stages: ["A", "B"], branches: [{ id: "A", label: "A", probability: "0.4", children: [{ id: "AB", label: "B", probability: "0.3" }, { id: "ABc", label: "B'", probability: "0.7" }] }, { id: "Ac", label: "A'", probability: "0.6", children: [{ id: "AcB", label: "B", probability: "0.2" }, { id: "AcBc", label: "B'", probability: "0.8" }] }] } },
  "conditional-probability-tree-diagrams:1": { probabilityTreeDiagram: { description: "Two-draw probability tree for a bag containing five red and three blue balls, without replacement.", rootLabel: "8 balls", stages: ["First draw", "Second draw"], branches: [{ id: "R", label: "Red", probability: "5/8", children: [{ id: "RR", label: "Red", probability: "4/7" }, { id: "RB", label: "Blue", probability: "3/7" }] }, { id: "B", label: "Blue", probability: "3/8", children: [{ id: "BR", label: "Red", probability: "5/7" }, { id: "BB", label: "Blue", probability: "2/7" }] }] } },
  "probability-exam-practice:0": { twoWayTableDiagram: { description: "Pass and fail results by gender for 70 students.", rowLabels: ["Male", "Female"], columnLabels: ["Pass", "Fail"], values: [[24, 6], [32, 8]], rowTotals: [30, 40], columnTotals: [56, 14], grandTotal: 70 } },
  "probability-exam-practice:1": { twoWayTableDiagram: { description: "The same pass and fail results by gender used in the preceding worked example, repeated so this question is self-contained.", rowLabels: ["Male", "Female"], columnLabels: ["Pass", "Fail"], values: [[24, 6], [32, 8]], rowTotals: [30, 40], columnTotals: [56, 14], grandTotal: 70 } },
  "random-variables-probability-distributions:0": { dataTableDiagram: { description: "Probability distribution for X taking values zero, one and two.", columnHeaders: ["x", "0", "1", "2"], values: [["P(X=x)", "0.2", "0.5", "0.3"]] } },
  "random-variables-probability-distributions:2": { dataTableDiagram: { description: "Probability distribution for X taking values zero, one and two.", columnHeaders: ["x", "0", "1", "2"], values: [["P(X=x)", "0.25", "0.50", "0.25"]] } },
  "area-under-a-curve:2": plane("The region between y equals negative x squared and the x-axis from x equals zero to x equals three.", { xMin: -1, xMax: 4, yMin: -10, yMax: 2, parabolas: [{ kind: "quadratic", a: -1, b: 0, c: 0, label: "y=−x²" }], shadedRegions: [{ kind: "between-functions", xMin: 0, xMax: 3, top: { functionType: "line", line: { m: 0, b: 0 } }, bottom: { functionType: "quadratic", quadratic: { a: -1, b: 0, c: 0 } }, color: "blue", description: "Area below the x-axis" }] }),
  "mixed-integral-calculus-exam-practice:1": plane("The two regions between y equals x minus 2 and the x-axis from x equals zero to x equals four; total area counts both positively.", { xMin: -1, xMax: 5, yMin: -3, yMax: 3, lines: [{ kind: "linear", m: 1, b: -2, label: "y=x−2" }], shadedRegions: [{ kind: "between-functions", xMin: 0, xMax: 2, top: { functionType: "line", line: { m: 0, b: 0 } }, bottom: { functionType: "line", line: { m: 1, b: -2 } }, color: "amber" }, { kind: "between-functions", xMin: 2, xMax: 4, top: { functionType: "line", line: { m: 1, b: -2 } }, bottom: { functionType: "line", line: { m: 0, b: 0 } }, color: "blue" }] }),
  "mixed-statistical-analysis-exam-practice:2": { normalDistributionDiagram: { description: "Normal distribution with mean 50 and standard deviation 4, highlighting the central interval within two standard deviations of the mean.", mean: 50, standardDeviation: 4, axisLabel: "Value", showStandardDeviationLabels: true, shadedBands: [{ standardDeviations: 2, label: "about 95%", color: "blue" }] } },
};

function patchWorkedExamples(lesson: ExplicitLesson): WorkedExample[] {
  return lesson.workedExamples.map((example, index) => ({
    ...example,
    ...WORKED_EXAMPLE_PATCHES[`${lesson.slug}:${index}`],
  }));
}

export function applyYear12AdvancedQuestionDiagramRemediation(question: PracticeQuestion): PracticeQuestion {
  const patch = QUESTION_PATCHES[question.id];
  return patch ? { ...question, ...patch } : question;
}

export function applyYear12AdvancedDiagramRemediation(lesson: ExplicitLesson): ExplicitLesson {
  return {
    ...lesson,
    workedExamples: patchWorkedExamples(lesson),
    guidedPractice: lesson.guidedPractice.map(applyYear12AdvancedQuestionDiagramRemediation),
    independentPractice: lesson.independentPractice.map(applyYear12AdvancedQuestionDiagramRemediation),
    masteryQuiz: lesson.masteryQuiz.map(applyYear12AdvancedQuestionDiagramRemediation),
    masteryQuizPool: lesson.masteryQuizPool?.map(applyYear12AdvancedQuestionDiagramRemediation),
    multiPartPractice: lesson.multiPartPractice?.map(applyYear12AdvancedQuestionDiagramRemediation),
  };
}
