import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 8 — Wave 3. D6 (Level-6) challenge pools, 12 per section, for algebraic-techniques-stage5 (4
// sections), index-laws-extension (5) and indices-b (3). Registered course-scoped
// ("year-8-mathematics/<lesson>") in lib/challenges/index.ts; unlocked after mastery via the existing
// challenge flow (no new system). Auto-markable single-value answers. The seeder tags challenge
// questions as D6. Exponent-heavy: EVERY power/index in prose is wrapped in $...$ (the latex field is
// not audit-scanned). Negative answers carry a unicode-minus accepted variant.

const m = (a: string): string[] => (a.includes("-") ? [a.replace(/-/g, "−")] : []);

// ── Algebraic fractions ───────────────────────────────────────────────────────────────────────
export const algebraicFractionsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-af-1", prompt: "Simplify 6x/2 and evaluate at x = 5.", latex: "", answer: "15", acceptedAnswers: [], hint: "6x/2 = 3x.", explanation: "3(5) = 15." },
  { id: "chal-y8-af-2", prompt: "Simplify $x^2/x$ and evaluate at x = 7.", latex: "", answer: "7", acceptedAnswers: [], hint: "x²/x = x.", explanation: "x = 7." },
  { id: "chal-y8-af-3", prompt: "Write x/2 + x/4 as a single fraction kx; give k as a fraction.", latex: "", answer: "3/4", acceptedAnswers: ["0.75"], hint: "Common denominator 4.", explanation: "2x/4 + x/4 = 3x/4." },
  { id: "chal-y8-af-4", prompt: "Simplify (2x/3) × 9 and evaluate at x = 2.", latex: "", answer: "12", acceptedAnswers: [], hint: "= 6x.", explanation: "6(2) = 12." },
  { id: "chal-y8-af-5", prompt: "Simplify (10x)/(5x).", latex: "", answer: "2", acceptedAnswers: [], hint: "x cancels.", explanation: "2." },
  { id: "chal-y8-af-6", prompt: "Simplify (x/3) ÷ (x/9).", latex: "", answer: "3", acceptedAnswers: [], hint: "Multiply by the reciprocal.", explanation: "(x/3)(9/x) = 3." },
  { id: "chal-y8-af-7", prompt: "Simplify $\\tfrac{12x^2}{4x}$ and evaluate at x = 3.", latex: "", answer: "9", acceptedAnswers: [], hint: "= 3x.", explanation: "3(3) = 9." },
  { id: "chal-y8-af-8", prompt: "Simplify x/5 + 2x/5 and evaluate at x = 10.", latex: "", answer: "6", acceptedAnswers: [], hint: "= 3x/5.", explanation: "3(10)/5 = 6." },
  { id: "chal-y8-af-9", prompt: "Simplify 3x/4 − x/4 and evaluate at x = 8.", latex: "", answer: "4", acceptedAnswers: [], hint: "= x/2.", explanation: "8/2 = 4." },
  { id: "chal-y8-af-10", prompt: "Simplify 8x/2 − x and evaluate at x = 4.", latex: "", answer: "12", acceptedAnswers: [], hint: "4x − x = 3x.", explanation: "3(4) = 12." },
  { id: "chal-y8-af-11", prompt: "Simplify (x/2)(x/3) and evaluate at x = 6.", latex: "", answer: "6", acceptedAnswers: [], hint: "= x²/6.", explanation: "36/6 = 6." },
  { id: "chal-y8-af-12", prompt: "Simplify $\\tfrac{15x^3}{3x^2}$ and evaluate at x = 2.", latex: "", answer: "10", acceptedAnswers: [], hint: "= 5x.", explanation: "5(2) = 10." },
];

