// Year 10 restructure — Wave 11 (Trigonometry, FINAL authoring wave). Authors the last 4 hidden
// stubs in Unit 6 (trigonometry): the-unit-circle (6I, path), graphs-trig-functions (6J, path),
// exact-values-trig-equations (6K, extending), trig-applications-3d (6E, extending). Provides
// LESSON CONTENT ONLY -- never touches skillCheckpoints / skill IDs (G3: 17 checkpoints + 12
// skill IDs stay byte-identical). Prose uses unicode superscripts (no raw ^ or _). Concept-first:
// the unit circle is taught as coordinates (cos = x, sin = y); no advanced identities.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Picture the point on the unit circle, then read its coordinates.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Reason from the unit-circle coordinates, then check each option.", explanation };
}

// ── 6I The Unit Circle (path) ──────────────────────────────────────────────────────────
const unitCircle: Partial<ExplicitLesson> = {
  description: "Define the unit circle and read cosine and sine as the x- and y-coordinates of a point on it.",
  learningIntention: "Connect angles to points on the unit circle and read sine and cosine as coordinates.",
  successCriteria: ["State that the unit circle has radius 1 centred at the origin.", "Read cos θ as the x-coordinate and sin θ as the y-coordinate.", "Find sine/cosine of 0°, 90°, 180°, 270°, 360°.", "Use quadrant symmetry for signs."],
  teaching: {
    paragraphs: [
      "The UNIT CIRCLE is the circle of radius 1 centred at the origin. Its power is that it turns angles into COORDINATES: the point reached by rotating an angle θ from the positive x-axis is exactly (cos θ, sin θ). So COSINE IS THE x-COORDINATE and SINE IS THE y-COORDINATE — not formulas to memorise, but positions to read off.",
      "At 0° the point is (1, 0), so cos 0° = 1 and sin 0° = 0. At 90° the point is (0, 1), so cos 90° = 0 and sin 90° = 1. At 180° it is (−1, 0); at 270° it is (0, −1).",
      "Because cosine and sine are just coordinates, their SIGNS follow the quadrants: in the first quadrant both x and y are positive (both positive); in the second, x is negative so cosine is negative while sine stays positive; and so on around the circle.",
      "This coordinate picture is the whole idea — read the point, read the values. There is no need for identities here; the symmetry of the circle gives the patterns.",
    ],
    latexBlocks: ["\\text{point at angle } \\theta = (\\cos\\theta,\\ \\sin\\theta)", "\\cos\\theta = x\\text{-coordinate},\\quad \\sin\\theta = y\\text{-coordinate}", "(1,0) \\text{ at } 0^\\circ,\\ (0,1) \\text{ at } 90^\\circ"],
  },
  workedExamples: [
    { title: "Reading at 0°", questionLatex: "\\text{Find } \\cos 0^\\circ \\text{ and } \\sin 0^\\circ.", steps: [{ explanation: "Point at 0° is (1, 0).", latex: "\\cos 0^\\circ = 1,\\ \\sin 0^\\circ = 0" }], finalAnswerLatex: "1 \\text{ and } 0" },
    { title: "Reading at 90°", questionLatex: "\\text{Find } \\sin 90^\\circ.", steps: [{ explanation: "Point at 90° is (0, 1); sine is the y-coordinate.", latex: "\\sin 90^\\circ = 1" }], finalAnswerLatex: "1" },
    { title: "A negative coordinate", questionLatex: "\\text{Find } \\cos 180^\\circ.", steps: [{ explanation: "Point at 180° is (−1, 0); cosine is the x-coordinate.", latex: "\\cos 180^\\circ = -1" }], finalAnswerLatex: "-1" },
  ],
  guidedPractice: [
    mcq("y10-uc-g1", "On the unit circle, the x-coordinate of a point is:", "A", ["cos θ", "sin θ", "tan θ", "the radius"], 3, "Cosine is the x-coordinate."),
    mcq("y10-uc-g2", "On the unit circle, the y-coordinate of a point is:", "B", ["cos θ", "sin θ", "tan θ", "the angle"], 3, "Sine is the y-coordinate."),
    ans("y10-uc-g3", "Find cos 0°.", "\\cos 0^\\circ", "1", 2, "The point at 0° is (1, 0), so cos 0° = 1.", []),
    ans("y10-uc-g4", "Find sin 90°.", "\\sin 90^\\circ", "1", 2, "The point at 90° is (0, 1), so sin 90° = 1.", []),
  ],
  independentPractice: [
    ans("y10-uc-i1", "Find cos 90°.", "\\cos 90^\\circ", "0", 3, "The point at 90° is (0, 1); the x-coordinate is 0.", []),
    ans("y10-uc-i2", "Find sin 0°.", "\\sin 0^\\circ", "0", 2, "The point at 0° is (1, 0); the y-coordinate is 0.", []),
    ans("y10-uc-i3", "Find cos 180°.", "\\cos 180^\\circ", "-1", 3, "The point at 180° is (−1, 0).", ["−1"]),
    mcq("y10-uc-i4", "The unit circle has radius:", "A", ["1", "2", "0", "π"], 2, "By definition the unit circle has radius 1."),
    ans("y10-uc-i5", "Find sin 180°.", "\\sin 180^\\circ", "0", 3, "The point at 180° is (−1, 0); the y-coordinate is 0.", []),
  ],
  masteryQuiz: [
    ans("y10-uc-m1", "Find cos 0°.", "\\cos 0^\\circ", "1", 2, "Point (1, 0).", []),
    ans("y10-uc-m2", "Find sin 90°.", "\\sin 90^\\circ", "1", 2, "Point (0, 1).", []),
    mcq("y10-uc-m3", "A point on the unit circle at angle θ is:", "C", ["(sin θ, cos θ)", "(θ, θ)", "(cos θ, sin θ)", "(1, θ)"], 3, "The coordinates are (cos θ, sin θ)."),
    ans("y10-uc-m4", "Find sin 270°.", "\\sin 270^\\circ", "-1", 3, "The point at 270° is (0, −1).", ["−1"]),
    ans("y10-uc-m5", "Find cos 360°.", "\\cos 360^\\circ", "1", 3, "360° returns to (1, 0).", []),
    mcq("y10-uc-m6", "In the first quadrant, sine and cosine are both:", "A", ["positive", "negative", "zero", "undefined"], 3, "Both x and y are positive there."),
    ans("y10-uc-m7", "Find cos 270°.", "\\cos 270^\\circ", "0", 3, "The point at 270° is (0, −1); the x-coordinate is 0.", []),
    mcq("y10-uc-m8", "In the second quadrant, cosine is:", "B", ["positive", "negative", "zero", "1"], 4, "x is negative in the second quadrant, so cosine is negative."),
    ans("y10-uc-m9", "Find sin 360°.", "\\sin 360^\\circ", "0", 3, "360° returns to (1, 0); the y-coordinate is 0.", []),
    mcq("y10-uc-m10", "The unit circle is centred at:", "A", ["the origin", "(1, 1)", "(1, 0)", "(0, 1)"], 2, "It is centred at the origin (0, 0)."),
  ],
  commonMistakes: [
    { mistake: "Swapping sine and cosine.", fix: "Cosine is the x-coordinate; sine is the y-coordinate." },
    { mistake: "Memorising values without the circle.", fix: "Read the point's coordinates — that gives the value." },
    { mistake: "Getting signs wrong in different quadrants.", fix: "The sign follows the coordinate's sign in that quadrant." },
    { mistake: "Forgetting the radius is 1.", fix: "On the unit circle the coordinates ARE cos θ and sin θ." },
  ],
  masteryPassMark: 0.8,
};

