// Year 12 Standard 1 — Unit 3 "Investments" — Wave 5 authored sections.
//
//   3A Simple Interest                 (simple-interest)
//   3B Simple Interest Graphs          (interest-graphs)
//   3D Compound Interest — Present Value (present-value)
//   3E Compound Interest Graphs        (compound-interest-graphs)
//   3F Appreciation and Inflation      (appreciation-inflation)
//
// 3C (investment-compound-interest) keeps its existing override + challenge. Same pattern as
// Waves 1–4: Feynman teaching, 4/5/10 with EXACTLY 1/1/3 MCQs per section, authored
// cognitive-demand difficulty, markable answers. IDs unprefixed; `y12s1-` auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";

const UNIT = "investments";

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

const siLineGraph = {
  description: "Straight-line graph of a simple-interest balance starting at $1000 at year 0 and rising by $100 each year (reaching $1600 at year 6).",
  xMin: 0, xMax: 6, yMin: 0, yMax: 1700, xStep: 1, yStep: 200, showGrid: true,
  xAxisLabel: "Time (years)", yAxisLabel: "Balance ($)",
  lines: [{ kind: "linear" as const, m: 100, b: 1000, label: "Simple interest" }],
};
const ciCurve = {
  description: "Upward-curving graph of a compound-interest balance: $1000 at year 0, then 1100, 1210, 1331, 1464 at years 1–4, getting steeper each year.",
  points: [{ x: 0, y: 1000 }, { x: 1, y: 1100 }, { x: 2, y: 1210 }, { x: 3, y: 1331 }, { x: 4, y: 1464 }],
  xMin: 0, xMax: 5, yMin: 0, yMax: 1600, xStep: 1, yStep: 200, showGrid: true,
  xAxisLabel: "Time (years)", yAxisLabel: "Balance ($)",
};
const ciCompare = {
  description: "Two graphs from the same $1000 start at 10%: a straight simple-interest line (1000, 1100, ..., 1400 at year 4) and a curved compound-interest path (points 1000, 1100, 1210, 1331, 1464). They start together and the compound curve pulls above the line.",
  points: [{ x: 0, y: 1000 }, { x: 1, y: 1100 }, { x: 2, y: 1210 }, { x: 3, y: 1331 }, { x: 4, y: 1464 }],
  lines: [{ kind: "linear" as const, m: 100, b: 1000, label: "Simple interest" }],
  xMin: 0, xMax: 5, yMin: 0, yMax: 1600, xStep: 1, yStep: 200, showGrid: true,
  xAxisLabel: "Time (years)", yAxisLabel: "Balance ($)",
};

