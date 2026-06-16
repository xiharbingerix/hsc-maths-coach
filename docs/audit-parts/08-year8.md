# Year 8 Mathematics — Question-Quality Audit

Scope: all `.ts` files under `lib/lessons/year8/` (13 lesson files; `index.ts` has no questions).
Factory helpers: each file defines `answer(...)` / `choice(...)`. `answer` stores `acceptedAnswers = unique([value, ...extra])`; `choice` stores `acceptedAnswers = []` and the labelled option is the correct one. All resolved questions were audited.

Runtime marking note applied throughout: integers/decimals, fraction⇔decimal, percent⇔decimal, trailing units, leading `$`, `x²`⇔`x^2`, and a leading `variable =` prefix all auto-normalize. Surd/π exact-vs-ASCII forms and reorderable expressions do NOT.

## algebraFoundations.ts
No issues found.

## algebraEquations.ts
- [P4] linear-inequalities::y8-aeq-ips-i1 — draft/contradictory explanation. The answer is correctly "NO" (and acceptedAnswers include NO/No/no), but the `explanation` text reads "Is 6 ≤ 5? No — wait, that gives 6 ≤ 5 which is false. Correct: −2(−3) = 6 and 6 > 5, so x = −3 does NOT satisfy…". The mid-sentence "wait" is draft wording a student sees. Math is correct; only the wording is sloppy. Proposed: "−2(−3) = 6, and 6 > 5, so 6 ≤ 5 is false — x = −3 does NOT satisfy the inequality." Evidence: −2 × −3 = 6; 6 ≤ 5 is false → NO.
- [P2] formula-rearrangement::y8-aeq-frm-g2 — answer `(y - 7) / 3` for x in y = 3x + 7. acceptedAnswers add `(y-7)/3` and `\frac{y-7}{3}`. A reasonable student form `y/3 - 7/3` is not accepted, but this is borderline; primary forms covered. Low impact.

## areaCirclesSectors.ts
- [P2] (systemic, exact-π answers) — every exact-area `answer` stores the value with the Unicode `π` glyph (e.g. `36π`, `225π`, `12π`) plus one variant `36π cm^2`. A student typing the ASCII form `36pi` / `36 pi` is NOT in the accepted set (π glyph vs `pi` do not auto-equate). Affects ~40 questions across area-of-circles / sectors / annuli / composite (e.g. y8-acs-aoc-g2 `36π`, y8-acs-sec-g2 `12π`, y8-acs-ann-g2 `64π`). Proposed: add the `<n>pi` ASCII variant to each exact-π answer. Evidence: marking spec lists π exact forms as NOT auto-normalized. (Same gap recurs in circumferenceArcLength.ts and volumeSurfaceArea.ts.)
- Math spot-checks all correct (e.g. aoc-m10 100−25π≈21.46 ✓; sec-i5 r=6√2≈8.49 ✓; ann-m9 √44≈6.63 ✓). No P1.

## circumferenceArcLength.ts
- [P1] perimeter-of-sectors::y8-cal-sec-m8 — MCQ with duplicate options. Choices A and B are BOTH "$325.6$ m"; correct answer is labelled B. Because A is identical to B, the item is ambiguous/mis-keyable (two correct-looking options, grader accepts only B). Current: A = "$325.6$ m", B = "$325.6$ m". Proposed: change one distractor (e.g. A → "$251.2$ m" — the two-semicircle-only error, or "$325.7$ m"); keep correct value 325.6 on a single option. Evidence: two straights 2×100 = 200 m + full circle C = 2π×20 = 125.6 m → 325.6 m; only one option should show this.
- [P3] circumference-applications::y8-cal-app-m10 — single-answer question demanding two deliverables. Prompt: "Find the central angle of the sector AND the perimeter." Stored `answer` is only `90` (the angle); perimeter 178.5 m is buried in the explanation and not gradeable. Proposed: restructure as multiPart with parts {angle = 90°, perimeter = 178.5 m}. Evidence: θ = 78.5/(2π×50)×360 = 90°; P = 78.5 + 100 = 178.5 m.
- [P2] (systemic exact-π) — exact answers like `18π`, `100π`, `3π`, `4π`, `4pi + 16`, `10π + 20` store the π-glyph plus an ASCII variant only for some (e.g. `18pi`, `4pi + 16`, `10pi + 20`). Mixed coverage; several (`3π` at arc-g3 with accepted `3pi`) are fine, but verify each. Low-to-moderate impact.

## geometryAngles.ts
No issues found. (Single-answer items such as y8-geo-qprop-i5 / m8 explicitly say "Find x, then find angle A. Enter angle A," so an atomic answer is intended — not a P3.)

