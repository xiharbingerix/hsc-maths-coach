# Year 12 Advanced — Teaching-Quality Audit (Pilot)

> Scope: all 90 active lessons of the `year-12-advanced` course (14 units, MA-F1/F2, T1/T2/T3, C1–C4, E1, S1–S3, M1).
> Standard applied: `docs/FEYNMAN_TEACHING_STANDARD.md` (Advanced-tier calibration, §A–C).
> Method: AI-judge scoring pass with adversarial verification. **Report only — no teaching content was edited.**
> Date: 2026-06-30. This is the pilot course for a course-by-course teaching-quality programme.

## Context

We are systematically reviewing **lesson teaching content** (`teaching.paragraphs`,
`teaching.latexBlocks`, `workedExamples`) against the project's qualitative teaching standard. The
existing `npm run audit:lessons` script only validates structure, question quality, and visual-payload
shape — it cannot judge whether a lesson actually *teaches* (intuition before notation, a durable
mental model, the "why" behind each method, principle-first worked steps). That qualitative gap is what
this audit measures. Year 12 Advanced was chosen as the pilot to calibrate the rubric and process
before scaling to the other courses (~950 teaching blocks in total).

## Method

1. **Extraction** — a read-only script imported `year12AdvancedRouteUnits` and dumped each active
   lesson's teaching content to a per-lesson JSON file (90 lessons, all with non-empty teaching).
2. **Judge pass** — one independent agent per lesson scored the teaching against the rubric below,
   returning a per-criterion verdict (pass/warn/fail), an overall grade (A–F), and specific fixes.
3. **Adversarial verify** — every lesson graded D/F or with a core-criterion fail was re-checked by a
   second independent agent told to *overturn* findings that over-pitched the Advanced tier, penalised
   a legitimate exam-practice lesson, or treated a present-but-brief model as absent. 78 lessons were
   verified; **66 grades were upheld and only 12 were softened** — the harsh distribution is not an
   artefact of an over-strict judge.
4. **Calibration guardrail** — the question-layer criterion (productive thinking / generalisation) was
   scored *informational only*, never able to lower a grade, because the standard explicitly allows it
   to live in the practice questions, which are out of scope here.

### Rubric (Advanced tier)

Core criteria (a fail ⇒ grade D or worse): **C1** durable mental model · **C2** intuition before
notation · **C3** the *why* / a derivation where the syllabus expects one · **C4** misconception
framework · **C5** worked steps justify decisions (not restatement) · **C6** not a formula-drop.
Secondary (a warn caps the grade at C): **C7** concrete-before-abstract · **C8** builds from prior
knowledge · **C9** information load · **C10** length guide · **C11** ≥2 linked representations ·
**C12** underivable-formula handling.

## Headline result

| Grade | Lessons | Share |
|---|---|---|
| A (benchmark) | 0 | 0% |
| B (solid) | 2 | 2% |
| C (passable, shallow) | 18 | 20% |
| D (≥1 core fail) | 26 | 29% |
| F (multiple core fails / formula-drop) | 44 | 49% |

**70 of 90 lessons (78%) fall to D or F.** No lesson reached benchmark (A). This is a course-wide
teaching-quality problem, not a handful of weak lessons.

## The four systemic failures

The failure modes are remarkably consistent across units — this is one pattern repeated 90 times, not
90 different problems. Post-verify core-fail frequency:

| Criterion | Lessons failing | What it looks like |
|---|---|---|
| **C3 — no "why" / missing derivation** | **63** | Rules and standard results are asserted; the derivation the Advanced syllabus expects (first principles, FTC, sum of a GP, why `f(x−a)` shifts *right*, why `e^x` is its own derivative) is simply absent. |
| **C5 — worked steps restate, don't reason** | **53** | Steps read "Differentiate each term", "Combine the derivatives", "Solve the inequality" — they narrate the operation instead of justifying the decision behind it. |
| **C6 — formula-drop / purely procedural** | **43** | Whole lessons are a terse list of rules paired with notation, with examples that pattern-match rather than think. |
| **C1 — no durable mental model** | **41** | Nothing survives the student forgetting the formula: no balance-point, slope-function, unit-circle, or area picture to reconstruct from. |
| **C2 — formula before intuition** | **21** | The notation arrives before (or instead of) the plain-English idea. |

