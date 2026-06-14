# Next Skill Map v2 Target Plan — 3

Created: 2026-06-14  
Context: Follows Year 12 Standard 1 trigonometry-ratios-rates sprint (4 lessons / 77 questions, committed 2026-06-14) and Year 12 Extension 2 all-5-topic-areas activation.

---

## 1. Candidate Scoring

| Rank | Candidate | Commercial value | Coarseness | Visual support | Route risk | Sprint fit | Score |
|---|---|---|---|---|---|---|---|
| 1 | **Year 11 Advanced — Graph Transformations Phase 2** | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | **Recommended** |
| 2 | Year 11 Advanced — Trig Identities Phase 2 (related angles + identity equations) | ★★★★★ | ★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | Strong — defer |
| 3 | Year 12 Standard 1 — `statistics-and-data` expansion (two-way tables + normal basics) | ★★★ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★ | Medium |
| 4 | Year 12 Standard 2 — `bivariate-data-normal-distribution` depth pass | ★★★★★ | ★★★ | ★★★★ | ★★★ | ★★★ | Medium-low |
| 5 | Year 12 Standard 1 — `measurement-geometry` exam practice (1 lesson) | ★★★ | ★★★ | ★★★★★ | ★★★★★ | ★★ | Reject (too small) |

### Rejection notes

**Trig Identities Phase 2:** High-value, nearly tied. The existing `unit-circle-all-quadrants` lesson in `trigonometry-measure-angles` already covers ASTC evaluation. Related-angle *algebraic identities* (sin(π−θ) = sinθ) are still absent and should be the *next* sprint after this one — rejected only on sequencing.

**Standard 2 bivariate data depth pass:** Course is `available` with real users; expanding existing lessons rather than adding new slugs creates regression risk. Not suited to a clean additive sprint.

**Standard 1 statistics expansion:** Valid candidate but Standard 1 has fewer paying users and this can be a bridge sprint after the Year 11 Advanced cluster is complete.

**Standard 1 measurement-geometry exam practice:** Too small (1 lesson). Can be added opportunistically alongside another sprint.

---

## 2. Recommended Next Target

**Year 11 Advanced — `graph-transformations` unit expansion (Phase 2)**

### Why this sprint

| Factor | Detail |
|---|---|
| Genuine content gap | The current unit teaches composite function evaluation and polynomial vertex/asymptote reading but contains NO lesson on general f(x) transformation operators. Students who complete the unit cannot yet apply y = f(x + a), y = f(x) + b, y = af(x), y = f(ax), y = −f(x), or y = f(−x) notation. |
| NSW syllabus alignment | NSW MA-F1.3 requires students to describe and apply graph transformations in general function notation. This is explicitly tested in HSC Advanced papers. |
| Commercial value | Year 11 Advanced feeds into Year 12 Advanced — the highest-revenue student pathway. Graph transformations appear in every Year 12 Advanced exam via transformed trig and exponential graphs. |
| Visual payload supported | `CartesianGraph` handles translated/dilated/reflected parabolas, cubics and reciprocal curves with points and annotations — no new renderer required. |
| Auto-marking safety | Questions target parameter values (a, b, k), coordinate images, and MCQ transformation identification — all cleanly auto-markable. |
| Route/progress risk | All new slugs. The 3 existing lessons are untouched. Zero existing progress records at risk. |
| Sprint size | 2 focused new lessons — appropriate for a standalone sprint. |

### Current unit state

File: `lib/lessons/year11Advanced/graphTransformations.ts` (436 lines, 1 export function)  
Catalog: `year-11-advanced` / `graph-transformations`

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `transformations-composite-functions` | Transformations and Composite Functions | Existing |
| 2 | `transformations-polynomial-reciprocal-graphs` | Transformations of Polynomial and Reciprocal Graphs | Existing |
| 3 | `graph-transformations-exam-practice` | Graph Transformations Exam Practice | Existing |

**Coverage gap:** Lessons 1 and 2 cover composite function evaluation (f∘g) and reading coordinates from specific curve forms (vertex form, asymptotes). They do NOT teach general transformation operators on an arbitrary function f(x).

---

## 3. Proposed Phase 1 Lessons

### Lesson 1: Vertical and Horizontal Translations

