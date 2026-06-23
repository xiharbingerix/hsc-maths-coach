import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Descriptive statistics and bivariate
// data" (ma-s2). Statistics-rich D6: recover a value from a summary statistic, effect of
// a change, z-score reverse, regression reconstruction, outlier/measure choice. All
// single-answer numeric, auto-markable, hand-verified.

// → data-displays-measures-of-centre
export const statsCentreChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-stat-1",
    prompt:
      "Five numbers have a mean of 12. Four of them are 8, 10, 15 and 16. Find the fifth number.",
    latex: "\\bar{x} = 12",
    answer: "11",
    acceptedAnswers: [],
    hint: "The total of all five values is 5 × mean. Subtract the four known values.",
    explanation:
      "Total = 5 × 12 = 60. The four known values sum to 8 + 10 + 15 + 16 = 49, so the fifth is 60 − 49 = 11.",
  },
  {
    id: "chal-y12a-stat-2",
    prompt:
      "Six numbers in increasing order are 4, 7, x, 11, 13, 20. The median is 9.5. Find x.",
    latex: "\\text{median} = 9.5",
    answer: "8",
    acceptedAnswers: ["x=8"],
    hint: "With six values the median is the average of the 3rd and 4th values.",
    explanation:
      "Median = (x + 11)/2 = 9.5 ⟹ x + 11 = 19 ⟹ x = 8 (which sits correctly between 7 and 11).",
  },
];

// → standard-deviation-z-scores-standardised-values
export const statsSdChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-stat-3",
    prompt:
      "In a test with mean 60 and standard deviation 8, a student's mark has a z-score of 1.5. Find the mark.",
    latex: "z = \\frac{x - \\bar{x}}{s}",
    answer: "72",
    acceptedAnswers: [],
    hint: "Rearrange z = (x − mean)/sd to x = mean + z × sd.",
    explanation: "x = 60 + 1.5 × 8 = 60 + 12 = 72.",
  },
  {
    id: "chal-y12a-stat-4",
    prompt:
      "A set of 10 numbers has a mean of 15. One more number is added and the new mean of the 11 numbers is 16. Find the number that was added.",
    latex: "\\bar{x}_{10} = 15,\\ \\bar{x}_{11} = 16",
    answer: "26",
    acceptedAnswers: [],
    hint: "Compare the total of the 11 numbers with the total of the original 10.",
    explanation:
      "Original total = 10 × 15 = 150. New total = 11 × 16 = 176. The added number = 176 − 150 = 26.",
  },
];

// → correlation-least-squares-regression
export const statsRegressionChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-stat-5",
    prompt:
      "For a bivariate data set, r = 0.8, s_x = 2, s_y = 5, and the means are x̄ = 5, ȳ = 14. Using the least-squares line, predict y when x = 8.",
    latex: "b = r\\,\\dfrac{s_y}{s_x}",
    answer: "20",
    acceptedAnswers: [],
    hint: "The least-squares gradient is b = r·(s_y/s_x); the line passes through the mean point (x̄, ȳ).",
    explanation:
      "Gradient b = r·s_y/s_x = 0.8 × 5/2 = 2. The line through (5, 14): y − 14 = 2(x − 5) ⟹ y = 2x + 4. At x = 8: y = 2(8) + 4 = 20.",
  },
];

// → spread-iqr-box-plots-outliers
export const statsSpreadChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-stat-6",
    prompt:
      "The data set 3, 5, 6, 7, 9, 40 contains an outlier, so the median represents the centre better than the mean. Find the median.",
    latex: "3, 5, 6, 7, 9, 40",
    answer: "6.5",
    acceptedAnswers: ["13/2"],
    hint: "The outlier 40 inflates the mean; the median is resistant. Average the two middle values.",
    explanation:
      "Ordered, the two middle values are 6 and 7, so the median = (6 + 7)/2 = 6.5. (The mean, 11.67, is pulled up by the outlier 40.)",
  },
];
