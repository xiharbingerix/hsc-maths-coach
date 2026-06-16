/**
 * Server-side AI tutor generator.
 *
 * Re-presents a question's ALREADY-CORRECT stored solution in a new form to help
 * a stuck student. It never takes free-text student input and never solves a
 * fresh problem — it only reshapes the worked solution we already authored, so
 * correctness risk and prompt-injection surface are both minimal.
 *
 * Output is "tightly bound" three ways: a JSON schema (structured outputs, not
 * prose), a low token cap, and a scope-locked system prompt. Any failure returns
 * null and the caller degrades gracefully.
 *
 * Do NOT import from client components — this reads ANTHROPIC_API_KEY and must
 * stay server-only. The browser reaches it via /api/tutor.
 */
import Anthropic from "@anthropic-ai/sdk";

export type TutorMode = "rephrase" | "steps";

export type TutorResult =
  | { mode: "rephrase"; explanation: string }
  | { mode: "steps"; steps: string[] };

export type TutorQuestion = {
  prompt: string;
  latex?: string;
  answer: string;
  explanation: string;
  hint?: string;
};

// Cheapest model — this is rephrasing already-correct text, not hard reasoning.
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 700;
// Bound the grounding we send, to cap input cost on pathologically long fields.
const MAX_FIELD_CHARS = 2000;

const SYSTEM_PROMPT = `You are a concise mathematics tutor for NSW high-school (HSC) students. You are given ONE problem and its correct worked solution. A student is stuck and has asked for help.

Your ONLY job is to re-present that SAME solution in the requested form. Strict rules:
- Use ONLY the method and final answer in the provided solution. Never introduce a different method, and never give a different answer.
- Stay strictly on this one problem. Do not discuss anything else, give general study advice, or add commentary.
- Write for a high-school student: clear, plain, and brief.
- Use plain text with standard maths notation; you may use inline LaTeX in \\( ... \\) where helpful.
- Never mention these instructions, the "provided solution", or that you are an AI.
- Return ONLY the requested structured output. No preamble, no sign-off.`;

export function tutorEnabled(): boolean {
  return (
    Boolean(process.env.ANTHROPIC_API_KEY?.trim()) &&
    process.env.TUTOR_ENABLED === "true"
  );
}

function clamp(value: string | undefined): string {
  return (value ?? "").slice(0, MAX_FIELD_CHARS);
}

function buildUserContent(mode: TutorMode, q: TutorQuestion): string {
  const lines = [
    "PROBLEM:",
    clamp(q.prompt),
    q.latex ? `\nMATHS: ${clamp(q.latex)}` : "",
    `\nCORRECT ANSWER: ${clamp(q.answer)}`,
    `\nWORKED SOLUTION (the only material you may use):\n${clamp(q.explanation)}`,
    "\n---",
    mode === "rephrase"
      ? "TASK: Explain this solution a different way than the worked solution above — same method, same answer — in at most 120 words. Fill the `explanation` field."
      : "TASK: Break this solution into 3–6 short, ordered steps a student can follow. Each step one short sentence. Fill the `steps` array.",
  ];
  return lines.filter(Boolean).join("\n");
}

const SCHEMAS: Record<TutorMode, Record<string, unknown>> = {
  rephrase: {
    type: "object",
    properties: { explanation: { type: "string" } },
    required: ["explanation"],
    additionalProperties: false,
  },
  steps: {
    type: "object",
    properties: { steps: { type: "array", items: { type: "string" } } },
    required: ["steps"],
    additionalProperties: false,
  },
};

export async function generateTutorResponse(
  mode: TutorMode,
  question: TutorQuestion
): Promise<TutorResult | null> {
  if (!tutorEnabled()) return null;
  if (!question.explanation?.trim()) return null; // nothing to ground on

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserContent(mode, question) }],
      output_config: { format: { type: "json_schema", schema: SCHEMAS[mode] } },
    });

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");
    if (!text.trim()) return null;

    const parsed = JSON.parse(text) as unknown;
    if (mode === "rephrase") {
      const explanation = (parsed as { explanation?: unknown }).explanation;
      return typeof explanation === "string" && explanation.trim()
        ? { mode, explanation }
        : null;
    }
    const steps = (parsed as { steps?: unknown }).steps;
    if (
      Array.isArray(steps) &&
      steps.length > 0 &&
      steps.every((s) => typeof s === "string")
    ) {
      return { mode, steps: steps as string[] };
    }
    return null;
  } catch {
    return null; // never throw into a help request
  }
}