Secondary warnings tell the same story: **C7 concrete-before-abstract (79)**, **C11 representation
linking / diagrams (68)**, and **C10 length/depth (64)** are nearly universal. Teaching prose jumps
straight to general rules, rarely tracks a concrete example, and almost never pairs words with a
diagram, table, or graph — even in inherently visual topics (transformations, curve sketching, box
plots, the normal curve).

## Where it is worst — per-unit heat map

| Unit | n | A | B | C | D | F | F-rate |
|---|---|---|---|---|---|---|---|
| MA-F1 Working with Functions | 7 | 0 | 0 | 3 | 2 | 2 | 29% |
| MA-F2 Graphing Techniques | 4 | 0 | 0 | 1 | 1 | 2 | 50% |
| MA-T1 Trig & Measure of Angles | 1 | 0 | 0 | 0 | 1 | 0 | 0% |
| MA-T2 Trig Functions & Identities | 9 | 0 | 0 | 2 | 3 | 4 | 44% |
| MA-T3 Trigonometric Equations | 2 | 0 | 0 | 0 | 1 | 1 | 50% |
| **MA-C1 Introduction to Differentiation** | 7 | 0 | 0 | 1 | 1 | **5** | **71%** |
| **MA-C2 Differential Calculus** | 5 | 0 | 0 | 1 | 0 | **4** | **80%** |
| **MA-C3 Applications of Differentiation** | 11 | 0 | 1 | 1 | 1 | **8** | **73%** |
| MA-C4 Integral Calculus | 16 | 0 | 0 | 2 | 7 | 7 | 44% |
| MA-E1 Exponential & Logarithmic | 5 | 0 | 0 | 1 | 2 | 2 | 40% |
| MA-S1 Probability & Distributions | 4 | 0 | 0 | 1 | 3 | 0 | 0% |
| MA-S2 Descriptive & Bivariate | 5 | 0 | 1 | 1 | 0 | 3 | 60% |
| MA-S3 Random Variables | 3 | 0 | 0 | 1 | 0 | 2 | 67% |
| MA-M1 Modelling Financial Situations | 11 | 0 | 0 | 3 | 4 | 4 | 36% |

**The calculus core (C1–C3) is the epicentre** — 17 of 23 lessons graded F. These are the
highest-stakes, most-examined topics in the course, and they are taught as procedures.

## Data bug found during extraction

Two distinct lessons in `ma-c3-applications-of-differentiation` share the **same `id` and `slug`**
(`optimisation`): "Optimisation Problems" and "Optimisation". Because routing resolves a lesson by
slug, one shadows the other — students can only reach one of them, and any per-lesson state keyed by id
collides. Both were scored here (both graded F). **This should be fixed independently of the teaching
rework** by giving the second lesson a distinct id/slug or merging the two.

---

## Per-lesson scorecard

Grade is the verify-adjusted final grade. `Judge` shows the first-pass grade where the adversarial verifier softened it.

### Working with Functions (`ma-f1-working-with-functions`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Graph Transformations | F | C1, C2, C3, C5, C6 | C7, C11 |
| Reflections, Stretches, and Translations | F | C1, C3, C5, C6 | C7, C11 |
| Intercepts and Key Features | D | C1, C3 | C7, C8, C11 |
| Solving Equations and Inequalities Graphically | D | C3 | C7, C10 |
| Domain, Range, and Function Notation | C _(judge D)_ | — | C7, C11 |
| Mixed Functions and Graphing Exam Practice | C _(judge D)_ | — | C7, C10 |
| Modelling with Functions | C _(judge D)_ | — | C7, C8, C11 |

### Graphing Techniques (`ma-f2-graphing-techniques`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Exponential and Logarithmic Graphs in Graphing Techniques | F | C1, C2, C3, C5, C6 | C7, C10, C11 |
| Inverse Functions | F | C3, C5, C6 | C10, C11 |
| Asymptotes and Reciprocal-Style Graphs | D | C3 | C7, C8, C10 |
| Absolute Value Functions | C | — | C7, C10, C11 |

### Trigonometry and Measure of Angles (`ma-t1-trigonometry-and-measure-of-angles`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Radians, Exact Values, and the Unit Circle | D | C3 | C7, C10, C11 |

