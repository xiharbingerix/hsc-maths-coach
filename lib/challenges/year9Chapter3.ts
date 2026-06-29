// Year 9 Wave 4 — Chapter 3 (Pythagoras & Trigonometry) D6 challenge pools (Level-6 tier,
// post-mastery; ADR-Y9-001). 12 markable questions per section. Registered course-scoped in
// lib/challenges/index.ts (consolidating → Core; core → all 3; path → base + advanced).

import type { PracticeQuestion } from "../lessons/differentialCalculus";
import { year9TrigSideVisuals } from "../lessons/year9TrigSideVisuals";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — combine several steps.", explanation };
}
const u = (a: string, unit = "cm") => [a, `${a} ${unit}`, `${a}${unit}`];
const deg = (a: string) => [a, `${a}°`, `${a} degrees`];
const brg = (a: string) => [a, `${a}°`, `${parseInt(a, 10)}`];

// pythagoras-theorem (consol)
export const pythTheoremY9Challenge: PracticeQuestion[] = [
  q("y9c-pyt-1", "Legs 11 cm and 60 cm. Find the hypotenuse.", "a=11,b=60", "61", "121 + 3600 = 3721 → 61.", u("61")),
  q("y9c-pyt-2", "Legs 20 cm and 99 cm. Find the hypotenuse.", "a=20,b=99", "101", "400 + 9801 = 10201 → 101.", u("101")),
  q("y9c-pyt-3", "An isosceles right triangle has legs 7 cm. Find the hypotenuse (1 d.p.).", "a=b=7", "9.9", "√98 ≈ 9.9.", u("9.9")),
  q("y9c-pyt-4", "A rectangle is 24 cm by 7 cm. Find its diagonal.", "24\\times7", "25", "√(576 + 49) = 25.", u("25")),
  q("y9c-pyt-5", "Legs 1.5 m and 2 m. Find the hypotenuse.", "a=1.5,b=2", "2.5", "√(2.25 + 4) = 2.5.", u("2.5", "m")),
  q("y9c-pyt-6", "Find the perimeter of a right triangle with legs 9 cm and 12 cm.", "a=9,b=12", "36", "Hyp 15; 9 + 12 + 15 = 36.", u("36")),
  q("y9c-pyt-7", "Legs 28 cm and 45 cm. Find the hypotenuse.", "a=28,b=45", "53", "784 + 2025 = 2809 → 53.", u("53")),
  q("y9c-pyt-8", "A square has diagonal 10 cm. Find its side length (1 d.p.).", "\\text{diag}=10", "7.1", "2s² = 100 → s = √50 ≈ 7.1.", u("7.1")),
  q("y9c-pyt-9", "Legs 0.6 m and 0.8 m. Find the hypotenuse.", "a=0.6,b=0.8", "1", "√(0.36 + 0.64) = 1.", u("1", "m")),
  q("y9c-pyt-10", "A right triangle has hypotenuse 13 and one leg 5. Find its area.", "c=13,a=5", "30", "Other leg 12; area = ½·5·12 = 30.", ["30", "30 cm²"]),
  q("y9c-pyt-11", "Legs 16 cm and 30 cm. Find the hypotenuse.", "a=16,b=30", "34", "256 + 900 = 1156 → 34.", u("34")),
  q("y9c-pyt-12", "Legs 33 cm and 56 cm. Find the hypotenuse.", "a=33,b=56", "65", "1089 + 3136 = 4225 → 65.", u("65")),
];

