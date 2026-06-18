import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const growthFactorsCompoundInterestDepreciationLesson: ExplicitLesson = {
  id: "growth-factors-compound-interest-depreciation",
  slug: "growth-factors-compound-interest-depreciation",
  moduleSlug: "ma-m1-modelling-financial-situations",
  moduleTitle: "Modelling Financial Situations",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Growth Factors, Compound Interest, and Depreciation",
  description:
    "Use growth and decay factors to model compound interest and depreciation over repeated time periods.",
  syllabusArea: "Financial Mathematics",
  focus: "Financial mathematics",
  status: "active",

  video: {
    title: "Growth Factors, Compound Interest, and Depreciation",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use growth factors, compound interest, and depreciation models in financial contexts.",

  successCriteria: [
    "Convert percentage increases and decreases into growth or decay factors.",
    "Use compound interest models with matching time periods.",
    "Use depreciation models for repeated percentage decrease.",
    "Interpret rates as decimals, not whole numbers.",
    "Round financial answers appropriately using money notation.",
  ],

  teaching: {
    paragraphs: [
      "A percentage increase can be written as a growth factor. For example, a 4% increase means multiplying by $1.04$.",
      "A percentage decrease can be written as a decay factor. For example, a 12% decrease means multiplying by $0.88$.",
      "Compound interest applies repeated percentage growth, so the multiplier is used once for each time period.",
      "Depreciation applies repeated percentage decrease, often for assets such as cars or equipment.",
      "The time periods must match the compounding period. If a rate is annual, then $n$ counts years unless the question says otherwise.",
      "In financial questions, leave working unrounded where possible and round the final amount to the nearest cent.",
    ],
    latexBlocks: [
      "A=P(1+r)^n",
      "A=P(1-r)^n",
      "\\text{growth factor}=1+r",
      "\\text{decay factor}=1-r",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Compound interest",
      questionLatex:
        "\\$2000\\text{ is invested at }4\\%\\text{ p.a. compounded annually for 3 years. Find }A.",
      steps: [
        {
          explanation: "Identify the principal, rate, and number of periods.",
          latex: "P=2000,\\quad r=0.04,\\quad n=3",
        },
        {
          explanation: "Substitute into the compound interest formula.",
          latex: "A=2000(1+0.04)^3",
        },
        {
          explanation: "Evaluate and round to the nearest cent.",
          latex: "A=2000(1.04)^3=2249.728",
        },
      ],
      finalAnswerLatex: "\\$2249.73",
    },
    {
      title: "Worked example 2: Depreciation",
      questionLatex:
        "\\text{A car worth }\\$18000\\text{ depreciates by }12\\%\\text{ per year. Find its value after 4 years.}",
      steps: [
        {
          explanation: "A 12% decrease gives a decay factor of $1-0.12=0.88$.",
          latex: "r=0.12,\\quad 1-r=0.88",
        },
        {
          explanation: "Use the depreciation model.",
          latex: "A=18000(0.88)^4",
        },
        {
          explanation: "Evaluate and round to the nearest cent.",
          latex: "A=10794.51648",
        },
      ],
      finalAnswerLatex: "\\$10794.52",
    },
    {
      title: "Worked example 3: Growth and decay factors",
      questionLatex:
        "\\text{Find the growth factor for a }6.5\\%\\text{ increase and the decay factor for a }9\\%\\text{ decrease.}",
      steps: [
        {
          explanation: "Convert 6.5% to a decimal and add it to 1.",
          latex: "1+0.065=1.065",
        },
        {
          explanation: "Convert 9% to a decimal and subtract it from 1.",
          latex: "1-0.09=0.91",
        },
      ],
      finalAnswerLatex: "1.065,\\quad 0.91",
    },
  ],

  guidedPractice: [
    {
      id: "growth-guided-1",
      prompt: "Write the growth factor for a 7% increase.",
      latex: "\\text{increase}=7\\%",
      answer: "1.07",
      hint: "Convert 7% to 0.07, then add to 1.",
      explanation: "A 7% increase uses the growth factor $1.07$.",
    },
    {
      id: "growth-guided-2",
      prompt: "Write the decay factor for a 15% decrease.",
      latex: "\\text{decrease}=15\\%",
      answer: "0.85",
      hint: "Convert 15% to 0.15, then subtract from 1.",
      explanation: "A 15% decrease uses the decay factor $0.85$.",
    },
    {
      id: "growth-guided-3",
      prompt: "Choose the correct model for $1500 invested at 5% for 4 years.",
      latex: "A=\\ ?",
      answer: "B",
      choices: [
        { label: "A", text: "$1500(0.05)^4$" },
        { label: "B", text: "$1500(1.05)^4$" },
        { label: "C", text: "$1500(1.5)^4$" },
      ],
      hint: "Compound growth uses $1+r$.",
      explanation: "The correct model is $A=1500(1.05)^4$.",
    },
    {
      id: "growth-guided-4",
      prompt: "A value is multiplied by $0.92$ each year. What percentage decrease is this?",
      latex: "\\text{decay factor}=0.92",
      answer: "8%",
      acceptedAnswers: ["8", "8 percent", "8%"],
      hint: "Find $1-0.92$.",
      explanation: "$1-0.92=0.08$, so this is an 8% decrease.",
    },
  ],

  independentPractice: [
    {
      id: "growth-ind-1",
      prompt: "Find the amount after 2 years.",
      latex: "A=P(1+r)^n,\\quad P=\\$1000,\\quad r=6\\%,\\quad n=2",
      answer: "1123.60",
      acceptedAnswers: ["$1123.60", "$1,123.60", "1,123.60", "1123.6"],
      hint: "Evaluate the power first, then multiply by 1000.",
      explanation: "$1000(1.06)^2=1123.60$, so the amount is $\\$1123.60$.",
    },
    {
      id: "growth-ind-2",
      prompt: "Find the value after 3 years.",
      latex: "V=P(1-r)^n,\\quad P=\\$5000,\\quad r=10\\%,\\quad n=3",
      answer: "3645",
      acceptedAnswers: ["3645.00", "$3645", "$3645.00", "$3,645.00", "3,645"],
      hint: "This is a repeated 10% decrease.",
      explanation: "$5000(0.9)^3=3645$, so the value is $\\$3645.00$.",
    },
    {
      id: "growth-ind-3",
      prompt: "Choose the correct factor for a 3.5% annual increase.",
      latex: "\\text{growth factor}",
      answer: "C",
      choices: [
        { label: "A", text: "0.035" },
        { label: "B", text: "1.35" },
        { label: "C", text: "1.035" },
      ],
      hint: "Add the decimal rate to 1.",
      explanation: "A 3.5% increase uses $1+0.035=1.035$.",
    },
    {
      id: "growth-ind-4",
      prompt: "A laptop worth $2400 depreciates by 20% per year. Which model gives the value after 2 years?",
      latex: "A=\\ ?",
      answer: "A",
      choices: [
        { label: "A", text: "$2400(0.8)^2$" },
        { label: "B", text: "$2400(1.2)^2$" },
        { label: "C", text: "$2400(0.2)^2$" },
      ],
      hint: "Depreciation uses $1-r$.",
      explanation: "A 20% decrease gives a factor of $0.8$, so $A=2400(0.8)^2$.",
    },
    {
      id: "growth-ind-5",
      prompt: "Find the final amount to the nearest cent.",
      latex: "A=P(1+r)^n,\\quad P=\\$3000,\\quad r=2.5\\%,\\quad n=4",
      answer: "3311.44",
      acceptedAnswers: ["$3311.44", "$3,311.44", "3,311.44"],
      hint: "Evaluate the expression and round at the end.",
      explanation: "$3000(1.025)^4=3311.438671875$, so the final amount is $\\$3311.44$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using 4 instead of 0.04 for a 4% rate.",
      fix: "Convert percentages to decimals before substituting into the formula.",
    },
    {
      mistake: "Using $1-r$ for growth or $1+r$ for depreciation.",
      fix: "Growth increases the value, so use $1+r$. Depreciation decreases the value, so use $1-r$.",
    },
    {
      mistake: "Multiplying by the rate only once instead of compounding.",
      fix: "Repeated percentage change uses a power, such as $(1+r)^n$.",
    },
    {
      mistake: "Rounding too early.",
      fix: "Keep extra decimal places in working and round the final money value to the nearest cent.",
    },
  ],

  masteryQuiz: [
    {
      id: "growth-mastery-1",
      prompt: "Write the growth factor for a 5% increase.",
      latex: "\\text{growth factor}",
      answer: "1.05",
      hint: "Convert 5% to 0.05.",
      explanation: "The growth factor is $1+0.05=1.05$.",
    },
    {
      id: "growth-mastery-2",
      prompt: "Write the decay factor for an 18% decrease.",
      latex: "\\text{decay factor}",
      answer: "0.82",
      hint: "Subtract 0.18 from 1.",
      explanation: "The decay factor is $1-0.18=0.82$.",
    },
    {
      id: "growth-mastery-3",
      prompt: "Choose the compound interest model.",
      latex: "\\$4000\\text{ at }6\\%\\text{ p.a. for 3 years}",
      answer: "B",
      choices: [
        { label: "A", text: "$4000(0.06)^3$" },
        { label: "B", text: "$4000(1.06)^3$" },
        { label: "C", text: "$4000(1.6)^3$" },
      ],
      hint: "Use $1+r$ for compound interest.",
      explanation: "The correct model is $4000(1.06)^3$.",
    },
    {
      id: "growth-mastery-4",
      prompt: "An investment of $2000 earns 4% p.a. compounded annually for 3 years. Find the amount to the nearest cent.",
      latex: "P=2000,\\quad r=0.04,\\quad n=3",
      answer: "2249.73",
      acceptedAnswers: ["$2249.73", "$2,249.73", "2,249.73"],
      hint: "Build the compound interest model before evaluating.",
      explanation: "Use repeated growth because the interest compounds each year: $A=2000(1.04)^3$. This gives $2249.728$, so the amount is $\\$2249.73$.",
    },
    {
      id: "growth-mastery-5",
      prompt: "Equipment worth $10000 depreciates by 25% per year for 2 years. Find its value after 2 years.",
      latex: "\\text{depreciation}=25\\%\\text{ per year}",
      answer: "5625",
      acceptedAnswers: ["5625.00", "$5625", "$5,625", "$5625.00", "$5,625.00"],
      hint: "A 25% decrease leaves 75% of the value each year.",
      explanation: "Depreciation is repeated shrinkage, so the decay factor is $1-0.25=0.75$. The value is $10000(0.75)^2=5625$.",
    },
    {
      id: "growth-mastery-6",
      prompt: "A value is multiplied by $1.08$ each year. What is the annual percentage increase?",
      latex: "1.08=1+r",
      answer: "8%",
      acceptedAnswers: ["8", "8 percent", "8%"],
      hint: "Find $1.08-1$.",
      explanation: "$1.08-1=0.08$, so the increase is 8%.",
    },
    {
      id: "growth-mastery-7",
      prompt: "Which situation is depreciation?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "An account grows by 4% per year" },
        { label: "B", text: "A salary increases by 3% per year" },
        { label: "C", text: "A phone loses 15% of its value each year" },
      ],
      hint: "Depreciation means value decreases.",
      explanation: "A phone losing value each year is depreciation.",
    },
    {
      id: "growth-mastery-8",
      prompt: "Choose the correct depreciation model.",
      latex: "\\$18000\\text{ depreciates by }12\\%\\text{ per year for 4 years}",
      answer: "A",
      choices: [
        { label: "A", text: "$18000(0.88)^4$" },
        { label: "B", text: "$18000(1.12)^4$" },
        { label: "C", text: "$18000(0.12)^4$" },
      ],
      hint: "Use $1-0.12$.",
      explanation: "The decay factor is $0.88$, so the model is $18000(0.88)^4$.",
    },
    {
      id: "growth-mastery-9",
      prompt: "Find the final amount to the nearest cent.",
      latex: "A=750(1.03)^5",
      answer: "869.46",
      acceptedAnswers: ["$869.46", "869.46"],
      hint: "Do not round until the end.",
      explanation: "$750(1.03)^5=869.4567...$, so the final amount is $\\$869.46$.",
    },
    {
      id: "growth-mastery-10",
      prompt: "A savings balance uses $A=P(1.025)^n$. What rate is being applied each period?",
      latex: "1.025=1+r",
      answer: "2.5%",
      acceptedAnswers: ["2.5", "2.5%", "2.5 percent"],
      hint: "Subtract 1 from the growth factor.",
      explanation: "$1.025-1=0.025$, so the rate is 2.5% per period.",
    },
  ],

  masteryPassMark: 0.8,
};

