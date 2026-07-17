// Year 9 Wave 2 — Chapter 1 (Computation & Financial Maths) D6 challenge pools (Level-6 tier,
// unlocked post-mastery; ADR-Y9-001). 12 markable questions per authored section. Registered
// course-scoped in lib/challenges/index.ts. simple-interest D6 lives in year9Wave1.ts.

import type { PracticeQuestion } from "../lessons/differentialCalculus";
import { withoutQuestionLatex } from "../lessons/questionHelpers";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "These are challenge questions — combine several steps.", explanation };
}
const money = (a: string) => [a, `$${a}`, a.includes(".") ? a : `${a}.00`, `$${a}.00`];

// 1A computations-with-integers
export const integersY9Challenge: PracticeQuestion[] = [
  q("y9c-int-1", "Evaluate −2³ − (−2)³.", "-2^3-(-2)^3", "0", "−8 − (−8) = 0 (note −2³ = −8).", []),
  q("y9c-int-2", "Evaluate (−3)² × (−2) + 5.", "(-3)^2\\times-2+5", "-13", "9 × −2 = −18; −18 + 5 = −13.", ["−13"]),
  q("y9c-int-3", "Evaluate −60 ÷ (−4 + (−2)).", "-60\\div(-4+-2)", "10", "Denominator −6; −60 ÷ −6 = 10.", []),
  q("y9c-int-4", "Evaluate (−1)¹⁰⁰ − (−1)⁹⁹.", "(-1)^{100}-(-1)^{99}", "2", "1 − (−1) = 2.", []),
  q("y9c-int-5", "Evaluate −5 − (−3)² + (−2)³.", "-5-(-3)^2+(-2)^3", "-22", "−5 − 9 + (−8) = −22.", ["−22"]),
  q("y9c-int-6", "Evaluate −4 × (−3 + 7) − (−2)².", "-4\\times(-3+7)-(-2)^2", "-20", "−4×4 = −16; −16 − 4 = −20.", ["−20"]),
  q("y9c-int-7", "Evaluate (−24 ÷ 3) × (−2) − 10.", "(-24\\div3)\\times-2-10", "6", "−8 × −2 = 16; 16 − 10 = 6.", []),
  q("y9c-int-8", "Evaluate −2 × −3 × −4 ÷ (−2).", "-2\\times-3\\times-4\\div-2", "12", "−24 ÷ −2 = 12.", []),
  q("y9c-int-9", "Find the missing integer: −7 × ☐ = 42.", "-7\\times\\square=42", "-6", "42 ÷ −7 = −6.", ["−6"]),
  q("y9c-int-10", "Evaluate (−2)⁴ − 2⁴.", "(-2)^4-2^4", "0", "16 − 16 = 0.", []),
  q("y9c-int-11", "Evaluate −100 ÷ (−5)² + 4.", "-100\\div(-5)^2+4", "0", "(−5)² = 25; −100 ÷ 25 = −4; −4 + 4 = 0.", []),
  q("y9c-int-12", "Evaluate 3 − 2 × (−4) − (−5).", "3-2\\times-4-(-5)", "16", "−2×−4 = 8; 3 + 8 + 5 = 16.", []),
];

