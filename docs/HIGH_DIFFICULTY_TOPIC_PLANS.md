# Phase 1 Topic Plans (high-difficulty pool)

Per-topic richness/archetype plans, produced and supervisor-approved **before** authoring.
Each follows [HIGH_DIFFICULTY_DOMAIN_PLAYBOOKS.md](./HIGH_DIFFICULTY_DOMAIN_PLAYBOOKS.md)
and [WORKSHEET_ACCEPTANCE_SPEC.md](./WORKSHEET_ACCEPTANCE_SPEC.md).

---

## ma-f1-working-with-functions (Year 12 Advanced) — Domain: Functions — Target: 6 D5 + 6 D6 — ✅ AUTHORED (2026-06-23)

**Acceptance:** 6 D5 → lesson `masteryQuizPool`s (domain-range, graph-transformations ×2,
intercepts ×2, solving-graphically); 6 D6 → `lib/challenges/year12AdvancedFunctions.ts`
(4 sets spread across intercepts / graph-transformations / modelling / solving lessons so
they carry distinct subtopics). All 12 single-answer, hand-solved, seeded at d5/d6
(ma-f1 D5 24→30, D6 0→6). Worksheet sample (harder/14): D3×1/D4×3/D5×4/D6×6, 7 subtopics,
max 3/subtopic, 53.5 min, 7 new items drawn. Archetype tallies as planned (reverse 7,
reconstruction 4 incl. 3 recon-first, structure-interaction 3, modelling 2, routine 0).
`tsc`/`git diff --check` clean. Not committed/seeded (awaiting supervisor sign-off + user).

Topic content: domain/range/function notation, graph transformations
(translate/reflect/stretch), intercepts & key features, graphical equation/inequality
solving, modelling with functions.

### D5 structures (6 items, ≤2 per archetype)
1. **Coefficient recovery from features** (×2) — e.g. parabola through two given points
   with a stated axis of symmetry / vertex condition → find a coefficient. *(reverse)*
2. **Transformation recovery from before/after** (×2) — given `y = a f(x − h) + k` with a
   stated point/feature, find `a` or `k`. *(reverse)*
3. **Domain/range from a constraint** (×1) — largest domain a non-trivial √ / reciprocal
   expression is defined, or value of a parameter for a stated range. *(constraint)*
4. **Graphical interpretation** (×1) — from a supplied graph, the number of solutions of
   `f(x) = k`, or the x-interval where one graph exceeds another. *(structure-reading)*

### D6 structures (6 items, ≤2 per archetype, hard-to-predict answers) — *rebalanced per supervisor*
1. **Two-condition parameter system** (×2) — two stated features → solve for two parameters
   → interpret a third feature (e.g. y-intercept or vertex coordinate). *(synoptic, ≥3 stages)*
2. **Composed transformation + intersection/tangency** (×1) — apply a transformation, then
   find where the image meets a line/curve under a condition. *(synoptic, structure-interaction)*
3. **Modelling / reconstruction** (×2) — one builds a function from a scenario then finds a
   feature across ≥3 stages; one **reconstructs** a function from partial information
   *before* using it (e.g. "a parabola has vertex X and passes through Y → …"). *(modelling)*
4. **Reciprocal / absolute-value interaction** (×1) — e.g. solve `|f(x)| = g(x)`, or
   intersection count of a reciprocal with a line under a constraint. *(synoptic, structure-interaction)*

### Function Reconstruction (Functions-domain analogue of geometry-interaction)
At least **2 of the 12** items must be **reconstruction-first**: infer the function /
parameter / transformation from partial graph features, domain-range behaviour, a
transformation chain, or composition/inverse behaviour, *before* it can be used.

### Final archetype allocation table (every item = exactly one primary archetype)
| # | Diff | Primary archetype | Tags | Recon-first |
|---|---|---|---|---|
| D5-1 | 5 | Coefficient recovery | reverse, reconstruction | ✓ |
| D5-2 | 5 | Coefficient recovery | reverse | |
| D5-3 | 5 | Transformation recovery | reverse, reconstruction | ✓ |
| D5-4 | 5 | Transformation recovery | reverse | |
| D5-5 | 5 | Domain/range constraint | constraint | |
| D5-6 | 5 | Graphical interpretation | structure-interaction | |
| D6-1 | 6 | Two-condition parameter system | reverse, reconstruction, synoptic | |
| D6-2 | 6 | Two-condition parameter system | reverse, synoptic | |
| D6-3 | 6 | Transformation + intersection/tangency | structure-interaction, synoptic | |
| D6-4 | 6 | Modelling / reconstruction | modelling, reconstruction, reverse, synoptic | ✓ |
| D6-5 | 6 | Modelling / reconstruction | modelling, synoptic | |
| D6-6 | 6 | Reciprocal / absolute interaction | structure-interaction, synoptic | |

**End-of-topic tallies (target):** primary archetypes all ≤2 (coeff-recovery 2,
transformation-recovery 2, parameter-system 2, modelling/reconstruction 2, +1 each of
domain-constraint, graphical-interpretation, transformation+intersection, reciprocal/abs);
**reverse 7** (≥6), **reconstruction 4** (≥2, of which **3 reconstruction-first**),
**structure-interaction 3** (≥3), **modelling 2** (≥2), **routine 0**.

