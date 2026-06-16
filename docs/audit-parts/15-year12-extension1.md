# Year 12 Extension 1 — Lesson Catalog Audit

Scope: every gradeable question (`guidedPractice`, `independentPractice`, `masteryQuiz`,
`multiPartPractice`) in all `.ts` files under `lib/lessons/year12Extension1/`.
Marking model per `lib/answerMarking.ts`: numeric/fraction/percentage/coordinate/ratio auto-equate;
**backslashes, `\pi`/`pi`/`π`, `\sin`/`sin`, and algebraic reordering are NOT normalised.**

---

## proofInduction.ts

No issues found. All MCQ keys and short typed answers (`2k+3`, `7m+1`, `24`, etc.) recompute correctly.

## vectors.ts

No issues found. Magnitudes, dot products, projections, and accepted exact/plain forms all consistent.

## inverseTrig.ts

No issues found. Inverse-trig values, derivatives, and integral-recognition MCQs all correct; exact
`pi/6`-style answers carry both `pi/` and `\pi/` accepted forms.

## furtherCalculus.ts

- [P1] trig-integrals::y12e1-fcalc-trig-m7 — MCQ "Which definite integral equals 1?" has TWO correct
  options. Current key: C `∫₀^{π/2} cos x dx` = [sin x]₀^{π/2} = 1. But D `∫₀^{π/2} sin x dx` =
  [−cos x]₀^{π/2} = −cos(π/2)+cos(0) = 0+1 = **1** as well. Two correct choices → ambiguous.
  Proposed: change distractor D's upper limit (e.g. `∫₀^{π/4} sin x dx` = 1−√2/2 ≈ 0.293) so only C = 1.
- [P1] further-calculus-exam-practice::y12e1-fcalc-exam-g2 — "Evaluate ∫₀^{π/2} sec²x dx", answer `1`.
  This integral **diverges**: antiderivative tan x → +∞ as x→π/2⁻ (tan(π/2) undefined). The
  explanation even admits "tan(pi/2) is infinite, but the standard evaluation … approaches 1," which
  is false. Current: 1. Proposed: change the upper limit to π/4 (then tan(π/4)−tan 0 = 1, matching the
  intended answer), or replace the question. As written the answer is wrong/undefined.
- [P2] Systematic accepted-form gap — antiderivative answers whose only non-LaTeX accepted form still
  contains a backslash trig/log command (`\sin`, `\cos`, `\ln`), so the natural student typing
  (`1/4 sin(4x)+C`, `-cos x + C`, `1/2 ln|2x-1|+C`) is rejected (backslash is not normalised):
  trig-integrals: `y12e1-fcalc-trig-i1` (`-\cos x+C` only), `-m1` (`\sin x+C`), `-m6` (`\tan x+C`).
  simple-substitution: `y12e1-fcalc-sub-g1` (`1/4\sin(4x)+C`), `-g3` (`\ln`), `-i1` (`\cos`), `-i2`
  (`\ln`), `-m2` (`\ln`), `-m5` (`\cos`). exam-practice: `y12e1-fcalc-exam-g3` (`1/5\sin(5x)+C`),
  `-m2` (`0.5\ln|2x+1|+C`). Proposed: add a plain-word accepted form (e.g. `1/4sin(4x)+C`,
  `-cos x+C`, `1/2ln|2x-1|+C`).
- [P4] integration-by-parts::y12e1-fcalc-parts-i5 — prompt says "Find the antiderivative." but `latex`
  defaults to "Choose the best option." and choices `["x","e^x","\\ln x","x e^x"]` are not
  antiderivatives (the item really asks which factor to take as u/v). Prompt/choices mismatch.

## calculusApplications.ts

- [P2] Systematic accepted-form gap — typed answers containing `\pi` (e.g. `72\pi`, `30\pi`, `-100\pi`,
  `48\pi`, `24\pi`, `14\pi`, `2\pi`) only match a student who literally types `72\pi`. Natural forms
  `72pi` / `72π` are NOT normalised (no `\pi`↔`pi`↔`π` rule). Affected typed items include
  `y12e1-calcapp-rates-g2/g3/i1/m2/m3/m9`, `y12e1-calcapp-shm-g2/m10`, `y12e1-calcapp-expgd-m10`,
  `y12e1-calcapp-exam-m7`. Proposed: add plain `…pi` (and ideally `…π`) accepted forms.
  (Note: `-5/6`, `-15/4`, `1.5`, `300/e`, etc. auto-equate and are fine.)
  All numeric computations (related rates, growth/decay, SHM, exam practice) recompute correctly; the
  ladder `multiPartPractice` (`calcapp-mp-1`) is correct and well structured.

## kinematics.ts

