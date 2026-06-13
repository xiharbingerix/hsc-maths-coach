# Year 12 Extension 2 Mechanics Skill Map v2 Plan

Created: June 2026
Phase 1 implemented: June 2026

## Phase 1 Implementation Status

| Lesson | Status | File | Questions |
|---|---|---|---|
| `rectilinear-motion-calculus` | ✅ Done | `mechanics.ts` | 4 guided + 5 independent + 10 mastery (19 total) |
| `simple-harmonic-motion-extended` | ✅ Done | `mechanics.ts` | 4 guided + 5 independent + 10 mastery (19 total) |
| `circular-motion-uniform` | ✅ Done | `mechanics.ts` | 4 guided + 5 independent + 10 mastery (19 total) |

Catalog updated: 3 slugs with `stableSkillId` + 4 `skillCheckpoints` each.
Seed dry-run: 57 new questions prepared (19 × 3); total course count 272.
No visual payloads in Phase 1 — confirmed by audit:lessons.
Course status remains `coming_soon`.

Phase 2 (resisted-vertical-motion, projectile-motion-calculus, mechanics-exam-practice) remains pending.

---

---

## 1. Current Scaffold State

| Field | Value |
|---|---|
| Unit slug | `mechanics` |
| Unit title | Mechanics |
| Unit description (catalog) | Planned mechanics work including simple harmonic motion, circular motion, projectile motion and applied differential equations. |
| Lessons | **Empty** — `lessons: []` |
| Override file | None — no `mechanics.ts` in `lib/lessons/year12Extension2/` |
| Questions in bank | 0 |
| Skill Map v2 metadata | None |

`mechanics` is a registered placeholder in `newCourseCatalog.ts` (line ~2026). No override is registered in `buildLesson`. No export in `lib/lessons/year12Extension2/index.ts`.

**Related Extension 1 content already live** (`lib/lessons/year12Extension1/calculusApplications.ts`):
- `simple-harmonic-motion-intro` — covers x = a sin(nt + α), ẍ = -n²x, amplitude, period, max speed from first differentiation only.

Extension 2 Mechanics must go substantially beyond Ext 1 SHM: energy equation, initial conditions from DEs, circular motion, and resisted motion.

---

## 2. Source Files To Create Or Update

| File | Change |
|---|---|
| `lib/lessons/year12Extension2/mechanics.ts` | New override file; one export per lesson |
| `lib/lessons/year12Extension2/index.ts` | Add `export * from "./mechanics"` |
| `lib/newCourseCatalog.ts` | Add lesson seeds to `mechanics` unit with `stableSkillId` + `skillCheckpoints`; import and wire `year12Extension2MechanicsLessonOverride` into `buildLesson` after existing Extension 2 overrides |
| `docs/YEAR12_EXTENSION2_HSC_STATUS.md` | Update Mechanics row from "Planned only" to "N lessons active (Phase 1)" after Phase 1 lands |

Do not touch checkout, auth, payments, Supabase writes, or unrelated routes. Do not rename existing Extension 2 slugs.

---

## 3. Proposed First-Release Lesson Split (5 lessons + exam practice)

### Lesson 1: Rectilinear Motion with Calculus

| Field | Plan |
|---|---|
| Slug | `rectilinear-motion-calculus` |
| Title | Rectilinear Motion with Calculus |
| Stable skill ID | `y12e2-mech-rectilinear-motion-calculus` |
| Learning goal | Use v = dx/dt, a = dv/dt and a = v·dv/dx to move between position, velocity and acceleration for a particle moving in one dimension. |
| Prerequisites | Year 12 Advanced differentiation, integration; Extension 1 chain rule and definite integrals. |
| Worked example themes | (1) Given x(t) find v(t) and a(t) by differentiating, then evaluate at t = 2. (2) Given a(t) with initial conditions, integrate twice to find x(t). (3) Use a = v·dv/dx to find speed at a given position when force is a function of x. |
| Practice focus | MCQ for identifying which kinematic relation to use; typed values for speed, time or position at a specific instant; definite integration to find displacement in an interval. |
| Visual payload needs | Optional `cartesianGraph` showing v-t or x-t graph for context-reading questions. Not required in Phase 1. |
| Answer-marking risks | Velocities often appear as square roots (e.g. √12); accepted answers must cover `2√3`, `2*sqrt(3)`, and decimal. Displacement vs distance confusion — prefer specific prompts for one or the other. |
| Multi-part appropriate | Yes. A 3-part chain (find v(t) from a(t), then speed at t = 3, then when at rest) is clean and auto-markable. |
| Checkpoints | (a) Apply v = dx/dt by differentiating a position function; (b) Apply a = dv/dt by differentiating a velocity function; (c) Use the relation a = v·dv/dx; (d) Integrate a(t) with initial conditions to recover v(t) and x(t). |

