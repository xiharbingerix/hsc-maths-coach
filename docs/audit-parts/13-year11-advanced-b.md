# Year 11 Advanced (B) Audit

Scope: four Year 11 Advanced lesson-override files. Every gradeable item in `guidedPractice[]`,
`independentPractice[]`, `masteryQuiz[]` (incl. `steps[]`) and `multiPartPractice[].parts[]` was
independently recomputed. Factory helpers were read first so the **resolved** student-facing
`answer` / `acceptedAnswers` / `explanation` were evaluated (not just the literal call).

## Factory-helper resolution (shared context)

- **`practicalChoice` / MCQ** (all files): correct option is referenced by letter (`"A"`–`"D"`); the
  graded value is the label, so distractor *text* formatting (via `formatChoiceText`, which may wrap
  plain text in `$…$` and strip spaces) is a display concern, not a marking concern. All labelled
  correct options were verified correct and no distractor is simultaneously correct/ambiguous.
- **`exponentialLogarithmicFunctions.ts` `formulaAnswer`** wraps `baseFormulaAnswer` and prepends
  `numericFormatVariants(answer)` (integer `7`→`["7.0"]`, decimal `7.5`→`["7.50"]`), then overrides
  `explanation` via `exponentialLogarithmicFeedback(prompt, answer)`. Resolved accepted set =
  dedupe`[answer, …numericVariants, …explicit]`.
- **`graphTransformations.ts` `formulaAnswer`** adds `numericFormatVariants` + `coordinateVariants(x,y)`
  (`"(x, y)"`, `"x,y"`, `"x, y"`, `"x=…,y=…"`, `"x = …, y = …"`), explanation from
  `GRAPH_TRANSFORM_EXPLANATIONS[id]` or a generic fallback.
- **`probabilityData.ts` `dataAnswer`** appends `labelledDataAnswerVariants` (adds `median=…`, `IQR`,
  `E(X)=…`, `Var(X)=…`, etc. where the prompt names that statistic, plus terminating-decimal/percent
  variants from `probabilityAnswerVariants`), explanation from `probabilityDataFeedback`.
- **`workingWithFunctions.ts` `formulaAnswer`** = `baseFormulaAnswer` + `workingFunctionsFeedback`
  explanation; **`qa(…)`** is a plain object literal with explicit `hint`/`explanation` and
  dedupe`[answer, …accepted]`.
- **Runtime marking (`lib/answerMarking.ts`)** independently auto-equates the forms that recur here:
  decimal⇔fraction (`0.5`≡`1/2`), percent (`30%`≡`0.3`), coordinate `(x,y)`≡`x,y`≡`x=…,y=…`,
  trailing units (incl. `hours/min/s`, `mg/g/m/cm/km/kg/L`), leading `var =` prefix (`y=-4`≡`-4`,
  `x=6`≡`6`, `a=5`≡`5`), unicode minus, `x²`≡`x^2`, and `^(n)`→`^n` (so `x^(7)`≡`x^7`),
  `min`≡`minimum`. These cover essentially every typed answer in scope.

## lib/lessons/year11Advanced/exponentialLogarithmicFunctions.ts

6 lessons (`index-laws-exponential-functions`, `logarithms-logarithm-laws`,
`solving-exponential-logarithmic-equations`, `exponential-logarithmic-modelling`,
`…-exam-practice`, `graphing-exponential-logarithmic-functions` incl. 2 `multiPartPractice`).

All recomputations correct. Representative confirmations:
- Index/log evaluations: `2^{-3}=1/8`, `4^x` at `x=3/2` → `8`, `64^{1/2}=8`, `\log_4 64=3`,
  `\log_2(1/8)=-3`, `\log_2 8+\log_2 4-\log_2 2=\log_2 16=4`. ✓
- Equation solving: `\log_3 x+\log_3 2=2`→`x=9/2` (4.5); `\log_2(4x)-\log_2 2=3`→`x=4`;
  `\log_3 x+\log_3 x=4`→`x=9`; `4^x=1/16`→`x=-2`. ✓
- Modelling: `5000(1.1)^2=6050`, `20000(0.8)^2=12800`, `2000(1.05)^2=2205`, `120(0.5)^2=30`. ✓
- "Reject the invalid solution" MCQs (`…solve-m8`: `\log_2(x-5)=3, x=4` → input `x-5=-1<0`):
  only the labelled option is correct; integer/“too large” distractors are false. ✓
