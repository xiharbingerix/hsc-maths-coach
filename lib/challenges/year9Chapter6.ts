// Year 9 Wave 7 — Chapter 6 (Indices & Surds) D6 challenge pools (Level-6 tier, post-mastery;
// ADR-Y9-001). 12 markable questions per section. Registered course-scoped in lib/challenges/index.ts
// (core → all 3; path → base + advanced).

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — combine several index/surd rules.", explanation };
}
const sup: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const u = (n: number | string) => String(n).split("").map((d) => sup[d] || d).join("");
const px = (b: string, n: number) => [`${b}^${n}`, `${b}${u(n)}`, `${b}^{${n}}`];
const sci = (a: number, n: number) => [`${a}×10^${n}`, `${a}x10^${n}`, `${a}*10^${n}`, `${a}×10^{${n}}`, `${a}×10${u(n)}`, `${a}e${n}`];
const sd = (k: number, r: number) => [`${k}√${r}`, `${k}\\sqrt{${r}}`, `${k}sqrt${r}`];

// index-notation (core)
export const indexNotationY9Challenge: PracticeQuestion[] = [
  q("y9c-in-1", "Evaluate 2³ × 2.", "2^3\\times2", "16", "8 × 2 = 16.", []),
  q("y9c-in-2", "Which is larger, 2⁵ or 3³? Give its value.", "2^5\\ \\text{vs}\\ 3^3", "32", "2⁵ = 32 > 27.", []),
  q("y9c-in-3", "Evaluate 6².", "6^2", "36", "36.", []),
  q("y9c-in-4", "Evaluate 2⁴ × 3².", "2^4\\times3^2", "144", "16 × 9 = 144.", []),
  q("y9c-in-5", "Evaluate 5² + 2³.", "5^2+2^3", "33", "25 + 8 = 33.", []),
  q("y9c-in-6", "Evaluate 3³ − 2³.", "3^3-2^3", "19", "27 − 8 = 19.", []),
  q("y9c-in-7", "Evaluate (2²)² as a number.", "(2^2)^2", "16", "4² = 16.", []),
  q("y9c-in-8", "Evaluate 10² − 5².", "10^2-5^2", "75", "100 − 25 = 75.", []),
  q("y9c-in-9", "Express 81 as a power of 3.", "81=3^?", "3^4", "3⁴ = 81.", px("3", 4)),
  q("y9c-in-10", "Express 64 as a power of 2.", "64=2^?", "2^6", "2⁶ = 64.", px("2", 6)),
  q("y9c-in-11", "Evaluate 2³ + 3².", "2^3+3^2", "17", "8 + 9 = 17.", []),
  q("y9c-in-12", "Evaluate 4² × 2².", "4^2\\times2^2", "64", "16 × 4 = 64.", []),
];

// index-laws-multiplying-dividing (core)
export const indexMultDivY9Challenge: PracticeQuestion[] = [
  q("y9c-imd-1", "Simplify 3x² × 4x³.", "3x^2\\times4x^3", "12x^5", "12x⁵.", ["12x⁵"]),
  q("y9c-imd-2", "Simplify 6x⁵ ÷ 2x².", "6x^5\\div2x^2", "3x^3", "3x³.", ["3x³"]),
  q("y9c-imd-3", "Simplify x⁴ × x³ ÷ x².", "x^4\\times x^3\\div x^2", "x^5", "x⁵.", px("x", 5)),
  q("y9c-imd-4", "Simplify 2a³ × 3a².", "2a^3\\times3a^2", "6a^5", "6a⁵.", ["6a⁵"]),
  q("y9c-imd-5", "Simplify 10y⁶ ÷ 5y.", "10y^6\\div5y", "2y^5", "2y⁵.", ["2y⁵"]),
  q("y9c-imd-6", "Simplify x²y × xy³.", "x^2y\\times xy^3", "x^3y^4", "x³y⁴.", ["x³y⁴"]),
  q("y9c-imd-7", "Simplify 12a⁵ ÷ 3a⁵.", "12a^5\\div3a^5", "4", "4 × a⁰ = 4.", []),
  q("y9c-imd-8", "Simplify 5x³ × 2x⁴ ÷ x².", "5x^3\\times2x^4\\div x^2", "10x^5", "10x⁵.", ["10x⁵"]),
  q("y9c-imd-9", "Simplify 8m⁷ ÷ 4m³.", "8m^7\\div4m^3", "2m^4", "2m⁴.", ["2m⁴"]),
  q("y9c-imd-10", "Simplify a³b² × a²b.", "a^3b^2\\times a^2b", "a^5b^3", "a⁵b³.", ["a⁵b³"]),
  q("y9c-imd-11", "Simplify 15x⁸ ÷ 5x³.", "15x^8\\div5x^3", "3x^5", "3x⁵.", ["3x⁵"]),
  q("y9c-imd-12", "Simplify 4x² × 3x × 2x³.", "4x^2\\times3x\\times2x^3", "24x^6", "24x⁶.", ["24x⁶"]),
];

