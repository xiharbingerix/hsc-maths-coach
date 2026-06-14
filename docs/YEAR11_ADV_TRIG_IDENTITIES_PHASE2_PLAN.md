# Year 11 Advanced Trig Identities and Equations Phase 2 Plan

Created: 2026-06-14
Status: Phase 2 chunk implemented 2026-06-14
Course: `year-11-advanced`
Unit: `trigonometric-identities-equations`
Source: `lib/lessons/year11Advanced/trigIdentitiesEquations.ts`

## Implementation Status - 2026-06-14

Implemented in this chunk:

| Slug | Title | Standard questions | Visual payloads | Multi-part |
|---|---|---:|---|---|
| `related-angle-identities` | Related-Angle Identities | 19 | `UnitCircleDiagram` on worked examples and one mastery item | None |
| `trig-equations-basic` | Basic Trigonometric Equations | 19 | `UnitCircleDiagram` on sine/cosine worked examples | None |

Catalogue metadata added for:

- `trigonometric-equations`
- `trigonometric-identities`
- `related-angle-identities`
- `trig-equations-basic`
- `trigonometric-identities-equations-exam-practice`

`trig-equations-general-solutions` was intentionally not implemented in this chunk.

Validation snapshot:

| Check | Result |
|---|---|
| `npx.cmd tsc --noEmit` | Clean |
| `npm.cmd run build` | Clean |
| `npm.cmd run audit:lessons` | PASS, 0 fail-level issues; new lessons have 0 warnings |
| `npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run` | 999 prepared questions; new lessons seed 19 each; no Supabase writes |
| `git diff --check` | Clean; LF/CRLF working-copy notices only |

## 1. Current Unit And Lesson State

Authoritative catalogue: `lib/newCourseCatalog.ts`

| Field | Current value |
|---|---|
| Course slug | `year-11-advanced` |
| Unit slug | `trigonometric-identities-equations` |
| Unit title | `Trigonometric Identities and Equations` |
| Syllabus area | `Trigonometric functions` |
| Focus | `Trigonometric identities and equations` |

Current lesson slugs:

| Slug | Title | Current role |
|---|---|---|
| `trigonometric-equations` | Trigonometric Equations | Broad lesson: first-degree equations over a stated domain, exact values, reference angles, ASTC signs, sine/cosine period `2\pi`, tangent period `\pi` |
| `trigonometric-identities` | Trigonometric Identities | Broad lesson: Pythagorean identity, rearrangements, quotient identity, short simplification |
| `trigonometric-identities-equations-exam-practice` | Trigonometric Identities and Equations Exam Practice | Mixed practice across the two broad lessons |

Current Skill Map v2 metadata state: these three lessons currently have no `stableSkillId`, `legacySlugs`, or `skillCheckpoints` in the catalogue.

## 2. Existing Coverage

Existing `trigonometric-equations` already covers:

- isolating a sine, cosine, or tangent expression in a simple linear equation,
- exact reference angles such as `\pi/6`, `\pi/4`, `\pi/3`,
- ASTC quadrant selection,
- solution pairs in `0 <= x <= 2\pi`,
- boundary cases such as `\cos x = -1`,
- tangent period awareness.

Existing `trigonometric-identities` already covers:

- identity versus equation distinction,
- `\sin^2 x + \cos^2 x = 1`,
- `1 - \sin^2 x = \cos^2 x`,
- `1 - \cos^2 x = \sin^2 x`,
- `\tan x = \sin x / \cos x`, with `\cos x != 0`,
- short simplification such as `\tan x \cos x = \sin x`.

Adjacent prerequisite coverage in `trigonometry-measure-angles` now includes:

- `exact-trig-values-special-triangles`,
- `exact-trig-values-unit-circle`,
- `unit-circle-all-quadrants`,
- `graphing-sin-cos-tan`,
- `trig-graph-amplitude-period`,
- `trig-graph-transformations`.

This means Phase 2 can depend on exact-value fluency, quadrant signs, reference angles, and base trig graph features without re-teaching them deeply.

## 3. Gaps

