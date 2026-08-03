/**
 * AI lesson planner — authors a full explicit-teaching tutor lesson with the
 * Claude API (Claude Fable 5 by default).
 *
 * Design:
 *  - The authored lesson content (teaching paragraphs, worked examples, the
 *    whole practice-question bank WITH ids) is sent as source material. Claude
 *    authors the pedagogy — a one-on-one Zoom teaching arc with Socratic
 *    dialogue, timing, and checkpoints — and REFERENCES bank questions by id
 *    wherever possible. The server resolves those ids back into full
 *    TutorQuestions, so vetted answers, MCQ choices, hints, and diagram
 *    payloads all survive intact and render with the existing UI.
 *  - Output is bound by a JSON schema (structured outputs), then assembled
 *    into the same TutorLessonPlan shape the lesson-maker UI already renders.
 *  - Callers cache the result (ai_lesson_plans table) so tokens are spent at
 *    most once per (topic, length, level) unless a regeneration is forced.
 *
 * Server-only: reads ANTHROPIC_API_KEY. Do not import from client components.
 */
import Anthropic from "@anthropic-ai/sdk";

import type {
  ExplicitLesson,
  PracticeQuestion,
} from "./lessons/differentialCalculus";
import { pickDiagramFields } from "./lessons/diagramRegistry";
import type { LessonSyllabusScope } from "./syllabus/year9Nesa";
import {
  buildScaffoldingSection,
  scopedSuccessCriteria,
  selectIndependentQuestions,
  syllabusScopeItems,
  toTutorQuestion,
  toTutorWorkedExample,
  type LessonDeliveryMode,
  type LessonLength,
  type StudentLevel,
  type TutorLessonPlan,
  type TutorQuestion,
  type TutorSection,
} from "./lessonMaker";

// Fable 5 is the strongest authoring model; overridable the same way as
// PROOF_MARKER_MODEL. The fallback model handles the (rare) case where the
// primary model declines the request.
const MODEL = process.env.LESSON_PLANNER_MODEL?.trim() || "claude-fable-5";
const FALLBACK_MODEL = "claude-opus-4-8";
const MAX_TOKENS = 32000;
const MAX_BANK_QUESTIONS_PER_POOL = 24;

export function aiLessonPlannerEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

// ── Output format ─────────────────────────────────────────────────────────────
// Structured outputs (output_config.format) cannot compile a schema this rich —
// the grammar compiler rejects it ("too large" / "too complex" / compilation
// timeout) even fully flattened. So the JSON contract is enforced by prompt
// instead, parsed defensively, and retried once on a parse failure. The
// assembly step drops any section whose payload is missing or malformed.

const OUTPUT_SPEC = `OUTPUT FORMAT — return ONLY one JSON object, no markdown fences, no commentary, matching exactly:
{
  "learningGoal": string,
  "successCriteria": string[],
  "sections": [
    {
      "kind": "text" | "formulas" | "dialogue" | "worked-example" | "questions" | "misconceptions" | "prompts" | "homework",
      "heading": string,
      "minutes": number,
      // then ONLY the payload fields for that kind:
      "paragraphs": string[],            // kind "text"
      "blocks": string[], "note": string, // kind "formulas" (blocks = raw LaTeX)
      "exchanges": string[],             // kind "dialogue" — each entry "tutor: ..." or "student: ..."
      "bankExampleIndex": number,        // kind "worked-example" — index of an authored example to reuse, or -1
      "exampleTitle": string, "exampleQuestionLatex": string, "exampleSteps": string[], "exampleFinalAnswerLatex": string, // only when bankExampleIndex is -1; each step is "plain-English explanation ||| raw latex" (the " ||| latex" part is optional)
      "questionIds": string[],           // kind "questions" — ids from the question bank
      "newQuestions": [{ "prompt": string, "displayLatex": string, "choices": string[], "answer": string, "hint": string, "explanation": string }], // kind "questions" — choices entries like "A) 12"; omit choices for non-MCQ; displayLatex may be ""
      "items": string[],                 // kind "misconceptions" — each entry "the mistake ||| the fix"
      "prompts": string[],               // kind "prompts"
      "suggestion": string               // kind "homework"
    }
  ]
}`;

