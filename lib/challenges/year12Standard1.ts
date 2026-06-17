import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Mathematics Standard 1 lessons. All answers
// SymPy-verified. Auto-markable (single numeric / short answers).
//
// Note: Standard 1 shares the "investment-compound-interest" lesson slug with
// Standard 2, so that lesson already inherits the Standard 2 compound-interest
// challenge set via the shared registry key. These sets target Standard 1
// lessons that aren't already covered (right-angle trig applications, summary
// statistics, and depreciation — the last two are shared with other Standard
// courses, adding challenge depth there too).

export const rightAngleTrigAppliedChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12s1-rt-1",
    prompt:
      "A 5 m ladder leans against a wall at 70° to the ground. How high up the wall does it reach, to 2 decimal places (m)?",
    latex: "",
    answer: "4.70",
    acceptedAnswers: ["4.70 m", "4.7"],
    hint: "The height is opposite the 70° angle; use sine.",
    explanation: "$5\\sin 70° \\approx 4.70$ m.",
  },
  {
    id: "chal-y12s1-rt-2",
    prompt:
      "From a point 15 m from the base of a tower, the angle of elevation to the top is measured. The tower is 20 m tall. Find the angle of elevation, to the nearest degree.",
    latex: "",
    answer: "53",
    acceptedAnswers: ["53°", "53 degrees"],
    hint: "Use tan θ = opposite / adjacent, then inverse tan.",
    explanation: "$\\theta = \\tan^{-1}\\left(\\tfrac{20}{15}\\right) \\approx 53°$.",
  },
  {
    id: "chal-y12s1-rt-3",
    prompt:
      "A ramp rises 0.8 m over a horizontal distance of 10 m. Find the angle of inclination, to the nearest degree.",
    latex: "",
    answer: "5",
    acceptedAnswers: ["5°", "5 degrees"],
    hint: "Use inverse tangent of rise over run.",
    explanation: "$\\theta = \\tan^{-1}\\left(\\tfrac{0.8}{10}\\right) \\approx 5°$.",
  },
];

export const summaryStatsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12s1-ss-1",
    prompt: "Find the mean of: 12, 15, 18, 20, 25.",
    latex: "",
    answer: "18",
    hint: "Add the values and divide by how many there are.",
    explanation: "$\\dfrac{12+15+18+20+25}{5} = \\dfrac{90}{5} = 18$.",
  },
  {
    id: "chal-y12s1-ss-2",
    prompt: "Find the median of: 7, 3, 9, 4, 12, 8.",
    latex: "3,\\ 4,\\ 7,\\ 8,\\ 9,\\ 12",
    answer: "7.5",
    hint: "Order the values first; with 6 values the median is the average of the middle two.",
    explanation:
      "Ordered: 3, 4, 7, 8, 9, 12. Median $= \\dfrac{7 + 8}{2} = 7.5$.",
  },
  {
    id: "chal-y12s1-ss-3",
    prompt:
      "The mean of 5 numbers is 14. Four of them are 10, 12, 15 and 18. Find the fifth number.",
    latex: "",
    answer: "15",
    hint: "The total of all five must be 5 × 14 = 70.",
    explanation:
      "Total $= 5 \\times 14 = 70$; known four sum to 55, so the fifth is $70 - 55 = 15$.",
  },
];

export const depreciationChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12s1-dep-1",
    prompt:
      "Equipment costing $18 000 depreciates by a fixed $2500 each year (straight-line). Find its value after 4 years.",
    latex: "",
    answer: "8000",
    acceptedAnswers: ["$8000", "8,000"],
    hint: "Subtract 4 lots of $2500 from the original value.",
    explanation: "$18000 - 4 \\times 2500 = 8000$.",
  },
  {
    id: "chal-y12s1-dep-2",
    prompt:
      "A vehicle worth $12 000 depreciates by 20% of its value each year (declining balance). Find its value after 3 years.",
    latex: "",
    answer: "6144",
    acceptedAnswers: ["$6144", "6,144"],
    hint: "Each year multiply by the decay factor 0.8; do this 3 times.",
    explanation: "$12000(0.8)^3 = 12000 \\times 0.512 = 6144$.",
  },
  {
    id: "chal-y12s1-dep-3",
    prompt:
      "An asset worth $20 000 depreciates by a fixed $1500 per year (straight-line). After how many years is it worth $11 000?",
    latex: "20000 - 1500n = 11000",
    answer: "6",
    acceptedAnswers: ["6 years"],
    hint: "Solve 20000 − 1500n = 11000 for n.",
    explanation: "$20000 - 1500n = 11000 \\Rightarrow 1500n = 9000 \\Rightarrow n = 6$.",
  },
];
