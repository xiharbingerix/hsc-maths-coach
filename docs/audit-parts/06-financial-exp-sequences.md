# Audit 06 — Financial Mathematics, Exponential/Logarithmic, Sequences & Series

Scope: `lib/lessons/financialMathematics.ts`, `lib/lessons/sequencesSeriesFinancialMaths.ts`,
`lib/lessons/exponentialLogarithmicFunctions.ts`, `lib/lessons/questionHelpers.ts`.

Helpers read first. `moneyAnswer`/`ssMoney` auto-generate currency + decimal + thousands variants
of the numeric answer, so money-format equivalence is well covered. `formulaAnswer`, `shortAnswer`,
`financeShortAnswer`, `measurementAnswer`, `timeAnswer`, `dataAnswer`, `linearAnswer`, `ssNumber`,
`expNumber` only de-duplicate the supplied accepted list and emit a generic `"The answer is X."`
explanation (factory-generated, not flagged). None of the helpers add mathematical equivalents
(surds/reordered sets), so missing equivalent forms are still auditable. MCQ choice text is passed
through `formatChoiceText`, which only re-wraps simple notation — no math impact.

Runtime marking (`answerMarking.ts`) auto-equates integers/decimals, decimal⇔fraction,
percentages, `$`, units, etc., so most typed-number answers here need no extra accepted forms.

## lib/lessons/questionHelpers.ts

No issues found. (Pure factory functions; no gradeable content of their own.)

## lib/lessons/financialMathematics.ts

- [P1] growthFactorsCompoundInterestDepreciationLesson::annuity-ind-5 — wait, this is in futureValueAnnuitiesLesson. See below. (cross-ref only)
- [P1] futureValueAnnuitiesLesson::annuity-ind-5 — wrong rounded value (digit transposition). Current: answer `"976.91"`, acceptedAnswers `["$976.91"]`, explanation `"FV=976.9108…"`. Proposed: `976.97` (accepted `$976.97`, `976.97`). Evidence: `FV = 120·((1.005)^8 − 1)/0.005 = 120 × 0.0406951… /0.005 = 976.96905…`, which rounds to **976.97**, not 976.91. The explanation even prints `976.9108…` which is itself wrong (off in the 2nd decimal); the true raw value is `976.96905`.
- [P1] comparingFinancialOptionsLesson::compare-mastery-5 — wrong product. Current: answer `"3669.08"`, acceptedAnswers `["$3669.08","$3,669.08"]`, explanation `"B=3669.08"`. Proposed: `3668.82` (accepted `$3668.82`, `$3,668.82`). Evidence: `3000·(1.048)^4 + 50 = 3000 × 1.20627… + 50 = 3618.815… + 50 = 3668.815…` → **3668.82**. (Reverse-check: 4th-root of (3669.08−50)/3000 = 1.04802, confirming the intended factor was 1.048 and 3669.08 is an arithmetic slip.)
- [P1] mixedFinancialMathematicsExamPracticeLesson::mixed-fin-guided-3 — wrong product. Current: answer `"1105.54"`, acceptedAnswers `["$1105.54","$1,105.54"]`, explanation `"1800(0.85)^3=1105.5375, so A=$1105.54"`. Proposed: `1105.43` (accepted `$1105.43`, `$1,105.43`). Evidence: `0.85^3 = 0.614125`; `1800 × 0.614125 = 1105.425` → rounds to **1105.43** (round-half-up; 1105.42 round-half-even). The explanation's intermediate `1105.5375` is also wrong (true value 1105.425).

- [P4] comparingFinancialOptionsLesson worked example 1 (not graded) — same slip as compare-mastery-5: `B=3000(1.048)^4+50=3669.08`. Should be `3668.82`. Students see it.
- [P4] comparingFinancialOptionsLesson::compare-mastery-6 (MCQ, not mismarking) — displayed value `B=3669.08` in the latex/choices is the wrong figure (true 3668.82); the labelled answer B ("Option B is larger") is still correct since 3668.82 > 3646.52, so no student is mismarked — cosmetic only.
- [P4] comparingFinancialOptionsLesson::compare-mastery-10 — prompt "Calculate the difference" with latex `3669.08-3646.52`, answer `22.56`. As a literal subtraction this marks correctly (3669.08−3646.52 = 22.56), but it propagates the wrong upstream Option-B value; with the corrected 3668.82 the true difference is `3668.82−3646.52 = 22.30`. Update latex + answer to `3668.82-3646.52 = 22.30` when compare-mastery-5 is fixed.
- [P4] comparingFinancialOptionsLesson::compare-ind-1 (MCQ, explanation only) — explanation states `B=2193.77`; true `2000·(1.025)^3 + 40 = 2193.78`. Answer (B larger) is correct; one-cent slip in explanation.
- [P4] futureValueAnnuitiesLesson worked example 2 (not graded) — `FV=100·((1.005)^6−1)/0.005` stated `607.5376…`, final `$607.54`; true raw value `607.5502…` → `$607.55`. (The graded twin annuity-mastery-9, `80·(…)=486.04`, is correct.)
- [P4] mixedFinancialMathematicsExamPracticeLesson worked example 1 (not graded) — `1800(0.85)^3` shown as `1105.5375`, final `$1105.54`; true `1105.425` → `$1105.43` (same slip as mixed-fin-guided-3).

