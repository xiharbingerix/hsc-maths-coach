# Nova Maths Content Quality Audit Tracker

> Objective: track content-quality audits year by year and unit by unit, with concrete fix lists that can be marked complete as we finish them.
> Scope: question quality, unnecessary or answer-revealing LaTeX, diagram/visual needs, and any notable structural content issues discovered during audit.
> Workflow: pick one year, add its units, audit one unit at a time, complete the fixes, then mark the unit complete before moving on.
> Last updated: 2026-06-19

---

## Status Legend

- `pending` - not yet queued for unit-level audit
- `in_progress` - currently being audited or fixed
- `complete` - unit audit complete and fixes applied
- `blocked` - audit started but needs a decision or dependency

---

## Year Queue

| Year / Course | Units added to tracker? | Current audit status | Notes |
|---|---|---|---|
| Year 7 Mathematics | No | pending | |
| Year 8 Mathematics | No | pending | |
| Year 9 Mathematics | No | pending | |
| Year 9 Mathematics Advanced | No | pending | |
| Year 9 Mathematics Core | No | pending | |
| Year 10 Mathematics | No | pending | |
| Year 10 Mathematics Advanced | No | pending | |
| Year 10 Mathematics Core | No | pending | |
| Year 11 Standard | Partial | in_progress | Data Analysis unit (9 lessons) audited + reworked to standard on 2026-06-24 and seeded LIVE — see Unit Audit Board. Other units pending. |
| Year 11 Advanced | No | pending | |
| Year 11 Extension 1 | No | pending | |
| Year 12 Standard 1 | No | pending | |
| Year 12 Standard 2 | No | pending | |
| Year 12 Advanced | No | pending | |
| Year 12 Extension 1 | Yes | in_progress | Units added from current `year-12-extension-1` course state on 2026-06-19; begin with Proof by Mathematical Induction. |
| Year 12 Extension 2 | Yes | complete | All five tracked units complete, including Vectors in 3D on 2026-06-19. |

---

## Active Year: Year 12 Extension 1

Source folder: `lib/lessons/year12Extension1/`

| Unit | Source file | Audit status | Notes |
|---|---|---|---|
| Proof by Mathematical Induction | `lib/lessons/year12Extension1/proofInduction.ts` | in_progress | First queued unit for audit from the current repo state. |
| Introduction to Vectors | `lib/lessons/year12Extension1/vectors.ts` | pending | |
| Inverse Trigonometric Functions | `lib/lessons/year12Extension1/inverseTrig.ts` | pending | |
| Further Calculus Skills | `lib/lessons/year12Extension1/furtherCalculus.ts` | pending | |
| Further Applications of Calculus | `lib/lessons/year12Extension1/calculusApplications.ts` | pending | |
| The Binomial Distribution and Sampling Distribution of the Mean | `lib/lessons/year12Extension1/binomialDistribution.ts` | pending | |
| Rates of Change and Kinematics (Year 11 Ext 1 support unit) | `lib/lessons/year12Extension1/kinematics.ts` | pending | Supplementary unit retained in the current course structure. |

---

## Unit Audit Board

### Year 11 Standard - Data Analysis

Status: `complete` (2026-06-24)

Source file: `lib/lessons/year11Standard/dataAnalysis.ts`; challenge pools in `lib/challenges/year11Standard.ts` (wired course-scoped in `lib/challenges/index.ts`).

Audit focus:
- overall question quality vs PRACTICE_QUESTION_STANDARD + QUESTION_AUTHORING_STANDARD
- missing visual payloads (stats displays presented as text/LaTeX)
- answer-leaking `latex` and prompt-reveals-answer leaks
- mastery cognitive mix + MCQ/typed balance
- add high-difficulty challenge pools and top up to the 19-question standard

#### Findings Summary

