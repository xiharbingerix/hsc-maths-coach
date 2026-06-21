# Topic Test Diagnostic — Plan

Status: **Phase 0 complete** · Pilot: **year-12-extension-1 / kinematics** (confirmed) · Last updated: 2026-06-21

## Goal

Give every **topic** a timed, ~1-hour practice test that doubles as a
diagnostic. Each test is **assembled on demand** by randomly drawing high-band
questions from a per-**subtopic** pool of **10 D4 + 10 D5** items. When the
student finishes, they get a marked result, a predicted band, and a clear
**"go re-practice these subtopics"** list linking straight to the lessons.

Vocabulary (matches the catalogue): a **topic** is a course *unit*; a
**subtopic** is a *lesson* inside that unit. A topic test samples across all of
its subtopics.

---

## What already exists (reuse, don't rebuild)

This feature sits almost entirely on top of the existing **exam-readiness tier**.
Map of what we get for free:

| Need | Already built | File |
|---|---|---|
| Timed test runner (countdown, per-question nav, submit) | `ExamRunner` | [app/exam/[examId]/ExamRunner.tsx](../app/exam/[examId]/ExamRunner.tsx) |
| Question model with marks, difficulty 1–6, topic tag, remediation link, multi-part | `ExamQuestion` / `ExamPaper` | [lib/exams/types.ts](../lib/exams/types.ts) |
| Server marking (CAS-backed: MCQ + typed + multi-part, partial credit) | `scoreExam` | [lib/exams/scoreExam.ts](../lib/exams/scoreExam.ts) |
| Per-topic rollup + **remediation list** (weak topics first, with `remediationHref`) | `scoreExam` → `ExamResult.remediation` | [lib/exams/scoreExam.ts](../lib/exams/scoreExam.ts) |
| Band prediction from % | `predictExamBand` | [lib/exams/types.ts](../lib/exams/types.ts) |
| Attempt persistence | `/api/exam/*` | [app/api/exam/attempts/route.ts](../app/api/exam/attempts/route.ts), [app/api/exam/[examId]/submit/route.ts](../app/api/exam/[examId]/submit/route.ts) |
| **Seeded random draw from a difficulty-tagged pool** (stable per attempt, varies between attempts, difficulty ramp) | `buildMasteryQuiz` | [lib/mastery/buildMasteryQuiz.ts](../lib/mastery/buildMasteryQuiz.ts) |
| Subtopic mastery storage + dashboard "where they're at" | `student_subtopic_mastery`, `TopicBreakdownCard` | [app/components/TopicBreakdownCard.tsx](../app/components/TopicBreakdownCard.tsx) |
| Study-plan / next-topic generation | `generateStudyPlan` | [lib/studyPlans/generateStudyPlan.ts](../lib/studyPlans/generateStudyPlan.ts) |
| Diagram payloads in questions (28 renderers) | diagram registry + `VisualPayloadRenderer` | [app/components/VisualPayloadRenderer.tsx](../app/components/VisualPayloadRenderer.tsx) |

**Key consequence:** we do **not** build a new test engine. We build (a) a
**content pool**, (b) an **assembler** that turns a topic + seed into an
`ExamPaper`, and (c) thin **routing/persistence** glue. The runner and scorer
are unchanged.

The course-level Paper 1 exams (e.g. [lib/exams/year12AdvancedPaper1.ts](../lib/exams/year12AdvancedPaper1.ts))
are hand-authored static papers. Topic tests are the **dynamic** sibling:
generated from pools, scoped to one topic, remediated at subtopic granularity.

---

## Product spec

1. Student opens a topic (e.g. *Differential Calculus*) and chooses **"Take the
   topic test."**
2. The system assembles a fresh ~60-minute paper by randomly drawing D4/D5
   questions across that topic's subtopics (seeded per attempt).
3. Student works through it under a visible countdown (reusing `ExamRunner`).
4. On submit: marked server-side, shown total + % + predicted band, a
   **per-subtopic breakdown**, and a **remediation list**: "Focus first:
   *Applications of Differentiation* (38%) → Re-practise."
5. Result is persisted and feeds subtopic mastery, so the dashboard and admin
   student view update automatically.

