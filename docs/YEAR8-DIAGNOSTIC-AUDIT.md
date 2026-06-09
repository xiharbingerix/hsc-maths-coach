# Year 8 Diagnostic Audit

_Audit date: 9 June 2026_

## Summary

The Year 8 diagnostic is a compact 20-question multiple-choice quiz covering eight diagnostic units. It is usable as a quick intake check, but it is currently stronger as a broad confidence screener than as a robust placement diagnostic.

Main findings:

- Difficulty is mostly low and does not progress meaningfully inside most units.
- The diagnostic covers each listed diagnostic unit, but misses the built `algebra-foundations` catalogue unit.
- Seven of the eight diagnostic units are not yet supported by real lesson content.
- Algebra has a course-support mismatch: diagnostic questions target `algebra-equations`, while the built Year 8 algebra content is under `algebra-foundations`.
- Several curriculum descriptions promise broader coverage than the diagnostic currently tests.

## Coverage Table

| Diagnostic unit | Questions | Concepts tested | Real lesson support | Coverage assessment |
| --- | ---: | --- | --- | --- |
| Number Operations and Properties (`number-operations`) | 3 | Directed-number addition, irrational numbers, percentage discount | No lessons | Partial. Misses fractions, index notation, rational-number operations, and broader financial contexts. |
| Algebra and Equations (`algebra-equations`) | 3 | Expanding one bracket, one-step/two-step equation solving, HCF factorising | No lessons for this slug | Mismatched. Similar skills exist in built `algebra-foundations`, but this diagnostic unit points to an empty catalogue unit. |
| Linear Relationships (`linear-relationships`) | 2 | Substitution into `y = 2x + 3`, gradient as rise/run | No lessons | Thin. Misses plotting points, intercepts, graph interpretation, and creating rules from tables or graphs. |
| Pythagoras' Theorem (`pythagoras-theorem`) | 3 | Hypotenuse, shorter side, coordinate distance | 6 real lessons | Good coverage for a short diagnostic, but two questions use the 3-4-5 pattern. |
| Geometric Properties and Reasoning (`geometry-properties`) | 2 | SSS congruence, linear scale factor | No lessons | Thin. Misses angle reasoning, similarity evidence, congruence test selection, and proof-style reasoning. |
| Volume and Surface Area (`volume-and-surface-area`) | 2 | Rectangular prism volume, cylinder volume expression | No lessons | Too narrow. Does not test surface area, composite solids, unit reasoning, or formula selection beyond volume. |
| Data Analysis and Graphs (`data-and-graphs`) | 3 | Median, IQR, fair sampling | No lessons | Reasonable breadth for three questions, but misses frequency tables, cumulative frequency, back-to-back plots, and interpreting displays. |
| Probability and Chance (`probability-and-chance`) | 2 | Single-event probability, two-flip sample space | No lessons | Thin. Misses tree diagrams, arrays, two-step probability calculation, and expected outcomes. |

Catalogue gap:

- `algebra-foundations` exists in `lib/newCourseCatalog.ts` with 6 lessons and an override file, but is absent from the diagnostic `units` array.

## Difficulty Progression

The diagnostic is ordered by unit, not by increasing difficulty. Within most units, questions remain at entry level:

- Number Operations progresses from directed-number addition to irrational-number recognition to percentage discount. This is a reasonable mini-progression.
- Algebra moves from expansion to equation solving to factorising, but the factorising item is unsupported by the built `algebra-foundations` focus, which explicitly says no factorisation.
- Linear Relationships has only two questions and both are straightforward.
- Pythagoras has a reasonable progression: hypotenuse, shorter side, coordinate distance.
- Geometry, Measurement, and Probability each have only two questions, so progression is too shallow.
- Data has a useful mix of calculation and interpretation, but all questions are still low to moderate.

Overall difficulty is probably too easy for a diagnostic intended to prioritise Year 8 learning gaps. A high-performing student could score well without demonstrating graphing, multi-step algebra, surface area, or multi-stage probability.

## Duplicate Concepts

- `y8-py1` and `y8-py3` both reduce to a 3-4-5 right-triangle relationship. Keep one, but change the other to a non-triple or a less familiar triple if the goal is stronger discrimination.
- `y8-no3`, `y8-vs1`, `y8-dg1`, and `y8-pc1` are all single-step arithmetic/recognition checks. They are not duplicates by topic, but they create a repeated low-cognitive-demand pattern.
- Algebra has overlap between `y8-ae1` and the built `algebra-foundations` unit, but the unit slug mismatch prevents that overlap from being useful in routing.

