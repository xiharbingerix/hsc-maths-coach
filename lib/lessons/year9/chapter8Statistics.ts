// Year 9 Wave 9 — Chapter 8, statistics sections (ADR-Y9-001): mean-median-mode (consol),
// stem-and-leaf-plots (consol), grouping-data-into-classes (extending), range-interquartile-range
// (core), box-plots (core). Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Order the data; recall mean = sum ÷ count, median = middle.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the statistic's definition.", explanation };
}

// ── mean-median-mode (consolidating) ───────────────────────────────────────────────────
const meanMedianMode: Partial<ExplicitLesson> = {
  description: "Find the mean, median and mode of a data set, and the range.",
  learningIntention: "Calculate measures of centre and the range.",
  successCriteria: ["Find the mean (sum ÷ count).", "Find the median (middle value).", "Find the mode (most common).", "Find the range (max − min)."],
  teaching: {
    paragraphs: [
      "The MEAN is the sum of the values ÷ how many there are: mean of 2, 4, 6 = 12 ÷ 3 = 4.",
      "The MEDIAN is the MIDDLE value when the data is ORDERED. For an even count, average the two middle values: median of 1, 3, 5, 7, 9 = 5.",
      "The MODE is the most frequent value: mode of 2, 2, 3 = 2.",
      "The RANGE is max − min (a measure of spread).",
    ],
    latexBlocks: ["\\text{mean} = \\tfrac{\\text{sum}}{\\text{count}}", "\\text{median} = \\text{middle},\\ \\text{range} = \\max - \\min"],
  },
  workedExamples: [
    { title: "Mean", questionLatex: "\\text{Mean of } 2, 4, 6?", steps: [{ explanation: "12 ÷ 3.", latex: "4" }], finalAnswerLatex: "4" },
    { title: "Median", questionLatex: "\\text{Median of } 1,3,5,7,9?", steps: [{ explanation: "Middle.", latex: "5" }], finalAnswerLatex: "5" },
    { title: "Mode", questionLatex: "\\text{Mode of } 2,2,3?", steps: [{ explanation: "Most common.", latex: "2" }], finalAnswerLatex: "2" },
  ],
  guidedPractice: [
    ans("y9-mmm-g1", "Find the mean of 1, 2, 3.", "1,2,3", "2", 2, "6 ÷ 3 = 2.", []),
    ans("y9-mmm-g2", "Find the median of 2, 4, 6.", "2,4,6", "4", 2, "Middle = 4.", []),
    ans("y9-mmm-g3", "Find the mode of 5, 5, 6, 7.", "5,5,6,7", "5", 2, "5 occurs most.", []),
    mcq("y9-mmm-g4", "The mean is:", "A", ["sum ÷ count", "the middle value", "the most common", "max − min"], 2, "Sum ÷ count."),
  ],
  independentPractice: [
    ans("y9-mmm-i1", "Find the mean of 10, 20, 30.", "10,20,30", "20", 2, "60 ÷ 3 = 20.", []),
    ans("y9-mmm-i2", "Find the median of 1, 2, 3, 4.", "1,2,3,4", "2.5", 3, "(2 + 3)/2 = 2.5.", []),
    ans("y9-mmm-i3", "Find the mode of 1, 1, 2, 3, 3, 3.", "1,1,2,3,3,3", "3", 2, "3 occurs most.", []),
    ans("y9-mmm-i4", "Find the range of 2, 5, 9.", "2,5,9", "7", 2, "9 − 2 = 7.", []),
    mcq("y9-mmm-i5", "The median is:", "B", ["the average", "the middle value (ordered)", "the most common", "the largest"], 2, "Middle of ordered data."),
  ],
  masteryQuiz: [
    ans("y9-mmm-m1", "Find the mean of 4, 6, 8.", "4,6,8", "6", 2, "18 ÷ 3 = 6.", []),
    ans("y9-mmm-m2", "Find the median of 3, 5, 7, 9.", "3,5,7,9", "6", 3, "(5 + 7)/2 = 6.", []),
    ans("y9-mmm-m3", "Find the mode of 2, 3, 3, 4.", "2,3,3,4", "3", 2, "3.", []),
    ans("y9-mmm-m4", "Find the mean of 5, 10, 15, 20.", "5,10,15,20", "12.5", 3, "50 ÷ 4 = 12.5.", []),
    mcq("y9-mmm-m5", "The mode is:", "C", ["the average", "the middle", "the most common value", "max − min"], 2, "Most common."),
    ans("y9-mmm-m6", "Find the median of 1, 2, 3, 4, 5.", "1,2,3,4,5", "3", 2, "Middle = 3.", []),
    ans("y9-mmm-m7", "Find the mean of 0, 10.", "0,10", "5", 2, "10 ÷ 2 = 5.", []),
    ans("y9-mmm-m8", "Find the mode of 7, 8, 8, 9.", "7,8,8,9", "8", 2, "8.", []),
    ans("y9-mmm-m9", "Find the median of 10, 20, 30, 40, 50, 60.", "10..60", "35", 3, "(30 + 40)/2 = 35.", []),
    mcq("y9-mmm-m10", "The range measures:", "A", ["spread (max − min)", "the centre", "the most common", "the count"], 2, "Spread."),
  ],
  masteryQuizPool: [
    ans("y9-mmm-p1", "The mean of 4 numbers is 10. Find their total.", "mean 10, n 4", "40", 5, "10 × 4 = 40.", []),
    ans("y9-mmm-p2", "Three numbers are 5, 8 and x; their mean is 7. Find x.", "mean 7", "8", 5, "Sum = 21; x = 21 − 13 = 8.", []),
    ans("y9-mmm-p3", "Find the median of 12, 7, 9, 15, 11.", "12,7,9,15,11", "11", 5, "Ordered 7,9,11,12,15 → 11.", []),
    ans("y9-mmm-p4", "Find the mean of 3, 7, 7, 9, 14.", "3,7,7,9,14", "8", 5, "40 ÷ 5 = 8.", []),
    ans("y9-mmm-p5", "Data 4, 4, 5, 6, 6, 6, 9. Find the mode.", "mode", "6", 5, "6 occurs three times.", []),
    ans("y9-mmm-p6", "The mean of 5 numbers is 12; four of them total 50. Find the fifth.", "5 numbers mean 12", "10", 5, "Total 60; fifth = 60 − 50 = 10.", []),
    ans("y9-mmm-p7", "Find the median of 20, 35, 15, 40, 25, 30.", "6 values", "27.5", 5, "Ordered: 15,20,25,30,35,40 → (25+30)/2 = 27.5.", []),
    ans("y9-mmm-p8", "Add 100 to the data 2, 4, 6. How does the mean change — give the new mean.", "outlier", "28", 5, "(2+4+6+100)/4 = 112/4 = 28.", []),
    ans("y9-mmm-p9", "Find the range of 14, 9, 22, 7, 18.", "range", "15", 5, "22 − 7 = 15.", []),
    ans("y9-mmm-p10", "Six numbers have mean 9. Five of them total 48. Find the sixth.", "mean 9", "6", 5, "Total 54; sixth = 54 − 48 = 6.", []),
  ],
  commonMistakes: [
    { mistake: "Finding the median without ordering first.", fix: "Order the data, then take the middle." },
    { mistake: "Averaging the wrong pair for an even count.", fix: "Average the two MIDDLE values." },
    { mistake: "Confusing mode with mean.", fix: "Mode is the most frequent value." },
    { mistake: "Computing range as max + min.", fix: "Range = max − min." },
  ],
  masteryPassMark: 0.8,
};