export const recurrenceRelationsFinancialContextsLesson: ExplicitLesson = {
  id: "recurrence-relations-financial-contexts",
  slug: "recurrence-relations-financial-contexts",
  moduleSlug: "ma-m1-modelling-financial-situations",
  moduleTitle: "Modelling Financial Situations",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Recurrence Relations in Financial Contexts",
  description:
    "Use recurrence relations to model savings, loans, deposits, repayments, and depreciation step by step.",
  syllabusArea: "Financial Mathematics",
  focus: "Financial mathematics",
  status: "active",

  video: {
    title: "Recurrence Relations in Financial Contexts",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to interpret and calculate financial recurrence relations.",

  successCriteria: [
    "Identify the initial value in a recurrence relation.",
    "Interpret the multiplier as repeated growth or decay.",
    "Recognise whether a deposit or repayment is added or subtracted.",
    "Calculate the next terms of a financial recurrence accurately.",
    "Explain the meaning of a recurrence in context.",
  ],

  teaching: {
    paragraphs: [
      "A recurrence relation defines each term using the previous term.",
      "Financial recurrences can model repeated interest, deposits, repayments, or depreciation.",
      "For example, $B_{n+1}=1.04B_n+200$ means the balance grows by 4%, then $200 is added.",
      "For a loan, a recurrence such as $L_{n+1}=1.005L_n-600$ means interest is added, then a repayment is made.",
      "The initial value, such as $B_0$ or $L_0$, tells you where the sequence begins.",
      "Order matters. Follow the recurrence exactly rather than inventing a different order of operations.",
    ],
    latexBlocks: [
      "B_{n+1}=1.04B_n+200",
      "L_{n+1}=1.005L_n-600",
      "B_1=1.04B_0+200",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Savings recurrence",
      questionLatex:
        "B_0=1000,\\quad B_{n+1}=1.03B_n+100.\\quad \\text{Find }B_1\\text{ and }B_2.",
      steps: [
        {
          explanation: "Substitute $B_0=1000$ to find $B_1$.",
          latex: "B_1=1.03(1000)+100=1130",
        },
        {
          explanation: "Use $B_1=1130$ to find $B_2$.",
          latex: "B_2=1.03(1130)+100=1263.90",
        },
      ],
      finalAnswerLatex: "B_1=1130,\\quad B_2=1263.90",
    },
    {
      title: "Worked example 2: Loan recurrence",
      questionLatex:
        "L_0=5000,\\quad L_{n+1}=1.01L_n-250.\\quad \\text{Find }L_1\\text{ and interpret the recurrence.}",
      steps: [
        {
          explanation: "Substitute $L_0=5000$.",
          latex: "L_1=1.01(5000)-250=4800",
        },
        {
          explanation: "The loan grows by 1% interest, then a $250 repayment is made.",
          latex: "1.01L_n-250",
        },
      ],
      finalAnswerLatex:
        "L_1=4800,\\quad \\text{interest is added before a }\\$250\\text{ repayment}",
    },
    {
      title: "Worked example 3: Match a context to a recurrence",
      questionLatex:
        "\\text{A savings account earns }5\\%\\text{ interest and then }\\$50\\text{ is deposited each period.}",
      steps: [
        {
          explanation: "A 5% increase gives a multiplier of $1.05$.",
          latex: "1+0.05=1.05",
        },
        {
          explanation: "A deposit increases the balance, so add 50.",
          latex: "B_{n+1}=1.05B_n+50",
        },
      ],
      finalAnswerLatex: "B_{n+1}=1.05B_n+50",
    },
  ],

  guidedPractice: [
    {
      id: "recurrence-guided-1",
      prompt: "Identify the initial value.",
      latex: "B_0=800,\\quad B_{n+1}=1.02B_n+40",
      answer: "800",
      hint: "The initial value is the term with subscript 0.",
      explanation: "The initial balance is $B_0=800$.",
    },
    {
      id: "recurrence-guided-2",
      prompt: "Find $B_1$.",
      latex: "B_0=500,\\quad B_{n+1}=1.04B_n+20",
      answer: "540",
      acceptedAnswers: ["540.00", "$540", "$540.00"],
      hint: "Substitute $B_0=500$.",
      explanation: "$B_1=1.04(500)+20=540$.",
    },
    {
      id: "recurrence-guided-3",
      prompt: "In this recurrence, is 300 a deposit or repayment?",
      latex: "L_{n+1}=1.01L_n-300",
      answer: "repayment",
      acceptedAnswers: ["a repayment", "repay", "repayment"],
      hint: "The amount is subtracted from the loan.",
      explanation: "The $300 is subtracted, so it represents a repayment.",
    },
    {
      id: "recurrence-guided-4",
      prompt: "Choose the meaning of the multiplier.",
      latex: "B_{n+1}=1.06B_n+100",
      answer: "B",
      choices: [
        { label: "A", text: "The balance decreases by 6%" },
        { label: "B", text: "The balance increases by 6%" },
        { label: "C", text: "The balance increases by 106%" },
      ],
      hint: "The multiplier is $1+0.06$.",
      explanation: "$1.06$ means a 6% increase.",
    },
  ],

  independentPractice: [
    {
      id: "recurrence-ind-1",
      prompt: "Find $B_1$.",
      latex: "B_0=1200,\\quad B_{n+1}=1.05B_n+80",
      answer: "1340",
      acceptedAnswers: ["1340.00", "$1340", "$1,340", "$1340.00", "$1,340.00"],
      hint: "Apply the multiplier, then add 80.",
      explanation: "$B_1=1.05(1200)+80=1340$.",
    },
    {
      id: "recurrence-ind-2",
      prompt: "Find $L_1$.",
      latex: "L_0=9000,\\quad L_{n+1}=1.02L_n-500",
      answer: "8680",
      acceptedAnswers: ["8680.00", "$8680", "$8,680", "$8680.00", "$8,680.00"],
      hint: "Apply interest, then subtract the repayment.",
      explanation: "$L_1=1.02(9000)-500=8680$.",
    },
    {
      id: "recurrence-ind-3",
      prompt: "A machine loses 10% of its value each year. Choose a recurrence for its value.",
      latex: "V_{n+1}=\\ ?",
      answer: "A",
      choices: [
        { label: "A", text: "$V_{n+1}=0.9V_n$" },
        { label: "B", text: "$V_{n+1}=1.1V_n$" },
        { label: "C", text: "$V_{n+1}=10V_n$" },
      ],
      hint: "A 10% decrease uses the multiplier $0.9$.",
      explanation: "The correct recurrence is $V_{n+1}=0.9V_n$.",
    },
    {
      id: "recurrence-ind-4",
      prompt: "What percentage increase is represented by the multiplier?",
      latex: "B_{n+1}=1.025B_n+75",
      answer: "2.5%",
      acceptedAnswers: ["2.5", "2.5%", "2.5 percent"],
      hint: "Subtract 1 from 1.025.",
      explanation: "$1.025-1=0.025$, so the increase is 2.5%.",
    },
    {
      id: "recurrence-ind-5",
      prompt: "Choose the recurrence for a loan that grows by 0.5% interest each month, then has a $600 repayment.",
      latex: "L_{n+1}=\\ ?",
      answer: "C",
      choices: [
        { label: "A", text: "$L_{n+1}=0.995L_n+600$" },
        { label: "B", text: "$L_{n+1}=1.005L_n+600$" },
        { label: "C", text: "$L_{n+1}=1.005L_n-600$" },
      ],
      hint: "Interest increases the loan, repayment decreases it.",
      explanation: "The correct recurrence is $L_{n+1}=1.005L_n-600$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting the initial value.",
      fix: "Start from the given $B_0$, $L_0$, or $V_0$ before calculating later terms.",
    },
    {
      mistake: "Adding before multiplying when the recurrence says otherwise.",
      fix: "Follow the recurrence as written. In $B_{n+1}=1.03B_n+100$, multiply first, then add.",
    },
    {
      mistake: "Treating a repayment as a deposit.",
      fix: "A repayment on a loan is usually subtracted from the loan balance.",
    },
    {
      mistake: "Misinterpreting the multiplier as the percentage rate directly.",
      fix: "A multiplier of $1.04$ means a 4% increase, not a 104% rate.",
    },
  ],

  masteryQuiz: [
    {
      id: "recurrence-mastery-1",
      prompt: "A balance starts at 2500 dollars and follows $S_{n+1}=1.03S_n+150$. Find $S_1$.",
      latex: "S_0=2500,\\quad S_{n+1}=1.03S_n+150",
      answer: "2725",
      acceptedAnswers: ["2725.00", "$2725", "$2,725", "$2725.00", "$2,725.00"],
      hint: "Use $S_0$ in the recurrence to find the next term.",
      explanation: "The first update uses the starting balance: $S_1=1.03(2500)+150$. That equals $2575+150=2725$.",
    },
    {
      id: "recurrence-mastery-2",
      prompt: "A balance follows $B_{n+1}=1.04B_n+200$ and $B_0=500$. Find $B_1$.",
      latex: "B_0=500,\\quad B_{n+1}=1.04B_n+200",
      answer: "720",
      acceptedAnswers: ["720.00", "$720", "$720.00"],
      hint: "Multiply the current balance first, then add the deposit.",
      explanation: "The recurrence says to grow the balance by 4% first, then add $200$. So $B_1=1.04(500)+200=720$.",
    },
    {
      id: "recurrence-mastery-3",
      prompt: "A balance follows $B_{n+1}=1.02B_n+75$. If $B_1=1095$, find $B_2$.",
      latex: "B_1=1095,\\quad B_{n+1}=1.02B_n+75",
      answer: "1191.90",
      acceptedAnswers: ["1191.9", "$1191.90", "$1,191.90", "1,191.90"],
      hint: "Use $B_1$ as the current balance for the next update.",
      explanation: "To move from $B_1$ to $B_2$, substitute $1095$ into the recurrence. $B_2=1.02(1095)+75=1191.90$.",
    },
    {
      id: "recurrence-mastery-4",
      prompt: "Find $B_1$.",
      latex: "B_0=1000,\\quad B_{n+1}=1.03B_n+100",
      answer: "1130",
      acceptedAnswers: ["1130.00", "$1130", "$1,130", "$1130.00", "$1,130.00"],
      hint: "Substitute $B_0=1000$.",
      explanation: "$B_1=1.03(1000)+100=1130$.",
    },
    {
      id: "recurrence-mastery-5",
      prompt: "Find $B_2$.",
      latex: "B_0=1000,\\quad B_{n+1}=1.03B_n+100,\\quad B_1=1130",
      answer: "1263.90",
      acceptedAnswers: ["1263.9", "$1263.90", "$1,263.90", "1,263.90"],
      hint: "Use $B_1=1130$.",
      explanation: "$B_2=1.03(1130)+100=1263.90$.",
    },
    {
      id: "recurrence-mastery-6",
      prompt: "Find $L_1$.",
      latex: "L_0=5000,\\quad L_{n+1}=1.01L_n-250",
      answer: "4800",
      acceptedAnswers: ["4800.00", "$4800", "$4,800", "$4800.00", "$4,800.00"],
      hint: "Apply 1% interest, then subtract 250.",
      explanation: "$L_1=1.01(5000)-250=4800$.",
    },
    {
      id: "recurrence-mastery-7",
      prompt: "Choose the correct interpretation.",
      latex: "L_{n+1}=1.005L_n-600",
      answer: "B",
      choices: [
        { label: "A", text: "The loan decreases by 0.5%, then $600 is added" },
        { label: "B", text: "The loan grows by 0.5%, then a $600 repayment is made" },
        { label: "C", text: "The loan grows by 5%, then a $600 repayment is made" },
      ],
      hint: "$1.005$ is a small increase and $-600$ is a repayment.",
      explanation: "The loan grows by 0.5%, then $600 is subtracted.",
    },
    {
      id: "recurrence-mastery-8",
      prompt: "Choose the recurrence for a savings balance that earns 5% interest and then receives a $50 deposit.",
      latex: "B_{n+1}=\\ ?",
      answer: "A",
      choices: [
        { label: "A", text: "$B_{n+1}=1.05B_n+50$" },
        { label: "B", text: "$B_{n+1}=0.95B_n+50$" },
        { label: "C", text: "$B_{n+1}=1.05B_n-50$" },
      ],
      hint: "Interest increases the balance and a deposit is added.",
      explanation: "The correct recurrence is $B_{n+1}=1.05B_n+50$.",
    },
    {
      id: "recurrence-mastery-9",
      prompt: "A balance follows $B_{n+1}=1.02B_n+100$. If $B_0=2000$, find $B_1$.",
      latex: "B_1=\\ ?",
      answer: "2140",
      acceptedAnswers: ["2140.00", "$2140", "$2,140", "$2140.00", "$2,140.00"],
      hint: "Multiply by 1.02, then add 100.",
      explanation: "$B_1=1.02(2000)+100=2140$.",
    },
    {
      id: "recurrence-mastery-10",
      prompt: "A car value follows $V_{n+1}=0.85V_n$. What percentage depreciation is applied each period?",
      latex: "V_{n+1}=0.85V_n",
      answer: "15%",
      acceptedAnswers: ["15", "15%", "15 percent"],
      hint: "Find $1-0.85$.",
      explanation: "$1-0.85=0.15$, so the depreciation rate is 15%.",
    },
  ],

  masteryPassMark: 0.8,
};

export const futureValueAnnuitiesLesson: ExplicitLesson = {
  id: "future-value-annuities",
  slug: "future-value-annuities",
  moduleSlug: "ma-m1-modelling-financial-situations",
  moduleTitle: "Modelling Financial Situations",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Future Value of Annuities",
  description:
    "Calculate the future value of regular deposits with compound interest.",
  syllabusArea: "Financial Mathematics",
  focus: "Financial mathematics",
  status: "active",

  video: {
    title: "Future Value of Annuities",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how regular deposits grow over time when compound interest is applied.",

  successCriteria: [
    "Recognise an annuity as a sequence of regular payments or deposits.",
    "Use the future value annuity formula for equal deposits.",
    "Match the interest rate with the payment period.",
    "Interpret each variable in a financial context.",
    "Round final financial values to the nearest cent.",
  ],

  teaching: {
    paragraphs: [
      "An annuity involves regular equal payments or deposits made over time.",
      "The future value of an annuity is the total value of those regular deposits after compound interest has been applied.",
      "For deposits made at the end of each period, the standard formula uses the payment amount $M$, interest rate per period $r$, and number of payments $n$.",
      "The rate must match the deposit period. A monthly deposit needs a monthly interest rate.",
      "A common mark leak is using the annual rate directly when deposits are monthly.",
    ],
    latexBlocks: [
      "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)",
      "M=\\text{regular deposit}",
      "r=\\text{interest rate per period}",
      "n=\\text{number of deposits}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Future value of regular deposits",
      questionLatex:
        "\\text{Find the future value of }\\$200\\text{ deposited each year for 4 years at }5\\%\\text{ p.a.}",
      steps: [
        { explanation: "Identify the variables.", latex: "M=200,\\quad r=0.05,\\quad n=4" },
        { explanation: "Substitute into the formula.", latex: "FV=200\\left(\\frac{(1.05)^4-1}{0.05}\\right)" },
        { explanation: "Evaluate and round to cents.", latex: "FV=862.025" },
      ],
      finalAnswerLatex: "\\$862.03",
    },
    {
      title: "Worked example 2: Monthly deposits",
      questionLatex:
        "\\text{A student deposits }\\$100\\text{ each month for 6 months at }0.5\\%\\text{ per month. Find the future value.}",
      steps: [
        { explanation: "The rate is already monthly.", latex: "M=100,\\quad r=0.005,\\quad n=6" },
        { explanation: "Use the future value formula.", latex: "FV=100\\left(\\frac{(1.005)^6-1}{0.005}\\right)" },
        { explanation: "Evaluate.", latex: "FV=607.5502\\ldots" },
      ],
      finalAnswerLatex: "\\$607.55",
    },
  ],

  guidedPractice: [
    {
      id: "annuity-guided-1",
      prompt: "Identify the regular deposit.",
      latex: "\\$150\\text{ is deposited each month for 12 months.}",
      answer: "150",
      acceptedAnswers: ["$150", "$150.00", "150.00"],
      hint: "The regular deposit is the repeated payment amount.",
      explanation: "The regular deposit is $\\$150$.",
    },
    {
      id: "annuity-guided-2",
      prompt: "Identify the number of deposits.",
      latex: "\\$80\\text{ is deposited each month for 2 years.}",
      answer: "24",
      hint: "There are 12 months in a year.",
      explanation: "$2\\times12=24$ monthly deposits.",
    },
    {
      id: "annuity-guided-3",
      prompt: "Choose the correct rate per month.",
      latex: "6\\%\\text{ p.a. compounded monthly}",
      answer: "B",
      choices: [
        { label: "A", text: "0.06" },
        { label: "B", text: "0.005" },
        { label: "C", text: "0.5" },
      ],
      hint: "Divide the annual decimal rate by 12.",
      explanation: "$0.06\\div12=0.005$.",
    },
    {
      id: "annuity-guided-4",
      prompt: "Find the future value to the nearest cent.",
      latex: "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right),\\quad M=\\$100,\\quad r=0.01,\\quad n=3",
      answer: "303.01",
      acceptedAnswers: ["$303.01"],
      hint: "Evaluate the bracket first.",
      explanation: "$FV=303.01$.",
    },
  ],

  independentPractice: [
    {
      id: "annuity-ind-1",
      prompt: "Find the future value to the nearest cent.",
      latex: "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right),\\quad M=\\$50,\\quad r=0.02,\\quad n=5",
      answer: "260.20",
      acceptedAnswers: ["$260.20", "260.2"],
      hint: "Use the formula directly.",
      explanation: "$FV=260.202008$, so the value is $\\$260.20$.",
    },
    {
      id: "annuity-ind-2",
      prompt: "How many monthly deposits are made over 3 years?",
      latex: "n=\\ ?",
      answer: "36",
      hint: "Multiply years by 12.",
      explanation: "$3\\times12=36$.",
    },
    {
      id: "annuity-ind-3",
      prompt: "Choose the correct future value formula.",
      latex: "M=200,\\quad r=0.01,\\quad n=10",
      answer: "C",
      choices: [
        { label: "A", text: "$FV=200(1.01)^{10}$" },
        { label: "B", text: "$FV=200\\left(\\frac{1.01-1}{10}\\right)$" },
        { label: "C", text: "$FV=200\\left(\\frac{(1.01)^{10}-1}{0.01}\\right)$" },
      ],
      hint: "Use the annuity formula for repeated deposits.",
      explanation: "Option C is the future value annuity formula.",
    },
    {
      id: "annuity-ind-4",
      prompt: "A monthly rate is 0.25%. Write it as a decimal.",
      latex: "0.25\\%",
      answer: "0.0025",
      hint: "Divide by 100.",
      explanation: "$0.25\\%=0.0025$.",
    },
    {
      id: "annuity-ind-5",
      prompt: "Find the future value to the nearest cent.",
      latex: "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right),\\quad M=\\$120,\\quad r=0.005,\\quad n=8",
      answer: "976.97",
      acceptedAnswers: ["$976.97"],
      hint: "Evaluate and round at the end.",
      explanation: "$FV=976.96905\\ldots$, so the value is $\\$976.97$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using the annual rate when deposits are monthly.",
      fix: "Convert the rate so it matches the payment period.",
    },
    {
      mistake: "Using the compound interest formula for one principal instead of an annuity formula.",
      fix: "Use the annuity formula when equal deposits are made repeatedly.",
    },
    {
      mistake: "Counting years instead of payment periods.",
      fix: "For monthly deposits, multiply the number of years by 12.",
    },
    {
      mistake: "Rounding intermediate values too early.",
      fix: "Keep full calculator values and round the final answer to cents.",
    },
  ],

  masteryQuiz: [
    {
      id: "annuity-mastery-1",
      prompt: "A student deposits $60 at the end of each month for 2 years. Which setup uses the correct annuity inputs?",
      latex: "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)",
      answer: "B",
      choices: [
        { label: "A", text: "$M=24,\\ n=60$" },
        { label: "B", text: "$M=60,\\ n=24$" },
        { label: "C", text: "$M=2,\\ n=60$" },
      ],
      hint: "$M$ is the repeated deposit and $n$ counts the number of deposits.",
      explanation: "The regular deposit is $60, so $M=60$. Two years of monthly deposits gives $n=2\\times12=24$.",
    },
    {
      id: "annuity-mastery-2",
      prompt: "How many monthly deposits are made in 2.5 years?",
      latex: "n=\\ ?",
      answer: "30",
      hint: "Convert years to months before counting deposits.",
      explanation: "Monthly deposits happen 12 times per year. Over 2.5 years, $n=2.5\\times12=30$ deposits.",
    },
    {
      id: "annuity-mastery-3",
      prompt: "Convert 12% p.a. compounded monthly to a monthly decimal rate.",
      latex: "r=\\ ?",
      answer: "0.01",
      hint: "Divide 0.12 by 12.",
      explanation: "$0.12\\div12=0.01$.",
    },
    {
      id: "annuity-mastery-4",
      prompt: "Find the future value to the nearest cent.",
      latex: "FV=100\\left(\\frac{(1.01)^4-1}{0.01}\\right)",
      answer: "406.04",
      acceptedAnswers: ["$406.04"],
      hint: "Substitute directly.",
      explanation: "$FV=406.0401$, so the value is $\\$406.04$.",
    },
    {
      id: "annuity-mastery-5",
      prompt: "Find the future value to the nearest cent.",
      latex: "FV=250\\left(\\frac{(1.02)^3-1}{0.02}\\right)",
      answer: "765.10",
      acceptedAnswers: ["$765.10", "765.1"],
      hint: "Evaluate the bracket first.",
      explanation: "$FV=765.10$.",
    },
    {
      id: "annuity-mastery-6",
      prompt: "Which model is for repeated equal deposits?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "$A=P(1+r)^n$" },
        { label: "B", text: "$A=P(1-r)^n$" },
        { label: "C", text: "$FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)$" },
      ],
      hint: "Look for the annuity formula.",
      explanation: "Option C models regular deposits.",
    },
    {
      id: "annuity-mastery-7",
      prompt: "A student deposits $75 monthly for 10 months. The future value is $760.20. How much interest was earned?",
      latex: "FV=760.20,\\quad \\text{deposits}=10\\times75",
      answer: "10.20",
      acceptedAnswers: ["$10.20", "10.2"],
      hint: "Compare the future value with the total amount deposited.",
      explanation: "The student deposited $75\\times10=750$ in total. The interest earned is $760.20-750=10.20$.",
    },
    {
      id: "annuity-mastery-8",
      prompt: "Which value should be used for $n$?",
      latex: "\\$200\\text{ deposited quarterly for 3 years}",
      answer: "12",
      hint: "There are 4 quarters in a year.",
      explanation: "$3\\times4=12$ deposits.",
    },
    {
      id: "annuity-mastery-9",
      prompt: "Find the future value to the nearest cent.",
      latex: "FV=80\\left(\\frac{(1.005)^6-1}{0.005}\\right)",
      answer: "486.03",
      acceptedAnswers: ["$486.03"],
      hint: "Round the final answer to cents.",
      explanation: "$FV=486.0301\\ldots$, so the value is $\\$486.03$.",
    },
    {
      id: "annuity-mastery-10",
      prompt: "A student deposits $100 each month. The annual rate is 6% p.a. compounded monthly. What monthly decimal rate should be used?",
      latex: "r=\\ ?",
      answer: "0.005",
      acceptedAnswers: ["0.0050"],
      hint: "Convert 6% to a decimal and divide by 12.",
      explanation: "The deposits are monthly, so the rate must also be monthly. $0.06\\div12=0.005$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const presentValueLoanRepaymentsLesson: ExplicitLesson = {
  id: "present-value-loan-repayments",
  slug: "present-value-loan-repayments",
  moduleSlug: "ma-m1-modelling-financial-situations",
  moduleTitle: "Modelling Financial Situations",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Present Value and Loan Repayments",
  description:
    "Use financial models to analyse loan balances, repayments, and present value.",
  syllabusArea: "Financial Mathematics",
  focus: "Financial mathematics",
  status: "active",

  video: {
    title: "Present Value and Loan Repayments",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how present value and repayment models describe loans and future payments.",

  successCriteria: [
    "Recognise present value as the value now of future payments.",
    "Use loan recurrence relations to update balances.",
    "Interpret repayments as amounts subtracted from a loan balance.",
    "Use matching interest and repayment periods.",
    "Decide whether a loan balance is increasing or decreasing.",
  ],

  teaching: {
    paragraphs: [
      "Present value asks what a future amount or payment stream is worth now.",
      "Loan balances can be modelled using recurrence relations where interest is added and repayments are subtracted.",
      "A recurrence such as $L_{n+1}=1.01L_n-500$ means the balance grows by 1%, then a repayment of $500 is made.",
      "If repayments are too small, the loan may not reduce quickly enough.",
      "In exam questions, check whether the question asks for a remaining balance, total repayment, or present value.",
    ],
    latexBlocks: [
      "PV=\\frac{FV}{(1+r)^n}",
      "L_{n+1}=(1+r)L_n-R",
      "R=\\text{regular repayment}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Present value of a future amount",
      questionLatex:
        "\\text{Find the present value of }\\$5000\\text{ due in 2 years at }5\\%\\text{ p.a.}",
      steps: [
        { explanation: "Use the present value formula.", latex: "PV=\\frac{FV}{(1+r)^n}" },
        { explanation: "Substitute the values.", latex: "PV=\\frac{5000}{(1.05)^2}" },
        { explanation: "Evaluate and round.", latex: "PV=4535.147\\ldots" },
      ],
      finalAnswerLatex: "\\$4535.15",
    },
    {
      title: "Worked example 2: Loan repayment recurrence",
      questionLatex:
        "L_0=10000,\\quad L_{n+1}=1.01L_n-600.\\quad \\text{Find }L_1\\text{ and }L_2.",
      steps: [
        { explanation: "Find the first balance.", latex: "L_1=1.01(10000)-600=9500" },
        { explanation: "Use $L_1$ to find $L_2$.", latex: "L_2=1.01(9500)-600=8995" },
      ],
      finalAnswerLatex: "L_1=9500,\\quad L_2=8995",
    },
  ],

  guidedPractice: [
    {
      id: "loan-guided-1",
      prompt: "Choose the meaning of $-400$.",
      latex: "L_{n+1}=1.02L_n-400",
      answer: "B",
      choices: [
        { label: "A", text: "A fee is added" },
        { label: "B", text: "A repayment is made" },
        { label: "C", text: "The interest rate is 400%" },
      ],
      hint: "The amount is subtracted from the balance.",
      explanation: "$-400$ represents a repayment.",
    },
    {
      id: "loan-guided-2",
      prompt: "Find $L_1$.",
      latex: "L_0=2000,\\quad L_{n+1}=1.01L_n-150",
      answer: "1870",
      acceptedAnswers: ["$1870", "$1,870", "$1870.00", "$1,870.00"],
      hint: "Apply interest, then subtract repayment.",
      explanation: "$L_1=1.01(2000)-150=1870$.",
    },
    {
      id: "loan-guided-3",
      prompt: "Find the present value to the nearest cent.",
      latex: "PV=\\frac{FV}{(1+r)^n},\\quad FV=\\$1000,\\quad r=5\\%,\\quad n=1",
      answer: "952.38",
      acceptedAnswers: ["$952.38"],
      hint: "Divide by 1.05.",
      explanation: "$PV=952.3809\\ldots$, so $PV=\\$952.38$.",
    },
    {
      id: "loan-guided-4",
      prompt: "Is the loan balance lower after one month?",
      latex: "L_0=5000,\\quad L_1=4800",
      answer: "yes",
      acceptedAnswers: ["Yes", "lower", "decreased"],
      hint: "Compare $L_1$ with $L_0$.",
      explanation: "$4800<5000$, so the loan balance is lower.",
    },
  ],

  independentPractice: [
    {
      id: "loan-ind-1",
      prompt: "Find $L_1$.",
      latex: "L_0=6000,\\quad L_{n+1}=1.005L_n-350",
      answer: "5680",
      acceptedAnswers: ["$5680", "$5,680", "$5680.00", "$5,680.00"],
      hint: "Apply interest, then subtract 350.",
      explanation: "$L_1=1.005(6000)-350=5680$.",
    },
    {
      id: "loan-ind-2",
      prompt: "Find $L_2$.",
      latex: "L_0=3000,\\quad L_{n+1}=1.02L_n-200,\\quad L_1=2860",
      answer: "2717.20",
      acceptedAnswers: ["$2717.20", "$2,717.20", "2717.2"],
      hint: "Use $L_1=2860$.",
      explanation: "$L_2=1.02(2860)-200=2717.20$.",
    },
    {
      id: "loan-ind-3",
      prompt: "Find the present value to the nearest cent.",
      latex: "PV=\\frac{FV}{(1+r)^n},\\quad FV=\\$2000,\\quad r=4\\%,\\quad n=2",
      answer: "1849.11",
      acceptedAnswers: ["$1849.11", "$1,849.11"],
      hint: "Evaluate the denominator first.",
      explanation: "$PV=1849.1124\\ldots$, so $PV=\\$1849.11$.",
    },
    {
      id: "loan-ind-4",
      prompt: "Choose the loan recurrence with 1% interest and a $500 repayment.",
      latex: "L_{n+1}=\\ ?",
      answer: "A",
      choices: [
        { label: "A", text: "$L_{n+1}=1.01L_n-500$" },
        { label: "B", text: "$L_{n+1}=0.99L_n-500$" },
        { label: "C", text: "$L_{n+1}=1.01L_n+500$" },
      ],
      hint: "Interest increases the loan and repayment decreases it.",
      explanation: "The correct recurrence is $L_{n+1}=1.01L_n-500$.",
    },
    {
      id: "loan-ind-5",
      prompt: "A balance changes from $8000 to $7600. Did the loan reduce?",
      latex: "8000\\to7600",
      answer: "yes",
      acceptedAnswers: ["Yes", "reduced", "decreased"],
      hint: "Compare the second value with the first.",
      explanation: "$7600<8000$, so the loan reduced.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Treating repayments as deposits.",
      fix: "Repayments reduce loan balances, so they are subtracted.",
    },
    {
      mistake: "Using a future value formula when the question asks for present value.",
      fix: "Present value discounts a future amount back to today.",
    },
    {
      mistake: "Using the wrong period for the interest rate.",
      fix: "Monthly repayments require a monthly interest rate.",
    },
    {
      mistake: "Forgetting to interpret the remaining balance.",
      fix: "State whether the balance has reduced and what the amount represents.",
    },
  ],

  masteryQuiz: [
    {
      id: "loan-mastery-1",
      prompt: "What does present value mean?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "The value now of a future amount" },
        { label: "B", text: "The total after all future interest" },
        { label: "C", text: "The number of repayments" },
      ],
      hint: "Present value is a current value.",
      explanation: "Present value is the value now of a future amount.",
    },
    {
      id: "loan-mastery-2",
      prompt: "Find $L_1$.",
      latex: "L_0=4000,\\quad L_{n+1}=1.01L_n-300",
      answer: "3740",
      acceptedAnswers: ["$3740", "$3,740", "$3740.00", "$3,740.00"],
      hint: "Apply interest, then subtract repayment.",
      explanation: "$L_1=1.01(4000)-300=3740$.",
    },
    {
      id: "loan-mastery-3",
      prompt: "Find $L_2$.",
      latex: "L_0=4000,\\quad L_{n+1}=1.01L_n-300,\\quad L_1=3740",
      answer: "3477.40",
      acceptedAnswers: ["$3477.40", "$3,477.40", "3477.4"],
      hint: "Use $L_1=3740$.",
      explanation: "$L_2=1.01(3740)-300=3477.40$.",
    },
    {
      id: "loan-mastery-4",
      prompt: "Find the present value to the nearest cent.",
      latex: "PV=\\frac{1500}{1.03}",
      answer: "1456.31",
      acceptedAnswers: ["$1456.31", "$1,456.31"],
      hint: "Divide by 1.03.",
      explanation: "$PV=1456.3106\\ldots$, so $PV=\\$1456.31$.",
    },
    {
      id: "loan-mastery-5",
      prompt: "Which recurrence models a loan growing by 2% then a $250 repayment?",
      latex: "L_{n+1}=\\ ?",
      answer: "B",
      choices: [
        { label: "A", text: "$L_{n+1}=0.98L_n-250$" },
        { label: "B", text: "$L_{n+1}=1.02L_n-250$" },
        { label: "C", text: "$L_{n+1}=1.02L_n+250$" },
      ],
      hint: "Interest increases; repayment subtracts.",
      explanation: "The correct recurrence is $L_{n+1}=1.02L_n-250$.",
    },
    {
      id: "loan-mastery-6",
      prompt: "Choose the meaning of $1.005$ in a loan recurrence.",
      latex: "L_{n+1}=1.005L_n-600",
      answer: "C",
      choices: [
        { label: "A", text: "5% interest" },
        { label: "B", text: "0.5% decrease" },
        { label: "C", text: "0.5% interest" },
      ],
      hint: "$1.005=1+0.005$.",
      explanation: "$1.005$ means 0.5% interest.",
    },
    {
      id: "loan-mastery-7",
      prompt: "Find the present value to the nearest cent.",
      latex: "PV=\\frac{5000}{(1.05)^2}",
      answer: "4535.15",
      acceptedAnswers: ["$4535.15", "$4,535.15"],
      hint: "Use the present value formula.",
      explanation: "$PV=4535.147\\ldots$, so $PV=\\$4535.15$.",
    },
    {
      id: "loan-mastery-8",
      prompt: "If $L_0=5000$ and $L_1=5050$, did the loan reduce?",
      latex: "5000\\to5050",
      answer: "no",
      acceptedAnswers: ["No", "increased", "not reduced"],
      hint: "Compare the second balance with the first.",
      explanation: "$5050>5000$, so the loan did not reduce.",
    },
    {
      id: "loan-mastery-9",
      prompt: "A loan follows $L_{n+1}=1.01L_n-400$ with $L_0=10000$. Find $L_1$.",
      latex: "L_0=10000,\\quad L_{n+1}=1.01L_n-400",
      answer: "9700",
      acceptedAnswers: ["9700.00", "$9700", "$9,700", "$9700.00", "$9,700.00"],
      hint: "Apply interest to the current loan balance, then subtract the repayment.",
      explanation: "The loan first grows by 1%: $1.01(10000)=10100$. After the repayment of 400 dollars, $L_1=9700$.",
    },
    {
      id: "loan-mastery-10",
      prompt: "A loan has monthly repayments. Which interest rate should be used in the recurrence?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "The annual rate without adjustment" },
        { label: "B", text: "The monthly rate" },
        { label: "C", text: "The number of years" },
      ],
      hint: "Match the rate period to the repayment period.",
      explanation: "Monthly repayments require a monthly rate.",
    },
  ],

  masteryPassMark: 0.8,
};

export const comparingFinancialOptionsLesson: ExplicitLesson = {
  id: "comparing-financial-options",
  slug: "comparing-financial-options",
  moduleSlug: "ma-m1-modelling-financial-situations",
  moduleTitle: "Modelling Financial Situations",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Comparing Financial Options",
  description:
    "Compare savings, investment, depreciation, and loan options using equivalent financial calculations.",
  syllabusArea: "Financial Mathematics",
  focus: "Financial mathematics",
  status: "active",

  video: {
    title: "Comparing Financial Options",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to compare financial options using calculations that match the question being asked.",

  successCriteria: [
    "Identify what the question is asking you to compare.",
    "Use equivalent time periods when comparing options.",
    "Calculate the final value, cost, or balance for each option.",
    "Account for fees, bonuses, deposits, or repayments.",
    "Make a clear conclusion supported by calculations.",
  ],

  teaching: {
    paragraphs: [
      "Financial mathematics can be used to compare savings, investment, depreciation, and loan options.",
      "The best option depends on the question: largest future value, lowest total cost, lowest remaining balance, or fastest payoff.",
      "A fair comparison uses equivalent time periods and matching compounding periods.",
      "Fees, repayments, deposits, and bonuses can change which option is better.",
      "A final financial conclusion should be supported by calculated values, not just by comparing interest rates.",
    ],
    latexBlocks: [
      "A=P(1+r)^n",
      "L_{n+1}=(1+r)L_n-R",
      "\\text{better option}=\\text{the option that matches the question goal}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Compare two investments",
      questionLatex:
        "\\text{Option A: }\\$3000\\text{ at }5\\%\\text{ p.a. for 4 years. Option B: }\\$3000\\text{ at }4.8\\%\\text{ p.a. for 4 years plus }\\$50\\text{ bonus.}",
      steps: [
        { explanation: "Calculate Option A.", latex: "A=3000(1.05)^4=3646.52" },
        { explanation: "Calculate Option B including the bonus.", latex: "B=3000(1.048)^4+50=3668.82" },
        { explanation: "Compare the final values.", latex: "3668.82>3646.52" },
      ],
      finalAnswerLatex: "\\text{Option B gives the larger final value.}",
    },
    {
      title: "Worked example 2: Compare loan balances",
      questionLatex:
        "L_0=5000.\\quad \\text{A: }L_{n+1}=1.01L_n-300.\\quad \\text{B: }L_{n+1}=1.008L_n-260.",
      steps: [
        { explanation: "Find the balance after two months for Option A.", latex: "A_1=4750,\\quad A_2=4497.50" },
        { explanation: "Find the balance after two months for Option B.", latex: "B_1=4780,\\quad B_2=4558.24" },
        { explanation: "Lower remaining balance is better for the borrower.", latex: "4497.50<4558.24" },
      ],
      finalAnswerLatex: "\\text{Option A gives the lower balance after two months.}",
    },
  ],

  guidedPractice: [
    {
      id: "compare-guided-1",
      prompt: "What should be compared when the question asks for the best investment?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "The largest final value" },
        { label: "B", text: "The lowest final value" },
        { label: "C", text: "The largest remaining loan balance" },
      ],
      hint: "An investment is usually better when it grows to more.",
      explanation: "For an investment, the larger final value is better.",
    },
    {
      id: "compare-guided-2",
      prompt: "Calculate Option A.",
      latex: "A=P(1+r)^n,\\quad P=\\$1000,\\quad r=5\\%,\\quad n=2",
      answer: "1102.50",
      acceptedAnswers: ["$1102.50", "$1,102.50", "1102.5"],
      hint: "Evaluate the compound interest expression.",
      explanation: "$1000(1.05)^2=1102.50$.",
    },
    {
      id: "compare-guided-3",
      prompt: "Calculate Option B including a $20 bonus.",
      latex: "\\text{principal}=\\$1000,\\quad r=4\\%,\\quad n=2,\\quad \\text{bonus}=\\$20",
      answer: "1101.60",
      acceptedAnswers: ["$1101.60", "$1,101.60", "1101.6"],
      hint: "Add the bonus after calculating the investment value.",
      explanation: "$1000(1.04)^2+20=1101.60$.",
    },
    {
      id: "compare-guided-4",
      prompt: "Which option is better for the investment?",
      latex: "A=1102.50,\\quad B=1101.60",
      answer: "A",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "Choose the larger final value.",
      explanation: "Option A is larger by $0.90$.",
    },
  ],

  independentPractice: [
    {
      id: "compare-ind-1",
      prompt: "Which final value is larger?",
      latex: "\\text{Option A: }P=\\$2000,r=3\\%,n=3\\quad \\text{Option B: }P=\\$2000,r=2.5\\%,n=3,\\text{ bonus }\\$40",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "Calculate both final values.",
      explanation: "$A=2185.45$ and $B=2193.78$, so B is larger.",
    },
    {
      id: "compare-ind-2",
      prompt: "Find the lower depreciated value.",
      latex: "\\text{Option A: }P=\\$15000,r=10\\%,n=2\\quad \\text{Option B: }P=\\$15000,r=15\\%,n=2",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "Calculate both values.",
      explanation: "$A=12150$ and $B=10837.50$, so B is lower.",
    },
    {
      id: "compare-ind-3",
      prompt: "Find the balance after one month.",
      latex: "L_0=4000,\\quad L_{n+1}=1.01L_n-250",
      answer: "3790",
      acceptedAnswers: ["$3790", "$3,790", "$3790.00", "$3,790.00"],
      hint: "Apply interest, then subtract repayment.",
      explanation: "$L_1=1.01(4000)-250=3790$.",
    },
    {
      id: "compare-ind-4",
      prompt: "A $30 fee is charged at the end. Find the final cost.",
      latex: "\\text{price}=\\$500,\\quad r=4\\%,\\quad n=2,\\quad \\text{fee}=\\$30",
      answer: "570.80",
      acceptedAnswers: ["$570.80", "570.8"],
      hint: "Add the fee after the growth calculation.",
      explanation: "$500(1.04)^2+30=570.80$.",
    },
    {
      id: "compare-ind-5",
      prompt: "For a loan, which result is better for the borrower?",
      latex: "A=3250,\\quad B=3180",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "A lower remaining loan balance is better.",
      explanation: "Option B has the lower remaining balance.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Comparing different time periods.",
      fix: "Convert both options to the same time period before deciding.",
    },
    {
      mistake: "Choosing the larger payment when the question asks for lower cost.",
      fix: "Identify whether the goal is largest value, lowest cost, or lowest balance.",
    },
    {
      mistake: "Ignoring fees or bonuses.",
      fix: "Include all stated bonuses, fees, deposits, and repayments in the calculation.",
    },
    {
      mistake: "Making a conclusion without supporting calculations.",
      fix: "Show the calculated values for each option before choosing.",
    },
  ],

  masteryQuiz: [
    {
      id: "compare-mastery-1",
      prompt: "Investment A grows \\(\\$3000\\) at 5% for 2 years. Investment B grows \\(\\$3000\\) at 4% for 2 years and adds a \\(\\$70\\) bonus. Which investment has the larger final value?",
      latex: "A=3000(1.05)^2,\\quad B=3000(1.04)^2+70",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
        { label: "C", text: "They are equal" },
      ],
      hint: "Calculate both final values before choosing.",
      explanation: "Option A gives $3000(1.05)^2=3307.50$. Option B gives $3000(1.04)^2+70=3314.80$, so B is larger.",
    },
    {
      id: "compare-mastery-2",
      prompt: "A borrower compares two one-month loan options. Loan A uses $L_1=1.01(5000)-400$. Loan B uses $L_1=1.015(5000)-450$. Which leaves the lower balance?",
      latex: "A=1.01(5000)-400,\\quad B=1.015(5000)-450",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
        { label: "C", text: "They leave the same balance" },
      ],
      hint: "For loans, the borrower wants the smaller remaining balance.",
      explanation: "Option A leaves $5050-400=4650$. Option B leaves $5075-450=4625$, so B is lower for the borrower.",
    },
    {
      id: "compare-mastery-3",
      prompt: "What must be true before comparing two options?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "They must have the same wording" },
        { label: "B", text: "They must use different units" },
        { label: "C", text: "They must be compared over equivalent time periods" },
      ],
      hint: "Fair comparisons use like with like.",
      explanation: "Equivalent time periods are needed for a fair comparison.",
    },
    {
      id: "compare-mastery-4",
      prompt: "Calculate the final value.",
      latex: "A=3000(1.05)^4",
      answer: "3646.52",
      acceptedAnswers: ["$3646.52", "$3,646.52"],
      hint: "Evaluate and round to cents.",
      explanation: "$A=3646.52$.",
    },
    {
      id: "compare-mastery-5",
      prompt: "Calculate the final value including the bonus.",
      latex: "B=3000(1.048)^4+50",
      answer: "3668.82",
      acceptedAnswers: ["$3668.82", "$3,668.82"],
      hint: "Add the bonus after the compound value.",
      explanation: "$B=3668.82$.",
    },
    {
      id: "compare-mastery-6",
      prompt: "Which investment is better?",
      latex: "A=3646.52,\\quad B=3668.82",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "Choose the larger final value.",
      explanation: "Option B gives the larger final value.",
    },
    {
      id: "compare-mastery-7",
      prompt: "Choose the better conclusion.",
      latex: "\\text{A loan option leaves }\\$4497.50\\text{ owing instead of }\\$4558.24.",
      answer: "A",
      choices: [
        { label: "A", text: "The $4497.50 option is better for the borrower" },
        { label: "B", text: "The $4558.24 option is better for the borrower" },
        { label: "C", text: "No comparison can be made" },
      ],
      hint: "A borrower wants the lower remaining balance.",
      explanation: "$4497.50$ is the lower balance.",
    },
    {
      id: "compare-mastery-8",
      prompt: "A fee is added at the end. What should you do?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "Ignore it" },
        { label: "B", text: "Subtract it from both options" },
        { label: "C", text: "Include it in that option's final cost" },
      ],
      hint: "Fees affect the final comparison.",
      explanation: "The fee must be included in the final cost.",
    },
    {
      id: "compare-mastery-9",
      prompt: "Option A costs $520 and Option B costs $498. Which has the lower cost?",
      latex: "520\\text{ vs }498",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "Lower cost means the smaller amount.",
      explanation: "$498$ is lower than $520$.",
    },
    {
      id: "compare-mastery-10",
      prompt: "Calculate the difference.",
      latex: "3668.82-3646.52",
      answer: "22.30",
      acceptedAnswers: ["$22.30"],
      hint: "Subtract the smaller final value from the larger.",
      explanation: "$3668.82-3646.52=22.30$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const mixedFinancialMathematicsExamPracticeLesson: ExplicitLesson = {
  id: "mixed-financial-mathematics-exam-practice",
  slug: "mixed-financial-mathematics-exam-practice",
  moduleSlug: "ma-m1-modelling-financial-situations",
  moduleTitle: "Modelling Financial Situations",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Mixed Financial Mathematics Exam Practice",
  description:
    "Practise mixed exam-style questions involving compound interest, recurrence, annuities, loans, and financial decision-making.",
  syllabusArea: "Financial Mathematics",
  focus: "Financial mathematics",
  status: "active",

  video: {
    title: "Mixed Financial Mathematics Exam Practice",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to identify and solve mixed financial mathematics exam questions.",

  successCriteria: [
    "Identify whether a question involves growth, decay, recurrence, annuity, loan, or comparison.",
    "Choose an appropriate formula or recurrence.",
    "Calculate carefully and round to cents where appropriate.",
    "Interpret the answer in context.",
    "Avoid common model-selection errors in exam-style questions.",
  ],

  teaching: {
    paragraphs: [
      "Exam questions often combine compound interest, depreciation, recurrence relations, annuities, loans, and comparison.",
      "The first step is identifying the financial model being used.",
      "Growth uses a factor greater than 1. Depreciation uses a factor less than 1.",
      "Recurrence relations update a balance step by step, while annuity formulae handle repeated equal deposits.",
      "Financial answers usually need rounding to cents and a short conclusion in context.",
    ],
    latexBlocks: [
      "A=P(1+r)^n",
      "A=P(1-r)^n",
      "B_{n+1}=(1+r)B_n+D",
      "L_{n+1}=(1+r)L_n-R",
      "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Depreciation",
      questionLatex:
        "\\text{A laptop costs }\\$1800\\text{ and depreciates by }15\\%\\text{ per year. Find its value after 3 years.}",
      steps: [
        { explanation: "Use a decay factor of $0.85$.", latex: "A=1800(0.85)^3" },
        { explanation: "Evaluate and round.", latex: "A=1105.425" },
      ],
      finalAnswerLatex: "\\$1105.43",
    },
    {
      title: "Worked example 2: Recurrence",
      questionLatex:
        "B_0=500,\\quad B_{n+1}=1.02B_n+100.\\quad \\text{Find }B_2.",
      steps: [
        { explanation: "Find $B_1$.", latex: "B_1=1.02(500)+100=610" },
        { explanation: "Find $B_2$.", latex: "B_2=1.02(610)+100=722.20" },
      ],
      finalAnswerLatex: "B_2=722.20",
    },
    {
      title: "Worked example 3: Compare savings options",
      questionLatex:
        "\\text{Option A: }\\$1000(1.04)^2.\\quad \\text{Option B: }\\$1000(1.03)^2+30.",
      steps: [
        { explanation: "Calculate Option A.", latex: "A=1081.60" },
        { explanation: "Calculate Option B.", latex: "B=1090.90" },
        { explanation: "Choose the larger final value.", latex: "1090.90>1081.60" },
      ],
      finalAnswerLatex: "\\text{Option B is better.}",
    },
  ],

  guidedPractice: [
    {
      id: "mixed-fin-guided-1",
      prompt: "Choose the model type.",
      latex: "\\text{A car loses }12\\%\\text{ of its value each year.}",
      answer: "B",
      choices: [
        { label: "A", text: "Compound growth" },
        { label: "B", text: "Depreciation" },
        { label: "C", text: "Future value of an annuity" },
      ],
      hint: "The value is decreasing.",
      explanation: "This is depreciation.",
    },
    {
      id: "mixed-fin-guided-2",
      prompt: "Choose the model type.",
      latex: "\\$100\\text{ is deposited each month.}",
      answer: "C",
      choices: [
        { label: "A", text: "One-off compound interest" },
        { label: "B", text: "Depreciation" },
        { label: "C", text: "Annuity" },
      ],
      hint: "Repeated equal deposits suggest an annuity.",
      explanation: "Regular equal deposits form an annuity.",
    },
    {
      id: "mixed-fin-guided-3",
      prompt: "Find the value to the nearest cent.",
      latex: "V=P(1-r)^n,\\quad P=\\$1800,\\quad r=15\\%,\\quad n=3",
      answer: "1105.43",
      acceptedAnswers: ["$1105.43", "$1,105.43"],
      hint: "Use the decay factor.",
      explanation: "$1800(0.85)^3=1105.425$, so $A=\\$1105.43$.",
    },
    {
      id: "mixed-fin-guided-4",
      prompt: "Find $B_1$.",
      latex: "B_0=500,\\quad B_{n+1}=1.02B_n+100",
      answer: "610",
      acceptedAnswers: ["$610", "$610.00", "610.00"],
      hint: "Substitute $B_0=500$.",
      explanation: "$B_1=1.02(500)+100=610$.",
    },
  ],

  independentPractice: [
    {
      id: "mixed-fin-ind-1",
      prompt: "Find the compound amount to the nearest cent.",
      latex: "A=P(1+r)^n,\\quad P=\\$2500,\\quad r=4\\%,\\quad n=2",
      answer: "2704.00",
      acceptedAnswers: ["2704", "$2704", "$2,704", "$2704.00", "$2,704.00"],
      hint: "Use compound growth.",
      explanation: "$2500(1.04)^2=2704$.",
    },
    {
      id: "mixed-fin-ind-2",
      prompt: "Find the depreciated value.",
      latex: "V=P(1-r)^n,\\quad P=\\$12000,\\quad r=20\\%,\\quad n=2",
      answer: "7680",
      acceptedAnswers: ["$7680", "$7,680", "$7680.00", "$7,680.00"],
      hint: "Use the decay factor twice.",
      explanation: "$12000(0.8)^2=7680$.",
    },
    {
      id: "mixed-fin-ind-3",
      prompt: "Find $B_2$.",
      latex: "B_0=500,\\quad B_{n+1}=1.02B_n+100,\\quad B_1=610",
      answer: "722.20",
      acceptedAnswers: ["$722.20", "722.2"],
      hint: "Use $B_1=610$.",
      explanation: "$B_2=1.02(610)+100=722.20$.",
    },
    {
      id: "mixed-fin-ind-4",
      prompt: "Find the loan balance after one period.",
      latex: "L_0=3000,\\quad L_{n+1}=1.01L_n-200",
      answer: "2830",
      acceptedAnswers: ["$2830", "$2,830", "$2830.00", "$2,830.00"],
      hint: "Apply interest, then subtract the repayment.",
      explanation: "$L_1=1.01(3000)-200=2830$.",
    },
    {
      id: "mixed-fin-ind-5",
      prompt: "Which option is better for savings?",
      latex: "A=1081.60,\\quad B=1090.90",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "Choose the larger final value.",
      explanation: "Option B gives the larger final savings value.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using simple interest when compound interest is needed.",
      fix: "Repeated percentage growth uses a power, such as $(1+r)^n$.",
    },
    {
      mistake: "Using a growth factor for depreciation.",
      fix: "Depreciation uses $1-r$, which is less than 1.",
    },
    {
      mistake: "Misreading the recurrence.",
      fix: "Follow the recurrence exactly, including whether the amount is added or subtracted.",
    },
    {
      mistake: "Rounding too early.",
      fix: "Round final money answers to cents after completing the calculation.",
    },
  ],

  masteryQuiz: [
    {
      id: "mixed-fin-mastery-1",
      prompt: "Choose the model type.",
      latex: "\\text{A phone decreases in value by }20\\%\\text{ each year.}",
      answer: "B",
      choices: [
        { label: "A", text: "Compound growth" },
        { label: "B", text: "Depreciation" },
        { label: "C", text: "Loan comparison" },
      ],
      hint: "The value decreases.",
      explanation: "This is depreciation.",
    },
    {
      id: "mixed-fin-mastery-2",
      prompt: "Choose the model type.",
      latex: "\\$50\\text{ is deposited every month with interest.}",
      answer: "C",
      choices: [
        { label: "A", text: "One-off depreciation" },
        { label: "B", text: "One-off investment only" },
        { label: "C", text: "Future value of an annuity" },
      ],
      hint: "Repeated equal deposits indicate an annuity.",
      explanation: "This is a future value annuity context.",
    },
    {
      id: "mixed-fin-mastery-3",
      prompt: "Choose the key input that must match monthly repayments.",
      latex: "\\text{monthly loan recurrence}",
      answer: "A",
      choices: [
        { label: "A", text: "Monthly interest rate" },
        { label: "B", text: "Annual rate without adjustment" },
        { label: "C", text: "Number of school terms" },
      ],
      hint: "Match the period.",
      explanation: "Monthly repayments require a monthly rate.",
    },
    {
      id: "mixed-fin-mastery-4",
      prompt: "Find the final value.",
      latex: "A=1000(1.05)^2",
      answer: "1102.50",
      acceptedAnswers: ["$1102.50", "$1,102.50", "1102.5"],
      hint: "Use compound growth.",
      explanation: "$A=1102.50$.",
    },
    {
      id: "mixed-fin-mastery-5",
      prompt: "Find the depreciated value.",
      latex: "A=2000(0.9)^3",
      answer: "1458",
      acceptedAnswers: ["$1458", "$1,458", "$1458.00", "$1,458.00"],
      hint: "Use the decay factor three times.",
      explanation: "$2000(0.9)^3=1458$.",
    },
    {
      id: "mixed-fin-mastery-6",
      prompt: "Find the future value.",
      latex: "FV=100\\left(\\frac{(1.01)^3-1}{0.01}\\right)",
      answer: "303.01",
      acceptedAnswers: ["$303.01"],
      hint: "Use the annuity formula.",
      explanation: "$FV=303.01$.",
    },
    {
      id: "mixed-fin-mastery-7",
      prompt: "Find $B_1$.",
      latex: "B_0=800,\\quad B_{n+1}=1.03B_n+50",
      answer: "874",
      acceptedAnswers: ["$874", "$874.00", "874.00"],
      hint: "Apply interest, then add the deposit.",
      explanation: "$B_1=1.03(800)+50=874$.",
    },
    {
      id: "mixed-fin-mastery-8",
      prompt: "Find $L_1$.",
      latex: "L_0=6000,\\quad L_{n+1}=1.01L_n-400",
      answer: "5660",
      acceptedAnswers: ["$5660", "$5,660", "$5660.00", "$5,660.00"],
      hint: "Apply interest, then subtract repayment.",
      explanation: "$L_1=1.01(6000)-400=5660$.",
    },
    {
      id: "mixed-fin-mastery-9",
      prompt: "Which option is better for an investment?",
      latex: "A=2240,\\quad B=2265",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "Choose the larger final value.",
      explanation: "Option B is better because it has the larger final value.",
    },
    {
      id: "mixed-fin-mastery-10",
      prompt: "Which option is better for a loan borrower?",
      latex: "A=4200\\text{ owing},\\quad B=4050\\text{ owing}",
      answer: "B",
      choices: [
        { label: "A", text: "Option A" },
        { label: "B", text: "Option B" },
      ],
      hint: "A borrower wants to owe less.",
      explanation: "Option B is better because $4050$ is the lower remaining balance.",
    },
  ],

  masteryPassMark: 0.8,
};

// ---------------------------------------------------------------------------
// Band-6 depth: difficulty-ramped mastery pools + one HSC multi-part per lesson.
// Assigned post-hoc so the hand-authored lesson definitions above are untouched.
// All monetary answers verified against A=P(1+r)^n, A=P(1-r)^n,
// FV=M((1+r)^n-1)/r, and PV=FV/(1+r)^n.
// ---------------------------------------------------------------------------

growthFactorsCompoundInterestDepreciationLesson.masteryQuizPool = [
  // --- D1: factor identification ---
  { id: "growth-p-1", prompt: "Write the growth factor for a 5% increase.", latex: "\\text{growth factor}=1+r", answer: "1.05", difficulty: 1, acceptedAnswers: ["1.050"], hint: "Convert 5% to 0.05, then add to 1.", explanation: "$1+0.05=1.05$." },
  { id: "growth-p-2", prompt: "Write the growth factor for a 7% increase.", latex: "\\text{growth factor}=1+r", answer: "1.07", difficulty: 1, acceptedAnswers: ["1.070"], hint: "Add the decimal rate to 1.", explanation: "$1+0.07=1.07$." },
  { id: "growth-p-3", prompt: "Write the decay factor for a 15% decrease.", latex: "\\text{decay factor}=1-r", answer: "0.85", difficulty: 1, acceptedAnswers: ["0.850"], hint: "Subtract 0.15 from 1.", explanation: "$1-0.15=0.85$." },
  { id: "growth-p-4", prompt: "Write the decay factor for a 12% decrease.", latex: "\\text{decay factor}=1-r", answer: "0.88", difficulty: 1, acceptedAnswers: ["0.880"], hint: "Subtract 0.12 from 1.", explanation: "$1-0.12=0.88$." },
  { id: "growth-p-5", prompt: "Write the growth factor for a 2.5% increase.", latex: "\\text{growth factor}=1+r", answer: "1.025", difficulty: 2, hint: "Convert 2.5% to a decimal.", explanation: "$1+0.025=1.025$." },
  // --- D2: reverse a factor to a rate ---
  { id: "growth-p-6", prompt: "A value is multiplied by $1.08$ each year. What is the annual percentage increase?", latex: "1.08=1+r", answer: "8%", difficulty: 2, acceptedAnswers: ["8", "8 percent"], hint: "Find $1.08-1$.", explanation: "$1.08-1=0.08$, an 8% increase." },
  { id: "growth-p-7", prompt: "A value is multiplied by $0.91$ each year. What is the annual percentage decrease?", latex: "0.91=1-r", answer: "9%", difficulty: 2, acceptedAnswers: ["9", "9 percent"], hint: "Find $1-0.91$.", explanation: "$1-0.91=0.09$, a 9% decrease." },
  { id: "growth-p-8", prompt: "A savings balance uses $A=P(1.025)^n$. What rate is applied each period?", latex: "1.025=1+r", answer: "2.5%", difficulty: 2, acceptedAnswers: ["2.5", "2.5%", "2.5 percent"], hint: "Subtract 1 from the growth factor.", explanation: "$1.025-1=0.025$, so 2.5%." },
  // --- D2-D3: model selection (MCQ) ---
  { id: "growth-p-9", prompt: "Choose the compound interest model for $4000 at 6% p.a. for 3 years.", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$4000(0.06)^3$" }, { label: "B", text: "$4000(1.06)^3$" }, { label: "C", text: "$4000(1.6)^3$" }, { label: "D", text: "$4000(0.94)^3$" }], hint: "Compound growth uses $1+r$.", explanation: "$A=4000(1.06)^3$." },
  { id: "growth-p-10", prompt: "Choose the depreciation model for $18000 depreciating 12% per year for 4 years.", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$18000(0.88)^4$" }, { label: "B", text: "$18000(1.12)^4$" }, { label: "C", text: "$18000(0.12)^4$" }, { label: "D", text: "$18000(0.88)(4)$" }], hint: "Decay factor is $1-0.12$.", explanation: "$A=18000(0.88)^4$." },
  { id: "growth-p-11", prompt: "Which situation is depreciation?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "An account grows by 4% per year" }, { label: "B", text: "A salary rises by 3% per year" }, { label: "C", text: "A phone loses 15% of its value each year" }, { label: "D", text: "A deposit doubles every decade" }], hint: "Depreciation means value decreases.", explanation: "A phone losing value each year is depreciation." },
  // --- D3: one-step compound / depreciation with clean answers ---
  { id: "growth-p-12", prompt: "Find the amount after 2 years. Use $1.06^2=1.1236$. Round to the nearest cent.", latex: "A=1000(1.06)^2", answer: "1123.60", difficulty: 3, acceptedAnswers: ["$1123.60", "$1,123.60", "1123.6"], hint: "Multiply 1000 by the given power.", explanation: "$1000\\times1.1236=1123.60$." },
  { id: "growth-p-13", prompt: "Find the amount after 2 years. Use $1.04^2=1.0816$. Round to the nearest cent.", latex: "A=2500(1.04)^2", answer: "2704", difficulty: 3, acceptedAnswers: ["2704.00", "$2704", "$2,704", "$2704.00"], hint: "Multiply 2500 by the given power.", explanation: "$2500\\times1.0816=2704$." },
  { id: "growth-p-14", prompt: "A car worth \\(\\$20000\\) depreciates 25% per year. Find its value after 2 years. Use $0.75^2=0.5625$.", latex: "A=20000(0.75)^2", answer: "11250", difficulty: 3, acceptedAnswers: ["11250.00", "$11250", "$11,250", "$11250.00"], hint: "Multiply 20000 by the given power.", explanation: "$20000\\times0.5625=11250$." },
  { id: "growth-p-15", prompt: "Equipment worth \\(\\$12000\\) depreciates 20% per year. Find its value after 3 years. Use $0.8^3=0.512$.", latex: "A=12000(0.8)^3", answer: "6144", difficulty: 3, acceptedAnswers: ["6144.00", "$6144", "$6,144", "$6144.00"], hint: "Multiply 12000 by the given power.", explanation: "$12000\\times0.512=6144$." },
  // --- D3-D4: compound to the nearest cent (rounding judgement) ---
  { id: "growth-p-16", prompt: "Find the amount to the nearest cent. Use $1.04^3=1.124864$.", latex: "A=2000(1.04)^3", answer: "2249.73", difficulty: 4, acceptedAnswers: ["$2249.73", "$2,249.73", "2,249.73"], hint: "Multiply, then round to cents.", explanation: "$2000\\times1.124864=2249.728$, so $\\$2249.73$." },
  { id: "growth-p-17", prompt: "Find the amount to the nearest cent. Use $1.03^5=1.159274$.", latex: "A=750(1.03)^5", answer: "869.46", difficulty: 4, acceptedAnswers: ["$869.46", "869.46"], hint: "Do not round until the end.", explanation: "$750\\times1.159274=869.4555\\ldots$, so $\\$869.46$." },
  { id: "growth-p-18", prompt: "Find the amount to the nearest cent. Use $1.025^4=1.103813$.", latex: "A=3000(1.025)^4", answer: "3311.44", difficulty: 4, acceptedAnswers: ["$3311.44", "$3,311.44", "3,311.44"], hint: "Round the final money value to cents.", explanation: "$3000\\times1.103813=3311.439$, so $\\$3311.44$." },
  { id: "growth-p-19", prompt: "Find the value to the nearest cent. Use $0.88^4=0.599695$.", latex: "A=18000(0.88)^4", answer: "10794.52", difficulty: 4, acceptedAnswers: ["$10794.52", "$10,794.52", "10,794.52"], hint: "Depreciation: multiply by the decay power.", explanation: "$18000\\times0.599695=10794.516$, so $\\$10794.52$." },
  { id: "growth-p-20", prompt: "Find the value to the nearest cent. Use $0.85^3=0.614125$.", latex: "A=1800(0.85)^3", answer: "1105.43", difficulty: 4, acceptedAnswers: ["$1105.43", "$1,105.43"], hint: "Use the decay power, then round.", explanation: "$1800\\times0.614125=1105.425$, so $\\$1105.43$." },
  // --- D4: interpret a model ---
  { id: "growth-p-21", prompt: "A balance uses $A=P(1.045)^n$. What rate is applied each period?", latex: "1.045=1+r", answer: "4.5%", difficulty: 3, acceptedAnswers: ["4.5", "4.5%", "4.5 percent"], hint: "Subtract 1 from 1.045.", explanation: "$1.045-1=0.045$, so 4.5%." },
  { id: "growth-p-22", prompt: "Choose the model for $5000 losing 8% of its value each year for 5 years.", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$5000(1.08)^5$" }, { label: "B", text: "$5000(0.08)^5$" }, { label: "C", text: "$5000(0.8)^5$" }, { label: "D", text: "$5000(0.92)^5$" }], hint: "An 8% loss keeps 92%.", explanation: "Decay factor $0.92$: $5000(0.92)^5$." },
  // --- D5: Band-6 multi-step ---
  { id: "growth-p-23", prompt: "An investment of $3000 grows at 5% p.a. and a separate $2000 grows at 4% p.a., both for 4 years. Find the total value to the nearest cent. Use $1.05^4=1.215506$ and $1.04^4=1.169859$.", latex: "3000(1.05)^4+2000(1.04)^4", answer: "5986.24", difficulty: 5, acceptedAnswers: ["$5986.24", "$5,986.24", "5,986.24"], hint: "Grow each amount separately, then add.", explanation: "$3000\\times1.215506=3646.52$ and $2000\\times1.169859=2339.72$; total $=5986.24$." },
  { id: "growth-p-24", prompt: "\\(\\$2000\\) is invested at 5% p.a. compounded annually. Using $1.05^{14}=1.97993$ and $1.05^{15}=2.07893$, find the least whole number of years for the investment to at least double.", latex: "2000(1.05)^n\\ge 4000", answer: "15", difficulty: 5, acceptedAnswers: ["15 years", "n=15"], hint: "Doubling needs $1.05^n\\ge 2$; compare the two given powers.", explanation: "$1.05^{14}=1.980<2$ but $1.05^{15}=2.079\\ge 2$, so 15 years." },
  { id: "growth-p-25", prompt: "Money grows at 7% p.a. Using $1.07^{10}=1.96715$ and $1.07^{11}=2.10485$, find the least whole number of years for any amount to at least double.", latex: "(1.07)^n\\ge 2", answer: "11", difficulty: 5, acceptedAnswers: ["11 years", "n=11"], hint: "Find the first $n$ with $1.07^n\\ge 2$.", explanation: "$1.07^{10}=1.967<2$ but $1.07^{11}=2.105\\ge 2$, so 11 years." },
  { id: "growth-p-26", prompt: "A machine worth \\(\\$8000\\) depreciates 10% per year. Using $0.9^3=0.729$, find how much value it has lost after 3 years, to the nearest dollar.", latex: "8000-8000(0.9)^3", answer: "2168", difficulty: 5, acceptedAnswers: ["$2168", "$2,168", "2168.00"], hint: "Loss = original value minus depreciated value.", explanation: "Value after 3 years $=8000\\times0.729=5832$. Loss $=8000-5832=2168$." },
  { id: "growth-p-27", prompt: "\\(\\$4000\\) grows at 6% p.a. for 3 years. Using $1.06^3=1.191016$, find the interest earned to the nearest cent.", latex: "4000(1.06)^3-4000", answer: "764.06", difficulty: 5, acceptedAnswers: ["$764.06", "$764.06"], hint: "Interest = final amount minus the principal.", explanation: "Final $=4000\\times1.191016=4764.064$. Interest $=4764.06-4000=764.06$." },
  { id: "growth-p-28", prompt: "A \\(\\$15000\\) asset depreciates 15% per year. Using $0.85^2=0.7225$ and $0.85^3=0.614125$, find the loss in value during the third year alone, to the nearest cent.", latex: "15000(0.85)^2-15000(0.85)^3", answer: "1625.63", difficulty: 5, acceptedAnswers: ["$1625.63", "$1,625.63", "1625.625"], hint: "Subtract the year-3 value from the year-2 value.", explanation: "Year 2 value $=15000\\times0.7225=10837.50$; year 3 value $=15000\\times0.614125=9211.875$. Loss in year 3 $=10837.50-9211.875=1625.625$, so $\\$1625.63$." },
];

growthFactorsCompoundInterestDepreciationLesson.multiPartPractice = [
  {
    id: "growth-mp-1",
    prompt: "Sara invests \\(\\$5000\\) in an account paying 6% p.a. compounded annually. Use $1.06^3=1.191016$ and $1.06^5=1.338226$.",
    latex: "A=P(1+r)^n,\\quad P=5000,\\ r=0.06",
    answer: "5955.08",
    hint: "Use $A=P(1.06)^n$ for each part, then compare to the principal.",
    explanation:
      "(a) $5000\\times1.191016=5955.08$. (b) interest $=5955.08-5000=955.08$. (c) $5000\\times1.338226=6691.13$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the balance after 3 years, to the nearest cent.", latex: "5000(1.06)^3", marks: 2, answer: "5955.08", acceptedAnswers: ["$5955.08", "$5,955.08"], hint: "Multiply 5000 by $1.06^3$.", explanation: "$5000\\times1.191016=5955.08$." },
      { key: "b", label: "(b)", prompt: "Hence find the interest earned in the first 3 years, to the nearest cent.", latex: "5955.08-5000", marks: 2, answer: "955.08", acceptedAnswers: ["$955.08"], hint: "Subtract the principal from part (a).", explanation: "$5955.08-5000=955.08$." },
      { key: "c", label: "(c)", prompt: "Find the balance after 5 years, to the nearest cent.", latex: "5000(1.06)^5", marks: 2, answer: "6691.13", acceptedAnswers: ["$6691.13", "$6,691.13"], hint: "Multiply 5000 by $1.06^5$.", explanation: "$5000\\times1.338226=6691.13$." },
    ],
  },
];

recurrenceRelationsFinancialContextsLesson.masteryQuizPool = [
  // --- D1: read off initial value / interpret ---
  { id: "recur-p-1", prompt: "Identify the initial value.", latex: "B_0=800,\\quad B_{n+1}=1.02B_n+40", answer: "800", difficulty: 1, acceptedAnswers: ["$800", "800.00"], hint: "The initial value has subscript 0.", explanation: "$B_0=800$." },
  { id: "recur-p-2", prompt: "Identify the initial value.", latex: "L_0=9000,\\quad L_{n+1}=1.02L_n-500", answer: "9000", difficulty: 1, acceptedAnswers: ["$9000", "$9,000", "9000.00"], hint: "Look for the term with subscript 0.", explanation: "$L_0=9000$." },
  { id: "recur-p-3", prompt: "In $L_{n+1}=1.01L_n-300$, is the $300$ a deposit or a repayment?", latex: "L_{n+1}=1.01L_n-300", answer: "repayment", difficulty: 1, acceptedAnswers: ["a repayment", "repay", "repayment"], hint: "It is subtracted.", explanation: "The amount is subtracted, so it is a repayment." },
  { id: "recur-p-4", prompt: "In $B_{n+1}=1.05B_n+50$, is the $50$ a deposit or a repayment?", latex: "B_{n+1}=1.05B_n+50", answer: "deposit", difficulty: 1, acceptedAnswers: ["a deposit", "deposit"], hint: "It is added.", explanation: "The amount is added, so it is a deposit." },
  // --- D2: meaning of the multiplier ---
  { id: "recur-p-5", prompt: "What percentage increase does the multiplier represent?", latex: "B_{n+1}=1.06B_n+100", answer: "6%", difficulty: 2, acceptedAnswers: ["6", "6%", "6 percent"], hint: "$1.06=1+r$.", explanation: "$1.06-1=0.06$, a 6% increase." },
  { id: "recur-p-6", prompt: "What percentage increase does the multiplier represent?", latex: "B_{n+1}=1.025B_n+75", answer: "2.5%", difficulty: 2, acceptedAnswers: ["2.5", "2.5%", "2.5 percent"], hint: "Subtract 1 from 1.025.", explanation: "$1.025-1=0.025$, a 2.5% increase." },
  { id: "recur-p-7", prompt: "A car value follows $V_{n+1}=0.85V_n$. What percentage depreciation is applied each period?", latex: "V_{n+1}=0.85V_n", answer: "15%", difficulty: 2, acceptedAnswers: ["15", "15%", "15 percent"], hint: "Find $1-0.85$.", explanation: "$1-0.85=0.15$, a 15% depreciation." },
  // --- D2-D3: build a recurrence (MCQ) ---
  { id: "recur-p-8", prompt: "Choose the recurrence for a balance earning 5% interest then a $50 deposit.", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$B_{n+1}=1.05B_n+50$" }, { label: "B", text: "$B_{n+1}=0.95B_n+50$" }, { label: "C", text: "$B_{n+1}=1.05B_n-50$" }, { label: "D", text: "$B_{n+1}=1.5B_n+50$" }], hint: "Interest grows, deposit adds.", explanation: "$B_{n+1}=1.05B_n+50$." },
  { id: "recur-p-9", prompt: "Choose the recurrence for a loan growing 0.5% interest each month then a $600 repayment.", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$L_{n+1}=0.995L_n+600$" }, { label: "B", text: "$L_{n+1}=1.005L_n+600$" }, { label: "C", text: "$L_{n+1}=1.005L_n-600$" }, { label: "D", text: "$L_{n+1}=1.05L_n-600$" }], hint: "Interest adds, repayment subtracts.", explanation: "$L_{n+1}=1.005L_n-600$." },
  { id: "recur-p-10", prompt: "A machine loses 10% of its value each year. Choose the recurrence for its value.", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$V_{n+1}=0.9V_n$" }, { label: "B", text: "$V_{n+1}=1.1V_n$" }, { label: "C", text: "$V_{n+1}=10V_n$" }, { label: "D", text: "$V_{n+1}=0.1V_n$" }], hint: "A 10% loss keeps 90%.", explanation: "$V_{n+1}=0.9V_n$." },
  // --- D3: one step of a recurrence (clean) ---
  { id: "recur-p-11", prompt: "Find $B_1$.", latex: "B_0=500,\\quad B_{n+1}=1.04B_n+20", answer: "540", difficulty: 3, acceptedAnswers: ["540.00", "$540", "$540.00"], hint: "Multiply by 1.04, then add 20.", explanation: "$1.04(500)+20=540$." },
  { id: "recur-p-12", prompt: "Find $B_1$.", latex: "B_0=1200,\\quad B_{n+1}=1.05B_n+80", answer: "1340", difficulty: 3, acceptedAnswers: ["1340.00", "$1340", "$1,340", "$1,340.00"], hint: "Multiply by 1.05, then add 80.", explanation: "$1.05(1200)+80=1340$." },
  { id: "recur-p-13", prompt: "Find $L_1$.", latex: "L_0=9000,\\quad L_{n+1}=1.02L_n-500", answer: "8680", difficulty: 3, acceptedAnswers: ["8680.00", "$8680", "$8,680", "$8,680.00"], hint: "Apply interest, then subtract 500.", explanation: "$1.02(9000)-500=8680$." },
  { id: "recur-p-14", prompt: "Find $B_1$.", latex: "B_0=800,\\quad B_{n+1}=1.02B_n+40", answer: "856", difficulty: 3, acceptedAnswers: ["856.00", "$856", "$856.00"], hint: "Multiply by 1.02, then add 40.", explanation: "$1.02(800)+40=856$." },
  { id: "recur-p-15", prompt: "A balance starts at \\(\\$2500\\) and follows $S_{n+1}=1.03S_n+150$. Find $S_1$.", latex: "S_0=2500,\\quad S_{n+1}=1.03S_n+150", answer: "2725", difficulty: 3, acceptedAnswers: ["2725.00", "$2725", "$2,725", "$2,725.00"], hint: "Use the starting balance.", explanation: "$1.03(2500)+150=2725$." },
  // --- D4: second step (chain from a given term) ---
  { id: "recur-p-16", prompt: "Given $B_1=1130$, find $B_2$.", latex: "B_{n+1}=1.03B_n+100", answer: "1263.90", difficulty: 4, acceptedAnswers: ["1263.9", "$1263.90", "$1,263.90"], hint: "Use $B_1$ as the current balance.", explanation: "$1.03(1130)+100=1263.90$." },
  { id: "recur-p-17", prompt: "Given $B_1=856$, find $B_2$.", latex: "B_{n+1}=1.02B_n+40", answer: "913.12", difficulty: 4, acceptedAnswers: ["$913.12"], hint: "Substitute $B_1=856$.", explanation: "$1.02(856)+40=913.12$." },
  { id: "recur-p-18", prompt: "Given $L_1=4800$, find $L_2$.", latex: "L_{n+1}=1.01L_n-250", answer: "4598", difficulty: 4, acceptedAnswers: ["4598.00", "$4598", "$4,598", "$4,598.00"], hint: "Substitute $L_1=4800$.", explanation: "$1.01(4800)-250=4598$." },
  { id: "recur-p-19", prompt: "Given $S_1=2725$, find $S_2$ to the nearest cent.", latex: "S_{n+1}=1.03S_n+150", answer: "2956.75", difficulty: 4, acceptedAnswers: ["$2956.75", "$2,956.75"], hint: "Substitute $S_1=2725$.", explanation: "$1.03(2725)+150=2956.75$." },
  { id: "recur-p-20", prompt: "Interpret the recurrence.", latex: "L_{n+1}=1.005L_n-600", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The loan falls 0.5%, then $600 is added" }, { label: "B", text: "The loan grows 0.5%, then a $600 repayment is made" }, { label: "C", text: "The loan grows 5%, then a $600 repayment is made" }, { label: "D", text: "The loan grows 0.5% only" }], hint: "$1.005$ is a small rise; $-600$ subtracts.", explanation: "Grows 0.5%, then $600 repaid." },
  // --- D5: Band-6 two-step + interpret ---
  { id: "recur-p-21", prompt: "A savings plan follows $B_{n+1}=1.04B_n+200$ with $B_0=2000$. Find $B_2$ to the nearest cent.", latex: "B_0=2000,\\quad B_{n+1}=1.04B_n+200", answer: "2571.20", difficulty: 5, acceptedAnswers: ["2571.2", "$2571.20", "$2,571.20"], hint: "Find $B_1$ first, then use it to find $B_2$.", explanation: "$B_1=1.04(2000)+200=2280$; $B_2=1.04(2280)+200=2571.20$." },
  { id: "recur-p-22", prompt: "A loan follows $L_{n+1}=1.005L_n-750$ with $L_0=10000$. Find $L_2$ to the nearest cent.", latex: "L_0=10000,\\quad L_{n+1}=1.005L_n-750", answer: "8596.50", difficulty: 5, acceptedAnswers: ["8596.5", "$8596.50", "$8,596.50"], hint: "Compute $L_1$, then $L_2$.", explanation: "$L_1=1.005(10000)-750=9300$; $L_2=1.005(9300)-750=8596.50$." },
  { id: "recur-p-23", prompt: "A plan follows $B_{n+1}=1.025B_n+300$ with $B_0=5000$. Find $B_2$ to the nearest cent.", latex: "B_0=5000,\\quad B_{n+1}=1.025B_n+300", answer: "5860.63", difficulty: 5, acceptedAnswers: ["$5860.63", "$5,860.63", "5860.625"], hint: "Two updates from $B_0$.", explanation: "$B_1=1.025(5000)+300=5425$; $B_2=1.025(5425)+300=5860.625$, so $\\$5860.63$." },
  { id: "recur-p-24", prompt: "A loan follows $L_{n+1}=1.012L_n-500$ with $L_0=8000$. Find $L_2$ to the nearest cent.", latex: "L_0=8000,\\quad L_{n+1}=1.012L_n-500", answer: "7187.15", difficulty: 5, acceptedAnswers: ["$7187.15", "$7,187.15"], hint: "Compute $L_1$, then $L_2$.", explanation: "$L_1=1.012(8000)-500=7596$; $L_2=1.012(7596)-500=7187.152$, so $\\$7187.15$." },
  { id: "recur-p-25", prompt: "A loan follows $L_{n+1}=1.005L_n-750$ with $L_0=10000$. By how much did the balance fall over the first two months? Use $L_2=8596.50$.", latex: "10000-L_2", answer: "1403.50", difficulty: 5, acceptedAnswers: ["1403.5", "$1403.50", "$1,403.50"], hint: "Subtract $L_2$ from $L_0$.", explanation: "$10000-8596.50=1403.50$." },
  { id: "recur-p-26", prompt: "A savings plan follows $B_{n+1}=1.04B_n+200$ with $B_0=2000$. How much interest was earned over the first two months? Use $B_2=2571.20$ and total deposits of $400$.", latex: "B_2-2000-400", answer: "171.20", difficulty: 5, acceptedAnswers: ["171.2", "$171.20"], hint: "Interest = end balance − start − deposits made.", explanation: "$2571.20-2000-400=171.20$." },
  { id: "recur-p-27", prompt: "Find $B_1$.", latex: "B_0=1500,\\quad B_{n+1}=1.02B_n+100", answer: "1630", difficulty: 3, acceptedAnswers: ["1630.00", "$1630", "$1,630", "$1,630.00"], hint: "Multiply by 1.02, then add 100.", explanation: "$1.02(1500)+100=1630$." },
  { id: "recur-p-28", prompt: "Choose the recurrence for a balance that earns 3% interest then has a $120 deposit added.", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$B_{n+1}=1.03B_n+120$" }, { label: "B", text: "$B_{n+1}=0.97B_n+120$" }, { label: "C", text: "$B_{n+1}=1.03B_n-120$" }, { label: "D", text: "$B_{n+1}=1.3B_n+120$" }], hint: "Interest grows, deposit adds.", explanation: "$B_{n+1}=1.03B_n+120$." },
  { id: "recur-p-29", prompt: "A plan follows $B_{n+1}=1.03B_n+150$ with $B_0=4000$. Find $B_2$ to the nearest cent.", latex: "B_0=4000,\\quad B_{n+1}=1.03B_n+150", answer: "4548.10", difficulty: 5, acceptedAnswers: ["4548.1", "$4548.10", "$4,548.10"], hint: "Compute $B_1$, then $B_2$.", explanation: "$B_1=1.03(4000)+150=4270$; $B_2=1.03(4270)+150=4548.10$." },
];

recurrenceRelationsFinancialContextsLesson.multiPartPractice = [
  {
    id: "recur-mp-1",
    prompt: "A loan of \\(\\$10000\\) is modelled by $L_{n+1}=1.01L_n-600$, where $L_n$ is the balance after $n$ months.",
    latex: "L_0=10000,\\quad L_{n+1}=1.01L_n-600",
    answer: "9500",
    hint: "Apply 1% interest then subtract $600 at each step, using the previous balance.",
    explanation:
      "(a) $L_1=1.01(10000)-600=9500$. (b) $L_2=1.01(9500)-600=8995$. (c) fall $=10000-8995=1005$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the balance after 1 month.", latex: "1.01(10000)-600", marks: 2, answer: "9500", acceptedAnswers: ["9500.00", "$9500", "$9,500", "$9,500.00"], hint: "Use $L_0=10000$.", explanation: "$1.01(10000)-600=9500$." },
      { key: "b", label: "(b)", prompt: "Find the balance after 2 months.", latex: "1.01(9500)-600", marks: 2, answer: "8995", acceptedAnswers: ["8995.00", "$8995", "$8,995", "$8,995.00"], hint: "Use the answer to (a) as the current balance.", explanation: "$1.01(9500)-600=8995$." },
      { key: "c", label: "(c)", prompt: "Find the total reduction in the loan balance over these 2 months.", latex: "10000-8995", marks: 2, answer: "1005", acceptedAnswers: ["1005.00", "$1005", "$1,005", "$1,005.00"], hint: "Subtract the balance after 2 months from the original loan.", explanation: "$10000-8995=1005$." },
    ],
  },
];

futureValueAnnuitiesLesson.masteryQuizPool = [
  // --- D1: identify M, n, and rate ---
  { id: "annuity-p-1", prompt: "Identify the regular deposit.", latex: "\\$150\\text{ is deposited each month for 12 months.}", answer: "150", difficulty: 1, acceptedAnswers: ["$150", "$150.00", "150.00"], hint: "It is the repeated payment.", explanation: "The regular deposit is $\\$150$." },
  { id: "annuity-p-2", prompt: "How many monthly deposits are made over 2 years?", latex: "n=\\ ?", answer: "24", difficulty: 1, hint: "12 deposits per year.", explanation: "$2\\times12=24$." },
  { id: "annuity-p-3", prompt: "How many monthly deposits are made over 3 years?", latex: "n=\\ ?", answer: "36", difficulty: 1, hint: "Multiply years by 12.", explanation: "$3\\times12=36$." },
  { id: "annuity-p-4", prompt: "How many quarterly deposits are made over 3 years?", latex: "n=\\ ?", answer: "12", difficulty: 2, hint: "4 quarters per year.", explanation: "$3\\times4=12$." },
  { id: "annuity-p-5", prompt: "How many monthly deposits are made over 2.5 years?", latex: "n=\\ ?", answer: "30", difficulty: 2, hint: "Convert years to months.", explanation: "$2.5\\times12=30$." },
  // --- D2: convert annual rate to per-period decimal ---
  { id: "annuity-p-6", prompt: "Convert 6% p.a. compounded monthly to a monthly decimal rate.", latex: "r=\\ ?", answer: "0.005", difficulty: 2, acceptedAnswers: ["0.0050"], hint: "Divide 0.06 by 12.", explanation: "$0.06\\div12=0.005$." },
  { id: "annuity-p-7", prompt: "Convert 12% p.a. compounded monthly to a monthly decimal rate.", latex: "r=\\ ?", answer: "0.01", difficulty: 2, acceptedAnswers: ["0.010"], hint: "Divide 0.12 by 12.", explanation: "$0.12\\div12=0.01$." },
  { id: "annuity-p-8", prompt: "Write a monthly rate of 0.25% as a decimal.", latex: "0.25\\%", answer: "0.0025", difficulty: 2, hint: "Divide by 100.", explanation: "$0.25\\%=0.0025$." },
  // --- D2-D3: choose the right formula (MCQ) ---
  { id: "annuity-p-9", prompt: "Which model is for repeated equal deposits?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$A=P(1+r)^n$" }, { label: "B", text: "$A=P(1-r)^n$" }, { label: "C", text: "$FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)$" }, { label: "D", text: "$PV=\\frac{FV}{(1+r)^n}$" }], hint: "Look for the annuity formula.", explanation: "The annuity formula models regular deposits." },
  { id: "annuity-p-10", prompt: "A student deposits $60 at the end of each month for 2 years. Which inputs are correct?", latex: "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$M=24,\\ n=60$" }, { label: "B", text: "$M=60,\\ n=24$" }, { label: "C", text: "$M=2,\\ n=60$" }, { label: "D", text: "$M=60,\\ n=2$" }], hint: "$M$ is the deposit; $n$ counts deposits.", explanation: "$M=60$, $n=2\\times12=24$." },
  // --- D3: one-step FV with given bracket value ---
  { id: "annuity-p-11", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.01)^3-1}{0.01}=3.0301$.", latex: "FV=100\\left(\\frac{(1.01)^3-1}{0.01}\\right)", answer: "303.01", difficulty: 3, acceptedAnswers: ["$303.01"], hint: "Multiply 100 by the given bracket.", explanation: "$100\\times3.0301=303.01$." },
  { id: "annuity-p-12", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.02)^5-1}{0.02}=5.20404$.", latex: "FV=50\\left(\\frac{(1.02)^5-1}{0.02}\\right)", answer: "260.20", difficulty: 3, acceptedAnswers: ["$260.20", "260.2"], hint: "Multiply 50 by the bracket.", explanation: "$50\\times5.20404=260.20$." },
  { id: "annuity-p-13", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.05)^4-1}{0.05}=4.310125$.", latex: "FV=200\\left(\\frac{(1.05)^4-1}{0.05}\\right)", answer: "862.03", difficulty: 3, acceptedAnswers: ["$862.03"], hint: "Multiply 200 by the bracket.", explanation: "$200\\times4.310125=862.025$, so $\\$862.03$." },
  // --- D4: FV to the nearest cent (rounding judgement) ---
  { id: "annuity-p-14", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.01)^4-1}{0.01}=4.060401$.", latex: "FV=100\\left(\\frac{(1.01)^4-1}{0.01}\\right)", answer: "406.04", difficulty: 4, acceptedAnswers: ["$406.04"], hint: "Multiply and round.", explanation: "$100\\times4.060401=406.04$." },
  { id: "annuity-p-15", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.02)^3-1}{0.02}=3.0604$.", latex: "FV=250\\left(\\frac{(1.02)^3-1}{0.02}\\right)", answer: "765.10", difficulty: 4, acceptedAnswers: ["$765.10", "765.1"], hint: "Multiply 250 by the bracket.", explanation: "$250\\times3.0604=765.10$." },
  { id: "annuity-p-16", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.005)^6-1}{0.005}=6.075502$.", latex: "FV=80\\left(\\frac{(1.005)^6-1}{0.005}\\right)", answer: "486.04", difficulty: 4, acceptedAnswers: ["$486.04"], hint: "Multiply 80 by the bracket.", explanation: "$80\\times6.075502=486.04$." },
  { id: "annuity-p-17", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.005)^8-1}{0.005}=8.141409$.", latex: "FV=120\\left(\\frac{(1.005)^8-1}{0.005}\\right)", answer: "976.97", difficulty: 4, acceptedAnswers: ["$976.97"], hint: "Multiply 120 by the bracket.", explanation: "$120\\times8.141409=976.969$, so $\\$976.97$." },
  // --- D4: interpret which n / rate to use ---
  { id: "annuity-p-18", prompt: "A monthly deposit plan runs for 5 years. Which value of $n$ is correct?", latex: "n=\\ ?", answer: "60", difficulty: 3, hint: "5 years of monthly deposits.", explanation: "$5\\times12=60$." },
  { id: "annuity-p-19", prompt: "Deposits are monthly and the annual rate is 9% compounded monthly. Which monthly decimal rate is used?", latex: "r=\\ ?", answer: "0.0075", difficulty: 3, hint: "Divide 0.09 by 12.", explanation: "$0.09\\div12=0.0075$." },
  // --- D5: Band-6 multi-step ---
  { id: "annuity-p-20", prompt: "A saver deposits \\(\\$500\\) at the end of each year for 5 years at 6% p.a. Use $\\frac{(1.06)^5-1}{0.06}=5.637093$. Find the interest earned, to the nearest cent.", latex: "500\\left(\\frac{(1.06)^5-1}{0.06}\\right)-2500", answer: "318.55", difficulty: 5, acceptedAnswers: ["$318.55"], hint: "Future value minus the total deposited ($500\\times5$).", explanation: "$FV=500\\times5.637093=2818.55$; deposits $=2500$; interest $=318.55$." },
  { id: "annuity-p-21", prompt: "A saver deposits \\(\\$300\\) at the end of each year for 10 years at 4% p.a. Use $\\frac{(1.04)^{10}-1}{0.04}=12.006107$. Find the interest earned, to the nearest cent.", latex: "300\\left(\\frac{(1.04)^{10}-1}{0.04}\\right)-3000", answer: "601.83", difficulty: 5, acceptedAnswers: ["$601.83"], hint: "Future value minus $300\\times10$.", explanation: "$FV=300\\times12.006107=3601.83$; deposits $=3000$; interest $=601.83$." },
  { id: "annuity-p-22", prompt: "A saver deposits \\(\\$150\\) at the end of each month for 1 year at 0.5% per month. Use $\\frac{(1.005)^{12}-1}{0.005}=12.335562$. Find the interest earned, to the nearest cent.", latex: "150\\left(\\frac{(1.005)^{12}-1}{0.005}\\right)-1800", answer: "50.33", difficulty: 5, acceptedAnswers: ["$50.33"], hint: "Future value minus $150\\times12$.", explanation: "$FV=150\\times12.335562=1850.33$; deposits $=1800$; interest $=50.33$." },
  { id: "annuity-p-23", prompt: "A student deposits $75 each month for 10 months and the future value is $760.20. Find the interest earned, to the nearest cent.", latex: "760.20-10\\times75", answer: "10.20", difficulty: 5, acceptedAnswers: ["$10.20", "10.2"], hint: "Compare the future value with the total deposited.", explanation: "Deposited $=750$; interest $=760.20-750=10.20$." },
  { id: "annuity-p-24", prompt: "A saver deposits \\(\\$1000\\) at the end of each year for 3 years at 5% p.a. Use $\\frac{(1.05)^3-1}{0.05}=3.1525$. Find the future value, to the nearest cent.", latex: "FV=1000\\left(\\frac{(1.05)^3-1}{0.05}\\right)", answer: "3152.50", difficulty: 5, acceptedAnswers: ["$3152.50", "$3,152.50", "3152.5"], hint: "Multiply 1000 by the bracket.", explanation: "$1000\\times3.1525=3152.50$." },
  { id: "annuity-p-25", prompt: "A saver deposits \\(\\$2000\\) at the end of each year for 4 years at 3% p.a. Use $\\frac{(1.03)^4-1}{0.03}=4.183627$. Find the future value, to the nearest cent.", latex: "FV=2000\\left(\\frac{(1.03)^4-1}{0.03}\\right)", answer: "8367.25", difficulty: 5, acceptedAnswers: ["$8367.25", "$8,367.25"], hint: "Multiply 2000 by the bracket.", explanation: "$2000\\times4.183627=8367.254$, so $\\$8367.25$." },
  // --- extra D3 to balance the pool ---
  { id: "annuity-p-26", prompt: "How many quarterly deposits are made over 5 years?", latex: "n=\\ ?", answer: "20", difficulty: 3, hint: "4 quarters per year.", explanation: "$5\\times4=20$." },
  { id: "annuity-p-27", prompt: "How many monthly deposits are made over 4 years?", latex: "n=\\ ?", answer: "48", difficulty: 1, hint: "Multiply years by 12.", explanation: "$4\\times12=48$." },
  { id: "annuity-p-28", prompt: "Find the future value to the nearest cent. Use $\\frac{(1.01)^6-1}{0.01}=6.152015$.", latex: "FV=400\\left(\\frac{(1.01)^6-1}{0.01}\\right)", answer: "2460.81", difficulty: 4, acceptedAnswers: ["$2460.81", "$2,460.81"], hint: "Multiply 400 by the bracket.", explanation: "$400\\times6.152015=2460.806$, so $\\$2460.81$." },
  { id: "annuity-p-29", prompt: "A saver deposits \\(\\$1000\\) at the end of each year for 4 years at 2% p.a. Use $\\frac{(1.02)^4-1}{0.02}=4.121608$. Find the interest earned, to the nearest cent.", latex: "1000\\left(\\frac{(1.02)^4-1}{0.02}\\right)-4000", answer: "121.61", difficulty: 5, acceptedAnswers: ["$121.61"], hint: "Future value minus $1000\\times4$.", explanation: "$FV=1000\\times4.121608=4121.61$; deposits $=4000$; interest $=121.61$." },
];

