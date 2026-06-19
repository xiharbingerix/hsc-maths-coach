import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { enhanceYear9CoreLesson } from "./coreDepthEnhancements";

function moneyVariants(answer: string) {
  const value = Number(answer.replace(/[$,]/g, ""));
  if (!Number.isFinite(value)) return [answer];
  const plain = String(value);
  const fixed = value.toFixed(2);
  const comma = value.toLocaleString("en-AU", { maximumFractionDigits: 2 });
  const commaFixed = value.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return Array.from(new Set([answer, plain, `$${plain}`, fixed, `$${fixed}`, comma, `$${comma}`, commaFixed, `$${commaFixed}`]));
}

function money(id: string, prompt: string, latex: string, answer: string, explanation: string): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: moneyVariants(answer), hint: "Identify the amounts and operation before calculating.", explanation };
}

function number(id: string, prompt: string, latex: string, answer: string, explanation: string, acceptedAnswers: string[] = []): PracticeQuestion {
  const autoVariants: string[] = [];

  // Plain integers → decimal form (e.g. 11 → 11.0)
  if (/^-?\d+$/.test(answer)) {
    autoVariants.push(`${answer}.0`);
  }

  // Decimals → one trailing zero (e.g. 32.5 → 32.50)
  if (/^-?\d*\.\d+$/.test(answer)) {
    autoVariants.push(`${answer}0`);
  }

  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...autoVariants])), hint: "Identify the financial relationship, then calculate carefully.", explanation };
}

function choice(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], explanation: string, latex = ""): PracticeQuestion {
  return { id, prompt, latex, choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })), answer, hint: "Compare each option with the financial situation.", explanation };
}

type LessonContent = Pick<ExplicitLesson, "description" | "learningIntention" | "successCriteria" | "teaching" | "workedExamples" | "guidedPractice" | "independentPractice" | "commonMistakes" | "masteryQuiz">;

const wages: LessonContent = {
  description: "Calculate gross pay from hourly rates and working hours, and interpret simple payslip information.",
  learningIntention: "Calculate and compare earnings from ordinary hourly work.",
  successCriteria: ["Calculate gross pay from a rate and number of hours.", "Find hours worked from gross pay and hourly rate.", "Interpret a simple payslip.", "Compare earnings from two shifts."],
  teaching: { paragraphs: ["An hourly wage is the amount earned for each hour worked.", "Gross pay is the amount earned before tax or other deductions are removed.", "Multiply the hourly rate by the hours worked. Decimal hours can represent part of an hour, such as 12.5 hours.", "A simple payslip records details such as hours, hourly rate, gross pay and deductions."], latexBlocks: ["\\text{gross pay}=\\text{hourly rate}\\times\\text{hours worked}", "\\text{hours worked}=\\frac{\\text{gross pay}}{\\text{hourly rate}}"] },
  workedExamples: [
    { title: "Calculate gross pay", questionLatex: "\\text{Find the exact gross pay for 8 hours at }\\$22\\text{ per hour.}", steps: [{ explanation: "Multiply hours by the hourly rate.", latex: "8\\times22=176" }], finalAnswerLatex: "\\$176" },
    { title: "Use decimal hours", questionLatex: "\\text{Find the exact gross pay for 12.5 hours at }\\$24\\text{ per hour.}", steps: [{ explanation: "Multiply the decimal hours by the hourly rate.", latex: "12.5\\times24=300" }], finalAnswerLatex: "\\$300" },
    { title: "Find hours worked", questionLatex: "\\text{A worker earns }\\$315\\text{ at }\\$21\\text{ per hour. Find the hours worked.}", steps: [{ explanation: "Divide gross pay by hourly rate.", latex: "315\\div21=15" }], finalAnswerLatex: "15\\text{ hours}" },
  ],
  guidedPractice: [
    money("y9-fin-wage-g1", "Find the exact gross pay for 6 hours at 25 dollars per hour.", "\\text{6 hours at }\\$25/\\text{hour}", "150", "The gross pay is $150."),
    money("y9-fin-wage-g2", "Find the exact gross pay for 9.5 hours at 20 dollars per hour.", "\\text{9.5 hours at }\\$20/\\text{hour}", "190", "The gross pay is $190."),
    number("y9-fin-wage-g3", "A worker earns exactly 264 dollars at 24 dollars per hour. Find the hours worked.", "\\text{gross pay }\\$264,\\quad \\text{rate }\\$24/\\text{hour}", "11", "Divide $264 by $24."),
    choice("y9-fin-wage-g4", "Which amount on a simple payslip is the pay before deductions?", "B", ["Net pay", "Gross pay", "Tax withheld", "Savings"], "Gross pay is the amount earned before deductions."),
  ],
  independentPractice: [
    money("y9-fin-wage-i1", "Find the exact gross pay for 14 hours at 18 dollars per hour.", "\\text{14 hours at }\\$18/\\text{hour}", "252", "The gross pay is $252."),
    money("y9-fin-wage-i2", "Find the exact gross pay for 7.5 hours at 26 dollars per hour.", "\\text{7.5 hours at }\\$26/\\text{hour}", "195", "The gross pay is $195."),
    number("y9-fin-wage-i3", "A worker earns exactly 360 dollars at 30 dollars per hour. Find the hours worked.", "\\text{gross pay }\\$360,\\quad \\text{rate }\\$30/\\text{hour}", "12", "Divide $360 by $30."),
    choice("y9-fin-wage-i4", "Shift A is 8 hours at 23 dollars per hour. Shift B is 7 hours at 27 dollars per hour. Which pays more?", "B", ["Shift A by $5", "Shift B by $5", "They pay the same", "Shift A by $27"], "Shift A pays $184 and Shift B pays $189."),
    money("y9-fin-wage-i5", "A payslip records 16.5 ordinary hours at 22 dollars per hour. Find the exact gross pay.", "\\text{16.5 hours at }\\$22/\\text{hour}", "363", "The gross pay is $363."),
  ],
  commonMistakes: [
    { mistake: "Adding hours and hourly rate.", fix: "Gross pay uses multiplication: rate times hours." },
    { mistake: "Calling take-home pay gross pay.", fix: "Gross pay is before deductions; net pay is after deductions." },
    { mistake: "Ignoring a half hour.", fix: "Use decimal hours accurately, such as 7.5 hours." },
    { mistake: "Comparing hourly rates without checking hours.", fix: "Calculate each shift total before comparing." },
  ],
  masteryQuiz: [
    money("y9-fin-wage-m1", "Find the exact gross pay for 5 hours at 28 dollars per hour.", "\\text{5 hours at }\\$28/\\text{hour}", "140", "The gross pay is $140."),
    money("y9-fin-wage-m2", "Find the exact gross pay for 11.5 hours at 24 dollars per hour.", "\\text{11.5 hours at }\\$24/\\text{hour}", "276", "The gross pay is $276."),
    number("y9-fin-wage-m3", "A worker earns exactly 425 dollars at 25 dollars per hour. Find the hours worked.", "\\text{gross pay }\\$425,\\quad \\text{rate }\\$25/\\text{hour}", "17", "Divide $425 by $25."),
    choice("y9-fin-wage-m4", "Which calculation finds gross pay?", "C", ["hours + rate", "gross pay - tax", "hours x rate", "rate divided by hours"], "Multiply hours by hourly rate."),
    money("y9-fin-wage-m5", "Find the exact gross pay for 13.25 hours at 32 dollars per hour.", "\\text{13.25 hours at }\\$32/\\text{hour}", "424", "The gross pay is $424."),
    choice("y9-fin-wage-m6", "Shift A is 10 hours at 21 dollars per hour. Shift B is 8 hours at 27 dollars per hour. Which pays more?", "D", ["Shift A by $6", "Shift A by $21", "They pay the same", "Shift B by $6"], "Shift A pays $210 and Shift B pays $216."),
    number("y9-fin-wage-m7", "A payslip shows exact gross pay of 487.50 dollars for 15 hours. Find the hourly rate.", "\\text{gross pay }\\$487.50,\\quad \\text{15 hours}", "32.5", "Divide $487.50 by 15.", ["32.50"]),
    choice("y9-fin-wage-m8", "A payslip lists 18 hours at 24 dollars per hour but gross pay of 408 dollars. Which statement is correct?", "B", ["The payslip is correct", "The gross pay should be $432", "The hourly rate should be $18", "The worker earned $24"], "18 x $24 = $432."),
    money("y9-fin-wage-m9", "A student works 6.5 hours on Friday and 4.75 hours on Saturday at 20 dollars per hour. Find the exact combined gross pay.", "\\text{Friday 6.5 hours, Saturday 4.75 hours, rate }\\$20/\\text{hour}", "225", "The total time is 11.25 hours, giving $225."),
    choice("y9-fin-wage-m10", "Job A offers 12 hours at 25 dollars per hour. Job B offers 15 hours at 21 dollars per hour. Which statement is correct?", "C", ["Job A pays $15 more", "They pay the same", "Job B pays $15 more", "Job B pays $315 more"], "Job A pays $300 and Job B pays $315."),
  ],
};

