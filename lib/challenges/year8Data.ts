import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 8 — Wave 4. D6 (Level-6) challenge pools, 12 per section, for the data-and-graphs unit
// (8 sections). Registered course-scoped ("year-8-mathematics/<lesson>") in lib/challenges/index.ts;
// unlocked after mastery via the existing challenge flow (no new system). Auto-markable single-value
// answers (statistics: means, medians, quartiles, IQR, plus yes/no & skew-direction words). The
// seeder tags challenge questions as D6.

const m = (a: string): string[] => (a.includes("-") ? [a.replace(/-/g, "−")] : []);

// ── Mean, median, mode, range ─────────────────────────────────────────────────────────────────
export const meanMedianModeRangeChallenge: PracticeQuestion[] = [
  { id: "chal-y8-mmm-1", prompt: "Find the mean of 4, 8, 6, 10, 2.", latex: "\\bar{x}", answer: "6", acceptedAnswers: [], hint: "Sum ÷ 5.", explanation: "30/5 = 6." },
  { id: "chal-y8-mmm-2", prompt: "Find the median of 3, 7, 2, 9, 5.", latex: "\\text{median}", answer: "5", acceptedAnswers: [], hint: "Sort first.", explanation: "2,3,5,7,9 → 5." },
  { id: "chal-y8-mmm-3", prompt: "Find the mode of 4, 2, 4, 7, 4, 2.", latex: "\\text{mode}", answer: "4", acceptedAnswers: [], hint: "Most frequent.", explanation: "4 appears three times." },
  { id: "chal-y8-mmm-4", prompt: "Find the range of 12, 5, 18, 9, 3.", latex: "\\text{max}-\\text{min}", answer: "15", acceptedAnswers: [], hint: "Max − min.", explanation: "18 − 3 = 15." },
  { id: "chal-y8-mmm-5", prompt: "Find the mean of 10, 20, 30, 40.", latex: "\\bar{x}", answer: "25", acceptedAnswers: [], hint: "Sum ÷ 4.", explanation: "100/4 = 25." },
  { id: "chal-y8-mmm-6", prompt: "The mean of 5 numbers is 12. Find their total.", latex: "\\sum=\\bar{x}n", answer: "60", acceptedAnswers: [], hint: "Mean × count.", explanation: "12 × 5 = 60." },
  { id: "chal-y8-mmm-7", prompt: "Find the median of 4, 8, 6, 2.", latex: "\\text{median}", answer: "5", acceptedAnswers: [], hint: "Average the middle two.", explanation: "2,4,6,8 → (4+6)/2 = 5." },
  { id: "chal-y8-mmm-8", prompt: "The mean of 6, 10 and x is 9. Find x.", latex: "\\tfrac{6+10+x}{3}=9", answer: "11", acceptedAnswers: [], hint: "Sum must be 27.", explanation: "16 + x = 27 → x = 11." },
  { id: "chal-y8-mmm-9", prompt: "Find the mode of 1, 2, 2, 3, 3, 3, 4.", latex: "\\text{mode}", answer: "3", acceptedAnswers: [], hint: "Most frequent.", explanation: "3 appears three times." },
  { id: "chal-y8-mmm-10", prompt: "A set has range 20 and maximum 35. Find the minimum.", latex: "35-20", answer: "15", acceptedAnswers: [], hint: "Min = max − range.", explanation: "15." },
  { id: "chal-y8-mmm-11", prompt: "Find the mean of 7, 7, 7, 7.", latex: "\\bar{x}", answer: "7", acceptedAnswers: [], hint: "All equal.", explanation: "7." },
  { id: "chal-y8-mmm-12", prompt: "Four numbers have mean 15. Three are 10, 18 and 20. Find the fourth.", latex: "60-48", answer: "12", acceptedAnswers: [], hint: "Total is 60.", explanation: "60 − 48 = 12." },
];

