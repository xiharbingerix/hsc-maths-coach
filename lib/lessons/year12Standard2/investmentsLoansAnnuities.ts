import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import {
  financeChoice,
  financeShortAnswer as baseFinanceShortAnswer,
  moneyAnswer as baseMoneyAnswer,
} from "../questionHelpers";

function financeFeedback(prompt: string, latex: string, answer: string) {
  if (prompt.includes("monthly interest") || prompt.includes("interest charge")) {
    return `Monthly credit-card interest = balance × annual rate ÷ 12. Substitute the balance and annual rate, then round to cents if needed to get ${answer}.`;
  }
  if (prompt.includes("BNPL") && (prompt.includes("split") || prompt.includes("instalments") || prompt.includes("instalment"))) {
    return `For BNPL instalments, divide the purchase price by the number of equal payments. This gives ${answer}.`;
  }
  if (prompt.includes("new card balance") || prompt.includes("New balance")) {
    return `New balance = starting balance + monthly interest − repayment. Apply those steps in order to get ${answer}.`;
  }
  if (prompt.includes("late fee") && prompt.includes("total cost")) {
    return `Total cost = purchase price + all late fees. Add the missed-payment fees to the original purchase price to get ${answer}.`;
  }
  if (prompt.includes("total cost") && prompt.includes("interest per month")) {
    return `Total cost = purchase price + monthly interest × number of months. Multiply the interest by the months, then add it to the purchase price to get ${answer}.`;
  }
  if (prompt.includes("FV factor") || prompt.includes("future value") && prompt.includes("factor")) {
    return `FV = M × FV factor. Multiply the regular payment by the factor from the table to get ${answer}.`;
  }
  if ((prompt.includes("PV factor") || prompt.includes("lump sum")) && prompt.includes("factor")) {
    return `PV = M × PV factor, so M = PV ÷ PV factor (or PV = M × factor). Apply the correct direction to get ${answer}.`;
  }
  if (prompt.includes("monthly deposit") && prompt.includes("factor")) {
    return `Target FV = M × FV factor, so M = FV ÷ FV factor. Divide the target by the table factor to get the required monthly deposit, ${answer}.`;
  }
  if (prompt.includes("monthly repayment") && prompt.includes("PV factor")) {
    return `M = loan ÷ PV factor. Divide the loan amount by the factor from the table to get the monthly repayment, ${answer}.`;
  }
  if (prompt.includes("dividend yield")) {
    return `Dividend yield = (dividend per share ÷ market price) × 100%. Divide the annual dividend by the share price, then multiply by 100 to get ${answer}.`;
  }
  if (prompt.includes("total purchase cost") || (prompt.includes("brokerage") && prompt.includes("buy"))) {
    return `Total purchase cost = (shares × price) + brokerage. Calculate the base value first, then add the brokerage amount to get ${answer}.`;
  }
  if (prompt.includes("net proceeds") || (prompt.includes("brokerage") && prompt.includes("sell"))) {
    return `Net proceeds = (shares × sale price) − brokerage. Calculate the gross sale value first, then subtract brokerage to get ${answer}.`;
  }
  if (prompt.includes("capital gain") || prompt.includes("capital loss")) {
    return `Capital gain/loss = net proceeds − total purchase cost. Subtract the full buy cost from the net sale proceeds to get ${answer}.`;
  }
  if (prompt.includes("total dividends") || (prompt.includes("dividend") && prompt.includes("year"))) {
    return `Total dividends = shares × dividend per share × number of years. Multiply through to get ${answer}.`;
  }
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
  if (course.slug !== "year-12-standard-2" && course.slug !== "year-12-standard-1") {
    return null;
  }
  if (course.slug === "year-12-standard-2") {
    if (unit.slug !== "investment-loans" && unit.slug !== "annuities") return null;
  } else {
    if (unit.slug !== "investments-loans-annuities") return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "investment-loans-revision") {
    return {
      ...base,
      description:
        "Consolidate Year 11 percentage skills: find a percentage of a quantity, express one quantity as a percentage of another, apply percentage increase/decrease, and calculate simple interest using I = Prn.",
      learningIntention:
        "Activate Year 11 percentage and simple interest skills required for Year 12 financial mathematics — the foundation for compound interest, depreciation, and loans.",
      successCriteria: [
        "Calculate a given percentage of a quantity.",
        "Express one quantity as a percentage of another and convert between percentage and decimal.",
        "Apply percentage increase and decrease to an original value.",
        "Use I = Prn to calculate simple interest, and find the final balance A = P + I.",
      ],
      teaching: {
        paragraphs: [
          "A percentage is a fraction out of 100. To find p% of a quantity, convert the percentage to a decimal (divide by 100) and multiply: p% of Q = (p ÷ 100) × Q. For example, 12% of $450 = 0.12 × 450 = $54.",
          "To express A as a percentage of B: divide A by B, then multiply by 100. For example, $36 out of $240 = (36 ÷ 240) × 100 = 15%.",
          "Percentage increase: new value = original × (1 + rate). Percentage decrease: new value = original × (1 − rate). For example, $500 increased by 8% = 500 × 1.08 = $540. $500 decreased by 15% = 500 × 0.85 = $425.",
          "Simple interest uses the formula I = Prn, where P = principal (starting amount), r = annual interest rate as a decimal, n = time in years. The final balance A = P + I. Unlike compound interest, simple interest is always calculated on the original principal only.",
        ],
        latexBlocks: [
          "p\\%\\text{ of }Q = \\frac{p}{100} \\times Q",
          "\\text{Express }A\\text{ as a \\% of }B = \\frac{A}{B} \\times 100",
          "\\text{Increase: }\\text{new} = P \\times (1 + r),\\quad \\text{Decrease: }\\text{new} = P \\times (1 - r)",
          "I = Prn,\\quad A = P + I",
        ],
      },
      workedExamples: [
        {
          title: "Percentage of a quantity and expressing as a percentage",
          questionLatex:
            "\\text{(a) Find 18\\% of \\$2500. (b) A jumper was originally \\$80, now \\$68. What percentage discount is this?}",
          steps: [
            {
              explanation: "(a) Convert 18% to a decimal and multiply.",
              latex: "0.18 \\times 2500 = \\$450",
            },
            {
              explanation: "(b) Discount = $80 − $68 = $12. Express $12 as % of $80.",
              latex:
                "\\frac{12}{80} \\times 100 = 15\\%",
            },
          ],
          finalAnswerLatex: "\\$450;\\quad 15\\%\\text{ discount}",
        },
        {
          title: "Percentage increase and decrease",
          questionLatex:
            "\\text{(a) A salary of \\$58\\,000 increases by 4.5\\%. Find the new salary. (b) A phone worth \\$1200 depreciates by 25\\%. Find its new value.}",
          steps: [
            {
              explanation: "(a) New salary = 58 000 × (1 + 0.045).",
              latex: "58\\,000 \\times 1.045 = \\$60\\,610",
            },
            {
              explanation: "(b) New value = 1200 × (1 − 0.25).",
              latex: "1200 \\times 0.75 = \\$900",
            },
          ],
          finalAnswerLatex: "\\$60\\,610;\\quad \\$900",
        },
        {
          title: "Simple interest",
          questionLatex:
            "\\$8000 is invested at 4.5\\% p.a. simple interest for 3 years. Find (a) the interest earned and (b) the final balance.",
          steps: [
            {
              explanation: "P = 8000, r = 0.045, n = 3. Apply I = Prn.",
              latex: "I = 8000 \\times 0.045 \\times 3 = \\$1080",
            },
            {
              explanation: "Final balance A = P + I.",
              latex: "A = 8000 + 1080 = \\$9080",
            },
          ],
          finalAnswerLatex: "I = \\$1080;\\quad A = \\$9080",
        },
      ],
      guidedPractice: [
        moneyAnswer(
          "y12s2-ilr-g1",
          "Find 15% of $3200.",
          "",
          "$480",
          ["480"]
        ),
        financeShortAnswer(
          "y12s2-ilr-g2",
          "A laptop costs $1500. It is discounted by 20%. What is the new price?",
          "",
          "$1200",
          ["1200"]
        ),
        financeShortAnswer(
          "y12s2-ilr-g3",
          "Express $45 as a percentage of $180.",
          "",
          "25%",
          ["25"]
        ),
        moneyAnswer(
          "y12s2-ilr-g4",
          "Find the simple interest on $5000 at 3% p.a. for 4 years.",
          "",
          "$600",
          ["600"]
        ),
      ],
      independentPractice: [
        financeShortAnswer(
          "y12s2-ilr-i1",
          "Find 7.5% of $4800.",
          "",
          "$360",
          ["360"]
        ),
        moneyAnswer(
          "y12s2-ilr-i2",
          "A rent of $520/week increases by 5%. What is the new weekly rent?",
          "",
          "$546",
          ["546"]
        ),
        financeShortAnswer(
          "y12s2-ilr-i3",
          "Express $90 as a percentage of $360.",
          "",
          "25%",
          ["25"]
        ),
        moneyAnswer(
          "y12s2-ilr-i4",
          "Find the final balance after $7000 earns simple interest at 5% p.a. for 2 years.",
          "",
          "$7700",
          ["7700"]
        ),
        financeChoice(
          "y12s2-ilr-i5",
          "A TV worth $800 decreases by 30%. Its new value is:",
          "B",
          ["$560", "$560", "$240", "$1040"],
          "800 × 0.70 = $560."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Calculating percentage increase by adding the percentage number directly: $500 + 8% = $508.",
          fix: "Convert the percentage to a decimal first. 8% of $500 = 0.08 × 500 = $40, so the new amount = $500 + $40 = $540 (or 500 × 1.08 = $540).",
        },
        {
          mistake: "Using the wrong base when expressing one quantity as a percentage of another.",
          fix: "Always divide by the original or reference quantity, not the new one. 'What percentage of $80 is $68?' → 68 ÷ 80 × 100 = 85%, not 68 ÷ 68 × 100.",
        },
        {
          mistake: "In simple interest, recalculating interest on the growing balance each year instead of the original principal.",
          fix: "Simple interest is always calculated on P (the original amount). I = Prn uses P once — not an updated balance. Only compound interest recalculates each period.",
        },
        {
          mistake: "Confusing A (final balance) with I (interest earned) — reporting $1080 as the answer when asked for the final balance.",
          fix: "I = Prn gives just the interest. The final balance is A = P + I. Check what the question asks for — interest earned, or total amount at the end.",
        },
      ],
      masteryQuiz: [
        financeShortAnswer(
          "y12s2-ilr-m1",
          "Find 12% of $6500.",
          "",
          "$780",
          ["780"]
        ),
        moneyAnswer(
          "y12s2-ilr-m2",
          "A price of $250 increases by 6%. Find the new price.",
          "",
          "$265",
          ["265"]
        ),
        financeShortAnswer(
          "y12s2-ilr-m3",
          "Express $36 as a percentage of $150.",
          "",
          "24%",
          ["24"]
        ),
        moneyAnswer(
          "y12s2-ilr-m4",
          "Find the simple interest on $12 000 at 4% p.a. for 5 years.",
          "",
          "$2400",
          ["2400"]
        ),
        financeShortAnswer(
          "y12s2-ilr-m5",
          "A car worth $24 000 falls in value by 18%. Find its new value.",
          "",
          "$19 680",
          ["19680", "$19,680"]
        ),
        moneyAnswer(
          "y12s2-ilr-m6",
          "Find the final balance when $10 000 earns 3.5% p.a. simple interest for 4 years.",
          "",
          "$11 400",
          ["11400", "$11,400"]
        ),
        financeChoice(
          "y12s2-ilr-m7",
          "A jacket originally $180 is discounted by 25%. The sale price is:",
          "C",
          ["$45", "$155", "$135", "$145"],
          "180 × 0.75 = $135."
        ),
        financeShortAnswer(
          "y12s2-ilr-m8",
          "Express $120 as a percentage of $800.",
          "",
          "15%",
          ["15"]
        ),
        moneyAnswer(
          "y12s2-ilr-m9",
          "An investment of $4000 earns $480 simple interest over 3 years. What annual rate was used?",
          "",
          "4%",
          ["4", "0.04"]
        ),
        financeChoice(
          "y12s2-ilr-m10",
          "Which formula gives the final balance under simple interest?",
          "B",
          ["A = P(1 + r)^n", "A = P + Prn", "A = Prn", "A = P ÷ (1 + rn)"],
          "A = P + I = P + Prn = P(1 + rn)."
        ),
      ],
    };
  }

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
        moneyAnswer("y12s2-invest-g1", "An investment of 2000 dollars earns 5% p.a. compounded annually for 2 years. What is the final balance?", "", "2205"),
        financeShortAnswer("y12s2-invest-g2", "A bank rate is 4.2% p.a. Write the annual growth factor.", "\\text{annual rate}=4.2\\%", "1.042"),
        moneyAnswer("y12s2-invest-g3", "A savings account grows from 1800 dollars to 1968 dollars. How much interest was earned?", "\\text{final balance}=\\$1968,\\quad \\text{principal}=\\$1800", "168"),
        financeChoice("y12s2-invest-g4", "An investment option has a higher rate but a 60 dollar yearly fee. What should be compared?", "B", ["Only the advertised rate", "The final balance after fees", "Only the first deposit", "The loan repayment amount"], "A fair comparison uses net balance after fees."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-invest-i1", "A term deposit of 1500 dollars earns 3% p.a. compounded annually for 3 years. Find the balance to the nearest cent.", "", "1639.09"),
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
        moneyAnswer("y12s2-invest-m2", "A 1000 dollar account earns 6% p.a. compounded annually for 2 years. Find the balance.", "", "1123.60", ["1123.6", "$1123.6"]),
        moneyAnswer("y12s2-invest-m3", "A 2500 dollar investment earns 4% p.a. compounded annually for 3 years. Find the balance to the nearest cent.", "", "2812.16"),
        moneyAnswer("y12s2-invest-m4", "An account grows from 5000 dollars to 5460 dollars. Find the interest earned.", "\\text{initial}=\\$5000,\\quad \\text{final}=\\$5460", "460"),
        financeChoice("y12s2-invest-m5", "Which expression models 3500 dollars at 2.5% p.a. compounded annually for 4 years?", "C", ["3500(2.5)^4", "3500(0.025)^4", "3500(1.025)^4", "3500+1.025+4"], "The growth factor is 1.025."),
        moneyAnswer("y12s2-invest-m6", "A 6000 dollar investment at 3% p.a. compounded annually is worth what after 1 year?", "", "6180"),
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
        moneyAnswer("y12s2-loan-g2", "A phone worth 1200 dollars depreciates by 15% in one year. What is its value after one year?", "", "1020"),
        moneyAnswer("y12s2-loan-g3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.01B_n-300,\\quad B_0=5000", "4750"),
        financeChoice("y12s2-loan-g4", "A monthly loan adds 90 dollars interest and the repayment is 75 dollars. What happens to the balance?", "C", ["It decreases by 75 dollars", "It becomes zero", "It increases by 15 dollars", "It must be a depreciation model"], "The interest added is larger than the repayment."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-loan-i1", "A ute worth 24000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "", "19440"),
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
        moneyAnswer("y12s2-loan-m2", "A bike worth 900 dollars depreciates by 10% in one year. Find its value after one year.", "", "810"),
        moneyAnswer("y12s2-loan-m3", "A car worth 18000 dollars depreciates by 12% p.a. for 2 years. Find its value.", "", "13939.20", ["13939.2", "$13939.2"]),
        moneyAnswer("y12s2-loan-m4", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.006B_n-450,\\quad B_0=28000", "27718"),
        financeChoice("y12s2-loan-m5", "In the displayed loan recurrence, what does the subtracted amount represent?", "B", ["Interest", "A repayment", "Depreciation", "A fee added"], "The subtraction represents a repayment.", "B_{n+1}=1.01B_n-500"),
        moneyAnswer("y12s2-loan-m6", "A camera worth 1500 dollars depreciates by 25% in one year. Find its value.", "", "1125"),
        financeChoice("y12s2-loan-m7", "A repayment is 300 dollars and monthly interest added is 260 dollars. The balance:", "A", ["Decreases by 40 dollars", "Increases by 40 dollars", "Does not change", "Depreciates by 300%"], "Repayment exceeds interest by 40 dollars."),
        moneyAnswer("y12s2-loan-m8", "A loan follows the recurrence shown and the next balance is 11798 dollars. Find the starting balance.", "B_{n+1}=1.004B_n-250", "12000", ["$12000", "12,000", "$12,000"]),
        financeChoice("y12s2-loan-m9", "Which recurrence models a 16000 dollar asset depreciating by 7% each year?", "D", ["V_{n+1}=1.07V_n,\\ V_0=16000", "V_{n+1}=7V_n,\\ V_0=16000", "V_{n+1}=0.07V_n,\\ V_0=16000", "V_{n+1}=0.93V_n,\\ V_0=16000"], "Depreciation by 7% leaves 93% of the value each year."),
        financeChoice("y12s2-loan-m10", "A loan balance goes from 12000 dollars to 12080 dollars after a repayment. Which conclusion is most reasonable?", "C", ["The repayment was too large", "The loan is fully paid off", "Interest and fees outweighed the repayment", "The asset is depreciating"], "If the balance rises after a repayment, the added interest or fees were larger than the repayment."),
      ],
    };
  }

  if (lesson.slug === "straight-line-vs-declining-depreciation") {
    return {
      ...base,
      description:
        "Apply the straight-line formula S = V₀ − Dn and the declining balance formula S = V₀(1−r)ⁿ to model asset depreciation, and compare both methods for the same asset.",
      learningIntention:
        "Calculate depreciated asset values using both straight-line and declining balance methods, and compare the two formulas.",
      successCriteria: [
        "Apply S = V₀ − Dn to calculate the value of an asset after n years using straight-line depreciation.",
        "Apply S = V₀(1−r)ⁿ to calculate the value of an asset after n years using declining balance depreciation.",
        "Identify D as the fixed annual amount and r as the annual rate in the respective formulas.",
        "Compare the two methods for the same asset and state which gives the higher value after n years.",
      ],
      teaching: {
        paragraphs: [
          "Straight-line depreciation reduces the value of an asset by a fixed dollar amount D each year. The formula is S = V₀ − Dn, where V₀ is the initial value, D is the annual depreciation amount, and n is the number of years. Each year the graph of value drops by exactly the same amount — a straight line.",
          "Declining balance (or diminishing value) depreciation reduces the value by a fixed percentage r each year. The formula is S = V₀(1−r)ⁿ. The decay factor (1−r) is applied repeatedly. Because the reduction is a percentage of the current value, the dollar amount decreases each year — but the asset value never reaches exactly zero.",
          "Under straight-line, the asset loses the same dollar amount every year. Under declining balance, it loses more value early on and less value later. This means for the same asset, declining balance gives a lower value in the early years but a higher value in the later years compared to straight-line.",
          "To compare: calculate S using each formula for the same n, then state which is higher. In exam questions, you may be asked to find the value after a given number of years, or to find how many years until the value falls below a threshold.",
        ],
        latexBlocks: [
          "\\text{Straight-line: }S = V_0 - Dn",
          "\\text{Declining balance: }S = V_0(1-r)^n",
          "\\text{Decay factor} = 1 - r\\quad(\\text{e.g., }r=20\\%\\Rightarrow\\text{factor}=0.80)",
        ],
      },
      workedExamples: [
        {
          title: "Straight-line depreciation",
          questionLatex:
            "\\text{A laptop costs }\\$3200\\text{ and depreciates by }\\$640\\text{ per year. Find its value after 3 years.}",
          steps: [
            {
              explanation: "Identify V₀, D, and n.",
              latex: "V_0=\\$3200,\\quad D=\\$640,\\quad n=3",
            },
            {
              explanation: "Apply S = V₀ − Dn.",
              latex: "S = 3200 - 640 \\times 3 = 3200 - 1920 = \\$1280",
            },
          ],
          finalAnswerLatex: "S = \\$1280",
        },
        {
          title: "Declining balance depreciation",
          questionLatex:
            "\\text{A car costs }\\$25000\\text{ and depreciates at }15\\%\\text{ p.a. using declining balance. Find its value after 4 years.}",
          steps: [
            {
              explanation: "Identify V₀, r, and n. Decay factor = 1 − 0.15 = 0.85.",
              latex: "V_0=\\$25000,\\quad r=15\\%,\\quad 1-r=0.85,\\quad n=4",
            },
            {
              explanation: "Apply S = V₀(1−r)ⁿ.",
              latex:
                "S = 25000 \\times (0.85)^4 = 25000 \\times 0.5220 \\approx \\$13050.16",
            },
          ],
          finalAnswerLatex: "S \\approx \\$13050.16",
        },
        {
          title: "Compare both methods",
          questionLatex:
            "\\text{An asset costs }\\$10000\\text{. Method 1: straight-line, }D=\\$1500\\text{/yr. Method 2: declining balance at }20\\%\\text{ p.a. Find the value after 3 years using each method.}",
          steps: [
            {
              explanation: "Straight-line after 3 years.",
              latex: "S_{\\text{SL}} = 10000 - 1500 \\times 3 = \\$5500",
            },
            {
              explanation: "Declining balance after 3 years.",
              latex:
                "S_{\\text{DB}} = 10000 \\times (0.80)^3 = 10000 \\times 0.512 = \\$5120",
            },
            {
              explanation: "Compare: straight-line gives the higher value after 3 years.",
              latex: "\\$5500 > \\$5120",
            },
          ],
          finalAnswerLatex:
            "\\text{SL: }\\$5500;\\quad\\text{DB: }\\$5120;\\quad\\text{Straight-line gives the higher value after 3 years.}",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y12s2-sld-g1",
          "In the formula S = V₀ − Dn, what does D represent?",
          "B",
          [
            "The depreciation rate as a decimal",
            "The fixed annual depreciation amount in dollars",
            "The number of years",
            "The salvage value",
          ],
          "D is the constant dollar amount subtracted each year in straight-line depreciation."
        ),
        moneyAnswer(
          "y12s2-sld-g2",
          "A laptop costing $2000 depreciates by $400 per year using straight-line. Find its value after 4 years.",
          "",
          "600"
        ),
        financeChoice(
          "y12s2-sld-g3",
          "A declining balance depreciation rate is 20%. What is the decay factor?",
          "C",
          ["0.20", "1.20", "0.80", "0.02"],
          "Decay factor = 1 − 0.20 = 0.80."
        ),
        moneyAnswer(
          "y12s2-sld-g4",
          "An asset worth $6000 depreciates at 10% p.a. using declining balance. Find its value after 2 years.",
          "",
          "4860"
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y12s2-sld-i1",
          "An asset costing $5000 depreciates by $800 per year (straight-line). Find its value after 3 years.",
          "",
          "2600"
        ),
        moneyAnswer(
          "y12s2-sld-i2",
          "A machine costing $8000 depreciates at 12% p.a. (declining balance). Find its value after 2 years.",
          "",
          "6195.20",
          ["$6195.20", "6195.2"]
        ),
        financeChoice(
          "y12s2-sld-i3",
          "A printer costing $12000 depreciates by $2000 per year (straight-line). Value after 5 years?",
          "C",
          ["$0", "$10000", "$2000", "$4000"],
          "S = 12000 − 2000 × 5 = $2000."
        ),
        moneyAnswer(
          "y12s2-sld-i4",
          "A car costing $15000 depreciates at 20% p.a. (declining balance). Find its value after 3 years.",
          "",
          "7680"
        ),
        financeChoice(
          "y12s2-sld-i5",
          "For the same $10000 asset compared in WE3 (SL D=$1500; DB r=20%): after 3 years, which method gives the higher value?",
          "A",
          ["Straight-line ($5500)", "Declining balance ($5120)", "They are equal", "Cannot tell"],
          "SL: $5500 > DB: $5120 after 3 years."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Treating D in straight-line as a percentage rate instead of a dollar amount.",
          fix: "In S = V₀ − Dn, D is a fixed dollar amount (e.g., $640). If you are given a percentage, convert it to a dollar amount first: D = V₀ × rate.",
        },
        {
          mistake: "Applying the straight-line formula when the question specifies declining balance, or vice versa.",
          fix: "Read the question carefully. If the depreciation is a fixed dollar amount per year, use S = V₀ − Dn. If it is a percentage of the current value each year, use S = V₀(1−r)ⁿ.",
        },
        {
          mistake: "Using the rate r instead of the decay factor (1−r) in the declining balance formula.",
          fix: "The formula is S = V₀(1−r)ⁿ. For r = 15%, the decay factor is 0.85, not 0.15. Using 0.15 instead of 0.85 gives a result far too small.",
        },
        {
          mistake: "Confusing which method gives a higher or lower value.",
          fix: "Declining balance depreciates faster in early years (larger percentage drops early on). For the same asset over the same period, straight-line typically gives a higher remaining value in the early years. Always calculate both and compare numerically.",
        },
      ],
      masteryQuiz: [
        financeChoice(
          "y12s2-sld-m1",
          "In S = V₀(1−r)ⁿ, what does r represent?",
          "B",
          [
            "The fixed annual depreciation amount",
            "The annual depreciation rate as a decimal",
            "The number of years",
            "The salvage value",
          ],
          "r is the depreciation rate per period expressed as a decimal (e.g., 15% → r = 0.15)."
        ),
        moneyAnswer(
          "y12s2-sld-m2",
          "An asset costing $4000 depreciates by $500 per year (straight-line). Value after 3 years?",
          "",
          "2500"
        ),
        financeChoice(
          "y12s2-sld-m3",
          "A machine costing $10000 depreciates at 15% p.a. (declining balance). Value after 2 years?",
          "C",
          ["$7000", "$7250", "$7225", "$8500"],
          "S = 10000 × 0.85² = 10000 × 0.7225 = $7225."
        ),
        moneyAnswer(
          "y12s2-sld-m4",
          "An asset costing $3000 depreciates by $400 per year (straight-line). Value after 5 years?",
          "",
          "1000"
        ),
        financeChoice(
          "y12s2-sld-m5",
          "A car costing $20000 depreciates at 25% p.a. (declining balance). Value after 3 years?",
          "C",
          ["$11250", "$5000", "$8437.50", "$15000"],
          "S = 20000 × 0.75³ = 20000 × 0.421875 = $8437.50."
        ),
        financeShortAnswer(
          "y12s2-sld-m6",
          "What is the decay factor for a 30% declining balance depreciation rate?",
          "",
          "0.7",
          ["0.70"]
        ),
        moneyAnswer(
          "y12s2-sld-m7",
          "A $6000 machine depreciates by $750 per year (straight-line). Value after 6 years?",
          "",
          "1500"
        ),
        moneyAnswer(
          "y12s2-sld-m8",
          "A laptop costing $12000 depreciates at 20% p.a. (declining balance). Value after 2 years?",
          "",
          "7680"
        ),
        financeChoice(
          "y12s2-sld-m9",
          "Under straight-line depreciation, the value of an asset decreases by:",
          "A",
          [
            "A constant dollar amount each year",
            "A constant percentage of its current value",
            "More each year as the asset ages",
            "A random amount each year",
          ],
          "Straight-line: fixed dollar amount D is subtracted every year."
        ),
        financeChoice(
          "y12s2-sld-m10",
          "For an $8000 asset: SL at D=$1200/yr vs DB at r=18% after 3 years. Which method gives the higher value?",
          "B",
          ["Straight-line ($4400)", "Declining balance (≈$4411)", "They are equal", "Cannot tell without the tariff"],
          "SL: 8000 − 3600 = $4400. DB: 8000 × 0.82³ ≈ $4410.94. Declining balance is slightly higher."
        ),
      ],
    };
  }

  if (lesson.slug === "annuities-revision") {
    return {
      ...base,
      description:
        "Consolidate compound-interest and recurrence-relation skills before studying annuities: apply A = P(1+r)ⁿ, use Sₙ₊₁ = Sₙ × r + d for savings, and Bₙ₊₁ = Bₙ × r − M for loans.",
      learningIntention:
        "Recall and apply compound-interest calculations and balance-table recurrence relations — the foundation for future-value and present-value annuity analysis.",
      successCriteria: [
        "Apply A = P(1+r)ⁿ to calculate a compounded balance after n periods.",
        "Interpret r and n correctly for monthly and quarterly compounding.",
        "Use the savings recurrence Sₙ₊₁ = Sₙ × (1+r) + d to step through a balance table.",
        "Use the loan recurrence Bₙ₊₁ = Bₙ × (1+r) − M to step through a balance table.",
      ],
      teaching: {
        paragraphs: [
          "Compound interest: A = P(1+r)ⁿ, where P is the principal, r is the interest rate per period (as a decimal), and n is the number of periods. For monthly compounding at 6% p.a., r = 0.06 ÷ 12 = 0.005 per month.",
          "A savings balance table uses the recurrence Sₙ₊₁ = Sₙ × (1+r) + d, where r is the per-period rate and d is the regular deposit added at the end of each period. Each row: multiply the current balance by the growth factor, then add the deposit.",
          "A loan balance table uses the recurrence Bₙ₊₁ = Bₙ × (1+r) − M, where M is the regular repayment. Each row: multiply the current debt by the growth factor, then subtract the repayment. The loan is fully repaid when Bₙ reaches $0.",
          "Reading a table: the 'balance' column at the end of each row is the starting point for the next calculation. The interest column shows how much interest was charged (or earned) in that period — it is the previous balance multiplied by r.",
        ],
        latexBlocks: [
          "A = P(1+r)^n\\quad (r\\text{ per period, }n\\text{ periods})",
          "S_{n+1} = S_n \\times (1+r) + d\\quad(\\text{savings with regular deposit})",
          "B_{n+1} = B_n \\times (1+r) - M\\quad(\\text{loan with regular repayment})",
          "\\text{Monthly rate: }r = \\frac{\\text{annual rate}}{12}",
        ],
      },
      workedExamples: [
        {
          title: "Compound interest: final balance",
          questionLatex:
            "\\$6000 is invested at 4.8\\% p.a. compounded monthly for 2 years. Find the final balance (to the nearest cent).",
          steps: [
            {
              explanation: "Monthly rate r = 4.8% ÷ 12 = 0.4% = 0.004. Number of periods n = 2 × 12 = 24.",
              latex: "r = \\frac{0.048}{12} = 0.004,\\quad n = 24",
            },
            {
              explanation: "Apply A = P(1+r)ⁿ.",
              latex: "A = 6000 \\times (1.004)^{24} \\approx 6000 \\times 1.10003 \\approx \\$6600.20",
            },
          ],
          finalAnswerLatex: "A \\approx \\$6600.20",
        },
        {
          title: "Savings balance table",
          questionLatex:
            "Hannah starts with \\$0 and deposits \\$200 at the end of each month into an account earning 3\\% p.a. compounded monthly. Build a 3-row balance table.",
          steps: [
            {
              explanation: "Monthly rate r = 0.03 ÷ 12 = 0.0025. Initial balance S₀ = 0.",
              latex: "r = 0.0025,\\quad d = 200",
            },
            {
              explanation: "Row 1: S₁ = 0 × 1.0025 + 200 = $200.00. Row 2: S₂ = 200 × 1.0025 + 200 = $400.50. Row 3: S₃ = 400.50 × 1.0025 + 200 = $601.50 (approx).",
              latex:
                "S_1 = \\$200.00,\\quad S_2 = \\$400.50,\\quad S_3 \\approx \\$601.50",
            },
          ],
          finalAnswerLatex: "S_3 \\approx \\$601.50",
        },
        {
          title: "Loan balance table",
          questionLatex:
            "A loan of \\$5000 charges 6\\% p.a. compounded monthly. Monthly repayment is \\$430. Show the first 3 rows of the balance table.",
          steps: [
            {
              explanation: "Monthly rate r = 0.06 ÷ 12 = 0.005. Initial balance B₀ = $5000.",
              latex: "r = 0.005,\\quad M = 430",
            },
            {
              explanation: "B₁ = 5000 × 1.005 − 430 = 5025 − 430 = $4595. B₂ = 4595 × 1.005 − 430 ≈ $4162.98. B₃ ≈ 4162.98 × 1.005 − 430 ≈ $3733.79.",
              latex:
                "B_1 = \\$4595.00,\\quad B_2 \\approx \\$4162.98,\\quad B_3 \\approx \\$3733.79",
            },
          ],
          finalAnswerLatex: "B_3 \\approx \\$3733.79",
        },
      ],
      guidedPractice: [
        moneyAnswer(
          "y12s2-anr-g1",
          "Find the final balance when $4000 is invested at 3.6% p.a. compounded monthly for 1 year (to the nearest cent).",
          "",
          "$4146.28",
          ["4146.28", "4146.27"]
        ),
        financeShortAnswer(
          "y12s2-anr-g2",
          "For an investment at 4.8% p.a. compounded quarterly, what is the per-period rate (as a decimal)?",
          "",
          "0.012",
          ["1.2%", "0.0120"]
        ),
        moneyAnswer(
          "y12s2-anr-g3",
          "Savings recurrence: S₀ = $0, r = 0.005, d = $300. Find S₁ and S₂.",
          "",
          "$601.50",
          ["601.5", "601.50"]
        ),
        moneyAnswer(
          "y12s2-anr-g4",
          "Loan recurrence: B₀ = $3000, r = 0.01, M = $200. Find B₁.",
          "",
          "$2830",
          ["2830", "2830.00"]
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y12s2-anr-i1",
          "Find the final balance when $9000 is invested at 6% p.a. compounded monthly for 3 years.",
          "",
          "$10 773.55",
          ["10773.55", "$10,773.55", "10773.5"]
        ),
        financeShortAnswer(
          "y12s2-anr-i2",
          "A loan charges 9.6% p.a. compounded monthly. What is the monthly interest rate as a decimal?",
          "",
          "0.008",
          ["0.8%"]
        ),
        moneyAnswer(
          "y12s2-anr-i3",
          "Savings: S₀ = $500, monthly rate = 0.003, deposit = $150. Find S₂.",
          "",
          "$803.45",
          ["803.45", "803.44"]
        ),
        moneyAnswer(
          "y12s2-anr-i4",
          "Loan: B₀ = $10 000, monthly rate = 0.005, repayment = $450. Find B₁.",
          "",
          "$9600",
          ["9600", "9600.00"]
        ),
        financeChoice(
          "y12s2-anr-i5",
          "$2000 at 4% p.a. compounded annually for 3 years gives A =",
          "C",
          ["$2240.00", "$2248.00", "$2249.73", "$2400.00"],
          "A = 2000 × (1.04)³ = 2000 × 1.124864 ≈ $2249.73."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using the annual rate r directly instead of dividing by the number of compounding periods per year.",
          fix: "Always convert to a per-period rate. For 6% p.a. compounded monthly: r = 0.06 ÷ 12 = 0.005 per month. The number of periods n also changes: 3 years monthly = 36 periods.",
        },
        {
          mistake: "In a savings recurrence, adding the deposit before multiplying by the growth factor.",
          fix: "The correct order is: multiply the current balance by (1+r) first (apply interest), then add the deposit. Sₙ₊₁ = Sₙ × (1+r) + d, not (Sₙ + d) × (1+r).",
        },
        {
          mistake: "In a loan recurrence, multiplying the balance after subtracting the repayment.",
          fix: "Apply interest to the current debt first, then subtract the repayment. Bₙ₊₁ = Bₙ × (1+r) − M. The interest is calculated on what is owed at the start of the period.",
        },
        {
          mistake: "Using n = number of years instead of n = total number of compounding periods.",
          fix: "For monthly compounding over 2 years: n = 2 × 12 = 24 periods. For quarterly over 5 years: n = 5 × 4 = 20 periods. Always match n to the compounding frequency.",
        },
      ],
      masteryQuiz: [
        moneyAnswer(
          "y12s2-anr-m1",
          "Find the final balance when $3000 is invested at 4.8% p.a. compounded monthly for 2 years.",
          "",
          "$3300.06",
          ["3300.06", "3300.05"]
        ),
        financeShortAnswer(
          "y12s2-anr-m2",
          "An investment earns 7.2% p.a. compounded quarterly. What is the quarterly rate (decimal)?",
          "",
          "0.018",
          ["1.8%"]
        ),
        moneyAnswer(
          "y12s2-anr-m3",
          "Savings: S₀ = $0, r = 0.005, d = $500. Find S₃.",
          "",
          "$1507.51",
          ["1507.51", "1507.5"]
        ),
        moneyAnswer(
          "y12s2-anr-m4",
          "Loan: B₀ = $8000, monthly rate = 0.008, repayment = $350. Find B₂.",
          "",
          "$7426.71",
          ["7426.71", "7426.7"]
        ),
        financeChoice(
          "y12s2-anr-m5",
          "$5000 at 6% p.a. compounded monthly for 1 year. Final balance ≈",
          "B",
          ["$5300.00", "$5308.39", "$5300.30", "$5360.00"],
          "A = 5000 × (1.005)¹² ≈ 5000 × 1.0616778 ≈ $5308.39."
        ),
        moneyAnswer(
          "y12s2-anr-m6",
          "Find the interest earned when $7500 compounds at 3.6% p.a. monthly for 18 months.",
          "",
          "$414.28",
          ["414.28", "414.27"]
        ),
        financeShortAnswer(
          "y12s2-anr-m7",
          "Savings recurrence: S₀ = $200, r = 0.004, d = $250. Find S₁.",
          "",
          "$450.80",
          ["450.80", "450.8"]
        ),
        financeChoice(
          "y12s2-anr-m8",
          "The correct savings recurrence (rate r per period, deposit d) is:",
          "A",
          ["Sₙ₊₁ = Sₙ(1+r) + d", "Sₙ₊₁ = (Sₙ + d)(1+r)", "Sₙ₊₁ = Sₙ + d", "Sₙ₊₁ = Sₙ(1+r) − d"],
          "Apply interest to the existing balance first, then add the deposit."
        ),
        moneyAnswer(
          "y12s2-anr-m9",
          "Loan: B₀ = $15 000, monthly rate = 0.006, repayment = $600. Find B₁.",
          "",
          "$14 490",
          ["14490", "14490.00"]
        ),
        financeChoice(
          "y12s2-anr-m10",
          "The number of compounding periods for 4% p.a. compounded quarterly over 3 years is:",
          "C",
          ["4", "3", "12", "36"],
          "Quarterly means 4 periods per year. Over 3 years: n = 3 × 4 = 12 periods."
        ),
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
          "An annuity is a stream of equal payments made at regular intervals — in a savings annuity each deposit then earns interest over the time that remains, so the balance grows faster than the deposits alone. In Year 12 Standard 2 this can be regular deposits into an investment or regular repayments on a loan.",
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
        moneyAnswer("y12s2-ann-m4", "A saver deposits 400 dollars at the end of each year. After the first deposit earns 5%, a second deposit is made. Find the balance after the second deposit.", "","820"),
        financeChoice("y12s2-ann-m5", "In the displayed loan recurrence, what does the subtracted amount represent?", "B", ["A regular deposit", "A regular repayment", "A growth factor", "A fee charged twice"], "It is subtracted, so it represents a repayment.", "B_{n+1}=1.006B_n-450"),
        financeChoice("y12s2-ann-m6", "A repayment table shows balances 12000, 11850, 11702. The loan is:", "C", ["Increasing quickly", "Unchanged", "Decreasing", "Compounding as an investment"], "The listed balance decreases each period."),
        moneyAnswer("y12s2-ann-m7", "A savings account has 900 dollars. It earns 1% interest then receives a 100 dollar deposit. Find the new balance.", "","1009"),
        financeChoice("y12s2-ann-m8", "Which recurrence matches a savings account that earns 0.5% interest each month and then receives a 200 dollar deposit?", "B", ["S_{n+1}=0.995S_n+200", "S_{n+1}=1.005S_n+200", "S_{n+1}=1.005S_n-200", "S_{n+1}=200S_n+1.005"], "Interest increases the balance first, and the deposit is added."),
        moneyAnswer("y12s2-ann-m9", "A savings recurrence is shown. If the next balance is 1411.03 dollars, find the previous balance to the nearest cent.", "S_{n+1}=1.005S_n+200", "1205.00", ["1205", "$1205", "$1205.00", "1,205.00", "$1,205.00", "1205.01", "$1205.01"]),
        financeChoice("y12s2-ann-m10", "Plan A deposits 100 dollars monthly. Plan B deposits 120 dollars monthly but charges a 15 dollar monthly fee. What should be compared?", "D", ["Only the larger deposit", "Only the first month", "Only the interest symbol", "Final balances after deposits, interest, and fees"], "A fair comparison includes the regular deposits, interest, fees, and term."),
      ],
    };
  }

  if (lesson.slug === "annuity-interest-factor-tables") {
    return {
      ...base,
      description:
        "Use tables of FV and PV interest factors to calculate future values, present values, and required regular contributions for savings and loan annuities.",
      learningIntention:
        "Apply interest factor tables to find FV and PV annuity values and to determine the regular payment needed to meet a financial target.",
      successCriteria: [
        "Explain what an FV interest factor represents and how to read it from a table.",
        "Calculate FV of a savings annuity as regular payment × FV factor.",
        "Calculate PV of a loan annuity as regular payment × PV factor.",
        "Find the required regular contribution by dividing the target FV by the FV factor.",
        "Find the monthly repayment by dividing the loan amount by the PV factor.",
      ],
      teaching: {
        paragraphs: [
          "An interest factor table pre-calculates the value of a bracket of the annuity formula for common combinations of periodic interest rate r and number of periods n. Instead of evaluating the full formula, you look up the factor and multiply (or divide) by the regular payment.",
          "The FV interest factor is $(((1+r)^n − 1) ÷ r)$. FV of an annuity = regular payment M × FV factor. This answers the question: if I deposit M every period for n periods at rate r, how much will I accumulate?",
          "The PV interest factor is $((1 − (1+r)^{−n}) ÷ r)$. PV of an annuity = regular payment M × PV factor. This answers the question: what lump sum today is equivalent to receiving M every period for n periods?",
          "To find the required payment M given a target, reverse the process: divide the target FV by the FV factor, or divide the loan PV by the PV factor. This gives the equal periodic payment needed.",
        ],
        latexBlocks: [
          "\\text{FV} = M \\times \\underbrace{\\dfrac{(1+r)^n-1}{r}}_{\\text{FV factor}}",
          "\\text{PV} = M \\times \\underbrace{\\dfrac{1-(1+r)^{-n}}{r}}_{\\text{PV factor}}",
          "M = \\dfrac{\\text{target FV}}{\\text{FV factor}} \\quad \\text{or} \\quad M = \\dfrac{\\text{loan PV}}{\\text{PV factor}}",
          "\\text{Period rate } r = \\dfrac{\\text{annual rate}}{12}\\quad(\\text{for monthly periods})",
        ],
      },
      workedExamples: [
        {
          title: "FV of a savings annuity using a table",
          questionLatex:
            "\\text{Kai deposits }\\$200\\text{ per month for 12 months at 1\\% per month. FV factor (1\\%, 12) = 12.683. Find the FV.}",
          steps: [
            {
              explanation: "Identify the period rate, number of periods, and payment.",
              latex: "r=1\\%,\\quad n=12,\\quad M=\\$200",
            },
            {
              explanation: "Read the FV factor from the table.",
              latex: "\\text{FV factor}=12.683",
            },
            {
              explanation: "Multiply payment by factor.",
              latex: "\\text{FV}=200\\times12.683=\\$2536.60",
            },
          ],
          finalAnswerLatex: "\\text{FV} = \\$2536.60",
        },
        {
          title: "Monthly repayment using the PV factor",
          questionLatex:
            "\\text{A }\\$8000\\text{ loan at 0.5\\% per month over 12 months has PV factor 11.619. Find the monthly repayment.}",
          steps: [
            {
              explanation: "The loan amount equals M × PV factor, so M = PV ÷ PV factor.",
              latex: "M = \\dfrac{8000}{11.619}",
            },
            {
              explanation: "Divide to find the monthly repayment.",
              latex: "M \\approx \\$688.52",
            },
          ],
          finalAnswerLatex: "M \\approx \\$688.52\\text{ per month}",
        },
        {
          title: "Required monthly deposit to reach a savings goal",
          questionLatex:
            "\\text{Zara wants }\\$5000\\text{ in 24 months. Rate 0.5\\% per month. FV factor (0.5\\%, 24) = 25.432. Find her monthly deposit.}",
          steps: [
            {
              explanation: "Target FV = M × FV factor, so M = FV ÷ FV factor.",
              latex: "M = \\dfrac{5000}{25.432}",
            },
            {
              explanation: "Divide to find the required monthly deposit.",
              latex: "M \\approx \\$196.65",
            },
          ],
          finalAnswerLatex: "M \\approx \\$196.65\\text{ per month}",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y12s2-ift-g1",
          "Kai deposits $200/month for 12 months at 1%/month. FV factor = 12.683. What is the FV?",
          "B",
          ["$2400.00", "$2536.60", "$2683.00", "$1268.30"],
          "FV = 200 × 12.683 = $2536.60."
        ),
        financeChoice(
          "y12s2-ift-g2",
          "To find FV of a savings annuity using an interest factor table, you:",
          "B",
          [
            "Add the factor to the payment",
            "Multiply the regular payment by the FV factor",
            "Divide the factor by n",
            "Multiply the FV factor by the interest rate",
          ],
          "FV = M × FV factor. The factor pre-calculates the compound-growth bracket of the formula."
        ),
        moneyAnswer(
          "y12s2-ift-g3",
          "PV factor for 0.5%/month, 12 months is 11.619. Find the monthly repayment on an $8000 loan.",
          "",
          "688.52",
          ["$688.52", "688.5", "$688.5"]
        ),
        moneyAnswer(
          "y12s2-ift-g4",
          "Find the monthly contribution needed to reach $5000 when the FV factor is 25.432.",
          "",
          "196.60",
          ["$196.60", "196.6", "$196.6"]
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y12s2-ift-i1",
          "Zara deposits $150/month for 24 months at 0.5%/month. FV factor = 25.432. Find the future value.",
          "",
          "3814.80",
          ["$3814.80", "3814.8", "$3814.8"]
        ),
        financeChoice(
          "y12s2-ift-i2",
          "A $5000 loan at 0.5%/month for 12 months has PV factor 11.619. Monthly repayment?",
          "B",
          ["$581.00", "$430.33", "$416.67", "$5000.00"],
          "M = 5000 ÷ 11.619 ≈ $430.33."
        ),
        moneyAnswer(
          "y12s2-ift-i3",
          "Monthly deposit to accumulate $10,000 in 12 months at 1%/month. FV factor = 12.683. Find M.",
          "",
          "788.48",
          ["$788.48", "788.5", "$788.5"]
        ),
        moneyAnswer(
          "y12s2-ift-i4",
          "PV factor for 0.5%/month, 24 months is 22.563. Find the monthly repayment on a $12,000 loan.",
          "",
          "531.83",
          ["$531.83", "531.8", "$531.8"]
        ),
        financeChoice(
          "y12s2-ift-i5",
          "FV factor for 1%/month, 24 months = 26.973. Monthly payment to reach $8000?",
          "C",
          ["$215,784", "$333.33", "$296.60", "$26.97"],
          "M = 8000 ÷ 26.973 ≈ $296.60."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using the PV factor table when the question is about savings accumulation (FV).",
          fix: "FV factor is for savings building up over time. PV factor is for loans or lump-sum equivalents. Check whether the question starts with a lump sum (PV) or regular deposits building to a total (FV).",
        },
        {
          mistake: "Multiplying PV by the factor when trying to find the payment.",
          fix: "PV = M × PV factor, so M = PV ÷ PV factor. When finding the payment, divide — not multiply.",
        },
        {
          mistake: "Using the annual rate instead of the period rate to look up the factor.",
          fix: "Tables use the per-period rate. For monthly compounding, divide the annual rate by 12. Use n = number of months, r = monthly rate when reading the table.",
        },
        {
          mistake: "Confusing n (number of periods) with years.",
          fix: "If periods are months, n = number of months (e.g., 2 years = 24 months). Match n and r to the same period.",
        },
      ],
      masteryQuiz: [
        financeChoice(
          "y12s2-ift-m1",
          "Lucas deposits $400/month for 12 months at 1%/month. FV factor = 12.683. FV?",
          "B",
          ["$4800.00", "$5073.20", "$1268.30", "$12,683.00"],
          "FV = 400 × 12.683 = $5073.20."
        ),
        moneyAnswer(
          "y12s2-ift-m2",
          "Monthly deposit to accumulate $6000 in 12 months at 0.5%/month. FV factor = 12.336. Find M.",
          "",
          "486.38",
          ["$486.38", "486.4", "$486.4"]
        ),
        moneyAnswer(
          "y12s2-ift-m3",
          "Monthly deposit to reach $15,000 in 24 months at 0.5%/month. FV factor = 25.432. Find M.",
          "",
          "589.81",
          ["$589.81", "589.8", "$589.8"]
        ),
        moneyAnswer(
          "y12s2-ift-m4",
          "Loan $6000 at 0.5%/month for 12 months. PV factor = 11.619. Monthly repayment?",
          "",
          "516.40",
          ["$516.40", "516.4", "$516.4"]
        ),
        moneyAnswer(
          "y12s2-ift-m5",
          "$15,000 loan at 1%/month over 12 months. PV factor = 11.255. Find the monthly repayment.",
          "",
          "1332.74",
          ["$1332.74", "1332.7", "$1332.7"]
        ),
        financeChoice(
          "y12s2-ift-m6",
          "If the PV factor is larger, the monthly repayment on the same loan is:",
          "B",
          ["Larger", "Smaller", "Unchanged", "Equal to the interest rate"],
          "M = PV ÷ PV factor. A larger denominator gives a smaller M."
        ),
        moneyAnswer(
          "y12s2-ift-m7",
          "FV factor (1%/month, 24 months) = 26.973. Monthly deposit to accumulate $20,000?",
          "",
          "741.48",
          ["$741.48", "741.5", "$741.5"]
        ),
        moneyAnswer(
          "y12s2-ift-m8",
          "Monthly withdrawals of $500 for 24 months at 0.5%/month. PV factor = 22.563. Find the lump sum needed today.",
          "",
          "11281.50",
          ["$11,281.50", "$11281.50", "11281.5"]
        ),
        financeChoice(
          "y12s2-ift-m9",
          "The key difference between FV and PV annuity factor tables is:",
          "A",
          [
            "FV factors are for savings building up; PV factors are for loans or lump-sum equivalents",
            "FV tables use higher rates than PV tables",
            "PV factors are always larger than FV factors",
            "They give identical results",
          ],
          "FV factors apply when regular payments build up a future balance. PV factors apply when a lump sum today is equivalent to a series of payments."
        ),
        moneyAnswer(
          "y12s2-ift-m10",
          "A retiree needs $2000/month for 12 months from a lump sum at 1%/month. PV factor = 11.255. Lump sum required?",
          "",
          "22510",
          ["$22,510", "22510.00", "$22510"]
        ),
      ],
    };
  }

  if (lesson.slug === "retirement-annuity-planning") {
    return {
      ...base,
      description:
        "Apply future value and present value annuity reasoning to plan long-term superannuation savings, calculate retirement lump sums, and determine sustainable income streams.",
      learningIntention:
        "Use FV and PV annuity formulas with interest factor tables to plan for retirement savings and income in multi-step scenarios.",
      successCriteria: [
        "Calculate the future value of regular superannuation contributions using FV = M × FV factor.",
        "Determine the regular contribution required to reach a retirement savings target.",
        "Calculate the annual income a retirement lump sum can sustain using PV annuity reasoning.",
        "Interpret and compare two retirement saving strategies over different time horizons.",
      ],
      teaching: {
        paragraphs: [
          "Retirement planning applies the same annuity formulas used for savings and loans, but over longer time horizons (often 20–40 years). Superannuation is the most common vehicle: regular contributions are made each month or year and grow with compound interest.",
          "To find how much a lump sum a person accumulates: FV = M × FV factor(r, n), where M is the regular contribution, r is the period interest rate, and n is the number of periods. Starting earlier dramatically increases FV because of the extra compounding periods.",
          "When retired, a person draws a regular income from their lump sum. This is a present value (PV) annuity problem: the lump sum equals M × PV factor(r, n), where M is the annual income drawn and n is the number of years in retirement. Rearranging: M = lump sum ÷ PV factor.",
          "In exam questions, you may need to chain two calculations: first find the FV accumulated during working life, then use that FV as the PV to find the annual income available in retirement. Always check which formula applies to each stage.",
        ],
        latexBlocks: [
          "\\text{FV} = M \\times \\text{FV factor}(r, n)\\quad\\text{(accumulation phase)}",
          "M = \\dfrac{\\text{Target FV}}{\\text{FV factor}}\\quad\\text{(required contribution)}",
          "\\text{PV} = M_{\\text{income}} \\times \\text{PV factor}(r, n)\\implies M_{\\text{income}} = \\dfrac{\\text{lump sum}}{\\text{PV factor}}",
        ],
      },
      workedExamples: [
        {
          title: "Calculate a retirement lump sum",
          questionLatex:
            "\\text{Maya contributes }\\$500\\text{ per month to superannuation for 24 months at 0.5\\%/month. FV factor (0.5\\%, 24) = 25.432. Find the accumulated lump sum.}",
          steps: [
            {
              explanation: "Apply FV = M × FV factor.",
              latex: "\\text{FV} = 500 \\times 25.432 = \\$12\\,716.00",
            },
          ],
          finalAnswerLatex: "\\text{FV} = \\$12\\,716.00",
        },
        {
          title: "Find the monthly contribution to meet a savings goal",
          questionLatex:
            "\\text{Dan wants }\\$20\\,000\\text{ in super after 24 months at 0.5\\%/month. FV factor (0.5\\%, 24) = 25.432. Find the required monthly contribution.}",
          steps: [
            {
              explanation: "Rearrange FV = M × factor to find M.",
              latex: "M = \\dfrac{\\text{Target FV}}{\\text{FV factor}} = \\dfrac{20\\,000}{25.432}",
            },
            {
              explanation: "Divide.",
              latex: "M \\approx \\$786.77\\text{ per month}",
            },
          ],
          finalAnswerLatex: "M \\approx \\$786.77\\text{ per month}",
        },
        {
          title: "Find the sustainable annual income from a retirement lump sum",
          questionLatex:
            "\\text{A retiree has }\\$300\\,000\\text{ in super. PV factor (0.5\\%/month, 24 months) = 22.563. Find the monthly income the retiree can draw for 24 months.}",
          steps: [
            {
              explanation: "Rearrange PV = M × PV factor to find M.",
              latex: "M = \\dfrac{\\text{PV}}{\\text{PV factor}} = \\dfrac{300\\,000}{22.563}",
            },
            {
              explanation: "Divide.",
              latex: "M \\approx \\$13\\,296.03\\text{ per month}",
            },
          ],
          finalAnswerLatex: "M \\approx \\$13\\,296.03\\text{ per month}",
        },
      ],
      guidedPractice: [
        moneyAnswer(
          "y12s2-rap-g1",
          "Maya contributes $500/month for 24 months at 0.5%/month. FV factor = 25.432. Find the lump sum.",
          "",
          "12716.00",
          ["$12 716.00", "$12716.00", "12716", "$12,716.00"]
        ),
        financeChoice(
          "y12s2-rap-g2",
          "To find the monthly contribution needed to reach a target retirement sum, you:",
          "B",
          [
            "Multiply target by FV factor",
            "Divide target by FV factor",
            "Multiply target by PV factor",
            "Add the FV factor to the target",
          ],
          "M = Target FV ÷ FV factor."
        ),
        moneyAnswer(
          "y12s2-rap-g3",
          "A retiree has $150 000. PV factor (0.5%/month, 12 months) = 11.619. Find the monthly income they can draw for 12 months.",
          "",
          "12910.75",
          ["$12 910.75", "12910.75", "$12910.75"]
        ),
        financeChoice(
          "y12s2-rap-g4",
          "During the accumulation phase of superannuation, the formula used is:",
          "A",
          ["FV = M × FV factor", "PV = M × PV factor", "FV = PV × (1 + r)ⁿ", "M = PV × r"],
          "The accumulation phase uses FV = M × FV factor, since regular contributions build toward a lump sum."
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y12s2-rap-i1",
          "Sam contributes $300/month for 12 months at 1%/month. FV factor (1%, 12) = 12.683. Find the accumulated FV.",
          "",
          "3804.90",
          ["$3 804.90", "3804.9", "$3804.90"]
        ),
        moneyAnswer(
          "y12s2-rap-i2",
          "A retirement target is $50 000 in 24 months at 0.5%/month. FV factor = 25.432. Find the monthly contribution needed.",
          "",
          "1966.85",
          ["$1 966.85", "$1966.85", "1966.9", "$1,966.85"]
        ),
        moneyAnswer(
          "y12s2-rap-i3",
          "A retiree has $200 000. PV factor (1%/month, 12 months) = 11.255. Find the monthly income for 12 months.",
          "",
          "17769.43",
          ["$17 769.43", "17769.43"]
        ),
        financeChoice(
          "y12s2-rap-i4",
          "The present value annuity formula is used in retirement planning to:",
          "B",
          [
            "Find how much contributions grow over time",
            "Find the income that can be drawn from a lump sum over a fixed period",
            "Calculate depreciation of superannuation assets",
            "Determine the interest rate on a savings account",
          ],
          "PV = M × PV factor, so M = PV ÷ PV factor gives the periodic income."
        ),
        financeShortAnswer(
          "y12s2-rap-i5",
          "Two workers each retire with $250 000. Worker A draws income for 12 months (PV factor 11.255 at 1%/month); Worker B for 24 months (PV factor 21.243 at 1%/month). Which worker gets the larger monthly income?",
          "",
          "Worker A",
          ["A", "worker a", "Worker A ($22 214/month)"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using PV factor for the accumulation phase instead of FV factor.",
          fix: "Accumulation (building a lump sum from contributions) uses FV = M × FV factor. The PV factor is for the drawdown phase (finding income from a lump sum) or for loan repayments.",
        },
        {
          mistake: "Multiplying by the factor when you should divide (or vice versa).",
          fix: "FV = M × factor means: to find M, divide FV by the factor. PV = M × factor means: to find M, divide PV by the factor. To find FV or PV, multiply M by the factor.",
        },
        {
          mistake: "Using the wrong factor for the wrong time period.",
          fix: "Check that r and n in the factor table match your scenario. Monthly contributions at 0.5%/month for 24 months uses factor(0.5%, 24). Do not use an annual factor for a monthly scenario.",
        },
        {
          mistake: "Forgetting that the income phase is a PV problem, not an FV problem.",
          fix: "When a lump sum funds regular withdrawals, the lump sum is a present value today paying M per period. Use M = PV ÷ PV factor — the same structure as a loan repayment.",
        },
      ],
      masteryQuiz: [
        moneyAnswer(
          "y12s2-rap-m1",
          "Monthly contributions of $400 for 12 months at 1%/month. FV factor = 12.683. Find FV.",
          "",
          "5073.20",
          ["$5 073.20", "5073.20", "$5073.20"]
        ),
        moneyAnswer(
          "y12s2-rap-m2",
          "A target retirement balance of $30 000 is needed in 12 months at 1%/month. FV factor = 12.683. Find the monthly contribution.",
          "",
          "2365.80",
          ["$2 365.80", "$2365.80", "2365.8", "$2,365.80"]
        ),
        moneyAnswer(
          "y12s2-rap-m3",
          "A retiree has $180 000. PV factor (0.5%/month, 24 months) = 22.563. Monthly income for 24 months?",
          "",
          "7977.54",
          ["$7 977.54", "7977.54", "$7977.54"]
        ),
        financeChoice(
          "y12s2-rap-m4",
          "Longer drawdown period means:",
          "B",
          [
            "Higher monthly income from the same lump sum",
            "Lower monthly income from the same lump sum",
            "No change to monthly income",
            "The lump sum grows larger",
          ],
          "A larger PV factor (more months) means M = PV ÷ PV factor is smaller — more periods share the lump sum."
        ),
        moneyAnswer(
          "y12s2-rap-m5",
          "$250 000 lump sum, PV factor (1%/month, 24 months) = 21.243. Monthly income?",
          "",
          "11769.37",
          ["$11 769.37", "11769.37", "11769"]
        ),
        financeChoice(
          "y12s2-rap-m6",
          "Which statement about superannuation is correct?",
          "B",
          [
            "Superannuation uses the straight-line formula to grow",
            "Regular super contributions grow with compound interest to build a retirement lump sum",
            "The PV formula is used to calculate super contributions during working life",
            "Super contributions are a one-off lump-sum investment",
          ],
          "Super uses FV annuity logic: regular contributions compound over the working years."
        ),
        moneyAnswer(
          "y12s2-rap-m7",
          "Monthly contributions of $600 for 24 months at 0.5%/month. FV factor (0.5%, 24) = 25.432. FV = ?",
          "",
          "15259.20",
          ["$15 259.20", "15259.20", "$15259.20"]
        ),
        moneyAnswer(
          "y12s2-rap-m8",
          "A retiree needs $3000/month income. PV factor (0.5%/month, 12 months) = 11.619. Find the required lump sum.",
          "",
          "34857",
          ["$34 857", "$34857", "34857.00", "$34,857"]
        ),
        financeChoice(
          "y12s2-rap-m9",
          "Two people each contribute for 12 months. Person X pays $500/month; Person Y pays $800/month. Both earn 1%/month and FV factor = 12.683. Who accumulates more?",
          "B",
          ["Person X", "Person Y", "They accumulate the same", "Cannot tell"],
          "Y: 800 × 12.683 = $10 146.40 vs X: 500 × 12.683 = $6 341.50. Y accumulates more."
        ),
        moneyAnswer(
          "y12s2-rap-m10",
          "A retired teacher has $400 000. They draw income monthly for 24 months at 0.5%/month. PV factor = 22.563. Find the monthly income.",
          "",
          "17728.58",
          ["$17 728.58", "$17728.58", "17728.6", "$17,728.58"]
        ),
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
        moneyAnswer("y12s2-inv-g1", "An investment of 4000 dollars earns 5% p.a. compounded annually for 2 years. Find the balance.", "", "4410"),
        moneyAnswer("y12s2-inv-g2", "A second option earns 6% for 2 years but charges a 90 dollar fee. Find the net balance starting from 4000 dollars.", "", "4404.40", ["4404.4", "$4404.40"]),
        financeChoice("y12s2-inv-g3", "Which option above is better?", "A", ["Option 1 at 5% (balance $4410)", "Option 2 at 6% after fee (balance $4404.40)", "They are equal", "The higher rate is always better"], "After subtracting the fee, Option 1 gives a higher net balance."),
        financeChoice("y12s2-inv-g4", "Inflation of 4% and a savings rate of 2% gives a real return of:", "C", ["6%", "2%", "−2%", "4%"], "Real return ≈ 2% − 4% = −2%. The savings lose purchasing power."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-inv-i1", "Find the balance when 6000 dollars is invested at 4.5% p.a. compounded annually for 3 years.", "", "6847.00", ["6847", "6847.0", "$6847.00"]),
        moneyAnswer("y12s2-inv-i2", "A competing option pays 5% for 3 years but charges a 150 dollar fee. Find the net balance from 6000 dollars.", "", "6795.75", ["6795.8", "$6795.75"]),
        financeChoice("y12s2-inv-i3", "Which option from i1 and i2 is better?", "A", ["4.5% with no fee (higher net balance)", "5% minus fee (higher rate wins)", "They are equal", "Always choose the higher rate"], "4.5% with no fee gives a higher net balance here."),
        financeChoice("y12s2-inv-i4", "If inflation rises from 2% to 4% and your savings rate stays at 3%, your real return:", "C", ["Increases to 7%", "Stays at 3%", "Falls and becomes negative at −1%", "Falls to 1%"], "Real return = 3% − 4% = −1%."),
        moneyAnswer("y12s2-inv-i5", "An account of 10000 dollars earns 2% compounded annually for 1 year. If inflation is 3%, what is the real value of the account after one year in today's dollars?", "", "9903", ["$9903", "9903.00"]),
      ],
      commonMistakes: [
        { mistake: "Comparing investments by advertised rate only.", fix: "Always compute net balance after fees over the same term." },
        { mistake: "Confusing inflation rate with interest rate.", fix: "Real return = interest rate − inflation rate. These are different quantities." },
        { mistake: "Treating nominal and effective rates as identical.", fix: "More frequent compounding gives a slightly higher effective rate than the nominal rate." },
        { mistake: "Forgetting to subtract the fee when finding net return.", fix: "Net return = A − P − fees. Fees reduce the benefit of a higher rate." },
      ],
      masteryQuiz: [
        moneyAnswer("y12s2-inv-m1", "Find A for 8000 dollars at 3% p.a. compounded annually for 2 years.", "", "8487.20", ["8487.2", "$8487.20"]),
        moneyAnswer("y12s2-inv-m2", "Option B gives 8000 dollars at 4% for 2 years with a 110 dollar fee. Find the net balance.", "", "8542.80", ["8542.8", "$8542.80"]),
        financeChoice("y12s2-inv-m3", "Comparing Option A ($8487.20) and Option B ($8542.80), which is better?", "B", ["Option A", "Option B", "Equal", "Need more information"], "Option B's net balance is higher."),
        financeChoice("y12s2-inv-m4", "A real return of −1% means:", "C", ["You earn 1% more than inflation", "You earn exactly 1%", "Your purchasing power decreases by approximately 1%", "You lose 1% in dollar terms"], "Negative real return means less purchasing power, not less actual dollars."),
        moneyAnswer("y12s2-inv-m5", "Net return for a 5000 dollar investment growing to 5400 dollars with a 50 dollar fee.", "", "350", ["$350"]),
        financeChoice("y12s2-inv-m6", "Two accounts both have no fees. Account A earns 4% compounded annually; Account B earns 4% compounded monthly. Which is better?", "B", ["Account A", "Account B", "They are identical", "Cannot compare"], "Monthly compounding gives a slightly higher effective annual rate."),
        moneyAnswer("y12s2-inv-m7", "6000 dollars invested at 5% p.a. for 1 year compounded annually. Find the interest earned.", "", "300", ["$300"]),
        financeChoice("y12s2-inv-m8", "Savings earn 4% but inflation is 4%. The real return is:", "D", ["4%", "8%", "−4%", "0%"], "Real return ≈ 4% − 4% = 0%. No real gain."),
        moneyAnswer("y12s2-inv-m9", "An investment of 2000 dollars at 6% for 3 years compounded annually. Find the balance to the nearest cent.", "", "2382.03", ["$2382.03", "2382.0"]),
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
        moneyAnswer("y12s2-credit-g1", "A credit card balance of 600 dollars has an annual interest rate of 18%. Find the monthly interest charge.", "", "9", ["$9", "9.00"]),
        moneyAnswer("y12s2-credit-g2", "A BNPL purchase of 320 dollars is split into 4 equal fortnightly payments. Find each payment.", "", "80", ["$80", "80.00"]),
        financeChoice("y12s2-credit-g3", "A credit card with a 55-day interest-free period means:", "B", ["Interest always applies", "No interest if the full balance is paid within 55 days", "The rate is 55%", "You must wait 55 days to use it"], "Paying the full balance in the interest-free period avoids interest charges."),
        financeChoice("y12s2-credit-g4", "Total repayment on a credit card is always:", "B", ["Equal to the purchase price", "Greater than or equal to the purchase price", "Less than the purchase price", "Fixed regardless of interest rate"], "Interest adds to the total, so total repayment ≥ purchase price."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-credit-i1", "A card balance of 1200 dollars has an annual rate of 21%. Find the monthly interest.", "", "21", ["$21", "21.00"]),
        moneyAnswer("y12s2-credit-i2", "After paying a 200 dollar repayment, the new card balance is 1021 dollars before this month's interest. How did we get there?", "", "1021", ["$1021"]),
        moneyAnswer("y12s2-credit-i3", "A BNPL service charges $0 interest but a $10 late fee per missed payment. If 2 payments are missed on a $400 purchase, find the total cost.", "", "420", ["$420"]),
        financeChoice("y12s2-credit-i4", "Carrying a credit card balance for 12 months at 18% p.a. means you pay approximately:", "B", ["No extra cost", "18% extra on the outstanding balance", "1% extra over 12 months", "12% extra on the original price"], "Monthly charges of 1.5% compound over 12 months, approximately 18% annually."),
        moneyAnswer("y12s2-credit-i5", "A 1000 dollar purchase on a card at 20% p.a. is repaid in full after 1 month. Find the total cost.", "", "1016.67", ["$1016.67", "1016.7"]),
      ],
      commonMistakes: [
        { mistake: "Using the annual rate directly instead of monthly rate.", fix: "Divide annual rate by 12 for monthly interest: I = P × (r/12)." },
        { mistake: "Thinking BNPL is always free.", fix: "BNPL has no explicit interest but may charge late fees. Compare the total cost including any penalties." },
        { mistake: "Confusing interest-free period with zero interest rate.", fix: "The interest-free period only applies if the full balance is paid on time. After the period, the full annual rate applies." },
        { mistake: "Forgetting that a credit balance compounds.", fix: "Each month, interest is added to the balance before the next month's interest is calculated." },
      ],
      masteryQuiz: [
        moneyAnswer("y12s2-credit-m1", "Find monthly interest on a 900 dollar balance at 18% p.a.", "", "13.50", ["$13.50", "13.5"]),
        financeChoice("y12s2-credit-m2", "Monthly interest rate for a card at 24% p.a. is:", "A", ["2%", "24%", "12%", "0.24%"], "Monthly rate = 24/12 = 2%."),
        moneyAnswer("y12s2-credit-m3", "A 500 dollar BNPL purchase is split into 4 fortnightly payments. Find each payment.", "", "125", ["$125"]),
        moneyAnswer("y12s2-credit-m4", "A credit card balance of 2000 dollars has a 20% annual rate. Find the monthly interest.", "", "33.33", ["$33.33"]),
        moneyAnswer("y12s2-credit-m5", "New balance after starting at 2000 dollars, adding monthly interest (rate 20% p.a.), and paying 150 dollars.", "", "1883.33", ["$1883.33", "1883.3"]),
        moneyAnswer("y12s2-credit-m6", "Find the total cost of a 600 dollar purchase repaid monthly over 3 months with $5 interest per month.", "", "615", ["$615"]),
        financeChoice("y12s2-credit-m7", "An interest-free period of 55 days means:", "A", ["No interest if full balance paid within 55 days", "No interest ever", "55% annual rate", "Interest starts after 55 months"], "Pay in full within 55 days to avoid interest."),
        moneyAnswer("y12s2-credit-m8", "A 240 dollar purchase on BNPL: 4 instalments of 60 dollars. What is the total paid?", "", "240", ["$240"]),
        financeChoice("y12s2-credit-m9", "Comparing credit card and BNPL for the same purchase, the key advantage of BNPL (when paid on time) is:", "B", ["Higher interest", "No interest charged", "Longer interest-free period", "Lower purchase price"], "BNPL typically charges no interest if payments are made on time."),
        moneyAnswer("y12s2-credit-m10", "If saving first avoids one month of credit-card interest on an 800 dollar purchase at 18% p.a., find the interest avoided.", "", "12", ["$12", "12.00"]),
      ],
    };
  }

  if (lesson.slug === "shares-dividends-brokerage") {
    return {
      ...base,
      description:
        "Calculate total dividends, dividend yield, brokerage fees, capital gain or loss, and total return from a share investment.",
      learningIntention:
        "Analyse a share investment by calculating dividends, dividend yield, brokerage costs, capital gain or loss, and total return.",
      successCriteria: [
        "Calculate total annual dividends as number of shares × dividend per share.",
        "Find dividend yield = (dividend per share ÷ market price) × 100%.",
        "Calculate total purchase cost and net sale proceeds including brokerage.",
        "Determine capital gain or capital loss from a share transaction.",
        "Calculate total return combining dividends and capital gain.",
      ],
      teaching: {
        paragraphs: [
          "When you buy shares in a company, you become a part-owner and may receive a regular payment called a dividend. The total annual dividend is simply the number of shares you own multiplied by the dividend paid per share each year.",
          "Dividend yield expresses the annual dividend as a percentage of the share's current market price. A higher yield means a better income return relative to the price paid. Use the formula: dividend yield = (dividend per share ÷ market price) × 100%.",
          "Brokerage is the fee charged by a stockbroker every time you buy or sell shares. It is usually a percentage of the transaction value. Brokerage on a purchase increases your total cost; brokerage on a sale reduces your net proceeds.",
          "Capital gain occurs when you sell shares for more than you paid (net of brokerage). Capital loss occurs when you sell for less. Total return from a share investment combines any capital gain and the dividends received over the holding period.",
        ],
        latexBlocks: [
          "\\text{Total dividend} = \\text{shares} \\times \\text{dividend per share}",
          "\\text{Dividend yield} = \\dfrac{\\text{dividend per share}}{\\text{market price}} \\times 100\\%",
          "\\text{Total purchase cost} = \\text{shares} \\times \\text{price} + \\text{brokerage}",
          "\\text{Capital gain/loss} = \\text{net proceeds} - \\text{total purchase cost}",
        ],
      },
      workedExamples: [
        {
          title: "Calculate total dividends and dividend yield",
          questionLatex:
            "\\text{Mei owns 500 shares in a company priced at }\\$3.20\\text{. The annual dividend is }\\$0.16\\text{ per share. Find the total annual dividend and dividend yield.}",
          steps: [
            {
              explanation: "Calculate the total annual dividend.",
              latex: "\\text{Total dividend} = 500 \\times 0.16 = \\$80.00",
            },
            {
              explanation: "Calculate the dividend yield.",
              latex:
                "\\text{Yield} = \\dfrac{0.16}{3.20} \\times 100\\% = 5\\%",
            },
          ],
          finalAnswerLatex:
            "\\text{Total dividend} = \\$80.00;\\quad \\text{Dividend yield} = 5\\%",
        },
        {
          title: "Calculate total cost of buying shares",
          questionLatex:
            "\\text{Jake buys 200 shares at }\\$4.50\\text{ each. Brokerage is 0.5\\% of the transaction value. Find the total purchase cost.}",
          steps: [
            {
              explanation: "Find the base purchase value.",
              latex: "\\text{Value} = 200 \\times 4.50 = \\$900.00",
            },
            {
              explanation: "Calculate brokerage on the purchase.",
              latex: "\\text{Brokerage} = 900 \\times 0.005 = \\$4.50",
            },
            {
              explanation: "Add brokerage to get the total cost.",
              latex: "\\text{Total cost} = 900 + 4.50 = \\$904.50",
            },
          ],
          finalAnswerLatex: "\\text{Total purchase cost} = \\$904.50",
        },
        {
          title: "Calculate net proceeds and capital gain",
          questionLatex:
            "\\text{Jake later sells his 200 shares at }\\$5.10\\text{ each with 0.5\\% brokerage. His purchase cost was }\\$904.50\\text{. Find his capital gain.}",
          steps: [
            {
              explanation: "Find the gross sale value.",
              latex: "\\text{Gross proceeds} = 200 \\times 5.10 = \\$1020.00",
            },
            {
              explanation: "Deduct brokerage from sale proceeds.",
              latex:
                "\\text{Brokerage} = 1020 \\times 0.005 = \\$5.10 \\implies \\text{Net proceeds} = 1020 - 5.10 = \\$1014.90",
            },
            {
              explanation: "Capital gain = net proceeds − total purchase cost.",
              latex:
                "\\text{Capital gain} = 1014.90 - 904.50 = \\$110.40",
            },
          ],
          finalAnswerLatex: "\\text{Capital gain} = \\$110.40",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y12s2-sdb-g1",
          "300 shares pay an annual dividend of $0.24 per share. Total annual dividend?",
          "B",
          ["$24.00", "$72.00", "$240.00", "$0.24"],
          "Total dividend = 300 × $0.24 = $72.00."
        ),
        financeChoice(
          "y12s2-sdb-g2",
          "A share is priced at $4.00 and pays a dividend of $0.20 per share. Dividend yield?",
          "C",
          ["20%", "0.05%", "5%", "0.5%"],
          "Yield = 0.20 ÷ 4.00 × 100% = 5%."
        ),
        financeChoice(
          "y12s2-sdb-g3",
          "100 shares are bought at $5.00 each. Brokerage is 1%. Total purchase cost?",
          "C",
          ["$500.00", "$510.00", "$505.00", "$501.00"],
          "Value = 100 × $5 = $500. Brokerage = $500 × 0.01 = $5. Total = $505."
        ),
        financeChoice(
          "y12s2-sdb-g4",
          "Brokerage in a share transaction is best described as:",
          "B",
          [
            "The dividend paid by the company",
            "A fee charged by the broker for buying or selling shares",
            "The profit from selling shares",
            "Tax on share income",
          ],
          "Brokerage is the broker's service fee, charged as a percentage of the transaction value."
        ),
      ],
      independentPractice: [
        financeChoice(
          "y12s2-sdb-i1",
          "You own 150 shares that pay $0.30 dividend per share per year. Total annual dividend?",
          "B",
          ["$300.00", "$45.00", "$4.50", "$150.00"],
          "Total = 150 × $0.30 = $45.00."
        ),
        moneyAnswer(
          "y12s2-sdb-i2",
          "A share is priced at $6.00 and pays an annual dividend of $0.18 per share. Find the dividend yield as a percentage.",
          "",
          "3%",
          ["3", "3.0", "3.00"]
        ),
        financeChoice(
          "y12s2-sdb-i3",
          "You buy 200 shares at $2.50 and sell them at $3.50. Ignoring brokerage, what is the capital gain?",
          "C",
          ["$100", "$350", "$200", "$250"],
          "Capital gain = 200 × ($3.50 − $2.50) = 200 × $1.00 = $200."
        ),
        moneyAnswer(
          "y12s2-sdb-i4",
          "You buy 400 shares at $3.00 each. Brokerage is 0.5%. Find the total purchase cost.",
          "",
          "1206",
          ["$1206", "1206.00", "$1206.00"]
        ),
        financeChoice(
          "y12s2-sdb-i5",
          "You sell 500 shares at $4.00 each with 0.5% brokerage. Net proceeds?",
          "B",
          ["$2000.00", "$1990.00", "$2010.00", "$1980.00"],
          "Gross = $2000. Brokerage = $10. Net proceeds = $2000 − $10 = $1990."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Confusing dividend with dividend yield.",
          fix: "Dividend is the dollar amount per share. Dividend yield is dividend ÷ price × 100%. They are related but different — one is dollars, the other is a percentage.",
        },
        {
          mistake: "Forgetting to subtract brokerage from sale proceeds.",
          fix: "Brokerage is charged on both buying and selling. Deduct brokerage from the gross sale value to get net proceeds before calculating capital gain.",
        },
        {
          mistake: "Calculating capital gain as selling price − buying price per share (ignoring brokerage in total cost).",
          fix: "Capital gain = net proceeds (after brokerage) − total purchase cost (including brokerage). Both transactions must include brokerage to get the true profit.",
        },
        {
          mistake: "Using price per share instead of total transaction value when calculating brokerage.",
          fix: "Brokerage is a percentage of the total transaction value (shares × price), not the price per share. Multiply the number of shares by the price first.",
        },
      ],
      masteryQuiz: [
        financeChoice(
          "y12s2-sdb-m1",
          "250 shares pay $0.40 dividend per share per year. Total annual dividend?",
          "C",
          ["$40.00", "$250.00", "$100.00", "$400.00"],
          "Total = 250 × $0.40 = $100."
        ),
        moneyAnswer(
          "y12s2-sdb-m2",
          "Share price $8.00, annual dividend $0.32 per share. Find the dividend yield.",
          "",
          "4%",
          ["4", "4.0", "4.00"]
        ),
        financeChoice(
          "y12s2-sdb-m3",
          "Share A: price $5.00, dividend $0.20. Share B: price $10.00, dividend $0.35. Which has the higher dividend yield?",
          "A",
          [
            "Share A at 4%",
            "Share B at 3.5%",
            "They are equal",
            "Cannot determine without the number of shares",
          ],
          "Yield A = 0.20÷5.00×100%=4%. Yield B = 0.35÷10.00×100%=3.5%. Share A is higher."
        ),
        moneyAnswer(
          "y12s2-sdb-m4",
          "Buy 500 shares at $3.20 each, brokerage 0.5%. Find the total purchase cost.",
          "",
          "1608",
          ["$1608", "1608.00", "$1608.00"]
        ),
        moneyAnswer(
          "y12s2-sdb-m5",
          "Sell 500 shares at $3.80 each, brokerage 0.5%. Find the net proceeds.",
          "",
          "1890.50",
          ["$1890.50", "1890.5", "$1890.5"]
        ),
        moneyAnswer(
          "y12s2-sdb-m6",
          "Using the purchase cost of $1608 and net proceeds of $1890.50, find the capital gain.",
          "",
          "282.50",
          ["$282.50", "282.5", "$282.5"]
        ),
        financeChoice(
          "y12s2-sdb-m7",
          "Total return from a share investment is best calculated as:",
          "C",
          [
            "Capital gain only",
            "Total dividends only",
            "Capital gain + total dividends − total brokerage paid",
            "Selling price − buying price",
          ],
          "Total return combines the price change (capital gain/loss) and income received (dividends), net of all costs."
        ),
        moneyAnswer(
          "y12s2-sdb-m8",
          "500 shares are held for 2 years. Dividend is $0.16 per share per year. Total dividends received over 2 years?",
          "",
          "160",
          ["$160", "160.00", "$160.00"]
        ),
        financeChoice(
          "y12s2-sdb-m9",
          "Brokerage is typically charged:",
          "C",
          [
            "Only when buying shares",
            "Only when selling shares",
            "On both buying and selling transactions",
            "Never on ASX-listed companies",
          ],
          "Most brokers charge a fee on every transaction — both purchases and sales."
        ),
        financeChoice(
          "y12s2-sdb-m10",
          "You buy 300 shares at $5.50 (brokerage $10) and sell at $4.80 (brokerage $10). Capital outcome?",
          "B",
          [
            "Capital gain of $230",
            "Capital loss of $230",
            "Capital gain of $90",
            "Capital loss of $90",
          ],
          "Cost = 300×$5.50+$10=$1660. Proceeds = 300×$4.80−$10=$1430. Loss = $1430−$1660 = −$230."
        ),
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
        "Calculate the monthly repayment using $M = P × r / (1 − (1+r)^{−n})$.",
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
          "",
          "531.85",
          ["$531.85", "531.85", "531.9", "$531.9"]
        ),
        moneyAnswer(
          "y12s2-pv-g3",
          "Using the repayment from the previous question ($531.85 per month for 24 months on a $12,000 loan), find the total interest paid.",
          "",
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
        financeShortAnswer(
          "y12s2-pv-i1",
          "For a 6% p.a. loan compounded monthly, find the periodic rate r used in the loan repayment formula.",
          "",
          "0.005",
          ["0.5%"]
        ),
        moneyAnswer(
          "y12s2-pv-i2",
          "A $15,000 loan at 6% p.a. compounded monthly is repaid over 36 months. Find the monthly repayment.",
          "",
          "456.33",
          ["$456.33", "456.33", "456.3", "$456.3"]
        ),
        moneyAnswer(
          "y12s2-pv-i3",
          "Using the repayment from the previous question ($456.33 per month for 36 months on a $15,000 loan), find the total interest paid.",
          "",
          "1427.88",
          ["$1427.88", "1427.88", "1427.9", "$1,427.88"]
        ),
        moneyAnswer(
          "y12s2-pv-i4",
          "A $10,000 loan at 6% p.a. monthly over 24 months has repayments of $443.21. Find the total amount repaid.",
          "",
          "10637.04",
          ["$10,637.04", "10637.0", "$10637.04"]
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
          "$M = Pr / (1 − (1+r)^{−n})$ is the standard loan repayment formula."
        ),
        moneyAnswer(
          "y12s2-pv-m3",
          "Find the monthly repayment on a $10,000 loan at 6% p.a. compounded monthly over 24 months.",
          "",
          "443.21",
          ["$443.21", "443.21", "443.2", "$443.2"]
        ),
        moneyAnswer(
          "y12s2-pv-m4",
          "Using the repayment from the previous question ($443.21 per month for 24 months on a $10,000 loan), find the total interest paid.",
          "",
          "637.04",
          ["$637.04", "637.04", "637.0", "$637.0"]
        ),
        moneyAnswer(
          "y12s2-pv-m5",
          "Find the monthly repayment on a $10,000 loan at 6% p.a. compounded monthly over 36 months.",
          "",
          "304.22",
          ["$304.22", "304.22", "304.2", "$304.2"]
        ),
        moneyAnswer(
          "y12s2-pv-m6",
          "Using the repayment from the previous question ($304.22 per month for 36 months on a $10,000 loan), find the total interest paid.",
          "",
          "951.92",
          ["$951.92", "951.92", "951.9", "$951.9"]
        ),
        moneyAnswer(
          "y12s2-pv-m7",
          "A $10,000 loan at 6% p.a. monthly has M = $304.22 over 36 months. Find the total amount repaid.",
          "",
          "10951.92",
          ["$10,951.92", "$10951.92", "10951.9"]
        ),
        financeShortAnswer(
          "y12s2-pv-m8",
          "Compared to the 24-month loan, which option has the higher total interest: the 24-month loan or the 36-month loan?",
          "",
          "36-month loan",
          ["36 month loan", "36 months", "36-month", "36 month"]
        ),
        financeChoice(
          "y12s2-pv-m9",
          "To rearrange $P = M × (1 − (1+r)^{−n}) / r$ to make $M$ the subject, the correct step is:",
          "B",
          [
            "Divide both sides by $(1 − (1+r)^{−n})$ only",
            "Multiply both sides by $r$, then divide by $(1 − (1+r)^{−n})$",
            "Subtract r from both sides first",
            "Multiply both sides by n",
          ],
          "M = P × r / (1 − (1+r)^(−n))."
        ),
        moneyAnswer(
          "y12s2-pv-m10",
          "A loan has monthly repayments of $350 over 30 months. Find the total amount paid.",
          "",
          "10500",
          ["$10,500", "$10500", "10500.00"]
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
      moneyAnswer("y12s2-fin-exam-g1", "An investment of 3000 dollars earns 4% p.a. compounded annually for 2 years. Find the balance.", "", "3244.80", ["3244.8", "$3244.8"]),
      moneyAnswer("y12s2-fin-exam-g2", "A car worth 20000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "", "16200"),
      moneyAnswer("y12s2-fin-exam-g3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.005B_n-350,\\quad B_0=10000", "9700"),
      financeChoice("y12s2-fin-exam-g4", "An investment has a higher rate but a large fee. Which comparison is fairest?", "C", ["Highest rate only", "Lowest fee only", "Net balance over the same term", "The first year only"], "Financial products should be compared over the same term after fees."),
    ],
    independentPractice: [
      moneyAnswer("y12s2-fin-exam-i1", "A 4500 dollar account earns 3.5% p.a. compounded annually for 2 years. Find the balance to the nearest cent.", "", "4820.51"),
      moneyAnswer("y12s2-fin-exam-i2", "Equipment worth 8000 dollars depreciates by 15% in one year. Find its value after one year.", "", "6800"),
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
      moneyAnswer("y12s2-fin-exam-m3", "An investment of 2500 dollars earns 4% p.a. compounded annually for 2 years. Find the balance.", "", "2704"),
      moneyAnswer("y12s2-fin-exam-m4", "A device worth 1600 dollars depreciates by 20% in one year. Find its value.", "", "1280"),
      moneyAnswer("y12s2-fin-exam-m5", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.006B_n-450,\\quad B_0=28000", "27718"),
      moneyAnswer("y12s2-fin-exam-m6", "A savings plan follows the recurrence shown. Use the starting balance to find the next balance.", "S_{n+1}=1.005S_n+200,\\quad S_0=1000", "1205"),
      moneyAnswer("y12s2-fin-exam-m7", "A 5000 dollar investment grows to 5360 dollars. Find the interest earned.", "\\text{initial}=\\$5000,\\quad \\text{final}=\\$5360", "360"),
      financeChoice("y12s2-fin-exam-m8", "Option A has a final balance of 4320 dollars. Option B has 4390 dollars but a 90 dollar fee. Which option has the higher net balance?", "A", ["Option A", "Option B", "They are equal", "The fee should be ignored"], "Option B's net balance is lower after the fee, so Option A is higher."),
      financeChoice("y12s2-fin-exam-m9", "Which recurrence best models a loan with 0.6% interest each month followed by a 450 dollar repayment?", "C", ["B_{n+1}=0.994B_n-450", "B_{n+1}=1.006B_n+450", "B_{n+1}=1.006B_n-450", "B_{n+1}=450B_n-1.006"], "The loan balance is multiplied by the interest factor, then the repayment is subtracted."),
      financeChoice("y12s2-fin-exam-m10", "A loan balance table shows 25000, 24920, 24835 after repayments. Which conclusion is best?", "B", ["The loan is increasing", "The loan is decreasing slowly", "The loan is fully paid off", "The interest rate is definitely zero"], "The balances are decreasing, but there is still a large amount owing."),
    ],
  };
}

