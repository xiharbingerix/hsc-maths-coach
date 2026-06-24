// Year 9 Wave 3 — Chapter 2 (Expressions, Equations & Inequalities) D6 challenge pools (Level-6 tier,
// post-mastery; ADR-Y9-001). 12 markable questions per section. Registered course-scoped in
// lib/challenges/index.ts (core under all 3 courses; consolidating under Core; path under base+advanced).

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — combine several steps.", explanation };
}
const xv = (n: string) => [n, `x=${n}`, `x = ${n}`];
const iq = (a: string) => [a, a.replace(/\s+/g, ""), a.replace(/([<>]=?)/, " $1 ").replace(/\s+/g, " ").trim()];

// algebraic-expressions (consol)
export const algebraicExpressionsY9Challenge: PracticeQuestion[] = [
  q("y9c-aex-1", "Evaluate 3x² − 2x + 1 when x = −2.", "3x^2-2x+1,\\ x=-2", "17", "3(4) − 2(−2) + 1 = 12 + 4 + 1 = 17.", []),
  q("y9c-aex-2", "Evaluate (a + b)² when a = 2, b = 3.", "(a+b)^2", "25", "(5)² = 25.", []),
  q("y9c-aex-3", "Evaluate 2x³ when x = −2.", "2x^3,\\ x=-2", "-16", "2(−8) = −16.", ["−16"]),
  q("y9c-aex-4", "Evaluate (x² − y²)/(x − y) when x = 5, y = 2.", "\\tfrac{x^2-y^2}{x-y}", "7", "(25 − 4)/3 = 21/3 = 7.", []),
  q("y9c-aex-5", "Evaluate −b/(2a) when a = 2, b = −12.", "\\tfrac{-b}{2a}", "3", "−(−12)/4 = 12/4 = 3.", []),
  q("y9c-aex-6", "Evaluate a² − 2ab + b² when a = 5, b = 3.", "a^2-2ab+b^2", "4", "25 − 30 + 9 = 4.", []),
  q("y9c-aex-7", "Evaluate 3(x − 1)² − 4 when x = 3.", "3(x-1)^2-4", "8", "3(4) − 4 = 8.", []),
  q("y9c-aex-8", "Evaluate (2x + 3)/(x − 1) when x = 2.", "\\tfrac{2x+3}{x-1}", "7", "7/1 = 7.", []),
  q("y9c-aex-9", "Evaluate x² + 1/x when x = 2.", "x^2+\\tfrac1x", "4.5", "4 + 0.5 = 4.5.", ["9/2"]),
  q("y9c-aex-10", "Evaluate √(x² + y²) when x = 6, y = 8.", "\\sqrt{x^2+y^2}", "10", "√(36 + 64) = √100 = 10.", []),
  q("y9c-aex-11", "Evaluate 5 − 2(x − 3)² when x = 4.", "5-2(x-3)^2", "3", "5 − 2(1) = 3.", []),
  q("y9c-aex-12", "Evaluate the absolute value |2x − 7| when x = 1.", "|2x-7|", "5", "|−5| = 5.", []),
];

// simplifying-algebraic-expressions (consol)
export const simplifyingY9Challenge: PracticeQuestion[] = [
  q("y9c-sim-1", "Simplify 3(2x − 1) − 2(x − 4).", "3(2x-1)-2(x-4)", "4x+5", "6x − 3 − 2x + 8 = 4x + 5.", ["5+4x"]),
  q("y9c-sim-2", "Simplify 4a²b ÷ 2ab.", "4a^2b\\div2ab", "2a", "4/2 = 2, a²/a = a, b cancels → 2a.", []),
  q("y9c-sim-3", "Simplify 2x(3x − 1) − x(x + 4).", "2x(3x-1)-x(x+4)", "5x^2-6x", "6x² − 2x − x² − 4x = 5x² − 6x.", ["5x²-6x"]),
  q("y9c-sim-4", "Simplify 6x²y ÷ 3xy.", "6x^2y\\div3xy", "2x", "6/3 = 2, x²/x = x, y cancels → 2x.", []),
  q("y9c-sim-5", "Simplify 5(a − 2) − 3(2a − 1).", "5(a-2)-3(2a-1)", "-a-7", "5a − 10 − 6a + 3 = −a − 7.", ["−a−7", "-7-a"]),
  q("y9c-sim-6", "Simplify 3x × 2x × x.", "3x\\times2x\\times x", "6x^3", "6 × x³ = 6x³.", ["6x³"]),
  q("y9c-sim-7", "Simplify 2(x² + 3x) − (x² − x).", "2(x^2+3x)-(x^2-x)", "x^2+7x", "2x² + 6x − x² + x = x² + 7x.", ["x²+7x"]),
  q("y9c-sim-8", "Simplify 12a³b² ÷ 4a²b.", "12a^3b^2\\div4a^2b", "3ab", "12/4 = 3, a³/a² = a, b²/b = b → 3ab.", []),
  q("y9c-sim-9", "Simplify 4(2a + b) − 2(3a − 2b).", "4(2a+b)-2(3a-2b)", "2a+8b", "8a + 4b − 6a + 4b = 2a + 8b.", ["8b+2a"]),
  q("y9c-sim-10", "Simplify (x + x + x)².", "(x+x+x)^2", "9x^2", "(3x)² = 9x².", ["9x²"]),
  q("y9c-sim-11", "Simplify 7x − 3(x − 2) + 4.", "7x-3(x-2)+4", "4x+10", "7x − 3x + 6 + 4 = 4x + 10.", ["10+4x"]),
  q("y9c-sim-12", "Simplify 10x²y³ ÷ 5xy.", "10x^2y^3\\div5xy", "2xy^2", "10/5 = 2, x²/x = x, y³/y = y² → 2xy².", ["2xy²"]),
];

