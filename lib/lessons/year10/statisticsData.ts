import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function safeStatAnswerVariants(prompt: string, answer: string): string[] {
  const variants: string[] = [];
  const normalisedPrompt = prompt.toLowerCase();
  const numericAnswer = Number(answer.replace(/,/g, ""));

  if (Number.isFinite(numericAnswer)) {
    if (Number.isInteger(numericAnswer)) variants.push(numericAnswer.toFixed(1));
    if (Math.abs(numericAnswer) >= 1000) variants.push(numericAnswer.toLocaleString("en-AU"));
  }

  const labels: string[] = [];
  if (normalisedPrompt.includes("find the median")) labels.push("median");
  if (normalisedPrompt.includes("find the lower quartile")) labels.push("Q1", "q1");
  if (normalisedPrompt.includes("find the upper quartile")) labels.push("Q3", "q3");
  if (normalisedPrompt.includes("find the interquartile range") || normalisedPrompt.includes("find its interquartile range")) {
    labels.push("IQR", "iqr");
  }
  if (normalisedPrompt.includes("find the range")) labels.push("range");
  if (normalisedPrompt.includes("find the mean")) labels.push("mean");
  if (normalisedPrompt.includes("find the population standard deviation")) labels.push("SD", "sd", "standard deviation");
  if (normalisedPrompt.includes("actual minus predicted")) labels.push("residual");
  if (normalisedPrompt.includes("predict the output")) labels.push("y");

  for (const label of labels) {
    variants.push(`${label}=${answer}`, `${label} = ${answer}`);
  }

  return variants;
}

function statAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...safeStatAnswerVariants(prompt, answer)])),
    hint: "Use the displayed data and identify the statistic being requested.",
    explanation,
  };
}

function statChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer,
    hint: "Match the data description to the statistical idea being tested.",
    explanation,
  };
}

const dataA = "2,\\ 4,\\ 6,\\ 8,\\ 10,\\ 12,\\ 14";
const dataB = "3,\\ 5,\\ 7,\\ 9,\\ 11,\\ 13,\\ 15";
const dataC = "1,\\ 3,\\ 5,\\ 7,\\ 9,\\ 11,\\ 13";

const quartilesWorked: WorkedExample[] = [
  {
    title: "Find the median and quartiles",
    questionLatex: `\\text{Find the median, }Q_1\\text{ and }Q_3\\text{ for }${dataA}.`,
    steps: [
      { explanation: "The data is already ordered. The middle value is the median.", latex: "\\text{median}=8" },
      { explanation: "Find the median of the lower half.", latex: "Q_1=4" },
      { explanation: "Find the median of the upper half.", latex: "Q_3=12" },
    ],
    finalAnswerLatex: "Q_1=4,\\quad \\text{median}=8,\\quad Q_3=12",
    boxPlotDiagram: {
      description: "A box plot for the ordered data with whiskers from 2 to 14, a box from 4 to 12 and a median line at 8.",
      plots: [{ label: "Dataset", min: 2, q1: 4, median: 8, q3: 12, max: 14 }],
      showValueLabels: true,
    },
  },
  {
    title: "Find the interquartile range",
    questionLatex: "\\text{A dataset has }Q_1=18\\text{ and }Q_3=31.\\text{ Find the IQR.}",
    steps: [{ explanation: "Subtract the lower quartile from the upper quartile.", latex: "IQR=Q_3-Q_1=31-18=13" }],
    finalAnswerLatex: "13",
  },
  {
    title: "Compare middle spreads",
    questionLatex: "\\text{Dataset A has IQR }6.\\text{ Dataset B has IQR }11.\\text{ Which has the greater middle spread?}",
    steps: [{ explanation: "A larger IQR means the middle half of the data is more spread out.", latex: "11>6" }],
    finalAnswerLatex: "\\text{Dataset B}",
  },
];

const quartilesGuided: PracticeQuestion[] = [
  statAnswer("y10-stat-iqr-g1", "Find the median of the ordered dataset.", dataA, "8", "The middle value is 8."),
  statAnswer("y10-stat-iqr-g2", "Find the lower quartile of the ordered dataset.", dataA, "4", "The median of the lower half is 4."),
  statAnswer("y10-stat-iqr-g3", "Find the upper quartile of the ordered dataset.", dataA, "12", "The median of the upper half is 12."),
  statAnswer("y10-stat-iqr-g4", "A dataset has lower quartile 9 and upper quartile 21. Find its interquartile range.", "Q_1=9,\\quad Q_3=21", "12", "Subtract 9 from 21."),
];

const quartilesIndependent: PracticeQuestion[] = [
  statAnswer("y10-stat-iqr-i1", "Find the median of the ordered dataset.", dataB, "9", "The middle value is 9."),
  statAnswer("y10-stat-iqr-i2", "Find the lower quartile of the ordered dataset.", dataB, "5", "The median of the lower half is 5."),
  statAnswer("y10-stat-iqr-i3", "Find the upper quartile of the ordered dataset.", dataB, "13", "The median of the upper half is 13."),
  statAnswer("y10-stat-iqr-i4", "A dataset has lower quartile 14 and upper quartile 29. Find its interquartile range.", "Q_1=14,\\quad Q_3=29", "15", "Subtract 14 from 29."),
  statChoice("y10-stat-iqr-i5", "Dataset A has IQR 7 and Dataset B has IQR 12. Which statement is correct?", "C", ["Dataset A has the larger middle spread", "The datasets have the same middle spread", "Dataset B has the larger middle spread", "The medians must be equal"], "Dataset B has the larger IQR, so its middle half is more spread out."),
];

