# Nova Maths — Course Structure Checklist

> Target: match Class Mathematics NSW structure (17 pathways, ~172 topics, ~1,204 subtopics).
> Source audit: CLASS_MATHEMATICS_NSW_STRUCTURE_REPORT.md
> Last updated: 2026-06-15 (session 4 — Ext 1depth pass COMPLETE: 30 lessons, 520 questions)

---

## Quick Status

> **Depth** — quality of individual lessons that exist: ✅ Full (19Q + worked examples + teaching + common mistakes) | ⬜ None
> **Topic breadth** — Nova units covered out of NSW curriculum topics (Class Mathematics is the reference implementation of the NSW syllabus).
> **Subtopic breadth** — % of Class Maths subtopics that have a Nova lesson. Raw % understates real coverage because Nova lessons are ~2× longer than a Class Maths subtopic.

| Course | Nova lessons | NSW curriculum (topics / subtopics) | Topic breadth | Subtopic breadth | Depth |
|---|---|---|---|---|---|
| Year 7 Mathematics | 0 | 13 / 117 | 0 / 13 (0%) | 0% | ⬜ None |
| Year 8 Mathematics | 59 (10 units) | 14 / 111 | 10 / 14 (71%) | ~53% | ✅ Full |
| Year 9 Mathematics | 53 (8 units) | 13 / 82 | 8 / 13 (62%) | ~65% | ✅ Full |
| Year 9 Mathematics Advanced | 53 (8 units) | 14 / 109 | 8 / 14 (57%) | ~49% | ✅ Full |
| Year 9 Mathematics Core | ~40 (8 trimmed) | 13 / 82 | 8 / 13 (62%) | ~49% | ✅ Full |
| Year 10 Mathematics | ~56 (10 units) | — / — | — | — | ✅ Full |
| Year 10 Mathematics Advanced | ~56 (10 units) | 16 / 128 | 10 / 16 (63%) | ~44% | ✅ Full |
| Year 10 Mathematics Core | ~40 (10 trimmed) | 12 / 76 | 10 / 12 (83%) | ~53% | ✅ Full |
| Year 11 Standard | 63 (9 units) | 9 / 63 | 9 / 9 (100%) | ~100% | ✅ Full |
| Year 11 Advanced | 54 (8 units) | 11 / 90 | 8 / 11 (73%) | ~60% | ✅ Full |
| Year 11 Extension | 25 (5 units) | 5 / 30 | 5 / 5 (100%) | ~83% | ✅ Full |
| Year 12 Standard 1 | 18 (5 units) | 7 / 29 | 5 / 7 (71%) | ~62% | ✅ Full |
| Year 12 Standard 2 | 35 (6 units) | 10 / 59 | 6 / 10 (60%) | ~59% | ✅ Full |
| Year 12 Advanced | 91 (13 units) | 11 / 64 | 13 / 11 (118%) | ~142% | ✅ Full |
| Year 12 Extension 1 | 30 (8 units) | 7 / 28 | 8 / 8 (100%) | ~100% | ✅ Full |
| Year 12 Extension 2 | 25 (5 units) | 5 / 40 | 5 / 5 (100%) | ~63% | ✅ Full |

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

## Year 11 Standard 🔄

`year-11-standard` — `available`. Override file: `lib/lessons/year11Standard/`.
Class Maths 2026: 9 topics / 63 subtopics. Nova: 9 units / 45 lessons. Gap: **18 lessons** across all units.
Depth pass completed 2026-06-14.

### Formulas and Equations (7 / ~7) ✅

- [x] Substitution, Formulae and Equations
- [x] Changing the Subject of a Formula
- [x] Formulae and Equations Exam Practice
- [x] **Solving Linear Equations** — dedicated solving lesson (isolating unknowns, checking solutions, multi-step)
- [x] **Non-linear Models in Context** — quadratic/practical non-linear models (stopping distance, BMI, area contexts)
- [x] **Simultaneous Equations** — graphical method, two-model intersection in practical contexts
- [x] **Inequalities in Context** — reading inequality notation, solving simple inequalities, practical constraint problems

### Linear Relationships (7 / ~7) ✅

- [x] Linear Relationships and Graphs
- [x] Direct Variation and Practical Linear Models
- [x] Linear Relationships Exam Practice
- [x] **Constructing Linear Models** — writing rules from word descriptions, two-point forms, tables to rules
- [x] **Piecewise and Step Functions** — multi-rate models, different costs in different ranges, step tariffs
- [x] **Break-even Analysis** — comparing two linear models, finding intersection, cost vs revenue contexts
- [x] **Practical Limitations of Linear Models** — domain restrictions, extrapolation warnings, realistic ranges