futureValueAnnuitiesLesson.multiPartPractice = [
  {
    id: "annuity-mp-1",
    prompt: "Mia deposits \\(\\$200\\) at the end of each year into an account paying 5% p.a. compounded annually, for 4 years. Use $\\frac{(1.05)^4-1}{0.05}=4.310125$.",
    latex: "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)",
    answer: "862.03",
    hint: "Apply the annuity formula, then compare the future value with the total deposited.",
    explanation:
      "(a) total deposited $=200\\times4=800$. (b) $FV=200\\times4.310125=862.03$. (c) interest $=862.03-800=62.03$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the total amount deposited over the 4 years.", latex: "200\\times4", marks: 1, answer: "800", acceptedAnswers: ["800.00", "$800", "$800.00"], hint: "Four deposits of $200.", explanation: "$200\\times4=800$." },
      { key: "b", label: "(b)", prompt: "Find the future value of the annuity, to the nearest cent.", latex: "200\\left(\\frac{(1.05)^4-1}{0.05}\\right)", marks: 2, answer: "862.03", acceptedAnswers: ["$862.03"], hint: "Multiply 200 by the given bracket value.", explanation: "$200\\times4.310125=862.025$, so $\\$862.03$." },
      { key: "c", label: "(c)", prompt: "Hence find the total interest earned, to the nearest cent.", latex: "862.03-800", marks: 2, answer: "62.03", acceptedAnswers: ["$62.03"], hint: "Subtract the total deposited from the future value.", explanation: "$862.03-800=62.03$." },
    ],
  },
];

