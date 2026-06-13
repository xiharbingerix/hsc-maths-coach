# Next Skill Map v2 Target Plan

Created: 2026-06-13
Status: Phase 1 implemented — 2026-06-13.

## Phase 1 Implementation Status

| Lesson | Status | File | Questions |
|---|---|---|---|
| `chain-rule-basics` | ✅ Done | `introductionDifferentiation.ts` | 3 worked + 4 guided + 5 independent + 10 mastery |
| `stationary-points-first-derivative-test` | ✅ Done | `introductionDifferentiation.ts` | 3 worked + 4 guided + 5 independent + 10 mastery |
| `second-derivative-concavity` | ✅ Done | `introductionDifferentiation.ts` | 3 worked + 4 guided + 5 independent + 10 mastery |

Catalog updated: 3 slugs inserted before `tangents-normals-applications` in `lib/newCourseCatalog.ts`.
`stableSkillId` and 4 `skillCheckpoints` added per lesson.
`CartesianGraph` used in each lesson's first worked example.
Phase 2 (curve-sketching-calculus + exam practice expansion) remains pending.

---

## Phase 2 Plan: Year 11 Advanced - Introduction to Differentiation

Planned: 2026-06-13. Implementation not started.

### Current unit audit

Source file: `lib/lessons/year11Advanced/introductionDifferentiation.ts`
Catalog unit: `lib/newCourseCatalog.ts` -> `year-11-advanced` / `introduction-differentiation`

| Order | Slug | Current status | Notes |
|---|---|---|---|
| 1 | `rates-of-change-gradients` | Existing | Rates, secants, gradients, interpretation |
| 2 | `derivatives-first-principles` | Existing | Difference quotient and first-principles setup |
| 3 | `differentiating-polynomial-functions` | Existing | Power rule fluency |
| 4 | `chain-rule-basics` | Phase 1 done | Composite polynomial derivatives |
| 5 | `stationary-points-first-derivative-test` | Phase 1 done | Stationary points, sign tests, increasing/decreasing intervals |
| 6 | `second-derivative-concavity` | Phase 1 done | Concavity, inflection, second derivative test |
| 7 | `tangents-normals-applications` | Existing | Tangent/normal gradients and equations |
| 8 | `introduction-differentiation-exam-practice` | Existing, weak after Phase 1 | Samples earlier skills but does not yet deliberately integrate all 8 content lessons |

Current standard question footprint: 8 lessons x 19 standard questions = 152 seeded questions, before any optional multi-part practice.

### Recommendation

Implement **both** `curve-sketching-calculus` and an **exam-practice expansion**, in that order.

Rationale:
- `curve-sketching-calculus` is the missing synthesis skill. Students now learn first derivative tests, second derivative/concavity, and tangents/normals, but there is no lesson that asks them to combine intercepts, stationary points, concavity, and monotonicity into a coherent graph analysis workflow.
- The current exam practice should remain as the unit capstone, but it should be expanded only after curve sketching exists so it can sample the complete unit rather than the current 8-lesson set.
- Do not replace or hide existing slugs. Add one new slug before the exam-practice lesson, then expand the existing exam-practice lesson in place.

### Proposed Phase 2 slots

| Slot | Slug | Action | Question count | Catalog position |
|---|---|---|---|---|
| 9 | `curve-sketching-calculus` | New lesson | 3 worked + 4 guided + 5 independent + 10 mastery | Insert after `tangents-normals-applications` and before `introduction-differentiation-exam-practice` |
| 10 | `introduction-differentiation-exam-practice` | Expand existing lesson in place | Keep 3 worked + 4 guided + 5 independent + 10 mastery; add optional 2-3 multi-part practice questions if safe | Remains final lesson |

Expected standard question footprint after Phase 2: 9 lessons x 19 standard questions = 171 seeded questions, plus any optional D5 multi-part practice.

### Proposed `curve-sketching-calculus` lesson

