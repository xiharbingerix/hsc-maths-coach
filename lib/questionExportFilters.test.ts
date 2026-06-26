import assert from "node:assert/strict";
import test from "node:test";
import { normaliseMultiFilter } from "./questionExportFilters";

test("normalises repeated and comma-separated export filters", () => {
  assert.deepEqual(normaliseMultiFilter(["algebra", "geometry,data"]), [
    "algebra",
    "geometry",
    "data",
  ]);
});

test("trims, removes blanks, and de-duplicates export filters", () => {
  assert.deepEqual(normaliseMultiFilter(" algebra, ,geometry,algebra "), [
    "algebra",
    "geometry",
  ]);
  assert.deepEqual(normaliseMultiFilter(undefined), []);
});
