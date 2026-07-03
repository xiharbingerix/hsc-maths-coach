// Year 9 Wave 4 — Chapter 3, trig-ratio sections (ADR-Y9-001, all core):
// introducing-trigonometric-ratios, finding-unknown-side-lengths, solving-for-the-denominator.
// Full per-subtopic contract. Uses SOH CAH TOA; special angles 30/45/60 give clean values
// (sin30 = cos60 = 0.5, tan45 = 1); other values are stated to a given number of decimal places.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { TriangleDiagram } from "../types";
import { year9TrigRatioVisuals } from "../year9TrigRatioVisuals";
import { year9TrigSideVisuals } from "../year9TrigSideVisuals";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Label opposite, adjacent and hypotenuse, then use SOH CAH TOA.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall SOH CAH TOA.", explanation };
}
const u = (a: string) => [a, `${a} cm`, `${a}cm`];

// The canonical 3-4-5 teaching triangle used by the intro worked examples, so
// students see WHERE opposite/adjacent/hypotenuse sit relative to θ while the
// ratio is formed. All three sides are labelled — this is teaching support,
// not an assessment item.
function teachingTriangle345(): TriangleDiagram {
  const angle = Math.atan(3 / 4);
  const hypotenusePixels = 240;
  return {
    description:
      "Right triangle with the angle theta marked at the left vertex, opposite side 3, adjacent side 4 and hypotenuse 5 — the 3-4-5 triangle used to form sin, cos and tan.",
    vertices: {
      A: { x: 70, y: 250 },
      B: { x: 70 + hypotenusePixels * Math.cos(angle), y: 250 },
      C: {
        x: 70 + hypotenusePixels * Math.cos(angle),
        y: 250 - hypotenusePixels * Math.sin(angle),
      },
    },
    vertexLabels: { A: "", B: "", C: "" },
    sideLabels: { AB: "4", BC: "3", AC: "5" },
    angleLabels: { A: "θ" },
    angleMarks: { A: 1 },
    rightAngleAt: "B",
    viewBox: "0 0 390 300",
  };
}