// pythagoras-shorter-sides (consol)
export const pythShorterY9Challenge: PracticeQuestion[] = [
  q("y9c-pss-1", "Hypotenuse 61, one leg 60. Find the other leg.", "c=61,b=60", "11", "3721 − 3600 = 121 → 11.", u("11")),
  q("y9c-pss-2", "Hypotenuse 101, one leg 99. Find the other leg.", "c=101,b=99", "20", "10201 − 9801 = 400 → 20.", u("20")),
  q("y9c-pss-3", "Hypotenuse 53, one leg 45. Find the other leg.", "c=53,b=45", "28", "2809 − 2025 = 784 → 28.", u("28")),
  q("y9c-pss-4", "Hypotenuse 65, one leg 63. Find the other leg.", "c=65,b=63", "16", "4225 − 3969 = 256 → 16.", u("16")),
  q("y9c-pss-5", "A 10 m ladder reaches 9.6 m up a wall. How far is its base from the wall?", "c=10,a=9.6", "2.8", "√(100 − 92.16) = √7.84 = 2.8.", u("2.8", "m")),
  q("y9c-pss-6", "Hypotenuse 6, one leg 4. Find the other leg (1 d.p.).", "c=6,b=4", "4.5", "√(36 − 16) = √20 ≈ 4.5.", u("4.5")),
  q("y9c-pss-7", "Hypotenuse 25, one leg 15. Find the other leg.", "c=25,b=15", "20", "625 − 225 = 400 → 20.", u("20")),
  q("y9c-pss-8", "Hypotenuse 85, one leg 84. Find the other leg.", "c=85,b=84", "13", "7225 − 7056 = 169 → 13.", u("13")),
  q("y9c-pss-9", "Hypotenuse 100, one leg 28. Find the other leg.", "c=100,b=28", "96", "10000 − 784 = 9216 → 96.", u("96")),
  q("y9c-pss-10", "Hypotenuse 2.5, one leg 1.5. Find the other leg.", "c=2.5,b=1.5", "2", "6.25 − 2.25 = 4 → 2.", u("2")),
  q("y9c-pss-11", "Hypotenuse 50, one leg 14. Find the other leg.", "c=50,b=14", "48", "2500 − 196 = 2304 → 48.", u("48")),
  q("y9c-pss-12", "Hypotenuse 41, one leg 9. Find the other leg.", "c=41,b=9", "40", "1681 − 81 = 1600 → 40.", u("40")),
];

// pythagoras-2d-problems (consol)
export const pyth2dY9Challenge: PracticeQuestion[] = [
  q("y9c-p2d-1", "A rectangle is 16 cm by 30 cm. Find its diagonal.", "16\\times30", "34", "√(256 + 900) = 34.", u("34")),
  q("y9c-p2d-2", "Find the distance from (1, 2) to (7, 10).", "(1,2)-(7,10)", "10", "√(36 + 64) = 10.", []),
  q("y9c-p2d-3", "A square has side 8 cm. Find its diagonal (1 d.p.).", "\\text{side }8", "11.3", "√128 ≈ 11.3.", u("11.3")),
  q("y9c-p2d-4", "Two boats leave port: one 9 km north, one 40 km east. How far apart are they?", "9,40", "41", "√(81 + 1600) = 41.", u("41", "km")),
  q("y9c-p2d-5", "A rhombus has diagonals 6 cm and 8 cm. Find its side length.", "d_1=6,d_2=8", "5", "Half-diagonals 3, 4 → √25 = 5.", u("5")),
  q("y9c-p2d-6", "Find the distance from (−2, −1) to (2, 2).", "(-2,-1)-(2,2)", "5", "√(16 + 9) = 5.", []),
  q("y9c-p2d-7", "A rectangle has diagonal 26 cm and length 24 cm. Find its width.", "c=26,a=24", "10", "√(676 − 576) = 10.", u("10")),
  q("y9c-p2d-8", "A 13 m ladder's base is 5 m from a wall. How high does it reach?", "c=13,b=5", "12", "√(169 − 25) = 12.", u("12", "m")),
  q("y9c-p2d-9", "A TV screen is 40 cm by 30 cm. Find its diagonal.", "40\\times30", "50", "√(1600 + 900) = 50.", u("50")),
  q("y9c-p2d-10", "Find the distance from (0, 0) to (20, 21).", "(0,0)-(20,21)", "29", "√(400 + 441) = 29.", []),
  q("y9c-p2d-11", "An isosceles triangle has base 16 cm and equal sides 10 cm. Find its height.", "\\text{base }16,\\text{ side }10", "6", "Half-base 8; √(100 − 64) = 6.", u("6")),
  q("y9c-p2d-12", "A rectangle is 1 m by 2 m. Find its diagonal (1 d.p.).", "1\\times2", "2.2", "√5 ≈ 2.2.", u("2.2", "m")),
];

