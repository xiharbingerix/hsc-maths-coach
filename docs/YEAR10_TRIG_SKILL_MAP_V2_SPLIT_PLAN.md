# Year 10 Trigonometry — Skill Map v2 Split Plan

Created: 2026-06-13  
Status: Phase 1b implemented. Catalogue split, Core visibility, lesson wrappers and seed dry-run support are in place.
Applies to: `year-10-mathematics`, `year-10-mathematics-advanced`, `year-10-mathematics-core`

---

## 1. Current Structure

Unit slug: `trigonometry`  
Unit title: "Trigonometry"  
Lesson count: **8** (Advanced/base) | **4** (Core — right-angle trig only)

| # | Current slug | Current title | Q IDs |
|---|---|---|---|
| 1 | `trigonometric-ratios` | Trigonometric Ratios | `trig-rat-*` |
| 2 | `finding-sides-trig` | Finding Unknown Sides | `find-side-*` |
| 3 | `finding-angles-trig` | Finding Unknown Angles | `find-ang-*` |
| 4 | `elevation-depression` | Angles of Elevation and Depression | `elev-dep-*` |
| 5 | `sine-rule` | The Sine Rule | `sine-rul-*` |
| 6 | `cosine-rule` | The Cosine Rule | `cos-rul-*` |
| 7 | `area-trig-formula` | Area of a Triangle | `area-trig-*` |
| 8 | `bearings` | Bearings | `bearing-*` |

**Core pathway trim** (via `year10CoreUnits` in `newCourseCatalog.ts`):  
Lessons 1–4 only. Sine rule, cosine rule, area formula, and bearings are Advanced-only.

**Key observation from source inspection:**  
Lessons 1 and 2 are the most overloaded. Lesson 1 mixes side identification (conceptual) with ratio selection and ratio calculation (procedural). Lesson 2 mixes sin/cos operations (hypotenuse-involving) with tan operations (no hypotenuse) — a meaningful cognitive distinction that drives two of the most common student errors.

---

## 2. Proposed v2 Split — 12 Subtopics

### Status codes

| Code | Meaning |
|---|---|
| `[E]` | Keep existing — minimal question redistribution |
| `[S]` | Split from existing lesson |
| `[N]` | New — no current questions exist |

### Split table

| # | v2 slug | Title | Status | From | Core? | Visual |
|---|---|---|---|---|---|---|
| 1 | `trig-ratios-identifying-sides` | Identifying Triangle Sides | [S] | `trigonometric-ratios` | Yes | `triangleDiagram` |
| 2 | `trig-ratios-sin-cos-tan` | Writing and Selecting Trig Ratios | [S] | `trigonometric-ratios` | Yes | `triangleDiagram` |
| 3 | `finding-sides-sin-cos` | Finding Sides Using Sin and Cos | [S] | `finding-sides-trig` | Yes | `triangleDiagram` |
| 4 | `finding-sides-tan` | Finding Sides Using Tan | [S] | `finding-sides-trig` | Yes | `triangleDiagram` |
| 5 | `finding-angles-inverse-trig` | Finding Angles Using Inverse Trig | [E] | `finding-angles-trig` | Yes | `triangleDiagram` |
| 6 | `elevation-depression-applications` | Angles of Elevation and Depression | [E] | `elevation-depression` | Yes | `triangleDiagram` |
| 7 | `sine-rule-finding-sides` | Sine Rule — Finding Sides | [S] | `sine-rule` | Adv only | `triangleDiagram` |
| 8 | `sine-rule-finding-angles` | Sine Rule — Finding Angles | [S] | `sine-rule` | Adv only | `triangleDiagram` |
| 9 | `cosine-rule-finding-sides` | Cosine Rule — Finding Sides | [S] | `cosine-rule` | Adv only | `triangleDiagram` |
| 10 | `cosine-rule-finding-angles` | Cosine Rule — Finding Angles | [S] | `cosine-rule` | Adv only | `triangleDiagram` |
| 11 | `area-of-triangle-formula` | Area of a Triangle | [E] | `area-trig-formula` | Adv only | `triangleDiagram` |
| 12 | `bearings-and-trigonometry` | Bearings | [E] | `bearings` | Adv only | `cartesianGraph` |

