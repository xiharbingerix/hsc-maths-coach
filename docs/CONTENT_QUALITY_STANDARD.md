# Content Quality Standard — the Band 6 Definition of Done

**This is the master gate for every lesson in Nova Maths. Read it before authoring or editing any lesson content. A lesson is not "done" — and must not be marked ✅ in `COURSE_STRUCTURE_CHECKLIST.md` — until it passes every gate below.**

The purpose of this platform is to make a top band the *expected* outcome, not a lucky one. For Stage 6 (Year 11–12) that means a **Band 6** in HSC Mathematics; for earlier stages it means the equivalent top achievement level. We do this by being so complete in breadth, so deep and conceptual in the teaching, and so high in practice quality that a student who works through a unit is left with no gap an exam could exploit.

"Good enough to pass" is a failure against this standard. The bar is: **as deep and conceptual as the strongest student could possibly require — and never deeper in jargon than the weakest capable student can follow.**

---

## The three gates

A lesson passes only if it clears **all three**. They are non-negotiable and apply per lesson.

### Gate 1 — Breadth (full syllabus coverage, no holes)

- Every lesson maps to a real NSW syllabus focus area via `moduleSlug`, and that `moduleSlug` is wired into the live route (`lib/year12AdvancedRoutes.ts` or the relevant course registry). **A unit declared in the catalog with zero wired lessons is a correctness bug, not a "coming soon."**
- Across the unit, **every syllabus dot-point in the Content section is covered by at least one lesson.** Coverage is verified dot-by-dot against [curriculum.nsw.edu.au](https://curriculum.nsw.edu.au), not assumed.
- Content sits under the **correct** syllabus code. Content delivered under the wrong unit (e.g. discrete distributions taught under the normal-distribution unit, or graphing content filed under the wrong trig code) is a breadth failure even if the words exist somewhere.
- Do not silently include above-syllabus material *in place of* required content. Enrichment beyond the syllabus is allowed, but only **after** the syllabus dot-points for that band are fully and correctly covered, and it must be labelled as extension.
- Marking a unit ✅ "100%" in the checklist requires a dot-point table showing each syllabus dot-point → the lesson that covers it. No table, no ✅.

### Gate 2 — Teaching depth (conceptual, derived, Feynman-complete)

Governed in full by **[FEYNMAN_TEACHING_STANDARD.md](./FEYNMAN_TEACHING_STANDARD.md)**. The non-negotiables:

- **Derive, don't drop.** Every formula or rule the lesson uses is either derived, or motivated from a concrete model the student can see — never asserted cold. ("The z-score formula is `z=(x−x̄)/s`" is a failure. *Why* subtracting the mean re-centres and *why* dividing by `s` makes distributions comparable is the lesson.)
- **Intuition before notation.** A plain-language, concrete-model explanation of the idea comes before the symbols, every time.
- **Build the "why it works."** A Band 6 student can justify and apply a method in an unfamiliar context. The teaching must explain *why* the method is valid, not just the steps to execute it.
- **Connect representations.** Where relevant, link algebra ↔ graph ↔ context ↔ numerical, explicitly. Attach the real diagram (never fake a visual in LaTeX).
- **Dissolve misconceptions in the narrative**, not only in the `commonMistakes` list. Name the trap at the moment it would occur and explain why the correct path is correct.
- **Length is governed by understanding, not by a word budget.** Remove filler ruthlessly; never truncate the conceptual development to hit a length target. Go exactly as deep as the concept requires.

### Gate 3 — Practice depth (the Band 6 engine)

Governed in full by **[PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md)**. The non-negotiables for **Stage 6 (Year 11–12)** lessons:

- The standard 19-question spine: **4 guided + 5 independent + 10 mastery**, each auto-markable, covering every success criterion.
- **`masteryQuizPool` is required** — a difficulty-ramped pool (target ~30–40 items) the mastery quiz draws a fresh ramped set from each attempt. A fixed 10-question mastery quiz with no pool does not pass for Stage 6.
- **`multiPartPractice` is required** — at least one HSC Section II-style multi-part question (shared stem, 2–4 dependent parts, marks-weighted). This is where Band 5 separates from Band 6; a lesson without it is incomplete.
- **Real Band-6 difficulty is present**: the top of the mastery pool and the multi-part items include genuinely demanding, multi-step, *unfamiliar-context* problems at the level of the hardest exam questions for that topic — not just harder arithmetic on the same template.
- Distractors are the errors students actually make; explanations teach, not just confirm.

(For Stage 4–5 the pool and multi-part items are *strongly recommended* but the breadth and teaching-depth gates apply identically.)

---

## Definition of Done checklist (paste into the PR / task)

```
BREADTH
[ ] moduleSlug maps to a real NSW focus area and is wired into the live route
[ ] Every syllabus dot-point in the unit is covered by a lesson (dot-point table done)
[ ] Content is under the correct syllabus code (no misfiled content)
[ ] Any above-syllabus content is labelled extension, and added only after core coverage

TEACHING DEPTH (per FEYNMAN_TEACHING_STANDARD)
[ ] Every formula is derived or motivated from a concrete model — none dropped cold
[ ] Plain-language intuition precedes notation
[ ] The "why it works" is explained, enabling transfer to unfamiliar problems
[ ] Representations connected; real diagrams attached where visual
[ ] Misconceptions dissolved in the teaching narrative, not only listed
[ ] No filler; depth not truncated to hit a length target

PRACTICE DEPTH (per PRACTICE_QUESTION_STANDARD)
[ ] 4 guided + 5 independent + 10 mastery, all auto-markable, all success criteria covered
[ ] masteryQuizPool present (~30–40, difficulty-ramped)         [Stage 6: required]
[ ] multiPartPractice present (≥1 HSC Section II-style item)     [Stage 6: required]
[ ] Genuine Band-6 / unfamiliar-context difficulty at the top end
[ ] Misconception-targeting distractors; teaching explanations

FEEDBACK (per FEEDBACK_AND_HINTS_STANDARD)
[ ] Hints nudge, explanations teach, common mistakes name the specific misconception
```

A lesson that misses any required box is **not done**, regardless of how polished the parts it does have are. Do not mark the unit complete, and do not report it as complete, until every required box is ticked.

---

## Standards map

| Concern | Authoritative doc |
|---|---|
| **This gate / Definition of Done** | CONTENT_QUALITY_STANDARD.md (you are here) |
| Syllabus breadth + per-unit coverage tracking | [COURSE_STRUCTURE_CHECKLIST.md](./COURSE_STRUCTURE_CHECKLIST.md) |
| Teaching depth (`teaching`, `workedExamples`) | [FEYNMAN_TEACHING_STANDARD.md](./FEYNMAN_TEACHING_STANDARD.md) |
| Practice structure + pools + multi-part | [PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md) |
| Field/format rules + visual payloads | [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md) |
| Hints, explanations, common mistakes | [FEEDBACK_AND_HINTS_STANDARD.md](./FEEDBACK_AND_HINTS_STANDARD.md) |
| External JSON batch format | [QUESTION-BATCH-IMPORT.md](./QUESTION-BATCH-IMPORT.md) |
