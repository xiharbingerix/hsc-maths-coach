// Year 9 path-tag derivation & legacy redirects (ADR-Y9-001, Accepted).
//
// Thin Year-9 binding over the shared, year-agnostic `lib/pathTags.ts` module. Derivation for the
// three Year 9 pathways happens inline in `newCourseCatalog.ts` via the shared `derivePathwayUnits`
// (Core = core+consolidating, Base = core+path, Advanced = core+path+extending). This file owns the
// Year 9 legacy URL redirect map used by the three Year 9 unit-page route wrappers.

import { legacyUnitRedirect } from "./pathTags";

export { PATH_TAG_FILTERS, filterUnitsByPathTags, derivePathwayUnits, collectUntaggedLessons, assertPathTagTotality } from "./pathTags";

// ── Legacy URL redirects (Wave 0 restructure) ─────────────────────────────────────────
// Pre-restructure Year 9 unit slugs -> canonical new (Cambridge-aligned) unit slug. Where an old
// unit split across several new chapters, this points at the primary destination chapter. Lesson
// URLs are redirected by their preserved lesson slug via findNewCourseLessonUnitSlug; this map
// covers bare unit URLs. Covers base + core-only + advanced-only legacy unit slugs.
const Y9_LEGACY_UNIT_TARGETS: Record<string, string | null> = {
  // base + shared legacy units
  "geometrical-representations": "properties-geometrical-figures",
  "working-with-triangles": "pythagoras-trigonometry",
  "prisms-and-cylinders": "length-area-surface-area-volume",
  "index-laws": "indices-surds",
  "algebraic-techniques": "quadratic-expressions-algebraic-techniques",
  equations: "expressions-equations-inequalities",
  "financial-mathematics": "computation-financial-maths",
  "constant-rates-of-change": "linear-relationships",
  "making-predictions": "probability-data-analysis",
  "making-decisions": "probability-data-analysis",
  // core-only legacy unit
  "numbers-of-any-magnitude": "indices-surds",
  // advanced-only legacy units
  "equations-b": "quadratic-equations-parabolas",
  "variation-rates": "linear-relationships",
  "simultaneous-equations": "expressions-equations-inequalities",
  "probability-b": "probability-data-analysis",
  "linear-relationships-c": "linear-relationships",
};

// Returns the canonical destination URL for a retired Year 9 unit slug on the given course, or
// null if `unitSlug` is not a retired slug (caller then proceeds to its normal handling).
export function year9LegacyUnitRedirect(
  courseSlug: string,
  unitSlug: string
): string | null {
  return legacyUnitRedirect(courseSlug, unitSlug, Y9_LEGACY_UNIT_TARGETS);
}