// ── introducing-trigonometric-ratios (core) ───────────────────────────────────────────
const introducingTrigRatios: Partial<ExplicitLesson> = {
  description: "Define the sine, cosine and tangent ratios using SOH CAH TOA.",
  learningIntention: "Write trig ratios from the sides of a right-angled triangle.",
  successCriteria: ["Identify opposite, adjacent and hypotenuse.", "Write sin = opp/hyp.", "Write cos = adj/hyp.", "Write tan = opp/adj."],
  teaching: {
    paragraphs: [
      "For a chosen angle θ in a right-angled triangle, the three sides are the OPPOSITE (across from θ), the ADJACENT (next to θ, not the hypotenuse) and the HYPOTENUSE (opposite the right angle).",
      "The three ratios are remembered as SOH CAH TOA: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.",
      "For a 3-4-5 triangle with opposite 3, adjacent 4, hypotenuse 5: sin θ = 3/5 = 0.6, cos θ = 4/5 = 0.8, tan θ = 3/4 = 0.75.",
      "These ratios depend only on the angle, not the size of the triangle.",
    ],
    latexBlocks: ["\\sin\\theta = \\tfrac{\\text{opp}}{\\text{hyp}},\\ \\cos\\theta = \\tfrac{\\text{adj}}{\\text{hyp}},\\ \\tan\\theta = \\tfrac{\\text{opp}}{\\text{adj}}", "\\sin\\theta = \\tfrac35 = 0.6"],
  },
  workedExamples: [
    { title: "Sine", questionLatex: "\\text{From the diagram, find } \\sin\\theta.", steps: [{ explanation: "The side across from θ (opposite) is 3; the side opposite the right angle (hypotenuse) is 5. sin θ = opp/hyp = 3/5.", latex: "0.6" }], finalAnswerLatex: "0.6", triangleDiagram: teachingTriangle345() },
    { title: "Cosine", questionLatex: "\\text{From the diagram, find } \\cos\\theta.", steps: [{ explanation: "The side next to θ that is not the hypotenuse (adjacent) is 4; the hypotenuse is 5. cos θ = adj/hyp = 4/5.", latex: "0.8" }], finalAnswerLatex: "0.8", triangleDiagram: teachingTriangle345() },
    { title: "Tangent", questionLatex: "\\text{From the diagram, find } \\tan\\theta.", steps: [{ explanation: "Opposite is 3 and adjacent is 4 — the hypotenuse is not used. tan θ = opp/adj = 3/4.", latex: "0.75" }], finalAnswerLatex: "0.75", triangleDiagram: teachingTriangle345() },
  ],
  guidedPractice: [
    ans("y9-trr-g1", "Opposite 6, hypotenuse 10. Find sin θ.", "\\sin\\theta", "0.6", 2, "6/10 = 0.6.", []),
    ans("y9-trr-g2", "Adjacent 8, hypotenuse 10. Find cos θ.", "\\cos\\theta", "0.8", 2, "8/10 = 0.8.", []),
    ans("y9-trr-g3", "Opposite 5, adjacent 12. Find tan θ as a decimal (2 d.p.).", "\\tan\\theta", "0.42", 3, "5/12 ≈ 0.42.", []),
    mcq("y9-trr-g4", "SOH means:", "A", ["sin = opp/hyp", "sin = adj/hyp", "sin = opp/adj", "sin = hyp/opp"], 2, "Sine = Opposite over Hypotenuse."),
  ],
  independentPractice: [
    ans("y9-trr-i1", "Opposite 8, hypotenuse 17. Find sin θ (2 d.p.).", "\\sin\\theta", "0.47", 3, "8/17 ≈ 0.47.", []),
    ans("y9-trr-i2", "Adjacent 15, hypotenuse 17. Find cos θ (2 d.p.).", "\\cos\\theta", "0.88", 3, "15/17 ≈ 0.88.", []),
    ans("y9-trr-i3", "Opposite 24, adjacent 7. Find tan θ (2 d.p.).", "\\tan\\theta", "3.43", 3, "24/7 ≈ 3.43.", []),
    mcq("y9-trr-i4", "TOA means tan equals:", "C", ["opp/hyp", "adj/hyp", "opp/adj", "hyp/adj"], 2, "Tangent = Opposite over Adjacent."),
    ans("y9-trr-i5", "Opposite 7, hypotenuse 25. Find sin θ.", "\\sin\\theta", "0.28", 3, "7/25 = 0.28.", []),
  ],
  masteryQuiz: [
    ans("y9-trr-m1", "Opposite 3, hypotenuse 5. Find sin θ.", "\\sin\\theta", "0.6", 2, "0.6.", []),
    ans("y9-trr-m2", "Adjacent 4, hypotenuse 5. Find cos θ.", "\\cos\\theta", "0.8", 2, "0.8.", []),
    ans("y9-trr-m3", "Opposite 3, adjacent 4. Find tan θ.", "\\tan\\theta", "0.75", 2, "0.75.", []),
    mcq("y9-trr-m4", "CAH means cos equals:", "B", ["opp/hyp", "adj/hyp", "opp/adj", "adj/opp"], 2, "Cosine = Adjacent over Hypotenuse."),
    ans("y9-trr-m5", "Opposite 12, hypotenuse 13. Find sin θ (2 d.p.).", "\\sin\\theta", "0.92", 3, "12/13 ≈ 0.92.", []),
    ans("y9-trr-m6", "Adjacent 5, hypotenuse 13. Find cos θ (2 d.p.).", "\\cos\\theta", "0.38", 3, "5/13 ≈ 0.38.", []),
    ans("y9-trr-m7", "Opposite 8, adjacent 15. Find tan θ (2 d.p.).", "\\tan\\theta", "0.53", 3, "8/15 ≈ 0.53.", []),
    mcq("y9-trr-m8", "Which ratio uses the opposite and adjacent sides?", "C", ["sin", "cos", "tan", "none"], 2, "tan = opp/adj."),
    ans("y9-trr-m9", "Opposite 9, hypotenuse 15. Find sin θ.", "\\sin\\theta", "0.6", 3, "9/15 = 0.6.", []),
    mcq("y9-trr-m10", "The hypotenuse is always the:", "A", ["longest side", "side opposite θ", "side next to θ", "shortest side"], 2, "Hypotenuse is the longest side, opposite the right angle."),
  ],
  masteryQuizPool: [
    ans("y9-trr-p1", "In a 3-4-5 triangle, sin θ = 0.6. Find cos θ.", "\\cos\\theta", "0.8", 5, "adj/hyp = 4/5 = 0.8.", []),
    ans("y9-trr-p2", "If cos θ = 5/13, find sin θ (2 d.p.).", "\\sin\\theta", "0.92", 5, "opp = 12, sin = 12/13 ≈ 0.92.", []),
    ans("y9-trr-p3", "Find sin 30° (exact decimal).", "\\sin30^\\circ", "0.5", 5, "sin 30° = 0.5.", ["1/2"]),
    ans("y9-trr-p4", "In a right triangle opp = 8, adj = 6. Find sin θ.", "\\sin\\theta", "0.8", 5, "hyp = 10, sin = 8/10 = 0.8.", []),
    ans("y9-trr-p5", "If tan θ = 3/4, find sin θ.", "\\sin\\theta", "0.6", 5, "3-4-5 triangle, sin = 3/5 = 0.6.", []),
    ans("y9-trr-p6", "Find cos 60° (exact decimal).", "\\cos60^\\circ", "0.5", 5, "cos 60° = 0.5.", ["1/2"]),
    ans("y9-trr-p7", "In a triangle opp = 5, adj = 12. Find cos θ (2 d.p.).", "\\cos\\theta", "0.92", 5, "hyp = 13, cos = 12/13 ≈ 0.92.", []),
    ans("y9-trr-p8", "Find tan 45° (exact).", "\\tan45^\\circ", "1", 5, "tan 45° = 1.", []),
    ans("y9-trr-p9", "If sin θ = 0.6 in a 3-4-5 triangle, find tan θ.", "\\tan\\theta", "0.75", 5, "opp/adj = 3/4 = 0.75.", []),
    ans("y9-trr-p10", "In a triangle opp = 24, hyp = 25. Find cos θ.", "\\cos\\theta", "0.28", 5, "adj = 7, cos = 7/25 = 0.28.", []),
  ],
  commonMistakes: [
    { mistake: "Swapping opposite and adjacent.", fix: "Opposite is across from θ; adjacent is next to it." },
    { mistake: "Mixing up the ratios.", fix: "SOH CAH TOA keeps them straight." },
    { mistake: "Using the hypotenuse as the adjacent side.", fix: "The hypotenuse is never the adjacent." },
    { mistake: "Thinking the ratio changes with triangle size.", fix: "The ratio depends only on the angle." },
  ],
  masteryPassMark: 0.8,
};

