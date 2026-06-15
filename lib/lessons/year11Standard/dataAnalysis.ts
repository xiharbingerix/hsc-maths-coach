import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { financeChoice, dataAnswer as baseDataAnswer } from "../questionHelpers";

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
          "\\begin{array}{c|c}\\text{Rating}&\\text{Frequency}\\\\1&2\\\\2&3\\\\3&5\\\\4&8\\\\5&12\\end{array}",
        steps: [
          { explanation: "Frequency tells how many times each rating occurred." },
          { explanation: "The largest frequency is 12 for rating 5." },
        ],
        finalAnswerLatex: "\\text{Rating }5",
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
        questionLatex:
          "\\begin{array}{r|l}\\text{Stem}&\\text{Leaf}\\\\1&2\\quad5\\quad8\\\\2&0\\quad3\\quad6\\quad7\\\\3&1\\quad4\\quad9\\end{array}",
        steps: [
          { explanation: "List all data values in order by reading stems and leaves.", latex: "12,15,18,20,23,26,27,31,34,39\\quad(n=10)" },
          { explanation: "The median of 10 values is the average of the 5th and 6th.", latex: "Q_2 = \\frac{23+26}{2} = 24.5" },
        ],
        finalAnswerLatex: "\\text{Median} = 24.5",
      },
      {
        title: "Comparing two groups in a back-to-back plot",
        questionLatex:
          "\\begin{array}{r|c|l}\\text{Group A}&\\text{Stem}&\\text{Group B}\\\\8\\quad5\\quad2&1&3\\quad7\\\\8\\quad5&2&1\\quad5\\quad8\\\\&3&3\\end{array}",
        steps: [
          { explanation: "Read Group A values right-to-left from the stem: 12, 15, 18, 25, 28. Median = 18.", latex: "\\text{Group A median} = 18" },
          { explanation: "Read Group B values left-to-right: 13, 17, 21, 25, 28, 33. Median = (25+28)/2 = 26.5.", latex: "\\text{Group B median} = 26.5" },
          { explanation: "Group B's higher median means Group B values are typically larger than Group A." },
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
        "Distinguish categorical and numerical data.",
        "Read frequency tables and simple column graphs.",
        "Calculate mean, median, mode and range.",
        "Choose a suitable summary statistic for a context.",
      ],
      teaching: {
        paragraphs: [
          "Data can be categorical, such as transport type, or numerical, such as travel time in minutes.",
          "Frequency tables and column graphs show how often categories or values occur.",
          "The mean is the total divided by the number of values. The median is the middle value after ordering. The mode is the most common value.",
          "The range is the highest value minus the lowest value. It gives a quick measure of spread.",
        ],
        latexBlocks: [
          "\\text{mean}=\\frac{\\text{total}}{\\text{number of values}}",
          "\\text{range}=\\text{highest value}-\\text{lowest value}",
        ],
      },
      guidedPractice: [
        dataAnswer("data-display-g1", "A cafe records coffees sold over five mornings: 42, 38, 45, 51, 44. Find the mean number sold.", "42,\\ 38,\\ 45,\\ 51,\\ 44", "44", ["44.0", "44 coffees"]),
        dataAnswer("data-display-g2", "A delivery team records travel times: 18, 20, 21, 22, 24. Find the median travel time.", "18,\\ 20,\\ 21,\\ 22,\\ 24", "21", ["21 min", "21 minutes"]),
        dataAnswer("data-display-g3", "Daily absences at a school are 6, 4, 9, 7, 5. Find the range.", "6,\\ 4,\\ 9,\\ 7,\\ 5", "5", ["5 absences"]),
        financeChoice("data-display-g4", "A survey asks students to choose bus, train, walk or car. This data is:", "A", ["Categorical", "Numerical continuous", "A time zone", "A percentage error"], "Transport type is a category."),
      ],
      independentPractice: [
        dataAnswer("data-display-i1", "A sports team scores 12, 15, 15, 18 and 20 points in five games. Find the mode.", "12,\\ 15,\\ 15,\\ 18,\\ 20", "15", ["15 points"]),
        dataAnswer("data-display-i2", "A shop records customer counts: 30, 34, 29, 37, 35. Find the mean customer count.", "30,\\ 34,\\ 29,\\ 37,\\ 35", "33", ["33.0", "33 customers"]),
        dataAnswer("data-display-i3", "Study hours over a week are 1, 2, 2, 3, 4, 5, 6. Find the median.", "1,\\ 2,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6", "3", ["3 hours", "3 h"]),
        financeChoice("data-display-i4", "A frequency table has the largest frequency beside rating 4. The mode is:", "C", ["The total frequency", "The smallest rating", "Rating 4", "The range"], "The mode is the category or value with highest frequency."),
        financeChoice("data-display-i5", "A column graph is useful because it shows:", "B", ["Only the mean", "Comparisons between categories", "Only time zones", "Only limits of accuracy"], "Column graphs compare category heights."),
      ],
      commonMistakes: [
        { mistake: "Writing the total as the mean, such as giving 307 for seven cafe sales instead of 307 ÷ 7.", fix: "Divide the total by the number of values to find the mean." },
        { mistake: "Finding the median of an unordered list such as 6, 4, 9, 7, 5 by picking the middle position without sorting.", fix: "Always order the data first: 4, 5, 6, 7, 9. The middle value is 6." },
        { mistake: "Writing the highest value as the range, such as giving 25 for delivery times 12, 15, 17, 20, 25.", fix: "Range = highest - lowest: 25 - 12 = 13." },
        { mistake: "Confusing frequency with the data value.", fix: "Frequency is how often a value or category occurs, not the value itself." },
      ],
      masteryQuiz: [
        dataAnswer("data-display-m1", "A cafe sells 42, 38, 45, 51, 39, 44 and 48 coffees over 7 mornings. Find the mean to 1 decimal place.", "42,\\ 38,\\ 45,\\ 51,\\ 39,\\ 44,\\ 48", "43.9", ["43.86", "43.857", "43.9 coffees"]),
        dataAnswer("data-display-m2", "Temperatures recorded at midday are 21, 23, 24, 24, 26. Find the mode.", "21,\\ 23,\\ 24,\\ 24,\\ 26", "24", ["24 degrees", "24°C", "24 C"]),
        dataAnswer("data-display-m3", "Customer ratings are 2, 3, 3, 4, 5. Find the median rating.", "2,\\ 3,\\ 3,\\ 4,\\ 5", "3", ["3 stars", "rating 3"]),
        dataAnswer("data-display-m4", "Delivery times are 12, 15, 17, 20 and 25 minutes. Find the range.", "12,\\ 15,\\ 17,\\ 20,\\ 25", "13", ["13 min", "13 minutes"]),
        financeChoice("data-display-m5", "Number of pets owned by students is:", "B", ["Categorical only", "Numerical discrete", "A time display", "A unit conversion"], "Pet counts are numerical discrete data."),
        financeChoice("data-display-m6", "A bar chart column for Wednesday is highest. This means Wednesday had:", "A", ["The greatest frequency", "The lowest value", "The median only", "No data"], "The tallest column shows the greatest frequency."),
        dataAnswer("data-display-m7", "A sports team scores in five games: 14, 19, 23, 17, 22. Find the mean score.", "14,\\ 19,\\ 23,\\ 17,\\ 22", "19", ["19 points", "19.0"]),
        financeChoice("data-display-m8", "To find the median of 8, 3, 7, 4, 5, first:", "D", ["Add all values", "Find the highest value", "Draw a map", "Order the data"], "Median requires ordered data."),
        dataAnswer("data-display-m9", "A frequency table shows 6 students chose soccer, 9 chose netball, 4 chose tennis. How many students were surveyed?", "\\text{soccer}=6,\\quad \\text{netball}=9,\\quad \\text{tennis}=4", "19", ["19 students"]),
        financeChoice("data-display-m10", "The best display for comparing favourite subjects is usually:", "C", ["A stopwatch", "A ruler", "A column graph", "A timetable"], "Favourite subjects are categories suited to a column graph."),
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
        "Identify an outlier in a practical data set.",
        "Describe how an outlier can affect the mean.",
        "Choose when median is more appropriate than mean.",
        "Make cautious conclusions from data in context.",
      ],
      teaching: {
        paragraphs: [
          "An outlier is a value that is noticeably far away from the rest of the data.",
          "Outliers can pull the mean toward the unusual value. The median is usually less affected.",
          "When data are skewed or include an unusual result, the median may better represent a typical value.",
          "Conclusions from data should be cautious. A small data set or unusual value may not represent every situation.",
        ],
        latexBlocks: [
          "\\text{outlier}=\\text{value far from the main group}",
          "\\text{median is resistant to outliers}",
        ],
      },
      guidedPractice: [
        dataAnswer("data-outlier-g1", "Delivery times are 18, 20, 21, 22, 23, 24 and 47 minutes. Which value is the outlier?", "18,\\ 20,\\ 21,\\ 22,\\ 23,\\ 24,\\ 47", "47", ["47 min", "47 minutes"]),
        financeChoice("data-outlier-g2", "For delivery times 18, 20, 21, 22, 23, 24, 47, which measure is usually better for a typical delivery time?", "B", ["Mean", "Median", "Range only", "Highest value"], "The median is less affected by the outlier 47."),
        financeChoice("data-outlier-g3", "An outlier usually affects the mean by:", "A", ["Pulling it toward the outlier", "Leaving it always unchanged", "Turning it into the range", "Making it categorical"], "The mean uses every value, including outliers."),
        dataAnswer("data-outlier-g4", "Travel times are 14, 15, 16, 16, 17, 18 and 42 minutes. What is the range?", "14,\\ 15,\\ 16,\\ 16,\\ 17,\\ 18,\\ 42", "28", ["28 min", "28 minutes"]),
      ],
      independentPractice: [
        financeChoice("data-outlier-i1", "A data set of house prices includes one extremely expensive house. Which measure is more resistant?", "C", ["Mean", "Range", "Median", "Total"], "Median is more resistant to an extreme value."),
        dataAnswer("data-outlier-i2", "Customer waiting times are 3, 4, 4, 5, 6 and 19 minutes. Identify the outlier.", "3,\\ 4,\\ 4,\\ 5,\\ 6,\\ 19", "19", ["19 min", "19 minutes"]),
        financeChoice("data-outlier-i3", "A class wants a typical homework time but one student reports 9 hours. The best cautious choice is:", "A", ["Use the median", "Use the maximum only", "Ignore all data", "Use the range as the typical value"], "Median is less affected by the unusually high value."),
        financeChoice("data-outlier-i4", "A conclusion from a survey of 12 people should be:", "D", ["Certain for all students", "Unrelated to data", "Based only on the largest value", "Cautious because the sample is small"], "Small samples support cautious conclusions."),
        dataAnswer("data-outlier-i5", "Daily sales are 38, 40, 41, 42, 43 and 79. What value is likely an outlier?", "38,\\ 40,\\ 41,\\ 42,\\ 43,\\ 79", "79", ["79 sales"]),
      ],
      commonMistakes: [
        { mistake: "Calling the highest value in a data set an outlier without checking how far it sits from the rest.", fix: "An outlier is noticeably separated from the main group, not just the largest value." },
        { mistake: "Using the mean as the typical delivery time for 18, 20, 21, 22, 23, 24, 47 without noticing the outlier.", fix: "The outlier 47 pulls the mean upward. The median 22 better represents a typical delivery time here." },
        { mistake: "Concluding that all deliveries are late from data showing most took 18–24 minutes.", fix: "Match the conclusion to the data: most recorded deliveries were around 18–24 minutes." },
        { mistake: "Giving the range as a typical delivery time.", fix: "Range measures the spread from lowest to highest; it does not describe a typical value." },
      ],
      masteryQuiz: [
        dataAnswer("data-outlier-m1", "Customer wait times are 3, 4, 5, 5, 6, 4, 28 minutes. Which value is the outlier?", "3,\\ 4,\\ 5,\\ 5,\\ 6,\\ 4,\\ 28", "28", ["28 min", "28 minutes"]),
        financeChoice("data-outlier-m2", "In that delivery data set, the median is preferred because:", "B", ["It is always the largest value", "It is less affected by 47", "It includes no data", "It is the same as range"], "Median is resistant to the high outlier."),
        financeChoice("data-outlier-m3", "An outlier in a small data set should make conclusions:", "C", ["More certain", "Impossible always", "More cautious", "Unrelated to context"], "Outliers can distort summaries."),
        dataAnswer("data-outlier-m4", "Sport scores are 8, 9, 10, 10, 11, 30. Identify the outlier.", "8,\\ 9,\\ 10,\\ 10,\\ 11,\\ 30", "30", ["30 points"]),
        dataAnswer("data-outlier-m5", "Temperatures are 19, 20, 21, 21, 22 and 35. What is the range?", "19,\\ 20,\\ 21,\\ 21,\\ 22,\\ 35", "16", ["16 degrees", "16°C", "16 C"]),
        financeChoice("data-outlier-m6", "If an unusually high value is added to a data set, the mean will usually:", "A", ["Increase", "Always decrease", "Become the mode", "Disappear"], "A high outlier pulls the mean upward."),
        financeChoice("data-outlier-m7", "Which statement is cautious and data-based?", "D", ["All deliveries are always late", "The company is perfect", "One value proves everything", "Most recorded deliveries were around 18 to 24 minutes"], "This matches the recorded data without overclaiming."),
        dataAnswer("data-outlier-m8", "Customer ratings are 4, 4, 5, 5, 5 and 1. Which value is unusually low?", "4,\\ 4,\\ 5,\\ 5,\\ 5,\\ 1", "1", ["rating 1", "1 star"]),
        financeChoice("data-outlier-m9", "When an outlier is present, range can become:", "B", ["Smaller always", "Much larger", "The median", "A category"], "Range uses highest and lowest values."),
        financeChoice("data-outlier-m10", "For skewed travel-time data, the best typical value is often:", "C", ["Highest value", "Range", "Median", "Total"], "Median is useful for skewed data."),
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
        "Identify the modal class as the class interval with the highest frequency.",
        "Find the midpoint of a class interval.",
        "Multiply each midpoint by its frequency and sum to find Σ(f × m).",
        "Estimate the mean by dividing Σ(f × m) by the total frequency.",
      ],
      teaching: {
        paragraphs: [
          "When data are grouped into class intervals such as 10–19 or 20–29, we cannot see exact values — only how many fall in each class. This is called a grouped frequency table.",
          "The modal class is the class interval with the highest frequency. It is the most common class, but it is not a single value like an ordinary mode.",
          "To estimate the mean, assume all values in a class are equal to the midpoint of that class. The midpoint of 10–19 is (10 + 19) ÷ 2 = 14.5. Multiply each midpoint by its class frequency, sum those products, then divide by the total frequency.",
          "This gives an estimate, not an exact mean, because we do not know the exact value of each individual data point within each class.",
        ],
        latexBlocks: [
          "\\text{midpoint} = \\frac{\\text{lower boundary} + \\text{upper boundary}}{2}",
          "\\text{estimated mean} = \\frac{\\sum f \\times m}{\\sum f}",
        ],
      },
      guidedPractice: [
        financeChoice(
          "data-group-g1",
          "In a grouped frequency table, a class interval such as '20–29' means:",
          "B",
          ["Only the value 20 is included", "Values from 20 up to and including 29", "Only the value 29 is included", "Values less than 20"],
          "A class interval covers all values between and including both boundaries.",
        ),
        dataAnswer("data-group-g2", "A frequency table has intervals 0–9, 10–19, 20–29, 30–39 with frequencies 2, 5, 8, 5. Find the total number of data values.", "2+5+8+5", "20", ["20 values"]),
        dataAnswer("data-group-g3", "Using that frequency table, which is the modal class?", "\\text{Frequencies: }2,\\ 5,\\ 8,\\ 5\\text{ for intervals }0\\text{–}9,\\ 10\\text{–}19,\\ 20\\text{–}29,\\ 30\\text{–}39", "20–29", ["20-29", "20 to 29", "the 20–29 class"]),
        dataAnswer("data-group-g4", "Find the midpoint of the class interval 10–19.", "\\frac{10+19}{2}", "14.5", ["14.5"]),
      ],
      independentPractice: [
        dataAnswer("data-group-i1", "Using intervals 0–9, 10–19, 20–29, 30–39 with frequencies 2, 5, 8, 5 and midpoints 4.5, 14.5, 24.5, 34.5, find f × m for the class 20–29.", "8 \\times 24.5", "196", ["196"]),
        dataAnswer("data-group-i2", "Find the total Σ(f × m) for all four classes: (2×4.5) + (5×14.5) + (8×24.5) + (5×34.5).", "9 + 72.5 + 196 + 172.5", "450", ["450"]),
        dataAnswer("data-group-i3", "Estimate the mean using Σ(f × m) = 450 and total frequency = 20.", "\\frac{450}{20}", "22.5", ["22.5"]),
        financeChoice(
          "data-group-i4",
          "A frequency polygon is drawn by:",
          "A",
          ["Plotting class midpoints against frequencies and joining the points with straight lines", "Drawing one bar per class with no gaps", "Plotting individual raw data values against time", "Drawing a pie sector for each class"],
          "A frequency polygon joins the midpoints of each class plotted against their frequencies.",
        ),
        dataAnswer("data-group-i5", "A frequency table has intervals 0–4, 5–9, 10–14 with frequencies 3, 10, 7. What is the modal class?", "\\text{Frequencies: }3,\\ 10,\\ 7", "5–9", ["5-9", "5 to 9", "the 5–9 class"]),
      ],
      commonMistakes: [
        { mistake: "Identifying the modal class as the class with the largest midpoint, not the highest frequency.", fix: "The modal class has the highest frequency. Check the frequency column, not the interval boundaries." },
        { mistake: "Forgetting to divide by total frequency when estimating the mean — giving 450 instead of 22.5.", fix: "Estimated mean = Σ(f × m) ÷ Σf. Always divide the sum of products by the total number of data values." },
        { mistake: "Using the class boundaries (10 and 19) rather than their average (14.5) as the midpoint.", fix: "Midpoint = (lower + upper) ÷ 2. For 10–19, midpoint = (10 + 19) ÷ 2 = 14.5." },
        { mistake: "Using the class frequency as the estimate for each data value instead of the midpoint.", fix: "Multiply the midpoint (not the frequency) by the frequency: f × m, then sum all products." },
      ],
      masteryQuiz: [
        financeChoice(
          "data-group-m1",
          "In a grouped frequency table, the modal class is:",
          "B",
          ["The class with the smallest frequency", "The class with the highest frequency", "The class with the largest midpoint", "The class in the middle of the table"],
          "The modal class is the most common class — it has the highest frequency.",
        ),
        dataAnswer("data-group-m2", "A table has intervals 10–19, 20–29, 30–39, 40–49 with frequencies 4, 8, 12, 6. Find the modal class.", "\\text{Frequencies: }4,\\ 8,\\ 12,\\ 6", "30–39", ["30-39", "30 to 39", "the 30–39 class"]),
        dataAnswer("data-group-m3", "Find the total number of data values for that table.", "4+8+12+6", "30", ["30 values"]),
        dataAnswer("data-group-m4", "Find the midpoint of the class interval 20–29.", "\\frac{20+29}{2}", "24.5", ["24.5"]),
        dataAnswer("data-group-m5", "Find f × m for the class 30–39 (frequency 12, midpoint 34.5).", "12 \\times 34.5", "414", ["414"]),
        dataAnswer("data-group-m6", "The sum of all f × m values is 935. Total frequency is 30. Estimate the mean to 1 decimal place.", "\\frac{935}{30}", "31.2", ["31.17", "31.2"]),
        financeChoice(
          "data-group-m7",
          "Why do we use midpoints to estimate the mean from grouped data?",
          "B",
          ["Because all values in a class equal the lower boundary", "Because midpoints represent the best estimate for each value in the class when exact values are unknown", "Because the class total is always equal to the midpoint", "Because grouped data has no variability"],
          "Without knowing exact values, the midpoint is the best single estimate for all data in that class.",
        ),
        dataAnswer("data-group-m8", "A table has intervals 0–4, 5–9, 10–14, 15–19 with frequencies 2, 6, 10, 2. Find the modal class.", "\\text{Frequencies: }2,\\ 6,\\ 10,\\ 2", "10–14", ["10-14", "10 to 14", "the 10–14 class"]),
        financeChoice(
          "data-group-m9",
          "A frequency polygon joins which set of points?",
          "B",
          ["Class boundaries plotted against cumulative frequency", "Class midpoints plotted against frequency", "Raw data values plotted against time", "Class upper endpoints only"],
          "A frequency polygon uses midpoints on the x-axis and frequencies on the y-axis.",
        ),
        dataAnswer("data-group-m10", "Intervals 5–9, 10–14, 15–19 have frequencies 3, 7, 5. Estimate the mean using midpoints 7, 12, 17.", "\\frac{3\\times7 + 7\\times12 + 5\\times17}{15} = \\frac{190}{15}", "12.7", ["12.67", "12.7"]),
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
        "Find the minimum, Q1, median (Q2), Q3 and maximum from ordered data.",
        "Calculate IQR = Q3 − Q1.",
        "Calculate lower and upper fences using the 1.5 × IQR rule.",
        "Identify values outside the fences as outliers, and compare two box plots using medians and IQR.",
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
        financeChoice(
          "data-box-g1",
          "Which five values make up the five-number summary?",
          "B",
          ["Mean, mode, range, max, min", "Min, Q1, median, Q3, max", "Min, mean, mode, Q3, max", "Mean, Q1, Q2, Q3, range"],
          "The five-number summary is: minimum, Q1, median (Q2), Q3, maximum.",
        ),
        dataAnswer("data-box-g2", "Ordered data: 3, 7, 8, 10, 12, 14, 15, 18, 20, 25 (n = 10). Find the median Q2.", "Q_2 = \\frac{12+14}{2}", "13", ["13"]),
        dataAnswer("data-box-g3", "Using Q1 = 8 and Q3 = 18, find the IQR.", "Q_3 - Q_1 = 18 - 8", "10", ["10"]),
        dataAnswer("data-box-g4", "Find the upper fence: Q3 + 1.5 × IQR = 18 + 1.5 × 10.", "18 + 15", "33", ["33"]),
      ],
      independentPractice: [
        dataAnswer("data-box-i1", "Ordered lower half: 3, 7, 8, 10, 12. Find Q1 (the median of this group).", "\\text{middle of }\\{3,\\ 7,\\ 8,\\ 10,\\ 12\\}", "8", ["8"]),
        dataAnswer("data-box-i2", "Ordered upper half: 14, 15, 18, 20, 25. Find Q3 (the median of this group).", "\\text{middle of }\\{14,\\ 15,\\ 18,\\ 20,\\ 25\\}", "18", ["18"]),
        financeChoice(
          "data-box-i3",
          "Lower fence = Q1 − 1.5 × IQR = 8 − 15 = −7. Is the minimum value of 3 an outlier?",
          "B",
          ["Yes — 3 is less than −7", "No — 3 is greater than −7, so it is within the fence", "Yes — 3 is the smallest value", "Cannot determine without more data"],
          "3 > −7, so the minimum is within the lower fence and is not an outlier.",
        ),
        financeChoice(
          "data-box-i4",
          "Two box plots are compared. Group A has median 14 and Group B has median 20. Which group typically scored higher?",
          "B",
          ["Group A", "Group B", "Both the same", "Cannot tell from medians alone"],
          "A higher median means Group B's typical value is higher.",
        ),
        financeChoice(
          "data-box-i5",
          "Group A has IQR = 6 and Group B has IQR = 12. Which group shows more spread in the middle 50% of scores?",
          "B",
          ["Group A — smaller IQR means more spread", "Group B — larger IQR means more spread", "Neither group has any spread", "IQR does not measure spread"],
          "A larger IQR means the middle 50% of data is more spread out.",
        ),
      ],
      commonMistakes: [
        { mistake: "Splitting data into halves incorrectly for Q1 and Q3 when n is even.", fix: "For 10 values, the lower half is the first 5 values and the upper half is the last 5. Q1 and Q3 are their respective medians." },
        { mistake: "Applying the 1.5 × IQR rule to all values, not just those outside the fences.", fix: "Only values below the lower fence or above the upper fence are outliers. Check each extreme value against the fence." },
        { mistake: "Subtracting IQR from Q3 or adding IQR to Q1 when calculating fences.", fix: "Lower fence = Q1 − 1.5 × IQR (subtract from Q1). Upper fence = Q3 + 1.5 × IQR (add to Q3)." },
        { mistake: "Stating that a larger IQR means the data has a higher median.", fix: "IQR measures spread of the middle 50%, not the centre. Compare medians for typical values and IQR for variability." },
      ],
      masteryQuiz: [
        dataAnswer("data-box-m1", "Ordered data: 5, 9, 11, 13, 15, 17, 19, 22 (n = 8). Find the median Q2.", "Q_2 = \\frac{13+15}{2}", "14", ["14"]),
        dataAnswer("data-box-m2", "Lower half: 5, 9, 11, 13. Find Q1.", "Q_1 = \\frac{9+11}{2}", "10", ["10"]),
        dataAnswer("data-box-m3", "Upper half: 15, 17, 19, 22. Find Q3.", "Q_3 = \\frac{17+19}{2}", "18", ["18"]),
        dataAnswer("data-box-m4", "Find the IQR using Q1 = 10 and Q3 = 18.", "18 - 10", "8", ["8"]),
        financeChoice(
          "data-box-m5",
          "The IQR measures:",
          "B",
          ["The range of all data values", "The spread of the middle 50% of data", "The mean of Q1 and Q3", "The distance from the minimum to the median"],
          "IQR = Q3 − Q1 covers the spread of the central half of the data.",
        ),
        dataAnswer("data-box-m6", "Find the upper fence: Q3 + 1.5 × IQR = 18 + 1.5 × 8.", "18 + 12", "30", ["30"]),
        dataAnswer("data-box-m7", "Find the lower fence: Q1 − 1.5 × IQR = 10 − 1.5 × 8.", "10 - 12", "-2", ["−2", "-2"]),
        financeChoice(
          "data-box-m8",
          "A value is an outlier by the IQR rule if it is:",
          "C",
          ["Less than Q1", "Greater than Q3", "More than 1.5 × IQR below Q1 or above Q3", "Equal to the median"],
          "Only values outside the fences (Q1 − 1.5×IQR or Q3 + 1.5×IQR) are outliers.",
        ),
        financeChoice(
          "data-box-m9",
          "The maximum value is 22. The upper fence is 30. Is 22 an outlier?",
          "B",
          ["Yes — 22 is the maximum", "No — 22 < 30, so it is within the fence", "Yes — it is above Q3", "Cannot determine"],
          "22 < 30 (upper fence), so 22 is within the fence and is not an outlier.",
        ),
        financeChoice(
          "data-box-m10",
          "Comparing two box plots, the medians tell you about:",
          "B",
          ["The total range of each group", "The typical value in each group", "The spread only, not the centre", "The outliers only"],
          "Comparing medians tells you which group typically has higher or lower values.",
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
        financeChoice(
          "data-stem-g1",
          "In a stem-and-leaf plot, if stem = 3 and leaf = 5, the data value is:",
          "A",
          ["35", "53", "3.5", "8"],
          "Combine stem and leaf: 3|5 = 35.",
        ),
        dataAnswer("data-stem-g2", "A plot has stem 1 with leaves 2, 5, 8 and stem 2 with leaves 0, 3, 6, 7. How many data values are there in total?", "3 + 4", "7", ["7 values"]),
        dataAnswer("data-stem-g3", "The 7 values in order are: 12, 15, 18, 20, 23, 26, 27. Find the median.", "\\text{4th value of 7}", "20", ["20"]),
        financeChoice(
          "data-stem-g4",
          "In a back-to-back stem-and-leaf plot:",
          "A",
          ["Both groups share the same central stem column", "Each group has a separate stem column on opposite sides", "Only one group's data is shown at a time", "Stems are listed in columns rather than rows"],
          "The stem is shared in the centre; Group A's leaves go left and Group B's go right.",
        ),
      ],
      independentPractice: [
        dataAnswer("data-stem-i1", "A back-to-back plot shows Group A leaves 8, 5, 2 on stem 1 (reading right-to-left: 12, 15, 18) and leaves 8, 5 on stem 2 (25, 28). What is Group A's largest value?", "\\text{Group A values: }12,15,18,25,28", "28", ["28"]),
        dataAnswer("data-stem-i2", "Group A data in order: 12, 15, 18, 25, 28. Find the median.", "\\text{3rd of 5 values}", "18", ["18"]),
        dataAnswer("data-stem-i3", "Group B data in order: 13, 17, 21, 25, 28, 33. Find the median.", "\\frac{25+28}{2}", "26.5", ["26.5"]),
        financeChoice(
          "data-stem-i4",
          "Comparing Group A (median 18) and Group B (median 26.5), which is most accurate?",
          "B",
          ["Group A typically scored higher than Group B", "Group B typically scored higher than Group A", "Both groups have identical distributions", "Medians cannot be compared in back-to-back plots"],
          "Group B's higher median means Group B values are typically larger.",
        ),
        dataAnswer("data-stem-i5", "Group A data: 12, 15, 18, 25, 28. Find the range.", "28 - 12", "16", ["16"]),
      ],
      commonMistakes: [
        { mistake: "Reading Group A leaves left-to-right instead of right-to-left in a back-to-back plot.", fix: "Group A (left side) is read from the stem outward — right to left. 8, 5, 2 on stem 1 gives values 12, 15, 18 (not 82, 51, 21)." },
        { mistake: "Forgetting to count both stems' leaves when finding the total number of data values.", fix: "Count every leaf in the plot — not just one stem. Add up all leaves across all stems." },
        { mistake: "Confusing stem 2, leaf 3 with the value 2.3 or 23 without checking the context.", fix: "For two-digit numbers, stem is the tens digit and leaf is the units digit: 2|3 = 23." },
        { mistake: "Comparing the two groups by looking at individual leaf values rather than medians and ranges.", fix: "Summarise each group with its median (typical value) and range (spread) before making a comparison statement." },
      ],
      masteryQuiz: [
        financeChoice(
          "data-stem-m1",
          "In a stem-and-leaf plot, stem 2 with leaves 2, 5, 8 represents which values?",
          "B",
          ["2, 5, 8", "22, 25, 28", "2.2, 2.5, 2.8", "225 and 28"],
          "Combine stem 2 with each leaf: 22, 25, 28.",
        ),
        dataAnswer("data-stem-m2", "A plot has stems 1, 2, 3, 4 with 3, 3, 3, 1 leaves respectively. How many data values are there?", "3+3+3+1", "10", ["10 values"]),
        dataAnswer("data-stem-m3", "Data values in order: 14, 16, 19, 22, 25, 28, 30, 33, 37, 41 (n = 10). Find the median.", "\\frac{25+28}{2}", "26.5", ["26.5"]),
        dataAnswer("data-stem-m4", "Find the range of that dataset (min 14, max 41).", "41 - 14", "27", ["27"]),
        financeChoice(
          "data-stem-m5",
          "The main advantage of a stem-and-leaf plot over a simple list of values is:",
          "A",
          ["It displays data in numerical order and allows the shape of the distribution to be seen", "It hides individual data values", "It is only useful for data values below 10", "It calculates the mean automatically"],
          "Stem-and-leaf plots preserve individual values while also showing the overall shape of the distribution.",
        ),
        financeChoice(
          "data-stem-m6",
          "A back-to-back plot shows Group A leaves 4, 7, 9 (read right-to-left) on stem 1. What are those Group A values?",
          "B",
          ["1, 4, 7, 9", "14, 17, 19", "41, 71, 91", "4, 7, 9"],
          "Read left from stem 1: leaves 4, 7, 9 give values 14, 17, 19.",
        ),
        dataAnswer("data-stem-m7", "Group A data in order: 14, 17, 19, 23, 28, 32. Find the median.", "\\frac{19+23}{2}", "21", ["21"]),
        dataAnswer("data-stem-m8", "Group B data in order: 12, 16, 21, 25, 29, 30, 34, 38. Find the median.", "\\frac{25+29}{2}", "27", ["27"]),
        financeChoice(
          "data-stem-m9",
          "Comparing Group A (median 21) and Group B (median 27), which conclusion is most appropriate?",
          "B",
          ["Group A has higher typical values than Group B", "Group B has higher typical values than Group A", "Both groups are identical", "Medians cannot be compared in back-to-back plots"],
          "Group B's higher median indicates Group B values are typically larger.",
        ),
        dataAnswer("data-stem-m10", "Group A data: 14, 17, 19, 23, 28, 32. Find the range.", "32 - 14", "18", ["18"]),
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
        financeChoice(
          "data-time-g1",
          "In a time series graph, time is placed on the x-axis. This means time is the:",
          "B",
          ["Dependent variable", "Independent variable", "Mean of the data", "Range of the data"],
          "Time is the independent variable — it is what we measure the other quantity against.",
        ),
        financeChoice(
          "data-time-g2",
          "Monthly sales (Jan–Jun): 40, 45, 42, 50, 55, 58. The overall trend is:",
          "A",
          ["Increasing — sales are generally rising despite one dip", "Decreasing — sales are falling overall", "Stable — no change over time", "Random with no trend"],
          "Despite a dip in March, the overall direction from 40 to 58 is increasing.",
        ),
        financeChoice(
          "data-time-g3",
          "A trend line predicts July sales of 62. One reason this prediction may be unreliable is:",
          "B",
          ["Predictions are always exact if the trend line is drawn correctly", "The trend may not continue — seasonal changes or competition could alter sales", "January data is incorrectly recorded", "62 is too large a number to be a valid prediction"],
          "Predictions beyond the data range are uncertain — real conditions may change.",
        ),
        dataAnswer("data-time-g4", "Sales were 42 in March (month 3) and 55 in May (month 5). Find the average rate of increase per month.", "\\frac{55-42}{5-3} = \\frac{13}{2}", "6.5", ["6.5 per month"]),
      ],
      independentPractice: [
        financeChoice(
          "data-time-i1",
          "Weekly café customers: 80, 85, 90, 88, 95. The overall trend is:",
          "B",
          ["Decreasing — customer numbers are falling", "Increasing — customer numbers are generally rising", "Perfectly constant from week to week", "Cannot be determined from 5 data points"],
          "The overall direction from 80 to 95 is increasing despite one dip.",
        ),
        dataAnswer("data-time-i2", "A trend line predicts Week 6 customers as 100. Find the increase from Week 1 (80) to this prediction.", "100 - 80", "20", ["20 customers", "20"]),
        financeChoice(
          "data-time-i3",
          "Annual rainfall (mm): 600, 580, 620, 560, 590. This time series is best described as:",
          "C",
          ["Strongly increasing", "Strongly decreasing", "Fluctuating with no clear overall trend", "Constant at 590 mm"],
          "The values alternate up and down without a consistent direction.",
        ),
        financeChoice(
          "data-time-i4",
          "Monthly temperatures: Jan 22, Feb 25, Mar 28, Apr 26, May 20, Jun 16, Jul 14°C. The pattern is best described as:",
          "B",
          ["Constant throughout the year", "Increasing then decreasing — a seasonal pattern", "Decreasing then increasing — a U-shape", "No change from month to month"],
          "Temperatures rise into summer (Jan–Mar) and fall towards winter (Apr–Jul) — a seasonal pattern.",
        ),
        financeChoice(
          "data-time-i5",
          "A trend line predicts sales of 200 in 3 months. Actual sales turn out to be 185. The prediction was:",
          "B",
          ["Exactly correct", "Too high by 15", "Too low by 15", "Impossible to evaluate"],
          "Predicted 200, actual 185: 200 − 185 = 15 too high.",
        ),
      ],
      commonMistakes: [
        { mistake: "Describing a trend based on one or two data points rather than the overall pattern.", fix: "Look at the general direction from the first point to the last. A single dip or spike does not change an overall increasing trend." },
        { mistake: "Stating a prediction as certain rather than cautious.", fix: "Predictions from trend lines are estimates. Always use language like 'approximately' or 'based on the trend' to acknowledge uncertainty." },
        { mistake: "Describing the range of values as the 'trend'.", fix: "Trend describes the direction of change over time (increasing, decreasing, fluctuating), not the numerical range." },
        { mistake: "Using the rate of change between just two points to make long-term predictions as if they were exact.", fix: "The average rate of change gives an estimate, but real data rarely follows a perfectly constant rate over a long period." },
      ],
      masteryQuiz: [
        financeChoice(
          "data-time-m1",
          "Monthly revenue ($000s): 12, 15, 14, 17, 18, 20. The overall trend is:",
          "B",
          ["Revenue is generally decreasing over time", "Revenue is generally increasing over time", "Revenue is perfectly stable", "Revenue fluctuates randomly with no trend"],
          "The overall direction from 12 to 20 over 6 months is increasing.",
        ),
        dataAnswer("data-time-m2", "Find the average monthly increase from month 1 (revenue $12k) to month 6 (revenue $20k).", "\\frac{20-12}{6-1} = \\frac{8}{5}", "1.6", ["1.6 per month", "$1.6k per month"]),
        financeChoice(
          "data-time-m3",
          "Using the average rate of $1.6k per month, a prediction for month 7 would be approximately:",
          "A",
          ["20 + 1.6 = $21.6k", "20 + 6 = $26k", "20 + 0.16 = $20.16k", "12 + 20 = $32k"],
          "Add one more period's average increase to the last known value: 20 + 1.6 = 21.6.",
        ),
        dataAnswer("data-time-m4", "Website visits per day: Mon 200, Tue 210, Wed 195, Thu 220, Fri 230. Find the range of daily visits.", "230 - 195", "35", ["35 visits", "35"]),
        financeChoice(
          "data-time-m5",
          "A decreasing trend in a time series means:",
          "B",
          ["Each value is exactly smaller than the previous one", "The overall pattern shows a decline over time, though individual values may occasionally rise", "All data values are negative", "The time axis must be reversed"],
          "A decreasing trend is about the overall direction, not every single step.",
        ),
        financeChoice(
          "data-time-m6",
          "Annual rainfall: 450, 420, 460, 430, 410, 390 mm. The trend is:",
          "B",
          ["Increasing overall", "Decreasing overall", "Stable with no trend", "A repeating seasonal pattern"],
          "Despite one rise to 460, the overall direction from 450 to 390 is decreasing.",
        ),
        financeChoice(
          "data-time-m7",
          "A trend line predicts rainfall of 370 mm next year. One reason this may be unreliable is:",
          "B",
          ["Any prediction from 6 data points is always wrong", "Rainfall is affected by climate events not captured in the past 6-year trend", "The trend line must always be horizontal", "370 mm is an impossible rainfall amount"],
          "Climate variability means the trend may change — extrapolation is always uncertain.",
        ),
        dataAnswer("data-time-m8", "Daily temperatures for a week: 18, 20, 22, 21, 24, 26, 23. Find the mean temperature.", "\\frac{18+20+22+21+24+26+23}{7} = \\frac{154}{7}", "22", ["22°C", "22 degrees"]),
        dataAnswer("data-time-m9", "Find the range of that week's temperatures (max 26, min 18).", "26 - 18", "8", ["8°C", "8 degrees"]),
        financeChoice(
          "data-time-m10",
          "A cautious conclusion from an increasing time series trend is:",
          "B",
          ["The increase will definitely continue forever based on past data", "Based on past data, an increase appears likely, but the trend may not continue", "Only decreasing trends can generate valid predictions", "Time series data cannot be used to support any predictions"],
          "Predictions should acknowledge that real conditions may change.",
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
        "Data analysis exam questions often combine calculations with interpretation.",
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
      dataAnswer("data-exam-g1", "A table shows cafe sales: Mon 42, Tue 38, Wed 45, Thu 51, Fri 44. What is the total sales count?", "42,\\ 38,\\ 45,\\ 51,\\ 44", "220", ["220 coffees"]),
      dataAnswer("data-exam-g2", "The same cafe sales are 42, 38, 45, 51 and 44. Find the mean.", "42,\\ 38,\\ 45,\\ 51,\\ 44", "44", ["44.0", "44 coffees"]),
      financeChoice("data-exam-g3", "A delivery time data set has 18, 20, 21, 22, 23, 24, 47. Which measure is better for a typical time?", "B", ["Mean", "Median", "Maximum", "Total"], "Median is less affected by the outlier."),
      financeChoice("data-exam-g4", "A column graph has the tallest column on Friday. Friday had the:", "A", ["Greatest frequency", "Smallest value", "Median only", "Range"], "The tallest column shows the greatest frequency."),
    ],
    independentPractice: [
      dataAnswer("data-exam-i1", "Absences over five days are 4, 6, 5, 8 and 7. Find the mean absences.", "4,\\ 6,\\ 5,\\ 8,\\ 7", "6", ["6.0", "6 absences"]),
      dataAnswer("data-exam-i2", "Customer ratings are 2, 3, 4, 4, 5. Find the mode.", "2,\\ 3,\\ 4,\\ 4,\\ 5", "4", ["rating 4", "4 stars"]),
      dataAnswer("data-exam-i3", "Travel times are 12, 14, 15, 15, 18 and 34 minutes. Find the range.", "12,\\ 14,\\ 15,\\ 15,\\ 18,\\ 34", "22", ["22 min", "22 minutes"]),
      financeChoice("data-exam-i4", "The value 34 in the travel-time data is likely to:", "C", ["Lower the mean", "Not affect any statistic", "Pull the mean upward", "Turn the data categorical"], "A high outlier increases the mean."),
      financeChoice("data-exam-i5", "A careful conclusion from a survey should:", "D", ["Ignore the data", "Claim it proves all people agree", "Use only the highest value", "Match the data and avoid overclaiming"], "Data conclusions should be cautious."),
    ],
    commonMistakes: [
      { mistake: "Including a row total shown in the table when calculating mean or range.", fix: "Use only the listed data values, not any totals that the table already shows." },
      { mistake: "Writing 220 as the mean for Monday–Friday sales that add up to 220.", fix: "Divide the total by the number of values: 220 ÷ 5 = 44." },
      { mistake: "Reporting the mean of 18, 20, 21, 22, 23, 24, 47 without noticing that 47 is an outlier.", fix: "When an unusual value skews the mean, use the median as the typical value instead." },
      { mistake: "Writing 'all customers prefer rating 5' from a frequency table where rating 5 has the highest count.", fix: "High frequency shows the most common response, not universal preference — use cautious wording." },
    ],
    masteryQuiz: [
      dataAnswer("data-exam-m1", "A sports club records attendance over five events: 85, 92, 78, 96, 89. Find the mean attendance.", "85,\\ 92,\\ 78,\\ 96,\\ 89", "88", ["88.0", "88 people", "88 students"]),
      dataAnswer("data-exam-m2", "Study hours are 1, 2, 2, 3, 4, 5, 6. Find the median.", "1,\\ 2,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6", "3", ["3 hours", "3 h"]),
      dataAnswer("data-exam-m3", "Daily temperatures are 18, 21, 22, 23, 25. Find the range.", "18,\\ 21,\\ 22,\\ 23,\\ 25", "7", ["7 degrees", "7°C", "7 C"]),
      financeChoice("data-exam-m4", "A frequency table shows 12 students chose bus, 7 chose train and 5 chose walk. Which category is most common?", "A", ["Bus", "Train", "Walk", "No category"], "Bus has the greatest frequency."),
      dataAnswer("data-exam-m5", "Test scores are 55, 60, 62, 65, 68, 97. Which score is likely the outlier?", "55,\\ 60,\\ 62,\\ 65,\\ 68,\\ 97", "97", ["97 points", "score 97"]),
      financeChoice("data-exam-m6", "With the delivery-time outlier present, the better typical measure is:", "C", ["Range", "Maximum", "Median", "Total"], "Median is less affected by the outlier."),
      dataAnswer("data-exam-m7", "A survey has 18 yes responses out of 30 students. What percentage said yes?", "\\text{yes}=18,\\quad \\text{total}=30", "60%", ["60", "60 percent", "60percent", "60 %"]),
      financeChoice("data-exam-m8", "A column graph is read by:", "B", ["Choosing the smallest label only", "Matching each category to its column height", "Ignoring frequencies", "Using time zones"], "Column height gives the value or frequency."),
      dataAnswer("data-exam-m9", "Sport scores are 9, 12, 12, 15 and 17. Find the mode.", "9,\\ 12,\\ 12,\\ 15,\\ 17", "12", ["12 points"]),
      financeChoice("data-exam-m10", "A practical conclusion should be based on:", "D", ["A guess", "Only the largest number", "No context", "The data and its limitations"], "Conclusions should reflect the data carefully."),
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
        dataAnswer(
          "y11s-dcs-g2",
          "A company has 300 full-time and 200 part-time workers. A stratified sample of 50 is needed. How many full-time workers should be in the sample?",
          "\\frac{300}{500} \\times 50",
          "30",
          ["30 full-time", "30 workers"]
        ),
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
        financeChoice("y11s-dcs-m1", "A census collects data from:", "C", ["A random group", "A stratified group", "Every member of the population", "A self-selected group"], "Census = entire population."),
        dataAnswer("y11s-dcs-m2", "A company has 240 full-time and 160 part-time staff. A stratified sample of 50 is needed. How many part-time staff are selected?", "\\frac{160}{400} \\times 50", "20", ["20 part-time", "20 staff"]),
        financeChoice("y11s-dcs-m3", "Simple random sampling uses:", "B", ["Only volunteers", "Equal probability for every individual", "Subgroup proportions", "Every 5th person on a list"], "Every individual has an equal chance of selection."),
        financeChoice("y11s-dcs-m4", "A survey only emailed to club members and asking about club satisfaction is likely to have:", "A", ["Self-selection bias", "Stratified accuracy", "Random error only", "No bias at all"], "Only members who choose to respond reply, skewing results toward those with strong opinions."),
        financeChoice("y11s-dcs-m5", "Which question is least biased?", "D", ["Don't you love sport?", "How much of your day do you waste sitting?", "Isn't exercise clearly better than TV?", "How many hours per week do you exercise?"], "Option D is factual and neutral."),
        dataAnswer("y11s-dcs-m6", "A school has 600 students: 200 Year 10, 200 Year 11, 200 Year 12. A stratified sample of 90 is needed. How many from each year?", "\\frac{200}{600} \\times 90 = 30 \\text{ per year}", "30", ["30 each", "30 per year"]),
        financeChoice("y11s-dcs-m7", "Stratified sampling divides the population into:", "B", ["Random groups", "Subgroups (strata) based on a characteristic", "Groups of 10 only", "Alphabetical lists"], "Strata are subgroups sharing a common characteristic."),
        financeChoice("y11s-dcs-m8", "Increasing the sample size will NOT fix bias caused by:", "C", ["Random error", "Sampling variability", "Convenience sampling", "Rounding errors"], "Bias from convenience sampling means the method excluded parts of the population — more observations from the same biased method do not fix this."),
        financeChoice("y11s-dcs-m9", "Primary data is data that:", "A", ["You collect yourself for this investigation", "Already exists in published reports", "Is always more biased than secondary data", "Can only come from a census"], "Primary data is collected directly by the researcher for the current purpose."),
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
        dataAnswer(
          "y11s-dar-g1",
          "Find the mean of: 5, 8, 11, 6, 10.",
          "\\bar{x} = (5+8+11+6+10) \\div 5 = 40 \\div 5",
          "8",
          ["8.0", "mean=8"]
        ),
        dataAnswer(
          "y11s-dar-g2",
          "Find the median of: 3, 7, 2, 9, 5.",
          "\\text{Order: }2,3,5,7,9\\text{ → middle value}",
          "5",
          ["5.0", "median=5"]
        ),
        dataAnswer(
          "y11s-dar-g3",
          "Find the range of: 12, 7, 19, 4, 15.",
          "\\text{Range} = 19 - 4",
          "15",
          ["15.0", "range=15"]
        ),
        financeChoice(
          "y11s-dar-g4",
          "The mode of the dataset 4, 6, 6, 7, 8, 8, 8 is:",
          "C",
          ["6", "7", "8", "4"],
          "8 appears 3 times — more than any other value."
        ),
      ],
      independentPractice: [
        dataAnswer(
          "y11s-dar-i1",
          "Find the mean of: 14, 18, 22, 10, 16.",
          "\\bar{x} = (14+18+22+10+16) \\div 5 = 80 \\div 5",
          "16",
          ["16.0"]
        ),
        dataAnswer(
          "y11s-dar-i2",
          "Find the median of: 8, 3, 12, 5, 9, 7.",
          "\\text{Order: }3,5,7,8,9,12\\text{; median} = (7+8)/2",
          "7.5",
          ["7.5", "median=7.5"]
        ),
        dataAnswer(
          "y11s-dar-i3",
          "Find the range of: 23, 41, 17, 35, 29.",
          "41 - 17",
          "24",
          ["24.0"]
        ),
        financeChoice(
          "y11s-dar-i4",
          "In which dataset is the mean most affected by an outlier?",
          "D",
          ["10, 11, 12, 13", "5, 6, 7, 8, 9", "100, 101, 102", "2, 3, 4, 5, 100"],
          "In option D, 100 is far from 2-5, pulling the mean up significantly."
        ),
        dataAnswer(
          "y11s-dar-i5",
          "Scores: 55, 60, 65, 70, 75. Find the median.",
          "\\text{5 values — middle (3rd) value}",
          "65",
          ["65.0"]
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
        dataAnswer("y11s-dar-m1", "Find the mean of: 6, 9, 12, 3, 15.", "\\bar{x} = 45 \\div 5", "9", ["9.0"]),
        dataAnswer("y11s-dar-m2", "Find the median of: 11, 4, 7, 9, 2.", "\\text{Order: }2,4,7,9,11\\text{ → middle}", "7", ["7.0"]),
        dataAnswer("y11s-dar-m3", "Find the range of: 8, 15, 3, 20, 11.", "20 - 3", "17", ["17.0"]),
        financeChoice("y11s-dar-m4", "The mode of 5, 3, 5, 8, 3, 5, 2 is:", "B", ["3", "5", "8", "2"], "5 appears 3 times — more than any other value."),
        dataAnswer("y11s-dar-m5", "Find the median of: 4, 8, 12, 16, 20, 24.", "(12+16)\\div 2", "14", ["14.0"]),
        financeChoice("y11s-dar-m6", "Which measure is most affected by an outlier?", "A", ["Mean", "Median", "Mode", "Range is always the same"], "The mean uses every value; a single extreme value can shift it significantly."),
        dataAnswer("y11s-dar-m7", "Dataset: 20, 22, 21, 19, 18. Find the mean.", "\\bar{x} = 100 \\div 5", "20", ["20.0"]),
        financeChoice("y11s-dar-m8", "A dataset has values 3, 4, 5, 6, 50. The 50 is best described as:", "C", ["The mode", "The median", "An outlier", "The mean"], "50 is far separated from the other values — it is an outlier."),
        dataAnswer("y11s-dar-m9", "Find the range of: 100, 45, 72, 88, 60.", "100 - 45", "55", ["55.0"]),
        financeChoice("y11s-dar-m10", "When an outlier is present, the better measure of centre is usually:", "B", ["Mean", "Median", "Mode", "Range"], "The median is resistant to outliers; the mean is pulled toward extreme values."),
      ],
      masteryPassMark: 0.8,
    };
  }

  return null;
}

