# Year 8 Course Status

_Audit date: 11 June 2026 | Last updated: 11 June 2026 (sessions 1–2)_

---

## Executive Summary

Year 8 Mathematics has **11 units** in the course catalogue. **10 units are fully content-complete** with real lesson overrides and seedable questions. **1 unit is a shell** (catalogue entry only, 0 lessons). The diagnostic now routes correctly to all 8 referenced units; `geometry-properties` dead link was fixed in session 2 by repointing to `geometry-angles`. Three completed units (`algebra-foundations`, `number-financial-mathematics`, `geometry-angles`) still have no diagnostic entry.

| Metric | Value |
|---|---|
| Total catalogue units | 11 |
| Completed units | 10 |
| Shell/empty units | 1 |
| Total built lessons | 54 |
| Total seedable questions | 1026 |
| Build | PASS |
| TypeScript | PASS |
| Audit failures | 0 |
| Audit warnings (Year 8) | 352 of 581 total (was 435 of 664) |
| Duplicate lesson slugs | ⚠ 2 slugs shared across units (see below) |
| Seed dry-run warnings | 0 |

---

## Unit Inventory

| Unit slug | Title | Lessons | Override file | Status |
|---|---|---:|---|---|
| `number-operations` | Number Operations and Properties | 6 | `numberOperations.ts` | **Complete** ✅ |
| `algebra-foundations` | Algebra Foundations | 6 | `algebraFoundations.ts` | **Complete** |
| `number-financial-mathematics` | Number and Financial Mathematics | 6 | `numberFinancialMathematics.ts` | **Complete** |
| `algebra-equations` | Algebra and Equations | 6 | `algebraEquations.ts` | **Complete** ✅ |
| `linear-relationships` | Linear Relationships | 6 | `linearRelationships.ts` | **Complete** |
| `pythagoras-theorem` | Pythagoras' Theorem | 6 | `pythagorasTheorem.ts` | **Complete** |
| `geometry-angles` | Geometry and Angles | 6 | `geometryAngles.ts` | **Complete** |
| `geometry-properties` | Geometric Properties and Reasoning | 0 | — | **Shell** |
| `volume-and-surface-area` | Volume and Surface Area | 6 | `volumeSurfaceArea.ts` | **Complete** ✅ |
| `data-and-graphs` | Data Analysis and Graphs | 3 | `statisticsProbability.ts` | **Complete** |
| `probability-and-chance` | Probability and Chance | 3 | `statisticsProbability.ts` | **Complete** |

✅ = newly completed since last audit

---

## Completed Units

### number-operations (6 lessons) ✅ NEW

- directed-numbers
- fractions-and-decimals
- percentages-and-fractions
- order-of-operations
- powers-roots-and-squares
- estimation-and-reasonableness

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** Yes (3 diagnostic questions: y8-no1, y8-no2, y8-no3) — **now live**

### algebra-foundations (6 lessons)

- simplifying-algebraic-expressions
- collecting-like-terms
- substitution
- expanding-single-brackets
- solving-one-step-equations
- solving-two-step-equations

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** None — not referenced in `year-8-mathematics.ts`

### number-financial-mathematics (6 lessons)

- percentages-basics
- percentage-increase
- percentage-decrease
- profit-and-loss
- discounts-and-sales
- simple-interest-introduction

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** None — not referenced in `year-8-mathematics.ts`

### algebra-equations (6 lessons) ✅ NEW

- solving-one-step-equations
- solving-two-step-equations
- equations-with-brackets
- equations-with-pronumerals-on-both-sides
- forming-equations-from-word-problems
- checking-solutions-and-error-analysis

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** Yes (3 diagnostic questions: y8-ae1, y8-ae2, y8-ae3) — **now live**

### linear-relationships (6 lessons)

- number-patterns-and-rules
- coordinates-and-points
- tables-of-values
- graphing-linear-relationships
- gradient-as-rate-of-change
- interpreting-linear-graphs

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** Yes (2 diagnostic questions: y8-lr1, y8-lr2)

### pythagoras-theorem (6 lessons)