| Gap | Current status | Phase 2 action |
|---|---|---|
| Related-angle identities as algebraic rules | Partly present inside `unit-circle-all-quadrants` for exact-value evaluation, not as an identities lesson | Add focused lesson `related-angle-identities` |
| General related-angle forms | Missing: `\sin(\pi - x)`, `\cos(\pi - x)`, `\tan(\pi + x)`, `\sin(2\pi - x)` as selectable identities | Add MCQ, matching, exact-value, and short-expression tasks |
| Equation solving as v2 layers | Existing broad lesson teaches this, but not split into skill checkpoints | Add new v2 lessons or migrate broad lesson to hidden legacy |
| General solution notation | Missing or very limited: `x = \alpha + 2n\pi`, `x = \alpha + n\pi`, solution families | Add `trig-equations-general-solutions` with MCQ and selected-answer strategy |
| Free-text proof risk | Existing identity lesson avoids proof, but future related-angle identities could tempt proof prompts | Explicitly prohibit proof-style marking |

## 4. Recommended Phase 2 Split

Recommended implementation chunk: add three focused v2 lessons and preserve the three existing broad slugs as legacy route-resolvable entries during the implementation pass.

Implementation should decide whether to hide and seed-skip the existing broad lessons immediately. The clean Skill Map v2 shape is:

1. Keep old slugs route-resolvable.
2. Mark `trigonometric-equations` and `trigonometric-identities` as `showInCourseNav: false` and `seedQuestions: false` only once the new lessons are implemented.
3. Keep `trigonometric-identities-equations-exam-practice` visible, then expand it later after the new lessons are seeded.

Proposed visible order:

1. `related-angle-identities`
2. `trig-equations-basic`
3. `trig-equations-general-solutions`
4. `trigonometric-identities-equations-exam-practice`

Expected standard seed volume: 3 x 19 = 57 new standard questions, before any exam-practice expansion.

## 5. Lesson Plans

### Lesson 1: `related-angle-identities`

| Field | Plan |
|---|---|
| Slug | `related-angle-identities` |
| Title | Related-Angle Identities |
| Stable skill ID | `y11adv-trig-id-related-angle-identities` |
| Learning goal | Use unit-circle symmetry to choose, simplify, and apply related-angle identities for sine, cosine, and tangent without writing free-text proofs. |
| Prerequisites | `unit-circle-all-quadrants`, `exact-trig-values-unit-circle`, existing `trigonometric-identities` ideas |
| Worked example themes | (1) Use symmetry to choose `\sin(\pi - x) = \sin x`, `\cos(\pi - x) = -\cos x`. (2) Simplify expressions such as `\cos(\pi + x)` and `\tan(2\pi - x)`. (3) Evaluate exact values using related-angle identities, such as `\sin(5\pi/6)` and `\cos(7\pi/6)`. |
| Practice question focus | MCQ identity matching, exact-value typed answers, sign-selection MCQs, short canonical expressions like `-cosx` or `sinx`. |
| Visual payload needs | `UnitCircleDiagram` would help for worked examples and early guided questions, especially symmetry across axes. Do not require a new renderer; use it only if the existing payload is already supported. |
| Accepted answer strategy | Prefer MCQ for identity selection. For typed expressions, use narrow canonical targets: `sinx`, `-sinx`, `cosx`, `-cosx`, `tanx`, `-tanx`, with accepted variants such as `sin(x)`, `\sin x`, `-cos(x)`. |
| Auto-marking risks | Symbolic equivalence is fragile. Avoid asking students to prove identities or enter long transformed expressions. Do not accept broad expression forms that require CAS equivalence. |
| Multi-part suitability | Moderate. Suitable as a 3-part fluency chain: identify quadrant sign, choose related-angle rule, evaluate an exact value. Avoid "explain why" or "prove". |

Suggested checkpoints:

- `y11adv-trig-id-related-q2-symmetry`: Choose the correct sine, cosine, or tangent identity for an angle in quadrant II.
- `y11adv-trig-id-related-q3-q4-symmetry`: Choose the correct sign for quadrant III and IV related angles.
- `y11adv-trig-id-related-simplify`: Simplify a related-angle expression to one trig function of `x`.
- `y11adv-trig-id-related-exact-values`: Evaluate exact trig values using a related-angle identity.

### Lesson 2: `trig-equations-basic`

