# Year 9 Core Trigonometry — Authoring Plan

Created: 2026-06-13  
Status: Design only. No code changes.  
Course: `year-9-mathematics-core`  
Unit: `working-with-triangles` (new lessons added to existing unit)  
NSW stage: Stage 5.2 — right-angle trigonometry only

---

## 1. Scope and Boundary

### What this unit covers (Stage 5.2)

Right-angle trigonometry only:
- Labelling hypotenuse, opposite, adjacent relative to a marked angle
- Writing sin θ, cos θ, tan θ as ratios
- Using SOH-CAH-TOA to find an unknown side
- Using inverse trig to find an unknown angle
- Practical applications of right-angle trig

### What this unit does NOT cover

The following are Stage 5.3 / Year 10 Advanced topics. Do not introduce them:
- Sine rule and cosine rule
- Area formula A = ½ab sin C
- Bearings
- Angles of elevation and depression (defer to Year 10 Core)
- Exact trig values (30°, 45°, 60°) beyond recognition

### Relationship to adjacent courses

| Course | Unit | Role |
|---|---|---|
| Year 9 Core | `working-with-triangles` (Pythagoras lessons) | **Prerequisite** — students already label the hypotenuse and know right triangles |
| Year 9 Advanced | `working-with-triangles` trig lessons | **Parallel** — Advanced uses `trigonometric-ratios`, `finding-sides-right-triangles`, `finding-angles-right-triangles`. Do not share slugs or copy question numbers. |
| Year 10 Core | `trigonometry` (v2 split slots 1–6) | **Continuation** — Year 10 Core deepens the same skills with harder contexts, rearrangement cases, and elevation/depression. Year 9 Core lays the foundation. |

---

## 2. Lesson Sequence — 7 Lessons

| # | Slug | Title | Stage | Core trim |
|---|---|---|---|---|
| 1 | `trig-naming-sides` | Naming Sides of a Right Triangle | 5.2 intro | Yes |
| 2 | `trig-ratios-intro` | The Trig Ratios: SOH-CAH-TOA | 5.2 | Yes |
| 3 | `trig-finding-sides-multiply` | Finding Sides (Multiply Step) | 5.2 | Yes |
| 4 | `trig-finding-sides-divide` | Finding Sides (Divide Step) | 5.2 | Yes |
| 5 | `trig-choosing-ratio` | Choosing the Right Ratio | 5.2 | Yes |
| 6 | `trig-finding-angles` | Finding Unknown Angles | 5.2 | Yes |
| 7 | `trig-applications` | Trig in Practical Contexts | 5.2 | Yes |

**Why 7 lessons, not 6?**  
Lessons 3 and 4 split "finding sides" by operation type — multiply vs divide. This split mirrors the Year 10 v2 sin/cos vs tan split philosophy, and it targets the most common procedural error (dividing when you should multiply). A single "finding sides" lesson at Year 9 Core level creates too steep a step change from guided to independent practice.

---

## 3. Per-Lesson Specifications

### Lesson 1 — `trig-naming-sides`

**Learning intention:** Identify and label the hypotenuse, opposite, and adjacent sides of a right triangle relative to a marked angle.  
**Success criteria:**
- State that hypotenuse is always opposite the right angle
- Name the opposite side as the one not touching the marked angle
- Name the adjacent side as the non-hypotenuse side touching the marked angle
- Re-label all three sides when the marked angle changes position

**Key worked example type:** Given a right triangle in standard orientation, label all three sides. Then repeat with a different vertex marked. Show that the labels change when θ moves.  
**Visual payload:** `triangleDiagram` required on every question. Use at least three different orientations (angle at top-left, bottom-left, top-right). Right-angle marker and θ label mandatory.  
**Guided focus:** Identification only — MCQ. No numbers.  
**Independent focus:** Non-standard orientations; identifying the adjacent vs opposite when θ is at bottom-right.  
**Mastery focus:** Include the 'adjacent means next to the right angle' misconception trap (MCQ); a question asking for re-labelling after the marked angle changes.  
**Partial-step design:** Step 1 — mark the right angle; Step 2 — mark θ; Step 3 — label the side that doesn't touch θ.  
**Level 6 challenge:** "Triangle ABC has right angle at B and θ at A. Write the names of all three sides. Now suppose θ moves to C instead. Which sides swap labels and which stays the same?"  
**Question ID prefix (raw):** `y9c-tri-nam-*`

---

### Lesson 2 — `trig-ratios-intro`

**Learning intention:** Write sin θ, cos θ, and tan θ as fractions using side lengths.  
**Success criteria:**
- Recall SOH-CAH-TOA
- Write each ratio from labelled side lengths as a simplified fraction or decimal
- Select the correct ratio given two known sides

