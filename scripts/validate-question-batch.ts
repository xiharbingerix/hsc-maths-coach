/**
 * Validate a Manus-generated question batch before import.
 *
 * Usage:
 *   npx tsx scripts/validate-question-batch.ts path/to/batch.json
 *   npx tsx scripts/validate-question-batch.ts path/to/batch.json --strict
 *   npx tsx scripts/validate-question-batch.ts --example
 *
 * Exit codes:
 *   0 — all records pass (warnings are printed but do not fail)
 *   1 — one or more records have errors, or --strict and warnings exist
 *
 * See docs/QUESTION-BATCH-IMPORT.md for the full format spec and examples.
 */

import * as fs from "fs";
import * as path from "path";

// ── Known values (kept in sync with seed-question-bank.ts) ───────────────────

const KNOWN_COURSE_SLUGS = new Set([
  "year-8-mathematics",
  "year-9-mathematics",
  "year-10-mathematics",
  "year-11-standard",
  "year-11-advanced",
  "year-11-extension",
  "year-12-advanced",
  "year-12-standard-2",
  "year-12-extension-1",
]);

const ALLOWED_QUESTION_TYPES = new Set(["conceptual", "procedural"]);

const PLACEHOLDER_PATTERNS = [
  /TODO/i,
  /lorem ipsum/i,
  /placeholder lesson/i,
  /generated fallback/i,
  /sample question/i,
  /insert question here/i,
  /TBD/i,
];

const MOJIBAKE_PATTERN = /(?:Â|â|Ï|Ë|áµ|Ã|â‚|â|â€)/;

const GENERIC_EXPLANATION =
  "Review the worked method and compare each step with the expected answer.";

const MIN_EXPLANATION_LENGTH = 40;

const DRAFT_LANGUAGE_PATTERNS = [
  /\bWait\b/i,
  /\brecalculate\b/i,
  /\bHmm\b/i,
  /\blet me (?:check|recheck|recalculate|think)\b/i,
  /\bon second thought\b/i,
  /\bactually,?\s+(?:that|this|the answer|it)\b/i,
  /\bI (?:made|have made) (?:a )?mistake\b/i,
  /\bcorrection\b/i,
];

const MULTI_PART_PROMPT_PATTERNS = [
  /\(\s*a\s*\)[\s\S]*?\(\s*b\s*\)/i,
  /\bpart\s+a\b[\s\S]*?\bpart\s+b\b/i,
  /\bfirst\b[\s\S]*?\bthen\b[\s\S]*?\bfind\b/i,
  /\bfind\b[^.?!]*\band\b[^.?!]*\b(?:find|calculate|determine|hence)\b/i,
  /\bhence\b[\s\S]*?\b(?:find|calculate|determine|show)\b/i,
];

const UNSUPPORTED_ADVANCED_PATTERNS = [
  {
    pattern: /(?:anti-?derivative|integral|integrate|\\int|∫)[\s\S]{0,80}(?:\\arctan|arctan|tan\^\{-1\}|tan\^-1)/i,
    message:
      "unsupported Year 12 Advanced pattern: arctan antiderivative/integral content appears to be Extension-level.",
  },
];

/**
 * Detects whether a prompt text appears to state the answer outright.
 * Only checks numeric answers ≥ 10 to reduce noise; single digits are too
 * common in prompts to be meaningful.
 */
function promptRevealsAnswer(prompt: string, answer: string): boolean {
  const numeric = Number(answer.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(numeric) || Math.abs(numeric) < 10) return false;
  // Match the answer as a standalone number token (not part of a larger number)
  const escaped = String(Math.abs(numeric)).replace(/\./g, "\\.");
  return new RegExp(`(?<![\\d.])${escaped}(?![\\d])`, "g").test(prompt);
}

/**
 * Detects a latex field that looks like multi-step working rather than a
 * single display formula.  Flags when the field contains an evaluation chain
 * like "= X = Y" (a number immediately following one = sign, then another =).
 */
function latexContainsWorkingSteps(latex: string): boolean {
  // Evaluation chain: = <number> = (e.g. "= 120 = ...")
  if (/=\s*-?\d+(?:[.,]\d+)?\s*=/.test(latex)) return true;
  // Explicit step arrows
  if (/\\(?:Rightarrow|implies|therefore|Longrightarrow)/.test(latex)) return true;
  return false;
}

