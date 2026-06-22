import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PATH_TAG_FILTERS,
  filterUnitsByPathTags,
  derivePathwayUnits,
  assertPathTagTotality,
  collectUntaggedLessons,
} from "./year10PathTags";
import type { CourseUnitSeed } from "./courseTypes";

// Proves ADR-Y10-001 gates G6 (tag totality) and G7 (three-filter lock) in isolation,
// independent of the not-yet-restructured base catalog.

function units(): CourseUnitSeed[] {
  return [
    {
      slug: "u1",
      title: "U1",
      description: "",
      syllabusArea: "",
      focus: "",
      lessons: [
        { slug: "a", title: "A", pathTag: "core" },
        { slug: "b", title: "B", pathTag: "path" },
        { slug: "c", title: "C", pathTag: "extending" },
        { slug: "d", title: "D", pathTag: "consolidating" },
      ],
    },
    {
      slug: "u2",
      title: "U2",
      description: "",
      syllabusArea: "",
      focus: "",
      lessons: [{ slug: "e", title: "E", pathTag: "extending" }],
    },
  ];
}

const slugs = (us: CourseUnitSeed[]) =>
  us.flatMap((u) => u.lessons.map((l) => l.slug)).sort();

// ── G7 — three-filter lock ────────────────────────────────────────────────────────────
test("G7: locked filter tag sets match the ADR exactly", () => {
  assert.deepEqual([...PATH_TAG_FILTERS.core].sort(), ["consolidating", "core"]);
  assert.deepEqual([...PATH_TAG_FILTERS.base].sort(), ["core", "path"]);
  assert.deepEqual(
    [...PATH_TAG_FILTERS.advanced].sort(),
    ["core", "extending", "path"]
  );
});

test("G7: Core keeps core+consolidating, drops path+extending", () => {
  assert.deepEqual(slugs(derivePathwayUnits(units(), "core")), ["a", "d"]);
});

test("G7: Base keeps core+path, drops extending+consolidating", () => {
  assert.deepEqual(slugs(derivePathwayUnits(units(), "base")), ["a", "b"]);
});

test("G7: Advanced keeps core+path+extending, drops consolidating", () => {
  assert.deepEqual(slugs(derivePathwayUnits(units(), "advanced")), [
    "a",
    "b",
    "c",
    "e",
  ]);
});

test("G7: a unit emptied by the filter is dropped (Core drops the extending-only u2)", () => {
  const core = derivePathwayUnits(units(), "core");
  assert.ok(!core.some((u) => u.slug === "u2"));
  // base/advanced keep u1; only advanced keeps u2 (it is extending-only)
  assert.ok(derivePathwayUnits(units(), "advanced").some((u) => u.slug === "u2"));
});

test("filterUnitsByPathTags excludes untagged lessons (never silently kept)", () => {
  const withUntagged: CourseUnitSeed[] = [
    {
      slug: "u",
      title: "U",
      description: "",
      syllabusArea: "",
      focus: "",
      lessons: [
        { slug: "tagged", title: "T", pathTag: "core" },
        { slug: "untagged", title: "X" },
      ],
    },
  ];
  assert.deepEqual(
    slugs(filterUnitsByPathTags(withUntagged, PATH_TAG_FILTERS.base)),
    ["tagged"]
  );
});

// ── G6 — tag totality ─────────────────────────────────────────────────────────────────
test("G6: fully-tagged units pass the totality assertion", () => {
  assert.doesNotThrow(() => assertPathTagTotality(units(), "test"));
});

test("G6: a missing pathTag is detected and throws", () => {
  const bad = units();
  delete bad[0].lessons[0].pathTag;
  assert.deepEqual(collectUntaggedLessons(bad), ["u1/a"]);
  assert.throws(() => assertPathTagTotality(bad, "test"), /G6 tag-totality/);
});
