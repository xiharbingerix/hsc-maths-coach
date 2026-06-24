// Year 9 Wave 11 — Chapter 10 (Quadratic Equations & Parabolas) D6 challenge pools (Level-6 tier,
// post-mastery; ADR-Y9-001). 12 markable questions per section. All 8 sections are path-tagged →
// registered course-scoped under base + advanced in lib/challenges/index.ts.

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — solve or read the parabola's features.", explanation };
}
const roots = (a: number, b: number) => [`${a}, ${b}`, `${b}, ${a}`, `${a},${b}`, `${b},${a}`];
const pt = (a: string) => [a, `(${a})`, a.replace(/[()\s]/g, "")];

// quadratic-equations
export const qeY9Challenge: PracticeQuestion[] = [
  q("y9c-qe-1", "Solve (2x − 3)(x + 4) = 0. Give the integer solution.", "(2x-3)(x+4)=0", "-4", "x = 3/2 or −4.", ["−4"]),
  q("y9c-qe-2", "Solve 3x(x − 2) = 0. Give the non-zero solution.", "3x(x-2)=0", "2", "0 or 2.", []),
  q("y9c-qe-3", "Solve (x − 4)(x − 4) = 0.", "(x-4)^2=0", "4", "Repeated root 4.", []),
  q("y9c-qe-4", "Solve (x + 3)(x − 3) = 0. Give the positive solution.", "(x+3)(x-3)=0", "3", "±3.", []),
  q("y9c-qe-5", "Solve (2x + 1)(2x − 1) = 0. Give the positive solution.", "(2x+1)(2x-1)=0", "1/2", "±1/2.", ["0.5"]),
  q("y9c-qe-6", "Solve x(2x − 6) = 0. Give the non-zero solution.", "x(2x-6)=0", "3", "0 or 3.", []),
  q("y9c-qe-7", "Solve (x − 10)(x + 10) = 0. Give the positive solution.", "(x-10)(x+10)=0", "10", "±10.", []),
  q("y9c-qe-8", "Solve (3x − 6)(x + 1) = 0. Give the positive solution.", "(3x-6)(x+1)=0", "2", "x = 2 or −1.", []),
  q("y9c-qe-9", "Solve x(x − 2)(x − 3) = 0. Give the largest solution.", "x(x-2)(x-3)=0", "3", "0, 2, 3.", []),
  q("y9c-qe-10", "Solve (x + 5)(x − 1) = 0. Give both solutions.", "(x+5)(x-1)=0", "-5, 1", "−5, 1.", roots(-5, 1)),
  q("y9c-qe-11", "Solve (x − 7)(x − 2) = 0. Give the larger solution.", "(x-7)(x-2)=0", "7", "2, 7.", []),
  q("y9c-qe-12", "Solve 2x(x + 4) = 0. Give the non-zero solution.", "2x(x+4)=0", "-4", "0 or −4.", ["−4"]),
];

// solving-quadratics-factorising-basic
export const sqfbY9Challenge: PracticeQuestion[] = [
  q("y9c-sqfb-1", "Solve 3x² − 27 = 0. Give the positive solution.", "3x^2-27=0", "3", "x² = 9 → ±3.", []),
  q("y9c-sqfb-2", "Solve 2x² − 6x = 0. Give the non-zero solution.", "2x^2-6x=0", "3", "0 or 3.", []),
  q("y9c-sqfb-3", "Solve x² − 1 = 0. Give the positive solution.", "x^2-1=0", "1", "±1.", []),
  q("y9c-sqfb-4", "Solve 4x² − 16 = 0. Give the positive solution.", "4x^2-16=0", "2", "x² = 4 → ±2.", []),
  q("y9c-sqfb-5", "Solve 5x² + 10x = 0. Give the non-zero solution.", "5x^2+10x=0", "-2", "0 or −2.", ["−2"]),
  q("y9c-sqfb-6", "Solve x² − 0.25 = 0. Give the positive solution.", "x^2-0.25=0", "0.5", "±0.5.", ["1/2"]),
  q("y9c-sqfb-7", "Solve 9x² − 4 = 0. Give the positive solution as a fraction.", "9x^2-4=0", "2/3", "x² = 4/9.", ["2 / 3"]),
  q("y9c-sqfb-8", "Solve 3x² − 9x = 0. Give the non-zero solution.", "3x^2-9x=0", "3", "0 or 3.", []),
  q("y9c-sqfb-9", "Solve 2x² − 50 = 0. Give the positive solution.", "2x^2-50=0", "5", "x² = 25 → ±5.", []),
  q("y9c-sqfb-10", "Solve x² − 144 = 0. Give the positive solution.", "x^2-144=0", "12", "±12.", []),
  q("y9c-sqfb-11", "Solve x² − 81 = 0. Give the positive solution.", "x^2-81=0", "9", "±9.", []),
  q("y9c-sqfb-12", "Solve 4x² − 8x = 0. Give the non-zero solution.", "4x^2-8x=0", "2", "4x(x−2)=0 → 0 or 2.", []),
];

