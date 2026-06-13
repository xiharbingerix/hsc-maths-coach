# Year 11 Advanced Trigonometry Measure of Angles Tech Audit

Created: 2026-06-13  
Scope: technical readiness for splitting `year-11-advanced / trigonometry-measure-angles` into Skill Map v2 slots.  
Status: audit only. Do not implement the split from this document without a separate implementation task.

## Current Catalogue Shape

The authoritative course catalogue is `lib/newCourseCatalog.ts`.

| Field | Current value |
|---|---|
| Course slug | `year-11-advanced` |
| Unit slug | `trigonometry-measure-angles` |
| Unit title | `Trigonometry and Measure of Angles` |
| Syllabus area | `Trigonometric functions` |
| Focus | `Trigonometry and measure of angles` |

Current visible lesson slugs:

| Current lesson slug | Title | Source |
|---|---|---|
| `radians-exact-trigonometric-values` | `Radians and Exact Trigonometric Values` | `lib/lessons/year11Advanced/trigonometryMeasureAngles.ts` |
| `unit-circle-trigonometric-graphs` | `Unit Circle and Trigonometric Graphs` | `lib/lessons/year11Advanced/trigonometryMeasureAngles.ts` |
| `trigonometry-measure-angles-exam-practice` | `Trigonometry and Measure of Angles Exam Practice` | `lib/lessons/year11Advanced/trigonometryMeasureAngles.ts` |

`lib/lessons/year11Advanced/trigonometryMeasureAngles.ts` exposes `year11AdvancedTrigonometryMeasureLessonOverride`, which returns explicit lesson content only when:

```ts
course.slug === "year-11-advanced" &&
unit.slug === "trigonometry-measure-angles"
```

The three current lesson slugs are handled by branch checks inside that override.

## Existing Route Compatibility

`app/course/year-11-advanced/[unitSlug]/page.tsx` redirects the old unit alias:

| Old unit slug | Current unit slug |
|---|---|
| `trigonometric-functions` | `trigonometry-measure-angles` |

`app/course/year-11-advanced/[unitSlug]/[lessonSlug]/page.tsx` redirects old lesson URLs under `trigonometric-functions` for:

- `radians-exact-trigonometric-values`
- `unit-circle-trigonometric-graphs`

Generic rendering flows through `app/course/NewCoursePages.tsx` and `getNewCourseLesson`.

## Skill Map v2 Readiness

The needed metadata fields already exist on `CourseLessonSeed` in `lib/courseTypes.ts`:

- `stableSkillId`
- `legacySlugs`
- `skillCheckpoints`
- `seedQuestions`
- `showInCourseNav`

`lib/skillMapV2.ts` already flattens `stableSkillId`, `legacySlugs`, and checkpoint metadata. `scripts/audit-lessons.ts` already fails duplicate stable Skill Map v2 IDs.

Add metadata in `lib/newCourseCatalog.ts` on the Year 11 Advanced lesson seed objects. Add lesson content branches in `lib/lessons/year11Advanced/trigonometryMeasureAngles.ts` only during the implementation pass, not during this audit.

## Proposed Split Strategy

Follow the Year 10 trigonometry v2 pattern:

1. Preserve current broad slugs as legacy route entries.
2. Mark legacy entries with:
   - `seedQuestions: false`
   - `showInCourseNav: false`
3. Add visible v2 lesson slugs with `stableSkillId`, `legacySlugs`, and `skillCheckpoints`.
4. Keep old lesson slugs route-resolvable through `getNewCourseLesson`.
5. Seed only the new visible v2 lesson slugs.

Suggested v2 targets from `docs/NOVA_MATHS_SKILL_MAP_V2_SLOTS.md`:

| Current lesson | Proposed v2 slugs | Status |
|---|---|---|
| `radians-exact-trigonometric-values` | `converting-degrees-radians`, `exact-trig-values-unit-circle` | Split |
| `unit-circle-trigonometric-graphs` | `unit-circle-all-quadrants`, `graphing-sin-cos-tan` | Split |
| Unit gap | `trig-functions-graphs-transformations` | New/missing |

Recommended addition: keep `trigonometry-measure-angles-exam-practice` visible initially unless the implementation task explicitly splits or replaces exam practice. It can receive Skill Map v2 metadata as a stable exam-practice node, or remain untagged while the core skill slots are piloted.

Recommended stable ID prefix:

```text
y11adv-trig-measure-{semantic-skill-slug}
```

Examples:

