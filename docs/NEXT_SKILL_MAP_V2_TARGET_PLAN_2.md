# Next Skill Map v2 Target Plan — 2

Created: June 2026

---

## Candidate Scoring

| Candidate | Commercial value | Coarseness | Visual support | Route risk | Sprint size | Score |
|---|---|---|---|---|---|---|
| **Year 12 Standard 1 — Trigonometry/Rates** | ★★★★ | ★★★★★ (1 lesson in unit) | ★★★★★ (TriangleDiagram) | ★★★★★ (all new slugs) | 3 lessons ✓ | **Recommended** |
| Year 11 Advanced — Working with Functions Ph2 | ★★★★★ | ★★★ (2 gaps remain) | ★★★★★ | ★★★★★ | 1–2 lessons (too small) | Reject |
| Year 8 Linear Relationships | ★★ | ★★★ (all [E], no [N]) | ★★★★★ | ★★★★ | No clear [N] slots | Reject |
| Year 11 Standard Linear Relationships | ★★★ | ★★★ | ★★★★★ | ★★★★★ | 1 lesson (too small) | Reject |
| Year 10 Algebraic Techniques | ★★★★ | ★★ (1 gap only) | ★★★★★ | ★★★★★ | 1 lesson (too small) | Reject |

---

## Recommended Next Target

**Year 12 Standard 1 — `trigonometry-ratios-rates` unit expansion**

The `trigonometry-ratios-rates` unit has one active lesson (`ratios-rates-unit-conversions`) — the thinnest unit in any `in_progress` course. The slot map flags `right-angle-trig-problems` [N] and `rates-practical-contexts` [N] as clear gaps. Adding both plus an exam practice lesson makes a clean 3-lesson sprint.

**Why over the others:**

- Year 11 Advanced Working with Functions Phase 2 resolves to a single lesson (`composite-function-evaluation` in graph-transformations). Too small to plan separately; add it as one item inside a later sprint.
- Year 8 Linear Relationships has 6 existing [E] lessons and no [N] slots. "Cleanup" would be quality work, not a new content sprint — wrong document type.
- Year 11 Standard Linear Relationships and Year 10 Algebraic Techniques each need exactly 1 missing lesson. Neither justifies a standalone plan.

---

## Why Year 12 Standard 1 Trigonometry/Rates

| Factor | Detail |
|---|---|
| Nakedly thin unit | Only 1 lesson in a 4-lesson benchmark area — the largest structural gap left in any `in_progress` course |
| NSW syllabus coverage | Standard 1 MA11-3 requires right-angle trig in applied contexts (elevation/depression, practical distances) and multi-step rates — neither fully covered today |
| Existing infrastructure | `TriangleDiagram` is live; `year12Standard1.ts` override file structure is established; `measurement-geometry` trig lesson shows the question/teaching style |
| Zero legacy risk | All new slugs — no existing progress records or lesson routes affected |
| Status path | After this sprint, every Standard 1 unit has ≥ 2 real lessons; supports a future status move to `available` |
| Sprint fit | Exactly 3 lessons: applied trig + applied rates + exam practice |

---

## Current Unit State

File: `lib/lessons/year12Standard1.ts`  
Catalog unit: `year-12-standard-1` / `trigonometry-ratios-rates`  
Unit title: Rates, Ratios and Measurement

| Lesson slug | Title | Status |
|---|---|---|
| `ratios-rates-unit-conversions` | Ratios, Rates and Unit Conversions | Active (shared with Std 2) |

**Slots [N]:** `right-angle-trig-applications`, `rates-practical-problems`, `trig-rates-exam-practice`

---

## Proposed Phase 1 Lessons (3)

### Lesson 1: Right-Angle Trigonometry — Applied Problems

| Field | Plan |
|---|---|
| Slug | `right-angle-trig-applications` |
| Title | Right-Angle Trigonometry — Applied Problems |
| Stable skill ID | `y12s1-trig-right-angle-trig-applications` |
| Learning goal | Apply sin, cos, and tan to multi-step practical problems involving angles of elevation and depression, ramp gradients, and distances in diagrams. |
| Prerequisite | `measurement-geometry/right-angle-trigonometry` — basic ratio identification and single-step side/angle finding |
| Differentiation from `right-angle-trigonometry` | This lesson focuses on contextualised multi-step problems and Standard 1-style phrasing; the existing lesson covers ratio definition and setup only |
| Worked example themes | (1) Angle of elevation: find the height of a building given a horizontal distance and angle. (2) Angle of depression: find the horizontal distance from the top of a cliff. (3) Two-triangle problem: a ramp rises at a gradient of 1:8 — find the length of the ramp surface. |
| Practice focus | Typed side lengths (rounded to 1 d.p.) or angles (nearest degree); MCQ for ratio selection; accepted answers cover rounding variants |
| Visual payload | `triangleDiagram` on each worked example; at least 2 guided-practice questions |
| Answer-marking risks | Rounding to 1 d.p. vs 2 d.p. — fix canonical precision and add acceptable rounding variants; angles-in-context must strip the degree symbol; avoid asking students to "draw a diagram" |
| Multi-part appropriate | Yes — (a) MCQ: which trig ratio; (b) typed: find the side to 1 d.p.; (c) typed: find the angle in degrees |
| Checkpoints | (a) Identify the relevant sides and angle in a practical context; (b) Choose the correct ratio for the unknown; (c) Apply inverse trig to find an angle; (d) Solve a two-step problem using the same triangle twice |