Title: Curve Sketching Using Calculus
Stable skill ID: `y11adv-diff-curve-sketching-calculus`
ID prefix: `y11adv-curve-*`

Skill checkpoints:
1. Find useful graph features: intercepts, stationary points, and inflection candidates.
2. Use the sign of `f'(x)` to state increasing and decreasing intervals.
3. Use the sign of `f''(x)` to state concavity intervals and confirm inflection points.
4. Combine features into a calculus-informed graph description.

Question design:
- Keep typed answers narrow: x-values, coordinates, classifications, interval choices, and MCQ feature interpretation.
- Avoid asking students to "sketch" as a graded typed response. Graph sketching can appear in teaching/worked examples, while graded questions ask for auto-markable features.
- Include at least 2 MCQ items in mastery for graph-feature interpretation and common misconception traps.

Visual payload needs:
- Use existing `CartesianGraph`.
- Worked example 1: smooth cubic or quartic with labelled stationary points and inflection point.
- Worked example 2 or 3: graph feature checklist beside `CartesianGraph`.
- Practice questions may use `cartesianGraph` only when the prompt asks students to read or verify a plotted feature.
- If the current graph primitive cannot safely draw the needed smooth cubic/quartic, use supported point/annotation payloads and document the visual limitation rather than adding a new graph renderer in this sprint.

Answer-marking risks:
- Interval answers are the main risk: `x > 2`, `x<2`, `-1 < x < 1`, `x<-1 or x>1`, and interval notation variants need explicit accepted answers.
- Coordinate answers need space and labelled variants: `(1, -2)`, `(1,-2)`, `1,-2`, `x=1,y=-2`.
- Classification answers need variants: `local maximum`, `maximum`, `local max`, `max`.
- Algebraic expressions should be avoided where a numeric value or MCQ can test the same skill.

### Exam-practice expansion

Keep slug: `introduction-differentiation-exam-practice`
Action: expand content in place without changing route/progress identity.
ID prefix for new/reworked questions: keep existing prefix style or use `y11adv-id-exam-*` if adding new items.

Coverage targets:
- Rates and first principles: 2-3 questions
- Polynomial differentiation and chain rule: 3-4 questions
- Tangents/normals: 2-3 questions
- Stationary points and increasing/decreasing: 3-4 questions
- Second derivative, concavity, inflection: 2-3 questions
- Curve sketching synthesis: 3-4 questions

Optional multi-part practice:
- Add 2-3 D5 multi-part items only if every part is exact-markable.
- Suitable structures: derivative -> stationary point -> classification; stationary point -> concavity -> inflection; curve feature table -> identify interval/classification.
- Do not use proof, justify, explain, or free-text sketch prompts.

### Implementation order

1. Add `curve-sketching-calculus` lesson in `introductionDifferentiation.ts`.
2. Add its catalog entry with `stableSkillId` and 4 `skillCheckpoints`, before `introduction-differentiation-exam-practice`.
3. Run dry validation and smoke the new lesson route.
4. Expand `introduction-differentiation-exam-practice` in place to sample all unit skills.
5. Run full validation and seed dry-run.

---

## Working with Functions Sprint Status

Implemented: 2026-06-13.

| Lesson | Status | File | Questions |
|---|---|---|---|
| `absolute-value-functions` | Done | `workingWithFunctions.ts` | 3 worked + 4 guided + 5 independent + 10 mastery |
| `odd-even-functions` | Done | `workingWithFunctions.ts` | 3 worked + 4 guided + 5 independent + 10 mastery |

Catalog updated: 2 slugs inserted before `working-with-functions-exam-practice` in `lib/newCourseCatalog.ts`.
`stableSkillId` and 4 `skillCheckpoints` added per lesson.
`CartesianGraph` used for `y = |x|`, `y = |x - a| + b`, even y-axis symmetry, and odd origin symmetry.

---