### Trigonometric Functions and Identities (`ma-t2-trigonometric-functions-and-identities`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Compound Angle Formulas | F | C1, C3, C5, C6 | C7, C10, C11 |
| Exact Values with Compound Angles | F | C1, C2, C3, C5, C6 | C7, C10, C11 |
| Graphs of Sine, Cosine, and Tangent | F | C1, C3, C5, C6 | C7 |
| Trigonometric Identities and Simplification | F | C1, C2, C3, C5, C6 | C7, C8, C11 |
| Double Angle Formulas | D | C5 | C7, C10, C11 |
| Modelling Periodic Phenomena | D _(judge F)_ | C3 | C7, C8, C10, C11 |
| Trigonometric Equations | D | C1, C3 | C7, C8, C11 |
| Amplitude, Period, Phase Shift, and Vertical Shift | C | — | C11 |
| Mixed Trigonometric Functions Exam Practice | C | — | C7, C10, C11 |

### Trigonometric Equations (`ma-t3-trigonometric-equations`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Further Trigonometry Equations and Identities | F | C1, C2, C3, C5, C6 | C7, C8, C10, C11 |
| Further Trigonometry Exam Practice | D | C5 | C10, C11 |

### Introduction to Differentiation (`ma-c1-introduction-to-differentiation`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Differentiating Polynomial Functions | F | C1, C3, C5, C6 | C7, C8, C11 |
| Differentiating Polynomial Terms | F | C1, C2, C3, C5, C6 | C7, C8, C10, C11 |
| Increasing and Decreasing Functions | F | C1, C2, C3, C5, C6 | C7, C8, C11 |
| Stationary Points | F | C1, C3, C5, C6 | C7, C10, C11 |
| Tangents and Normals | F | C1, C3, C6 | C7, C8, C11 |
| The Derivative as Rate of Change | D | C3 | C7, C10 |
| First Derivative Test | C _(judge D)_ | — | C7, C10, C11 |

### Differential Calculus (`ma-c2-differential-calculus`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Applications with Extended Differentiation | F | C1, C2, C3, C5, C6 | C7, C10, C11 |
| Product and Quotient Rules | F | C1, C3, C5, C6 | C7, C10, C11 |
| Standard Derivatives: Trig, Exponential and Logarithmic Functions | F | C1, C2, C3, C5, C6 | C10 |
| The Chain Rule | F | C1, C3, C5, C6 | C7, C8, C10, C11 |
| Differentiation Techniques Exam Practice | C _(judge D)_ | — | C7, C10, C11 |

### Applications of Differentiation (`ma-c3-applications-of-differentiation`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Curve Sketching with Calculus | F | C1, C3, C5, C6 | C7, C10, C11 |
| Curve Sketching with Derivatives | F | C1, C2, C3, C5, C6 | C7, C8, C10, C11 |
| Kinematics and Rates of Change | F | C1, C2, C3, C5, C6 | C7, C8, C10, C11 |
| Optimisation | F | C1, C3, C5, C6 | C7, C8, C10, C11 |
| Optimisation Problems | F | C1, C2, C3, C6 | C7, C10 |
| Rates of Change Applications | F | C1, C2, C3, C6 | C7 |
| Second Derivative Test | F | C1, C2, C3, C6 | C7, C8, C11 |
| Stationary Point Classification | F | C1, C2, C3, C5, C6 | C7, C10, C11 |
| Second Derivative, Concavity and Points of Inflection | D | C3 | C7, C8, C10, C11 |
| Applications of Differentiation Exam Practice | C | — | C7, C10 |
| Mixed Differential Calculus Exam Practice | B | — | — |

### Integral Calculus (`ma-c4-integral-calculus`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Applications of Integration: Total Change and Motion | F | C1, C3, C5, C6 | C7, C10, C11 |
| Area Between Curves | F | C3, C5, C6 | C7, C10, C11 |
| Definite Integrals and the Fundamental Theorem of Calculus | F | C1, C2, C3, C5, C6 | C7, C8, C10, C11 |
| Definite Integrals with Standard Forms | F | C3, C5, C6 | C7, C10, C11 |
| Reverse Chain Rule and Simple Substitution Forms | F | C1, C3, C5, C6 | C7, C8, C10, C11 |
| Standard Integrals: Trigonometric, Exponential and Logarithmic Forms | F | C1, C3, C5, C6 | C7, C8, C10, C11 |
| The Trapezoidal Rule and Area Approximation | F | C3, C5, C6 | C7, C11 |
| Antidifferentiation and the Reverse Power Rule | D | C3 | C7, C10 |
| Area Between Two Curves | D | C1, C3, C5 | C7, C8, C11 |
| Area Under a Curve | D | C1, C3 | C7, C8, C10, C11 |
| Further Integral Calculus Exam Practice | D | C3, C5 | C7, C10, C11 |
| Indefinite Integrals and the Constant of Integration | D | C5 | C7, C10 |
| Initial Conditions and Finding the Particular Primitive | D | C3, C5 | C7, C11 |
| Signed Area and Total Area | D | C3, C5 | C7, C10, C11 |
| Mixed Integral Calculus Exam Practice | C | — | C7 |
| The Trapezoidal Rule | C | — | C10 |