// ── Comparing data displays ───────────────────────────────────────────────────────────────────
export const comparingDataDisplaysChallenge: PracticeQuestion[] = [
  { id: "chal-y8-cdd-1", prompt: "Set A has mean 10 and Set B has mean 14. Give the higher mean.", latex: "\\max", answer: "14", acceptedAnswers: [], hint: "Compare the means.", explanation: "14." },
  { id: "chal-y8-cdd-2", prompt: "Set A is 2, 4, 6 and Set B is 3, 3, 3. Find the difference in their means.", latex: "4-3", answer: "1", acceptedAnswers: [], hint: "Means are 4 and 3.", explanation: "1." },
  { id: "chal-y8-cdd-3", prompt: "A class mean rose from 60 to 68 after a re-mark. Find the increase.", latex: "68-60", answer: "8", acceptedAnswers: [], hint: "Subtract.", explanation: "8." },
  { id: "chal-y8-cdd-4", prompt: "Class A median is 15, Class B median is 12. Find the difference.", latex: "15-12", answer: "3", acceptedAnswers: [], hint: "Subtract.", explanation: "3." },
  { id: "chal-y8-cdd-5", prompt: "Four values have mean 50 (sum 200). A fifth value of 60 is added. Find the new mean.", latex: "\\tfrac{260}{5}", answer: "52", acceptedAnswers: [], hint: "New total ÷ 5.", explanation: "260/5 = 52." },
  { id: "chal-y8-cdd-6", prompt: "Set A has range 20, Set B has range 12. Give the range of the more spread-out set.", latex: "\\max", answer: "20", acceptedAnswers: [], hint: "Bigger range = more spread.", explanation: "20." },
  { id: "chal-y8-cdd-7", prompt: "The mean of 8 scores is 75. One score of 75 is removed. Find the new mean of the 7 scores.", latex: "\\tfrac{525}{7}", answer: "75", acceptedAnswers: [], hint: "Removing a value equal to the mean.", explanation: "525/7 = 75." },
  { id: "chal-y8-cdd-8", prompt: "Group X totals 240 over 12 people; Group Y totals 200 over 8. Give the higher mean.", latex: "\\max(20,25)", answer: "25", acceptedAnswers: [], hint: "X = 20, Y = 25.", explanation: "25." },
  { id: "chal-y8-cdd-9", prompt: "A student's mean over 5 tests is 70. What must they score on a 6th test to make the mean 72?", latex: "6(72)-5(70)", answer: "82", acceptedAnswers: [], hint: "New total − old total.", explanation: "432 − 350 = 82." },
  { id: "chal-y8-cdd-10", prompt: "Two sets both have mean 10 but ranges 4 and 16. Give the range of the more consistent set.", latex: "\\min", answer: "4", acceptedAnswers: [], hint: "More consistent = smaller range.", explanation: "4." },
  { id: "chal-y8-cdd-11", prompt: "Combine 3 values (mean 8) and 2 values (mean 13). Find the overall mean.", latex: "\\tfrac{24+26}{5}", answer: "10", acceptedAnswers: [], hint: "Total 50 over 5.", explanation: "50/5 = 10." },
  { id: "chal-y8-cdd-12", prompt: "A skewed set has median 20 and mean 25. Give the larger measure.", latex: "\\max", answer: "25", acceptedAnswers: [], hint: "Compare.", explanation: "25." },
];

// ── Stem-and-leaf plots ───────────────────────────────────────────────────────────────────────
export const stemAndLeafPlotsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-slp-1", prompt: "A stem-and-leaf plot has stem 1 | 2 5 8 and stem 2 | 0 3. How many data values are there?", latex: "3+2", answer: "5", acceptedAnswers: [], hint: "Count the leaves.", explanation: "5 values." },
  { id: "chal-y8-slp-2", prompt: "For stem 1 | 2 5 8 and stem 2 | 0 3 (values 12,15,18,20,23), find the median.", latex: "\\text{median}", answer: "18", acceptedAnswers: [], hint: "Middle of 5.", explanation: "The 3rd value is 18." },
  { id: "chal-y8-slp-3", prompt: "For values 12, 15, 18, 20, 23, find the range.", latex: "23-12", answer: "11", acceptedAnswers: [], hint: "Max − min.", explanation: "11." },
  { id: "chal-y8-slp-4", prompt: "For stem 3 | 1 4 and stem 4 | 2 6 9 (values 31,34,42,46,49), find the median.", latex: "\\text{median}", answer: "42", acceptedAnswers: [], hint: "The 3rd of 5.", explanation: "42." },
  { id: "chal-y8-slp-5", prompt: "For values 31, 34, 42, 46, 49, find the minimum.", latex: "\\min", answer: "31", acceptedAnswers: [], hint: "Smallest.", explanation: "31." },
  { id: "chal-y8-slp-6", prompt: "For values 31, 34, 42, 46, 49, find the maximum.", latex: "\\max", answer: "49", acceptedAnswers: [], hint: "Largest.", explanation: "49." },
  { id: "chal-y8-slp-7", prompt: "For stem 2 | 5 5 7 and stem 3 | 1 (values 25,25,27,31), find the mode.", latex: "\\text{mode}", answer: "25", acceptedAnswers: [], hint: "Most frequent.", explanation: "25 (twice)." },
  { id: "chal-y8-slp-8", prompt: "Stem 1 | 0 3 6 9. How many values are in this stem row?", latex: "\\text{count}", answer: "4", acceptedAnswers: [], hint: "Count the leaves.", explanation: "4." },
  { id: "chal-y8-slp-9", prompt: "For values 41, 43, 47, 52, 55, find the median.", latex: "\\text{median}", answer: "47", acceptedAnswers: [], hint: "The 3rd of 5.", explanation: "47." },
  { id: "chal-y8-slp-10", prompt: "For values 41, 43, 47, 52, 55, find the range.", latex: "55-41", answer: "14", acceptedAnswers: [], hint: "Max − min.", explanation: "14." },
  { id: "chal-y8-slp-11", prompt: "For stem 6 | 2 8 and stem 7 | 1 (values 62, 68, 71), find the mean.", latex: "\\tfrac{201}{3}", answer: "67", acceptedAnswers: [], hint: "Sum ÷ 3.", explanation: "201/3 = 67." },
  { id: "chal-y8-slp-12", prompt: "Stem 1 | 5 5 5. Find the mode of these values.", latex: "\\text{mode}", answer: "15", acceptedAnswers: [], hint: "All are 15.", explanation: "15." },
];