const quartilesMastery: PracticeQuestion[] = [
  statAnswer("y10-stat-iqr-m1", "Find the median of the ordered dataset.", dataC, "7", "The middle value is 7."),
  statAnswer("y10-stat-iqr-m2", "Find the lower quartile of the ordered dataset.", dataC, "3", "The median of the lower half is 3."),
  statAnswer("y10-stat-iqr-m3", "Find the upper quartile of the ordered dataset.", dataC, "11", "The median of the upper half is 11."),
  statAnswer("y10-stat-iqr-m4", "A dataset has lower quartile 16 and upper quartile 38. Find its interquartile range.", "Q_1=16,\\quad Q_3=38", "22", "Subtract 16 from 38."),
  statChoice("y10-stat-iqr-m5", "Which statistic measures the spread of the middle half of a dataset?", "B", ["Median", "Interquartile range", "Maximum", "Mean"], "The IQR measures the spread from the lower quartile to the upper quartile."),
  statAnswer("y10-stat-iqr-m6", "Find the interquartile range of the ordered dataset.", dataA, "8", "The quartiles are 4 and 12, so the IQR is 8."),
  statChoice("y10-stat-iqr-m7", "Dataset A has IQR 5 and Dataset B has IQR 17. Which dataset has a more consistent middle half?", "A", ["Dataset A", "Dataset B", "Both are equally consistent", "The median is required before comparing"], "A smaller IQR indicates less spread in the middle half."),
  statAnswer("y10-stat-iqr-m8", "A dataset has lower quartile 24 and an interquartile range of 19. Find the upper quartile.", "Q_1=24,\\quad IQR=19", "43", "Add the IQR to the lower quartile."),
  statChoice("y10-stat-iqr-m9", "A value lies far above the upper quartile compared with the rest of the dataset. Which description is most appropriate?", "D", ["It must equal the median", "It lowers the maximum", "It proves the data is symmetrical", "It may be an outlier"], "A value far from the rest of the data may be an outlier."),
  statAnswer("y10-stat-iqr-m10", "Dataset A has lower quartile 12 and upper quartile 28. Dataset B has lower quartile 18 and upper quartile 41. How much larger is Dataset B's IQR?", "\\text{Dataset A: }Q_1=12,\\ Q_3=28;\\quad \\text{Dataset B: }Q_1=18,\\ Q_3=41", "7", "Dataset A has IQR 16 and Dataset B has IQR 23, a difference of 7."),
];

const boxWorked: WorkedExample[] = [
  {
    title: "Interpret a five-number summary",
    questionLatex: "\\text{A box plot has five-number summary }(4,\\ 9,\\ 13,\\ 18,\\ 25).\\text{ State the median and IQR.}",
    steps: [
      { explanation: "The third number is the median.", latex: "\\text{median}=13" },
      { explanation: "Subtract the lower quartile from the upper quartile.", latex: "IQR=18-9=9" },
    ],
    finalAnswerLatex: "\\text{median}=13,\\quad IQR=9",
    boxPlotDiagram: {
      description: "A box plot with whiskers from 4 to 25, a box from 9 to 18 and a median line at 13. The width of the box is the IQR.",
      plots: [{ label: "Dataset", min: 4, q1: 9, median: 13, q3: 18, max: 25 }],
      showValueLabels: true,
    },
  },
  {
    title: "Describe the box and whiskers",
    questionLatex: "\\text{A box plot has five-number summary }(2,\\ 6,\\ 10,\\ 17,\\ 21).\\text{ Describe the box and whiskers.}",
    steps: [
      { explanation: "The box extends from the lower quartile to the upper quartile.", latex: "\\text{box: }6\\text{ to }17" },
      { explanation: "The whiskers extend to the minimum and maximum.", latex: "\\text{whiskers: }2\\text{ and }21" },
    ],
    finalAnswerLatex: "\\text{box from }6\\text{ to }17,\\quad \\text{whiskers to }2\\text{ and }21",
    boxPlotDiagram: {
      description: "A box plot with its box from 6 to 17, median line at 10 and whiskers extending to the minimum 2 and maximum 21.",
      plots: [{ label: "Dataset", min: 2, q1: 6, median: 10, q3: 17, max: 21 }],
      showValueLabels: true,
    },
  },
  {
    title: "Compare two box plots using summaries",
    questionLatex: "\\text{Dataset A: }(3,\\ 8,\\ 12,\\ 16,\\ 22).\\quad \\text{Dataset B: }(4,\\ 7,\\ 14,\\ 19,\\ 24).",
    steps: [
      { explanation: "Compare medians.", latex: "14>12" },
      { explanation: "Compare interquartile ranges.", latex: "IQR_A=16-8=8,\\quad IQR_B=19-7=12" },
    ],
    finalAnswerLatex: "\\text{Dataset B has the higher median and larger IQR.}",
    boxPlotDiagram: {
      description: "Side-by-side box plots for datasets A and B. Dataset B has the higher median and its wider box shows the larger IQR.",
      plots: [
        { label: "A", min: 3, q1: 8, median: 12, q3: 16, max: 22 },
        { label: "B", min: 4, q1: 7, median: 14, q3: 19, max: 24 },
      ],
      showValueLabels: true,
    },
  },
];

