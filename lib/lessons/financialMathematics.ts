import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const growthFactorsCompoundInterestDepreciationLesson: ExplicitLesson = {
  id: "growth-factors-compound-interest-depreciation",
  slug: "growth-factors-compound-interest-depreciation",
  moduleSlug: "financial-mathematics",
  moduleTitle: "Financial Mathematics",
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
      prompt: "Find the amount to the nearest cent.",
      latex: "A=2000(1.04)^3",
      answer: "2249.73",
      acceptedAnswers: ["$2249.73", "$2,249.73", "2,249.73"],
      hint: "Evaluate and round to two decimal places.",
      explanation: "$2000(1.04)^3=2249.728$, so $A=\\$2249.73$.",
    },
    {
      id: "growth-mastery-5",
      prompt: "Find the depreciated value.",
      latex: "A=10000(0.75)^2",
      answer: "5625",
      acceptedAnswers: ["5625.00", "$5625", "$5,625", "$5625.00", "$5,625.00"],
      hint: "Square 0.75, then multiply by 10000.",
      explanation: "$10000(0.75)^2=5625$.",
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
  moduleSlug: "financial-mathematics",
  moduleTitle: "Financial Mathematics",
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
      prompt: "Identify the initial value.",
      latex: "S_0=2500,\\quad S_{n+1}=1.03S_n+150",
      answer: "2500",
      hint: "Look for the subscript 0 term.",
      explanation: "The initial value is $S_0=2500$.",
    },
    {
      id: "recurrence-mastery-2",
      prompt: "What percentage increase is represented by the multiplier?",
      latex: "B_{n+1}=1.04B_n+200",
      answer: "4%",
      acceptedAnswers: ["4", "4%", "4 percent"],
      hint: "Subtract 1 from 1.04.",
      explanation: "$1.04$ represents a 4% increase.",
    },
    {
      id: "recurrence-mastery-3",
      prompt: "In this recurrence, what amount is deposited each period?",
      latex: "B_{n+1}=1.02B_n+75",
      answer: "75",
      acceptedAnswers: ["$75", "$75.00", "75.00"],
      hint: "The deposit is the amount added.",
      explanation: "$75$ is added each period.",
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
  moduleSlug: "financial-mathematics",
  moduleTitle: "Financial Mathematics",
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
        { explanation: "Evaluate.", latex: "FV=607.5376\\ldots" },
      ],
      finalAnswerLatex: "\\$607.54",
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
      answer: "976.91",
      acceptedAnswers: ["$976.91"],
      hint: "Evaluate and round at the end.",
      explanation: "$FV=976.9108\\ldots$, so the value is $\\$976.91$.",
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
      prompt: "What does $M$ represent in the future value annuity formula?",
      latex: "FV=M\\left(\\frac{(1+r)^n-1}{r}\\right)",
      answer: "B",
      choices: [
        { label: "A", text: "The interest rate" },
        { label: "B", text: "The regular deposit" },
        { label: "C", text: "The number of deposits" },
      ],
      hint: "$M$ is the repeated payment amount.",
      explanation: "$M$ is the regular deposit.",
    },
    {
      id: "annuity-mastery-2",
      prompt: "How many monthly deposits are made in 18 months?",
      latex: "n=\\ ?",
      answer: "18",
      hint: "The time is already in months.",
      explanation: "There are 18 monthly deposits.",
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
      prompt: "Find the total deposited before interest.",
      latex: "\\$75\\text{ deposited monthly for 10 months}",
      answer: "750",
      acceptedAnswers: ["$750", "$750.00", "750.00"],
      hint: "Multiply deposit by number of deposits.",
      explanation: "$75\\times10=750$.",
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
      prompt: "A student deposits $100 each month at a monthly interest rate. What must the rate match?",
      latex: "\\text{rate period}",
      answer: "B",
      choices: [
        { label: "A", text: "The school term" },
        { label: "B", text: "The monthly deposit period" },
        { label: "C", text: "The student's age" },
      ],
      hint: "The rate and deposit period should match.",
      explanation: "Monthly deposits require a monthly rate.",
    },
  ],

  masteryPassMark: 0.8,
};

export const presentValueLoanRepaymentsLesson: ExplicitLesson = {
  id: "present-value-loan-repayments",
  slug: "present-value-loan-repayments",
  moduleSlug: "financial-mathematics",
  moduleTitle: "Financial Mathematics",
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
      prompt: "A repayment recurrence is $L_{n+1}=1.01L_n-R$. If $R=400$, what is subtracted each period?",
      latex: "R=400",
      answer: "400",
      acceptedAnswers: ["$400", "$400.00", "400.00"],
      hint: "$R$ is the repayment.",
      explanation: "$400$ is subtracted each period.",
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
  moduleSlug: "financial-mathematics",
  moduleTitle: "Financial Mathematics",
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
        { explanation: "Calculate Option B including the bonus.", latex: "B=3000(1.048)^4+50=3669.08" },
        { explanation: "Compare the final values.", latex: "3669.08>3646.52" },
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
      explanation: "$A=2185.45$ and $B=2193.77$, so B is larger.",
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
      prompt: "For an investment comparison, the better option usually has:",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "the larger final value" },
        { label: "B", text: "the larger loan balance" },
        { label: "C", text: "the shorter question wording" },
      ],
      hint: "Investment growth aims for a larger future value.",
      explanation: "The better investment usually has the larger final value.",
    },
    {
      id: "compare-mastery-2",
      prompt: "For a loan comparison, the better borrower option usually has:",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "the higher remaining balance" },
        { label: "B", text: "the lower remaining balance" },
        { label: "C", text: "the higher interest charge" },
      ],
      hint: "A borrower wants to owe less.",
      explanation: "The lower remaining balance is better for the borrower.",
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
      answer: "3669.08",
      acceptedAnswers: ["$3669.08", "$3,669.08"],
      hint: "Add the bonus after the compound value.",
      explanation: "$B=3669.08$.",
    },
    {
      id: "compare-mastery-6",
      prompt: "Which investment is better?",
      latex: "A=3646.52,\\quad B=3669.08",
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
      latex: "3669.08-3646.52",
      answer: "22.56",
      acceptedAnswers: ["$22.56"],
      hint: "Subtract the smaller final value from the larger.",
      explanation: "$3669.08-3646.52=22.56$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const mixedFinancialMathematicsExamPracticeLesson: ExplicitLesson = {
  id: "mixed-financial-mathematics-exam-practice",
  slug: "mixed-financial-mathematics-exam-practice",
  moduleSlug: "financial-mathematics",
  moduleTitle: "Financial Mathematics",
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
        { explanation: "Evaluate and round.", latex: "A=1105.5375" },
      ],
      finalAnswerLatex: "\\$1105.54",
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
      answer: "1105.54",
      acceptedAnswers: ["$1105.54", "$1,105.54"],
      hint: "Use the decay factor.",
      explanation: "$1800(0.85)^3=1105.5375$, so $A=\\$1105.54$.",
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
