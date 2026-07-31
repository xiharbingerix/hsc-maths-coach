// Pure (no-React) text-to-maths tokeniser shared by the MathText renderer. Kept
// framework-free so it can be unit-tested directly.

// Matches simple inline math patterns in plain text segments:
//   Subscript:   T_2  a_n  x_1  T_10  (subscript is 1–3 alphanumeric chars)
//   Superscript: x^2  r^3  e^x         (superscript is 1–3 alphanumeric chars)
//   Optional trailing =number:  T_2=18  T_5=486
//
// The {1,3} limit on the subscript/superscript is the main safety constraint —
// it prevents matching snake_case identifiers (path_with, user_name) and other
// prose underscores while covering every common maths notation pattern.
//
// Negative lookbehind prevents matching inside URL-like paths (/foo_bar).
const AUTO_MATH_RE =
  /(?<![/:.@])([A-Za-z][A-Za-z0-9]*)([_^][A-Za-z0-9]{1,3})+(?:=\s*-?\d+(?:\.\d+)?)?/g;

const BARE_MATH_MARKER_RE =
  /\^|[A-Za-z0-9]_(?:\{|[A-Za-z0-9])|\\[A-Za-z]+|[∫∑√]/;
const MATH_OPERATOR_RE = /[=<>≤≥≈≠±+\-−*/×·&∫∑√π∞]/;
const MATH_NAME_RE = /^(?:sin|cos|tan|sec|csc|cot|ln|log|sqrt|var|fv|pv|[a-z]|d[a-z])(?:\([^)]*\))?$/i;

type TokenSpan = { start: number; end: number; coreStart: number; coreEnd: number; core: string };

