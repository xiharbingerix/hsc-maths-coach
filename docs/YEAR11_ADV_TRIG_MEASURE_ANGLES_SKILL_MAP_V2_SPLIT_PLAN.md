# Year 11 Advanced — Trigonometry and Measure of Angles  
# Skill Map v2 Split Plan

Created: 2026-06-13  
Status: Phase 1 ✅, Phase 2A ✅, Phase 2B ✅ implemented 2026-06-13. Phase 3 blueprint added 2026-06-13.
Course: `year-11-advanced`  
Unit: `trigonometry-measure-angles`  
NSW strand: MA-T1 — Trigonometry and Measure of Angles

---

## Phase 1 Implementation Status — 2026-06-13

### Slots implemented

| Slug | Title | Status | Seed count |
|---|---|---|---|
| `degrees-and-radians-concept` | Degrees and Radians | ✅ Done | 19 |
| `converting-degrees-radians` | Converting Degrees to Radians | ✅ Done | 19 |
| `converting-radians-degrees` | Converting Radians to Degrees | ✅ Done | 19 |
| `arc-length-radian-measure` | Arc Length | ✅ Done | 19 |
| `sector-area-radian-measure` | Sector Area | ✅ Done | 20 (includes 1 multiPartPractice with 3 parts) |

### Legacy routes

| Slug | `showInCourseNav` | `seedQuestions` | Route resolves? |
|---|---|---|---|
| `radians-exact-trigonometric-values` | false | false | ✅ Yes |
| `unit-circle-trigonometric-graphs` | false | false | ✅ Yes |

### Validation results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Clean |
| `npm run build` | ✅ Clean |
| `npm run audit:lessons` | ✅ PASS (0 failures) |
| `seed --dry-run` (year-11-advanced) | ✅ 5 new lessons seeded; 2 legacy skipped |
| `git diff --check` | ✅ Clean |

### Notes

- Phase 1 slugs differ slightly from the Section 8 plan (e.g. `degrees-and-radians-concept` vs `trig-radian-measure`) to match the task brief.
- No exact trig values slot in this phase — kept in legacy `radians-exact-trigonometric-values` until Phase 2.
- One MVP multi-part question added to `sector-area-radian-measure` covering arc length + area + perimeter in a single r = 9, θ = 2π/3 context.
- No visual payloads added (no sector diagram type exists yet); text/formula stems used throughout.

---

## Phase 2A Implementation Status — 2026-06-13

### Slots implemented

| Slug | Title | Status | Seed count |
|---|---|---|---|
| `exact-trig-values-special-triangles` | Exact Trigonometric Values | ✅ Done | 19 |
| `graphing-sin-cos-tan` | Graphs of Sine, Cosine and Tangent | ✅ Done | 19 |

### Visual payload usage

| Lesson | Payload type | Used on |
|---|---|---|
| `exact-trig-values-special-triangles` | `TriangleDiagram` | WE1 (30-60-90), WE2 (45-45-90) |
| `graphing-sin-cos-tan` | `CartesianGraph` + `sinusoidals` | WE1 (sin), WE2 (cos), WE3 (tan), g3 (cos), i3 (tan) |

### Validation results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Clean |
| `npm run build` | ✅ Clean |
| `npm run audit:lessons` | ✅ PASS (0 failures; 1 pre-existing warning per lesson, consistent with all other year-11-advanced units) |
| `seed --dry-run` (year-11-advanced) | ✅ 2 new lessons seeded (19 each); 2 legacy still skipped |
| `git diff --check` (changed files only) | ✅ Clean |

### Notes

- `TriangleDiagram` used inline via `import("../types").TriangleDiagram` to avoid adding a top-level import that would alter the existing import footprint.
- `CartesianGraph` sinusoidals use `Math.PI` for exact radian x-values on key point labels.
- Pre-existing `LessonRenderer.tsx` trailing blank line causes `git diff --check` exit-2 on the full working tree; not introduced by this change.

---

## Phase 2B Implementation Status — 2026-06-13

### Slots implemented

| Slug | Title | Status | Seed count |
|---|---|---|---|
| `exact-trig-values-unit-circle` | The Unit Circle and Exact Values | ✅ Done | 19 |
| `unit-circle-all-quadrants` | Exact Values in All Quadrants | ✅ Done | 19 |

### Visual payload usage

| Lesson | Payload type | Used on |
|---|---|---|
| `exact-trig-values-unit-circle` | `UnitCircleDiagram` | WE1 (π/3), WE2 (π/2), WE3 (π/4), g1 (π/6), g2 (π/3), g3 (π/4), i1 (π/6), i2 (π/2), m3 (π), m5 (π/2) |
| `unit-circle-all-quadrants` | `UnitCircleDiagram` | WE1 (5π/6 Q2), WE2 (7π/6 Q3), WE3 (5π/3 Q4), g1 (5π/6), g2 (7π/6), i1 (5π/6), i2 (4π/3), m2 (5π/6), m3 (5π/4) |

### Question ID prefixes used

| Lesson | Prefix |
|---|---|
| `exact-trig-values-unit-circle` | `y11adv-ucv-*` |
| `unit-circle-all-quadrants` | `y11adv-ucq-*` |

### Validation results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Clean |
| `npm run build` | ✅ Clean |
| `npm run audit:lessons` | ✅ PASS (0 failures) |
| `seed --dry-run` (year-11-advanced) | ✅ 2 new lessons seeded (19 each); 2 legacy still skipped |
| `git diff --check` (changed files only) | ✅ Clean (pre-existing CRLF warning on unrelated file) |

### Notes

- `UnitCircleDiagram` used heavily: all 3 worked examples per lesson, 3 guided questions in `exact-trig-values-unit-circle`, 2 guided in `unit-circle-all-quadrants`, plus 2+ independent/mastery per lesson.
- Question ID prefixes follow task brief (`y11adv-ucv-*`, `y11adv-ucq-*`) rather than planning doc's earlier suggestions (`y11adv-uc-*`, `y11adv-refang-*`).
- Catalog entries placed between `exact-trig-values-special-triangles` and `graphing-sin-cos-tan`, with `legacySlugs: ["unit-circle-trigonometric-graphs"]`.
- Both lessons have `stableSkillId` and `skillCheckpoints` per Skill Map v2 contract.

---

## Phase 3 Blueprint — Graph Transformations — 2026-06-13

### Visual infrastructure — renderer audit

| Payload | Transformed-graph support | Verdict |
|---|---|---|
| `TrigGraphDiagram` | **No.** `curveValue()` calls only `Math.sin(x)`, `Math.cos(x)`, `Math.tan(x)`. Type has no `a`/`b`/`c`/`d` fields. Always draws the base unscaled function. | **Do not use for any transformed graph question.** Safe for base-function reference only. |
| `CartesianGraph` → `sinusoidals` | **Yes.** `sinusoidals` supports `{ kind, a, b, c, d }`. Already proven in `graphing-sin-cos-tan`. | **Primary visual for Phase 3.** |

