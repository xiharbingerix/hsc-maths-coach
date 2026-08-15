import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getNewCourseUnitLessons, newCoursePathways } from "../lib/newCourseCatalog";
import type { ExplicitLesson, PracticeQuestion } from "../lib/lessons/differentialCalculus";

type Priority = "split" | "streamline" | "monitor";

type LessonLoadFinding = {
  course: string;
  unit: string;
  lesson: string;
  title: string;
  priority: Priority;
  flags: string[];
  learningMinutes: number;
  coreMinutes: number;
  totalMinutes: number;
  teachingWords: number;
  workedExamples: number;
  workedExampleSteps: number;
  commonMistakes: number;
  guidedResponses: number;
  independentResponses: number;
  multiPartResponses: number;
  masteryResponses: number;
  successCriteria: number;
};

const wordCount = (text: string) =>
  text
    .replace(/\\[a-zA-Z]+|[{}_^]/g, " ")
    .match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;

function questionResponses(question: PracticeQuestion) {
  if (question.parts?.length) return question.parts.length;
  if (question.steps?.length) return question.steps.length;
  return 1;
}

function responseCount(questions: PracticeQuestion[]) {
  return questions.reduce((total, question) => total + questionResponses(question), 0);
}

function coreTeachingWords(lesson: ExplicitLesson) {
  return [
    lesson.learningIntention,
    ...lesson.successCriteria.slice(0, 3),
    ...lesson.teaching.paragraphs,
    ...lesson.teaching.latexBlocks,
    ...lesson.commonMistakes.slice(0, 2).flatMap((mistake) => [mistake.mistake, mistake.fix]),
  ].reduce((total, text) => total + wordCount(text), 0);
}

function auditLesson(course: string, unit: string, lesson: ExplicitLesson): LessonLoadFinding {
  const examples = lesson.workedExamples.length;
  const exampleSteps = lesson.workedExamples.reduce(
    (total, example) => total + example.steps.length,
    0
  );
  const coreExamples = lesson.workedExamples.slice(0, 2);
  const coreExampleSteps = coreExamples.reduce(
    (total, example) => total + example.steps.length,
    0
  );
  const guidedResponses = responseCount(lesson.guidedPractice);
  const independentResponses = responseCount(lesson.independentPractice);
  const coreIndependentResponses = responseCount(lesson.independentPractice.slice(0, 2));
  const multiPartResponses = responseCount(lesson.multiPartPractice ?? []);
  const masteryResponses = responseCount(lesson.masteryQuiz);
  const words = coreTeachingWords(lesson);
  const extraExampleMinutes =
    (examples - coreExamples.length) * 1.5 + (exampleSteps - coreExampleSteps) * 0.75;
  const extraMistakeMinutes = Math.max(lesson.commonMistakes.length - 2, 0) * 0.5;
  const extraIndependentMinutes =
    (independentResponses - coreIndependentResponses) * 3;

  // These are deliberately conservative estimates for a student who pauses to read,
  // follows each example, and attempts each response once.
  const learningMinutes = Math.ceil(
    2 + words / 180 + coreExamples.length * 1.5 + coreExampleSteps * 0.75 + Math.min(lesson.commonMistakes.length, 2) * 0.5
  );
  const coreMinutes = Math.ceil(
    learningMinutes + guidedResponses * 2.5 + coreIndependentResponses * 3
  );
  const totalMinutes = Math.ceil(
    coreMinutes +
      extraExampleMinutes +
      extraMistakeMinutes +
      extraIndependentMinutes +
      multiPartResponses * 3.5 +
      masteryResponses * 1.5
  );
  const flags: string[] = [];

  if (learningMinutes > 30) flags.push("Learn stage exceeds 30 minutes before practice.");
  if (exampleSteps > 15) flags.push("Worked examples contain more than 15 displayed steps.");
  if (coreMinutes > 45) flags.push("Core lesson sequence exceeds 45 minutes.");
  if (totalMinutes > 75) flags.push("Optional follow-on content exceeds 75 minutes in total.");

  const priority: Priority =
    learningMinutes > 35 || coreMinutes > 60
      ? "split"
      : coreMinutes > 45
        ? "streamline"
        : "monitor";

  return {
    course,
    unit,
    lesson: lesson.slug,
    title: lesson.title,
    priority,
    flags,
    learningMinutes,
    coreMinutes,
    totalMinutes,
    teachingWords: words,
    workedExamples: examples,
    workedExampleSteps: exampleSteps,
    commonMistakes: lesson.commonMistakes.length,
    guidedResponses,
    independentResponses,
    multiPartResponses,
    masteryResponses,
    successCriteria: lesson.successCriteria.length,
  };
}

const findings = newCoursePathways
  .flatMap((course) =>
    course.units.flatMap((unit) =>
      getNewCourseUnitLessons(course.slug, unit.slug).map((lesson) =>
        auditLesson(course.slug, unit.slug, lesson)
      )
    )
  )
  .sort((a, b) => b.totalMinutes - a.totalMinutes || a.course.localeCompare(b.course));

const summary = {
  generatedAt: new Date().toISOString(),
  lessonCount: findings.length,
  optionalFollowOnOver75Minutes: findings.filter(
    (finding) => finding.totalMinutes > 75
  ).length,
  priorities: Object.fromEntries(
    (["split", "streamline", "monitor"] as Priority[]).map((priority) => [
      priority,
      findings.filter((finding) => finding.priority === priority).length,
    ])
  ),
  medianFullLessonMinutes: findings[Math.floor(findings.length / 2)]?.totalMinutes ?? 0,
  findings,
};

const destination = resolve("tmp", "lesson-load-audit.json");
writeFileSync(destination, `${JSON.stringify(summary, null, 2)}\n`);

console.log(`Audited ${summary.lessonCount} lessons.`);
console.log(`Split: ${summary.priorities.split}; streamline: ${summary.priorities.streamline}; monitor: ${summary.priorities.monitor}.`);
console.log(`Optional follow-on sequences over 75 minutes: ${summary.optionalFollowOnOver75Minutes}.`);
console.log(`Median full lesson estimate: ${summary.medianFullLessonMinutes} minutes.`);
console.log(`Detailed report: ${destination}`);
for (const finding of findings.slice(0, 25)) {
  console.log(`${finding.priority.toUpperCase()} ${finding.totalMinutes}m ${finding.course}/${finding.unit}/${finding.lesson} — ${finding.title}`);
}
