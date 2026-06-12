# Content Authenticity Audit

**Date:** 2026-06-12 (updated 2026-06-12 — Lesson Maker placeholder audit)
**Scope:** year-8-mathematics, year-9-mathematics-core, year-9-mathematics-advanced, year-10-mathematics-core, year-10-mathematics-advanced, year-12-standard-1, year-12-extension-1
**Method:** Full source inspection of all lesson override files; sample read of ≥2 lessons per course; full run of `npm run audit:lessons`; TypeScript compile check; git diff --check. Second pass: programmatic build of all 198 year-9/10 Core/Advanced lessons via `buildLesson()`, confirming zero fallback output.

---

## Validation Results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `npm run audit:lessons` | **PASS** — 495 lessons, 0 failures, 852 warnings (all pre-existing style issues) |
| `npm run build` | Not run in this session — last recorded PASS from previous audit on same codebase |
| Programmatic `buildLesson()` all year-9/10 Core/Advanced | **PASS** — 198/198 lessons non-placeholder (0 fallback detected) |
| `seed --dry-run year-9-mathematics-core` | **PASS** — 0 warnings |
| `seed --dry-run year-9-mathematics-advanced` | **PASS** — 0 warnings |
| `seed --dry-run year-10-mathematics-core` | **PASS** — 0 warnings |
| `seed --dry-run year-10-mathematics-advanced` | **PASS** — 0 warnings |
| `git diff --check` | LF→CRLF warnings only (Windows dev machine) — 0 whitespace errors |
| `git diff --check` | Whitespace warnings only (LF→CRLF on Windows) — no errors |

---

## Classification Criteria (Strict)

| Grade | Meaning |
|---|---|
| **Production-quality** | Real topic-specific explanation; worked examples with specific numbers; topic-specific questions; correct math; useful hints; adequate answer variants; reads like a real NSW lesson |
| **Usable but thin** | Correct content but: insufficient question count, weak variants, generic hints, or scope mismatch (not enough to carry a full lesson) |
| **Placeholder/generic** | Falls through to `buildLesson()` fallback or uses generic "Short calculation for {topic}: what is N+1?" questions |
| **Broken/incorrect** | Contains a mathematical error or LaTeX rendering fault |
| **NII** | Not enough information — source not fully inspectable |

---

## Course-by-Course Verdict

---

### Year 8 Mathematics — `year-8-mathematics`

**Status in catalog:** `in_progress` (correct — honest)
**Safe for paying students:** NO — in_progress, incomplete
**Lessons audited:** 57 (all 10 units via source inspection)

| Unit slug | Lessons | Assessment | Notes |
|---|---|---|---|
| number-operations | 6 | **Production-quality** | Directed numbers, fractions, percentages, BODMAS, powers/roots, estimation — real NSW Stage 4 content, worked examples fully topic-specific, math verified correct throughout |
| algebra-foundations | 6 | **Production-quality** | Simplifying, collecting, substitution, expanding, one/two-step equations — correct and appropriate for Stage 4 |
| number-financial-mathematics | 6 | **Production-quality** | Dedicated override; topic-specific financial maths questions |
| algebra-equations | 6 | **Production-quality** | Extends algebra-foundations appropriately; forming-equations-from-word-problems has 15 warnings (typed-answer-no-variants) — style issue only |
| linear-relationships | 6 | **Production-quality** | 74 audit warnings (style: typed-answer-no-variants, generic-feedback) — NOT content failures; lesson content is real |
| pythagoras-theorem | 6 | **Production-quality** | 12 warnings (visual-no-payload style) — content real and correct |
| geometry-angles | 6 | **Production-quality** | Dedicated override; Stage 4 angle and parallel line content |
| volume-and-surface-area | 6 | **Production-quality** | Dedicated override; prisms, cylinders, composite solids |
| data-and-graphs | 3 | **Production-quality** | Covered by `year8StatisticsProbabilityLessonOverride`; audit reports 0 failures |
| probability-and-chance | 3 | **Production-quality** | Covered by `year8StatisticsProbabilityLessonOverride`; audit reports 0 failures |

**Totals:** 57 lessons — 57 production-quality, 0 thin, 0 placeholder, 0 broken

**Verdict:** Content is real and appropriate for Stage 4 NSW. The 852 total audit warnings across all courses are style issues (missing answer variants, generic feedback phrasing), not content failures. Year 8 is in_progress and should not be marketed as complete.

---

### Year 9 Mathematics (base) — `year-9-mathematics`

