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

// ── Lesson 7: Stem-and-Leaf Plots ────────────────────────────────────────────

const stemAndLeafPlots: LessonContent = {
  description:
    "Read and construct ordered stem-and-leaf plots, find the median and range from ordered leaves, and read key values from a back-to-back display.",
  learningIntention:
    "Organise numerical data in a stem-and-leaf plot and use the ordered leaves to find the median and range.",
  successCriteria: [
    "Split a two-digit number into its stem (tens digit) and leaf (units digit).",
    "Construct an ordered stem-and-leaf plot from a list of values.",
    "Count all leaves to find the total number of data values.",
    "Find the median and range directly from an ordered stem-and-leaf plot.",
  ],
  teaching: {
    paragraphs: [
      "A stem-and-leaf plot organises numbers by splitting each value into a stem and a leaf. For two-digit numbers, the stem is the tens digit and the leaf is the units digit. For example, 34 has stem 3 and leaf 4. Values sharing the same tens digit all appear on the same row.",
      "To build the plot, list the stems in order down the left side. Write each leaf next to its stem in the order the values appear, then redraw with leaves sorted smallest to largest — this ordered version makes every other calculation easy.",
      "Once the plot is ordered, the range is the last leaf on the largest stem minus the first leaf on the smallest stem. The median is the middle leaf when you count from the top. For an even number of values, average the two middle leaves.",
      "A back-to-back stem-and-leaf plot places two groups on either side of a shared stem. The right-side group is read left to right as usual. The left-side group is read right to left — away from the stem — so the leaf closest to the stem is the smallest value in that row.",
    ],
    latexBlocks: [
      "\\text{e.g. } 47 \\Rightarrow \\text{stem } 4,\\; \\text{leaf } 7",
      "\\text{Range} = \\text{largest value} - \\text{smallest value}",
      "\\text{Median: count all leaves, find the middle position (or average two middle leaves for even count).}",
    ],
  },
  workedExamples: [
    {
      title: "Find the range from an ordered stem-and-leaf plot",
      questionLatex:
        "\\text{Ordered plot — } 2\\mid 4\\;8,\\quad 3\\mid 1\\;5\\;9,\\quad 4\\mid 2.\\text{ Find the range.}",
      steps: [
        {
          explanation: "The smallest value is the first leaf on the smallest stem.",
          latex: "\\text{Smallest} = 24",
        },
        {
          explanation: "The largest value is the last leaf on the largest stem.",
          latex: "\\text{Largest} = 42",
        },
        {
          explanation: "Subtract to find the range.",
          latex: "\\text{Range} = 42 - 24 = 18",
        },
      ],
      finalAnswerLatex: "\\text{Range} = 18",
    } as WorkedExample,
    {
      title: "Find the median from an ordered stem-and-leaf plot",
      questionLatex:
        "\\text{Ordered plot — } 1\\mid 2\\;5\\;7,\\quad 2\\mid 0\\;3\\;8,\\quad 3\\mid 1\\;6.\\text{ Find the median (8 values).}",
      steps: [
        {
          explanation: "8 values means average the 4th and 5th values.",
          latex: "\\text{Values in order: } 12,\\;15,\\;17,\\;20,\\;23,\\;28,\\;31,\\;36",
        },
        {
          explanation: "The 4th value is 20 and the 5th is 23.",
          latex: "\\text{Median} = \\frac{20 + 23}{2} = 21.5",
        },
      ],
      finalAnswerLatex: "\\text{Median} = 21.5",
    } as WorkedExample,
    {
      title: "Identify stems needed for a data set",
      questionLatex:
        "\\text{Data: } 32,\\;41,\\;35,\\;28,\\;43,\\;30.\\text{ How many stems are needed?}",
      steps: [
        {
          explanation: "Identify each tens digit to form the stems.",
          latex: "\\text{Tens digits: } 2\\text{ (28)},\\; 3\\text{ (32, 35, 30)},\\; 4\\text{ (41, 43)}",
        },
        {
          explanation: "Three distinct stems are needed.",
          latex: "\\text{Stems: } 2,\\; 3,\\; 4",
        },
      ],
      finalAnswerLatex: "\\text{3 stems are needed.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-stm-g1",
      "For the value 47, what is the stem and what is the leaf (using tens as stems)?",
      "B",
      ["Stem 7, leaf 4", "Stem 4, leaf 7", "Stem 47, leaf 0", "Stem 0, leaf 47"],
      "For two-digit numbers, the stem is the tens digit and the leaf is the units digit. 47 has stem 4 and leaf 7."
    ),
    answer(
      "y8-dat-stm-g2",
      "Ordered plot — 2 | 3 5 8, 3 | 1 4 9. How many data values are there in total?",
      "\\text{Count all leaves: } 3 + 3",
      "6",
      "Stem 2 has 3 leaves (23, 25, 28). Stem 3 has 3 leaves (31, 34, 39). Total = 6 values."
    ),
    answer(
      "y8-dat-stm-g3",
      "Ordered plot — 1 | 3 6 9, 2 | 0 4. What is the range?",
      "\\text{Range} = 24 - 13",
      "11",
      "Smallest value = 13 (stem 1, leaf 3). Largest value = 24 (stem 2, leaf 4). Range = 24 − 13 = 11."
    ),
    choice(
      "y8-dat-stm-g4",
      "An ordered stem-and-leaf plot has 7 values. Which position gives the median?",
      "B",
      ["3rd value", "4th value", "5th value", "Average of 3rd and 4th"],
      "For an odd number of values, the median is the exact middle. With 7 values, the middle position is (7 + 1) ÷ 2 = 4th value."
    ),
  ],
  independentPractice: [
    answer(
      "y8-dat-stm-i1",
      "Ordered plot — 1 | 2 5 7, 2 | 0 3 8, 3 | 1 6. How many data values are there in total?",
      "\\text{Count all leaves: } 3 + 3 + 2",
      "8",
      "Stem 1: 3 leaves. Stem 2: 3 leaves. Stem 3: 2 leaves. Total = 8 values."
    ),
    answer(
      "y8-dat-stm-i2",
      "Ordered plot — 1 | 2 5 7, 2 | 0 3 8, 3 | 1 6 (8 values). What is the median?",
      "\\text{Average 4th and 5th: } \\frac{20 + 23}{2}",
      "21.5",
      "Values in order: 12, 15, 17, 20, 23, 28, 31, 36. 4th = 20, 5th = 23. Median = (20 + 23) ÷ 2 = 21.5."
    ),
    answer(
      "y8-dat-stm-i3",
      "Ordered plot — 2 | 4 8, 3 | 1 5 9, 4 | 2. What is the range?",
      "\\text{Range} = 42 - 24",
      "18",
      "Smallest value = 24, largest value = 42. Range = 42 − 24 = 18."
    ),
    answer(
      "y8-dat-stm-i4",
      "Ordered plot — 3 | 2 4 7, 4 | 1 3 8. How many values are greater than 40?",
      "\\text{Values with stem 4: } 41,\\; 43,\\; 48",
      "3",
      "All values with stem 4 are greater than 40: 41, 43, 48. There are 3 such values."
    ),
    choice(
      "y8-dat-stm-i5",
      "Ordered plot — 1 | 3 6, 2 | 4 4 9, 3 | 0 8. What is the mode?",
      "B",
      ["13", "24", "29", "30"],
      "The mode is the value that appears most often. The leaf 4 appears twice on stem 2, giving value 24 twice. All other values appear once. Mode = 24."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing the leaf as the tens digit and the stem as the units digit.",
      fix: "The stem is always the tens digit (left) and the leaf is the units digit (right). For 47: stem = 4, leaf = 7.",
    },
    {
      mistake: "Forgetting to sort the leaves before finding the median.",
      fix: "Always use the ordered version of the plot (leaves sorted smallest to largest on each row) before locating the median.",
    },
    {
      mistake: "Counting stems instead of leaves when finding the total number of values.",
      fix: "Each leaf represents one data value. Count every leaf across all stems to find the total count.",
    },
    {
      mistake: "Reading the left-side leaves of a back-to-back plot in the wrong direction.",
      fix: "Left-side leaves are read away from the stem (right to left). The digit closest to the stem is the smallest value in that row.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-dat-stm-m1",
      "For the value 63, what is the leaf (using tens as stems)?",
      "63 \\Rightarrow \\text{stem } 6,\\; \\text{leaf } ?",
      "3",
      "Stem = 6 (tens digit), leaf = 3 (units digit)."
    ),
    answer(
      "y8-dat-stm-m2",
      "Ordered plot — 2 | 1 3 5, 3 | 0 2 7, 4 | 4. What is the range?",
      "\\text{Range} = 44 - 21",
      "23",
      "Smallest value = 21, largest = 44. Range = 44 − 21 = 23."
    ),
    choice(
      "y8-dat-stm-m3",
      "Ordered plot — 1 | 4 6 9, 2 | 1 3 5, 3 | 0 2 8. How many values are there in total?",
      "C",
      ["6", "8", "9", "10"],
      "Count all leaves: 3 (stem 1) + 3 (stem 2) + 3 (stem 3) = 9 values."
    ),
    answer(
      "y8-dat-stm-m4",
      "Ordered plot — 1 | 4 6 9, 2 | 1 3 5, 3 | 0 2 8 (9 values). What is the median?",
      "\\text{Middle (5th) value}",
      "23",
      "9 values → median is the 5th. In order: 14, 16, 19, 21, 23, 25, 30, 32, 38. The 5th value is 23."
    ),
    answer(
      "y8-dat-stm-m5",
      "Data: 32, 41, 35, 28, 43, 30. How many stems are needed for a stem-and-leaf plot?",
      "\\text{Distinct tens digits: } 2,\\; 3,\\; 4",
      "3",
      "Tens digits present: 2 (for 28), 3 (for 30, 32, 35), 4 (for 41, 43). Three stems are needed."
    ),
    choice(
      "y8-dat-stm-m6",
      "Ordered plot — 2 | 1 3 5, 3 | 0 2 7 9 (7 values). What is the median?",
      "B",
      ["25", "30", "32", "37"],
      "7 values → median is the 4th. In order: 21, 23, 25, 30, 32, 37, 39. The 4th value is 30."
    ),
    answer(
      "y8-dat-stm-m7",
      "Ordered plot — 4 | 2 5 8, 5 | 1 3, 6 | 0 4 7 (8 values). Find the median.",
      "\\text{Average 4th and 5th values}",
      "52",
      "Values: 42, 45, 48, 51, 53, 60, 64, 67. 4th = 51, 5th = 53. Median = (51 + 53) ÷ 2 = 52."
    ),
    answer(
      "y8-dat-stm-m8",
      "Ordered plot — 4 | 2 5 8, 5 | 1 3, 6 | 0 4 7. What is the range?",
      "\\text{Range} = 67 - 42",
      "25",
      "Smallest value = 42, largest = 67. Range = 67 − 42 = 25."
    ),
    choice(
      "y8-dat-stm-m9",
      "Ordered plot — 3 | 2 2 6 8, 4 | 1 5 9. What is the mode?",
      "A",
      ["32", "36", "38", "41"],
      "The leaf 2 appears twice on stem 3, giving value 32 twice. All other values appear once. Mode = 32."
    ),
    answer(
      "y8-dat-stm-m10",
      "Ordered plot — 2 | 0 4 8, 3 | 2 6 (5 values). Find the mean.",
      "\\frac{20 + 24 + 28 + 32 + 36}{5}",
      "28",
      "Values: 20, 24, 28, 32, 36. Sum = 140. Mean = 140 ÷ 5 = 28."
    ),
  ],
};

