import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { financeChoice, moneyAnswer as baseMoneyAnswer } from "../questionHelpers";

function earningMoneyFeedback(prompt: string, answer: string) {
  if (prompt.includes("salary") && (prompt.includes("weekly") || prompt.includes("fortnightly"))) {
    return `Match the pay period before calculating. Divide the annual salary by the number of that pay period in a year, which gives ${answer} dollars.`;
  }
  if (prompt.includes("time-and-a-half") && prompt.includes("hourly rate")) {
    return `Time-and-a-half is a multiplier, not an extra 1.5 dollars. Multiply the ordinary hourly rate by 1.5 to get ${answer} dollars per hour.`;
  }
  if (prompt.includes("double-time") || prompt.includes("double time")) {
    return `Double time means each of these hours is paid at twice the ordinary rate. Apply the 2 times multiplier only to the stated higher-rate hours, giving ${answer} dollars.`;
  }
  if (prompt.includes("overtime pay")) {
    return `Keep ordinary hours and overtime hours separate. Multiply the overtime hours by the higher overtime rate, then combine pay components only if the question asks for a total; here the result is ${answer} dollars.`;
  }
  if (prompt.includes("commission") && (prompt.includes("total") || prompt.includes("earnings"))) {
    return `Calculate commission first by changing the percentage to a decimal and multiplying by sales. Then add the base pay because both parts count as earnings, giving ${answer} dollars.`;
  }
  if (prompt.includes("commission")) {
    return `Commission is a percentage of sales. Convert the percentage to a decimal before multiplying by the sales amount; the commission is ${answer} dollars.`;
  }
  if (prompt.includes("piecework") || prompt.includes("per parcel") || prompt.includes("each brochure") || prompt.includes("each tray") || prompt.includes("gift boxes")) {
    return `Piecework pays for each completed item rather than each hour. Multiply the number of items by the rate per item to get ${answer} dollars.`;
  }
  if (prompt.includes("What was the gross pay")) {
    return `Gross pay comes before deductions. Reverse the subtraction by adding the deductions back to net pay, giving ${answer} dollars.`;
  }
  if (prompt.includes("net pay") && prompt.includes("gross pay")) {
    return `Net pay is what remains after deductions leave the payslip. Start with gross pay and subtract every listed deduction to get ${answer} dollars.`;
  }
  if (prompt.includes("deduction") || prompt.includes("tax withheld") || prompt.includes("tax withholding")) {
    if (prompt.includes("percent")) {
      return `A percentage deduction is part of the gross pay. Convert the percentage to a decimal and multiply by gross pay to get ${answer} dollars.`;
    }
    return `Deductions are amounts taken away after gross pay is calculated. Subtract every listed deduction to get ${answer} dollars.`;
  }
  if (prompt.includes("gross earnings") || prompt.includes("gross pay") || prompt.includes("total earnings") || prompt.includes("total pay") || prompt.includes("total shift pay")) {
    return `Gross earnings include all pay components before deductions. Add the ordinary pay, higher-rate pay, and any allowances named in the question to get ${answer} dollars.`;
  }
  if (prompt.includes("ordinary pay") || prompt.includes("hours") || prompt.includes("hourly")) {
    return `Hourly pay means a rate is earned once for each hour worked. Multiply hours by the hourly rate to get ${answer} dollars.`;
  }
  if (prompt.includes("superannuation") || prompt.includes("super contribution") || prompt.includes("employer super")) {
    return `Superannuation is 11% of ordinary earnings. Convert 11% to 0.11 and multiply by the earnings amount to get ${answer} dollars.`;
  }
  if (prompt.includes("leave loading")) {
    return `Leave loading is an additional 17.5% on the annual leave pay. Convert 17.5% to 0.175 and multiply by the leave pay to get ${answer} dollars.`;
  }
  if (prompt.includes("annual leave pay") || prompt.includes("leave pay for")) {
    return `Annual leave pay is the ordinary weekly rate multiplied by the number of weeks of leave taken. Multiply to get ${answer} dollars.`;
  }
  if (prompt.includes("total annual leave") || (prompt.includes("leave") && prompt.includes("loading") && prompt.includes("total"))) {
    return `Total annual leave pay is the leave pay plus 17.5% loading. Add both amounts to get ${answer} dollars.`;
  }
  if (prompt.includes("Youth Allowance") || prompt.includes("youth allowance")) {
    if (prompt.includes("reduction") || prompt.includes("reduce")) {
      return `The payment reduces by 50 cents for each dollar earned above the income-free area. Multiply the excess income by 0.50 to get the ${answer} dollar reduction.`;
    }
    if (prompt.includes("total fortnightly") || prompt.includes("total income")) {
      return `Add the reduced Youth Allowance payment and the earned income to find total fortnightly income of ${answer} dollars.`;
    }
    return `Youth Allowance is a fortnightly payment for eligible young people. Use the given rate and income-free area to get ${answer}.`;
  }
  if (prompt.includes("Family Tax Benefit") || prompt.includes("fortnightly") && prompt.includes("benefit")) {
    return `Multiply the fortnightly benefit rate by 26 to find the annual amount of ${answer} dollars.`;
  }
  return `Keep the units and pay period consistent, then combine only the amounts requested. The calculation gives ${answer} dollars.`;
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
    explanation: earningMoneyFeedback(prompt, answer),
  };
}

function earningMoneyWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "wages-salaries-payslips") {
    return [
      {
        title: "Calculating hourly wages",
        questionLatex: "\\text{Mia works 18 ordinary hours at }\\$24\\text{/hour.}",
        steps: [
          { explanation: "Ordinary hourly pay is hours multiplied by the hourly rate." },
          { explanation: "Multiply 18 by 24.", latex: "18\\times 24=432" },
        ],
        finalAnswerLatex: "\\$432",
      },
      {
        title: "Converting salary to weekly pay",
        questionLatex: "\\text{A salary is }\\$62\\,400\\text{ per year. Find weekly pay.}",
        steps: [
          { explanation: "A salary is usually stated as a yearly amount." },
          { explanation: "Divide by 52 weeks.", latex: "62400\\div 52=1200" },
        ],
        finalAnswerLatex: "\\$1200\\text{ per week}",
      },
      {
        title: "Reading basic payslip fields",
        questionLatex:
          "\\begin{array}{c|c}\\text{Ordinary pay}&\\$560\\\\\\text{Allowance}&\\$40\\\\\\text{Tax withheld}&\\$110\\end{array}",
        steps: [
          { explanation: "Gross pay is the total before deductions." },
          { explanation: "Add ordinary pay and allowances.", latex: "560+40=600" },
        ],
        finalAnswerLatex: "\\text{Gross pay }=\\$600",
      },
    ];
  }

  if (slug === "overtime-penalty-rates-allowances") {
    return [
      {
        title: "Time-and-a-half overtime",
        questionLatex: "\\text{4 overtime hours at time-and-a-half on }\\$30\\text{/hour}",
        steps: [
          { explanation: "Time-and-a-half means multiply the ordinary rate by 1.5.", latex: "30\\times 1.5=45" },
          { explanation: "Multiply by the overtime hours.", latex: "4\\times 45=180" },
        ],
        finalAnswerLatex: "\\$180",
      },
      {
        title: "Double time and ordinary pay",
        questionLatex: "\\text{8 ordinary hours and 2 double-time hours at }\\$28\\text{/hour}",
        steps: [
          { explanation: "Ordinary pay is 8 hours at 28 dollars per hour.", latex: "8\\times 28=224" },
          { explanation: "Double time is 2 hours at 56 dollars per hour.", latex: "2\\times (2\\times 28)=112" },
        ],
        finalAnswerLatex: "\\$224+\\$112=\\$336",
      },
      {
        title: "Adding an allowance",
        questionLatex: "\\text{Base shift pay }\\$210\\text{ plus meal allowance }\\$18.50",
        steps: [
          { explanation: "Allowances are added to earnings when the question includes them." },
          { explanation: "Add the allowance to the base shift pay.", latex: "210+18.50=228.50" },
        ],
        finalAnswerLatex: "\\$228.50",
      },
    ];
  }

  if (slug === "commission-piecework") {
    return [
      {
        title: "Commission as a percentage of sales",
        questionLatex: "\\text{Commission is }6\\%\\text{ of }\\$3500\\text{ in sales.}",
        steps: [
          { explanation: "Convert 6 percent to 0.06." },
          { explanation: "Multiply by the sales amount.", latex: "0.06\\times 3500=210" },
        ],
        finalAnswerLatex: "\\$210",
      },
      {
        title: "Base pay plus commission",
        questionLatex: "\\text{Base pay }\\$480\\text{ plus }4\\%\\text{ of }\\$2500\\text{ sales}",
        steps: [
          { explanation: "Calculate the commission first.", latex: "0.04\\times 2500=100" },
          { explanation: "Add it to the base pay.", latex: "480+100=580" },
        ],
        finalAnswerLatex: "\\$580",
      },
      {
        title: "Piecework earnings",
        questionLatex: "\\text{48 items paid at }\\$3.75\\text{ per item}",
        steps: [
          { explanation: "Piecework pays for each item completed." },
          { explanation: "Multiply the number of items by the piece rate.", latex: "48\\times 3.75=180" },
        ],
        finalAnswerLatex: "\\$180",
      },
    ];
  }

  if (slug === "tax-deductions-net-pay") {
    return [
      {
        title: "Net pay from gross pay and deductions",
        questionLatex: "\\text{Gross pay }\\$920,\\ \\text{tax }\\$165,\\ \\text{other deduction }\\$25",
        steps: [
          { explanation: "Net pay is gross pay minus all deductions." },
          { explanation: "Subtract the tax and the other deduction.", latex: "920-165-25=730" },
        ],
        finalAnswerLatex: "\\$730",
      },
      {
        title: "Percentage deduction",
        questionLatex: "\\text{A }5\\%\\text{ deduction is taken from }\\$840.",
        steps: [
          { explanation: "Convert 5 percent to 0.05." },
          { explanation: "Multiply by gross pay.", latex: "0.05\\times 840=42" },
        ],
        finalAnswerLatex: "\\$42",
      },
      {
        title: "Interpreting a payslip",
        questionLatex:
          "\\begin{array}{c|c}\\text{Gross pay}&\\$760\\\\\\text{Tax withheld}&\\$118\\\\\\text{Union fee}&\\$12\\end{array}",
        steps: [
          { explanation: "Tax withheld and union fees are deductions." },
          { explanation: "Subtract both from gross pay.", latex: "760-118-12=630" },
        ],
        finalAnswerLatex: "\\text{Net pay }=\\$630",
      },
    ];
  }

  if (slug === "leave-entitlements-superannuation") {
    return [
      {
        title: "Annual leave pay with leave loading",
        questionLatex:
          "\\text{An employee earns }\\$1000\\text{ per week. Find total annual leave pay including 17.5\\% loading (4 weeks leave).}",
        steps: [
          { explanation: "Calculate leave pay for 4 weeks at the ordinary weekly rate.", latex: "\\text{Leave pay} = 4 \\times 1000 = 4000" },
          { explanation: "Calculate leave loading at 17.5% of the leave pay.", latex: "\\text{Loading} = 0.175 \\times 4000 = 700" },
          { explanation: "Add the leave pay and loading to find the total.", latex: "\\text{Total} = 4000 + 700 = 4700" },
        ],
        finalAnswerLatex: "\\$4700",
      },
      {
        title: "Employer superannuation contribution",
        questionLatex:
          "\\text{An employee earns }\\$800\\text{ per week. Find the weekly employer super contribution at 11\\%.}",
        steps: [
          { explanation: "Convert the super rate to a decimal.", latex: "11\\% = 0.11" },
          { explanation: "Multiply ordinary earnings by 0.11.", latex: "0.11 \\times 800 = 88" },
        ],
        finalAnswerLatex: "\\$88\\text{ per week}",
      },
    ];
  }

  if (slug === "government-benefits-allowances") {
    return [
      {
        title: "Full Youth Allowance (income below threshold)",
        questionLatex:
          "\\text{Base rate }\\$630\\text{/fortnight. Income-free area }\\$620.\\text{ Student earns }\\$400\\text{/fortnight. Find payment.}",
        steps: [
          { explanation: "Check whether earned income is below the income-free area.", latex: "400 < 620 \\Rightarrow \\text{full payment applies}" },
          { explanation: "The full base rate is paid with no reduction.", latex: "\\text{Payment} = \\$630" },
        ],
        finalAnswerLatex: "\\$630\\text{/fortnight (no reduction)}",
      },
      {
        title: "Reduced Youth Allowance (income above threshold)",
        questionLatex:
          "\\text{Base rate }\\$630\\text{/fortnight. Income-free area }\\$620.\\text{ Student earns }\\$800\\text{/fortnight.}",
        steps: [
          { explanation: "Find income above the income-free area.", latex: "800 - 620 = 180" },
          { explanation: "Reduction is 50 cents per dollar above the threshold.", latex: "0.50 \\times 180 = 90" },
          { explanation: "Subtract reduction from the base rate.", latex: "630 - 90 = 540" },
        ],
        finalAnswerLatex: "\\$540\\text{/fortnight}",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed gross pay question`,
      questionLatex:
        "\\text{Ordinary pay }\\$540,\\ \\text{overtime }\\$90,\\ \\text{allowance }\\$25",
      steps: [
        { explanation: "Gross pay includes all earnings before deductions." },
        { explanation: "Add ordinary pay, overtime and allowance.", latex: "540+90+25=655" },
      ],
      finalAnswerLatex: "\\$655",
    },
    {
      title: `${title}: commission and net pay`,
      questionLatex:
        "\\text{Base }\\$500,\\ 3\\%\\text{ of }\\$4000\\text{ sales, deductions }\\$130",
      steps: [
        { explanation: "Calculate commission first.", latex: "0.03\\times 4000=120" },
        { explanation: "Find gross pay, then subtract deductions.", latex: "500+120-130=490" },
      ],
      finalAnswerLatex: "\\$490",
    },
  ];
}



export function year11StandardEarningMoneyLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "money-and-financial-mathematics") {
    return null;
  }

  const base = {
    workedExamples: earningMoneyWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "wages-salaries-payslips") {
    return {
      ...base,
      description:
        "Calculate hourly wages and salary pay, then interpret ordinary hours, gross pay, and basic payslip fields.",
      learningIntention:
        "Calculate wages and salary amounts and read basic information from payslips.",
      successCriteria: [
        "Calculate hourly pay from ordinary hours and an hourly rate.",
        "Convert a yearly salary to weekly pay.",
        "Identify gross pay on a simple payslip.",
        "Compare wage and salary earning contexts.",
      ],
      teaching: {
        paragraphs: [
          "An hourly wage pays the same rate once for each ordinary hour worked. If someone works 12 hours at 25 dollars per hour, think of twelve lots of 25 dollars.",
          "A salary is usually written as a yearly total. To compare it with weekly work, change the time unit first by dividing by 52 weeks.",
          "Gross pay is the total earned before anything is taken out. Ordinary pay and allowances add to gross pay; tax and other deductions come later.",
          "Wages can change when hours change, while a salary is more stable across pay periods. Always compare jobs over the same time period.",
        ],
        latexBlocks: [
          "\\text{hourly pay}=\\text{ordinary hours}\\times\\text{hourly rate}",
          "\\text{weekly salary}=\\text{annual salary}\\div 52",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-wage-g1", "Lina works 12 ordinary hours at a bookstore at 25 dollars per hour. What is her gross pay for the week?", "\\text{hours}=12,\\quad \\text{rate}=\\$25/\\text{h}", "300", ["$300", "300.00", "$300.00"]),
        moneyAnswer("earn-wage-g2", "A school office trainee is paid a salary of 52,000 dollars per year. What is the weekly salary amount?", "\\text{annual salary}=\\$52{,}000,\\quad \\text{weeks}=52", "1000", ["$1000", "1,000", "$1,000", "1000.00", "$1000.00"]),
        financeChoice("earn-wage-g3", "Which payslip field shows pay before deductions?", "B", ["Net pay", "Gross pay", "Tax withheld", "Superannuation"], "Gross pay is before deductions."),
        financeChoice("earn-wage-g4", "Which worker is most clearly paid a wage?", "A", ["Paid 28 dollars for each hour worked", "Paid 70,000 dollars per year", "Paid a fixed monthly salary", "Paid once per year only"], "Hourly pay is a wage structure."),
      ],
      independentPractice: [
        moneyAnswer("earn-wage-i1", "Kai works 20 ordinary hours at a swimming centre for 22 dollars per hour. What gross pay should appear on his payslip?", "\\text{hours}=20,\\quad \\text{rate}=\\$22/\\text{h}", "440", ["$440", "440.00", "$440.00"]),
        moneyAnswer("earn-wage-i2", "A junior receptionist has an annual salary of 62,400 dollars. What is the weekly salary amount?", "\\text{annual salary}=\\$62{,}400,\\quad \\text{weeks}=52", "1200", ["$1200", "1,200", "$1,200", "1200.00", "$1200.00"]),
        moneyAnswer("earn-wage-i3", "A payslip lists ordinary pay of 510 dollars and a travel allowance of 35 dollars. What is the gross pay?", "\\text{ordinary pay}=\\$510,\\quad \\text{travel allowance}=\\$35", "545", ["$545", "545.00", "$545.00"]),
        financeChoice("earn-wage-i4", "Which statement is true about salary?", "C", ["It is always paid by the hour", "It cannot be converted to weekly pay", "It is often stated as a yearly amount", "It is the same as tax withheld"], "Salary is usually stated annually."),
        financeChoice("earn-wage-i5", "A student comparing two jobs should compare what over the same time period?", "D", ["Only job titles", "Only workplace distance", "Only tax labels", "Expected earnings"], "Earnings should be compared over equivalent time periods."),
      ],
      commonMistakes: [
        { mistake: "Giving 150 as net pay when a payslip shows gross pay of 150 dollars and tax withheld of 20 dollars.", fix: "Gross pay is before deductions. Net pay = 150 - 20 = 130." },
        { mistake: "Adding hours and hourly rate instead of multiplying: 18 + 24 = 42 instead of 18 × 24 = 432.", fix: "Hourly pay multiplies hours by rate. Check by thinking: 18 hours at 24 dollars each is 18 × 24." },
        { mistake: "Dividing a 52,000 dollar annual salary by 12 to get weekly pay.", fix: "There are 52 weeks in a year, not 12. Weekly pay = 52,000 ÷ 52 = 1,000." },
        { mistake: "Comparing 28 dollars per hour directly with a 70,000 dollar annual salary to decide which pays more.", fix: "Convert to the same period first: 70,000 ÷ 52 ≈ 1,346 per week, then compare with weekly wages." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-wage-m1", "Amelia works a short cafe shift of 10 ordinary hours at 30 dollars per hour. Find her gross pay.", "\\text{hours}=10,\\quad \\text{rate}=\\$30/\\text{h}", "300", ["$300", "300.00", "$300.00"]),
        moneyAnswer("earn-wage-m2", "A trainee administrator has an annual salary of 41,600 dollars. Find the weekly salary amount.", "\\text{annual salary}=\\$41{,}600,\\quad \\text{weeks}=52", "800", ["$800", "800.00", "$800.00"]),
        financeChoice("earn-wage-m3", "Ordinary hours are:", "A", ["Standard hours paid at the normal rate", "Hours paid at double time", "Tax withheld", "A deduction"], "Ordinary hours are paid at the ordinary rate."),
        financeChoice("earn-wage-m4", "Gross pay means:", "B", ["Pay after deductions", "Pay before deductions", "Tax only", "Superannuation only"], "Gross pay is before deductions."),
        moneyAnswer("earn-wage-m5", "A payslip lists ordinary pay of 480 dollars and a meal allowance of 20 dollars. What is the gross pay?", "\\text{ordinary pay}=\\$480,\\quad \\text{meal allowance}=\\$20", "500", ["$500", "500.00", "$500.00"]),
        moneyAnswer("earn-wage-m6", "Jay works 15 ordinary hours at a sports centre for 26 dollars per hour. Find his gross pay.", "\\text{hours}=15,\\quad \\text{rate}=\\$26/\\text{h}", "390", ["$390", "390.00", "$390.00"]),
        financeChoice("earn-wage-m7", "Which is a salary context?", "C", ["Paid per item", "Paid per hour only", "Paid 78,000 dollars per year", "Paid only commission"], "A yearly amount is a salary context."),
        moneyAnswer("earn-wage-m8", "A trainee manager's salary is 57,200 dollars per year. What is the weekly salary amount?", "\\text{annual salary}=\\$57{,}200,\\quad \\text{weeks}=52", "1100", ["$1100", "1,100", "$1,100", "1100.00", "$1100.00"]),
        {
          id: "earn-wage-m9",
          prompt:
            "A worker earns 812 dollars in one week for 32 hours of work. Find the hourly rate, rounded to the nearest cent.",
          latex:
            "\\text{weekly pay}=\\$812,\\quad \\text{hours}=32",
          answer: "25.38",
          acceptedAnswers: [
            "$25.38",
            "25.38",
            "25.38 dollars",
            "$25.38 per hour",
            "25.38 per hour",
          ],
          hint: "Divide the weekly pay by the number of hours worked.",
          explanation:
            "Hourly rate = weekly pay divided by hours. $812\\div32=25.375$, which rounds to $\\$25.38$ per hour.",
        },
        {
          id: "earn-wage-m10",
          prompt:
            "An annual salary is 71500 dollars. Find the fortnightly gross pay, rounded to the nearest dollar.",
          latex: "\\text{annual salary}=\\$71500",
          answer: "2750",
          acceptedAnswers: [
            "$2750",
            "$2,750",
            "2750",
            "2,750",
            "2750 dollars",
          ],
          hint: "There are 26 fortnights in a year.",
          explanation:
            "There are 26 fortnights in a year, so fortnightly pay is $71500\\div26=2750$.",
        },
      ],
    };
  }

  if (lesson.slug === "overtime-penalty-rates-allowances") {
    return {
      ...base,
      description:
        "Calculate overtime, time-and-a-half, double time, penalty rates, allowances, and total earnings with mixed rates.",
      learningIntention:
        "Calculate total earnings when ordinary pay is combined with overtime, penalty rates, and allowances.",
      successCriteria: [
        "Calculate time-and-a-half and double-time rates.",
        "Calculate pay for hours worked at mixed rates.",
        "Add allowances to earnings when appropriate.",
        "Interpret penalty-rate contexts on simple payslips.",
      ],
      teaching: {
        paragraphs: [
          "Overtime is paid for the extra hours beyond ordinary work. Keep those hours separate because only the overtime hours receive the higher rate.",
          "Time-and-a-half means multiply the ordinary rate by 1.5; double time means multiply it by 2. These are multipliers, not amounts to add.",
          "Penalty rates reward work at particular times, such as weekends or public holidays. Allowances are separate extra amounts paid for a cost or duty.",
          "For a mixed shift, calculate ordinary pay, higher-rate pay, and allowances as separate pieces. Add the pieces only after each one has the correct rate.",
        ],
        latexBlocks: [
          "\\text{time-and-a-half rate}=1.5\\times\\text{ordinary rate}",
          "\\text{total earnings}=\\text{ordinary pay}+\\text{overtime pay}+\\text{allowances}",
          "\\text{overtime pay} = \\text{overtime rate} \\times \\text{hours}",
          "\\text{double time} = 2 \\times \\text{ordinary hourly rate}",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-ot-g1", "A cinema pays time-and-a-half after 9 pm. If the ordinary rate is 30 dollars per hour, what is the overtime hourly rate?", "\\text{ordinary rate}=\\$30/\\text{h},\\quad \\text{time-and-a-half}", "45", ["$45", "45.00", "$45.00"]),
        moneyAnswer("earn-ot-g2", "Sam works 3 public-holiday hours at double time. The ordinary rate is 24 dollars per hour. Find the public-holiday pay.", "\\text{hours}=3,\\quad \\text{ordinary rate}=\\$24/\\text{h},\\quad \\text{double time}", "144", ["$144", "144.00", "$144.00"]),
        moneyAnswer("earn-ot-g3", "A payslip lists ordinary pay 220 dollars, overtime 90 dollars, and a laundry allowance 15 dollars. Find gross earnings.", "\\text{ordinary pay}=\\$220,\\quad \\text{overtime}=\\$90,\\quad \\text{allowance}=\\$15", "325", ["$325", "325.00", "$325.00"]),
        financeChoice("earn-ot-g4", "Which rate is highest?", "C", ["Ordinary rate", "Time-and-a-half", "Double time", "A zero allowance"], "Double time is 2 times the ordinary rate."),
      ],
      independentPractice: [
        moneyAnswer("earn-ot-i1", "A supermarket assistant works 4 overtime hours at time-and-a-half. The ordinary rate is 28 dollars per hour. What is the overtime pay?", "\\text{overtime hours}=4,\\quad \\text{ordinary rate}=\\$28/\\text{h},\\quad \\text{time-and-a-half}", "168", ["$168", "168.00", "$168.00"]),
        moneyAnswer("earn-ot-i2", "A bowling alley roster shows 8 ordinary hours at 25 dollars per hour and 2 public-holiday hours at double time. What is the total pay?", "\\text{ordinary: }8\\text{ h at }\\$25/\\text{h},\\quad \\text{public holiday: }2\\text{ h double time}", "300", ["$300", "300.00", "$300.00"]),
        moneyAnswer("earn-ot-i3", "A restaurant shift pays 190 dollars plus a meal allowance of 18.50 dollars. What is the total shift pay?", "\\text{shift pay}=\\$190,\\quad \\text{meal allowance}=\\$18.50", "208.50", ["$208.50", "208.5", "$208.5"]),
        financeChoice("earn-ot-i4", "A Sunday shift paid at a higher rate is most likely an example of:", "B", ["Salary conversion", "Penalty rate", "Piecework", "Net pay"], "Penalty rates are higher rates for certain times."),
        moneyAnswer("earn-ot-i5", "A tutoring centre pays time-and-a-half for late shifts. If the ordinary rate is 32 dollars per hour, find the late-shift hourly rate.", "\\text{ordinary rate}=\\$32/\\text{h},\\quad \\text{time-and-a-half}", "48", ["$48", "48.00", "$48.00"]),
      ],
      commonMistakes: [
        { mistake: "Paying time-and-a-half for all 10 hours when only 2 of them are overtime hours.", fix: "Calculate ordinary pay for 8 hours at the normal rate, then overtime pay for the 2 overtime hours at 1.5×." },
        { mistake: "Finding the time-and-a-half rate as 30 + 1.5 = 31.50 instead of 30 × 1.5 = 45.", fix: "Time-and-a-half multiplies the whole hourly rate: 30 × 1.5 = 45, not 30 + 1.5." },
        { mistake: "Reporting total earnings as 228 dollars when the shift pays 210 dollars and an 18.50 dollar meal allowance is listed.", fix: "Add the allowance: 210 + 18.50 = 228.50. Include every stated allowance in gross earnings." },
        { mistake: "Subtracting tax from the total when the question asks for gross earnings only.", fix: "Gross earnings include ordinary pay, overtime, and allowances. Only subtract deductions when the question asks for net pay." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-ot-m1", "A retail award pays time-and-a-half on weeknights. If the ordinary rate is 20 dollars per hour, find the weeknight hourly rate.", "\\text{ordinary rate}=\\$20/\\text{h},\\quad \\text{penalty}=\\text{time-and-a-half}", "30", ["$30", "30.00", "$30.00"]),
        moneyAnswer("earn-ot-m2", "A casual worker completes 5 Sunday hours at double time. The ordinary rate is 18 dollars per hour. Find the Sunday pay.", "\\text{Sunday hours}=5,\\quad \\text{ordinary rate}=\\$18/\\text{h},\\quad \\text{rate}=\\text{double time}", "180", ["$180", "180.00", "$180.00"]),
        moneyAnswer("earn-ot-m3", "A rostered shift pays 240 dollars ordinary pay and 60 dollars overtime pay. What are the total gross earnings?", "\\text{ordinary pay}=\\$240,\\quad \\text{overtime pay}=\\$60", "300", ["$300", "300.00", "$300.00"]),
        financeChoice("earn-ot-m4", "A travel allowance should usually be:", "A", ["Added to earnings", "Subtracted as tax", "Ignored", "Divided by 52"], "Allowances are extra paid amounts in these contexts."),
        moneyAnswer("earn-ot-m5", "A lifeguard works 2 overtime hours at time-and-a-half. The ordinary rate is 40 dollars per hour. Find overtime pay.", "\\text{overtime hours}=2,\\quad \\text{ordinary rate}=\\$40/\\text{h},\\quad \\text{rate}=\\text{time-and-a-half}", "120", ["$120", "120.00", "$120.00"]),
        moneyAnswer("earn-ot-m6", "A weekly payslip shows 320 dollars ordinary pay, 80 dollars penalty pay and a 25 dollar travel allowance. Find gross earnings.", "\\text{ordinary}=\\$320,\\quad \\text{penalty}=\\$80,\\quad \\text{allowance}=\\$25", "425", ["$425", "425.00", "$425.00"]),
        financeChoice("earn-ot-m7", "Double time means:", "B", ["1.5 times the ordinary rate", "2 times the ordinary rate", "Half the ordinary rate", "No pay"], "Double time doubles the ordinary rate."),
        moneyAnswer("earn-ot-m8", "A warehouse pays double time on a public holiday. If ordinary pay is 27 dollars per hour, find the public-holiday hourly rate.", "\\text{ordinary rate}=\\$27/\\text{h},\\quad \\text{rate}=\\text{double time}", "54", ["$54", "54.00", "$54.00"]),
        financeChoice("earn-ot-m9", "The best first step in a mixed-rate question is:", "D", ["Guess the total", "Subtract tax first", "Ignore ordinary hours", "Separate the hours by pay rate"], "Separate ordinary, overtime and penalty hours first."),
        moneyAnswer("earn-ot-m10", "A delivery shift pays 150 dollars plus a 12 dollar travel allowance. What are the total earnings?", "\\text{shift pay}=\\$150,\\quad \\text{travel allowance}=\\$12", "162", ["$162", "162.00", "$162.00"]),
      ],
    };
  }

  if (lesson.slug === "commission-piecework") {
    return {
      ...base,
      description:
        "Calculate commission, base pay plus commission, piecework earnings, and compare earning structures for reasonableness.",
      learningIntention:
        "Calculate commission and piecework earnings and compare different earning structures.",
      successCriteria: [
        "Calculate commission as a percentage of sales.",
        "Add base pay and commission.",
        "Calculate piecework earnings from an item rate.",
        "Choose reasonable earning structures for practical contexts.",
      ],
      teaching: {
        paragraphs: [
          "Commission is pay linked to sales. A 6 percent commission means the worker earns 6 cents from each dollar of sales, so use 0.06 in the calculation.",
          "Some jobs pay commission only; others pay a base amount plus commission. If a base is listed, calculate the commission first and then add both earnings.",
          "Piecework pays once for every item completed. Multiply the number of items by the rate per item; hours are irrelevant unless the question explicitly asks for them.",
          "When comparing jobs, hold the sales amount, item count, or time period steady. A comparison is only fair when both options are measured on the same basis.",
        ],
        latexBlocks: [
          "\\text{commission}=\\text{commission rate}\\times\\text{sales}",
          "\\text{piecework pay}=\\text{number of items}\\times\\text{rate per item}",
          "\\text{commission} = \\text{rate} \\times \\text{sales}",
          "\\text{piecework pay} = \\text{rate per item} \\times \\text{number of items}",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-com-g1", "A shoe-store worker earns 5 percent commission on 2000 dollars of sales. Find the commission.", "\\text{sales}=\\$2000,\\quad \\text{commission rate}=5\\%", "100", ["$100", "100.00", "$100.00"]),
        moneyAnswer("earn-com-g2", "Noah earns 450 dollars base pay and 80 dollars commission for the week. Find total earnings.", "\\text{base pay}=\\$450,\\quad \\text{commission}=\\$80", "530", ["$530", "530.00", "$530.00"]),
        moneyAnswer("earn-com-g3", "A farm worker is paid 4 dollars for each tray packed and packs 35 trays. Find piecework pay.", "\\text{rate per tray}=\\$4,\\quad \\text{trays}=35", "140", ["$140", "140.00", "$140.00"]),
        financeChoice("earn-com-g4", "Which job uses commission?", "A", ["Paid 6 percent of sales", "Paid a fixed yearly salary", "Paid only for hours worked", "Paid tax withheld"], "Commission is based on sales."),
      ],
      independentPractice: [
        moneyAnswer("earn-com-i1", "A phone salesperson earns 8 percent commission on 1500 dollars sales. Find the commission.", "\\text{sales}=\\$1500,\\quad \\text{commission rate}=8\\%", "120", ["$120", "120.00", "$120.00"]),
        moneyAnswer("earn-com-i2", "A sales assistant earns 500 dollars base pay plus 4 percent of 3000 dollars sales. Find total earnings.", "\\text{base pay}=\\$500,\\quad \\text{sales}=\\$3000,\\quad \\text{commission rate}=4\\%", "620", ["$620", "620.00", "$620.00"]),
        moneyAnswer("earn-com-i3", "Piecework pays 2.50 dollars for each brochure delivered. A student delivers 60 brochures. Find earnings.", "\\text{rate per brochure}=\\$2.50,\\quad \\text{brochures}=60", "150", ["$150", "150.00", "$150.00"]),
        financeChoice("earn-com-i4", "Which comparison is fairest?", "C", ["One day vs one year", "Before tax vs after tax", "Both options over the same sales amount", "Ignoring the number of items"], "Compare over the same basis."),
        financeChoice("earn-com-i5", "If sales are zero, which earning structure still gives pay?", "B", ["Commission only", "Base pay plus commission", "Piecework with zero items", "Percentage of sales only"], "Base pay still applies even if commission is zero."),
      ],
      commonMistakes: [
        { mistake: "Computing 6% commission on 3,500 dollars as 6 × 3,500 = 21,000 instead of 0.06 × 3,500 = 210.", fix: "Convert the percentage to a decimal first: 6% = 0.06, so commission = 0.06 × 3,500 = 210." },
        { mistake: "Giving 100 dollars as the total when base pay is 480 dollars and commission is 100 dollars.", fix: "Base plus commission means add both: total earnings = 480 + 100 = 580." },
        { mistake: "Dividing piecework items by hours as if piecework were an hourly rate.", fix: "Multiply items by rate per item: 48 × 3.75 = 180. Hours are not part of the piecework formula." },
        { mistake: "Comparing two paying structures using different sales amounts to decide which is better.", fix: "Use the same sales figure for both options before comparing totals." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-com-m1", "A weekend market stall pays 10 percent commission on 900 dollars sales. Find the commission.", "\\text{commission rate}=10\\%,\\quad \\text{sales}=\\$900", "90", ["$90", "90.00", "$90.00"]),
        moneyAnswer("earn-com-m2", "A real-estate assistant earns 3 percent commission on 4000 dollars of referral sales. Find the commission.", "\\text{commission rate}=3\\%,\\quad \\text{sales}=\\$4000", "120", ["$120", "120.00", "$120.00"]),
        moneyAnswer("earn-com-m3", "A shop assistant earns 350 dollars base pay plus 95 dollars commission. Find total pay.", "\\text{base pay}=\\$350,\\quad \\text{commission}=\\$95", "445", ["$445", "445.00", "$445.00"]),
        moneyAnswer("earn-com-m4", "A warehouse assistant labels 50 parcels at a piecework rate of 1.80 dollars each. What is the pay?", "\\text{parcels}=50,\\quad \\text{rate per parcel}=\\$1.80", "90", ["$90", "90.00", "$90.00"]),
        financeChoice("earn-com-m5", "Commission is usually based on:", "A", ["Sales", "Tax withheld", "Net pay only", "The number of weeks in a year"], "Commission is commonly a percentage of sales."),
        moneyAnswer("earn-com-m6", "A retail worker earns 600 dollars base pay plus 5 percent of 2000 dollars sales. Find total pay.", "\\text{base pay}=\\$600,\\quad \\text{rate}=5\\%,\\quad \\text{sales}=\\$2000", "700", ["$700", "700.00", "$700.00"]),
        financeChoice("earn-com-m7", "Piecework pays according to:", "C", ["Yearly salary", "Tax rate", "Number of items completed", "Travel distance only"], "Piecework pays per item."),
        moneyAnswer("earn-com-m8", "A student earns 7 percent commission on 1000 dollars of fundraising sales. Find the commission.", "\\text{commission rate}=7\\%,\\quad \\text{sales}=\\$1000", "70", ["$70", "70.00", "$70.00"]),
        financeChoice("earn-com-m9", "Which earning structure has the most variable pay?", "D", ["Fixed salary", "Fixed allowance", "Fixed hourly shift", "Commission only"], "Commission-only pay changes with sales."),
        moneyAnswer("earn-com-m10", "A student helper packs 24 gift boxes at a piecework rate of 5 dollars each. What is the pay?", "\\text{boxes}=24,\\quad \\text{rate per box}=\\$5", "120", ["$120", "120.00", "$120.00"]),
      ],
    };
  }

  if (lesson.slug === "tax-deductions-net-pay") {
    return {
      ...base,
      description:
        "Use gross pay, tax withheld, deductions and percentage deductions to calculate net pay and interpret payslips.",
      learningIntention:
        "Calculate net pay from gross pay and deductions, and interpret simplified payslip information.",
      successCriteria: [
        "Identify deductions on a payslip.",
        "Calculate net pay using gross pay minus deductions.",
        "Calculate percentage deductions.",
        "Interpret tax withheld and other deductions in simple contexts.",
      ],
      teaching: {
        paragraphs: [
          "Gross pay is the earnings total before anything is removed. Deductions such as tax withheld or union fees are taken out after that total is known.",
          "Net pay is the money left after every listed deduction is subtracted. If deductions apply, net pay should be lower than gross pay.",
          "For a percentage deduction, convert the percentage to a decimal and multiply by gross pay. Do not treat 5 percent as the whole number 5.",
          "Read a payslip in two passes: add the earnings to understand gross pay, then subtract the deductions to find net pay.",
        ],
        latexBlocks: [
          "\\text{net pay}=\\text{gross pay}-\\text{total deductions}",
          "\\text{percentage deduction}=\\frac{p}{100}\\times\\text{gross pay}",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-tax-g1", "A payslip shows gross pay of 800 dollars and tax withheld of 150 dollars. What is the net pay?", "\\text{gross pay}=\\$800,\\quad \\text{tax withheld}=\\$150", "650", ["$650", "650.00", "$650.00"]),
        moneyAnswer("earn-tax-g2", "A payslip shows gross pay of 920 dollars, tax withheld of 165 dollars, and a uniform deduction of 25 dollars. What is the net pay?", "\\text{gross pay}=\\$920,\\quad \\text{tax}=\\$165,\\quad \\text{uniform deduction}=\\$25", "730", ["$730", "730.00", "$730.00"]),
        moneyAnswer("earn-tax-g3", "A payslip applies a 5 percent equipment deduction to 600 dollars gross pay. Find the deduction.", "\\text{gross pay}=\\$600,\\quad \\text{deduction rate}=5\\%", "30", ["$30", "30.00", "$30.00"]),
        financeChoice("earn-tax-g4", "Which payslip item is a deduction?", "C", ["Ordinary pay", "Allowance", "Tax withheld", "Gross pay"], "Tax withheld is taken out of gross pay."),
      ],
      independentPractice: [
        moneyAnswer("earn-tax-i1", "A payslip lists gross pay of 760 dollars, tax withheld of 118 dollars and a union fee of 12 dollars. What is the net pay?", "\\text{gross pay}=\\$760,\\quad \\text{tax}=\\$118,\\quad \\text{union fee}=\\$12", "630", ["$630", "630.00", "$630.00"]),
        moneyAnswer("earn-tax-i2", "A casual worker has an 8 percent tax withholding on 500 dollars gross pay. Find the tax withheld.", "\\text{gross pay}=\\$500,\\quad \\text{tax rate}=8\\%", "40", ["$40", "40.00", "$40.00"]),
        moneyAnswer("earn-tax-i3", "A weekly payslip shows gross pay of 1000 dollars and total deductions of 220 dollars. What is the net pay?", "\\text{gross pay}=\\$1000,\\quad \\text{deductions}=\\$220", "780", ["$780", "780.00", "$780.00"]),
        financeChoice("earn-tax-i4", "Net pay is best described as:", "B", ["Pay before deductions", "Pay after deductions", "Tax before gross pay", "Allowance only"], "Net pay is the amount left after deductions."),
        moneyAnswer("earn-tax-i5", "A staff discount repayment is a 3 percent deduction from 900 dollars gross pay. What is the deduction?", "\\text{gross pay}=\\$900,\\quad \\text{deduction rate}=3\\%", "27", ["$27", "27.00", "$27.00"]),
      ],
      commonMistakes: [
        { mistake: "Adding tax withheld to gross pay: 760 + 118 = 878 instead of subtracting it.", fix: "Tax withheld is a deduction. Net pay = 760 - 118 = 642." },
        { mistake: "Answering 920 dollars when asked for net pay on a payslip showing gross pay 920, tax 165, and uniform deduction 25.", fix: "Net pay subtracts every listed deduction: 920 - 165 - 25 = 730." },
        { mistake: "Calculating a 5% deduction as 5 × 600 = 3,000 instead of 0.05 × 600 = 30.", fix: "Convert 5% to 0.05 before multiplying. The deduction is 0.05 × 600 = 30." },
        { mistake: "Subtracting only the tax of 118 dollars and ignoring the 12 dollar union fee also shown on the payslip.", fix: "Subtract every deduction listed: 760 - 118 - 12 = 630." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-tax-m1", "A student worker's payslip shows gross pay of 700 dollars and tax withheld of 120 dollars. What is the net pay?", "\\text{gross pay}=\\$700,\\quad \\text{tax withheld}=\\$120", "580", ["$580", "580.00", "$580.00"]),
        moneyAnswer("earn-tax-m2", "A payslip shows gross pay of 850 dollars and total deductions of 200 dollars. What is the net pay?", "\\text{gross pay}=\\$850,\\quad \\text{deductions}=\\$200", "650", ["$650", "650.00", "$650.00"]),
        moneyAnswer("earn-tax-m3", "A payslip with gross pay 460 dollars has a 10 percent tax withholding. Find the tax withheld.", "\\text{gross pay}=\\$460,\\quad \\text{tax rate}=10\\%", "46", ["$46", "46.00", "$46.00"]),
        financeChoice("earn-tax-m4", "Tax withheld is:", "A", ["A deduction", "Gross pay", "An allowance", "A salary"], "Tax withheld is deducted."),
        moneyAnswer("earn-tax-m5", "A payslip lists gross pay of 960 dollars, tax withheld of 180 dollars and a union fee of 15 dollars. What is the net pay?", "\\text{gross pay}=\\$960,\\quad \\text{tax}=\\$180,\\quad \\text{union fee}=\\$15", "765", ["$765", "765.00", "$765.00"]),
        financeChoice("earn-tax-m6", "To find net pay, calculate:", "C", ["Gross plus deductions", "Tax times salary", "Gross minus deductions", "Allowance minus gross"], "Net pay is gross pay less deductions."),
        moneyAnswer("earn-tax-m7", "A 4 percent uniform deduction is taken from 750 dollars gross pay. Find the deduction.", "\\text{gross pay}=\\$750,\\quad \\text{deduction rate}=4\\%", "30", ["$30", "30.00", "$30.00"]),
        moneyAnswer("earn-tax-m8", "A payslip shows net pay of 540 dollars after 60 dollars of deductions. What was the gross pay?", "\\text{net pay}=\\$540,\\quad \\text{deductions}=\\$60", "600", ["$600", "600.00", "$600.00"]),
        financeChoice("earn-tax-m9", "Which item increases gross earnings rather than reducing pay?", "D", ["Tax withheld", "Union fee", "Insurance deduction", "Allowance"], "An allowance is added to earnings."),
        moneyAnswer("earn-tax-m10", "A fortnightly payslip shows gross pay of 1200 dollars and total deductions of 275 dollars. What is the net pay?", "\\text{gross pay}=\\$1200,\\quad \\text{deductions}=\\$275", "925", ["$925", "925.00", "$925.00"]),
      ],
    };
  }

  if (lesson.slug === "leave-entitlements-superannuation") {
    return {
      ...base,
      description:
        "Calculate annual leave pay, leave loading at 17.5%, and employer superannuation contributions at 11% of ordinary earnings.",
      learningIntention:
        "Calculate annual leave entitlement including leave loading, and determine employer superannuation contributions.",
      successCriteria: [
        "Calculate annual leave pay as 4 weeks at the ordinary weekly rate.",
        "Calculate leave loading at 17.5% of annual leave pay.",
        "Find total annual leave pay by adding leave pay and loading.",
        "Calculate employer superannuation contributions at 11% of ordinary earnings.",
      ],
      teaching: {
        paragraphs: [
          "Full-time employees in Australia are entitled to 4 weeks of paid annual leave per year. The leave pay is calculated at the ordinary weekly rate for each week of leave taken.",
          "Leave loading is an extra 17.5% payment added on top of the annual leave pay. It was introduced to compensate for penalty rates and overtime that employees miss out on while on leave.",
          "To calculate leave loading, multiply the annual leave pay by 0.175. The total annual leave payment is the leave pay plus the loading.",
          "Superannuation (super) is compulsory retirement savings. Employers must contribute approximately 11% of an employee's ordinary earnings into a super fund. This is paid on top of wages — the employee still receives their full pay.",
        ],
        latexBlocks: [
          "\\text{Annual leave pay} = 4 \\times \\text{weekly rate}",
          "\\text{Leave loading} = 0.175 \\times \\text{annual leave pay}",
          "\\text{Super contribution} = 0.11 \\times \\text{ordinary earnings}",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-leave-g1", "An employee earns $800 per week. Calculate their annual leave pay for 4 weeks.", "", "3200", ["$3200", "3,200", "$3,200"]),
        financeChoice(
          "earn-leave-g2",
          "Leave loading of 17.5% is calculated on:",
          "B",
          ["Annual salary", "Annual leave pay", "Net pay", "Tax withheld"],
          "Leave loading is 17.5% of the annual leave pay, not the full annual salary.",
        ),
        moneyAnswer("earn-leave-g3", "Calculate leave loading of 17.5% on annual leave pay of $3200.", "", "560", ["$560", "560.00", "$560.00"]),
        moneyAnswer("earn-leave-g4", "Find total annual leave pay including 17.5% loading: leave pay $3200 plus loading $560.", "", "3760", ["$3760", "3,760", "$3,760"]),
      ],
      independentPractice: [
        moneyAnswer("earn-leave-i1", "An employee earns $1200 per week. Calculate their annual leave pay for 4 weeks.", "", "4800", ["$4800", "4,800", "$4,800"]),
        moneyAnswer("earn-leave-i2", "Calculate leave loading of 17.5% on annual leave pay of $4800.", "", "840", ["$840", "840.00", "$840.00"]),
        moneyAnswer("earn-leave-i3", "Find total annual leave pay including 17.5% loading for an employee earning $1200 per week (4 weeks leave).", "", "5640", ["$5640", "5,640", "$5,640"]),
        moneyAnswer("earn-leave-i4", "An employee's annual salary is $52,000. Calculate the employer's superannuation contribution at 11%.", "", "5720", ["$5720", "5,720", "$5,720"]),
        financeChoice(
          "earn-leave-i5",
          "Superannuation is paid by:",
          "C",
          ["The employee only from their wages", "The government tax office", "The employer on top of the employee's wages", "The bank"],
          "Super is an employer obligation paid on top of wages, not deducted from the employee's pay.",
        ),
      ],
      commonMistakes: [
        { mistake: "Calculating leave loading on the annual salary instead of the annual leave pay.", fix: "Leave loading is 17.5% of the leave pay only (4 weeks of pay), not the full year's salary." },
        { mistake: "Treating superannuation as a deduction from the employee's pay.", fix: "Super is an employer contribution paid on top of wages. The employee's net pay is not reduced by super." },
        { mistake: "Multiplying 17.5 by the leave pay instead of 0.175.", fix: "Convert 17.5% to a decimal first: 17.5% = 0.175. Then multiply by leave pay." },
        { mistake: "Calculating annual super on weekly pay without first finding the annual earnings.", fix: "Multiply annual earnings by 0.11. If only weekly pay is given, multiply weekly pay × 52 first, then apply 11%." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-leave-m1", "An employee earns $950 per week. Calculate their annual leave pay for 4 weeks.", "", "3800", ["$3800", "3,800", "$3,800"]),
        moneyAnswer("earn-leave-m2", "Calculate leave loading of 17.5% on annual leave pay of $3800.", "", "665", ["$665", "665.00", "$665.00"]),
        moneyAnswer("earn-leave-m3", "Find total annual leave pay including loading: leave pay $3800 plus loading $665.", "", "4465", ["$4465", "4,465", "$4,465"]),
        financeChoice(
          "earn-leave-m4",
          "The superannuation guarantee rate is approximately:",
          "C",
          ["5%", "17.5%", "11%", "25%"],
          "The super guarantee rate is approximately 11% of ordinary earnings.",
        ),
        moneyAnswer("earn-leave-m5", "An employee earns $640 per week. Calculate the weekly employer super contribution at 11%.", "", "70.4", ["$70.40", "70.40", "$70.4"]),
        financeChoice(
          "earn-leave-m6",
          "Leave loading of 17.5% exists because:",
          "B",
          ["It is optional for employees", "It compensates for overtime and penalty rates not earned during leave", "It reduces the employee's tax bill", "It is the same as superannuation"],
          "Leave loading compensates workers for missing out on overtime and penalty rates while on annual leave.",
        ),
        moneyAnswer("earn-leave-m7", "An employee's gross annual income is $65,000. Calculate the annual super contribution at 11%.", "", "7150", ["$7150", "7,150", "$7,150"]),
        moneyAnswer("earn-leave-m8", "An employee earns $750 per week. What is their annual leave pay for 4 weeks?", "", "3000", ["$3000", "3,000", "$3,000"]),
        moneyAnswer("earn-leave-m9", "Calculate leave loading of 17.5% on annual leave pay of $3000.", "", "525", ["$525", "525.00", "$525.00"]),
        moneyAnswer("earn-leave-m10", "Find total annual leave pay including 17.5% loading: leave pay $3000 plus loading $525.", "", "3525", ["$3525", "3,525", "$3,525"]),
      ],
    };
  }

  if (lesson.slug === "government-benefits-allowances") {
    return {
      ...base,
      description:
        "Identify Youth Allowance, Family Tax Benefit and Centrelink payments, calculate benefit amounts, and apply income-free area means testing.",
      learningIntention:
        "Interpret government benefit structures and calculate Youth Allowance payments using income-free area means testing.",
      successCriteria: [
        "Identify the purpose of Youth Allowance, Family Tax Benefit and Centrelink payments.",
        "Determine whether earned income is above or below the income-free area.",
        "Calculate the payment reduction when income exceeds the income-free area.",
        "Calculate the reduced Youth Allowance and total fortnightly income.",
      ],
      teaching: {
        paragraphs: [
          "The Australian government provides financial support to people who need it. Youth Allowance helps young people aged 16–24 who are studying, training or looking for work. Family Tax Benefit supports families with dependent children. These payments are managed through Centrelink.",
          "Government payments often use means testing — the amount paid depends on the recipient's income and sometimes their assets. A higher income may mean a lower payment.",
          "Youth Allowance has an income-free area: a fortnightly amount the recipient can earn without any reduction to their payment. Once income exceeds this threshold, the payment is reduced by 50 cents for every dollar above the threshold.",
          "To find the reduced payment: calculate how much income exceeds the income-free area, multiply that excess by 0.50 to find the reduction, then subtract the reduction from the base rate. Add the reduced payment to earned income for total fortnightly income.",
        ],
        latexBlocks: [
          "\\text{Excess income} = \\text{earned income} - \\text{income-free area}",
          "\\text{Payment reduction} = 0.50 \\times \\text{excess income}",
          "\\text{Reduced payment} = \\text{base rate} - \\text{payment reduction}",
        ],
      },
      guidedPractice: [
        financeChoice(
          "earn-govt-g1",
          "Youth Allowance is a payment designed for:",
          "B",
          ["Retirees aged over 65", "Young people who are studying or job-seeking", "Employers paying wages", "Those earning over $100,000"],
          "Youth Allowance supports eligible young people aged 16–24 who are studying, training or looking for work.",
        ),
        financeChoice(
          "earn-govt-g2",
          "A student earns $400 per fortnight. The income-free area is $620. Does the full Youth Allowance apply?",
          "A",
          ["Yes — income is below the threshold so no reduction applies", "No — income is above the threshold", "Only half the payment applies", "Cannot be determined without the base rate"],
          "$400 < $620, so all income is within the income-free area and the full base rate is paid.",
        ),
        moneyAnswer("earn-govt-g3", "A student receives Youth Allowance of $630 per fortnight and earns $400 per fortnight from part-time work. Find their total fortnightly income.", "", "1030", ["$1030", "1,030", "$1,030"]),
        financeChoice(
          "earn-govt-g4",
          "Means testing means:",
          "B",
          ["Payments increase as income rises", "Payments may reduce as income or assets increase", "Only assets are considered, not income", "Payments never change regardless of earnings"],
          "Means testing targets payments at those with lower incomes — as income rises beyond a threshold, the payment is progressively reduced.",
        ),
      ],
      independentPractice: [
        moneyAnswer("earn-govt-i1", "Youth Allowance base rate is $630 per fortnight. Income-free area is $620. A student earns $800 per fortnight. Find the amount of income above the threshold.", "", "180", ["$180", "180"]),
        moneyAnswer("earn-govt-i2", "Using the income $180 above threshold, calculate the payment reduction at 50 cents per dollar.", "", "90", ["$90", "90.00"]),
        moneyAnswer("earn-govt-i3", "Calculate the reduced Youth Allowance: base rate $630 minus reduction $90.", "", "540", ["$540", "540.00", "$540.00"]),
        moneyAnswer("earn-govt-i4", "Find total fortnightly income: earned income $800 plus reduced Youth Allowance $540.", "", "1340", ["$1340", "1,340", "$1,340"]),
        financeChoice(
          "earn-govt-i5",
          "Family Tax Benefit is designed to help:",
          "C",
          ["Employers pay wages", "Young people with study costs only", "Families with dependent children", "Businesses with their tax obligations"],
          "Family Tax Benefit is a government payment supporting families with the costs of raising children.",
        ),
      ],
      commonMistakes: [
        { mistake: "Subtracting the income-free area from the base rate instead of from the earned income.", fix: "The income-free area is compared to earned income, not to the benefit rate. Excess income = earned income − income-free area." },
        { mistake: "Applying the 50 cent reduction to all earned income, not just the amount above the threshold.", fix: "Only income above the income-free area causes a reduction: reduction = 0.50 × (earned income − income-free area)." },
        { mistake: "Adding the reduction to the base rate instead of subtracting it.", fix: "The reduction lowers the payment: reduced payment = base rate − reduction. A higher income means a lower payment." },
        { mistake: "Forgetting to add the earned income when finding total fortnightly income.", fix: "Total income = Youth Allowance (reduced) + earned income from work. Both sources count." },
      ],
      masteryQuiz: [
        financeChoice(
          "earn-govt-m1",
          "Which payment helps young people who are studying or looking for work?",
          "B",
          ["Family Tax Benefit", "Youth Allowance", "Age Pension", "Employer superannuation"],
          "Youth Allowance supports eligible young people aged 16–24 in education, training or job seeking.",
        ),
        moneyAnswer("earn-govt-m2", "Youth Allowance base rate is $648 per fortnight. Income-free area is $620. A student earns $900 per fortnight. Find the income above the threshold.", "", "280", ["$280", "280"]),
        moneyAnswer("earn-govt-m3", "Calculate the payment reduction: $280 above threshold at 50 cents per dollar.", "", "140", ["$140", "140.00", "$140.00"]),
        moneyAnswer("earn-govt-m4", "Calculate the reduced Youth Allowance: base rate $648 minus reduction $140.", "", "508", ["$508", "508.00", "$508.00"]),
        moneyAnswer("earn-govt-m5", "Find total fortnightly income: earned income $900 plus reduced Youth Allowance $508.", "", "1408", ["$1408", "1,408", "$1,408"]),
        financeChoice(
          "earn-govt-m6",
          "An income-free area means:",
          "C",
          ["All income in Australia is tax-free up to this amount", "The payment stops completely at this income level", "The payment is not reduced until earned income exceeds this amount", "No government payments are available if income is below this level"],
          "The income-free area is the threshold below which earned income does not reduce the payment.",
        ),
        moneyAnswer("earn-govt-m7", "A family receives $150 per fortnight in Family Tax Benefit. How much is this per year (26 fortnights)?", "", "3900", ["$3900", "3,900", "$3,900"]),
        financeChoice(
          "earn-govt-m8",
          "Which person is most likely eligible for Youth Allowance?",
          "B",
          ["A 45-year-old full-time executive", "A 19-year-old studying full-time at TAFE", "A business owner earning $200,000 per year", "A 65-year-old retiree"],
          "Youth Allowance targets eligible young people aged 16–24 in study, training or job seeking.",
        ),
        moneyAnswer("earn-govt-m9", "A student receives $600 per fortnight in benefits and earns $380 from part-time work. What is their total fortnightly income?", "", "980", ["$980", "980.00", "$980.00"]),
        financeChoice(
          "earn-govt-m10",
          "Means testing ensures government payments are targeted at:",
          "B",
          ["All Australians equally regardless of income", "Those who have greater financial need", "Only employers and businesses", "Only people with zero income"],
          "Means testing directs support to those most in need by reducing payments as income rises.",
        ),
      ],
    };
  }

  if (lesson.slug === "earning-money-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed earning-money questions involving payslips, overtime, commission, allowances, gross pay, and net pay.",
    learningIntention:
      "Apply earning-money skills to mixed practical exam-style questions.",
    successCriteria: [
      "Choose the correct method for wages, salary, overtime, commission, or net pay.",
      "Calculate gross pay and net pay in short practical contexts.",
      "Interpret payslip information accurately.",
      "Check whether an earning calculation is reasonable.",
    ],
    teaching: {
      paragraphs: [
        "Mixed earning-money questions become manageable when you sort the amounts before calculating. Label each amount as an earning, a deduction, a rate, or a number of hours or items.",
        "Work out each earning component separately: ordinary pay, higher-rate pay, allowances, commission, or piecework. Then add the earnings to get gross pay.",
        "Subtract deductions only after gross pay is known and only when the question asks for net pay. Keep weekly, fortnightly, hourly, and annual amounts in matching units.",
        "Use a quick reasonableness check: double time must exceed the ordinary rate, a percentage such as 5 percent should become 0.05, and net pay should fall below gross pay when deductions apply.",
      ],
      latexBlocks: [
        "\\text{gross pay}=\\text{all earnings before deductions}",
        "\\text{net pay}=\\text{gross pay}-\\text{deductions}",
      ],
    },
    guidedPractice: [
      financeChoice("earn-exam-g1", "A question asks for pay before tax. Which value is needed?", "A", ["Gross pay", "Net pay", "Tax withheld", "Total deductions only"], "Pay before tax is gross pay."),
      moneyAnswer("earn-exam-g2", "A payslip table lists ordinary pay 500 dollars, overtime pay 120 dollars, and a meal allowance 30 dollars. What is the gross pay?", "\\text{ordinary pay}=\\$500,\\quad \\text{overtime}=\\$120,\\quad \\text{allowance}=\\$30", "650", ["$650", "650.00", "$650.00"]),
        moneyAnswer("earn-exam-g3", "A salesperson earns 6 percent commission on 2500 dollars sales. Find the commission.", "\\text{sales}=\\$2500,\\quad \\text{commission rate}=6\\%", "150", ["$150", "150.00", "$150.00"]),
      moneyAnswer("earn-exam-g4", "A payslip shows gross pay of 650 dollars and total deductions of 140 dollars. What is the net pay?", "\\text{gross pay}=\\$650,\\quad \\text{deductions}=\\$140", "510", ["$510", "510.00", "$510.00"]),
    ],
    independentPractice: [
      moneyAnswer("earn-exam-i1", "A roster shows a library assistant worked 16 ordinary hours at 24 dollars per hour. What is the ordinary pay?", "\\text{hours}=16,\\quad \\text{rate}=\\$24/\\text{h}", "384", ["$384", "384.00", "$384.00"]),
      moneyAnswer("earn-exam-i2", "A public-holiday shift pays 3 double-time hours. The ordinary rate is 30 dollars per hour. What is the overtime pay?", "\\text{hours}=3,\\quad \\text{ordinary rate}=\\$30/\\text{h},\\quad \\text{double time}", "180", ["$180", "180.00", "$180.00"]),
      moneyAnswer("earn-exam-i3", "A sales assistant earns 420 dollars base pay plus 5 percent commission on 1600 dollars of sales. What are the total earnings?", "\\text{base pay}=\\$420,\\quad \\text{sales}=\\$1600,\\quad \\text{commission rate}=5\\%", "500", ["$500", "500.00", "$500.00"]),
      financeChoice("earn-exam-i4", "Which conclusion is reasonable?", "B", ["Net pay is always higher than gross pay", "Net pay is lower than gross pay when deductions apply", "Tax withheld is added to net pay", "Allowances are always deductions"], "Deductions reduce gross pay to net pay."),
      moneyAnswer("earn-exam-i5", "A payslip lists gross pay of 880 dollars, tax withheld of 150 dollars, and other deductions of 20 dollars. What is the net pay?", "\\text{gross pay}=\\$880,\\quad \\text{tax}=\\$150,\\quad \\text{other deductions}=\\$20", "710", ["$710", "710.00", "$710.00"]),
    ],
    commonMistakes: [
      { mistake: "Subtracting tax withheld from the total when the question asks for gross pay.", fix: "Gross pay is the total before deductions: add ordinary pay, overtime, and allowances only." },
      { mistake: "Giving 650 as net pay when gross is 500 + 120 + 30 = 650 and there are 140 dollars in deductions.", fix: "Net pay = gross minus deductions: 650 - 140 = 510." },
      { mistake: "Reporting only the commission amount and forgetting to add the 420 dollar base pay.", fix: "Base plus commission: total = base pay + commission. Add both before writing the answer." },
      { mistake: "Getting a net pay of 760 dollars when gross pay is only 600 dollars.", fix: "Net pay must be less than gross pay when deductions apply. A net pay higher than gross is a sign that deductions were added instead of subtracted." },
    ],
    masteryQuiz: [
      financeChoice("earn-exam-m1", "Which method finds ordinary hourly pay?", "A", ["Hours times hourly rate", "Gross minus tax", "Sales times tax", "Salary divided by 12 always"], "Hourly pay uses hours times rate."),
        moneyAnswer("earn-exam-m2", "A cafe roster shows 14 ordinary hours at 26 dollars per hour. Find ordinary pay.", "\\text{hours}=14,\\quad \\text{rate}=\\$26/\\text{h}", "364", ["$364", "364.00", "$364.00"]),
        moneyAnswer("earn-exam-m3", "A Saturday shift is paid at time-and-a-half. If the ordinary rate is 34 dollars per hour, find the Saturday hourly rate.", "\\text{ordinary rate}=\\$34/\\text{h},\\quad \\text{rate}=\\text{time-and-a-half}", "51", ["$51", "51.00", "$51.00"]),
        moneyAnswer("earn-exam-m4", "A sales assistant earns 4 percent commission on 5000 dollars sales. Find the commission.", "\\text{commission rate}=4\\%,\\quad \\text{sales}=\\$5000", "200", ["$200", "200.00", "$200.00"]),
      financeChoice("earn-exam-m5", "A payslip asks for pay after deductions. Find:", "B", ["Gross pay", "Net pay", "Allowance only", "Hourly rate"], "Pay after deductions is net pay."),
      moneyAnswer("earn-exam-m6", "A payslip shows gross pay of 720 dollars and deductions of 155 dollars. What is the net pay?", "\\text{gross pay}=\\$720,\\quad \\text{deductions}=\\$155", "565", ["$565", "565.00", "$565.00"]),
      moneyAnswer("earn-exam-m7", "A warehouse worker is paid 3 dollars per parcel and packs 75 parcels. What is the piecework pay?", "\\text{rate per parcel}=\\$3,\\quad \\text{parcels}=75", "225", ["$225", "225.00", "$225.00"]),
      financeChoice("earn-exam-m8", "Which item is added to earnings?", "C", ["Tax withheld", "Union fee", "Meal allowance", "Insurance deduction"], "A meal allowance is added."),
      moneyAnswer("earn-exam-m9", "A payslip has ordinary pay of 400 dollars, overtime pay of 90 dollars, and tax withheld of 80 dollars. What is the net pay?", "\\text{ordinary}=\\$400,\\quad \\text{overtime}=\\$90,\\quad \\text{tax}=\\$80", "410", ["$410", "410.00", "$410.00"]),
      financeChoice("earn-exam-m10", "Which answer is most reasonable if gross pay is 600 dollars and deductions apply?", "D", ["700 dollars net pay", "6000 dollars net pay", "No net pay can exist", "520 dollars net pay"], "Net pay should be less than gross pay when deductions apply."),
    ],
    };
  }

  if (lesson.slug === "medicare-levy-tax-tables") {
    return {
      ...base,
      description:
        "Calculate the Medicare levy as a percentage of taxable income, read PAYG tax withholding tables to find tax deducted from regular pay, and determine whether a tax return results in a refund or a further payment.",
      learningIntention:
        "Apply the Medicare levy rate and PAYG tax tables to determine tax obligations, and calculate tax refunds or payments due after lodging a tax return.",
      successCriteria: [
        "Calculate the Medicare levy at 2% of taxable income.",
        "Read a simplified PAYG tax withholding table to find the tax to deduct from weekly or fortnightly pay.",
        "Calculate total tax withheld across a year from regular pay periods.",
        "Determine whether a tax return results in a refund or a further payment by comparing tax withheld with tax payable.",
      ],
      teaching: {
        paragraphs: [
          "The Medicare levy is an additional charge on most Australian taxpayers, funding the public health system. The standard rate is 2% of taxable income. For example, a taxable income of $52,000 attracts a Medicare levy of $52,000 × 0.02 = $1,040. Low-income earners may qualify for a reduction or exemption.",
          "Pay-As-You-Go (PAYG) withholding is the system by which employers deduct tax from employees' wages throughout the year. The amount withheld each pay period is determined by looking up the gross pay in a PAYG withholding tax table. These tables are published by the Australian Taxation Office (ATO) and account for the employee's pay frequency (weekly, fortnightly, monthly) and tax-free threshold claim.",
          "At the end of the financial year (30 June), a worker lodges a tax return. The ATO calculates the total tax payable on the full year's taxable income. This is then compared with the total amount already withheld by the employer. If more was withheld than owed, the worker receives a refund. If less was withheld, the worker must pay the difference.",
          "Key formula: Tax payable = income tax (from tax brackets) + Medicare levy. If total tax withheld > tax payable → refund (excess returned to worker). If total tax withheld < tax payable → shortfall (worker pays the difference). The net tax calculation is: net = tax payable − tax withheld (negative means refund, positive means payment owing).",
        ],
        latexBlocks: [
          "\\text{Medicare levy} = 2\\% \\times \\text{taxable income}",
          "\\text{Total tax payable} = \\text{income tax} + \\text{Medicare levy}",
          "\\text{Refund} = \\text{tax withheld} - \\text{tax payable}\\quad (\\text{if withheld} > \\text{payable})",
          "\\text{Payment owing} = \\text{tax payable} - \\text{tax withheld}\\quad (\\text{if payable} > \\text{withheld})",
        ],
      },
      workedExamples: [
        {
          title: "Calculating the Medicare levy",
          questionLatex:
            "\\text{Priya has a taxable income of }\\$68\\,000.\\text{ Calculate her Medicare levy at 2\\%.}",
          steps: [
            {
              explanation: "Convert 2% to a decimal: 2% = 0.02.",
              latex: "\\text{Medicare levy} = 2\\% \\times \\$68\\,000",
            },
            {
              explanation: "Multiply taxable income by 0.02.",
              latex: "= 0.02 \\times 68\\,000 = \\$1\\,360",
            },
          ],
          finalAnswerLatex: "\\$1\\,360",
        },
        {
          title: "Reading a PAYG tax table and calculating annual tax withheld",
          questionLatex:
            "\\text{Sam earns }\\$1\\,200\\text{ gross per week. The PAYG weekly tax table shows }\\$214\\text{ to withhold at this income. How much tax is withheld over 52 weeks?}",
          steps: [
            {
              explanation: "The PAYG table gives the weekly withholding amount: $214 per week.",
              latex: "\\text{Weekly withholding} = \\$214",
            },
            {
              explanation: "Multiply by 52 weeks to find annual tax withheld.",
              latex: "\\text{Annual tax withheld} = 214 \\times 52 = \\$11\\,128",
            },
          ],
          finalAnswerLatex: "\\$11\\,128",
        },
        {
          title: "Tax return: refund or payment owing",
          questionLatex:
            "\\text{Jordan's total tax payable (income tax + Medicare levy) is }\\$9\\,850.\\text{ During the year, }\\$10\\,400\\text{ was withheld. Find the refund or payment owing.}",
          steps: [
            {
              explanation: "Compare tax withheld with tax payable.",
              latex: "\\text{Tax withheld} = \\$10\\,400,\\quad \\text{Tax payable} = \\$9\\,850",
            },
            {
              explanation: "Tax withheld exceeds tax payable, so Jordan gets a refund.",
              latex: "\\text{Refund} = 10\\,400 - 9\\,850 = \\$550",
            },
          ],
          finalAnswerLatex: "\\$550 \\text{ refund}",
        },
      ],
      guidedPractice: [
        moneyAnswer(
          "y11s-mel-g1",
          "Calculate the Medicare levy on a taxable income of $45,000. Use rate = 2%.",
          "",
          "900",
          ["$900", "900.00", "$900.00"]
        ),
        moneyAnswer(
          "y11s-mel-g2",
          "A PAYG table shows $178 is withheld weekly. What is the total annual tax withheld over 52 weeks?",
          "",
          "9256",
          ["$9256", "9256.00", "$9,256"]
        ),
        financeChoice(
          "y11s-mel-g3",
          "A worker's tax payable is $8,200 and tax withheld was $7,800. The outcome of the tax return is:",
          "B",
          ["A refund of $400", "A payment of $400 owing", "A refund of $8,200", "No change"],
          "Tax payable > tax withheld → payment of $8,200 − $7,800 = $400 is owed."
        ),
        moneyAnswer(
          "y11s-mel-g4",
          "A worker's tax payable is $11,500 and tax withheld was $12,100. Find the tax refund.",
          "",
          "600",
          ["$600", "600.00", "$600.00"]
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y11s-mel-i1",
          "Calculate the Medicare levy on a taxable income of $72,000.",
          "",
          "1440",
          ["$1440", "1440.00", "$1,440", "$1440.00"]
        ),
        moneyAnswer(
          "y11s-mel-i2",
          "A fortnightly PAYG table shows $395 withheld. How much is withheld over 26 fortnights?",
          "",
          "10270",
          ["$10270", "10270.00", "$10,270"]
        ),
        moneyAnswer(
          "y11s-mel-i3",
          "Total tax payable is $14,200 (income tax $12,760 + Medicare levy $1,440). Tax withheld was $13,500. Find the payment owing.",
          "",
          "700",
          ["$700", "700.00", "$700.00"]
        ),
        financeChoice(
          "y11s-mel-i4",
          "The Medicare levy is charged at:",
          "B",
          ["1% of taxable income", "2% of taxable income", "10% of taxable income", "$100 flat fee"],
          "The standard Medicare levy rate is 2% of taxable income."
        ),
        moneyAnswer(
          "y11s-mel-i5",
          "Alex earns $850 per week gross. The PAYG table shows $132 to withhold. Calculate total tax withheld over the full year (52 weeks).",
          "",
          "6864",
          ["$6864", "6864.00", "$6,864"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Calculating the Medicare levy as 2% of gross income instead of taxable income.",
          fix: "The Medicare levy is based on taxable income, which is gross income minus allowable deductions. Always check whether the question gives taxable income or gross income.",
        },
        {
          mistake: "Concluding a refund when tax payable exceeds tax withheld.",
          fix: "A refund occurs when tax withheld is greater than tax payable. If tax payable is larger, the worker owes the difference. Check which amount is higher before deciding.",
        },
        {
          mistake: "Using 52 fortnights instead of 26 fortnights per year.",
          fix: "There are 52 weeks per year, so there are 26 fortnights (52 ÷ 2 = 26). Multiply fortnightly withholding by 26, not 52.",
        },
        {
          mistake: "Forgetting to include the Medicare levy when calculating total tax payable.",
          fix: "Total tax payable = income tax + Medicare levy. Both amounts must be included before comparing with total tax withheld.",
        },
      ],
      masteryQuiz: [
        moneyAnswer("y11s-mel-m1", "Calculate the Medicare levy on a taxable income of $55,000.", "", "1100", ["$1100", "1100.00", "$1,100"]),
        moneyAnswer("y11s-mel-m2", "Calculate the Medicare levy on a taxable income of $82,000.", "", "1640", ["$1640", "1640.00", "$1,640"]),
        moneyAnswer("y11s-mel-m3", "A PAYG table shows $262 withheld weekly. Calculate total tax withheld over 52 weeks.", "", "13624", ["$13624", "$13,624"]),
        financeChoice(
          "y11s-mel-m4",
          "A worker had $9,800 withheld and their total tax payable is $9,200. The tax return outcome is:",
          "A",
          ["Refund of $600", "Payment of $600 owing", "Refund of $9,200", "No change needed"],
          "Tax withheld ($9,800) > tax payable ($9,200) → refund of $600."
        ),
        moneyAnswer("y11s-mel-m5", "Tax payable is $12,600 and tax withheld was $11,950. Find the payment owing.", "", "650", ["$650", "650.00", "$650.00"]),
        financeChoice(
          "y11s-mel-m6",
          "PAYG withholding tables are used to find:",
          "C",
          ["Superannuation contributions", "Annual leave pay", "Tax deducted from each pay period", "Commission rates"],
          "PAYG tables show how much tax an employer should deduct from each regular pay."
        ),
        moneyAnswer("y11s-mel-m7", "A fortnightly PAYG table shows $480 withheld. Calculate total annual tax withheld.", "", "12480", ["$12480", "$12,480"]),
        moneyAnswer(
          "y11s-mel-m8",
          "Income tax on $58,000 is $10,342. Medicare levy is 2%. Find total tax payable.",
          "",
          "11502",
          ["$11502", "$11,502", "11502.00"]
        ),
        financeChoice(
          "y11s-mel-m9",
          "The Medicare levy funds:",
          "A",
          ["Australia's public health system", "Superannuation accounts", "Centrelink payments", "Private health insurance"],
          "The Medicare levy specifically funds Australia's public Medicare healthcare system."
        ),
        moneyAnswer(
          "y11s-mel-m10",
          "Tax withheld is $8,750 and tax payable is $9,380. Find the payment owing.",
          "",
          "630",
          ["$630", "630.00", "$630.00"]
        ),
      ],
    };
  }

  if (lesson.slug === "earning-money-revision") {
    return {
      ...base,
      description:
        "Activate Year 10 skills in percentages, fractions and decimals that underpin all Year 11 earning money calculations: converting between formats, finding percentages of quantities, calculating percentage increases, and converting between time periods.",
      learningIntention:
        "Recall and apply Year 10 percentage and money skills so that Year 11 earning money work builds on secure number foundations.",
      successCriteria: [
        "Convert between percentages, fractions and decimals in both directions.",
        "Calculate a percentage of a quantity (including money amounts).",
        "Apply percentage increase and decrease to a base amount.",
        "Convert between weeks, fortnights, months and years for earnings calculations.",
      ],
      teaching: {
        paragraphs: [
          "A percentage is a fraction out of 100. To convert a percentage to a decimal, divide by 100 (move the decimal point two places left): 6% = 0.06. To convert a decimal to a percentage, multiply by 100: 0.175 = 17.5%. To convert a fraction to a percentage, divide the numerator by the denominator and multiply by 100.",
          "To find a percentage of a quantity, convert the percentage to a decimal first, then multiply. For example, 5% of $3,200 = 0.05 × $3,200 = $160. This is used constantly in earnings contexts: commission at 5%, leave loading at 17.5%, super at 11%.",
          "Percentage increase: new amount = original × (1 + rate). For example, a 10% increase on $500: $500 × 1.10 = $550. Percentage decrease: new amount = original × (1 − rate). For example, a 15% discount on $80: $80 × 0.85 = $68. Alternatively, find the % amount and add or subtract.",
          "Earning amounts are often stated per week (×52 per year), per fortnight (×26 per year), or per month (×12 per year). To convert, multiply or divide by the appropriate factor. There are 52 weeks, 26 fortnights, and 12 months in one year.",
        ],
        latexBlocks: [
          "\\%\\to\\text{decimal: divide by }100.\\quad 6\\%=0.06",
          "\\%\\text{ of quantity: convert then multiply}\\quad 5\\%\\times\\$3200=0.05\\times3200=\\$160",
          "\\text{Increase: }\\times(1+r)\\quad\\text{Decrease: }\\times(1-r)",
          "\\text{52 weeks = 26 fortnights = 12 months = 1 year}",
        ],
      },
      workedExamples: [
        {
          title: "Converting 17.5% to a decimal and finding a percentage",
          questionLatex:
            "\\text{An employee is entitled to leave loading of 17.5\\% on 4 weeks' normal pay. Normal weekly pay is }\\$840.\\text{ Find the leave loading amount.}",
          steps: [
            {
              explanation: "Find 4 weeks' normal pay.",
              latex: "4 \\times 840 = \\$3\\,360",
            },
            {
              explanation: "Convert 17.5% to a decimal: 17.5 ÷ 100 = 0.175.",
              latex: "\\text{Leave loading} = 0.175 \\times 3\\,360 = \\$588",
            },
          ],
          finalAnswerLatex: "\\$588",
        },
        {
          title: "Percentage of a salary for superannuation",
          questionLatex:
            "\\text{An employer contributes 11\\% superannuation on ordinary earnings of }\\$1\\,200\\text{ per week. Find the weekly super contribution.}",
          steps: [
            {
              explanation: "Convert 11% to a decimal: 0.11.",
              latex: "\\text{Super} = 0.11 \\times 1\\,200",
            },
            {
              explanation: "Multiply.",
              latex: "= \\$132",
            },
          ],
          finalAnswerLatex: "\\$132 \\text{ per week}",
        },
        {
          title: "Converting between pay periods",
          questionLatex:
            "\\text{A fortnightly salary is }\\$3\\,400.\\text{ Find the annual salary.}",
          steps: [
            {
              explanation: "There are 26 fortnights in a year.",
              latex: "\\text{Annual} = 3\\,400 \\times 26",
            },
            {
              explanation: "Multiply.",
              latex: "= \\$88\\,400",
            },
          ],
          finalAnswerLatex: "\\$88\\,400",
        },
      ],
      guidedPractice: [
        moneyAnswer(
          "y11s-emr-g1",
          "Find 5% of $2,800 (commission on sales).",
          "",
          "140",
          ["$140", "140.00", "$140.00"]
        ),
        moneyAnswer(
          "y11s-emr-g2",
          "A weekly wage is $950. Find the annual wage (52 weeks).",
          "",
          "49400",
          ["$49400", "$49,400", "49400.00"]
        ),
        financeChoice(
          "y11s-emr-g3",
          "17.5% as a decimal is:",
          "C",
          ["17.5", "1.75", "0.175", "0.0175"],
          "Divide by 100: 17.5 ÷ 100 = 0.175."
        ),
        moneyAnswer(
          "y11s-emr-g4",
          "A fortnightly salary is $2,200. Find the annual salary (26 fortnights).",
          "",
          "57200",
          ["$57200", "$57,200"]
        ),
      ],
      independentPractice: [
        moneyAnswer(
          "y11s-emr-i1",
          "Find 11% of $1,400 (superannuation contribution).",
          "",
          "154",
          ["$154", "154.00", "$154.00"]
        ),
        moneyAnswer(
          "y11s-emr-i2",
          "A monthly salary is $5,500. Find the annual salary (12 months).",
          "",
          "66000",
          ["$66000", "$66,000"]
        ),
        moneyAnswer(
          "y11s-emr-i3",
          "Find 17.5% of $2,400 (leave loading on 3 weeks' pay at $800 per week).",
          "",
          "420",
          ["$420", "420.00", "$420.00"]
        ),
        financeChoice(
          "y11s-emr-i4",
          "An annual salary is $78,000. The monthly salary (÷12) is:",
          "B",
          ["$1,500", "$6,500", "$3,000", "$7,800"],
          "78,000 ÷ 12 = $6,500 per month."
        ),
        moneyAnswer(
          "y11s-emr-i5",
          "Find 6.5% of $4,500 (commission on sales).",
          "",
          "292.50",
          ["$292.50", "292.5", "$292.5"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using 17.5% as 17.5 in multiplication instead of converting to 0.175.",
          fix: "Always divide a percentage by 100 before multiplying. 17.5% of $3,360 = 0.175 × $3,360, NOT 17.5 × $3,360.",
        },
        {
          mistake: "Multiplying a fortnightly wage by 52 to find the annual amount.",
          fix: "There are 26 fortnights in a year (52 ÷ 2 = 26). Multiply the fortnightly amount by 26, not 52.",
        },
        {
          mistake: "Confusing 'percentage of a quantity' with 'percentage more than a quantity'.",
          fix: "5% of $2,000 = $100 (the increase amount only). But a 5% increase on $2,000 = $2,000 × 1.05 = $2,100 (the new total). Check whether the question asks for the percentage amount or the final value.",
        },
        {
          mistake: "Dividing annual salary by 26 to get a weekly salary.",
          fix: "Divide by 52 for a weekly salary. Divide by 26 for a fortnightly salary. These are different pay periods.",
        },
      ],
      masteryQuiz: [
        moneyAnswer("y11s-emr-m1", "Find 6% of $3,500 (commission).", "", "210", ["$210", "210.00"]),
        moneyAnswer("y11s-emr-m2", "A weekly wage is $1,150. Find the annual wage.", "", "59800", ["$59800", "$59,800"]),
        moneyAnswer("y11s-emr-m3", "Find 11% of $2,000 (weekly superannuation on $2,000 earnings).", "", "220", ["$220", "220.00"]),
        financeChoice("y11s-emr-m4", "11% as a decimal is:", "C", ["11.0", "1.1", "0.11", "0.011"], "Divide by 100: 11 ÷ 100 = 0.11."),
        moneyAnswer("y11s-emr-m5", "A fortnightly wage is $1,900. Find the annual wage.", "", "49400", ["$49400", "$49,400"]),
        moneyAnswer("y11s-emr-m6", "Find 17.5% of $1,680 (leave loading).", "", "294", ["$294", "294.00"]),
        financeChoice(
          "y11s-emr-m7",
          "How many months are in one year?",
          "B",
          ["10", "12", "26", "52"],
          "There are 12 months in one year."
        ),
        moneyAnswer("y11s-emr-m8", "An annual salary is $96,000. Find the monthly salary.", "", "8000", ["$8000", "$8,000"]),
        moneyAnswer("y11s-emr-m9", "Find 4.5% of $6,000 (commission rate).", "", "270", ["$270", "270.00"]),
        financeChoice(
          "y11s-emr-m10",
          "To convert a percentage to a decimal, you should:",
          "A",
          ["Divide by 100", "Multiply by 100", "Divide by 10", "Add a decimal point after the digits"],
          "Divide by 100: 6% ÷ 100 = 0.06."
        ),
      ],
    };
  }

  return null;
}

