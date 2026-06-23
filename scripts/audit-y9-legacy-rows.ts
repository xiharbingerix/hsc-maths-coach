// Year 9 Wave 0 — sub-step F: READ-ONLY production data audit.
//
// Counts how many rows of student progress/mastery/plans reference the LEGACY Year 9 unit/topic
// slugs (retired by the Wave 0 skeleton remap) so we can decide whether a data migration is needed
// before the Year 9 courses are un-hidden. SELECT/count only — performs NO writes and prints NO
// personal data (only row counts and distinct-user counts).
//
//   npx tsx scripts/audit-y9-legacy-rows.ts
//
// Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.

import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

loadEnvConfig(process.cwd());

const Y9_COURSES = [
  "year-9-mathematics",
  "year-9-mathematics-core",
  "year-9-mathematics-advanced",
];

// Legacy Year 9 unit / topic slugs retired by the Cambridge remap (now redirected).
const LEGACY_SLUGS = [
  "geometrical-representations", "working-with-triangles", "prisms-and-cylinders", "index-laws",
  "numbers-of-any-magnitude", "algebraic-techniques", "equations", "financial-mathematics",
  "constant-rates-of-change", "making-predictions", "making-decisions", "equations-b",
  "variation-rates", "simultaneous-equations", "probability-b", "linear-relationships-c",
];

// table -> the column holding the unit/topic slug
const TABLES: Array<{ table: string; slugCol: string }> = [
  { table: "lesson_progress", slugCol: "unit_slug" },
  { table: "mastery_events", slugCol: "topic_slug" },
  { table: "student_mastery", slugCol: "topic_slug" },
  { table: "student_subtopic_mastery", slugCol: "topic_slug" },
  { table: "student_mastery_history", slugCol: "topic_slug" },
  { table: "saved_lesson_plans", slugCol: "unit_slug" },
];

function reqEnv(n: string) {
  const v = process.env[n];
  if (!v) throw new Error(`Missing ${n} (set it in .env.local). Audit not run.`);
  return v;
}

async function main() {
  const supabase = createClient(reqEnv("NEXT_PUBLIC_SUPABASE_URL"), reqEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false },
  });

  console.log("Year 9 legacy-row audit (READ-ONLY)\n");
  let migrationNeeded = false;

  for (const { table, slugCol } of TABLES) {
    // total rows on the Y9 courses
    const total = await supabase.from(table).select("user_id", { count: "exact", head: true }).in("course_slug", Y9_COURSES);
    // rows still under a legacy unit/topic slug
    const legacy = await supabase
      .from(table)
      .select("user_id", { count: "exact", head: true })
      .in("course_slug", Y9_COURSES)
      .in(slugCol, LEGACY_SLUGS);

    if (total.error || legacy.error) {
      console.log(`  ${table}: ERROR ${(total.error || legacy.error)?.message}`);
      continue;
    }
    // distinct users touched (small fetch of just user_id under legacy slugs)
    const users = await supabase
      .from(table)
      .select("user_id")
      .in("course_slug", Y9_COURSES)
      .in(slugCol, LEGACY_SLUGS)
      .limit(100000);
    const distinctUsers = users.error ? "?" : new Set((users.data ?? []).map((r: { user_id: string }) => r.user_id)).size;

    const legacyCount = legacy.count ?? 0;
    if (legacyCount > 0) migrationNeeded = true;
    console.log(
      `  ${table}: Y9-course rows=${total.count ?? 0} | legacy-slug rows=${legacyCount} | distinct users (legacy)=${distinctUsers}`
    );
  }

  console.log("\nMigration necessity: " + (migrationNeeded ? "YES — legacy-slug rows exist; remap before un-hiding Y9." : "NO — no rows reference retired Year 9 slugs."));
  console.log("(Read-only audit. No data was modified.)");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
