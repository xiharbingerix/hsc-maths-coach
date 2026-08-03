import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "./lessons/differentialCalculus";
import { pickDiagramFields, type DiagramFields } from "./lessons/diagramRegistry";
import { isGenericMcqInstructionLatex } from "./lessons/questionHelpers";
import type {
  LessonDeliveryMode,
  StudentLevel,
} from "./lessonPlannerConfig";
import type { LessonSyllabusScope } from "./syllabus/year9Nesa";

export type { LessonDeliveryMode, StudentLevel } from "./lessonPlannerConfig";

// 10 = quick catch-up recap of a previously taught topic (tutoring recaps);
// 30/45/60 = full first-teach lessons.
export type LessonLength = 10 | 30 | 45 | 60;

// ── Serialisable output types (returned from server action) ──────────────────

export interface TutorQuestion extends DiagramFields {
  id: string;
  prompt: string;
  displayLatex: string;
  isMultipleChoice: boolean;
  choices?: { label: string; text: string }[];
  answer: string;
  hint?: string;
  explanation?: string;
}

export interface TutorWorkedExample extends DiagramFields {
  title: string;
  questionLatex: string;
  steps: { explanation: string; latex?: string }[];
  finalAnswerLatex: string;
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

// Teacher/tutor dialogue. The UI adapts these neutral stored roles to the
// selected delivery mode (Tutor/Student on Zoom, Teacher/Class in a classroom).
export interface TutorDialogueExchange {
  speaker: "tutor" | "student";
  text: string;
}

export interface TutorDialogueSection {
  kind: "dialogue";
  id: string;
  heading: string;
  minutes: number;
  exchanges: TutorDialogueExchange[];
}

export type TutorSection =
  | TutorTextSection
  | TutorFormulasSection
  | TutorCriteriaSection
  | TutorQuestionsSection
  | TutorWorkedExampleSection
  | TutorMisconceptionsSection
  | TutorPromptsSection
  | TutorHomeworkSection
  | TutorDialogueSection;

export interface TutorLessonPlan {
  title: string;
  course: string;
  unit: string;
  syllabusArea: string;
  length: LessonLength;
  level: StudentLevel;
  /** Older saved plans predate deliveryMode and should be treated as Zoom. */
  deliveryMode?: LessonDeliveryMode;
  generatedAt: string;
  learningGoal: string;
  successCriteria: string[];
  syllabusScope?: LessonSyllabusScope;
  sections: TutorSection[];
  // How the plan was produced. Older saved plans predate these fields.
  generator?: "ai" | "built-in";
  model?: string;
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

// Generic MCQ placeholder formulas (several phrasings exist) carry no
// information once the choices are shown — strip them from the display.
// Exported for the AI lesson planner, which resolves bank-question references
// back into full TutorQuestions (preserving diagrams, choices, hints).
export function toTutorQuestion(q: PracticeQuestion): TutorQuestion {
  return {
    id: q.id,
    prompt: q.prompt,
    // Suppress the generic MCQ placeholder formula — it adds no information when choices are shown
    displayLatex: isGenericMcqInstructionLatex(q.latex) ? "" : q.latex,
    isMultipleChoice: !!q.choices,
    choices: q.choices,
    answer: q.answer,
    hint: q.hint,
    explanation: q.explanation,
    ...pickDiagramFields(q),
  };
}

export function toTutorWorkedExample(ex: WorkedExample): TutorWorkedExample {
  return {
    title: ex.title,
    questionLatex: ex.questionLatex,
    steps: ex.steps.map((s) => ({ explanation: s.explanation, latex: s.latex })),
    finalAnswerLatex: ex.finalAnswerLatex,
    ...pickDiagramFields(ex),
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

export function syllabusScopeItems(scope: LessonSyllabusScope): string[] {
  return scope.outcomes.flatMap((outcome) => [
    `${outcome.code}: ${outcome.description}`,
    ...outcome.focusAreas.flatMap((focus) =>
      focus.contentGroups.flatMap((group) =>
        group.contentPoints.map((point) => `${point.code}: ${point.text}`),
      ),
    ),
  ]);
}

export function scopedSuccessCriteria(
  lesson: ExplicitLesson,
  scope: LessonSyllabusScope | undefined,
): string[] {
  if (!scope) return lesson.successCriteria;
  return scope.outcomes.flatMap((outcome) =>
    outcome.focusAreas.flatMap((focus) =>
      focus.contentGroups.flatMap((group) =>
        group.contentPoints.map((point) => point.text),
      ),
    ),
  );
}

export function buildScaffoldingSection(
  level: StudentLevel,
  deliveryMode: LessonDeliveryMode,
): TutorTextSection {
  const learner = deliveryMode === "classroom" ? "students" : "the student";
  const deliverySupport =
    deliveryMode === "classroom"
      ? "Use mini-whiteboards for a silent whole-class response, then scan the room before choosing the next step. Give think time before asking anyone to explain."
      : "Keep a worked line visible on screen and ask the student to say the next small step before you write it.";

  const paragraphs: Record<StudentLevel, string[]> = {
    "level-1": [
      "Keep the same learning outcome. Reduce the amount of work, not the mathematical goal.",
      "Explain the idea first with one familiar, concrete example. Use short sentences and name what every number or symbol means before using a rule.",
      `Model one step, then let ${learner} copy that step on a nearly identical question. Use this prompt order: “What do we know?”, “What are we finding?”, “Which step comes first?”, then “Does the answer make sense?”`,
      deliverySupport,
      "For independent work, begin with the hint visible. Remove one support at a time only after a correct answer. Two secure core questions are enough if they demonstrate the success criteria.",
    ],
    "level-2": [
      "State the idea in plain English, connect it to one familiar example, then show how the mathematical rule records that idea.",
      `Model one full example, complete one with ${learner}, then fade the prompts so the independent questions are genuinely independent.`,
      deliverySupport,
      "Use the success criteria to decide whether to move on. Add a stretch question only after the core outcome is secure.",
    ],
    "level-3": [
      "Keep the core explanation concise, but still establish why the method works before using the formula.",
      `Ask ${learner} to predict the next step, compare methods and explain which method is more efficient.`,
      deliverySupport,
      "Move quickly to unfamiliar or multi-step questions. Require written reasoning, a check of the answer and a generalisation or extension after the core outcome is secure.",
    ],
  };

  return {
    kind: "text",
    id: "level-scaffolding",
    heading: `${level.replace("level-", "Level ")} Scaffolding`,
    minutes: 0,
    paragraphs: paragraphs[level],
  };
}

export function selectIndependentQuestions(
  lesson: ExplicitLesson,
  level: StudentLevel,
  length: LessonLength,
): TutorQuestion[] {
  const core = [...lesson.independentPractice];
  const mastery = [...lesson.masteryQuiz, ...(lesson.masteryQuizPool ?? [])];
  const byDifficulty = (a: PracticeQuestion, b: PracticeQuestion) =>
    (a.difficulty ?? 3) - (b.difficulty ?? 3);

  if (level === "level-1") {
    const count = length === 30 ? 2 : 3;
    const pool =
      core.length >= count ? core : [...core, ...lesson.guidedPractice];
    return pool
      .sort(byDifficulty)
      .slice(0, count)
      .map(toTutorQuestion);
  }

  if (level === "level-3") {
    return [...mastery, ...core]
      .sort((a, b) => byDifficulty(b, a))
      .slice(0, length === 30 ? 3 : length === 45 ? 4 : 5)
      .map(toTutorQuestion);
  }

  return core
    .sort(byDifficulty)
    .slice(0, length === 30 ? 3 : length === 45 ? 4 : 5)
    .map(toTutorQuestion);
}

// ── 10-minute catch-up recap ─────────────────────────────────────────────────
// Assumes the topic was already taught in a previous session: re-activate the
// core idea, refresh the key formulas, run a couple of quick checks, and flag
// whether a full re-teach is needed.

function generateCatchUpPlan(
  lesson: ExplicitLesson,
  level: StudentLevel,
  deliveryMode: LessonDeliveryMode,
  syllabusScope?: LessonSyllabusScope,
): TutorLessonPlan {
  const sections: TutorSection[] = [];
  const successCriteria = scopedSuccessCriteria(lesson, syllabusScope);

  const guided = lesson.guidedPractice.map(toTutorQuestion);
  const independent = lesson.independentPractice.map(toTutorQuestion);
  const mastery = lesson.masteryQuiz.map(toTutorQuestion);
  const examples = lesson.workedExamples.map(toTutorWorkedExample);

  // ── 1. Recall opener ────────────────────────────────────────────────────
  sections.push({
    kind: "text",
    id: "recap-opener",
    heading: "Recall Opener",
    minutes: 2,
    paragraphs: [
      `This is a catch-up recap — ${deliveryMode === "classroom" ? "the class has" : "the student has"} already been taught "${lesson.title}". The goal is to re-activate it, not re-teach it.`,
      `Ask from memory, before showing anything on screen:`,
      ...criteriaToTeacherQuestions(successCriteria.slice(0, 2)).map(
        (q) => `• ${q}`
      ),
      ...(level === "level-1"
        ? [
            `Note (Level 1): If neither question lands, stop the recap and plan a full re-teach or targeted small-group intervention. Ten minutes is not enough to teach the concept from scratch.`,
          ]
        : []),
    ],
  });

  if (syllabusScope) {
    sections.push({
      kind: "criteria",
      id: "recap-syllabus-scope",
      heading: "Selected NESA Syllabus Scope",
      minutes: 0,
      items: syllabusScopeItems(syllabusScope),
    });
  }

  // ── 2. Key formulas refresher ───────────────────────────────────────────
  if (lesson.teaching.latexBlocks.length > 0) {
    sections.push({
      kind: "formulas",
      id: "recap-formulas",
      heading: "Key Formulas Refresher",
      minutes: 1,
      blocks: lesson.teaching.latexBlocks.slice(0, 3),
      note: "Show each formula and ask the student to say in one sentence what it does and when to use it.",
    });
  }

  // ── 3. One worked example, student narrates ────────────────────────────
  if (examples.length > 0) {
    sections.push({
      kind: "worked-example",
      id: "recap-example",
      heading: "Worked Example — Student Talks You Through It",
      minutes: 3,
      example: examples[0],
    });
  }

  // ── 4. Quick checks ─────────────────────────────────────────────────────
  const quickPool = level === "level-3" ? independent : guided;
  const quickQs = quickPool.slice(0, 2);
  if (quickQs.length > 0) {
    sections.push({
      kind: "questions",
      id: "recap-quick-checks",
      heading: "Quick Checks",
      minutes: 3,
      questions: quickQs,
    });
  }

  // ── 5. Exit check ───────────────────────────────────────────────────────
  const exitQ =
    (level === "level-3" ? mastery[0] : independent[0]) ??
    mastery[0] ??
    guided[quickQs.length];
  if (exitQ && !quickQs.some((q) => q.id === exitQ.id)) {
    sections.push({
      kind: "questions",
      id: "recap-exit-check",
      heading: "Exit Check",
      minutes: 1,
      questions: [exitQ],
    });
  }

  // ── 6. Follow-up ────────────────────────────────────────────────────────
  sections.push({
    kind: "homework",
    id: "recap-follow-up",
    heading: "Follow-Up",
    minutes: 0,
    suggestion:
      `If the recap was shaky, schedule a full lesson on "${lesson.title}" and assign 2–3 questions from the practice pool as holding homework. ` +
      `If it was solid, no homework needed — move the next session on to new content. ` +
      `Students can self-practise at /course/${lesson.moduleSlug}/${lesson.slug}.`,
  });

  return {
    title: lesson.title,
    course: lesson.courseTitle,
    unit: lesson.moduleTitle,
    syllabusArea: lesson.syllabusArea,
    length: 10,
    level,
    deliveryMode,
    syllabusScope,
    generatedAt: new Date().toISOString(),
    learningGoal: syllabusScope
      ? `Recap the selected ${syllabusScope.stage} content for ${syllabusScope.outcomes.map((outcome) => outcome.code).join(", ")}.`
      : `Recap and re-activate: ${lesson.learningIntention}`,
    successCriteria,
    sections,
    generator: "built-in",
  };
}

// ── Main generation function ─────────────────────────────────────────────────

export function generateTutorPlan(
  lesson: ExplicitLesson,
  opts: {
    length: LessonLength;
    level: StudentLevel;
    deliveryMode: LessonDeliveryMode;
    syllabusScope?: LessonSyllabusScope;
  },
): TutorLessonPlan {
  const { length, level, deliveryMode, syllabusScope } = opts;
  if (length === 10) {
    return generateCatchUpPlan(lesson, level, deliveryMode, syllabusScope);
  }
  const sections: TutorSection[] = [];
  const successCriteria = scopedSuccessCriteria(lesson, syllabusScope);

  const guided = lesson.guidedPractice.map(toTutorQuestion);
  const independent = lesson.independentPractice.map(toTutorQuestion);
  const mastery = lesson.masteryQuiz.map(toTutorQuestion);
  const examples = lesson.workedExamples.map(toTutorWorkedExample);

  // ── 1. Prerequisites & learning goal ──────────────────────────────────────
  const prereqQuestions = criteriaToTeacherQuestions(successCriteria.slice(0, 2));
  sections.push({
    kind: "text",
    id: "prerequisites",
    heading: "Prerequisites & Learning Goal",
    minutes: 3,
    paragraphs: [
      `Learning goal: ${
        syllabusScope
          ? `Address the selected ${syllabusScope.stage} content for ${syllabusScope.outcomes.map((outcome) => outcome.code).join(", ")}.`
          : lesson.learningIntention
      }`,
      `Ask students before beginning:`,
      ...prereqQuestions.map((q) => `• ${q}`),
      ...(level === "level-1"
        ? [
            `Note (Level 1): Take extra time here and address prerequisite gaps before moving on.`,
            `If students cannot answer the prerequisite questions, re-teach the smallest missing idea with a concrete example before starting.`,
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
    items: successCriteria,
  });

  if (syllabusScope) {
    sections.push({
      kind: "criteria",
      id: "syllabus-scope",
      heading: "Selected NESA Syllabus Scope",
      minutes: 0,
      items: syllabusScopeItems(syllabusScope),
    });
  }

  sections.push(buildScaffoldingSection(level, deliveryMode));

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

  // Every level receives independent practice. The quantity and difficulty
  // vary, while the success criteria remain common across all three levels.
  const indepQs = selectIndependentQuestions(lesson, level, length);
  if (indepQs.length > 0) {
    sections.push({
      kind: "questions",
      id: "independent-practice",
      heading: `Independent Practice — ${level.replace("level-", "Level ")}`,
      minutes: Math.max(4, indepQs.length * 2),
      questions: indepQs,
    });
  }

  // ── 10. Common misconceptions ─────────────────────────────────────────────
  if (lesson.commonMistakes.length > 0 && (length >= 45 || level === "level-1")) {
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
    prompts: criteriaToTeacherQuestions(successCriteria),
  });

  // ── 12. Mini-whiteboard / CFU prompts ─────────────────────────────────────
  sections.push({
    kind: "prompts",
    id: "cfu-prompts",
    heading: "Check for Understanding — Mini-Whiteboard Prompts",
    minutes: 2,
    prompts: buildCFUPrompts(successCriteria),
  });

  // ── 13. Extension challenge (60 min, or extension level) ──────────────────
  const includeExtension = level === "level-3";
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
    deliveryMode,
    syllabusScope,
    generatedAt: new Date().toISOString(),
    learningGoal: syllabusScope
      ? `Meet the selected ${syllabusScope.stage} syllabus content for ${syllabusScope.outcomes.map((outcome) => outcome.code).join(", ")}.`
      : lesson.learningIntention,
    successCriteria,
    sections,
    generator: "built-in",
  };
}