const PROMPT_CONTRADICTION_PAIRS = [
  {
    prompt: /\bnot simply\b/i,
    explanation: /\b(?:does equal|is equal to|equals|is simply)\b/i,
    message:
      'prompt says "not simply" but explanation appears to assert equality/simplicity.',
  },
  {
    prompt: /\b(?:does not equal|not equal to|isn'?t equal to)\b/i,
    explanation: /\b(?:does equal|is equal to|equals)\b/i,
    message:
      "prompt denies equality but explanation appears to assert equality.",
  },
];

// ── Types ─────────────────────────────────────────────────────────────────────

type Choice = { label: string; text: string };

export type QuestionBatchRecord = {
  source_id: string;
  topic_slug: string;
  subtopic_slug: string;
  year_level: string;
  course_slug: string;
  difficulty: number;
  question_type: string;
  prompt: string;
  latex?: string | null;
  choices?: Choice[] | null;
  answer: string;
  accepted_answers: string[];
  hint?: string | null;
  explanation: string;
  syllabus_ref?: string | null;
  transfer_from_topics: string[];
  is_active?: boolean;
  diagram_data?: Record<string, unknown> | null;
};

type BatchFile =
  | QuestionBatchRecord[]
  | {
      batch_id?: string;
      generated_by?: string;
      questions: QuestionBatchRecord[];
    };

type Issue = { level: "error" | "warning"; message: string };

export type RecordResult = {
  record: QuestionBatchRecord;
  index: number;
  issues: Issue[];
};

export type LoadedQuestionBatch = {
  batchId: string;
  records: unknown[];
};

// ── Dollar / LaTeX pattern checks ─────────────────────────────────────────────

/**
 * Count dollar signs that are NOT preceded by a backslash AND are NOT the
 * start of a currency amount (e.g. $500).  Used to detect unclosed LaTeX spans.
 */
function countLatexDollars(text: string): number {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "\\") { i++; continue; }
    if (text[i] === "$") {
      const next = text[i + 1];
      if (!next || !/\d/.test(next)) count++;
    }
  }
  return count;
}

/**
 * Check rendered-text fields for known dollar/currency anti-patterns.
 * Returns a list of error/warning issues.
 */
function checkDollarPatterns(text: string, field: string): Issue[] {
  const issues: Issue[] = [];

  if (MOJIBAKE_PATTERN.test(text)) {
    issues.push({
      level: "error",
      message:
        `${field}: likely mojibake/encoding corruption found. ` +
        `Replace garbled text such as "Â", "âˆ’", or "Ï€" with clean ASCII or LaTeX.`,
    });
  }

  // Stray backslash before a currency amount — the bug fixed in the diagnostics.
  if (/\\\$\d/.test(text)) {
    issues.push({
      level: "error",
      message:
        `${field}: \\$number found (e.g. "\\$500"). ` +
        `MathText renders the \\ as a stray character. ` +
        `Use plain $500 for currency — MathText detects it automatically.`,
    });
  }

  // Unclosed LaTeX math span.
  const latexDollarCount = countLatexDollars(text);
  if (latexDollarCount % 2 !== 0) {
    issues.push({
      level: "warning",
      message:
        `${field}: odd number of LaTeX $ delimiters (${latexDollarCount}) — ` +
        `possible unclosed math span (e.g. "$x + 1" missing closing $).`,
    });
  }

  return issues;
}

function stripLatexCommands(text: string): string {
  return text
    .replace(/\\dfrac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "($1/$2)")
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "($1/$2)")
    .replace(/\\(?:left|right|times|cdot|approx|text|,|;|!)/g, " ")
    .replace(/[{}]/g, " ");
}

function numericTokens(text: string): number[] {
  const normalised = stripLatexCommands(text)
    .replace(/\\%/g, "%")
    .replace(/\$/g, " ");
  const values: number[] = [];
  for (const match of normalised.matchAll(/-?\d+(?:,\d{3})*(?:\.\d+)?%?/g)) {
    const raw = match[0];
    const numeric = Number(raw.replace(/,/g, "").replace(/%$/, ""));
    if (Number.isFinite(numeric)) values.push(numeric);
  }
  return values;
}

