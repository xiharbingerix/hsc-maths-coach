# Worksheet Acceptance Specification (the "harder" 50-minute paper)

Formalised from the differential-calculus pilot. Every topic's high-difficulty pool must
be able to generate a worksheet meeting this spec; the generation test is run **before**
each topic is committed.

## Target worksheet
- **Mode:** `harder` preset ([lib/worksheetGeneration.ts](../lib/worksheetGeneration.ts)).
  Multi-part questions are always eligible when they match the selected scope and difficulty.
- **Length:** 14 questions ≈ **50 minutes**.
- **Difficulty mix (harder/14):** D3×1, D4×3, D5×4, **D6×6** (scaled preset ratio 1:2:3:4).
- **Per-item time budget:** D3 ~2 min, D4 ~2.5, D5 ~3.5, D6 ~5. Flag any item >8 min.

## Acceptance criteria (worksheet sample)
A generated sample passes only if **all** hold:
1. **Difficulty distribution** matches the harder/14 target (±0 at D6: must reach ≥4 D6).
2. **Subtopic diversity:** ≥3 subtopics represented; ≤5 questions from any one subtopic
   (unless deliberately justified).
3. **Archetype diversity:** no more than **2** questions sharing the same core structure.
4. **Time realism:** total estimated time **45–55 min**.
5. **Markability:** every selected item auto-markable; no free-text/extraction/filler.
6. **Eligibility:** every selected item is seeded and eligible under the intended mode
   (no "authored but unseeded" items counted toward D6).
7. **Genuine difficulty:** D5/D6 items pass their domain richness gate
   ([HIGH_DIFFICULTY_DOMAIN_PLAYBOOKS.md](./HIGH_DIFFICULTY_DOMAIN_PLAYBOOKS.md)); D6 answers
   are hard to predict before setting up the full chain.

If a sample fails because the **selector** over-concentrates on one lesson/archetype
(not because questions are missing), fix the generation rule — do not just author more.

## Multipart policy
- D6 may be single-answer or multipart.
- Multipart D6 are always eligible and may be drawn whenever they match the selected
  course, unit, subtopic, and difficulty.
- Every multipart item must have a **non-empty top-level `answer`** (= part (a)'s answer)
  or the seeder silently skips it — see the Phase 0 seeder-bug fix.

## Replay-readiness definition (per topic)
A topic is **replay-ready** when repeated generation does not reuse the same items:
- **Single-answer D6 ≥ 6** (covers a harder draw without relying on multipart), and
- **D5 ≥ 8** (high-stakes senior) / **≥6** (normal senior) / **≥4** (junior),
- with **≤2 per archetype** so draws vary.

## Per-topic authoring → acceptance workflow
1. Author to the tiered target (8+8 / 6+6 / 4+4) using the domain playbook.
2. Per-item: 8-step self-check + independent solve.
3. `tsc` + `audit:lessons` + `git diff --check` + seeder dry-run (difficulty + no-skip proof).
4. Run the worksheet-generation test; confirm all acceptance criteria.
5. Supervisor sign-off → **user-authorised** commit → **user-authorised** seed.
6. Update the coverage matrix dashboard.
