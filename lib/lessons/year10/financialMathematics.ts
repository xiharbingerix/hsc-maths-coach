import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function moneyVariants(answer: string) {
  const value = Number(answer.replace(/[$,]/g, ""));

  if (!Number.isFinite(value)) {
    return [answer];
  }

  const fixed = value.toFixed(2);
  const comma = value.toLocaleString("en-AU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const commaFixed = value.toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return Array.from(
    new Set([answer, `$${answer}`, fixed, `$${fixed}`, comma, `$${comma}`, commaFixed, `$${commaFixed}`])
  );
}

function financeMoney(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: moneyVariants(answer),
    hint: "Identify the required amount, choose the relevant formula, and round only at the end.",
    explanation,
  };
}

function financeNumber(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Use the financial relationship shown in the lesson and check the units of your answer.",
    explanation,
  };
}

function financeChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint: "Compare each option with the financial relationship in the question.",
    explanation,
  };
}

const simpleInterestWorkedExamples: WorkedExample[] = [
  {
    title: "Find simple interest and the total amount",
    questionLatex:
      "\\text{Find the simple interest and total amount for }\\$1500\\text{ invested at }4\\%\\text{ p.a. for 2 years.}",
    steps: [
      { explanation: "Convert the percentage rate to a decimal.", latex: "r=4\\%=0.04" },
      { explanation: "Use the simple-interest formula.", latex: "I=Prt=1500(0.04)(2)=120" },
      { explanation: "Add the interest to the principal.", latex: "A=P+I=1500+120=1620" },
    ],
    finalAnswerLatex: "\\text{Interest }=\\$120,\\quad \\text{total amount }=\\$1620",
  },
  {
    title: "Find the simple-interest rate",
    questionLatex:
      "\\text{An investment of }\\$1200\\text{ earns }\\$180\\text{ simple interest in 3 years. Find the annual rate.}",
    steps: [
      { explanation: "Start with the simple-interest formula.", latex: "I=Prt" },
      { explanation: "Substitute the known values and divide.", latex: "180=1200(r)(3),\\quad r=\\frac{180}{3600}=0.05" },
      { explanation: "Convert the decimal rate to a percentage.", latex: "0.05=5\\%" },
    ],
    finalAnswerLatex: "5\\%\\text{ p.a.}",
  },
  {
    title: "Find the simple-interest time",
    questionLatex:
      "\\text{How long does }\\$2000\\text{ take to earn }\\$240\\text{ simple interest at }4\\%\\text{ p.a.?}",
    steps: [
      { explanation: "Use the simple-interest formula.", latex: "I=Prt" },
      { explanation: "Substitute the known values and divide.", latex: "240=2000(0.04)t,\\quad t=\\frac{240}{80}=3" },
    ],
    finalAnswerLatex: "3\\text{ years}",
  },
];

const simpleInterestGuided: PracticeQuestion[] = [
  financeMoney("y10-fin-si-g1", "Find the simple interest earned by 900 dollars invested at 6% p.a. for 2 years. Give the exact amount.", "P=\\$900,\\quad r=6\\%\\text{ p.a.},\\quad t=2\\text{ years}", "108", "The simple interest is $108."),
  financeMoney("y10-fin-si-g2", "Find the total amount after 1800 dollars is invested at 3.5% p.a. simple interest for 4 years. Give the exact amount.", "P=\\$1800,\\quad r=3.5\\%\\text{ p.a.},\\quad t=4\\text{ years}", "2052", "The interest is $252, so the total amount is $2052."),
  financeNumber("y10-fin-si-g3", "An investment of 1000 dollars earns 150 dollars simple interest in 3 years. Find the annual interest rate.", "P=\\$1000,\\quad I=\\$150,\\quad t=3\\text{ years}", "5%", ["5", "0.05"], "The annual simple-interest rate is 5%."),
  financeNumber("y10-fin-si-g4", "An investment of 1500 dollars earns 270 dollars simple interest at 6% p.a. Find the time in years.", "P=\\$1500,\\quad I=\\$270,\\quad r=6\\%\\text{ p.a.}", "3", ["3 years", "3years"], "The investment takes 3 years."),
];

const simpleInterestIndependent: PracticeQuestion[] = [
  financeMoney("y10-fin-si-i1", "Find the simple interest earned by 2400 dollars invested at 4.5% p.a. for 2 years. Give the exact amount.", "P=\\$2400,\\quad r=4.5\\%\\text{ p.a.},\\quad t=2\\text{ years}", "216", "The simple interest is $216."),
  financeMoney("y10-fin-si-i2", "Find the total amount after 3200 dollars is invested at 2.5% p.a. simple interest for 3 years. Give the exact amount.", "P=\\$3200,\\quad r=2.5\\%\\text{ p.a.},\\quad t=3\\text{ years}", "3440", "The interest is $240, so the total amount is $3440."),
  financeNumber("y10-fin-si-i3", "An investment of 800 dollars earns 96 dollars simple interest in 2 years. Find the annual interest rate.", "P=\\$800,\\quad I=\\$96,\\quad t=2\\text{ years}", "6%", ["6", "0.06"], "The annual rate is 6%."),
  financeNumber("y10-fin-si-i4", "An investment of 1500 dollars earns 225 dollars simple interest at 5% p.a. Find the time in years.", "P=\\$1500,\\quad I=\\$225,\\quad r=5\\%\\text{ p.a.}", "3", ["3 years", "3years"], "The investment takes 3 years."),
  financeChoice("y10-fin-si-i5", "Two simple-interest investments both start with 2000 dollars. Option A earns 4% p.a. for 3 years. Option B earns 3.5% p.a. for 4 years. Which option earns more interest?", "B", ["Option A", "Option B", "They earn the same interest", "There is not enough information"], "Option A earns $240 and Option B earns $280, so Option B earns more.", "\\text{Compare the interest earned by each option.}"),
];

