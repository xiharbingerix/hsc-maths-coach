// Year 9 Wave 4 — Chapter 3 (Pythagoras & Trigonometry), Pythagoras sections (ADR-Y9-001):
// pythagoras-theorem (consol), pythagoras-shorter-sides (consol), pythagoras-2d-problems (consol),
// pythagoras-3d-problems (path). Full per-subtopic contract. Triangles use Pythagorean triples;
// non-integer answers are rounded to 1 d.p. as stated.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Use c² = a² + b²; isolate the unknown square first.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Identify the hypotenuse first.", explanation };
}
const u = (a: string, unit = "cm") => [a, `${a} ${unit}`, `${a}${unit}`];

// ── pythagoras-theorem (consolidating) ─────────────────────────────────────────────────
const pythagorasTheorem: Partial<ExplicitLesson> = {
  description: "Use Pythagoras' theorem c² = a² + b² to find the hypotenuse of a right-angled triangle.",
  learningIntention: "Find the hypotenuse using Pythagoras' theorem.",
  successCriteria: ["State c² = a² + b².", "Identify the hypotenuse.", "Find the hypotenuse for integer triples.", "Round a non-integer hypotenuse."],
  teaching: {
    paragraphs: [
      "PYTHAGORAS' THEOREM says that in a right-angled triangle, the square of the HYPOTENUSE (the longest side, opposite the right angle) equals the sum of the squares of the other two sides: c² = a² + b².",
      "To find the hypotenuse, square the two shorter sides, add, then take the square root. For legs 3 and 4: c² = 9 + 16 = 25, so c = 5.",
      "Some right triangles have whole-number sides — PYTHAGOREAN TRIPLES like 3-4-5, 5-12-13, 8-15-17.",
      "If the answer isn't a whole number, leave it as a surd or ROUND as asked (e.g. to 1 decimal place).",
    ],
    latexBlocks: ["c^2 = a^2 + b^2", "c^2 = 3^2 + 4^2 = 25 \\Rightarrow c = 5"],
  },
  workedExamples: [
    { title: "3-4-5", questionLatex: "a=3, b=4. \\text{ Find the hypotenuse.}", steps: [{ explanation: "9 + 16 = 25.", latex: "c = 5" }], finalAnswerLatex: "5" },
    { title: "5-12-13", questionLatex: "a=5, b=12. \\text{ Find the hypotenuse.}", steps: [{ explanation: "25 + 144 = 169.", latex: "c = 13" }], finalAnswerLatex: "13" },
    { title: "6-8-10", questionLatex: "a=6, b=8. \\text{ Find the hypotenuse.}", steps: [{ explanation: "36 + 64 = 100.", latex: "c = 10" }], finalAnswerLatex: "10" },
  ],
  guidedPractice: [
    ans("y9-pyt-g1", "Legs 3 cm and 4 cm. Find the hypotenuse.", "a=3,b=4", "5", 2, "√25 = 5.", u("5")),
    ans("y9-pyt-g2", "Legs 8 cm and 6 cm. Find the hypotenuse.", "a=8,b=6", "10", 2, "√100 = 10.", u("10")),
    ans("y9-pyt-g3", "Legs 9 cm and 12 cm. Find the hypotenuse.", "a=9,b=12", "15", 2, "√225 = 15.", u("15")),
    mcq("y9-pyt-g4", "The hypotenuse is the side:", "B", ["shortest", "opposite the right angle", "between the legs", "always vertical"], 2, "The hypotenuse is opposite the right angle (the longest side)."),
  ],
  independentPractice: [
    ans("y9-pyt-i1", "Legs 5 cm and 12 cm. Find the hypotenuse.", "a=5,b=12", "13", 2, "√169 = 13.", u("13")),
    ans("y9-pyt-i2", "Legs 7 cm and 24 cm. Find the hypotenuse.", "a=7,b=24", "25", 3, "√625 = 25.", u("25")),
    ans("y9-pyt-i3", "Legs 8 cm and 15 cm. Find the hypotenuse.", "a=8,b=15", "17", 3, "√289 = 17.", u("17")),
    ans("y9-pyt-i4", "Legs 9 cm and 40 cm. Find the hypotenuse.", "a=9,b=40", "41", 3, "√1681 = 41.", u("41")),
    mcq("y9-pyt-i5", "The formula c² = a² + b² is used to find the:", "A", ["hypotenuse", "shortest side", "perimeter", "area"], 2, "It gives the hypotenuse c."),
  ],
  masteryQuiz: [
    ans("y9-pyt-m1", "Legs 3 cm and 4 cm. Find the hypotenuse.", "a=3,b=4", "5", 2, "5.", u("5")),
    ans("y9-pyt-m2", "Legs 6 cm and 8 cm. Find the hypotenuse.", "a=6,b=8", "10", 2, "10.", u("10")),
    ans("y9-pyt-m3", "Legs 5 cm and 12 cm. Find the hypotenuse.", "a=5,b=12", "13", 2, "13.", u("13")),
    ans("y9-pyt-m4", "Legs 8 cm and 15 cm. Find the hypotenuse.", "a=8,b=15", "17", 3, "17.", u("17")),
    mcq("y9-pyt-m5", "The longest side of a right-angled triangle is the:", "C", ["adjacent", "opposite", "hypotenuse", "base"], 2, "The hypotenuse is longest."),
    ans("y9-pyt-m6", "Legs 20 cm and 21 cm. Find the hypotenuse.", "a=20,b=21", "29", 3, "400 + 441 = 841 → 29.", u("29")),
    ans("y9-pyt-m7", "Legs 10 cm and 24 cm. Find the hypotenuse.", "a=10,b=24", "26", 3, "100 + 576 = 676 → 26.", u("26")),
    ans("y9-pyt-m8", "Legs 9 cm and 12 cm. Find the hypotenuse.", "a=9,b=12", "15", 2, "15.", u("15")),
    ans("y9-pyt-m9", "Legs 12 cm and 16 cm. Find the hypotenuse.", "a=12,b=16", "20", 3, "144 + 256 = 400 → 20.", u("20")),
    mcq("y9-pyt-m10", "If the legs are 3 and 4, the hypotenuse is:", "B", ["7", "5", "12", "25"], 2, "√(9+16) = 5."),
  ],
  masteryQuizPool: [
    ans("y9-pyt-p1", "Legs 5 cm and 7 cm. Find the hypotenuse (1 d.p.).", "a=5,b=7", "8.6", 5, "√74 ≈ 8.6.", u("8.6")),
    ans("y9-pyt-p2", "Legs 1 cm and 1 cm. Find the hypotenuse (1 d.p.).", "a=1,b=1", "1.4", 5, "√2 ≈ 1.4.", u("1.4")),
    ans("y9-pyt-p3", "Legs 2 cm and 3 cm. Find the hypotenuse (1 d.p.).", "a=2,b=3", "3.6", 5, "√13 ≈ 3.6.", u("3.6")),
    ans("y9-pyt-p4", "A right triangle has hypotenuse 13 and one leg 5. Find the other leg.", "c=13,a=5", "12", 5, "169 − 25 = 144 → 12.", u("12")),
    ans("y9-pyt-p5", "Legs 6 cm and 10 cm. Find the hypotenuse (1 d.p.).", "a=6,b=10", "11.7", 5, "√136 ≈ 11.7.", u("11.7")),
    ans("y9-pyt-p6", "A rectangle is 9 cm by 12 cm. Find its diagonal.", "9\\times12", "15", 5, "√(81+144) = 15.", u("15")),
    ans("y9-pyt-p7", "Legs 4 cm and 4 cm. Find the hypotenuse (1 d.p.).", "a=4,b=4", "5.7", 5, "√32 ≈ 5.7.", u("5.7")),
    ans("y9-pyt-p8", "A right triangle has hypotenuse 25 and one leg 24. Find the other leg.", "c=25,a=24", "7", 5, "625 − 576 = 49 → 7.", u("7")),
    ans("y9-pyt-p9", "Legs 10 cm and 10 cm. Find the hypotenuse (1 d.p.).", "a=10,b=10", "14.1", 5, "√200 ≈ 14.1.", u("14.1")),
    ans("y9-pyt-p10", "Find the perimeter of a right triangle with legs 6 cm and 8 cm.", "a=6,b=8,\\text{perimeter}", "24", 5, "Hyp 10; 6 + 8 + 10 = 24.", u("24")),
  ],
  commonMistakes: [
    { mistake: "Adding the sides instead of their squares.", fix: "Square first: c² = a² + b²." },
    { mistake: "Forgetting the square root at the end.", fix: "c = √(a² + b²)." },
    { mistake: "Treating a leg as the hypotenuse.", fix: "The hypotenuse is opposite the right angle." },
    { mistake: "Not rounding as asked.", fix: "Round to the requested decimal places." },
  ],
  masteryPassMark: 0.8,
};

