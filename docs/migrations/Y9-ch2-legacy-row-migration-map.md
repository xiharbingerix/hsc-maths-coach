# Year 9 Wave 3 — Chapter 2 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write is performed in this wave. The remap runs
as a pre-UN-hide task, after explicit direct in-chat authorisation from the owner. Year 9 courses
stay `hidden` until then, so the rows below are not exposed.

## Scope

Legacy lessons that map onto a Chapter 2 (`expressions-equations-inequalities`) section. Source: the
Wave 0 port-vs-author audit (`docs/migrations/Y9-wave0-port-vs-author-audit.md`). Affected tables (as
for Chapter 1): `lesson_progress`, `mastery_events`, `student_mastery`, `student_subtopic_mastery`,
`student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | expressions-equations | expanding-expressions | (same course) | expressions-equations-inequalities | expanding-algebraic-expressions | remap slug |
| year-9-mathematics(+core/advanced) | expressions-equations | linear-equations-two-step | (same course) | expressions-equations-inequalities | linear-equations-one-side | remap slug |
| year-9-mathematics(+core/advanced) | expressions-equations | linear-equations-three-step | (same course) | expressions-equations-inequalities | linear-equations-both-sides | remap slug |
| year-9-mathematics(+core/advanced) | expressions-equations | equations-with-fractions | (same course) | expressions-equations-inequalities | linear-equations-both-sides | remap slug (folded) |
| year-9-mathematics(+core/advanced) | expressions-equations | cubic-equations | — | — | — | retire (no Cambridge Y9 slot) |

The other Chapter 2 sections (algebraic-expressions, simplifying-algebraic-expressions,
using-formulas, linear-inequalities, simultaneous-substitution, simultaneous-elimination,
simultaneous-equations-problems, quadratic-equations-ax2-c) are **net-new** to the Year 9 structure —
no legacy lesson maps onto them, so there are no rows to migrate for those slugs.

Note: legacy `algebraic-fractions-*` and `quadratic-equations-factorise` map to the **Chapter 8**
quadratic-techniques unit, not Chapter 2 — they are deferred to that chapter's wave.

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. "retire": leave in place (harmless while hidden) or deactivate on the owner's decision — never hard-delete.
4. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 2 section keeps its Wave 0 Cambridge tag
(2 consolidating, 5 core, 5 path, 0 extending). No tag is left unjustified.
