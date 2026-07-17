// Year 9 restructure — Wave 1 VALIDATION SAMPLE (ADR-Y9-001). Three representative sections that
// prove the full per-subtopic authoring contract before scaling to all 102:
//   - simple-interest                       (computation-financial-maths, core)  DIRECT-REUSE / Number
//   - gradient                              (linear-relationships, core)         ADAPT / Algebra
//   - circle-circumference-sector-perimeter (length-area-surface-area-volume, consolidating) NET-NEW / Measurement
// Each ships: Feynman teaching + 3 worked examples + 4 common mistakes + 4 guided / 5 independent /
// 10 mastery + a 10-question D5 masteryQuizPool (every item difficulty 5). The 12 D6 challenge
// questions per section live in lib/challenges/year9Wave1.ts (registry pattern). pathTag +
// stableSkillId + skillCheckpoints are on the seed in newCourseCatalog. Prose uses unicode
// superscripts (no raw ^ or _).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import { withoutPracticeLatex } from "../questionHelpers";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Identify the quantities and the relationship before calculating.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Reason about the meaning first, then check each option.", explanation };
}

// ── simple-interest (DIRECT-REUSE, Number, core) ───────────────────────────────────────
const simpleInterest: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Calculate simple interest with I = Prn and the total amount A = P + I.",
  learningIntention: "Use the simple-interest formula and find the total owed or earned.",
  successCriteria: ["State I = Prn and that interest is on the original principal only.", "Convert a percentage rate to a decimal.", "Find the interest for given P, r, n.", "Find the total amount A = P + I."],
  teaching: {
    paragraphs: [
      "SIMPLE INTEREST is interest paid only on the ORIGINAL amount (the PRINCIPAL), the same fixed amount each period — it never earns interest on previous interest. The formula is I = Prn: principal × rate × number of periods.",
      "The rate r is written as a DECIMAL: 5% becomes 0.05, 2.5% becomes 0.025. The number of periods n must match the rate's period (a yearly rate with n in years).",
      "For P = $1000 at 5% per year for 3 years: I = 1000 × 0.05 × 3 = $150. Because it's simple interest, each year adds the same $50.",
      "The TOTAL amount is the principal plus the interest: A = P + I. So here A = 1000 + 150 = $1150. Read what the question wants — the interest alone (I) or the total (A).",
    ],
    latexBlocks: ["I = Prn", "r:\\ 5\\% = 0.05,\\ 2.5\\% = 0.025", "A = P + I"],
  },
  workedExamples: [
    { title: "Interest", questionLatex: "P=\\$1000,\\ r=5\\%,\\ n=3\\text{ years. Find } I.", steps: [{ explanation: "I = Prn with r = 0.05.", latex: "1000 \\times 0.05 \\times 3 = 150" }], finalAnswerLatex: "\\$150" },
    { title: "Total amount", questionLatex: "\\text{Find the total } A \\text{ for the loan above.}", steps: [{ explanation: "A = P + I.", latex: "1000 + 150 = 1150" }], finalAnswerLatex: "\\$1150" },
    { title: "Rate as a decimal", questionLatex: "P=\\$2000,\\ r=2.5\\%,\\ n=4. \\text{ Find } I.", steps: [{ explanation: "2.5% = 0.025.", latex: "2000 \\times 0.025 \\times 4 = 200" }], finalAnswerLatex: "\\$200" },
  ],
  guidedPractice: [
    ans("y9-si-g1", "Find the simple interest on $500 at 4% per year for 2 years.", "I=Prn", "40", 2, "500 × 0.04 × 2 = 40.", ["$40"]),
    ans("y9-si-g2", "Find the simple interest on $2000 at 3% per year for 5 years.", "I=Prn", "300", 2, "2000 × 0.03 × 5 = 300.", ["$300"]),
    ans("y9-si-g3", "A loan of $800 earns $120 interest. Find the total to repay.", "A=P+I", "920", 2, "A = 800 + 120 = 920.", ["$920"]),
    mcq("y9-si-g4", "Simple interest is charged on:", "A", ["the original principal only", "the principal plus past interest", "the interest only", "a shrinking balance"], 2, "Simple interest uses only the original principal each period."),
  ],
  independentPractice: [
    ans("y9-si-i1", "Find the simple interest on $1500 at 6% per year for 4 years.", "I=Prn", "360", 3, "1500 × 0.06 × 4 = 360.", ["$360"]),
    ans("y9-si-i2", "Find the total amount for $1000 at 5% per year for 2 years.", "A=P+I", "1100", 3, "I = 100, A = 1000 + 100 = 1100.", ["$1100"]),
    ans("y9-si-i3", "Find the simple interest on $2500 at 2% per year for 3 years.", "I=Prn", "150", 3, "2500 × 0.02 × 3 = 150.", ["$150"]),
    ans("y9-si-i4", "Write 7% as a decimal.", "7\\%", "0.07", 2, "7% = 7/100 = 0.07.", []),
    mcq("y9-si-i5", "In I = Prn, the letter n stands for:", "C", ["the rate", "the principal", "the number of periods", "the interest"], 2, "n is the number of interest periods."),
  ],
  masteryQuiz: [
    ans("y9-si-m1", "Simple interest on $400 at 5% for 1 year.", "I=Prn", "20", 2, "400 × 0.05 × 1 = 20.", ["$20"]),
    ans("y9-si-m2", "Simple interest on $1000 at 10% for 2 years.", "I=Prn", "200", 2, "1000 × 0.10 × 2 = 200.", ["$200"]),
    ans("y9-si-m3", "Total amount for $600 at 5% for 2 years.", "A=P+I", "660", 3, "I = 60, A = 660.", ["$660"]),
    ans("y9-si-m4", "Simple interest on $3000 at 4% for 5 years.", "I=Prn", "600", 3, "3000 × 0.04 × 5 = 600.", ["$600"]),
    mcq("y9-si-m5", "Write 2.5% as a decimal.", "B", ["0.25", "0.025", "2.5", "0.0025"], 2, "2.5% = 2.5/100 = 0.025."),
    ans("y9-si-m6", "Simple interest on $1200 at 3% for 2 years.", "I=Prn", "72", 3, "1200 × 0.03 × 2 = 72.", ["$72"]),
    ans("y9-si-m7", "Total amount for $500 at 8% for 1 year.", "A=P+I", "540", 3, "I = 40, A = 540.", ["$540"]),
    ans("y9-si-m8", "Simple interest on $10000 at 6% for 3 years.", "I=Prn", "1800", 3, "10000 × 0.06 × 3 = 1800.", ["$1800"]),
    mcq("y9-si-m9", "Compared with compound interest, the simple interest added each period is:", "A", ["constant", "growing", "shrinking", "random"], 3, "Simple interest is the same fixed amount each period."),
    ans("y9-si-m10", "Simple interest on $750 at 4% for 2 years.", "I=Prn", "60", 3, "750 × 0.04 × 2 = 60.", ["$60"]),
  ],
  masteryQuizPool: [
    ans("y9-si-p1", "A simple-interest investment earns $180 over 2 years at 6% per year. Find the principal.", "I=Prn", "1500", 5, "P = I/(rn) = 180/(0.06×2) = 1500.", ["$1500"]),
    ans("y9-si-p2", "$2000 earns $240 simple interest over 3 years. Find the annual rate (as a percentage).", "I=Prn", "4%", 5, "r = I/(Pn) = 240/(2000×3) = 0.04 = 4%.", ["4", "0.04"]),
    ans("y9-si-p3", "$2500 at 4% per year earns $300 simple interest. Find the number of years.", "I=Prn", "3", 5, "n = I/(Pr) = 300/(2500×0.04) = 3.", ["3 years"]),
    ans("y9-si-p4", "Find the simple interest on $1200 at 0.5% per month for 6 months.", "I=Prn", "36", 5, "1200 × 0.005 × 6 = 36.", ["$36"]),
    ans("y9-si-p5", "An investment of $5000 grows to $5750 with simple interest over 3 years. Find the annual rate (%).", "A=P+I", "5%", 5, "I = 750, r = 750/(5000×3) = 0.05 = 5%.", ["5", "0.05"]),
    ans("y9-si-p6", "How much simple interest does $4000 earn at 3.5% per year over 2 years?", "I=Prn", "280", 5, "4000 × 0.035 × 2 = 280.", ["$280"]),
    ans("y9-si-p7", "A loan of $3000 must repay $3360 after 2 years of simple interest. Find the annual rate (%).", "A=P+I", "6%", 5, "I = 360, r = 360/(3000×2) = 0.06 = 6%.", ["6", "0.06"]),
    ans("y9-si-p8", "Find the principal that earns $90 simple interest at 3% per year over 2 years.", "I=Prn", "1500", 5, "P = 90/(0.03×2) = 1500.", ["$1500"]),
    ans("y9-si-p9", "$800 at 5% per year — how many years to earn $200 simple interest?", "I=Prn", "5", 5, "n = 200/(800×0.05) = 5.", ["5 years"]),
    ans("y9-si-p10", "Find the total amount for $2400 at 2.5% per year over 4 years.", "A=P+I", "2640", 5, "I = 2400×0.025×4 = 240; A = 2640.", ["$2640"]),
  ],
  commonMistakes: [
    { mistake: "Using the percentage directly instead of a decimal.", fix: "Convert: 5% → 0.05 before multiplying." },
    { mistake: "Charging interest on principal + past interest.", fix: "Simple interest uses the ORIGINAL principal every period." },
    { mistake: "Reporting I when the question asks for the total.", fix: "Total A = P + I; read which is wanted." },
    { mistake: "Mismatching the rate period and n.", fix: "A per-year rate needs n in years (per-month rate → n in months)." },
  ],
  masteryPassMark: 0.8,
});

