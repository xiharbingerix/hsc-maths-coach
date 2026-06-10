import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
>;

// ── Helper builders ──────────────────────────────────────────────────────────

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify the key values, choose the correct method, then calculate step by step.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    acceptedAnswers: [],
    hint: "Read each option carefully and eliminate those that do not fit.",
    explanation,
  };
}

// ── Lesson 1: Collecting and Displaying Data ─────────────────────────────────

const collectingAndDisplayingData: LessonContent = {
  description:
    "Distinguish between categorical and numerical data, read frequency tables and dot plots, and choose an appropriate display for a given data set.",
  learningIntention:
    "Collect and display data using frequency tables and common graphs, and read information from those displays.",
  successCriteria: [
    "Distinguish between categorical data (labels) and numerical data (counts or measurements).",
    "Read frequencies and totals from a frequency table.",
    "Read data values from a dot plot and identify the mode.",
    "Choose an appropriate display for a given data set.",
  ],
  teaching: {
    paragraphs: [
      "Data is information we collect about the world. We work with two main types: categorical data describes groups or labels (such as favourite sports or eye colour), while numerical data records counts or measurements (such as heights or number of pets).",
      "A frequency table organises data by listing each category alongside how many times it appears — its frequency. A tally column helps when counting: every fifth mark crosses the previous four. Add all frequencies to find the total.",
      "The choice of display depends on the data type. Column graphs compare frequencies across categories. Dot plots show each individual value on a number line, making it easy to spot clusters and gaps. Sector (pie) charts show how a whole is divided into parts — useful when each category is a share of a total.",
      "A common mistake is trying to find the mean of categorical data. You can identify the mode (most common category), but averaging labels like 'red' and 'blue' makes no sense. Reserve the mean for numerical data.",
    ],
    latexBlocks: [
      "\\text{Frequency: how many times a value appears in the data set}",
      "\\text{Relative frequency} = \\frac{\\text{frequency}}{\\text{total frequency}}",
      "\\text{Column graph: compare categories.}\\quad \\text{Dot plot: show every value.}\\quad \\text{Sector chart: parts of a whole.}",
    ],
  },
  workedExamples: [
    {
      title: "Find the mode from a frequency table",
      questionLatex:
        "\\text{Table — Cats: 12, Dogs: 18, Fish: 7, Birds: 3. Which pet is the mode?}",
      steps: [
        {
          explanation: "The mode is the category with the highest frequency.",
          latex: "\\text{Dogs has frequency 18 — the largest value in the table.}",
        },
      ],
      finalAnswerLatex: "\\text{Mode: Dogs (frequency 18)}",
    } as WorkedExample,
    {
      title: "Find the total and a relative frequency",
      questionLatex:
        "\\text{Frequencies: Red 8, Blue 12, Green 5, Yellow 5. Find the total and the relative frequency of Blue.}",
      steps: [
        {
          explanation: "Add all frequencies to find the total.",
          latex: "8 + 12 + 5 + 5 = 30",
        },
        {
          explanation: "Divide the frequency of Blue by the total.",
          latex: "\\text{Relative frequency of Blue} = \\frac{12}{30} = \\frac{2}{5}",
        },
      ],
      finalAnswerLatex: "\\text{Total} = 30,\\quad \\text{relative frequency of Blue} = \\frac{2}{5}",
    } as WorkedExample,
    {
      title: "Read range from a dot plot",
      questionLatex:
        "\\text{Dot plot values: 3, 3, 4, 4, 4, 5, 6. Find the range.}",
      steps: [
        {
          explanation: "Range = largest value minus smallest value.",
          latex: "\\text{Range} = 6 - 3 = 3",
        },
      ],
      finalAnswerLatex: "\\text{Range} = 3",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-col-g1",
      "Which type of display is most appropriate for showing how a school day is divided between subjects?",
      "B",
      [
        "Column graph",
        "Sector (pie) chart",
        "Dot plot",
        "Number line",
      ],
      "A sector chart shows how a whole is divided into parts. Each subject takes a share of the total school day, making a sector chart ideal here."
    ),
    answer(
      "y8-dat-col-g2",
      "A frequency table shows: Monday 5, Tuesday 8, Wednesday 6, Thursday 4, Friday 7. How many students were surveyed in total?",
      "5 + 8 + 6 + 4 + 7",
      "30",
      "Add all frequencies: 5 + 8 + 6 + 4 + 7 = 30."
    ),
    answer(
      "y8-dat-col-g3",
      "Frequency table — Cats: 12, Dogs: 18, Fish: 7, Birds: 3. How many more students chose Dogs than Cats?",
      "18 - 12",
      "6",
      "18 - 12 = 6. Six more students chose Dogs than Cats."
    ),
    choice(
      "y8-dat-col-g4",
      "A dot plot shows: 4, 4, 5, 5, 5, 6, 7. What is the mode?",
      "B",
      ["4", "5", "6", "7"],
      "The mode is the value that appears most often. 5 appears three times — more than any other value. Mode = 5."
    ),
  ],
  independentPractice: [
    answer(
      "y8-dat-col-i1",
      "Frequency table — A: 15, B: 22, C: 9, D: 14. What is the total frequency?",
      "15 + 22 + 9 + 14",
      "60",
      "15 + 22 + 9 + 14 = 60."
    ),
    answer(
      "y8-dat-col-i2",
      "Dot plot values: 3, 4, 4, 5, 5, 5, 6, 7. What is the range?",
      "\\text{Range} = 7 - 3",
      "4",
      "Range = largest value - smallest value = 7 - 3 = 4."
    ),
    choice(
      "y8-dat-col-i3",
      "Which statement about categorical data is correct?",
      "B",
      [
        "You can calculate the mean of categorical data.",
        "Categorical data uses labels or names, not numbers.",
        "Categorical data can only have two categories.",
        "Categorical data is always recorded on a number line.",
      ],
      "Categorical data describes groups using labels (colour, sport, type). It cannot be meaningfully averaged."
    ),
    answer(
      "y8-dat-col-i4",
      "Frequency table — Red: 12, Blue: 9, Green: 7, Yellow: 2. How many students chose Red or Blue?",
      "12 + 9",
      "21",
      "12 + 9 = 21."
    ),
    answer(
      "y8-dat-col-i5",
      "A frequency table has 5 categories with frequencies 8, 5, 12, 3, and 7. What is the total number of data values?",
      "8 + 5 + 12 + 3 + 7",
      "35",
      "8 + 5 + 12 + 3 + 7 = 35."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing the frequency with the data value itself.",
      fix: "Frequency is the count of how many times a value appears. The data value is what was measured or categorised.",
    },
    {
      mistake: "Trying to calculate the mean of categorical data.",
      fix: "The mean only applies to numerical data. For categorical data, identify the mode (most common category) instead.",
    },
    {
      mistake: "Reading the mode as the highest frequency number, not the category with the highest frequency.",
      fix: "The mode is the category or value that appears most often — not the frequency number itself.",
    },
    {
      mistake: "Not adding all frequencies when finding the total.",
      fix: "Include every category in the sum. Check by counting individual tallies and comparing.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-dat-col-m1",
      "Dot plot: 3 dots at 6, 1 dot at 7, 2 dots at 8, 4 dots at 9, 2 dots at 10. How many data values are there in total?",
      "3 + 1 + 2 + 4 + 2",
      "12",
      "3 + 1 + 2 + 4 + 2 = 12 data values in total."
    ),
    choice(
      "y8-dat-col-m2",
      "A column graph has bars with heights 6, 14, 9, 11. What is the total count?",
      "B",
      ["30", "40", "44", "36"],
      "Add all bar heights: 6 + 14 + 9 + 11 = 40."
    ),
    answer(
      "y8-dat-col-m3",
      "Frequency table — Soccer: 14, Basketball: 9, Swimming: 7, Tennis: 10. How many more students chose Soccer than Swimming?",
      "14 - 7",
      "7",
      "14 - 7 = 7. Seven more students chose Soccer than Swimming."
    ),
    answer(
      "y8-dat-col-m4",
      "A frequency table has total frequency 50. Category A has frequency 20. How many students chose something other than A?",
      "50 - 20",
      "30",
      "50 - 20 = 30 students chose a category other than A."
    ),
    choice(
      "y8-dat-col-m5",
      "Which display would best show how 200 students are distributed across three year groups?",
      "C",
      [
        "Dot plot",
        "Line graph",
        "Sector (pie) chart",
        "Number line",
      ],
      "A sector chart shows how a total is divided into parts. Each year group takes a proportional slice of the 200-student total."
    ),
    answer(
      "y8-dat-col-m6",
      "Dot plot values: 10, 10, 12, 14, 14, 14, 16. The mode is 14 and the range is 6. Find the difference between the mode and the range.",
      "14 - 6",
      "8",
      "Mode = 14 (appears 3 times). Range = 16 - 10 = 6. Difference = 14 - 6 = 8."
    ),
    answer(
      "y8-dat-col-m7",
      "Frequency table — Rock: 18, Pop: 24, Jazz: 8, Classical: 10. How many more students chose Pop than Rock?",
      "24 - 18",
      "6",
      "24 - 18 = 6."
    ),
    answer(
      "y8-dat-col-m8",
      "A data set has 10 values: 5, 6, 6, 7, 7, 7, 8, 8, 9, 10. The current mode is 7. A student joins and scores 7. How many times does the mode value now appear?",
      "7 + 1 = 8\\text{ occurrences total}",
      "4",
      "The value 7 originally appears 3 times. Adding one more score of 7 gives 4 occurrences. The mode remains 7."
    ),
    choice(
      "y8-dat-col-m9",
      "A frequency table has total 80. Category X has frequency 32. Which is closest to the percentage of students in Category X?",
      "C",
      ["25%", "32%", "40%", "80%"],
      "32 ÷ 80 = 0.4 = 40%."
    ),
    answer(
      "y8-dat-col-m10",
      "Frequency table — Mon: 7, Tue: 11, Wed: ?, Thu: 9, Fri: 8. The total is 42. Find the missing frequency for Wednesday.",
      "7 + 11 + ? + 9 + 8 = 42",
      "7",
      "Sum of known frequencies = 7 + 11 + 9 + 8 = 35. Missing value = 42 - 35 = 7."
    ),
  ],
};

