import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 11 Mathematics Standard lessons. All answers
// SymPy-verified. Auto-markable (single numeric / short answers).

export const simpleInterestChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-si-1",
    prompt:
      "How many years does it take for $4000 to earn $1000 in interest at 5% per annum simple interest?",
    latex: "",
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
    latex: "",
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
    latex: "",
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
    latex: "",
    answer: "84",
    acceptedAnswers: ["84 km/h"],
    hint: "Use total distance ÷ total time, not the average of the two speeds.",
    explanation:
      "Total distance $= 420$ km, total time $= 5$ h, so average speed $= \\dfrac{420}{5} = 84$ km/h.",
  },
  {
    id: "chal-y11s-spd-2",
    prompt: "Convert 72 km/h to metres per second.",
    latex: "",
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
    latex: "",
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
    latex: "",
    answer: "yes",
    acceptedAnswers: ["yes it is an outlier"],
    hint: "Find the upper fence Q3 + 1.5 × IQR and compare it with 75.",
    explanation:
      "IQR $= 20$; upper fence $= 40 + 1.5 \\times 20 = 70$. Since $75 > 70$, it is an outlier.",
  },
];

// Year 11 Standard — Data Displays and Summary Statistics (data-displays-summary-statistics).
// Synoptic, auto-markable single-value answers: combined/weighted means, reverse-mean
// constraints, and frequency-table reasoning. SymPy-verified.
export const summaryStatsDisplaysChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-dds-1",
    prompt:
      "Class A has 20 students with a mean test score of 72. Another class, B, has a mean of 78. When the two classes are combined, the overall mean is 75. How many students are in Class B?",
    latex: "",
    answer: "20",
    acceptedAnswers: ["20 students"],
    hint: "Let Class B have b students. Set the combined total (20×72 + 78b) equal to 75×(20 + b).",
    explanation:
      "$\\dfrac{20\\times72 + 78b}{20 + b} = 75 \\Rightarrow 1440 + 78b = 1500 + 75b \\Rightarrow 3b = 60 \\Rightarrow b = 20$.",
  },
  {
    id: "chal-y11s-dds-2",
    prompt:
      "The mean of 9 numbers is 14. When one number is removed, the mean of the remaining 8 numbers is 15. Find the number that was removed.",
    latex: "",
    answer: "6",
    acceptedAnswers: ["6.0"],
    hint: "Compare the total of all 9 numbers (9×14) with the total of the remaining 8 (8×15).",
    explanation:
      "Total of 9 numbers $= 9\\times14 = 126$. Total of the remaining 8 $= 8\\times15 = 120$. The removed number $= 126 - 120 = 6$.",
  },
  {
    id: "chal-y11s-dds-3",
    prompt:
      "In a frequency table the value 3 occurs 4 times, the value 5 occurs 6 times, and the value 8 occurs k times. The mean of all the data is 6. Find k.",
    latex: "",
    answer: "9",
    acceptedAnswers: ["k=9"],
    hint: "Set Σ(value × frequency) ÷ Σ(frequency) = 6 and solve for k.",
    explanation:
      "$\\dfrac{3(4)+5(6)+8k}{4+6+k} = 6 \\Rightarrow \\dfrac{42 + 8k}{10 + k} = 6 \\Rightarrow 42 + 8k = 60 + 6k \\Rightarrow 2k = 18 \\Rightarrow k = 9$.",
  },
  {
    id: "chal-y11s-dds-4",
    prompt:
      "A set of five positive whole numbers has a mean of 6, a median of 5, and a single mode of 4 that occurs exactly twice. What is the largest possible value in the set?",
    latex: "",
    answer: "11",
    acceptedAnswers: ["11.0"],
    hint: "The total is 5×6 = 30. The two 4s must be the smallest values; the median fixes the middle value at 5.",
    explanation:
      "Total $= 5\\times6 = 30$. To have mode 4 (twice) and median 5, the ordered set is $4, 4, 5, d, e$. Since $4+4+5 = 13$, we need $d + e = 17$. To avoid creating a second mode, $d \\ge 6$, so the largest value $e$ is greatest when $d = 6$, giving $e = 11$. Check: $4, 4, 5, 6, 11$ has mean 6, median 5, and single mode 4.",
  },
  {
    id: "chal-y11s-dds-5",
    prompt:
      "In a test, 60% of a class scored a mean of 80 and the other 40% scored a mean of 65. Find the mean score of the whole class.",
    latex: "",
    answer: "74",
    acceptedAnswers: ["74.0", "74 marks"],
    hint: "Weight each group's mean by its proportion: 0.6×80 + 0.4×65.",
    explanation:
      "Weighted mean $= 0.6\\times80 + 0.4\\times65 = 48 + 26 = 74$. (It is not the simple average 72.5 because the higher-scoring group is larger.)",
  },
];

