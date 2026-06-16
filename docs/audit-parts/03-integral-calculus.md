# Audit Part 03 — Integral Calculus, Applications of Differentiation, Differentiation Techniques, Further Integral Calculus

Auditor: NSW mathematics question-quality auditor.
Scope: every gradeable question/part/step in `guidedPractice`, `independentPractice`, `masteryQuiz`
(and there are no `multiPartPractice` arrays in these files).

## IMPORTANT structural note — masteryQuiz reassignment

In `integralCalculus.ts`, every lesson defines an inline `masteryQuiz`, but **all ten lessons have their
`masteryQuiz` reassigned at the bottom of the file** (lines 3430–3558) via
`lessonObject.masteryQuiz = [ ... ]`. The reassigned arrays are the **student-facing** ones; the inline
masteryQuiz arrays are **dead code**. This audit grades the **reassigned** masteryQuiz questions for
mastery, and the inline `guidedPractice`/`independentPractice` (which are not reassigned). Inline mastery
errors are noted as P4 (latent / not student-facing) only where they exist.

The other three files (`applicationsDifferentiation.ts`, `differentiationTechniques.ts`,
`furtherIntegralCalculus.ts`) build lessons through factory functions and do **not** reassign masteryQuiz,
so their inline arrays are live.

Helper resolution confirmed:
- `appChoice/appNumber` (applicationsDifferentiation), `choice/numeric` (differentiationTechniques),
  `intChoice/intNumber/trapNumber` (furtherIntegralCalculus), `masteryChoice/masteryTyped`
  (integralCalculus): `appNumber/numeric/intNumber/masteryTyped` set `acceptedAnswers` to the de-duped
  union of `answer` + supplied accepted forms, and auto-generate a generic explanation `"The answer is X."`
  where none is supplied.
- Marking (`answerMarking.ts`): normalises case/whitespace/unicode-minus, `x²⇔x^2`, decimal⇔fraction,
  `%`, units, leading `$`, `variable=` prefix, coordinates, ratios, clock times. Reordered algebraic terms
  and `+C` reorderings are NOT auto-equated.

---

## lib/lessons/integralCalculus.ts

Recomputed every reassigned masteryQuiz item plus every inline guided/independent item. Findings:

- [P1] definite-integrals-fundamental-theorem::definite-mastery-5 (reassigned, line 3474) — wrong answer.
  Current: `\int_{-1}^{2}(4x-1)\,dx = 0`. Proposed: `3`.
  Evidence: antiderivative `2x^2 - x`. `F(2)=2(4)-2=6`, `F(-1)=2(1)-(-1)=3`. `6 - 3 = 3`, not 0.
  (The "0" answer would only hold if the integrand were an odd function symmetric about 0; `4x-1` is not.)

- [P1] applications-total-change-motion::apps-mastery-4 (reassigned, line 3538) — wrong answer.
  Current: `\int_1^3 (6t-4)\,dt = 20`. Proposed: `16`.
  Evidence: antiderivative `3t^2 - 4t`. `F(3)=27-12=15`, `F(1)=3-4=-1`. `15-(-1)=16`, not 20.

- [P1] trapezoidal-rule-area-approximation::trap-mastery-5 (reassigned, line 3513) — wrong answer.
  Current: `y=x^2+1, 0\le x\le3, h=1, y:1,2,5,10 ⇒ 14`. Proposed: `12.5` (i.e. `25/2`).
  Evidence: trapezoidal rule with 4 ordinates `T=\frac{h}{2}[y_0+2y_1+2y_2+y_3]=\frac12[1+2(2)+2(5)+10]
  =\frac12[1+4+10+10]=\frac12(25)=12.5`. The listed `acceptedAnswers` are only `14 square units`/`14 units^2`,
  so the correct value 12.5 is also rejected. (Looks like the ordinate list was truncated from the
  five-value worked example `1,2,5,10,17` (which gives 26) to four values but the answer was not recomputed.)

