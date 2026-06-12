import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

type LessonContent = Pick<ExplicitLesson, "description" | "learningIntention" | "successCriteria" | "teaching" | "workedExamples" | "guidedPractice" | "independentPractice" | "commonMistakes" | "masteryQuiz">;

function safeStatisticsAnswerVariants(prompt: string, answer: string) {
  const variants: string[] = [];
  const lowerPrompt = prompt.toLowerCase();
  const numericAnswer = Number(answer.replace(/,/g, ""));

  if (Number.isFinite(numericAnswer)) {
    if (Number.isInteger(numericAnswer)) {
      variants.push(numericAnswer.toFixed(1));
    }
    if (Math.abs(numericAnswer) >= 1000) {
      variants.push(numericAnswer.toLocaleString("en-AU"));
    }
  }

  const labels: string[] = [];
  if (lowerPrompt.startsWith("find the mean")) labels.push("mean");
  if (lowerPrompt.startsWith("find the median")) labels.push("median");
  if (lowerPrompt.startsWith("find the mode")) labels.push("mode");
  if (lowerPrompt.startsWith("find the range")) labels.push("range");
  if (lowerPrompt.includes("find q1")) labels.push("Q1", "q1");
  if (lowerPrompt.includes("find q3")) labels.push("Q3", "q3");
  if (lowerPrompt.includes("find its iqr") || lowerPrompt.includes("find the iqr")) labels.push("IQR", "iqr");
  if (lowerPrompt.startsWith("find the population standard deviation")) labels.push("SD", "sd");

  for (const label of labels) {
    variants.push(`${label}=${answer}`, `${label} = ${answer}`);
  }

  if (lowerPrompt.includes("minutes")) {
    variants.push(`${answer} minutes`, `${answer} min`);
  }

  return variants;
}

function number(id: string, prompt: string, latex: string, answer: string, explanation: string, acceptedAnswers: string[] = []): PracticeQuestion {
  const displayLatex = /-(?:g|i)\d+$/.test(id) ? "\\text{Show your statistical method clearly.}" : latex;
  return { id, prompt, latex: displayLatex, answer, acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...safeStatisticsAnswerVariants(prompt, answer)])), hint: "Identify the statistic requested, then calculate carefully.", explanation };
}

function choice(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], explanation: string, latex = "\\text{Select A, B, C, or D.}"): PracticeQuestion {
  return { id, prompt, latex, answer, choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })), hint: "Compare each statement with the data summary.", explanation };
}

const summaryReview: LessonContent = {
  description: "Review mean, median, mode and range, and choose useful summaries for a context.",
  learningIntention: "Calculate and interpret common measures of centre and spread.",
  successCriteria: ["Calculate the mean.", "Find the median and mode.", "Calculate the range.", "Choose a useful summary for a context."],
  teaching: {
    paragraphs: ["The mean is the total of the values divided by the number of values.", "The median is the middle value after the data is ordered. The mode is the most frequent value.", "The range measures overall spread by subtracting the minimum from the maximum.", "An extreme value can pull the mean noticeably. In that situation, the median may better describe a typical value."],
    latexBlocks: ["\\text{mean}=\\frac{\\text{sum of values}}{\\text{number of values}}", "\\text{range}=\\text{maximum}-\\text{minimum}"],
  },
  workedExamples: [
    { title: "Calculate a mean", questionLatex: "\\text{Find the mean of }4,6,7,8,10.", steps: [{ explanation: "Add the values.", latex: "4+6+7+8+10=35" }, { explanation: "Divide by five values.", latex: "\\text{mean}=35\\div5=7" }], finalAnswerLatex: "7" },
    { title: "Find a median", questionLatex: "\\text{Find the median of }9,3,7,5,4.", steps: [{ explanation: "Order the data.", latex: "3,4,5,7,9" }, { explanation: "Choose the middle value.", latex: "\\text{median}=5" }], finalAnswerLatex: "5" },
    { title: "Identify mode and range", questionLatex: "\\text{Find the mode and range of }2,5,5,6,9.", steps: [{ explanation: "The repeated value is the mode.", latex: "\\text{mode}=5" }, { explanation: "Subtract the minimum from the maximum.", latex: "\\text{range}=9-2=7" }], finalAnswerLatex: "\\text{mode}=5,\\quad\\text{range}=7" },
  ],
  guidedPractice: [
    number("y9-dec-summary-g1", "Find the mean of 2, 4, 6 and 8.", "\\text{mean}=\\frac{2+4+6+8}{4}", "5", "The sum is 20, then divide by 4."),
    number("y9-dec-summary-g2", "Find the median of 8, 1, 5, 3 and 7.", "\\text{ordered: }1,3,5,7,8", "5", "Order the values and choose the middle one."),
    number("y9-dec-summary-g3", "Find the mode of 4, 6, 6, 7 and 9.", "\\text{mode}=6", "6", "Six occurs most often."),
    choice("y9-dec-summary-g4", "One unusually large value appears in a dataset. Which measure of centre is often less affected?", "B", ["Mean", "Median", "Range", "Maximum"], "The median is resistant to a single extreme value."),
  ],
  independentPractice: [
    number("y9-dec-summary-i1", "Find the range of 3, 7, 8 and 12.", "\\text{range}=12-3", "9", "Subtract the minimum from the maximum."),
    number("y9-dec-summary-i2", "Find the mean of 5, 6, 7, 8 and 9.", "\\text{mean}=\\frac{35}{5}", "7", "The total is 35, then divide by 5."),
    number("y9-dec-summary-i3", "Find the median of 11, 4, 8, 6 and 10.", "\\text{ordered: }4,6,8,10,11", "8", "The middle ordered value is 8."),
    choice("y9-dec-summary-i4", "Which dataset has mode 3?", "C", ["1, 2, 4, 5", "2, 2, 4, 4", "1, 3, 3, 5", "3, 4, 5, 6"], "Three is the only value occurring more than once."),
    choice("y9-dec-summary-i5", "House prices include one unusually expensive property. Which centre is often best for a typical price?", "D", ["Maximum", "Range", "Mean only", "Median"], "The median is less affected by the unusually expensive property."),
  ],
  commonMistakes: [
    { mistake: "Finding the median before ordering the data.", fix: "Place values in ascending order first." },
    { mistake: "Dividing the total by the wrong number of values.", fix: "Count every value once before calculating the mean." },
    { mistake: "Calling the largest value the range.", fix: "Range is maximum minus minimum." },
    { mistake: "Assuming every dataset has exactly one mode.", fix: "A dataset can have no mode or more than one mode." },
  ],
  masteryQuiz: [
    number("y9-dec-summary-m1", "Find the mean of 6, 8, 10 and 12.", "\\text{mean}=\\frac{36}{4}", "9", "Divide the total 36 by 4."),
    number("y9-dec-summary-m2", "Find the median of 2, 9, 4, 6 and 8.", "\\text{ordered: }2,4,6,8,9", "6", "The middle value is 6."),
    number("y9-dec-summary-m3", "Find the mode of 1, 3, 3, 5 and 7.", "\\text{mode}=3", "3", "Three occurs twice."),
    number("y9-dec-summary-m4", "Find the range of 5, 8, 11 and 14.", "\\text{range}=14-5", "9", "Subtract 5 from 14."),
    choice("y9-dec-summary-m5", "Which dataset has no mode?", "A", ["1, 2, 3, 4", "2, 2, 3, 4", "1, 3, 3, 5", "4, 4, 4, 5"], "No value repeats in the first dataset."),
    number("y9-dec-summary-m6", "Find the mean of 3, 5, 7, 9 and 11.", "\\text{mean}=\\frac{35}{5}", "7", "Divide 35 by 5."),
    choice("y9-dec-summary-m7", "Which measure describes overall spread using only the extreme values?", "C", ["Mean", "Median", "Range", "Mode"], "Range uses maximum minus minimum."),
    number("y9-dec-summary-m8", "The mean of 5, 7, x, 9 and 10 is 8. Find x.", "\\frac{5+7+x+9+10}{5}=8", "9", "The required total is 40. The known values total 31."),
    choice("y9-dec-summary-m9", "Dataset A has median 12 and range 4. Dataset B has median 12 and range 20. Which is more consistent?", "A", ["Dataset A", "Dataset B", "They must contain the same values", "The median decides consistency"], "The smaller range indicates less spread."),
    choice("y9-dec-summary-m10", "A very large outlier is added to a dataset. Which statement is safest?", "D", ["The median must increase greatly", "The mode must change", "The range must decrease", "The mean and range may increase noticeably"], "An extreme high value can increase the mean and range."),
  ],
};

