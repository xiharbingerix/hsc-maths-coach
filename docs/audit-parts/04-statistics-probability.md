# Audit — Statistics & Probability

Scope: every gradeable question (guidedPractice / independentPractice / masteryQuiz) and all
parts/steps in:

- `lib/lessons/statisticalAnalysis.ts` (8 lessons)
- `lib/lessons/probability.ts` (4 lessons, built via `probLesson` / `probNumeric` / `probChoice`)

Marking engine reviewed: `lib/answerMarking.ts`. Helpers reviewed:
`probChoice`, `probNumeric`, `probLesson` (probability.ts); `formatChoiceText` (questionHelpers.ts).

Key resolved-helper facts used below:
- `probNumeric(id, prompt, latex, answer, accepted=[], explanation?)` →
  `acceptedAnswers = unique([answer, ...accepted])`, `hint` fixed, `explanation = explanation ?? "The answer is {answer}."`.
- `probChoice(...)` builds A–D MCQ; choice text passes through `formatChoiceText` (cosmetic LaTeX wrap only; does not change correctness).
- Marking auto-equates integer/decimal ⇔ fraction ⇔ percentage; fraction answers (e.g. `5/8`, `4/13`)
  therefore already match their decimal equivalents whether or not the decimal is listed.
- The word **"to"** is parsed by the engine as a **ratio** separator (`parseRatio`), so an interval
  answer "47 to 53" is treated as the ratio 47:53, NOT auto-equated to "47-53" or "47,53". Interval
  questions consequently DO need their explicit accepted forms — checked below.

## lib/lessons/statisticalAnalysis.ts

All gradeable answers recomputed independently. No P1 errors found.

Per-lesson correctness spot summary (all verified correct):

- **data-displays-measures-of-centre** — centre-guided-1 mean (3+5+7+9)/4=6 ✓; centre-guided-2 median 6 ✓;
  centre-ind-1 32/4=8 ✓; centre-mastery-1 35/5=7 ✓; centre-mastery-8 frequency-weighted mean
  (2·3+5·1)/4 = 11/4 = 2.75 ✓ (accepted "2.750"); all MCQ keys correct.
- **spread-iqr-box-plots-outliers** — spread-guided-1 20−5=15 ✓; spread-ind-1 18−4=14 ✓;
  all IQR = Q3−Q1 items correct; spread-mastery-8 14−6=8 ✓; MCQ keys correct.
- **standard-deviation-z-scores** — every z = (x−x̄)/s recomputed: z-guided-1 (90−80)/5=2 ✓,
  z-guided-2 (62−70)/4=−2 ✓, z-ind-2 (45−50)/10=−0.5 ✓ (accepted "-.5","-0.50"),
  z-mastery-3 (75−80)/5=−1 ✓, z-mastery-8 (100−100)/12=0 ✓. z-guided-4 "−2.4 vs 1.1" → −2.4 ✓
  (accepted "-2.4","z=-2.4"). MCQ keys correct.
- **correlation-least-squares-regression** — predictions ŷ=mx+b recomputed: guided-3 3(4)+5=17 ✓,
  ind-3 1.5(6)+9=18 ✓, mastery-4 2.5(8)+12=32 ✓, mastery-5 4(10)−3=37 ✓, mastery-6 −2(5)+30=20 ✓;
  intercept ind-5 = 7 ✓; correlation-direction/strength MCQs all keyed correctly
  (r=0.74 positive, r=−0.91 strong negative, r=0.88 strong positive, r=−0.18 weak negative,
  r=0.93/−0.82/0.04 all correct).
- **interpreting-association-residuals** — residual = y−ŷ recomputed: guided-1 18−15=3 ✓,
  guided-2 22−28=−6 ✓, ind-1 40−35=5 ✓, ind-2 31−36=−5 ✓, mastery-1 26−20=6 ✓,
  mastery-2 14−19=−5 ✓, mastery-3 50−50=0 ✓. Sign-interpretation MCQs all correct.
- **normal-distribution-empirical-rule** — intervals recomputed: guided-2 50±3 = 47 to 53 ✓,
  guided-3 100±16 = 84 to 116 ✓, ind-1 40±6 = 34 to 46 ✓, ind-2 70±10 = 60 to 80 ✓,
  ind-4 raw value 50+1.5(4)=56 ✓, ind-3 z=(82−70)/6=2 ✓; mastery 65–75 / 42–58 / 70–130 / 68–92 ✓;
  empirical-rule percentage MCQs correct. Interval accepted-form coverage adequate (see note below).
