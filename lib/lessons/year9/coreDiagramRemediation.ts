import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { BoxPlotDiagram, CartesianGraph, TriangleDiagram } from "../types";

type Patch = Partial<PracticeQuestion>;

const triangle = (
  description: string,
  options: Partial<TriangleDiagram> = {}
): TriangleDiagram => ({
  description,
  vertices: { A: { x: 55, y: 220 }, B: { x: 305, y: 220 }, C: { x: 175, y: 45 } },
  ...options,
});

const right345 = triangle("Right triangle with side lengths 3, 4 and 5 and angle theta at B.", {
  vertices: { A: { x: 55, y: 220 }, B: { x: 295, y: 220 }, C: { x: 55, y: 55 } },
  sideLabels: { AB: "4", AC: "3", BC: "5" }, angleLabels: { B: "θ" }, rightAngleAt: "A",
});

const table = (description: string, headers: string[], values: (number | string)[][]): Patch => ({
  dataTableDiagram: { description, columnHeaders: headers, values },
});

const bars = (description: string, values: [string, number][], valueAxisLabel = "Frequency"): Patch => ({
  barChartDiagram: { description, bars: values.map(([label, value]) => ({ label, value })), valueAxisLabel },
});

const box = (
  description: string,
  values: [number, number, number, number, number],
  showValueLabels = true,
  label = "Data"
): Patch => {
  const [min, q1, median, q3, max] = values;
  const diagram: BoxPlotDiagram = {
    description, plots: [{ label, min, q1, median, q3, max }],
    axisLabel: "Value", xMin: Math.min(0, min), xMax: max + Math.max(2, (max - min) * 0.1), showValueLabels,
  };
  return { boxPlotDiagram: diagram };
};

const sector = (description: string, angleDegrees: number, radiusLabel?: string, arcLabel?: string): Patch => ({
  sectorDiagram: { description, angleDegrees, radiusLabel, arcLabel, angleLabel: `${angleDegrees}°`, showFullCircle: true },
});

const bearing = (direction: string, degrees: number): Patch => ({
  bearingsDiagram: {
    description: `Compass diagram with a ray pointing due ${direction}, measured clockwise from North.`,
    originLabel: "O", rays: [{ bearing: degrees, label: direction[0].toUpperCase(), showAngle: true }],
  },
});

const probabilityTree: Patch = {
  probabilityTreeDiagram: {
    description: "Two-stage probability tree showing that probabilities multiply along a path and alternative paths are added.",
    rootLabel: "Start", stages: ["Stage 1", "Stage 2"],
    branches: [
      { id: "A", label: "A", probability: "P(A)", children: [{ id: "AB", label: "B", probability: "P(B|A)" }, { id: "ABc", label: "B'", probability: "P(B'|A)" }] },
      { id: "Ac", label: "A'", probability: "P(A')", children: [{ id: "AcB", label: "B", probability: "P(B|A')" }, { id: "AcBc", label: "B'", probability: "P(B'|A')" }] },
    ],
  },
};

const coinTree = {
  description: "Two-toss probability tree for a fair coin, with Heads and Tails each having probability one half at both stages.",
  rootLabel: "Start", stages: ["First toss", "Second toss"],
  branches: [
    { id: "H", label: "H", probability: "1/2", children: [{ id: "HH", label: "H", probability: "1/2" }, { id: "HT", label: "T", probability: "1/2" }] },
    { id: "T", label: "T", probability: "1/2", children: [{ id: "TH", label: "H", probability: "1/2" }, { id: "TT", label: "T", probability: "1/2" }] },
  ],
};

