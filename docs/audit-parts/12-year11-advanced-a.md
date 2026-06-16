# Audit — Year 11 Advanced (Part A)

Files audited (all gradeable questions in `guidedPractice`, `independentPractice`,
`masteryQuiz`, and `multiPartPractice`, with resolved factory output):

- `introductionDifferentiation.ts`
- `trigonometryMeasureAngles.ts`
- `trigIdentitiesEquations.ts`
- `sequencesSeries.ts`

Factory helpers reviewed first in each file:
- **introductionDifferentiation.ts** — local `formulaAnswer` wraps `baseFormulaAnswer` and auto-adds
  interval/coordinate/classification accepted-form variants (`x>1` → `1<x`, `(1,\infty)`, etc.;
  `(-1,2)` → `x=-1,y=-2`, etc.; `local maximum` → `local max/maximum/max`) plus a topic-routed
  `differentiationFeedback` explanation. `practicalChoice` from `questionHelpers`.
- **trigonometryMeasureAngles.ts** — local `formulaAnswer` adds `numericFormatVariants` (integer `n` →
  `n.0`) and an ID-keyed explanation table; `qa` is an inline short-answer builder; `practicalChoice`.
- **trigIdentitiesEquations.ts** — `formulaAnswer`/`exactAnswer` add `numericFormatVariants`;
  `trigExpressionVariants` (`-cosx` → `-cos(x)`, `-\cosx`, `-\cos x`, `-\cos(x)`), `piVariants`
  (`pi/6` → `\pi/6`, `π/6`), `solutionSetVariants`, `conceptChoice`.
- **sequencesSeries.ts** — `sequenceAnswer` adds `safeSequenceAnswerVariants` (e.g. `d=`, `r=`, `a=`,
  `n=`, `Xth`, `X.0`, spaced fraction) and a routed `sequenceFeedback`; `sequenceChoice`.

Runtime marking (`lib/answerMarking.ts`): auto-equates int/decimal⇔fraction, %, coordinates, ratios,
units, `x²`⇔`x^2`, `min/max` words, leading `var =`. Does NOT auto-equate factored⇔expanded algebra,
reordered expressions, surd text (`√`/`sqrt`), or order-differing solution sets — these were checked
against each question's accepted-answer list.

## introductionDifferentiation.ts

Every gradeable answer recomputed and confirmed correct (rates of change, first principles, power
rule, tangents/normals, curve features, chain rule, stationary points, second-derivative/concavity,
product rule, quotient rule, and all `multiPartPractice`). Spot checks of the load-bearing items:
`-id-tn-i4` normal at (2,4) on y=x²: m=−1/4, y−4=−¼(x−2) → y=−¼x+9/2 ✓; `-id-poly-i5` y'(4) for
x²−6x+5 = 2 ✓; `-pr-mp1c`/`-qr-mp1c` evaluations 9 and −3 ✓.

- [P2] `differentiating-polynomial-functions`::y11adv-id-poly-i1 — derivative `8x^3-6x+1` is marked by
  exact normalized string only (semanticMatch does not parse multi-term polynomials). Accepted set is
  `["dy/dx=8x^3-6x+1", "\frac{dy}{dx}=8x^3-6x+1"]`; a student answering `1-6x+8x^3` (re-ordered) is
  rejected. Low-impact (conventional order is highest-power-first), noted for completeness. Same
  pattern across all polynomial-derivative typed answers in this lesson and `-id-exam-*`.
- [P2] `chain-rule-basics`::y11adv-chain-g3 — answer `4x(x^2+2)`; the equivalent expanded form
  `4x^3+8x` is a reasonable correct response and is NOT auto-normalized (factored⇔expanded). Accepted
  set only lists the factored spacing variants. Proposed: add `4x^3+8x`. Same gap (clean monomial×
  linear-bracket case) at `-chain-i5` `12x(3x^2-1)` (= `36x^3-12x`). The `(...)^2`/`(...)^3` answers
  (`-chain-i2/m2/m6/m9`) are conventionally left factored, so lower priority.

No P1, P3, or P4 issues. MCQ keys, distractors, hints, explanations, and the `cartesian/triangle`
diagram fields all checked and consistent with the stated functions.

## trigonometryMeasureAngles.ts

