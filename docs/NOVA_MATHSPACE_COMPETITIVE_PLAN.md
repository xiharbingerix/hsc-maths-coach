# Nova Maths vs Mathspace — Competitive Gap Analysis & Roadmap

_Last updated: 2026-08-10_

## 0. TL;DR

Nova's biggest gap versus Mathspace is not missing infrastructure — it's **unused infrastructure**. The
mastery pipeline already tracks subtopic-level mastery (`student_subtopic_mastery`, migration 015) and
already has authored misconception content (`commonMistakes` per lesson, `targetMisconception` per
diagnostic question). Almost none of it is wired into the surfaces students and tutors actually look at:

- Every "what's next" recommendation on the dashboard and admin pages ranks by **topic-level** mastery
  only. Subtopic data is fetched but used as a cosmetic label, not the ranking signal.
- Diagnostics — the very first signal a new student generates — **never write a subtopic** at all
  (`subtopicSlug: null`, hardcoded).
- `commonMistakes` (lesson-level, authored, good content) is shown **once, upfront, unconditionally**,
  before a student has attempted anything, and never appears again — including at the moment a student
  gets something wrong, which is when it would actually function as misconception-aware feedback.
- Static Paper 1 exams (the exams most students actually sit) never write back into the mastery model at
  all — a student can "fail" the same paper repeatedly with zero change to what Nova thinks they know.
- There is no misconception/error-type taxonomy anywhere: `mastery_events` stores `is_correct` (boolean)
  but never the student's answer or which distractor they picked, so no report can ever say *why* a
  student got something wrong.

Phase 1 (implemented in this change) closes the two cheapest, highest-leverage slices of this gap using
data and tables that already exist, with no new migrations, no new dependencies, and no change to any
existing API contract:

1. **Today's Study Plan is now subtopic-aware.** `generateStudyPlan()` looks up the weakest subtopic
   under the recommended unit and surfaces it in the reason text and a new UI tile — on both the student
   dashboard and the admin "Recommended next action" card.
2. **`commonMistakes` now appears at the moment of a wrong answer**, not just once before practice
   starts, on every guided/independent/challenge practice question in `LessonRenderer`.

Everything else identified below is scoped into Phase 2 and Phase 3.

---

## 1. Method

This plan is based on a direct code audit (not assumptions) of:

- Mastery pipeline: `lib/mastery/updateMastery.ts`, `lib/supabase-migrations/007/011/013/015_*.sql`,
  `scripts/backfill-subtopic-mastery.ts`
- Dashboard: `app/dashboard/page.tsx`, `lib/studyPlans/generateStudyPlan.ts`, `lib/dailyReviewQueue.ts`
- Diagnostics: `lib/diagnosticScoring.ts`, `lib/diagnostics/*`, `app/api/mastery/diagnostic/route.ts`,
  `app/diagnostic/[yearLevel]/DiagnosticQuizClient.tsx`
- Worksheets: `app/api/worksheet/[token]/answer/route.ts`, `app/api/worksheets/adaptive/route.ts`,
  `lib/answerMarking.ts`, `lib/cas/markAnswerWithCas.ts`
- Lessons/hints: `app/course/LessonRenderer.tsx`, `lib/hintLadder.ts`, `docs/FEEDBACK_AND_HINTS_STANDARD.md`
- Tutor: `app/api/tutor/route.ts`, `lib/tutor/generateTutorResponse.ts`
- Exams: `lib/exams/scoreExam.ts`, `lib/exams/types.ts`, `app/api/exam/[examId]/submit/route.ts`
- Question authoring: `docs/QUESTION_AUTHORING_STANDARD.md`, `lib/lessons/diagramRegistry.ts`,
  `lib/supabase-migrations/016/018_question_flags*.sql`
- Admin/reporting: `app/admin/students/[id]/page.tsx`, `lib/digest/computeDigestData.ts`