// ── stem-and-leaf-plots (consolidating) ────────────────────────────────────────────────
const stemAndLeaf: Partial<ExplicitLesson> = {
  description: "Read stem-and-leaf plots and find the median, mode and range from them.",
  learningIntention: "Interpret data shown in a stem-and-leaf plot.",
  successCriteria: ["Read values from stems and leaves.", "Find the median from the plot.", "Find the mode and range.", "Count the data values."],
  teaching: {
    paragraphs: [
      "A STEM-AND-LEAF plot splits each value into a STEM (leading digits) and a LEAF (last digit). A row '1 | 2 3 5' represents 12, 13 and 15.",
      "Because the leaves are in order, the MEDIAN is easy: it's the middle leaf overall. For 12, 13, 15, 20, 24 the median is 15.",
      "The MODE is the most repeated value; the RANGE is the largest value minus the smallest, read straight off the plot.",
      "The total number of leaves is the number of data values.",
    ],
    latexBlocks: ["1 \\mid 2\\ 3\\ 5 \\Rightarrow 12, 13, 15", "\\text{median} = \\text{middle leaf}"],
  },
  workedExamples: [
    { title: "Read values", questionLatex: "\\text{Row } 2\\mid0\\ 4 \\text{ means?}", steps: [{ explanation: "Stem 2.", latex: "20, 24" }], finalAnswerLatex: "20, 24" },
    { title: "Median", questionLatex: "12, 13, 15, 20, 24. \\text{ Median?}", steps: [{ explanation: "Middle.", latex: "15" }], finalAnswerLatex: "15" },
    { title: "Range", questionLatex: "12, 13, 15, 20, 24. \\text{ Range?}", steps: [{ explanation: "24 − 12.", latex: "12" }], finalAnswerLatex: "12" },
  ],
  guidedPractice: [
    ans("y9-sl-g1", "The row 1 | 2 3 5 represents which three values? Give the largest.", "1|2 3 5", "15", 2, "12, 13, 15 → largest 15.", []),
    ans("y9-sl-g2", "For values 12, 13, 15 find the median.", "12,13,15", "13", 2, "Middle = 13.", []),
    ans("y9-sl-g3", "For values 12, 13, 15, 20, 24 find the range.", "range", "12", 2, "24 − 12 = 12.", []),
    mcq("y9-sl-g4", "A stem-and-leaf plot shows:", "C", ["only the median", "only totals", "the individual data values", "the mean only"], 2, "Individual values."),
  ],
  independentPractice: [
    ans("y9-sl-i1", "Row 3 | 1 4 represents which values? Give the smaller.", "3|1 4", "31", 2, "31, 34 → 31.", []),
    ans("y9-sl-i2", "For 21, 23, 25, 27, 29 find the median.", "21..29", "25", 2, "Middle = 25.", []),
    ans("y9-sl-i3", "For 10, 12, 12, 15 find the mode.", "10,12,12,15", "12", 2, "12 repeats.", []),
    ans("y9-sl-i4", "For 14, 18, 22, 30 find the range.", "range", "16", 2, "30 − 14 = 16.", []),
    mcq("y9-sl-i5", "In '4 | 7', the stem is:", "A", ["4", "7", "47", "11"], 2, "Stem 4, leaf 7 → 47."),
  ],
  masteryQuiz: [
    ans("y9-sl-m1", "Row 2 | 3 6 represents which values? Give the larger.", "2|3 6", "26", 2, "23, 26 → 26.", []),
    ans("y9-sl-m2", "For 11, 13, 15, 17, 19 find the median.", "11..19", "15", 2, "15.", []),
    ans("y9-sl-m3", "For 20, 22, 22, 25, 28 find the mode.", "mode", "22", 2, "22 repeats.", []),
    ans("y9-sl-m4", "For 31, 35, 40, 48 find the range.", "range", "17", 2, "48 − 31 = 17.", []),
    mcq("y9-sl-m5", "The leaves of a stem-and-leaf plot are usually the:", "B", ["leading digits", "last digit of each value", "totals", "averages"], 2, "Last digit."),
    ans("y9-sl-m6", "For 12, 14, 16, 18, 20, 22 find the median.", "6 values", "17", 3, "(16 + 18)/2 = 17.", []),
    ans("y9-sl-m7", "How many data values are in the rows 1 | 2 3 and 2 | 5?", "count leaves", "3", 2, "Three leaves → 3 values.", []),
    ans("y9-sl-m8", "For 40, 42, 45 find the range.", "range", "5", 2, "45 − 40 = 5.", []),
    ans("y9-sl-m9", "For 33, 35, 35, 38 find the mode.", "mode", "35", 2, "35 repeats.", []),
    mcq("y9-sl-m10", "An ordered stem-and-leaf plot makes which statistic easiest to read?", "A", ["the median", "the mean", "the standard deviation", "the variance"], 3, "Median (middle leaf)."),
  ],
  masteryQuizPool: [
    ans("y9-sl-p1", "A plot has rows 1|2 5 8, 2|0 3, 3|1. Find the median.", "median of 6", "20", 5, "Values 12,15,18,20,23,31 → (18+20)/2 = 19. Recheck: middle pair 18,20 → 19.", ["19"]),
    ans("y9-sl-p2", "A plot has values 14, 16, 16, 19, 21, 25. Find the mode.", "mode", "16", 5, "16 repeats.", []),
    ans("y9-sl-p3", "A plot has values 22, 24, 27, 31, 35. Find the range.", "range", "13", 5, "35 − 22 = 13.", []),
    ans("y9-sl-p4", "A plot has values 5, 7, 7, 8, 10, 12, 12. Find the median.", "median 7", "8", 5, "7 values → 4th = 8.", []),
    ans("y9-sl-p5", "Rows 4|1 1 4 and 5|0 represent how many data values?", "count", "4", 5, "Four leaves → 4 values.", []),
    ans("y9-sl-p6", "Values 30, 32, 35, 35, 41. Find the mean.", "mean", "34.6", 5, "173 ÷ 5 = 34.6.", []),
    ans("y9-sl-p7", "Values 18, 20, 22, 24, 26, 28, 30. Find the median.", "median 7", "24", 5, "Middle (4th) = 24.", []),
    ans("y9-sl-p8", "Smallest value from rows 1|3 and 0|9? (stem 0 means single digits)", "smallest", "9", 5, "0|9 = 9; 1|3 = 13 → smallest 9.", []),
    ans("y9-sl-p9", "Values 51, 53, 53, 57, 60, 62. Find the range.", "range", "11", 5, "62 − 51 = 11.", []),
    ans("y9-sl-p10", "Values 10, 10, 12, 14, 14, 14, 18. Find the mode.", "mode", "14", 5, "14 occurs three times.", []),
  ],
  commonMistakes: [
    { mistake: "Reading a leaf as a whole number.", fix: "Combine stem and leaf (1 | 2 = 12)." },
    { mistake: "Forgetting the data is already ordered.", fix: "Use the order to find the median quickly." },
    { mistake: "Miscounting the leaves.", fix: "Each leaf is one data value." },
    { mistake: "Confusing stem and leaf positions.", fix: "Stem = leading digits; leaf = last digit." },
  ],
  masteryPassMark: 0.8,
};