// Year 11 Standard — Interpreting Data and Outliers (interpreting-data-outliers).
// Synoptic reasoning about how outliers move the mean vs the median; auto-markable.
export const outlierEffectChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-out-1",
    prompt:
      "A data set of 10 numbers has a mean of 12. A single outlier is then found to have been mis-recorded as 8 when it should have been 53. What is the corrected mean?",
    latex: "",
    answer: "16.5",
    acceptedAnswers: ["16.50"],
    hint: "The total changes by (53 - 8). Add that change to the old total, then divide by 10.",
    explanation:
      "Old total = 10 × 12 = 120. The value rises by 53 - 8 = 45, so the new total is 165. New mean = 165 / 10 = 16.5.",
  },
  {
    id: "chal-y11s-out-2",
    prompt:
      "Seven test scores have a median of 14. The two lowest scores are each reduced by 5 marks. What is the new median?",
    latex: "",
    answer: "14",
    acceptedAnswers: ["14 marks"],
    hint: "The median of 7 values is the 4th value. Does lowering the two smallest values change which value sits 4th?",
    explanation:
      "With 7 ordered values the median is the 4th. Reducing the two lowest values keeps them lowest, so the 4th value is unchanged: the median stays 14. (The mean would fall, but the median is resistant.)",
  },
  {
    id: "chal-y11s-out-3",
    prompt:
      "A set of 5 numbers has a mean of 30 and a median of 24. The largest number, an outlier, is removed. The mean of the remaining 4 numbers is 18. What was the value of the outlier that was removed?",
    latex: "",
    answer: "78",
    acceptedAnswers: ["78.0"],
    hint: "Compare the total of all 5 numbers (5 × 30) with the total of the remaining 4 (4 × 18).",
    explanation:
      "Total of 5 numbers = 5 × 30 = 150. Total of remaining 4 = 4 × 18 = 72. The removed outlier = 150 - 72 = 78. (The median is not needed - it is there to test whether you use the right totals.)",
  },
  {
    id: "chal-y11s-out-4",
    prompt:
      "In a data set of house prices the mean is $640,000 and the median is $580,000. A new home sells for exactly the current mean, $640,000, and is added to the data set. Does the median increase, decrease, or stay the same? Answer increase, decrease, or same.",
    latex: "",
    answer: "increase",
    acceptedAnswers: ["increases", "it increases"],
    hint: "Adding a value above the current median shifts the middle position upward.",
    explanation:
      "The new price ($640,000) is above the current median ($580,000), so it joins the upper half. That nudges the middle of the ordered data upward, so the median increases (though it stays at or below $640,000).",
  },
];

