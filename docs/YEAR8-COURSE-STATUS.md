# Year 8 Course Status

_Audit date: 11 June 2026_

---

## Executive Summary

Year 8 Mathematics has **11 units** in the course catalogue. **10 units are fully content-complete** with real lesson overrides and seedable questions. **1 unit is a shell** (catalogue entry only, 0 lessons). The diagnostic now routes correctly to 7 of 8 referenced units; only `geometry-properties` remains a dead end. Three completed units (`algebra-foundations`, `number-financial-mathematics`, `geometry-angles`) still have no diagnostic entry.

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
| Audit warnings (Year 8) | 435 of 664 total |
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
**Diagnostic coverage:** None — not referenced in `year-8-mathematics.ts`

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
| `geometry-properties` | Yes (2 questions: y8-gp1, y8-gp2) — **dead link** |

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
| `geometry-properties` | Yes | No (shell) | **Bad link** — routes to empty unit |
| `volume-and-surface-area` | Yes | Yes (6) | **Aligned ✓** (was dead link — now fixed) |
| `data-and-graphs` | Yes | Yes (3) | Aligned ✓ |
| `probability-and-chance` | Yes | Yes (3) | Aligned ✓ |

**Missing from diagnostic (but content-complete):**
- `algebra-foundations` — 6 lessons, 114 questions, no diagnostic entry
- `number-financial-mathematics` — 6 lessons, 114 questions, no diagnostic entry
- `geometry-angles` — 6 lessons, 114 questions, no diagnostic entry

**Impact:** 1 diagnostic dead-end remains (down from 4). 3 units with 342 seedable questions still have no diagnostic pathway.

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
| `typed-answer-no-variants` | ~220 | Algebraic/numerical answers with no alternate form |
| `no-visual-payload` | ~130 | Graphing/diagram questions without rendered payloads |
| `prompt-reveals-answer` | ~40 | Questions in number-operations and linear-relationships |
| `latex-working-steps` | ~15 | Evaluation chains in `latex` field (move to explanation) |

**Per-unit warning counts (Year 8 only):**

| Unit | Warnings | Primary cause |
|---|---:|---|
| linear-relationships | 76 | `no-visual-payload` (graphing questions without CartesianGraph payloads) |
| number-operations | 74 | `typed-answer-no-variants` (fraction/decimal answers) |
| algebra-foundations | 57 | `typed-answer-no-variants` |
| data-and-graphs | 48 | `no-visual-payload` (data-table references without table payloads) |
| volume-and-surface-area | 68 | `typed-answer-no-variants` (numerical geometry answers) |
| geometry-angles | 40 | `typed-answer-no-variants` and `no-visual-payload` |
| probability-and-chance | 25 | `no-visual-payload` |
| algebra-equations | 26 | `typed-answer-no-variants` |
| pythagoras-theorem | 12 | `no-visual-payload` and `typed-answer-no-variants` |
| number-financial-mathematics | 9 | `typed-answer-no-variants` |
| **Year 8 total** | **435** | |

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
| `npm.cmd run audit:lessons` | PASS — 0 failures, 664 warnings (435 Year 8) |
| `seed-question-bank.ts --dry-run` | PASS — 1026 questions, 0 warnings |
| `git diff --check` | PASS — no whitespace errors |

---

## Risks

| Risk | Severity | Notes |
|---|---|---|
| Diagnostic routes to `geometry-properties` (empty) | **High** | Only 1 dead-end now (was 4). Students following y8-gp1 or y8-gp2 links land on an empty page. |
| Duplicate lesson slugs across `algebra-foundations` and `algebra-equations` | **Medium** | Two lesson slugs shared between units. No seeding failures but routing ambiguity exists. Rename one set. |
| 3 completed units absent from diagnostic | **Medium** | `algebra-foundations`, `number-financial-mathematics`, `geometry-angles` have 342 questions with no diagnostic pathway. |
| 76 `no-visual-payload` warnings in linear-relationships | **Medium** | Questions referencing graphs/plots without rendered CartesianGraph payloads are pedagogically incomplete. |

---

## Audit Sources

| Source | Purpose |
|---|---|
| `lib/newCourseCatalog.ts` | Unit and lesson catalogue; buildLesson registration |
| `lib/lessons/year8/` | Override files and lesson maps |
| `lib/diagnostics/year-8-mathematics.ts` | Diagnostic unit slugs and question alignment |
| `scripts/seed-question-bank.ts` | Seedable question counts |
| `scripts/audit-lessons.ts` | Warning categories and rule definitions |
