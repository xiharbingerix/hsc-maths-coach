# Nova Maths Content Quality Audit Tracker

> Objective: track content-quality audits year by year and unit by unit, with concrete fix lists that can be marked complete as we finish them.
> Scope: question quality, unnecessary or answer-revealing LaTeX, diagram/visual needs, and any notable structural content issues discovered during audit.
> Workflow: pick one year, add its units, audit one unit at a time, complete the fixes, then mark the unit complete before moving on.
> Last updated: 2026-07-31

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
| Year 11 Advanced | Yes | in_progress | Whole-course question-quality audit complete 2026-07-30; the current build has 126 seeded lessons / 2,408 rows and the final verdict remains FAIL. Graph Transformations, Trigonometry and Measure of Angles, Trigonometric Identities and Equations, Exponential and Logarithmic Functions, Integration, Introduction to Differentiation, Exponential and Logarithmic Calculus, Trigonometric Calculus, and Working with Functions are complete and seeded LIVE. The latest completed unit has 304 standard questions, 96 D4-D5 mastery tasks, zero shallow explanations, exact repeats, or scoped source-audit findings, and 319 active live rows with no stale or retired mastery IDs. The current course distribution is D1 210 / D2 726 / D3 959 / D4 258 / D5 254 / D6 1. See `docs/audits/year-11-advanced-question-quality-audit.md`. |
| Year 11 Extension 1 | No | pending | |
| Year 12 Standard 1 | No | pending | |
| Year 12 Standard 2 | No | pending | |
| Year 12 Advanced | Yes | in_progress | **Teaching-quality** AI-judge pass complete 2026-06-30 (report only, no edits): 90 lessons, B:2 C:18 D:26 F:44 — 78% D/F. See `docs/audits/year-12-advanced-teaching-quality-audit.md` and the Unit Audit Board entry below. Fix work (P1 calculus core) not yet started. NB this is a *teaching* audit, distinct from the question audits tracked elsewhere. |
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

### Year 11 Advanced — Question Quality

Status: `in_progress` (whole-course audit complete 2026-07-30; Graph
Transformations complete; Trigonometry and Measure of Angles complete;
Trigonometric Identities and Equations complete; Exponential and Logarithmic
Functions complete; Integration complete; Introduction to Differentiation
complete; Exponential and Logarithmic Calculus complete; Trigonometric Calculus
complete; Working with Functions complete)

Source: all live `year-11-advanced` lesson, multi-part, challenge, and exam questions.
Full report: `docs/audits/year-11-advanced-question-quality-audit.md`.

#### Findings summary

- **126 seeded lessons / 2,368 rows** audited.
- **Mastery design fails:** 1,149 of 1,156 mastery questions are D3; only 7 are D4
  and none are D5-D6.
- **52 lessons** have 17 questions instead of the required 19.
- **91 lessons** fall outside the 2-3 mastery-MCQ range; **38** have more than two
  recognition-style mastery prompts by screening proxy.
- **44 exact duplicate groups** occur in standard practice; 38 mastery rows repeat
  an earlier guided or independent item.
- **230 short explanations**, **102 unformatted-math findings**, **243 source-level
  typed-answer variant warnings**, and **2 prompt-reveals-answer warnings**.
- `y11adv-cir-m10` is ambiguous and not uniquely markable.
- Visual layer is strong: 278 rows with payloads and zero required visuals missing.
- High-tier layer is mostly sound but too sparse and too separate from normal
  mastery.

#### Completed remediation

- [x] **Graph Transformations** — 5 seeded lessons / 95 standard questions + 2
      multipart, remediated and seeded LIVE on 2026-07-30.
  - Replaced all 50 mastery questions with a per-lesson D3/D4/D5 distribution of
    4/3/3.
  - Limited every mastery set to three diagnostic MCQs and seven constructed
    responses.
  - Added inspectable task classifications, diagnostic intent, and per-distractor
    misconception mappings.
  - Removed exact repeats and expanded all remaining short explanations, leaving
    zero duplicate standard stimuli and zero explanations below 40 characters in
    the unit.
  - Added automated unit gates for structure, task diversity, difficulty
    persistence, accepted answers, feedback depth, uniqueness, and self-contained
    stimuli.
