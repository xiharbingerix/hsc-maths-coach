/**
 * Rebuild student_subtopic_mastery by replaying all mastery_events
 * chronologically for every (user, course, topic, subtopic) combination.
 *
 * Each subtopic starts at score = 0 and applies the same EMA formula used
 * in lib/mastery/updateMastery.ts — the final state is upserted, replacing
 * any stale values that existed before this script ran.
 *
 * Usage:
 *   npx tsx scripts/backfill-subtopic-mastery.ts --dry-run
 *   npx tsx scripts/backfill-subtopic-mastery.ts --batch-size=100
 *
 * Flags:
 *   --dry-run         Compute scores but do not write to the database.
 *   --batch-size=N    Users per batch (default: 50).
 *   --help            Print usage and exit.
 */

import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

loadEnvConfig(process.cwd());

// ── EMA constants — must stay in sync with lib/mastery/updateMastery.ts ──────
//
// If you change these values in updateMastery.ts you must update them here too,
// then re-run the backfill to keep historical data consistent.

const CORRECT_VALUES: Record<number, number> = {
  1: 40,
  2: 60,
  3: 80,
  4: 95,
  5: 100,
};

const INCORRECT_PENALTIES: Record<number, number> = {
  1: 15,
  2: 12,
  3: 8,
  4: 5,
  5: 5,
};

function applyEvent(
  currentScore: number,
  difficulty: number,
  isCorrect: boolean
): number {
  const eventValue = isCorrect
    ? (CORRECT_VALUES[difficulty] ?? 60)
    : Math.max(0, currentScore - (INCORRECT_PENALTIES[difficulty] ?? 5));
  const raw = currentScore * 0.75 + eventValue * 0.25;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

// ── CLI ───────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes("--help")) {
  console.log(`
Usage: npx tsx scripts/backfill-subtopic-mastery.ts [options]

Options:
  --dry-run         Compute scores without writing to the database.
  --batch-size=N    Users processed per batch. Default: 50.
  --help            Show this message.
  `);
  process.exit(0);
}

const DRY_RUN = args.includes("--dry-run");
const batchSizeArg = args.find((a) => a.startsWith("--batch-size="));
const BATCH_SIZE = batchSizeArg ? parseInt(batchSizeArg.split("=")[1], 10) : 50;

if (Number.isNaN(BATCH_SIZE) || BATCH_SIZE < 1) {
  console.error("--batch-size must be a positive integer");
  process.exit(1);
}