const penalties: LessonContent = {
  description: "Calculate penalty rates, overtime rates and total pay from ordinary and overtime hours.",
  learningIntention: "Calculate earnings when some hours are paid at time-and-a-half or double time.",
  successCriteria: ["Calculate time-and-a-half and double-time rates.", "Separate ordinary and overtime hours.", "Calculate total pay from mixed rates.", "Apply penalty rates only to the relevant hours."],
  teaching: { paragraphs: ["A penalty rate is a higher hourly rate paid for particular hours, such as overtime or some weekend work.", "Time-and-a-half means 1.5 times the ordinary hourly rate. Double time means 2 times the ordinary rate.", "For a mixed shift, calculate ordinary pay and overtime pay separately, then add the results.", "Only apply the higher rate to the hours described as penalty or overtime hours."], latexBlocks: ["\\text{time-and-a-half rate}=1.5\\times\\text{ordinary rate}", "\\text{double-time rate}=2\\times\\text{ordinary rate}", "\\text{total pay}=\\text{ordinary pay}+\\text{overtime pay}"] },
  workedExamples: [
    { title: "Find an overtime rate", questionLatex: "\\text{Find time-and-a-half for an ordinary rate of }\\$28/\\text{hour.}", steps: [{ explanation: "Multiply the ordinary rate by 1.5.", latex: "28\\times1.5=42" }], finalAnswerLatex: "\\$42/\\text{hour}" },
    { title: "Calculate double-time pay", questionLatex: "\\text{Find the exact pay for 5 hours at double time when the ordinary rate is }\\$24/\\text{hour.}", steps: [{ explanation: "Find the double-time rate.", latex: "2\\times24=48" }, { explanation: "Multiply by the hours worked.", latex: "5\\times48=240" }], finalAnswerLatex: "\\$240" },
    { title: "Combine ordinary and overtime pay", questionLatex: "\\text{Find the exact total pay for 8 ordinary hours and 2 overtime hours at time-and-a-half when the ordinary rate is }\\$30/\\text{hour.}", steps: [{ explanation: "Find ordinary pay.", latex: "8\\times30=240" }, { explanation: "Find overtime pay.", latex: "2\\times(1.5\\times30)=90" }, { explanation: "Add the amounts.", latex: "240+90=330" }], finalAnswerLatex: "\\$330" },
  ],
  guidedPractice: [
    money("y9-fin-pen-g1", "Find the exact time-and-a-half hourly rate for an ordinary rate of 26 dollars per hour.", "\\text{ordinary rate }\\$26/\\text{hour}", "39", "The higher rate is $39 per hour."),
    money("y9-fin-pen-g2", "Find the exact double-time hourly rate for an ordinary rate of 23 dollars per hour.", "\\text{ordinary rate }\\$23/\\text{hour}", "46", "The higher rate is $46 per hour."),
    money("y9-fin-pen-g3", "Find the exact total pay for 8 ordinary hours and 2 time-and-a-half hours at an ordinary rate of 24 dollars per hour.", "\\text{8 ordinary hours, 2 overtime hours, ordinary rate }\\$24/\\text{hour}", "264", "Ordinary pay is $192 and overtime pay is $72."),
    choice("y9-fin-pen-g4", "A worker completes 8 ordinary hours and 2 overtime hours. Which approach is correct?", "A", ["Apply the ordinary rate to 8 hours and the overtime rate to 2 hours", "Apply overtime rate to all 10 hours", "Apply ordinary rate to all 10 hours", "Add the two hourly rates"], "Separate the ordinary and overtime hours."),
  ],
  independentPractice: [
    money("y9-fin-pen-i1", "Find the exact pay for 4 hours at double time when the ordinary rate is 27 dollars per hour.", "\\text{4 double-time hours, ordinary rate }\\$27/\\text{hour}", "216", "The double-time rate is $54."),
    money("y9-fin-pen-i2", "Find the exact total pay for 7 ordinary hours and 3 time-and-a-half hours at an ordinary rate of 20 dollars per hour.", "\\text{7 ordinary hours, 3 overtime hours, ordinary rate }\\$20/\\text{hour}", "230", "Ordinary pay is $140 and overtime pay is $90."),
    money("y9-fin-pen-i3", "Find the exact total pay for 6 ordinary hours and 2 double-time hours at an ordinary rate of 25 dollars per hour.", "\\text{6 ordinary hours, 2 double-time hours, ordinary rate }\\$25/\\text{hour}", "250", "Ordinary pay is $150 and penalty pay is $100."),
    choice("y9-fin-pen-i4", "Which multiplier represents time-and-a-half?", "B", ["0.5", "1.5", "2", "2.5"], "Time-and-a-half means 1.5 times the ordinary rate."),
    money("y9-fin-pen-i5", "Find the exact total pay for 5 ordinary hours and 4 time-and-a-half hours at an ordinary rate of 32 dollars per hour.", "\\text{5 ordinary hours, 4 overtime hours, ordinary rate }\\$32/\\text{hour}", "352", "Ordinary pay is $160 and overtime pay is $192."),
  ],
  commonMistakes: [
    { mistake: "Applying the penalty rate to every hour.", fix: "Apply it only to the hours stated as overtime or penalty hours." },
    { mistake: "Treating time-and-a-half as half the ordinary rate.", fix: "Time-and-a-half means 1.5 times the ordinary rate." },
    { mistake: "Adding rates instead of pay amounts.", fix: "Calculate pay for each group of hours, then add the dollar amounts." },
    { mistake: "Forgetting ordinary hours in a mixed shift.", fix: "Include both ordinary and penalty components." },
  ],
  masteryQuiz: [
    money("y9-fin-pen-m1", "Find the exact time-and-a-half hourly rate for an ordinary rate of 30 dollars per hour.", "\\text{ordinary rate }\\$30/\\text{hour}", "45", "Multiply by 1.5."),
    money("y9-fin-pen-m2", "Find the exact double-time hourly rate for an ordinary rate of 19 dollars per hour.", "\\text{ordinary rate }\\$19/\\text{hour}", "38", "Multiply by 2."),
    money("y9-fin-pen-m3", "Find the exact pay for 3 double-time hours at an ordinary rate of 22 dollars per hour.", "\\text{3 double-time hours, ordinary rate }\\$22/\\text{hour}", "132", "The double-time rate is $44."),
    choice("y9-fin-pen-m4", "Which calculation finds 2 time-and-a-half hours at 28 dollars per ordinary hour?", "C", ["$2\\times28$", "$1.5\\times2$", "$2\\times1.5\\times28$", "$2+1.5+28$"], "Multiply hours, multiplier and ordinary rate."),
    money("y9-fin-pen-m5", "Find the exact total pay for 8 ordinary hours and 3 time-and-a-half hours at 28 dollars per ordinary hour.", "\\text{8 ordinary hours, 3 overtime hours, ordinary rate }\\$28/\\text{hour}", "350", "Ordinary pay is $224 and overtime pay is $126."),
    money("y9-fin-pen-m6", "Find the exact total pay for 6 ordinary hours and 2 double-time hours at 31 dollars per ordinary hour.", "\\text{6 ordinary hours, 2 double-time hours, ordinary rate }\\$31/\\text{hour}", "310", "Ordinary pay is $186 and penalty pay is $124."),
    choice("y9-fin-pen-m7", "A worker earns 290 dollars for 8 ordinary hours and 2 time-and-a-half hours at 25 dollars per hour. Is the amount correct?", "A", ["No, the correct total is $275", "Yes, the total is correct", "No, the correct total is $250", "No, the correct total is $300"], "Ordinary pay is $200 and overtime pay is $75, totaling $275."),
    money("y9-fin-pen-m8", "A worker completes 7 ordinary hours, 2 time-and-a-half hours and 1 double-time hour at 24 dollars per ordinary hour. Find the exact total pay.", "\\text{7 ordinary, 2 time-and-a-half, 1 double-time hour at }\\$24/\\text{hour}", "288", "The parts are $168, $72 and $48."),
    choice("y9-fin-pen-m9", "Plan A pays 6 hours at 32 dollars per hour. Plan B pays 4 ordinary hours and 2 double-time hours at 24 dollars per hour. Which pays more?", "C", ["Plan A by $96", "Plan B by $96", "They pay the same", "Plan B by $24"], "Plan A pays $192 (6 × $32). Plan B pays $96 (4 × $24) + $96 (2 × $48) = $192. The plans pay the same amount."),
    money("y9-fin-pen-m10", "A payslip shows 8 ordinary hours at 27 dollars per hour and 4 overtime hours at time-and-a-half. Find the exact gross pay.", "\\text{8 ordinary hours and 4 time-and-a-half hours at }\\$27/\\text{hour}", "378", "Ordinary pay is $216 and overtime pay is $162."),
  ],
};

