// Year 12 Standard 1 — Unit 4 "Right-Angled Triangles" — Wave 7 authored sections.
//
//   4A Pythagoras' Theorem        (pythagoras)
//   4B Applying Pythagoras        (pythagoras-applications)
//   4D Using the Calculator       (trig-using-calculator)
//   4E Finding an Unknown Side    (trig-sides)
//   4F Finding an Unknown Angle   (trig-angles)
//   4H Angles of Elevation and Depression (elevation-depression)
//
// 4C (right-angle-trigonometry), 4G (right-angle-trig-applications) and 4I (bearings-and-
// compass) keep their existing overrides. Same pattern as Waves 1–6: Feynman teaching,
// diagrams before formulas, 4/5/10 with EXACTLY 1/1/3 MCQs per section, authored
// cognitive-demand difficulty, markable answers. IDs unprefixed; `y12s1-` auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";
import type { TriangleDiagram } from "./types";

const UNIT = "right-angled-triangles";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  hint: string,
  explanation: string,
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    acceptedAnswers: [],
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

// Right triangle with the right angle at A (bottom-left). AB = base, AC = left vertical,
// BC = hypotenuse; angle B is at the bottom-right.
const tri = (
  description: string,
  sideLabels: TriangleDiagram["sideLabels"],
  angleLabels?: TriangleDiagram["angleLabels"]
): TriangleDiagram => ({
  description,
  vertices: { A: { x: 80, y: 240 }, B: { x: 340, y: 240 }, C: { x: 80, y: 60 } },
  sideLabels,
  angleLabels,
  rightAngleAt: "A",
});

