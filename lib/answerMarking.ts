type Rational = {
  numerator: bigint;
  denominator: bigint;
};

type ScalarAnswer = {
  value: Rational;
  variable?: string;
};

export type MarkTypedAnswerResult = {
  correct: boolean;
  normalisedUserAnswer: string;
  matchedBy: "exact" | "accepted" | "normalised" | "cas";
};

function stripDerivativePrefix(value: string): string {
  // Strip function-equals prefixes students add when the expected answer is a bare expression.
  // e.g. "y' = 2x", "dy/dx = 2x", "f'(x) = 2x", "y = 2x" \u2192 "2x"
  // Applied after toLowerCase so the prime (\u2032 \u2192 ') is already ASCII.
  return value
    // Leibniz: dy/dx = ..., df/dt = ...
    .replace(/^d[a-z]\/d[a-z]\s*=\s*/, "")
    // Prime notation: y' = ..., y'' = ..., f'(x) = ..., g''(t) = ...
    .replace(/^[a-z]'+(?:\([a-z]+\))?\s*=\s*/, "")
    // Plain function: y = ..., f = ...  (leave this last \u2014 least specific)
    .replace(/^[a-z](?:\([a-z]+\))?\s*=\s*/, "");
}

function normaliseText(value: string) {
  return value
    .replace(/\u00b2/g, "^2")
    .replace(/\u00b3/g, "^3")
    .normalize("NFKC")
    .replace(/\u2044/g, "/")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    // Normalise Unicode prime (\u2032) to ASCII apostrophe so the derivative prefix
    // strip below recognises y\u2032 = ... the same as y' = ...
    .replace(/\u2032/g, "'")
    // \u2500\u2500 LaTeX structural forms emitted by MathLive \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    // \left( \right) \u2192 plain parens
    .replace(/\\left\s*\(/g, "(")
    .replace(/\\right\s*\)/g, ")")
    .replace(/\\left\s*\[/g, "[")
    .replace(/\\right\s*\]/g, "]")
    // Brace-less \frac shorthand \u2192 braced form so the rules below can convert it.
    // LaTeX lets each \frac argument be a single bare token: \frac12 means \frac{1}{2},
    // \frac1{2x} means \frac{1}{2x}. MathLive always emits braces, so this only affects
    // hand-authored stored answers \u2014 without it, a stored "\frac12" never matches the
    // student's "\frac{1}{2}". Wrap the first bare argument, then the second.
    .replace(/\\(d?frac)([0-9a-zA-Z])/g, "\\$1{$2}")
    .replace(/(\\d?frac\{(?:[^{}]|\{[^{}]*\})*\})([0-9a-zA-Z])/g, "$1{$2}")
    // Simple fractions: \frac{a}{b} \u2192 a/b when numerator+denominator are tokens
    // (no operators); complex fractions fall through to (a)/(b).
    .replace(
      /\\(?:d?frac)\{([^{}+\-*/^ ]+)\}\{([^{}+\-*/^ ]+)\}/g,
      "$1/$2"
    )
    // Complex fractions: \frac{a+b}{c} \u2192 (a+b)/(c)
    .replace(
      /\\(?:d?frac)\{([^{}]+)\}\{([^{}]+)\}/g,
      "($1)/($2)"
    )
    // \sqrt{x} \u2192 sqrt(x)
    .replace(/\\sqrt\{([^{}]+)\}/g, "sqrt($1)")
    // Strip curly braces around single tokens (exponents, groups): x^{2} \u2192 x^2
    .replace(/\{([^{}]{1,6})\}/g, "$1")
    // Additional Greek letters MathLive emits
    .replace(/\\theta/g, "theta")
    .replace(/\\alpha/g, "alpha")
    .replace(/\\beta/g, "beta")
    .replace(/\\gamma/g, "gamma")
    .replace(/\\delta/g, "delta")
    .replace(/\\omega/g, "omega")
    .replace(/\\infty/g, "infinity")
    .replace(/\\pm/g, "+-")
    .replace(/\^\((\d+)\)/g, "^$1")
    .toLowerCase()
    .trim()
    // Strip derivative/function prefixes before comparing expressions.
    .replace(/^.+/, (s) => stripDerivativePrefix(s))
    // --- Bridge Unicode/LaTeX maths glyphs to canonical ASCII (catalog audit P2) ---
    // Pi constant: π (U+03C0; also covers Π since toLowerCase ran above) and the
    // LaTeX macro \pi both canonicalise to "pi". Only the glyph/macro is mapped —
    // never the bare substring "pi" — so words like "pizza" are untouched.
    .replace(/π/g, "pi")
    .replace(/\\pi/g, "pi")
    // Strip LaTeX delimiter/spacing macros first so they cannot collide with the
    // inequality mappings below (e.g. "\left" must not feed the "\le" rule).
    .replace(/\\left/g, "")
    .replace(/\\right/g, "")
    .replace(/\\[,!]/g, "")
    // Inequalities: Unicode and LaTeX forms -> ASCII. The optional "q" absorbs the
    // longer macro (\leq/\geq) in a single pass; "\left"/"\right" are gone already.
    .replace(/≠/g, "!=")
    .replace(/\\neq?/g, "!=")
    .replace(/≤/g, "<=")
    .replace(/\\le(?:q)?/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/\\ge(?:q)?/g, ">=")
    // Trig/log macros appear only in stored answers, never in student typing.
    .replace(/\\sin/g, "sin")
    .replace(/\\cos/g, "cos")
    .replace(/\\tan/g, "tan")
    .replace(/\\ln/g, "ln")
    .replace(/\\log/g, "log")
    // Multiplication dots -> "*", consistently applied to both sides.
    .replace(/\\cdot/g, "*")
    .replace(/\\times/g, "*")
    // TODO: \frac{a}{b} -> a/b structural rewriting is intentionally out of scope —
    // brittle with nested braces and prone to false positives. \frac{...}
    // antiderivatives still rely on per-question acceptedAnswers; a structural/CAS
    // comparator is the real fix.
    .replace(/\blocal\s+max\b/g, "local maximum")
    .replace(/\blocal\s+min\b/g, "local minimum")
    .replace(/\bmax\b/g, "maximum")
    .replace(/\bmin\b/g, "minimum")
    .replace(/\s*([+\-=/,:])\s*/g, "$1")
    .replace(/\s+/g, "");
}

function greatestCommonDivisor(a: bigint, b: bigint): bigint {
  let x = a < BigInt(0) ? -a : a;
  let y = b < BigInt(0) ? -b : b;

  while (y !== BigInt(0)) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }

  return x;
}

