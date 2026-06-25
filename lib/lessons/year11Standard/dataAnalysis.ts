import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { financeChoice, dataAnswer as baseDataAnswer, formatChoiceText } from "../questionHelpers";

function dataAnalysisFeedback(prompt: string, latex: string, answer: string): string {
  const context = `${prompt} ${latex}`.toLowerCase();

  if (context.includes("mean")) {
    return `The mean is the balance point of the data: add all the values, then share the total evenly across the number of values. That gives ${answer}.`;
  }

  if (context.includes("median")) {
    return `The median is the middle value after the data are in order. Count in from both ends, or find the central position, to get ${answer}.`;
  }

  if (context.includes("mode")) {
    return `The mode is the value or category that appears most often. Look for the repeated value or the highest frequency, which gives ${answer}.`;
  }

  if (context.includes("range")) {
    return `Range measures the full spread of the data, from the smallest value to the largest. Subtract the minimum from the maximum to get ${answer}.`;
  }

  if (
    context.includes("outlier") ||
    context.includes("unusually") ||
    context.includes("far from") ||
    context.includes("likely an outlier")
  ) {
    return `An outlier is not just the biggest or smallest value; it sits noticeably away from the main group. Compare it with the cluster of typical values to identify ${answer}.`;
  }

  if (context.includes("percentage") || context.includes("percent")) {
    return `A percentage compares the part with the whole out of 100. Divide the relevant count by the total, then multiply by 100 to get ${answer}.`;
  }

  if (
    context.includes("total") ||
    context.includes("how many") ||
    context.includes("surveyed")
  ) {
    return `This asks for a total count, so add the relevant frequencies or data values once each. Do not average them; the total is ${answer}.`;
  }

  if (
    context.includes("frequency table") ||
    context.includes("rating") ||
    context.includes("column graph") ||
    context.includes("bar chart")
  ) {
    return `For a display or frequency table, separate the data value from how often it occurs. Read the matching category or frequency carefully to get ${answer}.`;
  }

  if (
    context.includes("temperature") ||
    context.includes("delivery") ||
    context.includes("travel") ||
    context.includes("customer") ||
    context.includes("sport") ||
    context.includes("study") ||
    context.includes("absences")
  ) {
    return `First identify which statistic the question asks for, then use the data values in the context. Keep the unit or label attached so the result is ${answer}.`;
  }

  if (context.includes("modal class") || (context.includes("class interval") && context.includes("frequency")) || context.includes("grouped frequency") || context.includes("midpoint") && context.includes("class")) {
    return `For grouped data, the modal class has the highest frequency. To estimate the mean, multiply each midpoint by its frequency, add those products, then divide by the total frequency. The result is ${answer}.`;
  }

  if (context.includes("iqr") || context.includes("quartile") || context.includes("box plot") || context.includes("five-number") || context.includes("whisker") || context.includes("fence")) {
    return `The IQR is Q3 minus Q1 and measures the spread of the middle 50% of data. Fences extend 1.5 × IQR beyond Q1 and Q3 — values outside those fences are outliers. The answer is ${answer}.`;
  }

  if ((context.includes("stem") && context.includes("leaf")) || context.includes("back-to-back")) {
    return `In a stem-and-leaf plot, combine the stem and leaf to read each value. The median is the middle value after the data is ordered. In back-to-back plots, compare medians and ranges to describe differences between groups. The result is ${answer}.`;
  }

  if (context.includes("trend") || context.includes("time series") || context.includes("monthly") && context.includes("predict")) {
    return `For a time series, describe whether the overall pattern is increasing, decreasing or fluctuating. Predictions from a trend line should be described as cautious because the trend may not continue. The answer is ${answer}.`;
  }

  return `Start by deciding whether the question asks for centre, spread, a frequency, or a practical interpretation. Use the matching data rule carefully to get ${answer}.`;
}

function dataAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseDataAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: dataAnalysisFeedback(prompt, latex, answer),
  };
}

// Gold-standard authoring helpers (per docs/QUESTION_AUTHORING_STANDARD.md):
// every question carries a specific, step-by-step explanation and may attach a
// visual payload (bar chart, dot plot, box plot, stem-and-leaf, histogram, …).
type QuestionExtras = {
  latex?: string;
  accepted?: string[];
  hint?: string;
} & Partial<PracticeQuestion>;

function typedQ(
  id: string,
  prompt: string,
  answer: string,
  explanation: string,
  extras: QuestionExtras = {}
): PracticeQuestion {
  const { latex = "", accepted = [], hint, ...payload } = extras;
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...accepted])),
    hint:
      hint ??
      "Decide which statistic the question needs, then work through the data values carefully.",
    explanation,
    ...payload,
  };
}

function mcqQ(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  extras: { latex?: string; hint?: string } & Partial<PracticeQuestion> = {}
): PracticeQuestion {
  const { latex = "\\text{Select A, B, C, or D.}", hint, ...payload } = extras;
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint: hint ?? "Rule out the options that come from a common error.",
    explanation,
    ...payload,
  };
}