- [P4] trapezoidal-rule-area-approximation::trap-mastery-5 (INLINE, line 2322, dead code) — wrong answer in
  overwritten array. `h=2, y:1,4,7` is claimed `12` but `T=\frac22[1+2(4)+7]=16`. Not student-facing
  (reassigned away) — noted for cleanup only.

All other reassigned masteryQuiz items verified correct:
- anti-mastery 1–10: `∫12x^3=3x^4` (A), `∫-15x^4=-3x^5` (B), excluded `x^{-1}` (C), `∫(8x^3-6x)=2x^4-3x^2` (C),
  `d/dx(3x^3-4x)=9x^2-4` (B), `a/6=4⇒a=24`, divide-not-multiply error (A), `F=-2x^4⇒F'=-8x^3` (D),
  `∫(6t^2-4t)=2t^3-2t^2` (D), `2x^4-2x^2`→`x^4-x^2+7x+C` (B). ✓
- indef-mastery 1–10 ✓ (e.g. `∫(6x^2-4x+5)=2x^3-2x^2+5x+C`, `∫-7=-7x+C`, `F'=4x^3-4x+5`). ✓
- initial-mastery 1–10 ✓ (`f(2)=9⇒C=5`; `4x-3,f(2)=7⇒2x^2-3x+5`; `Q'(3)=30⇒C=-3`). ✓
- definite-mastery 1,2,3,4,6,7,8,9,10 ✓ (`∫_0^2(3x^2+2)=12`; `∫_1^3 2x=8`; `∫_0^2(x^2+2x)=20/3`;
  `F(5)-F(2)=11`; `6-9=-3` signed area). Only m5 wrong (above).
- signed-mastery 1–10 ✓ (`∫_0^3(x-3)=-9/2`; total `9/2+2=13/2`; `y=x-4,0..2` area 6; `-4 & 7` ⇒ 11).
- area-mastery 1–10 ✓ (`∫_0^2(x^2+1)=14/3`; `y=-2x,0..3` area 9; `∫_0^4(4-x)=8`; `∫_0^3(9-x^2)=18`;
  `y=x-5,0..2` area 8; `y=x-1,0..3` total 5/2).
- trap-mastery 1,2,3,4,6,7,8,9,10 ✓ (`(9-1)/4=2`; `h=1,[2,5,10]=11`; `h=2,[3,4,8,9]=36`; `h=5,[2,6,8]=55`).
  Only m5 wrong (above).
- between-mastery 1–10 ✓ (`∫_0^2(5-x^2)=22/3`; `y=2x+1,y=x,0..3 ⇒ 15/2`; `x^2=4⇒-2,2`;
  `y=4,y=x^2,-2..2 ⇒ 32/3`; `R=8x,C=3x+10,2..5 ⇒ 45/2`). ✓
- apps-mastery 1,2,3,5,6,7,8,9,10 ✓ (`v=3t^2-4t,0..2 ⇒ 0`; `R=2t+5,0..4 ⇒ 36`; distance `|-4|+|9|=13`;
  `C'=4x+10,0..5 ⇒ 100`; `P'=6t+10,0..5 ⇒ 125`). Only m4 wrong (above).
- mixed-int-mastery 1–10 ✓ (`∫_0^2(3x^2+1)=10`; `f'=4x-3,f(2)=7 ⇒ 2x^2-3x+5`; `y=x-2,0..4` total 4;
  `h=2,[1,3,5]=12`; signed pieces `3-5+4=2`). ✓

