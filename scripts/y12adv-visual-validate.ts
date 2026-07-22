/** Runtime-shape gate for every Year 12 Advanced worked-example visual payload. */
import { year12AdvancedRouteUnits } from "../lib/year12AdvancedRoutes";
import { DIAGRAM_SPECS } from "../lib/lessons/diagramRegistry";

const errors: string[] = [];
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const text = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

function validate(payload: Record<string, unknown>, field: string, path: string) {
  if (!text(payload.description)) errors.push(`${path}: ${field} needs a non-empty description`);
  const serialized = JSON.stringify(payload);
  if (serialized.includes("NaN") || serialized.includes("Infinity")) errors.push(`${path}: contains a non-finite value`);

  if (field === "cartesianGraph") {
    for (const key of ["xMin", "xMax", "yMin", "yMax", "xStep", "yStep"]) {
      if (payload[key] !== undefined && !finite(payload[key])) errors.push(`${path}: ${key} must be finite`);
    }
    if (finite(payload.xMin) && finite(payload.xMax) && payload.xMin >= payload.xMax) errors.push(`${path}: xMin must be less than xMax`);
    if (finite(payload.yMin) && finite(payload.yMax) && payload.yMin >= payload.yMax) errors.push(`${path}: yMin must be less than yMax`);
  }
  if (field === "trapezoidalRuleDiagram") {
    const xs = payload.xValues as unknown[] | undefined;
    const ys = payload.yValues as unknown[] | undefined;
    if (!Array.isArray(xs) || !Array.isArray(ys) || xs.length !== ys.length || xs.length < 2) errors.push(`${path}: needs matching x/y arrays with at least two values`);
  }
  if (field === "dataTableDiagram" || field === "twoWayTableDiagram") {
    if (!Array.isArray(payload.values) || payload.values.length === 0) errors.push(`${path}: table needs values`);
  }
  if (field === "scatterPlotDiagram" && (!Array.isArray(payload.points) || payload.points.length < 2)) errors.push(`${path}: scatter plot needs at least two points`);
  if (field === "probabilityTreeDiagram" && (!Array.isArray(payload.branches) || payload.branches.length < 2)) errors.push(`${path}: probability tree needs branches`);
}

let count = 0;
for (const unit of year12AdvancedRouteUnits) for (const lesson of unit.lessons) {
  lesson.workedExamples.forEach((example, index) => {
    const record = example as unknown as Record<string, unknown>;
    for (const spec of DIAGRAM_SPECS) {
      const payload = record[spec.field];
      if (!payload || typeof payload !== "object") continue;
      count++;
      validate(payload as Record<string, unknown>, spec.field, `${unit.slug}/${lesson.slug}/WE${index + 1}.${spec.field}`);
    }
  });
}

console.log(`Checked ${count} worked-example visual payload(s) across all Year 12 Advanced units.`);
if (errors.length) {
  errors.forEach((error) => console.error(`  ${error}`));
  process.exit(1);
}
console.log("All visual payloads PASS.");