// ── 6J Graphs of Trigonometric Functions (path) ────────────────────────────────────────
const graphsTrig: Partial<ExplicitLesson> = {
  description: "Read the graphs of y = sin x and y = cos x as motion around the unit circle, with period and amplitude.",
  learningIntention: "Relate the sine and cosine graphs to the unit circle and identify period and amplitude.",
  successCriteria: ["See y = sin x as the y-coordinate moving around the circle.", "State the period (360°) of sine and cosine.", "State the amplitude (1).", "Read key points of the graphs."],
  teaching: {
    paragraphs: [
      "The graph of y = sin x is the STORY of the unit circle in motion: as the angle x increases, sin x is just the y-coordinate of the point travelling around the circle. y = cos x traces the x-coordinate the same way.",
      "Going once around the circle is 360°, so both graphs REPEAT every 360° — that repeat length is the PERIOD. After 360° the pattern starts again.",
      "The point never leaves the unit circle, so the coordinates stay between −1 and 1: the graphs rise to 1 and fall to −1. The AMPLITUDE — the height from the centre line to the peak — is 1.",
      "Key points come straight from the circle: y = sin x passes through (0°, 0), (90°, 1), (180°, 0), (270°, −1), (360°, 0); y = cos x starts at (0°, 1). Read the graph as motion, not as a shape to memorise.",
    ],
    latexBlocks: ["y = \\sin x:\\ \\text{the } y\\text{-coordinate around the circle}", "\\text{period} = 360^\\circ,\\quad \\text{amplitude} = 1", "\\sin x \\in [-1,\\ 1]"],
  },
  workedExamples: [
    { title: "Period", questionLatex: "\\text{State the period of } y = \\sin x.", steps: [{ explanation: "Once around the circle.", latex: "360^\\circ" }], finalAnswerLatex: "360^\\circ" },
    { title: "Amplitude", questionLatex: "\\text{State the amplitude of } y = \\sin x.", steps: [{ explanation: "Max 1, min −1; height from centre.", latex: "1" }], finalAnswerLatex: "1" },
    { title: "A key point", questionLatex: "\\text{Find } y = \\sin x \\text{ at } x = 90^\\circ.", steps: [{ explanation: "The y-coordinate at 90° is 1.", latex: "1" }], finalAnswerLatex: "1" },
  ],
  guidedPractice: [
    ans("y10-gtf-g1", "State the period of y = sin x (in degrees).", "\\text{period}", "360", 3, "One full cycle is 360°.", ["360°", "360 degrees"]),
    ans("y10-gtf-g2", "State the maximum value of y = sin x.", "\\max \\sin x", "1", 2, "The y-coordinate never exceeds 1.", []),
    ans("y10-gtf-g3", "State the minimum value of y = cos x.", "\\min \\cos x", "-1", 3, "The x-coordinate falls to −1.", ["−1"]),
    ans("y10-gtf-g4", "State the amplitude of y = sin x.", "\\text{amplitude}", "1", 3, "Height from the centre to the peak is 1.", []),
  ],
  independentPractice: [
    ans("y10-gtf-i1", "Find y = sin x at x = 0°.", "\\sin 0^\\circ", "0", 2, "sin 0° = 0.", []),
    ans("y10-gtf-i2", "Find y = cos x at x = 0°.", "\\cos 0^\\circ", "1", 2, "cos 0° = 1.", []),
    ans("y10-gtf-i3", "y = sin x repeats every how many degrees?", "\\text{period}", "360", 3, "The period is 360°.", ["360°"]),
    ans("y10-gtf-i4", "Find y = sin x at x = 90°.", "\\sin 90^\\circ", "1", 2, "sin 90° = 1.", []),
    mcq("y10-gtf-i5", "The height of the wave from its centre line is the:", "B", ["period", "amplitude", "frequency", "phase"], 3, "Amplitude is the height from the centre to the peak."),
  ],
  masteryQuiz: [
    ans("y10-gtf-m1", "State the period of y = cos x (in degrees).", "\\text{period}", "360", 3, "One full cycle is 360°.", ["360°"]),
    ans("y10-gtf-m2", "State the maximum value of y = cos x.", "\\max \\cos x", "1", 2, "Max is 1.", []),
    ans("y10-gtf-m3", "State the minimum value of y = sin x.", "\\min \\sin x", "-1", 2, "Min is −1.", ["−1"]),
    mcq("y10-gtf-m4", "y = sin x traces the:", "C", ["x-coordinate around the circle", "radius", "y-coordinate of a point moving around the unit circle", "angle"], 4, "Sine is the y-coordinate as the point moves around the circle."),
    ans("y10-gtf-m5", "Find y = cos x at x = 90°.", "\\cos 90^\\circ", "0", 3, "cos 90° = 0.", []),
    ans("y10-gtf-m6", "State the amplitude of y = cos x.", "\\text{amplitude}", "1", 3, "Amplitude is 1.", []),
    ans("y10-gtf-m7", "Find y = sin x at x = 180°.", "\\sin 180^\\circ", "0", 3, "sin 180° = 0.", []),
    ans("y10-gtf-m8", "One full cycle of y = sin x spans how many degrees?", "\\text{cycle}", "360", 3, "A full cycle is 360°.", ["360°"]),
    ans("y10-gtf-m9", "Find y = sin x at x = 270°.", "\\sin 270^\\circ", "-1", 3, "sin 270° = −1.", ["−1"]),
    mcq("y10-gtf-m10", "y = cos x traces the:", "A", ["x-coordinate around the unit circle", "y-coordinate", "radius", "diameter"], 4, "Cosine is the x-coordinate as the point moves around the circle."),
  ],
  commonMistakes: [
    { mistake: "Confusing period with amplitude.", fix: "Period is the repeat length (360°); amplitude is the height (1)." },
    { mistake: "Thinking the graph goes above 1 or below −1.", fix: "Coordinates on the unit circle stay within [−1, 1]." },
    { mistake: "Starting y = cos x at 0 instead of 1.", fix: "cos 0° = 1, so the cosine graph starts at its maximum." },
    { mistake: "Memorising the wave without the circle.", fix: "Read it as the coordinate of a point moving around the circle." },
  ],
  masteryPassMark: 0.8,
};