**Rule:** every Phase 3 question that shows a transformed graph uses `cartesianGraph` with a `sinusoidals` entry carrying explicit `a`, `b`, `c`, `d` values. `trigGraphDiagram` is permitted only in teaching text as a base-function reference alongside a `cartesianGraph`, never as the sole visual for a transformed-graph question.

---

### Slot 10 — `trig-graph-amplitude-period`

**Slug:** `trig-graph-amplitude-period`
**Question ID prefix:** `y11adv-amp-*`
**Learning goal:** Given y = a sin(bx) or y = a cos(bx), identify amplitude |a| and period 2π/b and sketch one period.
**Prerequisite:** `graphing-sin-cos-tan` (base period 2π, range [−1, 1]).

#### Worked example outlines

| # | Equation | Focus | CartesianGraph |
|---|---|---|---|
| WE1 | y = 3 sin(x) | Amplitude stretches range to [−3, 3]. Key points (0,0), (π/2, 3), (π, 0), (3π/2, −3), (2π, 0). | `{kind:"sin", a:3, b:1, c:0, d:0}` |
| WE2 | y = cos(2x) | b = 2 compresses period to π. New zeros at π/4, 3π/4. Key points: (0,1), (π/4, 0), (π/2, −1), (3π/4, 0), (π, 1). | `{kind:"cos", a:1, b:2, c:0, d:0}` |
| WE3 | y = −2 sin(3x) | |a| = 2 (reflected), period = 2π/3. Reflection: graph starts by going down instead of up. | `{kind:"sin", a:-2, b:3, c:0, d:0}` |

#### Guided (4)

| ID | Prompt | Answer | Type | Visual |
|---|---|---|---|---|
| g1 | State the amplitude of y = 4 cos(x). | 4 | typed | none |
| g2 | State the period of y = sin(3x). | 2pi/3 | typed | none |
| g3 | State the amplitude of y = −3 sin(x). | 3 | typed | none — stress |a| |
| g4 | MCQ: What is the period of y = cos(4x)? Distractors: 8π, 2π, 4π, **π/2**. | B: π/2 | MCQ | none |

#### Independent (5)

| ID | Prompt | Answer | Type | Visual |
|---|---|---|---|---|
| i1 | State the period of y = sin(2x). | pi | typed | none |
| i2 | State the amplitude of y = −5 cos(x). | 5 | typed | none |
| i3 | The graph shown is y = 3 cos(2x). State the amplitude. | 3 | typed | CartesianGraph `{kind:"cos", a:3, b:2, c:0, d:0}` |
| i4 | State the maximum value of y = 4 sin(x). | 4 | typed | none |
| i5 | MCQ error — A student says y = sin(3x) has period 6π. Identify the error. | B: period = 2π/b = 2π/3, not 6π | MCQ | none |

#### Mastery (10)

| ID | Prompt | Answer | Type | Visual |
|---|---|---|---|---|
| m1 | State the period of y = sin(2x). | pi | typed | none |
| m2 | State the amplitude of y = 7 cos(x). | 7 | typed | none |
| m3 | State the period of y = 4 sin(3x). | 2pi/3 | typed | none |
| m4 | The graph shown is y = 2 sin(πx). State the period. | 2 | typed | CartesianGraph `{kind:"sin", a:2, b:Math.PI, c:0, d:0}` |
| m5 | State the maximum value of y = 5 cos(x). | 5 | typed | none |
| m6 | State the minimum value of y = −3 sin(2x). | -3 | typed | none |
| m7 | MCQ: Which is the range of y = 4 cos(x)? | D: [−4, 4] | MCQ | none |
| m8 | MCQ error — A student doubles b and says the period doubles. Identify the error. | A: period halves when b doubles | MCQ | none |
| m9 | y = a sin(bx) has amplitude 2 and period π. Find b. | 2 | typed | none |
| m10 | State the period of y = 3 sin(πx/2). | 4 | typed | none — period = 2π/(π/2) = 4 |

#### Misconceptions

| Error | Fix |
|---|---|
| Period = 2π × b instead of 2π/b | Period is DIVIDED by b, not multiplied. Bigger b = faster oscillation = shorter period. |
| Amplitude = a (including sign) | Amplitude is |a|, always non-negative. y = −3sin(x) has amplitude 3. |
| Confusing amplitude change with vertical shift | Amplitude stretches the wave; vertical shift moves the midline. y = 3sin(x) still has midline y = 0. |
| y = sin(πx) has period π | b = π gives period = 2π/π = 2, not π. Substitute into 2π/b carefully. |

#### Accepted answer strategy

| Value | Canonical | Accept also |
|---|---|---|
| Period 2π/3 | `"2pi/3"` | `"2π/3"`, `"(2/3)pi"` |
| Period π | `"pi"` | `"π"`, `"3.14159..."` — do NOT accept as decimal for exact |
| Period 4 | `"4"` | `"4.0"` |
| Amplitude 3 | `"3"` | `"3.0"` |
| Range [−4, 4] | MCQ choice — no parser needed | — |
| Max value 5 | `"5"` | `"5.0"` |

---

### Slot 11 — `trig-graph-transformations`

**Slug:** `trig-graph-transformations`
**Question ID prefix:** `y11adv-shift-*`
**Learning goal:** Given y = a sin(bx + c) + d, identify amplitude, period, phase shift (−c/b), and vertical shift (d). State the new range and describe the effect on the graph.
**Prerequisite:** `trig-graph-amplitude-period` (amplitude and period must be solid).

#### Worked example outlines

| # | Equation | Focus | CartesianGraph |
|---|---|---|---|
| WE1 | y = 2 sin(x + π/3) + 1 | Phase shift: c = π/3 → shift = −π/3 (LEFT by π/3). Vertical shift +1. Amplitude 2. Range [−1, 3]. | `{kind:"sin", a:2, b:1, c:Math.PI/3, d:1}` |
| WE2 | y = 3 cos(2x − π/2) | c = −π/2 → shift = −(−π/2)/2 = +π/4 (RIGHT by π/4). Period = π. No vertical shift. Range [−3, 3]. | `{kind:"cos", a:3, b:2, c:-Math.PI/2, d:0}` |
| WE3 | y = −sin(x) + 2 | Amplitude 1 (reflected). Vertical shift +2. Range [1, 3]. Starts at y = 2 and immediately decreases. | `{kind:"sin", a:-1, b:1, c:0, d:2}` |

#### Guided (4)

