# Audit Part 05 — Trigonometry

Scope: every gradeable question (guidedPractice / independentPractice / masteryQuiz)
in the two assigned source files, plus their factory/helper functions. There are no
`multiPartPractice`/`parts`/`steps` gradeable structures in either file — all practice
questions are atomic single-answer or MCQ items.

Helpers read and resolved before auditing:
- `trigonometricFunctionsGraphs.ts` — no factory functions; all questions are object literals.
- `furtherTrigonometry.ts` — `trigChoice(...)` builds 4-option MCQs; `trigNumber(...)`
  builds short-answer items (defined but **not used** in this file); `furtherTrigLesson(...)`
  assembles the lesson. `trigChoice` routes each choice through
  `formatChoiceText` (from `questionHelpers.ts`). Every `trigChoice` choice string in this
  file already contains `$...$`, so `formatChoiceText` returns it verbatim — choices render
  exactly as written. The resolved `answer` is the labelled letter; `hint` defaults to
  "Choose the identity first…"; `explanation` is the passed string. All evaluated on the
  resolved question.

## lib/lessons/trigonometricFunctionsGraphs.ts

Seven lessons audited:
`radians-exact-values-unit-circle`, `graphs-sine-cosine-tangent`,
`amplitude-period-phase-vertical-shift`, `trigonometric-equations`,
`trigonometric-identities-simplification`, `modelling-periodic-phenomena`,
`mixed-trigonometric-functions-exam-practice`.

All gradeable `answer`, `acceptedAnswers`, `hint`, and `explanation` values were
independently recomputed and confirmed correct and mutually consistent. Representative
verifications:

- `radians-ind-1`: 225° = 225π/180 = 5π/4. Correct (accepted `5\pi/4`, `5π/4`).
- `radians-mastery-8`: tan(5π/4) — QIII, sin<0, cos<0, ratio >0 → positive (A). Correct.
- `trig-eq-mastery-7/8`: tan x = −1 on [0,2π] → 3π/4 (QII), 7π/4 (QIV). Smaller 3π/4, larger 7π/4. Correct.
- `trig-eq-mastery-9`: 2cos x−1=0 → cos x = 1/2 → x = π/3, 5π/3 (B). Correct.
- `amp-mastery-9`: y=2sin(2(x−π/3))−1 → amp 2, period 2π/2=π, phase right π/3 (C). Correct.
- `amp-ind-5`: y=−3cos(2x)+1 → amp 3, period π, midline y=1 (A). Correct; distractor B uses amplitude −3 (rejected correctly).
- `model-ind-5`: max = 2.4 + 1.5 = 3.9. Correct (accepted with `m`/`metres`/`meters`).
- `mixed-trig-mastery-8`: min = 2.4 − 1.5 = 0.9. Correct.

Marking-rule cross-checks (no accepted-form gaps found):
- Midline items (`amp-guided-3`, `amp-mastery-4/5`, `model-guided-2`, `model-mastery-2`)
  give both `y=d`/`h=d` and bare `d` forms; the runtime also strips a leading `variable =`
  prefix, so all reasonable forms mark correctly.
- Range items (`trig-graphs-guided-3`, `trig-graphs-mastery-2`) accept `[-1,1]`,
  `-1<=y<=1`, `-1≤y≤1`, `-1 to 1` — covers the realistic typed forms.
- π/fraction items consistently supply `pi/3`, `\pi/3`, `π/3` triples.
- Identity-simplification items supply `cos^2x`/`cos^2(x)`/`\cos^2x`/`\cos^2(x)` (and the
  sin and tan analogues), plus `x²`⇔`x^2` is auto-normalised.

Multi-part candidacy: none. The author has already decomposed naturally-multi-deliverable
tasks into separate atomic questions (e.g. "find the smaller solution" / "find the larger
solution" as distinct items; amplitude/midline/period/max as separate model questions). No
single prompt bundles 2+ deliverables into one answer field.

Cosmetic: no mojibake, no broken/unclosed LaTeX, no `\$` escaping, no draft wording. Worked
examples (not graded) spot-checked — sin75°, cos15°, the tide/Ferris-wheel models, and the
`h(t)=10−8cos(π/20 t)` construction are all correct.

No issues found.

## lib/lessons/furtherTrigonometry.ts

Five lessons audited:
`compound-angle-formulas`, `exact-values-compound-angles`, `double-angle-formulas`,
`further-trig-equations-identities`, `further-trigonometry-exam-practice`.

All questions are 4-option MCQs built by `trigChoice`. For every item the labelled correct
choice was confirmed correct and no distractor is also correct or numerically ambiguous.
Key numeric verifications (computed):

- sin75° = cos15° = (√6+√2)/4 ≈ 0.96593; sin15° = cos75° = (√6−√2)/4 ≈ 0.25882.
- `ftrig-exact-i2` cos75° → A=(√6−√2)/4. Correct.
- `ftrig-exact-m5` cos105° ≈ −0.25882 → D=(√2−√6)/4. Correct (A/B positive, C=−0.966; D unique).
- `ftrig-exam-m4` cos105° → A=(√2−√6)/4. Correct (unique match).
- `ftrig-exact-m9` sin105° = (√6+√2)/4 → A. Correct.
- `ftrig-exact-i5` sin165° = (√6−√2)/4 → A. Correct.
- `ftrig-exact-i3`/`ftrig-exact-m7` tan75° = 2+√3 ≈ 3.73205; `ftrig-exact-m4`/`ftrig-exam-i2` tan15° = 2−√3 ≈ 0.26795. Correct.
- Compound/double-angle identity selections (sin/cos/tan sum & difference, the three cos2A
  forms, tan2A fraction and its `1−tan²A≠0` restriction) all map to the correct labelled choice.
- Multi-value solution-set MCQs recomputed:
  - `ftrig-id-m6` cos2x=0 on [0,π] → x=π/4, 3π/4 (C). Correct.
  - `ftrig-id-i3` 2sinx cosx=0 on [0,π] → sin2x=0 → x=0, π/2, π (C). Correct.
  - `ftrig-exam-m9` 2sinx cosx=0 on [0,2π] → x=0, π/2, π, 3π/2, 2π (D). Correct.

Accepted-answer gaps: not applicable — every gradeable item is MCQ (answer is a letter),
so there are no typed-answer normalization concerns. The lesson teaching text deliberately
notes that exact surd values are delivered as multiple choice to avoid fragile typed surds;
this is consistently honoured.

Multi-part candidacy: none — all items are single-deliverable MCQs.

Cosmetic: no mojibake, no broken/unclosed LaTeX, no `\$` escaping, no draft wording. The
unused `trigNumber` helper is dead code but harmless (no quality impact).

No issues found.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| lib/lessons/trigonometricFunctionsGraphs.ts | 0 | 0 | 0 | 0 |
| lib/lessons/furtherTrigonometry.ts | 0 | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** | **0** |

### P1 list
None.

Both files are clean: every gradeable answer, accepted-answer set, hint, explanation, and
MCQ key was independently recomputed and is correct, with adequate accepted-answer coverage
and appropriate (already-decomposed) question structuring.