**Two additional new slots (Phase 2):**
- `trig-mixed-problem-solving` [N] — choosing between right-angle trig and sine/cosine rule
- `trigonometry-exam-practice` [N] — full HSC-style exam practice, multi-rule problems

**Summary:** 8 current lessons → 12 v2 subtopics (6 splits, 4 keep-existing, 0 new in Phase 1).  
Core pathway: 4 current lessons → 6 v2 subtopics (all within Core trim boundary).

---

## 3. Per-Subtopic Design Specifications

### Slot 1 — `trig-ratios-identifying-sides`

**Title:** Identifying Triangle Sides  
**Learning goal:** Label hypotenuse, opposite and adjacent sides correctly relative to a specified angle in any right triangle orientation.  
**Prerequisite:** None within trig; general right-triangle familiarity from Year 9.  
**Key worked example type:** Given a right triangle with a marked angle in any position, identify all three sides and explain the labelling rule.  
**Visual payload:** `triangleDiagram` — every question that names a side must carry a labelled triangle. Right-angle marker, angle label θ, vertex labels A/B/C. Include at least one triangle in each orientation (angle at bottom-left, top-right, etc.).  
**Independent practice focus:** Triangles in non-standard orientations; identifying sides when the marked angle is at a different vertex; one MCQ on the 'adjacent means next to the right angle' misconception.  
**Mastery focus:** Rapid identification under pressure; mixed orientations; one question testing that hypotenuse is always opposite the right angle.  
**Level 6 challenge:** "Triangle XYZ has a right angle at Y. Side XZ is the hypotenuse. If the angle at Z is marked θ, which side is adjacent to θ? Explain why XY is now the opposite side despite being a vertical side."  
**New question ID prefix:** `trig-id-*`  
**Notes:** Take the identification-only questions from existing `trig-rat-*` set (g1, g2, i1, m1, m7, m10). The ratio-writing questions (g3, g4, i2–i5, m2–m6, m8, m9) stay with Slot 2.

---

### Slot 2 — `trig-ratios-sin-cos-tan`

**Title:** Writing and Selecting Trig Ratios  
**Learning goal:** Write sin θ, cos θ, and tan θ as exact fractions from labelled side lengths; select the correct ratio given two known/wanted sides.  
**Prerequisite:** `trig-ratios-identifying-sides`  
**Key worked example type:** Given side lengths, write all three ratios; given two sides and a goal, identify which SOH-CAH-TOA ratio to use.  
**Visual payload:** `triangleDiagram` — triangle with numeric side labels. Required on all "write the ratio" questions.  
**Independent practice focus:** Recognising the ratio from which two sides appear; computing tan θ as a decimal; the "which ratio?" selection task with context clues.  
**Mastery focus:** Given sin θ, find cos θ using the Pythagorean triple relationship; ratio selection under varied framing; tan > 1 recognition.  
**Level 6 challenge:** "In a right triangle, sin θ = k/√(k² + 9). Find tan θ in terms of k without computing any sides numerically."  
**New question ID prefix:** `trig-rat2-*` (keep `trig-rat-*` IDs on existing questions migrated here)  
**Notes:** Contains the ratio-writing and selection questions from `trig-rat-*`. No calculation of side lengths — that begins in Slot 3.

---

### Slot 3 — `finding-sides-sin-cos`