**Note on the working tree at the time of this audit:** branch `codex/fix-worksheet-latex-escapes` had an
uncommitted, unrelated in-flight change threading a `prompt` argument through `markTypedAnswer` /
`markAnswerWithCas` (a percentage-vs-proportion answer-matching fix). It touches
`lib/answerMarking.ts`, `lib/diagnosticScoring.ts`, `lib/exams/scoreExam.ts`,
`app/api/worksheet/[token]/answer/route.ts`, and `app/course/LessonRenderer.tsx`. Phase 1 below is
additive and does not touch answer-marking logic, so it does not conflict with that change.

---

## 2. Mastery model audit

```
mastery_events  →  student_mastery (topic-level EMA)
                →  student_subtopic_mastery (subtopic-level EMA, migration 015)
                →  student_mastery_history (per-topic snapshots, trend)
```

`recordMasteryEvents()` (`lib/mastery/updateMastery.ts`) is the single write path, called from four
places:

| Source | Writes topic mastery | Writes subtopic mastery | Subtopic meaning |
|---|---|---|---|
| Lesson mastery quiz (`app/api/mastery/lesson/route.ts`) | ✅ | ✅ (always) | The lesson's own slug — a lesson container, not a true skill tag |
| Worksheet completion (`.../worksheet/[token]/complete/route.ts`) | ✅ | ✅ (if question tagged) | Real `questions.subtopic_slug`, coverage depends on authoring |
| Topic-test exam submit (`app/api/exam/[examId]/submit/route.ts`) | ✅ | ✅ (if question tagged) | Real per-question subtopic tag |
| **Diagnostic** (`app/api/mastery/diagnostic/route.ts`) | ✅ | ❌ **hardcoded null** | — |
| Static Paper 1 exam submit | ❌ **never called** | ❌ **never called** | — |

Scoring is a pure EMA (`score = 0.75×old + 0.25×event`, clamped 0–100) with **no time decay** — a score
of 100 achieved once and never revisited stays 100 forever until a fresh event moves it. The dashboard's
staleness tiers (14/21-day thresholds, see `lib/dailyReviewQueue.ts`) only change *messaging* about a
score, never the stored score itself.

`student_subtopic_mastery` is genuinely live infrastructure — it's read in four places today (dashboard,
adaptive worksheet generator, admin worksheet-builder preview, admin student detail) — but in every one
of those readers it is used as a **secondary refinement** (which questions to draw, which label to show
under an already-chosen topic), never as the **primary ranking signal** for "what's weakest." That's the
single biggest lever in the whole codebase: the data exists, the write path exists, the read path exists
— it's just never driving the actual decision.

**Before building further on `student_subtopic_mastery`:** confirm migration 015 is applied in the
production database. The code has defensive "table missing" fallbacks in three places
(`updateMastery.ts`, `app/dashboard/page.tsx`, `app/admin/students/[id]/page.tsx`), which is a signal this
wasn't always guaranteed present.

---

## 3. What data already exists for subtopic-level recommendations

- `mastery_events.subtopic_slug` — per-question event, nullable, populated by lesson/worksheet/topic-test
  sources.
- `student_subtopic_mastery` — EMA score, attempt/correct counts, `last_updated`, per
  `(user, course, topic, subtopic)`.
- `questions.subtopic_slug` — authored per question in the seeded question bank (coverage varies by unit).
- `lib/diagnostics/*` question banks already carry a per-question `targetMisconception: string` field
  (hundreds of entries, hand-authored) — **currently dead data**, never read outside its own type file and
  one test assertion.
- `commonMistakes` — 3–4 hand-authored `{mistake, fix}` pairs per lesson (≈166 of 271 lesson files have
  it authored). Lesson-scoped, not question- or distractor-scoped.
- `question_flags` (migrations 016/018) — a student-initiated content-QA channel (wrong-answer /
  confusing-question / typo / diagram-issue / other), **not** a misconception-analytics signal. It doesn't
  capture which MCQ label was chosen.

What's **missing** for genuine subtopic/misconception-level recommendations:

- No per-distractor tagging on the `Choice` type (`{label, text}` only) — despite
  `docs/QUESTION_AUTHORING_STANDARD.md` mandating authors mentally justify each distractor's
  misconception, there's no field to persist that justification.
- No capture of the student's actual submitted answer/chosen distractor on `mastery_events` — only
  `is_correct` (boolean). This means no report, ever, today, can say *why* something was wrong, even
  retroactively.
- Diagnostics don't populate `subtopic_slug`, so the earliest, highest-volume signal a new student
  generates is topic-level only.

---

## 4. "Today's Study Plan" model

### What already existed (before this change)

Two independently-computed "what's next" surfaces on the dashboard, which can disagree:

1. **"Your Study Plan"** (`lib/studyPlans/generateStudyPlan.ts`) — merges diagnostic + topic-level
   mastery into one ranked list, picks the single weakest unit as `nextTopic`. This is the "headline"
   recommendation, also reused verbatim on the admin student page as "Recommended next action."
2. **"Today's review"** (`lib/dailyReviewQueue.ts`) — a three-tier spaced-repetition queue (weak / stale /
   confidence-building, 14/21-day thresholds, max 5 items). This one is *already* subtopic-aware for its
   "weak" tier — it substitutes the weakest subtopic's label/score when one exists.

The inconsistency: the *primary* recommendation (`generateStudyPlan`) was topic-only, while the
*secondary* review queue was already partially subtopic-aware. A student could see "Focus on
Trigonometry next" in one card and "Bearings — needs strengthening" in another, with no visible link
between them.

### Phase 1 model (implemented)

`generateStudyPlan()` now accepts optional `subtopicRows` + `subtopicLabels` and, for whichever unit it
recommends, looks up that unit's weakest subtopic (same "lowest mastery_score under this course/topic"
query pattern `dailyReviewQueue.ts` already uses for its weak tier — reused for consistency, not
reinvented). When the subtopic is genuinely weaker than the unit average, both the `reason` text and the
new `weakestSubtopic` field are populated:

```
"High priority because your current mastery for this topic is 42%.
 Your weakest area here is Bearings (18%) — start there."
```

This is rendered automatically wherever `studyPlan.nextTopic.reason` already renders (dashboard, admin
page — zero JSX change needed there), plus a new small "Weakest area" line under the "Next topic" tile
on the student dashboard. No new Supabase query: `subtopicMasteryRows` was already fetched on both
pages, just not passed into this function.

This does **not** yet unify the two dashboard cards (Study Plan vs Today's review) — see Phase 2. It
also doesn't yet reconcile the *third* independent "weakest topic" query in
`lib/digest/computeDigestData.ts` (the weekly parent email) — see Phase 2.

---

## 5. Misconception-aware feedback model

### Target shape (what the user asked for)

`wrong answer → likely misconception → hint → worked step → follow-up question`

### What exists today, per stage

| Stage | Status |
|---|---|
| Wrong answer detection | ✅ `markTypedAnswer` / CAS equivalence — solid |
| **Likely misconception** | ❌ Nothing computes or stores *why* an answer is wrong. `commonMistakes` exists but is lesson-scoped and shown only once, before practice, never re-triggered |
| Hint | ✅ 3-level hint ladder (`lib/hintLadder.ts`) — static per-question, not adaptive to the actual wrong answer |
| Worked step | ✅ `explanation` field, full worked solution — gated behind hint-ladder level 3 |
| Follow-up question | ❌ No re-serve of a similar/remedial question after a miss |

The AI tutor (`lib/tutor/generateTutorResponse.ts`) is the closest thing to a "smart" layer, but its
structured-output schema is `{explanation}` or `{steps}` only — `additionalProperties: false`, so it
*cannot* return a misconception tag today even if prompted to. It also never sees the student's actual
wrong answer (by deliberate design, to keep the prompt-injection surface minimal) — it only reasons from
the problem + reference solution.

### Phase 1 slice (implemented)

Without a schema change, without touching any marking logic, and using 100% already-authored content:
`commonMistakes` (lesson-level `{mistake, fix}` pairs) now renders **at the moment a practice question is
marked incorrect** in `LessonRenderer.tsx`'s `PracticeCard`, in addition to (not instead of) its existing
appearance in the static Learn stage. This applies to guided practice, independent practice, extension
practice, and the post-mastery-quiz Level 6 challenge questions.

Deliberately **out of scope for Phase 1**:

- The mastery quiz itself (`QuizQuestion`) — `docs/FEEDBACK_AND_HINTS_STANDARD.md` explicitly documents
  "the mastery quiz has no hint ladder — students are assessed without scaffolding," and this change
  respects that design intent.
- `MultiPartPracticeCard` — multi-part questions already reveal the correct answer + explanation inline
  per part on a wrong attempt, so they're not the weakest link. A `commonMistakes` prop was still threaded
  through the outer `PracticeCard` call sites so this is a small, obvious Phase 2 follow-up rather than a
  new investigation.
- Any per-distractor / per-question misconception matching — the data model doesn't support it yet (see
  §3). Phase 1 shows the lesson's full mistake list, not a targeted single mistake.