const simpleInterestMastery: PracticeQuestion[] = [
  financeMoney("y10-fin-si-m1", "Find the simple interest earned by 1250 dollars invested at 4% p.a. for 2 years. Give the exact amount.", "P=\\$1250,\\quad r=4\\%\\text{ p.a.},\\quad t=2\\text{ years}", "100", "The simple interest is $100."),
  financeMoney("y10-fin-si-m2", "A 1000 dollar investment earns 150 dollars simple interest. Find the total amount. Give the exact amount.", "P=\\$1000,\\quad I=\\$150", "1150", "Add principal and interest to get $1150."),
  financeChoice("y10-fin-si-m3", "Which decimal should be used for a simple-interest rate of 7%?", "C", ["7", "0.7", "0.07", "0.007"], "Seven percent is 7 divided by 100, which is 0.07."),
  financeMoney("y10-fin-si-m4", "Find the simple interest earned by 2600 dollars invested at 3% p.a. for 5 years. Give the exact amount.", "P=\\$2600,\\quad r=3\\%\\text{ p.a.},\\quad t=5\\text{ years}", "390", "The simple interest is $390."),
  financeMoney("y10-fin-si-m5", "Find the total amount after 4500 dollars is invested at 2% p.a. simple interest for 4 years. Give the exact amount.", "P=\\$4500,\\quad r=2\\%\\text{ p.a.},\\quad t=4\\text{ years}", "4860", "The interest is $360, giving a total of $4860."),
  financeNumber("y10-fin-si-m6", "An investment of 3000 dollars earns 360 dollars simple interest in 3 years. Find the annual interest rate.", "P=\\$3000,\\quad I=\\$360,\\quad t=3\\text{ years}", "4%", ["4", "0.04"], "The annual rate is 4%."),
  financeNumber("y10-fin-si-m7", "An investment of 1800 dollars earns 324 dollars simple interest at 6% p.a. Find the time in years.", "P=\\$1800,\\quad I=\\$324,\\quad r=6\\%\\text{ p.a.}", "3", ["3 years", "3years"], "The investment takes 3 years."),
  financeChoice("y10-fin-si-m8", "A 2500 dollar investment is offered for 3 years. Option A pays 4% p.a. simple interest with no fee. Option B pays 5% p.a. simple interest but charges a 100 dollar fee at the end. Which option gives the higher final amount after the fee?", "A", ["Option A", "Option B", "They give the same final amount", "The principal must be doubled first"], "Option A finishes at $2800. Option B finishes at $2775 after the fee, so Option A is better.", "\\text{Compare the final amounts after any fee.}"),
  financeNumber("y10-fin-si-m9", "A 2400 dollar investment earns 384 dollars simple interest at 4% p.a. Find the time in years.", "P=\\$2400,\\quad I=\\$384,\\quad r=4\\%\\text{ p.a.}", "4", ["4 years", "4years"], "The investment takes 4 years."),
  financeChoice("y10-fin-si-m10", "An investment of 1600 dollars earns 320 dollars simple interest over 4 years. Which annual rate is correct?", "B", ["4% p.a.", "5% p.a.", "8% p.a.", "20% p.a."], "Using the simple-interest relationship gives an annual rate of 5%.", "P=\\$1600,\\quad I=\\$320,\\quad t=4\\text{ years}"),
];

const compoundInterestWorkedExamples: WorkedExample[] = [
  {
    title: "Find a compound-interest balance",
    questionLatex:
      "\\text{Find the balance of }\\$2000\\text{ invested at }5\\%\\text{ p.a., compounded yearly, for 3 years.}",
    steps: [
      { explanation: "Convert the annual rate to a growth factor.", latex: "1+r=1.05" },
      { explanation: "Use the compound-interest formula.", latex: "A=P(1+r)^n=2000(1.05)^3" },
      { explanation: "Evaluate and round to cents.", latex: "A=2315.25" },
    ],
    finalAnswerLatex: "\\$2315.25",
  },
  {
    title: "Find interest earned",
    questionLatex:
      "\\text{A }\\$1500\\text{ investment grows to }\\$1687.50.\\text{ Find the interest earned.}",
    steps: [
      { explanation: "Interest earned is the final amount minus the original principal.", latex: "1687.50-1500=187.50" },
    ],
    finalAnswerLatex: "\\$187.50",
  },
  {
    title: "Compare simple and compound interest",
    questionLatex:
      "\\text{Compare }\\$3000\\text{ invested at }4\\%\\text{ p.a. for 2 years using simple interest and yearly compound interest.}",
    steps: [
      { explanation: "Calculate the simple-interest total.", latex: "A_{\\text{simple}}=3000+3000(0.04)(2)=3240" },
      { explanation: "Calculate the yearly compound-interest total.", latex: "A_{\\text{compound}}=3000(1.04)^2=3244.80" },
      { explanation: "Compare the final amounts.", latex: "3244.80-3240=4.80" },
    ],
    finalAnswerLatex: "\\text{Compound interest gives }\\$4.80\\text{ more.}",
  },
];

