import { supabaseAdmin } from "../lib/supabaseAdmin";

const COURSE = "year-11-standard";

async function main() {
  const tables = [
    "mastery_events",
    "student_mastery",
    "student_mastery_history",
    "student_subtopic_mastery",
  ] as const;

  for (const t of tables) {
    const { count, error } = await supabaseAdmin
      .from(t as never)
      .delete({ count: "exact" })
      .eq("course_slug", COURSE);
    console.log(`${t}: ${error?.message ?? `deleted ${count} rows`}`);
  }
}

main().catch(console.error);
