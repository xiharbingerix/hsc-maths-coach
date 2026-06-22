// Year 12 Standard 1 — Unit 9 "Graphs of Practical Situations" — Wave 4 authored sections.
//
//   9A Exponential Graphs   (exponential-graphs)            — net-new
//   9B Exponential Models   (exponential-inverse-variation) — RE-AUTHORED exponential-only
//   9C Quadratic Functions  (quadratic-functions)           — net-new
//   9E Reciprocal Graphs    (reciprocal-graphs)             — inverse variation, net-new
//   9F Reciprocal Models    (reciprocal-models)             — inverse variation, net-new
//   9G Miscellaneous Problems (graphs-miscellaneous)        — model discrimination, net-new
//
// 9D (quadratic-models) keeps its existing override + addVisuals/editorialRewrite patches.
//
// TRANSITIONAL SLUG COMPROMISE (resolves the exponential-inverse-variation defect):
// section 9B keeps the legacy slug `exponential-inverse-variation` to preserve student
// progress, but its content is now GENUINELY EXPONENTIAL ONLY. The old stub returned linear/
// direct-variation teaching plus inverse "*-fill" questions (see the P3 exponentials audit +
// structural review); that override is removed from the chain and its addMissingQuestions
// branch deleted. Inverse-variation now lives in 9E/9F. The slug name no longer matches its
// content — renaming it is deferred until a progress-key migration is settled.
//
// Pattern matches Waves 1–3: Feynman teaching, 4/5/10 with EXACTLY 1/1/3 MCQs per section,
// authored cognitive-demand difficulty, markable answers. IDs unprefixed; `y12s1-` auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";

const UNIT = "graphs-of-practical-situations";

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

const growthPlot = {
  description: "Exponential growth curve through (0,1), (1,2), (2,4), (3,8), (4,16): low and flat at first, then rising steeply (a J-shape).",
  points: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 8 }, { x: 4, y: 16 }],
  xMin: 0, xMax: 5, yMin: 0, yMax: 18, xStep: 1, yStep: 2, xAxisLabel: "x", yAxisLabel: "y",
};
const decayPlot = {
  description: "Exponential decay curve through (0,16), (1,8), (2,4), (3,2), (4,1): high at first, then falling and flattening toward the x-axis.",
  points: [{ x: 0, y: 16 }, { x: 1, y: 8 }, { x: 2, y: 4 }, { x: 3, y: 2 }, { x: 4, y: 1 }],
  xMin: 0, xMax: 5, yMin: 0, yMax: 18, xStep: 1, yStep: 2, xAxisLabel: "x", yAxisLabel: "y",
};
const reciprocalPlot = {
  description: "Reciprocal curve y = 12/x through (1,12), (2,6), (3,4), (4,3), (6,2): falling steeply then flattening, approaching but never touching the axes.",
  points: [{ x: 1, y: 12 }, { x: 2, y: 6 }, { x: 3, y: 4 }, { x: 4, y: 3 }, { x: 6, y: 2 }],
  xMin: 0, xMax: 7, yMin: 0, yMax: 14, xStep: 1, yStep: 2, xAxisLabel: "x", yAxisLabel: "y",
};

