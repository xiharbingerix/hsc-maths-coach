# Year 9 Wave 8 — Chapter 7 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then.

## Scope

Legacy lessons mapping onto a Chapter 7 (`properties-geometrical-figures`) section. Source: the
Wave 0 port-vs-author audit (chapter 7 geometry row). Affected tables: `lesson_progress`,
`mastery_events`, `student_mastery`, `student_subtopic_mastery`, `student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | properties-geometrical-figures | similar-figures / ratio-scale-factors | (same) | properties-geometrical-figures | enlargement-similar-figures | remap slug |
| year-9-mathematics(+core/advanced) | properties-geometrical-figures | angle-relationships / angles-review | (same) | properties-geometrical-figures | angles-and-triangles | remap slug |
| year-9-mathematics(+core/advanced) | properties-geometrical-figures | parallel-line-angles | (same) | properties-geometrical-figures | parallel-lines | remap slug |
| year-9-mathematics(+core/advanced) | properties-geometrical-figures | scale-drawings / geometric-representations / networks-introduction | — | — | — | retire (no Cambridge Y9 slot) |

`quadrilaterals-polygons`, `congruent-triangles`, `congruence-in-proof`, `similar-triangles` and
`proving-similar-triangles` are **net-new** to the Year 9 structure (geometric reasoning / proof), so
there are no rows to migrate for those slugs. Exact legacy slugs are confirmed against the prod data
at execution time; where a legacy lesson has no Cambridge slot its rows are retired (left in place
while hidden, or deactivated on the owner's decision — never hard-deleted).

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 7 section keeps its Wave 0 Cambridge tag
(2 consolidating, 2 core, 4 path, 0 extending). No tag is left unjustified.