- right-angled-triangles-pythagoras
- finding-the-hypotenuse
- finding-a-shorter-side
- pythagoras-real-contexts
- pythagorean-triples
- distance-between-two-points

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** Yes (3 diagnostic questions: y8-py1, y8-py2, y8-py3)

### geometry-angles (6 lessons)

- angle-relationships
- parallel-lines-transversals
- angles-triangles-quadrilaterals
- properties-of-polygons
- congruent-triangles
- geometric-reasoning

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** Yes (2 questions: y8-gp1, y8-gp2) — **re-pointed from `geometry-properties` in session 2**

### volume-and-surface-area (6 lessons) ✅ NEW

- volume-of-prisms
- surface-area-of-prisms
- volume-of-cylinders
- surface-area-of-cylinders
- volume-of-composite-solids
- surface-area-of-composite-solids

**Seedable questions:** 114 (6 × 19)
**Diagnostic coverage:** Yes (2 diagnostic questions: y8-vs1, y8-vs2) — **now live**

### data-and-graphs (3 lessons)

- collecting-and-displaying-data
- mean-median-mode-range
- comparing-data-displays

**Seedable questions:** 57 (3 × 19)
**Diagnostic coverage:** Yes (3 diagnostic questions: y8-dg1, y8-dg2, y8-dg3)

### probability-and-chance (3 lessons)

- probability-language-and-scale
- simple-probability
- two-step-chance-experiments

**Seedable questions:** 57 (3 × 19)
**Diagnostic coverage:** Yes (2 diagnostic questions: y8-pc1, y8-pc2)

---

## Shell / Empty Units

Only one unit has zero lessons.

| Unit slug | Diagnostic coverage? |
|---|---|
| `geometry-properties` | Was 2 questions (y8-gp1, y8-gp2) — **dead link fixed in session 2** (repointed to `geometry-angles`) |

---

## Seedable Questions per Completed Unit

| Unit | Lessons | Questions |
|---|---:|---:|
| number-operations | 6 | 114 |
| algebra-foundations | 6 | 114 |
| number-financial-mathematics | 6 | 114 |
| algebra-equations | 6 | 114 |
| linear-relationships | 6 | 114 |
| pythagoras-theorem | 6 | 114 |
| geometry-angles | 6 | 114 |
| volume-and-surface-area | 6 | 114 |
| data-and-graphs | 3 | 57 |
| probability-and-chance | 3 | 57 |
| **Total** | **54** | **1026** |

Seed dry-run: `npx.cmd tsx scripts/seed-question-bank.ts --course year-8-mathematics --dry-run`
Result: 1026 questions prepared, 0 warnings.

---

## Diagnostic Alignment

The diagnostic (`lib/diagnostics/year-8-mathematics.ts`) references 8 unit slugs.

| Diagnostic unit slug | Exists in catalogue? | Has lessons? | Assessment |
|---|---|---|---|
| `number-operations` | Yes | Yes (6) | **Aligned ✓** (was dead link — now fixed) |
| `algebra-equations` | Yes | Yes (6) | **Aligned ✓** (was dead link — now fixed) |
| `linear-relationships` | Yes | Yes (6) | Aligned ✓ |
| `pythagoras-theorem` | Yes | Yes (6) | Aligned ✓ |
| `geometry-angles` | Yes | Yes (6) | **Aligned ✓** (was `geometry-properties` dead link — fixed session 2) |
| `volume-and-surface-area` | Yes | Yes (6) | **Aligned ✓** (was dead link — now fixed) |
| `data-and-graphs` | Yes | Yes (3) | Aligned ✓ |
| `probability-and-chance` | Yes | Yes (3) | Aligned ✓ |

**Missing from diagnostic (but content-complete):**
- `algebra-foundations` — 6 lessons, 114 questions, no diagnostic entry
- `number-financial-mathematics` — 6 lessons, 114 questions, no diagnostic entry

**Impact:** 0 diagnostic dead-ends (was 1). 2 units with 228 seedable questions still have no diagnostic pathway.

---

## Duplicate Lesson Slug Warning

The lesson slugs `solving-one-step-equations` and `solving-two-step-equations` appear in **both** the `algebra-foundations` unit and the `algebra-equations` unit in the catalogue. The content and question IDs are different in each unit (the override functions are keyed on `unit.slug` so they resolve correctly), but the shared slugs create routing ambiguity. No failures result — the seed dry-run produces 0 warnings — but this is a maintenance risk.