// solving-quadratics-factorising
export const sqfY9Challenge: PracticeQuestion[] = [
  q("y9c-sqf-1", "Solve x² − 7x + 10 = 0. Give the larger solution.", "x^2-7x+10=0", "5", "(x−2)(x−5) → 2, 5.", []),
  q("y9c-sqf-2", "Solve x² + x − 12 = 0. Give the positive solution.", "x^2+x-12=0", "3", "(x+4)(x−3) → 3.", []),
  q("y9c-sqf-3", "Solve x² − 4x − 21 = 0. Give the positive solution.", "x^2-4x-21=0", "7", "(x−7)(x+3) → 7.", []),
  q("y9c-sqf-4", "Solve x² + 10x + 21 = 0. Give the larger solution.", "x^2+10x+21=0", "-3", "−3, −7.", ["−3"]),
  q("y9c-sqf-5", "Solve x² − 11x + 24 = 0. Give the larger solution.", "x^2-11x+24=0", "8", "3, 8.", []),
  q("y9c-sqf-6", "Solve x² + 4x − 12 = 0. Give the positive solution.", "x^2+4x-12=0", "2", "(x+6)(x−2) → 2.", []),
  q("y9c-sqf-7", "Solve x² − 9 = 0 by factorising. Give the positive solution.", "x^2-9=0", "3", "±3.", []),
  q("y9c-sqf-8", "Solve x² + 12x + 35 = 0. Give the larger solution.", "x^2+12x+35=0", "-5", "−5, −7.", ["−5"]),
  q("y9c-sqf-9", "Solve x² − x − 20 = 0. Give the positive solution.", "x^2-x-20=0", "5", "(x−5)(x+4) → 5.", []),
  q("y9c-sqf-10", "Solve x² − 10x + 25 = 0.", "x^2-10x+25=0", "5", "(x−5)² → 5.", []),
  q("y9c-sqf-11", "Solve x² + 6x + 8 = 0. Give the larger solution.", "x^2+6x+8=0", "-2", "−2, −4.", ["−2"]),
  q("y9c-sqf-12", "Solve x² − 3x − 10 = 0. Give the positive solution.", "x^2-3x-10=0", "5", "(x−5)(x+2) → 5.", []),
];

// quadratic-equations-problems
export const qepY9Challenge: PracticeQuestion[] = [
  q("y9c-qep-1", "Two consecutive even integers have product 48. Find the smaller positive one.", "n(n+2)=48", "6", "(n+8)(n−6) → 6.", []),
  q("y9c-qep-2", "A rectangle's length is 4 more than its width; area 45. Find the width.", "w(w+4)=45", "5", "(w+9)(w−5) → 5.", []),
  q("y9c-qep-3", "The sum of a number and its square is 30. Find the positive number.", "x+x^2=30", "5", "(x+6)(x−5) → 5.", []),
  q("y9c-qep-4", "A square's area equals its perimeter. Find the side (s ≠ 0).", "s^2=4s", "4", "s = 4.", []),
  q("y9c-qep-5", "Two consecutive integers have product 56. Find the smaller positive one.", "n(n+1)=56", "7", "(n+8)(n−7) → 7.", []),
  q("y9c-qep-6", "A number squared minus the number is 12. Find the positive number.", "x^2-x=12", "4", "(x−4)(x+3) → 4.", []),
  q("y9c-qep-7", "A rectangle's length is twice its width; area 50. Find the width.", "2w^2=50", "5", "w² = 25 → 5.", []),
  q("y9c-qep-8", "Two consecutive odd integers have product 35. Find the smaller positive one.", "n(n+2)=35", "5", "(n+7)(n−5) → 5.", []),
  q("y9c-qep-9", "The square of a number is 6 more than the number. Find the positive number.", "x^2=x+6", "3", "(x−3)(x+2) → 3.", []),
  q("y9c-qep-10", "A rectangle's length is 3 more than its width; area 40. Find the width.", "w(w+3)=40", "5", "(w+8)(w−5) → 5.", []),
  q("y9c-qep-11", "A number squared is 81. Find the positive value.", "x^2=81", "9", "9.", []),
  q("y9c-qep-12", "Two consecutive integers have product 72. Find the smaller positive one.", "n(n+1)=72", "8", "(n+9)(n−8) → 8.", []),
];