---

## 6. Nova vs Mathspace — capability comparison

| Capability | Mathspace | Nova today | Nova after Phase 1 |
|---|---|---|---|
| Topic-level mastery tracking | ✅ | ✅ | ✅ |
| Subtopic/skill-level mastery tracking | ✅ (primary signal) | ✅ data exists, secondary only | ✅ primary signal for study-plan recommendation |
| Diagnostic seeds subtopic mastery | ✅ | ❌ | ❌ (Phase 2) |
| Misconception-tagged wrong-answer feedback | ✅ | ❌ | ⚠️ lesson-level, contextual (not per-distractor) |
| Item-level adaptive difficulty within an attempt | ✅ | ❌ (worksheets picked up-front) | ❌ (Phase 3) |
| Time-decay / forgetting-curve mastery | ✅ | ❌ | ❌ (Phase 3) |
| Teacher/tutor report drilling into sub-skills | ✅ | ⚠️ exists, secondary table, click-to-expand | ⚠️ unchanged (reason text now subtopic-aware) |
| All major assessments feed the mastery model | ✅ | ❌ (static Paper 1 exams don't) | ❌ (Phase 2) |
| AI tutor reacts to the student's actual mistake | ✅ (implicit via adaptivity) | ❌ (never sees student's answer) | ❌ (Phase 3 — deliberate safety scope change) |

Nova's genuine strengths Mathspace doesn't match for this market: HSC-specific exam-band prediction
(`lib/exams/scoreExam.ts` `predictExamBand`), CAS-backed symbolic answer marking, and an AI proof marker
for induction/short-explanation questions. The gap is specifically in the *adaptive/diagnostic loop*, not
in exam-readiness content.

---

## 7. Roadmap

### Phase 1 — implemented in this change (surgical, no migration, no new deps)

- [x] `generateStudyPlan()` becomes subtopic-aware (`lib/studyPlans/generateStudyPlan.ts`)
- [x] Dashboard "Your Study Plan" → **"Today's Study Plan"**, shows weakest subtopic
      (`app/dashboard/page.tsx`)
- [x] Admin "Recommended next action" reuses the same subtopic-aware reason text
      (`app/admin/students/[id]/page.tsx`)
- [x] `commonMistakes` surfaces on a wrong practice answer, not just upfront
      (`app/course/LessonRenderer.tsx`)

### Phase 2 — next (small, additive, no architecture change)

1. **Wire diagnostics into subtopic mastery.** Add `subtopicSlug` to the live `DiagnosticQuestion` type
   (`lib/diagnostics/types.ts`) and stop hardcoding `subtopicSlug: null` in
   `app/api/mastery/diagnostic/route.ts`. Lights up the earliest, highest-volume signal for the
   already-built pipeline. Content authoring (tagging existing questions) can land incrementally, unit by
   unit — the route change is safe to ship before full coverage exists.