function rational(numerator: bigint, denominator = BigInt(1)): Rational | null {
  if (denominator === BigInt(0)) return null;

  const sign = denominator < BigInt(0) ? BigInt(-1) : BigInt(1);
  const divisor = greatestCommonDivisor(numerator, denominator);

  return {
    numerator: (numerator / divisor) * sign,
    denominator: (denominator / divisor) * sign,
  };
}

function parseDecimal(value: string): Rational | null {
  const match = value.match(/^([+-]?)(\d+)(?:\.(\d+))?$/);
  if (!match) return null;

  const sign = match[1] === "-" ? BigInt(-1) : BigInt(1);
  const decimals = match[3] ?? "";
  const denominator = BigInt(10) ** BigInt(decimals.length);
  const numerator = BigInt(`${match[2]}${decimals}`) * sign;

  return rational(numerator, denominator);
}

function parseNumericValue(value: string): Rational | null {
  const trimmed = value.trim();
  const fractionMatch = trimmed.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);

  if (fractionMatch) {
    return rational(BigInt(fractionMatch[1]), BigInt(fractionMatch[2]));
  }

  return parseDecimal(trimmed);
}

function sameRational(left: Rational, right: Rational) {
  return (
    left.numerator === right.numerator &&
    left.denominator === right.denominator
  );
}

function stripThousandsSeparators(value: string) {
  return value.replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, "");
}

function parseScalar(value: string): ScalarAnswer | null {
  let working = value
    .normalize("NFKC")
    .replace(/\u2044/g, "/")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/\u00b2/g, "^2")
    .replace(/\u00b3/g, "^3")
    .toLowerCase()
    .trim();

  let variable: string | undefined;
  const variableMatch = working.match(/^([a-z])\s*=\s*(.+)$/);
  if (variableMatch) {
    variable = variableMatch[1];
    working = variableMatch[2];
  }

  working = working
    .replace(/^\$\s*/, "")
    .replace(/\s*(?:dollars?|aud)\s*$/i, "")
    .replace(/\s*(?:degrees?|deg|°)\s*$/i, "")
    .replace(/\s*(?:hours?|hrs?|minutes?|mins?|seconds?|secs?)\s*$/i, "")
    .replace(
      /\s*(?:(?:square|cubic)\s+)?(?:millimetres?|millimeters?|mm|centimetres?|centimeters?|cm|kilometres?|kilometers?|km|metres?|meters?|m|kilograms?|kg|grams?|g|millilitres?|milliliters?|ml|litres?|liters?|l)(?:\s*(?:\^?\s*\(?\s*[23]\s*\)?))?\s*$/i,
      ""
    )
    .trim();

  let isPercentage = false;
  if (working.endsWith("%")) {
    isPercentage = true;
    working = working.slice(0, -1).trim();
  }

  working = stripThousandsSeparators(working);
  const valueAsRational = parseNumericValue(working);
  if (!valueAsRational) return null;

  return {
    value: isPercentage
      ? rational(valueAsRational.numerator, valueAsRational.denominator * BigInt(100))!
      : valueAsRational,
    variable,
  };
}