// expanding-algebraic-expressions (core)
export const expandingY9Challenge: PracticeQuestion[] = [
  q("y9c-exp-1", "Expand and simplify (x + 3)(x − 2).", "(x+3)(x-2)", "x^2+x-6", "x² − 2x + 3x − 6 = x² + x − 6.", ["x²+x-6"]),
  q("y9c-exp-2", "Expand and simplify (2x − 1)(x + 4).", "(2x-1)(x+4)", "2x^2+7x-4", "2x² + 8x − x − 4 = 2x² + 7x − 4.", ["2x²+7x-4"]),
  q("y9c-exp-3", "Expand and simplify (x + 5)².", "(x+5)^2", "x^2+10x+25", "x² + 10x + 25.", ["x²+10x+25"]),
  q("y9c-exp-4", "Expand and simplify (3x − 2)(2x + 1).", "(3x-2)(2x+1)", "6x^2-x-2", "6x² + 3x − 4x − 2 = 6x² − x − 2.", ["6x²-x-2"]),
  q("y9c-exp-5", "Expand and simplify (x − 4)².", "(x-4)^2", "x^2-8x+16", "x² − 8x + 16.", ["x²-8x+16"]),
  q("y9c-exp-6", "Expand and simplify (2x + 3)(2x − 3).", "(2x+3)(2x-3)", "4x^2-9", "Difference of squares: 4x² − 9.", ["4x²-9"]),
  q("y9c-exp-7", "Expand and simplify (x + 1)(x + 2) + (x + 3).", "(x+1)(x+2)+(x+3)", "x^2+4x+5", "x² + 3x + 2 + x + 3 = x² + 4x + 5.", ["x²+4x+5"]),
  q("y9c-exp-8", "Expand and simplify 2(x + 3)(x − 1).", "2(x+3)(x-1)", "2x^2+4x-6", "2(x² + 2x − 3) = 2x² + 4x − 6.", ["2x²+4x-6"]),
  q("y9c-exp-9", "Expand and simplify (x + 4)(x − 4) − x².", "(x+4)(x-4)-x^2", "-16", "x² − 16 − x² = −16.", ["−16"]),
  q("y9c-exp-10", "Expand and simplify (2x + 1)².", "(2x+1)^2", "4x^2+4x+1", "4x² + 4x + 1.", ["4x²+4x+1"]),
  q("y9c-exp-11", "Expand and simplify (x − 3)(x + 5).", "(x-3)(x+5)", "x^2+2x-15", "x² + 5x − 3x − 15 = x² + 2x − 15.", ["x²+2x-15"]),
  q("y9c-exp-12", "Expand and simplify (3x + 2)(x − 5).", "(3x+2)(x-5)", "3x^2-13x-10", "3x² − 15x + 2x − 10 = 3x² − 13x − 10.", ["3x²-13x-10"]),
];