- [P1] kinematics-exam-practice::y12e1-kin-ep-i2 — x(t)=t²−6t+8 on [0,5], v=0 at t=3. x(0)=8,
  x(3)=9−18+8=−1, x(5)=25−30+8=3. Distance [0,3]=|−1−8|=9, [3,5]=|3−(−1)|=4, **total = 13 m**. The
  explanation itself states "Total = 13 m," but `answer` and `acceptedAnswers` are `"12"`/`["12 m"]`.
  Current: 12. Corrected: **13**. (Students who answer 13 are mis-marked wrong.)
- [P4] Pervasive mojibake in student-facing explanations (and section-header comments) throughout this
  file: `âˆ’` (for −), `Â²`/`Â³` (for ²/³), `âˆ«` (for ∫), e.g. `y12e1-kin-va-g3` ("4 m/sÂ²"),
  `-va-i2` ("-6 m/sÂ²"), `-int-g2` ("2tÂ² âˆ’ 2t"), and most integration explanations. Also stray
  mojibake inside some `acceptedAnswers` (`"âˆ’6"`, `"âˆ’4"`). Cosmetic but visible to students in
  explanations. All numeric answers other than ep-i2 are correct.

## projectileMotion.ts

- [P4] Mojibake in successCriteria / teaching / explanations of Lessons 1–2
  (projectile-equations-setup, projectile-max-height): `cosÎ¸`, `sinÎ¸`, `Â½gtÂ²`, `áº(t)`, `âˆ’`,
  `Ã—`, `m/sÂ²`. Lessons 3–4 (range, exam) are clean (proper θ, ×, −). No P1/P2/P3 — every position,
  velocity, max-height, time-of-flight, range, and speed value recomputes correctly (Pythagorean
  triples kept clean).

## binomialDistribution.ts

- [P4] Three prompts use `\le`/`\ge` inside ordinary JS strings, which collapse to `le`/`ge` (invalid
  JS escapes drop the backslash), corrupting the displayed text: `y12e1-binomial-prob-g2`
  ("P(X\le2)…P(X\ge3)" → "P(Xle2)…P(Xge3)"), `y12e1-binomial-prob-i1` ("P(X\ge2)"),
  `y12e1-binomial-exam-i2` ("P(X\le1)…P(X\ge2)"). Proposed: escape as `\\le`/`\\ge` or use ≤/≥.
  All binomial probability/mean/variance values and the `binom-mp-1` multi-part (n=10, Var=2.5,
  P(X=0)=1/1024) are correct.

## samplingDistribution.ts

- [P1] sampling-distribution-mean::y12e1-samp-i2 — MCQ "Var(x̄) for n=16" (μ=80, σ²=64) = 64/16 = 4.
  Choices are `["8","4","4","64"]` → **B and C are both "4"**, and the key is C. The duplicated value
  means B is equally correct, so a student choosing B is mis-marked. Current: choices A=8,B=4,C=4,D=64.
  Proposed: replace the duplicate B with a genuine distractor (e.g. "16" or "0.25"); keep answer = 4.
  All CLT/standard-error computations and the worked-example diagrams are otherwise correct.

## areasVolumes.ts

No issues found. Areas between curves, disk/washer volumes all recompute correctly; answers use plain
`36pi` form with `36π`/`36\pi` accepted, and the worked-example shaded-region diagram matches.

## polynomialZeroes.ts

- [P1] calculus-applications-polynomial-zeroes::y12e1-pz-m4 — "For P(x)=(x−3)²(x+1)³, the y-intercept
  is:" key **A = "−9"**, but P(0)=(−3)²(1)³ = 9·1 = **9** = choice **B**. The explanation even reads
  "…so P(0) = 9," contradicting the key. Current: A (−9). Corrected: **B (9)**. (Explanation also
  contains draft "Wait —" text — P4.)
- [P1] calculus-applications-polynomial-zeroes::y12e1-pz-i5 — "The leading term of P(x)=−2(x−1)²(x+3)
  is:" choices `["−2x²","−2x³","2x³","−2x³"]`. The correct leading term is −2·x²·x = **−2x³**, but
  **B and D are both "−2x³"** (key is D). Duplicate correct option → ambiguous. Proposed: replace the
  duplicate B with a wrong distractor (e.g. "−6x³"); keep answer = D (−2x³).
- [P4] calculus-applications-polynomial-zeroes::y12e1-pz-g4 — diagram `description` says "Both ends
  fall to −∞" then correctly states "as x → −∞, P → −∞; as x → +∞, P → +∞" (degree 5, +leading). The
  "both ends fall" phrase is inconsistent with the (correct) per-end behaviour. Cosmetic.

## newtonCooling.ts

No issues found. Every Q(t)=A+Ce^{kt} evaluation, equilibrium/stability MCQ, and the cooling/
carrying-capacity diagrams recompute correctly.

## slopeFields.ts

No issues found. All slope readings, equilibrium values, stability classifications, and `de` diagram
coefficients are consistent.

## inverseTrigProperties.ts