function tokenSpans(text: string): TokenSpan[] {
  const spans: TokenSpan[] = [];
  for (const match of text.matchAll(/\S+/g)) {
    const token = match[0];
    const start = match.index;
    const leading = token.match(/^["'“‘]+/)?.[0].length ?? 0;
    const trailing = token.match(/[.,;:!?"'”’]+$/)?.[0].length ?? 0;
    const coreStart = start + leading;
    const coreEnd = start + token.length - trailing;
    spans.push({
      start,
      end: start + token.length,
      coreStart,
      coreEnd,
      core: text.slice(coreStart, coreEnd),
    });
  }
  return spans;
}

function isMathToken(token: string) {
  if (!token) return false;
  if (
    BARE_MATH_MARKER_RE.test(token) ||
    MATH_OPERATOR_RE.test(token) ||
    /\d/.test(token) ||
    token.includes("\\")
  ) {
    return true;
  }
  return MATH_NAME_RE.test(token) || /^[A-Z]{1,3}(?:\([^)]*\))?$/.test(token);
}

// Older authored content contains legitimate LaTeX or compound powers without
// delimiters, for example `\int 2x^3\,dx` or `(x+1)^2`. Starting from the
// unmistakable marker, expand only across adjacent maths-like tokens and wrap
// that bounded span. Long prose words stop the expansion, which keeps ordinary
// sentences out of KaTeX while repairing complete multi-token expressions.
function wrapBareMathSpans(text: string) {
  const tokens = tokenSpans(text);
  const ranges: Array<{ start: number; end: number }> = [];

  for (let index = 0; index < tokens.length; index += 1) {
    if (!BARE_MATH_MARKER_RE.test(tokens[index].core)) continue;
    let first = index;
    let last = index;
    while (first > 0 && isMathToken(tokens[first - 1].core)) first -= 1;
    while (last + 1 < tokens.length && isMathToken(tokens[last + 1].core)) last += 1;
    // A LaTeX text/group command may legitimately contain spaces, as in
    // `x\le-2\text{ or }x\ge3`. Keep extending until braces are balanced even
    // when the words inside the group are not independently maths-like.
    let braceBalance = 0;
    for (const character of text.slice(tokens[first].coreStart, tokens[last].coreEnd)) {
      if (character === "{") braceBalance += 1;
      if (character === "}") braceBalance -= 1;
    }
    while (braceBalance > 0 && last + 1 < tokens.length) {
      last += 1;
      for (const character of tokens[last].core) {
        if (character === "{") braceBalance += 1;
        if (character === "}") braceBalance -= 1;
      }
    }
    const range = { start: tokens[first].coreStart, end: tokens[last].coreEnd };
    const previous = ranges.at(-1);
    if (previous && range.start <= previous.end + 1) {
      previous.end = Math.max(previous.end, range.end);
    } else {
      ranges.push(range);
    }
    index = last;
  }

  if (ranges.length === 0) return text;
  let output = "";
  let cursor = 0;
  for (const range of ranges) {
    output += text.slice(cursor, range.start);
    output += `$${text.slice(range.start, range.end)}$`;
    cursor = range.end;
  }
  return output + text.slice(cursor);
}

// Private-use placeholder for a literal currency "$". Preprocessing swaps real
// currency signs for this sentinel so the later $...$ delimiter split cannot pair
// two currency signs into a bogus maths span (which used to render "$960. A
// deposit of $160" as "960.Adepositof160"). It is restored to "$" at render time.
export const CURRENCY_SENTINEL = "\uE000";

function autoWrapPlainText(text: string): string {
  const withCompoundMath = wrapBareMathSpans(text);
  return withCompoundMath
    .split(/(\$[^$]+\$)/g)
    .map((part) =>
      part.startsWith("$") && part.endsWith("$")
        ? part
        : part.replace(AUTO_MATH_RE, (match) => `$${match.replace(/\s*=\s*/, " = ")}$`)
    )
    .join("");
}

// Walk the input string and produce a preprocessed version where:
//   - Existing $...$ LaTeX blocks (non-currency) are preserved unchanged.
//   - \(...\) and \[...\] blocks are preserved unchanged.
//   - Plain-text regions have auto-detected subscript/superscript patterns
//     wrapped in $...$ so the final render pass can pick them up.
//   - Currency "$" (a $ before a digit, or any unpaired $) becomes the sentinel.
//
// Currency detection: a $ immediately followed by a digit is treated as a
// currency sign, not a LaTeX delimiter (handles "$200 is invested at 5%").
export function preprocessMathText(input: string): string {
  const out: string[] = [];
  let i = 0;

  while (i < input.length) {
    // \( ... \)
    if (input[i] === "\\" && input[i + 1] === "(") {
      const end = input.indexOf("\\)", i + 2);
      if (end !== -1) {
        out.push(input.slice(i, end + 2));
        i = end + 2;
        continue;
      }
    }

    // \[ ... \]
    if (input[i] === "\\" && input[i + 1] === "[") {
      const end = input.indexOf("\\]", i + 2);
      if (end !== -1) {
        out.push(input.slice(i, end + 2));
        i = end + 2;
        continue;
      }
    }

    // $ sign
    if (input[i] === "$") {
      // Currency vs maths. A $ before a digit is usually currency
      // ("$200 is invested at 5%"). But when the number is immediately followed
      // by a maths token — a variable, bracket, or operator like ^ — the $ is
      // opening a maths span, e.g. "$21x^2$". Treat those as maths so the
      // currency rule doesn't split the span (which would render "x^2" raw).
      if (i + 1 < input.length && /\d/.test(input[i + 1])) {
        let k = i + 1;
        while (k < input.length && /[\d.,]/.test(input[k])) k++;
        // "$25$" / "$8.0622$" — a bare number wrapped in $...$ is an
        // over-wrapped currency amount (AI-authored prose does this despite
        // instructions). Consume BOTH delimiters as one currency token;
        // leaving the closer behind lets it pair with the next real maths
        // opener and swallow half the sentence into a bogus maths span.
        if (input[k] === "$") {
          out.push(CURRENCY_SENTINEL + input.slice(i + 1, k));
          i = k + 1;
          continue;
        }
        const isMathCoefficient = /[A-Za-z^_(){}+\-*/<>=\\|]/.test(input[k] ?? "");
        if (!isMathCoefficient) {
          out.push(CURRENCY_SENTINEL);
          i++;
          continue;
        }
        // else: fall through and treat this $ as the start of a maths span
      }

      // Otherwise look for a closing $
      let j = i + 1;
      let closing = -1;
      while (j < input.length) {
        if (input[j] === "\\" && j + 1 < input.length) {
          j += 2;
          continue;
        }
        if (input[j] === "$") {
          closing = j;
          break;
        }
        j++;
      }

      if (closing !== -1) {
        // Valid $...$ — preserve as-is (do not auto-wrap inside)
        out.push(input.slice(i, closing + 1));
        i = closing + 1;
        continue;
      }

      // No closing $ — a lone dollar, treat as a literal currency sign so the
      // delimiter split below cannot pair it with another lone dollar elsewhere.
      out.push(CURRENCY_SENTINEL);
      i++;
      continue;
    }

    // Plain text — collect until the next special character, then auto-wrap
    const start = i;
    while (i < input.length) {
      if (
        input[i] === "$" ||
        (input[i] === "\\" && (input[i + 1] === "(" || input[i + 1] === "["))
      ) {
        break;
      }
      i++;
    }

    if (i > start) {
      out.push(autoWrapPlainText(input.slice(start, i)));
    }
  }

  return out.join("");
}

// After preprocessing, split the result into math and text segments for rendering.
const DELIMITER_RE = /(\$[^$]+\$|\\\([^)]*\\\)|\\\[[^\]]*\\\])/g;

export type MathSegment = { type: "math" | "text"; value: string };

const VULGAR_FRACTIONS: Record<string, string> = {
  "¼": "\\frac{1}{4}",
  "½": "\\frac{1}{2}",
  "¾": "\\frac{3}{4}",
  "⅓": "\\frac{1}{3}",
  "⅔": "\\frac{2}{3}",
};

function normaliseKatexInput(value: string) {
  return value
    .replace(/[¼½¾⅓⅔]/g, (fraction) => VULGAR_FRACTIONS[fraction])
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/′/g, "'")
    .replace(/″/g, "''")
    .replace(/√\s*\(([^()]*)\)/g, "\\sqrt{$1}")
    .replace(/√\s*([A-Za-z0-9.]+)/g, "\\sqrt{$1}")
    .replace(/°/g, "^{\\circ}");
}

// Tokenise prose-with-maths into ordered segments. Math segments carry the raw
// LaTeX (without delimiters); text segments have the currency sentinel restored
// to a literal "$".
export function tokenizeMathText(text: string): MathSegment[] {
  const processed = preprocessMathText(text);
  const parts = processed.split(DELIMITER_RE);
  const segments: MathSegment[] = [];

  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      segments.push({ type: "math", value: normaliseKatexInput(part.slice(1, -1)) });
    } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
      segments.push({ type: "math", value: normaliseKatexInput(part.slice(2, -2)) });
    } else if (part.startsWith("\\[") && part.endsWith("\\]")) {
      segments.push({ type: "math", value: normaliseKatexInput(part.slice(2, -2)) });
    } else {
      segments.push({ type: "text", value: part.split(CURRENCY_SENTINEL).join("$") });
    }
  }

  return segments;
}
