# Nova Maths — Full Catalog Question Audit (2026-06-16)

Catalog-wide audit of question/answer quality across **all 11 courses** in the Nova Maths lesson
bank (`lib/lessons/**`, ~1,656 gradeable items), plus the external import batches in
`question-batches/`. Covers mathematical correctness of every answer/accepted-answer/hint/
explanation, MCQ key/distractor validity, and whether questions should be multi-part.

> Companion: the `question-batches/*.json` import files were audited separately in
> [NOVA_MATHS_QUESTION_AUDIT_2026-06-16.md](./NOVA_MATHS_QUESTION_AUDIT_2026-06-16.md) (1 wrong
> answer + 3 accepted-answer gaps fixed there). This report covers the TypeScript lesson catalog —
> the bulk of the question bank.

## Method

A fleet of auditing agents (one per course / per dense root module) each re-derived every gradeable
answer in `guidedPractice` / `independentPractice` / `masteryQuiz` / `multiPartPractice` (and their
`parts`/`steps`), read each file's factory helpers to evaluate the *resolved* questions, and judged
against the runtime marker `lib/answerMarking.ts` and the project authoring standard. Per-course
findings are in [`docs/audit-parts/`](./audit-parts/) (`01`–`16`). **Every P1 fix below was then
re-verified independently (exact arithmetic recomputed) before editing.**

Severity: **P1** wrong answer (mis-marks students) · **P2** correct answer wrongly rejected ·
**P3** should be multi-part · **P4** cosmetic.

## Result

**38 wrong answers (P1) found and fixed** across 7 of the courses; the other 4 courses were clean of
wrong answers. All edits verified with `npx tsc --noEmit` (exit 0) and `npm run audit:lessons`
(PASS, 0 failures).

| Course / module | P1 (fixed) | Notes |
|---|---:|---|
| Year 7 | 0 | clean (minor P4 wording only) |
| Year 8 | 6 | finance/measure rounding, sci-notation, 2 MCQ bugs |
| Year 9 | 1 | MCQ with two correct options |
| Year 10 | 0 | clean (1 P2, 1 P3) |
| Year 11 Standard | 0 | clean (P4 only) |
| Year 11 Advanced | 0 | clean (P2 only) |
| Year 11 Extension | 0 | clean |
| Year 12 Advanced (root modules) | 6 | integralCalculus ×3, financialMathematics ×3 (+cascade) |
| Year 12 Standard 1 | 4 | credit-card daily-compounding cluster |
| Year 12 Standard 2 | 13 | cosine-rule/elevation rounding ×8, 4 MCQ bugs, 2 SA/vol |
| Year 12 Extension 1 | 6 | 1 divergent integral, 1 distance, 4 MCQ bugs |
| Year 12 Extension 2 / Y11 Ext | 2 | 1 sign-wrong integral, 1 MCQ duplicate |
| **Total** | **38** | |

Three recurring failure modes account for most P1s: (1) **compound-interest / daily-compounding
arithmetic slips** (a wrong growth factor copied into `answer` while the explanation often had the
right value), (2) **trig rounding** in the last digit (e.g. `72.15` vs `72.10`), and (3) **MCQ
options with two identical/both-correct choices** (a student selecting the equivalent correct option
was mis-marked).

---

## All 38 answer fixes (P1)

### Year 12 Advanced — root modules
| File | id | Fix | Check |
|---|---|---|---|
| integralCalculus.ts | definite-mastery-5 | `0 → 3` | ∫₋₁²(4x−1)dx = [2x²−x]₋₁² = 6−3 = 3 |
| integralCalculus.ts | trap-mastery-5 | `14 → 12.5` | ½[1+2(2+5)+10] = 12.5 |
| integralCalculus.ts | apps-mastery-4 | `20 → 16` | ∫₁³(6t−4)dt = 15−(−1) = 16 |
| financialMathematics.ts | annuity-ind-5 | `976.91 → 976.97` | 120·((1.005)⁸−1)/0.005 = 976.97 |
| financialMathematics.ts | compare-mastery-5 | `3669.08 → 3668.82` | 3000(1.048)⁴+50 = 3668.82 (cascaded to compare-mastery-6/10 + worked ex.) |
| financialMathematics.ts | mixed-fin-guided-3 | `1105.54 → 1105.43` | 1800(0.85)³ = 1105.425 → 1105.43 |

*Cascade also fixed:* compare-mastery-10 `22.56 → 22.30` (graded); worked examples `3669.08→3668.82`,
`607.54→607.55`, `1105.54→1105.43`; compare-ind-1 explanation `2193.77→2193.78`.

