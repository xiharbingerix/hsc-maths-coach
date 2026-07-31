/**
 * Deterministic question audit (no LLM). Scans lib/lessons, lib/challenges and
 * lib/exams for:
 *  - UNFORMATTED-MATH: math notation in MathText-rendered fields (prompt, choice
 *    text, hint, explanation) that the MathText auto-wrapper does NOT catch, so
 *    it renders literally (e.g. "2^3", "(x+1)^2", "x^{10}", bare "\frac").
 *  - BROKEN-LATEX: unbalanced $ in MathText fields; unbalanced { } or stray $ in
 *    latex (BlockMath) fields.
 *  - SELF-REVEAL: an MCQ whose latex/prompt equals the correct option's text.
 *
 * The detector calls the same framework-free tokeniser as MathText so the audit
 * stays aligned with what the learner actually sees.
 */
import fs from "fs";
import path from "path";
import { tokenizeMathText } from "../lib/mathText";

// Plain-text that survives MathText rendering (i.e. shown literally).
function renderedPlainText(s: string): string {
  return tokenizeMathText(s)
    .filter((segment) => segment.type === "text")
    .map((segment) => segment.value)
    .join("");
}

const LATEX_CMD_RE =
  /\\(frac|dfrac|tfrac|sqrt|cdot|times|div|pi|theta|alpha|beta|lambda|mu|le|ge|leq|geq|neq|approx|sum|int|sin|cos|tan|ln|log|infty|pm|circ|degree)\b/;

function checkMathTextField(s: string): string[] {
  const issues: string[] = [];
  const plain = renderedPlainText(s);
  if (/\^/.test(plain)) issues.push("UNFORMATTED-MATH (raw '^' renders literally)");
  if (/[A-Za-z0-9]_(\{|[A-Za-z0-9])/.test(plain))
    issues.push("UNFORMATTED-MATH (raw subscript '_' renders literally)");
  if (LATEX_CMD_RE.test(plain))
    issues.push("UNFORMATTED-MATH (LaTeX command outside $...$ renders literally)");
  return issues;
}

function checkLatexField(s: string): string[] {
  const issues: string[] = [];
  const opens = (s.match(/(?<!\\)\{/g) || []).length;
  const closes = (s.match(/(?<!\\)\}/g) || []).length;
  if (opens !== closes) issues.push(`BROKEN-LATEX (unbalanced braces ${opens}{ vs ${closes}})`);
  // Only an UNescaped $ is wrong in a BlockMath field; \$ is a literal dollar.
  if (/(?<!\\)\$/.test(s)) issues.push("BROKEN-LATEX (stray unescaped $ in latex field)");
  return issues;
}

function lineOf(content: string, index: number): number {
  return content.slice(0, index).split("\n").length;
}

const FIELD_RE =
  /\b(prompt|latex|text|hint|explanation)\s*:\s*("(?:[^"\\]|\\.)*")/g;

function decode(literal: string): string | null {
  try {
    return JSON.parse(literal) as string;
  } catch {
    return null;
  }
}

// ── self-reveal (chunk-based) ────────────────────────────────────────────────
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/\\left|\\right|\\!|\\,|\\;/g, "")
    .replace(/[\s{}]/g, "");
}
function checkSelfReveal(content: string, file: string, findings: string[]) {
  // Split into question chunks at each `id:` marker.
  const idxs: number[] = [];
  const idRe = /\bid:\s*"/g;
  let m: RegExpExecArray | null;
  while ((m = idRe.exec(content))) idxs.push(m.index);
  for (let k = 0; k < idxs.length; k++) {
    const chunk = content.slice(idxs[k], idxs[k + 1] ?? content.length);
    const ans = chunk.match(/\banswer:\s*"([A-D])"/);
    if (!ans || !/\bchoices:/.test(chunk)) continue;
    const correctLabel = ans[1];
    const choiceRe = /\{\s*label:\s*"([A-D])"\s*,\s*text:\s*("(?:[^"\\]|\\.)*")/g;
    let cm: RegExpExecArray | null;
    let correctText: string | null = null;
    while ((cm = choiceRe.exec(chunk))) {
      if (cm[1] === correctLabel) correctText = decode(cm[2]);
    }
    if (!correctText) continue;
    // Collect all option texts to distinguish "reveals the correct one" from
    // "lists every option" (the latter isn't a reveal).
    const allTexts: string[] = [];
    choiceRe.lastIndex = 0;
    while ((cm = choiceRe.exec(chunk))) {
      const t = decode(cm[2]);
      if (t) allTexts.push(t);
    }
    const latexM = chunk.match(/\blatex:\s*("(?:[^"\\]|\\.)*")/);
    const promptM = chunk.match(/\bprompt:\s*("(?:[^"\\]|\\.)*")/);
    const nCorrect = norm(correctText);
    if (nCorrect.length < 4 || /^\d+$/.test(nCorrect)) continue; // skip trivial/numeric
    for (const [field, mm] of [["latex", latexM], ["prompt", promptM]] as const) {
      if (!mm) continue;
      const val = decode(mm[1]);
      if (!val) continue;
      const nVal = norm(val);
      const containsCorrect = nVal.includes(nCorrect);
      const containsAllOthers = allTexts
        .filter((t) => norm(t) !== nCorrect)
        .every((t) => nVal.includes(norm(t)));
      // A genuine reveal: shows the correct option but NOT all the others.
      if (containsCorrect && !containsAllOthers) {
        findings.push(
          `${file}:${lineOf(content, idxs[k])} — [SELF-REVEAL] — ${field} contains the correct option "${correctText}"`
        );
      }
    }
  }
}