const PATCHES: Record<string, Patch> = {
  "p2d-11": { triangleDiagram: triangle("Isosceles triangle with base 16 centimetres and two equal sides of 10 centimetres.", { sideLabels: { AB: "16 cm", AC: "10 cm", BC: "10 cm" }, sideTicks: { AC: 1, BC: 1 } }) },
  "y9-trr-p1": { triangleDiagram: right345 },
  "y9-trr-p9": { triangleDiagram: right345 },
  "y9-brg-g1": bearing("east", 90),
  "y9-brg-g2": bearing("south", 180),
  "y9-brg-i1": bearing("west", 270),
  "y9-brg-i5": bearing("south", 180),
  "y9-brg-m1": bearing("north", 0),
  "y9-brg-m8": bearing("south", 180),
  "y9-ilr-i4": { prompt: "Use the table. Which type of relationship has a constant first difference?", ...table("Values with a constant first difference of 3.", ["x", "y"], [[0, 2], [1, 5], [2, 8], [3, 11]]) },
  "y9-ilr-p10": { prompt: "Use the table to find c, the value of y when x = 0.", ...table("Table of x and y values following y equals 3x plus 2.", ["x", "y"], [[0, 2], [1, 5], [2, 8], [3, 11]]) },
  "y9-cc-g4": sector("Semicircle with radius 6; the curved edge is the required arc.", 180, "6", "arc length"),
  "y9-cc-i3": sector("Quarter circle with radius 4; the curved edge is the required arc.", 90, "4", "arc length"),
  "y9-cc-i4": sector("Generic sector showing its curved arc and two radii, which together form the perimeter.", 80, "r", "arc length"),
  "y9-cc-m3": sector("Semicircle with radius 10; the curved edge is the required arc.", 180, "10", "arc length"),
  "y9-cc-m4": sector("Quarter circle with radius 12; the curved edge is the required arc.", 90, "12", "arc length"),
  "y9-cc-m7": { sectorDiagram: { description: "Sector with radius 5 and arc length 3 pi; its perimeter includes the arc and both radii.", angleDegrees: 108, radiusLabel: "5", arcLabel: "3π", showFullCircle: true } },
  "y9-cc-p8": { sectorDiagram: { description: "Sector with radius 7 and arc length 7 pi shown within its full circle; the fraction of the circle is unknown.", angleDegrees: 180, radiusLabel: "7", arcLabel: "7π", angleLabel: "?", showFullCircle: true } },
  "chal-y9-cc-6": { sectorDiagram: { description: "Sector on a circle of radius 12 with arc length 4 pi and unknown central angle.", angleDegrees: 60, radiusLabel: "12", arcLabel: "4π", angleLabel: "?", showFullCircle: true } },
  "chal-y9-cc-8": sector("One of two identical semicircles, each with radius 4; total arc length is twice the displayed semicircular arc.", 180, "4", "one arc"),
  "y9-cs-p7": { planeShapeDiagram: { description: "Composite figure formed by a 6 by 5 rectangle with a triangle of base 6 and perpendicular height 4 attached above and below.", vertices: [{ x: 0, y: 0 }, { x: 0, y: 5 }, { x: 3, y: 9 }, { x: 6, y: 5 }, { x: 6, y: 0 }, { x: 3, y: -4 }], edges: [{ label: "5" }, { label: "triangle h=4" }, { label: "base 6" }, { label: "5" }, { label: "triangle h=4" }, { label: "base 6" }] } },
  "cs-7": { planeShapeDiagram: { description: "Composite figure formed by a 6 by 5 rectangle with a triangle of base 6 and perpendicular height 4 attached above and below.", vertices: [{ x: 0, y: 0 }, { x: 0, y: 5 }, { x: 3, y: 9 }, { x: 6, y: 5 }, { x: 6, y: 0 }, { x: 3, y: -4 }], edges: [{ label: "5" }, { label: "h=4" }, { label: "base 6" }, { label: "5" }, { label: "h=4" }, { label: "base 6" }] } },
  "y9-sap-m10": { solid3DDiagram: { description: "Rectangular prism labelled length, width and height to support reasoning about all faces in its surface area.", solid: "rectangularPrism", labels: { length: "l", width: "w", height: "h" } } },
  "y9-vp-g4": { solid3DDiagram: { description: "Rectangular prism showing a base area and perpendicular length, illustrating volume equals cross-sectional area times length.", solid: "rectangularPrism", labels: { length: "length", width: "base", height: "height" } } },
  "y9-vp-p9": { compositeSolidDiagram: { description: "L-shaped prism with cross-sectional area 20 square centimetres and length 7 centimetres.", kind: "lShapedPrism", sections: [{ length: 7, width: 4, height: 2 }, { length: 7, width: 2, height: 6 }], unit: "cm" } },
  "vp-9": { compositeSolidDiagram: { description: "L-shaped prism with cross-sectional area 20 square centimetres and length 7 centimetres.", kind: "lShapedPrism", sections: [{ length: 7, width: 4, height: 2 }, { length: 7, width: 2, height: 6 }], unit: "cm" } },
  "y9-td-g4": probabilityTree,
  "y9-td-i4": probabilityTree,
  "y9-idt-g1": { prompt: "Use the frequency table to find the total number of votes.", ...table("Votes for three pets.", ["Pet", "Cat", "Dog", "Fish"], [["Votes", 7, 10, 3]]) },
  "y9-idt-g4": { prompt: "Use the column graph. What does the height of each column represent?", ...bars("Column graph of category frequencies.", [["A", 3], ["B", 7], ["C", 5]]) },
  "y9-idt-i1": { prompt: "Use the table to find the total sales.", ...table("Sales for Monday to Wednesday.", ["Day", "Mon", "Tue", "Wed"], [["Sales", 20, 35, 25]]) },
  "y9-idt-m1": { prompt: "Use the frequency table to find the total number of results.", ...table("Frequencies for categories A to D.", ["Category", "A", "B", "C", "D"], [["Frequency", 5, 8, 2, 5]]) },
  "y9-idt-m10": { prompt: "Use the divided bar graph to find how many more students walk than travel by car.", ...bars("Travel methods for 100 students: 40 walk, 35 take the bus and 25 travel by car.", [["Walk", 40], ["Bus", 35], ["Car", 25]], "Students") },
  "y9-idt-p2": { prompt: "Use the transport table to find the percentage who cycle.", ...table("Transport methods for 200 people.", ["Method", "Bus", "Car", "Walk", "Cycle"], [["People", 80, 60, 40, 20]]) },
  "y9-idt-p5": { prompt: "Use the frequency table to calculate the mean.", ...table("Values one to four with their frequencies.", ["Value", "1", "2", "3", "4"], [["Frequency", 4, 6, 8, 2]]) },
  "y9-idt-p7": { prompt: "Use the rainfall table. What fraction of the week's rain fell on Wednesday?", ...table("Daily rainfall in millimetres from Monday to Friday.", ["Day", "Mon", "Tue", "Wed", "Thu", "Fri"], [["Rainfall (mm)", 4, 0, 12, 6, 8]]) },
  "y9-idt-p8": { prompt: "Use the column graph to find the percentage increase from week 1 to week 4.", ...bars("Weekly profit with week 1 at 200 dollars and week 4 at 400 dollars.", [["Week 1", 200], ["Week 4", 400]], "Profit ($)") },
  "y9-idt-p9": { prompt: "Use the sector graph of the 1200 dollar budget to find the amount spent on food.", pieChartDiagram: { description: "Budget sector graph: rent 50 percent, food 25 percent and other costs 25 percent.", slices: [{ label: "Rent", value: 50 }, { label: "Food", value: 25 }, { label: "Other", value: 25 }], showPercentages: true } },
  "idt-1": { prompt: "Use the frequency table to calculate the mean to one decimal place.", ...table("Values five to eight with their frequencies.", ["Value", "5", "6", "7", "8"], [["Frequency", 3, 5, 8, 4]]) },
  "idt-5": { prompt: "Use the quarterly sales graph. What percentage of the year's total came from Q3?", ...bars("Quarterly sales in thousands of dollars.", [["Q1", 200], ["Q2", 250], ["Q3", 300], ["Q4", 250]], "Sales ($000s)") },
  "idt-6": { prompt: "Use the frequency table to find the median.", ...table("Twenty values distributed from one to four.", ["Value", "1", "2", "3", "4"], [["Frequency", 2, 4, 6, 8]]) },
  "idt-10": { prompt: "Use the column graph to find total sales over the four months.", ...bars("Monthly sales doubling from 50 dollars to 400 dollars.", [["Month 1", 50], ["Month 2", 100], ["Month 3", 200], ["Month 4", 400]], "Sales ($)") },
  "idt-12": { prompt: "Use the population table. What percentage of the total population lives in town C?", ...table("Populations of towns A to D.", ["Town", "A", "B", "C", "D"], [["Population", 1000, 800, 1500, 700]]) },
  "y9-sl-m5": { stemAndLeafDiagram: { description: "Stem-and-leaf plot showing stems as tens and leaves as units.", rows: [{ stem: 1, leaves: [2, 5, 8] }, { stem: 2, leaves: [1, 4, 7] }], keyText: "2 | 4 = 24", rightLabel: "Leaves" } },
  "y9-bp-g2": box("Box plot with Q1 5 and Q3 12.", [2, 5, 8, 12, 16]),
  "y9-bp-g3": box("Box plot with minimum 2 and maximum 20.", [2, 6, 10, 15, 20]),
  "y9-bp-g4": box("Generic box plot whose box extends from the lower quartile to the upper quartile.", [0, 4, 7, 11, 15], false),
  "y9-bp-i3": box("Box plot with Q1 20 and Q3 35.", [10, 20, 27, 35, 45]),
  "y9-bp-i5": box("Box plot with minimum 10 and maximum 50.", [10, 20, 30, 40, 50]),
  "y9-bp-m2": box("Box plot with Q1 8 and Q3 18.", [3, 8, 12, 18, 24]),
  "y9-bp-m3": box("Box plot with minimum 5 and maximum 45.", [5, 14, 24, 34, 45]),
  "y9-bp-m7": box("Box plot with Q1 12 and Q3 30.", [4, 12, 20, 30, 38]),
  "y9-bp-m8": box("Box plot with minimum 0 and maximum 100.", [0, 25, 50, 75, 100]),
  "y9-bp-m10": box("Box plot with Q1 5, median 8 and Q3 12.", [2, 5, 8, 12, 16]),
  "y9-bp-p5": box("Box plot with lower quartile 10 and an unknown upper quartile; the IQR is 15.", [4, 10, 16, 25, 32], false),
  "y9-bp-p6": box("Box plot with minimum 12 and unknown maximum; the range is 40.", [12, 20, 30, 42, 52], false),
  "y9-bp-p9": { boxPlotDiagram: { description: "Two box plots comparing middle spread: A has IQR 10 and B has IQR 5.", plots: [{ label: "A", min: 0, q1: 5, median: 10, q3: 15, max: 20 }, { label: "B", min: 2, q1: 8, median: 10, q3: 13, max: 18 }], axisLabel: "Value", showValueLabels: false } },
  "bp-5": box("Box plot with lower quartile 10 and unknown upper quartile; the IQR is 15.", [4, 10, 16, 25, 32], false),
  "bp-6": box("Box plot with minimum 12 and unknown maximum; the range is 40.", [12, 20, 30, 42, 52], false),
  "bp-9": { boxPlotDiagram: { description: "Two box plots comparing middle spread: A has IQR 10 and B has IQR 5.", plots: [{ label: "A", min: 0, q1: 5, median: 10, q3: 15, max: 20 }, { label: "B", min: 2, q1: 8, median: 10, q3: 13, max: 18 }], axisLabel: "Value", showValueLabels: false } },
  "bp-11": box("Box plot with minimum 3 and maximum 28.", [3, 9, 15, 21, 28]),
  "bp-12": box("Box plot with Q1 12 and Q3 40.", [4, 12, 24, 40, 48]),
};

