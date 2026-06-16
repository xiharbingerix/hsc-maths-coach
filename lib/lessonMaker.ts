import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "./lessons/differentialCalculus";
import type {
  ArgandDiagram,
  BoxPlotDiagram,
  CartesianGraph,
  NetworkDiagram,
  NormalDistributionDiagram,
  NumberLineDiagram,
  PolynomialCurveDiagram,
  ProbabilityTreeDiagram,
  SlopeFieldDiagram,
  TrigGraphDiagram,
  TrapezoidalRuleDiagram,
  TriangleDiagram,
  TwoWayTableDiagram,
  UnitCircleDiagram,
  Vector3DDiagram,
  VennDiagram,
} from "./lessons/types";

export type LessonLength = 30 | 45 | 60;
export type StudentLevel = "struggling" | "on-level" | "extension";

// ── Serialisable output types (returned from server action) ──────────────────

export interface TutorQuestion {
  id: string;
  prompt: string;
  displayLatex: string;
  isMultipleChoice: boolean;
  choices?: { label: string; text: string }[];
  answer: string;
  hint?: string;
  explanation?: string;
  diagram?: NetworkDiagram;
  triangleDiagram?: TriangleDiagram;
  cartesianGraph?: CartesianGraph;
  unitCircleDiagram?: UnitCircleDiagram;
  trigGraphDiagram?: TrigGraphDiagram;
  argandDiagram?: ArgandDiagram;
  vector3DDiagram?: Vector3DDiagram;
  trapezoidalRuleDiagram?: TrapezoidalRuleDiagram;
  boxPlotDiagram?: BoxPlotDiagram;
  normalDistributionDiagram?: NormalDistributionDiagram;
  polynomialCurveDiagram?: PolynomialCurveDiagram;
  probabilityTreeDiagram?: ProbabilityTreeDiagram;
  slopeFieldDiagram?: SlopeFieldDiagram;
  numberLineDiagram?: NumberLineDiagram;
  twoWayTableDiagram?: TwoWayTableDiagram;
  vennDiagram?: VennDiagram;
}

export interface TutorWorkedExample {
  title: string;
  questionLatex: string;
  steps: { explanation: string; latex?: string }[];
  finalAnswerLatex: string;
  diagram?: NetworkDiagram;
  triangleDiagram?: TriangleDiagram;
  cartesianGraph?: CartesianGraph;
  unitCircleDiagram?: UnitCircleDiagram;
  trigGraphDiagram?: TrigGraphDiagram;
  argandDiagram?: ArgandDiagram;
  vector3DDiagram?: Vector3DDiagram;
  trapezoidalRuleDiagram?: TrapezoidalRuleDiagram;
  boxPlotDiagram?: BoxPlotDiagram;
  normalDistributionDiagram?: NormalDistributionDiagram;
  polynomialCurveDiagram?: PolynomialCurveDiagram;
  probabilityTreeDiagram?: ProbabilityTreeDiagram;
  slopeFieldDiagram?: SlopeFieldDiagram;
  numberLineDiagram?: NumberLineDiagram;
  twoWayTableDiagram?: TwoWayTableDiagram;
  vennDiagram?: VennDiagram;
}

export interface TutorMisconception {
  mistake: string;
  fix: string;
}

export interface TutorTextSection {
  kind: "text";
  id: string;
  heading: string;
  minutes: number;
  paragraphs: string[];
}

export interface TutorFormulasSection {
  kind: "formulas";
  id: string;
  heading: string;
  minutes: number;
  blocks: string[];
  note?: string;
}

export interface TutorCriteriaSection {
  kind: "criteria";
  id: string;
  heading: string;
  minutes: number;
  items: string[];
}

export interface TutorQuestionsSection {
  kind: "questions";
  id: string;
  heading: string;
  minutes: number;
  questions: TutorQuestion[];
}

export interface TutorWorkedExampleSection {
  kind: "worked-example";
  id: string;
  heading: string;
  minutes: number;
  example: TutorWorkedExample;
}

export interface TutorMisconceptionsSection {
  kind: "misconceptions";
  id: string;
  heading: string;
  minutes: number;
  items: TutorMisconception[];
}

export interface TutorPromptsSection {
  kind: "prompts";
  id: string;
  heading: string;
  minutes: number;
  prompts: string[];
}

export interface TutorHomeworkSection {
  kind: "homework";
  id: string;
  heading: string;
  minutes: number;
  suggestion: string;
}

