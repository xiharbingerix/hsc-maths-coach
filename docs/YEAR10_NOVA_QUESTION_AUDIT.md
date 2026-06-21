# Year 10 Mathematics — Nova Question Quality Audit

**Auditor role:** Senior mathematics curriculum reviewer / assessment designer
**Standard:** Nova Maths Question Quality Standard (educational value, not technical validity)
**Date:** 2026-06-21
**Scope:** All 10 Year 10 lesson files (~1,200 practice questions). Lessons 1–8 read in full; `trigonometry.ts` and `measurement.ts` audited by representative sampling with answer verification.
**Method:** Exception-based — full per-question Nova blocks for PATCH/REJECT items; PASS items summarised. No questions were rewritten (identification only).

---

## Course Distribution (aggregate estimate)

- **PASS:** ~87%
- **PATCH:** ~13%
- **REJECT:** 0

No mathematically incorrect answers were found in anything read or verified — including the hard items (ambiguous-case sine rule, repeated roots, cyclic-quadrilateral reasoning, k³ volume scaling, Venn "neither" calculations). Every PATCH is an *educational-value* issue, not a correctness bug.

| Lesson | Assess /10 | Diag /10 | Calib /10 | Diverse /10 | Note |
|---|---|---|---|---|---|
| algebraicTechniques | 8.5 | 8.5 | 8 | 8 | Best procedural design; dense error-ID |
| equationsSimultaneous | 8.5 | 8.5 | 7.5 | 8 | Strong; D1 linear leaks into mastery |
| geometryProofs | 8 | 8 | 7 | 7.5 | Best diagnostic; proof *construction* not assessed |
| trigonometry | 8 | 8 | 8 | 7.5 | D4 ambiguous case; bearings duplication |
| nonLinearRelationships | 8 | 7 | 7.5 | 8 | Best-calibrated mastery |
| measurement | 8 | 7.5 | 7.5 | 7.5 | Similar-figures scaling is the highlight |
| financialMathematics | 7.5 | 6.5 | 6.5 | 7 | Most authentic; factor-recall duplication |
| linearRelationships | 7.5 | 6.5 | 6.5 | 7.5 | Gradient extraction weak; `eol-m7` defect |
| statisticsData | 7 | 6.5 | 6 | 7 | Scatter/causation strong; rest procedural |
| probability | 7 | 6 | 6 | 7 | Valid & complete; weakest distractors |

---

## 1. `probability.ts`

5 sub-lessons (multi-stage events, tree diagrams, Venn diagrams, two-way tables, conditional probability), 95 questions. All checked answers valid.

### Exception questions

**`y10-prob-ms-m3`** — Status: **PATCH** — Overall: 2/5
*Scores:* Richness 1 · Diagnostic 1 · Difficulty 2 · Transfer 1 · Decision 1 · Misconception 2 · Authenticity 2 · Markability 5
- **Primary Weakness:** Trivial vocabulary recall ("which phrase means the counter is returned?") in a mastery quiz; distractors *"Mutually exclusive"* / *"Outside both sets"* are off-topic and implausible.
- **Failed Standards:** Diagnostic Value; Difficulty Accuracy (D1 in mastery); weak distractors.
- **Difficulty:** Assigned mastery (≈D3) vs actual **D1**.
- **Recommendation:** Replace distractors with plausible with/without-replacement confusions, or demote to guided and promote a calculation item.

**`y10-prob-venn-m2`, `y10-prob-venn-m6`, `y10-prob-cond-m2`** — Status: **PATCH** — same pattern: definition-recall MCQs (intersection / neither-region / "what changes in conditional probability") in mastery pools. D1. Demote to guided or rewrite as "spot the misapplied region/denominator."

