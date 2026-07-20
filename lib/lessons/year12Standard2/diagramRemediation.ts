import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { DIAGRAM_SPECS } from "../diagramRegistry";
import type { DataTableDiagram, GanttChartDiagram, NetworkDiagram, ScatterPlotDiagram, TwoWayTableDiagram } from "../types";

type QuestionPatch = Partial<PracticeQuestion>;
type EdgeSpec = [string, string, (number | string)?, boolean?, boolean?];

function table(description: string, columnHeaders: string[], values: DataTableDiagram["values"], rowHeaders?: string[]): QuestionPatch {
  return { dataTableDiagram: { description, columnHeaders, values, rowHeaders } };
}

function network(description: string, ids: string[], edgeSpecs: EdgeSpec[]): QuestionPatch {
  const radius = 120;
  const diagram: NetworkDiagram = {
    description,
    vertices: ids.map((id, index) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * index) / ids.length;
      return { id, label: id, x: 180 + radius * Math.cos(angle), y: 130 + radius * Math.sin(angle) };
    }),
    edges: edgeSpecs.map(([from, to, weight, directed, dashed]) => ({ from, to, weight, directed, dashed })),
  };
  return { diagram };
}

function scatter(description: string, points: ScatterPlotDiagram["points"]): QuestionPatch {
  return { scatterPlotDiagram: { description, xAxisLabel: "Explanatory variable", yAxisLabel: "Response variable", points } };
}

function nonRightTriangle(
  description: string,
  sideLabels: Record<string, string>,
  angleLabels: Record<string, string> = {}
): QuestionPatch {
  return {
    triangleDiagram: {
      description,
      vertices: { A: { x: 0, y: 0 }, B: { x: 8, y: 0 }, C: { x: 5, y: 5 } },
      sideLabels,
      angleLabels,
    },
  };
}

const positiveScatter = [{ x: 1, y: 2 }, { x: 2, y: 3.5 }, { x: 3, y: 4 }, { x: 4, y: 6 }, { x: 5, y: 7.5 }, { x: 6, y: 8 }];
const standardFlow = network("Directed flow network from source S through A and B to sink T, with a narrow 5-unit arc forming a bottleneck.", ["S", "A", "B", "T"], [["S", "A", 8, true], ["S", "B", 7, true], ["A", "T", 5, true], ["A", "B", 3, true], ["B", "T", 9, true]]);

const alphaActivities: GanttChartDiagram["activities"] = [
  { label: "A", start: 0, duration: 2, float: 1 },
  { label: "B", start: 0, duration: 4, critical: true },
  { label: "C", start: 2, duration: 3, float: 1 },
  { label: "D", start: 4, duration: 2, critical: true },
  { label: "E", start: 6, duration: 5, critical: true },
  { label: "F", start: 11, duration: 1, critical: true },
];

function gantt(description: string, activities: GanttChartDiagram["activities"] = alphaActivities, timeMax = 12): QuestionPatch {
  return { ganttChartDiagram: { description, activities, timeMin: 0, timeMax, timeStep: 1, timeUnit: "days" } };
}

const sportSurvey: TwoWayTableDiagram = {
  description: "Sport survey of 100 people, classified by gender and whether they play sport.",
  rowLabels: ["Male", "Female"],
  columnLabels: ["Plays sport", "Does not play sport"],
  values: [[45, 15], [30, 10]],
  rowTotals: [60, 40],
  columnTotals: [75, 25],
  grandTotal: 100,
};

const alphaDescription = "Project Alpha Gantt chart: A runs from day 0 to 2, B from 0 to 4, C from 2 to 5 with one day of float, D from 4 to 6, E from 6 to 11, and F from 11 to 12. B, D, E and F are critical.";