- [x] **Degrees and Radians** (`degrees-and-radians-concept`) — 19 standard
      questions remediated and seeded LIVE on 2026-07-30.
  - Replaced all ten mastery questions with a 4 D3 / 3 D4 / 3 D5 progression.
  - Added procedural, problem-solving, analytical, investigative, and synthesis
    tasks, with three misconception-mapped MCQs.
  - Removed the exact mastery repeat, repaired shallow feedback, and added a
    full-turn radian model.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Converting Degrees to Radians** (`converting-degrees-radians`) — 19
      standard questions remediated and seeded LIVE on 2026-07-30.
  - Replaced ten number-swapped mastery conversions with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added signed/reflex conversions, reverse inference, method comparison, bounded
    investigation, motion transfer, and calibration-error analysis.
  - Added a conversion sector model and removed both shallow-feedback findings.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Converting Radians to Degrees** (`converting-radians-degrees`) — 19
      standard questions remediated and seeded LIVE on 2026-07-30.
  - Replaced ten number-swapped mastery conversions with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added error analysis, reverse inference, method comparison, signed synthesis,
    bounded investigation, angular-motion transfer, and calibration-error analysis.
  - Added a conversion sector model and repaired both shallow-feedback findings.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Arc Length** (`arc-length-radian-measure`) — 19 standard questions
      remediated and seeded LIVE on 2026-07-30.
  - Replaced ten number-swapped mastery calculations with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added error analysis, equivalent-method comparison, linked-path modelling,
    bounded investigation, signed pulley motion, and a two-constraint design task.
  - Added five authored mastery visuals while retaining the worked-example
    diagrams.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Sector Area** (`sector-area-radian-measure`) — 19 standard questions
      plus one multipart question remediated and seeded LIVE on 2026-07-30.
  - Replaced ten number-swapped mastery calculations with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added error analysis, equivalent-method comparison, area-preserving redesign,
    bounded investigation, an annular sweep, and simultaneous constraints.
  - Added nine authored mastery visuals and strengthened feedback across all three
    parts of the retained visual multipart task.
  - Live verification: 20 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Special-Triangle Exact Values** (`exact-trig-values-special-triangles`) —
      19 standard questions remediated and seeded LIVE on 2026-07-30.
  - Replaced ten recall-heavy mastery questions with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added derivation, error analysis, reverse parameters, exact radical algebra,
    bounded investigation, paired-triangle modelling, and a linear-system task.
  - Added four authored mastery visuals, including a paired-triangle comparison.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Unit-Circle Exact Values** (`exact-trig-values-unit-circle`) — 19
      standard questions remediated and seeded LIVE on 2026-07-30.
  - Replaced ten recall-heavy mastery questions with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added coordinate error analysis, reverse inference, parameter constraints,
    exact coordinate geometry, bounded investigation, and determinant modelling.
  - Added six authored unit-circle mastery visuals.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **All-Quadrant Unit Circle** (`unit-circle-all-quadrants`) — 19 standard
      questions remediated and seeded LIVE on 2026-07-30.
  - Replaced ten direct evaluations with a 4 D3 / 3 D4 / 3 D5 progression across
    five task types.
  - Added sign-error analysis, reverse inference, signed-coordinate modelling,
    bounded periodic investigation, angular motion, and filtered solution sets.
  - Added seven authored unit-circle mastery visuals.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Parent Trigonometric Graphs** (`graphing-sin-cos-tan`) — 19 standard
      questions remediated and seeded LIVE on 2026-07-30.
  - Replaced transformation-heavy and recall-only mastery items with a
    4 D3 / 3 D4 / 3 D5 progression across five task types.
  - Added linked-feature identification, discontinuity diagnosis, reverse
    inference, function comparison, bounded investigation, and multi-period
    synthesis.
  - Added five authored sine, cosine, or tangent graph payloads.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Amplitude and Period** (`trig-graph-amplitude-period`) — 19 standard
      questions remediated and seeded LIVE on 2026-07-30.
  - Replaced repeated coefficient-reading items with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added graph reconstruction, reverse parameters, simultaneous extrema,
    bounded family investigation, Ferris-wheel distance, and integer design.
  - Added four authored Cartesian sinusoidal mastery payloads.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Trigonometric Graph Transformations** (`trig-graph-transformations`) —
      19 standard questions remediated and seeded LIVE on 2026-07-30.
  - Replaced isolated feature-reading items with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added curve reconstruction, reverse extrema inference, constrained design,
    bounded phase investigation, contextual modelling, and periodic constraints.
  - Added three authored Cartesian sinusoidal mastery payloads.
  - Live verification: 19 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Right-Angle Trigonometry Applications**
      (`right-angle-trig-applications`) — 19 standard questions plus two multipart
      tasks remediated and seeded LIVE on 2026-07-30.
  - Replaced shallow routine mastery items with a 4 D3 / 3 D4 / 3 D5 progression
    across five task types.
  - Added error diagnosis, linked-observer modelling, equivalent-method analysis,
    route-component synthesis, bounded bearing investigation, and a two-stage
    drone model.
  - Added six mastery visuals and visuals for both multipart tasks; also corrected
    a pre-existing rope-length answer from 36 m to \(12\sqrt3\) m.
  - Live verification: 24 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Sine Rule, Cosine Rule and Area Formula**
      (`sine-rule-cosine-rule`) — 19 standard questions plus two multipart tasks
      remediated and seeded LIVE on 2026-07-30.
  - Replaced routine number swaps with a 4 D3 / 3 D4 / 3 D5 progression across
    five task types.
  - Added structural rule selection, included-angle error diagnosis,
    method comparison, composite area, bounded investigation, nested-triangle
    transfer, and constrained design.
  - Added visuals to all ten mastery questions and both multipart tasks.
  - Live verification: 21 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Ambiguous Case of the Sine Rule** (`ambiguous-case-sine-rule`) — 19
      standard questions plus two multipart tasks remediated and seeded LIVE on
      2026-07-30.
  - Replaced repeated triangle-count classifications with a 4 D3 / 3 D4 / 3 D5
    progression across five task types.
  - Added incomplete-rule diagnosis, exact dual solutions, candidate validity,
    method comparison, bounded investigation, paired-area synthesis, and reverse
    interval design.
  - Added visuals to all ten mastery questions and both multipart tasks.
  - Live verification: 21 active rows, ten new mastery IDs, and zero retired IDs.