// ── walk ─────────────────────────────────────────────────────────────────────
function walk(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".ts")) out.push(p);
  }
  return out;
}

// Many lessons build questions with helper functions (choice(...), intAnswer(...))
// that take prompt/choice/explanation as positional STRING ARGS — FIELD_RE only
// matches `key: "value"`, so those never get scanned. This walks every string
// literal and flags ones that render raw maths AND read as prose (prompts /
// explanations) or begin with a bare LaTeX fraction (unwrapped choice text).
// Pure-maths positional latex args (no prose, not fraction-led) are left alone,
// and acceptedAnswers arrays (compared, not rendered) are skipped.
const OBJECT_FIELD_BEFORE_RE =
  /\b(prompt|latex|text|hint|explanation|id|slug|moduleSlug|moduleTitle|courseTitle|courseSlug|topicSlug|topicTitle|title|description|focus|url|mistake|fix|learningIntention|successCriteria|questionLatex|finalAnswerLatex|name|key|label|remediationHref)\s*:\s*$/;
// "Prose" = three consecutive plain words — i.e. an English sentence, which a
// prompt/explanation has but a latex field does not (latex puts words in \text{}).
const PROSE_RE = /[A-Za-z]{3,}\s+[A-Za-z]{2,}\s+[A-Za-z]{2,}/;
// Strip latex text wrappers so their inner words don't read as prose.
const TEXT_WRAP_RE = /\\(text|operatorname|mathrm|mathbf|mathit|mbox)\{[^{}]*\}/g;
const STRING_LITERAL_RE = /"((?:[^"\\]|\\.)*)"/g;

// Raw maths indicators (the things that render literally without $...$).
const RAW_MATH_RE = /\^|[A-Za-z0-9]_[A-Za-z0-9{]|\\(dfrac|frac|tfrac|sqrt|binom|sum|int|sin|cos|tan|log|ln|cdot|times|div|pi|theta|alpha|beta|le|ge|leq|geq|neq|approx|infty|pm)\b/;

function scanHelperStrings(content: string, file: string, findings: string[]) {
  let m: RegExpExecArray | null;
  STRING_LITERAL_RE.lastIndex = 0;
  while ((m = STRING_LITERAL_RE.exec(content))) {
    const value = decode(m[0]);
    if (value === null || value.length < 3) continue;
    // The broken case is raw maths with NO $...$ at all. Strings that use math
    // mode are assumed handled (and object-field ones are covered by FIELD_RE).
    if (value.includes("$")) continue;
    if (!RAW_MATH_RE.test(value)) continue;
    // Must read as prose OUTSIDE any \text{} wrapper — i.e. a prompt/explanation
    // with unwrapped maths, not a pure-maths latex arg/field.
    if (!PROSE_RE.test(value.replace(TEXT_WRAP_RE, " "))) continue;
    const before = content.slice(Math.max(0, m.index - 120), m.index);
    if (OBJECT_FIELD_BEFORE_RE.test(before.slice(-60))) continue; // FIELD_RE handles
    const acceptedAt = before.lastIndexOf("accepted");
    if (acceptedAt !== -1 && !before.slice(acceptedAt).includes("]")) continue;
    // Accurate check (auto-wrap aware): only flag maths that survives MathText's
    // auto-wrapper, so x^2 / e^x (which render fine) are not reported.
    const issues = checkMathTextField(value);
    if (issues.length === 0) continue;
    findings.push(
      `${file}:${lineOf(content, m.index)} — [${issues[0]} (helper-arg)] — ${JSON.stringify(value.slice(0, 80))}`
    );
  }
}

// All three hold MathText/BlockMath-rendered question content: lesson catalog,
// the Level-6 challenge layer, and the timed exam papers (whose MCQ choice text
// also renders via MathText, so math there needs $...$ too).
const files = [
  ...walk("lib/lessons"),
  ...walk("lib/challenges"),
  ...walk("lib/exams"),
];
const findings: string[] = [];
for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  let m: RegExpExecArray | null;
  FIELD_RE.lastIndex = 0;
  while ((m = FIELD_RE.exec(content))) {
    const field = m[1];
    const value = decode(m[2]);
    if (value === null) continue;
    const issues = field === "latex" ? checkLatexField(value) : checkMathTextField(value);
    for (const issue of issues) {
      findings.push(`${file}:${lineOf(content, m.index)} — [${issue}] — ${field}: ${JSON.stringify(value.slice(0, 80))}`);
    }
  }
  checkSelfReveal(content, file, findings);
  scanHelperStrings(content, file, findings);
}

const byType = (t: string) => findings.filter((f) => f.includes(t)).length;
console.log(findings.join("\n"));
console.log(
  `\nTOTAL: ${findings.length} | UNFORMATTED-MATH: ${byType("UNFORMATTED-MATH")} | BROKEN-LATEX: ${byType("BROKEN-LATEX")} | SELF-REVEAL: ${byType("SELF-REVEAL")}`
);
