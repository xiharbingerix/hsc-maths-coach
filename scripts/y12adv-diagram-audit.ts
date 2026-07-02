// Throwaway: report which C1-C4 lessons have a visual/renderer payload on any worked example.
import { year12AdvancedRouteUnits } from "../lib/year12AdvancedRoutes";

const DIAGRAM_FIELDS = [
  "triangleDiagram", "cartesianGraph", "unitCircleDiagram", "trigGraphDiagram",
  "argandDiagram", "vector3DDiagram", "trapezoidalRuleDiagram", "boxPlotDiagram",
  "normalDistributionDiagram", "probabilityTreeDiagram", "twoWayTableDiagram",
  "vennDiagram", "diagram", "solutionDiagram", "dotPlot", "histogram", "barChart",
  "stemAndLeaf",
];

const UNITS = new Set([
  "ma-c1-introduction-to-differentiation",
  "ma-c2-differential-calculus",
  "ma-c3-applications-of-differentiation",
  "ma-c4-integral-calculus",
]);

// The 13 lessons targeted by the diagram-implementation pass.
const TARGETS = new Set([
  "differentiating-polynomial-terms", "differentiating-polynomial-functions",
  "optimisation", "rates-of-change-applications", "second-derivative-concavity",
  "stationary-point-classification", "curve-sketching-calculus", "kinematics-rates-change",
  "definite-integrals-fundamental-theorem", "applications-total-change-motion",
  "initial-conditions-particular-primitive", "standard-integrals",
  "definite-integrals-standard-forms",
]);
let targetsWithDiagram = 0;
const targetsMissing: string[] = [];

for (const unit of year12AdvancedRouteUnits) {
  if (!UNITS.has(unit.slug)) continue;
  for (const lesson of unit.lessons) {
    if (lesson.status !== "active") continue;
    const hits: string[] = [];
    lesson.workedExamples.forEach((we, i) => {
      const rec = we as unknown as Record<string, unknown>;
      for (const f of DIAGRAM_FIELDS) {
        if (rec[f]) hits.push(`WE${i + 1}.${f}`);
      }
    });
    const flag = hits.length ? "HASDIAGRAM" : "nodiagram ";
    console.log(`${flag}  ${unit.slug}/${lesson.slug}${hits.length ? "  [" + hits.join(", ") + "]" : ""}`);
    if (TARGETS.has(lesson.slug)) {
      if (hits.length) targetsWithDiagram++;
      else targetsMissing.push(`${unit.slug}/${lesson.slug}`);
    }
  }
}

console.log(`\nDIAGRAM-PASS COVERAGE: ${targetsWithDiagram}/${TARGETS.size} target lessons now have a diagram.`);
if (targetsMissing.length) {
  console.log("STILL MISSING:");
  targetsMissing.forEach((t) => console.log("  " + t));
}