const quartilesIqr: LessonContent = {
  description: "Find quartiles and interquartile ranges using a consistent ordered-data convention.",
  learningIntention: "Use quartiles and IQR to describe the middle half of a dataset.",
  successCriteria: ["Order values before finding quartiles.", "Find Q1, median and Q3.", "Calculate IQR.", "Explain why IQR can be useful when extreme values occur."],
  teaching: {
    paragraphs: ["Quartiles divide ordered data into sections. The median is Q2.", "For this course, when a dataset has an odd number of values, exclude the median before finding Q1 and Q3.", "Q1 is the median of the lower half and Q3 is the median of the upper half.", "The interquartile range is the width of the middle 50% of the data. It is often less affected by an extreme value than the range."],
    latexBlocks: ["IQR=Q_3-Q_1", "\\text{middle }50\\%\\text{ lies between }Q_1\\text{ and }Q_3"],
  },
  workedExamples: [
    { title: "Find quartiles", questionLatex: "\\text{Find }Q_1,Q_2,Q_3\\text{ for }1,3,5,7,9.", steps: [{ explanation: "Exclude the median 5.", latex: "\\text{lower half: }1,3\\quad\\text{upper half: }7,9" }, { explanation: "Find each half median.", latex: "Q_1=2,\\quad Q_2=5,\\quad Q_3=8" }], finalAnswerLatex: "Q_1=2,\\quad Q_2=5,\\quad Q_3=8" },
    { title: "Calculate an IQR", questionLatex: "\\text{Find the IQR for }2,4,5,7,8,10,12.", steps: [{ explanation: "Exclude median 7 and find half medians.", latex: "Q_1=4,\\quad Q_3=10" }, { explanation: "Subtract quartiles.", latex: "IQR=10-4=6" }], finalAnswerLatex: "6" },
    { title: "Compare range and IQR after an outlier", questionLatex: "\\text{Compare }1,2,3,4,5,6,7,8,9\\text{ with }1,2,3,4,5,6,7,8,50.", steps: [{ explanation: "Both datasets have the same quartiles.", latex: "Q_1=2.5,\\quad Q_3=7.5,\\quad IQR=5" }, { explanation: "The extreme value changes the range.", latex: "8\\text{ becomes }49" }], finalAnswerLatex: "\\text{The IQR stays 5 while the range increases.}" },
  ],
  guidedPractice: [
    number("y9-dec-iqr-g1", "For the ordered data 1, 3, 5, 7, 9, find Q1.", "Q_1=2", "2", "Exclude 5, then find the median of 1 and 3."),
    number("y9-dec-iqr-g2", "For the ordered data 2, 4, 6, 8, 10, 12, 14, find Q3.", "Q_3=12", "12", "Exclude 8, then find the median of 10, 12 and 14."),
    number("y9-dec-iqr-g3", "A dataset has Q1 = 11 and Q3 = 19. Find its IQR.", "IQR=19-11", "8", "Subtract Q1 from Q3."),
    choice("y9-dec-iqr-g4", "What should be done before finding quartiles?", "A", ["Order the data", "Add an outlier", "Find the mode only", "Remove the maximum"], "Quartiles use positions in ordered data."),
  ],
  independentPractice: [
    number("y9-dec-iqr-i1", "For the ordered data 3, 5, 7, 9, 11, find the IQR.", "Q_1=4,\\quad Q_3=10", "6", "Exclude 7, then subtract 4 from 10."),
    number("y9-dec-iqr-i2", "For the ordered data 1, 2, 4, 6, 7, 9, 11, find the IQR.", "Q_1=2,\\quad Q_3=9", "7", "Exclude 6, then subtract 2 from 9."),
    choice("y9-dec-iqr-i3", "Dataset A has IQR 4 and Dataset B has IQR 13. Which has the more tightly grouped middle half?", "B", ["Dataset B", "Dataset A", "Both", "The maximum is required"], "The smaller IQR belongs to Dataset A."),
    choice("y9-dec-iqr-i4", "Which measure is usually less affected by a single extreme maximum?", "C", ["Range", "Maximum", "IQR", "Total"], "IQR focuses on the middle half."),
    number("y9-dec-iqr-i5", "For the ordered data 2, 4, 6, 8, 10, 12, 14, find Q1.", "Q_1=4", "4", "Exclude 8, then use the median of 2, 4 and 6."),
  ],
  commonMistakes: [
    { mistake: "Using the unsorted order.", fix: "Order values from least to greatest first." },
    { mistake: "Including the median in both halves for an odd-sized dataset.", fix: "Use this course convention: exclude the median before finding Q1 and Q3." },
    { mistake: "Subtracting Q3 from Q1.", fix: "Calculate IQR as Q3 minus Q1." },
    { mistake: "Calling IQR the full spread.", fix: "IQR describes the spread of the middle 50%." },
  ],
  masteryQuiz: [
    number("y9-dec-iqr-m1", "A dataset has Q1 = 6 and Q3 = 15. Find its IQR.", "IQR=15-6", "9", "Subtract Q1 from Q3."),
    number("y9-dec-iqr-m2", "For the ordered data 1, 3, 5, 7, 9, 11, 13, find the IQR.", "Q_1=3,\\quad Q_3=11", "8", "Exclude 7 and subtract the quartiles."),
    choice("y9-dec-iqr-m3", "What proportion of ordered data lies in the box between Q1 and Q3?", "C", ["25%", "40%", "50%", "75%"], "The middle 50% lies between the quartiles."),
    choice("y9-dec-iqr-m4", "Which measure is most directly changed when a maximum rises from 20 to 80?", "A", ["Range", "Mode", "Number of values", "Median position"], "Range uses the maximum."),
    number("y9-dec-iqr-m5", "For the ordered data 2, 4, 6, 8, 10, find Q3.", "Q_3=9", "9", "Exclude 6, then average 8 and 10."),
    choice("y9-dec-iqr-m6", "Dataset A has IQR 5 and Dataset B has IQR 9. Which has less spread in its middle half?", "A", ["Dataset A", "Dataset B", "They are equal", "The means must be known"], "A smaller IQR means less middle spread."),
    number("y9-dec-iqr-m7", "A dataset has Q1 = 7.5 and Q3 = 18.5. Find its IQR.", "IQR=18.5-7.5", "11", "Subtract the quartiles."),
    number("y9-dec-iqr-m8", "For the ordered data 1, 2, 3, 4, 5, 6, 7, 8, 30, find the IQR.", "Q_1=2.5,\\quad Q_3=7.5", "5", "Exclude 5. The half medians are 2.5 and 7.5."),
    choice("y9-dec-iqr-m9", "Dataset A has Q1 = 8 and Q3 = 12. Dataset B has Q1 = 5 and Q3 = 18. Which middle half is more consistent?", "A", ["Dataset A", "Dataset B", "They are equal", "The medians alone decide"], "Dataset A has IQR 4 while Dataset B has IQR 13."),
    choice("y9-dec-iqr-m10", "In the ordered data 1, 2, 3, 4, 5, 6, 7, 8, 9, the maximum is replaced by 100. What happens to the IQR using this course convention?", "D", ["It becomes 100", "It doubles", "It decreases", "It stays 5"], "The quartiles remain 2.5 and 7.5."),
  ],
};