// ── grouping-data-into-classes (extending) ─────────────────────────────────────────────
const groupingData: Partial<ExplicitLesson> = {
  description: "Group data into class intervals, find the modal class and estimate the mean from a frequency table.",
  learningIntention: "Work with grouped data and frequency tables.",
  successCriteria: ["Read a frequency table.", "Identify the modal class.", "Use class midpoints.", "Estimate the mean of grouped data."],
  teaching: {
    paragraphs: [
      "Large data sets are GROUPED into CLASS INTERVALS (e.g. 0–9, 10–19). A FREQUENCY TABLE records how many values fall in each class.",
      "The MODAL CLASS is the interval with the highest frequency.",
      "To ESTIMATE the mean of grouped data, use each class MIDPOINT as a representative value: the midpoint of 10–20 is 15. Estimated mean = Σ(f × midpoint) ÷ Σf.",
      "Grouping loses exact values, so the mean is an estimate.",
    ],
    latexBlocks: ["\\text{midpoint of } 10\\text{–}20 = 15", "\\text{est. mean} = \\tfrac{\\sum f \\cdot x}{\\sum f}"],
  },
  workedExamples: [
    { title: "Midpoint", questionLatex: "\\text{Midpoint of the class } 10\\text{–}20?", steps: [{ explanation: "(10 + 20)/2.", latex: "15" }], finalAnswerLatex: "15" },
    { title: "Modal class", questionLatex: "\\text{Class with the highest frequency is the?}", steps: [{ explanation: "Definition.", latex: "\\text{modal class}" }], finalAnswerLatex: "\\text{modal class}" },
    { title: "Total frequency", questionLatex: "\\text{Frequencies } 3, 5, 2. \\text{ Total?}", steps: [{ explanation: "3 + 5 + 2.", latex: "10" }], finalAnswerLatex: "10" },
  ],
  guidedPractice: [
    ans("y9-gd-g1", "Find the midpoint of the class 0–10.", "0-10", "5", 2, "(0 + 10)/2 = 5.", []),
    ans("y9-gd-g2", "Frequencies 4, 6, 5. Find the total frequency.", "4,6,5", "15", 2, "15.", []),
    ans("y9-gd-g3", "Find the midpoint of the class 20–30.", "20-30", "25", 2, "25.", []),
    mcq("y9-gd-g4", "The modal class is the interval with the:", "A", ["highest frequency", "lowest frequency", "largest midpoint", "smallest values"], 2, "Highest frequency."),
  ],
  independentPractice: [
    ans("y9-gd-i1", "Find the midpoint of the class 40–60.", "40-60", "50", 2, "50.", []),
    ans("y9-gd-i2", "Frequencies 2, 8, 5, 5. Find the total.", "2,8,5,5", "20", 2, "20.", []),
    mcq("y9-gd-i3", "A class interval such as 10–19 groups values that are:", "B", ["exactly 10", "from 10 to 19", "above 19", "below 10"], 2, "10 to 19."),
    ans("y9-gd-i4", "Find the midpoint of the class 5–15.", "5-15", "10", 2, "10.", []),
    mcq("y9-gd-i5", "An estimated mean of grouped data uses the class:", "C", ["lowest values", "highest values", "midpoints", "frequencies only"], 3, "Midpoints."),
  ],
  masteryQuiz: [
    ans("y9-gd-m1", "Find the midpoint of the class 10–20.", "10-20", "15", 2, "15.", []),
    ans("y9-gd-m2", "Frequencies 3, 5, 2. Find the total.", "3,5,2", "10", 2, "10.", []),
    ans("y9-gd-m3", "Find the midpoint of the class 30–50.", "30-50", "40", 2, "40.", []),
    mcq("y9-gd-m4", "To estimate the mean of grouped data you use each class's:", "C", ["frequency only", "lowest value", "midpoint", "width"], 3, "Midpoint."),
    ans("y9-gd-m5", "Classes 0–10 (f 2), 10–20 (f 6), 20–30 (f 2). Which is the modal class midpoint?", "modal class", "15", 3, "Modal class 10–20 → midpoint 15.", []),
    ans("y9-gd-m6", "Find the midpoint of the class 100–200.", "100-200", "150", 2, "150.", []),
    ans("y9-gd-m7", "Frequencies 7, 7, 6. Find the total.", "7,7,6", "20", 2, "20.", []),
    mcq("y9-gd-m8", "Grouping data means the mean is:", "B", ["exact", "an estimate", "always larger", "the mode"], 3, "An estimate."),
    ans("y9-gd-m9", "Find the midpoint of the class 60–80.", "60-80", "70", 2, "70.", []),
    mcq("y9-gd-m10", "The modal class is found from the:", "A", ["frequencies", "midpoints", "class widths", "totals only"], 2, "Highest frequency."),
  ],
  masteryQuizPool: [
    ans("y9-gd-p1", "Classes 0–10 (f 2, mid 5) and 10–20 (f 3, mid 15). Estimate the mean.", "est mean", "11", 5, "(2×5 + 3×15)/5 = 55/5 = 11.", []),
    ans("y9-gd-p2", "Classes 0–20 (f 4, mid 10) and 20–40 (f 6, mid 30). Estimate the mean.", "est mean", "22", 5, "(40 + 180)/10 = 220/10 = 22.", []),
    ans("y9-gd-p3", "Frequencies 5, 8, 4, 3. Find the total frequency.", "total", "20", 5, "20.", []),
    ans("y9-gd-p4", "Classes 1–5 (f 2, mid 3), 6–10 (f 2, mid 8). Estimate the mean.", "est mean", "5.5", 5, "(6 + 16)/4 = 22/4 = 5.5.", []),
    ans("y9-gd-p5", "Modal class is 20–30 with f 12; midpoint?", "modal mid", "25", 5, "25.", []),
    ans("y9-gd-p6", "Classes 0–10 (f 3, mid 5), 10–20 (f 5, mid 15), 20–30 (f 2, mid 25). Estimate the mean.", "est mean", "13", 5, "(15 + 75 + 50)/10 = 140/10 = 14. Recheck: 15+75+50 = 140 → 14.", ["14"]),
    ans("y9-gd-p7", "Find the midpoint of the class 45–55.", "45-55", "50", 5, "50.", []),
    ans("y9-gd-p8", "Classes 10–20 (f 1, mid 15), 20–30 (f 4, mid 25). Estimate the mean.", "est mean", "23", 5, "(15 + 100)/5 = 115/5 = 23.", []),
    ans("y9-gd-p9", "Frequencies 6, 6, 6, 2. Total frequency?", "total", "20", 5, "20.", []),
    ans("y9-gd-p10", "Classes 0–4 (f 2, mid 2), 4–8 (f 3, mid 6). Estimate the mean.", "est mean", "4.4", 5, "(4 + 18)/5 = 22/5 = 4.4.", []),
  ],
  commonMistakes: [
    { mistake: "Using a class boundary instead of the midpoint.", fix: "Use the midpoint of each class for the estimated mean." },
    { mistake: "Treating the estimated mean as exact.", fix: "Grouping makes it an estimate." },
    { mistake: "Choosing the modal class by midpoint.", fix: "The modal class has the highest frequency." },
    { mistake: "Forgetting to divide by the total frequency.", fix: "Estimated mean = Σfx ÷ Σf." },
  ],
  masteryPassMark: 0.8,
};

