import { createClient } from "@supabase/supabase-js";
import {
  getNewCourse,
  getNewCourseUnitLessons,
  newCoursePathways,
} from "../lib/newCourseCatalog";
import type { ExplicitLesson, PracticeQuestion } from "../lib/lessons/differentialCalculus";

type PracticeSection = "guidedPractice" | "independentPractice" | "masteryQuiz";

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
};

type QuestionMappingContext = {
  topicSlug: string;
  subtopicSlug: string;
  yearLevel: string;
  courseSlug: string;
  section?: PracticeSection;
  position?: number;
  syllabusRef?: string;
  transferFromTopics?: string[];
};

type ImportWarning = {
  sourceId: string;
  reason: string;
};

type ImportOptions = {
  courseSlug: string;
  dryRun: boolean;
};

const PLACEHOLDER_PATTERNS = [
  /TODO/i,
  /lorem ipsum/i,
  /placeholder lesson/i,
  /generated fallback/i,
  /sample question/i,
];

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseArgs(args: string[]): ImportOptions {
  const courseArg = args.find((arg) => arg.startsWith("--course="));
  return {
    courseSlug: courseArg?.replace("--course=", "") || "year-9-mathematics",
    dryRun: args.includes("--dry-run"),
  };
}

function containsPlaceholderText(question: PracticeQuestion) {
  const text = [
    question.id,
    question.prompt,
    question.latex,
    question.answer,
    question.hint,
    question.explanation,
  ]
    .filter(Boolean)
    .join(" ");

  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(text));
}

function isRealQuestion(question: PracticeQuestion) {
  return Boolean(
    question.id &&
      question.prompt &&
      question.answer &&
      !containsPlaceholderText(question)
  );
}

export function normaliseChoices(question: PracticeQuestion) {
  if (!question.choices?.length) {
    return null;
  }

  return question.choices.map((choice) => ({
    label: choice.label,
    text: choice.text,
  }));
}

export function inferDifficulty(
  question: PracticeQuestion,
  section: PracticeSection = "guidedPractice",
  position = 0
) {
  const prompt = `${question.prompt} ${question.latex}`.toLowerCase();

  if (section === "guidedPractice") {
    return question.choices?.length ? 1 : 2;
  }

  if (section === "independentPractice") {
    return position >= 3 ? 3 : 2;
  }

  if (
    prompt.includes("exam") ||
    prompt.includes("prove") ||
    prompt.includes("projection") ||
    position >= 7
  ) {
    return 5;
  }

  if (position >= 4) {
    return 4;
  }

  return 3;
}

export function mapPracticeQuestionToQuestionRow(
  question: PracticeQuestion,
  context: QuestionMappingContext
): QuestionRow {
  const section = context.section ?? "guidedPractice";
  const position = context.position ?? 0;

  return {
    source_id: question.id,
    topic_slug: context.topicSlug,
    subtopic_slug: context.subtopicSlug,
    year_level: context.yearLevel,
    course_slug: context.courseSlug,
    difficulty: inferDifficulty(question, section, position),
    question_type: question.choices?.length ? "conceptual" : "procedural",
    prompt: question.prompt,
    latex: question.latex || null,
    choices: normaliseChoices(question),
    answer: question.answer,
    accepted_answers: question.acceptedAnswers ?? [],
    hint: question.hint ?? null,
    explanation:
      question.explanation ??
      "Review the worked method and compare each step with the expected answer.",
    syllabus_ref: context.syllabusRef ?? null,
    transfer_from_topics: context.transferFromTopics ?? [],
    is_active: true,
  };
}

function questionSections(lesson: ExplicitLesson) {
  return [
    ["guidedPractice", lesson.guidedPractice],
    ["independentPractice", lesson.independentPractice],
    ["masteryQuiz", lesson.masteryQuiz],
  ] as const;
}

function collectQuestionsFromCourse(courseSlug: string) {
  const course = getNewCourse(courseSlug);
  const rows: QuestionRow[] = [];
  const warnings: ImportWarning[] = [];

  if (!course) {
    throw new Error(
      `Unknown course slug "${courseSlug}". Available courses: ${newCoursePathways
        .map((item) => item.slug)
        .join(", ")}`
    );
  }

  for (const unit of course.units) {
    if (unit.lessons.length === 0) continue;

    const lessons = getNewCourseUnitLessons(course.slug, unit.slug);

    for (const lesson of lessons) {
      for (const [section, questions] of questionSections(lesson)) {
        questions.forEach((question, position) => {
          if (!isRealQuestion(question)) {
            warnings.push({
              sourceId: question.id || `${lesson.slug}/${section}/${position}`,
              reason: "Skipped placeholder or incomplete question.",
            });
            return;
          }

          rows.push(
            mapPracticeQuestionToQuestionRow(question, {
              topicSlug: unit.slug,
              subtopicSlug: lesson.slug,
              yearLevel: course.yearLevel,
              courseSlug: course.slug,
              section,
              position,
              syllabusRef: unit.syllabusArea,
            })
          );
        });
      }
    }
  }

  return { course, rows, warnings };
}

function groupCounts(rows: QuestionRow[]) {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const key = `${row.course_slug}/${row.topic_slug}/${row.subtopic_slug}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function printSummary(rows: QuestionRow[], warnings: ImportWarning[], dryRun: boolean) {
  console.log(`Question bank ${dryRun ? "dry run" : "seed"} summary`);
  console.log(`  Questions prepared: ${rows.length}`);
  console.log(`  Warnings: ${warnings.length}`);
  console.log("");
  console.log("Counts by course/topic/subtopic:");

  for (const [key, count] of groupCounts(rows)) {
    console.log(`  ${key}: ${count}`);
  }

  if (warnings.length > 0) {
    console.log("");
    console.log("Warnings:");
    for (const warning of warnings.slice(0, 25)) {
      console.log(`  ${warning.sourceId}: ${warning.reason}`);
    }
    if (warnings.length > 25) {
      console.log(`  ... ${warnings.length - 25} more warning(s)`);
    }
  }
}

async function upsertQuestions(rows: QuestionRow[]) {
  const supabaseUrl = requiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("questions")
    .upsert(rows, { onConflict: "source_id" })
    .select("id,source_id");

  if (error) {
    throw new Error(`Could not seed question bank: ${error.message}`);
  }

  return data?.length ?? 0;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const { rows, warnings } = collectQuestionsFromCourse(options.courseSlug);

  printSummary(rows, warnings, options.dryRun);

  if (options.dryRun) {
    console.log("");
    console.log("Dry run only. No Supabase writes performed.");
    return;
  }

  const upsertedCount = await upsertQuestions(rows);
  console.log("");
  console.log(`Question bank seed complete. Upserted ${upsertedCount} question(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