// ── pythagoras-shorter-sides (consolidating) ───────────────────────────────────────────
const pythagorasShorterSides: Partial<ExplicitLesson> = {
  description: "Find the length of a shorter side using a² = c² − b².",
  learningIntention: "Rearrange Pythagoras' theorem to find a shorter side.",
  successCriteria: ["Rearrange to a² = c² − b².", "Subtract the squares in the right order.", "Find a shorter side for integer triples.", "Apply it in simple contexts."],
  teaching: {
    paragraphs: [
      "To find a SHORTER side, rearrange Pythagoras' theorem: a² = c² − b². You SUBTRACT the squares (hypotenuse squared minus the known leg squared).",
      "For hypotenuse 5 and one leg 3: a² = 25 − 9 = 16, so a = 4.",
      "Always subtract the SMALLER square FROM the hypotenuse's square — the hypotenuse is the largest value.",
      "This is how you find, for example, how high up a wall a ladder reaches.",
    ],
    latexBlocks: ["a^2 = c^2 - b^2", "a^2 = 5^2 - 3^2 = 16 \\Rightarrow a = 4"],
  },
  workedExamples: [
    { title: "5,3 → 4", questionLatex: "c=5, b=3. \\text{ Find the other side.}", steps: [{ explanation: "25 − 9 = 16.", latex: "a = 4" }], finalAnswerLatex: "4" },
    { title: "13,5 → 12", questionLatex: "c=13, b=5. \\text{ Find the other side.}", steps: [{ explanation: "169 − 25 = 144.", latex: "a = 12" }], finalAnswerLatex: "12" },
    { title: "10,6 → 8", questionLatex: "c=10, b=6. \\text{ Find the other side.}", steps: [{ explanation: "100 − 36 = 64.", latex: "a = 8" }], finalAnswerLatex: "8" },
  ],
  guidedPractice: [
    ans("y9-pss-g1", "Hypotenuse 5 cm, one leg 4 cm. Find the other leg.", "c=5,b=4", "3", 2, "25 − 16 = 9 → 3.", u("3")),
    ans("y9-pss-g2", "Hypotenuse 13 cm, one leg 12 cm. Find the other leg.", "c=13,b=12", "5", 2, "169 − 144 = 25 → 5.", u("5")),
    ans("y9-pss-g3", "Hypotenuse 25 cm, one leg 24 cm. Find the other leg.", "c=25,b=24", "7", 3, "625 − 576 = 49 → 7.", u("7")),
    mcq("y9-pss-g4", "To find a shorter side you:", "B", ["add the squares", "subtract the squares", "multiply the sides", "halve the hypotenuse"], 2, "a² = c² − b²."),
  ],
  independentPractice: [
    ans("y9-pss-i1", "Hypotenuse 10 cm, one leg 8 cm. Find the other leg.", "c=10,b=8", "6", 2, "100 − 64 = 36 → 6.", u("6")),
    ans("y9-pss-i2", "Hypotenuse 17 cm, one leg 15 cm. Find the other leg.", "c=17,b=15", "8", 3, "289 − 225 = 64 → 8.", u("8")),
    ans("y9-pss-i3", "Hypotenuse 26 cm, one leg 24 cm. Find the other leg.", "c=26,b=24", "10", 3, "676 − 576 = 100 → 10.", u("10")),
    ans("y9-pss-i4", "Hypotenuse 15 cm, one leg 9 cm. Find the other leg.", "c=15,b=9", "12", 3, "225 − 81 = 144 → 12.", u("12")),
    mcq("y9-pss-i5", "The rearrangement for a shorter side is:", "C", ["a² = c² + b²", "a² = b² − c²", "a² = c² − b²", "a = c − b"], 2, "a² = c² − b²."),
  ],
  masteryQuiz: [
    ans("y9-pss-m1", "Hypotenuse 5, one leg 3. Find the other leg.", "c=5,b=3", "4", 2, "4.", u("4")),
    ans("y9-pss-m2", "Hypotenuse 13, one leg 5. Find the other leg.", "c=13,b=5", "12", 2, "12.", u("12")),
    ans("y9-pss-m3", "Hypotenuse 25, one leg 7. Find the other leg.", "c=25,b=7", "24", 3, "625 − 49 = 576 → 24.", u("24")),
    ans("y9-pss-m4", "Hypotenuse 10, one leg 6. Find the other leg.", "c=10,b=6", "8", 2, "8.", u("8")),
    mcq("y9-pss-m5", "Which value must be the largest in a² = c² − b²?", "A", ["c", "a", "b", "they are equal"], 2, "c (the hypotenuse) is largest."),
    ans("y9-pss-m6", "Hypotenuse 15, one leg 12. Find the other leg.", "c=15,b=12", "9", 3, "225 − 144 = 81 → 9.", u("9")),
    ans("y9-pss-m7", "Hypotenuse 41, one leg 40. Find the other leg.", "c=41,b=40", "9", 3, "1681 − 1600 = 81 → 9.", u("9")),
    ans("y9-pss-m8", "Hypotenuse 20, one leg 16. Find the other leg.", "c=20,b=16", "12", 3, "400 − 256 = 144 → 12.", u("12")),
    ans("y9-pss-m9", "Hypotenuse 29, one leg 20. Find the other leg.", "c=29,b=20", "21", 3, "841 − 400 = 441 → 21.", u("21")),
    ans("y9-pss-m10", "Hypotenuse 17, one leg 8. Find the other leg.", "c=17,b=8", "15", 3, "289 − 64 = 225 → 15.", u("15")),
  ],
  masteryQuizPool: [
    ans("y9-pss-p1", "Hypotenuse 10 cm, one leg 7 cm. Find the other leg (1 d.p.).", "c=10,b=7", "7.1", 5, "√(100 − 49) = √51 ≈ 7.1.", u("7.1")),
    ans("y9-pss-p2", "A 5 m ladder rests with its base 3 m from a wall. How high up does it reach?", "c=5,b=3", "4", 5, "√(25 − 9) = 4 m.", u("4", "m")),
    ans("y9-pss-p3", "Hypotenuse 8 cm, one leg 5 cm. Find the other leg (1 d.p.).", "c=8,b=5", "6.2", 5, "√(64 − 25) = √39 ≈ 6.2.", u("6.2")),
    ans("y9-pss-p4", "A 13 m ladder reaches 12 m up a wall. How far is its base from the wall?", "c=13,b=12", "5", 5, "√(169 − 144) = 5 m.", u("5", "m")),
    ans("y9-pss-p5", "Hypotenuse 9 cm, one leg 4 cm. Find the other leg (1 d.p.).", "c=9,b=4", "8.1", 5, "√(81 − 16) = √65 ≈ 8.1.", u("8.1")),
    ans("y9-pss-p6", "Hypotenuse 12 cm, one leg 9 cm. Find the other leg (1 d.p.).", "c=12,b=9", "7.9", 5, "√(144 − 81) = √63 ≈ 7.9.", u("7.9")),
    ans("y9-pss-p7", "Hypotenuse 50, one leg 30. Find the other leg.", "c=50,b=30", "40", 5, "2500 − 900 = 1600 → 40.", u("40")),
    ans("y9-pss-p8", "Hypotenuse 6 cm, one leg 2 cm. Find the other leg (1 d.p.).", "c=6,b=2", "5.7", 5, "√(36 − 4) = √32 ≈ 5.7.", u("5.7")),
    ans("y9-pss-p9", "Hypotenuse 37, one leg 12. Find the other leg.", "c=37,b=12", "35", 5, "1369 − 144 = 1225 → 35.", u("35")),
    ans("y9-pss-p10", "A wire 10 m long is fixed 6 m up a pole. How far from the base is it pegged?", "c=10,b=6", "8", 5, "√(100 − 36) = 8 m.", u("8", "m")),
  ],
  commonMistakes: [
    { mistake: "Adding instead of subtracting.", fix: "For a shorter side, subtract: a² = c² − b²." },
    { mistake: "Subtracting in the wrong order.", fix: "Hypotenuse² comes first (it is largest)." },
    { mistake: "Forgetting the square root.", fix: "Take √ at the end." },
    { mistake: "Using a leg as the hypotenuse in a word problem.", fix: "The ladder length is the hypotenuse." },
  ],
  masteryPassMark: 0.8,
};

