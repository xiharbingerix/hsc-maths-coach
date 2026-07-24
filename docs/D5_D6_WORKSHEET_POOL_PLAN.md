# D5/D6 Worksheet Pool Expansion — Plan & Progress Log

> **READ THIS FIRST at the start of every batch.** The Progress Log at the bottom
> is the source of truth for what has been done. Any change to scope, counts, or
> targets MUST be logged there in the same commit/turn that makes the change.

## Goal

Add **genuine** high-difficulty questions to the worksheet question pool so a
**~50-minute worksheet** can be generated with real D5/D6 depth and replay variety.

- **12 D5** → authored into lesson `masteryQuizPool` arrays with explicit `difficulty: 5`.
- **12 D6** → authored into the `lib/challenges/` registry (auto-seeded to D6).
- Spread **4 D5 + 4 D6 across 3 lessons** of the Year 12 Advanced **Differential
  Calculus** topic, one subtopic-batch at a time (audited before moving on).

| Lesson (subtopic) | D5 → masteryQuizPool | D6 → challenge set | Status |
|---|---|---|---|
| `stationary-points` | 4 | 4 | ✅ done (Batch 1) |
| `optimisation` | 4 | 4 | ✅ done (Batch 2) |
| `tangents-and-normals` | 4 | 4 | ✅ done (Batch 3) |

**ALL THREE BATCHES AUTHORED: 12 D5 + 12 D6 (24 questions).** Working-tree only — not
committed or seeded. Remaining: supervisor sign-off on Batch 3 → user-approved commit →
(optional) user-approved DB seed → verify a 14-question `harder` worksheet.

**Supervisor (ChatGPT) quality gates — enforced from Batch 2 onward:**
(1) Seeder Reality Gate — prove each item reaches the pool (id, difficulty, multipart,
default-eligibility); multi-part questions are always worksheet-eligible when they
match the selected scope and difficulty. (2) No Hidden Skip Gate — report/fix every
seeder skip touching D5/D6 candidates. (3) Independent Solve Gate — re-solve every item,
report a match table. (4) Difficulty Justification Gate — one-line cognitive-demand per
item. (5) Replay Variety Gate — ≤2 items per batch sharing the same core structure.

## The 50-minute worksheet

A 50-minute worksheet ≈ **14 questions at the `harder` preset** (pacing: D3 ~2 min,
D4 ~2.5, D5 ~3.5, D6 ~5; scaled `harder` ratio 1:2:3:4 → ~D3:1 D4:3 D5:4 D6:6).
The admin sets `totalQuestions: 14`, `preset: harder` at generation — there is no
saved template; the only lever we control by authoring is **pool depth**.

> **Multi-part selection:** Multi-part questions are always included in the eligible
> worksheet pool when they match the selected scope and difficulty. There is no
> separate generator toggle.

## How questions reach the worksheet pool (verified mechanics)

- The worksheet pool **is** the `questions` table, seeded by
  [scripts/seed-question-bank.ts](../scripts/seed-question-bank.ts) from **lesson
  TypeScript** in `lib/lessons/` + the `lib/challenges/` registry. JSON batches in
  `question-batches/` are **validate-only** and never write to the DB — not a route here.