// using-formulas (core)
export const usingFormulasY9Challenge: PracticeQuestion[] = [
  q("y9c-frm-1", "v = u + at. Find u when v = 30, a = 4, t = 5.", "v=u+at", "10", "30 = u + 20 → u = 10.", []),
  q("y9c-frm-2", "A = ½bh. Find b when A = 30, h = 5.", "A=\\tfrac12bh", "12", "30 = 2.5b → b = 12.", []),
  q("y9c-frm-3", "C = 2πr (π ≈ 3.14). Find r when C = 15.7.", "C=2\\pi r", "2.5", "15.7 = 6.28r → r = 2.5.", []),
  q("y9c-frm-4", "v² = u² + 2as. Find v when u = 0, a = 4, s = 8.", "v^2=u^2+2as", "8", "v² = 0 + 64 = 64 → v = 8.", []),
  q("y9c-frm-5", "A = πr² (π ≈ 3.14). Find r when A = 78.5.", "A=\\pi r^2", "5", "r² = 78.5/3.14 = 25 → r = 5.", []),
  q("y9c-frm-6", "P = 2(l + w). Find l when P = 40, w = 8.", "P=2(l+w)", "12", "20 = l + 8 → l = 12.", []),
  q("y9c-frm-7", "A = ½(a + b)h. Find h when A = 24, a = 3, b = 5.", "A=\\tfrac12(a+b)h", "6", "24 = 4h → h = 6.", []),
  q("y9c-frm-8", "F = ma. Find a when F = 60, m = 12.", "F=ma", "5", "60 = 12a → a = 5.", []),
  q("y9c-frm-9", "d = st. Find t when d = 150, s = 50.", "d=st", "3", "150 = 50t → t = 3.", []),
  q("y9c-frm-10", "V = πr²h (π ≈ 3.14). Find h when V = 314, r = 5.", "V=\\pi r^2h", "4", "314 = 78.5h → h = 4.", []),
  q("y9c-frm-11", "y = mx + c. Find m when y = 11, x = 2, c = 3.", "y=mx+c", "4", "11 = 2m + 3 → m = 4.", []),
  q("y9c-frm-12", "E = ½mv². Find E when m = 4, v = 3.", "E=\\tfrac12mv^2", "18", "½ × 4 × 9 = 18.", []),
];

// linear-equations-one-side (core)
export const linearOneSideY9Challenge: PracticeQuestion[] = [
  q("y9c-leo-1", "Solve (3x − 2)/4 = 4.", "\\tfrac{3x-2}{4}=4", "6", "3x − 2 = 16 → 3x = 18 → x = 6.", xv("6")),
  q("y9c-leo-2", "Solve 2(x + 5)/3 = 6.", "\\tfrac{2(x+5)}{3}=6", "4", "2(x + 5) = 18 → x + 5 = 9 → x = 4.", xv("4")),
  q("y9c-leo-3", "Solve 5 − 3x = 14.", "5-3x=14", "-3", "−3x = 9 → x = −3.", ["x=-3", "−3"]),
  q("y9c-leo-4", "Solve x/2 + x/4 = 6.", "\\tfrac{x}{2}+\\tfrac{x}{4}=6", "8", "3x/4 = 6 → x = 8.", xv("8")),
  q("y9c-leo-5", "Solve 7(x − 1) = 28.", "7(x-1)=28", "5", "x − 1 = 4 → x = 5.", xv("5")),
  q("y9c-leo-6", "Solve (x + 1)/2 + 3 = 7.", "\\tfrac{x+1}{2}+3=7", "7", "(x + 1)/2 = 4 → x + 1 = 8 → x = 7.", xv("7")),
  q("y9c-leo-7", "Solve 4x/5 = 12.", "\\tfrac{4x}{5}=12", "15", "4x = 60 → x = 15.", xv("15")),
  q("y9c-leo-8", "Solve 2.5x = 10.", "2.5x=10", "4", "x = 4.", xv("4")),
  q("y9c-leo-9", "Solve 3(2x + 1) = 21.", "3(2x+1)=21", "3", "2x + 1 = 7 → x = 3.", xv("3")),
  q("y9c-leo-10", "Solve −2x + 9 = 3.", "-2x+9=3", "3", "−2x = −6 → x = 3.", xv("3")),
  q("y9c-leo-11", "Solve (x − 3)/5 = 2.", "\\tfrac{x-3}{5}=2", "13", "x − 3 = 10 → x = 13.", xv("13")),
  q("y9c-leo-12", "Solve 6 − x/3 = 2.", "6-\\tfrac{x}{3}=2", "12", "−x/3 = −4 → x = 12.", xv("12")),
];

