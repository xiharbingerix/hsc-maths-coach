# Nova Maths Skill Map v2 Plan

Created: June 2026  
Benchmark: Class Mathematics NSW Structure Report (`docs/CLASS_MATHEMATICS_NSW_STRUCTURE_REPORT.md`)

This document defines a structural roadmap to make Nova Maths more granular, more NSW-aligned, and more practice-deep. It uses Class Mathematics as a structural benchmark only — no content, questions, explanations or wording from Class Mathematics is reproduced here or in any Nova Maths lesson.

---

## 1. Benchmark Comparison

| Course | Class topics | Class subtopics | Nova units | Nova lessons (est.) | Gap |
|---|---:|---:|---:|---:|---|
| Year 8 | 14 | 111 | 9 | ~50 | ~2× too coarse |
| Year 9 Core | 13 | 82 | 8 (shared) | ~55 | single pathway, no split |
| Year 9 Advanced | 14 | 109 | 8 (shared) | ~55 | single pathway, no split |
| Year 10 Core | 12 | 76 | 10 (shared) | ~45 | runtime split, no distinct content |
| Year 10 Advanced | 16 | 128 | 10 (shared) | ~45 | runtime split, no distinct content |
| Year 11 Standard | 9 | 63 | 9 | ~11 | very thin — most lessons placeholder |
| Year 11 Advanced | 11 | 90 | 8 | ~30 | ~3× too coarse |
| Year 11 Extension 1 | 5 | 30 | 5 (2 active) | ~10 | incomplete |
| Year 12 Standard 1 | 7 | 29 | 5 | ~8 | incomplete, coarse |
| Year 12 Standard 2 | 10 | 59 | 5 | ~15 | thin |
| Year 12 Advanced | 11 | 64 | — | — | not yet built |
| Year 12 Extension 1 | 7 | 28 | 6 | ~30 | closest to benchmark |
| Year 12 Extension 2 | 5 | 40 | 5 | 8 | 32 subtopics still missing |

**Summary:** Almost every Nova course is 2–4× coarser than the Class Mathematics benchmark. The most acute gaps are Year 11 Standard, Year 8, and Year 10 Advanced.

---

## 2. Skill Map v2 Hierarchy

```
Course
  └── Topic  (was: unit)
        └── Subtopic  (was: lesson)
              └── Skill checkpoint  (was: success criterion)
                    └── Question  (guided / independent / partial-step / mastery / challenge)
```

### Definitions

| Level | Description | Nova v1 equivalent |
|---|---|---|
| **Course** | Pathway: Year 9 Core, Year 10 Advanced, Yr 12 Ext 1 | `CoursePathwaySeed` |
| **Topic** | Assessment-sized unit, ~5–12 subtopics | `CourseUnitSeed` |
| **Subtopic** | Single teachable skill. One lesson, one worksheet slice. | `CourseLessonSeed` (split more finely) |
| **Skill checkpoint** | A specific, verifiable outcome within the subtopic | `successCriteria` item |
| **Question** | One auto-markable practice item at a specific level | `PracticeQuestion` |

---

## 3. Naming Conventions

### Topics (unit slugs)
- Title Case, broadly NSW syllabus-aligned: `linear-relationships`, `trigonometry`, `algebra-techniques`
- Match NSW Stage descriptions where possible

### Subtopics (lesson slugs)
- Specific skill in kebab-case: `gradient-intercept-form`, `sine-rule-non-right-triangles`, `compound-interest-formula`
- Format: `{verb or concept}-{context or scope}` — e.g. `finding-angles-trigonometry`, `factorising-monic-quadratics`
- Avoid number suffixes (`lesson-1`, `lesson-2`) — slugs must be semantically meaningful

### Skill checkpoints
- Plain English, present tense: "Apply the sine rule to find an unknown side"
- Maps directly to a success criterion in the lesson partial

---

## 4. Practice Structure v2

The current 4+5+10 structure expands as follows:

| Section | v1 count | v2 count | Purpose | Difficulty |
|---|---:|---:|---|---|
| Guided | 4 | 4 | Core skill intro, generous hints | D1–D2 |
| Independent | 5 | **7** | Extended consolidation across contexts | D2–D3 |
| Partial-step | 0 | **up to 5** | Scaffolded questions for students who struggled; shown adaptively | D2–D3 |
| Mastery | 10 | 10 | Verify durable understanding, no scaffolding | D3–D5 |
| Level 6 challenge | 0 | **3–5** | Extension: synoptic, novel contexts, proof-adjacent | **D6** |
| Multi-part | optional | optional | HSC Section II exam rehearsal | D5 |

