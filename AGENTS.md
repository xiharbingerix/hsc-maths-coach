<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Course content is governed by MANDATORY quality standards

Nova Maths exists to make a top band (HSC **Band 6** at Stage 6) the *expected* outcome, not a lucky one. Every lesson must be complete in syllabus breadth, deep and conceptual in its teaching, and high enough in practice quality to leave no gap an exam could exploit. "Good enough to pass" is a failure.

**Before you author or edit ANY lesson content (`lib/lessons/**`, question batches, or seed data), you MUST read [`docs/CONTENT_QUALITY_STANDARD.md`](docs/CONTENT_QUALITY_STANDARD.md) and the standards it gates.** This is not optional and applies to every agent and developer. It defines the three non-negotiable gates and the Definition of Done:

1. **Breadth** — every NSW syllabus dot-point covered, under the correct syllabus code, wired into the live route.
2. **Teaching depth** — formulas derived not dropped; intuition before notation; the "why it works"; misconceptions dissolved in the narrative. See [`docs/FEYNMAN_TEACHING_STANDARD.md`](docs/FEYNMAN_TEACHING_STANDARD.md).
3. **Practice depth** — the 19-question spine **plus** a difficulty-ramped `masteryQuizPool` and **plus** HSC Section II-style `multiPartPractice` (both **required** at Stage 6), with genuine Band-6 / unfamiliar-context difficulty. See [`docs/PRACTICE_QUESTION_STANDARD.md`](docs/PRACTICE_QUESTION_STANDARD.md).

Do not mark a lesson or unit complete — in code, in `docs/COURSE_STRUCTURE_CHECKLIST.md`, or in a report to the user — until it passes the Definition-of-Done checklist in the quality standard. A unit declared in the catalog with zero wired lessons, content filed under the wrong syllabus code, or a Stage 6 lesson missing its pool or multi-part items is **not** complete, no matter how polished its other parts are.