// ── finding-unknown-side-lengths (core) ────────────────────────────────────────────────
const findingUnknownSides: Partial<ExplicitLesson> = {
  description: "Find an unknown side (in the numerator) using sin, cos or tan.",
  learningIntention: "Multiply by a trig ratio to find an unknown side.",
  successCriteria: ["Choose the correct ratio.", "Find the opposite using hyp × sin θ.", "Find the adjacent using hyp × cos θ.", "Round as required."],
  teaching: {
    paragraphs: [
      "When the unknown side is on TOP of the ratio, MULTIPLY. To find the OPPOSITE from the hypotenuse: opp = hyp × sin θ. To find the ADJACENT: adj = hyp × cos θ. To find the opposite from the adjacent: opp = adj × tan θ.",
      "For hyp = 10 and θ = 30°: opposite = 10 × sin 30° = 10 × 0.5 = 5.",
      "Special angles give clean values: sin 30° = cos 60° = 0.5 and tan 45° = 1.",
      "For other angles use a calculator and ROUND as asked (e.g. to 1 decimal place).",
    ],
    latexBlocks: ["\\text{opp} = \\text{hyp}\\times\\sin\\theta", "10\\times\\sin30^\\circ = 5"],
  },
  workedExamples: [
    { title: "Opposite", questionLatex: "\\text{hyp}=10, \\theta=30^\\circ. \\text{ Opposite?}", steps: [{ explanation: "10 × 0.5.", latex: "5" }], finalAnswerLatex: "5" },
    { title: "Adjacent", questionLatex: "\\text{hyp}=12, \\theta=60^\\circ. \\text{ Adjacent?}", steps: [{ explanation: "12 × cos 60° = 12 × 0.5.", latex: "6" }], finalAnswerLatex: "6" },
    { title: "Using tan", questionLatex: "\\text{adj}=9, \\theta=45^\\circ. \\text{ Opposite?}", steps: [{ explanation: "9 × tan 45° = 9 × 1.", latex: "9" }], finalAnswerLatex: "9" },
  ],
  guidedPractice: [
    ans("y9-fus-g1", "Find the opposite: hyp = 10, θ = 30°.", "", "5", 2, "10 × 0.5 = 5.", u("5")),
    ans("y9-fus-g2", "Find the adjacent: hyp = 8, θ = 60°.", "", "4", 2, "8 × 0.5 = 4.", u("4")),
    ans("y9-fus-g3", "Find the opposite: adj = 5, θ = 45°.", "", "5", 2, "5 × 1 = 5.", u("5")),
    mcq("y9-fus-g4", "To find the opposite from the hypotenuse and angle, use:", "A", ["sin", "cos", "tan", "Pythagoras"], 2, "opp = hyp × sin θ."),
  ],
  independentPractice: [
    ans("y9-fus-i1", "Find the opposite: hyp = 20, θ = 30°.", "", "10", 2, "20 × 0.5 = 10.", u("10")),
    ans("y9-fus-i2", "Find the adjacent: hyp = 10, θ = 60°.", "", "5", 2, "10 × 0.5 = 5.", u("5")),
    ans("y9-fus-i3", "Find the opposite: adj = 7, θ = 45°.", "", "7", 2, "7 × 1 = 7.", u("7")),
    ans("y9-fus-i4", "Find the opposite: hyp = 12, θ = 30°.", "", "6", 2, "12 × 0.5 = 6.", u("6")),
    mcq("y9-fus-i5", "To find the adjacent from the hypotenuse and angle, use:", "B", ["sin", "cos", "tan", "Pythagoras"], 2, "adj = hyp × cos θ."),
  ],
  masteryQuiz: [
    ans("y9-fus-m1", "Find the opposite: hyp = 8, θ = 30°.", "", "4", 2, "8 × 0.5 = 4.", u("4")),
    ans("y9-fus-m2", "Find the adjacent: hyp = 16, θ = 60°.", "", "8", 2, "16 × 0.5 = 8.", u("8")),
    ans("y9-fus-m3", "Find the opposite: adj = 9, θ = 45°.", "", "9", 2, "9 × 1 = 9.", u("9")),
    ans("y9-fus-m4", "Find the opposite: hyp = 30, θ = 30°.", "", "15", 2, "30 × 0.5 = 15.", u("15")),
    mcq("y9-fus-m5", "When the unknown side is on top of the ratio, you:", "A", ["multiply", "divide", "subtract", "use Pythagoras"], 2, "Multiply: side = hyp × ratio."),
    ans("y9-fus-m6", "Find the adjacent: hyp = 14, θ = 60°.", "", "7", 2, "14 × 0.5 = 7.", u("7")),
    ans("y9-fus-m7", "Find the opposite: adj = 4, θ = 45°.", "", "4", 2, "4 × 1 = 4.", u("4")),
    ans("y9-fus-m8", "Find the opposite: hyp = 100, θ = 30°.", "", "50", 2, "100 × 0.5 = 50.", u("50")),
    ans("y9-fus-m9", "Find the adjacent: hyp = 24, θ = 60°.", "", "12", 2, "24 × 0.5 = 12.", u("12")),
    ans("y9-fus-m10", "Find the opposite: adj = 6, θ = 45°.", "", "6", 2, "6 × 1 = 6.", u("6")),
  ],
  masteryQuizPool: [
    ans("y9-fus-p1", "Find the opposite: hyp = 10, θ = 60° (1 d.p.).", "", "8.7", 5, "10 × 0.866 ≈ 8.7.", u("8.7")),
    ans("y9-fus-p2", "Find the adjacent: hyp = 20, θ = 30° (1 d.p.).", "", "17.3", 5, "20 × 0.866 ≈ 17.3.", u("17.3")),
    ans("y9-fus-p3", "Find the opposite: hyp = 10, θ = 45° (1 d.p.).", "", "7.1", 5, "10 × 0.707 ≈ 7.1.", u("7.1")),
    ans("y9-fus-p4", "Find the opposite: adj = 6, θ = 30° (1 d.p.).", "", "3.5", 5, "6 × 0.577 ≈ 3.5.", u("3.5")),
    ans("y9-fus-p5", "Find the opposite: adj = 5, θ = 60° (1 d.p.).", "", "8.7", 5, "5 × 1.732 ≈ 8.7.", u("8.7")),
    ans("y9-fus-p6", "Find the adjacent: hyp = 16, θ = 45° (1 d.p.).", "", "11.3", 5, "16 × 0.707 ≈ 11.3.", u("11.3")),
    ans("y9-fus-p7", "Find the opposite: hyp = 25, θ = 30°.", "", "12.5", 5, "25 × 0.5 = 12.5.", u("12.5")),
    ans("y9-fus-p8", "Find the adjacent: hyp = 12, θ = 30° (1 d.p.).", "", "10.4", 5, "12 × 0.866 ≈ 10.4.", u("10.4")),
    ans("y9-fus-p9", "Find the opposite: hyp = 18, θ = 60° (1 d.p.).", "", "15.6", 5, "18 × 0.866 ≈ 15.6.", u("15.6")),
    ans("y9-fus-p10", "A ramp rises at 30° over a 10 m slope (hypotenuse). Find its height.", "", "5", 5, "10 × sin 30° = 5 m.", ["5", "5 m"]),
  ],
  commonMistakes: [
    { mistake: "Dividing when the unknown is on top.", fix: "Multiply: side = hyp × ratio." },
    { mistake: "Choosing the wrong ratio.", fix: "Match the known/unknown sides to SOH CAH TOA." },
    { mistake: "Calculator in the wrong angle mode.", fix: "Use degrees for these problems." },
    { mistake: "Not rounding as asked.", fix: "Round to the requested decimal places." },
  ],
  masteryPassMark: 0.8,
};