- `audit:lessons` started at **58 warnings** across the unit (typed-answer-no-variants 26, prompt-reveals-answer 23, no-visual-payload 9). Now **0**.
- All 9 lessons rewritten to gold standard with **specific step-by-step explanations** (the old `dataAnswer` helper emitted generic keyword feedback) via new local `typedQ` / `mcqQ` helpers.
- Every stats display is now a **real renderer payload** instead of text/`\begin{array}`: barChart, dotPlot, histogram, boxPlot (incl. parallel), stemAndLeaf (incl. back-to-back), and cartesianGraph time-series line graphs (`timeSeriesGraph` helper).
- Fixed a real bug in the stem-and-leaf back-to-back worked example (median was computed from the 4th–5th values instead of 3rd–4th → corrected 26.5 to 23).
- Rebalanced MCQ-heavy lessons (time-series, revision) toward typed production and the documented cognitive mix.
- Added a **high-difficulty (D5/D6) challenge pool per lesson** (course-scoped keys `year-11-standard/<slug>` so the shared `data-displays-summary-statistics` slug does not clobber Year 12 Standard 1) and one `multiPartPractice` exam item in `data-analysis-exam-practice`.

#### Per-lesson result (each 0 warnings)

| Lesson | Visuals added | Challenge pool |
|---|---|---|
| data-displays-summary-statistics | bar, dot | summaryStatsDisplaysChallenge (5) |
| interpreting-data-outliers | dot ×4 | outlierEffectChallenge (4) |
| grouped-data-frequency-tables | histogram | groupedDataChallenge (4) |
| box-plots-five-number-summary | box, parallel box | boxPlotChallenge (5) |
| stem-leaf-plots | stem&leaf, back-to-back | stemLeafChallenge (4) |
| time-series-trend-lines | line graphs | timeSeriesChallenge (4) |
| data-analysis-exam-practice | bar, dot, box, histogram, stem (+multiPart) | dataExamChallenge (4) |
| data-collection-sampling-methods | bar (stratified) | samplingMethodsChallenge (4) |
| data-analysis-revision | dot ×2 | dataRevisionChallenge (4) |

#### Verification

- `audit:lessons` data-analysis unit: **0 warnings** (was 58).
- `tsc --noEmit`: **0 errors** project-wide.
- `test-mastery-quiz`, `registry.test.ts` (7/7), `test-answer-marking` (129/129): all pass.
- Seeded LIVE to Supabase: `seed-question-bank --course=year-11-standard` → **0 warnings, 1501 questions upserted** (idempotent; existing lesson IDs reused, challenge pools inserted).

### Year 12 Extension 2 - Complex Numbers

Status: `complete`

Audit focus:
- overall question quality
- whether question `latex` blocks are needed
- whether question `latex` gives away too much or effectively gives the answer
- whether a diagram is needed and present

#### Findings Summary

- `argand-diagram-geometry` needed clearer visual support on midpoint and perpendicular-bisector locus questions; these now have Argand diagrams where the geometry is part of the reasoning.
- `roots-of-unity` had several typed questions whose `latex` pre-filled the key `\operatorname{cis}` setup or angle computation; these have been trimmed back so students must supply the structure themselves.
- `complex-polynomials` had the most answer-revealing `latex` in the unit, with several prompts already displaying the target factor setup; these now provide givens without performing the key algebra.
- One explanation in `roots-of-unity` overstated the product discussion; it has been tightened to the correct non-zero product result.

#### Fix Checklist

##### A. Add missing Argand/roots visuals

- [x] Add an Argand diagram to the midpoint question in `argand-diagram-geometry`.
- [x] Add an Argand diagram to the `|z-1|=|z+1|` perpendicular-bisector question.
- [x] Add an Argand diagram to the `|z-3i|=|z+3i|` perpendicular-bisector question.
- [x] Add a unit-circle roots diagram to the 6th-roots spacing question in `roots-of-unity`.
- [x] Ensure each visual includes a specific accessibility `description`.

##### B. Remove or trim answer-revealing question LaTeX

- [x] Audit typed questions across `lib/lessons/year12Extension2/complexNumbers.ts` and identify the most answer-revealing `latex` blocks.
- [x] Trim midpoint and distance setup `latex` in `argand-diagram-geometry` where the displayed expression was doing the setup step.
- [x] Trim roots-of-unity `latex` where the displayed `\operatorname{cis}` form already encoded the target angle or root.
- [x] Trim complex-polynomial `latex` where the displayed factor form already gave away the intended quadratic or full factorisation.
- [x] Keep `latex` only where it clarifies givens or notation rather than completing the algebra.

##### C. Improve question quality in `roots-of-unity`

- [x] Reduce formula-feeding typed prompts by replacing full substituted `\operatorname{cis}` lines with lighter givens such as `n` and `k`.
- [x] Tighten the false-statement explanation on the product of roots so it is mathematically correct and concise.

##### D. Final verification for this unit