// ── Expanding expressions ─────────────────────────────────────────────────────────────────────
export const expandingExpressionsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-ee-1", prompt: "Expand 3(2x − 5). Give the coefficient of x.", latex: "", answer: "6", acceptedAnswers: [], hint: "3 × 2.", explanation: "6x − 15." },
  { id: "chal-y8-ee-2", prompt: "Expand 2x(x + 4). Give the coefficient of x².", latex: "", answer: "2", acceptedAnswers: [], hint: "2x · x.", explanation: "2x² + 8x." },
  { id: "chal-y8-ee-3", prompt: "Expand −5(x − 3). Give the constant term.", latex: "", answer: "15", acceptedAnswers: [], hint: "−5 × −3.", explanation: "−5x + 15." },
  { id: "chal-y8-ee-4", prompt: "Expand and simplify 2(x + 3) + 4(x − 1). Give the coefficient of x.", latex: "", answer: "6", acceptedAnswers: [], hint: "2x + 4x.", explanation: "6x + 2." },
  { id: "chal-y8-ee-5", prompt: "Expand and simplify 4(2x − 1) − 3(x − 2), then evaluate at x = 0.", latex: "", answer: "2", acceptedAnswers: [], hint: "= 5x + 2.", explanation: "At x = 0: 2." },
  { id: "chal-y8-ee-6", prompt: "Expand x(2x − 7). Give the coefficient of x.", latex: "", answer: "-7", acceptedAnswers: m("-7"), hint: "x · −7.", explanation: "2x² − 7x." },
  { id: "chal-y8-ee-7", prompt: "Expand 6(x + 2) and evaluate at x = 3.", latex: "", answer: "30", acceptedAnswers: [], hint: "6x + 12.", explanation: "18 + 12 = 30." },
  { id: "chal-y8-ee-8", prompt: "Expand −(3x − 8). Give the constant term.", latex: "", answer: "8", acceptedAnswers: [], hint: "Distribute the minus.", explanation: "−3x + 8." },
  { id: "chal-y8-ee-9", prompt: "Expand and simplify 3x(x + 5) − 2x². Give the coefficient of x².", latex: "", answer: "1", acceptedAnswers: [], hint: "3x² − 2x².", explanation: "x² + 15x." },
  { id: "chal-y8-ee-10", prompt: "Expand and simplify 5(x − 4) + 20, then evaluate at x = 0.", latex: "", answer: "0", acceptedAnswers: [], hint: "5x − 20 + 20 = 5x.", explanation: "At x = 0: 0." },
  { id: "chal-y8-ee-11", prompt: "Expand and simplify 2(3x + 1) + 3(2x − 4). Give the coefficient of x.", latex: "", answer: "12", acceptedAnswers: [], hint: "6x + 6x.", explanation: "12x − 10." },
  { id: "chal-y8-ee-12", prompt: "Expand and simplify 7(x + 2) − 2(3x − 1), then evaluate at x = 1.", latex: "", answer: "17", acceptedAnswers: [], hint: "= x + 16.", explanation: "1 + 16 = 17." },
];

// ── Binomial products ─────────────────────────────────────────────────────────────────────────
export const binomialProductsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-bp-1", prompt: "Expand (x + 3)(x + 4). Give the constant term.", latex: "", answer: "12", acceptedAnswers: [], hint: "3 × 4.", explanation: "x² + 7x + 12." },
  { id: "chal-y8-bp-2", prompt: "Expand (x + 3)(x + 4). Give the coefficient of x.", latex: "", answer: "7", acceptedAnswers: [], hint: "3 + 4.", explanation: "x² + 7x + 12." },
  { id: "chal-y8-bp-3", prompt: "Expand (x + 5)(x − 2). Give the constant term.", latex: "", answer: "-10", acceptedAnswers: m("-10"), hint: "5 × −2.", explanation: "x² + 3x − 10." },
  { id: "chal-y8-bp-4", prompt: "Expand (x − 3)(x − 4). Give the coefficient of x.", latex: "", answer: "-7", acceptedAnswers: m("-7"), hint: "−3 + −4.", explanation: "x² − 7x + 12." },
  { id: "chal-y8-bp-5", prompt: "Expand (x + 6)(x − 6). Give the constant term.", latex: "", answer: "-36", acceptedAnswers: m("-36"), hint: "Difference of squares.", explanation: "x² − 36." },
  { id: "chal-y8-bp-6", prompt: "Expand (2x + 1)(x + 3). Give the coefficient of x.", latex: "", answer: "7", acceptedAnswers: [], hint: "6x + x.", explanation: "2x² + 7x + 3." },
  { id: "chal-y8-bp-7", prompt: "Expand $(x + 5)^2$. Give the constant term.", latex: "", answer: "25", acceptedAnswers: [], hint: "5².", explanation: "x² + 10x + 25." },
  { id: "chal-y8-bp-8", prompt: "Expand $(x + 5)^2$. Give the coefficient of x.", latex: "", answer: "10", acceptedAnswers: [], hint: "2 × 5.", explanation: "x² + 10x + 25." },
  { id: "chal-y8-bp-9", prompt: "Expand $(x - 4)^2$. Give the coefficient of x.", latex: "", answer: "-8", acceptedAnswers: m("-8"), hint: "2 × −4.", explanation: "x² − 8x + 16." },
  { id: "chal-y8-bp-10", prompt: "Expand (3x + 2)(x − 1). Give the coefficient of x².", latex: "", answer: "3", acceptedAnswers: [], hint: "3x · x.", explanation: "3x² − x − 2." },
  { id: "chal-y8-bp-11", prompt: "Expand (x + 7)(x − 7). Give the constant term.", latex: "", answer: "-49", acceptedAnswers: m("-49"), hint: "Difference of squares.", explanation: "x² − 49." },
  { id: "chal-y8-bp-12", prompt: "Expand (2x − 3)(2x + 3). Give the constant term.", latex: "", answer: "-9", acceptedAnswers: m("-9"), hint: "Difference of squares.", explanation: "4x² − 9." },
];

