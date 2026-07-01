// Year 9 Wave 4 — Chapter 3, angle/application/bearings sections (ADR-Y9-001, all core):
// finding-unknown-angles, trigonometry-applications, bearings. Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import { year9TrigAngleVisuals } from "../year9TrigAngleVisuals";
import { year9TrigApplicationVisuals } from "../year9TrigApplicationVisuals";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Pick the ratio (or inverse) that links what you know to what you want.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about what is known and what is wanted.", explanation };
}
const deg = (a: string) => [a, `${a}°`, `${a} degrees`];
const brg = (a: string) => [a, `${a}°`, `${a} T`, `${parseInt(a, 10)}`];

// ── finding-unknown-angles (core) ──────────────────────────────────────────────────────
const findingUnknownAngles: Partial<ExplicitLesson> = {
  description: "Find an unknown angle using the inverse trigonometric functions.",
  learningIntention: "Use inverse sin, cos and tan to find an angle.",
  successCriteria: ["Recognise when to use an inverse function.", "Find an angle from a known ratio.", "Find an angle from two sides.", "Round to a given accuracy."],
  teaching: {
    paragraphs: [
      "To find an ANGLE when you know a ratio, use the INVERSE function. If sin θ = 0.5, then θ = sin⁻¹(0.5) = 30°.",
      "Likewise cos θ = 0.5 gives θ = cos⁻¹(0.5) = 60°, and tan θ = 1 gives θ = tan⁻¹(1) = 45°.",
      "From two SIDES, form the ratio first, then take the inverse: with opposite 3 and adjacent 4, tan θ = 0.75, so θ = tan⁻¹(0.75) ≈ 36.9°.",
      "Keep the calculator in degrees and round as asked.",
    ],
    latexBlocks: ["\\sin\\theta = 0.5 \\Rightarrow \\theta = 30^\\circ", "\\tan\\theta = \\tfrac34 \\Rightarrow \\theta \\approx 36.9^\\circ"],
  },
  workedExamples: [
    { title: "Inverse sine", questionLatex: "\\sin\\theta = 0.5. \\text{ Find } \\theta.", steps: [{ explanation: "sin⁻¹(0.5).", latex: "30^\\circ" }], finalAnswerLatex: "30^\\circ" },
    { title: "Inverse cosine", questionLatex: "\\cos\\theta = 0.5. \\text{ Find } \\theta.", steps: [{ explanation: "cos⁻¹(0.5).", latex: "60^\\circ" }], finalAnswerLatex: "60^\\circ" },
    { title: "Inverse tangent", questionLatex: "\\tan\\theta = 1. \\text{ Find } \\theta.", steps: [{ explanation: "tan⁻¹(1).", latex: "45^\\circ" }], finalAnswerLatex: "45^\\circ" },
  ],
  guidedPractice: [
    ans("y9-fua-g1", "sin θ = 0.5. Find θ (degrees).", "", "30", 2, "sin⁻¹(0.5) = 30°.", deg("30")),
    ans("y9-fua-g2", "cos θ = 0.5. Find θ (degrees).", "", "60", 2, "cos⁻¹(0.5) = 60°.", deg("60")),
    ans("y9-fua-g3", "tan θ = 1. Find θ (degrees).", "", "45", 2, "tan⁻¹(1) = 45°.", deg("45")),
    mcq("y9-fua-g4", "To find an angle from a ratio, you use:", "B", ["the ratio directly", "the inverse trig function", "Pythagoras", "the hypotenuse"], 2, "Use sin⁻¹, cos⁻¹ or tan⁻¹."),
  ],
  independentPractice: [
    ans("y9-fua-i1", "sin θ = 0.5. Find θ.", "", "30", 2, "30°.", deg("30")),
    ans("y9-fua-i2", "tan θ = 1. Find θ.", "", "45", 2, "45°.", deg("45")),
    ans("y9-fua-i3", "cos θ = 0.5. Find θ.", "", "60", 2, "60°.", deg("60")),
    ans("y9-fua-i4", "Opposite 3, adjacent 4. Find θ (1 d.p.).", "", "36.9", 3, "tan⁻¹(0.75) ≈ 36.9°.", deg("36.9")),
    mcq("y9-fua-i5", "If sin θ = 0.5 then θ is:", "A", ["30°", "45°", "60°", "90°"], 2, "sin 30° = 0.5."),
  ],
  masteryQuiz: [
    ans("y9-fua-m1", "sin θ = 0.5. Find θ.", "", "30", 2, "30°.", deg("30")),
    ans("y9-fua-m2", "cos θ = 0.5. Find θ.", "", "60", 2, "60°.", deg("60")),
    ans("y9-fua-m3", "tan θ = 1. Find θ.", "", "45", 2, "45°.", deg("45")),
    mcq("y9-fua-m4", "The function sin⁻¹ gives:", "A", ["an angle", "a ratio", "a side length", "the hypotenuse"], 2, "Inverse sine returns the angle."),
    ans("y9-fua-m5", "Opposite 5, hypotenuse 10. Find θ.", "", "30", 3, "sin θ = 0.5 → 30°.", deg("30")),
    ans("y9-fua-m6", "Adjacent 5, hypotenuse 10. Find θ.", "", "60", 3, "cos θ = 0.5 → 60°.", deg("60")),
    ans("y9-fua-m7", "Opposite 4, adjacent 4. Find θ.", "", "45", 3, "tan θ = 1 → 45°.", deg("45")),
    ans("y9-fua-m8", "sin θ = 0.866. Find θ.", "", "60", 3, "sin⁻¹(0.866) ≈ 60°.", deg("60")),
    ans("y9-fua-m9", "cos θ = 0.866. Find θ.", "", "30", 3, "cos⁻¹(0.866) ≈ 30°.", deg("30")),
    mcq("y9-fua-m10", "To find θ from opposite and adjacent, use:", "C", ["sin⁻¹", "cos⁻¹", "tan⁻¹", "Pythagoras"], 2, "tan θ = opp/adj → tan⁻¹."),
  ],
  masteryQuizPool: [
    ans("y9-fua-p1", "Opposite 5, adjacent 12. Find θ (1 d.p.).", "", "22.6", 5, "tan⁻¹(0.4167) ≈ 22.6°.", deg("22.6")),
    ans("y9-fua-p2", "sin θ = 0.6. Find θ (1 d.p.).", "", "36.9", 5, "sin⁻¹(0.6) ≈ 36.9°.", deg("36.9")),
    ans("y9-fua-p3", "cos θ = 0.8. Find θ (1 d.p.).", "", "36.9", 5, "cos⁻¹(0.8) ≈ 36.9°.", deg("36.9")),
    ans("y9-fua-p4", "Opposite 8, adjacent 15. Find θ (1 d.p.).", "", "28.1", 5, "tan⁻¹(0.533) ≈ 28.1°.", deg("28.1")),
    ans("y9-fua-p5", "Opposite 7, hypotenuse 25. Find θ (1 d.p.).", "", "16.3", 5, "sin⁻¹(0.28) ≈ 16.3°.", deg("16.3")),
    ans("y9-fua-p6", "Adjacent 24, hypotenuse 25. Find θ (1 d.p.).", "", "16.3", 5, "cos⁻¹(0.96) ≈ 16.3°.", deg("16.3")),
    ans("y9-fua-p7", "tan θ = 2. Find θ (1 d.p.).", "", "63.4", 5, "tan⁻¹(2) ≈ 63.4°.", deg("63.4")),
    ans("y9-fua-p8", "Opposite 9, adjacent 12. Find θ (1 d.p.).", "", "36.9", 5, "tan⁻¹(0.75) ≈ 36.9°.", deg("36.9")),
    ans("y9-fua-p9", "sin θ = 0.25. Find θ (1 d.p.).", "", "14.5", 5, "sin⁻¹(0.25) ≈ 14.5°.", deg("14.5")),
    ans("y9-fua-p10", "A ramp rises 3 m over a 5 m slope. Find the angle of the ramp (1 d.p.).", "", "36.9", 5, "sin θ = 0.6 → 36.9°.", deg("36.9")),
  ],
  commonMistakes: [
    { mistake: "Using the ratio instead of its inverse.", fix: "To get the angle, apply sin⁻¹/cos⁻¹/tan⁻¹." },
    { mistake: "Choosing the wrong inverse for the given sides.", fix: "Match sides to SOH CAH TOA first." },
    { mistake: "Calculator in radians.", fix: "Switch to degrees." },
    { mistake: "Forgetting to round as asked.", fix: "Round to the requested decimal place." },
  ],
  masteryPassMark: 0.8,
};