const nonWage: LessonContent = {
  description: "Calculate commission, piecework and bonus earnings, including simple base-pay combinations.",
  learningIntention: "Calculate and compare common forms of non-wage earnings.",
  successCriteria: ["Calculate commission from sales.", "Calculate piecework earnings.", "Add a bonus or commission to base pay.", "Compare earning arrangements."],
  teaching: { paragraphs: ["Some earnings are linked to results rather than hours worked.", "Commission is a percentage of sales. Piecework pays a fixed amount for each item completed.", "A bonus is an extra payment. Some jobs combine base pay with commission or a bonus.", "Compare arrangements by calculating the total earnings for the same situation."], latexBlocks: ["\\text{commission}=\\text{sales}\\times\\text{commission rate}", "\\text{piecework earnings}=\\text{items}\\times\\text{rate per item}", "\\text{total earnings}=\\text{base pay}+\\text{extra earnings}"] },
  workedExamples: [
    { title: "Calculate commission", questionLatex: "\\text{Find the exact 5\\% commission on }\\$2400\\text{ of sales.}", steps: [{ explanation: "Convert the rate and multiply by sales.", latex: "0.05\\times2400=120" }], finalAnswerLatex: "\\$120" },
    { title: "Calculate piecework", questionLatex: "\\text{Find the exact earnings for 45 items at }\\$3\\text{ per item.}", steps: [{ explanation: "Multiply items by the piecework rate.", latex: "45\\times3=135" }], finalAnswerLatex: "\\$135" },
    { title: "Add base pay and commission", questionLatex: "\\text{Find the exact total earnings for base pay of }\\$180\\text{ and 4\\% commission on }\\$3000\\text{ of sales.}", steps: [{ explanation: "Find commission.", latex: "0.04\\times3000=120" }, { explanation: "Add base pay.", latex: "180+120=300" }], finalAnswerLatex: "\\$300" },
  ],
  guidedPractice: [
    money("y9-fin-non-g1", "Find the exact commission earned at 6% on 1500 dollars of sales.", "\\text{6\\% commission on }\\$1500", "90", "The commission is $90."),
    money("y9-fin-non-g2", "Find the exact piecework earnings for 32 items at 4 dollars per item.", "\\text{32 items at }\\$4/\\text{item}", "128", "The earnings are $128."),
    money("y9-fin-non-g3", "Find the exact total earnings from base pay of 200 dollars and a 50 dollar bonus.", "\\text{base pay }\\$200,\\quad \\text{bonus }\\$50", "250", "Add the bonus to base pay."),
    choice("y9-fin-non-g4", "Which calculation finds 8% commission on sales?", "C", ["sales + 8", "sales divided by 8", "sales x 0.08", "sales x 8"], "Eight percent is 0.08."),
  ],
  independentPractice: [
    money("y9-fin-non-i1", "Find the exact commission earned at 3% on 4200 dollars of sales.", "\\text{3\\% commission on }\\$4200", "126", "The commission is $126."),
    money("y9-fin-non-i2", "Find the exact piecework earnings for 75 items at 2.50 dollars per item.", "\\text{75 items at }\\$2.50/\\text{item}", "187.5", "The earnings are $187.50."),
    money("y9-fin-non-i3", "Find the exact total earnings from base pay of 160 dollars and 5% commission on 1800 dollars of sales.", "\\text{base pay }\\$160,\\quad \\text{5\\% commission on }\\$1800", "250", "The commission is $90, giving $250 total."),
    choice("y9-fin-non-i4", "Plan A pays 4 dollars per item for 40 items. Plan B pays a fixed 150 dollars plus a 20 dollar bonus. Which pays more?", "B", ["Plan A by $10", "Plan B by $10", "They pay the same", "Plan B by $20"], "Plan A pays $160 and Plan B pays $170."),
    money("y9-fin-non-i5", "Find the exact total earnings from base pay of 240 dollars and a 75 dollar bonus.", "\\text{base pay }\\$240,\\quad \\text{bonus }\\$75", "315", "The total is $315."),
  ],
  commonMistakes: [
    { mistake: "Using a percentage as a whole number.", fix: "Convert 5% to 0.05 before multiplying." },
    { mistake: "Adding sales to commission.", fix: "Commission is the percentage-earned amount, not the sales total." },
    { mistake: "Forgetting base pay.", fix: "Add base pay when the arrangement includes it." },
    { mistake: "Comparing rates without calculating totals.", fix: "Calculate each arrangement for the given sales or item count." },
  ],
  masteryQuiz: [
    money("y9-fin-non-m1", "Find the exact commission earned at 5% on 3600 dollars of sales.", "\\text{5\\% commission on }\\$3600", "180", "The commission is $180."),
    money("y9-fin-non-m2", "Find the exact piecework earnings for 48 items at 3 dollars per item.", "\\text{48 items at }\\$3/\\text{item}", "144", "The earnings are $144."),
    money("y9-fin-non-m3", "Find the exact total earnings from base pay of 210 dollars and a 65 dollar bonus.", "\\text{base pay }\\$210,\\quad \\text{bonus }\\$65", "275", "Add the two amounts."),
    choice("y9-fin-non-m4", "Which amount is commission?", "B", ["Total sales", "A percentage of sales earned by the worker", "The number of hours worked", "Tax withheld"], "Commission is linked to sales."),
    money("y9-fin-non-m5", "Find the exact total earnings from base pay of 150 dollars and 7% commission on 2000 dollars of sales.", "\\text{base pay }\\$150,\\quad \\text{7\\% commission on }\\$2000", "290", "Commission is $140, then add base pay."),
    money("y9-fin-non-m6", "Find the exact piecework earnings for 84 items at 2.75 dollars per item.", "\\text{84 items at }\\$2.75/\\text{item}", "231", "Multiply items by rate."),
    choice("y9-fin-non-m7", "Plan A pays 6% commission on 3000 dollars of sales. Plan B pays 4 dollars per item for 50 items. Which pays more?", "D", ["Plan A by $20", "They pay the same", "Plan B by $180", "Plan B by $20"], "Plan A pays $180 and Plan B pays $200."),
    money("y9-fin-non-m8", "A worker receives 180 dollars base pay, 4% commission on 2750 dollars of sales and a 35 dollar bonus. Find the exact total earnings.", "\\text{base }\\$180,\\quad 4\\%\\text{ of }\\$2750,\\quad \\text{bonus }\\$35", "325", "Commission is $110; add $180 and $35."),
    choice("y9-fin-non-m9", "A worker calculates 5% commission on 4800 dollars as 5 x 4800 dollars. What is the correction?", "A", ["Use $0.05\\times4800=\\$240$", "Use $5\\times4800=\\$24000$", "Use $4800\\div0.05=\\$96000$", "Use $4800+5=\\$4805$"], "Five percent is 0.05."),
    choice("y9-fin-non-m10", "Plan A pays 250 dollars plus 3% of 4000 dollars sales. Plan B pays 340 dollars plus a 20 dollar bonus. Which pays more?", "A", ["Plan A by $10", "They pay the same", "Plan A by $30", "Plan B by $10"], "Plan A pays $370 and Plan B pays $360."),
  ],
};