**Recommendation:** Rename the `algebra-equations` lessons to avoid the overlap:
- `solving-one-step-equations` → `one-step-equations-review`
- `solving-two-step-equations` → `two-step-equations-review`

Or remove those two lessons from `algebra-equations` (whose intent is equations with brackets and variables on both sides) and replace them with more advanced content.

---

## buildLesson Registration Check

All 9 override functions are registered in `lib/lessons/year8/index.ts`:

```
year8AlgebraFoundationsLessonOverride
year8NumberFinancialMathematicsLessonOverride
year8PythagorasTheoremLessonOverride
year8GeometryAnglesLessonOverride
year8LinearRelationshipsLessonOverride
year8StatisticsProbabilityLessonOverride  ← handles data-and-graphs and probability-and-chance
year8AlgebraEquationsLessonOverride       ← new
year8NumberOperationsLessonOverride       ← new
year8VolumeSurfaceAreaLessonOverride      ← new
```

Every lesson slug in the catalogue maps to a key in its override file's `lessons` record. No missing registrations.

---

## Audit Warnings by Category

| Rule | Year 8 count | Primary cause |
|---|---:|---|
| `typed-answer-no-variants` | ~137 | Algebraic/numerical answers with no safe alternate form (down from ~220) |
| `no-visual-payload` | ~130 | Graphing/diagram questions without rendered payloads |
| `prompt-reveals-answer` | ~40 | Questions in number-operations and linear-relationships |
| `latex-working-steps` | ~15 | Evaluation chains in `latex` field (move to explanation) |

**Per-unit warning counts (Year 8 only) — session 1 reductions applied:**

| Unit | Before | After | Primary remaining cause |
|---|---:|---:|---|
| linear-relationships | 76 | 76 | `no-visual-payload` (graphing without CartesianGraph — unfixable without diagrams) |
| number-operations | 74 | 72 | `typed-answer-no-variants` (pure-number fraction answers with no safe decimal form) |
| algebra-foundations | 57 | 57 | `typed-answer-no-variants` (not addressed in session 1) |
| data-and-graphs | 48 | 48 | `no-visual-payload` (data-table references — unfixable without payloads) |
| volume-and-surface-area | 68 | 6 | `no-visual-payload` only (1 per lesson — structurally unfixable) |
| geometry-angles | 40 | 25 | `typed-answer-no-variants` (pure-number angle values) and `no-visual-payload` |
| probability-and-chance | 25 | 25 | `no-visual-payload` |
| algebra-equations | 26 | 26 | `typed-answer-no-variants` (substitution results with no safe alternate form) |
| pythagoras-theorem | 12 | 12 | `no-visual-payload` and `typed-answer-no-variants` |
| number-financial-mathematics | 9 | 7 | `typed-answer-no-variants` |
| **Year 8 total** | **435** | **352** | |

None of these warnings are failures. They do not block seeding or student access.

---

## Remaining Shell Units

| Unit | Lessons needed | Connects to |
|---|---|---|
| `geometry-properties` | ~4–5 (congruence tests, similarity, scale factors, short proofs) | Year 9 geometric representations; Year 10 geometry proofs |

---

## Next Recommendations (Highest-Value Units)

### 1. `geometry-properties` — Geometric Properties and Reasoning

**Why now:**
- Only remaining shell unit — completing it eliminates the last diagnostic dead-end
- Appears in the diagnostic (2 questions: congruence test SSS, similarity/scale factor)
- Direct prerequisite for Year 9 geometric representations and Year 10 geometry proofs
- Content scope is well-defined: congruence tests (SSS, SAS, AAS, RHS), similarity, scale factors, and simple geometric proofs

**Suggested lessons (5):** introduction-to-congruence, congruence-tests, similarity-and-scale-factors, applications-of-similarity, geometric-proofs-introduction

### 2. Fix duplicate lesson slugs in `algebra-equations` / `algebra-foundations`

**Why now:**
- `solving-one-step-equations` and `solving-two-step-equations` exist in both units
- Ambiguous routing risk; the seed output shows both resolve to 19 questions each, but a student navigating by URL slug could land in the wrong unit
- Simple rename in both the catalogue and `algebraEquations.ts` — low risk, high maintenance value

