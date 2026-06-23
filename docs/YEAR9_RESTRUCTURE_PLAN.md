# Year 9 Restructure — Architecture & Challenge-System Audit / Plan

**Status:** planning only. No code edits, no content authoring, no lesson moves, no migration
execution were performed to produce this document. Source of truth for target scope:
*CambridgeMATHS NSW Stage 5, Year 9* (Palmer et al. 2024, ISBN 978-1-009-40936-0), 10 chapters /
102 lettered sections.

This plan mirrors the approach already shipped for Year 10
([YEAR10_ADVANCED_RESTRUCTURE_PLAN.md](YEAR10_ADVANCED_RESTRUCTURE_PLAN.md), ADR-Y10-001) and
Year 12 Standard 1. The headline recommendation is: **migrate Year 9 to the existing pathTag
architecture first, decide the challenge architecture up front, then author chapter-by-chapter so
each wave ships base practice + D5/D6 pools together** — avoiding a Year-10-sized authoring run
followed by a separate challenge bolt-on.

---

## 1. Current Architecture Audit (as-is)

Year 9 is still on the **legacy three-course architecture** — it has **not** been migrated to the
single tagged base + derivation model that Year 10 now uses.

| Course slug | Units | Lessons | Status | pathTag | checkpoints | stableSkillId | masteryQuizPool | challenge coverage |
|---|---|---|---|---|---|---|---|---|
| `year-9-mathematics` (base) | 10 | 60 | **hidden** | none (0/60) | 0 | 0 | 0 | 1 lesson |
| `year-9-mathematics-core` | 11 | 61 | in_progress | none | 0 | 0 | 0 | 1 lesson |
| `year-9-mathematics-advanced` | 15 | 73 | in_progress | none | 0 | 0 | 0 | 1 lesson |

Current base units: geometrical-representations, working-with-triangles, prisms-and-cylinders,
index-laws, algebraic-techniques, equations, financial-mathematics, constant-rates-of-change,
making-predictions, making-decisions. (Core/Advanced carry overlapping but separately-maintained
unit lists — the duplication the pathTag model exists to remove.)

**Key findings**

- **No pathTag usage at all.** The three courses are hand-maintained parallel lists, so Core/Base/
  Advanced parity is manual and drift-prone. This is the single biggest structural gap.
- **No Skill Map / checkpoint wiring.** Unlike Year 10 trig (17 `stableCheckpointId` + 12
  `stableSkillId`), Year 9 has **zero** checkpoints or stable skill IDs. So there is nothing to
  *preserve* — the relevant decision is whether to *introduce* a checkpoint set (see §7, decision).
- **No difficulty pools.** No lesson carries a `masteryQuizPool`, so there is no D5 extension tier
  anywhere in Year 9 today.
- **Challenge coverage is effectively nil** — one inherited `simple-interest` key (3 D6 questions)
  shared from the Year 11 Standard registry; no Year-9-specific challenges.
- **Diagnostics exist** for all three courses (`lib/diagnostics/year-9-mathematics{,-core,-advanced}.ts`)
  and will need remapping to the new unit/lesson slugs (the Year 10 Wave 0 pattern).
- Unit naming does **not** match the Cambridge chapter structure, so a remap (not just a retag) is
  required.

---

## 2. Scope Map — Cambridge Year 9 → platform

The Cambridge book already tags every section **Consolidating / Core / Path / Extending**, which is
exactly the `PathTag` vocabulary the platform uses. Mapping is therefore 1:1 with **no
re-interpretation** required, beyond one unmarked section (7G, see note).

Proposed 10 units (one per chapter; slugs follow Year 10 conventions):

