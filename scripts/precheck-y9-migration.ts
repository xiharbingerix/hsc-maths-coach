// Year 9 legacy-row migration PRECHECK — READ-ONLY (SELECT only, no writes).
// Per-legacy-slug counts, target mapping coverage, and unique-key conflict detection
// (would a remap collide with an existing row under the target slug for the same user/course?).
//   npx tsx scripts/precheck-y9-migration.ts

import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

loadEnvConfig(process.cwd());

const Y9_COURSES = ["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"];

// Legacy unit/topic slug -> new Cambridge unit slug (from lib/year9PathTags.ts Y9_LEGACY_UNIT_TARGETS).
const MAP: Record<string, string> = {
  "geometrical-representations": "properties-geometrical-figures",
  "working-with-triangles": "pythagoras-trigonometry",
  "prisms-and-cylinders": "length-area-surface-area-volume",
  "index-laws": "indices-surds",
  "algebraic-techniques": "quadratic-expressions-algebraic-techniques",
  equations: "expressions-equations-inequalities",
  "financial-mathematics": "computation-financial-maths",
  "constant-rates-of-change": "linear-relationships",
  "making-predictions": "probability-data-analysis",
  "making-decisions": "probability-data-analysis",
  "numbers-of-any-magnitude": "indices-surds",
  "equations-b": "quadratic-equations-parabolas",
  "variation-rates": "linear-relationships",
  "simultaneous-equations": "expressions-equations-inequalities",
  "probability-b": "probability-data-analysis",
  "linear-relationships-c": "linear-relationships",
};
const LEGACY = Object.keys(MAP);

const TABLES: Array<{ table: string; slugCol: string }> = [
  { table: "lesson_progress", slugCol: "unit_slug" },
  { table: "mastery_events", slugCol: "topic_slug" },
  { table: "student_mastery", slugCol: "topic_slug" },
  { table: "student_subtopic_mastery", slugCol: "topic_slug" },
  { table: "student_mastery_history", slugCol: "topic_slug" },
];

function reqEnv(n: string) { const v = process.env[n]; if (!v) throw new Error(`Missing ${n}`); return v; }

async function main() {
  const supabase = createClient(reqEnv("NEXT_PUBLIC_SUPABASE_URL"), reqEnv("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false } });
  console.log("Year 9 migration PRECHECK (READ-ONLY)\n");
  let totalLegacy = 0, totalConflicts = 0, unmapped = 0;

  for (const { table, slugCol } of TABLES) {
    const { data, error } = await supabase
      .from(table)
      .select(`user_id, course_slug, ${slugCol}`)
      .in("course_slug", Y9_COURSES)
      .in(slugCol, LEGACY)
      .limit(100000);
    if (error) { console.log(`  ${table}: ERROR ${error.message}`); continue; }
    const rows = data ?? [];
    // existing target-slug rows (to detect collisions): fetch all rows whose slug is a known TARGET
    const targets = Array.from(new Set(Object.values(MAP)));
    const { data: existing } = await supabase
      .from(table)
      .select(`user_id, course_slug, ${slugCol}`)
      .in("course_slug", Y9_COURSES)
      .in(slugCol, targets)
      .limit(100000);
    const existingKeys = new Set((existing ?? []).map((r: any) => `${r.user_id}|${r.course_slug}|${r[slugCol]}`));

    const perSlug: Record<string, number> = {};
    let conflicts = 0;
    for (const r of rows as any[]) {
      const legacy = r[slugCol];
      perSlug[legacy] = (perSlug[legacy] ?? 0) + 1;
      const target = MAP[legacy];
      if (!target) { unmapped++; continue; }
      const key = `${r.user_id}|${r.course_slug}|${target}`;
      if (existingKeys.has(key)) conflicts++;
    }
    totalLegacy += rows.length; totalConflicts += conflicts;
    console.log(`  ${table} (${slugCol}): ${rows.length} legacy rows, ${conflicts} would-collide`);
    for (const [s, n] of Object.entries(perSlug).sort((a, b) => b[1] - a[1])) {
      console.log(`      ${s} -> ${MAP[s] ?? "??? UNMAPPED"}  (${n})`);
    }
  }
  console.log(`\nTOTAL legacy rows: ${totalLegacy} | unmapped: ${unmapped} | potential unique-key conflicts: ${totalConflicts}`);
  console.log("(Read-only. No data modified.)");
}
main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1); });