---

### Lesson 2: Rates in Practical Contexts

| Field | Plan |
|---|---|
| Slug | `rates-practical-problems` |
| Title | Rates in Practical Contexts |
| Stable skill ID | `y12s1-trig-rates-practical-problems` |
| Learning goal | Calculate and interpret rates in multi-step practical problems including speed, fuel consumption, flow rate, and hourly pay — going beyond simple unit conversion to applied problem-solving. |
| Prerequisite | `ratios-rates-unit-conversions` — basic rate and ratio computation |
| Differentiation from `ratios-rates-unit-conversions` | This lesson applies rate concepts to multi-step contextual problems (total cost, time to complete a task, comparison of options); the existing lesson covers rate and unit conversions only |
| Worked example themes | (1) Speed: a car travels 240 km at 80 km/h; find total travel time including a 30 min rest stop. (2) Flow rate: a pump fills a 1500 L tank at 25 L/min — how long to fill it to 60%? (3) Fuel: a truck uses 12 L per 100 km; find the cost of a 350 km trip when fuel costs $1.85/L. |
| Practice focus | Typed values in units given by the context; MCQ for identifying the correct rate formula to use; accepted answers must cover rounding and unit-stripped forms |
| Visual payload | None — all text-based rate calculations |
| Answer-marking risks | Students commonly confuse time-in-hours with time-in-minutes; require a consistent unit in the answer and strip all unit strings; accept both rounded decimal and fraction answers for time problems |
| Multi-part appropriate | Yes — (a) calculate the rate from a table or context; (b) apply it at a new value; (c) MCQ: which interpretation or comparison is correct |
| Checkpoints | (a) Calculate a rate from two related quantities; (b) Apply a rate to find a total amount, distance, or time; (c) Compare two rate options to identify the better value; (d) Solve a multi-step rate problem combining two rates or two phases |

---

### Lesson 3: Trigonometry and Rates Exam Practice

| Field | Plan |
|---|---|
| Slug | `trig-rates-exam-practice` |
| Title | Trigonometry and Rates Exam Practice |
| Stable skill ID | `y12s1-trig-trig-rates-exam-practice` |
| Learning goal | Solve mixed Standard 1 exam questions involving right-angle trigonometry, ratio/rate calculations, unit conversions, and contextual interpretation by identifying the relevant technique and working methodically. |
| Prerequisite | All three lessons in the `trigonometry-ratios-rates` unit |
| Worked example themes | (1) Mixed trig + rate: find the angle of a slope from a rise:run ratio and identify a safe speed limit for a road at that gradient. (2) Multi-step rate: total cost of a pipe job using a flow rate and a materials rate. (3) Applied trig: given a diagram description, find a missing side and use it to answer a practical question. |
| Practice focus | D3–D5 questions mixing trig and rates; at least 2 MCQ items for technique selection; one optional `multiPartPractice` item with 3 typed-numeric or MCQ parts |
| Visual payload | `triangleDiagram` only where a trig problem requires a labelled diagram stimulus |
| Answer-marking risks | Mixed questions may tempt "explain your working" phrasing — keep every part numeric or MCQ; no "describe", "explain", "justify" in assessed questions |
| Multi-part appropriate | Yes — required here. A 3-part item: (a) trig side finding; (b) rate calculation using that side; (c) MCQ contextual interpretation |
| Checkpoints | (a) Identify whether a question requires trig, rate, or ratio reasoning; (b) Execute the correct method to find a side, angle, or rate value; (c) Apply a result from one part to answer a connected question; (d) Interpret a calculated value in its practical context |

---

## Files To Touch

| File | Change |
|---|---|
| `lib/lessons/year12Standard1.ts` | Add 3 new override functions: `year12Standard1RightAngleTrigApplicationsLessonOverride`, `year12Standard1RatesPracticalProblemsLessonOverride`, `year12Standard1TrigRatesExamPracticeLessonOverride` |
| `lib/newCourseCatalog.ts` | Add 3 lesson seeds to `trigonometry-ratios-rates` unit after `ratios-rates-unit-conversions`; add `stableSkillId` + 4 `skillCheckpoints` per lesson; import and wire 3 new override functions into `buildLesson` |
| `docs/NEXT_SKILL_MAP_V2_TARGET_PLAN_2.md` | This file — plan document |

Do not touch checkout, auth, payments, Supabase writes, or unrelated route code. Do not rename or remove `ratios-rates-unit-conversions`.

---

## Visual Needs

| Lesson | Payload type | Usage |
|---|---|---|
| `right-angle-trig-applications` | `triangleDiagram` | All 3 worked examples; at least 2 guided practice questions with diagram stimulus |
| `rates-practical-problems` | None | Text-only; no diagram required |
| `trig-rates-exam-practice` | `triangleDiagram` | Only where a question asks students to read from a labelled diagram |