// ── Quartiles and IQR ─────────────────────────────────────────────────────────────────────────
export const quartilesIqrChallenge: PracticeQuestion[] = [
  { id: "chal-y8-qiq-1", prompt: "For 2, 4, 6, 8, 10, 12, 14, 16 find the lower quartile Q1.", latex: "Q_1", answer: "5", acceptedAnswers: [], hint: "Median of the lower half.", explanation: "Lower half 2,4,6,8 → (4+6)/2 = 5." },
  { id: "chal-y8-qiq-2", prompt: "For 2, 4, 6, 8, 10, 12, 14, 16 find the upper quartile Q3.", latex: "Q_3", answer: "13", acceptedAnswers: [], hint: "Median of the upper half.", explanation: "Upper half 10,12,14,16 → 13." },
  { id: "chal-y8-qiq-3", prompt: "For 2, 4, 6, 8, 10, 12, 14, 16 find the IQR.", latex: "Q_3-Q_1", answer: "8", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "13 − 5 = 8." },
  { id: "chal-y8-qiq-4", prompt: "Find the median of 1, 3, 5, 7, 9.", latex: "\\text{median}", answer: "5", acceptedAnswers: [], hint: "Middle value.", explanation: "5." },
  { id: "chal-y8-qiq-5", prompt: "For 3, 5, 7, 9, 11, 13, 15 find Q1.", latex: "Q_1", answer: "5", acceptedAnswers: [], hint: "Median of 3,5,7.", explanation: "5." },
  { id: "chal-y8-qiq-6", prompt: "For 3, 5, 7, 9, 11, 13, 15 find Q3.", latex: "Q_3", answer: "13", acceptedAnswers: [], hint: "Median of 11,13,15.", explanation: "13." },
  { id: "chal-y8-qiq-7", prompt: "For 3, 5, 7, 9, 11, 13, 15 find the IQR.", latex: "Q_3-Q_1", answer: "8", acceptedAnswers: [], hint: "13 − 5.", explanation: "8." },
  { id: "chal-y8-qiq-8", prompt: "A dataset has Q1 = 12 and Q3 = 28. Find the IQR.", latex: "28-12", answer: "16", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "16." },
  { id: "chal-y8-qiq-9", prompt: "The IQR is 15 and Q1 is 20. Find Q3.", latex: "Q_1+\\text{IQR}", answer: "35", acceptedAnswers: [], hint: "Q3 = Q1 + IQR.", explanation: "35." },
  { id: "chal-y8-qiq-10", prompt: "For 10, 20, 30, 40, 50, 60 find Q1.", latex: "Q_1", answer: "20", acceptedAnswers: [], hint: "Median of 10,20,30.", explanation: "20." },
  { id: "chal-y8-qiq-11", prompt: "For 10, 20, 30, 40, 50, 60 find the IQR.", latex: "Q_3-Q_1", answer: "30", acceptedAnswers: [], hint: "Q3 = 50, Q1 = 20.", explanation: "30." },
  { id: "chal-y8-qiq-12", prompt: "A five-number summary is 5, 10, 18, 25, 40. Find the IQR.", latex: "25-10", answer: "15", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "15." },
];

