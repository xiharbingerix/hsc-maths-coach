# Nova Maths Skill Map v2 — Phase 1 Slot Map

Created: 2026-06-13  
Status: Mapping pass only. No lesson files edited.  
Source: `lib/newCourseCatalog.ts` (authoritative), planning docs in `docs/`.

**Slot status codes**

| Code | Meaning |
|---|---|
| `[E]` | Existing — direct 1:1 map from current lesson slug |
| `[S]` | Split from existing — new slug carved from a too-broad existing lesson |
| `[N]` | New / missing — no current lesson; needs authoring |
| `[U]` | Unsuitable until feature support exists — blocked on UI, visual, or schema |

---

## Benchmark Summary

| Course | Nova units | Nova lessons | Benchmark topics | Benchmark subtopics | Priority |
|---|---:|---:|---:|---:|---|
| Year 8 | 10 | 54 | 14 | 111 | High |
| Year 9 Core | 8 | ~48 | 13 | 82 | High |
| Year 9 Advanced | 8 | 52 | 14 | 109 | High |
| Year 10 Core | 10 | ~44 | 12 | 76 | Medium |
| Year 10 Advanced | 10 | 53 | 16 | 128 | **Pilot (Trig)** |
| Year 11 Standard | 9 | 35 | 9 | 63 | High |
| Year 11 Advanced | 8 | 33 | 11 | 90 | High |
| Year 11 Extension 1 | 5 | 10 active | 5 | 30 | Medium |
| Year 12 Standard 1 | 5 | 15 | 7 | 29 | Medium |
| Year 12 Extension 1 | 6 | 22 | 7 | 28 | Low |
| Year 12 Extension 2 | 5 | 8 active | 5 | 40 | **Pilot (Schema)** |

---

## Year 8 Mathematics

**Current:** 10 units, 54 lessons  
**Benchmark:** 14 topics, 111 subtopics  
**Gap ratio:** ~2× too coarse  
**Priority:** High — in_progress, no progress data at risk

### Slot Map

| Topic | Subtopic slug | Status | Notes |
|---|---|---|---|
| **Number Operations** | `directed-numbers` | [E] | |
| | `fractions-and-decimals` | [S] | Split → `fractions-operations` + `decimal-operations` |
| | `percentages-and-fractions` | [E] | |
| | `order-of-operations` | [E] | |
| | `powers-roots-and-squares` | [S] | Split → `squares-square-roots` + `index-notation-intro` |
| | `estimation-and-reasonableness` | [E] | |
| | `ratios-and-rates-intro` | [N] | Missing entirely — no dedicated ratio/rate unit |
| | `unitary-method` | [N] | Missing |
| **Algebra Foundations** | `simplifying-algebraic-expressions` | [E] | |
| | `collecting-like-terms` | [E] | |
| | `substitution` | [E] | |
| | `expanding-single-brackets` | [E] | |
| | `solving-one-step-equations` | [E] | Duplicated in algebra-equations — consolidate |
| | `solving-two-step-equations` | [E] | Duplicated in algebra-equations — consolidate |
| **Algebra and Equations** | `equations-with-brackets` | [E] | |
| | `equations-with-pronumerals-on-both-sides` | [E] | |
| | `forming-equations-from-word-problems` | [E] | |
| | `checking-solutions-and-error-analysis` | [E] | |
| **Number and Financial Maths** | `percentages-basics` | [E] | |
| | `percentage-increase` | [E] | |
| | `percentage-decrease` | [E] | |
| | `profit-and-loss` | [E] | |
| | `discounts-and-sales` | [E] | |
| | `simple-interest-introduction` | [E] | |
| **Linear Relationships** | `number-patterns-and-rules` | [E] | |
| | `coordinates-and-points` | [E] | |
| | `tables-of-values` | [E] | |
| | `graphing-linear-relationships` | [E] | |
| | `gradient-as-rate-of-change` | [E] | |
| | `interpreting-linear-graphs` | [E] | |
| **Pythagoras** | `right-angled-triangles-pythagoras` | [E] | |
| | `finding-the-hypotenuse` | [E] | |
| | `finding-a-shorter-side` | [E] | |
| | `pythagoras-real-contexts` | [E] | |
| | `pythagorean-triples` | [E] | |
| | `distance-between-two-points` | [E] | |
| **Geometry and Angles** | `angle-relationships` | [E] | |
| | `parallel-lines-transversals` | [E] | |
| | `angles-triangles-quadrilaterals` | [E] | |
| | `properties-of-polygons` | [E] | |
| | `congruent-triangles` | [E] | |
| | `geometric-reasoning` | [E] | |
| **Volume and Surface Area** | `volume-of-prisms` | [E] | |
| | `surface-area-of-prisms` | [E] | |
| | `volume-of-cylinders` | [E] | |
| | `surface-area-of-cylinders` | [E] | |
| | `volume-of-composite-solids` | [E] | |
| | `surface-area-of-composite-solids` | [E] | |
| | `perimeter-area-review` | [N] | Missing as standalone — currently bundled inside geometry |
| **Data and Graphs** | `collecting-and-displaying-data` | [E] | |
| | `mean-median-mode-range` | [E] | |
| | `comparing-data-displays` | [E] | |
| | `dot-plots-and-stem-leaf` | [N] | Missing — NSW Stage 4 required |
| | `cumulative-frequency` | [N] | Missing — ogive/cumulative freq missing |
| | `back-to-back-displays` | [N] | Missing — back-to-back stem-and-leaf |
| **Probability and Chance** | `probability-language-and-scale` | [E] | |
| | `simple-probability` | [E] | |
| | `two-step-chance-experiments` | [E] | |
| | `relative-frequency` | [N] | Missing — experimental vs theoretical |
| | `tree-diagrams-y8` | [N] | Missing as standalone — currently only implied by two-step |

