# Nova Maths — Course Structure Checklist

> **Objective:** High-quality lessons and question content across the entire NSW syllabus, mapped to syllabus sections with sufficient lessons to cover all skills and content in the Content section. Each lesson: 19 questions, worked examples, Feynman teaching, and common mistakes. Each focus area: one revision lesson activating the prior knowledge stated in the syllabus teaching advice, plus content lessons per dot-point group.
> **Standard:** NSW syllabuses (2024 versions, implementation from 2026). Source of truth: [curriculum.nsw.edu.au](https://curriculum.nsw.edu.au).
> Last updated: 2026-06-15 — Ext 1 syllabus audit complete; objective standard adopted. Year 12 Standard 2 Priority 1–3 build complete (23 lessons, 1102 questions).

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
| Year 11 Standard | 63 (9 units) | 8 focus areas | ~85% — detail below | 0 | 🔄 Audit complete; 13 lessons planned |
| Year 11 Advanced | 54 (8 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 11 Extension 1 | 25 (5 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 12 Standard 1 | 18 (5 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 12 Standard 2 | 58 (6 units) | 10 topics | ~95% — detail below | 10 | ✅ Priority 1–3 complete |
| Year 12 Advanced | 91 (13 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 12 Extension 1 | 30 (8 units) | 6 focus areas (ME1-12-01–06) | ~55% — detail below | 0 | 🔄 Gaps identified |
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

## Year 11 Standard 🔄 Syllabus audit complete (2026-06-15)

`year-11-standard` — `available`. Override file: `lib/lessons/year11Standard/`.

**Reference:** NSW Mathematics Standard 11–12 Syllabus (2024). Teaching begins Term 1 2026.
URL: https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-standard-11-12-2024/content/year-11/

**Objective:** Every NSW 2024 Year 11 Standard syllabus content dot point must be addressed by at least one Nova lesson. Each focus area must also have a revision lesson drawing on the "Prior knowledge, skills and understanding" teaching advice.

**Current state (2026-06-15):** 63 lessons across 9 Nova units (depth pass complete 2026-06-14). Syllabus audit completed 2026-06-15: 5 Priority 1 gaps + 8 revision lessons needed = 13 new lessons.

**Note on "Probability and Relative Frequency" unit:** The 2024 NSW Year 11 Standard syllabus has **8 focus areas** — "Relative Frequency and Probability" is NOT a Year 11 Standard focus area. It is a Year 12 Standard 2 topic (MST-12-S2-09). The 7 Nova Year 11 probability lessons (outcomes-sample-space-probability etc.) exist from the old 2017 syllabus and are retained for student value but fall outside the 2024 Year 11 scope. Students who have studied Year 11 Standard will encounter probability as Year 12 Standard 2 content.

---

### Syllabus structure — 8 focus areas

| # | NSW Focus Area | Outcome | Nova lessons | Coverage |
|---|---|---|---|---|
| 1 | Formulas and equations | MST-11-01 | 7 | ⚠️ BAC + medication dosage dot points missing |
| 2 | Linear relationships | MST-11-01 | 7 | ✅ Full |
| 3 | Earning money | MST-11-02 | 7 | ⚠️ Medicare levy + PAYG tax tables missing |
| 4 | Managing money | MST-11-02 | 7 | ⚠️ Vehicle costs missing |
| 5 | Applications of measurement | MST-11-03 | 7 | ⚠️ Trapezoidal rule missing |
| 6 | Time and location | MST-11-04 | 7 | ✅ Full |
| 7 | Networks, paths and trees | MST-11-05 | 7 | ✅ Full |
| 8 | Data analysis | MST-11-06 | 7 | ⚠️ Survey design + sampling methods missing |

---

### 1. Formulas and Equations — MST-11-01

**Prior knowledge (revision lesson basis):** Inverse operations; simplifying algebraic expressions; substituting into algebraic expressions; representing word problems as algebraic expressions; square numbers and square roots; solving equations.

#### Focus areas and dot points

- [x] Substitute numbers into linear and non-linear expressions and formulas → `substitution-formulae-equations`
- [x] Evaluate the subject of a formula, given the value of other variables → `substitution-formulae-equations`, `changing-subject-formula`
- [x] Calculate speed, distance, time (with unit changes) and stopping distances → `substitution-formulae-equations`
- [ ] **Apply BAC formulas (male/female) to calculate and interpret blood alcohol content** → ❌ MISSING
- [ ] **Apply Time = BAC/0.015 to determine hours to reach zero BAC** → ❌ MISSING
- [ ] **Identify and explain limitations of BAC estimation methods** → ❌ MISSING
- [ ] **Calculate medication dosages (Fried's, Young's, Clark's formulas)** → ❌ MISSING
- [x] Apply given formulas to solve problems in various contexts → `substitution-formulae-equations`, `nonlinear-models-context`
- [x] Change subject of linear and non-linear formulas (quadratic y=ax²+c) → `changing-subject-formula`
- [x] Represent word problem as equation, solve and interpret → `solving-linear-equations`
- [x] *(spreadsheet use — noted in exam practice)*

#### Required new lessons
- [ ] **`bac-formulas-medication-dosage`** — BAC_male/female; Time=BAC/0.015; limitations; Fried's/Young's/Clark's
- [ ] **`formulas-equations-revision`** — Inverse operations, substitution, word problems as equations, square roots

---

### 2. Linear Relationships — MST-11-01

**Prior knowledge (revision lesson basis):** Creating and using algebraic expressions; substitution into formulas; solving linear equations; plotting points on the Cartesian plane and joining to form a line.

#### Focus areas and dot points

- [x] Determine y-intercept and gradient from a graph → `linear-relationships-graphs`
- [x] Determine equation y=mx+c → `linear-relationships-graphs`
- [x] Construct a straight-line graph → `constructing-linear-models`
- [x] Model linear relationships in context; interpret features → `constructing-linear-models`, `direct-variation-practical-linear-models`
- [x] Interpolate and extrapolate from a linear model → `practical-limitations-linear-models`
- [x] Identify limitations of linear model in context → `practical-limitations-linear-models`
- [x] Recognise direct variation y=kx → `direct-variation-practical-linear-models`
- [x] Graph and analyse y=kx → `direct-variation-practical-linear-models`

#### Required new lessons
- [ ] **`linear-relationships-revision`** — Plotting Cartesian points, gradient definition, reading graphs, proportional tables

---

### 3. Earning Money — MST-11-02

**Prior knowledge (revision lesson basis):** Converting between percentages, fractions and decimals; calculating percentages of quantities; calculations involving money; conversion of time periods.

#### Focus areas and dot points

- [x] Solve problems involving salaries → `wages-salaries-payslips`
- [x] Solve problems involving wages (penalty rates, weekends, public holidays) → `overtime-penalty-rates-allowances`
- [x] Calculate earnings from commission, sliding scale, piecework, royalties → `commission-piecework`
- [x] Calculate weekly/fortnightly/monthly/yearly earnings → `wages-salaries-payslips`, `commission-piecework`
- [x] Calculate leave loading (% of eligible normal pay) → `leave-entitlements-superannuation`
- [x] Determine taxable income by examining allowable deductions → `tax-deductions-net-pay`
- [ ] **Determine tax payable by interpreting and applying tax tables** → ⚠️ Nova uses formula, not tables
- [ ] **Calculate weekly/fortnightly/monthly PAYG tax to deduct** → ⚠️ partial
- [ ] **Calculate the Medicare levy from taxable income** → ❌ MISSING
- [x] Calculate net earnings after deductions, taxation and Medicare levy → `tax-deductions-net-pay` ⚠️ (Medicare levy absent)
- [ ] **Determine if more tax payable or refund owed (tax return)** → ⚠️ partial
- [x] *(spreadsheet use — noted in exam practice)*

#### Required new lessons
- [ ] **`medicare-levy-tax-tables`** — Medicare levy (2% of taxable income); PAYG tax tables; tax return refund/payable calculation
- [ ] **`earning-money-revision`** — Percentages, fractions and decimals; percentage of a quantity; money calculations; time unit conversions

---

### 4. Managing Money — MST-11-02

**Prior knowledge (revision lesson basis):** Fractions, decimals and percentages; calculating percentage of a quantity; percentage increase/decrease; basic money and consumer arithmetic.

#### Focus areas and dot points

- [x] Apply discounts and markups → `gst-discounts-consumer-arithmetic`, `comparing-financial-decisions`
- [x] Solve problems involving GST → `gst-discounts-consumer-arithmetic`
- [x] Examine payment options involving interest; buying on terms → `comparing-financial-decisions`, `credit-cards-consumer-finance`
- [ ] **Calculate vehicle purchase costs (price, loan repayments, registration, insurance, fuel)** → ❌ MISSING
- [ ] **Examine ongoing vehicle costs** → ❌ MISSING
- [x] Calculate household costs from bills (electricity) → `energy-mass-practical-measurement`
- [x] Prepare a personal budget → `budgets-cash-flow`
- [x] Examine budgeting and saving strategies (emergency fund concept) → `saving-spending-financial-goals`

#### Required new lessons
- [ ] **`vehicle-costs-buying-running`** — Vehicle purchase (price, deposit, loan repayments); CTP, third-party, comprehensive insurance; registration; fuel costs; total cost of ownership
- [ ] **`managing-money-revision`** — Percentage increase/decrease; discounts; GST; reading bills; consumer arithmetic

---

### 5. Applications of Measurement — MST-11-03

**Prior knowledge (revision lesson basis):** Identifying and converting metric units; calculating perimeter and area of rectangles and triangles; reading and interpreting measurement problems; understanding surface area concepts.

#### Focus areas and dot points

- [x] Identify and convert between metric units (length, area, volume, capacity, mass) → `units-accuracy-measurement-error`
- [x] Apply scientific notation and standard prefixes → `units-accuracy-measurement-error` ⚠️ (nano–tera prefixes may be partial)
- [x] Perimeter and area of geometric shapes → `area-surface-area-volume`
- [x] Apply Pythagoras' theorem → `area-surface-area-volume` ⚠️ (may be minimal — check)
- [x] Calculate areas of irregular land by dissection → `composite-shapes-land-measurement`
- [ ] **Apply the Trapezoidal rule for estimating irregular areas and volumes** → ❌ MISSING
- [x] Surface area of prisms, cylinders, spheres → `area-surface-area-volume`
- [x] Volume and capacity → `area-surface-area-volume`

#### Required new lessons
- [ ] **`trapezoidal-rule-land-area`** — Trapezoidal rule A≈h/2×(d₁+2d₂+…+dₙ); estimating irregular block areas; applying to volume/capacity
- [ ] **`applications-measurement-revision`** — Metric unit conversions; perimeter/area of rectangles and triangles; practical measurement

---

### 6. Time and Location — MST-11-04

**Prior knowledge (revision lesson basis):** Converting between units of time; reading and interpreting timetables; understanding 12-hour and 24-hour time; basic number calculations.

#### Focus areas and dot points

- [x] Identify location using latitude, longitude and GPS → `latitude-longitude-global-location`
- [x] Apply 15° = 1 hour time difference → `latitude-longitude-global-location`
- [x] Convert between seconds, minutes, hours → `time-calculations-timetables`
- [x] Represent and convert 12-hour and 24-hour time → `time-calculations-timetables`
- [x] Solve elapsed time problems → `time-calculations-timetables`
- [x] Solve problems involving Australian time zones and daylight saving → `time-zones-utc-international-date-line`
- [x] Represent time differences using UTC → `time-zones-utc-international-date-line`

#### Required new lessons
- [ ] **`time-location-revision`** — 12/24-hour conversion; elapsed time; reading timetables; time unit conversions

---

### 7. Networks, Paths and Trees — MST-11-05

**Prior knowledge (revision lesson basis):** Reading tables and maps; understanding connections between objects; basic graph concepts from Stage 5.

#### Focus areas and dot points

**Network Concepts:**
- [x] Describe a network; define vertex, edge, weighted edge, directed edge, degree → `network-diagrams-terminology`
- [x] Construct network from table or map → `network-diagrams-terminology`
- [x] Solve problems using network diagrams → `network-diagrams-terminology`

**Shortest Paths and Spanning Trees:**
- [x] Define path, cycle, connected graph, tree → `paths-trails-circuits-connectivity`
- [x] Determine minimum spanning tree → `trees-minimum-spanning-trees`
- [x] Use MST to solve minimal connector problems → `trees-minimum-spanning-trees`
- [x] Identify shortest path (≤10 vertices) → `weighted-networks-shortest-paths`
- [x] Describe when shortest path is not contained in any MST → `weighted-networks-shortest-paths`

#### Required new lessons
- [ ] **`networks-revision`** — Reading tables and maps; connections between objects; basic graph/node concepts

---

### 8. Data Analysis — MST-11-06

**Prior knowledge (revision lesson basis):** Collecting and representing data; reading column graphs and dot plots; calculating mean, median and mode; understanding the concept of range.

#### Focus areas and dot points

**Data Collection:**
- [ ] **Identify an issue and pose a question; develop a survey** → ❌ MISSING
- [ ] **Apply questionnaire design principles (clear language, unambiguous questions)** → ❌ MISSING
- [ ] **Examine privacy, ethics and responsiveness to diverse groups** → ❌ MISSING
- [ ] **Compare systematic, self-selected, random and stratified sampling** → ❌ MISSING
- [ ] **Justify whether a sample is representative; identify potential faults** → ❌ MISSING

**Data Representation and Analysis:**
- [x] Classify data as numerical/categorical, discrete/continuous, quantitative/qualitative → `data-displays-summary-statistics` ⚠️ (discrete/continuous may be partial)
- [x] Represent numerical data as frequency tables and histograms → `grouped-data-frequency-tables`
- [x] Select and justify appropriate graph types → `data-displays-summary-statistics`
- [x] Identify distribution shape (symmetric, positively/negatively skewed) → `interpreting-data-outliers`
- [x] Interpret dot plots, line graphs, sector graphs, divided bar charts → `data-displays-summary-statistics`
- [x] Calculate mean, median, mode → `data-displays-summary-statistics`
- [x] Calculate range and standard deviation → `interpreting-data-outliers`
- [x] Compare datasets using centre and spread → `interpreting-data-outliers`
- [x] Determine quartiles, IQR → `box-plots-five-number-summary`
- [x] Represent datasets using box plots → `box-plots-five-number-summary`
- [x] Identify clusters, gaps, outliers → `interpreting-data-outliers`
- [x] Apply IQR outlier rule → `box-plots-five-number-summary`

#### Required new lessons
- [ ] **`data-collection-sampling-methods`** — Posing statistical questions; questionnaire design principles; sampling types (systematic, self-selected, random, stratified); privacy and ethics; evaluating representativeness
- [ ] **`data-analysis-revision`** — Reading graphs (column, dot plot); mean, median, mode from raw data; range; data types

---

### Implementation plan — required new lessons (priority order)

**Priority 1 — Entirely missing content (2024 syllabus dot points not addressed)**

| # | Lesson | Focus area | Notes | Status |
|---|---|---|---|---|
| 1 | `bac-formulas-medication-dosage` | Formulas and equations | BAC_male/female, Time=BAC/0.015, Fried's/Young's/Clark's | ⬜ |
| 2 | `medicare-levy-tax-tables` | Earning money | Medicare levy 2%, PAYG tables, tax return | ⬜ |
| 3 | `vehicle-costs-buying-running` | Managing money | Purchase price, loans, rego, insurance, fuel | ⬜ |
| 4 | `trapezoidal-rule-land-area` | Applications of measurement | A≈h/2×(d₁+2d₂+…+dₙ) for irregular areas | ⬜ |
| 5 | `data-collection-sampling-methods` | Data analysis | Questionnaire design, sampling methods, ethics | ⬜ |

**Priority 3 — Revision lessons (one per focus area, activating Year 10 prior knowledge)**

| # | Lesson slug | Prior knowledge activated | Status |
|---|---|---|---|
| 6 | `formulas-equations-revision` | Inverse operations, substitution, solving | ⬜ |
| 7 | `linear-relationships-revision` | Cartesian plane, gradient, reading graphs | ⬜ |
| 8 | `earning-money-revision` | Percentages, fractions, money, time conversions | ⬜ |
| 9 | `managing-money-revision` | Percentage increase/decrease, discounts, consumer arithmetic | ⬜ |
| 10 | `applications-measurement-revision` | Metric conversions, perimeter, area | ⬜ |
| 11 | `time-location-revision` | 12/24-hour time, elapsed time, timetables | ⬜ |
| 12 | `networks-revision` | Tables, maps, connections, basic graph concepts | ⬜ |
| 13 | `data-analysis-revision` | Reading graphs, mean/median/mode/range | ⬜ |

**Total new lessons to build: 13**

---

### Seed totals
- Baseline (2026-06-14 depth pass): **1197 questions** (63 lessons × 19 questions)
- Target after Priority 1–3: **1197 + 247 = 1444 questions** (13 new lessons × 19 questions)

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

## Year 12 Standard 2 ✅ Priority 1–3 complete (2026-06-15)

`year-12-standard-2` — `available`. Override file: `lib/lessons/year12Standard2/`.

**Reference:** NSW Mathematics Standard 11–12 Syllabus (2024). Teaching begins Term 4 2026. First HSC 2027.
URL: https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-standard-11-12-2024/content/year-12-tba2/

**Objective:** Every NSW syllabus content dot point must be addressed by at least one Nova lesson. Each topic must also have a revision lesson drawing on the "Prior knowledge, skills and understanding" teaching advice to activate Year 11 prerequisites before new content begins.

**Current state (2026-06-15):** 58 lessons across 6 Nova units (+ 3 legacy surface-area/volume units not in scope). All 23 planned lessons built: 6 Priority 1 (entirely missing content), 7 Priority 2 (significant coverage gaps), 10 Priority 3 (revision lessons). Total question bank: 1102 questions.

---

### Syllabus structure — 10 topics

| # | NSW Topic | Outcome | Nova lessons | Coverage |
|---|---|---|---|---|
| 1 | Algebraic relationships | MST-12-S2-01 | 9 | ✅ Full (incl. revision + reciprocal) |
| 2 | Investment and loans | MST-12-S2-02 | 7 | ✅ Full (incl. revision + shares + depreciation) |
| 3 | Annuities | MST-12-S2-03 | 5 | ✅ Full (incl. revision + factor tables + retirement) |
| 4 | Trigonometry | MST-12-S2-04 | 8 | ✅ Full (incl. revision + radians + elevation/depression) |
| 5 | Ratios and rates | MST-12-S2-05 | 7 | ✅ Full (incl. revision + energy + site plans + rainfall) |
| 6 | Network flow | MST-12-S2-06 | 4 | ✅ Full (incl. revision) |
| 7 | Critical path analysis | MST-12-S2-07 | 3 | ✅ Full (incl. revision + Gantt/dummy) |
| 8 | Bivariate data analysis | MST-12-S2-08 | 4 | ✅ Full (incl. revision) |
| 9 | Relative frequency and probability | MST-12-S2-09 | 5 | ✅ Full (incl. revision + multistage + expected freq) |
| 10 | The normal distribution | MST-12-S2-10 | 3 | ✅ Full (incl. revision) |

---

### ⚠️ Content in Nova NOT in the new Year 12 syllabus

These lessons exist but address Year 11 Standard content or are explicitly excluded from the 2024 Year 12 Standard 2 syllabus. They should be retained for prior-knowledge revision lessons but not counted as Year 12 coverage:

| Lesson slug | Issue |
|---|---|
| `surface-area-prisms-cylinders`, `volume-prisms-cylinders-spheres`, `composite-solids-practical` | Entire unit — not a Year 12 Standard 2 topic (Year 11 Measurement) |
| `time-zones-conversions` | Not in Year 12 Standard 2 syllabus |
| `ambiguous-case-sine-rule` | **Explicitly excluded** from new syllabus dot point |
| `linear-relationships-modelling`, `linear-inequalities-modelling`, `working-with-formulae-substitution` | Year 11 prior knowledge — suitable for revision lesson only |
| `shortest-paths-minimum-spanning-trees` | Not in Year 12 Standard 2 Networks syllabus |

---

### 1. Algebraic Relationships — MST-12-S2-01

**Prior knowledge (revision lesson basis):** Linear equations and their graphs; substitution into formulas; solving equations with one unknown; plotting points from tables; straight-line gradients and intercepts (all Year 11).

#### Focus areas and dot points

**Simultaneous linear equations**
- [x] Graph two equations and identify the solution (with and without graphing applications) → `simultaneous-equations-context`
- [x] Solve a pair of simultaneous linear equations using graphical and algebraic methods → `simultaneous-equations-context`
- [x] Develop a pair of simultaneous linear equations to model a practical situation → `simultaneous-equations-context`
- [x] Solve practical problems involving simultaneous linear equations → `simultaneous-equations-context`
- [x] Use break-even analysis to model cost and revenue relationships → `simultaneous-equations-context`
- [x] Identify the break-even point and solve related problems → `simultaneous-equations-context`

**Exponential relationships**
- [x] Represent exponential relationships in multiple forms (equation, table, ordered pairs, graph) → `exponential-inverse-variation`
- [x] Graph y=aˣ and y=a⁻ˣ where a>0 → `exponential-inverse-variation`
- [x] Construct and analyse y=kaˣ and y=ka⁻ˣ for growth/decay → `exponential-inverse-variation`
- [x] Interpret the meaning of parameters in context → `exponential-inverse-variation`
- [ ] **Explain limitations of exponential models** → needs explicit treatment in lesson

**Quadratic relationships**
- [x] Represent quadratic relationships in multiple forms → `quadratic-models`
- [x] Recognise parabolic shape, axis of symmetry, vertex → `quadratic-models`
- [x] Graph y=ax²+bx+c using graphing applications → `quadratic-models`
- [x] Identify x-intercepts and y-intercept → `quadratic-models`
- [x] Determine axis of symmetry and vertex using midpoint of x-intercepts → `quadratic-models`
- [x] Analyse graph to solve practical problems → `quadratic-models`
- [x] Interpret meaning of intercepts and vertex in context → `quadratic-models`
- [ ] **Explain limitations of quadratic models** → needs explicit treatment in lesson

**Reciprocal relationships**
- [ ] **Recognise inverse variation as y=k/x** → currently bundled into `exponential-inverse-variation` but under-developed
- [ ] **Identify the hyperbolic shape of a reciprocal graph** → partial
- [ ] **Graph y=k/x with and without graphing applications** → partial
- [ ] **Construct a reciprocal model to analyse inverse variation** → partial
- [ ] **Solve inverse variation problems graphically or algebraically** → partial
- [ ] **Explain limitations of reciprocal models** → missing

#### Current Nova lessons
- `linear-relationships-modelling` — Year 11 prior knowledge (revision use only)
- `quadratic-models` ✅
- `exponential-inverse-variation` ✅ exponential; ⚠️ reciprocal under-developed
- `simultaneous-equations-context` ✅
- `linear-inequalities-modelling` — Year 11 prior knowledge (revision use only)
- `working-with-formulae-substitution` — Year 11 prior knowledge (revision use only)
- `algebraic-relationships-exam-practice` ✅

#### Required new lessons
- [x] **`algebraic-relationships-revision`** ✅ 2026-06-15 — Linear equations, substitution, gradient/y-intercept, tables of values.
- [x] **`reciprocal-relationships`** ✅ 2026-06-15 — y=k/x; hyperbolic shape; Q1/Q3 vs Q2/Q4; inverse variation problems; CartesianGraph diagram.
- [ ] Update `exponential-inverse-variation` and `quadratic-models` to include explicit **model limitations** sections.

---

### 2. Investment and Loans — MST-12-S2-02

**Prior knowledge (revision lesson basis):** Percentage calculations; finding percentage of a quantity; expressing one quantity as a percentage of another; percentage increase/decrease; simple interest concept (Year 11 Managing Money / Earning Money).

#### Focus areas and dot points

**Investment**
- [x] Calculate simple interest using I=Prn → `investment-compound-interest` ⚠️ (may need explicit lesson)
- [x] Solve compound interest problems using FV=PV(1+r)ⁿ → `investment-compound-interest`
- [x] Examine effects of varying rates and terms → `investment-compound-interest`
- [x] Compare simple and compound interest growth → `investment-compound-interest` ⚠️ (comparison needs explicit dot point)
- [ ] **Analyse share investments including dividends and brokerage fees** → ❌ ENTIRELY MISSING

**Depreciation**
- [x] Straight-line depreciation: S=V₀−Dn → `depreciation-loans` ⚠️ (formula present but not explicitly named)
- [x] Declining balance: S=V₀(1−r)ⁿ → `depreciation-loans` ✅
- [ ] **Compare straight-line and declining balance methods numerically and graphically** → ❌ MISSING

**Loans**
- [x] Understand reducing balance loans → `depreciation-loans`
- [x] Model repayment schedules → `depreciation-loans`
- [x] Calculate monthly payments and total amounts → `depreciation-loans`, `present-value-annuities`
- [x] Examine effects of changing repayment frequency or making additional payments → partial in `depreciation-loans`

**Credit cards**
- [x] Explain credit cards as reducing balance loans → `credit-cards-consumer-decisions`
- [x] Compare interest rates with other borrowing types → `credit-cards-consumer-decisions`
- [x] Identify associated fees → `credit-cards-consumer-decisions`
- [x] Interpret statements → `credit-cards-consumer-decisions`
- [x] Calculate compound interest on purchases → `credit-cards-consumer-decisions`

#### Current Nova lessons
- `investment-compound-interest` ✅ compound interest; ⚠️ simple interest needs strengthening
- `depreciation-loans` ✅ declining balance; ⚠️ straight-line needs explicit formula and comparison
- `credit-cards-consumer-decisions` ✅

#### Required new lessons
- [x] **`investment-loans-revision`** ✅ 2026-06-15 — Percentages, simple interest I=Prn, A=P+I, % increase/decrease.
- [x] **`shares-dividends-brokerage`** ✅ 2026-06-15 — Dividend yield, brokerage, capital gain/loss, total return.
- [x] **`straight-line-vs-declining-depreciation`** ✅ 2026-06-15 — S=V₀−Dn vs S=V₀(1−r)ⁿ; tabular comparison; crossover point.

---

### 3. Annuities — MST-12-S2-03

**Prior knowledge (revision lesson basis):** Compound interest FV=PV(1+r)ⁿ; recurrence relations for savings and loans; building balance tables period by period (Year 11 Managing Money and Year 12 Investment and Loans).

#### Focus areas and dot points

- [x] Identify an annuity as regular deposits with compounding (FV) OR withdrawals from a lump sum (PV) → `annuities-regular-payments`, `present-value-annuities`
- [x] Model an annuity in tabular form for up to 4 time periods → `annuities-regular-payments`
- [ ] **Use a spreadsheet to model an annuity** → ❌ MISSING
- [ ] **Using a table of interest factors, calculate FV or PV of an annuity** → ❌ MISSING (Nova uses formula; syllabus requires table approach)
- [ ] **Using a table of interest factors, determine the contribution amount required for a target FV** → ❌ MISSING
- [ ] **Using a table of interest factors, determine the single sum for a target ordinary annuity FV** → ❌ MISSING
- [ ] **Examine effect of varying amount, payment, rate and duration using digital tools** → ❌ MISSING
- [x] Solve annuity problems involving financial decisions regarding investments and savings → `annuities-regular-payments`, `present-value-annuities`
- [ ] **Solve retirement planning problems** → ❌ MISSING

#### Current Nova lessons
- `annuities-regular-payments` ✅ tabular/recurrence; ❌ no interest factor tables
- `present-value-annuities` ✅ PV formula; ❌ no table approach

#### Required new lessons
- [x] **`annuities-revision`** ✅ 2026-06-15 — A=P(1+r)ⁿ, savings/loan recurrence relations, balance table reading.
- [x] **`annuity-interest-factor-tables`** ✅ 2026-06-15 — FV and PV interest factor tables; finding FV, PV, required contributions.
- [x] **`retirement-annuity-planning`** ✅ 2026-06-15 — Long-term FV/PV annuity scenarios; superannuation and income streams.

---

### 4. Trigonometry — MST-12-S2-04

**Prior knowledge (revision lesson basis):** SOH CAH TOA for right-angled triangles; Pythagoras' theorem; finding unknown sides and angles; labelling triangles (opposite, adjacent, hypotenuse) — Year 11 Standard.

#### Focus areas and dot points

**Right-angled trigonometry**
- [ ] **Apply trig ratios to right-angled triangles in both degrees AND radians** → ❌ Radians entirely absent from Nova

**Sine rule — sides**
- [x] Apply a/sin A = b/sin B = c/sin C to find unknown sides → `sine-rule-cosine-rule-area-triangle`

**Sine rule — angles (excluding ambiguous case)**
- [x] Apply sin A/a = sin B/b to find unknown angles (non-ambiguous) → `sine-rule-cosine-rule-area-triangle` ⚠️ (ambiguous case lesson exists but is EXCLUDED from new syllabus)
- [x] Apply sine rule for obtuse angles when the unknown is obtuse → `non-right-angled-trigonometry`

**Cosine rule**
- [x] Apply c²=a²+b²−2ab cos C to find unknown sides → `sine-rule-cosine-rule-area-triangle`
- [x] Apply cos C=(a²+b²−c²)/2ab to find unknown angles → `sine-rule-cosine-rule-area-triangle`

**Area formula**
- [x] Apply A=½ab sin C → `sine-rule-cosine-rule-area-triangle`

**Practical applications**
- [ ] **Identify and interpret angles of elevation and depression** → ❌ No dedicated lesson
- [x] Construct and interpret compass bearings; solve related problems → `bearings-navigation-problems`
- [x] Solve practical problems combining bearings and non-right-angled trig → `bearings-navigation-problems`, `non-right-angled-trigonometry`

#### Current Nova lessons
- `sine-rule-cosine-rule-area-triangle` ✅
- `non-right-angled-trigonometry` ✅
- `bearings-navigation-problems` ✅
- `ambiguous-case-sine-rule` ⚠️ EXCLUDED from new syllabus — keep for interest but not counted
- `time-zones-conversions` — not a trigonometry lesson; not in new syllabus

#### Required new lessons
- [x] **`trigonometry-revision`** ✅ 2026-06-15 — SOH CAH TOA, Pythagoras, hyp/opp/adj labelling; triangleDiagram on WE1 and WE2.
- [x] **`right-angled-trig-radians`** ✅ 2026-06-15 — Radian measure, degree↔radian conversion, SOH CAH TOA in radians.
- [x] **`elevation-depression-applications`** ✅ 2026-06-15 — Elevation/depression angles, right-triangle diagrams, practical problems.

---

### 5. Ratios and Rates — MST-12-S2-05

**Prior knowledge (revision lesson basis):** Fractions and their relationship to ratios; unit conversions; rates of pay (Year 11 Standard); interpreting graphs.

#### Focus areas and dot points

**Ratios**
- [x] Recognise ratios and explain relationship with fractions → `ratios-rates-unit-conversions`
- [x] Express ratio in simplest form; determine ratio of two quantities → `ratios-rates-unit-conversions`
- [x] Divide a quantity in a given ratio → `ratios-rates-unit-conversions`
- [x] Solve practical problems using the unitary method → `ratios-rates-unit-conversions`
- [x] Explain relationship between ratios and map scales → `ratios-rates-unit-conversions`
- [ ] **Construct scale drawings with and without digital tools** → ⚠️ partial (scales covered but construction not explicit)
- [ ] **Estimate and compare quantities, costs using scale drawings and building plans** → ❌ MISSING
- [ ] **Calculate perimeter or area from site plans, aerial photographs, radial surveys** → ❌ MISSING
- [ ] **Calculate volume of rainfall V=Ah from site plan or map** → ❌ MISSING

**Rates**
- [x] Explain difference between ratios and rates → `ratios-rates-unit-conversions`
- [x] Represent and convert unit rates → `ratios-rates-unit-conversions`
- [x] Compare unit rates to determine best value → `ratios-rates-unit-conversions`
- [x] Use rates to solve problems in practical contexts → `ratios-rates-unit-conversions`
- [x] Interpret and analyse distance/time graphs (speed, distance, time) → `ratios-rates-unit-conversions`
- [x] Examine fuel consumption to compare vehicle efficiency → `ratios-rates-unit-conversions`
- [ ] **Recognise and convert between watts (W) and kilowatts (kW): 1000 W=1 kW** → ❌ MISSING
- [ ] **Apply units of energy to calculate consumption and solve household energy problems** → ❌ MISSING

#### Current Nova lessons
- `ratios-rates-unit-conversions` ✅ ratios, rates, speed, scale, fuel

#### Required new lessons
- [x] **`ratios-rates-revision`** ✅ 2026-06-15 — Simplify ratios, share in ratio, metric conversions, basic speed/cost rates.
- [x] **`scale-drawings-site-plans`** ✅ 2026-06-15 — Scale drawings; actual↔plan conversions; perimeter and area from site plans.
- [x] **`rainfall-volume-calculations`** ✅ 2026-06-15 — V=Ah for rainfall; mm→m conversion; m³↔L; tank overflow.
- [x] **`energy-consumption-watts-kilowatts`** ✅ 2026-06-15 — W↔kW, kWh, electricity tariff, appliance cost calculations.

---

### 6. Network Flow — MST-12-S2-06

**Prior knowledge (revision lesson basis):** Network terminology (vertices, edges, directed graphs, weighted edges); reading and constructing network diagrams from edge lists — covered in existing `network-concepts-terminology`.

#### Focus areas and dot points

- [x] Define network flow terminology (source, sink, capacity, flow, cut) → `network-flow-capacity-cuts`
- [x] Convert table to weighted directed diagram → `network-concepts-terminology`, `network-flow-capacity-cuts`
- [x] Calculate flow capacity using max-flow min-cut method → `network-flow-capacity-cuts`
- [x] Solve small-scale network flow problems → `network-flow-capacity-cuts`
- [x] Examine impact of increasing/reducing capacity of an arc → `network-flow-capacity-cuts`
- [x] Explain whether flow capacity is sufficient to meet demand → `network-flow-capacity-cuts`

#### Current Nova lessons
- `network-concepts-terminology` ✅ — also serves as the revision lesson for this topic
- `network-flow-capacity-cuts` ✅
- `shortest-paths-minimum-spanning-trees` — ⚠️ NOT in the new Year 12 Standard 2 syllabus

#### Required new lessons
- [x] **`network-flow-revision`** ✅ 2026-06-15 — Vertices, edges, degree, directed/weighted networks, paths and circuits; NetworkDiagram on all 3 WEs.
- Note: `shortest-paths-minimum-spanning-trees` should be reviewed — likely Year 11 Networks content; retain but flag as outside Year 12 scope.

---

### 7. Critical Path Analysis — MST-12-S2-07

**Prior knowledge (revision lesson basis):** Network diagrams; reading precedence tables; understanding that activities have dependencies and durations (basic project sequencing).

#### Focus areas and dot points

- [x] Construct network diagram from precedence table (up to 10 activities) → `critical-path-analysis`
- [ ] **Construct network diagram including dummy activities** → ❌ MISSING
- [x] Explain the term "critical path" → `critical-path-analysis`
- [x] Apply EST and LST → `critical-path-analysis`
- [ ] **Apply EFT (earliest finish time) and LFT (latest finish time) explicitly** → ⚠️ partial — EST/LST present, EFT/LFT labels may not be explicit
- [x] Calculate float to identify critical and non-critical activities → `critical-path-analysis`
- [x] Locate critical path(s) for the project → `critical-path-analysis`
- [x] Determine minimum completion time → `critical-path-analysis`
- [ ] **Construct a Gantt chart from a network diagram indicating the critical path** → ❌ MISSING
- [x] Examine impact of duration changes on completion time → `critical-path-analysis`
- [ ] **Use a spreadsheet to model a project with precedence tables** → ❌ MISSING

#### Current Nova lessons
- `critical-path-analysis` ✅ core CPA; ❌ dummy activities; ❌ Gantt charts; ❌ spreadsheet

#### Required new lessons
- [x] **`critical-path-revision`** ✅ 2026-06-15 — Precedence tables, valid activity sequences, path totals, critical path, float.
- [x] **`gantt-charts-dummy-activities`** ✅ 2026-06-15 — Dummy activities, AON and AOA networks; Gantt charts with critical path; NetworkDiagram on WE1 and WE3.

---

### 8. Bivariate Data Analysis — MST-12-S2-08

**Prior knowledge (revision lesson basis):** Single-variable statistics: mean, median, mode, range, quartiles, IQR, standard deviation; reading and interpreting graphs (Year 11 Standard).

#### Focus areas and dot points

- [x] Distinguish 1-variable from 2-variable data and explain when each is needed → `bivariate-data-scatterplots`
- [x] Explain association vs causal relationship → `correlation-association`
- [x] Identify independent and dependent variables → `bivariate-data-scatterplots`
- [x] Analyse relationships between independent and dependent variables → `bivariate-data-scatterplots`
- [x] Represent bivariate dataset using scatter plot → `bivariate-data-scatterplots`
- [x] Create line of best fit by eye and with digital tools → `bivariate-data-scatterplots`
- [x] Describe form as linear or non-linear → `bivariate-data-scatterplots`
- [x] Describe strength and direction (strong/moderate/weak, positive/negative) → `correlation-association`
- [x] Determine and interpret gradient and y-intercept of the LOBF → `regression-prediction-residuals`
- [x] Calculate and interpret Pearson's r using scientific calculator → `correlation-association`
- [x] Determine least-squares regression line using scientific calculator → `regression-prediction-residuals`
- [x] Use spreadsheet to construct scatter plot and least-squares line → ⚠️ partial (digital tools referenced but spreadsheet steps not explicit)
- [x] Make predictions; recognise interpolation/extrapolation limitations → `regression-prediction-residuals`

#### Current Nova lessons
- `bivariate-data-scatterplots` ✅
- `correlation-association` ✅
- `regression-prediction-residuals` ✅

#### Required new lessons
- [x] **`bivariate-data-revision`** ✅ 2026-06-15 — Mean, median, mode, range, frequency tables, distribution shape, SD interpretation.

---

### 9. Relative Frequency and Probability — MST-12-S2-09

**Prior knowledge (revision lesson basis):** Basic probability language (likely/unlikely/certain/impossible); listing outcomes of simple events; fractions and percentages as probabilities (Year 11 Standard or earlier).

#### Focus areas and dot points

- [x] Recognise probability range 0–1 as fractions, decimals, percentages → `relative-frequency-probability`
- [x] Identify sample space as set of all possible outcomes → `relative-frequency-probability`
- [x] Express P(event) = favourable outcomes / total outcomes → `relative-frequency-probability`
- [x] Apply complement rule: P(not A) = 1 − P(A) → `relative-frequency-probability`
- [ ] **Construct and use diagrams and tables for multistage events** → ⚠️ two-way tables present; tree diagrams for multistage may be absent
- [ ] **Determine P(A and B) = P(A) × P(B) for independent events** → ❌ MISSING
- [x] Use relative frequency as a probability estimate → `relative-frequency-probability`
- [x] Recognise that more trials produce relative frequencies closer to theoretical → `relative-frequency-probability`
- [ ] **Calculate expected frequency using np** → ❌ MISSING
- [x] Construct and interpret two-way tables and contingency tables → `relative-frequency-probability` ⚠️ (partial)
- [ ] **Examine how statistics and probabilities influence decisions** → ❌ MISSING

#### Current Nova lessons
- `relative-frequency-probability` ✅ basic probability; ❌ multistage; ❌ independence; ❌ expected frequency

#### Required new lessons
- [x] **`probability-revision`** ✅ 2026-06-15 — Sample spaces, P(A)=favourable/total, fraction/decimal/%, complement rule P(A')=1−P(A).
- [x] **`multistage-events-independence`** ✅ 2026-06-15 — Tree diagrams, P(A and B)=P(A)×P(B), with/without replacement; probabilityTreeDiagram on WE1.
- [x] **`expected-frequency-contingency-tables`** ✅ 2026-06-15 — E=np; contingency tables; cell probabilities; twoWayTableDiagram on WE2.

---

### 10. The Normal Distribution — MST-12-S2-10

**Prior knowledge (revision lesson basis):** Mean, median, mode; standard deviation; data distributions and shape; recognising skewed vs symmetric data (Year 11 Standard statistical analysis).

#### Focus areas and dot points

- [x] Recognise that normally distributed data is represented by a bell-shaped curve → `normal-distribution-z-scores`
- [x] Explain that mean, median and mode are approximately equal for normal data → `normal-distribution-z-scores`
- [x] Describe z-score as number of standard deviations above/below mean → `normal-distribution-z-scores`
- [x] Recognise z-score set has mean 0 and SD 1 → `normal-distribution-z-scores`
- [x] Calculate z = (x−μ)/σ → `normal-distribution-z-scores`
- [x] Use z-scores to compare scores from different datasets → `normal-distribution-z-scores` ⚠️ (cross-dataset comparison may need strengthening)
- [x] Apply empirical rule (68%/95%/99.7%) → `normal-distribution-z-scores`
- [x] Calculate probabilities using z-scores and empirical rule → `normal-distribution-z-scores`
- [ ] **Represent probabilities by shading areas under the normal curve** → ⚠️ partially covered; needs dedicated visual practice
- [x] Use z-scores to identify probabilities of events less/more extreme than a given event → `normal-distribution-z-scores`
- [x] Use z-scores to make judgements about outcomes → `normal-distribution-z-scores`

#### Current Nova lessons
- `normal-distribution-z-scores` ✅ core content; ⚠️ shading areas and cross-dataset comparison need reinforcement

#### Required new lessons
- [x] **`normal-distribution-revision`** ✅ 2026-06-15 — Mean and SD recap, bell-curve shape, empirical rule 68/95/99.7%, SD intervals above/below mean.

---

### Implementation plan — required new lessons (priority order)

**Priority 1 — Entirely missing content (new syllabus dot points not addressed at all)**

| # | Lesson | Topic | Notes |
|---|---|---|---|
| 1 | `shares-dividends-brokerage` | Investment and loans | Dividend yield, brokerage, capital gain | ✅ 2026-06-15 |
| 2 | `right-angled-trig-radians` | Trigonometry | Radians new in 2024 syllabus | ✅ 2026-06-15 |
| 3 | `annuity-interest-factor-tables` | Annuities | Tables of interest factors required by syllabus | ✅ 2026-06-15 |
| 4 | `multistage-events-independence` | Probability | P(A∩B), tree diagrams | ✅ 2026-06-15 |
| 5 | `expected-frequency-contingency-tables` | Probability | E=np, contingency tables | ✅ 2026-06-15 |
| 6 | `gantt-charts-dummy-activities` | Critical path | Gantt charts and dummy activities | ✅ 2026-06-15 |
| 7 | `energy-consumption-watts-kilowatts` | Ratios and rates | Watts/kW, household energy | ✅ 2026-06-15 |
| 8 | `straight-line-vs-declining-depreciation` | Investment and loans | S=V₀−Dn vs S=V₀(1−r)ⁿ comparison | ✅ 2026-06-15 |

**Priority 2 — Significant gaps in existing coverage**

| # | Lesson | Topic | Notes | Status |
|---|---|---|---|---|
| 9 | `elevation-depression-applications` | Trigonometry | Elevation/depression not in any current lesson | ✅ 2026-06-15 |
| 10 | `scale-drawings-site-plans` | Ratios and rates | Building plans, perimeter/area from scale | ✅ 2026-06-15 |
| 11 | `rainfall-volume-calculations` | Ratios and rates | V=Ah over catchment areas | ✅ 2026-06-15 |
| 12 | `retirement-annuity-planning` | Annuities | Retirement savings scenarios | ✅ 2026-06-15 |
| 13 | `reciprocal-relationships` | Algebraic relationships | Dedicated y=k/x lesson | ✅ 2026-06-15 |

**Priority 3 — Revision lessons (one per topic, builds prior knowledge bridge)**

| # | Lesson slug | Prior knowledge activated | Status |
|---|---|---|---|
| 14 | `algebraic-relationships-revision` | Linear equations, substitution, plotting | ✅ 2026-06-15 |
| 15 | `investment-loans-revision` | Percentages, simple interest, I=Prt | ✅ 2026-06-15 |
| 16 | `annuities-revision` | FV=PV(1+r)ⁿ, recurrence relations | ✅ 2026-06-15 |
| 17 | `trigonometry-revision` | SOH CAH TOA, Pythagoras, right triangles | ✅ 2026-06-15 |
| 18 | `ratios-rates-revision` | Fractions↔ratios, basic rates | ✅ 2026-06-15 |
| 19 | `network-flow-revision` | Vertices, edges, directed/weighted graphs | ✅ 2026-06-15 |
| 20 | `critical-path-revision` | Precedence tables, activity sequences | ✅ 2026-06-15 |
| 21 | `bivariate-data-revision` | Mean, median, mode, SD, data graphs | ✅ 2026-06-15 |
| 22 | `probability-revision` | Listing outcomes, simple probability | ✅ 2026-06-15 |
| 23 | `normal-distribution-revision` | Mean, SD, data shape and spread | ✅ 2026-06-15 |

**Total new lessons built: 23 / 23** ✅
**Total lessons: 58** (35 original + 23 new; several original lessons reclassified as revision/Year 11 material)
**Question bank: 1102 questions** (58 lessons × 19 questions)

---

### Seed totals
- 2026-06-15: **1102 questions** (58 lessons × 19 questions)
- Previous baseline: 665 questions (35 lessons)
- Growth: +437 questions across 23 new lessons

### Notes on existing lessons to reclassify
- `surface-area-prisms-cylinders`, `volume-prisms-cylinders-spheres`, `composite-solids-practical` → move to `year-11-standard` course or retain as supplementary review
- `ambiguous-case-sine-rule` → flag as excluded from 2024 syllabus in lesson metadata
- `time-zones-conversions` → flag as not in Year 12 scope; retain as bonus content

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

## Year 12 Extension 1 🔄 Gaps identified

`year-12-extension-1` — `available`. Override file: `lib/lessons/year12Extension1/`.
**Standard:** NSW Mathematics Extension 1 11–12 Syllabus (2024), Year 12 content.
Six focus areas, outcomes ME1-12-01 to ME1-12-06. Implementation from 2026; first HSC 2027.
Source: [curriculum.nsw.edu.au — Yr12 Ext1](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-extension-1-11-12-2024/content/year-12/fa0cde2f55?show=advice%2Cexample)

---

### ME1-12-01 · Proof by Mathematical Induction

**Prior knowledge (revision lesson basis):** Algebraic manipulation (index laws, surds, factorisation, factorials), sigma notation (Adv Yr12 Sequences and series), combinations C(n,r) (Ext1 Yr11 Permutations and combinations).

#### Content dot points
- [x] Examine the nature of inductive proof: statement to prove, base case, inductive step → `proof-introduction-induction`
- [x] Prove results for sums using mathematical induction → `proof-induction-sums`
- [x] Prove divisibility results using mathematical induction → `proof-induction-divisibility`
- [x] Identify errors in false proofs by induction (only one of the two steps holds) → `proof-induction-errors`

#### Current lessons (unit: `proof-induction`) — 4 lessons, 76Q ✅ complete
#### Required new lessons
- [x] **`proof-induction-revision`** ✅ Done 2026-06-15 — Sigma notation sums, C(n,r), Pascal's identity, factoring A^(k+1) ± A^k.

---

### ME1-12-02 · Introduction to Vectors

**Prior knowledge (revision lesson basis):** Trigonometry (sine, cosine, bearings), Cartesian coordinate geometry, parametric equations (Ext1 Yr11 Further work with functions), straight-line kinematics concepts.

#### Content dot points

**Vector representation and notation**
- [x] Define a vector as a quantity with both magnitude and direction → `vectors-intro`
- [x] Associate vectors with directed line segments; recognise multiple representations → `vectors-intro`
- [x] Identify and use notation for 2D and 3D vectors (column, bold, i/j/k) → `vectors-intro`
- [ ] **Define position vectors in 2D and 3D** → ⚠️ needs explicit treatment

**Vector operations**
- [x] Represent a vector algebraically and graphically in 2D and 3D → `vectors-operations`
- [x] Scalar multiplication in component form → `vectors-operations`
- [x] Parallel vector condition λ**a** = **b** → `vectors-operations`
- [x] Identify i, j, k as perpendicular unit vectors → `vectors-operations`
- [x] Add and subtract vectors (algebraically + triangle/parallelogram law) → `vectors-operations`
- [x] Calculate magnitude |**v**| for 2D and 3D → `vectors-operations`
- [x] Find unit vectors in 2D and 3D → `vectors-operations`

**Dot product and projection**
- [x] Define scalar product **a**·**b** = |**a**||**b**|cosθ → `vectors-dot-product`
- [x] Use dot product to find angles between vectors → `vectors-dot-product`
- [x] **Define and calculate projection of **a** onto **b**: proj_b(**a**) = ((**a**·**b**)/|**b**|²)**b**** → `vector-projections-applications` + `vectors-projection`
- [x] **Prove the projection formula; find perpendicular component** → `vectors-projection`

**Vectors and motion in 2D (projectile motion)**
- [x] **Describe position of a moving point using a vector function of time r(t)** → `vectors-motion-2d`
- [x] **Differentiate vector functions to find velocity and acceleration vectors** → `vectors-motion-2d`
- [x] **Describe projectile path using parametric equations (horizontal and vertical displacement vectors)** → `vectors-projectile-parametric`
- [x] **Determine time of flight, max height, range, instantaneous velocity, impact velocity** → `vectors-projectile-parametric`
- [x] **Solve projectile problems where initial velocity and/or angle of projection are unknown** → `vectors-projectile-parametric`

#### Current lessons (unit: `vectors`) — 7 lessons, 133Q ✅ ~100% coverage
Plus: `kinematics` unit (4 lessons, 76Q) — Year 11 content retained as prior-knowledge revision entry point
Plus: `projectile-motion` unit (4 lessons, 76Q) — calculus approach; useful scaffolding but not the vector/parametric treatment required here

#### Structural note
The 2024 syllabus treats projectile motion under ME1-12-02 via **parametric equations and displacement vectors**, not as a standalone calculus topic. The `kinematics` unit (v = dx/dt, direction changes, total distance) is primarily **Year 11 Extension 1** content — valuable as a revision unit. The `projectile-motion` unit (calculus approach) should be supplemented with new vector-based lessons.

#### Required new lessons
- [ ] **`vectors-revision`** — Trig ratios and bearings, Cartesian coordinates, parametric equations. Activates prior knowledge before vector notation.
- [x] **`vectors-projection`** — Proof of projection formula from perpendicularity condition; perpendicular component a⊥ = a − proj_b(a); full decomposition. ✅ Added 2026-06-15
- [x] **`vectors-motion-2d`** — Position, velocity, acceleration as vector functions of time; differentiate **r**(t). ✅ Added 2026-06-15
- [x] **`vectors-projectile-parametric`** — Projectile motion in vector form; time of flight, max height, range, impact velocity; unknown launch speed or angle. ✅ Added 2026-06-15

---

### ME1-12-03 · Inverse Trigonometric Functions

**Prior knowledge (revision lesson basis):** Trig graphs and identities (including sum/difference and double-angle), inverse function concept (domain restriction, reflection y = x), function transformations (Ext1 Yr11 Further work with functions and Further trigonometry).

#### Content dot points

**Definitions and graphs**
- [x] Graph sin, cos, tan; recognise failure of horizontal line test → `inverse-trig-intro`
- [x] Examine domain restrictions to obtain inverse functions → `inverse-trig-intro`
- [x] Define sin⁻¹(x), cos⁻¹(x), tan⁻¹(x); determine domains and ranges → `inverse-trig-intro`
- [x] Sketch graphs of sin⁻¹(x), cos⁻¹(x), tan⁻¹(x) → `inverse-trig-intro`
- [x] **Apply complementary angle identity sin⁻¹(x) + cos⁻¹(x) = π/2** → `inverse-trig-properties`
- [x] **Evaluate composite expressions such as sin(cos⁻¹(x)) and tan(sin⁻¹(x))** → `inverse-trig-properties`

**Calculus**
- [x] Differentiate sin⁻¹(f(x)), cos⁻¹(f(x)), tan⁻¹(f(x)) → `inverse-trig-differentiation`
- [x] Differentiate composite functions involving inverse trig → `inverse-trig-differentiation`
- [x] Recognise and apply standard integrals (∫1/√(a²−x²)dx = sin⁻¹(x/a)+C etc.) → `inverse-trig-integration`
- [x] Evaluate definite integrals involving inverse trig → `inverse-trig-integration`

#### Current lessons (unit: `inverse-trig`) — 5 lessons, 95Q ✅ ~100% coverage
#### Required new lessons
- [x] **`inverse-trig-revision`** ✅ Done 2026-06-15 — Exact values, ASTC quadrant signs, compound angle identities, double angle formulas.
- [x] **`inverse-trig-properties`** ✅ Done 2026-06-15 — Complementary angle identities; evaluating composite expressions; Pythagorean identity method.

---

### ME1-12-04 · Further Calculus Skills

**Prior knowledge (revision lesson basis):** Chain/product/quotient rules, trig identities (double angle formulae for sin²x and cos²x), u-substitution concept, parametric equations, inverse functions.

#### Content dot points

**Further derivatives**
- [x] Derivative of parametrically defined function: dy/dx = (dy/dt)/(dx/dt) → `further-calculus-parametric`
- [x] Derivative of inverse function: [f⁻¹]'(x) = 1/f'(f⁻¹(x)) → `further-calculus-inverse`
- [x] Solve problems involving derivatives of inverse functions (including inverse trig) → `further-calculus-inverse`

**Integration techniques**
- [x] Integration by substitution — indefinite integrals → `further-calculus-substitution`
- [x] Integration by substitution — definite integrals (change limits) → `further-calculus-substitution`
- [x] Integrals ∫1/√(a²−x²)dx and ∫1/(a²+x²)dx → `further-calculus-substitution`
- [x] Integrals of sin²(x) and cos²(x) via double-angle formulae → `further-calculus-trig-integration`

#### Current lessons (unit: `further-calculus`) — 4 lessons, 76Q ✅ content complete
#### Required new lessons
- [ ] **`further-calculus-revision`** — Chain/product/quotient rules, trig identities (double angle), basic substitution. Entry check before substitution and parametric content.

---

### ME1-12-05 · Further Applications of Calculus

**Prior knowledge (revision lesson basis):** Polynomial factorisation and graphing, product rule, chain rule, definite integration, rates of change interpretation.

#### Content dot points

**Multiplicity of zeroes of polynomial functions**
- [x] **Prove: zero of multiplicity k of P(x) → zero of multiplicity k−1 of P'(x) (via product rule)** → `calculus-applications-polynomial-zeroes`
- [x] **Use the result to determine multiplicity and solve polynomial problems** → `calculus-applications-polynomial-zeroes`
- [x] **Graph polynomials in factored form: turning points, points of inflection, end behaviour** → `calculus-applications-polynomial-zeroes`

**Further rates of change**
- [x] Develop models where rate of change of a composition → apply chain rule → `calculus-applications-related-rates`
- [x] Solve related rates problems (area, surface area, volume) → `calculus-applications-related-rates`
- [x] **Model and graph situations where dQ/dt = k(Q−A) (rate proportional to difference from fixed value)** → `calculus-applications-newton-cooling`
- [x] **Solve dQ/dt = k(Q−A): Newton's Law of Cooling, logistic/carrying-capacity models; justify conclusions** → `calculus-applications-newton-cooling`

**Areas and volumes**
- [x] **Calculate areas of regions between curves** → `calculus-applications-volumes`
- [x] **Describe a solid of revolution formed by rotating an arc about x-axis or y-axis** → `calculus-applications-volumes`
- [x] **Calculate volume of revolution about x-axis or y-axis** → `calculus-applications-volumes`
- [x] **Calculate volume of revolution between two curves about x-axis or y-axis** → `calculus-applications-volumes`

**Differential equations**
- [x] Define a differential equation and its order → `calculus-applications-differential-equations`
- [x] Solve dy/dx = f(x) → `calculus-applications-differential-equations`
- [x] Solve dy/dx = g(y) → `calculus-applications-differential-equations`
- [x] Recognise and solve dy/dx = ky (exponential growth and decay) → `calculus-applications-differential-equations`
- [x] Solve dy/dx = g(y) by separation of variables → `calculus-applications-differential-equations`
- [x] **Graph solutions using graphing applications; examine behaviour using slope fields** → `calculus-applications-slope-fields`

#### Current lessons (unit: `calculus-applications`) — 10 lessons, 191Q ✅ ~100% coverage
#### Required new lessons
- [ ] **`calculus-applications-revision`** — Polynomial factorisation and sketching, chain rule fluency, area under curve. Prior knowledge activation.
- [x] **`calculus-applications-polynomial-zeroes`** — Multiplicity of zeroes; product-rule proof; graphing polynomials with repeated roots. ✅ Added 2026-06-15
- [x] **`calculus-applications-newton-cooling`** — dQ/dt = k(Q−A); Newton's Law of Cooling; logistic/carrying-capacity models; solve and justify in context. ✅ Added 2026-06-15
- [x] **`calculus-applications-volumes`** — Areas between curves; solids of revolution; volumes rotating about x/y-axis; between two curves. ✅ Added 2026-06-15
- [x] **`calculus-applications-slope-fields`** — Slope fields; reading slopes from dy/dx = f(x,y); sketching solution curves; stable/unstable equilibria; long-run behaviour. ✅ Added 2026-06-15

---

### ME1-12-06 · The Binomial Distribution and Sampling Distribution of the Mean

**Prior knowledge (revision lesson basis):** Probability rules (addition, multiplication, conditional probability, complement), combinations C(n,r), discrete random variables and expected value (Adv Yr11/12 Probability). Revision should confirm probability and C(n,r) fluency before Bernoulli content.

#### Content dot points

**Bernoulli distributions**
- [x] Define a Bernoulli random variable for success/failure situations → `binomial-intro`
- [x] Model a Bernoulli trial: X where P(X=1)=p, P(X=0)=1−p → `binomial-intro`
- [x] Define a Bernoulli distribution as a discrete probability distribution → `binomial-intro`

**Binomial distributions**
- [x] Use X ~ B(n,p); recognise C(n,k) as number of ways k successes occur in n trials → `binomial-calculations`
- [x] Apply P(X=k) = C(n,k)·pᵏ·(1−p)^(n−k) → `binomial-calculations`
- [x] Calculate expected frequencies → `binomial-calculations`
- [x] Apply E(X)=np and Var(X)=np(1−p) → `binomial-calculations`
- [x] Solve practical binomial problems with/without digital tools (excluding normal approximation) → `binomial-exam-practice`

**Sampling distribution of the mean and CLT**
- [x] **Define statistical population and sample** → `sampling-distribution-mean`
- [x] **Define sample mean x̄ and sample variance s²** → `sampling-distribution-mean`
- [x] **Examine distribution of sample means from population with mean μ, variance σ²** → `sampling-distribution-mean`
- [x] **Examine effect of sample size n on variance of sample means (Var(x̄) = σ²/n)** → `sampling-distribution-mean`
- [x] **Apply central limit theorem: estimate P(x̄ within given bounds)** → `central-limit-theorem`

#### Current lessons (unit: `binomial-distribution`) — 5 lessons, 95Q ✅ binomial sub-strand complete
#### Current lessons (unit: `sampling-distribution`) — 2 lessons, 38Q ✅ CLT sub-strand complete (added 2026-06-15)
#### Required new lessons
- [x] **`binomial-revision`** ✅ Done 2026-06-15 — Probability rules (complement, addition, multiplication), C(n,r), discrete RV expected value.

---

### Overall Gap Summary

| Focus area | Outcome | Nova lessons | Dot-point coverage | What is missing |
|---|---|---|---|---|
| Proof by Mathematical Induction | ME1-12-01 | 4 (76Q) | ✅ ~100% | ~~Revision lesson~~ ✅ done |
| Introduction to Vectors | ME1-12-02 | 7+8 (285Q total) | ✅ ~100% | Revision lesson pending |
| Inverse Trigonometric Functions | ME1-12-03 | 5 (95Q) | ✅ ~100% | ~~Revision lesson~~ ✅ done |
| Further Calculus Skills | ME1-12-04 | 4 (76Q) | ✅ ~100% | Revision lesson pending |
| Further Applications of Calculus | ME1-12-05 | 10 (191Q) | ✅ ~100% | Revision lesson pending |
| Binomial Distribution + Sampling | ME1-12-06 | 7 (133Q) | ✅ ~100% | ~~Revision lesson~~ ✅ done |

**Current:** 45 lessons (9 units) / 805Q
**New lessons to meet syllabus fully:** ~3 (revision lessons: ME1-12-02, ME1-12-04, ME1-12-05)
**Target:** ~48 lessons

### Priority order
1. ~~Sampling distribution of mean + CLT~~ ✅ Done 2026-06-15
2. ~~Volumes of revolution~~ ✅ Done 2026-06-15
3. ~~Polynomial zeroes~~ ✅ Done 2026-06-15
4. ~~Newton's Law of Cooling~~ ✅ Done 2026-06-15
5. ~~Vector projection~~ ✅ Done 2026-06-15
6. ~~Vector motion + projectile (parametric)~~ ✅ Done 2026-06-15
7. ~~Slope fields~~ ✅ Done 2026-06-15
8. ~~Inverse trig properties~~ ✅ Done 2026-06-15
9. ~~Revision lessons (ME1-12-01, ME1-12-03, ME1-12-06)~~ ✅ Done 2026-06-15
10. **Revision lessons** (3 remaining: ME1-12-02 vectors, ME1-12-04 further calculus, ME1-12-05 calculus applications)

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