- **mixed-statistical-analysis-exam-practice** — guided-2 1.8(10)+12=30 ✓, guided-3 34−30=4 ✓,
  ind-1 IQR 21−12=9 ✓, ind-2 z=(72−60)/6=2 ✓, ind-3 3(7)−5=16 ✓, ind-5 50±8 = 42 to 58 ✓,
  mastery-4 19−7=12 ✓, mastery-5 (90−75)/5=3 ✓, mastery-6 2(9)+11=29 ✓, mastery-9 80±12 = 68 to 92 ✓;
  MCQ keys correct.
- **random-variables-probability-distributions** — E(X) recomputed: guided-3 missing p=1−0.25−0.35=0.4 ✓
  (accepted "0.40","2/5"), guided-4 E=0.3 ✓, ind-1 1(0.2)+2(0.5)+3(0.3)=2.1 ✓, ind-2 p=0.30 ✓,
  ind-3 0+1+1.2=2.2 ✓ (accepted "$2.20" etc), mastery-4 0.5+... E=1 ✓, mastery-5 1(0.75)+4(0.25)=1.75 ✓
  (accepted "7/4"), mastery-6 0.8+3.6=4.4 ✓, mastery-7 p=1−0.1−0.65=0.25 ✓ (accepted "1/4"),
  mastery-10 0+2+3=5 ✓. Variance items: var1 Var=E(X²)−[E(X)]²=0.5−0.25=0.25 ✓ (accepted "1/4",".25"),
  var2 E(X²)=0.5+4.5=5 ✓, var3 σ=√Var MCQ key C ✓.

### Findings (statisticalAnalysis.ts)

- [P4] spread-iqr-box-plots-outliers::workedExamples[1] (WE1, "Compare range and IQR") — diagram labels the
  value 15 as an outlier and sets the upper whisker at 11, but 15 is NOT a statistical outlier.
  Evidence: IQR=6, 1.5×IQR=9, upper fence = Q3+9 = 11+9 = 20; since 15 ≤ 20 it is inside the fence, so
  the whisker should extend to 15 and there is no outlier. The worked example otherwise computes
  range=13 and IQR=6 correctly; only the box-plot `outliers:[15]` / `upperWhisker:11` annotation is wrong.
  Not graded (worked example) → cosmetic/visual only, but students see it. Proposed: drop the outlier
  flag and set upperWhisker:15, or change max to a value > 20 if an outlier illustration is intended.

- [P4] normal-distribution-empirical-rule (and mixed-statistical-analysis-exam-practice) interval items —
  NOTE, not a defect. Interval answers ("47 to 53", "60 to 80", "42 to 58", etc.) rely on the engine's
  exact/accepted match because "to" is otherwise parsed as a ratio separator. Each such question DOES
  list the reasonable variants ("47-53", "47,53", "[47,53]", "47 <= x <= 53", "47≤x≤53"), so coverage is
  adequate. One residual gap: a student typing the bare reversed/extra-spaced form or "47 - 53" with
  spaces normalises to "47-53" and matches; "47 through 53" or "between 47 and 53" would not — but these
  are not conventional short-answer forms, so no action required.

No P1, P2, or P3 issues in statisticalAnalysis.ts.

## lib/lessons/probability.ts

All gradeable answers recomputed independently. No P1 errors found.

Per-lesson correctness summary (all verified correct):

- **probability-basics-venn-diagrams** —
  g1 P(Ā)=1−3/8=5/8 ✓ (accepted "0.625"); g2 P(not red)=6/10=3/5 ✓; g3 0.4+0.35−0.15=0.60 ✓;
  g4 MCQ key D (P(A∩B)=0) ✓.
  i1 1−0.72=0.28 ✓; i2 P(Q∪H)=16/52=4/13 ✓ (accepted "16/52","0.3077","0.308"); i3 0.7 ✓; i4 0.15 ✓;
  i5 mutually exclusive 0.3+0.25=0.55 → key B ✓.
  m1 0.35 ✓; m2 0.58 ✓; m3 n(A∪B)=10/14=5/7 ✓; m4 P(A)=0.7 → key C ✓; m5 P(A)=0.6−0.25+0.1=0.45 ✓;
  m6 (18+12−5)/30=25/30=5/6 ✓; m7 key A ✓; m8 0.15 ✓; m9 complement "all tails" key B ✓;
  m10 P(not green)=10/12=5/6 ✓.