**Missing subtopics:** 9  
**Split candidates:** 2  
**Suggested first target:** Add `ratios-and-rates-intro` + `unitary-method` as a new Ratios and Rates topic unit; expand data and probability to 5 lessons each.

---

## Year 9 Core

**Current:** 8 units, ~48 lessons  
**Benchmark:** 13 topics, 82 subtopics  
**Gap:** Single pathway, no Core-specific content beyond lesson filtering  
**Priority:** High — large student volume

### Key Missing Subtopics

| Unit | Missing slug | Status |
|---|---|---|
| working-with-triangles | `trig-ratios-core` (Stage 5.2 right-angled trig) | [N] |
| working-with-triangles | `finding-sides-core` | [N] |
| working-with-triangles | `finding-angles-core` | [N] |
| geometrical-representations | `area-of-composite-figures` | [N] |
| financial-mathematics | `goods-services-tax` | [N] |
| making-predictions | `frequency-tables-relative` | [N] |

**Note:** Year 9 Core currently has no trigonometry. NSW Stage 5.2 Core does include basic right-angle trig. This is the single largest scope gap in Year 9 Core. It cannot share Advanced trig slugs safely — needs separate Core trig lessons.

---

## Year 9 Advanced

**Current:** 8 units, 52 lessons  
**Benchmark:** 14 topics, 109 subtopics  
**Gap:** ~2× too coarse; shares all content with base (no Advanced-specific depth)  
**Priority:** High — needs Advanced-specific extension content

### Split Candidates

| Current lesson | Proposed v2 subtopics | Status |
|---|---|---|
| `trigonometric-ratios` | `trig-ratios-identifying-sides` + `trig-ratios-sin-cos-tan` | [S] |
| `finding-sides-right-triangles` | `finding-sides-sin-cos` + `finding-sides-tan` | [S] |
| `gradient-foundations` | `gradient-from-equation` + `gradient-from-two-points` | [S] |

### Missing Subtopics

| Unit | Missing slug | Status |
|---|---|---|
| working-with-triangles | `exact-trig-values-intro` | [N] |
| constant-rates-of-change | `perpendicular-lines-foundations` | [N] |
| index-laws | `fractional-indices-intro` | [N] |
| making-decisions | `grouped-frequency-histograms` | [N] |

---

## Year 10 Core

**Current:** 10 units, ~44 lessons (trimmed Advanced base)  
**Benchmark:** 12 topics, 76 subtopics  
**Gap:** Runtime filter only — no Core-specific content written  
**Priority:** Medium — shares content with base; Core students may see Advanced-difficulty questions