function variablesAreCompatible(
  userVariable: string | undefined,
  acceptedVariable: string | undefined
) {
  if (userVariable === acceptedVariable) return true;
  if (!acceptedVariable) return true;
  return acceptedVariable === "m" && !userVariable;
}

function parseCoordinate(value: string): [Rational, Rational] | null {
  let working = value.normalize("NFKC").trim();
  const labelledMatch = working.match(
    /^x\s*=\s*([^,]+)\s*,\s*y\s*=\s*(.+)$/i
  );

  if (labelledMatch) {
    const x = parseNumericValue(stripThousandsSeparators(labelledMatch[1]));
    const y = parseNumericValue(stripThousandsSeparators(labelledMatch[2]));
    return x && y ? [x, y] : null;
  }

  working = working.replace(/^\(\s*/, "").replace(/\s*\)$/, "");
  const pairMatch = working.match(/^([^,]+)\s*,\s*([^,]+)$/);
  if (!pairMatch) return null;

  const x = parseNumericValue(stripThousandsSeparators(pairMatch[1]));
  const y = parseNumericValue(stripThousandsSeparators(pairMatch[2]));
  return x && y ? [x, y] : null;
}

function sameCoordinate(
  left: [Rational, Rational],
  right: [Rational, Rational]
) {
  return sameRational(left[0], right[0]) && sameRational(left[1], right[1]);
}

function parseRatio(value: string): [Rational, Rational] | null {
  const match = value
    .normalize("NFKC")
    .trim()
    .match(/^(.+?)\s*(?::|\bto\b)\s*(.+)$/i);

  if (!match) return null;

  const left = parseNumericValue(stripThousandsSeparators(match[1]));
  const right = parseNumericValue(stripThousandsSeparators(match[2]));
  return left && right ? [left, right] : null;
}

function hasMeridiem(value: string): boolean {
  return /\b(?:a\.?m\.?|p\.?m\.?)\b/i.test(value);
}

function parseClockTime(value: string): number | null {
  const v = value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[−–—]/g, "-");

  // 24-hour HH:MM (colon required to avoid matching plain integers)
  const h24 = v.match(/^(\d{1,2}):(\d{2})$/);
  if (h24) {
    const h = parseInt(h24[1], 10);
    const m = parseInt(h24[2], 10);
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) return h * 60 + m;
  }

  // 12-hour H:MM am/pm (colon required)
  const h12 = v.match(/^(\d{1,2}):(\d{2})\s*(?:a\.?m\.?|p\.?m\.?)$/);
  if (h12) {
    const h = parseInt(h12[1], 10);
    const m = parseInt(h12[2], 10);
    if (h < 1 || h > 12 || m < 0 || m > 59) return null;
    const isPM = v.includes("p");
    return isPM
      ? (h === 12 ? 12 : h + 12) * 60 + m
      : (h === 12 ? 0 : h) * 60 + m;
  }

  return null;
}

function parseSolutionSet(value: string): Rational[] | null {
  const working = value
    .normalize("NFKC")
    .replace(/⁄/g, "/")
    .replace(/[−–—]/g, "-")
    .toLowerCase()
    .trim();

  // Only treat the value as an (unordered) solution set when the syntax is
  // unambiguously a list of solutions, never a coordinate:
  //   - an explicit "or"/"and" connective ("x = 1 or x = -4", "-4 and 1"), or
  //   - a repeated same-variable equals list ("x=-4, x=1").
  // Bare comma pairs (e.g. "1,-4") are intentionally left to the ordered
  // coordinate comparator — see the "unordered set is not reordered" test.
  const hasConnective = /\b(?:or|and)\b/.test(working);
  const equalsVariables = (working.match(/([a-z])\s*=/g) ?? []).map((token) =>
    token.replace(/[\s=]/g, "")
  );
  const repeatedSameVariable =
    equalsVariables.length >= 2 && new Set(equalsVariables).size === 1;

  if (!hasConnective && !repeatedSameVariable) return null;

  const tokens = working.split(/\b(?:or|and)\b|,/);
  const values: Rational[] = [];
  let variable: string | null = null;

  for (const rawToken of tokens) {
    const token = rawToken.trim();
    if (!token) continue;

    let numericPart = token;
    const variableMatch = token.match(/^([a-z])\s*=\s*(.+)$/);
    if (variableMatch) {
      if (variable && variable !== variableMatch[1]) return null; // mixed variables -> not a single solution set
      variable = variableMatch[1];
      numericPart = variableMatch[2].trim();
    }

    const parsed = parseNumericValue(stripThousandsSeparators(numericPart));
    if (!parsed) return null; // any non-numeric member -> not a clean numeric solution set
    values.push(parsed);
  }

  return values.length >= 2 ? values : null;
}

