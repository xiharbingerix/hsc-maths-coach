# Skill Map v2 Technical Plan

Date: 2026-06-13  
Status: feasibility assessment only; no refactor implemented.

This plan uses `docs/CLASS_MATHEMATICS_NSW_STRUCTURE_REPORT.md` only as structural benchmarking. It must not be used to copy proprietary course labels, questions, explanations, or lesson content.

## Executive Summary

Nova Maths can move toward a more granular Course -> Topic -> Subtopic -> Lesson -> Skill Checkpoint model, but the current platform treats several of those layers as the same thing in different contexts.

The safest path is a two-phase rollout:

1. Phase 1: pilot mostly in catalogue/content files using existing slugs and database columns.
2. Phase 2: add stable skill/checkpoint IDs and legacy mapping tables before broad course restructuring.

No immediate schema change is required for a small pilot if existing lesson slugs remain stable. Schema changes are recommended before scaling Skill Map v2 across courses.

## Current Hierarchy Assumptions

Current catalogue/content hierarchy:

- `CoursePathwaySeed`
- `CourseUnitSeed`
- `CourseLessonSeed`

In `lib/newCourseCatalog.ts`, a course has `units`, and each unit has `lessons`. In route terms this becomes:

```text
/course/[courseSlug]/[unitSlug]/[lessonSlug]
```

In database and worksheet terms, the same shape is usually stored as:

```text
course_slug / topic_slug / subtopic_slug
```

The practical mapping today is:

- `course_slug` = course pathway
- `topic_slug` = unit slug
- `subtopic_slug` = lesson slug
- `lesson_slug` = lesson slug in `lesson_progress`

This means Nova already has course/topic/subtopic/lesson-like structure, but it does not yet have an independent skill checkpoint layer.

## Slug Contract Touchpoints

Places that assume `course_slug`, `topic_slug`, `subtopic_slug`, or `lesson_slug`:

- `lesson_progress`: keyed by `user_id, course_slug, unit_slug, lesson_slug`.
- `questions`: keyed by `course_slug, topic_slug, subtopic_slug`, with `source_id` unique.
- `mastery_events`: stores `course_slug`, `topic_slug`, nullable `subtopic_slug`, and `source_question_id`.
- `student_mastery`: current score per `user_id, course_slug, topic_slug`.
- `student_subtopic_mastery`: current score per `user_id, course_slug, topic_slug, subtopic_slug`.
- `student_mastery_history`: topic-level history only.
- `worksheets.topic_config`: JSON config containing selected topics/subtopics.
- `worksheet_questions`: links worksheets to question UUIDs.
- `worksheet_answers`: stores answers and multi-part payloads, not structural hierarchy.
- `courseLessonTargets.ts`: Continue Learning target keys are `courseSlug/unitSlug/lessonSlug`.
- `dailyReviewQueue.ts`: links review items to `/course/${course_slug}/${topic_slug}` and shows subtopic metadata.
- `worksheetGeneration.ts`: selects questions by `courseSlug`, `topicSlugs`, `selectedSubtopicSlugs`, and weak subtopic slugs.
- `seed-question-bank.ts`: maps unit slug to `topic_slug` and lesson slug to `subtopic_slug`.
- diagnostics: questions have `unitSlug`, not subtopic/skill IDs.
- dashboard Band Predictor: uses topic and subtopic mastery rows, with labels from `newCoursePathways`.

## Do We Already Have Enough Structure?

### Topic

Yes. Existing `unit.slug` maps cleanly to topic-level mastery and worksheet targeting.

### Subtopic

Mostly. Existing `lesson.slug` is currently acting as the subtopic. That is workable for worksheet selection and mastery, but it creates pressure when a long lesson should split into multiple smaller subtopics.

### Lesson

Yes, but lessons are not independent from subtopics today. In the DB, a lesson mastery event records `subtopicSlug: lessonSlug`.

### Skill Checkpoint

Not yet. There is no stable `skill_id` or `checkpoint_id` in catalogue types, questions, lesson progress, mastery events, or worksheet generation. Question IDs and `source_question_id` help per-question idempotency, but they are not a curriculum skill layer.

## Feasibility

### Small Pilot

Feasible mostly in content/catalogue files if:

- existing lesson slugs are not renamed,
- new smaller lessons are added only as new slugs,
- existing lesson URLs remain valid,
- question bank seeding keeps old `source_id`s stable,
- dashboard labels are updated from the catalogue.

This allows one course/unit to become more granular without schema changes.

### Broad Skill Map v2

Schema changes are recommended before broad rollout. Without them, splitting or renaming lessons will fragment:

- lesson progress,
- subtopic mastery,
- worksheet targeting,
- Daily Review labels,
- Continue Learning,
- question-bank history.

## Recommended Schema Additions

Do not add these until the pilot shape is agreed.

### `skill_map_nodes`

Canonical curriculum nodes.

Suggested columns:

- `id uuid primary key`
- `stable_id text unique not null`
- `course_slug text not null`
- `node_type text not null` such as `topic`, `subtopic`, `lesson`, `checkpoint`
- `parent_stable_id text`
- `slug text not null`
- `title text not null`
- `sort_order integer not null`
- `status text not null`
- `legacy_course_slug text`
- `legacy_topic_slug text`
- `legacy_subtopic_slug text`
- `legacy_lesson_slug text`

### `skill_slug_aliases`

Redirect and preservation table.

Suggested columns:

- `old_course_slug`
- `old_topic_slug`
- `old_subtopic_slug`
- `old_lesson_slug`
- `new_stable_id`
- `new_href`
- `reason`
- `created_at`