### Split Candidates

| Current lesson | Proposed split | Status |
|---|---|---|
| `trigonometric-ratios` | `trig-ratios-identifying-sides` + `trig-ratios-sin-cos-tan` | [S] |
| `finding-sides-trig` | `finding-sides-sin-cos` + `finding-sides-tan` | [S] |

### Missing Subtopics

| Unit | Missing slug | Status |
|---|---|---|
| non-linear-relationships | `transformations-of-parabolas` | [N] |
| statistics-data | `time-series-trends` | [N] |
| financial-mathematics | `compound-interest-periods` | [N] |

---

## Year 10 Advanced

**Current:** 10 units, 53 lessons  
**Benchmark:** 16 topics, 128 subtopics  
**Gap:** ~2.4× too coarse; trig and non-linear units most acute  
**Priority:** Pilot candidate for trig split

### Trigonometry Unit — Detailed Slot Map

| Current lesson | Proposed v2 subtopics | Status | Visual |
|---|---|---|---|
| `trigonometric-ratios` | `trig-ratios-identifying-sides` | [S] | TriangleDiagram |
| | `trig-ratios-sin-cos-tan` | [S] | TriangleDiagram |
| `finding-sides-trig` | `finding-sides-sin-cos` | [S] | TriangleDiagram |
| | `finding-sides-tan` | [S] | TriangleDiagram |
| `finding-angles-trig` | `finding-angles-inverse-trig` | [E] | TriangleDiagram |
| `elevation-depression` | `elevation-depression-applications` | [E] | TriangleDiagram |
| `sine-rule` | `sine-rule-finding-sides` | [S] | TriangleDiagram |
| | `sine-rule-finding-angles` | [S] | TriangleDiagram |
| `cosine-rule` | `cosine-rule-finding-sides` | [S] | TriangleDiagram |
| | `cosine-rule-finding-angles` | [S] | TriangleDiagram |
| `area-trig-formula` | `area-of-triangle-formula` | [E] | TriangleDiagram |
| `bearings` | `true-bearings` | [S] | CartesianGraph |
| | `compass-bearings-problems` | [S] | CartesianGraph |
| — | `trig-mixed-problem-solving` | [N] | TriangleDiagram |
| — | `trigonometry-exam-practice` | [N] | TriangleDiagram |

**8 current lessons → 15 v2 subtopics. 7 splits, 1 existing, 2 new.**

### Other Y10 Advanced Missing Subtopics

| Unit | Missing slug | Status |
|---|---|---|
| algebraic-techniques | `factorising-non-monic-quadratics` | [N] |
| non-linear-relationships | `transformations-of-parabolas` | [N] |
| non-linear-relationships | `sketching-parabolas-completing-square` | [N] |
| geometry-proofs | `circle-geometry-proofs-combined` | [N] |
| statistics-data | `time-series-trends` | [N] |

---

## Year 11 Standard

**Current:** 9 units, 35 lessons  
**Benchmark:** 9 topics, 63 subtopics  
**Gap:** ~1.8× too coarse; some topics borderline placeholder  
**Priority:** High — most lessons are real but thin on depth

### Key Split Candidates

| Current lesson | Proposed split | Status |
|---|---|---|
| `area-surface-area-volume` | `area-and-perimeter` + `surface-area-3d-solids` + `volume-capacity` | [S] |
| `data-displays-summary-statistics` | `frequency-tables-displays` + `mean-median-mode-spread` | [S] |

### Missing Subtopics

| Unit | Missing slug | Status |
|---|---|---|
| formulas-equations | `substitution-multi-step-formulas` | [N] |
| formulas-equations | `formulae-inequations` | [N] |
| linear-relationships | `gradient-from-tables-and-graphs` | [N] |
| earning-money | `superannuation-basics` | [N] |
| applications-measurement | `right-angle-trig-measurement` | [N] |
| time-location | `longitude-latitude-intro` | [N] |
| data-analysis | `grouped-frequency-tables` | [N] |
| data-analysis | `statistical-bias` | [N] |
| — (new unit) | `simple-algebra-review` | [N] |

---