- [x] **Unit Exam Practice** (`trigonometry-measure-angles-exam-practice`) — 19
      standard questions plus one multipart task remediated and seeded LIVE on
      2026-07-30.
  - Replaced isolated recall mastery with a 4 D3 / 3 D4 / 3 D5 synoptic
    progression across five task types.
  - Added multi-step error diagnosis, graph reconstruction, method comparison,
    circular-coordinate synthesis, bounded transformation investigation, reverse
    sector design, and circular-measure-to-phase transfer.
  - Added nine mastery visuals and a graph for the multipart task.
  - Live verification: 20 active rows, ten new mastery IDs, and zero retired IDs.

Unit completion gate:

- [x] 15/15 seeded subtopics use 4 guided + 5 independent + 10 mastery.
- [x] 150 mastery questions use 60 D3 / 45 D4 / 45 D5, with three MCQs and all
      five task types in every set.
- [x] Zero exact standard-question repeats, zero explanations below 40
      characters, and complete constructed-response variants.
- [x] 296 active live rows, 150 new mastery IDs, 82 visual mastery payloads, zero
      retired mastery IDs, and zero stale unit rows.

#### Fix backlog

- [ ] P0 — repair ambiguous/answer-leaking questions, rendering, explanations, and
      accepted-answer coverage.
