import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { courseUnits, year12AdvancedCourse } from "../lib/courseUnits";

// Load .env.local (and friends) so SUPABASE credentials are available when run
// directly via tsx, matching the other scripts in this folder.
loadEnvConfig(process.cwd());
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
import { probabilityLessons } from "../lib/lessons/probability";
import { year12AdvancedRandomVariablesLessons } from "../lib/lessons/year12AdvancedRandomVariables";
import { applyYear12AdvancedDiagramRemediation } from "../lib/lessons/year12Advanced/diagramRemediation";
import { extractDiagramData, pickDiagramFields, type Choice } from "../lib/lessons/diagramRegistry";
import { isGenericMcqInstructionLatex } from "../lib/lessons/questionHelpers";
import { applyQuestionVisualStandards } from "../lib/lessons/visualAuthoringStandards";
import { applyYear12Standard2QuestionDiagramRemediation } from "../lib/lessons/year12Standard2/diagramRemediation";
import { applyYear9CoreQuestionDiagramRemediation } from "../lib/lessons/year9/coreDiagramRemediation";
import { getChallengeQuestions } from "../lib/challenges";
import { getAllExamPapers } from "../lib/exams";
import { examQuestions } from "../lib/exams/types";

type PracticeSection =
  | "guidedPractice"
  | "independentPractice"
  | "masteryQuiz"
  | "masteryQuizPool"
  | "multiPartPractice"
  | "challenge";

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
  choices: Choice[] | null;
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