## Year 11 Advanced

**Current:** 8 units, 33 lessons  
**Benchmark:** 11 topics, 90 subtopics  
**Gap:** ~2.7× too coarse — worst ratio among senior Advanced courses  
**Priority:** High

### Split Candidates

| Current lesson | Proposed split | Status |
|---|---|---|
| `radians-exact-trigonometric-values` | `converting-degrees-radians` + `exact-trig-values-unit-circle` | [S] |
| `unit-circle-trigonometric-graphs` | `unit-circle-all-quadrants` + `graphing-sin-cos-tan` | [S] |
| `transformations-composite-functions` | `horizontal-vertical-translations` + `dilations-reflections` | [S] |
| `rates-of-change-gradients` | `average-rate-of-change` + `instantaneous-rate-of-change` | [S] |

### Missing Subtopics

| Unit | Missing slug | Status |
|---|---|---|
| working-with-functions | `absolute-value-functions` | [N] |
| working-with-functions | `odd-even-functions` | [N] |
| graph-transformations | `composite-function-evaluation` | [N] |
| trigonometry-measure-angles | `trig-functions-graphs-transformations` | [N] |
| trigonometric-identities-equations | `sum-and-product-to-sum-identities` | [N] |
| exponential-logarithmic-functions | `change-of-base` | [N] |
| introduction-differentiation | `chain-rule-basics` | [N] |
| introduction-differentiation | `product-quotient-rule-intro` | [U] | Requires calculus notation feature |
| probability-data | `conditional-probability-advanced` | [N] |
| — (new unit) | `coordinate-geometry-advanced` | [N] |
| — (new unit) | `further-functions-inequalities` | [N] |

---

## Year 11 Extension 1

**Current:** 5 units, 10 active lessons (3 units empty)  
**Benchmark:** 5 topics, 30 subtopics  
**Gap:** 3 entire topics unbuilt  
**Priority:** Medium

| Unit | Status | Missing slugs |
|---|---|---|
| further-functions | EMPTY [N] | `graphs-of-inverse-functions`, `parametric-forms`, `remainder-factor-theorem-preview` |
| polynomials | EMPTY [N] | `polynomial-division`, `remainder-factor-theorem`, `roots-and-coefficients` |
| further-trigonometry | EMPTY [N] | `t-formula`, `sum-difference-product-identities`, `general-solutions-trig-equations` |
| permutations-combinations | 5 lessons [E] | `pigeonhole-principle` [N] |
| binomial-theorem | 5 lessons [E] | expand to full 5+7+10 question count [E quality fix] |

---

## Year 12 Standard 1

**Current:** 5 units, 15 lessons  
**Benchmark:** 7 topics, 29 subtopics  
**Gap:** Missing 2 topics entirely; trig unit has only 1 lesson  
**Priority:** Medium — in_progress, content gaps documented

### Slot Map

| Unit | Lesson slug | Status | Notes |
|---|---|---|---|
| algebraic-relationships | `linear-relationships-modelling` | [E] | |
| | `quadratic-models` | [E] | |
| | `exponential-inverse-variation` | [E] | Rewritten for Standard 1 |
| | `simultaneous-equations-context` | [E] | Scope review needed |
| | `algebraic-relationships-exam-practice` | [E] | Needs Standard 1 rewrite |
| trigonometry-ratios-rates | `ratios-rates-unit-conversions` | [E] | |
| | `right-angle-trig-problems` | [N] | Missing |
| | `rates-practical-contexts` | [N] | Missing |
| investments-loans-annuities | `investment-compound-interest` | [E] | |
| | `depreciation-loans` | [E] | |
| | `annuities-regular-payments` | [E] | Rewritten for Standard 1 |
| statistics-and-data | `data-displays-summary-statistics` | [E] | |
| | `probability-and-chance` | [E] | |
| | `statistics-exam-practice` | [E] | |
| measurement-geometry | `right-angle-trigonometry` | [E] | |
| | `measurement-area-volume` | [E] | |
| | `scale-drawings-and-plans` | [E] | |
| — (new unit) | `networks-intro-standard1` | [N] | Benchmark includes networks for Standard 1 |
| — (new unit) | `investment-comparison-exam-practice` | [N] | |