- Both `multiPartPractice` chains (`…graph-mp1` y=2^x, `…graph-mp2` y=log₂x): each part and the
  cross-referenced container values are correct; asymptote parts accept `0`/`y = 0`/`x = 0`. ✓

No issues found.

## lib/lessons/year11Advanced/graphTransformations.ts

6 lessons (composite/translations/dilations/poly-reciprocal/exam/circles) incl. 4
`multiPartPractice` (`…graph-mp` pair earlier? here `circles-mp1`, `circles-mp2`).

All recomputations correct. Representative confirmations:
- Translations: `f(x+4)`→left 4; `(1,5)` under `f(x-3)-2`→`(4,3)`; `(-2,6)` under `f(x+3)-4`→`(-5,2)`.
  `coordinateVariants` supplies the comma/`x=`/`x =` forms. ✓
- Dilations/reflections: `f(2x)`→scale `1/2`; `3f(x)` on `(2,-4)`→`(2,-12)`; `3f(-x)` on `(5,-2)`→`(-5,-6)`. ✓
- Vertex/asymptote reads: `(x-4)^2-1`→`(4,-1)`; `1/(x-5)+2`→`x=5`; `1/(x+3)-4`→`y=-4` (accepts `-4`). ✓
- Circles completing-the-square: `x²+y²-6x+2y-6=0`→r²=9+1+6=16, r=4 (`…circles-m5`);
  `x²+y²+8x-2y-8=0`→r²=16+1+8=25 (`…circles-m8`). ✓
- `multiPartPractice` `circles-mp1` (centre/radius of `(x-2)²+(y-3)²=36`: 2, 3, 6) and `circles-mp2`
  (complete square on `x²+y²-4x+2y-4=0`: +4, +1, r²=4+4+1=9) — all parts correct, dependent part (c)
  correctly uses earlier constants. ✓

No issues found.

## lib/lessons/year11Advanced/probabilityData.ts

7 lessons (data-summary, relative-frequency, discrete-RV, expected-value/SD, exam, sets/Venn,
conditional/independence) incl. 6 `multiPartPractice` parts across `sets-mp1/2` and `cond-mp1/2`.

All recomputations correct. Representative confirmations:
- Summary stats: median/IQR/range/mode/mean (`10/3`, `13/6`), upper fence `Q3+1.5·IQR`
  (`Q1=20,Q3=32`→`50`); outlier MCQs compare test value to the stated fence correctly. ✓
- Probability rules: complement, addition `0.45+0.30-0.10=0.65`, conditional table denominators,
  independence checks (`P(A)P(B)` vs `P(A∩B)`). All MCQ correct options verified; the
  “not independent” items (`prob-m8`, `cond-m10`) correctly reject equality. ✓
- Discrete RV: missing-probability sums to 1; `P(X≥2)`, `P(X≤1)`, `P(X≠k)`; “X is odd” `0.4+0.2=0.6`. ✓
- Expected value/variance/SD: `E(X²)` (`5²·0.4=10`), `Var=E(X²)-[E(X)]²` (`20-4=16`,`SD=4`;
  `13-9=4`,`SD=2`), fair-game `5(¼)+(-1)(¾)=0.5`. ✓
- Sets: `n(A∪B)` via addition formula, `n(A'∩B')=n(ξ)-n(A∪B)`, `P(A∩B)=P(A)+P(B)-P(A∪B)=0.3`. ✓
- `multiPartPractice` `sets-mp1` (23, 7, 23/30), `sets-mp2` (0.8, 0.5, 0.2), `cond-mp1`
  (3/5, 2/5, 3/10 + correct not-independent conclusion), `cond-mp2` (0.3, 0.5, total-prob 0.3+0.1=0.4):
  all parts correct and later parts correctly consume earlier results; fraction parts carry
  `0.x`/`%`/unreduced-fraction accepted variants (redundant given runtime auto-equation, harmless). ✓

No issues found.

## lib/lessons/year11Advanced/workingWithFunctions.ts