export const SUPPORTED_COURSE_SLUGS = [
  "year-7-mathematics",
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
  "year-11-extension",
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

const allYear12AdvancedLessons: ExplicitLesson[] = [
  ...functionsGraphingTechniquesLessons,
  ...trigonometricFunctionsGraphsLessons,
  ...furtherTrigonometryLessons,
  ...differentialCalculusLessons,
  ...differentiationTechniquesLessons,
  ...applicationsDifferentiationLessons,
  ...integralCalculusLessons,
  ...furtherIntegralCalculusLessons,
  ...exponentialLogarithmicFunctionsLessons,
  ...probabilityLessons,
  ...statisticalAnalysisLessons,
  ...year12AdvancedRandomVariablesLessons,
  ...sequencesSeriesFinancialMathsLessons,
  ...financialMathematicsLessons,
].map(applyYear12AdvancedDiagramRemediation);

const year12AdvancedLessonSets: Record<string, ExplicitLesson[]> = {};
for (const lesson of allYear12AdvancedLessons) {
  if (!year12AdvancedLessonSets[lesson.moduleSlug]) {
    year12AdvancedLessonSets[lesson.moduleSlug] = [];
  }
  year12AdvancedLessonSets[lesson.moduleSlug].push(lesson);
}

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
    ...pickDiagramFields(choice),
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

/**
 * Hand-calibrated after reviewing every Year 11 Advanced question that had
 * previously seeded as D4, D5 or D6. Entries are deliberate exceptions to the
 * section defaults below; quiz position is not evidence of difficulty.
 */
export const YEAR11_ADVANCED_AUDITED_DIFFICULTIES: Readonly<Record<string, number>> = {
  // D1: recall or direct reading.
  "chal-y12s1-ss-1": 1,
  "chal-y12s1-ss-2": 1,
  "y11adv-id-exam-mp3": 1,

  // D2: routine applications with a supplied or immediately apparent method.
  "chal-y11a-disc-1": 2,
  "chal-y11a-disc-2": 2,
  "chal-y11a-disc-3": 2,
  "chal-y11a-cts-1": 2,
  "chal-y11a-cts-2": 2,
  "chal-y11a-cts-3": 2,
  "chal-y12s1-rt-1": 2,
  "chal-y12s1-rt-2": 2,
  "chal-y12s1-rt-3": 2,
  "chal-y12a-te-1": 2,
  "chal-y12a-te-2": 2,
  "chal-y12a-te-3": 2,
  "chal-y12a-dpf-1": 2,
  "chal-y12a-dpf-3": 2,
  "chal-y12s1-ss-3": 2,
  "chal-y12a-sp-1": 2,
  "chal-y12a-sp-2": 2,
  "y11adv-comp-mp1": 2,
  "y11adv-comp-mp2": 2,
  "y11adv-cts-mp1": 2,
  "y11adv-cts-mp2": 2,
  "y11adv-qi-mp1": 2,
  "y11adv-qi-mp2": 2,
  "y11adv-gt-circles-mp1": 2,
  "y11adv-gt-circles-mp2": 2,
  "y11adv-sector-mp1": 2,
  "y11adv-rat-mp1": 2,
  "y11adv-rat-mp2": 2,
  "y11adv-nra-mp1": 2,
  "y11adv-nra-mp2": 2,
  "y11adv-trig-exam-mp1": 2,
  "y11adv-cai-mp1": 2,
  "y11adv-cai-mp2": 2,
  "y11adv-sec-mp1": 2,
  "y11adv-sec-mp2": 2,
  "y11adv-exp-graph-mp1": 2,
  "y11adv-exp-graph-mp2": 2,
  "y11adv-pr-mp1": 2,
  "y11adv-pr-mp2": 2,
  "y11adv-qr-mp1": 2,
  "y11adv-qr-mp2": 2,
  "y11adv-pd-sets-mp1": 2,
  "y11adv-pd-sets-mp2": 2,

  // D4: transfer, interpretation, or a non-obvious choice of method.
  "chal-y12a-f2-6": 4,
  "chal-y11a-var-1": 4,
  "chal-y11a-var-2": 4,
  "chal-y12a-dpf-2": 4,
  "chal-y12a-sp-3": 4,
  "chal-y12a-sp-4": 4,
  "chal-y12a-opt-7": 4,
  "y11adv-var-m10": 4,
  "y11adv-cs-rd-m5": 4,
  "y11adv-ge-sp-m4b": 4,
  "y11adv-ge-sim-m7": 4,
  "y11adv-ge-ex-m7": 4,
  "y11adv-sf-ex-m7": 4,
  "y11adv-gt-trans-qm5": 4,
  "y11adv-gt-trans-qm6": 4,
  "y11adv-gt-trans-qm7": 4,
  "y11adv-gt-dil-qm5": 4,
  "y11adv-gt-dil-qm6": 4,
  "y11adv-gt-dil-qm7": 4,
  "y11adv-gt-poly-qm5": 4,
  "y11adv-gt-poly-qm6": 4,
  "y11adv-gt-poly-qm7": 4,
  "y11adv-gt-exam-qm5": 4,
  "y11adv-gt-exam-qm6": 4,
  "y11adv-gt-exam-qm7": 4,
  "y11adv-gt-circles-qm5": 4,
  "y11adv-gt-circles-qm6": 4,
  "y11adv-gt-circles-qm7": 4,
  "y11adv-rcon-qm5": 4,
  "y11adv-rcon-qm6": 4,
  "y11adv-rcon-qm7": 4,
  "y11adv-d2r-qm5": 4,
  "y11adv-d2r-qm6": 4,
  "y11adv-d2r-qm7": 4,
  "y11adv-r2d-qm5": 4,
  "y11adv-r2d-qm6": 4,
  "y11adv-r2d-qm7": 4,
  "y11adv-alen-qm5": 4,
  "y11adv-alen-qm6": 4,
  "y11adv-alen-qm7": 4,
  "y11adv-sarea-qm5": 4,
  "y11adv-sarea-qm6": 4,
  "y11adv-sarea-qm7": 4,
  "y11adv-est-qm5": 4,
  "y11adv-est-qm6": 4,
  "y11adv-est-qm7": 4,
  "y11adv-ucv2-qm5": 4,
  "y11adv-ucv2-qm6": 4,
  "y11adv-ucv2-qm7": 4,
  "y11adv-ucqa-qm5": 4,
  "y11adv-ucqa-qm6": 4,
  "y11adv-ucqa-qm7": 4,
  "y11adv-graph-qm5": 4,
  "y11adv-graph-qm6": 4,
  "y11adv-graph-qm7": 4,
  "y11adv-amp-qm5": 4,
  "y11adv-amp-qm6": 4,
  "y11adv-amp-qm7": 4,
  "y11adv-shift-qm5": 4,
  "y11adv-shift-qm6": 4,
  "y11adv-shift-qm7": 4,
  "y11adv-rat-qm5": 4,
  "y11adv-rat-qm6": 4,
  "y11adv-rat-qm7": 4,
  "y11adv-nra-qm5": 4,
  "y11adv-nra-qm6": 4,
  "y11adv-nra-qm7": 4,
  "y11adv-amb-qm5": 4,
  "y11adv-amb-qm6": 4,
  "y11adv-amb-qm7": 4,
  "y11adv-trig-exam-qm5": 4,
  "y11adv-trig-exam-qm6": 4,
  "y11adv-trig-exam-qm7": 4,
  "y11adv-trig-eq-qm5": 4,
  "y11adv-trig-eq-qm6": 4,
  "y11adv-trig-eq-qm7": 4,
  "y11adv-trig-id-qm5": 4,
  "y11adv-trig-id-qm6": 4,
  "y11adv-trig-id-qm7": 4,
  "y11adv-relang-qm5": 4,
  "y11adv-relang-qm6": 4,
  "y11adv-relang-qm7": 4,
  "y11adv-cai-qm5": 4,
  "y11adv-cai-qm6": 4,
  "y11adv-cai-qm7": 4,
  "y11adv-trigeq-basic-qm5": 4,
  "y11adv-trigeq-basic-qm6": 4,
  "y11adv-trigeq-basic-qm7": 4,
  "y11adv-trigeq-adv-qm5": 4,
  "y11adv-trigeq-adv-qm6": 4,
  "y11adv-trigeq-adv-qm7": 4,
  "y11adv-trigproof-qm5": 4,
  "y11adv-trigproof-qm6": 4,
  "y11adv-trigproof-qm7": 4,
  "y11adv-sec-qm5": 4,
  "y11adv-sec-qm6": 4,
  "y11adv-sec-qm7": 4,
  "y11adv-trig-mixed-qm5": 4,
  "y11adv-trig-mixed-qm6": 4,
  "y11adv-trig-mixed-qm7": 4,
  "y11adv-exp-index-qm5": 4,
  "y11adv-exp-index-qm6": 4,
  "y11adv-exp-index-qm7": 4,
  "y11adv-exp-log-qm5": 4,
  "y11adv-exp-log-qm6": 4,
  "y11adv-exp-log-qm7": 4,
  "y11adv-exp-solve-qm5": 4,
  "y11adv-exp-solve-qm6": 4,
  "y11adv-exp-solve-qm7": 4,
  "y11adv-exp-graph-qm5": 4,
  "y11adv-exp-graph-qm6": 4,
  "y11adv-exp-graph-qm7": 4,
  "y11adv-exp-model-qm5": 4,
  "y11adv-exp-model-qm6": 4,
  "y11adv-exp-model-qm7": 4,
  "y11adv-exp-exam-qm5": 4,
  "y11adv-exp-exam-qm6": 4,
  "y11adv-exp-exam-qm7": 4,
  "y11adv-intg-prim-qm5": 4,
  "y11adv-intg-prim-qm6": 4,
  "y11adv-intg-prim-qm7": 4,
  "y11adv-intg-std-qm5": 4,
  "y11adv-intg-std-qm6": 4,
  "y11adv-intg-std-qm7": 4,
  "y11adv-intg-iv-qm5": 4,
  "y11adv-intg-iv-qm6": 4,
  "y11adv-intg-iv-qm7": 4,
  "y11adv-intg-def-qm5": 4,
  "y11adv-intg-def-qm6": 4,
  "y11adv-intg-def-qm7": 4,
  "y11adv-intg-ftc-qm5": 4,
  "y11adv-intg-ftc-qm6": 4,
  "y11adv-intg-ftc-qm7": 4,
  "y11adv-intg-area-qm5": 4,
  "y11adv-intg-area-qm6": 4,
  "y11adv-intg-area-qm7": 4,
  "y11adv-intg-rcr-qm5": 4,
  "y11adv-intg-rcr-qm6": 4,
  "y11adv-intg-rcr-qm7": 4,
  "y11adv-intg-trap-qm5": 4,
  "y11adv-intg-trap-qm6": 4,
  "y11adv-intg-trap-qm7": 4,
  "y11adv-id-roc-qm5": 4,
  "y11adv-id-roc-qm6": 4,
  "y11adv-id-roc-qm7": 4,
  "y11adv-id-fp-qm5": 4,
  "y11adv-id-fp-qm6": 4,
  "y11adv-id-fp-qm7": 4,
  "y11adv-id-poly-qm5": 4,
  "y11adv-id-poly-qm6": 4,
  "y11adv-id-poly-qm7": 4,
  "y11adv-pr-qm5": 4,
  "y11adv-pr-qm6": 4,
  "y11adv-pr-qm7": 4,
  "y11adv-qr-qm5": 4,
  "y11adv-qr-qm6": 4,
  "y11adv-qr-qm7": 4,
  "y11adv-chain-qm5": 4,
  "y11adv-chain-qm6": 4,
  "y11adv-chain-qm7": 4,
  "y11adv-stat-qm5": 4,
  "y11adv-stat-qm6": 4,
  "y11adv-stat-qm7": 4,
  "y11adv-conc-qm5": 4,
  "y11adv-conc-qm6": 4,
  "y11adv-conc-qm7": 4,
  "y11adv-id-tn-qm5": 4,
  "y11adv-id-tn-qm6": 4,
  "y11adv-id-tn-qm7": 4,
  "y11adv-curve-qm5": 4,
  "y11adv-curve-qm6": 4,
  "y11adv-curve-qm7": 4,
  "y11adv-id-exam-qm5": 4,
  "y11adv-id-exam-qm6": 4,
  "y11adv-id-exam-qm7": 4,

  // D5: novel modelling or optimisation requiring synthesis.
  "chal-y12a-sp-5": 5,
  "chal-y12a-sp-7": 5,
  "chal-y12a-opt-1": 5,
  "chal-y12a-opt-2": 5,
  "chal-y12a-opt-3": 5,
  "chal-y12a-opt-4": 5,
  "chal-y12a-opt-5": 5,
  "chal-y12a-opt-6": 5,
  "y11adv-gt-trans-qm8": 5,
  "y11adv-gt-trans-qm9": 5,
  "y11adv-gt-trans-qm10": 5,
  "y11adv-gt-dil-qm8": 5,
  "y11adv-gt-dil-qm9": 5,
  "y11adv-gt-dil-qm10": 5,
  "y11adv-gt-poly-qm8": 5,
  "y11adv-gt-poly-qm9": 5,
  "y11adv-gt-poly-qm10": 5,
  "y11adv-gt-exam-qm8": 5,
  "y11adv-gt-exam-qm9": 5,
  "y11adv-gt-exam-qm10": 5,
  "y11adv-gt-circles-qm8": 5,
  "y11adv-gt-circles-qm9": 5,
  "y11adv-gt-circles-qm10": 5,
  "y11adv-rcon-qm8": 5,
  "y11adv-rcon-qm9": 5,
  "y11adv-rcon-qm10": 5,
  "y11adv-d2r-qm8": 5,
  "y11adv-d2r-qm9": 5,
  "y11adv-d2r-qm10": 5,
  "y11adv-r2d-qm8": 5,
  "y11adv-r2d-qm9": 5,
  "y11adv-r2d-qm10": 5,
  "y11adv-alen-qm8": 5,
  "y11adv-alen-qm9": 5,
  "y11adv-alen-qm10": 5,
  "y11adv-sarea-qm8": 5,
  "y11adv-sarea-qm9": 5,
  "y11adv-sarea-qm10": 5,
  "y11adv-est-qm8": 5,
  "y11adv-est-qm9": 5,
  "y11adv-est-qm10": 5,
  "y11adv-ucv2-qm8": 5,
  "y11adv-ucv2-qm9": 5,
  "y11adv-ucv2-qm10": 5,
  "y11adv-ucqa-qm8": 5,
  "y11adv-ucqa-qm9": 5,
  "y11adv-ucqa-qm10": 5,
  "y11adv-graph-qm8": 5,
  "y11adv-graph-qm9": 5,
  "y11adv-graph-qm10": 5,
  "y11adv-amp-qm8": 5,
  "y11adv-amp-qm9": 5,
  "y11adv-amp-qm10": 5,
  "y11adv-shift-qm8": 5,
  "y11adv-shift-qm9": 5,
  "y11adv-shift-qm10": 5,
  "y11adv-rat-qm8": 5,
  "y11adv-rat-qm9": 5,
  "y11adv-rat-qm10": 5,
  "y11adv-nra-qm8": 5,
  "y11adv-nra-qm9": 5,
  "y11adv-nra-qm10": 5,
  "y11adv-amb-qm8": 5,
  "y11adv-amb-qm9": 5,
  "y11adv-amb-qm10": 5,
  "y11adv-trig-exam-qm8": 5,
  "y11adv-trig-exam-qm9": 5,
  "y11adv-trig-exam-qm10": 5,
  "y11adv-trig-eq-qm8": 5,
  "y11adv-trig-eq-qm9": 5,
  "y11adv-trig-eq-qm10": 5,
  "y11adv-trig-id-qm8": 5,
  "y11adv-trig-id-qm9": 5,
  "y11adv-trig-id-qm10": 5,
  "y11adv-relang-qm8": 5,
  "y11adv-relang-qm9": 5,
  "y11adv-relang-qm10": 5,
  "y11adv-cai-qm8": 5,
  "y11adv-cai-qm9": 5,
  "y11adv-cai-qm10": 5,
  "y11adv-trigeq-basic-qm8": 5,
  "y11adv-trigeq-basic-qm9": 5,
  "y11adv-trigeq-basic-qm10": 5,
  "y11adv-trigeq-adv-qm8": 5,
  "y11adv-trigeq-adv-qm9": 5,
  "y11adv-trigeq-adv-qm10": 5,
  "y11adv-trigproof-qm8": 5,
  "y11adv-trigproof-qm9": 5,
  "y11adv-trigproof-qm10": 5,
  "y11adv-sec-qm8": 5,
  "y11adv-sec-qm9": 5,
  "y11adv-sec-qm10": 5,
  "y11adv-trig-mixed-qm8": 5,
  "y11adv-trig-mixed-qm9": 5,
  "y11adv-trig-mixed-qm10": 5,
  "y11adv-exp-index-qm8": 5,
  "y11adv-exp-index-qm9": 5,
  "y11adv-exp-index-qm10": 5,
  "y11adv-exp-log-qm8": 5,
  "y11adv-exp-log-qm9": 5,
  "y11adv-exp-log-qm10": 5,
  "y11adv-exp-solve-qm8": 5,
  "y11adv-exp-solve-qm9": 5,
  "y11adv-exp-solve-qm10": 5,
  "y11adv-exp-graph-qm8": 5,
  "y11adv-exp-graph-qm9": 5,
  "y11adv-exp-graph-qm10": 5,
  "y11adv-exp-model-qm8": 5,
  "y11adv-exp-model-qm9": 5,
  "y11adv-exp-model-qm10": 5,
  "y11adv-exp-exam-qm8": 5,
  "y11adv-exp-exam-qm9": 5,
  "y11adv-exp-exam-qm10": 5,
  "y11adv-intg-prim-qm8": 5,
  "y11adv-intg-prim-qm9": 5,
  "y11adv-intg-prim-qm10": 5,
  "y11adv-intg-std-qm8": 5,
  "y11adv-intg-std-qm9": 5,
  "y11adv-intg-std-qm10": 5,
  "y11adv-intg-iv-qm8": 5,
  "y11adv-intg-iv-qm9": 5,
  "y11adv-intg-iv-qm10": 5,
  "y11adv-intg-def-qm8": 5,
  "y11adv-intg-def-qm9": 5,
  "y11adv-intg-def-qm10": 5,
  "y11adv-intg-ftc-qm8": 5,
  "y11adv-intg-ftc-qm9": 5,
  "y11adv-intg-ftc-qm10": 5,
  "y11adv-intg-area-qm8": 5,
  "y11adv-intg-area-qm9": 5,
  "y11adv-intg-area-qm10": 5,
  "y11adv-intg-rcr-qm8": 5,
  "y11adv-intg-rcr-qm9": 5,
  "y11adv-intg-rcr-qm10": 5,
  "y11adv-intg-trap-qm8": 5,
  "y11adv-intg-trap-qm9": 5,
  "y11adv-intg-trap-qm10": 5,
  "y11adv-id-roc-qm8": 5,
  "y11adv-id-roc-qm9": 5,
  "y11adv-id-roc-qm10": 5,
  "y11adv-id-fp-qm8": 5,
  "y11adv-id-fp-qm9": 5,
  "y11adv-id-fp-qm10": 5,
  "y11adv-id-poly-qm8": 5,
  "y11adv-id-poly-qm9": 5,
  "y11adv-id-poly-qm10": 5,
  "y11adv-pr-qm8": 5,
  "y11adv-pr-qm9": 5,
  "y11adv-pr-qm10": 5,
  "y11adv-qr-qm8": 5,
  "y11adv-qr-qm9": 5,
  "y11adv-qr-qm10": 5,
  "y11adv-chain-qm8": 5,
  "y11adv-chain-qm9": 5,
  "y11adv-chain-qm10": 5,
  "y11adv-stat-qm8": 5,
  "y11adv-stat-qm9": 5,
  "y11adv-stat-qm10": 5,
  "y11adv-conc-qm8": 5,
  "y11adv-conc-qm9": 5,
  "y11adv-conc-qm10": 5,
  "y11adv-id-tn-qm8": 5,
  "y11adv-id-tn-qm9": 5,
  "y11adv-id-tn-qm10": 5,
  "y11adv-curve-qm8": 5,
  "y11adv-curve-qm9": 5,
  "y11adv-curve-qm10": 5,
  "y11adv-id-exam-qm8": 5,
  "y11adv-id-exam-qm9": 5,
  "y11adv-id-exam-qm10": 5,

  // D6: synoptic, sustained, non-routine and at the course ceiling.
  "chal-y12a-sp-6": 6,
};

/**
 * Year 8 upper-tier items restored only after individual manual re-authoring.
 * Unlisted former D4-D6 items remain capped at D3 until their own review is
 * complete; pool position and challenge labels never restore difficulty.
 */
export const YEAR8_AUDITED_HIGH_DIFFICULTIES: Readonly<Record<string, 4 | 5 | 6>> = {
  "y8-lin-pat-p17": 4,
  "y8-lin-pat-p18": 4,
  "y8-lin-pat-p19": 4,
  "y8-lin-pat-p20": 4,
  "y8-lin-pat-p21": 4,
  "y8-lin-coo-p17": 4,
  "y8-lin-coo-p18": 4,
  "y8-lin-coo-p19": 4,
  "y8-lin-coo-p20": 4,
  "y8-lin-coo-p21": 4,
  "y8-lin-tab-p17": 4,
  "y8-lin-tab-p18": 4,
  "y8-lin-tab-p19": 4,
  "y8-lin-tab-p20": 4,
  "y8-lin-tab-p21": 4,
  "y8-lin-gra-p17": 4,
  "y8-lin-gra-p18": 4,
  "y8-lin-gra-p19": 4,
  "y8-lin-gra-p20": 4,
  "y8-lin-gra-p21": 4,
  "y8-lin-grd-p17": 4,
  "y8-lin-grd-p18": 4,
  "y8-lin-grd-p19": 4,
  "y8-lin-grd-p20": 4,
  "y8-lin-grd-p21": 4,
  "y8-lin-int-p17": 4,
  "y8-lin-int-p18": 4,
  "y8-lin-int-p19": 4,
  "y8-lin-int-p20": 4,
  "y8-lin-int-p21": 4,
  "y8-pyth-intro-p20": 4,
  "y8-pyth-intro-p21": 4,
  "y8-pyth-intro-p22": 4,
  "y8-pyth-intro-p23": 4,
  "y8-pyth-intro-p24": 4,
  "y8-pyth-hyp-p17": 4,
  "y8-pyth-hyp-p18": 4,
  "y8-pyth-hyp-p19": 4,
  "y8-pyth-hyp-p20": 4,
  "y8-pyth-hyp-p21": 4,
  "y8-pyth-short-p17": 4,
  "y8-pyth-short-p18": 4,
  "y8-pyth-short-p19": 4,
  "y8-pyth-short-p20": 4,
  "y8-pyth-short-p21": 4,
  "y8-pyth-ctx-p17": 4,
  "y8-pyth-ctx-p18": 4,
  "y8-pyth-ctx-p19": 4,
  "y8-pyth-ctx-p20": 4,
  "y8-pyth-ctx-p21": 4,
  "y8-pyth-trip-p17": 4,
  "y8-pyth-trip-p18": 4,
  "y8-pyth-trip-p19": 4,
  "y8-pyth-trip-p20": 4,
  "y8-pyth-trip-p21": 4,
  "y8-pyth-dist-p17": 4,
  "y8-pyth-dist-p18": 4,
  "y8-pyth-dist-p19": 4,
  "y8-pyth-dist-p20": 4,
  "y8-pyth-dist-p21": 4,
  "y8-geo-tri-p18": 4,
  "y8-geo-tri-p19": 4,
  "y8-geo-tri-p20": 4,
  "y8-geo-tri-p21": 4,
  "y8-geo-tri-p22": 4,
  "y8-geo-tri-p23": 4,
  "y8-geo-pol-p18": 4,
  "y8-geo-pol-p19": 4,
  "y8-geo-pol-p20": 4,
  "y8-geo-pol-p21": 4,
  "y8-geo-pol-p22": 4,
  "y8-geo-pol-p23": 4,
  "y8-geo-con-p18": 4,
  "y8-geo-con-p19": 4,
  "y8-geo-con-p20": 4,
  "y8-geo-con-p21": 4,
  "y8-geo-con-p22": 4,
  "y8-geo-con-p23": 4,
  "y8-geo-rea-p17": 4,
  "y8-geo-rea-p18": 4,
  "y8-geo-rea-p19": 4,
  "y8-geo-rea-p20": 4,
  "y8-geo-rea-p21": 4,
  "y8-geo-rea-p22": 4,
  "y8-geo-qprop-p18": 4,
  "y8-geo-qprop-p19": 4,
  "y8-geo-qprop-p20": 4,
  "y8-geo-qprop-p21": 4,
  "y8-geo-qprop-p22": 4,
  "y8-geo-qprop-p23": 4,
  "y8-dat-avg-p19": 4,
  "y8-dat-avg-p20": 4,
  "y8-dat-avg-p21": 4,
  "y8-dat-avg-p22": 4,
  "y8-dat-avg-p23": 4,
  "y8-dat-avg-p24": 4,
  "y8-dat-cmp-p19": 4,
  "y8-dat-cmp-p20": 4,
  "y8-dat-cmp-p21": 4,
  "y8-dat-cmp-p22": 4,
  "y8-dat-cmp-p23": 4,
  "y8-dat-cmp-p24": 4,
  "y8-dat-stm-p19": 4,
  "y8-dat-stm-p20": 4,
  "y8-dat-stm-p21": 4,
  "y8-dat-stm-p22": 4,
  "y8-dat-stm-p23": 4,
  "y8-dat-stm-p24": 4,
  "y8-dat-qrt-p19": 4,
  "y8-dat-qrt-p20": 4,
  "y8-dat-qrt-p21": 4,
  "y8-dat-qrt-p22": 4,
  "y8-dat-qrt-p23": 4,
  "y8-dat-qrt-p24": 4,
  "y8-dat-out-p19": 4,
  "y8-dat-out-p20": 4,
  "y8-dat-out-p21": 4,
  "y8-dat-out-p22": 4,
  "y8-dat-out-p23": 4,
  "y8-dat-out-p24": 4,
  "y8-dat-bxp-p19": 4,
  "y8-dat-bxp-p20": 4,
  "y8-dat-bxp-p21": 4,
  "y8-dat-bxp-p22": 4,
  "y8-dat-bxp-p23": 4,
  "y8-dat-bxp-p24": 4,
  "y8-dat-cmpbxp-p19": 4,
  "y8-dat-cmpbxp-p20": 4,
  "y8-dat-cmpbxp-p21": 4,
  "y8-dat-cmpbxp-p22": 4,
  "y8-dat-cmpbxp-p23": 4,
  "y8-dat-cmpbxp-p24": 4,
  "y8-dat-shp-p19": 4,
  "y8-dat-shp-p20": 4,
  "y8-dat-shp-p21": 4,
  "y8-dat-shp-p22": 4,
  "y8-dat-shp-p23": 4,
  "y8-dat-shp-p24": 4,
  "y8-vsa-vp-p17": 4,
  "y8-vsa-vp-p18": 4,
  "y8-vsa-vp-p19": 4,
  "y8-vsa-vp-p20": 4,
  "y8-vsa-vp-p21": 4,
  "y8-vsa-sp-p17": 4,
  "y8-vsa-sp-p18": 4,
  "y8-vsa-sp-p19": 4,
  "y8-vsa-sp-p20": 4,
  "y8-vsa-sp-p21": 4,
  "y8-vsa-sc-p17": 4,
  "y8-vsa-sc-p18": 4,
  "y8-vsa-sc-p19": 4,
  "y8-vsa-sc-p20": 4,
  "y8-vsa-sc-p21": 4,
  "y8-vsa-cs-p17": 4,
  "y8-vsa-cs-p18": 4,
  "y8-vsa-cs-p19": 4,
  "y8-vsa-cs-p20": 4,
  "y8-vsa-cs-p21": 4,
  "y8-vsa-vc-p17": 4,
  "y8-vsa-vc-p18": 4,
  "y8-vsa-vc-p19": 4,
  "y8-vsa-vc-p20": 4,
  "y8-vsa-vc-p21": 4,
  "y8-vsa-cv-p17": 4,
  "y8-vsa-cv-p18": 4,
  "y8-vsa-cv-p19": 4,
  "y8-vsa-cv-p20": 4,
  "y8-vsa-cv-p21": 4,
  "y8-net-fun-p19": 4,
  "y8-net-fun-p20": 4,
  "y8-net-fun-p21": 4,
  "y8-net-fun-p22": 4,
  "y8-net-fun-p23": 4,
  "y8-net-fun-p24": 4,
  "y8-net-pc-p19": 4,
  "y8-net-pc-p20": 4,
  "y8-net-pc-p21": 4,
  "y8-net-pc-p22": 4,
  "y8-net-pc-p23": 4,
  "y8-net-pc-p24": 4,
  "y8-net-eul-p19": 4,
  "y8-net-eul-p20": 4,
  "y8-net-eul-p21": 4,
  "y8-net-eul-p22": 4,
  "y8-net-eul-p23": 4,
  "y8-net-eul-p24": 4,
  "y8-net-pl-p19": 4,
  "y8-net-pl-p20": 4,
  "y8-net-pl-p21": 4,
  "y8-net-pl-p22": 4,
  "y8-net-pl-p23": 4,
  "y8-net-pl-p24": 4,
  "y8-net-app-p19": 4,
  "y8-net-app-p20": 4,
  "y8-net-app-p21": 4,
  "y8-net-app-p22": 4,
  "y8-net-app-p23": 4,
  "y8-net-app-p24": 4,
  "y8-alg-af-p19": 4,
  "y8-alg-af-p20": 4,
  "y8-alg-af-p21": 4,
  "y8-alg-af-p22": 4,
  "y8-alg-af-p23": 4,
  "y8-alg-ee-p19": 4,
  "y8-alg-ee-p20": 4,
  "y8-alg-ee-p21": 4,
  "y8-alg-ee-p22": 4,
  "y8-alg-ee-p23": 4,
  "y8-alg-bp-p19": 4,
  "y8-alg-bp-p20": 4,
  "y8-alg-bp-p21": 4,
  "y8-alg-bp-p22": 4,
  "y8-alg-bp-p23": 4,
  "y8-alg-eq-p19": 4,
  "y8-alg-eq-p20": 4,
  "y8-alg-eq-p21": 4,
  "y8-alg-eq-p22": 4,
  "y8-alg-eq-p23": 4,
  "y8-ile-neg-p17": 4,
  "y8-ile-neg-p18": 4,
  "y8-ile-neg-p19": 4,
  "y8-ile-neg-p20": 4,
  "y8-ile-neg-p21": 4,
  "y8-ile-snl-p17": 4,
  "y8-ile-snl-p18": 4,
  "y8-ile-snl-p19": 4,
  "y8-ile-snl-p20": 4,
  "y8-ile-snl-p21": 4,
  "y8-ile-sns-p17": 4,
  "y8-ile-sns-p18": 4,
  "y8-ile-sns-p19": 4,
  "y8-ile-sns-p20": 4,
  "y8-ile-sns-p21": 4,
  "y8-ile-sig-p17": 4,
  "y8-ile-sig-p18": 4,
  "y8-ile-sig-p19": 4,
  "y8-ile-sig-p20": 4,
  "y8-ile-sig-p21": 4,
  "y8-ile-ops-p17": 4,
  "y8-ile-ops-p18": 4,
  "y8-ile-ops-p19": 4,
  "y8-ile-ops-p20": 4,
  "y8-ile-ops-p21": 4,
  "y8-iadv-p17": 4,
  "y8-iadv-p18": 4,
  "y8-iadv-p19": 4,
  "y8-iadv-p20": 4,
  "y8-iadv-p21": 4,
  "y8-iadv-p22": 4,
  "y8-ialg-p17": 4,
  "y8-ialg-p18": 4,
  "y8-ialg-p19": 4,
  "y8-ialg-p20": 4,
  "y8-ialg-p21": 4,
  "y8-ialg-p22": 4,
  "y8-ieq-p17": 4,
  "y8-ieq-p18": 4,
  "y8-ieq-p19": 4,
  "y8-ieq-p20": 4,
  "y8-ieq-p21": 4,
  "y8-ieq-p22": 4,
  "y8-fin-si-p16": 4,
  "y8-fin-si-p17": 4,
  "y8-fin-si-p18": 4,
  "y8-fin-si-p19": 4,
  "y8-fin-si-p20": 4,
  "y8-nfm-wag-p16": 4,
  "y8-nfm-wag-p17": 4,
  "y8-nfm-wag-p18": 4,
  "y8-nfm-wag-p19": 4,
  "y8-nfm-wag-p20": 4,
  "y8-nfm-tax-p16": 4,
  "y8-nfm-tax-p17": 4,
  "y8-nfm-tax-p18": 4,
  "y8-nfm-tax-p19": 4,
  "y8-nfm-tax-p20": 4,
  "y8-nfm-bud-p16": 4,
  "y8-nfm-bud-p17": 4,
  "y8-nfm-bud-p18": 4,
  "y8-nfm-bud-p19": 4,
  "y8-nfm-bud-p20": 4,
  "y8-nfm-crd-p16": 4,
  "y8-nfm-crd-p17": 4,
  "y8-nfm-crd-p18": 4,
  "y8-nfm-crd-p19": 4,
  "y8-nfm-crd-p20": 4,
  "y8-dai-sq-p19": 4,
  "y8-dai-sq-p20": 4,
  "y8-dai-sq-p21": 4,
  "y8-dai-sq-p22": 4,
  "y8-dai-sq-p23": 4,
  "y8-dai-sq-p24": 4,
  "y8-dai-dc-p19": 4,
  "y8-dai-dc-p20": 4,
  "y8-dai-dc-p21": 4,
  "y8-dai-dc-p22": 4,
  "y8-dai-dc-p23": 4,
  "y8-dai-dc-p24": 4,
  "y8-dai-sa-p19": 4,
  "y8-dai-sa-p20": 4,
  "y8-dai-sa-p21": 4,
  "y8-dai-sa-p22": 4,
  "y8-dai-sa-p23": 4,
  "y8-dai-sa-p24": 4,
  "y8-dai-cf-p19": 4,
  "y8-dai-cf-p20": 4,
  "y8-dai-cf-p21": 4,
  "y8-dai-cf-p22": 4,
  "y8-dai-cf-p23": 4,
  "y8-dai-cf-p24": 4,
  "y8-lin-pat-p22": 5,
  "y8-lin-pat-p23": 5,
  "y8-lin-pat-p24": 5,
  "y8-lin-pat-p25": 5,
  "y8-lin-pat-p26": 5,
  "y8-lin-coo-p22": 5,
  "y8-lin-coo-p23": 5,
  "y8-lin-coo-p24": 5,
  "y8-lin-coo-p25": 5,
  "y8-lin-coo-p26": 5,
  "y8-lin-tab-p22": 5,
  "y8-lin-tab-p23": 5,
  "y8-lin-tab-p24": 5,
  "y8-lin-tab-p25": 5,
  "y8-lin-tab-p26": 5,
  "y8-lin-gra-p22": 5,
  "y8-lin-gra-p23": 5,
  "y8-lin-gra-p24": 5,
  "y8-lin-gra-p25": 5,
  "y8-lin-gra-p26": 5,
  "y8-lin-grd-p22": 5,
  "y8-lin-grd-p23": 5,
  "y8-lin-grd-p24": 5,
  "y8-lin-grd-p25": 5,
  "y8-lin-grd-p26": 5,
  "y8-lin-int-p22": 5,
  "y8-lin-int-p23": 5,
  "y8-lin-int-p24": 5,
  "y8-lin-int-p25": 5,
  "y8-lin-int-p26": 5,
  "y8-pyth-intro-p25": 5,
  "y8-pyth-intro-p26": 5,
  "y8-pyth-hyp-p22": 5,
  "y8-pyth-hyp-p23": 5,
  "y8-pyth-hyp-p24": 5,
  "y8-pyth-hyp-p25": 5,
  "y8-pyth-short-p22": 5,
  "y8-pyth-short-p23": 5,
  "y8-pyth-short-p24": 5,
  "y8-pyth-short-p25": 5,
  "y8-pyth-ctx-p22": 5,
  "y8-pyth-ctx-p23": 5,
  "y8-pyth-ctx-p24": 5,
  "y8-pyth-ctx-p25": 5,
  "y8-pyth-trip-p22": 5,
  "y8-pyth-trip-p23": 5,
  "y8-pyth-trip-p24": 5,
  "y8-pyth-trip-p25": 5,
  "y8-pyth-dist-p22": 5,
  "y8-pyth-dist-p23": 5,
  "y8-pyth-dist-p24": 5,
  "y8-pyth-dist-p25": 5,
  "y8-geo-tri-p24": 5,
  "y8-geo-tri-p25": 5,
  "y8-geo-tri-p26": 5,
  "y8-geo-tri-p27": 5,
  "y8-geo-tri-p28": 5,
  "y8-geo-pol-p24": 5,
  "y8-geo-pol-p25": 5,
  "y8-geo-pol-p26": 5,
  "y8-geo-pol-p27": 5,
  "y8-geo-pol-p28": 5,
  "y8-geo-con-p24": 5,
  "y8-geo-con-p25": 5,
  "y8-geo-con-p26": 5,
  "y8-geo-con-p27": 5,
  "y8-geo-con-p28": 5,
  "y8-geo-rea-p23": 5,
  "y8-geo-rea-p24": 5,
  "y8-geo-rea-p25": 5,
  "y8-geo-rea-p26": 5,
  "y8-geo-rea-p27": 5,
  "y8-geo-rea-p28": 5,
  "y8-geo-qprop-p24": 5,
  "y8-geo-qprop-p25": 5,
  "y8-geo-qprop-p26": 5,
  "y8-geo-qprop-p27": 5,
  "y8-geo-qprop-p28": 5,
  "y8-dat-avg-p25": 5,
  "y8-dat-avg-p26": 5,
  "y8-dat-avg-p27": 5,
  "y8-dat-avg-p28": 5,
  "y8-dat-avg-p29": 5,
  "y8-dat-avg-p30": 5,
  "y8-dat-cmp-p25": 5,
  "y8-dat-cmp-p26": 5,
  "y8-dat-cmp-p27": 5,
  "y8-dat-cmp-p28": 5,
  "y8-dat-cmp-p29": 5,
  "y8-dat-cmp-p30": 5,
  "y8-dat-stm-p25": 5,
  "y8-dat-stm-p26": 5,
  "y8-dat-stm-p27": 5,
  "y8-dat-stm-p28": 5,
  "y8-dat-stm-p29": 5,
  "y8-dat-stm-p30": 5,
  "y8-dat-qrt-p25": 5,
  "y8-dat-qrt-p26": 5,
  "y8-dat-qrt-p27": 5,
  "y8-dat-qrt-p28": 5,
  "y8-dat-qrt-p29": 5,
  "y8-dat-qrt-p30": 5,
  "y8-dat-out-p25": 5,
  "y8-dat-out-p26": 5,
  "y8-dat-out-p27": 5,
  "y8-dat-out-p28": 5,
  "y8-dat-out-p29": 5,
  "y8-dat-out-p30": 5,
  "y8-dat-bxp-p25": 5,
  "y8-dat-bxp-p26": 5,
  "y8-dat-bxp-p27": 5,
  "y8-dat-bxp-p28": 5,
  "y8-dat-bxp-p29": 5,
  "y8-dat-bxp-p30": 5,
  "y8-dat-cmpbxp-p25": 5,
  "y8-dat-cmpbxp-p26": 5,
  "y8-dat-cmpbxp-p27": 5,
  "y8-dat-cmpbxp-p28": 5,
  "y8-dat-cmpbxp-p29": 5,
  "y8-dat-cmpbxp-p30": 5,
  "y8-dat-shp-p25": 5,
  "y8-dat-shp-p26": 5,
  "y8-dat-shp-p27": 5,
  "y8-dat-shp-p28": 5,
  "y8-dat-shp-p29": 5,
  "y8-dat-shp-p30": 5,
  "y8-vsa-sp-p22": 5,
  "y8-vsa-sp-p23": 5,
  "y8-vsa-sp-p24": 5,
  "y8-vsa-sp-p25": 5,
  "y8-vsa-sp-p26": 5,
  "y8-vsa-sc-p22": 5,
  "y8-vsa-sc-p23": 5,
  "y8-vsa-sc-p24": 5,
  "y8-vsa-sc-p25": 5,
  "y8-vsa-sc-p26": 5,
  "y8-vsa-cs-p22": 5,
  "y8-vsa-cs-p23": 5,
  "y8-vsa-cs-p24": 5,
  "y8-vsa-cs-p25": 5,
  "y8-vsa-cs-p26": 5,
  "y8-vsa-vp-p22": 5,
  "y8-vsa-vp-p23": 5,
  "y8-vsa-vp-p24": 5,
  "y8-vsa-vp-p25": 5,
  "y8-vsa-vp-p26": 5,
  "y8-vsa-vc-p22": 5,
  "y8-vsa-vc-p23": 5,
  "y8-vsa-vc-p24": 5,
  "y8-vsa-vc-p25": 5,
  "y8-vsa-vc-p26": 5,
  "y8-vsa-cv-p22": 5,
  "y8-vsa-cv-p23": 5,
  "y8-vsa-cv-p24": 5,
  "y8-vsa-cv-p25": 5,
  "y8-vsa-cv-p26": 5,
  "y8-net-fun-p25": 5,
  "y8-net-fun-p26": 5,
  "y8-net-fun-p27": 5,
  "y8-net-fun-p28": 5,
  "y8-net-fun-p29": 5,
  "y8-net-fun-p30": 5,
  "y8-net-pc-p25": 5,
  "y8-net-pc-p26": 5,
  "y8-net-pc-p27": 5,
  "y8-net-pc-p28": 5,
  "y8-net-pc-p29": 5,
  "y8-net-pc-p30": 5,
  "y8-net-eul-p25": 5,
  "y8-net-eul-p26": 5,
  "y8-net-eul-p27": 5,
  "y8-net-eul-p28": 5,
  "y8-net-eul-p29": 5,
  "y8-net-eul-p30": 5,
  "y8-net-pl-p25": 5,
  "y8-net-pl-p26": 5,
  "y8-net-pl-p27": 5,
  "y8-net-pl-p28": 5,
  "y8-net-pl-p29": 5,
  "y8-net-pl-p30": 5,
  "y8-net-app-p25": 5,
  "y8-net-app-p26": 5,
  "y8-net-app-p27": 5,
  "y8-net-app-p28": 5,
  "y8-net-app-p29": 5,
  "y8-net-app-p30": 5,
  "y8-alg-af-p24": 5,
  "y8-alg-af-p25": 5,
  "y8-alg-af-p26": 5,
  "y8-alg-af-p27": 5,
  "y8-alg-af-p28": 5,
  "y8-alg-ee-p24": 5,
  "y8-alg-ee-p25": 5,
  "y8-alg-ee-p26": 5,
  "y8-alg-ee-p27": 5,
  "y8-alg-ee-p28": 5,
  "y8-alg-bp-p24": 5,
  "y8-alg-bp-p25": 5,
  "y8-alg-bp-p26": 5,
  "y8-alg-bp-p27": 5,
  "y8-alg-bp-p28": 5,
  "y8-alg-eq-p24": 5,
  "y8-alg-eq-p25": 5,
  "y8-alg-eq-p26": 5,
  "y8-alg-eq-p27": 5,
  "y8-alg-eq-p28": 5,
  "y8-ile-neg-p22": 5,
  "y8-ile-neg-p23": 5,
  "y8-ile-neg-p24": 5,
  "y8-ile-neg-p25": 5,
  "y8-ile-neg-p26": 5,
  "y8-ile-snl-p22": 5,
  "y8-ile-snl-p23": 5,
  "y8-ile-snl-p24": 5,
  "y8-ile-snl-p25": 5,
  "y8-ile-sns-p22": 5,
  "y8-ile-sns-p23": 5,
  "y8-ile-sns-p24": 5,
  "y8-ile-sns-p25": 5,
  "y8-ile-sig-p22": 5,
  "y8-ile-sig-p23": 5,
  "y8-ile-sig-p24": 5,
  "y8-ile-sig-p25": 5,
  "y8-ile-ops-p22": 5,
  "y8-ile-ops-p23": 5,
  "y8-ile-ops-p24": 5,
  "y8-ile-ops-p25": 5,
  "y8-iadv-p23": 5,
  "y8-iadv-p24": 5,
  "y8-iadv-p25": 5,
  "y8-iadv-p26": 5,
  "y8-iadv-p27": 5,
  "y8-iadv-p28": 5,
  "y8-iadv-p29": 5,
  "y8-iadv-p30": 5,
  "y8-ialg-p23": 5,
  "y8-ialg-p24": 5,
  "y8-ialg-p25": 5,
  "y8-ialg-p26": 5,
  "y8-ialg-p27": 5,
  "y8-ialg-p28": 5,
  "y8-ialg-p29": 5,
  "y8-ialg-p30": 5,
  "y8-ieq-p23": 5,
  "y8-ieq-p24": 5,
  "y8-ieq-p25": 5,
  "y8-ieq-p26": 5,
  "y8-ieq-p27": 5,
  "y8-ieq-p28": 5,
  "y8-ieq-p29": 5,
  "y8-ieq-p30": 5,
  "y8-fin-si-p21": 5,
  "y8-fin-si-p22": 5,
  "y8-fin-si-p23": 5,
  "y8-fin-si-p24": 5,
  "y8-fin-si-p25": 5,
  "y8-fin-si-p26": 5,
  "y8-nfm-wag-p21": 5,
  "y8-nfm-wag-p22": 5,
  "y8-nfm-wag-p23": 5,
  "y8-nfm-wag-p24": 5,
  "y8-nfm-wag-p24b": 5,
  "y8-nfm-wag-p25": 5,
  "y8-nfm-tax-p21": 5,
  "y8-nfm-tax-p22": 5,
  "y8-nfm-tax-p23": 5,
  "y8-nfm-tax-p24": 5,
  "y8-nfm-tax-p25": 5,
  "y8-nfm-tax-p26": 5,
  "y8-nfm-bud-p21": 5,
  "y8-nfm-bud-p22": 5,
  "y8-nfm-bud-p23": 5,
  "y8-nfm-bud-p24": 5,
  "y8-nfm-bud-p25": 5,
  "y8-nfm-bud-p26": 5,
  "y8-nfm-crd-p21": 5,
  "y8-nfm-crd-p22": 5,
  "y8-nfm-crd-p23": 5,
  "y8-nfm-crd-p24": 5,
  "y8-nfm-crd-p25": 5,
  "y8-nfm-crd-p26": 5,
  "y8-dai-sq-p25": 5,
  "y8-dai-sq-p26": 5,
  "y8-dai-sq-p27": 5,
  "y8-dai-sq-p28": 5,
  "y8-dai-sq-p29": 5,
  "y8-dai-sq-p30": 5,
  "y8-dai-dc-p25": 5,
  "y8-dai-dc-p26": 5,
  "y8-dai-dc-p27": 5,
  "y8-dai-dc-p28": 5,
  "y8-dai-dc-p29": 5,
  "y8-dai-dc-p30": 5,
  "y8-dai-sa-p25": 5,
  "y8-dai-sa-p26": 5,
  "y8-dai-sa-p27": 5,
  "y8-dai-sa-p28": 5,
  "y8-dai-sa-p29": 5,
  "y8-dai-sa-p30": 5,
  "y8-dai-cf-p25": 5,
  "y8-dai-cf-p26": 5,
  "y8-dai-cf-p27": 5,
  "y8-dai-cf-p28": 5,
  "y8-dai-cf-p29": 5,
  "y8-dai-cf-p30": 5,
};

export function inferDifficulty(
  question: PracticeQuestion,
  section: PracticeSection = "guidedPractice",
  position = 0,
  courseSlug?: string,
) {
  const prompt = `${question.prompt} ${question.latex}`.toLowerCase();

  if (courseSlug === "year-11-advanced") {
    const audited = YEAR11_ADVANCED_AUDITED_DIFFICULTIES[question.id];
    if (audited !== undefined) {
      return audited;
    }

    // The remaining reviewed high-tier questions do not meet D4+. Retain any
    // explicitly authored lower rating, otherwise use a conservative section
    // baseline without promoting questions because they occur late in a quiz.
    if (typeof question.difficulty === "number" && question.difficulty <= 3) {
      return question.difficulty;
    }
    if (section === "guidedPractice") {
      return question.choices?.length ? 1 : 2;
    }
    if (section === "independentPractice") {
      return position >= 3 ? 3 : 2;
    }
    return 3;
  }

  if (courseSlug === "year-8-mathematics") {
    const audited = YEAR8_AUDITED_HIGH_DIFFICULTIES[question.id];
    if (audited !== undefined) return audited;

    // Every question previously emitted as D4-D6 was reviewed against the
    // absolute authoring standard. None meets the D4 transfer threshold:
    // late mastery-pool position, multipart scaffolding and a "challenge"
    // label do not increase cognitive demand.
    if (typeof question.difficulty === "number" && question.difficulty <= 3) {
      return question.difficulty;
    }
    if (section === "guidedPractice") {
      return question.choices?.length ? 1 : 2;
    }
    if (section === "independentPractice") {
      return position >= 3 ? 3 : 2;
    }
    return 3;
  }

  // Respect an explicitly authored difficulty (mastery-quiz pools carry one).
  if (typeof question.difficulty === "number") {
    return question.difficulty;
  }

  // Level-6 challenge questions are the hardest tier.
  if (section === "challenge") {
    return 6;
  }

  // Multi-part questions are HSC Section II / synoptic exam style → D6.
  if (section === "multiPartPractice") {
    return 6;
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

export function mapPracticeQuestionToQuestionRow(
  question: PracticeQuestion,
  context: QuestionMappingContext
): QuestionRow {
  const inferredQuestion = applyQuestionVisualStandards(question);
  const preparedQuestion = context.courseSlug === "year-12-standard-2"
    ? applyYear12Standard2QuestionDiagramRemediation(inferredQuestion)
    : context.courseSlug === "year-9-mathematics-core"
      ? applyYear9CoreQuestionDiagramRemediation(inferredQuestion)
      : inferredQuestion;
  const section = context.section ?? "guidedPractice";
  const position = context.position ?? 0;

  // Year 12 Standard 1 prompts are self-contained, so the $$...$$ block under a
  // question only ever shows the worked method, a substituted formula, an
  // answer-revealing comparison, or an instruction - all giveaways. Drop it.
  const latex =
    context.courseSlug === "year-12-standard-1"
      ? null
      : isGenericMcqInstructionLatex(preparedQuestion.latex)
        ? null
        : preparedQuestion.latex || null;

  return {
    source_id: preparedQuestion.id,
    topic_slug: context.topicSlug,
    subtopic_slug: context.subtopicSlug,
    year_level: context.yearLevel,
    course_slug: context.courseSlug,
    difficulty: inferDifficulty(
      preparedQuestion,
      section,
      position,
      context.courseSlug,
    ),
    question_type: preparedQuestion.choices?.length ? "conceptual" : "procedural",
    prompt: preparedQuestion.prompt,
    latex,
    choices: normaliseChoices(preparedQuestion),
    question_parts: normaliseQuestionParts(preparedQuestion),
    answer: preparedQuestion.answer,
    accepted_answers: preparedQuestion.acceptedAnswers ?? [],
    hint: preparedQuestion.hint ?? null,
    explanation:
      preparedQuestion.explanation ??
      "Review the worked method and compare each step with the expected answer.",
    syllabus_ref: context.syllabusRef ?? null,
    transfer_from_topics: context.transferFromTopics ?? [],
    is_active: true,
    diagram_data: extractDiagramData(preparedQuestion),
  };
}

function questionSections(lesson: ExplicitLesson, courseSlug?: string) {
  const sections: [PracticeSection, PracticeQuestion[]][] = [
    ["guidedPractice", lesson.guidedPractice],
    ["independentPractice", lesson.independentPractice],
    ["masteryQuiz", lesson.masteryQuiz],
  ];
  if (lesson.multiPartPractice && lesson.multiPartPractice.length > 0) {
    sections.push(["multiPartPractice", lesson.multiPartPractice]);
  }
  // The larger difficulty-tagged mastery pool (when a lesson has one).
  if (lesson.masteryQuizPool && lesson.masteryQuizPool.length > 0) {
    sections.push(["masteryQuizPool", lesson.masteryQuizPool]);
  }
  // Level-6 challenge questions registered against this lesson's slug.
  const challengeQuestions = getChallengeQuestions(lesson.slug, courseSlug);
  if (challengeQuestions.length > 0) {
    sections.push(["challenge", challengeQuestions]);
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
      const lessonSeed = unit.lessons.find((item) => item.slug === lesson.slug);
      if (lessonSeed?.seedQuestions === false) {
        warnings.push({
          sourceId: `${course.slug}/${unit.slug}/${lesson.slug}`,
          reason: "Skipped catalogue-only legacy lesson; seedQuestions is false.",
        });
        continue;
      }

      if (isGeneratedCatalogueFallbackLesson(lesson)) {
        warnings.push({
          sourceId: `${course.slug}/${unit.slug}/${lesson.slug}`,
          reason: "Skipped generated catalogue fallback lesson; no real lesson override exists yet.",
        });
        continue;
      }

      for (const [section, questions] of questionSections(lesson, course.slug)) {
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
      for (const [section, questions] of questionSections(lesson, year12AdvancedCourse.courseSlug)) {
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

export function collectQuestionsFromCourses(courseSlugs: string[]) {
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

function clampDifficulty(value: number): number {
  if (!Number.isFinite(value)) return 6;
  return Math.max(1, Math.min(6, Math.round(value)));
}

function yearLevelFromCourseSlug(courseSlug: string): string {
  const match = courseSlug.match(/^year-(\d+)/);
  return match ? `Year ${match[1]}` : "";
}

// Map the exam-readiness tier (lib/exams) into the question bank under a dedicated
// "exam-practice" topic per course. These are synoptic D6 items; they keep their
// authored difficulty (1–6) and so flow into the harder worksheet presets.
export function collectExamQuestions() {
  const rows: QuestionRow[] = [];
  const warnings: ImportWarning[] = [];

  for (const paper of getAllExamPapers()) {
    for (const question of examQuestions(paper)) {
      const hasParts = Array.isArray(question.parts) && question.parts.length > 0;
      const pseudo: PracticeQuestion = {
        id: question.id,
        prompt: question.prompt,
        latex: question.latex ?? "",
        difficulty: clampDifficulty(question.difficulty),
        answer: question.answer ?? (hasParts ? "See parts below." : ""),
        acceptedAnswers: question.acceptedAnswers,
        choices: question.choices as PracticeQuestion["choices"],
        parts: question.parts as PracticeQuestion["parts"],
        explanation: question.explanation,
        ...pickDiagramFields(question),
      };

      const sourceId = `exam/${paper.id}/${question.id}`;
      if (!isRealQuestion(pseudo)) {
        warnings.push({ sourceId, reason: "Skipped incomplete exam question." });
        continue;
      }

      const row = mapPracticeQuestionToQuestionRow(pseudo, {
        topicSlug: "exam-practice",
        subtopicSlug: question.topicSlug,
        yearLevel: yearLevelFromCourseSlug(paper.courseSlug),
        courseSlug: paper.courseSlug,
        syllabusRef: question.topicTitle,
      });
      row.source_id = sourceId;
      rows.push(row);
    }
  }

  return { rows, warnings };
}

// Everything the current catalog should produce: lesson practice (+ pools +
// challenges) plus the exam tier. Used by both the seeder and the prune tool so
// they always agree on what is valid.
export function collectAllQuestions(courseSlugs: string[]) {
  const base = collectQuestionsFromCourses(courseSlugs);
  const exam = collectExamQuestions();
  const courseSet = new Set(courseSlugs);
  const seen = new Set(base.rows.map((row) => row.source_id));
  const rows = [...base.rows];
  const warnings = [...base.warnings, ...exam.warnings];

  for (const row of exam.rows) {
    if (!courseSet.has(row.course_slug)) continue;
    if (seen.has(row.source_id)) continue;
    seen.add(row.source_id);
    rows.push(row);
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

  let upsertedCount = 0;
  const batchSize = 500;

  for (let index = 0; index < rows.length; index += batchSize) {
    const batch = rows.slice(index, index + batchSize);
    const { data, error } = await supabase
      .from("questions")
      .upsert(batch, { onConflict: "source_id" })
      .select("id,source_id");

    if (error) {
      const batchNumber = Math.floor(index / batchSize) + 1;
      throw new Error(
        `Could not seed question bank batch ${batchNumber}: ${error.message}`
      );
    }

    upsertedCount += data?.length ?? 0;
  }

  return upsertedCount;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const { rows, warnings } = collectAllQuestions(options.courseSlugs);

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

// Only run the seed when this file is the entry point — allows other scripts
// (e.g. prune-question-bank) to import the collectors without triggering a seed.
if (process.argv[1] && process.argv[1].includes("seed-question-bank")) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
