import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getNewCourseUnitLessons,
  newCoursePathways,
} from "../lib/newCourseCatalog";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../lib/lessons/differentialCalculus";
import type {
  CartesianGraph,
  NetworkDiagram,
  TriangleDiagram,
} from "../lib/lessons/types";
import * as year9Exports from "../lib/lessons/year9";
import * as year10Exports from "../lib/lessons/year10";

type AuditLevel = "FAIL" | "WARN";

type AuditIssue = {
  level: AuditLevel;
  rule: string;
  path: string;
  message: string;
};

type LessonRecord = {
  courseSlug: string;
  unitSlug: string;
  lesson: ExplicitLesson;
};

type QuestionRecord = {
  section: "guided" | "independent" | "mastery";
  question: PracticeQuestion;
};

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures: AuditIssue[] = [];
const warnings: AuditIssue[] = [];

const placeholderPattern =
  /\bTODO\b|lorem ipsum|placeholder lesson|generated fallback|sample question/i;
const visualKeywordPattern =
  /\bbox(?:-and-whisker)? plot\b|\btree diagram\b|\bvenn\b|\btwo-way table\b|\btrapezoidal rule\b|\barea between curves\b|\bcircle theorem\b|\bsurface area\b|\bvolume\b|\bcylinder\b|\bprism\b|\bsphere\b|\bcone\b|\bpyramid\b/i;

function addIssue(
  level: AuditLevel,
  rule: string,
  path: string,
  message: string
) {
  const issue = { level, rule, path, message };
  (level === "FAIL" ? failures : warnings).push(issue);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function questionRecords(lesson: ExplicitLesson): QuestionRecord[] {
  return [
    ...lesson.guidedPractice.map((question) => ({
      section: "guided" as const,
      question,
    })),
    ...lesson.independentPractice.map((question) => ({
      section: "independent" as const,
      question,
    })),
    ...lesson.masteryQuiz.map((question) => ({
      section: "mastery" as const,
      question,
    })),
  ];
}

function visualItems(lesson: ExplicitLesson) {
  return [...lesson.workedExamples, ...questionRecords(lesson).map(({ question }) => question)];
}

function hasVisualPayload(lesson: ExplicitLesson) {
  return visualItems(lesson).some(
    (item) =>
      item.diagram ||
      ("solutionDiagram" in item && item.solutionDiagram) ||
      item.triangleDiagram ||
      item.cartesianGraph ||
      item.trapezoidalRuleDiagram
  );
}

function lessonPath(courseSlug: string, unitSlug: string, lessonSlug: string) {
  return `${courseSlug}/${unitSlug}/${lessonSlug}`;
}

function validatePoint(value: unknown, path: string) {
  if (!isRecord(value) || !isFiniteNumber(value.x) || !isFiniteNumber(value.y)) {
    addIssue("FAIL", "renderer-payload", path, "Point must contain finite numeric x and y coordinates.");
  }
}

function validateTriangleDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "triangle-payload", path, "Triangle diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "triangle-payload", path, "Triangle diagram requires a description.");
  }

  if (!isRecord(value.vertices)) {
    addIssue("FAIL", "triangle-payload", path, "Triangle diagram requires A, B and C vertices.");
    return;
  }

  for (const vertex of ["A", "B", "C"]) {
    validatePoint(value.vertices[vertex], `${path}.vertices.${vertex}`);
  }

  if (
    value.rightAngleAt !== undefined &&
    !["A", "B", "C"].includes(String(value.rightAngleAt))
  ) {
    addIssue("FAIL", "triangle-payload", path, "rightAngleAt must be A, B or C.");
  }

  if (value.highlightedSides !== undefined) {
    if (
      !Array.isArray(value.highlightedSides) ||
      value.highlightedSides.some((side) => !["AB", "BC", "AC"].includes(String(side)))
    ) {
      addIssue("FAIL", "triangle-payload", path, "highlightedSides may contain only AB, BC or AC.");
    }
  }
}

