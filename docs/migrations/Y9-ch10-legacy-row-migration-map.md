# Year 9 Wave 11 — Chapter 10 legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this wave. The remap runs as a pre-UN-hide
task after explicit direct in-chat owner authorisation. Year 9 stays `hidden` until then.

## Scope

Legacy lessons mapping onto a Chapter 10 (`quadratic-equations-parabolas`) section. Source: the
Wave 0 port-vs-author audit. Affected tables: `lesson_progress`, `mastery_events`, `student_mastery`,
`student_subtopic_mastery`, `student_mastery_history`.

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | quadratic-equations-parabolas | quadratic-equations-factorise | (same) | quadratic-equations-parabolas | solving-quadratics-factorising | remap slug |
| year-9-mathematics(+core/advanced) | quadratic-equations-parabolas | cubic-equations | — | — | — | retire (no Cambridge Y9 slot) |

The remaining Chapter 10 sections — quadratic-equations, solving-quadratics-factorising-basic,
quadratic-equations-problems, the-parabola, sketching-dilations-reflections, sketching-translations,
sketching-parabolas-intercept-form — are **net-new** to the Year 9 structure (Path-level parabola
graphing and quadratic-equation work), so there are no legacy rows to migrate for those slugs.

## Execution plan (deferred)

1. Direct in-chat owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` per slug-keyed table.
3. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. All 8 Chapter 10 sections keep their Wave 0 Cambridge
tag (all `path`). No tag is left unjustified.

## Program note

With Chapter 10 authored, **all 102 Year 9 sections across the 10 chapters are complete** (0 stubs,
audit:lessons 0 failures). The remaining program steps are: merge the chapter PRs in order (Ch8 #33 →
Ch9 #34 → Ch10), run the consolidated legacy-row migration (Chapters 1–10 maps), then flip the three
Year 9 courses from `hidden` to `available`.