const boxGuided: PracticeQuestion[] = [
  statAnswer("y10-stat-box-g1", "A box plot has the displayed five-number summary. Find the median.", "(5,\\ 8,\\ 12,\\ 17,\\ 23)", "12", "The third number is the median."),
  statAnswer("y10-stat-box-g2", "A box plot has the displayed five-number summary. Find the interquartile range.", "(5,\\ 8,\\ 12,\\ 17,\\ 23)", "9", "Subtract 8 from 17."),
  statChoice("y10-stat-box-g3", "Which part of a box plot runs from the lower quartile to the upper quartile?", "B", ["The left whisker only", "The box", "The median line only", "The maximum only"], "The box spans the middle half of the data."),
  statChoice("y10-stat-box-g4", "Dataset A has summary (2, 6, 10, 15, 19). Dataset B has summary (1, 4, 12, 18, 24). Which dataset has the higher median?", "B", ["Dataset A", "Dataset B", "They have the same median", "The medians cannot be compared"], "Dataset B has median 12, compared with 10 for Dataset A."),
];

const boxIndependent: PracticeQuestion[] = [
  statAnswer("y10-stat-box-i1", "A box plot has the displayed five-number summary. Find the range.", "(3,\\ 7,\\ 11,\\ 15,\\ 20)", "17", "Subtract the minimum from the maximum."),
  statAnswer("y10-stat-box-i2", "A box plot has the displayed five-number summary. Find the interquartile range.", "(3,\\ 7,\\ 11,\\ 15,\\ 20)", "8", "Subtract 7 from 15."),
  statChoice("y10-stat-box-i3", "A box plot has summary (4, 9, 13, 18, 27). Which interval contains the middle 50% of the data?", "C", ["4 to 27", "4 to 13", "9 to 18", "13 to 27"], "The middle 50% lies between the quartiles."),
  statChoice("y10-stat-box-i4", "Dataset A has IQR 6 and Dataset B has IQR 15. Which box plot would have the wider box?", "D", ["Dataset A", "Both boxes must have width 21", "The medians decide the width", "Dataset B"], "A wider IQR produces a wider box."),
  statChoice("y10-stat-box-i5", "Which five-number summary is written in the correct order?", "A", ["Minimum, lower quartile, median, upper quartile, maximum", "Minimum, median, lower quartile, maximum, upper quartile", "Median, minimum, maximum, lower quartile, upper quartile", "Lower quartile, minimum, median, maximum, upper quartile"], "The five-number summary is ordered from minimum to maximum."),
];

const boxMastery: PracticeQuestion[] = [
  statAnswer("y10-stat-box-m1", "A box plot has the displayed five-number summary. Find the median.", "(6,\\ 10,\\ 14,\\ 19,\\ 26)", "14", "The third number is the median."),
  statAnswer("y10-stat-box-m2", "A box plot has the displayed five-number summary. Find the range.", "(6,\\ 10,\\ 14,\\ 19,\\ 26)", "20", "Subtract the minimum from the maximum."),
  statAnswer("y10-stat-box-m3", "A box plot has the displayed five-number summary. Find the interquartile range.", "(6,\\ 10,\\ 14,\\ 19,\\ 26)", "9", "Subtract the lower quartile from the upper quartile."),
  statChoice("y10-stat-box-m4", "What does the line inside the box represent?", "C", ["The maximum", "The range", "The median", "The minimum"], "The line inside the box marks the median."),
  statChoice("y10-stat-box-m5", "Dataset A has summary (2, 7, 11, 16, 20). Dataset B has summary (3, 8, 13, 15, 23). Which has the higher median?", "B", ["Dataset A", "Dataset B", "They are equal", "The IQR is needed first"], "Dataset B has median 13 compared with 11."),
  statChoice("y10-stat-box-m6", "Which dataset has the larger IQR?", "A", ["Summary (1, 4, 9, 17, 22)", "Summary (2, 7, 10, 15, 24)", "They have the same IQR", "Only the ranges can be compared"], "The first summary has IQR 13; the second has IQR 8."),
  statAnswer("y10-stat-box-m7", "A box plot has lower quartile 9 and upper quartile 24. Find the width of its box.", "Q_1=9,\\quad Q_3=24", "15", "The box width represents the IQR."),
  statChoice("y10-stat-box-m8", "Dataset A has summary (4, 8, 12, 16, 20). Dataset B has summary (4, 6, 12, 18, 20). Which statement is correct?", "D", ["Dataset A has the higher median", "Dataset B has the larger range", "Dataset A has the larger IQR", "The medians and ranges match, but Dataset B has the larger IQR"], "Both medians are 12 and both ranges are 16. Dataset B has IQR 12 compared with 8."),
  statAnswer("y10-stat-box-m9", "Dataset A has five-number summary (3, 8, 14, 20, 29). Dataset B has five-number summary (5, 11, 15, 18, 25). How much larger is Dataset A's IQR?", "\\text{Dataset A: }(3,\\ 8,\\ 14,\\ 20,\\ 29);\\quad \\text{Dataset B: }(5,\\ 11,\\ 15,\\ 18,\\ 25)", "5", "Dataset A has IQR 12 and Dataset B has IQR 7."),
  statChoice("y10-stat-box-m10", "Two box plots have the same median. One has a much wider box. What is the safest conclusion?", "A", ["Its middle half is more spread out", "Its mean must be larger", "Its maximum must be smaller", "Every value is an outlier"], "A wider box means a larger IQR and more spread in the middle half."),
];