// Year 11 Standard — Grouped Data and Frequency Tables (grouped-data-frequency-tables).
// Reverse-frequency, combined-estimate and regrouping insight; auto-markable single values.
export const groupedDataChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-grp-1",
    prompt:
      "A grouped table has classes 0–9, 10–19 and 20–29 with midpoints 4.5, 14.5 and 24.5 and frequencies 6, x and 4. The estimated mean is 14. Find x.",
    latex: "",
    answer: "30",
    acceptedAnswers: ["x=30", "30.0"],
    hint: "Set Σ(f × m) ÷ Σf = 14 with x unknown, then solve the linear equation.",
    explanation:
      "Σ(f × m) = 6×4.5 + 14.5x + 4×24.5 = 125 + 14.5x, and Σf = 10 + x. Then (125 + 14.5x) ÷ (10 + x) = 14 gives 125 + 14.5x = 140 + 14x, so 0.5x = 15 and x = 30.",
  },
  {
    id: "chal-y11s-grp-2",
    prompt:
      "Group X has 20 values with an estimated mean of 30. Group Y has 30 values with an estimated mean of 40. Find the estimated mean of all 50 values combined.",
    latex: "",
    answer: "36",
    acceptedAnswers: ["36.0"],
    hint: "Recover each group's total (mean × count), add them, then divide by 50.",
    explanation:
      "Group X total = 20 × 30 = 600; Group Y total = 30 × 40 = 1200. Combined total = 1800 over 50 values, so the mean = 1800 ÷ 50 = 36. (It is closer to 40 because Group Y is larger.)",
  },
  {
    id: "chal-y11s-grp-3",
    prompt:
      "Two adjacent classes each have frequency 5: the class 10–19 (midpoint 14.5) and the class 20–29 (midpoint 24.5). They are merged into a single class 10–29 with midpoint 19.5. By how much does the total Σ(f × m) change?",
    latex: "",
    answer: "0",
    acceptedAnswers: ["no change", "0.0", "it does not change"],
    hint: "Compare 5×14.5 + 5×24.5 with the merged contribution 10×19.5.",
    explanation:
      "Before: 5×14.5 + 5×24.5 = 72.5 + 122.5 = 195. After merging: 10×19.5 = 195. The change is 0 — merging two equal-frequency adjacent classes leaves Σ(f × m), and hence the estimated mean, unchanged.",
  },
  {
    id: "chal-y11s-grp-4",
    prompt:
      "The estimated mean of a grouped data set is 33.5 and the total of all the f × m products is 1675. How many data values are in the set?",
    latex: "",
    answer: "50",
    acceptedAnswers: ["50 values"],
    hint: "Estimated mean = Σ(f × m) ÷ Σf, so Σf = Σ(f × m) ÷ mean.",
    explanation:
      "Σf = Σ(f × m) ÷ estimated mean = 1675 ÷ 33.5 = 50 data values.",
  },
];

// Year 11 Standard — Box Plots and the Five-Number Summary (box-plots-five-number-summary).
// Full IQR-rule outlier reasoning, proportion-of-data and comparison; auto-markable.
export const boxPlotChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-bx-1",
    prompt:
      "For the data set 4, 12, 14, 15, 16, 18, 19, 45, use the 1.5 × IQR rule. How many values are outliers?",
    latex: "",
    answer: "2",
    acceptedAnswers: ["2 outliers"],
    hint: "Find Q1 and Q3 (medians of the lower and upper halves of 4 values), then the two fences.",
    explanation:
      "Q1 = (12 + 14) ÷ 2 = 13, Q3 = (18 + 19) ÷ 2 = 18.5, so IQR = 5.5 and 1.5 × IQR = 8.25. Lower fence = 13 − 8.25 = 4.75 (so 4 is an outlier); upper fence = 18.5 + 8.25 = 26.75 (so 45 is an outlier). That is 2 outliers, one at each end.",
  },
  {
    id: "chal-y11s-bx-2",
    prompt:
      "A data set has Q1 = 35 and Q3 = 55. Using the 1.5 × IQR rule, what is the smallest whole number that would be flagged as a high outlier?",
    latex: "",
    answer: "86",
    acceptedAnswers: ["86.0"],
    hint: "Find the upper fence, then take the next whole number strictly above it.",
    explanation:
      "IQR = 55 − 35 = 20, so the upper fence = 55 + 1.5 × 20 = 85. A high outlier must exceed 85, so the smallest whole number is 86.",
  },
  {
    id: "chal-y11s-bx-3",
    prompt:
      "A data set of 80 values has Q1 = 18 and Q3 = 42. How many of the values lie between Q1 and Q3?",
    latex: "",
    answer: "40",
    acceptedAnswers: ["40 values"],
    hint: "The quartiles cut the data into quarters. What fraction lies between Q1 and Q3?",
    explanation:
      "By definition 25% of data lies below Q1 and 25% above Q3, so 50% lies between them. Half of 80 is 40 values.",
  },
  {
    id: "chal-y11s-bx-4",
    prompt:
      "Two classes sit the same test. Class A has a median of 60 and an IQR of 10; Class B has a median of 60 and an IQR of 25. Which class has the more consistent results? Answer A or B.",
    latex: "",
    answer: "A",
    acceptedAnswers: ["class a", "Class A"],
    hint: "Consistency is about spread, not centre. Compare the IQRs.",
    explanation:
      "Both medians are 60, so the centres match. Class A has the smaller IQR (10 vs 25), meaning its middle 50% is tightly packed — so Class A is the more consistent.",
  },
  {
    id: "chal-y11s-bx-5",
    prompt:
      "A box plot has minimum 5, Q1 = 12, median 18, Q3 = 28 and maximum 60. The maximum looks far out. Find the upper fence (Q3 + 1.5 × IQR) used to test it.",
    latex: "",
    answer: "52",
    acceptedAnswers: ["52.0"],
    hint: "Compute the IQR from Q1 and Q3, then add 1.5 × IQR to Q3.",
    explanation:
      "IQR = 28 − 12 = 16, so the upper fence = 28 + 1.5 × 16 = 28 + 24 = 52. Since the maximum 60 is above 52, it is confirmed as an outlier.",
  },
];