---

## Year 12 Extension 1

**Current:** 6 units, 22 lessons  
**Benchmark:** 7 topics, 28 subtopics  
**Gap:** Closest to benchmark; missing t-formula, hypothesis testing  
**Priority:** Low

### Missing Subtopics

| Unit | Missing slug | Status |
|---|---|---|
| proof-induction | `induction-series-formulas-exam` | [N] |
| further-calculus | `t-formula-integration` | [N] |
| further-calculus | `partial-fractions-integration` | [N] |
| calculus-applications | `projectile-motion` | [N] |
| binomial-distribution | expand to 4+7+10 questions | [E quality fix] |

---

## Year 12 Extension 2

**Current:** 5 units, 8 active lessons (3 units empty)  
**Benchmark:** 5 topics, 40 subtopics  
**Gap:** 32 subtopics missing  
**Priority:** Medium — schema pilot candidate

### Detailed Slot Map: Complex Numbers (schema pilot unit)

| Current lesson | Proposed v2 subtopics | Status | Visual |
|---|---|---|---|
| `complex-number-arithmetic` | `complex-arithmetic-add-subtract` | [S] | — |
| | `complex-arithmetic-multiply` | [S] | — |
| | `complex-arithmetic-divide-conjugate` | [S] | — |
| `modulus-argument-conjugate` | `modulus-argument-definition` | [S] | ArgandDiagram |
| | `conjugate-properties-division` | [S] | ArgandDiagram |
| `argand-diagram-geometry` | `argand-plotting-loci` | [S] | ArgandDiagram |
| | `argand-geometric-operations` | [S] | ArgandDiagram |
| `polar-form-de-moivre` | `polar-form-conversion` | [S] | ArgandDiagram |
| | `de-moivre-theorem-powers` | [S] | ArgandDiagram |
| | `roots-of-unity` | [N] | ArgandDiagram |
| | `complex-polynomials` | [N] | — |

**4 lessons → 11 v2 subtopics. ArgandDiagram ready.**

### Empty Topics

| Unit | Target subtopics | Status |
|---|---|---|
| proof | `proof-by-contradiction`, `proof-by-contrapositive`, `inequality-proofs`, `induction-advanced` | [N] ×4 |
| calculus | `integration-substitution-ext2`, `integration-by-parts-ext2`, `trig-substitution`, `partial-fractions`, `volumes-of-revolution`, `differential-equations-intro` | [N] ×6 |
| mechanics | `shm-equations`, `resisted-motion`, `projectile-motion-ext2`, `circular-motion` | [N] ×4 |

---

## Top 20 Missing / Split Slots (Priority Order)

| # | Course | Unit | Slug | Type | Reason |
|---|---|---|---|---|---|
| 1 | Y10 Adv/Core | trigonometry | `trig-ratios-identifying-sides` | [S] | Pilot split — highest worksheet targeting gain |
| 2 | Y10 Adv/Core | trigonometry | `trig-ratios-sin-cos-tan` | [S] | Pilot split |
| 3 | Y10 Adv | trigonometry | `sine-rule-finding-sides` | [S] | Existing lesson too broad |
| 4 | Y10 Adv | trigonometry | `sine-rule-finding-angles` | [S] | Existing lesson too broad |
| 5 | Y10 Adv | trigonometry | `cosine-rule-finding-sides` | [S] | Existing lesson too broad |
| 6 | Y10 Adv | trigonometry | `trigonometry-exam-practice` | [N] | Completely missing exam practice |
| 7 | Y12 Ext2 | complex-numbers | `complex-arithmetic-multiply` | [S] | Schema pilot |
| 8 | Y12 Ext2 | complex-numbers | `roots-of-unity` | [N] | High HSC exam weight |
| 9 | Y12 Ext2 | proof | `proof-by-contradiction` | [N] | Entire topic unbuilt |
| 10 | Y12 Ext2 | calculus | `integration-by-parts-ext2` | [N] | Entire topic unbuilt |
| 11 | Y9 Core | working-with-triangles | `trig-ratios-core` | [N] | Core has zero trig — scope gap |
| 12 | Y9 Core | working-with-triangles | `finding-sides-core` | [N] | Scope gap |
| 13 | Y11 Adv | working-with-functions | `absolute-value-functions` | [N] | NSW syllabus required |
| 14 | Y11 Adv | trigonometry-measure-angles | `trig-functions-graphs-transformations` | [N] | High HSC exam frequency |
| 15 | Y11 Adv | introduction-differentiation | `chain-rule-basics` | [N] | Missing for Advanced calculus fluency |
| 16 | Y11 Extension | further-trigonometry | `t-formula` | [N] | Entire unit unbuilt — HSC Ext 1 exam |
| 17 | Y11 Extension | polynomials | `remainder-factor-theorem` | [N] | Entire unit unbuilt |
| 18 | Y8 | data-and-graphs | `dot-plots-and-stem-leaf` | [N] | NSW Stage 4 required |
| 19 | Y12 Std1 | trigonometry-ratios-rates | `right-angle-trig-problems` | [N] | Unit has only 1 lesson |
| 20 | Y11 Std | data-analysis | `grouped-frequency-tables` | [N] | Standard syllabus gap |

