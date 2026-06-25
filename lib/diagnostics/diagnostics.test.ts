import assert from "node:assert/strict";
import test from "node:test";
import { courseCatalogue } from "../courseUnits";
import { getNewCourse } from "../newCourseCatalog";
import { year12AdvancedRouteUnits } from "../year12AdvancedRoutes";
import {
  diagnosticDataByCourseSlug,
  visibleDiagnosticCourseSlugs,
} from "./index";

function courseUnitSlugsFor(courseSlug: string): Set<string> | null {
  if (courseSlug === "year-12-advanced") {
    return new Set(year12AdvancedRouteUnits.map((unit) => unit.slug));
  }

  const course = getNewCourse(courseSlug);
  return course ? new Set(course.units.map((unit) => unit.slug)) : null;
}

function assessedUnitSlugs(question: { unitSlug: string; assessedUnitSlugs?: string[] }) {
  return Array.from(
    new Set([question.unitSlug, ...(question.assessedUnitSlugs ?? [])])
  );
}

test("visible diagnostics are backed by visible courses, not base pathways", () => {
  const visibleCourseSlugs = new Set(
    courseCatalogue.map((course) => course.courseSlug)
  );

  const visibleDiagnosticSlugSet = new Set<string>(visibleDiagnosticCourseSlugs);

  assert.equal(visibleDiagnosticSlugSet.has("year-9-mathematics"), false);
  assert.equal(visibleDiagnosticSlugSet.has("year-10-mathematics"), false);

  for (const slug of visibleDiagnosticCourseSlugs) {
    assert.ok(
      visibleCourseSlugs.has(slug),
      `${slug} diagnostic is visible but the course is not in the public catalogue`
    );
    assert.ok(
      diagnosticDataByCourseSlug[slug],
      `${slug} is visible but has no diagnostic data`
    );
  }
});

test("diagnostics assign mastery only to real course topics", () => {
  for (const [courseSlug, diagnostic] of Object.entries(diagnosticDataByCourseSlug)) {
    const courseUnitSlugs = courseUnitSlugsFor(courseSlug);
    assert.ok(courseUnitSlugs, `${courseSlug} diagnostic has no matching course`);

    const diagnosticUnitSlugs = new Set(diagnostic.units.map((unit) => unit.slug));
    const questionIds = new Set<string>();

    for (const unit of diagnostic.units) {
      assert.ok(
        courseUnitSlugs.has(unit.slug),
        `${courseSlug}/${unit.slug} diagnostic unit is not a course unit`
      );
      assert.ok(
        unit.startHref === `/course/${courseSlug}/${unit.slug}` ||
          unit.startHref.startsWith(`/course/${courseSlug}/${unit.slug}/`),
        `${courseSlug}/${unit.slug} startHref does not point at the matching course unit`
      );
    }

    for (const question of diagnostic.questions) {
      assert.equal(
        questionIds.has(question.id),
        false,
        `${courseSlug} has duplicate diagnostic question id ${question.id}`
      );
      questionIds.add(question.id);

      assert.ok(
        diagnosticUnitSlugs.has(question.unitSlug),
        `${courseSlug}/${question.id} maps to a unit missing from diagnostic.units`
      );
      assert.ok(
        courseUnitSlugs.has(question.unitSlug),
        `${courseSlug}/${question.id} would assign mastery to a non-course topic ${question.unitSlug}`
      );
      for (const unitSlug of question.assessedUnitSlugs ?? []) {
        assert.ok(
          diagnosticUnitSlugs.has(unitSlug),
          `${courseSlug}/${question.id} assessed unit ${unitSlug} is missing from diagnostic.units`
        );
        assert.ok(
          courseUnitSlugs.has(unitSlug),
          `${courseSlug}/${question.id} would assign secondary mastery to a non-course topic ${unitSlug}`
        );
      }
      assert.ok(
        question.choices.some((choice) => choice.label === question.correctAnswer),
        `${courseSlug}/${question.id} correctAnswer is not one of its choices`
      );
      if (question.difficulty !== undefined) {
        assert.ok(
          Number.isInteger(question.difficulty) &&
            question.difficulty >= 1 &&
            question.difficulty <= 5,
          `${courseSlug}/${question.id} has invalid diagnostic difficulty ${question.difficulty}`
        );
      }
    }

    for (const unitSlug of diagnosticUnitSlugs) {
      assert.ok(
        diagnostic.questions.some((question) =>
          assessedUnitSlugs(question).includes(unitSlug)
        ),
        `${courseSlug}/${unitSlug} has no diagnostic questions`
      );
    }
  }
});

test("calibrated diagnostic pilots are authored as D5 transfer", () => {
  for (const courseSlug of [
    "year-10-mathematics-advanced",
    "year-11-advanced",
    "year-11-extension",
    "year-11-standard",
    "year-12-advanced",
    "year-12-extension-1",
    "year-12-standard-1",
    "year-12-standard-2",
  ]) {
    const diagnostic = diagnosticDataByCourseSlug[courseSlug];

    assert.equal(diagnostic.questions.length, 10);

    for (const question of diagnostic.questions) {
      assert.equal(
        question.difficulty,
        5,
        `${question.id} should be explicitly authored as D5`
      );
      assert.ok(
        question.targetMisconception?.trim(),
        `${question.id} needs a target misconception`
      );
      assert.ok(
        assessedUnitSlugs(question).length >= 2,
        `${question.id} should assess multiple units`
      );
    }
  }
});