function numbersClose(a: number, b: number): boolean {
  const tolerance = Math.max(0.01, Math.abs(a) * 0.002);
  return Math.abs(a - b) <= tolerance;
}

function choiceTextForAnswer(
  choices: unknown,
  answer: string | null
): string | null {
  if (!Array.isArray(choices) || !answer) return answer;
  const match = (choices as Choice[]).find((choice) => choice.label === answer);
  return match?.text ?? answer;
}

function hasSingleAnswerField(r: Record<string, unknown>): boolean {
  const choices = r["choices"];
  const acceptedAnswers = r["accepted_answers"];
  return (
    choices === null ||
    choices === undefined ||
    (Array.isArray(acceptedAnswers) && acceptedAnswers.length <= 1)
  );
}

function finalStatedNumericAnswer(explanation: string): string | null {
  const matches = [
    ...explanation.matchAll(
      /(?:exact value is|answer is|solution is)\s*(?:[a-z]\s*=\s*)?(-?\d+(?:\.\d+)?)(?=\s|\.|$)/gi
    ),
  ];
  return matches.at(-1)?.[1] ?? null;
}

function normaliseSimpleAnswer(text: string): string {
  return text
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/\b(?:k|x|t|a)\s*=/g, "")
    .replace(
      /\b(?:units?|millimetres?|millimeters?|mm|centimetres?|centimeters?|cm|kilometres?|kilometers?|km|metres?|meters?|m|kilograms?|kg|grams?|g|millilitres?|milliliters?|ml|litres?|liters?|l|hours?|hrs?|minutes?|mins?|seconds?|secs?|dollars?|aud|degrees?|deg)\b/g,
      ""
    )
    .replace(/\s+/g, "")
    .trim();
}

// ── Per-record validation ─────────────────────────────────────────────────────