function validateCartesianGraph(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "cartesian-payload", path, "Cartesian graph must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "cartesian-payload", path, "Cartesian graph requires a description.");
  }

  for (const key of ["xMin", "xMax", "yMin", "yMax", "xStep", "yStep"]) {
    if (value[key] !== undefined && !isFiniteNumber(value[key])) {
      addIssue("FAIL", "cartesian-payload", path, `${key} must be a finite number when supplied.`);
    }
  }

  if (isFiniteNumber(value.xStep) && value.xStep <= 0) {
    addIssue("FAIL", "cartesian-payload", path, "xStep must be greater than zero.");
  }

  if (isFiniteNumber(value.yStep) && value.yStep <= 0) {
    addIssue("FAIL", "cartesian-payload", path, "yStep must be greater than zero.");
  }

  if (isFiniteNumber(value.xMin) && isFiniteNumber(value.xMax) && value.xMin >= value.xMax) {
    addIssue("FAIL", "cartesian-payload", path, "xMin must be less than xMax.");
  }

  if (isFiniteNumber(value.yMin) && isFiniteNumber(value.yMax) && value.yMin >= value.yMax) {
    addIssue("FAIL", "cartesian-payload", path, "yMin must be less than yMax.");
  }

  for (const [collection, values] of [
    ["points", value.points],
    ["lineSegments", value.lineSegments],
    ["lines", value.lines],
    ["parabolas", value.parabolas],
    ["circles", value.circles],
    ["shadedRegions", value.shadedRegions],
  ] as const) {
    if (values !== undefined && !Array.isArray(values)) {
      addIssue("FAIL", "cartesian-payload", path, `${collection} must be an array when supplied.`);
    }
  }

  if (Array.isArray(value.points)) {
    value.points.forEach((point, index) => validatePoint(point, `${path}.points[${index}]`));
  }

  if (Array.isArray(value.lineSegments)) {
    value.lineSegments.forEach((segment, index) => {
      if (!isRecord(segment)) {
        addIssue("FAIL", "cartesian-payload", `${path}.lineSegments[${index}]`, "Line segment must be an object.");
        return;
      }
      validatePoint(segment.from, `${path}.lineSegments[${index}].from`);
      validatePoint(segment.to, `${path}.lineSegments[${index}].to`);
    });
  }

  if (Array.isArray(value.lines)) {
    value.lines.forEach((line, index) => {
      if (
        !isRecord(line) ||
        line.kind !== "linear" ||
        !isFiniteNumber(line.m) ||
        !isFiniteNumber(line.b)
      ) {
        addIssue("FAIL", "cartesian-payload", `${path}.lines[${index}]`, "Linear line requires kind, finite m and finite b.");
      }
    });
  }

  if (Array.isArray(value.parabolas)) {
    value.parabolas.forEach((parabola, index) => {
      if (
        !isRecord(parabola) ||
        parabola.kind !== "quadratic" ||
        !isFiniteNumber(parabola.a) ||
        !isFiniteNumber(parabola.b) ||
        !isFiniteNumber(parabola.c) ||
        parabola.a === 0
      ) {
        addIssue("FAIL", "cartesian-payload", `${path}.parabolas[${index}]`, "Quadratic parabola requires kind, finite a, b and c, with a non-zero.");
      }
    });
  }

  if (Array.isArray(value.circles)) {
    value.circles.forEach((circle, index) => {
      if (
        !isRecord(circle) ||
        !isFiniteNumber(circle.h) ||
        !isFiniteNumber(circle.k) ||
        !isFiniteNumber(circle.r) ||
        circle.r <= 0
      ) {
        addIssue("FAIL", "cartesian-payload", `${path}.circles[${index}]`, "Circle requires finite h, k and a positive radius.");
      }
    });
  }

  if (Array.isArray(value.shadedRegions)) {
    const validateFunction = (fn: unknown, functionPath: string) => {
      if (!isRecord(fn)) {
        addIssue("FAIL", "cartesian-payload", functionPath, "Shaded region function must be an object.");
        return;
      }

      if (fn.functionType === "line") {
        if (!isRecord(fn.line) || !isFiniteNumber(fn.line.m) || !isFiniteNumber(fn.line.b)) {
          addIssue("FAIL", "cartesian-payload", functionPath, "Line function requires finite m and b.");
        }
        return;
      }

      if (fn.functionType === "quadratic") {
        if (
          !isRecord(fn.quadratic) ||
          !isFiniteNumber(fn.quadratic.a) ||
          !isFiniteNumber(fn.quadratic.b) ||
          !isFiniteNumber(fn.quadratic.c)
        ) {
          addIssue("FAIL", "cartesian-payload", functionPath, "Quadratic function requires finite a, b and c.");
        }
        return;
      }

      addIssue("FAIL", "cartesian-payload", functionPath, "Shaded region functionType must be line or quadratic.");
    };

    value.shadedRegions.forEach((region, index) => {
      const regionPath = `${path}.shadedRegions[${index}]`;
      if (!isRecord(region)) {
        addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region must be an object.");
        return;
      }

      if (!isFiniteNumber(region.xMin) || !isFiniteNumber(region.xMax) || region.xMin >= region.xMax) {
        addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region requires finite xMin < xMax.");
      }

      if (region.kind === "under-function") {
        if (region.baseline !== undefined && !isFiniteNumber(region.baseline)) {
          addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region baseline must be finite when supplied.");
        }
        validateFunction(region, regionPath);
        return;
      }

      if (region.kind === "between-functions") {
        validateFunction(region.top, `${regionPath}.top`);
        validateFunction(region.bottom, `${regionPath}.bottom`);
        return;
      }

      addIssue("FAIL", "cartesian-payload", regionPath, "Shaded region kind must be under-function or between-functions.");
    });
  }
}

function validateNetworkDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "network-payload", path, "Network diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "network-payload", path, "Network diagram requires a description.");
  }

  if (!Array.isArray(value.vertices) || value.vertices.length === 0) {
    addIssue("FAIL", "network-payload", path, "Network diagram requires at least one vertex.");
    return;
  }

  if (!Array.isArray(value.edges)) {
    addIssue("FAIL", "network-payload", path, "Network diagram edges must be an array.");
    return;
  }

  const vertexIds = new Set<string>();
  value.vertices.forEach((vertex, index) => {
    const vertexPath = `${path}.vertices[${index}]`;
    if (
      !isRecord(vertex) ||
      !isNonEmptyString(vertex.id) ||
      !isNonEmptyString(vertex.label) ||
      !isFiniteNumber(vertex.x) ||
      !isFiniteNumber(vertex.y)
    ) {
      addIssue("FAIL", "network-payload", vertexPath, "Vertex requires id, label and finite x and y coordinates.");
      return;
    }

    if (vertexIds.has(vertex.id)) {
      addIssue("FAIL", "network-payload", vertexPath, `Duplicate network vertex id "${vertex.id}".`);
    }
    vertexIds.add(vertex.id);
  });

  value.edges.forEach((edge, index) => {
    const edgePath = `${path}.edges[${index}]`;
    if (!isRecord(edge) || !isNonEmptyString(edge.from) || !isNonEmptyString(edge.to)) {
      addIssue("FAIL", "network-payload", edgePath, "Edge requires from and to vertex ids.");
      return;
    }
    if (!vertexIds.has(edge.from) || !vertexIds.has(edge.to)) {
      addIssue("FAIL", "network-payload", edgePath, "Edge references a vertex id that does not exist.");
    }
  });

  if (Array.isArray(value.highlightedVertices)) {
    value.highlightedVertices.forEach((vertex) => {
      if (!vertexIds.has(String(vertex))) {
        addIssue("FAIL", "network-payload", path, `Highlighted vertex "${String(vertex)}" does not exist.`);
      }
    });
  }

  if (Array.isArray(value.highlightedEdges)) {
    value.highlightedEdges.forEach((edge, index) => {
      if (
        !Array.isArray(edge) ||
        edge.length !== 2 ||
        !vertexIds.has(String(edge[0])) ||
        !vertexIds.has(String(edge[1]))
      ) {
        addIssue("FAIL", "network-payload", `${path}.highlightedEdges[${index}]`, "Highlighted edge must reference two existing vertices.");
      }
    });
  }
}

function validateTrapezoidalRuleDiagram(value: unknown, path: string) {
  if (!isRecord(value)) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram must be an object.");
    return;
  }

  if (!isNonEmptyString(value.description)) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram requires a description.");
  }

  if (!Array.isArray(value.xValues) || !Array.isArray(value.yValues)) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram requires xValues and yValues arrays.");
    return;
  }

  const xValues = value.xValues;
  const yValues = value.yValues;

  if (xValues.length !== yValues.length) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "xValues and yValues must have matching lengths.");
  }

  if (xValues.length < 2) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Trapezoidal rule diagram requires at least two points.");
  }

  if (xValues.some((xValue) => !isFiniteNumber(xValue))) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Every x-value must be finite.");
  }

  if (yValues.some((yValue) => !isFiniteNumber(yValue))) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "Every y-value must be finite.");
  }

  if (
    xValues.some(
      (xValue, index) =>
        index > 0 &&
        isFiniteNumber(xValue) &&
        isFiniteNumber(xValues[index - 1]) &&
        xValue <= xValues[index - 1]
    )
  ) {
    addIssue("FAIL", "trapezoidal-rule-payload", path, "xValues must strictly increase.");
  }
}

