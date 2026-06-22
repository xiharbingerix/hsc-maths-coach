// Year 10 path-tag derivation (ADR-Y10-001, Accepted).
//
// Single tagged base (`year-10-mathematics`) drives all three Year 10 pathways via the LOCKED
// tag filters below (gate G7 / stop-condition S4 — these are defined and committed before any
// unit is moved). Replaces the hardcoded `year10CoreTrimmedUnits` slug blacklists.
//
//   Core      (year-10-mathematics-core)     = core + consolidating
//   Base      (year-10-mathematics)          = core + path
//   Advanced  (year-10-mathematics-advanced) = core + path + extending
//
// Difficulty is pathway-independent (QUESTION_AUTHORING_STANDARD), so one authored section
// legitimately serves all three pathways; the filter only governs membership, never content.

import type { CourseUnitSeed, PathTag } from "./courseTypes";

export type Year10Pathway = "core" | "base" | "advanced";

// G7 — three-filter lock. The allowed tag set per pathway. Do not widen without an ADR update.
export const PATH_TAG_FILTERS: Record<Year10Pathway, ReadonlySet<PathTag>> = {
  core: new Set<PathTag>(["core", "consolidating"]),
  base: new Set<PathTag>(["core", "path"]),
  advanced: new Set<PathTag>(["core", "path", "extending"]),
};

// Keep only the lessons whose pathTag is in `allowed`. An untagged lesson is EXCLUDED (never
// silently kept) — `assertPathTagTotality` (G6) is the guard that prevents untagged data from
// ever being committed, so a missing tag surfaces loudly rather than leaking into a pathway.
export function filterUnitsByPathTags(
  units: CourseUnitSeed[],
  allowed: ReadonlySet<PathTag>
): CourseUnitSeed[] {
  return units
    .map((unit) => ({
      ...unit,
      lessons: unit.lessons.filter(
        (lesson) => lesson.pathTag !== undefined && allowed.has(lesson.pathTag)
      ),
    }))
    .filter((unit) => unit.lessons.length > 0);
}

// Derive a pathway's units from the shared tagged base using the locked filter.
export function derivePathwayUnits(
  baseUnits: CourseUnitSeed[],
  pathway: Year10Pathway
): CourseUnitSeed[] {
  return filterUnitsByPathTags(baseUnits, PATH_TAG_FILTERS[pathway]);
}

// Lessons (by `unit/lesson`) that are missing a pathTag — used by the G6 totality gate.
export function collectUntaggedLessons(units: CourseUnitSeed[]): string[] {
  const out: string[] = [];
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (lesson.pathTag === undefined) out.push(`${unit.slug}/${lesson.slug}`);
    }
  }
  return out;
}

// G6 — tag totality. Every section must carry exactly one (valid) pathTag. Throws otherwise so
// the build/test fails loudly. `context` names the course/wave for the error message.
export function assertPathTagTotality(
  units: CourseUnitSeed[],
  context: string
): void {
  const untagged = collectUntaggedLessons(units);
  if (untagged.length > 0) {
    throw new Error(
      `[${context}] G6 tag-totality violation: ${untagged.length} section(s) missing a pathTag: ${untagged.join(", ")}`
    );
  }
}

// ── Legacy URL redirects (Wave 0 restructure) ─────────────────────────────────────────
// Pre-restructure Year 10 unit slugs -> canonical new unit slug, or null when the old unit
// split across several chapters (redirect to the course overview). Bare unit URLs use this;
// lesson URLs are redirected by their preserved lesson slug via findNewCourseLessonUnitSlug.
const Y10_LEGACY_UNIT_TARGETS: Record<string, string | null> = {
  "algebraic-techniques": "quadratic-expressions-equations",
  "equations-simultaneous": null, // split: algebra-equations-linear-relationships + quadratic-expressions-equations
  "linear-relationships": "algebra-equations-linear-relationships",
  "non-linear-relationships": null, // split: parabolas-rates-variation + functions-polynomials-graphs + indices-exponentials-logarithms
  measurement: "measurement-and-surds",
  "geometry-proofs": "geometrical-figures-circle-geometry",
  "statistics-data": "single-variable-bivariate-statistics",
};

// Returns the canonical destination URL for a retired Year 10 unit slug on the given course,
// or null if `unitSlug` is not a retired slug (caller then proceeds to its normal handling).
export function year10LegacyUnitRedirect(
  courseSlug: string,
  unitSlug: string
): string | null {
  if (!(unitSlug in Y10_LEGACY_UNIT_TARGETS)) return null;
  const target = Y10_LEGACY_UNIT_TARGETS[unitSlug];
  return target ? `/course/${courseSlug}/${target}` : `/course/${courseSlug}`;
}