presentValueLoanRepaymentsLesson.masteryQuizPool = [
  // --- D1: concept identification ---
  { id: "loan-p-1", prompt: "What does present value mean?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "The value now of a future amount" }, { label: "B", text: "The total after all future interest" }, { label: "C", text: "The number of repayments" }, { label: "D", text: "The interest rate per period" }], hint: "Present value is a current value.", explanation: "It is the value now of a future amount." },
  { id: "loan-p-2", prompt: "In $L_{n+1}=1.02L_n-400$, what does the $-400$ represent?", latex: "L_{n+1}=1.02L_n-400", answer: "B", difficulty: 1, choices: [{ label: "A", text: "A fee added to the loan" }, { label: "B", text: "A repayment made" }, { label: "C", text: "An interest rate of 400%" }, { label: "D", text: "The initial loan" }], hint: "It is subtracted.", explanation: "$-400$ is a repayment." },
  { id: "loan-p-3", prompt: "Choose the meaning of $1.005$ in a loan recurrence.", latex: "L_{n+1}=1.005L_n-600", answer: "C", difficulty: 2, choices: [{ label: "A", text: "5% interest" }, { label: "B", text: "0.5% decrease" }, { label: "C", text: "0.5% interest" }, { label: "D", text: "50% interest" }], hint: "$1.005=1+0.005$.", explanation: "$1.005$ means 0.5% interest." },
  // --- D2: simple PV ---
  { id: "loan-p-4", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{1.05}=0.952381$.", latex: "PV=\\frac{1000}{1.05}", answer: "952.38", difficulty: 2, acceptedAnswers: ["$952.38"], hint: "Divide 1000 by 1.05.", explanation: "$1000\\times0.952381=952.38$." },
  { id: "loan-p-5", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{1.03}=0.970874$.", latex: "PV=\\frac{1500}{1.03}", answer: "1456.31", difficulty: 2, acceptedAnswers: ["$1456.31", "$1,456.31"], hint: "Divide 1500 by 1.03.", explanation: "$1500\\times0.970874=1456.31$." },
  // --- D3: PV with a power ---
  { id: "loan-p-6", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.05)^2}=0.907029$.", latex: "PV=\\frac{5000}{(1.05)^2}", answer: "4535.15", difficulty: 3, acceptedAnswers: ["$4535.15", "$4,535.15"], hint: "Multiply 5000 by the given factor.", explanation: "$5000\\times0.907029=4535.147\\ldots$, so $\\$4535.15$." },
  { id: "loan-p-7", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.04)^2}=0.924556$.", latex: "PV=\\frac{2000}{(1.04)^2}", answer: "1849.11", difficulty: 3, acceptedAnswers: ["$1849.11", "$1,849.11"], hint: "Multiply 2000 by the factor.", explanation: "$2000\\times0.924556=1849.11$." },
  { id: "loan-p-8", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.06)^2}=0.889996$.", latex: "PV=\\frac{8000}{(1.06)^2}", answer: "7119.97", difficulty: 3, acceptedAnswers: ["$7119.97", "$7,119.97"], hint: "Multiply 8000 by the factor.", explanation: "$8000\\times0.889996=7119.97$." },
  { id: "loan-p-9", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.05)^2}=0.907029$.", latex: "PV=\\frac{3000}{(1.05)^2}", answer: "2721.09", difficulty: 3, acceptedAnswers: ["$2721.09", "$2,721.09"], hint: "Multiply 3000 by the factor.", explanation: "$3000\\times0.907029=2721.09$." },
  // --- D2-D3: one step of a loan ---
  { id: "loan-p-10", prompt: "Find $L_1$.", latex: "L_0=2000,\\quad L_{n+1}=1.01L_n-150", answer: "1870", difficulty: 2, acceptedAnswers: ["1870.00", "$1870", "$1,870", "$1,870.00"], hint: "Apply interest, then subtract 150.", explanation: "$1.01(2000)-150=1870$." },
  { id: "loan-p-11", prompt: "Find $L_1$.", latex: "L_0=4000,\\quad L_{n+1}=1.01L_n-300", answer: "3740", difficulty: 3, acceptedAnswers: ["3740.00", "$3740", "$3,740", "$3,740.00"], hint: "Apply interest, then subtract 300.", explanation: "$1.01(4000)-300=3740$." },
  { id: "loan-p-12", prompt: "Find $L_1$.", latex: "L_0=6000,\\quad L_{n+1}=1.005L_n-350", answer: "5680", difficulty: 3, acceptedAnswers: ["5680.00", "$5680", "$5,680", "$5,680.00"], hint: "Apply interest, then subtract 350.", explanation: "$1.005(6000)-350=5680$." },
  // --- D3-D4: build / interpret a loan recurrence (MCQ) ---
  { id: "loan-p-13", prompt: "Choose the loan recurrence with 1% interest and a $500 repayment.", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$L_{n+1}=1.01L_n-500$" }, { label: "B", text: "$L_{n+1}=0.99L_n-500$" }, { label: "C", text: "$L_{n+1}=1.01L_n+500$" }, { label: "D", text: "$L_{n+1}=1.5L_n-500$" }], hint: "Interest adds, repayment subtracts.", explanation: "$L_{n+1}=1.01L_n-500$." },
  { id: "loan-p-14", prompt: "Which recurrence models a loan growing 2% then a $250 repayment?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$L_{n+1}=0.98L_n-250$" }, { label: "B", text: "$L_{n+1}=1.02L_n-250$" }, { label: "C", text: "$L_{n+1}=1.02L_n+250$" }, { label: "D", text: "$L_{n+1}=1.2L_n-250$" }], hint: "Interest adds, repayment subtracts.", explanation: "$L_{n+1}=1.02L_n-250$." },
  { id: "loan-p-15", prompt: "A loan has monthly repayments. Which interest rate should be used in the recurrence?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The annual rate without adjustment" }, { label: "B", text: "The monthly rate" }, { label: "C", text: "The number of years" }, { label: "D", text: "The total repayment" }], hint: "Match the rate period to the repayment period.", explanation: "Monthly repayments use a monthly rate." },
  // --- D4: second loan step ---
  { id: "loan-p-16", prompt: "Given $L_1=3740$, find $L_2$ to the nearest cent.", latex: "L_{n+1}=1.01L_n-300", answer: "3477.40", difficulty: 4, acceptedAnswers: ["3477.4", "$3477.40", "$3,477.40"], hint: "Substitute $L_1=3740$.", explanation: "$1.01(3740)-300=3477.40$." },
  { id: "loan-p-17", prompt: "Given $L_1=5680$, find $L_2$ to the nearest cent.", latex: "L_{n+1}=1.005L_n-350", answer: "5358.40", difficulty: 4, acceptedAnswers: ["5358.4", "$5358.40", "$5,358.40"], hint: "Substitute $L_1=5680$.", explanation: "$1.005(5680)-350=5358.40$." },
  { id: "loan-p-18", prompt: "Given $L_1=2860$, find $L_2$ to the nearest cent.", latex: "L_{n+1}=1.02L_n-200", answer: "2717.20", difficulty: 4, acceptedAnswers: ["2717.2", "$2717.20", "$2,717.20"], hint: "Substitute $L_1=2860$.", explanation: "$1.02(2860)-200=2717.20$." },
  // --- D4: PV with larger power, and direction of balance ---
  { id: "loan-p-19", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.05)^3}=0.863838$.", latex: "PV=\\frac{10000}{(1.05)^3}", answer: "8638.38", difficulty: 4, acceptedAnswers: ["$8638.38", "$8,638.38"], hint: "Multiply 10000 by the factor.", explanation: "$10000\\times0.863838=8638.38$." },
  { id: "loan-p-20", prompt: "If $L_0=5000$ and $L_1=5050$, did the loan reduce?", latex: "5000\\to5050", answer: "no", difficulty: 3, acceptedAnswers: ["No", "increased", "not reduced"], hint: "Compare $L_1$ with $L_0$.", explanation: "$5050>5000$, so it did not reduce." },
  // --- D5: Band-6 multi-step ---
  { id: "loan-p-21", prompt: "A loan follows $L_{n+1}=1.01L_n-500$ with $L_0=8000$. Find $L_2$ to the nearest cent.", latex: "L_0=8000,\\quad L_{n+1}=1.01L_n-500", answer: "7155.80", difficulty: 5, acceptedAnswers: ["7155.8", "$7155.80", "$7,155.80"], hint: "Compute $L_1$, then $L_2$.", explanation: "$L_1=1.01(8000)-500=7580$; $L_2=1.01(7580)-500=7155.80$." },
  { id: "loan-p-22", prompt: "A loan follows $L_{n+1}=1.005L_n-800$ with $L_0=12000$. Find $L_2$ to the nearest cent.", latex: "L_0=12000,\\quad L_{n+1}=1.005L_n-800", answer: "10516.30", difficulty: 5, acceptedAnswers: ["10516.3", "$10516.30", "$10,516.30"], hint: "Compute $L_1$, then $L_2$.", explanation: "$L_1=1.005(12000)-800=11260$; $L_2=1.005(11260)-800=10516.30$." },
  { id: "loan-p-23", prompt: "A loan follows $L_{n+1}=1.01L_n-500$ with $L_0=8000$. How much was the loan reduced over the first 2 months? Use $L_2=7155.80$.", latex: "8000-L_2", answer: "844.20", difficulty: 5, acceptedAnswers: ["$844.20"], hint: "Subtract $L_2$ from $L_0$.", explanation: "$8000-7155.80=844.20$." },
  { id: "loan-p-24", prompt: "A loan follows $L_{n+1}=1.02L_n-600$ with $L_0=5000$. Find $L_2$ to the nearest cent.", latex: "L_0=5000,\\quad L_{n+1}=1.02L_n-600", answer: "3990", difficulty: 5, acceptedAnswers: ["3990.00", "$3990", "$3,990", "$3,990.00"], hint: "Compute $L_1$, then $L_2$.", explanation: "$L_1=1.02(5000)-600=4500$; $L_2=1.02(4500)-600=3990$." },
  { id: "loan-p-25", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.08)^4}=0.73503$.", latex: "PV=\\frac{5000}{(1.08)^4}", answer: "3675.15", difficulty: 5, acceptedAnswers: ["$3675.15", "$3,675.15"], hint: "Multiply 5000 by the factor.", explanation: "$5000\\times0.73503=3675.15$." },
  { id: "loan-p-26", prompt: "An amount of \\(\\$2000\\) is due in 2 years at 5% p.a. Use $\\frac{1}{(1.05)^2}=0.907029$. How much less than \\(\\$2000\\) is its present value, to the nearest cent?", latex: "2000-\\frac{2000}{(1.05)^2}", answer: "185.94", difficulty: 5, acceptedAnswers: ["$185.94"], hint: "Find the present value, then subtract it from $2000.", explanation: "$PV=2000\\times0.907029=1814.06$; difference $=2000-1814.06=185.94$." },
  { id: "loan-p-27", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{1.04}=0.961538$.", latex: "PV=\\frac{1200}{1.04}", answer: "1153.85", difficulty: 2, acceptedAnswers: ["$1153.85", "$1,153.85"], hint: "Divide 1200 by 1.04.", explanation: "$1200\\times0.961538=1153.85$." },
  { id: "loan-p-28", prompt: "Find $L_1$.", latex: "L_0=7000,\\quad L_{n+1}=1.01L_n-450", answer: "6620", difficulty: 3, acceptedAnswers: ["6620.00", "$6620", "$6,620", "$6,620.00"], hint: "Apply interest, then subtract 450.", explanation: "$1.01(7000)-450=6620$." },
  { id: "loan-p-29", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.05)^2}=0.907029$.", latex: "PV=\\frac{6000}{(1.05)^2}", answer: "5442.18", difficulty: 4, acceptedAnswers: ["$5442.18", "$5,442.18"], hint: "Multiply 6000 by the factor.", explanation: "$6000\\times0.907029=5442.17\\ldots$, so $\\$5442.18$." },
];

