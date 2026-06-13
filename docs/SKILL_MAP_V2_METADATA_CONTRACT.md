# Skill Map v2 Metadata Contract

Status: Phase 1a pilot  
Pilot scope: `year-12-extension-2 / complex-numbers`  
Student-facing behaviour: unchanged

## Purpose

Skill Map v2 introduces stable curriculum metadata before changing routes, database schema, or worksheet targeting. The Phase 1a contract is catalogue-only and exists to prove that Nova can attach durable skill/checkpoint IDs to current course content without breaking existing slug-based behaviour.

This metadata must not be used to copy proprietary course content from any benchmark. It is Nova-owned structural metadata.

## Current Compatibility Rule

Public slugs remain the source of truth for routes and existing storage:

```text
/course/[courseSlug]/[unitSlug]/[lessonSlug]
questions.course_slug / questions.topic_slug / questions.subtopic_slug
lesson_progress.course_slug / unit_slug / lesson_slug
student_subtopic_mastery.course_slug / topic_slug / subtopic_slug
```

Skill Map v2 metadata is additive. It must not rename or remove existing slugs in Phase 1a.

## Type Fields

`CourseLessonSeed` may define:

```ts
seedQuestions?: boolean;
showInCourseNav?: boolean;
stableSkillId?: string;
legacySlugs?: string[];
skillCheckpoints?: {
  stableCheckpointId: string;
  label: string;
  legacySlugs?: string[];
}[];
```

### `seedQuestions`

Controls whether `scripts/seed-question-bank.ts` exports questions for a catalogue lesson.

- Default: `true`.
- Set to `false` only for catalogue-visible legacy route entries that must remain resolvable but should not receive new question-bank rows.
- This is useful during a broad-lesson split where old public slugs remain available while new Skill Map v2 subtopic slugs become the worksheet/mastery seed targets.

### `showInCourseNav`

Controls whether a lesson appears in student-facing course overview/unit pathway lists.

- Default: `true`.
- Set to `false` for legacy route entries that should remain resolvable but should not be presented as active Skill Map v2 slots.
- `getNewCourseLesson` still resolves hidden lessons; `getNewCourseUnitOutline` and lesson counts hide them.

### `stableSkillId`

A durable Nova-owned ID for the current lesson/subtopic node. It should:

- be globally unique across the catalogue,
- not depend on display title wording,
- remain stable if the title changes,
- not replace the public route slug during Phase 1a.

Recommended format:

```text
y12e2-cn-{semantic-skill-slug}
```

### `legacySlugs`

The current or historical slug(s) that map to this skill node. In Phase 1a, this is normally just the current lesson slug.

Use this field later when a broad lesson is split, renamed, or redirected.

### `skillCheckpoints`

Checkpoint labels describe smaller verifiable outcomes inside a current lesson. They are not routes yet and do not drive worksheets yet.

Each checkpoint must have:

- `stableCheckpointId`: durable unique ID,
- `label`: plain English outcome label,
- optional `legacySlugs`: current/historical lesson slugs that covered it.

## Flattening Helper

`lib/skillMapV2.ts` exposes:

```ts
flattenSkillMapV2Nodes()
```

It returns flat `skill` and `checkpoint` nodes for audit, future admin views, and later migration planning.

## Audit Rule

`npm run audit:lessons` now checks for duplicate Skill Map v2 stable IDs. Duplicate IDs are fail-level audit issues.

## Question Bank Behaviour

Phase 1a does not add `skill_id` or `checkpoint_id` columns to Supabase. Therefore:

- `scripts/seed-question-bank.ts` continues writing only existing fields,
- `course_slug`, `topic_slug`, and `subtopic_slug` remain the worksheet/mastery filter keys,
- dry-run output reports how many prepared questions sit under lessons that have Skill Map v2 metadata,
- lessons marked `seedQuestions: false` are skipped with a dry-run warning,
- no stable IDs are written to Supabase yet.

When schema support is added, the safe next step is nullable columns:

```text
questions.skill_id
questions.checkpoint_id
mastery_events.skill_id
mastery_events.checkpoint_id
lesson_progress.lesson_stable_id
```

Old slug columns should remain for at least one full release cycle.

## Route And Worksheet Compatibility

Phase 1a must preserve:

- existing course overview routes,
- existing unit routes,
- existing lesson routes,
- worksheet subtopic selection by current lesson slug,
- Continue Learning lookup by current lesson slug,
- Daily Review topic/subtopic labels from the existing catalogue.

## Pilot Metadata

The initial pilot covers four existing Complex Numbers lessons:

- `complex-number-arithmetic`
- `modulus-argument-conjugate`
- `argand-diagram-geometry`
- `polar-form-de-moivre`

The checkpoint labels include the planned split slots from the Skill Map v2 slot map, but they are metadata only. They do not create new routes or seeded rows.