// ── Lesson 8: Quartiles and Interquartile Range ───────────────────────────────

const quartilesAndIQR: LessonContent = {
  description:
    "Find the three quartiles and the interquartile range of an ordered data set, and use the IQR to compare the spread of two groups.",
  learningIntention:
    "Locate Q1, Q2 (median) and Q3 in an ordered data set and calculate the interquartile range as Q3 − Q1.",
  successCriteria: [
    "Sort a data set and identify Q2 as the median.",
    "Split the data into a lower half and upper half, excluding the median for odd-count sets.",
    "Find Q1 as the median of the lower half and Q3 as the median of the upper half.",
    "Calculate IQR = Q3 − Q1 and use it to compare the spread of two groups.",
  ],
  teaching: {
    paragraphs: [
      "Quartiles split an ordered data set into four equal parts. The three quartile values are Q1 (lower quartile), Q2 (the median), and Q3 (upper quartile). Together they describe not just the middle of the data but how the whole set is distributed.",
      "To find quartiles, first sort the data from smallest to largest and locate Q2 (the median). Then split the data into a lower half and an upper half. For odd-count sets, exclude the median itself from both halves. Q1 is the median of the lower half and Q3 is the median of the upper half.",
      "The interquartile range (IQR) = Q3 − Q1. It measures the spread of the middle 50% of the data. A small IQR means the central values are clustered closely together; a large IQR means they are more spread out. The IQR is more resistant to outliers than the full range.",
      "A common mistake is including the median in both halves when the count is odd. If there are 7 values, the median is the 4th value — the lower half is values 1–3 and the upper half is values 5–7. The 4th value is used as Q2 only.",
    ],
    latexBlocks: [
      "\\text{IQR} = Q_3 - Q_1",
      "\\text{Odd count: exclude the median from both halves.}",
      "\\text{Even count: split exactly in half — no value is excluded.}",
    ],
  },
  workedExamples: [
    {
      title: "Find quartiles for an odd-count data set",
      questionLatex:
        "\\text{Data: } 3,\\; 5,\\; 8,\\; 11,\\; 14,\\; 17,\\; 20.\\text{ Find Q1, Q2, Q3, and IQR.}",
      steps: [
        {
          explanation: "The data is already sorted. Q2 is the middle (4th) value.",
          latex: "Q_2 = 11",
        },
        {
          explanation: "Lower half (values 1–3): 3, 5, 8. Q1 is the median of this half.",
          latex: "Q_1 = 5",
        },
        {
          explanation: "Upper half (values 5–7): 14, 17, 20. Q3 is the median of this half.",
          latex: "Q_3 = 17",
        },
        {
          explanation: "Calculate the IQR.",
          latex: "\\text{IQR} = 17 - 5 = 12",
        },
      ],
      finalAnswerLatex: "Q_1 = 5,\\quad Q_2 = 11,\\quad Q_3 = 17,\\quad \\text{IQR} = 12",
    } as WorkedExample,
    {
      title: "Find quartiles for an even-count data set",
      questionLatex:
        "\\text{Data: } 4,\\; 7,\\; 10,\\; 13,\\; 16,\\; 19.\\text{ Find Q1, Q3, and IQR.}",
      steps: [
        {
          explanation: "6 values split evenly: lower half is 4, 7, 10; upper half is 13, 16, 19.",
          latex: "Q_2 = \\frac{10 + 13}{2} = 11.5",
        },
        {
          explanation: "Q1 is the median of the lower half (4, 7, 10).",
          latex: "Q_1 = 7",
        },
        {
          explanation: "Q3 is the median of the upper half (13, 16, 19).",
          latex: "Q_3 = 16,\\quad \\text{IQR} = 16 - 7 = 9",
        },
      ],
      finalAnswerLatex: "Q_1 = 7,\\quad Q_3 = 16,\\quad \\text{IQR} = 9",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-qrt-g1",
      "Which quartile is the same as the median of the whole data set?",
      "B",
      ["Q1", "Q2", "Q3", "IQR"],
      "Q2 is always the median — the middle value of the full sorted data set."
    ),
    answer(
      "y8-dat-qrt-g2",
      "Sorted data: 2, 4, 6, 8, 10. Find Q2 (the median).",
      "\\text{Middle value of } 5",
      "6",
      "5 values → median is the 3rd value. Sorted: 2, 4, 6, 8, 10. Q2 = 6."
    ),
    answer(
      "y8-dat-qrt-g3",
      "Sorted data: 2, 4, 6, 8, 10. Q2 = 6. The lower half (excluding Q2) is 2, 4. Find Q1.",
      "Q_1 = \\frac{2 + 4}{2}",
      "3",
      "Lower half: 2, 4 (two values). Q1 = (2 + 4) ÷ 2 = 3."
    ),
    answer(
      "y8-dat-qrt-g4",
      "Q1 = 3, Q3 = 9. Find the IQR.",
      "\\text{IQR} = Q_3 - Q_1 = 9 - 3",
      "6",
      "IQR = Q3 − Q1 = 9 − 3 = 6."
    ),
  ],
  independentPractice: [
    answer(
      "y8-dat-qrt-i1",
      "Sorted data: 1, 3, 5, 7, 9, 11. Find Q2 (the median).",
      "Q_2 = \\frac{5 + 7}{2}",
      "6",
      "6 values → median is the average of 3rd and 4th values: (5 + 7) ÷ 2 = 6."
    ),
    answer(
      "y8-dat-qrt-i2",
      "Sorted data: 1, 3, 5, 7, 9, 11. The lower half is 1, 3, 5. Find Q1.",
      "Q_1 = \\text{median of } 1,\\; 3,\\; 5",
      "3",
      "Lower half: 1, 3, 5. The middle value is 3. Q1 = 3."
    ),
    answer(
      "y8-dat-qrt-i3",
      "Sorted data: 1, 3, 5, 7, 9, 11. Q1 = 3, Q3 = 9. Find the IQR.",
      "\\text{IQR} = 9 - 3",
      "6",
      "IQR = Q3 − Q1 = 9 − 3 = 6."
    ),
    choice(
      "y8-dat-qrt-i4",
      "Group A: IQR = 4. Group B: IQR = 14. Which group has more consistent middle values?",
      "A",
      [
        "Group A — smaller IQR means the central values are clustered more closely.",
        "Group B — larger IQR means more data is covered.",
        "Both groups — IQR does not measure consistency.",
        "Cannot be determined without the medians.",
      ],
      "A smaller IQR means the middle 50% of values are clustered closely together. Group A's IQR of 4 indicates more consistent central values than Group B's IQR of 14."
    ),
    answer(
      "y8-dat-qrt-i5",
      "Sorted data: 4, 8, 12, 16, 20, 24, 28 (7 values). Find the IQR.",
      "Q_1 = 8,\\; Q_3 = 24,\\; \\text{IQR} = Q_3 - Q_1",
      "16",
      "Q2 = 16 (4th value). Lower half: 4, 8, 12 → Q1 = 8. Upper half: 20, 24, 28 → Q3 = 24. IQR = 24 − 8 = 16."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Including the median in both halves when the count is odd.",
      fix: "For an odd number of values, the median is excluded from both the lower and upper halves before finding Q1 and Q3.",
    },
    {
      mistake: "Calculating IQR as Q1 − Q3 instead of Q3 − Q1.",
      fix: "IQR = Q3 − Q1. Since Q3 is always larger than Q1, the IQR is always a positive value.",
    },
    {
      mistake: "Forgetting to sort the data before finding quartiles.",
      fix: "Quartiles are positions in an ordered list. Sort the data smallest to largest first — quartiles from an unsorted list are meaningless.",
    },
    {
      mistake: "Confusing the IQR with the range.",
      fix: "Range = largest − smallest (covers all data). IQR = Q3 − Q1 (covers only the middle 50%). The IQR is less affected by extreme values.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-dat-qrt-m1",
      "Sorted data: 5, 10, 15, 20, 25. Find Q2.",
      "\\text{Middle (3rd) value}",
      "15",
      "5 values → median is the 3rd value: 15. Q2 = 15."
    ),
    answer(
      "y8-dat-qrt-m2",
      "Sorted data: 5, 10, 15, 20, 25. Q2 = 15. Lower half: 5, 10. Find Q1.",
      "Q_1 = \\frac{5 + 10}{2}",
      "7.5",
      "Lower half (excluding Q2): 5, 10. Q1 = (5 + 10) ÷ 2 = 7.5."
    ),
    answer(
      "y8-dat-qrt-m3",
      "Sorted data: 5, 10, 15, 20, 25. Upper half: 20, 25. Find Q3.",
      "Q_3 = \\frac{20 + 25}{2}",
      "22.5",
      "Upper half (excluding Q2): 20, 25. Q3 = (20 + 25) ÷ 2 = 22.5."
    ),
    answer(
      "y8-dat-qrt-m4",
      "Q1 = 7.5, Q3 = 22.5. Find the IQR.",
      "\\text{IQR} = 22.5 - 7.5",
      "15",
      "IQR = Q3 − Q1 = 22.5 − 7.5 = 15."
    ),
    choice(
      "y8-dat-qrt-m5",
      "What does the IQR measure?",
      "B",
      [
        "The total spread from smallest to largest value.",
        "The spread of the middle 50% of the data.",
        "The distance between Q1 and Q2 only.",
        "The average distance from the mean.",
      ],
      "IQR = Q3 − Q1 covers the range of the middle 50% of the data — the values between the lower and upper quartiles."
    ),
    answer(
      "y8-dat-qrt-m6",
      "Sorted data: 2, 6, 8, 14, 18, 22 (6 values). Find the IQR.",
      "Q_1 = 6,\\; Q_3 = 18,\\; \\text{IQR} = 18 - 6",
      "12",
      "Lower half: 2, 6, 8 → Q1 = 6. Upper half: 14, 18, 22 → Q3 = 18. IQR = 18 − 6 = 12."
    ),
    answer(
      "y8-dat-qrt-m7",
      "Sorted data: 3, 7, 11, 15, 19, 23, 27 (7 values). Find the IQR.",
      "Q_1 = 7,\\; Q_3 = 23,\\; \\text{IQR} = 23 - 7",
      "16",
      "Q2 = 15 (4th). Lower half: 3, 7, 11 → Q1 = 7. Upper half: 19, 23, 27 → Q3 = 23. IQR = 23 − 7 = 16."
    ),
    choice(
      "y8-dat-qrt-m8",
      "Group A: IQR = 6. Group B: IQR = 20. Same median for both. Which statement is correct?",
      "C",
      [
        "Group A has a higher typical value.",
        "Group B is more consistent.",
        "Group A's middle values are more tightly clustered.",
        "Group B has a smaller range.",
      ],
      "Same median means the same typical value. Group A's smaller IQR (6) means its central values are more tightly clustered than Group B's (IQR = 20)."
    ),
    answer(
      "y8-dat-qrt-m9",
      "Sorted data: 10, 14, 18, 22, 26, 30, 34, 38 (8 values). Find the IQR.",
      "Q_1 = 16,\\; Q_3 = 32,\\; \\text{IQR} = 32 - 16",
      "16",
      "Lower half: 10, 14, 18, 22 → Q1 = (14 + 18) ÷ 2 = 16. Upper half: 26, 30, 34, 38 → Q3 = (30 + 34) ÷ 2 = 32. IQR = 32 − 16 = 16."
    ),
    answer(
      "y8-dat-qrt-m10",
      "Q1 = 12 and IQR = 8. Find Q3.",
      "Q_3 = Q_1 + \\text{IQR} = 12 + 8",
      "20",
      "IQR = Q3 − Q1, so Q3 = Q1 + IQR = 12 + 8 = 20."
    ),
  ],
};

