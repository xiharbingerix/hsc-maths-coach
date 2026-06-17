import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Standard 2 lessons. All answers
// SymPy-verified. Auto-markable (single numeric values / short answers).

export const compoundInterestChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12s2-ci-1",
    prompt:
      "$8000 is invested at 6% per annum compounded monthly. Find the value after 2 years, to the nearest cent.",
    latex: "",
    answer: "9017.28",
    acceptedAnswers: ["$9017.28", "9017.28 dollars", "9017"],
    hint: "Compounded monthly means the rate per period is 0.06/12 and there are 12 × 2 = 24 periods.",
    explanation:
      "$A = 8000\\left(1 + \\tfrac{0.06}{12}\\right)^{24} = 8000(1.005)^{24} \\approx 9017.28$.",
  },
  {
    id: "chal-y12s2-ci-2",
    prompt:
      "$5000 is invested at 5% per annum compounded annually. What is the least whole number of years for the balance to first exceed $7500?",
    latex: "5000(1.05)^n > 7500",
    answer: "9",
    acceptedAnswers: ["9 years"],
    hint: "Solve 1.05ⁿ > 1.5, then round the answer UP to a whole year.",
    explanation:
      "$(1.05)^n > 1.5$ gives $n > 8.31$, so the first whole year is $n = 9$.",
  },
  {
    id: "chal-y12s2-ci-3",
    prompt:
      "An investment grows from $4000 to $4630.50 in 3 years, compounded annually. Find the annual interest rate, as a percentage.",
    latex: "4000(1 + r)^3 = 4630.50",
    answer: "5",
    acceptedAnswers: ["5%", "0.05"],
    hint: "Solve (1 + r)³ = 4630.50 / 4000, then take the cube root.",
    explanation:
      "$(1+r)^3 = 1.157625$, so $1 + r = 1.05$ and $r = 0.05 = 5\\%$.",
  },
];

export const sineCosineRuleChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12s2-tri-1",
    prompt:
      "In triangle ABC, a = 12, b = 15 and angle A = 40°. Find the acute angle B, to 1 decimal place.",
    latex: "",
    answer: "53.5",
    acceptedAnswers: ["53.5°", "53.46", "53.4"],
    hint: "Use the sine rule: sin B = b sin A / a.",
    explanation:
      "$\\sin B = \\dfrac{15\\sin 40°}{12} \\approx 0.8035$, so $B \\approx 53.5°$.",
  },
  {
    id: "chal-y12s2-tri-2",
    prompt:
      "Find the area of a triangle with sides 6 cm and 8 cm enclosing an angle of 65°, to 2 decimal places.",
    latex: "",
    answer: "21.75",
    acceptedAnswers: ["21.75 cm²", "21.8"],
    hint: "Use A = ½ab sin C with the two given sides and the included angle.",
    explanation:
      "$A = \\tfrac{1}{2}(6)(8)\\sin 65° \\approx 21.75$ cm².",
  },
  {
    id: "chal-y12s2-tri-3",
    prompt:
      "A triangle has sides 5, 7 and 9. Find its largest angle, to 1 decimal place.",
    latex: "",
    answer: "95.7",
    acceptedAnswers: ["95.7°", "95.74"],
    hint: "The largest angle is opposite the longest side (9). Use the cosine rule.",
    explanation:
      "$\\cos C = \\dfrac{5^2 + 7^2 - 9^2}{2(5)(7)} = -0.1$, so $C \\approx 95.7°$.",
  },
];

export const zScoresChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12s2-z-1",
    prompt:
      "A test has mean 65 and standard deviation 12. A student scores 83. Find their z-score, to 1 decimal place.",
    latex: "",
    answer: "1.5",
    hint: "z = (score − mean) / standard deviation.",
    explanation: "$z = \\dfrac{83 - 65}{12} = 1.5$.",
  },
  {
    id: "chal-y12s2-z-2",
    prompt:
      "In Maths (mean 70, sd 10) a student scored 85; in English (mean 60, sd 8) they scored 74. In which subject did they perform relatively better?",
    latex: "",
    answer: "English",
    acceptedAnswers: ["english"],
    hint: "Compare z-scores; the higher z-score is the relatively better result.",
    explanation:
      "Maths $z = \\dfrac{85-70}{10} = 1.5$; English $z = \\dfrac{74-60}{8} = 1.75$. English has the higher z-score.",
  },
  {
    id: "chal-y12s2-z-3",
    prompt:
      "Scores are normally distributed with mean 500 and standard deviation 100. Using the empirical rule, what percentage of scores lie between 300 and 700?",
    latex: "\\mu = 500,\\quad \\sigma = 100",
    answer: "95",
    acceptedAnswers: ["95%"],
    hint: "How many standard deviations from the mean are 300 and 700?",
    explanation:
      "300 and 700 are $\\mu \\pm 2\\sigma$, so by the empirical rule 95% of scores lie between them.",
  },
];