Inline guidedPractice / independentPractice (live) — all verified correct, including:
- anti-guided/ind, indef-guided/ind, initial-guided/ind (`y'=-4x+6,y(2)=1⇒-2x^2+6x-3`; `F(3)=2⇒C=5`),
- definite-guided/ind (`∫_0^2(6x^2+1)=18`; `∫_0^2(-3x)=-6`; `∫_1^3 2x=8`; `∫_1^3(2x-4)=0`),
- signed-guided/ind (`∫_0^2(x-2)=-2`; `y=x-3,0..2` area 4; `y=2x-2,0..3` total 5),
- area-guided/ind (`∫_0^2 2x=4`; `∫_0^3 x^2=9`; `y=-x,0..2` area 2),
- trap-guided/ind (`h=2,[4,7,9,12]=48`; `[3,4,7]=9`; `[0,1,4]=3`; `[1,3,5,4]=21`),
- between-guided/ind (`∫_0^2(5-x^2)=22/3`; `∫_0^2((x+4)-x^2)=22/3`; `R-C=4x,0..5 ⇒ 50`),
- apps-guided/ind (`∫_0^3 4t=18`; `∫_0^3(2t+1)=12`; `∫_1^4 6t=45`; `∫_0^6(t+4)=42`; `∫_0^2(10t+20)=60`),
- mixed-int-guided/ind (`∫_0^3 x^2=9`; `f'=6x,f(1)=5⇒3x^2+2`; `y=x-1,0..2` total 1; `[2,4,8]=9`; `∫_0^4(2t+3)=28`).

Accepted-answer coverage is good: every typed `+C` / fractional / unit answer lists the spaced and
decimal variants, which `normaliseText` collapses anyway. No P2 gaps found.

No P3 found: "find and classify" prompts are delivered as single-select MCQs (e.g. appdiff-stat-m1-style
in the applications file), so they are conventionally atomic, not buried multi-deliverables.

## lib/lessons/applicationsDifferentiation.ts

Recomputed every guided/independent/mastery item across all six lessons
(secondDerivativeConcavity, stationaryPointClassification, curveSketchingCalculus, optimisation,
kinematicsRatesChange, applicationsDifferentiationExamPractice). **No issues found.**

Spot evidence (representative):
- appdiff-conc-g3 `f''=4x-8 ⇒ x=2`; conc-i1 `f''=3x+9 ⇒ x=-3`; conc-i4 `f''=6x-5 ⇒ f''(2)=7`;
  conc-m5 `f''=2x^2-6 ⇒ f''(2)=2`; conc-m8 `f''=x^2-9` positive root `3`. ✓
- stat-i1 `f'=2x-8 ⇒ x=4`; stat-i5 `f''=6x-18 ⇒ f''(2)=-6`; stat-m1 `x^2-8x+3`, min at `x=4`;
  stat-m3 `f'=3x+12 ⇒ x=-4`; stat-m8 `x^2-9` positive root `3`. ✓
- opt-i1 `R=40x-2x^2 ⇒ x=10`; opt-i2 `C=x^2-6x+20 ⇒ x=3`; opt-i5 `R=12x-x^2 ⇒ R_max=36`;
  opt-m1 `x(18-x) ⇒ 9`; opt-m2 `x^2-10x+40 ⇒ min 15`; opt-m4 `60x-3x^2 ⇒ 10`; opt-m7 `x(16-x) ⇒ 64`;
  opt-m9 `x(30-2x) ⇒ 15/2` (accepted `7.5`); opt-m10 `R'=100-4x ⇒ x=25` in domain. ✓
- kin-i1 `s=t^2+3t ⇒ v(2)=7`; kin-m1 `v=t^2-5t+4` first rest `t=1`; kin-m2 `s=t^3 ⇒ a(2)=12`;
  kin-m8 `v=3t^2-6t+1 ⇒ a(0)=-6`; kin-m10 `s=t^3-6t^2+9t` rest `t=1,3`. ✓
- exam-g2 `f''=2x-6 ⇒ x=3`; exam-i3 `s=2t^2-3t ⇒ v(2)=5`; exam-i5 `C'=2x-14 ⇒ x=7`;
  exam-m3 `R=24x-2x^2 ⇒ x=6`; exam-m5 `s=t^3-3t^2 ⇒ a(3)=12`. ✓