// ── pythagoras-2d-problems (consolidating) ─────────────────────────────────────────────
const pythagoras2dProblems: Partial<ExplicitLesson> = {
  description: "Apply Pythagoras' theorem to diagonals, distances and other 2D problems.",
  learningIntention: "Use Pythagoras' theorem in real 2D situations.",
  successCriteria: ["Find a rectangle's diagonal.", "Find the distance between two points.", "Set up the right triangle in a word problem.", "Decide hypotenuse vs shorter side."],
  teaching: {
    paragraphs: [
      "Many 2D problems hide a right-angled triangle. A rectangle's DIAGONAL is the hypotenuse of a triangle with the length and width as legs: a 6 by 8 rectangle has diagonal √(36 + 64) = 10.",
      "The DISTANCE between two points uses the horizontal and vertical gaps as legs: from (0, 0) to (3, 4) is √(9 + 16) = 5.",
      "First DECIDE whether the unknown is the hypotenuse (add squares) or a shorter side (subtract squares).",
      "Draw the triangle, label the sides, then apply the theorem.",
    ],
    latexBlocks: ["\\text{diagonal} = \\sqrt{6^2 + 8^2} = 10", "\\text{distance} = \\sqrt{3^2 + 4^2} = 5"],
  },
  workedExamples: [
    { title: "Rectangle diagonal", questionLatex: "\\text{Rectangle } 6 \\times 8. \\text{ Diagonal?}", steps: [{ explanation: "√(36 + 64).", latex: "10" }], finalAnswerLatex: "10" },
    { title: "Ladder", questionLatex: "\\text{Base } 3, \\text{ ladder } 5. \\text{ Height reached?}", steps: [{ explanation: "√(25 − 9).", latex: "4" }], finalAnswerLatex: "4" },
    { title: "Distance", questionLatex: "\\text{Distance from } (0,0) \\text{ to } (3,4)?", steps: [{ explanation: "√(9 + 16).", latex: "5" }], finalAnswerLatex: "5" },
  ],
  guidedPractice: [
    ans("y9-p2d-g1", "A rectangle is 5 cm by 12 cm. Find its diagonal.", "5\\times12", "13", 2, "√169 = 13.", u("13")),
    ans("y9-p2d-g2", "A rectangle is 8 cm by 15 cm. Find its diagonal.", "8\\times15", "17", 3, "√289 = 17.", u("17")),
    ans("y9-p2d-g3", "A 10 m ladder has its base 6 m from a wall. How high does it reach?", "c=10,b=6", "8", 3, "√(100 − 36) = 8.", u("8", "m")),
    mcq("y9-p2d-g4", "A rectangle's diagonal is the:", "B", ["shorter side", "hypotenuse of a right triangle", "perimeter", "area"], 2, "It is the hypotenuse."),
  ],
  independentPractice: [
    ans("y9-p2d-i1", "A rectangle is 9 cm by 12 cm. Find its diagonal.", "9\\times12", "15", 2, "√225 = 15.", u("15")),
    ans("y9-p2d-i2", "Find the distance from (0, 0) to (6, 8).", "(0,0)-(6,8)", "10", 3, "√(36 + 64) = 10.", []),
    ans("y9-p2d-i3", "A 17 m ladder has its base 8 m from a wall. How high does it reach?", "c=17,b=8", "15", 3, "√(289 − 64) = 15.", u("15", "m")),
    ans("y9-p2d-i4", "A screen is 20 cm by 21 cm. Find its diagonal.", "20\\times21", "29", 3, "√841 = 29.", u("29")),
    mcq("y9-p2d-i5", "To find the height a ladder reaches, the ladder is the:", "A", ["hypotenuse", "shorter side", "base", "diagonal of a square"], 2, "The ladder is the hypotenuse."),
  ],
  masteryQuiz: [
    ans("y9-p2d-m1", "A rectangle is 6 cm by 8 cm. Find its diagonal.", "6\\times8", "10", 2, "10.", u("10")),
    ans("y9-p2d-m2", "Find the distance from (0, 0) to (5, 12).", "(0,0)-(5,12)", "13", 3, "√169 = 13.", []),
    ans("y9-p2d-m3", "A 25 m wire is anchored 7 m from the base of a pole. How high is it fixed?", "c=25,b=7", "24", 3, "√(625 − 49) = 24.", u("24", "m")),
    ans("y9-p2d-m4", "A rectangle is 12 cm by 16 cm. Find its diagonal.", "12\\times16", "20", 3, "√400 = 20.", u("20")),
    mcq("y9-p2d-m5", "Finding a rectangle's diagonal means you:", "A", ["add the squares of the sides", "subtract the squares", "multiply the sides", "halve the perimeter"], 2, "Diagonal = √(l² + w²)."),
    ans("y9-p2d-m6", "Find the distance from (0, 0) to (8, 15).", "(0,0)-(8,15)", "17", 3, "√289 = 17.", []),
    ans("y9-p2d-m7", "A 13 m ladder reaches 12 m up a wall. How far is the base from the wall?", "c=13,a=12", "5", 3, "√(169 − 144) = 5.", u("5", "m")),
    ans("y9-p2d-m8", "A rectangle is 7 cm by 24 cm. Find its diagonal.", "7\\times24", "25", 3, "√625 = 25.", u("25")),
    ans("y9-p2d-m9", "A field is 9 m by 40 m. Find the diagonal path across it.", "9\\times40", "41", 3, "√1681 = 41.", u("41", "m")),
    mcq("y9-p2d-m10", "The distance between two points uses the horizontal and vertical gaps as the:", "C", ["hypotenuse", "diagonal", "two legs", "area"], 2, "The gaps are the legs; the distance is the hypotenuse."),
  ],
  masteryQuizPool: [
    ans("y9-p2d-p1", "A rectangle is 5 cm by 9 cm. Find its diagonal (1 d.p.).", "5\\times9", "10.3", 5, "√(25 + 81) = √106 ≈ 10.3.", u("10.3")),
    ans("y9-p2d-p2", "Find the distance from (1, 2) to (4, 6).", "(1,2)-(4,6)", "5", 5, "Gaps 3 and 4 → √25 = 5.", []),
    ans("y9-p2d-p3", "A square has side 6 cm. Find its diagonal (1 d.p.).", "\\text{square side }6", "8.5", 5, "√(36 + 36) = √72 ≈ 8.5.", u("8.5")),
    ans("y9-p2d-p4", "A ladder reaches 8 m up a wall with its base 6 m away. How long is the ladder?", "a=8,b=6", "10", 5, "√(64 + 36) = 10.", u("10", "m")),
    ans("y9-p2d-p5", "Find the distance from (2, 1) to (10, 7).", "(2,1)-(10,7)", "10", 5, "Gaps 8 and 6 → √100 = 10.", []),
    ans("y9-p2d-p6", "A rectangular gate is 1.5 m by 2 m. Find its diagonal brace length.", "1.5\\times2", "2.5", 5, "√(2.25 + 4) = √6.25 = 2.5.", u("2.5", "m")),
    ans("y9-p2d-p7", "A TV screen is 16 cm by 12 cm. Find the diagonal.", "16\\times12", "20", 5, "√(256 + 144) = 20.", u("20")),
    ans("y9-p2d-p8", "Find the distance from (0, 0) to (9, 12).", "(0,0)-(9,12)", "15", 5, "√225 = 15.", []),
    ans("y9-p2d-p9", "A rectangle is 4 cm by 7 cm. Find its diagonal (1 d.p.).", "4\\times7", "8.1", 5, "√(16 + 49) = √65 ≈ 8.1.", u("8.1")),
    ans("y9-p2d-p10", "Two roads leave a town, one 12 km east, one 5 km north. How far apart are the ends?", "12,5", "13", 5, "√(144 + 25) = 13 km.", u("13", "km")),
  ],
  commonMistakes: [
    { mistake: "Not identifying the right triangle in the picture.", fix: "Sketch and label legs and hypotenuse." },
    { mistake: "Adding when the unknown is a shorter side.", fix: "Decide hypotenuse (add) vs leg (subtract)." },
    { mistake: "Mixing up the coordinate gaps.", fix: "Use the differences in x and in y as the legs." },
    { mistake: "Forgetting units in the answer.", fix: "Carry the unit (cm, m) through." },
  ],
  masteryPassMark: 0.8,
};

