import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson } from "../differentialCalculus";
import { financeChoice, financeShortAnswer, moneyAnswer } from "../questionHelpers";
export function year12Standard2FinanceLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
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
        moneyAnswer("y12s2-invest-g1", "An investment of 2000 dollars earns 5% p.a. compounded annually for 2 years. What is the final balance?", "2000(1.05)^2", "2205"),
        financeShortAnswer("y12s2-invest-g2", "A bank rate is 4.2% p.a. Write the annual growth factor.", "1+0.042", "1.042"),
        moneyAnswer("y12s2-invest-g3", "A savings account grows from 1800 dollars to 1968 dollars. How much interest was earned?", "1968-1800", "168"),
        financeChoice("y12s2-invest-g4", "An investment option has a higher rate but a 60 dollar yearly fee. What should be compared?", "B", ["Only the advertised rate", "The final balance after fees", "Only the first deposit", "The loan repayment amount"], "A fair comparison uses net balance after fees."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-invest-i1", "A term deposit of 1500 dollars earns 3% p.a. compounded annually for 3 years. Find the balance to the nearest cent.", "1500(1.03)^3", "1639.09"),
        moneyAnswer("y12s2-invest-i2", "A 4200 dollar investment has a final balance of 4594.80 dollars. Find the interest earned.", "4594.80-4200", "394.80", ["394.8", "$394.8"]),
        financeShortAnswer("y12s2-invest-i3", "A growth factor is 1.065. What annual percentage rate does this represent?", "1.065-1=0.065", "6.5%", ["6.5", "0.065"]),
        financeChoice("y12s2-invest-i4", "Which calculation correctly models 2800 dollars at 4% p.a. compounded annually for 5 years?", "A", ["2800(1.04)^5", "2800(4)^5", "2800+0.04+5", "2800(0.04)^5"], "The growth factor is 1.04 and the exponent is the number of years."),
        moneyAnswer("y12s2-invest-i5", "Option A returns 3060 dollars. Option B returns 3105 dollars but has a 50 dollar fee. What is Option B's net return?", "3105-50", "3055"),
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
        moneyAnswer("y12s2-invest-m8", "Option B has a final balance of 4260 dollars and a 35 dollar fee. Find the net balance.", "\\text{balance}=\\$4260,\\quad \\text{fee}=\\$35", "4225"),
        financeChoice("y12s2-invest-m9", "A student uses 2500(0.042)^3 for 4.2% compound interest. What is the error?", "A", ["They used 0.042 instead of 1.042 as the growth factor", "They included the principal", "They used an annual rate", "They rounded to cents"], "Compound growth uses 1 + r."),
        financeChoice("y12s2-invest-m10", "Which statement is safest when comparing investments?", "D", ["The highest rate is always best", "Fees never matter", "Shorter terms always earn more", "Compare net balances over the same term"], "Net balance over the same term is the fair comparison."),
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
        financeShortAnswer("y12s2-loan-g1", "A laptop depreciates by 20% per year. What is the decay factor?", "1-0.20", "0.8", ["0.80"]),
        moneyAnswer("y12s2-loan-g2", "A phone worth 1200 dollars depreciates by 15% in one year. What is its value after one year?", "1200(0.85)", "1020"),
        moneyAnswer("y12s2-loan-g3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.01B_n-300,\\quad B_0=5000,\\quad B_1=1.01(5000)-300", "4750"),
        financeChoice("y12s2-loan-g4", "A monthly loan adds 90 dollars interest and the repayment is 75 dollars. What happens to the balance?", "C", ["It decreases by 75 dollars", "It becomes zero", "It increases by 15 dollars", "It must be a depreciation model"], "The interest added is larger than the repayment."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-loan-i1", "A ute worth 24000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "24000(0.90)^2", "19440"),
        financeShortAnswer("y12s2-loan-i2", "A device depreciates by 8% p.a. What decay factor should be used?", "1-0.08", "0.92"),
        moneyAnswer("y12s2-loan-i3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.005B_n-400,\\quad B_0=18000,\\quad B_1=1.005(18000)-400", "17690"),
        moneyAnswer("y12s2-loan-i4", "Use the loan recurrence and current balance shown to find the next balance to the nearest cent.", "B_{n+1}=1.006B_n-450,\\quad B_1=27718,\\quad B_2=1.006(27718)-450", "27434.31"),
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
        moneyAnswer("y12s2-loan-m8", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.004B_n-250,\\quad B_0=12000", "11798"),
        financeChoice("y12s2-loan-m9", "Which expression correctly models 16000 dollars depreciating by 7% for 3 years?", "D", ["16000(1.07)^3", "16000(7)^3", "16000(0.07)^3", "16000(0.93)^3"], "Depreciation uses 1 - 0.07 = 0.93."),
        financeChoice("y12s2-loan-m10", "If a loan balance is increasing despite repayments, the most likely reason is:", "C", ["The repayment is too large", "The interest rate is zero", "Interest added is greater than the repayment", "The balance is depreciating"], "The balance rises when interest added exceeds repayment."),
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
        moneyAnswer("y12s2-ann-g1", "A savings plan follows the recurrence shown. Use the starting balance to find the next balance.", "S_{n+1}=1.01S_n+100,\\quad S_0=500,\\quad S_1=1.01(500)+100", "605"),
        moneyAnswer("y12s2-ann-g2", "An account has 1200 dollars and earns 0.5% for the month before a 200 dollar deposit. Find the new balance.", "1.005(1200)+200", "1406"),
        financeChoice("y12s2-ann-g3", "A regular deposit plan is an example of:", "A", ["An annuity", "A one-off simple interest calculation", "A shortest path", "A tax deduction"], "An annuity involves regular payments or deposits."),
        financeChoice("y12s2-ann-g4", "A loan repayment table shows balances 8000, 7700, 7395. What is happening?", "B", ["The loan is increasing", "The loan is decreasing", "The balance is unchanged", "The account is a weighted network"], "The balance is lower after each repayment."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-ann-i1", "A regular savings account follows the recurrence shown. Use the starting balance to find the next balance.", "S_{n+1}=1.004S_n+150,\\quad S_0=2000,\\quad S_1=1.004(2000)+150", "2158"),
        moneyAnswer("y12s2-ann-i2", "Use the savings recurrence and current balance shown to find the next balance to the nearest cent.", "S_{n+1}=1.004S_n+150,\\quad S_1=2158,\\quad S_2=1.004(2158)+150", "2316.63"),
        moneyAnswer("y12s2-ann-i3", "A student deposits 250 dollars at the end of each year. After the first deposit, interest is 3% before the second deposit. Find the balance after the second deposit.", "250(1.03)+250", "507.50", ["507.5", "$507.5"]),
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
        moneyAnswer("y12s2-ann-m8", "A regular deposit plan adds 75 dollars each month for 6 months with no interest. What is contributed in total?", "\\text{total contribution}=\\text{deposit}\\times\\text{number of deposits}", "450"),
        financeChoice("y12s2-ann-m9", "Which is the best reason to use a recurrence table for annuities?", "D", ["It avoids all percentages", "It makes every answer zero", "It removes the need for context", "It tracks each regular payment period"], "A recurrence table updates the balance period by period."),
        financeChoice("y12s2-ann-m10", "A product says 'low repayments' but the balance falls very slowly. What should be checked?", "A", ["Interest, fees, repayment size, and loan term", "Only the advertisement wording", "Only the first repayment", "Only the account name"], "Repayments must be judged against interest, fees, and term."),
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
      moneyAnswer("y12s2-fin-exam-g1", "An investment of 3000 dollars earns 4% p.a. compounded annually for 2 years. Find the balance.", "3000(1.04)^2", "3244.80", ["3244.8", "$3244.8"]),
      moneyAnswer("y12s2-fin-exam-g2", "A car worth 20000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "20000(0.90)^2", "16200"),
      moneyAnswer("y12s2-fin-exam-g3", "A loan follows the recurrence shown. Use the starting balance to find the next balance.", "B_{n+1}=1.005B_n-350,\\quad B_0=10000,\\quad B_1=1.005(10000)-350", "9700"),
      financeChoice("y12s2-fin-exam-g4", "An investment has a higher rate but a large fee. Which comparison is fairest?", "C", ["Highest rate only", "Lowest fee only", "Net balance over the same term", "The first year only"], "Financial products should be compared over the same term after fees."),
    ],
    independentPractice: [
      moneyAnswer("y12s2-fin-exam-i1", "A 4500 dollar account earns 3.5% p.a. compounded annually for 2 years. Find the balance to the nearest cent.", "4500(1.035)^2", "4820.51"),
      moneyAnswer("y12s2-fin-exam-i2", "Equipment worth 8000 dollars depreciates by 15% in one year. Find its value after one year.", "8000(0.85)", "6800"),
      moneyAnswer("y12s2-fin-exam-i3", "A savings recurrence is shown. Use the starting balance to find the next balance.", "S_{n+1}=1.004S_n+250,\\quad S_0=1500,\\quad S_1=1.004(1500)+250", "1756"),
      moneyAnswer("y12s2-fin-exam-i4", "Option A returns 6120 dollars. Option B returns 6200 dollars but charges an 85 dollar fee. What is Option B's net balance?", "6200-85", "6115"),
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
      moneyAnswer("y12s2-fin-exam-m8", "Option A has a net balance of 4320 dollars. Option B has 4390 dollars but a 90 dollar fee. Find Option B's net balance.", "\\text{Option A}=\\$4320,\\quad \\text{Option B}=\\$4390,\\quad \\text{fee}=\\$90", "4300"),
      financeChoice("y12s2-fin-exam-m9", "A loan repayment is smaller than the monthly interest added. What happens?", "C", ["The balance must decrease", "The loan is fully repaid", "The balance increases", "It becomes an investment"], "If interest added is larger than repayment, debt increases."),
      financeChoice("y12s2-fin-exam-m10", "Which is the best financial decision-making habit?", "A", ["Compare final balances after rates, fees, and time", "Choose the biggest advertised rate every time", "Ignore fees", "Use simple interest for every product"], "Good comparisons use all relevant costs and the same time period."),
    ],
  };
}