## Recommendation: Year 11 Advanced — Introduction to Differentiation

**Rationale:**

| Criterion | Score | Notes |
|---|---|---|
| Commercial usefulness | ★★★★★ | Calculus ≈ 30% of HSC Advanced exam; largest driver of private tutoring demand |
| Current coarseness | ★★★★★ | 5 lessons vs ~10 Class subtopics; chain rule and stationary points entirely absent |
| Visual support available | ★★★★★ | `CartesianGraph` covers curves, tangents, gradients; no new payload types needed |
| Route/progress risk | ★★★★★ | Add new lessons only; no existing slug renames; zero regression risk |
| Phase 1 achievability | ★★★★★ | 3 focused new lessons cleanly scope a single sprint |

**Rejected candidates:**

| Candidate | Reason rejected |
|---|---|
| Working with Functions | Only 2 missing subtopics (`absolute-value-functions`, `odd-even-functions`); lower exam weight; smaller sprint |
| Year 8 Linear Relationships | Lower commercial priority; mostly Stage 4; all [N] slots need full authoring sprint |
| Year 12 Standard 1 | Small student pool; content thin but lower exam pressure |
| Year 12 Extension 2 Calculus | Niche; requires notation features not yet stable; blocked `[U]` slots |

---

## Current State

**Unit:** `introduction-differentiation`  
**Course:** `year-11-advanced`  
**File:** `lib/lessons/year11Advanced/introductionDifferentiation.ts` (556 lines)

### Current lesson slugs

| Slug | Title | Lines (approx) | Status |
|---|---|---|---|
| `rates-of-change-gradients` | Rates of Change and Gradients | ~100 | Active |
| `derivatives-first-principles` | Derivatives from First Principles | ~90 | Active |
| `differentiating-polynomial-functions` | Differentiating Polynomial Functions | ~95 | Active |
| `tangents-normals-applications` | Tangents, Normals and Applications | ~95 | Active |
| `introduction-differentiation-exam-practice` | Exam Practice | ~95 | Active |

**Total active:** 5 lessons | **Seed questions per lesson:** ~19

### NSW syllabus gaps (MA-C1)

The NSW MA-C1 strand includes:
- Average and instantaneous rates of change (✅ covered — `rates-of-change-gradients`)
- First principles definition of derivative (✅ covered — `derivatives-first-principles`)
- Differentiating polynomials with the power rule (✅ covered — `differentiating-polynomial-functions`)
- Chain rule for composite functions (❌ **MISSING** — `chain-rule-basics` [N])
- Stationary points, first derivative test, sign diagrams (❌ **MISSING**)
- Second derivative, concavity, points of inflection (❌ **MISSING**)
- Curve sketching using calculus (❌ **MISSING** — downstream of stationary points)
- Tangent and normal equations (✅ partial — `tangents-normals-applications`)
- Contextual application problems (✅ partial — in exam practice)

**Gap:** 3–4 core subtopics completely unbuilt. Students who finish the current unit cannot yet find stationary points or apply the chain rule — two of the most common HSC exam question types.

---

## Proposed v2 Slots (Full)

| Slot | Slug | Title | Type | Priority |
|---|---|---|---|---|
| 1 | `rates-of-change-gradients` | Rates of Change and Gradients | [E] keep | P1 |
| 2 | `derivatives-first-principles` | Derivatives from First Principles | [E] keep | P1 |
| 3 | `differentiating-polynomial-functions` | Differentiating Polynomial Functions | [E] keep | P1 |
| 4 | `chain-rule-basics` | The Chain Rule | [N] new | **P1** |
| 5 | `stationary-points-first-derivative-test` | Stationary Points and the First Derivative Test | [N] new | **P1** |
| 6 | `second-derivative-concavity` | Second Derivative and Concavity | [N] new | **P1** |
| 7 | `tangents-normals-applications` | Tangents, Normals and Applications | [E] keep | P2 |
| 8 | `curve-sketching-calculus` | Curve Sketching Using Calculus | [N] new | P2 |
| 9 | `introduction-differentiation-exam-practice` | Exam Practice | [E] expand | P2 |

