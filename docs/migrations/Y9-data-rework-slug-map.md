# Year 9 Data Analysis rework — legacy-row migration map

**Status: NOT EXECUTED.** Map only. No production write in this pass. The remap runs as a
follow-up task once explicitly authorised — this rework touched code (catalog + lesson
content) only.

## Scope

Replaces the 6 statistics lessons formerly owned by `lib/lessons/year9/chapter8Statistics.ts`
(deleted) plus the `data-and-sampling` lesson (formerly in `chapter8ProbabilityB.ts`) with a
new 7-lesson sequence in the `probability-data-analysis` unit, aligned to NESA Stage 5 Data
Analysis B (MA5-DAT-C-02, core) and Data Analysis C (MA5-DAT-P-01, path):

**Core** (MA5-DAT-C-02): single-vs-bivariate-data, scatter-plots, line-of-best-fit,
describing-and-predicting.
**Path** (MA5-DAT-P-01 + Stage 4 review): data-collection, misleading-graphs,
statistical-investigation.

**Deliberately retired, not replaced**: mean-median-mode, stem-and-leaf-plots,
grouping-data-into-classes, range-interquartile-range, box-plots (Data Analysis A /
MA5-DAT-C-01 content: standard deviation, quartiles/IQR, box plots). This content already
exists properly at Year 10 (`single-variable-bivariate-statistics` unit:
`quartiles-iqr`, `box-whisker-plots`, `standard-deviation`), so Year 9 is deliberately
deduplicated against it rather than teaching it twice — confirmed with the user as an
intentional scope decision, not an oversight.

## Map (old → new)

| Old lesson (live pre-rework) | New lesson | Action |
| --- | --- | --- |
| interpreting-data-from-tables-and-graphs | single-vs-bivariate-data | folded in — its Cambridge 10G "reading tables/column/line/sector graphs" skill (a deliberate prior Core-conformance fix, commit `f7de904`) is now the single-variable review component of lesson 1, including its `barChartDiagram` payloads (fruit/transport/sport charts), reused verbatim |
| data-and-sampling | data-collection | remap slug (`legacySlugs` already set in catalog); content extended with systematic/stratified sampling and ethical-collection dot points (MA5-DAT-P-01) |
| mean-median-mode | — | retired, no replacement (see above) |
| stem-and-leaf-plots | — | retired, no replacement |
| grouping-data-into-classes | — | retired, no replacement |
| range-interquartile-range | — | retired, no replacement |
| box-plots | — | retired, no replacement |

`scatter-plots`, `line-of-best-fit`, `describing-and-predicting`, `misleading-graphs` and
`statistical-investigation` are entirely net-new lesson slugs — no legacy rows to migrate.

## Execution plan (deferred)

1. Direct owner authorisation.
2. "remap slug": `UPDATE <table> SET lesson_slug = 'data-collection' WHERE lesson_slug = 'data-and-sampling' AND unit_slug = 'probability-data-analysis'` per slug-keyed table (`lesson_progress`, `mastery_events`, `student_mastery`, `student_subtopic_mastery`, `student_mastery_history`), for each of the three course slugs.
3. For `interpreting-data-from-tables-and-graphs` → `single-vs-bivariate-data`: this is a content fold-in, not a pure rename (lesson 1 covers more than 10G alone), so treat student progress on the old slug as informational only — do **not** auto-remap it, since "completed 10G" is not equivalent to "completed single-vs-bivariate-data".
4. For `mean-median-mode`, `stem-and-leaf-plots`, `grouping-data-into-classes`, `range-interquartile-range`, `box-plots`: no destination exists in Year 9 (deliberately retired). Any historical progress on these slugs will simply stop appearing in the Year 9 skill map. No action needed unless the owner wants these rows archived/deleted for cleanliness — not done by default.
5. Re-run `scripts/seed-question-bank.ts --course=year-9-mathematics --course=year-9-mathematics-core --course=year-9-mathematics-advanced` to refresh the Supabase question bank for the new/renamed lesson slugs — **not done as part of this pass** unless separately authorised.

## PathTag review

| New lesson | pathTag | Pathways shown |
| --- | --- | --- |
| single-vs-bivariate-data | core | all 3 |
| scatter-plots | core | all 3 |
| line-of-best-fit | core | all 3 |
| describing-and-predicting | core | all 3 |
| data-collection | path | Base + Advanced |
| misleading-graphs | path | Base + Advanced |
| statistical-investigation | path | Base + Advanced |

This mapping matches the official NESA designation exactly: MA5-DAT-C-02 (Data Analysis B) is
a Core-track outcome (hence `core`, unlike Probability B which was genuinely Path-only), and
MA5-DAT-P-01 (Data Analysis C) is the genuine Path-track outcome (hence `path`). Every new
lesson carries an explicit pathTag (enforced by `assertPathTagTotality` at catalog build time).

## Related code changes (this pass)

- `lib/newCourseCatalog.ts` — `probability-data-analysis` unit lesson list: 7 old data/stats entries replaced with 7 new entries; unit title/description/focus updated (no longer "Single Variable Data Analysis" — now bivariate-focused); dead override-chain entry removed, two new ones added.
- `lib/lessons/year9/chapter8DataAnalysis.ts` — **new file**, owns the 4 core lessons.
- `lib/lessons/year9/chapter8DataAnalysisB.ts` — **new file**, owns the 3 path lessons.
- `lib/lessons/year9/chapter8Statistics.ts` — **deleted** (all 6 lessons retired, none survive under any slug).
- `lib/lessons/year9/chapter8ProbabilityB.ts` — `data-and-sampling` removed (moved to `chapter8DataAnalysisB.ts` as `data-collection`); header comment updated.
- `lib/lessons/year9/index.ts` — removed the dead `year9Chapter8StatisticsLessonOverride` export, added the two new overrides.
- `lib/challenges/index.ts` — removed the 13 D6 registry mappings for the 7 retired slugs. The underlying challenge pools (`meanMedianY9Challenge`, `stemLeafY9Challenge`, `groupingY9Challenge`, `iqrY9Challenge`, `boxPlotY9Challenge`, `interpretingDataY9Challenge`, `samplingY9Challenge`) are left in `lib/challenges/year9Chapter8.ts`, now unused — that file also holds still-active probability challenge pools, so it was not touched to avoid unnecessary risk. None of the 7 new data lessons have a D6 challenge yet (matches the precedent set by several probability-rework lessons, e.g. two-way-tables, conditional-probability).