const graph = (description: string, content: Omit<CartesianGraph, "description">): Partial<WorkedExample> => ({
  cartesianGraph: { description, showGrid: true, ...content },
});

const rectangle = (description: string, length: string, width: string): Partial<WorkedExample> => ({
  planeShapeDiagram: {
    description, vertices: [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 4 }, { x: 0, y: 4 }],
    edges: [{ label: length }, { label: width }, { label: length }, { label: width }],
  },
});

const WORKED_EXAMPLE_PATCHES: Record<string, Partial<WorkedExample>> = {
  "introducing-linear-relationships:1": { dataTableDiagram: { description: "Table of x values 1, 2 and 3 paired with y values 3, 5 and 7.", columnHeaders: ["x", "1", "2", "3"], values: [["y", 3, 5, 7]] } },
  "lines-with-one-intercept:0": graph("Horizontal line y equals 3, parallel to the x-axis.", { xMin: -5, xMax: 5, yMin: -2, yMax: 6, lines: [{ kind: "linear", m: 0, b: 3, label: "y=3" }] }),
  "lines-with-one-intercept:1": graph("Vertical line x equals negative 2, crossing the x-axis at negative 2.", { xMin: -5, xMax: 3, yMin: -5, yMax: 5, lineSegments: [{ from: { x: -2, y: -5 }, to: { x: -2, y: 5 }, label: "x=−2" }] }),
  "lines-with-one-intercept:2": graph("The x-axis represented by the horizontal line y equals zero.", { xMin: -5, xMax: 5, yMin: -3, yMax: 3, lines: [{ kind: "linear", m: 0, b: 0, label: "x-axis: y=0" }] }),
  "gradient:0": graph("Line segment through the points (1, 2) and (3, 8), with rise and run read from the grid.", { xMin: 0, xMax: 4, yMin: 0, yMax: 10, lineSegments: [{ from: { x: 1, y: 2 }, to: { x: 3, y: 8 } }], points: [{ x: 1, y: 2, label: "(1,2)" }, { x: 3, y: 8, label: "(3,8)" }] }),
  "gradient:1": graph("Line segment through the points (0, 5) and (2, 1), showing a negative gradient.", { xMin: -1, xMax: 3, yMin: 0, yMax: 6, lineSegments: [{ from: { x: 0, y: 5 }, to: { x: 2, y: 1 } }], points: [{ x: 0, y: 5, label: "(0,5)" }, { x: 2, y: 1, label: "(2,1)" }] }),
  "gradient:2": graph("Horizontal line segment through (2, 3) and (5, 3), showing zero rise.", { xMin: 0, xMax: 6, yMin: 0, yMax: 5, lineSegments: [{ from: { x: 2, y: 3 }, to: { x: 5, y: 3 } }], points: [{ x: 2, y: 3, label: "(2,3)" }, { x: 5, y: 3, label: "(5,3)" }] }),
  "gradient-intercept-form:0": graph("Line y equals 2x plus 3, showing gradient 2 and y-intercept 3.", { xMin: -4, xMax: 4, yMin: -5, yMax: 10, lines: [{ kind: "linear", m: 2, b: 3, label: "y=2x+3" }], points: [{ x: 0, y: 3, label: "y-intercept" }] }),
  "gradient-intercept-form:1": graph("Line y equals negative x plus 5, showing gradient negative 1 and y-intercept 5.", { xMin: -3, xMax: 7, yMin: -3, yMax: 9, lines: [{ kind: "linear", m: -1, b: 5, label: "y=−x+5" }], points: [{ x: 0, y: 5, label: "y-intercept" }] }),
  "gradient-intercept-form:2": graph("Line y equals 3x through the origin.", { xMin: -4, xMax: 4, yMin: -10, yMax: 10, lines: [{ kind: "linear", m: 3, b: 0, label: "y=3x" }], points: [{ x: 0, y: 0, label: "origin" }] }),
  "finding-equation-of-a-line:0": graph("Line of gradient 2 through the point (0, 3).", { xMin: -4, xMax: 4, yMin: -5, yMax: 10, lines: [{ kind: "linear", m: 2, b: 3 }], points: [{ x: 0, y: 3, label: "(0,3)" }] }),
  "finding-equation-of-a-line:1": graph("Line of gradient 3 through the point (1, 5).", { xMin: -2, xMax: 4, yMin: -4, yMax: 12, lines: [{ kind: "linear", m: 3, b: 2 }], points: [{ x: 1, y: 5, label: "(1,5)" }] }),
  "finding-equation-of-a-line:2": graph("Line through the origin and the point (2, 4).", { xMin: -3, xMax: 5, yMin: -5, yMax: 10, lines: [{ kind: "linear", m: 2, b: 0 }], points: [{ x: 0, y: 0, label: "(0,0)" }, { x: 2, y: 4, label: "(2,4)" }] }),
  "bearings:0": bearing("east", 90),
  "bearings:1": { bearingsDiagram: { description: "Compass diagram with a ray pointing north-east on a bearing of 045 degrees.", originLabel: "O", rays: [{ bearing: 45, label: "NE", showAngle: true }] } },
  "bearings:2": { bearingsDiagram: { description: "Compass diagram showing an outward bearing of 060 degrees and the reverse direction used for its back bearing.", originLabel: "O", rays: [{ bearing: 60, label: "outward", showAngle: true }, { bearing: 240, label: "back", showAngle: true }] } },
  "length-and-perimeter:0": rectangle("Rectangle with length 5 and width 3.", "5", "3"),
  "length-and-perimeter:1": rectangle("Square with side length 7.", "7", "7"),
  "length-and-perimeter:2": { triangleDiagram: { ...right345, description: "Right triangle with side lengths 3, 4 and 5.", angleLabels: undefined } },
  "circle-circumference-sector-perimeter:0": { sectorDiagram: { description: "Full circle with radius 5 for finding circumference.", angleDegrees: 360, radiusLabel: "5", showFullCircle: true } },
  "circle-circumference-sector-perimeter:1": { sectorDiagram: { description: "Full circle with diameter 14 for finding circumference.", angleDegrees: 360, radiusLabel: "diameter 14", showFullCircle: true } },
  "circle-circumference-sector-perimeter:2": sector("Quarter circle with radius 8; the highlighted curved boundary is the required arc.", 90, "8", "arc length"),
  "area:0": rectangle("Rectangle with length 5 and width 3.", "5", "3"),
  "area:1": { triangleDiagram: triangle("Triangle with base 6 and perpendicular height 4.", { vertices: { A: { x: 55, y: 220 }, B: { x: 295, y: 220 }, C: { x: 55, y: 55 } }, sideLabels: { AB: "base 6", AC: "height 4" }, rightAngleAt: "A" }) },
  "area:2": rectangle("Square with side length 7.", "7", "7"),
  "composite-shapes-perimeter-area:0": { planeShapeDiagram: { description: "Ten by six rectangle with a three by two rectangular corner removed.", vertices: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 4 }, { x: 7, y: 4 }, { x: 7, y: 6 }, { x: 0, y: 6 }], edges: [{ label: "10" }, { label: "4" }, { label: "3" }, { label: "2" }, { label: "7" }, { label: "6" }] } },
  "composite-shapes-perimeter-area:1": { planeShapeDiagram: { description: "Eight by five rectangle with a triangle of base 8 and perpendicular height 3 attached on top.", vertices: [{ x: 0, y: 0 }, { x: 8, y: 0 }, { x: 8, y: 5 }, { x: 4, y: 8 }, { x: 0, y: 5 }], edges: [{ label: "8" }, { label: "5" }, { label: "h=3" }, { label: "base 8" }, { label: "5" }] } },
  "composite-shapes-perimeter-area:2": { planeShapeDiagram: { description: "The remaining right-triangular region after a diagonal triangle is removed from a 6 by 6 square.", vertices: [{ x: 0, y: 0, rightAngle: true }, { x: 6, y: 0 }, { x: 0, y: 6 }], edges: [{ label: "base 6" }, { label: "diagonal" }, { label: "height 6" }] } },
  "surface-area-prisms-pyramids:0": { solid3DDiagram: { description: "Cube with side length 4.", solid: "cube", labels: { length: "4" } } },
  "surface-area-prisms-pyramids:1": { solid3DDiagram: { description: "Rectangular prism with dimensions 2 by 3 by 4.", solid: "rectangularPrism", labels: { length: "4", width: "3", height: "2" } } },
  "surface-area-prisms-pyramids:2": { solid3DDiagram: { description: "Cube with side length 5.", solid: "cube", labels: { length: "5" } } },
  "surface-area-cylinders:0": { solid3DDiagram: { description: "Cylinder with radius 2 and height 5.", solid: "cylinder", labels: { radius: "2", height: "5" } } },
  "surface-area-cylinders:1": { solid3DDiagram: { description: "Cylinder with radius 3 and height 4.", solid: "cylinder", labels: { radius: "3", height: "4" } } },
  "surface-area-cylinders:2": { solid3DDiagram: { description: "Cylinder with radius 5 and height 10, with the curved surface under consideration.", solid: "cylinder", labels: { radius: "5", height: "10" } } },
  "volume-prisms:0": { solid3DDiagram: { description: "Rectangular prism with dimensions 2 by 3 by 4.", solid: "rectangularPrism", labels: { length: "4", width: "3", height: "2" } } },
  "volume-prisms:1": { solid3DDiagram: { description: "Cube with side length 5.", solid: "cube", labels: { length: "5" } } },
  "volume-prisms:2": { solid3DDiagram: { description: "Prism with cross-sectional base area 12 and length 10.", solid: "rectangularPrism", labels: { base: "area 12", length: "10" } } },
  "volume-cylinders:0": { solid3DDiagram: { description: "Cylinder with radius 2 and height 5.", solid: "cylinder", labels: { radius: "2", height: "5" } } },
  "volume-cylinders:1": { solid3DDiagram: { description: "Cylinder with radius 3 and height 10.", solid: "cylinder", labels: { radius: "3", height: "10" } } },
  "volume-cylinders:2": { solid3DDiagram: { description: "Cylinder with radius 1 and height 7.", solid: "cylinder", labels: { radius: "1", height: "7" } } },
  "tree-diagrams:0": { probabilityTreeDiagram: coinTree },
  "tree-diagrams:1": { probabilityTreeDiagram: coinTree },
  "tree-diagrams:2": { probabilityTreeDiagram: { description: "Two-stage tree for independent event A with probability one third at each stage.", rootLabel: "Start", stages: ["First trial", "Second trial"], branches: [{ id: "A", label: "A", probability: "1/3", children: [{ id: "AA", label: "A", probability: "1/3" }, { id: "AN", label: "not A", probability: "2/3" }] }, { id: "N", label: "not A", probability: "2/3", children: [{ id: "NA", label: "A", probability: "1/3" }, { id: "NN", label: "not A", probability: "2/3" }] }] } },
  "interpreting-data-from-tables-and-graphs:0": { dataTableDiagram: { description: "Votes for cat, dog and fish.", columnHeaders: ["Pet", "Cat", "Dog", "Fish"], values: [["Votes", 7, 10, 3]] } },
  "interpreting-data-from-tables-and-graphs:1": { barChartDiagram: { description: "Fruit frequencies: 8 apples, 12 bananas and 5 oranges.", bars: [{ label: "Apple", value: 8 }, { label: "Banana", value: 12 }, { label: "Orange", value: 5 }], valueAxisLabel: "Frequency" } },
  "interpreting-data-from-tables-and-graphs:2": { barChartDiagram: { description: "Fruit frequencies comparing 12 bananas with 5 oranges.", bars: [{ label: "Banana", value: 12 }, { label: "Orange", value: 5 }], valueAxisLabel: "Frequency" } },
  "stem-and-leaf-plots:0": { stemAndLeafDiagram: { description: "Stem-and-leaf row with stem 2 and leaves 0 and 4.", rows: [{ stem: 2, leaves: [0, 4] }], keyText: "2 | 4 = 24", rightLabel: "Leaves" } },
  "box-plots:0": box("Generic box plot displaying the five-number summary: minimum, Q1, median, Q3 and maximum.", [2, 5, 8, 12, 18], false),
  "box-plots:1": box("Box plot with Q1 5 and Q3 12.", [2, 5, 8, 12, 16]),
  "box-plots:2": box("Box plot with minimum 2 and maximum 20.", [2, 6, 10, 15, 20]),
};