// ── trigonometry-applications (core) ───────────────────────────────────────────────────
const trigApplications: Partial<ExplicitLesson> = {
  description: "Apply trigonometry to angles of elevation and depression and other real problems.",
  learningIntention: "Use trigonometry to solve practical right-triangle problems.",
  successCriteria: ["Identify the right triangle in a scenario.", "Use angles of elevation and depression.", "Find heights and distances.", "Find an angle in context."],
  teaching: {
    paragraphs: [
      "Many real problems form a right triangle. The ANGLE OF ELEVATION is measured upward from the horizontal; the ANGLE OF DEPRESSION is measured downward from the horizontal.",
      "Choose the ratio that links what you know to what you want. A 10 m ramp at 30° rises 10 × sin 30° = 5 m.",
      "If a 45° angle of elevation is measured from 8 m away to the top of a tree, the height is 8 × tan 45° = 8 m.",
      "To find an ANGLE, use the inverse function: a building 30 m high seen from 30 m away gives tan⁻¹(30/30) = 45°.",
    ],
    latexBlocks: ["\\text{height} = 10\\sin30^\\circ = 5", "\\text{height} = 8\\tan45^\\circ = 8"],
  },
  workedExamples: [
    { title: "Ramp height", questionLatex: "\\text{10 m ramp at } 30^\\circ. \\text{ Height?}", steps: [{ explanation: "10 × sin 30°.", latex: "5\\text{ m}" }], finalAnswerLatex: "5\\text{ m}" },
    { title: "Tree height", questionLatex: "45^\\circ \\text{ elevation, } 8\\text{ m away. Height?}", steps: [{ explanation: "8 × tan 45°.", latex: "8\\text{ m}" }], finalAnswerLatex: "8\\text{ m}" },
    { title: "Find the angle", questionLatex: "\\text{30 m high, 30 m away. Elevation?}", steps: [{ explanation: "tan⁻¹(30/30).", latex: "45^\\circ" }], finalAnswerLatex: "45^\\circ" },
  ],
  guidedPractice: [
    ans("y9-tap-g1", "A 20 m ramp rises at 30°. Find its height.", "", "10", 2, "20 × 0.5 = 10 m.", ["10", "10 m"]),
    ans("y9-tap-g2", "The angle of elevation to a tree top is 45° from 12 m away. Find the height.", "", "12", 2, "12 × 1 = 12 m.", ["12", "12 m"]),
    ans("y9-tap-g3", "A 10 m ladder leans at 60° to the ground. Find the height it reaches (1 d.p.).", "", "8.7", 3, "10 × 0.866 ≈ 8.7 m.", ["8.7", "8.7 m"]),
    mcq("y9-tap-g4", "The angle of elevation is measured:", "A", ["upward from the horizontal", "downward from the horizontal", "from the vertical", "from the ground up to the side"], 2, "Elevation is measured up from horizontal."),
  ],
  independentPractice: [
    ans("y9-tap-i1", "From 30 m away the angle of elevation to a flagpole top is 30°. Find its height (1 d.p.).", "", "17.3", 3, "30 × 0.577 ≈ 17.3 m.", ["17.3", "17.3 m"]),
    ans("y9-tap-i2", "A slide is 8 m long at 45° to the ground. Find its height (1 d.p.).", "", "5.7", 3, "8 × 0.707 ≈ 5.7 m.", ["5.7", "5.7 m"]),
    ans("y9-tap-i3", "A building is 50 m high, viewed from 50 m away. Find the angle of elevation.", "", "45", 3, "tan⁻¹(1) = 45°.", deg("45")),
    mcq("y9-tap-i4", "The angle of depression is measured:", "B", ["upward from the horizontal", "downward from the horizontal", "from the vertical", "from the ground"], 2, "Depression is measured down from horizontal."),
    ans("y9-tap-i5", "A 16 m ramp rises at 30°. Find its height.", "", "8", 2, "16 × 0.5 = 8 m.", ["8", "8 m"]),
  ],
  masteryQuiz: [
    ans("y9-tap-m1", "A 10 m ramp rises at 30°. Find its height.", "", "5", 2, "5 m.", ["5", "5 m"]),
    ans("y9-tap-m2", "A 45° angle of elevation is measured from 10 m away. Find the height.", "", "10", 2, "10 m.", ["10", "10 m"]),
    ans("y9-tap-m3", "A 12 m ladder leans at 60° to the ground. Find the height (1 d.p.).", "", "10.4", 3, "12 × 0.866 ≈ 10.4 m.", ["10.4", "10.4 m"]),
    mcq("y9-tap-m4", "To find a height from an angle and a horizontal distance, you usually use:", "C", ["sin", "cos", "tan", "Pythagoras"], 3, "Opposite (height) and adjacent (distance) → tan."),
    ans("y9-tap-m5", "A tower is viewed from 20 m away with a 45° elevation. Find its height.", "", "20", 2, "20 m.", ["20", "20 m"]),
    ans("y9-tap-m6", "A 20 m slide is at 30° to the ground. Find its height.", "", "10", 2, "10 m.", ["10", "10 m"]),
    ans("y9-tap-m7", "From a cliff, the angle of depression to a boat 30 m away (horizontally) is 45°. Find the cliff height.", "", "30", 3, "30 × 1 = 30 m.", ["30", "30 m"]),
    ans("y9-tap-m8", "The angle of elevation is 60° from 10 m away. Find the height (1 d.p.).", "", "17.3", 3, "10 × 1.732 ≈ 17.3 m.", ["17.3", "17.3 m"]),
    ans("y9-tap-m9", "A ramp rises 5 m over a 10 m length. Find its angle.", "", "30", 3, "sin θ = 5/10 = 0.5 → 30°.", deg("30")),
    mcq("y9-tap-m10", "An angle of depression from the top equals the angle of elevation from the bottom because they are:", "A", ["alternate angles (parallel horizontals)", "vertically opposite", "supplementary", "right angles"], 4, "Equal alternate angles between parallel horizontal lines."),
  ],
  masteryQuizPool: [
    ans("y9-tap-p1", "A building 30 m high is seen from 40 m away. Find the angle of elevation (1 d.p.).", "", "36.9", 5, "tan⁻¹(0.75) ≈ 36.9°.", deg("36.9")),
    ans("y9-tap-p2", "A 15 m wire reaches the top of a pole at 60° to the ground. Find the pole's height (1 d.p.).", "", "13.0", 5, "15 × 0.866 ≈ 13.0 m.", ["13", "13.0", "13 m"]),
    ans("y9-tap-p3", "The angle of depression to a boat is 30° from a 50 m cliff. Find the horizontal distance (1 d.p.).", "", "86.6", 5, "50 ÷ 0.577 ≈ 86.6 m.", ["86.6", "86.6 m"]),
    ans("y9-tap-p4", "A kite string is 50 m long at 40° to the ground. Find the kite's height (1 d.p., sin 40° ≈ 0.643).", "", "32.1", 5, "50 × 0.643 ≈ 32.1 m.", ["32.1", "32.1 m"]),
    ans("y9-tap-p5", "A 25 m ladder reaches 24 m up a wall. Find the angle with the ground (1 d.p.).", "", "73.7", 5, "sin⁻¹(0.96) ≈ 73.7°.", deg("73.7")),
    ans("y9-tap-p6", "From 100 m away, a tower's top has elevation 30°. Find its height (1 d.p.).", "", "57.7", 5, "100 × 0.577 ≈ 57.7 m.", ["57.7", "57.7 m"]),
    ans("y9-tap-p7", "A road climbs at 5° over 2000 m of slope. Find the height gained (1 d.p.).", "", "174.3", 5, "2000 × sin 5° ≈ 174.3 m.", ["174.3 m", "174.4", "174.4 m"]),
    ans("y9-tap-p8", "A 12 m ladder's base is 5 m from a wall. Find the angle it makes with the ground (1 d.p.).", "", "65.4", 5, "cos⁻¹(0.4167) ≈ 65.4°.", deg("65.4")),
    ans("y9-tap-p9", "The angle of elevation to a 20 m tree is 35° (tan 35° ≈ 0.700). Find the horizontal distance (1 d.p.).", "", "28.6", 5, "20 ÷ 0.700 ≈ 28.6 m.", ["28.6", "28.6 m"]),
    ans("y9-tap-p10", "A plane descends at 3° over a 5000 m flight path. Find the height lost (1 d.p.).", "", "261.7", 5, "5000 × sin 3° ≈ 261.7 m.", ["261.7 m", "261.5", "261.5 m"]),
  ],
  commonMistakes: [
    { mistake: "Confusing elevation and depression.", fix: "Elevation looks up; depression looks down." },
    { mistake: "Choosing the wrong ratio for the sides involved.", fix: "Identify opposite/adjacent/hypotenuse first." },
    { mistake: "Multiplying when the unknown is in the denominator.", fix: "Divide to find a side under the ratio." },
    { mistake: "Not drawing the diagram.", fix: "Sketch and label before computing." },
  ],
  masteryPassMark: 0.8,
};