// the-parabola
export const parY9Challenge: PracticeQuestion[] = [
  q("y9c-par-1", "On y = x², which positive x gives y = 49?", "y=49", "7", "√49 = 7.", []),
  q("y9c-par-2", "On y = x², which positive x gives y = 64?", "y=64", "8", "8.", []),
  q("y9c-par-3", "For y = x², find y when x = −7.", "x=-7", "49", "49.", []),
  q("y9c-par-4", "On y = x², which positive x gives y = 144?", "y=144", "12", "12.", []),
  q("y9c-par-5", "State the minimum value of y = x².", "min", "0", "0.", []),
  q("y9c-par-6", "For y = x², find y when x = 1.5.", "x=1.5", "2.25", "2.25.", []),
  q("y9c-par-7", "On y = x², which positive x gives y = 0.25?", "y=0.25", "0.5", "√0.25 = 0.5.", ["1/2"]),
  q("y9c-par-8", "Does y = x² have a maximum or a minimum? (max/min)", "max/min", "min", "Minimum.", []),
  q("y9c-par-9", "For y = x², find y when x = −1.", "x=-1", "1", "1.", []),
  q("y9c-par-10", "On y = x², x = 5 and x = −5 give the same y-value. What is it?", "symmetry", "25", "25.", []),
  q("y9c-par-11", "For y = x², find y when x = 8.", "x=8", "64", "64.", []),
  q("y9c-par-12", "State the vertex of y = x². Give the point.", "vertex", "(0,0)", "(0, 0).", pt("0,0")),
];

// sketching-dilations-reflections
export const sdrY9Challenge: PracticeQuestion[] = [
  q("y9c-sdr-1", "For y = −2x², find y when x = 4.", "y=-2x^2,x=4", "-32", "−2 × 16.", ["−32"]),
  q("y9c-sdr-2", "For y = 3x², find y when x = −2.", "y=3x^2,x=-2", "12", "3 × 4.", []),
  q("y9c-sdr-3", "Of y = x², y = 2x², y = ½x², which is narrowest? Give its coefficient.", "narrowest", "2", "Largest a → 2.", []),
  q("y9c-sdr-4", "For y = −½x², find y when x = 2.", "y=-0.5x^2,x=2", "-2", "−½ × 4.", ["−2"]),
  q("y9c-sdr-5", "y = ax² passes through (2, 12). Find a.", "(2,12)", "3", "12 = 4a → 3.", []),
  q("y9c-sdr-6", "y = ax² passes through (1, −5). Find a.", "(1,-5)", "-5", "a = −5.", ["−5"]),
  q("y9c-sdr-7", "For y = 4x², find y when x = 3.", "y=4x^2,x=3", "36", "4 × 9.", []),
  q("y9c-sdr-8", "Does y = −4x² have a maximum or minimum? (max/min)", "max/min", "max", "Opens down → max.", []),
  q("y9c-sdr-9", "y = ax² passes through (3, 18). Find a.", "(3,18)", "2", "18 = 9a → 2.", []),
  q("y9c-sdr-10", "For y = −x², find y when x = −5.", "y=-x^2,x=-5", "-25", "−25.", ["−25"]),
  q("y9c-sdr-11", "For y = −3x², find y when x = 1.", "y=-3x^2,x=1", "-3", "−3.", ["−3"]),
  q("y9c-sdr-12", "For y = 2x², find y when x = 5.", "y=2x^2,x=5", "50", "2 × 25.", []),
];