// Build a time-series line graph (points at consecutive time steps joined by
// segments) as a cartesianGraph payload for spreading onto a question.
function timeSeriesGraph(
  description: string,
  xAxisLabel: string,
  yAxisLabel: string,
  values: number[],
  yMin: number,
  yMax: number,
  yStep: number
): Partial<PracticeQuestion> {
  const points = values.map((y, index) => ({ x: index + 1, y }));
  const lineSegments = points
    .slice(0, -1)
    .map((from, index) => ({ from, to: points[index + 1] }));
  return {
    cartesianGraph: {
      description,
      xAxisLabel,
      yAxisLabel,
      showAxisLabels: true,
      showGrid: true,
      xMin: 0,
      xMax: values.length + 1,
      yMin,
      yMax,
      yStep,
      points,
      lineSegments,
    },
  };
}
function dataAnalysisWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "data-displays-summary-statistics") {
    return [
      {
        title: "Mean coffee sales",
        questionLatex:
          "\\text{Cafe coffees sold over 7 mornings: }42,38,45,51,39,44,48",
        steps: [
          { explanation: "Add the seven sales values.", latex: "42+38+45+51+39+44+48=307" },
          { explanation: "Divide by 7 mornings.", latex: "307\\div 7=43.857\\ldots" },
        ],
        finalAnswerLatex: "43.9\\text{ coffees, approximately}",
      },
      {
        title: "Median and range after ordering",
        questionLatex:
          "\\text{Delivery times in minutes: }18,20,21,22,23,24,47",
        steps: [
          { explanation: "The data are already ordered. The middle value is the 4th value.", latex: "\\text{median}=22" },
          { explanation: "Range is highest minus lowest.", latex: "47-18=29" },
        ],
        finalAnswerLatex: "\\text{median }22\\text{ min, range }29\\text{ min}",
      },
      {
        title: "Reading a frequency table",
        questionLatex:
          "\\text{30 customers rate a product from 1 to 5 stars. Which rating is the mode?}",
        steps: [
          { explanation: "Frequency tells how many times each rating occurred — read it from the height of each column." },
          { explanation: "The tallest column is rating 5 with a frequency of 12, so the mode is rating 5." },
        ],
        finalAnswerLatex: "\\text{Rating }5",
        barChartDiagram: {
          description:
            "Column graph of product ratings from 30 customers: rating 1 has frequency 2, rating 2 has 3, rating 3 has 5, rating 4 has 8, rating 5 has 12.",
          bars: [
            { label: "1", value: 2 },
            { label: "2", value: 3 },
            { label: "3", value: 5 },
            { label: "4", value: 8 },
            { label: "5", value: 12 },
          ],
          valueAxisLabel: "Frequency",
          categoryAxisLabel: "Rating (stars)",
        },
      },
    ];
  }

  if (slug === "interpreting-data-outliers") {
    return [
      {
        title: "Identifying an outlier",
        questionLatex:
          "\\text{Delivery times in minutes: }18,20,21,22,23,24,47",
        steps: [
          { explanation: "Most values are between 18 and 24 minutes." },
          { explanation: "47 minutes is far away from the rest." },
        ],
        finalAnswerLatex: "47\\text{ min}",
      },
      {
        title: "Mean and median with an outlier",
        questionLatex:
          "\\text{Data: }18,20,21,22,23,24,47",
        steps: [
          { explanation: "The median is the middle value.", latex: "\\text{median}=22" },
          { explanation: "The outlier 47 pulls the mean upward more than the median." },
        ],
        finalAnswerLatex: "\\text{Median is more resistant.}",
      },
      {
        title: "Choosing a summary statistic",
        questionLatex:
          "\\text{A delivery data set has one unusually late delivery.}",
        steps: [
          { explanation: "An outlier can distort the mean." },
          { explanation: "The median better describes a typical delivery time when the outlier is not typical." },
        ],
        finalAnswerLatex: "\\text{Use the median.}",
      },
    ];
  }

  if (slug === "grouped-data-frequency-tables") {
    return [
      {
        title: "Identifying the modal class",
        questionLatex:
          "\\begin{array}{c|c}\\text{Class}&\\text{Freq}\\\\0\\text{–}9&2\\\\10\\text{–}19&5\\\\20\\text{–}29&8\\\\30\\text{–}39&5\\end{array}",
        steps: [
          { explanation: "The modal class is the one with the highest frequency." },
          { explanation: "Compare frequencies: 2, 5, 8, 5. The highest is 8, which belongs to the 20–29 class.", latex: "\\text{Modal class} = 20\\text{–}29" },
        ],
        finalAnswerLatex: "\\text{Modal class: }20\\text{–}29",
      },
      {
        title: "Estimating the mean from grouped data",
        questionLatex:
          "\\begin{array}{c|c|c|c}\\text{Class}&\\text{Freq}(f)&\\text{Midpoint}(m)&f\\times m\\\\0\\text{–}9&2&4.5&9\\\\10\\text{–}19&5&14.5&72.5\\\\20\\text{–}29&8&24.5&196\\\\30\\text{–}39&5&34.5&172.5\\end{array}",
        steps: [
          { explanation: "The midpoint of each class represents the typical value for that group.", latex: "\\text{e.g. midpoint of }10\\text{–}19 = \\frac{10+19}{2} = 14.5" },
          { explanation: "Multiply each midpoint by its frequency and sum the products.", latex: "\\sum f\\times m = 9+72.5+196+172.5 = 450" },
          { explanation: "Divide by the total frequency to estimate the mean.", latex: "\\bar{x} \\approx \\frac{450}{20} = 22.5" },
        ],
        finalAnswerLatex: "\\text{Estimated mean} \\approx 22.5",
      },
    ];
  }

  if (slug === "box-plots-five-number-summary") {
    return [
      {
        title: "Finding the five-number summary",
        questionLatex:
          "\\text{Ordered data: }3,\\ 7,\\ 8,\\ 10,\\ 12,\\ 14,\\ 15,\\ 18,\\ 20,\\ 25",
        steps: [
          { explanation: "The median Q2 is the average of the 5th and 6th values (n = 10).", latex: "Q_2 = \\frac{12+14}{2} = 13" },
          { explanation: "Q1 is the median of the lower half: {3, 7, 8, 10, 12}.", latex: "Q_1 = 8" },
          { explanation: "Q3 is the median of the upper half: {14, 15, 18, 20, 25}.", latex: "Q_3 = 18" },
          { explanation: "IQR = Q3 − Q1.", latex: "\\text{IQR} = 18 - 8 = 10" },
        ],
        finalAnswerLatex: "\\text{Min }3,\\ Q_1\\ 8,\\ Q_2\\ 13,\\ Q_3\\ 18,\\ \\text{Max }25",
      },
      {
        title: "Checking for outliers using the IQR rule",
        questionLatex:
          "Q_1 = 8,\\quad Q_3 = 18,\\quad \\text{IQR} = 10",
        steps: [
          { explanation: "Lower fence = Q1 − 1.5 × IQR.", latex: "8 - 1.5\\times10 = 8 - 15 = -7" },
          { explanation: "Upper fence = Q3 + 1.5 × IQR.", latex: "18 + 1.5\\times10 = 18 + 15 = 33" },
          { explanation: "Any value below −7 or above 33 is an outlier. Min = 3 and max = 25 are both within range, so there are no outliers.", latex: "-7 < 3 \\leq 25 < 33" },
        ],
        finalAnswerLatex: "\\text{No outliers}",
      },
    ];
  }

  if (slug === "stem-leaf-plots") {
    return [
      {
        title: "Reading a stem-and-leaf plot and finding the median",
        questionLatex: "\\text{Use the stem-and-leaf plot to find the median.}",
        stemAndLeafDiagram: {
          description: "Stem-and-leaf plot with stems 1, 2, 3. Stem 1 leaves 2 5 8; stem 2 leaves 0 3 6 7; stem 3 leaves 1 4 9.",
          keyText: "1 | 2 = 12",
          rows: [
            { stem: 1, leaves: [2, 5, 8] },
            { stem: 2, leaves: [0, 3, 6, 7] },
            { stem: 3, leaves: [1, 4, 9] },
          ],
        },
        steps: [
          { explanation: "Read the values in order from the plot.", latex: "12,15,18,20,23,26,27,31,34,39\\quad(n=10)" },
          { explanation: "The median of 10 values is the average of the 5th and 6th.", latex: "Q_2 = \\frac{23+26}{2} = 24.5" },
        ],
        finalAnswerLatex: "\\text{Median} = 24.5",
      },
      {
        title: "Comparing two groups in a back-to-back plot",
        questionLatex: "\\text{Compare the two groups using the back-to-back plot.}",
        stemAndLeafDiagram: {
          description: "Back-to-back stem-and-leaf plot. Group A (left): stem 1 has 12, 15, 18; stem 2 has 25, 28. Group B (right): stem 1 has 13, 17; stem 2 has 21, 25, 28; stem 3 has 33.",
          keyText: "1 | 3 = 13",
          leftLabel: "Group A",
          rightLabel: "Group B",
          rows: [
            { stem: 1, leftLeaves: [2, 5, 8], leaves: [3, 7] },
            { stem: 2, leftLeaves: [5, 8], leaves: [1, 5, 8] },
            { stem: 3, leftLeaves: [], leaves: [3] },
          ],
        },
        steps: [
          { explanation: "Group A values are 12, 15, 18, 25, 28 (n = 5). The median is the 3rd value.", latex: "\\text{Group A median} = 18" },
          { explanation: "Group B values are 13, 17, 21, 25, 28, 33 (n = 6). The median is the average of the 3rd and 4th.", latex: "\\text{Group B median} = \\frac{21+25}{2} = 23" },
          { explanation: "Group B's higher median (23 vs 18) means Group B values are typically larger than Group A." },
        ],
        finalAnswerLatex: "\\text{Group B typically higher}",
      },
    ];
  }

  if (slug === "time-series-trend-lines") {
    return [
      {
        title: "Describing a time series trend",
        questionLatex:
          "\\text{Monthly sales (Jan–Jun): }40,\\ 45,\\ 42,\\ 50,\\ 55,\\ 58",
        steps: [
          { explanation: "Plot the values against time (Jan = 1, Feb = 2, etc.) and look at the overall pattern.", latex: "\\text{Values: }40\\to45\\to42\\to50\\to55\\to58" },
          { explanation: "Despite one dip in March (42), the overall direction is upward.", latex: "\\text{Trend: increasing}" },
        ],
        finalAnswerLatex: "\\text{Overall increasing trend}",
      },
      {
        title: "Making a cautious prediction",
        questionLatex:
          "\\text{Trend line predicts July sales of 62. Assess this prediction.}",
        steps: [
          { explanation: "The trend line extends the increasing pattern into July.", latex: "\\text{Prediction: }62" },
          { explanation: "Predictions beyond the data range are uncertain — new competitors, seasons or economic changes could alter the trend.", latex: "\\text{Describe as a cautious estimate only.}" },
        ],
        finalAnswerLatex: "\\text{62 is a reasonable estimate but the trend may not continue.}",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed summary statistics`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Day}&\\text{Sales}\\\\\\text{Mon}&42\\\\\\text{Tue}&38\\\\\\text{Wed}&45\\\\\\text{Thu}&51\\\\\\text{Fri}&44\\end{array}",
      steps: [
        { explanation: "Use the table to identify the data values." },
        { explanation: "Calculate the statistic requested, such as mean, median or range." },
      ],
      finalAnswerLatex: "\\text{Answer depends on the statistic requested.}",
    },
    {
      title: `${title}: interpreting an outlier`,
      questionLatex:
        "\\text{Travel times: }14,15,16,16,17,18,42",
      steps: [
        { explanation: "The value 42 is far from the rest of the travel times." },
        { explanation: "Use a cautious conclusion because the unusual value affects the mean." },
      ],
      finalAnswerLatex: "42\\text{ min is an outlier.}",
    },
  ];
}



export function year11StandardDataAnalysisLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "data-analysis") {
    return null;
  }

  const base = {
    workedExamples: dataAnalysisWorkedExamples(lesson.slug, lesson.title),
    syllabusArea: "Statistical Analysis",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "data-displays-summary-statistics") {
    return {
      ...base,
      description:
        "Read data displays and calculate mean, median, mode and range in practical contexts.",
      learningIntention:
        "Summarise and display practical data using frequency tables, graphs and summary statistics.",
      successCriteria: [
        "Classify data as categorical (nominal or ordinal) or numerical (discrete or continuous).",
        "Read frequency tables, column/bar graphs and dot plots.",
        "Calculate mean, median, mode and range.",
        "Choose a suitable summary statistic for a context.",
      ],
      teaching: {
        paragraphs: [
          "Categorical data sorts items into groups, such as transport type or drink choice. It is nominal when the groups have no natural order, and ordinal when they do (e.g. small/medium/large). Numerical data is a quantity: discrete when it is counted in whole numbers (e.g. number of siblings) and continuous when it is measured and can take in-between values (e.g. height in cm).",
          "Frequency tables, column graphs and dot plots all show how often each category or value occurs. The height of a column (or the number of dots) is the frequency — not the data value itself.",
          "The mean shares the total equally among all the values — what each would be if they were levelled off — found by dividing the total by the number of values. The median is the middle value after ordering (for an even count, the average of the two middle values), and the mode is the most common value.",
          "The range is the highest value minus the lowest value. It gives a quick measure of spread. Choose the statistic that answers the question: the mode for the most common outcome, the median for a typical value when the data is skewed, and the mean for an even share.",
        ],
        latexBlocks: [
          "\\text{mean}=\\frac{\\text{total}}{\\text{number of values}}",
          "\\text{range}=\\text{highest value}-\\text{lowest value}",
        ],
      },
      guidedPractice: [
        mcqQ(
          "data-display-g1",
          "A café records the drink each customer orders: latte, flat white, mocha or tea. What type of data is this?",
          "A",
          ["Categorical", "Numerical and discrete", "Numerical and continuous", "Ordinal, because some drinks cost more"],
          "Drink type sorts customers into named groups with no numerical value and no natural order, so it is categorical (nominal). The entries are labels, not counts or measurements (so not numerical), and price is not part of the recorded data (so not ordinal).",
        ),
        typedQ(
          "data-display-g2",
          "The column graph shows how many coffees a café sold each day. How many coffees were sold across the whole week?",
          "220",
          "Add the five daily values from the graph: 38 + 42 + 45 + 51 + 44 = 220 coffees.",
          {
            accepted: ["220 coffees"],
            hint: "Read each column's height, then add the five days together.",
            barChartDiagram: {
              description: "Column graph of coffees sold each day: Mon 38, Tue 42, Wed 45, Thu 51, Fri 44.",
              bars: [
                { label: "Mon", value: 38 },
                { label: "Tue", value: 42 },
                { label: "Wed", value: 45 },
                { label: "Thu", value: 51 },
                { label: "Fri", value: 44 },
              ],
              valueAxisLabel: "Coffees sold",
              categoryAxisLabel: "Day",
            },
          },
        ),
        typedQ(
          "data-display-g3",
          "Four delivery times (in minutes) are recorded: 24, 18, 22, 20. Find the median delivery time.",
          "21",
          "Order the times first: 18, 20, 22, 24. With four values the median is the average of the two middle values: (20 + 22) ÷ 2 = 21 minutes.",
          { accepted: ["21 min", "21 minutes"], hint: "Order the values, then average the two in the middle." },
        ),
        typedQ(
          "data-display-g4",
          "A school records daily absences over a week: 6, 4, 9, 7, 8. Find the range.",
          "5",
          "Range = highest − lowest = 9 − 4 = 5 absences.",
          { accepted: ["5 absences"], hint: "Subtract the smallest value from the largest." },
        ),
      ],
      independentPractice: [
        typedQ(
          "data-display-i1",
          "The dot plot shows the number of goals a team scored in each match this season. What is the modal number of goals?",
          "2",
          "The mode is the value with the most dots. Three matches had 2 goals — more than any other value — so the mode is 2 goals.",
          {
            accepted: ["2 goals"],
            hint: "Find the column of dots that is tallest.",
            dotPlotDiagram: {
              description: "Dot plot of goals per match: 0 goals (1 match), 1 goal (2 matches), 2 goals (3 matches), 3 goals (1 match), 4 goals (1 match).",
              min: 0,
              max: 5,
              counts: [
                { value: 0, count: 1 },
                { value: 1, count: 2 },
                { value: 2, count: 3 },
                { value: 3, count: 1 },
                { value: 4, count: 1 },
              ],
              axisLabel: "Goals per match",
            },
          },
        ),
        typedQ(
          "data-display-i2",
          "The column graph shows how 20 customers rated a product from 1 to 5 stars. Calculate the mean rating.",
          "3",
          "Multiply each rating by its frequency and add: 1×2 + 2×4 + 3×8 + 4×4 + 5×2 = 60. Divide by the 20 ratings: 60 ÷ 20 = 3.0 stars.",
          {
            accepted: ["3.0", "3 stars"],
            hint: "Total of (rating × frequency), then divide by the number of customers.",
            barChartDiagram: {
              description: "Column graph of 20 product ratings: rating 1 has frequency 2, rating 2 has 4, rating 3 has 8, rating 4 has 4, rating 5 has 2.",
              bars: [
                { label: "1", value: 2 },
                { label: "2", value: 4 },
                { label: "3", value: 8 },
                { label: "4", value: 4 },
                { label: "5", value: 2 },
              ],
              valueAxisLabel: "Frequency",
              categoryAxisLabel: "Rating (stars)",
            },
          },
        ),
        typedQ(
          "data-display-i3",
          "A shop counts customers each day for five days: 27, 33, 29, 35, 26. Find the mean number of customers per day.",
          "30",
          "Add the five counts: 27 + 33 + 29 + 35 + 26 = 150. Divide by 5 days: 150 ÷ 5 = 30 customers.",
          { accepted: ["30 customers", "30.0"], hint: "Add the counts, then divide by the number of days." },
        ),
        mcqQ(
          "data-display-i4",
          "A shoe shop wants to know which size to stock the most of. Which summary statistic is most useful?",
          "A",
          [
            "The mode — the most frequently sold size",
            "The mean — the average of all sizes sold",
            "The range — the spread of sizes",
            "The median — the middle size",
          ],
          "Stocking decisions need the size sold most often, which is the mode. The mean could be a size nobody wears (e.g. 8.5), the median ignores how often each size sells, and the range only describes spread.",
        ),
        typedQ(
          "data-display-i5",
          "The column graph shows the favourite sport of a class. How many more students chose the most popular sport than the least popular sport?",
          "7",
          "The most popular is soccer (12) and the least popular is tennis (5). The difference is 12 − 5 = 7 students.",
          {
            accepted: ["7 students"],
            hint: "Identify the tallest and shortest columns, then subtract.",
            barChartDiagram: {
              description: "Column graph of favourite sport: Soccer 12, Netball 9, Basketball 7, Tennis 5.",
              bars: [
                { label: "Soccer", value: 12 },
                { label: "Netball", value: 9 },
                { label: "Basketball", value: 7 },
                { label: "Tennis", value: 5 },
              ],
              valueAxisLabel: "Students",
              categoryAxisLabel: "Sport",
            },
          },
        ),
      ],
      commonMistakes: [
        { mistake: "Writing the total as the mean, such as giving 220 for five café sales instead of 220 ÷ 5.", fix: "Divide the total by the number of values to find the mean." },
        { mistake: "Finding the median of an unordered list such as 24, 18, 22, 20 without sorting first.", fix: "Always order the data first: 18, 20, 22, 24. With an even count, average the two middle values." },
        { mistake: "Writing the highest value as the range, such as giving 9 for absences 6, 4, 9, 7, 8.", fix: "Range = highest − lowest: 9 − 4 = 5." },
        { mistake: "Confusing frequency (column height) with the data value on the axis.", fix: "Frequency is how often a value or category occurs, not the value itself." },
      ],
      masteryQuiz: [
        typedQ(
          "data-display-m1",
          "Seven days of rainfall (mm) are: 4, 1, 12, 3, 8, 6, 9. Find the mean daily rainfall, correct to 1 decimal place.",
          "6.1",
          "Add the seven values: 4 + 1 + 12 + 3 + 8 + 6 + 9 = 43. Divide by 7: 43 ÷ 7 = 6.142… ≈ 6.1 mm.",
          { accepted: ["6.14", "6.143", "6.1 mm"], hint: "Sum all seven values, divide by 7, then round." },
        ),
        typedQ(
          "data-display-m2",
          "The dot plot shows the number of pets owned by each student in a group. Find the median number of pets.",
          "1.5",
          "There are 10 students, so the median is the average of the 5th and 6th values in order. Reading the dots in order, the 5th value is 1 and the 6th is 2, so the median is (1 + 2) ÷ 2 = 1.5 pets.",
          {
            accepted: ["1.5 pets"],
            hint: "Count the dots (n = 10); the median is the average of the 5th and 6th in order.",
            dotPlotDiagram: {
              description: "Dot plot of pets owned: 0 pets (2 students), 1 pet (3 students), 2 pets (4 students), 3 pets (1 student).",
              min: 0,
              max: 4,
              counts: [
                { value: 0, count: 2 },
                { value: 1, count: 3 },
                { value: 2, count: 4 },
                { value: 3, count: 1 },
              ],
              axisLabel: "Number of pets",
            },
          },
        ),
        mcqQ(
          "data-display-m3",
          "A survey records the number of siblings each student has. This data is best described as:",
          "B",
          [
            "Categorical, because it sorts students into groups",
            "Numerical and discrete",
            "Numerical and continuous",
            "Ordinal, because more siblings ranks higher",
          ],
          "A sibling count is a whole-number quantity, so it is numerical and discrete. It is a count, not a label (not categorical); it cannot take in-between values like 2.5 (not continuous); and the numbers are real amounts, not ranked labels (not ordinal).",
        ),
        typedQ(
          "data-display-m4",
          "The column graph shows how many students travel to school by each method. How many students were surveyed in total?",
          "40",
          "Add the frequencies of every category: 14 + 8 + 6 + 9 + 3 = 40 students.",
          {
            accepted: ["40 students"],
            hint: "The total surveyed is the sum of all the column heights.",
            barChartDiagram: {
              description: "Column graph of travel method: Bus 14, Train 8, Car 6, Walk 9, Bike 3.",
              bars: [
                { label: "Bus", value: 14 },
                { label: "Train", value: 8 },
                { label: "Car", value: 6 },
                { label: "Walk", value: 9 },
                { label: "Bike", value: 3 },
              ],
              valueAxisLabel: "Students",
              categoryAxisLabel: "Travel method",
            },
          },
        ),
        typedQ(
          "data-display-m5",
          "The mean of five numbers is 15. Four of them are 12, 14, 16 and 13. Find the fifth number.",
          "20",
          "If the mean of five numbers is 15, their total is 5 × 15 = 75. The four known numbers add to 12 + 14 + 16 + 13 = 55, so the fifth number is 75 − 55 = 20.",
          { accepted: ["20.0"], hint: "Work out the total the five numbers must have, then subtract the four you know." },
        ),
        typedQ(
          "data-display-m6",
          "The column graph shows monthly sales for five months. How many months had sales above the mean?",
          "2",
          "First find the mean: (20 + 35 + 25 + 40 + 30) ÷ 5 = 150 ÷ 5 = 30. The months above 30 are February (35) and April (40), so 2 months are above the mean.",
          {
            accepted: ["2 months"],
            hint: "Find the mean first, then count the columns taller than it.",
            barChartDiagram: {
              description: "Column graph of monthly sales: Jan 20, Feb 35, Mar 25, Apr 40, May 30.",
              bars: [
                { label: "Jan", value: 20 },
                { label: "Feb", value: 35 },
                { label: "Mar", value: 25 },
                { label: "Apr", value: 40 },
                { label: "May", value: 30 },
              ],
              valueAxisLabel: "Sales",
              categoryAxisLabel: "Month",
            },
          },
        ),
        typedQ(
          "data-display-m7",
          "Eight house prices (in $000s) are: 540, 610, 580, 720, 560, 650, 590, 600. Find the median price (in $000s).",
          "595",
          "Order the prices: 540, 560, 580, 590, 600, 610, 650, 720. With eight values the median is the average of the 4th and 5th: (590 + 600) ÷ 2 = 595 (i.e. $595,000).",
          { accepted: ["595000", "595,000", "$595,000", "595 thousand"], hint: "Order all eight values, then average the 4th and 5th." },
        ),
        mcqQ(
          "data-display-m8",
          "A real-estate agent reports the 'typical' house price in a suburb where most homes sell for $600,000 to $800,000, but one mansion sold for $5 million. Which measure best represents a typical price?",
          "A",
          [
            "The median, because it is barely affected by the single very high sale",
            "The mean, because it uses every sale price",
            "The range, because it shows the spread of prices",
            "The mode, because it is always the best average",
          ],
          "The $5 million sale is an outlier that pulls the mean well above what most homes cost. The median depends on the middle value, so it stays inside the typical $600k–$800k range. The range only measures spread, and the mode is not always representative.",
        ),
        typedQ(
          "data-display-m9",
          "Class A has 18 students with a mean test score of 70. Class B has 12 students with a mean score of 80. Find the mean score of all 30 students combined.",
          "74",
          "Find each class total: Class A = 18 × 70 = 1260, Class B = 12 × 80 = 960. The combined total is 2220 over 30 students, so the overall mean is 2220 ÷ 30 = 74. It is not 75 (the simple average of 70 and 80) because Class A has more students.",
          { accepted: ["74.0", "74 marks"], hint: "Use each class's total marks (mean × size), not the average of the two means." },
        ),
        typedQ(
          "data-display-m10",
          "Six numbers have a mean of 9. A seventh number is added and the new mean becomes 10. Find the seventh number.",
          "16",
          "The original total is 6 × 9 = 54. After adding the seventh number the total must be 7 × 10 = 70, so the seventh number is 70 − 54 = 16. It is larger than 10 because it has to pull the mean up.",
          { accepted: ["16.0"], hint: "Compare the total before (6 × 9) with the total after (7 × 10)." },
        ),
      ],
    };
  }

  if (lesson.slug === "interpreting-data-outliers") {
    return {
      ...base,
      description:
        "Interpret practical data, identify outliers, and choose cautious conclusions using mean or median.",
      learningIntention:
        "Interpret data sets with outliers and choose suitable summary statistics for practical conclusions.",
      successCriteria: [
        "Identify an outlier as a value clearly separated from the main cluster of data.",
        "Describe and quantify how an outlier pulls the mean while the median stays resistant.",
        "Choose the median rather than the mean for skewed data or data with an outlier.",
        "Make cautious, data-based conclusions and avoid overclaiming.",
      ],
      teaching: {
        paragraphs: [
          "An outlier is a value that sits noticeably far from the rest of the data. On a dot plot it shows up as an isolated dot, away from the main cluster.",
          "An outlier pulls the mean toward itself, because every value feeds into the total. The median is resistant: it depends only on the middle position, not on how extreme a value is, so a single far-out value barely moves it.",
          "When a high outlier is present the data is positively skewed and the mean ends up above the median. In that case the median is the better description of a typical value.",
          "Conclusions from data should be cautious. A small data set or an unusual value may not represent every situation, so match the conclusion to what the data actually shows.",
        ],
        latexBlocks: [
          "\\text{outlier}=\\text{value far from the main cluster}",
          "\\text{high outlier} \\Rightarrow \\text{mean} > \\text{median}",
        ],
      },
      guidedPractice: [
        mcqQ(
          "data-outlier-g1",
          "Which statement best describes an outlier in a data set?",
          "B",
          [
            "The largest value in the data set",
            "A value that sits noticeably far from the rest of the data",
            "The value that occurs most often",
            "The middle value once the data is ordered",
          ],
          "An outlier is set apart from the main cluster — it is not simply the largest value (an ordinary data set's maximum need not be an outlier), nor the mode (most common) or median (middle).",
        ),
        typedQ(
          "data-outlier-g2",
          "The dot plot shows delivery times (in minutes). Which value is the outlier?",
          "38",
          "Most deliveries cluster between 18 and 22 minutes. The value 38 sits far above that cluster on its own, so it is the outlier.",
          {
            accepted: ["38 min", "38 minutes"],
            hint: "Look for the isolated dot, separated from the main group.",
            dotPlotDiagram: {
              description: "Dot plot of delivery times: 18 (1), 19 (1), 20 (2), 21 (1), 22 (1), and an isolated value at 38.",
              min: 15,
              max: 40,
              counts: [
                { value: 18, count: 1 },
                { value: 19, count: 1 },
                { value: 20, count: 2 },
                { value: 21, count: 1 },
                { value: 22, count: 1 },
                { value: 38, count: 1 },
              ],
              axisLabel: "Delivery time (min)",
            },
          },
        ),
        typedQ(
          "data-outlier-g3",
          "Customer wait times (in minutes) are: 3, 4, 4, 5, 6, 19. Find the median wait time.",
          "4.5",
          "Order the data: 3, 4, 4, 5, 6, 19. With six values the median is the average of the 3rd and 4th: (4 + 5) ÷ 2 = 4.5 minutes. Notice the outlier 19 does not change the median.",
          { accepted: ["4.5 min", "4.5 minutes"], hint: "Order the six values, then average the two in the middle." },
        ),
        mcqQ(
          "data-outlier-g4",
          "Which measure of centre is most affected by a single outlier?",
          "A",
          ["The mean", "The median", "The mode", "All are affected equally"],
          "The mean uses every value in its total, so one extreme value drags it toward the outlier. The median (position-based) and mode (most frequent) barely change.",
        ),
      ],
      independentPractice: [
        typedQ(
          "data-outlier-i1",
          "The dot plot shows midday temperatures (°C) over a week. Which value is the outlier?",
          "9",
          "Most temperatures cluster between 19 and 23 °C. The value 9 sits far below that cluster on its own, so it is the (low) outlier.",
          {
            accepted: ["9 degrees", "9°C", "9 C"],
            hint: "An outlier can be unusually low as well as unusually high — find the isolated dot.",
            dotPlotDiagram: {
              description: "Dot plot of midday temperatures: an isolated value at 9, then 19 (1), 20 (1), 21 (2), 22 (1), 23 (1).",
              min: 5,
              max: 25,
              counts: [
                { value: 9, count: 1 },
                { value: 19, count: 1 },
                { value: 20, count: 1 },
                { value: 21, count: 2 },
                { value: 22, count: 1 },
                { value: 23, count: 1 },
              ],
              axisLabel: "Temperature (°C)",
            },
          },
        ),
        typedQ(
          "data-outlier-i2",
          "Seven delivery times (in minutes) are: 18, 20, 21, 22, 23, 24, 47. Find the mean delivery time, correct to 1 decimal place.",
          "25",
          "Add the values: 18 + 20 + 21 + 22 + 23 + 24 + 47 = 175. Divide by 7: 175 ÷ 7 = 25.0 minutes. The outlier 47 pulls the mean up to 25, even though six of the seven deliveries took 24 minutes or less.",
          { accepted: ["25.0", "25 min", "25 minutes"], hint: "Add all seven times and divide by 7; notice how the outlier lifts the result." },
        ),
        typedQ(
          "data-outlier-i3",
          "In a suburb, the mean house price is $890,000 but the median is $640,000, because of a few very expensive homes. How much higher is the mean than the median, in dollars?",
          "250000",
          "The gap between the mean and median measures the pull of the expensive homes: $890,000 − $640,000 = $250,000. The mean is higher because those few high prices inflate the average.",
          { accepted: ["$250,000", "250,000", "$250000"], hint: "Subtract the median from the mean." },
        ),
        typedQ(
          "data-outlier-i4",
          "Eight waiting times (in minutes) are: 4, 5, 5, 6, 7, 8, 9, 32. Find the median waiting time.",
          "6.5",
          "Order (already ordered): 4, 5, 5, 6, 7, 8, 9, 32. With eight values the median is the average of the 4th and 5th: (6 + 7) ÷ 2 = 6.5 minutes. The outlier 32 has no effect on the median.",
          { accepted: ["6.5 min", "6.5 minutes"], hint: "With eight values, average the 4th and 5th once ordered." },
        ),
        mcqQ(
          "data-outlier-i5",
          "A survey of 12 people found most spend 1–2 hours a day on homework, but one reported 9 hours. Which conclusion is cautious and data-based?",
          "C",
          [
            "Everyone spends about 9 hours on homework",
            "All students in the school spend 1–2 hours on homework",
            "Most of those surveyed spent 1–2 hours, with one unusually high response",
            "The survey proves homework takes too long",
          ],
          "Option C reports the cluster and flags the outlier without overclaiming. The others either generalise from one value, extend a sample of 12 to the whole school, or make a value judgement the data does not support.",
        ),
      ],
      commonMistakes: [
        { mistake: "Calling the largest value an outlier without checking how far it sits from the rest.", fix: "An outlier is clearly separated from the main cluster — an ordinary maximum that is close to the other values is not an outlier." },
        { mistake: "Using the mean as the typical value when a high outlier is present.", fix: "A high outlier pulls the mean above the cluster (mean > median). Report the median as the typical value instead." },
        { mistake: "Generalising from one unusual value, e.g. concluding everyone is slow because one delivery took 47 minutes.", fix: "Match the conclusion to the data: most deliveries were 18–24 minutes, with one unusually long time." },
        { mistake: "Giving the range as a typical value.", fix: "Range measures spread (highest − lowest); it does not describe a typical value." },
      ],
      masteryQuiz: [
        typedQ(
          "data-outlier-m1",
          "The dot plot shows points scored by a player across the season. Which value is the outlier?",
          "30",
          "The scores cluster between 8 and 11. The value 30 sits far above the rest on its own, so it is the outlier.",
          {
            accepted: ["30 points"],
            hint: "Find the isolated dot well away from the cluster.",
            dotPlotDiagram: {
              description: "Dot plot of points scored: 8 (1), 9 (1), 10 (2), 11 (1), and an isolated value at 30.",
              min: 5,
              max: 32,
              counts: [
                { value: 8, count: 1 },
                { value: 9, count: 1 },
                { value: 10, count: 2 },
                { value: 11, count: 1 },
                { value: 30, count: 1 },
              ],
              axisLabel: "Points per game",
            },
          },
        ),
        mcqQ(
          "data-outlier-m2",
          "A high outlier is added to a data set. What happens to the mean and the median?",
          "A",
          [
            "The mean increases noticeably; the median changes little",
            "The mean changes little; the median increases noticeably",
            "Both increase by the same amount",
            "Neither changes",
          ],
          "Every value feeds the mean, so a high outlier lifts it; the median depends only on the middle position, so it barely moves. This is exactly why mean > median for positively skewed data.",
        ),
        typedQ(
          "data-outlier-m3",
          "Six daily sales totals are: 6, 7, 8, 9, 10, 40. Find the mean, correct to 1 decimal place.",
          "13.3",
          "Add the values: 6 + 7 + 8 + 9 + 10 + 40 = 80. Divide by 6: 80 ÷ 6 = 13.33… ≈ 13.3. The outlier 40 lifts the mean well above the cluster of 6–10.",
          { accepted: ["13.33", "13.333"], hint: "Add all six values and divide by 6, then round." },
        ),
        typedQ(
          "data-outlier-m4",
          "A data set is 5, 6, 7, 8, 40. Find the mean after removing the outlier.",
          "6.5",
          "Remove the outlier 40, leaving 5, 6, 7, 8. Their mean is (5 + 6 + 7 + 8) ÷ 4 = 26 ÷ 4 = 6.5. (With the outlier the mean would be 13.2, more than double.)",
          { accepted: ["6.50"], hint: "Drop the far-out value first, then average the four that remain." },
        ),
        typedQ(
          "data-outlier-m5",
          "A town's monthly salaries (in $000s) are 52, 55, 58, 60, 62, 65, 68 and 500, where 500 is a company owner. Find the median salary (in $000s) — the better description of a typical worker than the mean.",
          "61",
          "Order (already ordered): 52, 55, 58, 60, 62, 65, 68, 500. With eight values the median is the average of the 4th and 5th: (60 + 62) ÷ 2 = 61 (i.e. $61,000). The mean would be inflated by the $500,000 owner, so the median is the fairer typical value.",
          { accepted: ["61000", "61,000", "$61,000", "61 thousand"], hint: "Order the eight values and average the 4th and 5th; ignore how extreme the 500 is." },
        ),
        typedQ(
          "data-outlier-m6",
          "The dot plot shows waiting times (in minutes). Find the median waiting time.",
          "6.5",
          "There are 8 values: 4, 5, 5, 6, 7, 8, 9, 30. The median is the average of the 4th and 5th: (6 + 7) ÷ 2 = 6.5 minutes. The outlier 30 does not affect it.",
          {
            accepted: ["6.5 min", "6.5 minutes"],
            hint: "Count the dots (n = 8) and average the 4th and 5th in order.",
            dotPlotDiagram: {
              description: "Dot plot of waiting times: 4 (1), 5 (2), 6 (1), 7 (1), 8 (1), 9 (1), and an isolated value at 30.",
              min: 0,
              max: 32,
              counts: [
                { value: 4, count: 1 },
                { value: 5, count: 2 },
                { value: 6, count: 1 },
                { value: 7, count: 1 },
                { value: 8, count: 1 },
                { value: 9, count: 1 },
                { value: 30, count: 1 },
              ],
              axisLabel: "Waiting time (min)",
            },
          },
        ),
        typedQ(
          "data-outlier-m7",
          "Six values have a mean of 20. One value, an outlier of 50, is removed. Find the mean of the remaining five values.",
          "14",
          "The total of the six values is 6 × 20 = 120. Removing the outlier 50 leaves a total of 120 − 50 = 70 over five values, so the new mean is 70 ÷ 5 = 14.",
          { accepted: ["14.0"], hint: "Find the original total (6 × 20), subtract the outlier, then divide by 5." },
        ),
        mcqQ(
          "data-outlier-m8",
          "A class of 12 students is surveyed about screen time. Most report 1–3 hours, but one reports 14 hours. Which is the most appropriate way to report a typical value?",
          "B",
          [
            "The mean, because it uses all 12 values",
            "The median, because the 14-hour response is an outlier that inflates the mean",
            "The maximum, because it shows the worst case",
            "The range, because it shows the spread",
          ],
          "The 14-hour response is an outlier that pulls the mean above the cluster, so the median better represents a typical student. The maximum and range describe extremes and spread, not a typical value.",
        ),
        typedQ(
          "data-outlier-m9",
          "Eight house prices have a mean of $700,000. The most expensive home, at $1.4 million, is removed. Find the new mean of the remaining seven prices, in $000s.",
          "600",
          "The total of the eight prices is 8 × 700 = 5600 (in $000s). Removing 1400 leaves 5600 − 1400 = 4200 over seven prices, so the new mean is 4200 ÷ 7 = 600 (i.e. $600,000).",
          { accepted: ["600000", "600,000", "$600,000", "600 thousand"], hint: "Work in $000s: total is 8 × 700; subtract 1400, then divide by 7." },
        ),
        mcqQ(
          "data-outlier-m10",
          "For a data set, the mean is clearly greater than the median. What does this most likely indicate?",
          "A",
          [
            "The data is positively skewed, probably with one or more high outliers",
            "The data is negatively skewed, with low outliers",
            "The data is perfectly symmetric",
            "An arithmetic error must have been made",
          ],
          "High values pull the mean up while leaving the median in place, so mean > median signals a positive skew (a tail of high values or outliers). A symmetric set would have mean ≈ median.",
        ),
      ],
    };
  }

  if (lesson.slug === "grouped-data-frequency-tables") {
    return {
      ...base,
      description:
        "Read grouped frequency tables, identify the modal class, and estimate the mean using class midpoints.",
      learningIntention:
        "Summarise grouped data by identifying the modal class and estimating the mean from a grouped frequency table.",
      successCriteria: [
        "Read a frequency histogram and identify the modal class as the class with the highest frequency.",
        "Find the midpoint of a class interval.",
        "Estimate the mean as Σ(f × m) ÷ Σf using class midpoints.",
        "Reason about grouped data — missing frequencies and what changes the modal class.",
      ],
      teaching: {
        paragraphs: [
          "When data are grouped into class intervals such as 10–19 or 20–29, we cannot see exact values — only how many fall in each class. This is a grouped frequency table.",
          "The modal class is the class interval with the highest frequency. It is the most common class, but it is not a single value like an ordinary mode.",
          "To estimate the mean, assume every value in a class equals the midpoint of that class. The midpoint of 10–19 is (10 + 19) ÷ 2 = 14.5. Multiply each midpoint by its class frequency, add those products to get Σ(f × m), then divide by the total frequency Σf. This is an estimate, because the exact values within each class are unknown.",
          "Grouped continuous data is displayed as a histogram: adjacent bars with no gaps, whose heights are the class frequencies. Joining the top-midpoint of each bar with straight line segments gives a frequency polygon. The tallest bar of the histogram is the modal class.",
        ],
        latexBlocks: [
          "\\text{midpoint} = \\frac{\\text{lower boundary} + \\text{upper boundary}}{2}",
          "\\text{estimated mean} = \\frac{\\sum f \\times m}{\\sum f}",
        ],
      },
      guidedPractice: [
        mcqQ(
          "data-group-g1",
          "In a grouped frequency table, a class interval written '20–29' means:",
          "B",
          ["Only the value 20 is included", "Values from 20 up to and including 29", "Only the value 29 is included", "Values less than 20"],
          "A class interval covers every value between and including both boundaries, so '20–29' holds all values from 20 to 29.",
        ),
        typedQ(
          "data-group-g2",
          "The histogram shows test scores grouped into classes. Which class is the modal class?",
          "20–29",
          "The modal class is the tallest bar. The 20–29 bar has the highest frequency (8), more than any other class, so 20–29 is the modal class.",
          {
            accepted: ["20-29", "20 to 29", "the 20–29 class"],
            hint: "The modal class is simply the tallest bar of the histogram.",
            histogramDiagram: {
              description: "Histogram of test scores: 0–9 has frequency 2, 10–19 has 5, 20–29 has 8, 30–39 has 5.",
              bins: [
                { label: "0–9", frequency: 2 },
                { label: "10–19", frequency: 5 },
                { label: "20–29", frequency: 8 },
                { label: "30–39", frequency: 5 },
              ],
              axisLabel: "Score",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
        typedQ(
          "data-group-g3",
          "Find the midpoint of the class interval 30–39.",
          "34.5",
          "Midpoint = (lower + upper) ÷ 2 = (30 + 39) ÷ 2 = 69 ÷ 2 = 34.5.",
          { accepted: ["34.50"], hint: "Average the two boundaries of the class." },
        ),
        typedQ(
          "data-group-g4",
          "The histogram shows the number of emails staff received in a day, grouped into classes. How many staff were surveyed in total?",
          "25",
          "Add the frequencies of every class (the bar heights): 4 + 12 + 9 = 25 staff.",
          {
            accepted: ["25 staff", "25 values"],
            hint: "The total is the sum of all the bar heights.",
            histogramDiagram: {
              description: "Histogram of emails received: 0–4 has frequency 4, 5–9 has 12, 10–14 has 9.",
              bins: [
                { label: "0–4", frequency: 4 },
                { label: "5–9", frequency: 12 },
                { label: "10–14", frequency: 9 },
              ],
              axisLabel: "Emails received",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
      ],
      independentPractice: [
        typedQ(
          "data-group-i1",
          "The histogram shows test scores. Estimate the mean score using class midpoints.",
          "22.5",
          "Midpoints are 4.5, 14.5, 24.5, 34.5. Σ(f × m) = 2×4.5 + 5×14.5 + 8×24.5 + 5×34.5 = 9 + 72.5 + 196 + 172.5 = 450. Total frequency Σf = 20, so the estimated mean = 450 ÷ 20 = 22.5.",
          {
            accepted: ["22.50"],
            hint: "Multiply each midpoint by its frequency, add the products, then divide by the total frequency.",
            histogramDiagram: {
              description: "Histogram of test scores: 0–9 has frequency 2, 10–19 has 5, 20–29 has 8, 30–39 has 5.",
              bins: [
                { label: "0–9", frequency: 2 },
                { label: "10–19", frequency: 5 },
                { label: "20–29", frequency: 8 },
                { label: "30–39", frequency: 5 },
              ],
              axisLabel: "Score",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
        typedQ(
          "data-group-i2",
          "The histogram shows ages of people at a workshop, grouped into classes. Which is the modal class?",
          "30–39",
          "The tallest bar is the 30–39 class with frequency 12, the highest of all the classes, so 30–39 is the modal class.",
          {
            accepted: ["30-39", "30 to 39", "the 30–39 class"],
            hint: "Read off the tallest bar.",
            histogramDiagram: {
              description: "Histogram of ages: 10–19 has frequency 4, 20–29 has 8, 30–39 has 12, 40–49 has 6.",
              bins: [
                { label: "10–19", frequency: 4 },
                { label: "20–29", frequency: 8 },
                { label: "30–39", frequency: 12 },
                { label: "40–49", frequency: 6 },
              ],
              axisLabel: "Age (years)",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
        typedQ(
          "data-group-i3",
          "Find the midpoint of the class interval 45–54.",
          "49.5",
          "Midpoint = (lower + upper) ÷ 2 = (45 + 54) ÷ 2 = 99 ÷ 2 = 49.5.",
          { accepted: ["49.50"], hint: "Average the two boundaries." },
        ),
        mcqQ(
          "data-group-i4",
          "A frequency polygon for grouped data is drawn by:",
          "A",
          [
            "Plotting each class midpoint against its frequency and joining the points with straight lines",
            "Drawing one bar per class with gaps between them",
            "Plotting individual raw data values against time",
            "Drawing a pie sector for each class",
          ],
          "A frequency polygon joins the (midpoint, frequency) points with straight segments. Bars with gaps describe a bar chart of categories, raw-value-versus-time is a time series, and pie sectors show proportions of a whole.",
        ),
        typedQ(
          "data-group-i5",
          "The histogram shows how long (in minutes) customers waited. Estimate the mean waiting time using class midpoints.",
          "9",
          "Midpoints are 2, 7, 12, 17. Σ(f × m) = 4×2 + 6×7 + 8×12 + 2×17 = 8 + 42 + 96 + 34 = 180. Total frequency Σf = 20, so the estimated mean = 180 ÷ 20 = 9.0 minutes.",
          {
            accepted: ["9.0", "9 min", "9 minutes"],
            hint: "Use the midpoint of each class (2, 7, 12, 17), weight by frequency, and divide by the total.",
            histogramDiagram: {
              description: "Histogram of waiting times: 0–4 has frequency 4, 5–9 has 6, 10–14 has 8, 15–19 has 2.",
              bins: [
                { label: "0–4", frequency: 4 },
                { label: "5–9", frequency: 6 },
                { label: "10–14", frequency: 8 },
                { label: "15–19", frequency: 2 },
              ],
              axisLabel: "Waiting time (min)",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
      ],
      commonMistakes: [
        { mistake: "Choosing the class with the largest midpoint (e.g. 30–39) as the modal class instead of the one with the highest frequency.", fix: "The modal class is the tallest bar — read the frequency, not the interval boundaries." },
        { mistake: "Stopping at Σ(f × m) and reporting it as the mean.", fix: "Estimated mean = Σ(f × m) ÷ Σf. Always divide the sum of products by the total frequency." },
        { mistake: "Using a class boundary (e.g. 10 or 19) instead of the midpoint (14.5).", fix: "Midpoint = (lower + upper) ÷ 2. For 10–19 that is (10 + 19) ÷ 2 = 14.5." },
        { mistake: "Multiplying the frequency by the frequency, or the midpoint by the midpoint.", fix: "Each product is f × m (frequency × midpoint), one per class, then summed." },
      ],
      masteryQuiz: [
        typedQ(
          "data-group-m1",
          "The histogram shows daily rainfall (mm) grouped into classes. Which is the modal class?",
          "20–29",
          "The 20–29 bar is the tallest, with frequency 8 — higher than any other class — so it is the modal class.",
          {
            accepted: ["20-29", "20 to 29", "the 20–29 class"],
            hint: "Identify the tallest bar.",
            histogramDiagram: {
              description: "Histogram of daily rainfall: 0–9 has frequency 3, 10–19 has 7, 20–29 has 8, 30–39 has 2.",
              bins: [
                { label: "0–9", frequency: 3 },
                { label: "10–19", frequency: 7 },
                { label: "20–29", frequency: 8 },
                { label: "30–39", frequency: 2 },
              ],
              axisLabel: "Rainfall (mm)",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
        typedQ(
          "data-group-m2",
          "Find the midpoint of the class interval 60–69.",
          "64.5",
          "Midpoint = (60 + 69) ÷ 2 = 129 ÷ 2 = 64.5.",
          { accepted: ["64.50"], hint: "Average the boundaries of the class." },
        ),
        typedQ(
          "data-group-m3",
          "A grouped frequency table has classes with frequencies 5, 9, 14, 7 and 5. How many data values are there in total?",
          "40",
          "Add all the class frequencies: 5 + 9 + 14 + 7 + 5 = 40 data values.",
          { accepted: ["40 values"], hint: "The total is the sum of every class frequency." },
        ),
        typedQ(
          "data-group-m4",
          "For a class interval 30–39 with frequency 12, find the product f × m (use the midpoint).",
          "414",
          "The midpoint of 30–39 is (30 + 39) ÷ 2 = 34.5. Then f × m = 12 × 34.5 = 414.",
          { accepted: ["414.0"], hint: "Find the midpoint first, then multiply by the frequency." },
        ),
        typedQ(
          "data-group-m5",
          "The histogram shows daily rainfall (mm). Estimate the mean rainfall using class midpoints, correct to 1 decimal place.",
          "19",
          "Midpoints are 4.5, 14.5, 24.5, 34.5. Σ(f × m) = 3×4.5 + 7×14.5 + 8×24.5 + 2×34.5 = 13.5 + 101.5 + 196 + 69 = 380. Σf = 20, so the estimated mean = 380 ÷ 20 = 19.0 mm.",
          {
            accepted: ["19.0", "19 mm"],
            hint: "Weight each midpoint by its frequency, sum, then divide by the total frequency.",
            histogramDiagram: {
              description: "Histogram of daily rainfall: 0–9 has frequency 3, 10–19 has 7, 20–29 has 8, 30–39 has 2.",
              bins: [
                { label: "0–9", frequency: 3 },
                { label: "10–19", frequency: 7 },
                { label: "20–29", frequency: 8 },
                { label: "30–39", frequency: 2 },
              ],
              axisLabel: "Rainfall (mm)",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
        mcqQ(
          "data-group-m6",
          "Why do we use class midpoints to estimate the mean of grouped data?",
          "B",
          [
            "Because every value in a class equals the lower boundary",
            "Because the midpoint is the best single estimate for the values in a class when the exact values are unknown",
            "Because the class total always equals the midpoint",
            "Because grouped data has no variability",
          ],
          "We cannot see the exact values inside a class, so the midpoint is the most balanced single estimate for them. The other options misuse the boundary, confuse a total with a midpoint, or wrongly assume no spread.",
        ),
        typedQ(
          "data-group-m7",
          "The histogram shows times (in minutes). Estimate the mean using midpoints, correct to 1 decimal place.",
          "12.7",
          "Midpoints are 7, 12, 17. Σ(f × m) = 3×7 + 7×12 + 5×17 = 21 + 84 + 85 = 190. Σf = 15, so the estimated mean = 190 ÷ 15 = 12.67 ≈ 12.7 minutes.",
          {
            accepted: ["12.67", "12.7 min"],
            hint: "Sum f × m over the three classes, then divide by 15.",
            histogramDiagram: {
              description: "Histogram of times: 5–9 has frequency 3, 10–14 has 7, 15–19 has 5.",
              bins: [
                { label: "5–9", frequency: 3 },
                { label: "10–14", frequency: 7 },
                { label: "15–19", frequency: 5 },
              ],
              axisLabel: "Time (min)",
              frequencyAxisLabel: "Frequency",
            },
          },
        ),
        typedQ(
          "data-group-m8",
          "A grouped data set has three classes with midpoints 5, 15 and 25 and frequencies 4, f and 6. The estimated mean is 16. Find the missing frequency f.",
          "10",
          "Σ(f × m) = 4×5 + 15f + 6×25 = 20 + 15f + 150 = 170 + 15f, and Σf = 4 + f + 6 = 10 + f. Setting (170 + 15f) ÷ (10 + f) = 16 gives 170 + 15f = 160 + 16f, so f = 10.",
          { accepted: ["f=10", "10.0"], hint: "Write Σ(f × m) ÷ Σf = 16 with f as the unknown, then solve the equation." },
        ),
        mcqQ(
          "data-group-m9",
          "Two students disagree about a grouped table. Which statement is correct?",
          "B",
          [
            "The modal class is the class with the largest midpoint",
            "The modal class is the class with the highest frequency, which may not be the class with the largest values",
            "The estimated mean must equal one of the class midpoints",
            "The modal class is always the middle class of the table",
          ],
          "The modal class is defined by frequency (the tallest bar), independent of where its values sit. The estimated mean is a weighted average and need not equal any midpoint, and the middle class has no special status.",
        ),
        typedQ(
          "data-group-m10",
          "In a grouped table the modal class 20–29 has frequency 8, and the 30–39 class has frequency 5. By how much must the 30–39 frequency increase so that 30–39 becomes the new modal class?",
          "4",
          "To be the modal class, 30–39 must have a strictly higher frequency than 8, so it needs at least 9. From 5 that is an increase of 9 − 5 = 4.",
          { accepted: ["4 more", "by 4"], hint: "The new frequency must exceed 8. Find the smallest whole number above 8, then subtract the current 5." },
        ),
      ],
    };
  }

  if (lesson.slug === "box-plots-five-number-summary") {
    return {
      ...base,
      description:
        "Find Q1, median, Q3, IQR and fences, identify outliers by the IQR rule, and compare two distributions using box plots.",
      learningIntention:
        "Construct and interpret a five-number summary and use IQR to identify outliers and compare distributions.",
      successCriteria: [
        "Read a five-number summary from a box plot and find it from ordered data.",
        "Calculate IQR = Q3 − Q1 from a plot or from quartiles.",
        "Calculate lower and upper fences and decide whether a value is an outlier (1.5 × IQR rule).",
        "Compare two distributions from parallel box plots using medians and IQR.",
      ],
      teaching: {
        paragraphs: [
          "The five-number summary — minimum, Q1, median (Q2), Q3, and maximum — describes both the centre and spread of a dataset. A box plot displays all five values visually.",
          "Q1 is the median of the lower half of data, and Q3 is the median of the upper half. The IQR (interquartile range) = Q3 − Q1 measures the spread of the middle 50% of values, making it resistant to outliers.",
          "The IQR rule identifies outliers: a value is an outlier if it lies more than 1.5 × IQR below Q1 or above Q3. The fences are: lower fence = Q1 − 1.5 × IQR; upper fence = Q3 + 1.5 × IQR.",
          "When comparing two box plots, compare medians for typical values and IQR for spread. A higher median means the group typically scored higher; a larger IQR means more variability in the middle half of the data.",
        ],
        latexBlocks: [
          "\\text{IQR} = Q_3 - Q_1",
          "\\text{Lower fence} = Q_1 - 1.5 \\times \\text{IQR}",
          "\\text{Upper fence} = Q_3 + 1.5 \\times \\text{IQR}",
        ],
      },
      guidedPractice: [
        mcqQ(
          "data-box-g1",
          "Which five values make up the five-number summary?",
          "B",
          ["Mean, mode, range, max, min", "Minimum, Q1, median, Q3, maximum", "Min, mean, mode, Q3, max", "Mean, Q1, Q2, Q3, range"],
          "The five-number summary is the minimum, lower quartile Q1, median (Q2), upper quartile Q3, and maximum — the five marks shown on a box plot.",
        ),
        typedQ(
          "data-box-g2",
          "The box plot shows reaction times (in milliseconds). Read off the median.",
          "15",
          "The median is the line inside the box. On this plot it sits at 15 milliseconds.",
          {
            accepted: ["15.0", "15 ms"],
            hint: "The median is the vertical line dividing the box, not an edge.",
            boxPlotDiagram: {
              description: "Box plot of reaction times with minimum 4, Q1 10, median 15, Q3 22, maximum 30.",
              plots: [{ label: "Reaction time", min: 4, q1: 10, median: 15, q3: 22, max: 30 }],
              axisLabel: "Reaction time (ms)",
              xMin: 0,
              xMax: 35,
              showValueLabels: true,
            },
          },
        ),
        typedQ(
          "data-box-g3",
          "The box plot shows reaction times (in milliseconds). Find the interquartile range (IQR).",
          "12",
          "IQR = Q3 − Q1. From the plot Q3 = 22 and Q1 = 10, so IQR = 22 − 10 = 12 milliseconds.",
          {
            accepted: ["12.0", "12 ms"],
            hint: "Read Q1 (left edge of the box) and Q3 (right edge), then subtract.",
            boxPlotDiagram: {
              description: "Box plot of reaction times with minimum 4, Q1 10, median 15, Q3 22, maximum 30.",
              plots: [{ label: "Reaction time", min: 4, q1: 10, median: 15, q3: 22, max: 30 }],
              axisLabel: "Reaction time (ms)",
              xMin: 0,
              xMax: 35,
              showValueLabels: true,
            },
          },
        ),
        typedQ(
          "data-box-g4",
          "Ordered data: 3, 7, 8, 10, 12, 14, 15, 18, 20, 25 (n = 10). Find the median.",
          "13",
          "With 10 values the median is the average of the 5th and 6th: (12 + 14) ÷ 2 = 13.",
          { accepted: ["13.0"], hint: "For 10 values, average the 5th and 6th once ordered." },
        ),
      ],
      independentPractice: [
        typedQ(
          "data-box-i1",
          "Ordered data: 5, 9, 11, 13, 15, 17, 19, 22 (n = 8). Find the lower quartile Q1.",
          "10",
          "Q1 is the median of the lower half {5, 9, 11, 13}. With four values that is (9 + 11) ÷ 2 = 10.",
          { accepted: ["10.0"], hint: "Take the lower four values and find their median." },
        ),
        typedQ(
          "data-box-i2",
          "Ordered data: 5, 9, 11, 13, 15, 17, 19, 22 (n = 8). Find the upper quartile Q3.",
          "18",
          "Q3 is the median of the upper half {15, 17, 19, 22}. With four values that is (17 + 19) ÷ 2 = 18.",
          { accepted: ["18.0"], hint: "Take the upper four values and find their median." },
        ),
        typedQ(
          "data-box-i3",
          "The box plot shows daily download sizes (in MB). Find the interquartile range.",
          "16",
          "IQR = Q3 − Q1. From the plot Q3 = 41 and Q1 = 25, so IQR = 41 − 25 = 16 MB.",
          {
            accepted: ["16.0", "16 MB"],
            hint: "Subtract the left edge of the box from the right edge.",
            boxPlotDiagram: {
              description: "Box plot of download sizes with minimum 12, Q1 25, median 33, Q3 41, maximum 60.",
              plots: [{ label: "Download size", min: 12, q1: 25, median: 33, q3: 41, max: 60 }],
              axisLabel: "Download size (MB)",
              xMin: 0,
              xMax: 65,
              showValueLabels: true,
            },
          },
        ),
        typedQ(
          "data-box-i4",
          "A data set has Q1 = 12 and an IQR of 8. Find the lower fence (Q1 − 1.5 × IQR).",
          "0",
          "Lower fence = Q1 − 1.5 × IQR = 12 − 1.5 × 8 = 12 − 12 = 0.",
          { accepted: ["0.0"], hint: "Multiply the IQR by 1.5, then subtract from Q1." },
        ),
        mcqQ(
          "data-box-i5",
          "The parallel box plots compare exam marks for two classes. Which statement is best supported?",
          "B",
          [
            "Class A typically scored higher than Class B",
            "Class B typically scored higher, since its median is further to the right",
            "Both classes have identical medians",
            "Class A has the larger spread in the middle 50%",
          ],
          "Class B's median sits to the right of Class A's, so Class B's typical mark is higher. (Class B also has a smaller box, meaning less spread in its middle 50%.)",
          {
            boxPlotDiagram: {
              description: "Parallel box plots. Class A: min 30, Q1 45, median 55, Q3 65, max 80. Class B: min 40, Q1 60, median 70, Q3 78, max 90.",
              plots: [
                { label: "Class A", min: 30, q1: 45, median: 55, q3: 65, max: 80 },
                { label: "Class B", min: 40, q1: 60, median: 70, q3: 78, max: 90 },
              ],
              axisLabel: "Exam mark",
              xMin: 20,
              xMax: 100,
              showValueLabels: true,
            },
          },
        ),
      ],
      commonMistakes: [
        { mistake: "Splitting the data into halves incorrectly for Q1 and Q3 when n is even.", fix: "For 8 values, the lower half is the first 4 and the upper half is the last 4. Q1 and Q3 are the medians of those halves." },
        { mistake: "Applying the 1.5 × IQR rule to every value instead of only the extremes.", fix: "Only values below the lower fence or above the upper fence are outliers. Check the smallest and largest values against the fences." },
        { mistake: "Subtracting IQR from Q3 or adding it to Q1 when finding fences.", fix: "Lower fence = Q1 − 1.5 × IQR (subtract from Q1). Upper fence = Q3 + 1.5 × IQR (add to Q3)." },
        { mistake: "Claiming a larger IQR means a higher median.", fix: "IQR measures spread of the middle 50%, not the centre. Compare medians for typical values and IQR for variability." },
      ],
      masteryQuiz: [
        typedQ(
          "data-box-m1",
          "The box plot shows masses (in grams) of a sample of apples. Read off the median mass.",
          "24",
          "The median is the line inside the box. On this plot it sits at 24 grams.",
          {
            accepted: ["24.0", "24 g"],
            hint: "Find the line that divides the box, not an edge or whisker end.",
            boxPlotDiagram: {
              description: "Box plot of apple masses with minimum 8, Q1 18, median 24, Q3 33, maximum 45.",
              plots: [{ label: "Apple mass", min: 8, q1: 18, median: 24, q3: 33, max: 45 }],
              axisLabel: "Mass (g)",
              xMin: 0,
              xMax: 50,
              showValueLabels: true,
            },
          },
        ),
        typedQ(
          "data-box-m2",
          "Ordered data: 5, 9, 11, 13, 15, 17, 19, 22 (n = 8). Find the median.",
          "14",
          "With 8 values the median is the average of the 4th and 5th: (13 + 15) ÷ 2 = 14.",
          { accepted: ["14.0"], hint: "Average the 4th and 5th values." },
        ),
        typedQ(
          "data-box-m3",
          "A data set has Q1 = 23 and Q3 = 41. Find the interquartile range.",
          "18",
          "IQR = Q3 − Q1 = 41 − 23 = 18.",
          { accepted: ["18.0"], hint: "Subtract Q1 from Q3." },
        ),
        typedQ(
          "data-box-m4",
          "A data set has Q1 = 20 and Q3 = 40. Find the upper fence (Q3 + 1.5 × IQR).",
          "70",
          "IQR = 40 − 20 = 20. Upper fence = Q3 + 1.5 × IQR = 40 + 1.5 × 20 = 40 + 30 = 70. (A value such as 75 would lie above this fence and so be an outlier.)",
          { accepted: ["70.0"], hint: "Find the IQR first, multiply by 1.5, then add to Q3." },
        ),
        mcqQ(
          "data-box-m5",
          "The interquartile range (IQR) measures:",
          "B",
          [
            "The range of all data values",
            "The spread of the middle 50% of the data",
            "The mean of Q1 and Q3",
            "The distance from the minimum to the median",
          ],
          "IQR = Q3 − Q1 spans the central half of the data, so it describes the spread of the middle 50%. Because it ignores the extremes, it is resistant to outliers.",
        ),
        typedQ(
          "data-box-m6",
          "The box plot shows finishing times (in minutes); the dot marks an outlier. Find the interquartile range of the data.",
          "14",
          "IQR uses the quartiles, not the outlier. From the plot Q3 = 44 and Q1 = 30, so IQR = 44 − 30 = 14 minutes.",
          {
            accepted: ["14.0", "14 min"],
            hint: "Use the edges of the box (Q1 and Q3); ignore the separate outlier dot.",
            boxPlotDiagram: {
              description: "Box plot of finishing times: whisker minimum 20, Q1 30, median 36, Q3 44, whisker maximum 52, with an outlier at 80.",
              plots: [{ label: "Finishing time", min: 20, q1: 30, median: 36, q3: 44, max: 52, outliers: [80] }],
              axisLabel: "Time (min)",
              xMin: 0,
              xMax: 90,
              showValueLabels: true,
            },
          },
        ),
        typedQ(
          "data-box-m7",
          "A data set has Q1 = 10 and Q3 = 18. Find the lower fence (Q1 − 1.5 × IQR).",
          "-2",
          "IQR = 18 − 10 = 8. Lower fence = Q1 − 1.5 × IQR = 10 − 1.5 × 8 = 10 − 12 = −2. Any value below −2 would be a low outlier.",
          { accepted: ["−2", "-2.0"], hint: "Find the IQR, multiply by 1.5, then subtract from Q1 — the result can be negative." },
        ),
        mcqQ(
          "data-box-m8",
          "By the 1.5 × IQR rule, a value is an outlier if it is:",
          "C",
          [
            "Less than Q1",
            "Greater than Q3",
            "More than 1.5 × IQR below Q1 or above Q3",
            "Equal to the median",
          ],
          "Only values beyond the fences (below Q1 − 1.5×IQR or above Q3 + 1.5×IQR) are outliers. Being merely below Q1 or above Q3 just means a value is in the outer half — not an outlier.",
        ),
        typedQ(
          "data-box-m9",
          "The parallel box plots compare delivery times for two couriers. How much higher is Courier Y's median than Courier X's median?",
          "9",
          "Read each median: Courier X = 66 and Courier Y = 75. The difference is 75 − 66 = 9 minutes.",
          {
            accepted: ["9.0", "9 min"],
            hint: "Read the median line of each box, then subtract the smaller from the larger.",
            boxPlotDiagram: {
              description: "Parallel box plots. Courier X: min 50, Q1 60, median 66, Q3 72, max 85. Courier Y: min 55, Q1 68, median 75, Q3 82, max 95.",
              plots: [
                { label: "Courier X", min: 50, q1: 60, median: 66, q3: 72, max: 85 },
                { label: "Courier Y", min: 55, q1: 68, median: 75, q3: 82, max: 95 },
              ],
              axisLabel: "Delivery time (min)",
              xMin: 40,
              xMax: 100,
              showValueLabels: true,
            },
          },
        ),
        mcqQ(
          "data-box-m10",
          "Using the same parallel box plots for Couriers X and Y, which conclusion is best supported?",
          "A",
          [
            "Courier X is typically faster, and both couriers have a similar spread (IQR)",
            "Courier Y is typically faster, because its box is further left",
            "Courier X has a much larger spread than Courier Y",
            "The two couriers have identical distributions",
          ],
          "Courier X's median (66) is lower — faster delivery — and both IQRs are 12, so the spreads match. Courier Y's box sits further right (slower), and the distributions are clearly not identical.",
          {
            boxPlotDiagram: {
              description: "Parallel box plots. Courier X: min 50, Q1 60, median 66, Q3 72, max 85. Courier Y: min 55, Q1 68, median 75, Q3 82, max 95.",
              plots: [
                { label: "Courier X", min: 50, q1: 60, median: 66, q3: 72, max: 85 },
                { label: "Courier Y", min: 55, q1: 68, median: 75, q3: 82, max: 95 },
              ],
              axisLabel: "Delivery time (min)",
              xMin: 40,
              xMax: 100,
              showValueLabels: true,
            },
          },
        ),
      ],
    };
  }

  if (lesson.slug === "stem-leaf-plots") {
    return {
      ...base,
      description:
        "Read and interpret stem-and-leaf plots, find the median, and compare two datasets using back-to-back stem-and-leaf plots.",
      learningIntention:
        "Extract data values and statistics from stem-and-leaf plots, including back-to-back plots for comparing two groups.",
      successCriteria: [
        "Read individual data values from a stem-and-leaf plot.",
        "Count values and find the median from a stem-and-leaf plot.",
        "Read both groups from a back-to-back stem-and-leaf plot.",
        "Compare medians and ranges from a back-to-back plot.",
      ],
      teaching: {
        paragraphs: [
          "A stem-and-leaf plot organises numerical data by splitting each value into a stem (the leading digits) and a leaf (the last digit). For example, stem 2 and leaf 6 gives the value 26.",
          "The values are already in order in a stem-and-leaf plot, making it easy to find the median. Count the total number of values, find the middle position, then read the value directly from the plot.",
          "A back-to-back stem-and-leaf plot shows two groups sharing the same stem column. One group's leaves go to the left, read right-to-left from the stem; the other group's leaves go to the right, read left-to-right. This allows direct comparison of the two distributions.",
          "When comparing two groups in a back-to-back plot, compare medians to describe typical values and compare ranges (or IQR) to describe spread. State differences in context.",
        ],
        latexBlocks: [
          "\\text{stem }2,\\text{ leaf }6 \\Rightarrow \\text{value} = 26",
          "\\text{median} = \\text{middle value after ordering}",
        ],
      },
      guidedPractice: [
        mcqQ(
          "data-stem-g1",
          "In a stem-and-leaf plot, a row with stem 3 and a leaf 5 represents which data value?",
          "A",
          ["35", "53", "3.5", "8"],
          "Combine the stem (tens digit) with the leaf (units digit): 3 | 5 = 35. Reversing them gives 53, treating the leaf as a decimal gives 3.5, and adding them gives 8 — all common errors.",
        ),
        typedQ(
          "data-stem-g2",
          "How many data values are shown in the stem-and-leaf plot?",
          "9",
          "Count every leaf across all stems: 3 leaves on stem 1, 4 on stem 2, and 2 on stem 3 give 3 + 4 + 2 = 9 values.",
          {
            accepted: ["9 values"],
            hint: "Count all the leaves, across every stem row.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 1: leaves 2 5 8. Stem 2: leaves 0 3 6 7. Stem 3: leaves 1 4.",
              keyText: "1 | 2 = 12",
              rows: [
                { stem: 1, leaves: [2, 5, 8] },
                { stem: 2, leaves: [0, 3, 6, 7] },
                { stem: 3, leaves: [1, 4] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-g3",
          "Find the median of the data shown in the stem-and-leaf plot.",
          "23",
          "The plot lists the values in order: 12, 15, 18, 20, 23, 26, 27, 31, 34 (n = 9). The median is the 5th value, which is 23.",
          {
            accepted: ["23.0"],
            hint: "The values are already in order. With 9 values, the median is the 5th.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 1: leaves 2 5 8. Stem 2: leaves 0 3 6 7. Stem 3: leaves 1 4.",
              keyText: "1 | 2 = 12",
              rows: [
                { stem: 1, leaves: [2, 5, 8] },
                { stem: 2, leaves: [0, 3, 6, 7] },
                { stem: 3, leaves: [1, 4] },
              ],
            },
          },
        ),
        mcqQ(
          "data-stem-g4",
          "How is a back-to-back stem-and-leaf plot organised?",
          "A",
          [
            "Both groups share one central stem column, with one group's leaves on each side",
            "Each group has a separate stem column on opposite sides",
            "Only one group's data is shown at a time",
            "Stems are listed across the top rather than down the side",
          ],
          "A back-to-back plot uses a single shared stem in the centre: one group's leaves read outward to the left, the other's to the right — allowing a direct comparison of two data sets.",
        ),
      ],
      independentPractice: [
        typedQ(
          "data-stem-i1",
          "What is the largest value shown in the stem-and-leaf plot?",
          "53",
          "The largest value is the last leaf on the largest stem: stem 5 with leaf 3 gives 5 | 3 = 53.",
          {
            accepted: ["53.0"],
            hint: "Look at the highest stem and its largest leaf.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 2: leaves 4 7. Stem 3: leaves 1 5 8. Stem 4: leaves 0 2 6 9. Stem 5: leaf 3.",
              keyText: "2 | 4 = 24",
              rows: [
                { stem: 2, leaves: [4, 7] },
                { stem: 3, leaves: [1, 5, 8] },
                { stem: 4, leaves: [0, 2, 6, 9] },
                { stem: 5, leaves: [3] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-i2",
          "Find the median of the data shown in the stem-and-leaf plot.",
          "39",
          "The values in order are 24, 27, 31, 35, 38, 40, 42, 46, 49, 53 (n = 10). The median is the average of the 5th and 6th values: (38 + 40) ÷ 2 = 39.",
          {
            accepted: ["39.0"],
            hint: "There are 10 values, so average the 5th and 6th.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 2: leaves 4 7. Stem 3: leaves 1 5 8. Stem 4: leaves 0 2 6 9. Stem 5: leaf 3.",
              keyText: "2 | 4 = 24",
              rows: [
                { stem: 2, leaves: [4, 7] },
                { stem: 3, leaves: [1, 5, 8] },
                { stem: 4, leaves: [0, 2, 6, 9] },
                { stem: 5, leaves: [3] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-i3",
          "Find the range of the data shown in the stem-and-leaf plot.",
          "29",
          "Range = largest − smallest = 53 − 24 = 29.",
          {
            accepted: ["29.0"],
            hint: "Subtract the smallest value (top-left) from the largest (bottom-right).",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 2: leaves 4 7. Stem 3: leaves 1 5 8. Stem 4: leaves 0 2 6 9. Stem 5: leaf 3.",
              keyText: "2 | 4 = 24",
              rows: [
                { stem: 2, leaves: [4, 7] },
                { stem: 3, leaves: [1, 5, 8] },
                { stem: 4, leaves: [0, 2, 6, 9] },
                { stem: 5, leaves: [3] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-i4",
          "The back-to-back plot compares two classes. Find the median mark for Class A.",
          "18",
          "Class A's values (left side) are 12, 15, 18, 25, 28 (n = 5). The median is the 3rd value, which is 18.",
          {
            accepted: ["18.0"],
            hint: "Read Class A's values from the left of the stem; with 5 values the median is the 3rd.",
            stemAndLeafDiagram: {
              description: "Back-to-back stem-and-leaf plot. Class A (left): stem 1 has 12, 15, 18; stem 2 has 25, 28. Class B (right): stem 1 has 13, 17; stem 2 has 21, 25, 28; stem 3 has 33.",
              keyText: "1 | 3 = 13",
              leftLabel: "Class A",
              rightLabel: "Class B",
              rows: [
                { stem: 1, leftLeaves: [2, 5, 8], leaves: [3, 7] },
                { stem: 2, leftLeaves: [5, 8], leaves: [1, 5, 8] },
                { stem: 3, leftLeaves: [], leaves: [3] },
              ],
            },
          },
        ),
        mcqQ(
          "data-stem-i5",
          "Using the same back-to-back plot (Class A median 18, Class B median 23), which statement is best supported?",
          "B",
          [
            "Class A typically scored higher than Class B",
            "Class B typically scored higher than Class A",
            "Both classes have identical distributions",
            "Medians cannot be compared from a back-to-back plot",
          ],
          "Class B's median (23) is higher than Class A's (18), so Class B's typical value is larger. A back-to-back plot is designed exactly for this kind of median-to-median comparison.",
        ),
      ],
      commonMistakes: [
        { mistake: "Reading a left-hand leaf as the tens digit, e.g. taking 8 | 1 as 81 instead of 18.", fix: "The stem is always the tens digit. On the left side read outward from the stem: stem 1 with leaf 8 is still 18." },
        { mistake: "Counting the leaves on only one stem when finding the total number of values.", fix: "Add up every leaf across all stem rows — each leaf is one data value." },
        { mistake: "Treating stem 2, leaf 3 as 2.3 instead of 23.", fix: "For two-digit data the stem is the tens digit and the leaf the units digit, so 2 | 3 = 23." },
        { mistake: "Comparing two groups by eyeballing individual leaves rather than summary statistics.", fix: "Compare medians (typical value) and ranges (spread) before stating which group is higher or more variable." },
      ],
      masteryQuiz: [
        mcqQ(
          "data-stem-m1",
          "In a stem-and-leaf plot, a row with stem 2 and leaves 2, 5, 8 represents which values?",
          "B",
          ["2, 5, 8", "22, 25, 28", "2.2, 2.5, 2.8", "225 and 28"],
          "Each leaf pairs with the stem to give a value: 2 | 2 = 22, 2 | 5 = 25, 2 | 8 = 28. The leaves are not standalone values or decimals, and they are not concatenated into one number.",
        ),
        typedQ(
          "data-stem-m2",
          "How many data values are shown in the stem-and-leaf plot?",
          "10",
          "Count every leaf: 3 on stem 1, 3 on stem 2, 3 on stem 3, and 1 on stem 4 give 3 + 3 + 3 + 1 = 10 values.",
          {
            accepted: ["10 values"],
            hint: "Total the leaves across all four stems.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 1: leaves 4 6 9. Stem 2: leaves 2 5 8. Stem 3: leaves 0 3 7. Stem 4: leaf 1.",
              keyText: "1 | 4 = 14",
              rows: [
                { stem: 1, leaves: [4, 6, 9] },
                { stem: 2, leaves: [2, 5, 8] },
                { stem: 3, leaves: [0, 3, 7] },
                { stem: 4, leaves: [1] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-m3",
          "Find the median of the data shown in the stem-and-leaf plot.",
          "26.5",
          "The values in order are 14, 16, 19, 22, 25, 28, 30, 33, 37, 41 (n = 10). The median is the average of the 5th and 6th: (25 + 28) ÷ 2 = 26.5.",
          {
            accepted: ["26.50"],
            hint: "With 10 values, average the 5th and 6th.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 1: leaves 4 6 9. Stem 2: leaves 2 5 8. Stem 3: leaves 0 3 7. Stem 4: leaf 1.",
              keyText: "1 | 4 = 14",
              rows: [
                { stem: 1, leaves: [4, 6, 9] },
                { stem: 2, leaves: [2, 5, 8] },
                { stem: 3, leaves: [0, 3, 7] },
                { stem: 4, leaves: [1] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-m4",
          "Find the range of the data shown in the stem-and-leaf plot.",
          "27",
          "Range = largest − smallest = 41 − 14 = 27.",
          {
            accepted: ["27.0"],
            hint: "Subtract the smallest value from the largest.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 1: leaves 4 6 9. Stem 2: leaves 2 5 8. Stem 3: leaves 0 3 7. Stem 4: leaf 1.",
              keyText: "1 | 4 = 14",
              rows: [
                { stem: 1, leaves: [4, 6, 9] },
                { stem: 2, leaves: [2, 5, 8] },
                { stem: 3, leaves: [0, 3, 7] },
                { stem: 4, leaves: [1] },
              ],
            },
          },
        ),
        mcqQ(
          "data-stem-m5",
          "What is the main advantage of a stem-and-leaf plot over a plain list of values?",
          "A",
          [
            "It keeps every individual value while also showing the shape of the distribution",
            "It hides the individual data values",
            "It works only for values below 10",
            "It calculates the mean automatically",
          ],
          "A stem-and-leaf plot orders the data and reveals its shape (like a sideways histogram) without losing any individual value — which a histogram or a plain list cannot do at once.",
        ),
        typedQ(
          "data-stem-m6",
          "The back-to-back plot compares two groups. Find the median for Group A.",
          "33",
          "Group A's values (left side) are 22, 26, 31, 35, 38, 40 (n = 6). The median is the average of the 3rd and 4th: (31 + 35) ÷ 2 = 33.",
          {
            accepted: ["33.0"],
            hint: "Read Group A from the left of the stem; with 6 values average the 3rd and 4th.",
            stemAndLeafDiagram: {
              description: "Back-to-back stem-and-leaf plot. Group A (left): stem 2 has 22, 26; stem 3 has 31, 35, 38; stem 4 has 40. Group B (right): stem 2 has 24, 29; stem 3 has 30, 36; stem 4 has 42, 45, 48.",
              keyText: "2 | 4 = 24",
              leftLabel: "Group A",
              rightLabel: "Group B",
              rows: [
                { stem: 2, leftLeaves: [2, 6], leaves: [4, 9] },
                { stem: 3, leftLeaves: [1, 5, 8], leaves: [0, 6] },
                { stem: 4, leftLeaves: [0], leaves: [2, 5, 8] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-m7",
          "Using the same back-to-back plot, find the median for Group B.",
          "36",
          "Group B's values (right side) are 24, 29, 30, 36, 42, 45, 48 (n = 7). The median is the 4th value, which is 36.",
          {
            accepted: ["36.0"],
            hint: "Read Group B from the right of the stem; with 7 values the median is the 4th.",
            stemAndLeafDiagram: {
              description: "Back-to-back stem-and-leaf plot. Group A (left): stem 2 has 22, 26; stem 3 has 31, 35, 38; stem 4 has 40. Group B (right): stem 2 has 24, 29; stem 3 has 30, 36; stem 4 has 42, 45, 48.",
              keyText: "2 | 4 = 24",
              leftLabel: "Group A",
              rightLabel: "Group B",
              rows: [
                { stem: 2, leftLeaves: [2, 6], leaves: [4, 9] },
                { stem: 3, leftLeaves: [1, 5, 8], leaves: [0, 6] },
                { stem: 4, leftLeaves: [0], leaves: [2, 5, 8] },
              ],
            },
          },
        ),
        mcqQ(
          "data-stem-m8",
          "Group A has median 33 and range 18; Group B has median 36 and range 24. Which comparison is best supported?",
          "B",
          [
            "Group A is typically higher and more spread out",
            "Group B is typically higher and more spread out than Group A",
            "The two groups are identical",
            "Group B is typically higher but more consistent than Group A",
          ],
          "Group B's larger median (36 vs 33) means typically higher values, and its larger range (24 vs 18) means more spread — so B is both higher and more variable, not more consistent.",
        ),
        typedQ(
          "data-stem-m9",
          "Find the lower quartile (Q1) of the data shown in the stem-and-leaf plot.",
          "15",
          "The 9 ordered values are 11, 14, 16, 20, 22, 25, 28, 33, 37. The median (5th value, 22) splits off a lower half of 11, 14, 16, 20; Q1 is the median of that half: (14 + 16) ÷ 2 = 15.",
          {
            accepted: ["15.0"],
            hint: "Find the median first, then take the median of the four values below it.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 1: leaves 1 4 6. Stem 2: leaves 0 2 5 8. Stem 3: leaves 3 7.",
              keyText: "1 | 1 = 11",
              rows: [
                { stem: 1, leaves: [1, 4, 6] },
                { stem: 2, leaves: [0, 2, 5, 8] },
                { stem: 3, leaves: [3, 7] },
              ],
            },
          },
        ),
        typedQ(
          "data-stem-m10",
          "Find the range of the data shown in the stem-and-leaf plot above (the one used for Q1).",
          "26",
          "Range = largest − smallest = 37 − 11 = 26.",
          {
            accepted: ["26.0"],
            hint: "Subtract the smallest value from the largest in the same plot.",
            stemAndLeafDiagram: {
              description: "Stem-and-leaf plot. Stem 1: leaves 1 4 6. Stem 2: leaves 0 2 5 8. Stem 3: leaves 3 7.",
              keyText: "1 | 1 = 11",
              rows: [
                { stem: 1, leaves: [1, 4, 6] },
                { stem: 2, leaves: [0, 2, 5, 8] },
                { stem: 3, leaves: [3, 7] },
              ],
            },
          },
        ),
      ],
    };
  }

  if (lesson.slug === "time-series-trend-lines") {
    return {
      ...base,
      description:
        "Plot and read time series data, describe trends as increasing, decreasing or fluctuating, and make cautious predictions.",
      learningIntention:
        "Describe trends in time series data and make cautious predictions while acknowledging limitations.",
      successCriteria: [
        "Read values from a time series graph or table.",
        "Describe the overall trend as increasing, decreasing, fluctuating or seasonal.",
        "Calculate an average rate of change between two time points.",
        "Make a prediction from a trend and explain why it may be unreliable.",
      ],
      teaching: {
        paragraphs: [
          "A time series records how a quantity changes over time. Time goes on the horizontal axis and the measured variable goes on the vertical axis. Points are joined with line segments to show the pattern.",
          "When describing a time series, focus on the overall trend rather than individual fluctuations. Common descriptions are: increasing (generally rising), decreasing (generally falling), fluctuating (no clear direction), or seasonal (repeating pattern over cycles).",
          "A trend line can be drawn through the data to summarise the overall direction. The gradient of the trend line is the average rate of change. You can use it to make predictions — but only cautiously, because the trend may not continue.",
          "Predictions based on a trend line are extrapolations — they go beyond the observed data. Changes in season, competition, economy or behaviour can cause the real value to differ significantly from the prediction.",
        ],
        latexBlocks: [
          "\\text{average rate of change} = \\frac{\\text{change in value}}{\\text{change in time}}",
          "\\text{prediction} = \\text{last known value} + (\\text{rate} \\times \\text{extra time periods})",
        ],
      },
      guidedPractice: [
        mcqQ(
          "data-time-g1",
          "In a time series graph, time is plotted on the horizontal axis. This means time is the:",
          "B",
          ["Dependent variable", "Independent variable", "Mean of the data", "Range of the data"],
          "Time is the independent variable — it is the input we measure the other quantity against, so it goes on the horizontal axis.",
        ),
        typedQ(
          "data-time-g2",
          "The time series graph shows a café's monthly sales. What were the sales in April (month 4)?",
          "50",
          "Read the height of the point above month 4 on the graph: the April value is 50.",
          {
            accepted: ["50 sales"],
            hint: "Find month 4 on the horizontal axis and read the value of the point above it.",
            ...timeSeriesGraph(
              "Time series of monthly café sales for months 1–6: 40, 45, 42, 50, 55, 58.",
              "Month",
              "Sales",
              [40, 45, 42, 50, 55, 58],
              0,
              70,
              10
            ),
          },
        ),
        mcqQ(
          "data-time-g3",
          "Using the same monthly sales graph, how is the overall trend best described?",
          "A",
          [
            "Increasing — sales generally rise, despite one dip",
            "Decreasing — sales fall overall",
            "Stable — no change over time",
            "Seasonal — a repeating yearly cycle",
          ],
          "From month 1 (40) to month 6 (58) the values rise overall, even though March dips. That is an increasing trend, not a stable, falling, or repeating one.",
          {
            ...timeSeriesGraph(
              "Time series of monthly café sales for months 1–6: 40, 45, 42, 50, 55, 58.",
              "Month",
              "Sales",
              [40, 45, 42, 50, 55, 58],
              0,
              70,
              10
            ),
          },
        ),
        typedQ(
          "data-time-g4",
          "A café's sales were 42 in March and 55 in May. Find the average rate of increase in sales per month.",
          "6.5",
          "Average rate of change = change in value ÷ change in time = (55 − 42) ÷ (5 − 3) = 13 ÷ 2 = 6.5 sales per month.",
          { accepted: ["6.5 per month", "6.5 sales/month"], hint: "Divide the change in sales by the number of months between March and May." },
        ),
      ],
      independentPractice: [
        typedQ(
          "data-time-i1",
          "The time series graph shows weekly café customers. How many customers came in week 3?",
          "90",
          "Read the height of the point above week 3: the value is 90 customers.",
          {
            accepted: ["90 customers"],
            hint: "Find week 3 on the horizontal axis and read the point's height.",
            ...timeSeriesGraph(
              "Time series of weekly café customers for weeks 1–5: 80, 85, 90, 88, 95.",
              "Week",
              "Customers",
              [80, 85, 90, 88, 95],
              0,
              100,
              10
            ),
          },
        ),
        typedQ(
          "data-time-i2",
          "Using the same graph, find the average rate of change in customers per week from week 1 to week 5.",
          "3.75",
          "Average rate of change = (95 − 80) ÷ (5 − 1) = 15 ÷ 4 = 3.75 customers per week.",
          {
            accepted: ["3.75 per week"],
            hint: "Divide the change from week 1 to week 5 by the 4 weeks between them.",
            ...timeSeriesGraph(
              "Time series of weekly café customers for weeks 1–5: 80, 85, 90, 88, 95.",
              "Week",
              "Customers",
              [80, 85, 90, 88, 95],
              0,
              100,
              10
            ),
          },
        ),
        typedQ(
          "data-time-i3",
          "A trend line for monthly downloads rises by 4 thousand per month. If month 6 had 30 thousand downloads, predict the downloads in month 9 (in thousands).",
          "42",
          "From month 6 to month 9 is 3 months. Prediction = 30 + 4 × 3 = 30 + 12 = 42 thousand downloads.",
          { accepted: ["42 thousand", "42000", "42,000"], hint: "Add the rate times the number of extra months to the month-6 value." },
        ),
        mcqQ(
          "data-time-i4",
          "The graph shows monthly temperatures across part of a year. Which description best fits the pattern?",
          "B",
          [
            "Constant throughout the year",
            "Seasonal — rising to a peak, then falling",
            "Steadily decreasing all year",
            "Fluctuating with no overall shape",
          ],
          "The values climb to a mid-year peak and then fall away, which is a seasonal pattern — not constant, steadily falling, or directionless.",
          {
            ...timeSeriesGraph(
              "Time series of monthly temperatures (°C) for months 1–7: 22, 25, 28, 26, 20, 16, 14.",
              "Month",
              "Temperature (°C)",
              [22, 25, 28, 26, 20, 16, 14],
              0,
              30,
              5
            ),
          },
        ),
        typedQ(
          "data-time-i5",
          "A trend line predicted 200 sales for a month, but the actual figure was 185. By how much was the prediction too high?",
          "15",
          "Prediction error = predicted − actual = 200 − 185 = 15, so the prediction was 15 too high.",
          { accepted: ["15 sales"], hint: "Subtract the actual value from the predicted value." },
        ),
      ],
      commonMistakes: [
        { mistake: "Describing a trend from one or two points rather than the overall pattern.", fix: "Look at the general direction from the first point to the last; a single dip or spike does not overturn an overall increasing trend." },
        { mistake: "Stating a prediction as a certainty.", fix: "Predictions from a trend line are estimates — use 'approximately' or 'based on the trend' and note the trend may not continue." },
        { mistake: "Calling the spread of values the 'trend'.", fix: "Trend is the direction of change over time (increasing, decreasing, fluctuating, seasonal), not the numerical range." },
        { mistake: "Treating the average rate of change between two points as exact for long-range predictions.", fix: "The average rate is an estimate; real data rarely follows a perfectly constant rate, so distant predictions are less reliable." },
      ],
      masteryQuiz: [
        mcqQ(
          "data-time-m1",
          "The graph shows a region's annual rainfall over five years. How is the trend best described?",
          "C",
          [
            "Strongly increasing",
            "Strongly decreasing",
            "Fluctuating with no clear overall direction",
            "A repeating seasonal cycle",
          ],
          "The values rise and fall from year to year without settling into an overall upward or downward direction, so the series is fluctuating.",
          {
            ...timeSeriesGraph(
              "Time series of annual rainfall (mm) for years 1–5: 600, 580, 620, 560, 590.",
              "Year",
              "Rainfall (mm)",
              [600, 580, 620, 560, 590],
              500,
              650,
              25
            ),
          },
        ),
        typedQ(
          "data-time-m2",
          "A business's revenue rose from $12k in month 1 to $20k in month 6. Find the average increase in revenue per month (in $000s).",
          "1.6",
          "Average rate of change = (20 − 12) ÷ (6 − 1) = 8 ÷ 5 = 1.6, i.e. $1.6k per month.",
          { accepted: ["1.6 per month", "$1.6k per month"], hint: "Divide the change in revenue by the 5 months between month 1 and month 6." },
        ),
        typedQ(
          "data-time-m3",
          "Revenue is increasing by an average of $1.6k per month and was $20k in month 6. Predict the revenue in month 7 (in $000s).",
          "21.6",
          "Prediction = last value + rate × extra periods = 20 + 1.6 × 1 = 21.6, i.e. $21.6k.",
          { accepted: ["21.6k", "$21.6k"], hint: "Add one month's average increase to the month-6 value." },
        ),
        typedQ(
          "data-time-m4",
          "Daily website visits for a week were: 200, 210, 195, 220, 230. Find the range of daily visits.",
          "35",
          "Range = highest − lowest = 230 − 195 = 35 visits.",
          { accepted: ["35 visits"], hint: "Subtract the smallest day's visits from the largest." },
        ),
        mcqQ(
          "data-time-m5",
          "A time series shows a decreasing trend. This means:",
          "B",
          [
            "Each value is exactly smaller than the one before it",
            "The overall direction is downward, though individual values may sometimes rise",
            "Every data value is negative",
            "The time axis runs right to left",
          ],
          "A decreasing trend describes the overall downward direction. It does not require every step to fall, nor does it mean the values or the axis are negative/reversed.",
        ),
        typedQ(
          "data-time-m6",
          "The graph shows monthly revenue ($000s). Find the average rate of change in revenue per month from month 2 to month 6.",
          "1.25",
          "From the graph, month 2 = 15 and month 6 = 20. Average rate = (20 − 15) ÷ (6 − 2) = 5 ÷ 4 = 1.25 ($000s per month).",
          {
            accepted: ["1.25 per month", "$1.25k per month"],
            hint: "Read the month-2 and month-6 values from the graph, then divide the change by 4.",
            ...timeSeriesGraph(
              "Time series of monthly revenue ($000s) for months 1–6: 12, 15, 14, 17, 18, 20.",
              "Month",
              "Revenue ($000s)",
              [12, 15, 14, 17, 18, 20],
              0,
              25,
              5
            ),
          },
        ),
        typedQ(
          "data-time-m7",
          "A trend line predicted next year's rainfall as 410 mm, but the actual rainfall was 372 mm. By how much was the prediction too high?",
          "38",
          "Prediction error = predicted − actual = 410 − 372 = 38 mm too high.",
          { accepted: ["38 mm"], hint: "Subtract the actual rainfall from the predicted value." },
        ),
        typedQ(
          "data-time-m8",
          "Daily maximum temperatures (°C) for five days were: 18, 21, 25, 27, 24. Find the mean maximum temperature.",
          "23",
          "Mean = (18 + 21 + 25 + 27 + 24) ÷ 5 = 115 ÷ 5 = 23 °C.",
          { accepted: ["23°C", "23 degrees"], hint: "Add the five temperatures and divide by 5." },
        ),
        mcqQ(
          "data-time-m9",
          "A shop's sales have risen steadily for six months. Which is the most appropriate conclusion?",
          "B",
          [
            "Sales will definitely keep rising forever, based on the past six months",
            "Based on the trend, sales appear likely to rise, but the trend may not continue",
            "Only falling trends can be used to make predictions",
            "Time series data cannot support any prediction",
          ],
          "A sound conclusion uses the trend but acknowledges uncertainty: extrapolation beyond the data is not guaranteed. The other options over-claim certainty or wrongly dismiss prediction altogether.",
        ),
        typedQ(
          "data-time-m10",
          "A trend line for monthly sales is modelled by S = 8 + 3t, where t is the month number. Use it to predict the sales when t = 12.",
          "44",
          "Substitute t = 12: S = 8 + 3 × 12 = 8 + 36 = 44. The trend line predicts 44 sales in month 12.",
          { accepted: ["44 sales"], hint: "Substitute t = 12 into the trend-line equation and evaluate." },
        ),
      ],
    };
  }

  if (lesson.slug === "data-analysis-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed data questions using tables, summary statistics, graph interpretation, outliers and cautious conclusions.",
    learningIntention:
      "Apply data analysis skills to practical exam-style contexts.",
    successCriteria: [
      "Calculate summary statistics from practical data.",
      "Read and interpret tables or graph descriptions.",
      "Identify outliers and their effect on summaries.",
      "Choose cautious conclusions from data.",
    ],
    teaching: {
      paragraphs: [
        "Data analysis exam questions combine a short calculation with interpretation, and the real skill is choosing the right statistic for what is asked — a centre (mean, median, mode), a spread (range), or a proportion.",
        "Start by identifying the data values and the statistic required: mean, median, mode, range, total or percentage.",
        "For graph questions, read the category and value carefully. Do not confuse frequency with the data value.",
        "When outliers are present, consider whether the median gives a better typical value than the mean.",
      ],
      latexBlocks: [
        "\\text{mean}=\\frac{\\text{total}}{n}",
        "\\text{range}=\\text{maximum}-\\text{minimum}",
      ],
    },
    guidedPractice: [
      typedQ(
        "data-exam-g1",
        "The column graph shows a café's sales for the week. How many coffees were sold in total?",
        "220",
        "Add the five daily column heights: 38 + 42 + 45 + 51 + 44 = 220 coffees.",
        {
          accepted: ["220 coffees"],
          hint: "Sum the heights of all five columns.",
          barChartDiagram: {
            description: "Column graph of coffees sold: Mon 38, Tue 42, Wed 45, Thu 51, Fri 44.",
            bars: [
              { label: "Mon", value: 38 },
              { label: "Tue", value: 42 },
              { label: "Wed", value: 45 },
              { label: "Thu", value: 51 },
              { label: "Fri", value: 44 },
            ],
            valueAxisLabel: "Coffees sold",
            categoryAxisLabel: "Day",
          },
        },
      ),
      typedQ(
        "data-exam-g2",
        "A team's attendance over five games was: 85, 92, 78, 96, 89. Find the mean attendance.",
        "88",
        "Add the five values: 85 + 92 + 78 + 96 + 89 = 440. Divide by 5: 440 ÷ 5 = 88.",
        { accepted: ["88.0", "88 people"], hint: "Sum the five attendances and divide by 5." },
      ),
      mcqQ(
        "data-exam-g3",
        "Delivery times (minutes) are 18, 20, 21, 22, 23, 24, 47. Which measure best represents a typical delivery time?",
        "B",
        ["The mean", "The median", "The maximum", "The total"],
        "The 47 is an outlier that inflates the mean, so the median (22) better represents a typical time. The maximum and total are not measures of a typical value.",
      ),
      mcqQ(
        "data-exam-g4",
        "On a column graph of weekly sales, Friday has the tallest column. This tells you Friday had the:",
        "A",
        ["Greatest frequency", "Smallest value", "Median value", "Range of the data"],
        "Column height represents frequency, so the tallest column is the greatest frequency. A short column would be the smallest; height is not the median or the range.",
      ),
    ],
    independentPractice: [
      typedQ(
        "data-exam-i1",
        "Travel times (minutes) on six trips were: 12, 14, 15, 15, 18, 34. Find the range.",
        "22",
        "Range = highest − lowest = 34 − 12 = 22 minutes.",
        { accepted: ["22 min", "22 minutes"], hint: "Subtract the smallest time from the largest." },
      ),
      typedQ(
        "data-exam-i2",
        "The dot plot shows goals scored each match. What is the modal number of goals?",
        "2",
        "The mode is the value with the most dots. Four matches scored 2 goals, more than any other value, so the mode is 2.",
        {
          accepted: ["2 goals"],
          hint: "Find the tallest stack of dots.",
          dotPlotDiagram: {
            description: "Dot plot of goals per match: 0 goals (1 match), 1 goal (2 matches), 2 goals (4 matches), 3 goals (1 match).",
            min: 0,
            max: 4,
            counts: [
              { value: 0, count: 1 },
              { value: 1, count: 2 },
              { value: 2, count: 4 },
              { value: 3, count: 1 },
            ],
            axisLabel: "Goals per match",
          },
        },
      ),
      typedQ(
        "data-exam-i3",
        "A shop's daily customer counts were: 27, 33, 29, 35, 26. Find the mean number of customers per day.",
        "30",
        "Add the counts: 27 + 33 + 29 + 35 + 26 = 150. Divide by 5: 150 ÷ 5 = 30 customers.",
        { accepted: ["30 customers", "30.0"], hint: "Add the five counts, then divide by 5." },
      ),
      mcqQ(
        "data-exam-i4",
        "A travel-time data set includes one unusually long trip of 34 minutes among values in the teens. This outlier will:",
        "C",
        [
          "Lower the mean below the cluster",
          "Leave every statistic unchanged",
          "Pull the mean upward, while the median is barely affected",
          "Sharply lower the median",
        ],
        "A high outlier raises the mean because every value feeds the total, but the median (position-based) barely moves. It does not lower the mean or leave all statistics unchanged.",
      ),
      typedQ(
        "data-exam-i5",
        "In a survey, 18 of 30 students answered 'yes'. What percentage answered 'yes'?",
        "60",
        "Percentage = (18 ÷ 30) × 100 = 0.6 × 100 = 60%.",
        { accepted: ["60%", "60 percent"], hint: "Divide the yes count by the total, then multiply by 100." },
      ),
    ],
    commonMistakes: [
      { mistake: "Adding a row total already shown in a table back into a mean or range calculation.", fix: "Use only the individual data values, not a total the display has already worked out." },
      { mistake: "Reporting the total (e.g. 220) as the mean.", fix: "Divide the total by the number of values: 220 ÷ 5 = 44." },
      { mistake: "Taking the mean as the typical value when a clear outlier is present.", fix: "When an outlier skews the mean, report the median as the typical value instead." },
      { mistake: "Reading a tall column as 'everyone prefers this', or confusing column height with the category label.", fix: "Column height is the frequency (how many) — the tallest column is the most common response, not a universal preference." },
    ],
    masteryQuiz: [
      typedQ(
        "data-exam-m1",
        "Four test scores were: 61, 64, 66, 70. Find the mean score.",
        "65.25",
        "Add the scores: 61 + 64 + 66 + 70 = 261. Divide by 4: 261 ÷ 4 = 65.25.",
        { accepted: ["65.3"], hint: "Sum the four scores and divide by 4." },
      ),
      typedQ(
        "data-exam-m2",
        "The box plot shows masses (g) of a sample of apples. Read off the median mass.",
        "24",
        "The median is the line inside the box, which sits at 24 grams.",
        {
          accepted: ["24 g", "24.0"],
          hint: "Read the line dividing the box.",
          boxPlotDiagram: {
            description: "Box plot of apple masses with minimum 8, Q1 18, median 24, Q3 33, maximum 45.",
            plots: [{ label: "Apple mass", min: 8, q1: 18, median: 24, q3: 33, max: 45 }],
            axisLabel: "Mass (g)",
            xMin: 0,
            xMax: 50,
            showValueLabels: true,
          },
        },
      ),
      typedQ(
        "data-exam-m3",
        "The histogram shows ages grouped into classes. Which is the modal class?",
        "30–39",
        "The modal class is the tallest bar: 30–39 has frequency 14, the highest of all the classes.",
        {
          accepted: ["30-39", "30 to 39", "the 30–39 class"],
          hint: "Read off the tallest bar.",
          histogramDiagram: {
            description: "Histogram of ages: 10–19 frequency 5, 20–29 frequency 9, 30–39 frequency 14, 40–49 frequency 7.",
            bins: [
              { label: "10–19", frequency: 5 },
              { label: "20–29", frequency: 9 },
              { label: "30–39", frequency: 14 },
              { label: "40–49", frequency: 7 },
            ],
            axisLabel: "Age (years)",
            frequencyAxisLabel: "Frequency",
          },
        },
      ),
      mcqQ(
        "data-exam-m4",
        "The column graph shows how students travel to school. Which method is the most common?",
        "A",
        ["Bus", "Train", "Car", "Walk"],
        "The tallest column is Bus (14), so it is the most common method. Train (8), car (6) and walk (9) are all shorter columns.",
        {
          barChartDiagram: {
            description: "Column graph of travel method: Bus 14, Train 8, Car 6, Walk 9.",
            bars: [
              { label: "Bus", value: 14 },
              { label: "Train", value: 8 },
              { label: "Car", value: 6 },
              { label: "Walk", value: 9 },
            ],
            valueAxisLabel: "Students",
            categoryAxisLabel: "Travel method",
          },
        },
      ),
      typedQ(
        "data-exam-m5",
        "Find the median of the data shown in the stem-and-leaf plot.",
        "23.5",
        "The values in order are 14, 17, 22, 25, 29, 31 (n = 6). The median is the average of the 3rd and 4th: (22 + 25) ÷ 2 = 23.5.",
        {
          accepted: ["23.50"],
          hint: "With 6 values, average the 3rd and 4th.",
          stemAndLeafDiagram: {
            description: "Stem-and-leaf plot. Stem 1: leaves 4 7. Stem 2: leaves 2 5 9. Stem 3: leaf 1.",
            keyText: "1 | 4 = 14",
            rows: [
              { stem: 1, leaves: [4, 7] },
              { stem: 2, leaves: [2, 5, 9] },
              { stem: 3, leaves: [1] },
            ],
          },
        },
      ),
      typedQ(
        "data-exam-m6",
        "In a survey, 21 of 28 customers were satisfied. What percentage were satisfied?",
        "75",
        "Percentage = (21 ÷ 28) × 100 = 0.75 × 100 = 75%.",
        { accepted: ["75%", "75 percent"], hint: "Divide the satisfied count by the total, then multiply by 100." },
      ),
      typedQ(
        "data-exam-m7",
        "A data set has lower quartile Q1 = 34 and upper quartile Q3 = 58. Find the interquartile range.",
        "24",
        "IQR = Q3 − Q1 = 58 − 34 = 24.",
        { accepted: ["24.0"], hint: "Subtract Q1 from Q3." },
      ),
      mcqQ(
        "data-exam-m8",
        "A data set of house prices has a few very expensive homes. Which statement is correct?",
        "C",
        [
          "The mean is the best typical value because it uses every price",
          "The median and mean will be equal",
          "The few high prices pull the mean above the median, so the median is the better typical value",
          "The range is the best typical value",
        ],
        "High prices inflate the mean above the median (positive skew), so the median better represents a typical home. The range measures spread, not a typical value.",
      ),
      typedQ(
        "data-exam-m9",
        "Daily website visits for a week were: 200, 210, 195, 220, 230. Find the range.",
        "35",
        "Range = highest − lowest = 230 − 195 = 35 visits.",
        { accepted: ["35 visits"], hint: "Subtract the smallest day's visits from the largest." },
      ),
      mcqQ(
        "data-exam-m10",
        "Which conclusion from a small survey is the most appropriate?",
        "D",
        [
          "It is based on personal opinion",
          "It uses only the largest value recorded",
          "It uses only the smallest value recorded",
          "It reflects what the data shows and notes the survey's limitations",
        ],
        "A sound conclusion rests on the actual data and acknowledges limitations (such as a small sample) rather than cherry-picking a single value or relying on opinion.",
      ),
    ],
    multiPartPractice: [
      {
        id: "data-exam-mp1",
        prompt:
          "The masses (in grams) of eight parcels are: 210, 230, 245, 260, 275, 290, 310, 520.",
        latex: "210,\\ 230,\\ 245,\\ 260,\\ 275,\\ 290,\\ 310,\\ 520",
        answer: "267.5",
        acceptedAnswers: ["267.50"],
        hint: "Work through median, IQR, then the outlier test in order.",
        explanation:
          "Median = 267.5 g; IQR = 62.5 g; upper fence = 393.75 g, and since 520 > 393.75 the heaviest parcel is an outlier.",
        parts: [
          {
            key: "a",
            label: "(a)",
            prompt: "Find the median mass (in grams).",
            marks: 1,
            answer: "267.5",
            acceptedAnswers: ["267.50"],
            hint: "With 8 values the median is the average of the 4th and 5th.",
            explanation: "The 4th and 5th values are 260 and 275, so the median is (260 + 275) ÷ 2 = 267.5 g.",
          },
          {
            key: "b",
            label: "(b)",
            prompt: "Find the interquartile range (in grams).",
            marks: 2,
            answer: "62.5",
            acceptedAnswers: ["62.50"],
            hint: "Q1 is the median of the lower four values; Q3 is the median of the upper four.",
            explanation:
              "Lower half 210, 230, 245, 260 gives Q1 = (230 + 245) ÷ 2 = 237.5. Upper half 275, 290, 310, 520 gives Q3 = (290 + 310) ÷ 2 = 300. IQR = 300 − 237.5 = 62.5 g.",
          },
          {
            key: "c",
            label: "(c)",
            prompt: "Find the upper fence (Q3 + 1.5 × IQR) used to test whether 520 g is an outlier.",
            marks: 2,
            answer: "393.75",
            acceptedAnswers: ["393.8"],
            hint: "Add 1.5 × IQR to Q3.",
            explanation:
              "Upper fence = Q3 + 1.5 × IQR = 300 + 1.5 × 62.5 = 300 + 93.75 = 393.75 g. Since 520 > 393.75, the heaviest parcel is an outlier.",
          },
        ],
      },
    ],
    };
  }

  if (lesson.slug === "data-collection-sampling-methods") {
    return {
      ...base,
      description:
        "Distinguish census from sample, identify random and stratified sampling methods, recognise sources of bias in data collection, and evaluate the suitability of survey questions — core skills for statistical investigation in NSW Mathematics Standard.",
      learningIntention:
        "Apply appropriate data-collection methods to a statistical investigation, identify and minimise sampling bias, and evaluate the quality of survey questions.",
      successCriteria: [
        "Distinguish between a census (entire population) and a sample (subset) and state an advantage of each.",
        "Describe simple random sampling and stratified sampling, and explain when each is appropriate.",
        "Identify potential sources of bias in sampling methods or survey questions.",
        "Evaluate survey questions for clarity, neutrality, and the ability to generate useful data.",
      ],
      teaching: {
        paragraphs: [
          "A census collects data from every member of a population. It is accurate but expensive and time-consuming, and may not be possible for large or inaccessible populations. A sample collects data from a representative subset. Samples are faster and cheaper but introduce the risk of not perfectly representing the population.",
          "Simple random sampling gives every member of the population an equal chance of selection (e.g. drawing names from a hat or using a random number generator). Stratified sampling divides the population into subgroups (strata) based on a characteristic, then takes a random sample from each stratum in proportion to its size — ensuring all subgroups are represented.",
          "Bias occurs when the method of data collection or the sample chosen does not fairly represent the population. Sources of bias include: self-selected samples (only volunteers respond), convenience samples (selecting only easy-to-reach people), leading questions (wording that nudges respondents toward a particular answer), and samples that exclude certain groups.",
          "A good survey question is clear, uses plain language, is not leading or emotive, has a logical range of response options, and asks about one thing at a time. Poor questions combine two ideas ('Do you like sport and exercise?'), use jargon, or assume something ('How often do you watch too much TV?').",
        ],
        latexBlocks: [
          "\\text{Census: whole population}\\quad \\text{Sample: representative subset}",
          "\\text{Random sample: equal chance for all}\\quad \\text{Stratified: proportional by subgroup}",
          "\\text{Bias: sample or method does not fairly represent the population}",
        ],
      },
      workedExamples: [
        {
          title: "Census vs sample",
          questionLatex:
            "\\text{A school of 1,200 students wants to find out the most popular lunch choice. Discuss the advantages of using a sample of 120 students instead of a census.}",
          steps: [
            {
              explanation: "A census surveys all 1,200 students — accurate but takes longer and costs more.",
              latex: "\\text{Census: surveys all 1,200} \\Rightarrow \\text{complete data, but slow and resource-intensive}",
            },
            {
              explanation: "A sample of 120 (10%) is faster, cheaper, and still gives a useful estimate if sampled correctly.",
              latex: "\\text{Sample of 120: faster, cheaper, still representative if well chosen}",
            },
          ],
          finalAnswerLatex:
            "\\text{Sample is faster and cheaper; census is more accurate but impractical for large groups.}",
        },
        {
          title: "Stratified sampling",
          questionLatex:
            "\\text{A school has 400 Year 11 students and 200 Year 12 students. A stratified sample of 60 students is needed. How many from each year?}",
          steps: [
            {
              explanation: "Total students = 600. Year 11 proportion = 400/600 = 2/3.",
              latex: "\\text{Year 11: }\\frac{400}{600} \\times 60 = 40 \\text{ students}",
            },
            {
              explanation: "Year 12 proportion = 200/600 = 1/3.",
              latex: "\\text{Year 12: }\\frac{200}{600} \\times 60 = 20 \\text{ students}",
            },
          ],
          finalAnswerLatex: "40 \\text{ from Year 11, }20 \\text{ from Year 12}",
        },
        {
          title: "Identifying bias in a survey question",
          questionLatex:
            "\\text{Identify the problem with this survey question: 'Don't you agree that healthy school canteen options are important?'}",
          steps: [
            {
              explanation: "The phrase 'Don't you agree' is leading — it pushes respondents to say yes.",
              latex: "\\text{Leading question: assumes the respondent agrees}",
            },
            {
              explanation:
                "A better question: 'How important do you think healthy canteen options are? (Not important / Somewhat important / Very important)'",
              latex: "\\text{Neutral wording with clear response options removes the bias}",
            },
          ],
          finalAnswerLatex:
            "\\text{The question is leading. Rephrase with neutral wording and clear response options.}",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y11s-dcs-g1",
          "A survey that collects data from every person in the population is called a:",
          "A",
          ["Census", "Stratified sample", "Random sample", "Convenience sample"],
          "A census collects data from the entire population."
        ),
        {
          ...dataAnswer(
            "y11s-dcs-g2",
            "The column graph shows a company's workforce. A stratified sample of 50 workers is needed. How many should be full-time?",
            "",
            "30",
            ["30 full-time", "30 workers"]
          ),
          explanation:
            "Full-time workers are 300 out of 500 total, so they take the same share of the sample: (300 ÷ 500) × 50 = 0.6 × 50 = 30 full-time workers.",
          hint: "Find full-time as a fraction of the whole workforce, then apply that fraction to the sample of 50.",
          barChartDiagram: {
            description: "Column graph of a company's workforce: 300 full-time workers and 200 part-time workers.",
            bars: [
              { label: "Full-time", value: 300 },
              { label: "Part-time", value: 200 },
            ],
            valueAxisLabel: "Number of workers",
            categoryAxisLabel: "Worker type",
          },
        },
        financeChoice(
          "y11s-dcs-g3",
          "Which sampling method gives every person an equal chance of being selected?",
          "B",
          ["Convenience sampling", "Simple random sampling", "Self-selected sampling", "Quota sampling"],
          "Simple random sampling assigns every individual an equal probability of selection."
        ),
        financeChoice(
          "y11s-dcs-g4",
          "The question 'How many hours of wasteful screen time do you have per day?' is biased because:",
          "C",
          ["It asks about hours", "It includes 'per day'", "The word 'wasteful' is emotive and leading", "It is too short"],
          "The word 'wasteful' is a loaded term that leads respondents toward a negative view of screen time."
        ),
      ],
      independentPractice: [
        financeChoice(
          "y11s-dcs-i1",
          "An advantage of a sample over a census is that a sample is:",
          "A",
          ["Faster and cheaper to collect", "Always more accurate", "Compulsory by law", "Free from all bias"],
          "Samples are faster and cheaper; the trade-off is a small risk of not perfectly representing the population."
        ),
        dataAnswer(
          "y11s-dcs-i2",
          "A school has 480 boys and 320 girls. A stratified sample of 100 students is needed. How many boys should be in the sample?",
          "\\frac{480}{800} \\times 100",
          "60",
          ["60 boys", "60 students"]
        ),
        financeChoice(
          "y11s-dcs-i3",
          "A researcher surveys only shoppers at a particular mall on a Tuesday afternoon. This is an example of:",
          "B",
          ["Stratified sampling", "Convenience sampling", "Random sampling", "Census"],
          "Only people available at that time and place are surveyed — a convenience sample that may not represent the broader population."
        ),
        financeChoice(
          "y11s-dcs-i4",
          "Stratified sampling is preferred over simple random sampling when:",
          "C",
          ["The population is very small", "Speed is the only concern", "Distinct subgroups must all be represented", "Only one characteristic matters"],
          "Stratified sampling ensures each subgroup (stratum) is represented proportionally."
        ),
        financeChoice(
          "y11s-dcs-i5",
          "Which survey question is the most neutral and appropriate?",
          "D",
          [
            "Don't you think exercise is good for you?",
            "How many hours do you waste watching TV?",
            "Do you prefer healthy food, unlike junk food?",
            "How many hours of physical activity do you do per week?",
          ],
          "Only option D is neutral — it asks a factual question without leading language."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Confusing 'sample size' with 'sample proportion' in stratified sampling.",
          fix: "In stratified sampling, the number from each stratum = (stratum size / total population) × sample size. Do not just take equal numbers from each stratum unless they are equal-sized groups.",
        },
        {
          mistake: "Assuming a larger sample is always unbiased.",
          fix: "A large sample from a biased method (e.g. surveying only online users) is still biased. Sample size does not fix selection bias.",
        },
        {
          mistake: "Identifying a question as biased just because it is negative in tone, rather than because it leads respondents.",
          fix: "Bias comes from wording that pushes respondents toward a particular answer ('Don't you agree...', 'wasteful'). A negative but neutral question ('Do you dislike fast food?') is not necessarily leading.",
        },
        {
          mistake: "Treating a self-selected (volunteer) sample as random.",
          fix: "A self-selected sample only includes people who chose to respond. People with strong opinions are more likely to respond, which skews results. This is NOT a random sample.",
        },
      ],
      masteryQuiz: [
        financeChoice("y11s-dcs-m1", "A principal records the exact age of every one of the 850 students in the school. This method of data collection is a:", "C", ["Sample", "Stratified sample", "Census", "Random survey"], "Collecting from every member of the population (all 850 students) is a census, not a sample."),
        dataAnswer("y11s-dcs-m2", "A company has 240 full-time and 160 part-time staff. A stratified sample of 50 is needed. How many part-time staff are selected?", "\\frac{160}{400} \\times 50", "20", ["20 part-time", "20 staff"]),
        financeChoice("y11s-dcs-m3", "Simple random sampling uses:", "B", ["Only volunteers", "Equal probability for every individual", "Subgroup proportions", "Every 5th person on a list"], "Every individual has an equal chance of selection."),
        financeChoice("y11s-dcs-m4", "A survey only emailed to club members and asking about club satisfaction is likely to have:", "A", ["Self-selection bias", "Stratified accuracy", "Random error only", "No bias at all"], "Only members who choose to respond reply, skewing results toward those with strong opinions."),
        financeChoice("y11s-dcs-m5", "Which question is least biased?", "D", ["Don't you love sport?", "How much of your day do you waste sitting?", "Isn't exercise clearly better than TV?", "How many hours per week do you exercise?"], "Option D is factual and neutral."),
        dataAnswer("y11s-dcs-m6", "A school has 600 students: 200 Year 10, 200 Year 11, 200 Year 12. A stratified sample of 90 is needed. How many from each year?", "\\frac{200}{600} \\times 90 = 30 \\text{ per year}", "30", ["30 each", "30 per year"]),
        financeChoice("y11s-dcs-m7", "A company has 300 managers and 700 workers. To survey 50 staff while keeping the manager-to-worker ratio, which sampling method is being used?", "B", ["Simple random sample", "Stratified sample", "Census", "Self-selected sample"], "Splitting the population into subgroups (managers, workers) and sampling each in proportion is stratified sampling."),
        financeChoice("y11s-dcs-m8", "Increasing the sample size will NOT fix bias caused by:", "C", ["Random error", "Sampling variability", "Convenience sampling", "Rounding errors"], "Bias from convenience sampling means the method excluded parts of the population — more observations from the same biased method do not fix this."),
        financeChoice("y11s-dcs-m9", "A student uses last year's published Bureau of Statistics figures for her project instead of surveying anyone herself. This data is:", "C", ["Primary data", "Stratified data", "Secondary data", "Census data"], "Data collected by someone else and already published is secondary data; primary data is gathered first-hand for the current investigation."),
        financeChoice("y11s-dcs-m10", "A survey question asks two things at once ('Do you like sport and healthy food?'). This problem is called:", "B", ["Leading question", "Double-barrelled question", "Closed question", "Response bias"], "A double-barrelled question asks about two things simultaneously, making responses uninterpretable."),
      ],
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "data-analysis-revision") {
    return {
      ...base,
      description:
        "Activate Year 10 data-analysis skills: calculate mean, median, mode, and range from small datasets, identify outliers, and read basic statistical graphs — foundations for Year 11 data-display and summary-statistics work.",
      learningIntention:
        "Recall and apply Year 10 measures of centre and spread so that Year 11 data-analysis work builds on secure foundations.",
      successCriteria: [
        "Calculate the mean by summing all values and dividing by the count.",
        "Find the median by ordering data and identifying the middle value (or average of the two middle values for even-sized datasets).",
        "Identify the mode (most frequent value) and the range (maximum − minimum).",
        "Recognise an outlier as a value noticeably separated from the rest of the data.",
      ],
      teaching: {
        paragraphs: [
          "The mean is the arithmetic average: add all values, then divide by how many values there are. The mean uses every value in the dataset, so it is sensitive to outliers — one very large or very small value can shift the mean significantly.",
          "The median is the middle value when data are arranged in order from smallest to largest. For an odd number of values, the median is the exact middle value. For an even number, the median is the average of the two middle values. The median is resistant to outliers because it depends only on position, not magnitude.",
          "The mode is the value that appears most often. A dataset can have no mode (all values different), one mode (unimodal), or multiple modes. The range measures spread: Range = maximum − minimum. A large range indicates high variability; a small range indicates values are tightly clustered.",
          "An outlier is a data point that is noticeably far from the rest of the data. Outliers can distort the mean significantly but have little effect on the median. When an outlier is present, the median is usually the better measure of typical value.",
        ],
        latexBlocks: [
          "\\bar{x} = \\frac{\\text{sum of all values}}{\\text{number of values}}",
          "\\text{Median: middle value of ordered data}",
          "\\text{Range} = \\text{maximum} - \\text{minimum}",
        ],
      },
      workedExamples: [
        {
          title: "Mean, median, mode, range",
          questionLatex:
            "\\text{Dataset: }4,\\,7,\\,3,\\,7,\\,9.\\text{ Find the mean, median, mode, and range.}",
          steps: [
            {
              explanation: "Mean: sum = 4+7+3+7+9 = 30, count = 5.",
              latex: "\\bar{x} = 30 \\div 5 = 6",
            },
            {
              explanation: "Median: order the data: 3, 4, 7, 7, 9. Middle value (3rd) is 7.",
              latex: "\\text{Median} = 7",
            },
            {
              explanation: "Mode: 7 appears twice (most often). Range: 9 − 3 = 6.",
              latex: "\\text{Mode} = 7,\\quad \\text{Range} = 6",
            },
          ],
          finalAnswerLatex: "\\bar{x}=6,\\;\\text{Median}=7,\\;\\text{Mode}=7,\\;\\text{Range}=6",
        },
        {
          title: "Median with even count",
          questionLatex:
            "\\text{Find the median of: }2,\\,5,\\,8,\\,11,\\,14,\\,20.",
          steps: [
            {
              explanation: "Data is already ordered. 6 values, so median = average of 3rd and 4th.",
              latex: "\\text{Median} = \\frac{8 + 11}{2} = \\frac{19}{2} = 9.5",
            },
          ],
          finalAnswerLatex: "9.5",
        },
        {
          title: "Effect of an outlier",
          questionLatex:
            "\\text{Test scores: }60,\\,65,\\,70,\\,72,\\,75.\\text{ A 6th score of 2 is added. How does it affect the mean and median?}",
          steps: [
            {
              explanation: "Mean without outlier: (60+65+70+72+75)/5 = 342/5 = 68.4. Mean with outlier: (342+2)/6 = 344/6 ≈ 57.3.",
              latex: "\\bar{x}\\text{ drops from }68.4\\text{ to }57.3",
            },
            {
              explanation: "Median without outlier: 70. With outlier, order: 2,60,65,70,72,75. Median = (65+70)/2 = 67.5.",
              latex: "\\text{Median changes from }70\\text{ to }67.5",
            },
          ],
          finalAnswerLatex: "\\text{Outlier drops mean from 68.4 to 57.3; median only shifts from 70 to 67.5}",
        },
      ],
      guidedPractice: [
        typedQ(
          "y11s-dar-g1",
          "Find the mean of: 5, 9, 11, 6, 9.",
          "8",
          "Add the values: 5 + 9 + 11 + 6 + 9 = 40. Divide by 5: 40 ÷ 5 = 8.",
          { accepted: ["8.0"], hint: "Add all five values, then divide by 5." },
        ),
        typedQ(
          "y11s-dar-g2",
          "Find the median of: 3, 7, 2, 9, 5, 8.",
          "6",
          "Order the data: 2, 3, 5, 7, 8, 9. With six values the median is the average of the 3rd and 4th: (5 + 7) ÷ 2 = 6.",
          { accepted: ["6.0"], hint: "Order the values, then average the two in the middle." },
        ),
        typedQ(
          "y11s-dar-g3",
          "Find the range of: 12, 7, 19, 4, 16.",
          "15",
          "Range = highest − lowest = 19 − 4 = 15.",
          { accepted: ["15.0"], hint: "Subtract the smallest value from the largest." },
        ),
        mcqQ(
          "y11s-dar-g4",
          "What is the mode of the data set 4, 6, 6, 7, 8, 8, 8?",
          "C",
          ["6", "7", "8", "4"],
          "The mode is the most frequent value. 8 appears three times — more than any other value — so the mode is 8.",
        ),
      ],
      independentPractice: [
        typedQ(
          "y11s-dar-i1",
          "Find the mean of: 14, 18, 22, 11, 15.",
          "16",
          "Add the values: 14 + 18 + 22 + 11 + 15 = 80. Divide by 5: 80 ÷ 5 = 16.",
          { accepted: ["16.0"], hint: "Add all five values, then divide by 5." },
        ),
        typedQ(
          "y11s-dar-i2",
          "Find the median of: 8, 3, 12, 5, 9, 7.",
          "7.5",
          "Order the data: 3, 5, 7, 8, 9, 12. With six values the median is the average of the 3rd and 4th: (7 + 8) ÷ 2 = 7.5.",
          { accepted: ["7.50"], hint: "Order the values, then average the two middle ones." },
        ),
        typedQ(
          "y11s-dar-i3",
          "Find the range of: 23, 41, 17, 35, 29.",
          "24",
          "Range = highest − lowest = 41 − 17 = 24.",
          { accepted: ["24.0"], hint: "Subtract the smallest value from the largest." },
        ),
        mcqQ(
          "y11s-dar-i4",
          "In which data set is the mean most affected by an outlier?",
          "D",
          ["10, 11, 12, 13", "5, 6, 7, 8, 9", "100, 101, 102", "2, 3, 4, 5, 100"],
          "In option D the value 100 sits far from the cluster 2–5, dragging the mean well above the other values. The other sets are tightly grouped, so their means are barely affected.",
        ),
        typedQ(
          "y11s-dar-i5",
          "The dot plot shows test scores. Find the median score.",
          "67.5",
          "There are 6 scores: 60, 65, 65, 70, 70, 75. The median is the average of the 3rd and 4th: (65 + 70) ÷ 2 = 67.5.",
          {
            accepted: ["67.50"],
            hint: "Count the dots (n = 6) and average the 3rd and 4th values.",
            dotPlotDiagram: {
              description: "Dot plot of test scores: 60 (1), 65 (2), 70 (2), 75 (1).",
              min: 55,
              max: 80,
              counts: [
                { value: 60, count: 1 },
                { value: 65, count: 2 },
                { value: 70, count: 2 },
                { value: 75, count: 1 },
              ],
              axisLabel: "Test score",
            },
          },
        ),
      ],
      commonMistakes: [
        {
          mistake: "Finding the median without first ordering the data.",
          fix: "Always rewrite the data in order from smallest to largest before finding the middle value. The median of 4, 1, 7 is 4 (after ordering: 1, 4, 7), not 1.",
        },
        {
          mistake: "For an even number of values, picking one of the two middle values instead of averaging them.",
          fix: "With an even count, the median is the average of the two middle values: for 3, 5, 7, 9 the median is (5+7)/2 = 6, not 5 or 7.",
        },
        {
          mistake: "Dividing by 5 when there are 6 values in the dataset.",
          fix: "Count the actual number of values carefully before dividing. The mean denominator must match the count of values, not an estimate.",
        },
        {
          mistake: "Stating the range as both endpoints (e.g. 'from 3 to 19') instead of the single difference.",
          fix: "Range is a single number: Range = maximum − minimum = 19 − 3 = 16. Do not report it as an interval.",
        },
      ],
      masteryQuiz: [
        typedQ("y11s-dar-m1", "Find the mean of: 6, 8, 12, 4, 15.", "9", "Add the values: 6 + 8 + 12 + 4 + 15 = 45. Divide by 5: 45 ÷ 5 = 9.", { accepted: ["9.0"], hint: "Add the five values, then divide by 5." }),
        typedQ("y11s-dar-m2", "Find the median of: 11, 4, 7, 9, 2, 15.", "8", "Order the data: 2, 4, 7, 9, 11, 15. With six values the median is the average of the 3rd and 4th: (7 + 9) ÷ 2 = 8.", { accepted: ["8.0"], hint: "Order the six values and average the 3rd and 4th." }),
        typedQ("y11s-dar-m3", "Find the range of: 8, 15, 3, 20, 11.", "17", "Range = highest − lowest = 20 − 3 = 17.", { accepted: ["17.0"], hint: "Subtract the smallest value from the largest." }),
        mcqQ("y11s-dar-m4", "What is the mode of 5, 3, 5, 8, 3, 5, 2?", "B", ["3", "5", "8", "2"], "The mode is the most frequent value. 5 appears three times — more than any other value — so the mode is 5."),
        typedQ("y11s-dar-m5", "Find the median of: 4, 8, 12, 16, 20, 24.", "14", "The data is already ordered with six values, so the median is the average of the 3rd and 4th: (12 + 16) ÷ 2 = 14.", { accepted: ["14.0"], hint: "Average the two middle values." }),
        mcqQ("y11s-dar-m6", "Which measure of centre is most affected by an outlier?", "A", ["Mean", "Median", "Mode", "All are affected equally"], "The mean uses every value in its total, so one extreme value shifts it. The median (position) and mode (most frequent) are barely affected."),
        typedQ("y11s-dar-m7", "Find the mean of: 24, 22, 21, 19, 14.", "20", "Add the values: 24 + 22 + 21 + 19 + 14 = 100. Divide by 5: 100 ÷ 5 = 20.", { accepted: ["20.0"], hint: "Add the five values, then divide by 5." }),
        typedQ(
          "y11s-dar-m8",
          "The dot plot shows daily sales. Which value is the outlier?",
          "22",
          "Most values cluster between 3 and 6. The value 22 sits far above the rest on its own, so it is the outlier.",
          {
            accepted: ["22 sales"],
            hint: "Look for the isolated dot, away from the main cluster.",
            dotPlotDiagram: {
              description: "Dot plot of daily sales: 3 (1), 4 (1), 5 (1), 6 (1), and an isolated value at 22.",
              min: 0,
              max: 25,
              counts: [
                { value: 3, count: 1 },
                { value: 4, count: 1 },
                { value: 5, count: 1 },
                { value: 6, count: 1 },
                { value: 22, count: 1 },
              ],
              axisLabel: "Daily sales",
            },
          },
        ),
        typedQ("y11s-dar-m9", "Find the range of: 100, 45, 72, 88, 60.", "55", "Range = highest − lowest = 100 − 45 = 55.", { accepted: ["55.0"], hint: "Subtract the smallest value from the largest." }),
        mcqQ("y11s-dar-m10", "When a data set contains an outlier, the better measure of centre is usually the:", "B", ["Mean", "Median", "Mode", "Range"], "The median is resistant to outliers because it depends on position, not magnitude. The mean is pulled toward an extreme value, and the range is a measure of spread, not centre."),
      ],
      masteryPassMark: 0.8,
    };
  }

  return null;
}