// ── gradient (ADAPT, Algebra, core) ────────────────────────────────────────────────────
const gradient: Partial<ExplicitLesson> = {
  description: "Find the gradient of a line as rise over run from two points, and interpret its sign.",
  learningIntention: "Calculate gradient from two points and read what its sign means.",
  successCriteria: ["State gradient = rise/run = (y₂−y₁)/(x₂−x₁).", "Compute the gradient between two points.", "Interpret positive, negative, zero and undefined gradients.", "Keep the subtraction order consistent."],
  teaching: {
    paragraphs: [
      "The GRADIENT measures a line's steepness: how much it rises for each step across — RISE over RUN. Between two points it is (y₂ − y₁)/(x₂ − x₁): the change in y divided by the change in x.",
      "From (1, 2) to (3, 8): rise = 8 − 2 = 6, run = 3 − 1 = 2, so gradient = 6/2 = 3. Keep the points in the SAME order top and bottom.",
      "The SIGN tells the direction: a POSITIVE gradient rises left-to-right; a NEGATIVE gradient falls left-to-right. From (0, 5) to (2, 1): (1 − 5)/(2 − 0) = −2.",
      "Two special cases: a HORIZONTAL line has gradient 0 (no rise); a VERTICAL line has an UNDEFINED gradient (the run is 0, so you'd divide by zero).",
    ],
    latexBlocks: ["m = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y_2 - y_1}{x_2 - x_1}", "\\text{positive: rises};\\ \\text{negative: falls}", "\\text{horizontal} = 0;\\ \\text{vertical} = \\text{undefined}"],
  },
  workedExamples: [
    { title: "From two points", questionLatex: "\\text{Gradient from } (1,2) \\text{ to } (3,8).", steps: [{ explanation: "(y₂−y₁)/(x₂−x₁).", latex: "\\frac{8-2}{3-1} = \\frac{6}{2} = 3" }], finalAnswerLatex: "3" },
    { title: "Negative gradient", questionLatex: "\\text{Gradient from } (0,5) \\text{ to } (2,1).", steps: [{ explanation: "Change in y over change in x.", latex: "\\frac{1-5}{2-0} = \\frac{-4}{2} = -2" }], finalAnswerLatex: "-2" },
    { title: "Horizontal line", questionLatex: "\\text{Gradient from } (2,3) \\text{ to } (5,3).", steps: [{ explanation: "No rise.", latex: "\\frac{3-3}{5-2} = 0" }], finalAnswerLatex: "0" },
  ],
  guidedPractice: [
    ans("y9-gr-g1", "Find the gradient from (0, 0) to (2, 6).", "(0,0)\\to(2,6)", "3", 2, "(6−0)/(2−0) = 3.", []),
    ans("y9-gr-g2", "Find the gradient from (1, 1) to (4, 7).", "(1,1)\\to(4,7)", "2", 2, "(7−1)/(4−1) = 6/3 = 2.", []),
    mcq("y9-gr-g3", "A line going down from left to right has a gradient that is:", "B", ["positive", "negative", "zero", "not defined"], 2, "Falling left-to-right means a negative gradient."),
    ans("y9-gr-g4", "Find the gradient from (2, 3) to (5, 3).", "(2,3)\\to(5,3)", "0", 2, "No rise, so gradient 0.", []),
  ],
  independentPractice: [
    ans("y9-gr-i1", "Find the gradient from (1, 2) to (3, 10).", "(1,2)\\to(3,10)", "4", 3, "(10−2)/(3−1) = 8/2 = 4.", []),
    ans("y9-gr-i2", "Find the gradient from (0, 4) to (2, 0).", "(0,4)\\to(2,0)", "-2", 3, "(0−4)/(2−0) = −2.", ["−2"]),
    ans("y9-gr-i3", "Find the gradient from (−1, −1) to (1, 3).", "(-1,-1)\\to(1,3)", "2", 3, "(3−(−1))/(1−(−1)) = 4/2 = 2.", []),
    mcq("y9-gr-i4", "The gradient of a vertical line is:", "D", ["0", "1", "negative", "not defined"], 3, "The run is 0, so the gradient is not defined."),
    ans("y9-gr-i5", "Find the gradient from (3, 5) to (6, 11).", "(3,5)\\to(6,11)", "2", 3, "(11−5)/(6−3) = 6/3 = 2.", []),
  ],
  masteryQuiz: [
    ans("y9-gr-m1", "Gradient from (0, 0) to (5, 10).", "(0,0)\\to(5,10)", "2", 2, "10/5 = 2.", []),
    ans("y9-gr-m2", "Gradient from (1, 3) to (4, 12).", "(1,3)\\to(4,12)", "3", 2, "9/3 = 3.", []),
    ans("y9-gr-m3", "Gradient from (2, 8) to (4, 4).", "(2,8)\\to(4,4)", "-2", 3, "(4−8)/(4−2) = −2.", ["−2"]),
    ans("y9-gr-m4", "Gradient from (0, 1) to (3, 1).", "(0,1)\\to(3,1)", "0", 2, "No rise → 0.", []),
    mcq("y9-gr-m5", "The gradient between (x₁,y₁) and (x₂,y₂) is:", "A", ["(y₂−y₁)/(x₂−x₁)", "(x₂−x₁)/(y₂−y₁)", "(y₂+y₁)/(x₂+x₁)", "x₂−x₁"], 3, "Rise over run."),
    ans("y9-gr-m6", "Gradient from (−2, 0) to (0, 4).", "(-2,0)\\to(0,4)", "2", 3, "(4−0)/(0−(−2)) = 4/2 = 2.", []),
    ans("y9-gr-m7", "Gradient from (1, 5) to (3, 1).", "(1,5)\\to(3,1)", "-2", 3, "(1−5)/(3−1) = −2.", ["−2"]),
    ans("y9-gr-m8", "Gradient from (0, 0) to (4, 2).", "(0,0)\\to(4,2)", "1/2", 3, "2/4 = 1/2.", ["0.5"]),
    mcq("y9-gr-m9", "A positive gradient means the line:", "A", ["rises left-to-right", "falls left-to-right", "is horizontal", "is vertical"], 2, "Positive gradient = rising."),
    ans("y9-gr-m10", "Gradient from (2, 1) to (5, 7).", "(2,1)\\to(5,7)", "2", 2, "6/3 = 2.", []),
  ],
  masteryQuizPool: [
    ans("y9-gr-p1", "A line has gradient 3 and passes through (1, 2) and (4, k). Find k.", "m=3", "11", 5, "k = 2 + 3×(4−1) = 11.", []),
    ans("y9-gr-p2", "Find the gradient of the line 2x + y = 5 (in the form y = mx + c).", "2x+y=5", "-2", 5, "y = −2x + 5, so m = −2.", ["−2"]),
    ans("y9-gr-p3", "A line parallel to one with gradient 4 has gradient:", "\\text{parallel}", "4", 5, "Parallel lines have equal gradients.", []),
    ans("y9-gr-p4", "Find the gradient from (−3, 2) to (1, −6).", "(-3,2)\\to(1,-6)", "-2", 5, "(−6−2)/(1−(−3)) = −8/4 = −2.", ["−2"]),
    ans("y9-gr-p5", "A line through (0, 1) has gradient 1/2. Find y when x = 6.", "m=1/2", "4", 5, "y = 1 + (1/2)(6) = 4.", []),
    ans("y9-gr-p6", "The gradient of y = 7 is:", "y=7", "0", 5, "A horizontal line has gradient 0.", []),
    ans("y9-gr-p7", "Points (2, a) and (6, 14) lie on a line of gradient 3. Find a.", "m=3", "2", 5, "14 − a = 3×(6−2) = 12, so a = 2.", []),
    ans("y9-gr-p8", "Find the gradient of the line 3x − y = 0.", "3x-y=0", "3", 5, "y = 3x, so m = 3.", []),
    ans("y9-gr-p9", "A line falls 5 units for every 2 units across. Its gradient is:", "\\text{fall }5/2", "-5/2", 5, "Falling → negative: −5/2 = −2.5.", ["-2.5", "−2.5", "−5/2"]),
    ans("y9-gr-p10", "Find the gradient from (a, 3) to (a, 9) (same x = a).", "(a,3)\\to(a,9)", "not defined", 5, "The run is 0 (vertical line), so the gradient is not defined.", ["undefined", "no gradient"]),
  ],
  commonMistakes: [
    { mistake: "Computing run/rise instead of rise/run.", fix: "Gradient is rise ÷ run = (y₂−y₁)/(x₂−x₁)." },
    { mistake: "Subtracting coordinates in inconsistent orders.", fix: "Use the same point as ‘2’ on top and bottom." },
    { mistake: "Calling a vertical line's gradient 0.", fix: "Vertical → undefined (÷0); horizontal → 0." },
    { mistake: "Dropping the negative sign when a line falls.", fix: "A falling line has a negative gradient." },
  ],
  masteryPassMark: 0.8,
};