- [x] Re-read all 6 complex number lessons after edits.
- [x] Recheck edited questions for unnecessary `latex`.
- [x] Recheck edited questions for answer leakage.
- [x] Recheck geometry- and roots-arrangement prompts for missing visual support.
- [x] Mark the `Complex Numbers` unit `complete` in the table above once the fix list is finished.

#### Notes

- Completed in this audit pass:
  1. `argand-diagram-geometry`
  2. `roots-of-unity`
  3. `complex-polynomials`

- Diagram expectation for this unit:
  - `complex-number-arithmetic`: no diagram needed
  - `modulus-argument-conjugate`: diagrams useful on conjugate and locus prompts
  - `argand-diagram-geometry`: diagrams useful on midpoint and locus prompts
  - `polar-form-de-moivre`: no diagram needed
  - `roots-of-unity`: diagrams useful on equal-spacing / unit-circle arrangement prompts
  - `complex-polynomials`: no diagram needed

### Year 12 Extension 2 - Calculus

Status: `complete`

Audit focus:
- overall question quality
- whether question `latex` blocks are needed
- whether question `latex` gives away too much or effectively gives the answer
- whether a diagram is needed and present

#### Findings Summary

- `volumes-of-revolution` was the clearest visual gap in the unit and is now diagram-supported on key region/rotation questions.
- Several typed questions originally used the `latex` field to perform the key setup step for the student; those have been trimmed where they leaked the method.
- `advanced-integration-method-selection` was rebalanced away from recognition-heavy MCQ toward more typed production.
- `reduction-formulae-introduction` needed more variation in how recurrence work was applied; that variation has now been added.

#### Fix Checklist

##### A. Add missing diagrams to `volumes-of-revolution`

- [x] Add visual payloads to questions where students must identify a region, radii, or axis-of-rotation geometry.
- [x] Prioritise `y12e2-vor-i4` in `volumes-of-revolution`.
- [x] Prioritise `y12e2-vor-i5` in `volumes-of-revolution`.
- [x] Prioritise `y12e2-vor-m4` in `volumes-of-revolution`.
- [x] Prioritise `y12e2-vor-m5` in `volumes-of-revolution`.
- [x] Prioritise `y12e2-vor-m8` in `volumes-of-revolution`.
- [x] Prioritise `y12e2-vor-m10` in `volumes-of-revolution`.
- [x] Ensure each visual shows the curve(s), shaded region, bounds, and axis of rotation.
- [x] Ensure each visual includes a specific accessibility `description`.

##### B. Remove or trim answer-revealing question LaTeX

- [x] Audit all typed questions in `lib/lessons/year12Extension2/calculus.ts` and label each question `latex` block as `keep`, `trim`, or `remove`.
- [x] Remove setup-giving LaTeX from `volumes-of-revolution` questions where the prompt already asks students to form the integral.
- [x] Remove transformation-giving LaTeX from `t-substitution-weierstrass` where the algebraic conversion is the main skill being tested.
- [x] Remove or trim completed-square LaTeX in `completing-square-integration` where the prompt asks students to complete the square themselves.
- [x] Keep LaTeX only where it clarifies notation, not where it performs the key step.

##### C. Improve question quality in `advanced-integration-method-selection`

- [x] Reduce the number of recognition-only MCQs across guided, independent, and mastery.
- [x] Add typed prompts requiring students to produce the method, substitution, or first setup line.
- [x] Keep some MCQ for misconception testing, but shift mastery toward production over recognition.
- [x] Recheck the lesson against the `PRACTICE_QUESTION_STANDARD.md` MCQ/typed balance.

##### D. Improve variety in `reduction-formulae-introduction`

- [x] Reduce repeated recurrence-application structure where questions feel too similar.
- [x] Add more variation around base-case choice, odd/even chain selection, and applying supplied reduction results.
- [x] Keep derivations out of auto-marked practice, but strengthen applied reasoning.

##### E. Final verification for this unit

- [x] Re-read all 9 calculus lessons after edits.
- [x] Recheck every question for unnecessary `latex`.
- [x] Recheck every question for answer leakage.
- [x] Recheck whether any graph/region-based prompt still lacks a visual payload.
- [x] Mark the `Calculus` unit `complete` in the table above once the fix list is finished.

#### Notes