// ── 6K Exact Values and Trig Equations (extending) ─────────────────────────────────────
const exactValues: Partial<ExplicitLesson> = {
  description: "Use exact trig values of special angles and solve basic trig equations by coordinate reasoning.",
  learningIntention: "Recall exact values for special angles and solve simple trig equations in a given range.",
  successCriteria: ["Give exact values of sin/cos/tan for 30°, 45°, 60°.", "Use the coordinate meaning to justify values.", "Solve sin x = k or cos x = k for a special angle.", "Work within a stated range such as 0° to 90°."],
  teaching: {
    paragraphs: [
      "Some angles have EXACT values worth knowing because they come from simple triangles and the unit circle: sin 30° = 1/2, cos 60° = 1/2, sin 60° = cos 30° = √3/2, sin 45° = cos 45° = 1/√2, and tan 45° = 1.",
      "These aren't arbitrary — they are the coordinates of the special points on the unit circle. For 30°, the y-coordinate (sine) is 1/2; for 60° the x-coordinate (cosine) is 1/2.",
      "Solving a basic TRIG EQUATION reverses the process: 'sin x = 1/2' asks which angle has y-coordinate 1/2. In the range 0° to 90° that is x = 30°. Likewise cos x = 1/2 gives x = 60°, and tan x = 1 gives x = 45°.",
      "Stay within the stated RANGE (here 0° to 90°, the first quadrant) and reason from the coordinates — no advanced multi-cycle methods or identities are needed.",
    ],
    latexBlocks: ["\\sin 30^\\circ = \\tfrac{1}{2},\\ \\cos 60^\\circ = \\tfrac{1}{2}", "\\sin 60^\\circ = \\cos 30^\\circ = \\tfrac{\\sqrt3}{2},\\ \\sin 45^\\circ = \\tfrac{1}{\\sqrt2}", "\\sin x = \\tfrac{1}{2} \\Rightarrow x = 30^\\circ \\ (0^\\circ\\!-\\!90^\\circ)"],
  },
  workedExamples: [
    { title: "An exact value", questionLatex: "\\text{State } \\sin 30^\\circ.", steps: [{ explanation: "Special-angle value.", latex: "\\tfrac{1}{2}" }], finalAnswerLatex: "1/2" },
    { title: "Another exact value", questionLatex: "\\text{State } \\cos 60^\\circ.", steps: [{ explanation: "x-coordinate at 60°.", latex: "\\tfrac{1}{2}" }], finalAnswerLatex: "1/2" },
    { title: "Solving an equation", questionLatex: "\\text{Solve } \\sin x = \\tfrac{1}{2} \\text{ for } 0^\\circ \\le x \\le 90^\\circ.", steps: [{ explanation: "Which angle has y-coordinate 1/2?", latex: "x = 30^\\circ" }], finalAnswerLatex: "30^\\circ" },
  ],
  guidedPractice: [
    mcq("y10-eve-g1", "sin 30° =", "A", ["1/2", "√3/2", "1/√2", "1"], 4, "sin 30° = 1/2."),
    mcq("y10-eve-g2", "cos 60° =", "A", ["1/2", "√3/2", "0", "1"], 4, "cos 60° = 1/2."),
    mcq("y10-eve-g3", "tan 45° =", "D", ["0", "1/2", "√3", "1"], 4, "tan 45° = 1."),
    ans("y10-eve-g4", "Solve sin x = 1/2 for x in [0°, 90°] (give degrees).", "\\sin x = \\tfrac12", "30", 4, "x = 30°.", ["30°"]),
  ],
  independentPractice: [
    mcq("y10-eve-i1", "cos 30° =", "B", ["1/2", "√3/2", "1/√2", "1"], 4, "cos 30° = √3/2."),
    mcq("y10-eve-i2", "sin 60° =", "B", ["1/2", "√3/2", "1/√2", "0"], 4, "sin 60° = √3/2."),
    ans("y10-eve-i3", "Solve cos x = 1/2 for x in [0°, 90°] (give degrees).", "\\cos x = \\tfrac12", "60", 4, "x = 60°.", ["60°"]),
    mcq("y10-eve-i4", "sin 45° =", "C", ["1/2", "√3/2", "1/√2", "1"], 4, "sin 45° = 1/√2."),
    ans("y10-eve-i5", "Solve tan x = 1 for x in [0°, 90°] (give degrees).", "\\tan x = 1", "45", 4, "x = 45°.", ["45°"]),
  ],
  masteryQuiz: [
    mcq("y10-eve-m1", "sin 30° =", "A", ["1/2", "√3/2", "1/√2", "0"], 4, "sin 30° = 1/2."),
    mcq("y10-eve-m2", "cos 60° =", "A", ["1/2", "√3/2", "1", "0"], 4, "cos 60° = 1/2."),
    mcq("y10-eve-m3", "tan 45° =", "D", ["0", "√3", "1/2", "1"], 4, "tan 45° = 1."),
    ans("y10-eve-m4", "Solve sin x = 1/2 for x in [0°, 90°] (give degrees).", "\\sin x=\\tfrac12", "30", 4, "x = 30°.", ["30°"]),
    mcq("y10-eve-m5", "cos 45° =", "C", ["1/2", "√3/2", "1/√2", "1"], 4, "cos 45° = 1/√2."),
    ans("y10-eve-m6", "Solve cos x = 1/2 for x in [0°, 90°] (give degrees).", "\\cos x=\\tfrac12", "60", 4, "x = 60°.", ["60°"]),
    mcq("y10-eve-m7", "sin 90° =", "D", ["0", "1/2", "√3/2", "1"], 3, "sin 90° = 1."),
    ans("y10-eve-m8", "Solve sin x = 1 for x in [0°, 180°] (give degrees).", "\\sin x=1", "90", 4, "x = 90°.", ["90°"]),
    mcq("y10-eve-m9", "cos 0° =", "D", ["0", "1/2", "√3/2", "1"], 3, "cos 0° = 1."),
    ans("y10-eve-m10", "Solve cos x = 0 for x in [0°, 180°] (give degrees).", "\\cos x=0", "90", 4, "x = 90°.", ["90°"]),
  ],
  commonMistakes: [
    { mistake: "Swapping sin and cos of 30° and 60°.", fix: "sin 30° = 1/2 and cos 30° = √3/2 (read the right coordinate)." },
    { mistake: "Giving a decimal when an exact value is asked.", fix: "Use exact forms like 1/2, √3/2, 1/√2." },
    { mistake: "Reporting solutions outside the given range.", fix: "Keep answers within the stated interval (e.g. 0° to 90°)." },
    { mistake: "Reaching for identities/multi-cycle methods.", fix: "Reason from the special-angle coordinates within the range." },
  ],
  masteryPassMark: 0.8,
};

