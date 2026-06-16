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

function normaliseText(value: string) {
  return value
    .replace(/\u00b2/g, "^2")
    .replace(/\u00b3/g, "^3")
    .normalize("NFKC")
    .replace(/\u2044/g, "/")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/\^\((\d+)\)/g, "^$1")
    .toLowerCase()
    .trim()
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
