# Year 7 & Year 8 — D5/D6 challenge-model uplift (PLANNING ONLY)

**Status:** Draft for review. No implementation yet.
**Decisions locked (2026-06-24):**
- **Layout:** Keep the current skill-tree layout. **No re-chaptering.** Y7 = 13 units / 58 lessons; Y8 = 12 units / 57 lessons stay exactly as they are live today (incl. Y8 as the Stage-4-finish + Stage-5 bridge).
- **Pathways:** **Single course each** (no `-core`/`-advanced`). Differentiate *within* the course via lightweight Consolidating/Core/Extending tags + the D5/D6 challenge layers. Reflects how Stage 4 is actually taught (un-streamed), unlike Stage 5.1/5.2/5.3.
- The CambridgeMATHS NSW Stage 4 books (Y7 11 ch / Y8 10 ch) are a **coverage reference**, not a target structure.

This is therefore a **purely additive** program. Because no slugs change and no courses split:
- **No legacy-data migration** (the Y9 migration pain does not recur here).
- **No un-hide** — Y7/Y8 are already live; the only production step is a **reseed** after authoring.

---

## 1. Current-state audit (verified on `main`, 2026-06-24)

| | Y7 | Y8 | Total |
| --- | --- | --- | --- |
| Course form | single (`in_progress`) | single (`available`) | — |
| Units / sections | 13 / 58 | 12 / 57 | 25 / **115** |
| Teaching + 3 WE (Feynman) | ✅ all | ✅ all | 115/115 |
| `masteryQuizPool` (mixed ~30, d1–d5) | ✅ all | ✅ all | 115/115 |
| Diagrams / renderer payloads | ✅ extensive | ✅ extensive | ~880 |
| Seeded & live in Supabase | ✅ | ✅ | ~5443 q |
| **D6 challenge-registry pool** | ~0 | ~0 | **1/115** |
| **stableSkillId** | 0 | 0 | **0/115** |
| **skillCheckpoints** | 0 | 0 | **0/115** |
| **pathTag / Cambridge tag** | 0 | 0 | **0/115** |

The content/teaching/practice base is **already strong** (the 2026-06-18/19 realign + depth-parity + diagram passes). The gaps are exactly the four "challenge-model" pieces Y9/Y10 have and Y7/Y8 lack.

## 2. What "the proven D5/D6 model" means here (assumptions to LOCK)

The Y9/Y10 ADRs define: **D5 = `masteryQuizPool` of exactly 10 @ difficulty 5**; **D6 = `lib/challenges` registry pool of 12 @ difficulty 6**. Y7/Y8 differ in one way: they already carry a **mixed-difficulty `masteryQuizPool` (~30, d1–d5)** that serves junior graded practice and should NOT be discarded.

Proposed conventions (★ = needs your confirmation):

- **D6 (firm):** add a `lib/challenges` registry pool of **12 @ difficulty 6** per section, course-scoped (`year-7-mathematics/<lesson>` / `year-8-mathematics/<lesson>`). This is the real gap — the Skill Map V2 adaptive challenge layer. **1380 new questions** (115 × 12).
- **★ D5 (decision):** two options —
  - **(a) Keep existing mixed pools as the mastery layer; treat their d5 subset as "D5."** No new D5 authoring. Lowest cost. Junior-appropriate.
  - **(b) Add a dedicated D5 extension tier (10 @ d5) per section** for full parity with Y9/Y10 (+1150 questions). More work; arguably overkill for Stage 4.
  - *Recommendation: (a)* — juniors already get graded d1–d5 practice; the meaningful new challenge is D6.
- **Tags (firm, light):** add a single `consolidating | core | extending` tag per section (mapped from Cambridge where the topic matches, else by judgment) for an in-course difficulty badge. No pathway derivation.
- **stableSkillId + skillCheckpoints (firm):** mint per section, namespaced **`y7-…` / `y8-…`** (note: question-ID prefixes `y7-`/`y8-` already exist; checkpoint IDs will reuse that namespace). Permanent once committed.

## 3. Port / Adapt / Net-new

- **PORT (0 rework):** all 115 sections' teaching, worked examples, practice spine, mixed mastery pools, and diagrams. Stay byte-stable.
- **ADAPT (light):** add tag + `stableSkillId` + `skillCheckpoints` to each section seed; register each section's D6 set in the challenge registry barrel/index.
- **NET-NEW (authoring bulk):**
  - **1380 D6 questions** (12 × 115), high-difficulty, unique ID prefixes per section to avoid bank-wide collisions (the Y9 lesson — each section gets its own prefix).
  - *(if D5 option (b))* 1150 D5 questions.
  - 115 stableSkillIds + 115 checkpoints.

## 4. Wave plan

- **Wave 0 — model wiring + pilot (1 unit).** Lock the D5 decision; add the tag/stableId/checkpoint fields to one unit's seeds; build that unit's D6 sets + registry wiring; establish the per-section ID-prefix scheme; full validation (tsc, audit:lessons, audit:questions baseline, marking, mastery) + a seed **dry-run** on that unit. Produces the repeatable recipe. Pilot candidate: **Y7 `integers`** (5 sections, self-contained).
- **Waves 1–13 — Year 7 units** (one unit per wave): integers ✓(pilot), fractions, algebraic-techniques, percentages, equations, indices, perimeter, area, angles, data, ratios-and-rates, volume, probability-and-chance.
- **Waves 14–25 — Year 8 units:** linear-relationships, pythagoras-theorem, geometry-angles, data-and-graphs, surface-area-of-solids, volume-of-composite-solids, introduction-to-networks, algebraic-techniques-stage5, index-laws-extension, indices-b, number-financial-mathematics, data-analysis-investigation.
- Each wave: author D6 (+tags/ids), wire registry, validate, commit, PR. Merge on your direct OK (same cadence as Y9).
- **Release wave:** after all units merged + audited → **reseed** `--course=year-7-mathematics --course=year-8-mathematics` then prune (Y7/Y8-scoped) → post-seed audit (counts, D6 resolves for all 115, no orphans) → done. No un-hide, no migration.

## 5. Validation gates (per wave + final)

`npx tsc --noEmit` · `npm test` · `npm run test:answer-marking` · `npm run test:mastery` · `npm run audit:lessons` (0 failures) · `npm run audit:questions` (hold the Y7/Y8 baseline — note the existing global 41 is year12's, untouched here). Final release-readiness: all 115 sections have D6=12 via registry; tags/stableIds/checkpoints present; Y9/Y10/Y12 unchanged; reseed dry-run clean.

## 6. Open decisions for you

1. **D5 tier:** option (a) rely on existing mixed pools *(recommended)*, or (b) author dedicated 10@d5 pools.
2. **Tag source:** map Consolidating/Core/Extending from the Cambridge books where topics align, vs. assign purely by our own difficulty judgment.
3. **Wave granularity:** one unit per wave (25 waves) as above, or batch 2–3 small units per wave to move faster.