// ── Outliers and interpretation ───────────────────────────────────────────────────────────────
export const outliersInterpretationChallenge: PracticeQuestion[] = [
  { id: "chal-y8-oai-1", prompt: "Q1 = 10, Q3 = 20, IQR = 10. Find the upper outlier boundary (Q3 + 1.5×IQR).", latex: "20+1.5(10)", answer: "35", acceptedAnswers: [], hint: "Q3 + 1.5 IQR.", explanation: "20 + 15 = 35." },
  { id: "chal-y8-oai-2", prompt: "Q1 = 10, IQR = 10. Find the lower outlier boundary (Q1 − 1.5×IQR).", latex: "10-1.5(10)", answer: "-5", acceptedAnswers: m("-5"), hint: "Q1 − 1.5 IQR.", explanation: "10 − 15 = −5." },
  { id: "chal-y8-oai-3", prompt: "The upper boundary is 35. Is a value of 40 an outlier? Answer yes or no.", latex: "40>35", answer: "yes", acceptedAnswers: ["y"], hint: "Above the boundary.", explanation: "Yes." },
  { id: "chal-y8-oai-4", prompt: "A dataset has IQR 8 and Q3 30. Find the upper boundary.", latex: "30+1.5(8)", answer: "42", acceptedAnswers: [], hint: "Q3 + 1.5 IQR.", explanation: "30 + 12 = 42." },
  { id: "chal-y8-oai-5", prompt: "Q1 = 4, IQR = 6. Find the lower boundary.", latex: "4-1.5(6)", answer: "-5", acceptedAnswers: m("-5"), hint: "Q1 − 1.5 IQR.", explanation: "4 − 9 = −5." },
  { id: "chal-y8-oai-6", prompt: "In 2, 3, 4, 5, 50, which value is the outlier?", latex: "\\text{outlier}", answer: "50", acceptedAnswers: [], hint: "Far from the rest.", explanation: "50." },
  { id: "chal-y8-oai-7", prompt: "For 2, 4, 6, 8, 100, which measure is more reliable: mean or median?", latex: "\\text{robust}", answer: "median", acceptedAnswers: [], hint: "Outliers distort the mean.", explanation: "The median." },
  { id: "chal-y8-oai-8", prompt: "Q1 = 15, Q3 = 27, IQR = 12. Find the upper boundary.", latex: "27+1.5(12)", answer: "45", acceptedAnswers: [], hint: "Q3 + 1.5 IQR.", explanation: "27 + 18 = 45." },
  { id: "chal-y8-oai-9", prompt: "The lower boundary is −5. Is a value of −10 an outlier? Answer yes or no.", latex: "-10<-5", answer: "yes", acceptedAnswers: ["y"], hint: "Below the boundary.", explanation: "Yes." },
  { id: "chal-y8-oai-10", prompt: "With boundaries from −5 to 35, is 22 an outlier? Answer yes or no.", latex: "-5\\le22\\le35", answer: "no", acceptedAnswers: ["n"], hint: "Inside the range.", explanation: "No." },
  { id: "chal-y8-oai-11", prompt: "Q3 = 50, IQR = 20. Find the upper boundary.", latex: "50+1.5(20)", answer: "80", acceptedAnswers: [], hint: "Q3 + 1.5 IQR.", explanation: "50 + 30 = 80." },
  { id: "chal-y8-oai-12", prompt: "Remove the outlier 100 from 2, 4, 6, 100. Find the new mean of the remaining values.", latex: "\\tfrac{12}{3}", answer: "4", acceptedAnswers: [], hint: "Mean of 2, 4, 6.", explanation: "12/3 = 4." },
];

