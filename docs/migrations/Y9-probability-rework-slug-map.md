# Year 9 Probability rework — legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this pass. The remap runs as a
follow-up task once explicitly authorised — this rework touched code (catalog + lesson content)
only. The `probability-data-analysis` unit is live in production with real student progress, so
existing `lesson_progress` / `mastery_events` / `student_mastery` / `student_subtopic_mastery` /
`student_mastery_history` rows keyed by the pre-rework slugs below will show as "not started"
against the renamed/split slugs until this migration runs.

## Scope

The 10-lesson probability rework (see conversation/plan) replaced the 7 live probability lessons
in `probability-data-analysis` (both base/core/advanced pathways) with 10 lessons. `data-and-sampling`
and the 6 statistics lessons in the same unit are untouched and out of scope.

## Map (old → new)

| Old lesson (live pre-rework) | New lesson | Action |
| --- | --- | --- |
| review-of-probability | making-predictions **and** complementary-events | split — no automatic remap (both plausible destinations; assign case-by-case on execution, or default to `complementary-events`) |
| arrays-two-step-experiments | sample-space-and-probability | remap slug (`legacySlugs` already set in catalog) |
| tree-diagrams | tree-diagrams-multistage-events | remap slug (`legacySlugs` already set in catalog) |
| relative-frequencies | probability-simulations | remap slug (`legacySlugs` already set in catalog) |
| venn-diagrams-two-way-tables | venn-diagrams **and** two-way-tables | split — default rows to `venn-diagrams` (`legacySlugs` already set there); review split by original score/attempt content on execution |
| using-set-notation | venn-diagrams | remap slug (`legacySlugs` already set in catalog) |
| data-and-sampling | data-and-sampling | unchanged — no migration needed |

`dependent-and-independent-events`, `conditional-probability` and `gambling-awareness` are net-new
lesson slugs (no prior live equivalent — `conditional-probability` restores content that existed
only in the retired, unreachable `probability-b` unit), so there are no legacy rows to migrate for
them.

## Execution plan (deferred)

1. Direct owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = <new> WHERE lesson_slug = <old> AND unit_slug = 'probability-data-analysis'` per slug-keyed table, for each of the three course slugs (`year-9-mathematics`, `-core`, `-advanced`).
3. For the two 1-to-2 splits (`review-of-probability`, `venn-diagrams-two-way-tables`), either pick a single default destination (as above) or inspect per-row `mastery_events`/`student_mastery` question IDs (the new question ID prefixes `y9-mkp-`/`y9-cev-`/`y9-vend-`/`y9-twty-` make the correct destination lesson identifiable per historical attempt) before remapping.
4. Re-run the equivalent of `scripts/precheck-y9-migration.ts` / `scripts/migrate-y9-legacy-rows.ts` (Wave 9 precedent) adapted to this slug map, then confirm zero remaining legacy-slug rows.
5. Re-run `scripts/seed-question-bank.ts --course=all` (or `--course=year-9-mathematics,year-9-mathematics-core,year-9-mathematics-advanced`) to refresh the Supabase question bank for the new/renamed lesson slugs — **not done as part of this pass**.

## PathTag review

| New lesson | pathTag | Pathways shown |
| --- | --- | --- |
| making-predictions | consolidating | Core only |
| sample-space-and-probability | core | all 3 |
| tree-diagrams-multistage-events | core | all 3 |
| dependent-and-independent-events | core | all 3 |
| probability-simulations | core | all 3 |
| complementary-events | consolidating | Core only |
| venn-diagrams | path | Base + Advanced |
| two-way-tables | path | Base + Advanced |
| conditional-probability | path | Base + Advanced |
| gambling-awareness | core | all 3 |
| data-and-sampling (unchanged) | path | Base + Advanced |

Every new probability lesson carries an explicit pathTag (enforced by `assertPathTagTotality` at
catalog build time). `conditional-probability` and `two-way-tables` are tagged `path` (not
`extending`) rather than advanced-only, matching MA5-PRO-P-01 being the NESA "Path" strand outcome
(intended for base + advanced students, not an advanced-exclusive extension) and matching the tag
already used by the lessons they supersede (`using-set-notation`, `venn-diagrams-two-way-tables`).

## Related code changes (this pass)

- `lib/newCourseCatalog.ts` — `probability-data-analysis` unit lesson list replaced (10 new entries); dead override-chain entries removed; stale advanced-pathway positioning text corrected.
- `lib/lessons/year9/chapter8Probability.ts` — rewritten to own `making-predictions`, `sample-space-and-probability`, `complementary-events`, `venn-diagrams`, `two-way-tables`.
- `lib/lessons/year9/chapter8ProbabilityB.ts` — rewritten to own `tree-diagrams-multistage-events`, `dependent-and-independent-events`, `probability-simulations`, `conditional-probability`, `gambling-awareness`; `data-and-sampling` left untouched.
- `lib/lessons/year9/makingPredictions.ts`, `makingDecisions.ts`, `probabilityB.ts` — **deleted**. Confirmed unreachable dead code (guards checked retired unit slugs `making-predictions`/`making-decisions`/`probability-b`, none of which exist in the live catalog); their content was harvested into the two files above before deletion.
- `lib/lessons/year9/index.ts` — removed the 3 dead exports.
- `lib/challenges/index.ts` — D6 challenge registry keys updated for the renamed/split/folded slugs.