// ── solving-for-the-denominator (core) ─────────────────────────────────────────────────
const solvingForDenominator: Partial<ExplicitLesson> = {
  description: "Find an unknown side that is in the denominator (often the hypotenuse) by dividing.",
  learningIntention: "Rearrange a trig ratio to find a side in the denominator.",
  successCriteria: ["Recognise the unknown is in the denominator.", "Find the hypotenuse using opp ÷ sin θ.", "Find the hypotenuse using adj ÷ cos θ.", "Round as required."],
  teaching: {
    paragraphs: [
      "Sometimes the unknown side is in the DENOMINATOR of the ratio — typically the hypotenuse. Then you DIVIDE. From sin θ = opp/hyp, rearranging gives hyp = opp ÷ sin θ.",
      "For opp = 5 and θ = 30°: hyp = 5 ÷ sin 30° = 5 ÷ 0.5 = 10.",
      "Similarly hyp = adj ÷ cos θ. For adj = 6, θ = 60°: hyp = 6 ÷ 0.5 = 12.",
      "The clue is whether the unknown is on the bottom — if so, divide rather than multiply.",
    ],
    latexBlocks: ["\\text{hyp} = \\text{opp} \\div \\sin\\theta", "5 \\div \\sin30^\\circ = 5 \\div 0.5 = 10"],
  },
  workedExamples: [
    { title: "Hyp from opp", questionLatex: "\\text{opp}=5, \\theta=30^\\circ. \\text{ Hypotenuse?}", steps: [{ explanation: "5 ÷ 0.5.", latex: "10" }], finalAnswerLatex: "10" },
    { title: "Hyp from adj", questionLatex: "\\text{adj}=6, \\theta=60^\\circ. \\text{ Hypotenuse?}", steps: [{ explanation: "6 ÷ 0.5.", latex: "12" }], finalAnswerLatex: "12" },
    { title: "Another", questionLatex: "\\text{opp}=8, \\theta=30^\\circ. \\text{ Hypotenuse?}", steps: [{ explanation: "8 ÷ 0.5.", latex: "16" }], finalAnswerLatex: "16" },
  ],
  guidedPractice: [
    ans("y9-sfd-g1", "Find the hypotenuse: opp = 5, θ = 30°.", "", "10", 2, "5 ÷ 0.5 = 10.", u("10")),
    ans("y9-sfd-g2", "Find the hypotenuse: adj = 4, θ = 60°.", "", "8", 2, "4 ÷ 0.5 = 8.", u("8")),
    ans("y9-sfd-g3", "Find the hypotenuse: opp = 7, θ = 30°.", "", "14", 3, "7 ÷ 0.5 = 14.", u("14")),
    mcq("y9-sfd-g4", "When the unknown is in the denominator, you:", "B", ["multiply", "divide", "add", "square"], 2, "Rearrange by dividing."),
  ],
  independentPractice: [
    ans("y9-sfd-i1", "Find the hypotenuse: opp = 6, θ = 30°.", "", "12", 2, "6 ÷ 0.5 = 12.", u("12")),
    ans("y9-sfd-i2", "Find the hypotenuse: adj = 5, θ = 60°.", "", "10", 2, "5 ÷ 0.5 = 10.", u("10")),
    ans("y9-sfd-i3", "Find the hypotenuse: opp = 9, θ = 30°.", "", "18", 3, "9 ÷ 0.5 = 18.", u("18")),
    ans("y9-sfd-i4", "Find the hypotenuse: adj = 7, θ = 60°.", "", "14", 3, "7 ÷ 0.5 = 14.", u("14")),
    mcq("y9-sfd-i5", "From sin θ = opp/hyp, the hypotenuse equals:", "C", ["opp × sin θ", "sin θ ÷ opp", "opp ÷ sin θ", "opp + sin θ"], 3, "hyp = opp ÷ sin θ."),
  ],
  masteryQuiz: [
    ans("y9-sfd-m1", "Find the hypotenuse: opp = 5, θ = 30°.", "", "10", 2, "10.", u("10")),
    ans("y9-sfd-m2", "Find the hypotenuse: adj = 6, θ = 60°.", "", "12", 2, "12.", u("12")),
    ans("y9-sfd-m3", "Find the hypotenuse: opp = 10, θ = 30°.", "", "20", 3, "20.", u("20")),
    ans("y9-sfd-m4", "Find the hypotenuse: adj = 8, θ = 60°.", "", "16", 3, "16.", u("16")),
    mcq("y9-sfd-m5", "The clue to divide is that the unknown is:", "B", ["on top of the ratio", "in the denominator", "the angle", "the right angle"], 2, "Unknown in the denominator → divide."),
    ans("y9-sfd-m6", "Find the hypotenuse: opp = 12, θ = 30°.", "", "24", 3, "24.", u("24")),
    ans("y9-sfd-m7", "Find the hypotenuse: adj = 9, θ = 60°.", "", "18", 3, "18.", u("18")),
    ans("y9-sfd-m8", "Find the hypotenuse: opp = 3, θ = 30°.", "", "6", 2, "6.", u("6")),
    ans("y9-sfd-m9", "Find the hypotenuse: adj = 2, θ = 60°.", "", "4", 2, "4.", u("4")),
    mcq("y9-sfd-m10", "hyp = adj ÷ cos θ comes from rearranging:", "A", ["cos θ = adj/hyp", "sin θ = opp/hyp", "tan θ = opp/adj", "Pythagoras"], 3, "cos θ = adj/hyp rearranges to hyp = adj ÷ cos θ."),
  ],
  masteryQuizPool: [
    ans("y9-sfd-p1", "Find the hypotenuse: opp = 10, θ = 45° (1 d.p.).", "", "14.1", 5, "10 ÷ 0.707 ≈ 14.1.", u("14.1")),
    ans("y9-sfd-p2", "Find the hypotenuse: adj = 10, θ = 30° (1 d.p.).", "", "11.5", 5, "10 ÷ 0.866 ≈ 11.5.", u("11.5")),
    ans("y9-sfd-p3", "Find the hypotenuse: opp = 7, θ = 30°.", "", "14", 5, "7 ÷ 0.5 = 14.", u("14")),
    ans("y9-sfd-p4", "Find the hypotenuse: opp = 12, θ = 60° (1 d.p.).", "", "13.9", 5, "12 ÷ 0.866 ≈ 13.9.", u("13.9")),
    ans("y9-sfd-p5", "Find the hypotenuse: adj = 8, θ = 45° (1 d.p.).", "", "11.3", 5, "8 ÷ 0.707 ≈ 11.3.", u("11.3")),
    ans("y9-sfd-p6", "Find the adjacent side: opp = 6, θ = 45° using tan (1 d.p.).", "", "6", 5, "6 ÷ 1 = 6.", u("6")),
    ans("y9-sfd-p7", "Find the adjacent: opp = 5, θ = 30°, using tan (1 d.p.).", "", "8.7", 5, "5 ÷ 0.577 ≈ 8.7.", u("8.7")),
    ans("y9-sfd-p8", "Find the hypotenuse: opp = 15, θ = 30°.", "", "30", 5, "15 ÷ 0.5 = 30.", u("30")),
    ans("y9-sfd-p9", "Find the hypotenuse: adj = 20, θ = 60°.", "", "40", 5, "20 ÷ 0.5 = 40.", u("40")),
    ans("y9-sfd-p10", "A kite string makes 30° with the ground; the kite is 6 m high. Find the string length.", "", "12", 5, "6 ÷ sin 30° = 12 m.", ["12", "12 m"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying when the unknown is in the denominator.", fix: "Divide: hyp = opp ÷ sin θ." },
    { mistake: "Choosing the wrong ratio.", fix: "Match the known side and the unknown to SOH CAH TOA." },
    { mistake: "Dividing by the side instead of the ratio.", fix: "Divide the known side by sin/cos of the angle." },
    { mistake: "Wrong calculator mode.", fix: "Use degrees." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "introducing-trigonometric-ratios": introducingTrigRatios,
  "finding-unknown-side-lengths": findingUnknownSides,
  "solving-for-the-denominator": solvingForDenominator,
};

function addTrigSideVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = year9TrigSideVisuals[question.id] ?? year9TrigRatioVisuals[question.id];
  return visual ? { ...question, ...visual } : question;
}

function addTrigSideVisuals(content: Partial<ExplicitLesson>): Partial<ExplicitLesson> {
  return {
    ...content,
    guidedPractice: content.guidedPractice?.map(addTrigSideVisual),
    independentPractice: content.independentPractice?.map(addTrigSideVisual),
    masteryQuiz: content.masteryQuiz?.map(addTrigSideVisual),
    masteryQuizPool: content.masteryQuizPool?.map(addTrigSideVisual),
    multiPartPractice: content.multiPartPractice?.map(addTrigSideVisual),
  };
}

export function year9Chapter3TrigRatiosLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "pythagoras-trigonometry") {
    return null;
  }
  const content = SECTIONS[lesson.slug];
  if (!content) return null;
  return addTrigSideVisuals(content);
}
