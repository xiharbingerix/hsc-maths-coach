/**
 * Deterministic question audit (no LLM). Scans lib/lessons for:
 *  - UNFORMATTED-MATH: math notation in MathText-rendered fields (prompt, choice
 *    text, hint, explanation) that the MathText auto-wrapper does NOT catch, so
 *    it renders literally (e.g. "2^3", "(x+1)^2", "x^{10}", bare "\frac").
 *  - BROKEN-LATEX: unbalanced $ in MathText fields; unbalanced { } or stray $ in
 *    latex (BlockMath) fields.
 *  - SELF-REVEAL: an MCQ whose latex/prompt equals the correct option's text.
 *
 * The auto-wrap logic is copied verbatim from app/components/MathText.tsx so the
 * detector matches what actually renders.
 */
import fs from "fs";
import path from "path";

// ── copied from MathText.tsx (keep in sync) ──────────────────────────────────
const AUTO_MATH_RE =
  /(?<![/:.@])([A-Za-z][A-Za-z0-9]*)([_^][A-Za-z0-9]{1,3})+(?:=\s*-?\d+(?:\.\d+)?)?/g;
function autoWrapPlainText(text: string): string {
  return text.replace(AUTO_MATH_RE, (m) => `$${m}$`);
}
function preprocess(input: string): string {
  const out: string[] = [];
  let i = 0;
  while (i < input.length) {
    if (input[i] === "\\" && input[i + 1] === "(") {
      const end = input.indexOf("\\)", i + 2);
      if (end !== -1) { out.push(input.slice(i, end + 2)); i = end + 2; continue; }
    }
    if (input[i] === "\\" && input[i + 1] === "[") {
      const end = input.indexOf("\\]", i + 2);
      if (end !== -1) { out.push(input.slice(i, end + 2)); i = end + 2; continue; }
    }
    if (input[i] === "$") {
      if (i + 1 < input.length && /\d/.test(input[i + 1])) {
        let k = i + 1;
        while (k < input.length && /[\d.,]/.test(input[k])) k++;
        const isMathCoefficient = /[A-Za-z^_(){}+\-*/<>=\\|]/.test(input[k] ?? "");
        if (!isMathCoefficient) { out.push("$"); i++; continue; }
      }
      let j = i + 1, closing = -1;
      while (j < input.length) {
        if (input[j] === "\\" && j + 1 < input.length) { j += 2; continue; }
        if (input[j] === "$") { closing = j; break; }
        j++;
      }
      if (closing !== -1) { out.push(input.slice(i, closing + 1)); i = closing + 1; continue; }
      out.push("$"); i++; continue;
    }
    const start = i;
    while (i < input.length) {
      if (input[i] === "$" || (input[i] === "\\" && (input[i + 1] === "(" || input[i + 1] === "["))) break;
      i++;
    }
    if (i > start) out.push(autoWrapPlainText(input.slice(start, i)));
  }
  return out.join("");
}
const DELIMITER_RE = /(\$[^$]+\$|\\\([^)]*\\\)|\\\[[^\]]*\\\])/g;

// Plain-text that survives MathText rendering (i.e. shown literally).
function renderedPlainText(s: string): string {
  return preprocess(s)
    .split(DELIMITER_RE)
    .filter((p) => !(p.startsWith("$") || p.startsWith("\\(") || p.startsWith("\\[")))
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
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".ts")) out.push(p);
  }
  return out;
}

const files = walk("lib/lessons");
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
}

const byType = (t: string) => findings.filter((f) => f.includes(t)).length;
console.log(findings.join("\n"));
console.log(
  `\nTOTAL: ${findings.length} | UNFORMATTED-MATH: ${byType("UNFORMATTED-MATH")} | BROKEN-LATEX: ${byType("BROKEN-LATEX")} | SELF-REVEAL: ${byType("SELF-REVEAL")}`
);
