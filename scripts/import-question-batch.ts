import { createClient } from "@supabase/supabase-js";
import * as path from "path";
import {
  loadQuestionBatchFile,
  validateQuestionBatch,
  type QuestionBatchRecord,
  type RecordResult,
} from "./validate-question-batch";

type QuestionRow = {
  source_id: string;
  topic_slug: string;
  subtopic_slug: string;
  year_level: string;
  course_slug: string;
  difficulty: number;
  question_type: "conceptual" | "procedural";
  prompt: string;
  latex: string | null;
  choices: { label: string; text: string }[] | null;
  answer: string;
  accepted_answers: string[];
  hint: string | null;
  explanation: string;
  syllabus_ref: string | null;
  transfer_from_topics: string[];
  is_active: boolean;
  diagram_data: Record<string, unknown> | null;
};

type ExistingQuestion = {
  id: string;
  source_id: string;
};

type ImportOptions = {
  filePath: string;
  dryRun: boolean;
};

function parseArgs(args: string[]): ImportOptions {
  if (args.includes("--write")) {
    throw new Error("--write is intentionally not implemented yet. This importer is dry-run only.");
  }

  const filePath = args.find((arg) => !arg.startsWith("--"));
  if (!filePath) {
    throw new Error(
      "No file path provided. Usage: npx tsx scripts/import-question-batch.ts <batch.json> [--dry-run]"
    );
  }

  return {
    filePath,
    dryRun: true,
  };
}

function hasIssues(result: RecordResult) {
  return result.issues.length > 0;
}

function isQuestionBatchRecord(record: unknown): record is QuestionBatchRecord {
  return typeof record === "object" && record !== null;
}

function mapRecordToQuestionRow(record: QuestionBatchRecord): QuestionRow {
  return {
    source_id: record.source_id,
    topic_slug: record.topic_slug,
    subtopic_slug: record.subtopic_slug,
    year_level: record.year_level,
    course_slug: record.course_slug,
    difficulty: record.difficulty,
    question_type: record.question_type as "conceptual" | "procedural",
    prompt: record.prompt,
    latex: record.latex ?? null,
    choices: record.choices ?? null,
    answer: record.answer,
    accepted_answers: record.accepted_answers ?? [],
    hint: record.hint ?? null,
    explanation: record.explanation,
    syllabus_ref: record.syllabus_ref ?? null,
    transfer_from_topics: record.transfer_from_topics ?? [],
    is_active: record.is_active ?? true,
    diagram_data: record.diagram_data ?? null,
  };
}

function increment(counts: Map<string, number>, key: string) {
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

function sortedEntries(counts: Map<string, number>) {
  return [...counts.entries()].sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
}

function buildBreakdown(rows: QuestionRow[]) {
  const courseTopicSubtopic = new Map<string, number>();
  const difficulty = new Map<string, number>();
  const questionType = new Map<string, number>();

  for (const row of rows) {
    increment(
      courseTopicSubtopic,
      `${row.course_slug}/${row.topic_slug}/${row.subtopic_slug}`
    );
    increment(difficulty, String(row.difficulty));
    increment(questionType, row.question_type);
  }

  return {
    courseTopicSubtopic,
    difficulty,
    questionType,
  };
}

async function findExistingQuestions(
  sourceIds: string[]
): Promise<{ existing: Map<string, ExistingQuestion>; note: string | null }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      existing: new Map(),
      note:
        "Skipped duplicate lookup: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.",
    };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const existing = new Map<string, ExistingQuestion>();

  for (let i = 0; i < sourceIds.length; i += 100) {
    const chunk = sourceIds.slice(i, i + 100);
    const { data, error } = await supabase
      .from("questions")
      .select("id, source_id")
      .in("source_id", chunk);

    if (error) {
      return {
        existing,
        note: `Duplicate lookup failed: ${error.message}`,
      };
    }

    for (const row of (data ?? []) as ExistingQuestion[]) {
      existing.set(row.source_id, row);
    }
  }

  return { existing, note: null };
}

function printCounts(title: string, counts: Map<string, number>) {
  console.log(title);
  if (counts.size === 0) {
    console.log("  None");
    return;
  }
  for (const [key, count] of sortedEntries(counts)) {
    console.log(`  ${key}: ${count}`);
  }
}

function printInvalidRecords(results: RecordResult[]) {
  const invalid = results.filter(hasIssues);
  if (invalid.length === 0) return;

  console.log("");
  console.log("Invalid records");
  for (const result of invalid) {
    const sourceId =
      typeof result.record?.source_id === "string"
        ? result.record.source_id
        : `[index ${result.index}]`;
    console.log(`  ${sourceId}`);
    for (const issue of result.issues) {
      console.log(`    ${issue.level.toUpperCase()}: ${issue.message}`);
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const resolved = path.resolve(options.filePath);
  const { batchId, records } = loadQuestionBatchFile(resolved);
  const results = validateQuestionBatch(records);
  const invalidResults = results.filter(hasIssues);
  const validRecords = results
    .filter((result) => !hasIssues(result) && isQuestionBatchRecord(result.record))
    .map((result) => result.record as QuestionBatchRecord);
  const rows = validRecords.map(mapRecordToQuestionRow);
  const sourceIds = rows.map((row) => row.source_id);
  const duplicateLookup = await findExistingQuestions(sourceIds);
  const duplicateSourceIds = new Set(duplicateLookup.existing.keys());
  const insertCandidates = rows.filter(
    (row) => !duplicateSourceIds.has(row.source_id)
  );
  const updateCandidates = rows.filter((row) =>
    duplicateSourceIds.has(row.source_id)
  );
  const breakdown = buildBreakdown(rows);

  console.log("Question batch import dry run");
  console.log(`  File: ${path.basename(resolved)}`);
  console.log(`  Batch: ${batchId}`);
  console.log(`  Mode: dry-run only`);
  console.log("");
  console.log("Summary");
  console.log(`  Total records: ${records.length}`);
  console.log(`  Valid records: ${rows.length}`);
  console.log(`  Invalid records: ${invalidResults.length}`);
  console.log(`  Insert candidates: ${insertCandidates.length}`);
  console.log(`  Duplicate/update candidates: ${updateCandidates.length}`);
  if (duplicateLookup.note) {
    console.log(`  Duplicate lookup: ${duplicateLookup.note}`);
  }

  console.log("");
  printCounts("Course/topic/subtopic breakdown", breakdown.courseTopicSubtopic);
  console.log("");
  printCounts("Difficulty breakdown", breakdown.difficulty);
  console.log("");
  printCounts("Question type breakdown", breakdown.questionType);

  if (updateCandidates.length > 0) {
    console.log("");
    console.log("Duplicate/update candidates");
    for (const row of updateCandidates) {
      const existing = duplicateLookup.existing.get(row.source_id);
      console.log(`  ${row.source_id}${existing ? ` -> existing id ${existing.id}` : ""}`);
    }
  }

  printInvalidRecords(results);

  console.log("");
  console.log("Rows that would be inserted/updated");
  console.log(JSON.stringify(rows, null, 2));
  console.log("");
  console.log("Dry run complete. No Supabase writes performed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
