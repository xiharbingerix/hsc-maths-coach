# Year 12 Mathematics Extension 2 — HSC Status

_Audited: June 2026_

---

## 1. Course Registration

| Field | Value |
|---|---|
| Slug | Not registered — `year-12-extension-2` does not exist in `lib/courseTypes.ts` |
| Status | Not started |
| App routes | None |
| Diagnostic | None |
| Question bank | Not in `SUPPORTED_COURSE_SLUGS` |
| Lesson files | No `lib/lessons/year12Extension2/` directory |

Extension 2 is completely absent from Nova Maths. No slug, no units, no lessons, no diagnostic, no question bank seeding.

---

## 2. NSW Syllabus Coverage Required

The NSW Mathematics Extension 2 Yr 12 course has five major topic areas:

### Proof
- Mathematical induction (advanced — stronger convergence and inequality proofs than Ext 1)
- Proof by contradiction (assume negation, derive absurdity)
- Proof by contrapositive
- Inequality proofs using AM-GM, CBS

### Vectors (3D)
- 3D vector arithmetic (i, j, k notation, component form)
- Scalar and vector products in 3D
- Geometric proofs using vectors
- Vector equations of lines and planes

### Complex Numbers
- Arithmetic (add, subtract, multiply, divide)
- Modulus and argument; polar form $r(\cos\theta + i\sin\theta)$
- De Moivre's theorem and roots of unity
- Locus problems in the Argand diagram (lines, circles, rays)
- Polynomial equations with complex roots; conjugate root theorem

### Calculus
- Integration techniques: integration by parts (IBP), partial fractions, trig substitution
- Volumes of revolution (about x-axis and y-axis)
- Further first-order ODEs; separation of variables

### Mechanics
- Simple harmonic motion (SHM) — equations of motion, period, amplitude
- Circular motion — centripetal acceleration, horizontal/vertical circles
- Projectile motion — with and without air resistance
- Newton's law of cooling; growth-decay models

---

## 3. Current Coverage

| Topic | Status |
|---|---|
| Proof (advanced induction, contradiction, contrapositive, inequalities) | **None** |
| 3D Vectors | **None** |
| Complex Numbers | **None** |
| Integration techniques (IBP, partial fractions, trig substitution) | **None** |
| Volumes of revolution | **None** |
| Mechanics (SHM, circular motion, projectiles with resistance) | **None** |

Extension 2 is a complete zero across all topic areas.

---

## 4. Missing HSC-Specific Features

Everything listed for Extension 1 is also absent for Extension 2, plus:

1. **Complex number renderer** — Argand diagram locus questions require a graphical question type that does not exist
2. **Mechanics question type** — projectile/SHM questions involve multi-step worked solutions with intermediate values; no multi-part question structure exists
3. **Extended proof questions** — the majority of HSC Extension 2 Section II is proof-based; free-text or show-that question support is a hard prerequisite
4. **Timed exam practice** — same gap as Extension 1
5. **Past paper import** — same structural blockers as documented in `docs/HSC_ADVANCED_2020_2025_IMPORT_AUDIT.md`

---

## 5. Recommended Structure — Slugs to Register

### Step 1: Register the course slug

Add to `lib/courseTypes.ts`:
```typescript
| "year-12-extension-2"
```

Add a `CoursePathwaySeed` to `newCourseCatalog.ts` with `status: "coming_soon"` and the 5 planned units:

```
year-12-extension-2
  proof-ext2                           (contradiction, contrapositive, advanced inequalities)
  vectors-3d                           (3D vectors, scalar product, geometric proofs)
  complex-numbers                      (arithmetic, polar, De Moivre, locus)
  calculus-ext2                        (IBP, partial fractions, trig substitution, volumes)
  mechanics                            (SHM, circular motion, projectiles)
```

### Step 2: Add a diagnostic

`lib/diagnostics/year-12-extension-2.ts` — 3–4 questions per unit to seed the study plan.

### Step 3: Lesson overrides

Build lesson override files under `lib/lessons/year12Extension2/`, starting with whichever unit has the least cross-unit dependencies.

Recommended first unit: **Complex Numbers** — self-contained, high student demand, and maps cleanly to MCQ + typed answers for the fundamental arithmetic and modulus-argument topics.

### Step 4: HSC exam preparation slug

`hsc-extension-2-practice` — once the curriculum content is stable:

```
hsc-extension-2-practice
  exam-technique-ext2
  proof-hsc-questions
  complex-numbers-hsc-questions
  calculus-hsc-questions
  mechanics-hsc-questions
  mock-exam-section-i
  mock-exam-section-ii
```

---

## 6. Recommended Implementation Order

1. **Register `year-12-extension-2` slug** (`lib/courseTypes.ts`, `lib/newCourseCatalog.ts` `coming_soon`) — zero content risk, unblocks later work
2. **Add Extension 2 diagnostic** (`lib/diagnostics/year-12-extension-2.ts`) — lets enrolled students get a study plan even before full content exists
3. **Complex Numbers unit** — highest demand, most teachable via typed/MCQ; start with arithmetic and modulus-argument lessons
4. **Proof unit** — builds on Extension 1 induction overrides already in the codebase; contradiction and contrapositive lessons are prose-light and MCQ-friendly
5. **3D Vectors unit** — extends existing Ext 1 vector overrides; requires 3D component notation but no new question types
6. **Calculus Ext 2 unit** — requires IBP and partial-fraction content not yet authored; highest authoring effort
7. **Mechanics unit** — requires multi-part question support before SHM/circular motion questions are practical; block until multi-part type is built
8. **`hsc-extension-2-practice` course** — final step; depends on multi-part questions, extended response type, and at least partial past-paper import pipeline

---

## 7. Cross-Cutting Prerequisites

These infrastructure gaps block both Extension 1 and Extension 2 HSC preparation:

| Gap | Blocks |
|---|---|
| Multi-part question type (`PracticeQuestion` schema + UI) | Section II practice for both Ext 1 and Ext 2 |
| Extended response / free-text marking | All show-that, prove, sketch questions |
| Timed exam mode | Both mock exam courses |
| Past-paper import pipeline (diagram assets, schema cleanup) | Both `hsc-extension-1-practice` and `hsc-extension-2-practice` |
| Band predictor wired to Extension courses | Student motivation and conversion for both |
| `year-12-extension-2` slug registration | All Extension 2 work |