- Completed in this audit pass:
  1. `volumes-of-revolution`
  2. `t-substitution-weierstrass`
  3. `completing-square-integration`
  4. `advanced-integration-method-selection`
  5. `reduction-formulae-introduction`

- Diagram expectation for this unit:
  - `advanced-integration-method-selection`: no diagram needed
  - `integration-by-parts-extension`: no diagram needed
  - `reduction-formulae-introduction`: no diagram needed
  - `partial-fractions-integration`: no diagram needed
  - `t-substitution-weierstrass`: no diagram needed
  - `trig-identity-integration`: no diagram needed
  - `completing-square-integration`: no diagram needed
  - `partial-fractions-quadratic`: no diagram needed
  - `volumes-of-revolution`: diagrams required for region/rotation questions

### Year 12 Extension 2 - Mechanics

Status: `complete`

Audit focus:
- overall question quality
- whether question `latex` blocks are needed
- whether question `latex` gives away too much or effectively gives the answer
- whether a diagram is needed and present

#### Findings Summary

- `circular-motion-uniform` had the heaviest concentration of formula-feeding typed prompts; these now show givens without pre-selecting the required formula.
- `forces-inclined-planes` needed the clearest visual support in the unit; incline questions now include diagram payloads where slope geometry is part of the reasoning.
- `resisted-motion` and `projectile-motion-resistance` had a smaller set of typed questions whose `latex` effectively performed the substitution step; those prompts have been trimmed back.

#### Fix Checklist

##### A. Remove or trim answer-revealing question LaTeX

- [x] Audit all typed questions in `lib/lessons/year12Extension2/mechanics.ts` and identify the most answer-revealing `latex` blocks.
- [x] Trim formula-giving `latex` in `circular-motion-uniform` so prompts provide givens without naming the exact formula students must choose.
- [x] Remove substituted-answer `latex` in `resisted-motion` where the key task is evaluating a limit or applying terminal-velocity structure.
- [x] Remove substituted-answer `latex` in `projectile-motion-resistance` where the prompt already tells students what to find from a known expression.
- [x] Trim pulley and inclined-plane `latex` where the line shown previously completed the setup before students had to think.

##### B. Add missing diagrams to inclined-plane questions

- [x] Add incline diagrams to geometry-dependent questions in `forces-inclined-planes`.
- [x] Prioritise `y12e2-fip-g3`.
- [x] Prioritise `y12e2-fip-g4`.
- [x] Prioritise `y12e2-fip-i1`.
- [x] Prioritise `y12e2-fip-i2`.
- [x] Prioritise `y12e2-fip-m4`.
- [x] Prioritise `y12e2-fip-m8`.
- [x] Ensure each visual includes a specific accessibility `description`.

##### C. Final verification for this unit

- [x] Re-read all 6 mechanics lessons after edits.
- [x] Recheck every edited question for unnecessary `latex`.
- [x] Recheck every edited question for answer leakage.
- [x] Recheck whether any incline-geometry prompt still lacks a useful visual payload.
- [x] Mark the `Mechanics` unit `complete` in the table above once the fix list is finished.

#### Notes

- Completed in this audit pass:
  1. `circular-motion-uniform`
  2. `resisted-motion`
  3. `projectile-motion-resistance`
  4. `forces-inclined-planes`

- Diagram expectation for this unit:
  - `rectilinear-motion-calculus`: no diagram needed
  - `simple-harmonic-motion-extended`: no diagram needed
  - `circular-motion-uniform`: no diagram needed
  - `resisted-motion`: no diagram needed
  - `projectile-motion-resistance`: no diagram needed
  - `forces-inclined-planes`: diagrams useful on incline-geometry prompts

### Year 12 Extension 2 - Proof

Status: `complete`

Audit focus:
- overall question quality
- whether question `latex` blocks are needed
- whether question `latex` gives away too much or effectively gives the answer
- whether a diagram is needed and present

#### Findings Summary

- `proof-by-mathematical-induction` had the main quality issue in the unit: multiple explanations contained mojibake and broken symbols, which would distract from the proof structure students are meant to learn.
- `proof-by-contrapositive` included one direct answer leak where the question `latex` field was literally the correct remainder instead of a neutral scaffold.
- A small number of induction typed prompts showed too much of the working line in `latex`; the clearest case has been trimmed so students still need to form the inductive-step expression themselves.
- No diagram-dependent prompts were found in this unit; visual support is not required for the current lesson set.