- **conditional-probability-tree-diagrams** —
  g1 0.6×0.4=0.24 ✓; g2 0.30+0.15=0.45 ✓; g3 0.3/0.5=0.6 ✓; g4 requires P(B)>0 → key C ✓.
  i1 0.15 ✓; i2 0.15+0.14=0.29 ✓; i3 0.18/0.6=0.30 ✓; i4 (4/10)(3/9)=12/90=2/15 ✓; i5 key A ✓.
  m1 0.24 ✓; m2 0.24+0.15=0.39 ✓; m3 ratio unchanged → key C ✓; m4 0.24/0.8=0.30 ✓; m5 0.2/0.4=0.5 ✓;
  m6 P(B₂|R₁)=5/7 ✓; m7 key B ✓; m8 0.55×0.4=0.22 ✓; m9 0.22+0.09=0.31 ✓; m10 0.5×0.6=0.30 ✓.
- **independence-multiplication-rule** —
  g1 0.4×0.5=0.20 ✓; g2 0.3×0.4=0.12=P(A∩B) → independent, key A ✓; g3 0.6×0.5=0.30≠0.35 → key B ✓;
  g4 P(B|A)=P(B) → key C ✓.
  i1 0.7×0.6=0.42 ✓; i2 0.5×0.4=0.20=P(A∩B) → key A ✓; i3 0.20≠0.25 → key B ✓; i4 (1/6)²=1/36 ✓;
  i5 with replacement → independent, key B ✓.
  m1 0.24 ✓; m2 key A ✓; m3 0.30≠0.25 → key B ✓; m4 P(A)×P(B) → key C ✓; m5 0.6²=0.36 ✓;
  m6 0.5+0.7−0.35=0.85 ✓; m7 0.4×0.5=0.20=P(A∩B) → key A ✓; m8 without replacement → dependent, key B ✓;
  m9 (3/10)²=9/100 ✓; m10 0.45×0.5=0.225 ✓.
- **probability-exam-practice** —
  g1 P(A|B)=12/40 → key B ✓; g2 0.5+0.6−0.30=0.80 ✓; g3 0.12/0.18=2/3 ✓; g4 complement → key D ✓.
  i1 15/50=3/10 ✓; i2 0.3+0.5−0.15=0.65 ✓; i3 0.5×0.4=0.20 ✓; i4 (1/2)³=1/8 ✓;
  i5 0.6×0.5=0.30=P(A∩B) → key A ✓.
  m1 0.45 ✓; m2 0.60 ✓; m3 0.40 ✓; m4 0.4×0.6=0.24 → key B ✓; m5 0.30+0.08=0.38 ✓;
  m6 P(one of each, with replacement)=2(0.5)(0.5)=1/2 ✓; m7 0.50×0.40=0.20=P(A∩B) → key A ✓;
  m8 0.30+0.50−0.12=0.68 ✓; m9 1−(5/6)²=11/36 ✓; m10 P(A|B)=P(A) → independent, key C ✓.

### Findings (probability.ts)

- [P4] independence-multiplication-rule::prob-indep-g3 — explanation/choice text states
  "0.6 × 0.5 = 0.30 ≠ 0.35". This is correct. No issue (recorded only to confirm the near-miss values
  were checked).

No P1, P2, P3, or genuine P4 defects in probability.ts. All MCQ distractor sets were checked for a
second correct option; none found. Mojibake check: the Venn/intersection glyphs (∪ ∩ Ā) and `×`
render correctly as intended Unicode, not mojibake. No unclosed LaTeX, no `\$` mis-escaping in graded
fields, no draft wording.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| statisticalAnalysis.ts | 0 | 0 | 0 | 1 (+1 note) |
| probability.ts | 0 | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** | **1** |

### P1 list

None.

### Notes
- Only P4 (cosmetic/visual): spread-iqr-box-plots-outliers worked example WE1 mislabels value 15 as an
  outlier (15 ≤ Q3 + 1.5·IQR = 20, so it is inside the upper fence). Worked example, not graded.
- Interval answers depend on listed accepted forms because the marking engine treats "to" as a ratio
  separator; coverage is present and adequate across all interval questions.