const compoundInterestGuided: PracticeQuestion[] = [
  financeMoney("y10-fin-ci-g1", "Find the balance of 1500 dollars invested at 4% p.a., compounded yearly, for 2 years. Round to cents.", "P=\\$1500,\\quad r=4\\%\\text{ p.a.},\\quad n=2", "1622.40", "The balance is $1622.40."),
  financeMoney("y10-fin-ci-g2", "A 2500 dollar investment earns compound interest at 3% p.a. for 3 years, compounded yearly. Find the interest earned. Round to cents.", "P=\\$2500,\\quad r=3\\%\\text{ p.a.},\\quad n=3", "231.82", "The balance is $2731.82, so the interest earned is $231.82."),
  financeChoice("y10-fin-ci-g3", "Which growth factor represents an increase of 6.5% each year?", "D", ["0.935", "0.065", "1.65", "1.065"], "An increase of 6.5% uses the growth factor 1.065."),
  financeChoice("y10-fin-ci-g4", "A 1000 dollar investment earns 5% p.a. for 2 years. Which method gives the slightly larger final amount?", "B", ["Simple interest", "Yearly compound interest", "Both always give zero interest", "There is not enough information"], "Compound interest earns interest on the growing balance, so it gives $1102.50 compared with $1100."),
];

const compoundInterestIndependent: PracticeQuestion[] = [
  financeMoney("y10-fin-ci-i1", "Find the balance of 3200 dollars invested at 2.5% p.a., compounded yearly, for 2 years. Round to cents.", "P=\\$3200,\\quad r=2.5\\%\\text{ p.a.},\\quad n=2", "3362.00", "The balance is $3362.00."),
  financeMoney("y10-fin-ci-i2", "A 1800 dollar investment earns compound interest at 6% p.a. for 3 years, compounded yearly. Find the interest earned. Round to cents.", "P=\\$1800,\\quad r=6\\%\\text{ p.a.},\\quad n=3", "343.83", "The balance is $2143.83, so the interest earned is $343.83."),
  financeChoice("y10-fin-ci-i3", "Which growth factor represents an increase of 3.7% each year?", "A", ["1.037", "0.963", "3.7", "0.037"], "An increase of 3.7% uses the growth factor 1.037."),
  financeMoney("y10-fin-ci-i4", "Find the balance of 5000 dollars invested at 4% p.a., compounded yearly, for 2 years. Round to cents.", "P=\\$5000,\\quad r=4\\%\\text{ p.a.},\\quad n=2", "5408.00", "The balance is $5408.00."),
  financeChoice("y10-fin-ci-i5", "A model uses an initial balance of 2500 dollars, a growth factor of 1.03, and an exponent of 4. What does the model describe?", "C", ["A 3% decrease for 4 years", "A 4% increase for 3 years", "A 3% increase for 4 years", "A fixed increase of 3 dollars"], "A growth factor of 1.03 means a 3% yearly increase, and the exponent gives 4 years.", "P=\\$2500,\\quad \\text{growth factor}=1.03,\\quad n=4"),
];