### Earning Money (7 / ~7) ✅

- [x] Wages, Salaries and Payslips
- [x] Overtime, Penalty Rates and Allowances
- [x] Commission and Piecework
- [x] Tax, Deductions and Net Pay
- [x] Earning Money Exam Practice
- [x] **Leave Entitlements and Superannuation** — annual leave, leave loading at 17.5%, super guarantee at 11%, calculating employer contributions
- [x] **Government Benefits and Allowances** — Youth Allowance, Centrelink payments, Family Tax Benefit, means testing with income-free area

### Managing Money (7 / ~7) ✅

- [x] Budgets and Cash Flow
- [x] Saving, Spending and Financial Goals
- [x] Simple Interest
- [x] Comparing Financial Decisions
- [x] Managing Money Exam Practice
- [x] **Credit Cards and Consumer Finance** — monthly interest (rate÷12), minimum payments, new balance after payment, BNPL instalments
- [x] **GST, Discounts and Consumer Arithmetic** — GST-inclusive price (×1.10), pre-GST price (÷1.10), GST amount (÷11), discounts, unit pricing

### Applications of Measurement (7 / ~7) ✅

- [x] Units, Accuracy and Measurement Error
- [x] Area, Surface Area and Volume
- [x] Energy, Mass and Practical Measurement
- [x] Applications of Measurement Exam Practice
- [x] **Composite Shapes and Land Measurement** — irregular/composite shapes, combining standard shapes, land and garden area problems
- [x] **Density, Concentration and Practical Rates** — density (mass/volume), fuel consumption, population density, concentration, unit-rate reasoning
- [x] **Scale Drawings and Models** — scale factor, interpreting plans and maps, enlargement/reduction, construction contexts

### Time and Location (7 / ~7) ✅

- [x] Time Calculations and Timetables
- [x] Time Zones, UTC and the International Date Line
- [x] Map Scales, Grid References and Location
- [x] Time and Location Exam Practice
- [x] **Compass Bearings and Navigation** — true north, true bearings (3-figure notation), back bearings, direction problems
- [x] **Speed, Distance and Time** — D = ST in travel contexts, average speed, multi-leg journeys, time elapsed
- [x] **Latitude, Longitude and Global Location** — GPS coordinates, distance on meridians, international navigation basics

### Networks, Paths and Trees (7 / ~7) ✅

- [x] Network Diagrams and Terminology
- [x] Paths, Trails, Circuits and Connectivity
- [x] Trees and Minimum Spanning Trees
- [x] Network Applications Exam Practice
- [x] **Euler Paths and Circuits** — odd-degree vertex counts, Euler path/circuit conditions, Chinese Postman concept
- [x] **Weighted Networks and Shortest Paths** — systematic route listing and comparison, delivery and cable-routing contexts
- [x] **Network Flow and Connectivity** — bridges, cut edges, pendant vertices, network reliability and redundancy

### Probability and Relative Frequency (7 / ~7) ✅

- [x] Outcomes, Sample Space and Probability
- [x] Relative Frequency and Experimental Probability
- [x] Two-Way Tables and Probability
- [x] Probability Exam Practice
- [x] **Venn Diagrams** — two-circle Venn diagrams, union, intersection, complement, only-one-set, neither region, set notation
- [x] **Conditional Probability** — P(A|B) by restricting sample space, table-based denominator, independent vs dependent events
- [x] **Tree Diagrams** — multi-stage probability, multiply along branches, add paths, with and without replacement

### Data Analysis (7 / ~7) ✅

- [x] Data Displays and Summary Statistics
- [x] Interpreting Data and Outliers
- [x] Data Analysis Exam Practice
- [x] **Grouped Data and Frequency Tables** — class intervals, modal class, frequency polygons, estimating mean from grouped data
- [x] **Box Plots and the Five-Number Summary** — Q1, Q2, Q3, IQR, whiskers, identifying outliers by IQR rule, comparing two distributions
- [x] **Stem-and-Leaf Plots** — back-to-back stem-and-leaf, reading and comparing two datasets, median from stem-and-leaf
- [x] **Time Series and Trend Lines** — plotting data over time, describing trends, making cautious predictions

---

