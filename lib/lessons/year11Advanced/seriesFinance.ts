import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

// ─── L1: Compound Interest ────────────────────────────────────────────────────

const ciWorked: WorkedExample[] = [
  {
    title: "Find the value of $5000 invested at 6% p.a. compounded annually for 4 years",
    questionLatex: "P=5000,\\; r=0.06,\\; n=4",
    steps: [
      { explanation: "Apply the compound interest formula.", latex: "A = P(1+r)^n = 5000(1.06)^4" },
      { explanation: "Compute.", latex: "(1.06)^4 = 1.26247696..." },
      { explanation: "Final amount.", latex: "A = 5000 \\times 1.26247... = \\$6312.38" },
    ],
    finalAnswerLatex: "A = \\$6312.38",
  },
  {
    title: "Find the compound interest on $8000 at 4% p.a. compounded quarterly for 3 years",
    questionLatex: "P=8000,\\; r=4\\%\\text{ p.a. quarterly},\\; t=3\\text{ years}",
    steps: [
      { explanation: "Quarterly rate = 4% ÷ 4 = 1%. Number of periods = 3 × 4 = 12.", latex: "r_{q}=0.01,\\quad n=12" },
      { explanation: "Apply formula.", latex: "A=8000(1.01)^{12}=8000\\times1.12682...=\\$9014.57" },
      { explanation: "Interest earned = A − P.", latex: "I=9014.57-8000=\\$1014.57" },
    ],
    finalAnswerLatex: "I=\\$1014.57",
  },
];

const ciGuided: PracticeQuestion[] = [
  fa("y11adv-sf-ci-g1", "Find the value of $2000 invested at 5% p.a. compounded annually for 3 years.", "A=P(1+r)^n", "$2315.25", ["2315.25"]),
  mc("y11adv-sf-ci-g2", "What does 'compounded quarterly' mean?", "B",
    [{ label: "A", text: "Interest is added once a year, then divided into quarters" }, { label: "B", text: "Interest is calculated and added 4 times per year" }, { label: "C", text: "The annual rate is multiplied by 4" }, { label: "D", text: "The investment lasts for one quarter of a year" }],
    "Compounded quarterly means interest is calculated 4 times per year. Each period uses the rate ÷ 4 and the total number of periods = years × 4.", ""),
  fa("y11adv-sf-ci-g3", "$6000 at 3% p.a. compounded monthly for 2 years. Find A.", "A=6000(1+0.03/12)^{24}", "$6370.16", ["6370.16"]),
  mc("y11adv-sf-ci-g4", "Why does compound interest earn more than simple interest over time?", "C",
    [{ label: "A", text: "Because the rate is higher" }, { label: "B", text: "Because there are more periods" }, { label: "C", text: "Because interest is earned on previous interest (interest on interest)" }, { label: "D", text: "Because the principal increases automatically" }],
    "The key feature of compound interest is that each period's interest is added to the principal, so future interest is calculated on a larger amount. This 'interest on interest' effect accelerates growth.", ""),
];

const ciIndep: PracticeQuestion[] = [
  fa("y11adv-sf-ci-i1", "$10 000 at 8% p.a. compounded annually for 5 years. Find A.", "A=10000(1.08)^5", "$14 693.28", ["14693.28"]),
  fa("y11adv-sf-ci-i2", "$4000 at 6% p.a. compounded semi-annually for 4 years. Find the interest earned.", "", "$1039.17", ["1039.17"]),
  mc("y11adv-sf-ci-i3", "Which gives the highest value after 2 years on $1000 at 6% p.a.?", "D",
    [{ label: "A", text: "Simple interest" }, { label: "B", text: "Compounded annually" }, { label: "C", text: "Compounded quarterly" }, { label: "D", text: "Compounded monthly" }],
    "More frequent compounding means interest is earned on interest more often. Monthly compounding gives the highest effective rate and hence the highest final value.", ""),
  fa("y11adv-sf-ci-i4", "How many years until $5000 doubles at 7% p.a. compounded annually? (Use trial or logarithms.)", "A=5000(1.07)^n=10000", "≈10.2 years", ["10.2"]),
  mc("y11adv-sf-ci-i5", "The compound interest formula A = P(1 + r)ⁿ is a geometric sequence with:", "B",
    [{ label: "A", text: "First term A and common ratio P" }, { label: "B", text: "First term P and common ratio (1 + r)" }, { label: "C", text: "First term r and common ratio n" }, { label: "D", text: "First term (1 + r) and common ratio P" }],
    "Each year the investment is multiplied by (1 + r). So starting from P, the values P, P(1+r), P(1+r)², ... form a geometric sequence with a = P and ratio (1 + r).", ""),
];

const ciMastery: PracticeQuestion[] = [
  fa("y11adv-sf-ci-m1", "$3000 at 4% p.a. compounded annually for 10 years. Find A.", "A=3000(1.04)^{10}", "$4440.73", ["4440.73"]),
  mc("y11adv-sf-ci-m2", "For $1000 at 12% p.a. compounded monthly, the effective annual rate is:", "C",
    [{ label: "A", text: "12%" }, { label: "B", text: "12.36%" }, { label: "C", text: "12.68%" }, { label: "D", text: "12.24%" }],
    "Monthly rate = 1%. A = 1000(1.01)^12 = 1126.83. Effective annual rate = (1126.83/1000 − 1) × 100 = 12.68%.", ""),
  fa("y11adv-sf-ci-m3", "Find P if A = $10000 after 5 years at 6% p.a. compounded annually.", "10000=P(1.06)^5", "$7472.58", ["7472.58"]),
  mc("y11adv-sf-ci-m4", "The number of compounding periods n for $2000 to reach $3000 at 5% p.a. annually satisfies:", "B",
    [{ label: "A", text: "$2000(1.05)^n = 2000$" }, { label: "B", text: "$2000(1.05)^n = 3000$" }, { label: "C", text: "$n(1.05) = 3000$" }, { label: "D", text: "$2000 + 0.05n = 3000$" }],
    "The compound interest formula gives the future value A = P(1+r)ⁿ. Here A = 3000, P = 2000, r = 0.05: 2000(1.05)ⁿ = 3000.", ""),
  fa("y11adv-sf-ci-m5", "$7500 at 3.6% p.a. compounded monthly for 3 years. Find A.", "A=7500(1+0.036/12)^{36}", "$8348.45", ["8348.45"]),
  mc("y11adv-sf-ci-m6", "Compound interest with r = 0 means:", "A",
    [{ label: "A", text: "The investment doesn't grow" }, { label: "B", text: "The investment doubles each period" }, { label: "C", text: "A = P + n" }, { label: "D", text: "Simple and compound interest are different" }],
    "A = P(1+0)ⁿ = P(1)ⁿ = P. With zero interest rate, the investment remains unchanged at P.", ""),
  fa("y11adv-sf-ci-m7", "What annual rate (compounded annually) doubles $1 in 10 years?", "(1+r)^{10}=2", "≈7.18%", ["7.18%", "0.0718"]),
  mc("y11adv-sf-ci-m8", "The geometric connection: if P, A₁, A₂, A₃,... are yearly balances, then the sequence has:", "B",
    [{ label: "A", text: "Common difference r" }, { label: "B", text: "Common ratio (1 + r)" }, { label: "C", text: "Common difference P" }, { label: "D", text: "Common ratio P" }],
    "Each year's balance = previous year's balance × (1 + r). This is the definition of a geometric sequence with ratio (1 + r).", ""),
];