// 1C rational-numbers
export const rationalY9Challenge: PracticeQuestion[] = [
  q("y9c-rat-1", "Write 5/8 + 0.125 as a decimal.", "\\tfrac58+0.125", "0.75", "0.625 + 0.125 = 0.75.", []),
  q("y9c-rat-2", "Which is largest: 0.45, 4/9, 0.449?", "\\text{compare}", "0.45", "4/9 ≈ 0.444; 0.45 > 0.449 > 0.444.", []),
  q("y9c-rat-3", "Write 0.0625 as a simplified fraction.", "0.0625", "1/16", "625/10000 = 1/16.", ["1 / 16"]),
  q("y9c-rat-4", "Express 7/8 − 3/4 as a decimal.", "\\tfrac78-\\tfrac34", "0.125", "7/8 − 6/8 = 1/8 = 0.125.", []),
  q("y9c-rat-5", "Write 2.4 as a simplified improper fraction.", "2.4", "12/5", "2.4 = 24/10 = 12/5.", ["12 / 5"]),
  q("y9c-rat-6", "Order from smallest: 3/5, 0.58, 11/20 — give the smallest.", "\\text{order}", "11/20", "11/20 = 0.55 < 0.58 < 0.6.", ["0.55"]),
  q("y9c-rat-7", "Write 0.875 + 1/8 as a decimal.", "0.875+\\tfrac18", "1", "0.875 + 0.125 = 1.", []),
  q("y9c-rat-8", "Convert 5/6 to a decimal (3 d.p.).", "\\tfrac56", "0.833", "0.8333… ≈ 0.833.", []),
  q("y9c-rat-9", "Write 0.36 as a simplified fraction.", "0.36", "9/25", "36/100 = 9/25.", ["9 / 25"]),
  q("y9c-rat-10", "Is 0.1666… rational? Give it as a fraction.", "0.1\\overline{6}", "1/6", "It recurs, so rational; equals 1/6.", ["1 / 6"]),
  q("y9c-rat-11", "Find the value halfway between 1/4 and 1/2 (as a fraction).", "\\text{midpoint}", "3/8", "(1/4 + 1/2)/2 = (3/4)/2 = 3/8.", ["3 / 8"]),
  q("y9c-rat-12", "Write 1.2 as a fraction, then double it.", "2\\times1.2", "12/5", "1.2 = 6/5; doubled = 12/5.", ["12 / 5", "2.4"]),
];

// 1D computation-with-fractions
export const fractionsY9Challenge: PracticeQuestion[] = [
  q("y9c-fr-1", "Evaluate 2/3 + 3/4 − 1/2.", "\\tfrac23+\\tfrac34-\\tfrac12", "11/12", "8/12 + 9/12 − 6/12 = 11/12.", ["11 / 12"]),
  q("y9c-fr-2", "Evaluate (3/4 ÷ 2/3) × 4/9.", "(\\tfrac34\\div\\tfrac23)\\times\\tfrac49", "1/2", "3/4 × 3/2 = 9/8; 9/8 × 4/9 = 36/72 = 1/2.", ["1 / 2"]),
  q("y9c-fr-3", "Evaluate 2 1/3 − 3/4.", "2\\tfrac13-\\tfrac34", "19/12", "7/3 − 3/4 = 28/12 − 9/12 = 19/12.", ["19 / 12", "1 7/12"]),
  q("y9c-fr-4", "Evaluate (2/5)² + (1/5)².", "(\\tfrac25)^2+(\\tfrac15)^2", "1/5", "4/25 + 1/25 = 5/25 = 1/5.", ["1 / 5", "5/25"]),
  q("y9c-fr-5", "Find 2/3 of 5/8 of 48.", "\\tfrac23\\times\\tfrac58\\times48", "20", "5/8 × 48 = 30; 2/3 × 30 = 20.", []),
  q("y9c-fr-6", "Evaluate 1 − (1/2 + 1/4 + 1/8).", "1-(\\tfrac12+\\tfrac14+\\tfrac18)", "1/8", "Sum = 7/8; 1 − 7/8 = 1/8.", ["1 / 8"]),
  q("y9c-fr-7", "Evaluate 5/6 ÷ (2/3 − 1/2).", "\\tfrac56\\div(\\tfrac23-\\tfrac12)", "5", "2/3 − 1/2 = 1/6; 5/6 ÷ 1/6 = 5.", []),
  q("y9c-fr-8", "Three-quarters of a number is 18. Find the number.", "\\tfrac34 x=18", "24", "x = 18 ÷ 3/4 = 24.", []),
  q("y9c-fr-9", "Evaluate (1 1/2)² as an improper fraction.", "(1\\tfrac12)^2", "9/4", "(3/2)² = 9/4.", ["9 / 4", "2 1/4"]),
  q("y9c-fr-10", "Evaluate 7/8 × 4/7 ÷ 1/2.", "\\tfrac78\\times\\tfrac47\\div\\tfrac12", "1", "7/8×4/7 = 1/2; ÷1/2 = 1.", []),
  q("y9c-fr-11", "A tank is 2/5 full, then 1/3 of the tank is added. What fraction is full?", "\\tfrac25+\\tfrac13", "11/15", "6/15 + 5/15 = 11/15.", ["11 / 15"]),
  q("y9c-fr-12", "Evaluate 3/4 ÷ 9/16 × 3/8.", "\\tfrac34\\div\\tfrac{9}{16}\\times\\tfrac38", "1/2", "3/4 × 16/9 = 4/3; 4/3 × 3/8 = 12/24 = 1/2.", ["1 / 2"]),
];