export function validateRecord(
  record: unknown,
  index: number
): RecordResult {
  const issues: Issue[] = [];

  function err(msg: string) { issues.push({ level: "error", message: msg }); }
  function warn(msg: string) { issues.push({ level: "warning", message: msg }); }

  if (typeof record !== "object" || record === null || Array.isArray(record)) {
    err("Record is not an object.");
    return { record: record as QuestionBatchRecord, index, issues };
  }

  const r = record as Record<string, unknown>;

  // ── Required string fields ────────────────────────────────────────────────
  const REQUIRED_STRINGS = [
    "source_id", "topic_slug", "subtopic_slug", "year_level",
    "course_slug", "prompt", "answer", "explanation",
  ] as const;

  for (const field of REQUIRED_STRINGS) {
    const v = r[field];
    if (v === undefined || v === null) {
      err(`Missing required field: ${field}`);
    } else if (typeof v !== "string") {
      err(`${field} must be a string (got ${typeof v})`);
    } else if (v.trim() === "") {
      err(`${field} is empty`);
    }
  }

  // ── difficulty ────────────────────────────────────────────────────────────
  const diff = r["difficulty"];
  if (diff === undefined || diff === null) {
    err("Missing required field: difficulty");
  } else if (!Number.isInteger(diff) || (diff as number) < 1 || (diff as number) > 5) {
    err(`difficulty must be an integer 1–5 (got ${JSON.stringify(diff)})`);
  }

  // ── question_type ─────────────────────────────────────────────────────────
  const qt = r["question_type"];
  if (qt === undefined || qt === null) {
    err("Missing required field: question_type");
  } else if (!ALLOWED_QUESTION_TYPES.has(qt as string)) {
    err(
      `question_type must be "conceptual" or "procedural" ` +
      `(got ${JSON.stringify(qt)})`
    );
  }

  // ── accepted_answers ──────────────────────────────────────────────────────
  const aa = r["accepted_answers"];
  if (!Array.isArray(aa)) {
    err(
      `accepted_answers must be an array (got ${typeof aa}). ` +
      `Use [] for typed questions with a single canonical answer.`
    );
  } else if ((aa as unknown[]).some((v) => typeof v !== "string")) {
    err("accepted_answers must be an array of strings");
  }

  // ── transfer_from_topics ──────────────────────────────────────────────────
  const tft = r["transfer_from_topics"];
  if (!Array.isArray(tft)) {
    err(
      `transfer_from_topics must be an array (got ${typeof tft}). ` +
      `Use [] if there are no prerequisite topics.`
    );
  }

  // ── is_active ─────────────────────────────────────────────────────────────
  if (r["is_active"] !== undefined && typeof r["is_active"] !== "boolean") {
    warn(`is_active should be a boolean (got ${typeof r["is_active"]}). Defaults to true.`);
  }

  // ── explanation quality ───────────────────────────────────────────────────
  const explanation = typeof r["explanation"] === "string" ? r["explanation"] : "";
  if (explanation) {
    if (explanation.trim() === GENERIC_EXPLANATION) {
      err(
        `explanation is the generic seed fallback string. ` +
        `Replace it with a step-by-step explanation of this specific question.`
      );
    } else if (explanation.length < MIN_EXPLANATION_LENGTH) {
      warn(
        `explanation is very short (${explanation.length} chars). ` +
        `Aim for a step-by-step answer with at least ${MIN_EXPLANATION_LENGTH} characters.`
      );
    }
    if (PLACEHOLDER_PATTERNS.some((p) => p.test(explanation))) {
      err("explanation contains placeholder text (TODO, lorem ipsum, etc.)");
    }
    const draftPattern = DRAFT_LANGUAGE_PATTERNS.find((p) =>
      p.test(explanation)
    );
    if (draftPattern) {
      err(
        `explanation contains draft/self-correction language ` +
        `(${draftPattern.toString()}). Remove reasoning chatter such as ` +
        `"Wait", "Hmm", "recalculate", or corrections.`
      );
    }
  }

  // ── prompt quality ────────────────────────────────────────────────────────
  const prompt = typeof r["prompt"] === "string" ? r["prompt"] : "";
  if (prompt && PLACEHOLDER_PATTERNS.some((p) => p.test(prompt))) {
    err("prompt contains placeholder text");
  }
  if (
    prompt &&
    hasSingleAnswerField(r) &&
    MULTI_PART_PROMPT_PATTERNS.some((p) => p.test(prompt))
  ) {
    err(
      `prompt appears to contain multiple parts but the record has a single ` +
      `answer field. Split into separate questions or make the expected ` +
      `combined answer explicit.`
    );
  }

  // ── course_slug / year_level ──────────────────────────────────────────────
  const courseSlug = typeof r["course_slug"] === "string" ? r["course_slug"] : "";
  if (courseSlug && !KNOWN_COURSE_SLUGS.has(courseSlug)) {
    warn(
      `course_slug "${courseSlug}" is not in the known list. ` +
      `Known: ${[...KNOWN_COURSE_SLUGS].join(", ")}`
    );
  }
  if (courseSlug === "year-12-advanced") {
    const combinedText = [prompt, explanation, r["latex"]]
      .filter((v): v is string => typeof v === "string")
      .join("\n");
    for (const unsupported of UNSUPPORTED_ADVANCED_PATTERNS) {
      if (unsupported.pattern.test(combinedText)) {
        err(unsupported.message);
      }
    }
  }

  if (prompt && explanation) {
    for (const pair of PROMPT_CONTRADICTION_PAIRS) {
      if (pair.prompt.test(prompt) && pair.explanation.test(explanation)) {
        err(`possible prompt/explanation contradiction: ${pair.message}`);
      }
    }
  }

  const yearLevel = typeof r["year_level"] === "string" ? r["year_level"] : "";
  if (yearLevel && !/^year-\d+$/.test(yearLevel)) {
    warn(
      `year_level "${yearLevel}" does not match expected pattern "year-N" ` +
      `(e.g. "year-9", "year-12")`
    );
  }

  // ── choices / MCQ consistency ─────────────────────────────────────────────
  const choices = r["choices"];
  const answer = typeof r["answer"] === "string" ? r["answer"] : null;
  const answerText = choiceTextForAnswer(choices, answer);

  if (choices !== null && choices !== undefined) {
    if (!Array.isArray(choices)) {
      err("choices must be an array or null");
    } else if ((choices as unknown[]).length < 2) {
      err("choices array must have at least 2 entries (MCQ requires options)");
    } else {
      const choiceList = choices as Choice[];

      for (let i = 0; i < choiceList.length; i++) {
        const c = choiceList[i];
        if (typeof c !== "object" || c === null) {
          err(`choices[${i}] is not an object`);
          continue;
        }
        if (!c.label || typeof c.label !== "string") {
          err(`choices[${i}]: missing or invalid "label" field`);
        }
        if (!c.text || typeof c.text !== "string") {
          err(`choices[${i}]: missing or invalid "text" field`);
        }
        // Dollar patterns in choice text.
        if (c.text) {
          issues.push(...checkDollarPatterns(c.text, `choices[${i}].text`));
        }
      }

      if (choiceList.length > 0 && answer) {
        const labels = choiceList.map((c) => c.label);
        if (!labels.includes(answer)) {
          err(
            `answer "${answer}" is not a valid choice label. ` +
            `Valid labels: ${labels.join(", ")}`
          );
        }
      }

      if (qt === "procedural") {
        warn(
          `question_type is "procedural" but choices is non-null. ` +
          `MCQ questions should use "conceptual".`
        );
      }

      if (choiceList.length !== 4) {
        warn(
          `${choiceList.length} choices provided. ` +
          `Standard question format is 4 choices (A, B, C, D).`
        );
      }
    }
  } else {
    // Typed answer question.
    if (qt === "conceptual" && choices === null) {
      warn(
        `question_type is "conceptual" but choices is null. ` +
        `Typed-answer questions should use "procedural".`
      );
    }
  }

  if (answerText && explanation) {
    const statedFinal = finalStatedNumericAnswer(explanation);
    if (
      statedFinal !== null &&
      ![normaliseSimpleAnswer(statedFinal), `=${normaliseSimpleAnswer(statedFinal)}`]
        .includes(normaliseSimpleAnswer(answerText))
    ) {
      err(
        `answer appears to contradict explanation: explanation states final ` +
        `answer ${statedFinal}, but answer field is "${answerText}".`
      );
    }

    const answerNumbers = numericTokens(answerText);
    const explanationNumbers = numericTokens(explanation);
    if (answerNumbers.length === 1 && explanationNumbers.length > 0) {
      const answerNumber = answerNumbers[0];
      const finalExplanationNumber =
        explanationNumbers[explanationNumbers.length - 1];
      const explanationContainsAnswer = explanationNumbers.some((n) =>
        numbersClose(n, answerNumber)
      );
      const finalContradictsAnswer = !numbersClose(
        finalExplanationNumber,
        answerNumber
      );

      if (!explanationContainsAnswer && finalContradictsAnswer) {
        err(
          `answer appears to contradict explanation numerically: answer ` +
          `"${answerText}" gives ${answerNumber}, but the explanation's final ` +
          `number appears to be ${finalExplanationNumber}.`
        );
      }
    }
  }

  // ── Dollar patterns in top-level text fields ──────────────────────────────
  if (prompt)      issues.push(...checkDollarPatterns(prompt,      "prompt"));
  if (explanation) issues.push(...checkDollarPatterns(explanation, "explanation"));

  const latex = typeof r["latex"] === "string" ? r["latex"] : null;
  if (latex)       issues.push(...checkDollarPatterns(latex,       "latex"));

  const hint = typeof r["hint"] === "string" ? r["hint"] : null;
  if (hint)        issues.push(...checkDollarPatterns(hint,        "hint"));

  // ── Answer-reveal and latex-working-steps checks ──────────────────────────
  if (prompt && answer && promptRevealsAnswer(prompt, answer)) {
    warn(
      `prompt may state the answer directly (answer "${answer}" appears as ` +
      `a standalone number in the prompt). Rephrase so students must calculate ` +
      `the value rather than read it off.`
    );
  }

  if (latex && latexContainsWorkingSteps(latex)) {
    warn(
      `latex field appears to contain multi-step working (e.g. "= X = Y" ` +
      `evaluation chain or step arrows). The latex field should display a ` +
      `single formula or expression — move worked steps to the explanation.`
    );
  }

  // ── source_id format hint ─────────────────────────────────────────────────
  const sourceId = typeof r["source_id"] === "string" ? r["source_id"] : "";
  if (
    sourceId &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sourceId)
  ) {
    warn(
      `source_id looks like a UUID ("${sourceId.slice(0, 8)}…"). ` +
      `Use a human-readable stable ID like "y9-idx-intro-g1" so questions ` +
      `can be referenced and deduplicated reliably.`
    );
  }

  return {
    record: record as QuestionBatchRecord,
    index,
    issues,
  };
}