**Title:** Finding Sides Using Sin and Cos  
**Learning goal:** Use sin or cos to find an unknown side in a right triangle when the hypotenuse and one acute angle are known, or find the hypotenuse when an opposite or adjacent side and angle are known.  
**Prerequisite:** `trig-ratios-sin-cos-tan`  
**Key worked example type:** (a) opp = hyp × sin θ; (b) adj = hyp × cos θ; (c) hyp = opp ÷ sin θ (rearrangement).  
**Visual payload:** `triangleDiagram` required on all questions. Label the known side and unknown with `x`. Angle label at vertex.  
**Independent practice focus:** Q1–Q3: direct opp/adj from hyp. Q4–Q5: finding hyp when opp or adj is given (rearrangement). Real-world context for Q5 (ladder, ramp, rafter).  
**Mastery focus:** Mixed — given info could be opp, adj, or hyp; student must choose sin vs cos. Includes: rearranging for hyp; checking plausibility (hyp must be longest); error-analysis MCQ for multiplying vs dividing.  
**Level 6 challenge:** "A 10 m ladder rests against a vertical wall. The foot is 4 m from the wall. Find the angle, then use it to confirm the height reached using sin."  
**New question ID prefix:** `find-sc-*` (take `find-side-*` sin/cos questions; tan questions go to Slot 4)  
**Notes:** Separating sin/cos from tan removes the single most common confusion at this stage. Most existing `find-side-*` questions use hyp as the given side — those stay here. The `find-side-i4` (adj = 9, tan-based), `find-side-m5`, `find-side-m7` move to Slot 4.

---

### Slot 4 — `finding-sides-tan`

**Title:** Finding Sides Using Tan  
**Learning goal:** Use tan to find an unknown opposite or adjacent side when the other is known, without using the hypotenuse.  
**Prerequisite:** `trig-ratios-sin-cos-tan`  
**Key worked example type:** (a) opp = adj × tan θ; (b) adj = opp ÷ tan θ; (c) choosing between tan and sin/cos based on the available sides.  
**Visual payload:** `triangleDiagram` required. Stress that the hypotenuse is not labelled because it is not involved.  
**Independent practice focus:** Finding opp from adj; finding adj from opp; recognising when tan is appropriate vs sin or cos; one MCQ on "why not sin here".  
**Mastery focus:** Includes tan = 1 (45°) and tan > 1 recognition; a real-world height-from-distance problem; an error-analysis question where a student incorrectly uses sin instead of tan.  
**Level 6 challenge:** "Two observers A and B stand on opposite banks of a river. They observe the same tree T directly across. If A is 50 m upstream of B, and the tree's angle from the baseline is 60° from A and 40° from B, set up two equations and find the river width."  
**New question ID prefix:** `find-tan-*`

---

### Slot 5 — `finding-angles-inverse-trig` [E — keep existing]

**Title:** Finding Angles Using Inverse Trig  
**Learning goal:** Apply sin⁻¹, cos⁻¹, or tan⁻¹ to find an unknown angle in a right triangle from two known sides.  
**Prerequisite:** `trig-ratios-sin-cos-tan`  
**Key worked example type:** Three examples, one per ratio. Include the radian-mode error as a mastery MCQ.  
**Visual payload:** `triangleDiagram` required — angle shown as θ with `?` label.  
**Independent practice focus:** One MCQ on "which inverse function"; four typed angle calculations with different ratio types.  
**Mastery focus:** Mixed ratio identification under time pressure; radian-mode error trap; inverting ratio error; finding the angle from a 5-12-13 triangle (tan⁻¹(opp/adj) choice).  
**Level 6 challenge:** "In triangle ABC (right angle at C), sides a = 5, b = 12, c = 13. Find all three angles. Use the angle sum to verify."  
**New question ID prefix:** Keep existing `find-ang-*` IDs unchanged.  
**Notes:** Minimal redistribution needed. This lesson is already well-scoped.

---

### Slot 6 — `elevation-depression-applications` [E — keep existing]