function validateVisualPayloads(lesson: ExplicitLesson, basePath: string) {
  visualItems(lesson).forEach((item, index) => {
    const path = `${basePath}.visualItem[${index}]`;
    if (item.triangleDiagram) validateTriangleDiagram(item.triangleDiagram, `${path}.triangleDiagram`);
    if (item.cartesianGraph) validateCartesianGraph(item.cartesianGraph, `${path}.cartesianGraph`);
    if (item.trapezoidalRuleDiagram) {
      validateTrapezoidalRuleDiagram(item.trapezoidalRuleDiagram, `${path}.trapezoidalRuleDiagram`);
    }
    if (item.diagram) validateNetworkDiagram(item.diagram, `${path}.diagram`);
    if ("solutionDiagram" in item && item.solutionDiagram) {
      validateNetworkDiagram(item.solutionDiagram, `${path}.solutionDiagram`);
    }
  });
}

function placeholderText(lesson: ExplicitLesson) {
  return JSON.stringify({
    description: lesson.description,
    learningIntention: lesson.learningIntention,
    successCriteria: lesson.successCriteria,
    teaching: lesson.teaching,
    workedExamples: lesson.workedExamples,
    guidedPractice: lesson.guidedPractice,
    independentPractice: lesson.independentPractice,
    commonMistakes: lesson.commonMistakes,
    masteryQuiz: lesson.masteryQuiz,
  });
}

function looksLikeGeneratedFallback(lesson: ExplicitLesson) {
  return (
    lesson.workedExamples.length === 2 &&
    lesson.teaching.paragraphs.some((paragraph) =>
      paragraph.includes("The aim is to recognise the structure of the question before doing any calculation.")
    )
  );
}

function feedbackOnlyRestatesAnswer(question: PracticeQuestion) {
  const explanation = question.explanation?.trim() ?? "";
  const normalised = explanation.toLowerCase().replace(/[.\s]+$/g, "");
  const answer = question.answer.toLowerCase().replace(/[.\s]+$/g, "");
  return (
    /^the answer is\b/i.test(explanation) ||
    /^correct answer\b/i.test(explanation) ||
    normalised === answer ||
    normalised === `answer: ${answer}` ||
    normalised === `correct answer: ${answer}`
  );
}

function validateIndexExports(year: "year9" | "year10") {
  const directory = join(workspaceRoot, "lib", "lessons", year);
  const indexPath = join(directory, "index.ts");
  const runtimeExports = year === "year9" ? year9Exports : year10Exports;

  if (!existsSync(indexPath)) {
    addIssue("FAIL", "missing-index", `lib/lessons/${year}/index.ts`, "Missing lesson index file.");
    return;
  }

  const source = readFileSync(indexPath, "utf8");
  const exportMatches = [
    ...source.matchAll(/export\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*["']\.\/([^"']+)["']/g),
  ];
  const exportedModules = new Set(exportMatches.map((match) => match[2]));

  for (const [, exportName, moduleName] of exportMatches) {
    const modulePath = join(directory, `${moduleName}.ts`);
    if (!existsSync(modulePath)) {
      addIssue("FAIL", "missing-export-file", `lib/lessons/${year}/index.ts`, `Export "${exportName}" points to missing file "./${moduleName}.ts".`);
    }

    if (typeof runtimeExports[exportName as keyof typeof runtimeExports] !== "function") {
      addIssue("FAIL", "missing-runtime-export", `lib/lessons/${year}/index.ts`, `Export "${exportName}" is not a callable lesson override.`);
    }
  }

  for (const filename of readdirSync(directory)) {
    if (extname(filename) !== ".ts" || filename === "index.ts") continue;
    const moduleName = basename(filename, ".ts");
    if (!exportedModules.has(moduleName)) {
      addIssue("FAIL", "unexported-lesson-file", `lib/lessons/${year}/${filename}`, "Lesson override file is not exported from index.ts.");
    }
  }
}