// 1E ratios-rates-best-buys
export const ratiosY9Challenge: PracticeQuestion[] = [
  q("y9c-rr-1", "Divide $180 in the ratio 2 : 3 : 4. Give the middle share.", "2:3:4", "60", "9 parts of $20; 3×$20 = $60.", money("60")),
  q("y9c-rr-2", "A : B = 2 : 3 and B : C = 4 : 5. Find A : C.", "A:C", "8:15", "Scale B to 12: A:B = 8:12, B:C = 12:15 → A:C = 8:15.", ["8 : 15"]),
  q("y9c-rr-3", "If 6 workers build a wall in 10 days, how long for 4 workers (same rate)?", "\\text{inverse}", "15", "6×10 = 60 worker-days; ÷4 = 15 days.", ["15 days"]),
  q("y9c-rr-4", "Best buy unit price: $13.50 for 1.5 kg ($/kg).", "13.5/1.5", "9", "13.50 ÷ 1.5 = $9/kg.", money("9")),
  q("y9c-rr-5", "Mix juice:water 2 : 5. To make 2.1 L, how much juice (L)?", "2:5", "0.6", "7 parts → 0.3 L each; juice = 2×0.3 = 0.6 L.", ["0.6 L"]),
  q("y9c-rr-6", "A car does 540 km on 45 L. How far on 30 L (same rate)?", "\\text{rate}", "360", "540/45 = 12 km/L; ×30 = 360 km.", ["360 km"]),
  q("y9c-rr-7", "Scale 1 : 25000. A road is 8 cm on the map — real length in km?", "1:25000", "2", "8 × 25000 = 200000 cm = 2 km.", ["2 km"]),
  q("y9c-rr-8", "$24 shared as 3 : 5. How much more does the larger share get?", "5-3\\text{ parts}", "6", "8 parts of $3; difference 2 parts = $6.", money("6")),
  q("y9c-rr-9", "Compare: 500 g for $4.50 vs 1.2 kg for $9.60 — cheaper per kg?", "\\text{compare}", "1.2 kg pack", "$9/kg vs $8/kg → 1.2 kg pack is cheaper.", ["1.2kg", "second"]),
  q("y9c-rr-10", "If 5 kg costs $32 and 8 kg costs $48, how much cheaper per kg is the larger bag?", "\\text{difference}", "0.40", "$6.40/kg vs $6.00/kg → $0.40 cheaper.", money("0.40")),
  q("y9c-rr-11", "Recipe for 4 serves uses 300 g flour. Flour for 10 serves?", "\\text{rate}", "750", "75 g/serve × 10 = 750 g.", ["750 g"]),
  q("y9c-rr-12", "Two taps fill a tank in 6 min and 12 min. Together, how long (min)?", "\\text{rates}", "4", "Rates 1/6 + 1/12 = 1/4 per min → 4 min.", ["4 min"]),
];

