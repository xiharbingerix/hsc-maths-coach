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