- `y11adv-trig-measure-converting-degrees-radians`
- `y11adv-trig-measure-exact-trig-values-unit-circle`
- `y11adv-trig-measure-unit-circle-all-quadrants`
- `y11adv-trig-measure-graphing-sin-cos-tan`
- `y11adv-trig-measure-trig-functions-graphs-transformations`

## Visual Payload Readiness

Existing supported payloads relevant to this unit:

| Payload | Support status | Notes |
|---|---|---|
| `CartesianGraph` | Available | Supports points, line segments, linear graphs, parabolas, circles, sinusoidals, and shaded regions. Suitable for trig graphs and a basic unit circle. |
| Unit circle via `CartesianGraph` | Partly available | Can draw a circle, labelled points, and radius segments. There is no dedicated `UnitCircleDiagram` payload with angle arcs, quadrant shading, or radian labels. |
| `TriangleDiagram` | Available | Suitable for triangle geometry, but not a natural fit for senior unit-circle or sector work. |
| Sector/arc diagram | Gap | No dedicated `SectorDiagram`, `CircleSectorDiagram`, or arc-length payload exists. Current arc length and sector area content is text/math only. |

Arc length and sector area currently do not have a suitable purpose-built diagram payload. A future sector payload should support centre, radius, central angle, arc label, shaded sector, and optional radian/degree labels. Until then, use text/math or a limited CartesianGraph approximation.

## Seed And Question Bank Implications

`scripts/seed-question-bank.ts` collects every lesson from `getNewCourseUnitLessons`. It skips catalogue lessons only when `seedQuestions === false`.

Implications:

- Legacy broad slugs must be marked `seedQuestions: false` or their old question rows will remain in the seed output.
- New v2 slugs need real lesson override branches; otherwise generated catalogue fallback lessons are skipped with warnings.
- Question IDs must remain globally unique. When splitting broad lessons, prefix new IDs by the new v2 slug/skill.
- Stable Skill Map v2 IDs are catalogue-only today. Dry-runs report mapped rows, but no stable IDs are written to Supabase.
- The current question-bank keys remain `course_slug`, `topic_slug`, and `subtopic_slug`, so worksheet targeting will follow the new lesson slugs after the split.

## Continue Learning And Progress Risks

`getNewCourseUnitOutline` filters out `showInCourseNav === false`, so hidden legacy lessons do not appear in the unit overview.

`getNewCourseUnitLessons` does not filter hidden lessons. `NewCourseLessonPage` uses it for neighbouring lessons, so hidden legacy entries can affect previous/next lesson navigation if they remain in the same unit order.

`lib/courseLessonTargets.ts` builds Continue Learning targets directly from `unit.lessons` and does not filter `showInCourseNav === false`. If legacy lessons are hidden but left in the catalogue, they can still appear as dashboard targets or "Next lesson" candidates.

Progress is slug-keyed. Preserving legacy slugs keeps old progress route-resolvable, but new v2 slugs will not automatically inherit progress from old broad slugs unless a migration or alias-aware lookup is added later.

Implementation should include a deliberate decision on whether to:

- filter hidden lessons in `courseLessonTargets.ts`,
- filter hidden lessons from lesson prev/next navigation,
- keep hidden legacy targets for old in-progress students only.

## Recommended Implementation Prompt

Nova Maths context:
You are working in `c:\Users\joshu\hsc-maths-coach`.
Do not touch checkout/auth/payments.
Do not write to Supabase.

Task:
Implement the Year 11 Advanced `trigonometry-measure-angles` Skill Map v2 split using the strategy in `docs/YEAR11_ADV_TRIG_MEASURE_ANGLES_TECH_AUDIT.md`.

Do:
1. Preserve legacy slugs route-resolvable and hidden/seed-skipped like Year 10 trig.
2. Add visible v2 slugs for:
   - `converting-degrees-radians`
   - `exact-trig-values-unit-circle`
   - `unit-circle-all-quadrants`
   - `graphing-sin-cos-tan`
   - `trig-functions-graphs-transformations`
3. Add `stableSkillId`, `legacySlugs`, and `skillCheckpoints`.
4. Add focused lesson content branches without rewriting unrelated Year 11 Advanced units.
5. Use `CartesianGraph` for trig graphs and basic unit-circle visuals where useful.
6. Do not add a fake sector diagram; use text/math unless a proper sector payload is explicitly added.
7. Review `getNewCourseUnitLessons` prev/next and `courseLessonTargets.ts` Continue Learning behaviour for hidden legacy lessons.

Validate:
- `npx.cmd tsc --noEmit`
- `npm.cmd run audit:lessons`
- `npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run`
- `git diff --check`