// linear-equations-both-sides (core)
export const linearBothSidesY9Challenge: PracticeQuestion[] = [
  q("y9c-leb-1", "Solve 3(x + 2) = 2(x + 5).", "3(x+2)=2(x+5)", "4", "3x + 6 = 2x + 10 → x = 4.", xv("4")),
  q("y9c-leb-2", "Solve 4(x − 1) = 2(x + 3).", "4(x-1)=2(x+3)", "5", "4x − 4 = 2x + 6 → 2x = 10 → x = 5.", xv("5")),
  q("y9c-leb-3", "Solve 5x − 2 = 3(x + 2).", "5x-2=3(x+2)", "4", "5x − 2 = 3x + 6 → 2x = 8 → x = 4.", xv("4")),
  q("y9c-leb-4", "Solve 2(3x − 1) = 4x + 8.", "2(3x-1)=4x+8", "5", "6x − 2 = 4x + 8 → 2x = 10 → x = 5.", xv("5")),
  q("y9c-leb-5", "Solve x/2 + 3 = x − 1.", "\\tfrac{x}{2}+3=x-1", "8", "4 = x/2 → x = 8.", xv("8")),
  q("y9c-leb-6", "Solve 7x − 5 = 4(x + 1).", "7x-5=4(x+1)", "3", "7x − 5 = 4x + 4 → 3x = 9 → x = 3.", xv("3")),
  q("y9c-leb-7", "Solve 3(2x − 1) = 5x + 1.", "3(2x-1)=5x+1", "4", "6x − 3 = 5x + 1 → x = 4.", xv("4")),
  q("y9c-leb-8", "Solve 2(x + 4) = 3(x − 1).", "2(x+4)=3(x-1)", "11", "2x + 8 = 3x − 3 → x = 11.", xv("11")),
  q("y9c-leb-9", "Solve 4x + 1 = 2(x + 5) − 3.", "4x+1=2(x+5)-3", "3", "4x + 1 = 2x + 7 → 2x = 6 → x = 3.", xv("3")),
  q("y9c-leb-10", "Solve 5(x − 2) = 2x + 5.", "5(x-2)=2x+5", "5", "5x − 10 = 2x + 5 → 3x = 15 → x = 5.", xv("5")),
  q("y9c-leb-11", "Solve 6(x − 1) = 2(2x + 1).", "6(x-1)=2(2x+1)", "4", "6x − 6 = 4x + 2 → 2x = 8 → x = 4.", xv("4")),
  q("y9c-leb-12", "Solve 3x + 7 = 5x − 3.", "3x+7=5x-3", "5", "10 = 2x → x = 5.", xv("5")),
];

// solving-word-problems (core)
export const wordProblemsY9Challenge: PracticeQuestion[] = [
  q("y9c-wp-1", "Three consecutive odd numbers sum to 27. Find the smallest.", "n+(n+2)+(n+4)=27", "7", "3n + 6 = 27 → n = 7.", []),
  q("y9c-wp-2", "Three times a number plus 4 equals five times the number minus 6. Find the number.", "3x+4=5x-6", "5", "10 = 2x → x = 5.", []),
  q("y9c-wp-3", "A rectangle's length is 3 times its width; the perimeter is 32. Find the width.", "2(3w+w)=32", "4", "8w = 32 → w = 4.", []),
  q("y9c-wp-4", "Two consecutive integers sum to 45. Find the larger.", "n+(n+1)=45", "23", "2n + 1 = 45 → n = 22, larger = 23.", []),
  q("y9c-wp-5", "A number increased by 50% gives 18. Find the number.", "1.5x=18", "12", "x = 18 ÷ 1.5 = 12.", []),
  q("y9c-wp-6", "A triangle's angles are x, 2x and 3x. Find the largest angle.", "x+2x+3x=180", "90", "6x = 180 → x = 30; largest = 3x = 90.", ["90°"]),
  q("y9c-wp-7", "A pen costs $2 more than a pencil. Two pens and a pencil cost $13. Find the pencil's price.", "2(p+2)+p=13", "3", "3p + 4 = 13 → p = 3.", ["$3"]),
  q("y9c-wp-8", "A number divided by 4, then increased by 5, gives 8. Find the number.", "\\tfrac{x}{4}+5=8", "12", "x/4 = 3 → x = 12.", []),
  q("y9c-wp-9", "An equilateral triangle has side length 2x + 1 and perimeter 21. Find x.", "3(2x+1)=21", "3", "2x + 1 = 7 → x = 3.", []),
  q("y9c-wp-10", "$50 is shared between two people so one gets $10 more. Find the smaller share.", "x+(x+10)=50", "20", "2x + 10 = 50 → x = 20.", ["$20"]),
  q("y9c-wp-11", "The sum of a number and its double is 36. Find the number.", "x+2x=36", "12", "3x = 36 → x = 12.", []),
  q("y9c-wp-12", "Two consecutive even numbers sum to 38. Find the smaller.", "n+(n+2)=38", "18", "2n + 2 = 38 → n = 18.", []),
];