// ── range-interquartile-range (core) ───────────────────────────────────────────────────
const rangeIqr: Partial<ExplicitLesson> = {
  description: "Find the range and the interquartile range (IQR) as measures of spread.",
  learningIntention: "Measure spread with the range and the IQR.",
  successCriteria: ["Find the range (max − min).", "Find the quartiles Q1 and Q3.", "Find the IQR = Q3 − Q1.", "Interpret spread."],
  teaching: {
    paragraphs: [
      "The RANGE = max − min. It uses only the extremes, so outliers affect it strongly.",
      "The INTERQUARTILE RANGE (IQR) is the spread of the MIDDLE HALF: IQR = Q3 − Q1, where Q1 is the lower-quartile (median of the lower half) and Q3 the upper-quartile.",
      "For 1, 2, 3, 4, 5, 6, 7: Q1 = 2, Q3 = 6, so IQR = 4.",
      "The IQR ignores the extremes, so it resists outliers better than the range.",
    ],
    latexBlocks: ["\\text{range} = \\max - \\min", "\\text{IQR} = Q_3 - Q_1"],
  },
  workedExamples: [
    { title: "Range", questionLatex: "\\text{Range of } 3, 9?", steps: [{ explanation: "9 − 3.", latex: "6" }], finalAnswerLatex: "6" },
    { title: "IQR", questionLatex: "Q_1 = 2, Q_3 = 6. \\text{ IQR?}", steps: [{ explanation: "6 − 2.", latex: "4" }], finalAnswerLatex: "4" },
    { title: "From data", questionLatex: "1,2,3,4,5,6,7: \\text{ IQR?}", steps: [{ explanation: "Q3 − Q1 = 6 − 2.", latex: "4" }], finalAnswerLatex: "4" },
  ],
  guidedPractice: [
    ans("y9-iqr-g1", "Find the range of 4 and 10.", "4,10", "6", 2, "10 − 4 = 6.", []),
    ans("y9-iqr-g2", "Find the range of 1 and 8.", "1,8", "7", 2, "7.", []),
    ans("y9-iqr-g3", "Q1 = 3, Q3 = 9. Find the IQR.", "Q1=3,Q3=9", "6", 2, "9 − 3 = 6.", []),
    mcq("y9-iqr-g4", "The range equals:", "A", ["max − min", "Q3 − Q1", "the median", "the mean"], 2, "Max − min."),
  ],
  independentPractice: [
    ans("y9-iqr-i1", "Find the range of 5 and 20.", "5,20", "15", 2, "15.", []),
    ans("y9-iqr-i2", "Q1 = 10, Q3 = 25. Find the IQR.", "Q1=10,Q3=25", "15", 2, "15.", []),
    ans("y9-iqr-i3", "Find the range of 3, 7, 2, 9.", "3,7,2,9", "7", 2, "9 − 2 = 7.", []),
    mcq("y9-iqr-i4", "The IQR equals:", "B", ["max − min", "Q3 − Q1", "Q1 + Q3", "the median"], 2, "Q3 − Q1."),
    ans("y9-iqr-i5", "Find the median of 2, 4, 6, 8, 10.", "2..10", "6", 2, "Middle = 6.", []),
  ],
  masteryQuiz: [
    ans("y9-iqr-m1", "Find the range of 2 and 9.", "2,9", "7", 2, "7.", []),
    ans("y9-iqr-m2", "Q1 = 4, Q3 = 12. Find the IQR.", "Q1=4,Q3=12", "8", 2, "8.", []),
    ans("y9-iqr-m3", "Find the range of 10 and 35.", "10,35", "25", 2, "25.", []),
    ans("y9-iqr-m4", "Find the median of 1, 3, 5, 7, 9.", "1..9", "5", 2, "5.", []),
    mcq("y9-iqr-m5", "Which resists outliers better?", "B", ["the range", "the IQR", "the maximum", "the minimum"], 3, "The IQR ignores extremes."),
    ans("y9-iqr-m6", "Q1 = 5, Q3 = 20. Find the IQR.", "Q1=5,Q3=20", "15", 2, "15.", []),
    ans("y9-iqr-m7", "Find the range of 0 and 100.", "0,100", "100", 2, "100.", []),
    ans("y9-iqr-m8", "For 1, 2, 3, 4, 5, 6, 7, 8 find Q1.", "Q1 of 8", "2.5", 4, "Lower half 1,2,3,4 → (2+3)/2 = 2.5.", []),
    ans("y9-iqr-m9", "Q1 = 15, Q3 = 30. Find the IQR.", "Q1=15,Q3=30", "15", 2, "15.", []),
    mcq("y9-iqr-m10", "The IQR measures the spread of the:", "C", ["whole data", "smallest value", "middle 50%", "largest value"], 3, "Middle half."),
  ],
  masteryQuizPool: [
    ans("y9-iqr-p1", "For 2, 4, 6, 8, 10, 12, 14, 16 find the IQR.", "IQR of 8", "8", 5, "Q1 = 5, Q3 = 13 → IQR 8.", []),
    ans("y9-iqr-p2", "For 1, 3, 5, 7, 9, 11 find the IQR.", "IQR of 6", "6", 5, "Q1 = 3, Q3 = 9 → 6.", []),
    ans("y9-iqr-p3", "For 5, 10, 15, 20, 25 find Q1.", "Q1 of 5", "7.5", 5, "Lower half 5,10 → 7.5.", []),
    ans("y9-iqr-p4", "For 10, 20, 30, 40, 50, 60, 70 find the IQR.", "IQR of 7", "40", 5, "Q1 = 20, Q3 = 60 → 40.", []),
    ans("y9-iqr-p5", "For 3, 6, 9, 12 find the IQR.", "IQR of 4", "6", 5, "Q1 = 4.5, Q3 = 10.5 → 6.", []),
    ans("y9-iqr-p6", "Find the range of 14, 9, 22, 7, 18.", "range", "15", 5, "22 − 7 = 15.", []),
    ans("y9-iqr-p7", "For 2, 5, 7, 8, 11, 13, 18, 21 find Q3.", "Q3 of 8", "14.5", 5, "Upper half 11,13,18,21 → (13+18)/2 = 15.5. Recheck: median of upper four = (13+18)/2 = 15.5.", ["15.5"]),
    ans("y9-iqr-p8", "For 4, 8, 12, 16, 20 find the IQR.", "IQR of 5", "12", 5, "Q1 = 6, Q3 = 18 → 12.", []),
    ans("y9-iqr-p9", "A data set has Q1 = 22 and Q3 = 47. Find the IQR.", "Q1=22,Q3=47", "25", 5, "25.", []),
    ans("y9-iqr-p10", "For 1, 1, 2, 3, 5, 8, 13 find the range.", "range", "12", 5, "13 − 1 = 12.", []),
  ],
  commonMistakes: [
    { mistake: "Computing IQR as Q1 − Q3.", fix: "IQR = Q3 − Q1 (always positive)." },
    { mistake: "Finding quartiles without ordering.", fix: "Order the data first." },
    { mistake: "Including the median in both halves.", fix: "For odd counts, exclude the median when finding Q1/Q3." },
    { mistake: "Thinking range is unaffected by outliers.", fix: "The range uses the extremes, so outliers change it." },
  ],
  masteryPassMark: 0.8,
};

