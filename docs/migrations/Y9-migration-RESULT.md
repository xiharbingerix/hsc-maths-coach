# Year 9 legacy-row migration — EXECUTION RESULT

**Executed (owner-approved) against production Supabase.** Read-only precheck + write migration scripts
are committed alongside: `scripts/precheck-y9-migration.ts`, `scripts/migrate-y9-legacy-rows.ts`.

## Precheck (read-only)
121 legacy-slug rows on the 3 Year 9 courses, across 5 tables; 2 distinct users (inactive students).
8 legacy unit/topic slugs in use, all mapping to a new Cambridge unit via
`lib/year9PathTags.ts` `Y9_LEGACY_UNIT_TARGETS` (0 unmapped). `saved_lesson_plans` table absent
(errors — migration 019 unapplied; nothing to migrate there).

## Execution
Remapped the `unit_slug`/`topic_slug` column legacy→new unit, scoped to the 3 Year 9 courses:

| Table | Remapped | Notes |
| --- | --- | --- |
| lesson_progress (unit_slug) | 4 | |
| mastery_events (topic_slug) | 70 | |
| student_mastery (topic_slug) | 14 | + 2 redundant rows deleted (see below) |
| student_subtopic_mastery (topic_slug) | 13 | |
| student_mastery_history (topic_slug) | 18 | |
| **Total remapped** | **119** | |

**Merge-collision case:** `making-predictions` and `making-decisions` both map to the merged unit
`probability-data-analysis`. In `student_mastery`, 2 users had a record under each; after remapping
`making-predictions`, the `making-decisions` row would have duplicated `(user, course,
probability-data-analysis)` (unique constraint). Per owner decision, the **2 redundant
`making-decisions` rows were DELETED** (each user retains their `probability-data-analysis` mastery
from `making-predictions`).

## Post-migration verification (read-only)
All 5 tables: **legacy-slug rows = 0.** Row counts: lesson_progress 4, mastery_events 70,
student_mastery 14 (16 − 2 deleted), student_subtopic_mastery 13, student_mastery_history 18.
**Affected user count unchanged (2)** — both users retain their (remapped) Year 9 progress.

## Outcome
Migration complete and clean. No legacy Year 9 slugs remain in production. Safe to un-hide.