// ── 6E Trigonometry Applications in 3D (extending) ─────────────────────────────────────
const trig3d: Partial<ExplicitLesson> = {
  description: "Solve three-dimensional problems by locating right-angled triangles and applying right-triangle trigonometry.",
  learningIntention: "Break a 3D problem into right triangles and apply SOH-CAH-TOA and angles of elevation/depression.",
  successCriteria: ["Identify a right-angled triangle inside a 3D figure.", "Apply sin/cos/tan ratios correctly.", "Use angles of elevation and depression.", "Recognise multi-stage (two-triangle) problems."],
  teaching: {
    paragraphs: [
      "Three-dimensional trig problems look hard but reduce to a familiar one: the key skill is to LOCATE A RIGHT-ANGLED TRIANGLE inside the 3D figure, then solve it with ordinary right-triangle trig. Always find that triangle first.",
      "Within a right triangle, SOH-CAH-TOA holds: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent. The HYPOTENUSE is the longest side, opposite the right angle.",
      "Many real problems use an ANGLE OF ELEVATION (measured from the horizontal looking UP) or an ANGLE OF DEPRESSION (from the horizontal looking DOWN). Both are measured from the horizontal.",
      "Harder 3D problems are MULTI-STAGE: you solve one right triangle to get a length, then use that length in a second right triangle. Find a known angle from two sides with inverse trig. Work one triangle at a time.",
    ],
    latexBlocks: ["\\sin\\theta = \\tfrac{\\text{opp}}{\\text{hyp}},\\ \\cos\\theta = \\tfrac{\\text{adj}}{\\text{hyp}},\\ \\tan\\theta = \\tfrac{\\text{opp}}{\\text{adj}}", "\\text{angle of elevation/depression: from the horizontal}", "\\text{3D} \\to \\text{find a right triangle} \\to \\text{solve}"],
  },
  workedExamples: [
    { title: "First step", questionLatex: "\\text{What is the first step in a 3D trig problem?}", steps: [{ explanation: "Reduce to a 2D right triangle.", latex: "\\text{find a right-angled triangle}" }], finalAnswerLatex: "\\text{find a right triangle}" },
    { title: "Choosing a ratio", questionLatex: "\\text{Which ratio uses opposite and adjacent?}", steps: [{ explanation: "TOA.", latex: "\\tan\\theta = \\tfrac{\\text{opp}}{\\text{adj}}" }], finalAnswerLatex: "\\tan\\theta" },
    { title: "Angle of elevation", questionLatex: "\\text{From where is an angle of elevation measured?}", steps: [{ explanation: "Looking up from the horizontal.", latex: "\\text{the horizontal}" }], finalAnswerLatex: "\\text{horizontal}" },
  ],
  guidedPractice: [
    mcq("y10-t3d-g1", "3D trig problems are solved by:", "A", ["finding right triangles within the figure", "guessing the angle", "adding all the edges", "measuring with a protractor only"], 4, "Locate a right-angled triangle, then apply trig."),
    mcq("y10-t3d-g2", "An angle of elevation is measured from the:", "B", ["vertical", "horizontal (looking up)", "diagonal", "ground only at 45°"], 4, "Elevation is measured up from the horizontal."),
    mcq("y10-t3d-g3", "The first step in a 3D trig problem is to:", "A", ["identify a right-angled triangle", "find the volume", "draw a circle", "add the angles"], 4, "Find the right triangle to work in."),
    mcq("y10-t3d-g4", "tan θ equals opposite over:", "C", ["hypotenuse", "the angle", "adjacent", "opposite"], 3, "tan θ = opposite/adjacent."),
  ],
  independentPractice: [
    mcq("y10-t3d-i1", "sin θ =", "A", ["opposite/hypotenuse", "adjacent/hypotenuse", "opposite/adjacent", "hypotenuse/opposite"], 3, "SOH: sin = opposite/hypotenuse."),
    mcq("y10-t3d-i2", "cos θ =", "B", ["opposite/hypotenuse", "adjacent/hypotenuse", "opposite/adjacent", "adjacent/opposite"], 3, "CAH: cos = adjacent/hypotenuse."),
    mcq("y10-t3d-i3", "An angle of depression is measured from the:", "A", ["horizontal (looking down)", "vertical", "hypotenuse", "ground up"], 4, "Depression is measured down from the horizontal."),
    mcq("y10-t3d-i4", "A 3D problem often needs:", "C", ["no triangles", "a circle", "two right triangles (two stages)", "a protractor only"], 4, "Multi-stage problems chain two right triangles."),
    mcq("y10-t3d-i5", "The hypotenuse is:", "A", ["the longest side, opposite the right angle", "the shortest side", "any side", "the vertical side only"], 3, "It is the longest side, opposite the right angle."),
  ],
  masteryQuiz: [
    mcq("y10-t3d-m1", "To solve a 3D trig problem, first:", "A", ["locate a right-angled triangle", "find the perimeter", "draw a circle", "sum the faces"], 4, "Find a right triangle to work in."),
    mcq("y10-t3d-m2", "sin θ =", "A", ["opp/hyp", "adj/hyp", "opp/adj", "hyp/adj"], 3, "SOH."),
    mcq("y10-t3d-m3", "cos θ =", "B", ["opp/hyp", "adj/hyp", "opp/adj", "adj/opp"], 3, "CAH."),
    mcq("y10-t3d-m4", "tan θ =", "C", ["opp/hyp", "adj/hyp", "opp/adj", "hyp/opp"], 3, "TOA."),
    mcq("y10-t3d-m5", "An angle of elevation is measured:", "A", ["from the horizontal, upward", "from the vertical", "from the hypotenuse", "from the ground down"], 4, "Elevation is up from the horizontal."),
    mcq("y10-t3d-m6", "An angle of depression is measured:", "B", ["from the vertical", "from the horizontal, downward", "from the hypotenuse", "from the ground up"], 4, "Depression is down from the horizontal."),
    mcq("y10-t3d-m7", "The longest side of a right triangle is the:", "C", ["opposite", "adjacent", "hypotenuse", "base"], 3, "The hypotenuse is the longest side."),
    mcq("y10-t3d-m8", "A 3D trig problem often splits into:", "B", ["one circle", "multiple 2D right triangles", "no triangles", "a single line"], 4, "Break the figure into 2D right triangles."),
    mcq("y10-t3d-m9", "To find an angle from two known sides, use:", "A", ["inverse trig", "the area formula", "Pythagoras only", "the angle sum"], 4, "Inverse trig recovers the angle from a ratio."),
    mcq("y10-t3d-m10", "A box's space diagonal is found using:", "A", ["a right triangle through the box", "the perimeter", "a circle", "the angle sum"], 5, "Form a right triangle using the diagonal of a face and an edge."),
  ],
  commonMistakes: [
    { mistake: "Trying to work in 3D directly.", fix: "Find a 2D right-angled triangle inside the figure first." },
    { mistake: "Mixing up the trig ratios.", fix: "SOH-CAH-TOA: sin=opp/hyp, cos=adj/hyp, tan=opp/adj." },
    { mistake: "Measuring elevation/depression from the vertical.", fix: "Both are measured from the horizontal." },
    { mistake: "Forcing a one-step solution.", fix: "Many 3D problems need two triangles solved in sequence." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "the-unit-circle": unitCircle,
  "graphs-trig-functions": graphsTrig,
  "exact-values-trig-equations": exactValues,
  "trig-applications-3d": trig3d,
};

export function year10TrigonometryWave11LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "trigonometry"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