---

### Lesson 2: Simple Harmonic Motion — Energy and Initial Conditions

| Field | Plan |
|---|---|
| Slug | `simple-harmonic-motion-extended` |
| Title | Simple Harmonic Motion — Energy and Initial Conditions |
| Stable skill ID | `y12e2-mech-simple-harmonic-motion-extended` |
| Learning goal | Use the SHM energy equation v² = n²(a² − x²) and initial conditions to find amplitude, angular frequency, phase, and motion at any time or position. |
| Prerequisites | Extension 1 `simple-harmonic-motion-intro`; integration of trig functions; definite integrals. |
| Worked example themes | (1) Given ẍ = -9x with x₀ = 2, ẋ₀ = 0 — find amplitude, period, and speed when x = 1 using v² = n²(a² − x²). (2) Given ẍ = -4x with x₀ = 0, ẋ₀ = 6 — write displacement equation and find maximum acceleration. (3) Use energy equation to find position when speed is half its maximum. |
| Practice focus | Typed exact values for amplitude, period, max speed, max acceleration, and speed/position at a specified instant; MCQ to identify whether given conditions imply SHM. |
| Visual payload needs | Optional `cartesianGraph` for a displacement vs time plot to read off amplitude or period. Not required in Phase 1. |
| Answer-marking risks | Amplitude often involves square roots; phase angle may be π/6, π/4 etc — accepted answers must cover common trig exact values and radian fractions. Avoid asking for the full x(t) equation as a typed answer (too many equivalent forms). |
| Multi-part appropriate | Yes — the best multi-part candidate in Phase 1: (a) confirm SHM and state n, (b) find amplitude from v² = n²(a² − x²), (c) find speed at a given position. |
| Checkpoints | (a) Verify ẍ = -n²x as the defining SHM property; (b) Derive v² = n²(a² − x²) from energy or differentiation; (c) Find amplitude and phase from initial displacement and velocity; (d) Evaluate speed or displacement at a specific position or time. |

---

### Lesson 3: Uniform Circular Motion

| Field | Plan |
|---|---|
| Slug | `circular-motion-uniform` |
| Title | Uniform Circular Motion |
| Stable skill ID | `y12e2-mech-circular-motion-uniform` |
| Learning goal | Apply centripetal acceleration a = rω² = v²/r and Newton's second law to solve circular motion problems including conical pendulums and banked curves. |
| Prerequisites | Newton's second law F = ma; basic trigonometry for resolving forces; Extension 1 velocity and acceleration. |
| Worked example themes | (1) Find centripetal acceleration and the tension in a string for a mass revolving on a horizontal circle. (2) Conical pendulum: resolve forces to find angular velocity and tension from the half-angle. (3) Banked curve: find the ideal speed for no friction from the normal force components. |
| Practice focus | Typed values for angular velocity, centripetal force, tension or period; MCQ identifying which direction centripetal acceleration acts or which formula to use; short trigonometric component calculations. |
| Visual payload needs | Force-diagram descriptions embedded in worked example text (no new renderer needed for Phase 1); keep prompts self-contained. |
| Answer-marking risks | Angular velocity ω often appears as a fraction under a square root — cover decimal and surd forms. Trigonometric components (tan θ = v²/rg) may produce unfamiliar exact forms; prefer numeric evaluation with 2–4 significant figures as an accepted answer or request the squared form. Avoid diagram-labelling questions (not auto-markable). |
| Multi-part appropriate | Yes — (a) find centripetal acceleration, (b) find tension at one angle, (c) state what happens to tension if speed doubles. Part (c) should be MCQ or a typed multiplier ("4") not free text. |
| Checkpoints | (a) State v = rω and use it to convert between speed and angular velocity; (b) Apply a = rω² = v²/r for centripetal acceleration; (c) Write F = mrω² as Newton's second law for circular motion; (d) Resolve forces for a conical pendulum or banked track. |