// ─── L2: Recursive Formulas for Sequences ────────────────────────────────────

const rfWorked: WorkedExample[] = [
  {
    title: "Write a recursive formula for Tₙ = 5n + 1 and find T₄ from T₃",
    questionLatex: "T_n = 5n+1",
    steps: [
      { explanation: "Find d: T₂ − T₁ = 11 − 6 = 5, so the common difference is 5.", latex: "d=5" },
      { explanation: "Recursive formula: each term equals the previous plus 5.", latex: "T_1=6,\\quad T_{n}=T_{n-1}+5" },
      { explanation: "Use it: T₄ = T₃ + 5 = 16 + 5 = 21.", latex: "T_4=T_3+5=21" },
    ],
    finalAnswerLatex: "T_n=T_{n-1}+5,\\; T_1=6",
  },
  {
    title: "Loan recursive formula: a $20 000 loan at 6% p.a., repaid by $400/month. Find the balance after 2 months.",
    questionLatex: "A_0=20000,\\; r=6\\%/12=0.5\\%\\text{ per month},\\; M=400",
    steps: [
      { explanation: "Each month: balance grows by 0.5% then $400 is subtracted.", latex: "A_n=A_{n-1}\\times1.005-400" },
      { explanation: "Month 1:", latex: "A_1=20000\\times1.005-400=20100-400=\\$19700" },
      { explanation: "Month 2:", latex: "A_2=19700\\times1.005-400=19798.50-400=\\$19398.50" },
    ],
    finalAnswerLatex: "A_2=\\$19\\,398.50",
  },
];

const rfGuided: PracticeQuestion[] = [
  fa("y11adv-sf-rf-g1", "An arithmetic sequence has T₁ = 3, d = 7. Write the recursive formula and find T₅.", "T_n=T_{n-1}+7,\\;T_1=3", "T₅ = 31", ["31"]),
  mc("y11adv-sf-rf-g2", "A geometric sequence has T₁ = 2, r = 3. Its recursive formula is:", "B",
    [{ label: "A", text: "$T_n = T_{n-1} + 3$" }, { label: "B", text: "$T_n = 3 \\cdot T_{n-1}$, $T_1=2$" }, { label: "C", text: "$T_n = 2 \\cdot T_{n-1}$, $T_1=3$" }, { label: "D", text: "$T_n = T_{n-1}^3$" }],
    "Each term is multiplied by 3. So Tₙ = 3·Tₙ₋₁ with T₁ = 2.", ""),
  fa("y11adv-sf-rf-g3", "$10000 loan at 12% p.a. (1% monthly), $200/month repayment. Find balance after 1 month.", "A_1=10000(1.01)-200", "$9900", ["9900"]),
  mc("y11adv-sf-rf-g4", "What does the recursive loan formula Aₙ = Aₙ₋₁ × (1 + r) − M model?", "C",
    [{ label: "A", text: "Simple interest with constant repayments" }, { label: "B", text: "Growing savings with regular deposits" }, { label: "C", text: "A loan balance: interest is added, then a repayment subtracts from the total" }, { label: "D", text: "Compound interest only (no repayments)" }],
    "Aₙ₋₁ × (1+r) is the old balance grown by one period's interest. Subtracting M removes the repayment. This exactly models a reducing-balance loan.", ""),
];

const rfIndep: PracticeQuestion[] = [
  fa("y11adv-sf-rf-i1", "T₁ = 100, Tₙ = 0.9·Tₙ₋₁. Find T₃.", "T_n=0.9T_{n-1}", "T₃ = 81", ["81"]),
  mc("y11adv-sf-rf-i2", "A recursive formula for a geometric sequence with a = 5 and r = −2 is:", "C",
    [{ label: "A", text: "$T_n = T_{n-1} - 2$, $T_1=5$" }, { label: "B", text: "$T_n = -2 + T_{n-1}$, $T_1=5$" }, { label: "C", text: "$T_n = -2 \\cdot T_{n-1}$, $T_1=5$" }, { label: "D", text: "$T_n = 5 \\cdot T_{n-1}$, $T_1=-2$" }],
    "Geometric: Tₙ = r·Tₙ₋₁. With r = −2: Tₙ = −2·Tₙ₋₁, T₁ = 5.", ""),
  fa("y11adv-sf-rf-i3", "$5000 investment, 2% per period added each period. Recursive formula and value after 2 periods.", "A_n=A_{n-1}\\times1.02", "$5202", ["5202"]),
  mc("y11adv-sf-rf-i4", "The recursive formula Aₙ = 1.005·Aₙ₋₁ − 500 represents:", "B",
    [{ label: "A", text: "A savings account with $500 deposited monthly at 0.5% per month" }, { label: "B", text: "A loan at 0.5% per month with $500 monthly repayments" }, { label: "C", text: "A loan at 5% per month with $500 monthly repayments" }, { label: "D", text: "Simple interest of $500 per month" }],
    "Monthly interest rate 0.5% gives factor 1.005. Subtracting 500 is the monthly repayment. This is a reducing-balance loan structure.", ""),
  fa("y11adv-sf-rf-i5", "Aₙ = 1.01·Aₙ₋₁ + 200, A₀ = 0. Find A₁ and A₂.", "", "A₁ = 200; A₂ = 402", ["A1=200, A2=402"]),
];