**Title:** Angles of Elevation and Depression  
**Learning goal:** Model and solve practical elevation and depression problems using right-triangle trigonometry.  
**Prerequisite:** `finding-sides-tan`, `finding-angles-inverse-trig`  
**Key worked example type:** One elevation (find height), one depression (find distance), one find-the-angle.  
**Visual payload:** `triangleDiagram` with `Observer` and `Top`/`Boat` vertex labels already in the source. Retain all existing diagram data.  
**Independent practice focus:** Q4–Q5 should push to two-height scenarios (building A/B comparison — already exists as `elev-dep-i5`).  
**Mastery focus:** Elevation = depression alternate interior angles trap (MCQ); depression where the unknown is the cliff height; combined multi-step.  
**Level 6 challenge:** "Two observers A and B are 100 m apart on level ground. The angle of elevation to a tower top from A is 25° and from B is 40°. A and B are on opposite sides of the tower. Find the height."  
**New question ID prefix:** Keep existing `elev-dep-*` IDs unchanged.

---

### Slot 7 — `sine-rule-finding-sides`

**Title:** Sine Rule — Finding Sides  
**Learning goal:** Use the sine rule to find an unknown side in a non-right-angled triangle when an opposite angle-side pair is known.  
**Prerequisite:** `elevation-depression-applications` (comfort with angle–side pairing)  
**Key worked example type:** a/sin A = b/sin B — given one opposite pair and another angle, find the second side.  
**Visual payload:** `triangleDiagram` — non-right-angled triangle with angle labels at all vertices and side labels opposite each.  
**Independent practice focus:** Q1–Q3: direct sine rule application (numeric angles 30°–70°). Q4–Q5: practical context (surveying distance, ship distance from two bearings).  
**Mastery focus:** Choosing between side forms; recognising when sine rule applies vs cosine rule; at least one question where the unknown is the denominator and rearrangement is needed.  
**Level 6 challenge:** "In triangle PQR, angle P = 50°, angle Q = 65°, and PQ = 12 cm. Find QR and PR. Then verify by checking that the largest side is opposite the largest angle."  
**New question ID prefix:** `sine-s-*` (existing `sine-rul-*` side questions stay; angle questions move to Slot 8)

---

### Slot 8 — `sine-rule-finding-angles`

**Title:** Sine Rule — Finding Angles  
**Learning goal:** Use the inverted form of the sine rule to find an unknown angle in a non-right-angled triangle.  
**Prerequisite:** `sine-rule-finding-sides`  
**Key worked example type:** sin A/a = sin B/b → A = sin⁻¹(a sin B / b). Include a case where two solutions exist (obtuse ambiguity) as an awareness example.  
**Visual payload:** `triangleDiagram` — mark the unknown angle with θ; label opposite sides.  
**Independent practice focus:** Direct inverse-sine application; one question where the calculated angle must be checked against the angle sum; one MCQ on "why the obtuse case exists".  
**Mastery focus:** Mixed side-finding and angle-finding questions; the ambiguous case MCQ; two-angle verification using angle sum.  
**Level 6 challenge:** "In triangle ABC, a = 10, b = 8, and angle A = 30°. Show that two different triangles satisfy these conditions and find both values of angle B."  
**New question ID prefix:** `sine-a-*`

---

### Slot 9 — `cosine-rule-finding-sides`

**Title:** Cosine Rule — Finding Sides  
**Learning goal:** Use c² = a² + b² − 2ab cos C to find the unknown side opposite a known included angle.  
**Prerequisite:** `sine-rule-finding-angles` (or: knowing when sine rule does not apply)  
**Key worked example type:** Given two sides and the included angle, find the third side using the full cosine rule expansion.  
**Visual payload:** `triangleDiagram` — non-right triangle; label two given sides with numbers, unknown side with `x`, included angle marked at C.  
**Independent practice focus:** Q1–Q3: numerical practice. Q4: context problem (diagonal of a parallelogram). Q5: selecting between sine rule and cosine rule (MCQ).  
**Mastery focus:** Includes Pythagoras as a special case check (C = 90°); large included angles (obtuse); real-world distance problem.  
**Level 6 challenge:** "A parallelogram has sides 8 cm and 11 cm with an included angle of 70°. Find both diagonals using the cosine rule."  
**New question ID prefix:** `cos-s-*`