| # | Chapter (strand) | Proposed unit slug | Sections | Consol | Core | Path | Ext |
|---|---|---|---|---|---|---|---|
| 1 | Computation & financial maths (Algebra) | `computation-financial-maths` | 1A–1M (13) | 7 | 6 | 0 | 0 |
| 2 | Expressions, equations & inequalities (Algebra) | `expressions-equations-inequalities` | 2A–2L (12) | 2 | 5 | 5 | 0 |
| 3 | Right-angled triangles: Pythagoras & trig (Meas/Alg) | `pythagoras-trigonometry` | 3A–3J (10) | 3 | 6 | 1 | 0 |
| 4 | Linear relationships (Algebra) | `linear-relationships` | 4A–4K (11) | 1 | 6 | 4 | 0 |
| 5 | Length, area, surface area & volume (Meas/Number) | `length-area-surface-area-volume` | 5A–5H (8) | 3 | 4 | 1 | 0 |
| 6 | Indices and surds (Algebra) | `indices-surds` | 6A–6I (9) | 0 | 5 | 4 | 0 |
| 7 | Properties of geometrical figures (Space) | `properties-geometrical-figures` | 7A–7H (8) | 2 | 2 | 4 | 0 |
| 8 | Quadratic expressions & algebraic techniques (Algebra) | `quadratic-expressions-algebraic-techniques` | 8A–8K (11) | 0 | 0 | 11 | 0 |
| 9 | Probability & single-variable data analysis (Statistics) | `probability-data-analysis` | 9A–9L (12) | 3 | 5 | 3 | 1 |
| 10 | Quadratic equations & graphs of parabolas (Algebra) | `quadratic-equations-parabolas` | 10A–10H (8) | 0 | 0 | 8 | 0 |
| | **Totals** | | **102** | **21** | **39** | **41** | **1** |