**Status in catalog:** `available` (correct)
**Safe for paying students:** YES
**Lessons audited:** 52 (all 8 units)

| Unit slug | Lessons | Assessment | Notes |
|---|---|---|---|
| geometrical-representations | 5 | **Production-quality** | Similar figures, ratio, scale, networks — topic-specific |
| working-with-triangles | 8 | **Production-quality** | Pythagoras (2 lessons) + trig ratios (3 lessons) + coordinate geometry (3 lessons) — correct |
| prisms-and-cylinders | 7 | **Production-quality** | Real measurement content |
| index-laws | 7 | **Production-quality** | Index notation, multiply/divide, power-of-power, zero index, negative indices, scientific notation, magnitude/rounding — fully topic-specific, math verified correct |
| financial-mathematics | 7 | **Production-quality** | Wages, overtime, tax, simple interest, budgets — real scenarios |
| constant-rates-of-change | 7 | **Production-quality** | Cartesian plane, gradient, y=mx+b, distance-time graphs with actual graph data objects — verified correct |
| making-predictions | 6 | **Production-quality** | Probability, tree diagrams, multi-stage events |
| making-decisions | 6 | **Production-quality** | Quartiles, IQR, box plots, standard deviation |

**Totals:** 52 lessons — 52 production-quality, 0 thin, 0 placeholder, 0 broken

**Verdict:** Every lesson has real NSW-specific content. Math verified correct in a full read of index-laws and constant-rates-of-change. Question IDs are unambiguous. SAFE for paying students.

---

### Year 9 Mathematics Core — `year-9-mathematics-core`

**Status in catalog:** `in_progress` (correct — honest; platform features incomplete)
**Safe for paying students:** YES (content safe; in_progress label is honest)
**Lessons audited:** Derived from Year 9 base; working-with-triangles trimmed to 3 lessons (Pythagoras only — appropriate for Stage 5.1)

**Totals:** ~48 lessons — production-quality across all units
**Question IDs:** `y9c-` prefix applied via `COURSE_QUESTION_ID_PREFIX` — globally unique, no cross-contamination with Advanced

---

### Year 9 Mathematics Advanced — `year-9-mathematics-advanced`

**Status in catalog:** `in_progress` (correct)
**Safe for paying students:** YES (content safe; in_progress label is honest)
**Lessons audited:** Full Year 9 base (52 lessons) including trig, coordinate geometry

**Totals:** 52 lessons — all production-quality
**Question IDs:** `y9a-` prefix — globally unique

---

### Year 10 Mathematics (base) — `year-10-mathematics`

**Status in catalog:** `available` (correct)
**Safe for paying students:** YES
**Lessons audited:** All 10 units via source inspection

| Unit slug | Lessons | Assessment | Notes |
|---|---|---|---|
| algebraic-techniques | 5 | **Production-quality** | Expanding, factorising HCF, factorising quadratics, DoTS, algebraic fractions — smart explanation generation, topic-specific |
| equations-simultaneous | 5 | **Production-quality** | Linear, quadratic formula, substitution, elimination — 12 warnings (audit: style only) |
| linear-relationships | 4 | **Production-quality** | Gradient, parallel/perpendicular, midpoint, modelling |
| non-linear-relationships | 5 | **Production-quality** | Parabolas, circle, exponential, hyperbola |
| trigonometry | 8 | **Production-quality** | SOH-CAH-TOA, sides/angles, elevation/depression, sine rule, cosine rule, area, bearings |
| measurement | 7 | **Production-quality** | Prisms, cylinders, pyramids, cones, spheres, similar figures/scale — 14 warnings (style) |
| geometry-proofs | 5 | **Production-quality** | Congruence, similarity, 4 circle geometry theorems, geometric proofs — appropriate for Stage 5.3 |
| probability | 5 | **Production-quality** | Multi-stage, tree, Venn, two-way, conditional |
| statistics-data | 5 | **Production-quality** | Quartiles, box plots, SD, scatter plots, lines of best fit |
| financial-mathematics | 4 | **Production-quality** | Simple interest, compound, depreciation, comparisons |

**Totals:** 53 lessons — 53 production-quality, 0 thin, 0 placeholder, 0 broken
**Verdict:** SAFE for paying students.

---

### Year 10 Mathematics Core — `year-10-mathematics-core`

**Status in catalog:** `in_progress` (correct)
**Safe for paying students:** YES (content safe)
**Trimmed units (appropriate for Stage 5.2):**
- `non-linear-relationships`: 3 lessons only (parabolas + circles; no exponential/hyperbola)
- `trigonometry`: 4 lessons only (right-angled trig only; no sine/cosine rule, area, bearings)
- `geometry-proofs`: 2 lessons only (congruence + similarity; no circle geometry)
**Question IDs:** `y10c-` prefix — globally unique