### Year 8
| File | id | Fix | Check |
|---|---|---|---|
| circumferenceArcLength.ts | y8-cal-sec-m8 | MCQ: option A duplicated correct B → A=`251.2 m` | track = 2π(20)+200 = 325.6 m (B) |
| indexLawsExtension.ts | y8-ile-ops-m10 | `2.466×10²⁷ → 2.47×10²⁷` | prompt says round coeff. to 3 s.f.; 2.4663→2.47 |
| numberFinancialMathematics.ts | y8-nfm-cmp-m7 | `6752.19 → 6753.05` | 6000(1.03)⁴ = 6753.05 (explanation already had it) |
| numberFinancialMathematics.ts | y8-nfm-bud-m9 | `310 → 290` | 1550 − (1400−140) = 290 |
| ratiosRates.ts | y8-rtr-sdt-m10 | `96.0 → 104.0` | 260 km ÷ 2.5 h = 104 |
| statisticsProbability.ts | y8-dat-cmpbxp-m9 | bumped Group A Q3 `40→45` | original data gave equal IQRs (20=20); now IQR A=25 makes keyed "Group A" correct |

### Year 9
| File | id | Fix | Check |
|---|---|---|---|
| linearRelationshipsC.ts | lrc-ppl-m1 | MCQ: option D was also perpendicular → D=`−3 and −1/3` | C: 5·(−1/5)=−1; old D: −3·(1/3)=−1 (both correct) |

### Year 12 Standard 1 — credit cards (A = P(1+r/365)ⁿ)
| id | Fix | Check |
|---|---|---|
| y12s1-cc-g1 | `8.58 → 8.70` | 500(1+0.21/365)³⁰ − 500 = 8.70 |
| y12s1-cc-i1 | `11.11 → 11.13` | 1500(1+0.18/365)¹⁵ − 1500 = 11.13 |
| y12s1-cc-m1 | `27.33 → 27.54` | 2500(1+0.20/365)²⁰ − 2500 = 27.54 |
| y12s1-cc-m9 | `1209.49 → 1209.19` | 1000(1+0.19/365)³⁶⁵ = 1209.19 |

*Also fixed (1-cent + worked example):* cc-i3 `37.74→37.73`, cc-m5 `4.82→4.81`, "Layla" worked example `32.88→33.12`.

### Year 12 Standard 2
| File | id | Fix | Check |
|---|---|---|---|
| measurementSurfaceAreaVolume.ts | y12s2-sa-i2 | `971.0 → 967.6` | closed cyl TSA = 308π = 967.6 cm² |
| measurementSurfaceAreaVolume.ts | y12s2-comp-i5 | `916.3 → 1047.2` | hemisphere(r5)+cyl(r5,h10) = 261.8+785.4 = 1047.2 cm³ |
| measurementSurfaceAreaVolume.ts | y12s2-comp-m7 | MCQ: A & C both 160π + draft text → key A, C=distractor | 2×π(16)(5) = 160π |
| algebraicRelationships.ts | y12s2-alr-i1 | MCQ: B & C both "x=6" → B=distractor | 2x+9=21 → x=6 (key C) |
| trigonometryRatiosRates.ts | y12s2-sca-g4 | `43.6 → 44.4` | √(35²+50²−2·35·50·cos60°) = √1975 = 44.4 |
| trigonometryRatiosRates.ts | y12s2-rate-exam-i1 | `43.6 → 44.4` | duplicate of sca-g4 |
| trigonometryRatiosRates.ts | y12s2-sca-i2 | `75.8 → 77.9` | √(80²+95²−2·80·95·cos52°) = 77.9 |
| trigonometryRatiosRates.ts | y12s2-sca-m2 | `31.2 → 30.7` | √(25²+40²−2·25·40·cos50°) = 30.7 |
| trigonometryRatiosRates.ts | y12s2-sca-g2 | `895 → 896` | ½·48·62·sin37° = 895.5 → 896 |
| trigonometryRatiosRates.ts | y12s2-eld-m6 | `72.15 → 72.10` | 120·tan31° = 72.10 |
| trigonometryRatiosRates.ts | y12s2-eld-m2 | `26.60 → 26.59` | 50·tan28° = 26.585 → 26.59 |
| trigonometryRatiosRates.ts | y12s2-eld-m8 | `136.02 → 136.03` | 85/tan32° = 136.03 |
| trigonometryRatiosRates.ts | y12s2-rrv-i5 | MCQ key `B → D` | 3.5 m = 350 cm AND 3500 mm → "Both B and C" (D) |

