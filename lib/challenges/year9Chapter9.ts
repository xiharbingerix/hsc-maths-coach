// Year 9 Wave 10 — Chapter 9 (Quadratic Expressions & Algebraic Techniques) D6 challenge pools
// (Level-6 tier, post-mastery; ADR-Y9-001). 12 markable questions per section. All 11 sections are
// path-tagged → registered course-scoped under base + advanced in lib/challenges/index.ts.

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — expand or factorise carefully.", explanation };
}
const q2 = (s: string) => [s, s.replace(/\^2/g, "²").replace(/\^3/g, "³"), s.replace(/\s+/g, "")];
const ff = (a: string, b: string) => [`${a}${b}`, `${b}${a}`, `${a}${b}`.replace(/\s+/g, ""), `${b}${a}`.replace(/\s+/g, "")];
const sp = (a: string) => [a, a.replace(/\s+/g, ""), a.replace(/\//g, " / ")];
const xv = (n: string) => [n, `x=${n}`, `x = ${n}`];

// expanding-binomial-products
export const ebpY9Challenge: PracticeQuestion[] = [
  q("y9c-ebp-1", "Expand (3x + 2)(2x − 5).", "(3x+2)(2x-5)", "6x^2-11x-10", "6x²−15x+4x−10.", q2("6x^2-11x-10")),
  q("y9c-ebp-2", "Expand (2x − 3)(3x + 4).", "(2x-3)(3x+4)", "6x^2-x-12", "6x²+8x−9x−12.", q2("6x^2-x-12")),
  q("y9c-ebp-3", "Expand (5x − 1)(x + 2).", "(5x-1)(x+2)", "5x^2+9x-2", "5x²+10x−x−2.", q2("5x^2+9x-2")),
  q("y9c-ebp-4", "Expand (2x + 5)(2x − 5).", "(2x+5)(2x-5)", "4x^2-25", "Difference of squares.", q2("4x^2-25")),
  q("y9c-ebp-5", "Expand (4x + 1)(2x + 3).", "(4x+1)(2x+3)", "8x^2+14x+3", "8x²+12x+2x+3.", q2("8x^2+14x+3")),
  q("y9c-ebp-6", "Expand (x − 7)(x − 1).", "(x-7)(x-1)", "x^2-8x+7", "x²−8x+7.", q2("x^2-8x+7")),
  q("y9c-ebp-7", "Expand and simplify (x + 2)(x + 3) + (x + 1)(x − 1).", "(x+2)(x+3)+(x+1)(x-1)", "2x^2+5x+5", "(x²+5x+6)+(x²−1).", q2("2x^2+5x+5")),
  q("y9c-ebp-8", "Expand (3x − 2)(3x + 2).", "(3x-2)(3x+2)", "9x^2-4", "9x²−4.", q2("9x^2-4")),
  q("y9c-ebp-9", "Expand (2x + 3)(x − 4).", "(2x+3)(x-4)", "2x^2-5x-12", "2x²−8x+3x−12.", q2("2x^2-5x-12")),
  q("y9c-ebp-10", "Expand (x + 5)(x + 6).", "(x+5)(x+6)", "x^2+11x+30", "x²+11x+30.", q2("x^2+11x+30")),
  q("y9c-ebp-11", "Expand (3x + 1)(3x − 1).", "(3x+1)(3x-1)", "9x^2-1", "9x²−1.", q2("9x^2-1")),
  q("y9c-ebp-12", "Expand (2x − 1)(2x − 3).", "(2x-1)(2x-3)", "4x^2-8x+3", "4x²−6x−2x+3.", q2("4x^2-8x+3")),
];

// perfect-squares-difference-of-squares
export const psdY9Challenge: PracticeQuestion[] = [
  q("y9c-psd-1", "Expand (2x + 3)².", "(2x+3)^2", "4x^2+12x+9", "4x²+12x+9.", q2("4x^2+12x+9")),
  q("y9c-psd-2", "Expand (3x − 2)².", "(3x-2)^2", "9x^2-12x+4", "9x²−12x+4.", q2("9x^2-12x+4")),
  q("y9c-psd-3", "Expand (4x + 1)(4x − 1).", "(4x+1)(4x-1)", "16x^2-1", "16x²−1.", q2("16x^2-1")),
  q("y9c-psd-4", "Expand (5x − 2)².", "(5x-2)^2", "25x^2-20x+4", "25x²−20x+4.", q2("25x^2-20x+4")),
  q("y9c-psd-5", "Expand (3x + 4)².", "(3x+4)^2", "9x^2+24x+16", "9x²+24x+16.", q2("9x^2+24x+16")),
  q("y9c-psd-6", "Expand (6x + 5)(6x − 5).", "(6x+5)(6x-5)", "36x^2-25", "36x²−25.", q2("36x^2-25")),
  q("y9c-psd-7", "Expand (x − 6)².", "(x-6)^2", "x^2-12x+36", "x²−12x+36.", q2("x^2-12x+36")),
  q("y9c-psd-8", "Expand and simplify (x + 3)² − (x − 3)².", "(x+3)^2-(x-3)^2", "12x", "Difference = 12x.", []),
  q("y9c-psd-9", "Expand (2x + 7)(2x − 7).", "(2x+7)(2x-7)", "4x^2-49", "4x²−49.", q2("4x^2-49")),
  q("y9c-psd-10", "Expand (5x + 1)².", "(5x+1)^2", "25x^2+10x+1", "25x²+10x+1.", q2("25x^2+10x+1")),
  q("y9c-psd-11", "Expand (x + 8)².", "(x+8)^2", "x^2+16x+64", "x²+16x+64.", q2("x^2+16x+64")),
  q("y9c-psd-12", "Expand (10x − 3)(10x + 3).", "(10x-3)(10x+3)", "100x^2-9", "100x²−9.", q2("100x^2-9")),
];

// factorising-algebraic-expressions
export const faeY9Challenge: PracticeQuestion[] = [
  q("y9c-fae-1", "Factorise 12x² − 18x.", "12x^2-18x", "6x(2x-3)", "HCF 6x.", ["6x(2x - 3)"]),
  q("y9c-fae-2", "Factorise 2x²y + 4xy.", "2x^2y+4xy", "2xy(x+2)", "HCF 2xy.", ["2xy(x + 2)"]),
  q("y9c-fae-3", "Factorise 9x² + 6x.", "9x^2+6x", "3x(3x+2)", "HCF 3x.", ["3x(3x + 2)"]),
  q("y9c-fae-4", "Factorise 8a² − 12a.", "8a^2-12a", "4a(2a-3)", "HCF 4a.", ["4a(2a - 3)"]),
  q("y9c-fae-5", "Factorise 6x³ + 9x².", "6x^3+9x^2", "3x^2(2x+3)", "HCF 3x².", ["3x²(2x+3)", "3x^2(2x + 3)"]),
  q("y9c-fae-6", "Factorise 14x²y − 7xy².", "14x^2y-7xy^2", "7xy(2x-y)", "HCF 7xy.", ["7xy(2x - y)"]),
  q("y9c-fae-7", "Factorise 15x + 25.", "15x+25", "5(3x+5)", "HCF 5.", ["5(3x + 5)"]),
  q("y9c-fae-8", "Factorise 3ab + 6a.", "3ab+6a", "3a(b+2)", "HCF 3a.", ["3a(b + 2)"]),
  q("y9c-fae-9", "Factorise 20x − 16.", "20x-16", "4(5x-4)", "HCF 4.", ["4(5x - 4)"]),
  q("y9c-fae-10", "Factorise 5x² + 10x.", "5x^2+10x", "5x(x+2)", "HCF 5x.", ["5x(x + 2)"]),
  q("y9c-fae-11", "Factorise 10a²b − 15ab².", "10a^2b-15ab^2", "5ab(2a-3b)", "HCF 5ab.", ["5ab(2a - 3b)"]),
  q("y9c-fae-12", "Factorise 4x³ − 8x.", "4x^3-8x", "4x(x^2-2)", "HCF 4x.", ["4x(x²-2)", "4x(x^2 - 2)"]),
];

// factorising-difference-of-squares
export const fdsY9Challenge: PracticeQuestion[] = [
  q("y9c-fds-1", "Factorise 9x² − 16.", "9x^2-16", "(3x+4)(3x-4)", "(3x+4)(3x−4).", ff("(3x+4)", "(3x-4)")),
  q("y9c-fds-2", "Factorise 2x² − 8 fully.", "2x^2-8", "2(x+2)(x-2)", "2(x²−4).", ["2(x-2)(x+2)"]),
  q("y9c-fds-3", "Factorise 25 − x².", "25-x^2", "(5+x)(5-x)", "(5+x)(5−x).", ff("(5+x)", "(5-x)")),
  q("y9c-fds-4", "Factorise 49x² − 4.", "49x^2-4", "(7x+2)(7x-2)", "(7x+2)(7x−2).", ff("(7x+2)", "(7x-2)")),
  q("y9c-fds-5", "Factorise 3x² − 27 fully.", "3x^2-27", "3(x+3)(x-3)", "3(x²−9).", ["3(x-3)(x+3)"]),
  q("y9c-fds-6", "Factorise 100x² − 1.", "100x^2-1", "(10x+1)(10x-1)", "(10x+1)(10x−1).", ff("(10x+1)", "(10x-1)")),
  q("y9c-fds-7", "Factorise x²y² − 9.", "x^2y^2-9", "(xy+3)(xy-3)", "(xy+3)(xy−3).", ff("(xy+3)", "(xy-3)")),
  q("y9c-fds-8", "Factorise 5x² − 20 fully.", "5x^2-20", "5(x+2)(x-2)", "5(x²−4).", ["5(x-2)(x+2)"]),
  q("y9c-fds-9", "Factorise 36 − 25x².", "36-25x^2", "(6+5x)(6-5x)", "(6+5x)(6−5x).", ff("(6+5x)", "(6-5x)")),
  q("y9c-fds-10", "Factorise 4x² − 81.", "4x^2-81", "(2x+9)(2x-9)", "(2x+9)(2x−9).", ff("(2x+9)", "(2x-9)")),
  q("y9c-fds-11", "Factorise 8x² − 2 fully.", "8x^2-2", "2(2x+1)(2x-1)", "2(4x²−1).", ["2(2x-1)(2x+1)"]),
  q("y9c-fds-12", "Factorise 16x² − 9.", "16x^2-9", "(4x+3)(4x-3)", "(4x+3)(4x−3).", ff("(4x+3)", "(4x-3)")),
];

// factorising-by-grouping
export const fbgY9Challenge: PracticeQuestion[] = [
  q("y9c-fbg-1", "Factorise 2x² + 6x + x + 3.", "2x^2+6x+x+3", "(2x+1)(x+3)", "2x(x+3)+1(x+3).", ff("(2x+1)", "(x+3)")),
  q("y9c-fbg-2", "Factorise 3xy + 9x + 2y + 6.", "3xy+9x+2y+6", "(3x+2)(y+3)", "3x(y+3)+2(y+3).", ff("(3x+2)", "(y+3)")),
  q("y9c-fbg-3", "Factorise x² − 3x + 4x − 12.", "x^2-3x+4x-12", "(x-3)(x+4)", "x(x−3)+4(x−3).", ff("(x-3)", "(x+4)")),
  q("y9c-fbg-4", "Factorise 6x² + 4x + 9x + 6.", "6x^2+4x+9x+6", "(2x+3)(3x+2)", "2x(3x+2)+3(3x+2).", ff("(2x+3)", "(3x+2)")),
  q("y9c-fbg-5", "Factorise ab − 2a + 5b − 10.", "ab-2a+5b-10", "(a+5)(b-2)", "a(b−2)+5(b−2).", ff("(a+5)", "(b-2)")),
  q("y9c-fbg-6", "Factorise x² + 2x − 5x − 10.", "x^2+2x-5x-10", "(x+2)(x-5)", "x(x+2)−5(x+2).", ff("(x+2)", "(x-5)")),
  q("y9c-fbg-7", "Factorise 4x² + 8x + 3x + 6.", "4x^2+8x+3x+6", "(4x+3)(x+2)", "4x(x+2)+3(x+2).", ff("(4x+3)", "(x+2)")),
  q("y9c-fbg-8", "Factorise 2pq + 6p + 5q + 15.", "2pq+6p+5q+15", "(2p+5)(q+3)", "2p(q+3)+5(q+3).", ff("(2p+5)", "(q+3)")),
  q("y9c-fbg-9", "Factorise x² − 4x + 3x − 12.", "x^2-4x+3x-12", "(x-4)(x+3)", "x(x−4)+3(x−4).", ff("(x-4)", "(x+3)")),
  q("y9c-fbg-10", "Factorise 10x² + 5x + 2x + 1.", "10x^2+5x+2x+1", "(5x+1)(2x+1)", "5x(2x+1)+1(2x+1).", ff("(5x+1)", "(2x+1)")),
  q("y9c-fbg-11", "Factorise x² + 7x + 2x + 14.", "x^2+7x+2x+14", "(x+7)(x+2)", "x(x+7)+2(x+7).", ff("(x+7)", "(x+2)")),
  q("y9c-fbg-12", "Factorise 6x² + 9x + 2x + 3.", "6x^2+9x+2x+3", "(3x+1)(2x+3)", "3x(2x+3)+1(2x+3).", ff("(3x+1)", "(2x+3)")),
];

// factorising-monic-trinomials
export const fmtY9Challenge: PracticeQuestion[] = [
  q("y9c-fmt-1", "Factorise x² − 7x + 12.", "x^2-7x+12", "(x-3)(x-4)", "−3, −4.", ff("(x-3)", "(x-4)")),
  q("y9c-fmt-2", "Factorise x² + 2x − 15.", "x^2+2x-15", "(x+5)(x-3)", "5, −3.", ff("(x+5)", "(x-3)")),
  q("y9c-fmt-3", "Factorise x² − 4x − 21.", "x^2-4x-21", "(x-7)(x+3)", "−7, 3.", ff("(x-7)", "(x+3)")),
  q("y9c-fmt-4", "Factorise x² + 10x + 21.", "x^2+10x+21", "(x+3)(x+7)", "3, 7.", ff("(x+3)", "(x+7)")),
  q("y9c-fmt-5", "Factorise x² − 11x + 24.", "x^2-11x+24", "(x-3)(x-8)", "−3, −8.", ff("(x-3)", "(x-8)")),
  q("y9c-fmt-6", "Factorise x² + 4x − 12.", "x^2+4x-12", "(x+6)(x-2)", "6, −2.", ff("(x+6)", "(x-2)")),
  q("y9c-fmt-7", "Factorise x² − 6x + 9.", "x^2-6x+9", "(x-3)(x-3)", "(x−3)².", ["(x-3)^2", "(x-3)²", "(x - 3)(x - 3)"]),
  q("y9c-fmt-8", "Factorise x² + 12x + 35.", "x^2+12x+35", "(x+5)(x+7)", "5, 7.", ff("(x+5)", "(x+7)")),
  q("y9c-fmt-9", "Factorise x² − x − 20.", "x^2-x-20", "(x-5)(x+4)", "−5, 4.", ff("(x-5)", "(x+4)")),
  q("y9c-fmt-10", "Factorise x² + 6x + 9.", "x^2+6x+9", "(x+3)(x+3)", "(x+3)².", ["(x+3)^2", "(x+3)²", "(x + 3)(x + 3)"]),
  q("y9c-fmt-11", "Factorise x² − 2x − 35.", "x^2-2x-35", "(x-7)(x+5)", "−7, 5.", ff("(x-7)", "(x+5)")),
  q("y9c-fmt-12", "Factorise x² + 13x + 40.", "x^2+13x+40", "(x+5)(x+8)", "5, 8.", ff("(x+5)", "(x+8)")),
];

// factorising-non-monic-trinomials
export const fntY9Challenge: PracticeQuestion[] = [
  q("y9c-fnt-1", "Factorise 6x² + 11x + 3.", "6x^2+11x+3", "(3x+1)(2x+3)", "ac=18; 9,2.", ff("(3x+1)", "(2x+3)")),
  q("y9c-fnt-2", "Factorise 2x² − x − 1.", "2x^2-x-1", "(2x+1)(x-1)", "ac=−2; −2,1.", ff("(2x+1)", "(x-1)")),
  q("y9c-fnt-3", "Factorise 3x² + 5x − 2.", "3x^2+5x-2", "(3x-1)(x+2)", "ac=−6; 6,−1.", ff("(3x-1)", "(x+2)")),
  q("y9c-fnt-4", "Factorise 4x² + 4x − 3.", "4x^2+4x-3", "(2x+3)(2x-1)", "ac=−12; 6,−2.", ff("(2x+3)", "(2x-1)")),
  q("y9c-fnt-5", "Factorise 6x² + 7x + 2.", "6x^2+7x+2", "(3x+2)(2x+1)", "ac=12; 4,3.", ff("(3x+2)", "(2x+1)")),
  q("y9c-fnt-6", "Factorise 2x² + 7x − 4.", "2x^2+7x-4", "(2x-1)(x+4)", "ac=−8; 8,−1.", ff("(2x-1)", "(x+4)")),
  q("y9c-fnt-7", "Factorise 3x² − 7x + 2.", "3x^2-7x+2", "(3x-1)(x-2)", "ac=6; −6,−1.", ff("(3x-1)", "(x-2)")),
  q("y9c-fnt-8", "Factorise 5x² + 13x + 6.", "5x^2+13x+6", "(5x+3)(x+2)", "ac=30; 10,3.", ff("(5x+3)", "(x+2)")),
  q("y9c-fnt-9", "Factorise 4x² + 12x + 9.", "4x^2+12x+9", "(2x+3)(2x+3)", "(2x+3)².", ["(2x+3)^2", "(2x+3)²", "(2x + 3)(2x + 3)"]),
  q("y9c-fnt-10", "Factorise 6x² − 5x + 1.", "6x^2-5x+1", "(3x-1)(2x-1)", "ac=6; −3,−2.", ff("(3x-1)", "(2x-1)")),
  q("y9c-fnt-11", "Factorise 2x² + 9x + 4.", "2x^2+9x+4", "(2x+1)(x+4)", "ac=8; 8,1.", ff("(2x+1)", "(x+4)")),
  q("y9c-fnt-12", "Factorise 8x² + 10x + 3.", "8x^2+10x+3", "(2x+1)(4x+3)", "ac=24; 6,4.", ff("(2x+1)", "(4x+3)")),
];

// simplifying-algebraic-fractions-multiply-divide
export const afmdY9Challenge: PracticeQuestion[] = [
  q("y9c-afmd-1", "Simplify (3x/4) × (8/9x).", "\\tfrac{3x}{4}\\times\\tfrac{8}{9x}", "2/3", "24x/36x = 2/3.", sp("2/3")),
  q("y9c-afmd-2", "Simplify (x²/3) ÷ (x/6).", "\\tfrac{x^2}{3}\\div\\tfrac{x}{6}", "2x", "6x²/3x = 2x.", []),
  q("y9c-afmd-3", "Simplify (2x/5) × (15/4x).", "\\tfrac{2x}{5}\\times\\tfrac{15}{4x}", "3/2", "30x/20x = 3/2.", sp("3/2")),
  q("y9c-afmd-4", "Simplify (6x/7) ÷ (3x/7).", "\\tfrac{6x}{7}\\div\\tfrac{3x}{7}", "2", "(6x/7)(7/3x) = 2.", []),
  q("y9c-afmd-5", "Simplify (4/x²) × (x/2).", "\\tfrac{4}{x^2}\\times\\tfrac{x}{2}", "2/x", "4x/2x² = 2/x.", sp("2/x")),
  q("y9c-afmd-6", "Simplify (x/2) × (x/3).", "\\tfrac{x}{2}\\times\\tfrac{x}{3}", "x^2/6", "x²/6.", ["x²/6", "x^2/6"]),
  q("y9c-afmd-7", "Simplify (9/2x) × (4x/3).", "\\tfrac{9}{2x}\\times\\tfrac{4x}{3}", "6", "36x/6x = 6.", []),
  q("y9c-afmd-8", "Simplify (x/4) ÷ (3/8).", "\\tfrac{x}{4}\\div\\tfrac{3}{8}", "2x/3", "(x/4)(8/3) = 2x/3.", sp("2x/3")),
  q("y9c-afmd-9", "Simplify (5x/6) × (12/25x).", "\\tfrac{5x}{6}\\times\\tfrac{12}{25x}", "2/5", "60x/150x = 2/5.", sp("2/5")),
  q("y9c-afmd-10", "Simplify (2x²/9) ÷ (x/3).", "\\tfrac{2x^2}{9}\\div\\tfrac{x}{3}", "2x/3", "6x²/9x = 2x/3.", sp("2x/3")),
  q("y9c-afmd-11", "Simplify (3x/8) × (4/9x).", "\\tfrac{3x}{8}\\times\\tfrac{4}{9x}", "1/6", "12x/72x = 1/6.", sp("1/6")),
  q("y9c-afmd-12", "Simplify (x²/2) ÷ (x/4).", "\\tfrac{x^2}{2}\\div\\tfrac{x}{4}", "2x", "4x²/2x = 2x.", []),
];

// simplifying-algebraic-fractions-add-subtract
export const afasY9Challenge: PracticeQuestion[] = [
  q("y9c-afas-1", "Simplify 2x/3 + 3x/4.", "\\tfrac{2x}{3}+\\tfrac{3x}{4}", "17x/12", "8x/12 + 9x/12.", sp("17x/12")),
  q("y9c-afas-2", "Simplify 5x/6 − x/4.", "\\tfrac{5x}{6}-\\tfrac{x}{4}", "7x/12", "10x/12 − 3x/12.", sp("7x/12")),
  q("y9c-afas-3", "Simplify x/2 + x/3 + x/6.", "\\tfrac{x}{2}+\\tfrac{x}{3}+\\tfrac{x}{6}", "x", "6x/6 = x.", []),
  q("y9c-afas-4", "Simplify 3x/4 − x/3.", "\\tfrac{3x}{4}-\\tfrac{x}{3}", "5x/12", "9x/12 − 4x/12.", sp("5x/12")),
  q("y9c-afas-5", "Simplify x/5 + 3x/10.", "\\tfrac{x}{5}+\\tfrac{3x}{10}", "x/2", "2x/10 + 3x/10 = 5x/10.", sp("x/2")),
  q("y9c-afas-6", "Simplify 7x/8 − x/2.", "\\tfrac{7x}{8}-\\tfrac{x}{2}", "3x/8", "7x/8 − 4x/8.", sp("3x/8")),
  q("y9c-afas-7", "Simplify x/3 + 2x/9.", "\\tfrac{x}{3}+\\tfrac{2x}{9}", "5x/9", "3x/9 + 2x/9.", sp("5x/9")),
  q("y9c-afas-8", "Simplify 5x/6 + 2x/3.", "\\tfrac{5x}{6}+\\tfrac{2x}{3}", "3x/2", "5x/6 + 4x/6 = 9x/6.", sp("3x/2")),
  q("y9c-afas-9", "Simplify 11x/12 − x/4.", "\\tfrac{11x}{12}-\\tfrac{x}{4}", "2x/3", "11x/12 − 3x/12 = 8x/12.", sp("2x/3")),
  q("y9c-afas-10", "Simplify x/2 − x/6.", "\\tfrac{x}{2}-\\tfrac{x}{6}", "x/3", "3x/6 − x/6 = 2x/6.", sp("x/3")),
  q("y9c-afas-11", "Simplify 2x/5 + x/2.", "\\tfrac{2x}{5}+\\tfrac{x}{2}", "9x/10", "4x/10 + 5x/10.", sp("9x/10")),
  q("y9c-afas-12", "Simplify 5x/8 − x/4.", "\\tfrac{5x}{8}-\\tfrac{x}{4}", "3x/8", "5x/8 − 2x/8.", sp("3x/8")),
];

// further-add-subtract-algebraic-fractions
export const fafsY9Challenge: PracticeQuestion[] = [
  q("y9c-fafs-1", "Simplify 1/x + 1/(3x).", "\\tfrac{1}{x}+\\tfrac{1}{3x}", "4/3x", "3/(3x) + 1/(3x) = 4/(3x).", sp("4/(3x)")),
  q("y9c-fafs-2", "Simplify 2/x − 1/(2x).", "\\tfrac{2}{x}-\\tfrac{1}{2x}", "3/2x", "4/(2x) − 1/(2x) = 3/(2x).", sp("3/(2x)")),
  q("y9c-fafs-3", "Simplify 1/(2x) + 1/(3x).", "\\tfrac{1}{2x}+\\tfrac{1}{3x}", "5/6x", "3/(6x) + 2/(6x) = 5/(6x).", sp("5/(6x)")),
  q("y9c-fafs-4", "Simplify 5/(2x) − 1/x.", "\\tfrac{5}{2x}-\\tfrac{1}{x}", "3/2x", "5/(2x) − 2/(2x) = 3/(2x).", sp("3/(2x)")),
  q("y9c-fafs-5", "Simplify 7/(3x) + 2/(3x).", "\\tfrac{7}{3x}+\\tfrac{2}{3x}", "3/x", "9/(3x) = 3/x.", sp("3/x")),
  q("y9c-fafs-6", "Simplify 9/(4x) − 1/(4x).", "\\tfrac{9}{4x}-\\tfrac{1}{4x}", "2/x", "8/(4x) = 2/x.", sp("2/x")),
  q("y9c-fafs-7", "Simplify 1/x + 2/(5x).", "\\tfrac{1}{x}+\\tfrac{2}{5x}", "7/5x", "5/(5x) + 2/(5x) = 7/(5x).", sp("7/(5x)")),
  q("y9c-fafs-8", "Simplify 3x/4 − x/8.", "\\tfrac{3x}{4}-\\tfrac{x}{8}", "5x/8", "6x/8 − x/8 = 5x/8.", sp("5x/8")),
  q("y9c-fafs-9", "Simplify 2/x + 3/x + 1/x.", "\\tfrac{2}{x}+\\tfrac{3}{x}+\\tfrac{1}{x}", "6/x", "6/x.", sp("6/x")),
  q("y9c-fafs-10", "Simplify 1/(2x) + 3/(2x).", "\\tfrac{1}{2x}+\\tfrac{3}{2x}", "2/x", "4/(2x) = 2/x.", sp("2/x")),
  q("y9c-fafs-11", "Simplify 4/(3x) − 1/(3x).", "\\tfrac{4}{3x}-\\tfrac{1}{3x}", "1/x", "3/(3x) = 1/x.", sp("1/x")),
  q("y9c-fafs-12", "Simplify 5/x − 2/x.", "\\tfrac{5}{x}-\\tfrac{2}{x}", "3/x", "3/x.", sp("3/x")),
];

// equations-with-algebraic-fractions
export const eafY9Challenge: PracticeQuestion[] = [
  q("y9c-eaf-1", "Solve x/2 + x/4 = 9.", "\\tfrac{x}{2}+\\tfrac{x}{4}=9", "12", "×4: 3x = 36 → x = 12.", xv("12")),
  q("y9c-eaf-2", "Solve (2x + 1)/3 = 5.", "\\tfrac{2x+1}{3}=5", "7", "2x + 1 = 15 → x = 7.", xv("7")),
  q("y9c-eaf-3", "Solve x/3 + x/6 = 3.", "\\tfrac{x}{3}+\\tfrac{x}{6}=3", "6", "×6: 3x = 18 → x = 6.", xv("6")),
  q("y9c-eaf-4", "Solve (x + 4)/2 = x − 1.", "\\tfrac{x+4}{2}=x-1", "6", "x + 4 = 2x − 2 → x = 6.", xv("6")),
  q("y9c-eaf-5", "Solve 2x/3 − x/6 = 2.", "\\tfrac{2x}{3}-\\tfrac{x}{6}=2", "4", "×6: 3x = 12 → x = 4.", xv("4")),
  q("y9c-eaf-6", "Solve (x − 2)/5 = 3.", "\\tfrac{x-2}{5}=3", "17", "x − 2 = 15 → x = 17.", xv("17")),
  q("y9c-eaf-7", "Solve x/2 + x/5 = 7.", "\\tfrac{x}{2}+\\tfrac{x}{5}=7", "10", "×10: 7x = 70 → x = 10.", xv("10")),
  q("y9c-eaf-8", "Solve (3x − 1)/4 = 5.", "\\tfrac{3x-1}{4}=5", "7", "3x − 1 = 20 → x = 7.", xv("7")),
  q("y9c-eaf-9", "Solve x/4 + 2 = x/2.", "\\tfrac{x}{4}+2=\\tfrac{x}{2}", "8", "×4: x + 8 = 2x → x = 8.", xv("8")),
  q("y9c-eaf-10", "Solve (x + 6)/3 = (x − 2)/2.", "\\tfrac{x+6}{3}=\\tfrac{x-2}{2}", "18", "2(x+6) = 3(x−2) → x = 18.", xv("18")),
  q("y9c-eaf-11", "Solve x/3 + x/2 = 5.", "\\tfrac{x}{3}+\\tfrac{x}{2}=5", "6", "×6: 5x = 30 → x = 6.", xv("6")),
  q("y9c-eaf-12", "Solve (x + 2)/4 = 3.", "\\tfrac{x+2}{4}=3", "10", "x + 2 = 12 → x = 10.", xv("10")),
];