// Year 11 Standard — Stem-and-Leaf Plots (stem-leaf-plots).
// Missing-leaf, IQR-from-plot and median-shift reasoning; auto-markable single values.
export const stemLeafChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-stem-1",
    prompt:
      "A stem-and-leaf plot shows six values in order: 14, 17, 19, then a value with stem 2 and an unknown leaf, then 28 and 31. The median of all six values is 21.5. Find the unknown value.",
    latex: "",
    answer: "24",
    acceptedAnswers: ["24.0"],
    hint: "With six values the median is the average of the 3rd and 4th. The 3rd value is 19.",
    explanation:
      "Median = (3rd value + 4th value) ÷ 2 = (19 + v) ÷ 2 = 21.5, so 19 + v = 43 and v = 24. (Stem 2, leaf 4.)",
  },
  {
    id: "chal-y11s-stem-2",
    prompt:
      "A stem-and-leaf plot lists eight values: 21, 24, 26, 28, 30, 33, 35, 38. Find the interquartile range (IQR).",
    latex: "",
    answer: "9",
    acceptedAnswers: ["9.0"],
    hint: "Split the eight ordered values into a lower and upper half of four, and find Q1 and Q3 as the medians of each half.",
    explanation:
      "Lower half 21, 24, 26, 28 gives Q1 = (24 + 26) ÷ 2 = 25. Upper half 30, 33, 35, 38 gives Q3 = (33 + 35) ÷ 2 = 34. IQR = 34 − 25 = 9.",
  },
  {
    id: "chal-y11s-stem-3",
    prompt:
      "A stem-and-leaf plot has 11 values with a median of 32 (the 6th value). A 12th value of 50 is added. The new median is the average of the 6th and 7th values, and the 7th value is 35. Find the new median.",
    latex: "",
    answer: "33.5",
    acceptedAnswers: ["33.50"],
    hint: "Adding a large value to 11 ordered values makes the median the average of the 6th and 7th.",
    explanation:
      "Adding 50 (above all others) makes n = 12, so the median is the average of the 6th and 7th values: (32 + 35) ÷ 2 = 33.5.",
  },
  {
    id: "chal-y11s-stem-4",
    prompt:
      "A back-to-back stem-and-leaf plot compares two groups. Group A has a median of 45 and Group B has a median of 52. By how much would every Group A value need to increase, uniformly, for the two medians to be equal?",
    latex: "",
    answer: "7",
    acceptedAnswers: ["7.0"],
    hint: "Adding the same amount to every value shifts the median by that same amount.",
    explanation:
      "A uniform increase of c lifts Group A's median to 45 + c. Setting 45 + c = 52 gives c = 7. (Every value rising by the same amount shifts the median by exactly that amount.)",
  },
];