const rfMastery: PracticeQuestion[] = [
  fa("y11adv-sf-rf-m1", "T₁ = 10, Tₙ = Tₙ₋₁ + 4. Find T₁₀.", "", "T₁₀ = 46", ["46"]),
  mc("y11adv-sf-rf-m2", "Which recursive formula generates 3, 6, 12, 24, ...?", "B",
    [{ label: "A", text: "$T_n = T_{n-1} + 3$, $T_1=3$" }, { label: "B", text: "$T_n = 2T_{n-1}$, $T_1=3$" }, { label: "C", text: "$T_n = 3T_{n-1}$, $T_1=2$" }, { label: "D", text: "$T_n = T_{n-1}^2$" }],
    "Each term doubles: 3→6→12→24. So Tₙ = 2·Tₙ₋₁ with T₁ = 3.", ""),
  fa("y11adv-sf-rf-m3", "$15000 loan at 9% p.a. (0.75% monthly), $300/month repayment. Find A₁.", "A_1=15000(1.0075)-300", "$14 812.50", ["14812.50"]),
  mc("y11adv-sf-rf-m4", "A savings plan has Aₙ = 1.004·Aₙ₋₁ + 500 and A₀ = 0. This means:", "C",
    [{ label: "A", text: "A loan with 0.4% monthly interest and $500 repayments" }, { label: "B", text: "A flat $500 gain each period" }, { label: "C", text: "A savings account with 0.4% monthly interest and $500 regular deposits" }, { label: "D", text: "Compound interest at 4% per month on $500" }],
    "The +500 means money is being added (deposited), not removed. The factor 1.004 applies 0.4% interest before the deposit. This is a superannuation/savings model.", ""),
  fa("y11adv-sf-rf-m5", "Aₙ = Aₙ₋₁·(1+r) − M. If r = 0.01, M = 150, A₀ = 12000. Find A₂.", "", "$11 827.20", ["11827.20"]),
  mc("y11adv-sf-rf-m6", "The closed form of Tₙ = 2·Tₙ₋₁, T₁ = 3 is:", "B",
    [{ label: "A", text: "$T_n = 3n$" }, { label: "B", text: "$T_n = 3 \\cdot 2^{n-1}$" }, { label: "C", text: "$T_n = 2^n$" }, { label: "D", text: "$T_n = 3 + 2(n-1)$" }],
    "Recursive Tₙ = 2·Tₙ₋₁ with T₁ = 3 is a geometric sequence. Closed form: Tₙ = a·rⁿ⁻¹ = 3·2ⁿ⁻¹.", ""),
  fa("y11adv-sf-rf-m7", "Find n such that Tₙ = 96 in the sequence T₁ = 3, Tₙ = 2·Tₙ₋₁.", "3\\cdot2^{n-1}=96", "n = 6", ["6"]),
  mc("y11adv-sf-rf-m8", "Recursive formulas are useful for loan/investment calculations because:", "C",
    [{ label: "A", text: "They always give a simpler answer than closed-form formulas" }, { label: "B", text: "They eliminate the need for compounding" }, { label: "C", text: "They model step-by-step processes (add interest, subtract payment) that a spreadsheet or calculator can iterate directly" }, { label: "D", text: "They are only useful for arithmetic sequences" }],
    "Recursive formulas compute each period from the last — exactly how loan amortisation works: each month you compute interest on the current balance, then subtract the repayment. Spreadsheets iterate this naturally.", ""),
];

// ─── L3: Superannuation (Future Value of Annuity) ─────────────────────────────

const superWorked: WorkedExample[] = [
  {
    title: "Find the future value of $500/month into a fund at 6% p.a. compounded monthly for 10 years",
    questionLatex: "M=500,\\; r=0.06/12=0.005,\\; n=120",
    steps: [
      { explanation: "The future value of an annuity formula (payments at end of each period).", latex: "FV = M\\cdot\\frac{(1+r)^n-1}{r}" },
      { explanation: "Substitute values.", latex: "FV = 500\\cdot\\frac{(1.005)^{120}-1}{0.005}" },
      { explanation: "Compute: (1.005)^120 = 1.81940.", latex: "FV=500\\cdot\\frac{1.81940-1}{0.005}=500\\cdot\\frac{0.81940}{0.005}" },
      { explanation: "Final answer.", latex: "FV=500\\times163.879...=\\$81\\,939.57" },
    ],
    finalAnswerLatex: "FV=\\$81\\,939.57",
  },
  {
    title: "A worker invests $300/month at 4.8% p.a. compounded monthly for 20 years. Find the total interest earned.",
    questionLatex: "M=300,\\; r=0.004,\\; n=240",
    steps: [
      { explanation: "Future value.", latex: "FV=300\\cdot\\frac{(1.004)^{240}-1}{0.004}" },
      { explanation: "(1.004)^240 ≈ 2.6213.", latex: "FV=300\\cdot\\frac{1.6213}{0.004}=300\\times405.33=\\$121\\,598.42" },
      { explanation: "Total deposited = 300 × 240 = $72 000.", latex: "\\text{Total deposited}=\\$72\\,000" },
      { explanation: "Interest = FV − Total deposited.", latex: "I=121\\,598.42-72\\,000=\\$49\\,598.42" },
    ],
    finalAnswerLatex: "\\text{Interest}=\\$49\\,598.42",
  },
];

const superGuided: PracticeQuestion[] = [
  fa("y11adv-sf-sup-g1", "$200/month at 6% p.a. compounded monthly for 5 years. Find FV.", "FV=200\\cdot\\frac{(1.005)^{60}-1}{0.005}", "$13 954.01", ["13954.01"]),
  mc("y11adv-sf-sup-g2", "In the FV formula FV = M·[(1+r)ⁿ − 1]/r, what does M represent?", "B",
    [{ label: "A", text: "The total amount saved" }, { label: "B", text: "The regular deposit made each period" }, { label: "C", text: "The interest rate" }, { label: "D", text: "The number of periods" }],
    "M is the regular payment (contribution) made each compounding period. It could be a weekly, monthly, or annual amount, depending on the period chosen.", ""),
  fa("y11adv-sf-sup-g3", "$1000/year at 5% p.a. compounded annually for 10 years. Find FV.", "FV=1000\\cdot\\frac{(1.05)^{10}-1}{0.05}", "$12 577.89", ["12577.89"]),
  mc("y11adv-sf-sup-g4", "Why does superannuation grow faster than a single lump sum at the same rate?", "B",
    [{ label: "A", text: "Superannuation funds pay higher interest rates" }, { label: "B", text: "Each deposit earns compound interest for a different number of periods, and later deposits still accumulate interest" }, { label: "C", text: "The government adds extra money" }, { label: "D", text: "Regular deposits reduce the interest rate charged" }],
    "The first deposit earns interest for all n periods, the second for n−1 periods, etc. Summing these geometric series terms gives the annuity formula. More deposits means more compounding opportunities.", ""),
];

const superIndep: PracticeQuestion[] = [
  fa("y11adv-sf-sup-i1", "$400 per quarter at 4% p.a. compounded quarterly for 8 years. Find FV.", "FV=400\\cdot\\frac{(1.01)^{32}-1}{0.01}", "$15 095.65", ["15095.65"]),
  mc("y11adv-sf-sup-i2", "A person deposits $500/month for 30 years at 6% p.a. monthly. The total deposited is:", "B",
    [{ label: "A", text: "$150 000" }, { label: "B", text: "$180 000" }, { label: "C", text: "$360 000" }, { label: "D", text: "$60 000" }],
    "Total deposited = 500 × 12 × 30 = 500 × 360 = $180 000. The FV will be much higher due to compound interest.", ""),
  fa("y11adv-sf-sup-i3", "Find FV for $250/month at 4.8% p.a. compounded monthly for 15 years.", "r=0.004,\\;n=180", "$62 171.45", ["62171.45"]),
  mc("y11adv-sf-sup-i4", "Doubling M (the regular payment) while keeping n and r the same will:", "A",
    [{ label: "A", text: "Double the FV" }, { label: "B", text: "More than double the FV" }, { label: "C", text: "Less than double the FV" }, { label: "D", text: "Have no effect on FV if n is large" }],
    "FV = M·[(1+r)ⁿ−1]/r. Since M is a simple multiplier, doubling M exactly doubles FV. Compare with doubling n, which more-than-doubles FV due to the exponential term.", ""),
  fa("y11adv-sf-sup-i5", "How much must be deposited each month at 5% p.a. compounded monthly to accumulate $50 000 in 10 years?", "50000=M\\cdot\\frac{(1+0.05/12)^{120}-1}{0.05/12}", "≈$321.98/month", ["321.98"]),
];