const boxPlots: LessonContent = {
  description: "Interpret box plots from five-number summaries and compare centre and spread.",
  learningIntention: "Use five-number summaries to interpret box plots without relying on a drawn graph.",
  successCriteria: ["Identify the five-number summary.", "Explain the box and whiskers.", "Calculate range and IQR from a summary.", "Compare box plots using median and IQR."],
  teaching: {
    paragraphs: ["A box plot summarises a dataset using five values: minimum, Q1, median, Q3 and maximum.", "The box runs from Q1 to Q3. The line inside the box marks the median.", "The whiskers extend from the box to the minimum and maximum.", "A higher median suggests a higher typical value. A narrower box means a smaller IQR and a more tightly grouped middle half."],
    latexBlocks: ["(\\text{minimum},\\ Q_1,\\ \\text{median},\\ Q_3,\\ \\text{maximum})", "IQR=Q_3-Q_1", "\\text{range}=\\text{maximum}-\\text{minimum}"],
  },
  workedExamples: [
    { title: "Read a five-number summary", questionLatex: "\\text{A box plot has summary }(3,7,10,15,20).\\text{ Find the median, IQR and range.}", steps: [{ explanation: "The third value is the median.", latex: "\\text{median}=10" }, { explanation: "Subtract quartiles and extremes.", latex: "IQR=15-7=8,\\quad\\text{range}=20-3=17" }], finalAnswerLatex: "\\text{median}=10,\\quad IQR=8,\\quad\\text{range}=17", boxPlotDiagram: { description: "A box plot with whiskers from 3 to 20, a box from 7 to 15 and a median line at 10. The box width shows the IQR and the full whisker width shows the range.", plots: [{ label: "Dataset", min: 3, q1: 7, median: 10, q3: 15, max: 20 }], showValueLabels: true } },
    { title: "Identify the box", questionLatex: "\\text{A box plot has summary }(2,6,9,14,18).\\text{ State the interval covered by the box.}", steps: [{ explanation: "The box extends from Q1 to Q3.", latex: "Q_1=6,\\quad Q_3=14" }], finalAnswerLatex: "6\\text{ to }14", boxPlotDiagram: { description: "A box plot with a highlighted box from Q1 equals 6 to Q3 equals 14, a median at 9 and whiskers extending to 2 and 18.", plots: [{ label: "Dataset", min: 2, q1: 6, median: 9, q3: 14, max: 18 }], showValueLabels: true } },
    { title: "Compare two summaries", questionLatex: "\\text{A has summary }(2,5,9,11,15).\\text{ B has summary }(1,4,12,16,20).", steps: [{ explanation: "Compare medians.", latex: "12>9" }, { explanation: "Compare IQRs.", latex: "IQR_A=6,\\quad IQR_B=12" }], finalAnswerLatex: "\\text{B has the higher median; A has the smaller IQR.}", boxPlotDiagram: { description: "Side-by-side box plots for datasets A and B. Dataset B has the higher median line, while dataset A has the narrower box and therefore the smaller IQR.", plots: [{ label: "A", min: 2, q1: 5, median: 9, q3: 11, max: 15 }, { label: "B", min: 1, q1: 4, median: 12, q3: 16, max: 20 }], showValueLabels: true } },
  ],
  guidedPractice: [
    number("y9-dec-box-g1", "A box plot has five-number summary (4, 8, 11, 16, 22). Find the median.", "\\text{median}=11", "11", "The third number is the median."),
    number("y9-dec-box-g2", "A box plot has five-number summary (4, 8, 11, 16, 22). Find the IQR.", "IQR=16-8", "8", "Subtract Q1 from Q3."),
    choice("y9-dec-box-g3", "Which part of a box plot represents the middle 50% of the data?", "B", ["The whiskers only", "The box", "The maximum only", "The title"], "The box runs from Q1 to Q3."),
    number("y9-dec-box-g4", "A box plot has five-number summary (3, 7, 9, 14, 19). Find the range.", "\\text{range}=19-3", "16", "Subtract the minimum from the maximum."),
  ],
  independentPractice: [
    number("y9-dec-box-i1", "A box plot has summary (5, 9, 13, 18, 25). Find the median.", "\\text{median}=13", "13", "Read the middle summary value."),
    number("y9-dec-box-i2", "A box plot has summary (5, 9, 13, 18, 25). Find the IQR.", "IQR=18-9", "9", "Subtract 9 from 18."),
    choice("y9-dec-box-i3", "A box plot has summary (2, 6, 10, 17, 21). Which interval is the box?", "C", ["2 to 21", "2 to 10", "6 to 17", "10 to 21"], "The box spans Q1 to Q3."),
    choice("y9-dec-box-i4", "Dataset A has IQR 4 and Dataset B has IQR 12. Which box is narrower?", "A", ["Dataset A", "Dataset B", "They are equal", "The medians decide"], "The smaller IQR gives the narrower box."),
    number("y9-dec-box-i5", "A box plot has summary (1, 5, 8, 12, 20). Find the range.", "\\text{range}=20-1", "19", "Subtract the extremes."),
  ],
  commonMistakes: [
    { mistake: "Reading the median as Q1.", fix: "The median is the third value in a five-number summary." },
    { mistake: "Calling the full whisker-to-whisker distance the IQR.", fix: "IQR is Q3 minus Q1, the width of the box." },
    { mistake: "Assuming a higher median means less spread.", fix: "Use median for centre and IQR for middle spread." },
    { mistake: "Trying to infer every raw value from a box plot.", fix: "A box plot summarises a dataset; it does not show every value." },
  ],
  masteryQuiz: [
    number("y9-dec-box-m1", "A box plot has summary (6, 10, 14, 19, 26). Find the median.", "\\text{median}=14", "14", "The third value is the median."),
    number("y9-dec-box-m2", "A box plot has summary (6, 10, 14, 19, 26). Find the range.", "\\text{range}=26-6", "20", "Subtract the extremes."),
    number("y9-dec-box-m3", "A box plot has summary (6, 10, 14, 19, 26). Find the IQR.", "IQR=19-10", "9", "Subtract Q1 from Q3."),
    choice("y9-dec-box-m4", "Which values mark the ends of a box?", "B", ["Minimum and maximum", "Q1 and Q3", "Mean and median", "Median and maximum"], "The box extends from Q1 to Q3."),
    choice("y9-dec-box-m5", "Which values mark the ends of the whiskers in this course?", "D", ["Q1 and Q3", "Mean and mode", "Median and IQR", "Minimum and maximum"], "The whiskers extend to the extremes."),
    number("y9-dec-box-m6", "A box plot has summary (4, 7, 12, 18, 23). Find the IQR.", "IQR=18-7", "11", "Subtract 7 from 18."),
    choice("y9-dec-box-m7", "Dataset A has median 15 and Dataset B has median 11. Which has the higher typical value?", "A", ["Dataset A", "Dataset B", "They must be equal", "IQR decides the median"], "The higher median belongs to Dataset A."),
    choice("y9-dec-box-m8", "A has summary (2, 6, 10, 14, 20). B has summary (4, 8, 13, 16, 18). Which statement is correct?", "C", ["A has the higher median", "B has the larger IQR", "B has the higher median and A has the larger range", "The summaries are identical"], "B has median 13 while A has median 10; A has range 18 while B has range 14."),
    choice("y9-dec-box-m9", "Two box plots have the same median. Plot A has IQR 5 and Plot B has IQR 14. Which statement is safest?", "B", ["A has the higher centre", "B has a more spread-out middle half", "B must have a larger mean", "A must have more values"], "The larger IQR means a wider middle half."),
    choice("y9-dec-box-m10", "A has summary (1, 5, 9, 13, 18). B has summary (3, 7, 11, 12, 16). Which statement is correct?", "D", ["A has the higher median and smaller IQR", "Both have median 9", "B has the larger range", "B has the higher median and smaller IQR"], "B has median 11 and IQR 5; A has median 9 and IQR 8."),
  ],
};