| ID | Prompt | Answer | Type | Visual |
|---|---|---|---|---|
| g1 | State the vertical shift of y = sin(x) + 3. | 3 | typed | none |
| g2 | State the phase shift direction and size for y = cos(x − π/4). | right by π/4 — ask for size: pi/4 | typed | none |
| g3 | State the maximum value of y = 2 sin(x) + 1. | 3 | typed | none |
| g4 | MCQ: In y = sin(x + π/6), which direction is the phase shift? Distractors: right π/6, left π/6, up π/6, down π/6. | B: left by π/6 | MCQ | none |

#### Independent (5)

| ID | Prompt | Answer | Type | Visual |
|---|---|---|---|---|
| i1 | State the vertical shift of y = 3 cos(2x) − 4. | -4 | typed | none |
| i2 | The graph shown is y = sin(x) + 2. State the maximum value. | 3 | typed | CartesianGraph `{kind:"sin", a:1, b:1, c:0, d:2}` |
| i3 | State the amplitude of y = 4 sin(x − π/3) + 1. | 4 | typed | none |
| i4 | State the minimum value of y = 2 cos(x + π/4) − 3. | -5 | typed | none |
| i5 | MCQ — A student says y = sin(x + π/3) shifts the graph to the right. Identify the error. | A: a positive c shifts LEFT | MCQ | none |

#### Mastery (10)

| ID | Prompt | Answer | Type | Visual |
|---|---|---|---|---|
| m1 | State the amplitude of y = −3 sin(2x) + 5. | 3 | typed | none |
| m2 | State the period of y = cos(3x − π) + 1. | 2pi/3 | typed | none |
| m3 | State the vertical shift of y = 4 sin(x + π) − 2. | -2 | typed | none |
| m4 | The graph shown is y = 2 sin(x) + 3. State the minimum value. | 1 | typed | CartesianGraph `{kind:"sin", a:2, b:1, c:0, d:3}` |
| m5 | State the phase shift size for y = sin(2x + π/2). Phase shift = −c/b = −(π/2)/2. | pi/4 | typed | none |
| m6 | State the maximum value of y = 3 cos(x) + 2. | 5 | typed | none |
| m7 | State the minimum value of y = 2 sin(x + π/6) − 1. | -3 | typed | none — d − |a| = −1 − 2 = −3 |
| m8 | MCQ error — A student reads y = sin(x + π/3) and says phase shift is π/3 to the right because the sign is positive. Identify the error. | B: positive c means shift LEFT; the shift is −c/b = −π/3 | MCQ | none |
| m9 | State the period of y = 5 cos(πx + π/2). | 2 | typed | none — period = 2π/π = 2 |
| m10 | y = 2 sin(πx/3 + π/6) + 1. State the maximum value of y. | 3 | typed | none — d + |a| = 1 + 2 = 3 |

#### Misconceptions

| Error | Fix |
|---|---|
| y = sin(x + c) shifts right because the constant is added | Positive c shifts LEFT. Think of it as the starting x being earlier. |
| Phase shift = c, not −c/b | Phase shift = −c/b. For y = sin(2x + π/2), shift = −(π/2)/2 = −π/4 (left π/4). |
| Range of y = 2sin(x) + 1 is [0, 2] | The range is [d − |a|, d + |a|] = [−1, 3], not [d, d + |a|]. |
| Amplitude includes the sign of a | Amplitude is |a|. y = −3sin(x) has amplitude 3, not −3. |

#### Accepted answer strategy

| Value | Canonical | Accept also |
|---|---|---|
| Vertical shift −4 | `"-4"` | `"−4"` (Unicode minus) |
| Phase shift π/4 | `"pi/4"` | `"π/4"` |
| Min value −5 | `"-5"` | `"−5"` |
| Max value 3 | `"3"` | `"3.0"` |
| Period 2π/3 | `"2pi/3"` | `"2π/3"` |
| Period 2 | `"2"` | `"2.0"` |

---

### Phase 3 TrigGraphDiagram usage plan

| Question type | Safe visual | Notes |
|---|---|---|
| y = a sin(bx) — show stretched/compressed graph | `CartesianGraph` sinusoidals | Only safe option for transformed graphs |
| y = a sin(bx + c) + d — show shifted graph | `CartesianGraph` sinusoidals | Only safe option |
| Base y = sin x reference alongside transformed | `CartesianGraph` two sinusoidals entries | Add a:1, b:1 entry alongside the transformed one |
| `TrigGraphDiagram` in teaching text only | Teaching `latexBlocks` or description | Renderer draws unscaled base only — acceptable as concept illustration |
| Any question relying on visual accuracy of transformed shape | `CartesianGraph` | Never use `TrigGraphDiagram` for this |

**Renderer limitation — do NOT test these via TrigGraphDiagram questions:**
- "Read the amplitude from the graph" when the amplitude ≠ 1
- "Read the period from the graph" when the period ≠ 2π (sin/cos) or π (tan)
- Phase shift or vertical shift visible from graph positioning

---

### Phase 3 catalog entries (to add before `trig-measure-angles-exam-practice`)

```
slug: "trig-graph-amplitude-period"
stableSkillId: "y11adv-trig-measure-trig-graph-amplitude-period"
legacySlugs: ["unit-circle-trigonometric-graphs"]

slug: "trig-graph-transformations"
stableSkillId: "y11adv-trig-measure-trig-graph-transformations"
legacySlugs: ["unit-circle-trigonometric-graphs"]
```

---

### Phase 3 implementation prompt

```
Nova Maths context: c:\Users\joshu\hsc-maths-coach
Do not touch checkout/auth/payments.
Do not write to Supabase.
Do not edit visual renderer code.

Task: Implement Year 11 Advanced trigonometry-measure-angles Phase 3 — graph transformations.

Reference: docs/YEAR11_ADV_TRIG_MEASURE_ANGLES_SKILL_MAP_V2_SPLIT_PLAN.md (Phase 3 Blueprint section)

Files to change:
1. lib/lessons/year11Advanced/trigonometryMeasureAngles.ts
   - Add lesson handlers for "trig-graph-amplitude-period" and "trig-graph-transformations"
   - Use CartesianGraph sinusoidals for ALL transformed-graph visuals
   - Do NOT use TrigGraphDiagram for any transformed-graph question
   - TrigGraphDiagram is permitted only in teaching latexBlocks descriptions
2. lib/newCourseCatalog.ts
   - Add both new slugs before "trig-measure-angles-exam-practice"
   - Include stableSkillId, legacySlugs, skillCheckpoints per Skill Map v2 contract

Rules:
- Question ID prefix: y11adv-amp-* for amplitude-period, y11adv-shift-* for transformations
- Each lesson: 3 WE + 4 guided + 5 independent + 10 mastery = 22 questions (19 seeded)
- CartesianGraph sinusoidals params: use Math.PI for c values (e.g. c: Math.PI/3)
- Add one multiPartPractice per lesson (fluency chain: find amplitude → find period → find max value)
- All phase-shift answers: ask for the magnitude only (e.g. "pi/4"), not direction+magnitude
- Accepted answers: always add unicode-minus and π-symbol variants
- Do not introduce graph sketching or diagram-response questions

Validate:
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
git diff --check

Output: files changed, question counts, CartesianGraph usage, seed counts, validation result, risks.
```