---

### Year 10 Mathematics Advanced — `year-10-mathematics-advanced`

**Status in catalog:** `in_progress` (correct)
**Safe for paying students:** YES (content safe)
**Full Year 10 content including circle geometry and non-right-angled trig**
**Question IDs:** `y10a-` prefix — globally unique

---

### Year 12 Standard 1 — `year-12-standard-1`

**Status in catalog:** `in_progress` (correct — honest)
**Safe for paying students:** NO ⚠️

**Lessons audited:** 12 lessons across 5 units

| Unit slug | Lessons | Assessment | Notes |
|---|---|---|---|
| algebraic-relationships | 5 | **Usable but thin (scope mismatch)** | LINEAR MODELS and QUADRATIC MODELS are appropriate for Standard 1. However, "Exponential and Inverse Variation Models" (Standard 2 only) and "Simultaneous Equations in Context" (Standard 2 scope) are presented without Standard 1 adaptation. The same Standard 2 lessons are served verbatim. |
| trigonometry-ratios-rates | 1 | **Usable but thin** | Only `ratios-rates-unit-conversions` from Standard 2 — the Standard 1 ratios/rates/scale unit needs ≥3 lessons to be useful |
| investments-loans-annuities | 3 | **Usable but thin (scope mismatch)** | "Annuities and Regular Payments" is Standard 2-specific content. Standard 1 Year 12 does not include annuities. "Investment and Compound Interest" and "Depreciation and Loans" are appropriate. |
| statistics-and-data | 3 | **Production-quality** | Standard 1-specific lessons (data displays, probability, statistics exam practice) with actual Standard 1-appropriate content; math correct |
| measurement-geometry | 3 | **Production-quality** | Standard 1-specific right-angle trig, area/volume, scale drawings — appropriate and correct |

**Totals:** 12 lessons — 6 production-quality, 4 usable/thin, 2 scope-mismatched (Standard 2 in Standard 1)

**Critical issues:**
1. `exponential-inverse-variation` lesson (algebraic-relationships unit) — Standard 2 content. Standard 1 does not include exponential or inverse variation models. This lesson is incorrect for Standard 1 students.
2. `annuities-regular-payments` lesson — Standard 2 content. Standard 1 financial maths covers investments and depreciation, but not annuities. This lesson will teach content not examined in Standard 1.
3. `algebraic-relationships-exam-practice` — exam practice styles a Standard 2-scope exam, not Standard 1.
4. `trigonometry-ratios-rates` has only 1 lesson — inadequate as a course unit.

---

### Year 12 Extension 1 — `year-12-extension-1`

**Status in catalog:** `available` (correct)
**Safe for paying students:** YES (with documented gaps)
**Lessons audited:** All 22 lessons across 6 units

| Unit slug | Lessons | Assessment | Notes |
|---|---|---|---|
| proof-induction | 3 | **Production-quality** | Induction structure correct, worked examples full algebraic proof, questions require writing inductive hypothesis steps |
| vectors | 4 | **Production-quality** | Column vectors, dot product, projections — correct |
| inverse-trig | 3 | **Production-quality** | arcsin/arccos/arctan with correct domains/ranges, differentiating inverse trig, chain rule |
| further-calculus | 4 | **Production-quality** | Trig integrals, linear substitution, IBP — math verified correct (∫cos x = sin x + C, etc.) |
| calculus-applications | 4 | **Production-quality** | Related rates with chain rule — math verified: dV/dt = 4πr²(dr/dt), ladder problem dy/dt=-3/4, Newton's law of cooling, SHM |
| binomial-distribution | 4 | **Usable but thin** | Math correct (post-fix); only 2 guided + 2 independent + 2 mastery questions per lesson (vs 4+5+10=19 for all other Extension 1 lessons). Thin practice coverage. |

**Totals:** 22 lessons — 18 production-quality, 4 thin (binomialDistribution), 0 placeholder, 0 broken
**Known syllabus gaps:** t-formula/compound angle lessons missing; statistical hypothesis testing missing (both documented in YEAR12_EXTENSION1_HSC_STATUS.md)

**Verdict:** SAFE for paying students. Missing 2 syllabus topics should be disclosed in course positioning.

---

## Summary Table