---

## Validation Results

| Check | Result |
|---|---|
| `npx.cmd tsc --noEmit` | PASS — 0 errors |
| `npm.cmd run build` | PASS — all Year 8 routes compiled |
| `npm.cmd run audit:lessons` | PASS — 0 failures, 581 warnings (352 Year 8; was 664 / 435) |
| `seed-question-bank.ts --dry-run` | PASS — 1026 questions, 0 warnings |
| `git diff --check` | PASS — CRLF normalisation notes only (Windows line endings, non-blocking) |
| `npm.cmd run test:answer-marking` | PASS — 61/61 |

---

## Risks

| Risk | Severity | Notes |
|---|---|---|
| ~~Diagnostic routes to `geometry-properties` (empty)~~ | ~~High~~ | **Fixed session 2** — repointed to `geometry-angles`. 0 dead-ends remain. |
| Duplicate lesson slugs across `algebra-foundations` and `algebra-equations` | **Medium** | Two lesson slugs shared between units. No seeding failures but routing ambiguity exists. Rename one set. |
| 2 completed units absent from diagnostic | **Medium** | `algebra-foundations`, `number-financial-mathematics` have 228 questions with no diagnostic pathway. |
| 76 `no-visual-payload` warnings in linear-relationships | **Medium** | Questions referencing graphs/plots without rendered CartesianGraph payloads are pedagogically incomplete. |
| Worksheet explanation LaTeX rendering | ~~Medium~~ | **Fixed session 2** — `WorksheetClient.tsx` now passes explanations through `MathText`. |

---

## QA Notes (Session 2 — 11 June 2026)

Ten checks were run against the Year 8 student learning loop.

### Fixed

**1. Dead link in diagnostic results** (`lib/diagnostics/year-8-mathematics.ts`)
- `geometry-properties` entry had `startHref: "/course/year-8-mathematics/geometry-properties"` — that unit has 0 lessons, so the page calls `notFound()` and returns a 404.
- Fixed by replacing the entry with `geometry-angles` (6 real lessons) and retagging diagnostic questions y8-gp1 and y8-gp2 to `unitSlug: "geometry-angles"`.

**2. Worksheet explanation plain-text rendering** (`app/worksheet/[token]/WorksheetClient.tsx`)
- `result.explanation` was rendered as a bare React text node (`{result.explanation}`), so any `$...$` LaTeX in explanations would display as raw symbols rather than typeset maths.
- Fixed by replacing with `<MathText text={result.explanation} />` (import was already present).

### Unverified (requires live database)

The following checks could not be completed without a Supabase connection:

- **Check 6 — Answer marking on a live worksheet**: `markTypedAnswer` unit-variant logic confirmed in code; end-to-end marking requires a seeded worksheet row.
- **Check 9 — Flag submission flow**: `/api/worksheet/[token]/flag` code looks correct; actual insertion into `question_flags` table and admin review page display require a live DB.
- **Check 10 — Admin flag review page**: Query and REASON_LABELS map look correct in code; needs a real flag row to verify rendering.

### No issues found

- Course index page (`/course/year-8-mathematics`) renders unit cards correctly.
- All unit lesson-list pages resolve (0 lessons → 404 for `geometry-properties` shell, all others have 6 lessons).
- Lesson page route `[unitSlug]/[lessonSlug]` resolves correctly for sampled lessons.
- MathText component handles all LaTeX delimiters used in Year 8 content.
- `computeUnitResults` diagnostic aggregation logic is correct.
- `progress-ring` and `start-studying` links in diagnostic results use `startHref` from the units array, now all valid.

---

## Audit Sources

| Source | Purpose |
|---|---|
| `lib/newCourseCatalog.ts` | Unit and lesson catalogue; buildLesson registration |
| `lib/lessons/year8/` | Override files and lesson maps |
| `lib/diagnostics/year-8-mathematics.ts` | Diagnostic unit slugs and question alignment |
| `scripts/seed-question-bank.ts` | Seedable question counts |
| `scripts/audit-lessons.ts` | Warning categories and rule definitions |