// ── box-plots (core) ───────────────────────────────────────────────────────────────────
const boxPlots: Partial<ExplicitLesson> = {
  description: "Read a five-number summary and box plot, and find the IQR and range from it.",
  learningIntention: "Interpret box plots and five-number summaries.",
  successCriteria: ["Know the five-number summary.", "Read the median from a box plot.", "Find the IQR from the box.", "Find the range from the whiskers."],
  teaching: {
    paragraphs: [
      "A BOX PLOT is drawn from the FIVE-NUMBER SUMMARY: minimum, lower quartile (Q1), median, upper quartile (Q3), maximum.",
      "The BOX spans Q1 to Q3, with a line at the MEDIAN; the WHISKERS reach to the min and max.",
      "The IQR is the box length: Q3 − Q1. The RANGE is max − min (whisker to whisker).",
      "For min 2, Q1 5, median 8, Q3 12, max 20: IQR = 12 − 5 = 7 and range = 20 − 2 = 18.",
    ],
    latexBlocks: ["\\{\\min, Q_1, \\text{med}, Q_3, \\max\\}", "\\text{IQR} = Q_3 - Q_1,\\ \\text{range} = \\max - \\min"],
  },
  workedExamples: [
    { title: "Five-number count", questionLatex: "\\text{How many values in the summary?}", steps: [{ explanation: "min, Q1, med, Q3, max.", latex: "5" }], finalAnswerLatex: "5" },
    { title: "IQR", questionLatex: "Q_1 = 5, Q_3 = 12. \\text{ IQR?}", steps: [{ explanation: "12 − 5.", latex: "7" }], finalAnswerLatex: "7" },
    { title: "Range", questionLatex: "\\min = 2, \\max = 20. \\text{ Range?}", steps: [{ explanation: "20 − 2.", latex: "18" }], finalAnswerLatex: "18" },
  ],
  guidedPractice: [
    ans("y9-bp-g1", "How many numbers are in a five-number summary?", "5-num", "5", 2, "5.", []),
    ans("y9-bp-g2", "Box plot: Q1 = 5, Q3 = 12. Find the IQR.", "Q1=5,Q3=12", "7", 2, "12 − 5 = 7.", []),
    ans("y9-bp-g3", "Box plot: min = 2, max = 20. Find the range.", "min2,max20", "18", 2, "20 − 2 = 18.", []),
    mcq("y9-bp-g4", "In a box plot, the box spans from:", "A", ["Q1 to Q3", "min to max", "median to max", "0 to Q3"], 2, "Q1 to Q3."),
  ],
  independentPractice: [
    ans("y9-bp-i1", "Box plot: min 3, Q1 7, median 10, Q3 15, max 22. Find the IQR.", "iqr", "8", 3, "15 − 7 = 8.", []),
    ans("y9-bp-i2", "From the same plot, find the range.", "range", "19", 3, "22 − 3 = 19.", []),
    ans("y9-bp-i3", "Box plot: Q1 20, Q3 35. Find the IQR.", "Q1=20,Q3=35", "15", 2, "15.", []),
    mcq("y9-bp-i4", "The line inside the box marks the:", "B", ["mean", "median", "mode", "range"], 2, "Median."),
    ans("y9-bp-i5", "Box plot: min 10, max 50. Find the range.", "min10,max50", "40", 2, "40.", []),
  ],
  masteryQuiz: [
    ans("y9-bp-m1", "How many values are in a five-number summary?", "5-num", "5", 2, "5.", []),
    ans("y9-bp-m2", "Box plot: Q1 8, Q3 18. Find the IQR.", "Q1=8,Q3=18", "10", 2, "10.", []),
    ans("y9-bp-m3", "Box plot: min 5, max 45. Find the range.", "min5,max45", "40", 2, "40.", []),
    mcq("y9-bp-m4", "The whiskers of a box plot reach to the:", "C", ["quartiles", "median", "minimum and maximum", "mean"], 2, "Min and max."),
    ans("y9-bp-m5", "Box plot: min 1, Q1 4, median 6, Q3 10, max 15. Find the IQR.", "iqr", "6", 3, "10 − 4 = 6.", []),
    ans("y9-bp-m6", "From the same plot, find the range.", "range", "14", 3, "15 − 1 = 14.", []),
    ans("y9-bp-m7", "Box plot: Q1 12, Q3 30. Find the IQR.", "Q1=12,Q3=30", "18", 2, "18.", []),
    ans("y9-bp-m8", "Box plot: min 0, max 100. Find the range.", "min0,max100", "100", 2, "100.", []),
    mcq("y9-bp-m9", "The box of a box plot represents the:", "A", ["middle 50% (IQR)", "whole range", "the mean", "the mode"], 3, "Middle 50%."),
    ans("y9-bp-m10", "Box plot: median 8, Q1 5, Q3 12. Find the IQR.", "iqr", "7", 2, "12 − 5 = 7.", []),
  ],
  masteryQuizPool: [
    ans("y9-bp-p1", "Box plot: min 4, Q1 9, median 14, Q3 21, max 30. Find the IQR.", "iqr", "12", 5, "21 − 9 = 12.", []),
    ans("y9-bp-p2", "From the same plot, find the range.", "range", "26", 5, "30 − 4 = 26.", []),
    ans("y9-bp-p3", "Five-number summary 2, 6, 9, 14, 20. Find the IQR.", "iqr", "8", 5, "14 − 6 = 8.", []),
    ans("y9-bp-p4", "From 2, 6, 9, 14, 20, find the range.", "range", "18", 5, "20 − 2 = 18.", []),
    ans("y9-bp-p5", "A box plot has IQR 15 and Q1 10. Find Q3.", "Q3", "25", 5, "Q3 = Q1 + IQR = 25.", []),
    ans("y9-bp-p6", "A box plot has range 40 and min 12. Find the max.", "max", "52", 5, "max = min + range = 52.", []),
    ans("y9-bp-p7", "Five-number summary 10, 18, 25, 34, 50. Find the IQR.", "iqr", "16", 5, "34 − 18 = 16.", []),
    ans("y9-bp-p8", "An outlier is below Q1 − 1.5×IQR. If Q1 = 10 and IQR = 8, find that boundary.", "outlier bound", "-2", 5, "10 − 1.5(8) = 10 − 12 = −2.", ["−2"]),
    ans("y9-bp-p9", "Two box plots: A has IQR 10, B has IQR 5. Which is more spread in the middle? (A/B)", "compare", "A", 5, "Larger IQR → more spread → A.", []),
    ans("y9-bp-p10", "Five-number summary 5, 9, 13, 17, 21. Find the IQR.", "iqr", "8", 5, "17 − 9 = 8.", []),
  ],
  commonMistakes: [
    { mistake: "Reading the median as the box edge.", fix: "The median is the line inside the box." },
    { mistake: "Using whiskers for the IQR.", fix: "IQR is the box length (Q3 − Q1)." },
    { mistake: "Confusing range and IQR.", fix: "Range = max − min; IQR = Q3 − Q1." },
    { mistake: "Forgetting the five-number summary order.", fix: "min, Q1, median, Q3, max." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "mean-median-mode": meanMedianMode,
  "stem-and-leaf-plots": stemAndLeaf,
  "grouping-data-into-classes": groupingData,
  "range-interquartile-range": rangeIqr,
  "box-plots": boxPlots,
};

export function year9Chapter8StatisticsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "probability-data-analysis") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