const tax: LessonContent = {
  description: "Use gross income, tax withheld and deductions to calculate net earnings and interpret simple payslips.",
  learningIntention: "Calculate take-home pay after simple deductions and percentage tax.",
  successCriteria: ["Distinguish gross income from net income.", "Subtract deductions from gross pay.", "Calculate simple percentage tax.", "Find a missing tax amount from gross and net pay."],
  teaching: { paragraphs: ["Gross income is earned before deductions. Net income is the take-home amount after deductions.", "Tax withheld is money deducted from gross pay. A simple payslip may also show other deductions.", "Subtract all deductions from gross pay to calculate net pay.", "When tax is a percentage, convert the percentage to a decimal and multiply by gross pay."], latexBlocks: ["\\text{net pay}=\\text{gross pay}-\\text{deductions}", "\\text{tax}=\\text{gross pay}\\times\\text{tax rate}"] },
  workedExamples: [
    { title: "Subtract tax", questionLatex: "\\text{Find the exact net pay when gross pay is }\\$850\\text{ and tax withheld is }\\$120.", steps: [{ explanation: "Subtract the tax deduction.", latex: "850-120=730" }], finalAnswerLatex: "\\$730" },
    { title: "Calculate percentage tax", questionLatex: "\\text{Find the exact 15\\% tax on gross pay of }\\$600.", steps: [{ explanation: "Convert 15% to 0.15 and multiply.", latex: "0.15\\times600=90" }], finalAnswerLatex: "\\$90" },
    { title: "Find the deduction", questionLatex: "\\text{Gross pay is }\\$920\\text{ and net pay is }\\$775.\\text{ Find the exact deduction.}", steps: [{ explanation: "Subtract net pay from gross pay.", latex: "920-775=145" }], finalAnswerLatex: "\\$145" },
  ],
  guidedPractice: [
    money("y9-fin-tax-g1", "Find the exact net pay when gross pay is 700 dollars and tax withheld is 95 dollars.", "\\text{gross }\\$700,\\quad \\text{tax }\\$95", "605", "Subtract tax from gross pay."),
    money("y9-fin-tax-g2", "Find the exact tax withheld at 10% of gross pay of 540 dollars.", "\\text{gross }\\$540,\\quad \\text{tax rate }10\\%", "54", "Ten percent of $540 is $54."),
    money("y9-fin-tax-g3", "Gross pay is 800 dollars and net pay is 684 dollars. Find the exact total deductions.", "\\text{gross }\\$800,\\quad \\text{net }\\$684", "116", "Subtract net from gross."),
    choice("y9-fin-tax-g4", "Which amount is take-home pay?", "C", ["Gross pay", "Tax withheld", "Net pay", "Hourly rate"], "Net pay remains after deductions."),
  ],
  independentPractice: [
    money("y9-fin-tax-i1", "Find the exact net pay when gross pay is 960 dollars and deductions total 138 dollars.", "\\text{gross }\\$960,\\quad \\text{deductions }\\$138", "822", "Subtract deductions."),
    money("y9-fin-tax-i2", "Find the exact tax withheld at 12% of gross pay of 750 dollars.", "\\text{gross }\\$750,\\quad \\text{tax rate }12\\%", "90", "Twelve percent of $750 is $90."),
    money("y9-fin-tax-i3", "Gross pay is 1120 dollars and net pay is 935 dollars. Find the exact total deductions.", "\\text{gross }\\$1120,\\quad \\text{net }\\$935", "185", "Subtract net from gross."),
    money("y9-fin-tax-i4", "Find the exact net pay when gross pay is 680 dollars, tax is 75 dollars and another deduction is 20 dollars.", "\\text{gross }\\$680,\\quad \\text{tax }\\$75,\\quad \\text{other deduction }\\$20", "585", "Subtract both deductions."),
    choice("y9-fin-tax-i5", "A payslip has gross pay 600 dollars and net pay 510 dollars. Which statement is correct?", "A", ["Deductions total $90", "Deductions total $510", "Tax must be 15 dollars", "Gross pay is the take-home amount"], "The difference is $90."),
  ],
  commonMistakes: [
    { mistake: "Adding tax to gross pay.", fix: "Tax withheld is deducted from gross pay." },
    { mistake: "Calling gross pay take-home pay.", fix: "Net pay is the amount received after deductions." },
    { mistake: "Using 15 instead of 0.15 for 15%.", fix: "Divide a percentage by 100 before multiplying." },
    { mistake: "Subtracting only one of several deductions.", fix: "Add all deductions or subtract each one." },
  ],
  masteryQuiz: [
    money("y9-fin-tax-m1", "Find the exact net pay when gross pay is 840 dollars and tax withheld is 110 dollars.", "\\text{gross }\\$840,\\quad \\text{tax }\\$110", "730", "Subtract tax."),
    money("y9-fin-tax-m2", "Find the exact tax withheld at 20% of gross pay of 650 dollars.", "\\text{gross }\\$650,\\quad \\text{tax rate }20\\%", "130", "Twenty percent is 0.20."),
    money("y9-fin-tax-m3", "Gross pay is 980 dollars and net pay is 825 dollars. Find the exact deductions.", "\\text{gross }\\$980,\\quad \\text{net }\\$825", "155", "Subtract net from gross."),
    choice("y9-fin-tax-m4", "Which equation finds net pay?", "D", ["gross + deductions", "tax x gross", "gross divided by deductions", "gross - deductions"], "Deductions are removed."),
    money("y9-fin-tax-m5", "Find the exact net pay when gross pay is 1250 dollars and tax is 14% of gross pay.", "\\text{gross }\\$1250,\\quad \\text{tax rate }14\\%", "1075", "Tax is $175."),
    money("y9-fin-tax-m6", "Find the exact net pay when gross pay is 760 dollars, tax is 85 dollars and another deduction is 15 dollars.", "\\text{gross }\\$760,\\quad \\text{tax }\\$85,\\quad \\text{other }\\$15", "660", "Subtract $100 total deductions."),
    choice("y9-fin-tax-m7", "A student subtracts 10 dollars from 500 dollars to calculate 10% tax. What is the correction?", "B", ["Tax is $10", "Tax is $50", "Tax is $490", "Tax is $5000"], "Ten percent of $500 is $50."),
    money("y9-fin-tax-m8", "A worker earns 32 dollars per hour for 25 hours. Tax withheld is 12% of gross pay. Find the exact net pay.", "\\text{25 hours at }\\$32/\\text{hour},\\quad \\text{tax rate }12\\%", "704", "Gross pay is $800 and tax is $96."),
    money("y9-fin-tax-m9", "Gross pay is 1500 dollars. Net pay is 1245 dollars after tax and a 30 dollar other deduction. Find the exact tax withheld.", "\\text{gross }\\$1500,\\quad \\text{net }\\$1245,\\quad \\text{other deduction }\\$30", "225", "Total deductions are $255, so tax is $225."),
    choice("y9-fin-tax-m10", "Payslip A has gross 900 dollars and deductions 120 dollars. Payslip B has gross 850 dollars and deductions 55 dollars. Which net pay is higher?", "C", ["A by $15", "A by $70", "B by $15", "B by $70"], "A nets $780 and B nets $795."),
  ],
};