**Total standard questions:** 21 (up from 19). Partial-step and challenge are additive.

### Partial-step practice rules
- Maximum 5 questions per lesson.
- Each question exposes 2–3 intermediate steps as prompts, with the student completing the final step only.
- Not counted in the 21-question standard total.
- Shown only to students who score below 60% in guided practice (adaptive trigger), or optionally as a standalone scaffold mode.
- All steps must be auto-markable (numeric, algebraic, classification).

### Level 6 challenge rules
- 3–5 questions per lesson; optional unlock after mastery pass.
- D6 questions: synoptic (combines 2+ subtopics), novel framing, or contextualised problem-solving.
- No free-text. Every part must be auto-markable.
- Seeded separately, never required for lesson completion.
- Label: `challengeQuestions?: PracticeQuestion[]` on `ExplicitLesson`.

---

## 5. Visual Payload Requirements

| Topic area | Required payload | Available type |
|---|---|---|
| Linear relationships | axes + line | `CartesianGraph` |
| Non-linear (parabola, hyperbola, exponential) | curve sketch | `CartesianGraph` |
| Right-triangle trigonometry | labelled triangle | `TriangleDiagram` |
| Sine rule / cosine rule | non-right triangle | `TriangleDiagram` |
| Angle geometry (parallel lines, polygons) | angle diagram | `CartesianGraph` (or future `GeometryDiagram`) |
| Box plots / statistics | box-whisker | `BoxPlotDiagram` |
| Probability trees | tree diagram | `ProbabilityTreeDiagram` |
| Two-way tables | grid | `TwoWayTableDiagram` |
| Normal distribution | bell curve | `NormalDistributionDiagram` |
| Complex numbers (Argand) | point/vector on plane | `ArgandDiagram` |
| 3D vectors and lines | 3D axes + vector/line | `Vector3DDiagram` |
| Networks | graph | `NetworkDiagram` |

**Rule:** Any question whose meaning depends on a geometric or statistical figure must carry the relevant payload. A text-only prompt is not sufficient where the diagram is part of the question stem (e.g. "Find the angle marked θ in the diagram").

---

## 6. Course-by-Course Gap Summary and Priority

| Course | Priority | Reason |
|---|---|---|
| **Year 10 Trigonometry** | **Pilot — do first** | Self-contained, 8 lessons → ~12 subtopics, TriangleDiagram support exists, high HSC relevance |
| Year 8 | High | In-progress, 2× too coarse, no existing mastery data at risk |
| Year 9 Core / Advanced | High | Single pathway needs proper split; large student volume |
| Year 11 Standard | High | Almost no real content; most lessons are placeholders |
| Year 12 Standard 1 | Medium | In-progress, benchmark gap is small (29 subtopics) |
| Year 12 Advanced | Medium | Not yet built — design v2-native from the start |
| Year 12 Extension 2 | Medium | 32/40 subtopics still missing; ongoing |
| Year 10 Advanced | Medium | Runtime split needs distinct content; not just flag-toggled |
| Year 11 Extension 1 | Low | Only 2 units active; reasonable depth per lesson |
| Year 12 Extension 1 | Low | Closest to benchmark; good depth already |

---

## 7. Pilot: Year 10 Trigonometry Refactor

**Current:** 8 lessons in `year-10/trigonometry` unit  
**Proposed:** Split into ~12 subtopics across the same topic

| Current lesson | Proposed v2 subtopics |
|---|---|
| Trigonometric Ratios | `trig-ratios-sin-cos-tan` + `trig-ratios-identifying-sides` |
| Finding Unknown Sides | `finding-sides-sin-cos` + `finding-sides-tan` |
| Finding Unknown Angles | `finding-angles-inverse-trig` |
| Angles of Elevation and Depression | `elevation-depression-applications` |
| The Sine Rule | `sine-rule-finding-sides` + `sine-rule-finding-angles` |
| The Cosine Rule | `cosine-rule-finding-sides` + `cosine-rule-finding-angles` |
| Area of a Triangle | `area-of-triangle-formula` |
| Bearings | `true-bearings` + `compass-bearings-problems` |

