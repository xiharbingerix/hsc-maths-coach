# Audit Instructions — Year 12 Mathematics Advanced

**Course slug:** `year-12-advanced`  
**Status going in:** Depth pass complete (91 lessons / 1715 questions). Not yet audited dot-by-dot against the NSW 2024 syllabus.  
**Goal:** Confirm every NSW 2024 Mathematics Advanced outcome for Year 12 has at least one lesson covering it, identify any missing dot-points, fill gaps, then mark the checklist entry complete.

---

## Before you start — files to read

Read these four files in full before touching any lesson file:

1. `docs/FEYNMAN_TEACHING_STANDARD.md` — teaching section quality bar
2. `docs/PRACTICE_QUESTION_STANDARD.md` — question quality bar
3. `docs/QUESTION_AUTHORING_STANDARD.md` — authoring rules (LaTeX, difficulty levels, etc.)
4. `docs/FEEDBACK_AND_HINTS_STANDARD.md` — hint and explanation standards

---

## Course architecture — important differences from Standard 2 and Extension 1

Year 12 Advanced uses a **legacy format** (`ExplicitLesson[]` arrays) that differs from the `buildLesson` override pattern used in Standard 2 and Extension 1.

| Concern | Detail |
|---|---|
| Lesson files | `lib/lessons/*.ts` (top-level, not a subdirectory) |
| Route catalogue | `lib/courseUnits.ts` + `lib/year12AdvancedRoutes.ts` |
| **Not** in `newCourseCatalog.ts` | Advanced has its own separate catalogue; do not edit `newCourseCatalog.ts` |
| Seed entry point | `year12AdvancedLessonSets` in `scripts/seed-question-bank.ts` |
| Seed command | `npx tsx --env-file=.env.local scripts/seed-question-bank.ts --course=year-12-advanced` |
| Question source IDs | Auto-generated as `year-12-advanced/<unitSlug>` during seed; question `id` fields within each lesson must be unique within their lesson file |

---

## NSW 2024 Mathematics Advanced — Year 12 topic map

The 2024 syllabus restructures the old 2019 syllabus. Use this table as the authoritative scope for the audit. Verify against the NESA Mathematics Advanced 11–12 Syllabus (2024) PDF before treating any row as definitive — the codes below are drawn from project documentation and may need confirming.

| # | NSW Topic | Outcome code | Year | Nova unit(s) |
|---|---|---|---|---|
| 1 | Functions: Working with Functions | MA-F1 | 11 | Functions and Graphing Techniques (partial) |
| 2 | Functions: Graphing Techniques | MA-F2 | 12 | Functions and Graphing Techniques (partial) |
| 3 | Trigonometric Functions: Trigonometry and Measure of Angles | MA-T1 | 11 | Trigonometric Functions and Graphs (partial) |
| 4 | Trigonometric Functions: Trigonometric Functions and Identities | MA-T2 | 11–12 | Trigonometric Functions and Graphs + Further Trigonometry |
| 5 | Trigonometric Functions: Trigonometric Equations | MA-T3 | 12 | Further Trigonometry (partial) |
| 6 | Calculus: Introduction to Differentiation | MA-C1 | 11–12 | Differential Calculus (partial) |
| 7 | Calculus: Differential Calculus | MA-C2 | 12 | Differential Calculus + Differentiation Techniques |
| 8 | Calculus: Applications of Differentiation | MA-C3 | 12 | Applications of Differentiation |
| 9 | Calculus: Integral Calculus | MA-C4 | 12 | Integral Calculus + Further Integral Calculus |
| 10 | Exponential and Logarithmic Functions | MA-E1 | 12 | Exponential and Logarithmic Functions |
| 11 | Statistical Analysis: Probability and Discrete Probability Distributions | MA-S1 | 11–12 | Probability |
| 12 | Statistical Analysis: Descriptive Statistics and Bivariate Data Analysis | MA-S2 | 12 | Statistical Analysis (partial) |
| 13 | Statistical Analysis: Random Variables | MA-S3 | 12 | Statistical Analysis (partial) |
| 14 | Financial Mathematics: Modelling Financial Situations | MA-M1 | 12 | Sequences, Series and Financial Mathematics + Financial Mathematics |

**Scope note:** Nova is a Year 12 HSC prep product. Year 11 prerequisite content (MA-F1, MA-T1, MA-C1 basics, MA-S1 basics) only needs to be present where it is directly tested in the HSC exam or is a common gap for Year 12 students entering unprepared. You do not need to build a complete Year 11 unit for each of these.