// 1F percentages-and-money
export const percentagesY9Challenge: PracticeQuestion[] = [
  q("y9c-pc-1", "32% of an amount is $96. Find the amount.", "32\\%=\\$96", "300", "96 ÷ 0.32 = 300.", money("300")),
  q("y9c-pc-2", "Find 17.5% of $640.", "17.5\\%\\times640", "112", "0.175 × 640 = 112.", money("112")),
  q("y9c-pc-3", "What percentage is 45 of 180?", "45/180", "25%", "45/180 = 0.25 = 25%.", ["25"]),
  q("y9c-pc-4", "A price includes 10% GST and is $77. Find the pre-GST price.", "\\div1.1", "70", "77 ÷ 1.1 = 70.", money("70")),
  q("y9c-pc-5", "Find 0.25% of $80 000.", "0.25\\%\\times80000", "200", "0.0025 × 80000 = 200.", money("200")),
  q("y9c-pc-6", "65% of a class of 40 passed. How many failed?", "35\\%\\times40", "14", "Failed 35% × 40 = 14.", []),
  q("y9c-pc-7", "Find 120% of $250.", "120\\%\\times250", "300", "1.2 × 250 = 300.", money("300")),
  q("y9c-pc-8", "A deposit of $45 is 15% of a price. Find the price.", "15\\%=\\$45", "300", "45 ÷ 0.15 = 300.", money("300")),
  q("y9c-pc-9", "Express 3/8 as a percentage.", "\\tfrac38", "37.5%", "3/8 = 0.375 = 37.5%.", ["37.5"]),
  q("y9c-pc-10", "Find 8.5% of $1200.", "8.5\\%\\times1200", "102", "0.085 × 1200 = 102.", money("102")),
  q("y9c-pc-11", "What percentage of $2.50 is 50 cents?", "0.5/2.5", "20%", "0.50/2.50 = 0.2 = 20%.", ["20"]),
  q("y9c-pc-12", "A bill of $88 includes 10% GST. How much is the GST?", "\\div1.1", "8", "Pre-GST 80; GST = 88 − 80 = 8.", money("8")),
].map(withoutQuestionLatex);

// 1G percentage-increase-decrease
export const incDecY9Challenge: PracticeQuestion[] = [
  q("y9c-pid-1", "Increase $500 by 8%, then decrease by 8%. Final amount?", "\\times1.08\\times0.92", "496.80", "500×1.08=540; 540×0.92=496.80.", money("496.80")),
  q("y9c-pid-2", "After a 15% rise a rent is $805. Find the original rent.", "\\div1.15", "700", "805 ÷ 1.15 = 700.", money("700")),
  q("y9c-pid-3", "A value falls 20% then rises 25%. Net percentage change?", "\\times0.8\\times1.25", "0%", "0.8 × 1.25 = 1 → no net change.", ["0", "no change"]),
  q("y9c-pid-4", "Increase 240 by 35%.", "\\times1.35", "324", "240 × 1.35 = 324.", []),
  q("y9c-pid-5", "A $1200 laptop drops 10% per year. Price after 2 years?", "\\times0.9^2", "972", "1200 × 0.81 = 972.", money("972")),
  q("y9c-pid-6", "After a 12% discount an item is $61.60. Find the original price.", "\\div0.88", "70", "61.60 ÷ 0.88 = 70.", money("70")),
  q("y9c-pid-7", "Increase 80 by 25%, then increase the result by 20%.", "\\times1.25\\times1.2", "120", "80×1.25=100; 100×1.2=120.", []),
  q("y9c-pid-8", "A wage of $1250 rises 4%, then 4% again. New wage?", "\\times1.04^2", "1352", "1250 × 1.0816 = 1352.", money("1352")),
  q("y9c-pid-9", "A town of 12 500 grows 8%. New population?", "\\times1.08", "13500", "12500 × 1.08 = 13500.", []),
  q("y9c-pid-10", "After two 10% discounts a price is $324. Find the original.", "\\div0.9^2", "400", "324 ÷ 0.81 = 400.", money("400")),
  q("y9c-pid-11", "A $90 item rises 20% then falls 20%. Final price?", "\\times1.2\\times0.8", "86.40", "90×1.2=108; 108×0.8=86.40.", money("86.40")),
  q("y9c-pid-12", "Increasing a number by 150% gives 75. Find the number.", "\\div2.5", "30", "75 ÷ 2.5 = 30.", []),
].map(withoutQuestionLatex);