- `inferDifficulty` ([seed-question-bank.ts:228](../scripts/seed-question-bank.ts#L228)):
  explicit `question.difficulty` is respected first; else `section === "challenge"` → **6**;
  `multiPartPractice` → 6; mastery Q8–Q10 / "exam"/"prove" → 5; etc.
- So: `masteryQuizPool` entry with `difficulty: 5` → seeded **D5**; a `challenge`
  registry entry → seeded **D6** with no extra wiring.
- Worksheet selection draws **distinct** questions per difficulty level across the
  whole **topic** ([worksheetGeneration.ts](../lib/worksheetGeneration.ts)), via presets:
  `push-forward` (D5+D6) and `harder` (D6-heavy, ratio 1:2:3:4 over D3..D6).
- `isRealQuestion` requires a **non-empty top-level `answer`** — so every multi-part
  challenge item sets its top-level `answer` to part (a)'s answer (per the standard),
  or it would be silently skipped by the seeder.

## Standards bar (must pass for every item)

Source: [QUESTION_AUTHORING_STANDARD.md](./QUESTION_AUTHORING_STANDARD.md) +
[PRACTICE_QUESTION_STANDARD.md](./PRACTICE_QUESTION_STANDARD.md).

- **D5** = at least one genuine novel move: constraint reasoning, modelling,
  abstraction, generalisation, optimisation, proof-like reasoning, or transfer.
  NOT D5 from notation/exam tone/bigger numbers/formula-naming.
- **D6** = ALL of: synoptic (≥2 subtopics) + sustained (≥3 dependent stages) +
  non-routine (≥1 uncued strategic insight) + ceiling-level. Richness 5/5.
  Reasoning carried by auto-markable answers (no free-text "justify/show that").
- **Formal Quality Gate:** Markability = 5; not extraction; stated 1-line target
  misconception; D3+ Richness ≥4 & Diagnostic ≥4 with ≥1 real decision; numbers
  don't leak the key; lean.
- **Formatting:** plain `$500` currency; `\(...\)` for math starting with a digit;
  closed `$...$`; `x^2` not `x^(2)`; explanation's final number within tolerance of
  `answer`; `acceptedAnswers` covers spacing / Unicode-minus / fraction–decimal.
- **Per-batch discipline:** author one subtopic at a time; run the 8-step self-check
  per question; `tsc` + `audit:lessons` + `git diff --check` before logging the batch done.

## Execution steps (per batch)

1. Read the target lesson in full (teaching, worked examples, existing pool/challenge)
   so new items match notation and don't duplicate. **Read this doc's Progress Log first.**
2. Author 4 D5 into the lesson's `masteryQuizPool` (`difficulty: 5`).
3. Author 4 D6 into the lesson's challenge set in `lib/challenges/` (multi-part allowed;
   single-answer where cleaner; top-level `answer` = part (a) answer for multi-part).
4. `npx tsc --noEmit` → `npm run audit:lessons` → `git diff --check`. Fix all.
5. Dry-run seed: `npx tsx scripts/seed-question-bank.ts --course year-12-advanced --dry-run`;
   confirm the new D5/D6 counts appear under the right subtopic.
6. Update the Progress Log below; provide the next-batch prompt.

### Final seed/verify (after all 3 batches)
- Ensure migration `022_difficulty_d6.sql` is applied (needed for `difficulty = 6`).
- Run the real seed (no `--dry-run`).
- Generate a 14-question `harder` worksheet for the Differential Calculus topic
  and confirm varied draw + correct multi-part auto-marking.

## Known doc discrepancy (track separately, not a blocker)
Prose standards say `multiPartPractice` seeds at **D5**
([PRACTICE_QUESTION_STANDARD.md:30](./PRACTICE_QUESTION_STANDARD.md#L30)), but the code
seeds it at **D6** ([seed-question-bank.ts:246](../scripts/seed-question-bank.ts#L246)).
Doesn't affect this plan. Worth a separate docs fix.

---

## Progress Log

### Batch 1 — `stationary-points` — ✅ DONE (2026-06-23)

**D5 → `lib/lessons/differentialCalculus.ts`, `stationary-points` `masteryQuizPool`
(appended after `stationary-pool-30`):**
- `stationary-pool-31` — find coefficient `a` from a stationary-point condition
  (`y = x³ + ax² + 7`, stat at x=2 → a = −3). Constraint reasoning.
- `stationary-pool-32` — existence condition: for which `k` does `y = x³ + kx + 1`
  have **no** stationary points → `k > 0`. Constraint/parameter reasoning.
- `stationary-pool-33` — projectile modelling: max height of `h(t) = −5t² + 30t + 2`
  → 47 m (must substitute t=3 back; misconception = answering t=3). Modelling.
- `stationary-pool-34` — reverse from minimum value: `y = x² − 8x + c` has min 5 → c = 21.

**D6 → `lib/challenges/year12AdvancedDifferentialCalculus.ts`, `stationaryPointsChallenge`
(appended after `chal-y12a-sp-3`):**
- `chal-y12a-sp-4` — **multi-part** (a/b/c): two stationary points of
  `y = x³ + ax² + bx + 5` at x=−1,3 → find a (−3) via sum of roots, b (−9) via product,
  then classify x=3 (minimum) via y''. Synoptic: stationary pts + roots of y' + 2nd-deriv test.
- `chal-y12a-sp-5` — **single-answer**: square of shortest distance from (0,3) to `y = x²`
  → 11/4 (2.75). Synoptic: distance + curve + optimisation; reject x=0 root.
- `chal-y12a-sp-6` — **multi-part** (a/b/c): `y = x³ − 6x² + 9x + 1`; stationary x = 1,3;
  max−min y-value = 4; line y=k cuts curve 3× ⟺ 1 < k < 5. Synoptic: stationary pts +
  turning-point values + graph interpretation.
- `chal-y12a-sp-7` — **single-answer**: open-box optimisation, 12 cm sheet,
  `V = x(12−2x)²` → x = 2 (reject x=6). Synoptic: modelling + product-rule diff + reject root.

Notes: 2 of the 4 D6 are multi-part (sp-4, sp-6); all four are worksheet-eligible.
All answers hand-verified.

**Gates (passed):** `tsc --noEmit` clean; `git diff --check` clean; `audit:lessons`
added no new issues (year-12-advanced calculus uses the legacy catalog path and is
not covered by that audit — the dry-run seed is the authoritative check here).
**Dry-run seed** (`--course year-12-advanced`): `stationary-points` went **51 → 59**
questions (= +4 D5 +4 D6). None of the 8 new IDs were skipped; warnings unchanged at 6.

**⚠️ Pre-existing bug uncovered (separate fix, NOT introduced by us):** existing
multi-part **challenge** items with an empty top-level `answer: ""` are silently
skipped by the seeder (`isRealQuestion` requires a non-empty top-level `answer`):
confirmed for `chal-y12a-sp-2`, `chal-y12a-sp-3`, `chal-y12a-dpf-2`. They never reach
the worksheet pool. This thins existing D6 depth and should be fixed by setting each
such item's top-level `answer` to its part (a) answer. **Our new multi-part D6 avoid
this** (top-level `answer` is set). Track as a follow-up cleanup.

### Batch 2 — `optimisation` — ✅ DONE (2026-06-23)

Authored under the 5 supervisor gates. Deliberately avoided the archetypes already in
the pool/challenge (rectangle-perimeter/fencing, open-box, projectile, revenue
`p(100-2p)`, cylinder min-surface, parabola-inscribed rectangle, `x+400/x`).

**D5 → `differentialCalculus.ts`, `optimisation` `masteryQuizPool` (after `opt-pool-30`):**
- `opt-pool-31` — closed-interval max of `f(x)=x³−3x` on `[0,3]` → **18** (max at the
  *endpoint* x=3, not the stationary point). Novel move: endpoint-vs-stationary reasoning.
- `opt-pool-32` — minimise **average** cost `A=C(x)/x`, `C=x²+100x+1600` → x=**40**.
  Novel move: construct the average-cost rational function before optimising.
- `opt-pool-33` — cubic profit `P=−x³+27x−10`, x≥0 → x=**3** (reject −3; confirm max).
  Novel move: domain restriction + maximum confirmation on a cubic model.
- `opt-pool-34` — rectangle under line `y=6−2x`, max area → **4.5** (x=3/2). Novel move:
  express area via the linear constraint, then interpret the maximised area.

**D6 → `lib/challenges/year12AdvancedOptimisation.ts` (after `opt-3`):**
- `chal-y12a-opt-4` (single) — closed box, square base, V=128, weighted face costs
  (2c top/base, 1c sides) → x=**4**. Synoptic: volume constraint → h(x); weighted
  multi-face cost; minimise (x³=64). ≥3 stages; uncued insight = combine weighted costs.
- `chal-y12a-opt-5` (single) — **[revised post-supervisor review]** open-top box, square
  base, total surface area 48 cm² → maximum volume **32 cm³**. Synoptic: SA constraint →
  h(x); substitute into V=x²h; maximise (reject negative root). *Original cubic-profit/
  classify item was flagged as closer to D4 (routine stationary-point analysis, and it
  overlapped Batch 1 `sp-4`); replaced with this constrained optimisation, which is also
  single-answer.*
- `chal-y12a-opt-6` (single) — min area of a right triangle whose hypotenuse passes
  through (2,4) → **16**. Synoptic: intercept-form line + fixed-point constraint +
  rational area + quotient-rule minimise; uncued insight = b=4a/(a−2) substitution.
- `chal-y12a-opt-7` (single) — theatre demand model ($20/400 tickets, −10 per +$1) →
  price **$30**. Synoptic: build linear demand from words + revenue=price×qty + maximise
  + interpret price. Uncued insight = parameterise the price increase.

**Gate 3 — Independent solve (all match):**

| Item | Claimed | Independent solve | Match |
|---|---|---|---|
| opt-pool-31 | 18 | f(0)=0,f(1)=−2,f(3)=18 → max 18 | ✅ |
| opt-pool-32 | 40 | A=x+100+1600/x, A'=1−1600/x²=0, x=40 | ✅ |
| opt-pool-33 | 3 | P'=−3x²+27=0, x=3 (x≥0), P''(3)<0 | ✅ |
| opt-pool-34 | 4.5 | A=6x−2x², x=3/2, A=1.5·3=4.5 | ✅ |
| opt-4 | 4 | C=4x²+512/x, 8x−512/x²=0, x³=64, x=4 | ✅ |
| opt-5 (revised) | 32 | h=(48−x²)/4x; V=(48x−x³)/4; x=4,h=2; V=32 | ✅ |
| opt-6 | 16 | b=4a/(a−2), A=2a²/(a−2), a=4,b=8, A=16 | ✅ |
| opt-7 | 30 | R=8000+200x−10x², x=10, price=$30 | ✅ |

**Gate 1 — Seeder reality (dry-run `collectAllQuestions(["year-12-advanced"])`):**
optimisation difficulty histogram `{1:9,2:17,3:18,4:12,5:16,6:7}`, 79 total.
opt-pool-31..34 → difficulty 5, single-answer (always eligible). opt-4/5/6/7 →
difficulty 6, single-answer (always eligible after the opt-5 revision). So **all 4 new
D6 are default-eligible**.

**Gate 2 — Skips:** the optimisation challenge set is collected twice (pre-existing
structural quirk, present for opt-1..3 since Batch 1); dedup keeps the first copy, so
opt-4..7 are seeded exactly once — the "duplicate source_id" warnings are benign. The
empty-`answer` skip bug (dpf-2, sp-2, sp-3) is unchanged and still tracked as a separate
follow-up. No new skips affect our items.

**Gate 5 — Variety:** 4 distinct D6 structures (weighted-cost box, SA-constrained max
volume, quotient-rule triangle area, quadratic demand model) and 4 distinct D5 structures
(interval-endpoint, average-cost rational, cubic-domain, linear-constraint area). No
archetype used >2×.

**Batch 3 extra gates (supervisor, tangents-and-normals only):** Gate A — 0 routine
"tangent/normal at x=k" items (test: remove the tangent/normal language — is there still
an interesting problem?). Gate B — ≥4 reverse-reasoning items (≥2 of the D5s, ≥2 of the
D6s): infer the point/parameter before differentiating. Gate C — ≥2 geometry-interaction
items (distance/area/angle/perpendicularity/parallelism/intersection count). Plus the
Batch 3 success criterion: 4+4, ≥4 reverse, ≥2 geometry, 0 routine-tangent, 100%
seeder-eligible under intended mode, 100% independent solves, ≤2 of any structure.

**Other gates:** `tsc --noEmit` clean; `git diff --check` clean. Nothing committed/seeded.

### Batch 3 — `tangents-and-normals` — ✅ DONE (2026-06-23)

Authored under the supervisor's extra gates A (no routine tangent-at-a-point), B (≥4
reverse), C (≥2 geometry), plus the rule "no D6 unless the answer is hard to predict."

**D5 → `differentialCalculus.ts`, `tangents-and-normals` `masteryQuizPool` (after pool-30):**
- `tan-norm-pool-31` — tangent to y=x² through external point (0,−9) → x=**3** [REVERSE].
- `tan-norm-pool-32` — line y=5x+c tangent to y=x²+x → c=**−4** [REVERSE, discriminant].
- `tan-norm-pool-33` — tangent at (2,4) forms a triangle with the axes → area **2** [GEOMETRY].
- `tan-norm-pool-34` — **[revised per supervisor]** tangent to y=x² parallel to y=6x−5
  → area of triangle with the axes = **27/4** [REVERSE + GEOMETRY]. *Replaced the earlier
  "normal meets parabola again" item to drop the over-used meets-again/double-root engine
  to ≤2.*

**D6 → `lib/challenges/year12AdvancedDifferentialCalculus.ts`, `tangentsAndNormalsChallenge`:**
- `chal-y12a-tn-4` — two tangents from (0,c) perpendicular → c=**−1/4** [REVERSE, perpendicularity].
- `chal-y12a-tn-5` — tangent to y=x³−3x at (2,2) meets curve again → x=**−4** [GEOMETRY, double-root].
- `chal-y12a-tn-6` — line y=3x+c tangent to y=x³, positive c → **2** [REVERSE, equal value+gradient].
- `chal-y12a-tn-7` — normal to y=x² at (2,4) meets parabola again → x=**−9/4** [GEOMETRY, double-root].

**Acceptance report (supervisor format):**

*Stripped-problem test (remove tangent/normal language — is there still a real problem?):*
all 8 pass — e.g. pool-31 → "for which a does the line through (0,−9) touch y=x²"; tn-4 →
"two lines from (0,c) touch y=x² at right angles, find c"; tn-5 → "where does y=9x−16 meet
y=x³−3x again". No item is a routine "tangent/normal at x=k".

*Reverse-reasoning count:* **4** (pool-31, pool-32, tn-4, tn-6) — ≥2 D5 and ≥2 D6. ✅
*Geometry-interaction count:* **5** (pool-33, pool-34, tn-4, tn-5, tn-7). ✅
*Routine tangent-at-a-point count:* **0.** ✅

*Independent solve table (all match):*

| Item | Claimed | Independent solve |
|---|---|---|
| pool-31 | 3 | y=2ax−a² through (0,−9): −9=−a², a=3 |
| pool-32 | −4 | x²−4x−c=0 tangent ⟹ 16+4c=0, c=−4 |
| pool-33 | 2 | y=4x−4; ints (1,0),(0,−4); ½·1·4=2 |
| pool-34 (revised) | 27/4 | grad 6 ⟹ x=3; tangent y=6x−9; ints (3/2,0),(0,−9); ½·(3/2)·9=27/4 |
| tn-4 | −1/4 | c=−a²; m₁m₂=4c=−1; c=−1/4 (directrix) |
| tn-5 | −4 | x³−12x+16=(x−2)²(x+4); x=−4 |
| tn-6 | 2 | 3x²=3⟹x=±1; c=x³−3x=−2 or 2; positive 2 |
| tn-7 | −9/4 | 4x²+x−18=(4x+9)(x−2); x=−9/4 |

*Seeder-eligibility table (dry-run `collectAllQuestions`):* histogram
`{1:6,2:13,3:12,4:9,5:13,6:10}`; pool-31..34 → difficulty 5 single-answer; tn-4..7 →
difficulty 6 single-answer; **0 multipart** ⟹ **100% default worksheet-eligible**.

*Archetype table (≤2 per structure — RESOLVED after the pool-34 swap):* find-c tangency
= 2 (pool-32 discriminant, tn-6 equal-gradient), triangle-area = 2 (pool-33, pool-34),
meets-again/double-root = 2 (tn-5 cubic-tangent, tn-7 parabola-normal), external-tangent-
point = 1 (pool-31), perpendicular-tangents = 1 (tn-4). **All ≤2.** Reverse count now 5
(pool-31, pool-32, pool-34, tn-4, tn-6); geometry count 5 (pool-33, pool-34, tn-4, tn-5, tn-7).

*Supervisor ruling:* Batch 3 approved **conditional on swapping pool-34** off the
meets-again structure (done — Option A: tangent ∥ y=6x−5, triangle area 27/4). Supervisor
then considers the **12 D5 + 12 D6 pool signed off** and ready for worksheet-generation testing.

*Default worksheet eligibility:* confirmed 100%.

**Other gates:** `tsc` clean; `git diff --check` clean. Nothing committed or seeded.