// zero-index-power-of-power (core)
export const zeroPowerY9Challenge: PracticeQuestion[] = [
  q("y9c-zp-1", "Simplify (2x²)³.", "(2x^2)^3", "8x^6", "2³x⁶ = 8x⁶.", ["8x⁶"]),
  q("y9c-zp-2", "Simplify (3a)².", "(3a)^2", "9a^2", "9a².", ["9a²"]),
  q("y9c-zp-3", "Simplify (x²)³ × x.", "(x^2)^3\\times x", "x^7", "x⁶ × x = x⁷.", px("x", 7)),
  q("y9c-zp-4", "Evaluate (2³)² ÷ 2⁴.", "(2^3)^2\\div2^4", "4", "2⁶ ÷ 2⁴ = 4.", []),
  q("y9c-zp-5", "Simplify 5x⁰ (x ≠ 0).", "5x^0", "5", "5 × 1 = 5.", []),
  q("y9c-zp-6", "Simplify (a²b)³.", "(a^2b)^3", "a^6b^3", "a⁶b³.", ["a⁶b³"]),
  q("y9c-zp-7", "Simplify (x³)² ÷ x⁴.", "(x^3)^2\\div x^4", "x^2", "x⁶ ÷ x⁴ = x².", px("x", 2)),
  q("y9c-zp-8", "Evaluate 3⁰ + 4⁰.", "3^0+4^0", "2", "1 + 1 = 2.", []),
  q("y9c-zp-9", "Simplify (2x³)² × x.", "(2x^3)^2\\times x", "4x^7", "4x⁶ × x = 4x⁷.", ["4x⁷"]),
  q("y9c-zp-10", "Simplify (x⁴)² ÷ (x³)².", "(x^4)^2\\div(x^3)^2", "x^2", "x⁸ ÷ x⁶ = x².", px("x", 2)),
  q("y9c-zp-11", "Simplify (3x²)².", "(3x^2)^2", "9x^4", "9x⁴.", ["9x⁴"]),
  q("y9c-zp-12", "Simplify (2a²b)³.", "(2a^2b)^3", "8a^6b^3", "8a⁶b³.", ["8a⁶b³"]),
];

// index-laws-extended (path)
export const indexExtY9Challenge: PracticeQuestion[] = [
  q("y9c-ile-1", "Simplify (2x²)³ × x.", "(2x^2)^3\\times x", "8x^7", "8x⁶ × x = 8x⁷.", ["8x⁷"]),
  q("y9c-ile-2", "Simplify (3x)² ÷ (9x).", "(3x)^2\\div(9x)", "x", "9x² ÷ 9x = x.", []),
  q("y9c-ile-3", "Simplify (a²b)³ ÷ (ab).", "(a^2b)^3\\div(ab)", "a^5b^2", "a⁶b³ ÷ ab = a⁵b².", ["a⁵b²"]),
  q("y9c-ile-4", "Simplify (2x)³ ÷ (4x²).", "(2x)^3\\div(4x^2)", "2x", "8x³ ÷ 4x² = 2x.", []),
  q("y9c-ile-5", "Simplify (3a²)² × 2a.", "(3a^2)^2\\times2a", "18a^5", "9a⁴ × 2a = 18a⁵.", ["18a⁵"]),
  q("y9c-ile-6", "Simplify (x²y³)².", "(x^2y^3)^2", "x^4y^6", "x⁴y⁶.", ["x⁴y⁶"]),
  q("y9c-ile-7", "Simplify (2x³)² ÷ x⁴.", "(2x^3)^2\\div x^4", "4x^2", "4x⁶ ÷ x⁴ = 4x².", ["4x²"]),
  q("y9c-ile-8", "Simplify (5x²y)² ÷ (5xy).", "(5x^2y)^2\\div(5xy)", "5x^3y", "25x⁴y² ÷ 5xy = 5x³y.", ["5x³y"]),
  q("y9c-ile-9", "Simplify (ab)³ × (ab)².", "(ab)^3\\times(ab)^2", "a^5b^5", "a³b³ × a²b² = a⁵b⁵.", ["a⁵b⁵"]),
  q("y9c-ile-10", "Simplify (4x²)² ÷ (2x)³.", "(4x^2)^2\\div(2x)^3", "2x", "16x⁴ ÷ 8x³ = 2x.", []),
  q("y9c-ile-11", "Simplify (3xy²)².", "(3xy^2)^2", "9x^2y^4", "9x²y⁴.", ["9x²y⁴"]),
  q("y9c-ile-12", "Simplify (2a³)³ ÷ (4a⁵).", "(2a^3)^3\\div(4a^5)", "2a^4", "8a⁹ ÷ 4a⁵ = 2a⁴.", ["2a⁴"]),
];