| Field | Plan |
|---|---|
| **Slug** | `function-translations-general` |
| **Title** | Translating Functions |
| **Stable skill ID** | `y11adv-gt-function-translations-general` |
| **Learning goal** | Apply vertical and horizontal translation rules to any function y = f(x): state the shift direction and distance from y = f(x+a)+b, find the image of a key point under the translation, and match an equation to its description and vice versa. |
| **NSW syllabus** | MA-F1.3 — "describe translations of the graph of y = f(x)" |
| **Prerequisite** | `transformations-polynomial-reciprocal-graphs` — reading transformed equations in vertex/asymptote form |
| **Worked example themes** | (1) Given y = f(x+3)−2, state the translation in words (3 left, 2 down) and find the image of the point (1, 4). (2) A table of f(x) values is given; build the table for g(x) = f(x−1)+5. (3) MCQ: which equation gives the graph of y = x² shifted 4 right and 7 up? |
| **Skill checkpoints** | (a) Identify the direction of a horizontal shift from the sign of a in y = f(x+a); (b) State the direction and size of a vertical shift from b in y = f(x)+b; (c) Find the image (x−a, y+b) of a key point under a translation; (d) Match a description to the correct equation or vice versa |
| **Question count** | 4 guided + 5 independent + 10 mastery = 19 |
| **ID prefix** | `y11adv-gt-trans-*` |
| **Visual needs** | `CartesianGraph` on worked example 1 (parabola and translated copy with labelled point). Guided practice Q1 may use a CartesianGraph with original curve labelled. MCQ questions use text descriptions. |
| **Marking risks** | Sign confusion: y = f(x+3) shifts LEFT not right — MCQ or classification answers are safer than free text. Image coordinates: accept (x, y) and "x=a, y=b" formats. Shift descriptions: accept "3 left" and "left 3" and "−3 horizontal". |
| **Multi-part suitability** | Yes — (a) state the horizontal shift; (b) state the vertical shift; (c) find the image of the point (2, 1). All auto-markable (typed integer or MCQ). |

---

### Lesson 2: Dilations and Reflections of Functions

| Field | Plan |
|---|---|
| **Slug** | `function-dilations-reflections` |
| **Title** | Dilating and Reflecting Functions |
| **Stable skill ID** | `y11adv-gt-function-dilations-reflections` |
| **Learning goal** | Apply vertical dilation (y = kf(x)), horizontal dilation (y = f(kx)), reflection in the x-axis (y = −f(x)), and reflection in the y-axis (y = f(−x)) to identify the effect on key points and match transformations to equations. |
| **NSW syllabus** | MA-F1.3 — "describe dilations of the graph of y = f(x)" and "describe reflections" |
| **Prerequisite** | `function-translations-general` |
| **Worked example themes** | (1) Given y = 3f(x), state the transformation (vertical dilation by factor 3) and find the image of (2, −4). (2) Given y = f(2x), state the horizontal compression (factor 1/2) and find the image of (6, 1). (3) Given y = −f(x), find the image of (−3, 5) and describe the reflection. |
| **Skill checkpoints** | (a) State the effect of k on the y-coordinates in y = kf(x); (b) State the effect of k on the x-coordinates in y = f(kx); (c) Find the image of a point under a reflection y = −f(x) or y = f(−x); (d) Match a transformation description to the correct equation form |
| **Question count** | 4 guided + 5 independent + 10 mastery = 19 |
| **ID prefix** | `y11adv-gt-dil-*` |
| **Visual needs** | `CartesianGraph` on worked example 1 (parabola and stretched copy with labelled points). Optional CartesianGraph on guided Q1 showing original and reflected curve. |
| **Marking risks** | Dilation factor vs. scale factor confusion: "multiplied by 3" and "factor of 3" and "3" must all be accepted. Horizontal dilation direction: students confuse y = f(2x) as "stretching" when it is a compression. Use MCQ for direction; use numeric entry for the factor. Image coordinates: accept (x, y) and comma-separated forms. |
| **Multi-part suitability** | Yes — (a) MCQ: name the transformation type; (b) typed: state the dilation factor; (c) typed: find the image of the point (4, −2). |

---

## 4. Files to Touch

| File | Change |
|---|---|
| `lib/lessons/year11Advanced/graphTransformations.ts` | Add 2 new override branches: `function-translations-general` and `function-dilations-reflections`. Add explanation keys to `GRAPH_TRANSFORM_EXPLANATIONS`. |
| `lib/newCourseCatalog.ts` | Add 2 lesson seeds to the `graph-transformations` unit, inserted after `transformations-polynomial-reciprocal-graphs` and before `graph-transformations-exam-practice`. Add `stableSkillId` + 4 `skillCheckpoints` per lesson. Import and wire the new lesson slugs into `buildLesson`. |
| `docs/NEXT_SKILL_MAP_V2_TARGET_PLAN_3.md` | This file — plan document. |

Do NOT touch: checkout, auth, payments, Supabase writes, or any other lesson file. Do NOT rename or remove the 3 existing `graph-transformations` lessons.

---

## 5. Visual Needs Summary

| Lesson | Payload type | Usage |
|---|---|---|
| `function-translations-general` | `CartesianGraph` | Worked example 1: parabola y=x² and translated copy y=(x−2)²+3 with labelled key point. Optional on guided Q1. Text only for all other questions. |
| `function-dilations-reflections` | `CartesianGraph` | Worked example 1: parabola y=x² and vertically dilated copy y=3x² with labelled point. Optional on guided Q1 for reflection. Text only for all other questions. |

No new visual renderer required. `CartesianGraph` with `points` and optional `annotations` handles both cases — same pattern as `stationary-points-first-derivative-test` and `curve-sketching-calculus`.

---

## 6. Risks

