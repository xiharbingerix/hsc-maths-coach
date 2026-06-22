# ADR-Y10-001: Year 10 `pathTag` shared-base derivation

- **Status:** Accepted
- **Date:** 2026-06-22
- **Scope:** Year 10 course architecture (`year-10-mathematics`, `year-10-mathematics-advanced`, `year-10-mathematics-core`)
- **Related:** [YEAR10_ADVANCED_RESTRUCTURE_PLAN.md](../YEAR10_ADVANCED_RESTRUCTURE_PLAN.md) (implementation document)

---

## Context

The Year 10 restructure to the Cambridge **Year 10 & 10A** textbook layout (12 chapters, ~113 lettered sections tagged Core / Path / Extending / Consolidating) requires a decision on how the three Year 10 pathways should be sourced and derived. The following facts were established by code review:

- **Single base source.** `year-10-mathematics` (`lib/newCourseCatalog.ts:3986`, 10 units `algebraic-techniques`→`financial-mathematics`, ending ~`:4660`) is the single source of truth.
- **Base → Advanced/Core derivation.** Advanced is built verbatim from the base via `namespaceSkillMapIds(year10Base.units, "y10-", "y10a-")` (`:5363`). Core is the base run through `year10CoreTrimmedUnits` (`:5286-5362`) and then namespaced to `y10c-` (`:5364`).
- **Existing blacklist implementation.** The Core/Path distinction is already encoded **per lesson**, but as hardcoded slug blacklists annotated with NSW outcome codes (`:5291` `MA5-ALG-P-01 (Path)`, `:5298`, `:5305`, `:5312`). The concept of "this lesson is Path, not Core" already exists implicitly — it is simply not declarative.
- **Drift discovered.** The blacklists are already inconsistent with their own documentation: the Core-trim header comment (`:5288`) states Core trigonometry is "right-angled only (no sine/cosine rule, area, bearings)", but the actual filter (`:5327-5351`) **keeps** sine-rule, cosine-rule, area, and bearings (with a contradicting inline comment at `:5328`). The source of truth is already ambiguous at 10 units; this fragility scales with section count.
- **Shared override architecture.** Every `lib/lessons/year10/*.ts` lesson override gates on `["year-10-mathematics","year-10-mathematics-advanced","year-10-mathematics-core"].includes(course.slug)` + `unit.slug` + `lesson.slug`. Teaching/question content is physically shared across all three pathways today; there is no per-pathway content.
- **Checkpoint / progress constraints.** `namespaceSkillMapIds` transforms `stableSkillId`/`stableCheckpointId` prefixes `y10-` → `y10a-` / `y10c-`, so Advanced and Core progress are already independently namespaced. Only the `trigonometry` unit carries `stableSkillId`/`skillCheckpoints`. Renaming a checkpointed slug, or renaming/reusing a `stableCheckpointId` string, orphans student progress.
- **Difficulty is pathway-independent.** Per `QUESTION_AUTHORING_STANDARD.md:100`, difficulty (D1–D6) is calibrated on absolute cognitive demand, identical regardless of year level or pathway. Shared content therefore carries no difficulty-calibration downside.
- **Cambridge structure.** The textbook is a single book with each section tagged Core / Path / Extending — a structure that maps 1:1 onto a per-section tag rather than separate course trees.

Three options were assessed: **A** shared base + `pathTag` (tag-driven filtering), **B** standalone Advanced course decoupled from base, **C** hybrid (shared base for existing content + standalone Advanced-only units for large extensions).

## Decision

Adopt **Option A — shared base + `pathTag` + tag-driven derivation.**

- Add a declarative `pathTag` field to lesson sections (values: `core`, `path`, `extending`, `consolidating`), promoting the implicit Core/Path distinction that already exists in the blacklists.
- Replace the hardcoded `year10CoreTrimmedUnits` slug blacklists (`:5286-5362`) with tag-driven filtering over the shared base. Retain the existing `namespaceSkillMapIds` prefixing.

**Locked pathway filters:**

| Pathway | Tag filter |
|---|---|
| `year-10-mathematics-core` | `core` + `consolidating` |
| `year-10-mathematics` (base) | `core` + `path` |
| `year-10-mathematics-advanced` | `core` + `path` + `extending` |

B and C were rejected: both retain two sources of truth (shared base *and* a standalone Advanced tree), reintroducing the maintainability fragility this decision exists to remove. The only substantive argument for B/C — preventing Advanced-only content from polluting Core — is already fully satisfied by the Core tag filter, at lower cost and lower risk.

## Consequences

**Positive**
- Single, unambiguous source of truth for all three Year 10 pathways.
- Directly aligns the data model with the Cambridge Core/Path/Extending structure (1:1).
- Removes the blacklist drift (including the existing stale sine/cosine-rule comment) by making pathway membership declarative.
- Simplifies future restructuring: pathway changes are a tag edit, not slug-list surgery.
- Preserves the shared authoring model — one authored section legitimately serves base/Core/Advanced, consistent with pathway-independent difficulty.

**Negative**
- Shared-base blast radius: editing the base mutates base + Core + Advanced simultaneously.
- Requires strong validation gates to prevent silent cross-pathway regressions.
- Requires explicit `pathTag` tagging of every section (no untagged sections permitted).

## Mandatory Guardrails

- **G1 — Core-parity gate:** snapshot the *current* Core lesson set (from the blacklists) and assert the post-tag Core derivation is identical except for **intended** changes, which must be listed and signed off. No silent Core deltas.
- **G2 — Guard-map gate:** for every retained override, a mechanical check that its `unit.slug` guard equals the new unit slug, and no catalog section silently falls back to generic content unintentionally.
- **G3 — Checkpoint-immutability gate:** trig lesson slugs and all `stableCheckpointId` strings are append-only; never renamed or reused. New sections get fresh IDs.
- **G4 — Diagnostic-integrity gate:** diagnostics reference only live unit slugs; every link resolves.
- **G5 — No-generic-ship gate:** a section may ship only if it has an authored override OR is explicitly flagged interim; track authored vs generic coverage per wave.
- **G6 — Tag totality:** every section carries exactly one `pathTag`; build fails on a missing/invalid tag.
- **G7 — Three-filter lock:** the base/Core/Advanced tag filters are defined and committed before any unit is moved.

## Stop Conditions

- **S1:** G1 Core-parity shows any unexplained Core lesson added/dropped → stop until the tag filter is corrected and re-signed.
- **S2:** Any trig `stableCheckpointId`/slug change is detected (G3 violation) → roll back; progress integrity is non-negotiable.
- **S3:** Generic/interim sections exceed an agreed visible threshold on a shipped pathway (G5) → pause new structure work; either author or hide before continuing.
- **S4:** The three-pathway tag filter (G7) is not locked and signed off → do not begin moving units.
- **S5:** Override guard-map (G2) cannot be verified clean → stop; silent generic fallback is unacceptable.

## Wave 0 Prerequisite

Wave 0 (skeleton/remap, no net-new content) **may not begin until**:

- **G7 complete** — the base/Core/Advanced tag filters are defined and committed.
- **S4 cleared** — the three-pathway tag filter is locked and signed off.