presentValueLoanRepaymentsLesson.multiPartPractice = [
  {
    id: "loan-mp-1",
    prompt: "A loan of \\(\\$8000\\) is repaid monthly and modelled by $L_{n+1}=1.01L_n-500$, where $L_n$ is the balance after $n$ months.",
    latex: "L_0=8000,\\quad L_{n+1}=1.01L_n-500",
    answer: "7580",
    hint: "Apply 1% interest then subtract $500 each step, then compare to the starting loan.",
    explanation:
      "(a) $L_1=1.01(8000)-500=7580$. (b) $L_2=1.01(7580)-500=7155.80$. (c) reduction $=8000-7155.80=844.20$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the balance after 1 month.", latex: "1.01(8000)-500", marks: 2, answer: "7580", acceptedAnswers: ["7580.00", "$7580", "$7,580", "$7,580.00"], hint: "Use $L_0=8000$.", explanation: "$1.01(8000)-500=7580$." },
      { key: "b", label: "(b)", prompt: "Find the balance after 2 months, to the nearest cent.", latex: "1.01(7580)-500", marks: 2, answer: "7155.80", acceptedAnswers: ["7155.8", "$7155.80", "$7,155.80"], hint: "Use the answer to (a).", explanation: "$1.01(7580)-500=7155.80$." },
      { key: "c", label: "(c)", prompt: "Find the total reduction in the loan over these 2 months, to the nearest cent.", latex: "8000-7155.80", marks: 2, answer: "844.20", acceptedAnswers: ["$844.20"], hint: "Subtract the balance after 2 months from the original loan.", explanation: "$8000-7155.80=844.20$." },
    ],
  },
];