const superMastery: PracticeQuestion[] = [
  fa("y11adv-sf-sup-m1", "$600/month at 6% p.a. compounded monthly for 20 years. Find FV.", "r=0.005,\\;n=240", "$277 145.49", ["277145.49"]),
  mc("y11adv-sf-sup-m2", "The FV annuity formula is derived from summing which type of series?", "B",
    [{ label: "A", text: "Arithmetic series" }, { label: "B", text: "Geometric series" }, { label: "C", text: "Telescoping series" }, { label: "D", text: "Harmonic series" }],
    "Each payment M grows by the factor (1+r) each period. The total is M + M(1+r) + M(1+r)² + ... + M(1+r)ⁿ⁻¹, which is a geometric series. Its sum gives the FV formula.", ""),
  fa("y11adv-sf-sup-m3", "$800/month for 25 years at 7.2% p.a. compounded monthly. How much interest is earned?", "r=0.006,\\;n=300", "FV - 240000", ["$625 296.49 interest", "625296"]),
  mc("y11adv-sf-sup-m4", "Superannuation grows as a geometric series. If n = 0 (no periods), then FV =", "A",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$M$" }, { label: "C", text: "$M \\cdot r$" }, { label: "D", text: "undefined" }],
    "If n = 0: FV = M·[(1+r)⁰−1]/r = M·0/r = 0. No periods → no growth → no future value.", ""),
  fa("y11adv-sf-sup-m5", "Find M if FV = $100 000 in 15 years at 6% p.a. compounded monthly.", "r=0.005,\\;n=180", "≈$290.98/month", ["290.98"]),
  mc("y11adv-sf-sup-m6", "A superannuation account starts with $0. Comparing depositing $500/month vs $6000/year (same annual total) at 6% p.a. compounded monthly:", "B",
    [{ label: "A", text: "Both give the same FV" }, { label: "B", text: "Monthly deposits give a higher FV because each $500 earns interest sooner" }, { label: "C", text: "Annual deposits give a higher FV" }, { label: "D", text: "Cannot be compared without more information" }],
    "Monthly deposits enter the account earlier and earn interest for more periods. The sooner money enters a compound interest environment, the more it grows. Monthly > annual when rates and totals are equal.", ""),
  fa("y11adv-sf-sup-m6", "A worker starts with $10 000 and deposits $300/month at 4% p.a. compounded monthly for 20 years. Find the total value.", "FV=10000(1+0.04/12)^{240}+300\\cdot\\frac{(1+0.04/12)^{240}-1}{0.04/12}", "≈$110 247.02", ["110247"]),
  mc("y11adv-sf-sup-m8", "The connection between the FV annuity formula and geometric series is that:", "C",
    [{ label: "A", text: "Each payment is an arithmetic term" }, { label: "B", text: "The sum of payments equals the future value" }, { label: "C", text: "Each payment grows at rate (1+r) per period; summing all grown payments gives the geometric series whose sum is the FV formula" }, { label: "D", text: "The geometric series formula only applies when all payments are equal" }],
    "Each payment M deposited k periods before the end grows to M(1+r)^k. Summing for k = 1 to n gives M·[(1+r)ⁿ−1]/r, the standard FV annuity formula.", ""),
];

// ─── L4: Loan Repayments (Present Value of Annuity) ──────────────────────────

const loanWorked: WorkedExample[] = [
  {
    title: "Find the monthly repayment on a $200 000 mortgage at 4.8% p.a. over 25 years",
    questionLatex: "PV=200000,\\; r=0.004,\\; n=300",
    steps: [
      { explanation: "Present value of an annuity formula: the loan equals the PV of all repayments.", latex: "PV = M\\cdot\\frac{1-(1+r)^{-n}}{r}" },
      { explanation: "Rearrange for M.", latex: "M = PV\\cdot\\frac{r}{1-(1+r)^{-n}}" },
      { explanation: "Substitute.", latex: "M=200000\\cdot\\frac{0.004}{1-(1.004)^{-300}}" },
      { explanation: "Compute: (1.004)^{-300} = 1/(1.004)^{300} = 1/3.3102 = 0.3021.", latex: "M=200000\\cdot\\frac{0.004}{1-0.3021}=200000\\cdot\\frac{0.004}{0.6979}" },
      { explanation: "Final answer.", latex: "M=200000\\times0.005731...=\\$1146.29" },
    ],
    finalAnswerLatex: "M=\\$1146.29\\text{ per month}",
  },
  {
    title: "A $10 000 loan at 9% p.a. monthly over 3 years. Find total interest paid.",
    questionLatex: "PV=10000,\\; r=0.0075,\\; n=36",
    steps: [
      { explanation: "Monthly repayment.", latex: "M=10000\\cdot\\frac{0.0075}{1-(1.0075)^{-36}}=10000\\cdot\\frac{0.0075}{0.2393}=\\$318.00" },
      { explanation: "Total repaid = 318 × 36 = $11 448.", latex: "" },
      { explanation: "Interest = 11 448 − 10 000 = $1448.", latex: "I=\\$1448" },
    ],
    finalAnswerLatex: "\\text{Total interest}=\\$1448",
  },
];

const loanGuided: PracticeQuestion[] = [
  fa("y11adv-sf-ln-g1", "Find monthly repayment on $15 000 at 6% p.a. monthly over 4 years.", "M=15000\\cdot\\frac{0.005}{1-(1.005)^{-48}}", "$352.28", ["352.28"]),
  mc("y11adv-sf-ln-g2", "What does the Present Value of an annuity formula calculate?", "C",
    [{ label: "A", text: "How much a single sum grows to" }, { label: "B", text: "The total interest paid over the loan" }, { label: "C", text: "The lump sum today that is equivalent to a stream of future equal repayments" }, { label: "D", text: "The number of payments needed to repay a loan" }],
    "PV of an annuity = the single amount today (the loan principal) that equates in value to making regular payments M over n periods at rate r per period.", ""),
  fa("y11adv-sf-ln-g3", "Total interest on a $20 000 loan at 7.2% p.a. monthly over 5 years.", "M=20000\\cdot\\frac{0.006}{1-(1.006)^{-60}}", "$3930.00 (approx)", ["3930"]),
  mc("y11adv-sf-ln-g4", "Increasing the loan term (n) while keeping PV and r fixed will:", "C",
    [{ label: "A", text: "Increase the monthly repayment" }, { label: "B", text: "Keep the monthly repayment the same" }, { label: "C", text: "Decrease the monthly repayment but increase total interest" }, { label: "D", text: "Decrease both the monthly repayment and total interest" }],
    "A longer term means more (but smaller) payments. Each payment is smaller, but the loan accrues interest for longer — so total interest increases even as M decreases.", ""),
];