// pythagoras-3d-problems (path)
export const pyth3dY9Challenge: PracticeQuestion[] = [
  q("y9c-p3d-1", "Box 9 × 12 × 20. Find the space diagonal.", "9,12,20", "25", "81 + 144 + 400 = 625 → 25.", u("25")),
  q("y9c-p3d-2", "A cube has side 4 cm. Find its space diagonal (1 d.p.).", "\\text{cube }4", "6.9", "√48 ≈ 6.9.", u("6.9")),
  q("y9c-p3d-3", "Box 12 × 15 × 16. Find the space diagonal.", "12,15,16", "25", "144 + 225 + 256 = 625 → 25.", u("25")),
  q("y9c-p3d-4", "Box 2 × 3 × 6. Find the space diagonal.", "2,3,6", "7", "4 + 9 + 36 = 49 → 7.", u("7")),
  q("y9c-p3d-5", "Box 1 × 2 × 2. Find the space diagonal.", "1,2,2", "3", "1 + 4 + 4 = 9 → 3.", u("3")),
  q("y9c-p3d-6", "A room is 6 × 8 × 24 (m). Find the space diagonal.", "6,8,24", "26", "36 + 64 + 576 = 676 → 26.", u("26", "m")),
  q("y9c-p3d-7", "Box 8 × 9 × 12. Find the space diagonal.", "8,9,12", "17", "64 + 81 + 144 = 289 → 17.", u("17")),
  q("y9c-p3d-8", "Box 4 × 8 × 19. Find the space diagonal.", "4,8,19", "21", "16 + 64 + 361 = 441 → 21.", u("21")),
  q("y9c-p3d-9", "Box 3 × 4 × 12. Find the space diagonal.", "3,4,12", "13", "9 + 16 + 144 = 169 → 13.", u("13")),
  q("y9c-p3d-10", "Box 6 × 6 × 7. Find the space diagonal.", "6,6,7", "11", "36 + 36 + 49 = 121 → 11.", u("11")),
  q("y9c-p3d-11", "A cube has side 10 cm. Find its space diagonal (1 d.p.).", "\\text{cube }10", "17.3", "√300 ≈ 17.3.", u("17.3")),
  q("y9c-p3d-12", "Box 2 × 10 × 11. Find the space diagonal.", "2,10,11", "15", "4 + 100 + 121 = 225 → 15.", u("15")),
];

// introducing-trigonometric-ratios (core)
export const trigRatiosY9Challenge: PracticeQuestion[] = [
  q("y9c-trr-1", "In a 5-12-13 triangle, opposite = 5. Find sin θ (2 d.p.).", "\\sin\\theta", "0.38", "5/13 ≈ 0.38.", []),
  q("y9c-trr-2", "In a 7-24-25 triangle, opposite = 7. Find cos θ.", "\\cos\\theta", "0.96", "adj/hyp = 24/25 = 0.96.", []),
  q("y9c-trr-3", "tan θ = 1 (isosceles right triangle). Find sin θ (2 d.p.).", "\\sin\\theta", "0.71", "sin 45° ≈ 0.71.", []),
  q("y9c-trr-4", "In a 20-21-29 triangle, adjacent = 21. Find cos θ (2 d.p.).", "\\cos\\theta", "0.72", "21/29 ≈ 0.72.", []),
  q("y9c-trr-5", "In an 8-15-17 triangle, opp = 8, adj = 15. Find tan θ (2 d.p.).", "\\tan\\theta", "0.53", "8/15 ≈ 0.53.", []),
  q("y9c-trr-6", "Find sin 60° (2 d.p.).", "\\sin60", "0.87", "sin 60° ≈ 0.866 → 0.87.", []),
  q("y9c-trr-7", "In a 3-4-5 triangle cos θ = 0.6 (adj = 3). Find tan θ (2 d.p.).", "\\tan\\theta", "1.33", "opp/adj = 4/3 ≈ 1.33.", []),
  q("y9c-trr-8", "In a 9-40-41 triangle, opposite = 9. Find sin θ (2 d.p.).", "\\sin\\theta", "0.22", "9/41 ≈ 0.22.", []),
  q("y9c-trr-9", "Find tan 30° (2 d.p.).", "\\tan30", "0.58", "tan 30° ≈ 0.577 → 0.58.", []),
  q("y9c-trr-10", "In a triangle hyp = 25, opp = 24. Find cos θ.", "\\cos\\theta", "0.28", "adj = 7; 7/25 = 0.28.", []),
  q("y9c-trr-11", "In a 5-12-13 triangle, sin θ = 12/13 (opp = 12). Find tan θ.", "\\tan\\theta", "2.4", "opp/adj = 12/5 = 2.4.", []),
  q("y9c-trr-12", "Find cos 45° (2 d.p.).", "\\cos45", "0.71", "cos 45° ≈ 0.707 → 0.71.", []),
];