// ── Parsed-output types (mirror of the schema) ───────────────────────────────

type AiNewQuestion = {
  prompt: string;
  displayLatex?: string;
  choices?: string[]; // "A) choice text"
  answer: string;
  hint?: string;
  explanation?: string;
};

// Flat section shape (mirrors the schema): a kind tag plus optional per-kind
// payload fields. Assembly validates presence per kind.
type AiSection = {
  kind:
    | "text"
    | "formulas"
    | "dialogue"
    | "worked-example"
    | "questions"
    | "misconceptions"
    | "prompts"
    | "homework";
  heading: string;
  minutes: number;
  paragraphs?: string[];
  blocks?: string[];
  note?: string;
  exchanges?: string[]; // "tutor: ..." | "student: ..."
  bankExampleIndex?: number;
  exampleTitle?: string;
  exampleQuestionLatex?: string;
  exampleSteps?: string[]; // "explanation ||| latex"
  exampleFinalAnswerLatex?: string;
  questionIds?: string[];
  newQuestions?: AiNewQuestion[];
  items?: string[]; // "mistake ||| fix"
  prompts?: string[];
  suggestion?: string;
};

type AiPlan = {
  learningGoal: string;
  successCriteria: string[];
  sections: AiSection[];
};

// ── In-string convention parsers ─────────────────────────────────────────────

const DELIM = "|||";

function splitDelim(entry: string): [string, string] {
  const idx = entry.indexOf(DELIM);
  if (idx === -1) return [entry.trim(), ""];
  return [entry.slice(0, idx).trim(), entry.slice(idx + DELIM.length).trim()];
}

function parseExchange(entry: string): { speaker: "tutor" | "student"; text: string } | null {
  const m = entry.match(/^\s*(tutor|student)\s*:\s*([\s\S]+)$/i);
  if (!m) return entry.trim() ? { speaker: "tutor", text: entry.trim() } : null;
  return { speaker: m[1].toLowerCase() as "tutor" | "student", text: m[2].trim() };
}

function parseChoice(entry: string): { label: string; text: string } | null {
  const m = entry.match(/^\s*([A-Ea-e])[).:\-]\s*([\s\S]+)$/);
  if (!m) return null;
  return { label: m[1].toUpperCase(), text: m[2].trim() };
}

// ── Prompt building ──────────────────────────────────────────────────────────

const LEVEL_GUIDANCE: Record<StudentLevel, string> = {
  "level-1":
    "LEVEL 1 — NEEDS EXTRA SCAFFOLDING: keep the same syllabus outcome and success criteria, but reduce cognitive load and the quantity of work. Re-teach shaky prerequisites briefly. Use one familiar concrete example, short sentences, tiny worked steps, completion prompts and frequent checks. The independent set must contain 2–3 approachable core questions, usually D1–D2; make the first-start support explicit and then fade it. It is acceptable not to complete every available question, but the exit check must still demonstrate the outcome. Do not use deficit labels such as weak, low or struggling.",
  "level-2":
    "LEVEL 2 — MEETS OUTCOMES: teach at the expected pace. Use one clear model, guided practice with prompts that fade, and 3–4 genuinely independent D2–D4 questions. Secure every success criterion before adding an optional stretch question.",
  "level-3":
    "LEVEL 3 — EXCEEDS OUTCOMES: establish the core explanation efficiently, then push into why the method works, connections, comparison of methods and generalisation. Use 3–5 demanding D4–D5 or mastery questions independently, including a genuine unfamiliar extension. Require reasoning and checking, not just faster computation.",
};