comparingFinancialOptionsLesson.masteryQuizPool = [
  // --- D1: identify the comparison goal ---
  { id: "compare-p-1", prompt: "For the best investment, what should be compared?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "The largest final value" }, { label: "B", text: "The lowest final value" }, { label: "C", text: "The largest remaining loan balance" }, { label: "D", text: "The interest rate only" }], hint: "An investment is better when it grows to more.", explanation: "The larger final value is better for an investment." },
  { id: "compare-p-2", prompt: "For a loan borrower, what should be compared?", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "The largest remaining balance" }, { label: "B", text: "The lowest remaining balance" }, { label: "C", text: "The highest interest rate" }, { label: "D", text: "The largest deposit" }], hint: "A borrower wants to owe less.", explanation: "The lower remaining balance is better for the borrower." },
  { id: "compare-p-3", prompt: "What must be true before comparing two options?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "They must have the same wording" }, { label: "B", text: "They must use different units" }, { label: "C", text: "They must be compared over equivalent time periods" }, { label: "D", text: "They must have the same principal" }], hint: "Compare like with like.", explanation: "Equivalent time periods are needed for a fair comparison." },
  { id: "compare-p-4", prompt: "A fee is charged at the end of an option. What should you do?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Ignore it" }, { label: "B", text: "Subtract it from both options" }, { label: "C", text: "Include it in that option's final cost" }, { label: "D", text: "Add it to the interest rate" }], hint: "Fees affect that option's total.", explanation: "The fee is included in that option's final cost." },
  // --- D2-D3: compute one option ---
  { id: "compare-p-5", prompt: "Calculate the final value. Use $1.05^2=1.1025$.", latex: "A=1000(1.05)^2", answer: "1102.50", difficulty: 2, acceptedAnswers: ["$1102.50", "$1,102.50", "1102.5"], hint: "Multiply 1000 by the power.", explanation: "$1000\\times1.1025=1102.50$." },
  { id: "compare-p-6", prompt: "Calculate the final value including a \\(\\$20\\) bonus. Use $1.04^2=1.0816$.", latex: "B=1000(1.04)^2+20", answer: "1101.60", difficulty: 3, acceptedAnswers: ["$1101.60", "$1,101.60", "1101.6"], hint: "Add the bonus after the growth.", explanation: "$1000\\times1.0816+20=1101.60$." },
  { id: "compare-p-7", prompt: "Calculate the final value. Use $1.05^4=1.215506$.", latex: "A=3000(1.05)^4", answer: "3646.52", difficulty: 3, acceptedAnswers: ["$3646.52", "$3,646.52"], hint: "Multiply 3000 by the power.", explanation: "$3000\\times1.215506=3646.518$, so $\\$3646.52$." },
  { id: "compare-p-8", prompt: "Calculate the final value including a \\(\\$50\\) bonus. Use $1.048^4=1.206272$.", latex: "B=3000(1.048)^4+50", answer: "3668.82", difficulty: 3, acceptedAnswers: ["$3668.82", "$3,668.82"], hint: "Add the bonus after the growth.", explanation: "$3000\\times1.206272+50=3668.82$." },
  { id: "compare-p-9", prompt: "A \\(\\$30\\) fee is added at the end. Find the final cost. Use $1.04^2=1.0816$.", latex: "500(1.04)^2+30", answer: "570.80", difficulty: 3, acceptedAnswers: ["$570.80", "570.8"], hint: "Add the fee after the growth.", explanation: "$500\\times1.0816+30=570.80$." },
  // --- D3: compare two finished values ---
  { id: "compare-p-10", prompt: "Which investment is better?", latex: "A=3646.52,\\quad B=3668.82", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Larger final value wins.", explanation: "Option B has the larger value." },
  { id: "compare-p-11", prompt: "For a loan, which leaves the borrower better off?", latex: "A=4497.50\\text{ owing},\\quad B=4558.24\\text{ owing}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Lower balance is better.", explanation: "Option A leaves a lower balance." },
  { id: "compare-p-12", prompt: "Plan A costs \\(\\$520\\) and Plan B costs \\(\\$498\\). Which has the lower cost?", latex: "520\\text{ vs }498", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Lower cost is the smaller amount.", explanation: "Option B is cheaper." },
  // --- D4: full two-option investment comparison (MCQ) ---
  { id: "compare-p-13", prompt: "Investment A: \\(\\$3000\\) at 5% for 2 years. Investment B: \\(\\$3000\\) at 4% for 2 years plus a \\(\\$70\\) bonus. Use $1.05^2=1.1025$ and $1.04^2=1.0816$. Which investment is larger?", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Compute both, then compare.", explanation: "A $=3307.50$, B $=3314.80$, so B is larger." },
  { id: "compare-p-14", prompt: "Investment A: \\(\\$2000\\) at 3% for 3 years. Investment B: \\(\\$2000\\) at 2.5% for 3 years plus a \\(\\$40\\) bonus. Use $1.03^3=1.092727$ and $1.025^3=1.076891$. Which is larger?", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Compute both final values.", explanation: "A $=2185.45$, B $=2193.78$, so B is larger." },
  { id: "compare-p-15", prompt: "Two cars cost \\(\\$15000\\). Car A depreciates 10% per year, Car B depreciates 15% per year, both for 2 years. Use $0.9^2=0.81$ and $0.85^2=0.7225$. Which keeps the LOWER value?", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Faster depreciation gives a lower value.", explanation: "A $=12150$, B $=10837.50$, so B is lower." },
  // --- D4: compute a difference ---
  { id: "compare-p-16", prompt: "Two options finish at $3668.82 and $3646.52. Find the difference, to the nearest cent.", latex: "3668.82-3646.52", answer: "22.30", difficulty: 4, acceptedAnswers: ["$22.30"], hint: "Subtract the smaller from the larger.", explanation: "$3668.82-3646.52=22.30$." },
  { id: "compare-p-17", prompt: "Two loan options leave $4558.24 and $4497.50 owing. Find the difference, to the nearest cent.", latex: "4558.24-4497.50", answer: "60.74", difficulty: 4, acceptedAnswers: ["$60.74"], hint: "Subtract the smaller from the larger.", explanation: "$4558.24-4497.50=60.74$." },
  // --- D3-D4: single loan step in a comparison ---
  { id: "compare-p-18", prompt: "Find the balance after one month.", latex: "L_0=4000,\\quad L_{n+1}=1.01L_n-250", answer: "3790", difficulty: 3, acceptedAnswers: ["3790.00", "$3790", "$3,790", "$3,790.00"], hint: "Apply interest, then subtract 250.", explanation: "$1.01(4000)-250=3790$." },
  { id: "compare-p-19", prompt: "For two loan options, A leaves $3250 owing and B leaves $3180 owing. Which is better for the borrower?", latex: "3250\\text{ vs }3180", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }], hint: "Lower balance is better.", explanation: "Option B leaves less owing." },
  // --- D5: Band-6 full comparisons ---
  { id: "compare-p-20", prompt: "Investment A: \\(\\$5000\\) at 3% p.a. for 10 years. Investment B: \\(\\$5000\\) at 2.8% p.a. for 10 years plus a \\(\\$150\\) bonus. Use $1.03^{10}=1.343916$ and $1.028^{10}=1.318048$. Which final value is larger?", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Compute both, then compare.", explanation: "A $=6719.58$, B $=5000\\times1.318048+150=6740.24$, so B is larger." },
  { id: "compare-p-21", prompt: "Investment A: \\(\\$5000\\) at 3% p.a. for 10 years. Investment B: \\(\\$5000\\) at 2.8% p.a. for 10 years plus a \\(\\$150\\) bonus. Use $1.03^{10}=1.343916$ and $1.028^{10}=1.318048$. By how much does the better option win, to the nearest cent?", latex: "B-A", answer: "20.66", difficulty: 5, acceptedAnswers: ["$20.66"], hint: "Find both final values, then subtract.", explanation: "A $=6719.58$, B $=6740.24$; difference $=20.66$." },
  { id: "compare-p-22", prompt: "Two loans of \\(\\$5000\\) run for 2 months. Loan A: $1.01L_n-300$. Loan B: $1.008L_n-260$. Which leaves the lower balance after 2 months?", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Run two steps of each recurrence.", explanation: "A: $4750\\to4497.50$. B: $4780\\to4558.24$. Option A is lower." },
  { id: "compare-p-23", prompt: "Two loans of $5000 run for 2 months. A ends at $4497.50, B ends at $4558.24. How much less does the better option leave owing, to the nearest cent?", latex: "4558.24-4497.50", answer: "60.74", difficulty: 5, acceptedAnswers: ["$60.74"], hint: "Subtract the lower balance from the higher.", explanation: "$4558.24-4497.50=60.74$." },
  { id: "compare-p-24", prompt: "An investment grows \\(\\$3000\\) at 5% p.a. for 4 years; another grows \\(\\$3000\\) at 4.8% p.a. for 4 years plus a \\(\\$50\\) bonus. Use $1.05^4=1.215506$ and $1.048^4=1.206272$. Find the better option's final value, to the nearest cent.", latex: "\\max\\{3000(1.05)^4,\\ 3000(1.048)^4+50\\}", answer: "3668.82", difficulty: 5, acceptedAnswers: ["$3668.82", "$3,668.82"], hint: "Compute both; the larger is the answer.", explanation: "First $=3646.52$, second $=3668.82$; the larger is $\\$3668.82$." },
  { id: "compare-p-25", prompt: "Loan A leaves $5340.06 owing and loan B leaves $5356.80 owing after 2 months. Which option, A or B, is better for the borrower?", latex: "5340.06\\text{ vs }5356.80", answer: "A", difficulty: 4, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }], hint: "Lower balance is better.", explanation: "Option A leaves less owing." },
  { id: "compare-p-26", prompt: "A $30 fee makes Option A cost $570.80 and Option B (no fee) costs $562.43. Which is cheaper?", latex: "570.80\\text{ vs }562.43", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }], hint: "Compare the final costs including fees.", explanation: "Option B is cheaper at $562.43$." },
  { id: "compare-p-27", prompt: "Calculate the final value. Use $1.06^2=1.1236$.", latex: "A=1000(1.06)^2", answer: "1123.60", difficulty: 2, acceptedAnswers: ["$1123.60", "$1,123.60", "1123.6"], hint: "Multiply 1000 by the power.", explanation: "$1000\\times1.1236=1123.60$." },
  { id: "compare-p-28", prompt: "Calculate the final value including a \\(\\$12\\) bonus. Use $1.055^2=1.113025$.", latex: "B=1000(1.055)^2+12", answer: "1125.03", difficulty: 3, acceptedAnswers: ["$1125.03", "$1,125.03", "1125.025"], hint: "Add the bonus after the growth.", explanation: "$1000\\times1.113025+12=1125.025$, so $\\$1125.03$." },
  { id: "compare-p-29", prompt: "Investment A finishes at \\(\\$1123.60\\) (6% for 2 years) and Investment B finishes at \\(\\$1125.03\\) (5.5% for 2 years plus a \\(\\$12\\) bonus). Which investment is larger?", latex: "1123.60\\text{ vs }1125.03", answer: "B", difficulty: 5, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Larger final value wins.", explanation: "Option B is larger, by $\\$1.43$." },
];

comparingFinancialOptionsLesson.multiPartPractice = [
  {
    id: "compare-mp-1",
    prompt: "Two savings options each start with $\\$3000$. Option A pays 5% p.a. for 4 years. Option B pays 4.8% p.a. for 4 years and adds a $\\$50$ bonus at the end. Use $1.05^4=1.215506$ and $1.048^4=1.206272$.",
    latex: "A=3000(1.05)^4,\\quad B=3000(1.048)^4+50",
    answer: "3646.52",
    hint: "Compute each option's final value, then find the difference.",
    explanation:
      "(a) $A=3000\\times1.215506=3646.52$. (b) $B=3000\\times1.206272+50=3668.82$. (c) difference $=3668.82-3646.52=22.30$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the final value of Option A, to the nearest cent.", latex: "3000(1.05)^4", marks: 2, answer: "3646.52", acceptedAnswers: ["$3646.52", "$3,646.52"], hint: "Multiply 3000 by $1.05^4$.", explanation: "$3000\\times1.215506=3646.52$." },
      { key: "b", label: "(b)", prompt: "Find the final value of Option B, to the nearest cent.", latex: "3000(1.048)^4+50", marks: 2, answer: "3668.82", acceptedAnswers: ["$3668.82", "$3,668.82"], hint: "Add the bonus after the growth.", explanation: "$3000\\times1.206272+50=3668.82$." },
      { key: "c", label: "(c)", prompt: "Find how much more the better option earns, to the nearest cent.", latex: "3668.82-3646.52", marks: 2, answer: "22.30", acceptedAnswers: ["$22.30"], hint: "Subtract the smaller final value from the larger.", explanation: "$3668.82-3646.52=22.30$." },
    ],
  },
];