All gradeable answers recomputed and confirmed (degree⇔radian conversions, exact special-angle
values, arc length `s=rθ`, sector area `A=½r²θ`, perimeter, unit-circle coordinates, ASTC/reference
angles in all quadrants, amplitude/period/phase/vertical-shift of `a·sin(bx+c)+d`, right-angle-trig
applications and bearings, sine/cosine rule + area + ambiguous case, and all `multiPartPractice`).
Spot checks: `-sector-mp1` (s=6π, A=27π, P=18+6π) ✓; `-rat-mp2` (5√2≈7.07, 045°, back bearing 225°)
✓; `-nra-mp1c` sinA=6/10=0.6 ✓; `-amb-*` threshold/2-triangle logic ✓.

- [P2] `unit-circle-all-quadrants`::y11adv-ucq-m2 (and m6, m7, m9) — negative surd answers such as
  `-sqrt(3)/2` accept `["-\sqrt{3}/2", "-(√3)/2"]`. A student typing the natural `-√3/2` matches
  `-(√3)/2`? No — that variant has parentheses; bare `-√3/2` is not listed and `√` is not normalized
  to `sqrt`. The canonical `-sqrt(3)/2` is accepted, so impact is limited to surd-input format. Same
  surd-format consideration applies broadly to `-ev-*`, `-ucv-*`, `-ucq-*` answers; treat as a
  systemic input-format note, not a per-question defect.

No P1, P3, or P4 issues. The `-rat-i5` (SE = 135°), `-rat-m7` (N60°W = 300°), `-trig-exam-p3`
(max=−1+4=3) items and all transformed-graph features verified.

## trigIdentitiesEquations.ts

All gradeable answers recomputed and confirmed (related-angle identities, basic and advanced trig
equations with reference angle + ASTC + period, identity simplification, reciprocal ratios
sec/csc/cot + the sec²=1+tan² / csc²=1+cot² identities, complementary identities, and all
`multiPartPractice`). Spot checks: `-relang-i5` tan(3π/4)=−1 ✓; `-trigeq-adv-i5` larger deg solution
225 ✓; `-sec-m9` sec²(45°)=2 ✓; `-cai-mp2` (1/2, √3/2, sum 1) ✓.

- [P4] `trig-equations-advanced` teaching `latexBlocks` (not graded, line 463) — the literal is
  `"2\\cos^2x-\cos x-1=0\\Rightarrow ..."`: the middle term uses a single backslash `-\cos` instead of
  `-\\cos`. `\c` is not a valid JS string escape, so it collapses to `c`; the rendered LaTeX is
  `2\cos^2x-cos x-1=0`, i.e. the middle `\cos` loses its operator formatting and renders as upright
  literal "cos x". Students see this teaching block. Cosmetic. Proposed: `2\\cos^2x-\\cos x-1=0`.
- [P2] `complementary-angle-identities`::y11adv-cai-mp1 / part a — hand-written `acceptedAnswers`
  include `"\\cosx"` (missing space → invalid LaTeX) but the valid forms (`cosx`, `cos x`, `cos(x)`,
  `\cos x`) are also present, so a correct answer is still accepted; the malformed entry is harmless.
  Noted only as a data-hygiene item.

No P1 or P3 issues.

## sequencesSeries.ts

Every gradeable answer recomputed and confirmed across all five lessons (arithmetic/geometric nth
term, "which term", a/d/r recovery from two terms, arithmetic & geometric series sums, sigma
expansion, limiting sums with |r|<1 checks, recurring decimals, and contextual seat/savings
problems). Representative checks: `-arith-m10` T1=1 ✓; `-geo-m10` n=7 ✓; `-aseries-m6` 335 ✓;
`-aseries-m10` weekly increase d=5 ✓; `-gseries-m8` a=12,r=−½ → S∞=8 ✓; `-gseries-m10` r=2/5 ✓;
`-exam-m3` 351 ✓; `-exam-i4` 64/3 ✓. Fraction answers (`2/5`,`27/2`,`4/9`,`64/3`) are either
auto-equated to their decimals by the marker or have the decimal listed; no gap. Worked examples
(incl. the `8+11+…+50` sum = 435 and the fall-through hall example = 335) all arithmetic-correct.

No issues found.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| introductionDifferentiation.ts | 0 | 2 | 0 | 0 |
| trigonometryMeasureAngles.ts | 0 | 1 | 0 | 0 |
| trigIdentitiesEquations.ts | 0 | 1 | 0 | 1 |
| sequencesSeries.ts | 0 | 0 | 0 | 0 |
| **Total** | **0** | **4** | **0** | **1** |

**P1 list:** none.

All four files are mathematically correct on every gradeable answer, hint, explanation, MCQ key, and
multi-part deliverable. The only findings are low-impact accepted-answer-form P2s (factored⇔expanded
chain-rule derivatives; surd-input format; a harmless malformed-but-redundant accepted entry) and one
cosmetic P4 in a non-graded teaching block.