// negative-indices (path)
export const negIndicesY9Challenge: PracticeQuestion[] = [
  q("y9c-ni-1", "Simplify 2³ × 2⁻⁵ (as a fraction).", "2^3\\times2^{-5}", "1/4", "2⁻² = 1/4.", ["1 / 4", "0.25"]),
  q("y9c-ni-2", "Simplify x⁵ × x⁻² (positive index).", "x^5\\times x^{-2}", "x^3", "x³.", ["x³"]),
  q("y9c-ni-3", "Evaluate (2⁻¹)⁻².", "(2^{-1})^{-2}", "4", "2² = 4.", []),
  q("y9c-ni-4", "Evaluate 4⁻¹ + 2⁻¹ (as a fraction).", "4^{-1}+2^{-1}", "3/4", "1/4 + 1/2 = 3/4.", ["3 / 4", "0.75"]),
  q("y9c-ni-5", "Simplify x⁻³ × x⁵ (positive index).", "x^{-3}\\times x^5", "x^2", "x².", ["x²"]),
  q("y9c-ni-6", "Evaluate 3⁻² × 9.", "3^{-2}\\times9", "1", "1/9 × 9 = 1.", []),
  q("y9c-ni-7", "Evaluate (1/2)⁻¹.", "(1/2)^{-1}", "2", "Reciprocal of 1/2.", []),
  q("y9c-ni-8", "Simplify x⁴ ÷ x⁶ (positive index).", "x^4\\div x^6", "1/x^2", "x⁻² = 1/x².", ["1/x²", "1 / x^2"]),
  q("y9c-ni-9", "Evaluate 5⁻¹ + 5⁰.", "5^{-1}+5^0", "6/5", "1/5 + 1 = 6/5.", ["6 / 5", "1.2"]),
  q("y9c-ni-10", "Evaluate 2⁻³ + 2⁻³ (as a fraction).", "2^{-3}+2^{-3}", "1/4", "1/8 + 1/8 = 1/4.", ["1 / 4", "0.25"]),
  q("y9c-ni-11", "Evaluate (2⁻²)⁻¹.", "(2^{-2})^{-1}", "4", "2² = 4.", []),
  q("y9c-ni-12", "Evaluate 10⁻² × 10⁴.", "10^{-2}\\times10^4", "100", "10² = 100.", []),
];

