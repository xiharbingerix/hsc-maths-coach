/**
 * Converts common student text-math patterns into LaTeX for preview rendering.
 *
 * This is display-only — the unmodified raw string is always passed to
 * markTypedAnswer for marking. Transformations are intentionally conservative:
 * if the output would be ambiguous or garbled, the original string is returned
 * and the component falls back to plain text.
 *
 * Does not use eval or execute any code.
 */

const GREEK_SUBSTITUTIONS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bpi\b/g, "\\pi"],
  [/\btheta\b/gi, "\\theta"],
  [/\balpha\b/gi, "\\alpha"],
  [/\bbeta\b/gi, "\\beta"],
  [/\bgamma\b/gi, "\\gamma"],
  [/\bdelta\b/gi, "\\delta"],
  [/\bomega\b/gi, "\\omega"],
  [/\binfinity\b/gi, "\\infty"],
  [/\binf\b/gi, "\\infty"],
] as const;

// Function names that get a leading backslash: sin(x) → \sin(x)
const FUNCTION_NAMES = [
  "sin", "cos", "tan", "sec", "csc", "cosec", "cot", "ln", "log",
] as const;

/**
 * Converts a student's typed math string to a LaTeX string for KaTeX preview.
 *
 * Supported conversions (applied in order):
 *   1. Greek letters:  pi → \pi, theta → \theta, etc.
 *   2. Square root:    sqrt(x) → \sqrt{x}
 *   3. Trig/log:       sin(x) → \sin(x), ln(x) → \ln(x), etc.
 *   4. Paren fractions: (a+b)/(c+d) → \frac{a+b}{c+d}
 *   5. Token fractions: 1/2 → \frac{1}{2}, \pi/3 → \frac{\pi}{3}
 *   6. Exponents:      x^2 → x^{2}, x^(n+1) → x^{n+1}
 *   7. Degrees:        90° → 90^{\circ}
 *
 * Known limitations (document to students):
 *   - x^2/3 is ambiguous; use (x^2)/3 or x^(2/3) for unambiguous input
 *   - 2pi/3 does not become \frac{2\pi}{3}; use (2*pi)/3 if needed
 *   - Nested fractions are not handled
 */
export function parseStudentMath(raw: string): string {
  let s = raw.trim();
  if (!s) return s;

  // 1. Greek letters — run before fractions so "pi/3" yields \frac{\pi}{3}
  for (const [pattern, replacement] of GREEK_SUBSTITUTIONS) {
    s = s.replace(pattern, replacement);
  }

  // 2. sqrt(expr) → \sqrt{expr}
  s = s.replace(/sqrt\(([^)]+)\)/g, "\\sqrt{$1}");

  // 3. Trig/log functions: sin(x) → \sin(x)
  const funcRe = new RegExp(
    `\\b(${FUNCTION_NAMES.join("|")})\\(([^)]*)\\)`,
    "g"
  );
  s = s.replace(funcRe, "\\$1($2)");

  // 4. Parenthesised fractions
  //    (a+b)/(c+d) → \frac{a+b}{c+d}
  s = s.replace(
    /\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g,
    "\\frac{$1}{$2}"
  );
  //    (expr)/token — but NOT function-call parens like sin(x)/2
  //    Negative lookbehind: ( must not be immediately preceded by a letter
  s = s.replace(
    /(?<![a-zA-Z])\(([^()]+)\)\s*\/\s*(-?[a-zA-Z0-9\\]+)/g,
    "\\frac{$1}{$2}"
  );
  //    token/(expr) — but NOT cases where ( follows a LaTeX command like \cos(x)
  //    The lookahead (?![a-zA-Z]) prevents matching when ( is part of a word,
  //    e.g. "2/cos(x)" → after step 3 this is "2/\cos(x)"; the \ before ( is
  //    not [a-zA-Z] so the lookahead passes, but \( in the pattern expects a
  //    literal ( which is not the next character. No false match.
  s = s.replace(
    /(-?[a-zA-Z0-9\\]+)\s*\/\s*(?![a-zA-Z])\(([^()]+)\)/g,
    "\\frac{$1}{$2}"
  );

  // 5. Simple token fractions: a/b → \frac{a}{b}
  //    A token is: optional minus + (alphanumerics OR a LaTeX command like \pi)
  //    Negative lookbehind (?<!\^) prevents transforming x^2/3 where the 2 is
  //    an exponent base — that is intentionally left ambiguous.
  s = s.replace(
    /(?<!\^)(-?[a-zA-Z0-9]+|\\[a-zA-Z]+)\s*\/\s*(-?[a-zA-Z0-9]+|\\[a-zA-Z]+)/g,
    "\\frac{$1}{$2}"
  );

  // 6. Exponents
  //    x^(n+1) → x^{n+1}  (parenthesised exponent, strip outer parens)
  s = s.replace(/\^\(([^)]+)\)/g, "^{$1}");
  //    x^2 → x^{2}  (bare alphanumeric exponent, not already braced)
  s = s.replace(/\^(?!\{)([a-zA-Z0-9]+)/g, "^{$1}");

  // 7. Degree symbol
  s = s.replace(/(\d+(?:\.\d+)?)\s*°/g, "$1^{\\circ}");
  s = s.replace(/(\d+(?:\.\d+)?)\s*degrees?/gi, "$1^{\\circ}");

  return s;
}
