// Year 12 Standard 1 — Unit 8 "Depreciation and Loans" — Wave 9 authored sections (final wave).
//
//   8B Reducing-Balance Loans   (reducing-balance-loans)
//   8D Credit Card Statements   (credit-card-statements)
//   8E Fees and Charges         (fees-and-charges)
//
// 8A (depreciation-loans) and 8C (credit-cards-and-loans) keep their existing overrides. Same
// pattern as Waves 1–8: Feynman teaching, 4/5/10 with EXACTLY 1/1/3 MCQs per section, authored
// cognitive-demand difficulty, markable answers. Statement/loan figures are embedded inline as
// text (no purpose-built statement/amortisation renderer exists). IDs unprefixed; `y12s1-` auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";

const UNIT = "depreciation-and-loans";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  hint: string,
  explanation: string,
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    acceptedAnswers: [],
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

// ── 8B Reducing-Balance Loans ────────────────────────────────────────────────────────
export function year12Standard1ReducingBalanceLoansLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "reducing-balance-loans") {
    return null;
  }
  return {
    description:
      "Understand reducing-balance loans: interest charged on the current balance, each repayment split between interest and principal, and why balances fall slowly at first.",
    learningIntention:
      "Track a reducing-balance loan: find each period's interest on the current balance and the new balance after a repayment.",
    successCriteria: [
      "State that interest is calculated on the current balance each period.",
      "Find a period's interest from the balance and the rate.",
      "Split a repayment into interest and principal, and find the new balance.",
      "Explain why the balance falls slowly at the start of the loan.",
    ],
    teaching: {
      paragraphs: [
        "A reducing-balance loan works the way most real loans and mortgages do: the interest each period is charged on the amount you STILL OWE — the current balance — not on the original amount you borrowed. As you pay the loan down, the balance shrinks, so the interest charged shrinks too. That is the whole idea behind the name 'reducing balance'.",
        "Each repayment does two jobs. First it pays the interest that has just been added; whatever is LEFT OVER then reduces the principal (the amount owing). So the new balance = old balance + interest − repayment. If the balance is $10 000 at 1% per month, the interest is $100; a $500 repayment covers that $100 and the other $400 cuts the balance to $9 600.",
        "Here is the part that surprises people: at the START of a loan the balance is large, so the interest is large, so most of each repayment is eaten up by interest and only a little reduces what you owe. That is why the balance falls SLOWLY at first. Later, when the balance is smaller, less goes to interest and more to principal, and the balance drops faster.",
        "The common error is to calculate interest on the ORIGINAL loan every period — that would be simple interest, not reducing balance. Always apply the rate to the CURRENT balance, recompute after each repayment, and remember a repayment is split between interest and principal, not entirely principal.",
      ],
      latexBlocks: [
        "\\text{interest} = \\text{current balance} \\times \\text{rate per period}",
        "\\text{new balance} = \\text{old balance} + \\text{interest} - \\text{repayment}",
        "\\text{principal reduced} = \\text{repayment} - \\text{interest}",
      ],
    },
    workedExamples: [
      {
        title: "Interest and new balance",
        questionLatex: "\\text{Balance \\$10\\,000, rate 1\\% per month, repayment \\$500. Find the new balance.}",
        steps: [
          { explanation: "Interest = 1% of the current balance.", latex: "10000 \\times 0.01 = \\$100" },
          { explanation: "New balance = old + interest − repayment.", latex: "10000 + 100 - 500 = \\$9600" },
        ],
        finalAnswerLatex: "\\$9600",
      },
      {
        title: "How the repayment splits",
        questionLatex: "\\text{With \\$100 interest and a \\$500 repayment, how much reduces the principal?}",
        steps: [
          { explanation: "Principal reduced = repayment − interest.", latex: "500 - 100 = \\$400" },
        ],
        finalAnswerLatex: "\\$400",
      },
    ],
    guidedPractice: [
      mcq("rbl-g1", "In a reducing-balance loan, the interest each period is calculated on:", "B",
        ["the original amount borrowed", "the current balance owing", "the repayment amount", "the total of all repayments"], 1,
        "The balance reduces, so does the interest.",
        "Interest is charged on the current balance owing, which falls as the loan is repaid."),
      ans("rbl-g2", "A loan balance is $10 000 with a monthly interest rate of 1%. Find this month's interest.", "", "100", 2,
        "Interest = balance × rate.", "Interest = 10 000 × 0.01 = $100.",
        ["$100"]),
      ans("rbl-g3", "This month's interest is $100 and the repayment is $500. How much of the repayment reduces the principal?", "", "400", 2,
        "Principal reduced = repayment − interest.", "500 − 100 = $400 reduces the principal.",
        ["$400"]),
      ans("rbl-g4", "A loan balance is $10 000; interest of $100 is added and a $500 repayment is made. Find the new balance.", "", "9600", 2,
        "New balance = old + interest − repayment.", "10 000 + 100 − 500 = $9 600.",
        ["$9600"]),
    ],
    independentPractice: [
      ans("rbl-i1", "A loan balance is $5 000 with a monthly interest rate of 2%. Find this month's interest.", "", "100", 2,
        "Interest = balance × rate.", "Interest = 5 000 × 0.02 = $100.",
        ["$100"]),
      mcq("rbl-i2", "Early in a reducing-balance loan, the LARGER portion of each repayment goes towards:", "A",
        ["interest", "the principal", "fees", "savings"], 3,
        "The balance is large at the start.",
        "At the start the balance (and so the interest) is large, so most of each repayment is interest and little reduces the principal."),
      ans("rbl-i3", "A loan balance is $8 000 with a monthly interest rate of 1.5%. Find this month's interest.", "", "120", 3,
        "Interest = balance × rate.", "Interest = 8 000 × 0.015 = $120.",
        ["$120"]),
      ans("rbl-i4", "A loan balance is $5 000; interest of $100 is added and a $300 repayment is made. Find the new balance.", "", "4800", 3,
        "New balance = old + interest − repayment.", "5 000 + 100 − 300 = $4 800.",
        ["$4800"]),
      ans("rbl-i5", "A loan balance is $20 000 at 0.5% per month, with a $1 000 repayment. How much of the repayment reduces the principal?", "", "900", 3,
        "Find the interest first, then subtract from the repayment.", "Interest = 20 000 × 0.005 = $100; principal reduced = 1 000 − 100 = $900.",
        ["$900"]),
    ],
    masteryQuiz: [
      ans("rbl-m1", "A loan balance is $12 000 at a monthly rate of 1%. Find this month's interest.", "", "120", 2,
        "Interest = balance × rate.", "Interest = 12 000 × 0.01 = $120.",
        ["$120"]),
      mcq("rbl-m2", "Why does a reducing-balance loan's balance fall slowly at first?", "B",
        ["the rate is highest at the start", "most of each early repayment is interest, leaving little to reduce the principal", "no repayments are made early on", "fees are added each month"], 3,
        "Think about the size of the early balance.",
        "Early on the balance is large, so the interest is large and absorbs most of the repayment, leaving little to reduce the principal."),
      ans("rbl-m3", "A loan balance is $10 000; interest of $100 is added and a $600 repayment is made. Find the new balance.", "", "9500", 3,
        "New balance = old + interest − repayment.", "10 000 + 100 − 600 = $9 500.",
        ["$9500"]),
      ans("rbl-m4", "A loan balance is $6 000 at 2% per month, with a $500 repayment. Find the new balance.", "", "5620", 4,
        "Interest first, then new balance.", "Interest = 6 000 × 0.02 = $120; new balance = 6 000 + 120 − 500 = $5 620.",
        ["$5620"]),
      mcq("rbl-m5", "On a reducing-balance loan, each repayment is split into:", "C",
        ["principal only", "interest only", "interest plus a reduction of the principal", "fees plus savings"], 3,
        "It pays the interest, then the rest reduces the balance.",
        "Each repayment first pays the period's interest, and the remainder reduces the principal."),
      ans("rbl-m6", "A loan balance is $15 000 at a monthly rate of 1%. Find this month's interest.", "", "150", 2,
        "Interest = balance × rate.", "Interest = 15 000 × 0.01 = $150.",
        ["$150"]),
      ans("rbl-m7", "After month 1 a loan balance is $9 600. At 1% per month, find month 2's interest.", "", "96", 4,
        "Interest = current balance × rate.", "Interest = 9 600 × 0.01 = $96 (less than month 1, because the balance is smaller).",
        ["$96"]),
      mcq("rbl-m8", "Which loan charges interest on the CURRENT balance, so the interest falls over time?", "B",
        ["a simple-interest loan", "a reducing-balance loan", "an interest-free loan", "a fixed-fee loan"], 3,
        "The balance reduces each period.",
        "A reducing-balance loan charges interest on the current balance, so as the balance falls the interest falls too."),
      ans("rbl-m9", "A loan balance is $4 000 at 1.5% per month, with a $200 repayment. Find the new balance.", "", "3860", 4,
        "Interest first, then new balance.", "Interest = 4 000 × 0.015 = $60; new balance = 4 000 + 60 − 200 = $3 860.",
        ["$3860"]),
      ans("rbl-m10", "A loan's monthly interest was $100 in month 1 and $96 in month 2. By how much did the monthly interest fall?", "", "4", 4,
        "Subtract the two interest amounts.", "100 − 96 = $4 less, because the balance reduced.",
        ["$4"]),
    ],
    commonMistakes: [
      { mistake: "Charging interest on the original loan each period.", fix: "Reducing-balance interest is on the CURRENT balance — recompute every period." },
      { mistake: "Treating the whole repayment as reducing the principal.", fix: "The repayment first pays the interest; only the remainder reduces the principal." },
      { mistake: "Expecting the balance to fall quickly at the start.", fix: "Early on most of the repayment is interest, so the balance falls slowly." },
      { mistake: "Forgetting to add the interest before subtracting the repayment.", fix: "New balance = old balance + interest − repayment." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 8D Credit Card Statements ────────────────────────────────────────────────────────
export function year12Standard1CreditCardStatementsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "credit-card-statements") {
    return null;
  }
  return {
    description:
      "Interpret a credit card statement: opening and closing balances, purchases, payments, interest, the minimum payment and the interest-free period.",
    learningIntention:
      "Read a credit card statement to find a closing balance, interest charged and the minimum payment.",
    successCriteria: [
      "Compute a closing balance from opening balance, purchases, interest and payments.",
      "Recognise when interest is charged (balance not paid in full by the due date).",
      "Find the interest on an unpaid balance from the monthly rate.",
      "Understand the minimum payment and the minimum-payment trap.",
    ],
    teaching: {
      paragraphs: [
        "A credit card statement is just a running tally of what you owe. It lists the OPENING balance (what you owed last time), any new PURCHASES, any PAYMENTS you made, any INTEREST or fees, and finishes with the CLOSING balance — the new amount owing. The relationship is simple: closing balance = opening balance + purchases + interest + fees − payments.",
        "Credit cards usually give an INTEREST-FREE PERIOD: if you pay the closing balance IN FULL by the due date, you are charged NO interest on purchases. Interest only kicks in when you DON'T pay in full — then it is charged (often each month) on the unpaid balance. So a statement with the balance paid off in full shows $0 interest.",
        "When interest does apply, it is worked out from the monthly rate on the balance owing: a 2% monthly rate on a $1 000 unpaid balance adds $20. Read the statement carefully — interest and fees are added IN, while payments are taken OUT.",
        "Every statement also shows a MINIMUM PAYMENT — a small required amount (often around 2% of the closing balance), NOT the full balance. The minimum-payment trap is real: if you pay only the minimum, the balance barely moves, interest keeps piling on, and it can take years and a lot of extra money to clear the debt. Paying more than the minimum saves interest.",
      ],
      latexBlocks: [
        "\\text{closing} = \\text{opening} + \\text{purchases} + \\text{interest} + \\text{fees} - \\text{payments}",
        "\\text{pay in full by the due date} \\Rightarrow \\text{no interest (interest-free period)}",
        "\\text{interest on unpaid balance} = \\text{balance} \\times \\text{monthly rate}",
      ],
    },
    workedExamples: [
      {
        title: "Find the closing balance",
        questionLatex: "\\text{Opening \\$500, purchases \\$300, payment \\$200, no interest. Find the closing balance.}",
        steps: [
          { explanation: "Add purchases, subtract payments.", latex: "500 + 300 - 200" },
          { explanation: "Evaluate.", latex: "= \\$600" },
        ],
        finalAnswerLatex: "\\$600",
      },
      {
        title: "Interest on an unpaid balance",
        questionLatex: "\\text{A \\$1\\,000 balance is unpaid at 2\\% per month. Find the interest charged.}",
        steps: [
          { explanation: "Interest = balance × monthly rate.", latex: "1000 \\times 0.02 = \\$20" },
        ],
        finalAnswerLatex: "\\$20",
      },
    ],
    guidedPractice: [
      mcq("ccs-g1", "On a credit card statement, the closing balance equals the opening balance plus purchases plus interest and fees, minus:", "B",
        ["the credit limit", "the payments made", "the minimum payment only", "the interest-free period"], 1,
        "Payments reduce what you owe.",
        "Closing balance = opening + purchases + interest + fees − payments."),
      ans("ccs-g2", "A statement shows opening balance $500, purchases $300, payment $200 and no interest. Find the closing balance.", "", "600", 2,
        "Add purchases, subtract payments.", "500 + 300 − 200 = $600.",
        ["$600"]),
      ans("ccs-g3", "A statement shows opening balance $1 000, no purchases and a $400 payment. Find the closing balance.", "", "600", 2,
        "Subtract the payment.", "1 000 − 400 = $600.",
        ["$600"]),
      ans("ccs-g4", "A statement shows opening balance $800, purchases $200 and a $1 000 payment. Find the closing balance.", "", "0", 2,
        "Add purchases, subtract the payment.", "800 + 200 − 1 000 = $0 (paid off in full).",
        ["$0"]),
    ],
    independentPractice: [
      ans("ccs-i1", "A statement shows opening balance $600, purchases $250, interest $15 and a payment $300. Find the closing balance.", "", "565", 3,
        "Add purchases and interest, subtract the payment.", "600 + 250 + 15 − 300 = $565.",
        ["$565"]),
      mcq("ccs-i2", "Interest on a credit card is usually charged when:", "C",
        ["you make any purchase", "you pay the balance in full", "the balance is not paid in full by the due date", "you stay under the credit limit"], 3,
        "Think about the interest-free period.",
        "Interest applies when you do not pay the closing balance in full by the due date; paying in full uses the interest-free period."),
      ans("ccs-i3", "A statement shows opening balance $0, purchases $450 and a $450 payment. Find the closing balance.", "", "0", 3,
        "Purchases minus payment.", "0 + 450 − 450 = $0.",
        ["$0"]),
      ans("ccs-i4", "A statement shows opening balance $2 000, purchases $500, interest $40 and a payment $600. Find the closing balance.", "", "1940", 3,
        "Add purchases and interest, subtract the payment.", "2 000 + 500 + 40 − 600 = $1 940.",
        ["$1940"]),
      ans("ccs-i5", "A card charges 2% monthly interest on an unpaid balance of $1 000. Find the interest charged.", "", "20", 3,
        "Interest = balance × monthly rate.", "1 000 × 0.02 = $20.",
        ["$20"]),
    ],
    masteryQuiz: [
      ans("ccs-m1", "A statement shows opening balance $300, purchases $700 and a $500 payment. Find the closing balance.", "", "500", 2,
        "Add purchases, subtract the payment.", "300 + 700 − 500 = $500.",
        ["$500"]),
      mcq("ccs-m2", "The minimum payment shown on a credit card statement is:", "B",
        ["the full closing balance", "a small required amount, much less than the full balance", "the same as the credit limit", "the interest charged"], 3,
        "It is the least you must pay.",
        "The minimum payment is a small required amount (often about 2% of the balance), not the full amount owing."),
      ans("ccs-m3", "A statement shows opening balance $1 200, purchases $300, interest $24 and a payment $500. Find the closing balance.", "", "1024", 3,
        "Add purchases and interest, subtract the payment.", "1 200 + 300 + 24 − 500 = $1 024.",
        ["$1024"]),
      ans("ccs-m4", "A card charges 1.5% monthly interest on an unpaid balance of $1 500. Find the interest charged.", "", "22.50", 3,
        "Interest = balance × monthly rate.", "1 500 × 0.015 = $22.50.",
        ["22.5", "$22.50"]),
      mcq("ccs-m5", "If you pay only the minimum payment each month, you will most likely:", "C",
        ["clear the debt quickly", "pay no interest", "take a long time to repay and pay a lot of interest", "reduce your credit limit"], 3,
        "The balance barely moves.",
        "Paying only the minimum means the balance falls very slowly and interest keeps accruing, so it takes a long time and costs a lot of interest (the minimum-payment trap)."),
      ans("ccs-m6", "A statement shows opening balance $0, purchases $600 and a $600 payment. Find the closing balance.", "", "0", 2,
        "Purchases minus payment.", "0 + 600 − 600 = $0.",
        ["$0"]),
      ans("ccs-m7", "A statement shows a closing balance of $800 and a minimum payment of 2% of the closing balance. Find the minimum payment.", "", "16", 4,
        "Minimum payment = 2% of the closing balance.", "800 × 0.02 = $16.",
        ["$16"]),
      mcq("ccs-m8", "Paying the closing balance in full by the due date means:", "B",
        ["the credit limit increases", "no interest is charged (the interest-free period applies)", "the minimum payment doubles", "interest is charged on every purchase"], 3,
        "Recall the interest-free period.",
        "Paying the full closing balance by the due date uses the interest-free period, so no interest is charged."),
      ans("ccs-m9", "A statement shows opening balance $900, purchases $400, interest $18 and a payment $300. Find the closing balance.", "", "1018", 4,
        "Add purchases and interest, subtract the payment.", "900 + 400 + 18 − 300 = $1 018.",
        ["$1018"]),
      ans("ccs-m10", "A $2 000 balance accrues 1.8% monthly interest while unpaid. Find one month's interest.", "", "36", 4,
        "Interest = balance × monthly rate.", "2 000 × 0.018 = $36.",
        ["$36"]),
    ],
    commonMistakes: [
      { mistake: "Subtracting purchases or adding payments.", fix: "Purchases, interest and fees add ON; payments come OFF the balance." },
      { mistake: "Thinking interest always applies.", fix: "Paying in full by the due date means no interest (interest-free period)." },
      { mistake: "Believing the minimum payment clears the debt.", fix: "The minimum is a small required amount; paying only it leaves most of the balance." },
      { mistake: "Using the annual rate for one month's interest.", fix: "Use the monthly rate on the current balance for monthly interest." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 8E Fees and Charges ──────────────────────────────────────────────────────────────
export function year12Standard1FeesAndChargesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "fees-and-charges") {
    return null;
  }
  return {
    description:
      "Account for fees and charges on top of interest, and compare financial options by total cost rather than interest rate alone.",
    learningIntention:
      "Include fees and charges in the cost of borrowing and compare options by their total cost.",
    successCriteria: [
      "Identify fees (establishment, account, annual, late, ATM) as charges in addition to interest.",
      "Add fees over a period to a total fee amount.",
      "Find the total cost of a loan or card as interest plus fees.",
      "Compare two options by total cost, not just the interest rate.",
    ],
    teaching: {
      paragraphs: [
        "Interest is not the only cost of borrowing. Loans and cards come with FEES on top: a one-off establishment (or application) fee to set up a loan, ongoing monthly account fees, annual card fees, and penalty charges like late-payment fees or ATM fees. These are charges in ADDITION to interest, and they add to what the borrowing really costs you.",
        "To find the TOTAL COST, add the interest and ALL the fees together. A loan with $500 of interest and a $200 establishment fee costs $700 in total. Ongoing fees multiply up: a $5 monthly account fee is 5 × 12 = $60 over a year, which then joins the interest in the total.",
        "This matters most when COMPARING options. The cheapest option is the one with the lowest TOTAL cost — interest plus fees — not simply the lowest interest rate. A loan advertising a lower rate but charging hefty fees can easily cost more than one with a slightly higher rate and no fees.",
        "So treat the advertised interest rate as only part of the story. Work out interest + fees for each option over the same period, then compare those totals. The classic trap is being drawn to the lowest rate and ignoring the fees that make it the dearer choice.",
      ],
      latexBlocks: [
        "\\text{fees are charges IN ADDITION to interest}",
        "\\text{total cost} = \\text{interest} + \\text{all fees}",
        "\\text{compare options by total cost, not the rate alone}",
      ],
    },
    workedExamples: [
      {
        title: "Total cost of a loan",
        questionLatex: "\\text{A loan charges \\$500 interest plus a \\$200 establishment fee. Find the total cost.}",
        steps: [
          { explanation: "Add interest and fees.", latex: "500 + 200 = \\$700" },
        ],
        finalAnswerLatex: "\\$700",
      },
      {
        title: "Compare by total cost",
        questionLatex: "\\text{Card A: \\$0 fee, \\$120 interest. Card B: \\$60 fee, \\$40 interest. Which is cheaper?}",
        steps: [
          { explanation: "Total cost of each.", latex: "A = \\$120,\\quad B = 60 + 40 = \\$100" },
          { explanation: "Compare totals.", latex: "B\\ (\\$100) < A\\ (\\$120)" },
        ],
        finalAnswerLatex: "\\text{Card B (\\$100)}",
      },
    ],
    guidedPractice: [
      mcq("fee-g1", "A loan establishment fee is:", "B",
        ["the interest charged each month", "a one-off charge for setting up the loan, on top of interest", "a refund when you repay early", "the same as the minimum payment"], 1,
        "It is charged in addition to interest.",
        "An establishment fee is a one-off set-up charge, paid in addition to the interest."),
      ans("fee-g2", "A loan charges $500 interest plus a $200 establishment fee. Find the total cost.", "", "700", 2,
        "Total cost = interest + fees.", "500 + 200 = $700.",
        ["$700"]),
      ans("fee-g3", "An account charges a $5 monthly fee. Find the total fees for one year.", "", "60", 2,
        "12 months at $5 each.", "5 × 12 = $60.",
        ["$60"]),
      ans("fee-g4", "A card has a $90 annual fee and charges $30 in interest. Find the total yearly cost.", "", "120", 2,
        "Total cost = interest + fees.", "90 + 30 = $120.",
        ["$120"]),
    ],
    independentPractice: [
      ans("fee-i1", "A loan charges $1 200 interest, a $150 application fee, and $5 monthly account fees for 12 months. Find the total cost.", "", "1410", 3,
        "Add interest and all fees.", "Monthly fees = 5 × 12 = $60; total = 1 200 + 150 + 60 = $1 410.",
        ["$1410"]),
      mcq("fee-i2", "When comparing two loans, the cheapest is the one with the lowest:", "C",
        ["interest rate", "establishment fee", "total cost (interest plus fees)", "monthly repayment"], 3,
        "Add fees to interest before comparing.",
        "Compare the total cost (interest + fees); the lowest rate is not always the cheapest once fees are included."),
      ans("fee-i3", "Card A has no annual fee but $120 interest. Card B has a $60 annual fee and $40 interest. Find the total cost of the cheaper card.", "", "100", 3,
        "Total cost of each, then pick the smaller.", "A = $120; B = 60 + 40 = $100; the cheaper is B at $100.",
        ["$100"]),
      ans("fee-i4", "A borrower is charged three late fees of $25 each. Find the total late fees.", "", "75", 2,
        "3 fees at $25.", "3 × 25 = $75.",
        ["$75"]),
      ans("fee-i5", "An ATM charges $2.50 per withdrawal. Find the total ATM fees for 8 withdrawals.", "", "20", 3,
        "8 withdrawals at $2.50.", "8 × 2.50 = $20.",
        ["$20"]),
    ],
    masteryQuiz: [
      ans("fee-m1", "A loan charges $800 interest and $250 in fees. Find the total cost.", "", "1050", 2,
        "Total cost = interest + fees.", "800 + 250 = $1 050.",
        ["$1050"]),
      mcq("fee-m2", "A loan with a LOWER interest rate but high fees can:", "B",
        ["never cost more than a higher-rate loan", "cost more overall than a loan with a higher rate and low fees", "have no total cost", "remove the need to repay"], 3,
        "Fees add to the total cost.",
        "High fees can push the total cost above that of a higher-rate, low-fee loan — compare totals, not rates."),
      ans("fee-m3", "A card has a $99 annual fee and a $4 monthly fee. Find the total fees for one year.", "", "147", 3,
        "Annual fee plus 12 monthly fees.", "Monthly fees = 4 × 12 = $48; total = 99 + 48 = $147.",
        ["$147"]),
      ans("fee-m4", "Loan A has a total cost of $5 400 and Loan B a total cost of $5 200. How much cheaper is Loan B?", "", "200", 3,
        "Subtract the totals.", "5 400 − 5 200 = $200 cheaper.",
        ["$200"]),
      mcq("fee-m5", "Fees on a loan or card are best described as:", "B",
        ["the same thing as interest", "charges in addition to interest", "a discount on interest", "always refunded later"], 3,
        "They are extra charges.",
        "Fees are charges in addition to interest, increasing the total cost."),
      ans("fee-m6", "A loan charges $300 interest, a $200 establishment fee, and $10 monthly account fees for 12 months. Find the total cost.", "", "620", 4,
        "Add interest and all fees.", "Monthly fees = 10 × 12 = $120; total = 300 + 200 + 120 = $620.",
        ["$620"]),
      ans("fee-m7", "A card charges a $55 annual fee, two $5 late fees, and $25 interest in a year. Find the total cost.", "", "90", 4,
        "Add the annual fee, late fees and interest.", "Late fees = 2 × 5 = $10; total = 55 + 10 + 25 = $90.",
        ["$90"]),
      mcq("fee-m8", "Option P costs $5 800 in total and Option Q costs $6 100 in total. Which should you choose to pay the least?", "A",
        ["Option P", "Option Q", "either, they cost the same", "neither can be chosen"], 3,
        "Pick the smaller total cost.",
        "Option P ($5 800) has the lower total cost, so it is the cheaper choice."),
      ans("fee-m9", "Option X charges $400 interest and no fees. Option Y charges $250 interest and $200 in fees. Find the total cost of the cheaper option.", "", "400", 4,
        "Total cost of each, then pick the smaller.", "X = $400; Y = 250 + 200 = $450; the cheaper is X at $400.",
        ["$400"]),
      ans("fee-m10", "A personal loan charges $2 000 interest, a $300 establishment fee, and $8 monthly account fees over 12 months. Find the total cost.", "", "2396", 4,
        "Add interest and all fees.", "Monthly fees = 8 × 12 = $96; total = 2 000 + 300 + 96 = $2 396.",
        ["$2396"]),
    ],
    commonMistakes: [
      { mistake: "Comparing loans by interest rate alone.", fix: "Compare the total cost = interest + all fees over the same period." },
      { mistake: "Treating fees as part of the interest.", fix: "Fees are separate, additional charges; add them to interest for the total." },
      { mistake: "Forgetting to multiply ongoing fees over the period.", fix: "A monthly fee applies every month: multiply by the number of months." },
      { mistake: "Assuming the lowest rate is always cheapest.", fix: "High fees can make a low-rate option the dearer one." },
    ],
    masteryPassMark: 0.8,
  };
}
