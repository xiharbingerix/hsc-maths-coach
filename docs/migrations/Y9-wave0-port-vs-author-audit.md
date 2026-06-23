# Year 9 Wave 0 — Port-vs-Author Audit (required before Wave 1)

Classifies all **102** Cambridge Year 9 sections (the new hidden-stub skeleton) against the
**82** existing authored Year 9 lessons (union of the pre-restructure base/core/advanced courses,
retained orphaned after the skeleton) and the just-completed Year 10 content. Produced read-only
from the catalog; no content authored.

## Method & headline data

- New distinct sections: **102**.
- Existing authored Y9 lessons (pre-restructure, now orphaned): **82**.
- New sections with an **identical-slug** existing lesson (direct reuse): **10**.
- Existing lessons with **no** identical new slug (orphaned by slug): **72** — but many are
  **adaptable** to a net-new section on the same topic (different slug).

## A. Direct reuse — identical slug (10)

These new sections already have an existing Y9 lesson of the same slug; the Wave 1 port can relocate
the lesson (preserve slug, re-point its override's `unit.slug` guard) with little/no re-authoring:

`box-plots`, `gradient-intercept-form`, `index-notation`, `linear-inequalities`, `linear-modelling`,
`scientific-notation`, `simple-interest`, `surface-area-cylinders`, `volume-cylinders`, `volume-prisms`.

## B. Adapt — existing Y9 lesson, same topic, different slug (~40)

Existing lessons map cleanly to a net-new Cambridge slug and can be adapted (content largely reusable,
slug/scope adjusted). Representative mappings by chapter:

| New chapter | Adaptable existing Y9 lessons |
|---|---|
| 1 Computation & financial maths | wages-and-earnings→income, tax-and-net-earnings→payg-income-tax (+ penalty-rates/non-wage/spending/deposits/buy-now-pay-later are extra Y9 finance with no Cambridge slot → retire or fold) |
| 3 Pythagoras & trig | pythagoras-hypotenuse/-shorter-side→pythagoras-theorem/-shorter-sides; right-triangle-applications→pythagoras-2d-problems; trigonometric-ratios/trig-ratios-intro→introducing-trigonometric-ratios; finding-sides-right-triangles/trig-finding-sides-*→finding-unknown-side-lengths/solving-for-the-denominator; finding-angles-right-triangles/trig-finding-angles→finding-unknown-angles; trig-applications→trigonometry-applications; trig-bearings→bearings |
| 4 Linear relationships | gradient-from-points/gradient-foundations→gradient; parallel-lines-foundations/parallel-perpendicular-lines→perpendicular-parallel-lines; midpoint-distance-coordinate→midpoint-length-segment; cartesian-plane-review/tables-rules-and-graphs→introducing-linear-relationships; equations-of-lines→finding-equation-of-a-line; direct-variation/distance-time-graphs→gradient-direct-proportion |
| 5 Length, area, SA & volume | perimeter-area-review→length-and-perimeter/area; composite-area→composite-shapes-perimeter-area; surface-area-prisms→surface-area-prisms-pyramids |
| 6 Indices & surds | multiplying-dividing-powers→index-laws-multiplying-dividing; power-of-a-power/zero-index→zero-index-power-of-power; numerical-negative-indices→negative-indices; magnitude-and-rounding→scientific-notation-significant-figures |
| 2 / 8 Expressions & quadratic techniques | expanding-expressions→expanding-algebraic-expressions/expanding-binomial-products; algebraic-fractions-add-subtract/-multiply-divide→simplifying-algebraic-fractions-*; linear-equations-two/three-step→linear-equations-one-side/both-sides; equations-with-fractions→equations-with-algebraic-fractions; quadratic-equations-factorise→solving-quadratics-factorising; cubic-equations (no Cambridge Y9 slot → retire) |
| 2 Simultaneous | simultaneous-equations-substitution/-elimination/-graphical→simultaneous-substitution/-elimination/graphical-solutions-simultaneous |
| 9 Probability & data | simple-complementary-events→review-of-probability; sample-spaces/multi-stage-events/independent-events/dependent-events→arrays-two-step-experiments/tree-diagrams; venn-diagrams/two-way-tables→venn-diagrams-two-way-tables; conditional-probability/using-set-notation (adv) → using-set-notation; mean-median-mode-range-review→mean-median-mode; quartiles-iqr→range-interquartile-range; standard-deviation-introduction (no Cambridge Y9 slot → retire); comparing-data-sets/data-based-decisions→fold into stats sections |
| 7 Geometry | similar-figures/ratio-scale-factors→enlargement-similar-figures; scale-drawings, geometric-representations, networks-introduction (no Cambridge Y9 slot → retire) |

## C. Net-new authoring — no Y9 analog (~50)

Cambridge sections with no existing Y9 lesson, requiring fresh authoring (some adaptable **down from
the just-completed Year 10** content — flagged):

- **Ch 1:** decimal-places-significant-figures, rational-numbers, computation-with-fractions,
  ratios-rates-best-buys, percentages-and-money, percentage-increase-decrease, profits-and-discounts,
  compound-interest-depreciation, compound-interest-formula.
- **Ch 2:** algebraic-expressions, simplifying-algebraic-expressions, solving-word-problems,
  using-formulas, simultaneous-equations-problems, quadratic-equations-ax2-c.
- **Ch 3:** pythagoras-3d-problems (adapt from Y10 trig-applications-3d).
- **Ch 4:** lines-with-one-intercept, graphing-lines-using-intercepts, graphical-solutions-simultaneous.
- **Ch 5:** circle-circumference-sector-perimeter.
- **Ch 6:** index-laws-extended, fractional-indices-surds, operations-with-surds
  (adapt from Y10 measurement-and-surds).
- **Ch 7:** angles-and-triangles, parallel-lines, quadrilaterals-polygons, congruent-triangles,
  congruence-in-proof, similar-triangles, proving-similar-triangles (adapt from Y10 geometry).
- **Ch 8:** perfect-squares-difference-of-squares, factorising-* (5 sections),
  further-add-subtract-algebraic-fractions (adapt from Y10 quadratic-expressions-equations).
- **Ch 9:** data-and-sampling, relative-frequencies, stem-and-leaf-plots, grouping-data-into-classes
  (adapt from Y10 statistics wave).
- **Ch 10:** all 8 parabola/quadratic-graph sections (**strong adapt from the just-completed Y10
  parabolas-rates-variation + functions-polynomials-graphs waves**).

## Totals (for Wave 1 planning)

| Class | Count | Wave 1 effort |
|---|---|---|
| A. Direct reuse (identical slug) | **10** | relocate + guard re-point, minimal re-author |
| B. Adapt (existing Y9 lesson) | **~40** | port + adjust slug/scope |
| C. Net-new (no Y9 analog) | **~52** | author fresh; ~25 adaptable down from Year 10 |

Plus the per-section **D5 (10) + D6 (12) pools** for all 102 (essentially all net-new — see
ADR-Y9-001 authoring contract).

**Existing lessons with no Cambridge Y9 home (retire/redirect, do not force-map):** penalty-rates-overtime,
non-wage-earnings, spending-and-budgets, deposits-and-repayments, buy-now-pay-later-loans,
cubic-equations, standard-deviation-introduction, geometric-representations, networks-introduction,
scale-drawings, comparing-data-sets, data-based-decisions, probability-simulations. Their authored
content is retained in git; redirect their lesson URLs during Wave 1.

*Read-only analysis; nothing authored or migrated.*
