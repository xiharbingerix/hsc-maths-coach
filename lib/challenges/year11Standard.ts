import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 11 Mathematics Standard lessons. All answers
// SymPy-verified. Auto-markable (single numeric / short answers).

export const simpleInterestChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-si-1",
    prompt:
      "How many years does it take for $4000 to earn $1000 in interest at 5% per annum simple interest?",
    latex: "I = Prn",
    answer: "5",
    acceptedAnswers: ["5 years"],
    hint: "Rearrange I = Prn to make n the subject: n = I / (Pr).",
    explanation:
      "$n = \\dfrac{I}{Pr} = \\dfrac{1000}{4000 \\times 0.05} = 5$ years.",
  },
  {
    id: "chal-y11s-si-2",
    prompt:
      "An amount invested at 6% per annum simple interest grows to $3250 after 5 years. Find the amount originally invested.",
    latex: "A = P(1 + rn)",
    answer: "2500",
    acceptedAnswers: ["$2500", "2,500"],
    hint: "The total is P(1 + rn). Here 1 + rn = 1 + 0.06 × 5 = 1.3.",
    explanation:
      "$P(1 + 0.06 \\times 5) = 1.3P = 3250$, so $P = 2500$.",
  },
  {
    id: "chal-y11s-si-3",
    prompt:
      "What simple interest rate (per annum) is needed for $2000 to earn $360 in 3 years? Give your answer as a percentage.",
    latex: "r = \\dfrac{I}{Pn}",
    answer: "6",
    acceptedAnswers: ["6%", "0.06"],
    hint: "Rearrange I = Prn to r = I / (Pn).",
    explanation:
      "$r = \\dfrac{360}{2000 \\times 3} = 0.06 = 6\\%$.",
  },
];

export const speedDistanceTimeChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-spd-1",
    prompt:
      "A car travels 240 km in 3 hours, then a further 180 km in 2 hours. Find the average speed for the whole journey.",
    latex: "\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}",
    answer: "84",
    acceptedAnswers: ["84 km/h"],
    hint: "Use total distance ÷ total time, not the average of the two speeds.",
    explanation:
      "Total distance $= 420$ km, total time $= 5$ h, so average speed $= \\dfrac{420}{5} = 84$ km/h.",
  },
  {
    id: "chal-y11s-spd-2",
    prompt: "Convert 72 km/h to metres per second.",
    latex: "1\\text{ km/h} = \\dfrac{1000}{3600}\\text{ m/s}",
    answer: "20",
    acceptedAnswers: ["20 m/s"],
    hint: "Multiply by 1000 to get metres, then divide by 3600 to get seconds.",
    explanation:
      "$72 \\times \\dfrac{1000}{3600} = 20$ m/s.",
  },
  {
    id: "chal-y11s-spd-3",
    prompt:
      "A train travels at a constant 90 km/h. How far does it travel in 40 minutes?",
    latex: "\\text{distance} = \\text{speed} \\times \\text{time}",
    answer: "60",
    acceptedAnswers: ["60 km"],
    hint: "Convert 40 minutes to hours (40/60) before multiplying.",
    explanation:
      "$90 \\times \\dfrac{40}{60} = 60$ km.",
  },
];

export const fiveNumberSummaryChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-bp-1",
    prompt:
      "Find the median of the data set: 3, 5, 8, 8, 10, 12, 14, 18, 21.",
    latex: "3,\\ 5,\\ 8,\\ 8,\\ 10,\\ 12,\\ 14,\\ 18,\\ 21",
    answer: "10",
    hint: "With 9 values, the median is the 5th value once they are ordered.",
    explanation: "The middle (5th) value of 9 ordered values is 10.",
  },
  {
    id: "chal-y11s-bp-2",
    prompt:
      "Find the interquartile range of: 2, 4, 5, 7, 9, 11, 13, 15.",
    latex: "2,\\ 4,\\ 5,\\ 7,\\ 9,\\ 11,\\ 13,\\ 15",
    answer: "7.5",
    hint: "With 8 values, split into a lower and upper half of 4, and find the median of each.",
    explanation:
      "$Q_1 = \\dfrac{4+5}{2} = 4.5$, $Q_3 = \\dfrac{11+13}{2} = 12$, so IQR $= 12 - 4.5 = 7.5$.",
  },
  {
    id: "chal-y11s-bp-3",
    prompt:
      "A data set has Q1 = 20 and Q3 = 40. Using the 1.5 × IQR rule, is a value of 75 an outlier? Answer yes or no.",
    latex: "\\text{upper fence} = Q_3 + 1.5 \\times \\text{IQR}",
    answer: "yes",
    acceptedAnswers: ["yes it is an outlier"],
    hint: "Find the upper fence Q3 + 1.5 × IQR and compare it with 75.",
    explanation:
      "IQR $= 20$; upper fence $= 40 + 1.5 \\times 20 = 70$. Since $75 > 70$, it is an outlier.",
  },
];