// ── Equivalent expressions ────────────────────────────────────────────────────────────────────
export const equivalentExpressionsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-eqx-1", prompt: "Simplify 3x + 2x − x. Give the coefficient of x.", latex: "", answer: "4", acceptedAnswers: [], hint: "3 + 2 − 1.", explanation: "4x." },
  { id: "chal-y8-eqx-2", prompt: "Are 2(x + 3) and 2x + 6 equivalent? Answer yes or no.", latex: "", answer: "yes", acceptedAnswers: ["y"], hint: "Expand the first.", explanation: "Yes." },
  { id: "chal-y8-eqx-3", prompt: "Simplify 4(x + 1) − 4. Give the coefficient of x.", latex: "", answer: "4", acceptedAnswers: [], hint: "4x + 4 − 4.", explanation: "4x." },
  { id: "chal-y8-eqx-4", prompt: "Simplify 5x − 2(x − 3). Give the coefficient of x.", latex: "", answer: "3", acceptedAnswers: [], hint: "5x − 2x.", explanation: "3x + 6." },
  { id: "chal-y8-eqx-5", prompt: "Is 3(2x − 1) equivalent to 6x − 3? Answer yes or no.", latex: "", answer: "yes", acceptedAnswers: ["y"], hint: "Expand.", explanation: "Yes." },
  { id: "chal-y8-eqx-6", prompt: "Simplify (x + 4) + (2x − 1). Give the constant term.", latex: "", answer: "3", acceptedAnswers: [], hint: "4 − 1.", explanation: "3x + 3." },
  { id: "chal-y8-eqx-7", prompt: "Simplify 2(x + 5) − (x + 3). Give the constant term.", latex: "", answer: "7", acceptedAnswers: [], hint: "10 − 3.", explanation: "x + 7." },
  { id: "chal-y8-eqx-8", prompt: "Is $(x + 2)^2$ equivalent to $x^2 + 4$? Answer yes or no.", latex: "", answer: "no", acceptedAnswers: ["n"], hint: "There is a middle term.", explanation: "(x+2)² = x² + 4x + 4 ≠ x² + 4." },
  { id: "chal-y8-eqx-9", prompt: "Simplify 6x/2 + x. Give the coefficient of x.", latex: "", answer: "4", acceptedAnswers: [], hint: "3x + x.", explanation: "4x." },
  { id: "chal-y8-eqx-10", prompt: "Simplify 3(x − 2) + 2(x + 5) and evaluate at x = 0.", latex: "", answer: "4", acceptedAnswers: [], hint: "= 5x + 4.", explanation: "At x = 0: 4." },
  { id: "chal-y8-eqx-11", prompt: "Is 4x − x equivalent to 3x? Answer yes or no.", latex: "", answer: "yes", acceptedAnswers: ["y"], hint: "Collect like terms.", explanation: "Yes." },
  { id: "chal-y8-eqx-12", prompt: "Simplify 2(2x + 1) + 3 and evaluate at x = 2.", latex: "", answer: "13", acceptedAnswers: [], hint: "= 4x + 5.", explanation: "8 + 5 = 13." },
];