const sdWorked: WorkedExample[] = [
  {
    title: "Calculate a simple population standard deviation",
    questionLatex: "\\text{Find the population standard deviation of }2,\\ 2,\\ 4,\\ 4.",
    steps: [
      { explanation: "Find the mean.", latex: "\\bar{x}=\\frac{2+2+4+4}{4}=3" },
      { explanation: "Find the squared deviations.", latex: "(2-3)^2,(2-3)^2,(4-3)^2,(4-3)^2=1,1,1,1" },
      { explanation: "Average the squared deviations and take the square root.", latex: "\\sigma=\\sqrt{\\frac{1+1+1+1}{4}}=1" },
    ],
    finalAnswerLatex: "1",
  },
  {
    title: "Interpret a standard deviation of zero",
    questionLatex: "\\text{Find the population standard deviation of }5,\\ 5,\\ 5,\\ 5.",
    steps: [{ explanation: "Every value equals the mean, so every deviation is zero.", latex: "\\sigma=0" }],
    finalAnswerLatex: "0",
  },
  {
    title: "Compare spread using standard deviation",
    questionLatex: "\\text{Dataset A has standard deviation }2.1.\\text{ Dataset B has standard deviation }6.4.",
    steps: [{ explanation: "The larger standard deviation indicates more spread around the mean.", latex: "6.4>2.1" }],
    finalAnswerLatex: "\\text{Dataset B is more spread out.}",
  },
];

const sdGuided: PracticeQuestion[] = [
  statChoice("y10-stat-sd-g1", "Which dataset has the smaller spread?", "A", ["Standard deviation 1.8", "Standard deviation 5.2", "Both have the same spread", "The means decide the spread"], "A smaller standard deviation means less spread."),
  statAnswer("y10-stat-sd-g2", "Find the mean of the dataset before considering its spread.", "2,\\ 2,\\ 4,\\ 4", "3", "The mean is 3."),
  statAnswer("y10-stat-sd-g3", "Find the population standard deviation of the dataset.", "2,\\ 2,\\ 4,\\ 4", "1", "Each value is one unit from the mean, so the standard deviation is 1."),
  statChoice("y10-stat-sd-g4", "What does a population standard deviation of zero mean?", "D", ["The mean is zero", "The data has an outlier", "The range must be 10", "All values are equal"], "There is no spread when every value is equal."),
];

const sdIndependent: PracticeQuestion[] = [
  statAnswer("y10-stat-sd-i1", "Find the population standard deviation of the dataset.", "1,\\ 1,\\ 5,\\ 5", "2", "The mean is 3 and each value is two units away."),
  statChoice("y10-stat-sd-i2", "Dataset A has standard deviation 3.2 and Dataset B has standard deviation 7.5. Which is more spread out?", "B", ["Dataset A", "Dataset B", "They have the same spread", "The medians are required"], "Dataset B has the larger standard deviation."),
  statAnswer("y10-stat-sd-i3", "Find the population standard deviation of the dataset.", "9,\\ 9,\\ 9,\\ 9", "0", "All values equal the mean."),
  statChoice("y10-stat-sd-i4", "Two datasets have the same mean. Which statistic is most useful for comparing how spread out they are?", "C", ["Maximum only", "Median only", "Standard deviation", "Number of labels"], "Standard deviation measures spread around the mean."),
  statChoice("y10-stat-sd-i5", "Which dataset is likely to have the larger standard deviation?", "D", ["$5,5,5,5$", "$4,5,5,6$", "$3,4,6,7$", "$0,2,8,10$"], "The final dataset has values furthest from its centre."),
];

const sdMastery: PracticeQuestion[] = [
  statChoice("y10-stat-sd-m1", "Which standard deviation represents the least spread?", "B", ["4.6", "0.8", "3.1", "7.2"], "The smallest standard deviation indicates the least spread."),
  statAnswer("y10-stat-sd-m2", "Find the population standard deviation of the dataset.", "6,\\ 6,\\ 6,\\ 6", "0", "All values equal the mean."),
  statAnswer("y10-stat-sd-m3", "Find the population standard deviation of the dataset.", "3,\\ 3,\\ 7,\\ 7", "2", "The mean is 5 and each value is two units away."),
  statChoice("y10-stat-sd-m4", "Dataset A has standard deviation 2.4 and Dataset B has standard deviation 6.1. Which dataset is more consistent?", "A", ["Dataset A", "Dataset B", "Both are equally consistent", "The means must differ"], "The smaller standard deviation indicates less variation."),
  statChoice("y10-stat-sd-m5", "Which statement best describes standard deviation?", "C", ["It is always the maximum value", "It counts the number of values", "It measures spread around the mean", "It must equal the range"], "Standard deviation measures spread around the mean."),
  statChoice("y10-stat-sd-m6", "Which dataset has the greater spread?", "D", ["$8,8,8,8$", "$7,8,8,9$", "$6,7,9,10$", "$2,6,10,14$"], "The final dataset has the most widely separated values."),
  statAnswer("y10-stat-sd-m7", "Find the population standard deviation of the dataset.", "10,\\ 10,\\ 14,\\ 14", "2", "The mean is 12 and each value is two units away."),
  statChoice("y10-stat-sd-m8", "Two classes have the same test mean. Class A has standard deviation 4 and Class B has standard deviation 11. Which conclusion is best?", "B", ["Class A has more varied results", "Class B has more varied results", "Class B must have the higher mean", "Both classes have identical scores"], "Class B has the larger spread around the shared mean."),
  statChoice("y10-stat-sd-m9", "A single extreme value is added to an otherwise tightly grouped dataset. What is the likely effect on standard deviation?", "A", ["It increases", "It must become zero", "It always decreases", "It becomes the median"], "An extreme value increases spread around the mean."),
  statChoice("y10-stat-sd-m10", "Dataset A has mean 20 and standard deviation 1. Dataset B has mean 20 and standard deviation 7. Which description is most accurate?", "C", ["Dataset A has the higher centre", "Dataset B has the lower centre", "The centres match, but Dataset B is more spread out", "The datasets must contain the same values"], "The means match, while Dataset B has the larger standard deviation."),
];