// finding-unknown-side-lengths (core)
export const findSidesY9Challenge: PracticeQuestion[] = [
  q("y9c-fus-1", "Find the opposite: hyp = 30, θ = 60° (1 d.p.).", "30\\sin60", "26.0", "30 × 0.866 ≈ 26.0.", u("26", "")),
  q("y9c-fus-2", "Find the opposite: hyp = 24, θ = 30°.", "24\\sin30", "12", "24 × 0.5 = 12.", u("12")),
  q("y9c-fus-3", "Find the opposite: adj = 10, θ = 30° (1 d.p.).", "10\\tan30", "5.8", "10 × 0.577 ≈ 5.8.", u("5.8")),
  q("y9c-fus-4", "Find the opposite: hyp = 50, θ = 45° (1 d.p.).", "50\\sin45", "35.4", "50 × 0.707 ≈ 35.4.", u("35.4")),
  q("y9c-fus-5", "Find the opposite: adj = 8, θ = 60° (1 d.p.).", "8\\tan60", "13.9", "8 × 1.732 ≈ 13.9.", u("13.9")),
  q("y9c-fus-6", "Find the adjacent: hyp = 18, θ = 60°.", "18\\cos60", "9", "18 × 0.5 = 9.", u("9")),
  q("y9c-fus-7", "Find the adjacent: hyp = 40, θ = 30° (1 d.p.).", "40\\cos30", "34.6", "40 × 0.866 ≈ 34.6.", u("34.6")),
  q("y9c-fus-8", "Find the opposite: adj = 12, θ = 45°.", "12\\tan45", "12", "12 × 1 = 12.", u("12")),
  q("y9c-fus-9", "Find the opposite: hyp = 100, θ = 60° (1 d.p.).", "100\\sin60", "86.6", "100 × 0.866 ≈ 86.6.", u("86.6")),
  q("y9c-fus-10", "Find the opposite: hyp = 14, θ = 30°.", "14\\sin30", "7", "14 × 0.5 = 7.", u("7")),
  q("y9c-fus-11", "Find the opposite: adj = 15, θ = 30° (1 d.p.).", "15\\tan30", "8.7", "15 × 0.577 ≈ 8.7.", u("8.7")),
  q("y9c-fus-12", "Find the adjacent: hyp = 22, θ = 60°.", "22\\cos60", "11", "22 × 0.5 = 11.", u("11")),
];

for (const question of findSidesY9Challenge) {
  const visual = year9TrigSideVisuals[question.id];
  if (visual) Object.assign(question, visual);
}

// solving-for-the-denominator (core)
export const solveDenomY9Challenge: PracticeQuestion[] = [
  q("y9c-sfd-1", "Find the hypotenuse: opp = 10, θ = 60° (1 d.p.).", "10\\div\\sin60", "11.5", "10 ÷ 0.866 ≈ 11.5.", u("11.5")),
  q("y9c-sfd-2", "Find the hypotenuse: adj = 7, θ = 30° (1 d.p.).", "7\\div\\cos30", "8.1", "7 ÷ 0.866 ≈ 8.1.", u("8.1")),
  q("y9c-sfd-3", "Find the hypotenuse: opp = 9, θ = 30°.", "9\\div\\sin30", "18", "9 ÷ 0.5 = 18.", u("18")),
  q("y9c-sfd-4", "Find the hypotenuse: opp = 12, θ = 45° (1 d.p.).", "12\\div\\sin45", "17.0", "12 ÷ 0.707 ≈ 17.0.", u("17", "")),
  q("y9c-sfd-5", "Find the hypotenuse: adj = 20, θ = 60°.", "20\\div\\cos60", "40", "20 ÷ 0.5 = 40.", u("40")),
  q("y9c-sfd-6", "Find the hypotenuse: opp = 5, θ = 60° (1 d.p.).", "5\\div\\sin60", "5.8", "5 ÷ 0.866 ≈ 5.8.", u("5.8")),
  q("y9c-sfd-7", "Find the hypotenuse: adj = 14, θ = 30° (1 d.p.).", "14\\div\\cos30", "16.2", "14 ÷ 0.866 ≈ 16.2.", u("16.2")),
  q("y9c-sfd-8", "Find the hypotenuse: opp = 25, θ = 30°.", "25\\div\\sin30", "50", "25 ÷ 0.5 = 50.", u("50")),
  q("y9c-sfd-9", "Find the hypotenuse: opp = 8, θ = 45° (1 d.p.).", "8\\div\\sin45", "11.3", "8 ÷ 0.707 ≈ 11.3.", u("11.3")),
  q("y9c-sfd-10", "Find the hypotenuse: adj = 6, θ = 45° (1 d.p.).", "6\\div\\cos45", "8.5", "6 ÷ 0.707 ≈ 8.5.", u("8.5")),
  q("y9c-sfd-11", "Find the hypotenuse: opp = 3, θ = 30°.", "3\\div\\sin30", "6", "3 ÷ 0.5 = 6.", u("6")),
  q("y9c-sfd-12", "Find the hypotenuse: opp = 30, θ = 60° (1 d.p.).", "30\\div\\sin60", "34.6", "30 ÷ 0.866 ≈ 34.6.", u("34.6")),
];

