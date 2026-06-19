/**
 * Scan multi-part questions for SIBLING-ANSWER leaks: a part's `latex` block
 * (or the question's top-level `latex`) that contains the numeric/fraction
 * answer of a DIFFERENT part. The render-time guard (shouldHideLatex) only
 * compares a block against its own answer, so cross-part value leaks slip
 * through. This is a deterministic, text-based scan (no LLM, no import).
 *
 * Output: one line per suspected leak — file:line, question id, the offending
 * part, the leaked value, and which sibling part it belongs to. Review before
 * editing; a few may be coincidental (a given datum equal to an answer).
 */
import fs from "fs";
import path from "path";

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

function lineOf(content: string, index: number): number {
  return content.slice(0, index).split("\n").length;
}

function decode(literal: string): string | null {
  try {
    return JSON.parse(literal) as string;
  } catch {
    return null;
  }
}

// Expand \frac{a}{b} / \dfrac.. / shorthand \frac12 to a/b so a fraction answer
// like "3/5" can be matched against a latex \frac{3}{5}.
function expandFractions(s: string): string {
  let prev = "";
  let cur = s;
  while (cur !== prev) {
    prev = cur;
    cur = cur.replace(/\\(?:d?frac)\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "$1/$2");
    cur = cur.replace(/\\(?:d?frac)\s*([0-9])\s*([0-9])/g, "$1/$2");
  }
  return cur;
}

// Numeric tokens a leak would expose: integers, decimals, and simple fractions.
// We deliberately ignore answers that are words ("increasing"), single digits
// (too noisy), and 0/1 (ubiquitous), to keep false positives down.
function leakTokens(answer: string): string[] {
  const a = answer.trim();
  const tokens = new Set<string>();
  const frac = a.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (frac) tokens.add(`${frac[1]}/${frac[2]}`);
  const dec = a.match(/^-?\d+(?:\.\d+)?$/);
  if (dec) {
    const n = Number(a);
    if (Number.isFinite(n) && Math.abs(n) > 1) tokens.add(a);
  }
  return [...tokens];
}

// A latex block "contains" a value as a STANDALONE number if the token appears
// not as a substring of a larger number, and not as an exponent/subscript
// (e.g. the "2" in x^2). After fraction expansion.
function latexContains(latex: string, token: string): boolean {
  const hay = expandFractions(latex).replace(/\s+/g, "");
  const needle = token.replace(/\s+/g, "");
  let from = 0;
  for (;;) {
    const idx = hay.indexOf(needle, from);
    if (idx === -1) return false;
    from = idx + 1;
    const before = hay[idx - 1];
    const after = hay[idx + needle.length];
    const digitAdjacent = (c: string | undefined) => c !== undefined && /[\d.]/.test(c);
    if (digitAdjacent(before) || digitAdjacent(after)) continue;
    // Exponent/subscript: the value is structural (x^2, a_2), not an answer.
    if (before === "^" || before === "_") continue;
    return true;
  }
}

type Part = { key: string; answer: string; accepted: string[]; latex: string | null; line: number };

// Extract the parts:[...] block for a question chunk and parse each part's
// key / answer / acceptedAnswers / latex. Brace-balanced from `parts: [`.
function parseParts(chunk: string, base: number): Part[] {
  const m = chunk.match(/\bparts:\s*\[/);
  if (!m) return [];
  let i = (m.index ?? 0) + m[0].length;
  let depth = 1;
  const start = i;
  while (i < chunk.length && depth > 0) {
    const c = chunk[i];
    if (c === "[") depth++;
    else if (c === "]") depth--;
    i++;
  }
  const body = chunk.slice(start, i - 1);
  const parts: Part[] = [];
  // Split into part-objects at top level by tracking braces.
  const objRe = /\{/g;
  let om: RegExpExecArray | null;
  while ((om = objRe.exec(body))) {
    let j = om.index;
    let d = 0;
    let k = j;
    for (; k < body.length; k++) {
      if (body[k] === "{") d++;
      else if (body[k] === "}") {
        d--;
        if (d === 0) break;
      }
    }
    const obj = body.slice(j, k + 1);
    objRe.lastIndex = k + 1;
    const key = obj.match(/\bkey:\s*"([^"]*)"/)?.[1];
    const answer = obj.match(/\banswer:\s*("(?:[^"\\]|\\.)*")/);
    if (!key || !answer) continue;
    const latex = obj.match(/\blatex:\s*("(?:[^"\\]|\\.)*")/);
    const acc = [...obj.matchAll(/"(?:[^"\\]|\\.)*"/g)];
    parts.push({
      key,
      answer: decode(answer[1]) ?? "",
      accepted: [],
      latex: latex ? decode(latex[1]) : null,
      line: base + lineOf(chunk.slice(0, j + om.index * 0), 0),
    });
    void acc;
  }
  return parts;
}

const roots = ["lib/lessons", "lib/challenges", "lib/exams"].map((d) =>
  path.join(process.cwd(), d)
);
const files = roots.flatMap(walk);
const findings: string[] = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  if (!/\bparts:\s*\[/.test(content)) continue;
  // Chunk by id: so each multi-part question is one chunk.
  const idRe = /\bid:\s*"([^"]*)"/g;
  const idxs: { index: number; id: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = idRe.exec(content))) idxs.push({ index: m.index, id: m[1] });
  for (let k = 0; k < idxs.length; k++) {
    const chunk = content.slice(idxs[k].index, idxs[k + 1]?.index ?? content.length);
    if (!/\bparts:\s*\[/.test(chunk)) continue;
    const parts = parseParts(chunk, lineOf(content, idxs[k].index));
    if (parts.length < 2) continue;
    // Given data: the question's top-level latex + prompt (everything before the
    // parts block). A value that appears here is provided, not a leaked answer.
    const head = chunk.slice(0, chunk.search(/\bparts:\s*\[/));
    const givenLatex =
      (head.match(/\blatex:\s*("(?:[^"\\]|\\.)*")/)?.[1]
        ? decode(head.match(/\blatex:\s*("(?:[^"\\]|\\.)*")/)![1]) ?? ""
        : "") +
      " " +
      (head.match(/\bprompt:\s*("(?:[^"\\]|\\.)*")/)?.[1]
        ? decode(head.match(/\bprompt:\s*("(?:[^"\\]|\\.)*")/)![1]) ?? ""
        : "");
    for (const part of parts) {
      if (!part.latex) continue;
      for (const sib of parts) {
        if (sib.key === part.key) continue;
        for (const tok of leakTokens(sib.answer)) {
          // Skip if it's also this part's own answer (guard handles that).
          if (leakTokens(part.answer).includes(tok)) continue;
          // Skip if the value is given data in the question stem.
          if (latexContains(givenLatex, tok)) continue;
          if (latexContains(part.latex, tok)) {
            findings.push(
              `${path.relative(process.cwd(), file)}:${lineOf(content, idxs[k].index)} — ${idxs[k].id} — part (${part.key}) latex leaks value "${tok}" (= part ${sib.key}'s answer)`
            );
          }
        }
      }
    }
  }
}

if (findings.length === 0) {
  console.log("No sibling-answer latex leaks found.");
} else {
  console.log(`${findings.length} suspected sibling-answer latex leak(s):\n`);
  for (const f of findings) console.log("  " + f);
}