**Depth pass summary (2026-06-14):** 28 lessons authored across all 9 units. ✅ COMPLETE.
**Final tally:** Formulas+Equations ✅ (+4). Linear Relationships ✅ (+4). Earning Money ✅ (+2). Data Analysis ✅ (+4). Networks ✅ (+3). Probability ✅ (+3). Measurement ✅ (+3). Time/Location ✅ (+3). Managing Money ✅ (+2). Total: +28 lessons, 63 lessons across 9 units.

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

## Year 12 Standard 1 🔄

`year-12-standard-1` — `in_progress`. Override file: `lib/lessons/year12Standard1.ts`.
Class Maths: 7 topics / 29 subtopics.

- [x] Algebraic Relationships (5 lessons)
- [x] Rates, Ratios and Measurement (4 lessons — trig + rates + exam practice)
- [x] Investments, Loans and Annuities (3 lessons)
- [x] Statistics and Data (3 lessons)
- [x] Measurement and Geometry (3 lessons)
- [ ] Two missing topics vs Class Maths 7-topic target (likely Networks and/or further Measurement)
- [ ] Promote to `available`

---

## Year 12 Standard 2 🔄 Breadth pass in progress

`year-12-standard-2` — `available`. Override file: `lib/lessons/year12Standard2/`.
Class Maths: 10 topics / 59 subtopics. Nova: 6 units / 35 lessons (↑ from 31).

- [x] Algebraic Relationships (7 lessons — linear-inequalities-modelling, working-with-formulae-substitution)
- [x] Trigonometry, Ratios and Rates (7 lessons — **+2 breadth pass 2026-06-15**)
  - [x] sine-rule-cosine-rule-area-triangle
  - [x] non-right-angled-trigonometry
  - [x] ratios-rates-unit-conversions
  - [x] **bearings-navigation-problems** ← NEW (MS-M6 NSW syllabus gap)
  - [x] **time-zones-conversions** ← NEW (MS-M7 NSW syllabus gap)
  - [x] **ambiguous-case-sine-rule** ← NEW (MS-M6 NSW syllabus gap)
  - [x] practical-rates-ratios-exam-practice
- [x] Surface Area and Volume (3 lessons)
- [x] Investments, Loans and Annuities (7 lessons — **+1 breadth pass 2026-06-15**)
  - [x] investment-compound-interest
  - [x] depreciation-loans
  - [x] annuities-regular-payments
  - [x] **present-value-annuities** ← NEW (MS-F5 NSW syllabus gap)
  - [x] comparing-investments-risk-return
  - [x] credit-cards-consumer-decisions
  - [x] financial-decision-making-exam-practice
- [x] Bivariate Data and Normal Distribution (6 lessons)
- [x] Networks and Critical Path Analysis (5 lessons)

**Depth pass complete 2026-06-14:** +7 lessons. **Breadth pass 2026-06-15:** +4 lessons (bearings, time zones, ambiguous case, PV annuities).
Seed total: 665 questions (35 lessons × 19 questions).

**Remaining NSW syllabus gaps (priority order):**
- [x] ~~Ambiguous case of sine rule (MS-M6)~~ ✅ 2026-06-15
- [x] ~~Present value of annuities (MS-F5)~~ ✅ 2026-06-15
- [ ] Straight-line (flat-rate) depreciation (MS-F4)
- [ ] Residual plots and interpolation vs extrapolation (MS-S4)

---

## Year 12 Advanced ✅ Depth pass complete

`year-12-advanced` — `available`. Status: **available**. Lesson files: `lib/lessons/*.ts` (legacy top-level format, not in a subdirectory).
Catalogue: `lib/courseUnits.ts` + `lib/year12AdvancedRoutes.ts` (separate from `newCourseCatalog.ts`).
Class Maths: 11 topics / 64 subtopics. **Nova: 13 units / 91 lessons — exceeds target.**