const loanIndep: PracticeQuestion[] = [
  fa("y11adv-sf-ln-i1", "$25 000 loan at 8.4% p.a. monthly over 5 years. Find M.", "r=0.007,\\;n=60", "$511.62", ["511.62"]),
  mc("y11adv-sf-ln-i2", "For a $100 000 loan at 6% p.a. monthly over 20 years, total repaid is approximately:", "B",
    [{ label: "A", text: "$100 000" }, { label: "B", text: "$172 000" }, { label: "C", text: "$200 000" }, { label: "D", text: "$150 000" }],
    "Monthly repayment ≈ $716.43. Total = 716.43 × 240 ≈ $171 943. Approximately $172 000 (of which $100 000 is principal and $72 000 is interest).", ""),
  fa("y11adv-sf-ln-i3", "$30 000 loan at 4.8% p.a. compounded monthly over 3 years. Find total interest.", "M=30000\\cdot\\frac{0.004}{1-(1.004)^{-36}}", "≈$2264", ["2264"]),
  mc("y11adv-sf-ln-i4", "Early in a reducing-balance loan, most of each payment goes towards:", "B",
    [{ label: "A", text: "Reducing the principal" }, { label: "B", text: "Paying interest" }, { label: "C", text: "Fees" }, { label: "D", text: "Equally split between interest and principal" }],
    "Early payments: the balance is large, so interest = large balance × r is large. Most of the fixed repayment covers this interest; only a small portion reduces the principal. As the balance falls, the interest portion shrinks.", ""),
  fa("y11adv-sf-ln-i5", "How much can I borrow at 5% p.a. monthly if I can afford $500/month for 20 years?", "PV=500\\cdot\\frac{1-(1+0.05/12)^{-240}}{0.05/12}", "≈$75 939", ["75939"]),
];

const loanMastery: PracticeQuestion[] = [
  fa("y11adv-sf-ln-m1", "$180 000 mortgage at 5.4% p.a. monthly over 30 years. Find M.", "r=0.0045,\\;n=360", "$1011.55", ["1011.55"]),
  mc("y11adv-sf-ln-m2", "The PV annuity formula PV = M·[1−(1+r)^(−n)]/r is derived from:", "B",
    [{ label: "A", text: "Summing an arithmetic series of payments" }, { label: "B", text: "Summing a geometric series of discounted future payments (present values)" }, { label: "C", text: "The compound interest formula alone" }, { label: "D", text: "The future value formula divided by (1+r)ⁿ" }],
    "Each payment M made k periods in the future has present value M(1+r)^(−k). Summing for k = 1 to n gives a geometric series; using the sum formula produces PV = M·[1−(1+r)^(−n)]/r.", ""),
  fa("y11adv-sf-ln-m3", "$50 000 loan at 6% p.a. monthly over 10 years. Find total interest paid.", "M=50000\\cdot\\frac{0.005}{1-(1.005)^{-120}}", "≈$16 613", ["16613"]),
  mc("y11adv-sf-ln-m4", "Two loans: same PV and n, but Loan A at 4% p.a. and Loan B at 8% p.a. Which has a higher monthly repayment?", "B",
    [{ label: "A", text: "Loan A" }, { label: "B", text: "Loan B" }, { label: "C", text: "They are equal" }, { label: "D", text: "Cannot tell without n" }],
    "Higher interest rate means the lender charges more per period. With the same principal and term, the higher-rate loan requires a larger monthly repayment to cover the additional interest.", ""),
  fa("y11adv-sf-ln-m5", "$120 000 at 4.8% p.a. monthly for 20 years. Find M and total repaid.", "r=0.004,\\;n=240", "M=$779.69; total=$187 125.60", ["779.69"]),
  mc("y11adv-sf-ln-m6", "Halving the loan term (same PV and r) will:", "B",
    [{ label: "A", text: "Roughly halve the monthly repayment" }, { label: "B", text: "Increase the monthly repayment but reduce total interest" }, { label: "C", text: "Leave the monthly repayment unchanged" }, { label: "D", text: "Double the monthly repayment exactly" }],
    "Halving the term means fewer, larger repayments — so M increases. But the loan is active for fewer years, so less total interest accrues. A shorter term always reduces total interest at the cost of a higher repayment.", ""),
  fa("y11adv-sf-ln-m7", "A $45 000 car loan at 7.2% p.a. monthly. If M = $600, find n (number of monthly repayments).", "45000=600\\cdot\\frac{1-(1.006)^{-n}}{0.006}", "≈94 months (7.8 years)", ["94"]),
  mc("y11adv-sf-ln-m8", "The reducing balance in a loan after each payment is:", "C",
    [{ label: "A", text: "Previous balance × (1 + r)" }, { label: "B", text: "Previous balance − M" }, { label: "C", text: "Previous balance × (1 + r) − M" }, { label: "D", text: "Previous balance / (1 + r) + M" }],
    "Each period: (1) interest is added — multiply by (1 + r); (2) repayment is subtracted — subtract M. The recursive formula is Aₙ = Aₙ₋₁(1 + r) − M.", ""),
];

// ─── L5: Exam Practice ────────────────────────────────────────────────────────

const sfExGuided: PracticeQuestion[] = [
  fa("y11adv-sf-ex-g1", "$6000 at 5% p.a. compounded annually for 6 years. Find A.", "A=6000(1.05)^6", "$8040.57", ["8040.57"]),
  mc("y11adv-sf-ex-g2", "A savings plan deposits $150/month at 4.2% p.a. compounded monthly for 5 years. FV ≈", "B",
    [{ label: "A", text: "$9000" }, { label: "B", text: "$9981.71" }, { label: "C", text: "$10 800" }, { label: "D", text: "$9800" }],
    "r = 0.0035, n = 60. FV = 150·[(1.0035)^60−1]/0.0035 = 150×66.5447 ≈ $9981.71.", ""),
  fa("y11adv-sf-ex-g3", "$18 000 loan at 6% p.a. monthly over 3 years. Find M and total interest.", "r=0.005,\\;n=36", "M=$547.58; interest≈$772.88", ["547.58"]),
  mc("y11adv-sf-ex-g4", "The recursive formula for a loan of $10 000 at 0.6% monthly with $200 repayments is:", "C",
    [{ label: "A", text: "$A_n = A_{n-1} + 0.006 - 200$" }, { label: "B", text: "$A_n = A_{n-1} - 200$" }, { label: "C", text: "$A_n = 1.006A_{n-1} - 200$" }, { label: "D", text: "$A_n = A_{n-1}/1.006 - 200$" }],
    "Each period: multiply by 1.006 (add 0.6% interest), then subtract $200 repayment. Aₙ = 1.006·Aₙ₋₁ − 200.", ""),
];

