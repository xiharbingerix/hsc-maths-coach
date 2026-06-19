# Nova Education — Engine Extraction Plan

**Goal:** Turn Nova Maths into a multi-subject platform ("Nova Education") that shares one
engine across subject apps (Nova Maths, **Nova Physics first**, later Chemistry/Biology).
Strategic driver: **de-risk / diversify** away from sole dependence on the maths market.

**Approach (decided):** *Shared engine, not a hard fork.* Extract the subject-agnostic core
into `packages/engine`, keep each subject's content + renderers as its own app. Copy the
**content and renderers**; **single-source the engine** so a fix lands once.

This document is the **boundary map** — read-only audit of the current repo plus the new work
Physics needs. No files have been moved. Approve the boundary before any migration begins.

---

## 1. The headline finding: the DB is already subject-agnostic

`lib/supabase-migrations/005_question_bank.sql` stores questions keyed by text columns
`course_slug`, `year_level`, `topic_slug`, `subtopic_slug` — **no "maths" assumption anywhere**.
`worksheet_attempts`, `worksheet_answers`, mastery tables, exam attempts all hang off
`questions(id)` and `auth.users`. Adding Physics means new `course_slug` values
(e.g. `year-12-physics`), not a schema rewrite.

- **Recommended (optional) schema change:** add a `subject text NOT NULL DEFAULT 'maths'`
  column to `questions` (and `profiles.selected_course_slug` → consider a paired
  `selected_subject`) so cross-subject queries and per-subject access control are clean. Not
  strictly required — `course_slug` namespacing alone works — but cheap insurance.

**Implication:** the migration is overwhelmingly a TypeScript/refactor job, not a data job.

---

## 2. The engine / content boundary

### 2a. CLONE AS-IS → `packages/engine` (subject-agnostic core)

| Area | Files |
|---|---|
| Data model | `lib/courseTypes.ts`, the `ExplicitLesson` / `PracticeQuestion` / `WorkedExample` / `PracticeQuestionPart` types (currently defined in `lib/lessons/differentialCalculus.ts` — **should be moved out of a maths content file into the engine**) |
| Catalog machinery | the `buildLesson` / `prefixLessonQuestionIds` / `slugPrefix` framework and `CoursePathwaySeed` plumbing in `lib/newCourseCatalog.ts` (the *mechanism*, not the maths data) |
| Practice/mastery | `lib/mastery/buildMasteryQuiz.ts`, `lib/mastery/updateMastery.ts`, `lib/skillMapV2.ts`, `lib/dailyReviewQueue.ts`, `lib/hintLadder.ts` |
| Marking | `lib/answerMarking.ts`, `lib/mathInput/parseStudentMath.ts` (extend for Physics — see §4) |
| Exam engine | `lib/bandPredictor.ts`, exam routes `app/api/exam/**`, exam attempt persistence (migration 021) |
| AI tutor | `app/api/tutor/route.ts` (prompt has subject-specific framing → parameterise) |
| Retention/billing/admin | `lib/userAccess.ts`, `lib/offers.ts`, `lib/stripe.ts`, `lib/resend.ts`, analytics (`lib/analytics/**`), admin reports, weekly digest + purchase-prompt crons |
| Rendering core | `app/components/VisualPayloadRenderer.tsx`, the `DIAGRAM_SPECS` registry pattern in `lib/lessons/diagramRegistry.ts`, generic `LessonRenderer` (takes `courseSlug` as a prop — already generic) |
| Generic renderers | BoxPlot, BarChart, Histogram, ScatterPlot, NormalDistribution, PieChart, Venn, TwoWayTable, ProbabilityTree, NumberLine, StepGraph, CartesianGraph |

### 2b. CLONE VERBATIM — the moat (pedagogy, not maths)

- `docs/CONTENT_QUALITY_STANDARD.md`
- `docs/FEYNMAN_TEACHING_STANDARD.md`
- `docs/PRACTICE_QUESTION_STANDARD.md`

The three gates (breadth / teaching depth / practice depth) and the 19-question spine +
`masteryQuizPool` + `multiPartPractice` structure are subject-independent. NSW Physics is also
Band-1–6 at Stage 6, so the Band-6 bar maps directly. These port unchanged into the engine docs.

### 2c. LEAVE BEHIND in `apps/nova-maths` (maths content/renderers)

- All of `lib/lessons/**` (the year7–year12 content + `feynmanEnhancements`)
- The giant `??` override chain in `buildLesson` (≈130 maths overrides) — this is a **content
  registry**, and the pattern that replaces it is in §3.
- Maths-only renderers: Argand, UnitCircle, TrigGraph, Vector3D, PolynomialCurve, SlopeField,
  Triangle, Sector, Solid3D, Net, Bearings, TrapezoidalRule, AngleFigure, Network, StemAndLeaf,
  DotPlot, PlaneShape
- Maths diagnostics content in `lib/diagnostics/**` (keep the *framework*, leave the banks)
- Maths route tree under `app/course/year-*/`

### 2d. BUILD NEW for `apps/nova-physics`

- NSW Physics Stage 6 syllabus → catalog (Modules 1–8: Kinematics, Dynamics, Waves & Thermo,
  Electricity & Magnetism, Advanced Mechanics, Electromagnetism, Nature of Light, From the
  Universe to the Atom).