// ── Lesson 9: Outliers and Data Interpretation ────────────────────────────────

const outliersAndInterpretation: LessonContent = {
  description:
    "Identify outliers in a data set, explain how outliers affect the mean and median differently, and choose the appropriate measure of centre.",
  learningIntention:
    "Recognise outliers, describe their effect on the mean and median, and choose the better measure of centre when outliers are present.",
  successCriteria: [
    "Identify an outlier as a value that is much larger or smaller than the rest of the data.",
    "Calculate how much an outlier shifts the mean compared to the dataset without it.",
    "Explain why the median is largely unaffected by a single outlier.",
    "Choose median over mean as the better measure of centre when outliers are present.",
  ],
  teaching: {
    paragraphs: [
      "An outlier is a data value that sits far away from the rest of the data — either much larger or much smaller. For example, in the set 3, 5, 6, 7, 8 all values are close together, but in 3, 5, 6, 7, 58 the value 58 is an outlier.",
      "Outliers pull the mean toward them significantly because the mean depends on the sum of every value. Adding a very large outlier raises the sum — and therefore the mean — by a large amount. The mean of 3, 5, 6, 7, 9 is 6, but the mean of 3, 5, 6, 7, 59 is 16. One value changed the mean by 10.",
      "The median is resistant to outliers because it depends only on the position of the middle value, not its exact size. Replacing the largest value with a much bigger number does not change which value sits in the middle. The median of both 3, 5, 6, 7, 9 and 3, 5, 6, 7, 59 is 6.",
      "When reporting a typical value for data that contains an outlier, use the median — it gives a more representative picture of where most values sit. The mean alone can be misleading because a single extreme value skews it away from the bulk of the data.",
    ],
    latexBlocks: [
      "\\text{Mean depends on every value — one outlier can shift it significantly.}",
      "\\text{Median depends on position only — one outlier rarely changes it.}",
      "\\text{Use the median when outliers are present.}",
    ],
  },
  workedExamples: [
    {
      title: "Show how an outlier changes the mean",
      questionLatex:
        "\\text{Data A: } 3,\\;5,\\;6,\\;7,\\;9.\\quad \\text{Data B: } 3,\\;5,\\;6,\\;7,\\;59.\\text{ Compare the means.}",
      steps: [
        {
          explanation: "Find the mean of Data A (no outlier).",
          latex: "\\text{Mean A} = \\frac{3+5+6+7+9}{5} = \\frac{30}{5} = 6",
        },
        {
          explanation: "Find the mean of Data B (59 is an outlier).",
          latex: "\\text{Mean B} = \\frac{3+5+6+7+59}{5} = \\frac{80}{5} = 16",
        },
        {
          explanation: "The outlier shifted the mean by 10, far above the bulk of the data.",
          latex: "16 - 6 = 10",
        },
      ],
      finalAnswerLatex: "\\text{Mean rose from 6 to 16 — the outlier shifted it by 10.}",
    } as WorkedExample,
    {
      title: "Show that the median is stable",
      questionLatex:
        "\\text{Data A: } 3,\\;5,\\;6,\\;7,\\;9.\\quad \\text{Data B: } 3,\\;5,\\;6,\\;7,\\;59.\\text{ Compare the medians.}",
      steps: [
        {
          explanation: "For both sets, 5 values means the median is the 3rd value.",
          latex: "\\text{Median A} = 6,\\quad \\text{Median B} = 6",
        },
        {
          explanation: "Replacing 9 with 59 does not change which value sits in position 3.",
          latex: "\\text{Both medians are } 6.",
        },
      ],
      finalAnswerLatex: "\\text{Median is unchanged — use it when outliers are present.}",
    } as WorkedExample,
    {
      title: "Choose the better measure of centre",
      questionLatex:
        "\\text{House prices on a street (\\$000s): } 400,\\;420,\\;410,\\;390,\\;1200.\\text{ Which measure is better?}",
      steps: [
        {
          explanation: "The value 1200 is much larger than the others — it is an outlier.",
          latex: "\\text{Mean} = \\frac{400+420+410+390+1200}{5} = \\frac{2820}{5} = 564",
        },
        {
          explanation: "The median is the 3rd value of the sorted set.",
          latex: "\\text{Sorted: } 390,\\;400,\\;410,\\;420,\\;1200.\\quad \\text{Median} = 410",
        },
        {
          explanation: "The median of 410 better represents the typical street price than the mean of 564.",
          latex: "\\text{Use the median.}",
        },
      ],
      finalAnswerLatex: "\\text{Median (\\$410k) is the better measure — it is not distorted by the outlier.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-out-g1",
      "Which value is an outlier in this set: 5, 6, 7, 8, 55?",
      "D",
      ["5", "6", "7", "55"],
      "55 is far larger than all other values (5–8). An outlier is a value that sits well away from the rest of the data."
    ),
    answer(
      "y8-dat-out-g2",
      "Data: 3, 5, 6, 7, 9. Find the mean.",
      "\\text{Mean} = \\frac{3+5+6+7+9}{5}",
      "6",
      "Sum = 3 + 5 + 6 + 7 + 9 = 30. Mean = 30 ÷ 5 = 6."
    ),
    answer(
      "y8-dat-out-g3",
      "Data: 3, 5, 6, 7, 99. Find the median.",
      "\\text{Sorted: } 3,\\;5,\\;6,\\;7,\\;99",
      "6",
      "Sorted: 3, 5, 6, 7, 99. 5 values → median is the 3rd value = 6. The outlier 99 does not change the median."
    ),
    choice(
      "y8-dat-out-g4",
      "A data set contains one very large outlier. Which measure of centre should you use to represent the typical value?",
      "B",
      ["Mean — it uses every value.", "Median — it is not distorted by the outlier.", "Range — it shows the full spread.", "Mode — it appears most often."],
      "The median is resistant to outliers because it depends on the middle position, not the sum of all values. Use the median when an outlier is present."
    ),
  ],
  independentPractice: [
    answer(
      "y8-dat-out-i1",
      "Data: 4, 6, 8, 10, 12. Find the mean.",
      "\\text{Mean} = \\frac{4+6+8+10+12}{5}",
      "8",
      "Sum = 4 + 6 + 8 + 10 + 12 = 40. Mean = 40 ÷ 5 = 8."
    ),
    answer(
      "y8-dat-out-i2",
      "Data: 4, 6, 8, 10, 72. Find the median.",
      "\\text{Sorted: } 4,\\;6,\\;8,\\;10,\\;72",
      "8",
      "Sorted: 4, 6, 8, 10, 72. 5 values → median is the 3rd value = 8. The outlier 72 does not shift the median."
    ),
    answer(
      "y8-dat-out-i3",
      "Data: 4, 6, 8, 10, 72. Find the mean.",
      "\\text{Mean} = \\frac{4+6+8+10+72}{5}",
      "20",
      "Sum = 4 + 6 + 8 + 10 + 72 = 100. Mean = 100 ÷ 5 = 20."
    ),
    choice(
      "y8-dat-out-i4",
      "The mean without an outlier is 8, and the mean with the outlier is 20. By how much did the outlier raise the mean?",
      "C",
      ["8", "10", "12", "20"],
      "20 − 8 = 12. The outlier raised the mean by 12."
    ),
    answer(
      "y8-dat-out-i5",
      "Data: 10, 11, 12, 13, 14. The outlier value 60 is added. What is the new range?",
      "\\text{Range} = 60 - 10",
      "50",
      "New largest value = 60, smallest = 10. New range = 60 − 10 = 50."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Saying the median changes when an outlier is added to either end of the sorted data.",
      fix: "Adding one value to the end of an ordered list shifts all positions by half a step. Recalculate the median position using the new count — the median may shift by one position but will not jump to the outlier's value.",
    },
    {
      mistake: "Using the mean to describe a typical value when the data contains an outlier.",
      fix: "A single outlier can pull the mean far from the bulk of the data. Use the median to represent the typical value when an outlier is present.",
    },
    {
      mistake: "Identifying the largest value in a set as an outlier even when it is close to the others.",
      fix: "An outlier must be substantially separated from the rest of the data. A value of 12 in the set 5, 7, 8, 9, 12 is not an outlier — it is just the maximum.",
    },
    {
      mistake: "Forgetting that an outlier also dramatically increases the range.",
      fix: "Range = largest − smallest. A very large or very small outlier becomes one of the endpoints, so the range increases significantly even when the bulk of the data is unchanged.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-dat-out-m1",
      "Data: 5, 7, 8, 9, 11. Find the mean.",
      "\\text{Mean} = \\frac{5+7+8+9+11}{5}",
      "8",
      "Sum = 5 + 7 + 8 + 9 + 11 = 40. Mean = 40 ÷ 5 = 8."
    ),
    answer(
      "y8-dat-out-m2",
      "Data: 5, 7, 8, 9, 51. Find the mean.",
      "\\text{Mean} = \\frac{5+7+8+9+51}{5}",
      "16",
      "Sum = 5 + 7 + 8 + 9 + 51 = 80. Mean = 80 ÷ 5 = 16."
    ),
    answer(
      "y8-dat-out-m3",
      "Data: 5, 7, 8, 9, 51. Find the median.",
      "\\text{Sorted: } 5,\\;7,\\;8,\\;9,\\;51",
      "8",
      "5 values → median is the 3rd value = 8. The outlier 51 does not change the median."
    ),
    choice(
      "y8-dat-out-m4",
      "Mean without outlier = 8, mean with outlier = 16. By how much did the outlier raise the mean?",
      "B",
      ["6", "8", "10", "16"],
      "16 − 8 = 8. The outlier raised the mean by 8."
    ),
    answer(
      "y8-dat-out-m5",
      "Data: 2, 4, 6, 8, 10. The outlier 60 is added. Find the new mean.",
      "\\text{Mean} = \\frac{2+4+6+8+10+60}{6}",
      "15",
      "Sum = 2 + 4 + 6 + 8 + 10 + 60 = 90. Mean = 90 ÷ 6 = 15."
    ),
    answer(
      "y8-dat-out-m6",
      "Data: 2, 4, 6, 8, 10. The outlier 60 is added (6 values). Find the new median.",
      "\\text{Sorted: } 2,\\;4,\\;6,\\;8,\\;10,\\;60",
      "7",
      "6 values → median = average of 3rd and 4th values = (6 + 8) ÷ 2 = 7."
    ),
    answer(
      "y8-dat-out-m7",
      "Data: 2, 4, 6, 8, 10. The outlier 60 is added. Find the new range.",
      "\\text{Range} = 60 - 2",
      "58",
      "New largest = 60, smallest = 2. New range = 60 − 2 = 58. Original range was 10 − 2 = 8."
    ),
    choice(
      "y8-dat-out-m8",
      "A real estate agent reports the mean house price on a street as $850 000. There are 5 houses with prices $400k, $420k, $410k, $390k and $2.6 million. Why might median be more useful here?",
      "A",
      [
        "The $2.6 million house is an outlier that pulls the mean far above what most houses cost.",
        "The mean is always less reliable than the median.",
        "The median equals $850 000 in this case.",
        "House prices cannot be averaged.",
      ],
      "The $2.6 million house is an outlier. It raises the mean significantly above the typical price of the other four houses ($390k–$420k). The median of the sorted set gives a better picture of what a typical house on that street costs."
    ),
    choice(
      "y8-dat-out-m9",
      "Which statistic is most resistant to the effect of a single extreme outlier?",
      "B",
      ["Mean", "Median", "Range", "Sum"],
      "The median depends on the middle position, not the actual values. A single extreme outlier at either end does not change which value sits in the middle. The mean, range and sum all change when any value changes."
    ),
    answer(
      "y8-dat-out-m10",
      "Data: 10, 20, 30, 40, 50 (mean = 30). An outlier of 120 is added. By how much does the mean increase?",
      "\\text{New mean} = \\frac{10+20+30+40+50+120}{6} = \\frac{270}{6} = 45",
      "15",
      "Sum with outlier = 10 + 20 + 30 + 40 + 50 + 120 = 270. New mean = 270 ÷ 6 = 45. Increase = 45 − 30 = 15."
    ),
  ],
};