const comparingData: LessonContent = {
  description: "Compare datasets using centre, spread and the possible effect of outliers.",
  learningIntention: "Choose evidence that supports a careful comparison of datasets.",
  successCriteria: ["Compare centre using mean or median.", "Compare spread using range or IQR.", "Describe the effect of outliers.", "Justify a decision with suitable statistics."],
  teaching: {
    paragraphs: ["A comparison is stronger when it discusses both centre and spread.", "Median and IQR are often useful when an outlier may affect the mean and range.", "A smaller spread suggests greater consistency. A higher centre suggests a higher typical result.", "Choose evidence that matches the decision. Avoid claims that go beyond the available summary statistics."],
    latexBlocks: ["\\text{compare centre: mean or median}", "\\text{compare spread: range or IQR}"],
  },
  workedExamples: [
    { title: "Compare centre and consistency", questionLatex: "\\text{A has median }15\\text{ and IQR }4.\\text{ B has median }17\\text{ and IQR }10.", steps: [{ explanation: "Compare typical results.", latex: "17>15" }, { explanation: "Compare middle spread.", latex: "4<10" }], finalAnswerLatex: "\\text{B has the higher median; A is more consistent.}" },
    { title: "Recognise an outlier effect", questionLatex: "\\text{The data }4,5,5,6,40\\text{ includes an extreme value. Which centre is safer for a typical value?}", steps: [{ explanation: "The value 40 pulls the mean upward.", latex: "\\text{median}=5" }], finalAnswerLatex: "\\text{Use the median.}" },
    { title: "Make a practical decision", questionLatex: "\\text{Machine A has median error }2\\text{ mm and IQR }1\\text{ mm. Machine B has median error }3\\text{ mm and IQR }4\\text{ mm.}", steps: [{ explanation: "Lower errors are desirable.", latex: "2<3" }, { explanation: "A is also more consistent.", latex: "1<4" }], finalAnswerLatex: "\\text{Choose Machine A based on its lower median error and smaller IQR.}" },
  ],
  guidedPractice: [
    choice("y9-dec-compare-g1", "Class A has median 68 and Class B has median 74. Which has the higher typical score?", "B", ["Class A", "Class B", "They are equal", "The IQR is the median"], "Class B has the higher median."),
    choice("y9-dec-compare-g2", "Team A has IQR 3 and Team B has IQR 9. Which is more consistent?", "A", ["Team A", "Team B", "They are equal", "The medians are required"], "The smaller IQR indicates less middle spread."),
    choice("y9-dec-compare-g3", "Which pair of statistics is useful when an outlier is present?", "D", ["Maximum and total", "Mean and maximum only", "Mode and total", "Median and IQR"], "Median and IQR are less sensitive to one extreme value."),
    number("y9-dec-compare-g4", "Dataset A has Q1 = 12 and Q3 = 20. Find its IQR.", "IQR=20-12", "8", "Subtract the quartiles."),
  ],
  independentPractice: [
    choice("y9-dec-compare-i1", "Store A has median wait 5 minutes and IQR 2 minutes. Store B has median wait 5 minutes and IQR 7 minutes. Which is more consistent?", "A", ["Store A", "Store B", "They are equally consistent", "The maximum decides"], "Store A has the smaller IQR."),
    choice("y9-dec-compare-i2", "Dataset A has mean 12 and Dataset B has mean 18. Which has the higher mean?", "B", ["Dataset A", "Dataset B", "They are equal", "The range decides"], "Eighteen is larger than twelve."),
    choice("y9-dec-compare-i3", "A single unusually high value is added. Which statistic is most likely to rise sharply?", "C", ["Number of values only", "Median always", "Range", "Q1 always"], "A new high maximum can increase the range sharply."),
    number("y9-dec-compare-i4", "Group A has range 18 and Group B has range 11. Find the difference in ranges.", "18-11", "7", "Subtract the smaller range from the larger."),
    choice("y9-dec-compare-i5", "Two groups have the same median. Group A has smaller IQR. Which statement is safest?", "D", ["A has more values", "A has the larger mean", "B has the higher centre", "A has a more tightly grouped middle half"], "A smaller IQR indicates less middle spread."),
  ],
  commonMistakes: [
    { mistake: "Comparing centre but ignoring spread.", fix: "Use a measure of centre and a measure of spread when possible." },
    { mistake: "Claiming that a smaller IQR proves every value is closer.", fix: "IQR describes the middle half, not every observation." },
    { mistake: "Using the mean without noticing an outlier.", fix: "Consider median and IQR when extreme values are present." },
    { mistake: "Making a decision without stating evidence.", fix: "Name the relevant statistics and explain how they support the decision." },
  ],
  masteryQuiz: [
    choice("y9-dec-compare-m1", "A has median 20 and B has median 24. Which has the higher median?", "B", ["A", "B", "They are equal", "The ranges decide"], "B has the higher median."),
    choice("y9-dec-compare-m2", "A has IQR 6 and B has IQR 15. Which has the smaller middle spread?", "A", ["A", "B", "They are equal", "The means decide"], "A has the smaller IQR."),
    number("y9-dec-compare-m3", "A dataset has Q1 = 9 and Q3 = 21. Find its IQR.", "IQR=21-9", "12", "Subtract the quartiles."),
    choice("y9-dec-compare-m4", "Which measure is most affected by a new extreme maximum?", "C", ["Mode", "Median position only", "Range", "Number of quartiles"], "Range uses the extremes."),
    choice("y9-dec-compare-m5", "Which statement is justified if two groups have the same median but different IQRs?", "D", ["Their means must differ", "Their sample sizes match", "Every value differs", "Their typical values match but their middle spreads differ"], "Median compares centre and IQR compares middle spread."),
    choice("y9-dec-compare-m6", "A has median 9 and IQR 2. B has median 12 and IQR 8. Which statement is correct?", "A", ["B has the higher median; A is more consistent", "A has the higher median; B is more consistent", "They have equal centres", "They have equal spreads"], "B has the higher centre while A has the smaller IQR."),
    choice("y9-dec-compare-m7", "A dataset contains one very high outlier. Which summaries are usually sensible for a robust comparison?", "B", ["Mean and range only", "Median and IQR", "Maximum and minimum only", "Total and mode only"], "Median and IQR are less affected by one extreme value."),
    choice("y9-dec-compare-m8", "Provider A has median delivery time 3 days and IQR 1 day. Provider B has median 4 days and IQR 5 days. If fast, consistent delivery matters, which is better supported?", "A", ["Provider A", "Provider B", "Both are identical", "No statistic is relevant"], "A has the lower median time and smaller IQR."),
    choice("y9-dec-compare-m9", "A has mean 10 and median 10. B has mean 18 and median 10 after one extreme value. Which statement is safest?", "C", ["B has the higher typical value for every purpose", "A must contain an outlier", "The shared median suggests similar typical values, while B's mean may be affected by an outlier", "The medians prove the datasets are identical"], "The mean can be pulled by an extreme value."),
    choice("y9-dec-compare-m10", "Class A has median 72, IQR 6 and range 45. Class B has median 70, IQR 14 and range 18. Which is safest?", "D", ["A is less consistent in every possible sense", "B has the higher typical score", "The ranges alone prove B is better", "A has the higher median and tighter middle half, but its large range suggests an extreme value should be checked"], "Use both centre and spread and investigate the large range."),
  ],
};

