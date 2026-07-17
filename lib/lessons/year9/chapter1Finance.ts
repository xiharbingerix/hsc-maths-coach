// Year 9 Wave 2 — Chapter 1, Finance sections (ADR-Y9-001, all core): income (1I),
// payg-income-tax (1J), compound-interest-depreciation (1L), compound-interest-formula (1M).
// (simple-interest 1K authored in Wave 1.) Full per-subtopic contract. Tax/levy questions state the
// rule inline so every answer is markable.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import { withoutPracticeLatex } from "../questionHelpers";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Identify the amounts and the rule before calculating.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Reason about the financial idea, then compute.", explanation };
}
const money = (a: string) => [a, `$${a}`, a.includes(".") ? a : `${a}.00`, `$${a}.00`];

// ── 1I income (core) ───────────────────────────────────────────────────────────────────
const income: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Calculate gross income from wages, salaries, overtime, commission and piecework.",
  learningIntention: "Work out earnings from different pay structures.",
  successCriteria: ["Find wages from an hourly rate and hours.", "Convert between annual, monthly, fortnightly and weekly pay.", "Calculate overtime (time-and-a-half, double-time).", "Calculate commission and piecework pay."],
  teaching: {
    paragraphs: [
      "WAGES are paid per hour worked: hours × hourly rate. 38 hours at $25/h = $950. A SALARY is a fixed annual amount, paid in regular instalments — $52 000 per year ÷ 52 = $1000 per week.",
      "OVERTIME is paid at a higher rate. ‘Time-and-a-half’ is 1.5 × the normal rate; ‘double-time’ is 2 ×. So 4 overtime hours at a $20 base = 4 × $30 = $120.",
      "COMMISSION is a percentage of sales: 5% commission on $8000 of sales = $400. PIECEWORK pays per item made.",
      "GROSS pay is before deductions; NET pay is what's left after tax and other deductions.",
    ],
    latexBlocks: ["\\text{wages} = \\text{hours} \\times \\text{rate}", "\\text{time-and-a-half} = 1.5 \\times \\text{rate}", "\\text{commission} = \\%\\times \\text{sales}"],
  },
  workedExamples: [
    { title: "Wages", questionLatex: "\\text{38 hours at } \\$25/\\text{h. Find the pay.}", steps: [{ explanation: "hours × rate.", latex: "38 \\times 25 = 950" }], finalAnswerLatex: "\\$950" },
    { title: "Salary per week", questionLatex: "\\text{Salary } \\$52\\,000/\\text{yr. Weekly pay?}", steps: [{ explanation: "÷ 52.", latex: "1000" }], finalAnswerLatex: "\\$1000" },
    { title: "Commission", questionLatex: "\\text{5\\% commission on } \\$8000 \\text{ sales.}", steps: [{ explanation: "0.05 × 8000.", latex: "400" }], finalAnswerLatex: "\\$400" },
  ],
  guidedPractice: [
    ans("y9-inc-g1", "Find the pay for 40 hours at $20/h.", "", "800", 2, "40 × 20 = 800.", money("800")),
    ans("y9-inc-g2", "Find the pay for 35 hours at $24/h.", "", "840", 2, "35 × 24 = 840.", money("840")),
    ans("y9-inc-g3", "Find 10% commission on $5000 of sales.", "", "500", 2, "0.10 × 5000 = 500.", money("500")),
    mcq("y9-inc-g4", "Overtime is usually paid at a rate that is:", "A", ["higher than normal", "lower than normal", "the same", "zero"], 2, "Overtime pays a higher rate (e.g. 1.5×)."),
  ],
  independentPractice: [
    ans("y9-inc-i1", "Find the pay for 30 hours at $18/h.", "", "540", 2, "30 × 18 = 540.", money("540")),
    ans("y9-inc-i2", "Find the overtime pay for 4 hours at time-and-a-half on a $20 base rate.", "", "120", 3, "1.5×20 = 30; 4 × 30 = 120.", money("120")),
    ans("y9-inc-i3", "A salary of $78 000/yr is paid monthly. Find the monthly pay.", "", "6500", 2, "78000 ÷ 12 = 6500.", money("6500")),
    ans("y9-inc-i4", "Find 8% commission on $2500 of sales.", "", "200", 2, "0.08 × 2500 = 200.", money("200")),
    mcq("y9-inc-i5", "Gross pay is the amount:", "A", ["before deductions", "after tax", "after all deductions", "of commission only"], 2, "Gross = before deductions."),
  ],
  masteryQuiz: [
    ans("y9-inc-m1", "Find the pay for 38 hours at $25/h.", "", "950", 2, "950.", money("950")),
    ans("y9-inc-m2", "A salary of $52 000/yr is paid weekly. Find the weekly pay.", "", "1000", 2, "1000.", money("1000")),
    ans("y9-inc-m3", "Find 5% commission on $8000 of sales.", "", "400", 2, "400.", money("400")),
    ans("y9-inc-m4", "38 hours at $20/h plus 7 overtime hours at time-and-a-half. Total pay?", "", "970", 4, "760 + 7×30(=210) = 970.", money("970")),
    mcq("y9-inc-m5", "Net pay is the amount:", "B", ["before deductions", "after deductions", "of overtime only", "of commission only"], 2, "Net = after deductions."),
    ans("y9-inc-m6", "A fortnightly pay of $1500 — find the annual amount (26 fortnights).", "", "39000", 3, "1500 × 26 = 39000.", money("39000")),
    ans("y9-inc-m7", "Find the pay for 20 hours at $15/h.", "", "300", 2, "300.", money("300")),
    ans("y9-inc-m8", "Find the pay for 5 hours at double-time on a $22 base rate.", "", "220", 3, "2×22 = 44; 5 × 44 = 220.", money("220")),
    ans("y9-inc-m9", "Piecework: 200 items at $0.50 each. Find the pay.", "", "100", 2, "200 × 0.50 = 100.", money("100")),
    mcq("y9-inc-m10", "A salary is usually expressed as a fixed:", "A", ["annual amount", "hourly rate", "per-item rate", "commission"], 2, "Salary = fixed annual amount."),
  ],
  masteryQuizPool: [
    ans("y9-inc-p1", "Earns $20/h, time-and-a-half after 40 h. Find the pay for a 46-hour week.", "", "980", 5, "800 + 6×30(=180) = 980.", money("980")),
    ans("y9-inc-p2", "A worker earns $1100 in a week at $20/h base with time-and-a-half after 40 h. How many overtime hours?", "\\text{solve}", "10", 5, "40×20 = 800; remaining 300 at $30/h = 10 OT hours.", ["10 hours"]),
    ans("y9-inc-p3", "Base $25 000/yr plus 4% commission on $150 000 sales. Total annual income?", "", "31000", 5, "25000 + 6000 = 31000.", money("31000")),
    ans("y9-inc-p4", "Paid $1800/fortnight. Find the equivalent annual salary.", "", "46800", 5, "1800 × 26 = 46800.", money("46800")),
    ans("y9-inc-p5", "Works 35 h at $28/h, plus 5 h at double-time. Total pay?", "", "1260", 5, "980 + 5×56(=280) = 1260.", money("1260")),
    ans("y9-inc-p6", "Monthly pay $5500. Find the annual salary.", "", "66000", 5, "5500 × 12 = 66000.", money("66000")),
    ans("y9-inc-p7", "Commission only: 6% on sales. To earn $900, what sales are needed?", "", "15000", 5, "S = 900 ÷ 0.06 = 15000.", money("15000")),
    ans("y9-inc-p8", "$24/h, 38-h week. Find the annual income (52 weeks).", "", "47424", 5, "912/wk × 52 = 47424.", money("47424")),
    ans("y9-inc-p9", "Piecework $0.80/item; produced 350 items, plus a $50 bonus. Total?", "", "330", 5, "280 + 50 = 330.", money("330")),
    ans("y9-inc-p10", "Earns $30/h normal, time-and-a-half OT. A pay of $1320 for a week with 40 normal hours — total hours?", "\\text{solve}", "42.67", 5, "40×30 = 1200; 120 left at $45/h = 2.67 OT h → ≈42.67 h total.", ["42.7"]),
  ],
  commonMistakes: [
    { mistake: "Paying overtime at the normal rate.", fix: "Time-and-a-half = 1.5×, double-time = 2×." },
    { mistake: "Dividing an annual salary by 12 for weekly pay.", fix: "Weekly = ÷52, monthly = ÷12, fortnightly = ÷26." },
    { mistake: "Taking commission of the wrong base.", fix: "Commission = rate × sales." },
    { mistake: "Confusing gross and net pay.", fix: "Gross is before deductions; net is after." },
  ],
  masteryPassMark: 0.8,
});