---

## Phase 2 Content Blueprint — 2026-06-13

### Visual infrastructure audit

| Payload | Status | Suitable for |
|---|---|---|
| `TriangleDiagram` | ✅ Ready | Slot 6 — 30-60-90 and 45-45-90 triangles |
| `CartesianGraph` → `sinusoidals` | ✅ Ready | Slot 9 — sin, cos, tan graph features |
| `CartesianGraph` → `circles` + `points` + `lineSegments` | ⚠️ Approximate | Slots 7, 8 — can draw unit circle but no angle arcs, radian labels, or quadrant shading |
| `UnitCircleDiagram` (dedicated) | ❌ Does not exist | Slots 7, 8 — defer to Phase 3 |

**Conclusion:** Slots 6 and 9 have full visual support. Slots 7 and 8 must be authored text-only for Phase 2.

---

### Slot 6 — `exact-trig-values-special-triangles`

**Learning goal:** Recall exact sin, cos, tan values for π/6, π/4, π/3 using the 30-60-90 and 45-45-90 triangles, and apply them in calculations.

**Prerequisite:** Phase 1 conversion (`degrees-and-radians-concept`, `converting-degrees-radians`). Student must know π/6 = 30°, π/4 = 45°, π/3 = 60°.

**Worked example outlines:**
1. Derive all six values from the 30-60-90 triangle (sides 1, √3, 2). Label each ratio. Show sin π/6 = 1/2, cos π/6 = √3/2, tan π/6 = 1/√3 = √3/3; sin π/3 = √3/2, cos π/3 = 1/2, tan π/3 = √3. `TriangleDiagram` used.
2. Derive sin π/4 = cos π/4 = √2/2 and tan π/4 = 1 from the 45-45-90 triangle (sides 1, 1, √2). `TriangleDiagram` used.
3. Evaluate 2cos(π/3) + tan(π/4) without a calculator. Substitute exact values, simplify: 2(1/2) + 1 = 2. Text only.

**Guided practice focus:** Single exact value recall: sin π/6, cos π/3, tan π/4, sin π/4. One MCQ identifying a common error ("a student writes tan π/3 = 1 — identify the error").

**Independent practice focus:** All 9 exact values (sin, cos, tan at π/6, π/4, π/3); one mixed evaluation (e.g. "find sin²(π/3) + cos²(π/3)"); one MCQ error-identification.

**Mastery focus:** Distinguishing sin π/6 = 1/2 from sin π/3 = √3/2; tan π/3 = √3 not 1/√3 (rationalise or recall directly); combined exact-value expressions.

**Common misconceptions:**
- Swapping sin π/6 and sin π/3 — write the mnemonic: "1 2 3 under the root, over 2"
- Writing tan π/4 = √2 — tan = opposite/adjacent = 1/1 = 1
- Leaving √2/2 × √2/2 unsimplified as 2/4 instead of 1/2

**Accepted answer strategy:**
- sin π/6, cos π/3: accept "1/2", "0.5"
- sin π/4, cos π/4: accept "sqrt(2)/2", "(√2)/2", "1/sqrt(2)"
- tan π/3: accept "sqrt(3)", "√3"
- tan π/6: accept "1/sqrt(3)", "sqrt(3)/3", "(√3)/3" — do not accept decimal unless asked
- sin π/3, cos π/6: accept "sqrt(3)/2", "(√3)/2"

**Visual requirement:** `TriangleDiagram` on 2 worked examples. All 19 practice questions are text-only. **No blocker.**

---

### Slot 7 — `exact-trig-values-unit-circle`

**Learning goal:** Use (cosθ, sinθ) as the unit-circle coordinate rule and apply ASTC to determine the sign of sin, cos, and tan in each quadrant.

**Prerequisite:** Slot 6 (exact Q1 values to use as magnitudes), Phase 1 benchmark quadrant knowledge.

**Worked example outlines:**
1. Place 5π/6 on the unit circle: identify Q2; state sin > 0, cos < 0, tan < 0; give coordinates (−√3/2, 1/2). Text only (describe the circle verbally).
2. Given the angle 4π/3, identify Q3 using ASTC; state the sign of each function. Text only.
3. State the unit-circle coordinates at the boundary angle π/2: (0, 1); confirm sin(π/2) = 1, cos(π/2) = 0, tan(π/2) undefined. Text only.

**Guided practice focus:** Identify quadrant from radian angle; give the ASTC sign of each function; match an angle to its unit circle coordinates using a text-based coordinate table.

**Independent practice focus:** Coordinate identification at all four boundary angles (0, π/2, π, 3π/2); ASTC sign for sin/cos/tan at angles in each quadrant; one MCQ catching the (sin, cos) vs (cos, sin) coordinate reversal.

**Mastery focus:** (cosθ, sinθ) order (not (sinθ, cosθ)); tan = sin/cos so positive in Q3 (both negative, ratio positive); boundary angle traps (tan π/2 undefined); "a student writes the unit-circle point as (sinθ, cosθ) — identify the error."

**Common misconceptions:**
- Reversing the coordinate order to (sinθ, cosθ)
- Saying tan is negative in Q3 — it is positive because sin and cos are both negative
- Confusing "sin positive" (Q1 and Q2) with "all positive" (Q1 only)

**Accepted answer strategy:**
- Coordinates: accept "(cos θ, sin θ)" with explicit values; accept parenthesised tuples with ± fractions
- Signs: accept "positive", "+", "greater than zero"
- "undefined": accept "undefined", "DNE", "no value"

**Visual requirement:** A dedicated `UnitCircleDiagram` would show angle arcs, quadrant shading, and labelled points — it does not exist. `CartesianGraph` can draw a circle with plotted points as a fallback, but it cannot label radian angles on the arc or shade quadrants natively. **Text-only for Phase 2; defer unit circle visual to Phase 3.**

---

### Slot 8 — `unit-circle-all-quadrants`

**Learning goal:** Use a reference angle to evaluate exact sin, cos, tan in Q2, Q3, and Q4.

**Prerequisite:** Slot 7 (ASTC signs), Slot 6 (exact Q1 values as magnitudes).

**Worked example outlines:**
1. Evaluate cos(5π/6): reference angle = π − 5π/6 = π/6; |cos(π/6)| = √3/2; cosine negative in Q2 → −√3/2. Text only.
2. Evaluate sin(7π/6): reference angle = 7π/6 − π = π/6; |sin(π/6)| = 1/2; sine negative in Q3 → −1/2. Text only.
3. Evaluate tan(5π/3): reference angle = 2π − 5π/3 = π/3; |tan(π/3)| = √3; tangent negative in Q4 → −√3. Text only.