const budgets: LessonContent = {
  description: "Build weekly budgets, calculate surplus or deficit, and plan progress towards savings goals.",
  learningIntention: "Use income and expenses to make practical budget decisions.",
  successCriteria: ["Add expenses accurately.", "Calculate budget surplus or deficit.", "Estimate time to reach a savings goal.", "Compare budget choices."],
  teaching: { paragraphs: ["A budget records income and planned expenses over the same time period.", "A surplus occurs when income is greater than expenses. A deficit occurs when expenses are greater than income.", "A savings goal can be planned by dividing the target amount by the amount saved each period.", "Good comparisons include all costs and use the same time period."], latexBlocks: ["\\text{surplus}=\\text{income}-\\text{expenses}", "\\text{time to goal}=\\frac{\\text{savings goal}}{\\text{savings per period}}"] },
  workedExamples: [
    { title: "Find weekly expenses", questionLatex: "\\text{Find the exact total expenses: transport }\\$45,\\text{ food }\\$80,\\text{ phone }\\$20.", steps: [{ explanation: "Add the expenses.", latex: "45+80+20=145" }], finalAnswerLatex: "\\$145" },
    { title: "Calculate a surplus", questionLatex: "\\text{Income is }\\$320\\text{ and expenses are }\\$245.\\text{ Find the exact surplus.}", steps: [{ explanation: "Subtract expenses from income.", latex: "320-245=75" }], finalAnswerLatex: "\\$75" },
    { title: "Plan for a savings goal", questionLatex: "\\text{How many weeks are needed to save }\\$600\\text{ at }\\$50\\text{ per week?}", steps: [{ explanation: "Divide the goal by weekly savings.", latex: "600\\div50=12" }], finalAnswerLatex: "12\\text{ weeks}" },
  ],
  guidedPractice: [
    money("y9-fin-bud-g1", "Find the exact total weekly expenses: transport 35 dollars, food 70 dollars and phone 15 dollars.", "\\text{expenses }\\$35,\\ \\$70,\\ \\$15", "120", "Add the expenses."),
    money("y9-fin-bud-g2", "Weekly income is 280 dollars and expenses are 210 dollars. Find the exact surplus.", "\\text{income }\\$280,\\quad \\text{expenses }\\$210", "70", "Subtract expenses from income."),
    choice("y9-fin-bud-g3", "Weekly income is 190 dollars and expenses are 225 dollars. Which describes the budget?", "B", ["A $35 surplus", "A $35 deficit", "A $415 surplus", "A balanced budget"], "Expenses exceed income by $35."),
    number("y9-fin-bud-g4", "How many weeks are needed to save exactly 480 dollars at 40 dollars per week?", "\\text{goal }\\$480,\\quad \\text{savings }\\$40/\\text{week}", "12", "Divide $480 by $40."),
  ],
  independentPractice: [
    money("y9-fin-bud-i1", "Find the exact total weekly expenses: 55 dollars, 82 dollars, 18 dollars and 25 dollars.", "\\text{expenses }\\$55,\\ \\$82,\\ \\$18,\\ \\$25", "180", "Add all four expenses."),
    money("y9-fin-bud-i2", "Weekly income is 340 dollars and expenses are 268 dollars. Find the exact surplus.", "\\text{income }\\$340,\\quad \\text{expenses }\\$268", "72", "Subtract expenses."),
    money("y9-fin-bud-i3", "Weekly income is 250 dollars and expenses are 287 dollars. Find the exact deficit.", "\\text{income }\\$250,\\quad \\text{expenses }\\$287", "37", "Expenses exceed income by $37."),
    number("y9-fin-bud-i4", "How many weeks are needed to save exactly 750 dollars at 50 dollars per week?", "\\text{goal }\\$750,\\quad \\text{savings }\\$50/\\text{week}", "15", "Divide goal by weekly savings."),
    choice("y9-fin-bud-i5", "Plan A saves 45 dollars each week. Plan B saves 60 dollars each week but has an extra 20 dollar monthly cost. For a four-week month, which saves more?", "D", ["Plan A by $20", "Plan B by $20", "They save the same", "Plan B by $40"], "Plan A saves $180; Plan B saves $240 - $20 = $220, so Plan B saves $40 more.", "\\text{Compare the four-week totals.}"),
  ],
  commonMistakes: [
    { mistake: "Mixing weekly and monthly values.", fix: "Convert amounts to the same time period before comparing." },
    { mistake: "Calling a negative result a surplus.", fix: "If expenses exceed income, describe the difference as a deficit." },
    { mistake: "Leaving out small regular expenses.", fix: "Include every listed cost." },
    { mistake: "Multiplying instead of dividing for a savings goal.", fix: "Divide the goal by the amount saved each period." },
  ],
  masteryQuiz: [
    money("y9-fin-bud-m1", "Find the exact total expenses: 40 dollars, 65 dollars and 25 dollars.", "\\text{expenses }\\$40,\\ \\$65,\\ \\$25", "130", "Add the expenses."),
    money("y9-fin-bud-m2", "Weekly income is 300 dollars and expenses are 225 dollars. Find the exact surplus.", "\\text{income }\\$300,\\quad \\text{expenses }\\$225", "75", "Subtract expenses."),
    choice("y9-fin-bud-m3", "Expenses exceed income by 28 dollars. Which term describes this?", "C", ["Surplus", "Interest", "Deficit", "Commission"], "A shortfall is a deficit."),
    number("y9-fin-bud-m4", "How many weeks are needed to save exactly 900 dollars at 75 dollars per week?", "\\text{goal }\\$900,\\quad \\text{savings }\\$75/\\text{week}", "12", "Divide goal by weekly saving."),
    money("y9-fin-bud-m5", "Weekly income is 410 dollars. Expenses are 95 dollars, 120 dollars, 55 dollars and 40 dollars. Find the exact surplus.", "\\text{income }\\$410,\\quad \\text{expenses }\\$95,\\ \\$120,\\ \\$55,\\ \\$40", "100", "Expenses total $310."),
    choice("y9-fin-bud-m6", "Which comparison is fair?", "D", ["Compare a weekly cost directly with a yearly cost", "Ignore fees", "Compare only the cheapest single item", "Convert all costs to the same time period"], "Use matching time periods."),
    number("y9-fin-bud-m7", "A student has saved 180 dollars and adds 45 dollars each week. How many more weeks are needed to reach exactly 540 dollars?", "\\text{saved }\\$180,\\quad \\text{goal }\\$540,\\quad \\text{weekly saving }\\$45", "8", "The remaining $360 takes 8 weeks."),
    money("y9-fin-bud-m8", "A weekly budget has income of 460 dollars. Expenses are 135 dollars, 92 dollars, 48 dollars, 35 dollars and 60 dollars. Find the exact surplus.", "\\text{income }\\$460,\\quad \\text{five listed expenses}", "90", "Expenses total $370."),
    choice("y9-fin-bud-m9", "Plan A saves 55 dollars weekly. Plan B saves 65 dollars weekly but has a 30 dollar monthly fee. Over four weeks, which saves more?", "B", ["Plan A by $10", "Plan B by $10", "They save the same", "Plan B by $30"], "Plan A saves $220. Plan B saves $260 - $30 = $230."),
    number("y9-fin-bud-m10", "A 960 dollar goal must be reached in 16 weeks. What exact weekly saving is required?", "\\text{goal }\\$960,\\quad \\text{time }16\\text{ weeks}", "60", "Divide $960 by 16."),
  ],
};