// ── Negative indices ──────────────────────────────────────────────────────────────────────────
export const negativeIndicesChallenge: PracticeQuestion[] = [
  { id: "chal-y8-ni-1", prompt: "Evaluate $2^{-3}$ (give as a fraction).", latex: "", answer: "1/8", acceptedAnswers: ["0.125"], hint: "1 over 2³.", explanation: "1/8." },
  { id: "chal-y8-ni-2", prompt: "Evaluate $5^{-2}$ (give as a fraction).", latex: "", answer: "1/25", acceptedAnswers: ["0.04"], hint: "1 over 5².", explanation: "1/25." },
  { id: "chal-y8-ni-3", prompt: "Simplify $x^5 \\times x^{-3}$. Give the index of x.", latex: "", answer: "2", acceptedAnswers: [], hint: "Add indices.", explanation: "5 + (−3) = 2." },
  { id: "chal-y8-ni-4", prompt: "Evaluate $10^{-1}$ (give as a decimal).", latex: "", answer: "0.1", acceptedAnswers: ["1/10"], hint: "1 over 10.", explanation: "0.1." },
  { id: "chal-y8-ni-5", prompt: "Simplify $a^{-2} \\times a^{6}$. Give the index.", latex: "", answer: "4", acceptedAnswers: [], hint: "Add indices.", explanation: "−2 + 6 = 4." },
  { id: "chal-y8-ni-6", prompt: "Evaluate $3^{-2} \\times 3^{4}$.", latex: "", answer: "9", acceptedAnswers: [], hint: "Indices add to 2.", explanation: "3² = 9." },
  { id: "chal-y8-ni-7", prompt: "Write $\\tfrac{1}{2^4}$ as a power of 2. Give the index.", latex: "", answer: "-4", acceptedAnswers: m("-4"), hint: "1/aⁿ = a⁻ⁿ.", explanation: "2⁻⁴, index −4." },
  { id: "chal-y8-ni-8", prompt: "Evaluate $2^{-1} + 2^{-2}$ (give as a fraction).", latex: "", answer: "3/4", acceptedAnswers: ["0.75"], hint: "1/2 + 1/4.", explanation: "3/4." },
  { id: "chal-y8-ni-9", prompt: "Simplify $x^{-4} \\div x^{-6}$. Give the index of x.", latex: "", answer: "2", acceptedAnswers: [], hint: "Subtract indices.", explanation: "−4 − (−6) = 2." },
  { id: "chal-y8-ni-10", prompt: "Evaluate $4^{-1}$ (give as a fraction).", latex: "", answer: "1/4", acceptedAnswers: ["0.25"], hint: "1 over 4.", explanation: "1/4." },
  { id: "chal-y8-ni-11", prompt: "Evaluate $(2^{-2})^{-1}$.", latex: "", answer: "4", acceptedAnswers: [], hint: "Multiply indices: −2 × −1 = 2.", explanation: "2² = 4." },
  { id: "chal-y8-ni-12", prompt: "Evaluate $10^{-3}$ (give as a decimal).", latex: "", answer: "0.001", acceptedAnswers: [], hint: "1 over 1000.", explanation: "0.001." },
];

// ── Scientific notation: large numbers ────────────────────────────────────────────────────────
export const scientificNotationLargeChallenge: PracticeQuestion[] = [
  { id: "chal-y8-snl-1", prompt: "Write 53 000 in scientific notation. Give the power of 10.", latex: "", answer: "4", acceptedAnswers: [], hint: "5.3 × 10ⁿ.", explanation: "5.3 × 10⁴, power 4." },
  { id: "chal-y8-snl-2", prompt: "Write 7 200 000 in scientific notation. Give the power of 10.", latex: "", answer: "6", acceptedAnswers: [], hint: "7.2 × 10ⁿ.", explanation: "7.2 × 10⁶." },
  { id: "chal-y8-snl-3", prompt: "Write $3 \\times 10^5$ as an ordinary number.", latex: "", answer: "300000", acceptedAnswers: [], hint: "3 followed by 5 zeros.", explanation: "300000." },
  { id: "chal-y8-snl-4", prompt: "Write 480 000 in scientific notation. Give the coefficient (the number before the power of 10).", latex: "", answer: "4.8", acceptedAnswers: [], hint: "Between 1 and 10.", explanation: "4.8 × 10⁵." },
  { id: "chal-y8-snl-5", prompt: "Write $6.1 \\times 10^3$ as an ordinary number.", latex: "", answer: "6100", acceptedAnswers: [], hint: "Shift 3 places.", explanation: "6100." },
  { id: "chal-y8-snl-6", prompt: "Write 1 250 000 in scientific notation. Give the power of 10.", latex: "", answer: "6", acceptedAnswers: [], hint: "1.25 × 10ⁿ.", explanation: "1.25 × 10⁶." },
  { id: "chal-y8-snl-7", prompt: "For $9 \\times 10^7$, how many zeros follow the 9 when written out?", latex: "", answer: "7", acceptedAnswers: [], hint: "The power tells you.", explanation: "7 zeros." },
  { id: "chal-y8-snl-8", prompt: "Write 90 400 in scientific notation. Give the coefficient.", latex: "", answer: "9.04", acceptedAnswers: [], hint: "Between 1 and 10.", explanation: "9.04 × 10⁴." },
  { id: "chal-y8-snl-9", prompt: "Write $2.5 \\times 10^4$ as an ordinary number.", latex: "", answer: "25000", acceptedAnswers: [], hint: "Shift 4 places.", explanation: "25000." },
  { id: "chal-y8-snl-10", prompt: "Write 600 000 in scientific notation. Give the power of 10.", latex: "", answer: "5", acceptedAnswers: [], hint: "6 × 10ⁿ.", explanation: "6 × 10⁵." },
  { id: "chal-y8-snl-11", prompt: "Write $1.2 \\times 10^6$ as an ordinary number.", latex: "", answer: "1200000", acceptedAnswers: [], hint: "Shift 6 places.", explanation: "1200000." },
  { id: "chal-y8-snl-12", prompt: "Write 84 000 in scientific notation. Give the power of 10.", latex: "", answer: "4", acceptedAnswers: [], hint: "8.4 × 10ⁿ.", explanation: "8.4 × 10⁴." },
];

