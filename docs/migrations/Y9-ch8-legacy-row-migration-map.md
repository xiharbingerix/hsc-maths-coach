# Year 9 Wave 9 — Chapter 8 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then.

## Scope

Legacy lessons mapping onto a Chapter 8 (`probability-data-analysis`) section. Source: the Wave 0
port-vs-author audit ("Probability & data" row). Affected tables: `lesson_progress`,
`mastery_events`, `student_mastery`, `student_subtopic_mastery`, `student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | probability-data-analysis | simple-complementary-events | (same) | probability-data-analysis | review-of-probability | remap slug |
| year-9-mathematics(+core/advanced) | probability-data-analysis | sample-spaces / multi-stage-events / independent-events / dependent-events | (same) | probability-data-analysis | arrays-two-step-experiments / tree-diagrams | remap slug (split) |
| year-9-mathematics(+core/advanced) | probability-data-analysis | venn-diagrams / two-way-tables | (same) | probability-data-analysis | venn-diagrams-two-way-tables | remap slug |
| year-9-mathematics(+core/advanced) | probability-data-analysis | conditional-probability / using-set-notation (adv) | (same) | probability-data-analysis | using-set-notation | remap slug |
| year-9-mathematics(+core/advanced) | probability-data-analysis | mean-median-mode-range-review | (same) | probability-data-analysis | mean-median-mode | remap slug |
| year-9-mathematics(+core/advanced) | probability-data-analysis | quartiles-iqr | (same) | probability-data-analysis | range-interquartile-range | remap slug |
| year-9-mathematics(+core/advanced) | probability-data-analysis | box-plots | (same) | probability-data-analysis | box-plots | identity (slug unchanged) |
| year-9-mathematics(+core/advanced) | probability-data-analysis | standard-deviation-introduction | — | — | — | retire (no Cambridge Y9 slot) |
| year-9-mathematics(+core/advanced) | probability-data-analysis | comparing-data-sets / data-based-decisions | (same) | probability-data-analysis | (fold into stats sections) | fold / retire |

`relative-frequencies`, `data-and-sampling`, `stem-and-leaf-plots` and `grouping-data-into-classes`
are **net-new / adapted** to the Year 9 structure, so there are no direct legacy rows to migrate for
those slugs. Where one old lesson maps to two new sections (sample-spaces → arrays /
tree-diagrams), assign its rows to `arrays-two-step-experiments` by default and review on execution.
`box-plots` is identity (only its content changed).

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 8 section keeps its Wave 0 Cambridge tag
(3 consolidating, 5 core, 3 path, 1 extending). No tag is left unjustified.