const compoundInterestMastery: PracticeQuestion[] = [
  financeMoney("y10-fin-ci-m1", "Find the balance of 1000 dollars invested at 5% p.a., compounded yearly, for 2 years. Round to cents.", "P=\\$1000,\\quad r=5\\%\\text{ p.a.},\\quad n=2", "1102.50", "The balance is $1102.50."),
  financeChoice("y10-fin-ci-m2", "Which growth factor represents an increase of 8% each year?", "B", ["0.92", "1.08", "0.08", "8"], "An 8% increase uses the growth factor 1.08."),
  financeMoney("y10-fin-ci-m3", "A 2000 dollar investment earns compound interest at 4% p.a. for 2 years, compounded yearly. Find the interest earned. Round to cents.", "P=\\$2000,\\quad r=4\\%\\text{ p.a.},\\quad n=2", "163.20", "The balance is $2163.20, so the interest earned is $163.20."),
  financeMoney("y10-fin-ci-m4", "Find the balance of 3500 dollars invested at 2.5% p.a., compounded yearly, for 3 years. Round to cents.", "P=\\$3500,\\quad r=2.5\\%\\text{ p.a.},\\quad n=3", "3769.12", "The balance is $3769.12."),
  financeChoice("y10-fin-ci-m5", "Which formula models yearly compound growth?", "A", ["$A=P(1+r)^n$", "$I=Prt$", "$A=P-I$", "$A=P(1-r)^n$"], "Yearly compound growth multiplies the principal by the growth factor for each year."),
  financeMoney("y10-fin-ci-m6", "Find the balance of 2400 dollars invested at 3% p.a., compounded yearly, for 4 years. Round to cents.", "P=\\$2400,\\quad r=3\\%\\text{ p.a.},\\quad n=4", "2701.22", "The balance is $2701.22."),
  financeChoice("y10-fin-ci-m7", "For the same principal and annual rate, how do simple and yearly compound interest compare after exactly 1 year?", "C", ["Simple interest is always higher", "Compound interest is always higher", "They give the same final amount", "Both give a loss"], "After one year, both methods apply the same single annual rate to the original principal."),
  financeChoice("y10-fin-ci-m8", "A 5000 dollar investment is held for 3 years at 4% p.a. Which option gives the larger final amount?", "B", ["Simple interest", "Yearly compound interest", "They give the same final amount", "Neither earns interest"], "Simple interest gives $5600. Compound interest gives $5624.32, so yearly compound interest is larger.", "\\text{Compare simple interest with yearly compound interest.}"),
  financeChoice("y10-fin-ci-m9", "Which model correctly represents 2000 dollars invested at 3% p.a., compounded yearly, for 4 years?", "D", ["$A=2000(0.03)^4$", "$A=2000(1.04)^3$", "$A=2000+0.03(4)$", "$A=2000(1.03)^4$"], "Use the principal, the growth factor 1.03, and the exponent 4."),
  financeChoice("y10-fin-ci-m10", "A student says a yearly growth factor of 1.06 means the investment increases by 1.06% each year. What is the correct interpretation?", "A", ["It increases by 6% each year", "It increases by 106% each year", "It decreases by 6% each year", "It increases by 0.06% each year"], "The extra part above 1 is 0.06, which represents a 6% increase."),
];

const depreciationWorkedExamples: WorkedExample[] = [
  {
    title: "Find value after depreciation",
    questionLatex:
      "\\text{A car worth }\\$24000\\text{ depreciates by }10\\%\\text{ p.a. for 2 years. Find its value.}",
    steps: [
      { explanation: "Convert the decrease to a depreciation factor.", latex: "1-r=1-0.10=0.90" },
      { explanation: "Use the depreciation model.", latex: "A=P(1-r)^n=24000(0.90)^2" },
      { explanation: "Evaluate the final value.", latex: "A=19440" },
    ],
    finalAnswerLatex: "\\$19440",
  },
  {
    title: "Find the amount lost",
    questionLatex:
      "\\text{A laptop originally costs }\\$3000\\text{ and is worth }\\$1920\\text{ later. Find the loss in value.}",
    steps: [
      { explanation: "Subtract the final value from the original value.", latex: "3000-1920=1080" },
    ],
    finalAnswerLatex: "\\$1080",
  },
  {
    title: "Interpret a depreciation factor",
    questionLatex: "\\text{An asset value is multiplied by }0.88\\text{ each year. Find the annual depreciation rate.}",
    steps: [
      { explanation: "Find the part removed from the original whole.", latex: "1-0.88=0.12" },
      { explanation: "Convert the decimal decrease to a percentage.", latex: "0.12=12\\%" },
    ],
    finalAnswerLatex: "12\\%\\text{ p.a.}",
  },
];

const depreciationGuided: PracticeQuestion[] = [
  financeMoney("y10-fin-dep-g1", "A car worth 18000 dollars depreciates by 10% p.a. for 2 years. Find its value after 2 years. Give the exact amount.", "P=\\$18000,\\quad r=10\\%\\text{ p.a.},\\quad n=2", "14580", "The value after 2 years is $14580."),
  financeMoney("y10-fin-dep-g2", "A device worth 3200 dollars depreciates by 20% p.a. for 3 years. Find its value after 3 years. Round to cents.", "P=\\$3200,\\quad r=20\\%\\text{ p.a.},\\quad n=3", "1638.40", "The value after 3 years is $1638.40."),
  financeChoice("y10-fin-dep-g3", "Which depreciation factor represents a 7% decrease each year?", "C", ["1.07", "0.07", "0.93", "7"], "A 7% decrease leaves 93%, so the factor is 0.93."),
  financeMoney("y10-fin-dep-g4", "An asset originally worth 9000 dollars depreciates by 15% in one year. Find the loss in value. Give the exact amount.", "P=\\$9000,\\quad r=15\\%,\\quad n=1", "1350", "The asset loses $1350 in value."),
];