// ── Lesson 2: Mean, Median, Mode and Range ────────────────────────────────────

const meanMedianModeRange: LessonContent = {
  description:
    "Calculate the mean, median, mode and range of a numerical data set, and use these statistics to describe the centre and spread of data.",
  learningIntention:
    "Calculate mean, median, mode and range from a list of values and interpret what each statistic tells you about a data set.",
  successCriteria: [
    "Calculate the mean by dividing the sum of all values by the count.",
    "Find the median by sorting values and identifying the middle (or average of two middle values for an even-count set).",
    "Identify the mode as the value that appears most often.",
    "Calculate the range as the largest value minus the smallest value.",
  ],
  teaching: {
    paragraphs: [
      "Summary statistics give a single number that represents a whole data set. The mean, median and mode each measure the centre (typical value), while the range measures the spread (how far apart the values are).",
      "The mean is the arithmetic average: add all values and divide by how many there are. Always count carefully — a common error is dividing by the wrong number of values.",
      "To find the median, first sort the values from smallest to largest. If there is an odd number of values, the median is the middle one. If there is an even number, average the two middle values. The median is not affected by very large or very small outliers the way the mean is.",
      "The mode is the value that appears most often. A data set can have no mode (all values appear once) or more than one mode (two values tie for highest frequency). The range = largest value − smallest value.",
    ],
    latexBlocks: [
      "\\text{Mean} = \\frac{\\text{sum of all values}}{\\text{number of values}}",
      "\\text{Median: sort values, then find the middle value (or average the two middle values).}",
      "\\text{Range} = \\text{largest value} - \\text{smallest value}",
    ],
  },
  workedExamples: [
    {
      title: "Find the mean of a data set",
      questionLatex: "\\text{Data: }3,\\; 7,\\; 5,\\; 9,\\; 6.\\text{ Find the mean.}",
      steps: [
        {
          explanation: "Add all values to find the sum.",
          latex: "3 + 7 + 5 + 9 + 6 = 30",
        },
        {
          explanation: "Divide by the number of values (5).",
          latex: "\\text{Mean} = \\frac{30}{5} = 6",
        },
      ],
      finalAnswerLatex: "\\text{Mean} = 6",
    } as WorkedExample,
    {
      title: "Find the median for an even-count set",
      questionLatex: "\\text{Data: }4,\\; 9,\\; 2,\\; 6,\\; 8,\\; 5.\\text{ Find the median.}",
      steps: [
        {
          explanation: "Sort the values from smallest to largest.",
          latex: "2,\\; 4,\\; 5,\\; 6,\\; 8,\\; 9",
        },
        {
          explanation: "There are 6 values (even), so average the two middle values (3rd and 4th).",
          latex: "\\text{Median} = \\frac{5 + 6}{2} = 5.5",
        },
      ],
      finalAnswerLatex: "\\text{Median} = 5.5",
    } as WorkedExample,
    {
      title: "Find mode and range",
      questionLatex: "\\text{Data: }3,\\; 7,\\; 2,\\; 7,\\; 9,\\; 4.\\text{ Find the mode and range.}",
      steps: [
        {
          explanation: "The mode is the value that appears most often.",
          latex: "7\\text{ appears twice — all others appear once. Mode} = 7",
        },
        {
          explanation: "Subtract the smallest value from the largest.",
          latex: "\\text{Range} = 9 - 2 = 7",
        },
      ],
      finalAnswerLatex: "\\text{Mode} = 7,\\quad \\text{Range} = 7",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-avg-g1",
      "For the data set 3, 5, 7, 7, 8, what is the mode?",
      "C",
      ["3", "5", "7", "8"],
      "The mode is the value that appears most often. 7 appears twice; all others appear once. Mode = 7."
    ),
    answer(
      "y8-dat-avg-g2",
      "Find the mean of: 4, 6, 8, 10, 12.",
      "\\text{Mean} = \\frac{4+6+8+10+12}{5}",
      "8",
      "Sum = 4 + 6 + 8 + 10 + 12 = 40. Mean = 40 ÷ 5 = 8."
    ),
    answer(
      "y8-dat-avg-g3",
      "Find the median of: 3, 7, 2, 9, 5.",
      "\\text{Sort: }2,\\; 3,\\; 5,\\; 7,\\; 9",
      "5",
      "Sort: 2, 3, 5, 7, 9. There are 5 values, so the median is the 3rd value: 5."
    ),
    answer(
      "y8-dat-avg-g4",
      "Find the range of: 14, 7, 22, 3, 18.",
      "\\text{Range} = 22 - 3",
      "19",
      "Largest = 22, smallest = 3. Range = 22 - 3 = 19."
    ),
  ],
  independentPractice: [
    answer(
      "y8-dat-avg-i1",
      "Find the mean of: 8, 5, 11, 6, 10.",
      "\\text{Mean} = \\frac{8+5+11+6+10}{5}",
      "8",
      "Sum = 8 + 5 + 11 + 6 + 10 = 40. Mean = 40 ÷ 5 = 8."
    ),
    answer(
      "y8-dat-avg-i2",
      "Find the median of: 4, 9, 2, 6, 8, 5.",
      "\\text{Sort: }2,\\; 4,\\; 5,\\; 6,\\; 8,\\; 9",
      "5.5",
      "Sort: 2, 4, 5, 6, 8, 9. Two middle values (3rd and 4th) are 5 and 6. Median = (5 + 6) ÷ 2 = 5.5."
    ),
    choice(
      "y8-dat-avg-i3",
      "Which of these is a measure of spread, not centre?",
      "D",
      ["Mean", "Median", "Mode", "Range"],
      "Mean, median and mode measure the centre (typical value). Range measures spread — how far apart the data values are."
    ),
    answer(
      "y8-dat-avg-i4",
      "Find the mode of: 5, 9, 3, 7, 5, 11.",
      "\\text{Count each value}",
      "5",
      "5 appears twice; all other values appear once. Mode = 5."
    ),
    answer(
      "y8-dat-avg-i5",
      "Find the median of: 6, 8, 14, 3, 9.",
      "\\text{Sort: }3,\\; 6,\\; 8,\\; 9,\\; 14",
      "8",
      "Sort: 3, 6, 8, 9, 14. There are 5 values, so the median is the 3rd value: 8."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to sort the data before finding the median.",
      fix: "Always sort values from smallest to largest first. The middle value of the unsorted list is not the median.",
    },
    {
      mistake: "Dividing the sum by the number of unique values instead of the total count.",
      fix: "Count every data value, including repeats. For 3, 3, 5, 7, 8 there are 5 values, not 4.",
    },
    {
      mistake: "Confusing the mode (most common value) with the highest value in the data set.",
      fix: "The mode is the value that appears most times. It is not necessarily the largest number.",
    },
    {
      mistake: "Subtracting the second-smallest value instead of the smallest when finding the range.",
      fix: "Range = largest value - smallest value. Identify both extremes before subtracting.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-dat-avg-m1",
      "Find the mean of: 2, 4, 6, 8, 10.",
      "\\text{Mean} = \\frac{2+4+6+8+10}{5}",
      "6",
      "Sum = 2 + 4 + 6 + 8 + 10 = 30. Mean = 30 ÷ 5 = 6."
    ),
    choice(
      "y8-dat-avg-m2",
      "Data: 1, 3, 3, 5, 8, 8, 8. What is the mode?",
      "C",
      ["3", "5", "8", "1"],
      "8 appears three times, 3 appears twice, all others once. Mode = 8."
    ),
    answer(
      "y8-dat-avg-m3",
      "Find the range of: 7, 2, 9, 4, 7, 3.",
      "\\text{Range} = 9 - 2",
      "7",
      "Largest = 9, smallest = 2. Range = 9 - 2 = 7."
    ),
    answer(
      "y8-dat-avg-m4",
      "Find the median of: 5, 9, 3, 7.",
      "\\text{Sort: }3,\\; 5,\\; 7,\\; 9",
      "6",
      "Sort: 3, 5, 7, 9. Two middle values are 5 and 7. Median = (5 + 7) ÷ 2 = 6."
    ),
    answer(
      "y8-dat-avg-m5",
      "Five test scores sum to 185. Find the mean score.",
      "\\text{Mean} = \\frac{185}{5}",
      "37",
      "Mean = total ÷ number of values = 185 ÷ 5 = 37."
    ),
    choice(
      "y8-dat-avg-m6",
      "Data: 12, 15, 15, 18, 20. Which statement is correct?",
      "A",
      [
        "Mean = 16 and range = 8.",
        "Mean = 15 and range = 8.",
        "Mean = 16 and range = 6.",
        "Mean = 15 and range = 6.",
      ],
      "Sum = 12 + 15 + 15 + 18 + 20 = 80. Mean = 80 ÷ 5 = 16. Range = 20 - 12 = 8."
    ),
    answer(
      "y8-dat-avg-m7",
      "Find the median of: 8, 5, 11, 8, 6, 7, 9.",
      "\\text{Sort: }5,\\; 6,\\; 7,\\; 8,\\; 8,\\; 9,\\; 11",
      "8",
      "Sort: 5, 6, 7, 8, 8, 9, 11. There are 7 values, so the median is the 4th value: 8."
    ),
    answer(
      "y8-dat-avg-m8",
      "Find the mean of: 6, 7, 8, 8, 9, 10.",
      "\\text{Mean} = \\frac{6+7+8+8+9+10}{6}",
      "8",
      "Sum = 6 + 7 + 8 + 8 + 9 + 10 = 48. Mean = 48 ÷ 6 = 8."
    ),
    choice(
      "y8-dat-avg-m9",
      "The data set is 2, 4, 6, 8 with mean 5. A value of 10 is added. What is the new mean?",
      "B",
      ["5", "6", "7", "8"],
      "New sum = 20 + 10 = 30. New count = 5. New mean = 30 ÷ 5 = 6."
    ),
    answer(
      "y8-dat-avg-m10",
      "The mean of five values is 12. Four of the values are 8, 10, 14, 16. Find the fifth value.",
      "12 \\times 5 = 60,\\quad 60 - (8+10+14+16)",
      "12",
      "Total sum = 12 × 5 = 60. Sum of known four = 8 + 10 + 14 + 16 = 48. Fifth value = 60 - 48 = 12."
    ),
  ],
};