// 1H profits-and-discounts
export const profitsY9Challenge: PracticeQuestion[] = [
  q("y9c-pd-1", "A $240 item is reduced 15%, then a further 10%. Final price?", "\\times0.85\\times0.9", "183.60", "240×0.85=204; 204×0.9=183.60.", money("183.60")),
  q("y9c-pd-2", "An item sells for $150 at a 25% profit. Find the cost price.", "\\div1.25", "120", "150 ÷ 1.25 = 120.", money("120")),
  q("y9c-pd-3", "Bought $800, sold $920. Percentage profit?", "120/800", "15%", "120/800 = 15%.", ["15"]),
  q("y9c-pd-4", "Cost $60, marked up 40%, then 25% off the marked price. Selling price?", "60\\times1.4\\times0.75", "63", "Marked 84; ×0.75 = 63.", money("63")),
  q("y9c-pd-5", "A 30% discount saves $36. Find the original price.", "0.3P=36", "120", "36 ÷ 0.3 = 120.", money("120")),
  q("y9c-pd-6", "Sold at a 20% loss for $192. Find the cost price.", "\\div0.8", "240", "192 ÷ 0.8 = 240.", money("240")),
  q("y9c-pd-7", "Cost $50, sold $70. After tax of 10% on the profit, net profit?", "20-2", "18", "Profit 20; tax 10%×20 = 2; net 18.", money("18")),
  q("y9c-pd-8", "An item at $63 after 25% off plus 5% GST. Original pre-GST marked price?", "63\\div1.05\\div0.75", "80", "63/1.05 = 60; 60/0.75 = 80.", money("80")),
  q("y9c-pd-9", "Bought 100 items at $4, sold 80 at $7 (rest unsold). Profit?", "80\\times7-100\\times4", "160", "Revenue 560; cost 400; profit 160.", money("160")),
  q("y9c-pd-10", "Sold $90 at a 50% profit. Cost price?", "\\div1.5", "60", "90 ÷ 1.5 = 60.", money("60")),
  q("y9c-pd-11", "Cost $200, sold at 35% profit, then gave a 10% discount on the selling price. Final price?", "200\\times1.35\\times0.9", "243", "270 × 0.9 = 243.", money("243")),
  q("y9c-pd-12", "A retailer makes 25% profit on cost. The profit is $60. Find the selling price.", "\\text{solve}", "300", "Cost = 60/0.25 = 240; sell = 240 + 60 = 300.", money("300")),
].map(withoutQuestionLatex);

// 1B decimal-places-significant-figures
export const roundingY9Challenge: PracticeQuestion[] = [
  q("y9c-df-1", "Round 0.0049951 to 3 significant figures.", "0.0049951", "0.00500", "First 3 s.f. 4,9,9; next 5 rounds up → 0.00500.", ["0.005"]),
  q("y9c-df-2", "Round 19.962 to 2 significant figures.", "19.962", "20", "Keep 1,9; next 9 rounds up → 20.", []),
  q("y9c-df-3", "Round 0.0099501 to 2 significant figures.", "0.0099501", "0.0100", "First 2 s.f. 9,9; rounds to 0.0100.", ["0.01"]),
  q("y9c-df-4", "Round 3.1496 to 3 decimal places.", "3.1496", "3.150", "Next digit 6 rounds up → 3.150.", ["3.15"]),
  q("y9c-df-5", "How many significant figures are in 0.004080?", "0.004080", "4", "4, 0, 8, 0 → 4 s.f. (leading zeros excluded, trailing zero counts).", []),
  q("y9c-df-6", "Round 8499 to 2 significant figures.", "8499", "8500", "Keep 8,4; next 9 rounds the 4 up → 8500.", []),
  q("y9c-df-7", "Round 0.024951 to 3 significant figures.", "0.024951", "0.0250", "First 3 s.f. 2,4,9; next 5 rounds up → 0.0250.", ["0.025"]),
  q("y9c-df-8", "Round 2.9961 to 2 decimal places.", "2.9961", "3.00", "Next digit 6 rounds up → 3.00.", ["3"]),
  q("y9c-df-9", "Round 149.5 to 2 significant figures.", "149.5", "150", "Keep 1,4; next 9 rounds up → 150.", []),
  q("y9c-df-10", "Round 0.0009999 to 2 significant figures.", "0.0009999", "0.0010", "First 2 s.f. 9,9; rounds to 0.0010.", ["0.001"]),
  q("y9c-df-11", "Round 45.678 to 2 significant figures, then to 1 decimal place — give the 1 d.p. value.", "45.678", "45.7", "1 d.p.: next digit 7 rounds up → 45.7.", []),
  q("y9c-df-12", "Round 0.065451 to 3 significant figures.", "0.065451", "0.0655", "First 3 s.f. are 6, 5, 4; the next digit is 5, so round up the 4 to 5 → 0.0655.", ["0.0655"]),
];