mixedFinancialMathematicsExamPracticeLesson.masteryQuizPool = [
  // --- D1-D2: identify the model ---
  { id: "mixed-fin-p-1", prompt: "Choose the model type: a car loses 12% of its value each year.", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Compound growth" }, { label: "B", text: "Depreciation" }, { label: "C", text: "Future value of an annuity" }, { label: "D", text: "Present value" }], hint: "Value decreases.", explanation: "This is depreciation." },
  { id: "mixed-fin-p-2", prompt: "Choose the model type: $100 is deposited each month with interest.", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "One-off compound interest" }, { label: "B", text: "Depreciation" }, { label: "C", text: "Future value of an annuity" }, { label: "D", text: "Present value" }], hint: "Repeated equal deposits.", explanation: "Regular deposits form an annuity." },
  { id: "mixed-fin-p-3", prompt: "Choose the model type: a single $5000 grows at 4% p.a. for 6 years.", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Compound growth" }, { label: "B", text: "Depreciation" }, { label: "C", text: "Annuity" }, { label: "D", text: "Loan repayment" }], hint: "A single amount grows.", explanation: "This is compound growth." },
  { id: "mixed-fin-p-4", prompt: "Choose the key input that must match monthly loan repayments.", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "The monthly interest rate" }, { label: "B", text: "The annual rate without adjustment" }, { label: "C", text: "The number of school terms" }, { label: "D", text: "The total repayment only" }], hint: "Match the period.", explanation: "Monthly repayments need a monthly rate." },
  // --- D2-D3: one-step compound / depreciation ---
  { id: "mixed-fin-p-5", prompt: "Find the final value. Use $1.05^2=1.1025$.", latex: "A=1000(1.05)^2", answer: "1102.50", difficulty: 2, acceptedAnswers: ["$1102.50", "$1,102.50", "1102.5"], hint: "Compound growth.", explanation: "$1000\\times1.1025=1102.50$." },
  { id: "mixed-fin-p-6", prompt: "Find the compound amount. Use $1.04^2=1.0816$.", latex: "A=2500(1.04)^2", answer: "2704", difficulty: 3, acceptedAnswers: ["2704.00", "$2704", "$2,704", "$2,704.00"], hint: "Multiply 2500 by the power.", explanation: "$2500\\times1.0816=2704$." },
  { id: "mixed-fin-p-7", prompt: "Find the depreciated value. Use $0.9^3=0.729$.", latex: "A=2000(0.9)^3", answer: "1458", difficulty: 3, acceptedAnswers: ["1458.00", "$1458", "$1,458", "$1,458.00"], hint: "Decay factor three times.", explanation: "$2000\\times0.729=1458$." },
  { id: "mixed-fin-p-8", prompt: "Find the depreciated value. Use $0.8^2=0.64$.", latex: "A=12000(0.8)^2", answer: "7680", difficulty: 3, acceptedAnswers: ["7680.00", "$7680", "$7,680", "$7,680.00"], hint: "Decay factor twice.", explanation: "$12000\\times0.64=7680$." },
  // --- D3: depreciation to the nearest cent ---
  { id: "mixed-fin-p-9", prompt: "Find the value to the nearest cent. Use $0.85^3=0.614125$.", latex: "A=1800(0.85)^3", answer: "1105.43", difficulty: 4, acceptedAnswers: ["$1105.43", "$1,105.43"], hint: "Multiply, then round.", explanation: "$1800\\times0.614125=1105.425$, so $\\$1105.43$." },
  // --- D3: one annuity step ---
  { id: "mixed-fin-p-10", prompt: "Find the future value. Use $\\frac{(1.01)^3-1}{0.01}=3.0301$.", latex: "FV=100\\left(\\frac{(1.01)^3-1}{0.01}\\right)", answer: "303.01", difficulty: 3, acceptedAnswers: ["$303.01"], hint: "Multiply 100 by the bracket.", explanation: "$100\\times3.0301=303.01$." },
  // --- D3: recurrence steps ---
  { id: "mixed-fin-p-11", prompt: "Find $B_1$.", latex: "B_0=800,\\quad B_{n+1}=1.03B_n+50", answer: "874", difficulty: 3, acceptedAnswers: ["874.00", "$874", "$874.00"], hint: "Apply interest, then add the deposit.", explanation: "$1.03(800)+50=874$." },
  { id: "mixed-fin-p-12", prompt: "Find $B_1$.", latex: "B_0=500,\\quad B_{n+1}=1.02B_n+100", answer: "610", difficulty: 2, acceptedAnswers: ["610.00", "$610", "$610.00"], hint: "Multiply by 1.02, then add 100.", explanation: "$1.02(500)+100=610$." },
  { id: "mixed-fin-p-13", prompt: "Find $L_1$.", latex: "L_0=6000,\\quad L_{n+1}=1.01L_n-400", answer: "5660", difficulty: 3, acceptedAnswers: ["5660.00", "$5660", "$5,660", "$5,660.00"], hint: "Apply interest, then subtract 400.", explanation: "$1.01(6000)-400=5660$." },
  { id: "mixed-fin-p-14", prompt: "Find $L_1$.", latex: "L_0=3000,\\quad L_{n+1}=1.01L_n-200", answer: "2830", difficulty: 3, acceptedAnswers: ["2830.00", "$2830", "$2,830", "$2,830.00"], hint: "Apply interest, then subtract 200.", explanation: "$1.01(3000)-200=2830$." },
  // --- D2-D3: rate / present value ---
  { id: "mixed-fin-p-15", prompt: "Find the present value to the nearest cent. Use $\\frac{1}{(1.05)^2}=0.907029$.", latex: "PV=\\frac{4000}{(1.05)^2}", answer: "3628.12", difficulty: 3, acceptedAnswers: ["$3628.12", "$3,628.12"], hint: "Multiply 4000 by the factor.", explanation: "$4000\\times0.907029=3628.12$." },
  // --- D3-D4: comparisons ---
  { id: "mixed-fin-p-16", prompt: "Which option is better for an investment?", latex: "A=2240,\\quad B=2265", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }], hint: "Larger final value wins.", explanation: "Option B is larger." },
  { id: "mixed-fin-p-17", prompt: "Which option is better for a loan borrower?", latex: "A=4200\\text{ owing},\\quad B=4050\\text{ owing}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }], hint: "Lower balance is better.", explanation: "Option B leaves less owing." },
  // --- D4: nearest cent + second step ---
  { id: "mixed-fin-p-18", prompt: "Given $B_1=610$, find $B_2$ to the nearest cent.", latex: "B_{n+1}=1.02B_n+100", answer: "722.20", difficulty: 4, acceptedAnswers: ["722.2", "$722.20"], hint: "Use $B_1=610$.", explanation: "$1.02(610)+100=722.20$." },
  { id: "mixed-fin-p-19", prompt: "Find the final value to the nearest cent. Use $1.05^3=1.157625$.", latex: "A=5000(1.05)^3", answer: "5788.13", difficulty: 4, acceptedAnswers: ["$5788.13", "$5,788.13"], hint: "Multiply 5000 by the power.", explanation: "$5000\\times1.157625=5788.125$, so $\\$5788.13$." },
  { id: "mixed-fin-p-20", prompt: "Find the depreciated value. Use $0.9^4=0.6561$.", latex: "A=25000(0.9)^4", answer: "16402.50", difficulty: 4, acceptedAnswers: ["$16402.50", "$16,402.50", "16402.5"], hint: "Decay factor to the fourth power.", explanation: "$25000\\times0.6561=16402.50$." },
  // --- D5: Band-6 multi-step / model selection ---
  { id: "mixed-fin-p-21", prompt: "A loan of \\(\\$3000\\) follows $L_{n+1}=1.02L_n-200$. Find $L_2$ to the nearest cent.", latex: "L_0=3000,\\quad L_{n+1}=1.02L_n-200", answer: "2717.20", difficulty: 5, acceptedAnswers: ["2717.2", "$2717.20", "$2,717.20"], hint: "Compute $L_1$, then $L_2$.", explanation: "$L_1=1.02(3000)-200=2860$; $L_2=1.02(2860)-200=2717.20$." },
  { id: "mixed-fin-p-22", prompt: "\\(\\$4000\\) is invested at 4% p.a. for 4 years. Use $1.04^4=1.169859$. Find the interest earned, to the nearest cent.", latex: "4000(1.04)^4-4000", answer: "679.43", difficulty: 5, acceptedAnswers: ["$679.43"], hint: "Final amount minus the principal.", explanation: "$4000\\times1.169859=4679.43$; interest $=679.43$." },
  { id: "mixed-fin-p-23", prompt: "A saver deposits \\(\\$200\\) at the end of each month for 6 months at 2% per month. Use $\\frac{(1.02)^6-1}{0.02}=6.308121$. Find the interest earned, to the nearest cent.", latex: "200\\left(\\frac{(1.02)^6-1}{0.02}\\right)-1200", answer: "61.62", difficulty: 5, acceptedAnswers: ["$61.62"], hint: "Future value minus the total deposited.", explanation: "$FV=200\\times6.308121=1261.62$; deposits $=1200$; interest $=61.62$." },
  { id: "mixed-fin-p-24", prompt: "A car worth \\(\\$25000\\) depreciates 10% per year. Use $0.9^4=0.6561$. Find the value LOST after 4 years, to the nearest cent.", latex: "25000-25000(0.9)^4", answer: "8597.50", difficulty: 5, acceptedAnswers: ["$8597.50", "$8,597.50"], hint: "Original value minus the depreciated value.", explanation: "Value after 4 years $=16402.50$; loss $=25000-16402.50=8597.50$." },
  { id: "mixed-fin-p-25", prompt: "Investment A: invest \\(\\$5000\\) at 5% p.a. for 3 years. Investment B: invest \\(\\$5000\\) at 4.5% p.a. for 3 years plus a \\(\\$90\\) bonus. Use $1.05^3=1.157625$ and $1.045^3=1.141166$. Which final value is larger?", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "Option A" }, { label: "B", text: "Option B" }, { label: "C", text: "They are equal" }], hint: "Compute both, then compare.", explanation: "A $=5000\\times1.157625=5788.13$; B $=5000\\times1.141166+90=5795.83$, so B is larger." },
  { id: "mixed-fin-p-26", prompt: "A saver deposits \\(\\$500\\) at the end of each year for 5 years at 6% p.a. Use $\\frac{(1.06)^5-1}{0.06}=5.637093$. Find the future value, to the nearest cent.", latex: "FV=500\\left(\\frac{(1.06)^5-1}{0.06}\\right)", answer: "2818.55", difficulty: 5, acceptedAnswers: ["$2818.55", "$2,818.55"], hint: "Multiply 500 by the bracket.", explanation: "$500\\times5.637093=2818.55$." },
  { id: "mixed-fin-p-27", prompt: "Find the final value. Use $1.05^2=1.1025$.", latex: "A=3000(1.05)^2", answer: "3307.50", difficulty: 3, acceptedAnswers: ["$3307.50", "$3,307.50", "3307.5"], hint: "Multiply 3000 by the power.", explanation: "$3000\\times1.1025=3307.50$." },
  { id: "mixed-fin-p-28", prompt: "Find the depreciated value. Use $0.85^2=0.7225$.", latex: "A=8000(0.85)^2", answer: "5780", difficulty: 3, acceptedAnswers: ["5780.00", "$5780", "$5,780", "$5,780.00"], hint: "Decay factor twice.", explanation: "$8000\\times0.7225=5780$." },
  { id: "mixed-fin-p-29", prompt: "A saver deposits \\(\\$150\\) at the end of each month for 6 months at 0.5% per month. Use $\\frac{(1.005)^6-1}{0.005}=6.075502$. Find the future value, to the nearest cent.", latex: "FV=150\\left(\\frac{(1.005)^6-1}{0.005}\\right)", answer: "911.33", difficulty: 5, acceptedAnswers: ["$911.33"], hint: "Multiply 150 by the bracket.", explanation: "$150\\times6.075502=911.325$, so $\\$911.33$." },
];

