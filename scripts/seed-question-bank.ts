import { createClient } from "@supabase/supabase-js";
import { courseUnits, year12AdvancedCourse } from "../lib/courseUnits";
import {
  getNewCourse,
  getNewCourseUnitLessons,
} from "../lib/newCourseCatalog";
import { flattenSkillMapV2Nodes } from "../lib/skillMapV2";
import { applicationsDifferentiationLessons } from "../lib/lessons/applicationsDifferentiation";
import type { ExplicitLesson, PracticeQuestion } from "../lib/lessons/differentialCalculus";
import { differentialCalculusLessons } from "../lib/lessons/differentialCalculus";
import { differentiationTechniquesLessons } from "../lib/lessons/differentiationTechniques";
import { exponentialLogarithmicFunctionsLessons } from "../lib/lessons/exponentialLogarithmicFunctions";
import { financialMathematicsLessons } from "../lib/lessons/financialMathematics";
import { functionsGraphingTechniquesLessons } from "../lib/lessons/functionsGraphingTechniques";
import { furtherIntegralCalculusLessons } from "../lib/lessons/furtherIntegralCalculus";
import { furtherTrigonometryLessons } from "../lib/lessons/furtherTrigonometry";
import { integralCalculusLessons } from "../lib/lessons/integralCalculus";
import { sequencesSeriesFinancialMathsLessons } from "../lib/lessons/sequencesSeriesFinancialMaths";
import { statisticalAnalysisLessons } from "../lib/lessons/statisticalAnalysis";
import { trigonometricFunctionsGraphsLessons } from "../lib/lessons/trigonometricFunctionsGraphs";

type PracticeSection = "guidedPractice" | "independentPractice" | "masteryQuiz" | "multiPartPractice";

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
  question_parts: Array<Record<string, unknown>> | null;
  answer: string;
  accepted_answers: string[];
  hint: string | null;
  explanation: string;
  syllabus_ref: string | null;
  transfer_from_topics: string[];
  is_active: boolean;
  diagram_data: Record<string, unknown> | null;
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
  courseSlugs: string[];
  dryRun: boolean;
};

const SUPPORTED_COURSE_SLUGS = [
  "year-12-advanced",
  "year-8-mathematics",
  "year-9-mathematics",
  "year-9-mathematics-core",
  "year-9-mathematics-advanced",
  "year-10-mathematics",
  "year-10-mathematics-core",
  "year-10-mathematics-advanced",
  "year-11-standard",
  "year-11-advanced",
  "year-12-standard-2",
  "year-12-standard-1",
  "year-12-extension-1",
  "year-12-extension-2",
] as const;

const PLACEHOLDER_PATTERNS = [
  /TODO/i,
  /lorem ipsum/i,
  /placeholder lesson/i,
  /generated fallback/i,
  /sample question/i,
];

const year12AdvancedLessonSets: Record<string, ExplicitLesson[]> = {
  "differential-calculus": differentialCalculusLessons,
  "differentiation-techniques": differentiationTechniquesLessons,
  "applications-differentiation": applicationsDifferentiationLessons,
  "integral-calculus": integralCalculusLessons,
  "further-integral-calculus": furtherIntegralCalculusLessons,
  "functions-graphing-techniques": functionsGraphingTechniquesLessons,
  "trigonometric-functions-graphs": trigonometricFunctionsGraphsLessons,
  "further-trigonometry": furtherTrigonometryLessons,
  "exponential-logarithmic-functions": exponentialLogarithmicFunctionsLessons,
  "sequences-series-financial-maths": sequencesSeriesFinancialMathsLessons,
  "financial-mathematics": financialMathematicsLessons,
  "statistical-analysis": statisticalAnalysisLessons,
};