// scientific-notation (core)
export const sciNotationY9Challenge: PracticeQuestion[] = [
  q("y9c-sn-1", "Convert 4.5 × 10⁴ to an ordinary number.", "4.5\\times10^4", "45000", "45000.", []),
  q("y9c-sn-2", "Calculate (2 × 10³) × (3 × 10²).", "2\\times10^3\\cdot3\\times10^2", "6×10^5", "6 × 10⁵.", sci(6, 5)),
  q("y9c-sn-3", "Convert 7 × 10⁻³ to an ordinary number.", "7\\times10^{-3}", "0.007", "0.007.", []),
  q("y9c-sn-4", "Calculate (6 × 10⁵) ÷ (2 × 10²).", "6\\times10^5\\div2\\times10^2", "3×10^3", "3 × 10³.", sci(3, 3)),
  q("y9c-sn-5", "Write 0.00045 in scientific notation.", "0.00045", "4.5×10^-4", "4.5 × 10⁻⁴.", sci(4.5, -4)),
  q("y9c-sn-6", "Convert 3.2 × 10⁻² to an ordinary number.", "3.2\\times10^{-2}", "0.032", "0.032.", []),
  q("y9c-sn-7", "Calculate (4 × 10³) × (2 × 10⁴).", "4\\times10^3\\cdot2\\times10^4", "8×10^7", "8 × 10⁷.", sci(8, 7)),
  q("y9c-sn-8", "Write 95000000 in scientific notation.", "95000000", "9.5×10^7", "9.5 × 10⁷.", sci(9.5, 7)),
  q("y9c-sn-9", "Convert 1.5 × 10⁶ to an ordinary number.", "1.5\\times10^6", "1500000", "1500000.", []),
  q("y9c-sn-10", "Calculate (9 × 10⁴) ÷ (3 × 10⁶).", "9\\times10^4\\div3\\times10^6", "3×10^-2", "3 × 10⁻².", sci(3, -2)),
  q("y9c-sn-11", "Write 0.000006 in scientific notation.", "0.000006", "6×10^-6", "6 × 10⁻⁶.", sci(6, -6)),
  q("y9c-sn-12", "Calculate (5 × 10²) × (4 × 10³).", "5\\times10^2\\cdot4\\times10^3", "2×10^6", "20 × 10⁵ = 2 × 10⁶.", sci(2, 6)),
];

// scientific-notation-significant-figures (core)
export const sciNotationSfY9Challenge: PracticeQuestion[] = [
  q("y9c-snsf-1", "Write 9960 to 2 s.f. in scientific notation.", "9960,2sf", "1.0×10^4", "→ 10000 = 1.0 × 10⁴.", ["1×10^4", ...sci(1, 4)]),
  q("y9c-snsf-2", "Write 0.009951 to 2 s.f. in scientific notation.", "0.009951,2sf", "1.0×10^-2", "→ 0.010 = 1.0 × 10⁻².", ["1×10^-2", ...sci(1, -2)]),
  q("y9c-snsf-3", "Write 1499 to 2 s.f. in scientific notation.", "1499,2sf", "1.5×10^3", "→ 1500 = 1.5 × 10³.", sci(1.5, 3)),
  q("y9c-snsf-4", "Write 0.04953 to 3 s.f. in scientific notation.", "0.04953,3sf", "4.95×10^-2", "4.95 × 10⁻².", sci(4.95, -2)),
  q("y9c-snsf-5", "Write 749000 to 1 s.f. in scientific notation.", "749000,1sf", "7×10^5", "7 × 10⁵.", sci(7, 5)),
  q("y9c-snsf-6", "Write 0.0006501 to 2 s.f. in scientific notation.", "0.0006501,2sf", "6.5×10^-4", "6.5 × 10⁻⁴.", sci(6.5, -4)),
  q("y9c-snsf-7", "Write 25500 to 2 s.f. in scientific notation.", "25500,2sf", "2.6×10^4", "→ 26000 = 2.6 × 10⁴.", sci(2.6, 4)),
  q("y9c-snsf-8", "Write 0.003299 to 3 s.f. in scientific notation.", "0.003299,3sf", "3.30×10^-3", "3.30 × 10⁻³.", ["3.3×10^-3", ...sci(3.3, -3)]),
  q("y9c-snsf-9", "Write 8245 to 3 s.f. in scientific notation.", "8245,3sf", "8.25×10^3", "8.25 × 10³.", sci(8.25, 3)),
  q("y9c-snsf-10", "Write 0.09996 to 2 s.f. in scientific notation.", "0.09996,2sf", "1.0×10^-1", "→ 0.10 = 1.0 × 10⁻¹.", ["1×10^-1", ...sci(1, -1)]),
  q("y9c-snsf-11", "Write 346 to 2 s.f. in scientific notation.", "346,2sf", "3.5×10^2", "→ 350 = 3.5 × 10².", sci(3.5, 2)),
  q("y9c-snsf-12", "Write 67800 to 2 s.f. in scientific notation.", "67800,2sf", "6.8×10^4", "6.8 × 10⁴.", sci(6.8, 4)),
];