// ── 1J payg-income-tax (core) ──────────────────────────────────────────────────────────
const paygIncomeTax: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Find taxable income, calculate income tax from a stated rate, the Medicare levy and net pay.",
  learningIntention: "Work through taxable income, tax, levy and take-home pay.",
  successCriteria: ["Find taxable income = gross − deductions.", "Apply a stated tax rate over the tax-free threshold.", "Calculate the Medicare levy.", "Find net (take-home) income."],
  teaching: {
    paragraphs: [
      "TAXABLE INCOME is gross income minus allowable DEDUCTIONS. Gross $60 000 with $2000 of deductions gives a taxable income of $58 000.",
      "Income below the TAX-FREE THRESHOLD ($18 200) is taxed at $0. Above it, tax is charged at a rate per dollar. If tax is 19c per $1 over $18 200, then on $30 000 the tax is 0.19 × (30 000 − 18 200) = $2242.",
      "The MEDICARE LEVY is an extra charge, usually 2% of taxable income: 2% of $50 000 = $1000.",
      "NET (take-home) income is gross minus tax (and levy). PAYG means tax is withheld ‘as you go’ from each pay.",
    ],
    latexBlocks: ["\\text{taxable} = \\text{gross} - \\text{deductions}", "\\text{tax} = 0.19\\times(\\text{income}-18200)", "\\text{Medicare} = 0.02 \\times \\text{income}"],
  },
  workedExamples: [
    { title: "Taxable income", questionLatex: "\\text{Gross } \\$60\\,000, \\text{ deductions } \\$2000.", steps: [{ explanation: "gross − deductions.", latex: "\\$58\\,000" }], finalAnswerLatex: "\\$58\\,000" },
    { title: "Tax (stated rate)", questionLatex: "\\text{Tax } 19c/\\$ \\text{ over } \\$18\\,200, \\text{ income } \\$30\\,000.", steps: [{ explanation: "0.19 × (30000 − 18200).", latex: "0.19 \\times 11800 = 2242" }], finalAnswerLatex: "\\$2242" },
    { title: "Medicare levy", questionLatex: "\\text{Find 2\\% Medicare levy on } \\$50\\,000.", steps: [{ explanation: "0.02 × 50000.", latex: "1000" }], finalAnswerLatex: "\\$1000" },
  ],
  guidedPractice: [
    ans("y9-tax-g1", "Find taxable income: gross $45 000, deductions $1500.", "", "43500", 2, "45000 − 1500 = 43500.", money("43500")),
    ans("y9-tax-g2", "Find the 2% Medicare levy on $60 000.", "", "1200", 2, "0.02 × 60000 = 1200.", money("1200")),
    ans("y9-tax-g3", "Tax is 19c per $1 over $18 200. Find the tax on $25 000.", "", "1292", 3, "0.19 × (25000 − 18200) = 0.19 × 6800 = 1292.", money("1292")),
    mcq("y9-tax-g4", "Taxable income equals gross income minus:", "A", ["deductions", "the levy", "net pay", "commission"], 2, "Taxable = gross − deductions."),
  ],
  independentPractice: [
    ans("y9-tax-i1", "Find taxable income: gross $80 000, deductions $3000.", "", "77000", 2, "77000.", money("77000")),
    ans("y9-tax-i2", "Find the 2% Medicare levy on $48 000.", "", "960", 2, "0.02 × 48000 = 960.", money("960")),
    ans("y9-tax-i3", "Tax is 19c per $1 over $18 200. Find the tax on $40 000.", "", "4142", 3, "0.19 × 21800 = 4142.", money("4142")),
    ans("y9-tax-i4", "Net income = gross − tax. Gross $50 000, tax $6000. Find net.", "", "44000", 2, "44000.", money("44000")),
    mcq("y9-tax-i5", "The Medicare levy is usually:", "C", ["10%", "5%", "2%", "0.5%"], 2, "Typically 2% of taxable income."),
  ],
  masteryQuiz: [
    ans("y9-tax-m1", "Taxable income: gross $70 000, deductions $2500.", "", "67500", 2, "67500.", money("67500")),
    ans("y9-tax-m2", "2% Medicare levy on $75 000.", "", "1500", 2, "1500.", money("1500")),
    ans("y9-tax-m3", "Tax 19c/$ over $18 200. Find the tax on $35 000.", "", "3192", 3, "0.19 × 16800 = 3192.", money("3192")),
    ans("y9-tax-m4", "Net = gross − tax. Gross $60 000, tax $11 000. Find net.", "", "49000", 2, "49000.", money("49000")),
    mcq("y9-tax-m5", "Income below $18 200 is taxed at:", "A", ["$0", "19%", "2%", "10%"], 2, "Below the tax-free threshold → $0 tax."),
    ans("y9-tax-m6", "Taxable income: gross $90 000, deductions $5000.", "", "85000", 2, "85000.", money("85000")),
    ans("y9-tax-m7", "2% Medicare levy on $40 000.", "", "800", 2, "800.", money("800")),
    ans("y9-tax-m8", "Tax 19c/$ over $18 200. Find the tax on $20 000.", "", "342", 3, "0.19 × 1800 = 342.", money("342")),
    ans("y9-tax-m9", "Net = gross − tax. Gross $80 000, tax $18 000. Find net.", "", "62000", 2, "62000.", money("62000")),
    mcq("y9-tax-m10", "PAYG means income tax is:", "A", ["withheld as you earn", "paid once a decade", "optional", "a flat $1000"], 2, "Pay-As-You-Go: withheld from each pay."),
  ],
  masteryQuizPool: [
    ans("y9-tax-p1", "Tax 19c/$ over $18 200 plus a 2% Medicare levy on the whole income. Total payable on $45 000?", "\\text{tax+levy}", "5992", 5, "Tax 0.19×26800 = 5092; levy 0.02×45000 = 900; total 5992.", money("5992")),
    ans("y9-tax-p2", "Income $45 000, tax $5092, levy $900. Find the net income.", "", "39008", 5, "45000 − 5992 = 39008.", money("39008")),
    ans("y9-tax-p3", "Gross $66 000, deductions $4000; tax 19c/$ over $18 200 on the taxable income. Find the tax.", "", "8322", 5, "Taxable 62000; 0.19 × 43800 = 8322.", money("8322")),
    ans("y9-tax-p4", "2% Medicare levy on a taxable income of $83 500.", "", "1670", 5, "0.02 × 83500 = 1670.", money("1670")),
    ans("y9-tax-p5", "Tax 19c/$ over $18 200. The tax paid is $3800 — find the taxable income.", "\\text{solve}", "38200", 5, "3800/0.19 = 20000 over threshold → 18200 + 20000 = 38200.", money("38200")),
    ans("y9-tax-p6", "Gross $52 000, deductions $1800, tax 19c/$ over $18 200. Find the tax.", "", "6080", 5, "Taxable 50200; 0.19 × 32000 = 6080.", money("6080")),
    ans("y9-tax-p7", "Net income after $7000 tax and $1000 levy on a $50 000 gross. Find the net.", "", "42000", 5, "50000 − (7000+1000) = 42000.", money("42000")),
    ans("y9-tax-p8", "2% Medicare levy on $123 500.", "", "2470", 5, "0.02 × 123500 = 2470.", money("2470")),
    ans("y9-tax-p9", "Tax 19c/$ over $18 200 on $28 200. Find the tax.", "", "1900", 5, "0.19 × 10000 = 1900.", money("1900")),
    ans("y9-tax-p10", "Gross $40 000, tax $4142, levy 2% of gross. Find the net income.", "", "35058", 5, "Levy 800; net = 40000 − 4142 − 800 = 35058.", money("35058")),
  ],
  commonMistakes: [
    { mistake: "Taxing the whole income, not just the part over the threshold.", fix: "Tax applies per $ OVER $18 200." },
    { mistake: "Forgetting the Medicare levy.", fix: "Add the 2% levy where the question includes it." },
    { mistake: "Confusing taxable income with gross.", fix: "Taxable = gross − deductions." },
    { mistake: "Reporting tax as the net pay.", fix: "Net = gross − tax (− levy)." },
  ],
  masteryPassMark: 0.8,
});

