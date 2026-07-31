import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

loadEnvConfig(process.cwd());

type LiveRow = {
  source_id: string;
  topic_slug: string;
  subtopic_slug: string;
  difficulty: number;
  diagram_data: { type?: string } | null;
  choices: Array<{ label: string; text: string }> | null;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function difficultyCounts(rows: LiveRow[], levels: number[]) {
  return Object.fromEntries(
    levels.map((level) => [level, rows.filter((row) => row.difficulty === level).length]),
  );
}

async function main() {
  const db = createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
  const rows: LiveRow[] = [];

  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("source_id,topic_slug,subtopic_slug,difficulty,diagram_data,choices")
      .eq("course_slug", "year-11-advanced")
      .eq("is_active", true)
      .order("source_id")
      .range(from, from + 999);
    if (error) throw error;
    rows.push(...((data ?? []) as LiveRow[]));
    if ((data ?? []).length < 1000) break;
  }

  const continuousProbability = rows.filter(
    (row) => row.topic_slug === "continuous-probability",
  );
  const subtopics = [...new Set(continuousProbability.map((row) => row.subtopic_slug))].sort();
  const { count: inactiveContinuousProbability, error: inactiveError } = await db
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("course_slug", "year-11-advanced")
    .eq("topic_slug", "continuous-probability")
    .eq("is_active", false);
  if (inactiveError) throw inactiveError;

  const vennIds = new Set(["y11adv-pd-sets-qm10", "y11adv-pd-exam-qm10"]);
  const result = {
    active: rows.length,
    difficulty: difficultyCounts(rows, [1, 2, 3, 4, 5, 6]),
    visuals: rows.filter((row) => row.diagram_data).length,
    continuousProbability: {
      active: continuousProbability.length,
      inactive: inactiveContinuousProbability ?? 0,
      difficulty: difficultyCounts(continuousProbability, [1, 2, 3, 4, 5]),
      bySubtopic: Object.fromEntries(
        subtopics.map((subtopic) => [
          subtopic,
          continuousProbability.filter((row) => row.subtopic_slug === subtopic).length,
        ]),
      ),
      visuals: continuousProbability.filter((row) => row.diagram_data).length,
      retiredMasteryActive: continuousProbability.filter((row) => /-m\d+$/.test(row.source_id)).length,
    },
    finalVennPayloads: rows
      .filter((row) => vennIds.has(row.source_id))
      .map((row) => ({ sourceId: row.source_id, type: row.diagram_data?.type ?? null })),
    correctedChoicePayloads: rows
      .filter((row) => ["y11adv-poly-qm2", "y11adv-quad-qm6"].includes(row.source_id))
      .map((row) => ({ sourceId: row.source_id, choices: row.choices?.map((choice) => choice.text) })),
  };

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
