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
  if (course.slug !== "year-11-standard" || unit.slug !== "earning-money") {
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