It "functions as a diagnostic" because the per-subtopic scoring + remediation is
exactly the diagnostic signal — just at higher difficulty (D4/D5) and finer
granularity (subtopic, not topic) than the existing entry diagnostic.

---

## Content model

### Pool question type

Extend the exam model rather than invent a new one. Add to `ExamQuestion`
(or a thin `TopicTestQuestion = ExamQuestion & { … }`):

- `subtopicSlug: string` / `subtopicTitle: string` — which lesson this assesses.
- `difficulty: 4 | 5` — pool items are high-band only.
- `estimatedMinutes?: number` — drives the 1-hour budget (default from marks).
- `DiagramFields` (optional) — so visual D4/D5 items reuse the diagram registry,
  exactly as just done for diagnostics. **One small infra add**: confirm
  `ExamRunner` renders `<VisualPayloadRenderer {...question} />` (mirror the
  diagnostic change); today it likely doesn't.

**Remediation trick (free subtopic granularity):** for topic-test questions, set
the existing `topicSlug`/`topicTitle`/`remediationHref` to the **subtopic's**
slug/title/lesson route. Then `scoreExam`'s existing per-`topicSlug` rollup and
remediation list become **per-subtopic** with zero scorer changes. Keep the
parent topic on a separate field if needed for headers.

### Storage layout

Pools are large and content-owned, so keep them as structured TS (validated,
typed), one file per topic:

```
lib/topicTests/
  index.ts                       # registry: courseSlug+topicSlug -> pool
  types.ts                       # TopicTestQuestion, TopicTestPool
  pools/
    year-12-advanced/
      differential-calculus.ts   # { subtopicSlug: { d4: [...10], d5: [...10] } }
      integral-calculus.ts
      ...
```

Each subtopic exposes `{ d4: TopicTestQuestion[]; d5: TopicTestQuestion[] }`
(target 10 each). The registry lets the assembler look up a topic's pool by
`courseSlug + topicSlug`.

### Difficulty rule (set 2026-06-21)

Topic tests are a **high-band** diagnostic: **every question is D4, D5, or D6** —
no below-D4 items (`TopicTestQuestion.difficulty: 4 | 5 | 6`). Skill subtopics
use D4 + D5; an **exam-practice subtopic uses D6** (exam-mastery synoptic,
multi-part Section II–style). D6 is defined in
[QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md); the pool
carries it on an optional `d6` band.

### Authoring workflow (set 2026-06-21)

Author per subtopic, **one band at a time (10 questions), then audit that batch
against [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md)**
before moving on: verify every answer (numeric check), then score each item for
mathematical richness, diagnostic value, distractor→misconception mapping,
genuine D4/D5 difficulty (no fake depth), auto-markability, LaTeX/currency
correctness, and pool diversity. Fix or reject anything that fails.

### Authoring rules (non-negotiable)

All pool questions follow [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md):

- **Auto-markable only.** Marking is CAS/string based — **no** "explain",
  "justify", "show that", "prove", "describe". D5 here means **synoptic /
  multi-step / transfer with a numeric, coordinate, MCQ, or simple-algebra final
  answer**, *not* proof. This is the single biggest authoring constraint.
- **D4** = transfer & interpretation: choose the method, connect concepts,
  reject a plausible wrong path, interpret a result. Formula substitution alone
  never qualifies.
- **D5** = novel reasoning/synthesis: constraint reasoning, modelling,
  optimisation, multi-concept synthesis — collapsing to one unambiguous value.
- Every MCQ distractor maps to a **specific misconception**.
- Multi-part (Section II style) is encouraged for D5 — `ExamQuestionPart`
  already supports marks-weighted partial credit.
- Diagram-required items **must** ship a payload (reuse the registry).
- Validate with the batch validator / lesson audit before merge.

---

## Test assembly algorithm

`buildTopicTest(courseSlug, topicSlug, seed)` → `ExamPaper`:

1. Look up the topic's pool (all subtopics, each with `d4`/`d5`).
2. Seed a PRNG from `seed` (reuse the `mulberry32` approach in
   `buildMasteryQuiz`) so a given attempt is stable but retakes differ.