---

## Courses Most in Need of Refactor

Ranked by gap severity and student-facing urgency:

1. **Year 11 Advanced** — 33 lessons vs 90 subtopics benchmark; 3× gap; largest senior course; many students
2. **Year 8** — 54 lessons vs 111 subtopics; missing ratios/rates topic entirely; foundational
3. **Year 9 Core** — no trig content despite NSW Stage 5.2 requiring it; scope gap not a granularity issue
4. **Year 12 Extension 2** — 8 active lessons vs 40 benchmark; 3 topics completely empty
5. **Year 11 Standard** — 35 lessons vs 63 benchmark; some units single-lesson

---

## Pilot Comparison: Year 10 Trigonometry vs Year 12 Extension 2 Complex Numbers

| Factor | Y10 Trig | Ext2 Complex Numbers |
|---|---|---|
| **Progress preservation risk** | Medium — active paying students, 8 slugs need aliases | Low — course is `coming_soon`, near-zero mastery data |
| **Commercial value** | High — Year 10 is highest-traffic course | Medium — fewer Ext2 students but high premium value |
| **Student-facing urgency** | High — directly feeds Year 11 Standard/Advanced/Extension | Low — course not yet publicly available |
| **Visual support ready** | Yes — `TriangleDiagram` fully supported | Yes — `ArgandDiagram` recently added |
| **Worksheet targeting gains** | High — 8 → 15 subtopics (87% more granular) | Medium — 4 → 11 subtopics in complex numbers |
| **Schema risk** | Low — no new fields needed for content split | Low — pilot validates `stableId`/`legacySlugs` before broad rollout |
| **Authoring work** | Low — all questions exist; split + assign payloads | Low — questions need expansion per new subtopics |

### Recommendation: Two-phase pilot

**Phase 1a — Year 12 Extension 2 Complex Numbers (schema pilot, 1 week)**  
Do this first. The course is `coming_soon` with negligible progress data at risk. Use it to validate the catalogue-only `stableId` + `legacySlugs` + `skillCheckpoints` type fields. Because no student progress can be orphaned, any schema mistake is correctable without a migration. This is the technical rehearsal.

**Phase 1b — Year 10 Trigonometry (first production split, 2 weeks)**  
Do this second, using the alias strategy proven in Phase 1a. Year 10 is the highest-traffic course; a production split here delivers the most immediate worksheet targeting and commercial value. The split is well-defined (8 → 15), TriangleDiagram is ready, and the alias strategy will protect existing mastery records.

**Do not attempt both simultaneously** — Phase 1a must validate the type contract before Phase 1b touches production user data.

---

## Implementation Risks

