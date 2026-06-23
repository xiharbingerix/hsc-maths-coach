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

## ma-f3-polynomials — ⚠️ DOES NOT EXIST in the Year 12 Advanced catalog (resolved: substituted year-11-extension/polynomials above)

Y12 Advanced Functions = `ma-f1` + `ma-f2` only (no `ma-f3`). The genuine **polynomials**
topic is **`year-11-extension/polynomials`** (P2, currently D5 15 / D6 3) — a different
course. Year 10 also has `functions-polynomials-graphs`. Awaiting supervisor direction on
whether to substitute `year-11-extension/polynomials` as the second parallel plan (its
content matches the f3 archetype list: factor/remainder theorem, polynomial reconstruction,
multiplicity & turning-point structure, end-behaviour, parameterised constraints).