**`y10-prob-ms-g1` / `y10-prob-ms-i1` / `y10-prob-ms-m1` / `y10-prob-ms-m4`** — Status: **PATCH** (set) — Overall: 2/5
- **Primary Weakness:** Four identical "multiply the two stage counts" questions (4×2, 3×4, 3×6, 5×4); two sit in mastery.
- **Failed Standards:** Transfer (direct repetition); difficulty overstated for mastery; near-duplicate.
- **Recommendation:** Keep one as guided fluency; convert a mastery instance to a reverse problem ("24 combined outcomes, a 6-face die — how many spinner sectors?").

**`y10-prob-tree-g2`, `y10-prob-venn-g4`, `y10-prob-table-g4`, `y10-prob-cond-g3`** — Status: PASS-with-note — vocabulary recall in *guided* pools (acceptable as warm-up) but uniformly low distractor quality.

### Systemic markability note
`probabilityVariants()` auto-generates decimal/percent forms via `value*100`. Terminating answers are fine (`4/25`→`0.16`,`16%`); non-terminating fractions push ugly truncated floats (`1/12`→`"0.08333333333333333"`,`"8.333333333333332%"`). A student entering `0.083` is marked wrong while the exact fraction is accepted — decimal acceptance is silently inconsistent. Fix centrally: round generated decimals + accept a tolerance, or suppress decimal variants for non-terminating answers.

### Lesson summary
- **Distribution (95):** PASS ~83 · PATCH ~12 · REJECT 0
- **Systemic issues:** procedural-fluency heavy; mastery pools don't consistently step up; weak MCQ distractors (1 plausible + 2 off-topic); number-swap duplication.
- **Benchmark items (the model):** `y10-prob-venn-m9`, `y10-prob-cond-m7/m9/m10`, `y10-prob-table-m10` — misconception-mapped distractors.
- **Scores:** Assessment 7 · Diagnostic 6 · Calibration 6 · Diversity 7

---

## 2. `statisticsData.ts`

5 sub-lessons (quartiles/IQR, box plots, standard deviation, scatter/correlation, lines of best fit), 95 questions. All checked answers valid.

### Exception questions

**`y10-stat-fit-g1` / `i1` / `i2` / `m1` / `m4`** — Status: **PATCH** (set) — Overall: 2/5
*Scores:* Richness 1 · Diagnostic 2 · Difficulty 2 · Transfer 2 · Decision 1 · Misconception 1 · Authenticity 2 · Markability 5
- **Primary Weakness:** Five questions are the same operation — substitute `x` into a given `y=mx+b`. Identical items populate guided, independent **and** mastery with no escalation. Prompt says "use the displayed line of best fit" while only an equation is shown.
- **Failed Standards:** Mathematical Richness; Decision-Making; Transfer; near-duplicate.
- **Recommendation:** Keep one as guided; convert mastery instances to require reading slope/intercept off a plotted line, or judging interpolation-vs-extrapolation reliability *and* computing.

**`y10-stat-iqr-m5`, `y10-stat-sd-m5`, `y10-stat-scatter-m6`, `y10-stat-fit-m5`** — Status: **PATCH** — Overall: 2/5 — definition-recall MCQs ("which statistic measures spread of the middle half?") in mastery; off-topic distractors. Demote to guided or rewrite as "spot the error."

**`y10-stat-fit-i4` / `m7`** (negative residuals) — Status: PASS (strong) — flagged only to contrast with `g4`/`m3` (positive residuals) which don't exercise the reversed-order misconception. Suggest more residual items with predicted > actual.

### Lesson summary
- **Distribution (95):** PASS ~81 · PATCH ~14 · REJECT 0
- **Systemic issues:** calculation/recall split with little middle ground; D3 reasoning lives almost entirely in the scatter sub-lesson; mastery pools don't escalate; low context authenticity in numerical sub-lessons.
- **Benchmark items:** `y10-stat-scatter-m8` (confounding third variable), `scatter-m9` (investigate outlier), `box-m8` (same median+range, different IQR), `sd-m10`.
- **Scores:** Assessment 7 · Diagnostic 6.5 · Calibration 6 · Diversity 7