No new visual renderer required. `TriangleDiagram` is already live and used in `year12Standard1RightAngleTrigonometryLessonOverride`.

---

## Risks

| Risk | Recommendation |
|---|---|
| `right-angle-trig-applications` duplicates `measurement-geometry/right-angle-trigonometry` | Teach distinct skills: the existing lesson covers ratio selection and single-step setup; this lesson covers applied multi-step problems and elevation/depression. Guard the override with `unit.slug === "trigonometry-ratios-rates"` to prevent cross-unit collision. |
| Rounding ambiguity in trig typed answers | Pick one canonical precision (1 d.p. for sides, nearest degree for angles) and add ±0.1 variants to `acceptedAnswers`; strip degree symbol in canonical answers |
| Rates unit confusion (hours vs minutes) | State the required unit clearly in every prompt; strip all unit strings before comparing; add time-in-minutes and time-in-hours both to `acceptedAnswers` for time questions |
| Override guard fails for shared slugs | Every new override function must check `course.slug`, `unit.slug`, and `lesson.slug` — three-field guard, same pattern as existing Standard 1 overrides in `year12Standard1.ts` |
| Dry-run seed picks up fallback content | Confirm dry-run shows only the 3 × 19 = 57 authored questions for these lessons, no generic fallback output |

---

## Validation Commands

```bash
npx tsc --noEmit
npm run audit:lessons
npx tsx scripts/seed-question-bank.ts --course year-12-standard-1 --dry-run
git diff --check
```

Expected after Phase 1:
- `trigonometry-ratios-rates` seed count increases from 1 × 19 = 19 to 4 × 19 = 76
- No TypeScript errors
- `audit:lessons` PASS — 0 failures, 0 placeholder warnings
- `git diff --check` — no trailing whitespace

---

## Implementation Prompt

```text
Task: Implement Year 12 Standard 1 Trigonometry and Rates — Skill Map v2 Phase 1.

Work in c:\Users\joshu\hsc-maths-coach.
Do not touch checkout/auth/payments. Do not write to Supabase.

Read before coding:
- docs/NEXT_SKILL_MAP_V2_TARGET_PLAN_2.md (this file)
- lib/lessons/year12Standard1.ts (override style reference — follow existing function pattern)
- lib/newCourseCatalog.ts (Standard 1 trigonometry-ratios-rates unit, line ~600)
- docs/QUESTION_AUTHORING_STANDARD.md

Add 3 new lessons to the year-12-standard-1 / trigonometry-ratios-rates unit:

1. right-angle-trig-applications — Right-Angle Trigonometry: Applied Problems
   Stable ID: y12s1-trig-right-angle-trig-applications
   Checkpoints: identify sides/angle in context; choose correct ratio; apply inverse trig for angles; solve two-step problems.
   Visual: triangleDiagram on worked examples and at least 2 guided practice questions.
   Guard: course.slug === "year-12-standard-1" && unit.slug === "trigonometry-ratios-rates" && lesson.slug === "right-angle-trig-applications"

2. rates-practical-problems — Rates in Practical Contexts
   Stable ID: y12s1-trig-rates-practical-problems
   Checkpoints: calculate a rate from two quantities; apply rate to find total; compare two rate options; solve multi-step rate problem.
   Visual: none.
   Guard: same pattern, lesson.slug === "rates-practical-problems"

3. trig-rates-exam-practice — Trigonometry and Rates Exam Practice
   Stable ID: y12s1-trig-trig-rates-exam-practice
   Checkpoints: identify reasoning type (trig/rate/ratio); execute correct method; chain parts; interpret in context.
   Visual: triangleDiagram only where a diagram stimulus is required.
   Guard: lesson.slug === "trig-rates-exam-practice"
   Add one optional multiPartPractice item with 3 auto-markable parts.

Add the new override functions to lib/lessons/year12Standard1.ts.
Update lib/newCourseCatalog.ts:
  - Add 3 lesson seeds after ratios-rates-unit-conversions in the trigonometry-ratios-rates unit
  - Add stableSkillId + 4 skillCheckpoints per lesson
  - Import the 3 new override functions
  - Wire them into buildLesson (follow the existing Standard 1 pattern)

For each lesson: 4 guided + 5 independent + 10 mastery = 19 questions.
Question ID prefix: y12s1-trig-app-*, y12s1-rates-pp-*, y12s1-trig-exam-*
Auto-markable only: typed numeric (strip units), MCQ labels, classification words.
acceptedAnswers must cover rounding variants and degree-symbol-stripped forms for trig.
No free-text: no "explain", "justify", "show", "describe" in practice prompts.

Validation:
- npx tsc --noEmit
- npm run audit:lessons
- npx tsx scripts/seed-question-bank.ts --course year-12-standard-1 --dry-run
- Confirm dry-run shows 4 lessons × 19 = 76 questions for trigonometry-ratios-rates
- git diff --check
```