// 1I income
export const incomeY9Challenge: PracticeQuestion[] = [
  q("y9c-inc-1", "Earns $22/h, time-and-a-half after 38 h. Pay for a 44-hour week?", "38\\times22+6\\times33", "1034", "836 + 6×33(=198) = 1034.", money("1034")),
  q("y9c-inc-2", "Base $30 000/yr plus 5% commission on $200 000 sales. Annual income?", "30000+0.05\\times200000", "40000", "30000 + 10000 = 40000.", money("40000")),
  q("y9c-inc-3", "Paid $1900/fortnight. Equivalent annual salary?", "1900\\times26", "49400", "1900 × 26 = 49400.", money("49400")),
  q("y9c-inc-4", "Earns $1450 in a week at $25/h base, time-and-a-half after 40 h. How many overtime hours?", "\\text{solve}", "12", "40×25 = 1000; $450 left at $37.50/h (1.5×25) = 12 OT hours.", ["12 hours"]),
  q("y9c-inc-5", "$28/h, 38-h week, 48 weeks/yr. Annual income?", "28\\times38\\times48", "51072", "1064/wk × 48 = 51072.", money("51072")),
  q("y9c-inc-6", "Commission only: 7% on sales. To earn $1400, what sales are needed?", "0.07S=1400", "20000", "1400 ÷ 0.07 = 20000.", money("20000")),
  q("y9c-inc-7", "35 h at $26/h plus 4 h at double-time. Total pay?", "35\\times26+4\\times52", "1118", "910 + 4×52(=208) = 1118.", money("1118")),
  q("y9c-inc-8", "Monthly pay $4750. Annual salary, then weekly (÷52)?", "4750\\times12\\div52", "1096.15", "57000/yr; 57000 ÷ 52 = 1096.15.", money("1096.15")),
  q("y9c-inc-9", "Piecework $1.25/item, made 240 items, plus $80 bonus. Total?", "240\\times1.25+80", "380", "300 + 80 = 380.", money("380")),
  q("y9c-inc-10", "Retainer $400/wk plus 3% of sales. In a week with $25 000 sales, total?", "400+0.03\\times25000", "1150", "400 + 750 = 1150.", money("1150")),
  q("y9c-inc-11", "$24/h normal; earned $1056 with 8 h overtime at time-and-a-half. Normal hours?", "\\text{solve}", "32", "OT pay 8×36 = 288; normal 1056−288 = 768; ÷24 = 32 h.", ["32 hours"]),
  q("y9c-inc-12", "A salary rises from $60 000 to $63 600. Percentage rise?", "3600/60000", "6%", "3600/60000 = 6%.", ["6"]),
].map(withoutQuestionLatex);