---

## 3. `financialMathematics.ts`

4 sub-lessons (simple interest, compound interest, depreciation, comparing investments), 76 questions. Most authentic lesson — contexts genuinely drive the maths. All checked answers valid.

### Exception questions

**`y10-fin-ci-g3` / `i3` / `m2`** (growth factor) and **`y10-fin-dep-g3` / `i3` / `m1`** (depreciation factor) — Status: **PATCH** (two sets) — Overall: 2/5
*Scores:* Richness 1 · Diagnostic 2 · Difficulty 2 · Transfer 1 · Decision 1 · Misconception 2 · Authenticity 2 · Markability 5
- **Primary Weakness:** "Which factor represents an X% increase/decrease?" is single-step `1±r` recall, appearing 3× each (once per tier), no escalation.
- **Recommendation:** Keep one per concept in guided; replace duplicates with the reverse item (factor → rate), which `ci-m10`/`dep-m10` already do well.

**`y10-fin-comp-m1`, `comp-g2`, `comp-i2`, `comp-m3`** — Status: **PATCH** (set) — bare net-gain subtraction inside the *comparing-investments* lesson, requiring none of the "fair comparison after fees" decision the lesson teaches. Fold subtraction into a comparison.

**`y10-fin-ci-m5`, `y10-fin-dep-m5`** — Status: **PATCH** — formula-identification ("which formula models compound growth?") recall in mastery. Convert to "which model represents *this scenario*?" like `ci-m9`/`dep-i5`.

### Lesson summary
- **Distribution (76):** PASS ~58 · PATCH ~18 · REJECT 0
- **Systemic issues:** bimodal difficulty (comparison MCQs are D3–D4; interest/depreciation/net-gain lean D1–D2); within-tier duplication; underused misconception assets.
- **Benchmark items:** `y10-fin-comp-m8/m9`, `si-m8`, `ci-m8` (compute two finals, apply fees, decide); `ci-m10` (1.06 ≠ 1.06%), `dep-m10` (0.82 = 18% loss).
- **Scores:** Assessment 7.5 · Diagnostic 6.5 · Calibration 6.5 · Diversity 7 · Authenticity ~4 (best in course)

---

## 4. `linearRelationships.ts`

5 sub-lessons (gradient/y-intercept, parallel/perpendicular, midpoint/distance, equation of line, linear modelling), 95 questions. All checked answers valid.

### Exception questions

**`y10-eol-m7`** — Status: **PATCH** (high priority — visible defect) — Overall: 3/5 (maths fine; explanation broken)
- **Primary Weakness:** Student-facing explanation reads *"y = 3x − 3 − 2 → **wait**, y + 2 = 3(x−1) → … **Actually:** … = 3x−5."* Final answer (A, `y=3x−5`) correct, but the rationale is unedited stream-of-consciousness.
- **Failed Standards:** Markability / explanation reliability.
- **Recommendation:** Replace with the clean line used elsewhere: *"m = (7−(−2))/(4−1) = 3. y + 2 = 3(x − 1) → y = 3x − 5."* (Confirmed isolated — no other `wait`/`Actually` artefacts in the course.)

**`y10-linear-grad-g2` / `i1` / `i2` / `m1` / `m2`** — Status: **PATCH** (Nova "answer extraction only" trigger) — Overall: 2/5
*Scores:* Richness 1 · Diagnostic 2 · Difficulty 2 · Transfer 1 · Decision 1 · Misconception 2 · Authenticity 1 · Markability 5
- **Primary Weakness:** "State the gradient/y-intercept of `y=−3x+5`" reads a coefficient off an already-`y=mx+b` equation — no transformation. Five near-duplicates, two in mastery.
- **Failed Standards:** **Answer extraction only** (auto-fail); Mathematical Richness; near-duplicate.
- **Recommendation:** Keep one guided; require a transformation first (read m/b from `2y=6x−8` or `y−4=3(x−1)`).

