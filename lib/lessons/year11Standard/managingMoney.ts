import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import {
  financeChoice,
  financeShortAnswer as baseFinanceShortAnswer,
  moneyAnswer as baseMoneyAnswer,
} from "../questionHelpers";

function managingMoneyFeedback(prompt: string, latex: string, answer: string): string {
  const context = `${prompt} ${latex}`.toLowerCase();

  if (context.includes("surplus")) {
    return `A surplus is what is left after all listed expenses and planned savings come out of income. Add the outgoing amounts first, then subtract from income to get ${answer}.`;
  }
  if (context.includes("deficit")) {
    return `A deficit means expenses are bigger than income. Subtract income from expenses to find the shortfall, which is ${answer}.`;
  }
  if (context.includes("4-week") || context.includes("4 weeks") || context.includes("monthly estimate")) {
    return `The question asks for a simple 4-week estimate, so keep the weekly amount unchanged and multiply it by 4. That gives ${answer}.`;
  }
  if (context.includes("how many") && context.includes("weeks")) {
    return `First find how much money is still needed, then divide by the regular weekly saving. The quotient tells how many full saving weeks are needed: ${answer}.`;
  }
  if (context.includes("how much more") || context.includes("current savings")) {
    return `Compare the target with what has already been saved. Subtract current savings from the goal or cost to find the remaining amount: ${answer}.`;
  }
  if (context.includes("deposits") || context.includes("deposited") || context.includes("saves") || context.includes("saved")) {
    return `Regular saving is repeated addition, so multiply the weekly deposit by the number of weeks. Use the existing balance too if the question gives one; this gives ${answer}.`;
  }
  if (context.includes("credit card") || context.includes("minimum payment") || context.includes("bnpl") || context.includes("buy now") || context.includes("annual fee") || context.includes("outstanding balance") || context.includes("monthly interest") || context.includes("instalment")) {
    if (context.includes("minimum payment")) {
      return `The minimum payment is a percentage of the outstanding balance. Multiply the balance by the minimum payment rate to find ${answer}.`;
    }
    if (context.includes("new balance") || (context.includes("after") && context.includes("payment"))) {
      return `New balance = old balance + monthly interest − payment made. Add the interest charge first, then subtract the payment to get ${answer}.`;
    }
    if (context.includes("monthly interest") || (context.includes("interest") && context.includes("month"))) {
      return `Monthly interest = balance × annual rate ÷ 12. Convert the annual rate to a decimal, then divide by 12 for the monthly rate. This gives ${answer}.`;
    }
    if (context.includes("bnpl") || context.includes("buy now") || context.includes("instalment") || context.includes("equal") ) {
      return `BNPL splits the purchase into equal instalments. Divide the total price by the number of payments to get ${answer}.`;
    }
    return `Credit card charges depend on whether the full balance is paid by the due date. If not, interest accrues at the annual rate. The answer is ${answer}.`;
  }
  if (context.includes("gst") || context.includes("goods and services tax")) {
    if (context.includes("pre-gst") || context.includes("before gst") || context.includes("excluding gst") || context.includes("divide by 1.10") || context.includes("÷ 1.10")) {
      return `To find the pre-GST price, divide the inclusive price by 1.10 (since inclusive = pre-GST × 1.10). That gives ${answer}.`;
    }
    if (context.includes("gst amount") || (context.includes("gst") && (context.includes("how much") || context.includes("find the gst")))) {
      if (context.includes("inclusive") || context.includes("including gst")) {
        return `The GST in an inclusive price is found by dividing the inclusive price by 11. That gives ${answer}.`;
      }
      return `GST is 10% of the pre-GST price. Multiply the pre-GST price by 0.10 to find the GST amount: ${answer}.`;
    }
    return `GST-inclusive price = pre-GST price × 1.10. To reverse: pre-GST = inclusive ÷ 1.10. The answer is ${answer}.`;
  }
  if (context.includes("unit price") || context.includes("unit pricing") || context.includes("per 100") || context.includes("per gram") || context.includes("per ml") || context.includes("better value") || context.includes("best buy") || context.includes("best value") || context.includes("value")) {
    return `Unit pricing compares value by finding the cost per unit (per gram, per mL, per 100 g). Divide price by quantity for each option, then choose the lowest cost per unit: ${answer}.`;
  }
  if (context.includes("simple interest") || context.includes("p.a.") || context.includes("principal")) {
    if (context.includes("total amount")) {
      return `Simple interest is earned on the original principal only. When the question asks for the total amount, add the interest to the starting principal to get ${answer}.`;
    }
    return `Simple interest uses the original principal, the decimal rate, and the time in years. Convert the percent rate first, then use I = Prt to get ${answer}.`;
  }
  if (context.includes("as a decimal")) {
    return `Percent means out of 100, so divide the percentage by 100 before using it in a formula. That is why the decimal form is ${answer}.`;
  }
  if (context.includes("discount")) {
    if (context.includes("sale price") || context.includes("final cost")) {
      return `A discount reduces the original price before any extra fees are added. Find the discount, subtract it, then include the fee if there is one to get ${answer}.`;
    }
    return `A discount is a percentage of the original price, not a number of dollars copied from the percent sign. Multiply the original price by the discount rate to get ${answer}.`;
  }
  if (context.includes("delivery") || context.includes("booking fee") || context.includes("service fee") || context.includes("fee")) {
    return `Fees increase the amount paid, so include them after the item price and after any discount or coupon. The total cost is ${answer}.`;
  }
  if (context.includes("coupon")) {
    return `A coupon reduces the price, while delivery adds to it. Apply both changes in the direction they affect the total to get ${answer}.`;
  }
  if (context.includes("cheaper")) {
    return `To compare options fairly, subtract the lower total from the higher total. The difference between the two costs is ${answer}.`;
  }

  return `Read the money context first: decide whether you need a surplus, saving total, interest amount, or final cost. Following that calculation gives ${answer}.`;
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
    explanation: managingMoneyFeedback(prompt, latex, answer),
  };
}

function financeShortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseFinanceShortAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: managingMoneyFeedback(prompt, latex, answer),
  };
}

function managingMoneyWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "budgets-cash-flow") {
    return [
      {
        title: "Finding a weekly surplus",
        questionLatex:
          "\\begin{array}{c|c}\\text{Income}&\\$420\\\\\\text{Transport}&\\$60\\\\\\text{Food}&\\$95\\\\\\text{Subscriptions}&\\$18\\\\\\text{Savings}&\\$80\\end{array}",
        steps: [
          { explanation: "Add the expenses and planned savings.", latex: "60+95+18+80=253" },
          { explanation: "Subtract this from income to find the surplus.", latex: "420-253=167" },
        ],
        finalAnswerLatex: "\\$167\\text{ surplus}",
      },
      {
        title: "Recognising a deficit",
        questionLatex:
          "\\text{Income }\\$310,\\ \\text{total expenses }\\$345",
        steps: [
          { explanation: "A deficit occurs when expenses are greater than income." },
          { explanation: "Find the difference.", latex: "345-310=35" },
        ],
        finalAnswerLatex: "\\$35\\text{ deficit}",
      },
      {
        title: "Estimating a monthly amount",
        questionLatex: "\\text{A student saves }\\$45\\text{ each week. Estimate 4-week monthly savings.}",
        steps: [
          { explanation: "Use 4 weeks as a simple monthly estimate." },
          { explanation: "Multiply the weekly amount by 4.", latex: "45\\times 4=180" },
        ],
        finalAnswerLatex: "\\$180",
      },
    ];
  }

  if (slug === "saving-spending-financial-goals") {
    return [
      {
        title: "Weeks to reach a savings goal",
        questionLatex:
          "\\begin{array}{c|c}\\text{Goal}&\\$900\\\\\\text{Current savings}&\\$240\\\\\\text{Weekly deposit}&\\$55\\end{array}",
        steps: [
          { explanation: "Find the remaining amount.", latex: "900-240=660" },
          { explanation: "Divide by the weekly deposit.", latex: "660\\div 55=12" },
        ],
        finalAnswerLatex: "12\\text{ weeks}",
      },
      {
        title: "Comparing saving plans",
        questionLatex:
          "\\text{Plan A: }\\$40\\text{/week for 10 weeks. Plan B: }\\$55\\text{/week for 8 weeks.}",
        steps: [
          { explanation: "Calculate each total.", latex: "40\\times 10=400,\\quad 55\\times 8=440" },
          { explanation: "Compare the totals over the stated time." },
        ],
        finalAnswerLatex: "\\text{Plan B saves }\\$40\\text{ more.}",
      },
      {
        title: "Affordability after planned expenses",
        questionLatex:
          "\\text{Income }\\$360,\\ \\text{planned expenses }\\$250,\\ \\text{purchase }\\$95",
        steps: [
          { explanation: "Find money left after planned expenses.", latex: "360-250=110" },
          { explanation: "Compare the purchase cost with the money left." },
        ],
        finalAnswerLatex: "\\text{Affordable, with }\\$15\\text{ left.}",
      },
    ];
  }

  if (slug === "simple-interest") {
    return [
      {
        title: "Calculating simple interest",
        questionLatex:
          "\\text{Principal }\\$1500,\\ \\text{rate }4\\%\\text{ p.a., time }2\\text{ years}",
        steps: [
          { explanation: "Use simple interest with the rate as a decimal.", latex: "I=Prt" },
          { explanation: "Substitute the values.", latex: "I=1500\\times 0.04\\times 2=120" },
        ],
        finalAnswerLatex: "\\$120",
      },
      {
        title: "Finding the total amount",
        questionLatex: "\\text{Deposit }\\$800\\text{ earns }\\$72\\text{ simple interest.}",
        steps: [
          { explanation: "The total amount is principal plus interest." },
          { explanation: "Add the two amounts.", latex: "800+72=872" },
        ],
        finalAnswerLatex: "\\$872",
      },
      {
        title: "Comparing two simple-interest options",
        questionLatex:
          "\\text{Option A: }\\$1000\\text{ at }5\\%\\text{ for 1 year. Option B: }\\$1000\\text{ at }4\\%\\text{ for 2 years.}",
        steps: [
          { explanation: "Calculate the interest for each option.", latex: "A=1000(0.05)(1)=50,\\quad B=1000(0.04)(2)=80" },
          { explanation: "The higher interest is better for the saver in this context." },
        ],
        finalAnswerLatex: "\\text{Option B earns more interest.}",
      },
    ];
  }

  if (slug === "comparing-financial-decisions") {
    return [
      {
        title: "Comparing total cost with fees",
        questionLatex:
          "\\text{Option A: }\\$280\\text{ plus }\\$25\\text{ delivery. Option B: }\\$315\\text{ with free delivery.}",
        steps: [
          { explanation: "Find each total cost.", latex: "A=280+25=305,\\quad B=315" },
          { explanation: "Choose the lower total cost if the items are equivalent." },
        ],
        finalAnswerLatex: "\\text{Option A is cheaper by }\\$10.",
      },
      {
        title: "Discount then fee",
        questionLatex:
          "\\text{A }\\$240\\text{ item has }20\\%\\text{ off, then a }\\$12\\text{ service fee.}",
        steps: [
          { explanation: "Calculate the discount.", latex: "0.20\\times 240=48" },
          { explanation: "Subtract the discount and add the fee.", latex: "240-48+12=204" },
        ],
        finalAnswerLatex: "\\$204",
      },
      {
        title: "Best value is not always lowest upfront price",
        questionLatex:
          "\\text{Plan A costs }\\$18\\text{/month plus }\\$40\\text{ setup. Plan B costs }\\$25\\text{/month with no setup for 4 months.}",
        steps: [
          { explanation: "Compare over the same 4-month period.", latex: "A=18\\times 4+40=112,\\quad B=25\\times 4=100" },
          { explanation: "Use total cost, not just the monthly price." },
        ],
        finalAnswerLatex: "\\text{Plan B is cheaper for 4 months.}",
      },
    ];
  }

  if (slug === "credit-cards-consumer-finance") {
    return [
      {
        title: "Monthly interest on a credit card balance",
        questionLatex:
          "\\text{A credit card balance is }\\$800.\\text{ The annual interest rate is }18\\%\\text{ p.a. Find the monthly interest charge.}",
        steps: [
          { explanation: "Convert annual rate to monthly rate.", latex: "\\text{monthly rate}=\\frac{18\\%}{12}=1.5\\%" },
          { explanation: "Apply to the balance.", latex: "I=800\\times 0.015=\\$12" },
        ],
        finalAnswerLatex: "\\$12",
      },
      {
        title: "Minimum payment and new balance",
        questionLatex:
          "\\text{Balance }\\$600,\\text{ monthly interest }\\$10,\\text{ minimum payment }2\\%\\text{ of balance.}",
        steps: [
          { explanation: "Find the minimum payment.", latex: "0.02\\times 600=\\$12" },
          { explanation: "New balance = old balance + interest − payment.", latex: "600+10-12=\\$598" },
        ],
        finalAnswerLatex: "\\text{New balance }=\\$598",
      },
      {
        title: "BNPL equal instalments",
        questionLatex:
          "\\text{A }\\$200\\text{ purchase is split into 4 equal fortnightly BNPL payments. Find each payment.}",
        steps: [
          { explanation: "Divide the total by the number of instalments.", latex: "200\\div 4=\\$50" },
        ],
        finalAnswerLatex: "\\$50\\text{ per instalment}",
      },
    ];
  }

  if (slug === "gst-discounts-consumer-arithmetic") {
    return [
      {
        title: "Adding GST to a pre-GST price",
        questionLatex:
          "\\text{A skateboard has a pre-GST price of }\\$80.\\text{ Find the GST amount and the inclusive price.}",
        steps: [
          { explanation: "GST = 10% of pre-GST price.", latex: "\\text{GST}=80\\times 0.10=\\$8" },
          { explanation: "Inclusive price = pre-GST + GST.", latex: "80+8=\\$88" },
        ],
        finalAnswerLatex: "\\text{GST }=\\$8,\\quad\\text{inclusive price }=\\$88",
      },
      {
        title: "Finding the pre-GST price from an inclusive price",
        questionLatex:
          "\\text{A laptop costs }\\$132\\text{ including GST. Find the pre-GST price.}",
        steps: [
          { explanation: "Inclusive price = pre-GST × 1.10, so divide by 1.10.", latex: "\\text{pre-GST}=132\\div 1.10=\\$120" },
          { explanation: "Check: 120 × 1.10 = 132 ✓" },
        ],
        finalAnswerLatex: "\\$120",
      },
      {
        title: "Best buy using unit pricing",
        questionLatex:
          "\\text{Product A: 600 g for }\\$4.80.\\quad\\text{Product B: 400 g for }\\$3.60.",
        steps: [
          { explanation: "Find cost per 100 g for each product.", latex: "A:\\frac{4.80}{600}\\times 100=\\$0.80/100\\text{ g}" },
          { explanation: "Compare.", latex: "B:\\frac{3.60}{400}\\times 100=\\$0.90/100\\text{ g}" },
        ],
        finalAnswerLatex: "\\text{Product A is better value at }\\$0.80\\text{ per 100 g.}",
      },
    ];
  }

  return [
    {
      title: `${title}: budget table`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Income}&\\$520\\\\\\text{Food}&\\$110\\\\\\text{Transport}&\\$70\\\\\\text{Savings}&\\$90\\\\\\text{Subscriptions}&\\$25\\end{array}",
      steps: [
        { explanation: "Add expenses and planned savings.", latex: "110+70+90+25=295" },
        { explanation: "Subtract from income.", latex: "520-295=225" },
      ],
      finalAnswerLatex: "\\$225\\text{ surplus}",
    },
    {
      title: `${title}: mixed saving and interest`,
      questionLatex:
        "\\text{A student saves }\\$60\\text{/week for 8 weeks, then earns }\\$24\\text{ simple interest.}",
      steps: [
        { explanation: "Find the saved amount first.", latex: "60\\times 8=480" },
        { explanation: "Add the interest.", latex: "480+24=504" },
      ],
      finalAnswerLatex: "\\$504",
    },
  ];
}



