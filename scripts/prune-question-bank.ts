import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { createClient } from "@supabase/supabase-js";
import {
  SUPPORTED_COURSE_SLUGS,
  collectAllQuestions,
} from "./seed-question-bank";

/**
 * Reconcile the question bank with the current catalog.
 *
 * Older seed runs used different unit/topic taxonomies; their rows linger in the
 * `questions` table with `is_active = true`, so the worksheet generator shows
 * stale, duplicated topics. This script computes the source_ids the *current*
 * seed produces, then deactivates any active question (within supported courses)
 * whose source_id is no longer produced — i.e. orphaned by a catalog change.
 *
 * Deactivation (is_active = false) is reversible and is what the worksheet UI
 * filters on, so stale topics disappear without deleting any data.
 *
 *   npx tsx scripts/prune-question-bank.ts --dry-run   # report only
 *   npx tsx scripts/prune-question-bank.ts             # apply
 */

type ActiveRow = { id: string; source_id: string; course_slug: string; topic_slug: string };

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const supported = new Set<string>(SUPPORTED_COURSE_SLUGS);

  // 1. Source_ids the current seed would produce (the valid set).
  const { rows } = collectAllQuestions([...SUPPORTED_COURSE_SLUGS]);
  const validSourceIds = new Set(rows.map((row) => row.source_id));
  console.log(`Current catalog produces ${validSourceIds.size} valid source_ids.`);

  // 2. Fetch all active rows in supported courses from the DB.
  const supabase = createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } }
  );

  const active: ActiveRow[] = [];
  const batchSize = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("questions")
      .select("id, source_id, course_slug, topic_slug")
      .eq("is_active", true)
      .order("id")
      .range(from, from + batchSize - 1);
    if (error) throw new Error(`Could not read questions: ${error.message}`);
    const chunk = (data ?? []) as ActiveRow[];
    active.push(...chunk);
    if (chunk.length < batchSize) break;
    from += batchSize;
  }
  console.log(`Active questions in DB: ${active.length}`);

  // 3. Stale = active, in a supported course, whose source_id is no longer valid.
  const stale = active.filter(
    (row) => supported.has(row.course_slug) && !validSourceIds.has(row.source_id)
  );

  // Report by course/topic.
  const byCourseTopic = new Map<string, number>();
  for (const row of stale) {
    const key = `${row.course_slug} :: ${row.topic_slug}`;
    byCourseTopic.set(key, (byCourseTopic.get(key) ?? 0) + 1);
  }
  console.log(`\nStale active questions to deactivate: ${stale.length}`);
  for (const [key, count] of [...byCourseTopic.entries()].sort()) {
    console.log(`  ${key}: ${count}`);
  }

  if (stale.length === 0) {
    console.log("\nNothing to prune — the bank is in sync with the catalog.");
    return;
  }

  if (dryRun) {
    console.log("\nDry run only. No changes written.");
    return;
  }

  // 4. Deactivate in batches. Keep the id list per request small — a large
  // `in (...)` filter overflows PostgREST's request limit (Bad Request).
  let updated = 0;
  const updateBatch = 200;
  const ids = stale.map((row) => row.id);
  for (let i = 0; i < ids.length; i += updateBatch) {
    const slice = ids.slice(i, i + updateBatch);
    const { error } = await supabase
      .from("questions")
      .update({ is_active: false })
      .in("id", slice);
    if (error) throw new Error(`Could not deactivate questions: ${error.message}`);
    updated += slice.length;
  }
  console.log(`\nDeactivated ${updated} stale question(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