## indexLawsExtension.ts
- [P1] operations-with-scientific-notation::y8-ile-ops-m10 — stored `answer` does not match the requested rounding. Prompt: combined mass "(round coefficient to 3 sig figs)". Stored value `2.466 × 10^27`; explanation correctly computes 2.4663 × 10^27 and rounds to `2.47 × 10^27` (which IS in acceptedAnswers). The primary `answer` 2.466 is both un-rounded (4 sig figs) and inconsistent with the prompt. Current: `2.466 × 10^27`. Proposed: `2.47 × 10^27`. Evidence: 1.898 + 0.5683 = 2.4663; to 3 sf = 2.47 → 2.47 × 10^27 kg.
- [P2] (systemic scientific-notation form) — answers use `× 10^n` with the `×` glyph (e.g. `3.8 × 10^6`) plus `* 10^6` / `e6` variants; coverage is generally good but the negative-exponent items store `10^{-4}` (LaTeX braces) as the literal value — e.g. y8-ile-sns-g2 `9.1 × 10^{-4}` with accepted `9.1 * 10^{-4}`. A student typing `9.1e-4` or `9.1 x 10^-4` (no braces) may be rejected. Moderate impact across small-number lessons.

## linearRelationships.ts
- [P4] interpreting-linear-graphs::y8-lin-int-m9 — factually wrong real-world label (not a mis-mark). Prompt: "Rule: F = 2C + 32 converts Celsius to Fahrenheit. Find F when C = 15." The marking is internally consistent (2(15)+32 = 62, answer 62 ✓), but the real conversion is F = 9⁄5 C + 32, so at C = 15 the true F = 59, not 62. Students see a false statement about a standard formula. Proposed: drop the "converts Celsius to Fahrenheit" claim (treat F as an abstract rule) or change the rule to a non-physics context. Evidence: 9⁄5 × 15 + 32 = 59 ≠ 62.

## numberFinancialMathematics.ts
- [P1] compound-interest-introduction::y8-nfm-cmp-m7 — wrong stored `answer`. Prompt: $6000 at 3% compound, 4 years. Stored `answer` `6752.19`; explanation itself computes (1.03)^4 = 1.12550881 → A ≈ 6753.05 (and acceptedAnswers include 6753.05 / 6753). The primary value 6752.19 is incorrect. Current: `6752.19`. Proposed: `6753.05`. Evidence: 6000 × 1.03^4 = 6000 × 1.12550881 = 6753.05.
- [P1] budgeting-and-money-management::y8-nfm-bud-m9 — wrong stored `answer`. Prompt: income $1400, expenses $1550; reduction needed for a 10% savings rate. Stored `answer` `310`; explanation correctly computes target savings 140, target expenses 1260, reduction 1550 − 1260 = 290 (and "290 also accepted"). The primary value 310 is wrong. Current: `310`. Proposed: `290`. Evidence: 10% × 1400 = 140; 1400 − 140 = 1260; 1550 − 1260 = 290.
- Spot-checks otherwise correct (wag-m10 Chloe 1105 vs Liam 1066 → $19.50 ✓; cmp-m10 4630.50 − 4600 = 30.50 ✓; crd-m9 1000/185 → 6 months ✓).

## numberOperations.ts
No issues found. (frd-i3 4/5 ÷ 2/3 = 6/5 accepts `1 1/5` and `1.2`; frd-m10 23/6 accepts `3 5/6`; all sign/BIDMAS items verified.)

## pythagorasTheorem.ts
No issues found. (Verified roundings: hyp-m9 √97→9.8, short-m7 √203→14.25, short-m10 √80.01→8.9, ctx-m9 √75→8.7; triple families incl. 20-21-29 and 9-40-41 correct.)

## ratiosRates.ts
- [P1] speed-distance-time::y8-rtr-sdt-m10 — wrong stored `answer` plus draft "wait, recalculate" text in the explanation. Prompt: rally 80 km/40 min + 120 km/1 h + 60 km/30 min, with 15-min rests between each stage; average speed incl. rests, 1 dp. Stored `answer` `96.0`; the explanation contains "260 ÷ 2.5 = 104 km/h — wait, recalculate: … total 2.5 h, 260 ÷ 2.5 = 104 km/h. Rounding: 104.0 km/h," and acceptedAnswers are ["104","104.0"]. The primary value 96.0 is wrong AND not in the accepted list. Current: `96.0`. Proposed: `104.0` (and remove the "wait, recalculate" wording). Evidence: stage time 40/60 + 1 + 30/60 = 2 h; rests 2 × 15/60 = 0.5 h; total 2.5 h; 260 ÷ 2.5 = 104 km/h.
- [P2] rates-and-unit-rates::y8-rtr-rat-g2 — answer stored as `$39/h`, with accepted `$39`, `39`. Reasonable student input `39/h` (no `$`) or `$39 per h` may be rejected; primary numeric form covered by trailing-`$`/unit normalization. Low impact.