// ── Box plots ─────────────────────────────────────────────────────────────────────────────────
export const boxPlotsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-bxp-1", prompt: "A box plot has min 5, Q1 10, median 15, Q3 25, max 40. Find the IQR.", latex: "25-10", answer: "15", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "15." },
  { id: "chal-y8-bxp-2", prompt: "For min 5, Q1 10, median 15, Q3 25, max 40, find the range.", latex: "40-5", answer: "35", acceptedAnswers: [], hint: "Max − min.", explanation: "35." },
  { id: "chal-y8-bxp-3", prompt: "For min 5, Q1 10, median 15, Q3 25, max 40, find the median.", latex: "\\text{median}", answer: "15", acceptedAnswers: [], hint: "The centre line.", explanation: "15." },
  { id: "chal-y8-bxp-4", prompt: "A box plot has Q1 = 20 and Q3 = 35. Find the IQR.", latex: "35-20", answer: "15", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "15." },
  { id: "chal-y8-bxp-5", prompt: "A box plot has min 0 and max 50. Find the range.", latex: "50-0", answer: "50", acceptedAnswers: [], hint: "Max − min.", explanation: "50." },
  { id: "chal-y8-bxp-6", prompt: "A box plot's box spans 22 to 42. Find the IQR.", latex: "42-22", answer: "20", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "20." },
  { id: "chal-y8-bxp-7", prompt: "A box plot's whiskers reach 8 and 44. Find the range.", latex: "44-8", answer: "36", acceptedAnswers: [], hint: "Max − min.", explanation: "36." },
  { id: "chal-y8-bxp-8", prompt: "A box plot has Q1 8, median 12, Q3 18. Which quarter-box is wider — give its width (lower 8→12 or upper 12→18)?", latex: "\\max(4,6)", answer: "6", acceptedAnswers: [], hint: "Compare 4 and 6.", explanation: "Upper box 12→18 = 6." },
  { id: "chal-y8-bxp-9", prompt: "A five-number summary is 10, 15, 20, 30, 45. Find the box width (Q1 to Q3).", latex: "30-15", answer: "15", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "15." },
  { id: "chal-y8-bxp-10", prompt: "A box plot has Q1 = 25 and IQR = 10. Find Q3.", latex: "25+10", answer: "35", acceptedAnswers: [], hint: "Q3 = Q1 + IQR.", explanation: "35." },
  { id: "chal-y8-bxp-11", prompt: "A box plot has min 30 and max 80. Find the range.", latex: "80-30", answer: "50", acceptedAnswers: [], hint: "Max − min.", explanation: "50." },
  { id: "chal-y8-bxp-12", prompt: "A symmetric box plot has median 20 and Q1 15. Find Q3.", latex: "20+(20-15)", answer: "25", acceptedAnswers: [], hint: "Symmetry about the median.", explanation: "25." },
];

// ── Comparing data with box plots ─────────────────────────────────────────────────────────────
export const comparingBoxPlotsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-cbp-1", prompt: "Box plot A has median 20, B has median 30. Give the higher median.", latex: "\\max", answer: "30", acceptedAnswers: [], hint: "Compare.", explanation: "30." },
  { id: "chal-y8-cbp-2", prompt: "A has IQR 10, B has IQR 18. Give the larger IQR (more spread).", latex: "\\max", answer: "18", acceptedAnswers: [], hint: "Bigger IQR = more spread.", explanation: "18." },
  { id: "chal-y8-cbp-3", prompt: "A has range 40, B has range 25. Give the larger range.", latex: "\\max", answer: "40", acceptedAnswers: [], hint: "Compare.", explanation: "40." },
  { id: "chal-y8-cbp-4", prompt: "A and B both have median 15, but A has IQR 8 and B has IQR 20. Give the IQR of the more consistent set.", latex: "\\min", answer: "8", acceptedAnswers: [], hint: "More consistent = smaller IQR.", explanation: "8." },
  { id: "chal-y8-cbp-5", prompt: "Box A spans Q1 10 to Q3 30; Box B spans Q1 12 to Q3 22. Give the smaller IQR.", latex: "\\min(20,10)", answer: "10", acceptedAnswers: [], hint: "A = 20, B = 10.", explanation: "10." },
  { id: "chal-y8-cbp-6", prompt: "A has median 50, B has median 42. Find the difference in medians.", latex: "50-42", answer: "8", acceptedAnswers: [], hint: "Subtract.", explanation: "8." },
  { id: "chal-y8-cbp-7", prompt: "A reaches a max of 60, B starts at a min of 55. Do the plots overlap? Answer yes or no.", latex: "55<60", answer: "yes", acceptedAnswers: ["y"], hint: "Does B's min fall below A's max?", explanation: "Yes." },
  { id: "chal-y8-cbp-8", prompt: "A has IQR 12 and B has IQR 12. Find the difference in their IQRs.", latex: "12-12", answer: "0", acceptedAnswers: [], hint: "Equal spread.", explanation: "0." },
  { id: "chal-y8-cbp-9", prompt: "A has range 100, B has range 60. Find the difference in ranges.", latex: "100-60", answer: "40", acceptedAnswers: [], hint: "Subtract.", explanation: "40." },
  { id: "chal-y8-cbp-10", prompt: "Class A median 70, Class B median 65. Give the higher median (better performance).", latex: "\\max", answer: "70", acceptedAnswers: [], hint: "Compare.", explanation: "70." },
  { id: "chal-y8-cbp-11", prompt: "A's box spans 20–40, B's box spans 25–55. Give the wider box's width.", latex: "\\max(20,30)", answer: "30", acceptedAnswers: [], hint: "A = 20, B = 30.", explanation: "30." },
  { id: "chal-y8-cbp-12", prompt: "A and B both have median 35; A has range 20 and B has range 50. Give the range of the more variable set.", latex: "\\max", answer: "50", acceptedAnswers: [], hint: "More variable = larger range.", explanation: "50." },
];