No issues found. Complementary identity, composite evaluations (sin(cos⁻¹), tan(sin⁻¹)), negative-input
Q2 reasoning, and `sqrt(1-x^2)` general form all correct; `pi/N` answers carry plain + `π` accepted
forms. (Minor P4: WE2 diagram description calls the hypotenuse the "adjacent side" — worked example, not graded.)

## vectorsProjection.ts

No issues found. Projection scalar λ, projection/perpendicular vectors, |a⊥|, and the decomposition
diagram all recompute correctly.

## vectorsMotion.ts

No issues found. Velocity/acceleration components, speeds (`2sqrt(5)`, `20`), projectile max-height/
flight/range/impact, and trajectory diagram all correct; surd/coordinate answers carry plain forms.

## proofInductionRevision.ts

No issues found. Sigma sums, combinations, A^{k+1}±A^k factoring, and factorial simplifications all
correct; `(k+2)(k+1)` accepts both factor orderings.

## inverseTrigRevision.ts

No issues found. Exact values, ASTC quadrant signs, and double-angle results all correct; surd answers
carry plain `sqrt(...)` + `√` forms.

## binomialRevision.ts

No issues found. Complement/addition/multiplication rules, combinations, and E(X) all correct.

## vectorsRevision.ts

No issues found. Magnitudes (Pythagorean triples), distances, and bearing components all correct.

## furtherCalculusRevision.ts

No issues found. Chain/product/quotient differentiation, power-reduction identities, and substitution
all correct; trig/exponential answers carry plain accepted forms.

## calculusApplicationsRevision.ts

No issues found. Standard integrals, FTC definite integrals, and separable-DE solutions all correct;
exact answers (`ln(2)`, `e-1`, `2sqrt(5)`, `e^3-1`) carry plain accepted forms.

---

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| proofInduction.ts | 0 | 0 | 0 | 0 |
| vectors.ts | 0 | 0 | 0 | 0 |
| inverseTrig.ts | 0 | 0 | 0 | 0 |
| furtherCalculus.ts | 2 | 1* | 0 | 1 |
| calculusApplications.ts | 0 | 1* | 0 | 0 |
| kinematics.ts | 1 | 0 | 0 | 1* |
| projectileMotion.ts | 0 | 0 | 0 | 1* |
| binomialDistribution.ts | 0 | 0 | 0 | 1* |
| samplingDistribution.ts | 1 | 0 | 0 | 0 |
| areasVolumes.ts | 0 | 0 | 0 | 0 |
| polynomialZeroes.ts | 2 | 0 | 0 | 1 |
| newtonCooling.ts | 0 | 0 | 0 | 0 |
| slopeFields.ts | 0 | 0 | 0 | 0 |
| inverseTrigProperties.ts | 0 | 0 | 0 | 1 |
| vectorsProjection.ts | 0 | 0 | 0 | 0 |
| vectorsMotion.ts | 0 | 0 | 0 | 0 |
| proofInductionRevision.ts | 0 | 0 | 0 | 0 |
| inverseTrigRevision.ts | 0 | 0 | 0 | 0 |
| binomialRevision.ts | 0 | 0 | 0 | 0 |
| vectorsRevision.ts | 0 | 0 | 0 | 0 |
| furtherCalculusRevision.ts | 0 | 0 | 0 | 0 |
| calculusApplicationsRevision.ts | 0 | 0 | 0 | 0 |
| **TOTAL** | **6** | **2** (clusters, *=many items) | **0** | **6** |

\* P2 entries are systematic clusters spanning many question IDs; P4 mojibake entries each cover the
whole file's explanations.

### P1 list

```
furtherCalculus.ts | y12e1-fcalc-trig-m7 | — | key C only → both C and D = 1 | MCQ "which integral =1": ∫₀^{π/2}sin x dx (D) also = 1; make only one option equal 1
furtherCalculus.ts | y12e1-fcalc-exam-g2 | — | 1 → divergent/undefined | ∫₀^{π/2}sec²x dx diverges (tan(π/2)=∞); intended limit is π/4 (tan(π/4)−tan0=1)
kinematics.ts | y12e1-kin-ep-i2 | — | 12 → 13 | x=t²−6t+8 on [0,5], v=0@t=3: |−1−8|+|3−(−1)| = 9+4 = 13 m (explanation already says 13)
samplingDistribution.ts | y12e1-samp-i2 | — | choices B=C="4" → ambiguous | Var(x̄)=64/16=4; options A8,B4,C4,D64 duplicate the correct value at B; replace B
polynomialZeroes.ts | y12e1-pz-m4 | — | A(−9) → B(9) | P(0)=(0−3)²(0+1)³ = 9·1 = 9 = choice B (explanation confirms 9)
polynomialZeroes.ts | y12e1-pz-i5 | — | B=D="−2x³" → ambiguous | leading term −2·x²·x = −2x³; options B and D both "−2x³"; replace B with a wrong distractor
```