// 1J payg-income-tax
export const taxY9Challenge: PracticeQuestion[] = [
  q("y9c-tax-1", "Tax 19c/$ over $18 200 plus 2% levy on income. Total payable on $55 000?", "\\text{tax+levy}", "8092", "Tax 0.19×36800 = 6992; levy 0.02×55000 = 1100; total 8092.", money("8092")),
  q("y9c-tax-2", "Gross $72 000, deductions $4500; tax 19c/$ over $18 200 on the taxable income.", "0.19\\times(67500-18200)", "9367", "Taxable 67500; 0.19 × 49300 = 9367.", money("9367")),
  q("y9c-tax-3", "Income $50 000, tax $6042, levy $1000. Net income?", "50000-7042", "42958", "50000 − 7042 = 42958.", money("42958")),
  q("y9c-tax-4", "Tax 19c/$ over $18 200. Tax paid $5700 — find the taxable income.", "\\text{solve}", "48200", "5700/0.19 = 30000 over → 18200 + 30000 = 48200.", money("48200")),
  q("y9c-tax-5", "2% Medicare levy on a taxable income of $96 500.", "2\\%\\times96500", "1930", "0.02 × 96500 = 1930.", money("1930")),
  q("y9c-tax-6", "Gross $40 000, no deductions; tax 19c/$ over $18 200. Net of tax only?", "40000-0.19\\times21800", "35858", "Tax 4142; net 40000 − 4142 = 35858.", money("35858")),
  q("y9c-tax-7", "Tax 19c/$ over $18 200 on $33 200. Find the tax.", "0.19\\times15000", "2850", "0.19 × 15000 = 2850.", money("2850")),
  q("y9c-tax-8", "Gross $88 000, deductions $6000, tax 19c/$ over $18 200, plus 2% levy on taxable. Total payable?", "\\text{tax+levy}", "13762", "Taxable 82000; tax 0.19×63800 = 12122; levy 0.02×82000 = 1640; total 13762.", money("13762")),
  q("y9c-tax-9", "Net income is $44 000 after $6000 tax. Find the gross.", "44000+6000", "50000", "Gross = net + tax = 50000.", money("50000")),
  q("y9c-tax-10", "Tax 19c/$ over $18 200 on $68 200. Find the tax.", "0.19\\times50000", "9500", "0.19 × 50000 = 9500.", money("9500")),
  q("y9c-tax-11", "2% levy on $61 750.", "2\\%\\times61750", "1235", "0.02 × 61750 = 1235.", money("1235")),
  q("y9c-tax-12", "Gross $60 000, deductions $2000; tax 19c/$ over $18 200; plus 2% levy on taxable. Net income?", "\\text{solve}", "51278", "Taxable 58000; tax 0.19×39800 = 7562; levy 0.02×58000 = 1160; net 60000 − 7562 − 1160 = 51278.", money("51278")),
].map(withoutQuestionLatex);