### Rejected procedural patterns (this topic)
- "State the domain/range" of a simple function; "find f(3)" (substitution/recognition).
- "Describe the transformation of `y = f(x) + 3`" / "sketch `y = (x−2)²`" (naming, not producing).
- "Find the x-intercepts" single-step factor.
- Any item where stripping the function-notation wrapper leaves one-step arithmetic.

### Gate tallies (target)
- Reverse-reasoning: ≥6 (coeff recovery ×2, transformation recovery ×2, parameter system ×2).
- Structure-interaction: ≥3 (graphical interpretation, transformation+intersection ×2, reciprocal/abs).
- Routine "state/find f(k)" items: 0.
- All single-answer preferred; multipart only where genuinely Section-II shaped.

### Placement
- D5 → the relevant lesson `masteryQuizPool` entries (`difficulty: 5`), spread across
  domain-range, transformations, intercepts, modelling lessons.
- D6 → a new `functionsWorkingChallenge` set in `lib/challenges/`, registered against the
  best-fit lesson slug(s) in `lib/challenges/index.ts`.

---

## ma-f2-graphing-techniques (Year 12 Advanced) — Domain: Functions — Target: 6 D5 + 6 D6 — ✅ AUTHORED (2026-06-23)

**Acceptance:** 6 D5 → lesson `masteryQuizPool`s (asymptotes ×2, exp-log ×2, absolute,
inverse); 6 D6 → `lib/challenges/year12AdvancedFunctionsGraphing.ts` (4 sets, ≤2 per
lesson: asymptotes 2, exp-log 2, inverse 1, absolute 1). All single-answer, hand-solved;
ma-f2 D5 12→18, D6 0→6. D6 archetypes: intersection-count ×2 (`f2-1` reciprocal min,
`f2-6` |x²−4|), asymptotic+param (`f2-2`), exp/log synthesis ×2 (`f2-3` log laws,
`f2-4` 2^x substitution), inverse constraint (`f2-5` f=f⁻¹ on y=x). Worksheet sample at
the **domain level** (ma-f1+ma-f2, the realistic generation scope): D3×1/D4×3/D5×4/D6×6,
9 subtopics, max 3/subtopic, ~53.5 min. *(Note: ma-f2 alone has only 4 lessons, so a
single-topic 14-Q harder worksheet structurally concentrates — a generation-scope reality,
not an authoring gap; realistic Functions worksheets draw across the domain.)* tsc/whitespace
clean. Not committed/seeded when authored — see PR.

Current: D5 12, D6 0 (P1). Lessons: asymptotes-reciprocal-graphs,
exponential-logarithmic-graphs, absolute-value-functions, inverse-functions.
Deliberately emphasises archetypes *under-represented* in ma-f1 (per the domain
diversity gate: across f1+f2+f3, no archetype family > 25% of total D6).

**D5 archetypes (6):** asymptotic behaviour — find an asymptote / a parameter for a
stated asymptote (×2); inverse-function value or constraint (×1); exp/log parameter
recovery (×1); absolute-value boundary — solve `|f(x)| = c` for the boundary (×1);
graphical equation reasoning — number of solutions of `f(x) = g(x)` (×1).

**D6 archetypes (6):** intersection-count condition — line vs reciprocal/exp, find the
`k` boundary for N intersections (×2); asymptotic + parameter — rational with a stated
asymptote and a point → parameter (×1); inverse-function constraint — `f(x) = f⁻¹(x)` /
self-inverse parameter (×1); absolute-value interaction — `|f(x)| = ` line, intersection
count/boundary (×1); exp/log synoptic equation requiring a substitution (×1).

**Tally targets:** reconstruction ≥2 (asymptotic-parameter, inverse-constraint); reverse
≥4; structure-interaction ≥5 (intersection, asymptotic, absolute, inverse, graphical);
modelling ~1 (graphing techniques is light on modelling — flagged); routine 0; no archetype > 2.

**Reject list:** "state the asymptote"; "find f⁻¹(x)" as a formula (unless one value);
"solve 2^x = 8" / "evaluate log" single-step; "sketch y = |x|"; any item that survives the
stripped-problem test only as one-step recognition.

**Domain 25% check:** combined f1+f2 D6 = 12; tangency/intersection family = f1(1)+f2(2)=3
(= 25%, not exceeded); parameter-system 2, modelling 2, all others ≤2. ✓

**Expected after authoring:** D6 0→6 single-answer ⟹ replay-ready ✅.

---

## year-11-extension/polynomials — Domain: Polynomials — Target: 6 D5 + 6 D6 (top-up) — ✅ AUTHORED (2026-06-23, supervisor-signed-off)