// ── Supabase (service role — bypasses RLS, required for writes) ───────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("Missing env var: NEXT_PUBLIC_SUPABASE_URL");
  process.exit(1);
}
if (!serviceRoleKey) {
  console.error("Missing env var: SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const db = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// ── Types ─────────────────────────────────────────────────────────────────────

type EventRow = {
  user_id: string;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  difficulty: number;
  is_correct: boolean;
  created_at: string;
};

type SubtopicState = {
  user_id: string;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  score: number;
  attempt_count: number;
  correct_count: number;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function log(msg: string): void {
  const ts = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`[${ts}] ${msg}`);
}

/**
 * Paginate mastery_events to collect all distinct user IDs that have at least
 * one event with a subtopic_slug. Supabase returns at most 1000 rows per
 * request, so we page until the last page is partial.
 */
async function fetchDistinctUserIds(): Promise<string[]> {
  const PAGE = 1000;
  const seen = new Set<string>();
  let from = 0;

  while (true) {
    const { data, error } = await db
      .from("mastery_events")
      .select("user_id")
      .not("subtopic_slug", "is", null)
      .range(from, from + PAGE - 1);

    if (error) throw new Error(`user_id fetch failed: ${error.message}`);

    for (const row of data as { user_id: string }[]) seen.add(row.user_id);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  return [...seen];
}

/**
 * Fetch all subtopic events for a set of users, oldest first, paginated.
 * Chronological order is critical — EMA is path-dependent.
 */
async function fetchEventsForUsers(userIds: string[]): Promise<EventRow[]> {
  const PAGE = 1000;
  const results: EventRow[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await db
      .from("mastery_events")
      .select(
        "user_id,course_slug,topic_slug,subtopic_slug,difficulty,is_correct,created_at"
      )
      .in("user_id", userIds)
      .not("subtopic_slug", "is", null)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);

    if (error) throw new Error(`event fetch failed: ${error.message}`);

    results.push(...(data as EventRow[]));
    if (data.length < PAGE) break;
    from += PAGE;
  }

  return results;
}

/**
 * Replay events in arrival order and accumulate EMA state per subtopic.
 * Every subtopic starts from score = 0 so this is a full rebuild, not an
 * incremental update.
 */
function replayEvents(events: EventRow[]): SubtopicState[] {
  const map = new Map<string, SubtopicState>();

  for (const ev of events) {
    const key = `${ev.user_id}::${ev.course_slug}::${ev.topic_slug}::${ev.subtopic_slug}`;

    if (!map.has(key)) {
      map.set(key, {
        user_id: ev.user_id,
        course_slug: ev.course_slug,
        topic_slug: ev.topic_slug,
        subtopic_slug: ev.subtopic_slug,
        score: 0,
        attempt_count: 0,
        correct_count: 0,
      });
    }

    const s = map.get(key)!;
    s.score = applyEvent(s.score, ev.difficulty, ev.is_correct);
    s.attempt_count += 1;
    if (ev.is_correct) s.correct_count += 1;
  }

  return [...map.values()];
}

/**
 * Upsert computed states in chunks of 500 rows. Uses the UNIQUE constraint
 * (user_id, course_slug, topic_slug, subtopic_slug) for conflict resolution,
 * fully overwriting any previous values.
 */
async function upsertStates(states: SubtopicState[]): Promise<void> {
  const CHUNK = 500;

  for (let i = 0; i < states.length; i += CHUNK) {
    const rows = states.slice(i, i + CHUNK).map((s) => ({
      user_id: s.user_id,
      course_slug: s.course_slug,
      topic_slug: s.topic_slug,
      subtopic_slug: s.subtopic_slug,
      mastery_score: s.score,
      attempt_count: s.attempt_count,
      correct_count: s.correct_count,
      last_updated: new Date().toISOString(),
    }));

    const { error } = await db
      .from("student_subtopic_mastery")
      .upsert(rows, { onConflict: "user_id,course_slug,topic_slug,subtopic_slug" });

    if (error) {
      throw new Error(`upsert failed: ${error.message}`);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const wallStart = Date.now();

  console.log("━".repeat(62));
  console.log("  Backfill: student_subtopic_mastery");
  console.log("━".repeat(62));
  log(`mode        : ${DRY_RUN ? "DRY RUN — no writes" : "LIVE — will write to database"}`);
  log(`batch size  : ${BATCH_SIZE} users per batch`);
  console.log();

  // 1 — collect users that have at least one subtopic event.
  log("Collecting distinct users with subtopic events…");
  const allUserIds = await fetchDistinctUserIds();

  if (allUserIds.length === 0) {
    log("No mastery_events with a subtopic_slug found. Nothing to backfill.");
    return;
  }

  const totalBatches = Math.ceil(allUserIds.length / BATCH_SIZE);
  log(`Found ${allUserIds.length} user(s) across ${totalBatches} batch(es).`);
  console.log();

  let totalEvents = 0;
  let totalRows = 0;

  // 2 — process users in batches.
  for (let i = 0; i < allUserIds.length; i += BATCH_SIZE) {
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const batchIds = allUserIds.slice(i, i + BATCH_SIZE);
    const batchStart = Date.now();

    log(`Batch ${batchNum}/${totalBatches} — ${batchIds.length} user(s)`);

    const events = await fetchEventsForUsers(batchIds);

    if (events.length === 0) {
      log("  No subtopic events in this batch. Skipping.");
      continue;
    }

    totalEvents += events.length;

    const states = replayEvents(events);
    totalRows += states.length;

    log(`  ${events.length} event(s) → ${states.length} subtopic row(s)`);

    if (DRY_RUN) {
      const sample = states.slice(0, 3);
      for (const s of sample) {
        log(
          `  [dry] ${s.user_id.slice(0, 8)}… ` +
          `${s.course_slug}/${s.topic_slug}/${s.subtopic_slug} ` +
          `score=${s.score} attempts=${s.attempt_count} correct=${s.correct_count}`
        );
      }
      if (states.length > 3) {
        log(`  [dry] … and ${states.length - 3} more row(s) not shown`);
      }
    } else {
      await upsertStates(states);
      log(`  ✓ ${states.length} row(s) upserted`);
    }

    const batchMs = Date.now() - batchStart;
    log(`  Batch ${batchNum} completed in ${batchMs}ms`);
    console.log();
  }

  // 3 — summary.
  const totalMs = Date.now() - wallStart;
  const totalSec = (totalMs / 1000).toFixed(1);

  // Estimate production runtime: proportional to data size.
  const msPerRow = totalRows > 0 ? totalMs / totalRows : 0;
  const estimatedProd1kSec = ((msPerRow * 1000) / 1000).toFixed(1);
  const estimatedProd10kSec = ((msPerRow * 10000) / 1000).toFixed(1);

  console.log("━".repeat(62));
  log(`Events replayed : ${totalEvents}`);
  log(`Rows ${DRY_RUN ? "computed " : "written  "}: ${totalRows}`);
  log(`Wall time       : ${totalSec}s`);
  if (totalRows > 0) {
    log(`Throughput      : ~${Math.round(totalRows / (totalMs / 1000))} rows/s`);
    log(`Est. at 1k rows : ~${estimatedProd1kSec}s`);
    log(`Est. at 10k rows: ~${estimatedProd10kSec}s`);
  }
  console.log("━".repeat(62));

  if (DRY_RUN) {
    console.log(
      "\nDry run complete. Re-run without --dry-run to apply changes.\n"
    );
  } else {
    console.log(
      "\nBackfill complete. student_subtopic_mastery rebuilt from mastery_events.\n"
    );
  }
}

main().catch((err: unknown) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