const scatterWorked: WorkedExample[] = [
  {
    title: "Identify positive correlation",
    questionLatex: "\\text{Describe the pattern in }(1,2),(2,4),(3,6),(4,8).",
    steps: [{ explanation: "As the first variable increases, the second variable also increases.", latex: "\\text{positive correlation}" }],
    finalAnswerLatex: "\\text{positive correlation}",
    cartesianGraph: {
      description: "Scatterplot of four points rising steadily from left to right, showing positive correlation.",
      xMin: 0,
      xMax: 5,
      yMin: 0,
      yMax: 10,
      xStep: 1,
      yStep: 2,
      showGrid: true,
      points: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 8 }],
    },
  },
  {
    title: "Identify negative correlation",
    questionLatex: "\\text{Describe the pattern in }(1,10),(2,8),(3,6),(4,4).",
    steps: [{ explanation: "As the first variable increases, the second variable decreases.", latex: "\\text{negative correlation}" }],
    finalAnswerLatex: "\\text{negative correlation}",
    cartesianGraph: {
      description: "Scatterplot of four points falling steadily from left to right, showing negative correlation.",
      xMin: 0,
      xMax: 5,
      yMin: 0,
      yMax: 12,
      xStep: 1,
      yStep: 2,
      showGrid: true,
      points: [{ x: 1, y: 10 }, { x: 2, y: 8 }, { x: 3, y: 6 }, { x: 4, y: 4 }],
    },
  },
  {
    title: "Avoid claiming causation",
    questionLatex: "\\text{Students who exercise more often tend to report higher fitness scores. What can the data support?}",
    steps: [{ explanation: "A relationship can be observed, but the scatter data alone does not prove one variable causes the other." }],
    finalAnswerLatex: "\\text{The data suggests correlation, not proof of causation.}",
    cartesianGraph: {
      description: "Illustrative scatterplot with a general positive association between exercise frequency and fitness score, plus one point away from the main trend. The graph shows association and an outlier, not proof of causation.",
      xMin: 0,
      xMax: 7,
      yMin: 20,
      yMax: 100,
      xStep: 1,
      yStep: 20,
      showGrid: true,
      showAxisLabels: true,
      xAxisLabel: "exercise sessions",
      yAxisLabel: "fitness score",
      points: [{ x: 1, y: 38 }, { x: 2, y: 46 }, { x: 3, y: 55 }, { x: 4, y: 63 }, { x: 5, y: 71 }, { x: 6, y: 81 }, { x: 5, y: 35, label: "outlier" }],
    },
  },
];

const scatterGuided: PracticeQuestion[] = [
  statChoice("y10-stat-scatter-g1", "A coordinate pattern rises from left to right. Which description fits?", "A", ["Positive correlation", "Negative correlation", "No correlation", "A five-number summary"], "A rising pattern indicates positive correlation."),
  statChoice("y10-stat-scatter-g2", "A coordinate pattern falls from left to right. Which description fits?", "B", ["Positive correlation", "Negative correlation", "No correlation", "A box plot"], "A falling pattern indicates negative correlation."),
  statChoice("y10-stat-scatter-g3", "Points are spread randomly with no clear upward or downward pattern. Which description fits?", "C", ["Strong positive correlation", "Strong negative correlation", "No clear correlation", "Perfect correlation"], "A random pattern does not show a clear relationship."),
  statChoice("y10-stat-scatter-g4", "What does an outlier look like in a scatter plot?", "D", ["A point exactly on every other point", "The horizontal axis", "A row total", "A point noticeably away from the main pattern"], "An outlier sits away from the main cluster or trend."),
];

const scatterIndependent: PracticeQuestion[] = [
  statChoice("y10-stat-scatter-i1", "Which description best matches the coordinate pattern shown?", "A", ["Strong positive correlation", "Strong negative correlation", "No correlation", "A decreasing median"], "The coordinates rise steadily.", "(1,3),(2,5),(3,7),(4,9)"),
  statChoice("y10-stat-scatter-i2", "Which description best matches the coordinate pattern shown?", "B", ["Positive correlation", "Negative correlation", "No correlation", "A five-number summary"], "The coordinates decrease as the first variable increases.", "(1,12),(2,9),(3,7),(4,4)"),
  statChoice("y10-stat-scatter-i3", "A scatter pattern is tightly clustered around a rising trend. Which description is best?", "C", ["Weak negative correlation", "No correlation", "Strong positive correlation", "Strong negative correlation"], "A tight rising pattern indicates strong positive correlation."),
  statChoice("y10-stat-scatter-i4", "A study finds a correlation between screen time and tiredness. Which conclusion is safest?", "D", ["Screen time definitely causes tiredness", "Tiredness definitely causes screen time", "No relationship can exist", "The data shows association but does not prove causation"], "Correlation alone does not establish causation."),
  statChoice("y10-stat-scatter-i5", "Most points follow a rising trend, but one point lies far below the rest. How should that point be described?", "A", ["An outlier", "A median", "A marginal frequency", "A quartile"], "The point lies away from the main pattern."),
];