---

### Slot 10 — `cosine-rule-finding-angles`

**Title:** Cosine Rule — Finding Angles  
**Learning goal:** Rearrange the cosine rule to cos C = (a² + b² − c²) / (2ab) to find an unknown angle given three sides.  
**Prerequisite:** `cosine-rule-finding-sides`  
**Key worked example type:** All three sides known → find each angle. Include checking that the largest angle is opposite the largest side.  
**Visual payload:** `triangleDiagram` — all three sides labelled with numbers, unknown angle marked as θ.  
**Independent practice focus:** Q1–Q3: direct rearrangement. Q4: find the largest angle. Q5: MCQ on cos > 0 vs cos < 0 and what it means for the angle (acute/obtuse).  
**Mastery focus:** Includes identifying obtuse angles from negative cosine; full triangle with all three angles verified; a question combining with the area formula.  
**Level 6 challenge:** "In triangle ABC, sides are a = 7, b = 8, c = 13. The cosine rule gives cos C < 0. Find angle C and explain geometrically why it is obtuse."  
**New question ID prefix:** `cos-a-*`

---

### Slot 11 — `area-of-triangle-formula` [E — keep existing]

**Title:** Area of a Triangle  
**Learning goal:** Calculate the area of any triangle using A = ½ab sin C when two sides and the included angle are known.  
**Prerequisite:** `cosine-rule-finding-angles` (familiarity with included angle labelling)  
**Key worked example type:** Direct area calculation; reverse problem (area given, find the angle).  
**Visual payload:** `triangleDiagram` — two sides labelled a and b, included angle C.  
**Independent practice focus:** Standard area calculations; one question with area given and unknown angle; one real-world land-area context.  
**Mastery focus:** Includes the check that A = ½ base × height when C = 90°; a question finding the included angle from area, two sides; combined with cosine rule.  
**Level 6 challenge:** "A triangle has area 24 cm² and two sides of length 8 cm and 10 cm. Find the two possible values of the included angle."  
**New question ID prefix:** Keep existing `area-trig-*` IDs.

---

### Slot 12 — `bearings-and-trigonometry` [E — keep existing]

**Title:** Bearings  
**Learning goal:** Read and write three-figure true bearings; solve navigation problems that combine bearings with right-angle trigonometry or the sine/cosine rules.  
**Prerequisite:** `elevation-depression-applications` (right-angle trig), `cosine-rule-finding-angles`  
**Key worked example type:** True bearing notation; back bearing calculation; multi-leg navigation problem drawing a triangle and applying trig.  
**Visual payload:** `cartesianGraph` with North-up orientation. North arrow required. Bearing angle arcs from North. At least one question uses `cartesianGraph` with a labelled navigation diagram.  
**Independent practice focus:** Q1–Q2: bearing notation. Q3: back bearing. Q4–Q5: navigation problems using right-angle trig and/or sine/cosine rule.  
**Mastery focus:** Mixed bearing contexts; a two-leg journey requiring the cosine rule to find direct distance; finding a bearing angle from a triangle.  
**Level 6 challenge:** "A ship leaves port on a bearing of 070° and travels 30 km. It then turns to a bearing of 160° and travels 20 km. Find the direct distance back to port and the bearing from the final position back to port."  
**New question ID prefix:** Keep existing `bearing-*` IDs.

---

## 4. Question ID Redistribution Plan

When the 8 current lessons split into 12 subtopics, existing question IDs must be carefully assigned so the question bank does not double-seed the same question under two subtopics.

