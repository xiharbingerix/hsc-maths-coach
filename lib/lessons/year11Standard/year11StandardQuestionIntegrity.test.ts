import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";

test("Year 11 Standard explanations fire on the correct topic", () => {
  const { rows, warnings } = collectAllQuestions(["year-11-standard"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.ok(rows.length > 1400, `expected the full Y11 Standard bank, got ${rows.length}`);

  for (const row of rows) {
    const haystack = `${row.prompt} ${row.latex ?? ""}`;

    // A "find the density" question must never get the volume template
    // (the volume branch used to be tested before density).
    if (/find (?:the|its) density/i.test(row.prompt)) {
      assert.doesNotMatch(
        row.explanation,
        /Volume measures three-dimensional/i,
        `${row.source_id}: density question got a volume explanation`
      );
    }

    // A population-density question must never get the flat-area template.
    if (/population density/i.test(row.prompt)) {
      assert.doesNotMatch(
        row.explanation,
        /Area is for a flat surface/i,
        `${row.source_id}: population-density question got an area explanation`
      );
    }

    // The hectare template must only appear when "ha"/"hectare" is a real word,
    // not when " ha" matched inside an ordinary word such as "has".
    if (/Convert between m² and hectares using 1 ha = 10,000/i.test(row.explanation)) {
      assert.match(
        haystack,
        /\bhectares?\b|\bha\b/i,
        `${row.source_id}: hectare explanation fired on a non-hectare question`
      );
    }

    // Stratified-sampling questions are proportional, not a total count.
    if (/stratified/i.test(row.prompt)) {
      assert.doesNotMatch(
        row.explanation,
        /asks for a total count/i,
        `${row.source_id}: stratified-sample question got a "total count" explanation`
      );
    }
  }

  // Spot-checks on questions that were broken in the 2026-06-29 export.
  const popDensity = rowsById.get("measure-dens-i2");
  assert.ok(popDensity);
  assert.match(popDensity.explanation, /Population density = number of people/i);

  const concentration = rowsById.get("measure-dens-m8");
  assert.ok(concentration);
  assert.match(concentration.explanation, /Concentration = mass ÷ volume/i);

  const scaleArea = rowsById.get("measure-scale-m8");
  assert.ok(scaleArea);
  assert.match(scaleArea.explanation, /Areas scale by the square of the scale factor/i);

  const stratified = rowsById.get("y11s-dcs-i2");
  assert.ok(stratified);
  assert.match(stratified.explanation, /In stratified sampling each subgroup/i);
});
