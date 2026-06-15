# Nova Maths — Course Structure Checklist

> **Objective:** High-quality lessons and question content across the entire NSW syllabus, mapped to syllabus sections with sufficient lessons to cover all skills and content in the Content section. Each lesson: 19 questions, worked examples, Feynman teaching, and common mistakes. Each focus area: one revision lesson activating the prior knowledge stated in the syllabus teaching advice, plus content lessons per dot-point group.
> **Standard:** NSW syllabuses (2024 versions, implementation from 2026). Source of truth: [curriculum.nsw.edu.au](https://curriculum.nsw.edu.au).
> Last updated: 2026-06-15 — Year 12 Standard 1 audited dot-by-dot against NSW 2024 syllabus; 4 new lessons added (22 total, 76 new questions). Year 12 Advanced fully audited (91 lessons, 1726 questions, all 14 focus areas). Year 12 Standard 2 fully complete (58 lessons, 1106 questions, all 10 topics). Year 12 Extension 1 fully complete (48 lessons, 862 questions, all 6 focus areas). Year 11 Standard fully complete (76 lessons, 1444 questions, all 8 focus areas).

---

## Quick Status

> **Depth** — ✅ Full (19Q + worked examples + Feynman teaching + common mistakes) | ⬜ None
> **Syllabus coverage** — % of syllabus dot-point groups with at least one Nova lesson. Target: 100%.
> **Revision lessons** — one lesson per focus area activating prior knowledge from the syllabus teaching advice. Target: one per focus area.
> Courses not yet audited against the 2024 syllabus are marked "audit pending" — lesson counts are known but gap analysis is not complete.

| Course | Nova lessons | Syllabus focus areas | Dot-point coverage | Revision lessons | Status |
|---|---|---|---|---|---|
| Year 7 Mathematics | 0 | — | 0% | 0 | ⬜ Not started |
| Year 8 Mathematics | 59 (10 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 9 Mathematics | 53 (8 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 9 Mathematics Advanced | 53 (8 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 9 Mathematics Core | ~40 (8 trimmed) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 10 Mathematics | ~56 (10 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 10 Mathematics Advanced | ~56 (10 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 10 Mathematics Core | ~40 (10 trimmed) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 11 Standard | 76 (8 units) | 8 focus areas | ✅ 100% | 8 | ✅ Complete — audited 2026-06-15 (1444 questions) |
| Year 11 Advanced | 54 (8 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 11 Extension 1 | 25 (5 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 12 Standard 1 | 22 (5 units) | 7 topics | ✅ 7/7 (credit card gap noted) | 0 | 🔄 Audited 2026-06-15; 1 gap remains (credit cards) |
| Year 12 Standard 2 | 58 (6 units) | 10 topics | ✅ 100% | 10 | ✅ Complete — audited 2026-06-15 (1106 questions) |
| Year 12 Advanced | 91 (13 units) | 14 focus areas (MA-F1–S3) | ✅ 100% | 0 | ✅ Complete — audited 2026-06-15 (1726 questions) |
| Year 12 Extension 1 | 30 (8 units) | 6 focus areas (ME1-12-01–06) | ✅ 100% | 0 | ✅ Complete — audited 2026-06-15 (862 questions) |
| Year 12 Extension 2 | 25 (5 units) | — | audit pending | 0 | ✅ Full depth; audit pending |

---

## Year 7 Mathematics ⬜

Not in Nova. Class Mathematics has 13 topics / 117 subtopics covering:
number, algebra, geometry, measurement, data, probability.

- [ ] Create `year-7-mathematics` course pathway
- [ ] Number and operations
- [ ] Fractions, decimals, percentages
- [ ] Ratios and rates
- [ ] Algebraic expressions
- [ ] Equations
- [ ] Linear relationships (intro)
- [ ] Angles and geometry
- [ ] Area and volume (intro)
- [ ] Congruence
- [ ] Data and graphs
- [ ] Probability

---

## Year 8 Mathematics ✅

`year-8-mathematics` — `available`. Override file: `lib/lessons/year8/`.
Class Maths: 14 topics / 111 subtopics. Nova: 10 units / 59 lessons.

- [x] Number Operations and Properties (6 lessons)
- [x] Algebra Foundations (6 lessons)
- [x] Number and Financial Mathematics (6 lessons)
- [x] Algebra and Equations (6 lessons)
- [x] Linear Relationships (6 lessons)
- [x] Pythagoras' Theorem (6 lessons)
- [x] Geometry and Angles (6 lessons)
- [x] Volume and Surface Area (6 lessons)
- [x] Data Analysis and Graphs (6 lessons — stem-and-leaf, quartiles/IQR, outliers)
- [x] Probability and Chance (5 lessons — relative frequency, expected outcomes)

**Gap vs Class Maths:** Nova has 10 units vs 14-topic target. Missing units likely cover Number and Algebra depth (ratios/rates, index laws, algebraic fractions) and additional Data topics. Adequate for available status.

---

## Year 9 Mathematics ✅ / Variants 🔄

Base course: `year-9-mathematics` — `available`. Override file: `lib/lessons/year9/`.
Advanced and Core variants share the same override functions with prefixed question IDs.

### Units (base + Advanced)

- [x] Geometrical Representations (5 lessons)
- [x] Working with Triangles (8 lessons) — Advanced full, Core trimmed to Pythagoras + basic trig
- [x] Prisms and Cylinders (7 lessons)
- [x] Index Laws (7 lessons)
- [x] Financial Mathematics (7 lessons)
- [x] Constant Rates of Change (7 lessons)
- [x] Making Predictions / Probability (6 lessons)
- [x] Making Decisions / Statistics (6 lessons)

### Variants

- [x] `year-9-mathematics-advanced` — in_progress, shares base units
- [x] `year-9-mathematics-core` — in_progress, trimmed working-with-triangles lessons
- [ ] Promote Advanced and Core to `available`

---

## Year 10 Mathematics ✅ / Variants 🔄

Base course: `year-10-mathematics` — `available`. Override file: `lib/lessons/year10/`.
Advanced: skill map IDs namespaced `y10a-`. Core: trimmed + `y10c-`.

### Units (base + Advanced)

- [x] Algebraic Techniques (5 lessons)
- [x] Equations and Simultaneous Equations (5 lessons)
- [x] Linear Relationships (4 lessons)
- [x] Non-Linear Relationships (5 lessons, Core trimmed to parabolas + circles)
- [x] Trigonometry (many v2 skill slots — right-angle + sine/cosine rule + bearings; Core right-angle only)
- [x] Measurement (7 lessons)
- [x] Geometry and Proofs (5 lessons, Core trimmed to congruence + similarity only)
- [x] Probability (5 lessons)
- [x] Statistics and Data (5 lessons)
- [x] Financial Mathematics (4 lessons)

### Variants

- [x] `year-10-mathematics-advanced` — in_progress, namespaced IDs
- [x] `year-10-mathematics-core` — in_progress, trimmed units
- [ ] Promote Advanced and Core to `available`

---

## Year 11 Standard ✅ Complete — Audited against NSW 2024 syllabus (2026-06-15)

`year-11-standard` — `available`. Override file: `lib/lessons/year11Standard/`.
**76 lessons / 8 units / 1444 questions.** All 8 NSW 2024 MS11 focus areas fully addressed. Audited dot-by-dot against the NSW Mathematics Standard 11–12 Syllabus (2024). Unit slugs aligned to NSW 2024 topic headings 2026-06-15.

| # | NSW Focus Area (slug) | Outcome | Lessons | Status |
|---|---|---|---|---|
| 1 | Formulae and equations (`formulae-equations`) | MS11-A1 | 9 | ✅ incl. BAC/medication dosage, revision |
| 2 | Linear relationships (`linear-relationships`) | MS11-A2 | 8 | ✅ incl. revision |
| 3 | Money and financial mathematics (`money-and-financial-mathematics`) | MS11-F1 | 18 | ✅ incl. Medicare levy, vehicle costs, 2 revision lessons |
| 4 | Applications of measurement (`applications-of-measurement`) | MS11-M1 | 9 | ✅ incl. trapezoidal rule, revision |
| 5 | Working with time (`working-with-time`) | MS11-M2 | 8 | ✅ incl. revision |
| 6 | Networks and paths (`networks-and-paths`) | MS11-N1 | 8 | ✅ incl. revision |
| 7 | Data analysis (`data-analysis`) | MS11-S1 | 9 | ✅ incl. sampling methods, revision |
| 8 | Relative frequency and probability (`relative-frequency-and-probability`) | — | 7 | ✅ retained from 2017 syllabus — outside 2024 Year 11 scope; bridges to MST-12-S2-09 |

---

## Year 11 Advanced ✅

`year-11-advanced` — `available`. Override file: `lib/lessons/year11Advanced/`.
Class Maths 2026: 11 topics / 90 subtopics.

- [x] Working with Functions (6 lessons) — includes absolute value, odd/even skill slots
- [x] Graph Transformations (5 lessons) — translations + dilations/reflections skill slots
- [x] Sequences and Series (5 lessons)
- [x] Trigonometry and Measure of Angles (12 lessons) — full v2 skill map split complete
- [x] Trigonometric Identities and Equations (7 lessons) — Phase 2 complete, Phase 3 in progress
- [x] Exponential and Logarithmic Functions (5 lessons)
- [x] Introduction to Differentiation (9 lessons) — includes chain rule, stationary points, concavity, curve sketching
- [x] Probability and Data (5 lessons)

**Gaps vs Class Maths 11-topic target:**
- [ ] Equations and Inequations — not a separate unit in Nova; consider adding or expanding existing
- [ ] Coordinate Geometry / Locus — not explicitly covered as a unit

**Active work:**
- [ ] Trig Identities Phase 3 — proof strategies + advanced equations exam practice (in progress)

---

## Year 11 Extension ✅

`year-11-extension` — `available`. Override file: `lib/lessons/year11Extension/`.
Class Maths 2026: 5 topics / 30 subtopics.

- [x] Further Work with Functions (5/~5) ✅
- [x] Polynomials (5/~5) ✅
- [x] Further Trigonometry (5/~5) ✅
- [x] Permutations and Combinations (5 lessons)
- [x] The Binomial Theorem (5 lessons)

**Progress (2026-06-14):** Further Work with Functions, Polynomials, and Further Trigonometry authored (+15 lessons); Year 11 Extension now has 25 lessons across all 5 planned units.

---

## Year 12 Standard 1 🔄 Audited against NSW 2024 syllabus (2026-06-15)

`year-12-standard-1` — `in_progress`. Override file: `lib/lessons/year12Standard1.ts`.
**22 lessons.** Audited dot-by-dot against NSW Mathematics Standard 11–12 Syllabus (2024). First HSC 2027.

| # | NSW Topic | Outcome | Lessons | Status |
|---|---|---|---|---|
| 1 | Algebraic relationships | MST-12-S1-01 | 5 | ✅ linear models, quadratic models, direct variation, simultaneous equations, exam practice |
| 2 | Investment | MST-12-S1-02 | 1 | ✅ simple and compound interest, comparing investment strategies |
| 3 | Depreciation and loans | MST-12-S1-03 | 1 | ⚠️ straight-line and declining-balance depreciation, reducing-balance loans; credit card content not yet covered |
| 4 | Right-angled triangles | MST-12-S1-04 | 3 | ✅ SOH-CAH-TOA, elevation/depression, bearings (added 2026-06-15) |
| 5 | Ratios and rates | MST-12-S1-05 | 2 | ✅ ratios, unit conversions, speed, fuel consumption, flow rate, pay |
| 6 | Bivariate data analysis | MST-12-S1-06 | 2 | ✅ scatter plots + form/strength/direction (added 2026-06-15); line of best fit + interpolation/extrapolation (added 2026-06-15) |
| 7 | Relative frequency and probability | MST-12-S1-07 | 3 | ✅ probability formula, two-stage trees; complementary events + relative frequency + expected frequency (added 2026-06-15) |

**New lessons added in this audit pass (2026-06-15):**
- `bearings-and-compass` — true bearings (3-figure), compass bearings, conversions, back bearings, trig components (19 Q)
- `bivariate-data-scatter-plots` — univariate vs bivariate, independent/dependent variables, scatter plots, form/strength/direction, correlation vs causation (19 Q)
- `line-of-best-fit-predictions` — line of best fit by eye, gradient/y-intercept, interpolation, extrapolation limitations (19 Q)
- `relative-frequency-expected-value` — complementary events P(not A) = 1 − P(A), relative frequency as estimate, expected frequency np (19 Q)

**Legacy lessons retained (outside NSW 2024 Standard 1 scope):**
- `measurement-area-volume` — area, perimeter, surface area, volume (Year 11 Measurement; not in MST-12-S1)
- `scale-drawings-and-plans` — scale and similarity (not in MST-12-S1)
- `data-displays-summary-statistics` — mean/median/range (Year 11 content; not in MST-12-S1)
- `right-angle-trigonometry` (in `measurement-geometry` unit) — duplicate; relevant trig content is in `right-angle-trig-applications` + `bearings-and-compass`

**Remaining gap:**
- [ ] Credit card content (MST-12-S1-03): interest-free periods, minimum repayments — not yet in `depreciation-loans`
- [ ] Promote to `available` once credit card content is added

---

## Year 12 Standard 2 ✅ Complete — Audited against NSW 2024 syllabus (2026-06-15)

`year-12-standard-2` — `available`. Override file: `lib/lessons/year12Standard2/`.
**58 lessons / 1106 questions.** All 10 NSW 2024 MST-12-S2 topics fully addressed including model limitations. Audited dot-by-dot against the NSW Mathematics Standard 11–12 Syllabus (2024). First HSC 2027.

| # | NSW Topic | Outcome | Lessons | Status |
|---|---|---|---|---|
| 1 | Algebraic relationships | MST-12-S2-01 | 9 | ✅ incl. revision, reciprocal relationships, exponential + quadratic model limitations |
| 2 | Investment and loans | MST-12-S2-02 | 7 | ✅ incl. revision, shares/dividends/brokerage, straight-line vs declining depreciation |
| 3 | Annuities | MST-12-S2-03 | 5 | ✅ incl. revision, interest factor tables, retirement planning |
| 4 | Trigonometry | MST-12-S2-04 | 8 | ✅ incl. revision, radians, elevation/depression |
| 5 | Ratios and rates | MST-12-S2-05 | 7 | ✅ incl. revision, site plans, rainfall volume, energy/watts |
| 6 | Network flow | MST-12-S2-06 | 4 | ✅ incl. revision |
| 7 | Critical path analysis | MST-12-S2-07 | 3 | ✅ incl. revision, Gantt charts, dummy activities |
| 8 | Bivariate data analysis | MST-12-S2-08 | 4 | ✅ incl. revision |
| 9 | Relative frequency and probability | MST-12-S2-09 | 5 | ✅ incl. revision, multistage/independence, expected frequency |
| 10 | The normal distribution | MST-12-S2-10 | 3 | ✅ incl. revision |

**Legacy lessons retained (outside 2024 scope):** `surface-area-prisms-cylinders`, `volume-prisms-cylinders-spheres`, `composite-solids-practical` (Year 11 Measurement), `ambiguous-case-sine-rule` (explicitly excluded from 2024 syllabus), `time-zones-conversions` (not in Year 12 scope).

---

## Year 12 Advanced ✅ Complete — Audited against NSW 2024 syllabus (2026-06-15)

`year-12-advanced` — `available`. Lesson files: `lib/lessons/*.ts` (legacy `ExplicitLesson[]` format).
**91 lessons / 1726 questions.** All NSW 2024 MA focus areas fully addressed. Audited dot-by-dot against the NSW Mathematics Advanced 11–12 Syllabus (2024). First HSC 2027.

| # | NSW Topic | Outcome | Lessons | Status |
|---|---|---|---|---|
| 1 | Functions: Working with Functions | MA-F1 | 4 | ✅ incl. domain/range, intercepts, graphical solving, modelling |
| 2 | Functions: Graphing Techniques | MA-F2 | 7 | ✅ incl. transformations, absolute value, inverse, composite functions |
| 3 | Trigonometry: Measure of Angles | MA-T1 | 1 | ✅ radians, exact values, unit circle |
| 4 | Trigonometry: Functions and Identities | MA-T2 | 9 | ✅ incl. graphs, transformations, Pythagorean identity, compound/double angle |
| 5 | Trigonometry: Equations | MA-T3 | 2 | ✅ incl. general solutions and identity-based equations |
| 6 | Calculus: Intro to Differentiation | MA-C1 | 3 | ✅ incl. first principles (limit definition), power rule, rate of change |
| 7 | Calculus: Differential Calculus | MA-C2 | 6 | ✅ incl. chain/product/quotient rules, standard derivs (trig/exp/log/a^x), tangents |
| 8 | Calculus: Applications of Differentiation | MA-C3 | 9 | ✅ incl. stationary points, concavity, curve sketching, optimisation, kinematics |
| 9 | Calculus: Integral Calculus | MA-C4 | 16 | ✅ incl. standard integrals, definite integrals, area, trapezoidal rule |
| 10 | Exponential and Logarithmic Functions | MA-E1 | 5 | ✅ incl. log laws, e and ln, solving equations, growth/decay modelling |
| 11 | Statistics: Probability and Discrete Distributions | MA-S1 | 4 | ✅ incl. Venn diagrams, conditional probability, independence, two-way tables |
| 12 | Statistics: Descriptive and Bivariate | MA-S2 | 5 | ✅ incl. spread, box plots, correlation, regression, residuals |
| 13 | Statistics: Random Variables | MA-S3 | 3 | ✅ incl. z-scores, normal distribution, Var(X) and SD(X) |
| 14 | Financial Mathematics | MA-M1 | 11 | ✅ incl. sequences/series, limiting sums, compound interest, annuities, loans |

**Gaps filled in this audit pass (2026-06-15):**
- Added first-principles limit formula and 2 MCQ questions → `rate-of-change` lesson (MA-C1)
- Added `d/dx(a^x) = a^x ln a` formula and 2 MCQ questions → `standard-derivatives` lesson (MA-C2)
- Added 3 composite function questions `f(g(x))` → `modelling-with-functions` lesson (MA-F2)
- Added `Var(X)` and `σ(X)` formulas and 3 questions → `random-variables` lesson (MA-S3)

**Note:** Legacy `ExplicitLesson[]` format — not using the `buildLesson` override pattern.
Seeded via `year12AdvancedLessonSets` in `scripts/seed-question-bank.ts`.
Routing via `lib/year12AdvancedRoutes.ts` (separate from `newCourseCatalog.ts`).

---

## Year 12 Extension 1 ✅ Complete — Audited against NSW 2024 syllabus (2026-06-15)

`year-12-extension-1` — `available`. Override file: `lib/lessons/year12Extension1/`.
**48 lessons / 862 questions.** All 6 NSW 2024 ME1-12 focus areas fully addressed. Audited dot-by-dot against the NSW Mathematics Extension 1 11–12 Syllabus (2024). First HSC 2027.

| # | NSW Focus Area | Outcome | Lessons | Status |
|---|---|---|---|---|
| 1 | Proof by Mathematical Induction | ME1-12-01 | 5 | ✅ incl. revision, sums, divisibility, error identification |
| 2 | Introduction to Vectors | ME1-12-02 | 16 | ✅ incl. revision, dot product, projections, motion, projectile (parametric) |
| 3 | Inverse Trigonometric Functions | ME1-12-03 | 7 | ✅ incl. revision, properties, differentiation, integration |
| 4 | Further Calculus Skills | ME1-12-04 | 5 | ✅ incl. revision, parametric derivatives, substitution, trig integration |
| 5 | Further Applications of Calculus | ME1-12-05 | 11 | ✅ incl. revision, polynomial zeroes, Newton’s cooling, volumes, slope fields |
| 6 | Binomial Distribution + Sampling | ME1-12-06 | 7 | ✅ incl. revision, Bernoulli, binomial, CLT, sampling distribution |

**Note:** `kinematics` (4 lessons — Year 11 Ext1 prior knowledge) and `projectile-motion` (4 lessons — calculus approach) are retained as supplementary units outside ME1-12-02 scope.

---


## Year 12 Extension 2 ✅ Depth pass complete

`year-12-extension-2` — `available`. Override file: `lib/lessons/year12Extension2/`.
Class Maths: 5 topics / 40 subtopics. Nova: 5 units / 25 lessons (+8 from depth pass).

- [x] Proof (4 lessons: contradiction, contrapositive, algebraic inequalities, **mathematical induction** ✅)
- [x] Vectors in Three Dimensions (4 lessons)
- [x] Complex Numbers (6 lessons: arithmetic, modulus/argument, Argand, polar/De Moivre, **roots of unity** ✅, **complex polynomials** ✅)
- [x] Calculus (6 lessons: method selection, IBP, reduction formulae, **partial fractions** ✅, **t-substitution** ✅, **trig identity integration** ✅)
  - [ ] Volumes of revolution (planned later phase)
- [x] Mechanics (5 lessons: rectilinear, SHM, circular, **resisted motion** ✅, **projectile with resistance** ✅)

**Depth pass: +8 lessons authored. 481 questions seeded. ✅ COMPLETE.**

---

## Depth Targets (all courses)

Class Mathematics average subtopics per topic: ~7.
Nova average lessons per unit: ~4–5.

| Course | Current lessons | Target | Status |
|---|---|---|---|
| Year 11 Standard | 76 (8 units) | ~76 | ✅ Depth pass + Priority 1–3 complete; NSW slug alignment 2026-06-15 |
| Year 12 Standard 2 | 35 (6 units) | ~35 | ✅ Depth pass complete + 4 breadth lessons |
| Year 12 Advanced | 91 (13 units) | ~64 subtopics | ✅ Depth pass complete + audited 2026-06-15 |
| Year 12 Extension 2 | 25 (5 units) | ~40 subtopics | ✅ Depth pass complete |
| Year 12 Standard 1 | 22 (5 units) | 7 NSW topics | ✅ Audited 2026-06-15; 1 minor gap (credit cards) |
| Year 12 Extension 1 | 30 (8 units) | ~28 subtopics | ✅ Depth pass complete — 520 questions seeded |
| Year 11 Advanced | 54 (8 units) | ~90 subtopics | 🔄 Missing equations/inequations, coord geometry, trig phase 3 |
| Year 9 / Year 10 variants | — | — | 🔄 Promote Advanced + Core to available |
| Year 8 | 59 (10 units) | ~111 subtopics | 🔄 4 units missing vs Class Maths |
| Year 7 | 0 | ~117 subtopics | ⬜ Not started |

---

## Priority Order

1. ~~**Year 12 Extension 2 depth**~~ ✅ Complete — 25 lessons, 481 questions
2. ~~**Year 12 Standard 2 depth**~~ ✅ Complete — 35 lessons (breadth pass ongoing), 665 questions
3. ~~**Year 12 Advanced depth**~~ ✅ Complete — 91 lessons, 1715 questions (Probability unit added)
4. ~~**Year 12 Extension 1 depth**~~ ✅ Complete — 30 lessons, 520 questions (8 units, 100% topic breadth)
5. **Year 12 Standard 1** — audited 2026-06-15; 4 lessons added (bivariate data, bearings, relative frequency); 1 gap remains (credit card content in MST-12-S1-03); promote to `available` after adding credit cards
6. **Year 11 Advanced gaps** — equations/inequations unit, coordinate geometry unit, trig identities phase 3
7. **Year 9 / Year 10 variants** — promote Advanced and Core to `available`
8. **Year 8 depth** — 4 missing units vs Class Maths 14-topic target (ratios/rates, index laws, algebraic fractions, additional data)
9. **Year 7** — new course, not yet started