const depreciationIndependent: PracticeQuestion[] = [
  financeMoney("y10-fin-dep-i1", "A vehicle worth 15000 dollars depreciates by 12% p.a. for 2 years. Find its value after 2 years. Give the exact amount.", "P=\\$15000,\\quad r=12\\%\\text{ p.a.},\\quad n=2", "11616", "The value after 2 years is $11616."),
  financeMoney("y10-fin-dep-i2", "A tablet worth 2500 dollars depreciates by 25% p.a. for 2 years. Find its value after 2 years. Round to cents.", "P=\\$2500,\\quad r=25\\%\\text{ p.a.},\\quad n=2", "1406.25", "The value after 2 years is $1406.25."),
  financeChoice("y10-fin-dep-i3", "Which depreciation factor represents a 6% decrease each year?", "B", ["1.06", "0.94", "0.06", "6"], "A 6% decrease leaves 94%, so the factor is 0.94."),
  financeMoney("y10-fin-dep-i4", "An asset originally worth 20000 dollars is later worth 16200 dollars. Find the loss in value. Give the exact amount.", "\\text{original value}=\\$20000,\\quad \\text{final value}=\\$16200", "3800", "The loss in value is $3800."),
  financeChoice("y10-fin-dep-i5", "Which model correctly represents 12000 dollars depreciating by 8% p.a. for 3 years?", "A", ["$A=12000(0.92)^3$", "$A=12000(1.08)^3$", "$A=12000(0.08)^3$", "$A=12000-0.08(3)$"], "An 8% decrease leaves a yearly factor of 0.92."),
];

const depreciationMastery: PracticeQuestion[] = [
  financeChoice("y10-fin-dep-m1", "Which depreciation factor represents a 10% decrease each year?", "D", ["1.10", "0.10", "10", "0.90"], "A 10% decrease leaves 90%, so the factor is 0.90."),
  financeMoney("y10-fin-dep-m2", "A car worth 12000 dollars depreciates by 20% in one year. Find its new value. Give the exact amount.", "P=\\$12000,\\quad r=20\\%,\\quad n=1", "9600", "The new value is $9600."),
  financeMoney("y10-fin-dep-m3", "An asset originally worth 8000 dollars is later worth 6800 dollars. Find the loss in value. Give the exact amount.", "\\text{original value}=\\$8000,\\quad \\text{final value}=\\$6800", "1200", "The asset loses $1200 in value."),
  financeMoney("y10-fin-dep-m4", "A device worth 5000 dollars depreciates by 10% p.a. for 3 years. Find its value after 3 years. Give the exact amount.", "P=\\$5000,\\quad r=10\\%\\text{ p.a.},\\quad n=3", "3645", "The value after 3 years is $3645."),
  financeChoice("y10-fin-dep-m5", "Which formula models repeated yearly depreciation?", "C", ["$A=P+I$", "$A=P(1+r)^n$", "$A=P(1-r)^n$", "$I=Prt$"], "Repeated depreciation uses a factor below 1, so the model is $A=P(1-r)^n$."),
  financeChoice("y10-fin-dep-m6", "Which asset loses value faster if both start at the same price?", "A", ["An asset depreciating at 12% p.a.", "An asset depreciating at 8% p.a.", "They always have the same value", "The asset with the lower depreciation rate"], "A larger depreciation rate removes more value each year."),
  financeMoney("y10-fin-dep-m7", "A phone worth 3000 dollars depreciates by 15% p.a. for 2 years. Find its value after 2 years. Round to cents.", "P=\\$3000,\\quad r=15\\%\\text{ p.a.},\\quad n=2", "2167.50", "The value after 2 years is $2167.50."),
  financeChoice("y10-fin-dep-m8", "An asset falls from 10000 dollars to 8100 dollars after 2 years of equal yearly percentage depreciation. Which annual depreciation rate fits?", "B", ["9% p.a.", "10% p.a.", "19% p.a.", "81% p.a."], "A 10% yearly decrease uses a factor of 0.90, and two factors give 0.81 of the original value.", "\\text{original value}=\\$10000,\\quad \\text{value after 2 years}=\\$8100"),
  financeChoice("y10-fin-dep-m9", "Car A starts at 20000 dollars and depreciates by 10% in one year. Car B starts at 18000 dollars and depreciates by 5% in one year. Which car has the higher value after one year?", "A", ["Car A", "Car B", "They have the same value", "Neither car has any value"], "Car A is worth $18000 and Car B is worth $17100, so Car A has the higher value.", "\\text{Compare the values after 1 year.}"),
  financeChoice("y10-fin-dep-m10", "A yearly depreciation factor is 0.82. Which interpretation is correct?", "D", ["The value increases by 82%", "The value decreases by 82%", "The value increases by 18%", "The value decreases by 18%"], "A factor of 0.82 leaves 82% of the value, so 18% is lost each year."),
];

