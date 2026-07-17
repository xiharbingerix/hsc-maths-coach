// Year 9 Wave 2 — Chapter 1, Percentages + rounding sections (ADR-Y9-001):
// percentages-and-money (1F), percentage-increase-decrease (1G), profits-and-discounts (1H) —
// consolidating; decimal-places-significant-figures (1B) — core. Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import { withoutPracticeLatex } from "../questionHelpers";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Convert the percentage to a decimal or fraction first.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Decide the rule before computing.", explanation };
}
const money = (a: string) => [a, `$${a}`, a.includes(".") ? a : `${a}.00`, `$${a}.00`];

// ── 1F percentages-and-money (consolidating) ───────────────────────────────────────────
const percentagesAndMoney: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Find a percentage of an amount and convert between percentages, fractions and decimals.",
  learningIntention: "Calculate percentages of money amounts and convert percentage forms.",
  successCriteria: ["Convert a percentage to a decimal or fraction.", "Find a percentage of an amount.", "Convert a decimal/fraction to a percentage.", "Apply percentages to money."],
  teaching: {
    paragraphs: [
      "PER CENT means ‘per hundred’, so a percentage is just a fraction out of 100. To use it, convert to a DECIMAL (divide by 100): 20% = 0.20, 7% = 0.07.",
      "To find a PERCENTAGE OF an amount, multiply: 20% of $50 = 0.20 × 50 = $10.",
      "To convert the other way, a DECIMAL → percentage is ×100: 0.3 = 30%; a FRACTION → percentage: 1/5 = 0.2 = 20%.",
      "With money, round sensibly to the nearest cent. 10% of $35 = $3.50.",
    ],
    latexBlocks: ["20\\% = 0.20,\\ 7\\% = 0.07", "20\\% \\text{ of } \\$50 = 0.20 \\times 50 = \\$10", "0.3 = 30\\%,\\ \\tfrac15 = 20\\%"],
  },
  workedExamples: [
    { title: "Percentage of an amount", questionLatex: "\\text{Find } 20\\% \\text{ of } \\$50.", steps: [{ explanation: "0.20 × 50.", latex: "\\$10" }], finalAnswerLatex: "\\$10" },
    { title: "Percentage to decimal", questionLatex: "\\text{Write } 15\\% \\text{ as a decimal.}", steps: [{ explanation: "÷100.", latex: "0.15" }], finalAnswerLatex: "0.15" },
    { title: "Of a quantity", questionLatex: "\\text{Find } 25\\% \\text{ of } 80.", steps: [{ explanation: "0.25 × 80.", latex: "20" }], finalAnswerLatex: "20" },
  ],
  guidedPractice: [
    ans("y9-pc-g1", "Find 10% of $200.", "", "20", 2, "0.10 × 200 = 20.", money("20")),
    ans("y9-pc-g2", "Find 50% of 90.", "", "45", 2, "Half of 90.", []),
    ans("y9-pc-g3", "Write 25% as a simplified fraction.", "25\\%", "1/4", 2, "25/100 = 1/4.", ["1 / 4"]),
    mcq("y9-pc-g4", "Write 0.3 as a percentage.", "B", ["3%", "30%", "300%", "0.3%"], 2, "×100 → 30%."),
  ],
  independentPractice: [
    ans("y9-pc-i1", "Find 30% of 60.", "", "18", 2, "0.30 × 60 = 18.", []),
    ans("y9-pc-i2", "Find 5% of $400.", "", "20", 2, "0.05 × 400 = 20.", money("20")),
    ans("y9-pc-i3", "Write 0.75 as a percentage.", "0.75", "75%", 2, "×100 → 75%.", ["75"]),
    ans("y9-pc-i4", "Write 12% as a decimal.", "12\\%", "0.12", 2, "÷100.", []),
    mcq("y9-pc-i5", "Write 1/5 as a percentage.", "B", ["15%", "20%", "5%", "50%"], 2, "1/5 = 0.2 = 20%."),
  ],
  masteryQuiz: [
    ans("y9-pc-m1", "Find 40% of 50.", "", "20", 2, "0.40 × 50 = 20.", []),
    ans("y9-pc-m2", "Find 10% of $35.", "", "3.50", 3, "0.10 × 35 = 3.50.", money("3.50")),
    ans("y9-pc-m3", "Find 20% of 150.", "", "30", 2, "0.20 × 150 = 30.", []),
    ans("y9-pc-m4", "Write 0.6 as a percentage.", "0.6", "60%", 2, "×100.", ["60"]),
    mcq("y9-pc-m5", "Write 3/4 as a percentage.", "C", ["34%", "43%", "75%", "30%"], 2, "3/4 = 0.75 = 75%."),
    ans("y9-pc-m6", "Find 15% of 200.", "", "30", 2, "0.15 × 200 = 30.", []),
    ans("y9-pc-m7", "Write 8% as a decimal.", "8\\%", "0.08", 2, "÷100.", []),
    ans("y9-pc-m8", "Find 100% of 47.", "", "47", 2, "100% = the whole.", []),
    ans("y9-pc-m9", "Find 5% of 60.", "", "3", 2, "0.05 × 60 = 3.", []),
    mcq("y9-pc-m10", "Write 0.05 as a percentage.", "A", ["5%", "0.5%", "50%", "0.05%"], 2, "×100 → 5%."),
  ],
  masteryQuizPool: [
    ans("y9-pc-p1", "Find 35% of $240.", "", "84", 5, "0.35 × 240 = 84.", money("84")),
    ans("y9-pc-p2", "Find 12.5% of 64.", "", "8", 5, "0.125 × 64 = 8.", []),
    ans("y9-pc-p3", "20% of an amount is $15. Find the amount.", "20\\%=\\$15", "75", 5, "Amount = 15 ÷ 0.20 = 75.", money("75")),
    ans("y9-pc-p4", "Find 7.5% of $1200.", "", "90", 5, "0.075 × 1200 = 90.", money("90")),
    ans("y9-pc-p5", "Write 0.025 as a percentage.", "0.025", "2.5%", 5, "×100 → 2.5%.", ["2.5"]),
    ans("y9-pc-p6", "Find 150% of 40.", "", "60", 5, "1.5 × 40 = 60.", []),
    ans("y9-pc-p7", "What percentage is 18 of 90?", "", "20%", 5, "18/90 = 0.2 = 20%.", ["20"]),
    ans("y9-pc-p8", "GST is 10%. Find the GST on a $250 item.", "", "25", 5, "0.10 × 250 = 25.", money("25")),
    ans("y9-pc-p9", "Find 0.5% of $4000.", "", "20", 5, "0.005 × 4000 = 20.", money("20")),
    ans("y9-pc-p10", "What percentage is $12 of $48?", "", "25%", 5, "12/48 = 0.25 = 25%.", ["25"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying by the percentage instead of its decimal.", fix: "20% means × 0.20, not × 20." },
    { mistake: "Moving the decimal the wrong way converting.", fix: "% → decimal ÷100; decimal → % ×100." },
    { mistake: "Forgetting cents in money answers.", fix: "Keep two decimal places for money." },
    { mistake: "Confusing ‘% of’ with ‘% off’.", fix: "‘Of’ multiplies; ‘off’ subtracts a percentage." },
  ],
  masteryPassMark: 0.8,
});