**Key worked example type:** Given a 3-4-5 triangle with θ labelled at one vertex, write all three ratios. Then: given only two sides and a goal, identify which ratio to use.  
**Visual payload:** `triangleDiagram` with numeric side labels required.  
**Guided focus:** Writing each ratio from a labelled triangle; MCQ ratio selection.  
**Independent focus:** Computing tan θ as a decimal; identifying which ratio when two sides are described in words (no diagram — tests that the student has internalised labels, not just read them).  
**Mastery focus:** Given sin θ, derive cos θ using the same Pythagorean triple (light preview of the connection). Error MCQ: "A student writes sin θ = hyp/opp — what is wrong?"  
**Partial-step design:** Step 1 — identify the two sides involved; Step 2 — write the ratio in words (opp over hyp); Step 3 — substitute the numbers.  
**Level 6 challenge:** "In a right triangle, tan θ = 3/4. Without using a calculator, find sin θ and cos θ."  
**Question ID prefix (raw):** `y9c-tri-rat-*`

---

### Lesson 3 — `trig-finding-sides-multiply`

**Learning intention:** Use SOH-CAH-TOA to find an unknown non-hypotenuse side by multiplying the hypotenuse by the trig ratio.  
**Success criteria:**
- Set up the correct ratio equation (e.g. sin θ = x/hyp)
- Rearrange to x = hyp × sin θ
- Evaluate on a calculator in degree mode and round to 1 decimal place

**Numerical constraint:** Limit this lesson to cases where the unknown is the opposite or adjacent and the hypotenuse is given (multiply step only). Do not introduce finding the hypotenuse here — that is Lesson 4.  
**Key worked example type:** Three examples — one with sin, one with cos, one with tan where adj is known and opp is the unknown.  
**Visual payload:** `triangleDiagram` — hyp and angle labelled; unknown side marked x.  
**Guided focus:** MCQ setup equation; typed answer for opp from hyp; MCQ for choosing sin vs cos.  
**Independent focus:** Q1–Q3: varied angles (25°, 40°, 65°). Q4: tan case (adj given, opp wanted). Q5: mild real-world context (ramp height, not an elevation problem).  
**Mastery focus:** Error trap for radian mode; choosing sin vs cos from diagram; a "check your answer" question where the student verifies a given calculation.  
**Partial-step:** Step 1 — identify known sides and angle; Step 2 — write ratio equation; Step 3 — multiply and round.  
**Level 6 challenge:** "A right triangle has hypotenuse 20 cm and angle 30°. Without a calculator, find the opposite side using the exact value sin 30° = 0.5."  
**Question ID prefix (raw):** `y9c-tri-sm-*`

---

### Lesson 4 — `trig-finding-sides-divide`

**Learning intention:** Find the hypotenuse or an unknown side when the trig equation requires dividing.  
**Success criteria:**
- Recognise when the unknown is the denominator of the trig ratio
- Rearrange to isolate the unknown by dividing
- Confirm that the hypotenuse must be the largest side (plausibility check)

**Numerical constraint:** Focus on hyp = opp ÷ sin θ and hyp = adj ÷ cos θ. Introduce adj = opp ÷ tan θ as a secondary case. Keep angles between 25° and 65°.  
**Key worked example type:** One example finding the hyp from the opposite side (rearranging sin θ = opp/hyp → hyp = opp ÷ sin θ). Emphasise the "flip" step.  
**Visual payload:** `triangleDiagram` — mark which side is unknown; label the given side and angle.  
**Guided focus:** MCQ distinguishing multiply vs divide; equation setup MCQ; typed answer for hyp.  
**Independent focus:** Q1–Q3: hyp from opp or adj. Q4: adj from opp using tan. Q5: error trap where a student multiplied instead of divided.  
**Mastery focus:** Mixed multiply/divide selection; plausibility checking; one practical scenario (find the slant length of a slide).  
**Partial-step:** Step 1 — write ratio with unknown; Step 2 — rearrange (divide); Step 3 — evaluate.  
**Level 6 challenge:** "The opposite side is 4 cm and the hypotenuse is 10 cm. A student uses sin θ = 4/10 = 0.4 and then writes the adjacent side as 10 × cos(sin⁻¹(0.4)). Calculate the adjacent side using Pythagoras instead and verify the two methods agree."  
**Question ID prefix (raw):** `y9c-tri-sd-*`

---

### Lesson 5 — `trig-choosing-ratio`

**Learning intention:** Select the correct trig ratio given any two sides or any side and an angle, and decide whether to multiply or divide.  
**Success criteria:**
- Identify the two sides involved from a diagram description
- Select sin, cos, or tan based only on those sides
- Choose whether to multiply or divide based on which side is unknown