- [ ] P1 — rebuild every mastery set to the required cognitive mix and 10-question
      count; start with graph transformations, trigonometry, exp/log, and calculus.
  - [x] Graph Transformations.
  - [x] Trigonometry and Measure of Angles — complete: `degrees-and-radians-concept`,
        `converting-degrees-radians`, `converting-radians-degrees`,
        `arc-length-radian-measure`, `sector-area-radian-measure`,
        `exact-trig-values-special-triangles`,
        `exact-trig-values-unit-circle`, `unit-circle-all-quadrants`,
        `graphing-sin-cos-tan`, `trig-graph-amplitude-period`,
        `trig-graph-transformations`, `right-angle-trig-applications`,
        `sine-rule-cosine-rule`, `ambiguous-case-sine-rule`, and
        `trigonometry-measure-angles-exam-practice` (15/15 subtopics).
  - [x] Trigonometric Identities and Equations — complete: all 9 subtopics.
    - [x] `trigonometric-equations` — 19 standard questions, 4 D3 / 3 D4 / 3 D5
          mastery ramp, three diagnostic MCQs, all five task types, zero shallow
          explanations or repeats, and complete constructed-answer variants.
          Seeded LIVE on 2026-07-31: 22 active subtopic rows, ten new mastery IDs,
          zero retired mastery IDs, and zero stale unit rows.
    - [x] `trigonometric-identities` — 19 standard questions, 4 D3 / 3 D4 /
          3 D5 mastery ramp, three diagnostic MCQs, all five task types, zero
          shallow explanations or repeats, and complete constructed-answer
          variants. Seeded LIVE on 2026-07-31: 19 active subtopic rows, ten new
          mastery IDs, zero retired mastery IDs, and zero stale unit rows.
    - [x] `related-angle-identities` — 19 standard questions, 4 D3 / 3 D4 /
          3 D5 mastery ramp, three diagnostic MCQs, all five task types, four
          visual mastery payloads, zero shallow explanations or repeats, and
          complete constructed-answer variants. Seeded LIVE on 2026-07-31:
          19 active rows, ten new mastery IDs, zero retired mastery IDs, and
          zero stale unit rows.
    - [x] `complementary-angle-identities` — 19 standard questions plus two
          multipart tasks, a 4 D3 / 3 D4 / 3 D5 mastery ramp, all five task
          types, and an authored complementary-angle triangle. Seeded LIVE:
          21 active rows and zero stale unit rows.
    - [x] `trig-equations-basic` — 19 standard questions, a 4 D3 / 3 D4 /
          3 D5 mastery ramp, all five task types, two visual mastery tasks, and
          two pre-existing cross-subtopic repeats removed. Seeded LIVE:
          19 active rows and zero stale unit rows.
    - [x] `trig-equations-advanced` — 19 standard questions, a 4 D3 / 3 D4 /
          3 D5 mastery ramp spanning zero-product branches, both square-root
          signs, method comparison, parameters, investigation, and synthesis.
          Seeded LIVE: 19 active rows and zero stale unit rows.
    - [x] `trig-identities-proof-strategies` — 19 standard questions, a
          4 D3 / 3 D4 / 3 D5 mastery ramp spanning valid proof decisions,
          counterexamples, coefficient matching, conjugates, and domain
          restrictions. Seeded LIVE: 19 active rows and zero stale unit rows.
    - [x] `reciprocal-trig-ratios` — 19 standard questions plus two multipart
          tasks, a 4 D3 / 3 D4 / 3 D5 mastery ramp, two unit-circle mastery
          visuals, and repaired multipart feedback/variants. Seeded LIVE:
          21 active rows and zero stale unit rows.
    - [x] `trigonometric-identities-equations-exam-practice` — 19 standard
          questions, a 4 D3 / 3 D4 / 3 D5 integrated mastery ramp, all five
          task types, and a graph-supported periodic model. Seeded LIVE:
          19 active rows and zero stale unit rows.
    - Completed-unit gate: 171 standard questions, 90 new mastery IDs,
      36 D3 / 27 D4 / 27 D5 across mastery, exactly three diagnostic MCQs per
      lesson, all five task types per lesson, zero shallow explanations, zero
      exact cross-subtopic repeats, complete constructed-answer variants,
      322/322 repository tests passing, 303 course visual rows, and zero
      required visuals missing.
  - [x] Exponential and Logarithmic Functions — complete:
        `index-laws-exponential-functions`, `logarithms-logarithm-laws`,
        `solving-exponential-logarithmic-equations`,
        `graphing-exponential-logarithmic-functions`,
        `exponential-logarithmic-modelling`, and
        `exponential-logarithmic-functions-exam-practice` (6/6 subtopics).
    - All 114 standard questions retain 4 guided + 5 independent + 10 mastery.
    - All 60 new mastery tasks use a per-lesson 4 D3 / 3 D4 / 3 D5 ramp,
      exactly three diagnostic MCQs, seven constructed responses, all five
      task classifications, diagnostic intent, and per-distractor misconception
      mappings.
    - Mastery now includes reverse index/base/parameter inference, invalid-law
      diagnosis, strict logarithm domains, method comparison, bounded
      investigation, inverse-graph coordinate production, graph-supported
      synthesis, discrete-versus-continuous modelling, intervention models, and
      integrated exam tasks.
    - Added eleven visual mastery payloads across exponential/logarithmic graphs
      and a half-life table; repaired all retained graph multipart feedback and
      answer variants.
    - Seeded LIVE on 2026-07-31: 116 active unit rows, all 60 new mastery IDs,
      24 D3 / 18 D4 / 18 D5 across mastery, and zero stale unit rows.
    - Completed-unit gate: zero shallow explanations, zero exact cross-subtopic
      repeats, complete constructed-answer variants, 326/326 repository tests
      passing, mastery selector and TypeScript passing, 313 course visual rows,
      and zero required visuals missing.
  - [x] Integration — complete:
        `primitives-and-antidifferentiation`, `standard-antiderivatives`,
        `initial-value-problems`, `definite-integrals`,
        `fundamental-theorem-of-calculus`, `areas-under-curves`,
        `reverse-chain-rule-integration`, and `trapezoidal-rule`
        (8/8 subtopics).
    - All 152 standard questions retain 4 guided + 5 independent + 10 mastery.
    - All 80 new mastery tasks use a per-lesson 4 D3 / 3 D4 / 3 D5 ramp,
      exactly three diagnostic MCQs, seven constructed responses, all five
      task classifications, diagnostic intent, and per-distractor misconception
      mappings.
    - Mastery now includes primitive-family structure, reciprocal domains,
      condition consistency, reconstruction from second derivatives, signed
      accumulation, variable-bound FTC reasoning, parameterised areas,
      reverse-chain diagnosis, unequal trapezoidal spacing, and rate-to-amount
      modelling.
    - Added eight area mastery graphs and ten trapezoidal mastery diagrams;
      repaired retained constructed-answer variants and shared worked feedback.
    - Seeded LIVE on 2026-07-31: 152 active unit rows, all 80 new mastery IDs,
      32 D3 / 24 D4 / 24 D5 across mastery, 64 superseded mastery rows retired,
      and zero stale unit rows.
    - Completed-unit gate: zero shallow explanations, zero exact cross-subtopic
      repeats, complete constructed-answer variants, authored difficulty
      persistence, 330/330 repository tests passing, mastery selector,
      TypeScript and lint passing, 317 course visual rows, and zero required
      visuals missing.
  - [x] Introduction to Differentiation — complete:
        `rates-of-change-gradients`, `derivatives-first-principles`,
        `differentiating-polynomial-functions`, `product-rule`,
        `quotient-rule`, `chain-rule-basics`,
        `stationary-points-first-derivative-test`,
        `second-derivative-concavity`, `tangents-normals-applications`,
        `curve-sketching-calculus`, and
        `introduction-differentiation-exam-practice` (11/11 subtopics).
    - All 209 standard questions retain 4 guided + 5 independent + 10 mastery;
      the unit also retains ten multipart rows.
    - All 110 new mastery tasks use a per-lesson 4 D3 / 3 D4 / 3 D5 ramp,
      exactly three diagnostic MCQs, seven constructed responses, all five task
      classifications, diagnostic intent, and per-distractor misconception
      mappings.
    - Mastery now spans secant-versus-tangent reasoning, first-principles
      diagnosis, polynomial reconstruction, product and quotient structure,
      nested chain rules, derivative-root multiplicity, concavity
      counterexamples, tangent families, full feature maps, and synoptic motion
      modelling.
    - Repaired retained constructed-answer variants, multipart worked feedback,
      and escaped LaTeX commands.
    - Seeded LIVE on 2026-07-31: 219 active unit rows, all 110 new mastery IDs,
      44 D3 / 33 D4 / 33 D5 across mastery, 448 historical rows inactive, and
      zero stale unit rows.
    - Completed-unit gate: zero shallow explanations, zero exact cross-subtopic
      repeats, complete constructed-answer and multipart variants, authored
      difficulty persistence, 334/334 repository tests passing, mastery
      selector, TypeScript and lint passing, 311 course visual rows, and zero
      required visuals missing.
  - [x] Exponential and Logarithmic Calculus — complete:
        `differentiating-exponential-functions`,
        `differentiating-logarithmic-functions`,
        `integrating-exponential-functions`,
        `integrating-reciprocal-functions`,
        `applications-exp-log-calculus`, and
        `exp-log-calculus-exam-practice` (6/6 subtopics).
    - All 114 standard questions retain 4 guided + 5 independent + 10 mastery.
    - All 60 new mastery tasks use a per-lesson 4 D3 / 3 D4 / 3 D5 ramp,
      exactly three diagnostic MCQs, seven constructed responses, all five task
      classifications, diagnostic intent, and per-distractor misconception
      mappings.
    - Mastery now spans chain-rule diagnosis, domain-aware logarithmic
      differentiation and integration, coefficient and parameter recovery,
      equal-area investigation, inverse-function gradient comparison,
      initial-value problems, optimisation, model reconstruction, and synoptic
      derivative-to-function synthesis.
    - Repaired terse inherited prompts and explanations, a multiple-choice item
      with two correct answers, and an incorrect canonical tangent equation.
    - Seeded LIVE on 2026-07-31: 114 active unit rows, all 60 new mastery IDs,
      24 D3 / 18 D4 / 18 D5 across mastery, 48 superseded mastery rows inactive,
      and zero stale unit rows.
    - Completed-unit gate: zero shallow explanations, zero exact cross-subtopic
      repeats, complete constructed-answer variants, authored difficulty
      persistence, 337/337 repository tests passing, mastery selector,
      TypeScript and lint passing, 308 course visual rows, and zero required
      visuals missing.
  - [x] Trigonometric Calculus — complete:
        `differentiating-sin-cos`, `differentiating-trig-chain-rule`,
        `integrating-sin-cos`, `integrating-trig-chain-rule`,
        `applications-trig-calculus`, and
        `trig-calculus-exam-practice` (6/6 subtopics).
    - All 114 standard questions retain 4 guided + 5 independent + 10 mastery.
    - All 60 new mastery tasks use a per-lesson 4 D3 / 3 D4 / 3 D5 ramp,
      exactly three diagnostic MCQs, seven constructed responses, all five task
      classifications, diagnostic intent, and per-distractor misconception
      mappings.
    - Mastery now spans derivative cycles, radians-versus-degrees diagnosis,
      frequency investigations, nonlinear chain rules, parity and symmetric
      integrals, reverse-chain scaling, monotonicity and extrema, motion,
      half-angle methods, parameter recovery, and derivative-to-function
      synthesis.
    - Added two authored signed-area graphs; repaired retained prompts,
      explanations, and answer variants; corrected an ambiguous antiderivative
      MCQ and the inherited value of
      \(\int_0^{\pi/6}\sin(3x)\,dx\) from \(2/3\) to \(1/3\).
    - Seeded LIVE on 2026-07-31: 114 active unit rows, all 60 new mastery IDs,
      24 D3 / 18 D4 / 18 D5 across mastery, 48 superseded mastery rows inactive,
      and zero stale unit rows.
    - Completed-unit gate: zero shallow explanations, zero exact cross-subtopic
      repeats, complete constructed-answer variants, authored difficulty
      persistence, 340/340 repository tests passing, mastery selector,
      TypeScript and lint passing, 307 course visual rows, and zero required
      visuals missing.
  - [x] Working with Functions — complete:
        `function-notation-domain-range`, `linear-quadratic-cubic-functions`,
        `polynomial-reciprocal-functions`, `absolute-value-functions`,
        `odd-even-functions`, `algebraic-techniques`,
        `quadratic-equations-discriminant`, `linear-functions`,
        `constructing-using-functions`, `direct-inverse-variation`,
        `circles-semicircles`, `piecewise-defined-functions`,
        `composite-functions`, `completing-the-square`,
        `quadratic-inequalities`, and
        `working-with-functions-exam-practice` (16/16 subtopics).
    - All 304 standard questions retain 4 guided + 5 independent + 10 mastery.
    - All 160 new mastery tasks use a per-lesson 4 D3 / 3 D4 / 3 D5 ramp,
      exactly three diagnostic MCQs, seven constructed responses, all five task
      classifications, diagnostic intent, and per-distractor misconception
      mappings.
    - Mastery now spans domain and range intersections, finite differences,
      factor multiplicity, reciprocal holes and asymptotes, absolute-value
      parameter families, odd/even decomposition, indices and surds,
      discriminants and Vieta's formulas, line concurrency, modelling and
      variation, circle reconstruction, piecewise continuity, composition
      domains, optimisation, parameterised inequalities, and synoptic synthesis.
    - Added ten authored Cartesian graphs; strengthened inherited prompts and
      explanations; completed constructed-answer variants; and removed an
      ambiguity from a reciprocal-function parameter task before publication.
    - Seeded LIVE on 2026-07-31: 319 active unit rows, all 160 new mastery IDs,
      64 D3 / 48 D4 / 48 D5 across mastery, 653 historical rows inactive,
      zero active retired mastery IDs, and zero stale unit rows.
    - Completed-unit gate: zero shallow explanations, zero exact cross-subtopic
      repeats, zero deterministic scoped source-audit findings, complete
      constructed-answer variants, authored difficulty persistence, 344/344
      repository tests passing, mastery selector, TypeScript and lint passing,
      307 course visual rows, and zero required visuals missing.