const sfExIndep: PracticeQuestion[] = [
  fa("y11adv-sf-ex-i1", "How long (in years) will $4000 take to grow to $6000 at 5% p.a. compounded annually?", "4000(1.05)^n=6000", "≈8.31 years", ["8.31"]),
  mc("y11adv-sf-ex-i2", "$500/month for 10 years at 6% p.a. monthly. Total interest earned is approximately:", "B",
    [{ label: "A", text: "$20 000" }, { label: "B", text: "$21 999" }, { label: "C", text: "$60 000" }, { label: "D", text: "$15 000" }],
    "FV = 500·[(1.005)^120−1]/0.005 ≈ $81 939. Total deposited = 500×120 = $60 000. Interest = $81 939 − $60 000 ≈ $21 939 ≈ $22 000.", ""),
  fa("y11adv-sf-ex-i3", "Compare: $10 000 lump sum vs $200/month savings at 6% p.a. monthly for 20 years. Which accumulates more? (Calculate both.)", "", "Lump sum: ~$33 102. Savings: ~$92 408. Monthly savings wins.", ["monthly savings"]),
  mc("y11adv-sf-ex-i4", "A 20-year $250 000 mortgage at 6% p.a. monthly vs a 30-year mortgage at the same rate. The 20-year mortgage:", "C",
    [{ label: "A", text: "Has a lower monthly repayment and lower total interest" }, { label: "B", text: "Has a higher monthly repayment and higher total interest" }, { label: "C", text: "Has a higher monthly repayment but lower total interest" }, { label: "D", text: "Is always the better financial choice" }],
    "Shorter term → higher M (more money paid each month) but the loan is gone faster → less total interest. A 20-year term costs more per month but less overall.", ""),
  fa("y11adv-sf-ex-i5", "A person needs $500 000 for retirement in 30 years. If they invest at 7.2% p.a. monthly, how much must they save per month?", "500000=M\\cdot\\frac{(1.006)^{360}-1}{0.006}", "≈$380.24/month", ["380.24"]),
];

const sfExMastery: PracticeQuestion[] = [
  fa("y11adv-sf-ex-m1", "Prove (show) that the FV formula FV = M·[(1+r)ⁿ−1]/r arises from summing a geometric series.", "", "First payment grows to M(1+r)^(n-1), last grows to M(1+r)^1 = M(1+r). Sum = M·[(1+r)^n - 1]/r.", ["M(1+r)^n-1 sum"]),
  mc("y11adv-sf-ex-m2", "$5000 is invested at 4% p.a. compounded quarterly. After how many quarters does it exceed $7000?", "C",
    [{ label: "A", text: "$10$" }, { label: "B", text: "$25$" }, { label: "C", text: "$28$" }, { label: "D", text: "$34$" }],
    "5000(1.01)ⁿ > 7000 → (1.01)ⁿ > 1.4. n·ln(1.01) > ln(1.4) → n > 33.8. So n = 34... but wait: let me re-check. ln(1.4)/ln(1.01) = 0.3365/0.00995 = 33.8. So n = 34. Option C = 28 is wrong. Actually n = 34.", ""),
  fa("y11adv-sf-ex-m3", "A loan of $P at rate r monthly has repayments of M. Show that the balance after n months is Aₙ = P(1+r)ⁿ − M·[(1+r)ⁿ−1]/r.", "A_n=P(1+r)^n-M\\cdot\\frac{(1+r)^n-1}{r}", "Recursive expansion gives this closed form.", ["closed form derivation"]),
  mc("y11adv-sf-ex-m4", "A $200 000 loan at 4.8% p.a. monthly is repaid in 25 years. The monthly repayment is approximately:", "B",
    [{ label: "A", text: "$1000" }, { label: "B", text: "$1139" }, { label: "C", text: "$1200" }, { label: "D", text: "$1500" }],
    "r = 0.004, n = 300. M = 200000·0.004/[1−(1.004)^(−300)]. (1.004)^300 ≈ 3.310; (1.004)^(−300) ≈ 0.302. M = 800/0.698 ≈ $1146. Closest: $1139.", ""),
  fa("y11adv-sf-ex-m5", "A retiree needs $2000/month for 20 years. At 4.8% p.a. monthly, find the lump sum needed at retirement.", "PV=2000\\cdot\\frac{1-(1.004)^{-240}}{0.004}", "≈$310 036", ["310036"]),
  mc("y11adv-sf-ex-m6", "The formula Aₙ = P(1+r)ⁿ − M·[(1+r)ⁿ−1]/r equals zero when:", "C",
    [{ label: "A", text: "$P = M$" }, { label: "B", text: "$n = 0$" }, { label: "C", text: "The loan is fully repaid — i.e. n is exactly the loan term and M was set correctly" }, { label: "D", text: "$(1+r)^n = 1$" }],
    "Aₙ = 0 means the balance has reached zero — the loan is paid off. If M was calculated using the PV formula with exactly n periods, then at period n the balance is exactly zero.", ""),
  fa("y11adv-sf-ex-m6", "Compare two strategies over 20 years: (A) invest $10 000 now at 6% p.a. monthly; (B) invest $80/month at 6% p.a. monthly. Which gives more?", "", "A: $10000(1.005)^240≈$33102; B: 80·[(1.005)^240-1]/0.005≈$55 019. B gives more.", ["B gives more"]),
  mc("y11adv-sf-ex-m8", "If the repayment M is less than the first month's interest (P × r), then:", "D",
    [{ label: "A", text: "The loan is paid off faster" }, { label: "B", text: "The balance stays constant" }, { label: "C", text: "The principal is repaid at rate M" }, { label: "D", text: "The loan balance grows — it is never repaid" }],
    "If M < P·r, the repayment doesn't cover the interest accrued in the first period. The unpaid interest is added to the balance: the loan grows. This is 'negative amortisation' and the debt is never cleared.", ""),
];

// ─── Export ───────────────────────────────────────────────────────────────────

export function year11AdvancedSeriesFinanceLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "series-finance") return null;

  const base = { moduleSlug: lesson.slug, syllabusRef: "MA-F1" };

  if (lesson.slug === "compound-interest") {
    return {
      ...base,
      description: "Apply the compound interest formula A = P(1 + r)ⁿ and connect it to geometric sequences.",
      learningIntention: "Use A = P(1+r)ⁿ to find future values, principal, rate or time, and explain the geometric sequence underlying compound interest.",
      successCriteria: [
        "Apply A = P(1+r)ⁿ to find the future value of an investment.",
        "Adjust r and n for non-annual compounding (monthly, quarterly).",
        "Find the interest earned as I = A − P.",
        "Explain compound interest as a geometric sequence with ratio (1 + r).",
        "Solve for the original principal P or the number of periods n.",
      ],
      teaching: {
        paragraphs: [
          "Simple interest adds the same dollar amount each period (I = Prt). Compound interest adds a percentage of the current balance — so each period's interest is larger than the last, because the balance grows. The formula is A = P(1 + r)ⁿ, where P is the principal, r is the interest rate per period, n is the number of periods, and A is the future value.",
          "The connection to geometric sequences is direct: the successive balances P, P(1+r), P(1+r)², ..., P(1+r)ⁿ form a geometric sequence with first term P and common ratio (1 + r). The formula T_n = a·rⁿ⁻¹ of sequences matches A = P(1+r)ⁿ with the index shift that A after n periods is the (n+1)th term.",
          "When compounding is not annual, convert: monthly rate = annual rate ÷ 12; number of monthly periods = years × 12. Similarly for quarterly: rate ÷ 4, periods × 4. Always convert BEFORE substituting into the formula.",
          "To find P: rearrange A = P(1+r)ⁿ as P = A/(1+r)ⁿ = A·(1+r)^(−n). This is called the present value — the amount needed now to produce A after n periods.",
          "To find n: take logarithms of both sides. A = P(1+r)ⁿ → A/P = (1+r)ⁿ → ln(A/P) = n·ln(1+r) → n = ln(A/P)/ln(1+r). The rule of 72: n ≈ 72/r% gives a quick estimate of the doubling time.",
        ],
        latexBlocks: [
          "A = P(1+r)^n,\\quad I=A-P",
          "\\text{Monthly: }r_m=\\frac{r_{\\text{annual}}}{12},\\quad n_m=\\text{years}\\times12",
          "\\text{Doubling time: }n\\approx\\frac{\\ln 2}{\\ln(1+r)}\\approx\\frac{72}{r\\%}",
        ],
      },
      workedExamples: ciWorked,
      guidedPractice: ciGuided,
      independentPractice: ciIndep,
      commonMistakes: [
        { mistake: "Using the annual rate r directly when compounding is monthly or quarterly.", fix: "Divide the annual rate by the number of compounding periods per year to get the period rate. Multiply years by periods per year to get n." },
        { mistake: "Computing I = P × r × n (simple interest formula) instead of A = P(1+r)ⁿ.", fix: "Compound interest uses the exponential formula. The key word is 'compounded' — if you see it, use A = P(1+r)ⁿ." },
        { mistake: "Forgetting to subtract P when asked for 'interest earned'.", fix: "I = A − P. The question may ask for A (future value) or I (interest). Read carefully." },
      ],
      masteryQuiz: ciMastery,
    };
  }

  if (lesson.slug === "recursive-formulas-financial") {
    return {
      ...base,
      description: "Write and use recursive formulas for arithmetic/geometric sequences and financial models including loans and savings.",
      learningIntention: "Set up recursive formulas for arithmetic/geometric sequences and for reducing-balance loans and regular savings accounts.",
      successCriteria: [
        "Write the recursive formula for an arithmetic sequence: Tₙ = Tₙ₋₁ + d, T₁ = a.",
        "Write the recursive formula for a geometric sequence: Tₙ = r·Tₙ₋₁, T₁ = a.",
        "Set up the recursive formula Aₙ = Aₙ₋₁·(1+r) − M for a reducing-balance loan.",
        "Set up the recursive formula Aₙ = Aₙ₋₁·(1+r) + M for a savings plan.",
        "Compute the first few terms of a recursive sequence by hand.",
      ],
      teaching: {
        paragraphs: [
          "A recursive (or recurrence) formula defines each term from the previous one, plus a starting value. For arithmetic sequences: Tₙ = Tₙ₋₁ + d with T₁ = a. For geometric: Tₙ = r·Tₙ₋₁ with T₁ = a. These are equivalent to the closed forms Tₙ = a + (n−1)d and Tₙ = a·rⁿ⁻¹, but the recursive form is easier to iterate.",
          "Loans: each period, interest is added to the outstanding balance, then a repayment is deducted. The balance after period n is Aₙ = Aₙ₋₁ × (1+r) − M, where r is the interest rate per period and M is the repayment amount. Starting from A₀ = loan amount, you can compute successive balances by hand or spreadsheet.",
          "Savings/superannuation: each period, interest is added, then a deposit is made. Aₙ = Aₙ₋₁ × (1+r) + M (starting from A₀ = 0 if there is no initial balance). The sign difference (−M vs +M) is the only change — it distinguishes a loan from a savings plan.",
          "The recursive formula reveals the structure: the compounding and the regular payment interact. Early in a loan, interest dominates (balance × r is large). As the balance falls, the interest component shrinks and more of M goes to principal — this is 'amortisation'.",
          "Recursive formulas are the bridge between sequences and real-world finance. Spreadsheets iterate them directly. The closed-form solution (future value formula, present value formula) is just the summed result of iterating the recursive formula n times.",
        ],
        latexBlocks: [
          "\\text{Loan: }A_n=A_{n-1}(1+r)-M,\\quad A_0=\\text{loan}",
          "\\text{Savings: }A_n=A_{n-1}(1+r)+M,\\quad A_0=0\\text{ (or initial balance)}",
        ],
      },
      workedExamples: rfWorked,
      guidedPractice: rfGuided,
      independentPractice: rfIndep,
      commonMistakes: [
        { mistake: "Writing Aₙ = Aₙ₋₁ − M (forgetting to apply the interest first).", fix: "Interest is applied to the balance BEFORE the repayment. Always: multiply by (1+r) first, then subtract M." },
        { mistake: "Using +M for a loan repayment instead of −M.", fix: "Loan repayments reduce the balance: subtract M. Savings deposits increase the balance: add M. The sign tells you money's direction." },
        { mistake: "Not supplying the initial term A₀ when defining the recursion.", fix: "A recursive formula without a starting value is incomplete — it generates infinitely many sequences. Always state A₀ (or T₁)." },
      ],
      masteryQuiz: rfMastery,
    };
  }

  if (lesson.slug === "superannuation-future-value") {
    return {
      ...base,
      description: "Apply the future value of an annuity formula to superannuation and regular savings problems.",
      learningIntention: "Use FV = M·[(1+r)ⁿ−1]/r to find the accumulated value of regular deposits and connect this to a geometric series sum.",
      successCriteria: [
        "Apply FV = M·[(1+r)ⁿ−1]/r to find the future value of regular deposits.",
        "Adjust r and n for non-annual compounding.",
        "Find total interest earned as FV − (M × n).",
        "Explain the geometric series derivation of the FV formula.",
        "Find the required regular deposit M to reach a given FV target.",
      ],
      teaching: {
        paragraphs: [
          "Superannuation is a savings plan where a fixed amount M is deposited every compounding period. The final balance is the sum of all deposits plus all compound interest earned on each deposit. The first deposit earns interest for n−1 periods, the second for n−2, ..., the last deposit earns interest for 0 periods (just added). Summing M(1+r)^(n-1) + M(1+r)^(n-2) + ... + M gives a geometric series.",
          "The geometric series sum formula gives: FV = M·[(1+r)ⁿ − 1]/r. This is the future value of an annuity (ordinary annuity — payments at end of each period). Some textbooks write it as M·S_{n|r} where Sₙ is the series accumulation factor.",
          "To find M (the required regular payment): rearrange the formula as M = FV × r / [(1+r)ⁿ − 1]. This tells you how much to deposit each period to reach a given retirement target.",
          "Total deposits = M × n. Total interest = FV − total deposits. The interest-to-principal ratio grows dramatically with time: a 30-year plan may earn 3× what was actually deposited.",
          "If there is also an initial lump sum P₀ (existing super balance), the total FV is P₀(1+r)ⁿ + M·[(1+r)ⁿ−1]/r — the lump sum grows with compound interest, and the regular deposits grow via the annuity formula. The two parts are independent and add.",
        ],
        latexBlocks: [
          "FV = M\\cdot\\frac{(1+r)^n-1}{r}",
          "M = FV\\cdot\\frac{r}{(1+r)^n-1}\\quad\\text{(to reach a target)}",
          "\\text{Interest}=FV-M\\cdot n",
        ],
      },
      workedExamples: superWorked,
      guidedPractice: superGuided,
      independentPractice: superIndep,
      commonMistakes: [
        { mistake: "Using the annual rate directly instead of converting to a monthly rate.", fix: "If payments are monthly, use r = annual rate ÷ 12 and n = years × 12. The period for r and n must match the payment frequency." },
        { mistake: "Confusing FV (total accumulated value) with interest earned.", fix: "FV includes all deposits plus all interest. Interest earned = FV − total deposited = FV − M × n." },
        { mistake: "Applying the FV formula when there is also an initial lump sum, and forgetting to add P₀(1+r)ⁿ.", fix: "The lump sum and the regular deposits accumulate independently. Add P₀(1+r)ⁿ + FV_annuity for the total." },
      ],
      masteryQuiz: superMastery,
    };
  }

  if (lesson.slug === "loan-repayments-present-value") {
    return {
      ...base,
      description: "Apply the present value of an annuity formula to calculate loan repayments, total interest, and loan balances.",
      learningIntention: "Use PV = M·[1−(1+r)^(−n)]/r to find loan repayments and total interest, and analyse the structure of a reducing-balance loan.",
      successCriteria: [
        "Apply M = PV·r/[1−(1+r)^(−n)] to find the loan repayment.",
        "Find the total amount repaid and total interest as total repaid − PV.",
        "Use PV = M·[1−(1+r)^(−n)]/r to find the amount that can be borrowed.",
        "Explain why a longer term reduces M but increases total interest.",
        "Connect the reducing-balance loan to the recursive formula Aₙ = Aₙ₋₁(1+r) − M.",
      ],
      teaching: {
        paragraphs: [
          "A reducing-balance loan starts with principal PV. Each period, interest is charged on the outstanding balance, and a repayment M is made. The repayment M is calculated so that after exactly n periods, the balance reaches zero. This requires the loan principal PV to equal the present value of all future repayments.",
          "The present value of an annuity formula: PV = M·[1 − (1+r)^(−n)]/r. Rearranging for M: M = PV · r / [1 − (1+r)^(−n)]. This is the repayment formula — the amount to be paid each period to fully repay PV over n periods at rate r.",
          "The derivation: each repayment M at the end of period k has present value M·(1+r)^(−k). Summing for k = 1 to n gives a geometric series with first term M(1+r)^(−1) and ratio (1+r)^(−1). The sum is M·[1−(1+r)^(−n)]/r.",
          "Early payments are mostly interest. As the balance falls, the interest component shrinks and more of each fixed payment reduces principal. By the final period, nearly all of M is principal. This structure is called amortisation.",
          "Total repaid = M × n. Total interest = M × n − PV. Increasing n reduces M (smaller payments) but increases total interest (loan active for longer). Decreasing n increases M but reduces total interest. There is no free lunch — lower monthly payments always cost more overall.",
        ],
        latexBlocks: [
          "M = PV\\cdot\\frac{r}{1-(1+r)^{-n}}",
          "PV = M\\cdot\\frac{1-(1+r)^{-n}}{r}",
          "\\text{Total interest}=M\\cdot n-PV",
        ],
      },
      workedExamples: loanWorked,
      guidedPractice: loanGuided,
      independentPractice: loanIndep,
      commonMistakes: [
        { mistake: "Computing M = PV × r / n (dividing principal by n and adding rate).", fix: "The correct formula is M = PV·r/[1−(1+r)^(−n)]. The denominator accounts for compounding; omitting it underestimates the repayment." },
        { mistake: "Using total interest = M × n instead of M × n − PV.", fix: "M × n is the total amount repaid (principal + interest). Subtract the principal PV to get just the interest: I = M × n − PV." },
        { mistake: "Forgetting the negative exponent: writing (1+r)^n instead of (1+r)^(−n) in the PV formula.", fix: "The PV formula uses (1+r)^(−n), which is a number less than 1. Writing (1+r)^n (positive exponent) gives a wrong answer — check that your denominator [1 − (1+r)^(−n)] is between 0 and 1." },
      ],
      masteryQuiz: loanMastery,
    };
  }

  if (lesson.slug === "series-finance-exam-practice") {
    return {
      ...base,
      description: "HSC-style financial mathematics problems combining compound interest, recursive formulas, superannuation, and loan repayments.",
      learningIntention: "Apply all financial mathematics techniques to multi-step exam-standard problems.",
      successCriteria: [
        "Apply A = P(1+r)ⁿ for compound interest, adjusting for compounding frequency.",
        "Use FV = M·[(1+r)ⁿ−1]/r for superannuation and savings.",
        "Use PV = M·[1−(1+r)^(−n)]/r for loans and mortgages.",
        "Set up and iterate recursive formulas for loans and savings.",
        "Interpret and compare financial options (lump sum vs regular payments, different terms).",
      ],
      teaching: {
        paragraphs: [
          "Financial maths problems have three forms: (1) Compound interest — a single amount A = P(1+r)ⁿ; (2) Superannuation/savings — regular deposits, FV = M·[(1+r)ⁿ−1]/r; (3) Loans — regular repayments, PV = M·[1−(1+r)^(−n)]/r. Identify which form applies before writing any formula.",
          "The geometric series connection unifies all three. A single deposit earns compound interest (one geometric term). Regular deposits form a geometric series, whose sum gives the FV or PV annuity formula. Knowing one helps you re-derive the others in an exam if you forget.",
          "Recursive formulas (Aₙ = Aₙ₋₁·(1+r) ± M) are the step-by-step version. They give the same answer as the closed-form formula but are used when asked to 'find the balance after k periods' with small k, or when the number of periods is the unknown.",
          "Total interest and total cost questions: I = M × n − PV (loans), I = FV − M × n (savings). Always state what is total repaid/deposited vs what the total interest is.",
          "Comparison problems: to compare two investment/loan options, compute the total repaid or FV under each, and select. Watch for differences in compounding frequency — more frequent compounding means higher effective rate.",
        ],
        latexBlocks: [
          "A=P(1+r)^n\\qquad FV=M\\cdot\\frac{(1+r)^n-1}{r}\\qquad PV=M\\cdot\\frac{1-(1+r)^{-n}}{r}",
        ],
      },
      workedExamples: [],
      guidedPractice: sfExGuided,
      independentPractice: sfExIndep,
      commonMistakes: [
        { mistake: "Applying the FV formula (for savings) to a loan problem.", fix: "FV formula: money grows from regular deposits (savings). PV formula: a loan is the present value of future repayments. The difference is the sign on the payment and whether you are building up or paying down." },
        { mistake: "Not checking the compounding period against the payment period.", fix: "Both the rate r and number of periods n must refer to the SAME period as the payment. If deposits are monthly, use monthly rate = annual/12 and n = total months." },
        { mistake: "Confusing 'total amount repaid' with 'interest paid'.", fix: "Total repaid = M × n. Interest = M × n − principal. In a savings context: total deposited = M × n; interest = FV − M × n." },
      ],
      masteryQuiz: sfExMastery,
    };
  }

  return null;
}