// Year 11 Standard — Time Series and Trend Lines (time-series-trend-lines).
// Two-point trend-line modelling, prediction, deseasonalising and rate comparison.
export const timeSeriesChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-ts-1",
    prompt:
      "A trend line passes through the points (month 2, sales 18) and (month 8, sales 42). Use it to predict the sales in month 12.",
    latex: "",
    answer: "58",
    acceptedAnswers: ["58 sales"],
    hint: "Find the gradient (rate per month) from the two points, then extend the line to month 12.",
    explanation:
      "Gradient = (42 − 18) ÷ (8 − 2) = 24 ÷ 6 = 4 per month. From month 8 (42) to month 12 is 4 more months: 42 + 4 × 4 = 58.",
  },
  {
    id: "chal-y11s-ts-2",
    prompt:
      "Monthly downloads are modelled by the trend line D = 120 − 8t, where t is the month number. In which month does the model predict downloads first reach 0?",
    latex: "",
    answer: "15",
    acceptedAnswers: ["month 15", "t=15"],
    hint: "Set D = 0 and solve for t.",
    explanation:
      "Set 120 − 8t = 0, so 8t = 120 and t = 15. The model predicts downloads reach 0 in month 15.",
  },
  {
    id: "chal-y11s-ts-3",
    prompt:
      "Quarterly sales over a year show a seasonal pattern: 22, 38, 55 and 41. Find the average quarterly sales, used as the deseasonalised trend value.",
    latex: "",
    answer: "39",
    acceptedAnswers: ["39 sales"],
    hint: "Average the four quarterly figures.",
    explanation:
      "Average = (22 + 38 + 55 + 41) ÷ 4 = 156 ÷ 4 = 39. The seasonal swings cancel out, leaving 39 as the trend level.",
  },
  {
    id: "chal-y11s-ts-4",
    prompt:
      "Series A rises from 10 to 34 over 6 months. Series B rises from 20 to 38 over 4 months. Which series has the greater average monthly rate of increase? Answer A or B.",
    latex: "",
    answer: "B",
    acceptedAnswers: ["series b"],
    hint: "Compute each series' average rate as change in value divided by number of months.",
    explanation:
      "Series A: (34 − 10) ÷ 6 = 24 ÷ 6 = 4 per month. Series B: (38 − 20) ÷ 4 = 18 ÷ 4 = 4.5 per month. Series B rises faster.",
  },
];

// Year 11 Standard — Data Analysis Exam Practice (data-analysis-exam-practice).
// Mixed, synoptic items spanning summary stats, box plots, grouped data and proportions.
export const dataExamChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-dex-1",
    prompt:
      "A data set of 7 values has a mean of 20. One of the values is an outlier of 50. If the outlier is removed, find the mean of the remaining 6 values.",
    latex: "",
    answer: "15",
    acceptedAnswers: ["15.0"],
    hint: "Find the total of all 7 values, subtract the outlier, then divide by 6.",
    explanation:
      "Total of 7 values = 7 × 20 = 140. Removing the outlier leaves 140 − 50 = 90 over 6 values, so the new mean = 90 ÷ 6 = 15.",
  },
  {
    id: "chal-y11s-dex-2",
    prompt:
      "A data set has lower quartile Q1 = 24 and upper quartile Q3 = 48. A value of 90 is recorded. Using the 1.5 × IQR rule, by how much does 90 exceed the upper fence?",
    latex: "",
    answer: "6",
    acceptedAnswers: ["6.0"],
    hint: "Find the IQR, then the upper fence, then compare with 90.",
    explanation:
      "IQR = 48 − 24 = 24, so the upper fence = 48 + 1.5 × 24 = 84. Then 90 − 84 = 6, so 90 lies 6 above the fence (confirming it is an outlier).",
  },
  {
    id: "chal-y11s-dex-3",
    prompt:
      "A grouped frequency table has classes with midpoints 10, 20 and 30 and frequencies 5, 12 and 8. Estimate the mean.",
    latex: "",
    answer: "21.2",
    acceptedAnswers: ["21.20"],
    hint: "Compute the sum of (frequency times midpoint) divided by the total frequency.",
    explanation:
      "Sum of f times m = 5×10 + 12×20 + 8×30 = 50 + 240 + 240 = 530. Total frequency = 25, so the estimated mean = 530 ÷ 25 = 21.2.",
  },
  {
    id: "chal-y11s-dex-4",
    prompt:
      "A survey of 40 people found that 30% preferred option A and the rest preferred option B. How many more people preferred B than A?",
    latex: "",
    answer: "16",
    acceptedAnswers: ["16 people"],
    hint: "Find the count for A (30% of 40), then B is the rest. Subtract.",
    explanation:
      "A = 30% of 40 = 12 people, so B = 40 − 12 = 28. The difference is 28 − 12 = 16 more people preferred B.",
  },
];

