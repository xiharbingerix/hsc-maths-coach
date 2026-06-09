# Year 8 Course Status

_Audit date: 9 June 2026_

## Summary

Year 8 Mathematics is present in the new course catalogue as an in-progress course with 9 planned units. Two units now have real lesson content and seedable question-bank rows: Algebra Foundations and Pythagoras' Theorem.

- Current completion: 51.1% by the checklist rubric below.
- Fully complete units: 1 of 9.
- Partially complete units: 1 of 9.
- Placeholder units: 7 of 9.
- Lesson-content completion: 12 built lessons.
- Seed-bank coverage: 228 seedable questions, all from Algebra Foundations and Pythagoras' Theorem.
- Diagnostic coverage: 8 of 9 catalogue units have diagnostic coverage; `algebra-foundations` is missing from the diagnostic.
- Estimated question-bank size when complete: about 1,026 seedable questions if each of the 9 units averages 6 lessons.

## Scoring Rubric

Per-unit completion is scored across the five requested audit dimensions:

- Unit exists in `lib/newCourseCatalog.ts`: 20 percentage points.
- Lesson plan exists in the catalogue: 20 percentage points.
- Explicit override content exists in `lib/lessons/year8/*`: 20 percentage points.
- Diagnostic coverage exists in `lib/diagnostics/year-8-mathematics.ts`: 20 percentage points.
- Seedable question-bank rows exist via `scripts/seed-question-bank.ts`: 20 percentage points.

This means diagnostic-only placeholder units score 40%, while a content-built unit without diagnostic coverage scores 80%.

## Unit Audit

| Unit | Unit exists? | Lesson count | Override content exists? | Diagnostic coverage? | Seeded questions? | Completion |
| --- | --- | ---: | --- | --- | ---: | ---: |
| Number Operations and Properties (`number-operations`) | Yes | 0 | No | Yes, 3 diagnostic questions | 0 | 40% |
| Algebra Foundations (`algebra-foundations`) | Yes | 6 | Yes, `lib/lessons/year8/algebraFoundations.ts` | No | 114 | 80% |
| Algebra and Equations (`algebra-equations`) | Yes | 0 | No | Yes, 3 diagnostic questions | 0 | 40% |
| Linear Relationships (`linear-relationships`) | Yes | 0 | No | Yes, 2 diagnostic questions | 0 | 40% |
| Pythagoras' Theorem (`pythagoras-theorem`) | Yes | 6 | Yes, `lib/lessons/year8/pythagorasTheorem.ts` | Yes, 3 diagnostic questions | 114 | 100% |
| Geometric Properties and Reasoning (`geometry-properties`) | Yes | 0 | No | Yes, 2 diagnostic questions | 0 | 40% |
| Volume and Surface Area (`volume-and-surface-area`) | Yes | 0 | No | Yes, 2 diagnostic questions | 0 | 40% |
| Data Analysis and Graphs (`data-and-graphs`) | Yes | 0 | No | Yes, 3 diagnostic questions | 0 | 40% |
| Probability and Chance (`probability-and-chance`) | Yes | 0 | No | Yes, 2 diagnostic questions | 0 | 40% |

## Current Completion

Current completion is 51.1%.

Calculation:

- Total unit checklist points available: 9 units x 5 dimensions = 45.
- Completed checklist points: 23.
- `23 / 45 = 51.1%`.

Content-only progress is lower:

- Built units with lesson overrides: 2 of 9.
- Built lessons currently in catalogue: 12.
- Estimated complete lesson count: 54 if each unit averages 6 lessons.
- Content-only lesson progress: `12 / 54 = 22.2%`.

## Fully Complete Units

- Pythagoras' Theorem

Evidence:

- 6 catalogue lessons.
- Explicit override exported from `lib/lessons/year8/index.ts`.
- Full content in `lib/lessons/year8/pythagorasTheorem.ts`.
- Diagnostic coverage in `lib/diagnostics/year-8-mathematics.ts`.
- Seed dry-run prepares 114 rows for this unit.

