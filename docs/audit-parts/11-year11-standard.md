# Year 11 Standard — Question-Quality Audit

Scope: every gradeable question (`guidedPractice`, `independentPractice`, `masteryQuiz`; no
`multiPartPractice`/`parts`/`steps` exist in these files) across all `.ts` files under
`lib/lessons/year11Standard/`. Factory helpers were read first; questions evaluated as RESOLVED
(auto-generated `acceptedAnswers` variants from `moneyAnswer`/`measurementAnswer`/etc., and
auto-feedback `explanation`). Runtime marking rules from `lib/answerMarking.ts` applied
(decimal⇔fraction⇔percent, trailing units, `x²`⇔`x^2`, leading `var =` prefix, unicode minus,
en-dash/hyphen all auto-normalised).

Helper notes:
- `moneyAnswer` (questionHelpers + earningMoney/managingMoney/linear wrappers) auto-adds
  `String(n)`, `n.toFixed(2)`, `toLocaleString`, and `$`-prefixed forms — so currency/decimal
  coverage is broad. `financeChoice`/`labelledChoice`/`probabilityChoice` build A–D MCQs where the
  literal `answer` letter maps to `choices[0..3]`.
- `formatChoiceText` wraps some choice strings in `$...$`; cosmetic only.
- `networkAnswerVariants` adds up to 4 unit-suffixed variants for numeric network answers.

## applicationsMeasurement.ts

- [P4] `trapezoidal-rule-land-area`::y11s-tra-m6 — explanation is self-contradicting draft text:
  "4 offsets create 3 intervals, so there are 3 strips — but with 5 offsets, there are 4 strips."
  The labelled correct answer (C = 4 strips) is correct for the 5-offset list 0,5,10,5,0; the
  explanation should simply read "5 offsets create 4 strips." No mis-marking. Evidence: 5 offsets →
  4 intervals.

All other questions verified correct, including: limits of accuracy (half the rounding unit),
percentage error, m²/m³↔L conversions, hectare conversions, cube surface area (6s²), density D=M/V
and rearrangements, fuel L/100 km, scale 1:n (length ×n, area ×n²), circle/cylinder (π≈3.14 and full
π to 1 dp), and the full Trapezoidal Rule set (single-strip ½(d_f+d_l)h and multi-strip
h/2(d_f+d_l+2·Σmid)). Spot recomputations: y11s-tra-i2 = 6×72 = 432; y11s-tra-m4 = 2.5×64 = 160;
y11s-amr-i5 cylinder = π·72 ≈ 226.2 (C); y11s-amr-m8 = 20π ≈ 62.8.

## dataAnalysis.ts

No issues found. Verified mean/median/mode/range, outlier identification, grouped-data modal class +
Σ(f·m)/Σf estimate, five-number summary / IQR / 1.5×IQR fences, stem-and-leaf reads, time-series
trend + average rate of change, and stratified sampling proportions. Spot recomputations:
data-display-m1 = 307/7 = 43.857 → 43.9; data-group-i2 = 450, mean 450/20 = 22.5;
data-group-m10 = 190/15 = 12.67 → 12.7; data-box (n=8) Q2=14, Q1=10, Q3=18, fences 30 / −2;
data-stem-m3 median = (25+28)/2 = 26.5; data-time-m2 rate = 8/5 = 1.6; y11s-dcs-i2 = 480/800×100 = 60.
Modal-class answers like "20–29" carry hyphen variants and en-dash auto-normalises.

## earningMoney.ts

No issues found. Verified wages/salary period conversions, overtime ×1.5 / ×2, commission, piecework,
net=gross−deductions, leave loading 17.5%, super 11%, Youth Allowance 0.50-per-dollar taper, Medicare
levy 2%, PAYG annualisation (×52 / ×26), refund vs payment-owing. Spot: earn-wage-m9 812/32 = 25.375 →
25.38; earn-leave-m5 0.11×640 = 70.40; earn-govt-i taper 800−620=180, ×0.5=90, 630−90=540, +800=1340;
y11s-mel-m8 10342+0.02·58000 = 11502.

## formulasEquations.ts

No issues found. Verified substitution (incl. d=0.01v²+0.4v, A=πr², V=s³, KE=0.5mv²), changing the
subject, linear/bracket/both-sides equations, simultaneous (set-equal) solutions, inequalities incl.
strict-vs-inclusive boundary handling, BAC male/female formulas, Time=BAC/0.015, Young's/Clark's/
Fried's dosage. Algebraic "make-the-subject" answers carry adequate accepted forms (e.g.
`r=C/(2pi)`, `C=(F-32)/1.8`) and benefit from leading-`var =` prefix stripping. Spot: nonlin v=60 →
36+24=60; v=80 → 64+32=96; BAC male 70kg/5/3h = 27.5/476 = 0.0578 → 0.058; Young 8yr/400 = 160.

## linearRelationships.ts

No issues found. Verified gradient/intercept interpretation, C=b+mx construction from words/points/
tables, direct variation y=kx, piecewise/step tariffs (split at boundary), break-even (R=C),
domain/extrapolation limits, and gradient from two points. "Write-a-rule" answers (e.g.
`V = 200 - 10t`, `C = 80 + 60h`, `y = 3x + 5`) include reordered and lowercase variants. Spot:
break-even linear-beven-m9 9n−180=90 → n=30; linear-beven-m10 Rev 120 vs Cost 145 → −25 loss (B);
linear-piece-m8 200·1.20+80·2.40 = 432.