- [ ] P2 — add bounded problem-solving, analytical, investigative,
      guided-discovery, and synthesis tasks.
- [ ] P3 — make target misconceptions and per-distractor wrong-method mappings
      inspectable.

### Year 12 Advanced - Teaching Quality (whole-course AI-judge pass)

Status: `in_progress` (audit complete 2026-06-30, report only — no teaching content edited)

Source: all 90 active lessons via `year12AdvancedRouteUnits` (`lib/year12AdvancedRoutes.ts`). Standard applied: `docs/FEYNMAN_TEACHING_STANDARD.md` (Advanced tier). Full report: `docs/audits/year-12-advanced-teaching-quality-audit.md`.

Audit focus (distinct from the question audits in this tracker):
- teaching prose, latexBlocks, and worked examples vs the Feynman teaching standard
- mental model, intuition-before-notation, the "why"/derivation, principle-first worked steps, misconception framework

#### Findings summary

- Grade distribution (verify-adjusted): **B 2 / C 18 / D 26 / F 44** — **70/90 (78%) D or F, 0 A**.
- One repeated failure pattern, not 90 distinct ones. Post-verify core-fail frequency: **C3 missing "why"/derivation 63**, **C5 worked steps restate not reason 53**, **C6 formula-drop 43**, **C1 no mental model 41**, **C2 formula-before-intuition 21**. Secondary near-universal: C7 79, C11 68, C10 64.
- Worst unit cluster: **calculus core C1–C3 = 17 F-grade lessons** (highest exam weight).
- Method robustness: adversarial verify upheld 66 of 78 flagged grades (12 softened); source spot-checks confirmed verdicts grounded.
- Data bug surfaced: two lessons in `ma-c3-applications-of-differentiation` share id+slug `optimisation` (one shadows the other) — fix independently.

#### Fix backlog (not started)

- [ ] P1 — Rework calculus core (C1/C2/C3) 17 F lessons: add mental model + expected derivation + reasoning in worked steps.
- [ ] P2 — Remaining 27 F lessons (Functions/Graphing, Trig, Integral, Exp/Log, Stats, Financial).
- [ ] P3 — 26 D lessons (usually a single missing-"why").
- [ ] P4 — Course-wide secondary lift: concrete-before-abstract (C7) + wire existing diagram renderers into visual lessons (C11).
- [ ] Fix duplicate `optimisation` id/slug.

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