2. **Feed static Paper 1 exams into the mastery model.** Extend the existing
   `if (topicTest) { recordMasteryEvents(...) }` branch in `app/api/exam/[examId]/submit/route.ts` to also
   fire for static-paper submissions. Reuses existing wiring; the gap today is that the exams most
   students actually sit are a mastery dead-end.
3. **Consolidate the three independent "weakest topic" queries** (`generateStudyPlan`,
   `lib/dailyReviewQueue.ts`, `lib/digest/computeDigestData.ts`) onto one shared subtopic-aware source of
   truth so the dashboard, admin page, and parent digest can't disagree about the same student.
4. **Surface the AI proof-marker's verdict instead of discarding it.** In
   `app/api/worksheet/[token]/answer/route.ts`, the AI-marker fallback currently only flips
   `isCorrect`; return its `feedbackOptions`/reasoning to the student. Additive, no schema change, still
   env-gated off (`PROOF_MARKER_ENABLED` + `ANTHROPIC_API_KEY`).
5. **Extend the AI tutor's schema with an optional `likelyMisconception` field**, grounded only in the
   problem + reference solution (no new student-input plumbing, preserving the current
   never-sees-free-text-input safety design). Log it on the existing `ai_help_requested` analytics event.
6. **Extend `MultiPartPracticeCard`** with the same contextual `commonMistakes` treatment Phase 1 added to
   `PracticeCard` (the prop is already threaded through the parent call sites).

### Phase 3 — larger, needs explicit product sign-off before starting

1. **Real misconception taxonomy.** A shared vocabulary/table connecting diagnostic
   `targetMisconception`, lesson `commonMistakes`, and a new per-distractor tag on `Choice`. Requires
   capturing the student's actual submitted answer/chosen distractor on `mastery_events` (schema change)
   so misconception frequency becomes queryable and reportable, not just displayable.
2. **Time-decay / forgetting-curve mastery scoring** — an old high score should soften over time, not sit
   at 100 forever until touched.
3. **Item-level adaptive difficulty within a single attempt** — worksheets/exams currently pick all
   questions up front; a true adaptive engine adjusts mid-attempt based on running performance.
4. **AI tutor consumes the student's actual wrong answer** to name a misconception genuinely diagnostic of
   *that* student's error, not just "generic mistake for this problem type." Deliberate safety-scope
   change — apply the same injection-hardening discipline already used in `lib/proofMarker/markProofWithAi.ts`.
5. **Unified tutor "session prep" view** on the admin student page — today a tutor manually stitches
   together six separate sections to decide what to cover; Phase 3 could synthesize a ranked, reasoned
   agenda from the same data.

---

## 8. What changed in this PR (Phase 1)

| File | Change |
|---|---|
| `lib/studyPlans/generateStudyPlan.ts` | New optional `subtopicRows`/`subtopicLabels` input; new `weakestSubtopic` field on each recommendation; `buildReason()` calls out the weakest subtopic when it's meaningfully worse than the unit average |
| `app/dashboard/page.tsx` | Passes `subtopicMasteryRows`/`subtopicLabelMap` into `generateStudyPlan`; card heading renamed "Your Study Plan" → "Today's Study Plan"; new "Weakest area" line on the Next Topic tile |
| `app/admin/students/[id]/page.tsx` | Passes `subtopicMasteryRows` into `generateStudyPlan` so the "Recommended next action" reason text is subtopic-aware for tutors too |
| `app/course/LessonRenderer.tsx` | `PracticeCard` accepts an optional `commonMistakes` prop; renders it on an incorrect answer; wired at all 5 `PracticeCard` call sites (guided practice, core/extra independent practice, multi-part practice, Level 6 challenge) |

No database migration, no new dependency, no change to any existing function's required parameters, no
change to student-facing flows other than the two additive UI surfaces above.

## 9. What's next

Start Phase 2 with item 1 (diagnostic subtopic wiring) — it's the cheapest change with the widest
downstream effect, since every other subtopic-aware surface in the app (including Phase 1's own study
plan) currently gets zero signal from diagnostics.