export type TutorSection =
  | TutorTextSection
  | TutorFormulasSection
  | TutorCriteriaSection
  | TutorQuestionsSection
  | TutorWorkedExampleSection
  | TutorMisconceptionsSection
  | TutorPromptsSection
  | TutorHomeworkSection;

export interface TutorLessonPlan {
  title: string;
  course: string;
  unit: string;
  syllabusArea: string;
  length: LessonLength;
  level: StudentLevel;
  generatedAt: string;
  learningGoal: string;
  successCriteria: string[];
  sections: TutorSection[];
}

// ── Placeholder detection ─────────────────────────────────────────────────────

const FALLBACK_SIGNALS = [
  "Short calculation for",
  "Choose the best method for this",
  "Choose the relevant formula or representation",
  "Ignore the context and choose the largest number",
];

export function detectPlaceholderLesson(lesson: ExplicitLesson): string | null {
  const corpus = [
    ...lesson.guidedPractice.map((q) => q.prompt),
    ...lesson.workedExamples.map((e) => `${e.title} ${e.questionLatex}`),
    ...(lesson.workedExamples[0]?.steps ?? []).map((s) => s.explanation),
    lesson.teaching.latexBlocks.join(" "),
    ...(lesson.guidedPractice.flatMap((q) => q.choices?.map((c) => c.text) ?? [])),
  ].join("\n");

  for (const signal of FALLBACK_SIGNALS) {
    if (corpus.includes(signal)) return signal;
  }
  return null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const GENERIC_MCQ_LATEX = "\\text{Select A, B, C, or D.}";

function toTutorQuestion(q: PracticeQuestion): TutorQuestion {
  return {
    id: q.id,
    prompt: q.prompt,
    // Suppress the generic MCQ placeholder formula — it adds no information when choices are shown
    displayLatex: q.latex === GENERIC_MCQ_LATEX ? "" : q.latex,
    isMultipleChoice: !!q.choices,
    choices: q.choices,
    answer: q.answer,
    hint: q.hint,
    explanation: q.explanation,
    diagram: q.diagram,
    triangleDiagram: q.triangleDiagram,
    cartesianGraph: q.cartesianGraph,
    unitCircleDiagram: q.unitCircleDiagram,
    trigGraphDiagram: q.trigGraphDiagram,
    argandDiagram: q.argandDiagram,
    vector3DDiagram: q.vector3DDiagram,
    trapezoidalRuleDiagram: q.trapezoidalRuleDiagram,
    boxPlotDiagram: q.boxPlotDiagram,
    normalDistributionDiagram: q.normalDistributionDiagram,
    polynomialCurveDiagram: q.polynomialCurveDiagram,
    probabilityTreeDiagram: q.probabilityTreeDiagram,
    slopeFieldDiagram: q.slopeFieldDiagram,
    numberLineDiagram: q.numberLineDiagram,
    twoWayTableDiagram: q.twoWayTableDiagram,
    vennDiagram: q.vennDiagram,
  };
}

function toTutorWorkedExample(ex: WorkedExample): TutorWorkedExample {
  return {
    title: ex.title,
    questionLatex: ex.questionLatex,
    steps: ex.steps.map((s) => ({ explanation: s.explanation, latex: s.latex })),
    finalAnswerLatex: ex.finalAnswerLatex,
    diagram: ex.diagram,
    triangleDiagram: ex.triangleDiagram,
    cartesianGraph: ex.cartesianGraph,
    unitCircleDiagram: ex.unitCircleDiagram,
    trigGraphDiagram: ex.trigGraphDiagram,
    argandDiagram: ex.argandDiagram,
    vector3DDiagram: ex.vector3DDiagram,
    trapezoidalRuleDiagram: ex.trapezoidalRuleDiagram,
    boxPlotDiagram: ex.boxPlotDiagram,
    normalDistributionDiagram: ex.normalDistributionDiagram,
    polynomialCurveDiagram: ex.polynomialCurveDiagram,
    probabilityTreeDiagram: ex.probabilityTreeDiagram,
    slopeFieldDiagram: ex.slopeFieldDiagram,
    numberLineDiagram: ex.numberLineDiagram,
    twoWayTableDiagram: ex.twoWayTableDiagram,
    vennDiagram: ex.vennDiagram,
  };
}

function criteriaToTeacherQuestions(criteria: string[]): string[] {
  return criteria.map((c) => {
    const clean = c.replace(/\.$/, "");
    const lower = clean.toLowerCase();
    if (/^identify/i.test(clean)) return `How do you ${lower}?`;
    if (/^choose/i.test(clean)) return `What helps you ${lower}?`;
    if (/^complete/i.test(clean)) return `Walk me through how you ${lower}.`;
    if (/^give/i.test(clean)) return `How do you ${lower}?`;
    if (/^explain/i.test(clean)) return `Can you ${lower}?`;
    if (/^apply/i.test(clean)) return `Can you ${lower}?`;
    if (/^use/i.test(clean)) return `When would you ${lower}?`;
    if (/^calculate/i.test(clean)) return `Can you ${lower}?`;
    if (/^find/i.test(clean)) return `Can you ${lower}?`;
    if (/^describe/i.test(clean)) return `Can you ${lower}?`;
    if (/^state/i.test(clean)) return `Can you ${lower}?`;
    if (/^write/i.test(clean)) return `Can you ${lower}?`;
    return `Can you demonstrate: ${lower}?`;
  });
}

function buildCFUPrompts(criteria: string[]): string[] {
  const templates = [
    "On your mini-whiteboard, show me: ",
    "In one sentence, explain: ",
    "Write the key formula or method for: ",
    "Without your notes, demonstrate: ",
    "Give me one example of: ",
  ];
  return criteria.map((c, i) => {
    const clean = c.replace(/\.$/, "").toLowerCase();
    return `${templates[i % templates.length]}${clean}`;
  });
}

function buildHomeworkSuggestion(lesson: ExplicitLesson): string {
  return (
    `Assign 3–5 questions from the independent practice section as take-home work. ` +
    `For an exam-style follow-up, use the worksheet generator at /admin/worksheets/new ` +
    `to build a targeted set on "${lesson.title}" in ${lesson.courseTitle}. ` +
    `Students can also self-practise at /course/${lesson.moduleSlug}/${lesson.slug}.`
  );
}

// ── Main generation function ─────────────────────────────────────────────────

export function generateTutorPlan(
  lesson: ExplicitLesson,
  opts: { length: LessonLength; level: StudentLevel }
): TutorLessonPlan {
  const { length, level } = opts;
  const sections: TutorSection[] = [];

  const guided = lesson.guidedPractice.map(toTutorQuestion);
  const independent = lesson.independentPractice.map(toTutorQuestion);
  const mastery = lesson.masteryQuiz.map(toTutorQuestion);
  const examples = lesson.workedExamples.map(toTutorWorkedExample);

  // ── 1. Prerequisites & learning goal ──────────────────────────────────────
  const prereqQuestions = criteriaToTeacherQuestions(lesson.successCriteria.slice(0, 2));
  sections.push({
    kind: "text",
    id: "prerequisites",
    heading: "Prerequisites & Learning Goal",
    minutes: 3,
    paragraphs: [
      `Learning goal: ${lesson.learningIntention}`,
      `Ask students before beginning:`,
      ...prereqQuestions.map((q) => `• ${q}`),
      ...(level === "struggling"
        ? [
            `Note (struggling): Take extra time here. Address gaps before moving on.`,
            `If students cannot answer the prerequisite questions, spend 5 minutes reteaching the prior concept before starting.`,
          ]
        : []),
    ],
  });

  // ── 2. Success criteria ───────────────────────────────────────────────────
  sections.push({
    kind: "criteria",
    id: "success-criteria",
    heading: "Success Criteria",
    minutes: 0,
    items: lesson.successCriteria,
  });

  // ── 3. Warm-up questions ──────────────────────────────────────────────────
  const warmUpCount = length === 30 ? 2 : 3;
  const warmUpQs = guided.slice(0, warmUpCount);
  if (warmUpQs.length > 0) {
    sections.push({
      kind: "questions",
      id: "warm-up",
      heading: "Warm-Up Questions",
      minutes: warmUpCount * 2,
      questions: warmUpQs,
    });
  }

  // ── 4. Teaching script ────────────────────────────────────────────────────
  const scriptMins = length === 30 ? 7 : 8;
  sections.push({
    kind: "text",
    id: "teaching-script",
    heading: "Teaching Script",
    minutes: scriptMins,
    paragraphs: lesson.teaching.paragraphs,
  });

  // ── 5. Key formulas ───────────────────────────────────────────────────────
  if (lesson.teaching.latexBlocks.length > 0) {
    sections.push({
      kind: "formulas",
      id: "key-formulas",
      heading: "Key Formulas — Write on Board",
      minutes: length >= 45 ? 2 : 1,
      blocks: lesson.teaching.latexBlocks,
      note: "Present each formula. Ask students to copy and annotate with their own words.",
    });
  }

  // ── 6. Worked example 1 ───────────────────────────────────────────────────
  if (examples.length > 0) {
    sections.push({
      kind: "worked-example",
      id: "worked-example-1",
      heading: "Worked Example 1",
      minutes: length === 30 ? 4 : 5,
      example: examples[0],
    });
  }

  // ── 7. Worked example 2 ───────────────────────────────────────────────────
  if (examples.length > 1) {
    sections.push({
      kind: "worked-example",
      id: "worked-example-2",
      heading: "Worked Example 2",
      minutes: length === 30 ? 3 : 4,
      example: examples[1],
    });
  }

  // ── 8. Guided practice ────────────────────────────────────────────────────
  const guidedToShow = length === 30 ? guided.slice(warmUpCount) : guided;
  if (guidedToShow.length > 0) {
    sections.push({
      kind: "questions",
      id: "guided-practice",
      heading: "Guided Practice",
      minutes: length === 30 ? 5 : length === 45 ? 7 : 8,
      questions: guidedToShow,
    });
  }

  // ── 9. Independent practice (45+ min, or extension level) ────────────────
  const includeIndep = length >= 45 || level === "extension";
  if (includeIndep) {
    const indepCount = length === 60 ? 5 : 3;
    // Extension level uses mastery questions for independent work
    const indepQs =
      level === "extension"
        ? mastery.slice(0, indepCount)
        : independent.slice(0, indepCount);
    if (indepQs.length > 0) {
      sections.push({
        kind: "questions",
        id: "independent-practice",
        heading: "Independent Practice",
        minutes: indepCount * 2,
        questions: indepQs,
      });
    }
  }

  // ── 10. Common misconceptions ─────────────────────────────────────────────
  if (lesson.commonMistakes.length > 0 && (length >= 45 || level === "struggling")) {
    sections.push({
      kind: "misconceptions",
      id: "misconceptions",
      heading: "Common Misconceptions",
      minutes: length === 60 ? 4 : 3,
      items: lesson.commonMistakes,
    });
  }

  // ── 11. Questions to ask students ─────────────────────────────────────────
  sections.push({
    kind: "prompts",
    id: "questions-to-ask",
    heading: "Questions to Ask Students",
    minutes: 0,
    prompts: criteriaToTeacherQuestions(lesson.successCriteria),
  });

  // ── 12. Mini-whiteboard / CFU prompts ─────────────────────────────────────
  sections.push({
    kind: "prompts",
    id: "cfu-prompts",
    heading: "Check for Understanding — Mini-Whiteboard Prompts",
    minutes: 2,
    prompts: buildCFUPrompts(lesson.successCriteria),
  });

  // ── 13. Extension challenge (60 min, or extension level) ──────────────────
  const includeExtension = length === 60 || level === "extension";
  if (includeExtension && mastery.length >= 2) {
    // Use the two hardest mastery questions (last two)
    const extQs = mastery.slice(-2);
    sections.push({
      kind: "questions",
      id: "extension",
      heading: "Extension Challenge",
      minutes: 5,
      questions: extQs,
    });
  }

  // ── 14. Exit ticket ───────────────────────────────────────────────────────
  const exitQ = mastery[0] ?? independent[independent.length - 1];
  if (exitQ) {
    sections.push({
      kind: "questions",
      id: "exit-ticket",
      heading: "Exit Ticket",
      minutes: length === 30 ? 3 : 4,
      questions: [exitQ],
    });
  }

  // ── 15. Homework suggestion ───────────────────────────────────────────────
  sections.push({
    kind: "homework",
    id: "homework",
    heading: "Homework & Follow-Up Worksheet",
    minutes: 0,
    suggestion: buildHomeworkSuggestion(lesson),
  });

  return {
    title: lesson.title,
    course: lesson.courseTitle,
    unit: lesson.moduleTitle,
    syllabusArea: lesson.syllabusArea,
    length,
    level,
    generatedAt: new Date().toISOString(),
    learningGoal: lesson.learningIntention,
    successCriteria: lesson.successCriteria,
    sections,
  };
}
