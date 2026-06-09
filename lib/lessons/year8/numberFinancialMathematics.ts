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
      "75 ÷ 100 = 0.75."
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
      "8 ÷ 100 = 0.08."
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
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "percentages-basics":            percentagesBasics,
  "percentage-increase":           percentageIncrease,
  "percentage-decrease":           percentageDecrease,
  "profit-and-loss":               profitAndLoss,
  "discounts-and-sales":           discountsAndSales,
  "simple-interest-introduction":  simpleInterestIntroduction,
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