Note (7G): "Similar triangles" is untagged in the contents page; given 7F is Core and 7H ("Proving
and applying similar triangles") is Path, 7G is treated as **Core** here — flag for confirmation
against the chapter body.

### Derived pathway sizes (locked derivation: Core = core+consolidating, Base = core+path,
### Advanced = core+path+extending)

| Pathway | Composition | Lessons |
|---|---|---|
| **Core** | core (39) + consolidating (21) | **60** |
| **Base** (`year-9-mathematics`) | core (39) + path (41) | **80** |
| **Advanced** | core (39) + path (41) + extending (1) | **81** |
| Distinct authored sections | — | **102** |

Versus today (Core 61 / Base 60 / Advanced 73), the restructure mainly **adds Path breadth**
(Ch 8 = 11 Path, Ch 10 = 8 Path, plus Path sections in Ch 2/4/6/7), lifting Base 60 → 80 and
Advanced 73 → 81 while Core stays ~stable (61 → 60).

---

## 3. Challenge-System Analysis (discover & conform — do NOT invent)

The existing challenge architecture, as implemented:

- **Registry:** `lib/challenges/index.ts` — `REGISTRY: Record<lessonSlug, PracticeQuestion[]>`,
  exposed via `getChallengeQuestions(slug)` / `hasChallenge(slug)`. These are the **Level-6 (D6)**
  tier, kept *separate* from the lesson catalog so they are additive.
- **Unlock:** Skill Map V2 unlocks a lesson's challenge questions **after the student passes that
  lesson's mastery quiz**. Rendered and CAS-marked with the same practice card as ordinary
  practice.
- **Difficulty:** the seeder (`scripts/seed-question-bank.ts`) tags `challenge` section questions as
  **D6**; it also reads an optional **`masteryQuizPool`** on a lesson (a larger, difficulty-tagged
  pool the mastery quiz draws from) and **respects each pool question's authored difficulty**.

This gives two existing, seeder-aware slots that fit the requested numbers **without a new system**:

| Requested tier | Conform to existing structure | Where it lives | Seeder handling |
|---|---|---|---|
| **D5 extension pool — 10 / section** | `masteryQuizPool` entries authored at `difficulty: 5` | on the lesson override | already collected (`questionSections` → `masteryQuizPool`), authored difficulty respected |
| **D6 challenge pool — 12 / section** | `REGISTRY[lessonSlug]` entries | `lib/challenges/*` keyed by slug | already collected (`questionSections` → `challenge`), forced to D6 |

**Conformance plan (extend, don't redesign):**
1. Keep the registry-by-slug + post-mastery-unlock model exactly as is.
2. Per authored section: add a `masteryQuizPool` of **10 D5** items and register **12 D6** items
   under the lesson slug. No schema change, no new unlock path, no new marking path.
3. The Skill Map V2 unlock already gates on mastery pass — the larger pools simply give it more to
   draw from. (Optional, later: a dedicated "extension" surface; not required to ship.)

**Decision the brief calls out:** fix this architecture **before** the first authoring wave so each
wave produces base practice **+ D5 pool + D6 pool together**, rather than re-opening 102 sections
later to bolt on D5/D6.

---

## 4. PathTag / derivation design

Year 10 owns this in `lib/year10PathTags.ts` (PATH_TAG_FILTERS, `filterUnitsByPathTags`,
`derivePathwayUnits`, `assertPathTagTotality`, `year10LegacyUnitRedirect`). The `PathTag` type and
the three filters are **year-agnostic and identical** to what Year 9 needs.

**Recommendation:** generalise the Year 10 module into a shared `lib/pathTags.ts` (parameterised by
course family + a per-year legacy-redirect map), and have both Year 9 and Year 10 consume it —
rather than cloning a near-duplicate `year9PathTags.ts`. Capture this as **ADR-Y9-001** mirroring
ADR-Y10-001. Gates G6 (tag totality) and G7 (filter lock) carry over unchanged.

---

## 5. Authoring-volume estimate

Per section, the standard (matching the strict Year-10 `audit:lessons` gate) is **3 worked examples
+ 4 common mistakes + 4 guided + 5 independent + 10 mastery (= 19 practice questions)**. The
challenge expansion adds **10 D5 + 12 D6 = 22** per section.

| Work item | Per section | × 102 sections | Notes |
|---|---|---|---|
| Worked examples | 3 | 306 | — |
| Common mistakes | 4 | 408 | — |
| Base practice (4+5+10) | 19 | 1,938 | guided/independent/mastery |
| D5 extension pool | 10 | 1,020 | new `masteryQuizPool` tier |
| D6 challenge pool | 12 | 1,224 | new registry entries |
| **Total practice/challenge questions** | **41** | **≈ 4,182** | + 306 WE + 408 mistakes |

**Greenfield ceiling:** ~4,182 questions + 306 WE + 408 mistakes across 102 sections.

**Realistic net-new (with reuse), rough bands — to be firmed up by the Wave-0 port audit:**

- **Base practice (≈1,938 + WE/mistakes):** a large fraction is portable. The current Year 9
  courses already hold ~60–73 authored lessons that map onto Core/Consolidating sections, and there
  is strong topic overlap with the just-completed **Year 10** content (parabolas Ch 10, quadratic
  techniques Ch 8, surds Ch 6, trig Ch 3, probability/stats Ch 9, linear Ch 4) which can be adapted
  down a year. Estimate **~35–45 sections need from-scratch base authoring**; the rest are
  port/retag/adapt.
- **D5 + D6 pools (≈2,244):** **effectively all new** — current Year 9 challenge/pool coverage is
  nil. This is the dominant net-new cost and the reason to decide the challenge architecture before
  authoring.

So the realistic delta is roughly **"port ~60 sections + author ~40 sections of base practice +
author the full D5/D6 pools for all 102 sections."** Spread across ~10 chapter waves that is a
Year-10-scale program plus a challenge layer.

---

## 6. Migration / Wave Plan (proposal — do NOT implement yet)

Sequenced to front-load architecture and lock the challenge model before bulk authoring.

- **Wave 0 — PathTag foundation & skeleton (architecture only).** Shared `lib/pathTags.ts` +
  ADR-Y9-001; collapse the 3 courses to one tagged base; 10-unit / 102-section skeleton with hidden
  interim stubs (the Year 10 Wave 0 pattern); legacy unit/lesson redirects; diagnostics remap;
  **read-only production data audit** of existing Year 9 mastery/progress rows under old slugs
  (migration drafted, executed later only with explicit approval). Gates G1–G7 green except
  `audit:lessons` (red on the interim stubs, expected). **Port audit deliverable:** classify each
  of the 102 sections as port / adapt-from-Y10 / author-new.
- **Wave 1 — Challenge-System Integration.** Extend (not replace) the registry + `masteryQuizPool`
  path; wire the D5(10)/D6(12) slots; add an `audit:challenges`-style check (coverage + difficulty +
  markability) so every later wave is held to "base + D5 + D6 shipped together." No bulk content.
- **Waves 2–11 — Chapter authoring (one chapter per wave).** Each wave authors a chapter's sections
  to the full standard **including** its D5/D6 pools, flips the stubs visible with true pathTags,
  and must leave `audit:lessons` failing only on not-yet-authored stubs (0 non-stub), audit:questions
  at baseline, marking/mastery green. Suggested order (self-contained / high-reuse first): Ch 1
  (finance), Ch 6 (indices/surds), Ch 3 (Pythagoras/trig), Ch 4 (linear), Ch 5 (measurement),
  Ch 2 (expressions/equations), Ch 9 (probability/stats), Ch 7 (geometry), Ch 8 (quadratic
  techniques), Ch 10 (parabolas).
- **Final — Release-readiness audit** (the Year 10 closing-gate pattern): 0 stubs, audit green,
  pathTag totality, challenge coverage report, diagnostics continuity, redirect continuity, and the
  Supabase **seed + prune** runbook
  ([migrations/Y10-restructure-question-bank-seed.md](migrations/Y10-restructure-question-bank-seed.md)
  generalised to Year 9). Production migration executed here, with approval.

**Validation gates** carry over from Year 10: G1 core parity, G2 no generic-but-visible lesson,
G4 diagnostics resolve, G5 no visible generic stubs, G6 tag totality, G7 filter lock. **G3
(checkpoint immutability) is N/A for Year 9** — see §7.

---

## 7. Risks

| Risk | Notes / mitigation |
|---|---|
| **Challenge unlock logic** | Reuse the existing post-mastery unlock unchanged; do not fork it. Add an audit for "challenge present but lesson missing mastery quiz." |
| **Markability** | D5/D6 must use markable answer forms (typed numeric / MCQ), per the Year-10 lesson. Bake into the `audit:challenges` check. |
| **D5/D6 difficulty calibration** | The seeder forces D6 for `challenge` and respects authored difficulty for the pool — so D5 items **must** be authored with `difficulty: 5` explicitly, or they mis-tier. Calibration agent (P3) could spot-check. |
| **pathTag correctness** | One unmarked section (7G) and any body-vs-contents tag drift; confirm against chapter bodies during Wave 0. G6 totality assert catches missing tags. |
| **Core parity** | Moving from hand-maintained triple-course to derivation will shift Core 61 → 60; confirm intended (it is, per the scope) and lock with G1. |
| **Checkpoint preservation → creation** | Year 9 has **no** checkpoints today, so nothing breaks — but if Skill Map checkpoints are wanted for Year 9, that is **new design** (decision point), not a port. Recommend deciding in Wave 0 whether Year 9 ships with checkpoints or defers them. |
| **Challenge volume** | ~2,244 D5/D6 questions is the bulk of the work; if that is too much up front, scope D5/D6 to Core+Path sections first (skip pure Consolidating) to cut ~21 sections of pools. |
| **Performance / bundle size** | ~4k+ questions added to the runtime catalog bundle. Year 10 already pushed the catalog up; measure bundle impact in Wave 0 and consider lazy-loading challenge pools if needed. |
| **Student experience** | Hidden-stub interim model keeps the live course clean during authoring (no visible placeholders); keep `year-9-mathematics` `hidden` until the release-readiness audit passes. |

---

## 8. Recommendation

**Proceed — architecture first.** Verdict: **B (ready to start, with limitations)** for *beginning*
the program; not yet ready to author until two Wave-0 inputs land: (a) the **port-vs-author audit**
of the 102 sections, and (b) the **challenge architecture decision** (confirm D5→`masteryQuizPool`,
D6→registry; confirm whether Year 9 gets checkpoints).

Concretely:
1. Approve ADR-Y9-001 + shared `lib/pathTags.ts` generalisation.
2. Run Wave 0 (skeleton + redirects + diagnostics remap + read-only production data audit + port
   audit). No content.
3. Run the Challenge-System Integration wave (extend existing registry/pool; add the audit) so the
   D5(10)/D6(12) contract is enforced from the first content wave.
4. Author chapter-by-chapter, each wave shipping base + D5 + D6 together, gated exactly like Year 10.
5. Close with a release-readiness audit + seed/prune.

This reuses essentially all of the Year 10 machinery (pathTag derivation, strict `audit:lessons`,
seed/prune, hidden-stub interim model, wave+PR cadence) and conforms to the existing challenge
system rather than inventing one — which is the explicit constraint.

---

*Planning artefact only. Nothing in this document has been implemented; no code, content, or data
has been changed.*