**Guided practice focus:** Three-step drill — state the quadrant, state the reference angle, apply the sign. Angles in Q2 and Q3 only (scaffold).

**Independent practice focus:** All three functions in Q2, Q3, Q4; an MCQ catching a sign error ("sin(5π/6) = −1/2 — identify the error").

**Mastery focus:** Q3 tangent is positive (error trap); reference angle must be measured from the nearest x-axis, not from the origin or y-axis; a combined evaluation requiring two exact values.

**Common misconceptions:**
- Taking the reference angle as the angle from the y-axis rather than the x-axis
- Applying the Q1 value without any sign adjustment
- Getting tan sign wrong in Q3 (positive, not negative)

**Accepted answer strategy:**
- Negative exact values: accept "-sqrt(3)/2", "-(√3)/2", "−√3/2"
- Positive values in Q3 (tan): accept "sqrt(3)", "√3" — reject if student writes −√3
- Error identification MCQs: answer key must name the specific error, not just the correct value

**Visual requirement:** A diagram showing the reference angle reflected onto the x-axis would be ideal — not available. `CartesianGraph` with a circle, a point, and a lineSegment can approximate it but lacks angle arc labels. **Text-only for Phase 2; defer to Phase 3 with unit circle visual infrastructure.**

---

### Slot 9 — `graphing-sin-cos-tan`

**Learning goal:** State and apply the period, range, starting value, and key points of y = sin x, y = cos x, and y = tan x.

**Prerequisite:** Slot 7 (unit circle connection: graph value = coordinate). Phase 1 benchmarks for x-axis labels.

**Worked example outlines:**
1. Sketch y = sin x for 0 ≤ x ≤ 2π: mark key points (0,0), (π/2,1), (π,0), (3π/2,−1), (2π,0). Use `CartesianGraph` sinusoidal {kind:"sin", a:1, b:1, c:0, d:0}.
2. State all key features of y = cos x: period 2π, range [−1,1], starting value 1, zeros at π/2 and 3π/2. Attach `CartesianGraph` sinusoidal {kind:"cos", a:1, b:1, c:0, d:0}.
3. State all key features of y = tan x: period π, range all reals, asymptotes at x = π/2 + kπ, zeros at x = kπ. Attach `CartesianGraph` sinusoidal {kind:"tan", a:1, b:1, c:0, d:0}.

**Guided practice focus:** Feature extraction by description ("which graph starts at 1?", "state the period of y = sin x", "where does cos x = 0 for x ∈ [0, 2π]?"). CartesianGraph payloads on 2 questions.

**Independent practice focus:** Period, range, amplitude for each; distinguishing sin from cos by start value and initial gradient; "where does tan x have a vertical asymptote?" One graph-reading question where the CartesianGraph is provided and the student names a feature.

**Mastery focus:** Tangent period = π (not 2π); tangent range is all reals (not [−1,1]); zeros of sin x vs cos x; "a student claims y = tan x has range [−1,1] — identify the error."

**Common misconceptions:**
- Tangent period is 2π — it is π
- Tangent range is bounded — it is all real numbers
- Confusing the y-intercept of sin (0) with cos (1)

**Accepted answer strategy:**
- Period: accept "2pi", "2π", "pi", "π" as appropriate
- Range: accept "[-1,1]", "−1 ≤ y ≤ 1", "from −1 to 1" for sin/cos; "all real numbers", "all reals", "ℝ", "(-∞, ∞)" for tan
- Asymptote: accept "pi/2", "π/2", "x = π/2"
- Zeros of sin x on [0,2π]: accept "0, pi, 2pi", "{0, π, 2π}"

**Visual requirement:** `CartesianGraph` with `sinusoidals` is fully supported (verified in `trigonometricFunctionsGraphs.ts`). Use it on all three worked examples and 2–3 practice questions. **No blocker.**

---

### Questions that must wait for visual infrastructure

| Slot | Question type | Waiting for |
|---|---|---|
| 7 | Any question that asks students to read an angle from a unit circle diagram | `UnitCircleDiagram` type |
| 7 | Questions showing the reference angle arc on a circle | `UnitCircleDiagram` type |
| 8 | Questions showing the reflected reference angle visually | `UnitCircleDiagram` type |

Everything else in Phase 2 is safe to author now.

---

### Recommended implementation order

1. **Slot 6 — `exact-trig-values-special-triangles`** — zero visual risk; `TriangleDiagram` ready; the most procedurally bounded of the four slots.
2. **Slot 9 — `graphing-sin-cos-tan`** — `CartesianGraph` sinusoidals ready; does not depend on unit circle knowledge; independent of slots 7–8.
3. **Slot 7 — `exact-trig-values-unit-circle`** — text-only; conceptually links slot 6 to slot 8.
4. **Slot 8 — `unit-circle-all-quadrants`** — text-only; depends on slot 7 for ASTC prerequisite chain.

---

### Phase 2 question ID prefixes

| Slot | Prefix | Avoids collision with |
|---|---|---|
| `exact-trig-values-special-triangles` | `y11adv-ev-` | existing `y11adv-trig-rad-*`, `y11adv-rcon-*`, etc. |
| `exact-trig-values-unit-circle` | `y11adv-uc-` | — |
| `unit-circle-all-quadrants` | `y11adv-refang-` | — |
| `graphing-sin-cos-tan` | `y11adv-graph-` | existing `y11adv-trig-circle-*` |

---

## 1. Current State

### Lessons (3)

| Slug | Content packed inside |
|---|---|
| `radians-exact-trigonometric-values` | Radian concept · degree↔radian conversion · arc length · sector area · exact values from 30-60-90 and 45-45-90 triangles · quadrant-boundary values |
| `unit-circle-trigonometric-graphs` | Unit circle coordinates · ASTC quadrant signs · reference angles · exact values in Q2/Q3/Q4 · sine and cosine graph features · tangent graph features |
| `trigonometry-measure-angles-exam-practice` | Mixed revision of all above |

### Problems with current structure

1. **Radians lesson is 6 skills in one.** A student weak on arc length but strong on conversion cannot target arc length specifically.
2. **Unit circle lesson is 5 skills in one.** Reference angles and ASTC signs are procedurally distinct and deserve separate mastery tracking.
3. **Graph transformations are entirely absent.** The NSW MA-T1 outcome includes `y = a sin(bx + c) + d` — amplitude, period, phase shift, and vertical shift. This content is missing from the unit.
4. **No visual payloads.** The unit circle and trig graph lessons have no diagram stimulus. Students must reason about curves from text descriptions alone.

---

## 2. Proposed Skill Map v2 Slots — 12 Total