mixedFinancialMathematicsExamPracticeLesson.multiPartPractice = [
  {
    id: "mixed-fin-mp-1",
    prompt: "A laptop is bought for \\(\\$2000\\). It depreciates by 10% each year. Use $0.9^2=0.81$ and $0.9^3=0.729$.",
    latex: "A=P(1-r)^n,\\quad P=2000,\\ r=0.10",
    answer: "1620",
    hint: "Use $A=2000(0.9)^n$ for each year, then find the value lost.",
    explanation:
      "(a) $2000\\times0.81=1620$. (b) $2000\\times0.729=1458$. (c) loss $=2000-1458=542$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the value after 2 years.", latex: "2000(0.9)^2", marks: 1, answer: "1620", acceptedAnswers: ["1620.00", "$1620", "$1,620", "$1,620.00"], hint: "Multiply 2000 by $0.9^2$.", explanation: "$2000\\times0.81=1620$." },
      { key: "b", label: "(b)", prompt: "Find the value after 3 years.", latex: "2000(0.9)^3", marks: 2, answer: "1458", acceptedAnswers: ["1458.00", "$1458", "$1,458", "$1,458.00"], hint: "Multiply 2000 by $0.9^3$.", explanation: "$2000\\times0.729=1458$." },
      { key: "c", label: "(c)", prompt: "Find the total value lost over the first 3 years.", latex: "2000-1458", marks: 2, answer: "542", acceptedAnswers: ["542.00", "$542", "$542.00"], hint: "Subtract the value after 3 years from the purchase price.", explanation: "$2000-1458=542$." },
    ],
  },
];

export const financialMathematicsOutline: LessonOutlineItem[] = [
  {
    id: "growth-factors-compound-interest-depreciation",
    slug: "growth-factors-compound-interest-depreciation",
    title: "Growth Factors, Compound Interest, and Depreciation",
    description:
      "Use growth and decay factors to model compound interest and depreciation over repeated time periods.",
    status: "active",
  },
  {
    id: "recurrence-relations-financial-contexts",
    slug: "recurrence-relations-financial-contexts",
    title: "Recurrence Relations in Financial Contexts",
    description:
      "Model savings, loans, deposits, repayments, and depreciation using recurrence relations.",
    status: "active",
  },
  {
    id: "future-value-annuities",
    slug: "future-value-annuities",
    title: "Future Value of Annuities",
    description:
      "Calculate the future value of regular deposits with compound interest.",
    status: "active",
  },
  {
    id: "present-value-loan-repayments",
    slug: "present-value-loan-repayments",
    title: "Present Value and Loan Repayments",
    description:
      "Use financial models to analyse loan balances, repayments, and present value.",
    status: "active",
  },
  {
    id: "comparing-financial-options",
    slug: "comparing-financial-options",
    title: "Comparing Financial Options",
    description:
      "Compare savings, investment, and loan options using financial mathematics.",
    status: "active",
  },
  {
    id: "mixed-financial-mathematics-exam-practice",
    slug: "mixed-financial-mathematics-exam-practice",
    title: "Mixed Financial Mathematics Exam Practice",
    description:
      "Practise mixed exam-style questions involving compound interest, recurrence, annuities, loans, and financial decision-making.",
    status: "active",
  },
];

export const financialMathematicsLessons = [
  growthFactorsCompoundInterestDepreciationLesson,
  recurrenceRelationsFinancialContextsLesson,
  futureValueAnnuitiesLesson,
  presentValueLoanRepaymentsLesson,
  comparingFinancialOptionsLesson,
  mixedFinancialMathematicsExamPracticeLesson,
];