| Risk | Severity | Affected courses | Mitigation |
|---|---|---|---|
| Y9 Core has no trig — adding it is a content authoring task, not a split | High | Year 9 Core | Author 3 dedicated Core trig lessons; do not reuse Advanced trig slugs |
| Y11 Advanced 3× gap requires sustained authoring sprint, not just splits | High | Year 11 Advanced | Prioritise working-with-functions and trig topics first; do not attempt all 8 units at once |
| Split lessons may fragment Daily Review link targets (currently /course/[course]/[topic] only) | Medium | All split courses | No fix needed for Phase 1 — Daily Review links to topic, not lesson |
| Worksheet `selectedSubtopicSlugs` only knows old slugs until seed is re-run | Medium | Year 10 Trig pilot | Phase 3 (worksheet update) must follow Phase 2 pilot; do not re-seed until lesson files land |
| Year 12 Extension 2 `coming_soon` status means questions are not seeded — stableId pilot is catalogue-only | Low | Year 12 Ext2 | Confirmed: Phase 1a is TypeScript-only; no DB writes required |
| Y10 Core shares lesson slugs with Y10 Advanced — splits must apply to both or cause divergence | Medium | Y10 Core/Advanced | Split Y10 base unit; both Core/Advanced inherit; Core trims still apply after split |
| 852 existing audit warnings (style) will increase with new lessons unless templates are improved | Low | All | Address incrementally; do not block Phase 1 on style warnings |

---

## Next Claude / Codex Prompts

### Prompt A — Phase 1a: Ext2 Complex Numbers schema pilot

```
Nova Maths context: c:\Users\joshu\hsc-maths-coach
Do not touch checkout/auth/payments. Do not write to Supabase.

Task: Catalogue-only Skill Map v2 schema pilot — Year 12 Extension 2 Complex Numbers.

1. Add optional TypeScript fields to catalogue lesson/unit types:
   - stableId: string (optional on CourseLessonSeed)
   - legacySlugs: string[] (optional)
   - skillCheckpoints: { id: string; outcome: string }[] (optional)
2. Populate these fields for the 4 Complex Numbers lessons only.
   Use slugs from docs/NOVA_MATHS_SKILL_MAP_V2_SLOTS.md (complex-numbers section).
3. Add a helper that flattens course → units → lessons → checkpoints into a flat node list.
4. Add an audit check for duplicate stableIds across the catalogue.
5. Do not rename public slugs. Do not change worksheet generation or mastery writes.

Validate: npx.cmd tsc --noEmit && npm.cmd run audit:lessons
Output: files changed, stableId list, backwards compatibility notes, validation result
```

### Prompt B — Phase 1b: Year 10 Trigonometry split

```
Nova Maths context: c:\Users\joshu\hsc-maths-coach
Do not touch checkout/auth/payments. Do not write to Supabase.

Task: Split Year 10 Trigonometry from 8 lessons to 15 v2 subtopics.
Reference: docs/NOVA_MATHS_SKILL_MAP_V2_SLOTS.md (Year 10 Advanced, Trigonometry section).

1. Add 7 new lesson slugs to the trigonometry unit in newCourseCatalog.ts.
   Preserve all 8 existing slugs as-is (legacy aliases stay in catalogue, no removal).
2. Create/expand override entries in lib/lessons/year10.ts for each new slug.
   Apply TriangleDiagram payloads to all trig lessons with a geometric question stem.
3. Expand independent practice from 5 to 7 questions in the split lessons.
4. Apply the same split to year-10-mathematics-core where Core includes the lesson.
5. Do not alter question IDs of existing lessons.

Validate: npx.cmd tsc --noEmit && npm.cmd run audit:lessons && seed --dry-run year-10-mathematics
Output: files changed, new slug list, legacy alias list, validation result, mastery alias notes
```

### Prompt C — Year 9 Core trig authoring

```
Nova Maths context: c:\Users\joshu\hsc-maths-coach
Do not touch checkout/auth/payments.

Task: Author 3 new Stage 5.2 right-angle trigonometry lessons for Year 9 Core.
These do NOT exist yet — not splits, pure new authoring.

Slugs: trig-ratios-core, finding-sides-core, finding-angles-core
Unit: working-with-triangles in year-9-mathematics-core
Standard: Stage 5.2 NSW — right-angle trig only. No sine rule, cosine rule, bearings.
Question count: 4 guided + 7 independent + 10 mastery per lesson.
Visual: apply TriangleDiagram payloads where the question stem references a labelled triangle.
IDs: use y9c- prefix for all question IDs.

Validate: npx.cmd tsc --noEmit && npm.cmd run audit:lessons
```