**Progress preservation:** All current lesson slugs remain valid. The new subtopic slugs are additive — existing completion records (keyed by old slug) are unaffected. The old lesson slug is retained as an alias entry pointing at the first v2 subtopic for worksheet queries.

**Validation gate:** `tsc --noEmit` + `audit:lessons` + seed dry-run must pass before any split lands on main.

---

## 8. Progress Preservation Strategy

When splitting one lesson into two subtopics:

1. Keep the original slug as a **legacy alias** in the catalog (no lesson file, no question bank rows).
2. New subtopic slugs are new catalog entries with new lesson files and fresh question-bank rows.
3. Worksheet subtopic selector uses the new slugs from v2 onwards.
4. Mastery records keyed to the old slug are preserved; they simply no longer drive worksheet targeting.
5. Students who already completed the legacy lesson are shown a "skill refresh" nudge, not forced to redo it.

---

## 9. Phased Implementation Plan

### Phase 1 — Skill map audit (2 weeks)
- Create a full v2 slug map for every Nova course (spreadsheet or MD table).
- For each existing lesson, assign it to one or more v2 subtopic slugs.
- Flag which subtopics have no existing lesson (need authoring).
- Output: `docs/NOVA_MATHS_SKILL_MAP_V2_SLOTS.md`

### Phase 2 — Pilot split: Year 10 Trigonometry (2 weeks)
- Split `year-10/trigonometry` from 8 lessons to 12 subtopics.
- Apply `TriangleDiagram` payloads consistently.
- Expand independent practice from 5 to 7 questions per lesson.
- Add `multiPartPractice` to the exam-practice lesson.
- Validate: `tsc --noEmit`, `audit:lessons`, seed dry-run, `git diff --check`.

### Phase 3 — Worksheet targeting update (1 week)
- Update worksheet generator to support subtopic-level targeting.
- Subtopic slug becomes the primary filter, replacing current lesson-slug queries.
- Validate worksheet creation end-to-end with the new subtopic slugs.

### Phase 4 — Practice depth expansion (rolling, per unit)
- Expand independent practice from 5 to 7 questions in authored units.
- Add partial-step questions (up to 5) for units with known common errors.
- Add `challengeQuestions` field to `ExplicitLesson` type and populate for pilot unit.
- Update `audit-lessons.ts` to validate the new sections.

### Phase 5 — Level 6 challenge layer (after Phase 4 stable)
- Define D6 difficulty: synoptic, multi-topic, exam-adjacent.
- Populate challenge questions for Year 10, Year 11 Advanced, Year 12 Extension 1/2.
- Add student-facing unlock UI after mastery pass.
- Seed challenge questions separately from standard questions.

---

## 10. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Lesson split breaks existing worksheet queries | High | Phase 3 (worksheet update) must follow Phase 2, not run concurrently |
| Mastery records orphaned by slug changes | High | Legacy alias strategy in §8; never delete old slugs |
| Year 9/10 Core/Advanced split increases maintenance cost | Medium | Share question banks across pathways with prefix system (already exists for y9a/y9c) |
| Partial-step questions require UI changes | Medium | Build the question type and data structure first; display can be simple initially |
| Level 6 challenge requires new seed category | Low | Add `challengeQuestions` as a typed field; seed script update is small |
| Year 11 placeholder lessons confuse students | High | Keep placeholder lessons flagged `status: "coming-soon"` until real content replaces them |

---

## 11. Next Implementation Prompt

```
Task: Phase 1 — Create Nova Maths Skill Map v2 slot table.

For each Nova Maths course (Year 8, Year 9 Core/Advanced, Year 10 Core/Advanced,
Year 11 Standard/Advanced/Extension 1, Year 12 Standard 1/2/Advanced/Extension 1/2):
  - List every current lesson slug.
  - Assign each to a proposed v2 subtopic slug (may be 1:1 or 1:N if splitting).
  - Mark subtopics with no current lesson as [MISSING].
  - Group by Topic → Subtopic.

Output: docs/NOVA_MATHS_SKILL_MAP_V2_SLOTS.md

Do not author any lessons yet. This is a mapping pass only.
```