const QUESTION_PATCHES: Record<string, QuestionPatch> = {
  "y12s2-alr-i3": table("Value table for a linear rule, with y increasing by 4 whenever x increases by 1.", ["x", "y"], [[0, 3], [1, 7], [2, 11], [3, 15]]),
  "y12s2-alr-m7": table("Value table with constant first difference negative 3.", ["x", "y"], [[0, 10], [1, 7], [2, 4], [3, 1]]),
  "y12s2-alr-m9": table("Value table whose successive y differences are 3, 4 and 3, so the data are not exactly linear.", ["x", "y"], [[0, 4], [1, 7], [2, 11], [3, 14]]),
  "y12s2-lin-g4": table("Weekly cost table showing an increase of 18 dollars per week.", ["Week", "Cost ($)"], [[0, 40], [1, 58], [2, 76], [3, 94]]),
  "y12s2-lin-m7": table("Value table with an equal increase of 3 in y for every one-unit increase in x.", ["x", "y"], [[0, 2], [1, 5], [2, 8], [3, 11]]),
  "y12s2-expinv-i2": { prompt: "The displayed outputs triple whenever the input increases by 1. Which pattern describes the relationship?", ...table("Value table showing exponential growth by a constant factor of 3.", ["x", "y"], [[0, 2], [1, 6], [2, 18], [3, 54]]) },
  "y12s2-expinv-m7": table("Value table whose outputs are multiplied by 1.5 at each one-unit input step.", ["x", "y"], [[0, 10], [1, 15], [2, 22.5], [3, 33.75]]),
  "y12s2-ineq-i5": {
    prompt: "Which option represents the solution x > 3?",
    choices: [
      { label: "A", text: "", numberLineDiagram: { description: "Open point at 3 with a ray shaded to the right.", min: 0, max: 6, points: [{ value: 3, open: true }], intervals: [{ from: 3, to: "inf", fromOpen: true }] } },
      { label: "B", text: "", numberLineDiagram: { description: "Closed point at 3 with a ray shaded to the right.", min: 0, max: 6, points: [{ value: 3 }], intervals: [{ from: 3, to: "inf" }] } },
      { label: "C", text: "", numberLineDiagram: { description: "Open point at 3 with a ray shaded to the left.", min: 0, max: 6, points: [{ value: 3, open: true }], intervals: [{ from: "-inf", to: 3, toOpen: true }] } },
      { label: "D", text: "", numberLineDiagram: { description: "Closed point at 3 with a ray shaded to the left.", min: 0, max: 6, points: [{ value: 3 }], intervals: [{ from: "-inf", to: 3 }] } },
    ],
  },

  "y12s2-rtv-g2": { prompt: "The right triangle shows a 10 metre hypotenuse and a 30 degree angle. Find the side opposite the marked angle, to 2 decimal places.", triangleDiagram: { description: "Right triangle ABC with right angle at B, hypotenuse AC equal to 10 metres, angle A equal to 30 degrees, and opposite side BC unknown.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 7, y: 4 } }, sideLabels: { AC: "10 m", BC: "?" }, angleLabels: { A: "30°" }, rightAngleAt: "B", highlightedSides: ["BC"] } },
  "y12s2-rtv-g1": { triangleDiagram: { description: "Right triangle ABC with right angle at A and angle theta at B; side AC, directly across from theta, is highlighted as the opposite side.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 0, y: 4 } }, sideLabels: { AB: "adjacent", AC: "opposite", BC: "hypotenuse" }, angleLabels: { B: "θ" }, rightAngleAt: "A", highlightedSides: ["AC"] } },
  "y12s2-trv-i5": { prompt: "The non-right-angled triangle has all three sides known and an angle is required. Which rule is most appropriate?", triangleDiagram: { description: "Non-right triangle ABC with side lengths AB equal to 7, BC equal to 8, and AC equal to 10; angle A is unknown and no right angle is marked.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 5, y: 5 } }, sideLabels: { AB: "7", BC: "8", AC: "10" }, angleLabels: { A: "?" } } },
  "y12s2-bear-i3": { prompt: "The right triangle shows AB equal to 50 kilometres and BC equal to 40 kilometres. Find AC to 1 decimal place.", triangleDiagram: { description: "Right triangle ABC with perpendicular sides AB equal to 50 kilometres and BC equal to 40 kilometres, right angle at B, and hypotenuse AC unknown.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 7, y: 5 } }, sideLabels: { AB: "50 km", BC: "40 km", AC: "?" }, rightAngleAt: "B", highlightedSides: ["AC"] } },
  "y12s2-bear-m8": { prompt: "The route triangle represents a boat travelling 12 kilometres on a bearing of 060 degrees, then 8 kilometres due south. Find its distance from the starting point to 1 decimal place.", triangleDiagram: { description: "Route triangle ABC: the boat travels AB equal to 12 kilometres on bearing 060 degrees, then BC equal to 8 kilometres due south. The included angle ABC is 60 degrees and return distance AC is unknown.", vertices: { A: { x: 0, y: 4 }, B: { x: 7, y: 0 }, C: { x: 7, y: 5 } }, sideLabels: { AB: "12 km", BC: "8 km", AC: "?" }, angleLabels: { B: "60°" }, highlightedSides: ["AC"] } },
  "y12s2-eld-g1": { triangleDiagram: { description: "Line-of-sight right triangle with horizontal ground along AB, vertical object AC, and line of sight BC; the angle of elevation theta is marked at ground-level observer B above the horizontal.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 0, y: 5 } }, sideLabels: { AB: "horizontal", AC: "vertical", BC: "line of sight" }, angleLabels: { B: "θ elevation" }, rightAngleAt: "A" } },
  "y12s2-eld-g4": { triangleDiagram: { description: "Line-of-sight right triangle from a person at B to the top C of a tree, with horizontal distance AB 25 metres, angle of elevation at B 38 degrees, and tree height AC unknown.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 0, y: 5 } }, sideLabels: { AB: "25 m", AC: "h", BC: "line of sight" }, angleLabels: { B: "38°" }, rightAngleAt: "A", highlightedSides: ["AC"] } },
  "y12s2-eld-i5": { lineAngleDiagram: { description: "Boat-to-cliff line of sight crossing two parallel horizontal lines: sea level through the boat and the horizontal through the cliff top. Equal alternate interior angles show that elevation equals depression.", points: [{ id: "B", x: 0, y: 0, label: "boat" }, { id: "G", x: 7, y: 0, label: "sea level" }, { id: "T", x: 7, y: 5, label: "cliff top" }, { id: "H", x: 0, y: 5, label: "horizontal" }], segments: [{ from: "B", to: "G", parallelMarks: 1 }, { from: "H", to: "T", parallelMarks: 1 }, { from: "B", to: "T", label: "line of sight" }, { from: "G", to: "T", label: "cliff" }], angles: [{ vertex: "B", from: "G", to: "T", label: "elevation", marks: 1 }, { vertex: "T", from: "H", to: "B", label: "depression", marks: 1 }] } },
  "y12s2-eld-m9": { triangleDiagram: { description: "Line-of-sight right triangle from boat B to cliff top C, with horizontal distance AB 150 metres, angle of depression and equal angle of elevation 25 degrees, and cliff height AC unknown.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 0, y: 5 } }, sideLabels: { AB: "150 m", AC: "h", BC: "line of sight" }, angleLabels: { B: "25°" }, rightAngleAt: "A", highlightedSides: ["AC"] } },
  "y12s2-eld-m10": { triangleDiagram: { description: "Line-of-sight right triangle from the surveyor's eye at B to the antenna top C, with horizontal distance AB 32 metres and elevation angle 41 degrees. The final building height accounts for 1.7 metre eye height and removes the 2 metre antenna.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 0, y: 5 } }, sideLabels: { AB: "32 m", AC: "rise to antenna top", BC: "line of sight" }, angleLabels: { B: "41°" }, rightAngleAt: "A", highlightedSides: ["AC"] } },

  "y12s2-comp-g1": { compositeSolidDiagram: { description: "Composite solid of a 10 by 4 by 6 centimetre rectangular prism stacked on a 10 by 8 by 4 centimetre rectangular prism.", kind: "stackedRectangularPrisms", unit: "cm", lower: { length: 10, width: 8, height: 4 }, upper: { length: 10, width: 4, height: 6 }, placement: "centred" } },
  "y12s2-comp-g4": { compositeSolidDiagram: { description: "Two rectangular prisms joined face-to-face; the shared rectangular face is internal and is excluded twice when adding their separate surface areas.", kind: "stackedRectangularPrisms", unit: "cm", lower: { length: 10, width: 8, height: 4 }, upper: { length: 6, width: 4, height: 3 }, placement: "centred" } },
  "y12s2-comp-i1": { compositeSolidDiagram: { description: "Composite solid formed by a triangular prism with cross-sectional area 15 square centimetres and length 20 centimetres attached to a 20 by 8 by 6 centimetre rectangular prism.", kind: "triangularPrismOnRectangularPrism", unit: "cm", base: { length: 20, width: 8, height: 6 }, triangularPrism: { crossSectionArea: 15, length: 20 } } },
  "y12s2-comp-i3": { compositeSolidDiagram: { description: "Concrete step as an L-shaped prism made from two 30 by 120 by 15 centimetre rectangular sections, giving two treads and two 15 centimetre risers.", kind: "lShapedPrism", unit: "cm", sections: [{ length: 30, width: 120, height: 15 }, { length: 30, width: 120, height: 30 }] } },
  "y12s2-comp-i5": { compositeSolidDiagram: { description: "Composite solid with a hemisphere of radius 5 centimetres on a cylinder of the same radius and height 10 centimetres.", kind: "hemisphereOnCylinder", unit: "cm", radius: 5, cylinderHeight: 10 } },
  "y12s2-comp-m1": { compositeSolidDiagram: { description: "Composite solid with a 5 centimetre cube and a 5 by 5 by 3 centimetre rectangular prism stacked on top.", kind: "stackedRectangularPrisms", unit: "cm", lower: { length: 5, width: 5, height: 5 }, upper: { length: 5, width: 5, height: 3 }, placement: "centred" } },
  "y12s2-comp-m4": { compositeSolidDiagram: { description: "Rectangular block with a cylindrical hole drilled completely through it; remaining volume is the block volume minus the cylindrical void.", kind: "rectangularPrismWithCylindricalHole", unit: "cm", outer: { length: 10, width: 8, height: 6 }, hole: { radius: 2, depth: 6 } } },
  "y12s2-comp-m5": { compositeSolidDiagram: { description: "Hemisphere with radius 9 centimetres, including its circular base.", kind: "hemisphere", unit: "cm", radius: 9 } },
  "y12s2-comp-m7": { compositeSolidDiagram: { description: "Two equal cylinders stacked vertically, each with radius 4 centimetres and height 5 centimetres.", kind: "stackedCylinders", unit: "cm", lower: { radius: 4, height: 5 }, upper: { radius: 4, height: 5 } } },
  "y12s2-comp-m8": { compositeSolidDiagram: { description: "Capsule-shaped vessel with a cylindrical middle of radius 2 metres and length 6 metres plus one hemisphere at each end.", kind: "capsule", unit: "m", radius: 2, cylinderLength: 6 } },
  "y12s2-sa-m5": { netDiagram: { description: "Net of a cylinder showing its curved surface unrolled into a rectangle whose length is the circular circumference 2 pi r and whose width is the cylinder height h.", solid: "cylinder", labels: { radius: "r", height: "h", length: "2πr" } } },

  "y12s2-ann-g4": table("Successive loan balances after repayments, decreasing from 8000 dollars.", ["Period", "Balance ($)"], [[0, 8000], [1, 7700], [2, 7395]]),
  "y12s2-ann-m6": table("Successive loan balances, with the amount reduced becoming slightly larger each period.", ["Period", "Balance ($)"], [[0, 12000], [1, 11850], [2, 11702]]),
  "y12s2-ift-g2": table("Extract from a future-value annuity factor table, indexed by periodic rate and number of payments.", ["Payments", "0.5%", "1.0%"], [[12, 12.34, 12.68], [24, 25.42, 26.97], [36, 39.35, 43.08]]),
  "y12s2-ift-m8": table("Future-value annuity table entry for the required periodic rate and term.", ["Factor type", "Factor"], [["Future value", 66.14]]),
  "y12s2-ift-m10": table("Present-value annuity table entry for the required periodic rate and term.", ["Factor type", "Factor"], [["Present value", 42.58]]),
  "y12s2-fin-exam-i5": table("Loan balance after successive repayments.", ["Repayment number", "Balance ($)"], [[0, 25000], [1, 24920], [2, 24835]]),

  "y12s2-biv-g3": scatter("Scatterplot with points tightly clustered about a downward-sloping line, indicating a strong negative association.", [{ x: 1, y: 10 }, { x: 2, y: 9 }, { x: 3, y: 7.5 }, { x: 4, y: 6.5 }, { x: 5, y: 5 }, { x: 6, y: 3.5 }]),
  "y12s2-biv-m4": scatter("Scatterplot with a strong negative linear association.", [{ x: 1, y: 11 }, { x: 2, y: 9.5 }, { x: 3, y: 8 }, { x: 4, y: 6 }, { x: 5, y: 5 }, { x: 6, y: 3 }]),
  "y12s2-biv-m10": scatter("Plot A: positive linear cluster with one distant influential point; the unusual point can distort the correlation coefficient.", [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }, { x: 10, y: 2 }]),
  "y12s2-corr-i1": scatter("Scatterplot with points widely dispersed around a slight upward trend, indicating a weak positive association.", [{ x: 1, y: 4 }, { x: 2, y: 8 }, { x: 3, y: 3 }, { x: 4, y: 9 }, { x: 5, y: 5 }, { x: 6, y: 10 }]),
  "y12s2-corr-i4": scatter("Scatterplot with a moderately strong downward pattern and one point separated well above the main cluster.", [{ x: 1, y: 10 }, { x: 2, y: 9 }, { x: 3, y: 7 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 3 }, { x: 5.5, y: 11 }]),

  "y12s2-relfreq-i4": { twoWayTableDiagram: { description: "Student travel table highlighting 14 students who walk out of 35 students in total.", rowLabels: ["Student"], columnLabels: ["Walk", "Other travel"], values: [[14, 21]], rowTotals: [35], columnTotals: [14, 21], grandTotal: 35 } },
  "y12s2-relfreq-m5": { twoWayTableDiagram: { description: "Adult payment table showing 21 adults using card out of 60 adults in total.", rowLabels: ["Adult"], columnLabels: ["Card", "Other payment"], values: [[21, 39]], rowTotals: [60], columnTotals: [21, 39], grandTotal: 60 } },
  "y12s2-eft-g2": { twoWayTableDiagram: sportSurvey },
  "y12s2-eft-g3": { twoWayTableDiagram: sportSurvey },
  "y12s2-eft-g4": { twoWayTableDiagram: sportSurvey },
  "y12s2-eft-m3": { twoWayTableDiagram: sportSurvey },
  "y12s2-eft-m6": { twoWayTableDiagram: sportSurvey },
  "y12s2-eft-m9": { twoWayTableDiagram: { description: "Survey responses by gender, with yes and no counts.", rowLabels: ["Male", "Female"], columnLabels: ["Yes", "No"], values: [[36, 24], [24, 16]], rowTotals: [60, 40], columnTotals: [60, 40], grandTotal: 100 } },

  "y12s2-nfr-g1": network("Undirected network with vertices P, Q, R and S and four edges.", ["P", "Q", "R", "S"], [["P", "Q"], ["P", "R"], ["Q", "R"], ["Q", "S"]]),
  "y12s2-nfr-g2": network("Undirected network in which vertex A is incident with edges AB, AC and AD.", ["A", "B", "C", "D"], [["A", "B"], ["A", "C"], ["A", "D"], ["B", "C"]]),
  "y12s2-nfr-g3": network("Weighted undirected network with AB equal to 5, BC equal to 3, and AC equal to 9.", ["A", "B", "C"], [["A", "B", 5], ["B", "C", 3], ["A", "C", 9]]),
  "y12s2-nfr-g4": network("Directed network containing an arrow from A to B, so movement is permitted from A toward B.", ["A", "B"], [["A", "B", undefined, true]]),
  "y12s2-nfr-i1": network("Undirected network with vertices W, X, Y and Z and five listed edges.", ["W", "X", "Y", "Z"], [["X", "Y"], ["X", "Z"], ["Y", "Z"], ["Y", "W"], ["Z", "W"]]),
  "y12s2-nfr-i3": network("Weighted undirected network with edges AB 6, BC 4, BD 7, and AD 10.", ["A", "B", "C", "D"], [["A", "B", 6], ["B", "C", 4], ["B", "D", 7], ["A", "D", 10]]),
  "y12s2-nfr-i4": network("Closed route A-B-C-D-A in an undirected network, illustrating a circuit.", ["A", "B", "C", "D"], [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]]),
  "y12s2-nfr-m1": network("Undirected network with distinct vertices A, B, C, D and E.", ["A", "B", "C", "D", "E"], [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"], ["D", "E"]]),
  "y12s2-nfr-m2": network("Undirected network where C is incident with AC, BC and CD.", ["A", "B", "C", "D"], [["A", "B"], ["A", "C"], ["B", "C"], ["B", "D"], ["C", "D"]]),
  "y12s2-nfr-m4": network("Weighted undirected network with AB 3, BC 5, AC 6 and CD 4.", ["A", "B", "C", "D"], [["A", "B", 3], ["B", "C", 5], ["A", "C", 6], ["C", "D", 4]]),
  "y12s2-net-term-i1": network("School location network formed from direct links Depot-Library, Library-Hall, Hall-Office and Depot-Office.", ["Depot", "Library", "Hall", "Office"], [["Depot", "Library"], ["Library", "Hall"], ["Hall", "Office"], ["Depot", "Office"]]),
  "y12s2-net-term-i2": network("School path network before edge CE is added: C currently joins A, B and D, so adding CE raises its degree from 3 to 4.", ["A", "B", "C", "D", "E"], [["A", "B"], ["A", "C"], ["B", "C"], ["B", "D"], ["C", "D"], ["D", "E"]]),
  "y12s2-net-term-i4": network("Route A-B-C-D-B-E repeats B but does not repeat an edge and finishes at E.", ["A", "B", "C", "D", "E"], [["A", "B"], ["B", "C"], ["C", "D"], ["D", "B"], ["B", "E"]]),
  "y12s2-net-term-m4": network("Closed route A-B-C-D-B-A repeats vertex B without repeating an edge.", ["A", "B", "C", "D"], [["A", "B"], ["B", "C"], ["C", "D"], ["D", "B"]]),
  "y12s2-net-term-m5": network("Route A-B-C-B-A traverses edge BC in both directions and does not use every network edge exactly once.", ["A", "B", "C", "D"], [["A", "B"], ["B", "C"], ["B", "D"], ["C", "D"], ["D", "A"]]),

  "y12s2-spmst-g1": network("Weighted route A-B-D with AB equal to 5 and BD equal to 7.", ["A", "B", "D"], [["A", "B", 5], ["B", "D", 7]]),
  "y12s2-spmst-g2": network("Two A-to-D paths: A-B-D totals 11 and A-C-D totals 9.", ["A", "B", "C", "D"], [["A", "B", 5], ["B", "D", 6], ["A", "C", 4], ["C", "D", 5]]),
  "y12s2-spmst-i2": { prompt: "The weighted network shows routes A-C-D with total 10 and A-B-D with total 12. Give the shortest path label.", ...network("Two A-to-D paths: A-C-D has weights 4 and 6; A-B-D has weights 5 and 7.", ["A", "B", "C", "D"], [["A", "C", 4], ["C", "D", 6], ["A", "B", 5], ["B", "D", 7]]) },
  "y12s2-spmst-m2": { prompt: "The weighted network shows routes A-B-D with total 13 and A-C-D with total 10. What is the shortest-path weight?", ...network("Two A-to-D paths: A-B-D has weights 6 and 7; A-C-D has weights 4 and 6.", ["A", "B", "C", "D"], [["A", "B", 6], ["B", "D", 7], ["A", "C", 4], ["C", "D", 6]]) },
  "y12s2-spmst-m8": { prompt: "The weighted network shows three routes from P to T. Find the shortest path and explain why selecting the smallest first edge alone is insufficient.", ...network("Weighted network with P-Q-T total 13, P-R-T total 11, and P-Q-R-T total 9.", ["P", "Q", "R", "T"], [["P", "Q", 3], ["Q", "T", 10], ["P", "R", 5], ["R", "T", 6], ["Q", "R", 0]]) },

  "y12s2-cpr-g2": network("Activity path A-C with durations 4 and 3 days shown in the activity labels.", ["A (4d)", "C (3d)"], [["A (4d)", "C (3d)", undefined, true]]),
  "y12s2-cpr-i2": network("Activity path A-C-E with activity durations 3, 7 and 2 days.", ["A (3d)", "C (7d)", "E (2d)"], [["A (3d)", "C (7d)", undefined, true], ["C (7d)", "E (2d)", undefined, true]]),
  "y12s2-cpr-m2": network("Activity path A-D with activity durations 5 and 4 days.", ["A (5d)", "D (4d)"], [["A (5d)", "D (4d)", undefined, true]]),
  "y12s2-cpa-i2": network("Activity path A-C-F with durations 3, 6 and 2 days.", ["A (3d)", "C (6d)", "F (2d)"], [["A (3d)", "C (6d)", undefined, true], ["C (6d)", "F (2d)", undefined, true]]),
  "y12s2-cpa-i3": { prompt: "The project network has path totals A-B-D equal to 12 days and A-C-D equal to 15 days. What is the completion time?", ...network("Two project paths from A to D, with A-B-D labelled 12 days and A-C-D labelled 15 days.", ["A", "B", "C", "D"], [["A", "B", "12-day path", true], ["B", "D", undefined, true], ["A", "C", "15-day path", true], ["C", "D", undefined, true]]) },
  "y12s2-cpa-m4": network("Activity path A-B-D-F with durations 3, 4, 5 and 2 days.", ["A (3d)", "B (4d)", "D (5d)", "F (2d)"], [["A (3d)", "B (4d)", undefined, true], ["B (4d)", "D (5d)", undefined, true], ["D (5d)", "F (2d)", undefined, true]]),
  "y12s2-cpa-m8": network("Two project branches: A-B-D-F totals 13 days and A-C-E-F totals 16 days.", ["A", "B", "C", "D", "E", "F"], [["A", "B", "13-day branch", true], ["B", "D", undefined, true], ["D", "F", undefined, true], ["A", "C", "16-day branch", true], ["C", "E", undefined, true], ["E", "F", undefined, true]]),
  "y12s2-cpa-m9": network("Two branches sharing only A and F: A-B-D-F totals 13 days and A-C-E-F totals 16 days.", ["A", "B", "C", "D", "E", "F"], [["A", "B", "13-day branch", true], ["B", "D", undefined, true], ["D", "F", undefined, true], ["A", "C", "16-day branch", true], ["C", "E", undefined, true], ["E", "F", undefined, true]]),
  "y12s2-cpa-m10": network("Project network whose critical path is A-C-E-F.", ["A", "B", "C", "D", "E", "F"], [["A", "B", undefined, true], ["B", "D", undefined, true], ["D", "F", undefined, true], ["A", "C", undefined, true], ["C", "E", undefined, true], ["E", "F", undefined, true]]),

  "y12s2-gcd-g1": network("Activity-on-arrow example in which the dashed directed edge from event 2 to event 3 is a zero-duration dummy.", ["1", "2", "3", "4"], [["1", "2", "A", true], ["1", "3", "B", true], ["2", "3", "0", true, true], ["3", "4", "C", true]]),
  "y12s2-gcd-g2": gantt(alphaDescription),
  "y12s2-gcd-g3": gantt(alphaDescription),
  "y12s2-gcd-g4": gantt(alphaDescription),
  "y12s2-gcd-i1": network("Activity-on-arrow network showing a dummy as a dashed directed arrow labelled duration 0.", ["1", "2", "3"], [["1", "2", "A", true], ["2", "3", "0", true, true]]),
  "y12s2-gcd-i2": gantt(alphaDescription),
  "y12s2-gcd-i3": gantt("Gantt chart for Project Alpha with calendar time in days along the horizontal axis and one row for each activity."),
  "y12s2-gcd-i4": gantt(alphaDescription),
  "y12s2-gcd-i5": gantt(alphaDescription),
  "y12s2-gcd-m1": gantt(alphaDescription),
  "y12s2-gcd-m2": gantt(alphaDescription),
  "y12s2-gcd-m3": gantt(alphaDescription),
  "y12s2-gcd-m4": network("Precedence network where X requires A and B, Y requires only A, and a dashed dummy carries B's precedence into X.", ["Start", "A end", "B end", "X start", "Finish"], [["Start", "A end", "A", true], ["Start", "B end", "B", true], ["A end", "X start", "Y", true], ["B end", "X start", "0", true, true], ["X start", "Finish", "X", true]]),
  "y12s2-gcd-m5": gantt(alphaDescription),
  "y12s2-gcd-m6": gantt("Modified Project Alpha after B increases to 5 days; the project finishes at day 13.", [{ label: "A", start: 0, duration: 2, float: 2 }, { label: "B", start: 0, duration: 5, critical: true }, { label: "C", start: 2, duration: 3, float: 2 }, { label: "D", start: 5, duration: 2, critical: true }, { label: "E", start: 7, duration: 5, critical: true }, { label: "F", start: 12, duration: 1, critical: true }], 13),
  "y12s2-gcd-m7": gantt(alphaDescription),
  "y12s2-gcd-m8": gantt("Project schedule with A first, B and C in parallel, and D after both branches; A-C-D is critical.", [{ label: "A", start: 0, duration: 4, critical: true }, { label: "B", start: 4, duration: 3, float: 2 }, { label: "C", start: 4, duration: 5, critical: true }, { label: "D", start: 9, duration: 2, critical: true }], 11),
  "y12s2-gcd-m9": network("Activity-on-arrow network with a dashed zero-duration dummy that records precedence but adds no work or time.", ["1", "2", "3", "4"], [["1", "2", "A", true], ["1", "3", "B", true], ["2", "3", "0", true, true], ["3", "4", "C", true]]),
  "y12s2-gcd-m10": gantt("Resource-conflict Gantt chart: activities B and C overlap and both require the project's only crane.", [{ label: "A", start: 0, duration: 2 }, { label: "B", start: 2, duration: 4, resource: "Crane" }, { label: "C", start: 2, duration: 3, resource: "Crane" }, { label: "D", start: 6, duration: 2 }], 8),

  "y12s2-flow-m8": { prompt: "The directed capacity network shows capacities SA 8, SB 6, AT 5, AB 3 and BT 7. Find the maximum S-to-T flow.", ...network("Directed flow network from source S to sink T with capacities SA 8, SB 6, AT 5, AB 3 and BT 7.", ["S", "A", "B", "T"], [["S", "A", 8, true], ["S", "B", 6, true], ["A", "T", 5, true], ["A", "B", 3, true], ["B", "T", 7, true]]) },
  "y12s2-net-exam-i1": network("Road network with five undirected edges AB, BC, CD, DA and AC.", ["A", "B", "C", "D"], [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"]]),
  "y12s2-net-exam-i2": network("Two routes from A to E: A-B-E totals 22 minutes and A-C-E totals 19 minutes.", ["A", "B", "C", "E"], [["A", "B", 11], ["B", "E", 11], ["A", "C", 9], ["C", "E", 10]]),
  "y12s2-net-exam-m4": { prompt: "The weighted network shows path totals A-B-D equal to 17 and A-C-D equal to 14. Enter the shortest path.", ...network("Two paths from A to D: A-B-D totals 17 and A-C-D totals 14.", ["A", "B", "C", "D"], [["A", "B", 8], ["B", "D", 9], ["A", "C", 6], ["C", "D", 8]]) },

  "y12s2-quad-i1": { cartesianGraph: { description: "Coordinate graph of a quadratic model, showing its characteristic parabolic curve.", xMin: -4, xMax: 4, yMin: -2, yMax: 10, parabolas: [{ kind: "quadratic", a: 1, b: 0, c: 0, label: "quadratic" }] } },
  "y12s2-rec-m9": { cartesianGraph: { description: "Reciprocal curve y equals 24 divided by x, approaching but never reaching the x-axis as the magnitude of x grows.", xMin: -10, xMax: 10, yMin: -25, yMax: 25, curves: [{ kind: "reciprocal", a: 24, label: "y = 24/x" }] } },
  "y12s2-sim-g3": { cartesianGraph: { description: "Two linear hire-cost models crossing at one point; the intersection represents the input at which both models have the same cost.", xMin: 0, xMax: 10, yMin: 0, yMax: 50, lines: [{ kind: "linear", m: 3, b: 8, label: "Hire A" }, { kind: "linear", m: 1, b: 20, label: "Hire B" }], points: [{ x: 6, y: 26, label: "equal cost" }] } },
  "y12s2-alg-exam-i4": { cartesianGraph: { description: "Downward-opening revenue parabola with maximum vertex at the point 3 comma 45.", xMin: 0, xMax: 6, yMin: 0, yMax: 50, parabolas: [{ kind: "quadratic", a: -5, b: 30, c: 0, label: "revenue" }], points: [{ x: 3, y: 45, label: "(3, 45)" }] } },
  "y12s2-alg-exam-m6": { cartesianGraph: { description: "Curved non-linear graph whose gradient changes as x changes.", xMin: -4, xMax: 4, yMin: -2, yMax: 10, parabolas: [{ kind: "quadratic", a: 0.5, b: 0, c: 0, label: "changing rate" }] } },

  "y12s2-sca-m1": nonRightTriangle("Triangle ABC with side BC equal to 40 metres opposite angle A 30 degrees, and unknown side AC opposite angle B 45 degrees.", { BC: "40 m", AC: "?" }, { A: "30°", B: "45°" }),
  "y12s2-sca-m6": nonRightTriangle("Park triangle with sides AB 50 metres and AC 70 metres enclosing angle A 40 degrees.", { AB: "50 m", AC: "70 m" }, { A: "40°" }),
  "chal-y12s2-tri-1": nonRightTriangle("Triangle ABC with side BC a equal to 12, side AC b equal to 15, angle A 40 degrees, and acute angle B unknown.", { BC: "a = 12", AC: "b = 15" }, { A: "40°", B: "? acute" }),
  "chal-y12s2-tri-2": nonRightTriangle("Triangle with two sides of 6 and 8 centimetres enclosing an angle of 65 degrees.", { AB: "6 cm", AC: "8 cm" }, { A: "65°" }),
  "chal-y12s2-tri-3": nonRightTriangle("Triangle with side lengths 5, 7 and 9; the largest angle lies opposite the longest side of length 9.", { AB: "5", AC: "7", BC: "9" }, { A: "? largest" }),
  "y12s2-trv-g4": nonRightTriangle("Non-right triangle with angles 42, 58 and 80 degrees, so right-angle trigonometry does not apply.", {}, { A: "42°", B: "58°", C: "80°" }),
  "y12s2-trv-i4": nonRightTriangle("Triangle whose longest side BC lies opposite the largest angle A.", { AB: "shorter", AC: "shorter", BC: "longest" }, { A: "largest" }),
  "y12s2-trv-m1": nonRightTriangle("Triangle with sides AB 48 metres and AC 62 metres enclosing angle A 37 degrees; side BC is unknown.", { AB: "48 m", AC: "62 m", BC: "?" }, { A: "37°" }),
  "y12s2-trv-m5": nonRightTriangle("Non-right triangle with angles 50, 60 and 70 degrees.", {}, { A: "50°", B: "60°", C: "70°" }),
  "y12s2-trv-m8": nonRightTriangle("Triangle with sides AB 11 metres and AC 15 metres enclosing angle A 70 degrees; third side BC is c.", { AB: "11 m", AC: "15 m", BC: "c" }, { A: "70°" }),
  "y12s2-trv-m10": nonRightTriangle("Triangle showing the required opposite pairings: angle A 35 degrees is opposite side a, and angle B 65 degrees is opposite side b.", { BC: "a", AC: "b" }, { A: "35°", B: "65°", C: "80°" }),
  "y12s2-amb-g3": nonRightTriangle("SSA triangle with a 7, b 9, angle A 45 degrees, and the obtuse candidate angle B equal to 114.6 degrees.", { BC: "a = 7", AC: "b = 9" }, { A: "45°", B: "114.6°?" }),
  "y12s2-amb-i5": nonRightTriangle("SSA triangle with two known sides and an angle opposite one of them; the sine rule is used to find the missing angle.", { BC: "a", AC: "b" }, { A: "known", B: "?" }),
  "y12s2-amb-m3": nonRightTriangle("SSA triangle with a 7, b 9 and angle A 45 degrees; angle B is unknown.", { BC: "a = 7", AC: "b = 9" }, { A: "45°", B: "?" }),
  "y12s2-amb-m7": nonRightTriangle("SSA triangle with a 12, b 7 and angle A 65 degrees; angle B is unknown.", { BC: "a = 12", AC: "b = 7" }, { A: "65°", B: "?" }),
  "y12s2-amb-m8": nonRightTriangle("SSA triangle with angle A 35 degrees, opposite side a 8 centimetres and side b 11 centimetres, admitting two possible positions of B.", { BC: "a = 8 cm", AC: "b = 11 cm" }, { A: "35°", B: "?" }),
  "y12s2-amb-m9": nonRightTriangle("SSA triangle with angle A 42 degrees, opposite side a 10 centimetres and side b 14 centimetres; the larger angle B is required.", { BC: "a = 10 cm", AC: "b = 14 cm" }, { A: "42°", B: "? larger" }),
  "y12s2-rate-exam-m1": nonRightTriangle("Non-right triangle with two known sides enclosing a known angle and unknown third side, matching the cosine rule.", { AB: "known", AC: "known", BC: "?" }, { A: "included angle" }),

  "y12s2-bdr-m6": { histogramDiagram: { description: "Negatively skewed distribution with a long left tail; its mean lies below its median.", bins: [{ label: "0–10", frequency: 1 }, { label: "10–20", frequency: 2 }, { label: "20–30", frequency: 4 }, { label: "30–40", frequency: 7 }, { label: "40–50", frequency: 10 }], axisLabel: "Value", frequencyAxisLabel: "Frequency" } },
  "y12s2-biv-g1": scatter("Scatterplot of study hours and test score rising from left to right.", positiveScatter),
  "y12s2-biv-g4": scatter("Scatterplot of temperature and ice-cream sales with a positive association; the display alone cannot establish causation.", positiveScatter),
  "y12s2-biv-i1": scatter("Scatterplot of advertising spend and sales with a moderately scattered upward trend.", [{ x: 1, y: 3 }, { x: 2, y: 2.5 }, { x: 3, y: 5 }, { x: 4, y: 4.5 }, { x: 5, y: 7 }, { x: 6, y: 6.5 }]),
  "y12s2-biv-i5": scatter("Scatterplot of screen time and sleep hours showing an association with noticeable spread; other factors may influence both variables.", [{ x: 1, y: 9 }, { x: 2, y: 8 }, { x: 3, y: 8.5 }, { x: 4, y: 7 }, { x: 5, y: 7.5 }, { x: 6, y: 6 }]),
  "y12s2-biv-m7": scatter("Scatterplot of advertising spend and sales with positive association but no evidence by itself of a causal relationship.", positiveScatter),
  "y12s2-biv-m9": scatter("Curved U-shaped scatterplot: y falls until x equals 5 then rises, so a near-zero linear correlation would hide a strong non-linear relationship.", [{ x: 1, y: 9 }, { x: 2, y: 6 }, { x: 3, y: 4 }, { x: 4, y: 2 }, { x: 5, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 4 }, { x: 8, y: 6 }, { x: 9, y: 9 }]),
  "y12s2-corr-g1": scatter("Scatterplot rising from left to right, showing positive association.", positiveScatter),
  "y12s2-corr-m1": scatter("Scatterplot with an upward trend as x increases.", positiveScatter),
  "y12s2-corr-m2": scatter("Scatterplot with a downward trend as x increases.", [{ x: 1, y: 8 }, { x: 2, y: 7 }, { x: 3, y: 6 }, { x: 4, y: 4 }, { x: 5, y: 3 }, { x: 6, y: 2 }]),
  "y12s2-stat-exam-g1": scatter("Scatterplot of training time and performance score with an upward trend; association is visible but causation is not established.", positiveScatter),
  "y12s2-stat-exam-m1": scatter("Scatterplot with an upward trend, representing positive association.", positiveScatter),

  "y12s2-nfr-i2": network("Five-vertex network with degree sequence 2, 3, 2, 4 and 3, and therefore seven edges.", ["A", "B", "C", "D", "E"], [["D", "A"], ["D", "B"], ["D", "C"], ["D", "E"], ["B", "A"], ["B", "E"], ["E", "C"]]),
  "y12s2-nfr-m3": network("Four-vertex network with degrees A 2, B 3, C 3 and D 2.", ["A", "B", "C", "D"], [["A", "B"], ["A", "C"], ["B", "C"], ["B", "D"], ["C", "D"]]),
  "y12s2-nfr-m6": network("Undirected network with seven edges, so the sum of all vertex degrees is twice seven.", ["A", "B", "C", "D", "E"], [["D", "A"], ["D", "B"], ["D", "C"], ["D", "E"], ["B", "A"], ["B", "E"], ["E", "C"]]),
  "y12s2-net-term-m1": network("Five-vertex undirected network where four degrees are 4, 3, 3 and 2 and the fifth degree is found using the handshake lemma.", ["A (4)", "B (3)", "C (3)", "D (2)", "E (?)"], [["A (4)", "B (3)"], ["A (4)", "C (3)"], ["A (4)", "D (2)"], ["A (4)", "E (?)"], ["B (3)", "C (3)"], ["B (3)", "D (2)"], ["C (3)", "E (?)"]]),
  "y12s2-net-term-m8": network("Five-vertex network with nine edges and total degree 18, illustrating that the degree sum is twice the edge count.", ["A", "B", "C", "D", "E"], [["A", "C"], ["A", "D"], ["A", "E"], ["B", "C"], ["B", "D"], ["B", "E"], ["C", "D"], ["C", "E"], ["D", "E"]]),
  "y12s2-net-term-m9": network("Connected network with degrees A 2, B 3, C 3 and D 2; the two odd vertices B and C are the possible endpoints of an Euler trail.", ["A", "B", "C", "D"], [["A", "B"], ["A", "C"], ["B", "C"], ["B", "D"], ["C", "D"]]),
  "y12s2-spmst-m9": network("Weighted network used to contrast a shortest path between two selected vertices with a minimum spanning tree connecting every vertex.", ["A", "B", "C", "D"], [["A", "B", 3], ["A", "C", 6], ["B", "C", 2], ["B", "D", 7], ["C", "D", 4]]),
  "y12s2-flow-g1": standardFlow,
  "y12s2-flow-m1": standardFlow,
  "y12s2-flow-m6": standardFlow,
  "y12s2-flow-m7": standardFlow,
  "y12s2-net-exam-m8": network("Weighted four-site network for choosing between the shortest route joining two depots and a minimum spanning tree connecting all sites.", ["A", "B", "C", "D"], [["A", "B", 4], ["A", "C", 7], ["B", "C", 2], ["B", "D", 6], ["C", "D", 3]]),
  "y12s2-net-exam-m9": network("Directed flow network carrying 18 units from source S to sink T; the cut leaving S has capacity 10 plus 8, also 18.", ["S", "A", "B", "T"], [["S", "A", 10, true], ["S", "B", 8, true], ["A", "T", 10, true], ["B", "T", 8, true]]),

  "y12s2-p1-q4": nonRightTriangle("Triangle with sides AB 8 centimetres and AC 10 centimetres enclosing angle A 30 degrees.", { AB: "8 cm", AC: "10 cm" }, { A: "30°" }),
  "y12s2-p1-q7": nonRightTriangle("Triangle ABC with side a BC equal to 7 centimetres, side b AC equal to 9 centimetres, and included angle C equal to 110 degrees.", { BC: "a = 7 cm", AC: "b = 9 cm" }, { C: "110°" }),

  "y12s2-amb-g4": nonRightTriangle("SSA measurements a 12, b 7 and A 65 degrees, with candidate angles B1 31.9 degrees and B2 148.1 degrees to test for validity.", { BC: "a = 12", AC: "b = 7" }, { A: "65°", B: "31.9° or 148.1°" }),
  "y12s2-amb-i3": nonRightTriangle("SSA measurements a 5, b 9 and A 25 degrees, with candidate angles B1 49.5 degrees and B2 130.5 degrees.", { BC: "a = 5", AC: "b = 9" }, { A: "25°", B: "49.5° or 130.5°" }),
  "y12s2-amb-m6": nonRightTriangle("SSA measurements a 7, b 9 and A 45 degrees, with candidate angles B1 65.4 degrees and B2 114.6 degrees.", { BC: "a = 7", AC: "b = 9" }, { A: "45°", B: "65.4° or 114.6°" }),
  "y12s2-amb-m10": nonRightTriangle("SSA triangle with A 30 degrees, opposite side a 6 centimetres and side b 15 centimetres, used to determine the number of possible triangles.", { BC: "a = 6 cm", AC: "b = 15 cm" }, { A: "30°", B: "?" }),

  "y12s2-bdr-m8": scatter("Scatterplot of weekly exercise time and resting heart rate with a strong negative linear association, consistent with r equal to negative 0.86 but not proof of causation.", [{ x: 1, y: 10 }, { x: 2, y: 9 }, { x: 3, y: 8.5 }, { x: 4, y: 6 }, { x: 5, y: 5 }, { x: 6, y: 3.5 }]),
  "y12s2-corr-g3": { ...scatter("Scatterplot with a strong positive linear association corresponding to r equal to 0.88.", positiveScatter), scatterPlotDiagram: { ...(scatter("", positiveScatter).scatterPlotDiagram!), description: "Scatterplot with a strong positive linear association corresponding to r equal to 0.88.", correlationLabel: "r = 0.88" } },
  "y12s2-corr-i2": { scatterPlotDiagram: { description: "Scatterplot with a very strong negative linear association corresponding to r equal to negative 0.93.", xAxisLabel: "Explanatory variable", yAxisLabel: "Response variable", points: [{ x: 1, y: 9 }, { x: 2, y: 8 }, { x: 3, y: 7 }, { x: 4, y: 5 }, { x: 5, y: 4 }, { x: 6, y: 2 }], correlationLabel: "r = -0.93" } },
  "y12s2-corr-i3": { scatterPlotDiagram: { description: "Scatterplot with no clear linear trend, corresponding to correlation r equal to 0.06.", xAxisLabel: "Explanatory variable", yAxisLabel: "Response variable", points: [{ x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 3 }, { x: 4, y: 7 }, { x: 5, y: 2 }, { x: 6, y: 6 }], correlationLabel: "r = 0.06" } },
  "y12s2-corr-m8": { scatterPlotDiagram: { description: "Scatterplot of advertising expenditure and sales with strong positive association r equal to 0.92; correlation alone does not prove advertising caused the sales change.", xAxisLabel: "Advertising expenditure", yAxisLabel: "Sales", points: positiveScatter, correlationLabel: "r = 0.92" } },
  "y12s2-stat-exam-i1": { scatterPlotDiagram: { description: "Scatterplot of temperature and heater use with moderately strong negative association r equal to negative 0.72.", xAxisLabel: "Temperature", yAxisLabel: "Heater use", points: [{ x: 1, y: 9 }, { x: 2, y: 7 }, { x: 3, y: 8 }, { x: 4, y: 5 }, { x: 5, y: 4 }, { x: 6, y: 3 }], correlationLabel: "r = -0.72" } },

  "y12s2-nfr-m7": network("Simple path A-B-C-D visiting each of four vertices once.", ["A", "B", "C", "D"], [["A", "B"], ["B", "C"], ["C", "D"]]),
  "y12s2-nfr-m10": network("Flow-conservation vertex V with directed inflows 12 and 7 and directed outflows 8 and x units per minute.", ["In 1", "In 2", "V", "Out 1", "Out 2"], [["In 1", "V", 12, true], ["In 2", "V", 7, true], ["V", "Out 1", 8, true], ["V", "Out 2", "x", true]]),
  "y12s2-spmst-g4": network("Minimum spanning tree with selected edge weights 2, 4 and 5.", ["A", "B", "C", "D"], [["A", "B", 2], ["B", "C", 4], ["C", "D", 5]]),
  "y12s2-spmst-m5": network("Minimum spanning tree with selected edge weights 1, 3, 4 and 6.", ["A", "B", "C", "D", "E"], [["A", "B", 1], ["B", "C", 3], ["C", "D", 4], ["D", "E", 6]]),
  "y12s2-spmst-m6": network("Weighted network illustrating Kruskal's method, with candidate edges ordered from smallest to largest while cycles are avoided.", ["A", "B", "C", "D"], [["A", "B", 1], ["B", "C", 2], ["A", "C", 3], ["C", "D", 4], ["B", "D", 5]]),
  "y12s2-flow-g2": network("Single directed arc A to B with capacity 10 and proposed flow 7, which is feasible because flow does not exceed capacity.", ["A", "B"], [["A", "B", "7 / 10", true]]),
  "y12s2-flow-i2": network("Single directed arc A to B with capacity 9 and proposed flow 11, so the proposal exceeds capacity.", ["A", "B"], [["A", "B", "11 / 9", true]]),
  "y12s2-flow-i5": standardFlow,
  "y12s2-flow-m2": network("Single directed arc A to B carrying flow 16 with capacity 20, leaving spare capacity 4.", ["A", "B"], [["A", "B", "16 / 20", true]]),
  "y12s2-flow-m3": network("Single directed arc A to B carrying proposed flow 15 with capacity 12, making the flow infeasible.", ["A", "B"], [["A", "B", "15 / 12", true]]),
  "y12s2-flow-m9": network("Source-to-sink cut crossing three directed arcs with capacities 4, 7 and 3, for total cut capacity 14.", ["S", "A", "B", "C", "T"], [["S", "A", 4, true], ["S", "B", 7, true], ["S", "C", 3, true], ["A", "T", 8, true], ["B", "T", 9, true], ["C", "T", 6, true]]),
  "y12s2-flow-m10": network("Directed flow network with two alternative minimum cuts; increasing one arc by 5 does not increase the unchanged bottleneck cut.", ["S", "A", "B", "T"], [["S", "A", 8, true], ["S", "B", 7, true], ["A", "T", 6, true], ["B", "T", 9, true]]),

  "y12s2-cpr-g3": network("Three parallel project paths from Start to Finish labelled with total durations 10, 14 and 12 days; the longest determines completion.", ["Start", "P1", "P2", "P3", "Finish"], [["Start", "P1", "10 days", true], ["P1", "Finish", undefined, true], ["Start", "P2", "14 days", true], ["P2", "Finish", undefined, true], ["Start", "P3", "12 days", true], ["P3", "Finish", undefined, true]]),
  "y12s2-cpr-i3": network("Critical project path A-B-C with all activities highlighted conceptually and zero scheduling float.", ["A", "B", "C"], [["A", "B", undefined, true], ["B", "C", undefined, true]]),
  "y12s2-cpr-i4": network("Three project paths with totals P1 8 days, P2 11 days and P3 7 days; P2 is critical.", ["Start", "P1 (8d)", "P2 (11d)", "P3 (7d)", "Finish"], [["Start", "P1 (8d)", undefined, true], ["P1 (8d)", "Finish", undefined, true], ["Start", "P2 (11d)", undefined, true], ["P2 (11d)", "Finish", undefined, true], ["Start", "P3 (7d)", undefined, true], ["P3 (7d)", "Finish", undefined, true]]),
  "y12s2-cpr-m3": network("Three project paths with total durations 8, 15 and 11 days; the 15-day path is critical.", ["Start", "8d", "15d", "11d", "Finish"], [["Start", "8d", undefined, true], ["8d", "Finish", undefined, true], ["Start", "15d", undefined, true], ["15d", "Finish", undefined, true], ["Start", "11d", undefined, true], ["11d", "Finish", undefined, true]]),
  "y12s2-cpr-m4": network("Critical path total 15 days compared with path P3 total 11 days, leaving 4 days of branch float.", ["Start", "Critical 15d", "P3 11d", "Finish"], [["Start", "Critical 15d", undefined, true], ["Critical 15d", "Finish", undefined, true], ["Start", "P3 11d", undefined, true], ["P3 11d", "Finish", undefined, true]]),
  "y12s2-cpr-m6": network("Activity path P1 containing A 3 days, C 5 days and E 2 days.", ["A (3d)", "C (5d)", "E (2d)"], [["A (3d)", "C (5d)", undefined, true], ["C (5d)", "E (2d)", undefined, true]]),
  "y12s2-cpr-m7": network("Critical activity path A-B-C; a two-day delay to an activity on this zero-float path delays project completion by two days.", ["A", "B (+2d)", "C"], [["A", "B (+2d)", undefined, true], ["B (+2d)", "C", undefined, true]]),
  "y12s2-cpr-m8": network("Project network: A takes 4 days, then B 6 days and C 3 days run in parallel, followed by D 5 days. Path A-B-D is critical.", ["A (4d)", "B (6d)", "C (3d)", "D (5d)"], [["A (4d)", "B (6d)", undefined, true], ["A (4d)", "C (3d)", undefined, true], ["B (6d)", "D (5d)", undefined, true], ["C (3d)", "D (5d)", undefined, true]]),
  "y12s2-cpr-m10": network("The same project with critical activity B delayed by two days, increasing the critical path A-B-D from 15 to 17 days.", ["A (4d)", "B (8d)", "C (3d)", "D (5d)"], [["A (4d)", "B (8d)", undefined, true], ["A (4d)", "C (3d)", undefined, true], ["B (8d)", "D (5d)", undefined, true], ["C (3d)", "D (5d)", undefined, true]]),
  "y12s2-cpa-g3": network("Project network with several Start-to-Finish paths; the path with the greatest total duration is the critical path.", ["Start", "A", "B", "C", "Finish"], [["Start", "A", undefined, true], ["A", "Finish", undefined, true], ["Start", "B", undefined, true], ["B", "C", undefined, true], ["C", "Finish", undefined, true]]),
  "y12s2-cpa-m5": network("Three project paths with total durations 14, 12 and 10 days; the longest 14-day path determines completion.", ["Start", "14d", "12d", "10d", "Finish"], [["Start", "14d", undefined, true], ["14d", "Finish", undefined, true], ["Start", "12d", undefined, true], ["12d", "Finish", undefined, true], ["Start", "10d", undefined, true], ["10d", "Finish", undefined, true]]),
  "y12s2-net-exam-i4": network("Project with three paths totalling 9, 13 and 11 days; completion is determined by the 13-day path.", ["Start", "9d", "13d", "11d", "Finish"], [["Start", "9d", undefined, true], ["9d", "Finish", undefined, true], ["Start", "13d", undefined, true], ["13d", "Finish", undefined, true], ["Start", "11d", undefined, true], ["11d", "Finish", undefined, true]]),
  "y12s2-net-exam-m5": network("Minimum spanning tree with selected edge lengths 5, 6, 8 and 9.", ["A", "B", "C", "D", "E"], [["A", "B", 5], ["B", "C", 6], ["C", "D", 8], ["D", "E", 9]]),
  "y12s2-net-exam-m7": network("Project activity path with consecutive durations 2, 5, 4 and 3 days.", ["A (2d)", "B (5d)", "C (4d)", "D (3d)"], [["A (2d)", "B (5d)", undefined, true], ["B (5d)", "C (4d)", undefined, true], ["C (4d)", "D (3d)", undefined, true]]),
};

const WORKED_EXAMPLE_PATCHES: Record<string, Partial<WorkedExample>> = {
  "algebraic-relationships-revision:2": {
    questionLatex: "\\text{Use the displayed phone-plan table to identify the linear rule.}",
    dataTableDiagram: { description: "Phone-plan cost table for a 5 dollar monthly fee plus 20 cents per minute.", columnHeaders: ["Minutes", "Cost ($)"], values: [[0, 5], [5, 6], [10, 7], [15, 8]] },
  },
  "exponential-inverse-variation:2": {
    questionLatex: "\\text{Use the displayed value table to classify relationships A, B and C.}",
    dataTableDiagram: { description: "Three relationships across inputs 1 to 4: A has constant first difference, B has constant ratio, and C has constant product xy.", columnHeaders: ["x = 1", "x = 2", "x = 3", "x = 4"], rowHeaders: ["A", "B", "C"], values: [[5, 8, 11, 14], [3, 6, 12, 24], [24, 12, 8, 6]] },
  },
  "ambiguous-case-sine-rule:2": {
    questionLatex: "\\text{Use the two displayed SSA triangles to find angle C in each case.}",
    trianglePairDiagram: {
      description: "Two possible SSA triangles for a equal to 7, b equal to 9 and angle A 45 degrees: the first has B 65.4 degrees and the second has B 114.6 degrees.",
      leftCaption: "B₁ = 65.4°",
      rightCaption: "B₂ = 114.6°",
      left: { description: "Acute-B solution.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 5, y: 5 } }, sideLabels: { BC: "a = 7", AC: "b = 9" }, angleLabels: { A: "45°", B: "65.4°", C: "?" } },
      right: { description: "Obtuse-B solution.", vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 2, y: 3 } }, sideLabels: { BC: "a = 7", AC: "b = 9" }, angleLabels: { A: "45°", B: "114.6°", C: "?" } },
    },
  },
  "investment-compound-interest:2": {
    questionLatex: "P=\\$4000,\\quad n=2.\\quad\\text{Compare the displayed investment options.}",
    dataTableDiagram: { description: "Investment options for 4000 dollars over two years: A earns 3.5 percent with no fee; B earns 3.0 percent with a 40 dollar end fee.", columnHeaders: ["Option", "Rate", "End fee"], values: [["A", "3.5%", "$0"], ["B", "3.0%", "$40"]] },
  },
  "annuities-revision:1": {
    questionLatex: "\\text{Use the displayed first three rows of Hannah's savings balance table.}",
    dataTableDiagram: { description: "First three end-of-month balances after 200 dollar deposits at 3 percent per annum compounded monthly.", columnHeaders: ["Month", "Balance after deposit ($)"], values: [[1, "200.00"], [2, "400.50"], [3, "601.50"]] },
  },
  "annuities-revision:2": {
    questionLatex: "\\text{Use the displayed first three rows of the loan balance table.}",
    dataTableDiagram: { description: "First three balances for a 5000 dollar loan at 6 percent per annum compounded monthly with 430 dollar monthly repayments.", columnHeaders: ["Month", "Balance after repayment ($)"], values: [[0, "5000.00"], [1, "4595.00"], [2, "4187.98"], [3, "3778.91"]] },
  },
  "annuities-regular-payments:2": {
    questionLatex: "\\text{Use the displayed loan balance table.}",
    dataTableDiagram: { description: "Loan balance after repayments for months zero, one and two.", columnHeaders: ["Month", "Balance after repayment ($)"], values: [[0, 10000], [1, 9620], [2, 9238]] },
  },
  "relative-frequency-probability:2": {
    questionLatex: "\\text{Use the displayed transport table to calculate the requested probability.}",
    twoWayTableDiagram: { description: "Transport survey with students and adults classified by bus or train travel.", rowLabels: ["Student", "Adult"], columnLabels: ["Bus", "Train"], values: [[18, 12], [22, 28]], rowTotals: [30, 50], columnTotals: [40, 40], grandTotal: 80 },
  },
  "expected-frequency-contingency-tables:1": {
    questionLatex: "\\text{Use the displayed sport survey to find P(Female) and P(Male and Sport).}",
  },
  "network-concepts-terminology:0": {
    questionLatex: "\\text{Use the displayed school path network to count vertices, edges and degrees.}",
  },
  "network-concepts-terminology:1": {
    questionLatex: "\\text{Use the displayed weighted road network.}",
    diagram: { description: "Weighted triangular road network with AB 6 minutes, AC 10 minutes and BC 4 minutes.", vertices: [{ id: "A", label: "A", x: 50, y: 180 }, { id: "B", label: "B", x: 180, y: 40 }, { id: "C", label: "C", x: 310, y: 180 }], edges: [{ from: "A", to: "B", weight: 6 }, { from: "A", to: "C", weight: 10 }, { from: "B", to: "C", weight: 4 }] },
  },
  "shortest-paths-minimum-spanning-trees:0": {
    questionLatex: "\\text{Use the displayed weighted road network to find the shortest path.}",
  },
  "shortest-paths-minimum-spanning-trees:1": {
    questionLatex: "\\text{Use the displayed weighted cable network to find a minimum spanning tree.}",
  },
  "critical-path-revision:0": {
    questionLatex: "\\text{Use the displayed activity network to list two valid activity sequences.}",
  },
  "critical-path-analysis:0": {
    questionLatex: "\\text{Use the displayed directed activity network to complete the forward and backward passes.}",
  },
  "gantt-charts-dummy-activities:0": {
    questionLatex: "\\text{Use the displayed Project Alpha network to find EST, EFT, LST, LFT and float for each activity.}",
  },
  "gantt-charts-dummy-activities:1": {
    questionLatex: "\\text{Use the displayed Project Alpha Gantt chart to identify activities with float.}",
    ganttChartDiagram: { description: alphaDescription, activities: alphaActivities, timeMin: 0, timeMax: 12, timeStep: 1, timeUnit: "days" },
  },
  "networks-exam-practice:1": {
    questionLatex: "\\text{Use the displayed route network to choose the shortest A-to-D route.}",
    diagram: { description: "Three alternative A-to-D routes: A-B-D totals 18, A-C-D totals 16 and A-E-D totals 20.", vertices: [{ id: "A", label: "A", x: 30, y: 120 }, { id: "B", label: "B", x: 160, y: 30 }, { id: "C", label: "C", x: 160, y: 120 }, { id: "E", label: "E", x: 160, y: 210 }, { id: "D", label: "D", x: 310, y: 120 }], edges: [{ from: "A", to: "B", weight: 9 }, { from: "B", to: "D", weight: 9 }, { from: "A", to: "C", weight: 8 }, { from: "C", to: "D", weight: 8 }, { from: "A", to: "E", weight: 10 }, { from: "E", to: "D", weight: 10 }] },
  },
};

function patchWorkedExamples(lesson: ExplicitLesson): WorkedExample[] {
  return lesson.workedExamples.map((example, index) => {
    const patch = WORKED_EXAMPLE_PATCHES[`${lesson.slug}:${index}`];
    if (!patch) return example;
    const visualPatch = DIAGRAM_SPECS.some((spec) => patch[spec.field]);
    if (!visualPatch) return { ...example, ...patch };
    const clean = { ...example } as WorkedExample & Record<string, unknown>;
    for (const spec of DIAGRAM_SPECS) delete clean[spec.field];
    return { ...clean, ...patch } as WorkedExample;
  });
}

function applyPatch(question: PracticeQuestion): PracticeQuestion {
  const patch = QUESTION_PATCHES[question.id];
  if (!patch) return question;
  const clean = { ...question } as PracticeQuestion & Record<string, unknown>;
  for (const spec of DIAGRAM_SPECS) delete clean[spec.field];
  return { ...clean, ...patch } as PracticeQuestion;
}

function finalizeInferredVisual(question: PracticeQuestion): PracticeQuestion {
  const prefix = "Use the diagram to answer the question. ";
  if (!question.prompt.startsWith(prefix)) return question;

  const prompt = question.prompt.slice(prefix.length).trim();
  const finalized = { ...question, prompt } as PracticeQuestion & Record<string, unknown>;
  for (const spec of DIAGRAM_SPECS) {
    const payload = finalized[spec.field];
    if (!payload || typeof payload !== "object") continue;
    const nextPayload: Record<string, unknown> = {
      ...(payload as Record<string, unknown>),
      description: `Mathematical diagram for the following stimulus: ${prompt}`,
    };

    if (spec.field === "solid3DDiagram") {
      const existing = (nextPayload.labels ?? {}) as Record<string, string>;
      const labels = { ...existing };
      const unit = /\b(mm|cm|m|km)\b/i.exec(prompt)?.[1] ?? "";
      const suffix = unit ? ` ${unit}` : "";
      const named = (pattern: RegExp) => pattern.exec(prompt)?.[1];
      const length = named(/(?:\bl\b|length)\s*=\s*(\d+(?:\.\d+)?)/i);
      const width = named(/(?:\bw\b|width)\s*=\s*(\d+(?:\.\d+)?)/i);
      const height = named(/(?:\bh\b|height)\s*=\s*(\d+(?:\.\d+)?)/i);
      const radius = named(/(?:\br\b|radius)\s*=\s*(\d+(?:\.\d+)?)/i);
      const diameter = named(/diameter\s*(?:=|of)?\s*(\d+(?:\.\d+)?)/i);
      const triple = /(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)/i.exec(prompt);
      if (!labels.length && (length || triple)) labels.length = `${length ?? triple?.[1]}${suffix}`;
      if (!labels.width && (width || triple)) labels.width = `${width ?? triple?.[2]}${suffix}`;
      if (!labels.height && (height || triple)) labels.height = `${height ?? triple?.[3]}${suffix}`;
      if (!labels.radius && radius) labels.radius = `${radius}${suffix}`;
      if (!labels.radius && diameter) labels.radius = `r = ${Number(diameter) / 2}${suffix} (d = ${diameter}${suffix})`;
      nextPayload.labels = labels;
    }

    if (spec.field === "triangleDiagram") {
      const existing = (nextPayload.sideLabels ?? {}) as Record<string, string>;
      const sideLabels = { ...existing };
      const value = (pattern: RegExp) => pattern.exec(prompt)?.[1];
      const unit = /\b(cm|m|km)\b/i.exec(prompt)?.[1] ?? "";
      const suffix = unit ? ` ${unit}` : "";
      const opposite = value(/opposite(?:\s+side)?\s*(?:=|is)?\s*(\d+(?:\.\d+)?)/i);
      const adjacent = value(/adjacent(?:\s+side)?\s*(?:=|is)?\s*(\d+(?:\.\d+)?)/i);
      const hypotenuse = value(/hypotenuse\s*(?:=|is)?\s*(\d+(?:\.\d+)?)/i);
      const away = value(/(?:from\s+)?(\d+(?:\.\d+)?)\s*m\s+away/i);
      const vertical = value(/(?:top of an?\s+)?(\d+(?:\.\d+)?)\s*m\s+(?:cliff|tower)/i);
      if (!sideLabels.AC && (opposite || vertical)) sideLabels.AC = `${opposite ?? vertical}${suffix || " m"}`;
      if (!sideLabels.AB && (adjacent || away)) sideLabels.AB = `${adjacent ?? away}${suffix || " m"}`;
      if (!sideLabels.BC && hypotenuse) sideLabels.BC = `${hypotenuse}${suffix}`;
      if (Object.keys(sideLabels).length === 0 && /\bopposite\b/i.test(prompt)) sideLabels.AC = "opposite";
      if (Object.keys(sideLabels).length === 0 && /\badjacent\b/i.test(prompt)) sideLabels.AB = "adjacent";
      if (/\bhypotenuse\b/i.test(prompt) && !sideLabels.BC) sideLabels.BC = "hypotenuse";
      nextPayload.sideLabels = sideLabels;

      const angleLabels = { ...((nextPayload.angleLabels ?? {}) as Record<string, string>) };
      const angle = /(?:angle(?:\s+(?:of\s+elevation|of\s+depression|[A-Zθ]))?\s*(?:=|is)?\s*)(\d+(?:\.\d+)?\s*(?:°|degrees?|rad(?:ians?)?))/i.exec(prompt)?.[1];
      if (!angleLabels.B && angle) angleLabels.B = angle;
      if (!angleLabels.B && /angle\s*θ|angle theta/i.test(prompt)) angleLabels.B = "θ";
      nextPayload.angleLabels = angleLabels;
    }

    (finalized as Record<string, unknown>)[spec.field] = nextPayload;
  }
  return finalized;
}

export function applyYear12Standard2QuestionDiagramRemediation(
  question: PracticeQuestion
): PracticeQuestion {
  return applyPatch(finalizeInferredVisual(question));
}

export function applyYear12Standard2DiagramRemediation(lesson: ExplicitLesson): ExplicitLesson {
  return {
    ...lesson,
    workedExamples: patchWorkedExamples(lesson),
    guidedPractice: lesson.guidedPractice.map(applyYear12Standard2QuestionDiagramRemediation),
    independentPractice: lesson.independentPractice.map(applyYear12Standard2QuestionDiagramRemediation),
    masteryQuiz: lesson.masteryQuiz.map(applyYear12Standard2QuestionDiagramRemediation),
    masteryQuizPool: lesson.masteryQuizPool?.map(applyYear12Standard2QuestionDiagramRemediation),
    multiPartPractice: lesson.multiPartPractice?.map(applyYear12Standard2QuestionDiagramRemediation),
  };
}