// ── Scientific notation: small numbers ────────────────────────────────────────────────────────
export const scientificNotationSmallChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sns-1", prompt: "Write 0.0007 in scientific notation. Give the power of 10.", latex: "", answer: "-4", acceptedAnswers: m("-4"), hint: "7 × 10ⁿ.", explanation: "7 × 10⁻⁴." },
  { id: "chal-y8-sns-2", prompt: "Write $3 \\times 10^{-5}$ as a decimal.", latex: "", answer: "0.00003", acceptedAnswers: [], hint: "5 places after the point.", explanation: "0.00003." },
  { id: "chal-y8-sns-3", prompt: "Write 0.052 in scientific notation. Give the power of 10.", latex: "", answer: "-2", acceptedAnswers: m("-2"), hint: "5.2 × 10ⁿ.", explanation: "5.2 × 10⁻²." },
  { id: "chal-y8-sns-4", prompt: "Write $6 \\times 10^{-3}$ as a decimal.", latex: "", answer: "0.006", acceptedAnswers: [], hint: "3 places.", explanation: "0.006." },
  { id: "chal-y8-sns-5", prompt: "Write 0.000 000 91 in scientific notation. Give the power of 10.", latex: "", answer: "-7", acceptedAnswers: m("-7"), hint: "9.1 × 10ⁿ.", explanation: "9.1 × 10⁻⁷." },
  { id: "chal-y8-sns-6", prompt: "Write 0.0004 in scientific notation. Give the coefficient.", latex: "", answer: "4", acceptedAnswers: [], hint: "Between 1 and 10.", explanation: "4 × 10⁻⁴." },
  { id: "chal-y8-sns-7", prompt: "Write $2.5 \\times 10^{-4}$ as a decimal.", latex: "", answer: "0.00025", acceptedAnswers: [], hint: "Shift 4 places.", explanation: "0.00025." },
  { id: "chal-y8-sns-8", prompt: "Write 0.000 31 in scientific notation. Give the power of 10.", latex: "", answer: "-4", acceptedAnswers: m("-4"), hint: "3.1 × 10ⁿ.", explanation: "3.1 × 10⁻⁴." },
  { id: "chal-y8-sns-9", prompt: "Write $8 \\times 10^{-2}$ as a decimal.", latex: "", answer: "0.08", acceptedAnswers: [], hint: "2 places.", explanation: "0.08." },
  { id: "chal-y8-sns-10", prompt: "Write 0.000 006 in scientific notation. Give the power of 10.", latex: "", answer: "-6", acceptedAnswers: m("-6"), hint: "6 × 10ⁿ.", explanation: "6 × 10⁻⁶." },
  { id: "chal-y8-sns-11", prompt: "Write $1.5 \\times 10^{-3}$ as a decimal.", latex: "", answer: "0.0015", acceptedAnswers: [], hint: "Shift 3 places.", explanation: "0.0015." },
  { id: "chal-y8-sns-12", prompt: "Write 0.09 in scientific notation. Give the power of 10.", latex: "", answer: "-2", acceptedAnswers: m("-2"), hint: "9 × 10ⁿ.", explanation: "9 × 10⁻²." },
];