const comparingInvestmentsWorkedExamples: WorkedExample[] = [
  {
    title: "Compare simple and compound returns",
    questionLatex:
      "\\text{Compare }\\$3000\\text{ for 3 years: Option A pays }5\\%\\text{ p.a. simple interest; Option B pays }4.8\\%\\text{ p.a. compounded yearly.}",
    steps: [
      { explanation: "Calculate the final simple-interest amount.", latex: "A=3000+3000(0.05)(3)=3450" },
      { explanation: "Calculate the final compound-interest amount.", latex: "B=3000(1.048)^3=3453.07" },
      { explanation: "Compare the rounded amounts.", latex: "3453.07-3450=3.07" },
    ],
    finalAnswerLatex: "\\text{Option B is higher by }\\$3.07.",
  },
  {
    title: "Compare accounts after fees",
    questionLatex:
      "\\text{For }\\$5000\\text{ over 2 years, Account A pays }4\\%\\text{ p.a. compounded yearly then charges }\\$25.\\text{ Account B pays }3.5\\%\\text{ p.a. compounded yearly with no fee.}",
    steps: [
      { explanation: "Calculate Account A after its fee.", latex: "A=5000(1.04)^2-25=5383" },
      { explanation: "Calculate Account B.", latex: "B=5000(1.035)^2=5356.13" },
      { explanation: "Compare the final amounts.", latex: "5383-5356.13=26.87" },
    ],
    finalAnswerLatex: "\\text{Account A is higher by }\\$26.87.",
  },
  {
    title: "Find net gain after a cost",
    questionLatex:
      "\\text{An investment costs }\\$1500\\text{ and later returns }\\$1640.\\text{ A }\\$40\\text{ fee is charged. Find the net gain.}",
    steps: [
      { explanation: "Subtract the original cost and the fee from the final return.", latex: "1640-1500-40=100" },
    ],
    finalAnswerLatex: "\\$100\\text{ net gain}",
  },
];

const comparingInvestmentsGuided: PracticeQuestion[] = [
  financeChoice("y10-fin-comp-g1", "Two 2000 dollar investments are held for 3 years. Option A pays 4% p.a. simple interest. Option B pays 3.8% p.a. compounded yearly. Which option has the higher final amount?", "A", ["Option A", "Option B", "They give the same final amount", "Neither can be compared"], "Option A finishes at $2240. Option B finishes at $2236.77, so Option A is higher.", "\\text{Compare the final amounts over the same 3 years.}"),
  financeMoney("y10-fin-comp-g2", "An account balance is 4200 dollars before a 35 dollar closing fee. Find the final amount after the fee. Give the exact amount.", "\\text{balance before fee}=\\$4200,\\quad \\text{fee}=\\$35", "4165", "The final amount after the fee is $4165."),
  financeMoney("y10-fin-comp-g3", "An investment costs 2400 dollars and later returns 2750 dollars. A 50 dollar fee is charged. Find the net gain. Give the exact amount.", "\\text{cost}=\\$2400,\\quad \\text{return}=\\$2750,\\quad \\text{fee}=\\$50", "300", "The net gain is $300."),
  financeChoice("y10-fin-comp-g4", "Why can the investment with the highest advertised percentage rate still be the worse choice?", "C", ["Rates never matter", "The principal must be ignored", "Fees and time can change the final amount", "Compound interest always decreases value"], "A fair comparison uses the same time period and includes fees."),
];

const comparingInvestmentsIndependent: PracticeQuestion[] = [
  financeChoice("y10-fin-comp-i1", "Two 4000 dollar investments are held for 2 years. Option A pays 3.5% p.a. simple interest. Option B pays 3.4% p.a. compounded yearly. Which option has the higher final amount?", "A", ["Option A", "Option B", "They give the same final amount", "There is not enough information"], "Option A finishes at $4280. Option B finishes at $4276.62, so Option A is higher.", "\\text{Compare the final amounts over the same 2 years.}"),
  financeMoney("y10-fin-comp-i2", "An account balance is 5250 dollars before a 45 dollar closing fee. Find the final amount after the fee. Give the exact amount.", "\\text{balance before fee}=\\$5250,\\quad \\text{fee}=\\$45", "5205", "The final amount after the fee is $5205."),
  financeMoney("y10-fin-comp-i3", "An investment costs 6200 dollars and later returns 6800 dollars. An 80 dollar fee is charged. Find the net gain. Give the exact amount.", "\\text{cost}=\\$6200,\\quad \\text{return}=\\$6800,\\quad \\text{fee}=\\$80", "520", "The net gain is $520."),
  financeChoice("y10-fin-comp-i4", "Account A has a final balance of 3120 dollars before a 20 dollar fee. Account B has a final balance of 3095 dollars with no fee. Which account finishes higher?", "A", ["Account A by $5", "Account B by $5", "They finish equal", "Account B by $25"], "Account A finishes at $3100 after its fee, which is $5 more than Account B."),
  financeChoice("y10-fin-comp-i5", "Which process gives a fair comparison of two investments?", "D", ["Compare only the advertised rates", "Ignore the investment time", "Add fees to the final balance", "Calculate each final amount over the same time and include fees"], "A fair comparison uses final amounts over the same time period after fees."),
];