// linear-inequalities (path)
export const inequalitiesY9Challenge: PracticeQuestion[] = [
  q("y9c-li-1", "Solve 3(x − 2) > x + 4.", "3(x-2)>x+4", "x > 5", "3x − 6 > x + 4 → 2x > 10 → x > 5.", iq("x>5")),
  q("y9c-li-2", "Solve 5 − 2x ≤ 11.", "5-2x\\le11", "x ≥ -3", "−2x ≤ 6 → x ≥ −3 (reverse).", ["x>=-3", "x ≥ −3"]),
  q("y9c-li-3", "Solve (x + 3)/2 < 5.", "\\tfrac{x+3}{2}<5", "x < 7", "x + 3 < 10 → x < 7.", iq("x<7")),
  q("y9c-li-4", "Solve 4x − 7 ≥ 2x + 3.", "4x-7\\ge2x+3", "x ≥ 5", "2x ≥ 10 → x ≥ 5.", ["x>=5", "x≥5"]),
  q("y9c-li-5", "Solve −3(x − 1) > 6.", "-3(x-1)>6", "x < -1", "−3x + 3 > 6 → −3x > 3 → x < −1 (reverse).", ["x<-1", "x < −1"]),
  q("y9c-li-6", "Solve 2(x + 1) ≤ 3x − 4.", "2(x+1)\\le3x-4", "x ≥ 6", "2x + 2 ≤ 3x − 4 → 6 ≤ x → x ≥ 6.", ["x>=6", "x≥6"]),
  q("y9c-li-7", "Solve 7 − x/2 > 3.", "7-\\tfrac{x}{2}>3", "x < 8", "−x/2 > −4 → x < 8 (reverse).", iq("x<8")),
  q("y9c-li-8", "Solve 5x + 2 < 3x + 12.", "5x+2<3x+12", "x < 5", "2x < 10 → x < 5.", iq("x<5")),
  q("y9c-li-9", "Solve −4x ≥ −20.", "-4x\\ge-20", "x ≤ 5", "÷(−4), reverse: x ≤ 5.", ["x<=5", "x≤5"]),
  q("y9c-li-10", "Solve (2x − 1)/3 ≥ 1.", "\\tfrac{2x-1}{3}\\ge1", "x ≥ 2", "2x − 1 ≥ 3 → 2x ≥ 4 → x ≥ 2.", ["x>=2", "x≥2"]),
  q("y9c-li-11", "Solve 10 − 3x < 1.", "10-3x<1", "x > 3", "−3x < −9 → x > 3 (reverse).", iq("x>3")),
  q("y9c-li-12", "Solve 6(x − 2) ≤ 4x.", "6(x-2)\\le4x", "x ≤ 6", "6x − 12 ≤ 4x → 2x ≤ 12 → x ≤ 6.", ["x<=6", "x≤6"]),
];

