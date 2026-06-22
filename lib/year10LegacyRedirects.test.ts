import { test } from "node:test";
import assert from "node:assert/strict";
import { year10LegacyUnitRedirect } from "./year10PathTags";
import { getNewCourse, findNewCourseLessonUnitSlug } from "./newCourseCatalog";

// Release-safety: Year 10 Wave 0 legacy URL redirects (unit landings + lesson URLs).

const COURSES = [
  "year-10-mathematics",
  "year-10-mathematics-advanced",
  "year-10-mathematics-core",
];
const LEGACY_UNITS = [
  "algebraic-techniques", "equations-simultaneous", "linear-relationships",
  "non-linear-relationships", "measurement", "geometry-proofs", "statistics-data",
];

test("every legacy unit slug redirects on every Year 10 course", () => {
  for (const c of COURSES) {
    for (const u of LEGACY_UNITS) {
      assert.ok(year10LegacyUnitRedirect(c, u), `${c}/${u} must redirect`);
    }
  }
});

test("unchanged unit slugs do NOT redirect", () => {
  for (const c of COURSES) {
    for (const u of ["trigonometry", "probability", "financial-mathematics", "measurement-and-surds"]) {
      assert.equal(year10LegacyUnitRedirect(c, u), null, `${c}/${u} must not redirect`);
    }
  }
});

test("no redirect loop: a unit-redirect target is never itself a legacy slug", () => {
  for (const c of COURSES) {
    for (const u of LEGACY_UNITS) {
      const dest = year10LegacyUnitRedirect(c, u)!;
      const tail = dest.split("/").pop()!;
      // destination is either the course overview (tail = course slug) or a live unit slug
      const isOverview = dest === `/course/${c}`;
      if (!isOverview) {
        assert.equal(year10LegacyUnitRedirect(c, tail), null, `${dest} target ${tail} must not re-redirect`);
      }
    }
  }
});

test("1:1 unit redirect targets resolve to a live unit on each course (where present)", () => {
  const oneToOne: [string, string][] = [
    ["algebraic-techniques", "quadratic-expressions-equations"],
    ["linear-relationships", "algebra-equations-linear-relationships"],
    ["measurement", "measurement-and-surds"],
    ["geometry-proofs", "geometrical-figures-circle-geometry"],
    ["statistics-data", "single-variable-bivariate-statistics"],
  ];
  for (const c of COURSES) {
    const liveUnits = new Set(getNewCourse(c)!.units.map((x) => x.slug));
    for (const [, target] of oneToOne) {
      // these targets contain Core lessons, so they exist on all three pathways
      assert.ok(liveUnits.has(target), `${target} should be a live unit on ${c}`);
    }
  }
});

test("lesson-level redirects: moved lesson slugs resolve to their new unit (base)", () => {
  const moved: [string, string][] = [
    ["expanding-binomial-products", "quadratic-expressions-equations"],
    ["solving-linear-equations", "algebra-equations-linear-relationships"],
    ["equation-of-a-line", "algebra-equations-linear-relationships"],
    ["circle-graphs", "functions-polynomials-graphs"],
    ["exponential-functions", "indices-exponentials-logarithms"],
    ["surface-area-prisms", "measurement-and-surds"],
    ["box-whisker-plots", "single-variable-bivariate-statistics"],
  ];
  for (const [lessonSlug, expectedUnit] of moved) {
    assert.equal(
      findNewCourseLessonUnitSlug("year-10-mathematics", lessonSlug),
      expectedUnit,
      `${lessonSlug} should resolve to ${expectedUnit}`
    );
  }
});

test("preserved-slug lessons resolve to their unchanged unit", () => {
  assert.equal(findNewCourseLessonUnitSlug("year-10-mathematics", "tree-diagrams"), "probability");
  assert.equal(findNewCourseLessonUnitSlug("year-10-mathematics", "simple-interest"), "financial-mathematics");
  assert.equal(findNewCourseLessonUnitSlug("year-10-mathematics", "trig-ratios-sin-cos-tan"), "trigonometry");
});