const DELIVERY_GUIDANCE: Record<LessonDeliveryMode, string> = {
  zoom:
    "ZOOM TUTORING: one tutor and one student using screen share, chat and verbal discussion. Make the plan conversational and responsive. The tutor can watch the student's working and adjust immediately. Do not include classroom-management routines, group work or handed-out mini-whiteboards.",
  classroom:
    "CLASSROOM: one teacher with a class of students. Write a plan that can be taught from the board/projector. Include purposeful whole-class routines: quiet think time before responses, mini-whiteboard or all-student checks, brief pair explanation where helpful, teacher circulation during independent work, and a clear stop/check point. Do not assume individual screen share or chat. Dialogue 'student' lines describe the answer the teacher should listen for across the class, not a single scripted child.",
};

const SYSTEM_PROMPT = `You are an expert NSW mathematics teacher, tutor and instructional designer. You author complete explicit-teaching lesson plans for either one-on-one Zoom tutoring or classroom teaching, exactly as specified in the request.

You are given a topic's authored source material: teaching notes, key formulas, worked examples, and a bank of vetted practice questions (each with an id, difficulty D1–D5, and flags for multiple-choice and diagrams). Your job is to turn that raw material into a sharply-paced, Feynman-standard tutoring lesson.

TEACHING STANDARD (Feynman, age-appropriate):
- Explain WHY before WHAT. Build each idea from something the student already knows, with a concrete example before the general rule.
- Never formula-drop: every formula must be motivated or derived in the teaching before it is used.
- Give the student a mental model (a picture, a story, an analogy) they can reconstruct the idea from.
- Anticipate the specific wrong turns students take and plan to surface them.
- Infer the students' approximate age from the course/year. Use words and sentence lengths that age group can understand. Prefer ordinary words to jargon; when a technical term is necessary, explain it immediately in plain English.
- Write the actual explanation a teacher can say aloud. Never use vague directions such as “explain the concept”, “discuss the formula” or “provide scaffolding”. Supply the explanation, questions and scaffolds themselves.
- Apply a Feynman check to every core explanation: a student should be able to retell it simply, say what each symbol means, and explain why the next step is sensible.

LESSON ARC (adapt its delivery to the selected mode):
1. A warm opener that checks prerequisites (dialogue).
2. Explicit teaching of the core idea (text + formulas), written as a script the teacher or tutor can say aloud.
3. Worked example(s) — "I do": model on the shared screen or classroom board while narrating decisions.
4. Guided practice — "we do": learners attempt with planned scaffolding. Use dialogue checkpoints.
5. Independent practice — "you do": learners work before the teacher or tutor intervenes.
6. Misconception check and quick verbal CFU prompts.
7. Exit ticket (one question that proves the goal was met) and homework.

DIFFERENTIATION — REQUIRED:
- Preserve the supplied syllabus outcome and success criteria at every level. Level 1 changes the size of the steps, amount of support and number of questions; it does not replace the outcome with an easier one.
- Include a dedicated text section named “Level 1 Scaffolding”, “Level 2 Scaffolding” or “Level 3 Scaffolding” as appropriate. It must contain the exact prompts, representations and support/fading moves the teacher or tutor will use.
- Include a questions section named “Independent Practice — Level 1”, “Independent Practice — Level 2” or “Independent Practice — Level 3”. Its question count and difficulty must match the selected level guidance. Independent practice means the learner attempts before help is given.

SYLLABUS ALIGNMENT — WHEN A SELECTED NESA SCOPE IS PROVIDED:
- Treat the selected NESA outcome and content points as a binding contract. Rewrite the learning goal and success criteria so they directly assess that selected scope.
- Cover every selected content point, but do not broaden the lesson into unselected content from the same outcome. A teacher may deliberately select only part of an outcome.
- Use source teaching notes and bank questions only when they support the selected content. Ignore otherwise relevant material that sits outside the selected scope.
- Every worked example, guided question, independent question and exit ticket must provide evidence for at least one selected content point. Prefer a narrower, coherent lesson over superficial coverage.
- Include a zero-minute criteria section named “NESA Syllabus Alignment” listing the outcome code(s) and selected content-point code(s) exactly.
- Embed MAO-WM-01 through suitable reasoning, problem-solving and communication prompts; do not treat it as a separate topic.

SECTION TYPES available: "text" (teaching script paragraphs), "formulas" (display LaTeX blocks to screen-share), "dialogue" (a Socratic tutor↔student script: tutor lines are what the tutor says/asks; student lines are the expected response the tutor listens for), "worked-example", "questions", "misconceptions", "prompts" (short verbal check-for-understanding questions), "homework".

STRING CONVENTIONS (exact — these are machine-parsed):
- dialogue exchanges: each array entry starts with "tutor: " or "student: " followed by the line.
- exampleSteps: each entry is "plain-English explanation of the step ||| raw latex for the step" — omit the " ||| latex" part if the step has no display maths.
- misconception items: each entry is "the mistake students make ||| how to fix or reframe it".
- newQuestions choices: each entry is like "A) 12" / "B) 15" — a capital letter, close-paren, space, then the choice text.

QUESTIONS — CRITICAL RULES:
- STRONGLY prefer referencing bank questions by id (questionIds): they have vetted answers, hints, and rendered diagrams. Only author newQuestions to fill a genuine gap (e.g. an easier on-ramp or an extension twist the bank lacks), and never author a question that needs a diagram.
- Any question flagged [diagram] can only be used via its id.
- Order questions easiest → hardest within a section. Do not reuse a question id twice in the lesson.
- In newQuestions, displayLatex is a standalone display formula for the question statement ONLY. It must NEVER contain the answer, the next working step, or anything not already stated in the prompt. Omit it if the prompt is self-contained. Omit choices for non-multiple-choice questions. Always include a hint and an explanation.
- For worked-example sections: set bankExampleIndex to reuse an authored example (then omit the example* fields), or set bankExampleIndex to -1 and fill exampleTitle, exampleQuestionLatex, exampleSteps, and exampleFinalAnswerLatex.
- Each section must include ONLY the payload fields for its kind: text→paragraphs; formulas→blocks,note; dialogue→exchanges; worked-example→bankExampleIndex + example* fields; questions→questionIds,newQuestions; misconceptions→items; prompts→prompts; homework→suggestion.

LATEX / FORMATTING RULES:
- Prose fields (paragraphs, dialogue text, prompts, question prompt/answer/hint/explanation, mistake/fix): plain English with inline maths wrapped in $...$ (e.g. "so $f'(x)=2x$ at every point"). Never leave maths unwrapped. Write currency as $ followed by digits with no LaTeX around it (e.g. $500) — the renderer treats that as a currency sign. NEVER wrap a currency amount or a bare number in maths delimiters: write $500 or 25, never $500$, $25$, or \\$500 — a stray $...$ around a number breaks the renderer for the whole sentence.
- Pure LaTeX fields (formulas blocks, questionLatex, step latex, finalAnswerLatex, displayLatex): raw LaTeX only, NO surrounding $ delimiters.
- Australian English, NSW syllabus terminology.

TIMING:
- Section minutes must sum to the requested lesson length (±2 minutes). Reference-only sections (prompts, homework) may be 0 minutes.

${OUTPUT_SPEC}

Author generously — this plan is the tutor's complete script for the session. Remember: the entire response must be that single JSON object.`;

