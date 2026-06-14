import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import {
  financeChoice,
  financeShortAnswer as baseFinanceShortAnswer,
  moneyAnswer as baseMoneyAnswer,
} from "../questionHelpers";

function financeFeedback(prompt: string, latex: string, answer: string) {
  if (prompt.includes("interest earned")) {
    return `Interest earned is the extra money added, not the whole balance. Subtract the original amount from the final balance to get ${answer}.`;
  }
  if (prompt.includes("growth factor")) {
    return prompt.includes("What annual percentage rate") ||
      prompt.includes("represents what percentage")
      ? `A growth factor is 1 plus the decimal rate. Subtract 1, then convert the decimal to a percentage; this gives ${answer}.`
      : `Growth keeps the original balance and adds the percentage increase, so use 1 plus the decimal rate. The growth factor is ${answer}.`;
  }
  if (prompt.includes("decay factor")) {
    return `Depreciation keeps only part of the value each period. Subtract the decimal depreciation rate from 1 to get the decay factor ${answer}.`;
  }
  if (prompt.includes("net return") || prompt.includes("net balance")) {
    return `Net balance means the amount left after fees. Subtract the stated fee from the return before comparing options; this gives ${answer}.`;
  }
  if (
    prompt.includes("previous balance") ||
    prompt.includes("Find the starting balance")
  ) {
    return `This is a reverse recurrence question. Undo the final addition or subtraction first, then undo the multiplication factor to recover ${answer}.`;
  }
  if (latex.includes("B_{n+1}")) {
    return `A loan recurrence follows the order shown: apply interest to the current debt, then subtract the repayment. Carrying out those steps gives the next balance ${answer}.`;
  }
  if (latex.includes("S_{n+1}")) {
    return `A savings recurrence grows the current balance first, then adds the regular deposit. Following that order gives the new balance ${answer}.`;
  }
  if (prompt.includes("depreciat") || latex.includes("V=P(1-r)^n")) {
    return `Depreciation is repeated percentage loss, so multiply by a decay factor below 1 for each period. Applying the factor and rounding at the end gives ${answer}.`;
  }
  if (
    prompt.includes("compounded") ||
    prompt.includes("investment") ||
    latex.includes("A=P(1+r)^n")
  ) {
    return `Compound interest is repeated multiplication because each period earns interest on the updated balance. Use the growth factor once per period and round at the end to get ${answer}.`;
  }
  if (prompt.includes("deposit")) {
    return `Apply interest to the existing savings first, then add the new deposit at the time stated. The resulting balance is ${answer}.`;
  }
  if (
    prompt.includes("monthly repayment") ||
    prompt.includes("Find the monthly") ||
    prompt.includes("repayment on a")
  ) {
    return `Use M = P × r ÷ (1 − (1+r)^(−n)). Substitute the monthly rate r = annual rate ÷ 12, number of months n, and loan P to get the repayment M = ${answer}.`;
  }
  if (prompt.includes("total interest paid") || (prompt.includes("total interest") && prompt.includes("loan"))) {
    return `Total interest = total amount repaid − original loan = M × n − P. Multiply the repayment by the number of months, then subtract P to get ${answer}.`;
  }
  if (prompt.includes("total amount paid") || prompt.includes("total amount repaid")) {
    return `Total amount repaid = M × n. Multiply the monthly repayment by the number of periods to get ${answer}.`;
  }
  return `Read whether the balance is growing, shrinking, or changing by a regular payment before calculating. Following the stated financial process gives ${answer}.`;
}

function moneyAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseMoneyAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: financeFeedback(prompt, latex, answer),
  };
}

