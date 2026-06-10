# Year 8 Course Status

_Audit date: 10 June 2026_

---

## Executive Summary

Year 8 Mathematics has **11 units** in the course catalogue. **7 units are fully content-complete** with real lesson overrides and seedable questions. **4 units are shells** (catalogue entry only, 0 lessons). The diagnostic has significant misalignment: it routes to 4 shell units and misses 3 completed units entirely.

| Metric | Value |
|---|---|
| Total catalogue units | 11 |
| Completed units | 7 |
| Shell/empty units | 4 |
| Total built lessons | 36 |
| Total seedable questions | 684 |
| Build | PASS |
| TypeScript | PASS |
| Audit failures | 0 |
| Audit warnings (Year 8) | 238 of 409 total |
| Duplicate lesson slugs | None |
| Seed dry-run warnings | 0 |

---

## Unit Inventory

| Unit slug | Title | Lessons | Override file | Status |
|---|---|---:|---|---|
| `number-operations` | Number Operations and Properties | 0 | — | **Shell** |
| `algebra-foundations` | Algebra Foundations | 6 | `algebraFoundations.ts` | **Complete** |
| `number-financial-mathematics` | Number and Financial Mathematics | 6 | `numberFinancialMathematics.ts` | **Complete** |
| `algebra-equations` | Algebra and Equations | 0 | — | **Shell** |
| `linear-relationships` | Linear Relationships | 6 | `linearRelationships.ts` | **Complete** |
| `pythagoras-theorem` | Pythagoras' Theorem | 6 | `pythagorasTheorem.ts` | **Complete** |
| `geometry-angles` | Geometry and Angles | 6 | `geometryAngles.ts` | **Complete** |
| `geometry-properties` | Geometric Properties and Reasoning | 0 | — | **Shell** |
| `volume-and-surface-area` | Volume and Surface Area | 0 | — | **Shell** |
| `data-and-graphs` | Data Analysis and Graphs | 3 | `statisticsProbability.ts` | **Complete** |
| `probability-and-chance` | Probability and Chance | 3 | `statisticsProbability.ts` | **Complete** |

---

## Completed Units

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

These units exist in the catalogue with a slug, title, and description, but have zero lessons and no lesson override. A student following a diagnostic link to one of these lands on an empty unit page.

| Unit slug | Diagnostic coverage? |
|---|---|
| `number-operations` | Yes (3 questions: y8-no1, y8-no2, y8-no3) |
| `algebra-equations` | Yes (3 questions: y8-ae1, y8-ae2, y8-ae3) |
| `geometry-properties` | Yes (2 questions: y8-gp1, y8-gp2) |
| `volume-and-surface-area` | Yes (2 questions: y8-vs1, y8-vs2) |

---

## Seedable Questions per Completed Unit

| Unit | Lessons | Questions |
|---|---:|---:|
| algebra-foundations | 6 | 114 |
| number-financial-mathematics | 6 | 114 |
| linear-relationships | 6 | 114 |
| pythagoras-theorem | 6 | 114 |
| geometry-angles | 6 | 114 |
| data-and-graphs | 3 | 57 |
| probability-and-chance | 3 | 57 |
| **Total** | **36** | **684** |

Seed dry-run: `npx.cmd tsx scripts/seed-question-bank.ts --course year-8-mathematics --dry-run`
Result: 684 questions prepared, 0 warnings.

---

## Diagnostic Alignment

The diagnostic (`lib/diagnostics/year-8-mathematics.ts`) references 8 unit slugs.

| Diagnostic unit slug | Exists in catalogue? | Has lessons? | Assessment |
|---|---|---|---|
| `number-operations` | Yes | No (shell) | **Bad link** — routes to empty unit |
| `algebra-equations` | Yes | No (shell) | **Bad link** — routes to empty unit |
| `linear-relationships` | Yes | Yes (6) | Aligned ✓ |
| `pythagoras-theorem` | Yes | Yes (6) | Aligned ✓ |
| `geometry-properties` | Yes | No (shell) | **Bad link** — routes to empty unit |
| `volume-and-surface-area` | Yes | No (shell) | **Bad link** — routes to empty unit |
| `data-and-graphs` | Yes | Yes (3) | Aligned ✓ |
| `probability-and-chance` | Yes | Yes (3) | Aligned ✓ |

**Missing from diagnostic (but content-complete):**
- `algebra-foundations` — 6 lessons, 114 questions, no diagnostic entry
- `number-financial-mathematics` — 6 lessons, 114 questions, no diagnostic entry
- `geometry-angles` — 6 lessons, 114 questions, no diagnostic entry

**Impact:** The diagnostic directs students to 4 empty unit pages (dead ends) and entirely skips 3 units with 342 seedable questions. Any student completing the diagnostic has no path from it into algebra-foundations, number-financial-mathematics, or geometry-angles.

---

## Duplicate Lesson Slug Check

All 36 built lesson slugs are unique across all units. No duplicates found.

---

## buildLesson Registration Check

All 6 override functions are registered in `lib/newCourseCatalog.ts` → `buildLesson`:

```
year8AlgebraFoundationsLessonOverride
year8NumberFinancialMathematicsLessonOverride
year8PythagorasTheoremLessonOverride
year8GeometryAnglesLessonOverride
year8LinearRelationshipsLessonOverride
year8StatisticsProbabilityLessonOverride  ← handles both data-and-graphs and probability-and-chance
```

Every lesson slug in the catalogue maps to a key in its override file's `lessons` record. No missing registrations.

---

## Audit Warnings by Category

The audit script checks three warning rules relevant to Year 8:

| Rule | Meaning | Year 8 affected lessons |
|---|---|---|
| `typed-answer-no-variants` | Typed answer has no `acceptedAnswers` beyond the canonical value | Majority of warnings in algebra-foundations (57) and linear-relationships |
| `no-visual-payload` | Prompt references a graph/diagram/table but the question has no diagram payload | linear-relationships (73 total), data-and-graphs (43), probability-and-chance (25) |
| `generic-feedback` | Hint or explanation only restates the answer | Scattered across all units |

**Per-unit warning counts (Year 8 only):**

| Unit | Warnings | Primary cause |
|---|---:|---|
| linear-relationships | 73 | `no-visual-payload` (graphing questions without CartesianGraph payloads) |
| algebra-foundations | 57 | `typed-answer-no-variants` (most algebraic answers have no alternate forms) |
| data-and-graphs | 43 | `no-visual-payload` (data-table references without table payloads) |
| geometry-angles | 25 | `typed-answer-no-variants` and `no-visual-payload` |
| probability-and-chance | 25 | `no-visual-payload` (tree diagram and sample space references) |
| pythagoras-theorem | 6 | `no-visual-payload` (1) and `typed-answer-no-variants` |
| number-financial-mathematics | 9 | `typed-answer-no-variants` |
| **Year 8 total** | **238** | |

None of these warnings are failures. They do not block seeding or student access.

**Highest-priority warning to fix:** The `no-visual-payload` warnings in `linear-relationships` (73 warnings) are the most significant. Questions that tell students to "read from the graph" or "plot the following points" without a rendered graph are incomplete pedagogically. Adding `CartesianGraph` payloads to graphing questions in this unit would eliminate the bulk of these warnings and substantially improve lesson quality.

---

## Remaining Shell Units

| Unit | Lessons needed | Connects to |
|---|---|---|
| `number-operations` | ~6 (directed numbers, rationals, irrationals, indices, fractions) | All units; foundational |
| `algebra-equations` | ~6 (factorising, equations with brackets, variables on both sides) | Year 9 index laws, simultaneous equations |
| `geometry-properties` | ~4–5 (congruence tests, similarity, scale factors, short proofs) | Year 9 geometric representations; Year 10 geometry proofs |
| `volume-and-surface-area` | ~5–6 (prism SA, cylinder SA, prism volume, cylinder volume, composite) | Year 9 prisms and cylinders |

---

## Next Recommendations (Highest-Value Units)

### 1. `algebra-equations` — Algebra and Equations

**Why now:**
- Directly extends completed `algebra-foundations` (expanding, solving 1- and 2-step equations are done)
- Appears in the diagnostic (3 questions: expand, solve, factorise) — building this unit fixes a diagnostic dead-end
- Prerequisite content for Year 9 index laws, simultaneous equations, and all senior algebra
- Content scope is well-defined and bounded: factorising by HCF, solving equations with brackets, equations with variables on both sides

**Suggested lessons (6):** factorising-by-hcf, solving-equations-with-brackets, variables-on-both-sides, equations-from-contexts, algebraic-fractions-introduction, algebra-equations-exam-practice

### 2. `number-operations` — Number Operations and Properties

**Why now:**
- Appears in the diagnostic (3 questions: directed numbers, irrationals, percentage applied)
- Builds number fluency assumed by all other Year 8 units; fixing this unit removes the last diagnostic dead-ends for number
- The diagnostic question y8-no3 (percentage discount) overlaps with `number-financial-mathematics` — once this unit is built, remove or replace y8-no3 with a true number-operations question to separate coverage

**Suggested lessons (6):** directed-numbers, rational-and-irrational-numbers, operations-with-fractions, index-notation-review, order-of-operations, number-operations-applications

---

## Validation Results

| Check | Result |
|---|---|
| `npx.cmd tsc --noEmit` | PASS — 0 errors |
| `npm.cmd run build` | PASS — all Year 8 routes compiled |
| `npm.cmd run audit:lessons` | PASS — 0 failures, 409 warnings |
| `seed-question-bank.ts --dry-run` | PASS — 684 questions, 0 warnings |
| `git diff --check` | PASS — no whitespace errors |

---

## Risks

| Risk | Severity | Notes |
|---|---|---|
| Diagnostic routes to 4 empty units | **High** | Students following `number-operations`, `algebra-equations`, `geometry-properties`, or `volume-and-surface-area` diagnostic links land on empty pages. Fix by building those units or temporarily removing them from the diagnostic. |
| 3 completed units absent from diagnostic | **High** | `algebra-foundations`, `number-financial-mathematics`, `geometry-angles` have 342 questions with no diagnostic pathway into them. Students cannot be routed into these units. |
| 73 `no-visual-payload` warnings in linear-relationships | **Medium** | Questions that reference "the graph" or "plot the points" are incomplete without a rendered diagram. Pedagogically misleading until CartesianGraph payloads are added. |
| `data-and-graphs` only has 3 of a planned larger lesson set | **Low** | The unit description mentions cumulative frequency, IQR, back-to-back plots and sampling — none of which are present. The 3 current lessons are self-contained and sound, but the unit is not fully representative of Stage 4 data content. |

---

## Audit Sources

| Source | Purpose |
|---|---|
| `lib/newCourseCatalog.ts` | Unit and lesson catalogue; buildLesson registration |
| `lib/lessons/year8/` | Override files and lesson maps |
| `lib/diagnostics/year-8-mathematics.ts` | Diagnostic unit slugs and question alignment |
| `scripts/seed-question-bank.ts` | Seedable question counts |
| `scripts/audit-lessons.ts` | Warning categories and rule definitions |