**Phase 1:** Slots 4–6 (3 new lessons). No existing slugs renamed.
**Phase 2:** Slot 8 (curve sketching) + exam practice expansion to sample all 9 slots.

---

## Phase 1 Implementation Chunk

### New lessons to author: 3

---

### Slot 4 — `chain-rule-basics`

**Title:** The Chain Rule  
**NSW syllabus:** MA-C1 — "differentiate composite functions using the chain rule"  
**Skill checkpoints:**
1. Identify an outer and inner function in a composite polynomial expression
2. Apply dy/dx = (dy/du)(du/dx) to differentiate (ax + b)^n
3. Differentiate (ax² + bx + c)^n using chain rule
4. Evaluate a chain-rule derivative at a given x-value

**Visual:** `CartesianGraph` — show a curve y = (2x+1)^3 with its tangent at a point; `CartesianGraph` is sufficient for this.

**Question structure:** 4 guided, 7 independent, 10 mastery  
**ID prefix:** `y11adv-chain-*`

**Sample mastery questions:**
- "Differentiate y = (3x + 2)^5" → `15(3x+2)^4`
- "Find dy/dx for y = (x^2 + 1)^4" → `8x(x^2+1)^3`
- "Evaluate the gradient of y = (2x − 1)^3 at x = 1" → `6`
- "Which of the following is the correct setup for differentiating (5x − 3)^4?" (MCQ)

---

### Slot 5 — `stationary-points-first-derivative-test`

**Title:** Stationary Points and the First Derivative Test  
**NSW syllabus:** MA-C1 — "find stationary points; use the first derivative test to classify"  
**Skill checkpoints:**
1. Find stationary points by solving f'(x) = 0
2. Construct a sign diagram for f'(x) around a stationary point
3. Classify stationary points as local max, local min, or horizontal inflection
4. Find intervals where f is increasing (f'(x) > 0) or decreasing (f'(x) < 0)

**Visual:** `CartesianGraph` — sketch of a cubic with marked stationary points and gradient arrows; sign diagram formatted as a step in the worked example.

**Question structure:** 4 guided, 7 independent, 10 mastery  
**ID prefix:** `y11adv-stat-*`

---

### Slot 6 — `second-derivative-concavity`

**Title:** Second Derivative and Concavity  
**NSW syllabus:** MA-C1 — "use second derivative to determine concavity; find points of inflection"  
**Skill checkpoints:**
1. Find the second derivative f''(x) by differentiating f'(x)
2. Determine concavity: f''(x) > 0 → concave up; f''(x) < 0 → concave down
3. Find x-coordinates of possible points of inflection (f''(x) = 0; confirm sign change)
4. Use second derivative test to classify a stationary point

**Visual:** `CartesianGraph` — curve showing concave-up and concave-down arcs with inflection point marked.

**Question structure:** 4 guided, 7 independent, 10 mastery  
**ID prefix:** `y11adv-conc-*`

---

## Visual Needs

All Phase 1 lessons use only `CartesianGraph` with explicit `points`, `annotations`, and optionally `sinusoidals`-free curves. No new visual payload types required.

Specific needs:
- `chain-rule-basics`: curve + tangent line at a point (already proven pattern from `tangents-normals-applications`)
- `stationary-points-first-derivative-test`: cubic curve with local max/min labelled; sign diagram as step latex (text-based, no visual)
- `second-derivative-concavity`: curve with inflection point; annotation arrows for concavity direction

**Rule:** Follow the Phase 3 visual rule — use `CartesianGraph` only. Do not use `TrigGraphDiagram` here.

---