for (const question of solveDenomY9Challenge) {
  const visual = year9TrigSideVisuals[question.id];
  if (visual) Object.assign(question, visual);
}

// finding-unknown-angles (core)
export const findAnglesY9Challenge: PracticeQuestion[] = [
  q("y9c-fua-1", "Opposite 11, adjacent 60. Find θ (1 d.p.).", "\\tan^{-1}(11/60)", "10.4", "tan⁻¹(0.1833) ≈ 10.4°.", deg("10.4")),
  q("y9c-fua-2", "Opposite 7, adjacent 24. Find θ (1 d.p.).", "\\tan^{-1}(7/24)", "16.3", "tan⁻¹(0.2917) ≈ 16.3°.", deg("16.3")),
  q("y9c-fua-3", "Opposite 20, hypotenuse 29. Find θ (1 d.p.).", "\\sin^{-1}(20/29)", "43.6", "sin⁻¹(0.6897) ≈ 43.6°.", deg("43.6")),
  q("y9c-fua-4", "Adjacent 9, hypotenuse 41. Find θ (1 d.p.).", "\\cos^{-1}(9/41)", "77.3", "cos⁻¹(0.2195) ≈ 77.3°.", deg("77.3")),
  q("y9c-fua-5", "tan θ = 2.4. Find θ (1 d.p.).", "\\tan^{-1}(2.4)", "67.4", "tan⁻¹(2.4) ≈ 67.4°.", deg("67.4")),
  q("y9c-fua-6", "Opposite 28, adjacent 45. Find θ (1 d.p.).", "\\tan^{-1}(28/45)", "31.9", "tan⁻¹(0.6222) ≈ 31.9°.", deg("31.9")),
  q("y9c-fua-7", "sin θ = 0.8. Find θ (1 d.p.).", "\\sin^{-1}(0.8)", "53.1", "sin⁻¹(0.8) ≈ 53.1°.", deg("53.1")),
  q("y9c-fua-8", "cos θ = 0.28. Find θ (1 d.p.).", "\\cos^{-1}(0.28)", "73.7", "cos⁻¹(0.28) ≈ 73.7°.", deg("73.7")),
  q("y9c-fua-9", "Opposite 33, adjacent 56. Find θ (1 d.p.).", "\\tan^{-1}(33/56)", "30.5", "tan⁻¹(0.5893) ≈ 30.5°.", deg("30.5")),
  q("y9c-fua-10", "sin θ = 0.96. Find θ (1 d.p.).", "\\sin^{-1}(0.96)", "73.7", "sin⁻¹(0.96) ≈ 73.7°.", deg("73.7")),
  q("y9c-fua-11", "tan θ = 0.5. Find θ (1 d.p.).", "\\tan^{-1}(0.5)", "26.6", "tan⁻¹(0.5) ≈ 26.6°.", deg("26.6")),
  q("y9c-fua-12", "Opposite 16, adjacent 30. Find θ (1 d.p.).", "\\tan^{-1}(16/30)", "28.1", "tan⁻¹(0.5333) ≈ 28.1°.", deg("28.1")),
];

