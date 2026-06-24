# Year 10 Restructure — Question-Bank Seed & Prune Runbook

**Why this exists:** the in-app lesson/practice path renders questions from the TS catalog at
runtime, but the **worksheets** feature pulls from the Supabase `questions` table. Catalog
content is NOT visible to worksheets until it is seeded. The Year 10 restructure (Waves 0–11,
PRs #8–#19, `main` tip `b451e4b`) added ~50 authored sections and renamed every unit slug, so
the question bank must be re-seeded and then pruned.

Run these **after** the restructure is on `main` (or after any future Y10 content/​slug change).

## Prerequisites

- On `main`, pulled to at least `b451e4b`.
- `.env.local` contains `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
  (the seed/prune scripts load `.env.local` automatically via `@next/env`).
- These write to **production Supabase**. Always dry-run first.

## 1. Preview the seed (no writes)

```bash
npm run seed:question-bank -- --course=year-10-mathematics --course=year-10-mathematics-core --course=year-10-mathematics-advanced --dry-run
```

Expected at time of writing: **~5,858** questions prepared
(advanced 2,451 / base 2,286 / core 1,121), **29 warnings** — all benign:

- legacy trig lessons (`trigonometric-ratios`, `finding-sides-trig`, `sine-rule`, `cosine-rule`,
  `bearings`, …) skipped because `seedQuestions: false` (catalogue-only by design; unchanged by
  the restructure);
- a few `duplicate source_id` on shared challenge questions (simple-interest, surds) — the seeder
  dedupes by `source_id` and keeps the first.

No authored restructure section is skipped (each appears at 19 questions = 4 guided + 5
independent + 10 mastery).

## 2. Apply the seed (writes)

```bash
npm run seed:question-bank -- --course=year-10-mathematics --course=year-10-mathematics-core --course=year-10-mathematics-advanced
```

The write is an **upsert on `source_id`** (`onConflict: source_id`) — idempotent, safe to re-run;
it inserts new questions and updates existing ones. It does **not** delete anything.

## 3. Preview the prune (no writes)

```bash
npm run prune:question-bank -- --dry-run
```

The slug renames (e.g. `linear-relationships → algebra-equations-linear-relationships`) leave the
**old rows orphaned** in the bank — the upsert does not remove them, so without a prune the
worksheets would pull stale duplicates under the old topic slugs.

`prune` rebuilds the full valid `source_id` set from the **current catalog across ALL supported
courses**, then flags active rows whose `source_id` the catalog no longer produces. Since only
Y10 changed this round, the stale list should be Y10 old-slug rows only — **eyeball the dry-run
output before applying.**

## 4. Apply the prune (writes)

```bash
npm run prune:question-bank
```

Prune **deactivates** stale rows (`is_active = false`) — reversible, nothing is deleted. The
worksheet UI filters on `is_active`, so stale topics disappear from worksheets immediately.

## Order matters

**Seed → prune.** Seeding first makes the new slugs valid; pruning second deactivates only the
genuinely orphaned old-slug rows.

## Notes / follow-ups

- Legacy trig lessons stay out of worksheets (they are `seedQuestions: false`). To include them,
  flip the flag and author/verify their question sets first — separate change.
- Level-6 **challenge** coverage for Y10 is sparse (2 lessons) and **diagnostics** breadth is
  optional — pre-existing backlog, not introduced by the restructure.
- Re-run this whole runbook after any future Y10 authoring wave or unit-slug change.
