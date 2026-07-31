import katex from "katex";
import { tokenizeMathText } from "../lib/mathText";
import { collectAllQuestions } from "./seed-question-bank";

const LATEX_COMMAND_RE =
  /\\(frac|dfrac|tfrac|sqrt|cdot|times|div|pi|theta|alpha|beta|lambda|mu|le|ge|leq|geq|neq|approx|sum|int|sin|cos|tan|ln|log|infty|pm|circ|degree)\b/;

function issuesForMathText(value: string) {
  const segments = tokenizeMathText(value);
  const renderedPlainText = segments
    .filter((segment) => segment.type === "text")
    .map((segment) => segment.value)
    .join("");
  const issues: string[] = [];
  if (/\^/.test(renderedPlainText)) issues.push("raw ^");
  if (/[A-Za-z0-9]_(\{|[A-Za-z0-9])/.test(renderedPlainText)) issues.push("raw subscript");
  if (LATEX_COMMAND_RE.test(renderedPlainText)) {
    issues.push("LaTeX command outside math delimiters");
  }
  for (const segment of segments) {
    if (segment.type !== "math") continue;
    const warnings: string[] = [];
    const originalWarn = console.warn;
    try {
      console.warn = (...values: unknown[]) => warnings.push(values.join(" "));
      katex.renderToString(segment.value, { throwOnError: true, strict: "ignore" });
    } catch {
      issues.push(`invalid KaTeX segment: ${segment.value}`);
    } finally {
      console.warn = originalWarn;
    }
    if (warnings.some((warning) => warning.includes("No character metrics"))) {
      issues.push(`unsupported KaTeX character: ${segment.value}`);
    }
  }
  return issues;
}

const courseArgumentIndex = process.argv.indexOf("--course");
const requestedCourse =
  process.argv.find((argument) => argument.startsWith("--course="))?.split("=")[1] ??
  (courseArgumentIndex >= 0 ? process.argv[courseArgumentIndex + 1] : undefined) ??
  "year-11-advanced";
const { rows } = collectAllQuestions([requestedCourse]);
const findings: string[] = [];

function inspectMathText(sourceId: string, path: string, value: unknown) {
  if (typeof value !== "string") return;
  const issues = issuesForMathText(value);
  if (issues.length > 0) {
    findings.push(`${sourceId} ${path}: ${issues.join(", ")} — ${value}`);
  }
}

for (const row of rows) {
  inspectMathText(row.source_id, "prompt", row.prompt);
  inspectMathText(row.source_id, "hint", row.hint);
  inspectMathText(row.source_id, "explanation", row.explanation);
  for (const [index, choice] of (row.choices ?? []).entries()) {
    inspectMathText(row.source_id, `choices[${index}].text`, choice.text);
  }
  for (const [index, part] of (row.question_parts ?? []).entries()) {
    for (const field of ["prompt", "hint", "explanation"] as const) {
      inspectMathText(row.source_id, `question_parts[${index}].${field}`, part[field]);
    }
    if (Array.isArray(part.choices)) {
      for (const [choiceIndex, choice] of part.choices.entries()) {
        if (typeof choice === "object" && choice !== null) {
          inspectMathText(
            row.source_id,
            `question_parts[${index}].choices[${choiceIndex}].text`,
            (choice as { text?: unknown }).text,
          );
        }
      }
    }
  }
}

console.log("ACTIVE QUESTION RENDERING AUDIT");
console.log(`Course: ${requestedCourse}`);
console.log(`Rows inspected: ${rows.length}`);
console.log(`Findings: ${findings.length}`);
for (const finding of findings) console.log(finding);

if (findings.length > 0) process.exitCode = 1;