**`y10-linear-grad-m3`, `y10-linear-mid-m3`** — Status: **PATCH** — fact-recall MCQs ("horizontal line has which gradient?", "which formula finds the midpoint?") in mastery. Demote or convert to error-spotting.

**`pp-g1/i1/m1` and `pp-g2/i2/m2`** — Status: PASS-with-note — repetitive parallel/perpendicular selection, but mastery *does* escalate (`pp-m8/m9/m10`), so defensible.

### Lesson summary
- **Distribution (95):** PASS ~78 · PATCH ~17 · REJECT 0
- **Systemic issues:** extraction-vs-reasoning split (gradient sub-lesson weakest; equation-of-line and modelling strong); one uncleaned explanation; inconsistent mastery calibration by sub-lesson.
- **Benchmark items:** `model-m6` (cheaper plan depends on hours), `model-i4`/`m8` (crossing point), `mid-m10`/`m7` (5-12-13 recognition).
- **Scores:** Assessment 7.5 · Diagnostic 6.5 · Calibration 6.5 · Diversity 7.5

---

## 5. `nonLinearRelationships.ts`

5 sub-lessons (parabolas intro, sketching, circles, exponentials, hyperbolas), 95 questions. All checked answers valid. One of the strongest lessons — mastery pools genuinely escalate.

### Exception questions

**`y10-nonlinear-intro-m1`, `exp-m1`, `hyp-m1`** — Status: **PATCH** — Overall: 2/5 — graph-family identification recall (D1) in mastery. The strong "distinguish families" item is `hyp-m10` (defined at x=0); promote that style.

**`intro-g2`/`i1`/`m4`; `sketch-g1`/`i4`/`m1`; `exp-g2`/`i3`/`m4`; `circle-g1`/`i1`/`m1`** — Status: **PATCH** (set) — Overall: 2/5
- **Primary Weakness:** "Find the y-intercept — set x to 0" and radius `√(number)` are one-step substitution, 3× per sub-lesson with only the equation changed.
- **Recommendation:** Keep one per sub-lesson; replace mastery duplicates with the parameter-recovery items the lesson already does well (`exp-m7`/`m9`, `circle-m9`).

### Systemic markability note
Multi-root x-intercept answers (e.g. `sketch-g4`→`"x=1,-4"`) rely on hand-listed accepted variants; a student typing `"x = -4 or 1"` or `"-4 and 4"` is marked wrong. A shared "set of roots" normaliser (sort + strip) would harden the sub-lesson.

### Lesson summary
- **Distribution (95):** PASS ~82 · PATCH ~13 · REJECT 0
- **Systemic issues:** recognition/substitution floor but strong reasoning ceiling; best-calibrated mastery in the course; multi-value answer markability the one cross-cutting fragility.
- **Benchmark items:** `exp-m10` (exponential overtakes linear — D4), `circle-m8/m9` (Pythagorean radius), `sketch-m7/m8` (axis of symmetry from intercepts), `exp-m8/m9` (recover parameters).
- **Scores:** Assessment 8 · Diagnostic 7 · Calibration 7.5 · Diversity 8

---

## 6. `geometryProofs.ts`

5 sub-lessons (congruent triangles, similar triangles, circle chord-angle, circle tangents, geometric proofs), 95 questions. All checked answers valid. Strongest lesson for diagnostic/reasoning quality.

### Exception questions

**`y10-geometry-cong-g3` / `i3` / `m3` / `m6`** — Status: **PATCH** (set) — Overall: 2/5
*Scores:* Richness 1 · Diagnostic 2 · Difficulty 2 · Transfer 1 · Decision 1 · Misconception 2 · Authenticity 2 · Markability 5
- **Primary Weakness:** "Find the corresponding part" where the answer always equals the given value copied verbatim (congruence preserves everything). A student can answer correctly *without matching vertices* — the question can't detect the target misconception.
- **Failed Standards:** Diagnostic Value; near-duplicate; borderline answer-extraction.
- **Recommendation:** Use the MCQ correspondence format that already exists (`cong-i2`, `cong-m9`).