// ── Lesson 3: Comparing Data Displays ────────────────────────────────────────

const comparingDataDisplays: LessonContent = {
  description:
    "Compare two data sets using median, mean and range, and interpret differences in centre and spread in practical contexts.",
  learningIntention:
    "Use median, mean and range to compare two data sets and draw conclusions about typical values and consistency.",
  successCriteria: [
    "Calculate and compare the median of two data sets.",
    "Calculate and compare the range to determine which set is more spread out.",
    "Explain what it means for one group to have a higher median or smaller range.",
    "Read and interpret a simple back-to-back stem-and-leaf description.",
  ],
  teaching: {
    paragraphs: [
      "When comparing two groups, one statistic is rarely enough. Use both a measure of centre (median or mean) and a measure of spread (range) to get the full picture. Two groups can have the same median but very different spreads.",
      "A higher median means the typical value is larger — for example, Group A with median 15 performs better on average than Group B with median 11. A smaller range means the values are closer together and the results are more consistent.",
      "A back-to-back stem-and-leaf plot places two groups on either side of a shared stem. Leaves on the right side are read left to right. Leaves on the left side are read right to left (away from the stem). The median and range can then be read directly from the ordered leaves.",
      "After comparing statistics, always interpret in context. Saying 'Group A has a higher median and a smaller range, suggesting it performed better and more consistently' is far more useful than just listing numbers.",
    ],
    latexBlocks: [
      "\\text{Median: typical value.}\\quad \\text{Range: spread.}",
      "\\text{Smaller range} \\Rightarrow \\text{more consistent results}",
      "\\text{Back-to-back stem-and-leaf: left leaves read right-to-left (away from stem).}",
    ],
  },
  workedExamples: [
    {
      title: "Compare two groups using median and range",
      questionLatex:
        "\\text{Group A: }5,\\; 8,\\; 9,\\; 11,\\; 17.\\quad \\text{Group B: }3,\\; 6,\\; 9,\\; 14,\\; 18.",
      steps: [
        {
          explanation: "Find the median of each group (middle value of 5).",
          latex: "\\text{Group A median} = 9,\\quad \\text{Group B median} = 9",
        },
        {
          explanation: "Find the range of each group.",
          latex: "\\text{Group A range} = 17 - 5 = 12,\\quad \\text{Group B range} = 18 - 3 = 15",
        },
        {
          explanation: "Interpret: same typical value, but Group A is more consistent.",
          latex: "\\text{Group A range (12) < Group B range (15)}",
        },
      ],
      finalAnswerLatex: "\\text{Same median; Group A is more consistent (smaller range).}",
    } as WorkedExample,
    {
      title: "Find the mean of a group",
      questionLatex: "\\text{Group C: }4,\\; 7,\\; 10,\\; 13,\\; 16.\\text{ Find the mean.}",
      steps: [
        {
          explanation: "Add all values.",
          latex: "4 + 7 + 10 + 13 + 16 = 50",
        },
        {
          explanation: "Divide by the number of values (5).",
          latex: "\\text{Mean} = 50 \\div 5 = 10",
        },
      ],
      finalAnswerLatex: "\\text{Mean} = 10",
    } as WorkedExample,
    {
      title: "Interpret a comparison",
      questionLatex:
        "\\text{Group X: median 18, range 6. Group Y: median 14, range 14. Compare the groups.}",
      steps: [
        {
          explanation: "Group X has a higher median — its typical value is larger.",
          latex: "18 > 14",
        },
        {
          explanation: "Group X has a smaller range — its values are more consistent.",
          latex: "6 < 14",
        },
      ],
      finalAnswerLatex: "\\text{Group X performs better on average and is more consistent.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-cmp-g1",
      "You are comparing two groups. Which pair of statistics gives the most complete comparison?",
      "C",
      [
        "Mode and frequency",
        "Total and mode",
        "Median and range",
        "Mean and total",
      ],
      "Median describes the typical value (centre) and range describes the spread. Together they give a complete comparison of two groups."
    ),
    answer(
      "y8-dat-cmp-g2",
      "Group A: 4, 7, 9, 11, 14. Find the median.",
      "\\text{Sort: }4,\\; 7,\\; 9,\\; 11,\\; 14",
      "9",
      "Sorted: 4, 7, 9, 11, 14. There are 5 values, so the median is the 3rd value: 9."
    ),
    answer(
      "y8-dat-cmp-g3",
      "Group B: 3, 5, 9, 13, 20. Find the range.",
      "\\text{Range} = 20 - 3",
      "17",
      "Largest = 20, smallest = 3. Range = 20 - 3 = 17."
    ),
    choice(
      "y8-dat-cmp-g4",
      "Group A median = 9, range = 10. Group B median = 9, range = 17. Which group has more consistent results?",
      "A",
      [
        "Group A — smaller range means values are closer together.",
        "Group B — larger range means more variety.",
        "Both groups — they have the same median.",
        "Cannot be determined without more information.",
      ],
      "A smaller range means values are clustered closer to the median. Group A's range of 10 is smaller than Group B's 17, so Group A is more consistent."
    ),
  ],
  independentPractice: [
    answer(
      "y8-dat-cmp-i1",
      "Group A: 5, 7, 9, 11, 13. Find the mean.",
      "\\text{Mean} = \\frac{5+7+9+11+13}{5}",
      "9",
      "Sum = 5 + 7 + 9 + 11 + 13 = 45. Mean = 45 ÷ 5 = 9."
    ),
    answer(
      "y8-dat-cmp-i2",
      "Group B: 2, 6, 9, 14, 19. Find the median.",
      "\\text{Sort: }2,\\; 6,\\; 9,\\; 14,\\; 19",
      "9",
      "Sorted: 2, 6, 9, 14, 19. The middle (3rd) value is 9."
    ),
    choice(
      "y8-dat-cmp-i3",
      "Group A: median 9, range 8. Group B: median 12, range 8. Which group has the higher typical value?",
      "B",
      [
        "Group A — it has a lower median.",
        "Group B — it has a higher median.",
        "Both groups — they have the same range.",
        "Cannot be determined.",
      ],
      "The median represents the typical value. Group B's median (12) is higher than Group A's (9), so Group B has a higher typical value."
    ),
    answer(
      "y8-dat-cmp-i4",
      "Group C: 6, 8, 10, 12, 14. Find the range.",
      "\\text{Range} = 14 - 6",
      "8",
      "Largest = 14, smallest = 6. Range = 14 - 6 = 8."
    ),
    answer(
      "y8-dat-cmp-i5",
      "Group D: 3, 7, 11, 15, 19. Find the mean.",
      "\\text{Mean} = \\frac{3+7+11+15+19}{5}",
      "11",
      "Sum = 3 + 7 + 11 + 15 + 19 = 55. Mean = 55 ÷ 5 = 11."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Comparing groups using only the mean and ignoring spread.",
      fix: "Always report both the median (or mean) and the range. Two groups can have identical means but very different consistency.",
    },
    {
      mistake: "Reading back-to-back stem-and-leaf leaves in the wrong direction on the left side.",
      fix: "Left-side leaves are read right-to-left (away from the stem). The leaf closest to the stem is the smallest digit.",
    },
    {
      mistake: "Claiming one group is 'better' solely because its range is larger.",
      fix: "A larger range means more spread — not better performance. Use the median to judge typical performance.",
    },
    {
      mistake: "Comparing statistics without interpreting them in context.",
      fix: "Always link the numbers back to the scenario. 'Group A's median is 5 higher, suggesting it typically scored better on the test' is more useful than just listing numbers.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-dat-cmp-m1",
      "Group A: 6, 9, 11, 15, 19. Find the median.",
      "\\text{Sort: }6,\\; 9,\\; 11,\\; 15,\\; 19",
      "11",
      "Sorted: 6, 9, 11, 15, 19. The middle (3rd) value is 11."
    ),
    answer(
      "y8-dat-cmp-m2",
      "Group B: 4, 8, 11, 16, 21. Find the range.",
      "\\text{Range} = 21 - 4",
      "17",
      "Largest = 21, smallest = 4. Range = 21 - 4 = 17."
    ),
    choice(
      "y8-dat-cmp-m3",
      "Group P: mean 15, range 4. Group Q: mean 15, range 10. Which group has more consistent results?",
      "A",
      [
        "Group P — smaller range means values are clustered closer together.",
        "Group Q — larger range means it covers more ground.",
        "Both groups — they have the same mean.",
        "Cannot be determined from this information.",
      ],
      "A smaller range means the values are less spread out. Group P's range (4) is smaller, so its results are more consistent."
    ),
    answer(
      "y8-dat-cmp-m4",
      "Group A: 6, 9, 11, 15, 19. Find the mean.",
      "\\text{Mean} = \\frac{6+9+11+15+19}{5}",
      "12",
      "Sum = 6 + 9 + 11 + 15 + 19 = 60. Mean = 60 ÷ 5 = 12."
    ),
    answer(
      "y8-dat-cmp-m5",
      "Group B: 4, 8, 11, 16, 21. Find the median.",
      "\\text{Sort: }4,\\; 8,\\; 11,\\; 16,\\; 21",
      "11",
      "Sorted: 4, 8, 11, 16, 21. The middle (3rd) value is 11."
    ),
    answer(
      "y8-dat-cmp-m6",
      "Group A: 6, 9, 11, 15, 19. Find the range.",
      "\\text{Range} = 19 - 6",
      "13",
      "Largest = 19, smallest = 6. Range = 19 - 6 = 13."
    ),
    choice(
      "y8-dat-cmp-m7",
      "Both groups have median 11. Group A range = 13, Group B range = 17. Which statement is correct?",
      "C",
      [
        "Group A is better because its range is smaller.",
        "Group B is better because its range is larger.",
        "Both groups have the same typical value, but Group A is more consistent.",
        "Group B is more consistent because more data fits in its range.",
      ],
      "Same median means the same typical value. Group A's range (13) is smaller than Group B's (17), so Group A's results are more consistent."
    ),
    answer(
      "y8-dat-cmp-m8",
      "Five scores have a mean of 14. Find the sum of the scores.",
      "\\text{Sum} = 14 \\times 5",
      "70",
      "Sum = mean × number of values = 14 × 5 = 70."
    ),
    choice(
      "y8-dat-cmp-m9",
      "Set A: mean 25, range 30. Set B: mean 25, range 6. Which statement is correct?",
      "C",
      [
        "Both sets have identical data because the means are equal.",
        "Set A is more consistent because it has a larger range.",
        "Set B is more consistent because it has a smaller range.",
        "Set A has a larger mean.",
      ],
      "Equal means does not mean identical data. Set B's range (6) is much smaller than Set A's (30), so Set B's values are clustered much more tightly together."
    ),
    answer(
      "y8-dat-cmp-m10",
      "Group C: 3, 7, x, 13, 17. The mean is 10. Find the value of x.",
      "3 + 7 + x + 13 + 17 = 10 \\times 5",
      "10",
      "Total sum = 10 × 5 = 50. Known sum = 3 + 7 + 13 + 17 = 40. x = 50 - 40 = 10."
    ),
  ],
};