// fractional-indices-surds (path)
export const fracIndicesY9Challenge: PracticeQuestion[] = [
  q("y9c-fis-1", "Evaluate 8^(2/3).", "8^{2/3}", "4", "(∛8)² = 4.", []),
  q("y9c-fis-2", "Evaluate 16^(3/4).", "16^{3/4}", "8", "(16^(1/4))³ = 2³ = 8.", []),
  q("y9c-fis-3", "Evaluate 27^(2/3).", "27^{2/3}", "9", "(∛27)² = 9.", []),
  q("y9c-fis-4", "Evaluate 9^(−1/2).", "9^{-1/2}", "1/3", "1/√9 = 1/3.", ["1 / 3"]),
  q("y9c-fis-5", "Evaluate 4^(5/2).", "4^{5/2}", "32", "(√4)⁵ = 32.", []),
  q("y9c-fis-6", "Evaluate 25^(3/2).", "25^{3/2}", "125", "(√25)³ = 125.", []),
  q("y9c-fis-7", "Evaluate 8^(−1/3).", "8^{-1/3}", "1/2", "1/∛8 = 1/2.", ["1 / 2", "0.5"]),
  q("y9c-fis-8", "Evaluate 32^(2/5).", "32^{2/5}", "4", "(32^(1/5))² = 4.", []),
  q("y9c-fis-9", "Evaluate 100^(3/2).", "100^{3/2}", "1000", "(√100)³ = 1000.", []),
  q("y9c-fis-10", "Evaluate 16^(−1/2).", "16^{-1/2}", "1/4", "1/√16 = 1/4.", ["1 / 4", "0.25"]),
  q("y9c-fis-11", "Evaluate 64^(2/3).", "64^{2/3}", "16", "(∛64)² = 4² = 16.", []),
  q("y9c-fis-12", "Evaluate 81^(3/4).", "81^{3/4}", "27", "(81^(1/4))³ = 3³ = 27.", []),
];

// operations-with-surds (path)
export const surdsOpsY9Challenge: PracticeQuestion[] = [
  q("y9c-ows-1", "Expand √2(√2 + 1).", "\\sqrt2(\\sqrt2+1)", "2+√2", "2 + √2.", ["2 + √2", "√2+2", "2+\\sqrt2"]),
  q("y9c-ows-2", "Evaluate (√3)².", "(\\sqrt3)^2", "3", "3.", []),
  q("y9c-ows-3", "Simplify √8 + √2.", "\\sqrt8+\\sqrt2", "3√2", "2√2 + √2 = 3√2.", sd(3, 2)),
  q("y9c-ows-4", "Simplify √27 − √3.", "\\sqrt{27}-\\sqrt3", "2√3", "3√3 − √3 = 2√3.", sd(2, 3)),
  q("y9c-ows-5", "Simplify √12 + √3.", "\\sqrt{12}+\\sqrt3", "3√3", "2√3 + √3 = 3√3.", sd(3, 3)),
  q("y9c-ows-6", "Evaluate √5 × √20.", "\\sqrt5\\times\\sqrt{20}", "10", "√100 = 10.", []),
  q("y9c-ows-7", "Simplify √72.", "\\sqrt{72}", "6√2", "√(36×2) = 6√2.", sd(6, 2)),
  q("y9c-ows-8", "Expand √3(√3 − 2).", "\\sqrt3(\\sqrt3-2)", "3-2√3", "3 − 2√3.", ["3 - 2√3", "3-2\\sqrt3"]),
  q("y9c-ows-9", "Simplify √50 − √18.", "\\sqrt{50}-\\sqrt{18}", "2√2", "5√2 − 3√2 = 2√2.", sd(2, 2)),
  q("y9c-ows-10", "Evaluate (2√3)².", "(2\\sqrt3)^2", "12", "4 × 3 = 12.", []),
  q("y9c-ows-11", "Simplify √48.", "\\sqrt{48}", "4√3", "√(16×3) = 4√3.", sd(4, 3)),
  q("y9c-ows-12", "Evaluate √6 × √24.", "\\sqrt6\\times\\sqrt{24}", "12", "√144 = 12.", []),
];