All other gradeable questions in this file recompute correctly. Spot-verified (raw → rounded):
growth-ind-1 `1000(1.06)^2=1123.60`; growth-ind-2 `5000(0.9)^3=3645`; growth-ind-5
`3000(1.025)^4=3311.44`; growth-mastery-4 `2249.73`; growth-mastery-5 `5625`; growth-mastery-9
`750(1.03)^5=869.46`; all recurrence-* and loan-* terms (e.g. loan-mastery-3 `1.01·3740−300=3477.40`,
loan-ind-2 `1.02·2860−200=2717.20`); annuity-guided-4/ind-1/mastery-4/5/9 (`303.01/260.20/406.04/765.10/486.03`);
loan PV items (loan-guided-3 `1000/1.05=952.38`, loan-mastery-7 `5000/1.05^2=4535.15`); compare-guided-2/3
(`1102.50/1101.60`), compare-ind-2/4 (`B lower`, `570.80`), compare-mastery-1/2/4 (`3314.80/4625/3646.52`);
mixed-fin-ind-1/2/3/4 (`2704/7680/722.20/2830`), mixed-fin-mastery-5/6/7/8 (`1458/303.01/874/5660`).
All MCQ keyed answers verified correct with no ambiguous distractors.

## lib/lessons/sequencesSeriesFinancialMaths.ts

- [P4] arithmeticGeometricSequencesLesson::y12adv-ssfm-seq-i4 (explanation only) — the explanation string contains raw, undelimited LaTeX: `"T_6=81\\times\\left(\\tfrac13\\right)^5=\\tfrac{81}{243}=\\tfrac13. Five multiplications…"`. `MathText` (app/components/MathText.tsx) only renders LaTeX inside `$…$`/`\(…\)`/`\[…\]`; its auto-wrapper catches `T_6` but not `\times`, `\left`, `\tfrac`, so the explanation displays garbled backslash source. The math is correct (`81·(1/3)^5 = 81/243 = 1/3`) and the answer `"1/3"` marks fine (decimal⇔fraction auto-equates). Wrap the LaTeX in `$…$` or rewrite in plain words.

No mathematical errors. All numeric answers verified:
Sequences — seq-g1 `33`, seq-g3 `48`, seq-i1 `−16`, seq-i2 `d=4`, seq-i4 `1/3`, seq-m1 `51`,
seq-m2 `1458`, seq-m5 `d=4`, seq-m6 `r=3`, seq-m10 `1000·1.1^2=1210`. MCQ keys (seq-g2 geometric r=3,
seq-g4 ratio 0.85, seq-i3 `6(1.08)^{n-1}`, seq-i5 arithmetic, seq-m3/4/7/8/9) all correct.
Series — series-g1 `S10=175`, series-g2 `S5=93`, series-g3 `Σ(2k+1)=24`, series-i1 `S8=152`,
series-i2 `S4=80`, series-i5 `7+…+34=205`, series-m1 `450`, series-m2 `252`, series-m4 `Σ(4k−1)=55`,
series-m6 `S5=726`, series-m10 `S7=1143`; all series MCQ keys correct.
Limiting sums — limit-g1 `20`, limit-g3 `9`, limit-i1 `1250`, limit-i4 `54`, limit-m1 `25`,
limit-m3 `50`, limit-m6 `13.5`, limit-m9 `2500`; convergence/MCQ keys (limit-g2/g4/i2/i3/i5/m2/m4/m5/m7/m8/m10) correct.
Finance — fin-g1 `2205`, fin-g2 `3240`, fin-i1 `3200`, fin-i2 `3152.50`, fin-m1 `1210`, fin-m2 `5832`,
fin-m5 `1200·1.04^2+1200·1.04+1200=3745.92`; all finance MCQ keys (fin-g3/g4/i3/i4/i5/m3/m4/m6/m7/m8/m9/m10) correct.
Exam practice — exam-g1 `S10=255`, exam-g3 `50`, exam-g4 `5832`, exam-i2 `Σ2k=42`, exam-i3 `S5=75`,
exam-m1 `T12=53`, exam-m2 `S4=200`, exam-m4 `50`, exam-m6 `3600`, exam-m10 `r=3`; MCQ keys correct.
`ssMoney`/`ssNumber` accepted variants are adequate (decimal⇔fraction auto-equation covers seq-i4 `1/3`,
limit-m6 `13.5`/`27/2`).