const standardDeviation: LessonContent = {
  description: "Introduce population standard deviation as a measure of spread around the mean.",
  learningIntention: "Calculate simple population standard deviations and interpret their size.",
  successCriteria: ["Explain what standard deviation measures.", "Interpret smaller and larger standard deviations.", "Calculate simple population standard deviations.", "Explain a standard deviation of zero."],
  teaching: {
    paragraphs: ["Standard deviation measures how spread out numerical values are around their mean.", "A smaller standard deviation means values are generally closer to the mean. A larger standard deviation means more spread.", "A standard deviation of zero means every value equals the mean.", "For this lesson, use population standard deviation: square each deviation from the mean, average those squared deviations by dividing by n, then take the square root."],
    latexBlocks: ["\\sigma=\\sqrt{\\frac{\\sum (x-\\bar{x})^2}{n}}"],
  },
  workedExamples: [
    { title: "Calculate a friendly population standard deviation", questionLatex: "\\text{Find the population standard deviation of }2,2,4,4.", steps: [{ explanation: "Find the mean.", latex: "\\bar{x}=3" }, { explanation: "Square the deviations and average them.", latex: "\\frac{(-1)^2+(-1)^2+1^2+1^2}{4}=1" }, { explanation: "Take the square root.", latex: "\\sigma=\\sqrt1=1" }], finalAnswerLatex: "1" },
    { title: "Interpret zero spread", questionLatex: "\\text{Find the population standard deviation of }5,5,5,5.", steps: [{ explanation: "Every value equals the mean.", latex: "\\bar{x}=5" }, { explanation: "Every deviation is zero.", latex: "\\sigma=0" }], finalAnswerLatex: "0" },
    { title: "Compare given standard deviations", questionLatex: "\\text{A has SD }2.1.\\text{ B has SD }6.4.\\text{ Which is more spread out?}", steps: [{ explanation: "Compare the standard deviations.", latex: "6.4>2.1" }], finalAnswerLatex: "\\text{Dataset B}" },
  ],
  guidedPractice: [
    choice("y9-dec-sd-g1", "Which standard deviation represents the smaller spread?", "A", ["1.8", "5.2", "They are equal", "The mean decides"], "A smaller standard deviation means less spread."),
    number("y9-dec-sd-g2", "Find the population standard deviation of 1, 1, 5 and 5.", "\\bar{x}=3,\\quad\\sigma=2", "2", "Each value is 2 units from the mean."),
    choice("y9-dec-sd-g3", "What does a population standard deviation of zero mean?", "D", ["The mean is zero", "The maximum is zero", "There is one outlier", "All values are equal"], "There is no spread when all values are equal."),
    choice("y9-dec-sd-g4", "A has SD 3 and B has SD 9. Which is more consistent?", "A", ["A", "B", "They are equal", "The medians decide"], "The smaller SD indicates greater consistency."),
  ],
  independentPractice: [
    number("y9-dec-sd-i1", "Find the population standard deviation of 3, 3, 7 and 7.", "\\bar{x}=5,\\quad\\sigma=2", "2", "Each value is 2 units from the mean."),
    choice("y9-dec-sd-i2", "Dataset A has SD 3.2 and Dataset B has SD 7.5. Which is more spread out?", "B", ["A", "B", "They are equal", "The means decide"], "Dataset B has the larger SD."),
    number("y9-dec-sd-i3", "Find the population standard deviation of 9, 9, 9 and 9.", "\\sigma=0", "0", "All values equal their mean."),
    choice("y9-dec-sd-i4", "Which statement best describes standard deviation?", "C", ["It is the maximum", "It counts values", "It measures spread around the mean", "It always equals the range"], "Standard deviation measures spread around the mean."),
    number("y9-dec-sd-i5", "Find the population standard deviation of 0, 0, 6 and 6.", "\\bar{x}=3,\\quad\\sigma=3", "3", "Each value is 3 units from the mean."),
  ],
  commonMistakes: [
    { mistake: "Using a larger SD to claim a larger mean.", fix: "Standard deviation measures spread, not centre." },
    { mistake: "Forgetting to square deviations.", fix: "Square each difference from the mean before averaging." },
    { mistake: "Dividing by the wrong value.", fix: "This lesson uses population SD, so divide by n." },
    { mistake: "Calling SD zero when values balance around the mean.", fix: "SD is zero only when every value equals the mean." },
  ],
  masteryQuiz: [
    choice("y9-dec-sd-m1", "Which standard deviation represents the least spread?", "B", ["4.6", "0.8", "3.1", "7.2"], "Choose the smallest SD."),
    number("y9-dec-sd-m2", "Find the population standard deviation of 6, 6, 6 and 6.", "\\sigma=0", "0", "All values are equal."),
    number("y9-dec-sd-m3", "Find the population standard deviation of 4, 4, 8 and 8.", "\\bar{x}=6,\\quad\\sigma=2", "2", "Each value is 2 units from the mean."),
    choice("y9-dec-sd-m4", "A has SD 2.4 and B has SD 6.1. Which is more consistent?", "A", ["A", "B", "They are equal", "The means must differ"], "A has the smaller SD."),
    choice("y9-dec-sd-m5", "Which statement is correct?", "C", ["SD is always the maximum", "SD is a count", "SD measures spread around the mean", "SD must equal the range"], "Standard deviation describes spread."),
    number("y9-dec-sd-m6", "Find the population standard deviation of 10, 10, 14 and 14.", "\\bar{x}=12,\\quad\\sigma=2", "2", "Each value is 2 units from the mean."),
    choice("y9-dec-sd-m7", "Which dataset is likely to have the larger SD?", "D", ["5, 5, 5, 5", "4, 5, 5, 6", "3, 4, 6, 7", "0, 2, 8, 10"], "The last dataset is the most spread out."),
    choice("y9-dec-sd-m8", "Two classes have the same mean. A has SD 4 and B has SD 11. Which statement is safest?", "B", ["A has more varied results", "B has more varied results", "B has the higher mean", "Both classes have identical scores"], "B has the larger spread."),
    choice("y9-dec-sd-m9", "A single extreme value is added to an otherwise tightly grouped dataset. What is the likely effect on SD?", "A", ["It increases", "It must become zero", "It always decreases", "It becomes the median"], "An extreme value usually increases spread."),
    number("y9-dec-sd-m10", "Find the population standard deviation of 1, 1, 7 and 7.", "\\bar{x}=4,\\quad\\sigma=3", "3", "Each value is 3 units from the mean."),
  ],
};