MCQ correctness/distractor checks all clean; second-derivative-test classifications, concavity
sign-chart readings, kinematics speed-vs-velocity items, and optimisation domain-rejection items are all
correctly keyed. `formatChoiceText` wraps bare algebraic options in `$...$` correctly; no LaTeX breakage,
mojibake, or `\$` escaping issues observed.

## lib/lessons/differentiationTechniques.ts

Recomputed every guided/independent/mastery item across all five lessons
(standardDerivatives, chainRule, productQuotientRules, applicationsExtendedDifferentiation,
differentiationTechniquesExamPractice). **No issues found.**

Spot evidence (representative numeric items, all confirmed with symbolic differentiation):
- std-g4 `sin+e^x, f'(0)=2`; std-i3 `4ln x, grad(1)=4`; std-m8 `5cos-3sin, f'(0)=-3`;
  std-m10 (MCQ) `e^x+ln x, f'(1)=e+1`.
- chain-g4 `(x+2)^3, y'(0)=12`; chain-i3 `(2x-1)^4, y'(1)=8`; chain-m6 `(3x+2)^2, y'(0)=12`;
  chain-m8 `ln(3x+1), f'(1)=3/4` (accepted `0.75`).
- pq-g4 `xe^x, y'(0)=1`; pq-i4 `xln x, y'(1)=1`; pq-m6 `xcos x, y'(0)=1`.
- app-g1 `(x+2)^2, m=6`; app-g2 `m_T=5 ⇒ m_N=-1/5` (accepted `-0.2`); app-i1 `e^{2x}, m(0)=2`;
  app-i3 `sin(2t)+t, f'(0)=3`; app-m1 `(3x-1)^2, m(1)=12`; app-m4 `e^{3t}, rate(0)=3`;
  app-m5 `f'=3x+6 ⇒ x=-2`; app-m8 `xln x, f'(1)=1`; app-m9/m10 `ln(3x+1),m(1)=3/4` and `e^x(x-3)⇒x=2`.
- exam-i2 `ln(2x+1), f'(1)=2/3`; exam-i4 `f'=4x-12 ⇒ x=3`; exam-m5 `e^{4x}+sin x, f'(0)=5`;
  exam-m6 `(x+1)^3, m(1)=12`; exam-m9 `e^x(x-5) ⇒ x=4`.