const scatterMastery: PracticeQuestion[] = [
  statChoice("y10-stat-scatter-m1", "As one variable increases, the other usually increases. What type of correlation is this?", "A", ["Positive", "Negative", "No correlation", "Conditional"], "Both variables tend to increase together."),
  statChoice("y10-stat-scatter-m2", "As one variable increases, the other usually decreases. What type of correlation is this?", "B", ["Positive", "Negative", "No correlation", "Interquartile"], "The variables move in opposite directions."),
  statChoice("y10-stat-scatter-m3", "Which description suggests no clear correlation?", "D", ["A tight rising pattern", "A tight falling pattern", "A gentle rising pattern", "A random cloud of points"], "A random cloud has no clear direction."),
  statChoice("y10-stat-scatter-m4", "Which coordinate pattern shows the strongest positive correlation?", "C", ["$(1,8),(2,3),(3,9),(4,4)$", "$(1,9),(2,7),(3,5),(4,3)$", "$(1,2),(2,4),(3,6),(4,8)$", "$(1,4),(2,4),(3,4),(4,4)$"], "The third pattern rises consistently."),
  statChoice("y10-stat-scatter-m5", "A point lies far from the main scatter trend. What is it called?", "B", ["A quartile", "An outlier", "A whisker", "A row total"], "A point away from the main pattern is an outlier."),
  statChoice("y10-stat-scatter-m6", "What can a scatter plot show?", "A", ["Association between two numerical variables", "Proof that one variable causes another", "Only a dataset median", "Only category totals"], "Scatter plots display relationships between two numerical variables."),
  statChoice("y10-stat-scatter-m7", "A pattern is widely scattered but still tends to rise. Which description is best?", "D", ["Strong negative correlation", "No possible relationship", "Strong positive correlation", "Weak positive correlation"], "The direction is positive, but the wide scatter makes it weak."),
  statChoice("y10-stat-scatter-m8", "A study finds that students carrying umbrellas are more likely to wear raincoats. Which conclusion is safest?", "C", ["Umbrellas cause raincoats", "Raincoats cause umbrellas", "A third factor such as rain may influence both", "The variables must have no correlation"], "Correlation can be explained by another variable."),
  statChoice("y10-stat-scatter-m9", "A dataset has a strong positive trend except for one extreme outlier. What is the best next step?", "A", ["Investigate the outlier before drawing a conclusion", "Delete every point", "Claim causation immediately", "Replace the data with a box plot total"], "An outlier should be checked because it may affect interpretation."),
  statChoice("y10-stat-scatter-m10", "Which statement distinguishes correlation from causation?", "B", ["Correlation proves the mechanism", "Correlation describes association; causation requires stronger evidence", "Causation is another word for median", "Correlation requires identical coordinates"], "A scatter relationship alone does not prove cause and effect."),
];

const bestFitWorked: WorkedExample[] = [
  {
    title: "Use a line of best fit",
    questionLatex: "\\text{A line of best fit is }y=3x+4.\\text{ Predict }y\\text{ when }x=5.",
    steps: [{ explanation: "Substitute the given input into the line equation.", latex: "y=3(5)+4=19" }],
    finalAnswerLatex: "19",
    cartesianGraph: {
      description: "Illustrative scatterplot with a rising line of best fit y equals 3x plus 4 through a cloud of nearby points.",
      xMin: 0,
      xMax: 6,
      yMin: 0,
      yMax: 24,
      xStep: 1,
      yStep: 4,
      showGrid: true,
      lines: [{ kind: "linear", m: 3, b: 4, label: "line of best fit" }],
      points: [{ x: 1, y: 8 }, { x: 2, y: 9 }, { x: 3, y: 14 }, { x: 4, y: 15 }, { x: 5, y: 20 }, { x: 6, y: 21 }],
    },
  },
  {
    title: "Identify interpolation",
    questionLatex: "\\text{Observed inputs range from 2 to 10. A prediction is made at }x=7.",
    steps: [{ explanation: "The input lies within the observed range.", latex: "2\\leq 7\\leq 10" }],
    finalAnswerLatex: "\\text{interpolation}",
  },
  {
    title: "Find a residual",
    questionLatex: "\\text{A line predicts }18\\text{ and the actual value is }21.\\text{ Find actual minus predicted.}",
    steps: [{ explanation: "Subtract the predicted value from the actual value.", latex: "21-18=3" }],
    finalAnswerLatex: "3",
    cartesianGraph: {
      description: "Regression line with a predicted point at 18 and an actual point at 21 for the same input. A vertical segment shows the residual of 3.",
      xMin: 0,
      xMax: 6,
      yMin: 0,
      yMax: 24,
      xStep: 1,
      yStep: 4,
      showGrid: true,
      lines: [{ kind: "linear", m: 3, b: 6, label: "prediction line" }],
      points: [{ x: 4, y: 18, label: "predicted" }, { x: 4, y: 21, label: "actual" }],
      lineSegments: [{ from: { x: 4, y: 18 }, to: { x: 4, y: 21 }, label: "residual" }],
    },
  },
];

const bestFitGuided: PracticeQuestion[] = [
  statAnswer("y10-stat-fit-g1", "Use the displayed line of best fit to predict the output when the input is 4.", "y=2x+3,\\quad x=4", "11", "Substitute 4 into the line equation."),
  statChoice("y10-stat-fit-g2", "Observed inputs range from 1 to 8. A prediction is made at input 6. What type of prediction is this?", "A", ["Interpolation", "Extrapolation", "Correlation", "Standard deviation"], "The input lies within the observed range."),
  statChoice("y10-stat-fit-g3", "Observed inputs range from 1 to 8. A prediction is made at input 12. What type of prediction is this?", "B", ["Interpolation", "Extrapolation", "A quartile", "A marginal total"], "The input lies outside the observed range."),
  statAnswer("y10-stat-fit-g4", "A line of best fit predicts 24 and the actual value is 28. Find actual minus predicted.", "\\text{actual}=28,\\quad \\text{predicted}=24", "4", "Subtract the prediction from the actual value."),
];