function clip(s: string, n = 1200): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

function describeBankQuestion(q: PracticeQuestion): string {
  const flags = [
    q.difficulty ? `D${q.difficulty}` : "D?",
    q.choices?.length ? "MCQ" : "",
    hasDiagram(q) ? "[diagram]" : "",
    q.parts?.length ? "[multi-part]" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `- id=${q.id} ${flags} | ${clip(q.prompt, 260)} | answer: ${clip(q.answer, 120)}`;
}

// A question carries a diagram if any registered diagram field is present.
function hasDiagram(q: PracticeQuestion): boolean {
  return Object.values(pickDiagramFields(q)).some((v) => v !== undefined);
}

// 10-minute plans are catch-up recaps of a previously taught topic, not a
// compressed first-teach — this block overrides the full lesson arc.
const RECAP_MODE = `MODE: 10-MINUTE CATCH-UP RECAP.
The learners were ALREADY TAUGHT this topic. Do NOT re-teach from scratch and do NOT follow the full lesson arc. Structure instead:
1. Recall opener (dialogue, ~2 min): ask learners to state the core idea and key formula FROM MEMORY before anything is shown. Student lines are the response you are listening for.
2. Key formulas refresher (formulas, ~1 min): only the essential blocks; the note should ask the student to explain each in their own words.
3. ONE quick worked example (~3 min), framed so the LEARNERS narrate the steps while the teacher or tutor records them — reuse an authored example via bankExampleIndex where possible.
4. Quick checks (questions, ~3 min): 2 bank questions the student can each finish in about a minute. Favour D1–D3 (D3–D4 for extension students). No multi-part questions.
5. Exit check (questions, ~1 min): one question that proves the skill is still there.
6. Homework (0 min): what to do if the recap was shaky (book a full re-teach lesson) vs solid (move on to new content).
Keep every section tight, introduce NO new material, and keep total section minutes at 10 (±1).`;

function buildUserContent(
  lesson: ExplicitLesson,
  length: LessonLength,
  level: StudentLevel,
  deliveryMode: LessonDeliveryMode,
  syllabusScope?: LessonSyllabusScope,
): string {
  const pools: [string, PracticeQuestion[]][] = [
    ["GUIDED PRACTICE BANK", lesson.guidedPractice],
    ["INDEPENDENT PRACTICE BANK", lesson.independentPractice],
    ["MASTERY BANK (hardest)", [...lesson.masteryQuiz, ...(lesson.masteryQuizPool ?? [])]],
    ["MULTI-PART BANK", lesson.multiPartPractice ?? []],
  ];

  const bankLines = pools
    .filter(([, qs]) => qs.length > 0)
    .map(
      ([label, qs]) =>
        `${label}:\n${qs
          .slice(0, MAX_BANK_QUESTIONS_PER_POOL)
          .map(describeBankQuestion)
          .join("\n")}`,
    )
    .join("\n\n");

  const examples = lesson.workedExamples
    .map(
      (ex, i) =>
        `[index ${i}] ${ex.title}\n  Question: ${clip(ex.questionLatex, 300)}\n  Steps:\n${ex.steps
          .map((s, j) => `    ${j + 1}. ${clip(s.explanation, 300)}${s.latex ? ` | ${clip(s.latex, 200)}` : ""}`)
          .join("\n")}\n  Final answer: ${clip(ex.finalAnswerLatex, 200)}`,
    )
    .join("\n\n");

  const selectedSyllabusScope = syllabusScope
    ? [
        `SELECTED NESA SYLLABUS SCOPE — BINDING:`,
        `${syllabusScope.syllabus} | ${syllabusScope.stage}`,
        `Working mathematically: ${syllabusScope.workingMathematically.code} — ${syllabusScope.workingMathematically.description}`,
        ...syllabusScope.outcomes.flatMap((outcome) => [
          `OUTCOME ${outcome.code} (${outcome.classification.toUpperCase()}): ${outcome.description}`,
          ...outcome.focusAreas.flatMap((focus) => [
            `Focus area: ${focus.title}`,
            ...focus.contentGroups.flatMap((group) => [
              `Content group: ${group.title}`,
              ...group.contentPoints.map(
                (point) =>
                  `- ${point.code}: ${point.text}${point.including ? ` Including: ${point.including}` : ""}`,
              ),
            ]),
          ]),
        ]),
        `SCOPE LIMIT: Teach all selected content above and do not add unselected content from these outcomes.`,
      ].join("\n")
    : "NO EXPLICIT SYLLABUS SUBSELECTION: use the authored lesson intention and success criteria.";

  return [
    `TOPIC: ${lesson.title}`,
    `COURSE: ${lesson.courseTitle} — UNIT: ${lesson.moduleTitle}`,
    `SYLLABUS AREA: ${lesson.syllabusArea} | FOCUS: ${lesson.focus}`,
    `LEARNING INTENTION: ${lesson.learningIntention}`,
    `SUCCESS CRITERIA:\n${lesson.successCriteria.map((c) => `- ${c}`).join("\n")}`,
    syllabusScope
      ? selectedSyllabusScope
      : lesson.syllabusOutcomes?.length
      ? `NSW SYLLABUS OUTCOMES (must remain achievable at every level):\n${lesson.syllabusOutcomes.map((o) => `- ${o}`).join("\n")}`
      : `OUTCOME REQUIREMENT: Every level must still achieve the learning intention and success criteria above.`,
    ``,
    `LESSON LENGTH: ${length} minutes (section minutes must sum to this)`,
    ...(length === 10 ? [RECAP_MODE] : []),
    `DELIVERY MODE: ${DELIVERY_GUIDANCE[deliveryMode]}`,
    `LEARNER PROFILE: ${LEVEL_GUIDANCE[level]}`,
    ``,
    `AUTHORED TEACHING NOTES (source material — rework into your own explicit-teaching script, do not just copy):`,
    ...lesson.teaching.paragraphs.map((p) => clip(p, 2000)),
    ``,
    lesson.teaching.latexBlocks.length
      ? `KEY FORMULA BLOCKS (raw LaTeX):\n${lesson.teaching.latexBlocks.map((b) => `- ${b}`).join("\n")}`
      : ``,
    ``,
    `AUTHORED WORKED EXAMPLES (reusable via bankExampleIndex):\n${examples || "(none)"}`,
    ``,
    lesson.commonMistakes.length
      ? `KNOWN COMMON MISTAKES:\n${lesson.commonMistakes.map((m) => `- ${m.mistake} → ${m.fix}`).join("\n")}`
      : ``,
    ``,
    `QUESTION BANK (reference by id; [diagram] questions render a visual for the student):`,
    bankLines || "(no bank questions)",
    ``,
    length === 10
      ? `TASK: Author the complete 10-minute ${deliveryMode === "classroom" ? "classroom" : "one-on-one Zoom"} CATCH-UP RECAP plan now.`
      : `TASK: Author the complete ${length}-minute ${deliveryMode === "classroom" ? "classroom" : "one-on-one Zoom"} lesson plan now.`,
  ]
    .filter((l) => l !== ``)
    .join("\n");
}

// ── Assembly: AI output + question bank → TutorLessonPlan ────────────────────

function buildQuestionMap(lesson: ExplicitLesson): Map<string, TutorQuestion> {
  const map = new Map<string, TutorQuestion>();
  const all = [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
    ...(lesson.masteryQuizPool ?? []),
    ...(lesson.multiPartPractice ?? []),
  ];
  for (const q of all) {
    if (!map.has(q.id)) map.set(q.id, toTutorQuestion(q));
  }
  return map;
}

function assemblePlan(
  ai: AiPlan,
  lesson: ExplicitLesson,
  length: LessonLength,
  level: StudentLevel,
  deliveryMode: LessonDeliveryMode,
  syllabusScope: LessonSyllabusScope | undefined,
  model: string,
): TutorLessonPlan {
  const bank = buildQuestionMap(lesson);
  const usedIds = new Set<string>();
  const sections: TutorSection[] = [];

  ai.sections.forEach((s, i) => {
    const id = `ai-s${i + 1}`;
    switch (s.kind) {
      case "text":
        if (!s.paragraphs?.length) return;
        sections.push({ kind: "text", id, heading: s.heading, minutes: s.minutes, paragraphs: s.paragraphs });
        return;
      case "formulas":
        if (!s.blocks?.length) return;
        sections.push({
          kind: "formulas",
          id,
          heading: s.heading,
          minutes: s.minutes,
          blocks: s.blocks,
          note: s.note?.trim() || undefined,
        });
        return;
      case "dialogue": {
        const exchanges = (s.exchanges ?? [])
          .map(parseExchange)
          .filter((e): e is { speaker: "tutor" | "student"; text: string } => e !== null);
        if (exchanges.length === 0) return;
        sections.push({ kind: "dialogue", id, heading: s.heading, minutes: s.minutes, exchanges });
        return;
      }
      case "worked-example": {
        const bankEx =
          s.bankExampleIndex !== undefined && s.bankExampleIndex >= 0
            ? lesson.workedExamples[s.bankExampleIndex]
            : undefined;
        const example = bankEx
          ? toTutorWorkedExample(bankEx)
          : s.exampleQuestionLatex?.trim()
            ? {
                title: s.exampleTitle?.trim() || s.heading,
                questionLatex: s.exampleQuestionLatex,
                steps: (s.exampleSteps ?? []).map((st) => {
                  const [explanation, latex] = splitDelim(st);
                  return { explanation, latex: latex || undefined };
                }),
                finalAnswerLatex: s.exampleFinalAnswerLatex?.trim() || "",
              }
            : null;
        if (!example) return;
        if (!bankEx && (example.steps.length === 0 || !example.finalAnswerLatex)) return;
        sections.push({ kind: "worked-example", id, heading: s.heading, minutes: s.minutes, example });
        return;
      }
      case "questions": {
        const questions: TutorQuestion[] = [];
        for (const qid of s.questionIds ?? []) {
          const q = bank.get(qid);
          if (q && !usedIds.has(qid)) {
            usedIds.add(qid);
            questions.push(q);
          }
        }
        (s.newQuestions ?? []).forEach((nq, j) => {
          if (!nq.prompt?.trim() || !nq.answer?.trim()) return;
          const choices = (nq.choices ?? [])
            .map(parseChoice)
            .filter((c): c is { label: string; text: string } => c !== null);
          questions.push({
            id: `${id}-q${j + 1}`,
            prompt: nq.prompt,
            displayLatex: nq.displayLatex ?? "",
            isMultipleChoice: choices.length > 0,
            choices: choices.length > 0 ? choices : undefined,
            answer: nq.answer,
            hint: nq.hint?.trim() || undefined,
            explanation: nq.explanation?.trim() || undefined,
          });
        });
        if (questions.length === 0) return;
        sections.push({ kind: "questions", id, heading: s.heading, minutes: s.minutes, questions });
        return;
      }
      case "misconceptions": {
        const items = (s.items ?? [])
          .map((entry) => {
            const [mistake, fix] = splitDelim(entry);
            return mistake && fix ? { mistake, fix } : null;
          })
          .filter((m): m is { mistake: string; fix: string } => m !== null);
        if (items.length === 0) return;
        sections.push({ kind: "misconceptions", id, heading: s.heading, minutes: s.minutes, items });
        return;
      }
      case "prompts":
        if (!s.prompts?.length) return;
        sections.push({ kind: "prompts", id, heading: s.heading, minutes: s.minutes, prompts: s.prompts });
        return;
      case "homework":
        if (!s.suggestion?.trim()) return;
        sections.push({ kind: "homework", id, heading: s.heading, minutes: s.minutes, suggestion: s.suggestion });
        return;
    }
  });

  // The prompt requires both, but retain a deterministic safety net so every
  // generated plan always contains level-specific support and independent work.
  if (!sections.some((section) => /scaffold/i.test(section.heading))) {
    sections.splice(Math.min(2, sections.length), 0, buildScaffoldingSection(level, deliveryMode));
  }
  if (!sections.some((section) => /independent practice/i.test(section.heading))) {
    const questions = selectIndependentQuestions(lesson, level, length).filter(
      (question) => !usedIds.has(question.id),
    );
    if (questions.length > 0) {
      const homeworkIndex = sections.findIndex((section) => section.kind === "homework");
      const insertionIndex = homeworkIndex === -1 ? sections.length : homeworkIndex;
      sections.splice(insertionIndex, 0, {
        kind: "questions",
        id: "ai-independent-practice-fallback",
        heading: `Independent Practice — ${level.replace("level-", "Level ")}`,
        minutes: Math.max(4, questions.length * 2),
        questions,
      });
    }
  }

  const successCriteria = syllabusScope
    ? scopedSuccessCriteria(lesson, syllabusScope)
    : Array.isArray(ai.successCriteria) && ai.successCriteria.length > 0
      ? ai.successCriteria
      : lesson.successCriteria;

  if (
    syllabusScope &&
    !sections.some((section) =>
      /nesa syllabus (alignment|scope)/i.test(section.heading),
    )
  ) {
    sections.splice(Math.min(1, sections.length), 0, {
      kind: "criteria",
      id: "nesa-syllabus-alignment",
      heading: "NESA Syllabus Alignment",
      minutes: 0,
      items: syllabusScopeItems(syllabusScope),
    });
  }

  // Pin the success criteria as a reference card near the top, matching the
  // built-in generator's layout.
  sections.splice(Math.min(1, sections.length), 0, {
    kind: "criteria",
    id: "ai-success-criteria",
    heading: "Success Criteria",
    minutes: 0,
    items: successCriteria,
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
    learningGoal:
      (typeof ai.learningGoal === "string" && ai.learningGoal.trim()) ||
      lesson.learningIntention,
    successCriteria,
    sections,
    generator: "ai",
    model,
  };
}

// ── Main entry point ─────────────────────────────────────────────────────────

async function requestPlan(
  client: Anthropic,
  model: string,
  userContent: string,
): Promise<Anthropic.Message> {
  // Streamed because full lessons run long (well past the non-streaming
  // timeout comfort zone). Fable 5 keeps thinking always-on — no thinking
  // param, no sampling params.
  const stream = client.messages.stream({
    model,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
  });
  return stream.finalMessage();
}

// Tolerate markdown fences or stray prose around the JSON object.
function extractJson(text: string): AiPlan {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) {
    throw new Error("Response contained no JSON object.");
  }
  return JSON.parse(text.slice(start, end + 1)) as AiPlan;
}

export async function generateAiLessonPlan(
  lesson: ExplicitLesson,
  opts: {
    length: LessonLength;
    level: StudentLevel;
    deliveryMode: LessonDeliveryMode;
    syllabusScope?: LessonSyllabusScope;
  },
): Promise<{ plan: TutorLessonPlan; model: string }> {
  if (!aiLessonPlannerEnabled()) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const client = new Anthropic();
  const userContent = buildUserContent(
    lesson,
    opts.length,
    opts.level,
    opts.deliveryMode,
    opts.syllabusScope,
  );

  let model = MODEL;
  let message = await requestPlan(client, model, userContent);

  // Safety classifiers can decline a request (HTTP 200, stop_reason
  // "refusal"). Vanishingly unlikely for maths lessons, but retry once on the
  // Opus fallback rather than failing the admin's generation outright.
  if (message.stop_reason === "refusal" && model !== FALLBACK_MODEL) {
    model = FALLBACK_MODEL;
    message = await requestPlan(client, model, userContent);
  }
  if (message.stop_reason === "refusal") {
    throw new Error("The model declined to generate this lesson plan.");
  }

  const readText = (m: Anthropic.Message) =>
    m.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

  let text = readText(message);
  if (!text.trim()) {
    throw new Error(`Empty response from ${model} (stop_reason: ${message.stop_reason}).`);
  }

  let ai: AiPlan;
  try {
    ai = extractJson(text);
  } catch {
    // JSON contract is prompt-enforced, so tolerate one bad emission and retry.
    message = await requestPlan(client, model, userContent);
    text = readText(message);
    ai = extractJson(text);
  }
  if (!Array.isArray(ai.sections)) {
    throw new Error("Response JSON was missing a sections array.");
  }
  const plan = assemblePlan(
    ai,
    lesson,
    opts.length,
    opts.level,
    opts.deliveryMode,
    opts.syllabusScope,
    model,
  );

  if (plan.sections.filter((s) => s.kind !== "criteria").length < 3) {
    throw new Error("Generated plan was too sparse — please try again.");
  }

  return { plan, model };
}