| # | Slug | Title | Source | Visual needed |
|---|---|---|---|---|
| 1 | `trig-radian-measure` | Understanding Radian Measure | split | unit circle |
| 2 | `trig-degrees-radians-conversion` | Converting Between Degrees and Radians | split | — |
| 3 | `trig-arc-length` | Arc Length | split | sector |
| 4 | `trig-sector-area` | Sector Area | split | sector |
| 5 | `trig-exact-values-special-triangles` | Exact Trigonometric Values | split | triangle |
| 6 | `trig-unit-circle` | The Unit Circle and ASTC | split | unit circle |
| 7 | `trig-exact-values-all-quadrants` | Exact Values in All Quadrants | split | unit circle |
| 8 | `trig-sine-cosine-graphs` | Sine and Cosine Graphs | split | Cartesian graph |
| 9 | `trig-tangent-graph` | The Tangent Graph | split | Cartesian graph |
| 10 | `trig-amplitude-period` | Amplitude and Period of Trig Graphs | **new/missing** | Cartesian graph |
| 11 | `trig-phase-vertical-shift` | Phase Shift and Vertical Shift | **new/missing** | Cartesian graph |
| 12 | `trig-measure-angles-exam-practice` | Trigonometry and Measure of Angles Exam Practice | keep/expand | mixed |

**Classification summary:**

| Type | Count |
|---|---|
| Split from `radians-exact-trigonometric-values` | 5 (slots 1–5) |
| Split from `unit-circle-trigonometric-graphs` | 4 (slots 6–9) |
| New — missing from current unit | 2 (slots 10–11) |
| Keep and expand (exam practice) | 1 (slot 12) |

---

## 3. Per-Slot Specifications

### Slot 1 — `trig-radian-measure`

**Learning goal:** Define a radian as the angle subtended by an arc equal in length to the radius, and state benchmark angle equivalences.  
**Prerequisite:** Year 10 degrees and circles.  
**Key worked example:** Show that one full turn = 2π radians using the circumference formula. State π = 180°, π/2 = 90°, etc.  
**Visual:** Unit circle diagram with the radius and arc both labelled 1 and the angle θ marked.  
**Independent practice focus:** Converting benchmark angles by recognition (0, π/6, π/4, π/3, π/2, π, 3π/2, 2π); identifying whether an angle is in Q1/Q2/Q3/Q4 using radian benchmarks alone.  
**Mastery focus:** Radian-to-quarter-turn reasoning; "without a calculator, state the quadrant."  
**Level 6 challenge:** "A wheel turns through 5π/3 radians. How many degrees past a full turn does it travel?"  
**Question ID prefix (raw):** `trig-rad-*`

---

### Slot 2 — `trig-degrees-radians-conversion`

**Learning goal:** Multiply by π/180 or 180/π to convert any angle in either direction, and simplify the resulting fraction.  
**Prerequisite:** Slot 1 (radian concept).  
**Key worked example:** Convert 150° → 5π/6 (simplify the fraction by cancelling 30). Convert 7π/4 → 315° (cancel π, then compute 7 × 45).  
**Visual:** None required — procedural calculation.  
**Independent practice focus:** Non-trivial degree values (210°, 225°, 315°, 330°) and corresponding radian fractions; converting mixed decimals (e.g. 1.2 radians → degrees).  
**Mastery focus:** Fraction simplification errors; converting back and checking; "convert and identify the quadrant."  
**Level 6 challenge:** "Express 1 radian in degrees to 2 decimal places and explain why it is not a whole number."  
**Question ID prefix (raw):** `trig-conv-*`

---

### Slot 3 — `trig-arc-length`

**Learning goal:** Apply s = rθ (with θ in radians) to find arc lengths and to find the radius or angle when the arc length is given.  
**Prerequisite:** Slot 2 (conversion), so θ can be given in degrees and converted first.  
**Key worked example:** Three cases — find s; find r given s and θ; find θ given s and r.  
**Visual:** Sector/arc diagram with r and θ labelled, arc s highlighted.  
**Independent practice focus:** "Convert then apply"; exact-pi answers; a case where the angle is in degrees.  
**Mastery focus:** Ensuring θ is in radians; plausibility check (arc < full circumference when θ < 2π).  
**Level 6 challenge:** "An arc of length 6π is subtended by angle 3π/4. Find the radius."  
**Question ID prefix (raw):** `trig-arc-*`

---

### Slot 4 — `trig-sector-area`

**Learning goal:** Apply A = ½r²θ (with θ in radians) to find sector areas, and to find r or θ from a given area.  
**Prerequisite:** Slot 3 (same formula family; arc length first).  
**Key worked example:** Three cases — find A; find r given A and θ; a combined arc-length-plus-sector problem (perimeter of sector = 2r + s).  
**Visual:** Sector diagram with r and θ labelled, shaded sector area.  
**Independent practice focus:** All three variable roles; perimeter of a sector; "degree angle given — convert first."  
**Mastery focus:** Squaring r before multiplying by ½; mixed arc/sector combined problems.  
**Level 6 challenge:** "A sector has perimeter 24 and angle π/3. Find the area."  
**Question ID prefix (raw):** `trig-sec-*`

---

### Slot 5 — `trig-exact-values-special-triangles`

**Learning goal:** Recall exact sin, cos, tan values for π/6, π/4, π/3 (and their degree equivalents) using the 30-60-90 and 45-45-90 triangles.  
**Prerequisite:** SOHCAHTOA from Year 10.  
**Key worked example:** Derive all six values from the two special triangles. Present as a table to memorise.  
**Visual:** Two labelled right-triangle diagrams (one 30-60-90 with sides 1, √3, 2; one 45-45-90 with sides 1, 1, √2).  
**Independent practice focus:** All six functions at all three angles; "without a calculator"; error MCQ (e.g. "sin 60° = 1/2 — identify the error").  
**Mastery focus:** Distinguishing sin π/6 = 1/2 from sin π/3 = √3/2; exact reciprocal ratios (cosec, sec, cot as stretch challenge).  
**Level 6 challenge:** "Verify that sin²(π/3) + cos²(π/3) = 1 using exact values."  
**Question ID prefix (raw):** `trig-ev-*`

---

### Slot 6 — `trig-unit-circle`

**Learning goal:** Use (cosθ, sinθ) as the unit-circle coordinate rule and apply ASTC to determine the sign of each ratio in each quadrant.  
**Prerequisite:** Slot 5 (exact values), radian benchmarks from Slot 1.  
**Key worked example:** Place 5π/6 on the unit circle; identify it as Q2; state sin > 0, cos < 0; find coordinates (−√3/2, 1/2).  
**Visual:** Unit circle diagram with all four quadrants labelled and the ASTC signs shown.  
**Independent practice focus:** Identifying the quadrant from a radian angle; giving the sign of each function; identifying the coordinates for benchmark angles.  
**Mastery focus:** Confusion between (cosθ, sinθ) and (sinθ, cosθ) coordinate order; boundary angles (0, π/2, π).  
**Level 6 challenge:** "Write the coordinates of the point at angle 11π/6 and explain which quadrant it is in."  
**Question ID prefix (raw):** `trig-uc-*`