## Route and Progress Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Existing slug renames | None — zero existing slugs renamed | n/a |
| Seed key collisions | Low — use new prefix `y11adv-chain-*`, `y11adv-stat-*`, `y11adv-conc-*` | Confirm with dry-run |
| Lesson order | New lessons insert before `tangents-normals-applications` in catalog | Update catalog order in `newCourseCatalog.ts` |
| Progress data | No progress records exist yet for these units (no production users in this unit) | Safe |
| Exam practice undersampling | Exam practice currently has only 5 slots; after Phase 1 it will have 8 | Defer exam practice expansion to Phase 2 |

---

## Validation Commands

```bash
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
git diff --check
```

Expected after Phase 1:
- `introduction-differentiation` seed count increases from 5 × 19 = 95 to 8 × 19 = 152
- No TypeScript errors
- `audit:lessons` PASS 0 failures

---

## Phase 1 Implementation Prompt

Use this as the opening prompt for the implementation session:

---

**Nova Maths context:**
You are working in `c:\Users\joshu\hsc-maths-coach`.
Do not touch checkout/auth/payments.
Do not write to Supabase.
Use headed Chrome for visual smoke.
Final response under 1000 words.

**Task: Implement Year 11 Advanced Introduction to Differentiation Skill Map v2 — Phase 1**

Reference: `docs/NEXT_SKILL_MAP_V2_TARGET_PLAN.md`

Add 3 new lessons to `lib/lessons/year11Advanced/introductionDifferentiation.ts`:

1. **`chain-rule-basics`** — The Chain Rule  
   Skill checkpoints: identify outer/inner function; apply dy/dx = (dy/du)(du/dx); differentiate (ax+b)^n and (ax²+bx+c)^n; evaluate at a point.  
   ID prefix: `y11adv-chain-*`  
   Visual: `CartesianGraph` with curve y=(2x+1)^3 and tangent at x=0.

2. **`stationary-points-first-derivative-test`** — Stationary Points and the First Derivative Test  
   Skill checkpoints: solve f'(x)=0; construct sign diagram; classify local max/min/horizontal inflection; state intervals of increase/decrease.  
   ID prefix: `y11adv-stat-*`  
   Visual: `CartesianGraph` with a cubic showing local max and local min labelled.

3. **`second-derivative-concavity`** — Second Derivative and Concavity  
   Skill checkpoints: find f''(x); determine concavity from sign of f''(x); find and confirm points of inflection; apply second derivative test.  
   ID prefix: `y11adv-conc-*`  
   Visual: `CartesianGraph` with a quartic showing concave-up/down regions and inflection point.

Also update `lib/newCourseCatalog.ts` to insert the 3 new slugs into the `introduction-differentiation` unit lessons array, in order, before `tangents-normals-applications`.

Each lesson: 4 guided + 7 independent + 10 mastery = 19 questions. Follow the existing `ExplicitLesson` pattern in `introductionDifferentiation.ts`. Use `formulaAnswer()` and `practicalChoice()` helpers. Add explanation strings to the `DIFF_EXPLANATIONS` record (or equivalent at top of file).

Do not rename or edit existing lessons. Do not touch other lesson files.

Validate:
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npm.cmd run audit:lessons`
- `npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run` (expect 8 lessons including new 3)
- `git diff --check`

---

## Comparison: Why Not Working with Functions?

Working with Functions is a valid Phase 2 target but scores lower for Phase 1:

| | Intro Differentiation | Working with Functions |
|---|---|---|
| Missing subtopics | 3–4 core MA-C1 gaps | 2 missing (absolute value, odd/even) |
| Exam weight | ~30% HSC Advanced | ~10% HSC Advanced |
| Sprint size | 3 new lessons | 2 new lessons |
| New visual types needed | None | None |
| Complexity | Chain rule is well-scoped | Absolute value piecewise needs MCQ-safe approach |

**Recommendation:** Implement differentiation Phase 1 first, then Working with Functions as a separate smaller sprint.
