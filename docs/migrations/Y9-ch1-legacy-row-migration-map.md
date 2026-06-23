# Year 9 Wave 2 — Chapter 1 legacy-row migration map

**Status: NOT EXECUTED.** This is the concrete map only. No production write is performed in this
wave. The remap must be run (and verified) as a pre-UN-hide task, and only after explicit, direct
in-chat authorisation from the owner. Year 9 courses remain `hidden` until then, so the stale rows
below are not exposed in the meantime.

## Scope

Only legacy lessons that map onto a Chapter 1 (`computation-financial-maths`) section are listed.
The legacy Year 9 progress/mastery data was found by `scripts/audit-y9-legacy-rows.ts` (F audit,
2026-06-23): ~121 rows across 3 users (1 owner test account + 2 inactive students). Affected tables:
`lesson_progress`, `mastery_events`, `student_mastery`, `student_subtopic_mastery`,
`student_mastery_history`. (`saved_lesson_plans` errored — table/column likely absent.)

## Map (old → new)

| Old course | Old unit | Old lesson | New course | New unit | New lesson | Action |
| --- | --- | --- | --- | --- | --- | --- |
| year-9-mathematics(+core/advanced) | financial-mathematics | wages-and-earnings | (same course) | computation-financial-maths | income | remap slug |
| year-9-mathematics(+core/advanced) | financial-mathematics | tax-and-net-earnings | (same course) | computation-financial-maths | payg-income-tax | remap slug |
| year-9-mathematics(+core/advanced) | financial-mathematics | simple-interest-introduction | (same course) | computation-financial-maths | simple-interest | remap slug (already authored, Wave 1) |
| year-9-mathematics(+core/advanced) | financial-mathematics | penalty-rates | — | — | — | retire (no Cambridge Y9 slot) |
| year-9-mathematics(+core/advanced) | financial-mathematics | non-wage-income | — | — | — | retire |
| year-9-mathematics(+core/advanced) | financial-mathematics | spending-money | — | — | — | retire |
| year-9-mathematics(+core/advanced) | financial-mathematics | deposits-and-loans | — | — | — | retire |
| year-9-mathematics(+core/advanced) | financial-mathematics | buy-now-pay-later | — | — | — | retire |

The remaining Chapter 1 sections (computations-with-integers, decimal-places-significant-figures,
rational-numbers, computation-with-fractions, ratios-rates-best-buys, percentages-and-money,
percentage-increase-decrease, profits-and-discounts, compound-interest-depreciation,
compound-interest-formula) are **net-new** to the Year 9 structure — there is no legacy Year 9 lesson
that maps onto them, so there are no rows to migrate for those slugs.

## Execution plan (deferred)

1. Get direct in-chat authorisation from the owner.
2. For "remap slug" rows: `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old>` (per
   table that keys by slug; verify the exact column per table first).
3. For "retire" rows: leave in place (harmless while hidden) or deactivate on the owner's decision —
   do **not** hard-delete student data.
4. Re-run `scripts/audit-y9-legacy-rows.ts` to confirm zero remaining legacy-slug rows for the
   remapped lessons.

## PathTag review

No interim pathTag was changed in this wave. Every Chapter 1 section keeps the Cambridge-assigned
tag from the Wave 0 skeleton (7 consolidating, 5 core, 0 path/extending). No tag is left unjustified.
