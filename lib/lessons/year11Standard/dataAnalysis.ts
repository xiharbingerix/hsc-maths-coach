import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, WorkedExample } from "../differentialCalculus";
import { financeChoice, dataAnswer } from "../questionHelpers";
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
        dataAnswer("data-display-g1", "A cafe records coffees sold over five mornings: 42, 38, 45, 51, 44. Find the mean number sold.", "\\frac{42+38+45+51+44}{5}", "44", ["44.0", "44 coffees"]),
        dataAnswer("data-display-g2", "A delivery team records travel times: 18, 20, 21, 22, 24. Find the median travel time.", "\\text{middle value}=21", "21", ["21 min", "21 minutes"]),
        dataAnswer("data-display-g3", "Daily absences at a school are 6, 4, 9, 7, 5. Find the range.", "9-4", "5", ["5 absences"]),
        financeChoice("data-display-g4", "A survey asks students to choose bus, train, walk or car. This data is:", "A", ["Categorical", "Numerical continuous", "A time zone", "A percentage error"], "Transport type is a category."),
      ],
      independentPractice: [
        dataAnswer("data-display-i1", "A sports team scores 12, 15, 15, 18 and 20 points in five games. Find the mode.", "\\text{most common}=15", "15", ["15 points"]),
        dataAnswer("data-display-i2", "A shop records customer counts: 30, 34, 29, 37, 35. Find the mean customer count.", "\\frac{30+34+29+37+35}{5}", "33", ["33.0", "33 customers"]),
        dataAnswer("data-display-i3", "Study hours over a week are 1, 2, 2, 3, 4, 5, 6. Find the median.", "\\text{middle value}=3", "3", ["3 hours", "3 h"]),
        financeChoice("data-display-i4", "A frequency table has the largest frequency beside rating 4. The mode is:", "C", ["The total frequency", "The smallest rating", "Rating 4", "The range"], "The mode is the category or value with highest frequency."),
        financeChoice("data-display-i5", "A column graph is useful because it shows:", "B", ["Only the mean", "Comparisons between categories", "Only time zones", "Only limits of accuracy"], "Column graphs compare category heights."),
      ],
      commonMistakes: [
        { mistake: "Using the total instead of the mean.", fix: "Divide the total by the number of values." },
        { mistake: "Finding the median before ordering data.", fix: "Order the values first." },
        { mistake: "Using the highest value as the range.", fix: "Range is highest minus lowest." },
        { mistake: "Confusing frequency with the data value.", fix: "Frequency is how often a value or category occurs." },
      ],
      masteryQuiz: [
        dataAnswer("data-display-m1", "A cafe sells 42, 38, 45, 51, 39, 44 and 48 coffees over 7 mornings. Find the mean to 1 decimal place.", "42,\\ 38,\\ 45,\\ 51,\\ 39,\\ 44,\\ 48", "43.9", ["43.86", "43.857", "43.9 coffees"]),
        dataAnswer("data-display-m2", "Temperatures recorded at midday are 21, 23, 24, 24, 26. Find the mode.", "21,\\ 23,\\ 24,\\ 24,\\ 26", "24", ["24 degrees", "24°C", "24 C"]),
        dataAnswer("data-display-m3", "Customer ratings are 2, 3, 3, 4, 5. Find the median rating.", "2,\\ 3,\\ 3,\\ 4,\\ 5", "3", ["3 stars", "rating 3"]),
        dataAnswer("data-display-m4", "Delivery times are 12, 15, 17, 20 and 25 minutes. Find the range.", "12,\\ 15,\\ 17,\\ 20,\\ 25", "13", ["13 min", "13 minutes"]),
        financeChoice("data-display-m5", "Number of pets owned by students is:", "B", ["Categorical only", "Numerical discrete", "A time display", "A unit conversion"], "Pet counts are numerical discrete data."),
        financeChoice("data-display-m6", "A bar chart column for Wednesday is highest. This means Wednesday had:", "A", ["The greatest frequency", "The lowest value", "The median only", "No data"], "The tallest column shows the greatest frequency."),
        dataAnswer("data-display-m7", "Weekly study hours are 4, 5, 6, 7, 8. Find the mean.", "4,\\ 5,\\ 6,\\ 7,\\ 8", "6", ["6 hours", "6 h"]),
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
        dataAnswer("data-outlier-g1", "Delivery times are 18, 20, 21, 22, 23, 24 and 47 minutes. Which value is the outlier?", "\\text{far value}=47", "47", ["47 min", "47 minutes"]),
        financeChoice("data-outlier-g2", "For delivery times 18, 20, 21, 22, 23, 24, 47, which measure is usually better for a typical delivery time?", "B", ["Mean", "Median", "Range only", "Highest value"], "The median is less affected by the outlier 47."),
        financeChoice("data-outlier-g3", "An outlier usually affects the mean by:", "A", ["Pulling it toward the outlier", "Leaving it always unchanged", "Turning it into the range", "Making it categorical"], "The mean uses every value, including outliers."),
        dataAnswer("data-outlier-g4", "Travel times are 14, 15, 16, 16, 17, 18 and 42 minutes. What is the range?", "42-14", "28", ["28 min", "28 minutes"]),
      ],
      independentPractice: [
        financeChoice("data-outlier-i1", "A data set of house prices includes one extremely expensive house. Which measure is more resistant?", "C", ["Mean", "Range", "Median", "Total"], "Median is more resistant to an extreme value."),
        dataAnswer("data-outlier-i2", "Customer waiting times are 3, 4, 4, 5, 6 and 19 minutes. Identify the outlier.", "\\text{far value}=19", "19", ["19 min", "19 minutes"]),
        financeChoice("data-outlier-i3", "A class wants a typical homework time but one student reports 9 hours. The best cautious choice is:", "A", ["Use the median", "Use the maximum only", "Ignore all data", "Use the range as the typical value"], "Median is less affected by the unusually high value."),
        financeChoice("data-outlier-i4", "A conclusion from a survey of 12 people should be:", "D", ["Certain for all students", "Unrelated to data", "Based only on the largest value", "Cautious because the sample is small"], "Small samples support cautious conclusions."),
        dataAnswer("data-outlier-i5", "Daily sales are 38, 40, 41, 42, 43 and 79. What value is likely an outlier?", "\\text{far value}=79", "79", ["79 sales"]),
      ],
      commonMistakes: [
        { mistake: "Assuming every highest value is an outlier.", fix: "Check whether it is far from the rest of the data." },
        { mistake: "Using mean without considering outliers.", fix: "Check whether the median is more suitable." },
        { mistake: "Making a conclusion that is too strong.", fix: "Use cautious wording based on the data available." },
        { mistake: "Confusing range with a typical value.", fix: "Range measures spread, not centre." },
      ],
      masteryQuiz: [
        dataAnswer("data-outlier-m1", "A delivery time data set is 18, 20, 21, 22, 23, 24, 47. Which value is the outlier?", "18,\\ 20,\\ 21,\\ 22,\\ 23,\\ 24,\\ 47", "47", ["47 min", "47 minutes"]),
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
      dataAnswer("data-exam-g1", "A table shows cafe sales: Mon 42, Tue 38, Wed 45, Thu 51, Fri 44. What is the total sales count?", "42+38+45+51+44", "220", ["220 coffees"]),
      dataAnswer("data-exam-g2", "The same cafe sales are 42, 38, 45, 51 and 44. Find the mean.", "\\frac{220}{5}", "44", ["44.0", "44 coffees"]),
      financeChoice("data-exam-g3", "A delivery time data set has 18, 20, 21, 22, 23, 24, 47. Which measure is better for a typical time?", "B", ["Mean", "Median", "Maximum", "Total"], "Median is less affected by the outlier."),
      financeChoice("data-exam-g4", "A column graph has the tallest column on Friday. Friday had the:", "A", ["Greatest frequency", "Smallest value", "Median only", "Range"], "The tallest column shows the greatest frequency."),
    ],
    independentPractice: [
      dataAnswer("data-exam-i1", "Absences over five days are 4, 6, 5, 8 and 7. Find the mean absences.", "\\frac{4+6+5+8+7}{5}", "6", ["6.0", "6 absences"]),
      dataAnswer("data-exam-i2", "Customer ratings are 2, 3, 4, 4, 5. Find the mode.", "\\text{most common}=4", "4", ["rating 4", "4 stars"]),
      dataAnswer("data-exam-i3", "Travel times are 12, 14, 15, 15, 18 and 34 minutes. Find the range.", "34-12", "22", ["22 min", "22 minutes"]),
      financeChoice("data-exam-i4", "The value 34 in the travel-time data is likely to:", "C", ["Lower the mean", "Not affect any statistic", "Pull the mean upward", "Turn the data categorical"], "A high outlier increases the mean."),
      financeChoice("data-exam-i5", "A careful conclusion from a survey should:", "D", ["Ignore the data", "Claim it proves all people agree", "Use only the highest value", "Match the data and avoid overclaiming"], "Data conclusions should be cautious."),
    ],
    commonMistakes: [
      { mistake: "Calculating a statistic from the wrong data values.", fix: "Copy the relevant values from the table or graph first." },
      { mistake: "Using total when mean is requested.", fix: "Divide the total by the number of values." },
      { mistake: "Ignoring an outlier when choosing mean or median.", fix: "Check whether the median is more appropriate." },
      { mistake: "Overstating a conclusion.", fix: "Use cautious language that matches the data." },
    ],
    masteryQuiz: [
      dataAnswer("data-exam-m1", "A cafe sells 42, 38, 45, 51 and 44 coffees from Monday to Friday. Find the mean.", "42,\\ 38,\\ 45,\\ 51,\\ 44", "44", ["44.0", "44 coffees"]),
      dataAnswer("data-exam-m2", "Study hours are 1, 2, 2, 3, 4, 5, 6. Find the median.", "1,\\ 2,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6", "3", ["3 hours", "3 h"]),
      dataAnswer("data-exam-m3", "Daily temperatures are 18, 21, 22, 23, 25. Find the range.", "18,\\ 21,\\ 22,\\ 23,\\ 25", "7", ["7 degrees", "7°C", "7 C"]),
      financeChoice("data-exam-m4", "A frequency table shows 12 students chose bus, 7 chose train and 5 chose walk. Which category is most common?", "A", ["Bus", "Train", "Walk", "No category"], "Bus has the greatest frequency."),
      dataAnswer("data-exam-m5", "Delivery times are 18, 20, 21, 22, 23, 24 and 47 minutes. Identify the outlier.", "18,\\ 20,\\ 21,\\ 22,\\ 23,\\ 24,\\ 47", "47", ["47 min", "47 minutes"]),
      financeChoice("data-exam-m6", "With the delivery-time outlier present, the better typical measure is:", "C", ["Range", "Maximum", "Median", "Total"], "Median is less affected by the outlier."),
      dataAnswer("data-exam-m7", "A survey has 18 yes responses out of 30 students. What percentage said yes?", "\\text{yes}=18,\\quad \\text{total}=30", "60%", ["60", "60 percent", "60percent", "60 %"]),
      financeChoice("data-exam-m8", "A column graph is read by:", "B", ["Choosing the smallest label only", "Matching each category to its column height", "Ignoring frequencies", "Using time zones"], "Column height gives the value or frequency."),
      dataAnswer("data-exam-m9", "Sport scores are 9, 12, 12, 15 and 17. Find the mode.", "9,\\ 12,\\ 12,\\ 15,\\ 17", "12", ["12 points"]),
      financeChoice("data-exam-m10", "A practical conclusion should be based on:", "D", ["A guess", "Only the largest number", "No context", "The data and its limitations"], "Conclusions should reflect the data carefully."),
    ],
  };
}