// ── Lesson 10: Relative Frequency ────────────────────────────────────────────

const relativeFrequency: LessonContent = {
  description:
    "Calculate relative frequency from experimental results, express it as a fraction, decimal, and percentage, and explain how it approaches theoretical probability as the number of trials increases.",
  learningIntention:
    "Calculate relative frequency from experimental data and compare it to theoretical probability.",
  successCriteria: [
    "Calculate relative frequency as frequency ÷ total trials.",
    "Express relative frequency as a fraction, decimal, and percentage.",
    "Explain why relative frequency varies between experiments even with the same theoretical probability.",
    "Describe how relative frequency approaches theoretical probability as the number of trials increases.",
  ],
  teaching: {
    paragraphs: [
      "Relative frequency is the proportion of times an event actually occurs in an experiment. If you roll a die 60 times and get a 6 twelve times, the relative frequency of rolling a 6 is 12 ÷ 60 = 0.2. This is calculated from real data, unlike theoretical probability which is based on equally likely outcomes.",
      "Theoretical probability is the value you would expect from reasoning — for a fair die, the theoretical probability of rolling a 6 is 1 ÷ 6 ≈ 0.167. The relative frequency of 0.2 is close but not identical to 0.167, because chance produces natural variation in short experiments.",
      "The Law of Large Numbers tells us that as the number of trials increases, relative frequency gets closer and closer to theoretical probability. With 600 rolls you would expect to get a 6 about 100 times, giving a relative frequency of 100 ÷ 600 ≈ 0.167 — much closer than the 60-roll experiment. More trials means more reliable relative frequency.",
      "You can also express relative frequency as a percentage: multiply the decimal by 100. A relative frequency of 0.2 = 20%, meaning the event occurred in 20% of all trials. The sum of relative frequencies for all possible outcomes in an experiment always equals 1 (or 100%).",
    ],
    latexBlocks: [
      "\\text{Relative frequency} = \\frac{\\text{frequency of the event}}{\\text{total number of trials}}",
      "\\text{e.g. event occurred 12 times in 60 trials: } \\frac{12}{60} = 0.2 = 20\\%",
      "\\text{As trials} \\to \\infty,\\; \\text{relative frequency} \\to \\text{theoretical probability}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate relative frequency from a tally",
      questionLatex:
        "\\text{A coin is flipped 80 times. Heads appears 44 times. Find the relative frequency of heads.}",
      steps: [
        {
          explanation: "Relative frequency = frequency ÷ total trials.",
          latex: "\\text{Relative frequency} = \\frac{44}{80}",
        },
        {
          explanation: "Simplify and convert to a decimal.",
          latex: "\\frac{44}{80} = \\frac{11}{20} = 0.55",
        },
        {
          explanation: "Convert to a percentage.",
          latex: "0.55 \\times 100 = 55\\%",
        },
      ],
      finalAnswerLatex: "\\text{Relative frequency of heads} = \\frac{11}{20} = 0.55 = 55\\%",
    } as WorkedExample,
    {
      title: "Compare relative frequency to theoretical probability",
      questionLatex:
        "\\text{A die is rolled 120 times. Getting a 3 occurs 24 times. Compare relative frequency to theoretical probability.}",
      steps: [
        {
          explanation: "Calculate the relative frequency from the experiment.",
          latex: "\\text{Relative frequency} = \\frac{24}{120} = 0.2",
        },
        {
          explanation: "State the theoretical probability for a fair die.",
          latex: "P(3) = \\frac{1}{6} \\approx 0.167",
        },
        {
          explanation: "Compare the two values.",
          latex: "0.2 > 0.167\\text{ — slightly higher than expected by chance.}",
        },
      ],
      finalAnswerLatex: "\\text{Relative frequency } 0.2 \\text{ vs theoretical } \\tfrac{1}{6} \\approx 0.167",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-pro-rel-g1",
      "What is the correct formula for relative frequency?",
      "B",
      [
        "number of outcomes ÷ number of trials",
        "frequency of the event ÷ total number of trials",
        "total number of trials ÷ frequency of the event",
        "number of outcomes ÷ number of favourable outcomes",
      ],
      "Relative frequency = frequency of the event ÷ total number of trials. It measures the proportion of trials where the event occurred."
    ),
    answer(
      "y8-pro-rel-g2",
      "A spinner is spun 50 times. Blue appears 10 times. Find the relative frequency of blue as a decimal.",
      "\\text{Relative frequency} = \\frac{10}{50}",
      "0.2",
      "Relative frequency = 10 ÷ 50 = 0.2."
    ),
    answer(
      "y8-pro-rel-g3",
      "A spinner is spun 50 times. Blue appears 10 times. Express the relative frequency of blue as a percentage.",
      "0.2 \\times 100",
      "20",
      "Relative frequency as decimal = 0.2. As a percentage: 0.2 × 100 = 20%."
    ),
    choice(
      "y8-pro-rel-g4",
      "A coin is flipped 20 times and heads appears 12 times. As the coin is flipped many more times, what should happen to the relative frequency of heads?",
      "C",
      [
        "It stays fixed at 12/20 = 0.6.",
        "It keeps increasing toward 1.",
        "It moves closer to the theoretical probability of 0.5.",
        "It becomes unpredictable.",
      ],
      "The Law of Large Numbers: as the number of trials increases, relative frequency approaches the theoretical probability. For a fair coin, theoretical P(heads) = 0.5."
    ),
  ],
  independentPractice: [
    answer(
      "y8-pro-rel-i1",
      "A die is rolled 60 times. The number 4 appears 9 times. Find the relative frequency of rolling a 4 as a fraction in simplest form.",
      "\\frac{9}{60}",
      "3/20",
      "9 ÷ 60 = 3/20. Both 9 and 60 are divisible by 3.",
      ["3/20", "0.15", "15%"]
    ),
    answer(
      "y8-pro-rel-i2",
      "A bag contains red, blue, and green marbles. From 40 draws (with replacement): red=16, blue=14, green=10. What is the relative frequency of green?",
      "\\frac{10}{40}",
      "0.25",
      "Relative frequency of green = 10 ÷ 40 = 0.25."
    ),
    answer(
      "y8-pro-rel-i3",
      "The relative frequency of red is 16/40 = 0.4 and the relative frequency of blue is 14/40 = 0.35. What must the sum of relative frequencies of red, blue, and green equal?",
      "0.4 + 0.35 + 0.25",
      "1",
      "The relative frequencies of all outcomes must sum to 1. 0.4 + 0.35 + 0.25 = 1."
    ),
    answer(
      "y8-pro-rel-i4",
      "A die is rolled 600 times. The number 6 appears 112 times. What is the relative frequency of 6 as a decimal? Round to 2 decimal places.",
      "\\frac{112}{600}",
      "0.19",
      "112 ÷ 600 = 0.1867... ≈ 0.19 (rounded to 2 decimal places).",
      ["0.19", "0.187", "0.1867"]
    ),
    choice(
      "y8-pro-rel-i5",
      "Experiment A: coin flipped 10 times, heads 6 times (relative frequency = 0.6). Experiment B: coin flipped 1000 times, heads 503 times (relative frequency = 0.503). Which relative frequency is more likely to be close to the theoretical probability?",
      "B",
      [
        "Experiment A — fewer trials so less variation.",
        "Experiment B — more trials produce more reliable relative frequencies.",
        "Both are equally reliable.",
        "Neither can be compared to theoretical probability.",
      ],
      "More trials produce more reliable estimates. Experiment B has 1000 trials vs only 10, so its relative frequency of 0.503 is much closer to the theoretical 0.5 than Experiment A's 0.6."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Dividing total trials by frequency instead of frequency by total trials.",
      fix: "Relative frequency = frequency ÷ total. Always divide the specific event count by the total number of trials, not the other way around.",
    },
    {
      mistake: "Assuming relative frequency must exactly equal theoretical probability.",
      fix: "Relative frequency is an experimental result — it naturally varies due to chance. It only approaches theoretical probability with a very large number of trials.",
    },
    {
      mistake: "Thinking relative frequencies can sum to more than 1.",
      fix: "The relative frequencies of all possible outcomes in an experiment must sum exactly to 1 (100%). This is a useful check: if your values don't sum to 1, recalculate.",
    },
    {
      mistake: "Expressing relative frequency as a percentage but forgetting to multiply by 100.",
      fix: "To convert from decimal to percentage: multiply by 100. Relative frequency 0.35 as a percentage is 35%, not 0.35%.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-pro-rel-m1",
      "A spinner is spun 40 times. Red appears 8 times. Find the relative frequency of red as a decimal.",
      "\\frac{8}{40}",
      "0.2",
      "Relative frequency = 8 ÷ 40 = 0.2."
    ),
    answer(
      "y8-pro-rel-m2",
      "A spinner is spun 40 times. Red appears 8 times. Express the relative frequency of red as a percentage.",
      "0.2 \\times 100",
      "20",
      "0.2 × 100 = 20%."
    ),
    answer(
      "y8-pro-rel-m3",
      "A coin is flipped 200 times. Tails appears 94 times. Find the relative frequency of tails as a decimal.",
      "\\frac{94}{200}",
      "0.47",
      "Relative frequency = 94 ÷ 200 = 0.47."
    ),
    choice(
      "y8-pro-rel-m4",
      "Theoretical P(tails) = 0.5, and the relative frequency from 200 flips is 0.47. What is the most likely reason they differ?",
      "B",
      [
        "The coin is biased.",
        "Natural variation — random outcomes cause small differences in short experiments.",
        "The formula was applied incorrectly.",
        "Theoretical probability only applies to dice, not coins.",
      ],
      "Natural variation always causes relative frequency to differ slightly from theoretical probability in a finite experiment. The coin is not necessarily biased — 200 flips is still a moderate sample."
    ),
    answer(
      "y8-pro-rel-m5",
      "A die is rolled 90 times. Results: 1→12, 2→18, 3→15, 4→10, 5→20, 6→15. Find the relative frequency of rolling a 5.",
      "\\frac{20}{90}",
      "2/9",
      "Relative frequency = 20 ÷ 90 = 2/9 ≈ 0.222.",
      ["2/9", "0.222", "0.22"]
    ),
    answer(
      "y8-pro-rel-m6",
      "The sum of all relative frequencies in an experiment must equal what value?",
      "\\text{sum} = ?",
      "1",
      "All possible outcomes cover every trial. Their relative frequencies must sum to 1 (or 100%)."
    ),
    answer(
      "y8-pro-rel-m7",
      "In an experiment, P(red) = 0.3 and P(blue) = 0.45. What is the relative frequency of neither red nor blue?",
      "1 - 0.3 - 0.45",
      "0.25",
      "All relative frequencies sum to 1. P(other) = 1 − 0.3 − 0.45 = 0.25."
    ),
    choice(
      "y8-pro-rel-m8",
      "A biased coin is flipped many times. P(heads) = 0.65. After 1000 flips, which is the most likely relative frequency of heads?",
      "C",
      ["0.50", "0.60", "0.65", "0.70"],
      "With many trials, relative frequency converges to theoretical probability. P(heads) = 0.65 means the relative frequency should be close to 0.65 after 1000 flips."
    ),
    answer(
      "y8-pro-rel-m9",
      "A student rolls a die 30 times and gets a 2 exactly 5 times. What is the relative frequency of 2 as a percentage?",
      "\\frac{5}{30} \\times 100",
      "16.67",
      "Relative frequency = 5 ÷ 30 = 1/6 ≈ 0.1667. As percentage: ≈ 16.67%.",
      ["16.67", "16.7", "16.667"]
    ),
    answer(
      "y8-pro-rel-m10",
      "In 300 trials, an event has a relative frequency of 0.4. How many times did the event occur?",
      "0.4 \\times 300",
      "120",
      "Frequency = relative frequency × total trials = 0.4 × 300 = 120."
    ),
  ],
};