| Field | Plan |
|---|---|
| Slug | `trig-equations-basic` |
| Title | Basic Trigonometric Equations |
| Stable skill ID | `y11adv-trig-id-trig-equations-basic` |
| Learning goal | Solve first-degree trigonometric equations in a stated interval by isolating the trig function, finding a reference angle, and selecting all valid solutions. |
| Prerequisites | `related-angle-identities`, `unit-circle-all-quadrants`, existing exact-value lessons |
| Worked example themes | (1) Solve `2\sin x - 1 = 0` on `0 <= x <= 2\pi`. (2) Solve `\cos x = -1/2` using reference angle and quadrant signs. (3) Solve `\tan x = 1` and contrast tangent period with sine/cosine. |
| Practice question focus | Isolate function value, find reference angle, choose solution pair, answer one solution at a time where typed entry is used. |
| Visual payload needs | `UnitCircleDiagram` helps for quadrant choice and reference angles. `TrigGraphDiagram` can help compare periods for sine/cosine/tangent, but it is optional. |
| Accepted answer strategy | Use MCQ for solution pairs. For typed answers, split into "smaller solution" and "larger solution" with accepted forms like `pi/6`, `\pi/6`, `5pi/6`. Avoid one answer box containing unordered pairs unless accepted variants are exhaustive. |
| Auto-marking risks | Two-solution typed answers can false-negative due ordering, separators, or spaces. Domain endpoint inclusion can cause mistakes. Tangent period can be confused with `2\pi`. |
| Multi-part suitability | Strong. Suitable MVP-safe parts: isolate trig value, state reference angle, choose/find solution pair. All parts are numeric, exact-value, or MCQ. |

Suggested checkpoints:

- `y11adv-trig-id-eq-basic-isolate`: Isolate the trigonometric function before solving.
- `y11adv-trig-id-eq-basic-reference-angle`: Find the reference angle from an exact trig value.
- `y11adv-trig-id-eq-basic-domain-solutions`: Select all solutions in `0 <= x <= 2\pi`.
- `y11adv-trig-id-eq-basic-tangent-period`: Use tangent period `\pi` when solving tangent equations.

### Lesson 3: `trig-equations-general-solutions`

| Field | Plan |
|---|---|
| Slug | `trig-equations-general-solutions` |
| Title | General Solutions of Trigonometric Equations |
| Stable skill ID | `y11adv-trig-id-trig-equations-general-solutions` |
| Learning goal | Write and select general solution families for simple sine, cosine, and tangent equations using integer parameter notation. |
| Prerequisites | `trig-equations-basic`, `graphing-sin-cos-tan`, `trig-graph-amplitude-period` |
| Worked example themes | (1) Convert interval solutions for `\sin x = 1/2` into `x = \pi/6 + 2n\pi` or `x = 5\pi/6 + 2n\pi`. (2) Use tangent period to write `x = \pi/4 + n\pi` for `\tan x = 1`. (3) Generate solutions in a larger interval from a general solution family. |
| Practice question focus | MCQ selected general solution, typed period value, typed next solution from a family, interval filtering from a given family. |
| Visual payload needs | `TrigGraphDiagram` would help show periodic repetition and tangent period markers, but should not be required. Existing graph payloads can be skipped for MVP-safe marking. |
| Accepted answer strategy | Prefer MCQ for full general-solution forms. Typed answers should ask for one component only: period, base angle, coefficient of `n\pi`, or a next numeric solution. |
| Auto-marking risks | General solution notation has many equivalent forms. `x = \pi/6 + 2n\pi`, `x = 2n\pi + \pi/6`, and `x = \pi/6 + 2\pi k` are equivalent but string-different. Avoid free typed full families except very controlled fill-in blanks. |
| Multi-part suitability | Strong if structured: (a) state period, (b) choose general solution family, (c) list solutions in a finite interval from a provided family. Avoid proof or derivation prompts. |

Suggested checkpoints:

- `y11adv-trig-id-eq-general-period`: Identify the repeating period for sine, cosine, and tangent solution families.
- `y11adv-trig-id-eq-general-select-family`: Select the correct general solution family from four options.
- `y11adv-trig-id-eq-general-interval-filter`: Generate valid solutions in a finite interval from a given family.
- `y11adv-trig-id-eq-general-error-analysis`: Identify common notation errors such as using `2n\pi` for tangent.

## 6. Marking Risk Controls

