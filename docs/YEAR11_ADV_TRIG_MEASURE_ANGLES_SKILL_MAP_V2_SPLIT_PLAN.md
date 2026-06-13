# Year 11 Advanced — Trigonometry and Measure of Angles  
# Skill Map v2 Split Plan

Created: 2026-06-13  
Status: Design only. No code changes.  
Course: `year-11-advanced`  
Unit: `trigonometry-measure-angles`  
NSW strand: MA-T1 — Trigonometry and Measure of Angles

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