const simpleInterest: LessonContent = {
  description: "Calculate simple interest and total amounts, and solve straightforward savings comparisons.",
  learningIntention: "Use the simple-interest relationship for savings over a number of years.",
  successCriteria: ["Identify principal, annual rate and time.", "Convert a percentage rate to a decimal.", "Calculate simple interest.", "Calculate total amount and solve simple reverse questions."],
  teaching: { paragraphs: ["Simple interest is calculated from the original principal only. The interest added each year stays the same.", "The principal is the starting amount. The rate is written as a decimal in calculations, and time is measured in years for an annual rate.", "Interest and total amount are different. Add the interest to the principal to find the final amount.", "Harder questions may ask for a missing rate or time using the same relationship."], latexBlocks: ["I=Prt", "A=P+I", "r=\\frac{I}{Pt}", "t=\\frac{I}{Pr}"] },
  workedExamples: [
    { title: "Calculate simple interest", questionLatex: "\\text{Find the exact simple interest on }\\$600\\text{ at }5\\%\\text{ p.a. for 2 years.}", steps: [{ explanation: "Convert the percentage to a decimal.", latex: "5\\%=0.05" }, { explanation: "Use the simple-interest relationship.", latex: "I=600(0.05)(2)=60" }], finalAnswerLatex: "\\$60" },
    { title: "Find the total amount", questionLatex: "\\text{Find the exact total amount for }\\$1200\\text{ at }4\\%\\text{ p.a. simple interest for 3 years.}", steps: [{ explanation: "Find the interest.", latex: "I=1200(0.04)(3)=144" }, { explanation: "Add the principal.", latex: "A=1200+144=1344" }], finalAnswerLatex: "\\$1344" },
    { title: "Find a simple-interest rate", questionLatex: "\\text{An investment of }\\$1000\\text{ earns }\\$120\\text{ in 3 years. Find the annual simple-interest rate.}", steps: [{ explanation: "Divide interest by principal times time.", latex: "r=\\frac{120}{1000(3)}=0.04" }, { explanation: "Convert to a percentage.", latex: "0.04=4\\%" }], finalAnswerLatex: "4\\%\\text{ p.a.}" },
  ],
  guidedPractice: [
    money("y9-fin-si-g1", "Find the exact simple interest earned by 800 dollars at 5% p.a. for 2 years.", "\\text{principal }\\$800,\\quad \\text{rate }5\\%\\text{ p.a.},\\quad \\text{time }2\\text{ years}", "80", "The interest is $80."),
    money("y9-fin-si-g2", "Find the exact total amount for 1000 dollars at 3% p.a. simple interest for 4 years.", "\\text{principal }\\$1000,\\quad \\text{rate }3\\%\\text{ p.a.},\\quad \\text{time }4\\text{ years}", "1120", "Interest is $120, giving $1120 total."),
    choice("y9-fin-si-g3", "Which decimal rate represents 6%?", "C", ["6", "0.6", "0.06", "0.006"], "Divide 6 by 100."),
    choice("y9-fin-si-g4", "Which amount is the starting investment?", "A", ["Principal", "Interest", "Total amount", "Commission"], "The principal is the starting amount."),
  ],
  independentPractice: [
    money("y9-fin-si-i1", "Find the exact simple interest earned by 1500 dollars at 4% p.a. for 3 years.", "\\text{principal }\\$1500,\\quad \\text{rate }4\\%\\text{ p.a.},\\quad \\text{time }3\\text{ years}", "180", "The interest is $180."),
    money("y9-fin-si-i2", "Find the exact total amount for 2400 dollars at 2.5% p.a. simple interest for 2 years.", "\\text{principal }\\$2400,\\quad \\text{rate }2.5\\%\\text{ p.a.},\\quad \\text{time }2\\text{ years}", "2520", "Interest is $120."),
    money("y9-fin-si-i3", "Find the exact simple interest earned by 900 dollars at 6% p.a. for 5 years.", "\\text{principal }\\$900,\\quad \\text{rate }6\\%\\text{ p.a.},\\quad \\text{time }5\\text{ years}", "270", "The interest is $270."),
    choice("y9-fin-si-i4", "Two investments both start at 1000 dollars for 2 years. Which earns more simple interest?", "B", ["3% p.a.", "5% p.a.", "They earn the same", "The principal is missing"], "For the same principal and time, the higher rate earns more."),
    choice("y9-fin-si-i5", "Which calculation gives the total amount?", "D", ["principal - interest", "rate x time only", "interest divided by principal", "principal + interest"], "The total includes the starting amount and interest."),
  ],
  commonMistakes: [
    { mistake: "Using 5 instead of 0.05 for 5%.", fix: "Convert the percentage rate to a decimal." },
    { mistake: "Reporting interest when the question asks for total amount.", fix: "Add the principal to the interest." },
    { mistake: "Using months directly with a yearly rate.", fix: "Match the time unit to the annual rate." },
    { mistake: "Using compound growth.", fix: "Year 9 simple interest uses the original principal only." },
  ],
  masteryQuiz: [
    money("y9-fin-si-m1", "Find the exact simple interest earned by 500 dollars at 4% p.a. for 2 years.", "\\text{principal }\\$500,\\quad \\text{rate }4\\%,\\quad \\text{time }2\\text{ years}", "40", "The interest is $40."),
    money("y9-fin-si-m2", "Find the exact total amount for 700 dollars with 105 dollars simple interest.", "\\text{principal }\\$700,\\quad \\text{interest }\\$105", "805", "Add principal and interest."),
    choice("y9-fin-si-m3", "Which decimal represents 7.5%?", "B", ["0.75", "0.075", "7.5", "0.0075"], "Divide by 100."),
    money("y9-fin-si-m4", "Find the exact simple interest earned by 3200 dollars at 3% p.a. for 4 years.", "\\text{principal }\\$3200,\\quad \\text{rate }3\\%,\\quad \\text{time }4\\text{ years}", "384", "The interest is $384."),
    money("y9-fin-si-m5", "Find the exact total amount for 1800 dollars at 5% p.a. simple interest for 3 years.", "\\text{principal }\\$1800,\\quad \\text{rate }5\\%,\\quad \\text{time }3\\text{ years}", "2070", "Interest is $270."),
    choice("y9-fin-si-m6", "Which relationship calculates simple interest?", "A", ["$I=Prt$", "$A=P(1+r)^n$", "$A=P-I$", "$I=P+r+t$"], "Simple interest is principal times rate times time."),
    money("y9-fin-si-m7", "Find the exact simple interest earned by 2750 dollars at 4.5% p.a. for 2 years.", "\\text{principal }\\$2750,\\quad \\text{rate }4.5\\%,\\quad \\text{time }2\\text{ years}", "247.5", "The interest is $247.50."),
    number("y9-fin-si-m8", "An investment of 1200 dollars earns exactly 180 dollars simple interest in 3 years. Find the annual percentage rate.", "\\text{principal }\\$1200,\\quad \\text{interest }\\$180,\\quad \\text{time }3\\text{ years}", "5%", "The rate is 0.05 or 5%.", ["5", "0.05"]),
    number("y9-fin-si-m9", "An investment of 2000 dollars earns exactly 240 dollars simple interest at 4% p.a. Find the time in years.", "\\text{principal }\\$2000,\\quad \\text{interest }\\$240,\\quad \\text{rate }4\\%", "3", "Divide $240 by $80 per year.", ["3 years"]),
    choice("y9-fin-si-m10", "Option A invests 1500 dollars at 4% p.a. simple interest for 3 years. Option B invests 1500 dollars at 3.5% p.a. simple interest for 4 years. Which earns more interest?", "B", ["Option A by $30", "Option B by $30", "They earn the same", "Option B by $210"], "Option A earns $180 and Option B earns $210."),
  ],
};