| Original `source_id` prefix | Goes to slot | Rationale |
|---|---|---|
| `trig-rat-g1, g2, i1, m1, m7, m10` | Slot 1 `trig-ratios-identifying-sides` | Side identification questions only |
| `trig-rat-g3, g4, i2–i5, m2–m6, m8, m9` | Slot 2 `trig-ratios-sin-cos-tan` | Ratio writing and selection questions |
| `find-side-*` sin/cos questions | Slot 3 `finding-sides-sin-cos` | Hyp-involving: g1, g2, g3, g4, i1, i2, i3, i5, m1, m2, m3, m4, m8, m9, m10 |
| `find-side-i4, m5, m6, m7` | Slot 4 `finding-sides-tan` | Tan-only: adj-opp pair |
| `find-ang-*` all | Slot 5 `finding-angles-inverse-trig` | Keep unchanged |
| `elev-dep-*` all | Slot 6 `elevation-depression-applications` | Keep unchanged |
| `sine-rul-*` side-finding | Slot 7 `sine-rule-finding-sides` | `a/sin A` form |
| `sine-rul-*` angle-finding | Slot 8 `sine-rule-finding-angles` | Inverted `sin A/a` form |
| `cos-rul-*` side-finding | Slot 9 `cosine-rule-finding-sides` | `c² = a² + b² − 2ab cos C` |
| `cos-rul-*` angle-finding | Slot 10 `cosine-rule-finding-angles` | Rearranged for cos C |
| `area-trig-*` all | Slot 11 `area-of-triangle-formula` | Keep unchanged |
| `bearing-*` all | Slot 12 `bearings-and-trigonometry` | Keep unchanged |

**Rule:** Any question currently seeded under the old `subtopic_slug` (`trigonometric-ratios`, `finding-sides-trig`, `sine-rule`, `cosine-rule`) must be re-seeded under the new subtopic slug. The old slugs become legacy aliases in the catalogue — they should not receive new question bank seeds.

---

## 5. Slug Naming Recommendations

| Slot | Recommended slug | Notes |
|---|---|---|
| 1 | `trig-ratios-identifying-sides` | Mirrors existing `trigonometric-ratios` prefix |
| 2 | `trig-ratios-sin-cos-tan` | Explicit about content — avoids generic "ratios" |
| 3 | `finding-sides-sin-cos` | Pairs with Slot 4 by ratio name |
| 4 | `finding-sides-tan` | Intentionally short — tan is the full signal |
| 5 | `finding-angles-inverse-trig` | Mirrors existing `finding-angles-trig` with `inverse` |
| 6 | `elevation-depression-applications` | Matches slot doc naming |
| 7 | `sine-rule-finding-sides` | Side first — clearer than `sine-rule-sides` |
| 8 | `sine-rule-finding-angles` | Parallel to Slot 7 |
| 9 | `cosine-rule-finding-sides` | Parallel to Slot 7 |
| 10 | `cosine-rule-finding-angles` | Parallel to Slot 8 |
| 11 | `area-of-triangle-formula` | Explicit — avoids confusion with measurement unit |
| 12 | `bearings-and-trigonometry` | Emphasises the trigonometry component |

**Do not use:** `lesson-1`, `trig-1`, `trig-part-a`, numeric suffixes, or vague slugs like `trig-basics`.

---

## 6. Route / Progress Risks