Minor (sub-P4, not filed): a few one-line "write the equation" answers such as `y = -x + 7`
(y11s-lrr-m5) and `y = 4x - 1` (y11s-lrr-i5) would reject an equivalent reordered form like
`y=7-x` / `y=-1+4x` (reorder not auto-normalised), but the conventional textbook form is the answer
and is accepted; impact negligible.

## managingMoney.ts

- [P4] `vehicle-costs-buying-running`::y11s-vcr-g4 — MCQ has a duplicate option: choices are
  ["$16,000", "$14,000", "$16,000", "$22,000"] (A and C identical). Labelled answer "C" is the
  correct value (15,000 + 3·3,000 − 8,000 = 16,000), and marking is by letter so students are not
  mis-marked, but two options show the correct value. Cosmetic.
- [P4] `vehicle-costs-buying-running`::y11s-vcr-i5 — MCQ duplicate option: ["1080 L", "1080 L",
  "180 L", "108 L"] (A and B identical "1080 L"); answer "B" = 1080 L is correct
  ((18000÷100)·6 = 1080). Marking unaffected.

All computations verified: budgets surplus/deficit, savings-weeks, simple interest I=Prt and total,
comparisons with fees/discounts, credit-card monthly interest = bal·rate/12, BNPL instalments,
GST (×1.10, ÷1.10, ÷11), unit pricing, vehicle fuel (dist/100·rate·price), stamp duty %, total
ownership = purchase + running − resale. Spot: manage-interest-m9 r = 180/3000 = 6%;
manage-gst-i1 132/1.10 = 120; y11s-vcr-i1 (14000/100)·7·1.90 = 1862.

## networksPathsTrees.ts

- [P4] `networks-revision`::y11s-netr-m10 — MCQ duplicate option: choices ["7", "14", "14", "21"]
  (B and C identical "14"); answer "C" = 14 is correct (sum of degrees = 2·edges = 2·7 = 14).
  Marking by letter unaffected.

All graph computations verified against the embedded `NetworkDiagram` edge/weight data:
degrees, edge/vertex counts, tree edges = n−1, shortest paths (e.g. shortestPathDiagram A→D =
A-C-B-D = 2+1+5 = 8; weightedFiveEdge A→D = A-B-D = 8; weightedDelivery P→Q = P-A-Q = 8), MST totals
(mstDiagram AB+BC+BD = 2+3+4 = 9; appMst PQ+QR+QS = 2+4+6 = 12), Euler conditions (0 odd → circuit;
2 odd → path; ≥4 odd → neither, e.g. eulerStar X deg 4 + four deg-1 leaves), back bearings
(±180°, 250→070, 200→020), and bridges (chain = all edges; triangle = none; triangle+pendant = 1;
cycle+pendant = 1; triangle+tail = 2). `shortAnswer` adds unit-suffixed accepted variants.

## probabilityRelativeFrequency.ts

No issues found. Verified equally-likely P=fav/total, complements 1−P, relative frequency,
two-way-table cells/rows/totals, Venn (n(A∪B)=n(A)+n(B)−n(A∩B), neither, only-A), conditional
P(A|B) with restricted denominator, independence P(A|B)=P(A), and tree diagrams (multiply along
branch, add paths, with/without replacement). Fraction answers auto-equate to decimal/percent and
the helper supplies convenience accepted arrays (halves/quarters/...). Spot: prob-table-g2 12/50 =
6/25 = 0.24; prob-cond-m9 40/60 = 2/3; prob-tree-i4 2/5·1/4 = 1/10; prob-tree-m5 P(RB)+P(BR) =
3/10+3/10 = 3/5; prob-tree-m9 1/10+3/10 = 2/5; prob-exam-m7 16/40 = 2/5.

## timeLocation.ts

No issues found. Verified 12h↔24h conversion, elapsed/waiting time incl. midnight crossings, UTC
offset conversions (incl. half-hour Darwin/Adelaide and date rollover), map scale × value, grid
references, true bearings + back bearings, D=S×T and average speed = total dist / total time, and
lat/long hemispheres + 111 km/° + 15°/h UTC. Spot: time-zone-i4 UTC−5→UTC+1 = 08:00+6 = 14:00;
time-bear-i2 250+180... >180 so −180 = 070°; y11s-tlr-i3 22:50→01:30 = 2 h 40 min; time-sdt-i4
total 180 km / 3 h = 60 km/h; time-latlong-m8 75÷15 = UTC−5.

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| applicationsMeasurement.ts | 0 | 0 | 0 | 1 |
| dataAnalysis.ts | 0 | 0 | 0 | 0 |
| earningMoney.ts | 0 | 0 | 0 | 0 |
| formulasEquations.ts | 0 | 0 | 0 | 0 |
| linearRelationships.ts | 0 | 0 | 0 | 0 |
| managingMoney.ts | 0 | 0 | 0 | 2 |
| networksPathsTrees.ts | 0 | 0 | 0 | 1 |
| probabilityRelativeFrequency.ts | 0 | 0 | 0 | 0 |
| timeLocation.ts | 0 | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** | **4** |

### P1 list

None. No question mis-marks a correct student answer.

### Notes

- No `multiPartPractice` arrays, `parts`, or `steps` exist anywhere in these files; every gradeable
  item is a single-answer short response or an A–D MCQ.
- No P3 (multi-part candidacy) findings: prompts that read "find X and Y" (e.g. five-number summary,
  break-even quantity then cost) are already split into separate sequential single-deliverable
  questions sharing a stem rather than buried in one answer — consistent with the Nova standard.
- The four P4s are all cosmetic: three MCQs with a duplicated (but correct-valued) distractor option
  and one garbled-but-correct explanation. None affect marking.
