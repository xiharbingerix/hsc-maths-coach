/** Course-wide diagram coverage audit for Year 12 Advanced worked examples. */
import { year12AdvancedRouteUnits } from "../lib/year12AdvancedRoutes";
import { DIAGRAM_SPECS } from "../lib/lessons/diagramRegistry";

const visualLanguage = /\b(?:graph|curve|asymptote|unit circle|Venn|tree diagram|two-way table|sign table|scatterplot|residual plot|box plot|histogram|normal distribution|trapezoid|area under|area between)\b/i;
const missing: string[] = [];
let lessons = 0;
let examples = 0;
let payloads = 0;

for (const unit of year12AdvancedRouteUnits) {
  let unitPayloads = 0;
  for (const lesson of unit.lessons) {
    if (lesson.status !== "active") continue;
    lessons++;
    lesson.workedExamples.forEach((example, index) => {
      examples++;
      const record = example as unknown as Record<string, unknown>;
      const fields = DIAGRAM_SPECS.filter((spec) => record[spec.field]).map((spec) => spec.field);
      payloads += fields.length;
      unitPayloads += fields.length;
      const stimulus = `${String(record.question ?? "")} ${example.questionLatex ?? ""}`;
      if (visualLanguage.test(stimulus) && fields.length === 0) {
        missing.push(`${unit.slug}/${lesson.slug}/WE${index + 1}`);
      }
    });
  }
  console.log(`${unit.slug}: ${unitPayloads} worked-example visual payload(s)`);
}

console.log(`\nCOURSE COVERAGE: ${lessons} active lessons, ${examples} worked examples, ${payloads} visual payloads.`);
console.log(`Explicitly visual worked examples without a payload: ${missing.length}`);
if (missing.length) {
  missing.forEach((path) => console.error(`  ${path}`));
  process.exitCode = 1;
}