const bestFitIndependent: PracticeQuestion[] = [
  statAnswer("y10-stat-fit-i1", "Use the displayed line of best fit to predict the output when the input is 6.", "y=4x+1,\\quad x=6", "25", "Substitute 6 into the line equation."),
  statAnswer("y10-stat-fit-i2", "Use the displayed line of best fit to predict the output when the input is 7.", "y=3x-2,\\quad x=7", "19", "Substitute 7 into the line equation."),
  statChoice("y10-stat-fit-i3", "Why should a prediction far outside the observed input range be treated cautiously?", "C", ["It is always exactly correct", "It becomes a quartile", "The observed trend may not continue that far", "It must equal the mean"], "Extrapolation becomes less reliable further beyond the data."),
  statAnswer("y10-stat-fit-i4", "A line of best fit predicts 35 and the actual value is 31. Find actual minus predicted.", "\\text{actual}=31,\\quad \\text{predicted}=35", "-4", "Subtract the prediction from the actual value."),
  statChoice("y10-stat-fit-i5", "What is the purpose of a line of best fit?", "D", ["To pass through every point exactly", "To prove causation", "To replace the dataset with quartiles", "To summarise the overall trend"], "A line of best fit summarises the trend."),
];

const bestFitMastery: PracticeQuestion[] = [
  statAnswer("y10-stat-fit-m1", "Use the displayed line of best fit to predict the output when the input is 3.", "y=5x+2,\\quad x=3", "17", "Substitute 3 into the line equation."),
  statChoice("y10-stat-fit-m2", "Observed inputs range from 4 to 14. A prediction is made at input 9. What type of prediction is this?", "A", ["Interpolation", "Extrapolation", "Outlier removal", "Conditional probability"], "The input lies within the observed range."),
  statAnswer("y10-stat-fit-m3", "A line predicts 16 and the actual value is 19. Find actual minus predicted.", "\\text{actual}=19,\\quad \\text{predicted}=16", "3", "Subtract the prediction from the actual value."),
  statAnswer("y10-stat-fit-m4", "Use the displayed line of best fit to predict the output when the input is 8.", "y=2x+7,\\quad x=8", "23", "Substitute 8 into the line equation."),
  statChoice("y10-stat-fit-m5", "Which statement about a line of best fit is correct?", "B", ["It must pass through every point", "It summarises the overall trend", "It proves causation", "It is always horizontal"], "A line of best fit represents the general pattern."),
  statChoice("y10-stat-fit-m6", "Observed inputs range from 10 to 30. Which prediction is an extrapolation?", "C", ["Input 12", "Input 25", "Input 42", "Input 18"], "Input 42 lies outside the observed range."),
  statAnswer("y10-stat-fit-m7", "A line of best fit predicts 42 and the actual value is 37. Find actual minus predicted.", "\\text{actual}=37,\\quad \\text{predicted}=42", "-5", "Subtract the prediction from the actual value."),
  statChoice("y10-stat-fit-m8", "A line of best fit is based on inputs from 2 to 12. Which prediction is likely to be least reliable?", "D", ["Input 5", "Input 8", "Input 11", "Input 40"], "Input 40 is far outside the observed range."),
  statAnswer("y10-stat-fit-m9", "A prediction from the displayed line is 29. The actual value is 34. Find actual minus predicted.", "y=3x+5,\\quad x=8;\\quad \\text{actual}=34", "5", "The prediction is 29, so actual minus predicted is 5."),
  statChoice("y10-stat-fit-m10", "Two lines are suggested for a scatter pattern. Which is the better line of best fit?", "C", ["A line far above every point", "A line through one outlier only", "A line passing through the middle of the overall trend", "A vertical line regardless of the pattern"], "A useful line of best fit balances the overall pattern."),
];

function mistakes(topic: string) {
  return {
    iqr: [
      { mistake: "Finding quartiles before ordering the data.", fix: "Put values in ascending order before identifying the median and quartiles." },
      { mistake: "Using the full range instead of the interquartile range.", fix: "For IQR, subtract the lower quartile from the upper quartile." },
      { mistake: "Including the middle value in both halves for an odd-sized dataset.", fix: "After identifying the median, use the values below and above it as the two halves." },
      { mistake: "Assuming a larger IQR means a larger median.", fix: "IQR measures spread, while the median measures centre." },
    ],
    box: [
      { mistake: "Reading the ends of the box as the minimum and maximum.", fix: "The box runs from the lower quartile to the upper quartile. Whiskers extend to the minimum and maximum." },
      { mistake: "Treating the line inside the box as the mean.", fix: "The line inside the box represents the median." },
      { mistake: "Comparing spread using medians alone.", fix: "Compare IQRs for the spread of the middle half." },
      { mistake: "Writing a five-number summary out of order.", fix: "List minimum, lower quartile, median, upper quartile, then maximum." },
    ],
    sd: [
      { mistake: "Thinking a larger standard deviation means a larger mean.", fix: "Standard deviation measures spread around the mean, not the size of the mean." },
      { mistake: "Calling a tightly grouped dataset more variable.", fix: "A smaller standard deviation indicates less spread." },
      { mistake: "Ignoring an extreme value.", fix: "An extreme value can increase standard deviation noticeably." },
      { mistake: "Using standard deviation as a category count.", fix: "Use standard deviation only for numerical data spread." },
    ],
    scatter: [
      { mistake: "Calling a falling trend positive.", fix: "A falling trend is negative correlation because one variable tends to decrease as the other increases." },
      { mistake: "Claiming that correlation proves causation.", fix: "Correlation shows association. Stronger evidence is required to claim causation." },
      { mistake: "Ignoring a point far from the main pattern.", fix: "Investigate outliers because they may affect interpretation." },
      { mistake: "Calling a widely scattered trend strong.", fix: "Strength depends on how closely the points follow the overall direction." },
    ],
    fit: [
      { mistake: "Expecting a line of best fit to pass through every point.", fix: "The line should summarise the overall trend." },
      { mistake: "Treating extrapolation as equally reliable as interpolation.", fix: "Predictions far beyond observed values require caution." },
      { mistake: "Reversing actual minus predicted when finding a residual.", fix: "Follow the stated order carefully: actual value minus predicted value." },
      { mistake: "Reporting a prediction as an exact result.", fix: "A line-of-best-fit prediction is an estimate." },
    ],
  }[topic]!;
}