// ── 9A Exponential Graphs ────────────────────────────────────────────────────────────
export function year12Standard1ExponentialGraphsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "exponential-graphs") {
    return null;
  }
  return {
    description:
      "Recognise and interpret exponential graphs y = a·bˣ: growth versus decay, the y-intercept, the horizontal asymptote, and exponential versus linear behaviour.",
    learningIntention:
      "Identify exponential growth and decay from a graph or table and read key features such as the starting value.",
    successCriteria: [
      "Decide whether an exponential is growth (b > 1) or decay (0 < b < 1).",
      "Read the y-intercept of y = a·bˣ as the value a (at x = 0).",
      "Recognise an exponential from a table by a constant ratio between successive y-values.",
      "Describe the horizontal asymptote that the curve approaches but never reaches.",
    ],
    teaching: {
      paragraphs: [
        "An exponential function y = a·bˣ does something a straight line never does: instead of adding the same amount each step, it MULTIPLIES by the same factor b each step. That single difference makes the graph a sweeping curve, not a line. If b > 1 the curve climbs faster and faster — exponential growth; if b is between 0 and 1 it falls and flattens — exponential decay.",
        "The starting value is easy to read: at x = 0, bˣ = 1, so y = a. That means a is the y-intercept — where the curve crosses the y-axis. From there, each step right multiplies by b. So y = 3·2ˣ starts at 3 and doubles every step: 3, 6, 12, 24.",
        "A decay curve gets closer and closer to the x-axis (the line y = 0) but never actually touches it — that line is the horizontal asymptote. Growth curves shoot upward without limit. Either way the curve never crosses y = 0, which is a quick way to tell an exponential from a line that can go negative.",
        "To spot an exponential in a TABLE, check the RATIO between successive y-values, not the difference. Constant difference means linear; constant ratio (e.g. each y is ×3 the last) means exponential. 2, 6, 18, 54 is exponential (×3); 2, 6, 10, 14 is linear (+4).",
      ],
      latexBlocks: [
        "y = a \\cdot b^x\\quad(a = \\text{y-intercept},\\ b = \\text{factor per step})",
        "b > 1 \\Rightarrow \\text{growth},\\qquad 0 < b < 1 \\Rightarrow \\text{decay}",
        "\\text{linear: constant difference};\\quad \\text{exponential: constant ratio}",
      ],
    },
    workedExamples: [
      {
        title: "Read the starting value and a later value",
        questionLatex: "\\text{For } y = 3 \\cdot 2^x\\text{, state the y-intercept and find } y \\text{ at } x = 3.",
        steps: [
          { explanation: "At x = 0, 2⁰ = 1, so y = a.", latex: "\\text{y-intercept} = 3" },
          { explanation: "Multiply by 2 three times.", latex: "y = 3 \\cdot 2^3 = 3 \\cdot 8 = 24" },
        ],
        finalAnswerLatex: "\\text{y-intercept } 3,\\ y = 24",
      },
      {
        title: "Linear or exponential from a table?",
        questionLatex: "\\text{Is the table } x: 0,1,2,3,\\ y: 2,6,18,54 \\text{ linear or exponential?}",
        steps: [
          { explanation: "Check the ratio between successive y-values.", latex: "6/2 = 3,\\ 18/6 = 3,\\ 54/18 = 3" },
          { explanation: "A constant ratio means exponential.", latex: "\\text{exponential (×3)}" },
        ],
        finalAnswerLatex: "\\text{Exponential}",
      },
    ],
    guidedPractice: [
      mcq("expg-g1", "An exponential graph y = a·bˣ with b > 1 shows:", "B",
        ["exponential decay", "exponential growth", "a straight line", "a constant value"], 1,
        "b greater than 1 multiplies up each step.",
        "When b > 1 the values multiply up each step, so the graph shows exponential growth."),
      ans("expg-g2", "For y = 3·2ˣ, find the y-intercept (the value of y when x = 0).", "y = 3 \\cdot 2^0", "3", 2,
        "At x = 0, 2⁰ = 1.", "At x = 0, 2⁰ = 1, so y = 3 × 1 = 3. The y-intercept is 3."),
      ans("expg-g3", "Using the graph, is this exponential growth or decay?", "\\text{read the trend}", "growth", 2,
        "Does the curve rise or fall as x increases?", "The curve rises faster and faster as x increases, so it shows exponential growth.",
        ["exponential growth"], { cartesianGraph: growthPlot }),
      ans("expg-g4", "For y = 5·2ˣ, find y when x = 3.", "y = 5 \\cdot 2^3", "40", 2,
        "Multiply 5 by 2 three times.", "y = 5 × 2³ = 5 × 8 = 40."),
    ],
    independentPractice: [
      ans("expg-i1", "For y = 100·(0.5)ˣ, find y when x = 2.", "y = 100 \\cdot 0.5^2", "25", 2,
        "0.5² = 0.25.", "y = 100 × 0.5² = 100 × 0.25 = 25."),
      mcq("expg-i2", "A table shows x: 0,1,2,3 and y: 2,6,18,54. Is this linear or exponential?", "B",
        ["linear, because y keeps rising", "exponential, because each y is 3× the last", "linear, with gradient 3", "neither"], 3,
        "Check the ratio between successive y-values.", "Each y-value is 3 times the previous (6/2 = 18/6 = 54/18 = 3) — a constant ratio means exponential, not linear."),
      ans("expg-i3", "Using the graph, is this exponential growth or decay?", "\\text{read the trend}", "decay", 3,
        "Does the curve fall toward the x-axis?", "The curve falls and flattens toward the x-axis as x increases, so it shows exponential decay.",
        ["exponential decay"], { cartesianGraph: decayPlot }),
      ans("expg-i4", "An exponential decay curve gets closer and closer to which line but never reaches it?", "y = 0", "y=0", 3,
        "It is the horizontal line the curve flattens toward.", "A decay curve approaches the x-axis, the line y = 0 (its horizontal asymptote), but never touches it.",
        ["the x-axis", "x-axis", "0"]),
      ans("expg-i5", "An exponential y = a·bˣ passes through (0, 4). Find a.", "y = a \\cdot b^0", "4", 3,
        "At x = 0 the value is a.", "At x = 0, bˣ = 1, so y = a. Since the curve passes through (0, 4), a = 4."),
    ],
    masteryQuiz: [
      ans("expg-m1", "State the y-intercept of y = 7·3ˣ.", "y = 7 \\cdot 3^0", "7", 2,
        "At x = 0, 3⁰ = 1.", "At x = 0, y = 7 × 3⁰ = 7. The y-intercept is 7."),
      mcq("expg-m2", "Which of these equations is exponential?", "C",
        ["y = 2x + 1", "y = x²", "y = 3·2ˣ", "y = 5/x"], 3,
        "Exponential has the variable in the power.", "y = 3·2ˣ has the variable x in the exponent, so it is exponential. The others are linear, quadratic and reciprocal."),
      ans("expg-m3", "Using the graph, is this exponential growth or decay?", "\\text{read the trend}", "growth", 2,
        "Does the curve rise steeply as x increases?", "The curve rises faster and faster as x increases — exponential growth.",
        ["exponential growth"], { cartesianGraph: growthPlot }),
      ans("expg-m4", "For y = 2·5ˣ, find y when x = 2.", "y = 2 \\cdot 5^2", "50", 2,
        "5² = 25.", "y = 2 × 5² = 2 × 25 = 50."),
      mcq("expg-m5", "What is the key difference between a linear and an exponential pattern?", "B",
        ["Linear curves, exponential is straight", "Linear adds a constant each step; exponential multiplies by a constant factor", "They are the same", "Exponential adds a constant each step"], 3,
        "Think about what happens between successive steps.", "A linear pattern adds the same amount each step (constant difference); an exponential pattern multiplies by the same factor each step (constant ratio)."),
      ans("expg-m6", "A table shows x: 0,1,2 and y: 80,40,20. Is this exponential growth or decay?", "40/80 = 0.5", "decay", 3,
        "Find the ratio between successive y-values.", "Each y is half the previous (×0.5), a constant ratio less than 1, so it is exponential decay.",
        ["exponential decay"]),
      ans("expg-m7", "For y = 6·2ˣ, find y when x = 0.", "y = 6 \\cdot 2^0", "6", 2,
        "Anything to the power 0 is 1.", "At x = 0, 2⁰ = 1, so y = 6 × 1 = 6."),
      mcq("expg-m8", "The graph of y = a·bˣ has a horizontal asymptote at:", "A",
        ["y = 0", "y = a", "x = 0", "y = b"], 3,
        "Which line does the curve approach but never cross?", "An exponential curve approaches the x-axis, y = 0, getting ever closer without touching it."),
      ans("expg-m9", "A quantity starts at 5 and multiplies by 2 every step. Find its value after 4 steps.", "5 \\cdot 2^4", "80", 4,
        "Multiply by 2 four times: that is ×2⁴.", "After 4 steps the value is 5 × 2⁴ = 5 × 16 = 80."),
      ans("expg-m10", "For very large x, which becomes larger — the linear y = 10x or the exponential y = 2ˣ? Answer linear or exponential.", "2^x \\text{ vs } 10x", "exponential", 4,
        "Exponential growth eventually overtakes any straight line.", "Although 10x is bigger for small x, the exponential 2ˣ multiplies each step and eventually overtakes and exceeds any linear function, so for large x the exponential is larger.",
        ["the exponential"]),
    ],
    commonMistakes: [
      { mistake: "Treating an exponential like a line (adding instead of multiplying).", fix: "Exponential MULTIPLIES by a constant factor each step; check the ratio, not the difference." },
      { mistake: "Thinking a decay curve eventually reaches zero.", fix: "It approaches the asymptote y = 0 but never touches it." },
      { mistake: "Confusing growth and decay.", fix: "b > 1 grows; 0 < b < 1 decays." },
      { mistake: "Reading the y-intercept as b instead of a.", fix: "At x = 0 the value is a, so a is the y-intercept." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 9B Exponential Models (slug: exponential-inverse-variation, now exponential-only) ──
export function year12Standard1ExponentialModelsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "exponential-inverse-variation") {
    return null;
  }
  return {
    description:
      "Model exponential growth and decay: repeated multiplication, growth and decay factors, and predicting future amounts.",
    learningIntention:
      "Model real growth and decay by repeated multiplication and use growth/decay factors to predict future amounts.",
    successCriteria: [
      "Find a future amount when a quantity is multiplied by a fixed factor each period.",
      "Write the growth or decay factor from a percentage rate (e.g. +25% → ×1.25).",
      "Apply A = P(1 + r)ⁿ for growth and P(1 − r)ⁿ for decay.",
      "Distinguish exponential change (multiplying) from linear change (adding).",
    ],
    teaching: {
      paragraphs: [
        "Exponential models describe anything that grows or shrinks by the same FACTOR each period — populations, investments, radioactive decay, depreciation. The engine is repeated multiplication: the future amount is the starting amount times the factor, applied once for every period. If a colony doubles each day, the factor is 2; after n days you have start × 2ⁿ (the factor multiplied in n times).",
        "Percentages turn into factors. A 25% increase means you keep the original 100% and add 25%, so you multiply by 1.25 (the growth factor = 1 + r). A 25% decrease means you keep 75%, so you multiply by 0.75 (the decay factor = 1 − r). This is the most common slip: the factor is 1 ± r, not just r.",
        "Putting it together gives A = P(1 + r)ⁿ for growth and A = P(1 − r)ⁿ for decay, where P is the start, r the rate as a decimal, and n the number of periods. $1000 growing 10% a year for 2 years is 1000 × 1.1² = $1210 — not 1000 + 10% twice in a naive way.",
        "Always ask: is this adding or multiplying? Saving $50 a month is LINEAR (same amount added). Money earning 5% interest is EXPONENTIAL (same factor applied). A plant that doubles weekly does not grow by a fixed number of centimetres — it multiplies, so 10 cm after 3 weeks is 10 × 2³ = 80 cm, not 10 + something.",
      ],
      latexBlocks: [
        "\\text{future} = \\text{start} \\times (\\text{factor})^{\\text{periods}}",
        "\\text{growth factor} = 1 + r,\\qquad \\text{decay factor} = 1 - r",
        "A = P(1 + r)^n \\ (\\text{growth}),\\qquad A = P(1 - r)^n \\ (\\text{decay})",
      ],
    },
    workedExamples: [
      {
        title: "Repeated doubling",
        questionLatex: "\\text{A population of 150 doubles each year. Find the population after 3 years.}",
        steps: [
          { explanation: "Doubling means multiply by 2 each year, three times.", latex: "150 \\times 2^3" },
          { explanation: "Evaluate.", latex: "= 150 \\times 8 = 1200" },
        ],
        finalAnswerLatex: "1200",
      },
      {
        title: "Percentage growth with a factor",
        questionLatex: "\\text{\\$5000 earns 4\\% per year. Find the amount after 2 years.}",
        steps: [
          { explanation: "Growth factor = 1 + 0.04 = 1.04.", latex: "A = 5000 \\times 1.04^2" },
          { explanation: "Evaluate.", latex: "= 5000 \\times 1.0816 = \\$5408" },
        ],
        finalAnswerLatex: "\\$5408",
      },
    ],
    guidedPractice: [
      mcq("expm-g1", "A quantity that doubles each period is modelled by:", "B",
        ["adding 2 each period", "multiplying by 2 each period", "multiplying by 0.5 each period", "adding 100 each period"], 1,
        "Doubling is a multiplication.", "Doubling means multiplying by 2 each period — repeated multiplication, the heart of an exponential model."),
      ans("expm-g2", "A colony of 150 doubles each year. Find the population after 1 year.", "150 \\times 2", "300", 2,
        "Double once.", "After 1 year: 150 × 2 = 300."),
      ans("expm-g3", "A colony of 150 doubles each year. Find the population after 3 years.", "150 \\times 2^3", "1200", 2,
        "Multiply by 2 three times.", "After 3 years: 150 × 2³ = 150 × 8 = 1200."),
      ans("expm-g4", "A sample of 800 halves each hour. Find the amount after 2 hours.", "800 \\times 0.5^2", "200", 2,
        "Halve twice (×0.5 each time).", "After 2 hours: 800 × 0.5² = 800 × 0.25 = 200."),
    ],
    independentPractice: [
      ans("expm-i1", "A culture of 50 triples each day. Find the amount after 2 days.", "50 \\times 3^2", "450", 2,
        "Multiply by 3 twice.", "After 2 days: 50 × 3² = 50 × 9 = 450."),
      mcq("expm-i2", "Which model gives the value of $2000 growing at 5% per year for n years?", "A",
        ["2000 × (1.05)ⁿ", "2000 × (0.05)ⁿ", "2000 + 0.05n", "2000 × (1.5)ⁿ"], 3,
        "The growth factor is 1 + r.", "A 5% increase keeps 100% and adds 5%, giving a growth factor of 1.05, so the model is 2000 × (1.05)ⁿ."),
      ans("expm-i3", "$1000 grows at 10% per year. Find the amount after 2 years.", "1000 \\times 1.1^2", "1210", 3,
        "Growth factor 1.1, applied twice.", "A = 1000 × 1.1² = 1000 × 1.21 = $1210.", ["$1210"]),
      ans("expm-i4", "A car worth $20000 loses 20% of its value each year. Find its value after 1 year.", "20000 \\times 0.8", "16000", 3,
        "Losing 20% keeps 80% (decay factor 0.8).", "Value = 20000 × (1 − 0.2) = 20000 × 0.8 = $16000.", ["$16000"]),
      ans("expm-i5", "Bacteria double every hour, starting from 200. Find the number after 4 hours.", "200 \\times 2^4", "3200", 3,
        "Multiply by 2 four times.", "After 4 hours: 200 × 2⁴ = 200 × 16 = 3200."),
    ],
    masteryQuiz: [
      ans("expm-m1", "A value of 100 doubles each step. Find its value after 5 steps.", "100 \\times 2^5", "3200", 2,
        "Multiply by 2 five times.", "100 × 2⁵ = 100 × 32 = 3200."),
      mcq("expm-m2", "A plant is 10 cm tall and doubles in height each week. How tall is it after 3 weeks?", "C",
        ["16 cm", "60 cm", "80 cm", "30 cm"], 3,
        "Doubling multiplies; it does not add a fixed amount.", "Doubling each week is ×2³: 10 × 2³ = 10 × 8 = 80 cm. The wrong answers come from adding instead of multiplying."),
      ans("expm-m3", "$5000 is invested at 4% per year. Find the amount after 2 years.", "5000 \\times 1.04^2", "5408", 3,
        "Growth factor 1.04, applied twice.", "A = 5000 × 1.04² = 5000 × 1.0816 = $5408.", ["$5408"]),
      ans("expm-m4", "A quantity of 640 halves each step. Find its value after 3 steps.", "640 \\times 0.5^3", "80", 3,
        "Halve three times.", "640 × 0.5³ = 640 × 0.125 = 80."),
      mcq("expm-m5", "The growth factor for a 25% annual increase is:", "B",
        ["0.25", "1.25", "25", "0.75"], 3,
        "Keep 100% and add the increase.", "A 25% increase keeps the original 100% and adds 25%, giving a growth factor of 1 + 0.25 = 1.25."),
      ans("expm-m6", "Equipment worth $8000 depreciates 10% per year. Find its value after 3 years.", "8000 \\times 0.9^3", "5832", 4,
        "Decay factor 0.9, applied three times.", "Value = 8000 × 0.9³ = 8000 × 0.729 = $5832.", ["$5832"]),
      ans("expm-m7", "A culture of 300 triples each hour. Find the amount after 2 hours.", "300 \\times 3^2", "2700", 3,
        "Multiply by 3 twice.", "300 × 3² = 300 × 9 = 2700."),
      mcq("expm-m8", "Which describes exponential DECAY?", "C",
        ["multiplying by 2 each step", "multiplying by 1.1 each step", "multiplying by 0.85 each step", "adding 5 each step"], 3,
        "Decay multiplies by a factor between 0 and 1.", "Multiplying by 0.85 each step shrinks the quantity by 15% each time — exponential decay. ×2 and ×1.1 grow; +5 is linear."),
      ans("expm-m9", "A population of 1000 grows 20% per year. Find the population after 2 years.", "1000 \\times 1.2^2", "1440", 4,
        "Growth factor 1.2, applied twice.", "A = 1000 × 1.2² = 1000 × 1.44 = 1440."),
      ans("expm-m10", "Sales double every 2 years, starting at 400. Find the sales after 6 years.", "400 \\times 2^{6/2}", "3200", 4,
        "First work out how many doublings happen in 6 years.", "6 years ÷ 2 years per doubling = 3 doublings: 400 × 2³ = 400 × 8 = 3200."),
    ],
    commonMistakes: [
      { mistake: "Adding a fixed amount instead of multiplying by a factor.", fix: "Exponential change multiplies each period; check whether the situation adds or multiplies." },
      { mistake: "Using the rate r instead of the factor 1 ± r.", fix: "Growth factor = 1 + r; decay factor = 1 − r." },
      { mistake: "Using the wrong number of periods.", fix: "Match the exponent to the number of periods (e.g. doublings), converting units first if needed." },
      { mistake: "Treating depreciation as subtracting the same dollars each year.", fix: "Percentage depreciation multiplies by (1 − r) each year." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 9C Quadratic Functions ───────────────────────────────────────────────────────────
export function year12Standard1QuadraticFunctionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "quadratic-functions") {
    return null;
  }
  const parabolaMin = {
    description: "Upward-opening parabola y = x² − 4x + 3 with a minimum turning point at (2, −1), crossing the x-axis at 1 and 3.",
    xMin: -1, xMax: 5, yMin: -2, yMax: 8, xStep: 1, yStep: 1, showGrid: true, xAxisLabel: "x", yAxisLabel: "y",
    parabolas: [{ kind: "quadratic" as const, a: 1, b: -4, c: 3, label: "y = x^2 - 4x + 3" }],
  };
  const parabolaMax = {
    description: "Downward-opening parabola y = −x² + 2x + 3 with a maximum turning point at (1, 4).",
    xMin: -2, xMax: 4, yMin: -3, yMax: 5, xStep: 1, yStep: 1, showGrid: true, xAxisLabel: "x", yAxisLabel: "y",
    parabolas: [{ kind: "quadratic" as const, a: -1, b: 2, c: 3, label: "y = -x^2 + 2x + 3" }],
  };
  return {
    description:
      "Identify and interpret key features of quadratic functions: concavity, y-intercept, vertex (turning point), and axis of symmetry.",
    learningIntention:
      "Read the concavity, intercepts, vertex and axis of symmetry of a quadratic function.",
    successCriteria: [
      "Decide whether a parabola opens up or down from the sign of a.",
      "Read the y-intercept of y = ax² + bx + c as c.",
      "State the vertex of y = a(x − h)² + k as (h, k).",
      "Find the axis of symmetry, including from x-intercepts or x = −b/(2a).",
    ],
    teaching: {
      paragraphs: [
        "A quadratic function y = ax² + bx + c draws a parabola — a smooth U (or upside-down U). The single most important letter is a: if a is positive the parabola opens UP and has a lowest point (a minimum); if a is negative it opens DOWN and has a highest point (a maximum). Bigger |a| makes it narrower.",
        "Parabolas are perfectly symmetric. The turning point — the vertex — sits at the bottom of a U or the top of an upside-down U, and a vertical line through it, the axis of symmetry, mirrors the two sides. The y-intercept is the easy one: at x = 0 everything with an x vanishes, leaving y = c.",
        "Turning-point form y = a(x − h)² + k hands you the vertex directly: it is (h, k). Watch the sign — y = (x − 2)² + 5 has vertex (2, 5), but y = (x + 3)² − 4 has vertex (−3, −4), because x + 3 is x − (−3). The k is the maximum or minimum value of y.",
        "If you know the x-intercepts (roots), the axis of symmetry runs exactly halfway between them, so the vertex's x-value is their average. Otherwise use x = −b/(2a). Do not confuse the roots (where y = 0) with the vertex (the turning point).",
      ],
      latexBlocks: [
        "y = ax^2 + bx + c\\quad(a > 0: \\text{opens up};\\ a < 0: \\text{opens down};\\ c = \\text{y-intercept})",
        "y = a(x - h)^2 + k\\ \\Rightarrow\\ \\text{vertex } (h, k)",
        "\\text{axis of symmetry: } x = -\\tfrac{b}{2a} = \\text{midpoint of the x-intercepts}",
      ],
    },
    workedExamples: [
      {
        title: "Concavity and y-intercept",
        questionLatex: "\\text{For } y = x^2 - 4x + 3\\text{, state the y-intercept and whether it opens up or down.}",
        steps: [
          { explanation: "y-intercept is c (the value at x = 0).", latex: "c = 3" },
          { explanation: "a = 1 > 0, so it opens up.", latex: "\\text{opens up (minimum)}" },
        ],
        finalAnswerLatex: "\\text{y-intercept } 3,\\ \\text{opens up}",
      },
      {
        title: "Vertex from turning-point form",
        questionLatex: "\\text{State the vertex of } y = (x + 3)^2 - 4.",
        steps: [
          { explanation: "Compare with a(x − h)² + k; here x + 3 = x − (−3).", latex: "h = -3,\\ k = -4" },
          { explanation: "The vertex is (h, k).", latex: "(-3, -4)" },
        ],
        finalAnswerLatex: "(-3, -4)",
      },
    ],
    guidedPractice: [
      mcq("quadf-g1", "In y = ax² + bx + c, if a > 0 the parabola:", "B",
        ["opens downward (has a maximum)", "opens upward (has a minimum)", "is a straight line", "has no turning point"], 1,
        "The sign of a sets the concavity.", "When a > 0 the parabola opens upward and has a lowest point (a minimum)."),
      ans("quadf-g2", "State the y-intercept of y = x² − 4x + 3.", "x = 0", "3", 2,
        "The y-intercept is the constant term c.", "At x = 0, y = c = 3. The y-intercept is 3."),
      ans("quadf-g3", "State the vertex of y = (x − 2)² + 5.", "y = (x-h)^2 + k", "(2,5)", 2,
        "Vertex is (h, k) from a(x − h)² + k.", "Comparing with a(x − h)² + k gives h = 2, k = 5, so the vertex is (2, 5).",
        ["(2, 5)", "2,5"]),
      ans("quadf-g4", "Does the parabola y = −2x² + 3x + 1 open up or down?", "a = -2", "down", 2,
        "Look at the sign of a.", "a = −2 is negative, so the parabola opens down (it has a maximum).",
        ["downward"]),
    ],
    independentPractice: [
      ans("quadf-i1", "State the vertex of y = (x + 3)² − 4.", "y = (x-h)^2 + k", "(-3,-4)", 3,
        "Mind the sign: x + 3 = x − (−3).", "h = −3 and k = −4, so the vertex is (−3, −4).",
        ["(-3, -4)", "-3,-4", "(−3, −4)"]),
      mcq("quadf-i2", "Using the graph, does this parabola have a maximum or a minimum?", "B",
        ["a maximum", "a minimum", "neither", "both"], 3,
        "Does it open up or down?", "The parabola opens upward (a U-shape), so its turning point is a minimum.",
        { cartesianGraph: parabolaMin }),
      ans("quadf-i3", "Find the axis of symmetry of y = x² − 6x + 8 (use x = −b/(2a)).", "x = -\\frac{-6}{2(1)}", "3", 3,
        "Substitute a = 1, b = −6 into −b/(2a).", "x = −(−6) ÷ (2 × 1) = 6 ÷ 2 = 3. The axis of symmetry is x = 3.",
        ["x=3"]),
      ans("quadf-i4", "A parabola has x-intercepts at x = 1 and x = 5. Find the x-value of its vertex.", "\\frac{1 + 5}{2}", "3", 3,
        "The vertex sits halfway between the x-intercepts.", "The axis of symmetry is the midpoint of the intercepts: (1 + 5) ÷ 2 = 3."),
      ans("quadf-i5", "State the minimum value of y for y = 2(x − 4)² + 1.", "y = a(x-h)^2 + k", "1", 3,
        "The minimum value is k (since a > 0).", "Since a = 2 > 0, the lowest value of y is k = 1, reached at the vertex (4, 1)."),
    ],
    masteryQuiz: [
      ans("quadf-m1", "State the y-intercept of y = 3x² + 2x − 7.", "x = 0", "-7", 2,
        "The y-intercept is c.", "At x = 0, y = c = −7.", ["−7"]),
      mcq("quadf-m2", "Which parabola opens downward?", "B",
        ["y = x² + 1", "y = −x² + 3", "y = 2x²", "y = x² − 5"], 3,
        "Opens down when a is negative.", "y = −x² + 3 has a = −1 < 0, so it opens downward. The others have positive a."),
      ans("quadf-m3", "State the vertex of y = (x − 1)² − 9.", "y = (x-h)^2 + k", "(1,-9)", 3,
        "Vertex is (h, k).", "h = 1 and k = −9, so the vertex is (1, −9).",
        ["(1, -9)", "1,-9", "(1, −9)"]),
      ans("quadf-m4", "Find the axis of symmetry of y = x² + 4x + 1.", "x = -\\frac{4}{2(1)}", "-2", 3,
        "Use x = −b/(2a) with a = 1, b = 4.", "x = −4 ÷ (2 × 1) = −2. The axis of symmetry is x = −2.",
        ["x=-2", "x = −2"]),
      mcq("quadf-m5", "Using the graph, does this parabola have a maximum or a minimum?", "A",
        ["a maximum", "a minimum", "neither", "two minimums"], 3,
        "Does it open up or down?", "The parabola opens downward (an upside-down U), so its turning point is a maximum.",
        { cartesianGraph: parabolaMax }),
      ans("quadf-m6", "A parabola has x-intercepts at x = −2 and x = 6. Find the x-value of its vertex.", "\\frac{-2 + 6}{2}", "2", 3,
        "Average the two intercepts.", "Vertex x = (−2 + 6) ÷ 2 = 4 ÷ 2 = 2."),
      ans("quadf-m7", "State the y-intercept of y = −x² + 5x.", "x = 0", "0", 2,
        "Substitute x = 0.", "At x = 0, y = −0 + 0 = 0. The y-intercept is 0 (there is no constant term)."),
      mcq("quadf-m8", "The turning point of y = a(x − h)² + k is at:", "A",
        ["(h, k)", "(−h, k)", "(h, −k)", "(k, h)"], 3,
        "Read it directly from turning-point form.", "Turning-point form a(x − h)² + k has its vertex at (h, k)."),
      ans("quadf-m9", "State the minimum value of y for y = (x − 3)² − 4.", "y = (x-h)^2 + k", "-4", 4,
        "The minimum value is k.", "Since a = 1 > 0, the minimum value of y is k = −4 (at the vertex (3, −4)).",
        ["−4"]),
      ans("quadf-m10", "A parabola y = a(x − 2)² + 1 passes through (0, 5). Find a.", "5 = a(0 - 2)^2 + 1", "1", 4,
        "Substitute the point and solve for a.", "5 = a(0 − 2)² + 1 = 4a + 1, so 4a = 4 and a = 1."),
    ],
    commonMistakes: [
      { mistake: "Getting the concavity backwards.", fix: "a > 0 opens up (minimum); a < 0 opens down (maximum)." },
      { mistake: "Wrong sign for h in the vertex.", fix: "x + 3 = x − (−3), so the vertex x is −3, not 3." },
      { mistake: "Confusing the roots with the vertex.", fix: "Roots are where y = 0; the vertex is the turning point (halfway between the roots)." },
      { mistake: "Reading the y-intercept as a instead of c.", fix: "At x = 0 the value is c, so c is the y-intercept." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 9E Reciprocal Graphs (inverse variation) ─────────────────────────────────────────
export function year12Standard1ReciprocalGraphsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "reciprocal-graphs") {
    return null;
  }
  return {
    description:
      "Recognise and interpret reciprocal graphs y = k/x (inverse variation): the product xy = k stays constant, the hyperbola shape, and the asymptotes.",
    learningIntention:
      "Identify inverse variation y = k/x from a graph or table, find k, and predict how y changes as x changes.",
    successCriteria: [
      "Recognise inverse variation from a table where the product xy stays constant.",
      "Evaluate y = k/x for a given x.",
      "Find the constant k from a known point.",
      "Describe how y changes as x doubles, and that the curve never touches the axes.",
    ],
    teaching: {
      paragraphs: [
        "Inverse variation is the seesaw relationship: as one quantity goes UP, the other goes DOWN, and they balance so that their PRODUCT stays constant. The rule is y = k/x, where k is that constant product (k = xy). Double the x and you halve the y; triple the x and you third the y. It is the opposite of a straight line, where doubling x adds the same amount to y.",
        "Because xy = k is fixed, the quickest test for inverse variation in a table is to multiply each x by its y: if every product is the same number, it is inverse variation. For y = 12/x: (1,12), (2,6), (3,4), (4,3) all give xy = 12.",
        "The graph of y = k/x is a hyperbola — a curve that drops steeply for small x and flattens out for large x, sweeping toward the axes without ever touching them. Both the x-axis (y = 0) and the y-axis (x = 0) are asymptotes: y can get tiny but never reaches 0, and x can never be 0 (you cannot divide by zero).",
        "To pin down a particular relationship, find k first from any known pair using k = xy, then you can predict any other value with y = k/x. If y = 5 when x = 4, then k = 20, so the rule is y = 20/x.",
      ],
      latexBlocks: [
        "y = \\frac{k}{x}\\quad\\Leftrightarrow\\quad xy = k\\ (\\text{constant})",
        "x \\text{ doubles} \\Rightarrow y \\text{ halves}",
        "\\text{asymptotes: } x = 0 \\text{ and } y = 0 \\ (\\text{never touched})",
      ],
    },
    workedExamples: [
      {
        title: "Find k, then evaluate",
        questionLatex: "\\text{For } y = \\tfrac{k}{x}\\text{, } y = 6 \\text{ when } x = 2.\\ \\text{Find } k \\text{ and } y \\text{ when } x = 4.",
        steps: [
          { explanation: "k is the product xy.", latex: "k = 2 \\times 6 = 12" },
          { explanation: "Use y = 12/x at x = 4.", latex: "y = \\tfrac{12}{4} = 3" },
        ],
        finalAnswerLatex: "k = 12,\\ y = 3",
      },
      {
        title: "Inverse variation from a table",
        questionLatex: "\\text{Is } x: 1,2,3,6,\\ y: 12,6,4,2 \\text{ inverse variation?}",
        steps: [
          { explanation: "Multiply each x by its y.", latex: "1·12 = 2·6 = 3·4 = 6·2 = 12" },
          { explanation: "The product is constant, so yes.", latex: "xy = 12" },
        ],
        finalAnswerLatex: "\\text{Yes, } xy = 12",
      },
    ],
    guidedPractice: [
      mcq("recg-g1", "In inverse variation y = k/x, as x increases, y:", "B",
        ["increases", "decreases", "stays the same", "becomes negative"], 1,
        "The product xy stays constant.", "In inverse variation, as x increases y decreases so that the product xy stays constant."),
      ans("recg-g2", "For y = 12/x, find y when x = 3.", "y = \\frac{12}{3}", "4", 2,
        "Divide 12 by x.", "y = 12 ÷ 3 = 4."),
      ans("recg-g3", "Using the graph, as x increases does y increase or decrease?", "\\text{read the curve}", "decrease", 2,
        "Follow the curve from left to right.", "The curve falls as x increases — y decreases. This is inverse variation.",
        ["decreases"], { cartesianGraph: reciprocalPlot }),
      ans("recg-g4", "For y = k/x passing through (2, 6), find k.", "k = xy", "12", 2,
        "k is the product of x and y.", "k = x × y = 2 × 6 = 12."),
    ],
    independentPractice: [
      ans("recg-i1", "For y = 24/x, find y when x = 8.", "y = \\frac{24}{8}", "3", 2,
        "Divide 24 by x.", "y = 24 ÷ 8 = 3."),
      mcq("recg-i2", "A table shows x: 1,2,3,6 and y: 12,6,4,2. What relationship is this?", "C",
        ["linear", "exponential", "inverse variation", "no relationship"], 3,
        "Check the product xy for each pair.", "Every product xy equals 12 (1·12, 2·6, 3·4, 6·2), so this is inverse variation, y = 12/x."),
      ans("recg-i3", "For y = k/x, y = 5 when x = 4. Find k.", "k = xy", "20", 3,
        "k = xy.", "k = 4 × 5 = 20, so the rule is y = 20/x."),
      ans("recg-i4", "For y = 36/x, x doubles from 3 to 6. Find the new value of y.", "y = \\frac{36}{6}", "6", 3,
        "Evaluate y at x = 6 (it should halve).", "At x = 6, y = 36 ÷ 6 = 6 — half of the value 12 at x = 3, as expected when x doubles."),
      ans("recg-i5", "For the graph of y = k/x, does the curve ever touch the x-axis? Answer yes or no.", "y = \\frac{k}{x}", "no", 3,
        "Can k/x ever equal 0?", "No — y = k/x can get very small but never equals 0, so the curve approaches the x-axis without touching it.",
        ["No"], { cartesianGraph: reciprocalPlot }),
    ],
    masteryQuiz: [
      ans("recg-m1", "For y = 60/x, find y when x = 5.", "y = \\frac{60}{5}", "12", 2,
        "Divide 60 by x.", "y = 60 ÷ 5 = 12."),
      mcq("recg-m2", "Which equation shows inverse variation?", "C",
        ["y = 3x", "y = x + 2", "y = 15/x", "y = x²"], 3,
        "Inverse variation has x in the denominator.", "y = 15/x is inverse variation (xy = 15). y = 3x is direct/linear, y = x + 2 linear, y = x² quadratic."),
      ans("recg-m3", "For y = k/x, y = 8 when x = 5. Find k.", "k = xy", "40", 3,
        "k = xy.", "k = 5 × 8 = 40."),
      ans("recg-m4", "For y = 48/x, find y when x = 12.", "y = \\frac{48}{12}", "4", 2,
        "Divide 48 by x.", "y = 48 ÷ 12 = 4."),
      mcq("recg-m5", "In y = k/x, doubling x does what to y?", "B",
        ["doubles it", "halves it", "leaves it unchanged", "squares it"], 3,
        "The product xy must stay constant.", "If x doubles, y must halve to keep the product xy = k constant."),
      ans("recg-m6", "Solve 12 = 96/x for x.", "12 = \\frac{96}{x}", "8", 3,
        "Multiply both sides by x, then divide.", "12 = 96/x gives 12x = 96, so x = 8."),
      ans("recg-m7", "For y = 20/x, find y when x = 4.", "y = \\frac{20}{4}", "5", 2,
        "Divide 20 by x.", "y = 20 ÷ 4 = 5."),
      mcq("recg-m8", "The graph of y = k/x approaches but never touches:", "C",
        ["only the x-axis", "only the y-axis", "both the x-axis and the y-axis", "neither axis"], 3,
        "Think about x = 0 and y = 0.", "Both axes are asymptotes: x can never be 0 (division by zero) and y can never reach 0, so the curve approaches both without touching."),
      ans("recg-m9", "For y = k/x passing through (4, 9), find y when x = 6.", "k = 4 \\times 9", "6", 4,
        "Find k first, then evaluate at x = 6.", "k = 4 × 9 = 36, so y = 36/x. At x = 6, y = 36 ÷ 6 = 6."),
      ans("recg-m10", "x and y vary inversely. When x = 2, y = 18. Find y when x = 3.", "k = 2 \\times 18", "12", 4,
        "Find k = xy, then use y = k/x.", "k = 2 × 18 = 36, so y = 36/x. At x = 3, y = 36 ÷ 3 = 12."),
    ],
    commonMistakes: [
      { mistake: "Treating inverse variation like a straight line.", fix: "In y = k/x the product xy is constant; doubling x halves y rather than adding a fixed amount." },
      { mistake: "Thinking the curve crosses the axes.", fix: "Both axes are asymptotes — the hyperbola approaches but never touches them." },
      { mistake: "Forgetting to find k first.", fix: "Use k = xy from a known pair, then predict with y = k/x." },
      { mistake: "Confusing inverse variation with direct variation.", fix: "Direct: y = kx (both rise). Inverse: y = k/x (one rises, the other falls)." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 9F Reciprocal Models (inverse variation applications) ─────────────────────────────
export function year12Standard1ReciprocalModelsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "reciprocal-models") {
    return null;
  }
  return {
    description:
      "Apply inverse variation to real contexts — workers and time, speed and time, pressure and volume — by finding the constant product and predicting.",
    learningIntention:
      "Model real inverse-variation situations with y = k/x, finding the constant product and predicting a new value.",
    successCriteria: [
      "Recognise a real situation as inverse variation (one quantity up, the other down, product fixed).",
      "Find the constant product from a known pair (e.g. worker-hours, distance).",
      "Predict a new value using the constant product.",
      "Interpret how doubling or tripling one quantity affects the other.",
    ],
    teaching: {
      paragraphs: [
        "Lots of everyday situations are inverse variation in disguise. More workers means less time to finish a fixed job. A faster speed means less time for a fixed distance. Squeeze a gas into less volume and its pressure rises. In each, two quantities trade off so that some PRODUCT stays fixed — total work, total distance, or pressure × volume.",
        "The method is always the same two steps. First find the fixed product (the k) from the information given: 6 workers × 12 hours = 72 worker-hours; 80 km/h × 3 h = 240 km. Then use that constant to answer the question: 72 worker-hours ÷ 8 workers = 9 hours; 240 km ÷ 120 km/h = 2 hours.",
        "Because the product is fixed, the proportions are easy to reason about: double the workers and the time halves; triple the speed and the time is a third. If you ever find yourself ADDING (e.g. '6 workers take 12 hours so 8 workers take 14') you have the relationship backwards — more of one means LESS of the other.",
        "Always check the answer makes sense: more workers should give fewer hours, a higher speed fewer hours. If your prediction moves the wrong way, you have likely treated an inverse relationship as a direct one.",
      ],
      latexBlocks: [
        "\\text{fixed product } k = (\\text{quantity}_1)(\\text{quantity}_2)",
        "\\text{time} = \\frac{\\text{total work}}{\\text{workers}},\\qquad \\text{time} = \\frac{\\text{distance}}{\\text{speed}}",
        "\\text{double one quantity} \\Rightarrow \\text{halve the other}",
      ],
    },
    workedExamples: [
      {
        title: "Workers and time",
        questionLatex: "\\text{6 workers take 12 hours to finish a job. How long would 8 workers take?}",
        steps: [
          { explanation: "Find the fixed total work in worker-hours.", latex: "6 \\times 12 = 72 \\text{ worker-hours}" },
          { explanation: "Divide by the new number of workers.", latex: "72 \\div 8 = 9 \\text{ hours}" },
        ],
        finalAnswerLatex: "9 \\text{ hours}",
      },
      {
        title: "Speed and time",
        questionLatex: "\\text{A trip at 80 km/h takes 3 hours. How long at 120 km/h?}",
        steps: [
          { explanation: "Find the fixed distance.", latex: "80 \\times 3 = 240 \\text{ km}" },
          { explanation: "Divide by the new speed.", latex: "240 \\div 120 = 2 \\text{ hours}" },
        ],
        finalAnswerLatex: "2 \\text{ hours}",
      },
    ],
    guidedPractice: [
      mcq("recm-g1", "More workers means less time to finish a fixed job. This is an example of:", "B",
        ["direct variation", "inverse variation", "no relationship", "exponential growth"], 1,
        "One goes up, the other goes down.", "As workers increase, time decreases (with the total work fixed) — that is inverse variation."),
      ans("recm-g2", "6 workers take 12 hours on a job. Find the total work in worker-hours.", "6 \\times 12", "72", 2,
        "Multiply workers by hours.", "Total work = 6 × 12 = 72 worker-hours."),
      ans("recm-g3", "A job needs 72 worker-hours. How long would 8 workers take, in hours?", "\\frac{72}{8}", "9", 2,
        "Divide the total work by the workers.", "Time = 72 ÷ 8 = 9 hours."),
      ans("recm-g4", "Speed × time = 240 km for a trip. At 60 km/h, find the time in hours.", "\\frac{240}{60}", "4", 2,
        "Divide the distance by the speed.", "Time = 240 ÷ 60 = 4 hours."),
    ],
    independentPractice: [
      ans("recm-i1", "4 taps fill a tank in 90 minutes. How long would 6 taps take, in minutes?", "\\frac{4 \\times 90}{6}", "60", 3,
        "Find the total tap-minutes, then divide by 6.", "Total = 4 × 90 = 360 tap-minutes; with 6 taps: 360 ÷ 6 = 60 minutes."),
      mcq("recm-i2", "Which of these is an inverse relationship?", "C",
        ["hours worked and pay earned", "distance and time at fixed speed", "number of pumps and time to drain a fixed pool", "side length and perimeter of a square"], 3,
        "Inverse: one up means the other down, with a product fixed.", "More pumps drain a fixed pool in less time (product fixed) — inverse. The others increase together (direct)."),
      ans("recm-i3", "A trip at 80 km/h takes 3 hours. How long would it take at 120 km/h, in hours?", "\\frac{80 \\times 3}{120}", "2", 3,
        "Find the fixed distance, then divide by the new speed.", "Distance = 80 × 3 = 240 km; time at 120 km/h = 240 ÷ 120 = 2 hours."),
      ans("recm-i4", "Pressure × volume is constant at 600. When the volume is 40, find the pressure.", "\\frac{600}{40}", "15", 3,
        "Divide the constant by the volume.", "Pressure = 600 ÷ 40 = 15 (since P × V = 600)."),
      ans("recm-i5", "10 machines complete an order in 6 days. Find the total work in machine-days.", "10 \\times 6", "60", 3,
        "Multiply machines by days.", "Total work = 10 × 6 = 60 machine-days."),
    ],
    masteryQuiz: [
      ans("recm-m1", "5 painters take 8 days to paint a building. How long would 10 painters take, in days?", "\\frac{5 \\times 8}{10}", "4", 3,
        "Find painter-days, then divide by 10.", "Total = 5 × 8 = 40 painter-days; with 10 painters: 40 ÷ 10 = 4 days."),
      mcq("recm-m2", "For a fixed job, doubling the number of workers does what to the time?", "B",
        ["doubles it", "halves it", "leaves it the same", "triples it"], 2,
        "Workers and time vary inversely.", "Doubling the workers halves the time, because the total work (their product) is fixed."),
      ans("recm-m3", "A job is 48 worker-hours. How long would 6 workers take, in hours?", "\\frac{48}{6}", "8", 3,
        "Divide the total work by the workers.", "Time = 48 ÷ 6 = 8 hours."),
      ans("recm-m4", "A trip is 240 km. At 40 km/h, find the time, in hours.", "\\frac{240}{40}", "6", 2,
        "Divide distance by speed.", "Time = 240 ÷ 40 = 6 hours."),
      mcq("recm-m5", "If x and y vary inversely and x triples, then y:", "C",
        ["triples", "stays the same", "is divided by 3", "increases by 3"], 3,
        "The product xy is fixed.", "If x triples, y must be divided by 3 to keep the product xy constant."),
      ans("recm-m6", "3 pipes fill a pool in 8 hours. How long would 4 pipes take, in hours?", "\\frac{3 \\times 8}{4}", "6", 4,
        "Find pipe-hours, then divide by 4.", "Total = 3 × 8 = 24 pipe-hours; with 4 pipes: 24 ÷ 4 = 6 hours."),
      ans("recm-m7", "Pressure × volume is constant. When V = 12, P = 50. Find P when V = 25.", "\\frac{12 \\times 50}{25}", "24", 3,
        "Find the constant PV, then divide by the new volume.", "Constant = 12 × 50 = 600; P = 600 ÷ 25 = 24."),
      mcq("recm-m8", "Which change would DOUBLE the time to finish a fixed job?", "B",
        ["doubling the workers", "halving the workers", "tripling the workers", "keeping the workers the same"], 3,
        "Time and workers vary inversely.", "Halving the workers doubles the time (the product, total work, is fixed)."),
      ans("recm-m9", "8 workers finish a job in 15 days. How many workers are needed to finish it in 10 days?", "\\frac{8 \\times 15}{10}", "12", 4,
        "Find worker-days, then divide by the target days.", "Total = 8 × 15 = 120 worker-days; to finish in 10 days: 120 ÷ 10 = 12 workers."),
      ans("recm-m10", "A route takes 5 hours at 72 km/h. What constant speed finishes it in 6 hours, in km/h?", "\\frac{5 \\times 72}{6}", "60", 4,
        "Find the fixed distance, then divide by the target time.", "Distance = 5 × 72 = 360 km; speed for 6 hours = 360 ÷ 6 = 60 km/h."),
    ],
    commonMistakes: [
      { mistake: "Treating an inverse situation as direct (more workers → more time).", fix: "More of one means less of the other; the product is fixed." },
      { mistake: "Adding instead of using the fixed product.", fix: "Find k = quantity₁ × quantity₂ first, then divide." },
      { mistake: "Forgetting to convert units before forming the product.", fix: "Use consistent units (e.g. all hours) when forming worker-hours or distance." },
      { mistake: "Not sanity-checking the direction of the answer.", fix: "More workers/higher speed must give fewer hours — check the result moves the right way." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 9G Miscellaneous Problems (model discrimination) ─────────────────────────────────
export function year12Standard1GraphsMiscellaneousLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "graphs-miscellaneous") {
    return null;
  }
  return {
    description:
      "Choose the right model — linear, quadratic, exponential or reciprocal — from a table, graph shape or context, and tell them apart.",
    learningIntention:
      "Identify whether a situation is linear, quadratic, exponential or inverse (reciprocal) from its data, shape or description.",
    successCriteria: [
      "Recognise a linear pattern (constant difference, straight line).",
      "Recognise an exponential pattern (constant ratio, J-curve).",
      "Recognise inverse variation (constant product, hyperbola).",
      "Recognise a quadratic pattern (parabola, symmetric, constant second difference).",
    ],
    teaching: {
      paragraphs: [
        "Real data does not arrive labelled, so the skill is telling the four models apart. Each has a fingerprint. LINEAR: the y-values change by the same AMOUNT each step (constant difference) and the graph is a straight line. EXPONENTIAL: the y-values change by the same FACTOR each step (constant ratio) and the graph is a J-curve that takes off (or decays).",
        "INVERSE VARIATION (reciprocal): as x goes up y goes down so that the PRODUCT xy stays constant; the graph is a hyperbola hugging the axes. QUADRATIC: the graph is a symmetric parabola (a U or upside-down U); in a table the first differences change but the SECOND differences are constant.",
        "So when you meet a table, run three quick checks in order: do the y-values add a constant (linear)? multiply by a constant (exponential)? or keep a constant product with x (inverse)? If none of those and the values rise then fall symmetrically, think quadratic. The single most common confusion is linear vs exponential — always ask 'adding or multiplying?'.",
        "Context gives clues too. Steady savings per week → linear. Compound interest or doubling populations → exponential. A thrown ball's height → quadratic. More workers sharing fixed work, or speed vs time over a fixed distance → inverse. Match the story to the fingerprint.",
      ],
      latexBlocks: [
        "\\text{linear: constant difference};\\quad \\text{exponential: constant ratio}",
        "\\text{inverse: constant product } xy;\\quad \\text{quadratic: constant 2nd difference}",
        "\\text{ask first: adding or multiplying?}",
      ],
    },
    workedExamples: [
      {
        title: "Classify from a table (ratio test)",
        questionLatex: "\\text{Which model fits } x: 1,2,3,\\ y: 3,9,27?",
        steps: [
          { explanation: "Check the ratio between successive y-values.", latex: "9/3 = 3,\\ 27/9 = 3" },
          { explanation: "Constant ratio means exponential.", latex: "\\text{exponential}" },
        ],
        finalAnswerLatex: "\\text{Exponential}",
      },
      {
        title: "Classify from a context",
        questionLatex: "\\text{More workers share a fixed job, so the time per worker changes. Which model?}",
        steps: [
          { explanation: "Workers up, time down, product (total work) fixed.", latex: "\\text{workers} \\times \\text{time} = \\text{constant}" },
          { explanation: "That is inverse variation.", latex: "\\text{inverse variation}" },
        ],
        finalAnswerLatex: "\\text{Inverse variation}",
      },
    ],
    guidedPractice: [
      mcq("gmix-g1", "A table where y increases by the same amount each step represents which model?", "A",
        ["linear", "exponential", "quadratic", "inverse variation"], 1,
        "Same amount added each step.", "A constant difference (same amount added each step) is the fingerprint of a linear model."),
      ans("gmix-g2", "A table x: 1,2,3 and y: 3,9,27 multiplies by 3 each step. Which model is it?", "9/3 = 3", "exponential", 2,
        "Constant ratio → which model?", "Each y is 3× the previous (constant ratio), so the model is exponential.",
        ["exponential growth"]),
      ans("gmix-g3", "A table x: 1,2,4 and y: 12,6,3 keeps xy = 12. Which model is it?", "xy = 12", "inverse variation", 2,
        "Constant product → which model?", "The product xy is constant at 12, so this is inverse variation (y = 12/x).",
        ["inverse"]),
      ans("gmix-g4", "The y-values 2, 5, 8, 11 go up by 3 each time. Which model is it?", "+3 \\text{ each step}", "linear", 2,
        "Same amount added each step.", "A constant difference of +3 each step is a linear model.",
        ["straight line"]),
    ],
    independentPractice: [
      mcq("gmix-i1", "Which table is exponential?", "B",
        ["x:1,2,3 y:5,10,15", "x:1,2,3 y:2,8,32", "x:1,2,3 y:10,7,4", "x:1,2,3 y:12,6,4"], 3,
        "Exponential has a constant ratio.", "y: 2,8,32 multiplies by 4 each step (constant ratio) — exponential. The first and third add a constant (linear); the last keeps a constant product (inverse)."),
      ans("gmix-i2", "A graph is a symmetric U-shape with a single lowest point. Which model is it?", "\\text{U-shape}", "quadratic", 3,
        "A symmetric U or upside-down U.", "A symmetric U-shaped curve with one turning point is a parabola, so the model is quadratic.",
        ["parabola"]),
      ans("gmix-i3", "A table x: 1,2,3,4 and y: 1,4,9,16 (the squares). Which model is it?", "y = x^2", "quadratic", 3,
        "These are perfect squares.", "The y-values are 1², 2², 3², 4², so y = x² — a quadratic model.",
        ["parabola"]),
      ans("gmix-i4", "A population multiplies by 1.5 each year. Which model describes it?", "\\times 1.5 \\text{ each year}", "exponential", 3,
        "Multiplying by a constant factor.", "Multiplying by a constant factor (1.5) each year is exponential growth.",
        ["exponential growth"]),
      ans("gmix-i5", "Over a fixed distance, more speed means less time (speed × time fixed). Which model?", "\\text{speed} \\times \\text{time fixed}", "inverse variation", 3,
        "Constant product of the two quantities.", "Speed and time multiply to a fixed distance, so as one rises the other falls — inverse variation.",
        ["inverse"]),
    ],
    masteryQuiz: [
      ans("gmix-m1", "The relationship y = mx + b graphs as what shape?", "y = mx + b", "linear", 2,
        "What does y = mx + b draw?", "y = mx + b draws a straight line, so it is a linear model.",
        ["straight line", "a straight line"]),
      mcq("gmix-m2", "Which correctly contrasts exponential and linear models?", "A",
        ["Exponential multiplies by a constant factor; linear adds a constant", "Exponential adds a constant; linear multiplies", "Both add a constant", "Both multiply by a constant"], 3,
        "Adding versus multiplying.", "A linear model adds the same amount each step; an exponential model multiplies by the same factor each step."),
      ans("gmix-m3", "A table x: 2,4,8 and y: 40,20,10. Which model is it?", "xy = 80", "inverse variation", 3,
        "Check the product xy.", "Each product xy = 80 (2·40, 4·20, 8·10), so this is inverse variation.",
        ["inverse"]),
      ans("gmix-m4", "A table whose y-values have a constant SECOND difference fits which model?", "\\text{2nd difference constant}", "quadratic", 3,
        "Constant second difference is the fingerprint.", "A constant second difference (the differences of the differences) is the signature of a quadratic model.",
        ["parabola"]),
      mcq("gmix-m5", "A graph rises slowly then shoots upward, never falling (a J-curve). Which model?", "C",
        ["linear", "quadratic", "exponential", "inverse variation"], 3,
        "A J-curve that takes off.", "A J-curve that rises ever more steeply is exponential growth."),
      ans("gmix-m6", "A bank balance increases by $50 each month. Which model is it?", "+\\$50 \\text{ each month}", "linear", 4,
        "Same amount added each month.", "Adding a fixed $50 each month is a constant difference — a linear model (not exponential, which would multiply).",
        ["straight line"]),
      ans("gmix-m7", "A ball is thrown up; its height rises to a peak then falls symmetrically. Which model?", "\\text{rise then fall}", "quadratic", 3,
        "Symmetric rise then fall.", "A symmetric rise-and-fall in height is a parabola, so the model is quadratic.",
        ["parabola"]),
      mcq("gmix-m8", "$1000 earning 5% compound interest each year follows which model?", "C",
        ["linear", "inverse variation", "exponential", "quadratic"], 3,
        "Compound interest multiplies by a factor each year.", "Compound interest multiplies the balance by 1.05 each year — a constant factor — so it is exponential."),
      ans("gmix-m9", "A table x: 1,2,3,4 and y: 24,12,8,6. Which model is it?", "xy = 24", "inverse variation", 4,
        "Check the product xy for each pair.", "Each product xy = 24 (1·24, 2·12, 3·8, 4·6), so this is inverse variation, y = 24/x.",
        ["inverse"]),
      ans("gmix-m10", "Which model has a constant RATIO between successive y-values?", "\\text{constant ratio}", "exponential", 3,
        "Ratio, not difference or product.", "A constant ratio between successive y-values is the defining feature of an exponential model.",
        ["exponential growth"]),
    ],
    commonMistakes: [
      { mistake: "Confusing linear and exponential growth.", fix: "Linear ADDS a constant each step; exponential MULTIPLIES by a constant factor — check difference vs ratio." },
      { mistake: "Calling any curve a quadratic.", fix: "Quadratics are symmetric parabolas with a constant second difference; J-curves are exponential, hyperbolas are inverse." },
      { mistake: "Missing inverse variation.", fix: "Test the product xy — if it is constant, it is inverse variation." },
      { mistake: "Classifying from one data point.", fix: "Check the pattern across several points (difference, ratio or product) before deciding." },
    ],
    masteryPassMark: 0.8,
  };
}