---

## Audit procedure — one unit at a time

For each of the 13 Nova units, do the following steps in order.

### Step 1 — Read the lesson file

Open the relevant `lib/lessons/*.ts` file. Count the lessons and their slugs. Record them.

### Step 2 — Pull the NSW dot-points for that topic

From the NESA Mathematics Advanced 11–12 Syllabus (2024), list every dot-point under the corresponding topic code(s). A dot-point is a line starting with "Students:" or a bullet under an outcome heading.

### Step 3 — Map lessons to dot-points

For each dot-point, confirm there is at least one lesson (and at least one practice question in that lesson) that directly addresses it.

Mark each dot-point as:
- ✅ covered — at least one question targets this dot-point directly
- ⚠️ thin — addressed in passing but no dedicated question
- ❌ missing — no lesson or question covers this at all

### Step 4 — Fill gaps

For each ⚠️ or ❌ dot-point, add one or more multiple-choice questions to the most appropriate existing lesson. Follow the format described in `docs/PRACTICE_QUESTION_STANDARD.md`.

**Question ID convention for new questions in this course:**  
Use the lesson slug as the prefix. Examples:
- `tangents-and-normals-m1` (model limitations / edge case)
- `area-under-curve-m2`
- `random-variables-m3`

Keep IDs unique within the lesson file. Do not reuse IDs across files (they share no namespace in the legacy format, but unique IDs prevent confusion).

**Do not restructure the lesson or change the `ExplicitLesson` export shape.** Only append questions to existing lessons. If a dot-point is so large it needs a new lesson, flag it in your findings rather than creating one — lesson creation requires route and catalogue updates that are out of scope for an audit pass.

### Step 5 — Check teaching quality

For each lesson, read the `teaching.paragraphs` array. Verify it meets the Feynman Teaching Standard:
- Simple language before notation
- Concrete example before the general rule
- Common misconception named
- Short paragraphs (≤ 4 sentences each)

If a lesson's teaching section is missing or very thin (< 2 paragraphs), note it. Rewriting teaching sections is a separate depth pass — the audit only flags, not rewrites.

### Step 6 — Record findings

Write your findings for each unit in the format shown in the **Findings log** section below.

---

## Findings log

Fill this in as you go. Copy the template for each unit.

```
### [Unit name]
File: lib/lessons/XXX.ts
Lessons: N
NSW topic(s): MA-XX

Dot-point coverage:
- ✅ [dot-point text]
- ⚠️ [dot-point text] — addressed in lesson Y but no standalone question
- ❌ [dot-point text] — no coverage

Actions taken:
- Added question [id] to lesson [slug] covering [dot-point]
- Flagged [dot-point] as needing new lesson (not created in this pass)

Post-audit status: ✅ / ⚠️ partial / ❌ gaps remain
```

---

## Unit-by-unit starting points

| Nova unit | File | Lessons | Start with this NSW section |
|---|---|---|---|
| Differential Calculus | `lib/lessons/differentialCalculus.ts` | 12 | MA-C1 + MA-C2 |
| Differentiation Techniques | `lib/lessons/differentiationTechniques.ts` | 5 | MA-C2 (chain, product, quotient rules) |
| Applications of Differentiation | `lib/lessons/applicationsDifferentiation.ts` | 6 | MA-C3 |
| Integral Calculus | `lib/lessons/integralCalculus.ts` | 10 | MA-C4 (indefinite + definite integrals) |
| Further Integral Calculus | `lib/lessons/furtherIntegralCalculus.ts` | 6 | MA-C4 (areas, further techniques) |
| Functions and Graphing Techniques | `lib/lessons/functionsGraphingTechniques.ts` | 11 | MA-F2 (and MA-F1 where HSC-tested) |
| Trigonometric Functions and Graphs | `lib/lessons/trigonometricFunctionsGraphs.ts` | 7 | MA-T2 |
| Further Trigonometry | `lib/lessons/furtherTrigonometry.ts` | 5 | MA-T2 + MA-T3 |
| Exponential and Logarithmic Functions | `lib/lessons/exponentialLogarithmicFunctions.ts` | 5 | MA-E1 |
| Sequences, Series and Financial Maths | `lib/lessons/sequencesSeriesFinancialMaths.ts` | 5 | MA-M1 (sequences and series component) |
| Financial Mathematics | `lib/lessons/financialMathematics.ts` | 6 | MA-M1 (financial applications component) |
| Statistical Analysis | `lib/lessons/statisticalAnalysis.ts` | 8 | MA-S2 + MA-S3 |
| Probability | `lib/lessons/probability.ts` | 4 | MA-S1 |