function sameSolutionSet(left: Rational[], right: Rational[]): boolean {
  if (left.length !== right.length) return false;

  const matched = new Array(right.length).fill(false);
  for (const value of left) {
    const index = right.findIndex(
      (other, i) => !matched[i] && sameRational(value, other)
    );
    if (index === -1) return false;
    matched[index] = true;
  }

  return true;
}

function semanticMatch(userAnswer: string, acceptedAnswer: string) {
  // Clock time: 24-hour and am/pm forms are equivalent.
  // Only engage when at least one side carries an explicit meridiem marker to
  // avoid false-positive matches on numeric ratios that also contain a colon.
  if (hasMeridiem(userAnswer) || hasMeridiem(acceptedAnswer)) {
    const acceptedClock = parseClockTime(acceptedAnswer);
    if (acceptedClock !== null) {
      const userClock = parseClockTime(userAnswer);
      return userClock !== null ? userClock === acceptedClock : false;
    }
  }

  const acceptedCoordinate = parseCoordinate(acceptedAnswer);
  if (acceptedCoordinate) {
    const userCoordinate = parseCoordinate(userAnswer);
    return userCoordinate
      ? sameCoordinate(userCoordinate, acceptedCoordinate)
      : false;
  }

  const acceptedRatio = parseRatio(acceptedAnswer);
  if (acceptedRatio) {
    const userRatio = parseRatio(userAnswer);
    return userRatio ? sameCoordinate(userRatio, acceptedRatio) : false;
  }

  // Unordered solution sets: "x = 1 or x = -4", "x=-4, x=1", "-4 and 1" are all
  // the same set of roots regardless of order. Engages only on explicit
  // connectives / repeated-variable syntax, so it never reorders coordinates.
  const acceptedSolutionSet = parseSolutionSet(acceptedAnswer);
  if (acceptedSolutionSet) {
    const userSolutionSet = parseSolutionSet(userAnswer);
    return userSolutionSet
      ? sameSolutionSet(userSolutionSet, acceptedSolutionSet)
      : false;
  }

  const userScalar = parseScalar(userAnswer);
  const acceptedScalar = parseScalar(acceptedAnswer);

  return Boolean(
    userScalar &&
      acceptedScalar &&
      variablesAreCompatible(userScalar.variable, acceptedScalar.variable) &&
      sameRational(userScalar.value, acceptedScalar.value)
  );
}

export function markTypedAnswer({
  userAnswer,
  correctAnswer,
  acceptedAnswers = [],
}: {
  userAnswer: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
}): MarkTypedAnswerResult {
  const trimmedUserAnswer = userAnswer.trim();
  const normalisedUserAnswer = normaliseText(userAnswer);

  if (trimmedUserAnswer.localeCompare(correctAnswer.trim(), undefined, {
    sensitivity: "accent",
  }) === 0) {
    return { correct: true, normalisedUserAnswer, matchedBy: "exact" };
  }

  if (
    acceptedAnswers.some(
      (acceptedAnswer) =>
        trimmedUserAnswer.localeCompare(acceptedAnswer.trim(), undefined, {
          sensitivity: "accent",
        }) === 0
    )
  ) {
    return { correct: true, normalisedUserAnswer, matchedBy: "accepted" };
  }

  const answerOptions = [correctAnswer, ...acceptedAnswers];
  const normalisedMatch = answerOptions.some(
    (acceptedAnswer) =>
      normalisedUserAnswer === normaliseText(acceptedAnswer) ||
      semanticMatch(userAnswer, acceptedAnswer)
  );

  return {
    correct: normalisedMatch,
    normalisedUserAnswer,
    matchedBy: "normalised",
  };
}