// Year 11 Standard — Data Collection and Sampling Methods (data-collection-sampling-methods).
// Stratified-sampling proportional reasoning, including reverse problems; auto-markable.
export const samplingMethodsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-smp-1",
    prompt:
      "A town has 1500 adults, 900 teenagers and 600 children. A stratified sample of 100 people is taken. How many teenagers should be in the sample?",
    latex: "",
    answer: "30",
    acceptedAnswers: ["30 teenagers"],
    hint: "Teenagers' share of the sample equals their share of the population.",
    explanation:
      "Total population = 1500 + 900 + 600 = 3000. Teenagers are 900 of 3000, so the sample takes (900 ÷ 3000) × 100 = 30 teenagers.",
  },
  {
    id: "chal-y11s-smp-2",
    prompt:
      "A stratified sample of 80 students is taken from a school. The sample includes 28 Year 12 students, and the school has 210 Year 12 students in total. How many students are in the whole school?",
    latex: "",
    answer: "600",
    acceptedAnswers: ["600 students"],
    hint: "The sampling fraction is the same for every group: 28 out of 210 equals 80 out of the total.",
    explanation:
      "The sampling fraction is 28 ÷ 210 = 4/30. Setting 80 ÷ total = 4/30 gives total = 80 × 210 ÷ 28 = 600 students.",
  },
  {
    id: "chal-y11s-smp-3",
    prompt:
      "A factory has 240 day-shift and 160 night-shift workers. A stratified sample includes 8 night-shift workers. How many day-shift workers should it include to keep the proportions?",
    latex: "",
    answer: "12",
    acceptedAnswers: ["12 day-shift", "12 workers"],
    hint: "Find the sampling fraction from the night shift (8 of 160), then apply it to the 240 day-shift workers.",
    explanation:
      "Sampling fraction = 8 ÷ 160 = 1/20. Applied to the day shift: 240 × (1/20) = 12 day-shift workers.",
  },
  {
    id: "chal-y11s-smp-4",
    prompt:
      "A company's staff are managers and workers in the ratio 1 : 9. A stratified sample of 50 staff is taken. How many managers should be in the sample?",
    latex: "",
    answer: "5",
    acceptedAnswers: ["5 managers"],
    hint: "The ratio 1 : 9 means managers are 1 part in 10 of the staff.",
    explanation:
      "Managers make up 1 of every 10 staff, so they take 1/10 of the sample: (1 ÷ 10) × 50 = 5 managers.",
  },
];

// Year 11 Standard — Data Analysis Revision (data-analysis-revision).
// Reverse-mean, mean-shift and range reasoning that builds on Year 10 foundations.
export const dataRevisionChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11s-drv-1",
    prompt:
      "The mean of 6 numbers is 10. Five of them are 7, 9, 11, 8 and 13. Find the sixth number.",
    latex: "",
    answer: "12",
    acceptedAnswers: ["12.0"],
    hint: "The six numbers must total 6 × 10. Subtract the five you know.",
    explanation:
      "Total of six numbers = 6 × 10 = 60. The five known numbers add to 7 + 9 + 11 + 8 + 13 = 48, so the sixth is 60 − 48 = 12.",
  },
  {
    id: "chal-y11s-drv-2",
    prompt:
      "The mean of 4 numbers is 15. A fifth number, 25, is then added. Find the new mean of all 5 numbers.",
    latex: "",
    answer: "17",
    acceptedAnswers: ["17.0"],
    hint: "Find the total of the first four (mean × count), add 25, then divide by 5.",
    explanation:
      "Total of four numbers = 4 × 15 = 60. Adding 25 gives 85 over 5 numbers, so the new mean = 85 ÷ 5 = 17.",
  },
  {
    id: "chal-y11s-drv-3",
    prompt:
      "Five numbers have a mean of 12. Every number is then increased by 3. What is the new mean?",
    latex: "",
    answer: "15",
    acceptedAnswers: ["15.0"],
    hint: "Adding the same amount to every value shifts the mean by that same amount.",
    explanation:
      "Increasing all five numbers by 3 adds 5 × 3 = 15 to the total, which is 3 more per value, so the mean rises by 3: 12 + 3 = 15.",
  },
  {
    id: "chal-y11s-drv-4",
    prompt:
      "A data set has a range of 20 and a minimum value of 8. A new value of 35 is then added. Find the new range.",
    latex: "",
    answer: "27",
    acceptedAnswers: ["27.0"],
    hint: "Work out the original maximum first, then see whether 35 becomes the new maximum.",
    explanation:
      "Original maximum = minimum + range = 8 + 20 = 28. The new value 35 is larger, so it becomes the maximum: new range = 35 − 8 = 27.",
  },
];