**Acceptance:** 6 D5 → lesson `masteryQuizPool`s (division, factor, roots ×2, graphs ×2);
6 D6 → `lib/challenges/year11ExtensionPolynomials.ts` (Vieta ×2 merged with existing
roots challenge, factor ×2, graphs ×2). Existing 3 D6 retained → D6 total 3→9; D5 15→21.
**All 6 new D6 exploit global structure; 2 are non-cubic quartics** (poly-2 Σ squares of a
quartic's roots, poly-5 quartic touch). Archetypes: Vieta 2, multiplicity 2, factor 1,
turning-point 1 (≤2 each). All single-answer, hand-solved.
**Generation-scope note (supervisor-accepted):** a single-topic harder worksheet for
polynomials concentrates (max ~6/subtopic) because it is a 5-lesson standalone topic with
the existing D6 clustered in roots-and-coefficients and no domain sibling. The pool is
replay-ready (D6-single 9); the right fix is generation-side (shorter single-topic hard
worksheets, or combined-topic worksheets for small topics), **not** more authoring. tsc/
git diff clean.

Current: D5 15, D6 3 (P2). The 3 existing D6 (Vieta/roots-and-coefficients) are **usable**
and exploit global structure, so this is a **top-up, not a rebuild** — add 6 genuine D5
+ 6 genuine D6 (D6 total → 9, well past replay-ready). Topic content: degree/leading
coefficient, remainder & factor theorems, division, Vieta (roots ↔ coefficients), building
polynomials from roots, multiplicity, end behaviour, sketching from factored form.

**Extension ceiling gate (supervisor):** ≥3 of the 6 new D6 must exploit **global**
polynomial structure (root sums/products, multiplicity, degree/turning-point constraints,
factor/remainder consequences, end behaviour, reconstruction) — not merely solving an
equation. *This plan targets all 6 as global-structure.*

**D6 archetypes (6, all global-structure, ≤2 per archetype):**
1. **Vieta reconstruction** (×2) — given root relationships of a cubic, find a coefficient
   or a symmetric function of the roots (e.g. sum of squares = (Σr)² − 2Σrs). *[root sums/products]*
2. **Multiplicity / repeated root** (×1) — find the parameter k for which a cubic has a
   repeated root (discriminant-of-derivative / shared root of p and p′). *[multiplicity]*
3. **Factor/remainder consequence** (×1) — two divisibility/remainder conditions → solve for
   two coefficients → a further value. *[factor theorem]*
4. **Reconstruction from partial information** (×1) — build a monic cubic from stated
   roots/values and read off a coefficient or evaluate it. *[reconstruction]*
5. **Turning-point / real-root count** (×1) — find the range of k for which a cubic has
   3 real roots (compare local max/min values), i.e. global end-behaviour reasoning. *[turning-point]*

**D5 archetypes (6, ≤2 per archetype):** remainder-theorem parameter; factor-theorem
coefficient; Vieta sum/product from coefficients; build a quadratic from given roots;
multiplicity value / touch point; end-behaviour or degree reasoning.

**Tally targets:** global-structure D6 = 6 (≥3 ✓); reconstruction ≥2 (Vieta recon ×2,
reconstruction ×1); reverse ≥5; no archetype > 2; routine 0.

**Reject list:** "evaluate p(2)"; "factorise this cubic" given a factor (single-step);
"state the degree"; "find the remainder" single-substitution; any item solvable by one
division or one substitution without using global structure.

**Expected after authoring:** D6 3→9 single-answer ⟹ replay-ready ✅; D5 15→21.

---

## ma-s2-descriptive-statistics-and-bivariate-data (Year 12 Advanced) — Domain: Statistics — Target: 6 D5 + 6 D6 — ✅ AUTHORED (2026-06-23, autonomous; GPT tab was down — pending retro sign-off)

**Acceptance:** 6 D5 → lesson `masteryQuizPool`s (centre, spread, SD, regression ×2, residuals);
6 D6 → `lib/challenges/year12AdvancedStatistics.ts` (4 sets ≤2/lesson: centre 2, SD 2,
regression 1, spread 1). All single-answer numeric, hand-solved. D5 15→21, D6 0→6.
D6: recover-from-mean (11), recover-from-median (8), z-reverse (72), change-effect (26),
regression reconstruction via r·s_y/s_x (20), outlier→median (6.5). Worksheet sample:
D3×1/D4×3/D5×4/D6×6, 5 subtopics, **max 4/subtopic**, ~53.5 min — passes cleanly (D6 spread
across 4 lessons). tsc/git diff clean. **First Statistics-domain topic** (sequential per the
parallelisation rule). Authored autonomously while the supervisor tab was down — to be sent
for retro sign-off.

Current: D5 15, D6 0 (P1). Lessons: data-displays-measures-of-centre,
spread-iqr-box-plots-outliers, standard-deviation-z-scores-standardised-values,
correlation-least-squares-regression, interpreting-association-residuals.

**D6 archetypes (6, statistics-rich per the domain playbook, ≤2 each):**
1. **Recover a value from a summary statistic** (×2) — unknown data value from a stated
   mean/median; or find the removed value that changes a mean by a given amount. *[reverse]*
2. **Effect of a change on a statistic** (×1) — exact new value of a statistic after a point
   is added/removed or the data is linearly transformed. *[change-effect]*
3. **z-score reverse** (×1) — recover a raw value or a missing mean/SD from a z-score. *[reverse]*
4. **Regression reconstruction** (×1) — least-squares gradient/prediction from summary stats
   (means, SDs, r), not a plotted line. *[reconstruction]*
5. **Misleading statistic / outlier** (×1) — which measure misrepresents + the deciding value
   (mean-vs-median under an outlier). *[interpretation, markable value]*

**D5 archetypes (6):** measure of centre with one inference; IQR / 1.5×IQR outlier boundary;
z-score forward; correlation-strength value; regression point prediction; effect-of-change.

**Reject list:** "find the mean/median/range" single-step; "read the median off the box plot";
"state r"; any pure extraction.

**Tally targets:** reverse ≥4; reconstruction ≥1; interpretation-with-value ≥1; no archetype > 2;
routine 0. All single-answer numeric. Expected after: D6 0→6 ⟹ replay-ready ✅; D5 15→21.

---

## ma-s1-probability-and-discrete-probability-distributions (Year 12 Advanced) — Domain: Probability — Target: 6 D5 + 6 D6 — ✅ AUTHORED (2026-06-23, supervisor-approved plan)

**Acceptance:** 6 D5 → lesson `masteryQuizPool`s (Venn ×2, independence ×2, exam ×2);
6 D6 → `lib/challenges/year12AdvancedProbability.ts` (3 sets ≤2/lesson: conditional 2,
independence 2, exam 2). All single-answer numeric, hand-solved. D5 12→18, D6 0→6.
D6: Bayes reverse P(B|A)=0.75, tree-count reverse r=5, union+independence P(B)=0.5,
complement reverse p=0.8, Bayes-machines 0.625, structural-bound min P(A∩B)=0.3.
Worksheet sample: D3×1/D4×3/D5×4/D6×6, 4 subtopics, max 5/subtopic, ~53.5 min — passes.
tsc/git diff clean. **ma-s3-random-variables owns the distribution/E[X]/Var D6 gates**
(parametric-distribution items reserved for it).

**⚠️ Catalog note:** in this app `ma-s1` holds only the *probability* lessons
(probability-basics-venn-diagrams, conditional-probability-tree-diagrams,
independence-multiplication-rule, probability-exam-practice). Discrete random variables /
E[X] / Var live in the **separate** `ma-s3-random-variables` topic. So the supervisor's
"expectation/variance interaction" and "distribution-parameter inference" D6 gates apply to
**ma-s3**, not ma-s1; this plan uses **probability-structure** archetypes instead.

Current: D5 12, D6 0 (P1). Target 6 D5 + 6 D6, single-answer, immediate replay-ready.

**D6 archetypes (6, all probability-structure / ≥4 structural required, ≤2 each):**
| # | Archetype | Tags |
|---|---|---|
| 1 | Reverse conditional / Bayes — from P(A|B),P(B),P(A) find P(B|A) | conditional/Bayesian, reverse |
| 2 | Reverse conditional / Bayes — defective-from-machine style | conditional/Bayesian, reverse |
| 3 | Reconstruct missing probabilities from constraints (two-way table / Venn + a conditional) | reconstruction |
| 4 | Independence validity — value of p making A,B independent (or decide if possible) | model-validity |
| 5 | Multi-stage tree reverse — branch prob from a stated overall prob (with/without replacement) | reconstruction, conditional |
| 6 | Complement structural — solve n (or p) from a stated "at least one" probability | reconstruction, complement |

**D6 coverage vs probability-domain gate:** reconstruction/reverse = 5 (≥2 ✓);
conditional/Bayesian = 3 (#1,#2,#5; ≥1 ✓); model-validity/contradiction = 1 (#4; ≥1 ✓);
≥4 structural = 6 ✓; no archetype > 2 (conditional-reverse 2, reconstruction-other ≤2);
no single distribution type > 50% (these are general probability — no binomial bloat).
*(Expectation/variance & distribution-parameter gates: N/A here — deferred to ma-s3.)*

**D5 archetypes (6):** conditional probability with one inference; complement; tree-diagram
probability; independence test (decide + the deciding value); Venn-region probability;
basic "at least one".

**Reject list:** "P(red) from a bag"; one-step conditional; "are these mutually exclusive?"
recall; direct multiplication for already-stated independent events; any single-step extraction.

**Expected after:** D6 0→6 single-answer ⟹ replay-ready ✅; D5 12→18.

---

## ma-s3-random-variables (Year 12 Advanced) — Domain: Statistics/Distributions — Target: 6 D5 + 6 D6 (top-up) — ✅ AUTHORED (2026-06-23, supervisor-approved plan)

**Acceptance:** 6 D5 → lesson `masteryQuizPool`s (random-variables ×3, mixed ×2, normal ×1);
6 D6 → `lib/challenges/year12AdvancedRandomVariables.ts` (2 sets: random-variables 3, mixed 3),
existing 3 normal-distribution D6 retained → D6 3→9; D5 12→18. D6 (with GPT's 2 mods applied):
binomial param-recon from both moments (n=10), parameterised pmf P(X=k)=ck (E[X]=7/3),
moment-interaction E[(X−3)²]=8 (non-trivial shift), validity-via-inferred-negative-probability
(P(X=1)=−0.2), pmf reconstruction (b=0.4), model comparison same-mean/different-variance
(Var diff=3). Binomial = 1 of 6; ≥4 reverse; all single-answer. Worksheet sample max
6/subtopic — **3-lesson topic, structural concentration** (generation-scope, not authoring;
per the small-topic ruling). tsc/git diff clean.

Current: D5 12, D6 3 (P2). Existing 3 D6 (normal-distribution challenge) usable → **top-up**:
add 6 D5 + 6 D6 (D6 total 3→9). Lessons: random-variables-probability-distributions,
normal-distribution-empirical-rule, mixed-statistical-analysis-exam-practice. This is where
the distribution / E[X] / Var D6 live (deferred from ma-s1).

**D6 archetype table (6, exactly meeting the category minimums):**
| # | Archetype (category) | Detail → answer | Family |
|---|---|---|---|
| 1 | Parameter reconstruction | binomial from **both** moments: mean 4, var 2.4 → n=10 (1−p=var/mean=0.6, p=0.4, n=10) | binomial |
| 2 | Parameter reconstruction | parameterised pmf P(X=k)=ck, k=1..3 → find E[X]=7/3 (c=1/6 first) | general pmf |
| 3 | Expectation–variance interaction | E[X]=2, Var(X)=1 → E[(X−1)²]=2 (=Var+E²−2E+1) | general |
| 4 | Distribution validity / contradiction | E[X]=2, E[X²]=3 → implied Var=−1 ⟹ impossible | general |
| 5 | Probability-mass reconstruction | P=0.1,a,b,0.2 over 1..4 with E[X]=2.7 → b=0.4 | general pmf |
| 6 | Model comparison / equivalence (NEW) | X∈{1,3} vs Y∈{0,4} both mean 2 → Var(Y)−Var(X)=3 | general |

**Coverage vs gates:** param reconstruction = 2 (#1,#2 ✓); E-Var interaction = 1 (#3 ✓);
validity/contradiction = 1 (#4 ✓); pmf reconstruction = 1 (#5 ✓); model comparison = 1 (#6 ✓).
Reverse-reasoning (summary → structure) = 4 (#1 recover n, #2 recover c, #4 recover Var, #5
recover b) ✓. **Distribution-family balance:** binomial = 1 of 6 (≤3 ✓); general discrete
pmf/table ≥2 (#2,#4,#5,#6 ✓) — not "binomials in disguise."

**D5 archetype table (6):** valid-pmf missing entry (sum→1); E[X] of a discrete pmf;
Var(X) of a discrete pmf; a single binomial probability with one inference; normal
empirical-rule region (68–95–99.7); expectation of a linear transformation E[aX+b].

**Reject list:** solve E(X)=np for p in one step; solve Var=np(1−p) in one step; direct
binomial probability evaluation; direct E[X] / Var calc; any item whose whole difficulty is
algebra once the formula is identified; "state the mean/variance formula".

**Domain-richness note:** the structural carry is the statistical reasoning (which moments
fix which parameters; when a claimed distribution is impossible; same-mean/different-variance
comparison), not arithmetic. Aiming to make ma-s3 the statistics-domain exemplar.

**Expected after:** D6 3→9 single-answer ⟹ replay-ready ✅; D5 12→18.

---

## ma-e1-exponential-and-logarithmic-functions (Year 12 Advanced) — Domain: Exponentials/Logs — Target: 6 D5 + 6 D6 — ✅ AUTHORED (2026-06-23, plan approved with #3/#5 upgrades)

*Supervisor upgrades applied:* #3 → log reconstruction (logₐ6=2, logₐ2=0.8 → logₐ4.5=1.6,
needs logₐ3 derived first); #5 → existence (for what k does log₂(x−1)=log₂(k−x) have a
solution → k>1). #1/#2/#4/#6 kept.

**Acceptance:** 6 D5 → lesson `masteryQuizPool`s (log-laws ×2, e/ln, solving, growth, exam);
6 D6 → `lib/challenges/year12AdvancedExpLog.ts` (5 sets ≤2/lesson). D6-single 0→6, D5 15→21.
D6: param-recon k=ln3; intercept+asymptote y(2)=11; log reconstruction 1.6; growth-inference
t=8; existence k>1; asymptote+intersection a=1. ≥4 reverse, 3 multi-property interaction
(#2,#5,#6), no archetype >2. Worksheet sample max 4/subtopic, ~53.5 min — passes cleanly
(5 lessons). tsc/git diff clean.

Current: D5 15, D6-single 0 (one existing D6 is multipart). Lessons: logarithm-laws-
change-of-base, eulers-number-natural-logarithm, solving-equations-e-ln,
exponential-growth-decay-modelling, exponential-logarithmic-exam-practice.

**D6 archetype table (6, meeting category minimums; ≥2 multi-property interaction):**
| # | Archetype (category) | Detail → answer | Interaction? |
|---|---|---|---|
| 1 | Parameter reconstruction | A·e^{kx} through (0,5) & (2,45) → k = ln 3 | |
| 2 | Parameter reconstruction | y = a + b·2^x: asymptote y=3 + point (0,5) → y(2) = 11 | intercept + asymptote |
| 3 | Exp/log identity structure | log_a 12 from log_a 2 = 0.3, log_a 3 = 0.5 → 1.1 | |
| 4 | Growth/decay model inference | pop 200 → 800 in 4 h; time to reach 3200 → t = 8 | |
| 5 | Domain / existence constraint | domain of log(x−1) + log(5−x) → 1 < x < 5 | two log conditions |
| 6 | Multi-condition reconstruction | y = a·2^x + c: asymptote y=−1 + crosses y=7 at x=3 → a = 1 | asymptote + intersection |

**Coverage vs gates:** parameter reconstruction 2 (#1,#2 ✓); exp/log identity 1 (#3 ✓);
growth/decay inference 1 (#4 ✓); domain/existence 1 (#5 ✓); multi-condition 1 (#6 ✓).
Reverse-reasoning (backward from structure) = #1, #2, #4, #6 (+#5) ≥4 ✓. Multi-property
interaction ≥2 → #2, #5, #6 = 3 ✓. No archetype > 2.

**D5 archetype table (6):** solve 2^{x+1}=16 (→3); evaluate log₂32 (→5); evaluate y=3·2^x at
x=4 (→48); solve log₃x=4 (→81); decay over 3 half-lives 80→10 (→10); index laws e^5/e^2 (→x=3).

**Reject list:** direct log solving; direct exponential solving; direct change-of-base
substitution; direct growth-formula application; routine graph reading; any item solvable by
identifying a known procedure and substituting immediately.

**Domain-richness note:** difficulty is carried by inverse/structural reasoning (recover a
base/rate, infer a model, combine logs strategically, intersect asymptote+feature), not by
running a formula. Bridges Functions → calculus.

**Expected after:** D6-single 0→6 ⟹ replay-ready ✅; D5 15→21.

---

## ma-c2-differential-calculus (Year 12 Advanced) — Domain: Calculus (differentiation techniques) — Target: 6 D5 + 6 D6 — ✅ AUTHORED (2026-06-23, plan approved with #6 upgrade)

*Supervisor upgrade applied:* #6 → factored derivative + parameter: f'(x)=(x−2)(x−k), k>2 →
f decreasing on 2<x<k (reason about the parameterised parabola's sign; no differentiation,
no trivial 1+x>0). Derivative-sign archetype, diversity, and reverse count (4) preserved.
**Acceptance:** 6 D5 → masteryQuizPools (standard-derivatives ×2, chain-rule, applications ×2,
exam); 6 D6 → lib/challenges/year12AdvancedDifferentiationTechniques.ts. D6 0→6, D5 17→23.

Current: D5 17, D6 0 (P1). Distinct from ma-c1 (intro: stationary pts/tangents) and ma-c3
(applications/optimisation), already live in PR #22. Lessons: standard-derivatives, chain-rule,
product-quotient-rules, applications-extended-differentiation, differentiation-techniques-exam-practice.
**Gate: reason FROM derivatives, not perform derivatives** — no "differentiate this horrible expression."

**D6 archetype table (6; uses product/quotient/chain/standard-derivatives but difficulty is structural):**
| # | Archetype (category) | Detail → answer | Reverse? | Multi-cond? |
|---|---|---|---|---|
| 1 | Function reconstruction | f=ax³+bx+c: horizontal tangent at x=1, f(1)=2, f(0)=4 → a=1 | ✓ | ✓ (tangent+2 pts) |
| 2 | Parameter inference (calculus cond.) | f=x·e^{kx} has a stationary point at x=−2 (product rule) → k=1/2 | ✓ | |
| 3 | Function reconstruction | y=a·ln x + bx: gradient 5 at x=1, gradient 4 at x=2 → a=2 | ✓ | ✓ (two gradients) |
| 4 | Stationary-point classification | f=x·e^x: classify the stationary point (2nd-deriv test) → minimum | | |
| 5 | Optimisation / extremum structure | f=x/(x²+a) has maximum value 1/4 (x>0), recover a (quotient rule) → a=4 | ✓ | |
| 6 | Derivative-sign / monotonicity | for what x is f=x·e^x increasing? (f'=e^x(1+x)>0) → x>−1 | | |

**Coverage vs gates:** function reconstruction 2 (#1,#3 ✓); stationary classification 1 (#4 ✓);
parameter inference 1 (#2 ✓); optimisation/extremum 1 (#5 ✓); derivative-sign/monotonicity 1 (#6 ✓).
Reverse-reasoning = #1,#2,#3,#5 (≥4 ✓). Multi-condition = #1,#3 (≥2 ✓). No archetype >2; no "find k" overload.

**D5 archetype table (6):** recover k from f'(3)=10 for f=x²+kx (→4); gradient of tangent to y=e^x at
x=0 (→1); x-coord of stationary point of y=x²−8x (→4); where y=x²−6x is decreasing (→x<3); chain-rule
gradient of y=(2x+1)³ at x=0 (→6); time velocity=0 for x=t²−4t (→t=2).

**Reject list:** direct product-rule execution; direct quotient-rule execution; direct chain-rule
execution; direct derivative evaluation; direct tangent-gradient calculation; any item whose first move
is "differentiate and substitute"; "differentiate this expression" with no reasoning beyond manipulation.

**Domain-richness note:** every D6 uses a genuine ma-c2 technique (product/quotient/chain/ln & e^x
derivatives) but the difficulty lives in *reasoning from* the derivative — reconstruct coefficients,
infer a parameter from a stationary condition, classify by 2nd-derivative, recover a from an extremum
value, deduce a monotonic interval. Bridges Functions/Exp-Logs → integral calculus.

**Expected after:** D6 0→6 ⟹ replay-ready ✅; D5 17→23.

---

## ma-c4-integral-calculus (Year 12 Advanced) — Domain: Calculus (integration) — Target: 6 D5 + 6 D6 (top-up) — ✅ AUTHORED (2026-06-23, plan approved with #4 upgrade)

*Supervisor upgrade applied:* #4 → equal-areas structure: find a>0 where area under y=x² on
[0,a] equals area under y=2x on [0,a] → a³/3=a² → a=3 (set two integrals equal; no single-step
substitution). Archetype (parameter inference via integral) and reverse count preserved.

Current: D5 48, D6-single 3 (existing area-between-curves challenge retained). Completes the
calculus domain after ma-c2. **Gate: use the integral as INFORMATION, not a computation
exercise** — no "evaluate this horrible integral." Lessons span integralCalculus.ts +
furtherIntegralCalculus.ts (antidifferentiation, constant-of-integration, initial-conditions,
definite-integrals/FTC, signed-area, area-under-curve, total-change/motion, exam, …).

**D6 archetype table (6):**
| # | Archetype (category) | Detail → answer | Reverse? | Multi-cond? |
|---|---|---|---|---|
| 1 | Function reconstruction (from f') | f'(x)=6x−4, f(2)=5 → f(0)=1 | ✓ | |
| 2 | Function reconstruction (from f'') | f''(x)=6, f'(1)=2, f(0)=4 → f(1)=3 | ✓ | ✓ (two conditions) |
| 3 | Signed-area reasoning | ∫₀ᵏ(x−2)dx=0, k>0 → k=4 | ✓ | |
| 4 | Parameter inference (integral constraint) | ∫₁³(ax+1)dx=12 → a=2.5 | ✓ | |
| 5 | Accumulation / net-change | rate r(t)=6−2t; when does volume return to initial? → t=6 | ✓ | |
| 6 | Multi-condition reconstruction | f=ax+b through (0,1) and ∫₀²f dx=6 → a=2 | ✓ | ✓ (point + area) |

**Coverage vs gates:** function reconstruction 2 (#1,#2 ✓); area/signed-area 1 (#3 ✓); parameter
inference via integral 1 (#4 ✓); accumulation/net-change 1 (#5 ✓); multi-condition reconstruction
1 (#6 ✓, #2 also). Reverse-reasoning = all 6 (≥4 ✓). Multi-condition = #2,#6 (≥2 ✓). No archetype >2.

**D5 archetype table (6):** recover C from f'=2x, f(1)=5 (→C=4); displacement from v=3t², t:0→2
(→8); area under y=2x on [0,3] (→9); recover limit from ∫₀ᵏ2 dx=10 (→k=5); reconstruct & evaluate
dy/dx=6x through (0,−2) at x=2 (→10); signed area ∫₋₁¹ x dx by symmetry (→0).

**Reject list:** direct antiderivative calculation; direct definite-integral evaluation; routine
substitution; routine area-under-a-curve; "find ∫f(x)dx" style; any item whose first move is simply
performing integration.

**Domain-richness note:** difficulty lives in reasoning about antiderivative structure, signed area,
accumulation/net-change, and recovering functions/parameters from integral conditions — mirroring the
ma-c2 "derivative as information" rule. Targets the integral-calculus exemplar.

**Expected after:** D6-single 3→9 ⟹ replay-ready ✅; D5 48→54.

---

## ma-t2-trigonometric-functions-and-identities (Year 12 Advanced) — Domain: Trigonometry — Target: 6 D5 + 6 D6 (top-up) — ✅ AUTHORED (2026-06-24, ma-t2 confirmed; #2/#5 + identity-richness mods applied)

*Supervisor mods applied:* #2 → identity-dependent angle reconstruction, sin θ = cos 2θ on
[0°,90°] via cos2θ=1−2sin²θ → θ=30° (beyond one-step cofunction); #5 → function-behaviour
reconstruction from extrema, f=a+b·sin x max 5 min −1 → a=2; identity-dependent D6 now = 2
(#2 double-angle, #3 Pythagorean). Existing 3 D6 (trig-equations lesson) retained.

⚠️ **Slug flag:** supervisor named "ma-t3 Trigonometric Functions and Identities". In THIS app
that topic's slug is **ma-t2-trigonometric-functions-and-identities** (D5 27, D6-single 3, P2);
the app's `ma-t3-trigonometric-equations` is the *equation-solving* topic (D5 6, D6 0) — which the
supervisor's reject list ("direct equation solving / solve a longer trig equation") explicitly bars.
So this plan targets the app's **ma-t2** (matches the supervisor's name + gates). Confirm before authoring.

Lessons (11) across furtherTrigonometry.ts (compound-angle-formulas, exact-values-compound-angles,
double-angle-formulas, further-trig-equations-identities, further-trigonometry-exam-practice) and
trigonometricFunctionsGraphs.ts (graphs-sine-cosine-tangent, amplitude-period-phase-vertical-shift,
trigonometric-equations [has the existing 3 D6], trigonometric-identities-simplification,
modelling-periodic-phenomena, mixed-trigonometric-functions-exam-practice).
**Gate: reward seeing structure, not surviving algebra.**

**D6 archetype table (6; ≤2 per archetype):**
| # | Archetype (category) | Detail → answer | Reverse? | Multi-prop? |
|---|---|---|---|---|
| 1 | Parameter reconstruction | y=a·sin(bx), amplitude 3, period π → a+b=5 | ✓ | ✓ (amplitude+period) |
| 2 | Angle reconstruction | cos θ = sin 50°, 0°<θ<90° → θ=40° | ✓ | |
| 3 | Identity-structure reasoning | sin θ + cos θ = 1.2 → sin θ cos θ = 0.22 (square the sum) | ✓ | |
| 4 | Existence / validity | for what m does sin θ = 2m−1 have a real solution? → 0≤m≤1 | ✓ | |
| 5 | Function-behaviour (range) | maximum value of f=5−3cos(2x) → 8 | | |
| 6 | Multi-condition reconstruction | θ in Q2 with sin θ = 3/5 → tan θ = −3/4 | ✓ | ✓ (value+quadrant) |

**Coverage vs gates:** parameter/angle reconstruction 2 (#1,#2 ✓); identity-structure 1 (#3 ✓);
multi-condition reconstruction 1 (#6 ✓); existence/validity 1 (#4 ✓); function-behaviour 1 (#5 ✓).
Reverse-reasoning = #1,#2,#3,#4,#6 (≥4 ✓). Multi-property = #1,#6 (≥2 ✓). No archetype >2; no "find θ" monoculture.

**D5 archetype table (6):** period of y=sin(3x) (→2π/3); amplitude of y=4cos x (→4); cos θ=sin 30°,
θ acute (→60°); recover b from y=2sin(bx), period π (→2); cos θ from sin θ=0.6 acute (→0.8, Pythagorean);
maximum of y=3sin x+2 (→5).

**Reject list:** direct identity proof; direct identity simplification; direct equation solving; routine
graph reading; routine exact-value evaluation; any item whose first move is applying a memorised identity
and grinding algebra.

**Domain-richness note:** difficulty lives in structural relationships, parameter/angle reconstruction,
identity recognition (square-the-sum), existence/range constraints, and combining a value with a quadrant
sign — not algebra grinding. Targets the trig-domain exemplar.

**Expected after:** D6-single 3→9 ⟹ replay-ready ✅; D5 27→33.

---

## ma-f3-polynomials — ⚠️ DOES NOT EXIST in the Year 12 Advanced catalog (resolved: substituted year-11-extension/polynomials above)

Y12 Advanced Functions = `ma-f1` + `ma-f2` only (no `ma-f3`). The genuine **polynomials**
topic is **`year-11-extension/polynomials`** (P2, currently D5 15 / D6 3) — a different
course. Year 10 also has `functions-polynomials-graphs`. Awaiting supervisor direction on
whether to substitute `year-11-extension/polynomials` as the second parallel plan (its
content matches the f3 archetype list: factor/remainder theorem, polynomial reconstruction,
multiplicity & turning-point structure, end-behaviour, parameterised constraints).

---

## ma-t3-trigonometric-equations (Year 12 Advanced) — Domain: Trigonometry — Target: 6 D5 + 6 D6 — ✅ AUTHORED (2026-06-24)

Completes the Y12 Advanced **trig strand** (**ma-t2 already replay-ready**) and brings the flagship
course to near-full high-difficulty coverage. Small topic: **2 lessons**
(`further-trig-equations-identities`, `further-trigonometry-exam-practice`) so 6 D6 sit 3-per-lesson —
the accepted small-topic concentration (cf. ma-s3, ma-f2). Before: **D5 6 / D6-single 0**.
D5 → `furtherTrigonometry.ts` masteryQuizPools; D6 → `lib/challenges/year12AdvancedTrigEquations.ts`.

**Supervisor mods applied** (approved-with-modifications): #3 upgraded from direct range-reading to
existence-via-transformation; #4 upgraded with a genuine period interaction; #5 converted from
impossibility to a count consequence — giving **two structural solution-count items** (#1, #5) plus
the identity-then-count #2.

**D6 archetype table (6; all single-answer, auto-markable):**
1. **Solution-count via frequency** — number of solutions of `sin(3x) = 1/2` on `[0, 2π]` → **6** (reason from 3 periods, do not enumerate).
2. **Identity-first → count** — number of solutions of `sin 2x = cos x` on `[0, 2π]` → **4** (double-angle, factor `cos x(2 sin x − 1)=0`, then count).
3. **Existence via transformation** *(upgraded)* — values of `k` for which `cos x + sin²x = k` has a solution → **−1 ≤ k ≤ 5/4** (substitute `sin²x = 1−cos²x`, get a quadratic in `cos x`, find its range over `[−1,1]`).
4. **Parameter reconstruction with period interaction** *(upgraded)* — smallest positive solution of `sin(2x − a) = 1` (`0 < a < 2π`) is `x = π/3`; find `a` → **π/6** (period is π because of the `2x`; must confirm π/3 is smallest, the n=−1 member being negative).
5. **Quadratic → count** *(upgraded)* — number of solutions of `2 cos²x − cos x − 1 = 0` on `[0, 2π]` → **4** (factor `(2 cos x + 1)(cos x − 1)=0`, then count).
6. **Structural symmetry (sum of solutions)** — the solutions of `cos x = 0.4` on `[0, 2π]` are `α, β`; find `α + β` → **2π** (reflection symmetry `β = 2π − α`).

**Coverage:** solution-count/periodicity **3** (#1 frequency, #2 identity→count, #5 quadratic→count);
existence-via-transformation 1 (#3); parameter reconstruction 1 (#4); structural symmetry 1 (#6).
**Reverse-reasoning ≥4** = #1, #3, #4, #6. **Multi-step interaction** = #2, #3, #4, #5. No archetype > 2.

**D5 archetype table (6; single-answer):** smallest positive solution of `2 sin x = √3` (π/3);
smallest positive solution of `tan x = 1` (π/4); number of solutions of `cos 2x = 1/2` on `[0, 2π]` (4);
smallest positive solution of `sin²x = 1/4` (π/6); smallest positive solution of `2 cos x + 1 = 0` (2π/3);
solution of `sin(x + π/6) = 1` on `[0, 2π]` (π/3).

**Reject list:** solve `sin x = c` / `cos x = c` / `tan x = c` in one routine step; direct equation
solving with no transformation; routine general-solution formula application; routine exact-value lookup;
any item whose whole difficulty is algebra once the equation type is identified.

**Before → after:** D5 6→12; D6-single 0→6 ⟹ replay-ready ✅.

**Domain-richness note:** difficulty is carried by trig STRUCTURE — periodicity/solution-count, identity
recognition before solving, existence/range constraints, reflection symmetry, and reconstructing an angle
parameter — not by grinding algebra after the equation is identified. Completes the Y12 Advanced trig domain
(ma-t1 the only remaining sibling).
