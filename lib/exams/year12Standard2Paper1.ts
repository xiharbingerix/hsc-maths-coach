import type { ExamPaper } from "./types";

// Year 12 Mathematics Standard 2 — mini practice exam (Paper 1).
// Every answer SymPy-verified. Standard 2 uses the regular Band scale.
// Covers all five syllabus areas: Algebra, Measurement (incl. trig & rates),
// Financial Mathematics, Statistical Analysis, and Networks.
const REMEDIATION = "/course/year-12-standard-2";

export const year12Standard2Paper1: ExamPaper = {
  id: "y12-std2-paper-1",
  courseSlug: "year-12-standard-2",
  courseTitle: "Year 12 Mathematics Standard 2",
  title: "Practice Exam — Paper 1",
  description:
    "A short, timed Standard 2 paper across financial mathematics, measurement and trigonometry, statistical analysis and networks. Work under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 45,
  totalMarks: 24,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice. Choose the best answer.",
      questions: [
        {
          id: "y12s2-p1-q1",
          prompt:
            "$5000 is invested at 4% per annum compounded annually. What is the value after 3 years?",
          latex: "",
          marks: 1,
          difficulty: 3,
          topicSlug: "investment-compound-interest",
          topicTitle: "Compound interest",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$5624.32" },
            { label: "B", text: "$5600.00" },
            { label: "C", text: "$5849.29" },
            { label: "D", text: "$5200.00" },
          ],
          answer: "A",
          explanation:
            "$A = 5000(1.04)^3 = 5624.32$. (Choice B is simple interest, not compound.)",
        },
        {
          id: "y12s2-p1-q2",
          prompt:
            "A cordial mix uses cordial and water in the ratio 1:4. How much water is needed for 250 mL of cordial?",
          latex: "",
          marks: 1,
          difficulty: 3,
          topicSlug: "ratios-rates-unit-conversions",
          topicTitle: "Ratio and proportion",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "1000 mL" },
            { label: "B", text: "750 mL" },
            { label: "C", text: "500 mL" },
            { label: "D", text: "1250 mL" },
          ],
          answer: "A",
          explanation:
            "The water amount is 4 parts for every 1 part of cordial, so $4 \\times 250 = 1000$ mL.",
        },
        {
          id: "y12s2-p1-q3",
          prompt:
            "In a test with mean 70 and standard deviation 5, a student scored 80. What is their z-score?",
          latex: "",
          marks: 1,
          difficulty: 2,
          topicSlug: "normal-distribution-z-scores",
          topicTitle: "Z-scores",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "2" },
            { label: "B", text: "1" },
            { label: "C", text: "10" },
            { label: "D", text: "0.5" },
          ],
          answer: "A",
          explanation: "$z = \\dfrac{80 - 70}{5} = 2$.",
        },
        {
          id: "y12s2-p1-q4",
          prompt:
            "A triangle has two sides of length 8 cm and 10 cm with a 30° angle between them. Find its area.",
          latex: "",
          marks: 1,
          difficulty: 3,
          topicSlug: "sine-rule-cosine-rule-area-triangle",
          topicTitle: "Area of a triangle",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "20 cm²" },
            { label: "B", text: "40 cm²" },
            { label: "C", text: "34.6 cm²" },
            { label: "D", text: "80 cm²" },
          ],
          answer: "A",
          explanation:
            "$A = \\tfrac{1}{2}(8)(10)\\sin 30° = 40 \\times 0.5 = 20$ cm².",
        },
        {
          id: "y12s2-p1-q5",
          prompt:
            "A 2000 W heater runs for 3 hours. At $0.30 per kilowatt-hour, what is the cost?",
          latex: "",
          marks: 1,
          difficulty: 3,
          topicSlug: "energy-consumption-watts-kilowatts",
          topicTitle: "Energy consumption and cost",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$1.80" },
            { label: "B", text: "$18.00" },
            { label: "C", text: "$0.18" },
            { label: "D", text: "$6.00" },
          ],
          answer: "A",
          explanation:
            "2000 W = 2 kW. Energy = $2 \\times 3 = 6$ kWh. Cost = $6 \\times 0.30 = 1.80$.",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Enter each part's final answer.",
      questions: [
        {
          id: "y12s2-p1-q6",
          prompt:
            "A machine is bought for $24 000 and depreciates by 15% of its value each year (declining balance).",
          latex: "",
          marks: 3,
          difficulty: 5,
          topicSlug: "straight-line-vs-declining-depreciation",
          topicTitle: "Declining balance depreciation",
          remediationHref: REMEDIATION,
          explanation:
            "Decay factor $1 - 0.15 = 0.85$. After 1 year: $24000 \\times 0.85 = 20400$. After 4 years: $24000(0.85)^4 = 12528.15$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the decay factor.",
              marks: 1,
              answer: "0.85",
              explanation: "$1 - 0.15 = 0.85$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the value after 1 year, in dollars.",
              marks: 1,
              answer: "20400",
              acceptedAnswers: ["$20400", "20,400", "$20,400"],
              explanation: "$24000 \\times 0.85 = 20400$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the value after 4 years, to the nearest cent.",
              marks: 1,
              answer: "12528.15",
              acceptedAnswers: ["$12528.15", "12,528.15", "$12,528.15"],
              explanation: "$24000(0.85)^4 = 12528.15$.",
            },
          ],
        },
        {
          id: "y12s2-p1-q7",
          prompt:
            "In triangle ABC, side a = 7 cm, side b = 9 cm, and the included angle C = 110°.",
          latex: "",
          marks: 3,
          difficulty: 5,
          topicSlug: "sine-rule-cosine-rule-area-triangle",
          topicTitle: "The cosine rule",
          remediationHref: REMEDIATION,
          explanation:
            "$c^2 = 7^2 + 9^2 - 2(7)(9)\\cos 110° \\approx 173.1$, so $c \\approx 13.16$ cm.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt:
                "Which rule is needed to find side c — the sine rule or the cosine rule?",
              marks: 1,
              answer: "cosine rule",
              acceptedAnswers: ["cosine", "the cosine rule", "cos rule"],
              explanation:
                "Two sides and the included angle are known, so use the cosine rule.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the length of side c, to 2 decimal places (cm).",
              marks: 2,
              answer: "13.16",
              acceptedAnswers: ["13.16 cm", "13.2"],
              explanation:
                "$c = \\sqrt{7^2 + 9^2 - 2(7)(9)\\cos 110°} \\approx 13.16$ cm.",
            },
          ],
        },
        {
          id: "y12s2-p1-q8",
          prompt:
            "$2000 is deposited at the end of each year into an account earning 5% per annum, compounded annually, for 3 years.",
          latex: "",
          marks: 3,
          difficulty: 6,
          transfer: true,
          topicSlug: "annuities-regular-payments",
          topicTitle: "Future value of an annuity",
          remediationHref: REMEDIATION,
          explanation:
            "$FV = 2000\\left[\\dfrac{(1.05)^3 - 1}{0.05}\\right] = 2000 \\times 3.1525 = 6305$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt:
                "The first deposit earns interest for how many years before the end of the 3-year term?",
              marks: 1,
              answer: "2",
              acceptedAnswers: ["2 years"],
              explanation:
                "A deposit at the end of year 1 earns interest in years 2 and 3 — 2 years.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the future value of the annuity, in dollars.",
              marks: 2,
              answer: "6305",
              acceptedAnswers: ["$6305", "6305.00", "$6305.00"],
              explanation:
                "$FV = 2000\\left[\\dfrac{(1.05)^3 - 1}{0.05}\\right] = 6305$.",
            },
          ],
        },
        {
          id: "y12s2-p1-q9",
          prompt:
            "The masses of bags of flour are normally distributed with mean 60 g and standard deviation 8 g. Use the empirical (68–95–99.7%) rule.",
          latex: "",
          marks: 3,
          difficulty: 5,
          topicSlug: "normal-distribution-z-scores",
          topicTitle: "The empirical rule",
          remediationHref: REMEDIATION,
          explanation:
            "52 to 68 is $\\mu \\pm 1\\sigma$ → 68%. Above 76 g is beyond $\\mu + 2\\sigma$ → (100 − 95)/2 = 2.5%. Below 44 g is beyond $\\mu - 2\\sigma$ → 2.5%.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt:
                "What percentage of bags have a mass between 52 g and 68 g?",
              marks: 1,
              answer: "68",
              acceptedAnswers: ["68%"],
              explanation: "52 to 68 g is $\\mu \\pm 1\\sigma$, which is 68%.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "What percentage of bags have a mass greater than 76 g?",
              marks: 1,
              answer: "2.5",
              acceptedAnswers: ["2.5%"],
              explanation:
                "76 g is $\\mu + 2\\sigma$; above it is $(100 - 95)/2 = 2.5\\%$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "What percentage of bags have a mass less than 44 g?",
              marks: 1,
              answer: "2.5",
              acceptedAnswers: ["2.5%"],
              explanation:
                "44 g is $\\mu - 2\\sigma$; below it is $(100 - 95)/2 = 2.5\\%$.",
            },
          ],
        },
        {
          id: "y12s2-p1-q10",
          prompt:
            "A least-squares regression line for hours studied (x) and test score (y) is $y = 2.5x + 10$.",
          latex: "",
          marks: 3,
          difficulty: 5,
          topicSlug: "regression-prediction-residuals",
          topicTitle: "Regression and residuals",
          remediationHref: REMEDIATION,
          explanation:
            "At x = 8: $y = 2.5(8) + 10 = 30$. The slope means each extra hour adds 2.5 marks. Residual = actual − predicted = 33 − 30 = 3.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Predict the score for a student who studies 8 hours.",
              marks: 1,
              answer: "30",
              explanation: "$y = 2.5(8) + 10 = 30$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt:
                "By how many marks does the model predict the score rises for each extra hour studied?",
              marks: 1,
              answer: "2.5",
              acceptedAnswers: ["2.5 marks"],
              explanation: "The slope (2.5) is the rise in y per unit of x.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "A student who studied 8 hours actually scored 33. Find the residual.",
              marks: 1,
              answer: "3",
              explanation: "Residual = actual − predicted = $33 - 30 = 3$.",
            },
          ],
        },
      ],
    },
  ],
};
