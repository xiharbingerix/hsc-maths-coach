# Year 10 Advanced Algebra — Parabolas Question Audit

**Audit date:** 28 July 2026
**Scope:** Introduction to parabolas; sketching parabolas; sketching by factorisation; sketching by completing the square.

## Final lesson summary

| Lesson | Questions | D1 | D2 | D3 | D4 | D5 | D6 | Visual question rows | MCQs with answer-choice diagrams | Visual worked examples | Seeded |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Introduction to parabolas | 19 | 9 | 7 | 3 | 0 | 0 | 0 | 6 | 1 | 3/3 | 19 |
| Sketching parabolas | 19 | 9 | 8 | 2 | 0 | 0 | 0 | 5 | 2 | 3/3 | 19 |
| Sketching by factorisation | 19 | 9 | 6 | 2 | 1 | 1 | 0 | 2 | 2 | 3/3 | 19 |
| Sketching by completing the square | 19 | 12 | 5 | 0 | 1 | 1 | 0 | 4 | 3 | 3/3 | 19 |
| **Total** | **76** | **39** | **26** | **7** | **2** | **2** | **0** | **17** | **8** | **12/12** | **76** |

“Visual question rows” includes top-level graphs or tables and questions whose answer choices contain graph payloads. The seeder's diagram count only reports top-level `diagram_data`; it does not count diagrams nested in MCQ choices or worked-example visuals.

## Remediation summary

- Reviewed all 76 guided, independent and mastery questions, plus every worked example. No separate challenge, multipart or topic-pool questions are linked to these lessons.
- Preserved sound questions and manually rewrote weak, repetitive or answer-leaking items.
- Reclassified every question by its actual cognitive demand. Removed unsupported positional high-tier labels, retained two genuine D4 reverse-reasoning tasks, and added two hand-written D5 synthesis tasks where the later lessons naturally support them. No D6 was assigned because these lessons do not support a synoptic, non-routine three-stage task naturally.
- The factorisation D5 combines an unknown integer-root product, an axis-derived root sum and vertex evaluation. The completing-square D5 requires interpreting a displayed parabola, transferring its axis and y-intercept to a different monic parabola, and reconstructing that parabola's minimum.
- Added diagram-first graph discrimination to eight MCQs, including diagrams inside the answer choices, so students select an actual curve rather than a verbal proxy for one.
- Added or refined coordinate graphs and one structured value table where they materially support the mathematics. All 12 worked examples now include a graph.
- Strengthened mastery questions around symmetry, roots, axes, vertex values, parameter inference and reverse construction.
- Corrected answers, accepted variants, hints and question-specific explanations. Every question and worked-step explanation is at least 40 characters.
- Confirmed typed-answer markability for all 38 typed questions using canonical answers and accepted variants. Representative natural inputs such as `\left(0,2\right)`, `x=-4, x=1`, `\frac{3}{2}`, `-\frac{49}{4}`, `x = -1` and `c=5` also mark correctly. All 38 remaining questions are markable MCQs.

## Validation

- TypeScript: `npx tsc --noEmit` passed.
- Question collector: 76 questions collected with zero lesson-specific warnings.
- Lesson auditor: zero scoped findings.
- Visual auditor: zero scoped missing-visual findings.
- Source question audit: zero findings in the changed Year 10 source files.
- Duplicate check: zero duplicate prompt-and-LaTeX pairs in scope.
- Explanation-length checks: zero question or worked-step explanations below 40 characters.
- Seed results:
  - Introduction to parabolas: 19 rows upserted, zero warnings.
  - Sketching parabolas: 19 rows upserted, zero warnings.
  - Sketching by factorisation: 19 rows upserted, zero warnings.
  - Sketching by completing the square: 19 rows upserted, zero warnings.

No commit, push or merge was performed.
