"use client";

import { InlineMath } from "react-katex";

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

function autoWrapPlainText(text: string): string {
  return text.replace(AUTO_MATH_RE, (match) =>
    `$${match.replace(/\s*=\s*/, " = ")}$`
  );
}

// Walk the input string and produce a preprocessed version where:
//   - Existing $...$ LaTeX blocks (non-currency) are preserved unchanged.
//   - \(...\) and \[...\] blocks are preserved unchanged.
//   - Plain-text regions have auto-detected subscript/superscript patterns
//     wrapped in $...$  so the final render pass can pick them up.
//
// Currency detection: a $ immediately followed by a digit is treated as a
// currency sign, not a LaTeX delimiter (handles "$200 is invested at 5%").
function preprocess(input: string): string {
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
        const isMathCoefficient = /[A-Za-z^_(){}+\-*/<>=\\|]/.test(input[k] ?? "");
        if (!isMathCoefficient) {
          out.push("$");
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

      // No closing $ — treat as plain text
      out.push("$");
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

export function MathText({ text }: { text: string }) {
  const processed = preprocess(text);
  const parts = processed.split(DELIMITER_RE);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          return <InlineMath key={i} math={part.slice(1, -1)} />;
        }
        if (part.startsWith("\\(") && part.endsWith("\\)")) {
          return <InlineMath key={i} math={part.slice(2, -2)} />;
        }
        if (part.startsWith("\\[") && part.endsWith("\\]")) {
          return <InlineMath key={i} math={part.slice(2, -2)} />;
        }
        return part.length > 0 ? <span key={i}>{part}</span> : null;
      })}
    </>
  );
}