---

### Slot 7 — `trig-exact-values-all-quadrants`

**Learning goal:** Use a reference angle to evaluate exact sin, cos, tan in Q2, Q3, and Q4.  
**Prerequisite:** Slots 5 and 6.  
**Key worked example:** Evaluate cos(5π/6): reference angle is π/6, |cos(π/6)| = √3/2, cosine is negative in Q2 → −√3/2.  
**Visual:** Unit circle showing the reference angle reflected from the x-axis.  
**Independent practice focus:** All three functions at angles like 2π/3, 5π/4, 7π/4, 11π/6; "state the reference angle then the exact value."  
**Mastery focus:** tan in Q3 (positive); sign errors; "a student writes sin(5π/6) = −1/2 — identify and correct."  
**Level 6 challenge:** "Find all angles θ ∈ [0, 2π] where sin θ = cos θ."  
**Question ID prefix (raw):** `trig-refang-*`

---

### Slot 8 — `trig-sine-cosine-graphs`

**Learning goal:** State and apply the period, range, amplitude, starting value, and key points of y = sin x and y = cos x.  
**Prerequisite:** Slot 6 (unit circle connection to graph).  
**Key worked example:** Sketch y = sin x for 0 ≤ x ≤ 2π marking zeros, max and min. Repeat for y = cos x.  
**Visual:** Cartesian graph showing one full period of sin and cos with key x-values labelled (0, π/2, π, 3π/2, 2π) and y-values at each.  
**Independent practice focus:** Reading specific values from descriptions; period/range/amplitude identification; "which graph starts at 1?"  
**Mastery focus:** Distinguishing sin from cos by starting value and initial gradient; "state all x-values where sin x = 0 for x ∈ [0, 2π]."  
**Level 6 challenge:** "Explain why sin(x + π/2) = cos x using the unit circle."  
**Question ID prefix (raw):** `trig-sc-graph-*`

---

### Slot 9 — `trig-tangent-graph`

**Learning goal:** State the period, range, asymptotes, and key features of y = tan x and locate its undefined values.  
**Prerequisite:** Slot 6 (tan = sin/cos definition).  
**Key worked example:** Explain why tan is undefined at π/2; sketch one period from −π/2 to π/2; mark the asymptotes at ±π/2.  
**Visual:** Cartesian graph showing two periods of tan x with asymptotes as dashed vertical lines.  
**Independent practice focus:** Period (π not 2π); asymptote positions (π/2 + kπ); behaviour near asymptotes; comparing tan to sin/cos period.  
**Mastery focus:** "Tangent has period 2π" error trap; "tangent range is [−1, 1]" error trap.  
**Level 6 challenge:** "For y = tan x, find all x ∈ [0, 2π] where tan x = 1."  
**Question ID prefix (raw):** `trig-tan-graph-*`

---

### Slot 10 — `trig-amplitude-period` ⚠️ NEW

**Learning goal:** Identify and calculate the amplitude (a) and period (2π/b) of y = a sin(bx) and y = a cos(bx), and sketch one full period.  
**Prerequisite:** Slot 8.  
**Key worked example:** For y = 3 sin(2x): amplitude = 3, period = 2π/2 = π. Mark key points and sketch.  
**Visual:** Cartesian graph showing y = sin x overlaid with y = 3 sin(2x) for comparison.  
**Independent practice focus:** Calculate amplitude and period from equation; identify equation from described graph; "b doubled — how does the period change?"  
**Mastery focus:** Confusing amplitude with period; |a| for negative a values; "period of y = sin(x/3) is 6π."  
**Level 6 challenge:** "A sine wave has amplitude 4 and period π/2. Write its equation and find all zeros in [0, π]."  
**Question ID prefix (raw):** `trig-amp-per-*`

---

### Slot 11 — `trig-phase-vertical-shift` ⚠️ NEW

**Learning goal:** Identify the phase shift (c/b) and vertical shift (d) in y = a sin(bx + c) + d, and describe the effect on the graph.  
**Prerequisite:** Slot 10.  
**Key worked example:** For y = 2 sin(x + π/3) + 1: amplitude 2, period 2π, phase shift −π/3 (left), vertical shift +1. Identify the new starting point.  
**Visual:** Cartesian graph showing y = sin x and y = 2 sin(x + π/3) + 1 with the phase shift annotated.  
**Independent practice focus:** Extract phase shift and vertical shift from the equation; state the new range (d − a to d + a); mixed amplitude/period/shift identification.  
**Mastery focus:** Phase shift direction sign (y = sin(x + π/3) shifts LEFT not right); vertical range after shift; full feature summary from one equation.  
**Level 6 challenge:** "Find a, b, c, d for a graph with amplitude 3, period 4π, phase shift π/4 right, and midline y = −1."  
**Question ID prefix (raw):** `trig-shift-*`

---

### Slot 12 — `trig-measure-angles-exam-practice`

**Learning goal:** Apply any MA-T1 skill (radians, conversion, arc length, sector area, exact values, unit circle, graphs, transformations) to mixed exam-style questions.  
**Prerequisite:** Slots 1–11.  
**Key worked example:** Multi-step question: convert angle, find arc length, state cos in Q2, then describe how a transformation changes the graph.  
**Visual:** Mixed — sector diagram for arc/area, Cartesian graph for graph feature identification.  
**Independent practice focus:** Identify-then-solve; choosing the correct sub-skill; short multi-part questions.  
**Mastery focus:** Full MA-T1 breadth; common error MCQs; two-step exam items.  
**Question ID prefix (raw):** `trig-exam-*`  
**Note:** Existing exam-practice question IDs (`y11adv-trig-exam-*`) will remain valid — this slot absorbs the current `trigonometry-measure-angles-exam-practice` lesson without slug change.

---

## 4. Missing Skills

| Skill | Currently in? | Action |
|---|---|---|
| Radian concept / what a radian is | Embedded briefly in lesson 1 | Extract to dedicated slot 1 |
| Arc length | Lesson 1, 2 questions only | Expand to full lesson (slot 3) |
| Sector area | Lesson 1, 3 questions only | Expand to full lesson (slot 4) |
| Exact values in Q2/Q3/Q4 | Lesson 2, 4 questions | Expand to full lesson (slot 7) |
| y = a sin(bx + c) + d — amplitude, period | **Not present** | New slot 10 |
| y = a sin(bx + c) + d — phase/vertical shift | **Not present** | New slot 11 |
| Perimeter of a sector | Not present | Add to slot 4 |
| Solving trig equations (basic: sin x = k) | Not present in MA-T1 | Stays in `trigonometric-equations` — correct location |

---

## 5. Visual Payload Requirements