const comparingInvestmentsMastery: PracticeQuestion[] = [
  financeMoney("y10-fin-comp-m1", "An investment costs 2500 dollars and later returns 2700 dollars. Find the net gain. Give the exact amount.", "\\text{cost}=\\$2500,\\quad \\text{return}=\\$2700", "200", "The net gain is $200."),
  financeMoney("y10-fin-comp-m2", "An investment costs 3600 dollars and later returns 3800 dollars. A 50 dollar fee is charged. Find the net gain. Give the exact amount.", "\\text{cost}=\\$3600,\\quad \\text{return}=\\$3800,\\quad \\text{fee}=\\$50", "150", "The net gain is $150."),
  financeMoney("y10-fin-comp-m3", "An account balance is 4300 dollars before a 35 dollar closing fee. Find the final amount after the fee. Give the exact amount.", "\\text{balance before fee}=\\$4300,\\quad \\text{fee}=\\$35", "4265", "The final amount is $4265."),
  financeChoice("y10-fin-comp-m4", "Account A has a final balance of 4100 dollars before a 30 dollar fee. Account B has a final balance of 4055 dollars with no fee. Which account finishes higher?", "A", ["Account A by $15", "Account B by $15", "They finish equal", "Account B by $45"], "Account A finishes at $4070 after its fee, which is $15 more than Account B."),
  financeChoice("y10-fin-comp-m5", "What should be subtracted when comparing an investment return with its original cost?", "B", ["Only the percentage sign", "Any fees as well as the original cost", "The final return", "The number of years only"], "Net gain accounts for the original cost and any fees."),
  financeChoice("y10-fin-comp-m6", "Two 5000 dollar investments are held for 2 years. Option A pays 4% p.a. simple interest. Option B pays 3.8% p.a. compounded yearly. Which option has the higher final amount?", "A", ["Option A", "Option B", "They give the same final amount", "The amounts cannot be compared"], "Option A finishes at $5400. Option B finishes at $5387.22, so Option A is higher.", "\\text{Compare the final amounts over the same 2 years.}"),
  financeMoney("y10-fin-comp-m7", "An investment costs 6500 dollars, later returns 7200 dollars, and has a 100 dollar fee. Find the net gain. Give the exact amount.", "\\text{cost}=\\$6500,\\quad \\text{return}=\\$7200,\\quad \\text{fee}=\\$100", "600", "The net gain is $600."),
  financeChoice("y10-fin-comp-m8", "Two 6000 dollar investments are held for 3 years. Option A pays 4% p.a. simple interest and charges a 20 dollar fee. Option B pays 3.8% p.a. compounded yearly with no fee. Which option has the higher final amount?", "B", ["Option A", "Option B", "They finish equal", "The fee should be added to Option A"], "Option A finishes at $6700 after its fee. Option B finishes at $6710.32, so Option B is higher.", "\\text{Compare the final amounts after any fee.}"),
  financeChoice("y10-fin-comp-m9", "Two one-year options start with 2000 dollars. Option A advertises 5% interest but charges a 150 dollar fee. Option B pays 4% interest with no fee. Which option gives the higher final amount?", "B", ["Option A", "Option B", "They finish equal", "The advertised rate alone decides"], "Option A finishes at $1950 after its fee. Option B finishes at $2080, so Option B is better.", "\\text{Compare the final amounts after any fee.}"),
  financeChoice("y10-fin-comp-m10", "Which approach is most reliable when choosing between two investment options with different rates and fees?", "D", ["Choose the largest percentage immediately", "Ignore fixed fees", "Compare only the interest earned before fees", "Calculate both final amounts over the same time, subtract fees, then compare"], "A fair comparison uses final amounts over the same time period after fees."),
];