**Why a dedicated "choosing" lesson?**  
The single most common error in right-angle trig is ratio mis-selection. After Lessons 3 and 4 establish the two operation types, this lesson consolidates the full decision tree before inverse trig is introduced. Students practise the selection step in isolation.  
**Key worked example type:** Decision-tree diagram (described in teaching text, not image): "Which sides? → sin/cos/tan → unknown at top or bottom? → multiply or divide."  
**Visual payload:** `triangleDiagram` on every question.  
**Guided focus:** Four MCQ — different side pairs each time.  
**Independent focus:** Mixed typed answers: Q1–Q3 "set up the equation only (do not solve)", Q4–Q5 full solve.  
**Mastery focus:** "A student wrote tan θ = opp/hyp. What is wrong?" (MCQ); mixed ratio selection and solve.  
**Partial-step:** Step 1 — name the two sides; Step 2 — pick the ratio; Step 3 — solve.  
**Level 6 challenge:** "A triangle has sides 5, 12, 13 with the right angle opposite 13. List all possible trig ratios for the angle at the vertex between sides 5 and 13."  
**Question ID prefix (raw):** `y9c-tri-ch-*`

---

### Lesson 6 — `trig-finding-angles`

**Learning intention:** Apply sin⁻¹, cos⁻¹, or tan⁻¹ to find an unknown angle in a right triangle from two known sides.  
**Success criteria:**
- Write the trig ratio correctly from the two known sides
- Apply the inverse function to find the angle
- Express the answer in degrees to the nearest degree

**Overlap caution:** This is structurally similar to Year 10 Core `finding-angles-inverse-trig`. Use different numerical values. Keep the Year 9 lesson tightly scaffolded (always two labelled sides given); the Year 10 lesson handles more varied framing. Do not use the same example numbers as `find-ang-g2` (adj=6, hyp=10) or `find-ang-m2` (adj=15, hyp=17).  
**Visual payload:** `triangleDiagram` — angle marked as θ, two sides numerically labelled.  
**Guided focus:** MCQ "which inverse"; typed answer for angle.  
**Mastery focus:** Radian mode error trap; inverting the ratio error; a 3-4-5 triangle question to check intuition.  
**Partial-step:** Step 1 — write the ratio; Step 2 — apply inverse; Step 3 — round.  
**Level 6 challenge:** "Find all three angles of a 5-12-13 right triangle."  
**Question ID prefix (raw):** `y9c-tri-ang-*`

---

### Lesson 7 — `trig-applications`

**Learning intention:** Apply right-angle trigonometry to practical contexts including height, distance, and slope.  
**Success criteria:**
- Draw and label a right triangle from a word description
- Identify the relevant angle and sides
- Find the unknown using the appropriate trig method
- Interpret the answer in context with appropriate units

**Scope guard:** Use straightforward one-triangle practical scenarios. Do not introduce elevation/depression terminology, bearings, or two-triangle problems — those belong in Year 10 Core.  
**Context types:** Ramp slopes, building heights from a ground-level measurement, shadow lengths, roof pitch.  
**Visual payload:** `triangleDiagram` — student-facing diagrams should use `Observer`/`Base` vertex labels where helpful.  
**Guided focus:** Q1 identifies the triangle from a diagram already given. Q2 uses a described scenario with a pre-labelled triangle.  
**Independent focus:** Q3–Q5 require the student to extract the triangle from a word problem.  
**Mastery focus:** Mixed — some find a side, some find an angle; unit interpretation (answer "4.2 m", not "4.2"); one "which method" MCQ.  
**Partial-step:** Step 1 — draw and label the right triangle; Step 2 — set up the equation; Step 3 — solve.  
**Level 6 challenge:** "A ramp must rise exactly 1 m over a horizontal run of 6 m. Find the angle of inclination and the length of the ramp surface."  
**Question ID prefix (raw):** `y9c-tri-app-*`

---

## 4. Visual Payload Summary

| Lesson | Payload | Required on | Priority |
|---|---|---|---|
| 1–7 | `triangleDiagram` | Every question referencing a labelled triangle | Mandatory |
| 7 | `triangleDiagram` with `vertexLabels` | Practical context questions | Mandatory |
| All | No `cartesianGraph` | N/A — not needed for right-angle trig | — |

**Triangle orientation rule:** Vary the position of θ across questions within each lesson. Use at least two different vertex positions per lesson to prevent students pattern-matching from layout rather than reasoning from labels.