// ── 1G percentage-increase-decrease (consolidating) ────────────────────────────────────
const percentageIncreaseDecrease: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Increase or decrease a quantity by a percentage using a multiplying factor.",
  learningIntention: "Apply percentage increases and decreases efficiently.",
  successCriteria: ["Increase by r% using × (1 + r).", "Decrease by r% using × (1 − r).", "Find the multiplying factor for a change.", "Solve simple reverse problems."],
  teaching: {
    paragraphs: [
      "To INCREASE by a percentage, multiply by (1 + the decimal): +10% means × 1.10. So 50 increased by 10% = 50 × 1.1 = 55.",
      "To DECREASE, multiply by (1 − the decimal): −25% means × 0.75. So 80 decreased by 25% = 80 × 0.75 = 60.",
      "This MULTIPLYING FACTOR is faster than finding the change and adding/subtracting, and chains easily for successive changes.",
      "Reverse problems undo the factor: if a price after 20% off is $96, the original is 96 ÷ 0.8 = $120.",
    ],
    latexBlocks: ["+r\\% \\to \\times(1+r)", "-r\\% \\to \\times(1-r)", "50 \\times 1.1 = 55,\\ 80 \\times 0.75 = 60"],
  },
  workedExamples: [
    { title: "Increase", questionLatex: "\\text{Increase } 50 \\text{ by } 10\\%.", steps: [{ explanation: "× 1.1.", latex: "55" }], finalAnswerLatex: "55" },
    { title: "Decrease", questionLatex: "\\text{Decrease } 80 \\text{ by } 25\\%.", steps: [{ explanation: "× 0.75.", latex: "60" }], finalAnswerLatex: "60" },
    { title: "Money increase", questionLatex: "\\text{Increase } \\$200 \\text{ by } 15\\%.", steps: [{ explanation: "× 1.15.", latex: "230" }], finalAnswerLatex: "\\$230" },
  ],
  guidedPractice: [
    ans("y9-pid-g1", "Increase 100 by 20%.", "", "120", 2, "100 × 1.2 = 120.", []),
    ans("y9-pid-g2", "Decrease 100 by 30%.", "", "70", 2, "100 × 0.7 = 70.", []),
    ans("y9-pid-g3", "Increase 40 by 50%.", "", "60", 2, "40 × 1.5 = 60.", []),
    mcq("y9-pid-g4", "Increasing by 10% means multiplying by:", "C", ["0.1", "10", "1.1", "0.9"], 2, "1 + 0.10 = 1.1."),
  ],
  independentPractice: [
    ans("y9-pid-i1", "Increase 80 by 25%.", "", "100", 2, "80 × 1.25 = 100.", []),
    ans("y9-pid-i2", "Decrease 60 by 10%.", "", "54", 2, "60 × 0.9 = 54.", []),
    ans("y9-pid-i3", "Increase $500 by 6%.", "", "530", 3, "500 × 1.06 = 530.", money("530")),
    ans("y9-pid-i4", "Decrease 200 by 15%.", "", "170", 3, "200 × 0.85 = 170.", []),
    mcq("y9-pid-i5", "Decreasing by 20% means multiplying by:", "B", ["0.2", "0.8", "1.2", "0.98"], 2, "1 − 0.20 = 0.8."),
  ],
  masteryQuiz: [
    ans("y9-pid-m1", "Increase 50 by 20%.", "", "60", 2, "50 × 1.2 = 60.", []),
    ans("y9-pid-m2", "Decrease 90 by 10%.", "", "81", 2, "90 × 0.9 = 81.", []),
    ans("y9-pid-m3", "Increase 120 by 25%.", "", "150", 2, "120 × 1.25 = 150.", []),
    ans("y9-pid-m4", "Decrease 40 by 25%.", "", "30", 2, "40 × 0.75 = 30.", []),
    mcq("y9-pid-m5", "The factor for a 5% increase is:", "A", ["1.05", "0.95", "5", "0.05"], 2, "1 + 0.05 = 1.05."),
    ans("y9-pid-m6", "Increase 200 by 50%.", "", "300", 2, "200 × 1.5 = 300.", []),
    ans("y9-pid-m7", "Decrease 150 by 20%.", "", "120", 2, "150 × 0.8 = 120.", []),
    ans("y9-pid-m8", "Increase 80 by 5%.", "", "84", 3, "80 × 1.05 = 84.", []),
    ans("y9-pid-m9", "Decrease 250 by 40%.", "", "150", 2, "250 × 0.6 = 150.", []),
    ans("y9-pid-m10", "Increase 60 by 100%.", "", "120", 2, "Doubling: 60 × 2 = 120.", []),
  ],
  masteryQuizPool: [
    ans("y9-pid-p1", "Increase $400 by 8%, then decrease the result by 5%.", "", "410.40", 5, "400×1.08 = 432; 432×0.95 = 410.40.", money("410.40")),
    ans("y9-pid-p2", "After a 20% discount a jacket costs $96. Find the original price.", "", "120", 5, "96 ÷ 0.8 = 120.", money("120")),
    ans("y9-pid-p3", "A $60 item rises 15%. Find the new price.", "", "69", 5, "60 × 1.15 = 69.", money("69")),
    ans("y9-pid-p4", "A population of 2000 falls 12%. Find the new population.", "", "1760", 5, "2000 × 0.88 = 1760.", []),
    ans("y9-pid-p5", "After a 25% increase a value is 150. Find the original.", "", "120", 5, "150 ÷ 1.25 = 120.", []),
    ans("y9-pid-p6", "Increase 80 by 10% twice (compound).", "", "96.8", 5, "80×1.1=88; 88×1.1=96.8.", []),
    ans("y9-pid-p7", "A $250 fare drops 12% then rises 5%. Final price?", "", "231", 5, "250×0.88=220; 220×1.05=231.", money("231")),
    ans("y9-pid-p8", "After a 10% decrease a price is $45. Find the original.", "", "50", 5, "45 ÷ 0.9 = 50.", money("50")),
    ans("y9-pid-p9", "Increase 500 by 6%, then by 6% again.", "", "561.80", 5, "500×1.06=530; 530×1.06=561.80.", money("561.80")),
    ans("y9-pid-p10", "A salary of $48000 rises 2.5%. Find the new salary.", "", "49200", 5, "48000 × 1.025 = 49200.", money("49200")),
  ],
  commonMistakes: [
    { mistake: "Using 0.10 as the increase factor.", fix: "Increase factor is 1 + r (e.g. 1.10), not r." },
    { mistake: "Adding/subtracting the percentage of the wrong base.", fix: "Always take the percentage of the original amount." },
    { mistake: "Reversing by adding the percentage back.", fix: "Undo by dividing by the factor, not adding %." },
    { mistake: "Treating successive % changes as one combined %.", fix: "Multiply the factors in turn." },
  ],
  masteryPassMark: 0.8,
});

