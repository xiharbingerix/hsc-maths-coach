# Nova Maths — Course Structure Checklist

> Target: match Class Mathematics NSW structure (17 pathways, ~172 topics, ~1,204 subtopics).
> Source audit: CLASS_MATHEMATICS_NSW_STRUCTURE_REPORT.md
> Last updated: 2026-06-14

---

## Quick Status

| Course | Nova units | Nova lessons | Class Maths target | Status |
|---|---|---|---|---|
| Year 7 Mathematics | 0 | 0 | 13 topics / 117 subtopics | ⬜ Not started |
| Year 8 Mathematics | 10 | 59 | 14 topics / 111 subtopics | ✅ Available |
| Year 9 Mathematics | 8 | 53 | 13 topics / 82 subtopics (Core) | ✅ Available |
| Year 9 Mathematics Advanced | 8 | 53 | 14 topics / 109 subtopics | 🔄 In progress |
| Year 9 Mathematics Core | 8 trimmed | ~40 | 13 topics / 82 subtopics | 🔄 In progress |
| Year 10 Mathematics | 10 | ~56 | — | ✅ Available |
| Year 10 Mathematics Advanced | 10 | ~56 | 16 topics / 128 subtopics | 🔄 In progress |
| Year 10 Mathematics Core | 10 trimmed | ~40 | 12 topics / 76 subtopics | 🔄 In progress |
| Year 11 Standard | 9 | 63 | 9 topics / 63 subtopics (2026) | ✅ Depth pass complete |
| Year 11 Advanced | 8 | 54 | 11 topics / 90 subtopics (2026) | ✅ Available |
| Year 11 Extension | 5 of 5 | 25 | 5 topics / 30 subtopics (2026) | ✅ Available |
| Year 12 Standard 1 | 5 | 18 | 7 topics / 29 subtopics | 🔄 In progress |
| Year 12 Standard 2 | 6 | 31 | 10 topics / 59 subtopics | ✅ Depth pass complete |
| Year 12 Advanced | 12 | 86 | 11 topics / 64 subtopics | ✅ Available |
| Year 12 Extension 1 | 6 | 22 | 7 topics / 28 subtopics | ✅ Available |
| Year 12 Extension 2 | 5 | 25 | 5 topics / 40 subtopics | ✅ Depth pass complete |

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

## Year 12 Standard 2 ✅ Depth pass complete

`year-12-standard-2` — `available`. Override file: `lib/lessons/year12Standard2/`.
Class Maths: 10 topics / 59 subtopics. Nova: 6 units / 31 lessons.

- [x] Algebraic Relationships (7 lessons — added linear-inequalities-modelling, working-with-formulae-substitution)
- [x] Trigonometry, Ratios and Rates (4 lessons)
- [x] Surface Area and Volume (3 lessons — NEW unit: surface-area-prisms-cylinders, volume-prisms-cylinders-spheres, composite-solids-practical)
- [x] Investments, Loans and Annuities (6 lessons — added comparing-investments-risk-return, credit-cards-consumer-decisions)
- [x] Bivariate Data and Normal Distribution (6 lessons — includes relative frequency/probability Phase 1)
- [x] Networks and Critical Path Analysis (5 lessons — includes network flow Phase 1)

**Depth pass complete 2026-06-14:** +7 lessons added across 2 existing units plus 1 new unit.
Seed total: 589 questions (31 lessons × 19 questions).

---

## Year 12 Advanced ✅

`year-12-advanced` — `available`. Status: **available**. Lesson files: `lib/lessons/*.ts` (legacy top-level format, not in a subdirectory).
Catalogue: `lib/courseUnits.ts` + `lib/year12AdvancedRoutes.ts` (separate from `newCourseCatalog.ts`).
Class Maths: 11 topics / 64 subtopics. **Nova: 12 units / 86 lessons — exceeds target.**

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

**Note:** This course uses a legacy lesson format (`ExplicitLesson[]` arrays, not the `buildLesson` override pattern). Seeding is handled via `year12AdvancedLessonSets` in `seed-question-bank.ts`. Routing is via `year12AdvancedRoutes.ts`, not the new course catalog.

**Possible depth gaps vs Class Maths (for future consideration):**
- [ ] Probability unit (conditional probability, independence) — may be covered within Statistical Analysis
- [ ] Discrete probability distributions — check if in Statistical Analysis or missing

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

**Gap vs Class Maths 7-topic target:**
- [ ] One additional topic not yet mapped — possibly Rates of Change or Projectile Motion as a standalone unit

---

## Year 12 Extension 2 ✅ Depth pass complete

`year-12-extension-2` — `in_progress`. Override file: `lib/lessons/year12Extension2/`.
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

Courses that need a depth pass before they match Class Maths granularity:

| Course | Current avg lessons/unit | Target avg | Gap |
|---|---|---|---|
| Year 11 Standard | 3.9 | ~7 | +28 total (see unit-by-unit breakdown above) |
| Year 12 Standard 2 | 4.8 | ~6 | +1–2 per unit |
| Year 12 Standard 1 | 3.6 | ~4 | ~+1 per unit |
| Year 12 Extension 1 | 3.7 | ~4 | ~+1 per unit |
| Year 12 Extension 2 | 5.0 | ~8 | ✅ Depth pass complete |

---

## Priority Order

1. ~~**Year 12 Extension 2 depth**~~ ✅ Complete — 25 lessons, 481 questions
2. **Year 12 Standard 2 depth** — 5 units covering only half the Class Maths topics
3. **Year 11 Advanced gaps** — equations/inequations, coordinate geometry units
4. **Year 12 Standard 1** — add missing 2 topics, promote to available
5. **Year 9 / Year 10 variants** — promote Advanced and Core to available
6. **Year 8 depth** — 4 missing units vs Class Maths 14-topic target (ratios/rates, index laws, etc.)
7. **Year 7** — new course, not yet started