13 lessons (notation/domain-range, lin-quad-cubic, poly-reciprocal, absolute-value, odd-even, exam,
algebraic-techniques, quadratic-discriminant, linear-functions, constructing/using-functions,
direct-inverse-variation, circles-semicircles, piecewise, quadratic-inequalities, composite,
completing-the-square) incl. `multiPartPractice` for `qi`, `comp`, `cts`.

All recomputations correct. Representative confirmations:
- Function evaluation with bracketed negatives: `f(-2)=2(4)+6+1=15`, `p(-3)=24`, `f(3)=4-9=-5`. ✓
- Domain/asymptote single-deliverable items; even/odd classification (`x⁶-3x²` even, `2x⁵-x` odd,
  `x³+1` neither); even `f(4)=9→f(-4)=9`, odd `f(2)=7→f(-2)=-7`. ✓
- Surds/indices: `√12+√3=3√3` (coeff 3), `(√5+√3)(√5-√3)=2`, `8^{2/3}=4`, `16^{3/4}=8`,
  `(2x³)²=4x⁶`, `x^{1/2}·x^{3/2}=x²`. ✓
- Discriminant: `3x²-5x+2`→`Δ=1`; `2x²+3x+5`→`Δ=-31`; `x²-6x+9`→`Δ=0`; nature-of-roots MCQs and
  the “no real roots” item (`x²+4x+5`, `Δ=-4`) verified; rational-root MCQs correct. ✓
- Linear/models/variation: gradients, intercepts, perpendicular `m₂=-1/m₁`, inequalities with
  sign-reversal (`5-2x≤1→x≥2`); break-even `15n=9n+48→n=8`; profit; direct/inverse `k` and missing
  values (`k=3/12=¼, y=5`). Inequality answers are prompted in a fixed form (“Enter in the form
  x > …”), so directed typed form is unambiguous. ✓
- Circles/semicircles: `x²+y²=r²` point tests `(3,4)`/`(5,12)`/`(6,8)`, semicircle domain/range,
  `√(100-36)=8`, `-√(25-9)=-4`. ✓
- Piecewise: correct-branch selection at/around boundaries (`f(2)=7` via `x≤2`, `f(4)=11` via `x>2`),
  continuity boundary value `5`, `|x|` piecewise equivalence, domain gaps. ✓
- Composite: `(f∘g)` apply-g-first values, `(f∘g)≠(g∘f)`, algebraic `(2x-3)²+1=4x²-12x+10`
  (constant 10), composite domains `x≥4`/`x≤4`/exclude `x=1`. ✓
- `multiPartPractice` `qi-mp1/2` (roots + sign-check `f(3)=-2`, `g(1)=-4`), `comp-mp1/2`
  (constant term 10, `(f∘g)(2)=2`, `(g∘f)(2)=7`; domain min 9, `√16=4`, `√4=2`),
  `cts-mp1/2` (`k=-4`, vertex `x=-3`, larger root `-1`; `h=2`, `k=-5`, minimum): every part correct,
  dependent parts consistent. ✓

No issues found.

## Notes (sub-threshold, not flagged)

- `\$` appears only inside `\text{…}` in **workedExamples** (`workingWithFunctions.ts` car-hire /
  plumber examples). In LaTeX text mode `\$` is the correct literal-dollar escape and renders
  correctly; worked examples are not graded, so no P4.
- Numerous `acceptedAnswers` duplicate forms the runtime already auto-equates (decimal/fraction/percent,
  `^(n)`, `x=`/`y=`/`a=` prefixes, coordinate punctuation, unit suffixes). Redundant but harmless —
  not flagged.
- MCQ choice text routed through `formatChoiceText` (e.g. `"x >= -3"` → `$x\ge-3$`) only affects
  display; the graded value is the option letter. No `question_type`/`choices` mismatches.
- No mojibake, unclosed LaTeX, draft wording, or empty/generic graded explanations found.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| exponentialLogarithmicFunctions.ts | 0 | 0 | 0 | 0 |
| graphTransformations.ts | 0 | 0 | 0 | 0 |
| probabilityData.ts | 0 | 0 | 0 | 0 |
| workingWithFunctions.ts | 0 | 0 | 0 | 0 |

**P1 list:** None.

All four files are clean. No wrong answers, no missing accepted forms not already auto-normalized by
`answerMarking.ts`, no single-answer items burying multiple deliverables (the author consistently
splits these into separate questions or `multiPartPractice`), and no cosmetic defects.