function patchWorkedExamples(lesson: ExplicitLesson): WorkedExample[] {
  return lesson.workedExamples.map((example, index) => ({ ...example, ...WORKED_EXAMPLE_PATCHES[`${lesson.slug}:${index}`] }));
}

function keyFor(id: string) {
  return id.startsWith("y9c-") ? id.slice(4) : id;
}

export function applyYear9CoreQuestionDiagramRemediation(question: PracticeQuestion): PracticeQuestion {
  const patch = PATCHES[keyFor(question.id)];
  return patch ? { ...question, ...patch } : question;
}

export function applyYear9CoreDiagramRemediation(lesson: ExplicitLesson): ExplicitLesson {
  return {
    ...lesson,
    workedExamples: patchWorkedExamples(lesson),
    guidedPractice: lesson.guidedPractice.map(applyYear9CoreQuestionDiagramRemediation),
    independentPractice: lesson.independentPractice.map(applyYear9CoreQuestionDiagramRemediation),
    masteryQuiz: lesson.masteryQuiz.map(applyYear9CoreQuestionDiagramRemediation),
    masteryQuizPool: lesson.masteryQuizPool?.map(applyYear9CoreQuestionDiagramRemediation),
    multiPartPractice: lesson.multiPartPractice?.map(applyYear9CoreQuestionDiagramRemediation),
  };
}