3. **Coverage + budget:** target ~60 min via a marks budget
   (HSC ≈ 1.5 min/mark → ~**40 marks**, tunable). Distribute draws across
   subtopics so each studied subtopic is represented, then fill remaining budget.
   Suggested default per subtopic: draw **1 D4 + 1 D5** (shuffled within each
   band), expanding/contracting to hit the budget. Always include at least one
   item per subtopic when budget allows.
4. Emit an `ExamPaper` (`timeLimitMins: 60`, sections by subtopic or a single
   section) consumed unchanged by `ExamRunner` + `scoreExam`.

Edge cases to specify: topics with many subtopics (budget < subtopics →
round-robin sample a rotating subset, seeded by attempt so coverage spreads
across retakes); thin pools (< 10 per band → draw what exists, warn in audit).

A **subtopic test** is the same call filtered to one subtopic — free.

---

## Marking, scoring & remediation

Reuse `scoreExam` verbatim. Because question `topicSlug` = subtopic:

- `ExamResult.topicBreakdown` → **per-subtopic** marks/percentage.
- `ExamResult.remediation` → weak subtopics (< 60%), weakest first, each with
  the lesson `remediationHref`. This *is* the "where to re-practise" list.
- `predictExamBand` gives a band from the overall %.

Results page (new, or a variant of the exam results UI): headline band + %,
per-subtopic bars (reuse `TopicBreakdownCard` styling), and a prominent
remediation CTA list → lesson links.

---

## Persistence & diagnostic feedback loop

- Persist the attempt via the existing exam attempt path (extend the table/route
  to carry `topicSlug` + per-subtopic results, or add a `topic_test_attempts`
  table if the exam schema is too paper-specific — decide in Phase 0).
- Feed per-subtopic correctness into **`student_subtopic_mastery`** using the
  same pattern as the diagnostic's `/api/mastery/diagnostic` call, so:
  - the dashboard **"Where they're at"** card updates,
  - the admin student view reflects it,
  - `generateStudyPlan` / next-topic recommendations improve.

This closes the loop: take topic test → weak subtopics surfaced → re-practise →
mastery rises → retake draws a fresh paper.

---

## Routes & UI

- `GET /topic-test/[courseSlug]/[topicSlug]` — intro + "Start" (mirrors the
  diagnostic intro). Generates a `seed`, assembles, hands the paper to a runner.