// 1L compound-interest-depreciation
export const compoundDepY9Challenge: PracticeQuestion[] = [
  q("y9c-cid-1", "$2000 at 6% compounded for 3 years.", "\\times1.06^3", "2382.03", "2000 × 1.191016 = 2382.03.", money("2382.03")),
  q("y9c-cid-2", "Depreciate $35 000 by 15%/yr for 2 years.", "\\times0.85^2", "25287.50", "35000 × 0.7225 = 25287.50.", money("25287.50")),
  q("y9c-cid-3", "How much more does $5000 at 8% compound earn than simple over 2 years?", "\\text{compare}", "32", "Compound 5832 vs simple 5800 → $32 more.", money("32")),
  q("y9c-cid-4", "$1500 at 10% compounded for 3 years — interest earned only.", "A-P", "496.50", "A = 1996.50; interest 496.50.", money("496.50")),
  q("y9c-cid-5", "A $48 000 car depreciates 25%/yr. Value after 3 years?", "\\times0.75^3", "20250", "48000 × 0.421875 = 20250.", money("20250")),
  q("y9c-cid-6", "$800 at 12.5% compounded for 2 years.", "\\times1.125^2", "1012.50", "800 × 1.265625 = 1012.50.", money("1012.50")),
  q("y9c-cid-7", "Depreciate $20 000 by 10%/yr for 3 years.", "\\times0.9^3", "14580", "20000 × 0.729 = 14580.", money("14580")),
  q("y9c-cid-8", "$10 000 at 5% compounded for 3 years.", "\\times1.05^3", "11576.25", "10000 × 1.157625 = 11576.25.", money("11576.25")),
  q("y9c-cid-9", "$2500 at 4% compounded for 2 years — interest only.", "A-P", "204", "A = 2704; interest 204.", money("204")),
  q("y9c-cid-10", "A painting at $6000 appreciates 20%/yr for 2 years. Value?", "\\times1.2^2", "8640", "6000 × 1.44 = 8640.", money("8640")),
  q("y9c-cid-11", "Depreciate $12 000 by 20%/yr. After how many whole years does it first drop below $6000?", "\\text{solve}", "4", "9600, 7680, 6144, 4915 — first below $6000 at year 4.", ["4 years"]),
  q("y9c-cid-12", "$1000 at 10% for 2 years compound vs simple — give the compound amount.", "\\times1.1^2", "1210", "1000 × 1.21 = 1210.", money("1210")),
].map(withoutQuestionLatex);

// 1M compound-interest-formula
export const compoundFormulaY9Challenge: PracticeQuestion[] = [
  q("y9c-cif-1", "Find A for P = 8000, r = 0.06, n = 4.", "P(1+r)^n", "10099.82", "8000 × 1.06⁴ = 10099.82.", money("10099.82")),
  q("y9c-cif-2", "Find the interest (A − P) for P = 5000, r = 0.04, n = 3.", "A-P", "624.32", "A = 5624.32; interest 624.32.", money("624.32")),
  q("y9c-cif-3", "Monthly: P = 1200, 1% per month, n = 6. Find A.", "P(1+r)^n", "1273.82", "1200 × 1.01⁶ = 1273.82.", money("1273.82")),
  q("y9c-cif-4", "Find A for P = 25 000, r = 0.03, n = 4.", "P(1+r)^n", "28137.72", "25000 × 1.03⁴ = 28137.72.", money("28137.72")),
  q("y9c-cif-5", "Quarterly: P = 4000, 2% per quarter, n = 8. Find A.", "P(1+r)^n", "4686.64", "4000 × 1.02⁸ = 4686.64.", money("4686.64")),
  q("y9c-cif-6", "Find the interest (A − P) for P = 10 000, r = 0.05, n = 4.", "A-P", "2155.06", "A = 12155.06; interest 2155.06.", money("2155.06")),
  q("y9c-cif-7", "Find A for P = 1500, r = 0.08, n = 3.", "P(1+r)^n", "1889.57", "1500 × 1.08³ = 1889.57.", money("1889.57")),
  q("y9c-cif-8", "Find A for P = 600, r = 0.1, n = 4.", "P(1+r)^n", "878.46", "600 × 1.1⁴ = 878.46.", money("878.46")),
  q("y9c-cif-9", "Find A for P = 20 000, r = 0.045, n = 2.", "P(1+r)^n", "21840.50", "20000 × 1.045² = 21840.50.", money("21840.50")),
  q("y9c-cif-10", "P = 1000 at 6% compounded half-yearly (3% per half-year) for 2 years (n = 4). Find A.", "P(1+r)^n", "1125.51", "1000 × 1.03⁴ = 1125.51.", money("1125.51")),
  q("y9c-cif-11", "Find the interest (A − P) for P = 2000, r = 0.075, n = 2.", "A-P", "311.25", "A = 2311.25; interest 311.25.", money("311.25")),
  q("y9c-cif-12", "Find A for P = 50 000, r = 0.02, n = 5.", "P(1+r)^n", "55204.04", "50000 × 1.02⁵ = 55204.04.", money("55204.04")),
].map(withoutQuestionLatex);