const dataDecisions: LessonContent = {
  description: "Use summary statistics, sample size and context to make cautious data-based decisions.",
  learningIntention: "Support a decision with relevant evidence while avoiding overclaiming.",
  successCriteria: ["Use centre and spread together.", "Choose relevant statistics for a decision.", "Consider sample size and context.", "State cautious conclusions supported by data."],
  teaching: {
    paragraphs: ["A data-based decision should name the evidence that matters for the context.", "Centre describes a typical result. Spread describes consistency. Both can matter at the same time.", "A larger sample often supports a more reliable conclusion than a very small sample.", "Statistics support a conclusion, but they do not prove claims beyond the data. Use careful language such as suggests or is supported by this sample."],
    latexBlocks: ["\\text{decision}=\\text{relevant centre}+\\text{relevant spread}+\\text{context}"],
  },
  workedExamples: [
    { title: "Choose a consistent service", questionLatex: "\\text{A has median wait }4\\text{ min and IQR }2\\text{ min. B has median wait }5\\text{ min and IQR }7\\text{ min.}", steps: [{ explanation: "Shorter and more consistent waits are desirable.", latex: "4<5,\\quad2<7" }], finalAnswerLatex: "\\text{Choose A based on its lower median wait and smaller IQR.}" },
    { title: "Compare sample sizes", questionLatex: "\\text{Survey A uses 12 responses. Survey B uses 450 responses from the same target group. Which is generally more reliable?}", steps: [{ explanation: "The larger relevant sample is generally more reliable.", latex: "450>12" }], finalAnswerLatex: "\\text{Survey B}" },
    { title: "Avoid overclaiming", questionLatex: "\\text{A sample has higher median scores after a new study routine. Can this alone prove the routine caused the improvement?}", steps: [{ explanation: "The summary supports a cautious comparison but does not prove causation.", latex: "\\text{association does not prove cause}" }], finalAnswerLatex: "\\text{No. The sample suggests improvement but does not prove causation.}" },
  ],
  guidedPractice: [
    choice("y9-dec-decision-g1", "Supplier A has median defect count 2 and IQR 1. Supplier B has median defect count 4 and IQR 5. Which is better supported if low, consistent defects matter?", "A", ["Supplier A", "Supplier B", "They are identical", "No statistics are relevant"], "A has the lower median and smaller IQR."),
    choice("y9-dec-decision-g2", "Which survey result is generally more reliable for the same population and method?", "C", ["A sample of 8", "A sample of 20", "A sample of 500", "Sample size never matters"], "The larger sample is generally more reliable."),
    choice("y9-dec-decision-g3", "Which wording is most careful?", "B", ["The data proves every student will improve", "The sample suggests the program may help", "The median causes improvement", "The IQR proves causation"], "A sample supports a cautious claim."),
    number("y9-dec-decision-g4", "Option A has median time 12 minutes and Option B has median time 17 minutes. Find the difference in medians.", "17-12", "5", "Subtract the smaller median from the larger."),
  ],
  independentPractice: [
    choice("y9-dec-decision-i1", "Machine A has median error 1 mm and IQR 2 mm. Machine B has median error 1 mm and IQR 6 mm. Which is more consistent?", "A", ["A", "B", "They have identical spreads", "The means decide"], "A has the smaller IQR."),
    choice("y9-dec-decision-i2", "A conclusion is based on 6 volunteers from one class. What is the main limitation?", "D", ["The median cannot be used", "IQR is impossible", "The data proves causation", "The small narrow sample may not represent a wider group"], "Sample size and selection limit the conclusion."),
    choice("y9-dec-decision-i3", "Which evidence best supports a claim about typical waiting time when there is an outlier?", "C", ["Maximum only", "Total only", "Median", "Number of categories"], "Median is resistant to an extreme wait."),
    choice("y9-dec-decision-i4", "Option A has higher median output but also much larger IQR than Option B. Which statement is safest?", "B", ["A is automatically best", "A has higher typical output but is less consistent", "B must have a larger mean", "The IQR is irrelevant"], "Use both centre and spread."),
    number("y9-dec-decision-i5", "Plan A has IQR 4 and Plan B has IQR 11. Find the difference in IQRs.", "11-4", "7", "Subtract the spreads."),
  ],
  commonMistakes: [
    { mistake: "Using only the highest value to choose an option.", fix: "Consider a suitable centre and spread." },
    { mistake: "Ignoring sample size.", fix: "A small or narrow sample can limit a conclusion." },
    { mistake: "Claiming that a comparison proves cause.", fix: "Use cautious language unless the study design supports a causal claim." },
    { mistake: "Assuming lower spread is always the only goal.", fix: "Use context: centre and spread may both matter." },
  ],
  masteryQuiz: [
    choice("y9-dec-decision-m1", "Which statistic describes a typical value?", "A", ["Median", "IQR only", "Range only", "Sample size only"], "Median is a measure of centre."),
    choice("y9-dec-decision-m2", "Which statistic describes the middle spread?", "C", ["Mean", "Maximum", "IQR", "Mode"], "IQR measures the spread of the middle half."),
    choice("y9-dec-decision-m3", "Which sample is generally stronger for the same target group and method?", "D", ["5 responses", "12 responses", "30 responses", "600 responses"], "The largest sample is generally more reliable."),
    choice("y9-dec-decision-m4", "Which phrase avoids overclaiming?", "B", ["This proves the result for everyone", "The sample suggests a difference", "The median caused the change", "One value settles the question"], "A cautious statement matches the evidence."),
    number("y9-dec-decision-m5", "A has median 14 and B has median 19. Find the difference.", "19-14", "5", "Subtract the medians."),
    choice("y9-dec-decision-m6", "A has median 8 and IQR 2. B has median 11 and IQR 9. Which statement is supported?", "A", ["B has a higher typical value, while A is more consistent", "A has a higher typical value", "B is more consistent", "They are identical"], "Compare both centre and spread."),
    choice("y9-dec-decision-m7", "A very small sample gives an exciting result. What is the best next step?", "C", ["Claim the result is universal", "Ignore sample size", "Collect a larger relevant sample", "Remove all variation"], "A larger relevant sample can strengthen the conclusion."),
    choice("y9-dec-decision-m8", "Delivery A has median 2 days, IQR 1 day and range 12 days. Delivery B has median 3 days, IQR 5 days and range 7 days. Which is safest?", "D", ["B is faster", "A has no unusual values", "Range alone makes B best", "A is typically faster and more consistent in its middle half, but its large range should be investigated"], "Use all available evidence cautiously."),
    choice("y9-dec-decision-m9", "Program A improved median scores in a sample of 18 volunteers. Which conclusion is most defensible?", "B", ["A caused improvement for every student", "The sample suggests improvement, but a broader study is needed", "The IQR proves cause", "The result applies to every school"], "The small volunteer sample limits the claim."),
    choice("y9-dec-decision-m10", "Machine A has median error 1.5 mm and SD 0.4 mm. Machine B has median error 1.1 mm and SD 2.8 mm. Which statement is safest?", "C", ["B is always best", "A has the lower median error", "B has the lower typical error, while A is more consistent", "The SD values compare centre"], "B has lower median error, while A has smaller spread."),
  ],
};

const lessons: Record<string, LessonContent> = {
  "mean-median-mode-range-review": summaryReview,
  "quartiles-iqr": quartilesIqr,
  "box-plots": boxPlots,
  "comparing-data-sets": comparingData,
  "standard-deviation-introduction": standardDeviation,
  "data-based-decisions": dataDecisions,
};

export function year9MakingDecisionsLessonOverride(course: CoursePathwaySeed, unit: CourseUnitSeed, lesson: CourseLessonSeed): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) || unit.slug !== "making-decisions") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return { syllabusArea: "Statistics and Probability", masteryPassMark: 0.8, ...content };
}