Standard-derivative MCQs (sin→cos, cos→−sin, tan→sec², e^x→e^x, ln x→1/x, a^x→a^x ln a), chain-rule and
product/quotient-rule setup MCQs, and normal-gradient negative-reciprocal items are all correctly keyed.
The `a^x` extension items (std-ax1 `2^x⇒2^x ln2`, std-ax2 `5^x⇒5^x ln5`) are correct. No P2/P3/P4 issues;
symbolic derivative tasks are deliberately MCQ to avoid typed-algebra marking ambiguity (documented in the
lesson's commonMistakes), and numeric items use clean inputs with decimal accepted-forms supplied.

## lib/lessons/furtherIntegralCalculus.ts

Recomputed every guided/independent/mastery item across all six lessons
(standardIntegrals, reverseChainRule, definiteIntegralsStandardForms, areaBetweenCurvesExtended,
trapezoidalRule, furtherIntegralCalculusExamPractice). **No issues found.**

Spot evidence (representative, confirmed symbolically):
- standardIntegrals: g4 `∫_0^{π/2}cos x=1`; i4 `∫_0^{π}sin x=2`; i5 `∫_1^{e}1/x=1`. MCQ antiderivatives
  (sin→−cos+C, cos→sin+C, e^x→e^x+C, 1/x→ln|x|+C, constant multiples) all correctly keyed.
- reverseChainRule: g1 `∫e^{2x}=½e^{2x}` (B); g4 `∫(2x+1)^4=1/10(2x+1)^5` (D, verified by differentiation);
  m5 `∫(3x-2)^5=1/18(3x-2)^6` (C, verified); m8 `∫2cos(2x)=sin(2x)+C` (D); m10 `∫8x(2x^2+1)^3=½(2x^2+1)^4`
  (B, verified); i5 `∫6x e^{3x^2}=e^{3x^2}+C` (A, verified). All scale factors correct.
- definiteIntegralsStandardForms: g1/g2 `∫_0^{π/2}sin=∫_0^{π/2}cos=1`; i1 `∫_0^{π}sin=2`;
  i2 `∫_0^{π}cos=0`; i4 `∫_1^{e^2}1/x=2`; m5 `∫_1^{e}2/x=2`; m6 `∫_0^{π}-sin=-2`. ✓
- areaBetweenCurvesExtended: g2 `∫_0^2(4-x)=6`; i2 `y=3,y=1,0..4 ⇒ 8`; i5 `y=6,y=2,0..5 ⇒ 20`;
  m2 `6`; m6 `y=5,y=2,1..4 ⇒ 9`; m8 `y=x,y=0,-1..1` geometric area `1`. Setup MCQs (top−bottom,
  intersections `x=x^2⇒0,1`, `x^2=2x⇒0,2`, split-at-crossing) correctly keyed.
- trapezoidalRule: g1 `∫_0^2 x^2≈4` (1 trap); g2 `≈3` (2 sub); table i1 `[2,5,6,8],h=1⇒16`;
  i2 `∫_1^3(x+1)≈6`; i5 `[3,7,11],h=2⇒28`; m1 `∫_0^2 x^3≈8`; m2 `[0,2,6],h=1⇒5`;
  m4 `[4,7,9,10],h=1⇒23`; m9 `[1,2,5,10,17],h=1⇒26`. Concavity over/under-estimate items correct
  (concave-up ⇒ overestimate, concave-down ⇒ underestimate). ✓
- furtherIntegralCalculusExamPractice: g3 `∫_0^{π}sin=2`; m5 `∫_0^{π/2}(sin+cos)=2`; m6 `∫_1^{e^3}1/x=3`;
  m8 `y=7,y=3,0..4 ⇒ 16`. Mixed antiderivative/area-setup MCQs correctly keyed; the diagnostic items
  ("which issue is present") correctly identify the missing 1/a factor / sign / reverse-power-on-x^{-1}.

`ln|x|+C` is used consistently for reciprocal integrals (correct for HSC). Exact forms `e-1`, `e^2-1`
retained where appropriate. No mojibake, broken LaTeX, or `\$` issues.

---

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| integralCalculus.ts | 3 | 0 | 0 | 1 |
| applicationsDifferentiation.ts | 0 | 0 | 0 | 0 |
| differentiationTechniques.ts | 0 | 0 | 0 | 0 |
| furtherIntegralCalculus.ts | 0 | 0 | 0 | 0 |
| **Total** | **3** | **0** | **0** | **1** |

### P1 list

`integralCalculus.ts | definite-mastery-5 | (reassigned, line 3474) | 0 → 3 | ∫_{-1}^{2}(4x-1)dx: [2x²−x] = (8−2)−(2+1) = 6−3 = 3, not 0`
`integralCalculus.ts | apps-mastery-4 | (reassigned, line 3538) | 20 → 16 | ∫_1^3(6t−4)dt: [3t²−4t]_1^3 = (27−12)−(3−4) = 15−(−1) = 16, not 20`
`integralCalculus.ts | trap-mastery-5 | (reassigned, line 3513) | 14 → 12.5 | Trapezoidal h=1, y=1,2,5,10: ½[1+2(2)+2(5)+10] = ½(25) = 12.5; accepted forms only list 14, so 12.5 is also rejected`

### P4

`integralCalculus.ts | trap-mastery-5 (INLINE, line 2322) | 12 → 16 | dead code (masteryQuiz overwritten at line 3508); ½·2·[1+2(4)+7]=16 — fix or delete to avoid confusion`

No P2 (accepted-answer) or P3 (multi-part) findings: typed-answer questions list the spaced/decimal
equivalents that the normaliser already collapses, and multi-deliverable prompts are delivered as
single-select MCQs.
