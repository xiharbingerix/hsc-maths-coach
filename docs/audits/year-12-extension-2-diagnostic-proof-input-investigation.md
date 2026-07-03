# Year 12 Extension 2 Diagnostic: Proof/Input Investigation

Date: 2026-06-26

## Scope

Review the current `year-12-extension-2` diagnostic against:

- student feedback that the "harder" set feels too straightforward
- `docs/QUESTION_AUTHORING_STANDARD.md`
- the existing AI proof-marking stack
- the current answer-input system, especially the use of MathLive for typed maths

This document is about the **diagnostic** and the **platform constraints around harder proof-style answers**, not the whole Ext 2 course.

---

## Short verdict

The student feedback is valid.

The current Year 12 Extension 2 diagnostic is clean, mathematically correct, and diagnostic in the narrow MCQ sense, but it is **not yet a true high-ceiling Ext 2 diagnostic**.

Two things are happening at once:

1. The current items are constrained by the diagnostic runner to **multiple-choice only**, which forces proof-heavy Ext 2 content into recognition tasks rather than construction tasks.
2. The repo already has a **working AI proof marker** and precedent for `responseType: "proof"` in topic tests, but that pathway is not wired into diagnostics and is currently designed for **authenticated** flows, not the public trial/onboarding diagnostic.

So the issue is not just question writing. It is also a product and infrastructure gap.

---

## What the authoring standard says

Relevant constraints from `docs/QUESTION_AUTHORING_STANDARD.md`:

- Questions should create meaningful evidence of understanding.
- D5 should require novel reasoning, synthesis, modelling, optimisation, abstraction, or proof-like reasoning.
- A question should identify a clear misconception.
- Open-ended items should not be used unless the marking model explicitly supports them.
- Free-text proof/justification is currently blocked in standard auto-marked flows unless a dedicated marking path exists.

That last point matters most here: the standard is already warning us that Ext 2 proof content will otherwise get flattened into safe but lower-value formats.

---

## Current Ext 2 diagnostic: findings

File reviewed: `lib/diagnostics/year-12-extension-2.ts`

### 1. The set is safe, but several items are too procedural for a "harder" Ext 2 diagnostic

The following items are mathematically fine but cognitively lighter than the file claims:

- `y12e2-d5-demoivre-power`
- `y12e2-d5-vector-speed-derivative`
- `y12e2-d5-integral-arctan-form`
- `y12e2-d5-integral-partial-fractions`
- `y12e2-d5-mechanics-shm-period`

These are mostly strong D3/D4 transfer checks, not convincing D5 ceiling items.

### 2. The proof items test proof recognition, not proof production

- `y12e2-d5-proof-inequality-start`
- `y12e2-d5-proof-contradiction-point`

These are useful diagnostic questions, but they assess whether a student can **identify** a valid proof step, not whether they can **construct** one. For Ext 2, that distinction matters.

### 3. The diagnostic currently over-relies on MCQ recognition

Every item is multiple-choice because `DiagnosticQuizClient` only supports MCQ.

That creates a ceiling problem:

- proof becomes "spot the right opening step"
- mechanics becomes "pick the right formula"
- complex numbers becomes "recognise the locus"

That is still diagnostic, but it is not the best available signal for a top-end Ext 2 student.

### 4. The file passes the repo's current pilot test, but the test is not strong enough

`lib/diagnostics/diagnostics.test.ts` currently enforces:

- 10 questions
- difficulty 5
- target misconception present
- each question assesses at least 2 units

That is good baseline hygiene, but it does **not** verify that the authored task is genuinely D5 in the authoring-standard sense. A procedural MCQ can still satisfy the current test.

---

## Existing platform capability: better than it looks

The repo already contains a conservative AI proof-marking path:

- marker: `lib/proofMarker/markProofWithAi.ts`
- endpoint: `app/api/mark-proof/route.ts`
- exam/topic-test use: `lib/exams/types.ts`, `lib/exams/scoreExam.ts`
- proof-gated pool precedent: `lib/topicTests/pools/year-12-extension-1/*`

Important properties:

- binary verdict only: `{ correct: boolean }`
- grades against an authored `modelSolution`
- no model-generated feedback reaches the student
- off by default unless `ANTHROPIC_API_KEY` and `PROOF_MARKER_ENABLED=true`
- rate-limited
- currently requires a logged-in user

This is exactly the kind of bounded AI use that makes sense for proof diagnostics.

---

## Existing platform constraint: the public diagnostic cannot just reuse it as-is

The current onboarding diagnostic is public and conversion-oriented.

The proof marker route currently assumes:

- authenticated user
- bearer token
- server-side rate limiting by user id

That means we should **not** directly bolt proof marking onto the public trial diagnostic without a separate abuse/cost strategy.

This is the most important product constraint in the whole investigation.

---

## Input-system finding

Current symbolic input component:

- `app/components/MathAnswerInput.tsx`
- uses MathLive `<math-field>`
- good for equations, fractions, powers, symbolic answers
- bad fit for paragraph or sentence-level responses

This matches the user report.

For proofs, MathLive should **not** be the primary input surface.

