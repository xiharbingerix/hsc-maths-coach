# Year 9 Wave 6 — Chapter 5 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then.

## Scope

Legacy lessons mapping onto a Chapter 5 (`length-area-surface-area-volume`) section. Source: the
Wave 0 port-vs-author audit. Affected tables: `lesson_progress`, `mastery_events`, `student_mastery`,
`student_subtopic_mastery`, `student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | length-area-surface-area-volume | perimeter-area-review | (same) | length-area-surface-area-volume | length-and-perimeter / area | remap slug (split) |
| year-9-mathematics(+core/advanced) | length-area-surface-area-volume | composite-area | (same) | length-area-surface-area-volume | composite-shapes-perimeter-area | remap slug |
| year-9-mathematics(+core/advanced) | length-area-surface-area-volume | surface-area-prisms | (same) | length-area-surface-area-volume | surface-area-prisms-pyramids | remap slug |
| year-9-mathematics(+core/advanced) | length-area-surface-area-volume | surface-area-cylinders | (same) | length-area-surface-area-volume | surface-area-cylinders | identity (slug unchanged) |
| year-9-mathematics(+core/advanced) | length-area-surface-area-volume | volume-prisms | (same) | length-area-surface-area-volume | volume-prisms | identity (slug unchanged) |
| year-9-mathematics(+core/advanced) | length-area-surface-area-volume | volume-cylinders | (same) | length-area-surface-area-volume | volume-cylinders | identity (slug unchanged) |

`circle-circumference-sector-perimeter` was authored in Wave 1; its legacy rows fold into that
section. Where an old lesson maps to two new sections (perimeter-area-review → length-and-perimeter /
area), assign rows to `area` by default and review on execution. The three identity-slug rows need no
remap; they are already correctly keyed (only their content changed).

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 5 section keeps its Wave 0 Cambridge tag
(3 consolidating incl. the Wave 1 `circle-…`, 4 core, 1 path, 0 extending). No tag is left unjustified.