function unitSlugFromHref(href: string) {
  return href.split("/").filter(Boolean).at(-1) ?? href;
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseArgs(args: string[]): ImportOptions {
  const courseSlugs: string[] = [];

  args.forEach((arg, index) => {
    if (arg.startsWith("--course=")) {
      courseSlugs.push(arg.replace("--course=", ""));
      return;
    }

    if (arg === "--course" && args[index + 1]) {
      courseSlugs.push(args[index + 1]);
    }
  });

  const requestedCourses = courseSlugs.length > 0 ? courseSlugs : ["year-9-mathematics"];
  const expandedCourses = requestedCourses.flatMap((courseSlug) =>
    courseSlug === "all" ? [...SUPPORTED_COURSE_SLUGS] : [courseSlug]
  );

  return {
    courseSlugs: [...new Set(expandedCourses)],
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

export function normaliseQuestionParts(question: PracticeQuestion) {
  if (!question.parts?.length) {
    return null;
  }

  return question.parts
    .filter((part) => part.key && part.prompt && part.answer)
    .map((part) => ({
      key: part.key,
      label: part.label,
      prompt: part.prompt,
      latex: part.latex ?? null,
      marks: part.marks,
      answer: part.answer,
      acceptedAnswers: part.acceptedAnswers ?? [],
      hint: part.hint ?? null,
      explanation: part.explanation,
      working: part.working ?? [],
    }));
}

export function inferDifficulty(
  question: PracticeQuestion,
  section: PracticeSection = "guidedPractice",
  position = 0
) {
  const prompt = `${question.prompt} ${question.latex}`.toLowerCase();

  // Multi-part questions are always D5 — HSC Section II exam style.
  if (section === "multiPartPractice") {
    return 5;
  }

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

function extractDiagramData(q: PracticeQuestion): Record<string, unknown> | null {
  if (q.cartesianGraph)            return { type: "cartesianGraph",            ...q.cartesianGraph };
  if (q.argandDiagram)             return { type: "argandDiagram",             ...q.argandDiagram };
  if (q.vector3DDiagram)           return { type: "vector3DDiagram",           ...q.vector3DDiagram };
  if (q.triangleDiagram)           return { type: "triangleDiagram",           ...q.triangleDiagram };
  if (q.trapezoidalRuleDiagram)    return { type: "trapezoidalRuleDiagram",    ...q.trapezoidalRuleDiagram };
  if (q.boxPlotDiagram)            return { type: "boxPlotDiagram",            ...q.boxPlotDiagram };
  if (q.normalDistributionDiagram) return { type: "normalDistributionDiagram", ...q.normalDistributionDiagram };
  if (q.probabilityTreeDiagram)    return { type: "probabilityTreeDiagram",    ...q.probabilityTreeDiagram };
  if (q.twoWayTableDiagram)        return { type: "twoWayTableDiagram",        ...q.twoWayTableDiagram };
  if (q.vennDiagram)               return { type: "vennDiagram",               ...q.vennDiagram };
  if (q.diagram)                   return { type: "networkDiagram",            ...q.diagram };
  return null;
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
    question_parts: normaliseQuestionParts(question),
    answer: question.answer,
    accepted_answers: question.acceptedAnswers ?? [],
    hint: question.hint ?? null,
    explanation:
      question.explanation ??
      "Review the worked method and compare each step with the expected answer.",
    syllabus_ref: context.syllabusRef ?? null,
    transfer_from_topics: context.transferFromTopics ?? [],
    is_active: true,
    diagram_data: extractDiagramData(question),
  };
}

function questionSections(lesson: ExplicitLesson) {
  const sections: [PracticeSection, PracticeQuestion[]][] = [
    ["guidedPractice", lesson.guidedPractice],
    ["independentPractice", lesson.independentPractice],
    ["masteryQuiz", lesson.masteryQuiz],
  ];
  if (lesson.multiPartPractice && lesson.multiPartPractice.length > 0) {
    sections.push(["multiPartPractice", lesson.multiPartPractice]);
  }
  return sections;
}

function isGeneratedCatalogueFallbackLesson(lesson: ExplicitLesson) {
  const hasGenericLearningIntention = lesson.learningIntention.startsWith(
    "Understand the core ideas in "
  );
  const hasGenericTeaching = lesson.teaching.paragraphs.some((paragraph) =>
    paragraph.includes(
      "The aim is to recognise the structure of the question before doing any calculation."
    )
  );
  const hasGenericQuestions = questionSections(lesson).some(([, questions]) =>
    questions.some(
      (question) =>
        question.prompt.startsWith("Short calculation for ") ||
        question.prompt.startsWith("Choose the best ")
    )
  );

  return hasGenericLearningIntention && hasGenericTeaching && hasGenericQuestions;
}

function collectQuestionsFromCourse(courseSlug: string) {
  if (courseSlug === "year-12-advanced") {
    return collectQuestionsFromYear12Advanced();
  }

  const course = getNewCourse(courseSlug);
  const rows: QuestionRow[] = [];
  const warnings: ImportWarning[] = [];

  if (!course) {
    throw new Error(
      `Unknown course slug "${courseSlug}". Available courses: ${SUPPORTED_COURSE_SLUGS
        .map((item) => item)
        .join(", ")}`
    );
  }

  for (const unit of course.units) {
    if (unit.lessons.length === 0) continue;

    const lessons = getNewCourseUnitLessons(course.slug, unit.slug);

    for (const lesson of lessons) {
      if (isGeneratedCatalogueFallbackLesson(lesson)) {
        warnings.push({
          sourceId: `${course.slug}/${unit.slug}/${lesson.slug}`,
          reason: "Skipped generated catalogue fallback lesson; no real lesson override exists yet.",
        });
        continue;
      }

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

function collectQuestionsFromYear12Advanced() {
  const rows: QuestionRow[] = [];
  const warnings: ImportWarning[] = [];

  for (const unit of courseUnits) {
    const unitSlug = unitSlugFromHref(unit.href);
    const lessons = year12AdvancedLessonSets[unitSlug];

    if (!lessons) {
      warnings.push({
        sourceId: `year-12-advanced/${unitSlug}`,
        reason: "Skipped unit because no legacy lesson array is mapped.",
      });
      continue;
    }

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

          const row = mapPracticeQuestionToQuestionRow(question, {
            topicSlug: unitSlug,
            subtopicSlug: lesson.slug,
            yearLevel: year12AdvancedCourse.yearLevel,
            courseSlug: year12AdvancedCourse.courseSlug,
            section,
            position,
            syllabusRef: unit.title,
          });

          row.source_id =
            `${year12AdvancedCourse.courseSlug}/${unitSlug}/${lesson.slug}/${question.id}`;
          rows.push(row);
        });
      }
    }
  }

  return { course: year12AdvancedCourse, rows, warnings };
}

function collectQuestionsFromCourses(courseSlugs: string[]) {
  const rows: QuestionRow[] = [];
  const warnings: ImportWarning[] = [];
  const seenSourceIds = new Map<string, string>();

  for (const courseSlug of courseSlugs) {
    const result = collectQuestionsFromCourse(courseSlug);
    warnings.push(...result.warnings);

    for (const row of result.rows) {
      const existingSource = seenSourceIds.get(row.source_id);
      const nextSource = `${row.course_slug}/${row.topic_slug}/${row.subtopic_slug}`;

      if (existingSource) {
        warnings.push({
          sourceId: row.source_id,
          reason: `Skipped duplicate source_id from ${nextSource}; already used by ${existingSource}.`,
        });
        continue;
      }

      seenSourceIds.set(row.source_id, nextSource);
      rows.push(row);
    }
  }

  return { rows, warnings };
}

function groupCourseCounts(rows: QuestionRow[]) {
  const counts = new Map<string, number>();

  for (const row of rows) {
    counts.set(row.course_slug, (counts.get(row.course_slug) ?? 0) + 1);
  }

  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function groupCounts(rows: QuestionRow[]) {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const key = `${row.course_slug}/${row.topic_slug}/${row.subtopic_slug}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function groupDiagramCounts(rows: QuestionRow[]) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    if (!row.diagram_data) continue;
    const type = String((row.diagram_data as { type?: unknown }).type ?? "unknown");
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function printSummary(rows: QuestionRow[], warnings: ImportWarning[], dryRun: boolean) {
  console.log(`Question bank ${dryRun ? "dry run" : "seed"} summary`);
  console.log(`  Questions prepared: ${rows.length}`);
  console.log(`  Warnings: ${warnings.length}`);
  console.log("");

  console.log("Counts by course:");
  for (const [courseSlug, count] of groupCourseCounts(rows)) {
    console.log(`  ${courseSlug}: ${count}`);
  }
  console.log("");

  const diagramRows = rows.filter((r) => r.diagram_data !== null);
  console.log(`Questions with diagram_data: ${diagramRows.length}`);
  const diagramCounts = groupDiagramCounts(rows);
  if (diagramCounts.length > 0) {
    for (const [type, count] of diagramCounts) {
      console.log(`  ${type}: ${count}`);
    }
  }
  console.log("");

  const skillNodes = flattenSkillMapV2Nodes();
  const skillNodeKeys = new Set(
    skillNodes
      .filter((node) => node.type === "skill")
      .map((node) => `${node.courseSlug}/${node.topicSlug}/${node.subtopicSlug}`)
  );
  const checkpointCountByLesson = new Map<string, number>();
  for (const node of skillNodes.filter((node) => node.type === "checkpoint")) {
    const key = `${node.courseSlug}/${node.topicSlug}/${node.subtopicSlug}`;
    checkpointCountByLesson.set(key, (checkpointCountByLesson.get(key) ?? 0) + 1);
  }
  const skillMappedRows = rows.filter((row) =>
    skillNodeKeys.has(`${row.course_slug}/${row.topic_slug}/${row.subtopic_slug}`)
  );
  const mappedLessonKeys = new Set(
    skillMappedRows.map((row) => `${row.course_slug}/${row.topic_slug}/${row.subtopic_slug}`)
  );
  const mappedCheckpointCount = [...mappedLessonKeys].reduce(
    (total, key) => total + (checkpointCountByLesson.get(key) ?? 0),
    0
  );
  console.log(`Questions under Skill Map v2 lesson metadata: ${skillMappedRows.length}`);
  if (skillMappedRows.length > 0) {
    console.log(`  mapped lessons: ${mappedLessonKeys.size}`);
    console.log(`  checkpoint labels available: ${mappedCheckpointCount}`);
    console.log("  stable IDs are catalogue-only; no question-bank columns are written yet.");
  }
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
  const { rows, warnings } = collectQuestionsFromCourses(options.courseSlugs);

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
