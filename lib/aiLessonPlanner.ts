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
import {
  toTutorQuestion,
  toTutorWorkedExample,
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
  struggling:
    "STRUGGLING student: assume shaky prerequisites. Open with a short prerequisite re-teach, break every idea into the smallest possible steps, use frequent dialogue checkpoints, favour D1–D2 bank questions, and keep the pace gentle. Success is confidence plus the core skill — skip extension material.",
  "on-level":
    "ON-LEVEL student: standard pace. Cover the full skill with a balance of guided and independent work, mostly D2–D4 bank questions, and finish with one stretch question if time allows.",
  extension:
    "EXTENSION student: compress the exposition (they will get it quickly), push into the WHY and the connections early, favour the hardest bank questions (D4–D5 / mastery), include a genuine extension challenge, and use dialogue to make the student articulate reasoning, not just compute.",
};

const SYSTEM_PROMPT = `You are an expert NSW mathematics tutor and instructional designer. You author complete, explicit-teaching lesson plans for ONE-ON-ONE tutoring delivered over Zoom (one tutor, one student, screen share, chat, and verbal discussion — no whiteboards handed out, no classroom management).

You are given a topic's authored source material: teaching notes, key formulas, worked examples, and a bank of vetted practice questions (each with an id, difficulty D1–D5, and flags for multiple-choice and diagrams). Your job is to turn that raw material into a sharply-paced, Feynman-standard tutoring lesson.

TEACHING STANDARD (Feynman):
- Explain WHY before WHAT. Build each idea from something the student already knows, with a concrete example before the general rule.
- Never formula-drop: every formula must be motivated or derived in the teaching before it is used.
- Give the student a mental model (a picture, a story, an analogy) they can reconstruct the idea from.
- Anticipate the specific wrong turns students take and plan to surface them.

LESSON ARC (adapt to the time budget; this is one-on-one, so it is a conversation, not a lecture):
1. A warm opener that checks prerequisites conversationally (dialogue).
2. Explicit teaching of the core idea (text + formulas), written as a script the tutor can speak, in second person to the student.
3. Worked example(s) — "I do": tutor works it on screen share, narrating decisions.
4. Guided practice — "we do": student attempts with tutor scaffolding. Use dialogue checkpoints.
5. Independent practice — "you do": student works while tutor observes.
6. Misconception check and quick verbal CFU prompts.
7. Exit ticket (one question that proves the goal was met) and homework.

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
- Prose fields (paragraphs, dialogue text, prompts, question prompt/answer/hint/explanation, mistake/fix): plain English with inline maths wrapped in $...$ (e.g. "so $f'(x)=2x$ at every point"). Never leave maths unwrapped. Write currency as $ followed by digits with no LaTeX around it (e.g. $500) — the renderer treats that as a currency sign.
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

function buildUserContent(
  lesson: ExplicitLesson,
  length: LessonLength,
  level: StudentLevel,
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

  return [
    `TOPIC: ${lesson.title}`,
    `COURSE: ${lesson.courseTitle} — UNIT: ${lesson.moduleTitle}`,
    `SYLLABUS AREA: ${lesson.syllabusArea} | FOCUS: ${lesson.focus}`,
    `LEARNING INTENTION: ${lesson.learningIntention}`,
    `SUCCESS CRITERIA:\n${lesson.successCriteria.map((c) => `- ${c}`).join("\n")}`,
    ``,
    `LESSON LENGTH: ${length} minutes (section minutes must sum to this)`,
    `STUDENT PROFILE: ${LEVEL_GUIDANCE[level]}`,
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
    `TASK: Author the complete ${length}-minute one-on-one Zoom lesson plan for this student now.`,
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

  const successCriteria =
    Array.isArray(ai.successCriteria) && ai.successCriteria.length > 0
      ? ai.successCriteria
      : lesson.successCriteria;

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
  opts: { length: LessonLength; level: StudentLevel },
): Promise<{ plan: TutorLessonPlan; model: string }> {
  if (!aiLessonPlannerEnabled()) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const client = new Anthropic();
  const userContent = buildUserContent(lesson, opts.length, opts.level);

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
  const plan = assemblePlan(ai, lesson, opts.length, opts.level, model);

  if (plan.sections.filter((s) => s.kind !== "criteria").length < 3) {
    throw new Error("Generated plan was too sparse — please try again.");
  }

  return { plan, model };
}