// ── Shape of distributions ────────────────────────────────────────────────────────────────────
export const shapeOfDistributionsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sod-1", prompt: "In a symmetric distribution the mean equals the median. If the median is 25, find the mean.", latex: "\\bar{x}=\\text{median}", answer: "25", acceptedAnswers: [], hint: "They are equal.", explanation: "25." },
  { id: "chal-y8-sod-2", prompt: "In a right-skewed (positively skewed) set, is the mean greater or less than the median? Answer greater or less.", latex: "\\bar{x}\\ ?\\ \\text{median}", answer: "greater", acceptedAnswers: [], hint: "The tail pulls the mean up.", explanation: "Greater." },
  { id: "chal-y8-sod-3", prompt: "In a left-skewed (negatively skewed) set, is the mean greater or less than the median? Answer greater or less.", latex: "\\bar{x}\\ ?\\ \\text{median}", answer: "less", acceptedAnswers: [], hint: "The tail pulls the mean down.", explanation: "Less." },
  { id: "chal-y8-sod-4", prompt: "Is the set 1, 2, 2, 2, 3 symmetric? Answer yes or no.", latex: "\\text{symmetric?}", answer: "yes", acceptedAnswers: ["y"], hint: "Balanced about 2.", explanation: "Yes." },
  { id: "chal-y8-sod-5", prompt: "A symmetric set has median 40 and Q1 30. Find Q3.", latex: "40+(40-30)", answer: "50", acceptedAnswers: [], hint: "Symmetry about the median.", explanation: "50." },
  { id: "chal-y8-sod-6", prompt: "The set 1, 1, 1, 1, 10 is skewed which way? Answer left or right.", latex: "\\text{skew}", answer: "right", acceptedAnswers: [], hint: "The tail points to large values.", explanation: "Right (positive)." },
  { id: "chal-y8-sod-7", prompt: "The mean (50) exceeds the median (40). Which way is the distribution skewed? Answer left or right.", latex: "\\bar{x}>\\text{median}", answer: "right", acceptedAnswers: [], hint: "Mean above median.", explanation: "Right." },
  { id: "chal-y8-sod-8", prompt: "A bell-shaped symmetric distribution has mode = median = mean = 60. Find the mode.", latex: "\\text{mode}", answer: "60", acceptedAnswers: [], hint: "All equal.", explanation: "60." },
  { id: "chal-y8-sod-9", prompt: "The median is 20 and the mean is 14. Which way is the distribution skewed? Answer left or right.", latex: "\\bar{x}<\\text{median}", answer: "left", acceptedAnswers: [], hint: "Mean below median.", explanation: "Left." },
  { id: "chal-y8-sod-10", prompt: "A symmetric distribution has Q1 = 18 and Q3 = 42. Find the median.", latex: "\\tfrac{18+42}{2}", answer: "30", acceptedAnswers: [], hint: "Midpoint of the quartiles.", explanation: "30." },
  { id: "chal-y8-sod-11", prompt: "Is the set 5, 5, 6, 7, 7 symmetric? Answer yes or no.", latex: "\\text{symmetric?}", answer: "yes", acceptedAnswers: ["y"], hint: "Balanced about 6.", explanation: "Yes." },
  { id: "chal-y8-sod-12", prompt: "Most values are small with a few very large ones. Which way is the distribution skewed? Answer left or right.", latex: "\\text{skew}", answer: "right", acceptedAnswers: [], hint: "Tail toward large values.", explanation: "Right." },
];