### Optional Column Additions

Add nullable fields rather than replacing slugs immediately:

- `questions.skill_id`
- `questions.checkpoint_id`
- `mastery_events.skill_id`
- `mastery_events.checkpoint_id`
- `student_subtopic_mastery.skill_id`
- `lesson_progress.lesson_stable_id`

Keep old slug columns as compatibility columns for at least one full release cycle.

## Progress Preservation Strategy

1. Freeze current public slugs before any split.
2. Create a legacy mapping from old lesson/subtopic slug to one or more new skill nodes.
3. For renamed routes, add aliases/redirects instead of removing old paths.
4. Preserve `lesson_progress` rows by keeping old lesson rows readable and mapping old rows to new lesson/checkpoint IDs in UI aggregation.
5. Preserve mastery by leaving `mastery_events` immutable.
6. Backfill new `skill_id` fields from mapping tables only after verifying counts.
7. Rebuild `student_subtopic_mastery` from `mastery_events` using the same replay strategy as `scripts/backfill-subtopic-mastery.ts`.
8. Keep topic-level `student_mastery` as the stable dashboard/Band Predictor layer during transition.
9. For split lessons, do not mark every new child complete automatically. Instead show inherited progress as "covered under previous lesson" and require new checkpoint completion for mastery.

## Worksheet Mapping Strategy

Current worksheet generation is already subtopic-aware. In Skill Map v2:

- admin manual selection should target skill-map subtopics/checkpoints,
- adaptive mode should use weakest `skill_id` where available,
- fallback should continue using `course_slug/topic_slug/subtopic_slug`,
- `topic_config` JSON should include both display labels and stable IDs for future-proofing,
- question-bank rows should keep slug fields for compatibility and add nullable skill/checkpoint IDs.

Do not remove slug-based filters until all seeded questions have stable IDs.

## Continue Learning

`getContinueLearningTarget` currently uses exact lesson slug keys. For Skill Map v2:

- keep exact legacy keys working,
- build targets from a canonical skill-map helper rather than directly from `newCoursePathways`,
- resolve aliases before deciding a progress row is invalid,
- sort by canonical course order and node order.

## Daily Review

Daily Review can survive Phase 1 because it already uses topic and subtopic mastery. However, the link currently points to the topic page only:

```text
/course/[courseSlug]/[topicSlug]
```

Skill Map v2 should optionally link directly to the best lesson/checkpoint once stable IDs exist.

## Band Predictor

Band Predictor is topic-level and should remain topic-level initially. It should consume aggregated skill/subtopic mastery later, not raw checkpoint rows. This reduces volatility when skills are split.

## Diagnostics

Diagnostics currently map questions to `unitSlug` only. Skill Map v2 should add optional subtopic/checkpoint metadata to diagnostic questions later. Do not block the initial pilot on diagnostic granularity.

## Safest Pilot

Recommended pilot: Year 12 Extension 2 Complex Numbers.

Reasons:

- course is already in-progress/scaffolded,
- low existing user progress risk,
- recent work added Argand visual payloads,
- question bank dry-run is small and inspectable,
- Skill Map v2 can be tested before high-traffic HSC Advanced paths are changed.

Alternative pilot: Year 8 Algebra Foundations, because Stage 4 benefits from fine skill slices, but it has broader navigation impact.

## Implementation Risks

- Renaming lesson slugs will orphan progress unless aliases exist.
- Splitting one lesson into several subtopics can make old mastery look inflated or misplaced.
- Question `source_id` uniqueness depends on stable source paths and question IDs.
- Adaptive worksheets may miss new skills unless seeded questions carry the new mapping.
- Dashboard label maps come from `newCoursePathways`; missing nodes will display prettified slugs.
- Diagnostics are less granular than worksheets/mastery.
- Topic-level history has no subtopic/checkpoint history equivalent yet.
- Broad refactor without migration tables will make analytics and support harder.

## Recommended Next Steps

1. Add catalogue-only skill metadata types:
   - `stableId`
   - optional `skillCheckpoints`
   - optional `legacySlugs`
2. Build a helper that flattens `newCoursePathways` into canonical nodes.
3. Pilot on Year 12 Extension 2 Complex Numbers without changing current URLs.
4. Add an audit that checks stable IDs are unique.
5. Add schema migration for mapping tables only after the pilot node model stabilises.
6. Backfill question rows in dry-run first.
7. Only then update worksheet generation to prefer stable IDs.

## Next Codex Prompt

```text
Nova Maths context:
You are working in c:\Users\joshu\hsc-maths-coach.
Do not touch checkout/auth/payments.
Do not write to Supabase unless creating a migration file only.

Task:
Implement a catalogue-only Skill Map v2 pilot for Year 12 Extension 2 Complex Numbers.

Do:
1. Add TypeScript-only optional skill metadata to course/catalogue types:
   - stableId
   - legacySlugs
   - skillCheckpoints
2. Add a helper that flattens course -> unit/topic -> lesson/subtopic -> checkpoints.
3. Populate the pilot metadata for Year 12 Extension 2 Complex Numbers only.
4. Do not rename public slugs.
5. Do not change worksheet generation or mastery writes yet.
6. Add audit coverage for duplicate stable IDs.
7. Document how pilot skill IDs map to existing topic/subtopic slugs.

Validate:
- npx.cmd tsc --noEmit
- npm.cmd run audit:lessons
- git diff --check

Output:
- files changed
- pilot shape
- backwards compatibility notes
- validation result
- risks
```