// simultaneous-substitution (path)
export const substitutionY9Challenge: PracticeQuestion[] = [
  q("y9c-ss-1", "y = 2x − 3 and 4x − y = 11. Find x.", "y=2x-3,\\ 4x-y=11", "4", "4x − (2x − 3) = 11 → 2x + 3 = 11 → x = 4.", xv("4")),
  q("y9c-ss-2", "x = 2y + 1 and 3x + y = 17. Find y.", "x=2y+1,\\ 3x+y=17", "2", "3(2y + 1) + y = 17 → 7y + 3 = 17 → y = 2.", ["y=2"]),
  q("y9c-ss-3", "y = 3x + 2 and x + 2y = 18. Find x.", "y=3x+2,\\ x+2y=18", "2", "x + 2(3x + 2) = 18 → 7x + 4 = 18 → x = 2.", xv("2")),
  q("y9c-ss-4", "y = 5 − 2x and 3x − y = 5. Find x.", "y=5-2x,\\ 3x-y=5", "2", "3x − (5 − 2x) = 5 → 5x − 5 = 5 → x = 2.", xv("2")),
  q("y9c-ss-5", "x = 4 − y and 2x + 3y = 13. Find y.", "x=4-y,\\ 2x+3y=13", "5", "2(4 − y) + 3y = 13 → 8 + y = 13 → y = 5.", ["y=5"]),
  q("y9c-ss-6", "y = 2x and 5x − 2y = 3. Find x.", "y=2x,\\ 5x-2y=3", "3", "5x − 4x = 3 → x = 3.", xv("3")),
  q("y9c-ss-7", "y = x − 4 and 3x + 2y = 2. Find x.", "y=x-4,\\ 3x+2y=2", "2", "3x + 2(x − 4) = 2 → 5x − 8 = 2 → x = 2.", xv("2")),
  q("y9c-ss-8", "x = 3y and 2x − y = 10. Find y.", "x=3y,\\ 2x-y=10", "2", "6y − y = 10 → 5y = 10 → y = 2.", ["y=2"]),
  q("y9c-ss-9", "y = 2x + 4 and x + y = 10. Find x.", "y=2x+4,\\ x+y=10", "2", "x + 2x + 4 = 10 → 3x = 6 → x = 2.", xv("2")),
  q("y9c-ss-10", "y = 7 − x and 2x + y = 11. Find x.", "y=7-x,\\ 2x+y=11", "4", "2x + 7 − x = 11 → x = 4.", xv("4")),
  q("y9c-ss-11", "x = 2y − 1 and x + 3y = 14. Find y.", "x=2y-1,\\ x+3y=14", "3", "2y − 1 + 3y = 14 → 5y = 15 → y = 3.", ["y=3"]),
  q("y9c-ss-12", "y = 4 − x and 3x + 2y = 11. Find x.", "y=4-x,\\ 3x+2y=11", "3", "3x + 2(4 − x) = 11 → x + 8 = 11 → x = 3.", xv("3")),
];

// simultaneous-elimination (path)
export const eliminationY9Challenge: PracticeQuestion[] = [
  q("y9c-se-1", "2x + 3y = 12 and x + y = 5. Find x.", "2x+3y=12,\\ x+y=5", "3", "×2 the second: 2x + 2y = 10; subtract → y = 2, x = 3.", xv("3")),
  q("y9c-se-2", "3x + 2y = 16 and x − y = 2. Find x.", "3x+2y=16,\\ x-y=2", "4", "×2 the second: 2x − 2y = 4; add → 5x = 20 → x = 4.", xv("4")),
  q("y9c-se-3", "2x + 5y = 16 and 2x + y = 8. Find y.", "2x+5y=16,\\ 2x+y=8", "2", "Subtract: 4y = 8 → y = 2.", ["y=2"]),
  q("y9c-se-4", "4x + 3y = 18 and 2x − y = 4. Find y.", "4x+3y=18,\\ 2x-y=4", "2", "×2 the second: 4x − 2y = 8; subtract → 5y = 10 → y = 2.", ["y=2"]),
  q("y9c-se-5", "3x − 2y = 5 and x + 2y = 7. Find x.", "3x-2y=5,\\ x+2y=7", "3", "Add: 4x = 12 → x = 3.", xv("3")),
  q("y9c-se-6", "5x + 2y = 24 and 3x + 2y = 16. Find x.", "5x+2y=24,\\ 3x+2y=16", "4", "Subtract: 2x = 8 → x = 4.", xv("4")),
  q("y9c-se-7", "2x + 3y = 12 and 4x − 3y = 6. Find x.", "2x+3y=12,\\ 4x-3y=6", "3", "Add: 6x = 18 → x = 3.", xv("3")),
  q("y9c-se-8", "3x + 4y = 18 and 3x + y = 9. Find y.", "3x+4y=18,\\ 3x+y=9", "3", "Subtract: 3y = 9 → y = 3.", ["y=3"]),
  q("y9c-se-9", "x + 2y = 8 and 3x − 2y = 8. Find x.", "x+2y=8,\\ 3x-2y=8", "4", "Add: 4x = 16 → x = 4.", xv("4")),
  q("y9c-se-10", "5x − 3y = 9 and 2x + 3y = 12. Find x.", "5x-3y=9,\\ 2x+3y=12", "3", "Add: 7x = 21 → x = 3.", xv("3")),
  q("y9c-se-11", "4x + y = 14 and 3x + y = 11. Find x.", "4x+y=14,\\ 3x+y=11", "3", "Subtract: x = 3.", xv("3")),
  q("y9c-se-12", "2x + 7y = 23 and 2x + 3y = 11. Find x.", "2x+7y=23,\\ 2x+3y=11", "1", "Subtract: 4y = 12 → y = 3; 2x + 9 = 11 → x = 1.", xv("1")),
];