// ── 1H profits-and-discounts (consolidating) ───────────────────────────────────────────
const profitsAndDiscounts: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Calculate profit, loss, percentage profit/loss and discounts on a price.",
  learningIntention: "Work out profit/loss and discounted prices in money contexts.",
  successCriteria: ["Find profit/loss = selling − cost.", "Find a percentage profit or loss.", "Apply a percentage discount.", "Interpret selling below cost as a loss."],
  teaching: {
    paragraphs: [
      "PROFIT = selling price − cost price (a negative result is a LOSS). If you buy for $40 and sell for $50, the profit is $10.",
      "PERCENTAGE PROFIT (or loss) is measured against the COST: % profit = profit ÷ cost × 100. A $10 profit on a $50 cost is 20%.",
      "A DISCOUNT reduces the price. 20% off $80 = $80 × 0.80 = $64 (or subtract $16).",
      "If the selling price is below the cost, it's a loss — and the percentage is still taken against the cost.",
    ],
    latexBlocks: ["\\text{profit} = \\text{sell} - \\text{cost}", "\\%\\text{ profit} = \\tfrac{\\text{profit}}{\\text{cost}} \\times 100", "20\\% \\text{ off } \\$80 = \\$64"],
  },
  workedExamples: [
    { title: "Profit", questionLatex: "\\text{Cost } \\$40, \\text{ sell } \\$50. \\text{ Find the profit.}", steps: [{ explanation: "sell − cost.", latex: "\\$10" }], finalAnswerLatex: "\\$10" },
    { title: "Discount", questionLatex: "\\text{Find the price after } 20\\% \\text{ off } \\$80.", steps: [{ explanation: "× 0.80.", latex: "\\$64" }], finalAnswerLatex: "\\$64" },
    { title: "Percentage profit", questionLatex: "\\text{Cost } \\$50, \\text{ profit } \\$10. \\text{ Find } \\%\\text{ profit.}", steps: [{ explanation: "10/50 × 100.", latex: "20\\%" }], finalAnswerLatex: "20\\%" },
  ],
  guidedPractice: [
    ans("y9-pd-g1", "Cost $30, sell $45. Find the profit.", "", "15", 2, "45 − 30 = 15.", money("15")),
    ans("y9-pd-g2", "Find the price after 10% off $50.", "", "45", 2, "50 × 0.9 = 45.", money("45")),
    ans("y9-pd-g3", "Cost $50, profit $10. Find the percentage profit.", "", "20%", 2, "10/50 = 20%.", ["20"]),
    mcq("y9-pd-g4", "A discount:", "B", ["raises the price", "reduces the price", "doubles the price", "keeps it the same"], 2, "A discount lowers the price."),
  ],
  independentPractice: [
    ans("y9-pd-i1", "Cost $100, sell $130. Find the profit.", "", "30", 2, "30.", money("30")),
    ans("y9-pd-i2", "Find the price after 25% off $200.", "", "150", 2, "200 × 0.75 = 150.", money("150")),
    ans("y9-pd-i3", "Cost $80, sell $60. Find the percentage loss.", "", "25%", 3, "Loss 20; 20/80 = 25%.", ["25"]),
    ans("y9-pd-i4", "Find the price after 15% off $40.", "", "34", 3, "40 × 0.85 = 34.", money("34")),
    ans("y9-pd-i5", "Cost $20, sell $25. Find the percentage profit.", "", "25%", 3, "5/20 = 25%.", ["25"]),
  ],
  masteryQuiz: [
    ans("y9-pd-m1", "Cost $60, sell $75. Find the profit.", "", "15", 2, "15.", money("15")),
    ans("y9-pd-m2", "Find the price after 20% off $250.", "", "200", 2, "250 × 0.8 = 200.", money("200")),
    ans("y9-pd-m3", "Cost $200, profit $50. Percentage profit?", "", "25%", 3, "50/200 = 25%.", ["25"]),
    ans("y9-pd-m4", "Find the price after 30% off $90.", "", "63", 2, "90 × 0.7 = 63.", money("63")),
    mcq("y9-pd-m5", "Selling below cost price is a:", "B", ["profit", "loss", "discount", "markup"], 2, "Sell < cost → loss."),
    ans("y9-pd-m6", "Cost $50, sell $80. Find the profit.", "", "30", 2, "30.", money("30")),
    ans("y9-pd-m7", "Find the price after 5% off $60.", "", "57", 2, "60 × 0.95 = 57.", money("57")),
    ans("y9-pd-m8", "Cost $40, profit $20. Percentage profit?", "", "50%", 3, "20/40 = 50%.", ["50"]),
    ans("y9-pd-m9", "Find the price after 50% off $30.", "", "15", 2, "Half of $30.", money("15")),
    ans("y9-pd-m10", "Cost $120, sell $96. Find the loss.", "", "24", 3, "120 − 96 = 24 loss.", money("24")),
  ],
  masteryQuizPool: [
    ans("y9-pd-p1", "A $200 item is reduced 10%, then a further 5%. Find the final price.", "", "171", 5, "200×0.9=180; 180×0.95=171.", money("171")),
    ans("y9-pd-p2", "An item sells for $100 at a 25% profit. Find the cost price.", "", "80", 5, "Cost = 100 ÷ 1.25 = 80.", money("80")),
    ans("y9-pd-p3", "Cost $250, sold at a 12% loss. Find the selling price.", "", "220", 5, "250 × 0.88 = 220.", money("220")),
    ans("y9-pd-p4", "Marked $80, 20% off, then 10% GST added. Final price?", "", "70.40", 5, "80×0.8=64; 64×1.1=70.40.", money("70.40")),
    ans("y9-pd-p5", "Bought $1500, sold $1800. Percentage profit?", "", "20%", 5, "300/1500 = 20%.", ["20"]),
    ans("y9-pd-p6", "A 30% discount saves $24. Find the original price.", "", "80", 5, "P = 24 ÷ 0.3 = 80.", money("80")),
    ans("y9-pd-p7", "Cost $40, sold at a 35% profit. Selling price?", "", "54", 5, "40 × 1.35 = 54.", money("54")),
    ans("y9-pd-p8", "An item at $90 after 25% off — what was the original price?", "", "120", 5, "90 ÷ 0.75 = 120.", money("120")),
    ans("y9-pd-p9", "Cost $60, sold $45. Percentage loss?", "", "25%", 5, "Loss 15; 15/60 = 25%.", ["25"]),
    ans("y9-pd-p10", "Two successive 50% discounts on $80 — final price?", "", "20", 5, "80×0.5=40; 40×0.5=20.", money("20")),
  ],
  commonMistakes: [
    { mistake: "Taking percentage profit against the selling price.", fix: "Percentage profit/loss is against the COST." },
    { mistake: "Subtracting the percentage value as dollars.", fix: "20% off means × 0.80 of the price." },
    { mistake: "Treating two discounts as one combined percentage.", fix: "Apply each discount factor in turn." },
    { mistake: "Reporting a loss as a profit.", fix: "Sell < cost is a loss (negative profit)." },
  ],
  masteryPassMark: 0.8,
});