### Year 12 Extension 1
| File | id | Fix | Check |
|---|---|---|---|
| furtherCalculus.ts | y12e1-fcalc-trig-m7 | MCQ: C & D both = 1 → changed D to ∫₀^π sin (=2) | C: ∫₀^{π/2}cos = 1; old D: ∫₀^{π/2}sin = 1 |
| furtherCalculus.ts | y12e1-fcalc-exam-g2 | bound `π/2 → π/4` | ∫₀^{π/2}sec²x **diverges**; intended ∫₀^{π/4}sec²x = 1 (answer now valid) |
| kinematics.ts | y12e1-kin-ep-i2 | `12 → 13` | dist = \|−1−8\|+\|3−(−1)\| = 9+4 = 13 m |
| samplingDistribution.ts | y12e1-samp-i2 | MCQ: B & C both "4" → B=distractor | Var(x̄)=64/16=4 (key C) |
| polynomialZeroes.ts | y12e1-pz-m4 | MCQ key `A → B` | P(0)=(−3)²(1)³ = 9 (option B) |
| polynomialZeroes.ts | y12e1-pz-i5 | MCQ: B & D both "−2x³" → B=distractor | leading term −2x³ (key D) |

### Year 12 Extension 2 / Year 11 Extension
| File | id | Fix | Check |
|---|---|---|---|
| calculus.ts | y12e2-pf-i5 | `ln(4/3) → −ln3` | ∫₀¹4/((x−2)(x+2))dx = [ln\|x−2\|−ln\|x+2\|]₀¹ = −ln3 (integrand negative on [0,1]) |
| complexNumbers.ts | cx6-m8 | MCQ: B & C identical → B=distractor (roots i,−i,−2) | (z−i)(z+i)(z−2)=z³−2z²+z−2 (key C) |

---

## Accepted-answer gaps (P2)

**Applied** (small, clearly-equivalent forms; additive so cannot mis-accept):
- differentialCalculus `rates-guided-1` → added `ds/dt`, `6t+2`; `mixed-guided-1` → added `differentiation`/`differentiate`/`differentiating`.

**Recommended (not applied — best fixed once at the marker, not per-question):** several courses have
systemic gaps the runtime normalizer doesn't bridge:
- **`π` glyph vs ASCII `pi`** — ~60 Year 8 circle/sector/volume answers store `200π` but reject `200pi`; same in Year 12 Ext 1 `calculusApplications` (`\pi` forms).
- **`≤`/`≥` vs `<=`/`>=`** — Year 12 Standard 2 `linear-inequalities-modelling` typed answers store the Unicode symbol; `x<=4` is rejected.
- **Plain-typed antiderivatives** — Year 12 Ext 1 `furtherCalculus` `\sin`/`\cos`/`\ln` answers reject `-cos x + C` / `1/4 sin(4x)+C`.
- Reorderable/expanded algebraic forms: Year 11 Advanced `chain-g3/i5` (`4x³+8x`), Year 10 `alg-fr-m7` (unfactored denominator), functionsGraphingTechniques (`7+2x`).

> **Single high-leverage fix:** extend `normaliseText` in `lib/answerMarking.ts` to map `π↔pi`,
> `≤↔<=`, `≥↔>=` (and consider `\sin→sin` etc.). One change closes the largest P2 clusters
> catalog-wide. Run `npm run test:answer-marking` after. (Deferred here as it's a marker change, not
> a data fix, and carries its own regression surface.)

## Multi-part candidates (P3) — recommended, not applied

- Year 10 `algebraicTechniques::alg-fr-m7` — "simplify AND state the restriction" bundles two deliverables; split into `parts`.
- Year 8 `fractions-decimals` convert-then-compare items (see companion report's Year-8 batch analogue).

Both genuinely multi-deliverable but already accept their compound answer, so they don't mis-mark today — restructuring is a clarity/gradability improvement.

## Cosmetic (P4) — logged, mostly not applied

Draft wording ("Wait", "Hmm let me recompute") was removed where it sat inside a P1 explanation
being fixed (e.g. pz-m4, sdt-m10, pf-i5). Remaining standalone P4s (un-cleaned draft text, mojibake
in some Ext-1 kinematics/projectile explanations, a few broken-LaTeX teaching blocks, the `0.67`
lenient accept for `2/3`) are itemised in [`docs/audit-parts/`](./audit-parts/) `07`–`16` for a
follow-up cleanup pass.

## Validation

- `npx tsc --noEmit` → **exit 0** (all 19 edited files compile).
- `npm run audit:lessons` → **PASS, 0 failures** (pre-existing warnings unchanged).
- Every P1 arithmetic re-verified with exact (Decimal) computation before editing.
- Line endings normalized to LF; `git diff` confirms only the intended content changed.