#### Fix Checklist

##### A. Remove answer-revealing or over-scaffolded LaTeX

- [x] Audit typed questions across `lib/lessons/year12Extension2/proof.ts` for `latex` that gives away the requested answer.
- [x] Replace the answer-leaking `latex` in `y12e2-proof-contra-m10` with a neutral modulo scaffold.
- [x] Trim induction setup `latex` where the displayed line was doing too much of the simplification before the student response.

##### B. Repair content-quality issues in induction

- [x] Re-read all induction teaching text, worked examples, hints, and explanations for mojibake or broken mathematical symbols.
- [x] Correct corrupted induction text so notation, inequalities, and arithmetic read cleanly.
- [x] Recheck induction explanations after cleanup to ensure they still match the intended proof steps.

##### C. Final verification for this unit

- [x] Re-read all 4 proof lessons after edits.
- [x] Recheck edited questions for unnecessary `latex`.
- [x] Recheck edited questions for answer leakage.
- [x] Recheck the unit for any proof prompt that genuinely needs a diagram.
- [x] Mark the `Proof` unit `complete` in the table above once the fix list is finished.

#### Notes

- Completed in this audit pass:
  1. `proof-by-contrapositive`
  2. `proof-by-mathematical-induction`

- Diagram expectation for this unit:
  - `proof-by-contradiction`: no diagram needed
  - `proof-by-contrapositive`: no diagram needed
  - `inequalities-algebraic-proof`: no diagram needed
  - `proof-by-mathematical-induction`: no diagram needed

### Year 12 Extension 2 - Vectors in 3D

Status: `complete`

Audit focus:
- overall question quality
- whether question `latex` blocks are needed
- whether question `latex` gives away too much or effectively gives the answer
- whether a diagram is needed and present

#### Findings Summary

- `equations-of-lines-3d` had the clearest visual gap in the unit; students were being asked to reason about direction vectors and point-on-line checks without a spatial prompt, so key line questions now include 3D diagrams.
- The strongest content-wide issue was over-scaffolded typed `latex`, especially in `dot-product-and-angle`, `vector-applications-exam-practice`, and `vector-curves-circles-spheres`, where the displayed line often pre-selected the exact formula or substitution students were supposed to produce.
- `geometric-proofs-vectors` also had several proof-adjacent typed prompts whose `latex` encoded the target identity; these have been trimmed back to givens so students still need to choose and apply the result themselves.

#### Fix Checklist

##### A. Remove or trim answer-revealing question LaTeX

- [x] Audit typed questions across `lib/lessons/year12Extension2/vectors3D.ts` and identify the most answer-revealing `latex` blocks.
- [x] Trim magnitude and unit-vector `latex` in `vectors-and-points-3d` where the displayed line already performed the substitution.
- [x] Trim angle, scalar-projection, and perpendicularity `latex` in `dot-product-and-angle` so prompts provide givens without pre-writing the target formula line.
- [x] Trim line-equation and point-on-line `latex` in `equations-of-lines-3d` where the displayed expression previously solved the parameter step for the student.
- [x] Trim angle-between-lines `latex` in `vector-applications-exam-practice` where the displayed cosine setup already carried the method.
- [x] Trim conversion `latex` in `vector-curves-circles-spheres` where the displayed Cartesian/vector form already completed the main setup.
- [x] Trim identity-giving `latex` in `geometric-proofs-vectors` where the question should require students to choose the relevant dot-product fact.

##### B. Add missing 3D visuals to line-geometry prompts

- [x] Add a 3D diagram to the two-point direction-vector question `v3l-g4`.
- [x] Add a 3D diagram to the point-on-line verification question `v3l-i4`.
- [x] Recheck `equations-of-lines-3d` for any other line-geometry prompt that genuinely needs visual support.
- [x] Ensure each new visual includes a specific accessibility `description`.

##### C. Final verification for this unit

- [x] Re-read all 6 vectors lessons after edits.
- [x] Recheck edited questions for unnecessary `latex`.
- [x] Recheck edited questions for answer leakage.
- [x] Recheck whether any remaining 3D line prompt still lacks useful visual support.
- [x] Mark the `Vectors in 3D` unit `complete` in the table above once the fix list is finished.

---

## Next Recommended Queue

Current active year:
- `Year 12 Extension 1`

Recommended next unit to audit:
- `Proof by Mathematical Induction`