// ── pythagoras-3d-problems (path) ──────────────────────────────────────────────────────
const pythagoras3dProblems: Partial<ExplicitLesson> = {
  description: "Use Pythagoras' theorem in three dimensions to find the space diagonal of a box.",
  learningIntention: "Find 3D diagonals using Pythagoras' theorem twice (or the 3D formula).",
  successCriteria: ["Use d² = l² + w² + h².", "Find the space diagonal of a rectangular box.", "Work with a cube.", "Round non-integer results."],
  teaching: {
    paragraphs: [
      "In 3D, the SPACE DIAGONAL of a rectangular box uses ALL THREE dimensions: d² = l² + w² + h², so d = √(l² + w² + h²).",
      "This comes from applying Pythagoras TWICE — first across the base, then up to the opposite corner.",
      "For a box 2 by 3 by 6: d² = 4 + 9 + 36 = 49, so d = 7.",
      "As in 2D, round non-integer answers as asked.",
    ],
    latexBlocks: ["d^2 = l^2 + w^2 + h^2", "d = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{49} = 7"],
  },
  workedExamples: [
    { title: "2×3×6", questionLatex: "\\text{Box } 2\\times3\\times6. \\text{ Space diagonal?}", steps: [{ explanation: "4 + 9 + 36 = 49.", latex: "7" }], finalAnswerLatex: "7" },
    { title: "1×2×2", questionLatex: "\\text{Box } 1\\times2\\times2. \\text{ Space diagonal?}", steps: [{ explanation: "1 + 4 + 4 = 9.", latex: "3" }], finalAnswerLatex: "3" },
    { title: "4×4×7", questionLatex: "\\text{Box } 4\\times4\\times7. \\text{ Space diagonal?}", steps: [{ explanation: "16 + 16 + 49 = 81.", latex: "9" }], finalAnswerLatex: "9" },
  ],
  guidedPractice: [
    ans("y9-p3d-g1", "Box 3 × 4 × 12. Find the space diagonal.", "3,4,12", "13", 3, "9 + 16 + 144 = 169 → 13.", u("13")),
    ans("y9-p3d-g2", "Box 2 × 6 × 9. Find the space diagonal.", "2,6,9", "11", 3, "4 + 36 + 81 = 121 → 11.", u("11")),
    ans("y9-p3d-g3", "Box 6 × 6 × 7. Find the space diagonal.", "6,6,7", "11", 3, "36 + 36 + 49 = 121 → 11.", u("11")),
    mcq("y9-p3d-g4", "The space diagonal of a box uses:", "C", ["one dimension", "two dimensions", "all three dimensions", "the volume"], 2, "d² = l² + w² + h²."),
  ],
  independentPractice: [
    ans("y9-p3d-i1", "Box 1 × 4 × 8. Find the space diagonal.", "1,4,8", "9", 3, "1 + 16 + 64 = 81 → 9.", u("9")),
    ans("y9-p3d-i2", "Box 2 × 3 × 6. Find the space diagonal.", "2,3,6", "7", 3, "49 → 7.", u("7")),
    ans("y9-p3d-i3", "Box 8 × 9 × 12. Find the space diagonal.", "8,9,12", "17", 4, "64 + 81 + 144 = 289 → 17.", u("17")),
    ans("y9-p3d-i4", "Box 4 × 8 × 8. Find the space diagonal.", "4,8,8", "12", 3, "16 + 64 + 64 = 144 → 12.", u("12")),
    mcq("y9-p3d-i5", "The 3D formula d = √(l² + w² + h²) comes from applying Pythagoras:", "B", ["once", "twice", "three times", "never"], 3, "Across the base, then up — twice."),
  ],
  masteryQuiz: [
    ans("y9-p3d-m1", "Box 2 × 3 × 6. Find the space diagonal.", "2,3,6", "7", 3, "7.", u("7")),
    ans("y9-p3d-m2", "Box 1 × 2 × 2. Find the space diagonal.", "1,2,2", "3", 3, "3.", u("3")),
    ans("y9-p3d-m3", "Box 3 × 4 × 12. Find the space diagonal.", "3,4,12", "13", 3, "13.", u("13")),
    ans("y9-p3d-m4", "Box 4 × 4 × 7. Find the space diagonal.", "4,4,7", "9", 3, "9.", u("9")),
    ans("y9-p3d-m5", "Box 2 × 6 × 9. Find the space diagonal.", "2,6,9", "11", 3, "11.", u("11")),
    ans("y9-p3d-m6", "Box 8 × 9 × 12. Find the space diagonal.", "8,9,12", "17", 4, "289 → 17.", u("17")),
    ans("y9-p3d-m7", "Box 1 × 4 × 8. Find the space diagonal.", "1,4,8", "9", 3, "81 → 9.", u("9")),
    ans("y9-p3d-m8", "Box 6 × 6 × 7. Find the space diagonal.", "6,6,7", "11", 3, "121 → 11.", u("11")),
    ans("y9-p3d-m9", "Box 6 × 10 × 15. Find the space diagonal.", "6,10,15", "19", 4, "36 + 100 + 225 = 361 → 19.", u("19")),
    mcq("y9-p3d-m10", "For a box l × w × h, the longest internal straight line is the:", "A", ["space diagonal", "base diagonal", "height", "edge"], 3, "The space diagonal is longest."),
  ],
  masteryQuizPool: [
    ans("y9-p3d-p1", "Box 2 × 3 × 4. Find the space diagonal (1 d.p.).", "2,3,4", "5.4", 5, "√(4 + 9 + 16) = √29 ≈ 5.4.", u("5.4")),
    ans("y9-p3d-p2", "A cube has side 5 cm. Find its space diagonal (1 d.p.).", "\\text{cube }5", "8.7", 5, "√(75) ≈ 8.7.", u("8.7")),
    ans("y9-p3d-p3", "Box 12 × 15 × 16. Find the space diagonal.", "12,15,16", "25", 5, "144 + 225 + 256 = 625 → 25.", u("25")),
    ans("y9-p3d-p4", "Box 1 × 1 × 1. Find the space diagonal (1 d.p.).", "1,1,1", "1.7", 5, "√3 ≈ 1.7.", u("1.7")),
    ans("y9-p3d-p5", "A room is 3 m × 4 m × 12 m. Find the longest pole that fits (space diagonal).", "3,4,12", "13", 5, "√169 = 13 m.", u("13", "m")),
    ans("y9-p3d-p6", "Box 2 × 5 × 14. Find the space diagonal.", "2,5,14", "15", 5, "4 + 25 + 196 = 225 → 15.", u("15")),
    ans("y9-p3d-p7", "Box 3 × 3 × 3. Find the space diagonal (1 d.p.).", "3,3,3", "5.2", 5, "√27 ≈ 5.2.", u("5.2")),
    ans("y9-p3d-p8", "Box 9 × 12 × 20. Find the space diagonal.", "9,12,20", "25", 5, "81 + 144 + 400 = 625 → 25.", u("25")),
    ans("y9-p3d-p9", "Box 2 × 2 × 1. Find the space diagonal.", "2,2,1", "3", 5, "4 + 4 + 1 = 9 → 3.", u("3")),
    ans("y9-p3d-p10", "A box is 4 × 8 × 8. A spider walks the space diagonal — how long is it?", "4,8,8", "12", 5, "16 + 64 + 64 = 144 → 12.", u("12")),
  ],
  commonMistakes: [
    { mistake: "Using only two dimensions.", fix: "The space diagonal uses all three: l² + w² + h²." },
    { mistake: "Forgetting the final square root.", fix: "d = √(l² + w² + h²)." },
    { mistake: "Squaring the sum instead of summing the squares.", fix: "Square each dimension first." },
    { mistake: "Confusing the base diagonal with the space diagonal.", fix: "The space diagonal goes corner-to-opposite-corner through the box." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "pythagoras-theorem": pythagorasTheorem,
  "pythagoras-shorter-sides": pythagorasShorterSides,
  "pythagoras-2d-problems": pythagoras2dProblems,
  "pythagoras-3d-problems": pythagoras3dProblems,
};

export function year9Chapter3PythagorasLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "pythagoras-trigonometry") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
