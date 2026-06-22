# Y10 Wave 0 — `linear-relationships` topic_slug remap (executed)

**Date:** 2026-06-23
**Reason:** Year 10 Wave 0 restructure dissolved the `linear-relationships` unit into Chapter 1
(`algebra-equations-linear-relationships`). Mastery rows key on `topic_slug = unit slug`, so the
existing rows had to be remapped to avoid orphaning a student's progress on the live course.

## Scope (read-only pre-check)

- Course: `year-10-mathematics-advanced` (only course with legacy rows).
- Old topic: `linear-relationships` → New topic: `algebra-equations-linear-relationships` (1:1, not a split).
- 25 rows, **1 user**, all dated 2026-06-16.
- `lesson_progress` legacy rows: **0**. `saved_lesson_plans`: **0**.
- Conflict check: target topic had **0** pre-existing rows in every table → no UNIQUE-constraint risk.

## Executed (service-role UPDATE, 2026-06-23)

```sql
UPDATE <table> SET topic_slug = 'algebra-equations-linear-relationships'
 WHERE course_slug = 'year-10-mathematics-advanced' AND topic_slug = 'linear-relationships';
```

applied to: `mastery_events` (20), `student_subtopic_mastery` (3), `student_mastery` (1),
`student_mastery_history` (1). Subtopic slugs (`gradient-y-intercept`, `equation-of-a-line`,
`linear-modelling`) were already preserved by the restructure and were not changed.

## Post-check (read-only)

| Table | old remaining | new rows | users on new |
|---|---|---|---|
| mastery_events | 0 | 20 | 1 |
| student_subtopic_mastery | 0 | 3 | 1 |
| student_mastery | 0 | 1 | 1 |
| student_mastery_history | 0 | 1 | 1 |

Total: **0 legacy rows remaining, 25 new rows, affected user count unchanged (1).** Complete.

No other legacy Year 10 unit slug had any production rows; no further migration required.