---

### Lesson 4: Resisted Vertical Motion

| Field | Plan |
|---|---|
| Slug | `resisted-vertical-motion` |
| Title | Resisted Vertical Motion |
| Stable skill ID | `y12e2-mech-resisted-vertical-motion` |
| Learning goal | Set up and solve the equation of motion for a particle falling or rising under gravity with linear air resistance, and identify terminal velocity. |
| Prerequisites | Calculus Phase 1 method selection; separation of variables for first-order ODEs; logarithmic integrals; Extension 1 exponential models. |
| Worked example themes | (1) Write the equation of motion ṁ·dv/dt = mg − kv for downward motion; solve to find v(t) and identify terminal velocity V_T = mg/k. (2) Rising particle: equation of motion m·dv/dt = −mg − kv; find how long until the particle reaches maximum height. (3) Falling particle: find displacement by integrating v(t); compare with free-fall. |
| Practice focus | Typed values for terminal velocity, time to reach a speed fraction of V_T, or displacement after a set time; MCQ identifying whether resistance opposes or reinforces gravity; reading terminal velocity from a graph description. |
| Visual payload needs | Optional v-t graph showing exponential approach to terminal velocity (cartesianGraph). Required for any question that asks students to "read off V_T from the graph". |
| Answer-marking risks | Solutions involve expressions like mg/k, which may simplify differently for different substituted values; prefer numeric evaluation or typed coefficient rather than general symbolic answers. Logarithmic time values need accepted decimal or ln form. |
| Multi-part appropriate | Yes — (a) write the DE, (b) identify terminal velocity, (c) find v when t = 3 (numeric). Part (a) is best as MCQ (choose the correct equation of motion) since free-text equation authoring is hard to mark. |
| Checkpoints | (a) Write the equation of motion for falling with linear resistance; (b) Identify terminal velocity as V_T = mg/k; (c) Solve m·dv/dt = mg − kv by separation of variables to find v(t); (d) Use v(t) to find x(t) and interpret the long-term behaviour. |

**Prerequisite dependency note:** This lesson requires partial fractions if the resistance is quadratic (kv²), and logarithmic integrals if linear (kv). Phase 1 implementation should use only linear resistance so that Calculus Phase 1 skills are sufficient. Quadratic resistance requires Calculus Phase 2 partial fractions and should be a Phase 2 mechanics add-on.

---

### Lesson 5: Projectile Motion with Calculus

| Field | Plan |
|---|---|
| Slug | `projectile-motion-calculus` |
| Title | Projectile Motion with Calculus |
| Stable skill ID | `y12e2-mech-projectile-motion-calculus` |
| Learning goal | Set up and solve the two-component equations of projectile motion using integration from constant acceleration, derive Cartesian equations, and find range, time of flight, and maximum height. |
| Prerequisites | Integration of constants, kinematics, trigonometric components of velocity, Extension 1 calculus. |
| Worked example themes | (1) Horizontal: ẍ = 0; vertical: ÿ = −g; integrate both with initial conditions to find x(t) and y(t). (2) Eliminate t to find the Cartesian equation y as a function of x. (3) Find maximum height and range from the Cartesian equation or the time equations. |
| Practice focus | Typed values for maximum height, time of flight, range, or speed at a given time; MCQ to identify the acceleration in each component; short algebraic substitution into the parametric equations. |
| Visual payload needs | Optional `cartesianGraph` for a parabolic trajectory with labelled launch angle and range. Not required in Phase 1. |
| Answer-marking risks | Range formula R = v²sin(2θ)/g may look different if students use alternative equivalent forms; prefer numeric evaluation or ask for specific intermediate values. Exact trigonometric values (sin 30° = 1/2) are clean accepted answers. |
| Multi-part appropriate | Yes — (a) write the parametric equations, (b) find time of flight, (c) find range. Part (a) best as MCQ. |
| Checkpoints | (a) Identify horizontal (ẍ = 0) and vertical (ÿ = −g) acceleration components; (b) Integrate to find x(t) and y(t) from initial conditions; (c) Eliminate t to derive the Cartesian trajectory equation; (d) Find maximum height, time of flight, or range from parametric or Cartesian form. |

---

### Lesson 6: Mechanics Exam Practice