export function year10StatisticsDataLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-10-mathematics" || unit.slug !== "statistics-data") return null;
  const base = { syllabusArea: "Statistics and Probability", masteryPassMark: 0.8 };

  if (lesson.slug === "quartiles-iqr") return {
    ...base, description: "Find medians, quartiles and interquartile ranges, and compare the spread of datasets.", learningIntention: "Use ordered data to calculate quartiles and interpret the interquartile range.", successCriteria: ["Order data before finding summary statistics.", "Find the median, lower quartile and upper quartile.", "Calculate the interquartile range.", "Compare middle spreads using IQR."], teaching: { paragraphs: ["Quartiles divide ordered data into sections.", "The median is the middle value. The lower quartile is the median of the lower half, and the upper quartile is the median of the upper half.", "The interquartile range measures the spread of the middle half of the data.", "A value far from the rest of the data may be an outlier."], latexBlocks: ["IQR=Q_3-Q_1"] }, workedExamples: quartilesWorked, guidedPractice: quartilesGuided, independentPractice: quartilesIndependent, commonMistakes: mistakes("iqr"), masteryQuiz: quartilesMastery,
  };
  if (lesson.slug === "box-whisker-plots") return {
    ...base, description: "Interpret box-and-whisker plots using five-number summaries, medians and interquartile ranges.", learningIntention: "Use five-number summaries to describe and compare box plots.", successCriteria: ["Identify the five-number summary.", "Explain what the box and whiskers represent.", "Compare medians.", "Compare spreads using IQR."], teaching: { paragraphs: ["A box-and-whisker plot summarises a dataset using five values.", "The box extends from the lower quartile to the upper quartile. The line inside the box marks the median.", "The whiskers extend from the box to the minimum and maximum.", "Two box plots can be compared using their medians and interquartile ranges."], latexBlocks: ["(\\text{minimum},\\ Q_1,\\ \\text{median},\\ Q_3,\\ \\text{maximum})", "IQR=Q_3-Q_1"] }, workedExamples: boxWorked, guidedPractice: boxGuided, independentPractice: boxIndependent, commonMistakes: mistakes("box"), masteryQuiz: boxMastery,
  };
  if (lesson.slug === "standard-deviation") return {
    ...base, description: "Interpret standard deviation as a measure of numerical spread around the mean.", learningIntention: "Calculate simple population standard deviations and compare dataset spread.", successCriteria: ["Explain what standard deviation measures.", "Interpret small and large standard deviations.", "Calculate population standard deviation for simple datasets.", "Describe the effect of extreme values."], teaching: { paragraphs: ["Standard deviation measures how spread out numerical values are around their mean.", "A small standard deviation means values are generally close to the mean. A large standard deviation means they are more spread out.", "A standard deviation of zero means all values are identical.", "For this lesson, calculations use population standard deviation: average the squared deviations, then take the square root."], latexBlocks: ["\\sigma=\\sqrt{\\frac{\\sum (x-\\bar{x})^2}{n}}"] }, workedExamples: sdWorked, guidedPractice: sdGuided, independentPractice: sdIndependent, commonMistakes: mistakes("sd"), masteryQuiz: sdMastery,
  };
  if (lesson.slug === "scatter-plots-correlation") return {
    ...base, description: "Describe scatter-plot relationships using direction, strength, outliers and careful interpretation.", learningIntention: "Interpret correlation patterns without confusing association with causation.", successCriteria: ["Identify positive, negative and no clear correlation.", "Distinguish strong and weak patterns.", "Recognise outliers.", "Explain why correlation does not prove causation."], teaching: { paragraphs: ["A scatter plot shows the relationship between two numerical variables.", "A rising trend indicates positive correlation. A falling trend indicates negative correlation. A random cloud shows no clear correlation.", "A tight pattern is stronger than a widely scattered pattern.", "Correlation describes association, not proof that one variable causes another. Outliers should also be investigated."], latexBlocks: ["\\text{correlation}\\neq\\text{causation}"] }, workedExamples: scatterWorked, guidedPractice: scatterGuided, independentPractice: scatterIndependent, commonMistakes: mistakes("scatter"), masteryQuiz: scatterMastery,
  };
  if (lesson.slug === "lines-of-best-fit") return {
    ...base, description: "Use lines of best fit for estimates, interpolation, extrapolation and simple residual calculations.", learningIntention: "Use and interpret a line of best fit as a summary of a scatter trend.", successCriteria: ["Use a line equation to make a prediction.", "Distinguish interpolation from extrapolation.", "Explain why extrapolation requires caution.", "Calculate actual minus predicted."], teaching: { paragraphs: ["A line of best fit summarises the overall trend in a scatter plot. It does not need to pass through every point.", "A line equation can be used to estimate an output for a given input.", "Interpolation predicts within the observed input range. Extrapolation predicts outside the observed range and is less reliable when taken too far.", "A residual compares an actual value with its predicted value."], latexBlocks: ["y=mx+b", "\\text{residual}=\\text{actual value}-\\text{predicted value}"] }, workedExamples: bestFitWorked, guidedPractice: bestFitGuided, independentPractice: bestFitIndependent, commonMistakes: mistakes("fit"), masteryQuiz: bestFitMastery,
  };
  return null;
}
