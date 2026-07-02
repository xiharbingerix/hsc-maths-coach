// Validator gate for visual payloads on Year 12 Advanced worked examples.
// audit:lessons only iterates newCoursePathways (which excludes year-12-advanced),
// so this replicates the key cartesianGraph / trapezoidalRuleDiagram runtime rules
// for the legacy calculus course. Reports FAIL lines; exits non-zero on any failure.
import { year12AdvancedRouteUnits } from "../lib/year12AdvancedRoutes";

const errors: string[] = [];
const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const isStr = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

function checkCartesian(g: any, path: string) {
  if (!isStr(g.description)) errors.push(`${path}: cartesianGraph needs non-empty description`);
  for (const k of ["xMin", "xMax", "yMin", "yMax", "xStep", "yStep"]) {
    if (g[k] !== undefined && !isNum(g[k])) errors.push(`${path}: ${k} must be finite`);
  }
  if (isNum(g.xStep) && g.xStep <= 0) errors.push(`${path}: xStep must be > 0`);
  if (isNum(g.yStep) && g.yStep <= 0) errors.push(`${path}: yStep must be > 0`);
  if (isNum(g.xMin) && isNum(g.xMax) && g.xMin >= g.xMax) errors.push(`${path}: xMin must be < xMax`);
  if (isNum(g.yMin) && isNum(g.yMax) && g.yMin >= g.yMax) errors.push(`${path}: yMin must be < yMax`);
  (g.points ?? []).forEach((p: any, i: number) => {
    if (!isNum(p?.x) || !isNum(p?.y)) errors.push(`${path}.points[${i}]: needs finite x,y`);
  });
  (g.lines ?? []).forEach((l: any, i: number) => {
    if (l?.kind !== "linear" || !isNum(l?.m) || !isNum(l?.b)) errors.push(`${path}.lines[${i}]: linear needs finite m,b`);
  });
  (g.parabolas ?? []).forEach((p: any, i: number) => {
    if (p?.kind !== "quadratic" || !isNum(p?.a) || !isNum(p?.b) || !isNum(p?.c) || p.a === 0)
      errors.push(`${path}.parabolas[${i}]: quadratic needs finite a,b,c with a!=0`);
  });
  (g.lineSegments ?? []).forEach((s: any, i: number) => {
    if (!isNum(s?.from?.x) || !isNum(s?.from?.y) || !isNum(s?.to?.x) || !isNum(s?.to?.y))
      errors.push(`${path}.lineSegments[${i}]: from/to need finite x,y`);
  });
  (g.shadedRegions ?? []).forEach((r: any, i: number) => {
    const rp = `${path}.shadedRegions[${i}]`;
    if (!isNum(r?.xMin) || !isNum(r?.xMax) || r.xMin >= r.xMax) errors.push(`${rp}: needs finite xMin < xMax`);
    if (r?.color !== undefined && !["blue", "green", "red", "amber"].includes(r.color)) errors.push(`${rp}: bad color ${r.color}`);
    const okFn = (f: any) =>
      (f?.functionType === "line" && isNum(f?.line?.m) && isNum(f?.line?.b)) ||
      (f?.functionType === "quadratic" && isNum(f?.quadratic?.a) && isNum(f?.quadratic?.b) && isNum(f?.quadratic?.c));
    if (r?.kind === "under-function") { if (!okFn(r)) errors.push(`${rp}: under-function needs line/quadratic (NOT sin)`); }
    else if (r?.kind === "between-functions") { if (!okFn(r?.top) || !okFn(r?.bottom)) errors.push(`${rp}: between-functions top/bottom need line/quadratic`); }
    else errors.push(`${rp}: kind must be under-function or between-functions`);
  });
}

function checkTrapezoid(t: any, path: string) {
  if (!isStr(t.description)) errors.push(`${path}: trapezoidalRuleDiagram needs description`);
  if (!Array.isArray(t.xValues) || !Array.isArray(t.yValues)) { errors.push(`${path}: needs xValues,yValues arrays`); return; }
  if (t.xValues.length !== t.yValues.length) errors.push(`${path}: xValues/yValues length mismatch`);
  if (t.xValues.length < 2) errors.push(`${path}: needs >= 2 points`);
  if (t.xValues.some((x: unknown) => !isNum(x)) || t.yValues.some((y: unknown) => !isNum(y))) errors.push(`${path}: all values finite`);
  if (t.xValues.some((x: number, i: number) => i > 0 && x <= t.xValues[i - 1])) errors.push(`${path}: xValues must strictly increase`);
}

const UNITS = new Set([
  "ma-c1-introduction-to-differentiation", "ma-c2-differential-calculus",
  "ma-c3-applications-of-differentiation", "ma-c4-integral-calculus",
]);
let payloadCount = 0;
for (const unit of year12AdvancedRouteUnits) {
  if (!UNITS.has(unit.slug)) continue;
  for (const lesson of unit.lessons) {
    lesson.workedExamples.forEach((we, i) => {
      const rec = we as unknown as Record<string, unknown>;
      const base = `${unit.slug}/${lesson.slug}/WE${i + 1}`;
      if (rec.cartesianGraph) { payloadCount++; checkCartesian(rec.cartesianGraph, `${base}.cartesianGraph`); }
      if (rec.trapezoidalRuleDiagram) { payloadCount++; checkTrapezoid(rec.trapezoidalRuleDiagram, `${base}.trapezoidalRuleDiagram`); }
    });
  }
}
console.log(`Checked ${payloadCount} visual payload(s) across C1-C4.`);
if (errors.length) { console.error(`\n${errors.length} FAILURE(S):`); errors.forEach((e) => console.error("  " + e)); process.exit(1); }
console.log("All visual payloads PASS.");