function validateLesson(
  courseSlug: string,
  unitSlug: string,
  lesson: ExplicitLesson
) {
  const path = lessonPath(courseSlug, unitSlug, lesson.slug);
  const isStrictYear = courseSlug === "year-9-mathematics" || courseSlug === "year-10-mathematics";

  if (lesson.id !== lesson.slug) {
    addIssue("FAIL", "lesson-id-slug", path, `Lesson id "${lesson.id}" must match slug "${lesson.slug}".`);
  }

  if (looksLikeGeneratedFallback(lesson)) {
    addIssue("FAIL", "missing-explicit-lesson", path, "Catalogue lesson seed resolved to generated fallback content instead of an explicit lesson override.");
  }

  if (isStrictYear) {
    const counts = {
      workedExamples: lesson.workedExamples.length,
      guidedPractice: lesson.guidedPractice.length,
      independentPractice: lesson.independentPractice.length,
      commonMistakes: lesson.commonMistakes.length,
      masteryQuiz: lesson.masteryQuiz.length,
    };
    const expected = {
      workedExamples: 3,
      guidedPractice: 4,
      independentPractice: 5,
      commonMistakes: 4,
      masteryQuiz: 10,
    };

    for (const key of Object.keys(expected) as Array<keyof typeof expected>) {
      if (counts[key] !== expected[key]) {
        addIssue("FAIL", "lesson-structure", path, `${key} has ${counts[key]} items; expected ${expected[key]}.`);
      }
    }

    if (lesson.masteryPassMark !== 0.8) {
      addIssue("FAIL", "mastery-pass-mark", path, `masteryPassMark is ${lesson.masteryPassMark}; expected 0.8.`);
    }
  }

  if (placeholderPattern.test(placeholderText(lesson))) {
    addIssue("FAIL", "placeholder-content", path, "Active teaching, practice or mastery content contains a forbidden placeholder string.");
  }

  validateVisualPayloads(lesson, path);

  const questions = questionRecords(lesson);
  for (const { section, question } of questions) {
    const questionPath = `${path}/${section}/${question.id}`;
    if (question.choices) {
      const labels = question.choices.map((choice) => choice.label);
      if (!labels.includes(question.answer)) {
        addIssue("FAIL", "invalid-mc-answer", questionPath, `Answer "${question.answer}" is not one of the visible choice labels: ${labels.join(", ")}.`);
      }
    } else {
      const distinctVariants = new Set(
        (question.acceptedAnswers ?? [])
          .map((answer) => answer.trim())
          .filter((answer) => answer.length > 0 && answer !== question.answer.trim())
      );
      if (distinctVariants.size === 0) {
        addIssue("WARN", "typed-answer-no-variants", questionPath, "Typed answer has no acceptedAnswers variant beyond the canonical answer.");
      }
    }

    if (feedbackOnlyRestatesAnswer(question)) {
      addIssue("WARN", "generic-feedback", questionPath, "Feedback only restates the answer.");
    }
  }

  if (!hasVisualPayload(lesson)) {
    addIssue("WARN", "no-visual-payload", path, "Lesson has no visual payload.");
  }

  const visualDependencyText = JSON.stringify({
    title: lesson.title,
    description: lesson.description,
    learningIntention: lesson.learningIntention,
    successCriteria: lesson.successCriteria,
    teaching: lesson.teaching,
  });
  if (visualKeywordPattern.test(visualDependencyText) && !hasVisualPayload(lesson)) {
    addIssue("WARN", "visual-dependent-without-visual", path, "Lesson contains visually dependent keywords but no visual payload.");
  }
}

function printIssueList(title: string, issues: AuditIssue[]) {
  console.log(`\n${title}`);
  if (issues.length === 0) {
    console.log("  None");
    return;
  }

  for (const issue of issues) {
    console.log(`  [${issue.level}] ${issue.rule} :: ${issue.path}`);
    console.log(`    ${issue.message}`);
  }
}