| Risk | Severity | Detail | Mitigation |
|---|---|---|---|
| Existing lesson URLs break | High | `/course/year-10-mathematics/trigonometry/trigonometric-ratios` is a public URL | Keep all 8 original slugs as legacy entries in `newCourseCatalog.ts` — no `lessons` array, just a slug and title for alias resolution. Never remove old slugs. |
| `lesson_progress` rows orphaned | High | Students with completed `trigonometric-ratios` have progress keyed to old slug | Legacy alias strategy: old slug row preserved; UI should show "completed under earlier lesson version" tag. Do not mark new subtopics complete automatically. |
| `student_subtopic_mastery` fragmentation | High | Current mastery rows keyed to `subtopic_slug = 'trigonometric-ratios'` | Leave old mastery rows intact. New subtopic mastery rows start from zero for the new slugs. Mastery display aggregates both old and new at the topic level via `student_mastery`. |
| `worksheet_questions` targeting gap | Medium | Worksheets filtering on `subtopic_slug = 'finding-sides-trig'` get no questions until seed re-runs | Phase 3 (worksheet update) must follow Phase 2 (split + seed). Do not flip worksheet targeting to new slugs before the seed dry-run passes. |
| Year 10 Core pathway trim | Medium | Core trim filters by slug list; new slugs are not in the current filter list | Update `year10CoreUnits` filter to include slots 1–6 by new slug names. The existing Core slugs (`trigonometric-ratios`, `finding-sides-trig`, `finding-angles-trig`, `elevation-depression`) map to slots 1–6. |
| Year 9 slug collision | Low | Year 9 `working-with-triangles` has `trigonometric-ratios` slug — identical to Year 10 | No collision because `course_slug` scopes all queries. Confirm seed uses the correct `course_slug` for each pathway. |
| Question ID uniqueness | Low | `y10a-` and `y10c-` prefixes applied by `COURSE_QUESTION_ID_PREFIX`; base IDs shared | No change needed. The prefix system handles this. Only the raw `source_id` in lesson TypeScript needs to be unique within the unit. |
| Daily Review link targets | Low | Daily Review links to topic page `/course/[slug]/trigonometry` — no change | No action needed for Phase 1. Topic-level link still valid after split. |

---

## 7. Recommended Implementation Order

| Phase | Step | Slots | Reason |
|---|---|---|---|
| **1. Catalogue-only** | Add 12 new slugs to `trigonometry` unit in `newCourseCatalog.ts`. Keep all 8 original slugs. TypeScript compile check only. | All | Zero user impact; validates slug naming before any authoring |
| **2. Core split first** | Author/split slots 1–6 (right-angle trig). Update `year10CoreUnits` filter. | 1–6 | Core path has smaller question pool; lower risk; validates override function pattern for slots 7–12 |
| **3. Seed dry-run (Core)** | `npm run seed -- --dry-run year-10-mathematics-core` | 1–6 | Confirm no ID collisions before touching Advanced |
| **4. Advanced split** | Author/split slots 7–12. Sine rule and cosine rule each become two lesson files. | 7–12 | Builds on proven pattern from step 2 |
| **5. Seed all** | Full seed dry-run for base, Advanced, Core | All | Confirm all 12 subtopics seed correctly with correct course_slug/topic_slug/subtopic_slug |
| **6. Worksheet update** | Update `worksheetGeneration.ts` to prefer new subtopic slugs | All | Must follow seeding — do not update targeting before questions exist |
| **7. Audit + validate** | `npx tsc --noEmit && npm run audit:lessons && git diff --check` | — | Gate before any PR |

---

## 8. Visual Payload Requirements by Slot

## Phase 1b Implementation Notes

- Added the 12 v2 subtopic lesson slots to the Year 10 `trigonometry` unit.
- Kept all 8 original public lesson slugs in the catalogue for legacy route compatibility.
- Marked the 8 original slugs with `seedQuestions: false` and `showInCourseNav: false` so old URLs remain resolvable while course navigation and re-seeding target the v2 subtopic slugs.
- Added `stableSkillId`, `legacySlugs`, and checkpoint labels to the 12 v2 slots.
- Namespaced cloned pathway metadata as `y10a-*` and `y10c-*` so base, Advanced and Core stable IDs remain globally unique.
- Updated the Year 10 Core trim to include the six right-angle v2 slots:
  - `trig-ratios-identifying-sides`
  - `trig-ratios-sin-cos-tan`
  - `finding-sides-sin-cos`
  - `finding-sides-tan`
  - `finding-angles-inverse-trig`
  - `elevation-depression-applications`
- Added minimal lesson wrappers for all 12 v2 slots using existing authored content with slot-specific teaching metadata and unique question ID namespaces.
- The wrappers are intentionally conservative. They create real route, worksheet and seed targets now; deeper question redistribution can happen in a later authoring pass.

