# Year 9 Wave 5 — Chapter 4 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then, so these
rows are not exposed.

## Scope

Legacy lessons mapping onto a Chapter 4 (`linear-relationships`) section. Source: the Wave 0
port-vs-author audit. Affected tables (as before): `lesson_progress`, `mastery_events`,
`student_mastery`, `student_subtopic_mastery`, `student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | linear-relationships | gradient-from-points / gradient-foundations | (same) | linear-relationships | gradient | remap slug (gradient authored in Wave 1) |
| year-9-mathematics(+core/advanced) | linear-relationships | parallel-lines-foundations / parallel-perpendicular-lines | (same) | linear-relationships | perpendicular-parallel-lines | remap slug |
| year-9-mathematics(+core/advanced) | linear-relationships | midpoint-distance-coordinate | (same) | linear-relationships | midpoint-length-segment | remap slug |
| year-9-mathematics(+core/advanced) | linear-relationships | cartesian-plane-review / tables-rules-and-graphs | (same) | linear-relationships | introducing-linear-relationships | remap slug |
| year-9-mathematics(+core/advanced) | linear-relationships | equations-of-lines | (same) | linear-relationships | finding-equation-of-a-line | remap slug |
| year-9-mathematics(+core/advanced) | linear-relationships | direct-variation / distance-time-graphs | (same) | linear-relationships | gradient-direct-proportion | remap slug |

The remaining Chapter 4 sections — lines-with-one-intercept, graphing-lines-using-intercepts,
graphical-solutions-simultaneous, gradient-intercept-form — are **net-new** to the Year 9 structure;
no legacy lesson maps onto them, so there are no rows to migrate for those slugs. Where one old
lesson maps to a section already migrated in Wave 1 (gradient), its rows fold into that section.

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 4 section keeps its Wave 0 Cambridge tag
(1 consolidating, 6 core incl. the Wave 1 `gradient`, 4 path, 0 extending). No tag is left unjustified.