function countByRule(issues: AuditIssue[]) {
  const counts = new Map<string, number>();
  for (const issue of issues) counts.set(issue.rule, (counts.get(issue.rule) ?? 0) + 1);
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function printWarningSummary() {
  console.log("\nWARNING SUMMARY");
  if (warnings.length === 0) {
    console.log("  None");
    return;
  }

  for (const [rule, count] of countByRule(warnings)) {
    console.log(`  ${rule}: ${count}`);
  }
}

function printCourseUnitWarningBreakdown(records: LessonRecord[]) {
  console.log("\nCOURSE / UNIT WARNING BREAKDOWN");
  for (const course of newCoursePathways) {
    console.log(`  ${course.slug}`);
    for (const unit of course.units) {
      if (unit.lessons.length === 0) continue;
      const prefix = `${course.slug}/${unit.slug}/`;
      const unitWarnings = warnings.filter((issue) => issue.path.startsWith(prefix));
      console.log(`    ${unit.slug}: ${unitWarnings.length} warning(s)`);
      for (const record of records.filter(
        (item) => item.courseSlug === course.slug && item.unitSlug === unit.slug
      )) {
        const lessonWarnings = warnings.filter((issue) =>
          issue.path.startsWith(`${prefix}${record.lesson.slug}`)
        );
        console.log(`      ${record.lesson.slug}: ${lessonWarnings.length}`);
      }
    }
  }
}

function audit() {
  validateIndexExports("year9");
  validateIndexExports("year10");

  const records: LessonRecord[] = [];
  const lessonIds = new Map<string, string[]>();
  const lessonSlugs = new Map<string, string[]>();
  const questionIds = new Map<string, string[]>();

  for (const course of newCoursePathways) {
    for (const unit of course.units) {
      for (const lesson of getNewCourseUnitLessons(course.slug, unit.slug)) {
        const path = lessonPath(course.slug, unit.slug, lesson.slug);
        records.push({ courseSlug: course.slug, unitSlug: unit.slug, lesson });
        const lessonIdScope = `${course.slug}/${unit.slug}/${lesson.id}`;
        const lessonSlugScope = `${course.slug}/${unit.slug}/${lesson.slug}`;
        lessonIds.set(lessonIdScope, [...(lessonIds.get(lessonIdScope) ?? []), path]);
        lessonSlugs.set(lessonSlugScope, [...(lessonSlugs.get(lessonSlugScope) ?? []), path]);

        for (const { question } of questionRecords(lesson)) {
          questionIds.set(question.id, [...(questionIds.get(question.id) ?? []), path]);
        }

        validateLesson(course.slug, unit.slug, lesson);
      }
    }
  }

  for (const [idScope, paths] of lessonIds) {
    if (paths.length > 1) addIssue("FAIL", "duplicate-lesson-id", paths.join(", "), `Duplicate route-scoped lesson id "${idScope}".`);
  }

  for (const [slugScope, paths] of lessonSlugs) {
    if (paths.length > 1) addIssue("FAIL", "duplicate-lesson-slug", paths.join(", "), `Duplicate route-scoped lesson slug "${slugScope}".`);
  }

  for (const [id, paths] of questionIds) {
    if (paths.length > 1) addIssue("FAIL", "duplicate-question-id", paths.join(", "), `Duplicate question id "${id}".`);
  }

  const rendererSource = readFileSync(
    join(workspaceRoot, "app", "course", "LessonRenderer.tsx"),
    "utf8"
  );
  const videoStageDisabled = /export const WATCH_STAGE_ENABLED\s*=\s*false/.test(rendererSource);
  if (videoStageDisabled) {
    for (const record of records) {
      if (/placeholder/i.test(record.lesson.video.title) || /placeholder/i.test(record.lesson.video.url)) {
        addIssue(
          "WARN",
          "dormant-video-placeholder",
          lessonPath(record.courseSlug, record.unitSlug, record.lesson.slug),
          "Video placeholder is dormant while WATCH_STAGE_ENABLED is false."
        );
      }
    }
  }

  console.log("NOVA MATHS LESSON QA AUDIT");
  console.log(`Audited ${records.length} catalogue lesson(s) across ${newCoursePathways.length} course pathway(s).`);
  printIssueList("FAIL-LEVEL ISSUES", failures);
  printWarningSummary();
  printCourseUnitWarningBreakdown(records);

  console.log(`\nFINAL RESULT: ${failures.length > 0 ? "FAIL" : "PASS"}`);
  console.log(`  Failures: ${failures.length}`);
  console.log(`  Warnings: ${warnings.length}`);

  if (failures.length > 0) process.exitCode = 1;
}

audit();