- [x] Differential Calculus (12 lessons) — `lib/lessons/differentialCalculus.ts`
- [x] Differentiation Techniques (5 lessons) — `lib/lessons/differentiationTechniques.ts`
- [x] Applications of Differentiation (6 lessons) — `lib/lessons/applicationsDifferentiation.ts`
- [x] Integral Calculus (10 lessons) — `lib/lessons/integralCalculus.ts`
- [x] Further Integral Calculus (6 lessons) — `lib/lessons/furtherIntegralCalculus.ts`
- [x] Functions and Graphing Techniques (11 lessons) — `lib/lessons/functionsGraphingTechniques.ts`
- [x] Trigonometric Functions and Graphs (7 lessons) — `lib/lessons/trigonometricFunctionsGraphs.ts`
- [x] Further Trigonometry (5 lessons) — `lib/lessons/furtherTrigonometry.ts`
- [x] Exponential and Logarithmic Functions (5 lessons) — `lib/lessons/exponentialLogarithmicFunctions.ts`
- [x] Sequences, Series and Financial Mathematics (5 lessons) — `lib/lessons/sequencesSeriesFinancialMaths.ts`
- [x] Financial Mathematics (6 lessons) — `lib/lessons/financialMathematics.ts`
- [x] Statistical Analysis (8 lessons) — `lib/lessons/statisticalAnalysis.ts`
- [x] Probability (4 lessons — NEW) — `lib/lessons/probability.ts`
  - probability-basics-venn-diagrams: axioms, complement, addition rule, Venn diagrams
  - conditional-probability-tree-diagrams: P(A|B), tree diagrams, without-replacement
  - independence-multiplication-rule: P(A∩B)=P(A)P(B), with/without replacement
  - probability-exam-practice: two-way tables, mixed HSC practice

**Note:** This course uses a legacy lesson format (`ExplicitLesson[]` arrays, not the `buildLesson` override pattern). Seeding is handled via `year12AdvancedLessonSets` in `seed-question-bank.ts`. Routing is via `year12AdvancedRoutes.ts`, not the new course catalog.

**Depth pass complete 2026-06-14:** Added Probability unit (MA-P1) — the only missing syllabus strand. 91 lessons / 1715 seeded questions total.

---

## Year 12 Extension 1 ✅

`year-12-extension-1` — `available`. Override file: `lib/lessons/year12Extension1/`.
Class Maths: 7 topics / 28 subtopics.

- [x] Proof by Mathematical Induction (3 lessons)
- [x] Introduction to Vectors (4 lessons)
- [x] Inverse Trigonometric Functions (3 lessons)
- [x] Further Calculus Skills (4 lessons)
- [x] Further Applications of Calculus (4 lessons)
- [x] The Binomial Distribution (4 lessons)

**Batch 1 complete (2026-06-15):** 2 new units added — Kinematics and Projectile Motion. 24 lessons / 406 seeded questions.
**Batch 2 complete (2026-06-15):** 26 lessons / 444 seeded questions.
**Batch 3 complete (2026-06-15):** 28 lessons / 482 seeded questions.
**Batch 4 complete (2026-06-15):** 30 lessons / 520 seeded questions. ✅ COMPLETE.

- [x] Rates of Change and Kinematics (`kinematics` unit) — lesson 1: velocity and acceleration from displacement
- [x] Rates of Change and Kinematics (`kinematics` unit) — lesson 2: displacement from velocity by integration
- [x] Rates of Change and Kinematics (`kinematics` unit) — lesson 3: analysing motion, direction changes and total distance
- [x] Rates of Change and Kinematics (`kinematics` unit) — lesson 4: kinematics exam practice
- [x] Projectile Motion (`projectile-motion` unit) — lesson 1: setting up projectile equations
- [x] Projectile Motion (`projectile-motion` unit) — lesson 2: maximum height and time
- [x] Projectile Motion (`projectile-motion` unit) — lesson 3: range and time of flight
- [x] Projectile Motion (`projectile-motion` unit) — lesson 4: projectile exam practice

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
| Year 11 Standard | 63 (9 units) | ~63 | ✅ Depth pass complete |
| Year 12 Standard 2 | 35 (6 units) | ~35 | ✅ Depth pass complete + 4 breadth lessons |
| Year 12 Advanced | 91 (13 units) | ~64 subtopics | ✅ Depth pass complete (exceeds) |
| Year 12 Extension 2 | 25 (5 units) | ~40 subtopics | ✅ Depth pass complete |
| Year 12 Standard 1 | 18 (5 units) | ~29 subtopics | 🔄 Missing ~2 topics |
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
5. **Year 12 Standard 1** — add missing ~2 topics (likely Networks + further Measurement); promote to `available`
6. **Year 11 Advanced gaps** — equations/inequations unit, coordinate geometry unit, trig identities phase 3
7. **Year 9 / Year 10 variants** — promote Advanced and Core to `available`
8. **Year 8 depth** — 4 missing units vs Class Maths 14-topic target (ratios/rates, index laws, algebraic fractions, additional data)
9. **Year 7** — new course, not yet started