| Slot | Payload type | All questions? | Notes |
|---|---|---|---|
| 1 | `triangleDiagram` | Yes — all | Orientation must vary across questions to avoid pattern-matching |
| 2 | `triangleDiagram` | Yes — ratio-writing; No — text-only MCQ | Numeric labels required |
| 3 | `triangleDiagram` | Yes — all calculation questions | Unknown side labelled `x`; known angle labelled in degrees |
| 4 | `triangleDiagram` | Yes — all | Hypotenuse should NOT be labelled to reinforce the tan-no-hyp concept |
| 5 | `triangleDiagram` | Yes — all | Angle shown as `?` or `θ`; two sides numerically labelled |
| 6 | `triangleDiagram` | Yes — all | Retain existing `Observer`/`Top`/`Boat` vertex labels |
| 7 | `triangleDiagram` | Yes — all | Non-right triangle; angle and opposite side labelled together |
| 8 | `triangleDiagram` | Yes — all | Same as Slot 7; unknown angle marked at the relevant vertex |
| 9 | `triangleDiagram` | Yes — all | Included angle labelled `C`; opposite side is the unknown `x` |
| 10 | `triangleDiagram` | Yes — all | All three sides labelled; angle position varies per question |
| 11 | `triangleDiagram` | Yes — calculation | ½ab sin C labelled |
| 12 | `cartesianGraph` | Yes — navigation | North-up; bearing angle arcs from the North direction |

**Rule from `PRACTICE_QUESTION_STANDARD.md`:** Attach a payload when the question says or implies the student should use a diagram. For trig, that is every question referencing a triangle with labelled sides or angles. Text-only MCQ (e.g. "What does SOH stand for?") does not require a payload.

---

## 9. Next Claude Implementation Prompt

```
Nova Maths context: c:\Users\joshu\hsc-maths-coach
Do not touch checkout/auth/payments.
Do not write to Supabase directly. Migration files only.

Task: Implement Year 10 Trigonometry Skill Map v2 split — Phase 1, steps 1–3.
Reference: docs/YEAR10_TRIG_SKILL_MAP_V2_SPLIT_PLAN.md

Step 1 — Catalogue update (newCourseCatalog.ts):
- Add these 12 new slugs to the `trigonometry` unit lessons array, after all 8 existing lessons:
  trig-ratios-identifying-sides, trig-ratios-sin-cos-tan,
  finding-sides-sin-cos, finding-sides-tan, finding-angles-inverse-trig,
  elevation-depression-applications, sine-rule-finding-sides, sine-rule-finding-angles,
  cosine-rule-finding-sides, cosine-rule-finding-angles,
  area-of-triangle-formula, bearings-and-trigonometry
- Do NOT remove the 8 original slugs — they become legacy entries.
- Update the year10CoreUnits filter to include the 6 Core subtopics by new slug.

Step 2 — Core split (lib/lessons/year10/trigonometry.ts):
- Create lesson override functions for slots 1–6 using the spec in the plan doc.
- Slot 1 (trig-ratios-identifying-sides): 4 guided + 5 independent + 10 mastery.
  Take identification questions from existing trig-rat-* (g1, g2, i1, m1, m7, m10).
  Author the remaining questions to reach 4+5+10 with new IDs prefixed trig-id-*.
- Slot 2 (trig-ratios-sin-cos-tan): Assign existing trig-rat-* ratio questions.
  Author remaining questions with prefix trig-rat2-*.
- Slots 3–4: Split find-side-* questions per the redistribution table in the plan.
  New questions use prefixes find-sc-* and find-tan-*.
- Slots 5–6: Wire to existing functions (finding angles and elevation/depression stay unchanged).
- Add triangleDiagram payload to every question that references a labelled triangle.

Step 3 — Validation:
- npx.cmd tsc --noEmit
- npm.cmd run audit:lessons
- npm.cmd run seed -- --dry-run year-10-mathematics-core
- git diff --check

Output: files changed, new slug list, question count per slot, any audit warnings, validation result.
Constraints: Do not modify sine-rule, cosine-rule, area, or bearings lessons in this step.
```
