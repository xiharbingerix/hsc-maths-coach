# Nova Maths — Course Structure Checklist

> **Objective:** High-quality lessons and question content across the entire NSW syllabus, mapped to syllabus sections with sufficient lessons to cover all skills and content in the Content section. Each lesson: 19 questions, worked examples, Feynman teaching, and common mistakes. Each focus area: one revision lesson activating the prior knowledge stated in the syllabus teaching advice, plus content lessons per dot-point group.
> **Standard:** NSW syllabuses (2024 versions, implementation from 2026). Source of truth: [curriculum.nsw.edu.au](https://curriculum.nsw.edu.au).
> Last updated: 2026-06-15 — Ext 1 syllabus audit complete; objective standard adopted.

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
| Year 11 Standard | 63 (9 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 11 Advanced | 54 (8 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 11 Extension 1 | 25 (5 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 12 Standard 1 | 18 (5 units) | — | audit pending | 0 | ✅ Full depth; audit pending |
| Year 12 Standard 2 | 37 (6 units) | 6 focus areas | ~65% — detail below | 0 | 🔄 Gaps identified |
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

## Year 12 Standard 2 🔄 Syllabus alignment in progress

`year-12-standard-2` — `available`. Override file: `lib/lessons/year12Standard2/`.

**Reference:** NSW Mathematics Standard 11–12 Syllabus (2024). Teaching begins Term 4 2026. First HSC 2027.
URL: https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-standard-11-12-2024/content/year-12-tba2/

**Objective:** Every NSW syllabus content dot point must be addressed by at least one Nova lesson. Each topic must also have a revision lesson drawing on the "Prior knowledge, skills and understanding" teaching advice to activate Year 11 prerequisites before new content begins.

**Current state:** 35 lessons across 6 Nova units. Several existing lessons cover Year 11 content (not Year 12) and some new syllabus topics are entirely unaddressed. Structural realignment required.

---

### Syllabus structure — 10 topics

| # | NSW Topic | Outcome | Nova lessons | Coverage |
|---|---|---|---|---|
| 1 | Algebraic relationships | MST-12-S2-01 | 7 (partial overlap) | ⚠️ Partial |
| 2 | Investment and loans | MST-12-S2-02 | 3 | ⚠️ Partial — shares missing |
| 3 | Annuities | MST-12-S2-03 | 2 | ⚠️ Partial — interest factor tables missing |
| 4 | Trigonometry | MST-12-S2-04 | 4 | ⚠️ Partial — radians, elevation/depression gap |
| 5 | Ratios and rates | MST-12-S2-05 | 1 | ⚠️ Partial — energy, site plans, rainfall missing |
| 6 | Network flow | MST-12-S2-06 | 2 | ✅ Adequate |
| 7 | Critical path analysis | MST-12-S2-07 | 1 | ⚠️ Partial — Gantt charts, dummy activities missing |
| 8 | Bivariate data analysis | MST-12-S2-08 | 3 | ✅ Adequate |
| 9 | Relative frequency and probability | MST-12-S2-09 | 1 | ❌ Significant gaps |
| 10 | The normal distribution | MST-12-S2-10 | 1 | ⚠️ Partial |

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
- [ ] **`algebraic-relationships-revision`** — Activates prior knowledge: solving linear equations, substitution, plotting from tables, straight-line graphs. Bridge to Year 12 non-linear content.
- [ ] **`reciprocal-relationships`** — Dedicated lesson on y=k/x; hyperbolic shape; construct and solve inverse variation problems; state limitations. (Split from `exponential-inverse-variation`.)
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
- [ ] **`investment-loans-revision`** — Activates prior knowledge: percentages, simple interest I=Prt, finding unknowns; contrast simple vs compound growth as a bridge to Year 12 FV=PV(1+r)ⁿ.
- [ ] **`shares-dividends-brokerage`** — Dividend calculation, dividend yield, brokerage fees, buying/selling shares, capital gain vs loss. (**Entirely missing** — new syllabus dot point.)
- [ ] **`straight-line-vs-declining-depreciation`** — Explicit S=V₀−Dn vs S=V₀(1−r)ⁿ; tabular and graphical comparison; when each model is appropriate.

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
- [ ] **`annuities-revision`** — Activates prior knowledge: FV=PV(1+r)ⁿ, recurrence relations B_{n+1}=r·Bₙ+d, reading balance tables.
- [ ] **`annuity-interest-factor-tables`** — Using published FV and PV interest factor tables; finding FV, PV, required contributions and initial lump sums from tables; comparing results to formula approach.
- [ ] **`retirement-annuity-planning`** — Long-term annuity scenarios: saving for retirement, pension drawdown, comparing saving strategies; digital tool exploration of parameter effects.

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
- [ ] **`trigonometry-revision`** — SOH CAH TOA, Pythagoras, right-triangle labelling; bridge to sine/cosine rules. Cover finding sides and angles in right-angled triangles as the launch pad.
- [ ] **`right-angled-trig-radians`** — Introduce radian measure; convert between degrees and radians; apply SOH CAH TOA and trig ratios using radians; practise in both units. (**New syllabus requirement** not previously in Standard 2.)
- [ ] **`elevation-depression-applications`** — Angles of elevation and depression; draw diagrams from word problems; solve using right-angled and non-right-angled trig; combine with bearings in practical contexts.

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
- [ ] **`ratios-rates-revision`** — Activates prior knowledge: fractions↔ratios, unit conversions (cm→m→km), basic rate problems from Year 11.
- [ ] **`scale-drawings-site-plans`** — Construct and read scale drawings; use building plans and site plans; calculate actual distances, perimeters and areas; apply to aerial photographs and radial surveys.
- [ ] **`rainfall-volume-calculations`** — Calculate V=Ah for rainfall over a catchment; read depth from maps; combine with area from scale drawings; real-world water storage contexts.
- [ ] **`energy-consumption-watts-kilowatts`** — Watts and kilowatts (1000 W=1 kW); kilowatt-hours; read electricity bills; calculate household energy costs; compare appliance consumption.

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
- [ ] **`network-flow-revision`** — Activate prior knowledge: vertices, edges, directed/weighted networks, reading diagrams. Bridge to flow-specific concepts (source, sink, capacity).
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
- [ ] **`critical-path-revision`** — Activate prior knowledge: reading precedence tables, activity sequencing, basic network diagrams. Bridge to forward/backward pass.
- [ ] **`gantt-charts-dummy-activities`** — Introduce dummy activities and when they are needed; construct full network with dummies; build Gantt charts from network diagrams showing critical path; interpret Gantt charts for project scheduling.

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
- [ ] **`bivariate-data-revision`** — Activate prior knowledge: mean, median, mode, standard deviation, reading graphs, interpreting data displays. Bridge to two-variable analysis.

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
- [ ] **`probability-revision`** — Activate prior knowledge: listing outcomes, simple probability fractions, equally likely events, basic sample spaces from Year 11.
- [ ] **`multistage-events-independence`** — Tree diagrams and tables for two-stage events; P(A and B) = P(A) × P(B); independent vs dependent events; practical contexts (with/without replacement).
- [ ] **`expected-frequency-contingency-tables`** — Expected frequency E=np; contingency/two-way tables; reading and completing tables; using probability to evaluate claims and decisions.

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
- [ ] **`normal-distribution-revision`** — Activate prior knowledge: mean, median, mode, standard deviation, data shape and spread. Bridge to the normal curve and why it matters.

---

### Implementation plan — required new lessons (priority order)

**Priority 1 — Entirely missing content (new syllabus dot points not addressed at all)**

| # | Lesson | Topic | Notes |
|---|---|---|---|
| 1 | `shares-dividends-brokerage` | Investment and loans | Dividend yield, brokerage, capital gain | ✅ 2026-06-15 |
| 2 | `right-angled-trig-radians` | Trigonometry | Radians new in 2024 syllabus | ✅ 2026-06-15 |
| 3 | `annuity-interest-factor-tables` | Annuities | Tables of interest factors required by syllabus |
| 4 | `multistage-events-independence` | Probability | P(A∩B), tree diagrams |
| 5 | `expected-frequency-contingency-tables` | Probability | E=np, contingency tables |
| 6 | `gantt-charts-dummy-activities` | Critical path | Gantt charts and dummy activities |
| 7 | `energy-consumption-watts-kilowatts` | Ratios and rates | Watts/kW, household energy |
| 8 | `straight-line-vs-declining-depreciation` | Investment and loans | S=V₀−Dn vs S=V₀(1−r)ⁿ comparison |

**Priority 2 — Significant gaps in existing coverage**

| # | Lesson | Topic | Notes |
|---|---|---|---|
| 9 | `elevation-depression-applications` | Trigonometry | Elevation/depression not in any current lesson |
| 10 | `scale-drawings-site-plans` | Ratios and rates | Building plans, perimeter/area from scale |
| 11 | `rainfall-volume-calculations` | Ratios and rates | V=Ah over catchment areas |
| 12 | `retirement-annuity-planning` | Annuities | Retirement savings scenarios |
| 13 | `reciprocal-relationships` | Algebraic relationships | Dedicated y=k/x lesson |

**Priority 3 — Revision lessons (one per topic, builds prior knowledge bridge)**

| # | Lesson slug | Prior knowledge activated |
|---|---|---|
| 14 | `algebraic-relationships-revision` | Linear equations, substitution, plotting |
| 15 | `investment-loans-revision` | Percentages, simple interest, I=Prt |
| 16 | `annuities-revision` | FV=PV(1+r)ⁿ, recurrence relations |
| 17 | `trigonometry-revision` | SOH CAH TOA, Pythagoras, right triangles |
| 18 | `ratios-rates-revision` | Fractions↔ratios, basic rates |
| 19 | `network-flow-revision` | Vertices, edges, directed/weighted graphs |
| 20 | `critical-path-revision` | Precedence tables, activity sequences |
| 21 | `bivariate-data-revision` | Mean, median, mode, SD, data graphs |
| 22 | `probability-revision` | Listing outcomes, simple probability |
| 23 | `normal-distribution-revision` | Mean, SD, data shape and spread |

**Total new lessons required: 23**
**Current lessons: 35** (several reclassified as revision/Year 11 material)
**Target: ~48 lessons** mapped to all 10 NSW syllabus topics with full dot-point coverage

---

### Seed totals
- Current: 665 questions (35 lessons)
- After new build: ~912 questions (48 lessons × 19 questions)

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