// trigonometry-applications (core)
export const trigAppsY9Challenge: PracticeQuestion[] = [
  q("y9c-tap-1", "A building 40 m high is seen from 30 m away. Find the angle of elevation (1 d.p.).", "\\tan^{-1}(40/30)", "53.1", "tan⁻¹(1.333) ≈ 53.1°.", deg("53.1")),
  q("y9c-tap-2", "A 30 m ramp rises at 20° (sin 20° ≈ 0.342). Find its height (1 d.p.).", "30\\sin20", "10.3", "30 × 0.342 ≈ 10.3 m.", ["10.3", "10.3 m"]),
  q("y9c-tap-3", "From an 80 m cliff the angle of depression to a boat is 25° (tan 25° ≈ 0.466). Find the horizontal distance (1 d.p.).", "80/\\tan25", "171.6", "80 ÷ 0.466 ≈ 171.6 m.", ["171.6", "171.6 m"]),
  q("y9c-tap-4", "A 6 m ladder leans at 70° to the ground (sin 70° ≈ 0.940). Find the height it reaches (1 d.p.).", "6\\sin70", "5.6", "6 × 0.940 ≈ 5.6 m.", ["5.6", "5.6 m"]),
  q("y9c-tap-5", "The angle of elevation to a tree is 55° from 14 m away (tan 55° ≈ 1.428). Find the height (1 d.p.).", "14\\tan55", "20.0", "14 × 1.428 ≈ 20.0 m.", ["20", "20.0", "20 m"]),
  q("y9c-tap-6", "A plane is 1000 m high and 4000 m horizontally from the runway. Find the angle of depression (1 d.p.).", "\\tan^{-1}(1000/4000)", "14.0", "tan⁻¹(0.25) ≈ 14.0°.", deg("14")),
  q("y9c-tap-7", "A 12 m flagpole casts a 5 m shadow. Find the sun's angle of elevation (1 d.p.).", "\\tan^{-1}(12/5)", "67.4", "tan⁻¹(2.4) ≈ 67.4°.", deg("67.4")),
  q("y9c-tap-8", "A 5 m slide is at 40° to the ground (sin 40° ≈ 0.643). Find its height (1 d.p.).", "5\\sin40", "3.2", "5 × 0.643 ≈ 3.2 m.", ["3.2", "3.2 m"]),
  q("y9c-tap-9", "A wire to a 20 m pole top makes 50° with the ground (sin 50° ≈ 0.766). Find the wire length (1 d.p.).", "20/\\sin50", "26.1", "20 ÷ 0.766 ≈ 26.1 m.", ["26.1", "26.1 m"]),
  q("y9c-tap-10", "A hill rises 100 m over 500 m horizontal distance. Find its angle (1 d.p.).", "\\tan^{-1}(100/500)", "11.3", "tan⁻¹(0.2) ≈ 11.3°.", deg("11.3")),
  q("y9c-tap-11", "A 45 m tower has an elevation of 30° from an observer (tan 30° ≈ 0.577). Find the distance (1 d.p.).", "45/\\tan30", "77.9", "45 ÷ 0.577 ≈ 77.9 m.", ["77.9", "77.9 m"]),
  q("y9c-tap-12", "A ramp rises 2 m over a 10 m slope. Find its angle (1 d.p.).", "\\sin^{-1}(0.2)", "11.5", "sin⁻¹(0.2) ≈ 11.5°.", deg("11.5")),
];

// bearings (core)
export const bearingsY9Challenge: PracticeQuestion[] = [
  q("y9c-brg-1", "Find the back bearing of 037°.", "\\text{back }037", "217", "37 + 180 = 217°.", brg("217")),
  q("y9c-brg-2", "Find the back bearing of 290°.", "\\text{back }290", "110", "290 − 180 = 110°.", brg("110")),
  q("y9c-brg-3", "B is on a bearing of 065° from A. Find the bearing of A from B.", "\\text{reverse }065", "245", "65 + 180 = 245°.", brg("245")),
  q("y9c-brg-4", "A ship changes course from 120° to 210° (clockwise). Find the turn angle.", "210-120", "90", "210 − 120 = 90°.", deg("90")),
  q("y9c-brg-5", "Find the back bearing of 005°.", "\\text{back }005", "185", "5 + 180 = 185°.", brg("185")),
  q("y9c-brg-6", "Find the back bearing of 178°.", "\\text{back }178", "358", "178 + 180 = 358°.", brg("358")),
  q("y9c-brg-7", "Write the bearing of due NW.", "\\text{NW}", "315", "315°.", brg("315")),
  q("y9c-brg-8", "A is on a bearing of 140° from B. Find the bearing of B from A.", "\\text{reverse }140", "320", "140 + 180 = 320°.", brg("320")),
  q("y9c-brg-9", "A walker turns clockwise from 350° to 020°. Find the turn angle.", "350\\to020", "30", "020 − 350 + 360 = 30°.", deg("30")),
  q("y9c-brg-10", "Find the back bearing of 245°.", "\\text{back }245", "065", "245 − 180 = 065°.", brg("065")),
  q("y9c-brg-11", "Write the bearing of the direction halfway between south (180°) and west (270°).", "\\text{SW}", "225", "SW = 225°.", brg("225")),
  q("y9c-brg-12", "Find the back bearing of 123°.", "\\text{back }123", "303", "123 + 180 = 303°.", brg("303")),
];
