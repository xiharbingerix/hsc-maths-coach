// Year 9 legacy-row migration — PRODUCTION WRITE (owner-approved).
// Remaps the unit_slug/topic_slug column of student progress/mastery rows on the 3 Year 9 courses
// from retired legacy unit/topic slugs to their new Cambridge unit slugs. Precheck
// (scripts/precheck-y9-migration.ts) confirmed: 121 rows, 0 unmapped, 0 unique-key conflicts.
//   npx tsx scripts/migrate-y9-legacy-rows.ts
// Idempotent: re-running finds 0 legacy rows.

import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

loadEnvConfig(process.cwd());

const Y9_COURSES = ["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"];

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
  console.log("Year 9 legacy-row MIGRATION (PRODUCTION WRITE)\n");
  let grandTotal = 0;

  for (const { table, slugCol } of TABLES) {
    let tableTotal = 0;
    for (const [legacy, target] of Object.entries(MAP)) {
      // update returns the affected rows when .select() is chained
      const { data, error } = await supabase
        .from(table)
        .update({ [slugCol]: target })
        .in("course_slug", Y9_COURSES)
        .eq(slugCol, legacy)
        .select("user_id");
      if (error) { console.log(`  ${table} [${legacy}]: ERROR ${error.message}`); continue; }
      const n = (data ?? []).length;
      if (n > 0) { tableTotal += n; console.log(`  ${table}: ${legacy} -> ${target}  (${n})`); }
    }
    console.log(`  ${table}: TOTAL updated = ${tableTotal}\n`);
    grandTotal += tableTotal;
  }
  console.log(`GRAND TOTAL rows remapped: ${grandTotal}`);
}
main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1); });