// ── 1L compound-interest-depreciation (core) ───────────────────────────────────────────
const compoundInterestDepreciation: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Calculate compound interest and depreciation by repeated multiplication.",
  learningIntention: "Grow or shrink an amount year-on-year by a percentage.",
  successCriteria: ["Compound interest by multiplying by (1 + r) each period.", "Depreciate by multiplying by (1 − r) each period.", "See why compound beats simple over time.", "Compute multi-year amounts."],
  teaching: {
    paragraphs: [
      "COMPOUND INTEREST earns interest on the interest already added — so each period you multiply by (1 + r). $1000 at 10% for 2 years = 1000 × 1.1 × 1.1 = 1000 × 1.1² = $1210 (simple interest would give only $1200).",
      "DEPRECIATION is the same idea going DOWN: each period multiply by (1 − r). A $20 000 car depreciating 10%/year for 2 years is worth 20 000 × 0.9² = $16 200.",
      "Because the base keeps changing, compound growth pulls ahead of simple interest the longer it runs.",
      "For n periods you multiply by the factor n times — i.e. raise it to the power n.",
    ],
    latexBlocks: ["\\text{compound: } \\times(1+r)\\text{ each period}", "\\text{depreciation: } \\times(1-r)\\text{ each period}", "1000 \\times 1.1^2 = 1210"],
  },
  workedExamples: [
    { title: "Compound interest", questionLatex: "\\$1000 \\text{ at } 10\\% \\text{ compounded for 2 years.}", steps: [{ explanation: "× 1.1 twice.", latex: "1000 \\times 1.1^2 = 1210" }], finalAnswerLatex: "\\$1210" },
    { title: "Depreciation", questionLatex: "\\$20\\,000 \\text{ depreciating } 10\\%/\\text{yr for 2 years.}", steps: [{ explanation: "× 0.9 twice.", latex: "20000 \\times 0.9^2 = 16200" }], finalAnswerLatex: "\\$16\\,200" },
    { title: "One year", questionLatex: "\\$5000 \\text{ depreciating } 20\\% \\text{ for 1 year.}", steps: [{ explanation: "× 0.8.", latex: "4000" }], finalAnswerLatex: "\\$4000" },
  ],
  guidedPractice: [
    ans("y9-cid-g1", "$1000 at 10% compounded for 1 year. Find the amount.", "", "1100", 2, "1000 × 1.1 = 1100.", money("1100")),
    ans("y9-cid-g2", "$1000 at 10% compounded for 2 years. Find the amount.", "", "1210", 3, "1000 × 1.1² = 1210.", money("1210")),
    ans("y9-cid-g3", "Depreciate $5000 by 20% for 1 year.", "", "4000", 2, "5000 × 0.8 = 4000.", money("4000")),
    mcq("y9-cid-g4", "Compound interest, unlike simple, earns interest on:", "A", ["the interest already added", "only the original principal", "deductions", "nothing"], 2, "Compound earns interest on accrued interest."),
  ],
  independentPractice: [
    ans("y9-cid-i1", "$2000 at 5% compounded for 2 years. Find the amount.", "", "2205", 3, "2000 × 1.05² = 2205.", money("2205")),
    ans("y9-cid-i2", "Depreciate $10 000 by 10% per year for 2 years.", "", "8100", 3, "10000 × 0.9² = 8100.", money("8100")),
    ans("y9-cid-i3", "$500 at 10% compounded for 3 years. Find the amount.", "", "665.50", 4, "500 × 1.1³ = 665.50.", money("665.50")),
    ans("y9-cid-i4", "Depreciate $8000 by 25% for 1 year.", "", "6000", 2, "8000 × 0.75 = 6000.", money("6000")),
    mcq("y9-cid-i5", "Depreciation is a repeated:", "B", ["increase", "decrease", "addition", "rounding"], 2, "Depreciation reduces the value each period."),
  ],
  masteryQuiz: [
    ans("y9-cid-m1", "$1000 at 10% compounded for 2 years.", "", "1210", 3, "1210.", money("1210")),
    ans("y9-cid-m2", "$4000 at 5% compounded for 1 year.", "", "4200", 2, "4200.", money("4200")),
    ans("y9-cid-m3", "Depreciate $30 000 by 20% for 1 year.", "", "24000", 2, "24000.", money("24000")),
    ans("y9-cid-m4", "$1000 at 20% compounded for 2 years.", "", "1440", 3, "1000 × 1.44 = 1440.", money("1440")),
    mcq("y9-cid-m5", "Over several years, compound interest gives a total that is:", "A", ["more than simple", "less than simple", "the same as simple", "always zero"], 3, "Compound exceeds simple over time."),
    ans("y9-cid-m6", "$2000 at 10% compounded for 2 years.", "", "2420", 3, "2000 × 1.21 = 2420.", money("2420")),
    ans("y9-cid-m7", "Depreciate $1000 by 10% per year for 2 years.", "", "810", 3, "1000 × 0.81 = 810.", money("810")),
    ans("y9-cid-m8", "$5000 at 4% compounded for 1 year.", "", "5200", 2, "5200.", money("5200")),
    ans("y9-cid-m9", "$1000 at 100% compounded for 2 years.", "", "4000", 3, "1000 × 2² = 4000.", money("4000")),
    ans("y9-cid-m10", "Depreciate $2000 by 50% for 1 year.", "", "1000", 2, "1000.", money("1000")),
  ],
  masteryQuizPool: [
    ans("y9-cid-p1", "$1000 at 10% compounded for 3 years.", "", "1331", 5, "1000 × 1.331 = 1331.", money("1331")),
    ans("y9-cid-p2", "Depreciate $25 000 by 20% per year for 3 years.", "", "12800", 5, "25000 × 0.512 = 12800.", money("12800")),
    ans("y9-cid-p3", "$3000 at 6% compounded for 2 years.", "", "3370.80", 5, "3000 × 1.1236 = 3370.80.", money("3370.80")),
    ans("y9-cid-p4", "Compound interest EARNED on $2000 at 5% over 2 years (interest only).", "A-P", "205", 5, "A = 2205; interest = 205.", money("205")),
    ans("y9-cid-p5", "$10 000 at 8% compounded for 3 years.", "", "12597.12", 5, "10000 × 1.259712 = 12597.12.", money("12597.12")),
    ans("y9-cid-p6", "A $40 000 machine depreciates 25%/yr. Value after 2 years?", "", "22500", 5, "40000 × 0.5625 = 22500.", money("22500")),
    ans("y9-cid-p7", "How much MORE does $1000 at 10% compound earn vs simple over 2 years?", "\\text{compare}", "10", 5, "Compound 1210 vs simple 1200 → $10 more.", money("10")),
    ans("y9-cid-p8", "$5000 at 4% compounded for 2 years.", "", "5408", 5, "5000 × 1.0816 = 5408.", money("5408")),
    ans("y9-cid-p9", "Depreciate $12 000 by 10%/yr for 3 years.", "", "8748", 5, "12000 × 0.729 = 8748.", money("8748")),
    ans("y9-cid-p10", "$800 at 25% compounded for 2 years.", "", "1250", 5, "800 × 1.5625 = 1250.", money("1250")),
  ],
  commonMistakes: [
    { mistake: "Using simple interest for a compound question.", fix: "Multiply by (1 + r) each period, not P×r×n." },
    { mistake: "Multiplying by the rate instead of the factor.", fix: "10% → × 1.1 (growth) or × 0.9 (depreciation)." },
    { mistake: "Multiplying once for several years.", fix: "Raise the factor to the power n." },
    { mistake: "Using (1 + r) for depreciation.", fix: "Depreciation uses (1 − r)." },
  ],
  masteryPassMark: 0.8,
});

