import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
  | "masteryQuizPool"
  | "multiPartPractice"
>;

// ── Helper builders ──────────────────────────────────────────────────────────

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify the key values, choose the correct method, then calculate step by step.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read the question carefully, then check each option against the relevant rule or formula.",
    explanation,
  };
}

// Pool builders: identical to `answer`/`choice` but carry a difficulty tag (1–5)
// so the mastery-quiz selector can ramp easy→hard.
function poolAnswer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  difficulty: number,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify the key values, choose the correct method, then calculate step by step.",
    explanation,
  };
}

function poolChoice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  difficulty: number,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read the question carefully, then check each option against the relevant rule or formula.",
    explanation,
  };
}

// ── Lesson 1: Percentages Basics ─────────────────────────────────────────────

const percentagesBasics: LessonContent = {
  description:
    "Convert between percentages, decimals and fractions, and calculate a percentage of an amount in everyday money contexts.",
  learningIntention:
    "Calculate a percentage of an amount and convert freely between percentages, decimals and fractions.",
  successCriteria: [
    "Convert a percentage to a decimal by dividing by 100.",
    "Convert a percentage to a simplified fraction.",
    "Find a percentage of an amount by multiplying the decimal by the amount.",
    "Use key percentages — 50%, 25%, 10%, 1% — to check and speed up calculations.",
  ],
  teaching: {
    paragraphs: [
      "A percentage means 'out of 100'. For example, 35% means 35 out of every 100.",
      "To convert a percentage to a decimal, divide by 100 — equivalently, move the decimal point two places to the left. For example, 35% = 0.35 and 8% = 0.08.",
      "To find a percentage of an amount, convert the percentage to a decimal and multiply. For example, 20% of $60 equals 0.20 × $60 = $12.",
      "Knowing key benchmark percentages by heart speeds up working: 50% = 0.5, 25% = 0.25, 10% = 0.1, 1% = 0.01.",
    ],
    latexBlocks: [
      "35\\% = \\frac{35}{100} = 0.35",
      "20\\%\\text{ of }\\$60 = 0.20 \\times 60 = \\$12",
      "50\\% = 0.5,\\quad 25\\% = 0.25,\\quad 10\\% = 0.1,\\quad 1\\% = 0.01",
    ],
  },
  workedExamples: [
    {
      title: "Convert a percentage to a decimal",
      questionLatex: "\\text{Convert }45\\%\\text{ to a decimal.}",
      steps: [
        { explanation: "Divide by 100 (move the decimal point two places left).", latex: "45 \\div 100 = 0.45" },
      ],
      finalAnswerLatex: "0.45",
    } as WorkedExample,
    {
      title: "Find a percentage of an amount",
      questionLatex: "\\text{Find }30\\%\\text{ of }\\$80.",
      steps: [
        { explanation: "Convert 30% to a decimal.", latex: "30\\% = 0.30" },
        { explanation: "Multiply by the amount.", latex: "0.30 \\times 80 = 24" },
      ],
      finalAnswerLatex: "\\$24",
    } as WorkedExample,
    {
      title: "Use 10% to build other percentages",
      questionLatex: "\\text{Find }15\\%\\text{ of }\\$60.",
      steps: [
        { explanation: "Find 10% first.", latex: "10\\% \\text{ of } \\$60 = 0.10 \\times 60 = \\$6" },
        { explanation: "Find 5% by halving the 10% value.", latex: "5\\% = \\$6 \\div 2 = \\$3" },
        { explanation: "Add: 15% = 10% + 5%.", latex: "\\$6 + \\$3 = \\$9" },
      ],
      finalAnswerLatex: "\\$9",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-fin-pct-g1",
      "Convert 75% to a decimal.",
      "75\\% = \\;?",
      "0.75",
      "75 ÷ 100 = 0.75.",
      [".75"]
    ),
    answer(
      "y8-fin-pct-g2",
      "Find 10% of $90.",
      "10\\%\\text{ of }\\$90 = \\;?",
      "9",
      "0.10 × 90 = 9.",
      ["$9", "9.00", "$9.00"]
    ),
    choice(
      "y8-fin-pct-g3",
      "Which calculation correctly finds 25% of $48?",
      "A",
      ["0.25 × 48", "25 × 48", "48 ÷ 25", "48 − 25"],
      "25% as a decimal is 0.25. Multiply by the amount: 0.25 × 48 = $12."
    ),
    answer(
      "y8-fin-pct-g4",
      "Find 20% of $150.",
      "20\\%\\text{ of }\\$150 = \\;?",
      "30",
      "0.20 × 150 = 30.",
      ["$30", "30.00", "$30.00"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-fin-pct-i1",
      "Convert 8% to a decimal.",
      "8\\% = \\;?",
      "0.08",
      "8 ÷ 100 = 0.08.",
      [".08"]
    ),
    answer(
      "y8-fin-pct-i2",
      "Find 50% of $64.",
      "50\\%\\text{ of }\\$64 = \\;?",
      "32",
      "0.50 × 64 = 32.",
      ["$32", "32.00"]
    ),
    choice(
      "y8-fin-pct-i3",
      "A shirt costs $40. A student calculates 25% of the price as 25 × 40 = $1000. What is wrong?",
      "C",
      [
        "The shirt price should be doubled first",
        "25% should be added to $40",
        "25% must be converted to a decimal first: 0.25 × 40 = $10",
        "The percentage should be divided by 40",
      ],
      "Always convert the percentage to a decimal before multiplying: 25% = 0.25, so 0.25 × 40 = $10."
    ),
    answer(
      "y8-fin-pct-i4",
      "Find 15% of $200.",
      "15\\%\\text{ of }\\$200 = \\;?",
      "30",
      "0.15 × 200 = 30.",
      ["$30", "30.00"]
    ),
    answer(
      "y8-fin-pct-i5",
      "Find 5% of $80.",
      "5\\%\\text{ of }\\$80 = \\;?",
      "4",
      "0.05 × 80 = 4.",
      ["$4", "4.00"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Multiplying by the percentage directly: 20% of $50 = 20 × 50 = $1000.",
      fix: "Convert to a decimal first: 20% = 0.20, then 0.20 × 50 = $10.",
    },
    {
      mistake: "Dividing instead of multiplying: 20% of $50 = 50 ÷ 20 = $2.50.",
      fix: "Convert to a decimal and multiply: 0.20 × 50 = $10.",
    },
    {
      mistake: "Writing 5% as 0.5 instead of 0.05.",
      fix: "Move the decimal point two places left: 5 ÷ 100 = 0.05.",
    },
    {
      mistake: "Treating 100% as zero.",
      fix: "100% of an amount equals the whole amount: 100% of $80 = $80.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-fin-pct-m1",
      "Convert 60% to a decimal.",
      "60\\% = \\;?",
      "0.6",
      "60 ÷ 100 = 0.6.",
      ["0.60"]
    ),
    answer(
      "y8-fin-pct-m2",
      "Find 10% of $130.",
      "10\\%\\text{ of }\\$130 = \\;?",
      "13",
      "0.10 × 130 = 13.",
      ["$13"]
    ),
    choice(
      "y8-fin-pct-m3",
      "What is 50% of $94?",
      "B",
      ["$19", "$47", "$94", "$188"],
      "50% = 0.5; 0.5 × 94 = $47.",
      "50\\%\\text{ of }\\$94 = \\;?"
    ),
    answer(
      "y8-fin-pct-m4",
      "Find 25% of $120.",
      "25\\%\\text{ of }\\$120 = \\;?",
      "30",
      "0.25 × 120 = 30.",
      ["$30"]
    ),
    answer(
      "y8-fin-pct-m5",
      "Convert 3% to a decimal.",
      "3\\% = \\;?",
      "0.03",
      "3 ÷ 100 = 0.03."
    ),
    choice(
      "y8-fin-pct-m6",
      "A student says 10% of $85 equals $8.50. Is this correct?",
      "A",
      [
        "Yes, 0.1 × 85 = 8.50",
        "No, 10% of $85 = $85 ÷ 100 = $0.85",
        "No, 10% of $85 = $75",
        "No, 10% means subtracting 10 from the price",
      ],
      "0.1 × 85 = 8.50. The student is correct."
    ),
    answer(
      "y8-fin-pct-m7",
      "Find 20% of $45.",
      "20\\%\\text{ of }\\$45 = \\;?",
      "9",
      "0.20 × 45 = 9.",
      ["$9"]
    ),
    answer(
      "y8-fin-pct-m8",
      "Find 30% of $70.",
      "30\\%\\text{ of }\\$70 = \\;?",
      "21",
      "0.30 × 70 = 21.",
      ["$21"]
    ),
    choice(
      "y8-fin-pct-m9",
      "Which percentage–decimal conversion is correct?",
      "C",
      ["15% = 1.5", "7% = 0.7", "4% = 0.04", "12% = 1.2"],
      "4% = 4 ÷ 100 = 0.04. The others have the decimal point in the wrong place.",
      "\\text{Select the correct conversion.}"
    ),
    answer(
      "y8-fin-pct-m10",
      "Find 15% of $60.",
      "15\\%\\text{ of }\\$60 = \\;?",
      "9",
      "0.15 × 60 = 9.",
      ["$9"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: convert and simple key percentages ─────────────────
    poolAnswer("y8-fin-pct-p1", "Convert 40% to a decimal.", "40\\% = \\;?", "0.4", "40 ÷ 100 = 0.4.", 1, ["0.40", ".4"]),
    poolAnswer("y8-fin-pct-p2", "Convert 90% to a decimal.", "90\\% = \\;?", "0.9", "90 ÷ 100 = 0.9.", 1, ["0.90", ".9"]),
    poolAnswer("y8-fin-pct-p3", "Find 50% of \\(\\$48\\).", "50\\%\\text{ of }\\$48 = \\;?", "24", "0.50 × 48 = 24.", 1, ["$24", "24.00"]),
    poolAnswer("y8-fin-pct-p4", "Find 10% of \\(\\$70\\).", "10\\%\\text{ of }\\$70 = \\;?", "7", "0.10 × 70 = 7.", 1, ["$7"]),
    poolChoice("y8-fin-pct-p5", "Which decimal equals 25%?", "C", ["2.5", "0.025", "0.25", "25.0"], "25 ÷ 100 = 0.25.", 1, "\\text{Select the correct decimal.}"),
    // ── Difficulty 2: standard percentage of an amount ───────────────────
    poolAnswer("y8-fin-pct-p6", "Find 20% of \\(\\$85\\).", "20\\%\\text{ of }\\$85 = \\;?", "17", "0.20 × 85 = 17.", 2, ["$17"]),
    poolAnswer("y8-fin-pct-p7", "Find 25% of \\(\\$160\\).", "25\\%\\text{ of }\\$160 = \\;?", "40", "0.25 × 160 = 40.", 2, ["$40"]),
    poolAnswer("y8-fin-pct-p8", "Find 30% of \\(\\$90\\).", "30\\%\\text{ of }\\$90 = \\;?", "27", "0.30 × 90 = 27.", 2, ["$27"]),
    poolChoice("y8-fin-pct-p9", "What is 40% of \\(\\$55\\)?", "B", ["$20", "$22", "$24", "$27.50"], "0.40 × 55 = 22.", 2, "40\\%\\text{ of }\\$55 = \\;?"),
    poolAnswer("y8-fin-pct-p10", "Convert 12% to a decimal.", "12\\% = \\;?", "0.12", "12 ÷ 100 = 0.12.", 2, [".12"]),
    // ── Difficulty 3: build-up method and decimal answers ────────────────
    poolAnswer("y8-fin-pct-p11", "Find 15% of \\(\\$80\\).", "15\\%\\text{ of }\\$80 = \\;?", "12", "0.15 × 80 = 12.", 3, ["$12"]),
    poolAnswer("y8-fin-pct-p12", "Find 35% of \\(\\$140\\).", "35\\%\\text{ of }\\$140 = \\;?", "49", "0.35 × 140 = 49.", 3, ["$49"]),
    poolAnswer("y8-fin-pct-p13", "Find 5% of \\(\\$130\\).", "5\\%\\text{ of }\\$130 = \\;?", "6.5", "0.05 × 130 = 6.5.", 3, ["$6.50", "6.50"]),
    poolChoice("y8-fin-pct-p14", "A meal costs \\(\\$64\\). A 10% tip is added. How much is the tip?", "A", ["$6.40", "$7.40", "$64", "$640"], "0.10 × 64 = 6.40.", 3, "10\\%\\text{ of }\\$64 = \\;?"),
    poolAnswer("y8-fin-pct-p15", "Find 1% of \\(\\$350\\).", "1\\%\\text{ of }\\$350 = \\;?", "3.5", "0.01 × 350 = 3.5.", 3, ["$3.50", "3.50"]),
    // ── Difficulty 4: multi-step and reverse reasoning ───────────────────
    poolAnswer("y8-fin-pct-p16", "Find 17.5% of \\(\\$200\\).", "17.5\\%\\text{ of }\\$200 = \\;?", "35", "0.175 × 200 = 35.", 4, ["$35"]),
    poolAnswer("y8-fin-pct-p17", "Find 12% of \\(\\$250\\).", "12\\%\\text{ of }\\$250 = \\;?", "30", "0.12 × 250 = 30.", 4, ["$30"]),
    poolChoice("y8-fin-pct-p18", "10% of an amount is \\(\\$9\\). What is the full amount?", "C", ["$0.90", "$90", "$90 (since 100% = 10 × 10%)", "$900"], "If 10% = $9, then 100% = 10 × $9 = $90.", 4, "\\text{Find }100\\%\\text{ when }10\\% = \\$9."),
    poolAnswer("y8-fin-pct-p19", "25% of an amount is \\(\\$15\\). Find the full amount.", "100\\% = 4 \\times 15 = \\;?", "60", "25% is one quarter, so 100% = 4 × $15 = $60.", 4, ["$60"]),
    poolAnswer("y8-fin-pct-p20", "Find 8% of \\(\\$625\\).", "8\\%\\text{ of }\\$625 = \\;?", "50", "0.08 × 625 = 50.", 4, ["$50"]),
    // ── Difficulty 5: harder reverse / combined ──────────────────────────
    poolChoice("y8-fin-pct-p21", "5% of an amount is \\(\\$4\\). What is 100% of the amount?", "B", ["$20", "$80", "$8", "$400"], "If 5% = $4, then 1% = $0.80 and 100% = 100 × $0.80 = $80.", 5, "\\text{Find }100\\%\\text{ when }5\\% = \\$4."),
    poolAnswer("y8-fin-pct-p22", "Find 37.5% of \\(\\$96\\).", "37.5\\%\\text{ of }\\$96 = \\;?", "36", "0.375 × 96 = 36.", 5, ["$36"]),
    poolAnswer("y8-fin-pct-p23", "A book is \\(\\$45\\). Find 60% of its price, then state how much remains as a percentage.", "60\\%\\text{ of }\\$45 = \\;?", "27", "0.60 × 45 = $27; the remaining 40% is $18.", 5, ["$27"]),
    poolAnswer("y8-fin-pct-p24", "20% of an amount is \\(\\$13\\). Find the full amount.", "100\\% = 5 \\times 13 = \\;?", "65", "20% is one fifth, so 100% = 5 × $13 = $65.", 5, ["$65"]),
    poolAnswer("y8-fin-pct-p25", "Find 2.5% of \\(\\$480\\).", "2.5\\%\\text{ of }\\$480 = \\;?", "12", "0.025 × 480 = 12.", 5, ["$12"]),
    poolChoice("y8-fin-pct-p26", "Which is largest: 30% of \\(\\$50\\), 20% of \\(\\$80\\), or 10% of \\(\\$140\\)?", "B", ["30% of $50", "20% of $80", "10% of $140", "All are equal"], "30% of $50 = $15; 20% of $80 = $16; 10% of $140 = $14. The largest is 20% of $80.", 5, "\\text{Compare the three values.}"),
  ],
  multiPartPractice: [
    {
      id: "y8-fin-pct-mp1",
      prompt:
        "A jacket has a marked price of \\(\\$240\\). Use percentages of this price to answer each part.",
      latex: "\\text{Price} = \\$240",
      answer: "60",
      hint: "Convert each percentage to a decimal, then multiply by $240.",
      explanation:
        "Part (a): 0.25 × 240 = $60. Part (b): 0.10 × 240 = $24. Part (c): 0.05 × 240 = $12, so 15% = $24 + $12 = $36.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find 25% of \\(\\$240\\).",
          latex: "25\\%\\text{ of }\\$240",
          marks: 1,
          answer: "60",
          acceptedAnswers: ["$60"],
          hint: "0.25 × 240.",
          explanation: "0.25 × 240 = $60.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find 10% of \\(\\$240\\).",
          latex: "10\\%\\text{ of }\\$240",
          marks: 1,
          answer: "24",
          acceptedAnswers: ["$24"],
          hint: "0.10 × 240.",
          explanation: "0.10 × 240 = $24.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find 15% of \\(\\$240\\) by combining 10% and 5%.",
          latex: "15\\%\\text{ of }\\$240",
          marks: 2,
          answer: "36",
          acceptedAnswers: ["$36"],
          hint: "10% = $24 and 5% = $12; add them.",
          explanation: "10% = $24, 5% = $12, so 15% = $24 + $12 = $36.",
        },
      ],
    },
  ],
};

// ── Lesson 2: Percentage Increase ─────────────────────────────────────────────

const percentageIncrease: LessonContent = {
  description:
    "Increase an amount by a given percentage using the two-step method and the one-step multiplier method, with applications to prices and wages.",
  learningIntention:
    "Increase an amount by a percentage using the multiplier (1 + rate).",
  successCriteria: [
    "Calculate the increase amount and add it to the original.",
    "Use the multiplier (1 + decimal rate) to find the new amount in one step.",
    "Apply percentage increase to prices, wages and other quantities.",
    "Verify the new amount is larger than the original.",
  ],
  teaching: {
    paragraphs: [
      "A percentage increase means an amount grows by that percentage of its original value.",
      "Two-step method: find the increase, then add. For a 20% increase on $50, find 0.20 × $50 = $10, then $50 + $10 = $60.",
      "One-step multiplier method: new amount = original × (1 + decimal rate). A 20% increase uses the multiplier 1.20: $50 × 1.20 = $60.",
      "The multiplier is always greater than 1 for a percentage increase.",
    ],
    latexBlocks: [
      "\\text{Increase} = \\text{original} \\times \\text{decimal rate}",
      "\\text{New amount} = \\text{original} \\times (1 + \\text{decimal rate})",
      "20\\%\\text{ increase on }\\$50:\\quad 50 \\times 1.20 = \\$60",
    ],
  },
  workedExamples: [
    {
      title: "Two-step percentage increase",
      questionLatex: "\\text{Increase }\\$80\\text{ by }25\\%.",
      steps: [
        { explanation: "Find 25% of $80.", latex: "0.25 \\times 80 = 20" },
        { explanation: "Add the increase to the original.", latex: "80 + 20 = 100" },
      ],
      finalAnswerLatex: "\\$100",
    } as WorkedExample,
    {
      title: "Multiplier method on a price",
      questionLatex: "\\text{A phone costs }\\$320.\\text{ Its price increases by }15\\%.\\text{ Find the new price.}",
      steps: [
        { explanation: "Multiplier = 1 + 0.15 = 1.15.", latex: "1 + 0.15 = 1.15" },
        { explanation: "New price = 320 × 1.15.", latex: "320 \\times 1.15 = 368" },
      ],
      finalAnswerLatex: "\\$368",
    } as WorkedExample,
    {
      title: "Wage increase",
      questionLatex: "\\text{Ella earns }\\$18\\text{ per hour and receives a }10\\%\\text{ pay rise. Find her new hourly rate.}",
      steps: [
        { explanation: "Find the increase.", latex: "0.10 \\times 18 = 1.80" },
        { explanation: "Add to original rate.", latex: "18 + 1.80 = 19.80" },
      ],
      finalAnswerLatex: "\\$19.80\\text{ per hour}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-fin-inc-g1",
      "What is the multiplier for a 30% increase?",
      "B",
      ["0.70", "1.30", "0.30", "1.03"],
      "1 + 0.30 = 1.30.",
      "\\text{Multiplier for a }30\\%\\text{ increase}"
    ),
    answer(
      "y8-fin-inc-g2",
      "Increase $60 by 20%.",
      "\\$60 \\text{ increased by } 20\\% = \\;?",
      "72",
      "60 × 1.20 = 72.",
      ["$72"]
    ),
    answer(
      "y8-fin-inc-g3",
      "A jacket costs $120. Its price increases by 5%. Find the new price.",
      "\\$120 \\times 1.05 = \\;?",
      "126",
      "120 × 1.05 = 126.",
      ["$126"]
    ),
    answer(
      "y8-fin-inc-g4",
      "Increase $250 by 8%.",
      "\\$250 \\text{ increased by } 8\\% = \\;?",
      "270",
      "250 × 1.08 = 270.",
      ["$270"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-fin-inc-i1",
      "Increase $45 by 40%.",
      "\\$45 \\text{ increased by } 40\\% = \\;?",
      "63",
      "45 × 1.40 = 63.",
      ["$63"]
    ),
    choice(
      "y8-fin-inc-i2",
      "A meal costs $24. After a 25% price rise, what does it cost?",
      "C",
      ["$6", "$25", "$30", "$48"],
      "24 × 1.25 = $30.",
      "\\$24 \\times 1.25 = \\;?"
    ),
    answer(
      "y8-fin-inc-i3",
      "A train ticket costs $14. Prices rise by 10%. Find the new price.",
      "\\$14 \\times 1.10 = \\;?",
      "15.40",
      "14 × 1.10 = 15.40.",
      ["$15.40"]
    ),
    answer(
      "y8-fin-inc-i4",
      "A laptop costs $800. Its price increases by 15%. Find the new price.",
      "\\$800 \\times 1.15 = \\;?",
      "920",
      "800 × 1.15 = 920.",
      ["$920"]
    ),
    choice(
      "y8-fin-inc-i5",
      "Which multiplier gives a 35% increase?",
      "A",
      ["1.35", "0.35", "0.65", "1.065"],
      "1 + 0.35 = 1.35.",
      "\\text{Multiplier for a }35\\%\\text{ increase}"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding the rate number directly: 20% increase on $70 = $70 + $20 = $90.",
      fix: "Find 20% of $70 first: 0.20 × 70 = $14. Then $70 + $14 = $84.",
    },
    {
      mistake: "Using the decimal rate as the multiplier: multiplying by 0.20 for a 20% increase.",
      fix: "The multiplier for a percentage increase is 1 plus the decimal rate: 1 + 0.20 = 1.20.",
    },
    {
      mistake: "Applying the percentage to the increased value instead of the original.",
      fix: "Always apply the percentage to the original amount.",
    },
    {
      mistake: "Getting a result smaller than the original after an increase.",
      fix: "A percentage increase always gives a value greater than the starting amount. A multiplier above 1 confirms this.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-fin-inc-m1",
      "Increase $100 by 35%.",
      "\\$100 \\times 1.35 = \\;?",
      "135",
      "100 × 1.35 = 135.",
      ["$135"]
    ),
    answer(
      "y8-fin-inc-m2",
      "Increase $48 by 25%.",
      "\\$48 \\times 1.25 = \\;?",
      "60",
      "48 × 1.25 = 60.",
      ["$60"]
    ),
    choice(
      "y8-fin-inc-m3",
      "A pair of shoes costs $90 and is marked up by 20%. What is the new price?",
      "B",
      ["$18", "$108", "$110", "$72"],
      "90 × 1.20 = $108.",
      "\\$90 \\times 1.20 = \\;?"
    ),
    answer(
      "y8-fin-inc-m4",
      "Increase $200 by 12.5%.",
      "\\$200 \\times 1.125 = \\;?",
      "225",
      "200 × 1.125 = 225.",
      ["$225"]
    ),
    answer(
      "y8-fin-inc-m5",
      "An item costs $56 and its price increases by 50%. Find the new price.",
      "\\$56 \\times 1.50 = \\;?",
      "84",
      "56 × 1.50 = 84.",
      ["$84"]
    ),
    choice(
      "y8-fin-inc-m6",
      "Which correctly shows a 40% increase on $150?",
      "A",
      [
        "150 × 1.40 = $210",
        "150 × 0.40 = $60",
        "150 + 40 = $190",
        "150 ÷ 1.40 ≈ $107",
      ],
      "The multiplier for a 40% increase is 1.40. 150 × 1.40 = $210."
    ),
    answer(
      "y8-fin-inc-m7",
      "Mia earns $22 per hour and gets a 5% raise. Find her new hourly rate.",
      "\\$22 \\times 1.05 = \\;?",
      "23.10",
      "22 × 1.05 = 23.10.",
      ["$23.10"]
    ),
    answer(
      "y8-fin-inc-m8",
      "Increase $360 by 15%.",
      "\\$360 \\times 1.15 = \\;?",
      "414",
      "360 × 1.15 = 414.",
      ["$414"]
    ),
    choice(
      "y8-fin-inc-m9",
      "The original price of a TV is $600. After a 30% increase, what is the new price?",
      "C",
      ["$180", "$570", "$780", "$630"],
      "600 × 1.30 = $780.",
      "\\$600 \\times 1.30 = \\;?"
    ),
    answer(
      "y8-fin-inc-m10",
      "Increase $75 by 8%.",
      "\\$75 \\times 1.08 = \\;?",
      "81",
      "75 × 1.08 = 81.",
      ["$81"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: identify the multiplier ────────────────────────────
    poolChoice("y8-fin-inc-p1", "What is the multiplier for a 10% increase?", "A", ["1.10", "0.90", "0.10", "1.01"], "1 + 0.10 = 1.10.", 1, "\\text{Multiplier for a }10\\%\\text{ increase}"),
    poolChoice("y8-fin-inc-p2", "What is the multiplier for a 50% increase?", "B", ["0.50", "1.50", "1.05", "5.0"], "1 + 0.50 = 1.50.", 1, "\\text{Multiplier for a }50\\%\\text{ increase}"),
    poolAnswer("y8-fin-inc-p3", "Increase \\(\\$80\\) by 10%.", "\\$80 \\times 1.10 = \\;?", "88", "80 × 1.10 = 88.", 1, ["$88"]),
    poolAnswer("y8-fin-inc-p4", "Increase \\(\\$200\\) by 50%.", "\\$200 \\times 1.50 = \\;?", "300", "200 × 1.50 = 300.", 1, ["$300"]),
    poolChoice("y8-fin-inc-p5", "What is the multiplier for a 25% increase?", "C", ["0.75", "1.025", "1.25", "0.25"], "1 + 0.25 = 1.25.", 1, "\\text{Multiplier for a }25\\%\\text{ increase}"),
    // ── Difficulty 2: standard increase ──────────────────────────────────
    poolAnswer("y8-fin-inc-p6", "Increase \\(\\$50\\) by 20%.", "\\$50 \\times 1.20 = \\;?", "60", "50 × 1.20 = 60.", 2, ["$60"]),
    poolAnswer("y8-fin-inc-p7", "Increase \\(\\$120\\) by 25%.", "\\$120 \\times 1.25 = \\;?", "150", "120 × 1.25 = 150.", 2, ["$150"]),
    poolAnswer("y8-fin-inc-p8", "A ticket costs \\(\\$30\\) and rises by 10%. Find the new price.", "\\$30 \\times 1.10 = \\;?", "33", "30 × 1.10 = 33.", 2, ["$33"]),
    poolChoice("y8-fin-inc-p9", "A \\(\\$40\\) item rises by 5%. What is the new price?", "B", ["$45", "$42", "$44", "$2"], "40 × 1.05 = 42.", 2, "\\$40 \\times 1.05 = \\;?"),
    poolAnswer("y8-fin-inc-p10", "Increase \\(\\$60\\) by 30%.", "\\$60 \\times 1.30 = \\;?", "78", "60 × 1.30 = 78.", 2, ["$78"]),
    // ── Difficulty 3: decimal results and wages ──────────────────────────
    poolAnswer("y8-fin-inc-p11", "A wage of \\(\\$24\\) per hour rises by 5%. Find the new rate.", "\\$24 \\times 1.05 = \\;?", "25.20", "24 × 1.05 = 25.20.", 3, ["$25.20"]),
    poolAnswer("y8-fin-inc-p12", "Increase \\(\\$16\\) by 15%.", "\\$16 \\times 1.15 = \\;?", "18.40", "16 × 1.15 = 18.40.", 3, ["$18.40"]),
    poolAnswer("y8-fin-inc-p13", "Increase \\(\\$340\\) by 12%.", "\\$340 \\times 1.12 = \\;?", "380.80", "340 × 1.12 = 380.80.", 3, ["$380.80"]),
    poolChoice("y8-fin-inc-p14", "A rent of \\(\\$420\\) rises by 8%. What is the new rent?", "A", ["$453.60", "$33.60", "$386.40", "$428"], "420 × 1.08 = 453.60.", 3, "\\$420 \\times 1.08 = \\;?"),
    poolAnswer("y8-fin-inc-p15", "Increase \\(\\$95\\) by 40%.", "\\$95 \\times 1.40 = \\;?", "133", "95 × 1.40 = 133.", 3, ["$133"]),
    // ── Difficulty 4: larger / find-the-increase ─────────────────────────
    poolAnswer("y8-fin-inc-p16", "Increase \\(\\$1250\\) by 18%.", "\\$1250 \\times 1.18 = \\;?", "1475", "1250 × 1.18 = 1475.", 4, ["$1475"]),
    poolAnswer("y8-fin-inc-p17", "A salary of \\(\\$64000\\) rises by 3.5%. Find the new salary.", "\\$64000 \\times 1.035 = \\;?", "66240", "64000 × 1.035 = 66240.", 4, ["$66240", "66,240"]),
    poolChoice("y8-fin-inc-p18", "A price of \\(\\$80\\) becomes \\(\\$92\\). By what percentage did it increase?", "C", ["10%", "12%", "15%", "20%"], "Increase = $12; 12 ÷ 80 × 100 = 15%.", 4, "\\text{Percentage increase from }\\$80\\text{ to }\\$92"),
    poolAnswer("y8-fin-inc-p19", "Increase \\(\\$450\\) by 22%.", "\\$450 \\times 1.22 = \\;?", "549", "450 × 1.22 = 549.", 4, ["$549"]),
    poolAnswer("y8-fin-inc-p20", "Increase \\(\\$28\\) by 12.5%.", "\\$28 \\times 1.125 = \\;?", "31.50", "28 × 1.125 = 31.50.", 4, ["$31.50"]),
    // ── Difficulty 5: reverse and two-step ───────────────────────────────
    poolChoice("y8-fin-inc-p21", "After a 20% increase a price is \\(\\$90\\). What was the original price?", "B", ["$72", "$75", "$70", "$108"], "Original × 1.20 = 90, so original = 90 ÷ 1.20 = $75.", 5, "\\text{Original price if } \\$90 = \\text{original} \\times 1.20"),
    poolAnswer("y8-fin-inc-p22", "After a 10% increase a price is \\(\\$66\\). Find the original price.", "66 \\div 1.10 = \\;?", "60", "66 ÷ 1.10 = $60.", 5, ["$60"]),
    poolAnswer("y8-fin-inc-p23", "Increase \\(\\$500\\) by 6%, then increase the result by 6% again. Find the final amount.", "500 \\times 1.06 \\times 1.06 = \\;?", "561.80", "500 × 1.06 = 530; 530 × 1.06 = 561.80.", 5, ["$561.80"]),
    poolAnswer("y8-fin-inc-p24", "Increase \\(\\$144\\) by 37.5%.", "\\$144 \\times 1.375 = \\;?", "198", "144 × 1.375 = 198.", 5, ["$198"]),
    poolChoice("y8-fin-inc-p25", "A \\(\\$250\\) item rises by 15% one year and by 20% the next. What is the final price?", "A", ["$345", "$337.50", "$320", "$300"], "250 × 1.15 = 287.50; 287.50 × 1.20 = 345.", 5, "250 \\times 1.15 \\times 1.20 = \\;?"),
    poolAnswer("y8-fin-inc-p26", "After a 25% increase a price is \\(\\$150\\). Find the original price.", "150 \\div 1.25 = \\;?", "120", "150 ÷ 1.25 = $120.", 5, ["$120"]),
  ],
  multiPartPractice: [
    {
      id: "y8-fin-inc-mp1",
      prompt:
        "A bicycle is priced at \\(\\$400\\). The shop raises the price by 15%, then later raises the new price by a further 10%.",
      latex: "\\text{Original price} = \\$400",
      answer: "506",
      hint: "Use the multiplier (1 + rate) for each increase in turn.",
      explanation:
        "Part (a): 400 × 1.15 = $460. Part (b): 460 × 1.10 = $506. Part (c): the total increase is $506 − $400 = $106.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the price after the 15% increase.",
          latex: "\\$400 \\times 1.15",
          marks: 1,
          answer: "460",
          acceptedAnswers: ["$460"],
          hint: "Multiplier for a 15% increase is 1.15.",
          explanation: "400 × 1.15 = $460.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the price after the further 10% increase.",
          latex: "\\$460 \\times 1.10",
          marks: 2,
          answer: "506",
          acceptedAnswers: ["$506"],
          hint: "Apply the 10% increase to the new $460 price.",
          explanation: "460 × 1.10 = $506.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the total increase in price from the original \\(\\$400\\).",
          latex: "\\$506 - \\$400",
          marks: 1,
          answer: "106",
          acceptedAnswers: ["$106"],
          hint: "Subtract the original from the final price.",
          explanation: "$506 − $400 = $106.",
        },
      ],
    },
  ],
};

// ── Lesson 3: Percentage Decrease ─────────────────────────────────────────────

const percentageDecrease: LessonContent = {
  description:
    "Decrease an amount by a given percentage using the two-step method and the one-step multiplier method, with applications to price reductions and markdowns.",
  learningIntention:
    "Decrease an amount by a percentage using the multiplier (1 − rate).",
  successCriteria: [
    "Calculate the decrease amount and subtract it from the original.",
    "Use the multiplier (1 − decimal rate) to find the new amount in one step.",
    "Apply percentage decrease to prices, markdowns and reductions.",
    "Confirm the result is less than the original.",
  ],
  teaching: {
    paragraphs: [
      "A percentage decrease means an amount shrinks by that percentage of its original value.",
      "Two-step method: find the decrease, then subtract. For a 30% decrease on $80, find 0.30 × $80 = $24, then $80 − $24 = $56.",
      "One-step multiplier method: new amount = original × (1 − decimal rate). A 30% decrease uses the multiplier 0.70: $80 × 0.70 = $56.",
      "The multiplier is always between 0 and 1 for a percentage decrease.",
    ],
    latexBlocks: [
      "\\text{Decrease} = \\text{original} \\times \\text{decimal rate}",
      "\\text{New amount} = \\text{original} \\times (1 - \\text{decimal rate})",
      "30\\%\\text{ decrease on }\\$80:\\quad 80 \\times 0.70 = \\$56",
    ],
  },
  workedExamples: [
    {
      title: "Two-step percentage decrease",
      questionLatex: "\\text{Decrease }\\$120\\text{ by }25\\%.",
      steps: [
        { explanation: "Find 25% of $120.", latex: "0.25 \\times 120 = 30" },
        { explanation: "Subtract from the original.", latex: "120 - 30 = 90" },
      ],
      finalAnswerLatex: "\\$90",
    } as WorkedExample,
    {
      title: "Multiplier method on a price",
      questionLatex: "\\text{A coat costs }\\$200.\\text{ Its price falls by }40\\%.\\text{ Find the new price.}",
      steps: [
        { explanation: "Multiplier = 1 − 0.40 = 0.60.", latex: "1 - 0.40 = 0.60" },
        { explanation: "New price = 200 × 0.60.", latex: "200 \\times 0.60 = 120" },
      ],
      finalAnswerLatex: "\\$120",
    } as WorkedExample,
    {
      title: "Second-hand price reduction",
      questionLatex: "\\text{A second-hand phone was listed at }\\$480.\\text{ The seller drops the price by }15\\%.\\text{ Find the new price.}",
      steps: [
        { explanation: "Multiplier = 1 − 0.15 = 0.85.", latex: "1 - 0.15 = 0.85" },
        { explanation: "New price = 480 × 0.85.", latex: "480 \\times 0.85 = 408" },
      ],
      finalAnswerLatex: "\\$408",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-fin-dec-g1",
      "What is the multiplier for a 20% decrease?",
      "C",
      ["1.20", "0.20", "0.80", "1.80"],
      "1 − 0.20 = 0.80.",
      "\\text{Multiplier for a }20\\%\\text{ decrease}"
    ),
    answer(
      "y8-fin-dec-g2",
      "Decrease $90 by 10%.",
      "\\$90 \\times 0.90 = \\;?",
      "81",
      "90 × 0.90 = 81.",
      ["$81"]
    ),
    answer(
      "y8-fin-dec-g3",
      "A gaming console costs $500. Its price falls by 30%. Find the new price.",
      "\\$500 \\times 0.70 = \\;?",
      "350",
      "500 × 0.70 = 350.",
      ["$350"]
    ),
    answer(
      "y8-fin-dec-g4",
      "Decrease $240 by 25%.",
      "\\$240 \\times 0.75 = \\;?",
      "180",
      "240 × 0.75 = 180.",
      ["$180"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-fin-dec-i1",
      "Decrease $80 by 5%.",
      "\\$80 \\times 0.95 = \\;?",
      "76",
      "80 × 0.95 = 76.",
      ["$76"]
    ),
    choice(
      "y8-fin-dec-i2",
      "A bike was $340. After a 20% price drop, what does it cost?",
      "B",
      ["$320", "$272", "$68", "$408"],
      "340 × 0.80 = $272.",
      "\\$340 \\times 0.80 = \\;?"
    ),
    answer(
      "y8-fin-dec-i3",
      "A restaurant meal was $45. Decrease the price by 15%.",
      "\\$45 \\times 0.85 = \\;?",
      "38.25",
      "45 × 0.85 = 38.25.",
      ["$38.25"]
    ),
    answer(
      "y8-fin-dec-i4",
      "A TV costs $960. Its price falls by 35%. Find the new price.",
      "\\$960 \\times 0.65 = \\;?",
      "624",
      "960 × 0.65 = 624.",
      ["$624"]
    ),
    choice(
      "y8-fin-dec-i5",
      "Which multiplier gives a 45% decrease?",
      "D",
      ["1.45", "0.45", "1.55", "0.55"],
      "1 − 0.45 = 0.55.",
      "\\text{Multiplier for a }45\\%\\text{ decrease}"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Subtracting the rate number directly: 20% off $60 = $60 − $20 = $40.",
      fix: "Find 20% of $60 first: 0.20 × 60 = $12. Then $60 − $12 = $48.",
    },
    {
      mistake: "Using the decimal rate as the multiplier: multiplying by 0.20 for a 20% decrease.",
      fix: "The multiplier for a 20% decrease is 1 − 0.20 = 0.80.",
    },
    {
      mistake: "Getting a result larger than the original after a decrease.",
      fix: "A percentage decrease always gives a value smaller than the starting amount. The multiplier should be below 1.",
    },
    {
      mistake: "Applying the decrease to the already-reduced price instead of the original.",
      fix: "Always calculate the percentage of the original price, not the sale price.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-fin-dec-m1",
      "Decrease $200 by 20%.",
      "\\$200 \\times 0.80 = \\;?",
      "160",
      "200 × 0.80 = 160.",
      ["$160"]
    ),
    answer(
      "y8-fin-dec-m2",
      "Decrease $55 by 40%.",
      "\\$55 \\times 0.60 = \\;?",
      "33",
      "55 × 0.60 = 33.",
      ["$33"]
    ),
    choice(
      "y8-fin-dec-m3",
      "A shirt costs $60 and is marked down by 35%. What is the sale price?",
      "A",
      ["$39", "$21", "$60", "$81"],
      "60 × 0.65 = $39.",
      "\\$60 \\times 0.65 = \\;?"
    ),
    answer(
      "y8-fin-dec-m4",
      "Decrease $480 by 25%.",
      "\\$480 \\times 0.75 = \\;?",
      "360",
      "480 × 0.75 = 360.",
      ["$360"]
    ),
    answer(
      "y8-fin-dec-m5",
      "A flight originally costs $750. The price drops by 10%. Find the new fare.",
      "\\$750 \\times 0.90 = \\;?",
      "675",
      "750 × 0.90 = 675.",
      ["$675"]
    ),
    choice(
      "y8-fin-dec-m6",
      "Which correctly shows a 50% decrease on $90?",
      "B",
      [
        "90 × 1.50 = $135",
        "90 × 0.50 = $45",
        "90 − 50 = $40",
        "90 ÷ 0.50 = $180",
      ],
      "The multiplier for a 50% decrease is 0.50. 90 × 0.50 = $45."
    ),
    answer(
      "y8-fin-dec-m7",
      "Decrease $360 by 30%.",
      "\\$360 \\times 0.70 = \\;?",
      "252",
      "360 × 0.70 = 252.",
      ["$252"]
    ),
    answer(
      "y8-fin-dec-m8",
      "A textbook costs $44. Its price is reduced by 25%. Find the new price.",
      "\\$44 \\times 0.75 = \\;?",
      "33",
      "44 × 0.75 = 33.",
      ["$33"]
    ),
    choice(
      "y8-fin-dec-m9",
      "A car was priced at $12 000. After a 15% decrease, what is the new price?",
      "C",
      ["$1800", "$13 800", "$10 200", "$9600"],
      "12000 × 0.85 = $10 200.",
      "\\$12\\,000 \\times 0.85 = \\;?"
    ),
    answer(
      "y8-fin-dec-m10",
      "Decrease $18.50 by 20%.",
      "\\$18.50 \\times 0.80 = \\;?",
      "14.80",
      "18.50 × 0.80 = 14.80.",
      ["$14.80"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: identify the multiplier ────────────────────────────
    poolChoice("y8-fin-dec-p1", "What is the multiplier for a 10% decrease?", "A", ["0.90", "1.10", "0.10", "0.99"], "1 − 0.10 = 0.90.", 1, "\\text{Multiplier for a }10\\%\\text{ decrease}"),
    poolChoice("y8-fin-dec-p2", "What is the multiplier for a 50% decrease?", "C", ["1.50", "0.05", "0.50", "1.05"], "1 − 0.50 = 0.50.", 1, "\\text{Multiplier for a }50\\%\\text{ decrease}"),
    poolAnswer("y8-fin-dec-p3", "Decrease \\(\\$100\\) by 10%.", "\\$100 \\times 0.90 = \\;?", "90", "100 × 0.90 = 90.", 1, ["$90"]),
    poolAnswer("y8-fin-dec-p4", "Decrease \\(\\$80\\) by 50%.", "\\$80 \\times 0.50 = \\;?", "40", "80 × 0.50 = 40.", 1, ["$40"]),
    poolChoice("y8-fin-dec-p5", "What is the multiplier for a 25% decrease?", "B", ["1.25", "0.75", "0.25", "1.075"], "1 − 0.25 = 0.75.", 1, "\\text{Multiplier for a }25\\%\\text{ decrease}"),
    // ── Difficulty 2: standard decrease ──────────────────────────────────
    poolAnswer("y8-fin-dec-p6", "Decrease \\(\\$60\\) by 20%.", "\\$60 \\times 0.80 = \\;?", "48", "60 × 0.80 = 48.", 2, ["$48"]),
    poolAnswer("y8-fin-dec-p7", "Decrease \\(\\$150\\) by 30%.", "\\$150 \\times 0.70 = \\;?", "105", "150 × 0.70 = 105.", 2, ["$105"]),
    poolAnswer("y8-fin-dec-p8", "A \\(\\$200\\) coat falls by 25%. Find the new price.", "\\$200 \\times 0.75 = \\;?", "150", "200 × 0.75 = 150.", 2, ["$150"]),
    poolChoice("y8-fin-dec-p9", "A \\(\\$50\\) item falls by 40%. What is the new price?", "C", ["$10", "$20", "$30", "$45"], "50 × 0.60 = 30.", 2, "\\$50 \\times 0.60 = \\;?"),
    poolAnswer("y8-fin-dec-p10", "Decrease \\(\\$90\\) by 10%.", "\\$90 \\times 0.90 = \\;?", "81", "90 × 0.90 = 81.", 2, ["$81"]),
    // ── Difficulty 3: decimal results ────────────────────────────────────
    poolAnswer("y8-fin-dec-p11", "Decrease \\(\\$45\\) by 15%.", "\\$45 \\times 0.85 = \\;?", "38.25", "45 × 0.85 = 38.25.", 3, ["$38.25"]),
    poolAnswer("y8-fin-dec-p12", "A \\(\\$24\\) meal is reduced by 5%. Find the new price.", "\\$24 \\times 0.95 = \\;?", "22.80", "24 × 0.95 = 22.80.", 3, ["$22.80"]),
    poolAnswer("y8-fin-dec-p13", "Decrease \\(\\$320\\) by 35%.", "\\$320 \\times 0.65 = \\;?", "208", "320 × 0.65 = 208.", 3, ["$208"]),
    poolChoice("y8-fin-dec-p14", "A \\(\\$140\\) jacket is reduced by 12%. What is the new price?", "A", ["$123.20", "$16.80", "$128", "$117.60"], "140 × 0.88 = 123.20.", 3, "\\$140 \\times 0.88 = \\;?"),
    poolAnswer("y8-fin-dec-p15", "Decrease \\(\\$72\\) by 25%.", "\\$72 \\times 0.75 = \\;?", "54", "72 × 0.75 = 54.", 3, ["$54"]),
    // ── Difficulty 4: larger / find-the-decrease ─────────────────────────
    poolAnswer("y8-fin-dec-p16", "Decrease \\(\\$1500\\) by 18%.", "\\$1500 \\times 0.82 = \\;?", "1230", "1500 × 0.82 = 1230.", 4, ["$1230"]),
    poolChoice("y8-fin-dec-p17", "A price falls from \\(\\$80\\) to \\(\\$60\\). By what percentage did it fall?", "B", ["20%", "25%", "30%", "33%"], "Decrease = $20; 20 ÷ 80 × 100 = 25%.", 4, "\\text{Percentage decrease from }\\$80\\text{ to }\\$60"),
    poolAnswer("y8-fin-dec-p18", "Decrease \\(\\$640\\) by 22%.", "\\$640 \\times 0.78 = \\;?", "499.20", "640 × 0.78 = 499.20.", 4, ["$499.20"]),
    poolAnswer("y8-fin-dec-p19", "A \\(\\$2400\\) item is reduced by 12.5%. Find the new price.", "\\$2400 \\times 0.875 = \\;?", "2100", "2400 × 0.875 = 2100.", 4, ["$2100"]),
    poolAnswer("y8-fin-dec-p20", "Decrease \\(\\$36\\) by 17.5%.", "\\$36 \\times 0.825 = \\;?", "29.70", "36 × 0.825 = 29.70.", 4, ["$29.70"]),
    // ── Difficulty 5: reverse and two-step ───────────────────────────────
    poolChoice("y8-fin-dec-p21", "After a 20% decrease a price is \\(\\$64\\). What was the original price?", "A", ["$80", "$76.80", "$84", "$51.20"], "Original × 0.80 = 64, so original = 64 ÷ 0.80 = $80.", 5, "\\text{Original price if } \\$64 = \\text{original} \\times 0.80"),
    poolAnswer("y8-fin-dec-p22", "After a 25% decrease a price is \\(\\$90\\). Find the original price.", "90 \\div 0.75 = \\;?", "120", "90 ÷ 0.75 = $120.", 5, ["$120"]),
    poolAnswer("y8-fin-dec-p23", "Decrease \\(\\$500\\) by 10%, then decrease the result by 10% again. Find the final amount.", "500 \\times 0.90 \\times 0.90 = \\;?", "405", "500 × 0.90 = 450; 450 × 0.90 = 405.", 5, ["$405"]),
    poolAnswer("y8-fin-dec-p24", "Decrease \\(\\$160\\) by 37.5%.", "\\$160 \\times 0.625 = \\;?", "100", "160 × 0.625 = 100.", 5, ["$100"]),
    poolChoice("y8-fin-dec-p25", "A \\(\\$300\\) item is reduced by 20%, then by a further 15% off the new price. Final price?", "C", ["$195", "$210", "$204", "$201"], "300 × 0.80 = 240; 240 × 0.85 = 204.", 5, "300 \\times 0.80 \\times 0.85 = \\;?"),
    poolAnswer("y8-fin-dec-p26", "After a 40% decrease a price is \\(\\$54\\). Find the original price.", "54 \\div 0.60 = \\;?", "90", "54 ÷ 0.60 = $90.", 5, ["$90"]),
  ],
  multiPartPractice: [
    {
      id: "y8-fin-dec-mp1",
      prompt:
        "A television is priced at \\(\\$800\\). In a sale the price is cut by 25%, then on the final day a further 20% is taken off the sale price.",
      latex: "\\text{Original price} = \\$800",
      answer: "480",
      hint: "Use the multiplier (1 − rate) for each reduction in turn.",
      explanation:
        "Part (a): 800 × 0.75 = $600. Part (b): 600 × 0.80 = $480. Part (c): total saving = $800 − $480 = $320.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the price after the 25% reduction.",
          latex: "\\$800 \\times 0.75",
          marks: 1,
          answer: "600",
          acceptedAnswers: ["$600"],
          hint: "Multiplier for a 25% decrease is 0.75.",
          explanation: "800 × 0.75 = $600.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the price after the further 20% reduction.",
          latex: "\\$600 \\times 0.80",
          marks: 2,
          answer: "480",
          acceptedAnswers: ["$480"],
          hint: "Apply the 20% reduction to the $600 sale price.",
          explanation: "600 × 0.80 = $480.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the total saving compared with the original \\(\\$800\\).",
          latex: "\\$800 - \\$480",
          marks: 1,
          answer: "320",
          acceptedAnswers: ["$320"],
          hint: "Subtract the final price from the original.",
          explanation: "$800 − $480 = $320.",
        },
      ],
    },
  ],
};

// ── Lesson 4: Profit and Loss ─────────────────────────────────────────────────

const profitAndLoss: LessonContent = {
  description:
    "Calculate profit and loss as dollar amounts and as a percentage of the cost price in realistic buying-and-selling contexts.",
  learningIntention:
    "Calculate profit, loss and profit or loss percentage from cost price and selling price.",
  successCriteria: [
    "Identify the cost price and selling price in a problem.",
    "Calculate profit as selling price minus cost price.",
    "Calculate loss as cost price minus selling price.",
    "Express profit or loss as a percentage of the cost price.",
  ],
  teaching: {
    paragraphs: [
      "The cost price is what you pay to buy or make something. The selling price is what you receive when you sell it. If the selling price is greater than the cost price, there is a profit. If it is less, there is a loss.",
      "Profit = selling price − cost price. Loss = cost price − selling price.",
      "To express profit or loss as a percentage, divide by the cost price and multiply by 100.",
      "Percentage profit and loss are always calculated on the cost price, not the selling price.",
    ],
    latexBlocks: [
      "\\text{Profit} = \\text{selling price} - \\text{cost price}",
      "\\text{Loss} = \\text{cost price} - \\text{selling price}",
      "\\text{Profit}\\% = \\frac{\\text{profit}}{\\text{cost price}} \\times 100",
    ],
  },
  workedExamples: [
    {
      title: "Calculate a profit",
      questionLatex: "\\text{A phone was bought for }\\$280\\text{ and sold for }\\$350.\\text{ Find the profit.}",
      steps: [
        { explanation: "Selling price is greater than cost price, so there is a profit.", latex: "\\text{Profit} = 350 - 280 = 70" },
      ],
      finalAnswerLatex: "\\$70\\text{ profit}",
    } as WorkedExample,
    {
      title: "Calculate a loss",
      questionLatex: "\\text{A bike was bought for }\\$400\\text{ and sold for }\\$340.\\text{ Find the loss.}",
      steps: [
        { explanation: "Selling price is less than cost price, so there is a loss.", latex: "\\text{Loss} = 400 - 340 = 60" },
      ],
      finalAnswerLatex: "\\$60\\text{ loss}",
    } as WorkedExample,
    {
      title: "Express profit as a percentage",
      questionLatex: "\\text{A handbag cost }\\$50\\text{ and was sold for }\\$65.\\text{ Find the profit percentage.}",
      steps: [
        { explanation: "Find the profit first.", latex: "\\text{Profit} = 65 - 50 = 15" },
        { explanation: "Express as a percentage of the cost price.", latex: "\\frac{15}{50} \\times 100 = 30\\%" },
      ],
      finalAnswerLatex: "30\\%\\text{ profit}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-fin-pnl-g1",
      "A jacket cost $80 and was sold for $95. Is this a profit or a loss?",
      "A",
      ["Profit of $15", "Loss of $15", "Profit of $95", "No profit or loss"],
      "$95 − $80 = $15 profit.",
      "\\text{Selling price }\\$95,\\text{ cost price }\\$80."
    ),
    answer(
      "y8-fin-pnl-g2",
      "A book cost $12 and sold for $18. Find the profit.",
      "\\text{Profit} = 18 - 12 = \\;?",
      "6",
      "$18 − $12 = $6 profit.",
      ["$6"]
    ),
    answer(
      "y8-fin-pnl-g3",
      "A laptop cost $600 and sold for $520. Find the loss.",
      "\\text{Loss} = 600 - 520 = \\;?",
      "80",
      "$600 − $520 = $80 loss.",
      ["$80"]
    ),
    answer(
      "y8-fin-pnl-g4",
      "An item cost $40 and sold for $50. Find the profit percentage.",
      "\\frac{10}{40} \\times 100 = \\;?",
      "25",
      "Profit = $10. (10 ÷ 40) × 100 = 25%.",
      ["25%"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-fin-pnl-i1",
      "A skateboard cost $85 and sold for $110. Find the profit.",
      "\\text{Profit} = 110 - 85 = \\;?",
      "25",
      "$110 − $85 = $25 profit.",
      ["$25"]
    ),
    choice(
      "y8-fin-pnl-i2",
      "A camera cost $240 and sold for $200. Which statement is correct?",
      "B",
      ["$40 profit", "$40 loss", "$200 profit", "No profit or loss"],
      "Selling price < cost price: $240 − $200 = $40 loss.",
      "\\text{Cost: }\\$240,\\text{ sold: }\\$200."
    ),
    answer(
      "y8-fin-pnl-i3",
      "A jacket cost $120 and sold for $90. Find the loss.",
      "\\text{Loss} = 120 - 90 = \\;?",
      "30",
      "$120 − $90 = $30 loss.",
      ["$30"]
    ),
    answer(
      "y8-fin-pnl-i4",
      "A car was bought for $5000 and sold for $6500. Find the profit percentage.",
      "\\frac{1500}{5000} \\times 100 = \\;?",
      "30",
      "Profit = $1500. (1500 ÷ 5000) × 100 = 30%.",
      ["30%"]
    ),
    choice(
      "y8-fin-pnl-i5",
      "Profit percentage is always calculated on which value?",
      "C",
      [
        "Selling price",
        "Average of cost price and selling price",
        "Cost price",
        "The profit amount itself",
      ],
      "Profit % = (profit ÷ cost price) × 100. It is always based on the cost price."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Subtracting in the wrong order when selling price is higher: cost − selling instead of selling − cost.",
      fix: "When selling price > cost price, profit = selling price − cost price.",
    },
    {
      mistake: "Calculating profit percentage on the selling price instead of the cost price.",
      fix: "Profit % = (profit ÷ cost price) × 100. Always divide by what it cost you.",
    },
    {
      mistake: "Treating the selling price itself as the profit.",
      fix: "Profit is the difference: selling price minus cost price, not the selling price alone.",
    },
    {
      mistake: "Using selling price − cost price when cost > selling (getting a negative profit).",
      fix: "When cost price > selling price, label it a loss: loss = cost price − selling price.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-fin-pnl-m1",
      "A watch cost $85 and sold for $110. Find the profit.",
      "\\text{Profit} = 110 - 85 = \\;?",
      "25",
      "$110 − $85 = $25 profit.",
      ["$25"]
    ),
    answer(
      "y8-fin-pnl-m2",
      "A scooter cost $320 and sold for $275. Find the loss.",
      "\\text{Loss} = 320 - 275 = \\;?",
      "45",
      "$320 − $275 = $45 loss.",
      ["$45"]
    ),
    choice(
      "y8-fin-pnl-m3",
      "An item cost $200 and sold for $260. What is the profit percentage?",
      "B",
      ["10%", "30%", "60%", "130%"],
      "Profit = $60. (60 ÷ 200) × 100 = 30%.",
      "\\frac{60}{200} \\times 100 = \\;?"
    ),
    answer(
      "y8-fin-pnl-m4",
      "A bag cost $25 and sold for $40. Find the profit percentage.",
      "\\frac{15}{25} \\times 100 = \\;?",
      "60",
      "Profit = $15. (15 ÷ 25) × 100 = 60%.",
      ["60%"]
    ),
    answer(
      "y8-fin-pnl-m5",
      "Shoes cost $90 and sold for $63. Find the loss.",
      "\\text{Loss} = 90 - 63 = \\;?",
      "27",
      "$90 − $63 = $27 loss.",
      ["$27"]
    ),
    choice(
      "y8-fin-pnl-m6",
      "A surfboard cost $500 and sold for $425. What is the result?",
      "D",
      ["Profit of $75", "Profit of $425", "Loss of $425", "Loss of $75"],
      "Cost price > selling price: $500 − $425 = $75 loss.",
      "\\text{Cost: }\\$500,\\text{ sold: }\\$425."
    ),
    answer(
      "y8-fin-pnl-m7",
      "A guitar cost $180 and sold for $216. Find the profit percentage.",
      "\\frac{36}{180} \\times 100 = \\;?",
      "20",
      "Profit = $36. (36 ÷ 180) × 100 = 20%.",
      ["20%"]
    ),
    answer(
      "y8-fin-pnl-m8",
      "A game cost $60 and sold for $45. Find the loss.",
      "\\text{Loss} = 60 - 45 = \\;?",
      "15",
      "$60 − $45 = $15 loss.",
      ["$15"]
    ),
    choice(
      "y8-fin-pnl-m9",
      "A phone cost $400 and sold for $480. Which calculation gives the profit percentage?",
      "A",
      [
        "(80 ÷ 400) × 100",
        "(80 ÷ 480) × 100",
        "(400 ÷ 480) × 100",
        "(480 ÷ 400) × 100",
      ],
      "Profit = $80. Profit % = (profit ÷ cost price) × 100 = (80 ÷ 400) × 100 = 20%."
    ),
    answer(
      "y8-fin-pnl-m10",
      "A property cost $500 000 and sold for $575 000. Find the profit percentage.",
      "\\frac{75000}{500000} \\times 100 = \\;?",
      "15",
      "Profit = $75 000. (75 000 ÷ 500 000) × 100 = 15%.",
      ["15%"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: identify profit or loss; simple difference ─────────
    poolChoice("y8-fin-pnl-p1", "An item cost \\(\\$50\\) and sold for \\(\\$70\\). Is this a profit or a loss?", "A", ["Profit of $20", "Loss of $20", "Profit of $70", "No change"], "$70 − $50 = $20 profit.", 1, "\\text{Cost }\\$50,\\text{ sold }\\$70."),
    poolAnswer("y8-fin-pnl-p2", "A toy cost \\(\\$15\\) and sold for \\(\\$25\\). Find the profit.", "25 - 15 = \\;?", "10", "$25 − $15 = $10 profit.", 1, ["$10"]),
    poolAnswer("y8-fin-pnl-p3", "A phone cost \\(\\$300\\) and sold for \\(\\$250\\). Find the loss.", "300 - 250 = \\;?", "50", "$300 − $250 = $50 loss.", 1, ["$50"]),
    poolChoice("y8-fin-pnl-p4", "An item cost \\(\\$80\\) and sold for \\(\\$60\\). What is the result?", "B", ["Profit of $20", "Loss of $20", "Loss of $60", "Profit of $60"], "$80 − $60 = $20 loss.", 1, "\\text{Cost }\\$80,\\text{ sold }\\$60."),
    poolAnswer("y8-fin-pnl-p5", "A bag cost \\(\\$40\\) and sold for \\(\\$55\\). Find the profit.", "55 - 40 = \\;?", "15", "$55 − $40 = $15 profit.", 1, ["$15"]),
    // ── Difficulty 2: larger differences ─────────────────────────────────
    poolAnswer("y8-fin-pnl-p6", "A bike cost \\(\\$180\\) and sold for \\(\\$230\\). Find the profit.", "230 - 180 = \\;?", "50", "$230 − $180 = $50 profit.", 2, ["$50"]),
    poolAnswer("y8-fin-pnl-p7", "A laptop cost \\(\\$750\\) and sold for \\(\\$680\\). Find the loss.", "750 - 680 = \\;?", "70", "$750 − $680 = $70 loss.", 2, ["$70"]),
    poolAnswer("y8-fin-pnl-p8", "A desk cost \\(\\$120\\) and sold for \\(\\$165\\). Find the profit.", "165 - 120 = \\;?", "45", "$165 − $120 = $45 profit.", 2, ["$45"]),
    poolChoice("y8-fin-pnl-p9", "A camera cost \\(\\$400\\) and sold for \\(\\$340\\). What is the loss?", "C", ["$40", "$50", "$60", "$70"], "$400 − $340 = $60 loss.", 2, "400 - 340 = \\;?"),
    poolAnswer("y8-fin-pnl-p10", "A guitar cost \\(\\$260\\) and sold for \\(\\$325\\). Find the profit.", "325 - 260 = \\;?", "65", "$325 − $260 = $65 profit.", 2, ["$65"]),
    // ── Difficulty 3: profit/loss percentage ─────────────────────────────
    poolAnswer("y8-fin-pnl-p11", "An item cost \\(\\$50\\) and sold for \\(\\$60\\). Find the profit percentage.", "\\frac{10}{50} \\times 100 = \\;?", "20", "Profit = $10; (10 ÷ 50) × 100 = 20%.", 3, ["20%"]),
    poolAnswer("y8-fin-pnl-p12", "An item cost \\(\\$80\\) and sold for \\(\\$100\\). Find the profit percentage.", "\\frac{20}{80} \\times 100 = \\;?", "25", "Profit = $20; (20 ÷ 80) × 100 = 25%.", 3, ["25%"]),
    poolAnswer("y8-fin-pnl-p13", "An item cost \\(\\$200\\) and sold for \\(\\$170\\). Find the loss percentage.", "\\frac{30}{200} \\times 100 = \\;?", "15", "Loss = $30; (30 ÷ 200) × 100 = 15%.", 3, ["15%"]),
    poolChoice("y8-fin-pnl-p14", "An item cost \\(\\$25\\) and sold for \\(\\$30\\). What is the profit percentage?", "A", ["20%", "25%", "16.7%", "5%"], "Profit = $5; (5 ÷ 25) × 100 = 20%.", 3, "\\frac{5}{25} \\times 100 = \\;?"),
    poolAnswer("y8-fin-pnl-p15", "An item cost \\(\\$150\\) and sold for \\(\\$180\\). Find the profit percentage.", "\\frac{30}{150} \\times 100 = \\;?", "20", "Profit = $30; (30 ÷ 150) × 100 = 20%.", 3, ["20%"]),
    // ── Difficulty 4: harder percentages / find selling price ────────────
    poolAnswer("y8-fin-pnl-p16", "An item cost \\(\\$120\\) and sold for \\(\\$150\\). Find the profit percentage.", "\\frac{30}{120} \\times 100 = \\;?", "25", "Profit = $30; (30 ÷ 120) × 100 = 25%.", 4, ["25%"]),
    poolAnswer("y8-fin-pnl-p17", "An item cost \\(\\$60\\) is sold at a 30% profit. Find the selling price.", "60 \\times 1.30 = \\;?", "78", "Selling price = 60 × 1.30 = $78.", 4, ["$78"]),
    poolChoice("y8-fin-pnl-p18", "An item cost \\(\\$90\\) and is sold at a 20% loss. What is the selling price?", "B", ["$108", "$72", "$70", "$18"], "Selling price = 90 × 0.80 = $72.", 4, "90 \\times 0.80 = \\;?"),
    poolAnswer("y8-fin-pnl-p19", "An item cost \\(\\$240\\) and sold for \\(\\$300\\). Find the profit percentage.", "\\frac{60}{240} \\times 100 = \\;?", "25", "Profit = $60; (60 ÷ 240) × 100 = 25%.", 4, ["25%"]),
    poolAnswer("y8-fin-pnl-p20", "An item cost \\(\\$500\\) is sold at a 12% profit. Find the selling price.", "500 \\times 1.12 = \\;?", "560", "Selling price = 500 × 1.12 = $560.", 4, ["$560"]),
    // ── Difficulty 5: reverse / multi-step ───────────────────────────────
    poolChoice("y8-fin-pnl-p21", "An item sold for \\(\\$120\\) at a 20% profit. What was the cost price?", "A", ["$100", "$96", "$144", "$140"], "Cost × 1.20 = 120, so cost = 120 ÷ 1.20 = $100.", 5, "\\text{Cost if }\\$120 = \\text{cost} \\times 1.20"),
    poolAnswer("y8-fin-pnl-p22", "An item sold for \\(\\$84\\) at a 40% profit. Find the cost price.", "84 \\div 1.40 = \\;?", "60", "Cost = 84 ÷ 1.40 = $60.", 5, ["$60"]),
    poolAnswer("y8-fin-pnl-p23", "An item sold for \\(\\$153\\) at a 15% loss. Find the cost price.", "153 \\div 0.85 = \\;?", "180", "Cost = 153 ÷ 0.85 = $180.", 5, ["$180"]),
    poolAnswer("y8-fin-pnl-p24", "A trader buys 10 items at \\(\\$8\\) each and sells them all for \\(\\$110\\) total. Find the total profit.", "110 - 10 \\times 8 = \\;?", "30", "Cost = 10 × $8 = $80; profit = $110 − $80 = $30.", 5, ["$30"]),
    poolAnswer("y8-fin-pnl-p25", "An item cost \\(\\$45\\) and sold for \\(\\$54\\). Find the profit percentage.", "\\frac{9}{45} \\times 100 = \\;?", "20", "Profit = $9; (9 ÷ 45) × 100 = 20%.", 5, ["20%"]),
    poolChoice("y8-fin-pnl-p26", "An item sold for \\(\\$240\\) at a 25% profit. What was the cost price?", "C", ["$180", "$200", "$192", "$300"], "Cost × 1.25 = 240, so cost = 240 ÷ 1.25 = $192.", 5, "240 \\div 1.25 = \\;?"),
  ],
  multiPartPractice: [
    {
      id: "y8-fin-pnl-mp1",
      prompt:
        "A store buys a watch for \\(\\$80\\) (the cost price) and sells it for \\(\\$100\\) (the selling price).",
      latex: "\\text{Cost} = \\$80,\\quad \\text{Selling price} = \\$100",
      answer: "25",
      hint: "Profit = selling price − cost price. Profit % is based on the cost price.",
      explanation:
        "Part (a): profit = $100 − $80 = $20. Part (b): profit % = (20 ÷ 80) × 100 = 25%. Part (c): a 50% profit would give selling price = 80 × 1.50 = $120.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the profit in dollars.",
          latex: "100 - 80",
          marks: 1,
          answer: "20",
          acceptedAnswers: ["$20"],
          hint: "Selling price minus cost price.",
          explanation: "$100 − $80 = $20.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the profit as a percentage of the cost price.",
          latex: "\\frac{20}{80} \\times 100",
          marks: 2,
          answer: "25",
          acceptedAnswers: ["25%"],
          hint: "Divide the profit by the cost price, then × 100.",
          explanation: "(20 ÷ 80) × 100 = 25%.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What selling price would give a 50% profit on the cost price?",
          latex: "80 \\times 1.50",
          marks: 1,
          answer: "120",
          acceptedAnswers: ["$120"],
          hint: "A 50% profit means multiplying the cost price by 1.50.",
          explanation: "80 × 1.50 = $120.",
        },
      ],
    },
  ],
};

// ── Lesson 5: Discounts and Sales ─────────────────────────────────────────────

const discountsAndSales: LessonContent = {
  description:
    "Calculate sale prices from percentage discounts and dollar-off discounts, and compare savings in realistic Australian retail contexts.",
  learningIntention:
    "Find the sale price and the saving when a discount is applied to a price.",
  successCriteria: [
    "Calculate a dollar discount from a percentage discount and subtract from the original price.",
    "Use the multiplier method to find the sale price directly.",
    "Find the saving from a dollar-off discount.",
    "Compare two discount offers to identify the better deal.",
  ],
  teaching: {
    paragraphs: [
      "A discount reduces the price of an item. It can be expressed as a dollar amount (e.g., $15 off) or as a percentage of the original price (e.g., 20% off).",
      "To find the sale price after a percentage discount, multiply the original price by (1 − discount rate). For example, 20% off $75: sale price = $75 × 0.80 = $60.",
      "The saving is the difference between the original price and the sale price.",
      "To compare two discount offers, convert each to a dollar saving and compare directly.",
    ],
    latexBlocks: [
      "\\text{Sale price} = \\text{original price} \\times (1 - \\text{discount rate})",
      "20\\%\\text{ off }\\$75:\\quad 75 \\times 0.80 = \\$60",
      "\\text{Saving} = \\text{original price} - \\text{sale price}",
    ],
  },
  workedExamples: [
    {
      title: "Percentage discount on clothing",
      questionLatex: "\\text{A hoodie normally costs }\\$85.\\text{ It is 30\\% off. Find the sale price.}",
      steps: [
        { explanation: "Multiplier = 1 − 0.30 = 0.70.", latex: "1 - 0.30 = 0.70" },
        { explanation: "Sale price = $85 × 0.70.", latex: "85 \\times 0.70 = 59.50" },
      ],
      finalAnswerLatex: "\\$59.50",
    } as WorkedExample,
    {
      title: "Dollar-off coupon",
      questionLatex: "\\text{A pair of jeans costs }\\$120.\\text{ A }\\$25\\text{ off coupon is applied. Find the sale price.}",
      steps: [
        { explanation: "Subtract the coupon value from the original price.", latex: "120 - 25 = 95" },
      ],
      finalAnswerLatex: "\\$95",
    } as WorkedExample,
    {
      title: "Compare two discount offers",
      questionLatex: "\\text{A }\\$160\\text{ jacket has two offers: }25\\%\\text{ off or }\\$35\\text{ off. Which saves more?}",
      steps: [
        { explanation: "Saving from 25% off.", latex: "0.25 \\times 160 = \\$40" },
        { explanation: "Saving from $35 off.", latex: "\\$35" },
        { explanation: "Compare the two savings.", latex: "\\$40 > \\$35 \\Rightarrow 25\\%\\text{ off is better}" },
      ],
      finalAnswerLatex: "25\\%\\text{ off (saves }\\$40\\text{ vs }\\$35\\text{)}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-fin-dis-g1",
      "A $50 item is 20% off. What multiplier is used to find the sale price?",
      "B",
      ["1.20", "0.80", "0.20", "0.50"],
      "1 − 0.20 = 0.80.",
      "\\text{Multiplier for }20\\%\\text{ off}"
    ),
    answer(
      "y8-fin-dis-g2",
      "A $40 shirt is 25% off. Find the sale price.",
      "\\$40 \\times 0.75 = \\;?",
      "30",
      "40 × 0.75 = 30.",
      ["$30"]
    ),
    answer(
      "y8-fin-dis-g3",
      "A $90 toy has $15 off. Find the sale price.",
      "90 - 15 = \\;?",
      "75",
      "$90 − $15 = $75.",
      ["$75"]
    ),
    answer(
      "y8-fin-dis-g4",
      "A $200 bike is 30% off. Find the sale price.",
      "\\$200 \\times 0.70 = \\;?",
      "140",
      "200 × 0.70 = 140.",
      ["$140"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-fin-dis-i1",
      "A $60 game is 20% off. Find the sale price.",
      "\\$60 \\times 0.80 = \\;?",
      "48",
      "60 × 0.80 = 48.",
      ["$48"]
    ),
    choice(
      "y8-fin-dis-i2",
      "A $120 dress is 35% off. What is the sale price?",
      "C",
      ["$35", "$42", "$78", "$85"],
      "120 × 0.65 = $78.",
      "\\$120 \\times 0.65 = \\;?"
    ),
    answer(
      "y8-fin-dis-i3",
      "A $250 item has $40 off. Find the sale price.",
      "250 - 40 = \\;?",
      "210",
      "$250 − $40 = $210.",
      ["$210"]
    ),
    answer(
      "y8-fin-dis-i4",
      "A $180 jacket is 15% off. Find the saving.",
      "0.15 \\times 180 = \\;?",
      "27",
      "0.15 × 180 = 27.",
      ["$27"]
    ),
    choice(
      "y8-fin-dis-i5",
      "A $300 item offers either 20% off or $50 off. Which saves more?",
      "A",
      [
        "20% off saves $60 — it is better",
        "$50 off saves more",
        "Both save the same amount",
        "Cannot be determined without more information",
      ],
      "0.20 × $300 = $60 > $50. The 20% discount saves more."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Reporting the saving rather than the sale price.",
      fix: "Sale price = original price − saving. Subtract the discount amount to find what you pay.",
    },
    {
      mistake: "Adding the discount instead of subtracting: $80 + $16 = $96.",
      fix: "A discount reduces the price. Subtract the discount: $80 − $16 = $64.",
    },
    {
      mistake: "Using the discount percentage as the multiplier: 20% off → × 0.20.",
      fix: "The multiplier for a 20% discount is 1 − 0.20 = 0.80, not 0.20.",
    },
    {
      mistake: "Comparing percentage discounts without converting to dollar amounts.",
      fix: "Calculate the dollar saving for each offer, then compare the dollar amounts directly.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-fin-dis-m1",
      "A $75 book is 20% off. Find the sale price.",
      "\\$75 \\times 0.80 = \\;?",
      "60",
      "75 × 0.80 = 60.",
      ["$60"]
    ),
    answer(
      "y8-fin-dis-m2",
      "A $110 jacket is $22 off. Find the sale price.",
      "110 - 22 = \\;?",
      "88",
      "$110 − $22 = $88.",
      ["$88"]
    ),
    choice(
      "y8-fin-dis-m3",
      "A $400 laptop is 30% off. What is the sale price?",
      "B",
      ["$120", "$280", "$370", "$520"],
      "400 × 0.70 = $280.",
      "\\$400 \\times 0.70 = \\;?"
    ),
    answer(
      "y8-fin-dis-m4",
      "A $250 bike is 15% off. Find the saving.",
      "0.15 \\times 250 = \\;?",
      "37.50",
      "0.15 × 250 = 37.50.",
      ["$37.50"]
    ),
    answer(
      "y8-fin-dis-m5",
      "A $90 jumper is 25% off. Find the sale price.",
      "\\$90 \\times 0.75 = \\;?",
      "67.50",
      "90 × 0.75 = 67.50.",
      ["$67.50"]
    ),
    choice(
      "y8-fin-dis-m6",
      "A $200 camera offers 25% off or $45 off. Which deal saves more?",
      "A",
      [
        "25% off saves $50 — it is better",
        "$45 off saves more",
        "Both save the same amount",
        "The $45 off deal is always better for any item",
      ],
      "0.25 × $200 = $50 > $45. The 25% discount is the better deal."
    ),
    answer(
      "y8-fin-dis-m7",
      "A $35 meal deal is $7 off. Find the sale price.",
      "35 - 7 = \\;?",
      "28",
      "$35 − $7 = $28.",
      ["$28"]
    ),
    answer(
      "y8-fin-dis-m8",
      "Shoes normally cost $140 and are 40% off. Find the sale price.",
      "\\$140 \\times 0.60 = \\;?",
      "84",
      "140 × 0.60 = 84.",
      ["$84"]
    ),
    choice(
      "y8-fin-dis-m9",
      "A $480 TV has two offers: 20% off or $90 off. Which saves more?",
      "D",
      [
        "$90 off saves $90",
        "$90 off saves $180",
        "Both save the same amount",
        "20% off saves $96 — it saves more",
      ],
      "0.20 × $480 = $96 > $90. The 20% discount saves more."
    ),
    answer(
      "y8-fin-dis-m10",
      "A $55 item is 30% off. Find the sale price.",
      "\\$55 \\times 0.70 = \\;?",
      "38.50",
      "55 × 0.70 = 38.50.",
      ["$38.50"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: identify multiplier / dollar-off ───────────────────
    poolChoice("y8-fin-dis-p1", "A \\(\\$60\\) item is 10% off. What multiplier finds the sale price?", "A", ["0.90", "1.10", "0.10", "0.60"], "1 − 0.10 = 0.90.", 1, "\\text{Multiplier for }10\\%\\text{ off}"),
    poolAnswer("y8-fin-dis-p2", "A \\(\\$50\\) item is 20% off. Find the sale price.", "\\$50 \\times 0.80 = \\;?", "40", "50 × 0.80 = 40.", 1, ["$40"]),
    poolAnswer("y8-fin-dis-p3", "A \\(\\$80\\) item has \\(\\$10\\) off. Find the sale price.", "80 - 10 = \\;?", "70", "$80 − $10 = $70.", 1, ["$70"]),
    poolAnswer("y8-fin-dis-p4", "A \\(\\$100\\) item is 25% off. Find the sale price.", "\\$100 \\times 0.75 = \\;?", "75", "100 × 0.75 = 75.", 1, ["$75"]),
    poolChoice("y8-fin-dis-p5", "A \\(\\$40\\) item is 50% off. What is the sale price?", "B", ["$10", "$20", "$30", "$60"], "40 × 0.50 = 20.", 1, "\\$40 \\times 0.50 = \\;?"),
    // ── Difficulty 2: standard sale price / saving ───────────────────────
    poolAnswer("y8-fin-dis-p6", "A \\(\\$120\\) item is 30% off. Find the sale price.", "\\$120 \\times 0.70 = \\;?", "84", "120 × 0.70 = 84.", 2, ["$84"]),
    poolAnswer("y8-fin-dis-p7", "A \\(\\$200\\) item is 20% off. Find the saving.", "0.20 \\times 200 = \\;?", "40", "0.20 × 200 = 40.", 2, ["$40"]),
    poolAnswer("y8-fin-dis-p8", "A \\(\\$90\\) item is 40% off. Find the sale price.", "\\$90 \\times 0.60 = \\;?", "54", "90 × 0.60 = 54.", 2, ["$54"]),
    poolChoice("y8-fin-dis-p9", "A \\(\\$150\\) item is 10% off. What is the sale price?", "C", ["$15", "$140", "$135", "$165"], "150 × 0.90 = 135.", 2, "\\$150 \\times 0.90 = \\;?"),
    poolAnswer("y8-fin-dis-p10", "A \\(\\$250\\) item has \\(\\$35\\) off. Find the sale price.", "250 - 35 = \\;?", "215", "$250 − $35 = $215.", 2, ["$215"]),
    // ── Difficulty 3: decimal results ────────────────────────────────────
    poolAnswer("y8-fin-dis-p11", "A \\(\\$45\\) item is 15% off. Find the sale price.", "\\$45 \\times 0.85 = \\;?", "38.25", "45 × 0.85 = 38.25.", 3, ["$38.25"]),
    poolAnswer("y8-fin-dis-p12", "A \\(\\$130\\) item is 35% off. Find the sale price.", "\\$130 \\times 0.65 = \\;?", "84.50", "130 × 0.65 = 84.50.", 3, ["$84.50"]),
    poolAnswer("y8-fin-dis-p13", "A \\(\\$60\\) item is 12% off. Find the saving.", "0.12 \\times 60 = \\;?", "7.20", "0.12 × 60 = 7.20.", 3, ["$7.20"]),
    poolChoice("y8-fin-dis-p14", "A \\(\\$180\\) item is 25% off. What is the sale price?", "A", ["$135", "$145", "$45", "$155"], "180 × 0.75 = 135.", 3, "\\$180 \\times 0.75 = \\;?"),
    poolAnswer("y8-fin-dis-p15", "A \\(\\$84\\) item is 25% off. Find the sale price.", "\\$84 \\times 0.75 = \\;?", "63", "84 × 0.75 = 63.", 3, ["$63"]),
    // ── Difficulty 4: compare offers / larger ────────────────────────────
    poolChoice("y8-fin-dis-p16", "A \\(\\$400\\) item offers 20% off or \\(\\$70\\) off. Which saves more?", "A", ["20% off saves $80", "$70 off saves more", "Both save the same", "Cannot be determined"], "0.20 × 400 = $80 > $70, so 20% off saves more.", 4, "\\text{Compare }20\\%\\text{ off vs }\\$70\\text{ off on }\\$400"),
    poolAnswer("y8-fin-dis-p17", "A \\(\\$1250\\) item is 18% off. Find the sale price.", "\\$1250 \\times 0.82 = \\;?", "1025", "1250 × 0.82 = 1025.", 4, ["$1025"]),
    poolAnswer("y8-fin-dis-p18", "A \\(\\$320\\) item is 22% off. Find the saving.", "0.22 \\times 320 = \\;?", "70.40", "0.22 × 320 = 70.40.", 4, ["$70.40"]),
    poolChoice("y8-fin-dis-p19", "A \\(\\$500\\) item offers 15% off or \\(\\$80\\) off. Which saves more?", "B", ["15% off saves $75", "$80 off saves more", "Both save the same", "15% off saves $80"], "0.15 × 500 = $75 < $80, so the $80-off deal saves more.", 4, "\\text{Compare }15\\%\\text{ off vs }\\$80\\text{ off on }\\$500"),
    poolAnswer("y8-fin-dis-p20", "A \\(\\$640\\) item is 12.5% off. Find the sale price.", "\\$640 \\times 0.875 = \\;?", "560", "640 × 0.875 = 560.", 4, ["$560"]),
    // ── Difficulty 5: reverse / two-step ─────────────────────────────────
    poolChoice("y8-fin-dis-p21", "After 20% off, an item costs \\(\\$48\\). What was the original price?", "A", ["$60", "$57.60", "$68", "$40"], "Original × 0.80 = 48, so original = 48 ÷ 0.80 = $60.", 5, "\\text{Original price if sale price }\\$48 = \\text{original} \\times 0.80"),
    poolAnswer("y8-fin-dis-p22", "After 25% off, an item costs \\(\\$135\\). Find the original price.", "135 \\div 0.75 = \\;?", "180", "Original = 135 ÷ 0.75 = $180.", 5, ["$180"]),
    poolAnswer("y8-fin-dis-p23", "A \\(\\$200\\) item is 20% off, then a further 10% off the sale price. Find the final price.", "200 \\times 0.80 \\times 0.90 = \\;?", "144", "200 × 0.80 = 160; 160 × 0.90 = 144.", 5, ["$144"]),
    poolAnswer("y8-fin-dis-p24", "A \\(\\$96\\) item is 37.5% off. Find the sale price.", "\\$96 \\times 0.625 = \\;?", "60", "96 × 0.625 = 60.", 5, ["$60"]),
    poolChoice("y8-fin-dis-p25", "A \\(\\$300\\) item is 30% off, then a \\(\\$20\\) coupon is applied. Find the final price.", "C", ["$210", "$190", "$190 (210 − 20)", "$250"], "300 × 0.70 = 210; 210 − 20 = $190.", 5, "300 \\times 0.70 - 20 = \\;?"),
    poolAnswer("y8-fin-dis-p26", "After a 40% discount, an item costs \\(\\$72\\). Find the original price.", "72 \\div 0.60 = \\;?", "120", "Original = 72 ÷ 0.60 = $120.", 5, ["$120"]),
  ],
  multiPartPractice: [
    {
      id: "y8-fin-dis-mp1",
      prompt:
        "A pair of headphones is marked at \\(\\$150\\). The store advertises 20% off, and a member also has a \\(\\$10\\) coupon applied after the discount.",
      latex: "\\text{Marked price} = \\$150",
      answer: "110",
      hint: "Apply the percentage discount first using the multiplier, then subtract the coupon.",
      explanation:
        "Part (a): 0.20 × 150 = $30. Part (b): 150 × 0.80 = $120. Part (c): $120 − $10 coupon = $110.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the dollar saving from the 20% discount.",
          latex: "0.20 \\times 150",
          marks: 1,
          answer: "30",
          acceptedAnswers: ["$30"],
          hint: "0.20 × 150.",
          explanation: "0.20 × 150 = $30.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the price after the 20% discount.",
          latex: "150 \\times 0.80",
          marks: 1,
          answer: "120",
          acceptedAnswers: ["$120"],
          hint: "Multiply the marked price by 0.80.",
          explanation: "150 × 0.80 = $120.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the final price after the \\(\\$10\\) coupon is applied.",
          latex: "120 - 10",
          marks: 1,
          answer: "110",
          acceptedAnswers: ["$110"],
          hint: "Subtract the coupon from the discounted price.",
          explanation: "$120 − $10 = $110.",
        },
      ],
    },
  ],
};

// ── Lesson 6: Simple Interest Introduction ───────────────────────────────────

const simpleInterestIntroduction: LessonContent = {
  description:
    "Calculate simple interest using I = PRT ÷ 100, find the total amount, and apply the formula to savings and loan contexts with Australian dollar amounts.",
  learningIntention:
    "Calculate simple interest using I = PRT ÷ 100 and find the total amount owed or saved.",
  successCriteria: [
    "Identify the principal, rate and time in a simple interest problem.",
    "Apply the formula I = PRT ÷ 100 to calculate interest.",
    "Find the total amount by adding interest to the principal.",
    "Apply simple interest to both savings and borrowing contexts.",
  ],
  teaching: {
    paragraphs: [
      "Simple interest is calculated only on the original amount borrowed or invested (the principal). It does not compound.",
      "The formula is I = PRT ÷ 100, where P is the principal, R is the annual interest rate as a percentage, and T is the time in years.",
      "The total amount is A = P + I. Add the interest to the principal to find the final balance or repayment.",
      "Simple interest is used for short-term savings accounts, personal loans and lay-by agreements.",
    ],
    latexBlocks: [
      "I = \\frac{P \\times R \\times T}{100}",
      "A = P + I",
      "P = \\$500,\\;R = 4\\%,\\;T = 3\\text{ yr}:\\quad I = \\frac{500 \\times 4 \\times 3}{100} = \\$60",
    ],
  },
  workedExamples: [
    {
      title: "Calculate simple interest",
      questionLatex: "\\text{Find the simple interest on }\\$400\\text{ at }5\\%\\text{ per year for 2 years.}",
      steps: [
        { explanation: "Substitute into I = PRT ÷ 100.", latex: "I = \\frac{400 \\times 5 \\times 2}{100}" },
        { explanation: "Calculate.", latex: "I = \\frac{4000}{100} = 40" },
      ],
      finalAnswerLatex: "\\$40",
    } as WorkedExample,
    {
      title: "Find the total repayment on a loan",
      questionLatex: "\\text{Sam borrows }\\$800\\text{ at }6\\%\\text{ simple interest for 3 years. Find the total amount to repay.}",
      steps: [
        { explanation: "Calculate the interest.", latex: "I = \\frac{800 \\times 6 \\times 3}{100} = \\$144" },
        { explanation: "Add interest to principal.", latex: "A = 800 + 144 = \\$944" },
      ],
      finalAnswerLatex: "\\$944",
    } as WorkedExample,
    {
      title: "Savings account balance",
      questionLatex: "\\text{Priya deposits }\\$1200\\text{ at }3.5\\%\\text{ simple interest for 2 years. Find the total in her account.}",
      steps: [
        { explanation: "Calculate the interest.", latex: "I = \\frac{1200 \\times 3.5 \\times 2}{100} = \\$84" },
        { explanation: "Add interest to principal.", latex: "A = 1200 + 84 = \\$1284" },
      ],
      finalAnswerLatex: "\\$1284",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-fin-si-g1",
      "In the formula I = PRT ÷ 100, what does P represent?",
      "A",
      [
        "Principal — the original amount invested or borrowed",
        "Percentage rate per year",
        "Profit from the investment",
        "Payment made each year",
      ],
      "P is the principal: the original amount invested or borrowed."
    ),
    answer(
      "y8-fin-si-g2",
      "Find the simple interest on $500 at 4% for 1 year.",
      "I = \\frac{500 \\times 4 \\times 1}{100} = \\;?",
      "20",
      "(500 × 4 × 1) ÷ 100 = 20.",
      ["$20"]
    ),
    answer(
      "y8-fin-si-g3",
      "Find the simple interest on $300 at 5% for 2 years.",
      "I = \\frac{300 \\times 5 \\times 2}{100} = \\;?",
      "30",
      "(300 × 5 × 2) ÷ 100 = 30.",
      ["$30"]
    ),
    answer(
      "y8-fin-si-g4",
      "Tom invests $1000 at 3% simple interest for 4 years. Find the total amount.",
      "A = 1000 + \\frac{1000 \\times 3 \\times 4}{100} = \\;?",
      "1120",
      "I = (1000 × 3 × 4) ÷ 100 = 120. Total = 1000 + 120 = 1120.",
      ["$1120"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-fin-si-i1",
      "Find the simple interest on $600 at 5% for 3 years.",
      "I = \\frac{600 \\times 5 \\times 3}{100} = \\;?",
      "90",
      "(600 × 5 × 3) ÷ 100 = 90.",
      ["$90"]
    ),
    choice(
      "y8-fin-si-i2",
      "Which formula correctly calculates simple interest?",
      "B",
      ["I = P + R + T", "I = PRT ÷ 100", "I = P × R²", "I = P ÷ R × T"],
      "I = PRT ÷ 100 is the simple interest formula."
    ),
    answer(
      "y8-fin-si-i3",
      "A loan of $2000 is taken at 6% simple interest for 2 years. Find the total repayment.",
      "A = 2000 + \\frac{2000 \\times 6 \\times 2}{100} = \\;?",
      "2240",
      "I = (2000 × 6 × 2) ÷ 100 = 240. Total = 2000 + 240 = 2240.",
      ["$2240"]
    ),
    answer(
      "y8-fin-si-i4",
      "Find the simple interest on $850 at 4% for 3 years.",
      "I = \\frac{850 \\times 4 \\times 3}{100} = \\;?",
      "102",
      "(850 × 4 × 3) ÷ 100 = 102.",
      ["$102"]
    ),
    choice(
      "y8-fin-si-i5",
      "Lena invests $500 at 5% simple interest for 3 years. What is the total in her account?",
      "C",
      ["$525", "$550", "$575", "$600"],
      "I = (500 × 5 × 3) ÷ 100 = 75. Total = 500 + 75 = $575.",
      "A = 500 + \\frac{500 \\times 5 \\times 3}{100} = \\;?"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to divide by 100: computing P × R × T as the interest.",
      fix: "Always divide by 100 in the formula: I = (P × R × T) ÷ 100.",
    },
    {
      mistake: "Reporting only the interest when asked for the total amount.",
      fix: "Total amount A = P + I. Add the interest to the principal.",
    },
    {
      mistake: "Using R as a decimal and also dividing by 100.",
      fix: "In I = PRT ÷ 100, R is the percentage number (e.g. 5 for 5%). Do not convert it to a decimal before substituting.",
    },
    {
      mistake: "Using time in months without converting to years.",
      fix: "T must be in years. Divide months by 12 before substituting into the formula.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-fin-si-m1",
      "Find the simple interest on $200 at 10% for 2 years.",
      "I = \\frac{200 \\times 10 \\times 2}{100} = \\;?",
      "40",
      "(200 × 10 × 2) ÷ 100 = 40.",
      ["$40"]
    ),
    answer(
      "y8-fin-si-m2",
      "Find the simple interest on $1500 at 4% for 3 years.",
      "I = \\frac{1500 \\times 4 \\times 3}{100} = \\;?",
      "180",
      "(1500 × 4 × 3) ÷ 100 = 180.",
      ["$180"]
    ),
    choice(
      "y8-fin-si-m3",
      "A student borrows $400 at 5% simple interest for 2 years. What is the total to repay?",
      "B",
      ["$40", "$440", "$480", "$420"],
      "I = (400 × 5 × 2) ÷ 100 = 40. Total = 400 + 40 = $440.",
      "A = 400 + \\frac{400 \\times 5 \\times 2}{100} = \\;?"
    ),
    answer(
      "y8-fin-si-m4",
      "Find the simple interest on $750 at 8% for 1 year.",
      "I = \\frac{750 \\times 8 \\times 1}{100} = \\;?",
      "60",
      "(750 × 8 × 1) ÷ 100 = 60.",
      ["$60"]
    ),
    answer(
      "y8-fin-si-m5",
      "Mia invests $2000 at 3.5% simple interest for 2 years. Find the interest earned.",
      "I = \\frac{2000 \\times 3.5 \\times 2}{100} = \\;?",
      "140",
      "(2000 × 3.5 × 2) ÷ 100 = 140.",
      ["$140"]
    ),
    choice(
      "y8-fin-si-m6",
      "What is the total amount after 3 years if $600 is invested at 5% simple interest?",
      "C",
      ["$600", "$630", "$690", "$780"],
      "I = (600 × 5 × 3) ÷ 100 = 90. Total = 600 + 90 = $690.",
      "A = 600 + \\frac{600 \\times 5 \\times 3}{100} = \\;?"
    ),
    answer(
      "y8-fin-si-m7",
      "A loan of $3000 is taken at 6% simple interest for 4 years. Find the total repayment.",
      "A = 3000 + \\frac{3000 \\times 6 \\times 4}{100} = \\;?",
      "3720",
      "I = (3000 × 6 × 4) ÷ 100 = 720. Total = 3000 + 720 = 3720.",
      ["$3720"]
    ),
    answer(
      "y8-fin-si-m8",
      "Find the simple interest on $1200 at 2.5% for 4 years.",
      "I = \\frac{1200 \\times 2.5 \\times 4}{100} = \\;?",
      "120",
      "(1200 × 2.5 × 4) ÷ 100 = 120.",
      ["$120"]
    ),
    choice(
      "y8-fin-si-m9",
      "Which correctly evaluates I = PRT ÷ 100 for P = $800, R = 5%, T = 3 years?",
      "A",
      ["$120", "$24", "$1200", "$400"],
      "(800 × 5 × 3) ÷ 100 = 12 000 ÷ 100 = $120.",
      "I = \\frac{800 \\times 5 \\times 3}{100} = \\;?"
    ),
    answer(
      "y8-fin-si-m10",
      "Jake deposits $4500 at 4% simple interest for 2 years. Find the total in his account.",
      "A = 4500 + \\frac{4500 \\times 4 \\times 2}{100} = \\;?",
      "4860",
      "I = (4500 × 4 × 2) ÷ 100 = 360. Total = 4500 + 360 = 4860.",
      ["$4860"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: identify terms / one-year interest ─────────────────
    poolChoice("y8-fin-si-p1", "In I = PRT ÷ 100, what does T represent?", "B", ["The total amount", "The time in years", "The tax rate", "The interest earned"], "T is the time in years.", 1, "\\text{Meaning of }T"),
    poolAnswer("y8-fin-si-p2", "Find the simple interest on \\(\\$100\\) at 5% for 1 year.", "I = \\frac{100 \\times 5 \\times 1}{100} = \\;?", "5", "(100 × 5 × 1) ÷ 100 = 5.", 1, ["$5"]),
    poolAnswer("y8-fin-si-p3", "Find the simple interest on \\(\\$200\\) at 10% for 1 year.", "I = \\frac{200 \\times 10 \\times 1}{100} = \\;?", "20", "(200 × 10 × 1) ÷ 100 = 20.", 1, ["$20"]),
    poolAnswer("y8-fin-si-p4", "Find the simple interest on \\(\\$500\\) at 2% for 1 year.", "I = \\frac{500 \\times 2 \\times 1}{100} = \\;?", "10", "(500 × 2 × 1) ÷ 100 = 10.", 1, ["$10"]),
    poolChoice("y8-fin-si-p5", "What is the simple interest on \\(\\$1000\\) at 4% for 1 year?", "C", ["$4", "$14", "$40", "$400"], "(1000 × 4 × 1) ÷ 100 = 40.", 1, "I = \\frac{1000 \\times 4 \\times 1}{100} = \\;?"),
    // ── Difficulty 2: multi-year interest ────────────────────────────────
    poolAnswer("y8-fin-si-p6", "Find the simple interest on \\(\\$400\\) at 5% for 3 years.", "I = \\frac{400 \\times 5 \\times 3}{100} = \\;?", "60", "(400 × 5 × 3) ÷ 100 = 60.", 2, ["$60"]),
    poolAnswer("y8-fin-si-p7", "Find the simple interest on \\(\\$600\\) at 4% for 2 years.", "I = \\frac{600 \\times 4 \\times 2}{100} = \\;?", "48", "(600 × 4 × 2) ÷ 100 = 48.", 2, ["$48"]),
    poolAnswer("y8-fin-si-p8", "Find the simple interest on \\(\\$1000\\) at 6% for 2 years.", "I = \\frac{1000 \\times 6 \\times 2}{100} = \\;?", "120", "(1000 × 6 × 2) ÷ 100 = 120.", 2, ["$120"]),
    poolChoice("y8-fin-si-p9", "What is the simple interest on \\(\\$800\\) at 5% for 2 years?", "A", ["$80", "$40", "$160", "$800"], "(800 × 5 × 2) ÷ 100 = 80.", 2, "I = \\frac{800 \\times 5 \\times 2}{100} = \\;?"),
    poolAnswer("y8-fin-si-p10", "Find the simple interest on \\(\\$1500\\) at 3% for 4 years.", "I = \\frac{1500 \\times 3 \\times 4}{100} = \\;?", "180", "(1500 × 3 × 4) ÷ 100 = 180.", 2, ["$180"]),
    // ── Difficulty 3: total amount A = P + I ─────────────────────────────
    poolAnswer("y8-fin-si-p11", "Find the total amount when \\(\\$500\\) is invested at 4% simple interest for 3 years.", "A = 500 + \\frac{500 \\times 4 \\times 3}{100} = \\;?", "560", "I = 60; A = 500 + 60 = 560.", 3, ["$560"]),
    poolAnswer("y8-fin-si-p12", "A loan of \\(\\$1000\\) at 6% simple interest runs for 3 years. Find the total repayment.", "A = 1000 + \\frac{1000 \\times 6 \\times 3}{100} = \\;?", "1180", "I = 180; A = 1000 + 180 = 1180.", 3, ["$1180"]),
    poolAnswer("y8-fin-si-p13", "Find the simple interest on \\(\\$2000\\) at 3.5% for 2 years.", "I = \\frac{2000 \\times 3.5 \\times 2}{100} = \\;?", "140", "(2000 × 3.5 × 2) ÷ 100 = 140.", 3, ["$140"]),
    poolChoice("y8-fin-si-p14", "What is the total amount when \\(\\$800\\) is invested at 5% simple interest for 4 years?", "B", ["$160", "$960", "$840", "$1000"], "I = (800 × 5 × 4) ÷ 100 = 160; A = 800 + 160 = $960.", 3, "A = 800 + \\frac{800 \\times 5 \\times 4}{100} = \\;?"),
    poolAnswer("y8-fin-si-p15", "Find the simple interest on \\(\\$1200\\) at 2.5% for 4 years.", "I = \\frac{1200 \\times 2.5 \\times 4}{100} = \\;?", "120", "(1200 × 2.5 × 4) ÷ 100 = 120.", 3, ["$120"]),
    // ── Difficulty 4: larger / decimal rate / total ──────────────────────
    poolAnswer("y8-fin-si-p16", "Find the simple interest on \\(\\$5000\\) at 4.5% for 3 years.", "I = \\frac{5000 \\times 4.5 \\times 3}{100} = \\;?", "675", "(5000 × 4.5 × 3) ÷ 100 = 675.", 4, ["$675"]),
    poolAnswer("y8-fin-si-p17", "A loan of \\(\\$8000\\) at 7% simple interest runs for 5 years. Find the total repayment.", "A = 8000 + \\frac{8000 \\times 7 \\times 5}{100} = \\;?", "10800", "I = (8000 × 7 × 5) ÷ 100 = 2800; A = 8000 + 2800 = 10800.", 4, ["$10800", "10,800"]),
    poolChoice("y8-fin-si-p18", "Which time T (in years) makes the simple interest on \\(\\$500\\) at 4% equal to \\(\\$60\\)?", "C", ["1", "2", "3", "4"], "I = (500 × 4 × T) ÷ 100 = 20T; 20T = 60, so T = 3.", 4, "20T = 60 \\Rightarrow T = \\;?"),
    poolAnswer("y8-fin-si-p19", "Find the simple interest on \\(\\$3600\\) at 6.25% for 2 years.", "I = \\frac{3600 \\times 6.25 \\times 2}{100} = \\;?", "450", "(3600 × 6.25 × 2) ÷ 100 = 450.", 4, ["$450"]),
    poolAnswer("y8-fin-si-p20", "\\(\\$2400\\) is invested at 3% simple interest for 30 months. (T = 2.5 years.) Find the interest.", "I = \\frac{2400 \\times 3 \\times 2.5}{100} = \\;?", "180", "T = 30 ÷ 12 = 2.5 years; I = (2400 × 3 × 2.5) ÷ 100 = 180.", 4, ["$180"]),
    // ── Difficulty 5: find rate / find principal ─────────────────────────
    poolChoice("y8-fin-si-p21", "Simple interest of \\(\\$90\\) is earned on \\(\\$600\\) over 3 years. What is the annual rate?", "A", ["5%", "6%", "4%", "3%"], "I = (600 × R × 3) ÷ 100 = 18R; 18R = 90, so R = 5%.", 5, "18R = 90 \\Rightarrow R = \\;?"),
    poolAnswer("y8-fin-si-p22", "Simple interest of \\(\\$120\\) is earned at 4% over 2 years. Find the principal P.", "P = \\frac{120 \\times 100}{4 \\times 2} = \\;?", "1500", "I = (P × 4 × 2) ÷ 100 = 0.08P; 0.08P = 120, so P = $1500.", 5, ["$1500"]),
    poolAnswer("y8-fin-si-p23", "A \\(\\$2000\\) loan is repaid as \\(\\$2360\\) after 3 years of simple interest. Find the annual rate.", "R = \\frac{360 \\times 100}{2000 \\times 3} = \\;?", "6", "I = 2360 − 2000 = 360; R = (360 × 100) ÷ (2000 × 3) = 6%.", 5, ["6%"]),
    poolAnswer("y8-fin-si-p24", "How many years does it take \\(\\$1000\\) at 5% simple interest to earn \\(\\$250\\)?", "T = \\frac{250 \\times 100}{1000 \\times 5} = \\;?", "5", "I = (1000 × 5 × T) ÷ 100 = 50T; 50T = 250, so T = 5 years.", 5, ["5 years"]),
    poolAnswer("y8-fin-si-p25", "Find the simple interest on \\(\\$12000\\) at 5.5% for 4 years.", "I = \\frac{12000 \\times 5.5 \\times 4}{100} = \\;?", "2640", "(12000 × 5.5 × 4) ÷ 100 = 2640.", 5, ["$2640", "2,640"]),
    poolChoice("y8-fin-si-p26", "Simple interest of \\(\\$160\\) is earned on a principal at 8% over 2 years. What is the principal?", "B", ["$800", "$1000", "$1200", "$1600"], "I = (P × 8 × 2) ÷ 100 = 0.16P; 0.16P = 160, so P = $1000.", 5, "0.16P = 160 \\Rightarrow P = \\;?"),
  ],
  multiPartPractice: [
    {
      id: "y8-fin-si-mp1",
      prompt:
        "Olivia invests \\(\\$2000\\) in a savings account paying 5% simple interest per year. She leaves it for 4 years.",
      latex: "P = \\$2000,\\quad R = 5\\%,\\quad T = 4\\text{ years}",
      answer: "2400",
      hint: "Use I = PRT ÷ 100, then A = P + I.",
      explanation:
        "Part (a): I = (2000 × 5 × 4) ÷ 100 = $400. Part (b): A = 2000 + 400 = $2400. Part (c): one year's interest = (2000 × 5 × 1) ÷ 100 = $100.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the total simple interest earned over 4 years.",
          latex: "I = \\frac{2000 \\times 5 \\times 4}{100}",
          marks: 1,
          answer: "400",
          acceptedAnswers: ["$400"],
          hint: "Substitute P = 2000, R = 5, T = 4.",
          explanation: "(2000 × 5 × 4) ÷ 100 = $400.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the total amount in the account after 4 years.",
          latex: "A = 2000 + 400",
          marks: 1,
          answer: "2400",
          acceptedAnswers: ["$2400"],
          hint: "Add the interest to the principal.",
          explanation: "2000 + 400 = $2400.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How much interest does the account earn in just one year?",
          latex: "I = \\frac{2000 \\times 5 \\times 1}{100}",
          marks: 1,
          answer: "100",
          acceptedAnswers: ["$100"],
          hint: "Use T = 1 in the formula.",
          explanation: "(2000 × 5 × 1) ÷ 100 = $100.",
        },
      ],
    },
  ],
};

// ── Lesson 7: Wages and Salary ────────────────────────────────────────────────

const wagesAndSalary: LessonContent = {
  description:
    "Calculate gross pay from salary and hourly wages, including overtime at time-and-a-half and double time, in Australian employment contexts.",
  learningIntention:
    "Calculate gross pay from an annual salary or an hourly wage, including overtime rates.",
  successCriteria: [
    "Distinguish between a salary (fixed annual amount) and wages (hourly rate).",
    "Convert an annual salary to a weekly, fortnightly or monthly amount.",
    "Calculate regular gross pay from hours worked at a standard hourly rate.",
    "Calculate overtime pay at time-and-a-half (1.5×) and double time (2×).",
    "Find total gross pay when regular and overtime hours are combined.",
  ],
  teaching: {
    paragraphs: [
      "In Australia, employees are paid in one of two main ways. A salary is a fixed annual amount paid regardless of exact hours worked — for example, a teacher might earn $75 000 per year. Wages are paid by the hour, so the total depends on how many hours are worked. Casual workers often receive a higher hourly rate to compensate for the lack of paid leave.",
      "To convert an annual salary to other pay periods, divide by the appropriate number: 52 for weekly pay, 26 for fortnightly pay (every two weeks), or 12 for monthly pay. For example, a $52 000 annual salary gives a weekly pay of $52 000 ÷ 52 = $1000.",
      "Gross pay is the total earned before any tax or deductions. For hourly workers, gross pay = hours worked × hourly rate. Award rates in Australia set minimum pay — most casual and part-time workers are paid at least the award rate.",
      "Overtime pay applies when employees work beyond standard hours (usually 38 hours per week in Australia). Time-and-a-half means 1.5 times the regular rate. Double time means 2 times the regular rate. A common mistake is to apply the overtime multiplier to the total hours rather than only the extra hours.",
      "To find total gross pay, calculate regular pay and overtime pay separately, then add them together.",
    ],
    latexBlocks: [
      "\\text{Weekly salary} = \\frac{\\text{Annual salary}}{52}",
      "\\text{Gross pay} = \\text{hours} \\times \\text{hourly rate}",
      "\\text{Time-and-a-half rate} = 1.5 \\times \\text{regular rate}",
      "\\text{Double time rate} = 2 \\times \\text{regular rate}",
    ],
  },
  workedExamples: [
    {
      title: "Convert annual salary to weekly pay",
      questionLatex: "\\text{Priya earns an annual salary of }\\$68\\,900.\\text{ Find her weekly pay.}",
      steps: [
        { explanation: "Divide the annual salary by 52 weeks.", latex: "68\\,900 \\div 52 = 1325" },
      ],
      finalAnswerLatex: "\\$1325\\text{ per week}",
    } as WorkedExample,
    {
      title: "Calculate gross pay with overtime",
      questionLatex: "\\text{Jake earns }\\$22\\text{ per hour. He works 38 regular hours and 4 hours at time-and-a-half. Find his gross pay.}",
      steps: [
        { explanation: "Calculate regular pay.", latex: "38 \\times 22 = 836" },
        { explanation: "Find the time-and-a-half rate.", latex: "1.5 \\times 22 = 33" },
        { explanation: "Calculate overtime pay.", latex: "4 \\times 33 = 132" },
        { explanation: "Add regular and overtime pay.", latex: "836 + 132 = 968" },
      ],
      finalAnswerLatex: "\\$968",
    } as WorkedExample,
    {
      title: "Fortnightly pay from annual salary",
      questionLatex: "\\text{A nurse earns }\\$89\\,700\\text{ per year. Find her fortnightly pay.}",
      steps: [
        { explanation: "Divide by 26 fortnights in a year.", latex: "89\\,700 \\div 26 = 3450" },
      ],
      finalAnswerLatex: "\\$3450\\text{ per fortnight}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nfm-wag-g1",
      "Which statement correctly describes the difference between a salary and wages?",
      "B",
      [
        "A salary is paid hourly; wages are paid annually",
        "A salary is a fixed annual amount; wages are paid per hour worked",
        "Both salary and wages mean the same thing",
        "Wages are always higher than a salary",
      ],
      "A salary is a fixed yearly amount. Wages depend on the number of hours worked."
    ),
    answer(
      "y8-nfm-wag-g2",
      "An employee earns an annual salary of $52 000. Find the weekly pay.",
      "\\$52\\,000 \\div 52 = \\;?",
      "1000",
      "52 000 ÷ 52 = 1000.",
      ["$1000", "1000.00"]
    ),
    answer(
      "y8-nfm-wag-g3",
      "Lena earns $18 per hour and works 35 hours in a week. Find her gross pay.",
      "35 \\times 18 = \\;?",
      "630",
      "35 × 18 = 630.",
      ["$630"]
    ),
    answer(
      "y8-nfm-wag-g4",
      "Tom earns $20 per hour. What is his time-and-a-half rate?",
      "1.5 \\times 20 = \\;?",
      "30",
      "1.5 × 20 = 30.",
      ["$30"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-nfm-wag-i1",
      "A teacher earns an annual salary of $78 000. Find the monthly pay.",
      "\\$78\\,000 \\div 12 = \\;?",
      "6500",
      "78 000 ÷ 12 = 6500.",
      ["$6500"]
    ),
    answer(
      "y8-nfm-wag-i2",
      "An annual salary of $62 400 is paid fortnightly. Find the fortnightly pay.",
      "\\$62\\,400 \\div 26 = \\;?",
      "2400",
      "62 400 ÷ 26 = 2400.",
      ["$2400"]
    ),
    answer(
      "y8-nfm-wag-i3",
      "Mia earns $24 per hour. She works 38 regular hours and 3 hours at double time. Find her gross pay.",
      "\\text{Gross pay} = 38 \\times 24 + 3 \\times (2 \\times 24) = \\;?",
      "1056",
      "Regular pay: 38 × 24 = 912. Double time rate: 2 × 24 = 48. Overtime pay: 3 × 48 = 144. Total: 912 + 144 = 1056.",
      ["$1056"]
    ),
    answer(
      "y8-nfm-wag-i4",
      "Ben earns $16 per hour and works 40 hours. He is paid time-and-a-half for the 2 hours beyond 38 hours. Find his gross pay.",
      "\\text{Gross pay} = 38 \\times 16 + 2 \\times (1.5 \\times 16) = \\;?",
      "656",
      "Regular pay: 38 × 16 = 608. Overtime rate: 1.5 × 16 = 24. Overtime pay: 2 × 24 = 48. Total: 608 + 48 = 656.",
      ["$656"]
    ),
    choice(
      "y8-nfm-wag-i5",
      "Sophie earns $25 per hour. She works 38 regular hours and 2 hours at time-and-a-half. What is her gross pay?",
      "C",
      ["$950", "$987.50", "$1025", "$1050"],
      "Regular pay: 38 × 25 = 950. Time-and-a-half rate: 1.5 × 25 = 37.50. Overtime pay: 2 × 37.50 = 75. Total: 950 + 75 = $1025.",
      "38 \\times 25 + 2 \\times (1.5 \\times 25) = \\;?"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Applying the overtime multiplier to all hours: e.g. 40 hours × (1.5 × $20) = $1200 instead of only applying it to the extra hours.",
      fix: "Calculate regular pay for standard hours and overtime pay separately for only the extra hours, then add.",
    },
    {
      mistake: "Dividing by the wrong number to convert annual salary: dividing by 26 when finding weekly pay.",
      fix: "Divide by 52 for weekly pay, by 26 for fortnightly pay, and by 12 for monthly pay.",
    },
    {
      mistake: "Confusing time-and-a-half (×1.5) with double time (×2).",
      fix: "Time-and-a-half means 1.5 times the regular rate. Double time means 2 times the regular rate.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-nfm-wag-m1",
      "How many fortnights are in one year?",
      "B",
      ["12", "26", "52", "24"],
      "A fortnight is two weeks. 52 weeks ÷ 2 = 26 fortnights."
    ),
    choice(
      "y8-nfm-wag-m2",
      "An employee earns $54 600 per year. Which calculation gives the weekly pay?",
      "A",
      ["54 600 ÷ 52", "54 600 ÷ 26", "54 600 ÷ 12", "54 600 × 52"],
      "Divide annual salary by 52 to find weekly pay."
    ),
    answer(
      "y8-nfm-wag-m3",
      "A librarian earns $67 600 per year. Find the weekly pay.",
      "\\$67\\,600 \\div 52 = \\;?",
      "1300",
      "67 600 ÷ 52 = 1300.",
      ["$1300"]
    ),
    answer(
      "y8-nfm-wag-m4",
      "Ryan earns $21 per hour and works 38 hours in a week. Find his gross pay.",
      "38 \\times 21 = \\;?",
      "798",
      "38 × 21 = 798.",
      ["$798"]
    ),
    answer(
      "y8-nfm-wag-m5",
      "Eva earns $28 per hour. What is her double time rate?",
      "2 \\times 28 = \\;?",
      "56",
      "2 × 28 = 56.",
      ["$56"]
    ),
    answer(
      "y8-nfm-wag-m6",
      "An annual salary of $93 600 is paid fortnightly. Find the fortnightly pay.",
      "\\$93\\,600 \\div 26 = \\;?",
      "3600",
      "93 600 ÷ 26 = 3600.",
      ["$3600"]
    ),
    answer(
      "y8-nfm-wag-m7",
      "Zara earns $19 per hour. She works 38 regular hours and 5 hours at time-and-a-half. Find her gross pay.",
      "38 \\times 19 + 5 \\times (1.5 \\times 19) = \\;?",
      "864.50",
      "Regular pay: 38 × 19 = 722. Overtime rate: 1.5 × 19 = 28.50. Overtime pay: 5 × 28.50 = 142.50. Total: 722 + 142.50 = 864.50.",
      ["$864.50"]
    ),
    answer(
      "y8-nfm-wag-m8",
      "James earns $32 per hour. He works 38 regular hours and 4 hours at double time. Find his gross pay.",
      "38 \\times 32 + 4 \\times (2 \\times 32) = \\;?",
      "1472",
      "Regular pay: 38 × 32 = 1216. Double time rate: 2 × 32 = 64. Overtime pay: 4 × 64 = 256. Total: 1216 + 256 = 1472.",
      ["$1472"]
    ),
    answer(
      "y8-nfm-wag-m9",
      "A graduate earns an annual salary of $57 200. Find the monthly pay.",
      "\\$57\\,200 \\div 12 = \\;?",
      "4766.67",
      "57 200 ÷ 12 ≈ 4766.67.",
      ["$4766.67", "4766.67"]
    ),
    answer(
      "y8-nfm-wag-m10",
      "Chloe works 38 hours at $26 per hour and 3 hours at time-and-a-half. Her colleague Liam works 41 hours all at $26 per hour. Who earns more and by how much?",
      "\\text{Compare Chloe vs Liam gross pay}",
      "Chloe by 19.50",
      "Chloe: Regular 38 × 26 = 988. Overtime rate 1.5 × 26 = 39. Overtime pay 3 × 39 = 117. Chloe total = 988 + 117 = 1105. Liam: 41 × 26 = 1066. Chloe earns 1105 − 1066 = $19.50 more.",
      ["chloe by $19.50", "$19.50 more", "19.50"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: salary conversions / basic rates ───────────────────
    poolChoice("y8-nfm-wag-p1", "How many weeks are used to convert an annual salary to weekly pay?", "B", ["12", "52", "26", "24"], "There are 52 weeks in a year.", 1, "\\text{Weeks per year}"),
    poolAnswer("y8-nfm-wag-p2", "An annual salary of \\(\\$52000\\) is paid weekly. Find the weekly pay.", "\\$52000 \\div 52 = \\;?", "1000", "52000 ÷ 52 = 1000.", 1, ["$1000"]),
    poolAnswer("y8-nfm-wag-p3", "A worker earns \\(\\$20\\) per hour for 30 hours. Find the gross pay.", "30 \\times 20 = \\;?", "600", "30 × 20 = 600.", 1, ["$600"]),
    poolAnswer("y8-nfm-wag-p4", "A worker earns \\(\\$18\\) per hour. Find the time-and-a-half rate.", "1.5 \\times 18 = \\;?", "27", "1.5 × 18 = 27.", 1, ["$27"]),
    poolChoice("y8-nfm-wag-p5", "What is the double-time rate for a \\(\\$15\\) hourly wage?", "C", ["$22.50", "$15", "$30", "$45"], "2 × 15 = 30.", 1, "2 \\times 15 = \\;?"),
    // ── Difficulty 2: conversions and simple gross pay ───────────────────
    poolAnswer("y8-nfm-wag-p6", "An annual salary of \\(\\$78000\\) is paid monthly. Find the monthly pay.", "\\$78000 \\div 12 = \\;?", "6500", "78000 ÷ 12 = 6500.", 2, ["$6500"]),
    poolAnswer("y8-nfm-wag-p7", "An annual salary of \\(\\$62400\\) is paid fortnightly. Find the fortnightly pay.", "\\$62400 \\div 26 = \\;?", "2400", "62400 ÷ 26 = 2400.", 2, ["$2400"]),
    poolAnswer("y8-nfm-wag-p8", "A worker earns \\(\\$22\\) per hour for 38 hours. Find the gross pay.", "38 \\times 22 = \\;?", "836", "38 × 22 = 836.", 2, ["$836"]),
    poolChoice("y8-nfm-wag-p9", "A worker earns \\(\\$25\\) per hour for 36 hours. What is the gross pay?", "A", ["$900", "$925", "$875", "$950"], "36 × 25 = 900.", 2, "36 \\times 25 = \\;?"),
    poolAnswer("y8-nfm-wag-p10", "An annual salary of \\(\\$67600\\) is paid weekly. Find the weekly pay.", "\\$67600 \\div 52 = \\;?", "1300", "67600 ÷ 52 = 1300.", 2, ["$1300"]),
    // ── Difficulty 3: overtime, single rate ──────────────────────────────
    poolAnswer("y8-nfm-wag-p11", "A worker earns \\(\\$20\\) per hour and works 4 hours at time-and-a-half. Find the overtime pay.", "4 \\times (1.5 \\times 20) = \\;?", "120", "OT rate = 30; 4 × 30 = 120.", 3, ["$120"]),
    poolAnswer("y8-nfm-wag-p12", "A worker earns \\(\\$24\\) per hour and works 3 hours at double time. Find the overtime pay.", "3 \\times (2 \\times 24) = \\;?", "144", "DT rate = 48; 3 × 48 = 144.", 3, ["$144"]),
    poolAnswer("y8-nfm-wag-p13", "A worker earns \\(\\$19\\) per hour. Find the time-and-a-half rate.", "1.5 \\times 19 = \\;?", "28.50", "1.5 × 19 = 28.50.", 3, ["$28.50"]),
    poolChoice("y8-nfm-wag-p14", "A worker does 5 hours at double time on a \\(\\$16\\) base rate. What is the overtime pay?", "B", ["$80", "$160", "$120", "$40"], "DT rate = 32; 5 × 32 = 160.", 3, "5 \\times (2 \\times 16) = \\;?"),
    poolAnswer("y8-nfm-wag-p15", "An annual salary of \\(\\$57200\\) is paid monthly. Find the monthly pay (to the nearest cent).", "\\$57200 \\div 12 = \\;?", "4766.67", "57200 ÷ 12 ≈ 4766.67.", 3, ["$4766.67"]),
    // ── Difficulty 4: combined regular + overtime ────────────────────────
    poolAnswer("y8-nfm-wag-p16", "A worker earns \\(\\$22\\) per hour, working 38 regular hours plus 4 hours at time-and-a-half. Find the gross pay.", "38 \\times 22 + 4 \\times (1.5 \\times 22) = \\;?", "968", "Regular 836; OT 4 × 33 = 132; total 968.", 4, ["$968"]),
    poolAnswer("y8-nfm-wag-p17", "A worker earns \\(\\$24\\) per hour, working 38 regular hours plus 3 hours at double time. Find the gross pay.", "38 \\times 24 + 3 \\times (2 \\times 24) = \\;?", "1056", "Regular 912; OT 3 × 48 = 144; total 1056.", 4, ["$1056"]),
    poolAnswer("y8-nfm-wag-p18", "A worker earns \\(\\$25\\) per hour, working 38 regular hours plus 2 hours at time-and-a-half. Find the gross pay.", "38 \\times 25 + 2 \\times (1.5 \\times 25) = \\;?", "1025", "Regular 950; OT 2 × 37.50 = 75; total 1025.", 4, ["$1025"]),
    poolChoice("y8-nfm-wag-p19", "A worker earns \\(\\$16\\) per hour, working 38 regular hours plus 2 hours at time-and-a-half. What is the gross pay?", "C", ["$640", "$648", "$656", "$664"], "Regular 608; OT 2 × 24 = 48; total $656.", 4, "38 \\times 16 + 2 \\times (1.5 \\times 16) = \\;?"),
    poolAnswer("y8-nfm-wag-p20", "A worker earns \\(\\$19\\) per hour, working 38 regular hours plus 5 hours at time-and-a-half. Find the gross pay.", "38 \\times 19 + 5 \\times (1.5 \\times 19) = \\;?", "864.50", "Regular 722; OT 5 × 28.50 = 142.50; total 864.50.", 4, ["$864.50"]),
    // ── Difficulty 5: mixed overtime / comparison ────────────────────────
    poolAnswer("y8-nfm-wag-p21", "A worker earns \\(\\$26\\) per hour, working 38 regular hours, 3 hours at time-and-a-half, and 2 hours at double time. Find the gross pay.", "38 \\times 26 + 3 \\times (1.5 \\times 26) + 2 \\times (2 \\times 26) = \\;?", "1326", "Regular 988; T1.5: 3 × 39 = 117; DT: 2 × 52 = 104; total 988 + 117 + 104 = 1326.", 5, ["$1326"]),
    poolAnswer("y8-nfm-wag-p22", "Worker A does 41 hours at \\(\\$26\\) (all regular). Worker B does 38 regular plus 3 at time-and-a-half at \\(\\$26\\). How much more does B earn?", "(38 \\times 26 + 3 \\times 39) - 41 \\times 26 = \\;?", "19.50", "A: 41 × 26 = 1066. B: 988 + 117 = 1105. B earns 1105 − 1066 = $19.50 more.", 5, ["$19.50"]),
    poolAnswer("y8-nfm-wag-p23", "A worker earns \\(\\$30\\) per hour and is paid \\(\\$1320\\) for a week of 38 regular hours plus overtime at double time. How many overtime hours were worked?", "\\frac{1320 - 38 \\times 30}{2 \\times 30} = \\;?", "3", "Regular = 1140; OT pay = 180; DT rate = 60; OT hours = 180 ÷ 60 = 3.", 5, ["3 hours", "3"]),
    poolChoice("y8-nfm-wag-p24", "An annual salary of \\(\\$93600\\) is paid fortnightly. What is the fortnightly pay?", "A", ["$3600", "$1800", "$7800", "$3500"], "93600 ÷ 26 = 3600.", 5, "\\$93600 \\div 26 = \\;?"),
    poolAnswer("y8-nfm-wag-p24b", "A salary of \\(\\$80000\\) per year. Find the weekly pay (to the nearest cent).", "\\$80000 \\div 52 = \\;?", "1538.46", "80000 ÷ 52 ≈ 1538.46.", 5, ["$1538.46"]),
    poolAnswer("y8-nfm-wag-p25", "A worker earns \\(\\$28\\) per hour, working 38 regular hours plus 6 hours at time-and-a-half. Find the gross pay.", "38 \\times 28 + 6 \\times (1.5 \\times 28) = \\;?", "1316", "Regular 1064; OT 6 × 42 = 252; total 1316.", 5, ["$1316"]),
  ],
  multiPartPractice: [
    {
      id: "y8-nfm-wag-mp1",
      prompt:
        "Daniel is paid \\(\\$24\\) per hour. In one week he works 38 regular hours and then 4 hours of overtime paid at time-and-a-half.",
      latex: "\\text{Rate} = \\$24/\\text{hr}",
      answer: "1056",
      hint: "Calculate regular pay and overtime pay separately, then add.",
      explanation:
        "Part (a): 38 × 24 = $912. Part (b): time-and-a-half rate = 1.5 × 24 = $36, so overtime pay = 4 × 36 = $144. Part (c): total = 912 + 144 = $1056.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find Daniel's regular pay for the 38 hours.",
          latex: "38 \\times 24",
          marks: 1,
          answer: "912",
          acceptedAnswers: ["$912"],
          hint: "Multiply the hours by the hourly rate.",
          explanation: "38 × 24 = $912.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find his overtime pay for the 4 hours at time-and-a-half.",
          latex: "4 \\times (1.5 \\times 24)",
          marks: 2,
          answer: "144",
          acceptedAnswers: ["$144"],
          hint: "Overtime rate = 1.5 × $24 = $36.",
          explanation: "1.5 × 24 = $36; 4 × 36 = $144.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find his total gross pay for the week.",
          latex: "912 + 144",
          marks: 1,
          answer: "1056",
          acceptedAnswers: ["$1056"],
          hint: "Add regular pay and overtime pay.",
          explanation: "912 + 144 = $1056.",
        },
      ],
    },
  ],
};

// ── Lesson 8: Income Tax Basics ───────────────────────────────────────────────

const incomeTaxBasics: LessonContent = {
  description:
    "Understand gross versus net income, calculate simple flat-rate tax, apply the Medicare levy, and find take-home pay after deductions, including GST calculations.",
  learningIntention:
    "Calculate take-home pay after applying a flat-rate income tax and Medicare levy, and find GST-inclusive and GST-exclusive prices.",
  successCriteria: [
    "Distinguish between gross income and net income.",
    "Calculate tax at a flat percentage rate.",
    "Calculate the Medicare levy at 2% of gross income.",
    "Find take-home pay by subtracting tax and the Medicare levy from gross income.",
    "Add 10% GST to a price and find the original price when GST is included.",
  ],
  teaching: {
    paragraphs: [
      "Gross income is the total amount earned before any deductions. Net income (take-home pay) is what you actually receive after deductions such as income tax and the Medicare levy. The phrase 'your pay before tax' means gross income.",
      "In Australia, income tax is collected through a system called PAYG (Pay As You Go) withholding. Employers calculate the tax owed on each pay and send it directly to the Australian Tax Office (ATO) before paying the employee. At the end of the financial year, employees lodge a tax return to check whether they paid the right amount.",
      "For Year 8, we use a simple flat-rate model: tax = gross income × tax rate. In reality, Australia uses progressive tax brackets (higher income earns a higher rate), but the flat-rate model builds the core skill of calculating a percentage deduction.",
      "The Medicare levy is an additional 2% of gross income that most Australian residents pay. It funds the public health system. Take-home pay = gross income − income tax − Medicare levy.",
      "GST (Goods and Services Tax) is a 10% tax added to most goods and services in Australia. To find the GST-inclusive price, multiply by 1.10. To find the original price when the GST-inclusive price is known, divide by 1.10. A common mistake is to find 10% of the final price rather than the original price when working backwards.",
    ],
    latexBlocks: [
      "\\text{Income tax} = \\text{gross income} \\times \\text{tax rate}",
      "\\text{Medicare levy} = \\text{gross income} \\times 0.02",
      "\\text{Take-home pay} = \\text{gross income} - \\text{income tax} - \\text{Medicare levy}",
      "\\text{GST-inclusive price} = \\text{original price} \\times 1.10",
      "\\text{Original price} = \\frac{\\text{GST-inclusive price}}{1.10}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate take-home pay",
      questionLatex: "\\text{Maya earns }\\$800\\text{ gross per week. She pays 20\\% income tax and the 2\\% Medicare levy. Find her take-home pay.}",
      steps: [
        { explanation: "Calculate income tax.", latex: "0.20 \\times 800 = 160" },
        { explanation: "Calculate Medicare levy.", latex: "0.02 \\times 800 = 16" },
        { explanation: "Subtract both deductions from gross income.", latex: "800 - 160 - 16 = 624" },
      ],
      finalAnswerLatex: "\\$624\\text{ per week}",
    } as WorkedExample,
    {
      title: "Add GST to a price",
      questionLatex: "\\text{A textbook has a pre-GST price of }\\$45.\\text{ Find the GST-inclusive price.}",
      steps: [
        { explanation: "Multiply by 1.10 to add 10% GST.", latex: "45 \\times 1.10 = 49.50" },
      ],
      finalAnswerLatex: "\\$49.50",
    } as WorkedExample,
    {
      title: "Find the original price from a GST-inclusive price",
      questionLatex: "\\text{A tool kit costs }\\$132\\text{ including GST. Find the pre-GST price.}",
      steps: [
        { explanation: "Divide by 1.10 to remove GST.", latex: "132 \\div 1.10 = 120" },
      ],
      finalAnswerLatex: "\\$120",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nfm-tax-g1",
      "Which best describes 'gross income'?",
      "C",
      [
        "Income after tax has been deducted",
        "Income tax paid to the government",
        "Total income earned before any deductions",
        "Income minus the Medicare levy only",
      ],
      "Gross income is the total earned before any deductions such as tax or the Medicare levy."
    ),
    answer(
      "y8-nfm-tax-g2",
      "Alex earns $600 gross per week. He pays income tax at 20%. Calculate his income tax.",
      "0.20 \\times 600 = \\;?",
      "120",
      "0.20 × 600 = 120.",
      ["$120"]
    ),
    answer(
      "y8-nfm-tax-g3",
      "Sam's gross weekly pay is $500. Calculate the Medicare levy (2% of gross income).",
      "0.02 \\times 500 = \\;?",
      "10",
      "0.02 × 500 = 10.",
      ["$10"]
    ),
    answer(
      "y8-nfm-tax-g4",
      "A camera has a pre-GST price of $200. Find the GST-inclusive price.",
      "200 \\times 1.10 = \\;?",
      "220",
      "200 × 1.10 = 220.",
      ["$220"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-nfm-tax-i1",
      "Zoe earns $750 gross per week. She pays 18% income tax and 2% Medicare levy. Find her take-home pay.",
      "750 - (0.18 \\times 750) - (0.02 \\times 750) = \\;?",
      "600",
      "Tax: 0.18 × 750 = 135. Medicare levy: 0.02 × 750 = 15. Take-home: 750 − 135 − 15 = 600.",
      ["$600"]
    ),
    answer(
      "y8-nfm-tax-i2",
      "A jacket costs $110 excluding GST. Find the GST-inclusive price.",
      "110 \\times 1.10 = \\;?",
      "121",
      "110 × 1.10 = 121.",
      ["$121"]
    ),
    choice(
      "y8-nfm-tax-i3",
      "A phone costs $385 including GST. What is the pre-GST price?",
      "B",
      ["$346.50", "$350", "$38.50", "$423.50"],
      "Divide by 1.10: 385 ÷ 1.10 = $350.",
      "385 \\div 1.10 = \\;?"
    ),
    answer(
      "y8-nfm-tax-i4",
      "An employee earns $1200 gross per fortnight. She pays 22% income tax and the 2% Medicare levy. Find her take-home pay.",
      "1200 - (0.22 \\times 1200) - (0.02 \\times 1200) = \\;?",
      "912",
      "Tax: 0.22 × 1200 = 264. Medicare levy: 0.02 × 1200 = 24. Take-home: 1200 − 264 − 24 = 912.",
      ["$912"]
    ),
    answer(
      "y8-nfm-tax-i5",
      "The GST-inclusive price of a bike is $660. Find the pre-GST price.",
      "660 \\div 1.10 = \\;?",
      "600",
      "660 ÷ 1.10 = 600.",
      ["$600"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Subtracting the tax rate from gross income directly: $800 − 20 = $780 instead of deducting 20% of $800.",
      fix: "Calculate the dollar amount of tax first: 0.20 × 800 = $160, then subtract: $800 − $160 = $640.",
    },
    {
      mistake: "Forgetting to deduct the Medicare levy in addition to income tax.",
      fix: "Take-home pay = gross income − income tax − Medicare levy. Both deductions apply.",
    },
    {
      mistake: "Finding 10% of the GST-inclusive price to reverse GST instead of dividing by 1.10.",
      fix: "To find the pre-GST price, divide the GST-inclusive price by 1.10, not by 1 + 10% of the final price.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-nfm-tax-m1",
      "What is PAYG withholding?",
      "A",
      [
        "When employers deduct income tax from pay before it reaches the employee",
        "When the employee pays tax directly to the ATO each week",
        "A government payment made to low-income workers",
        "A type of superannuation contribution",
      ],
      "PAYG (Pay As You Go) withholding means the employer deducts tax and sends it to the ATO before paying the employee."
    ),
    choice(
      "y8-nfm-tax-m2",
      "What percentage is the Medicare levy in Australia?",
      "B",
      ["1%", "2%", "5%", "10%"],
      "The Medicare levy is 2% of gross income."
    ),
    answer(
      "y8-nfm-tax-m3",
      "Kai earns $900 gross per week. He pays 25% income tax. Calculate his income tax.",
      "0.25 \\times 900 = \\;?",
      "225",
      "0.25 × 900 = 225.",
      ["$225"]
    ),
    answer(
      "y8-nfm-tax-m4",
      "Kai (from the previous question) also pays the 2% Medicare levy. Find his take-home pay.",
      "900 - 225 - (0.02 \\times 900) = \\;?",
      "657",
      "Medicare levy: 0.02 × 900 = 18. Take-home: 900 − 225 − 18 = 657.",
      ["$657"]
    ),
    answer(
      "y8-nfm-tax-m5",
      "A laptop has a pre-GST price of $850. Find the GST-inclusive price.",
      "850 \\times 1.10 = \\;?",
      "935",
      "850 × 1.10 = 935.",
      ["$935"]
    ),
    answer(
      "y8-nfm-tax-m6",
      "A service costs $242 including GST. Find the pre-GST price.",
      "242 \\div 1.10 = \\;?",
      "220",
      "242 ÷ 1.10 = 220.",
      ["$220"]
    ),
    answer(
      "y8-nfm-tax-m7",
      "Ava earns $2600 gross per month. She pays 19% income tax and 2% Medicare levy. Find her monthly take-home pay.",
      "2600 - (0.19 \\times 2600) - (0.02 \\times 2600) = \\;?",
      "2054",
      "Tax: 0.19 × 2600 = 494. Medicare levy: 0.02 × 2600 = 52. Take-home: 2600 − 494 − 52 = 2054.",
      ["$2054"]
    ),
    answer(
      "y8-nfm-tax-m8",
      "The GST-inclusive price of a surfboard is $594. Find the pre-GST price.",
      "594 \\div 1.10 = \\;?",
      "540",
      "594 ÷ 1.10 = 540.",
      ["$540"]
    ),
    answer(
      "y8-nfm-tax-m9",
      "Luca's gross annual salary is $62 400. After 21% income tax and 2% Medicare levy, find his annual take-home pay.",
      "62400 - (0.21 \\times 62400) - (0.02 \\times 62400) = \\;?",
      "48048",
      "Tax: 0.21 × 62400 = 13104. Medicare levy: 0.02 × 62400 = 1248. Take-home: 62400 − 13104 − 1248 = 48048.",
      ["$48048", "48,048"]
    ),
    answer(
      "y8-nfm-tax-m10",
      "A tradesperson quotes a job at $550 plus GST. The client expected to pay $605 in total. Is the client's expectation correct?",
      "550 \\times 1.10 = \\;?",
      "605",
      "GST-inclusive price: 550 × 1.10 = 605. Yes, the client's expectation is correct.",
      ["yes", "correct", "yes, correct", "605"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: definitions / single deductions ───────────────────
    poolChoice("y8-nfm-tax-p1", "What percentage is the Medicare levy in Australia?", "B", ["1%", "2%", "5%", "10%"], "The Medicare levy is 2% of gross income.", 1, "\\text{Medicare levy rate}"),
    poolAnswer("y8-nfm-tax-p2", "Find 20% income tax on \\(\\$500\\) gross income.", "0.20 \\times 500 = \\;?", "100", "0.20 × 500 = 100.", 1, ["$100"]),
    poolAnswer("y8-nfm-tax-p3", "Find the 2% Medicare levy on \\(\\$600\\) gross income.", "0.02 \\times 600 = \\;?", "12", "0.02 × 600 = 12.", 1, ["$12"]),
    poolAnswer("y8-nfm-tax-p4", "A \\(\\$100\\) pre-GST item. Find the GST-inclusive price.", "100 \\times 1.10 = \\;?", "110", "100 × 1.10 = 110.", 1, ["$110"]),
    poolChoice("y8-nfm-tax-p5", "Which is the GST rate in Australia?", "C", ["2%", "5%", "10%", "20%"], "GST is 10%.", 1, "\\text{GST rate}"),
    // ── Difficulty 2: single GST / tax steps ─────────────────────────────
    poolAnswer("y8-nfm-tax-p6", "Find 25% income tax on \\(\\$800\\) gross income.", "0.25 \\times 800 = \\;?", "200", "0.25 × 800 = 200.", 2, ["$200"]),
    poolAnswer("y8-nfm-tax-p7", "A \\(\\$250\\) pre-GST item. Find the GST-inclusive price.", "250 \\times 1.10 = \\;?", "275", "250 × 1.10 = 275.", 2, ["$275"]),
    poolAnswer("y8-nfm-tax-p8", "A \\(\\$330\\) item includes GST. Find the pre-GST price.", "330 \\div 1.10 = \\;?", "300", "330 ÷ 1.10 = 300.", 2, ["$300"]),
    poolChoice("y8-nfm-tax-p9", "A \\(\\$440\\) item includes GST. What is the pre-GST price?", "A", ["$400", "$396", "$484", "$44"], "440 ÷ 1.10 = $400.", 2, "440 \\div 1.10 = \\;?"),
    poolAnswer("y8-nfm-tax-p10", "Find the 2% Medicare levy on \\(\\$1500\\) gross income.", "0.02 \\times 1500 = \\;?", "30", "0.02 × 1500 = 30.", 2, ["$30"]),
    // ── Difficulty 3: take-home pay (tax + levy) ─────────────────────────
    poolAnswer("y8-nfm-tax-p11", "Gross weekly pay is \\(\\$800\\). After 20% tax and 2% Medicare levy, find the take-home pay.", "800 - 0.20 \\times 800 - 0.02 \\times 800 = \\;?", "624", "Tax 160; levy 16; 800 − 160 − 16 = 624.", 3, ["$624"]),
    poolAnswer("y8-nfm-tax-p12", "Gross weekly pay is \\(\\$750\\). After 18% tax and 2% Medicare levy, find the take-home pay.", "750 - 0.18 \\times 750 - 0.02 \\times 750 = \\;?", "600", "Tax 135; levy 15; 750 − 135 − 15 = 600.", 3, ["$600"]),
    poolAnswer("y8-nfm-tax-p13", "A \\(\\$77\\) item includes GST. Find the pre-GST price.", "77 \\div 1.10 = \\;?", "70", "77 ÷ 1.10 = 70.", 3, ["$70"]),
    poolChoice("y8-nfm-tax-p14", "Gross weekly pay \\(\\$900\\), tax 25%, levy 2%. What is the take-home pay?", "B", ["$648", "$657", "$675", "$693"], "Tax 225; levy 18; 900 − 225 − 18 = $657.", 3, "900 - 225 - 18 = \\;?"),
    poolAnswer("y8-nfm-tax-p15", "A job is quoted at \\(\\$550\\) plus GST. Find the total the client pays.", "550 \\times 1.10 = \\;?", "605", "550 × 1.10 = 605.", 3, ["$605"]),
    // ── Difficulty 4: larger pay periods / combined ──────────────────────
    poolAnswer("y8-nfm-tax-p16", "Gross fortnightly pay \\(\\$1200\\), tax 22%, levy 2%. Find the take-home pay.", "1200 - 0.22 \\times 1200 - 0.02 \\times 1200 = \\;?", "912", "Tax 264; levy 24; 1200 − 264 − 24 = 912.", 4, ["$912"]),
    poolAnswer("y8-nfm-tax-p17", "Gross monthly pay \\(\\$2600\\), tax 19%, levy 2%. Find the take-home pay.", "2600 - 0.19 \\times 2600 - 0.02 \\times 2600 = \\;?", "2054", "Tax 494; levy 52; 2600 − 494 − 52 = 2054.", 4, ["$2054"]),
    poolAnswer("y8-nfm-tax-p18", "A \\(\\$1320\\) item includes GST. Find the pre-GST price.", "1320 \\div 1.10 = \\;?", "1200", "1320 ÷ 1.10 = 1200.", 4, ["$1200"]),
    poolChoice("y8-nfm-tax-p19", "A \\(\\$960\\) pre-GST quote. What is the GST-inclusive total?", "C", ["$1056", "$96", "$1056 (960 × 1.10)", "$1066"], "960 × 1.10 = $1056.", 4, "960 \\times 1.10 = \\;?"),
    poolAnswer("y8-nfm-tax-p20", "Gross weekly pay \\(\\$1100\\), tax 24%, levy 2%. Find the take-home pay.", "1100 - 0.24 \\times 1100 - 0.02 \\times 1100 = \\;?", "814", "Tax 264; levy 22; 1100 − 264 − 22 = 814.", 4, ["$814"]),
    // ── Difficulty 5: annual / reverse GST reasoning ─────────────────────
    poolAnswer("y8-nfm-tax-p21", "Gross annual salary \\(\\$62400\\), tax 21%, levy 2%. Find the annual take-home pay.", "62400 - 0.21 \\times 62400 - 0.02 \\times 62400 = \\;?", "48048", "Tax 13104; levy 1248; 62400 − 13104 − 1248 = 48048.", 5, ["$48048", "48,048"]),
    poolAnswer("y8-nfm-tax-p22", "The GST portion of a price is \\(\\$45\\). Find the GST-inclusive price.", "45 \\times 11 = \\;?", "495", "GST is 10% of the pre-GST price, so pre-GST = $450; inclusive = $450 + $45 = $495 (= 45 × 11).", 5, ["$495"]),
    poolAnswer("y8-nfm-tax-p23", "An item costs \\(\\$880\\) including GST. How much of this is GST?", "880 - 880 \\div 1.10 = \\;?", "80", "Pre-GST = 880 ÷ 1.10 = 800; GST = 880 − 800 = $80.", 5, ["$80"]),
    poolChoice("y8-nfm-tax-p24", "Gross annual salary \\(\\$80000\\), tax 23%, levy 2%. What is the annual take-home pay?", "A", ["$60000", "$61600", "$58400", "$64000"], "Tax 18400; levy 1600; 80000 − 18400 − 1600 = $60000.", 5, "80000 - 18400 - 1600 = \\;?"),
    poolAnswer("y8-nfm-tax-p25", "Gross monthly pay \\(\\$5000\\), tax 26%, levy 2%. Find the take-home pay.", "5000 - 0.26 \\times 5000 - 0.02 \\times 5000 = \\;?", "3600", "Tax 1300; levy 100; 5000 − 1300 − 100 = 3600.", 5, ["$3600"]),
    poolAnswer("y8-nfm-tax-p26", "An invoice reads \\(\\$2200\\) including GST. Find the pre-GST amount.", "2200 \\div 1.10 = \\;?", "2000", "2200 ÷ 1.10 = 2000.", 5, ["$2000", "2,000"]),
  ],
  multiPartPractice: [
    {
      id: "y8-nfm-tax-mp1",
      prompt:
        "Hannah earns a gross income of \\(\\$900\\) per week. She pays income tax at 20% and the Medicare levy at 2%.",
      latex: "\\text{Gross} = \\$900",
      answer: "702",
      hint: "Find each deduction as a percentage of gross income, then subtract both.",
      explanation:
        "Part (a): income tax = 0.20 × 900 = $180. Part (b): Medicare levy = 0.02 × 900 = $18. Part (c): take-home pay = 900 − 180 − 18 = $702.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the income tax.",
          latex: "0.20 \\times 900",
          marks: 1,
          answer: "180",
          acceptedAnswers: ["$180"],
          hint: "0.20 × 900.",
          explanation: "0.20 × 900 = $180.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the Medicare levy.",
          latex: "0.02 \\times 900",
          marks: 1,
          answer: "18",
          acceptedAnswers: ["$18"],
          hint: "0.02 × 900.",
          explanation: "0.02 × 900 = $18.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the take-home pay.",
          latex: "900 - 180 - 18",
          marks: 2,
          answer: "702",
          acceptedAnswers: ["$702"],
          hint: "Subtract both deductions from gross income.",
          explanation: "900 − 180 − 18 = $702.",
        },
      ],
    },
  ],
};

// ── Lesson 9: Compound Interest Introduction ──────────────────────────────────

const compoundInterestIntroduction: LessonContent = {
  description:
    "Understand how compound interest grows faster than simple interest, apply the formula A = P(1 + r)^n, and compare savings over multiple years in Australian contexts.",
  learningIntention:
    "Calculate compound interest using A = P(1 + r)^n and compare it with simple interest over the same period.",
  successCriteria: [
    "Explain why compound interest earns more than simple interest over time.",
    "Identify P (principal), r (annual rate as a decimal) and n (number of years) from a problem.",
    "Apply the formula $A = P(1 + r)^n$ to find the total amount.",
    "Calculate compound interest earned as I = A − P.",
    "Compare the final amounts under simple interest and compound interest.",
  ],
  teaching: {
    paragraphs: [
      "Simple interest is calculated only on the original principal every year. Compound interest is calculated on the principal plus all the interest that has already been earned — often described as 'interest on interest'. Because the balance grows each year, compound interest produces a larger final amount than simple interest at the same rate over the same period.",
      "The compound interest formula is $A = P(1 + r)^n$, where $A$ is the total amount (principal plus interest), $P$ is the principal, $r$ is the annual interest rate written as a decimal, and $n$ is the number of years. For example, $3000 invested at 5% per year for 4 years: $r = 0.05$, so $A = 3000 \\times (1.05)^4$.",
      "To find the interest earned, subtract the principal: $I = A - P$. A common mistake is to report $A$ as the interest rather than the total amount — always check what the question asks for.",
      "The power $n$ in the formula represents repeated multiplication. For $n = 3$ years at rate $r$, the balance is multiplied by $(1 + r)$ three times in sequence. This is why compound growth is sometimes called 'exponential growth': it accelerates over time rather than growing by the same fixed dollar amount each year.",
      "In Australian banking, savings accounts, term deposits and home loan balances all use compound interest. The difference between simple and compound interest is small over one or two years, but grows significantly over longer periods — which is why starting to save early matters so much.",
    ],
    latexBlocks: [
      "A = P(1 + r)^n",
      "I = A - P",
      "\\text{Example: }P = \\$3000,\\;r = 0.05,\\;n = 4:\\quad A = 3000 \\times (1.05)^4",
    ],
  },
  workedExamples: [
    {
      title: "Find the total amount under compound interest",
      questionLatex: "\\text{Invest }\\$2000\\text{ at }4\\%\\text{ per year compounded annually for 3 years. Find the total amount.}",
      steps: [
        { explanation: "Identify the values. P = 2000, r = 0.04, n = 3.", latex: "r = 4\\% = 0.04" },
        { explanation: "Substitute into the formula.", latex: "A = 2000 \\times (1.04)^3" },
        { explanation: "Calculate $(1.04)^3$.", latex: "(1.04)^3 = 1.124864" },
        { explanation: "Multiply to find A.", latex: "A = 2000 \\times 1.124864 = 2249.73" },
      ],
      finalAnswerLatex: "A \\approx \\$2249.73",
    } as WorkedExample,
    {
      title: "Calculate compound interest earned",
      questionLatex: "\\text{Find the interest earned when }\\$5000\\text{ is invested at }6\\%\\text{ per year for 2 years.}",
      steps: [
        { explanation: "P = 5000, r = 0.06, n = 2.", latex: "A = 5000 \\times (1.06)^2" },
        { explanation: "Calculate $(1.06)^2$.", latex: "(1.06)^2 = 1.1236" },
        { explanation: "Find total amount.", latex: "A = 5000 \\times 1.1236 = 5618" },
        { explanation: "Subtract principal to find interest.", latex: "I = 5618 - 5000 = 618" },
      ],
      finalAnswerLatex: "\\$618",
    } as WorkedExample,
    {
      title: "Compare simple interest and compound interest",
      questionLatex: "\\text{Compare }\\$1000\\text{ at }5\\%\\text{ over 3 years under simple interest and compound interest.}",
      steps: [
        { explanation: "Simple interest.", latex: "I_{\\text{simple}} = \\frac{1000 \\times 5 \\times 3}{100} = \\$150" },
        { explanation: "Total under simple interest.", latex: "A_{\\text{simple}} = 1000 + 150 = \\$1150" },
        { explanation: "Compound interest: A = 1000 × $(1.05)^3$.", latex: "(1.05)^3 = 1.157625" },
        { explanation: "Total under compound interest.", latex: "A_{\\text{compound}} = 1000 \\times 1.157625 = \\$1157.63" },
        { explanation: "Compare.", latex: "\\$1157.63 > \\$1150 \\Rightarrow \\text{compound interest earns more}" },
      ],
      finalAnswerLatex: "\\text{Compound interest gives }\\$7.63\\text{ more}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nfm-cmp-g1",
      "In the formula A = P(1 + r)^n, what does r represent?",
      "C",
      [
        "The number of years",
        "The total amount at the end",
        "The annual interest rate as a decimal",
        "The interest earned",
      ],
      "r is the annual interest rate written as a decimal. For example, 5% becomes r = 0.05."
    ),
    answer(
      "y8-nfm-cmp-g2",
      "Find the total amount when $1000 is invested at 5% per year compounded annually for 2 years.",
      "A = 1000 \\times (1.05)^2 = \\;?",
      "1102.50",
      "(1.05)^2 = 1.1025. A = 1000 × 1.1025 = 1102.50.",
      ["$1102.50", "1102.5"]
    ),
    answer(
      "y8-nfm-cmp-g3",
      "$500 is invested at 4% compound interest for 1 year. Find the total amount.",
      "A = 500 \\times (1.04)^1 = \\;?",
      "520",
      "A = 500 × 1.04 = 520.",
      ["$520"]
    ),
    answer(
      "y8-nfm-cmp-g4",
      "Using the result from the previous question, find the compound interest earned on $500 at 4% for 1 year.",
      "I = 520 - 500 = \\;?",
      "20",
      "I = A − P = 520 − 500 = 20.",
      ["$20"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-nfm-cmp-i1",
      "Find the total amount when $3000 is invested at 3% compound interest per year for 2 years.",
      "A = 3000 \\times (1.03)^2 = \\;?",
      "3182.70",
      "(1.03)^2 = 1.0609. A = 3000 × 1.0609 = 3182.70.",
      ["$3182.70", "3182.7"]
    ),
    answer(
      "y8-nfm-cmp-i2",
      "Find the compound interest earned when $2000 is invested at 5% per year for 3 years.",
      "I = 2000 \\times (1.05)^3 - 2000 = \\;?",
      "315.25",
      "(1.05)^3 = 1.157625. A = 2000 × 1.157625 = 2315.25. I = 2315.25 − 2000 = 315.25.",
      ["$315.25", "315.25"]
    ),
    choice(
      "y8-nfm-cmp-i3",
      "$4000 is invested at 6% per year. After 2 years, which gives a higher total amount?",
      "A",
      [
        "Compound interest: A = 4000 × (1.06)^2 = $4494.40",
        "Simple interest: A = 4000 + (4000 × 6 × 2 ÷ 100) = $4480",
        "Both give the same total",
        "Simple interest always gives a higher total",
      ],
      "Compound: 4000 × (1.06)^2 = 4000 × 1.1236 = $4494.40. Simple: 4000 + 480 = $4480. Compound interest gives more.",
      "\\text{Compare simple vs compound on }\\$4000\\text{ at }6\\%\\text{ for 2 years}"
    ),
    answer(
      "y8-nfm-cmp-i4",
      "$1500 is invested at 10% per year compounded annually for 3 years. Find the total amount.",
      "A = 1500 \\times (1.10)^3 = \\;?",
      "1996.50",
      "(1.10)^3 = 1.331. A = 1500 × 1.331 = 1996.50.",
      ["$1996.50", "1996.5"]
    ),
    answer(
      "y8-nfm-cmp-i5",
      "$800 is invested at 2% compound interest per year for 4 years. Find the interest earned.",
      "I = 800 \\times (1.02)^4 - 800 = \\;?",
      "65.94",
      "$(1.02)^4 = 1.08243216$. A = 800 × 1.08243216 ≈ 865.95. I = 865.95 − 800 = 65.95. (Accept answers in the range 65.94–65.95.)",
      ["$65.94", "65.95", "$65.95"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Reporting A as the interest earned rather than the total amount: confusing A = P(1+r)^n with the interest I.",
      fix: "A is the total amount. To find interest, subtract the principal: I = A − P.",
    },
    {
      mistake: "Using the percentage directly as r instead of the decimal: substituting r = 5 instead of r = 0.05.",
      fix: "Convert the percentage to a decimal before substituting: 5% → r = 0.05.",
    },
    {
      mistake: "Adding interest to the principal only once (simple interest method) instead of applying (1 + r)^n.",
      fix: "Compound interest requires raising (1 + r) to the power n. Use the formula A = P(1 + r)^n.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-nfm-cmp-m1",
      "Which statement correctly explains why compound interest earns more than simple interest?",
      "B",
      [
        "The interest rate is higher for compound interest",
        "Compound interest earns interest on both the principal and the previously earned interest",
        "Compound interest is calculated over a shorter time period",
        "Simple interest applies to loans; compound interest applies to savings only",
      ],
      "Compound interest earns 'interest on interest'. Each year, interest is calculated on the growing balance, not just the original principal."
    ),
    choice(
      "y8-nfm-cmp-m2",
      "In A = P(1 + r)^n, which correctly represents P = $2000 at r = 3% for n = 4 years?",
      "C",
      [
        "A = 2000 × (1 + 3)^4",
        "A = 2000 × (0.03)^4",
        "A = 2000 × (1.03)^4",
        "A = 2000 × 1.03 × 4",
      ],
      "r = 3% = 0.03, so (1 + r) = 1.03. The formula becomes $A = 2000 × (1.03)^4$."
    ),
    answer(
      "y8-nfm-cmp-m3",
      "Find the total amount when $500 is invested at 6% compound interest per year for 2 years.",
      "A = 500 \\times (1.06)^2 = \\;?",
      "561.80",
      "(1.06)^2 = 1.1236. A = 500 × 1.1236 = 561.80.",
      ["$561.80", "561.8"]
    ),
    answer(
      "y8-nfm-cmp-m4",
      "Find the compound interest earned on $1000 at 4% per year for 3 years.",
      "I = 1000 \\times (1.04)^3 - 1000 = \\;?",
      "124.86",
      "(1.04)^3 = 1.124864. A = 1000 × 1.124864 = 1124.86. I = 1124.86 − 1000 = 124.86.",
      ["$124.86", "124.86"]
    ),
    answer(
      "y8-nfm-cmp-m5",
      "$2500 is invested at 5% per year compounded annually for 2 years. Find the total amount.",
      "A = 2500 \\times (1.05)^2 = \\;?",
      "2756.25",
      "(1.05)^2 = 1.1025. A = 2500 × 1.1025 = 2756.25.",
      ["$2756.25"]
    ),
    answer(
      "y8-nfm-cmp-m6",
      "$6000 is invested at 3% simple interest for 4 years. Find the total amount.",
      "A = 6000 + \\frac{6000 \\times 3 \\times 4}{100} = \\;?",
      "6720",
      "I = (6000 × 3 × 4) ÷ 100 = 720. A = 6000 + 720 = 6720.",
      ["$6720"]
    ),
    answer(
      "y8-nfm-cmp-m7",
      "$6000 is invested at 3% compound interest per year for 4 years. Find the total amount.",
      "A = 6000 \\times (1.03)^4 = \\;?",
      "6753.05",
      "(1.03)^4 = 1.12550881. A = 6000 × 1.12550881 ≈ 6753.05. (Accept 6752–6754.)",
      ["6753.05", "$6753.05", "6753"]
    ),
    answer(
      "y8-nfm-cmp-m8",
      "Using questions m6 and m7, by how much more does compound interest earn over 4 years on $6000 at 3%?",
      "\\text{Compound total} - \\text{Simple total}",
      "33.05",
      "Compound total ≈ 6753.05. Simple total = 6720. Difference: 6753.05 − 6720 = 33.05.",
      ["$33.05", "33.05", "33.19", "$33.19"]
    ),
    answer(
      "y8-nfm-cmp-m9",
      "$10 000 is invested at 8% compound interest per year for 3 years. Find the total amount.",
      "A = 10000 \\times (1.08)^3 = \\;?",
      "12597.12",
      "(1.08)^3 = 1.259712. A = 10000 × 1.259712 = 12597.12.",
      ["$12597.12", "12597.12", "12597"]
    ),
    answer(
      "y8-nfm-cmp-m10",
      "Ella invests $4000 at 5% compound interest per year. Ben invests $4000 at 5% simple interest. Both invest for 3 years. How much more does Ella have at the end?",
      "4000 \\times (1.05)^3 - \\left(4000 + \\frac{4000 \\times 5 \\times 3}{100}\\right) = \\;?",
      "30.50",
      "Compound: (1.05)^3 = 1.157625; A = 4000 × 1.157625 = 4630.50. Simple: I = (4000 × 5 × 3) ÷ 100 = 600; A = 4600. Difference: 4630.50 − 4600 = 30.50.",
      ["$30.50", "30.50"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: concept / one-year growth ─────────────────────────
    poolChoice("y8-nfm-cmp-p1", "In A = P(1 + r)^n, what does n represent?", "B", ["The interest rate", "The number of years", "The total amount", "The principal"], "n is the number of years (compounding periods).", 1, "\\text{Meaning of }n"),
    poolAnswer("y8-nfm-cmp-p2", "Find the total amount when \\(\\$100\\) is invested at 10% compound interest for 1 year.", "A = 100 \\times (1.10)^1 = \\;?", "110", "100 × 1.10 = 110.", 1, ["$110"]),
    poolAnswer("y8-nfm-cmp-p3", "Find the total amount when \\(\\$200\\) is invested at 5% compound interest for 1 year.", "A = 200 \\times (1.05)^1 = \\;?", "210", "200 × 1.05 = 210.", 1, ["$210"]),
    poolChoice("y8-nfm-cmp-p4", "Written as a decimal, what is r for a 4% rate?", "C", ["4", "0.4", "0.04", "1.04"], "4% = 0.04.", 1, "\\text{Decimal for }4\\%"),
    poolAnswer("y8-nfm-cmp-p5", "Find the total amount when \\(\\$500\\) is invested at 2% compound interest for 1 year.", "A = 500 \\times (1.02)^1 = \\;?", "510", "500 × 1.02 = 510.", 1, ["$510"]),
    // ── Difficulty 2: two-year growth ────────────────────────────────────
    poolAnswer("y8-nfm-cmp-p6", "Find the total amount when \\(\\$1000\\) is invested at 5% compound interest for 2 years.", "A = 1000 \\times (1.05)^2 = \\;?", "1102.50", "(1.05)^2 = 1.1025; 1000 × 1.1025 = 1102.50.", 2, ["$1102.50", "1102.5"]),
    poolAnswer("y8-nfm-cmp-p7", "Find the total amount when \\(\\$2000\\) is invested at 10% compound interest for 2 years.", "A = 2000 \\times (1.10)^2 = \\;?", "2420", "(1.10)^2 = 1.21; 2000 × 1.21 = 2420.", 2, ["$2420"]),
    poolAnswer("y8-nfm-cmp-p8", "Find the total amount when \\(\\$500\\) is invested at 6% compound interest for 2 years.", "A = 500 \\times (1.06)^2 = \\;?", "561.80", "(1.06)^2 = 1.1236; 500 × 1.1236 = 561.80.", 2, ["$561.80", "561.8"]),
    poolChoice("y8-nfm-cmp-p9", "What is the total amount when \\(\\$1000\\) is invested at 4% compound interest for 2 years?", "A", ["$1081.60", "$1080", "$1040", "$1160"], "(1.04)^2 = 1.0816; 1000 × 1.0816 = $1081.60.", 2, "A = 1000 \\times (1.04)^2 = \\;?"),
    poolAnswer("y8-nfm-cmp-p10", "Find the total amount when \\(\\$2500\\) is invested at 5% compound interest for 2 years.", "A = 2500 \\times (1.05)^2 = \\;?", "2756.25", "(1.05)^2 = 1.1025; 2500 × 1.1025 = 2756.25.", 2, ["$2756.25"]),
    // ── Difficulty 3: three-year growth / interest earned ────────────────
    poolAnswer("y8-nfm-cmp-p11", "Find the total amount when \\(\\$1000\\) is invested at 10% compound interest for 3 years.", "A = 1000 \\times (1.10)^3 = \\;?", "1331", "(1.10)^3 = 1.331; 1000 × 1.331 = 1331.", 3, ["$1331"]),
    poolAnswer("y8-nfm-cmp-p12", "Find the compound interest earned when \\(\\$1000\\) is invested at 4% for 3 years.", "I = 1000 \\times (1.04)^3 - 1000 = \\;?", "124.86", "(1.04)^3 = 1.124864; A = 1124.86; I = 124.86.", 3, ["$124.86"]),
    poolAnswer("y8-nfm-cmp-p13", "Find the total amount when \\(\\$3000\\) is invested at 3% compound interest for 2 years.", "A = 3000 \\times (1.03)^2 = \\;?", "3182.70", "(1.03)^2 = 1.0609; 3000 × 1.0609 = 3182.70.", 3, ["$3182.70", "3182.7"]),
    poolChoice("y8-nfm-cmp-p14", "What is the total amount when \\(\\$1500\\) is invested at 10% compound interest for 3 years?", "B", ["$1950", "$1996.50", "$2000", "$1815"], "(1.10)^3 = 1.331; 1500 × 1.331 = $1996.50.", 3, "A = 1500 \\times (1.10)^3 = \\;?"),
    poolAnswer("y8-nfm-cmp-p15", "Find the compound interest earned when \\(\\$2000\\) is invested at 5% for 3 years.", "I = 2000 \\times (1.05)^3 - 2000 = \\;?", "315.25", "(1.05)^3 = 1.157625; A = 2315.25; I = 315.25.", 3, ["$315.25"]),
    // ── Difficulty 4: compare simple vs compound / larger ────────────────
    poolAnswer("y8-nfm-cmp-p16", "Find the total amount when \\(\\$6000\\) is invested at 3% compound interest for 4 years.", "A = 6000 \\times (1.03)^4 = \\;?", "6753.05", "(1.03)^4 = 1.12550881; 6000 × 1.12550881 ≈ 6753.05.", 4, ["$6753.05", "6753"]),
    poolAnswer("y8-nfm-cmp-p17", "Find the total amount when \\(\\$10000\\) is invested at 8% compound interest for 3 years.", "A = 10000 \\times (1.08)^3 = \\;?", "12597.12", "(1.08)^3 = 1.259712; 10000 × 1.259712 = 12597.12.", 4, ["$12597.12", "12597"]),
    poolChoice("y8-nfm-cmp-p18", "\\(\\$4000\\) at 6% for 2 years: which is the higher total?", "A", ["Compound: $4494.40", "Simple: $4480", "Both equal", "Simple is always higher"], "Compound 4000 × (1.06)^2 = $4494.40 > simple $4480.", 4, "\\text{Compare on }\\$4000\\text{ at }6\\%\\text{ for 2 yr}"),
    poolAnswer("y8-nfm-cmp-p19", "Find the compound interest earned when \\(\\$800\\) is invested at 2% for 4 years.", "I = 800 \\times (1.02)^4 - 800 = \\;?", "65.94", "(1.02)^4 = 1.08243216; A ≈ 865.95; I ≈ 65.95.", 4, ["$65.95", "65.95", "65.94"]),
    poolAnswer("y8-nfm-cmp-p20", "Find the total amount when \\(\\$5000\\) is invested at 6% compound interest for 2 years.", "A = 5000 \\times (1.06)^2 = \\;?", "5618", "(1.06)^2 = 1.1236; 5000 × 1.1236 = 5618.", 4, ["$5618"]),
    // ── Difficulty 5: compound vs simple difference / multi-step ─────────
    poolAnswer("y8-nfm-cmp-p21", "\\(\\$6000\\) at 3% for 4 years: how much more does compound interest earn than simple interest?", "6000 \\times (1.03)^4 - \\left(6000 + \\frac{6000 \\times 3 \\times 4}{100}\\right) = \\;?", "33.05", "Compound ≈ 6753.05; simple = 6000 + 720 = 6720; difference ≈ 33.05.", 5, ["$33.05", "33.05"]),
    poolAnswer("y8-nfm-cmp-p22", "\\(\\$4000\\) at 5% for 3 years: how much more is the compound total than the simple total?", "4000 \\times (1.05)^3 - \\left(4000 + \\frac{4000 \\times 5 \\times 3}{100}\\right) = \\;?", "30.50", "Compound = 4630.50; simple = 4600; difference = 30.50.", 5, ["$30.50", "30.50"]),
    poolAnswer("y8-nfm-cmp-p23", "Find the total amount when \\(\\$2000\\) is invested at 4% compound interest for 3 years.", "A = 2000 \\times (1.04)^3 = \\;?", "2249.73", "(1.04)^3 = 1.124864; 2000 × 1.124864 ≈ 2249.73.", 5, ["$2249.73", "2249.73"]),
    poolChoice("y8-nfm-cmp-p24", "\\(\\$1000\\) at 5% for 3 years: by how much does compound interest beat simple interest?", "C", ["$0", "$5.00", "$7.63", "$15.00"], "Compound = 1000 × 1.157625 = 1157.63; simple = 1150; difference = $7.63.", 5, "\\text{Compound total} - \\text{simple total}"),
    poolAnswer("y8-nfm-cmp-p25", "Find the total amount when \\(\\$1200\\) is invested at 5% compound interest for 3 years.", "A = 1200 \\times (1.05)^3 = \\;?", "1389.15", "(1.05)^3 = 1.157625; 1200 × 1.157625 = 1389.15.", 5, ["$1389.15"]),
    poolAnswer("y8-nfm-cmp-p26", "Find the compound interest earned when \\(\\$5000\\) is invested at 6% for 2 years.", "I = 5000 \\times (1.06)^2 - 5000 = \\;?", "618", "(1.06)^2 = 1.1236; A = 5618; I = 618.", 5, ["$618"]),
  ],
  multiPartPractice: [
    {
      id: "y8-nfm-cmp-mp1",
      prompt:
        "Sophie invests \\(\\$2000\\) at 5% per year, compounded annually. She leaves it for 2 years. A friend invests the same \\(\\$2000\\) at 5% simple interest for 2 years.",
      latex: "A = P(1 + r)^n,\\quad P = \\$2000,\\; r = 0.05",
      answer: "5",
      hint: "Use $A = P(1 + r)^n$ for compound, and I = PRT ÷ 100 for simple.",
      explanation:
        "Part (a): A = 2000 × \\((1.05)^2\\) = 2000 × 1.1025 = $2205. Part (b): simple I = (2000 × 5 × 2) ÷ 100 = $200, so total = $2200. Part (c): compound total − simple total = 2205 − 2200 = $5.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find Sophie's total amount after 2 years (compound interest).",
          latex: "2000 \\times (1.05)^2",
          marks: 2,
          answer: "2205",
          acceptedAnswers: ["$2205"],
          hint: "$(1.05)^2 = 1.1025$.",
          explanation: "2000 × 1.1025 = $2205.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the friend's total amount after 2 years (simple interest).",
          latex: "2000 + \\frac{2000 \\times 5 \\times 2}{100}",
          marks: 1,
          answer: "2200",
          acceptedAnswers: ["$2200"],
          hint: "Simple interest = (2000 × 5 × 2) ÷ 100 = $200.",
          explanation: "2000 + 200 = $2200.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How much more does Sophie have than her friend?",
          latex: "2205 - 2200",
          marks: 1,
          answer: "5",
          acceptedAnswers: ["$5"],
          hint: "Subtract the simple total from the compound total.",
          explanation: "$2205 − $2200 = $5.",
        },
      ],
    },
  ],
};

// ── Lesson 10: Budgeting and Money Management ─────────────────────────────────

const budgetingAndMoneyManagement: LessonContent = {
  description:
    "Create and analyse a simple weekly or monthly budget, distinguish fixed from variable expenses, calculate surplus or deficit, and make evidence-based financial decisions in real-world Australian contexts.",
  learningIntention:
    "Create a simple budget, identify surplus or deficit, and calculate savings rate as a percentage of income.",
  successCriteria: [
    "Distinguish between fixed expenses (rent, phone plan) and variable expenses (food, entertainment).",
    "List income and expenses, then calculate whether a budget is in surplus or deficit.",
    "Calculate the percentage of income spent on a category.",
    "Calculate savings rate: savings ÷ income × 100%.",
    "Identify which expenses to cut to eliminate a deficit.",
    "Determine how many weeks of saving are needed to reach a savings goal.",
  ],
  teaching: {
    paragraphs: [
      "A budget is a plan that lists all the money coming in (income) and all the money going out (expenses) over a set period — usually a week or a month. Income includes wages, allowances or any other money received. Expenses are what you spend. If income exceeds expenses, the budget is in surplus (you save money). If expenses exceed income, the budget is in deficit (you are spending more than you earn and may go into debt).",
      "Expenses fall into two types. Fixed expenses are the same every period and are hard to change — for example, rent, a phone plan or a subscription service. Variable expenses change from week to week and are easier to control — for example, groceries, eating out or entertainment. Identifying variable expenses is the first step when you need to cut spending.",
      "A common misconception is that 'expenses will sort themselves out' over time. In reality, a deficit does not correct itself — it compounds. Each week in deficit means borrowing more or depleting savings, which makes it harder to recover. The only reliable fix is to deliberately reduce spending or increase income.",
      "To find the percentage of income spent on a category, divide the category's expense by total income and multiply by 100. For example, if rent is $150 out of a $400 weekly income, rent consumes 150 ÷ 400 × 100 = 37.5% of income. Financial advisers in Australia often use the 50/30/20 guideline: roughly 50% on needs, 30% on wants, and 20% on savings.",
      "The savings rate measures how efficiently you are saving. Savings rate = savings ÷ income × 100%. Savings = income − expenses. To find how many weeks to save for a goal, divide the goal amount by the weekly surplus.",
    ],
    latexBlocks: [
      "\\text{Surplus / Deficit} = \\text{Income} - \\text{Total expenses}",
      "\\text{Percentage of income} = \\frac{\\text{Category expense}}{\\text{Income}} \\times 100",
      "\\text{Savings rate} = \\frac{\\text{Savings}}{\\text{Income}} \\times 100",
      "\\text{Weeks to goal} = \\frac{\\text{Savings goal}}{\\text{Weekly surplus}}",
    ],
  },
  workedExamples: [
    {
      title: "Identify surplus or deficit from a weekly budget",
      questionLatex:
        "\\text{Aisha earns }\\$480\\text{ per week. Her expenses: rent }\\$160,\\text{ food }\\$90,\\text{ transport }\\$40,\\text{ phone }\\$30,\\text{ entertainment }\\$60.\\text{ Is her budget in surplus or deficit?}",
      steps: [
        { explanation: "Add all expenses.", latex: "160 + 90 + 40 + 30 + 60 = 380" },
        { explanation: "Subtract total expenses from income.", latex: "480 - 380 = 100" },
        { explanation: "A positive result means surplus.", latex: "\\text{Surplus of }\\$100\\text{ per week}" },
      ],
      finalAnswerLatex: "\\text{Surplus of }\\$100",
    } as WorkedExample,
    {
      title: "Calculate the savings rate",
      questionLatex:
        "\\text{Ben earns }\\$600\\text{ per week and spends }\\$480.\\text{ Find his savings rate.}",
      steps: [
        { explanation: "Find weekly savings.", latex: "600 - 480 = 120" },
        { explanation: "Divide savings by income and multiply by 100.", latex: "\\frac{120}{600} \\times 100 = 20\\%" },
      ],
      finalAnswerLatex: "20\\%\\text{ savings rate}",
    } as WorkedExample,
    {
      title: "Weeks to reach a savings goal",
      questionLatex:
        "\\text{Caitlin saves }\\$75\\text{ per week. She wants to buy a }\\$900\\text{ laptop. How many weeks will it take?}",
      steps: [
        { explanation: "Divide the goal by the weekly surplus.", latex: "900 \\div 75 = 12" },
      ],
      finalAnswerLatex: "12\\text{ weeks}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nfm-bud-g1",
      "A student earns $400 per week and spends $350. What is the weekly surplus?",
      "B",
      ["$350", "$50", "$750", "$400"],
      "Surplus = Income − Expenses = $400 − $350 = $50.",
      "\\$400 - \\$350 = \\;?"
    ),
    choice(
      "y8-nfm-bud-g2",
      "Which of the following is a fixed expense?",
      "C",
      [
        "Money spent on coffee",
        "Weekly grocery shopping",
        "A monthly phone plan at $45",
        "Weekend entertainment",
      ],
      "A fixed expense is the same every period and is hard to change. A monthly phone plan at $45 does not change week to week."
    ),
    answer(
      "y8-nfm-bud-g3",
      "Jordan's weekly income is $520. His expenses are: rent $180, food $110, transport $50, phone $35, entertainment $80. Calculate total expenses and state whether the budget is in surplus or deficit.",
      "\\text{Total expenses} = 180 + 110 + 50 + 35 + 80 = \\;?",
      "455",
      "Total expenses = 455. Income $520 − $455 = $65 surplus.",
      ["surplus", "$455 surplus", "65"]
    ),
    answer(
      "y8-nfm-bud-g4",
      "Mia earns $400 per week. She spends $160 on rent. What percentage of her income is spent on rent?",
      "\\frac{160}{400} \\times 100 = \\;?",
      "40",
      "160 ÷ 400 × 100 = 40%.",
      ["40%"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-nfm-bud-i1",
      "Liam saves $60 per week. How much does he save in a month (4 weeks)?",
      "60 \\times 4 = \\;?",
      "240",
      "60 × 4 = 240.",
      ["$240"]
    ),
    choice(
      "y8-nfm-bud-i2",
      "A student's weekly budget is in deficit by $30. Which single change would increase the surplus the most?",
      "D",
      [
        "Spend $5 less on coffee",
        "Switch to a slightly cheaper phone plan saving $2/week",
        "Skip one entertainment outing saving $20/week",
        "Reduce eating out from $80 to $40 per week, saving $40/week",
      ],
      "Saving $40 per week by reducing eating out eliminates the $30 deficit and leaves a $10 surplus — the largest improvement."
    ),
    answer(
      "y8-nfm-bud-i3",
      "Sophie earns $550 per week. After expenses she has a deficit of $20. List two variable expenses she could reduce. Then state the minimum total reduction needed to break even.",
      "\\text{Minimum reduction} = \\;?",
      "20",
      "To break even, Sophie must cut at least $20 in total from variable expenses such as food and entertainment.",
      ["$20"]
    ),
    answer(
      "y8-nfm-bud-i4",
      "Noah earns $480 per week and spends $384. Calculate his savings rate as a percentage.",
      "\\frac{480 - 384}{480} \\times 100 = \\;?",
      "20",
      "Savings = 480 − 384 = 96. Savings rate = 96 ÷ 480 × 100 = 20%.",
      ["20%"]
    ),
    answer(
      "y8-nfm-bud-i5",
      "Ava saves $65 per week. She wants to buy a $520 phone. How many weeks will it take?",
      "520 \\div 65 = \\;?",
      "8",
      "520 ÷ 65 = 8 weeks.",
      ["8 weeks"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding income and expenses together instead of subtracting to find surplus or deficit.",
      fix: "Surplus/Deficit = Income − Total expenses. A positive result is a surplus; a negative result is a deficit.",
    },
    {
      mistake: "Assuming 'expenses will sort themselves out' without making deliberate cuts.",
      fix: "A deficit does not correct itself. Identify which variable expenses to reduce and set a specific target.",
    },
    {
      mistake: "Calculating the savings rate as savings ÷ expenses instead of savings ÷ income.",
      fix: "Savings rate = savings ÷ income × 100%. Always divide by total income, not by expenses.",
    },
    {
      mistake: "Confusing fixed and variable expenses when deciding what to cut.",
      fix: "Fixed expenses (rent, phone plan) are hard to change quickly. Focus on variable expenses (food, entertainment) when cutting spending.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-nfm-bud-m1",
      "A household's weekly income is $1200. Their phone bill rises from $80 to $110 per month. By how much does the monthly surplus decrease?",
      "B",
      ["$80", "$30", "$110", "$1170"],
      "The phone bill increases by $110 − $80 = $30 per month, so the monthly surplus decreases by $30.",
      "\\$110 - \\$80 = \\;?"
    ),
    choice(
      "y8-nfm-bud-m2",
      "Which strategy is most effective for saving for a holiday in 3 months?",
      "A",
      [
        "Set a fixed weekly savings target and cut variable expenses to meet it",
        "Spend normally and save whatever is left over each week",
        "Use a credit card for all purchases and pay it off after the holiday",
        "Reduce income tax by working fewer hours",
      ],
      "Setting a fixed weekly savings target with deliberate expense cuts is the most reliable strategy. Saving 'whatever is left' rarely achieves a specific goal."
    ),
    answer(
      "y8-nfm-bud-m3",
      "A family earns $3200 per month. Expenses: mortgage $1100, groceries $600, utilities $200, transport $250, entertainment $300, clothing $150. Calculate the monthly surplus and savings rate.",
      "\\text{Surplus} = 3200 - (1100+600+200+250+300+150) = \\;?",
      "600",
      "Total expenses = 2600. Surplus = 3200 − 2600 = 600. Savings rate = 600 ÷ 3200 × 100 = 18.75%.",
      ["$600"]
    ),
    answer(
      "y8-nfm-bud-m4",
      "Using the family budget from m3, what percentage of monthly income is spent on groceries?",
      "\\frac{600}{3200} \\times 100 = \\;?",
      "18.75",
      "600 ÷ 3200 × 100 = 18.75%.",
      ["18.75%"]
    ),
    answer(
      "y8-nfm-bud-m5",
      "The family in m3 wants to save $1800 for a holiday. At their current surplus of $600 per month, how many months will it take?",
      "1800 \\div 600 = \\;?",
      "3",
      "1800 ÷ 600 = 3 months.",
      ["3 months"]
    ),
    answer(
      "y8-nfm-bud-m6",
      "Compare Budget A (income $700, expenses $630) and Budget B (income $850, expenses $795). Which has the higher savings rate?",
      "\\text{Compare } \\frac{70}{700} \\text{ vs } \\frac{55}{850}",
      "Budget A",
      "Budget A savings rate = 70 ÷ 700 × 100 = 10%. Budget B savings rate = 55 ÷ 850 × 100 ≈ 6.47%. Budget A has the higher savings rate.",
      ["A", "budget a"]
    ),
    answer(
      "y8-nfm-bud-m7",
      "A teenager earns $320 per week from a part-time job. Fixed expenses: phone $40, transport $30. Variable expenses: food $60, entertainment $50, clothing $40. Calculate the surplus and savings rate.",
      "\\text{Surplus} = 320 - (40+30+60+50+40) = \\;?",
      "100",
      "Total expenses = 220. Surplus = 320 − 220 = 100. Savings rate = 100 ÷ 320 × 100 = 31.25%.",
      ["$100"]
    ),
    answer(
      "y8-nfm-bud-m8",
      "The teenager in m7 wants to buy a $400 gaming console. If they save their full surplus of $100 per week, how many weeks will it take?",
      "400 \\div 100 = \\;?",
      "4",
      "400 ÷ 100 = 4 weeks.",
      ["4 weeks"]
    ),
    answer(
      "y8-nfm-bud-m9",
      "A student's monthly income is $1400 but their expenses total $1550. By how much must they reduce monthly expenses to achieve a 10% savings rate?",
      "\\text{Target expenses} = 1400 - 0.10 \\times 1400 = \\;?",
      "290",
      "Target savings = 10% × 1400 = 140. Target expenses = 1400 − 140 = 1260. Current expenses = 1550. Reduction needed = 1550 − 1260 = 290. (Answer 290 also accepted.)",
      ["290", "$290"]
    ),
    answer(
      "y8-nfm-bud-m10",
      "A household has two budget options. Option 1: income $2800, expenses $2380. Option 2: income $3200, expenses $2880. Which option has the higher savings rate and by how much?",
      "\\text{Compare savings rates of the two options}",
      "Option 1",
      "Option 1: savings = 420, rate = 420 ÷ 2800 × 100 = 15%. Option 2: savings = 320, rate = 320 ÷ 3200 × 100 = 10%. Option 1 has a higher savings rate by 5 percentage points.",
      ["option 1", "1", "15%"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: surplus/deficit / fixed vs variable ───────────────
    poolChoice("y8-nfm-bud-p1", "Income is \\(\\$400\\), expenses are \\(\\$350\\). What is the surplus?", "B", ["$350", "$50", "$750", "$400"], "400 − 350 = $50 surplus.", 1, "400 - 350 = \\;?"),
    poolAnswer("y8-nfm-bud-p2", "Income \\(\\$500\\), expenses \\(\\$420\\). Find the surplus.", "500 - 420 = \\;?", "80", "500 − 420 = 80.", 1, ["$80"]),
    poolChoice("y8-nfm-bud-p3", "Which is a fixed expense?", "C", ["Eating out", "Groceries", "A monthly $45 phone plan", "Movie tickets"], "A fixed expense stays the same each period; a phone plan is fixed.", 1, "\\text{Identify the fixed expense.}"),
    poolAnswer("y8-nfm-bud-p4", "A person saves \\(\\$50\\) per week. How much in 6 weeks?", "50 \\times 6 = \\;?", "300", "50 × 6 = 300.", 1, ["$300"]),
    poolChoice("y8-nfm-bud-p5", "Income \\(\\$300\\), expenses \\(\\$340\\). What is the result?", "A", ["Deficit of $40", "Surplus of $40", "Surplus of $640", "Break even"], "300 − 340 = −40, a $40 deficit.", 1, "300 - 340 = \\;?"),
    // ── Difficulty 2: percentages of income / weeks to goal ─────────────
    poolAnswer("y8-nfm-bud-p6", "Income \\(\\$400\\), rent \\(\\$120\\). What percentage of income is rent?", "\\frac{120}{400} \\times 100 = \\;?", "30", "120 ÷ 400 × 100 = 30%.", 2, ["30%"]),
    poolAnswer("y8-nfm-bud-p7", "Saving \\(\\$60\\) per week toward a \\(\\$480\\) goal. How many weeks?", "480 \\div 60 = \\;?", "8", "480 ÷ 60 = 8 weeks.", 2, ["8 weeks"]),
    poolAnswer("y8-nfm-bud-p8", "Income \\(\\$520\\); expenses total \\(\\$455\\). Find the surplus.", "520 - 455 = \\;?", "65", "520 − 455 = 65.", 2, ["$65"]),
    poolChoice("y8-nfm-bud-p9", "Income \\(\\$600\\), food \\(\\$90\\). What percentage of income is food?", "B", ["10%", "15%", "20%", "9%"], "90 ÷ 600 × 100 = 15%.", 2, "\\frac{90}{600} \\times 100 = \\;?"),
    poolAnswer("y8-nfm-bud-p10", "Saving \\(\\$75\\) per week toward a \\(\\$900\\) goal. How many weeks?", "900 \\div 75 = \\;?", "12", "900 ÷ 75 = 12 weeks.", 2, ["12 weeks"]),
    // ── Difficulty 3: savings rate ───────────────────────────────────────
    poolAnswer("y8-nfm-bud-p11", "Income \\(\\$600\\), expenses \\(\\$480\\). Find the savings rate (%).", "\\frac{600 - 480}{600} \\times 100 = \\;?", "20", "Savings 120; 120 ÷ 600 × 100 = 20%.", 3, ["20%"]),
    poolAnswer("y8-nfm-bud-p12", "Income \\(\\$800\\), expenses \\(\\$680\\). Find the savings rate (%).", "\\frac{800 - 680}{800} \\times 100 = \\;?", "15", "Savings 120; 120 ÷ 800 × 100 = 15%.", 3, ["15%"]),
    poolAnswer("y8-nfm-bud-p13", "Income \\(\\$480\\), expenses \\(\\$384\\). Find the savings rate (%).", "\\frac{480 - 384}{480} \\times 100 = \\;?", "20", "Savings 96; 96 ÷ 480 × 100 = 20%.", 3, ["20%"]),
    poolChoice("y8-nfm-bud-p14", "Income \\(\\$1000\\), expenses \\(\\$750\\). What is the savings rate?", "C", ["15%", "20%", "25%", "30%"], "Savings 250; 250 ÷ 1000 × 100 = 25%.", 3, "\\frac{250}{1000} \\times 100 = \\;?"),
    poolAnswer("y8-nfm-bud-p15", "A \\(\\$3200\\) monthly income with \\(\\$2600\\) expenses. Find the monthly surplus.", "3200 - 2600 = \\;?", "600", "3200 − 2600 = 600.", 3, ["$600"]),
    // ── Difficulty 4: multi-item budgets / break-even ────────────────────
    poolAnswer("y8-nfm-bud-p16", "Income \\(\\$520\\). Expenses: \\(\\$180\\), \\(\\$110\\), \\(\\$50\\), \\(\\$35\\), \\(\\$80\\). Find the surplus.", "520 - (180+110+50+35+80) = \\;?", "65", "Total expenses 455; 520 − 455 = 65.", 4, ["$65"]),
    poolAnswer("y8-nfm-bud-p17", "Monthly income \\(\\$1400\\), expenses \\(\\$1550\\). How much must expenses be cut to break even?", "1550 - 1400 = \\;?", "150", "Deficit = 1550 − 1400 = $150, so cut $150 to break even.", 4, ["$150"]),
    poolChoice("y8-nfm-bud-p18", "A \\(\\$30/\\text{week}\\) deficit. Which cut removes it best?", "D", ["Save $5 on coffee", "Save $2 on phone plan", "Save $20 skipping an outing", "Cut eating out by $40/week"], "Cutting $40 removes the $30 deficit and leaves a $10 surplus.", 4, "\\text{Which cut best fixes a }\\$30\\text{ deficit?}"),
    poolAnswer("y8-nfm-bud-p19", "Monthly income \\(\\$3200\\), surplus \\(\\$600\\). Savings goal \\(\\$1800\\). How many months?", "1800 \\div 600 = \\;?", "3", "1800 ÷ 600 = 3 months.", 4, ["3 months"]),
    poolAnswer("y8-nfm-bud-p20", "Income \\(\\$320\\). Expenses: \\(\\$40\\), \\(\\$30\\), \\(\\$60\\), \\(\\$50\\), \\(\\$40\\). Find the savings rate (%).", "\\frac{320 - 220}{320} \\times 100 = \\;?", "31.25", "Total expenses 220; savings 100; 100 ÷ 320 × 100 = 31.25%.", 4, ["31.25%"]),
    // ── Difficulty 5: compare budgets / reverse target ───────────────────
    poolChoice("y8-nfm-bud-p21", "Budget A: income \\(\\$700\\), expenses \\(\\$630\\). Budget B: income \\(\\$850\\), expenses \\(\\$795\\). Higher savings rate?", "A", ["Budget A (10%)", "Budget B (6.47%)", "Both equal", "Cannot tell"], "A: 70 ÷ 700 = 10%. B: 55 ÷ 850 ≈ 6.47%. A is higher.", 5, "\\text{Compare savings rates}"),
    poolAnswer("y8-nfm-bud-p22", "Monthly income \\(\\$1400\\), expenses \\(\\$1550\\). What expense reduction gives a 10% savings rate?", "1550 - (1400 - 0.10 \\times 1400) = \\;?", "290", "Target expenses = 1400 − 140 = 1260; reduction = 1550 − 1260 = $290.", 5, ["$290"]),
    poolAnswer("y8-nfm-bud-p23", "Option 1: income \\(\\$2800\\), expenses \\(\\$2380\\). Find its savings rate (%).", "\\frac{2800 - 2380}{2800} \\times 100 = \\;?", "15", "Savings 420; 420 ÷ 2800 × 100 = 15%.", 5, ["15%"]),
    poolAnswer("y8-nfm-bud-p24", "A family wants a 20% savings rate on \\(\\$3000\\) income. What is the maximum they can spend?", "3000 - 0.20 \\times 3000 = \\;?", "2400", "Target savings = $600; max expenses = 3000 − 600 = $2400.", 5, ["$2400"]),
    poolChoice("y8-nfm-bud-p25", "Income \\(\\$2000\\), savings goal rate 25%. What weekly saving is required?", "B", ["$400", "$500", "$250", "$600"], "0.25 × 2000 = $500.", 5, "0.25 \\times 2000 = \\;?"),
    poolAnswer("y8-nfm-bud-p26", "A teenager has a \\(\\$100/\\text{week}\\) surplus and wants a \\(\\$650\\) item. How many full weeks of saving are needed?", "\\lceil 650 \\div 100 \\rceil = \\;?", "7", "650 ÷ 100 = 6.5, so 7 full weeks are needed.", 5, ["7 weeks", "7"]),
  ],
  multiPartPractice: [
    {
      id: "y8-nfm-bud-mp1",
      prompt:
        "Ethan earns \\(\\$500\\) per week. His weekly expenses are: rent \\(\\$180\\), food \\(\\$100\\), transport \\(\\$40\\), phone \\(\\$30\\), entertainment \\(\\$50\\).",
      latex: "\\text{Income} = \\$500",
      answer: "20",
      hint: "Add all expenses, subtract from income, then use savings ÷ income × 100.",
      explanation:
        "Part (a): total expenses = 180 + 100 + 40 + 30 + 50 = $400. Part (b): surplus = 500 − 400 = $100. Part (c): savings rate = 100 ÷ 500 × 100 = 20%.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find Ethan's total weekly expenses.",
          latex: "180 + 100 + 40 + 30 + 50",
          marks: 1,
          answer: "400",
          acceptedAnswers: ["$400"],
          hint: "Add the five expense amounts.",
          explanation: "180 + 100 + 40 + 30 + 50 = $400.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find his weekly surplus.",
          latex: "500 - 400",
          marks: 1,
          answer: "100",
          acceptedAnswers: ["$100"],
          hint: "Income minus total expenses.",
          explanation: "500 − 400 = $100.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find his savings rate as a percentage of income.",
          latex: "\\frac{100}{500} \\times 100",
          marks: 2,
          answer: "20",
          acceptedAnswers: ["20%"],
          hint: "Savings ÷ income × 100.",
          explanation: "100 ÷ 500 × 100 = 20%.",
        },
      ],
    },
  ],
};

// ── Lesson 11: Credit and Debit ───────────────────────────────────────────────

const creditAndDebit: LessonContent = {
  description:
    "Understand the difference between debit cards, credit cards and lay-by; calculate credit card interest; and compare total costs of different payment methods to make responsible financial decisions.",
  learningIntention:
    "Compare debit, credit and lay-by payment methods, calculate credit card interest, and evaluate the true cost of each option.",
  successCriteria: [
    "Explain the difference between a debit card (spending your own money) and a credit card (borrowing money).",
    "Describe how lay-by works and identify any fees involved.",
    "Calculate monthly and annual credit card interest from a balance and annual rate.",
    "Explain why paying only the minimum repayment is dangerous.",
    "Compare the total cost of a purchase using debit, credit and lay-by.",
    "Identify responsible credit use: paying the balance in full each month avoids interest.",
  ],
  teaching: {
    paragraphs: [
      "A debit card is linked directly to a bank account — when you pay, the money comes out of your account immediately. You can only spend money you already have. A credit card, by contrast, lets you borrow money from the bank to pay now and repay later. If you pay the full balance by the due date, no interest is charged. If you pay less than the full balance, the bank charges interest on the remaining amount — typically 15–22% per year in Australia.",
      "Lay-by is a third option: you pay for an item in instalments before receiving it. There is no interest, but the retailer may charge a lay-by fee (often a small flat amount or a percentage of the price). Unlike a credit card, you do not take the item home until it is fully paid off.",
      "Credit card interest is usually quoted as an annual percentage rate (APR). To find the monthly interest, divide the annual rate by 12. For example, a $1000 balance at 20% p.a. accrues $1000 × 0.20 ÷ 12 ≈ $16.67 per month. Over a full year without repayment, that is $200 in interest on the original $1000.",
      "A common misconception is that 'minimum repayments are safe'. In fact, minimum repayments are usually set very low — often just 2% of the balance or a small dollar amount. At this rate, the interest charged each month can nearly match or even exceed the repayment, meaning the debt barely shrinks and can take years to pay off at a far higher total cost than the original purchase.",
      "Responsible credit use means treating a credit card like a debit card: only charge what you can afford to pay in full by the due date. This captures the convenience and any rewards without paying any interest. If you cannot pay the full balance, prioritise paying as much as possible and avoid making new purchases on the card until the balance is cleared.",
    ],
    latexBlocks: [
      "\\text{Monthly interest} = \\text{Balance} \\times \\frac{\\text{Annual rate}}{12}",
      "\\text{Annual interest} = \\text{Balance} \\times \\text{Annual rate (decimal)}",
      "\\text{Example: }\\$1000\\text{ at }20\\%\\text{ p.a.} \\Rightarrow \\text{Monthly} = 1000 \\times \\frac{0.20}{12} \\approx \\$16.67",
      "\\text{Total lay-by cost} = \\text{Purchase price} + \\text{Lay-by fee}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate monthly credit card interest",
      questionLatex:
        "\\text{Jade has a credit card balance of }\\$800.\\text{ The annual interest rate is }18\\%.\\text{ Find the monthly interest charged.}",
      steps: [
        { explanation: "Convert the annual rate to a monthly rate.", latex: "\\frac{18\\%}{12} = 1.5\\%\\text{ per month}" },
        { explanation: "Calculate the monthly interest on the balance.", latex: "800 \\times 0.015 = 12" },
      ],
      finalAnswerLatex: "\\$12\\text{ per month}",
    } as WorkedExample,
    {
      title: "Compare credit card and lay-by for a $500 purchase",
      questionLatex:
        "\\text{A }\\$500\\text{ TV can be bought on credit (20\\% p.a., balance held 3 months) or lay-by (}\\$15\\text{ fee). Compare total costs.}",
      steps: [
        { explanation: "Monthly interest on the credit card.", latex: "500 \\times \\frac{0.20}{12} \\approx 8.33" },
        { explanation: "Total credit card cost over 3 months (interest only, ignoring compounding for simplicity).", latex: "500 + 3 \\times 8.33 = 500 + 25 = 525" },
        { explanation: "Total lay-by cost.", latex: "500 + 15 = 515" },
        { explanation: "Compare.", latex: "\\$515 < \\$525 \\Rightarrow \\text{Lay-by is cheaper}" },
      ],
      finalAnswerLatex: "\\text{Lay-by costs }\\$515;\\text{ credit costs }\\approx\\$525.",
    } as WorkedExample,
    {
      title: "The minimum repayment trap",
      questionLatex:
        "\\text{A credit card has a }\\$600\\text{ balance at }20\\%\\text{ p.a. The minimum repayment is }\\$15/\\text{month.}\\text{ How much of the first repayment actually reduces the debt?}",
      steps: [
        { explanation: "Monthly interest on the $600 balance.", latex: "600 \\times \\frac{0.20}{12} = 600 \\times 0.01̇\\overline{6} = 10" },
        { explanation: "Amount of the $15 repayment that reduces debt.", latex: "15 - 10 = \\$5" },
        { explanation: "At this rate, only $5 is repaid each month despite a $15 payment.", latex: "\\text{The debt shrinks by only }\\$5\\text{ per month}" },
      ],
      finalAnswerLatex: "\\text{Only }\\$5\\text{ of the }\\$15\\text{ repayment reduces the debt}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nfm-crd-g1",
      "What is the main difference between a credit card and a debit card?",
      "B",
      [
        "A debit card lets you borrow money; a credit card uses your own money",
        "A credit card lets you borrow money and pay later; a debit card uses money already in your account",
        "Both cards work the same way",
        "A credit card charges no interest if you spend more than $100",
      ],
      "A debit card draws directly from your bank account. A credit card allows you to borrow money from the bank, which must be repaid — with interest if not paid in full by the due date."
    ),
    answer(
      "y8-nfm-crd-g2",
      "A credit card balance is $1200 and the annual interest rate is 20%. Calculate the monthly interest.",
      "1200 \\times \\frac{0.20}{12} = \\;?",
      "20",
      "Monthly rate = 20% ÷ 12 ≈ 1.667%. Monthly interest = 1200 × 0.01667 = 20.",
      ["$20", "20.00"]
    ),
    answer(
      "y8-nfm-crd-g3",
      "An item costs $600. Option A: credit card at 18% p.a., balance held for 2 months. Option B: lay-by with a $20 fee. Find the total cost of each option. (Assume simple monthly interest.)",
      "\\text{Credit: } 600 + 2 \\times \\left(600 \\times \\frac{0.18}{12}\\right) = \\;?",
      "618",
      "Monthly interest = 600 × 0.015 = 9. Credit total = 600 + 2 × 9 = 618. Lay-by total = 600 + 20 = 620. Credit is cheaper in this case.",
      ["$618"]
    ),
    answer(
      "y8-nfm-crd-g4",
      "Explain why paying only the minimum repayment costs more over time. A card has a $500 balance at 20% p.a. The minimum repayment is $12/month. How much monthly interest is charged?",
      "500 \\times \\frac{0.20}{12} = \\;?",
      "8.33",
      "Monthly interest = 500 × (0.20 ÷ 12) ≈ 8.33. Of the $12 minimum payment, only $12 − $8.33 = $3.67 actually reduces the balance. At this rate the debt takes a very long time to clear and total interest paid far exceeds the original purchase price.",
      ["$8.33", "8.33"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-nfm-crd-i1",
      "A credit card balance of $900 has an annual interest rate of 24%. Calculate the interest charged over 3 months. (Use simple monthly interest.)",
      "3 \\times \\left(900 \\times \\frac{0.24}{12}\\right) = \\;?",
      "54",
      "Monthly interest = 900 × 0.02 = 18. Over 3 months: 3 × 18 = 54.",
      ["$54"]
    ),
    choice(
      "y8-nfm-crd-i2",
      "A student is buying a $350 laptop. She has $350 saved in her account. Which payment method is best?",
      "A",
      [
        "Debit card — she pays her own money with no interest or fees",
        "Credit card — she can earn rewards points and pay later",
        "Lay-by — no interest and she gets the laptop immediately",
        "It makes no difference which method she uses",
      ],
      "Since she already has the funds, a debit card is the best option: no interest, no fees, and immediate ownership."
    ),
    answer(
      "y8-nfm-crd-i3",
      "A $480 TV is available on lay-by with a $25 setup fee and 4 equal fortnightly payments. What is each fortnightly payment?",
      "\\frac{480 + 25}{4} = \\;?",
      "126.25",
      "Total cost = 480 + 25 = 505. Each fortnightly payment = 505 ÷ 4 = 126.25.",
      ["$126.25"]
    ),
    answer(
      "y8-nfm-crd-i4",
      "A person owes $600 on a credit card and pays $100 per month without making new purchases. How many months to pay it off? (Ignore interest for this question.)",
      "600 \\div 100 = \\;?",
      "6",
      "600 ÷ 100 = 6 months.",
      ["6 months"]
    ),
    answer(
      "y8-nfm-crd-i5",
      "Compare three options for buying an $800 TV. Option A: debit card (pay now, no extra cost). Option B: credit card at 20% p.a., balance held 6 months (simple monthly interest). Option C: lay-by with a $30 fee. Find the total cost of each option.",
      "\\text{Option B total} = 800 + 6 \\times \\left(800 \\times \\frac{0.20}{12}\\right)",
      "880",
      "Option A: $800. Option B: monthly interest = 800 × (0.20 ÷ 12) ≈ 13.33. Total = 800 + 6 × 13.33 = 800 + 80 = 880. Option C: 800 + 30 = 830. Cheapest is Option A; most expensive is Option B.",
      ["$880", "880.00"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Thinking the minimum repayment clears the debt quickly because it is labelled 'minimum'.",
      fix: "Minimum repayments are designed to be low. Most of the payment covers interest, leaving barely any reduction in the principal. Always pay more than the minimum — ideally the full balance.",
    },
    {
      mistake: "Treating credit card interest as an annual lump sum and forgetting it accrues monthly.",
      fix: "Monthly interest = Balance × (Annual rate ÷ 12). Each month the unpaid balance accumulates more interest.",
    },
    {
      mistake: "Assuming lay-by is always free because there is no interest.",
      fix: "Lay-by often involves a setup fee or service fee. Always add any fees to the purchase price to find the true total cost.",
    },
    {
      mistake: "Confusing a debit card with a credit card — assuming both let you spend beyond your account balance.",
      fix: "A debit card can only access money already in your account. A credit card creates debt that must be repaid.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-nfm-crd-m1",
      "A credit card has a $1000 balance at 18% p.a. The minimum repayment is $20/month. The monthly interest charge is $15. How much does the debt reduce in the first month?",
      "C",
      ["$20", "$15", "$5", "$1000"],
      "The $20 repayment first covers $15 interest, leaving only $20 − $15 = $5 to reduce the debt balance."
    ),
    choice(
      "y8-nfm-crd-m2",
      "A credit card balance of $2400 has an annual interest rate of 20%. What is the annual interest cost if the balance is not repaid?",
      "B",
      ["$200", "$480", "$240", "$2880"],
      "Annual interest = $2400 × 0.20 = $480.",
      "2400 \\times 0.20 = \\;?"
    ),
    answer(
      "y8-nfm-crd-m3",
      "A credit card has a $750 balance at 24% p.a. Calculate the monthly interest.",
      "750 \\times \\frac{0.24}{12} = \\;?",
      "15",
      "Monthly rate = 24% ÷ 12 = 2%. Monthly interest = 750 × 0.02 = 15.",
      ["$15"]
    ),
    answer(
      "y8-nfm-crd-m4",
      "Using m3, if the minimum repayment is $25/month and monthly interest is $15, how many months to pay off the $750 balance? (Use simple calculation: assume $10 net reduction per month.)",
      "750 \\div 10 = \\;?",
      "75",
      "Each month the balance falls by $25 − $15 = $10. Months needed = 750 ÷ 10 = 75 months (over 6 years).",
      ["75 months"]
    ),
    answer(
      "y8-nfm-crd-m5",
      "A $600 item is bought on lay-by with a $15 setup fee and 3 equal monthly payments. Find each monthly payment.",
      "\\frac{600 + 15}{3} = \\;?",
      "205",
      "Total = 615. Each payment = 615 ÷ 3 = 205.",
      ["$205"]
    ),
    answer(
      "y8-nfm-crd-m6",
      "Compare paying off a $500 credit card balance in 1 month (no interest, paid in full) versus holding the balance for 12 months at 20% p.a. How much extra do you pay by waiting?",
      "500 \\times 0.20 = \\;?",
      "100",
      "Paying in full: total cost = $500. Holding for 12 months: annual interest = 500 × 0.20 = $100. Extra cost = $100.",
      ["$100"]
    ),
    answer(
      "y8-nfm-crd-m7",
      "A credit card has a $1500 balance at 18% p.a. The cardholder pays $50 per month. Monthly interest = $22.50. How much does the balance fall each month?",
      "50 - 22.50 = \\;?",
      "27.50",
      "Reduction per month = $50 − $22.50 = $27.50.",
      ["$27.50"]
    ),
    answer(
      "y8-nfm-crd-m8",
      "A student buys a $900 phone. Option 1: credit card at 20% p.a. held 4 months. Option 2: lay-by with a $40 fee, no interest. Which is cheaper and by how much? (Simple monthly interest.)",
      "\\text{Credit: } 900 + 4 \\times \\left(900 \\times \\frac{0.20}{12}\\right) = \\;?",
      "60",
      "Option 1 monthly interest = 900 × (0.20 ÷ 12) = 15. Total credit cost = 900 + 4 × 15 = 960. Option 2 lay-by total = 900 + 40 = 940. Lay-by is cheaper by $960 − $940 = $20. (Answer: 20 or lay-by.)",
      ["$20", "20", "lay-by"]
    ),
    answer(
      "y8-nfm-crd-m9",
      "A household has $200 available per month to repay a $1000 credit card balance at 18% p.a. Monthly interest = $15. How many months to clear the debt?",
      "1000 \\div (200 - 15) = \\;?",
      "6",
      "Net reduction per month = 200 − 15 = 185. Months = 1000 ÷ 185 ≈ 5.4, so 6 months.",
      ["6 months", "5.4", "5"]
    ),
    answer(
      "y8-nfm-crd-m10",
      "A $1200 purchase can be made three ways. Debit card: $1200. Credit card at 15% p.a. held 6 months: find total. Lay-by with $50 fee: find total. Rank from cheapest to most expensive.",
      "\\text{Credit total} = 1200 + 6 \\times \\left(1200 \\times \\frac{0.15}{12}\\right)",
      "1290",
      "Monthly interest = 1200 × 0.0125 = 15. Credit total = 1200 + 6 × 15 = 1290. Lay-by total = 1200 + 50 = 1250. Ranking: Debit ($1200) < Lay-by ($1250) < Credit ($1290).",
      ["$1290", "1290"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1: concept / monthly rate ─────────────────────────────
    poolChoice("y8-nfm-crd-p1", "Which card lets you spend only money you already have?", "A", ["Debit card", "Credit card", "Both", "Neither"], "A debit card draws from your own account; a credit card borrows.", 1, "\\text{Spend only your own money}"),
    poolAnswer("y8-nfm-crd-p2", "A credit card balance is \\(\\$1000\\) at 12% p.a. Find the annual interest.", "1000 \\times 0.12 = \\;?", "120", "1000 × 0.12 = 120.", 1, ["$120"]),
    poolAnswer("y8-nfm-crd-p3", "A \\(\\$1200\\) balance at 24% p.a. Find the monthly interest.", "1200 \\times \\frac{0.24}{12} = \\;?", "24", "Monthly rate 2%; 1200 × 0.02 = 24.", 1, ["$24"]),
    poolChoice("y8-nfm-crd-p4", "A \\(\\$500\\) item on lay-by has a \\(\\$10\\) fee. What is the total cost?", "C", ["$490", "$500", "$510", "$550"], "500 + 10 = $510.", 1, "500 + 10 = \\;?"),
    poolAnswer("y8-nfm-crd-p5", "A \\(\\$2000\\) balance at 18% p.a. Find the annual interest.", "2000 \\times 0.18 = \\;?", "360", "2000 × 0.18 = 360.", 1, ["$360"]),
    // ── Difficulty 2: monthly interest / lay-by totals ───────────────────
    poolAnswer("y8-nfm-crd-p6", "A \\(\\$750\\) balance at 24% p.a. Find the monthly interest.", "750 \\times \\frac{0.24}{12} = \\;?", "15", "Monthly rate 2%; 750 × 0.02 = 15.", 2, ["$15"]),
    poolAnswer("y8-nfm-crd-p7", "A \\(\\$900\\) balance at 20% p.a. Find the monthly interest.", "900 \\times \\frac{0.20}{12} = \\;?", "15", "900 × (0.20 ÷ 12) = 15.", 2, ["$15"]),
    poolAnswer("y8-nfm-crd-p8", "A \\(\\$600\\) item on lay-by has a \\(\\$15\\) fee, paid in 3 equal instalments. Find each payment.", "\\frac{600 + 15}{3} = \\;?", "205", "615 ÷ 3 = 205.", 2, ["$205"]),
    poolChoice("y8-nfm-crd-p9", "A \\(\\$1200\\) balance at 20% p.a. What is the monthly interest?", "B", ["$15", "$20", "$24", "$240"], "1200 × (0.20 ÷ 12) = $20.", 2, "1200 \\times \\frac{0.20}{12} = \\;?"),
    poolAnswer("y8-nfm-crd-p10", "A \\(\\$480\\) item on lay-by has a \\(\\$25\\) fee, paid in 4 equal instalments. Find each payment.", "\\frac{480 + 25}{4} = \\;?", "126.25", "505 ÷ 4 = 126.25.", 2, ["$126.25"]),
    // ── Difficulty 3: interest over months / net reduction ───────────────
    poolAnswer("y8-nfm-crd-p11", "A \\(\\$900\\) balance at 24% p.a. Find the interest over 3 months.", "3 \\times \\left(900 \\times \\frac{0.24}{12}\\right) = \\;?", "54", "Monthly interest 18; 3 × 18 = 54.", 3, ["$54"]),
    poolAnswer("y8-nfm-crd-p12", "A \\(\\$1500\\) balance at 18% p.a. Monthly interest is \\(\\$22.50\\) and a \\(\\$50\\) payment is made. Find the balance reduction.", "50 - 22.50 = \\;?", "27.50", "50 − 22.50 = 27.50.", 3, ["$27.50"]),
    poolAnswer("y8-nfm-crd-p13", "A \\(\\$500\\) balance at 20% p.a. Find the monthly interest (to the nearest cent).", "500 \\times \\frac{0.20}{12} = \\;?", "8.33", "500 × (0.20 ÷ 12) ≈ 8.33.", 3, ["$8.33"]),
    poolChoice("y8-nfm-crd-p14", "A \\(\\$1000\\) balance at 18% p.a. Monthly interest \\(\\$15\\), repayment \\(\\$20\\). How much does the debt fall?", "C", ["$20", "$15", "$5", "$35"], "20 − 15 = $5 reduction.", 3, "20 - 15 = \\;?"),
    poolAnswer("y8-nfm-crd-p15", "A \\(\\$600\\) item is bought on credit at 18% p.a. and held 2 months. Find the total cost (simple monthly interest).", "600 + 2 \\times \\left(600 \\times \\frac{0.18}{12}\\right) = \\;?", "618", "Monthly interest 9; total 600 + 18 = 618.", 3, ["$618"]),
    // ── Difficulty 4: compare methods / longer holds ─────────────────────
    poolAnswer("y8-nfm-crd-p16", "An \\(\\$800\\) TV on credit at 20% p.a. held 6 months. Find the total cost (simple monthly interest).", "800 + 6 \\times \\left(800 \\times \\frac{0.20}{12}\\right) = \\;?", "880", "Monthly interest 13.33; total 800 + 80 = 880.", 4, ["$880"]),
    poolChoice("y8-nfm-crd-p17", "A \\(\\$900\\) phone: credit at 20% p.a. held 4 months (total \\(\\$960\\)) vs lay-by with \\(\\$40\\) fee (total \\(\\$940\\)). Which is cheaper?", "B", ["Credit", "Lay-by", "Both equal", "Cannot tell"], "Lay-by $940 < credit $960, so lay-by is cheaper.", 4, "\\text{Compare }\\$960\\text{ vs }\\$940"),
    poolAnswer("y8-nfm-crd-p18", "A \\(\\$1200\\) purchase on credit at 15% p.a. held 6 months. Find the total cost (simple monthly interest).", "1200 + 6 \\times \\left(1200 \\times \\frac{0.15}{12}\\right) = \\;?", "1290", "Monthly interest 15; total 1200 + 90 = 1290.", 4, ["$1290"]),
    poolAnswer("y8-nfm-crd-p19", "A \\(\\$1000\\) balance at 18% p.a. With \\(\\$200\\) available monthly and \\(\\$15\\) monthly interest, find months to clear.", "1000 \\div (200 - 15) = \\;?", "6", "Net reduction 185/month; 1000 ÷ 185 ≈ 5.4, so 6 months.", 4, ["6 months", "6"]),
    poolAnswer("y8-nfm-crd-p20", "Paying a \\(\\$500\\) balance in full vs holding 12 months at 20% p.a. How much extra by waiting?", "500 \\times 0.20 = \\;?", "100", "Annual interest = 500 × 0.20 = $100 extra.", 4, ["$100"]),
    // ── Difficulty 5: minimum-payment trap / multi-method ───────────────
    poolAnswer("y8-nfm-crd-p21", "A \\(\\$750\\) balance at 24% p.a. The repayment is \\(\\$25/\\text{month}\\) and monthly interest is \\(\\$15\\). How many months to clear (assume $10 net reduction)?", "750 \\div (25 - 15) = \\;?", "75", "Net reduction $10/month; 750 ÷ 10 = 75 months.", 5, ["75 months", "75"]),
    poolAnswer("y8-nfm-crd-p22", "A \\(\\$900\\) phone: credit at 20% p.a. held 4 months vs lay-by with \\(\\$40\\) fee. How much cheaper is the lay-by?", "\\left(900 + 4 \\times 15\\right) - (900 + 40) = \\;?", "20", "Credit total 960; lay-by 940; lay-by is $20 cheaper.", 5, ["$20", "20"]),
    poolAnswer("y8-nfm-crd-p23", "A \\(\\$600\\) balance at 20% p.a. The minimum repayment is \\(\\$15/\\text{month}\\); monthly interest is \\(\\$10\\). How much of the first payment reduces the debt?", "15 - 10 = \\;?", "5", "$15 − $10 interest = $5 reduces the debt.", 5, ["$5"]),
    poolChoice("y8-nfm-crd-p24", "A \\(\\$1200\\) item: debit \\(\\$1200\\), credit \\(\\$1290\\), lay-by \\(\\$1250\\). Which is cheapest?", "A", ["Debit", "Credit", "Lay-by", "All equal"], "Debit $1200 is the cheapest.", 5, "\\text{Cheapest option}"),
    poolAnswer("y8-nfm-crd-p25", "A \\(\\$1500\\) balance at 18% p.a. is paid off at \\(\\$150/\\text{month}\\). Monthly interest is \\(\\$22.50\\). What is the net monthly reduction?", "150 - 22.50 = \\;?", "127.50", "150 − 22.50 = 127.50.", 5, ["$127.50"]),
    poolAnswer("y8-nfm-crd-p26", "A \\(\\$2400\\) balance at 20% p.a. is left unpaid for a full year. Find the total interest.", "2400 \\times 0.20 = \\;?", "480", "2400 × 0.20 = 480.", 5, ["$480"]),
  ],
  multiPartPractice: [
    {
      id: "y8-nfm-crd-mp1",
      prompt:
        "Mia buys an \\(\\$800\\) laptop. She compares paying by credit card at 18% per year (holding the balance for 3 months, using simple monthly interest) against lay-by with a \\(\\$30\\) fee.",
      latex: "\\text{Price} = \\$800",
      answer: "830",
      hint: "Monthly interest = balance × (annual rate ÷ 12). Lay-by total = price + fee.",
      explanation:
        "Part (a): monthly interest = 800 × (0.18 ÷ 12) = $12. Part (b): credit total = 800 + 3 × 12 = $836. Part (c): lay-by total = 800 + 30 = $830, which is $6 cheaper than credit.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the monthly interest on the credit card.",
          latex: "800 \\times \\frac{0.18}{12}",
          marks: 1,
          answer: "12",
          acceptedAnswers: ["$12"],
          hint: "Monthly rate = 18% ÷ 12 = 1.5%.",
          explanation: "800 × 0.015 = $12.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the total cost on the credit card over 3 months.",
          latex: "800 + 3 \\times 12",
          marks: 1,
          answer: "836",
          acceptedAnswers: ["$836"],
          hint: "Add 3 months of interest to the price.",
          explanation: "800 + 36 = $836.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the total cost on lay-by.",
          latex: "800 + 30",
          marks: 1,
          answer: "830",
          acceptedAnswers: ["$830"],
          hint: "Add the lay-by fee to the price.",
          explanation: "800 + 30 = $830.",
        },
      ],
    },
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "percentages-basics":                percentagesBasics,
  "percentage-increase":               percentageIncrease,
  "percentage-decrease":               percentageDecrease,
  "profit-and-loss":                   profitAndLoss,
  "discounts-and-sales":               discountsAndSales,
  "simple-interest-introduction":      simpleInterestIntroduction,
  "wages-and-salary":                  wagesAndSalary,
  "income-tax-basics":                 incomeTaxBasics,
  "compound-interest-introduction":    compoundInterestIntroduction,
  "budgeting-and-money-management":    budgetingAndMoneyManagement,
  "credit-and-debit":                  creditAndDebit,
};

export function year8NumberFinancialMathematicsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" ||
    unit.slug !== "number-financial-mathematics"
  ) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) return null;

  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