// ── Batch-level checks ────────────────────────────────────────────────────────

export function checkBatchDuplicates(results: RecordResult[]): void {
  const seen = new Map<string, number>();

  for (const result of results) {
    const sourceId =
      typeof result.record?.source_id === "string"
        ? result.record.source_id
        : null;

    if (!sourceId) continue;

    if (seen.has(sourceId)) {
      result.issues.push({
        level: "error",
        message:
          `Duplicate source_id "${sourceId}" — also appears at index ${seen.get(sourceId)}.`,
      });
    } else {
      seen.set(sourceId, result.index);
    }
  }
}

export function parseQuestionBatch(raw: unknown): LoadedQuestionBatch {
  if (Array.isArray(raw)) {
    return { records: raw, batchId: "(no batch_id)" };
  }

  if (
    typeof raw === "object" &&
    raw !== null &&
    "questions" in raw &&
    Array.isArray((raw as Record<string, unknown>)["questions"])
  ) {
    const wrapped = raw as Record<string, unknown>;
    return {
      records: wrapped["questions"] as unknown[],
      batchId:
        typeof wrapped["batch_id"] === "string"
          ? wrapped["batch_id"]
          : "(no batch_id)",
    };
  }

  throw new Error(
    'JSON must be an array of question records or an object with a "questions" array. See --example.'
  );
}