// ── 1B decimal-places-significant-figures (core) ───────────────────────────────────────
const decimalPlacesSigFigs: Partial<ExplicitLesson> = {
  description: "Round numbers to a given number of decimal places and to significant figures.",
  learningIntention: "Round correctly to decimal places and to significant figures.",
  successCriteria: ["Round to a given number of decimal places.", "Identify significant figures (incl. leading/trailing zeros).", "Round to a given number of significant figures.", "Apply rounding in context."],
  teaching: {
    paragraphs: [
      "To round to a number of DECIMAL PLACES, look at the next digit: 5 or more rounds up, less than 5 rounds down. 3.14159 to 2 d.p. = 3.14; 9.999 to 2 d.p. = 10.00.",
      "SIGNIFICANT FIGURES count from the first non-zero digit. LEADING zeros are NOT significant (0.00456 has 3 s.f.); trailing zeros after a decimal ARE significant (0.010 has 2 s.f.).",
      "To round to n SIGNIFICANT FIGURES, keep the first n significant digits and round: 0.004567 to 2 s.f. = 0.0046; 12345 to 2 s.f. = 12000.",
      "Choose the level of rounding to suit the context — money to 2 d.p., measurements to a sensible number of significant figures.",
    ],
    latexBlocks: ["3.14159 \\to 3.14\\ (2\\text{ d.p.})", "0.004567 \\to 0.0046\\ (2\\text{ s.f.})", "12345 \\to 12000\\ (2\\text{ s.f.})"],
  },
  workedExamples: [
    { title: "Decimal places", questionLatex: "\\text{Round } 3.14159 \\text{ to 2 d.p.}", steps: [{ explanation: "Next digit 1 < 5.", latex: "3.14" }], finalAnswerLatex: "3.14" },
    { title: "Significant figures", questionLatex: "\\text{Round } 0.004567 \\text{ to 2 s.f.}", steps: [{ explanation: "First 2 sig figs 4,5; next 6 rounds up.", latex: "0.0046" }], finalAnswerLatex: "0.0046" },
    { title: "Large number to s.f.", questionLatex: "\\text{Round } 12345 \\text{ to 2 s.f.}", steps: [{ explanation: "Keep 1,2; next 3 rounds down; fill zeros.", latex: "12000" }], finalAnswerLatex: "12000" },
  ],
  guidedPractice: [
    ans("y9-df-g1", "Round 5.678 to 1 decimal place.", "5.678", "5.7", 2, "Next digit 7 ≥ 5, round up.", []),
    ans("y9-df-g2", "Round 3.246 to 2 significant figures.", "3.246", "3.2", 2, "Keep 3,2; next 4 < 5.", []),
    ans("y9-df-g3", "Round 0.0456 to 2 significant figures.", "0.0456", "0.046", 3, "First 2 s.f. 4,5; next 6 rounds up.", []),
    mcq("y9-df-g4", "How many significant figures does 0.00302 have?", "C", ["5", "6", "3", "2"], 3, "Leading zeros don't count: 3, 0, 2 = 3 s.f."),
  ],
  independentPractice: [
    ans("y9-df-i1", "Round 9.999 to 2 decimal places.", "9.999", "10.00", 3, "Rounds up to 10.00.", ["10"]),
    ans("y9-df-i2", "Round 45678 to 2 significant figures.", "45678", "46000", 3, "Keep 4,5; next 6 rounds the 5 up to 6.", []),
    ans("y9-df-i3", "Round 0.06789 to 3 significant figures.", "0.06789", "0.0679", 3, "First 3 s.f. 6,7,8; next 9 rounds up.", []),
    ans("y9-df-i4", "Round 2.71828 to 3 decimal places.", "2.71828", "2.718", 2, "Next digit 2 < 5.", []),
    mcq("y9-df-i5", "Leading zeros in a decimal are:", "B", ["significant", "not significant", "rounded up", "always two"], 3, "Leading zeros are not significant."),
  ],
  masteryQuiz: [
    ans("y9-df-m1", "Round 7.846 to 2 decimal places.", "7.846", "7.85", 2, "Next digit 6 ≥ 5, round up.", []),
    ans("y9-df-m2", "Round 123.456 to 1 decimal place.", "123.456", "123.5", 2, "Next digit 5, round up.", []),
    ans("y9-df-m3", "Round 0.003456 to 2 significant figures.", "0.003456", "0.0035", 3, "First 2 s.f. 3,4; next 5 rounds up.", []),
    ans("y9-df-m4", "Round 89999 to 2 significant figures.", "89999", "90000", 3, "Keep 8,9; next 9 rounds 9 up → 90000.", []),
    mcq("y9-df-m5", "0.00250 written to 2 significant figures keeps which digits?", "A", ["2 and 5", "0 and 0", "2 and 0", "5 and 0"], 4, "First two significant digits are 2 and 5."),
    ans("y9-df-m6", "Round 3.14159 to 4 decimal places.", "3.14159", "3.1416", 3, "Next digit 9 rounds up.", []),
    ans("y9-df-m7", "Round 0.009999 to 2 significant figures.", "0.009999", "0.010", 4, "First 2 s.f. 9,9; rounds to 0.010.", ["0.01"]),
    ans("y9-df-m8", "Round 56789 to 3 significant figures.", "56789", "56800", 3, "Keep 5,6,7; next 8 rounds 7 up to 8.", []),
    ans("y9-df-m9", "Round 2.0456 to 2 decimal places.", "2.0456", "2.05", 2, "Next digit 5 rounds up.", []),
    mcq("y9-df-m10", "Trailing zeros after the decimal point are:", "A", ["significant", "not significant", "ignored", "rounded off"], 3, "0.010 — the trailing zero is significant."),
  ],
  masteryQuizPool: [
    ans("y9-df-p1", "Round 0.0004999 to 2 significant figures.", "0.0004999", "0.00050", 5, "First 2 s.f. 4,9; 9 rounds up → 0.00050.", ["0.0005"]),
    ans("y9-df-p2", "Round 12.96 to 2 significant figures.", "12.96", "13", 5, "Keep 1,2; next 9 rounds up → 13.", []),
    ans("y9-df-p3", "Round 0.04953 to 3 significant figures.", "0.04953", "0.0495", 5, "First 3 s.f. 4,9,5; next 3 < 5.", []),
    ans("y9-df-p4", "Round 9.96 to 1 decimal place.", "9.96", "10.0", 5, "Next digit 6 rounds up → 10.0.", ["10"]),
    ans("y9-df-p5", "Round 0.0098 to 1 significant figure.", "0.0098", "0.01", 5, "First s.f. 9; next 8 rounds up → 0.01.", []),
    ans("y9-df-p6", "Round 749 to 1 significant figure.", "749", "700", 5, "Keep 7; next 4 < 5 → 700.", []),
    ans("y9-df-p7", "Round 3.0499 to 2 decimal places.", "3.0499", "3.05", 5, "Next digit 9 rounds up.", []),
    ans("y9-df-p8", "Round 0.0006501 to 2 significant figures.", "0.0006501", "0.00065", 5, "First 2 s.f. 6,5; next 0 < 5.", []),
    ans("y9-df-p9", "Round 19.95 to 1 decimal place.", "19.95", "20.0", 5, "Next digit 5 rounds up → 20.0.", ["20"]),
    ans("y9-df-p10", "Round 0.0399 to 2 significant figures.", "0.0399", "0.040", 5, "First 2 s.f. 3,9; next 9 rounds up → 0.040.", ["0.04"]),
  ],
  commonMistakes: [
    { mistake: "Counting leading zeros as significant.", fix: "Significant figures start at the first non-zero digit." },
    { mistake: "Rounding down a 5.", fix: "5 (or more) rounds up." },
    { mistake: "Dropping trailing zeros that are significant.", fix: "0.010 has 2 s.f. — keep the trailing zero." },
    { mistake: "Stopping the carry when rounding 9s.", fix: "9.999 to 2 d.p. carries to 10.00." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "percentages-and-money": percentagesAndMoney,
  "percentage-increase-decrease": percentageIncreaseDecrease,
  "profits-and-discounts": profitsAndDiscounts,
  "decimal-places-significant-figures": decimalPlacesSigFigs,
};

export function year9Chapter1PercentagesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "computation-financial-maths") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