**Standard triangle factory:** `lib/lessons/year9/workingWithTriangles.ts` already has a `triangle()` helper function. Use it. The default vertices are A(80,40), C(80,230), B(330,230) with right angle at C. For a different orientation (angle at bottom-right), swap the vertex coordinates.

---

## 5. Overlap Risk: Year 9 Core vs Year 10 Core

| Element | Year 9 Core action | Year 10 Core action |
|---|---|---|
| Lesson slugs | Entirely new slugs (y9c- prefix) | Existing/split slugs (y10c- prefix) |
| Worked example numbers | Use Pythagorean-triple-friendly angles (30°, 37°, 53°, 45°) | Use varied angles including non-round values |
| Practical contexts | Ramps, slopes, shadows, roof pitch | Ladders, buildings, navigation, elevation |
| Rearrangement depth | Multiply and divide steps separated into distinct lessons | Mix of all cases within each lesson |
| Elevation/depression | Absent — mention "You will learn this in Year 10" | Present as dedicated lesson |
| Question count | 4 + 5 + 10 = 19 standard | 4 + 7 + 10 = 21 (v2 expanded independent) |

---

## 6. Implementation Risks

| Risk | Severity | Mitigation |
|---|---|---|
| `year9CoreUnits` filter does not include new slugs → Core students see nothing | High | Add all 7 slugs to the `year9CoreUnits` lesson filter in `newCourseCatalog.ts` in the same PR as lesson authoring |
| Override guard accepts only Core course slug, not Advanced → Advanced students see Year 9 Core-level questions | High | Guard with `course.slug === "year-9-mathematics-core"` only |
| Question IDs without `y9c-` prefix could collide with Year 9 base/Advanced if guard fails | Medium | Use raw IDs like `y9c-tri-nam-g1` in the source (double-prefixed is safe; `y9c-y9c-` is ugly but won't break) |
| Partial-step UI not yet built | Medium | Author partial-step specs in plan only; seed as standard questions in initial release; wire up when UI ships |
| Year 9 Core trig content at Stage 5.2 level — some current Year 9 Core students may be Stage 5.1 | Low | Keep Lessons 3–7 behind a clear unit progression; do not break the Pythagoras lessons that currently load correctly |
| 852 existing audit warnings for Year 9 courses — new lessons may add more | Low | Known style issue; do not block release; address in batch pass |

---

## 7. Catalogue Change Required

In `lib/newCourseCatalog.ts`, the `year9CoreUnits` filter currently allows only:
```
["pythagoras-hypotenuse", "pythagoras-shorter-side", "right-triangle-applications"]
```

After authoring, update to:
```
[
  "pythagoras-hypotenuse",
  "pythagoras-shorter-side",
  "right-triangle-applications",
  "trig-naming-sides",
  "trig-ratios-intro",
  "trig-finding-sides-multiply",
  "trig-finding-sides-divide",
  "trig-choosing-ratio",
  "trig-finding-angles",
  "trig-applications",
]
```

This change is a one-line diff but must not land before the lesson override functions exist — otherwise the catalogue shows empty lessons.

---

## 8. Next Implementation Prompt

```
Nova Maths context: c:\Users\joshu\hsc-maths-coach
Do not touch checkout/auth/payments.
Do not write to Supabase. Do not copy content from Year 10 trig lessons.

Task: Author Year 9 Core Trigonometry lessons 1–3.
Reference: docs/YEAR9_CORE_TRIG_AUTHORING_PLAN.md

Files to change:
1. lib/lessons/year9/workingWithTriangles.ts — add override content for:
   - trig-naming-sides
   - trig-ratios-intro
   - trig-finding-sides-multiply
2. lib/newCourseCatalog.ts — update year9CoreUnits filter to include the three new slugs.

Rules:
- Each lesson: 4 guided + 5 independent + 10 mastery = 19 questions.
- Raw question IDs: y9c-tri-nam-*, y9c-tri-rat-*, y9c-tri-sm-* (y9c- prefix auto-applied).
- triangleDiagram required on every question referencing a labelled triangle.
- Use the existing triangle() helper in workingWithTriangles.ts.
- Override guard: course.slug === "year-9-mathematics-core" only.
- Do not use the same worked example numbers as Year 10 lessons
  (find-side-g3 uses hyp=12,θ=30° — use different values).
- Angles: use 30°, 37°, 40°, 45°, 53°, 60° — calculator-friendly values.
- Keep Lesson 3 to multiply-only cases (unknown is opposite or adjacent,
  hypotenuse is given). No divide cases in this lesson.

Validate:
npx.cmd tsc --noEmit
npm.cmd run audit:lessons
npm.cmd run seed -- --dry-run year-9-mathematics-core
git diff --check

Output: files changed, question count per lesson, any audit warnings, validation result.
```