export function loadQuestionBatchFile(filePath: string): LoadedQuestionBatch {
  const resolved = path.resolve(filePath);

  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(resolved, "utf-8"));
  } catch (e) {
    throw new Error(`Failed to parse JSON — ${(e as Error).message}`);
  }

  return parseQuestionBatch(raw);
}

export function validateQuestionBatch(records: unknown[]): RecordResult[] {
  const results = records.map((rec, i) => validateRecord(rec, i));
  checkBatchDuplicates(results);
  return results;
}

// ── Example output ────────────────────────────────────────────────────────────

function printExample(): void {
  const example = {
    batch_id: "manus-2026-06-10-y9-financial",
    generated_by: "manus",
    questions: [
      {
        source_id: "y9-fin-si-g1",
        topic_slug: "financial-mathematics",
        subtopic_slug: "simple-interest",
        year_level: "year-9",
        course_slug: "year-9-mathematics",
        difficulty: 2,
        question_type: "procedural",
        prompt: "Calculate the simple interest on a principal of $800 at $5\\%$ per annum for $3$ years.",
        latex: "I = \\frac{PRT}{100}",
        choices: null,
        answer: "120",
        accepted_answers: ["$120", "120.00", "$120.00"],
        hint: "Substitute P = 800, R = 5, T = 3 into the formula.",
        explanation: "$I = \\frac{800 \\times 5 \\times 3}{100} = \\frac{12000}{100} = 120$. The simple interest is $120.",
        syllabus_ref: null,
        transfer_from_topics: ["percentages"],
        is_active: true,
        diagram_data: null,
      },
      {
        source_id: "y9-fin-ci-mc1",
        topic_slug: "financial-mathematics",
        subtopic_slug: "compound-interest",
        year_level: "year-9",
        course_slug: "year-9-mathematics",
        difficulty: 3,
        question_type: "conceptual",
        prompt: "Which expression gives the compound amount when $P = 1000$, $r = 0.05$, and $n = 2$ years?",
        latex: "A = P(1 + r)^n",
        choices: [
          { label: "A", text: "$= 1000 \\times 0.05 \\times 2$" },
          { label: "B", text: "$= 1000 \\times (1.05)^2$" },
          { label: "C", text: "$= 1000 + 0.05 \\times 2$" },
          { label: "D", text: "$= 1000 \\times 1.1$" },
        ],
        answer: "B",
        accepted_answers: [],
        hint: null,
        explanation: "$A = 1000 \\times (1 + 0.05)^2 = 1000 \\times (1.05)^2 = 1000 \\times 1.1025 = 1102.50$. Option B is the only expression that matches the compound interest formula.",
        syllabus_ref: null,
        transfer_from_topics: ["financial-mathematics/simple-interest"],
        is_active: true,
        diagram_data: null,
      },
    ],
  };

  console.log(JSON.stringify(example, null, 2));
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main(): void {
  const args = process.argv.slice(2);

  if (args.includes("--help")) {
    console.log(`
Usage: npx tsx scripts/validate-question-batch.ts <file.json> [--strict]
       npx tsx scripts/validate-question-batch.ts --example

Options:
  --strict    Treat warnings as errors (exit 1 if any warnings).
  --example   Print a valid example batch to stdout and exit.
  --help      Show this message.
    `);
    process.exit(0);
  }

  if (args.includes("--example")) {
    printExample();
    process.exit(0);
  }

  const strict = args.includes("--strict");
  const filePath = args.find((a) => !a.startsWith("--"));

  if (!filePath) {
    console.error("Error: No file path provided.");
    console.error("Usage: npx tsx scripts/validate-question-batch.ts path/to/batch.json");
    process.exit(1);
  }

  const resolved = path.resolve(filePath);

  let loaded: LoadedQuestionBatch;
  try {
    loaded = loadQuestionBatchFile(resolved);
  } catch (e) {
    console.error(`Error: ${(e as Error).message}`);
    process.exit(1);
  }

  const { records, batchId } = loaded;

  console.log("━".repeat(62));
  console.log(`  Question batch validator`);
  console.log("━".repeat(62));
  console.log(`  File    : ${path.basename(resolved)}`);
  console.log(`  Batch   : ${batchId}`);
  console.log(`  Records : ${records.length}`);
  console.log(`  Mode    : ${strict ? "STRICT (warnings = errors)" : "standard"}`);
  console.log("━".repeat(62));
  console.log();

  const results = validateQuestionBatch(records);

  // Print results.
  let errorCount = 0;
  let warnCount = 0;
  let passCount = 0;

  for (const result of results) {
    const errors = result.issues.filter((i) => i.level === "error");
    const warnings = result.issues.filter((i) => i.level === "warning");

    const rec = result.record;
    const label =
      typeof rec?.source_id === "string" && rec.source_id
        ? rec.source_id
        : `[index ${result.index}]`;

    if (errors.length === 0 && warnings.length === 0) {
      passCount++;
      console.log(`  ✓ ${label}`);
    } else {
      if (errors.length > 0) errorCount++;
      if (warnings.length > 0) warnCount++;

      const status = errors.length > 0 ? "✗" : "⚠";
      console.log(`  ${status} ${label}`);
      for (const issue of result.issues) {
        const prefix = issue.level === "error" ? "    ERROR  " : "    WARN   ";
        console.log(`${prefix}${issue.message}`);
      }
    }
  }

  // Summary.
  console.log();
  console.log("━".repeat(62));
  const failingRecords = results.filter((r) =>
    r.issues.some((i) => i.level === "error")
  ).length;
  const warningRecords = results.filter((r) =>
    r.issues.some((i) => i.level === "warning") &&
    r.issues.every((i) => i.level !== "error")
  ).length;

  console.log(`  Records    : ${records.length}`);
  console.log(`  Pass       : ${passCount}`);
  console.log(`  Warnings   : ${warningRecords} record(s) with warnings`);
  console.log(`  Errors     : ${failingRecords} record(s) with errors`);
  console.log("━".repeat(62));

  const hasFailures = errorCount > 0 || (strict && warnCount > 0);

  if (hasFailures) {
    console.log(
      `\n✗ Validation FAILED — fix errors before importing.` +
      (strict && warnCount > 0 ? " (--strict: warnings treated as errors)" : "")
    );
    process.exit(1);
  } else if (warnCount > 0) {
    console.log(`\n⚠ Validation passed with warnings — review before importing.`);
  } else {
    console.log(`\n✓ Validation passed — batch is ready to import.`);
  }
}

if (require.main === module) {
  main();
}