| Field | Plan |
|---|---|
| Slug | `mechanics-exam-practice` |
| Title | Mechanics Exam Practice |
| Stable skill ID | `y12e2-mech-mechanics-exam-practice` |
| Learning goal | Solve mixed Extension 2 mechanics questions by identifying the physical model, setting up correct equations of motion, and evaluating exact results. |
| Prerequisites | Lessons 1–5; Extension 1 calculus applications. |
| Worked example themes | (1) Mixed SHM problem: energy equation then time to a given position. (2) Circular motion: conical pendulum with two unknowns. (3) Resisted motion followed by free-fall — piecewise problem. |
| Practice focus | D3–D5 mixed questions; one optional `multiPartPractice` item reproducing a full HSC-style Section II mechanics question with typed numeric parts and MCQ model identification. |
| Visual payload needs | `cartesianGraph` only if a graph stimulus is part of the question. |
| Answer-marking risks | Mixed exam questions invite "explain" and "show that" phrasing — avoid both. Keep all marked parts numeric, coefficient-based, or MCQ. Do not include "prove ẍ = -n²x" as a marked item; put derivations in worked examples. |
| Multi-part appropriate | Yes — required here. Should carry one Section II-style item with 3–4 auto-markable parts. |
| Checkpoints | (a) Identify the correct mechanical model (SHM, circular, resisted, projectile); (b) Set up the equation of motion correctly; (c) Evaluate a numeric result; (d) Interpret the result in the physical context (direction, sign, magnitude). |

---

## 4. Recommended Phase 1 Chunk

Implement these three lessons first:

1. `rectilinear-motion-calculus`
2. `simple-harmonic-motion-extended`
3. `circular-motion-uniform`

**Rationale:**

- All three build directly from Extension 1 calculus and mechanics content.
- None require solving separable ODEs with logarithmic integrals, so Calculus Phase 2 (partial fractions) is not a prerequisite gate.
- Visual payload needs are optional and can be deferred — Phase 1 can be text-only.
- Together they cover three of the five NSW Ext 2 Mechanics content strands and give students meaningful mechanics practice before adding resisted motion and projectile variations.

Phase 2 adds: `resisted-vertical-motion`, `projectile-motion-calculus`, `mechanics-exam-practice`.

**Phase 1 question counts:** 4 guided + 5 independent + 10 mastery = 19 per lesson × 3 = **57 questions**. Optional `multiPartPractice` on `simple-harmonic-motion-extended` if every part is auto-markable.

**Stable IDs for Phase 1:**

```
y12e2-mech-rectilinear-motion-calculus
y12e2-mech-simple-harmonic-motion-extended
y12e2-mech-circular-motion-uniform
```

---

## 5. Route and Progress Risks

| Risk | Recommendation |
|---|---|
| Empty unit becomes visible without overrides | Add catalog seeds and `mechanics.ts` override file in the same PR. |
| Placeholder fallback content leaks into Mechanics | Guard every override with `course.slug === "year-12-extension-2"` and `unit.slug === "mechanics"`. |
| SHM slug collision with Extension 1 | Extension 1 slug is `simple-harmonic-motion-intro` in unit `calculus-applications`; Extension 2 slug is `simple-harmonic-motion-extended` in unit `mechanics`. No collision. |
| Multi-part exact-form rejection | Keep all multi-part answers numeric or MCQ. Never mark "write the equation of motion" as a typed free-text answer. |
| Resisted motion gated by Calculus Phase 2 | Only implement linear resistance in Phase 1 (logarithmic integral, no partial fractions needed). Mark Phase 2 lessons clearly as pending Calculus Phase 2. |
| Circular motion force-diagram questions | Diagrams cannot be auto-marked; keep diagram tasks in worked examples only. Ask for numeric force or angular velocity values, not diagram labels. |
| Progress keys from future migration | No existing Mechanics lesson slugs, so no hidden legacy aliases are needed. Low risk. |

---

## 6. Visual Needs

| Lesson | Phase 1 | Phase 2 |
|---|---|---|
| `rectilinear-motion-calculus` | None | Optional v-t graph (`cartesianGraph`) |
| `simple-harmonic-motion-extended` | None | Optional x-t graph (`cartesianGraph`) |
| `circular-motion-uniform` | None (text descriptions) | Force diagram if diagram renderer added |
| `resisted-vertical-motion` | Optional v-t graph approaching V_T | Phase 2 lesson |
| `projectile-motion-calculus` | Optional parabola (`cartesianGraph`) | Phase 2 lesson |
| `mechanics-exam-practice` | `cartesianGraph` for graph stimuli only | Phase 2 lesson |