// sketching-translations
export const strY9Challenge: PracticeQuestion[] = [
  q("y9c-str-1", "State the vertex of y = (x − 3)² + 5. Give the point.", "y=(x-3)^2+5", "(3,5)", "(3, 5).", pt("3,5")),
  q("y9c-str-2", "State the vertex of y = (x + 2)² − 4. Give the point.", "y=(x+2)^2-4", "(-2,-4)", "(−2, −4).", pt("-2,-4")),
  q("y9c-str-3", "State the vertex of y = (x − 4)² − 1. Give the point.", "y=(x-4)^2-1", "(4,-1)", "(4, −1).", pt("4,-1")),
  q("y9c-str-4", "y = x² is shifted right 5 and up 2. Give the vertex.", "R5 U2", "(5,2)", "(5, 2).", pt("5,2")),
  q("y9c-str-5", "State the vertex of y = (x + 5)² + 3. Give the point.", "y=(x+5)^2+3", "(-5,3)", "(−5, 3).", pt("-5,3")),
  q("y9c-str-6", "y = x² is shifted left 3 and down 4. Give the vertex.", "L3 D4", "(-3,-4)", "(−3, −4).", pt("-3,-4")),
  q("y9c-str-7", "A parabola's vertex is (2, −5) in y = (x − h)² + k. Find k.", "vertex (2,-5)", "-5", "k = −5.", ["−5"]),
  q("y9c-str-8", "State the vertex of y = (x − 1)² − 1. Give the point.", "y=(x-1)^2-1", "(1,-1)", "(1, −1).", pt("1,-1")),
  q("y9c-str-9", "For y = (x − 2)² + 3, find y when x = 2.", "x=2", "3", "At vertex y = 3.", []),
  q("y9c-str-10", "State the vertex of y = x² + 10. Give the point.", "y=x^2+10", "(0,10)", "(0, 10).", pt("0,10")),
  q("y9c-str-11", "State the vertex of y = (x + 1)² − 3. Give the point.", "y=(x+1)^2-3", "(-1,-3)", "(−1, −3).", pt("-1,-3")),
  q("y9c-str-12", "State the vertex of y = x² − 6. Give the point.", "y=x^2-6", "(0,-6)", "(0, −6).", pt("0,-6")),
];

// sketching-parabolas-intercept-form
export const spiY9Challenge: PracticeQuestion[] = [
  q("y9c-spi-1", "Find the axis of symmetry of y = (x − 1)(x − 7).", "(x-1)(x-7)", "4", "(1 + 7)/2 = 4.", ["x=4", "x = 4"]),
  q("y9c-spi-2", "Find the y-intercept of y = (x − 5)(x + 2).", "(x-5)(x+2),x=0", "-10", "(−5)(2) = −10.", ["−10"]),
  q("y9c-spi-3", "Find the x-intercepts of y = (x + 3)(x + 5). Give the larger.", "(x+3)(x+5)", "-3", "−3 or −5.", ["−3"]),
  q("y9c-spi-4", "Find the axis of symmetry of y = (x + 3)(x + 5).", "axis", "-4", "(−3 + −5)/2 = −4.", ["x=-4", "x = −4"]),
  q("y9c-spi-5", "Find the y-intercept of y = x(x − 6).", "x(x-6),x=0", "0", "0 × (−6) = 0.", []),
  q("y9c-spi-6", "Find the axis of symmetry of y = x(x − 6).", "axis", "3", "(0 + 6)/2 = 3.", ["x=3", "x = 3"]),
  q("y9c-spi-7", "Find the x-intercepts of y = (2x − 4)(x − 3). Give the smaller.", "(2x-4)(x-3)", "2", "x = 2 or 3.", []),
  q("y9c-spi-8", "Find the y-intercept of y = (x + 1)(x + 6).", "(x+1)(x+6),x=0", "6", "(1)(6) = 6.", []),
  q("y9c-spi-9", "Find the axis of symmetry of y = (x − 2)(x − 8).", "(x-2)(x-8)", "5", "(2 + 8)/2 = 5.", ["x=5", "x = 5"]),
  q("y9c-spi-10", "Find the x-intercepts of y = (x − 4)(x + 4). Give the positive one.", "(x-4)(x+4)", "4", "±4.", []),
  q("y9c-spi-11", "Find the axis of symmetry of y = (x − 2)(x − 4).", "(x-2)(x-4)", "3", "(2 + 4)/2 = 3.", ["x=3", "x = 3"]),
  q("y9c-spi-12", "Find the y-intercept of y = (x − 3)(x − 7).", "(x-3)(x-7),x=0", "21", "(−3)(−7) = 21.", []),
];
