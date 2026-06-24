# Year 9 Wave 10 — Chapter 9 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then.

## Scope

Legacy lessons mapping onto a Chapter 9 (`quadratic-expressions-algebraic-techniques`) section.
Source: the Wave 0 port-vs-author audit ("Expressions & quadratic techniques" row). Affected tables:
`lesson_progress`, `mastery_events`, `student_mastery`, `student_subtopic_mastery`,
`student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | quadratic-expressions-algebraic-techniques | expanding-expressions | (same) | quadratic-expressions-algebraic-techniques | expanding-binomial-products | remap slug (also split with Ch2 expanding-algebraic-expressions) |
| year-9-mathematics(+core/advanced) | quadratic-expressions-algebraic-techniques | algebraic-fractions-multiply-divide | (same) | quadratic-expressions-algebraic-techniques | simplifying-algebraic-fractions-multiply-divide | remap slug |
| year-9-mathematics(+core/advanced) | quadratic-expressions-algebraic-techniques | algebraic-fractions-add-subtract | (same) | quadratic-expressions-algebraic-techniques | simplifying-algebraic-fractions-add-subtract | remap slug |
| year-9-mathematics(+core/advanced) | quadratic-expressions-algebraic-techniques | equations-with-fractions | (same) | quadratic-expressions-algebraic-techniques | equations-with-algebraic-fractions | remap slug |

The factorising sections (factorising-algebraic-expressions, factorising-difference-of-squares,
factorising-by-grouping, factorising-monic-trinomials, factorising-non-monic-trinomials),
perfect-squares-difference-of-squares and further-add-subtract-algebraic-fractions are **net-new**
to the Year 9 structure (adapted from Y10 quadratic techniques), so there are no legacy rows to
migrate for those slugs. `quadratic-equations-factorise` and `cubic-equations` map to Chapter 10 /
retire (see the Chapter 10 map).

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. All 11 Chapter 9 sections keep their Wave 0 Cambridge
tag (all `path`, 0 consolidating/core/extending). No tag is left unjustified.
