import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LEGACY_UNIT_REDIRECTS,
  findNewCourseLessonUnitSlug,
  getNewCourse,
  getNewCourseUnit,
} from "./newCourseCatalog";

// Guards the Year 12 Standard 1 restructure routing-continuity layer: the 5 retired unit
// slugs and the lessons that moved out of them must resolve to canonical destinations so
// stale URLs permanent-redirect instead of 404-ing. See NewCoursePages routing.

const COURSE = "year-12-standard-1";

// Legacy unit slug -> lessons that lived under it pre-restructure (slugs preserved on move).
const LEGACY_UNIT_LESSONS: Record<string, string[]> = {
  "algebraic-relationships": [
    "linear-relationships-modelling",
    "quadratic-models",
    "exponential-inverse-variation",
    "simultaneous-equations-context",
    "algebraic-relationships-exam-practice",
  ],
  "trigonometry-ratios-rates": [
    "ratios-rates-unit-conversions",
    "right-angle-trig-applications",
    "bearings-and-compass",
    "rates-practical-problems",
    "trig-rates-exam-practice",
  ],
  "investments-loans-annuities": [
    "investment-compound-interest",
    "depreciation-loans",
    "credit-cards-and-loans",
    "annuities-regular-payments",
  ],
  "statistics-and-data": [
    "data-displays-summary-statistics",
    "probability-and-chance",
    "bivariate-data-scatter-plots",
    "line-of-best-fit-predictions",
    "relative-frequency-expected-value",
    "statistics-exam-practice",
  ],
  "measurement-geometry": [
    "right-angle-trigonometry",
    "measurement-area-volume",
    "scale-drawings-and-plans",
  ],
};

test("every legacy Std1 unit slug is now retired (would otherwise 404)", () => {
  for (const legacyUnit of Object.keys(LEGACY_UNIT_LESSONS)) {
    assert.equal(
      getNewCourseUnit(COURSE, legacyUnit),
      undefined,
      `${legacyUnit} should no longer exist as a unit`
    );
  }
});

test("every legacy Std1 unit has a landing redirect to a live destination", () => {
  for (const legacyUnit of Object.keys(LEGACY_UNIT_LESSONS)) {
    const target = LEGACY_UNIT_REDIRECTS[`${COURSE}/${legacyUnit}`];
    assert.ok(target, `${legacyUnit} must have a landing redirect`);
    // Destination is either the course overview or a live unit page.
    const overview = `/course/${COURSE}`;
    if (target !== overview) {
      const unitSlug = target.replace(`${overview}/`, "");
      assert.ok(
        getNewCourseUnit(COURSE, unitSlug),
        `redirect target unit ${unitSlug} must exist`
      );
    }
  }
});

test("every lesson that moved out of a legacy unit resolves to its new unit", () => {
  for (const [legacyUnit, lessons] of Object.entries(LEGACY_UNIT_LESSONS)) {
    for (const lessonSlug of lessons) {
      const canonicalUnit = findNewCourseLessonUnitSlug(COURSE, lessonSlug);
      assert.ok(
        canonicalUnit,
        `${lessonSlug} must still exist somewhere in the course`
      );
      assert.notEqual(
        canonicalUnit,
        legacyUnit,
        `${lessonSlug} should have moved off the retired unit ${legacyUnit}`
      );
    }
  }
});

test("findNewCourseLessonUnitSlug returns null for an unknown lesson slug", () => {
  assert.equal(
    findNewCourseLessonUnitSlug(COURSE, "definitely-not-a-real-lesson"),
    null
  );
});

test("a current lesson slug resolves to its actual unit", () => {
  const unit = findNewCourseLessonUnitSlug(COURSE, "networks-shortest-path");
  assert.equal(unit, "networks-and-paths");
  // sanity: that unit really holds it
  const live = getNewCourse(COURSE)?.units.find((u) => u.slug === unit);
  assert.ok(live?.lessons.some((l) => l.slug === "networks-shortest-path"));
});