// ── Significant figures ───────────────────────────────────────────────────────────────────────
export const significantFiguresChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sf-1", prompt: "Round 3847 to 2 significant figures.", latex: "", answer: "3800", acceptedAnswers: [], hint: "First two digits.", explanation: "3800." },
  { id: "chal-y8-sf-2", prompt: "Round 0.004562 to 2 significant figures.", latex: "", answer: "0.0046", acceptedAnswers: [], hint: "First two non-zero digits.", explanation: "0.0046." },
  { id: "chal-y8-sf-3", prompt: "Round 25 950 to 3 significant figures.", latex: "", answer: "26000", acceptedAnswers: [], hint: "Round the third figure.", explanation: "26000." },
  { id: "chal-y8-sf-4", prompt: "Round 0.7846 to 2 significant figures.", latex: "", answer: "0.78", acceptedAnswers: [], hint: "Two figures.", explanation: "0.78." },
  { id: "chal-y8-sf-5", prompt: "How many significant figures does 3050 have?", latex: "", answer: "3", acceptedAnswers: [], hint: "Trailing zero not counted here.", explanation: "3, 0, 5 → 3 sig figs." },
  { id: "chal-y8-sf-6", prompt: "Round 149 500 to 2 significant figures.", latex: "", answer: "150000", acceptedAnswers: [], hint: "Round up.", explanation: "150000." },
  { id: "chal-y8-sf-7", prompt: "Round 0.0010299 to 3 significant figures.", latex: "", answer: "0.00103", acceptedAnswers: [], hint: "1, 0, 3.", explanation: "0.00103." },
  { id: "chal-y8-sf-8", prompt: "Round 9.999 to 2 significant figures.", latex: "", answer: "10", acceptedAnswers: [], hint: "Rounds up.", explanation: "10." },
  { id: "chal-y8-sf-9", prompt: "How many significant figures does 0.00420 have?", latex: "", answer: "3", acceptedAnswers: [], hint: "Leading zeros do not count; trailing zero does.", explanation: "4, 2, 0 → 3." },
  { id: "chal-y8-sf-10", prompt: "Round 67 849 to 1 significant figure.", latex: "", answer: "70000", acceptedAnswers: [], hint: "Round the first figure.", explanation: "70000." },
  { id: "chal-y8-sf-11", prompt: "Round 0.05500 to 2 significant figures.", latex: "", answer: "0.055", acceptedAnswers: [], hint: "5, 5.", explanation: "0.055." },
  { id: "chal-y8-sf-12", prompt: "Round 12 345 to 3 significant figures.", latex: "", answer: "12300", acceptedAnswers: [], hint: "1, 2, 3.", explanation: "12300." },
];

// ── Operations with scientific notation ───────────────────────────────────────────────────────
export const operationsScientificNotationChallenge: PracticeQuestion[] = [
  { id: "chal-y8-osn-1", prompt: "Evaluate $(2 \\times 10^3)(3 \\times 10^4)$. Give the power of 10 in the answer.", latex: "", answer: "7", acceptedAnswers: [], hint: "Add the powers.", explanation: "6 × 10⁷." },
  { id: "chal-y8-osn-2", prompt: "Evaluate $(2 \\times 10^3)(3 \\times 10^4)$. Give the coefficient.", latex: "", answer: "6", acceptedAnswers: [], hint: "2 × 3.", explanation: "6 × 10⁷." },
  { id: "chal-y8-osn-3", prompt: "Evaluate $(8 \\times 10^6) \\div (2 \\times 10^2)$. Give the coefficient.", latex: "", answer: "4", acceptedAnswers: [], hint: "8 ÷ 2.", explanation: "4 × 10⁴." },
  { id: "chal-y8-osn-4", prompt: "Evaluate $(8 \\times 10^6) \\div (2 \\times 10^2)$. Give the power of 10.", latex: "", answer: "4", acceptedAnswers: [], hint: "Subtract powers.", explanation: "4 × 10⁴." },
  { id: "chal-y8-osn-5", prompt: "Evaluate $(5 \\times 10^4)(2 \\times 10^3)$ in scientific notation. Give the power of 10.", latex: "", answer: "8", acceptedAnswers: [], hint: "10 × 10⁷ = 10⁸.", explanation: "1 × 10⁸." },
  { id: "chal-y8-osn-6", prompt: "Evaluate $(6 \\times 10^5) \\div (3 \\times 10^{-2})$. Give the power of 10.", latex: "", answer: "7", acceptedAnswers: [], hint: "5 − (−2).", explanation: "2 × 10⁷." },
  { id: "chal-y8-osn-7", prompt: "Evaluate $(4 \\times 10^2)^2$ in scientific notation. Give the power of 10.", latex: "", answer: "5", acceptedAnswers: [], hint: "16 × 10⁴ = 1.6 × 10⁵.", explanation: "1.6 × 10⁵." },
  { id: "chal-y8-osn-8", prompt: "Evaluate $(9 \\times 10^8) \\div (3 \\times 10^5)$. Give the coefficient.", latex: "", answer: "3", acceptedAnswers: [], hint: "9 ÷ 3.", explanation: "3 × 10³." },
  { id: "chal-y8-osn-9", prompt: "Evaluate $(1.5 \\times 10^3)(2 \\times 10^2)$. Give the coefficient.", latex: "", answer: "3", acceptedAnswers: [], hint: "1.5 × 2.", explanation: "3 × 10⁵." },
  { id: "chal-y8-osn-10", prompt: "Evaluate $(2 \\times 10^{-3})(3 \\times 10^{6})$. Give the power of 10.", latex: "", answer: "3", acceptedAnswers: [], hint: "−3 + 6.", explanation: "6 × 10³, power 3." },
  { id: "chal-y8-osn-11", prompt: "Evaluate $(2 \\times 10^5)^3$ in scientific notation. Give the power of 10.", latex: "", answer: "15", acceptedAnswers: [], hint: "8 × 10¹⁵.", explanation: "8 × 10¹⁵." },
  { id: "chal-y8-osn-12", prompt: "Evaluate $(4.8 \\times 10^6) \\div (1.2 \\times 10^6)$.", latex: "", answer: "4", acceptedAnswers: [], hint: "Powers cancel.", explanation: "4." },
];