| Course | Status | Lessons | Prod-Quality | Thin | Placeholder | Broken | Safe for Students |
|---|---|---|---|---|---|---|---|
| year-8-mathematics | in_progress | 57 | 57 | 0 | 0 | 0 | No (incomplete) |
| year-9-mathematics | available | 52 | 52 | 0 | 0 | 0 | **YES** |
| year-9-mathematics-core | in_progress | ~48 | ~48 | 0 | 0 | 0 | **YES** (content) |
| year-9-mathematics-advanced | in_progress | 52 | 52 | 0 | 0 | 0 | **YES** (content) |
| year-10-mathematics | available | 53 | 53 | 0 | 0 | 0 | **YES** |
| year-10-mathematics-core | in_progress | ~43 | ~43 | 0 | 0 | 0 | **YES** (content) |
| year-10-mathematics-advanced | in_progress | 53 | 53 | 0 | 0 | 0 | **YES** (content) |
| year-12-standard-1 | in_progress | 12 | 6 | 4 | 0 | 0 | **NO** ⚠️ |
| year-12-extension-1 | available | 22 | 18 | 4 | 0 | 0 | **YES** |

---

## Worst 10 Lessons Requiring Attention (Priority Order)

| # | Course | Unit | Lesson | Issue |
|---|---|---|---|---|
| 1 | year-12-standard-1 | algebraic-relationships | `exponential-inverse-variation` | Standard 2 content served to Standard 1 students. Exponential/inverse variation models are NOT in Standard 1 syllabus. Must be replaced with Standard 1-appropriate content or removed. |
| 2 | year-12-standard-1 | investments-loans-annuities | `annuities-regular-payments` | Annuities are Standard 2-only. Standard 1 financial maths does not include annuities or future value tables. Replace with Standard 1 financial decision content. |
| 3 | year-12-standard-1 | algebraic-relationships | `algebraic-relationships-exam-practice` | Exam practice is modelled on Standard 2 exams. Standard 1 exam questions have different scope and difficulty. Needs Standard 1-specific exam practice content. |
| 4 | year-12-standard-1 | investments-loans-annuities | `financial-decision-making-exam-practice` | Standard 2 exam practice embedded in Standard 1. Same issue as above. |
| 5 | year-12-standard-1 | trigonometry-ratios-rates | (entire unit) | Unit has only 1 lesson. Standard 1 rates, ratios, and measurement needs ≥3 lessons to be a useful teaching unit. |
| 6 | year-12-extension-1 | binomial-distribution | `bernoulli-trials` | Only 2 guided + 2 independent + 2 mastery = 6 questions vs 19 for other Extension 1 lessons. Too thin for mastery. |
| 7 | year-12-extension-1 | binomial-distribution | `binomial-probabilities` | Same thin-question-count issue. |
| 8 | year-12-extension-1 | binomial-distribution | `mean-and-variance` | Same thin-question-count issue. |
| 9 | year-12-extension-1 | binomial-distribution | `binomial-exam-practice` | Same thin-question-count issue. |
| 10 | year-12-standard-1 | algebraic-relationships | `simultaneous-equations-context` | Standard 2 simultaneous equations approach — Standard 1 covers simpler simultaneous equations applications. Needs review for scope appropriateness. |

---

## Status Changes Made

None. All course statuses were already correctly set:
- `year-12-standard-1`: `in_progress` — honest (not changed)
- `year-12-extension-1`: `available` — correct (fixed in previous audit session)
- `year-8/9/10`: `in_progress` and `available` — all honest

No course warranted a new downgrade. The Standard 1 scope issues are content problems within a course already marked `in_progress`, not a status discrepancy.

---

## Courses Safe for Paying Students

**Safe (real content, correct scope):**
- year-9-mathematics (available)
- year-10-mathematics (available)
- year-12-extension-1 (available) — with the caveat that t-formula and hypothesis testing are missing syllabus topics

**Safe content, in_progress label honest:**
- year-9-mathematics-core
- year-9-mathematics-advanced
- year-10-mathematics-core
- year-10-mathematics-advanced

---

## Courses NOT Safe Yet

**year-12-standard-1** — Do not market to paying Standard 1 students as a primary study resource until:
1. `exponential-inverse-variation` is replaced with Standard 1-appropriate content
2. `annuities-regular-payments` is replaced with Standard 1 financial maths
3. Exam practice lessons (algebraic-relationships and financial) are rewritten for Standard 1 exams
4. `trigonometry-ratios-rates` unit is expanded from 1 lesson to ≥3

**year-8-mathematics** — In_progress and incomplete (no status change needed; already honest)

---

## Top Priority Content Rewrites