// ── 3A Simple Interest ───────────────────────────────────────────────────────────────
export function year12Standard1SimpleInterestLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "simple-interest") {
    return null;
  }
  return {
    description:
      "Calculate simple interest with I = Prn, find the total amount, and work backwards to a rate or time.",
    learningIntention:
      "Use I = Prn to find simple interest and the final amount, and rearrange to find a missing rate or time.",
    successCriteria: [
      "Calculate simple interest using I = Prn with the rate as a decimal.",
      "Find the total amount as principal plus interest.",
      "Rearrange to find an unknown rate or time.",
      "Recognise that simple interest produces equal growth each year (linear).",
    ],
    teaching: {
      paragraphs: [
        "Simple interest is the no-frills kind: the interest is worked out only on the ORIGINAL amount you invested (the principal), and the same dollar amount is added every period. Nothing is earned on previous interest. That is why the formula is just I = Prn — principal × rate × number of periods — with the rate written as a decimal (5% becomes 0.05).",
        "The rate is the usual trap. '5% per annum' means 0.05 each year, not 5. So $2000 at 5% for 3 years earns I = 2000 × 0.05 × 3 = $300. The interest is the EXTRA money; the TOTAL amount in the account is the principal plus the interest: A = P + I = $2300.",
        "Because the same amount is added each year, simple interest grows in a straight line — $300 over 3 years is $100 every year, year after year. This is genuinely linear: plot the balance against time and you get a straight line whose steepness is the yearly interest.",
        "The formula rearranges, so you can hunt for a missing piece. If you know the interest, principal and time, the rate is r = I/(Pn); if you know the rate, time = I/(Pr). Always convert a percentage rate to a decimal first, and remember I is the interest alone, not the total.",
      ],
      latexBlocks: [
        "I = P r n\\quad(r \\text{ as a decimal})",
        "A = P + I",
        "r = \\frac{I}{P n},\\qquad n = \\frac{I}{P r}",
      ],
    },
    workedExamples: [
      {
        title: "Interest and total amount",
        questionLatex: "\\text{Find the simple interest and total amount on \\$2000 at 5\\% p.a. for 3 years.}",
        steps: [
          { explanation: "Use I = Prn with r = 0.05.", latex: "I = 2000 \\times 0.05 \\times 3 = \\$300" },
          { explanation: "Total amount is principal plus interest.", latex: "A = 2000 + 300 = \\$2300" },
        ],
        finalAnswerLatex: "I = \\$300,\\ A = \\$2300",
      },
      {
        title: "Find the rate",
        questionLatex: "\\text{\\$1000 earns \\$150 simple interest in 3 years. Find the annual rate.}",
        steps: [
          { explanation: "Rearrange to r = I/(Pn).", latex: "r = \\frac{150}{1000 \\times 3} = 0.05" },
          { explanation: "Write the decimal as a percentage.", latex: "0.05 = 5\\%" },
        ],
        finalAnswerLatex: "5\\%",
      },
    ],
    guidedPractice: [
      mcq("si-g1", "Simple interest is calculated on:", "B",
        ["the balance including past interest", "only the original principal", "the interest already earned", "the total amount each year"], 1,
        "Simple interest never earns on past interest.",
        "Simple interest is worked out only on the original principal, so the same amount is added each period."),
      ans("si-g2", "Find the simple interest on $2000 at 5% p.a. for 3 years.", "I = 2000 \\times 0.05 \\times 3", "300", 2,
        "I = Prn with r = 0.05.", "I = 2000 × 0.05 × 3 = $300.", ["$300"]),
      ans("si-g3", "An investment earns $300 interest on a $2000 principal. Find the total amount.", "A = P + I", "2300", 2,
        "Total = principal + interest.", "A = 2000 + 300 = $2300.", ["$2300"]),
      ans("si-g4", "Find the simple interest on $500 at 4% p.a. for 2 years.", "I = 500 \\times 0.04 \\times 2", "40", 2,
        "I = Prn with r = 0.04.", "I = 500 × 0.04 × 2 = $40.", ["$40"]),
    ],
    independentPractice: [
      ans("si-i1", "Find the simple interest on $1500 at 6% p.a. for 4 years.", "I = 1500 \\times 0.06 \\times 4", "360", 2,
        "I = Prn.", "I = 1500 × 0.06 × 4 = $360.", ["$360"]),
      mcq("si-i2", "Why is simple interest described as 'linear' growth?", "B",
        ["because the balance doubles each year", "because the same amount of interest is added each year", "because the rate changes each year", "because it earns interest on interest"], 3,
        "Think about how much is added each year.", "Simple interest adds the same dollar amount every year, so the balance grows by a constant amount — a straight line (linear)."),
      ans("si-i3", "Find the total amount when $800 earns simple interest at 5% p.a. for 3 years.", "I = 800 \\times 0.05 \\times 3", "920", 3,
        "Find I first, then add the principal.", "I = 800 × 0.05 × 3 = $120; A = 800 + 120 = $920.", ["$920"]),
      ans("si-i4", "$1000 earns $150 simple interest in 3 years. Find the annual rate, as a percentage.", "r = \\frac{150}{1000 \\times 3}", "5", 3,
        "Rearrange to r = I/(Pn), then convert to %.", "r = 150 ÷ (1000 × 3) = 0.05 = 5%.", ["5%"]),
      ans("si-i5", "How many years for $2000 at 5% p.a. simple interest to earn $400?", "n = \\frac{400}{2000 \\times 0.05}", "4", 3,
        "Rearrange to n = I/(Pr).", "n = 400 ÷ (2000 × 0.05) = 400 ÷ 100 = 4 years.", ["4 years"]),
    ],
    masteryQuiz: [
      ans("si-m1", "Find the simple interest on $3000 at 4% p.a. for 5 years.", "I = 3000 \\times 0.04 \\times 5", "600", 2,
        "I = Prn.", "I = 3000 × 0.04 × 5 = $600.", ["$600"]),
      mcq("si-m2", "Which formula gives simple interest?", "A",
        ["I = Prn", "A = P(1 + r)ⁿ", "A = P(1 − r)ⁿ", "I = P/n"], 3,
        "Simple interest multiplies principal, rate and time.", "Simple interest is I = Prn. A = P(1 + r)ⁿ is compound interest."),
      ans("si-m3", "Find the total amount when $1200 earns simple interest at 6% p.a. for 2 years.", "I = 1200 \\times 0.06 \\times 2", "1344", 3,
        "Find I, then add the principal.", "I = 1200 × 0.06 × 2 = $144; A = 1200 + 144 = $1344.", ["$1344"]),
      ans("si-m4", "$2500 earns $500 simple interest in 4 years. Find the annual rate, as a percentage.", "r = \\frac{500}{2500 \\times 4}", "5", 3,
        "r = I/(Pn).", "r = 500 ÷ (2500 × 4) = 0.05 = 5%.", ["5%"]),
      mcq("si-m5", "After exactly 1 year, the interest earned by simple and compound interest on the same investment is:", "C",
        ["compound is always more", "simple is always more", "the same", "compound is double"], 3,
        "Compound interest only pulls ahead once interest starts earning interest.", "For the first year both charge interest on the original principal, so after 1 year simple and compound interest are equal; compound only pulls ahead from year 2."),
      ans("si-m6", "Find the simple interest on $600 at 10% p.a. for 1 year.", "I = 600 \\times 0.10 \\times 1", "60", 2,
        "I = Prn.", "I = 600 × 0.10 × 1 = $60.", ["$60"]),
      ans("si-m7", "How many years for $4000 at 5% p.a. simple interest to earn $600?", "n = \\frac{600}{4000 \\times 0.05}", "3", 3,
        "n = I/(Pr).", "n = 600 ÷ (4000 × 0.05) = 600 ÷ 200 = 3 years.", ["3 years"]),
      mcq("si-m8", "A graph of a simple-interest balance against time is:", "A",
        ["a straight line", "an upward curve", "a horizontal line", "a falling curve"], 3,
        "The same amount is added each year.", "Because simple interest adds a constant amount each year, the balance graph is a straight line."),
      ans("si-m9", "An investment of $5000 grows to $6500 with simple interest over 5 years. Find the annual rate, as a percentage.", "r = \\frac{1500}{5000 \\times 5}", "6", 4,
        "Find the interest first (A − P), then r = I/(Pn).", "Interest = 6500 − 5000 = $1500; r = 1500 ÷ (5000 × 5) = 0.06 = 6%.", ["6%"]),
      ans("si-m10", "Find the total amount when $1000 earns simple interest at 5% p.a. for 10 years.", "I = 1000 \\times 0.05 \\times 10", "1500", 4,
        "Find I over 10 years, then add the principal.", "I = 1000 × 0.05 × 10 = $500; A = 1000 + 500 = $1500.", ["$1500"]),
    ],
    commonMistakes: [
      { mistake: "Using the rate as a whole number instead of a decimal.", fix: "Convert the percentage first: 5% = 0.05 before using I = Prn." },
      { mistake: "Reporting the interest as the total amount.", fix: "Total amount A = principal + interest, not just the interest." },
      { mistake: "Treating simple interest like compound (earning on interest).", fix: "Simple interest is always on the original principal only." },
      { mistake: "Forgetting to subtract the principal when finding interest from a total.", fix: "Interest = final amount − principal." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 3B Simple Interest Graphs ────────────────────────────────────────────────────────
export function year12Standard1InterestGraphsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "interest-graphs") {
    return null;
  }
  return {
    description:
      "Read and interpret straight-line graphs of simple-interest growth: the principal as the y-intercept and the yearly interest as the gradient.",
    learningIntention:
      "Interpret a simple-interest balance graph, reading the principal, the yearly interest, and the balance at a time.",
    successCriteria: [
      "Recognise that a simple-interest balance graph is a straight line.",
      "Read the principal as the y-intercept (balance at year 0).",
      "Read the yearly interest as the gradient of the line.",
      "Find the balance at a given time, or the time to reach a balance, from the graph.",
    ],
    teaching: {
      paragraphs: [
        "Because simple interest adds the same dollars every year, drawing the balance against time gives a perfectly STRAIGHT line. The picture says everything the formula does: where the line starts and how steeply it climbs.",
        "The line crosses the balance axis at year 0 — and that starting value is the PRINCIPAL. So the y-intercept is the amount first invested, before any interest. Read it straight off the vertical axis.",
        "How steep the line is — its gradient — is the interest added each year. A line rising $100 every year has a gradient of 100, meaning $100 of interest per year. That yearly interest is P × r, so from the gradient and the principal you can recover the rate: rate = yearly interest ÷ principal.",
        "To read a balance, go up from the year on the time axis to the line, then across to the balance. To find when a balance is reached, do the reverse. A simple-interest line is contrasted with a compound-interest graph, which curves upward instead of staying straight.",
      ],
      latexBlocks: [
        "\\text{simple interest balance vs time} = \\text{straight line}",
        "\\text{y-intercept} = \\text{principal},\\qquad \\text{gradient} = \\text{interest per year}",
        "\\text{rate} = \\frac{\\text{yearly interest (gradient)}}{\\text{principal}}",
      ],
    },
    workedExamples: [
      {
        title: "Read the principal and gradient",
        questionLatex: "\\text{A simple-interest line starts at \\$1000 and rises \\$100 each year. State the principal and yearly interest.}",
        steps: [
          { explanation: "The y-intercept (year 0) is the principal.", latex: "\\text{principal} = \\$1000" },
          { explanation: "The gradient is the interest added each year.", latex: "\\text{yearly interest} = \\$100" },
        ],
        finalAnswerLatex: "\\text{principal \\$1000, \\$100/year}",
      },
      {
        title: "Recover the rate from the graph",
        questionLatex: "\\text{The line rises \\$100 per year on a \\$1000 principal. Find the annual rate.}",
        steps: [
          { explanation: "Rate = yearly interest ÷ principal.", latex: "\\frac{100}{1000} = 0.10" },
          { explanation: "Convert to a percentage.", latex: "0.10 = 10\\%" },
        ],
        finalAnswerLatex: "10\\%",
      },
    ],
    guidedPractice: [
      mcq("sig-g1", "The graph of a simple-interest balance against time is:", "A",
        ["a straight line", "an upward curve", "a downward curve", "a horizontal line"], 1,
        "Equal amounts are added each year.", "Simple interest adds the same amount each year, so the balance graph is a straight line."),
      ans("sig-g2", "Using the graph, state the principal (the balance at year 0).", "\\text{read the y-intercept}", "1000", 2,
        "The principal is the starting balance (y-intercept).", "At year 0 the line is at $1000, so the principal is $1000.",
        ["$1000"], { cartesianGraph: siLineGraph }),
      ans("sig-g3", "Using the graph, find the balance after 3 years.", "\\text{read at year 3}", "1300", 2,
        "Go up from year 3 to the line, then across.", "The line starts at $1000 and adds $100/year, so after 3 years the balance is 1000 + 300 = $1300.",
        ["$1300"], { cartesianGraph: siLineGraph }),
      ans("sig-g4", "On a simple-interest balance graph, what does the y-intercept represent?", "\\text{value at year 0}", "the principal", 2,
        "What is the balance before any interest?", "The y-intercept is the balance at year 0 — the principal first invested.",
        ["principal", "the principal invested"]),
    ],
    independentPractice: [
      ans("sig-i1", "Using the graph, find the interest added each year (the gradient).", "\\text{rise per year}", "100", 3,
        "How much does the line climb each year?", "The line rises from $1000 to $1100 to $1200 — $100 each year — so the yearly interest is $100.",
        ["$100"], { cartesianGraph: siLineGraph }),
      mcq("sig-i2", "Why is a simple-interest balance graph a straight line rather than a curve?", "B",
        ["because the rate increases each year", "because the same interest is added each year", "because it earns interest on interest", "because the principal grows"], 3,
        "What stays constant each year?", "Simple interest adds the same constant amount each year, giving a constant gradient — a straight line. A curve would mean the yearly increase keeps growing (compound)."),
      ans("sig-i3", "A simple-interest graph starts at $2000 and rises $120 each year. Find the balance after 4 years.", "2000 + 120 \\times 4", "2480", 3,
        "Add 4 years of interest to the principal.", "Balance = 2000 + 120 × 4 = 2000 + 480 = $2480.", ["$2480"]),
      ans("sig-i4", "A simple-interest balance graph has gradient $150 per year on a $3000 principal. Find the annual rate, as a percentage.", "\\frac{150}{3000}", "5", 3,
        "Rate = yearly interest ÷ principal.", "Rate = 150 ÷ 3000 = 0.05 = 5%.", ["5%"]),
      ans("sig-i5", "Using the graph, after how many years does the balance first reach $1500?", "1000 + 100n = 1500", "5", 3,
        "How many $100 steps from $1000 to $1500?", "From $1000, adding $100/year reaches $1500 after (1500 − 1000) ÷ 100 = 5 years.",
        ["5 years"], { cartesianGraph: siLineGraph }),
    ],
    masteryQuiz: [
      ans("sig-m1", "Using the graph, state the principal of this investment.", "\\text{y-intercept}", "1000", 2,
        "Read the balance at year 0.", "The line starts at $1000 at year 0, so the principal is $1000.",
        ["$1000"], { cartesianGraph: siLineGraph }),
      mcq("sig-m2", "Which description matches a simple-interest balance graph?", "A",
        ["a straight line rising steadily", "a curve getting steeper", "a curve getting flatter", "a horizontal line"], 3,
        "Constant yearly increase.", "Simple interest gives a steadily rising straight line; a curve that steepens would be compound interest."),
      ans("sig-m3", "A simple-interest graph starts at $5000 and rises $250 each year. Find the balance after 6 years.", "5000 + 250 \\times 6", "6500", 3,
        "Add 6 years of interest.", "Balance = 5000 + 250 × 6 = 5000 + 1500 = $6500.", ["$6500"]),
      ans("sig-m4", "A simple-interest balance graph rises from $1000 to $1400 over 4 years. Find the interest added each year.", "\\frac{1400 - 1000}{4}", "100", 3,
        "Gradient = total rise ÷ years.", "Yearly interest = (1400 − 1000) ÷ 4 = 400 ÷ 4 = $100.", ["$100"]),
      mcq("sig-m5", "On a simple-interest balance graph, the gradient represents:", "B",
        ["the principal", "the interest earned per year", "the total interest", "the percentage rate"], 3,
        "Gradient is the rise per year.", "The gradient is how much the balance rises each year — the yearly interest in dollars (not the percentage rate)."),
      ans("sig-m6", "Using the graph, find the balance after 4 years.", "\\text{read at year 4}", "1400", 2,
        "Read up from year 4.", "Starting at $1000 and adding $100/year, after 4 years the balance is 1000 + 400 = $1400.",
        ["$1400"], { cartesianGraph: siLineGraph }),
      ans("sig-m7", "A simple-interest graph has gradient $80 per year on a $2000 principal. Find the annual rate, as a percentage.", "\\frac{80}{2000}", "4", 3,
        "Rate = yearly interest ÷ principal.", "Rate = 80 ÷ 2000 = 0.04 = 4%.", ["4%"]),
      mcq("sig-m8", "Compared with a simple-interest line, a compound-interest graph is:", "B",
        ["also a straight line", "a curve that gets steeper over time", "a falling line", "a horizontal line"], 3,
        "Compound earns interest on interest.", "Compound interest earns interest on a growing balance, so its graph curves upward and gets steeper, unlike the straight simple-interest line."),
      ans("sig-m9", "A simple-interest balance graph passes through (0, 4000) and (5, 5000). Find the interest added each year.", "\\frac{5000 - 4000}{5}", "200", 4,
        "Gradient between the two points.", "Yearly interest = (5000 − 4000) ÷ 5 = 1000 ÷ 5 = $200.", ["$200"]),
      ans("sig-m10", "A simple-interest balance graph passes through (0, 4000) and (5, 5000). Find the annual rate, as a percentage.", "\\frac{200}{4000}", "5", 4,
        "Find the yearly interest (gradient), then divide by the principal.", "Yearly interest = (5000 − 4000) ÷ 5 = $200; rate = 200 ÷ 4000 = 0.05 = 5%.", ["5%"]),
    ],
    commonMistakes: [
      { mistake: "Expecting the simple-interest graph to curve.", fix: "Simple interest adds a constant amount each year, so the graph is a straight line." },
      { mistake: "Reading the gradient as the percentage rate.", fix: "The gradient is the dollars of interest per year; rate = gradient ÷ principal." },
      { mistake: "Mistaking the y-intercept for the final amount.", fix: "The y-intercept is the principal (year 0), not the end balance." },
      { mistake: "Confusing the simple-interest line with a compound curve.", fix: "Straight line = simple; upward-steepening curve = compound." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 3D Compound Interest — Present Value ─────────────────────────────────────────────
export function year12Standard1PresentValueLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "present-value") {
    return null;
  }
  return {
    description:
      "Find the present value — the amount to invest now to reach a future target — by rearranging the compound-interest formula.",
    learningIntention:
      "Find the present value needed to reach a future amount using P = A ÷ (1 + r)ⁿ.",
    successCriteria: [
      "Recognise present value as the amount to invest now for a future target.",
      "Rearrange A = P(1 + r)ⁿ to P = A ÷ (1 + r)ⁿ.",
      "Calculate a present value given the future amount, rate and time.",
      "Explain why present value is less than the future amount, and how rate/time affect it.",
    ],
    teaching: {
      paragraphs: [
        "Compound interest usually answers 'how much will my money GROW to?'. Present value flips the question: 'how much do I need to invest NOW to end up with a target amount later?'. The target is the future value A; the answer is the present value P.",
        "Since money grows by the factor (1 + r) each period, A = P(1 + r)ⁿ. To go backwards from A to P you UNDO that growth — divide instead of multiply: P = A ÷ (1 + r)ⁿ. This is called discounting. For example, to have $1210 in 2 years at 10%, invest 1210 ÷ 1.1² = 1210 ÷ 1.21 = $1000 now.",
        "The present value is always LESS than the future amount, because the money you invest will grow with interest to reach the target. The bigger the rate or the longer the time, the more growth does the work for you, so the LESS you need to put in today.",
        "The classic error is to divide by (1 + rn) — that is the simple-interest pattern — or to multiply when you should divide. For compound present value, divide by (1 + r) once for every period: that is dividing by (1 + r)ⁿ.",
      ],
      latexBlocks: [
        "A = P(1 + r)^n\\ \\Rightarrow\\ P = \\frac{A}{(1 + r)^n}",
        "\\text{present value} < \\text{future amount}",
        "\\text{higher rate or longer time} \\Rightarrow \\text{smaller present value needed}",
      ],
    },
    workedExamples: [
      {
        title: "Present value for a target",
        questionLatex: "\\text{How much to invest now at 10\\% p.a. to have \\$1210 in 2 years?}",
        steps: [
          { explanation: "Use P = A ÷ (1 + r)ⁿ with the growth factor 1.1.", latex: "P = \\frac{1210}{1.1^2} = \\frac{1210}{1.21}" },
          { explanation: "Divide.", latex: "= \\$1000" },
        ],
        finalAnswerLatex: "\\$1000",
      },
      {
        title: "Longer time, smaller present value",
        questionLatex: "\\text{How much now at 10\\% to have \\$13310 in 3 years?}",
        steps: [
          { explanation: "Divide by 1.1 three times.", latex: "P = \\frac{13310}{1.1^3} = \\frac{13310}{1.331}" },
          { explanation: "Divide.", latex: "= \\$10000" },
        ],
        finalAnswerLatex: "\\$10000",
      },
    ],
    guidedPractice: [
      mcq("pv-g1", "The present value of a future amount is:", "B",
        ["the interest earned", "the amount to invest now to reach that future amount", "the future amount plus interest", "the rate times the principal"], 1,
        "Present = now; future = later.", "The present value is how much you must invest now so it grows to the target future amount."),
      ans("pv-g2", "How much to invest now at 10% p.a. to have $1210 in 2 years?", "P = \\frac{1210}{1.1^2}", "1000", 2,
        "P = A ÷ (1 + r)ⁿ.", "P = 1210 ÷ 1.1² = 1210 ÷ 1.21 = $1000.", ["$1000"]),
      ans("pv-g3", "Find the present value of $6050 due in 2 years at 10% p.a.", "P = \\frac{6050}{1.1^2}", "5000", 2,
        "Divide by 1.21.", "P = 6050 ÷ 1.21 = $5000.", ["$5000"]),
      ans("pv-g4", "How much to invest now at 10% p.a. to have $1100 in 1 year?", "P = \\frac{1100}{1.1}", "1000", 2,
        "Divide by the growth factor once.", "P = 1100 ÷ 1.1 = $1000.", ["$1000"]),
    ],
    independentPractice: [
      ans("pv-i1", "Find the present value of $13310 due in 3 years at 10% p.a.", "P = \\frac{13310}{1.1^3}", "10000", 3,
        "Divide by 1.1³ = 1.331.", "P = 13310 ÷ 1.331 = $10000.", ["$10000"]),
      mcq("pv-i2", "To find a present value from a future amount, you:", "B",
        ["multiply by (1 + r)ⁿ", "divide by (1 + r)ⁿ", "divide by (1 + rn)", "subtract the interest"], 3,
        "Present value undoes compound growth.", "Compound growth multiplies by (1 + r)ⁿ, so to go back you divide by (1 + r)ⁿ. Dividing by (1 + rn) is the simple-interest pattern."),
      ans("pv-i3", "Find the present value of $2420 due in 2 years at 10% p.a.", "P = \\frac{2420}{1.1^2}", "2000", 3,
        "Divide by 1.21.", "P = 2420 ÷ 1.21 = $2000.", ["$2000"]),
      ans("pv-i4", "Find the present value of $4410 due in 2 years at 5% p.a.", "P = \\frac{4410}{1.05^2}", "4000", 3,
        "Divide by 1.05² = 1.1025.", "P = 4410 ÷ 1.1025 = $4000.", ["$4000"]),
      ans("pv-i5", "Is the present value of a future amount MORE or LESS than that future amount? Answer more or less.", "\\text{grows with interest}", "less", 3,
        "The invested money grows over time to reach the target.", "The money invested now earns interest and grows to the future amount, so the present value is less than the future amount.",
        ["less than"]),
    ],
    masteryQuiz: [
      ans("pv-m1", "Find the present value of $1331 due in 3 years at 10% p.a.", "P = \\frac{1331}{1.1^3}", "1000", 3,
        "Divide by 1.331.", "P = 1331 ÷ 1.1³ = 1331 ÷ 1.331 = $1000.", ["$1000"]),
      mcq("pv-m2", "Which formula gives the present value P?", "A",
        ["P = A ÷ (1 + r)ⁿ", "P = A × (1 + r)ⁿ", "P = A ÷ (1 + rn)", "P = A − rn"], 3,
        "Undo compound growth.", "P = A ÷ (1 + r)ⁿ rearranges A = P(1 + r)ⁿ. The others are multiplication or the simple-interest form."),
      ans("pv-m3", "Find the present value of $12100 due in 2 years at 10% p.a.", "P = \\frac{12100}{1.1^2}", "10000", 3,
        "Divide by 1.21.", "P = 12100 ÷ 1.21 = $10000.", ["$10000"]),
      ans("pv-m4", "Find the present value of $1102.50 due in 2 years at 5% p.a.", "P = \\frac{1102.50}{1.05^2}", "1000", 3,
        "Divide by 1.1025.", "P = 1102.50 ÷ 1.1025 = $1000.", ["$1000"]),
      mcq("pv-m5", "Keeping the rate fixed, investing for a LONGER time means the present value needed is:", "B",
        ["larger", "smaller", "unchanged", "negative"], 3,
        "More time means more growth.", "Over a longer time the money grows more, so you need to invest less now — a smaller present value."),
      ans("pv-m6", "Find the present value of $1100 due in 1 year at 10% p.a.", "P = \\frac{1100}{1.1}", "1000", 2,
        "Divide once by 1.1.", "P = 1100 ÷ 1.1 = $1000.", ["$1000"]),
      ans("pv-m7", "Find the present value of $5512.50 due in 2 years at 5% p.a.", "P = \\frac{5512.50}{1.05^2}", "5000", 3,
        "Divide by 1.1025.", "P = 5512.50 ÷ 1.1025 = $5000.", ["$5000"]),
      mcq("pv-m8", "Keeping the time fixed, a HIGHER interest rate makes the present value needed:", "B",
        ["larger", "smaller", "unchanged", "exactly the future amount"], 3,
        "A higher rate grows the money faster.", "A higher rate grows the investment faster, so less needs to be invested now — a smaller present value."),
      ans("pv-m9", "How much must be invested now at 10% p.a. to have $4000 in 2 years? Give your answer to the nearest cent.", "P = \\frac{4000}{1.1^2}", "3305.79", 4,
        "Divide by 1.21 and round to cents.", "P = 4000 ÷ 1.21 = 3305.785… ≈ $3305.79.", ["$3305.79"]),
      ans("pv-m10", "Find the present value of $2205 due in 2 years at 5% p.a.", "P = \\frac{2205}{1.05^2}", "2000", 4,
        "Divide by 1.1025.", "P = 2205 ÷ 1.1025 = $2000.", ["$2000"]),
    ],
    commonMistakes: [
      { mistake: "Multiplying by (1 + r)ⁿ instead of dividing.", fix: "Present value undoes growth: divide the future amount by (1 + r)ⁿ." },
      { mistake: "Dividing by (1 + rn) (the simple-interest form).", fix: "For compound present value, divide by (1 + r)ⁿ." },
      { mistake: "Expecting the present value to exceed the future amount.", fix: "It is always less — the invested money grows to the target." },
      { mistake: "Using the rate as a whole number.", fix: "Use the growth factor 1 + r (e.g. 1.1 for 10%)." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 3E Compound Interest Graphs ──────────────────────────────────────────────────────
export function year12Standard1CompoundInterestGraphsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "compound-interest-graphs") {
    return null;
  }
  return {
    description:
      "Read and interpret compound-interest graphs as upward curves, and compare them with the straight line of simple interest.",
    learningIntention:
      "Interpret a compound-interest balance graph as a steepening curve and compare it with simple interest.",
    successCriteria: [
      "Recognise that a compound-interest balance graph is an upward-curving line.",
      "Read the principal and the balance at a given time from the graph.",
      "Explain why the curve steepens (interest on interest).",
      "Compare simple and compound interest from their graphs over time.",
    ],
    teaching: {
      paragraphs: [
        "Compound interest earns interest on the interest already added, so each year the balance grows by a little MORE than the year before. Graphed against time, that is not a straight line — it is a curve that starts gently and gets steeper and steeper as the balance snowballs.",
        "The starting point still tells you the principal: at year 0 the curve sits at the amount first invested. Reading a later balance works the same as any graph — up from the year, across to the balance — but the spacing between successive years grows because the increases are getting bigger.",
        "The clearest way to see compound interest is to graph it ALONGSIDE simple interest from the same principal and rate. They start at the same point and rise together at first, but the compound curve pulls above the straight simple-interest line and the gap WIDENS every year — that growing gap is the interest earned on past interest.",
        "So the shapes are the fingerprint: a straight line means simple interest (constant yearly increase); an upward-bending curve means compound interest (increasing yearly increase). After enough time, compound interest always ends up higher than simple interest at the same rate.",
      ],
      latexBlocks: [
        "\\text{compound balance vs time} = \\text{upward-steepening curve}",
        "\\text{simple: straight line};\\quad \\text{compound: curve above it}",
        "\\text{the gap (interest on interest) widens over time}",
      ],
    },
    workedExamples: [
      {
        title: "Read the curve",
        questionLatex: "\\text{A compound graph shows \\$1000 at year 0 and \\$1210 at year 2. State the principal and the balance after 2 years.}",
        steps: [
          { explanation: "Year 0 value is the principal.", latex: "\\text{principal} = \\$1000" },
          { explanation: "Read the curve at year 2.", latex: "\\$1210" },
        ],
        finalAnswerLatex: "\\text{principal \\$1000, \\$1210}",
      },
      {
        title: "Compound vs simple",
        questionLatex: "\\text{From \\$1000 at 10\\%, compare the balance after 4 years for simple vs compound.}",
        steps: [
          { explanation: "Simple adds $100 each year.", latex: "1000 + 4 \\times 100 = \\$1400" },
          { explanation: "Compound multiplies by 1.1 four times.", latex: "1000 \\times 1.1^4 \\approx \\$1464" },
        ],
        finalAnswerLatex: "\\text{compound (\\$1464) > simple (\\$1400)}",
      },
    ],
    guidedPractice: [
      mcq("cig-g1", "The graph of a compound-interest balance against time is:", "B",
        ["a straight line", "an upward curve that gets steeper", "a downward curve", "a horizontal line"], 1,
        "Interest is earned on a growing balance.", "Compound interest earns interest on interest, so the balance curve gets steeper over time — not straight."),
      ans("cig-g2", "Using the graph, state the principal (balance at year 0).", "\\text{read year 0}", "1000", 2,
        "Read the curve at year 0.", "At year 0 the curve is at $1000, so the principal is $1000.",
        ["$1000"], { cartesianGraph: ciCurve }),
      ans("cig-g3", "Using the graph, find the balance after 2 years.", "\\text{read at year 2}", "1210", 2,
        "Read up from year 2 to the curve.", "At year 2 the compound balance is $1210.",
        ["$1210"], { cartesianGraph: ciCurve }),
      ans("cig-g4", "True or false: compound interest is earned only on the original principal.", "\\text{interest on interest?}", "false", 2,
        "Does compound interest also earn on past interest?", "False — compound interest is earned on the principal PLUS the interest already earned (interest on interest), not on the principal alone.",
        ["False"]),
    ],
    independentPractice: [
      mcq("cig-i1", "Why does a compound-interest graph curve upward instead of staying straight?", "B",
        ["the rate increases each year", "interest is earned on a growing balance (interest on interest)", "the principal is removed", "the time is doubled"], 3,
        "What is interest charged on each year?", "Each year's interest is earned on a larger balance (including past interest), so the yearly increase grows and the graph curves upward."),
      ans("cig-i2", "Using the graph, after 4 years which is higher — simple interest or compound interest?", "\\text{compare the paths}", "compound", 3,
        "Which path is on top at year 4?", "At year 4 the compound curve ($1464) is above the simple-interest line ($1400), so compound interest is higher.",
        ["compound interest"], { cartesianGraph: ciCompare }),
      ans("cig-i3", "$1000 is invested at 10% p.a. compound. Find the balance after 2 years.", "1000 \\times 1.1^2", "1210", 3,
        "Multiply by 1.1 twice.", "Balance = 1000 × 1.1² = 1000 × 1.21 = $1210.", ["$1210"]),
      ans("cig-i4", "Simple and compound interest both start at $1000 at 10% p.a. Find the balance after 1 year (it is the same for both).", "1000 \\times 1.1", "1100", 3,
        "After 1 year both apply 10% to $1000.", "Both give 1000 + 100 = $1100 after 1 year; they only differ from year 2 onward.", ["$1100"]),
      ans("cig-i5", "Using the graph, find the balance after 3 years.", "\\text{read at year 3}", "1331", 3,
        "Read up from year 3 to the curve.", "At year 3 the compound balance is $1331.",
        ["$1331"], { cartesianGraph: ciCurve }),
    ],
    masteryQuiz: [
      ans("cig-m1", "Using the graph, state the principal of this compound investment.", "\\text{read year 0}", "1000", 2,
        "Balance at year 0.", "The curve starts at $1000 at year 0, so the principal is $1000.",
        ["$1000"], { cartesianGraph: ciCurve }),
      mcq("cig-m2", "Which graph shape shows compound interest?", "B",
        ["a straight rising line", "an upward curve that steepens", "a horizontal line", "a falling line"], 3,
        "Interest on interest steepens the rise.", "Compound interest gives an upward curve that gets steeper; a straight line is simple interest."),
      ans("cig-m3", "$2000 is invested at 10% p.a. compound. Find the balance after 2 years.", "2000 \\times 1.1^2", "2420", 3,
        "Multiply by 1.1 twice.", "Balance = 2000 × 1.1² = 2000 × 1.21 = $2420.", ["$2420"]),
      ans("cig-m4", "$1000 at 10% p.a. compound. Find the balance after 3 years.", "1000 \\times 1.1^3", "1331", 3,
        "Multiply by 1.1 three times.", "Balance = 1000 × 1.1³ = 1000 × 1.331 = $1331.", ["$1331"]),
      mcq("cig-m5", "After several years at the same rate, the compound-interest balance compared with the simple-interest balance is:", "B",
        ["lower", "higher", "exactly equal", "always double"], 3,
        "Which curve pulls ahead?", "Compound interest earns interest on interest, so after the first year it pulls ahead and ends higher than simple interest."),
      ans("cig-m6", "Using the graph, find the balance after 1 year.", "\\text{read at year 1}", "1100", 2,
        "Read up from year 1.", "At year 1 the compound balance is $1100.",
        ["$1100"], { cartesianGraph: ciCurve }),
      ans("cig-m7", "$5000 is invested at 4% p.a. compound. Find the balance after 2 years.", "5000 \\times 1.04^2", "5408", 3,
        "Multiply by 1.04 twice.", "Balance = 5000 × 1.04² = 5000 × 1.0816 = $5408.", ["$5408"]),
      mcq("cig-m8", "On a graph of simple and compound interest from the same start, the gap between them over time:", "B",
        ["stays the same", "widens", "narrows to zero", "appears only in year 1"], 3,
        "Interest on interest accumulates.", "The compound curve pulls further above the simple line each year, so the gap widens over time."),
      ans("cig-m9", "$1000 at 10% p.a. compound. Find the balance after 4 years.", "1000 \\times 1.1^4", "1464.10", 4,
        "Multiply by 1.1 four times.", "Balance = 1000 × 1.1⁴ = 1000 × 1.4641 = $1464.10.", ["$1464.10", "1464.1"]),
      ans("cig-m10", "On $1000 at 10% p.a., find the difference between the compound and simple interest earned after 2 years.", "210 - 200", "10", 4,
        "Find each interest amount, then subtract.", "Compound: 1000 × 1.1² = 1210, interest $210. Simple: 1000 × 0.1 × 2 = $200. Difference = 210 − 200 = $10.", ["$10"]),
    ],
    commonMistakes: [
      { mistake: "Drawing or expecting a straight line for compound interest.", fix: "Compound interest curves upward and steepens — only simple interest is straight." },
      { mistake: "Thinking compound and simple differ in year 1.", fix: "They are equal after the first year; compound pulls ahead from year 2." },
      { mistake: "Reading the curve as if the yearly increases were equal.", fix: "Each year's rise is larger than the last (interest on interest)." },
      { mistake: "Assuming the simple line can overtake the compound curve.", fix: "At the same rate, compound is always higher after the first year." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 3F Appreciation and Inflation ────────────────────────────────────────────────────
export function year12Standard1AppreciationInflationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "appreciation-inflation") {
    return null;
  }
  return {
    description:
      "Apply compound growth to appreciation (assets gaining value) and inflation (rising prices) using a growth factor.",
    learningIntention:
      "Model appreciation and inflation as compound growth, A = P(1 + r)ⁿ, and find future values.",
    successCriteria: [
      "Find the future value of an appreciating asset using compound growth.",
      "Find a future cost after inflation over several years.",
      "Write the growth factor from a percentage rate.",
      "Distinguish appreciation (value rises) from depreciation (value falls).",
    ],
    teaching: {
      paragraphs: [
        "Some things gain value over time instead of losing it. APPRECIATION is when an asset — a house, land, a collectible — rises in value, usually by a percentage each year. That is exactly compound growth: multiply by the growth factor (1 + r) once for each year, A = P(1 + r)ⁿ. A $300000 house appreciating 6% a year is worth 300000 × 1.06ⁿ after n years.",
        "INFLATION is the same mathematics applied to prices: the general cost of goods rises by a percentage each year, so a price grows by (1 + inflation rate) per year. A $200 item with 5% inflation costs 200 × 1.05 = $210 next year, and 200 × 1.05² = $220.50 the year after.",
        "The growth factor is the usual stumbling block: a 6% rise multiplies by 1.06 (keep 100%, add 6%), not by 0.06. And the rate is applied once per period, so n years means the factor to the power n.",
        "Appreciation is the OPPOSITE of depreciation. Appreciation uses (1 + r) and the value climbs; depreciation uses (1 − r) and the value falls. Watch which one a question describes — a house appreciates, a car usually depreciates. Inflation also quietly erodes the purchasing power of money: as prices rise, the same dollar buys less.",
      ],
      latexBlocks: [
        "\\text{appreciation: } A = P(1 + r)^n",
        "\\text{future cost after inflation: } P(1 + \\text{inflation})^n",
        "\\text{growth factor} = 1 + r\\ (\\text{not } r);\\quad \\text{depreciation uses } 1 - r",
      ],
    },
    workedExamples: [
      {
        title: "Appreciating asset",
        questionLatex: "\\text{A house worth \\$300000 appreciates 6\\% p.a. Find its value after 2 years.}",
        steps: [
          { explanation: "Growth factor 1.06, applied twice.", latex: "A = 300000 \\times 1.06^2" },
          { explanation: "Evaluate.", latex: "= 300000 \\times 1.1236 = \\$337080" },
        ],
        finalAnswerLatex: "\\$337080",
      },
      {
        title: "Inflation on a price",
        questionLatex: "\\text{With 5\\% inflation, find the cost in 2 years of an item costing \\$200 now.}",
        steps: [
          { explanation: "Multiply by 1.05 for each year.", latex: "200 \\times 1.05^2 = 200 \\times 1.1025" },
          { explanation: "Evaluate.", latex: "= \\$220.50" },
        ],
        finalAnswerLatex: "\\$220.50",
      },
    ],
    guidedPractice: [
      mcq("appr-g1", "Appreciation means an asset's value:", "B",
        ["decreases over time", "increases over time", "stays the same", "becomes zero"], 1,
        "Appreciation is the opposite of depreciation.", "Appreciation means the asset gains value over time (the opposite of depreciation)."),
      ans("appr-g2", "A painting worth $5000 appreciates 10% in a year. Find its new value.", "5000 \\times 1.10", "5500", 2,
        "Multiply by the growth factor 1.10.", "Value = 5000 × 1.10 = $5500.", ["$5500"]),
      ans("appr-g3", "A house worth $300000 appreciates 6% p.a. Find its value after 2 years.", "300000 \\times 1.06^2", "337080", 2,
        "Multiply by 1.06 twice.", "Value = 300000 × 1.06² = 300000 × 1.1236 = $337080.", ["$337080"]),
      ans("appr-g4", "With 5% inflation, find the price in 1 year of a $200 item.", "200 \\times 1.05", "210", 2,
        "Multiply by 1.05.", "Price = 200 × 1.05 = $210.", ["$210"]),
    ],
    independentPractice: [
      ans("appr-i1", "Land worth $80000 appreciates 5% p.a. Find its value after 2 years.", "80000 \\times 1.05^2", "88200", 2,
        "Multiply by 1.05 twice.", "Value = 80000 × 1.05² = 80000 × 1.1025 = $88200.", ["$88200"]),
      mcq("appr-i2", "Appreciation of an asset is modelled like:", "B",
        ["simple interest", "compound growth, A = P(1 + r)ⁿ", "depreciation", "a straight line"], 3,
        "Value rises by a percentage each year.", "Appreciation multiplies by (1 + r) each year, so it is compound growth A = P(1 + r)ⁿ."),
      ans("appr-i3", "With 4% inflation, find the cost in 2 years of a $500 item.", "500 \\times 1.04^2", "540.80", 3,
        "Multiply by 1.04 twice.", "Cost = 500 × 1.04² = 500 × 1.0816 = $540.80.", ["$540.80"]),
      ans("appr-i4", "A collectible worth $2000 appreciates 10% p.a. Find its value after 3 years.", "2000 \\times 1.1^3", "2662", 3,
        "Multiply by 1.1 three times.", "Value = 2000 × 1.1³ = 2000 × 1.331 = $2662.", ["$2662"]),
      ans("appr-i5", "Does inflation increase or decrease the purchasing power of money? Answer increase or decrease.", "\\text{prices rise}", "decrease", 3,
        "If prices rise, what can the same dollar buy?", "Inflation raises prices, so the same money buys less over time — purchasing power decreases.",
        ["decreases", "reduce", "reduces"]),
    ],
    masteryQuiz: [
      ans("appr-m1", "An item worth $1000 appreciates 20% in a year. Find its new value.", "1000 \\times 1.20", "1200", 2,
        "Multiply by 1.20.", "Value = 1000 × 1.20 = $1200.", ["$1200"]),
      mcq("appr-m2", "Which of these makes an asset's value INCREASE over time?", "A",
        ["appreciation", "depreciation", "inflation of unrelated prices", "a declining balance"], 2,
        "Which term means gaining value?", "Appreciation increases an asset's value; depreciation and declining balance decrease it."),
      ans("appr-m3", "A house worth $400000 appreciates 5% p.a. Find its value after 2 years.", "400000 \\times 1.05^2", "441000", 3,
        "Multiply by 1.05 twice.", "Value = 400000 × 1.05² = 400000 × 1.1025 = $441000.", ["$441000"]),
      ans("appr-m4", "With 4% inflation, find the cost in 2 years of a $250 item.", "250 \\times 1.04^2", "270.40", 3,
        "Multiply by 1.04 twice.", "Cost = 250 × 1.04² = 250 × 1.0816 = $270.40.", ["$270.40"]),
      mcq("appr-m5", "With inflation at 3% per year, next year's prices are this year's prices times:", "B",
        ["0.03", "1.03", "0.97", "3"], 3,
        "Keep 100% and add 3%.", "A 3% rise multiplies by 1 + 0.03 = 1.03."),
      ans("appr-m6", "An asset worth $600 appreciates 10% in a year. Find its new value.", "600 \\times 1.10", "660", 2,
        "Multiply by 1.10.", "Value = 600 × 1.10 = $660.", ["$660"]),
      ans("appr-m7", "Property worth $5000 appreciates 6% p.a. Find its value after 2 years.", "5000 \\times 1.06^2", "5618", 3,
        "Multiply by 1.06 twice.", "Value = 5000 × 1.06² = 5000 × 1.1236 = $5618.", ["$5618"]),
      mcq("appr-m8", "Which growth factor models an 8% annual appreciation?", "C",
        ["0.08", "0.92", "1.08", "8"], 3,
        "Keep 100% and add 8%.", "An 8% increase multiplies by 1 + 0.08 = 1.08."),
      ans("appr-m9", "A $300000 house appreciates 5% p.a. for 3 years. Find its value.", "300000 \\times 1.05^3", "347287.50", 4,
        "Multiply by 1.05 three times.", "Value = 300000 × 1.05³ = 300000 × 1.157625 = $347287.50.", ["$347287.50"]),
      ans("appr-m10", "With 5% inflation, find the cost in 2 years of an item costing $80 now.", "80 \\times 1.05^2", "88.20", 4,
        "Multiply by 1.05 twice.", "Cost = 80 × 1.05² = 80 × 1.1025 = $88.20.", ["$88.20"]),
    ],
    commonMistakes: [
      { mistake: "Multiplying by the rate r instead of the factor 1 + r.", fix: "A 6% rise multiplies by 1.06, not 0.06." },
      { mistake: "Confusing appreciation with depreciation.", fix: "Appreciation uses (1 + r) and rises; depreciation uses (1 − r) and falls." },
      { mistake: "Applying the rate only once for several years.", fix: "Raise the factor to the power n for n years." },
      { mistake: "Thinking inflation increases the value of money.", fix: "Inflation raises prices, so money's purchasing power falls." },
    ],
    masteryPassMark: 0.8,
  };
}
