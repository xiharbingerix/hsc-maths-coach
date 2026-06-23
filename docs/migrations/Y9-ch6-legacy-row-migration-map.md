# Year 9 Wave 7 — Chapter 6 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then.

## Scope

Legacy lessons mapping onto a Chapter 6 (`indices-surds`) section. Source: the Wave 0 port-vs-author
audit. Affected tables: `lesson_progress`, `mastery_events`, `student_mastery`,
`student_subtopic_mastery`, `student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | indices-surds | multiplying-dividing-powers | (same) | indices-surds | index-laws-multiplying-dividing | remap slug |
| year-9-mathematics(+core/advanced) | indices-surds | power-of-a-power / zero-index | (same) | indices-surds | zero-index-power-of-power | remap slug |
| year-9-mathematics(+core/advanced) | indices-surds | numerical-negative-indices | (same) | indices-surds | negative-indices | remap slug |
| year-9-mathematics(+core/advanced) | indices-surds | magnitude-and-rounding | (same) | indices-surds | scientific-notation-significant-figures | remap slug |
| year-9-mathematics(+core/advanced) | indices-surds | index-notation | (same) | indices-surds | index-notation | identity (slug unchanged) |
| year-9-mathematics(+core/advanced) | indices-surds | scientific-notation | (same) | indices-surds | scientific-notation | identity (slug unchanged) |

`index-laws-extended`, `fractional-indices-surds` and `operations-with-surds` are **net-new** to the
Year 9 structure (adapted from Y10 measurement-and-surds), so there are no rows to migrate for those
slugs. The two identity-slug rows (`index-notation`, `scientific-notation`) are already correctly
keyed; only their content changed.

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 6 section keeps its Wave 0 Cambridge tag
(5 core, 4 path, 0 consolidating/extending). No tag is left unjustified.