// ── 1M compound-interest-formula (core) ────────────────────────────────────────────────
const compoundInterestFormula: Partial<ExplicitLesson> = withoutPracticeLatex({
  description: "Use the compound interest formula A = P(1 + r)ⁿ to find the final amount.",
  learningIntention: "Apply A = P(1 + r)ⁿ and identify P, r and n.",
  successCriteria: ["Identify P, r (as a decimal) and n.", "Compute A = P(1 + r)ⁿ.", "Find the interest as A − P.", "Recognise (1 + r) as the growth factor."],
  teaching: {
    paragraphs: [
      "The COMPOUND INTEREST formula packages the repeated multiplication: A = P(1 + r)ⁿ, where P is the principal, r the rate per period as a DECIMAL, and n the number of periods.",
      "For P = $1000, r = 0.1, n = 2: A = 1000 × (1.1)² = $1210. The (1 + r) part is the GROWTH FACTOR applied n times.",
      "For P = $5000, r = 0.05, n = 3: A = 5000 × (1.05)³ = $5788.13 (to the nearest cent).",
      "The INTEREST earned is A − P. Watch that r matches the period — a yearly rate with n in years.",
    ],
    latexBlocks: ["A = P(1+r)^n", "1000(1.1)^2 = 1210", "\\text{interest} = A - P"],
  },
  workedExamples: [
    { title: "Apply the formula", questionLatex: "P=1000,\\ r=0.1,\\ n=2.", steps: [{ explanation: "A = P(1+r)ⁿ.", latex: "1000(1.1)^2 = 1210" }], finalAnswerLatex: "\\$1210" },
    { title: "Three periods", questionLatex: "P=5000,\\ r=0.05,\\ n=3.", steps: [{ explanation: "5000 × 1.05³.", latex: "\\approx 5788.13" }], finalAnswerLatex: "\\$5788.13" },
    { title: "Identify n", questionLatex: "\\text{In } A=P(1+r)^n, \\text{ what is } n?", steps: [{ explanation: "The exponent.", latex: "\\text{number of periods}" }], finalAnswerLatex: "\\text{periods}" },
  ],
  guidedPractice: [
    ans("y9-cif-g1", "Find A for P = 2000, r = 0.1, n = 1.", "P(1+r)^n", "2200", 2, "2000 × 1.1 = 2200.", money("2200")),
    ans("y9-cif-g2", "Find A for P = 1000, r = 0.05, n = 2.", "P(1+r)^n", "1102.50", 3, "1000 × 1.05² = 1102.50.", money("1102.50")),
    mcq("y9-cif-g3", "In A = P(1 + r)ⁿ, the n is the:", "C", ["principal", "rate", "number of periods", "final amount"], 2, "n is the number of compounding periods."),
    ans("y9-cif-g4", "Find A for P = 100, r = 0.1, n = 2.", "P(1+r)^n", "121", 2, "100 × 1.21 = 121.", money("121")),
  ],
  independentPractice: [
    ans("y9-cif-i1", "Find A for P = 4000, r = 0.05, n = 2.", "P(1+r)^n", "4410", 3, "4000 × 1.1025 = 4410.", money("4410")),
    ans("y9-cif-i2", "Find A for P = 1000, r = 0.2, n = 3.", "P(1+r)^n", "1728", 3, "1000 × 1.728 = 1728.", money("1728")),
    ans("y9-cif-i3", "Find A for P = 10 000, r = 0.03, n = 2.", "P(1+r)^n", "10609", 3, "10000 × 1.0609 = 10609.", money("10609")),
    mcq("y9-cif-i4", "In the formula, r should be written as a:", "B", ["percentage", "decimal", "fraction over n", "whole number"], 2, "r is the rate as a decimal."),
    ans("y9-cif-i5", "Find A for P = 500, r = 0.1, n = 2.", "P(1+r)^n", "605", 2, "500 × 1.21 = 605.", money("605")),
  ],
  masteryQuiz: [
    ans("y9-cif-m1", "Find A for P = 1000, r = 0.1, n = 3.", "P(1+r)^n", "1331", 3, "1000 × 1.331 = 1331.", money("1331")),
    ans("y9-cif-m2", "Find A for P = 2000, r = 0.05, n = 2.", "P(1+r)^n", "2205", 3, "2000 × 1.1025 = 2205.", money("2205")),
    ans("y9-cif-m3", "Find A for P = 1000, r = 0.06, n = 2.", "P(1+r)^n", "1123.60", 3, "1000 × 1.1236 = 1123.60.", money("1123.60")),
    mcq("y9-cif-m4", "A = P(1 + r)ⁿ gives the:", "C", ["interest only", "principal", "final amount", "rate"], 2, "A is the final amount."),
    ans("y9-cif-m5", "Find A for P = 5000, r = 0.04, n = 2.", "P(1+r)^n", "5408", 3, "5000 × 1.0816 = 5408.", money("5408")),
    ans("y9-cif-m6", "Find A for P = 100, r = 0.5, n = 2.", "P(1+r)^n", "225", 3, "100 × 1.5² = 225.", money("225")),
    ans("y9-cif-m7", "Find A for P = 8000, r = 0.025, n = 2.", "P(1+r)^n", "8405", 4, "8000 × 1.025² = 8405.", money("8405")),
    ans("y9-cif-m8", "Find A for P = 1000, r = 0.1, n = 0.", "P(1+r)^0", "1000", 3, "Anything to the power 0 is 1 → A = P = 1000.", money("1000")),
    mcq("y9-cif-m9", "In A = P(1 + r)ⁿ, the (1 + r) is the:", "A", ["growth factor", "principal", "interest", "deduction"], 3, "(1 + r) is the per-period growth factor."),
    ans("y9-cif-m10", "Find A for P = 2000, r = 0.1, n = 2.", "P(1+r)^n", "2420", 3, "2000 × 1.21 = 2420.", money("2420")),
  ],
  masteryQuizPool: [
    ans("y9-cif-p1", "Find A for P = 10 000, r = 0.08, n = 3.", "P(1+r)^n", "12597.12", 5, "10000 × 1.08³ = 12597.12.", money("12597.12")),
    ans("y9-cif-p2", "Find the interest (A − P) for P = 2000, r = 0.05, n = 2.", "A-P", "205", 5, "A = 2205; 2205 − 2000 = 205.", money("205")),
    ans("y9-cif-p3", "Find A for P = 1000, r = 0.02, n = 4.", "P(1+r)^n", "1082.43", 5, "1000 × 1.02⁴ = 1082.43.", money("1082.43")),
    ans("y9-cif-p4", "Find A for P = 15 000, r = 0.04, n = 3.", "P(1+r)^n", "16872.96", 5, "15000 × 1.04³ = 16872.96.", money("16872.96")),
    ans("y9-cif-p5", "Find the interest (A − P) for P = 5000, r = 0.1, n = 2.", "A-P", "1050", 5, "A = 6050; interest = 1050.", money("1050")),
    ans("y9-cif-p6", "Find A for P = 1200, r = 0.025, n = 2.", "P(1+r)^n", "1260.75", 5, "1200 × 1.025² = 1260.75.", money("1260.75")),
    ans("y9-cif-p7", "Find A for P = 600, r = 0.1, n = 3.", "P(1+r)^n", "798.60", 5, "600 × 1.331 = 798.60.", money("798.60")),
    ans("y9-cif-p8", "Quarterly: P = 1000, 2% per quarter, n = 4 quarters. Find A.", "P(1+r)^n", "1082.43", 5, "1000 × 1.02⁴ = 1082.43.", money("1082.43")),
    ans("y9-cif-p9", "Find A for P = 2500, r = 0.06, n = 2.", "P(1+r)^n", "2809", 5, "2500 × 1.1236 = 2809.", money("2809")),
    ans("y9-cif-p10", "Find the interest (A − P) for P = 1000, r = 0.1, n = 3.", "A-P", "331", 5, "A = 1331; interest = 331.", money("331")),
  ],
  commonMistakes: [
    { mistake: "Using the percentage instead of the decimal for r.", fix: "10% → r = 0.1." },
    { mistake: "Multiplying P by (1 + r) and then by n.", fix: "Raise (1 + r) to the power n." },
    { mistake: "Reporting A when the interest is wanted.", fix: "Interest = A − P." },
    { mistake: "Mismatching r and n periods.", fix: "Quarterly rate needs n counted in quarters." },
  ],
  masteryPassMark: 0.8,
});

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "income": income,
  "payg-income-tax": paygIncomeTax,
  "compound-interest-depreciation": compoundInterestDepreciation,
  "compound-interest-formula": compoundInterestFormula,
};

export function year9Chapter1FinanceLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "computation-financial-maths") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