## Partially Complete Units

- Algebra Foundations

Evidence:

- 6 catalogue lessons.
- Explicit override exported from `lib/lessons/year8/index.ts`.
- Full content in `lib/lessons/year8/algebraFoundations.ts`.
- Seed dry-run prepares 114 rows for this unit.
- Missing diagnostic coverage: the diagnostic still covers `algebra-equations`, not `algebra-foundations`.

## Placeholder Units

These units have catalogue entries and diagnostic questions, but no lesson list, no explicit lesson override, and no seedable lesson questions:

- Number Operations and Properties
- Algebra and Equations
- Linear Relationships
- Geometric Properties and Reasoning
- Volume and Surface Area
- Data Analysis and Graphs
- Probability and Chance

## Diagnostic Notes

The diagnostic has coverage for 8 of the 9 Year 8 catalogue units:

- Covered: `number-operations`, `algebra-equations`, `linear-relationships`, `pythagoras-theorem`, `geometry-properties`, `volume-and-surface-area`, `data-and-graphs`, `probability-and-chance`.
- Missing: `algebra-foundations`.

The main mismatch is algebra:

- `algebra-foundations` is the built unit with real lessons and 114 seedable questions.
- `algebra-equations` is diagnostic-covered but has no lessons or override content.

## Question Count Estimate

Current seedable Year 8 question-bank rows: 228.

Observed complete-lesson structure:

- 4 guided practice questions.
- 5 independent practice questions.
- 10 mastery quiz questions.
- 19 seedable questions per lesson.

Current built content:

- Algebra Foundations: 6 lessons x 19 = 114 questions.
- Pythagoras' Theorem: 6 lessons x 19 = 114 questions.
- Total current seedable rows: 228.

Estimated complete count:

- 9 planned units x 6 lessons per unit x 19 questions per lesson = 1,026 seedable questions.
- Remaining estimated build: 798 seedable questions.

Cross-check:

- Year 9 Mathematics and Year 10 Mathematics each currently have 53 catalogue lessons.
- A 53-lesson Year 8 course would contain 1,007 seedable questions.
- The 9-unit, 6-lessons-per-unit estimate is therefore consistent with nearby course density.

## Recommended Build Order

1. Fix algebra diagnostic alignment.
   Add `algebra-foundations` diagnostic coverage or merge/retire the empty `algebra-equations` unit. This is the highest-value cleanup because the built algebra content is currently not diagnostic-routed.

2. Number Operations and Properties.
   Build directed numbers, rational and irrational numbers, fractions, index notation, percentages, and financial contexts. This supports algebra and coordinate geometry fluency.

3. Linear Relationships.
   Build plotting, tables, gradient, intercepts, and `y = mx + b` after algebra foundations so graphing has enough symbolic support.

4. Volume and Surface Area.
   Build prisms, cylinders, composite solids, unit conversion, and formula selection. This directly supports Year 9 Prisms and Cylinders.

5. Geometric Properties and Reasoning.
   Build congruence, similarity, scale factors, and short geometric arguments after measurement foundations.

6. Data Analysis and Graphs.
   Build frequency tables, cumulative frequency, IQR, back-to-back plots, sampling, and display interpretation.

7. Probability and Chance.
   Build two-step experiments, arrays, tree diagrams, and expected outcomes.

8. Algebra and Equations.
   Build only if it remains a separate unit after the algebra slug decision. If `algebra-foundations` is intended to replace it, remove or consolidate this placeholder instead of creating overlapping algebra pathways.

## Audit Sources

- Planned units and lesson counts: `lib/newCourseCatalog.ts`
- Year 8 override exports and content: `lib/lessons/year8/*`
- Diagnostic counts: `lib/diagnostics/year-8-mathematics.ts`
- Seed-bank dry run: `npx.cmd tsx scripts/seed-question-bank.ts --course=year-8-mathematics --dry-run`