const repayments: LessonContent = {
  description: "Calculate deposits, balances owing, equal repayments and total paid for straightforward payment plans.",
  learningIntention: "Use subtraction, division and multiplication to interpret deposit and repayment plans.",
  successCriteria: ["Calculate a balance owing after a deposit.", "Find equal repayment amounts.", "Calculate total paid from deposit and repayments.", "Compare straightforward payment plans using their stated dollar amounts."],
  teaching: { paragraphs: ["A deposit is an upfront payment. The balance owing is the amount left after the deposit is subtracted from the item price.", "Equal repayments split the balance into the stated number of payments.", "The total paid is the deposit plus all repayments. This can be compared with the original item price.", "A repayment amount is not automatically interest. Check the plan details before describing any extra cost."], latexBlocks: ["\\text{balance owing}=\\text{price}-\\text{deposit}", "\\text{repayment}=\\frac{\\text{balance owing}}{\\text{number of repayments}}", "\\text{total paid}=\\text{deposit}+\\text{all repayments}"] },
  workedExamples: [
    { title: "Find a balance owing", questionLatex: "\\text{An item costs }\\$900\\text{ and the deposit is }\\$150.\\text{ Find the exact balance owing.}", steps: [{ explanation: "Subtract the deposit from the price.", latex: "900-150=750" }], finalAnswerLatex: "\\$750" },
    { title: "Find equal repayments", questionLatex: "\\text{A }\\$750\\text{ balance is split into 10 equal payments. Find each exact payment.}", steps: [{ explanation: "Divide the balance by the number of payments.", latex: "750\\div10=75" }], finalAnswerLatex: "\\$75" },
    { title: "Calculate total paid", questionLatex: "\\text{A plan has a }\\$200\\text{ deposit and 8 repayments of }\\$95.\\text{ Find the exact total paid.}", steps: [{ explanation: "Find the repayment total.", latex: "8\\times95=760" }, { explanation: "Add the deposit.", latex: "200+760=960" }], finalAnswerLatex: "\\$960" },
  ],
  guidedPractice: [
    money("y9-fin-rep-g1", "An item costs 1200 dollars and the deposit is 200 dollars. Find the exact balance owing.", "\\text{price }\\$1200,\\quad \\text{deposit }\\$200", "1000", "Subtract the deposit."),
    money("y9-fin-rep-g2", "A balance of 960 dollars is split into 12 equal repayments. Find the exact repayment amount.", "\\text{balance }\\$960,\\quad \\text{12 repayments}", "80", "Divide by 12."),
    money("y9-fin-rep-g3", "A plan has a 150 dollar deposit and 10 repayments of 85 dollars. Find the exact total paid.", "\\text{deposit }\\$150,\\quad \\text{10 repayments of }\\$85", "1000", "Repayments total $850; add deposit."),
    choice("y9-fin-rep-g4", "Which calculation finds the balance owing after a deposit?", "A", ["price - deposit", "price + deposit", "deposit divided by price", "repayments + interest"], "Subtract the upfront deposit."),
  ],
  independentPractice: [
    money("y9-fin-rep-i1", "An item costs 1450 dollars and the deposit is 350 dollars. Find the exact balance owing.", "\\text{price }\\$1450,\\quad \\text{deposit }\\$350", "1100", "Subtract deposit."),
    money("y9-fin-rep-i2", "A balance of 1320 dollars is split into 12 equal repayments. Find the exact repayment amount.", "\\text{balance }\\$1320,\\quad \\text{12 repayments}", "110", "Divide by 12."),
    money("y9-fin-rep-i3", "A plan has a 250 dollar deposit and 9 repayments of 90 dollars. Find the exact total paid.", "\\text{deposit }\\$250,\\quad \\text{9 repayments of }\\$90", "1060", "Repayments total $810."),
    money("y9-fin-rep-i4", "An item costs 800 dollars. A payment plan totals 860 dollars. Find the exact extra cost.", "\\text{cash price }\\$800,\\quad \\text{plan total }\\$860", "60", "Subtract the cash price from total paid."),
    choice("y9-fin-rep-i5", "Which statement is correct?", "C", ["A deposit is the whole balance", "Repayment always means interest", "A deposit reduces the balance owing", "The item price must be ignored"], "The deposit is paid upfront."),
  ],
  commonMistakes: [
    { mistake: "Adding the deposit to the price when finding the balance.", fix: "Subtract the deposit because it has already been paid." },
    { mistake: "Dividing the item price instead of the remaining balance.", fix: "Subtract the deposit first." },
    { mistake: "Forgetting to include the deposit in total paid.", fix: "Add the deposit to all repayments." },
    { mistake: "Calling every repayment difference interest.", fix: "Describe it as extra cost unless the plan identifies interest." },
  ],
  masteryQuiz: [
    money("y9-fin-rep-m1", "An item costs 700 dollars and the deposit is 100 dollars. Find the exact balance owing.", "\\text{price }\\$700,\\quad \\text{deposit }\\$100", "600", "Subtract deposit."),
    money("y9-fin-rep-m2", "A balance of 840 dollars is split into 7 equal repayments. Find the exact repayment amount.", "\\text{balance }\\$840,\\quad \\text{7 repayments}", "120", "Divide by 7."),
    money("y9-fin-rep-m3", "A plan has a 180 dollar deposit and 6 repayments of 95 dollars. Find the exact total paid.", "\\text{deposit }\\$180,\\quad \\text{6 repayments of }\\$95", "750", "Repayments total $570."),
    choice("y9-fin-rep-m4", "Which amount is paid upfront?", "B", ["Balance owing", "Deposit", "Final repayment only", "Extra cost"], "A deposit is paid at the beginning."),
    money("y9-fin-rep-m5", "An item costs 1750 dollars and the deposit is 250 dollars. The balance is split into 12 equal repayments. Find the exact repayment amount.", "\\text{price }\\$1750,\\quad \\text{deposit }\\$250,\\quad \\text{12 repayments}", "125", "The balance is $1500."),
    money("y9-fin-rep-m6", "A plan has a 300 dollar deposit and 10 repayments of 145 dollars. Find the exact total paid.", "\\text{deposit }\\$300,\\quad \\text{10 repayments of }\\$145", "1750", "Add $300 to $1450."),
    money("y9-fin-rep-m7", "A cash price is 1600 dollars and the repayment-plan total is 1710 dollars. Find the exact extra cost.", "\\text{cash price }\\$1600,\\quad \\text{plan total }\\$1710", "110", "Subtract cash price."),
    choice("y9-fin-rep-m8", "Plan A has a 200 dollar deposit and 8 repayments of 110 dollars. Plan B has a 100 dollar deposit and 10 repayments of 95 dollars. Which total is lower?", "B", ["Plan A by $30", "Plan B by $30", "They cost the same", "Plan A by $100"], "Plan A totals $1080 and Plan B totals $1050, so Plan B is lower by $30.", "\\text{Compare total paid.}"),
    money("y9-fin-rep-m9", "An item costs 2100 dollars. A deposit of 300 dollars is followed by 12 equal repayments. Find the exact repayment needed if the plan has no extra cost.", "\\text{price }\\$2100,\\quad \\text{deposit }\\$300,\\quad \\text{12 repayments}", "150", "The remaining balance is $1800."),
    choice("y9-fin-rep-m10", "A student divides a 1200 dollar item price by 10 repayments after paying a 200 dollar deposit. What should they do?", "D", ["Use $120 per payment", "Add the deposit again", "Ignore the deposit", "Divide the $1000 balance by 10 to get $100 per payment"], "The deposit reduces the balance before division."),
  ],
};

