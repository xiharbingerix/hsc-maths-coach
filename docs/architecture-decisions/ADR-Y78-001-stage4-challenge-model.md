# ADR-Y78-001 — Year 7 & 8 Stage-4 challenge model (D5/D6 uplift)

**Status:** Proposed (draft for review)
**Date:** 2026-06-24
**Related:** [[ADR-Y9-001]] (path-tag + challenge architecture), [[ADR-Y10-001]] (path-tag derivation), project-year7-8-realign

## Context

Year 7 and Year 8 were realigned (2026-06-18/19) to the user's skill-tree map and given full
Feynman teaching, mixed-difficulty mastery pools, and diagrams. They are **live** as **single
courses** (Y7 13 units/58 sections; Y8 12 units/57 sections) with **no pathway split** and **no D6
challenge layer**. Y9/Y10 subsequently shipped on the Cambridge layout with a 3-pathway split and the
D5 (`masteryQuizPool` 10@d5) + D6 (`lib/challenges` 12@d6) challenge model.

The goal is to bring Y7/Y8 onto the proven challenge model **without** disturbing their (deliberate)
structure. Two structural questions were decided up front (see Decision).

## Decision

1. **No re-chaptering.** Keep the skill-tree layout. The Cambridge Stage 4 books are a coverage
   reference only. Rationale: the realign was a deliberate, completed, live pedagogical design;
   Cambridge Y8 re-teaches Stage-4 foundations (the duplication the skill-tree map intentionally
   removed). Re-chaptering would reverse that for no clear learner benefit.

2. **Single course per year, not a 3-pathway split.** Stage 4 is un-streamed (unlike Stage 5.1/5.2/
   5.3). Differentiation is *within* the course via a light `consolidating | core | extending` tag.
   Rationale: a base/core/advanced split would impose Stage-5 streaming semantics where they don't
   exist pedagogically.

3. **Additive challenge model.**
   - **D6:** add a `lib/challenges` registry pool of **12 @ difficulty 6** per section, keyed
     `<course>/<lesson>` (single course → no cross-pathway dedup, unlike Y9/Y10).
   - **D5:** *(proposed)* rely on the existing mixed `masteryQuizPool` (already spans d1–d5) rather
     than authoring a separate 10@d5 tier. **OPEN** — may instead author dedicated D5 pools for full
     Y9/Y10 parity.
   - **stableSkillId + skillCheckpoints:** mint per section, namespaced `y7-`/`y8-` (consistent with
     the existing question-ID prefixes). Permanent once committed.

4. **No data migration; no un-hide.** Slugs are unchanged and courses stay live. The only production
   action is an additive **reseed** (+ Y7/Y8-scoped prune) after authoring.

## Consequences

- Lowest-risk of the three year-group programs: no migration, no go-live flip, content base reused.
- Y7/Y8 chapter layout will differ from Y9/Y10 (Cambridge) — an accepted inconsistency, justified by
  Stage 4 vs Stage 5 differences and the prior realign.
- Net-new authoring is dominated by **~1380 D6 questions** (115 × 12), plus IDs/tags/checkpoints.
- The D6 layer activates the Skill Map V2 adaptive challenge for Y7/Y8 (currently absent).

## Open questions

- D5 tier: reuse mixed pools (recommended) vs dedicated 10@d5.
- Tag source: Cambridge-mapped vs own-judgment.
- Wave granularity: 25 single-unit waves vs batched.