- **Head start:** the Ext-1 **Kinematics** and **Projectile Motion** lessons
  (`lib/lessons/year12Extension1/kinematics.ts`, `projectileMotion.ts`) are physics-flavoured —
  lift their content and the projectile renderer.
- Physics renderer pack (new `DIAGRAM_SPECS` entries): free-body diagrams, circuit diagrams,
  ray/wave diagrams, field lines, motion graphs (x–t, v–t, a–t).
- **Units + significant-figures answer marking** — the one true new capability (see §4).
- Physics content packs to the full quality bar (the real cost — months, not the engine).

---

## 3. Making `subject` a first-class dimension

Today "it's all maths" is implicit in five places. Each must become parameterised:

1. **`NewCourseSlug` union** (`lib/courseTypes.ts`) — currently 15 hardcoded maths slugs.
   → Per-app slug unions; engine accepts `string` slugs namespaced per subject.
2. **The `buildLesson` override switch** (`lib/newCourseCatalog.ts:266-395`) — a ~130-line `??`
   chain importing every maths lesson. → Replace with a **registry array** each app provides:
   `buildLesson(course, unit, lesson, index, overrides[])`. Engine owns the loop; apps own the list.
3. **`COURSE_QUESTION_ID_PREFIX`** (`lib/newCourseCatalog.ts:232`) — global ID-prefix map.
   → Namespace by subject (`phys-y12-…`) so Maths and Physics IDs never collide in a shared DB.
4. **Per-course route folders + route-helper files** (`app/course/year-12-advanced/...` +
   `lib/year12AdvancedRoutes.ts`, one per course) — heavy duplication. → Collapse to a single
   dynamic segment `app/[subject]/course/[courseSlug]/[unitSlug]/[lessonSlug]/page.tsx` resolving
   the catalog by subject. `LessonRenderer` already takes `courseSlug` as a prop, so the renderer
   itself doesn't change.
5. **Hardcoded `enrich*` dispatch** (`lib/newCourseCatalog.ts:463-470`) — `course.slug === …`
   ladder. → Per-app enrichment hook.

DB-side: add the optional `subject` column (§1); everything else already namespaces on
`course_slug`.

---

## 4. The one genuinely new capability: Physics answer marking

Maths marking (`answerMarking.ts` + `parseStudentMath.ts` + the partial CAS/symbolic path)
handles expressions and exact/accepted-answer matching. Physics answers additionally carry:

- **Units** — `9.8 m s⁻²`, `3.0 × 10⁸ m/s`; must parse + compare dimensionally.
- **Significant figures / tolerance** — accept `9.8 ± 0.1`, enforce sig-fig conventions.
- **Scientific notation** — `3.0e8` ≡ `3 × 10⁸`.

Design this as an engine-level numeric+unit marker (reusable for Chemistry later), not a
Physics one-off. It's the only piece that is "new build" rather than "clone".

---

## 5. Proposed monorepo layout

```
nova-education/
├─ packages/
│  ├─ engine/         # §2a: data model, catalog machinery, mastery, marking,
│  │                  #      exam, tutor, billing, retention, admin, generic renderers
│  └─ standards/      # §2b: the three quality-standard docs (shared, versioned)
├─ apps/
│  ├─ nova-maths/     # existing maths content + maths renderers + slugs
│  └─ nova-physics/   # new: physics catalog, renderers, units marking
└─ (shared) Nova Education umbrella landing + one auth/billing/account
```

Tooling: pnpm/Turborepo workspace. One Supabase project, one Stripe account, one auth — a
student buys "Nova" and the `subject` dimension gates what they see.

---

## 6. Suggested sequencing

1. **Lift the data model out of content.** Move `ExplicitLesson` & friends from
   `lib/lessons/differentialCalculus.ts` into the engine. (Safe, mechanical, unblocks everything.)
2. **Stand up the monorepo** and move the engine files (§2a/§2b) into `packages/engine`;
   `nova-maths` imports them. Maths app must build green with zero behaviour change — this is the
   regression gate.
3. **Parameterise `subject`** (§3, items 2–5) inside the engine while Maths is the only consumer,
   so any breakage is caught against known-good content.
4. **Add the units/sig-fig marker** (§4).
5. **Scaffold `nova-physics`**: physics catalog (Modules 1–8) + renderer pack, seed with the
   lifted Kinematics/Projectile content as the first real lessons.
6. **Author physics content to the quality bar** — the long pole.

Steps 1–4 are pure engineering against existing maths content (low risk, no new subject
knowledge needed). Step 6 is the months-long content effort.

---

## 7. Risks & watch-items

- **Drift** is the whole reason for shared-core: never hand-edit engine files inside an app copy.
  If full monorepo tooling is too much up front, the cheap interim is a tracked "engine manifest"
  (the §2a/§2b list) that is off-limits to per-app edits until extracted.
- **Quality bar is the real cost, not the code.** The engine clones in days; one subject's
  Band-6 content is months. Sequence content accordingly; don't let "the app can do Physics"
  read as "Physics is close."
- **ID collisions** in a shared DB — enforce subject-namespaced `COURSE_QUESTION_ID_PREFIX`
  before any physics question is seeded.
- **Tutor prompt** carries maths framing — must be parameterised per subject before Physics
  tutoring is enabled, or it will give maths-shaped help on physics questions.
```