// Returns safe numeric formatting equivalents: integer "7" → ["7.0"],
// decimal "1.042" → ["1.0420"], "0.92" → ["0.920"]. Returns [] for
// answers containing %, letters, or other non-numeric characters.
function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^-?\d+$/.test(t)) return [`${t}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

function financeShortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseFinanceShortAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]),
    explanation: financeFeedback(prompt, latex, answer),
  };
}

export function year12Standard2FinanceLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    (course.slug !== "year-12-standard-2" &&
      course.slug !== "year-12-standard-1") ||
    unit.slug !== "investments-loans-annuities"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "investment-compound-interest") {
    return {
      ...base,
      description:
        "Calculate compound investment balances, interest earned, growth factors, and net returns after fees.",
      learningIntention:
        "Use compound interest to model investment balances and compare realistic savings options.",
      successCriteria: [
        "Identify principal, rate, compounding period, and time in an investment problem.",
        "Use a growth factor to calculate a compound interest balance.",
        "Find interest earned from final balance minus principal.",
        "Compare investment options using final balance, fees, and context.",
      ],
      teaching: {
        paragraphs: [
          "Compound interest means interest is added to the account balance, then future interest is calculated on the new balance. This is different from simple interest, where interest is calculated only on the original principal.",
          "For annual compounding, a yearly rate such as 4.2% becomes the growth factor 1.042. The balance after n years can be modelled by multiplying the principal by the growth factor n times.",
          "The final balance is not the same as the interest earned. Interest earned is the final balance minus the original principal.",
          "When comparing investment options, check fees and the time period. A higher advertised rate may not give the best net return if fees are large.",
        ],
        latexBlocks: [
          "A=P(1+r)^n",
          "\\text{interest earned}=A-P",
          "\\text{growth factor}=1+\\frac{\\text{rate}}{100}",
        ],
      },
      workedExamples: [
        {
          title: "Compound an investment over several years",
          questionLatex:
            "\\text{An account starts with }\\$2500\\text{ at }4.2\\%\\text{ p.a. compounded annually for 3 years.}",
          steps: [
            {
              explanation: "Write the growth factor for 4.2%.",
              latex: "1+0.042=1.042",
            },
            {
              explanation:
                "Apply the compound interest model for 3 annual compounding periods.",
              latex: "A=2500(1.042)^3=2828.415\\ldots",
            },
            {
              explanation: "Round the balance to the nearest cent.",
            },
          ],
          finalAnswerLatex: "\\$2828.42",
        },
        {
          title: "Find interest earned",
          questionLatex:
            "\\text{A term deposit grows from }\\$3000\\text{ to }\\$3280.",
          steps: [
            {
              explanation:
                "Interest earned is the final balance minus the principal.",
              latex: "3280-3000=280",
            },
          ],
          finalAnswerLatex: "\\$280",
        },
        {
          title: "Compare two investment options",
          questionLatex:
            "\\begin{array}{c|c|c} \\text{Option} & \\text{Rate} & \\text{Fee}\\\\" +
            "A&3.5\\%&\\$0\\\\ B&3.0\\%&\\$40\\text{ at end} \\end{array}\\quad P=\\$4000,\\ n=2",
          steps: [
            {
              explanation: "Calculate Option A's final balance.",
              latex: "4000(1.035)^2=4284.90",
            },
            {
              explanation: "Calculate Option B's final balance after the fee.",
              latex: "4000(1.03)^2-40=4203.60",
            },
          ],
          finalAnswerLatex: "\\text{Option A gives the higher net balance.}",
        },
      ],
      guidedPractice: [
        moneyAnswer("y12s2-invest-g1", "An investment of 2000 dollars earns 5% p.a. compounded annually for 2 years. What is the final balance?", "A=P(1+r)^n,\\quad P=\\$2000,\\quad r=5\\%,\\quad n=2", "2205"),
        financeShortAnswer("y12s2-invest-g2", "A bank rate is 4.2% p.a. Write the annual growth factor.", "\\text{annual rate}=4.2\\%", "1.042"),
        moneyAnswer("y12s2-invest-g3", "A savings account grows from 1800 dollars to 1968 dollars. How much interest was earned?", "\\text{final balance}=\\$1968,\\quad \\text{principal}=\\$1800", "168"),
        financeChoice("y12s2-invest-g4", "An investment option has a higher rate but a 60 dollar yearly fee. What should be compared?", "B", ["Only the advertised rate", "The final balance after fees", "Only the first deposit", "The loan repayment amount"], "A fair comparison uses net balance after fees."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-invest-i1", "A term deposit of 1500 dollars earns 3% p.a. compounded annually for 3 years. Find the balance to the nearest cent.", "A=P(1+r)^n,\\quad P=\\$1500,\\quad r=3\\%,\\quad n=3", "1639.09"),
        moneyAnswer("y12s2-invest-i2", "A 4200 dollar investment has a final balance of 4594.80 dollars. Find the interest earned.", "\\text{final balance}=\\$4594.80,\\quad \\text{principal}=\\$4200", "394.80", ["394.8", "$394.8"]),
        financeShortAnswer("y12s2-invest-i3", "A growth factor is 1.065. What annual percentage rate does this represent?", "\\text{growth factor}=1.065", "6.5%", ["6.5", "0.065"]),
        financeChoice("y12s2-invest-i4", "Which calculation correctly models 2800 dollars at 4% p.a. compounded annually for 5 years?", "A", ["2800(1.04)^5", "2800(4)^5", "2800+0.04+5", "2800(0.04)^5"], "The growth factor is 1.04 and the exponent is the number of years."),
        moneyAnswer("y12s2-invest-i5", "Option A returns 3060 dollars. Option B returns 3105 dollars but has a 50 dollar fee. What is Option B's net return?", "\\text{Option B return}=\\$3105,\\quad \\text{fee}=\\$50", "3055"),
      ],
      commonMistakes: [
        { mistake: "Using 4.2 instead of 0.042 for a percentage rate.", fix: "Divide the percentage by 100 before forming the growth factor." },
        { mistake: "Using simple interest when the question says compounded.", fix: "Use repeated multiplication or A = P(1 + r)^n." },
        { mistake: "Reporting the final balance when asked for interest earned.", fix: "Subtract the principal from the final balance." },
        { mistake: "Ignoring fees when comparing products.", fix: "Compare the net amount after fees and charges." },
      ],
      masteryQuiz: [
        financeShortAnswer("y12s2-invest-m1", "A savings rate is 3.8% p.a. Write the annual growth factor.", "r=3.8\\%\\text{ p.a.}", "1.038"),
        moneyAnswer("y12s2-invest-m2", "A 1000 dollar account earns 6% p.a. compounded annually for 2 years. Find the balance.", "A=P(1+r)^n", "1123.60", ["1123.6", "$1123.6"]),
        moneyAnswer("y12s2-invest-m3", "A 2500 dollar investment earns 4% p.a. compounded annually for 3 years. Find the balance to the nearest cent.", "A=P(1+r)^n", "2812.16"),
        moneyAnswer("y12s2-invest-m4", "An account grows from 5000 dollars to 5460 dollars. Find the interest earned.", "\\text{initial}=\\$5000,\\quad \\text{final}=\\$5460", "460"),
        financeChoice("y12s2-invest-m5", "Which expression models 3500 dollars at 2.5% p.a. compounded annually for 4 years?", "C", ["3500(2.5)^4", "3500(0.025)^4", "3500(1.025)^4", "3500+1.025+4"], "The growth factor is 1.025."),
        moneyAnswer("y12s2-invest-m6", "A 6000 dollar investment at 3% p.a. compounded annually is worth what after 1 year?", "A=P(1+r)^n", "6180"),
        financeShortAnswer("y12s2-invest-m7", "A growth factor of 1.09 represents what percentage growth?", "\\text{growth factor}=1.09", "9%", ["9", "0.09"]),
        financeChoice("y12s2-invest-m8", "Option A returns 4320 dollars. Option B returns 4390 dollars but has a 90 dollar fee. Which option gives the higher net balance?", "A", ["Option A", "Option B", "They are equal", "The fee should be ignored"], "Option B's fee reduces its net balance, so Option A is higher."),
        financeChoice("y12s2-invest-m9", "Which setup is valid for 2500 dollars invested at 4.2% p.a. compounded annually for 3 years?", "B", ["A=2500(0.042)^3", "A=2500(1.042)^3", "A=2500+4.2+3", "A=2500(4.2)^3"], "Compound growth uses 1 plus the decimal rate as the growth factor."),
        financeChoice("y12s2-invest-m10", "An investment grows from 5000 dollars to 5360 dollars. What information is still needed to judge whether it is better than another investment?", "C", ["Only the starting balance", "Only the final balance", "The other option's net balance over the same term", "The account name"], "A fair comparison needs the net balances over the same time period."),
      ],
    };
  }

  if (lesson.slug === "depreciation-loans") {
    return {
      ...base,
      description:
        "Model repeated depreciation and loan balances using decay factors, repayments, and recurrence relations.",
      learningIntention:
        "Use depreciation and loan recurrence models to calculate balances and interpret whether debt is reducing.",
      successCriteria: [
        "Use a decay factor for repeated percentage depreciation.",
        "Calculate the depreciated value of an asset over time.",
        "Apply a loan balance recurrence in the correct order.",
        "Judge whether repayments are large enough to reduce a loan balance.",
      ],
      teaching: {
        paragraphs: [
          "Depreciation is a repeated percentage decrease in the value of an asset, such as a car, laptop, or piece of equipment. A depreciation rate of 12% uses the decay factor 0.88.",
          "Loans often use recurrence relations because each period follows the same process: interest is applied to the current balance, then a repayment is subtracted if the recurrence says so.",
          "The order in a recurrence matters. In the loan recurrence below, interest is applied first, then the 450 dollar repayment is subtracted.",
          "A repayment reduces the loan only if it is larger than the interest added for that period. Otherwise, the balance may stay similar or increase.",
        ],
        latexBlocks: [
          "V=P(1-r)^n",
          "B_{n+1}=1.006B_n-450",
          "\\text{new balance}=\\text{balance after interest}-\\text{repayment}",
        ],
      },
      workedExamples: [
        {
          title: "Depreciate a car value",
          questionLatex:
            "\\text{A car worth }\\$18000\\text{ depreciates by }12\\%\\text{ p.a. for 2 years.}",
          steps: [
            {
              explanation: "The decay factor for a 12% decrease is 0.88.",
              latex: "1-0.12=0.88",
            },
            {
              explanation: "Apply the factor for two years.",
              latex: "V=18000(0.88)^2=13939.20",
            },
          ],
          finalAnswerLatex: "\\$13939.20",
        },
        {
          title: "Use a loan recurrence",
          questionLatex:
            "B_{n+1}=1.006B_n-450,\\quad B_0=28000",
          steps: [
            {
              explanation:
                "Substitute the starting balance into the recurrence.",
              latex: "B_1=1.006(28000)-450",
            },
            {
              explanation:
                "Calculate the balance after interest and repayment.",
              latex: "B_1=28168-450=27718",
            },
          ],
          finalAnswerLatex: "B_1=\\$27718",
        },
        {
          title: "Check whether a repayment reduces a balance",
          questionLatex:
            "\\text{A loan of }\\$10000\\text{ has monthly interest }\\$80\\text{ and repayment }\\$250.",
          steps: [
            {
              explanation:
                "The repayment is larger than the interest added.",
              latex: "250>80",
            },
            {
              explanation:
                "So the balance decreases during that month.",
            },
          ],
          finalAnswerLatex: "\\text{The loan balance decreases.}",
        },
      ],
      guidedPractice: [
        financeShortAnswer("y12s2-loan-g1", "A laptop depreciates by 20% per year. What is the decay factor?", "\\text{depreciation rate}=20\\%", "0.8", ["0.80"]),
        moneyAnswer("y12s2-loan-g2", "A phone worth 1200 dollars depreciates by 15% in one year. What is its value after one year?", "V=P(1-r)^n,\\quad P=\\$1200,\\quad r=15\\%,\\quad n=1", "1020"),
        moneyAnswer("y12s2-loan-g3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.01B_n-300,\\quad B_0=5000", "4750"),
        financeChoice("y12s2-loan-g4", "A monthly loan adds 90 dollars interest and the repayment is 75 dollars. What happens to the balance?", "C", ["It decreases by 75 dollars", "It becomes zero", "It increases by 15 dollars", "It must be a depreciation model"], "The interest added is larger than the repayment."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-loan-i1", "A ute worth 24000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "V=P(1-r)^n,\\quad P=\\$24000,\\quad r=10\\%,\\quad n=2", "19440"),
        financeShortAnswer("y12s2-loan-i2", "A device depreciates by 8% p.a. What decay factor should be used?", "\\text{depreciation rate}=8\\%", "0.92"),
        moneyAnswer("y12s2-loan-i3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.005B_n-400,\\quad B_0=18000", "17690"),
        moneyAnswer("y12s2-loan-i4", "Use the loan recurrence and current balance shown to find the next balance to the nearest cent.", "B_{n+1}=1.006B_n-450,\\quad B_1=27718", "27434.31"),
        financeChoice("y12s2-loan-i5", "In the displayed loan recurrence, which happens first?", "A", ["Interest is applied to the balance", "The loan is paid off", "The repayment is doubled", "Depreciation is added"], "The recurrence multiplies by 1.006 before subtracting 450.", "B_{n+1}=1.006B_n-450"),
      ],
      commonMistakes: [
        { mistake: "Adding depreciation instead of subtracting it.", fix: "Use a decay factor less than 1 for depreciation." },
        { mistake: "Using 12 instead of 0.12 for a 12% rate.", fix: "Convert percentages to decimals before calculating." },
        { mistake: "Applying repayment before interest when the recurrence says interest first.", fix: "Follow the written order in the recurrence relation." },
        { mistake: "Assuming every repayment reduces the loan.", fix: "Compare the repayment with the interest added for the period." },
      ],
      masteryQuiz: [
        financeShortAnswer("y12s2-loan-m1", "A car depreciates by 12% p.a. What is the decay factor?", "\\text{depreciation rate}=12\\%\\text{ p.a.}", "0.88"),
        moneyAnswer("y12s2-loan-m2", "A bike worth 900 dollars depreciates by 10% in one year. Find its value after one year.", "V=P(1-r)^n", "810"),
        moneyAnswer("y12s2-loan-m3", "A car worth 18000 dollars depreciates by 12% p.a. for 2 years. Find its value.", "V=P(1-r)^n", "13939.20", ["13939.2", "$13939.2"]),
        moneyAnswer("y12s2-loan-m4", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.006B_n-450,\\quad B_0=28000", "27718"),
        financeChoice("y12s2-loan-m5", "In the displayed loan recurrence, what does the subtracted amount represent?", "B", ["Interest", "A repayment", "Depreciation", "A fee added"], "The subtraction represents a repayment.", "B_{n+1}=1.01B_n-500"),
        moneyAnswer("y12s2-loan-m6", "A camera worth 1500 dollars depreciates by 25% in one year. Find its value.", "V=P(1-r)^n", "1125"),
        financeChoice("y12s2-loan-m7", "A repayment is 300 dollars and monthly interest added is 260 dollars. The balance:", "A", ["Decreases by 40 dollars", "Increases by 40 dollars", "Does not change", "Depreciates by 300%"], "Repayment exceeds interest by 40 dollars."),
        moneyAnswer("y12s2-loan-m8", "A loan follows the recurrence shown and the next balance is 11798 dollars. Find the starting balance.", "B_{n+1}=1.004B_n-250", "12000", ["$12000", "12,000", "$12,000"]),
        financeChoice("y12s2-loan-m9", "Which recurrence models a 16000 dollar asset depreciating by 7% each year?", "D", ["V_{n+1}=1.07V_n,\\ V_0=16000", "V_{n+1}=7V_n,\\ V_0=16000", "V_{n+1}=0.07V_n,\\ V_0=16000", "V_{n+1}=0.93V_n,\\ V_0=16000"], "Depreciation by 7% leaves 93% of the value each year."),
        financeChoice("y12s2-loan-m10", "A loan balance goes from 12000 dollars to 12080 dollars after a repayment. Which conclusion is most reasonable?", "C", ["The repayment was too large", "The loan is fully paid off", "Interest and fees outweighed the repayment", "The asset is depreciating"], "If the balance rises after a repayment, the added interest or fees were larger than the repayment."),
      ],
    };
  }

  if (lesson.slug === "annuities-regular-payments") {
    return {
      ...base,
      description:
        "Use recurrence and table methods for regular deposits, annuities, future value, and repayment schedules.",
      learningIntention:
        "Model regular deposits and repayments using annuity ideas, recurrence relations, and short balance tables.",
      successCriteria: [
        "Recognise an annuity as regular payments or deposits over time.",
        "Use a recurrence/table to update a savings balance with interest and deposits.",
        "Interpret loan repayment tables in context.",
        "Compare regular deposit plans using final balances or total contributions.",
      ],
      teaching: {
        paragraphs: [
          "An annuity involves equal regular payments. In Year 12 Standard 2, this can include regular deposits into an investment or regular repayments on a loan.",
          "A regular savings recurrence often adds interest to the current balance and then adds a deposit. A loan recurrence often adds interest and then subtracts a repayment.",
          "A table method is useful because each row follows the same rule. Keep the period, starting balance, interest, payment, and final balance clear.",
          "When comparing regular deposit plans, compare the final balance over the same time period and check whether deposits, fees, or interest rates are different.",
        ],
        latexBlocks: [
          "S_{n+1}=1.004S_n+200",
          "B_{n+1}=1.006B_n-450",
          "\\text{future value}=\\text{balance after regular deposits and interest}",
        ],
      },
      workedExamples: [
        {
          title: "Use a regular savings recurrence",
          questionLatex:
            "S_{n+1}=1.005S_n+200,\\quad S_0=1000",
          steps: [
            {
              explanation:
                "Apply the monthly interest factor and then add the deposit.",
              latex: "S_1=1.005(1000)+200=1205",
            },
            {
              explanation: "Repeat the same process for the second month.",
              latex: "S_2=1.005(1205)+200=1411.025",
            },
          ],
          finalAnswerLatex: "S_2=\\$1411.03",
        },
        {
          title: "Calculate a balance after regular deposits",
          questionLatex:
            "\\text{Start with }\\$0\\text{ and deposit }\\$500\\text{ at the end of each year. Interest is }4\\%\\text{ p.a.}",
          steps: [
            {
              explanation: "After the first deposit, the balance is 500 dollars.",
              latex: "S_1=500",
            },
            {
              explanation:
                "After one year of interest and another deposit, update the balance.",
              latex: "S_2=500(1.04)+500=1020",
            },
          ],
          finalAnswerLatex: "\\$1020",
        },
        {
          title: "Interpret a loan repayment table",
          questionLatex:
            "\\begin{array}{c|c} \\text{Month} & \\text{Balance after repayment}\\\\" +
            "0&\\$10000\\\\ 1&\\$9620\\\\ 2&\\$9238 \\end{array}",
          steps: [
            {
              explanation:
                "The balance is decreasing each month after the repayments.",
            },
            {
              explanation:
                "This suggests the repayment is more than the monthly interest added.",
            },
          ],
          finalAnswerLatex: "\\text{The repayment schedule is reducing the loan.}",
        },
      ],
      guidedPractice: [
        moneyAnswer("y12s2-ann-g1", "A savings plan follows the recurrence shown. Use the starting balance to find the next balance.", "S_{n+1}=1.01S_n+100,\\quad S_0=500", "605"),
        moneyAnswer("y12s2-ann-g2", "An account has 1200 dollars and earns 0.5% for the month before a 200 dollar deposit. Find the new balance.", "S_{n+1}=1.005S_n+200,\\quad S_0=1200", "1406"),
        financeChoice("y12s2-ann-g3", "A regular deposit plan is an example of:", "A", ["An annuity", "A one-off simple interest calculation", "A shortest path", "A tax deduction"], "An annuity involves regular payments or deposits."),
        financeChoice("y12s2-ann-g4", "A loan repayment table shows balances 8000, 7700, 7395. What is happening?", "B", ["The loan is increasing", "The loan is decreasing", "The balance is unchanged", "The account is a weighted network"], "The balance is lower after each repayment."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-ann-i1", "A regular savings account follows the recurrence shown. Use the starting balance to find the next balance.", "S_{n+1}=1.004S_n+150,\\quad S_0=2000", "2158"),
        moneyAnswer("y12s2-ann-i2", "Use the savings recurrence and current balance shown to find the next balance to the nearest cent.", "S_{n+1}=1.004S_n+150,\\quad S_1=2158", "2316.63"),
        moneyAnswer("y12s2-ann-i3", "A student deposits 250 dollars at the end of each year. After the first deposit, interest is 3% before the second deposit. Find the balance after the second deposit.", "\\text{deposit}=\\$250,\\quad r=3\\%,\\quad \\text{second deposit after interest}", "507.50", ["507.5", "$507.5"]),
        financeChoice("y12s2-ann-i4", "The displayed loan recurrence models which situation?", "C", ["Regular deposits into savings", "Depreciation of a car", "Monthly interest followed by a repayment", "A one-way road network"], "The balance grows by interest, then repayment is subtracted.", "B_{n+1}=1.005B_n-600"),
        financeChoice("y12s2-ann-i5", "Plan A deposits 100 dollars monthly. Plan B deposits 120 dollars monthly but charges 15 dollars monthly. What should be compared?", "D", ["Only the larger deposit", "Only the interest symbol", "Only month 1", "Final balances after deposits, interest, and fees"], "A fair comparison includes deposits, interest, fees, and time."),
      ],
      commonMistakes: [
        { mistake: "Treating regular payments as one single deposit.", fix: "Update the balance once for each payment period." },
        { mistake: "Forgetting interest before adding a deposit in the recurrence.", fix: "Follow the recurrence order exactly." },
        { mistake: "Confusing a savings recurrence with a loan recurrence.", fix: "Deposits are usually added; loan repayments are usually subtracted." },
        { mistake: "Comparing deposit size without checking fees and interest.", fix: "Compare final balances over the same time period." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-ann-m1", "A plan with equal monthly deposits is best described as:", "A", ["An annuity", "Depreciation only", "A circuit", "A box plot"], "Regular deposits are an annuity-style situation."),
        moneyAnswer("y12s2-ann-m2", "A savings recurrence is shown. Use the starting balance to find the next balance.", "S_{n+1}=1.005S_n+200,\\quad S_0=1000", "1205"),
        moneyAnswer("y12s2-ann-m3", "Use the savings recurrence and current balance shown to find the next balance to the nearest cent.", "S_{n+1}=1.005S_n+200,\\quad S_1=1205", "1411.03"),
        moneyAnswer("y12s2-ann-m4", "A saver deposits 400 dollars at the end of each year. After the first deposit earns 5%, a second deposit is made. Find the balance after the second deposit.", "S_{n+1}=(1+r)S_n+d", "820"),
        financeChoice("y12s2-ann-m5", "In the displayed loan recurrence, what does the subtracted amount represent?", "B", ["A regular deposit", "A regular repayment", "A growth factor", "A fee charged twice"], "It is subtracted, so it represents a repayment.", "B_{n+1}=1.006B_n-450"),
        financeChoice("y12s2-ann-m6", "A repayment table shows balances 12000, 11850, 11702. The loan is:", "C", ["Increasing quickly", "Unchanged", "Decreasing", "Compounding as an investment"], "The listed balance decreases each period."),
        moneyAnswer("y12s2-ann-m7", "A savings account has 900 dollars. It earns 1% interest then receives a 100 dollar deposit. Find the new balance.", "S_{n+1}=(1+r)S_n+d", "1009"),
        financeChoice("y12s2-ann-m8", "Which recurrence matches a savings account that earns 0.5% interest each month and then receives a 200 dollar deposit?", "B", ["S_{n+1}=0.995S_n+200", "S_{n+1}=1.005S_n+200", "S_{n+1}=1.005S_n-200", "S_{n+1}=200S_n+1.005"], "Interest increases the balance first, and the deposit is added."),
        moneyAnswer("y12s2-ann-m9", "A savings recurrence is shown. If the next balance is 1411.03 dollars, find the previous balance to the nearest cent.", "S_{n+1}=1.005S_n+200", "1205.00", ["1205", "$1205", "$1205.00", "1,205.00", "$1,205.00", "1205.01", "$1205.01"]),
        financeChoice("y12s2-ann-m10", "Plan A deposits 100 dollars monthly. Plan B deposits 120 dollars monthly but charges a 15 dollar monthly fee. What should be compared?", "D", ["Only the larger deposit", "Only the first month", "Only the interest symbol", "Final balances after deposits, interest, and fees"], "A fair comparison includes the regular deposits, interest, fees, and term."),
      ],
    };
  }

  if (lesson.slug === "comparing-investments-risk-return") {
    return {
      ...base,
      description:
        "Compare investment options by effective return, identify how inflation reduces purchasing power, and use future value formulas to evaluate lump-sum alternatives.",
      learningIntention:
        "Evaluate and compare investment options using net return, effective interest rates, and inflation-adjusted thinking.",
      successCriteria: [
        "Calculate the net return after fees for an investment using A − P − fees.",
        "Compare two investment options over the same term using final balances.",
        "Explain how inflation reduces the purchasing power of savings.",
        "Identify which investment option provides the better outcome in a given context.",
      ],
      teaching: {
        paragraphs: [
          "When comparing investments, always use the same time period and include fees. A higher interest rate does not automatically mean a better outcome if fees are large.",
          "Net return = final balance − initial principal − fees paid. This is the real gain from the investment.",
          "Inflation means that money loses purchasing power over time. If your investment earns 3% but inflation is 4%, the real return is negative — you can buy less next year than this year.",
          "Effective annual rate accounts for compounding within the year. More frequent compounding (monthly vs annually) gives a slightly higher effective rate.",
        ],
        latexBlocks: [
          "\\text{Net return}=A-P-\\text{fees}",
          "A=P\\left(1+\\frac{r}{k}\\right)^{kn}\\;(k=\\text{compoundings/year})",
          "\\text{Real return}\\approx\\text{nominal rate}-\\text{inflation rate}",
        ],
      },
      workedExamples: [
        {
          title: "Compare two investments by net return",
          questionLatex:
            "\\text{Option A: }\\$5000\\text{ at }6\\%\\text{ p.a. for 2 yr, no fee.}\\;\\text{Option B: }\\$5000\\text{ at }7\\%\\text{ for 2 yr, }\\$120\\text{ fee.}",
          steps: [
            {
              explanation: "Option A: A = 5000(1.06)² = 5618.",
              latex: "A_A=5000(1.06)^2=5618.00",
            },
            {
              explanation: "Option B: A = 5000(1.07)² − 120.",
              latex: "A_B=5000(1.07)^2-120=5724.50-120=5604.50",
            },
            {
              explanation: "Option A gives a higher net balance.",
              latex: "5618.00>5604.50\\;\\Rightarrow\\;\\text{Option A}",
            },
          ],
          finalAnswerLatex: "\\text{Option A is better by }\\$13.50.",
        },
        {
          title: "Effect of inflation on savings",
          questionLatex:
            "\\text{An account earns }2\\%\\text{ p.a. Inflation is }3\\%\\text{ p.a. What is the real return?}",
          steps: [
            {
              explanation: "Real return ≈ nominal − inflation.",
              latex: "2\\%-3\\%=-1\\%",
            },
            {
              explanation: "A negative real return means purchasing power decreases.",
              latex: "\\text{You can buy less next year than this year.}",
            },
          ],
          finalAnswerLatex: "\\text{Real return is }−1\\%;\\text{ savings lose value in real terms.}",
        },
      ],
      guidedPractice: [
        moneyAnswer("y12s2-inv-g1", "An investment of 4000 dollars earns 5% p.a. compounded annually for 2 years. Find the balance.", "A=4000(1.05)^2", "4410"),
        moneyAnswer("y12s2-inv-g2", "A second option earns 6% for 2 years but charges a 90 dollar fee. Find the net balance starting from 4000 dollars.", "A=4000(1.06)^2-90", "4404.40", ["4404.4", "$4404.40"]),
        financeChoice("y12s2-inv-g3", "Which option above is better?", "A", ["Option 1 at 5% (balance $4410)", "Option 2 at 6% after fee (balance $4404.40)", "They are equal", "The higher rate is always better"], "After subtracting the fee, Option 1 gives a higher net balance."),
        financeChoice("y12s2-inv-g4", "Inflation of 4% and a savings rate of 2% gives a real return of:", "C", ["6%", "2%", "−2%", "4%"], "Real return ≈ 2% − 4% = −2%. The savings lose purchasing power."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-inv-i1", "Find the balance when 6000 dollars is invested at 4.5% p.a. compounded annually for 3 years.", "A=6000(1.045)^3", "6843.79", ["6843.8", "$6843.79"]),
        moneyAnswer("y12s2-inv-i2", "A competing option pays 5% for 3 years but charges a 150 dollar fee. Find the net balance from 6000 dollars.", "A=6000(1.05)^3-150", "6795.75", ["6795.8", "$6795.75"]),
        financeChoice("y12s2-inv-i3", "Which option from i1 and i2 is better?", "A", ["4.5% with no fee (higher net balance)", "5% minus fee (higher rate wins)", "They are equal", "Always choose the higher rate"], "4.5% with no fee gives a higher net balance here."),
        financeChoice("y12s2-inv-i4", "If inflation rises from 2% to 4% and your savings rate stays at 3%, your real return:", "C", ["Increases to 7%", "Stays at 3%", "Falls and becomes negative at −1%", "Falls to 1%"], "Real return = 3% − 4% = −1%."),
        moneyAnswer("y12s2-inv-i5", "An account of 10000 dollars earns 2% compounded annually for 1 year. If inflation is 3%, what is the real value of the account after one year in today's dollars?", "\\text{Balance}=10200;\\;\\text{real value}=\\frac{10200}{1.03}", "9903", ["$9903", "9903.00"]),
      ],
      commonMistakes: [
        { mistake: "Comparing investments by advertised rate only.", fix: "Always compute net balance after fees over the same term." },
        { mistake: "Confusing inflation rate with interest rate.", fix: "Real return = interest rate − inflation rate. These are different quantities." },
        { mistake: "Treating nominal and effective rates as identical.", fix: "More frequent compounding gives a slightly higher effective rate than the nominal rate." },
        { mistake: "Forgetting to subtract the fee when finding net return.", fix: "Net return = A − P − fees. Fees reduce the benefit of a higher rate." },
      ],
      masteryQuiz: [
        moneyAnswer("y12s2-inv-m1", "Find A for 8000 dollars at 3% p.a. compounded annually for 2 years.", "A=8000(1.03)^2", "8487.20", ["8487.2", "$8487.20"]),
        moneyAnswer("y12s2-inv-m2", "Option B gives 8000 dollars at 4% for 2 years with a 110 dollar fee. Find the net balance.", "A=8000(1.04)^2-110", "8539.52", ["8539.5", "$8539.52"]),
        financeChoice("y12s2-inv-m3", "Comparing Option A ($8487.20) and Option B ($8539.52), which is better?", "B", ["Option A", "Option B", "Equal", "Need more information"], "Option B's net balance is higher."),
        financeChoice("y12s2-inv-m4", "A real return of −1% means:", "C", ["You earn 1% more than inflation", "You earn exactly 1%", "Your purchasing power decreases by approximately 1%", "You lose 1% in dollar terms"], "Negative real return means less purchasing power, not less actual dollars."),
        moneyAnswer("y12s2-inv-m5", "Net return for a 5000 dollar investment growing to 5400 dollars with a 50 dollar fee.", "\\text{Net return}=5400-5000-50", "350", ["$350"]),
        financeChoice("y12s2-inv-m6", "Two accounts both have no fees. Account A earns 4% compounded annually; Account B earns 4% compounded monthly. Which is better?", "B", ["Account A", "Account B", "They are identical", "Cannot compare"], "Monthly compounding gives a slightly higher effective annual rate."),
        moneyAnswer("y12s2-inv-m7", "6000 dollars invested at 5% p.a. for 1 year compounded annually. Find the interest earned.", "\\text{interest}=6000\\times0.05", "300", ["$300"]),
        financeChoice("y12s2-inv-m8", "Savings earn 4% but inflation is 4%. The real return is:", "D", ["4%", "8%", "−4%", "0%"], "Real return ≈ 4% − 4% = 0%. No real gain."),
        moneyAnswer("y12s2-inv-m9", "An investment of 2000 dollars at 6% for 3 years compounded annually. Find the balance to the nearest cent.", "A=2000(1.06)^3", "2382.03", ["$2382.03", "2382.0"]),
        financeChoice("y12s2-inv-m10", "The best comparison of two investment options always involves:", "D", ["Only the advertised rate", "Only the fee", "Only the first month", "Final balance after the same term and after all fees"], "A complete comparison uses net balance over the same period."),
      ],
    };
  }

  if (lesson.slug === "credit-cards-consumer-decisions") {
    return {
      ...base,
      description:
        "Calculate monthly credit-card interest, find the total cost of a purchase paid over time, and compare buy-now-pay-later options with saving-first alternatives.",
      learningIntention:
        "Apply interest calculations to credit card balances and evaluate the true cost of consumer credit decisions.",
      successCriteria: [
        "Calculate monthly interest on a credit card balance using I = P × (r/12).",
        "Find the total repayment cost including interest over a set number of months.",
        "Identify the interest-free period and its effect on credit card use.",
        "Compare BNPL (buy now pay later) instalments with saving-first alternatives.",
      ],
      teaching: {
        paragraphs: [
          "Credit cards charge interest on the outstanding balance. Interest is usually stated as an annual rate but charged monthly: monthly interest = balance × (r/12).",
          "If you pay the full balance within the interest-free period (often 55 days), no interest is charged. Carrying a balance beyond that period triggers the monthly interest.",
          "Total cost of a credit purchase = sum of all repayments, including interest. This is always more than the purchase price if you carry a balance.",
          "Buy now pay later (BNPL) splits the cost into equal instalments (often 4) with no explicit interest, but late fees apply. Compare this with saving first: if you save the instalments, you earn interest instead of paying it.",
        ],
        latexBlocks: [
          "I=P\\times\\frac{r}{12}\\;(\\text{monthly interest})",
          "\\text{Total cost}=\\text{repayments}\\times n",
          "\\text{BNPL instalment}=\\frac{\\text{total price}}{4}",
        ],
      },
      workedExamples: [
        {
          title: "Monthly credit card interest",
          questionLatex:
            "\\text{Balance }\\$800,\\text{ annual rate }18\\%.\\text{ Find monthly interest.}",
          steps: [
            {
              explanation: "Monthly rate = 18%/12 = 1.5%.",
              latex: "r_{\\text{monthly}}=0.18/12=0.015",
            },
            {
              explanation: "Monthly interest = 800 × 0.015.",
              latex: "I=800\\times0.015=12",
            },
          ],
          finalAnswerLatex: "I=\\$12\\text{ per month}",
        },
        {
          title: "Compare BNPL and saving first",
          questionLatex:
            "\\text{A }\\$400\\text{ purchase: BNPL in 4 equal fortnights, or save }\\$100\\text{ per fortnight at }2\\%\\text{ p.a.}",
          steps: [
            {
              explanation: "BNPL instalment = 400/4 = $100 per fortnight. Total cost = $400 (no fee if paid on time).",
              latex: "\\text{BNPL total}=\\$400",
            },
            {
              explanation: "Saving $100 per fortnight for 4 fortnights earns small interest. Total saved ≈ $400 + a few cents interest.",
              latex: "\\text{Saving total cost}\\le\\$400",
            },
            {
              explanation: "Saving first costs the same or slightly less AND avoids late fees.",
              latex: "\\text{Saving first is the better option.}",
            },
          ],
          finalAnswerLatex: "\\text{Saving first: same cost, no late-fee risk.}",
        },
      ],
      guidedPractice: [
        moneyAnswer("y12s2-credit-g1", "A credit card balance of 600 dollars has an annual interest rate of 18%. Find the monthly interest charge.", "I=600\\times(0.18/12)", "9", ["$9", "9.00"]),
        moneyAnswer("y12s2-credit-g2", "A BNPL purchase of 320 dollars is split into 4 equal fortnightly payments. Find each payment.", "\\text{instalment}=320/4", "80", ["$80", "80.00"]),
        financeChoice("y12s2-credit-g3", "A credit card with a 55-day interest-free period means:", "B", ["Interest always applies", "No interest if the full balance is paid within 55 days", "The rate is 55%", "You must wait 55 days to use it"], "Paying the full balance in the interest-free period avoids interest charges."),
        financeChoice("y12s2-credit-g4", "Total repayment on a credit card is always:", "B", ["Equal to the purchase price", "Greater than or equal to the purchase price", "Less than the purchase price", "Fixed regardless of interest rate"], "Interest adds to the total, so total repayment ≥ purchase price."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-credit-i1", "A card balance of 1200 dollars has an annual rate of 21%. Find the monthly interest.", "I=1200\\times(0.21/12)", "21", ["$21", "21.00"]),
        moneyAnswer("y12s2-credit-i2", "After paying a 200 dollar repayment, the new card balance is 1021 dollars before this month's interest. How did we get there?", "\\text{balance}=1200+21-200", "1021", ["$1021"]),
        moneyAnswer("y12s2-credit-i3", "A BNPL service charges $0 interest but a $10 late fee per missed payment. If 2 payments are missed on a $400 purchase, find the total cost.", "\\text{total}=400+2\\times10", "420", ["$420"]),
        financeChoice("y12s2-credit-i4", "Carrying a credit card balance for 12 months at 18% p.a. means you pay approximately:", "B", ["No extra cost", "18% extra on the outstanding balance", "1% extra over 12 months", "12% extra on the original price"], "Monthly charges of 1.5% compound over 12 months, approximately 18% annually."),
        moneyAnswer("y12s2-credit-i5", "A 1000 dollar purchase on a card at 20% p.a. is repaid in full after 1 month. Find the total cost.", "I=1000\\times(0.20/12)", "1016.67", ["$1016.67", "1016.7"]),
      ],
      commonMistakes: [
        { mistake: "Using the annual rate directly instead of monthly rate.", fix: "Divide annual rate by 12 for monthly interest: I = P × (r/12)." },
        { mistake: "Thinking BNPL is always free.", fix: "BNPL has no explicit interest but may charge late fees. Compare the total cost including any penalties." },
        { mistake: "Confusing interest-free period with zero interest rate.", fix: "The interest-free period only applies if the full balance is paid on time. After the period, the full annual rate applies." },
        { mistake: "Forgetting that a credit balance compounds.", fix: "Each month, interest is added to the balance before the next month's interest is calculated." },
      ],
      masteryQuiz: [
        moneyAnswer("y12s2-credit-m1", "Find monthly interest on a 900 dollar balance at 18% p.a.", "I=900\\times(0.18/12)", "13.50", ["$13.50", "13.5"]),
        financeChoice("y12s2-credit-m2", "Monthly interest rate for a card at 24% p.a. is:", "A", ["2%", "24%", "12%", "0.24%"], "Monthly rate = 24/12 = 2%."),
        moneyAnswer("y12s2-credit-m3", "A 500 dollar BNPL purchase is split into 4 fortnightly payments. Find each payment.", "500/4", "125", ["$125"]),
        financeChoice("y12s2-credit-m4", "A credit card balance of 2000 dollars has a 20% annual rate. The monthly interest is:", "B", ["$400", "$33.33", "$20", "$200"], "Monthly interest = 2000 × (0.20/12) = 33.33."),
        moneyAnswer("y12s2-credit-m5", "New balance after starting at 2000 dollars, adding monthly interest (rate 20% p.a.), and paying 150 dollars.", "\\text{balance}=2000+33.33-150", "1883.33", ["$1883.33", "1883.3"]),
        financeChoice("y12s2-credit-m6", "The total cost of a 600 dollar purchase repaid monthly over 3 months with $5 interest per month is:", "C", ["$600", "$615", "$615", "$645"], "Total = 600 + 3 × 5 = 615. (Answer C is $615.)"),
        financeChoice("y12s2-credit-m7", "An interest-free period of 55 days means:", "A", ["No interest if full balance paid within 55 days", "No interest ever", "55% annual rate", "Interest starts after 55 months"], "Pay in full within 55 days to avoid interest."),
        moneyAnswer("y12s2-credit-m8", "A 240 dollar purchase on BNPL: 4 instalments of 60 dollars. What is the total paid?", "4\\times60", "240", ["$240"]),
        financeChoice("y12s2-credit-m9", "Comparing credit card and BNPL for the same purchase, the key advantage of BNPL (when paid on time) is:", "B", ["Higher interest", "No interest charged", "Longer interest-free period", "Lower purchase price"], "BNPL typically charges no interest if payments are made on time."),
        financeChoice("y12s2-credit-m10", "If you save 200 dollars per month for 4 months earning 3% p.a., you avoid credit card interest of 18% p.a. Saving first is better because:", "A", ["You earn interest instead of paying it", "You delay the purchase indefinitely", "You pay less each month", "Credit cards always charge more than 18%"], "Saving earns interest; credit cards charge it. Saving first is financially better."),
      ],
    };
  }

  if (lesson.slug === "present-value-annuities") {
    return {
      ...base,
      description:
        "Use the present value formula to find loan repayments from a lump-sum amount, calculate total interest paid, and compare loan options with different terms.",
      learningIntention:
        "Apply the PV annuity formula to find monthly repayments and total interest for a loan, and explain the trade-off between loan term, repayment size, and total interest.",
      successCriteria: [
        "Explain the difference between a present value annuity (loan) and a future value annuity (savings).",
        "Calculate the monthly repayment using M = P × r / (1 − (1+r)^(−n)).",
        "Find the total interest paid as M × n − P.",
        "Compare two loan options and explain the effect of a longer term.",
      ],
      teaching: {
        paragraphs: [
          "A present value annuity begins with a lump sum today — the loan — and a series of equal repayments gradually reduce the balance to zero. This is the opposite of a savings annuity, which builds up a balance from regular deposits.",
          "Each repayment covers the interest added that period plus a slice of the original principal. Early repayments mostly cover interest; later ones chip away more principal. The formula connects the loan amount P, periodic rate r, number of periods n, and repayment M.",
          "To find the monthly repayment M for a loan P at monthly rate r over n months, use the rearranged formula. For an annual rate of 6% compounded monthly, r = 0.06 ÷ 12 = 0.005.",
          "Once you have M, total amount repaid = M × n. Subtracting the original loan gives total interest = M × n − P. A longer loan term means lower monthly payments but higher total interest because interest accumulates over more periods.",
        ],
        latexBlocks: [
          "P = M\\times\\dfrac{1-(1+r)^{-n}}{r}",
          "M = \\dfrac{P\\times r}{1-(1+r)^{-n}}",
          "\\text{Total interest} = M\\times n - P",
          "r = \\dfrac{\\text{annual rate}}{12}\\quad(\\text{monthly compounding})",
        ],
      },
      workedExamples: [
        {
          title: "Find the monthly repayment",
          questionLatex:
            "\\text{A }\\$12\\,000\\text{ loan at }6\\%\\text{ p.a. monthly is repaid over }24\\text{ months. Find the monthly repayment.}",
          steps: [
            {
              explanation: "Identify the monthly rate and number of periods.",
              latex: "r = 0.06 \\div 12 = 0.005,\\quad n = 24,\\quad P = 12000",
            },
            {
              explanation: "Substitute into the repayment formula.",
              latex:
                "M = \\dfrac{12000 \\times 0.005}{1-(1.005)^{-24}} = \\dfrac{60}{1-0.8872} = \\dfrac{60}{0.1128}",
            },
            {
              explanation: "Calculate M to the nearest cent.",
              latex: "M \\approx \\$531.85",
            },
          ],
          finalAnswerLatex: "\\text{Monthly repayment} \\approx \\$531.85.",
        },
        {
          title: "Find total interest paid",
          questionLatex:
            "\\text{Using the repayment of }\\$531.85\\text{ over }24\\text{ months on a }\\$12\\,000\\text{ loan, find the total interest.}",
          steps: [
            {
              explanation: "Find total amount repaid.",
              latex: "531.85 \\times 24 = 12764.40",
            },
            {
              explanation: "Subtract the original loan to find interest.",
              latex: "12764.40 - 12000 = 764.40",
            },
          ],
          finalAnswerLatex: "\\text{Total interest paid} = \\$764.40.",
        },
        {
          title: "Compare loan terms",
          questionLatex:
            "\\text{Compare a }\\$10\\,000\\text{ loan at }6\\%\\text{ monthly over 24 months vs 48 months.}",
          steps: [
            {
              explanation: "24-month repayment (r = 0.005, n = 24).",
              latex:
                "M_{24} = \\dfrac{10000 \\times 0.005}{1-(1.005)^{-24}} \\approx \\$443.21",
            },
            {
              explanation: "48-month repayment (r = 0.005, n = 48).",
              latex:
                "M_{48} = \\dfrac{10000 \\times 0.005}{1-(1.005)^{-48}} \\approx \\$234.85",
            },
            {
              explanation: "Compare total interest.",
              latex:
                "\\text{24 months: }443.21\\times24-10000=\\$637.04\\quad\\text{48 months: }234.85\\times48-10000=\\$1272.80",
            },
          ],
          finalAnswerLatex:
            "\\text{Longer term lowers repayments but increases total interest.}",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y12s2-pv-g1",
          "A bank lends $15,000 and receives equal monthly repayments until the loan is paid off. This is modelled by:",
          "C",
          [
            "A future value annuity (savings accumulation)",
            "Compound interest on an investment",
            "A present value annuity (loan repayment)",
            "Straight-line depreciation",
          ],
          "A lump sum today repaid in equal instalments is a present value annuity."
        ),
        moneyAnswer(
          "y12s2-pv-g2",
          "A $12,000 loan at 6% p.a. compounded monthly is repaid over 24 months. Find the monthly repayment.",
          "M = \\dfrac{12000\\times0.005}{1-(1.005)^{-24}}",
          "531.85",
          ["$531.85", "531.85", "531.9", "$531.9"]
        ),
        moneyAnswer(
          "y12s2-pv-g3",
          "Using the repayment from the previous question ($531.85 per month for 24 months on a $12,000 loan), find the total interest paid.",
          "\\text{Total interest} = 531.85\\times24 - 12000",
          "764.40",
          ["$764.40", "764.40", "764.4", "$764.4"]
        ),
        financeChoice(
          "y12s2-pv-g4",
          "Increasing the loan term from 24 to 36 months (same rate and amount) will:",
          "C",
          [
            "Increase monthly repayments and decrease total interest",
            "Decrease monthly repayments and decrease total interest",
            "Decrease monthly repayments and increase total interest",
            "Leave both monthly repayments and total interest unchanged",
          ],
          "A longer term spreads repayments but interest accrues over more periods, so total interest increases."
        ),
      ],
      independentPractice: [
        financeChoice(
          "y12s2-pv-i1",
          "In the formula M = P × r / (1 − (1+r)^(−n)), what does r represent?",
          "C",
          [
            "The annual interest rate",
            "The total number of repayments",
            "The interest rate per compounding period",
            "The monthly repayment amount",
          ],
          "r is the rate per period. For 6% p.a. monthly, r = 0.06 ÷ 12 = 0.005."
        ),
        moneyAnswer(
          "y12s2-pv-i2",
          "A $15,000 loan at 6% p.a. compounded monthly is repaid over 36 months. Find the monthly repayment.",
          "M = \\dfrac{15000\\times0.005}{1-(1.005)^{-36}}",
          "456.33",
          ["$456.33", "456.33", "456.3", "$456.3"]
        ),
        moneyAnswer(
          "y12s2-pv-i3",
          "Using the repayment from the previous question ($456.33 per month for 36 months on a $15,000 loan), find the total interest paid.",
          "\\text{Total interest} = 456.33\\times36 - 15000",
          "1427.88",
          ["$1427.88", "1427.88", "1427.9", "$1,427.88"]
        ),
        financeChoice(
          "y12s2-pv-i4",
          "A $10,000 loan at 6% p.a. monthly over 24 months has repayments of $443.21. What is the total amount repaid?",
          "C",
          [
            "$443.21",
            "$10,000",
            "$10,637.04",
            "$10,000 × 24",
          ],
          "Total amount repaid = $443.21 × 24 = $10,637.04."
        ),
        financeChoice(
          "y12s2-pv-i5",
          "Which formula correctly gives the total interest paid on a loan?",
          "C",
          [
            "Total interest = P × r × n",
            "Total interest = M × n",
            "Total interest = M × n − P",
            "Total interest = P − M × n",
          ],
          "Total amount repaid is M × n. Subtracting the original loan P gives the interest component."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using the annual interest rate directly instead of the monthly rate.",
          fix: "For monthly compounding at 6% p.a., use r = 0.06 ÷ 12 = 0.005, not r = 0.06.",
        },
        {
          mistake: "Confusing present value (loan) with future value (savings) annuities.",
          fix: "PV starts with a lump sum and repayments reduce it to zero. FV starts at zero and regular deposits build it up.",
        },
        {
          mistake: "Taking M × n as the total interest instead of the total amount repaid.",
          fix: "M × n is the total amount repaid. Subtract the original loan P to find just the interest.",
        },
        {
          mistake: "Assuming a longer loan term always saves money.",
          fix: "A longer term lowers monthly repayments but increases total interest. Always compare both figures.",
        },
      ],
      masteryQuiz: [
        financeChoice(
          "y12s2-pv-m1",
          "A present value annuity is used to:",
          "B",
          [
            "Calculate future savings from regular deposits",
            "Find repayments that reduce a lump-sum loan to zero",
            "Depreciate an asset over multiple years",
            "Compound interest on a growing balance",
          ],
          "PV annuities model loan repayment: a lump sum now, repaid in equal instalments."
        ),
        financeChoice(
          "y12s2-pv-m2",
          "Which formula gives the regular repayment M for a loan P at periodic rate r over n periods?",
          "B",
          [
            "M = P × (1+r)^n",
            "M = P × r / (1 − (1+r)^(−n))",
            "M = P / n",
            "M = P × r × n",
          ],
          "M = Pr / (1 − (1+r)^(−n)) is the standard loan repayment formula."
        ),
        moneyAnswer(
          "y12s2-pv-m3",
          "Find the monthly repayment on a $10,000 loan at 6% p.a. compounded monthly over 24 months.",
          "M = \\dfrac{10000\\times0.005}{1-(1.005)^{-24}}",
          "443.21",
          ["$443.21", "443.21", "443.2", "$443.2"]
        ),
        moneyAnswer(
          "y12s2-pv-m4",
          "Using the repayment from the previous question ($443.21 per month for 24 months on a $10,000 loan), find the total interest paid.",
          "\\text{Total interest} = 443.21\\times24 - 10000",
          "637.04",
          ["$637.04", "637.04", "637.0", "$637.0"]
        ),
        moneyAnswer(
          "y12s2-pv-m5",
          "Find the monthly repayment on a $10,000 loan at 6% p.a. compounded monthly over 36 months.",
          "M = \\dfrac{10000\\times0.005}{1-(1.005)^{-36}}",
          "304.22",
          ["$304.22", "304.22", "304.2", "$304.2"]
        ),
        moneyAnswer(
          "y12s2-pv-m6",
          "Using the repayment from the previous question ($304.22 per month for 36 months on a $10,000 loan), find the total interest paid.",
          "\\text{Total interest} = 304.22\\times36 - 10000",
          "951.92",
          ["$951.92", "951.92", "951.9", "$951.9"]
        ),
        financeChoice(
          "y12s2-pv-m7",
          "A $10,000 loan at 6% p.a. monthly has M = $443.21 over 24 months and M = $304.22 over 36 months. What is the total amount repaid for the 36-month option?",
          "C",
          [
            "$304.22",
            "$10,000",
            "$10,951.92",
            "$10,304.22",
          ],
          "Total amount repaid = $304.22 × 36 = $10,951.92."
        ),
        financeChoice(
          "y12s2-pv-m8",
          "Compared to the 24-month loan, the 36-month loan on $10,000 at 6% p.a. has:",
          "B",
          [
            "Higher monthly repayments and lower total interest",
            "Lower monthly repayments and higher total interest",
            "The same monthly repayments",
            "Lower total interest because more time passes",
          ],
          "24-month interest = $637.04; 36-month interest = $951.92. Longer term = lower repayments, higher total interest."
        ),
        financeChoice(
          "y12s2-pv-m9",
          "To rearrange P = M × (1 − (1+r)^(−n)) / r to make M the subject, the correct step is:",
          "B",
          [
            "Divide both sides by (1 − (1+r)^(−n)) only",
            "Multiply both sides by r, then divide by (1 − (1+r)^(−n))",
            "Subtract r from both sides first",
            "Multiply both sides by n",
          ],
          "M = P × r / (1 − (1+r)^(−n))."
        ),
        financeChoice(
          "y12s2-pv-m10",
          "A loan has monthly repayments of $350 over 30 months. The total amount paid includes:",
          "B",
          [
            "$350 only",
            "$350 × 30 = $10,500, covering both principal and interest",
            "Only the interest component",
            "$350 × 30 × 12",
          ],
          "Total amount paid = M × n = $350 × 30 = $10,500. This covers both principal and interest."
        ),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed HSC-style finance questions involving compound interest, depreciation, loans, annuities, fees, and comparisons.",
    learningIntention:
      "Apply compound interest, depreciation, recurrence relations, annuity ideas, and comparison skills to financial exam questions.",
    successCriteria: [
      "Choose the correct method for compound interest, depreciation, loan recurrence, or annuity questions.",
      "Calculate short balances, interest earned, repayments, fees, and net returns accurately.",
      "Interpret whether balances are increasing or decreasing.",
      "Compare financial options using the same term and relevant fees.",
    ],
    teaching: {
      paragraphs: [
        "Financial Mathematics exam questions often combine context and calculation. Read whether the question is about an investment, a depreciating asset, a loan, or regular payments before choosing a method.",
        "Investments with compound interest use growth factors greater than 1. Depreciation uses decay factors less than 1. Loan recurrences usually add interest and subtract repayments.",
        "Annuities involve regular deposits or payments. A recurrence table is often the clearest way to track the balance period by period.",
        "For comparison questions, avoid choosing the highest rate or lowest repayment too quickly. Check fees, term, final balance, and whether the balance is actually improving.",
      ],
      latexBlocks: [
        "A=P(1+r)^n",
        "V=P(1-r)^n",
        "B_{n+1}=\\text{interest factor}\\times B_n-\\text{repayment}",
      ],
    },
    workedExamples: [
      {
        title: "Choose the correct financial model",
        questionLatex:
          "\\text{A car worth }\\$22000\\text{ loses }9\\%\\text{ of its value each year.}",
        steps: [
          {
            explanation:
              "The asset is losing value by a repeated percentage, so this is depreciation.",
          },
          {
            explanation: "Use a decay factor.",
            latex: "1-0.09=0.91",
          },
        ],
        finalAnswerLatex: "\\text{Use }V=22000(0.91)^n.",
      },
      {
        title: "Compare options after fees",
        questionLatex:
          "\\text{Option A returns }\\$5180.\\quad \\text{Option B returns }\\$5230\\text{ with a }\\$70\\text{ fee.}",
        steps: [
          {
            explanation: "Calculate Option B's net return.",
            latex: "5230-70=5160",
          },
          {
            explanation:
              "Compare net values, not just the advertised return.",
            latex: "5180>5160",
          },
        ],
        finalAnswerLatex: "\\text{Option A is better by }\\$20.",
      },
      {
        title: "Interpret a loan recurrence",
        questionLatex:
          "B_{n+1}=1.008B_n-500",
        steps: [
          {
            explanation:
              "The balance is multiplied by 1.008, so interest is added first.",
          },
          {
            explanation:
              "Then 500 dollars is subtracted as the repayment.",
          },
        ],
        finalAnswerLatex: "\\text{Monthly interest is followed by a }\\$500\\text{ repayment.}",
      },
    ],
    guidedPractice: [
      moneyAnswer("y12s2-fin-exam-g1", "An investment of 3000 dollars earns 4% p.a. compounded annually for 2 years. Find the balance.", "A=P(1+r)^n,\\quad P=\\$3000,\\quad r=4\\%,\\quad n=2", "3244.80", ["3244.8", "$3244.8"]),
      moneyAnswer("y12s2-fin-exam-g2", "A car worth 20000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "V=P(1-r)^n,\\quad P=\\$20000,\\quad r=10\\%,\\quad n=2", "16200"),
      moneyAnswer("y12s2-fin-exam-g3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.005B_n-350,\\quad B_0=10000", "9700"),
      financeChoice("y12s2-fin-exam-g4", "An investment has a higher rate but a large fee. Which comparison is fairest?", "C", ["Highest rate only", "Lowest fee only", "Net balance over the same term", "The first year only"], "Financial products should be compared over the same term after fees."),
    ],
    independentPractice: [
      moneyAnswer("y12s2-fin-exam-i1", "A 4500 dollar account earns 3.5% p.a. compounded annually for 2 years. Find the balance to the nearest cent.", "A=P(1+r)^n,\\quad P=\\$4500,\\quad r=3.5\\%,\\quad n=2", "4820.51"),
      moneyAnswer("y12s2-fin-exam-i2", "Equipment worth 8000 dollars depreciates by 15% in one year. Find its value after one year.", "V=P(1-r)^n,\\quad P=\\$8000,\\quad r=15\\%,\\quad n=1", "6800"),
      moneyAnswer("y12s2-fin-exam-i3", "A savings recurrence is shown. Use the starting balance to find the next balance.", "S_{n+1}=1.004S_n+250,\\quad S_0=1500", "1756"),
      moneyAnswer("y12s2-fin-exam-i4", "Option A returns 6120 dollars. Option B returns 6200 dollars but charges an 85 dollar fee. What is Option B's net balance?", "\\text{Option B return}=\\$6200,\\quad \\text{fee}=\\$85", "6115"),
      financeChoice("y12s2-fin-exam-i5", "A loan balance table shows 25000, 24920, 24835 after repayments. Which conclusion is best?", "A", ["The balance is decreasing slowly", "The balance is increasing", "The loan is fully repaid", "The interest rate is definitely zero"], "The listed balances decrease, but only slowly."),
    ],
    commonMistakes: [
      { mistake: "Using the same factor for growth and depreciation.", fix: "Growth uses 1 + r; depreciation uses 1 - r." },
      { mistake: "Ignoring whether a recurrence adds a deposit or subtracts a repayment.", fix: "Read the sign in the recurrence carefully." },
      { mistake: "Comparing products using the advertised rate only.", fix: "Include fees, term, and final balance." },
      { mistake: "Writing long explanations instead of a clear calculation or conclusion.", fix: "Give the requested balance, option, or A/B/C/D answer." },
    ],
    masteryQuiz: [
      financeChoice("y12s2-fin-exam-m1", "A bank balance grows by compound interest. Which factor is used for 5% growth?", "B", ["0.05", "1.05", "5", "0.95"], "Compound growth uses 1 + 0.05."),
      financeChoice("y12s2-fin-exam-m2", "A car depreciates by 8% p.a. Which factor is used?", "D", ["1.08", "8", "0.08", "0.92"], "Depreciation uses 1 - 0.08."),
      moneyAnswer("y12s2-fin-exam-m3", "An investment of 2500 dollars earns 4% p.a. compounded annually for 2 years. Find the balance.", "A=P(1+r)^n", "2704"),
      moneyAnswer("y12s2-fin-exam-m4", "A device worth 1600 dollars depreciates by 20% in one year. Find its value.", "V=P(1-r)^n", "1280"),
      moneyAnswer("y12s2-fin-exam-m5", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.006B_n-450,\\quad B_0=28000", "27718"),
      moneyAnswer("y12s2-fin-exam-m6", "A savings plan follows the recurrence shown. Use the starting balance to find the next balance.", "S_{n+1}=1.005S_n+200,\\quad S_0=1000", "1205"),
      moneyAnswer("y12s2-fin-exam-m7", "A 5000 dollar investment grows to 5360 dollars. Find the interest earned.", "\\text{initial}=\\$5000,\\quad \\text{final}=\\$5360", "360"),
      financeChoice("y12s2-fin-exam-m8", "Option A has a final balance of 4320 dollars. Option B has 4390 dollars but a 90 dollar fee. Which option has the higher net balance?", "A", ["Option A", "Option B", "They are equal", "The fee should be ignored"], "Option B's net balance is lower after the fee, so Option A is higher."),
      financeChoice("y12s2-fin-exam-m9", "Which recurrence best models a loan with 0.6% interest each month followed by a 450 dollar repayment?", "C", ["B_{n+1}=0.994B_n-450", "B_{n+1}=1.006B_n+450", "B_{n+1}=1.006B_n-450", "B_{n+1}=450B_n-1.006"], "The loan balance is multiplied by the interest factor, then the repayment is subtracted."),
      financeChoice("y12s2-fin-exam-m10", "A loan balance table shows 25000, 24920, 24835 after repayments. Which conclusion is best?", "B", ["The loan is increasing", "The loan is decreasing slowly", "The loan is fully paid off", "The interest rate is definitely zero"], "The balances are decreasing, but there is still a large amount owing."),
    ],
  };
}