const buyNowPayLater: LessonContent = {
  description: "Analyse buy now pay later (BNPL) schemes and compare short-term loan options using total repayment cost.",
  learningIntention: "Evaluate BNPL schemes and short-term loans by calculating total amounts paid and identifying when fees apply.",
  successCriteria: [
    "Explain how a BNPL scheme works, including interest-free periods and late fees.",
    "Calculate the total cost of a BNPL purchase when all payments are made on time.",
    "Calculate the total cost when a late fee is charged.",
    "Calculate total repayment and interest paid on a short-term loan.",
    "Compare two loan options and identify the cheaper choice using total repayment.",
  ],
  teaching: {
    paragraphs: [
      "A buy now pay later (BNPL) scheme lets you take an item immediately and pay for it in equal instalments, usually fortnightly. No interest is charged if every instalment is paid on time — the total paid equals the item price. However, a fee applies for each missed or late payment, which increases the total cost above the item price.",
      "A short-term loan charges interest on the amount borrowed. Total repayment equals the amount borrowed plus total interest. To compare two loan options, calculate the total repayment for each — the loan with the lower total repayment is the cheaper choice, even if it has a shorter term or higher instalments.",
      "When deciding between BNPL and a short-term loan, compare the total amounts paid under each option. BNPL costs less than a loan only if every payment is made on time; a single late fee can shift the comparison. Always use the same item price as the reference point.",
    ],
    latexBlocks: [
      "\\text{BNPL total (on time)} = \\text{item price}",
      "\\text{BNPL total (with late fee)} = \\text{item price} + \\text{late fees}",
      "\\text{total repayment} = \\text{amount borrowed} + \\text{total interest}",
      "\\text{interest paid} = \\text{total repayment} - \\text{amount borrowed}",
    ],
  },
  workedExamples: [
    {
      title: "BNPL total paid on time",
      questionLatex: "\\text{A }\\$500\\text{ purchase is split into 4 fortnightly payments of }\\$125.\\text{ Find the total paid if all payments are on time.}",
      steps: [
        { explanation: "Multiply the number of payments by each payment amount.", latex: "4 \\times 125 = 500" },
        { explanation: "Check: the total equals the item price, so no extra cost.", latex: "\\text{total paid} = \\$500" },
      ],
      finalAnswerLatex: "\\$500",
    },
    {
      title: "BNPL with a late fee",
      questionLatex: "\\text{The same }\\$500\\text{ purchase has 4 payments of }\\$125.\\text{ A }\\$10\\text{ late fee applies for one missed payment. Find the total paid.}",
      steps: [
        { explanation: "The base total is the item price.", latex: "4 \\times 125 = 500" },
        { explanation: "Add the late fee.", latex: "500 + 10 = 510" },
      ],
      finalAnswerLatex: "\\$510",
    },
    {
      title: "Short-term loan comparison",
      questionLatex: "\\text{Loan A: borrow }\\$800,\\text{ repay }\\$960\\text{ over 6 months. Loan B: borrow }\\$800,\\text{ repay }\\$860\\text{ over 3 months. Which is cheaper?}",
      steps: [
        { explanation: "Find the interest paid on Loan A.", latex: "960 - 800 = 160" },
        { explanation: "Find the interest paid on Loan B.", latex: "860 - 800 = 60" },
        { explanation: "Compare total repayments: $960 versus $860.", latex: "\\$860 < \\$960" },
      ],
      finalAnswerLatex: "\\text{Loan B is cheaper by }\\$100",
    },
  ],
  guidedPractice: [
    money("y9-fin-bnp-g1", "A 400 dollar purchase is split into 4 fortnightly BNPL payments. Find the exact amount of each payment if no fee is charged.", "\\text{BNPL: }\\$400\\text{ in 4 equal payments}", "100", "Divide $400 by 4."),
    money("y9-fin-bnp-g2", "A 600 dollar BNPL purchase is paid in 4 instalments of 150 dollars. One payment is missed and a 15 dollar late fee applies. Find the exact total paid.", "\\text{4 payments of }\\$150,\\quad \\text{late fee }\\$15", "615", "The base total is $600; add the $15 late fee."),
    money("y9-fin-bnp-g3", "A short-term loan borrows 800 dollars and requires total repayments of 960 dollars over 6 months. Find the exact total interest paid.", "\\text{borrowed }\\$800,\\quad \\text{total repayment }\\$960", "160", "Subtract the amount borrowed from total repayment."),
    choice("y9-fin-bnp-g4", "Loan A totals 960 dollars repaid. Loan B totals 860 dollars repaid. Both loans borrow 800 dollars. Which is the cheaper loan?", "B", ["Loan A, because it has more time", "Loan B, because the total repayment is lower", "They cost the same", "Loan A, because the repayments are spread over longer"], "Compare total repayment — lower total means less paid overall."),
  ],
  independentPractice: [
    money("y9-fin-bnp-i1", "A 500 dollar purchase is split into 4 fortnightly BNPL payments of 125 dollars each. Find the exact total paid when all payments are on time.", "\\text{4 payments of }\\$125", "500", "Multiply 4 by $125; no fee means the total equals the item price."),
    money("y9-fin-bnp-i2", "A BNPL plan splits a 720 dollar purchase into 6 fortnightly payments. Find the exact amount of each payment.", "\\text{BNPL: }\\$720\\text{ in 6 equal payments}", "120", "Divide $720 by 6."),
    money("y9-fin-bnp-i3", "A 500 dollar BNPL purchase has 4 payments of 125 dollars. Two payments are missed and each attracts a 10 dollar late fee. Find the exact total paid.", "\\text{4 payments of }\\$125,\\quad \\text{two late fees of }\\$10\\text{ each}", "520", "The base total is $500; add two $10 fees."),
    money("y9-fin-bnp-i4", "A short-term loan borrows 800 dollars and requires total repayments of 860 dollars over 3 months. Find the exact interest paid.", "\\text{borrowed }\\$800,\\quad \\text{total repayment }\\$860", "60", "Subtract the amount borrowed from total repayment."),
    choice("y9-fin-bnp-i5", "A 500 dollar item can be paid by BNPL (4 payments of 125 dollars, on time) or by cash upfront. Which option costs more?", "C", ["BNPL costs more by $125", "Cash costs more by $125", "They cost the same", "BNPL costs more by $500"], "BNPL on time totals the item price — same as cash."),
  ],
  commonMistakes: [
    { mistake: "Thinking BNPL always costs more than the item price.", fix: "BNPL costs exactly the item price when all payments are made on time; extra cost only applies if a late fee is charged." },
    { mistake: "Comparing monthly repayment amounts instead of total repayment.", fix: "Use total repayment — the sum of all payments — to compare loan costs fairly." },
    { mistake: "Forgetting to add the late fee to find the true total.", fix: "Add any late or missed-payment fees to the item price to get the actual total paid." },
    { mistake: "Subtracting total repayment from itself to find interest.", fix: "Interest paid equals total repayment minus the original amount borrowed." },
  ],
  masteryQuiz: [
    money("y9-fin-bnp-m1", "A 480 dollar purchase is split into 4 equal BNPL payments. Find the exact amount of each payment.", "\\text{BNPL: }\\$480\\text{ in 4 payments}", "120", "Divide $480 by 4."),
    money("y9-fin-bnp-m2", "A 480 dollar BNPL purchase has 4 payments of 120 dollars each. One payment is missed and a 12 dollar late fee applies. Find the exact total paid.", "\\text{4 payments of }\\$120,\\quad \\text{late fee }\\$12", "492", "The base total is $480; add the $12 late fee."),
    choice("y9-fin-bnp-m3", "Which statement correctly describes a BNPL scheme with no late fees?", "A", ["The total paid equals the item price", "The total paid is less than the item price", "Interest is always charged", "The fee is paid upfront"], "No fee means total paid equals the item price."),
    money("y9-fin-bnp-m4", "A short-term loan borrows 1000 dollars and requires total repayments of 1150 dollars. Find the exact interest paid.", "\\text{borrowed }\\$1000,\\quad \\text{total repayment }\\$1150", "150", "Subtract $1000 from $1150."),
    money("y9-fin-bnp-m5", "Loan A: borrow 600 dollars, repay 690 dollars over 4 months. Loan B: borrow 600 dollars, repay 660 dollars over 2 months. Find the exact interest paid on Loan A.", "\\text{borrowed }\\$600,\\quad \\text{Loan A total repayment }\\$690", "90", "Subtract $600 from $690."),
    money("y9-fin-bnp-m6", "Using the same loans, find the exact interest paid on Loan B (total repayment 660 dollars on 600 dollars borrowed).", "\\text{borrowed }\\$600,\\quad \\text{Loan B total repayment }\\$660", "60", "Subtract $600 from $660."),
    choice("y9-fin-bnp-m7", "Loan A total repayment is 690 dollars. Loan B total repayment is 660 dollars. Both borrow 600 dollars. Which loan is cheaper?", "B", ["Loan A, because it has more repayments", "Loan B, because the total repayment is lower", "They cost the same amount", "Loan A, because it lasts longer"], "Lower total repayment means less paid overall."),
    money("y9-fin-bnp-m8", "A 360 dollar BNPL purchase is split into 6 fortnightly payments. Three payments are missed and each attracts a 10 dollar late fee. Find the exact total paid.", "\\text{6 payments of }\\$60,\\quad \\text{three late fees of }\\$10", "390", "The base total is $360; add three $10 fees."),
    choice("y9-fin-bnp-m9", "A 500 dollar item can be paid by BNPL (4 payments of 125 dollars, but one payment is missed with a 10 dollar fee) or by cash. Which is cheaper?", "B", ["BNPL is cheaper by $10", "Cash is cheaper by $10", "They cost the same", "BNPL is cheaper by $125"], "BNPL total is $510 (one late fee); cash is $500."),
    choice("y9-fin-bnp-m10", "Which of the following correctly calculates total interest paid on a short-term loan?", "C", ["total repayment + amount borrowed", "amount borrowed - total repayment", "total repayment - amount borrowed", "amount borrowed x number of payments"], "Interest is the extra amount paid above the original loan."),
  ],
};

const lessons: Record<string, LessonContent> = {
  "wages-and-earnings": wages,
  "penalty-rates-overtime": penalties,
  "non-wage-earnings": nonWage,
  "tax-and-net-earnings": tax,
  "spending-and-budgets": budgets,
  "simple-interest": simpleInterest,
  "deposits-and-repayments": repayments,
  "buy-now-pay-later-loans": buyNowPayLater,
};

export function year9FinancialMathematicsLessonOverride(course: CoursePathwaySeed, unit: CourseUnitSeed, lesson: CourseLessonSeed): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) || unit.slug !== "financial-mathematics") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return enhanceYear9CoreLesson(course, unit, lesson, { syllabusArea: "Number and Algebra", masteryPassMark: 0.8, ...content });
}