export function year11StandardManagingMoneyLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "money-and-financial-mathematics") {
    return null;
  }

  const base = {
    workedExamples: managingMoneyWorkedExamples(lesson.slug, lesson.title),
    syllabusArea: "Financial Mathematics",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "budgets-cash-flow") {
    return {
      ...base,
      description:
        "Use income, fixed expenses, variable expenses and savings to calculate surplus, deficit and cash flow.",
      learningIntention:
        "Create and interpret simple budgets and calculate surplus or deficit from income and expenses.",
      successCriteria: [
        "Identify income, fixed expenses, variable expenses, and savings.",
        "Calculate total expenses from a budget table.",
        "Calculate surplus or deficit.",
        "Convert weekly amounts to a simple monthly estimate when appropriate.",
      ],
      teaching: {
        paragraphs: [
          "A budget is a plan for income and expenses over a set time period. It helps a person see whether money is available after regular costs.",
          "Income is money coming in. Expenses are money going out. Fixed expenses stay about the same, such as a phone plan, while variable expenses can change, such as food or entertainment.",
          "Cash flow describes money moving in and out over time. A surplus means income is greater than expenses. A deficit means expenses are greater than income.",
          "Always compare amounts over the same time period. A weekly amount can be estimated monthly by multiplying by 4 if the question asks for a simple 4-week estimate.",
        ],
        latexBlocks: [
          "\\text{surplus}=\\text{income}-\\text{expenses}",
          "\\text{deficit}=\\text{expenses}-\\text{income}",
        ],
      },
      guidedPractice: [
        moneyAnswer("manage-budget-g1", "Mia earns 320 dollars per week and spends 85 dollars on transport, 45 dollars on food, and 30 dollars on subscriptions. What is her weekly surplus?", "\\text{income}=\\$320,\\quad \\text{expenses}=\\$85,\\$45,\\$30", "160"),
        financeChoice("manage-budget-g2", "A 22 dollar weekly phone plan is best classified as:", "A", ["Fixed expense", "Income", "Surplus", "Deficit"], "A regular phone plan is a fixed expense."),
        moneyAnswer("manage-budget-g3", "A student has income of 280 dollars and weekly expenses of 315 dollars. What is the deficit?", "\\text{income}=\\$280,\\quad \\text{expenses}=\\$315", "35"),
        moneyAnswer("manage-budget-g4", "Noah saves 70 dollars each week. Using a 4-week monthly estimate, how much is this per month?", "\\text{weekly saving}=\\$70,\\quad \\text{weeks}=4", "280"),
      ],
      independentPractice: [
        moneyAnswer("manage-budget-i1", "A weekly budget shows income 450 dollars, rent contribution 120 dollars, food 90 dollars, transport 55 dollars, and savings 80 dollars. What is the surplus?", "\\text{income}=\\$450,\\quad \\text{expenses}=\\$120,\\$90,\\$55,\\$80", "105"),
        financeChoice("manage-budget-i2", "Which change would most improve weekly cash flow?", "C", ["Increase subscriptions by 15 dollars", "Add a new 20 dollar fee", "Reduce variable spending by 25 dollars", "Ignore transport costs"], "Reducing spending improves cash flow."),
        moneyAnswer("manage-budget-i3", "A budget has income of 390 dollars and total expenses of 410 dollars. What is the deficit?", "\\text{income}=\\$390,\\quad \\text{expenses}=\\$410", "20"),
        moneyAnswer("manage-budget-i4", "A gym membership costs 18 dollars each week. Estimate the 4-week monthly cost.", "\\text{weekly cost}=\\$18,\\quad \\text{weeks}=4", "72"),
        financeChoice("manage-budget-i5", "A budget should compare amounts over:", "B", ["Different time periods", "The same time period", "Only one expense", "Only wants, not needs"], "Weekly amounts should be compared with weekly amounts, and monthly with monthly."),
      ],
      commonMistakes: [
        { mistake: "Adding income and total expenses together instead of subtracting.", fix: "Surplus = income - expenses. If income is 420 and expenses are 253, the surplus is 167, not 673." },
        { mistake: "Calling a deficit a surplus.", fix: "If expenses exceed income, the difference is a deficit, not a surplus." },
        { mistake: "Using a weekly expense amount in a monthly calculation without converting.", fix: "Multiply a weekly amount by 4 to estimate the monthly figure before comparing." },
        { mistake: "Ignoring planned savings listed in the budget table.", fix: "Savings planned in the budget count as an outgoing when calculating the remaining surplus." },
      ],
      masteryQuiz: [
        moneyAnswer("manage-budget-m1", "A student earns 400 dollars per week and spends 60 dollars on transport, 110 dollars on food and 25 dollars on subscriptions. What is the weekly surplus?", "\\text{income}=\\$400,\\quad \\text{expenses: transport }\\$60,\\ \\text{food }\\$110,\\ \\text{subs }\\$25", "205"),
        financeChoice("manage-budget-m2", "A streaming subscription paid every week is a:", "A", ["Fixed expense", "Variable income", "Surplus", "Saving goal"], "A regular subscription is a fixed expense."),
        moneyAnswer("manage-budget-m3", "Income is 360 dollars and weekly expenses are 385 dollars. What is the deficit?", "\\text{income}=\\$360,\\quad \\text{expenses}=\\$385", "25"),
        moneyAnswer("manage-budget-m4", "A student budgets 95 dollars each week for food. Estimate the 4-week monthly food cost.", "\\text{weekly food}=\\$95,\\quad \\text{weeks}=4", "380"),
        financeChoice("manage-budget-m5", "Cash flow is about:", "B", ["Only yearly tax", "Money coming in and going out", "Only discounts", "Only interest rates"], "Cash flow tracks income and expenses."),
        moneyAnswer("manage-budget-m6", "A budget table lists income 520 dollars, transport 75 dollars, food 130 dollars, savings 100 dollars and subscriptions 20 dollars. What is the surplus?", "\\text{income}=\\$520,\\quad \\text{expenses}=\\$75+\\$130+\\$100+\\$20", "195"),
        financeChoice("manage-budget-m7", "Which item is most likely a variable expense?", "D", ["Fixed rent contribution", "Weekly phone plan", "Set insurance fee", "Entertainment spending"], "Entertainment spending can vary."),
        moneyAnswer("manage-budget-m8", "A learner driver pays 40 dollars per week for petrol. Estimate the 4-week monthly amount.", "\\text{weekly petrol}=\\$40,\\quad \\text{weeks}=4", "160"),
        financeChoice("manage-budget-m9", "If a budget has a deficit, the student should first look for:", "C", ["A larger deficit", "A way to increase expenses", "Income increases or expense reductions", "Only the smallest number"], "Deficits can be addressed by increasing income or reducing expenses."),
        moneyAnswer("manage-budget-m10", "A monthly estimate uses 4 weeks. If weekly savings are 55 dollars, what is the monthly estimate?", "\\text{weekly savings}=\\$55,\\quad \\text{weeks}=4", "220"),
      ],
    };
  }

  if (lesson.slug === "saving-spending-financial-goals") {
    return {
      ...base,
      description:
        "Plan savings goals, regular deposits, affordability checks and spending decisions.",
      learningIntention:
        "Use current savings, regular deposits and planned expenses to make simple financial decisions.",
      successCriteria: [
        "Calculate the amount still needed for a savings goal.",
        "Find the number of weeks or months needed for regular deposits.",
        "Compare two saving plans over the same time period.",
        "Decide whether a purchase is affordable after planned expenses.",
      ],
      teaching: {
        paragraphs: [
          "A savings goal is a target amount to reach by a chosen time. Plan backwards from it: subtract what you already have to see how much is still needed, then work out how long regular deposits will take to close that gap.",
          "Regular deposits help track progress. If the remaining amount divides exactly by the deposit, the quotient gives the number of deposits needed.",
          "Affordability means checking whether money is available after necessary expenses and planned savings.",
          "When comparing saving plans, compare totals over the same number of weeks or months.",
        ],
        latexBlocks: [
          "\\text{amount still needed}=\\text{goal}-\\text{current savings}",
          "\\text{number of deposits}=\\frac{\\text{amount still needed}}{\\text{regular deposit}}",
        ],
      },
      guidedPractice: [
        financeShortAnswer("manage-save-g1", "A savings goal is 900 dollars. Noah already has 240 dollars and saves 55 dollars each week. How many more weeks are needed?", "\\text{goal}=\\$900,\\quad \\text{saved}=\\$240,\\quad \\text{weekly saving}=\\$55", "12", ["12 weeks", "12weeks"]),
        moneyAnswer("manage-save-g2", "A student wants 1200 dollars for a laptop and currently has 350 dollars. How much more is needed?", "\\text{goal}=\\$1200,\\quad \\text{saved}=\\$350", "850"),
        financeChoice("manage-save-g3", "Which saving plan reaches 300 dollars fastest?", "B", ["30 dollars per week for 10 weeks", "75 dollars per week for 4 weeks", "40 dollars per week for 7 weeks", "20 dollars per week for 12 weeks"], "75 dollars for 4 weeks reaches 300 dollars in the shortest time."),
        financeChoice("manage-save-g4", "A student has 110 dollars left after planned expenses. A 95 dollar purchase is:", "A", ["Affordable with 15 dollars left", "Not affordable", "A deficit of 95 dollars", "Affordable only by ignoring expenses"], "110 minus 95 leaves 15 dollars."),
      ],
      independentPractice: [
        financeShortAnswer("manage-save-i1", "A goal is 600 dollars. Ava has 180 dollars and saves 70 dollars each week. How many more weeks are needed?", "\\text{goal}=\\$600,\\quad \\text{saved}=\\$180,\\quad \\text{weekly saving}=\\$70", "6", ["6 weeks", "6weeks"]),
        moneyAnswer("manage-save-i2", "A student deposits 45 dollars each week for 8 weeks into a trip fund. How much is deposited in total?", "\\text{weekly deposit}=\\$45,\\quad \\text{weeks}=8", "360"),
        financeChoice("manage-save-i3", "Plan A saves 50 dollars per week for 6 weeks. Plan B saves 35 dollars per week for 10 weeks. Which saves more?", "B", ["Plan A by 50 dollars", "Plan B by 50 dollars", "They save the same", "Plan A by 300 dollars"], "Plan A saves 300 dollars and Plan B saves 350 dollars."),
        financeChoice("manage-save-i4", "A student has 70 dollars spare after bills and wants to buy an 85 dollar jacket. The best judgement is:", "C", ["Buy it and ignore the shortfall", "It is affordable with 15 dollars spare", "It is not affordable this week", "It creates a 70 dollar surplus"], "The purchase is 15 dollars more than the spare money."),
        moneyAnswer("manage-save-i5", "A student saves 35 dollars per week for 12 weeks. What will be added to savings?", "\\text{weekly saving}=\\$35,\\quad \\text{weeks}=12", "420"),
      ],
      commonMistakes: [
        { mistake: "Dividing the full goal by the weekly deposit instead of the remaining amount needed.", fix: "Subtract current savings first: for a 900-dollar goal with 240 saved, divide 660 by the weekly deposit." },
        { mistake: "Rounding down the number of weeks when the amount does not divide evenly.", fix: "If the division leaves a remainder, one extra full week is needed to reach the goal." },
        { mistake: "Comparing Plan A over 10 weeks with Plan B over 8 weeks using only the weekly amounts.", fix: "Calculate each total first: Plan A total = 40 × 10; Plan B total = 55 × 8." },
        { mistake: "Deciding a purchase is affordable without first subtracting planned expenses.", fix: "Check how much money is left after essential expenses before comparing with the purchase price." },
      ],
      masteryQuiz: [
        financeShortAnswer("manage-save-m1", "A student wants 750 dollars, has 150 dollars, and saves 50 dollars per week. How many weeks are needed?", "\\text{goal}=\\$750,\\quad \\text{savings}=\\$150,\\quad \\text{weekly deposit}=\\$50", "12", ["12 weeks", "12weeks"]),
        moneyAnswer("manage-save-m2", "A phone costs 980 dollars and current savings are 420 dollars. How much more is needed?", "\\text{cost}=\\$980,\\quad \\text{savings}=\\$420", "560"),
        moneyAnswer("manage-save-m3", "A student saves 65 dollars each week for 6 weeks. How much is saved?", "\\text{weekly savings}=\\$65,\\quad \\text{weeks}=6", "390"),
        financeChoice("manage-save-m4", "Which plan saves the greatest amount?", "D", ["40 dollars for 5 weeks", "55 dollars for 3 weeks", "30 dollars for 6 weeks", "70 dollars for 4 weeks"], "The totals are 200, 165, 180 and 280 dollars."),
        financeChoice("manage-save-m5", "A student has 125 dollars spare and a planned purchase costs 140 dollars. The purchase is:", "B", ["Affordable with 15 dollars left", "Not affordable by 15 dollars", "A 140 dollar surplus", "Free after expenses"], "The student is 15 dollars short."),
        financeShortAnswer("manage-save-m6", "A goal is 1000 dollars. Current savings are 250 dollars and deposits are 75 dollars each week. How many weeks are needed?", "\\text{goal}=\\$1000,\\quad \\text{savings}=\\$250,\\quad \\text{weekly deposit}=\\$75", "10", ["10 weeks", "10weeks"]),
        moneyAnswer("manage-save-m7", "A student cancels a 16 dollar weekly subscription for 10 weeks. How much can be redirected to savings?", "\\text{weekly saving}=\\$16,\\quad \\text{weeks}=10", "160"),
        financeChoice("manage-save-m8", "When comparing spending choices, the fairest comparison uses:", "A", ["The same time period and total cost", "Only the largest discount sign", "Only the first payment", "Only the cheapest-looking option"], "Fair comparisons use equivalent time periods and totals."),
        moneyAnswer("manage-save-m9", "A student has 480 dollars and adds 40 dollars per week for 5 weeks. What will the savings balance be?", "\\text{current savings}=\\$480,\\quad \\text{weekly deposit}=\\$40,\\quad \\text{weeks}=5", "680"),
        financeChoice("manage-save-m10", "Tracking savings progress helps because it shows:", "C", ["Only tax owed", "Only weekly expenses", "How close the student is to the goal", "The highest possible fee"], "Progress tracking compares current savings with the goal."),
      ],
    };
  }

  if (lesson.slug === "simple-interest") {
    return {
      ...base,
      description:
        "Calculate simple interest, total amounts and compare simple-interest options using principal, rate and time.",
      learningIntention:
        "Use the simple interest formula to calculate interest earned and total amount.",
      successCriteria: [
        "Identify principal, interest rate and time.",
        "Convert a percentage rate to a decimal.",
        "Calculate simple interest.",
        "Calculate the total amount after interest.",
      ],
      teaching: {
        paragraphs: [
          "Simple interest is calculated only on the original amount (the principal), so you earn the same interest every period — the balance grows in equal steps, making a straight line.",
          "The interest rate must be written as a decimal before using the formula. For example, 4 percent becomes 0.04.",
          "Time must match the rate period. If the rate is per annum, time is measured in years.",
          "The total amount is the principal plus the interest earned.",
        ],
        latexBlocks: [
          "I=Prt",
          "\\text{total amount}=P+I",
        ],
      },
      guidedPractice: [
        moneyAnswer("manage-interest-g1", "A bank account earns simple interest on 1500 dollars at 4 percent p.a. for 2 years. How much interest is earned?", "P=\\$1500,\\quad r=4\\%\\text{ p.a.},\\quad t=2\\text{ years}", "120"),
        moneyAnswer("manage-interest-g2", "A 900 dollar deposit earns 54 dollars simple interest. What is the total amount?", "\\text{principal}=\\$900,\\quad \\text{interest}=\\$54", "954"),
        financeChoice("manage-interest-g3", "In a simple interest question, the principal is:", "B", ["The interest earned", "The original amount invested or borrowed", "The yearly fee", "The final answer only"], "Principal is the starting amount."),
        financeShortAnswer("manage-interest-g4", "Write 6 percent as a decimal for a simple interest calculation.", "\\text{percent}=6\\%", "0.06", [".06"]),
      ],
      independentPractice: [
        moneyAnswer("manage-interest-i1", "A student savings account has 2000 dollars at 3 percent p.a. simple interest for 1 year. How much interest is earned?", "P=\\$2000,\\quad r=3\\%\\text{ p.a.},\\quad t=1\\text{ year}", "60"),
        moneyAnswer("manage-interest-i2", "A 1200 dollar deposit earns simple interest at 5 percent p.a. for 3 years. Find the interest.", "P=\\$1200,\\quad r=5\\%\\text{ p.a.},\\quad t=3\\text{ years}", "180"),
        moneyAnswer("manage-interest-i3", "A 750 dollar investment earns 45 dollars simple interest. What is the total amount?", "\\text{principal}=\\$750,\\quad \\text{interest}=\\$45", "795"),
        financeChoice("manage-interest-i4", "Which setup correctly uses 4 percent p.a. for 2 years on 800 dollars?", "A", ["800 x 0.04 x 2", "800 x 4 x 2", "800 + 0.04 + 2", "800 x 0.4 x 2"], "4 percent must be converted to 0.04."),
        financeChoice("manage-interest-i5", "For the same principal and rate, doubling the time will:", "C", ["Halve simple interest", "Make no difference", "Double simple interest", "Remove the principal"], "Simple interest is proportional to time."),
      ],
      commonMistakes: [
        { mistake: "Using the interest rate as a whole number, such as calculating I = 1500 × 4 × 2.", fix: "Convert the percentage to a decimal first: 4% = 0.04, giving I = 1500 × 0.04 × 2 = 120." },
        { mistake: "Multiplying principal by rate but forgetting to multiply by time.", fix: "The formula is I = Prt and all three values must be included." },
        { mistake: "Giving the interest amount when the question asks for the total amount.", fix: "Total amount = principal + interest: if I = 120 and P = 1500, the total is 1620." },
        { mistake: "Using months as the time value when the rate is per annum.", fix: "Convert months to years, or confirm that time and rate use the same period." },
      ],
      masteryQuiz: [
        moneyAnswer("manage-interest-m1", "A 1000 dollar deposit earns 5 percent p.a. simple interest for 2 years. Find the interest.", "P=\\$1000,\\quad r=5\\%,\\quad t=2\\text{ yr}", "100"),
        financeShortAnswer("manage-interest-m2", "Write 3.5 percent as a decimal for a simple interest calculation.", "3.5\\%=0.035", "0.035", [".035"]),
        moneyAnswer("manage-interest-m3", "A 600 dollar account earns 48 dollars interest. What is the total amount?", "\\text{principal}=\\$600,\\quad \\text{interest}=\\$48", "648"),
        financeChoice("manage-interest-m4", "In I = Prt, r represents:", "C", ["Principal", "Time", "Interest rate as a decimal", "Total amount"], "r is the rate written as a decimal."),
        moneyAnswer("manage-interest-m5", "A 2500 dollar deposit earns simple interest at 2 percent p.a. for 4 years. Find the interest.", "P=\\$2500,\\quad r=2\\%,\\quad t=4\\text{ yr}", "200"),
        financeChoice("manage-interest-m6", "Which option earns more interest on 1000 dollars?", "B", ["3 percent for 1 year", "2 percent for 2 years", "1 percent for 2 years", "0.5 percent for 3 years"], "The interest amounts are 30, 40, 20 and 15 dollars."),
        moneyAnswer("manage-interest-m7", "A 1500 dollar account earns 90 dollars simple interest. Find the total amount.", "\\text{principal}=\\$1500,\\quad \\text{interest}=\\$90", "1590"),
        financeChoice("manage-interest-m8", "A rate of 7 percent should be entered as:", "D", ["7", "70", "0.7", "0.07"], "7 percent is 0.07."),
        {
          id: "manage-interest-m9",
          prompt:
            "A loan earns simple interest of 180 dollars after 2 years on a principal of 1500 dollars. Find the annual interest rate.",
          latex:
            "\\text{simple interest}=\\$180,\\quad \\text{principal}=\\$1500,\\quad \\text{time}=2\\text{ years}",
          answer: "6%",
          acceptedAnswers: ["6", "6%", "6 percent"],
          hint: "Use the simple interest formula and solve for the rate.",
          explanation:
            "Use $I=Prt$. Here $180=1500\\times r\\times2$, so $r=180\\div3000=0.06=6\\%$.",
        },
        financeChoice("manage-interest-m10", "Which rearrangement correctly finds the principal P from simple interest I, rate r and time t?", "A", ["$P=\\frac{I}{rt}$", "$P=Irt$", "$P=\\frac{r}{It}$", "$P=\\frac{t}{Ir}$"], "Starting from $I=Prt$, divide both sides by $rt$ to get $P=\\frac{I}{rt}$.", "I=Prt"),
      ],
    };
  }

  if (lesson.slug === "comparing-financial-decisions") {
    return {
      ...base,
      description:
        "Compare financial choices using total cost, discounts, fees, charges and reasonableness.",
      learningIntention:
        "Compare financial options fairly using total cost and practical judgement.",
      successCriteria: [
        "Calculate total cost when fees or charges apply.",
        "Calculate a discount in context.",
        "Compare options over the same time period.",
        "Choose the better option using total cost, not just headline price.",
      ],
      teaching: {
        paragraphs: [
          "Financial decisions often involve more than the advertised price. Fees, delivery charges, discounts and ongoing payments can change the total cost.",
          "A discount reduces the price. A fee or charge increases the cost.",
          "The cheapest upfront price may not be the best value if later fees are higher.",
          "To compare options fairly, calculate the total cost for each option over the same time period.",
        ],
        latexBlocks: [
          "\\text{total cost}=\\text{price}-\\text{discount}+\\text{fees}",
          "\\text{discount}=\\text{discount rate}\\times\\text{original price}",
        ],
      },
      guidedPractice: [
        moneyAnswer("manage-compare-g1", "A concert ticket costs 48 dollars plus a 6 dollar booking fee. What is the total cost?", "\\text{ticket}=\\$48,\\quad \\text{booking fee}=\\$6", "54"),
        moneyAnswer("manage-compare-g2", "A 200 dollar jacket has a 15 percent discount. How much is the discount?", "\\text{price}=\\$200,\\quad \\text{discount}=15\\%", "30"),
        financeChoice("manage-compare-g3", "Two phone plans should be compared using:", "C", ["Only the setup fee", "Only the cheapest first month", "Total cost over the same time period", "Only the biggest advertisement"], "Fair comparisons use the same time period and total cost."),
        financeChoice("manage-compare-g4", "A lower upfront price may not be best if:", "D", ["It has no fee", "It is paid today", "It has the same total cost", "Later fees make the total higher"], "Fees can make the total higher."),
      ],
      independentPractice: [
        moneyAnswer("manage-compare-i1", "Option A costs 260 dollars plus a 35 dollar delivery fee. What is the total cost?", "\\text{price}=\\$260,\\quad \\text{delivery}=\\$35", "295"),
        moneyAnswer("manage-compare-i2", "A student buys headphones priced at 180 dollars with 20 percent off. What is the sale price?", "\\text{price}=\\$180,\\quad \\text{discount}=20\\%", "144"),
        financeChoice("manage-compare-i3", "Option A costs 120 dollars plus a 15 dollar fee. Option B costs 140 dollars with no fee. Which is cheaper?", "A", ["Option A by 5 dollars", "Option B by 5 dollars", "They are equal", "Option A by 20 dollars"], "Option A totals 135 dollars and Option B totals 140 dollars."),
        moneyAnswer("manage-compare-i4", "A 75 dollar online order has a 10 dollar delivery fee and a 5 dollar coupon. What is the total cost?", "\\text{price}=\\$75,\\quad \\text{delivery}=\\$10,\\quad \\text{coupon}=\\$5", "80"),
        financeChoice("manage-compare-i5", "Which mistake is most likely when comparing costs?", "B", ["Using total costs", "Ignoring fees and charges", "Comparing the same time period", "Subtracting a discount"], "Ignoring fees can lead to the wrong decision."),
      ],
      commonMistakes: [
        { mistake: "Choosing the lower listed price without adding the delivery or booking fee.", fix: "Find the total for each option: add all stated fees before comparing." },
        { mistake: "Adding a discount to the price instead of subtracting it.", fix: "A 20% discount on 200 dollars is 200 - 40 = 160, not 200 + 40 = 240." },
        { mistake: "Comparing Plan A at 18 dollars per month with Plan B's total over 4 months directly.", fix: "Compare over the same number of months: calculate each option's total for 4 months, then compare." },
        { mistake: "Ignoring a small booking or service fee when choosing between options.", fix: "Include every stated charge: a 6 or 12 dollar fee can change which option is cheapest." },
      ],
      masteryQuiz: [
        moneyAnswer("manage-compare-m1", "A sports bag costs 85 dollars plus 12 dollars delivery. What is the total cost?", "\\text{price}=\\$85,\\quad \\text{delivery}=\\$12", "97"),
        moneyAnswer("manage-compare-m2", "A 300 dollar bike has a 10 percent discount. How much is the discount?", "\\text{price}=\\$300,\\quad \\text{discount}=10\\%", "30"),
        moneyAnswer("manage-compare-m3", "A 240 dollar item has 20 percent off and a 12 dollar service fee. What is the final cost?", "\\text{price}=\\$240,\\quad \\text{discount}=20\\%,\\quad \\text{fee}=\\$12", "204"),
        financeChoice("manage-compare-m4", "Plan A costs 18 dollars per month plus a 40 dollar setup fee. Plan B costs 25 dollars per month with no setup fee. Which is cheaper over 4 months?", "B", ["Plan A by 12 dollars", "Plan B by 12 dollars", "They are equal", "Plan A by 40 dollars"], "Plan A costs 112 dollars and Plan B costs 100 dollars."),
        financeChoice("manage-compare-m5", "Best value means:", "C", ["Always the lowest upfront price", "Always the biggest discount sign", "The option that best fits total cost and context", "Ignoring fees"], "Best value considers total cost and context."),
        moneyAnswer("manage-compare-m6", "A laptop sleeve costs 42 dollars after an 8 dollar discount, then a 5 dollar delivery fee is added. What is the total cost?", "\\text{price after discount}=\\$42,\\quad \\text{delivery}=\\$5", "47"),
        financeChoice("manage-compare-m7", "A 15 percent discount on 200 dollars is commonly mistaken as:", "A", ["15 dollars", "30 dollars", "185 dollars", "215 dollars"], "The discount is 30 dollars; 15 dollars confuses percent with dollars."),
        moneyAnswer("manage-compare-m8", "Option A totals 410 dollars. Option B totals 395 dollars. How much cheaper is Option B?", "\\text{Option A}=\\$410,\\quad \\text{Option B}=\\$395", "15"),
        financeChoice("manage-compare-m9", "A plan with a cheap first month and high later fees should be judged by:", "D", ["First month only", "The colour of the advertisement", "Setup fee only", "Total cost over the relevant period"], "Total cost over the relevant period is fairer."),
        moneyAnswer("manage-compare-m10", "A 120 dollar purchase has 25 percent off and a 9 dollar fee. What is the final cost?", "\\text{price}=\\$120,\\quad \\text{discount}=25\\%,\\quad \\text{fee}=\\$9", "99"),
      ],
    };
  }

  if (lesson.slug === "credit-cards-consumer-finance") {
    return {
      ...base,
      description:
        "Calculate monthly interest on credit card balances, find minimum payments, track new balances after payments, and compare credit cards with BNPL services.",
      learningIntention:
        "Apply credit card interest calculations, minimum payments and BNPL instalment arithmetic to practical consumer finance contexts.",
      successCriteria: [
        "Calculate monthly credit card interest using annual rate ÷ 12.",
        "Find the minimum payment as a percentage of the outstanding balance.",
        "Find the new balance after adding interest and subtracting a payment.",
        "Calculate equal BNPL instalments from a total purchase price.",
      ],
      teaching: {
        paragraphs: [
          "A credit card lets you buy now and pay later. If you pay the full balance by the due date, no interest is charged. If you carry a balance, interest accrues at the annual percentage rate.",
          "Monthly interest is calculated by applying one month's share of the annual rate to the balance. Monthly rate = annual rate ÷ 12. For example, 18% p.a. gives 1.5% per month.",
          "A minimum payment is the smallest amount required each month, typically 2–3% of the balance. Making only the minimum payment means most of the balance remains and interest continues to accumulate.",
          "Buy Now Pay Later (BNPL) services such as Afterpay split a purchase into equal instalments (usually 4 fortnightly payments) with no interest. However, late fees apply if a payment is missed.",
        ],
        latexBlocks: [
          "\\text{monthly interest}=\\text{balance}\\times\\frac{\\text{annual rate}}{12}",
          "\\text{minimum payment}=\\text{minimum rate}\\times\\text{balance}",
          "\\text{new balance}=\\text{old balance}+\\text{monthly interest}-\\text{payment}",
          "\\text{BNPL instalment}=\\frac{\\text{total price}}{\\text{number of payments}}",
        ],
      },
      guidedPractice: [
        financeChoice("manage-credit-g1", "If you pay the full credit card balance by the due date, you:", "B", [
          "Are charged 10% interest immediately",
          "Pay no interest on purchases",
          "Automatically receive a credit limit increase",
          "Owe only the minimum payment",
        ], "Paying the full balance by the due date avoids any interest charge."),
        moneyAnswer("manage-credit-g2", "A credit card balance is $800. The annual interest rate is 18% p.a. Find the monthly interest charge.", "I=800\\times\\frac{0.18}{12}", "12"),
        moneyAnswer("manage-credit-g3", "A credit card minimum payment is 2% of the balance. The balance is $850. Find the minimum payment.", "\\text{min payment}=0.02\\times 850", "17"),
        financeChoice("manage-credit-g4", "Buy Now Pay Later (BNPL) services:", "C", [
          "Charge 20% p.a. interest on all balances",
          "Are the same as credit cards",
          "Split a purchase into equal instalments with no interest, but may charge late fees",
          "Require a credit check for every purchase",
        ], "BNPL splits the cost into instalments, typically with no interest but with late fees if payments are missed."),
      ],
      independentPractice: [
        moneyAnswer("manage-credit-i1", "A credit card balance of $500 carries interest at 24% p.a. Find the monthly interest charge.", "I=500\\times\\frac{0.24}{12}", "10"),
        moneyAnswer("manage-credit-i2", "A credit card balance is $600. Monthly interest of $10 is charged and a minimum payment of $12 is made. Find the new balance.", "\\text{new balance}=600+10-12", "598"),
        moneyAnswer("manage-credit-i3", "A credit card has an annual fee of $60. How much is this per month?", "60\\div 12", "5"),
        financeChoice("manage-credit-i4", "A customer makes only the minimum payment on a large credit card balance each month. Over time, the balance will:", "B", [
          "Be paid off within a few months",
          "Decrease very slowly because interest is still charged on the remaining amount",
          "Not change at all",
          "Increase by exactly the minimum payment amount",
        ], "Interest on the remaining balance means minimum payments clear very little of the principal."),
        moneyAnswer("manage-credit-i5", "A $200 purchase is split into 4 equal fortnightly BNPL payments. Find each payment.", "200\\div 4", "50"),
      ],
      commonMistakes: [
        { mistake: "Using the annual interest rate directly instead of the monthly rate.", fix: "Divide the annual rate by 12 to get the monthly rate. At 18% p.a., the monthly rate is 1.5%." },
        { mistake: "Forgetting to add the monthly interest before subtracting the payment.", fix: "New balance = old balance + interest − payment. Add interest first, then deduct the payment." },
        { mistake: "Thinking BNPL is always free.", fix: "BNPL has no interest but does charge late fees if an instalment payment is missed." },
        { mistake: "Calculating the minimum payment as the same dollar amount each month regardless of the balance.", fix: "Minimum payment is a percentage of the current balance. As the balance changes, so does the minimum payment." },
      ],
      masteryQuiz: [
        financeChoice("manage-credit-m1", "Credit card interest is charged when:", "A", [
          "The full balance is not paid by the due date",
          "The card has no annual fee",
          "The card is used for BNPL",
          "The minimum payment is made before the due date",
        ], "If the full balance is not paid by the due date, interest accrues on the outstanding amount."),
        moneyAnswer("manage-credit-m2", "A credit card balance of $1200 carries interest at 20% p.a. Find the monthly interest charge.", "I=1200\\times\\frac{0.20}{12}", "20"),
        moneyAnswer("manage-credit-m3", "A minimum payment is 3% of a $600 balance. Find the minimum payment.", "0.03\\times 600", "18"),
        moneyAnswer("manage-credit-m4", "A balance of $400 earns $8 monthly interest. A $10 minimum payment is made. Find the new balance.", "400+8-10", "398"),
        financeChoice("manage-credit-m5", "A credit card has a $95 annual fee. A customer misses a payment and pays a $15 late fee. What is the total extra cost this year?", "C", [
          "$95",
          "$15",
          "$110",
          "$80",
        ], "95 + 15 = $110."),
        moneyAnswer("manage-credit-m6", "A credit card balance is $750 and the minimum payment rate is 2%. Find the minimum payment.", "0.02\\times 750", "15"),
        financeChoice("manage-credit-m7", "A student owes $480 at 20% p.a. The monthly interest charge is:", "B", [
          "$96",
          "$8",
          "$4.80",
          "$48",
        ], "480 × 0.20 ÷ 12 = 480 ÷ 60 = $8."),
        moneyAnswer("manage-credit-m8", "A $360 purchase is split into 4 equal BNPL instalments. Find each instalment.", "360\\div 4", "90"),
        financeChoice("manage-credit-m9", "Making only minimum payments on a credit card is costly because:", "A", [
          "Interest continues to accumulate on the unpaid balance",
          "The annual fee doubles each month",
          "The credit limit is automatically reduced",
          "Minimum payments are not accepted by card issuers",
        ], "Interest on the remaining balance means it takes much longer and more money to pay off the debt."),
        moneyAnswer("manage-credit-m10", "A credit card balance is $900. Monthly interest of $15 is charged and a payment of $50 is made. Find the new balance.", "900+15-50", "865"),
      ],
    };
  }

  if (lesson.slug === "gst-discounts-consumer-arithmetic") {
    return {
      ...base,
      description:
        "Apply 10% GST to find inclusive prices and pre-GST prices, calculate percentage discounts, and use unit pricing to find the best buy.",
      learningIntention:
        "Calculate GST amounts and inclusive prices, find sale prices after discounts, and compare unit prices to identify best value.",
      successCriteria: [
        "Find the GST amount and GST-inclusive price from a pre-GST price.",
        "Find the pre-GST price by dividing an inclusive price by 1.10.",
        "Find the GST component in an inclusive price by dividing by 11.",
        "Calculate a discount amount and the resulting sale price.",
        "Compare unit prices to identify the best buy.",
      ],
      teaching: {
        paragraphs: [
          "GST (Goods and Services Tax) is a 10% tax added to most goods and services in Australia. GST-inclusive price = pre-GST price × 1.10.",
          "To find the pre-GST price when given the inclusive price, divide by 1.10. The GST component in an inclusive price = inclusive price ÷ 11 (since GST is 1/11 of the inclusive total).",
          "A percentage discount reduces the original price. Discount amount = rate × original price. Sale price = original price − discount amount, or equivalently: sale price = original price × (1 − discount rate).",
          "Unit pricing finds the cost per standard unit (per 100 g, per litre, per item) so that different pack sizes can be compared fairly. The option with the lowest cost per unit is the best buy.",
        ],
        latexBlocks: [
          "\\text{inclusive price}=\\text{pre-GST price}\\times 1.10",
          "\\text{pre-GST price}=\\frac{\\text{inclusive price}}{1.10}\\qquad\\text{GST amount}=\\frac{\\text{inclusive price}}{11}",
          "\\text{sale price}=\\text{original price}\\times(1-\\text{discount rate})",
          "\\text{unit price}=\\frac{\\text{total cost}}{\\text{quantity}}",
        ],
      },
      guidedPractice: [
        financeChoice("manage-gst-g1", "GST in Australia is:", "B", [
          "5%",
          "10%",
          "15%",
          "20%",
        ], "Australian GST is 10%."),
        moneyAnswer("manage-gst-g2", "A skateboard is priced at $80 before GST. Find the GST amount.", "\\text{GST}=80\\times 0.10", "8"),
        moneyAnswer("manage-gst-g3", "A jacket has a pre-GST price of $80. Find the GST-inclusive price.", "80\\times 1.10", "88"),
        moneyAnswer("manage-gst-g4", "A $150 bag has a 20% discount. Find the sale price.", "150\\times 0.80", "120"),
      ],
      independentPractice: [
        moneyAnswer("manage-gst-i1", "A laptop costs $132 including GST. Find the pre-GST price.", "132\\div 1.10", "120"),
        moneyAnswer("manage-gst-i2", "A TV costs $110 including GST. Find the GST amount.", "110\\div 11", "10"),
        moneyAnswer("manage-gst-i3", "A $240 jacket has 30% off. Find the sale price.", "240\\times 0.70", "168"),
        financeChoice("manage-gst-i4", "Product A: 600 g for $4.80. Product B: 400 g for $3.60. Which is better value?", "A", [
          "Product A — $0.80 per 100 g vs $0.90 per 100 g for Product B",
          "Product B — it costs less in total",
          "They are the same value",
          "Product B — $0.90 is cheaper than $0.80",
        ], "4.80 ÷ 600 × 100 = $0.80/100 g. 3.60 ÷ 400 × 100 = $0.90/100 g. Product A is better value."),
        moneyAnswer("manage-gst-i5", "A phone case costs $22 before GST. Find the GST-inclusive price.", "22\\times 1.10", "24.20"),
      ],
      commonMistakes: [
        { mistake: "Finding 10% of the inclusive price instead of dividing the inclusive price by 11.", fix: "If the price already includes GST, the GST component is inclusive price ÷ 11. For example, $110 ÷ 11 = $10 of GST." },
        { mistake: "Subtracting 10% from the inclusive price to find the pre-GST price.", fix: "Subtracting 10% of $110 gives $99, which is wrong. The correct method is $110 ÷ 1.10 = $100." },
        { mistake: "Comparing 600 g for $4.80 and 400 g for $3.60 by looking at total prices only.", fix: "Compare per 100 g: $4.80 ÷ 600 × 100 = $0.80 versus $3.60 ÷ 400 × 100 = $0.90. The 600 g pack is cheaper per unit." },
        { mistake: "Adding the discount percentage to the price instead of subtracting.", fix: "A discount reduces the price. Subtract the discount amount: sale price = original − (rate × original)." },
      ],
      masteryQuiz: [
        financeChoice("manage-gst-m1", "To find the GST-inclusive price from the pre-GST price:", "B", [
          "Divide by 1.10",
          "Multiply by 1.10",
          "Multiply by 0.10",
          "Add 10 to the price",
        ], "Inclusive = pre-GST × 1.10."),
        moneyAnswer("manage-gst-m2", "A $200 phone has 10% GST added. Find the GST amount.", "200\\times 0.10", "20"),
        moneyAnswer("manage-gst-m3", "A $200 phone has 10% GST added. Find the GST-inclusive price.", "200\\times 1.10", "220"),
        moneyAnswer("manage-gst-m4", "A restaurant bill of $165 includes GST. Find the GST amount.", "165\\div 11", "15"),
        moneyAnswer("manage-gst-m5", "A bag costs $220 including GST. Find the pre-GST price.", "220\\div 1.10", "200"),
        moneyAnswer("manage-gst-m6", "A $180 jacket has 25% off. Find the sale price.", "180\\times 0.75", "135"),
        financeChoice("manage-gst-m7", "Juice A: 500 mL for $2.50. Juice B: 750 mL for $3.00. Which is better value?", "B", [
          "Juice A — it costs less in total",
          "Juice B — $0.40 per 100 mL vs $0.50 per 100 mL for Juice A",
          "They are the same value",
          "Juice A — $0.50 looks smaller",
        ], "2.50 ÷ 500 × 100 = $0.50/100 mL. 3.00 ÷ 750 × 100 = $0.40/100 mL. Juice B is better value."),
        moneyAnswer("manage-gst-m8", "A textbook is $77 including GST. Find the pre-GST price.", "77\\div 1.10", "70"),
        moneyAnswer("manage-gst-m9", "A student wants to buy a $300 item with 15% off. Find the discount amount.", "300\\times 0.15", "45"),
        financeChoice("manage-gst-m10", "The GST amount in a $110 inclusive price is found by:", "A", [
          "Dividing by 11",
          "Multiplying by 0.10",
          "Dividing by 1.10",
          "Subtracting 10",
        ], "$110 ÷ 11 = $10. The GST is 1/11 of the inclusive price."),
      ],
    };
  }

  if (lesson.slug === "managing-money-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed managing-money exam questions using budgets, savings goals, simple interest, fees and financial comparisons.",
    learningIntention:
      "Apply managing-money skills to mixed practical exam-style questions.",
    successCriteria: [
      "Interpret budget and savings information from tables.",
      "Calculate surplus, savings progress and simple interest.",
      "Include fees, discounts and charges in total cost.",
      "Choose reasonable financial decisions from short contexts.",
    ],
    teaching: {
      paragraphs: [
        "Managing-money exam questions often combine budgets, savings goals, interest and comparisons of financial choices.",
        "Read the question carefully and identify whether it asks for surplus, deficit, savings progress, interest, total cost or a decision.",
        "Use tables to separate income, expenses, savings and fees. This reduces the chance of adding or subtracting the wrong amount.",
        "A reasonable financial decision should be based on total cost and the time period in the question.",
      ],
      latexBlocks: [
        "\\text{surplus}=\\text{income}-\\text{expenses}",
        "I=Prt",
        "\\text{total cost}=\\text{price}-\\text{discount}+\\text{fees}",
      ],
    },
    guidedPractice: [
      moneyAnswer("manage-exam-g1", "A budget table shows income 520 dollars, food 110 dollars, transport 70 dollars, savings 90 dollars and subscriptions 25 dollars. What is the surplus?", "\\text{income}=\\$520,\\quad \\text{expenses}=\\$110,\\$70,\\$90,\\$25", "225"),
      financeShortAnswer("manage-exam-g2", "A goal is 840 dollars. Current savings are 240 dollars and weekly deposits are 60 dollars. How many weeks are needed?", "\\text{goal}=\\$840,\\quad \\text{saved}=\\$240,\\quad \\text{weekly deposit}=\\$60", "10", ["10 weeks", "10weeks"]),
      moneyAnswer("manage-exam-g3", "A 1500 dollar account earns simple interest at 4 percent p.a. for 2 years. How much interest is earned?", "P=\\$1500,\\quad r=4\\%\\text{ p.a.},\\quad t=2\\text{ years}", "120"),
      financeChoice("manage-exam-g4", "A purchase has a delivery fee. Which value should be used for comparison?", "C", ["Headline price only", "Discount sign only", "Total cost including the fee", "The largest number in the question"], "Fees affect the total cost."),
    ],
    independentPractice: [
      moneyAnswer("manage-exam-i1", "A monthly budget has income 1600 dollars and expenses 1425 dollars. What is the surplus?", "\\text{income}=\\$1600,\\quad \\text{expenses}=\\$1425", "175"),
      moneyAnswer("manage-exam-i2", "A student saves 45 dollars per week for 9 weeks. How much is added to savings?", "\\text{weekly saving}=\\$45,\\quad \\text{weeks}=9", "405"),
      moneyAnswer("manage-exam-i3", "A 900 dollar deposit earns 5 percent p.a. simple interest for 3 years. Find the interest.", "P=\\$900,\\quad r=5\\%\\text{ p.a.},\\quad t=3\\text{ years}", "135"),
      moneyAnswer("manage-exam-i4", "A 250 dollar item has 10 percent off and a 15 dollar delivery fee. What is the final cost?", "\\text{price}=\\$250,\\quad \\text{discount}=10\\%,\\quad \\text{delivery}=\\$15", "240"),
      financeChoice("manage-exam-i5", "Which decision is most reasonable?", "B", ["Choose a plan without checking fees", "Compare total costs over the same time period", "Use monthly and weekly costs directly", "Ignore savings goals"], "Total costs over the same time period give a fair comparison."),
    ],
    commonMistakes: [
      { mistake: "Applying I = Prt to find surplus, or subtracting expenses to find interest.", fix: "Identify whether the question asks for surplus, savings progress, interest, or total cost before calculating." },
      { mistake: "Ignoring a fee or discount mentioned in the question.", fix: "Include every stated cost change: fees increase the total and discounts reduce it." },
      { mistake: "Comparing a weekly budget amount directly with a monthly saving amount.", fix: "Convert to the same time period first before comparing." },
      { mistake: "Getting a net pay that is larger than gross pay, or a discounted price higher than the original.", fix: "Net pay is always less than gross pay when deductions apply; a discount must reduce the price." },
    ],
    masteryQuiz: [
      moneyAnswer("manage-exam-m1", "A student earns 480 dollars and budgets 95 dollars for food, 60 dollars for transport, 80 dollars for savings and 20 dollars for subscriptions. What is the surplus?", "\\text{income}=\\$480,\\quad \\text{expenses}=\\$95+\\$60+\\$80+\\$20", "225"),
      financeShortAnswer("manage-exam-m2", "A student needs 500 dollars, already has 140 dollars, and saves 45 dollars each week. How many weeks are needed?", "\\text{goal}=\\$500,\\quad \\text{savings}=\\$140,\\quad \\text{weekly deposit}=\\$45", "8", ["8 weeks", "8weeks"]),
      moneyAnswer("manage-exam-m3", "A 1200 dollar account earns 3 percent p.a. simple interest for 2 years. Find the interest.", "P=\\$1200,\\quad r=3\\%,\\quad t=2\\text{ yr}", "72"),
      moneyAnswer("manage-exam-m4", "A 90 dollar jacket has 20 percent off. What is the sale price?", "\\text{price}=\\$90,\\quad \\text{discount}=20\\%", "72"),
      financeChoice("manage-exam-m5", "A budget with expenses greater than income shows:", "D", ["A surplus", "Simple interest", "A discount", "A deficit"], "Expenses greater than income create a deficit."),
      moneyAnswer("manage-exam-m6", "A 600 dollar deposit earns 48 dollars simple interest. What is the total amount?", "\\text{principal}=\\$600,\\quad \\text{interest}=\\$48", "648"),
      financeChoice("manage-exam-m7", "A fair comparison between two subscriptions should use:", "A", ["Total cost over the same number of months", "Only setup fee", "Only the first payment", "Only the largest discount"], "Use the same time period."),
      moneyAnswer("manage-exam-m8", "A 150 dollar item has a 30 dollar discount and a 12 dollar delivery fee. What is the final cost?", "\\text{price}=\\$150,\\quad \\text{discount}=\\$30,\\quad \\text{delivery}=\\$12", "132"),
      financeChoice("manage-exam-m9", "Which answer is reasonable if income is 300 dollars and expenses are 340 dollars?", "B", ["40 dollars surplus", "40 dollars deficit", "640 dollars surplus", "No cash flow"], "Expenses exceed income by 40 dollars."),
      moneyAnswer("manage-exam-m10", "A student deposits 35 dollars each week for 6 weeks, then pays a 15 dollar account fee. What amount remains from those deposits?", "\\text{weekly deposit}=\\$35,\\quad \\text{weeks}=6,\\quad \\text{fee}=\\$15", "195"),
    ],
    };
  }

  if (lesson.slug === "vehicle-costs-buying-running") {
    return {
      ...base,
      description:
        "Calculate the total cost of buying and running a vehicle: purchase price, stamp duty, registration, insurance, fuel consumption, servicing, and total cost of ownership over a period.",
      learningIntention:
        "Apply percentage, rate, and addition skills to model the full financial cost of vehicle ownership, including purchase costs, annual running costs, and resale value.",
      successCriteria: [
        "Calculate annual fuel cost using fuel consumption rate (L/100 km), distance, and fuel price.",
        "List and total the key annual running costs: registration, insurance, fuel, and servicing.",
        "Calculate stamp duty as a percentage of the purchase price.",
        "Find the total cost of ownership over a given number of years, accounting for purchase, running costs, and resale value.",
      ],
      teaching: {
        paragraphs: [
          "Buying a vehicle costs more than the advertised price. Stamp duty (a government tax), registration transfer, and dealer fees add to the initial outlay. Stamp duty is usually a fixed percentage of the vehicle's purchase price and varies by state.",
          "Annual running costs include: registration (a fixed annual government fee), comprehensive insurance, fuel, regular servicing and tyres. Fuel cost depends on the vehicle's consumption rate (litres per 100 km), the annual distance driven, and the price of fuel per litre.",
          "Fuel cost formula: Fuel cost = (distance ÷ 100) × consumption rate (L/100 km) × price per litre. For example, driving 15,000 km at 9 L/100 km with fuel at $1.90/L costs (15,000 ÷ 100) × 9 × 1.90 = $2,565.",
          "Total cost of ownership = purchase price + total running costs (over all years) − resale value. This gives the true net cost of owning the vehicle for the period. Comparing this figure across vehicles helps make financially sound decisions.",
        ],
        latexBlocks: [
          "\\text{Fuel cost} = \\frac{\\text{distance (km)}}{100} \\times \\text{consumption (L/100\\,km)} \\times \\text{price per litre}",
          "\\text{Annual running cost} = \\text{rego} + \\text{insurance} + \\text{fuel} + \\text{servicing}",
          "\\text{Total ownership cost} = \\text{purchase price} + \\text{total running costs} - \\text{resale value}",
        ],
      },
      workedExamples: [
        {
          title: "Annual fuel cost",
          questionLatex:
            "\\text{A car uses 8 L per 100 km. It is driven 12\\,000 km in a year. Fuel costs \\$1.80 per litre. Find the annual fuel cost.}",
          steps: [
            {
              explanation: "Divide distance by 100 to find the number of 100-km intervals.",
              latex: "\\frac{12\\,000}{100} = 120",
            },
            {
              explanation: "Multiply by consumption rate to get litres used.",
              latex: "120 \\times 8 = 960 \\text{ litres}",
            },
            {
              explanation: "Multiply by price per litre.",
              latex: "960 \\times 1.80 = \\$1\\,728",
            },
          ],
          finalAnswerLatex: "\\$1\\,728",
        },
        {
          title: "Total annual running cost",
          questionLatex:
            "\\text{Annual costs: registration \\$350, insurance \\$1\\,200, fuel \\$1\\,728, servicing \\$400. Find the total annual running cost.}",
          steps: [
            {
              explanation: "Add all annual cost components.",
              latex: "350 + 1\\,200 + 1\\,728 + 400 = \\$3\\,678",
            },
          ],
          finalAnswerLatex: "\\$3\\,678",
        },
        {
          title: "Total cost of ownership over 5 years",
          questionLatex:
            "\\text{Purchase price: \\$24\\,000. Annual running cost: \\$3\\,678. Resale value after 5 years: \\$9\\,000. Find the 5-year ownership cost.}",
          steps: [
            {
              explanation: "Total running costs over 5 years.",
              latex: "5 \\times 3\\,678 = \\$18\\,390",
            },
            {
              explanation: "Total ownership cost = purchase + running − resale.",
              latex: "24\\,000 + 18\\,390 - 9\\,000 = \\$33\\,390",
            },
          ],
          finalAnswerLatex: "\\$33\\,390",
        },
      ],
      guidedPractice: [
        moneyAnswer(
          "y11s-vcr-g1",
          "A car uses 10 L per 100 km and is driven 10,000 km. Fuel costs $1.70/L. Find the annual fuel cost.",
          "\\frac{10\\,000}{100} \\times 10 \\times 1.70",
          "1700",
          ["$1700", "1700.00", "$1,700"]
        ),
        moneyAnswer(
          "y11s-vcr-g2",
          "Calculate stamp duty on a $20,000 vehicle at a rate of 3%.",
          "0.03 \\times 20\\,000",
          "600",
          ["$600", "600.00"]
        ),
        moneyAnswer(
          "y11s-vcr-g3",
          "Annual running costs: rego $400, insurance $900, fuel $1,700, servicing $300. Find the total annual running cost.",
          "400 + 900 + 1\\,700 + 300",
          "3300",
          ["$3300", "$3,300", "3300.00"]
        ),
        financeChoice(
          "y11s-vcr-g4",
          "The total cost of ownership over 3 years for a car costing $15,000, with annual running costs of $3,000, and resale value of $8,000 is:",
          "C",
          ["$16,000", "$14,000", "$16,000", "$22,000"],
          "15,000 + 3×3,000 − 8,000 = 15,000 + 9,000 − 8,000 = $16,000."
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y11s-vcr-i1",
          "A car uses 7 L per 100 km and is driven 14,000 km. Fuel costs $1.90/L. Find the annual fuel cost.",
          "\\frac{14\\,000}{100} \\times 7 \\times 1.90",
          "1862",
          ["$1862", "1862.00", "$1,862"]
        ),
        moneyAnswer(
          "y11s-vcr-i2",
          "Calculate stamp duty on a $32,000 vehicle at 4%.",
          "0.04 \\times 32\\,000",
          "1280",
          ["$1280", "1280.00", "$1,280"]
        ),
        moneyAnswer(
          "y11s-vcr-i3",
          "Annual costs: rego $420, insurance $1,100, fuel $1,862, servicing $380. Find the total.",
          "420 + 1\\,100 + 1\\,862 + 380",
          "3762",
          ["$3762", "$3,762", "3762.00"]
        ),
        moneyAnswer(
          "y11s-vcr-i4",
          "A car costs $18,000 to buy. Annual running costs are $3,500. After 4 years the resale value is $7,000. Find the total ownership cost.",
          "18\\,000 + 4 \\times 3\\,500 - 7\\,000 = 18\\,000 + 14\\,000 - 7\\,000",
          "25000",
          ["$25000", "$25,000", "25000.00"]
        ),
        financeChoice(
          "y11s-vcr-i5",
          "A car travels 18,000 km per year at 6 L/100 km. How many litres does it use annually?",
          "B",
          ["1080 L", "1080 L", "180 L", "108 L"],
          "(18,000 ÷ 100) × 6 = 180 × 6 = 1,080 L."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Multiplying distance × consumption rate without dividing by 100 first.",
          fix: "The consumption rate is in litres per 100 km, so divide the distance by 100 before multiplying: (distance ÷ 100) × L/100 km.",
        },
        {
          mistake: "Forgetting to subtract the resale value when finding total ownership cost.",
          fix: "Total ownership cost = purchase + running costs − resale value. The resale value reduces the net cost.",
        },
        {
          mistake: "Using the purchase price instead of the full ownership cost to compare vehicles.",
          fix: "A cheaper vehicle may have higher running costs or lower resale value. Always compare total ownership costs over the same period.",
        },
        {
          mistake: "Adding stamp duty to the annual running costs instead of the purchase cost.",
          fix: "Stamp duty is a one-off purchase cost, paid when buying the vehicle. Annual running costs are registration, insurance, fuel, and servicing.",
        },
      ],
      masteryQuiz: [
        moneyAnswer("y11s-vcr-m1", "A car uses 9 L/100 km and travels 10,000 km. Fuel is $1.80/L. Find the fuel cost.", "\\frac{10\\,000}{100} \\times 9 \\times 1.80", "1620", ["$1620", "$1,620", "1620.00"]),
        moneyAnswer("y11s-vcr-m2", "Calculate stamp duty on a $25,000 vehicle at 3%.", "0.03 \\times 25\\,000", "750", ["$750", "750.00"]),
        moneyAnswer("y11s-vcr-m3", "Annual rego $380, insurance $950, fuel $1,620, servicing $350. Find the total annual running cost.", "380 + 950 + 1\\,620 + 350", "3300", ["$3300", "$3,300"]),
        moneyAnswer("y11s-vcr-m4", "Purchase $20,000, annual running $3,300, resale $6,000 after 4 years. Total ownership cost?", "20\\,000 + 4 \\times 3\\,300 - 6\\,000", "27200", ["$27200", "$27,200"]),
        financeChoice("y11s-vcr-m5", "Fuel consumption of 8 L/100 km means:", "A", ["8 litres are used for every 100 km driven", "The car travels 8 km per litre", "8% of fuel is wasted", "The tank holds 8 litres"], "8 litres per 100 km is the standard fuel efficiency measure."),
        moneyAnswer("y11s-vcr-m6", "A car travels 20,000 km at 6 L/100 km. Fuel is $1.85/L. Find the annual fuel cost.", "\\frac{20\\,000}{100} \\times 6 \\times 1.85", "2220", ["$2220", "$2,220"]),
        financeChoice("y11s-vcr-m7", "Which cost is a one-off purchase expense, not an annual running cost?", "C", ["Registration", "Insurance", "Stamp duty", "Servicing"], "Stamp duty is paid once when the vehicle is purchased."),
        moneyAnswer("y11s-vcr-m8", "A buyer pays $28,000 for a car and $840 stamp duty. What is the total purchase outlay?", "28\\,000 + 840", "28840", ["$28840", "$28,840"]),
        moneyAnswer("y11s-vcr-m9", "Car costs $16,000. Annual running $2,800. Resale after 3 years is $5,500. Total ownership cost?", "16\\,000 + 3 \\times 2\\,800 - 5\\,500", "18900", ["$18900", "$18,900"]),
        financeChoice("y11s-vcr-m10", "A car with lower fuel consumption will:", "B", ["Always have lower insurance", "Cost less in fuel per year for the same distance", "Have zero running costs", "Only save money in the first year"], "Less fuel used per 100 km means lower annual fuel expenditure."),
      ],
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "managing-money-revision") {
    return {
      ...base,
      description:
        "Activate Year 10 money skills: convert between percentages and decimals, calculate percentage of a quantity, apply simple interest, and work with income and expenses — essential prior knowledge for Year 11 managing-money topics.",
      learningIntention:
        "Recall and apply Year 10 percentage and financial literacy skills so that Year 11 budgeting, interest, and money management work builds on secure foundations.",
      successCriteria: [
        "Convert a percentage to a decimal and vice versa (divide by 100 or multiply by 100).",
        "Calculate a percentage of a quantity using the decimal form.",
        "Apply the simple interest formula I = Prn to find interest earned or owed.",
        "Identify whether a budget has a surplus or deficit by comparing income with expenses.",
      ],
      teaching: {
        paragraphs: [
          "A percentage is a number out of 100. To convert a percentage to a decimal, divide by 100: 8% = 0.08. To convert a decimal back to a percentage, multiply by 100: 0.135 = 13.5%. Getting this conversion right is essential for all financial calculations involving rates.",
          "To find a percentage of a quantity, convert the percentage to a decimal and multiply: 15% of $240 = 0.15 × 240 = $36. If the question asks for the new total after an increase, add the increase: new total = $240 + $36 = $276.",
          "Simple interest is calculated on the original principal only. The formula is I = Prn, where P is the principal (starting amount), r is the annual interest rate as a decimal, and n is the number of years. The total amount after earning interest is A = P + I.",
          "A budget lists income and expenses. Surplus = income − expenses, when income exceeds expenses. Deficit = expenses − income, when expenses exceed income. A balanced budget has income equal to expenses.",
        ],
        latexBlocks: [
          "\\%\\to\\text{decimal}: \\div 100\\qquad \\text{decimal}\\to\\%: \\times 100",
          "\\text{Percentage of a quantity: convert to decimal, then multiply}",
          "I = Prn,\\quad A = P + I",
        ],
      },
      workedExamples: [
        {
          title: "Finding a percentage of a quantity",
          questionLatex: "\\text{Find 12\\% of \\$350.}",
          steps: [
            {
              explanation: "Convert 12% to a decimal.",
              latex: "12\\% = 0.12",
            },
            {
              explanation: "Multiply by the quantity.",
              latex: "0.12 \\times 350 = \\$42",
            },
          ],
          finalAnswerLatex: "\\$42",
        },
        {
          title: "Simple interest",
          questionLatex:
            "\\text{Calculate the simple interest on \\$5\\,000 at 4\\% per annum for 3 years.}",
          steps: [
            {
              explanation: "Identify P = 5000, r = 0.04, n = 3.",
              latex: "I = Prn = 5\\,000 \\times 0.04 \\times 3",
            },
            {
              explanation: "Calculate.",
              latex: "I = \\$600",
            },
          ],
          finalAnswerLatex: "\\$600",
        },
        {
          title: "Budget surplus or deficit",
          questionLatex:
            "\\text{Weekly income: \\$1\\,200. Weekly expenses: food \\$180, rent \\$500, transport \\$80, other \\$300. Find the weekly surplus or deficit.}",
          steps: [
            {
              explanation: "Total weekly expenses.",
              latex: "180 + 500 + 80 + 300 = \\$1\\,060",
            },
            {
              explanation: "Surplus = income − expenses.",
              latex: "1\\,200 - 1\\,060 = \\$140 \\text{ surplus}",
            },
          ],
          finalAnswerLatex: "\\$140 \\text{ surplus}",
        },
      ],
      guidedPractice: [
        moneyAnswer(
          "y11s-mmr-g1",
          "Convert 7% to a decimal.",
          "7 \\div 100",
          "0.07",
          ["0.070"]
        ),
        moneyAnswer(
          "y11s-mmr-g2",
          "Find 20% of $450.",
          "0.20 \\times 450",
          "90",
          ["$90", "90.00"]
        ),
        moneyAnswer(
          "y11s-mmr-g3",
          "Calculate simple interest on $2,000 at 5% per annum for 2 years.",
          "I = 2\\,000 \\times 0.05 \\times 2",
          "200",
          ["$200", "200.00"]
        ),
        financeChoice(
          "y11s-mmr-g4",
          "Weekly income is $800. Weekly expenses total $950. The outcome is:",
          "B",
          ["$150 surplus", "$150 deficit", "$800 surplus", "Break even"],
          "Expenses exceed income by $950 − $800 = $150, so it is a deficit."
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y11s-mmr-i1",
          "Convert 3.5% to a decimal.",
          "3.5 \\div 100",
          "0.035",
          ["0.0350"]
        ),
        moneyAnswer(
          "y11s-mmr-i2",
          "Find 15% of $640.",
          "0.15 \\times 640",
          "96",
          ["$96", "96.00"]
        ),
        moneyAnswer(
          "y11s-mmr-i3",
          "Calculate simple interest on $3,500 at 6% per annum for 4 years.",
          "I = 3\\,500 \\times 0.06 \\times 4",
          "840",
          ["$840", "840.00"]
        ),
        moneyAnswer(
          "y11s-mmr-i4",
          "Find the total amount after earning $840 simple interest on a $3,500 investment.",
          "A = P + I = 3\\,500 + 840",
          "4340",
          ["$4340", "$4,340", "4340.00"]
        ),
        financeChoice(
          "y11s-mmr-i5",
          "To find 8% of a quantity, you should multiply by:",
          "C",
          ["8", "0.8", "0.08", "80"],
          "8% as a decimal is 8 ÷ 100 = 0.08."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using the percentage directly (e.g. multiplying by 8 instead of 0.08).",
          fix: "Always convert the percentage to a decimal first by dividing by 100. 8% = 0.08, so 8% of $200 = 0.08 × 200 = $16, not 8 × 200.",
        },
        {
          mistake: "In I = Prn, using the percentage rate instead of the decimal rate (e.g. r = 5 instead of r = 0.05).",
          fix: "The r in I = Prn must be a decimal. Divide the annual percentage rate by 100: 5% per annum → r = 0.05.",
        },
        {
          mistake: "Confusing surplus and deficit: subtracting income from expenses when income > expenses.",
          fix: "If income > expenses, the result is a surplus: surplus = income − expenses. If expenses > income, it is a deficit: deficit = expenses − income.",
        },
        {
          mistake: "Confusing simple interest (I = Prn) with the total amount (A = P + I).",
          fix: "I is the interest earned or paid. A is the total, including the original principal. If the question asks for the total amount, add the interest to the principal: A = P + I.",
        },
      ],
      masteryQuiz: [
        moneyAnswer("y11s-mmr-m1", "Convert 4.5% to a decimal.", "4.5 \\div 100", "0.045", ["0.0450"]),
        moneyAnswer("y11s-mmr-m2", "Find 25% of $360.", "0.25 \\times 360", "90", ["$90", "90.00"]),
        moneyAnswer("y11s-mmr-m3", "Calculate simple interest on $4,000 at 3% per annum for 5 years.", "I = 4\\,000 \\times 0.03 \\times 5", "600", ["$600", "600.00"]),
        moneyAnswer("y11s-mmr-m4", "Find the total amount after earning $600 interest on a $4,000 principal.", "A = 4\\,000 + 600", "4600", ["$4600", "$4,600"]),
        financeChoice("y11s-mmr-m5", "Weekly income $1,100, expenses $1,350. Which is correct?", "B", ["$250 surplus", "$250 deficit", "$1,100 surplus", "No change"], "Expenses exceed income: deficit = 1350 − 1100 = $250."),
        moneyAnswer("y11s-mmr-m6", "Convert 0.065 to a percentage.", "0.065 \\times 100", "6.5", ["6.5%", "6.50%"]),
        moneyAnswer("y11s-mmr-m7", "Find 9% of $2,400.", "0.09 \\times 2\\,400", "216", ["$216", "216.00"]),
        financeChoice("y11s-mmr-m8", "In the formula I = Prn, what does n represent?", "C", ["Interest rate", "Number of payments", "Number of years", "Net profit"], "n is the number of years the money is invested or borrowed."),
        moneyAnswer("y11s-mmr-m9", "Calculate simple interest on $1,500 at 8% per annum for 2 years.", "I = 1\\,500 \\times 0.08 \\times 2", "240", ["$240", "240.00"]),
        financeChoice("y11s-mmr-m10", "A budget surplus means:", "A", ["Income exceeds expenses", "Expenses exceed income", "Income equals expenses", "Tax is refunded"], "Surplus = income − expenses, when income > expenses."),
      ],
      masteryPassMark: 0.8,
    };
  }

  return null;
}