// ── bearings (core) ────────────────────────────────────────────────────────────────────
const bearings: Partial<ExplicitLesson> = {
  description: "Use three-figure compass bearings and find back (reverse) bearings.",
  learningIntention: "Read and calculate three-figure bearings.",
  successCriteria: ["Measure bearings clockwise from north.", "Convert compass directions to bearings.", "Find a back bearing.", "Apply bearings to simple problems."],
  teaching: {
    paragraphs: [
      "A THREE-FIGURE BEARING is measured CLOCKWISE from NORTH and always written with three digits: north is 000°, east 090°, south 180°, west 270°.",
      "Compass points convert directly: NE = 045°, SE = 135°, SW = 225°, NW = 315°.",
      "A BACK BEARING (reverse direction) differs by 180°: if it's under 180°, ADD 180°; if it's 180° or more, SUBTRACT 180°. The back bearing of 060° is 240°.",
      "Bearings let you describe and calculate directions of travel between points.",
    ],
    latexBlocks: ["N = 000^\\circ,\\ E = 090^\\circ,\\ S = 180^\\circ,\\ W = 270^\\circ", "\\text{back bearing of } 060^\\circ = 240^\\circ"],
  },
  workedExamples: [
    { title: "Direction to bearing", questionLatex: "\\text{Bearing of due east?}", steps: [{ explanation: "Clockwise from N.", latex: "090^\\circ" }], finalAnswerLatex: "090^\\circ" },
    { title: "Compass point", questionLatex: "\\text{Bearing of NE?}", steps: [{ explanation: "Halfway N to E.", latex: "045^\\circ" }], finalAnswerLatex: "045^\\circ" },
    { title: "Back bearing", questionLatex: "\\text{Back bearing of } 060^\\circ?", steps: [{ explanation: "60 + 180.", latex: "240^\\circ" }], finalAnswerLatex: "240^\\circ" },
  ],
  guidedPractice: [
    ans("y9-brg-g1", "Write the bearing of due east.", "\\text{east}", "090", 2, "090°.", brg("090")),
    ans("y9-brg-g2", "Write the bearing of due south.", "\\text{south}", "180", 2, "180°.", brg("180")),
    ans("y9-brg-g3", "Find the back bearing of 090°.", "", "270", 2, "90 + 180 = 270°.", brg("270")),
    mcq("y9-brg-g4", "Bearings are measured:", "A", ["clockwise from north", "anticlockwise from north", "clockwise from east", "from the south"], 2, "Clockwise from north."),
  ],
  independentPractice: [
    ans("y9-brg-i1", "Write the bearing of due west.", "\\text{west}", "270", 2, "270°.", brg("270")),
    ans("y9-brg-i2", "Find the back bearing of 120°.", "", "300", 3, "120 + 180 = 300°.", brg("300")),
    ans("y9-brg-i3", "Write the bearing of NE.", "\\text{NE}", "045", 2, "045°.", brg("045")),
    ans("y9-brg-i4", "Find the back bearing of 200°.", "", "020", 3, "200 − 180 = 020°.", brg("020")),
    mcq("y9-brg-i5", "The bearing of due south is:", "C", ["000°", "090°", "180°", "270°"], 2, "South = 180°."),
  ],
  masteryQuiz: [
    ans("y9-brg-m1", "Write the bearing of due north.", "\\text{north}", "000", 2, "000° (or 360°).", ["000", "360", "000°", "360°"]),
    ans("y9-brg-m2", "Find the back bearing of 050°.", "", "230", 3, "50 + 180 = 230°.", brg("230")),
    ans("y9-brg-m3", "Write the bearing of SW.", "\\text{SW}", "225", 2, "225°.", brg("225")),
    ans("y9-brg-m4", "Find the back bearing of 315°.", "", "135", 3, "315 − 180 = 135°.", brg("135")),
    mcq("y9-brg-m5", "A three-figure bearing is measured clockwise from:", "A", ["north", "east", "south", "west"], 2, "From north, clockwise."),
    ans("y9-brg-m6", "Write the bearing of SE.", "\\text{SE}", "135", 2, "135°.", brg("135")),
    ans("y9-brg-m7", "Find the back bearing of 080°.", "", "260", 3, "80 + 180 = 260°.", brg("260")),
    ans("y9-brg-m8", "Write the bearing of due south.", "\\text{south}", "180", 2, "180°.", brg("180")),
    ans("y9-brg-m9", "Find the back bearing of 170°.", "", "350", 3, "170 + 180 = 350°.", brg("350")),
    mcq("y9-brg-m10", "The bearing of NW is:", "D", ["045°", "135°", "225°", "315°"], 2, "NW = 315°."),
  ],
  masteryQuizPool: [
    ans("y9-brg-p1", "Find the back bearing of 025°.", "", "205", 5, "25 + 180 = 205°.", brg("205")),
    ans("y9-brg-p2", "Find the back bearing of 250°.", "", "070", 5, "250 − 180 = 070°.", brg("070")),
    ans("y9-brg-p3", "B is on a bearing of 110° from A. Find the bearing of A from B.", "", "290", 5, "110 + 180 = 290°.", brg("290")),
    ans("y9-brg-p4", "A ship turns from a bearing of 040° to 130°. Through what angle did it turn?", "", "90", 5, "130 − 40 = 90°.", deg("90")),
    ans("y9-brg-p5", "Find the back bearing of 300°.", "", "120", 5, "300 − 180 = 120°.", brg("120")),
    ans("y9-brg-p6", "Write the bearing of a direction halfway between north (000°) and east (090°).", "\\text{NE}", "045", 5, "NE = 045°.", brg("045")),
    ans("y9-brg-p7", "X is on a bearing of 215° from Y. Find the bearing of Y from X.", "", "035", 5, "215 − 180 = 035°.", brg("035")),
    ans("y9-brg-p8", "A walker on 070° turns clockwise to face 160°. Find the turn angle.", "", "90", 5, "160 − 70 = 90°.", deg("90")),
    ans("y9-brg-p9", "Find the back bearing of 015°.", "", "195", 5, "15 + 180 = 195°.", brg("195")),
    ans("y9-brg-p10", "Two towns: B is due east of A (090°). What is the bearing of A from B?", "", "270", 5, "90 + 180 = 270° (due west).", brg("270")),
  ],
  commonMistakes: [
    { mistake: "Writing a bearing with fewer than three digits.", fix: "Use three figures, e.g. 045°, not 45°." },
    { mistake: "Measuring anticlockwise or from a different point.", fix: "Always clockwise from north." },
    { mistake: "Adding 180° when the bearing is already ≥ 180°.", fix: "Subtract 180° if the bearing is 180° or more." },
    { mistake: "Confusing a back bearing with the original.", fix: "A back bearing reverses the direction (±180°)." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "finding-unknown-angles": findingUnknownAngles,
  "trigonometry-applications": trigApplications,
  "bearings": bearings,
};

function addTrigAngleVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = year9TrigAngleVisuals[question.id] ?? year9TrigApplicationVisuals[question.id];
  return visual ? { ...question, ...visual } : question;
}

function addTrigAngleVisuals(content: Partial<ExplicitLesson>): Partial<ExplicitLesson> {
  return {
    ...content,
    guidedPractice: content.guidedPractice?.map(addTrigAngleVisual),
    independentPractice: content.independentPractice?.map(addTrigAngleVisual),
    masteryQuiz: content.masteryQuiz?.map(addTrigAngleVisual),
    masteryQuizPool: content.masteryQuizPool?.map(addTrigAngleVisual),
    multiPartPractice: content.multiPartPractice?.map(addTrigAngleVisual),
  };
}

export function year9Chapter3TrigApplicationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "pythagoras-trigonometry") {
    return null;
  }
  const content = SECTIONS[lesson.slug];
  if (!content) return null;
  return ["finding-unknown-angles", "trigonometry-applications"].includes(lesson.slug)
    ? addTrigAngleVisuals(content)
    : content;
}
