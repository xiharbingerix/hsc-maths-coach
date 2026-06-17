import type { ExamPaper } from "./types";

// Year 11 Mathematics Standard — mini practice exam (Paper 1).
// Every answer SymPy-verified. Year 11 Standard uses the regular Band scale.
// Covers algebra/linear models, financial maths, measurement, data analysis
// and probability — the practical Standard strands.
const REMEDIATION = "/course/year-11-standard";

export const year11StandardPaper1: ExamPaper = {
  id: "y11-std-paper-1",
  courseSlug: "year-11-standard",
  courseTitle: "Year 11 Mathematics Standard",
  title: "Practice Exam — Paper 1",
  description:
    "A short, timed Year 11 Standard paper across financial mathematics, linear models, measurement, data analysis and probability. Work under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 40,
  totalMarks: 22,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice. Choose the best answer.",
      questions: [
        {
          id: "y11s-p1-q1",
          prompt:
            "$2000 is invested at 4% per annum simple interest. How much interest is earned in 3 years?",
          latex: "I = Prn",
          marks: 1,
          difficulty: 2,
          topicSlug: "simple-interest",
          topicTitle: "Simple interest",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$240" },
            { label: "B", text: "$2240" },
            { label: "C", text: "$80" },
            { label: "D", text: "$2400" },
          ],
          answer: "A",
          explanation: "$I = Prn = 2000 \\times 0.04 \\times 3 = 240$.",
        },
        {
          id: "y11s-p1-q2",
          prompt:
            "An item costs $88 including 10% GST. How much GST is included in the price?",
          latex: "\\text{GST} = \\dfrac{\\text{inclusive price}}{11}",
          marks: 1,
          difficulty: 3,
          topicSlug: "gst-discounts-consumer-arithmetic",
          topicTitle: "GST",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$8" },
            { label: "B", text: "$8.80" },
            { label: "C", text: "$80" },
            { label: "D", text: "$9.78" },
          ],
          answer: "A",
          explanation:
            "GST included = $\\dfrac{88}{11} = 8$. (The pre-GST price is $80.)",
        },
        {
          id: "y11s-p1-q3",
          prompt:
            "A car travels 150 km in 2.5 hours. What is its average speed?",
          latex: "\\text{speed} = \\dfrac{\\text{distance}}{\\text{time}}",
          marks: 1,
          difficulty: 2,
          topicSlug: "speed-distance-time",
          topicTitle: "Speed, distance and time",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "60 km/h" },
            { label: "B", text: "75 km/h" },
            { label: "C", text: "375 km/h" },
            { label: "D", text: "50 km/h" },
          ],
          answer: "A",
          explanation: "$\\text{speed} = \\dfrac{150}{2.5} = 60$ km/h.",
        },
        {
          id: "y11s-p1-q4",
          prompt:
            "A triangle has a base of 12 cm and a perpendicular height of 5 cm. What is its area?",
          latex: "A = \\tfrac{1}{2}bh",
          marks: 1,
          difficulty: 2,
          topicSlug: "area-surface-area-volume",
          topicTitle: "Area",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "30 cm²" },
            { label: "B", text: "60 cm²" },
            { label: "C", text: "17 cm²" },
            { label: "D", text: "34 cm²" },
          ],
          answer: "A",
          explanation: "$A = \\tfrac{1}{2}(12)(5) = 30$ cm².",
        },
        {
          id: "y11s-p1-q5",
          prompt:
            "A bag contains 3 red and 5 blue marbles. One is drawn at random. What is the probability it is red?",
          latex: "P(\\text{red}) = \\dfrac{\\text{red}}{\\text{total}}",
          marks: 1,
          difficulty: 2,
          topicSlug: "outcomes-sample-space-probability",
          topicTitle: "Probability",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$\\dfrac{3}{8}$" },
            { label: "B", text: "$\\dfrac{3}{5}$" },
            { label: "C", text: "$\\dfrac{5}{8}$" },
            { label: "D", text: "$\\dfrac{1}{3}$" },
          ],
          answer: "A",
          explanation:
            "There are $3 + 5 = 8$ marbles, so $P(\\text{red}) = \\dfrac{3}{8}$.",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Enter each part's final answer.",
      questions: [
        {
          id: "y11s-p1-q6",
          prompt: "$5000 is invested at 6% per annum simple interest.",
          latex: "I = Prn",
          marks: 3,
          difficulty: 3,
          topicSlug: "simple-interest",
          topicTitle: "Simple interest",
          remediationHref: REMEDIATION,
          explanation:
            "After 4 years: $I = 5000 \\times 0.06 \\times 4 = 1200$, so the total is $6200$. Over 3 years the interest would be $5000 \\times 0.06 \\times 3 = 900$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the interest earned after 4 years, in dollars.",
              marks: 1,
              answer: "1200",
              acceptedAnswers: ["$1200", "1,200"],
              explanation: "$I = 5000 \\times 0.06 \\times 4 = 1200$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the total amount in the account after 4 years.",
              marks: 1,
              answer: "6200",
              acceptedAnswers: ["$6200", "6,200"],
              explanation: "$5000 + 1200 = 6200$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "How much interest would be earned in only 3 years?",
              marks: 1,
              answer: "900",
              acceptedAnswers: ["$900"],
              explanation: "$I = 5000 \\times 0.06 \\times 3 = 900$.",
            },
          ],
        },
        {
          id: "y11s-p1-q7",
          prompt:
            "A market stall has total cost $C = 50 + 2n$ and revenue $R = 7n$, where n is the number of items sold.",
          latex: "C = 50 + 2n,\\quad R = 7n",
          marks: 3,
          difficulty: 5,
          topicSlug: "break-even-analysis",
          topicTitle: "Break-even analysis",
          remediationHref: REMEDIATION,
          explanation:
            "Break-even where $R = C$: $7n = 50 + 2n \\Rightarrow 5n = 50 \\Rightarrow n = 10$. Revenue there is $7 \\times 10 = 70$. At $n = 20$, profit $= 140 - 90 = 50$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the break-even number of items.",
              marks: 1,
              answer: "10",
              acceptedAnswers: ["n=10", "10 items"],
              explanation: "$7n = 50 + 2n \\Rightarrow 5n = 50 \\Rightarrow n = 10$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "What is the revenue at the break-even point, in dollars?",
              marks: 1,
              answer: "70",
              acceptedAnswers: ["$70"],
              explanation: "$R = 7 \\times 10 = 70$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the profit when 20 items are sold, in dollars.",
              marks: 1,
              answer: "50",
              acceptedAnswers: ["$50"],
              explanation:
                "Profit $= R - C = 7(20) - (50 + 2 \\times 20) = 140 - 90 = 50$.",
            },
          ],
        },
        {
          id: "y11s-p1-q8",
          prompt:
            "A rectangular water tank measures 2 m long, 1.5 m wide and 1 m deep.",
          latex: "V = l \\times w \\times h",
          marks: 3,
          difficulty: 4,
          topicSlug: "area-surface-area-volume",
          topicTitle: "Volume and capacity",
          remediationHref: REMEDIATION,
          explanation:
            "Volume $= 2 \\times 1.5 \\times 1 = 3$ m³. Since 1 m³ = 1000 L, capacity = 3000 L. At 20 L/min it takes $3000 \\div 20 = 150$ min to fill.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the volume of the tank, in cubic metres.",
              marks: 1,
              answer: "3",
              acceptedAnswers: ["3 m³", "3 m^3"],
              explanation: "$V = 2 \\times 1.5 \\times 1 = 3$ m³.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the capacity of the tank, in litres.",
              marks: 1,
              answer: "3000",
              acceptedAnswers: ["3000 L", "3,000"],
              explanation: "1 m³ = 1000 L, so $3 \\times 1000 = 3000$ L.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "If water flows in at 20 litres per minute, how many minutes does it take to fill?",
              marks: 1,
              answer: "150",
              acceptedAnswers: ["150 min", "150 minutes"],
              explanation: "$3000 \\div 20 = 150$ minutes.",
            },
          ],
        },
        {
          id: "y11s-p1-q9",
          prompt:
            "A data set is: 4, 7, 8, 10, 12, 15, 20.",
          latex: "4,\\ 7,\\ 8,\\ 10,\\ 12,\\ 15,\\ 20",
          marks: 3,
          difficulty: 4,
          topicSlug: "box-plots-five-number-summary",
          topicTitle: "Five-number summary",
          remediationHref: REMEDIATION,
          explanation:
            "The median (middle value) is 10. With the median excluded, the lower half is 4, 7, 8 (median 7 = Q1) and the upper half is 12, 15, 20 (median 15 = Q3), so IQR = 15 − 7 = 8. Range = 20 − 4 = 16.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the median.",
              marks: 1,
              answer: "10",
              explanation: "The middle (4th) value of 7 values is 10.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the interquartile range (IQR).",
              marks: 1,
              answer: "8",
              explanation: "$Q_3 - Q_1 = 15 - 7 = 8$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the range.",
              marks: 1,
              answer: "16",
              explanation: "$20 - 4 = 16$.",
            },
          ],
        },
        {
          id: "y11s-p1-q10",
          prompt:
            "In a group of 50 people, 30 own a pet and 20 do not. Of the 30 pet owners, 12 are male; of the 20 non-owners, 8 are male.",
          latex: "n = 50",
          marks: 3,
          difficulty: 5,
          topicSlug: "two-way-tables-probability",
          topicTitle: "Two-way tables",
          remediationHref: REMEDIATION,
          explanation:
            "P(owns a pet) = 30/50 = 3/5. Females who own no pet = 20 − 8 = 12, so P(female and no pet) = 12/50 = 6/25. P(male given owns a pet) = 12/30 = 2/5.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt:
                "Find the probability a randomly chosen person owns a pet.",
              marks: 1,
              answer: "3/5",
              acceptedAnswers: ["30/50", "0.6"],
              explanation: "$\\dfrac{30}{50} = \\dfrac{3}{5}$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt:
                "Find the probability a person is female and owns no pet.",
              marks: 1,
              answer: "6/25",
              acceptedAnswers: ["12/50", "0.24"],
              explanation:
                "Female non-owners $= 20 - 8 = 12$, so $\\dfrac{12}{50} = \\dfrac{6}{25}$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "Given a person owns a pet, find the probability they are male.",
              marks: 1,
              answer: "2/5",
              acceptedAnswers: ["12/30", "0.4"],
              explanation: "$\\dfrac{12}{30} = \\dfrac{2}{5}$.",
            },
          ],
        },
      ],
    },
  ],
};