---

## Known prior-work notes

- **Probability unit** was added specifically to cover MA-S1 (MA-P1 in earlier documentation), which was the only missing syllabus strand as of the depth pass (2026-06-14). Verify the four lessons cover the full MA-S1 scope.
- **Differentiation Techniques** was separated from Differential Calculus to give chain/product/quotient rules their own space — check that the split does not leave a gap where MA-C2 chain-rule dot-points fall between both files without being in either.
- **Statistical Analysis** covers both MA-S2 (bivariate data, descriptive stats) and MA-S3 (random variables, normal distribution). These are conceptually distinct; check the lesson list covers both halves.
- **Financial Mathematics** is split across two units (Sequences + FM). MA-M1 has two main sections: (a) sequences and series and (b) financial applications. Confirm each section maps to one of the two Nova units cleanly.

---

## After the audit is complete

### 1. Re-seed

```bash
npx tsx --env-file=.env.local scripts/seed-question-bank.ts --course=year-12-advanced
```

Confirm no seed warnings and the question count is ≥ 1715 (it should increase if you added questions).

### 2. Update `docs/COURSE_STRUCTURE_CHECKLIST.md`

Replace the current Year 12 Advanced section (lines ~220–248) with the collapsed format used for the other audited courses:

```markdown
## Year 12 Advanced ✅ Complete — Audited against NSW 2024 syllabus (YYYY-MM-DD)

`year-12-advanced` — `available`. Lesson files: `lib/lessons/*.ts` (legacy `ExplicitLesson[]` format).
**91 lessons / [final question count] questions.** All NSW 2024 MA focus areas fully addressed.

| # | NSW Topic | Outcome | Lessons | Status |
|---|---|---|---|---|
| 1 | Functions: Working with Functions | MA-F1 | [n] | ✅ |
| 2 | Functions: Graphing Techniques | MA-F2 | [n] | ✅ |
| 3 | Trigonometry: Measure of Angles | MA-T1 | [n] | ✅ |
| 4 | Trigonometry: Functions and Identities | MA-T2 | [n] | ✅ |
| 5 | Trigonometry: Equations | MA-T3 | [n] | ✅ |
| 6 | Calculus: Intro to Differentiation | MA-C1 | [n] | ✅ |
| 7 | Calculus: Differential Calculus | MA-C2 | [n] | ✅ |
| 8 | Calculus: Applications | MA-C3 | [n] | ✅ |
| 9 | Calculus: Integral Calculus | MA-C4 | [n] | ✅ |
| 10 | Exponential and Log Functions | MA-E1 | [n] | ✅ |
| 11 | Statistics: Probability + Discrete | MA-S1 | [n] | ✅ |
| 12 | Statistics: Descriptive + Bivariate | MA-S2 | [n] | ✅ |
| 13 | Statistics: Random Variables | MA-S3 | [n] | ✅ |
| 14 | Financial Mathematics | MA-M1 | [n] | ✅ |

**Note:** Legacy `ExplicitLesson[]` format — not using the `buildLesson` override pattern.
Seeded via `year12AdvancedLessonSets` in `scripts/seed-question-bank.ts`.
```

Also update the Quick Status table at the top of the checklist (line ~31):

```
| Year 12 Advanced | 91 (13 units) | — | ✅ Audited 2024 | [final count] | ✅ Complete — audited YYYY-MM-DD |
```

### 3. Commit

```bash
git add lib/lessons/*.ts docs/COURSE_STRUCTURE_CHECKLIST.md
git commit -m "Audit Year 12 Advanced: fill syllabus gaps; collapse checklist section"
```

---

## What "complete" means

The audit is done when every row in the NSW topic map above shows ✅, meaning:
- At least one lesson exists that covers the dot-points for that topic
- At least one practice question in that lesson directly targets each dot-point
- No dot-point is ❌ missing (⚠️ thin is acceptable if an existing question addresses the concept indirectly and the dot-point is minor)
- The seed run completes without warnings
- The checklist is updated and committed