// simultaneous-equations-problems (path)
export const simProblemsY9Challenge: PracticeQuestion[] = [
  q("y9c-sp-1", "Two numbers have sum 50 and difference 12. Find the larger.", "x+y=50,\\ x-y=12", "31", "2x = 62 → x = 31.", []),
  q("y9c-sp-2", "An adult is twice a child's age; together they are 18. Find the adult's age.", "a=2c,\\ a+c=18", "12", "3c = 18 → c = 6, a = 12.", []),
  q("y9c-sp-3", "Two numbers: the second is twice the first, and they sum to 24. Find the larger.", "y=2x,\\ x+y=24", "16", "3x = 24 → x = 8, y = 16.", []),
  q("y9c-sp-4", "A purse has $2 and $1 coins: 8 coins worth $13. Find the number of $2 coins.", "x+y=8,\\ 2x+y=13", "5", "Subtract: x = 5.", []),
  q("y9c-sp-5", "A rectangle's length is 5 more than its width; the perimeter is 30. Find the area.", "2(w+(w+5))=30", "50", "4w + 10 = 30 → w = 5, l = 10, area = 50.", ["50 cm²"]),
  q("y9c-sp-6", "Two numbers sum to 40; one is 4 times the other. Find the larger.", "x=4y,\\ x+y=40", "32", "5y = 40 → y = 8, x = 32.", []),
  q("y9c-sp-7", "5 pens and 2 books cost $16; 3 pens and 2 books cost $12. Find the price of a pen.", "5p+2b=16,\\ 3p+2b=12", "2", "Subtract: 2p = 4 → p = 2.", ["$2"]),
  q("y9c-sp-8", "Adult and child tickets sum to $15; an adult is $5 more than a child. Find the child's price.", "a+c=15,\\ a=c+5", "5", "2c + 5 = 15 → c = 5.", ["$5"]),
  q("y9c-sp-9", "Two complementary angles (sum 90°) differ by 30°. Find the smaller angle.", "x+y=90,\\ y=x+30", "30", "2x + 30 = 90 → x = 30.", ["30°"]),
  q("y9c-sp-10", "Two numbers sum to 100; one is 4 more than 3 times the other. Find the smaller.", "x+y=100,\\ y=3x+4", "24", "x + 3x + 4 = 100 → 4x = 96 → x = 24.", []),
  q("y9c-sp-11", "A farm has chickens and cows: 10 heads and 28 legs. Find the number of cows.", "c+w=10,\\ 2c+4w=28", "4", "c + 2w = 14; subtract c + w = 10 → w = 4.", []),
  q("y9c-sp-12", "Two numbers have sum 21 and difference 7. Find their product.", "x+y=21,\\ x-y=7", "98", "x = 14, y = 7 → 14 × 7 = 98.", []),
];

// quadratic-equations-ax2-c (path)
export const quadraticAx2cY9Challenge: PracticeQuestion[] = [
  q("y9c-q-1", "Solve 2x² = 72. Give the positive solution.", "2x^2=72", "6", "x² = 36 → x = 6.", []),
  q("y9c-q-2", "Solve x² − 16 = 0. Give the positive solution.", "x^2-16=0", "4", "x² = 16 → x = 4.", []),
  q("y9c-q-3", "Solve 3x² = 48. Give the positive solution.", "3x^2=48", "4", "x² = 16 → x = 4.", []),
  q("y9c-q-4", "Solve x²/3 = 12. Give the positive solution.", "\\tfrac{x^2}{3}=12", "6", "x² = 36 → x = 6.", []),
  q("y9c-q-5", "Solve x² − 0.49 = 0. Give the positive solution.", "x^2-0.49=0", "0.7", "x² = 0.49 → x = 0.7.", []),
  q("y9c-q-6", "Solve 5x² = 80. Give the positive solution.", "5x^2=80", "4", "x² = 16 → x = 4.", []),
  q("y9c-q-7", "Solve 2x² − 18 = 0. Give both solutions.", "2x^2-18=0", "±3", "x² = 9 → x = ±3.", ["3,-3", "x=±3", "3 and -3"]),
  q("y9c-q-8", "Solve x² = 169. Give the positive solution.", "x^2=169", "13", "√169 = 13.", []),
  q("y9c-q-9", "Solve 4x² = 100. Give the positive solution.", "4x^2=100", "5", "x² = 25 → x = 5.", []),
  q("y9c-q-10", "Solve x² = 2.25. Give the positive solution.", "x^2=2.25", "1.5", "√2.25 = 1.5.", ["3/2"]),
  q("y9c-q-11", "Solve 9x² = 1. Give the positive solution as a fraction.", "9x^2=1", "1/3", "x² = 1/9 → x = 1/3.", ["1 / 3"]),
  q("y9c-q-12", "Solve x²/5 = 20. Give the positive solution.", "\\tfrac{x^2}{5}=20", "10", "x² = 100 → x = 10.", []),
];