// ── Lesson 4: Probability Language and Scale ──────────────────────────────────

const probabilityLanguageAndScale: LessonContent = {
  description:
    "Describe likelihood using words and place events on the probability scale from 0 to 1.",
  learningIntention:
    "Use the probability scale from 0 to 1 to describe and order the likelihood of everyday events.",
  successCriteria: [
    "State that probability 0 means impossible and probability 1 means certain.",
    "Place events on the probability scale using words: impossible, unlikely, even chance, likely, certain.",
    "Recognise that probabilities must always be between 0 and 1 inclusive.",
    "Calculate the probability of a simple event using a scale and complementary reasoning.",
  ],
  teaching: {
    paragraphs: [
      "Probability describes how likely an event is to occur. We can describe likelihood in words — impossible, unlikely, even chance (50-50), likely, and certain — and we can also assign it a number between 0 and 1.",
      "The probability scale runs from 0 to 1. An event with probability 0 is impossible — it cannot happen. An event with probability 1 is certain — it always happens. An event with probability 0.5 is equally likely to happen or not.",
      "Probabilities between 0 and 0.5 are described as unlikely. Probabilities between 0.5 and 1 are described as likely. The closer to 1, the more likely the event.",
      "A common mistake is writing a probability greater than 1. For example, saying a probability is '1.5 out of 1' is impossible. Every probability must satisfy: 0 ≤ P(event) ≤ 1.",
    ],
    latexBlocks: [
      "0 \\leq P(\\text{event}) \\leq 1",
      "P(\\text{impossible}) = 0,\\quad P(\\text{certain}) = 1,\\quad P(\\text{50-50}) = 0.5",
      "\\text{Unlikely: }0 < P < 0.5\\qquad \\text{Likely: }0.5 < P < 1",
    ],
  },
  workedExamples: [
    {
      title: "Place an event on the probability scale",
      questionLatex:
        "\\text{A spinner has 10 equal sections, 7 of which are green. Describe landing on green.}",
      steps: [
        {
          explanation: "Write the probability as a decimal.",
          latex: "P(\\text{green}) = \\frac{7}{10} = 0.7",
        },
        {
          explanation: "0.7 is between 0.5 and 1, so the event is likely.",
          latex: "0.5 < 0.7 < 1 \\Rightarrow \\text{likely}",
        },
      ],
      finalAnswerLatex: "P(\\text{green}) = 0.7\\text{ — likely}",
    } as WorkedExample,
    {
      title: "Identify an impossible event",
      questionLatex:
        "\\text{A standard die shows faces 1–6. What is the probability of rolling a 7?}",
      steps: [
        {
          explanation: "7 is not on any face of a standard die.",
          latex: "P(\\text{rolling 7}) = 0",
        },
      ],
      finalAnswerLatex: "P(\\text{rolling 7}) = 0\\text{ — impossible}",
    } as WorkedExample,
    {
      title: "Find the probability of a complementary event",
      questionLatex:
        "\\text{P(raining) = 0.3. Find P(not raining).}",
      steps: [
        {
          explanation: "All probabilities for an event and its complement add to 1.",
          latex: "P(\\text{not raining}) = 1 - 0.3 = 0.7",
        },
      ],
      finalAnswerLatex: "P(\\text{not raining}) = 0.7",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-pro-lan-g1",
      "Which event is impossible?",
      "C",
      [
        "Rolling a 6 on a standard die",
        "Flipping a coin and getting tails",
        "Rolling a 7 on a standard die",
        "Drawing a red card from a standard deck",
      ],
      "A standard die has faces 1–6. Rolling a 7 cannot happen — it is impossible. P = 0."
    ),
    answer(
      "y8-pro-lan-g2",
      "An impossible event is placed at which value on the probability scale?",
      "0 \\leq P \\leq 1",
      "0",
      "An impossible event has zero chance of occurring. It sits at 0 on the probability scale."
    ),
    answer(
      "y8-pro-lan-g3",
      "A certain event is placed at which value on the probability scale?",
      "0 \\leq P \\leq 1",
      "1",
      "A certain event always occurs. It sits at 1 (the top of the scale)."
    ),
    choice(
      "y8-pro-lan-g4",
      "A bag contains only red marbles. You draw one marble at random. What is the probability of drawing a red marble?",
      "C",
      ["0", "0.5", "1", "More than 1"],
      "All marbles are red — drawing red is certain. P(red) = 1."
    ),
  ],
  independentPractice: [
    answer(
      "y8-pro-lan-i1",
      "From the values 0.2, 0.6, 0.4, 0.1, which represents the most likely event? Enter the value.",
      "\\text{Compare: }0.2,\\; 0.6,\\; 0.4,\\; 0.1",
      "0.6",
      "The highest probability represents the most likely event. 0.6 is the largest of the four values."
    ),
    answer(
      "y8-pro-lan-i2",
      "A spinner has 10 equal sections, all red. What is the probability of landing on red?",
      "P(\\text{red}) = \\frac{10}{10}",
      "1",
      "All 10 sections are red — landing on red is certain. P(red) = 10 ÷ 10 = 1."
    ),
    answer(
      "y8-pro-lan-i3",
      "A standard die is rolled. It is impossible to roll a number less than 1. What is this probability?",
      "P(\\text{less than 1})",
      "0",
      "The minimum face on a standard die is 1. Rolling less than 1 is impossible. P = 0."
    ),
    answer(
      "y8-pro-lan-i4",
      "A spinner has 5 equal sections, 3 of which are blue. Write the probability of landing on blue as a decimal.",
      "P(\\text{blue}) = \\frac{3}{5}",
      "0.6",
      "P(blue) = 3 ÷ 5 = 0.6. Since 0.6 > 0.5, landing on blue is likely.",
      ["3/5"]
    ),
    choice(
      "y8-pro-lan-i5",
      "Which word best describes an event with probability 0?",
      "B",
      ["Unlikely", "Impossible", "Even chance", "Certain"],
      "Probability 0 means the event cannot happen — it is impossible."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing a probability greater than 1, such as '3 out of 2'.",
      fix: "Probability is always between 0 and 1. If you get a value above 1, check your total outcomes — the denominator must be the full sample size.",
    },
    {
      mistake: "Confusing 'likely' with 'certain' — treating P = 0.8 as guaranteed.",
      fix: "Likely means P > 0.5 but P < 1. Certain means P = 1 exactly — the event always happens.",
    },
    {
      mistake: "Placing 'unlikely' at 0 on the probability scale.",
      fix: "Unlikely means 0 < P < 0.5 — between impossible and even chance. P = 0 means impossible, not just unlikely.",
    },
    {
      mistake: "Treating probability as a count instead of a ratio (e.g. writing '4' instead of '4/10').",
      fix: "Probability is always a fraction or decimal between 0 and 1. Divide the favourable count by the total number of equally likely outcomes.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-pro-lan-m1",
      "An event is described as '50-50'. Write its probability as a decimal.",
      "\\text{equally likely to occur or not occur}",
      "0.5",
      "A 50-50 event is equally likely to happen as not to happen. P = 0.5."
    ),
    choice(
      "y8-pro-lan-m2",
      "Which probability value indicates an almost certain event?",
      "C",
      ["0.01", "0.5", "0.95", "0"],
      "0.95 is very close to 1 (certain), making it almost certain. 0.5 is even chance, 0.01 is very unlikely, 0 is impossible."
    ),
    answer(
      "y8-pro-lan-m3",
      "A spinner has 4 equal sections: 1 red, 1 blue, 1 green, 1 yellow. What is the probability of landing on red? Give your answer as a decimal.",
      "P(\\text{red}) = \\frac{1}{4}",
      "0.25",
      "P(red) = 1 ÷ 4 = 0.25.",
      ["1/4"]
    ),
    answer(
      "y8-pro-lan-m4",
      "A bag has 6 yellow and 4 green counters. What is the probability of drawing a blue counter?",
      "\\text{No blue counters in the bag}",
      "0",
      "There are no blue counters. Drawing blue is impossible. P(blue) = 0."
    ),
    choice(
      "y8-pro-lan-m5",
      "Which correctly places events on the probability scale?",
      "B",
      [
        "Impossible: 0, Unlikely: 0.7, Certain: 1",
        "Impossible: 0, Even chance: 0.5, Certain: 1",
        "Impossible: 0, Likely: 0.3, Certain: 1",
        "Impossible: 0.5, Even chance: 1, Certain: 2",
      ],
      "Impossible = 0, even chance = 0.5, certain = 1. This correctly places all three anchor points on the scale."
    ),
    answer(
      "y8-pro-lan-m6",
      "A spinner has 10 equal sections, 7 of which are green. Find the probability of NOT landing on green.",
      "P(\\text{not green}) = 1 - \\frac{7}{10}",
      "0.3",
      "P(green) = 7 ÷ 10 = 0.7. P(not green) = 1 - 0.7 = 0.3.",
      ["3/10"]
    ),
    answer(
      "y8-pro-lan-m7",
      "An event has probability 3/5. Write it as a decimal.",
      "\\frac{3}{5}",
      "0.6",
      "3 ÷ 5 = 0.6.",
      ["3/5"]
    ),
    choice(
      "y8-pro-lan-m8",
      "A student says 'the probability of this event is 1.5'. What is wrong?",
      "B",
      [
        "Nothing — 1.5 is a valid probability.",
        "Probabilities must be between 0 and 1, so 1.5 is too large.",
        "Probabilities must be whole numbers only.",
        "Probabilities must be between 0 and 2.",
      ],
      "Probability is always between 0 and 1 inclusive. A value of 1.5 is impossible."
    ),
    answer(
      "y8-pro-lan-m9",
      "A spinner has 8 equal sections, 6 of which are shaded. Find the probability of landing on an unshaded section.",
      "P(\\text{unshaded}) = \\frac{8-6}{8}",
      "0.25",
      "Unshaded sections = 8 - 6 = 2. P(unshaded) = 2 ÷ 8 = 0.25.",
      ["1/4", "2/8"]
    ),
    answer(
      "y8-pro-lan-m10",
      "An event has probability 0.6. A second event is 3 times as unlikely. Find the probability of the second event.",
      "P = \\frac{0.6}{3}",
      "0.2",
      "3 times as unlikely means the probability is divided by 3. 0.6 ÷ 3 = 0.2.",
      ["1/5"]
    ),
  ],
};

