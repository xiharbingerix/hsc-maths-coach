import assert from "node:assert/strict";
import test from "node:test";

import { newCoursePathways } from "../newCourseCatalog";
import {
  buildLessonPriorAttainment,
  buildYear9SyllabusScope,
  createYear9PlannerSyllabusPayload,
  YEAR9_UNIT_FOCUS_AREA_IDS,
  year9NesaSyllabus,
} from "./year9Nesa";

test("the imported snapshot identifies official NESA Stage 5 source data", () => {
  assert.equal(
    year9NesaSyllabus.authority,
    "NSW Education Standards Authority (NESA)",
  );
  assert.equal(year9NesaSyllabus.stage, "Stage 5");
  assert.equal(year9NesaSyllabus.structure, "Core–Paths");
  assert.match(year9NesaSyllabus.sourceUrl, /^https:\/\/curriculum\.nsw\.edu\.au\//);
  assert.equal(year9NesaSyllabus.workingMathematically.code, "MAO-WM-01");
  assert.equal(year9NesaSyllabus.focusAreas.length, 41);
  assert.equal(
    year9NesaSyllabus.focusAreas.reduce(
      (total, focus) =>
        total + focus.groups.reduce((sum, group) => sum + group.contentPoints.length, 0),
      0,
    ),
    401,
  );
});

test("every current Year 9 unit maps only to imported NESA focus areas", () => {
  const baseCourse = newCoursePathways.find(
    (course) => course.slug === "year-9-mathematics",
  );
  assert.ok(baseCourse);

  assert.deepEqual(
    new Set(Object.keys(YEAR9_UNIT_FOCUS_AREA_IDS)),
    new Set(baseCourse.units.map((unit) => unit.slug)),
  );

  const importedIds = new Set(year9NesaSyllabus.focusAreas.map((focus) => focus.id));
  for (const focusId of Object.values(YEAR9_UNIT_FOCUS_AREA_IDS).flat()) {
    assert.ok(importedIds.has(focusId), `Missing imported focus area ${focusId}`);
  }
});

test("a lesson scope can select one exact content point from part of an outcome", () => {
  const payload = createYear9PlannerSyllabusPayload();
  const unitSlug = "computation-financial-maths";
  const allowedFocusIds = new Set(payload.unitFocusAreaIds[unitSlug]);
  const focus = payload.focusAreas.find((candidate) => allowedFocusIds.has(candidate.id));
  const point = focus?.groups[0]?.contentPoints[0];
  assert.ok(focus && point);

  const scope = buildYear9SyllabusScope(
    "year-9-mathematics",
    unitSlug,
    [point.code],
  );
  assert.ok(scope);
  assert.deepEqual(
    scope.outcomes.flatMap((outcome) =>
      outcome.focusAreas.flatMap((area) =>
        area.contentGroups.flatMap((group) =>
          group.contentPoints.map((contentPoint) => contentPoint.code),
        ),
      ),
    ),
    [point.code],
  );
  assert.equal(scope.outcomes[0].code, focus.outcome.code);
  assert.equal(scope.outcomes[0].description, focus.outcome.description);
});

test("scope construction rejects codes outside the selected Year 9 unit", () => {
  const payload = createYear9PlannerSyllabusPayload();
  const unitSlug = "computation-financial-maths";
  const allowedFocusIds = new Set(payload.unitFocusAreaIds[unitSlug]);
  const outsidePoint = payload.focusAreas
    .find((focus) => !allowedFocusIds.has(focus.id))
    ?.groups[0]?.contentPoints[0];
  assert.ok(outsidePoint);

  assert.equal(
    buildYear9SyllabusScope("year-9-mathematics", unitSlug, [outsidePoint.code]),
    undefined,
  );
  assert.equal(
    buildYear9SyllabusScope("year-10-mathematics", unitSlug, [outsidePoint.code]),
    undefined,
  );
});

test("prior attainment is limited to the selected lesson scope", () => {
  const payload = createYear9PlannerSyllabusPayload();
  const unitSlug = "computation-financial-maths";
  const allowedFocusIds = new Set(payload.unitFocusAreaIds[unitSlug]);
  const focus = payload.focusAreas.find((candidate) =>
    allowedFocusIds.has(candidate.id),
  );
  const points = focus?.groups.flatMap((group) => group.contentPoints).slice(0, 2);
  assert.ok(focus && points?.length === 2);

  const scope = buildYear9SyllabusScope(
    "year-9-mathematics",
    unitSlug,
    points.map((point) => point.code),
  );
  assert.ok(scope);

  const partial = buildLessonPriorAttainment(scope, [points[0].code]);
  assert.ok(partial);
  assert.deepEqual(partial.contentPointCodes, [points[0].code]);
  assert.equal(partial.outcomes[0].fullyMetWithinLessonScope, false);

  const fullyMet = buildLessonPriorAttainment(
    scope,
    points.map((point) => point.code),
  );
  assert.ok(fullyMet);
  assert.equal(fullyMet.outcomes[0].fullyMetWithinLessonScope, true);
  assert.equal(
    buildLessonPriorAttainment(scope, ["NOT-IN-LESSON-SCOPE"]),
    undefined,
  );
});