## statisticsProbability.ts
- [P1] comparing-data-with-box-plots::y8-dat-cmpbxp-m9 — prompt/answer mismatch (flawed item). Prompt: "Which group has the larger IQR?" with IQR A = 40 − 20 = 20 and IQR B = 35 − 15 = 20 — i.e. neither is larger; they are equal. Stored `answer` is `Group A`, yet the explanation states "Both IQRs are equal at 20." acceptedAnswers do include "equal"/"same"/"both 20" (and also "Group A"/"A"), so the keyed primary answer "Group A" is incorrect. Current: `Group A`. Proposed: change the data so one IQR is genuinely larger (e.g. Group B Q3 = 38 → IQR 23), OR set the answer to "equal" and reword the prompt to "Compare the IQRs." Evidence: IQR A = 20, IQR B = 20 → neither larger.
- Spot-checks otherwise correct (qrt-m9 IQR 32−16 = 16 ✓; bxp-m8/m9 9.5 & 21.5 ✓; shp-m8 mean 59.6 − median 55.5 = 4.1 ✓; rel-m9 5/30 → 16.67% ✓).

## volumeSurfaceArea.ts
- [P2] (systemic exact-π) — exact answers (`200π`, `130π`, `222π`, etc.) store the π-glyph plus a rounded decimal variant (e.g. `628`, `697`) but NOT an ASCII `200pi`. A student giving `200pi` is rejected; one giving the rounded decimal `628` is accepted. Same systemic gap as areaCirclesSectors. Proposed: add `<n>pi` variants.
- Math all correct (cv-m9 320π pipe ✓; cs-m9 192π+48π−18π = 222π ✓; cs-m8 staircase 456−96−48 = 312 ✓; cs-m10 554 ✓).

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| algebraFoundations.ts | 0 | 0 | 0 | 0 |
| algebraEquations.ts | 0 | 1 | 0 | 1 |
| areaCirclesSectors.ts | 0 | 1 | 0 | 0 |
| circumferenceArcLength.ts | 1 | 1 | 1 | 0 |
| geometryAngles.ts | 0 | 0 | 0 | 0 |
| indexLawsExtension.ts | 1 | 1 | 0 | 0 |
| linearRelationships.ts | 0 | 0 | 0 | 1 |
| numberFinancialMathematics.ts | 2 | 0 | 0 | 0 |
| numberOperations.ts | 0 | 0 | 0 | 0 |
| pythagorasTheorem.ts | 0 | 0 | 0 | 0 |
| ratiosRates.ts | 1 | 1 | 0 | 0 |
| statisticsProbability.ts | 1 | 0 | 0 | 0 |
| volumeSurfaceArea.ts | 0 | 1 | 0 | 0 |
| **Total** | **6** | **7** | **1** | **3** |

### P1 list
```
circumferenceArcLength.ts | y8-cal-sec-m8 | (MCQ option A) | A="$325.6$ m" duplicates correct B="$325.6$ m" → change A to e.g. "$251.2$ m" | two identical options, B not uniquely correct
indexLawsExtension.ts | y8-ile-ops-m10 | — | 2.466 × 10^27 → 2.47 × 10^27 | prompt says "round to 3 sig figs"; 2.4663 → 2.47, stored value un-rounded
numberFinancialMathematics.ts | y8-nfm-cmp-m7 | — | 6752.19 → 6753.05 | 6000 × 1.03^4 = 6000 × 1.12550881 = 6753.05; explanation already says 6753.05
numberFinancialMathematics.ts | y8-nfm-bud-m9 | — | 310 → 290 | 10% × 1400 = 140; expenses target 1260; 1550 − 1260 = 290; explanation already says 290
ratiosRates.ts | y8-rtr-sdt-m10 | — | 96.0 → 104.0 | 260 km ÷ 2.5 h = 104; stored 96.0 not in acceptedAnswers; explanation has draft "wait, recalculate" → 104
statisticsProbability.ts | y8-dat-cmpbxp-m9 | — | Group A → equal (or fix data) | IQR A = 40−20 = 20, IQR B = 35−15 = 20; neither larger, so keyed "Group A" is wrong
```

### High-impact P2
- Systemic exact-π acceptance gap (areaCirclesSectors.ts, circumferenceArcLength.ts, volumeSurfaceArea.ts): exact answers store the Unicode `π` glyph (e.g. `36π`, `200π`) but not the ASCII `36pi` / `200pi` form; only a rounded-decimal variant is accepted for some. Students typing the ASCII π form of an exact answer will be mis-marked across ~60+ questions. Fix: add `<n>pi` (and `<n> pi`) variants to every exact-π answer.
- Scientific-notation negative-exponent form (indexLawsExtension.ts small-number lessons): values stored as `9.1 × 10^{-4}` (LaTeX braces) with only `* 10^{-4}` variant; `9.1e-4` / `9.1 x 10^-4` may be rejected.