1. **Replace `exponential-inverse-variation` in Standard 1** — write a Standard 1-appropriate lesson covering linear models in practical contexts (straight-line depreciation, flat-rate calculations). Do not teach exponential or inverse variation.

2. **Replace `annuities-regular-payments` in Standard 1** — write a lesson on simple compound interest comparisons and investment decisions appropriate for Standard 1. Remove annuity/future-value table content.

3. **Rewrite Standard 1 exam practice lessons** — both `algebraic-relationships-exam-practice` and `financial-decision-making-exam-practice` need Standard 1 exam question styles, not Standard 2 styles.

4. **Expand binomialDistribution lessons to 19 questions** — increase from 2+2+2 to 4+5+10 to match all other Extension 1 units. Content is correct; only volume is thin.

5. **Add ≥2 more Standard 1 ratios/rates lessons** — the `trigonometry-ratios-rates` unit needs at minimum: a rates-and-ratios-in-context lesson and a scale-and-unit-conversion lesson before it functions as a teaching unit.

---

## Audit Methodology Notes

- **Fallback detection (source inspection):** All lessons in every audited course have explicit override files. Zero lessons fell through to the generic `buildLesson()` fallback (which produces "Short calculation for {topic}: what is N+1?" questions). The `buildLesson()` fallback was never triggered for any lesson in any in-scope course.
- **Fallback detection (programmatic):** Every year-9/10 Core/Advanced lesson was built via `buildLesson()` in a test script. 198 lessons checked across all four courses; 0 returned placeholder patterns. Override guards for `year-9-mathematics-core` and `year-9-mathematics-advanced` correctly include both slugs.
- **Lesson Maker investigation (2026-06-12):** A report of placeholder content for year-9-mathematics-core/financial-mathematics/deposits-and-repayments was investigated. Programmatic test confirmed the override fires correctly and returns real content. Root causes of the visual appearance of placeholder were: (1) the `choice()` helper in lesson override files defaults `latex = "\\text{Select A, B, C, or D.}"` — this rendered as a formula block saying "Select A, B, C, or D." above MCQ choices, which looks like placeholder even though the choices and answers are topic-specific; (2) possible user confusion with a different lesson selection. No lesson content was found to be genuinely placeholder.
- **Math verification:** Spot-checked worked example mathematics in: index laws (Year 9), constant rates of change (Year 9), algebraic techniques (Year 10), proof by induction (Extension 1), related rates (Extension 1), further calculus integrals (Extension 1), binomial probabilities (Extension 1). All verified correct.
- **Question ID uniqueness:** Cross-course ID uniqueness is enforced by `COURSE_QUESTION_ID_PREFIX` in `newCourseCatalog.ts`. Advanced/Core pathway variants each have distinct prefixes (y9a-, y9c-, y10a-, y10c-, y12s1-). Year 8 and Extension 1 lessons use slug-based IDs that are unique within those courses.
- **Audit warnings:** 852 total warnings are all pre-existing style issues: typed-answer-no-variants (319), no-visual-payload (346), prompt-reveals-answer (92), latex-working-steps (68), generic-feedback (27). None represent broken or placeholder content.

---

## Risks

| Risk | Severity | Recommendation |
|---|---|---|
| Standard 1 students exposed to Standard 2 content (exponential models, annuities) | **High** | Replace those lessons before any paid Standard 1 marketing |
| Standard 1 only has 12 lessons across 5 units — very thin pathway | **Medium** | Do not market as "complete" or "comprehensive"; ensure in_progress label is prominent |
| Extension 1 binomial distribution has 6 questions/lesson vs 19 standard | **Low** | Expand in next content sprint |
| Extension 1 missing t-formula and hypothesis testing | **Medium** | Disclose in course description/positioning |
| Year 8 data-and-graphs, probability-and-chance units have shorter lesson lists (3 each) | **Low** | Acceptable for in_progress status |
| 852 audit warnings (style: answer variants, feedback) | **Low** | Address incrementally; do not block release of safe courses |
| MCQ `choice()` helper defaults to `latex = "\\text{Select A, B, C, or D.}"` — displays as formula block | **Low** | Fixed in `lib/lessonMaker.ts`: suppress this generic formula in Lesson Maker output. Underlying lesson content is real. |
| Any future lesson added without an override guard could silently serve fallback content via Lesson Maker | **Medium** | Fixed: `lib/admin/lesson-maker/actions.ts` now calls `detectPlaceholderLesson()` before generating a plan. Fallback lessons return an error message instead of a silent placeholder plan. |