// ── Indices B: advanced index manipulation ────────────────────────────────────────────────────
export const advancedIndexManipulationChallenge: PracticeQuestion[] = [
  { id: "chal-y8-aim-1", prompt: "Simplify $\\tfrac{x^8}{x^3}$. Give the index of x.", latex: "", answer: "5", acceptedAnswers: [], hint: "Subtract indices.", explanation: "x⁵." },
  { id: "chal-y8-aim-2", prompt: "Simplify $(2x^3)^2$. Give the coefficient.", latex: "", answer: "4", acceptedAnswers: [], hint: "2².", explanation: "4x⁶." },
  { id: "chal-y8-aim-3", prompt: "Simplify $(2x^3)^2$. Give the index of x.", latex: "", answer: "6", acceptedAnswers: [], hint: "3 × 2.", explanation: "4x⁶." },
  { id: "chal-y8-aim-4", prompt: "Simplify $\\tfrac{12x^6}{4x^2}$. Give the coefficient.", latex: "", answer: "3", acceptedAnswers: [], hint: "12 ÷ 4.", explanation: "3x⁴." },
  { id: "chal-y8-aim-5", prompt: "Simplify $\\tfrac{12x^6}{4x^2}$. Give the index of x.", latex: "", answer: "4", acceptedAnswers: [], hint: "6 − 2.", explanation: "3x⁴." },
  { id: "chal-y8-aim-6", prompt: "Simplify $x^5 \\times x^2 \\div x^4$. Give the index of x.", latex: "", answer: "3", acceptedAnswers: [], hint: "5 + 2 − 4.", explanation: "x³." },
  { id: "chal-y8-aim-7", prompt: "Simplify $(3x^2)^3$. Give the coefficient.", latex: "", answer: "27", acceptedAnswers: [], hint: "3³.", explanation: "27x⁶." },
  { id: "chal-y8-aim-8", prompt: "Simplify $(a^4)^2 \\times a$. Give the index.", latex: "", answer: "9", acceptedAnswers: [], hint: "8 + 1.", explanation: "a⁹." },
  { id: "chal-y8-aim-9", prompt: "Evaluate $\\tfrac{2^{10}}{2^{7}}$.", latex: "", answer: "8", acceptedAnswers: [], hint: "2³.", explanation: "8." },
  { id: "chal-y8-aim-10", prompt: "Simplify $\\tfrac{(x^2)^3}{x^4}$. Give the index of x.", latex: "", answer: "2", acceptedAnswers: [], hint: "6 − 4.", explanation: "x²." },
  { id: "chal-y8-aim-11", prompt: "Simplify $5x^0$.", latex: "", answer: "5", acceptedAnswers: [], hint: "x⁰ = 1.", explanation: "5." },
  { id: "chal-y8-aim-12", prompt: "Simplify $(4x^2y)^2$. Give the coefficient.", latex: "", answer: "16", acceptedAnswers: [], hint: "4².", explanation: "16x⁴y²." },
];

