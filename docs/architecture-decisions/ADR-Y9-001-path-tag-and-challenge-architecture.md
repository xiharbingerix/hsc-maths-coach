# ADR-Y9-001: Year 9 `pathTag` derivation & challenge architecture

- **Status:** Accepted
- **Date:** 2026-06-23
- **Scope:** Year 9 course architecture (`year-9-mathematics`, `year-9-mathematics-advanced`, `year-9-mathematics-core`) and its challenge tiers (D5/D6)
- **Related:** [YEAR9_RESTRUCTURE_PLAN.md](../YEAR9_RESTRUCTURE_PLAN.md) (implementation document), [ADR-Y10-001](ADR-Y10-001-path-tag-derivation.md) (the architecture this conforms to)

---

## Context

The Year 9 restructure targets the *CambridgeMATHS NSW Stage 5, Year 9* layout (10 chapters / 102
lettered sections, already tagged **Consolidating / Core / Path / Extending**). Code review
established the as-is state:

- **Legacy three-course model.** `year-9-mathematics` (base, 10 units / 60 lessons, `hidden`),
  `year-9-mathematics-core` (11 / 61, `in_progress`), `year-9-mathematics-advanced` (15 / 73,
  `in_progress`) are **hand-maintained parallel lists**. None use `pathTag` (0 tagged lessons).
- **No Skill Map wiring.** Year 9 has **zero** `stableSkillId` and **zero** `skillCheckpoints` —
  there is nothing to preserve (contrast Year 10 trig: 17 checkpoints + 12 skill IDs).
- **No difficulty pools.** No lesson carries a `masteryQuizPool`; there is no D5 tier anywhere.
- **Challenge coverage ~nil.** One inherited `simple-interest` registry key; no Year-9 challenges.
- **Existing, year-agnostic challenge mechanics** (discovered, to be conformed to, not replaced):
  - `lib/challenges/index.ts` — `REGISTRY: Record<lessonSlug, PracticeQuestion[]>` →
    `getChallengeQuestions(slug)` / `hasChallenge(slug)`, the **D6 Level-6** tier, unlocked **after
    the lesson's mastery quiz is passed** (Skill Map V2), marked with the same practice card.
  - An optional **`masteryQuizPool`** on a lesson — a larger difficulty-tagged pool the mastery
    quiz draws from; the seeder (`scripts/seed-question-bank.ts`) collects it and **respects each
    pool question's authored difficulty**.
- **PathTag derivation already exists for Year 10** in `lib/year10PathTags.ts`
  (`PATH_TAG_FILTERS`, `filterUnitsByPathTags`, `derivePathwayUnits`, `assertPathTagTotality`,
  legacy-redirect map). The `PathTag` type and the three filters are year-agnostic.

This ADR locks the two decisions the [Year 9 plan](../YEAR9_RESTRUCTURE_PLAN.md) left open —
(1) the D5/D6 challenge architecture and (2) the checkpoint policy — so Wave 0 can begin.

## Decision 1 — pathTag derivation (conform to ADR-Y10-001)

Adopt the **shared base + `pathTag` + tag-driven derivation** model already accepted for Year 10.
Collapse the three Year 9 courses to a **single tagged base** and derive the pathways with the
**same locked filters**:

| Pathway | Tag filter |
|---|---|
| `year-9-mathematics-core` | `core` + `consolidating` |
| `year-9-mathematics` (base) | `core` + `path` |
| `year-9-mathematics-advanced` | `core` + `path` + `extending` |

**Implementation note (minimal change):** generalise `lib/year10PathTags.ts` into a shared,
course-family-parameterised module (e.g. `lib/pathTags.ts`) consumed by both Year 9 and Year 10,
each supplying its own legacy-redirect map. Do **not** clone a near-duplicate `year9PathTags.ts`.
The Cambridge Year 9 tags map 1:1: Consolidating→`consolidating`, Core→`core`, Path→`path`,
Extending→`extending`. Target distribution: **Consol 21 / Core 39 / Path 41 / Extending 1 = 102**,
deriving **Core 60 / Base 80 / Advanced 81**.

## Decision 2 — Challenge architecture (D5/D6): extend, do not invent

Conform to the existing mechanics. **No new challenge system.**