// ── Lesson 11: Expected Outcomes ──────────────────────────────────────────────

const expectedOutcomes: LessonContent = {
  description:
    "Calculate the expected number of times an event will occur in a given number of trials using expected count = probability × number of trials.",
  learningIntention:
    "Use probability to predict the expected number of outcomes in a repeated experiment.",
  successCriteria: [
    "Use the formula expected count = P(event) × n to find expected outcomes.",
    "Explain that expected count is a prediction, not an exact guarantee.",
    "Calculate how many times an event is expected to occur in a given number of trials.",
    "Identify whether a result is consistent with a theoretical probability.",
  ],
  teaching: {
    paragraphs: [
      "If you flip a fair coin 100 times, you would expect about 50 heads. This is not a guarantee — you might get 47 or 53 — but 50 is the expected value based on the theoretical probability. The expected count formula is: expected count = P(event) × number of trials.",
      "For example, the probability of rolling a 6 on a fair die is 1/6. If you roll the die 120 times, the expected number of 6s is (1/6) × 120 = 20. Again, this is a prediction based on probability — in practice you might get 18 or 23, especially with a smaller number of trials.",
      "The expected count is sometimes called a long-run prediction. With more trials, the actual count is likely to be closer (as a proportion) to the expected count. With very few trials, the actual result may differ noticeably from the expected value.",
      "Expected count lets you check whether an experiment is consistent with a fair model. If you rolled a die 600 times and got a 6 only 50 times (expected: 100), that large gap would suggest the die might be biased. If you got 95, the small gap is probably just natural variation.",
    ],
    latexBlocks: [
      "\\text{Expected count} = P(\\text{event}) \\times n",
      "\\text{e.g. } P(6) = \\frac{1}{6},\\; n = 120 \\Rightarrow \\text{Expected count} = \\frac{1}{6} \\times 120 = 20",
      "\\text{Expected count is a prediction — actual results will vary.}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate expected count for a coin flip",
      questionLatex:
        "\\text{P(heads) = 0.5. The coin is flipped 200 times. How many heads are expected?}",
      steps: [
        {
          explanation: "Apply the expected count formula.",
          latex: "\\text{Expected count} = P(\\text{heads}) \\times n",
        },
        {
          explanation: "Substitute the values.",
          latex: "= 0.5 \\times 200 = 100",
        },
      ],
      finalAnswerLatex: "\\text{Expected count of heads} = 100",
    } as WorkedExample,
    {
      title: "Calculate expected count for a die roll",
      questionLatex:
        "\\text{A fair die is rolled 90 times. How many times is an even number expected?}",
      steps: [
        {
          explanation: "Find the theoretical probability of an even number.",
          latex: "P(\\text{even}) = \\frac{3}{6} = \\frac{1}{2}",
        },
        {
          explanation: "Apply the expected count formula.",
          latex: "\\text{Expected count} = \\frac{1}{2} \\times 90 = 45",
        },
      ],
      finalAnswerLatex: "\\text{Expected even numbers} = 45",
    } as WorkedExample,
    {
      title: "Find the number of trials from expected count",
      questionLatex:
        "\\text{P(event) = 0.4. The event is expected to occur 36 times. How many trials were there?}",
      steps: [
        {
          explanation: "Rearrange the formula to find n.",
          latex: "n = \\frac{\\text{expected count}}{P(\\text{event})} = \\frac{36}{0.4}",
        },
        {
          explanation: "Calculate.",
          latex: "n = 90",
        },
      ],
      finalAnswerLatex: "n = 90 \\text{ trials}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-pro-exp-g1",
      "The formula for expected count is…",
      "C",
      [
        "n ÷ P(event)",
        "P(event) + n",
        "P(event) × n",
        "n ÷ outcomes",
      ],
      "Expected count = P(event) × n, where n is the total number of trials."
    ),
    answer(
      "y8-pro-exp-g2",
      "P(heads) = 0.5. A coin is flipped 100 times. Find the expected number of heads.",
      "\\text{Expected} = 0.5 \\times 100",
      "50",
      "Expected count = P(heads) × n = 0.5 × 100 = 50."
    ),
    answer(
      "y8-pro-exp-g3",
      "P(rolling a 6) = 1/6. A die is rolled 120 times. Find the expected number of 6s.",
      "\\text{Expected} = \\frac{1}{6} \\times 120",
      "20",
      "Expected count = (1/6) × 120 = 20."
    ),
    answer(
      "y8-pro-exp-g4",
      "P(event) = 0.4 and the event is expected to occur 36 times. How many trials were there?",
      "n = \\frac{36}{0.4}",
      "90",
      "Rearrange: n = expected count ÷ P(event) = 36 ÷ 0.4 = 90."
    ),
  ],
  independentPractice: [
    answer(
      "y8-pro-exp-i1",
      "A spinner has 4 equal sections: red, blue, green, yellow. It is spun 80 times. How many times is red expected to appear?",
      "P(\\text{red}) = \\frac{1}{4},\\; \\text{Expected} = \\frac{1}{4} \\times 80",
      "20",
      "P(red) = 1/4. Expected count = (1/4) × 80 = 20."
    ),
    answer(
      "y8-pro-exp-i2",
      "A bag has 3 red and 7 blue marbles. A marble is drawn and replaced 50 times. How many times is a red marble expected?",
      "P(\\text{red}) = \\frac{3}{10},\\; \\text{Expected} = \\frac{3}{10} \\times 50",
      "15",
      "P(red) = 3/10. Expected count = (3/10) × 50 = 15."
    ),
    answer(
      "y8-pro-exp-i3",
      "P(rain on any given day) = 0.3. How many rainy days are expected in 30 days?",
      "\\text{Expected} = 0.3 \\times 30",
      "9",
      "Expected rainy days = 0.3 × 30 = 9."
    ),
    answer(
      "y8-pro-exp-i4",
      "A die is rolled and getting a number less than 3 is recorded. If 48 such outcomes are expected, how many times was the die rolled?",
      "P(< 3) = \\frac{2}{6} = \\frac{1}{3},\\; n = \\frac{48}{1/3}",
      "144",
      "P(< 3) = 2/6 = 1/3. n = 48 ÷ (1/3) = 48 × 3 = 144."
    ),
    choice(
      "y8-pro-exp-i5",
      "P(event) = 0.25 and you run 60 trials. You actually get 10 outcomes. What does this tell you?",
      "B",
      [
        "The experiment is definitely not fair — too few outcomes.",
        "The result is lower than expected (expected = 15) but could be due to natural variation.",
        "Expected count and actual count must always match.",
        "The probability formula was applied incorrectly.",
      ],
      "Expected count = 0.25 × 60 = 15. Getting 10 is below the expected value, but with only 60 trials this could easily be due to natural variation — not necessarily evidence of bias."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Treating expected count as a guaranteed outcome.",
      fix: "Expected count is a theoretical prediction, not a certainty. Actual results will vary due to random chance, especially in shorter experiments.",
    },
    {
      mistake: "Dividing n by P(event) instead of multiplying.",
      fix: "Expected count = P(event) × n. To find n from expected count, rearrange: n = expected count ÷ P(event).",
    },
    {
      mistake: "Using relative frequency as the probability without converting it first.",
      fix: "Make sure P(event) is expressed as a decimal or fraction before multiplying. A relative frequency of 40% must be converted to 0.4 first.",
    },
    {
      mistake: "Concluding bias whenever the actual count differs from expected.",
      fix: "Small differences between actual and expected count are normal variation. Only a large, consistent gap over many trials would suggest bias.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-pro-exp-m1",
      "P(event) = 0.6. The event is run 50 times. Find the expected count.",
      "0.6 \\times 50",
      "30",
      "Expected count = 0.6 × 50 = 30."
    ),
    answer(
      "y8-pro-exp-m2",
      "A die is rolled 300 times. How many times is rolling a 1 expected?",
      "P(1) = \\frac{1}{6},\\; \\frac{1}{6} \\times 300",
      "50",
      "P(1) = 1/6. Expected count = (1/6) × 300 = 50."
    ),
    answer(
      "y8-pro-exp-m3",
      "P(event) = 0.2. The event is expected to occur 14 times. How many trials were there?",
      "n = \\frac{14}{0.2}",
      "70",
      "n = 14 ÷ 0.2 = 70."
    ),
    choice(
      "y8-pro-exp-m4",
      "A fair coin is flipped 40 times. What is the expected number of tails?",
      "B",
      ["10", "20", "30", "40"],
      "P(tails) = 0.5. Expected count = 0.5 × 40 = 20."
    ),
    answer(
      "y8-pro-exp-m5",
      "A spinner has 5 equal sections. It is spun 150 times. How many times is any one section expected to appear?",
      "P = \\frac{1}{5},\\; \\frac{1}{5} \\times 150",
      "30",
      "P(one section) = 1/5. Expected count = (1/5) × 150 = 30."
    ),
    answer(
      "y8-pro-exp-m6",
      "A bag has 4 red and 6 blue marbles. It is drawn from (with replacement) 200 times. How many times is a blue marble expected?",
      "P(\\text{blue}) = \\frac{6}{10} = 0.6,\\; 0.6 \\times 200",
      "120",
      "P(blue) = 6/10 = 0.6. Expected count = 0.6 × 200 = 120."
    ),
    answer(
      "y8-pro-exp-m7",
      "P(event) = 0.4. The event is expected to occur 36 times. How many trials were there?",
      "n = \\frac{36}{0.4}",
      "90",
      "n = 36 ÷ 0.4 = 90 trials."
    ),
    choice(
      "y8-pro-exp-m8",
      "A die is rolled 60 times and a 3 appears 5 times. Expected count = 10. What is the best explanation for the difference?",
      "B",
      [
        "The die is definitely biased.",
        "Natural variation — 60 trials is a small sample and results vary by chance.",
        "The formula was applied incorrectly.",
        "You should have rolled the die more slowly.",
      ],
      "With only 60 trials, getting 5 when 10 are expected is unusual but possible due to natural variation. You would need a much larger sample and repeated testing to conclude bias."
    ),
    answer(
      "y8-pro-exp-m9",
      "The probability of a seed germinating is 0.75. A gardener plants 80 seeds. How many are expected to germinate?",
      "0.75 \\times 80",
      "60",
      "Expected count = P(germinate) × n = 0.75 × 80 = 60."
    ),
    answer(
      "y8-pro-exp-m10",
      "In 500 trials, an event is expected to occur 200 times. What is the probability of the event?",
      "P = \\frac{200}{500}",
      "0.4",
      "Rearrange: P(event) = expected count ÷ n = 200 ÷ 500 = 0.4."
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "collecting-and-displaying-data":   collectingAndDisplayingData,
  "mean-median-mode-range":           meanMedianModeRange,
  "comparing-data-displays":          comparingDataDisplays,
  "stem-and-leaf-plots":              stemAndLeafPlots,
  "quartiles-and-iqr":                quartilesAndIQR,
  "outliers-and-interpretation":      outliersAndInterpretation,
  "probability-language-and-scale":   probabilityLanguageAndScale,
  "simple-probability":               simpleProbability,
  "two-step-chance-experiments":      twoStepChanceExperiments,
  "relative-frequency":               relativeFrequency,
  "expected-outcomes":                expectedOutcomes,
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
