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
      latex: "1+0.07=\\Box",
      answer: "1.07",
      hint: "Convert 7% to 0.07, then add to 1.",
      explanation: "A 7% increase uses the growth factor $1.07$.",
    },
    {
      id: "growth-guided-2",
      prompt: "Write the decay factor for a 15% decrease.",
      latex: "1-0.15=\\Box",
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
      latex: "0.92=1-r",
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
      latex: "A=1000(1.06)^2",
      answer: "1123.60",
      acceptedAnswers: ["$1123.60", "$1,123.60", "1,123.60", "1123.6"],
      hint: "Evaluate the power first, then multiply by 1000.",
      explanation: "$1000(1.06)^2=1123.60$, so the amount is $\\$1123.60$.",
    },
    {
      id: "growth-ind-2",
      prompt: "Find the value after 3 years.",
      latex: "A=5000(0.9)^3",
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
      latex: "A=3000(1.025)^4",
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
      latex: "0.85=1-r",
      answer: "15%",
      acceptedAnswers: ["15", "15%", "15 percent"],
      hint: "Find $1-0.85$.",
      explanation: "$1-0.85=0.15$, so the depreciation rate is 15%.",
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
    status: "coming-soon",
  },
  {
    id: "present-value-loan-repayments",
    slug: "present-value-loan-repayments",
    title: "Present Value and Loan Repayments",
    description:
      "Use financial models to analyse loan balances, repayments, and present value.",
    status: "coming-soon",
  },
  {
    id: "comparing-financial-options",
    slug: "comparing-financial-options",
    title: "Comparing Financial Options",
    description:
      "Compare savings, investment, and loan options using financial mathematics.",
    status: "coming-soon",
  },
  {
    id: "mixed-financial-mathematics-exam-practice",
    slug: "mixed-financial-mathematics-exam-practice",
    title: "Mixed Financial Mathematics Exam Practice",
    description:
      "Practise mixed exam-style questions involving compound interest, recurrence, annuities, loans, and financial decision-making.",
    status: "coming-soon",
  },
];

export const financialMathematicsLessons = [
  growthFactorsCompoundInterestDepreciationLesson,
  recurrenceRelationsFinancialContextsLesson,
];