| Risk | Mitigation |
|---|---|
| Sign confusion in y = f(x+a): students expect +3 means right, it means left | Design all questions to disambiguate: MCQ with "left" / "right" options rather than signed integers; add explanation text to worked examples and guided practice |
| Horizontal dilation f(kx): k=2 compresses (not stretches) — counterintuitive | Lead with the image formula (x → x/k) in worked examples; use MCQ for "stretch or compress" classification |
| Image coordinate answers: many valid formats | Accept (a, b), "a,b", "a b", and swap format in `acceptedAnswers`; strip spaces before comparison |
| Overlap with existing `transformations-polynomial-reciprocal-graphs` | Existing lesson teaches translation by reading vertex form (specific curve); new lesson teaches the general f(x) operator rule. Brief cross-reference in learning goal text distinguishes them. No slug conflict. |
| Exam practice currently lacks general f(x) questions | Add general-form questions to exam practice as Phase 2 (not in this sprint). |

---

## 7. Validation Commands

```bash
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
git diff --check
```

**Expected after Phase 1:**
- `graph-transformations` lesson count: 3 → 5 (existing 3 + 2 new)
- Dry-run seed count for `year-11-advanced` increases by 2 × 19 = 38 questions
- No TypeScript errors
- `audit:lessons` PASS — 0 failures, 0 placeholder warnings
- `git diff --check` — no output (no trailing whitespace)

---

## 8. Implementation Prompt

```
Nova Maths context:
You are working in c:\Users\joshu\hsc-maths-coach.
Use local Claude/Codex.
Do not touch checkout/auth/payments/ads.
Do not write to Supabase.
Final response under 1000 words.

Task: Implement Year 11 Advanced Graph Transformations — Skill Map v2 Phase 2.

Reference: docs/NEXT_SKILL_MAP_V2_TARGET_PLAN_3.md

Before writing any code, read:
- docs/NEXT_SKILL_MAP_V2_TARGET_PLAN_3.md (this plan — slug details, skill checkpoints, marking risks)
- lib/lessons/year11Advanced/graphTransformations.ts (existing override style and GRAPH_TRANSFORM_EXPLANATIONS pattern)
- lib/newCourseCatalog.ts (graph-transformations unit, find the existing 3 lesson slugs)
- node_modules/next/dist/docs/ (any Next.js API you need)

Add 2 new lessons to lib/lessons/year11Advanced/graphTransformations.ts:

1. function-translations-general — Translating Functions
   Stable ID: y11adv-gt-function-translations-general
   ID prefix: y11adv-gt-trans-*
   Checkpoints:
     (a) Identify horizontal shift direction and size from sign of a in y = f(x+a)
     (b) State vertical shift direction and size from b in y = f(x)+b
     (c) Find the image coordinates (x−a, y+b) of a key point under a translation
     (d) Match a description to the correct equation form and vice versa
   Visual: CartesianGraph on worked example 1 (original parabola + translated copy, labelled key point).
   Marking: MCQ for direction; typed integer for shift distance; (x, y) coordinate with multiple accepted formats.
   Guard: lesson.slug === "function-translations-general"

2. function-dilations-reflections — Dilating and Reflecting Functions
   Stable ID: y11adv-gt-function-dilations-reflections
   ID prefix: y11adv-gt-dil-*
   Checkpoints:
     (a) State the effect of factor k on y-coordinates in y = kf(x)
     (b) State the effect of factor k on x-coordinates in y = f(kx) — image x becomes x/k
     (c) Find the image of a point under y = −f(x) or y = f(−x)
     (d) Match a transformation type to its equation form (MCQ)
   Visual: CartesianGraph on worked example 1 (original parabola + vertically dilated copy, labelled).
   Marking: MCQ for direction/type; typed factor; (x, y) image coordinates with accepted format variants.
   Guard: lesson.slug === "function-dilations-reflections"

Add 2 explanation keys per question to GRAPH_TRANSFORM_EXPLANATIONS following the existing keyed-by-ID pattern.

Also update lib/newCourseCatalog.ts:
- Insert function-translations-general and function-dilations-reflections into the graph-transformations unit lessons array, in order, after transformations-polynomial-reciprocal-graphs and before graph-transformations-exam-practice.
- Add stableSkillId + 4 skillCheckpoints per lesson (see plan).
- Wire both slugs into buildLesson using the existing year11AdvancedGraphTransformationsLessonOverride function call.

Each lesson: 4 guided + 5 independent + 10 mastery = 19 questions.
Use formulaAnswer() for typed numeric/coordinate answers. Use practicalChoice() for MCQ.
Do not rename or edit the 3 existing lessons. Do not touch other lesson files.

Validate:
- npx.cmd tsc --noEmit
- npm.cmd run build
- npm.cmd run audit:lessons
- npx.cmd tsx scripts/seed-question-bank.ts --course year-11-advanced --dry-run
  (expect graph-transformations to show 5 lessons, total new questions +38)
- git diff --check
```

---

## 9. Phase 2 Outlook (not in this sprint)

After Phase 1 completes, expand `graph-transformations-exam-practice` in place to include:
- General f(x) translation and dilation questions (MCQ + image coordinates)
- Sequences of 2 combined transformations: identify each step and find the net image
- Matching transformed graph descriptions to equations

Expected standard question expansion: exam practice + 4–6 new questions mixing all 5 lesson types.