### Exponential and Logarithmic Functions (`ma-e1-exponential-and-logarithmic-functions`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Exponential Growth and Decay Modelling | F | C1, C2, C3, C5, C6 | C7, C8, C10, C11 |
| Solving Equations with e and ln | F | C3, C5, C6 | C7, C10, C11 |
| Euler's Number and the Natural Logarithm | D | C1, C3 | C7, C8, C10, C11 |
| Logarithm Laws and Change of Base | D | C3 | C7 |
| Exponential and Logarithmic Functions Exam Practice | C | — | C7, C10 |

### Probability and Discrete Probability Distributions (`ma-s1-probability-and-discrete-probability-distributions`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Conditional Probability and Tree Diagrams | D _(judge F)_ | C3, C5 | C7, C11 |
| Independence and the Multiplication Rule | D | C5 | C7, C10, C11 |
| Probability Basics and Venn Diagrams | D _(judge F)_ | C2, C5 | C7, C11 |
| Probability — Two-Way Tables and Exam Practice | C _(judge D)_ | — | C7, C10 |

### Descriptive Statistics and Bivariate Data Analysis (`ma-s2-descriptive-statistics-and-bivariate-data`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Correlation and Least-Squares Regression | F | C1, C3, C6 | C7, C8, C10, C11 |
| Interpreting Association and Residuals | F | C1, C2, C3, C5, C6 | C7, C8, C11 |
| Standard Deviation, Z-Scores, and Standardised Values | F | C1, C3, C5, C6 | C7, C8, C10, C11 |
| Spread, IQR, Box Plots and Outliers | C _(judge D)_ | — | C11 |
| Data Displays and Measures of Centre | B | — | C10 |

### Random Variables (`ma-s3-random-variables`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Normal Distribution and Empirical Rule | F | C1, C2, C3, C5, C6 | C7, C8, C11 |
| Random Variables and Probability Distributions | F | C3, C5 | C7, C10, C11 |
| Mixed Statistical Analysis Exam Practice | C | — | C7, C10, C11 |

### Modelling Financial Situations (`ma-m1-modelling-financial-situations`)

| Lesson | Grade | Core fails | Warns |
|---|---|---|---|
| Arithmetic and Geometric Series | F | C3, C5, C6 | C7, C11 |
| Future Value of Annuities | F | C1, C2, C3, C5, C6 | C7, C10, C11 |
| Limiting Sums and Infinite Series | F | C3, C5, C6 | C7, C10 |
| Present Value and Loan Repayments | F | C3, C5, C6 | C7, C8, C10, C11 |
| Comparing Financial Options | D | C1, C3, C5 | C7, C10, C11 |
| Growth Factors, Compound Interest, and Depreciation | D | C3, C5 | C8, C10, C11 |
| Mixed Financial Mathematics Exam Practice | D _(judge F)_ | C5 | C10, C11 |
| Sequences and Series in Financial Mathematics | D | C5 | C7, C8, C10 |
| Arithmetic and Geometric Sequences Review | C | — | C7, C10 |
| Recurrence Relations in Financial Contexts | C _(judge D)_ | — | C7, C8, C10, C11 |
| Sequences, Series and Financial Mathematics Exam Practice | C | — | C10 |

## F-grade lessons — top fix each