**`cong-m1`, `cong-m2`, `sim-m1`, `sim-m4`, `tangent-m3`** — Status: **PATCH** — vocabulary/definition recall (D1) in mastery; "name the test" items duplicate guided. Promote the existing strong versions (`cong-m8/m10`, `sim-m8/m10`).

**`sim-g1/i1/m2` and `sim-g3/i2/m3`** — Status: **PATCH** (set) — scale-factor divide/multiply repeated per tier; replace duplicates with two-step items (`sim-m5/m9`).

### Systemic design note
The `geometric-proofs` sub-lesson contains no *constructed* proof — every item is reason-selection / spot-the-flaw / order-the-steps. Defensible for an auto-marked platform (free-text proof can't be exact-marked) and the items are high quality, but it caps Transfer for "write short geometric proofs." Consider retitling to "geometric reasoning" or adding an ordered proof-builder item type.

### Lesson summary
- **Distribution (95):** PASS ~80 · PATCH ~15 · REJECT 0
- **Benchmark items (best reasoning in the course):** `proof-m7/m8/m9`, `cong-m8/m10`, `chord-m8/m10`, `tangent-m8/m10` — deliberate, specific misconception targeting at D3–D4.
- **Scores:** Assessment 8 · Diagnostic 8 · Calibration 7 · Diversity 7.5

---

## 7. `algebraicTechniques.ts`

7 sub-lessons (expanding, factorising expressions, factorising quadratics, DOTS, non-monic quadratics, add/subtract fractions, simplify fractions), ~133 questions. All checked answers valid. **Highest-quality procedural lesson** — densely packed with error-identification items.

### Exception questions

**`alg-fr-m7`** — Status: **PATCH** (Nova "free-text required but exact marking expected" trigger) — Overall: 3/5 (good maths, fragile marking)
- **Primary Weakness:** Asks for `3x/(2(x-3)), x≠3` as free text. Many correct forms fail (`3x/(2x-6), x≠3`; "x cannot equal 3"; Unicode minus; spacing).
- **Failed Standards:** Markability (equivalent forms / answer format).
- **Recommendation:** Use the `afas-*` numerator-only design, or MCQ.

**`dots-m1` (√49), `dots-i2` (√25x²), `fac-ex-m1` (HCF)** — Status: **PATCH** — Overall: 2/5 — standalone arithmetic recall (D1) in mastery. Fold into the full factorisation item.

### Lesson summary
- **Distribution (~133):** PASS ~120 · PATCH ~13 · REJECT 0
- **Systemic issues:** free-response algebra markability the one real risk (curated accepted lists; `alg-fr-m7` the outlier); a few arithmetic sub-steps leak into mastery; no authenticity dimension (correct for symbolic fluency).
- **Benchmark items (the model for the whole course):** `exp-bp-m10`, `dots-m7/m9/m10`, `nmq-m8`, `alg-fr-i5/m10`, `afas-m9`, `fac-ex-m10`, `fac-qt-m10`/`nmq-m10` ("which CANNOT be factorised"), `fac-qt-i5/m8/m9` (parameter recovery).
- **Scores:** Assessment 8.5 · Diagnostic 8.5 · Calibration 8 · Diversity 8

---

## 8. `equationsSimultaneous.ts`

6 sub-lessons (solving linear, quadratics by factorising, quadratic formula, simultaneous substitution, linear inequalities, simultaneous elimination), 114 questions. All checked answers valid.

### Exception questions

**`lin-m1`, `lin-m2`, `lin-m3`** — Status: **PATCH** — Overall: 2/5 — one/two-step linear solves (D1) in mastery, identical in demand to guided. Demote (`lin-m5/m9/m10` already carry the pool).

**`sub-g2`/`g4`/`i2`/`m2` and `elim-g2`/`g4`/`i3`/`m2`/`m7`** — Status: **PATCH** (two sets, acceptable but repetitive) — method-setup MCQs genuinely diagnose real errors but 4–5 near-identical instances per method (incl. mastery). Keep one or two per tier; convert a mastery instance to full solve-and-decide.

### Minor markability note
`ineqAnswer` accepts `x < -5`, `x<-5`, ASCII flip — but not `x =< 4`, Unicode-minus, or flipped `-5 > x`. Low severity; a normaliser would remove the risk.

### Lesson summary
- **Distribution (114):** PASS ~98 · PATCH ~16 · REJECT 0
- **Benchmark items:** `lin-m10` (÷5 instead of ÷3), `qf-m10` (repeated root, not ±), `qform-m7` (negative discriminant), `qform-m10`/`qf-m8`/`sub-m10`/`elim-m10` (reverse-construct).
- **Scores:** Assessment 8.5 · Diagnostic 8.5 · Calibration 7.5 · Diversity 8

---

## 9. `trigonometry.ts` (representative sample)

~12 sub-lessons (right-triangle ratios → identifying sides → ratio selection → finding sides (sin/cos/tan) → finding angles → elevation/depression → sine rule → cosine rule → area → bearings), ~220+ questions. Helpers + a representative spread of mastery pools audited; all sampled answers verified correct (including the ambiguous case).

### Exception questions

**`bearings-m2` / `m3` / `m5` / `m9`** — Status: **PATCH** (set) — Overall: 2/5
*Scores:* Richness 2 · Diagnostic 2 · Difficulty 2 · Transfer 2 · Decision 1 · Misconception 2 · Authenticity 3 · Markability 4
- **Primary Weakness:** Four near-identical "add/subtract 180°" reverse-bearing items in one mastery pool.
- **Recommendation:** Keep `m2`+`m3` (the two cases); replace `m5`/`m9` with application items the pool does well.

**`bearings-m6` / `m7`** — Status: **PATCH** (minor) — same 120 km / 035° trip split into north + east components. Combine into a two-part item or vary scenario.

**Foundational SOH-CAH-TOA slots** (`identifyingSides`, `ratioSelection`, `findingSidesSinCos`, `findingSidesTan`) — Note: expect the same number-swap procedural duplication; flagged as density-to-thin-within-pools, not a structural merge (respecting the no-lesson-splitting constraint).

### Markability note (inherent to trig)
Numeric answers depend on rounding ("to 1 d.p.", "nearest km") and rounding only at the end. Accepted lists include unit suffixes, but intermediate rounding may land a student one unit off. Consider a tolerance band.

### Lesson summary
- **Distribution (~220+, estimated):** PASS ~85% · PATCH ~15% · REJECT 0 observed
- **Benchmark items (among the best in course):** `sine-rule-m7` (ambiguous case — D4), `sine-rule-m9` (identify longest side first), `sine-rule-m4` (select equation), `trig-rat-m10` (hyp-vs-adjacent error), `trig-rat-m8` (cos from sin via Pythagoras), `bearings-m10` (200° → 20° past south).
- **Scores:** Assessment 8 · Diagnostic 8 · Calibration 8 · Diversity 7.5

---

## 10. `measurement.ts` (representative sample)

8 sub-lessons (surface area of prisms / cylinders; volume of prisms-cylinders; pyramids; cones; spheres; similar-figures scaling), ~152 questions. Shared explanation helper + SA-prisms and similar-figures mastery pools audited; all sampled answers verified correct.

### Exception questions

**Plain formula-substitution duplication** (representative: `sa-prisms-m1`/`m2`/`m8` and the parallel "find the volume/SA of this shape" items) — Status: **PATCH** (course-wide set) — Overall: 3/5
*Scores:* Richness 2 · Diagnostic 2 · Difficulty 3 · Transfer 2 · Decision 1 · Misconception 1 · Authenticity 2 · Markability 4
- **Primary Weakness:** Direct substitution into a known formula with numbers changed; several near-duplicates per pool; the `m1`/`m2` slots in mastery don't escalate.
- **Recommendation:** Keep one plain calculation per shape; weight mastery toward the reverse (`sa-prisms-m10`), error-ID (`sa-prisms-m5`), and reverse-construction (`sa-prisms-m7`) items already present.

### Markability note (π and rounding)
Integer answers accept cm²/cm^2 suffixes (good); π-based answers ("245.0 cm²") depend on π precision and rounding — `78π` or `245.04` may not match. A tolerance band or exact-π acceptance would harden these.

### Lesson summary
- **Distribution (~152, estimated):** PASS ~85% · PATCH ~15% · REJECT 0 observed
- **Benchmark items:** the entire similar-figures sub-lesson (`sim-m3/m4/m9` k²/k³ scaling, `sim-m8` reverse via cube root, `sim-m10` authentic container scaling); `sa-prisms-m5/m7/m10`.
- **Scores:** Assessment 8 · Diagnostic 7.5 · Calibration 7.5 · Diversity 7.5

---

## Course-Level Synthesis

### The one concrete defect to fix now
`linearRelationships.ts` → `y10-eol-m7`: student-facing explanation contains unedited working (*"…→ wait, … Actually: … = 3x−5"*). Confirmed isolated by grep. One-line clean-up.

### Systemic issues (ranked by leverage)

1. **Mastery pools under-calibrated — D1 recall/extraction/substitution leaks in.** The most consistent finding. Vocabulary recall, coefficient extraction, bare substitution and arithmetic sub-steps appear in "mastery" pools across nearly every lesson. The fix is almost free: the correctly-pitched mastery items already exist in the same pools — re-weight, don't re-author.

2. **Within-pool number-swap duplication.** Every lesson has one-procedure-many-numbers clusters, often one-per-tier with no escalation (combined-outcome counting, line-of-best-fit substitution, growth/depreciation-factor recall, reverse bearings ×4, formula substitution). Keep one as fluency; convert the rest to reverse/constraint/decision variants.

3. **Distractor quality is bimodal — and predicts lesson quality.** Strong lessons (algebraicTechniques, equationsSimultaneous, geometryProofs, non-right trig) build distractors from named misconceptions and include "spot the error" items. Weaker lessons (probability, statisticsData, early geometry recall) use "1 plausible + 2 off-topic." Each lesson's own `commonMistakes` block already enumerates the right distractors.

4. **Markability fragility for free-response.** Free-text algebra with restrictions (`alg-fr-m7`), multi-root sets, inequalities, and π/rounding all rely on hand-curated `acceptedAnswers` that miss valid forms. A shared normaliser (canonicalise minus/spacing, accept factor reorder, root-set sorting, decimal tolerance) would harden the whole course. The `afas-*` "give just the numerator" design is the model fix.

### Highest-value actions (in order)
1. Clean `eol-m7` (5 minutes; concrete defect).
2. Re-weight mastery pools — demote D1 recall/extraction/substitution; promote existing error-ID/reverse/parameter items. Biggest gain for least authoring.
3. Upgrade distractors in probability & statisticsData using their own `commonMistakes` lists.
4. Add a shared answer-normaliser for free-response algebra/roots/inequalities/π; retrofit `alg-fr-m7`.
5. Thin number-swap clusters (reverse bearings, factor recall, y-intercept substitution, combined-outcome counting) into reverse/constraint variants.

The course is in genuinely good shape: technically sound, syllabus-complete, with a clear in-house "gold standard" (the algebra and proof lessons) the weaker units can be lifted toward — mostly by redeploying material already present in each file.