// ── Lesson 5: Simple Probability ──────────────────────────────────────────────

const simpleProbability: LessonContent = {
  description:
    "Calculate the probability of simple events using equally likely outcomes, and find the probability of complementary events.",
  learningIntention:
    "Calculate P(event) = favourable outcomes ÷ total outcomes and use the complement rule P(not A) = 1 − P(A).",
  successCriteria: [
    "List the sample space (all possible outcomes) of a simple experiment.",
    "Calculate probability as favourable outcomes divided by total equally likely outcomes.",
    "Apply P(not A) = 1 − P(A) to find the probability of the complement.",
    "Express probability as a simplified fraction or decimal.",
  ],
  teaching: {
    paragraphs: [
      "The probability of an event is the number of favourable outcomes divided by the total number of equally likely outcomes. This formula only works when all outcomes are equally likely — for example, a fair coin, a fair die, or a bag where each counter is equally likely to be drawn.",
      "Before calculating, list the sample space — the complete set of all possible outcomes. For a standard die: {1, 2, 3, 4, 5, 6}. For a bag with 3 red and 2 blue counters: 5 outcomes total. A missing outcome is one of the most common calculation errors.",
      "The complement of an event A is everything that is not A. Since all probabilities must add to 1, P(not A) = 1 − P(A). If P(rain) = 0.3, then P(no rain) = 1 − 0.3 = 0.7.",
      "Express probability as a simplified fraction or decimal. For example, P = 4/8 should be simplified to 1/2, and P = 6/10 = 0.6. An answer of 3/8 cannot be simplified further.",
    ],
    latexBlocks: [
      "P(\\text{event}) = \\frac{\\text{number of favourable outcomes}}{\\text{total equally likely outcomes}}",
      "P(\\text{not } A) = 1 - P(A)",
      "\\text{Sample space for a die: }\\{1,\\, 2,\\, 3,\\, 4,\\, 5,\\, 6\\}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate probability from a bag of counters",
      questionLatex:
        "\\text{A bag has 3 red, 4 blue and 1 green counter (8 total). Find P(blue).}",
      steps: [
        {
          explanation: "Count the favourable outcomes (blue) and the total outcomes.",
          latex: "\\text{Favourable} = 4,\\quad \\text{Total} = 8",
        },
        {
          explanation: "Divide and simplify.",
          latex: "P(\\text{blue}) = \\frac{4}{8} = \\frac{1}{2}",
        },
      ],
      finalAnswerLatex: "P(\\text{blue}) = \\frac{1}{2}",
    } as WorkedExample,
    {
      title: "Use the complement rule",
      questionLatex: "\\text{P(event)} = \\frac{3}{8}.\\text{ Find P(not event).}",
      steps: [
        {
          explanation: "Apply the complement rule.",
          latex: "P(\\text{not event}) = 1 - \\frac{3}{8} = \\frac{5}{8}",
        },
      ],
      finalAnswerLatex: "P(\\text{not event}) = \\frac{5}{8}",
    } as WorkedExample,
    {
      title: "Find probability on a standard die",
      questionLatex:
        "\\text{A standard die is rolled. Find the probability of rolling a number greater than 4.}",
      steps: [
        {
          explanation: "List the favourable outcomes — numbers greater than 4.",
          latex: "\\{5,\\, 6\\} \\Rightarrow 2\\text{ favourable outcomes}",
        },
        {
          explanation: "Divide by the total number of equally likely outcomes.",
          latex: "P(>4) = \\frac{2}{6} = \\frac{1}{3}",
        },
      ],
      finalAnswerLatex: "P(>4) = \\frac{1}{3}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-pro-sim-g1",
      "A bag has 5 red and 3 blue counters. What is the total number of equally likely outcomes?",
      "C",
      ["3", "5", "8", "15"],
      "Total outcomes = 5 red + 3 blue = 8. Every counter is equally likely to be drawn."
    ),
    answer(
      "y8-pro-sim-g2",
      "A bag has 3 red, 4 blue and 1 green counter (8 total). Find P(blue) as a simplified fraction.",
      "P(\\text{blue}) = \\frac{4}{8}",
      "1/2",
      "P(blue) = 4 ÷ 8 = 4/8 = 1/2.",
      ["0.5", "4/8"]
    ),
    answer(
      "y8-pro-sim-g3",
      "A standard die is rolled. How many outcomes are in the sample space?",
      "\\{1,\\, 2,\\, 3,\\, 4,\\, 5,\\, 6\\}",
      "6",
      "A standard die has faces 1, 2, 3, 4, 5, 6 — giving 6 equally likely outcomes."
    ),
    choice(
      "y8-pro-sim-g4",
      "A bag has 2 red and 6 blue counters. What is P(red)?",
      "A",
      ["1/4", "2/3", "1/2", "1/3"],
      "Total = 2 + 6 = 8. P(red) = 2 ÷ 8 = 1/4."
    ),
  ],
  independentPractice: [
    answer(
      "y8-pro-sim-i1",
      "A standard die is rolled. Find the probability of rolling a number greater than 4. Give your answer as a simplified fraction.",
      "P(>4) = \\frac{2}{6}",
      "1/3",
      "Numbers greater than 4: {5, 6} — 2 favourable outcomes out of 6. P = 2/6 = 1/3.",
      ["2/6"]
    ),
    answer(
      "y8-pro-sim-i2",
      "P(event) = 0.4. Find P(not event).",
      "P(\\text{not event}) = 1 - 0.4",
      "0.6",
      "P(not event) = 1 - 0.4 = 0.6.",
      ["3/5"]
    ),
    answer(
      "y8-pro-sim-i3",
      "A bag has 5 red, 3 blue and 2 yellow counters (10 total). Find P(yellow) as a simplified fraction.",
      "P(\\text{yellow}) = \\frac{2}{10}",
      "1/5",
      "P(yellow) = 2 ÷ 10 = 2/10 = 1/5.",
      ["2/10", "0.2"]
    ),
    choice(
      "y8-pro-sim-i4",
      "A spinner has 8 equal sections: 3 red, 2 blue, 3 green. What is P(green)?",
      "B",
      ["1/4", "3/8", "2/8", "1/2"],
      "P(green) = 3 ÷ 8 = 3/8."
    ),
    answer(
      "y8-pro-sim-i5",
      "From a standard deck of 52 cards, find the probability of drawing a heart. Give your answer as a simplified fraction.",
      "P(\\text{heart}) = \\frac{13}{52}",
      "1/4",
      "There are 13 hearts in a deck of 52 cards. P(heart) = 13 ÷ 52 = 1/4.",
      ["13/52"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the wrong total — dividing by the number in one category instead of all outcomes.",
      fix: "The denominator must be the total number of equally likely outcomes in the full sample space, not just one group.",
    },
    {
      mistake: "Calculating P(not A) by subtracting the numerators instead of subtracting from 1.",
      fix: "P(not A) = 1 − P(A). If P(A) = 3/8, then P(not A) = 1 − 3/8 = 5/8.",
    },
    {
      mistake: "Not listing the complete sample space and missing some outcomes.",
      fix: "Write out all possible outcomes before counting favourable ones. For 'greater than 4 on a die', check {5, 6} — not just {5}.",
    },
    {
      mistake: "Not simplifying the fraction answer.",
      fix: "Divide numerator and denominator by their highest common factor. 4/8 = 1/2; 6/10 = 3/5.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-pro-sim-m1",
      "A bag has 4 white, 3 black and 3 grey counters (10 total). Find P(white) as a simplified fraction.",
      "P(\\text{white}) = \\frac{4}{10}",
      "2/5",
      "P(white) = 4 ÷ 10 = 2/5.",
      ["4/10", "0.4"]
    ),
    answer(
      "y8-pro-sim-m2",
      "P(raining) = 3/10. Find P(not raining) as a simplified fraction.",
      "P(\\text{not raining}) = 1 - \\frac{3}{10}",
      "7/10",
      "P(not raining) = 1 - 3/10 = 7/10.",
      ["0.7"]
    ),
    choice(
      "y8-pro-sim-m3",
      "A fair die is rolled. What is P(even number)?",
      "C",
      ["1/6", "1/3", "1/2", "2/3"],
      "Even numbers on a die: {2, 4, 6} — 3 outcomes out of 6. P(even) = 3/6 = 1/2."
    ),
    answer(
      "y8-pro-sim-m4",
      "A spinner has 10 equal sections, 6 of which are red. Find P(red) as a simplified fraction.",
      "P(\\text{red}) = \\frac{6}{10}",
      "3/5",
      "P(red) = 6 ÷ 10 = 3/5.",
      ["6/10", "0.6"]
    ),
    answer(
      "y8-pro-sim-m5",
      "A bag has 12 counters: 3 red, 5 blue, 4 green. Find P(blue) as a fraction.",
      "P(\\text{blue}) = \\frac{5}{12}",
      "5/12",
      "P(blue) = 5 ÷ 12 = 5/12."
    ),
    choice(
      "y8-pro-sim-m6",
      "A bag has 3 red, 2 blue and 5 green counters (10 total). What is P(not green)?",
      "A",
      ["1/2", "1/5", "3/5", "1/3"],
      "Not green = 3 red + 2 blue = 5. P(not green) = 5 ÷ 10 = 1/2."
    ),
    answer(
      "y8-pro-sim-m7",
      "A standard die is rolled. Find P(prime number). Primes on a die: {2, 3, 5}.",
      "P(\\text{prime}) = \\frac{3}{6}",
      "1/2",
      "Prime numbers on a die: {2, 3, 5} — 3 outcomes out of 6. P(prime) = 3/6 = 1/2.",
      ["3/6"]
    ),
    answer(
      "y8-pro-sim-m8",
      "A bag has 4 red, 3 blue and n green counters. P(blue) = 1/4. Find n.",
      "\\frac{3}{4+3+n} = \\frac{1}{4}",
      "5",
      "P(blue) = 3/(7 + n) = 1/4. Cross-multiply: 12 = 7 + n. So n = 5."
    ),
    answer(
      "y8-pro-sim-m9",
      "A spinner has 12 equal sections. P(landing on yellow) = 1/3. How many sections are yellow?",
      "\\frac{1}{3} \\times 12",
      "4",
      "Number of yellow sections = (1/3) × 12 = 4."
    ),
    choice(
      "y8-pro-sim-m10",
      "A bag contains only red and blue counters. P(red) = 3/7. What is P(blue)?",
      "A",
      ["4/7", "3/7", "1/7", "7/4"],
      "P(blue) = 1 − P(red) = 1 − 3/7 = 4/7."
    ),
  ],
};

// ── Lesson 6: Two-Step Chance Experiments ────────────────────────────────────

const twoStepChanceExperiments: LessonContent = {
  description:
    "Find all outcomes of a two-step chance experiment using arrays and tree diagrams, and calculate probabilities from the combined sample space.",
  learningIntention:
    "List all outcomes of a two-step experiment and calculate probabilities from the full combined sample space.",
  successCriteria: [
    "Use multiplication to find the total number of outcomes in a two-step experiment.",
    "List all combined outcomes using a tree diagram or an array.",
    "Calculate the probability of a combined event using the full sample space.",
    "Identify all outcomes that satisfy a condition (e.g. 'sum = 7', 'heads and even').",
  ],
  teaching: {
    paragraphs: [
      "A two-step experiment involves two successive random choices — for example, flipping a coin then rolling a die. To find all possible combined outcomes, multiply the number of outcomes at each step: 2 × 6 = 12 combined outcomes for this example.",
      "A tree diagram starts with the first step's outcomes as branches, then adds a second set of branches for each outcome of the second step. Count all branch tips to confirm the total. An array (table) lists first-step outcomes in rows and second-step outcomes in columns, with each cell giving one combined outcome.",
      "To find the probability of a specific combined outcome, count how many combined outcomes satisfy the condition and divide by the total number of combined outcomes. For example, to find P(heads and a 3) with a coin and die: 1 favourable outcome out of 12 total.",
      "A common mistake is adding the step sizes instead of multiplying. For a spinner (4 sections) and a coin (2 sides), total outcomes = 4 × 2 = 8, not 4 + 2 = 6.",
    ],
    latexBlocks: [
      "\\text{Total combined outcomes} = n_1 \\times n_2",
      "P(\\text{combined event}) = \\frac{\\text{favourable combined outcomes}}{\\text{total combined outcomes}}",
      "\\text{e.g. coin (2) and die (6): total} = 2 \\times 6 = 12",
    ],
  },
  workedExamples: [
    {
      title: "Count outcomes using a tree diagram",
      questionLatex:
        "\\text{A coin is flipped (H or T) and a die is rolled (1–6). How many outcomes are there?}",
      steps: [
        {
          explanation: "Each coin result leads to 6 die branches.",
          latex: "2 \\times 6 = 12\\text{ total outcomes}",
        },
        {
          explanation: "Examples: (H,1), (H,2), … (H,6), (T,1), … (T,6).",
          latex: "\\text{12 equally likely combined outcomes}",
        },
      ],
      finalAnswerLatex: "12\\text{ outcomes}",
    } as WorkedExample,
    {
      title: "Calculate probability from a two-step space",
      questionLatex:
        "\\text{Using the coin-die experiment (12 outcomes), find P(Heads and 3).}",
      steps: [
        {
          explanation: "Identify the favourable outcomes — only (H, 3) qualifies.",
          latex: "\\text{Favourable: }(H, 3) = 1\\text{ outcome}",
        },
        {
          explanation: "Divide by the total combined outcomes.",
          latex: "P(H\\text{ and }3) = \\frac{1}{12}",
        },
      ],
      finalAnswerLatex: "P(H\\text{ and }3) = \\frac{1}{12}",
    } as WorkedExample,
    {
      title: "Find all outcomes satisfying a condition",
      questionLatex:
        "\\text{Two dice are rolled. How many outcomes have a sum of 7?}",
      steps: [
        {
          explanation: "List all pairs (die 1, die 2) that sum to 7.",
          latex: "(1,6),\\;(2,5),\\;(3,4),\\;(4,3),\\;(5,2),\\;(6,1)",
        },
        {
          explanation: "Count and calculate probability.",
          latex: "P(\\text{sum}=7) = \\frac{6}{36} = \\frac{1}{6}",
        },
      ],
      finalAnswerLatex: "P(\\text{sum}=7) = \\frac{1}{6}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-pro-two-g1",
      "A coin is flipped and a fair die is rolled. How many outcomes are in the sample space?",
      "C",
      ["6", "8", "12", "2"],
      "Coin: 2 outcomes. Die: 6 outcomes. Total = 2 × 6 = 12 equally likely outcomes."
    ),
    answer(
      "y8-pro-two-g2",
      "A spinner with 3 sections (Red, Blue, Green) is spun and a coin is flipped. How many outcomes are in the combined sample space?",
      "3 \\times 2",
      "6",
      "Spinner: 3 outcomes. Coin: 2 outcomes. Total = 3 × 2 = 6 combined outcomes."
    ),
    answer(
      "y8-pro-two-g3",
      "Two dice are rolled. How many outcomes are in the combined sample space?",
      "6 \\times 6",
      "36",
      "Each die has 6 outcomes. Total = 6 × 6 = 36 equally likely combined outcomes."
    ),
    choice(
      "y8-pro-two-g4",
      "In a two-step experiment, a coin is flipped (H or T) and a card is drawn from {A, B, C}. Which combined outcome is valid?",
      "B",
      ["HH", "TA", "AB", "BC"],
      "A valid outcome contains one result from each step: one coin result (H or T) and one card (A, B or C). Only (T, A) has this structure."
    ),
  ],
  independentPractice: [
    answer(
      "y8-pro-two-i1",
      "A coin is flipped twice. How many outcomes are in the sample space?",
      "2 \\times 2",
      "4",
      "Each flip has 2 outcomes. Total = 2 × 2 = 4. Outcomes: HH, HT, TH, TT."
    ),
    answer(
      "y8-pro-two-i2",
      "A coin is flipped twice (sample space: HH, HT, TH, TT). How many outcomes show at least one head?",
      "\\text{Count: HH, HT, TH}",
      "3",
      "Outcomes with at least one head: HH, HT, TH — 3 outcomes. TT has no heads."
    ),
    choice(
      "y8-pro-two-i3",
      "From a coin flip and a 3-section spinner (1, 2, 3), what is P(Heads and 2)?",
      "C",
      ["1/2", "1/3", "1/6", "2/3"],
      "Total outcomes = 2 × 3 = 6. Only (H, 2) is favourable. P = 1/6."
    ),
    answer(
      "y8-pro-two-i4",
      "Two dice are rolled (36 total outcomes). How many outcomes have a sum of 2?",
      "\\text{Only }(1,1)\\text{ sums to 2}",
      "1",
      "Sum of 2 occurs only when both dice show 1: outcome (1, 1). There is 1 such outcome out of 36."
    ),
    answer(
      "y8-pro-two-i5",
      "A counter is drawn from a bag (Red or Blue) and replaced, then drawn again. How many combined outcome types are there?",
      "2 \\times 2",
      "4",
      "Each draw has 2 outcome types (Red or Blue). With replacement, total combined outcome types = 2 × 2 = 4."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding the number of outcomes at each step instead of multiplying.",
      fix: "Total outcomes = n₁ × n₂. For a spinner (4 sections) and coin (2 sides): 4 × 2 = 8, not 4 + 2 = 6.",
    },
    {
      mistake: "Forgetting to draw all branches of the tree diagram and missing combined outcomes.",
      fix: "Every first-step outcome must have its own complete set of second-step branches. Check: total tips = n₁ × n₂.",
    },
    {
      mistake: "Dividing by only one step's outcomes when calculating probability.",
      fix: "The denominator must be the full combined sample space (n₁ × n₂), not just one step.",
    },
    {
      mistake: "Treating (H, 3) and (3, H) as the same outcome because they contain the same values.",
      fix: "The order matters in sequential experiments. (coin result, die result) and (die result, coin result) are different setups — keep outcomes in the correct order.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-pro-two-m1",
      "A spinner with 4 sections and a coin are used in a two-step experiment. How many outcomes are in the sample space?",
      "4 \\times 2",
      "8",
      "Spinner: 4 outcomes. Coin: 2 outcomes. Total = 4 × 2 = 8."
    ),
    answer(
      "y8-pro-two-m2",
      "A coin is flipped three times. How many outcomes are in the sample space?",
      "2 \\times 2 \\times 2",
      "8",
      "Each flip has 2 outcomes. Total = 2 × 2 × 2 = 8."
    ),
    choice(
      "y8-pro-two-m3",
      "A coin is flipped and a die is rolled (12 total outcomes). What is P(Heads and 3)?",
      "B",
      ["1/6", "1/12", "1/2", "1/3"],
      "Total outcomes = 2 × 6 = 12. Favourable: (H, 3) — 1 outcome. P = 1/12."
    ),
    answer(
      "y8-pro-two-m4",
      "Two dice are rolled (36 total outcomes). How many outcomes have a sum of 7?",
      "(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)",
      "6",
      "Pairs summing to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 outcomes."
    ),
    answer(
      "y8-pro-two-m5",
      "A coin is flipped and a 4-section spinner (1, 2, 3, 4) is spun (8 total outcomes). Find P(Heads and an even number).",
      "P = \\frac{2}{8}",
      "1/4",
      "Favourable: (H, 2) and (H, 4) — 2 outcomes. P = 2/8 = 1/4.",
      ["2/8", "0.25"]
    ),
    choice(
      "y8-pro-two-m6",
      "Two dice are rolled (36 total outcomes). What is P(sum = 7)?",
      "A",
      ["1/6", "1/12", "1/36", "7/36"],
      "Outcomes summing to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 outcomes. P = 6/36 = 1/6."
    ),
    answer(
      "y8-pro-two-m7",
      "A coin is flipped and a standard die is rolled (12 total outcomes). How many outcomes show Tails and an odd number?",
      "\\text{Tails with odd: }(T,1),(T,3),(T,5)",
      "3",
      "Tails with odd numbers on the die: (T, 1), (T, 3), (T, 5) — 3 outcomes."
    ),
    answer(
      "y8-pro-two-m8",
      "Two dice are rolled (36 total outcomes). Find P(rolling a double — same number on both dice).",
      "P(\\text{double}) = \\frac{6}{36}",
      "1/6",
      "Doubles: (1,1),(2,2),(3,3),(4,4),(5,5),(6,6) — 6 outcomes out of 36. P = 6/36 = 1/6.",
      ["6/36"]
    ),
    answer(
      "y8-pro-two-m9",
      "A coin is flipped and a 3-section spinner (R, G, B) is spun (6 total outcomes). How many outcomes show Heads?",
      "\\text{(H,R),(H,G),(H,B)}",
      "3",
      "(H, R), (H, G), (H, B) — 3 outcomes have Heads, one for each spinner section."
    ),
    choice(
      "y8-pro-two-m10",
      "A spinner with 4 equal sections is spun twice. P(same colour twice) = 1/4. Which total sample space size supports this?",
      "C",
      ["4", "8", "16", "12"],
      "Total = 4 × 4 = 16. Same colour twice: 4 outcomes (one per colour pair). P = 4/16 = 1/4."
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "collecting-and-displaying-data":   collectingAndDisplayingData,
  "mean-median-mode-range":           meanMedianModeRange,
  "comparing-data-displays":          comparingDataDisplays,
  "probability-language-and-scale":   probabilityLanguageAndScale,
  "simple-probability":               simpleProbability,
  "two-step-chance-experiments":      twoStepChanceExperiments,
};

export function year8StatisticsProbabilityLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics") return null;
  if (unit.slug !== "data-and-graphs" && unit.slug !== "probability-and-chance") return null;

  const content = lessons[lesson.slug];
  if (!content) return null;

  return {
    syllabusArea: "Statistics and Probability",
    masteryPassMark: 0.8,
    ...content,
  };
}