The repo already has normal textareas in multiple places, including the older diagnostic page and `ExamRunner`. So the missing piece is not a generic text box. The missing piece is a **proof-specific response component**.

---

## Recommended product direction

## Recommendation A: make Ext 2 a hybrid diagnostic, not an all-MCQ diagnostic

Best path:

- 8 focused MCQ / short-answer diagnostics
- 2 proof-capable long-answer items

Why:

- keeps completion time and onboarding momentum reasonable
- preserves broad coverage
- introduces actual high-ceiling evidence where Ext 2 most needs it

The proof-capable items should be used only where the extra signal is worth it:

- proof by contradiction / contrapositive / induction
- vector proof structure
- calculus justification where a complete argument matters

This is better than making all 10 open response, and better than leaving all 10 as MCQ.

## Recommendation B: do not use MathLive as the main proof input

For proof items, use a new `ProofAnswerInput` / `LongAnswerInput` style component:

- primary field: plain textarea for sentences
- optional inline maths helper:
  - simple symbol buttons, or
  - a small "insert maths line" field powered by `MathAnswerInput`
- store the final submission as plain text with embedded maths snippets

That gives students a natural way to write:

`Assume sqrt(2)=p/q in lowest terms. Then 2q^2=p^2, so p is even...`

without forcing them to fight a math field for every word.

## Recommendation C: split public-diagnostic proof marking from logged-in proof marking

Two safe rollout options:

### Option 1: logged-in-only proof diagnostics first

Use proof-capable items in:

- topic tests
- worksheets
- later, saved student diagnostics

Keep the public trial diagnostic MCQ-only for now.

Pros:

- fastest
- lowest abuse/cost risk
- reuses current auth assumptions

Cons:

- Ext 2 onboarding diagnostic still has the current ceiling problem

### Product decision: no anonymous proof marking

Anonymous/public proof marking should not be shipped.

Reason:

- tokens can be burned indefinitely
- model cost would be exposed without reliable commercial upside
- abuse-hardening would add complexity to a feature that is better positioned as a retained-value tool for signed-in students

Decision:

- proof-capable AI marking is **authenticated only**
- usage should be **gated and rate-limited**
- public diagnostics stay non-AI

This is now the recommended and preferred path.

---

## Recommended Ext 2 content changes

Even before long-answer support, the MCQ portion can be improved.

### Keep

- `complex-locus-bisector`
- `skew-lines`
- `mechanics-acceleration-form`

These are properly diagnostic and expose real misconceptions.

### Rewrite or replace

- `demoivre-power`
  - too close to direct execution
  - replace with branch/argument/structure reasoning
- `integral-arctan-form`
  - useful, but too routine for this course/position
  - replace with classification/strategy selection in a less cued setting
- `integral-partial-fractions`
  - same issue
- `mechanics-shm-period`
  - correct but very standard
- at least one proof-recognition item
  - replace with an actual constructed proof response

### Better Ext 2 diagnostic mix

- 3 complex/vector/calculus transfer MCQs
- 3 modelling/structure MCQs
- 2 "choose the valid route" proof-strategy items
- 2 constructed proof responses

That would feel much more like Ext 2 while still being diagnostic.

---

## Suggested proof-response design

### Data model

Diagnostics currently only support:

- prompt
- choices
- correctAnswer

To support proof items, diagnostics need a richer question union, similar to the exam model:

- `responseType?: "mcq" | "typed" | "proof"`
- `modelSolution?: string`
- `answer?: string`
- `acceptedAnswers?: string[]`

For proof items:

- no `choices`
- `responseType: "proof"`
- `modelSolution` required

### UI behaviour

- MCQ: current flow unchanged
- typed maths: current `MathAnswerInput`
- proof: textarea-first input with optional maths helper

### Marking behaviour

- MCQ: exact choice match
- typed: existing CAS / symbolic marker if later needed
- proof: AI binary marker only

### Results behaviour

Keep it conservative:

- correct / not yet shown
- show authored explanation after submission
- do not show model-generated prose

That stays aligned with the existing proof-marker safety design.

---

## Rollout plan

### Phase 1: content-only uplift

- strengthen the current Ext 2 MCQs
- replace the weakest procedural items
- keep the diagnostic all-MCQ for now

### Phase 2: proof-capable logged-in flows

- reuse existing `responseType: "proof"` pathway in topic tests / worksheets
- add a purpose-built proof input component instead of MathLive-only input

### Phase 3: proof-capable diagnostics

- extend diagnostic schema and runner to support `proof`
- ship for authenticated diagnostics first

### Phase 4: authenticated proof diagnostics at controlled scale

- add quota / entitlement checks on proof-marked submissions
- monitor cost, usage, and marking quality before broadening access inside signed-in flows

---

## Final recommendation

For Ext 2, I would not keep treating the diagnostic as a pure MCQ artifact.

The best medium-term design is:

- a **hybrid diagnostic**
- with a **textarea-first proof input**
- and the existing **binary AI proof marker**
- rolled out to logged-in flows first, then public diagnostics only if the funnel value is worth the engineering/cost hardening

That gives us harder questions in a way that is actually faithful to Ext 2, instead of just making MCQs look more advanced.