- Reuse `ExamRunner` for the timed run; reuse/adapt the exam results view.
- Entry points: topic page in `/course`, the dashboard mastery card ("Test this
  topic"), and the admin student view ("Assign topic test").

---

## Content volume & effort (the real cost)

The infra is small; **authoring is the project.** Rough order of magnitude
(confirm exact counts in Phase 0):

- 20 questions/subtopic (10 D4 + 10 D5).
- Year 12 Advanced ≈ 6 topics, est. ~25–30 subtopics → **~500–600** D4/D5 items
  for one course.
- All 8 courses → low **thousands**. This must be phased and pooled-out over
  time; do **not** attempt all courses at once.

D4/D5 auto-markable authoring is slow and quality-sensitive. Budget realistic
authoring/validation time per item and consider a structured authoring batch +
validator gate.

---

## Phase 0 — findings & decisions (2026-06-21)

### F1. Subtopic (lesson) counts

From `newCoursePathways` ([lib/newCourseCatalog.ts](../lib/newCourseCatalog.ts)),
the uniform nested model used by most courses: **15 pathways, 139 units, 830
lessons total.** Available HSC Year-12 candidates for a pilot:

| Course | Status | Units | Lessons | Smallest auto-markable topics (lessons) |
|---|---|---|---|---|
| year-12-standard-2 | available | 11 | 58 | normal-distribution (3), measurement-SA-volume (3), probability (4), bivariate-data (4) |
| year-12-extension-1 | available | 7 | 42 | kinematics (4), inverse-trig (5), further-calculus (5), calculus-applications (9) |
| year-11-advanced | available | 7 | 72 | graph-transformations (6), exponential-logarithmic (6) |

A topic pool = subtopics × 20 items. So e.g. **kinematics (4 subtopics) = 80
D4/D5 items**; normal-distribution (3) = 60.

### F2. Year 12 Advanced is **legacy** — not a good pilot

`year-12-advanced` is **not** in `newCoursePathways`. Its content uses the older
model: units are **top-level routes** (`/course/differential-calculus`,
`/course/functions-graphing-techniques`, …) defined via `courseCatalogue`
([lib/courseUnits.ts](../lib/courseUnits.ts)) + `lib/lessons/*`, and the existing
exam paper remediates to a single generic `/course/year-12-advanced`
([lib/exams/year12AdvancedPaper1.ts](../lib/exams/year12AdvancedPaper1.ts)).

Consequence: the subtopic-enumeration + `remediationHref` mapping the assembler
relies on works cleanly only for `newCoursePathways` courses. **Decision:** the
pilot uses a `newCoursePathways` course. Legacy courses (incl. Year 12 Advanced)
get a thin adapter in a later phase. *(Side note: the dashboard/admin
`lessonsForTopic` helper is also `newCoursePathways`-only, so it already doesn't
expand legacy Y12-Advanced units — consistent with this decision.)*

### F3. Pilot — **`year-12-extension-1` → `kinematics`** (confirmed 2026-06-21)

Rationale: Year 12,
clean nested structure, only **4 subtopics (80 items)**, content is fully
numeric (displacement/velocity/acceleration, projectile) so every D4/D5 item is
**auto-markable**, and Extension-level makes genuine D4/D5 natural.
**Alternative (smaller/safest): `year-12-standard-2` → `normal-distribution`**
(3 subtopics, 60 items, very auto-markable). Avoid proof-heavy topics
(e.g. `proof-induction`) — they can't be auto-marked.

### F4. Attempt persistence — **reuse `exam_attempts`**

`exam_attempts` ([lib/supabase-migrations/021_exam_attempts.sql](../lib/supabase-migrations/021_exam_attempts.sql))
already stores `exam_id`, `course_slug`, marks, `percentage`, `band`, and
**`topic_breakdown jsonb`**, with a working read endpoint
([app/api/exam/attempts/route.ts](../app/api/exam/attempts/route.ts)).

**Decision: reuse it — no new table for the pilot.**
- Use a synthetic, deterministic `exam_id`:
  `topic-test:<courseSlug>:<topicSlug>:<seed>`.
- Per-subtopic results live in `topic_breakdown` (questions tag `topicSlug` =
  subtopic, so the existing rollup already produces this — see "Remediation
  trick").
- **Submit path:** the current `/api/exam/[examId]/submit`
  ([app/api/exam/[examId]/submit/route.ts](../app/api/exam/[examId]/submit/route.ts))
  calls `getExamPaper(examId)` against the *static* registry. Topic tests are
  dynamic, so Phase 1 adds a topic-test-aware branch that **reconstructs the
  exact paper from the id-encoded `(course, topic, seed)`** via the deterministic
  assembler, then scores with the unchanged `scoreExam`. The seed in the id is
  what makes server-side reconstruction deterministic.
- A dedicated `topic_test_attempts` table is **deferred** until analytics need
  fields `exam_attempts` can't carry.

Migrations live in `lib/supabase-migrations/` (latest: `021`).

### F5. `ExamRunner` diagram gap — confirmed

[ExamRunner.tsx](../app/exam/[examId]/ExamRunner.tsx) renders `MathText` +
`BlockMath` but **not** `VisualPayloadRenderer`. Phase 1 adds the one-line
`<VisualPayloadRenderer {...question} />` (same change already shipped for the
diagnostic) so visual D4/D5 items render.

### F6. Time budget — calibrated

Existing mini-papers run at **1.55–1.90 min/mark (mean ≈ 1.8)** across all 8
Paper 1s — but those are *mixed* D1–D6. An all-D4/D5 paper is heavier per mark.

**Decision:** budget the assembler at **~2 min/mark → ~30 marks for 60 min**
(≈ 8–12 questions, given D4 ≈ 2–3 marks and D5 ≈ 3–5 marks). Each question
carries an optional `estimatedMinutes` override; **recalibrate against real
attempt durations in Phase 2.**

### Phase 0 acceptance — met

Concrete subtopic numbers (F1), pilot **confirmed** (F3 — year-12-extension-1 /
kinematics), persistence decision (F4), diagram-gap confirmation (F5), and the
time budget (F6) are all recorded. Phase 1 is unblocked.

---

## Phased rollout

**Phase 0 — Scoping & decisions (no content). ✅ DONE — see "Phase 0 — findings & decisions" above.**
- ~~Confirm subtopic counts per course; pick the pilot.~~ → F1, F3 (pilot pending sign-off)
- ~~Decide attempt persistence.~~ → F4 (reuse `exam_attempts`)
- ~~Confirm `ExamRunner` diagram gap and the marks→minutes budget.~~ → F5, F6

**Phase 1 — Infra + one pilot topic (year-12-extension-1 → kinematics).**

Progress (updated 2026-06-21):

- [x] **Assembler engine** — `lib/topicTests/{types,buildTopicTest,index}.ts`:
  `buildTopicTest` (seeded mulberry32 draw, coverage-first then budget-fill,
  remediation stamped from the subtopic), `parseTopicTestId` /
  `getTopicTestPaper` for deterministic server-side reconstruction.
- [x] **Unit tests** — `lib/topicTests/buildTopicTest.test.ts` (8 tests: seeding
  determinism, budget adherence + fill, full coverage, remediation stamping, id
  round-trip, malformed-id rejection). Added `npm test`
  (`node --import tsx --test "lib/**/*.test.ts"`).
- [x] **Model** — extended `ExamQuestion` with optional `subtopicSlug`,
  `subtopicTitle`, `estimatedMinutes`, and `& DiagramFields` (all optional; zero
  impact on static papers).
- [x] **Runner wiring** — `ExamRunner` now renders
  `<VisualPayloadRenderer {...question} />` (question + review), and diagram
  fields pass through `ClientExamQuestion` / `toClientExam` (via
  `pickDiagramFields`).
- [x] **Submit branch** — `/api/exam/[examId]/submit` recognises a `topic-test:`
  id, reconstructs the paper via `getTopicTestPaper`, scores with `scoreExam`,
  persists to `exam_attempts`, and writes per-subtopic results to
  `student_subtopic_mastery` via `recordMasteryEvents` (`sourceType: "quiz"`,
  parent topic from the id, subtopic from each stamped question).
- [x] **Route** — `/topic-test/[courseSlug]/[topicSlug]` assembles a seeded
  paper and reuses `ExamRunner` (timed run + built-in results: band,
  per-subtopic remediation CTAs).
- [x] **Pilot pool (starter)** — kinematics registered with 1 D4 + 1 D5 per
  subtopic (8 items, hand-verified). Verified end-to-end: page renders all 4
  subtopics; colon-id route resolves; deterministic reconstruct; all-correct →
  23/23 (E4); failing a subtopic surfaces it in remediation.
- [x] **Content slice** — kinematics pool authored & committed: subtopics 1–3
  at 10 D4 + 10 D5 each, subtopic 4 (Kinematics Exam Practice) at **10 D6**
  (multi-part synoptic). 80 questions total, every answer numerically verified,
  each batch audited against the quality standard. Introduced the **D6**
  difficulty standard in QUESTION_AUTHORING_STANDARD.md and a `d6` pool band.
- [x] **Entry point** — a "Topic tests" section on `/exam` lists registered
  topic tests (`listTopicTests`) and links to `/topic-test/[course]/[topic]`.
  Render-verified; further entry points (dashboard card / admin view) optional.
- [x] **Auth-gated paths — verified live** (logged-in test account, 2026-06-21):
  submitted the kinematics test failing one subtopic on purpose →
  - results page: band E3, 16/23 (70%), remediation listed exactly *Analysing
    Motion* (0/7);
  - `exam_attempts` row persisted with id
    `topic-test:year-12-extension-1:kinematics:469692` and per-subtopic
    `topic_breakdown`;
  - `student_subtopic_mastery` wrote all 4 kinematics subtopics
    (motion-analysis 0, others 43); `student_mastery` topic = 80;
  - dashboard "Where they're at" card shows Kinematics expanded with the
    per-subtopic scores.
- **Acceptance: MET** — a student can take the kinematics test, get a marked
  per-subtopic result + remediation, and see mastery update on the dashboard.
  *Remaining for Phase 1 completeness: content depth (grow each band to 10).*

> Known cosmetic issue (pre-existing in `ExamRunner` results, not topic-test
> specific): MCQ "Correct:" review text renders raw LaTeX (e.g.
> `$6 \text{ m/s}^2$`) instead of via `MathText`. Worth a small fix later.

**Phase 2 — Validate the pilot.**
- Render-test a sampled assembled paper (Playwright, as with the diagnostic).
- Check marking on each answer type, the 60-min budget realism, and remediation
  accuracy. Tune budget/coverage. Get teacher review of the D4/D5 quality.

**Phase 3 — Scale content.**
- Roll out remaining Year 12 Advanced topics, then the other courses, one topic
  pool at a time behind the same infra. Track coverage in
  [CONTENT_QUALITY_AUDIT_TRACKER.md](./CONTENT_QUALITY_AUDIT_TRACKER.md).

_Ext 1 build status (in progress, one subtopic at a time):_
- ✅ kinematics — complete (registered).
- ✅ inverse-trig — complete (registered). Subtopics 1–4 at 10 D4 + 10 D5 each
  (Inverse Sine and Cosine; Inverse Tangent; Differentiating Inverse Trig;
  Identities and Composite Expressions); subtopic 4 also carries a **10-item D6
  band** (the topic's exam-mastery synoptic set, since this topic has no
  exam-practice lesson). 90 questions total.
- ✅ further-calculus — complete (registered). Skill subtopics 1–3 at 10 D4 + 10
  D5 each (Trig Integral Forms; Substitution; Integration by Parts), plus the
  exam-practice subtopic at 10 D6 (multi-part synoptic). 70 questions total.
- 🟡 calculus-applications — subtopics 1–5 done (Related Rates; Exponential
  Growth and Decay; Simple Harmonic Motion; Areas Between Curves and Volumes of
  Revolution; Multiplicity of Zeroes of Polynomial Functions — 10 D4 + 10 D5
  each); subtopics 6–7 + the D6 exam-practice band pending. (7 skill subtopics.)
- ⬜ binomial-distribution (skill subtopics D4+D5, exam-practice → D6), vectors
  (D4+D5; drop the projection-proof subtopic).
- ⏸ **proof-induction — deferred**: induction proofs aren't auto-markable.
  Awaits a Tier-2 AI proof/algorithm marker (the "Claude judge" already noted as
  future work in cas-service/README.md). Revisit once that marker exists.
- "Prior Knowledge Revision" subtopics are excluded from pools (low-band;
  remediation targets, not test content).

**Phase 4 — Polish.**
- Retake variety guarantees, per-subtopic test mode, "weakest-subtopics-only"
  adaptive test, optional exam-style PDF, analytics on topic-test funnel.

---

## Risks & open decisions

- **D5 ↔ auto-marking tension.** Genuine D5 often wants justification/proof,
  which we can't mark. Mitigation: D5 = synoptic numeric/multi-part; accept that
  some HSC-D5 styles are out of scope until free-text/AI marking exists.
- **Content cost dominates.** Phase hard; never block infra on full coverage.
- **Pool freshness / memorisation.** Seeded draws + 20/band/subtopic help; more
  per band later if memorisation shows up in analytics.
- **Budget realism.** 40 marks/hour is a starting estimate; calibrate against
  real attempt durations in Phase 2.
- **Persistence shape.** Reuse exam attempts vs new table — decide Phase 0.
- **Subtopic-as-topicSlug overload.** The remediation reuse trick is elegant but
  conflates two concepts; document it clearly or add a dedicated `subtopicSlug`
  rollup path in `scoreExam` if it causes confusion.

---

## Definition of done (pilot)

- [ ] `buildTopicTest` produces a valid ~60-min `ExamPaper` from the Differential
      Calculus pool, seeded and reproducible.
- [ ] Every pool item passes the authoring validator and is auto-markable.
- [ ] A full attempt marks correctly and produces a per-subtopic remediation list.
- [ ] Subtopic mastery updates after submission; dashboard + admin reflect it.
- [ ] Assembled paper render-verified in the browser (incl. any diagrams).