- Do not ask students to prove identities in typed/free-text form.
- Use MCQ for identity selection, general solution families, and two-solution pair recognition.
- Use typed answers only for exact values, one solution at a time, periods, reference angles, signs, or short canonical expressions.
- Keep expression answers short and canonical; include common formatting variants explicitly.
- Avoid asking for full equations or broad symbolic forms unless the expected string is tightly controlled.
- For multi-part questions, every part must be auto-markable: numeric, exact radian, MCQ, coordinate/sign/classification, or short expression.
- Do not place "explain", "justify", "show that", "prove", or "describe" in answer-required prompts.
- Use `UnitCircleDiagram` and `TrigGraphDiagram` only as support. Do not make correctness depend on a visual renderer that is not needed for the answer.

## 7. Recommended Implementation Chunk

Best next chunk:

1. Add `related-angle-identities` and `trig-equations-basic` first.
2. Add Skill Map v2 metadata for those two lessons.
3. Preserve old broad slugs during the first implementation pass.
4. Run validation and dry-run seeding.
5. Add `trig-equations-general-solutions` in the same sprint only if the first two lessons remain clean.

Reason: related-angle identities and finite-interval equation solving are highest-value and lowest-risk. General solution notation is valuable, but has the highest auto-marking risk, so MCQ-heavy authoring is essential.

## 8. Validation

Planning-file validation run:

```text
git diff --check
```

Result: clean on 2026-06-14.

Implementation validation should run:

```text
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
git diff --check
```

Expected implementation result:

- Unit visible lesson count becomes 4 to 6, depending on whether legacy broad lessons are hidden immediately.
- New standard question count increases by 38 for the first two lessons, or 57 for all three.
- No Supabase writes.
- No checkout/auth/payments/ads files touched.

## 9. Implementation Prompt

```text
Nova Maths context:
You are working in c:\Users\joshu\hsc-maths-coach.
Use local Claude/Codex.
Do not touch checkout/auth/payments/ads.
Do not write to Supabase.
Final response under 1000 words.

Task:
Implement Year 11 Advanced Trig Identities and Equations Phase 2.

Reference:
- docs/YEAR11_ADV_TRIG_IDENTITIES_PHASE2_PLAN.md
- docs/QUESTION_AUTHORING_STANDARD.md
- docs/PRACTICE_QUESTION_STANDARD.md
- docs/SKILL_MAP_V2_METADATA_CONTRACT.md
- lib/lessons/year11Advanced/trigIdentitiesEquations.ts
- lib/newCourseCatalog.ts

Before writing code:
- Read the relevant Next.js guide in node_modules/next/dist/docs/ if any Next.js API, routing, or app structure is touched.
- Inspect current lesson patterns in lib/lessons/year11Advanced/trigIdentitiesEquations.ts.

Implement only lesson/catalog content for:
1. related-angle-identities
2. trig-equations-basic
3. trig-equations-general-solutions only if the first two are clean and time allows

Do not rename or remove existing slugs. Preserve legacy route compatibility. If splitting the broad lessons now, mark old broad slugs hidden and seed-skipped only after the new replacement lessons are fully implemented.

Authoring rules:
- 4 guided + 5 independent + 10 mastery per new lesson.
- Strongly avoid free-text identity proof marking.
- Prefer MCQ, exact-value, numeric, interval, and selected-answer questions.
- Use UnitCircleDiagram or TrigGraphDiagram only where already supported and useful; do not add a new renderer in this task.
- Use MCQ for full general solution families.
- Use typed answers only for one exact value, one solution, a period, a sign/classification, or a short canonical expression.
- Include acceptedAnswers for pi forms, Unicode minus, and short trig-expression variants.
- Keep every question explanation specific and at least 40 characters.

Suggested ID prefixes:
- y11adv-relang-* for related-angle-identities
- y11adv-trigeq-basic-* for trig-equations-basic
- y11adv-trigeq-gen-* for trig-equations-general-solutions

Update lib/newCourseCatalog.ts:
- Add stableSkillId and 4 skillCheckpoints for each new lesson.
- Insert new lessons in the trigonometric-identities-equations unit before exam practice.
- Preserve existing lesson slugs as route-compatible legacy entries if hiding them.

Validate:
- npx.cmd tsc --noEmit
- npm.cmd run build
- npm.cmd run audit:lessons
- npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
- git diff --check

Output:
- files changed
- lessons added
- question counts
- validation results
- any marking risks left
```