| Slot | Payload type | Exists? | Action |
|---|---|---|---|
| 1, 6, 7 | Unit circle diagram | **No** | Design `unitCircleDiagram` type or describe using `cartesianGraph` |
| 3, 4 | Sector/arc diagram | **No** | Design `sectorDiagram` type or use annotated circle |
| 5 | TriangleDiagram (30-60-90 and 45-45-90) | Yes | Use existing `triangleDiagram` with exact side labels |
| 8, 9, 10, 11 | Cartesian graph of trig function | Partial (exists but untested for periodic functions) | Verify `cartesianGraph` renders sin/cos; may need `periodicFunctionGraph` |

**Recommendation:** For MVP, use `cartesianGraph` for trig function plots (slots 8–11) and describe the unit circle in teaching text with a structured `unitCircleDiagram` as a future enhancement. Author slots 1–7 without diagram payload initially, using rich teaching text to describe the circle. Prioritise `triangleDiagram` for slot 5 (it already works).

---

## 6. Route and Progress Risks

| Risk | Severity | Mitigation |
|---|---|---|
| `radians-exact-trigonometric-values` progress rows become orphaned when split | High | Keep old slug as a legacy alias in the override function; do not delete it. Students show "completed — earlier version." |
| `unit-circle-trigonometric-graphs` progress rows become orphaned | High | Same — legacy alias strategy |
| Slots 10–11 (graph transformations) are new: no existing content, no progress rows | Low | Start fresh; no migration needed |
| `trigonometry-measure-angles-exam-practice` slug is unchanged | None | No migration |
| Exam practice (slot 12) becomes outdated if authored before slots 10–11 exist | Medium | Author slots 10–11 first; add phase/shift to exam practice last |
| Question IDs `y11adv-trig-rad-*` and `y11adv-trig-circle-*` are reused across the new split lessons — `COURSE_QUESTION_ID_PREFIX` still applies | Low | New split lessons use new raw prefixes (`trig-conv-*`, `trig-arc-*`, etc.). Old IDs stay in the legacy-alias lessons only |
| Unit circle and graph visuals require new visual types not yet in the type system | Medium | Author without diagram payloads in Phase 1; add payloads in Phase 2 once visual types are designed |

---

## 7. Safe Slug Names

All new slugs live inside unit `trigonometry-measure-angles`. The catalogue `lessons` array must be updated to include them in order.

```
trig-radian-measure
trig-degrees-radians-conversion
trig-arc-length
trig-sector-area
trig-exact-values-special-triangles
trig-unit-circle
trig-exact-values-all-quadrants
trig-sine-cosine-graphs
trig-tangent-graph
trig-amplitude-period
trig-phase-vertical-shift
trig-measure-angles-exam-practice   ← unchanged
```

Legacy aliases to preserve in the override function (return existing content under old slug):
```
radians-exact-trigonometric-values      → alias returning slot 1-5 content
unit-circle-trigonometric-graphs        → alias returning slot 6-9 content
```

---

## 8. Recommended Implementation Order

### Phase 1 — Radian Measurement (slots 1–5)
Safe, well-bounded, no missing visual types. Derives from existing content.  
Implement: `trig-radian-measure`, `trig-degrees-radians-conversion`, `trig-arc-length`, `trig-sector-area`, `trig-exact-values-special-triangles`.  
Update catalogue, add legacy aliases, validate dry-run seed.

### Phase 2 — Unit Circle and Basic Graphs (slots 6–9)
Depends on Phase 1 for prerequisite chain. Uses `triangleDiagram` (slot 5 cross-reference) and `cartesianGraph` for graphs.  
Implement: `trig-unit-circle`, `trig-exact-values-all-quadrants`, `trig-sine-cosine-graphs`, `trig-tangent-graph`.

### Phase 3 — Graph Transformations (slots 10–11)
New content — no legacy migration concerns. Needs `cartesianGraph` working for trig.  
Implement: `trig-amplitude-period`, `trig-phase-vertical-shift`.

### Phase 4 — Exam Practice Expansion (slot 12)
Expand the unchanged exam-practice lesson to include Phase 3 skills. Re-author 3–4 questions to cover graph transformations.

---

## 9. Next Implementation Prompt

```
Nova Maths context: c:\Users\joshu\hsc-maths-coach
Do not touch checkout/auth/payments.
Do not write to Supabase.
Do not copy proprietary content from Class Mathematics.

Task: Implement Year 11 Advanced trig-measure-angles Skill Map v2 split — Phase 1 (radian measurement).
Reference: docs/YEAR11_ADV_TRIG_MEASURE_ANGLES_SKILL_MAP_V2_SPLIT_PLAN.md

Files to change:
1. lib/lessons/year11Advanced/trigonometryMeasureAngles.ts
   - Add 5 new lesson blocks:
     trig-radian-measure, trig-degrees-radians-conversion, trig-arc-length,
     trig-sector-area, trig-exact-values-special-triangles
   - Keep legacy aliases for radians-exact-trigonometric-values and
     unit-circle-trigonometric-graphs (return existing content unchanged)
2. lib/newCourseCatalog.ts — update trigonometry-measure-angles unit lessons array
   to include the 5 new slugs before unit-circle-trigonometric-graphs

Rules:
- Each new lesson: 3 worked examples + 4 guided + 5 independent + 10 mastery = 22 questions.
- Use triangleDiagram with exact side labels on slot 5 (30-60-90 and 45-45-90).
- Use the existing formulaAnswer and practicalChoice helpers.
- Question ID prefix raw: trig-rad-*, trig-conv-*, trig-arc-*, trig-sec-*, trig-ev-*
- Arc length and sector area: keep answers as exact pi expressions (e.g. "2pi").
- Do not introduce graph transformations (slots 10-11) in this phase.
- Overlap guard: slot 2 (conversion) must not repeat the benchmark table from slot 1.

Validate:
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
git diff --check

Output: files changed, question counts per lesson, validation result, risks.
```

---

## 10. Content Boundary Map

```
MA-T1 outcome                              → Skill Map v2 slot
──────────────────────────────────────────────────────────────
Radian as unit of angle                    → trig-radian-measure (1)
Degree ↔ radian conversion                 → trig-degrees-radians-conversion (2)
Arc length s = rθ                          → trig-arc-length (3)
Sector area A = ½r²θ                       → trig-sector-area (4)
Exact values π/6, π/4, π/3                → trig-exact-values-special-triangles (5)
Unit circle (cosθ, sinθ); ASTC             → trig-unit-circle (6)
Reference angles; exact values Q2-Q4       → trig-exact-values-all-quadrants (7)
y = sin x and y = cos x graphs             → trig-sine-cosine-graphs (8)
y = tan x graph and asymptotes             → trig-tangent-graph (9)
y = a sin(bx): amplitude and period        → trig-amplitude-period (10) ← NEW
y = a sin(bx + c) + d: shifts             → trig-phase-vertical-shift (11) ← NEW
Mixed MA-T1 exam practice                  → trig-measure-angles-exam-practice (12)
```