// ── circle-circumference-sector-perimeter (NET-NEW, Measurement, consolidating) ────────
const circleCircumference: Partial<ExplicitLesson> = {
  description: "Find the circumference of a circle and the arc length / perimeter of a sector.",
  learningIntention: "Use C = 2πr (= πd) and find arc length and sector perimeter.",
  successCriteria: ["State C = 2πr = πd.", "Find a circumference in exact (π) and decimal form.", "Find an arc length as a fraction of the circumference.", "Find a sector's perimeter as arc + 2 radii."],
  teaching: {
    paragraphs: [
      "The CIRCUMFERENCE is the distance all the way around a circle. It is C = 2πr, where r is the radius — and since the diameter d = 2r, the same rule is C = πd.",
      "Answers can be left EXACT (in terms of π) or given as a DECIMAL. For r = 5: C = 2π(5) = 10π ≈ 31.4.",
      "An ARC is part of the circumference. A sector cut by an angle θ has arc length equal to that FRACTION of the whole circumference: (θ/360) × 2πr. A quarter circle (90°) has arc (90/360) × 2πr = ¼ of the circumference.",
      "The PERIMETER of a sector is the arc PLUS the two straight radii: perimeter = arc + 2r. Don't forget the two radii — the arc alone is not the full boundary.",
    ],
    latexBlocks: ["C = 2\\pi r = \\pi d", "\\text{arc} = \\dfrac{\\theta}{360} \\times 2\\pi r", "\\text{sector perimeter} = \\text{arc} + 2r"],
  },
  workedExamples: [
    { title: "Circumference", questionLatex: "\\text{Find } C \\text{ for } r = 5 \\text{ (exact).}", steps: [{ explanation: "C = 2πr.", latex: "2\\pi(5) = 10\\pi" }], finalAnswerLatex: "10\\pi" },
    { title: "From the diameter", questionLatex: "\\text{Find } C \\text{ for } d = 14 \\text{ (exact).}", steps: [{ explanation: "C = πd.", latex: "14\\pi" }], finalAnswerLatex: "14\\pi" },
    { title: "Arc of a quarter circle", questionLatex: "\\text{Arc length of a quarter circle, } r = 8.", steps: [{ explanation: "(90/360) of 2πr.", latex: "\\tfrac{1}{4}\\times 2\\pi(8) = 4\\pi" }], finalAnswerLatex: "4\\pi" },
  ],
  guidedPractice: [
    ans("y9-cc-g1", "Find the circumference of a circle with r = 3 (exact, in terms of π).", "C=2\\pi r", "6π", 2, "2π(3) = 6π.", ["6\\pi", "6pi"]),
    ans("y9-cc-g2", "Find the circumference of a circle with d = 10 (exact).", "C=\\pi d", "10π", 2, "π(10) = 10π.", ["10\\pi", "10pi"]),
    mcq("y9-cc-g3", "The circumference of a circle is:", "A", ["2πr", "πr²", "2r", "r²"], 2, "C = 2πr (= πd); πr² is the area."),
    ans("y9-cc-g4", "Find the arc length of a semicircle with r = 6 (exact).", "\\text{semicircle}", "6π", 3, "Half of 2π(6) = 6π.", ["6\\pi", "6pi"]),
  ],
  independentPractice: [
    ans("y9-cc-i1", "Find the circumference for r = 7 (exact).", "C=2\\pi r", "14π", 2, "2π(7) = 14π.", ["14\\pi", "14pi"]),
    ans("y9-cc-i2", "Find the circumference for d = 20 (exact).", "C=\\pi d", "20π", 2, "π(20) = 20π.", ["20\\pi", "20pi"]),
    ans("y9-cc-i3", "Find the arc length of a quarter circle with r = 4 (exact).", "\\text{quarter}", "2π", 3, "(1/4)2π(4) = 2π.", ["2\\pi", "2pi"]),
    mcq("y9-cc-i4", "The perimeter of a sector equals the arc length plus:", "C", ["one radius", "the diameter", "two radii", "the area"], 3, "A sector is bounded by the arc and two radii."),
    ans("y9-cc-i5", "Find the circumference for r = 1 (exact).", "C=2\\pi r", "2π", 2, "2π(1) = 2π.", ["2\\pi", "2pi"]),
  ],
  masteryQuiz: [
    ans("y9-cc-m1", "Circumference for r = 2 (exact).", "C=2\\pi r", "4π", 2, "2π(2) = 4π.", ["4\\pi", "4pi"]),
    ans("y9-cc-m2", "Circumference for d = 8 (exact).", "C=\\pi d", "8π", 2, "π(8) = 8π.", ["8\\pi", "8pi"]),
    ans("y9-cc-m3", "Arc length of a semicircle with r = 10 (exact).", "\\text{semicircle}", "10π", 3, "Half of 2π(10) = 10π.", ["10\\pi", "10pi"]),
    ans("y9-cc-m4", "Arc length of a quarter circle with r = 12 (exact).", "\\text{quarter}", "6π", 3, "(1/4)2π(12) = 6π.", ["6\\pi", "6pi"]),
    mcq("y9-cc-m5", "The circumference is best described as:", "C", ["the space inside the circle", "half the diameter", "the distance around the circle", "the longest chord"], 2, "Circumference = the distance around the circle."),
    ans("y9-cc-m6", "Circumference for r = 0.5 (exact).", "C=2\\pi r", "π", 3, "2π(0.5) = π.", ["\\pi", "1π", "pi"]),
    ans("y9-cc-m7", "A sector has arc length 3π and radius 5. Find its perimeter (exact).", "\\text{arc}+2r", "3π + 10", 4, "Perimeter = arc + 2r = 3π + 10.", ["3\\pi+10", "10+3π", "3pi+10"]),
    mcq("y9-cc-m8", "πd is equal to:", "B", ["πr²", "2πr", "πr", "2r"], 3, "d = 2r, so πd = 2πr."),
    ans("y9-cc-m9", "Circumference for r = 100 (exact).", "C=2\\pi r", "200π", 2, "2π(100) = 200π.", ["200\\pi", "200pi"]),
    ans("y9-cc-m10", "Arc length of a third of a circle (120°) with r = 9 (exact).", "\\text{third}", "6π", 4, "(120/360)2π(9) = (1/3)18π = 6π.", ["6\\pi", "6pi"]),
  ],
  masteryQuizPool: [
    ans("y9-cc-p1", "A circle has circumference 12π. Find its radius.", "C=2\\pi r", "6", 5, "2πr = 12π → r = 6.", []),
    ans("y9-cc-p2", "A circle has circumference 10π. Find its diameter.", "C=\\pi d", "10", 5, "πd = 10π → d = 10.", []),
    ans("y9-cc-p3", "Find the perimeter of a quarter circle (two radii + arc) with r = 4 (exact).", "\\text{quarter sector}", "2π + 8", 5, "arc = 2π, + 2r = 8 → 2π + 8.", ["2\\pi+8", "8+2π", "2pi+8"]),
    ans("y9-cc-p4", "A semicircle has radius 6. Find its full perimeter (arc + diameter, exact).", "\\text{semicircle perimeter}", "6π + 12", 5, "arc = 6π, + diameter 12 → 6π + 12.", ["6\\pi+12", "12+6π", "6pi+12"]),
    ans("y9-cc-p5", "A 90° sector has arc length 5π. Find the circle's radius.", "\\text{arc}=\\tfrac14 C", "10", 5, "Arc = (1/4)2πr = 5π → πr/2 = 5π → r = 10.", []),
    ans("y9-cc-p6", "Two circles have radii 3 and 5. Find the difference in their circumferences (exact).", "\\Delta C", "4π", 5, "10π − 6π = 4π.", ["4\\pi", "4pi"]),
    ans("y9-cc-p7", "A wheel of radius 0.5 m travels one full turn. How far does it move (exact, metres)?", "C=2\\pi r", "π", 5, "Distance = circumference = 2π(0.5) = π m.", ["\\pi", "pi"]),
    ans("y9-cc-p8", "A sector has radius 7 and arc length 7π. What fraction of the full circle is it?", "\\text{arc}/C", "1/2", 5, "C = 14π; 7π/14π = 1/2.", ["0.5", "half"]),
    ans("y9-cc-p9", "Find the perimeter of a semicircle of diameter 10 (arc + diameter, exact).", "\\text{semicircle}", "5π + 10", 5, "r = 5, arc = 5π, + diameter 10 → 5π + 10.", ["5\\pi+10", "10+5π", "5pi+10"]),
    ans("y9-cc-p10", "A 120° sector of a circle radius 6 has what arc length (exact)?", "\\text{arc}", "4π", 5, "(120/360)2π(6) = (1/3)12π = 4π.", ["4\\pi", "4pi"]),
  ],
  commonMistakes: [
    { mistake: "Using πr² (the area) for the circumference.", fix: "Circumference is C = 2πr; πr² is the area." },
    { mistake: "Confusing radius and diameter.", fix: "C = 2πr or πd — halve the diameter to get r." },
    { mistake: "Giving a sector's perimeter as the arc only.", fix: "Add the two radii: perimeter = arc + 2r." },
    { mistake: "Forgetting the angle fraction for an arc.", fix: "Arc = (θ/360) × 2πr." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, { unit: string; lesson: Partial<ExplicitLesson> }> = {
  "simple-interest": { unit: "computation-financial-maths", lesson: simpleInterest },
  "gradient": { unit: "linear-relationships", lesson: gradient },
  "circle-circumference-sector-perimeter": { unit: "length-area-surface-area-volume", lesson: circleCircumference },
};

export function year9Wave1ValidationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug)) {
    return null;
  }
  const entry = SECTIONS[lesson.slug];
  if (!entry || entry.unit !== unit.slug) return null;
  return entry.lesson;
}