- **Differentiating Polynomial Functions** (ma-c1-introduction-to-differentiation) — C1: Add an intuition: the derivative is the slope function; the sum rule works because the whole curve's slope is the sum of each term's slope.
- **Differentiating Polynomial Terms** (ma-c1-introduction-to-differentiation) — C1: Open with the derivative as the gradient/instantaneous rate of change before any rule.
- **Increasing and Decreasing Functions** (ma-c1-introduction-to-differentiation) — C1: Add a mental model: gradient sign = direction of travel; positive slope = climbing, so output rises as x rises.
- **Stationary Points** (ma-c1-introduction-to-differentiation) — C1: Add a model: at the top of a hill the curve is instantaneously flat; gradient 'pauses' at 0 between rising and falling.
- **Tangents and Normals** (ma-c1-introduction-to-differentiation) — C1: Add a geometric picture: tangent = curve's instantaneous direction; normal = line straight across it, like a road and its kerb.
- **Applications with Extended Differentiation** (ma-c2-differential-calculus) — C6: Rewrite as developed prose that builds each idea from intuition, not a formula lookup table.
- **Product and Quotient Rules** (ma-c2-differential-calculus) — C1: Add an area/incremental picture: when both factors change, the product grows by each times the other's change.
- **Standard Derivatives: Trig, Exponential and Logarithmic Functions** (ma-c2-differential-calculus) — C1: Add intuition: slope of sine traces cosine; e^x is the function equal to its own slope.
- **The Chain Rule** (ma-c2-differential-calculus) — C1: Add a 'rates multiply / gears' model: outer rate times inner rate, with Delta-u intuition.
- **Curve Sketching with Calculus** (ma-c3-applications-of-differentiation) — C1: Add a mental model: the graph is a hill/valley; f' is the slope you'd feel walking it, f'' is whether the slope is steepening or easing.
- **Curve Sketching with Derivatives** (ma-c3-applications-of-differentiation) — C1: Add intuition: f'(x) is the slope at each point; where slope=0 the curve momentarily flattens and turns.
- **Kinematics and Rates of Change** (ma-c3-applications-of-differentiation) — C2: Open each idea with the everyday picture (how fast position changes) before naming the derivative.
- **Optimisation** (ma-c3-applications-of-differentiation) — C1: Add an intuition: the peak/valley is where the curve momentarily stops rising/falling, so the slope is zero there.
- **Optimisation Problems** (ma-c3-applications-of-differentiation) — C1: Add a mental model: extrema sit where the graph momentarily levels off, so gradient is zero there.
- **Rates of Change Applications** (ma-c3-applications-of-differentiation) — C1: Add a speedometer/slope-at-an-instant picture: the rate is the steepness of the quantity-vs-time graph right now.
- **Second Derivative Test** (ma-c3-applications-of-differentiation) — C1: Add intuition: slope going from negative to positive (rising f') means a valley, hence minimum.
- **Stationary Point Classification** (ma-c3-applications-of-differentiation) — C1: Add a picture: a smile (concave up) holds a valley/min; a frown holds a peak/max.
- **Applications of Integration: Total Change and Motion** (ma-c4-integral-calculus) — C1: Build the picture: chop time into tiny bits, rate x dt = small change, sum = total; area under the rate curve.
- **Area Between Curves** (ma-c4-integral-calculus) — C3: Add a Riemann-strip argument: a thin strip has height (top-bottom), width dx; summing/integrating gives area.
- **Definite Integrals and the Fundamental Theorem of Calculus** (ma-c4-integral-calculus) — C1: Open with the picture: a definite integral accumulates signed area between a and b.
- **Definite Integrals with Standard Forms** (ma-c4-integral-calculus) — C3: Explain WHY subtracting antiderivative values yields accumulated change; at least an area/net-change argument.
- **Reverse Chain Rule and Simple Substitution Forms** (ma-c4-integral-calculus) — C3: Show d/dx[e^{ax+b}]=a e^{ax+b}, hence integral needs 1/a to undo the a.
- **Standard Integrals: Trigonometric, Exponential and Logarithmic Forms** (ma-c4-integral-calculus) — C1: Frame as reverse-differentiation: 'what function has this as its derivative?' so results are recoverable.
- **The Trapezoidal Rule and Area Approximation** (ma-c4-integral-calculus) — C3: Derive by summing n trapezia of area (h/2)(y_i+y_{i+1}); show interior ordinates appear in two trapezia hence doubled.
- **Exponential Growth and Decay Modelling** (ma-e1-exponential-and-logarithmic-functions) — C1: Add intuition: k is the per-unit-time fractional growth rate compounded instant by instant.
- **Solving Equations with e and ln** (ma-e1-exponential-and-logarithmic-functions) — C3: Add a sentence deriving ln(e^x)=x from inverse-function meaning; explain extraneous roots come from domain loss when combining logs.
- **Graph Transformations** (ma-f1-working-with-functions) — C1: Add a model: the graph hits each height when the input reaches its old value, so f(x-a) reaches it later (right).
- **Reflections, Stretches, and Translations** (ma-f1-working-with-functions) — C1: Add a point-tracking model: follow a sample point (e.g. (1,4)) through each transformation to its new location.
- **Exponential and Logarithmic Graphs in Graphing Techniques** (ma-f2-graphing-techniques) — C1: Add intuition: a^x keeps halving toward 0 but never reaches it; log undoes that, so input must stay positive.
- **Inverse Functions** (ma-f2-graphing-techniques) — C3: Show the reflection follows from swapping coordinates; explain one-to-one ensures each output maps back to a unique input.
- **Arithmetic and Geometric Series** (ma-m1-modelling-financial-situations) — C3: Add the pairing argument for arithmetic and the multiply-by-r-and-subtract derivation for geometric.
- **Future Value of Annuities** (ma-m1-modelling-financial-situations) — C3: Show each deposit grows a different number of periods; sum the GP to build FV formula.
- **Limiting Sums and Infinite Series** (ma-m1-modelling-financial-situations) — C3: Derive from the finite sum and show r^n -> 0 when |r|<1, motivating the 1-r denominator.
- **Present Value and Loan Repayments** (ma-m1-modelling-financial-situations) — C3: Derive PV by inverting compound growth: if PV grows to FV over n periods, then PV=FV/(1+r)^n.
- **Correlation and Least-Squares Regression** (ma-s2-descriptive-statistics-and-bivariate-data) — C1: Add a scatter-cloud mental picture: r measures how close points lie to a straight line, sign = slope direction.
- **Interpreting Association and Residuals** (ma-s2-descriptive-statistics-and-bivariate-data) — C1: Picture the residual as how far a point sits above/below the line: the line's guessing error.
- **Standard Deviation, Z-Scores, and Standardised Values** (ma-s2-descriptive-statistics-and-bivariate-data) — C1: Build a 'rulers of different sizes' / 'how many steps from average' model so the z-score idea persists without the formula.
- **Normal Distribution and Empirical Rule** (ma-s3-random-variables) — C1: Add a picture-based model: the curve's area is the proportion of data; z counts steps of one SD from the mean.
- **Random Variables and Probability Distributions** (ma-s3-random-variables) — C3: Derive E(X) from relative frequencies: over N trials, value x occurs about P(X=x)N times, so mean = sum x P(X=x).
- **Compound Angle Formulas** (ma-t2-trigonometric-functions-and-identities) — C1: Add a geometric or rotation picture of why sin(A+B) decomposes into those four products.
- **Exact Values with Compound Angles** (ma-t2-trigonometric-functions-and-identities) — C2: State each identity, then give a plain-English idea of why a sum of angles splits this way before applying it.
- **Graphs of Sine, Cosine, and Tangent** (ma-t2-trigonometric-functions-and-identities) — C1: Anchor sine/cosine to a point moving round the unit circle; let period, range, start values fall out of that picture.
- **Trigonometric Identities and Simplification** (ma-t2-trigonometric-functions-and-identities) — C1: Anchor to the unit circle: x^2+y^2=1 with x=cos, y=sin gives the identity as Pythagoras.
- **Further Trigonometry Equations and Identities** (ma-t3-trigonometric-equations) — C1: Add a model (e.g. angle-addition geometry / why sin(x+y) decomposes) that survives forgetting the formula.

## B-grade (strongest) lessons

- **Mixed Differential Calculus Exam Practice** (ma-c3-applications-of-differentiation)
  - A solid (B) mixed exam-practice lesson, correctly calibrated to its revision type. All six core criteria pass: it teaches a portable decision framework, leads with intuition, justifies method choices in worked steps, interprets every final answer in context, and addresses major misconceptions. No core fails and no secondary warns. Only minor info-level blemishes: WE2 mislabels P(x) as a 'profit function' absent from the stem, and a couple of steps state the action more than the reasoning. Not an A because the teaching, while clean, stays at competent rather than benchmark depth and the step-level decision justification is occasionally thin.
- **Data Displays and Measures of Centre** (ma-s2-descriptive-statistics-and-bivariate-data)
  - Solid Advanced-tier teaching: all core criteria pass with good mental models, intuition-first ordering, and strong misconception coverage. The main gap is depth - the balance-point WHY is asserted rather than briefly demonstrated, and overall the prose and worked examples run short. These are secondary (C10 warn), not core fails, so the lesson lands at a strong B.

---

## Prioritized fix backlog

Because the failure is one repeated pattern, the fix is a **systematic teaching rework** applied
lesson by lesson, not 90 bespoke redesigns. Recommended order:

**P1 — Calculus core (C1, C2, C3): 17 F-grade lessons.** Highest exam weight, worst grades. For each
lesson add (a) a one-line mental model (slope-function, hill/valley, area-accumulation), (b) the
expected derivation or limiting argument (first principles, the FTC/net-change argument, reverse-
differentiation), and (c) rewrite worked-example steps to justify the decision rather than name the
operation. The per-lesson `topFix` lines in the scorecard above are concrete starting points.

**P2 — Remaining F lessons in the other units: 27 lessons** (Functions/Graphing, Trig, Integral
Calculus, Exp/Log, Statistics, Financial). Same three moves. Several have a strong analogue already in
the course to copy the register from (see the two B lessons below).

**P3 — D lessons: 26 lessons.** Usually a single core gap — most commonly a missing C3 "why". Cheaper
per-lesson fixes; many become C/B by adding one derivation paragraph and tightening the worked steps.

**P4 — Course-wide secondary lift (do alongside P1–P3):**
- **C7** lead every rule with a concrete numeric instance before generalising.
- **C11** attach a diagram/table/graph to the visual topics that lack one (transformations, curve
  sketching, box plots, the normal curve, tree diagrams) — the project already has renderer payloads
  (`cartesianGraph`, `boxPlotDiagram`, `normalDistributionDiagram`, `probabilityTreeDiagram`, etc.)
  used elsewhere, so this is wiring existing components into teaching, not new infrastructure.
- **C10** several lessons are too short for Advanced depth; the added "why" paragraphs largely resolve
  this.

## What "good" already looks like in this course

Two lessons passed all core criteria and are the register to lift the rest toward:

- **Data Displays and Measures of Centre** (MA-S2) — "The mean is the balance point… one extreme value
  can pull the mean towards it"; the median "depends on position rather than the size of every value,
  so it is usually more resistant to an outlier"; closes with an explicit *when to use which* decision
  framework. Mental model + intuition + misconception, all present.
- **Mixed Differential Calculus Exam Practice** (MA-C3) — teaches a portable decision framework, leads
  with intuition, and interprets every final answer in context. Proof that even a revision lesson can
  clear the bar.

Both fall short of A only on depth (C10), not on any core criterion.

## Calibration and limitations of this pass

- **Trustworthy harshness.** The adversarial verifier upheld 66 of 78 flagged grades and softened only
  12 (mostly F→D or D→C where a brief model was present or an exam-practice lesson was over-pitched).
  Spot-checks against source confirmed the verdicts are grounded in the actual text, not hallucinated.
- **Teaching-only scope.** Practice questions were not scored. The productive-thinking/generalisation
  criterion was treated as informational because the standard permits it to live in the question layer.
  A lesson's *questions* may therefore be stronger than its *teaching* grade implies.
- **Single-judge per lesson.** Each grade is one judge plus (where flagged) one verifier. Treat
  individual borderline C/D grades as indicative; the course-level pattern is robust.
- **LaTeX/mojibake** was not separately audited here; the extraction read resolved strings as students
  see them, but a targeted rendering pass (per `audit:questions`) is still worthwhile.

## Recommended next steps

1. Decide whether to proceed to **fixing** the calculus core (P1) — that is a separate, content-editing
   work item (the user opted for *report only* on this pass).
2. Fix the duplicate `optimisation` id/slug data bug.
3. Run the same AI-judge pass on the next course to keep building the quality map; the workflow and
   rubric are now calibrated and reusable (`scripts/extract-y12adv-teaching.ts` generalises by swapping
   the course source, and the workflow script is parameterised by lesson list).

## Artefacts

- Per-lesson verdicts (full findings, strengths, verify assessments) and the scorecard JSON were
  produced by the audit run and are available in the session scratchpad if a deeper per-lesson view is
  needed. This document is the durable summary.
