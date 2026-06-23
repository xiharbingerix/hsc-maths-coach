# Year 9 Wave 4 — Chapter 3 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then, so these
rows are not exposed.

## Scope

Legacy lessons mapping onto a Chapter 3 (`pythagoras-trigonometry`) section. Source: the Wave 0
port-vs-author audit. Affected tables (as before): `lesson_progress`, `mastery_events`,
`student_mastery`, `student_subtopic_mastery`, `student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | pythagoras-hypotenuse | (same) | pythagoras-trigonometry | pythagoras-theorem | remap slug |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | pythagoras-shorter-side | (same) | pythagoras-trigonometry | pythagoras-shorter-sides | remap slug |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | right-triangle-applications | (same) | pythagoras-trigonometry | pythagoras-2d-problems | remap slug |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | trigonometric-ratios / trig-ratios-intro | (same) | pythagoras-trigonometry | introducing-trigonometric-ratios | remap slug |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | finding-sides-right-triangles / trig-finding-sides-* | (same) | pythagoras-trigonometry | finding-unknown-side-lengths / solving-for-the-denominator | remap slug (split) |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | finding-angles-right-triangles / trig-finding-angles | (same) | pythagoras-trigonometry | finding-unknown-angles | remap slug |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | trig-applications | (same) | pythagoras-trigonometry | trigonometry-applications | remap slug |
| year-9-mathematics(+core/advanced) | pythagoras-trigonometry | trig-bearings | (same) | pythagoras-trigonometry | bearings | remap slug |

`pythagoras-3d-problems` is **net-new** (path) — no legacy lesson maps onto it, so there are no rows
to migrate for that slug. Where one old lesson maps to two new sections (the sides split), assign
its rows to `finding-unknown-side-lengths` by default (the closer match); review on execution.

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 3 section keeps its Wave 0 Cambridge tag
(3 consolidating, 6 core, 1 path, 0 extending). No tag is left unjustified.