## lib/lessons/exponentialLogarithmicFunctions.ts

No mathematical errors found. All change-of-base, equation, and modelling values verified:
Log laws — log-laws-g3 `log_7(7^4)=4`, log-laws-i3 `log_5 40=2.29` (raw 2.2920), log-laws-m1 `0`,
log-laws-m2 `1`, log-laws-m6 `log_2 50=5.64` (raw 5.6439); all expansion/domain MCQ keys
(g1/g2/g4, i1/i2/i4/i5, m3/m4/m5/m7/m8/m9/m10) correct, distractors unambiguous.
Euler/ln — ln-g1 `5`, ln-g2 `0`, ln-i1 `9`, ln-i2 `−3`, ln-i5 `e=2.718`, ln-m1 `1`, ln-m2 `12`,
ln-m3 `15`, ln-m7 `e^{ln4}+ln(e^3)=7`; inverse-identity/domain MCQs all correct.
Solving — solve-g3 `3ln2=ln8⇒x=8`, solve-i1 `ln10=2.30`, solve-i4 `5x=45⇒9`, solve-m2 `ln20/2=1.50`
(raw 1.4979), solve-m5 `x²−2x−15=0⇒5`, solve-m8 `ln(30/7)/0.4=3.63`; exact-form MCQs verified
(solve-i2 `−ln4/2`, solve-m3 `ln7/3`, solve-m7 `t=2ln4`, exam-m3 `ln3/2`, solve-m9 `(x+6)/x=4⇒2`),
domain-rejection MCQs (solve-g4, solve-m6) correct.
Modelling — model-g2 `100e^{0.6}=182`, model-g4 `5.11`, model-i2 `137`, model-i3 `ln0.8/10=−0.022`,
model-m1 `733`, model-m3 `0.051`, model-m4 `6.26`, model-m6 `ln2/9=0.077`, model-m8 `ln0.5/−0.08=8.66`;
doubling/half-life/decay MCQs correct.
multiPartPractice exp-model-mp1 (well-structured 3-part): (a) `P=500e^0=500` ✓; (b) `dP/dt=20e^{0.04t}`,
at t=0 `=20` ✓; (c) `20e^{0.4}=29.84→30`, accepted `["29","30"]` ✓; top-level `answer:"500"` consistent
with part (a). Marking robust.
Exam practice — exam-g3 `ln(e^6)+e^{ln4}=10`, exam-i1 `log_3 25=2.93`, exam-i4 `ln5/0.3=5.36`,
exam-m2 `ln(e^{-4})+e^{ln9}=5`, exam-m4 `x²−x−12=0⇒x=4` (domain x>2), exam-m5 `ln1.6/6=0.078`,
exam-m9 `ln(1/3)/−0.25=4.39`, exam-m10 `x²−6x−9=0⇒3+3√2≈7.24>5`; all log-law/domain/modelling MCQs correct.

This file is mathematically clean. Note (no action): exact-form answers (ln/e/surd) are deliberately
delivered as MCQ throughout, sidestepping the typed-exact-form accepted-answer risk; typed `expNumber`
items are integers or rounded decimals with adequate accepted variants and decimal auto-equation.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|---|---|---|---|---|
| questionHelpers.ts | 0 | 0 | 0 | 0 |
| financialMathematics.ts | 3 | 0 | 0 | 6 |
| sequencesSeriesFinancialMaths.ts | 0 | 0 | 0 | 1 |
| exponentialLogarithmicFunctions.ts | 0 | 0 | 0 | 0 |
| **Total** | **3** | **0** | **0** | **7** |

### P1 list

financialMathematics.ts | annuity-ind-5 | — | 976.91 → 976.97 | 120·((1.005)^8−1)/0.005 = 976.969 → 976.97 (answer + accepted both wrong; explanation's 976.9108 also wrong)
financialMathematics.ts | compare-mastery-5 | — | 3669.08 → 3668.82 | 3000·(1.048)^4 + 50 = 3618.815 + 50 = 3668.82 (arithmetic slip)
financialMathematics.ts | mixed-fin-guided-3 | — | 1105.54 → 1105.43 | 1800·(0.85)^3 = 1800·0.614125 = 1105.425 → 1105.43 (explanation's 1105.5375 also wrong)