// ── Indices B: algebraic bases ────────────────────────────────────────────────────────────────
export const algebraicBasesChallenge: PracticeQuestion[] = [
  { id: "chal-y8-ab-1", prompt: "Simplify $a^3 b^2 \\times a^2 b$. Give the index of a.", latex: "", answer: "5", acceptedAnswers: [], hint: "3 + 2.", explanation: "a⁵b³." },
  { id: "chal-y8-ab-2", prompt: "Simplify $a^3 b^2 \\times a^2 b$. Give the index of b.", latex: "", answer: "3", acceptedAnswers: [], hint: "2 + 1.", explanation: "a⁵b³." },
  { id: "chal-y8-ab-3", prompt: "Simplify $\\tfrac{a^6 b^4}{a^2 b}$. Give the index of a.", latex: "", answer: "4", acceptedAnswers: [], hint: "6 − 2.", explanation: "a⁴b³." },
  { id: "chal-y8-ab-4", prompt: "Simplify $(ab^2)^3$. Give the index of b.", latex: "", answer: "6", acceptedAnswers: [], hint: "2 × 3.", explanation: "a³b⁶." },
  { id: "chal-y8-ab-5", prompt: "Simplify $\\tfrac{x^5 y^3}{x^5 y}$. Give the index of y.", latex: "", answer: "2", acceptedAnswers: [], hint: "3 − 1 (x cancels).", explanation: "y²." },
  { id: "chal-y8-ab-6", prompt: "Simplify $(2a^2 b)^2$. Give the coefficient.", latex: "", answer: "4", acceptedAnswers: [], hint: "2².", explanation: "4a⁴b²." },
  { id: "chal-y8-ab-7", prompt: "Simplify $m^7 \\div m^7$.", latex: "", answer: "1", acceptedAnswers: [], hint: "m⁰.", explanation: "1." },
  { id: "chal-y8-ab-8", prompt: "Simplify $p^4 q \\times p q^3$. Give the index of q.", latex: "", answer: "4", acceptedAnswers: [], hint: "1 + 3.", explanation: "p⁵q⁴." },
  { id: "chal-y8-ab-9", prompt: "Simplify $(x^3 y^2)^2$. Give the index of x.", latex: "", answer: "6", acceptedAnswers: [], hint: "3 × 2.", explanation: "x⁶y⁴." },
  { id: "chal-y8-ab-10", prompt: "Simplify $\\tfrac{8a^5}{2a^5}$.", latex: "", answer: "4", acceptedAnswers: [], hint: "a cancels.", explanation: "4." },
  { id: "chal-y8-ab-11", prompt: "Simplify $a^2 \\times a^3 \\times a^0$. Give the index.", latex: "", answer: "5", acceptedAnswers: [], hint: "2 + 3 + 0.", explanation: "a⁵." },
  { id: "chal-y8-ab-12", prompt: "Simplify $(3m^2 n^3)^2$. Give the index of n.", latex: "", answer: "6", acceptedAnswers: [], hint: "3 × 2.", explanation: "9m⁴n⁶." },
];

// ── Indices B: indicial equations ─────────────────────────────────────────────────────────────
export const indicialEquationsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-ie-1", prompt: "Solve $2^x = 32$.", latex: "", answer: "5", acceptedAnswers: [], hint: "32 = 2⁵.", explanation: "x = 5." },
  { id: "chal-y8-ie-2", prompt: "Solve $3^x = 81$.", latex: "", answer: "4", acceptedAnswers: [], hint: "81 = 3⁴.", explanation: "x = 4." },
  { id: "chal-y8-ie-3", prompt: "Solve $5^x = 125$.", latex: "", answer: "3", acceptedAnswers: [], hint: "125 = 5³.", explanation: "x = 3." },
  { id: "chal-y8-ie-4", prompt: "Solve $2^x = 1$.", latex: "", answer: "0", acceptedAnswers: [], hint: "Any base to 0 is 1.", explanation: "x = 0." },
  { id: "chal-y8-ie-5", prompt: "Solve $10^x = 10000$.", latex: "", answer: "4", acceptedAnswers: [], hint: "Count the zeros.", explanation: "x = 4." },
  { id: "chal-y8-ie-6", prompt: "Solve $4^x = 64$.", latex: "", answer: "3", acceptedAnswers: [], hint: "64 = 4³.", explanation: "x = 3." },
  { id: "chal-y8-ie-7", prompt: "Solve $2^{x+1} = 16$.", latex: "", answer: "3", acceptedAnswers: [], hint: "16 = 2⁴, so x + 1 = 4.", explanation: "x = 3." },
  { id: "chal-y8-ie-8", prompt: "Solve $3^{2x} = 81$.", latex: "", answer: "2", acceptedAnswers: [], hint: "81 = 3⁴, so 2x = 4.", explanation: "x = 2." },
  { id: "chal-y8-ie-9", prompt: "Solve $7^x = 1$.", latex: "", answer: "0", acceptedAnswers: [], hint: "7⁰ = 1.", explanation: "x = 0." },
  { id: "chal-y8-ie-10", prompt: "Solve $2^x = \\tfrac{1}{8}$.", latex: "", answer: "-3", acceptedAnswers: m("-3"), hint: "1/8 = 2⁻³.", explanation: "x = −3." },
  { id: "chal-y8-ie-11", prompt: "Solve $9^x = 3$ (give x as a decimal).", latex: "", answer: "0.5", acceptedAnswers: ["1/2"], hint: "9 = 3², so the powers give 2x = 1.", explanation: "2x = 1 → x = 0.5." },
  { id: "chal-y8-ie-12", prompt: "Solve $5^{x-2} = 25$.", latex: "", answer: "4", acceptedAnswers: [], hint: "25 = 5², so x − 2 = 2.", explanation: "x = 4." },
];