No new diagram type is required for Phase 1. A `forceDiagram` or `circularMotionDiagram` renderer would be useful for Phase 2 but must not block Phase 1.

---

## 7. Marking Risks Summary

| Risk | Mitigation |
|---|---|
| Surd velocity answers (e.g. `2√3`) | Include `2√3`, `2*sqrt(3)`, `sqrt(12)`, and decimal in `acceptedAnswers` |
| Radian phase angles (π/4, π/6) | Include LaTeX fraction, decimal, and degree forms |
| Full displacement equations with phase (x = A sin(nt + α)) | Do not mark as typed; instead ask for A, n, or α separately |
| Angular velocity under square root | Ask for ω² or numeric ω to 2–3 d.p. |
| Force components involving trigonometry | Prefer numeric evaluation; do not mark symbolic ratio expressions |
| Terminal velocity symbol (V_T = mg/k) | Ask for numeric value given substituted m, g, k |
| "Show that" / "prove" prompts | Put derivations entirely in teaching and worked examples; never in marked practice |
| Multi-part equation-of-motion part | Make it MCQ: "Which of these is the correct equation of motion for a falling particle with linear resistance?" |

---

## 8. Course Status Recommendation

Keep `year-12-extension-2` as `coming_soon` after Mechanics Phase 1.

After Phase 1 (3 Mechanics lessons) the course will have:
- Complex Numbers: 4 lessons active
- Vectors in 3D: 4 lessons active
- Calculus: 3 lessons active (Phase 1 only)
- Mechanics: 3 lessons active (Phase 1 only)
- Proof: still empty

Proof remains completely empty. A status change to `in_progress` or `available` should wait until either (a) at least one Proof lesson is real, or (b) a deliberate product decision is made to ship Ext 2 with a permanent Proof gap and updated positioning copy. Keep `coming_soon` until then.

---

## 9. Implementation Prompt

```text
Task: Implement Year 12 Extension 2 Mechanics Skill Map v2 Phase 1.

Work in c:\Users\joshu\hsc-maths-coach.
Do not touch checkout/auth/payments. Do not write to Supabase.

Read before coding:
- docs/YEAR12_EXTENSION2_MECHANICS_SKILL_MAP_V2_PLAN.md (this file)
- docs/YEAR12_EXTENSION2_CALCULUS_SKILL_MAP_V2_PLAN.md (style reference)
- lib/lessons/year12Extension2/calculus.ts (question/structure reference)
- docs/QUESTION_AUTHORING_STANDARD.md
- node_modules/next/dist/docs/ (check any Next.js API used)

Implement only the first three Mechanics lessons:
- rectilinear-motion-calculus
- simple-harmonic-motion-extended
- circular-motion-uniform

Create:
- lib/lessons/year12Extension2/mechanics.ts

Update:
- lib/lessons/year12Extension2/index.ts (add export * from "./mechanics")
- lib/newCourseCatalog.ts:
    - Add lesson seeds to the mechanics unit with stableSkillId + skillCheckpoints
    - Import year12Extension2MechanicsLessonOverride
    - Wire it into buildLesson after year12Extension2CalculusLessonOverride
- docs/YEAR12_EXTENSION2_HSC_STATUS.md (update Mechanics row)

For each lesson:
- 4 guided + 5 independent + 10 mastery = 19 questions
- Skill Map v2 metadata: stableSkillId + 4 skillCheckpoints per lesson in catalog
- Auto-markable answers only: numeric exact values, MCQ labels, or coefficient values
- acceptedAnswers must cover surd, decimal, and LaTeX fraction forms
- No typed free-text for equations of motion or proofs
- Optional multiPartPractice on simple-harmonic-motion-extended if every part is auto-markable

Question ID prefix: y12e2-mech-

Validation:
- npm run audit:lessons
- npm run typecheck
- npx tsx scripts/seed-question-bank.ts --course=year-12-extension-2 --dry-run
- git diff --check
- Confirm dry-run shows 57 new questions (19 × 3) with 0 warnings
```