| Tier | Conforms to | Quantity (per authored subtopic) | Encoding | Unlock |
|---|---|---|---|---|
| **D5 extension pool** | lesson `masteryQuizPool` | **exactly 10** | every item authored `difficulty: 5` | drawn by the existing mastery-quiz pool path |
| **D6 challenge pool** | `lib/challenges` registry (`REGISTRY[lessonSlug]`) | **exactly 12** | authored as D6 challenge items | existing post-mastery unlock (Skill Map V2) |

- The seeder already collects both `masteryQuizPool` and `challenge` sections, so no seeding change
  is required. D5 items **must** carry `difficulty: 5` explicitly (the pool respects authored
  difficulty; the registry path forces D6).
- If a small schema helper is genuinely needed (e.g. a typed `masteryQuizPool` field on the Year 9
  lesson type, or a registry-coverage assertion), propose the **minimal** change only — no redesign
  of the unlock or marking paths.

## Decision 3 — Checkpoint policy: defer to authoring, permanent once minted

- **Do not create Year 9 checkpoints in Wave 0.** Year 9 has no `stableSkillId`/`stableCheckpointId`
  to preserve, checkpoint design should follow **final authored section boundaries**, and minting
  IDs during skeleton work risks meaningless anchors.
- **Lock policy:**
  - Wave 0 may create stable **lesson slugs** and **pathTags** only.
  - Authoring waves mint `stableSkillId` / `stableCheckpointId` **only when a section is fully
    authored and ready**.
  - Every checkpoint/skill ID is **permanent once committed** (append-only — never renamed, reused,
    deleted, or migrated), inheriting the Year 10 G3 guarantee from the moment it is introduced.

## Authoring-Wave Contract

Each **fully authored** Year 9 subtopic must ship, together, in the same wave:

1. standard lesson teaching (Feynman standard);
2. standard practice — 3 worked examples, 4 common mistakes, 4 guided, 5 independent, 10 mastery;
3. **10 D5 `masteryQuizPool` questions** (all `difficulty: 5`);
4. **12 D6 challenge questions** (registered under the lesson slug);
5. a true, final `pathTag`;
6. permanent stable IDs **iff** a checkpoint is introduced for that section.

This prevents a Year-10-sized base-authoring run followed by a separate D5/D6 bolt-on: base +
extension + challenge are one unit of work per subtopic.

## Consequences

**Positive**
- Single source of truth for all three Year 9 pathways (removes the hand-maintained triple list).
- Reuses Year 10 machinery wholesale (derivation, strict `audit:lessons`, seed/prune, hidden-stub
  interim model, wave+PR cadence) and the existing challenge mechanics — lowest-risk path.
- Challenge coverage is defined up front and enforced per wave by the authoring contract.

**Negative**
- Shared-base blast radius (editing the base mutates base + Core + Advanced) — mitigated by the
  Year 10 validation gates.
- ~2,244 D5/D6 questions is net-new authoring volume (see plan §5); may be scoped to Core+Path
  sections first if needed.
- Generalising the pathTag module touches Year 10's code path — must be a behaviour-preserving
  refactor verified against the current Year 10 derivation.

## Guardrails (inherited from ADR-Y10-001)

- **G1 Core-parity**, **G2 guard-map / no silent generic fallback**, **G4 diagnostic integrity**,
  **G5 no-generic-ship**, **G6 tag totality**, **G7 three-filter lock** — all carry over unchanged.
- **G3 (checkpoint immutability)** applies **from the point each Year 9 checkpoint is minted** (per
  Decision 3): there is nothing to preserve at Wave 0, but every ID is append-only once introduced.
- **New — G8 challenge contract:** a subtopic counts as "authored" only if it has exactly 10 D5
  `masteryQuizPool` items (all `difficulty: 5`) and exactly 12 D6 registry items; add an
  `audit:challenges`-style check in the Challenge-System Integration wave.

## Wave 0 Prerequisite

Wave 0 (skeleton/remap, no net-new content) may not begin until **G7** is complete (shared
base/Core/Advanced tag filters defined and committed) and this ADR is **Accepted** (it is).
Checkpoints, D5 pools, and D6 pools are **not** part of Wave 0 — they are minted/authored in the
content waves per the authoring contract above.