export function year10FinancialMathematicsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-10-mathematics" || unit.slug !== "financial-mathematics") {
    return null;
  }

  const base = {
    syllabusArea: "Financial Mathematics",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "simple-interest") {
    return {
      ...base,
      description: "Calculate simple interest, total amounts, rates and time, and compare simple-interest options.",
      learningIntention: "Use simple interest to calculate earnings, total amounts, rates and investment times.",
      successCriteria: [
        "Identify principal, annual rate and time.",
        "Convert a percentage rate to a decimal before calculating.",
        "Calculate simple interest and total amount.",
        "Rearrange the simple-interest relationship to find a missing rate or time.",
      ],
      teaching: {
        paragraphs: [
          "Simple interest is calculated from the original principal only. The interest added each year stays the same.",
          "The principal is the starting amount. The rate is usually written as a percentage per annum, which means per year. Convert the percentage to a decimal before calculating.",
          "Interest earned and total amount are different. The total amount includes both the original principal and the interest.",
          "For harder questions, the same relationship can be rearranged to find a missing rate or time.",
        ],
        latexBlocks: ["I=Prt", "A=P+I", "r=\\frac{I}{Pt}", "t=\\frac{I}{Pr}"],
      },
      workedExamples: simpleInterestWorkedExamples,
      guidedPractice: simpleInterestGuided,
      independentPractice: simpleInterestIndependent,
      commonMistakes: [
        { mistake: "Using the percentage rate as a whole number.", fix: "Convert the rate before calculating. For example, 5% becomes 0.05." },
        { mistake: "Reporting the interest when the question asks for the total amount.", fix: "Add the original principal to the interest when the question asks for the total." },
        { mistake: "Using months as though they were years.", fix: "Match the time unit to the annual rate before substituting." },
        { mistake: "Comparing rates without checking the investment time.", fix: "Calculate each final amount over its stated time period before deciding which option is better." },
      ],
      masteryQuiz: simpleInterestMastery,
    };
  }

  if (lesson.slug === "compound-interest") {
    return {
      ...base,
      description: "Use yearly compound growth factors to calculate balances, interest earned and investment comparisons.",
      learningIntention: "Calculate compound-interest balances and explain how yearly growth differs from simple interest.",
      successCriteria: [
        "Convert an annual percentage increase to a growth factor.",
        "Use yearly compound interest to find a final balance.",
        "Calculate interest earned from the final balance and principal.",
        "Compare simple and compound interest over the same time period.",
      ],
      teaching: {
        paragraphs: [
          "Compound interest is calculated on the current balance. After each year, the interest becomes part of the balance for the next year.",
          "A percentage increase is represented by a growth factor greater than 1. Add the decimal rate to 1.",
          "The exponent counts the number of yearly compounding periods.",
          "Interest earned is the increase above the original principal, not the final balance itself.",
        ],
        latexBlocks: ["A=P(1+r)^n", "\\text{growth factor}=1+r", "\\text{interest earned}=A-P"],
      },
      workedExamples: compoundInterestWorkedExamples,
      guidedPractice: compoundInterestGuided,
      independentPractice: compoundInterestIndependent,
      commonMistakes: [
        { mistake: "Using the percentage rate instead of the growth factor.", fix: "For 5% growth, use 1.05 as the repeated multiplier." },
        { mistake: "Using the simple-interest relationship for repeated compound growth.", fix: "Compound interest multiplies the changing balance by the growth factor each year." },
        { mistake: "Reporting the final balance when the question asks for interest earned.", fix: "Subtract the original principal from the final balance." },
        { mistake: "Rounding each yearly result too early.", fix: "Keep the calculator value until the final step, then round to cents." },
      ],
      masteryQuiz: compoundInterestMastery,
    };
  }

  if (lesson.slug === "depreciation") {
    return {
      ...base,
      description: "Use depreciation factors to calculate asset values, losses in value and percentage decreases.",
      learningIntention: "Model repeated depreciation and interpret the value lost over time.",
      successCriteria: [
        "Convert a percentage decrease to a depreciation factor.",
        "Calculate an asset value after repeated yearly depreciation.",
        "Find the amount lost in value.",
        "Interpret a depreciation factor as a percentage decrease.",
      ],
      teaching: {
        paragraphs: [
          "Depreciation is a decrease in value over time. Cars, phones and other assets often lose a percentage of their current value each year.",
          "A percentage decrease uses a factor below 1. Subtract the decimal rate from 1 to find the depreciation factor.",
          "The exponent counts the number of yearly depreciation periods.",
          "The amount lost is the original value minus the final value.",
        ],
        latexBlocks: ["A=P(1-r)^n", "\\text{depreciation factor}=1-r", "\\text{loss in value}=P-A"],
      },
      workedExamples: depreciationWorkedExamples,
      guidedPractice: depreciationGuided,
      independentPractice: depreciationIndependent,
      commonMistakes: [
        { mistake: "Using a growth factor for depreciation.", fix: "A decrease uses a factor below 1. For 12% depreciation, use 0.88." },
        { mistake: "Subtracting the percentage from the original value only once when the asset depreciates for several years.", fix: "Apply the depreciation factor once for each year." },
        { mistake: "Reporting the final value when the question asks for the loss.", fix: "Subtract the final value from the original value." },
        { mistake: "Reading a factor of 0.82 as an 82% decrease.", fix: "A factor of 0.82 means 82% remains, so the decrease is 18%." },
      ],
      masteryQuiz: depreciationMastery,
    };
  }

  if (lesson.slug === "comparing-investments") {
    return {
      ...base,
      description: "Compare financial options using final amounts, interest methods, fixed fees and net gains.",
      learningIntention: "Make fair financial comparisons by calculating final values over the same time period and including fees.",
      successCriteria: [
        "Calculate a net gain after costs and fees.",
        "Compare simple-interest and compound-interest options.",
        "Include fixed fees when comparing final amounts.",
        "Explain why the highest advertised rate is not always the best option.",
      ],
      teaching: {
        paragraphs: [
          "A fair investment comparison uses final amounts over the same time period. The advertised percentage rate alone may not identify the better option.",
          "Fees reduce the amount received. Include them before deciding which option finishes higher.",
          "Net gain measures how much has been earned after subtracting the original cost and any fees.",
          "A slightly lower rate can still produce a better result if the fee structure or interest method is different.",
        ],
        latexBlocks: [
          "\\text{final amount after fee}=\\text{balance}-\\text{fee}",
          "\\text{net gain}=\\text{final return}-\\text{original cost}-\\text{fees}",
        ],
      },
      workedExamples: comparingInvestmentsWorkedExamples,
      guidedPractice: comparingInvestmentsGuided,
      independentPractice: comparingInvestmentsIndependent,
      commonMistakes: [
        { mistake: "Choosing the largest advertised percentage without calculating the final amount.", fix: "Compare the actual final amounts over the same time period." },
        { mistake: "Ignoring a fixed fee.", fix: "Subtract fees before deciding which option finishes higher." },
        { mistake: "Comparing investments held for different lengths of time as though the periods were equal.", fix: "Use the same time period for a fair comparison." },
        { mistake: "Calling the full final return the net gain.", fix: "Subtract the original cost and any fees to find the net gain." },
      ],
      masteryQuiz: comparingInvestmentsMastery,
    };
  }

  return null;
}
