# D5/D6 Domain Richness Playbooks

Per-domain "rich structure" gates for the high-difficulty pool program. The biggest
risk at scale is **fake difficulty drift** — technically correct but low-assessment-value
questions (longer algebra ≠ harder). Before authoring a domain, an item must map to one
of that domain's listed **rich structures**; if it doesn't, it is not D5/D6 — relabel it.

Universal rules (all domains): every item passes the **Formal Quality Gate**
([QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md)); **D5** = ≥1 genuine
novel move; **D6** = synoptic + ≥3 dependent stages + ≥1 uncued strategic insight +
hard-to-predict answer; ≤2 items per archetype per batch; all auto-markable; independently
re-solved. The "stripped-problem test": remove the surface context — is there still a real
mathematical problem? If not, reject.

---

## Algebra (quadratics, equations, simultaneous, surds/indices)
**D5 structures:** parameter/discriminant reasoning (values of k for 0/1/2 solutions);
coefficient recovery from stated conditions; constraint between roots (sum/product);
reverse a simplification (find the original); equation with a hidden restriction (domain,
extraneous root). **D6:** two linked conditions → solve a system for parameters → interpret;
discriminant condition feeding a second computation; surd/index identity used to unlock a
non-obvious value. **Reject:** "solve this quadratic", "simplify", "expand" — procedure.

## Functions & Graphs (polynomials, exponential/log, reciprocal, transformations)
**D5:** find coefficients from points/intercepts/turning conditions; recover a transformation
from before/after; determine a parameter so a graph has a stated feature (asymptote, root
multiplicity); domain/range from a constraint. **D6:** combine a transformation + an
intersection/parameter condition across ≥3 stages; find where two parameterised curves meet
a simultaneous condition. **Reject:** "state the y-intercept", "is this even/odd" — recognition.

## Calculus (differentiation, integration, applications) — *pilot domain*
**D5:** reverse stationary conditions (coeff from a stationary point); parameter recovery;
optimisation with constraint substitution; interval-endpoint vs stationary; modelling
(max height, average cost). **D6:** synoptic optimisation (volume/cost with weighted
constraint); tangent/normal × geometry (triangle area, perpendicularity, meets-again via
double root); area-between/parameter; rates linking two quantities. **Reject:** "differentiate",
"find the tangent at x=k", "find the stationary points and classify" alone — routine.

## Probability
**D5:** conditional reversal (P(A|B) → P(B|A) via the table); recover a missing probability
from a constraint; complement reasoning where direct is hard; independence test (decide,
with the deciding value). **D6:** multi-stage tree with a hidden/with-without-replacement
twist → conditional → decision; combine counting + probability across ≥3 stages.
**Reject:** "P(red) from a bag", single-step extraction; "mutually exclusive = independent"
as a bare recall.

## Statistics (summary stats, displays, bivariate, distributions)
**D5:** recover a data value/parameter from a summary stat (mean/median/SD constraint);
spot the misleading statistic (which measure misrepresents, with the corrected value);
effect of a change (add/remove a point) on a specific statistic; z-score/parameter recovery.
**D6:** combine two displays/measures to infer an unstated quantity across ≥3 stages;
normal-distribution parameter recovery feeding a probability. **Reject:** "find the mean",
"read the median off the box plot" — extraction. Forcing 8+8 on basic displays risks fake
difficulty — prefer the tiered target (6+6 / 4+4).

## Financial Mathematics
**D5:** reverse the rate or term (given outcome, find r/n/t); compare two products and give
the deciding value; break-even; effect of compounding frequency. **D6:** multi-stage
annuity/loan with a changed parameter mid-stream; optimise a financial decision under a
constraint across ≥3 stages. **Reject:** "find the simple interest", single-formula
substitution.

## Geometry & Measurement (plane, circle geometry, solids, surface area/volume)
**D5:** work backwards from area/volume to a dimension; constraint between dimensions;
choose-the-right-figure then compute; composite figure requiring a decomposition decision.
**D6:** distance / area / angle / perpendicularity / parallelism / intersection-count
interactions across ≥3 stages; circle-geometry result feeding a measurement. **Reject:**
"find the area of this rectangle", plug-in measurement; ugly-number arithmetic grind.

## Trigonometry (ratios, identities, equations, applications, graphs)
**D5:** recover an angle/side from a non-obvious configuration; identity used to simplify
before solving; exact-value reasoning from a constraint; period/amplitude/phase recovery
from features. **D6:** 3D trig choosing the correct triangle then combining Pythagoras+trig
across ≥3 stages; equation requiring an identity substitution + interval reasoning; bearings
multi-leg. **Reject:** "find sin θ", "solve sin x = 0.5" single-step.

## Networks / Discrete Maths
**D5:** find a constraint that changes the optimal path/tree; recover an edge weight from a
stated total; compare two routes with the deciding value. **D6:** critical-path / minimal
spanning under a changed constraint across ≥3 stages; combine shortest-path + a second
condition. **Reject:** "find the shortest path" single pass; counting without inference.
*(Networks naturally supports fewer distinct rich structures — expect 6+6, not 8+8.)*

---

## How a domain is "opened"
Per the supervisor's parallelisation rule: author the **first** topic in a domain
**sequentially** and get it signed off (it teaches the domain's failure modes); only then
author further topics in that domain in parallel under this playbook.