// linear-equations-involving-fractions (core) — Year 9 Core conformance, Cambridge 3F
export const linearEquationsFractionsY9Challenge: PracticeQuestion[] = [
  q("y9c-lef-1", "Solve x/2 + x/3 + x/4 = 13.", "\\tfrac{x}{2}+\\tfrac{x}{3}+\\tfrac{x}{4}=13", "12", "×12: 6x + 4x + 3x = 156 → 13x = 156 → x = 12.", xv("12")),
  q("y9c-lef-2", "Solve (3x − 1)/2 = x + 4.", "\\tfrac{3x-1}{2}=x+4", "9", "×2: 3x − 1 = 2x + 8 → x = 9.", xv("9")),
  q("y9c-lef-3", "Solve (x + 5)/2 − (x − 3)/4 = 4.", "\\tfrac{x+5}{2}-\\tfrac{x-3}{4}=4", "3", "×4: 2(x + 5) − (x − 3) = 16 → x + 13 = 16 → x = 3.", xv("3")),
  q("y9c-lef-4", "Solve x/2 + (3x + 1)/4 = 9.", "\\tfrac{x}{2}+\\tfrac{3x+1}{4}=9", "7", "×4: 2x + 3x + 1 = 36 → 5x = 35 → x = 7.", xv("7")),
  q("y9c-lef-5", "Solve (4x − 5)/3 = (x + 5)/2.", "\\tfrac{4x-5}{3}=\\tfrac{x+5}{2}", "5", "×6: 2(4x − 5) = 3(x + 5) → 8x − 10 = 3x + 15 → 5x = 25 → x = 5.", xv("5")),
  q("y9c-lef-6", "Solve 2x/5 + x/2 = 9.", "\\tfrac{2x}{5}+\\tfrac{x}{2}=9", "10", "×10: 4x + 5x = 90 → 9x = 90 → x = 10.", xv("10")),
  q("y9c-lef-7", "Solve (x − 2)/3 + (x + 4)/6 = 3.", "\\tfrac{x-2}{3}+\\tfrac{x+4}{6}=3", "6", "×6: 2(x − 2) + (x + 4) = 18 → 3x = 18 → x = 6.", xv("6")),
  q("y9c-lef-8", "Solve (5x + 2)/3 − x = 4.", "\\tfrac{5x+2}{3}-x=4", "5", "×3: 5x + 2 − 3x = 12 → 2x = 10 → x = 5.", xv("5")),
  q("y9c-lef-9", "Solve (x + 1)/2 + (x + 1)/3 + (x + 1)/6 = 4.", "\\tfrac{x+1}{2}+\\tfrac{x+1}{3}+\\tfrac{x+1}{6}=4", "3", "×6: 6(x + 1) = 24 → x + 1 = 4 → x = 3.", xv("3")),
  q("y9c-lef-10", "Solve (2x − 7)/3 = (x − 2)/2.", "\\tfrac{2x-7}{3}=\\tfrac{x-2}{2}", "8", "×6: 2(2x − 7) = 3(x − 2) → 4x − 14 = 3x − 6 → x = 8.", xv("8")),
  q("y9c-lef-11", "Solve (x + 7)/2 − (x − 1)/3 = 5.", "\\tfrac{x+7}{2}-\\tfrac{x-1}{3}=5", "7", "×6: 3(x + 7) − 2(x − 1) = 30 → x + 23 = 30 → x = 7.", xv("7")),
  q("y9c-lef-12", "Solve x/2 − x/5 = 3.", "\\tfrac{x}{2}-\\tfrac{x}{5}=3", "10", "×10: 5x − 2x = 30 → 3x = 30 → x = 10.", xv("10")),
];