// ── 4A Pythagoras' Theorem ───────────────────────────────────────────────────────────
export function year12Standard1PythagorasLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "pythagoras") {
    return null;
  }
  return {
    description:
      "Use Pythagoras' theorem to find the hypotenuse of a right-angled triangle, and recognise when the theorem applies.",
    learningIntention:
      "Identify the hypotenuse and use a² + b² = c² to find it in a right-angled triangle.",
    successCriteria: [
      "Identify the hypotenuse as the longest side, opposite the right angle.",
      "Apply a² + b² = c² to find the hypotenuse from the two shorter sides.",
      "Recognise that Pythagoras applies only to right-angled triangles.",
      "Round a non-exact hypotenuse to the required precision.",
    ],
    teaching: {
      paragraphs: [
        "Pythagoras' theorem is a fact about RIGHT-angled triangles only. In such a triangle the longest side — always the one OPPOSITE the right angle — is called the hypotenuse. The theorem says the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c², where c is the hypotenuse. Draw and label the triangle first; spotting the hypotenuse is half the battle.",
        "Picture it as areas: build a square on each side. The big square (on the hypotenuse) has exactly the same area as the two smaller squares added together. That is why you ADD the squares of the two short sides to get the square of the long one.",
        "To FIND the hypotenuse, square the two short sides, add them, and take the square root: c = √(a² + b²). Legs of 3 and 4 give c = √(9 + 16) = √25 = 5. Many nice triangles (3-4-5, 5-12-13, 8-15-17) come out whole, but most do not — then round as asked.",
        "The biggest trap is using Pythagoras on a triangle that is NOT right-angled, or mislabelling which side is the hypotenuse. Always check for the right-angle mark, and remember the hypotenuse is the longest side, never one of the two that form the right angle.",
      ],
      latexBlocks: [
        "a^2 + b^2 = c^2\\quad(c = \\text{hypotenuse, opposite the right angle})",
        "c = \\sqrt{a^2 + b^2}",
        "\\text{applies to right-angled triangles only}",
      ],
    },
    workedExamples: [
      {
        title: "Find the hypotenuse",
        questionLatex: "\\text{A right triangle has shorter sides 3 and 4. Find the hypotenuse.}",
        steps: [
          { explanation: "Add the squares of the two shorter sides.", latex: "3^2 + 4^2 = 9 + 16 = 25" },
          { explanation: "Take the square root.", latex: "c = \\sqrt{25} = 5" },
        ],
        finalAnswerLatex: "5",
      },
      {
        title: "Round when not exact",
        questionLatex: "\\text{Shorter sides 5 and 5. Find the hypotenuse to 2 decimal places.}",
        steps: [
          { explanation: "Add the squares and take the root.", latex: "\\sqrt{25 + 25} = \\sqrt{50}" },
          { explanation: "Evaluate and round.", latex: "\\approx 7.07" },
        ],
        finalAnswerLatex: "7.07",
      },
    ],
    guidedPractice: [
      mcq("pyth-g1", "In a right-angled triangle, the hypotenuse is:", "B",
        ["one of the two sides forming the right angle", "the longest side, opposite the right angle", "always the shortest side", "the side along the bottom"], 1,
        "It is opposite the right angle.",
        "The hypotenuse is the longest side, lying opposite the right angle."),
      ans("pyth-g2", "A right triangle has shorter sides 3 and 4. Find the hypotenuse.", "", "5", 2,
        "c = √(a² + b²).", "c = √(9 + 16) = √25 = 5."),
      ans("pyth-g3", "A right triangle has shorter sides 6 and 8. Find the hypotenuse.", "", "10", 2,
        "c = √(a² + b²).", "c = √(36 + 64) = √100 = 10."),
      ans("pyth-g4", "Using the triangle, the two shorter sides are 5 and 12. Find the hypotenuse.", "", "13", 2,
        "c = √(a² + b²).", "c = √(25 + 144) = √169 = 13.",
        [], { triangleDiagram: tri("Right triangle, right angle at A; shorter sides 12 and 5, hypotenuse unknown.", { AB: "12", AC: "5" }) }),
    ],
    independentPractice: [
      ans("pyth-i1", "A right triangle has shorter sides 8 and 15. Find the hypotenuse.", "", "17", 2,
        "c = √(a² + b²).", "c = √(64 + 225) = √289 = 17."),
      mcq("pyth-i2", "Pythagoras' theorem can be used:", "C",
        ["on any triangle", "only on equilateral triangles", "only on right-angled triangles", "only when all sides are whole numbers"], 3,
        "It depends on the right angle.",
        "Pythagoras' theorem applies only to right-angled triangles."),
      ans("pyth-i3", "A right triangle has shorter sides 9 and 12. Find the hypotenuse.", "", "15", 3,
        "c = √(a² + b²).", "c = √(81 + 144) = √225 = 15."),
      ans("pyth-i4", "A right triangle has shorter sides 5 and 5. Find the hypotenuse to 2 decimal places.", "", "7.07", 3,
        "Square, add, root, then round.", "c = √(25 + 25) = √50 ≈ 7.07.",
        ["7.07"]),
      ans("pyth-i5", "A right triangle has shorter sides 7 and 24. Find the hypotenuse.", "", "25", 3,
        "c = √(a² + b²).", "c = √(49 + 576) = √625 = 25."),
    ],
    masteryQuiz: [
      ans("pyth-m1", "A right triangle has shorter sides 20 and 21. Find the hypotenuse.", "", "29", 3,
        "c = √(a² + b²).", "c = √(400 + 441) = √841 = 29."),
      mcq("pyth-m2", "Which formula finds the hypotenuse c from the shorter sides a and b?", "A",
        ["c = √(a² + b²)", "c = a² + b²", "c = √(a² − b²)", "c = a + b"], 3,
        "Square, add, then root.",
        "The hypotenuse is c = √(a² + b²)."),
      ans("pyth-m3", "A right triangle has shorter sides 10 and 24. Find the hypotenuse.", "", "26", 3,
        "c = √(a² + b²).", "c = √(100 + 576) = √676 = 26."),
      ans("pyth-m4", "Using the triangle, the two shorter sides are 9 and 40. Find the hypotenuse.", "", "41", 3,
        "c = √(a² + b²).", "c = √(81 + 1600) = √1681 = 41.",
        [], { triangleDiagram: tri("Right triangle, right angle at A; shorter sides 40 and 9, hypotenuse unknown.", { AB: "40", AC: "9" }) }),
      mcq("pyth-m5", "Which set of three sides forms a right-angled triangle?", "B",
        ["4, 5, 6", "3, 4, 5", "2, 3, 4", "5, 6, 8"], 3,
        "Check whether a² + b² = c².",
        "3, 4, 5 works because 3² + 4² = 9 + 16 = 25 = 5². The other sets do not satisfy a² + b² = c²."),
      ans("pyth-m6", "A right triangle has shorter sides 2 and 3. Find the hypotenuse to 2 decimal places.", "", "3.61", 3,
        "Square, add, root, round.", "c = √(4 + 9) = √13 ≈ 3.61.",
        ["3.61"]),
      ans("pyth-m7", "A right triangle has shorter sides 12 and 16. Find the hypotenuse.", "", "20", 3,
        "c = √(a² + b²).", "c = √(144 + 256) = √400 = 20."),
      mcq("pyth-m8", "In a right-angled triangle, the hypotenuse is located:", "C",
        ["between the two shorter sides", "next to the right angle", "opposite the right angle", "wherever the longest label is drawn"], 3,
        "It faces the right angle.",
        "The hypotenuse is the side opposite the right angle (and is the longest side)."),
      ans("pyth-m9", "A right triangle has shorter sides 1 and 1. Find the hypotenuse to 2 decimal places.", "", "1.41", 4,
        "√2 to 2 dp.", "c = √(1 + 1) = √2 ≈ 1.41.",
        ["1.41"]),
      ans("pyth-m10", "A right triangle has shorter sides 15 and 20. Find the hypotenuse.", "", "25", 4,
        "c = √(a² + b²).", "c = √(225 + 400) = √625 = 25."),
    ],
    commonMistakes: [
      { mistake: "Using Pythagoras on a non-right-angled triangle.", fix: "Check for the right angle first — the theorem only applies then." },
      { mistake: "Treating a shorter side as the hypotenuse.", fix: "The hypotenuse is the longest side, opposite the right angle." },
      { mistake: "Forgetting the square root.", fix: "c² = a² + b² gives c² — take the square root to get c." },
      { mistake: "Adding the sides instead of their squares.", fix: "Square each side first, then add, then root." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 4B Applying Pythagoras ───────────────────────────────────────────────────────────
export function year12Standard1PythagorasApplicationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "pythagoras-applications") {
    return null;
  }
  return {
    description:
      "Apply Pythagoras to find a shorter side and to solve practical problems such as ladders, ramps and diagonals.",
    learningIntention:
      "Find a shorter side with a = √(c² − b²) and use Pythagoras in practical right-triangle problems.",
    successCriteria: [
      "Find a shorter side by subtracting: a = √(c² − b²).",
      "Decide whether to add or subtract the squares from the situation.",
      "Find the diagonal of a rectangle using Pythagoras.",
      "Solve ladder, ramp and distance problems with a right-triangle model.",
    ],
    teaching: {
      paragraphs: [
        "Pythagoras is not only for finding the hypotenuse. If you already KNOW the hypotenuse and one shorter side, you can find the OTHER shorter side — but now you SUBTRACT. Rearranging a² + b² = c² gives a = √(c² − b²). The clue is which side is the longest: if the unknown is a shorter side, subtract; if it is the hypotenuse, add.",
        "A leaning ladder is the classic picture: the ladder is the hypotenuse, the wall is one shorter side (the height reached), and the ground is the other shorter side (the distance of the foot from the wall). Knowing the ladder length and the foot distance, the height up the wall is √(ladder² − foot²) — a subtraction.",
        "Diagonals turn rectangles into right triangles. The diagonal of a rectangle is the hypotenuse of a right triangle whose legs are the length and the width, so diagonal = √(length² + width²) — an addition. A 9 by 12 rectangle has a diagonal of √(81 + 144) = √225 = 15.",
        "So the whole skill is: draw the right triangle, label the hypotenuse (the longest/slanted side), and ask whether the unknown is the hypotenuse (add) or a shorter side (subtract). Getting that decision right is what separates a correct answer from a confidently wrong one.",
      ],
      latexBlocks: [
        "a = \\sqrt{c^2 - b^2}\\quad(\\text{finding a shorter side})",
        "\\text{diagonal of a rectangle} = \\sqrt{\\text{length}^2 + \\text{width}^2}",
        "\\text{unknown is hypotenuse} \\Rightarrow \\text{add};\\ \\text{unknown is a shorter side} \\Rightarrow \\text{subtract}",
      ],
    },
    workedExamples: [
      {
        title: "Find a shorter side",
        questionLatex: "\\text{A right triangle has hypotenuse 13 and one shorter side 5. Find the other shorter side.}",
        steps: [
          { explanation: "Subtract the squares: a = √(c² − b²).", latex: "\\sqrt{13^2 - 5^2} = \\sqrt{169 - 25}" },
          { explanation: "Evaluate.", latex: "= \\sqrt{144} = 12" },
        ],
        finalAnswerLatex: "12",
      },
      {
        title: "Ladder against a wall",
        questionLatex: "\\text{A 5 m ladder has its foot 3 m from the wall. How high up the wall does it reach?}",
        steps: [
          { explanation: "The ladder is the hypotenuse; the height is a shorter side.", latex: "\\sqrt{5^2 - 3^2} = \\sqrt{25 - 9}" },
          { explanation: "Evaluate.", latex: "= \\sqrt{16} = 4 \\text{ m}" },
        ],
        finalAnswerLatex: "4 \\text{ m}",
      },
    ],
    guidedPractice: [
      mcq("pythap-g1", "To find a SHORTER side given the hypotenuse and one shorter side, you:", "B",
        ["add the squares and root", "subtract the squares and root", "add the two sides", "halve the hypotenuse"], 1,
        "The unknown is not the longest side.",
        "For a shorter side, subtract: a = √(c² − b²)."),
      ans("pythap-g2", "A right triangle has hypotenuse 13 and one shorter side 5. Find the other shorter side.", "", "12", 2,
        "a = √(c² − b²).", "a = √(169 − 25) = √144 = 12."),
      ans("pythap-g3", "A right triangle has hypotenuse 10 and one shorter side 6. Find the other shorter side.", "", "8", 2,
        "a = √(c² − b²).", "a = √(100 − 36) = √64 = 8."),
      ans("pythap-g4", "A right triangle has hypotenuse 25 and one shorter side 7. Find the other shorter side.", "", "24", 2,
        "a = √(c² − b²).", "a = √(625 − 49) = √576 = 24."),
    ],
    independentPractice: [
      ans("pythap-i1", "A 5 m ladder has its foot 3 m from a wall. How high up the wall does it reach?", "", "4", 2,
        "Ladder = hypotenuse; height is a shorter side.", "Height = √(25 − 9) = √16 = 4 m."),
      mcq("pythap-i2", "A 10 m ladder's foot is 6 m from the wall. To find how high it reaches, you:", "C",
        ["add 10² and 6²", "add 10 and 6", "subtract: √(10² − 6²)", "halve 10"], 3,
        "The height is a shorter side.",
        "The height is a shorter side, so subtract: √(100 − 36) = √64 = 8 m."),
      ans("pythap-i3", "A rectangle is 9 cm by 12 cm. Find the length of its diagonal.", "", "15", 3,
        "The diagonal is the hypotenuse — add the squares.", "Diagonal = √(81 + 144) = √225 = 15 cm.",
        ["15 cm"]),
      ans("pythap-i4", "A right triangle has hypotenuse 17 and one shorter side 8. Find the other shorter side.", "", "15", 3,
        "a = √(c² − b²).", "a = √(289 − 64) = √225 = 15."),
      ans("pythap-i5", "A rectangle is 5 m by 12 m. Find the length of its diagonal.", "", "13", 3,
        "Diagonal = √(length² + width²).", "Diagonal = √(25 + 144) = √169 = 13 m.",
        ["13 m"]),
    ],
    masteryQuiz: [
      ans("pythap-m1", "A right triangle has hypotenuse 15 and one shorter side 9. Find the other shorter side.", "", "12", 3,
        "a = √(c² − b²).", "a = √(225 − 81) = √144 = 12."),
      mcq("pythap-m2", "You should SUBTRACT the squares (rather than add) when the unknown side is:", "B",
        ["the hypotenuse", "a shorter side (a leg)", "the longest side", "the diagonal"], 3,
        "Subtract when the unknown is not the longest side.",
        "Subtract when finding a shorter side (leg); add when finding the hypotenuse."),
      ans("pythap-m3", "A right triangle has hypotenuse 26 and one shorter side 10. Find the other shorter side.", "", "24", 3,
        "a = √(c² − b²).", "a = √(676 − 100) = √576 = 24."),
      ans("pythap-m4", "A rectangle is 8 m by 15 m. Find the length of its diagonal.", "", "17", 3,
        "Diagonal = √(length² + width²).", "Diagonal = √(64 + 225) = √289 = 17 m.",
        ["17 m"]),
      mcq("pythap-m5", "A 13 m ladder reaches 12 m up a wall. To find how far the foot is from the wall, you:", "C",
        ["add 13² and 12²", "add 13 and 12", "subtract: √(13² − 12²)", "halve 13"], 3,
        "The foot distance is a shorter side.",
        "The foot distance is a shorter side: √(169 − 144) = √25 = 5 m."),
      ans("pythap-m6", "A right triangle has hypotenuse 41 and one shorter side 9. Find the other shorter side.", "", "40", 4,
        "a = √(c² − b²).", "a = √(1681 − 81) = √1600 = 40."),
      ans("pythap-m7", "A ramp's sloping surface is 25 m long and rises 7 m vertically. Find the horizontal run.", "", "24", 4,
        "The slope is the hypotenuse; the run is a shorter side.", "Run = √(625 − 49) = √576 = 24 m.",
        ["24 m"]),
      mcq("pythap-m8", "A right triangle has hypotenuse 13 and one leg 5. The third side is:", "B",
        ["18", "12", "8", "194"], 3,
        "Subtract the squares.",
        "Third side = √(13² − 5²) = √(169 − 25) = √144 = 12."),
      ans("pythap-m9", "A right triangle has hypotenuse 100 and one shorter side 60. Find the other shorter side.", "", "80", 4,
        "a = √(c² − b²).", "a = √(10000 − 3600) = √6400 = 80."),
      ans("pythap-m10", "A TV screen has a diagonal of 20 inches and a height of 12 inches. Find its width.", "", "16", 4,
        "The diagonal is the hypotenuse; the width is a shorter side.", "Width = √(400 − 144) = √256 = 16 inches.",
        ["16 inches"]),
    ],
    commonMistakes: [
      { mistake: "Adding the squares when finding a shorter side.", fix: "For a shorter side, subtract: a = √(c² − b²)." },
      { mistake: "Subtracting when finding the hypotenuse (e.g. a diagonal).", fix: "The hypotenuse/diagonal is found by adding the squares." },
      { mistake: "Mixing up which side is the ladder/slope (the hypotenuse).", fix: "The slanted side is the hypotenuse; the wall and ground are the legs." },
      { mistake: "Forgetting the square root at the end.", fix: "After adding or subtracting the squares, take the square root." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 4D Using the Calculator ──────────────────────────────────────────────────────────
export function year12Standard1TrigUsingCalculatorLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "trig-using-calculator") {
    return null;
  }
  return {
    description:
      "Evaluate sine, cosine and tangent of an angle and use inverse trig to find an angle, with correct calculator mode and rounding.",
    learningIntention:
      "Use a calculator (in degree mode) to evaluate trig ratios and to find an angle with inverse trig.",
    successCriteria: [
      "Set and use the calculator in degree mode for HSC angles.",
      "Evaluate sin, cos and tan of a given angle, rounding as required.",
      "Use sin⁻¹, cos⁻¹, tan⁻¹ to find the angle from a ratio.",
      "Recognise that inverse trig is not the reciprocal (1 ÷ ratio).",
    ],
    teaching: {
      paragraphs: [
        "The trig ratios sin, cos and tan turn an ANGLE into a NUMBER. Press sin 30 (in degree mode) and the calculator returns 0.5 — that is the sine of the angle. Most values are messy decimals (sin 35° ≈ 0.5736), so you round to the precision the question asks for.",
        "Everything depends on the calculator being in DEGREE mode. HSC Standard 1 angles are in degrees, so if your calculator is set to radians you will get nonsense (sin 30 in radian mode is about −0.988, not 0.5). Check for a small 'DEG' on the screen before you start, and if a 'simple' value looks wrong, suspect the mode.",
        "Going the other way, you often know the RATIO and want the ANGLE. That is what the inverse keys sin⁻¹, cos⁻¹, tan⁻¹ are for: sin⁻¹(0.5) asks 'what angle has a sine of 0.5?' and returns 30°. Inverse trig undoes the trig ratio.",
        "A classic error is reading sin⁻¹ as '1 ÷ sin'. It is not a reciprocal — sin⁻¹(0.5) is 30°, while 1 ÷ sin(0.5°) is something completely different. The little −1 means 'inverse function (find the angle)', not 'to the power −1'.",
      ],
      latexBlocks: [
        "\\text{degree mode: } \\sin 30^\\circ = 0.5,\\ \\tan 45^\\circ = 1",
        "\\text{inverse: } \\sin^{-1}(0.5) = 30^\\circ \\ (\\text{the angle whose sine is } 0.5)",
        "\\sin^{-1}(x) \\ne \\tfrac{1}{\\sin x}",
      ],
    },
    workedExamples: [
      {
        title: "Evaluate a ratio",
        questionLatex: "\\text{Find } \\sin 30^\\circ.",
        steps: [
          { explanation: "In degree mode, enter sin 30.", latex: "\\sin 30^\\circ = 0.5" },
        ],
        finalAnswerLatex: "0.5",
      },
      {
        title: "Find the angle with inverse trig",
        questionLatex: "\\text{Find } \\sin^{-1}(0.5) \\text{ in degrees.}",
        steps: [
          { explanation: "Ask: which angle has sine 0.5?", latex: "\\sin^{-1}(0.5) = 30^\\circ" },
        ],
        finalAnswerLatex: "30^\\circ",
      },
    ],
    guidedPractice: [
      mcq("tcalc-g1", "To find sin, cos or tan of an angle measured in degrees, the calculator must be in:", "B",
        ["radian mode", "degree mode", "fraction mode", "complex mode"], 1,
        "HSC angles here are in degrees.",
        "For angles in degrees the calculator must be in degree mode (look for 'DEG')."),
      ans("tcalc-g2", "Find sin 30°.", "\\sin 30^\\circ", "0.5", 2,
        "Use degree mode.", "sin 30° = 0.5.",
        ["0.50", "1/2"]),
      ans("tcalc-g3", "Find tan 45°.", "\\tan 45^\\circ", "1", 2,
        "Use degree mode.", "tan 45° = 1."),
      ans("tcalc-g4", "Find cos 60°.", "\\cos 60^\\circ", "0.5", 2,
        "Use degree mode.", "cos 60° = 0.5.",
        ["0.50", "1/2"]),
    ],
    independentPractice: [
      ans("tcalc-i1", "Find sin 60° to 3 decimal places.", "\\sin 60^\\circ", "0.866", 2,
        "Use degree mode and round.", "sin 60° = 0.866 (3 dp).",
        ["0.866"]),
      mcq("tcalc-i2", "The sin⁻¹ key on a calculator is used to:", "C",
        ["find 1 ÷ sin", "find the sine of an angle", "find the angle whose sine is a given ratio", "square the sine"], 3,
        "It undoes sine.",
        "sin⁻¹ finds the angle whose sine equals a given ratio (it is the inverse, not the reciprocal)."),
      ans("tcalc-i3", "Find sin⁻¹(0.5) in degrees.", "\\sin^{-1}(0.5)", "30", 3,
        "Which angle has sine 0.5?", "sin⁻¹(0.5) = 30°.",
        ["30°"]),
      ans("tcalc-i4", "Find cos⁻¹(0.5) in degrees.", "\\cos^{-1}(0.5)", "60", 3,
        "Which angle has cosine 0.5?", "cos⁻¹(0.5) = 60°.",
        ["60°"]),
      ans("tcalc-i5", "Find tan⁻¹(1) in degrees.", "\\tan^{-1}(1)", "45", 3,
        "Which angle has tangent 1?", "tan⁻¹(1) = 45°.",
        ["45°"]),
    ],
    masteryQuiz: [
      ans("tcalc-m1", "Find cos 30° to 3 decimal places.", "\\cos 30^\\circ", "0.866", 2,
        "Degree mode, round to 3 dp.", "cos 30° = 0.866 (3 dp).",
        ["0.866"]),
      mcq("tcalc-m2", "For HSC Standard 1 trig with angles in degrees, the correct calculator mode is:", "B",
        ["radian", "degree", "gradian", "it does not matter"], 3,
        "Angles are in degrees.",
        "Use degree mode; radian mode gives wrong values for degree angles."),
      ans("tcalc-m3", "Find tan⁻¹(0.75) to the nearest degree.", "\\tan^{-1}(0.75)", "37", 3,
        "Round the inverse-tan result.", "tan⁻¹(0.75) = 36.87° ≈ 37°.",
        ["37°"]),
      ans("tcalc-m4", "Find sin⁻¹(0.8) to the nearest degree.", "\\sin^{-1}(0.8)", "53", 3,
        "Round the inverse-sine result.", "sin⁻¹(0.8) = 53.13° ≈ 53°.",
        ["53°"]),
      mcq("tcalc-m5", "sin⁻¹(0.5) means:", "B",
        ["1 ÷ sin(0.5)", "the angle whose sine is 0.5", "0.5 squared", "sin(0.5) doubled"], 3,
        "The −1 means inverse function.",
        "sin⁻¹(0.5) is the angle whose sine is 0.5 (which is 30°), not a reciprocal."),
      ans("tcalc-m6", "Find tan 60° to 3 decimal places.", "\\tan 60^\\circ", "1.732", 3,
        "Degree mode, round to 3 dp.", "tan 60° = 1.732 (3 dp).",
        ["1.732"]),
      ans("tcalc-m7", "Find cos⁻¹(0.6) to the nearest degree.", "\\cos^{-1}(0.6)", "53", 3,
        "Round the inverse-cosine result.", "cos⁻¹(0.6) = 53.13° ≈ 53°.",
        ["53°"]),
      mcq("tcalc-m8", "A student enters sin 30 and gets −0.988. The most likely problem is:", "B",
        ["the calculator is broken", "the calculator is in radian mode", "they should have used cos", "30 is too small"], 3,
        "−0.988 is sin of 30 radians.",
        "sin 30° should be 0.5; getting −0.988 means the calculator is in radian mode (it computed sin of 30 radians)."),
      ans("tcalc-m9", "Find sin 45° to 3 decimal places.", "\\sin 45^\\circ", "0.707", 4,
        "Degree mode, round to 3 dp.", "sin 45° = 0.707 (3 dp).",
        ["0.707"]),
      ans("tcalc-m10", "Find tan⁻¹(2) to the nearest degree.", "\\tan^{-1}(2)", "63", 4,
        "Round the inverse-tan result.", "tan⁻¹(2) = 63.43° ≈ 63°.",
        ["63°"]),
    ],
    commonMistakes: [
      { mistake: "Leaving the calculator in radian mode.", fix: "Switch to degree mode for angles in degrees; check for 'DEG'." },
      { mistake: "Reading sin⁻¹ as 1 ÷ sin.", fix: "sin⁻¹ finds the angle; it is the inverse function, not a reciprocal." },
      { mistake: "Rounding too early.", fix: "Keep full accuracy until the final step, then round as asked." },
      { mistake: "Using the wrong inverse key.", fix: "Match the inverse to the ratio: sin⁻¹ for sine, cos⁻¹ for cosine, tan⁻¹ for tangent." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 4E Finding an Unknown Side ───────────────────────────────────────────────────────
export function year12Standard1TrigSidesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "trig-sides") {
    return null;
  }
  return {
    description:
      "Find an unknown side of a right triangle using SOH-CAH-TOA: identify the sides relative to the angle, choose the ratio, and solve.",
    learningIntention:
      "Use the correct trig ratio to find an unknown side, identifying opposite, adjacent and hypotenuse.",
    successCriteria: [
      "Label the opposite, adjacent and hypotenuse relative to a given angle.",
      "Choose sin, cos or tan using SOH-CAH-TOA.",
      "Set up and solve for an unknown side.",
      "Round the side to the required precision.",
    ],
    teaching: {
      paragraphs: [
        "To use trig you must first NAME the sides relative to the angle you are working with. The HYPOTENUSE is always the longest side (opposite the right angle). The OPPOSITE side is the one across from your angle. The ADJACENT side is the remaining one, next to the angle. Re-label for each angle — opposite and adjacent swap if you switch corners.",
        "SOH-CAH-TOA packs the three ratios into one chant: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent. Pick the ratio that contains the side you KNOW and the side you WANT, and the third letter you ignore.",
        "Once you choose the ratio, set it up and solve. To find the opposite when you know the hypotenuse and angle: sin θ = opp/hyp, so opp = hyp × sin θ. For example with θ = 30° and hyp = 20, opp = 20 × sin 30° = 20 × 0.5 = 10.",
        "Watch where the unknown sits. If it is on top of the fraction, multiply (opp = hyp × sin θ). If it is on the bottom, you divide (hyp = opp ÷ sin θ). Draw the triangle, label the three sides, then choose the ratio — never guess sin/cos/tan without labelling first.",
      ],
      latexBlocks: [
        "\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}},\\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}},\\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}",
        "\\text{opp} = \\text{hyp} \\times \\sin\\theta,\\quad \\text{adj} = \\text{hyp} \\times \\cos\\theta",
        "\\text{unknown on the bottom} \\Rightarrow \\text{divide}",
      ],
    },
    workedExamples: [
      {
        title: "Find the opposite side",
        questionLatex: "\\text{A right triangle has angle } 30^\\circ \\text{ and hypotenuse } 20.\\ \\text{Find the opposite side.}",
        steps: [
          { explanation: "Opposite and hypotenuse → use sine.", latex: "\\sin 30^\\circ = \\frac{\\text{opp}}{20}" },
          { explanation: "Multiply to solve.", latex: "\\text{opp} = 20 \\times 0.5 = 10" },
        ],
        finalAnswerLatex: "10",
        triangleDiagram: tri("Right triangle, right angle at A; angle 30° at B and hypotenuse BC = 20; the side opposite B is unknown.", { BC: "20" }, { B: "30°" }),
      },
      {
        title: "Find the adjacent side",
        questionLatex: "\\text{Angle } 60^\\circ,\\ \\text{hypotenuse } 10.\\ \\text{Find the adjacent side.}",
        steps: [
          { explanation: "Adjacent and hypotenuse → use cosine.", latex: "\\cos 60^\\circ = \\frac{\\text{adj}}{10}" },
          { explanation: "Multiply to solve.", latex: "\\text{adj} = 10 \\times 0.5 = 5" },
        ],
        finalAnswerLatex: "5",
      },
    ],
    guidedPractice: [
      mcq("tside-g1", "In SOH-CAH-TOA, 'SOH' tells you that sine equals:", "A",
        ["opposite ÷ hypotenuse", "adjacent ÷ hypotenuse", "opposite ÷ adjacent", "hypotenuse ÷ opposite"], 1,
        "S-O-H: Sine, Opposite, Hypotenuse.",
        "SOH means sin θ = opposite ÷ hypotenuse."),
      ans("tside-g2", "Using the triangle, the angle is 30° and the hypotenuse is 20. Find the side opposite the angle.", "", "10", 2,
        "Opposite and hypotenuse → sine.", "opp = 20 × sin 30° = 20 × 0.5 = 10.",
        [], { triangleDiagram: tri("Right triangle, right angle at A; angle 30° at B, hypotenuse BC = 20; side opposite B unknown.", { BC: "20" }, { B: "30°" }) }),
      ans("tside-g3", "A right triangle has angle 45° with the adjacent side 8. Find the opposite side.", "", "8", 2,
        "Opposite and adjacent → tangent.", "tan 45° = opp/8, so opp = 8 × 1 = 8."),
      ans("tside-g4", "A right triangle has angle 60° and hypotenuse 10. Find the adjacent side.", "", "5", 2,
        "Adjacent and hypotenuse → cosine.", "adj = 10 × cos 60° = 10 × 0.5 = 5."),
    ],
    independentPractice: [
      ans("tside-i1", "A right triangle has angle 30° and hypotenuse 50. Find the opposite side.", "", "25", 2,
        "Opposite and hypotenuse → sine.", "opp = 50 × sin 30° = 50 × 0.5 = 25."),
      mcq("tside-i2", "To find the side ADJACENT to a known angle when you know the hypotenuse, use:", "B",
        ["sine", "cosine", "tangent", "Pythagoras"], 3,
        "Adjacent with hypotenuse.",
        "Adjacent and hypotenuse are linked by cosine: adj = hyp × cos θ."),
      ans("tside-i3", "Using the triangle, the angle is 40° with the adjacent side 10. Find the opposite side to 2 decimal places. (tan 40° = 0.8391)", "", "8.39", 3,
        "Opposite and adjacent → tangent.", "opp = 10 × tan 40° = 10 × 0.8391 = 8.39 (2 dp).",
        ["8.39"], { triangleDiagram: tri("Right triangle, right angle at A; angle 40° at B, adjacent side AB = 10; side opposite B unknown.", { AB: "10" }, { B: "40°" }) }),
      ans("tside-i4", "A right triangle has angle 35° and hypotenuse 12. Find the opposite side to 2 decimal places. (sin 35° = 0.5736)", "", "6.88", 3,
        "Opposite and hypotenuse → sine.", "opp = 12 × sin 35° = 12 × 0.5736 = 6.88 (2 dp).",
        ["6.88"]),
      ans("tside-i5", "A right triangle has angle 30° with the adjacent side 12. Find the hypotenuse to 2 decimal places.", "", "13.86", 3,
        "Adjacent and hypotenuse → cosine; the hypotenuse is on the bottom, so divide.", "cos 30° = 12/hyp, so hyp = 12 ÷ 0.8660 = 13.86 (2 dp).",
        ["13.86"]),
    ],
    masteryQuiz: [
      ans("tside-m1", "A right triangle has angle 30° and hypotenuse 40. Find the opposite side.", "", "20", 2,
        "Opposite and hypotenuse → sine.", "opp = 40 × sin 30° = 40 × 0.5 = 20."),
      mcq("tside-m2", "You know the opposite side and the angle, and want the hypotenuse. Which ratio links them?", "A",
        ["sine", "cosine", "tangent", "none of these"], 3,
        "Opposite and hypotenuse.",
        "Sine links the opposite and the hypotenuse: sin θ = opp/hyp."),
      ans("tside-m3", "A right triangle has angle 45° with the adjacent side 9. Find the opposite side.", "", "9", 3,
        "Opposite and adjacent → tangent.", "opp = 9 × tan 45° = 9 × 1 = 9."),
      ans("tside-m4", "Using the triangle, the angle is 60° and the hypotenuse is 8. Find the adjacent side.", "", "4", 3,
        "Adjacent and hypotenuse → cosine.", "adj = 8 × cos 60° = 8 × 0.5 = 4.",
        [], { triangleDiagram: tri("Right triangle, right angle at A; angle 60° at B, hypotenuse BC = 8; adjacent side AB unknown.", { BC: "8" }, { B: "60°" }) }),
      mcq("tside-m5", "Relative to a marked angle in a right triangle, the 'opposite' side is the one:", "B",
        ["next to the angle", "across from the angle", "opposite the right angle", "that is longest"], 3,
        "It faces the angle.",
        "The opposite side is the one directly across from the angle (the hypotenuse is opposite the right angle)."),
      ans("tside-m6", "A right triangle has angle 30° and hypotenuse 18. Find the opposite side.", "", "9", 3,
        "Opposite and hypotenuse → sine.", "opp = 18 × sin 30° = 18 × 0.5 = 9."),
      ans("tside-m7", "A right triangle has angle 50° with the adjacent side 10. Find the opposite side to 2 decimal places. (tan 50° = 1.1918)", "", "11.92", 4,
        "Opposite and adjacent → tangent.", "opp = 10 × tan 50° = 10 × 1.1918 = 11.92 (2 dp).",
        ["11.92"]),
      mcq("tside-m8", "To find the hypotenuse from the opposite side and angle, rearrange sin θ = opp/hyp to:", "C",
        ["hyp = opp × sin θ", "hyp = opp + sin θ", "hyp = opp ÷ sin θ", "hyp = sin θ ÷ opp"], 3,
        "The hypotenuse is on the bottom, so divide.",
        "From sin θ = opp/hyp, hyp = opp ÷ sin θ."),
      ans("tside-m9", "A right triangle has angle 25° and hypotenuse 20. Find the opposite side to 2 decimal places. (sin 25° = 0.4226)", "", "8.45", 4,
        "Opposite and hypotenuse → sine.", "opp = 20 × sin 25° = 20 × 0.4226 = 8.45 (2 dp).",
        ["8.45"]),
      ans("tside-m10", "A right triangle has angle 60° with the adjacent side 5. Find the opposite side to 2 decimal places. (tan 60° = 1.7321)", "", "8.66", 4,
        "Opposite and adjacent → tangent.", "opp = 5 × tan 60° = 5 × 1.7321 = 8.66 (2 dp).",
        ["8.66"]),
    ],
    commonMistakes: [
      { mistake: "Mislabelling opposite and adjacent.", fix: "Opposite faces the angle; adjacent is next to it; hypotenuse is opposite the right angle." },
      { mistake: "Choosing the wrong ratio.", fix: "Use SOH-CAH-TOA — pick the ratio with the side you know and the side you want." },
      { mistake: "Multiplying when the unknown is on the bottom.", fix: "If the unknown is in the denominator, divide instead of multiply." },
      { mistake: "Calculator in radian mode.", fix: "Use degree mode for angles in degrees." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 4F Finding an Unknown Angle ──────────────────────────────────────────────────────
export function year12Standard1TrigAnglesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "trig-angles") {
    return null;
  }
  return {
    description:
      "Find an unknown angle of a right triangle from two known sides using inverse trigonometry.",
    learningIntention:
      "Choose the correct ratio from two known sides and use inverse trig to find the angle.",
    successCriteria: [
      "Identify which two sides are known relative to the unknown angle.",
      "Choose sin, cos or tan using SOH-CAH-TOA.",
      "Apply the inverse ratio to find the angle.",
      "Round the angle to the nearest degree (or as required).",
    ],
    teaching: {
      paragraphs: [
        "When the SIDES are known but the ANGLE is not, trig runs in reverse. First label the two known sides relative to the angle you want (opposite, adjacent or hypotenuse), then choose the ratio that uses exactly those two — the same SOH-CAH-TOA choice as before.",
        "The new step is the INVERSE. If sin θ = opp/hyp, then θ = sin⁻¹(opp/hyp). Whichever ratio you formed, apply its inverse key to the fraction to get the angle. Opposite and adjacent known? Use θ = tan⁻¹(opp/adj).",
        "For example, with opposite 5 and hypotenuse 10: sin θ = 5/10 = 0.5, so θ = sin⁻¹(0.5) = 30°. With opposite 3 and adjacent 4: tan θ = 3/4 = 0.75, so θ = tan⁻¹(0.75) ≈ 36.87°, which rounds to 37°.",
        "Two reminders: pick the ratio from the sides you actually have (do not default to sine), and remember to use the INVERSE key, not the ordinary ratio. Most angle answers are not whole numbers, so round to the nearest degree unless told otherwise.",
      ],
      latexBlocks: [
        "\\theta = \\sin^{-1}\\!\\left(\\frac{\\text{opp}}{\\text{hyp}}\\right),\\ \\cos^{-1}\\!\\left(\\frac{\\text{adj}}{\\text{hyp}}\\right),\\ \\tan^{-1}\\!\\left(\\frac{\\text{opp}}{\\text{adj}}\\right)",
        "\\text{opp \\& adj known} \\Rightarrow \\tan^{-1};\\ \\text{opp \\& hyp} \\Rightarrow \\sin^{-1};\\ \\text{adj \\& hyp} \\Rightarrow \\cos^{-1}",
        "\\text{round to the nearest degree unless told otherwise}",
      ],
    },
    workedExamples: [
      {
        title: "Angle from opposite and hypotenuse",
        questionLatex: "\\text{Opposite } 5,\\ \\text{hypotenuse } 10.\\ \\text{Find the angle.}",
        steps: [
          { explanation: "Opposite and hypotenuse → sine.", latex: "\\sin\\theta = \\frac{5}{10} = 0.5" },
          { explanation: "Apply the inverse.", latex: "\\theta = \\sin^{-1}(0.5) = 30^\\circ" },
        ],
        finalAnswerLatex: "30^\\circ",
      },
      {
        title: "Angle from opposite and adjacent",
        questionLatex: "\\text{Opposite } 3,\\ \\text{adjacent } 4.\\ \\text{Find the angle to the nearest degree.}",
        steps: [
          { explanation: "Opposite and adjacent → tangent.", latex: "\\tan\\theta = \\frac{3}{4} = 0.75" },
          { explanation: "Apply the inverse and round.", latex: "\\theta = \\tan^{-1}(0.75) \\approx 37^\\circ" },
        ],
        finalAnswerLatex: "37^\\circ",
      },
    ],
    guidedPractice: [
      mcq("tang-g1", "To find an unknown ANGLE from two known sides, you use:", "B",
        ["the ordinary sin, cos or tan", "inverse trig (sin⁻¹, cos⁻¹ or tan⁻¹)", "Pythagoras' theorem", "the sum of the sides"], 1,
        "Trig runs in reverse to find an angle.",
        "You use inverse trig (sin⁻¹, cos⁻¹ or tan⁻¹) to find the angle from a ratio of sides."),
      ans("tang-g2", "A right triangle has opposite side 5 and hypotenuse 10. Find the angle.", "", "30", 2,
        "Opposite and hypotenuse → sin⁻¹.", "sin θ = 5/10 = 0.5, so θ = sin⁻¹(0.5) = 30°.",
        ["30°"]),
      ans("tang-g3", "A right triangle has opposite side 5 and adjacent side 5. Find the angle.", "", "45", 2,
        "Opposite and adjacent → tan⁻¹.", "tan θ = 5/5 = 1, so θ = tan⁻¹(1) = 45°.",
        ["45°"]),
      ans("tang-g4", "A right triangle has adjacent side 10 and hypotenuse 20. Find the angle.", "", "60", 2,
        "Adjacent and hypotenuse → cos⁻¹.", "cos θ = 10/20 = 0.5, so θ = cos⁻¹(0.5) = 60°.",
        ["60°"]),
    ],
    independentPractice: [
      ans("tang-i1", "A right triangle has opposite side 3 and adjacent side 4. Find the angle to the nearest degree.", "", "37", 3,
        "Opposite and adjacent → tan⁻¹.", "tan θ = 3/4 = 0.75, so θ = tan⁻¹(0.75) = 36.87° ≈ 37°.",
        ["37°"]),
      mcq("tang-i2", "Given the OPPOSITE and ADJACENT sides, which inverse ratio finds the angle?", "C",
        ["sin⁻¹", "cos⁻¹", "tan⁻¹", "Pythagoras"], 3,
        "Opposite over adjacent.",
        "Opposite and adjacent are linked by tangent, so use tan⁻¹(opp/adj)."),
      ans("tang-i3", "Using the triangle, the opposite side is 8 and the hypotenuse is 10. Find the angle to the nearest degree.", "", "53", 3,
        "Opposite and hypotenuse → sin⁻¹.", "sin θ = 8/10 = 0.8, so θ = sin⁻¹(0.8) = 53.13° ≈ 53°.",
        ["53°"], { triangleDiagram: tri("Right triangle, right angle at A; opposite side to angle B is AC = 8, hypotenuse BC = 10; angle B unknown.", { AC: "8", BC: "10" }, { B: "?" }) }),
      ans("tang-i4", "A right triangle has adjacent side 12 and hypotenuse 13. Find the angle to the nearest degree.", "", "23", 3,
        "Adjacent and hypotenuse → cos⁻¹.", "cos θ = 12/13 = 0.923, so θ = cos⁻¹(0.923) = 22.6° ≈ 23°.",
        ["23°"]),
      ans("tang-i5", "A right triangle has opposite side 7 and adjacent side 24. Find the angle to the nearest degree.", "", "16", 3,
        "Opposite and adjacent → tan⁻¹.", "tan θ = 7/24 = 0.2917, so θ = tan⁻¹(0.2917) = 16.26° ≈ 16°.",
        ["16°"]),
    ],
    masteryQuiz: [
      ans("tang-m1", "A right triangle has opposite side 10 and hypotenuse 20. Find the angle.", "", "30", 2,
        "Opposite and hypotenuse → sin⁻¹.", "sin θ = 10/20 = 0.5, so θ = 30°.",
        ["30°"]),
      mcq("tang-m2", "Given the OPPOSITE side and the HYPOTENUSE, which ratio's inverse gives the angle?", "A",
        ["sine", "cosine", "tangent", "none"], 3,
        "Opposite over hypotenuse.",
        "Opposite and hypotenuse are linked by sine, so use sin⁻¹."),
      ans("tang-m3", "A right triangle has opposite side 6 and adjacent side 6. Find the angle.", "", "45", 3,
        "Opposite and adjacent → tan⁻¹.", "tan θ = 6/6 = 1, so θ = tan⁻¹(1) = 45°.",
        ["45°"]),
      ans("tang-m4", "A right triangle has adjacent side 5 and hypotenuse 10. Find the angle.", "", "60", 3,
        "Adjacent and hypotenuse → cos⁻¹.", "cos θ = 5/10 = 0.5, so θ = cos⁻¹(0.5) = 60°.",
        ["60°"]),
      mcq("tang-m5", "tan⁻¹(opposite ÷ adjacent) gives:", "B",
        ["the opposite side", "the angle", "the hypotenuse", "the adjacent side"], 3,
        "The inverse ratio returns an angle.",
        "Applying tan⁻¹ to opposite/adjacent returns the angle."),
      ans("tang-m6", "A right triangle has opposite side 9 and adjacent side 12. Find the angle to the nearest degree.", "", "37", 3,
        "Opposite and adjacent → tan⁻¹.", "tan θ = 9/12 = 0.75, so θ = tan⁻¹(0.75) = 36.87° ≈ 37°.",
        ["37°"]),
      ans("tang-m7", "A right triangle has opposite side 12 and hypotenuse 13. Find the angle to the nearest degree.", "", "67", 4,
        "Opposite and hypotenuse → sin⁻¹.", "sin θ = 12/13 = 0.923, so θ = sin⁻¹(0.923) = 67.4° ≈ 67°.",
        ["67°"]),
      mcq("tang-m8", "In a 3-4-5 right triangle, the smallest angle (opposite the side of length 3) is closest to:", "B",
        ["30°", "37°", "45°", "53°"], 4,
        "Use sin⁻¹(3/5) for the angle opposite the shortest side.",
        "The smallest angle is opposite the shortest side (3): sin θ = 3/5 = 0.6, θ = sin⁻¹(0.6) = 36.87° ≈ 37°."),
      ans("tang-m9", "A right triangle has adjacent side 8 and hypotenuse 17. Find the angle to the nearest degree.", "", "62", 4,
        "Adjacent and hypotenuse → cos⁻¹.", "cos θ = 8/17 = 0.4706, so θ = cos⁻¹(0.4706) = 61.9° ≈ 62°.",
        ["62°"]),
      ans("tang-m10", "A right triangle has opposite side 15 and adjacent side 8. Find the angle to the nearest degree.", "", "62", 4,
        "Opposite and adjacent → tan⁻¹.", "tan θ = 15/8 = 1.875, so θ = tan⁻¹(1.875) = 61.9° ≈ 62°.",
        ["62°"]),
    ],
    commonMistakes: [
      { mistake: "Using the ordinary ratio instead of its inverse.", fix: "To get an angle from sides, apply sin⁻¹, cos⁻¹ or tan⁻¹." },
      { mistake: "Defaulting to sine regardless of the sides given.", fix: "Choose the ratio from the two sides you actually have (SOH-CAH-TOA)." },
      { mistake: "Forgetting to round the angle.", fix: "Round to the nearest degree unless another precision is asked." },
      { mistake: "Calculator in radian mode.", fix: "Use degree mode so the inverse returns degrees." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 4H Angles of Elevation and Depression ────────────────────────────────────────────
export function year12Standard1ElevationDepressionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "elevation-depression") {
    return null;
  }
  return {
    description:
      "Solve problems with angles of elevation and depression by modelling them as right triangles and using trigonometry.",
    learningIntention:
      "Distinguish angles of elevation and depression and use trig to find heights and distances.",
    successCriteria: [
      "Define the angle of elevation as measured upward from the horizontal.",
      "Define the angle of depression as measured downward from the horizontal.",
      "Use the fact that elevation and depression between two points are equal.",
      "Set up a right triangle and use trig to find a height or distance.",
    ],
    teaching: {
      paragraphs: [
        "When you look at something ABOVE you, the angle your line of sight makes UP from the horizontal is the angle of ELEVATION. When you look at something BELOW you, the angle DOWN from the horizontal is the angle of DEPRESSION. Both are always measured from the HORIZONTAL, not from the vertical — that is the most common slip.",
        "There is a tidy fact that saves work: the angle of elevation from a lower point up to a higher one EQUALS the angle of depression from the higher point down to the lower one. They are alternate angles between two parallel horizontals, so a depression of 30° from a cliff to a boat means a 30° elevation from the boat to the cliff.",
        "Every such problem hides a right triangle: the horizontal distance is one side, the vertical height is another, and the line of sight is the hypotenuse, with the elevation/depression angle at the observer. Sketch it, label the angle and the known side, and pick the trig ratio with SOH-CAH-TOA.",
        "For instance, from 80 m away the elevation to a tower top is 45°: the height is the opposite side and the 80 m is the adjacent, so tan 45° = height/80, giving height = 80 × tan 45° = 80 m. Always start with a labelled sketch before reaching for a ratio.",
      ],
      latexBlocks: [
        "\\text{elevation: angle UP from the horizontal};\\ \\text{depression: angle DOWN from the horizontal}",
        "\\text{angle of elevation (A to B)} = \\text{angle of depression (B to A)}",
        "\\tan\\theta = \\frac{\\text{height}}{\\text{horizontal distance}}",
      ],
    },
    workedExamples: [
      {
        title: "Height from an angle of elevation",
        questionLatex: "\\text{From 80 m away, the angle of elevation to a tower top is } 45^\\circ.\\ \\text{Find the height.}",
        steps: [
          { explanation: "Height is opposite, 80 m is adjacent → tangent.", latex: "\\tan 45^\\circ = \\frac{\\text{height}}{80}" },
          { explanation: "Solve.", latex: "\\text{height} = 80 \\times 1 = 80 \\text{ m}" },
        ],
        finalAnswerLatex: "80 \\text{ m}",
      },
      {
        title: "Elevation equals depression",
        questionLatex: "\\text{The depression from a cliff to a boat is } 30^\\circ.\\ \\text{What is the elevation from the boat to the cliff?}",
        steps: [
          { explanation: "They are alternate angles, hence equal.", latex: "30^\\circ" },
        ],
        finalAnswerLatex: "30^\\circ",
      },
    ],
    guidedPractice: [
      mcq("eldep-g1", "The angle of elevation is measured:", "B",
        ["downward from the horizontal", "upward from the horizontal", "from the vertical", "from the ground straight up"], 1,
        "Elevation looks up.",
        "The angle of elevation is measured upward from the horizontal."),
      ans("eldep-g2", "From 80 m away, the angle of elevation to a tower top is 45°. Find the height of the tower.", "", "80", 2,
        "Height is opposite, 80 m adjacent → tangent.", "height = 80 × tan 45° = 80 × 1 = 80 m.",
        ["80 m"]),
      ans("eldep-g3", "From a point 100 m from a tower, the angle of elevation to the top is 30°. Find the height to 1 decimal place. (tan 30° = 0.5774)", "", "57.7", 2,
        "height = distance × tan(angle).", "height = 100 × tan 30° = 100 × 0.5774 = 57.7 m (1 dp).",
        ["57.7 m"]),
      ans("eldep-g4", "The angle of depression from a cliff top to a boat equals the angle of elevation from the boat to the cliff top. True or false?", "", "true", 2,
        "They are alternate angles between parallel horizontals.", "True — elevation and depression between the same two points are equal (alternate angles).",
        ["True"]),
    ],
    independentPractice: [
      ans("eldep-i1", "From 50 m away, the angle of elevation to a flagpole top is 60°. Find the height to 1 decimal place. (tan 60° = 1.7321)", "", "86.6", 3,
        "height = distance × tan(angle).", "height = 50 × tan 60° = 50 × 1.7321 = 86.6 m (1 dp).",
        ["86.6 m"]),
      mcq("eldep-i2", "The angle of depression is measured:", "B",
        ["upward from the horizontal", "downward from the horizontal", "from the vertical", "from straight down"], 3,
        "Depression looks down.",
        "The angle of depression is measured downward from the horizontal."),
      ans("eldep-i3", "A bird is 40 m high and 40 m horizontally from an observer. Find the angle of elevation to the bird.", "", "45", 3,
        "tan(angle) = height/distance, then inverse.", "tan θ = 40/40 = 1, so θ = tan⁻¹(1) = 45°.",
        ["45°"]),
      ans("eldep-i4", "From a 30 m cliff, the angle of depression to a boat is 30°. Find the boat's horizontal distance from the base to 1 decimal place. (tan 30° = 0.5774)", "", "52.0", 3,
        "tan(angle) = height/distance, so distance = height ÷ tan.", "distance = 30 ÷ tan 30° = 30 ÷ 0.5774 = 52.0 m (1 dp).",
        ["52 m", "52.0 m"]),
      ans("eldep-i5", "From the top of a 25 m building, the angle of depression to a car is 45°. Find the car's horizontal distance from the base.", "", "25", 3,
        "distance = height ÷ tan(angle).", "distance = 25 ÷ tan 45° = 25 ÷ 1 = 25 m.",
        ["25 m"]),
    ],
    masteryQuiz: [
      ans("eldep-m1", "From 120 m away, the angle of elevation to a tower top is 45°. Find the height.", "", "120", 2,
        "height = distance × tan(angle).", "height = 120 × tan 45° = 120 × 1 = 120 m.",
        ["120 m"]),
      mcq("eldep-m2", "Looking DOWN from a lighthouse to a ship, the angle from the horizontal is an angle of:", "B",
        ["elevation", "depression", "reflection", "rotation"], 3,
        "Looking down.",
        "Looking down from the horizontal gives an angle of depression."),
      ans("eldep-m3", "From 90 m away, the angle of elevation to a tower top is 30°. Find the height to 1 decimal place. (tan 30° = 0.5774)", "", "52.0", 3,
        "height = distance × tan(angle).", "height = 90 × tan 30° = 90 × 0.5774 = 52.0 m (1 dp).",
        ["52 m", "52.0 m"]),
      ans("eldep-m4", "From a 60 m cliff, the angle of depression to a boat is 45°. Find the boat's horizontal distance from the base.", "", "60", 3,
        "distance = height ÷ tan(angle).", "distance = 60 ÷ tan 45° = 60 ÷ 1 = 60 m.",
        ["60 m"]),
      mcq("eldep-m5", "The angle of elevation from A up to B equals the angle of depression from B down to A because they are:", "B",
        ["complementary angles", "alternate angles (equal)", "supplementary angles", "right angles"], 3,
        "Two parallel horizontals are cut by the line of sight.",
        "They are alternate angles between the two parallel horizontal lines, so they are equal."),
      ans("eldep-m6", "From 20 m away, the angle of elevation to a tree top is 60°. Find the height to 1 decimal place. (tan 60° = 1.7321)", "", "34.6", 3,
        "height = distance × tan(angle).", "height = 20 × tan 60° = 20 × 1.7321 = 34.6 m (1 dp).",
        ["34.6 m"]),
      ans("eldep-m7", "From 100 m away, the angle of elevation to a tower top is 30°. Find the height to the nearest metre. (tan 30° = 0.5774)", "", "58", 4,
        "height = distance × tan(angle), then round to a whole metre.", "height = 100 × tan 30° = 57.74 ≈ 58 m.",
        ["58 m"]),
      mcq("eldep-m8", "An angle of elevation or depression is always measured from the:", "B",
        ["vertical", "horizontal", "line of sight", "ground only when standing"], 3,
        "Both are from the horizontal.",
        "Angles of elevation and depression are always measured from the horizontal."),
      ans("eldep-m9", "A kite is on a 50 m string at an angle of elevation of 40°. Find the kite's height to 1 decimal place. (sin 40° = 0.6428)", "", "32.1", 4,
        "The string is the hypotenuse; height is opposite → sine.", "height = 50 × sin 40° = 50 × 0.6428 = 32.1 m (1 dp).",
        ["32.1 m"]),
      ans("eldep-m10", "From a 50 m lighthouse, the angle of depression to a boat is 25°. Find the boat's horizontal distance from the base to the nearest metre. (tan 25° = 0.4663)", "", "107", 4,
        "distance = height ÷ tan(angle).", "distance = 50 ÷ tan 25° = 50 ÷ 0.4663 = 107.2 ≈ 107 m.",
        ["107 m"]),
    ],
    commonMistakes: [
      { mistake: "Measuring the angle from the vertical.", fix: "Elevation and depression are measured from the horizontal." },
      { mistake: "Confusing elevation with depression.", fix: "Looking up = elevation; looking down = depression." },
      { mistake: "Not using elevation = depression.", fix: "The two angles between the same points are equal (alternate angles)." },
      { mistake: "Choosing the wrong ratio or dividing the wrong way.", fix: "Sketch the right triangle, label the sides, then apply SOH-CAH-TOA." },
    ],
    masteryPassMark: 0.8,
  };
}
