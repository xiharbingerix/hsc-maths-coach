// Year 10 path-tag derivation (ADR-Y10-001, Accepted).
//
// Thin Year-10 binding over the shared, year-agnostic `lib/pathTags.ts` module (generalised in
// Year 9 Wave 0, ADR-Y9-001). The public API here is UNCHANGED — existing importers
// (newCourseCatalog, the three Year 10 unit pages, the tests) see the same names and behaviour.
//
//   Core      (year-10-mathematics-core)     = core + consolidating
//   Base      (year-10-mathematics)          = core + path
//   Advanced  (year-10-mathematics-advanced) = core + path + extending

import { type Pathway, legacyUnitRedirect } from "./pathTags";

export {
  PATH_TAG_FILTERS,
  filterUnitsByPathTags,
  derivePathwayUnits,
  collectUntaggedLessons,
  assertPathTagTotality,
} from "./pathTags";

// Year 10 pathway name (kept as a Year-10-specific alias of the shared Pathway type).
export type Year10Pathway = Pathway;

// ── Legacy URL redirects (Wave 0 restructure) ─────────────────────────────────────────
// Pre-restructure Year 10 unit slugs -> canonical new unit slug, or null when the old unit
// split across several chapters (redirect to the course overview).
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
  return legacyUnitRedirect(courseSlug, unitSlug, Y10_LEGACY_UNIT_TARGETS);
}