## Ambiguous Wording

- `y8-no3`: "priced at $80 before sale" is understandable, but "originally priced at $80" would be cleaner.
- `y8-gp1`: "using three equal side pairs" is mathematically intended, but "three pairs of equal corresponding sides" would be more precise.
- `y8-dg3`: "usually most fair" is acceptable in context, but "least biased" would better match statistical language.
- `y8-pc2`: The answer assumes order matters for two coin flips. That is correct for sample spaces, but "recording the result in order" would remove any doubt.

## Questions That Are Too Easy

These are appropriate as warmups but weak as diagnostic discriminators:

- `y8-no1`: `-6 + 14` is a basic directed-number check.
- `y8-ae1`: `3(x + 4)` only tests single-bracket distribution.
- `y8-ae2`: `2x + 5 = 17` is a basic two-step equation.
- `y8-lr1`: substitution into `y = 2x + 3` is very direct.
- `y8-vs1`: rectangular prism volume is direct multiplication with no distractor depth.
- `y8-dg1`: median of five already-ordered values is very easy.
- `y8-pc1`: even number on a fair die is a standard one-step probability.

Recommendation: retain a few easy items for confidence, but add at least one moderate item per unit that requires representation, interpretation, or a two-step calculation.

## Questions That Are Too Hard Or Potentially Out Of Scope

- `y8-ae3`: HCF factorising is not supported by the built `algebra-foundations` unit, whose focus says "No quadratics, no simultaneous equations, no factorisation." It may belong in the older `algebra-equations` plan, but that unit has no lessons.
- `y8-no2`: Irrational-number recognition is reasonable for Year 8 extension within the stated unit description, but it is unsupported by real lesson content and may be harder than nearby number items.
- `y8-py3`: Coordinate distance is supported by Pythagoras lesson content, but it is a larger conceptual jump than the other Pythagoras items. It is acceptable if intentionally used as the harder Pythagoras discriminator.

## Unsupported By Real Lesson Content

Only `pythagoras-theorem` is fully supported by real Year 8 lesson content.

Unsupported diagnostic units:

- `number-operations`
- `algebra-equations`
- `linear-relationships`
- `geometry-properties`
- `volume-and-surface-area`
- `data-and-graphs`
- `probability-and-chance`

Special mismatch:

- `algebra-foundations` has real lesson content but is not in the diagnostic.
- `algebra-equations` is in the diagnostic but has no lessons.

This matters because diagnostic results seed mastery and route students to unit pages. A student who misses algebra questions is routed to `/course/year-8-mathematics/algebra-equations`, not the built algebra content.

## Weaknesses

- The diagnostic is too short for eight units: most units have only two or three questions.
- Several unit descriptions are broader than the question coverage.
- There are no visual or graph-based stimuli, even for graphing, geometry, measurement, data, and probability.
- There is little medium-to-hard discrimination.
- Course support is uneven: Pythagoras is ready; most other diagnostic outcomes point to placeholders.
- Algebra routing is misaligned with the currently built Year 8 algebra unit.

## Recommended Fixes

1. Align algebra slugs first.
   Decide whether the diagnostic should use `algebra-foundations` or whether the catalogue should keep `algebra-equations`. The diagnostic should not route algebra weaknesses to an empty unit while real algebra lessons exist elsewhere.

2. Add one medium discriminator per unit.
   Examples: fraction/index operation for Number, table-to-rule for Linear Relationships, surface area for Measurement, a tree-diagram or two-stage probability item for Probability.

3. Replace or strengthen duplicate-low-demand items.
   Change one Pythagoras 3-4-5 item to a non-triple decimal answer, a coordinate pair with negative values, or a real-context shorter-side problem.

4. Add visual stimuli where the curriculum expects representation.
   Linear graphs, triangle diagrams, prism/cylinder diagrams, data displays, and probability trees would make the diagnostic more faithful to course skills.

5. Keep the easy items, but rebalance.
   A good 20-question version should include roughly 6 easy, 10 moderate, and 4 harder questions. The current version is closer to mostly easy with a few moderate items.

6. Flag unsupported routing until lessons exist.
   If the diagnostic remains live before the course is complete, consider changing result copy or route behaviour so students are not sent to placeholder units without warning.

## Validation

Passed:

- `npm.cmd run build`
- `npx.cmd tsc --noEmit`
