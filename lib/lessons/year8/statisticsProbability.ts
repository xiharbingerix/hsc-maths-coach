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
  | "masteryQuizPool"
  | "multiPartPractice"
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

// Pool builders — same shape, plus an explicit difficulty tag (1–5).
function poolAnswer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  difficulty: number,
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
    difficulty,
  };
}

function poolChoice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  difficulty: number,
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
    difficulty,
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
      "Data is just organised information about the world — answers to a question we asked. If you survey a class, every answer is one piece of data, and the whole collection is your data set. Before you can graph or summarise it, you have to know what kind of data it is, because the type decides which tools make sense.",
      "There are two main types. Categorical data sorts things into named groups: favourite sport, eye colour, brand of phone. The answers are labels, not amounts. Numerical data records counts or measurements: number of pets, height in centimetres, marks out of 100. The answers are numbers you can add and average. A quick test: if averaging the answers is meaningful (the mean height of a class), it is numerical; if averaging makes no sense (the mean of 'blue' and 'green'), it is categorical.",
      "Raw answers are hard to read in a list, so we count them up in a frequency table. The frequency of a category is simply how many times it appears. To count without losing your place, use tally marks — four strokes and then a diagonal fifth across them, so each completed group is worth 5 and you can read totals at a glance. Adding every frequency gives the total number of responses, which you should always check against how many people you surveyed.",
      "Sometimes a raw count is less useful than a share. The relative frequency of a category is its frequency divided by the total: $\\text{relative frequency} = \\frac{\\text{frequency}}{\\text{total}}$. This works because dividing by the total rescales every count onto the same baseline — out of 1 — so a category with 12 out of 30 ($\\frac{12}{30}=0.4$) is directly comparable to one with 12 out of 200, even though the raw counts are identical. That is exactly why relative frequencies are the right thing to compare two differently sized groups, and why the relative frequencies of all categories must add to 1.",
      "The display you choose should match the data type and the question you want to answer. A column graph puts categories side by side so you can compare their frequencies by height — best for categorical data. A dot plot stacks one dot per value on a number line, so it keeps every individual value visible and makes clusters and gaps obvious — best for small numerical data sets. A sector (pie) chart cuts a circle into slices whose angles are proportional to each category's share, so it shows how a whole splits into parts — useful when the categories together make up 100%.",
      "The most common slip is to compute a mean of categorical data. You can always report the mode — the category with the highest frequency, which exists for any data — but there is no meaningful sum of 'red' and 'blue', so the mean is undefined for labels. Reserve the mean for numerical data, and use the mode (or relative frequencies) to summarise categories.",
    ],
    latexBlocks: [
      "\\text{frequency} = \\text{how many times a value appears in the data set}",
      "\\text{relative frequency} = \\frac{\\text{frequency}}{\\text{total frequency}}",
      "\\text{categorical} \\to \\text{mode only};\\quad \\text{numerical} \\to \\text{mean, median, mode}",
      "\\text{column graph: compare categories} \\quad\\bullet\\quad \\text{dot plot: show every value} \\quad\\bullet\\quad \\text{sector chart: parts of a whole}",
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
        "\\text{Find the range of the data shown in the dot plot.}",
      dotPlotDiagram: {
        description:
          "Dot plot from 3 to 6: two dots at 3, three dots at 4, one dot at 5, one dot at 6.",
        min: 2,
        max: 7,
        values: [3, 3, 4, 4, 4, 5, 6],
      },
      steps: [
        {
          explanation: "Range = largest value minus smallest value.",
          latex: "\\text{Range} = 6 - 3 = 3",
        },
      ],
      finalAnswerLatex: "\\text{Range} = 3",
    } as WorkedExample,
    {
      title: "Choose a display and find a sector angle (harder)",
      questionLatex:
        "\\text{A survey of 40 students records travel to school — Walk 10, Bus 16, Car 8, Bike 6. Which display suits this data, and what angle would the Bus slice take in a sector chart?}",
      steps: [
        {
          explanation: "The categories are labels (modes of travel), so the data is categorical — a column graph or sector chart fits, not a dot plot.",
          latex: "\\text{categorical data} \\Rightarrow \\text{column or sector chart}",
        },
        {
          explanation: "A sector chart shows shares of a whole, so find Bus as a relative frequency of the total.",
          latex: "\\text{relative frequency of Bus} = \\frac{16}{40} = \\frac{2}{5}",
        },
        {
          explanation: "A full circle is 360 degrees, so the slice angle is that share of 360 degrees.",
          latex: "\\text{angle} = \\frac{2}{5} \\times 360^\\circ = 144^\\circ",
        },
      ],
      finalAnswerLatex: "\\text{Use a sector (or column) chart; the Bus slice is } 144^\\circ.",
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
    {
      ...choice(
        "y8-dat-col-g4",
        "What is the mode of the data shown in the dot plot?",
        "B",
        ["4", "5", "6", "7"],
        "The mode is the value that appears most often. 5 appears three times — more than any other value. Mode = 5."
      ),
      dotPlotDiagram: {
        description: "Dot plot: two dots at 4, three dots at 5, one dot at 6, one dot at 7.",
        min: 3,
        max: 8,
        values: [4, 4, 5, 5, 5, 6, 7],
      },
    },
  ],
  independentPractice: [
    answer(
      "y8-dat-col-i1",
      "Frequency table — A: 15, B: 22, C: 9, D: 14. What is the total frequency?",
      "15 + 22 + 9 + 14",
      "60",
      "15 + 22 + 9 + 14 = 60."
    ),
    {
      ...answer(
        "y8-dat-col-i2",
        "What is the range of the data shown in the dot plot?",
        "\\text{Range} = 7 - 3",
        "4",
        "Range = largest value - smallest value = 7 - 3 = 4."
      ),
      dotPlotDiagram: {
        description:
          "Dot plot: one dot at 3, two dots at 4, three dots at 5, one dot at 6, one dot at 7.",
        min: 2,
        max: 8,
        values: [3, 4, 4, 5, 5, 5, 6, 7],
      },
    },
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
    {
      ...answer(
        "y8-dat-col-m1",
        "How many data values are there in total in the dot plot?",
        "3 + 1 + 2 + 4 + 2",
        "12",
        "3 + 1 + 2 + 4 + 2 = 12 data values in total."
      ),
      dotPlotDiagram: {
        description:
          "Dot plot: three dots at 6, one dot at 7, two dots at 8, four dots at 9, two dots at 10.",
        min: 5,
        max: 11,
        counts: [
          { value: 6, count: 3 },
          { value: 7, count: 1 },
          { value: 8, count: 2 },
          { value: 9, count: 4 },
          { value: 10, count: 2 },
        ],
      },
    },
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
    {
      ...answer(
        "y8-dat-col-m6",
        "The dot plot has mode 14 and range 6. Find the difference between the mode and the range.",
        "14 - 6",
        "8",
        "Mode = 14 (appears 3 times). Range = 16 - 10 = 6. Difference = 14 - 6 = 8."
      ),
      dotPlotDiagram: {
        description:
          "Dot plot: two dots at 10, one dot at 12, three dots at 14, one dot at 16.",
        min: 9,
        max: 17,
        values: [10, 10, 12, 14, 14, 14, 16],
      },
    },
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
  masteryQuizPool: [
    // Difficulty 1
    poolChoice("y8-dat-col-p1", "Which is an example of categorical data?", "A",
      ["Favourite fruit", "Height in cm", "Number of pets", "Mass in kg"],
      "Favourite fruit is a label/group, so it is categorical; the others are numerical.", 1),
    poolAnswer("y8-dat-col-p2", "Frequency table — Walk: 9, Bus: 14, Car: 7. How many students in total?",
      "9 + 14 + 7", "30", "9 + 14 + 7 = 30.", 1),
    {
      ...poolChoice("y8-dat-col-p3", "What is the mode of the data shown in the dot plot?", "B",
        ["4", "5", "6", "8"], "The value 5 has the most dots (5), so the mode is 5.", 1),
      dotPlotDiagram: {
        description: "Dot plot: two dots at 4, five dots at 5, one dot at 6.",
        min: 3, max: 7,
        counts: [{ value: 4, count: 2 }, { value: 5, count: 5 }, { value: 6, count: 1 }],
      },
    },
    poolAnswer("y8-dat-col-p4", "Frequency table — Red: 11, Blue: 6, Green: 9. How many more chose Red than Blue?",
      "11 - 6", "5", "11 - 6 = 5.", 1),
    poolChoice("y8-dat-col-p5", "Which display shows each individual data value on a number line?", "C",
      ["Sector chart", "Column graph", "Dot plot", "Frequency table"],
      "A dot plot places one dot for every value on a number line.", 1),
    poolAnswer("y8-dat-col-p6", "A frequency table has frequencies 4, 9, 6, and 1. What is the total frequency?",
      "4 + 9 + 6 + 1", "20", "4 + 9 + 6 + 1 = 20.", 1),
    // Difficulty 2
    poolAnswer("y8-dat-col-p7", "Frequency table — Mon 6, Tue 9, Wed 5, Thu 8, Fri 7. How many students chose Tuesday or Thursday?",
      "9 + 8", "17", "9 + 8 = 17.", 2),
    poolChoice("y8-dat-col-p8", "A column graph has bars of height 8, 12, 5, 15. What is the total count?", "B",
      ["35", "40", "45", "30"], "8 + 12 + 5 + 15 = 40.", 2),
    {
      ...poolAnswer("y8-dat-col-p9", "What is the range of the data shown in the dot plot?",
        "\\text{Range} = 9 - 5", "4", "Range = largest - smallest = 9 - 5 = 4.", 2),
      dotPlotDiagram: {
        description: "Dot plot: two dots at 5, one dot at 6, three dots at 7, one dot at 9.",
        min: 4, max: 10,
        values: [5, 5, 6, 7, 7, 7, 9],
      },
    },
    poolAnswer("y8-dat-col-p10", "A frequency table has total 60. Category A has frequency 25. How many chose a category other than A?",
      "60 - 25", "35", "60 - 25 = 35.", 2),
    poolChoice("y8-dat-col-p11", "Which display best shows how one whole budget is divided among 4 spending categories?", "A",
      ["Sector (pie) chart", "Dot plot", "Number line", "Stem-and-leaf plot"],
      "A sector chart shows parts of a single whole.", 2),
    {
      ...poolAnswer("y8-dat-col-p12", "How many data values are shown in the dot plot in total?",
        "1 + 4 + 2 + 3", "10", "1 + 4 + 2 + 3 = 10 data values.", 2),
      dotPlotDiagram: {
        description: "Dot plot: one dot at 3, four dots at 4, two dots at 5, three dots at 6.",
        min: 2, max: 7,
        counts: [{ value: 3, count: 1 }, { value: 4, count: 4 }, { value: 5, count: 2 }, { value: 6, count: 3 }],
      },
    },
    // Difficulty 3
    poolAnswer("y8-dat-col-p13", "Frequency table — Soccer 16, Netball 12, Cricket 9, Hockey ?, total 45. Find the Hockey frequency.",
      "45 - (16 + 12 + 9)", "8", "Known sum = 16 + 12 + 9 = 37. Missing = 45 - 37 = 8.", 3),
    poolChoice("y8-dat-col-p14", "A frequency table has total 50. Category X has frequency 30. What percentage is Category X?", "C",
      ["30%", "50%", "60%", "80%"], "30 / 50 = 0.6 = 60%.", 3),
    {
      ...poolAnswer("y8-dat-col-p15", "The dot plot has mode 12 and range 7. Find the sum of the mode and range.",
        "12 + 7", "19", "Mode = 12 (three dots). Range = 15 - 8 = 7. Sum = 12 + 7 = 19.", 3),
      dotPlotDiagram: {
        description: "Dot plot: two dots at 8, one dot at 10, three dots at 12, one dot at 15.",
        min: 7, max: 16,
        values: [8, 8, 10, 12, 12, 12, 15],
      },
    },
    poolAnswer("y8-dat-col-p16", "A survey of 80 students records favourite sport. 28 chose soccer. What fraction chose soccer? Give a simplified fraction.",
      "\\frac{28}{80}", "7/20", "28/80 = 7/20 (divide top and bottom by 4).", 3, ["0.35", "35%"]),
    poolChoice("y8-dat-col-p17", "Which statement is TRUE?", "B",
      ["The mode of numerical data must be the largest value.",
       "Categorical data can have a mode but not a mean.",
       "Every data set has exactly one mode.",
       "Relative frequency is always greater than 1."],
      "Categorical data can have a mode (most common category) but no mean. The other statements are false.", 3),
    poolAnswer("y8-dat-col-p18", "A frequency table has 6 categories with frequencies 5, 8, 3, 11, 6, and 7. What is the total number of data values?",
      "5 + 8 + 3 + 11 + 6 + 7", "40", "5 + 8 + 3 + 11 + 6 + 7 = 40.", 3),
    // Difficulty 4
    poolAnswer("y8-dat-col-p19", "Frequency table — Red 12, Blue 18, Green 6, Yellow 4 (total 40). Find the relative frequency of Blue as a decimal.",
      "\\frac{18}{40}", "0.45", "18 / 40 = 0.45.", 4, ["9/20", "45%"]),
    poolChoice("y8-dat-col-p20", "A sector chart shows 4 categories. Category A's sector is exactly a quarter of the circle. If the total is 200, how many are in A?", "C",
      ["25", "40", "50", "100"], "A quarter of 200 = 200 / 4 = 50.", 4),
    poolAnswer("y8-dat-col-p21", "A frequency table has total 90. Categories A, B, C have frequencies 30, 25, and 20. The rest is category D. Find the frequency of D.",
      "90 - (30 + 25 + 20)", "15", "Known = 30 + 25 + 20 = 75. D = 90 - 75 = 15.", 4),
    {
      ...poolAnswer("y8-dat-col-p22", "Using the dot plot, how much larger is the range than the mode?",
        "(9 - 2) - 3", "4", "Range = 9 - 2 = 7. Mode = 3 (three dots). Difference = 7 - 3 = 4.", 4),
      dotPlotDiagram: {
        description: "Dot plot: one dot at 2, three dots at 3, two dots at 4, one dot at 5, one dot at 9.",
        min: 1, max: 10,
        values: [2, 3, 3, 3, 4, 4, 5, 9],
      },
    },
    poolChoice("y8-dat-col-p23", "120 students are surveyed. A sector chart shows 'walk' as 25% of the circle. How many students walk?", "B",
      ["25", "30", "35", "48"], "25% of 120 = 0.25 x 120 = 30.", 4),
    poolAnswer("y8-dat-col-p24", "In a frequency table the frequencies are 7, 13, x, and 5. The total is 40. Find x.",
      "40 - (7 + 13 + 5)", "15", "Known sum = 7 + 13 + 5 = 25. x = 40 - 25 = 15.", 4),
    // Difficulty 5
    poolAnswer("y8-dat-col-p25", "A frequency table of test grades: A 6, B 12, C 15, D 7. What percentage of students scored a C? Round to the nearest whole percent.",
      "\\frac{15}{40} \\times 100", "38", "Total = 6 + 12 + 15 + 7 = 40. 15 / 40 = 0.375 = 37.5% ≈ 38%.", 5, ["37.5", "38%"]),
    poolChoice("y8-dat-col-p26", "A sector chart of 360 responses shows 'bus' occupying 90 degrees of the circle. How many responses is that?", "A",
      ["90", "120", "180", "45"], "90 degrees is 90/360 = 1/4 of the circle. 1/4 of 360 = 90.", 5),
    poolAnswer("y8-dat-col-p27", "A frequency table has total 200. Category A is 40% of the data. Category B has 50 responses. How many are in neither A nor B?",
      "200 - (0.4 \\times 200) - 50", "70", "A = 40% of 200 = 80. Neither = 200 - 80 - 50 = 70.", 5),
    poolAnswer("y8-dat-col-p28", "A dot plot has 12 values. After adding 3 more values, the largest value rises from 18 to 25 and the smallest stays at 6. By how much does the range increase?",
      "(25 - 6) - (18 - 6)", "7", "Old range = 18 - 6 = 12. New range = 25 - 6 = 19. Increase = 19 - 12 = 7.", 5),
    poolChoice("y8-dat-col-p29", "Two frequency tables each total 50. In table 1, category A = 20; in table 2, category A = 35. Which has the larger relative frequency for A, and what is it (as a decimal)?", "D",
      ["Table 1, 0.40", "Table 1, 0.70", "Table 2, 0.40", "Table 2, 0.70"],
      "Table 2: 35/50 = 0.70, which is larger than Table 1's 20/50 = 0.40.", 5),
    poolAnswer("y8-dat-col-p30", "A frequency table has frequencies in the ratio 2 : 3 : 5 for three categories, with a total of 60. Find the frequency of the largest category.",
      "\\frac{5}{2+3+5} \\times 60", "30", "Ratio total = 2 + 3 + 5 = 10 parts. Largest = 5/10 x 60 = 30.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-col-mp1",
      prompt:
        "A class surveys 40 students on how they travel to school. The frequency table is: Walk 8, Bus 14, Car 12, Bike 6.",
      latex: "\\text{Walk } 8,\\ \\text{Bus } 14,\\ \\text{Car } 12,\\ \\text{Bike } 6",
      answer: "40",
      hint: "Add the frequencies, find the most common category, then compute a relative frequency.",
      explanation:
        "Part (a): total = 8 + 14 + 12 + 6 = 40. Part (b): Bus has the highest frequency (14), so it is the mode. Part (c): relative frequency of Car = 12/40 = 0.3.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many students were surveyed in total?",
          marks: 1,
          answer: "40",
          acceptedAnswers: [],
          hint: "Add every frequency.",
          explanation: "8 + 14 + 12 + 6 = 40 students.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Which travel method is the mode? Give the category name.",
          marks: 1,
          answer: "Bus",
          acceptedAnswers: ["bus"],
          hint: "The mode is the category with the highest frequency.",
          explanation: "Bus has frequency 14, the largest, so Bus is the mode.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the relative frequency of 'Car'? Give your answer as a decimal.",
          marks: 1,
          answer: "0.3",
          acceptedAnswers: ["3/10", "0.30"],
          hint: "Divide the Car frequency by the total.",
          explanation: "Relative frequency = 12/40 = 0.3.",
        },
      ],
    },
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
      "A data set can have dozens of numbers, but often you want one number that stands in for the whole thing — a typical value. That single number is called a measure of centre. There are three of them — mean, median and mode — and they answer slightly different versions of 'what is typical?'. Separately, the range answers a different question: not where the data sits, but how far apart the values are spread.",
      "The mean is what most people call the average: add up every value and share the total out equally among all of them. For the data 3, 7, 5, 9, 6 the total is 30, and there are 5 values, so each value's fair share is $\\frac{30}{5}=6$. In notation, $\\text{mean} = \\frac{\\text{sum of all values}}{\\text{number of values}}$. The most common error is dividing by the wrong count, so always count the values first and divide by that exact number.",
      "Here is why the mean is the natural centre: it is the balance point of the data. Picture each value as an equal weight placed on a ruler at its number. The mean is the spot where the ruler balances, because the total distance of values sitting below it exactly equals the total distance of values sitting above it. Sharing the sum out equally is the same as finding that balance point — that is why a single value far out to one side (an outlier) tips the balance and drags the mean toward it.",
      "The median takes a different approach: it is the value in the middle once the data is sorted from smallest to largest. With an odd number of values there is one true middle value. With an even number there is no single middle, so you average the two middle values to land exactly between them. Because the median only cares about which value sits in the middle position — not how big the extreme values are — moving the largest value further out does not move the median. That positional definition is exactly why the median resists outliers while the mean does not.",
      "The mode is the value that appears most often — the most frequent, not the most central. A data set can have no mode (every value appears once), one mode, or several modes (two or more values tie for the highest frequency). The mode is the only measure of centre that also works for categorical data, since you can count labels even though you cannot average them.",
      "Finally, the range measures spread: $\\text{range} = \\text{largest value} - \\text{smallest value}$. It tells you the total width the data covers. Be careful not to confuse spread with centre — two data sets can share the same mean yet have very different ranges, so an exam answer that compares groups should name both a centre and a spread, never just one.",
    ],
    latexBlocks: [
      "\\text{mean} = \\frac{\\text{sum of all values}}{\\text{number of values}}",
      "\\text{median: sort, then take the middle value (or average the two middle values)}",
      "\\text{mode} = \\text{the most frequently occurring value}",
      "\\text{range} = \\text{largest value} - \\text{smallest value}",
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
    {
      title: "Find a missing value from the mean (harder)",
      questionLatex:
        "\\text{Four test marks are } 14,\\;18,\\;20,\\; x.\\text{ The mean is } 17.\\text{ Find } x.",
      steps: [
        {
          explanation: "The mean times the number of values gives the total sum, so reverse the mean formula to find the sum that 17 demands.",
          latex: "\\text{sum} = \\text{mean} \\times \\text{number of values} = 17 \\times 4 = 68",
        },
        {
          explanation: "Add the three known marks to see how much of that total is already accounted for.",
          latex: "14 + 18 + 20 = 52",
        },
        {
          explanation: "The missing mark must make up the difference between the required total and the known total.",
          latex: "x = 68 - 52 = 16",
        },
      ],
      finalAnswerLatex: "x = 16",
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
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-dat-avg-p1", "Find the mean of: 3, 5, 7.",
      "\\frac{3+5+7}{3}", "5", "Sum = 15. Mean = 15 ÷ 3 = 5.", 1),
    poolChoice("y8-dat-avg-p2", "Data: 4, 4, 6, 9. What is the mode?", "A",
      ["4", "6", "9", "No mode"], "4 appears twice; the others once. Mode = 4.", 1),
    poolAnswer("y8-dat-avg-p3", "Find the range of: 12, 5, 9, 3.",
      "12 - 3", "9", "Largest 12, smallest 3. Range = 12 - 3 = 9.", 1),
    poolAnswer("y8-dat-avg-p4", "Find the median of: 7, 2, 5.",
      "\\text{Sort: } 2, 5, 7", "5", "Sorted: 2, 5, 7. The middle value is 5.", 1),
    poolAnswer("y8-dat-avg-p5", "Find the mean of: 2, 4, 6, 8.",
      "\\frac{2+4+6+8}{4}", "5", "Sum = 20. Mean = 20 ÷ 4 = 5.", 1),
    poolChoice("y8-dat-avg-p6", "Which statistic measures spread, not centre?", "C",
      ["Mean", "Median", "Range", "Mode"], "Range measures spread; the others measure centre.", 1),
    // Difficulty 2
    poolAnswer("y8-dat-avg-p7", "Find the median of: 9, 3, 7, 1, 5.",
      "\\text{Sort: } 1, 3, 5, 7, 9", "5", "Sorted: 1, 3, 5, 7, 9. The 3rd (middle) value is 5.", 2),
    poolAnswer("y8-dat-avg-p8", "Find the mean of: 11, 7, 9, 13.",
      "\\frac{11+7+9+13}{4}", "10", "Sum = 40. Mean = 40 ÷ 4 = 10.", 2),
    poolChoice("y8-dat-avg-p9", "Data: 2, 2, 5, 5, 8. How many modes does this set have?", "B",
      ["1", "2", "3", "0"], "Both 2 and 5 appear twice, so the set is bimodal — 2 modes.", 2),
    poolAnswer("y8-dat-avg-p10", "Find the median of: 6, 10, 2, 8.",
      "\\text{Sort: } 2, 6, 8, 10", "7", "Sorted: 2, 6, 8, 10. Median = (6 + 8) ÷ 2 = 7.", 2),
    poolAnswer("y8-dat-avg-p11", "Find the range of: 23, 8, 17, 8, 30.",
      "30 - 8", "22", "Largest 30, smallest 8. Range = 30 - 8 = 22.", 2),
    poolChoice("y8-dat-avg-p12", "Five values have a mean of 9. What is their sum?", "C",
      ["9", "14", "45", "59"], "Sum = mean × count = 9 × 5 = 45.", 2),
    // Difficulty 3
    poolAnswer("y8-dat-avg-p13", "Find the median of: 8, 5, 12, 8, 6, 7, 10.",
      "\\text{Sort: } 5, 6, 7, 8, 8, 10, 12", "8", "Sorted: 5, 6, 7, 8, 8, 10, 12. 7 values → median is the 4th: 8.", 3),
    poolAnswer("y8-dat-avg-p14", "Four test scores sum to 312. Find the mean score.",
      "\\frac{312}{4}", "78", "Mean = 312 ÷ 4 = 78.", 3),
    poolChoice("y8-dat-avg-p15", "Data: 10, 12, 12, 14, 17. Which is correct?", "A",
      ["Mean = 13 and mode = 12", "Mean = 12 and mode = 13",
       "Mean = 13 and mode = 14", "Mean = 14 and mode = 12"],
      "Sum = 65, mean = 13. Mode = 12 (appears twice).", 3),
    poolAnswer("y8-dat-avg-p16", "The data set 4, 8, 10, 6 has mean 7. A value of 5 is added. Find the new mean.",
      "\\frac{28 + 5}{5}", "6.6", "Old sum = 28. New sum = 33, count = 5. Mean = 33 ÷ 5 = 6.6.", 3),
    poolAnswer("y8-dat-avg-p17", "Find the mean of: 14, 18, 11, 9, 13.",
      "\\frac{14+18+11+9+13}{5}", "13", "Sum = 65. Mean = 65 ÷ 5 = 13.", 3),
    poolChoice("y8-dat-avg-p18", "A set of 6 values has median 14. The two middle values are 12 and x. Find x.", "D",
      ["12", "14", "15", "16"], "Median = (12 + x) ÷ 2 = 14, so 12 + x = 28, x = 16.", 3),
    // Difficulty 4
    poolAnswer("y8-dat-avg-p19", "The mean of six values is 15. Five of them are 12, 14, 18, 11, and 20. Find the sixth.",
      "15 \\times 6 - (12+14+18+11+20)", "15", "Total = 90. Known five = 75. Sixth = 90 - 75 = 15.", 4),
    poolAnswer("y8-dat-avg-p20", "A data set is 5, 8, x, 12, 15 with median 10. Find the only possible value of x that keeps the list sorted.",
      "\\text{Median = 3rd value} = 10", "10", "With 5 sorted values the median is the 3rd value, so x = 10.", 4),
    poolChoice("y8-dat-avg-p21", "Six numbers have a mean of 20. If each number is increased by 4, what is the new mean?", "C",
      ["20", "22", "24", "26"], "Adding 4 to every value adds 4 to the mean: 20 + 4 = 24.", 4),
    poolAnswer("y8-dat-avg-p22", "The mean of 9, 12, 15, and one more value is 13. Find the missing value.",
      "13 \\times 4 - (9+12+15)", "16", "Total = 52. Known = 36. Missing = 52 - 36 = 16.", 4),
    poolAnswer("y8-dat-avg-p23", "Find the median of: 22, 18, 25, 20, 19, 24, 21, 23.",
      "\\text{Sort 8 values, average the 4th and 5th}", "21.5",
      "Sorted: 18, 19, 20, 21, 22, 23, 24, 25. Median = (21 + 22) ÷ 2 = 21.5.", 4),
    poolChoice("y8-dat-avg-p24", "A set of 5 numbers has mean 10 and one value is changed from 8 to 18. What is the new mean?", "C",
      ["10", "11", "12", "14"], "The sum rises by 10, so the mean rises by 10 ÷ 5 = 2. New mean = 12.", 4),
    // Difficulty 5
    poolAnswer("y8-dat-avg-p25", "A student's first four test means out of 100 are 72, 68, 80, and 76. What score on a fifth test gives an overall mean of exactly 75?",
      "75 \\times 5 - (72+68+80+76)", "79", "Required total = 375. Known four = 296. Fifth = 375 - 296 = 79.", 5),
    poolChoice("y8-dat-avg-p26", "Seven values have a mean of 8. One value of 8 is removed. What is the new mean of the remaining six?", "A",
      ["8", "7", "9", "Cannot be found"],
      "Total = 56; remove 8 → 48 over 6 values = 8. Removing a value equal to the mean leaves the mean unchanged.", 5),
    poolAnswer("y8-dat-avg-p27", "The mean of a class of 20 students is 14. A new student scores 35, raising the count to 21. Find the new mean (round to 2 decimal places).",
      "\\frac{20 \\times 14 + 35}{21}", "15", "Old total = 280. New total = 315 over 21 = 15.00.", 5, ["15.00"]),
    poolAnswer("y8-dat-avg-p28", "A data set of six numbers has a mode of 7, a median of 9, and the values 7, 7, 8, 10, 12, and one unknown value k where k < 7. The mean is 8. Find k.",
      "8 \\times 6 - (7+7+8+10+12)", "4", "Total = 48. Known five = 44. k = 48 - 44 = 4 (and 4 < 7, consistent).", 5),
    poolChoice("y8-dat-avg-p29", "Two groups: Group A has 4 values with mean 10; Group B has 6 values with mean 20. What is the combined mean of all 10 values?", "C",
      ["14", "15", "16", "18"], "Combined sum = 40 + 120 = 160 over 10 values = 16.", 5),
    poolAnswer("y8-dat-avg-p30", "The mean of five numbers is 30. Increasing the largest number by 25 and decreasing the smallest by 5 changes the mean by how much?",
      "\\frac{25 - 5}{5}", "4", "Net change to the sum = +25 - 5 = +20, over 5 values = +4. The mean rises by 4.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-avg-mp1",
      prompt:
        "A netball team scored the following goals across 7 games: 12, 9, 15, 9, 18, 11, 9.",
      latex: "12,\\ 9,\\ 15,\\ 9,\\ 18,\\ 11,\\ 9",
      answer: "12",
      hint: "Sort the data, then find each requested statistic.",
      explanation:
        "Sorted: 9, 9, 9, 11, 12, 15, 18. Mean = 83/7 ≈ 11.86 → but part answers below. Median (4th of 7) = 11. Mode = 9. Range = 18 - 9 = 9.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the median number of goals?",
          marks: 1,
          answer: "11",
          acceptedAnswers: [],
          hint: "Sort the 7 values and take the middle (4th) one.",
          explanation: "Sorted: 9, 9, 9, 11, 12, 15, 18. The 4th value is 11.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the mode?",
          marks: 1,
          answer: "9",
          acceptedAnswers: [],
          hint: "Which value appears most often?",
          explanation: "9 appears three times, more than any other value.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the range?",
          marks: 1,
          answer: "9",
          acceptedAnswers: [],
          hint: "Largest minus smallest.",
          explanation: "Range = 18 - 9 = 9.",
        },
      ],
    },
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
      "Comparing two groups means answering two separate questions, not one. First: which group tends to be higher — that is a question about centre. Second: which group is more consistent — that is a question about spread. A single statistic can only answer one of these, so a complete comparison always reports both a measure of centre and a measure of spread.",
      "Why both are needed becomes obvious with an example. Suppose two soccer teams each have a median of 2 goals per game. On centre alone they look identical. But if Team A's scores range from 1 to 3 while Team B's range from 0 to 6, Team A is steady and predictable while Team B swings wildly. Same centre, very different stories — and you only see the difference by also looking at the spread.",
      "A larger centre means the typical value is higher: a group with median 15 sits higher than one with median 11, so on average it performs better. A smaller range means the values are packed closer together, so the group is more consistent and predictable. These two readings are independent — a group can be higher on average yet also more spread out, or lower yet more consistent — which is exactly why you must check both before drawing a conclusion.",
      "When the two groups are displayed together, a back-to-back stem-and-leaf plot is a compact way to line them up against a shared column of stems. The right-hand group's leaves are read outward in the normal left-to-right direction. The left-hand group's leaves are read outward too, which means right-to-left — away from the stem — so for both groups the leaf nearest the stem is the smallest in that row. Reading them outward keeps each group sorted, so you can pull the median and range straight off the ordered leaves.",
      "The step students skip is interpretation. Numbers on their own do not answer the question; you must translate them back into the context. 'Group A has a higher median and a smaller range, so it scored higher on average and was more consistent' tells the reader what the statistics mean, whereas a bare list of values leaves them to guess. In an exam, the marks for these questions are awarded for that contextual sentence, not for the arithmetic.",
    ],
    latexBlocks: [
      "\\text{centre (median or mean): which group is typically higher?}",
      "\\text{spread (range): which group is more consistent?}",
      "\\text{smaller range} \\Rightarrow \\text{more consistent results}",
      "\\text{back-to-back stem-and-leaf: left leaves read outward, i.e. right-to-left (away from stem)}",
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
    {
      title: "Compare from a back-to-back stem-and-leaf plot (harder)",
      questionLatex:
        "\\text{Use the back-to-back stem-and-leaf plot to compare the medians of Class P and Class Q.}",
      stemAndLeafDiagram: {
        description:
          "Back-to-back stem-and-leaf plot, stems are tens. Class P (left): 54, 55, 64, 68, 72. Class Q (right): 53, 57, 61, 68, 74, 79.",
        keyText: "5 | 6 = 56",
        leftLabel: "Class P",
        rightLabel: "Class Q",
        rows: [
          { stem: 5, leftLeaves: [5, 4], leaves: [3, 7] },
          { stem: 6, leftLeaves: [8, 4], leaves: [1, 8] },
          { stem: 7, leftLeaves: [2], leaves: [4, 9] },
        ],
      },
      steps: [
        {
          explanation: "Read Class P outward from the stem (right-to-left) to recover its sorted values.",
          latex: "\\text{Class P: } 54,\\,55,\\;64,\\,68,\\;72 \\Rightarrow \\text{5 values}",
        },
        {
          explanation: "Read Class Q in the normal direction to recover its sorted values.",
          latex: "\\text{Class Q: } 53,\\,57,\\;61,\\,68,\\;74,\\,79 \\Rightarrow \\text{6 values}",
        },
        {
          explanation: "Class P has 5 values, so its median is the 3rd value.",
          latex: "\\text{Median P} = 64",
        },
        {
          explanation: "Class Q has 6 values, so its median is the average of the 3rd and 4th.",
          latex: "\\text{Median Q} = \\frac{61+68}{2} = 64.5",
        },
        {
          explanation: "Translate the comparison back into context.",
          latex: "64.5 > 64 \\Rightarrow \\text{Class Q has the slightly higher typical score.}",
        },
      ],
      finalAnswerLatex: "\\text{Class Q has the higher median (64.5 vs 64), so it typically scored slightly higher.}",
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
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-dat-cmp-p1", "Group A: 3, 6, 9, 12, 15. Find the median.",
      "\\text{Middle (3rd) value}", "9", "Sorted middle value of 5 is the 3rd: 9.", 1),
    poolAnswer("y8-dat-cmp-p2", "Group B: 4, 8, 12, 16, 20. Find the range.",
      "20 - 4", "16", "Largest 20, smallest 4. Range = 16.", 1),
    poolChoice("y8-dat-cmp-p3", "Which statistic measures the typical value?", "B",
      ["Range", "Median", "Total", "Spread"], "The median (a measure of centre) describes the typical value.", 1),
    poolAnswer("y8-dat-cmp-p4", "Group C: 5, 7, 9, 11, 13. Find the mean.",
      "\\frac{5+7+9+11+13}{5}", "9", "Sum = 45. Mean = 45 ÷ 5 = 9.", 1),
    poolChoice("y8-dat-cmp-p5", "A smaller range means the data is…", "A",
      ["more consistent", "more spread out", "always larger", "categorical"],
      "A smaller range means values are closer together — more consistent.", 1),
    poolAnswer("y8-dat-cmp-p6", "Group D: 2, 5, 8, 11, 14. Find the range.",
      "14 - 2", "12", "14 - 2 = 12.", 1),
    // Difficulty 2
    poolAnswer("y8-dat-cmp-p7", "Group A: 6, 8, 10, 12, 14, 16. Find the median.",
      "\\frac{10 + 12}{2}", "11", "6 values → median = (10 + 12) ÷ 2 = 11.", 2),
    poolChoice("y8-dat-cmp-p8", "Group P: median 18, range 5. Group Q: median 18, range 12. Which is more consistent?", "A",
      ["Group P", "Group Q", "Both equal", "Cannot tell"],
      "Same median; Group P's smaller range (5) makes it more consistent.", 2),
    poolAnswer("y8-dat-cmp-p9", "Group B: 7, 9, 11, 13, 15. Find the mean.",
      "\\frac{7+9+11+13+15}{5}", "11", "Sum = 55. Mean = 55 ÷ 5 = 11.", 2),
    poolAnswer("y8-dat-cmp-p10", "Six scores have a mean of 16. Find the sum of the scores.",
      "16 \\times 6", "96", "Sum = mean × count = 16 × 6 = 96.", 2),
    poolChoice("y8-dat-cmp-p11", "Group X: median 22. Group Y: median 17. Which has the higher typical value?", "A",
      ["Group X", "Group Y", "Both equal", "Cannot tell"], "Group X's higher median (22) means a higher typical value.", 2),
    poolAnswer("y8-dat-cmp-p12", "Group C: 10, 14, 18, 22, 26. Find the range.",
      "26 - 10", "16", "26 - 10 = 16.", 2),
    // Difficulty 3
    poolAnswer("y8-dat-cmp-p13", "Group A: 4, 9, 11, 16, 25. Group B: 7, 8, 11, 12, 14. Both have median 11. Find Group A's range minus Group B's range.",
      "(25 - 4) - (14 - 7)", "14", "Group A range = 21, Group B range = 7. Difference = 21 - 7 = 14.", 3),
    poolChoice("y8-dat-cmp-p14", "Two groups have equal means but Group A's range is 30 and Group B's is 8. Which statement is correct?", "C",
      ["The groups have identical data.", "Group A is more consistent.",
       "Group B's values are clustered more tightly.", "Group A has a higher mean."],
      "Equal means ≠ identical data. Group B's smaller range means tighter clustering.", 3),
    poolAnswer("y8-dat-cmp-p15", "Group A mean = 12 (5 values). Group B mean = 16 (5 values). Find the combined mean of all 10 values.",
      "\\frac{5\\times12 + 5\\times16}{10}", "14", "Combined sum = 60 + 80 = 140 over 10 = 14.", 3),
    poolAnswer("y8-dat-cmp-p16", "Group C: 5, 8, x, 14, 18. The mean is 11. Find x.",
      "11 \\times 5 - (5+8+14+18)", "10", "Total = 55. Known = 45. x = 55 - 45 = 10.", 3),
    poolChoice("y8-dat-cmp-p17", "Group A: median 15, range 10. Group B: median 15, range 10. What can you conclude?", "D",
      ["Group A performed better.", "Group B is more consistent.",
       "The data sets must be identical.", "They have the same typical value and the same spread."],
      "Equal medians and equal ranges mean the same typical value and the same spread — but the data need not be identical.", 3),
    poolAnswer("y8-dat-cmp-p18", "Group D: 6, 10, 14, 18, 22, 26, 30. Find the median.",
      "\\text{Middle (4th) value of 7}", "18", "7 values → median is the 4th: 18.", 3),
    // Difficulty 4
    poolAnswer("y8-dat-cmp-p19", "Group A has 4 values with mean 8; Group B has 6 values with mean 13. Find the combined mean of all 10 values.",
      "\\frac{4\\times8 + 6\\times13}{10}", "11", "Combined sum = 32 + 78 = 110 over 10 = 11.", 4),
    poolChoice("y8-dat-cmp-p20", "Group P median = 14, Group Q median = 14, Group P range = 6, Group Q range = 6. A teacher says 'Group P performed better'. Why is this NOT supported?", "B",
      ["Group P has a higher range.", "Both groups have the same median and spread, so neither is clearly better.",
       "Group Q has a higher median.", "Range cannot be compared."],
      "Identical median and range give no basis to call one group better.", 4),
    poolAnswer("y8-dat-cmp-p21", "Group A: 12, 15, 18, 21, 24. Group B: 10, 14, 18, 22, 26. Both have median 18. Find Group B's range minus Group A's range.",
      "(26 - 10) - (24 - 12)", "4", "Group B range = 16, Group A range = 12. Difference = 4.", 4),
    poolAnswer("y8-dat-cmp-p22", "A class of 25 has mean 60. A class of 15 has mean 68. Find the combined mean of all 40 students.",
      "\\frac{25\\times60 + 15\\times68}{40}", "63", "Combined sum = 1500 + 1020 = 2520 over 40 = 63.", 4),
    poolChoice("y8-dat-cmp-p23", "Group A: scores tightly packed near 70. Group B: scores spread from 40 to 100, also centred near 70. Which is correct?", "A",
      ["Both have a similar median but Group A has a smaller range.",
       "Group B has a higher median.", "Group A has a larger range.",
       "The groups cannot be compared."],
      "Both centre near 70 (similar median); Group A's tighter packing gives a smaller range.", 4),
    poolAnswer("y8-dat-cmp-p24", "Group C: 3, 7, x, 15, 19, 23 (6 values). The median is 13. The two middle values are x and 15. Find x.",
      "\\frac{x + 15}{2} = 13", "11", "Median = (x + 15) ÷ 2 = 13, so x + 15 = 26, x = 11.", 4),
    // Difficulty 5
    poolAnswer("y8-dat-cmp-p25", "Group A (4 values) has mean 25; Group B (k values) has mean 10. The combined mean of all values is 16. Find k.",
      "\\frac{100 + 10k}{4 + k} = 16", "6", "100 + 10k = 16(4 + k) → 100 + 10k = 64 + 16k → 36 = 6k → k = 6.", 5),
    poolChoice("y8-dat-cmp-p26", "Group A: median 50, range 20. Group B: median 50, range 20. A student claims the two groups must contain exactly the same numbers. Why is this WRONG?", "C",
      ["Medians cannot match unless data is identical.",
       "Range and median together fix every value.",
       "Different data sets can share the same median and range.",
       "Group B must have more values."],
      "Many different data sets share a median and a range; these two summaries do not determine the full data.", 5),
    poolAnswer("y8-dat-cmp-p27", "Group A: 8, 12, 16, 20, 24 (mean 16). Each value is doubled. Find the new mean.",
      "16 \\times 2", "32", "Doubling every value doubles the mean: 16 × 2 = 32.", 5),
    poolAnswer("y8-dat-cmp-p28", "Group X has 10 values with mean 12. After removing one value, the mean of the remaining 9 is 11. Find the removed value.",
      "10\\times12 - 9\\times11", "21", "Old sum = 120. New sum = 99. Removed = 120 - 99 = 21.", 5),
    poolChoice("y8-dat-cmp-p29", "Group A and Group B both have median 30. Group A range = 8; Group B range = 40, but Group B has a single far outlier. Which is the fairer 'consistency' comparison?", "B",
      ["Group B is more consistent because it covers more values.",
       "Group A is more consistent; Group B's range is inflated by one outlier.",
       "Both are equally consistent.", "Range tells us nothing here."],
      "An outlier inflates Group B's range. Group A's small range shows it is genuinely more consistent.", 5),
    poolAnswer("y8-dat-cmp-p30", "Two groups of 5 students each have means 14 and 22. By how much must the mean of the second group decrease so that both groups share the same combined mean as before but the second group's mean equals the first group's? Give the required decrease.",
      "22 - 14", "8", "To make the second group's mean equal the first's (14), it must drop from 22 to 14, a decrease of 8.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-cmp-mp1",
      prompt:
        "Two basketball players record their points across five games. Player A: 8, 12, 14, 16, 20. Player B: 2, 10, 14, 18, 26.",
      latex: "A:\\ 8,12,14,16,20\\quad B:\\ 2,10,14,18,26",
      answer: "14",
      hint: "Find each player's median and range, then compare consistency.",
      explanation:
        "Both players have median 14 (the 3rd of 5 values). Player A range = 20 - 8 = 12; Player B range = 26 - 2 = 24. Equal median but Player A has the smaller range, so Player A is more consistent.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the median for Player A?",
          marks: 1,
          answer: "14",
          acceptedAnswers: [],
          hint: "The middle (3rd) value of the 5 sorted scores.",
          explanation: "Sorted A: 8, 12, 14, 16, 20. Median = 14.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the range for Player B?",
          marks: 1,
          answer: "24",
          acceptedAnswers: [],
          hint: "Largest minus smallest for Player B.",
          explanation: "Player B range = 26 - 2 = 24.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Which player is more consistent? Answer 'A' or 'B'.",
          marks: 1,
          answer: "A",
          acceptedAnswers: ["Player A"],
          hint: "Smaller range means more consistent.",
          explanation: "Player A's range (12) is smaller than Player B's (24), so Player A is more consistent.",
        },
      ],
    },
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
      "Probability is how we measure chance — how likely something is to happen. In everyday talk we use words for this: it is impossible that the sun will rise in the west, unlikely that it will snow in summer, an even chance that a tossed coin lands heads, likely that a dropped piece of toast lands badly, and certain that tomorrow follows today. Those words are useful, but they are vague — your 'likely' and my 'likely' might not match.",
      "To be precise, we also give chance a number. Imagine a ruler that runs from 0 at one end to 1 at the other. Every event sits somewhere on this ruler. The closer the event is to 1, the more likely it is; the closer to 0, the less likely. This ruler is called the probability scale.",
      "In notation we write the probability of an event as $P(\\text{event})$, and it must satisfy $0 \\le P(\\text{event}) \\le 1$. The two ends are the extremes: $P=0$ means impossible — there is no way for it to happen — and $P=1$ means certain — it happens every single time. Exactly halfway, $P=0.5$ (or $\\frac{1}{2}$), is an even chance: just as likely to happen as not.",
      "Why must probability stay between 0 and 1, and never go outside? Because probability is really a fraction of the outcomes that count as the event — favourable outcomes over total outcomes. The favourable outcomes can never be fewer than none of them (so the fraction is at least 0) and never more than all of them (so the fraction is at most 1). 'None of them' gives 0, impossible; 'all of them' gives 1, certain; anything in between is a genuine fraction between 0 and 1. That is the whole reason the scale has those two ends and no others.",
      "Using this, we label the regions of the scale. Between 0 and 0.5 the event is unlikely — less than half the outcomes favour it. Between 0.5 and 1 it is likely — more than half favour it. So if a spinner is $\\frac{7}{10}=0.7$ green, landing on green is likely because 0.7 sits past the halfway mark on the ruler.",
      "The classic mistake is writing a probability bigger than 1, like '$\\frac{12}{10}$' or '1.5 out of 1'. That can never be right, because it would mean more outcomes favour the event than exist in total — impossible. If a calculation ever gives a probability above 1 or below 0, it is a signal to go back and check the count, not a real answer.",
    ],
    latexBlocks: [
      "0 \\leq P(\\text{event}) \\leq 1",
      "P(\\text{impossible}) = 0,\\quad P(\\text{even chance}) = 0.5,\\quad P(\\text{certain}) = 1",
      "\\text{unlikely: } 0 < P < 0.5 \\qquad \\text{likely: } 0.5 < P < 1",
      "P(\\text{not } A) = 1 - P(A)",
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
    {
      title: "Order events on the probability scale (harder)",
      questionLatex:
        "\\text{Three events have probabilities } \\frac{3}{5},\\; 0.25,\\text{ and } 45\\%.\\text{ Order them from least to most likely and label each.}",
      steps: [
        {
          explanation: "To compare fairly, rewrite all three on the same scale by converting each to a decimal.",
          latex: "\\frac{3}{5} = 0.6,\\quad 0.25 = 0.25,\\quad 45\\% = 0.45",
        },
        {
          explanation: "Place each decimal on the 0-to-1 ruler and read its position.",
          latex: "0.25 < 0.45 < 0.6",
        },
        {
          explanation: "Label each using the regions: below 0.5 is unlikely, above 0.5 is likely.",
          latex: "0.25\\text{ unlikely},\\;\\; 0.45\\text{ unlikely (just under even)},\\;\\; 0.6\\text{ likely}",
        },
      ],
      finalAnswerLatex:
        "\\text{Least to most likely: } 0.25,\\; 0.45,\\; 0.6\\;\\;(\\text{i.e. } 0.25,\\; 45\\%,\\; \\tfrac{3}{5}).",
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
  masteryQuizPool: [
    // Difficulty 1
    poolChoice("y8-pro-lan-p1", "Which word describes an event with probability 1?", "C",
      ["Impossible", "Unlikely", "Certain", "Even chance"], "Probability 1 means the event always happens — certain.", 1),
    poolAnswer("y8-pro-lan-p2", "Write the probability of a certain event as a whole number.",
      "P(\\text{certain})", "1", "A certain event sits at 1 on the scale.", 1),
    poolChoice("y8-pro-lan-p3", "Which event is impossible?", "B",
      ["Flipping tails on a coin", "Rolling an 8 on a standard die",
       "Drawing a king from a deck", "Rolling an even number"],
      "A standard die only shows 1–6, so rolling an 8 is impossible.", 1),
    poolAnswer("y8-pro-lan-p4", "Write the probability of an impossible event as a whole number.",
      "P(\\text{impossible})", "0", "An impossible event sits at 0 on the scale.", 1),
    poolChoice("y8-pro-lan-p5", "An event with probability 0.5 is described as…", "A",
      ["even chance", "certain", "impossible", "very likely"], "0.5 means equally likely to happen or not — an even chance.", 1),
    poolAnswer("y8-pro-lan-p6", "A spinner has 4 equal sections, 1 of which is red. Write P(red) as a decimal.",
      "\\frac{1}{4}", "0.25", "1 ÷ 4 = 0.25.", 1, ["1/4"]),
    // Difficulty 2
    poolAnswer("y8-pro-lan-p7", "A bag has 10 counters, 3 of which are blue. Write P(blue) as a decimal.",
      "\\frac{3}{10}", "0.3", "3 ÷ 10 = 0.3.", 2, ["3/10"]),
    poolChoice("y8-pro-lan-p8", "Which value describes an unlikely (but possible) event?", "A",
      ["0.2", "0.5", "0.9", "1"], "Unlikely means 0 < P < 0.5. Only 0.2 fits.", 2),
    poolAnswer("y8-pro-lan-p9", "P(rain) = 0.35. Find P(no rain).",
      "1 - 0.35", "0.65", "P(no rain) = 1 - 0.35 = 0.65.", 2, ["13/20"]),
    poolChoice("y8-pro-lan-p10", "From the values 0.1, 0.45, 0.8, 0.6, which is the most likely event?", "C",
      ["0.1", "0.45", "0.8", "0.6"], "The highest probability is the most likely: 0.8.", 2),
    poolAnswer("y8-pro-lan-p11", "A spinner has 8 equal sections, 5 are green. Write P(green) as a decimal.",
      "\\frac{5}{8}", "0.625", "5 ÷ 8 = 0.625.", 2, ["5/8"]),
    poolChoice("y8-pro-lan-p12", "Which is NOT a valid probability?", "D",
      ["0", "0.5", "1", "1.2"], "Probabilities must satisfy 0 ≤ P ≤ 1, so 1.2 is invalid.", 2),
    // Difficulty 3
    poolAnswer("y8-pro-lan-p13", "A spinner has 5 equal sections, 2 of which are shaded. Find P(unshaded) as a decimal.",
      "\\frac{5-2}{5}", "0.6", "Unshaded = 3. P = 3 ÷ 5 = 0.6.", 3, ["3/5"]),
    poolChoice("y8-pro-lan-p14", "An event has probability 7/10. Which description is correct?", "B",
      ["Unlikely", "Likely", "Impossible", "Even chance"], "7/10 = 0.7 > 0.5, so the event is likely.", 3),
    poolAnswer("y8-pro-lan-p15", "P(win) = 0.28. Find P(not win).",
      "1 - 0.28", "0.72", "P(not win) = 1 - 0.28 = 0.72.", 3),
    poolAnswer("y8-pro-lan-p16", "A bag has 12 counters: 4 red, 5 blue, 3 green. Find P(green) as a decimal.",
      "\\frac{3}{12}", "0.25", "3 ÷ 12 = 0.25.", 3, ["1/4"]),
    poolChoice("y8-pro-lan-p17", "Two events have probabilities 0.3 and 0.55. What is the probability of an outcome that is neither, if these are the only other outcome?", "A",
      ["0.15", "0.25", "0.85", "0.45"], "All probabilities sum to 1: 1 - 0.3 - 0.55 = 0.15.", 3),
    poolAnswer("y8-pro-lan-p18", "An event has probability 9/20. Write it as a decimal.",
      "\\frac{9}{20}", "0.45", "9 ÷ 20 = 0.45.", 3, ["9/20"]),
    // Difficulty 4
    poolAnswer("y8-pro-lan-p19", "A spinner has 20 equal sections, 13 of which are yellow. Find P(not yellow) as a decimal.",
      "\\frac{20 - 13}{20}", "0.35", "Not yellow = 7. P = 7 ÷ 20 = 0.35.", 4, ["7/20"]),
    poolChoice("y8-pro-lan-p20", "Event A has probability 0.4. Event B is half as likely as A. What is P(B)?", "B",
      ["0.4", "0.2", "0.8", "0.1"], "Half as likely: 0.4 ÷ 2 = 0.2.", 4),
    poolAnswer("y8-pro-lan-p21", "P(A) = 0.18, P(B) = 0.42, P(C) = 0.15. If A, B, C, D are the only outcomes, find P(D).",
      "1 - (0.18 + 0.42 + 0.15)", "0.25", "P(D) = 1 - 0.75 = 0.25.", 4),
    poolAnswer("y8-pro-lan-p22", "A bag has 25 marbles. P(red) = 0.36. How many red marbles are there?",
      "0.36 \\times 25", "9", "Number of red = 0.36 × 25 = 9.", 4),
    poolChoice("y8-pro-lan-p23", "An event has probability 3/8. A second event is twice as likely. What is the second event's probability as a decimal?", "C",
      ["0.375", "0.5", "0.75", "0.875"], "3/8 = 0.375; twice as likely = 0.75.", 4),
    poolAnswer("y8-pro-lan-p24", "A spinner has 16 equal sections. 6 are red and 4 are blue. Find P(red or blue) as a decimal.",
      "\\frac{6 + 4}{16}", "0.625", "Red or blue = 10. P = 10 ÷ 16 = 0.625.", 4, ["5/8"]),
    // Difficulty 5
    poolAnswer("y8-pro-lan-p25", "A bag has 40 counters. P(green) = 0.15 and P(red) = 0.4. How many counters are neither green nor red?",
      "40 - (0.15\\times40 + 0.4\\times40)", "18", "Green = 6, red = 16; neither = 40 - 22 = 18.", 5),
    poolChoice("y8-pro-lan-p26", "Event A is twice as likely as event B, and together they cover all outcomes (P(A) + P(B) = 1). What is P(A)?", "C",
      ["1/3", "1/2", "2/3", "3/4"], "If P(B) = x and P(A) = 2x, then 3x = 1, so x = 1/3 and P(A) = 2/3.", 5),
    poolAnswer("y8-pro-lan-p27", "A spinner is built so P(win) = 0.2. To make winning exactly twice as likely, the designer adds winning sections. What is the new P(win) as a decimal?",
      "0.2 \\times 2", "0.4", "Twice as likely: 0.2 × 2 = 0.4.", 5, ["2/5"]),
    poolAnswer("y8-pro-lan-p28", "P(A) = 0.5, P(B) = 0.3, and the events cannot both happen. Find P(neither A nor B).",
      "1 - (0.5 + 0.3)", "0.2", "For mutually exclusive A and B, P(neither) = 1 - 0.5 - 0.3 = 0.2.", 5, ["1/5"]),
    poolChoice("y8-pro-lan-p29", "A bag has counters numbered 1 to 30. P(a multiple of 5) equals which value as a decimal?", "B",
      ["0.1", "0.2", "0.3", "0.5"], "Multiples of 5 from 1–30: 5,10,15,20,25,30 = 6 of 30. P = 6/30 = 0.2.", 5),
    poolAnswer("y8-pro-lan-p30", "An event has probability 0.45. A 'success' is defined as the event NOT happening across two separate parts; for a single part, find P(not happening).",
      "1 - 0.45", "0.55", "P(not happening) = 1 - 0.45 = 0.55.", 5, ["11/20"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pro-lan-mp1",
      prompt:
        "A spinner has 10 equal sections: 4 are red, 3 are blue, 2 are green, and 1 is yellow. The spinner is spun once.",
      latex: "\\text{Red }4,\\ \\text{Blue }3,\\ \\text{Green }2,\\ \\text{Yellow }1",
      answer: "0.4",
      hint: "Each section is equally likely. Use favourable ÷ 10, then the complement.",
      explanation:
        "Part (a): P(red) = 4/10 = 0.4. Part (b): P(green) = 2/10 = 0.2. Part (c): P(not yellow) = 1 - 1/10 = 0.9.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find P(red) as a decimal.",
          marks: 1,
          answer: "0.4",
          acceptedAnswers: ["2/5", "4/10"],
          hint: "4 red out of 10 sections.",
          explanation: "P(red) = 4/10 = 0.4.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find P(green) as a decimal.",
          marks: 1,
          answer: "0.2",
          acceptedAnswers: ["1/5", "2/10"],
          hint: "2 green out of 10 sections.",
          explanation: "P(green) = 2/10 = 0.2.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find P(not yellow) as a decimal.",
          marks: 1,
          answer: "0.9",
          acceptedAnswers: ["9/10"],
          hint: "Use the complement: 1 - P(yellow).",
          explanation: "P(yellow) = 1/10, so P(not yellow) = 1 - 0.1 = 0.9.",
        },
      ],
    },
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
      "When chance experiments have outcomes that are all equally likely — a fair coin, a fair die, a well-mixed bag of counters — we can work out the probability of an event by counting, no experiment needed. The idea is simple: figure out how many outcomes you would be happy with, and compare that to how many outcomes there are altogether.",
      "Take a bag with 3 red, 4 blue and 1 green counter — 8 counters in all, each equally likely to be pulled out. To find the chance of drawing blue, count the blue counters (4) and compare to the total (8): 4 out of 8, which is $\\frac{4}{8}=\\frac{1}{2}$, an even chance. You did not have to draw a single counter; you reasoned it from the make-up of the bag.",
      "In notation, the favourable outcomes are the ones that count as the event happening, and the total outcomes are all the equally likely possibilities. Then $P(\\text{event}) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of equally likely outcomes}}$. The complete list of all possible outcomes is called the sample space — for a die it is $\\{1,2,3,4,5,6\\}$, six outcomes. Listing the sample space first is the safest habit, because a miscount of the total is the single most common source of wrong answers.",
      "Why does dividing favourable by total give the probability? Because the outcomes are equally likely, they must share the certainty of 'something happens' equally between them. There are 6 faces on a die and one of them is certain to come up, so each single face carries an equal slice, $\\frac{1}{6}$, of that total certainty of 1. An event made of 2 of those faces — say rolling a 5 or a 6 — collects 2 of those equal slices, giving $\\frac{2}{6}=\\frac{1}{3}$. Counting favourable outcomes is just adding up equal slices, which is exactly what the fraction does. This is precisely why the method fails for unfair set-ups: if the slices are not equal, you cannot count them as if they were.",
      "A second tool saves work: the complement. The complement of an event $A$ is everything that is not $A$. Since one of all the outcomes is certain to happen, $P(A)$ and $P(\\text{not } A)$ must add to 1, which rearranges to $P(\\text{not } A) = 1 - P(A)$. So if $P(\\text{rain})=0.3$, then $P(\\text{no rain}) = 1 - 0.3 = 0.7$ without any further counting. Use it whenever the 'not' event is easier to count than the event itself.",
      "Finally, present the answer cleanly: simplify fractions and, where useful, give a decimal. $\\frac{4}{8}$ should be written as $\\frac{1}{2}$, and $\\frac{6}{10}=0.6$; but $\\frac{3}{8}$ is already in lowest terms and should be left as it is. The common slip here is forgetting to count an outcome and dividing by the wrong total — list the sample space, then count.",
    ],
    latexBlocks: [
      "P(\\text{event}) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of equally likely outcomes}}",
      "\\text{each equally likely outcome carries probability } \\frac{1}{\\text{total}}",
      "P(\\text{not } A) = 1 - P(A)",
      "\\text{sample space of a die: } \\{1,\\, 2,\\, 3,\\, 4,\\, 5,\\, 6\\}",
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
    {
      title: "Combine counting with the complement (harder)",
      questionLatex:
        "\\text{A bag holds counters numbered 1 to 20, each equally likely. Find the probability the number drawn is NOT a multiple of 5.}",
      steps: [
        {
          explanation: "The 'not a multiple of 5' event is awkward to count directly, so count the easier complement first — the multiples of 5.",
          latex: "\\{5,\\,10,\\,15,\\,20\\} \\Rightarrow 4\\text{ favourable outcomes}",
        },
        {
          explanation: "Find the probability of a multiple of 5 over the total of 20.",
          latex: "P(\\text{multiple of }5) = \\frac{4}{20} = \\frac{1}{5}",
        },
        {
          explanation: "Apply the complement rule to get the event we actually want.",
          latex: "P(\\text{not a multiple of }5) = 1 - \\frac{1}{5} = \\frac{4}{5}",
        },
      ],
      finalAnswerLatex: "P(\\text{not a multiple of }5) = \\frac{4}{5} = 0.8",
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
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-pro-sim-p1", "A bag has 2 red and 3 blue counters. Find P(red) as a fraction.",
      "\\frac{2}{5}", "2/5", "Favourable = 2, total = 5. P(red) = 2/5.", 1, ["0.4", "40%"]),
    poolChoice("y8-pro-sim-p2", "A standard die is rolled. What is P(rolling a 4)?", "B",
      ["1/3", "1/6", "1/2", "4/6"], "One favourable face out of 6. P = 1/6.", 1),
    poolAnswer("y8-pro-sim-p3", "P(A) = 1/3. Find P(not A).",
      "1 - \\frac{1}{3}", "2/3", "P(not A) = 1 - 1/3 = 2/3.", 1, ["0.667"]),
    poolChoice("y8-pro-sim-p4", "How many outcomes are in the sample space of one die roll?", "C",
      ["1", "3", "6", "12"], "A die has faces 1–6, so 6 outcomes.", 1),
    poolAnswer("y8-pro-sim-p5", "A bag has 4 green and 4 yellow counters. Find P(green) as a fraction.",
      "\\frac{4}{8}", "1/2", "4/8 simplifies to 1/2.", 1, ["0.5", "4/8"]),
    poolChoice("y8-pro-sim-p6", "A coin is flipped. What is P(heads)?", "A",
      ["1/2", "1/3", "1/4", "1"], "A fair coin has 2 outcomes; one is heads. P = 1/2.", 1),
    // Difficulty 2
    poolAnswer("y8-pro-sim-p7", "A die is rolled. Find P(an even number) as a fraction.",
      "\\frac{3}{6}", "1/2", "Even faces: 2, 4, 6 → 3 of 6. P = 1/2.", 2, ["0.5", "3/6"]),
    poolAnswer("y8-pro-sim-p8", "A bag has 3 red, 5 blue, 2 green (10 total). Find P(blue) as a decimal.",
      "\\frac{5}{10}", "0.5", "5 of 10 are blue. P = 0.5.", 2, ["1/2"]),
    poolChoice("y8-pro-sim-p9", "A die is rolled. What is P(a number greater than 4)?", "B",
      ["1/6", "1/3", "1/2", "2/3"], "Greater than 4: 5, 6 → 2 of 6 = 1/3.", 2),
    poolAnswer("y8-pro-sim-p10", "P(event) = 7/10. Find P(not event) as a decimal.",
      "1 - \\frac{7}{10}", "0.3", "1 - 0.7 = 0.3.", 2, ["3/10"]),
    poolAnswer("y8-pro-sim-p11", "A spinner has 8 equal sections numbered 1–8. Find P(an odd number) as a fraction.",
      "\\frac{4}{8}", "1/2", "Odd: 1, 3, 5, 7 → 4 of 8 = 1/2.", 2, ["0.5", "4/8"]),
    poolChoice("y8-pro-sim-p12", "Which simplifies the fraction 6/8 correctly?", "C",
      ["1/2", "2/3", "3/4", "6/8"], "6/8 = 3/4 (divide top and bottom by 2).", 2),
    // Difficulty 3
    poolAnswer("y8-pro-sim-p13", "A bag has 5 red, 3 blue, 4 green (12 total). Find P(not blue) as a fraction.",
      "\\frac{12-3}{12}", "3/4", "Not blue = 9 of 12 = 3/4.", 3, ["0.75", "9/12"]),
    poolChoice("y8-pro-sim-p14", "A card is drawn from 1–20. What is P(a multiple of 4)?", "A",
      ["1/4", "1/5", "1/2", "1/10"], "Multiples of 4: 4,8,12,16,20 = 5 of 20 = 1/4.", 3),
    poolAnswer("y8-pro-sim-p15", "A die is rolled. Find P(a prime number) as a fraction.",
      "\\frac{3}{6}", "1/2", "Primes on a die: 2, 3, 5 → 3 of 6 = 1/2.", 3, ["0.5", "3/6"]),
    poolAnswer("y8-pro-sim-p16", "A bag has only red and blue counters. P(red) = 0.35. Find P(blue) as a decimal.",
      "1 - 0.35", "0.65", "P(blue) = 1 - 0.35 = 0.65.", 3, ["13/20"]),
    poolChoice("y8-pro-sim-p17", "A spinner has sections numbered 1–12. What is P(a number divisible by 3)?", "B",
      ["1/4", "1/3", "1/2", "3/12"], "Divisible by 3: 3,6,9,12 = 4 of 12 = 1/3.", 3),
    poolAnswer("y8-pro-sim-p18", "A bag has 6 red, 9 blue (15 total). Find P(red) as a fraction in simplest form.",
      "\\frac{6}{15}", "2/5", "6/15 = 2/5 (divide by 3).", 3, ["0.4", "6/15"]),
    // Difficulty 4
    poolAnswer("y8-pro-sim-p19", "A bag has 8 red, 7 blue, 5 green (20 total). Find P(red or green) as a decimal.",
      "\\frac{8+5}{20}", "0.65", "Red or green = 13 of 20 = 0.65.", 4, ["13/20"]),
    poolAnswer("y8-pro-sim-p20", "A card is drawn from 1–30. How many cards are a multiple of 5 or a multiple of 7? (Count them.)",
      "\\text{multiples of 5 and of 7, no overlap}", "10",
      "Multiples of 5: 5,10,15,20,25,30 (6). Multiples of 7: 7,14,21,28 (4). No overlap, so 6 + 4 = 10.", 4),
    poolAnswer("y8-pro-sim-p21", "A bag has 25 counters. P(red) = 2/5. How many counters are NOT red?",
      "25 - \\frac{2}{5}\\times25", "15", "Red = 2/5 × 25 = 10. Not red = 25 - 10 = 15.", 4),
    poolAnswer("y8-pro-sim-p22", "A die is rolled. Find P(a number that is even OR greater than 4) as a fraction.",
      "\\text{Even or >4: } 2,4,5,6", "2/3", "Even: 2,4,6; greater than 4: 5,6. Union = 2,4,5,6 = 4 of 6 = 2/3.", 4, ["4/6", "0.667"]),
    poolChoice("y8-pro-sim-p23", "A bag has red and blue counters only. There are 9 red and the probability of blue is 0.4. How many counters in total?", "B",
      ["12", "15", "18", "24"], "P(red) = 0.6, and 9 red, so total = 9 ÷ 0.6 = 15.", 4),
    poolAnswer("y8-pro-sim-p24", "A spinner is numbered 1–24. Find P(a factor of 24) as a fraction in simplest form.",
      "\\frac{8}{24}", "1/3", "Factors of 24: 1,2,3,4,6,8,12,24 = 8 of 24 = 1/3.", 4, ["8/24", "0.333"]),
    // Difficulty 5
    poolAnswer("y8-pro-sim-p25", "A bag has red, blue and green counters. P(red) = 1/4 and P(blue) = 1/3. Find P(green) as a fraction.",
      "1 - \\frac{1}{4} - \\frac{1}{3}", "5/12", "P(green) = 1 - 1/4 - 1/3 = 12/12 - 3/12 - 4/12 = 5/12.", 5, ["0.417"]),
    poolAnswer("y8-pro-sim-p26", "A card is drawn from 1–50. Find P(a multiple of 10) as a decimal.",
      "\\frac{5}{50}", "0.1", "Multiples of 10: 10,20,30,40,50 = 5 of 50 = 0.1.", 5, ["1/10", "5/50"]),
    poolAnswer("y8-pro-sim-p27", "A bag has 3 red, 4 blue, 5 green. One green is removed. Find the new P(green) as a fraction in simplest form.",
      "\\frac{5-1}{12-1}", "4/11", "After removing one green: 4 green of 11 total. P = 4/11.", 5, ["0.364"]),
    poolChoice("y8-pro-sim-p28", "A spinner numbered 1–18. What is P(a number that is both even and a multiple of 3)?", "A",
      ["1/6", "1/3", "1/2", "2/9"], "Even multiples of 3 = multiples of 6: 6,12,18 = 3 of 18 = 1/6.", 5),
    poolAnswer("y8-pro-sim-p29", "A bag has only red and blue counters. The probability of red is twice the probability of blue. Find P(red) as a fraction.",
      "P(\\text{red}) = 2P(\\text{blue}),\\ \\text{sum} = 1", "2/3", "If P(blue) = x then 2x + x = 1, x = 1/3, so P(red) = 2/3.", 5, ["0.667"]),
    poolAnswer("y8-pro-sim-p30", "A bag has 20 counters. P(red) = 0.45 and P(blue) = 0.3; the rest are green. How many green counters are there?",
      "20 - (0.45\\times20 + 0.3\\times20)", "5", "Red = 9, blue = 6; green = 20 - 15 = 5.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-pro-sim-mp1",
      prompt:
        "A bag contains 5 red, 4 blue, and 3 green counters (12 in total). One counter is drawn at random.",
      latex: "\\text{Red }5,\\ \\text{Blue }4,\\ \\text{Green }3",
      answer: "5/12",
      hint: "Use favourable ÷ 12 for each colour, then the complement for part (c).",
      explanation:
        "Part (a): P(red) = 5/12. Part (b): P(blue) = 4/12 = 1/3. Part (c): P(not green) = 1 - 3/12 = 9/12 = 3/4.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find P(red) as a fraction.",
          marks: 1,
          answer: "5/12",
          acceptedAnswers: ["0.417"],
          hint: "5 red out of 12.",
          explanation: "P(red) = 5/12.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find P(blue) as a fraction in simplest form.",
          marks: 1,
          answer: "1/3",
          acceptedAnswers: ["4/12", "0.333"],
          hint: "4 blue out of 12, then simplify.",
          explanation: "P(blue) = 4/12 = 1/3.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find P(not green) as a fraction in simplest form.",
          marks: 1,
          answer: "3/4",
          acceptedAnswers: ["9/12", "0.75"],
          hint: "Use the complement: 1 - P(green).",
          explanation: "P(green) = 3/12, so P(not green) = 9/12 = 3/4.",
        },
      ],
    },
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
      "Some chance experiments happen in two steps — you do one random thing, then another. Flip a coin, then roll a die. Spin a spinner, then draw a card. The question is: how many different combined results can the whole experiment give, and how likely is a particular one?",
      "The key idea is that each result of the first step can pair up with every result of the second step. Flip a coin and you have 2 starting results, heads or tails. For each of those, the die can land 6 ways. So heads splits into 6 combinations (H1, H2, …, H6), and tails splits into another 6 (T1, …, T6) — 6 and 6 make 12 combined outcomes in total.",
      "That is exactly why you multiply. If the first step has $n_1$ outcomes and the second has $n_2$, then every one of the $n_1$ first-step outcomes opens up $n_2$ second-step outcomes, giving $n_1$ groups of $n_2$ — which is $n_1 \\times n_2$ combined outcomes. Multiplication is built into the words 'groups of'. This is the heart of the lesson, and it is why adding is wrong: a spinner with 4 sections and a coin gives $4 \\times 2 = 8$ outcomes, not $4 + 2 = 6$ — adding would only count each step's results once instead of pairing them.",
      "Two pictures make the count visible. A tree diagram draws the first step as a set of branches, then grows a fresh copy of the second step's branches from the end of each first branch; the number of branch tips at the far right is the total, and you can read each combined outcome by following a path. An array (table) puts the first step's outcomes down the rows and the second step's across the columns, and every cell is one combined outcome — the grid has exactly (rows) × (columns) cells, the same product.",
      "Once you have all the equally likely combined outcomes, probability works just as it did for one step: count the combined outcomes that satisfy your condition and divide by the total. For $P(\\text{heads and a 3})$ with the coin and die, only the single outcome (H, 3) qualifies out of 12, so $P = \\frac{1}{12}$. For a condition like 'the two dice sum to 7', list every pair that works and divide by 36.",
      "The misconception to dissolve is the urge to add the step sizes — it feels natural because there are 'two of them'. Hold on to the picture instead: each first outcome fans out into a full set of second outcomes, so the totals multiply. If you ever find yourself writing $n_1 + n_2$, draw two branches of a tree and count the tips to see why the answer must be $n_1 \\times n_2$.",
    ],
    latexBlocks: [
      "\\text{total combined outcomes} = n_1 \\times n_2",
      "P(\\text{combined event}) = \\frac{\\text{favourable combined outcomes}}{\\text{total combined outcomes}}",
      "\\text{coin (2) and die (6): total} = 2 \\times 6 = 12,\\;\\text{not } 2+6",
    ],
  },
  workedExamples: [
    {
      title: "Count outcomes using a tree diagram",
      questionLatex:
        "\\text{Use the tree diagram for a coin flip then a die roll. How many combined outcomes are there?}",
      probabilityTreeDiagram: {
        description:
          "Two-stage tree: stage 1 is a coin (Heads or Tails, each probability 1/2); from each, stage 2 branches to die faces 1 to 6 (each probability 1/6), giving 12 tips.",
        stages: ["Coin", "Die"],
        branches: [
          {
            id: "h",
            label: "H",
            probability: "1/2",
            children: [
              { id: "h1", label: "1", probability: "1/6" },
              { id: "h2", label: "2", probability: "1/6" },
              { id: "h3", label: "3", probability: "1/6" },
              { id: "h4", label: "4", probability: "1/6" },
              { id: "h5", label: "5", probability: "1/6" },
              { id: "h6", label: "6", probability: "1/6" },
            ],
          },
          {
            id: "t",
            label: "T",
            probability: "1/2",
            children: [
              { id: "t1", label: "1", probability: "1/6" },
              { id: "t2", label: "2", probability: "1/6" },
              { id: "t3", label: "3", probability: "1/6" },
              { id: "t4", label: "4", probability: "1/6" },
              { id: "t5", label: "5", probability: "1/6" },
              { id: "t6", label: "6", probability: "1/6" },
            ],
          },
        ],
      },
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
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-pro-two-p1", "A coin is flipped and a 3-section spinner is spun. How many outcomes in the sample space?",
      "2 \\times 3", "6", "2 × 3 = 6 combined outcomes.", 1),
    poolChoice("y8-pro-two-p2", "Two coins are flipped. How many outcomes are in the sample space?", "B",
      ["2", "4", "6", "8"], "2 × 2 = 4: HH, HT, TH, TT.", 1),
    poolAnswer("y8-pro-two-p3", "A spinner with 5 sections and a coin are used. How many combined outcomes?",
      "5 \\times 2", "10", "5 × 2 = 10.", 1),
    poolChoice("y8-pro-two-p4", "Two dice are rolled. How many outcomes in the sample space?", "C",
      ["12", "24", "36", "6"], "6 × 6 = 36.", 1),
    poolAnswer("y8-pro-two-p5", "A coin is flipped 3 times. How many outcomes in total?",
      "2 \\times 2 \\times 2", "8", "2 × 2 × 2 = 8.", 1),
    poolChoice("y8-pro-two-p6", "To find total outcomes of a two-step experiment you should…", "A",
      ["multiply the step sizes", "add the step sizes", "subtract them", "divide them"],
      "Total combined outcomes = n₁ × n₂.", 1),
    // Difficulty 2
    poolAnswer("y8-pro-two-p7", "A coin and a die (12 outcomes). Find P(Heads and a 5).",
      "\\frac{1}{12}", "1/12", "Only (H,5) is favourable: 1 of 12.", 2, ["0.083"]),
    poolAnswer("y8-pro-two-p8", "A coin is flipped twice (HH, HT, TH, TT). How many outcomes have at least one tail?",
      "\\text{HT, TH, TT}", "3", "At least one tail: HT, TH, TT = 3 outcomes.", 2),
    poolChoice("y8-pro-two-p9", "Two dice are rolled (36 outcomes). How many show a sum of 2?", "A",
      ["1", "2", "3", "6"], "Only (1,1) sums to 2.", 2),
    poolAnswer("y8-pro-two-p10", "A coin and a 4-section spinner (1–4), 8 outcomes. How many show Tails?",
      "(T,1),(T,2),(T,3),(T,4)", "4", "Tails paired with each of 4 spinner results = 4 outcomes.", 2),
    poolAnswer("y8-pro-two-p11", "Two dice are rolled (36 outcomes). How many show a sum of 12?",
      "\\text{Only }(6,6)", "1", "Only (6,6) sums to 12.", 2),
    poolChoice("y8-pro-two-p12", "A spinner (3) and a coin (2). Which is a valid combined outcome?", "B",
      ["33", "(2, H)", "HH", "(H, H)"], "A valid outcome takes one result from each step: (spinner, coin) e.g. (2, H).", 2),
    // Difficulty 3
    poolAnswer("y8-pro-two-p13", "Two dice are rolled (36 outcomes). Find P(sum = 7) as a fraction.",
      "\\frac{6}{36}", "1/6", "Six pairs sum to 7. P = 6/36 = 1/6.", 3, ["6/36", "0.167"]),
    poolAnswer("y8-pro-two-p14", "Two dice are rolled (36 outcomes). How many show a sum of 5?",
      "(1,4),(2,3),(3,2),(4,1)", "4", "Pairs: (1,4),(2,3),(3,2),(4,1) = 4 outcomes.", 3),
    poolChoice("y8-pro-two-p15", "A coin and a die (12 outcomes). What is P(Tails and an even number)?", "B",
      ["1/12", "1/4", "1/3", "1/2"], "Tails with 2,4,6 = 3 outcomes. P = 3/12 = 1/4.", 3),
    poolAnswer("y8-pro-two-p16", "Two dice are rolled (36 outcomes). Find P(a double) as a fraction.",
      "\\frac{6}{36}", "1/6", "Doubles: (1,1)...(6,6) = 6 outcomes. P = 6/36 = 1/6.", 3, ["6/36", "0.167"]),
    poolAnswer("y8-pro-two-p17", "A coin and a 5-section spinner (1–5), 10 outcomes. How many show Heads and an odd number?",
      "(H,1),(H,3),(H,5)", "3", "Heads with odd 1,3,5 = 3 outcomes.", 3),
    poolChoice("y8-pro-two-p18", "Two coins are flipped. What is P(exactly one head)?", "C",
      ["1/4", "1/3", "1/2", "3/4"], "HT and TH = 2 of 4 outcomes. P = 2/4 = 1/2.", 3),
    // Difficulty 4
    poolAnswer("y8-pro-two-p19", "Two dice are rolled (36 outcomes). Find P(sum greater than 9) as a fraction in simplest form.",
      "\\text{sums of 10, 11, 12}", "1/6", "Sum 10: 3, sum 11: 2, sum 12: 1 → 6 outcomes. P = 6/36 = 1/6.", 4, ["6/36", "0.167"]),
    poolAnswer("y8-pro-two-p20", "Two dice are rolled (36 outcomes). How many show a sum of 8?",
      "(2,6),(3,5),(4,4),(5,3),(6,2)", "5", "Five pairs sum to 8.", 4),
    poolChoice("y8-pro-two-p21", "A coin and a die (12 outcomes). What is P(Heads and a number less than 3)?", "A",
      ["1/6", "1/4", "1/3", "1/2"], "Heads with 1 or 2 = 2 outcomes. P = 2/12 = 1/6.", 4),
    poolAnswer("y8-pro-two-p22", "Two dice are rolled (36 outcomes). Find P(both numbers the same OR sum = 4) as a fraction in simplest form.",
      "\\text{doubles (6) + (1,3),(3,1)}", "2/9", "Doubles = 6; sum 4 with different dice = (1,3),(3,1) = 2; total 8. P = 8/36 = 2/9.", 4, ["8/36", "0.222"]),
    poolAnswer("y8-pro-two-p23", "A spinner (1–4) is spun twice (16 outcomes). How many show the same number twice?",
      "(1,1),(2,2),(3,3),(4,4)", "4", "Four matching pairs out of 16.", 4),
    poolChoice("y8-pro-two-p24", "Two dice are rolled (36 outcomes). P(sum = 7) compared with P(sum = 6): which is more likely?", "A",
      ["Sum 7 (6 ways vs 5 ways)", "Sum 6 (more ways)", "They are equal", "Neither can occur"],
      "Sum 7 has 6 ways; sum 6 has 5 ways, so sum 7 is more likely.", 4),
    // Difficulty 5
    poolAnswer("y8-pro-two-p25", "Two dice are rolled (36 outcomes). Find P(at least one 6) as a fraction in simplest form.",
      "1 - \\frac{25}{36}", "11/36", "P(no 6) = (5/6)² = 25/36. P(at least one 6) = 1 - 25/36 = 11/36.", 5, ["0.306"]),
    poolAnswer("y8-pro-two-p26", "A coin is flipped 3 times (8 outcomes). Find P(exactly 2 heads) as a fraction in simplest form.",
      "\\text{HHT, HTH, THH}", "3/8", "Three outcomes have exactly 2 heads. P = 3/8.", 5, ["0.375"]),
    poolAnswer("y8-pro-two-p27", "Two dice are rolled (36 outcomes). Find P(product is even) as a fraction in simplest form.",
      "1 - \\frac{9}{36}", "3/4", "Product is odd only when both are odd: 3×3 = 9 ways. P(even) = 1 - 9/36 = 27/36 = 3/4.", 5, ["27/36", "0.75"]),
    poolAnswer("y8-pro-two-p28", "A bag has 3 counters: A, B, C. One is drawn, replaced, then another drawn (9 outcomes). Find P(the two draws differ) as a fraction in simplest form.",
      "1 - \\frac{3}{9}", "2/3", "Same: AA, BB, CC = 3 of 9. Different = 6 of 9 = 2/3.", 5, ["6/9", "0.667"]),
    poolChoice("y8-pro-two-p29", "Two dice are rolled (36 outcomes). Which sum is the single most likely?", "C",
      ["6", "8", "7", "All equally likely"], "Sum 7 has the most ways (6), making it the most likely.", 5),
    poolAnswer("y8-pro-two-p30", "A coin is flipped 3 times (8 outcomes). Find P(at least one head) as a fraction in simplest form.",
      "1 - \\frac{1}{8}", "7/8", "Only TTT has no head (1 of 8). P(at least one head) = 1 - 1/8 = 7/8.", 5, ["0.875"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pro-two-mp1",
      prompt:
        "A fair coin is flipped and a fair die (faces 1–6) is rolled. The combined sample space has 12 equally likely outcomes.",
      latex: "\\text{Coin (2)} \\times \\text{Die (6)} = 12",
      answer: "12",
      hint: "Total = 2 × 6. Then count favourable outcomes for each event.",
      explanation:
        "Part (a): total = 2 × 6 = 12. Part (b): P(Heads and a 6) = 1/12. Part (c): P(Tails and an even number) = 3/12 = 1/4.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many outcomes are in the sample space?",
          marks: 1,
          answer: "12",
          acceptedAnswers: [],
          hint: "Multiply the number of coin outcomes by the number of die outcomes.",
          explanation: "2 × 6 = 12 outcomes.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find P(Heads and a 6) as a fraction.",
          marks: 1,
          answer: "1/12",
          acceptedAnswers: ["0.083"],
          hint: "Only one outcome is (H, 6).",
          explanation: "P(Heads and 6) = 1/12.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find P(Tails and an even number) as a fraction in simplest form.",
          marks: 1,
          answer: "1/4",
          acceptedAnswers: ["3/12", "0.25"],
          hint: "Tails with 2, 4, or 6 — count the outcomes, then divide by 12.",
          explanation: "Favourable: (T,2),(T,4),(T,6) = 3 outcomes. P = 3/12 = 1/4.",
        },
      ],
    },
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
      "A stem-and-leaf plot is a clever way to sort a list of numbers and graph it at the same time. The trick is to split each number into two parts: a stem (the leading digits) and a leaf (the last digit). For two-digit numbers the stem is the tens digit and the leaf is the units digit, so 34 splits into stem 3, leaf 4. Every value sharing the same tens digit lands on the same row, behind the same stem.",
      "Here is why that splitting is so useful: numbers on the same row are already grouped by size, and the leaves left to right show the finer detail. The plot keeps every original value — unlike a column graph, you can still read 34 back out exactly — while also showing the shape of the data, where it bunches up and where it thins out. It is a sorted list and a picture in one.",
      "To build it, list the stems in order down the left, then write each value's leaf beside its stem. First pass through the data as it comes; then redraw the plot with the leaves on each row sorted smallest to largest. That ordered version is the one you calculate from, because the whole data set is now in order without you having to sort the list separately.",
      "From the ordered plot, two summaries fall straight out. The range is the largest value minus the smallest: the smallest value is the first leaf on the lowest stem, the largest is the last leaf on the highest stem, so you read them off the corners. The median is the value in the middle position — count the total number of leaves, find the middle position, and read that leaf; for an even count, average the two middle leaves. This works because the leaves are already ordered, so counting positions gives you the middle of the sorted data directly.",
      "A back-to-back stem-and-leaf plot compares two groups against one shared column of stems, one group's leaves growing left and the other's growing right. The right-hand group reads in the normal left-to-right direction. The left-hand group reads outward too, which means right-to-left — away from the stem — so on both sides the leaf nearest the stem is the smallest value in that row. Reading outward keeps each side sorted, which is exactly what you need to read each group's median and range.",
      "The easy mistake is to read the left-hand side of a back-to-back plot in the wrong direction, treating the leaf nearest the stem as the largest. Always read away from the stem on both sides; if the leaf closest to the stem is not the smallest in its row, you have the direction reversed.",
    ],
    latexBlocks: [
      "47 \\Rightarrow \\text{stem } 4,\\; \\text{leaf } 7",
      "\\text{range} = \\text{largest value} - \\text{smallest value}",
      "\\text{median: count all leaves, take the middle (or average the two middle leaves)}",
      "\\text{back-to-back: read leaves outward (away from the stem) on both sides}",
    ],
  },
  workedExamples: [
    {
      title: "Find the range from an ordered stem-and-leaf plot",
      questionLatex:
        "\\text{Find the range of the data in the ordered stem-and-leaf plot.}",
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 2 leaves 4, 8; stem 3 leaves 1, 5, 9; stem 4 leaf 2.",
        keyText: "2 | 4 = 24",
        rows: [
          { stem: 2, leaves: [4, 8] },
          { stem: 3, leaves: [1, 5, 9] },
          { stem: 4, leaves: [2] },
        ],
      },
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
        "\\text{Find the median of the 8 values in the ordered stem-and-leaf plot.}",
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 1 leaves 2, 5, 7; stem 2 leaves 0, 3, 8; stem 3 leaves 1, 6.",
        keyText: "1 | 2 = 12",
        rows: [
          { stem: 1, leaves: [2, 5, 7] },
          { stem: 2, leaves: [0, 3, 8] },
          { stem: 3, leaves: [1, 6] },
        ],
      },
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
    {
      title: "Find median and range from a back-to-back plot (harder)",
      questionLatex:
        "\\text{Use the back-to-back stem-and-leaf plot to find Team A's median and range.}",
      stemAndLeafDiagram: {
        description:
          "Back-to-back stem-and-leaf plot, stems are tens. Team A (left): 14, 19, 21, 23, 27. Team B (right): 12, 16, 20, 25.",
        keyText: "1 | 2 = 12",
        leftLabel: "Team A",
        rightLabel: "Team B",
        rows: [
          { stem: 1, leftLeaves: [9, 4], leaves: [2, 6] },
          { stem: 2, leftLeaves: [7, 3, 1], leaves: [0, 5] },
        ],
      },
      steps: [
        {
          explanation: "Read Team A outward from the stem (right-to-left) to get its sorted values.",
          latex: "\\text{Team A: } 14,\\,19,\\;21,\\,23,\\,27 \\Rightarrow 5\\text{ values}",
        },
        {
          explanation: "Five values means the median is the 3rd value counting from the smallest.",
          latex: "\\text{Median} = 21",
        },
        {
          explanation: "The range is the largest value minus the smallest — read from the corners.",
          latex: "\\text{Range} = 27 - 14 = 13",
        },
      ],
      finalAnswerLatex: "\\text{Team A: median} = 21,\\quad \\text{range} = 13",
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
    {
      ...answer(
        "y8-dat-stm-g2",
        "How many data values are there in total in the ordered stem-and-leaf plot?",
        "\\text{Count all leaves: } 3 + 3",
        "6",
        "Stem 2 has 3 leaves (23, 25, 28). Stem 3 has 3 leaves (31, 34, 39). Total = 6 values."
      ),
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 2 leaves 3, 5, 8; stem 3 leaves 1, 4, 9.",
        keyText: "2 | 3 = 23",
        rows: [
          { stem: 2, leaves: [3, 5, 8] },
          { stem: 3, leaves: [1, 4, 9] },
        ],
      },
    },
    {
      ...answer(
        "y8-dat-stm-g3",
        "What is the range of the data in the ordered stem-and-leaf plot?",
        "\\text{Range} = 24 - 13",
        "11",
        "Smallest value = 13 (stem 1, leaf 3). Largest value = 24 (stem 2, leaf 4). Range = 24 − 13 = 11."
      ),
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 1 leaves 3, 6, 9; stem 2 leaves 0, 4.",
        keyText: "1 | 3 = 13",
        rows: [
          { stem: 1, leaves: [3, 6, 9] },
          { stem: 2, leaves: [0, 4] },
        ],
      },
    },
    choice(
      "y8-dat-stm-g4",
      "An ordered stem-and-leaf plot has 7 values. Which position gives the median?",
      "B",
      ["3rd value", "4th value", "5th value", "Average of 3rd and 4th"],
      "For an odd number of values, the median is the exact middle. With 7 values, the middle position is (7 + 1) ÷ 2 = 4th value."
    ),
  ],
  independentPractice: [
    {
      ...answer(
        "y8-dat-stm-i1",
        "How many data values are there in total in the ordered stem-and-leaf plot?",
        "\\text{Count all leaves: } 3 + 3 + 2",
        "8",
        "Stem 1: 3 leaves. Stem 2: 3 leaves. Stem 3: 2 leaves. Total = 8 values."
      ),
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 1 leaves 2, 5, 7; stem 2 leaves 0, 3, 8; stem 3 leaves 1, 6.",
        keyText: "1 | 2 = 12",
        rows: [
          { stem: 1, leaves: [2, 5, 7] },
          { stem: 2, leaves: [0, 3, 8] },
          { stem: 3, leaves: [1, 6] },
        ],
      },
    },
    {
      ...answer(
        "y8-dat-stm-i2",
        "The ordered stem-and-leaf plot has 8 values. What is the median?",
        "\\text{Average 4th and 5th: } \\frac{20 + 23}{2}",
        "21.5",
        "Values in order: 12, 15, 17, 20, 23, 28, 31, 36. 4th = 20, 5th = 23. Median = (20 + 23) ÷ 2 = 21.5."
      ),
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 1 leaves 2, 5, 7; stem 2 leaves 0, 3, 8; stem 3 leaves 1, 6.",
        keyText: "1 | 2 = 12",
        rows: [
          { stem: 1, leaves: [2, 5, 7] },
          { stem: 2, leaves: [0, 3, 8] },
          { stem: 3, leaves: [1, 6] },
        ],
      },
    },
    {
      ...answer(
        "y8-dat-stm-i3",
        "What is the range of the data in the ordered stem-and-leaf plot?",
        "\\text{Range} = 42 - 24",
        "18",
        "Smallest value = 24, largest value = 42. Range = 42 − 24 = 18."
      ),
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 2 leaves 4, 8; stem 3 leaves 1, 5, 9; stem 4 leaf 2.",
        keyText: "2 | 4 = 24",
        rows: [
          { stem: 2, leaves: [4, 8] },
          { stem: 3, leaves: [1, 5, 9] },
          { stem: 4, leaves: [2] },
        ],
      },
    },
    {
      ...answer(
        "y8-dat-stm-i4",
        "How many values in the ordered stem-and-leaf plot are greater than 40?",
        "\\text{Values with stem 4: } 41,\\; 43,\\; 48",
        "3",
        "All values with stem 4 are greater than 40: 41, 43, 48. There are 3 such values."
      ),
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 3 leaves 2, 4, 7; stem 4 leaves 1, 3, 8.",
        keyText: "3 | 2 = 32",
        rows: [
          { stem: 3, leaves: [2, 4, 7] },
          { stem: 4, leaves: [1, 3, 8] },
        ],
      },
    },
    {
      ...choice(
        "y8-dat-stm-i5",
        "What is the mode of the data in the ordered stem-and-leaf plot?",
        "B",
        ["13", "24", "29", "30"],
        "The mode is the value that appears most often. The leaf 4 appears twice on stem 2, giving value 24 twice. All other values appear once. Mode = 24."
      ),
      stemAndLeafDiagram: {
        description: "Ordered stem-and-leaf plot: stem 1 leaves 3, 6; stem 2 leaves 4, 4, 9; stem 3 leaves 0, 8.",
        keyText: "1 | 3 = 13",
        rows: [
          { stem: 1, leaves: [3, 6] },
          { stem: 2, leaves: [4, 4, 9] },
          { stem: 3, leaves: [0, 8] },
        ],
      },
    },
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
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-dat-stm-p1", "For the value 52, what is the stem (using tens as stems)?",
      "52 \\Rightarrow \\text{stem } ?", "5", "The stem is the tens digit: 5.", 1),
    poolAnswer("y8-dat-stm-p2", "For the value 38, what is the leaf?",
      "38 \\Rightarrow \\text{leaf } ?", "8", "The leaf is the units digit: 8.", 1),
    poolChoice("y8-dat-stm-p3", "In a stem-and-leaf plot, what does the stem usually represent for two-digit numbers?", "B",
      ["The units digit", "The tens digit", "The total count", "The mean"], "The stem is the tens digit.", 1),
    poolAnswer("y8-dat-stm-p4", "Ordered plot — 1 | 2 5, 2 | 0 7 9. How many data values in total?",
      "2 + 3", "5", "Stem 1 has 2 leaves, stem 2 has 3 leaves. Total = 5.", 1),
    poolAnswer("y8-dat-stm-p5", "Ordered plot — 3 | 1 4, 4 | 2. What is the smallest value?",
      "\\text{stem 3, first leaf 1}", "31", "Smallest = stem 3, leaf 1 = 31.", 1),
    poolChoice("y8-dat-stm-p6", "Which value has stem 6 and leaf 2?", "C",
      ["26", "16", "62", "60"], "Stem 6 (tens), leaf 2 (units) = 62.", 1),
    // Difficulty 2
    poolAnswer("y8-dat-stm-p7", "Ordered plot — 2 | 3 6 8, 3 | 1 5. What is the range?",
      "35 - 23", "12", "Smallest = 23, largest = 35. Range = 12.", 2),
    poolAnswer("y8-dat-stm-p8", "Ordered plot — 1 | 4 7, 2 | 2 5 8, 3 | 0. How many data values in total?",
      "2 + 3 + 1", "6", "2 + 3 + 1 = 6 values.", 2),
    poolChoice("y8-dat-stm-p9", "An ordered stem-and-leaf plot has 9 values. Which position is the median?", "B",
      ["4th", "5th", "6th", "Average of 4th and 5th"], "(9 + 1) ÷ 2 = 5th value.", 2),
    poolAnswer("y8-dat-stm-p10", "Ordered plot — 4 | 1 3 6, 5 | 2 (4 values). Find the median.",
      "\\frac{43 + 46}{2}", "44.5", "Values: 41, 43, 46, 52. Median = (43 + 46) ÷ 2 = 44.5.", 2),
    poolAnswer("y8-dat-stm-p11", "Data: 24, 31, 28, 35, 22. How many stems are needed?",
      "\\text{tens digits } 2, 3", "2", "Tens digits are 2 and 3, so 2 stems.", 2),
    poolChoice("y8-dat-stm-p12", "Ordered plot — 1 | 5 5 8, 2 | 3. What is the mode?", "A",
      ["15", "18", "23", "No mode"], "Leaf 5 appears twice on stem 1, giving 15 twice. Mode = 15.", 2),
    // Difficulty 3
    poolAnswer("y8-dat-stm-p13", "Ordered plot — 1 | 2 4 9, 2 | 1 5 7, 3 | 3 (7 values). Find the median.",
      "\\text{Middle (4th) value}", "21", "Values: 12,14,19,21,25,27,33. 4th value = 21.", 3),
    poolAnswer("y8-dat-stm-p14", "Ordered plot — 5 | 2 6, 6 | 1 4 9, 7 | 0. What is the range?",
      "70 - 52", "18", "Smallest = 52, largest = 70. Range = 18.", 3),
    poolChoice("y8-dat-stm-p15", "Ordered plot — 2 | 0 0 5, 3 | 1 8. How many values are less than 30?", "C",
      ["1", "2", "3", "4"], "Values with stem 2: 20, 20, 25 = 3 values less than 30.", 3),
    poolAnswer("y8-dat-stm-p16", "Ordered plot — 3 | 0 5, 4 | 2 8 (4 values). Find the mean.",
      "\\frac{30 + 35 + 42 + 48}{4}", "38.75", "Values: 30, 35, 42, 48. Sum = 155. Mean = 155 ÷ 4 = 38.75.", 3),
    poolAnswer("y8-dat-stm-p17", "Ordered plot — 1 | 1 1 1 8, 2 | 4. What is the mode?",
      "\\text{leaf 1 appears 3 times on stem 1}", "11", "Value 11 appears three times. Mode = 11.", 3),
    poolChoice("y8-dat-stm-p18", "Ordered plot — 4 | 3 7, 5 | 1 1 6, 6 | 2 (6 values). What is the median?", "B",
      ["49", "51", "53", "56"], "Values: 43,47,51,51,56,62. Median = (51 + 51) ÷ 2 = 51.", 3),
    // Difficulty 4
    poolAnswer("y8-dat-stm-p19", "Ordered plot — 2 | 1 4 8, 3 | 2 5 5 9, 4 | 3 (8 values). Find the median.",
      "\\text{Average 4th and 5th values}", "33.5", "Values: 21,24,28,32,35,35,39,43. 4th=32, 5th=35. Median = (32 + 35) ÷ 2 = 33.5.", 4),
    poolAnswer("y8-dat-stm-p20", "Ordered plot — 1 | 3 7 9, 2 | 2 6, 3 | 0 4 (7 values). Find the mean. Round to 1 decimal place.",
      "\\frac{13+17+19+22+26+30+34}{7}", "23", "Sum = 161. Mean = 161 ÷ 7 = 23.0.", 4, ["23.0"]),
    poolChoice("y8-dat-stm-p21", "Ordered plot — 3 | 2 2 2 5, 4 | 1 7. How many values equal the mode?", "C",
      ["1", "2", "3", "4"], "Leaf 2 appears 3 times on stem 3 (value 32). Mode 32 appears 3 times.", 4),
    poolAnswer("y8-dat-stm-p22", "Ordered plot — 6 | 1 4, 7 | 0 3 8, 8 | 5. Find Q2 (the median) of the 6 values.",
      "\\frac{70 + 73}{2}", "71.5", "Values: 61,64,70,73,78,85. Median = (70 + 73) ÷ 2 = 71.5.", 4),
    poolAnswer("y8-dat-stm-p23", "Ordered plot — 2 | 5 8, 3 | 0 4 7, 4 | 1 9. How many values are greater than 35?",
      "\\text{37, 41, 49}", "3", "Values above 35: 37, 41, 49 = 3 values.", 4),
    poolChoice("y8-dat-stm-p24", "A back-to-back plot has the left side read away from the stem. For the row '7 6 | 2 | 3 8', what is the smallest value on the LEFT side?", "B",
      ["27", "26", "62", "76"], "Left leaves read right-to-left: leaf 6 (closest to stem) gives 26, the smallest on the left.", 4),
    // Difficulty 5
    poolAnswer("y8-dat-stm-p25", "Ordered plot — 1 | 0 5, 2 | 1 3 8, 3 | 2 6, 4 | 0 (8 values). Find the mean. Round to 2 decimal places.",
      "\\frac{10+15+21+23+28+32+36+40}{8}", "25.63", "Sum = 205. Mean = 205 ÷ 8 = 25.625 ≈ 25.63.", 5, ["25.625"]),
    poolAnswer("y8-dat-stm-p26", "Ordered plot — 3 | 1 4 8, 4 | 2 6, 5 | 0 (6 values). Find Q1 (median of the lower half).",
      "\\text{Lower half: }31, 34, 38", "34", "Lower half (first 3 values): 31, 34, 38. Q1 = middle = 34.", 5),
    poolAnswer("y8-dat-stm-p27", "Ordered plot — 2 | 2 7, 3 | 1 5 9, 4 | 4 (6 values). Find the range and the median; give range minus median.",
      "(44 - 22) - \\frac{31 + 35}{2}", "-11", "Range = 44 - 22 = 22. Median = (31 + 35) ÷ 2 = 33. Range - median = 22 - 33 = -11.", 5),
    poolChoice("y8-dat-stm-p28", "Ordered plot — 5 | 0 0 0 4, 6 | 7. A new value of 50 is added. What happens to the mode?", "A",
      ["It stays 50 and now appears 4 times", "It changes to 67", "There is no mode", "It becomes 54"],
      "Value 50 already appears 3 times (leaf 0,0,0); adding another 50 makes it appear 4 times — still the mode.", 5),
    poolAnswer("y8-dat-stm-p29", "Ordered plot — 1 | 2 6, 2 | 0 4 4 8, 3 | 5 (7 values). Find the median.",
      "\\text{Middle (4th) value}", "24", "Values: 12,16,20,24,24,28,35. 4th value = 24.", 5),
    poolAnswer("y8-dat-stm-p30", "Ordered plot — 4 | 1 5 9, 5 | 3 7, 6 | 2 (6 values). By how much would the median change if the largest value, 62, were replaced by 82?",
      "\\text{median depends on the 3rd and 4th values}", "0", "Values: 41, 45, 49, 53, 57, 62. Median = (49 + 53) ÷ 2 = 51. Replacing the largest value does not change the 3rd and 4th values, so the median stays 51 — a change of 0.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-stm-mp1",
      prompt:
        "An ordered stem-and-leaf plot of test scores reads: 4 | 2 6, 5 | 1 3 8, 6 | 0 4. (Stem = tens, leaf = units.)",
      latex: "4\\mid 2\\ 6\\quad 5\\mid 1\\ 3\\ 8\\quad 6\\mid 0\\ 4",
      answer: "7",
      hint: "List the values in order: 42, 46, 51, 53, 58, 60, 64. Then count, find the median, and the range.",
      explanation:
        "Values: 42, 46, 51, 53, 58, 60, 64. Part (a): 7 values. Part (b): median is the 4th value = 53. Part (c): range = 64 - 42 = 22.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many data values are in the plot?",
          marks: 1,
          answer: "7",
          acceptedAnswers: [],
          hint: "Count every leaf.",
          explanation: "2 + 3 + 2 = 7 leaves, so 7 values.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the median?",
          marks: 1,
          answer: "53",
          acceptedAnswers: [],
          hint: "With 7 values the median is the 4th.",
          explanation: "Ordered: 42, 46, 51, 53, 58, 60, 64. The 4th value is 53.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the range?",
          marks: 1,
          answer: "22",
          acceptedAnswers: [],
          hint: "Largest minus smallest.",
          explanation: "Range = 64 - 42 = 22.",
        },
      ],
    },
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
      "The median splits ordered data into two halves. Quartiles take that idea one step further and split the data into four equal parts, using three cut points. Reading up the sorted data, the first cut is $Q_1$ (the lower quartile), the second is $Q_2$ (which is just the median again), and the third is $Q_3$ (the upper quartile). A quarter of the data sits below $Q_1$, a quarter between $Q_1$ and $Q_2$, and so on — so the quartiles describe how the whole set is spread out, not just where its centre is.",
      "To find them, sort the data, then find the median $Q_2$. Now look at the lower half (everything below the median) and the upper half (everything above it). $Q_1$ is simply the median of the lower half, and $Q_3$ is the median of the upper half. The reason this works is that the median of the lower half has a quarter of all the data below it and a quarter between it and the centre — which is exactly the one-quarter mark the lower quartile is meant to be.",
      "Counts matter. If the number of values is even, the two halves split cleanly and no value is left out. If it is odd, the middle value is the median, and it belongs to neither half — you exclude it and take the quartiles of the remaining lower and upper groups. With 7 values, $Q_2$ is the 4th value; the lower half is values 1–3 and the upper half is values 5–7. Wrongly keeping the 4th value in both halves is the classic error and shifts both quartiles.",
      "The interquartile range is $\\text{IQR} = Q_3 - Q_1$, and it measures the width of the middle 50% of the data. This is a more honest measure of spread than the full range, and here is why. The full range, max minus min, uses only the two most extreme values — so a single freak value at either end can blow it up. The IQR throws away the bottom quarter and the top quarter entirely and measures only the central half, so one extreme value sitting out in a tail cannot touch it. A small IQR means the central values are tightly clustered; a large IQR means the middle of the data is itself widely spread.",
      "That resistance is the transfer point: when a data set might contain outliers — house prices, incomes, race times with one breakdown — quote the IQR rather than the range to describe spread, just as you would quote the median rather than the mean to describe centre. Both choices work for the same reason: they depend on the position of typical values, not on the size of the extremes.",
    ],
    latexBlocks: [
      "\\text{IQR} = Q_3 - Q_1 \\quad(\\text{spread of the middle } 50\\%)",
      "Q_1 = \\text{median of lower half},\\quad Q_3 = \\text{median of upper half}",
      "\\text{odd count: exclude the median from both halves}",
      "\\text{even count: split exactly in half — no value excluded}",
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
    {
      title: "Quartiles for a larger set, with interpretation (harder)",
      questionLatex:
        "\\text{Daily sales over 9 days: } 12,\\;15,\\;15,\\;18,\\;20,\\;22,\\;24,\\;27,\\;60.\\text{ Find the IQR and explain why it beats the range here.}",
      steps: [
        {
          explanation: "The data is sorted and there are 9 values (odd), so Q2 is the 5th value and is excluded from both halves.",
          latex: "Q_2 = 20",
        },
        {
          explanation: "The lower half is the first four values; Q1 is the average of its two middle values.",
          latex: "\\text{lower half } 12,\\,15,\\,15,\\,18 \\Rightarrow Q_1 = \\frac{15+15}{2} = 15",
        },
        {
          explanation: "The upper half is the last four values; Q3 is the average of its two middle values.",
          latex: "\\text{upper half } 22,\\,24,\\,27,\\,60 \\Rightarrow Q_3 = \\frac{24+27}{2} = 25.5",
        },
        {
          explanation: "Compute the IQR and the full range to compare.",
          latex: "\\text{IQR} = 25.5 - 15 = 10.5,\\quad \\text{range} = 60 - 12 = 48",
        },
        {
          explanation: "The value 60 is a clear outlier; it inflates the range to 48 but the IQR ignores it, so 10.5 describes the typical spread far better.",
          latex: "\\text{IQR } 10.5 \\ll \\text{range } 48 \\Rightarrow \\text{use the IQR}",
        },
      ],
      finalAnswerLatex: "\\text{IQR} = 10.5;\\text{ the range (48) is distorted by the outlier 60, so the IQR is the fairer measure of spread.}",
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
  masteryQuizPool: [
    // Difficulty 1
    poolChoice("y8-dat-qrt-p1", "Which quartile equals the median?", "B",
      ["Q1", "Q2", "Q3", "IQR"], "Q2 is the median of the whole data set.", 1),
    poolAnswer("y8-dat-qrt-p2", "Sorted data: 1, 3, 5, 7, 9. Find Q2.",
      "\\text{Middle (3rd) value}", "5", "5 values → median is the 3rd: 5.", 1),
    poolAnswer("y8-dat-qrt-p3", "Q1 = 4 and Q3 = 10. Find the IQR.",
      "10 - 4", "6", "IQR = Q3 - Q1 = 10 - 4 = 6.", 1),
    poolChoice("y8-dat-qrt-p4", "The IQR is calculated as…", "C",
      ["Q1 - Q3", "Max - Min", "Q3 - Q1", "Q2 - Q1"], "IQR = Q3 - Q1.", 1),
    poolAnswer("y8-dat-qrt-p5", "Sorted data: 2, 4, 6. Find Q2.",
      "\\text{Middle value}", "4", "The middle value of 2, 4, 6 is 4.", 1),
    poolChoice("y8-dat-qrt-p6", "A smaller IQR means…", "A",
      ["the middle 50% is more tightly clustered", "the data is larger",
       "there are more values", "the range is bigger"],
      "A smaller IQR means the central 50% of values are closer together.", 1),
    // Difficulty 2
    poolAnswer("y8-dat-qrt-p7", "Sorted data: 2, 4, 6, 8, 10, 12. Find Q2.",
      "\\frac{6 + 8}{2}", "7", "6 values → median = (6 + 8) ÷ 2 = 7.", 2),
    poolAnswer("y8-dat-qrt-p8", "Sorted data: 3, 5, 7, 9, 11. Q2 = 7. Lower half: 3, 5. Find Q1.",
      "\\frac{3 + 5}{2}", "4", "Lower half 3, 5. Q1 = (3 + 5) ÷ 2 = 4.", 2),
    poolAnswer("y8-dat-qrt-p9", "Q1 = 4, Q3 = 16. Find the IQR.",
      "16 - 4", "12", "IQR = 16 - 4 = 12.", 2),
    poolChoice("y8-dat-qrt-p10", "Group A: IQR = 5. Group B: IQR = 15. Which has more consistent central values?", "A",
      ["Group A", "Group B", "Both equal", "Cannot tell"], "Smaller IQR (Group A) means tighter central clustering.", 2),
    poolAnswer("y8-dat-qrt-p11", "Sorted data: 1, 3, 5, 7, 9, 11. Lower half: 1, 3, 5. Find Q1.",
      "\\text{median of }1, 3, 5", "3", "Q1 is the middle of the lower half: 3.", 2),
    poolChoice("y8-dat-qrt-p12", "For an odd-count data set, when finding Q1 and Q3 you should…", "B",
      ["include the median in both halves", "exclude the median from both halves",
       "use only the median", "ignore the smallest value"],
      "For odd counts, exclude the median from both halves.", 2),
    // Difficulty 3
    poolAnswer("y8-dat-qrt-p13", "Sorted data: 4, 8, 12, 16, 20, 24, 28 (7 values). Find the IQR.",
      "Q_3 - Q_1 = 24 - 8", "16", "Q1 = 8 (median of 4,8,12). Q3 = 24 (median of 20,24,28). IQR = 16.", 3),
    poolAnswer("y8-dat-qrt-p14", "Sorted data: 2, 6, 8, 14, 18, 22 (6 values). Find Q1.",
      "\\text{median of }2, 6, 8", "6", "Lower half: 2, 6, 8. Q1 = 6.", 3),
    poolAnswer("y8-dat-qrt-p15", "Sorted data: 2, 6, 8, 14, 18, 22 (6 values). Find Q3.",
      "\\text{median of }14, 18, 22", "18", "Upper half: 14, 18, 22. Q3 = 18.", 3),
    poolAnswer("y8-dat-qrt-p16", "Q1 = 6, Q3 = 18. Find the IQR.",
      "18 - 6", "12", "IQR = 18 - 6 = 12.", 3),
    poolChoice("y8-dat-qrt-p17", "Which best describes how the IQR differs from the range?", "C",
      ["They are always equal.", "The IQR covers all the data.",
       "The IQR covers only the middle 50%, the range covers all values.",
       "The range covers only the middle 50%."],
      "The IQR spans Q1 to Q3 (middle 50%); the range spans min to max (all values).", 3),
    poolAnswer("y8-dat-qrt-p18", "Q3 = 30 and IQR = 12. Find Q1.",
      "Q_1 = Q_3 - \\text{IQR} = 30 - 12", "18", "Q1 = Q3 - IQR = 30 - 12 = 18.", 3),
    // Difficulty 4
    poolAnswer("y8-dat-qrt-p19", "Sorted data: 5, 9, 13, 17, 21, 25, 29, 33 (8 values). Find the IQR.",
      "Q_3 - Q_1", "16", "Lower half: 5,9,13,17 → Q1 = (9+13)/2 = 11. Upper half: 21,25,29,33 → Q3 = (25+29)/2 = 27. IQR = 27 - 11 = 16.", 4),
    poolAnswer("y8-dat-qrt-p20", "Sorted data: 3, 7, 11, 15, 19, 23, 27, 31, 35 (9 values). Find the IQR.",
      "Q_3 - Q_1", "20", "Q2 = 19 (5th). Lower half: 3,7,11,15 → Q1 = (7+11)/2 = 9. Upper half: 23,27,31,35 → Q3 = (27+31)/2 = 29. IQR = 29 - 9 = 20.", 4),
    poolAnswer("y8-dat-qrt-p21", "Q1 = 14 and IQR = 11. Find Q3.",
      "Q_3 = 14 + 11", "25", "Q3 = Q1 + IQR = 14 + 11 = 25.", 4),
    poolChoice("y8-dat-qrt-p22", "Group A: median 20, IQR 6. Group B: median 20, IQR 18. Which statement is correct?", "C",
      ["Group A has a higher centre.", "Group B is more consistent.",
       "Both have the same centre but Group A's middle 50% is more clustered.",
       "Group B has a smaller spread."],
      "Same median means same centre. Group A's smaller IQR means tighter central clustering.", 4),
    poolAnswer("y8-dat-qrt-p23", "Sorted data: 10, 12, 14, 16, 18, 20 (6 values). Find the IQR.",
      "Q_3 - Q_1", "6", "Lower half: 10,12,14 → Q1 = 12. Upper half: 16,18,20 → Q3 = 18. IQR = 18 - 12 = 6.", 4),
    poolAnswer("y8-dat-qrt-p24", "A data set has Q1 = 22, Q2 = 30, Q3 = 41. Find IQR and (Q2 - Q1); give IQR minus (Q2 - Q1).",
      "(41 - 22) - (30 - 22)", "11", "IQR = 41 - 22 = 19. Q2 - Q1 = 8. Difference = 19 - 8 = 11.", 4),
    // Difficulty 5
    poolAnswer("y8-dat-qrt-p25", "Sorted data: 4, 6, 9, 13, 14, 18, 21, 24, 27, 30 (10 values). Find the IQR.",
      "Q_3 - Q_1", "15", "Lower half: 4,6,9,13,14 → Q1 = 9 (3rd). Upper half: 18,21,24,27,30 → Q3 = 24 (3rd). IQR = 24 - 9 = 15.", 5),
    poolAnswer("y8-dat-qrt-p26", "A data set has IQR = 14 and Q3 = 38. The minimum is 12 and maximum is 60. Find the difference between the range and the IQR.",
      "(60 - 12) - 14", "34", "Range = 60 - 12 = 48. IQR = 14. Difference = 48 - 14 = 34.", 5),
    poolAnswer("y8-dat-qrt-p27", "Sorted data: 8, 12, 12, 15, 20, 24, 24, 28 (8 values). Find the IQR.",
      "Q_3 - Q_1", "12", "Lower half: 8,12,12,15 → Q1 = (12+12)/2 = 12. Upper half: 20,24,24,28 → Q3 = (24+24)/2 = 24. IQR = 24 - 12 = 12.", 5),
    poolChoice("y8-dat-qrt-p28", "Why is the IQR often preferred over the range to describe spread?", "B",
      ["It is always larger.", "It is not distorted by a single extreme outlier.",
       "It includes every value.", "It equals the median."],
      "The IQR uses only the middle 50%, so a single extreme outlier does not distort it the way it distorts the range.", 5),
    poolAnswer("y8-dat-qrt-p29", "A set of 11 sorted values has Q1 at the 3rd value and Q3 at the 9th value. If the 3rd value is 17 and the 9th value is 41, find the IQR.",
      "41 - 17", "24", "IQR = Q3 - Q1 = 41 - 17 = 24.", 5),
    poolAnswer("y8-dat-qrt-p30", "Sorted data: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 (12 values). Find the IQR.",
      "Q_3 - Q_1", "30", "Lower half (first 6): 5,10,15,20,25,30 → Q1 = (15+20)/2 = 17.5. Upper half: 35,40,45,50,55,60 → Q3 = (45+50)/2 = 47.5. IQR = 47.5 - 17.5 = 30.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-qrt-mp1",
      prompt:
        "The marks of 7 students (already sorted) are: 6, 10, 14, 18, 22, 26, 30.",
      latex: "6,\\ 10,\\ 14,\\ 18,\\ 22,\\ 26,\\ 30",
      answer: "18",
      hint: "Find Q2 (median), then split into halves (excluding the median) to find Q1 and Q3, then IQR.",
      explanation:
        "Q2 = 18 (4th value). Lower half: 6, 10, 14 → Q1 = 10. Upper half: 22, 26, 30 → Q3 = 26. IQR = 26 - 10 = 16.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is Q2 (the median)?",
          marks: 1,
          answer: "18",
          acceptedAnswers: [],
          hint: "The middle (4th) value of 7.",
          explanation: "Q2 = 18.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is Q1?",
          marks: 1,
          answer: "10",
          acceptedAnswers: [],
          hint: "Median of the lower half (6, 10, 14), excluding Q2.",
          explanation: "Lower half: 6, 10, 14. Q1 = 10.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the IQR?",
          marks: 1,
          answer: "16",
          acceptedAnswers: [],
          hint: "IQR = Q3 - Q1, where Q3 = 26.",
          explanation: "Q3 = 26, Q1 = 10. IQR = 26 - 10 = 16.",
        },
      ],
    },
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
      "An outlier is a data value that sits far away from the rest — much larger or much smaller than everything around it. In the set 3, 5, 6, 7, 8 the values are all close together, so there is no outlier. But in 3, 5, 6, 7, 58 the value 58 stands well apart from the cluster, so it is an outlier. Outliers can be genuine (a record-breaking score) or errors (a typo), and either way they matter because they can distort a summary.",
      "Recall that the mean is the balance point of the data — the spot where the values balance like weights on a ruler. Now imagine moving one weight far out to the right: the balance point has to slide that way to keep things level. That is exactly what an outlier does to the mean. Because the mean is built from the sum of every value, adding a single large value raises the sum, and therefore the mean, by a lot.",
      "The numbers make this concrete. The mean of 3, 5, 6, 7, 9 is $\\frac{30}{5}=6$. Replace the 9 with 59 and the mean becomes $\\frac{80}{5}=16$. One value, changed once, dragged the mean from 6 up to 16 — eight points above where four of the five values actually sit. The mean is no longer typical of the data.",
      "The median behaves completely differently, and the reason is its definition. The median is whichever value sits in the middle position once the data is sorted; it does not care how big the extreme values are, only how many sit on each side. In both 3, 5, 6, 7, 9 and 3, 5, 6, 7, 59 the value in the middle position is 6. Stretching the largest value out to 59 — or to 590 — never changes which value is in the middle, so the median stays put. That is why the median resists outliers while the mean cannot.",
      "So when a data set contains an outlier, report the median as the typical value: it reflects where most of the data really sits. Quoting the mean alone in that situation is the misconception to avoid — it sounds like a fair summary but a single extreme value has skewed it away from the bulk of the data. The mean is not 'wrong', but for skewed or outlier-affected data the median is the honest choice.",
    ],
    latexBlocks: [
      "\\text{mean depends on every value — one outlier shifts the balance point}",
      "\\text{median depends on position only — one outlier rarely moves it}",
      "\\text{outlier present} \\Rightarrow \\text{report the median as the typical value}",
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
  masteryQuizPool: [
    // Difficulty 1
    poolChoice("y8-dat-out-p1", "Which value is an outlier in: 4, 5, 6, 7, 40?", "D",
      ["4", "5", "6", "40"], "40 is far from the others (4–7), so it is the outlier.", 1),
    poolAnswer("y8-dat-out-p2", "Data: 2, 4, 6, 8, 10. Find the mean.",
      "\\frac{2+4+6+8+10}{5}", "6", "Sum = 30. Mean = 30 ÷ 5 = 6.", 1),
    poolAnswer("y8-dat-out-p3", "Data: 2, 4, 6, 8, 90. Find the median.",
      "\\text{Sorted middle value}", "6", "5 values → median is the 3rd: 6. The outlier 90 does not change it.", 1),
    poolChoice("y8-dat-out-p4", "Which measure of centre is most affected by an outlier?", "A",
      ["Mean", "Median", "Mode", "None of them"], "The mean uses every value, so an outlier shifts it the most.", 1),
    poolAnswer("y8-dat-out-p5", "Data: 3, 5, 7. An outlier of 35 is added. Find the new range.",
      "35 - 3", "32", "New largest = 35, smallest = 3. Range = 32.", 1),
    poolChoice("y8-dat-out-p6", "An outlier is best described as a value that is…", "B",
      ["exactly the median", "much larger or smaller than the rest",
       "always the mode", "the average"],
      "An outlier sits far away from the rest of the data.", 1),
    // Difficulty 2
    poolAnswer("y8-dat-out-p7", "Data: 5, 6, 7, 8, 9. Find the mean.",
      "\\frac{5+6+7+8+9}{5}", "7", "Sum = 35. Mean = 35 ÷ 5 = 7.", 2),
    poolAnswer("y8-dat-out-p8", "Data: 5, 6, 7, 8, 49. Find the mean.",
      "\\frac{5+6+7+8+49}{5}", "15", "Sum = 75. Mean = 75 ÷ 5 = 15.", 2),
    poolAnswer("y8-dat-out-p9", "Mean without outlier = 7, mean with outlier = 15. By how much did the outlier raise the mean?",
      "15 - 7", "8", "15 - 7 = 8.", 2),
    poolChoice("y8-dat-out-p10", "Which statistic should you use to describe the typical value when an outlier is present?", "B",
      ["Mean", "Median", "Range", "Sum"], "The median is resistant to outliers, so it best describes the typical value.", 2),
    poolAnswer("y8-dat-out-p11", "Data: 11, 12, 13, 14. An outlier of 50 is added. Find the new range.",
      "50 - 11", "39", "New largest = 50, smallest = 11. Range = 39.", 2),
    poolChoice("y8-dat-out-p12", "Is 13 an outlier in the set 5, 7, 9, 11, 13?", "B",
      ["Yes, it is the largest.", "No, it is close to the others.",
       "Yes, all maximums are outliers.", "Cannot tell."],
      "13 is just the maximum and close to the rest — not an outlier.", 2),
    // Difficulty 3
    poolAnswer("y8-dat-out-p13", "Data: 4, 6, 8, 10, 12. An outlier of 60 is added. Find the new mean.",
      "\\frac{4+6+8+10+12+60}{6}", "16.67", "Sum = 100. Mean = 100 ÷ 6 ≈ 16.67.", 3, ["16.7", "16.667"]),
    poolAnswer("y8-dat-out-p14", "Data: 4, 6, 8, 10, 12. An outlier of 60 is added (6 values). Find the new median.",
      "\\frac{8 + 10}{2}", "9", "Sorted: 4,6,8,10,12,60. Median = (8 + 10) ÷ 2 = 9.", 3),
    poolChoice("y8-dat-out-p15", "Why does the median barely change when a large outlier is added at one end?", "A",
      ["It depends on position, not the size of values.", "It uses the sum of all values.",
       "It is always the largest value.", "It equals the range."],
      "The median depends on the middle position, so an extreme value at one end does not move it much.", 3),
    poolAnswer("y8-dat-out-p16", "House prices ($000s): 380, 400, 410, 420, 1500. Find the median.",
      "\\text{Sorted middle value}", "410", "Sorted: 380,400,410,420,1500. Median (3rd) = 410.", 3),
    poolAnswer("y8-dat-out-p17", "House prices ($000s): 380, 400, 410, 420, 1500. Find the mean.",
      "\\frac{380+400+410+420+1500}{5}", "622", "Sum = 3110. Mean = 3110 ÷ 5 = 622.", 3),
    poolChoice("y8-dat-out-p18", "For the house prices above (median 410, mean 622), which better represents a typical price?", "B",
      ["Mean, because it uses all values.", "Median, because the $1.5m outlier inflates the mean.",
       "Both are equal.", "Neither — use the range."],
      "The $1.5m outlier inflates the mean; the median (410) better reflects a typical price.", 3),
    // Difficulty 4
    poolAnswer("y8-dat-out-p19", "Data: 3, 5, 6, 7, 9 (mean 6). Replace the 9 with 39. Find the new mean.",
      "\\frac{3+5+6+7+39}{5}", "12", "New sum = 60. Mean = 60 ÷ 5 = 12.", 4),
    poolAnswer("y8-dat-out-p20", "Data: 3, 5, 6, 7, 9 (median 6). Replace the 9 with 39. Find the new median.",
      "\\text{middle value unchanged}", "6", "Sorted: 3,5,6,7,39. Median (3rd) = 6. The median is unchanged.", 4),
    poolAnswer("y8-dat-out-p21", "A class of 5 has test scores 60, 65, 70, 75, and 5. By how much higher is the median than the mean?",
      "\\text{median} - \\text{mean}", "10", "Sorted: 5,60,65,70,75. Median = 65. Mean = 275 ÷ 5 = 55. Difference = 65 - 55 = 10.", 4),
    poolChoice("y8-dat-out-p22", "Adding a very large outlier to a data set will…", "C",
      ["decrease the range", "leave the range unchanged",
       "increase the range significantly", "halve the range"],
      "A large outlier becomes the new maximum, increasing the range significantly.", 4),
    poolAnswer("y8-dat-out-p23", "Data: 12, 14, 16, 18, 20 (mean 16). An outlier of 100 is added. Find the new mean.",
      "\\frac{80 + 100}{6}", "30", "Old sum = 80. New sum = 180 over 6 = 30.", 4),
    poolAnswer("y8-dat-out-p24", "Data: 12, 14, 16, 18, 20. An outlier of 100 is added (6 values). Find the new median.",
      "\\frac{16 + 18}{2}", "17", "Sorted: 12,14,16,18,20,100. Median = (16 + 18) ÷ 2 = 17.", 4),
    // Difficulty 5
    poolAnswer("y8-dat-out-p25", "A data set of 6 values has mean 20. One value, currently 15, is changed to 75. Find the new mean.",
      "20 + \\frac{75 - 15}{6}", "30", "The sum rises by 60, so the mean rises by 60 ÷ 6 = 10. New mean = 30.", 5),
    poolAnswer("y8-dat-out-p26", "Salaries ($000s): 40, 42, 45, 48, 50, 300. Find the difference between the mean and the median.",
      "\\text{mean} - \\text{median}", "41", "Mean = 525 ÷ 6 = 87.5. Median = (45 + 48) ÷ 2 = 46.5. Difference = 87.5 - 46.5 = 41.", 5),
    poolChoice("y8-dat-out-p27", "A report uses the mean income of a small town to claim residents are wealthy, but most earn modest wages. What is the likely issue?", "A",
      ["A few very high earners inflate the mean — the median would be lower and fairer.",
       "The mean is always wrong.", "Income cannot be averaged.",
       "The median must equal the mean."],
      "A few very high incomes pull the mean up; the median better reflects the typical resident.", 5),
    poolAnswer("y8-dat-out-p28", "Data: 8, 10, 12, 14, 16. The mean is 12. A new value k is added making the new mean 20. Find k.",
      "20 \\times 6 - (8+10+12+14+16)", "60", "New total needed = 120. Old sum = 60. k = 120 - 60 = 60.", 5),
    poolAnswer("y8-dat-out-p29", "Data: 5, 7, 9, 11, 13 has mean 9 and median 9. An outlier of 49 replaces the 13. By how much does the mean change?",
      "\\frac{49 - 13}{5}", "7.2", "The sum rises by 49 - 13 = 36, so the mean rises by 36 ÷ 5 = 7.2.", 5),
    poolChoice("y8-dat-out-p30", "Two data sets have the same five middle values but Set B has one extra extreme outlier. Which statement is true?", "B",
      ["Both have the same mean.", "Set B's mean is pulled toward the outlier, but the medians are similar.",
       "Set B's median equals the outlier.", "Neither has a median."],
      "The outlier pulls Set B's mean toward it, while the medians (depending on middle positions) stay similar.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-out-mp1",
      prompt:
        "A small business records the daily number of customers over 6 days: 18, 20, 22, 19, 21, and 80 (a one-off festival day).",
      latex: "18,\\ 20,\\ 22,\\ 19,\\ 21,\\ 80",
      answer: "80",
      hint: "Identify the outlier, then compute the mean and median; decide which is more representative.",
      explanation:
        "The value 80 is an outlier. Mean = (18+20+22+19+21+80)/6 = 180/6 = 30. Sorted: 18,19,20,21,22,80; median = (20+21)/2 = 20.5. The median (20.5) better represents a typical day because the mean is inflated by the festival outlier.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Which value is the outlier?",
          marks: 1,
          answer: "80",
          acceptedAnswers: [],
          hint: "Which value is far from the rest?",
          explanation: "80 is far above the others (18–22), so it is the outlier.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the mean number of customers per day?",
          marks: 1,
          answer: "30",
          acceptedAnswers: [],
          hint: "Add all 6 values and divide by 6.",
          explanation: "Sum = 180. Mean = 180 ÷ 6 = 30.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the median number of customers per day?",
          marks: 1,
          answer: "20.5",
          acceptedAnswers: [],
          hint: "Sort the 6 values and average the 3rd and 4th.",
          explanation: "Sorted: 18,19,20,21,22,80. Median = (20 + 21) ÷ 2 = 20.5.",
        },
      ],
    },
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
      "Sometimes you cannot reason out a probability by counting equally likely outcomes — maybe the coin is bent, or you simply want to test what really happens. So instead you run the experiment many times and watch how often the event actually occurs. Relative frequency is that observed proportion: how many times the event happened, out of how many times you tried.",
      "For example, roll a die 60 times and suppose a 6 comes up 12 times. The relative frequency of a 6 is $\\frac{12}{60}=0.2$. Notice this comes from real data — you counted it — and it is not the same as the theoretical probability, which you get by reasoning. For a fair die the theoretical probability of a 6 is $\\frac{1}{6}\\approx 0.167$. The observed 0.2 is close to 0.167 but not identical.",
      "In notation, $\\text{relative frequency} = \\frac{\\text{frequency of the event}}{\\text{total number of trials}}$, where frequency is the count of times the event happened and trials is how many times the experiment was run. You can write it as a fraction, a decimal, or a percentage — multiply the decimal by 100 to get the percentage, so $0.2 = 20\\%$, meaning the event occurred in 20% of all trials.",
      "Why does relative frequency end up near the theoretical probability, and why is the gap smaller with more trials? Think about what a single 'unlucky' roll does to the proportion. In 60 rolls, getting one extra 6 changes the count from 12 to 13, swinging the relative frequency by $\\frac{1}{60}\\approx 0.017$ — a noticeable jump. In 6000 rolls, one extra 6 only swings it by $\\frac{1}{6000}\\approx 0.00017$ — almost nothing. The lucky and unlucky trials still happen, but spread across a huge number of trials they cancel out and barely move the proportion. With more trials, random wobble shrinks and the relative frequency settles down near the true probability. This is the Law of Large Numbers.",
      "You can see it in the die: 600 rolls would give a 6 about 100 times, so $\\frac{100}{600}\\approx 0.167$ — much closer to $\\frac{1}{6}$ than the 60-roll result was. So more trials means a more reliable estimate, which is exactly why a scientist testing a coin for fairness flips it hundreds of times, not five.",
      "Two cautions. First, the relative frequencies of all the possible outcomes of one experiment always add to 1 (or 100%), because every trial lands on exactly one outcome. Second — and this is the gambler's fallacy — a short run that drifts from the expected proportion does not 'owe' you a correction. If a fair coin lands heads five times in a row, the sixth flip is still 50-50; the proportion drifts back toward 0.5 over many flips because new trials dilute the early run, not because the coin remembers and balances itself.",
    ],
    latexBlocks: [
      "\\text{relative frequency} = \\frac{\\text{frequency of the event}}{\\text{total number of trials}}",
      "\\text{event occurred 12 times in 60 trials: } \\frac{12}{60} = 0.2 = 20\\%",
      "\\text{as the number of trials grows, relative frequency} \\to \\text{theoretical probability}",
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
    {
      title: "Use relative frequency to predict a count (harder)",
      questionLatex:
        "\\text{A spinner is spun 200 times and lands on red 50 times. Estimate how many reds you would expect in 1000 spins, and say why this estimate is trustworthy.}",
      steps: [
        {
          explanation: "Find the relative frequency of red from the 200-spin experiment — this is our best estimate of the true probability.",
          latex: "\\text{relative frequency of red} = \\frac{50}{200} = 0.25",
        },
        {
          explanation: "Apply that proportion to the larger number of spins to predict the count.",
          latex: "\\text{expected reds in 1000 spins} = 0.25 \\times 1000 = 250",
        },
        {
          explanation: "Note why the estimate is reliable: 200 trials is large, so random wobble in the relative frequency is small, by the Law of Large Numbers.",
          latex: "\\text{200 trials} \\Rightarrow \\text{relative frequency close to true probability}",
        },
      ],
      finalAnswerLatex: "\\text{About } 250 \\text{ reds; trustworthy because 200 trials already give a stable relative frequency of } 0.25.",
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
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-pro-rel-p1", "A coin is flipped 20 times. Heads appears 9 times. Find the relative frequency of heads as a decimal.",
      "\\frac{9}{20}", "0.45", "9 ÷ 20 = 0.45.", 1, ["9/20"]),
    poolChoice("y8-pro-rel-p2", "The formula for relative frequency is…", "B",
      ["total trials ÷ frequency", "frequency ÷ total trials",
       "frequency × total trials", "frequency + total trials"],
      "Relative frequency = frequency ÷ total trials.", 1),
    poolAnswer("y8-pro-rel-p3", "A spinner is spun 25 times. Red appears 5 times. Find the relative frequency of red as a decimal.",
      "\\frac{5}{25}", "0.2", "5 ÷ 25 = 0.2.", 1, ["1/5"]),
    poolAnswer("y8-pro-rel-p4", "Express the relative frequency 0.3 as a percentage.",
      "0.3 \\times 100", "30", "0.3 × 100 = 30%.", 1),
    poolChoice("y8-pro-rel-p5", "The relative frequencies of all outcomes in an experiment must sum to…", "C",
      ["0", "0.5", "1", "100"], "All relative frequencies sum to 1 (or 100%).", 1),
    poolAnswer("y8-pro-rel-p6", "A die is rolled 30 times. A 4 appears 6 times. Find the relative frequency of 4 as a decimal.",
      "\\frac{6}{30}", "0.2", "6 ÷ 30 = 0.2.", 1, ["1/5"]),
    // Difficulty 2
    poolAnswer("y8-pro-rel-p7", "A coin is flipped 80 times. Tails appears 36 times. Find the relative frequency of tails as a decimal.",
      "\\frac{36}{80}", "0.45", "36 ÷ 80 = 0.45.", 2, ["9/20"]),
    poolAnswer("y8-pro-rel-p8", "A spinner is spun 50 times. Green appears 8 times. Express the relative frequency of green as a percentage.",
      "\\frac{8}{50} \\times 100", "16", "8 ÷ 50 = 0.16 = 16%.", 2),
    poolChoice("y8-pro-rel-p9", "As the number of trials increases, the relative frequency tends to…", "A",
      ["approach the theoretical probability", "move toward 1",
       "stay exactly the same", "become unpredictable"],
      "By the Law of Large Numbers, relative frequency approaches the theoretical probability.", 2),
    poolAnswer("y8-pro-rel-p10", "A die is rolled 60 times. A 2 appears 9 times. Find the relative frequency of 2 as a simplified fraction.",
      "\\frac{9}{60}", "3/20", "9/60 = 3/20.", 2, ["0.15", "15%"]),
    poolAnswer("y8-pro-rel-p11", "In an experiment, P(red) = 0.4 and P(blue) = 0.35. Find the relative frequency of all other outcomes combined.",
      "1 - 0.4 - 0.35", "0.25", "1 - 0.4 - 0.35 = 0.25.", 2),
    poolChoice("y8-pro-rel-p12", "Theoretical P(heads) = 0.5, but 40 flips give a relative frequency of 0.55. The most likely reason is…", "B",
      ["the coin is biased", "natural variation in a finite experiment",
       "the formula is wrong", "coins have no probability"],
      "Natural variation causes small differences in a finite experiment.", 2),
    // Difficulty 3
    poolAnswer("y8-pro-rel-p13", "A die is rolled 600 times. A 6 appears 88 times. Find the relative frequency of 6 as a decimal, rounded to 2 decimal places.",
      "\\frac{88}{600}", "0.15", "88 ÷ 600 = 0.1466... ≈ 0.15.", 3, ["0.147", "0.1467"]),
    poolAnswer("y8-pro-rel-p14", "A bag draw (with replacement) 40 times gives red 18, blue 14, green 8. Find the relative frequency of green as a decimal.",
      "\\frac{8}{40}", "0.2", "8 ÷ 40 = 0.2.", 3, ["1/5"]),
    poolAnswer("y8-pro-rel-p15", "From the data above, the relative frequencies of red and blue are 0.45 and 0.35. Confirm the relative frequency of green so all sum to 1.",
      "1 - 0.45 - 0.35", "0.2", "1 - 0.45 - 0.35 = 0.2, matching 8/40.", 3),
    poolChoice("y8-pro-rel-p16", "Experiment A: 10 flips, 6 heads. Experiment B: 1000 flips, 504 heads. Whose relative frequency is more reliable?", "B",
      ["Experiment A", "Experiment B", "Both equal", "Neither"],
      "More trials give a more reliable relative frequency, so Experiment B (1000 flips) is more reliable.", 3),
    poolAnswer("y8-pro-rel-p17", "A student rolls a die 30 times and gets a 3 exactly 5 times. Express the relative frequency as a percentage, rounded to 2 decimal places.",
      "\\frac{5}{30} \\times 100", "16.67", "5 ÷ 30 = 0.1667 = 16.67%.", 3, ["16.7", "16.667"]),
    poolAnswer("y8-pro-rel-p18", "In 200 trials, an event has relative frequency 0.35. How many times did the event occur?",
      "0.35 \\times 200", "70", "Frequency = 0.35 × 200 = 70.", 3),
    // Difficulty 4
    poolAnswer("y8-pro-rel-p19", "A coin is flipped 250 times. Heads appears 130 times. Find the relative frequency of heads as a decimal.",
      "\\frac{130}{250}", "0.52", "130 ÷ 250 = 0.52.", 4, ["13/25"]),
    poolAnswer("y8-pro-rel-p20", "In an experiment with outcomes A, B, C: P(A) = 0.5, P(C) = 0.2. If 300 trials were run, how many were outcome B?",
      "(1 - 0.5 - 0.2) \\times 300", "90", "P(B) = 1 - 0.5 - 0.2 = 0.3. Count = 0.3 × 300 = 90.", 4),
    poolAnswer("y8-pro-rel-p21", "A die is rolled 90 times. Results: 1→12, 2→18, 3→15, 4→10, 5→20, 6→15. Find the relative frequency of rolling a 5 as a simplified fraction.",
      "\\frac{20}{90}", "2/9", "20/90 = 2/9.", 4, ["0.222", "0.22"]),
    poolChoice("y8-pro-rel-p22", "A biased coin has P(heads) = 0.7. After 1000 flips, the most likely relative frequency of heads is closest to…", "C",
      ["0.50", "0.60", "0.70", "0.85"], "With many trials, relative frequency converges to 0.7.", 4),
    poolAnswer("y8-pro-rel-p23", "An event occurred 84 times in 240 trials. Find the relative frequency as a decimal.",
      "\\frac{84}{240}", "0.35", "84 ÷ 240 = 0.35.", 4, ["7/20"]),
    poolAnswer("y8-pro-rel-p24", "In a survey of 400 people, 0.18 had relative frequency 'prefers tea'. How many preferred tea?",
      "0.18 \\times 400", "72", "0.18 × 400 = 72.", 4),
    // Difficulty 5
    poolAnswer("y8-pro-rel-p25", "A spinner with colours red, blue, green is spun 500 times. Red occurred 210 times and blue 165 times. Find the relative frequency of green as a decimal.",
      "1 - \\frac{210}{500} - \\frac{165}{500}", "0.25", "Green count = 500 - 210 - 165 = 125. RF = 125 ÷ 500 = 0.25.", 5, ["1/4"]),
    poolAnswer("y8-pro-rel-p26", "An event has relative frequency 0.16 after 250 trials. After 150 more trials it occurred 30 more times. Find the new overall relative frequency as a decimal.",
      "\\frac{0.16\\times250 + 30}{400}", "0.175", "First count = 40. New total count = 70 over 400 trials = 0.175.", 5),
    poolAnswer("y8-pro-rel-p27", "A die is rolled n times and a 6 appears 25 times, giving a relative frequency of 0.2. Find n.",
      "n = \\frac{25}{0.2}", "125", "n = 25 ÷ 0.2 = 125.", 5),
    poolChoice("y8-pro-rel-p28", "Two students estimate P(heads). Student A: 0.6 from 20 flips. Student B: 0.51 from 2000 flips. Which estimate should you trust more and why?", "B",
      ["A, because 0.6 is a round number.", "B, because more trials give a more reliable estimate.",
       "A, because fewer flips reduce error.", "Neither can be trusted."],
      "Student B's far larger sample gives a more reliable relative frequency.", 5),
    poolAnswer("y8-pro-rel-p29", "A survey records that the relative frequency of 'walks to school' is 0.225 from 360 students. How many students walk?",
      "0.225 \\times 360", "81", "0.225 × 360 = 81.", 5),
    poolAnswer("y8-pro-rel-p30", "In 800 trials, three outcomes have relative frequencies 0.3, 0.45, and the rest. How many trials gave the third outcome?",
      "(1 - 0.3 - 0.45) \\times 800", "200", "RF of third = 1 - 0.3 - 0.45 = 0.25. Count = 0.25 × 800 = 200.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-pro-rel-mp1",
      prompt:
        "A spinner with three colours is spun 50 times. The results are: red 20, blue 18, green 12.",
      latex: "\\text{Red }20,\\ \\text{Blue }18,\\ \\text{Green }12\\ \\text{(50 spins)}",
      answer: "0.4",
      hint: "Relative frequency = colour count ÷ 50. The three should sum to 1.",
      explanation:
        "Part (a): RF(red) = 20/50 = 0.4. Part (b): RF(green) = 12/50 = 0.24. Part (c): the three relative frequencies (0.4 + 0.36 + 0.24) sum to 1.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the relative frequency of red as a decimal.",
          marks: 1,
          answer: "0.4",
          acceptedAnswers: ["2/5", "20/50"],
          hint: "20 red out of 50 spins.",
          explanation: "RF(red) = 20/50 = 0.4.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the relative frequency of green as a decimal.",
          marks: 1,
          answer: "0.24",
          acceptedAnswers: ["12/50", "6/25"],
          hint: "12 green out of 50 spins.",
          explanation: "RF(green) = 12/50 = 0.24.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What must the three relative frequencies add up to?",
          marks: 1,
          answer: "1",
          acceptedAnswers: ["100%"],
          hint: "All outcomes together cover every spin.",
          explanation: "0.4 + 0.36 + 0.24 = 1. Relative frequencies of all outcomes sum to 1.",
        },
      ],
    },
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
      "If you flip a fair coin 100 times, how many heads should you expect? About 50. That is the expected count — a prediction of how many times an event will happen if you repeat an experiment many times. It is not a promise; you might get 47 or 53. But 50 is the best single guess, and it comes straight from the probability of the event.",
      "Here is the example worked out. The probability of rolling a 6 on a fair die is $\\frac{1}{6}$. If you roll 120 times, you expect a 6 on about one-sixth of those rolls, which is $\\frac{1}{6}\\times 120 = 20$. So 20 sixes is the prediction for 120 rolls.",
      "In notation, $\\text{expected count} = P(\\text{event}) \\times n$, where $P(\\text{event})$ is the probability of the event on a single trial and $n$ is the number of trials. The result is a number of times, so it should be sensible for the context — you can leave it as a decimal in a prediction even though any single experiment must land on a whole number.",
      "Why multiply probability by the number of trials? Because $P(\\text{event})$ is the fraction of trials the event takes in the long run — recall relative frequency settles down near the probability. If the event claims a fraction $P$ of every trial, then over $n$ trials it claims that same fraction of all of them: $P$ of $n$, which is $P\\times n$. It is the same logic as 'one-sixth of 120 students' — you take the fraction of the whole. That is the entire derivation: expected count is just the probability's share of the total trials.",
      "You can run the formula backwards too. If you know the expected count and the probability, you can recover the number of trials by dividing: $n = \\frac{\\text{expected count}}{P(\\text{event})}$, since multiplication and division are inverses. This is handy when a question tells you how often something was expected to happen and asks how many trials there must have been.",
      "Expected count also lets you sanity-check whether a set-up is fair, but here is the misconception to dissolve: a gap between expected and actual does not prove bias, and a match does not prove fairness. Roll a die 600 times: you expect $\\frac{1}{6}\\times 600 = 100$ sixes. Getting 95 is a small gap, easily explained by natural variation. Getting only 50 is a large gap that would make you suspect the die is biased. The key is the size of the gap relative to the number of trials — small wobble is normal, a big systematic shortfall is the warning sign.",
    ],
    latexBlocks: [
      "\\text{expected count} = P(\\text{event}) \\times n",
      "P(6) = \\frac{1}{6},\\; n = 120 \\Rightarrow \\text{expected count} = \\frac{1}{6} \\times 120 = 20",
      "n = \\frac{\\text{expected count}}{P(\\text{event})} \\quad(\\text{rearranged})",
      "\\text{expected count is a prediction — actual results vary}",
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
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-pro-exp-p1", "P(event) = 0.5. The event runs 60 times. Find the expected count.",
      "0.5 \\times 60", "30", "Expected count = 0.5 × 60 = 30.", 1),
    poolChoice("y8-pro-exp-p2", "The expected count formula is…", "C",
      ["n ÷ P", "P + n", "P × n", "P - n"], "Expected count = P(event) × n.", 1),
    poolAnswer("y8-pro-exp-p3", "A coin is flipped 80 times. How many heads are expected?",
      "0.5 \\times 80", "40", "Expected heads = 0.5 × 80 = 40.", 1),
    poolAnswer("y8-pro-exp-p4", "P(rolling a 6) = 1/6. A die is rolled 60 times. Find the expected number of 6s.",
      "\\frac{1}{6} \\times 60", "10", "(1/6) × 60 = 10.", 1),
    poolChoice("y8-pro-exp-p5", "Expected count is best described as…", "B",
      ["a guaranteed result", "a prediction that actual results vary around",
       "the largest possible value", "always exactly correct"],
      "Expected count is a prediction; actual results vary.", 1),
    poolAnswer("y8-pro-exp-p6", "P(event) = 0.2. The event runs 100 times. Find the expected count.",
      "0.2 \\times 100", "20", "0.2 × 100 = 20.", 1),
    // Difficulty 2
    poolAnswer("y8-pro-exp-p7", "A spinner has 4 equal sections. It is spun 80 times. How many times is one section expected?",
      "\\frac{1}{4} \\times 80", "20", "P = 1/4. Expected = (1/4) × 80 = 20.", 2),
    poolAnswer("y8-pro-exp-p8", "P(event) = 0.3. The event is expected to occur 24 times. Find the number of trials.",
      "\\frac{24}{0.3}", "80", "n = 24 ÷ 0.3 = 80.", 2),
    poolAnswer("y8-pro-exp-p9", "A die is rolled 120 times. How many even numbers are expected?",
      "\\frac{1}{2} \\times 120", "60", "P(even) = 1/2. Expected = 60.", 2),
    poolChoice("y8-pro-exp-p10", "A coin is flipped 50 times. What is the expected number of tails?", "B",
      ["20", "25", "30", "50"], "P(tails) = 0.5. Expected = 0.5 × 50 = 25.", 2),
    poolAnswer("y8-pro-exp-p11", "A bag has 2 red and 8 blue marbles, drawn (with replacement) 50 times. How many reds are expected?",
      "\\frac{2}{10} \\times 50", "10", "P(red) = 2/10 = 0.2. Expected = 0.2 × 50 = 10.", 2),
    poolAnswer("y8-pro-exp-p12", "In 200 trials, an event is expected to occur 50 times. Find P(event).",
      "\\frac{50}{200}", "0.25", "P = 50 ÷ 200 = 0.25.", 2, ["1/4"]),
    // Difficulty 3
    poolAnswer("y8-pro-exp-p13", "A spinner has 5 equal sections. It is spun 150 times. How many times is one section expected?",
      "\\frac{1}{5} \\times 150", "30", "P = 1/5. Expected = 30.", 3),
    poolAnswer("y8-pro-exp-p14", "P(rain) = 0.3. How many rainy days are expected in 60 days?",
      "0.3 \\times 60", "18", "Expected = 0.3 × 60 = 18.", 3),
    poolAnswer("y8-pro-exp-p15", "A die is rolled. P(number less than 3) = 1/3. If 90 such outcomes are expected, how many rolls were there?",
      "\\frac{90}{1/3}", "270", "n = 90 ÷ (1/3) = 90 × 3 = 270.", 3),
    poolChoice("y8-pro-exp-p16", "P(event) = 0.25 and 60 trials are run. You get 10 outcomes. What does this tell you?", "B",
      ["The model is definitely wrong.", "Expected is 15; 10 is below but within natural variation.",
       "Actual must equal expected.", "The formula was wrong."],
      "Expected = 0.25 × 60 = 15. Getting 10 is below but plausible with only 60 trials.", 3),
    poolAnswer("y8-pro-exp-p17", "A seed has germination probability 0.8. A gardener plants 120 seeds. How many are expected to germinate?",
      "0.8 \\times 120", "96", "Expected = 0.8 × 120 = 96.", 3),
    poolAnswer("y8-pro-exp-p18", "P(event) = 0.15. The event is expected 27 times. Find the number of trials.",
      "\\frac{27}{0.15}", "180", "n = 27 ÷ 0.15 = 180.", 3),
    // Difficulty 4
    poolAnswer("y8-pro-exp-p19", "A die is rolled 240 times. How many times is a number greater than 4 expected?",
      "\\frac{2}{6} \\times 240", "80", "P(>4) = 2/6 = 1/3. Expected = (1/3) × 240 = 80.", 4),
    poolAnswer("y8-pro-exp-p20", "A bag has 3 red, 5 blue, 2 green. It is drawn (with replacement) 250 times. How many blues are expected?",
      "\\frac{5}{10} \\times 250", "125", "P(blue) = 5/10 = 0.5. Expected = 0.5 × 250 = 125.", 4),
    poolAnswer("y8-pro-exp-p21", "A spinner has 8 equal sections, 3 shaded. It is spun 200 times. How many shaded results are expected?",
      "\\frac{3}{8} \\times 200", "75", "P(shaded) = 3/8. Expected = (3/8) × 200 = 75.", 4),
    poolChoice("y8-pro-exp-p22", "A die is rolled 600 times and a 6 appears 60 times. Expected = 100. What is the best interpretation?", "B",
      ["This is normal variation.", "A large gap suggesting the die may be biased.",
       "The die must be fair.", "The formula failed."],
      "60 vs an expected 100 over 600 rolls is a large gap, suggesting possible bias.", 4),
    poolAnswer("y8-pro-exp-p23", "P(event) = 0.45 and the event occurs an expected 90 times. Find the number of trials.",
      "\\frac{90}{0.45}", "200", "n = 90 ÷ 0.45 = 200.", 4),
    poolAnswer("y8-pro-exp-p24", "Two dice are rolled 180 times. P(sum = 7) = 1/6. How many sums of 7 are expected?",
      "\\frac{1}{6} \\times 180", "30", "Expected = (1/6) × 180 = 30.", 4),
    // Difficulty 5
    poolAnswer("y8-pro-exp-p25", "A spinner has sections numbered 1–10. It is spun 350 times. How many times is a multiple of 3 expected?",
      "\\frac{3}{10} \\times 350", "105", "Multiples of 3 in 1–10: 3,6,9 → P = 3/10. Expected = 0.3 × 350 = 105.", 5),
    poolAnswer("y8-pro-exp-p26", "A factory's defect rate is 0.02. In a batch of 4500 items, how many defects are expected?",
      "0.02 \\times 4500", "90", "Expected = 0.02 × 4500 = 90.", 5),
    poolAnswer("y8-pro-exp-p27", "Two dice are rolled 360 times. P(a double) = 1/6. How many doubles are expected?",
      "\\frac{1}{6} \\times 360", "60", "Expected = (1/6) × 360 = 60.", 5),
    poolAnswer("y8-pro-exp-p28", "A bag has counters numbered 1–20. P(a prime) is found, then 400 draws (with replacement) are made. How many primes are expected?",
      "\\frac{8}{20} \\times 400", "160", "Primes 1–20: 2,3,5,7,11,13,17,19 = 8. P = 8/20 = 0.4. Expected = 0.4 × 400 = 160.", 5),
    poolChoice("y8-pro-exp-p29", "An event with P = 0.1 is run 50 times, then 150 more times. What is the total expected count across all 200 trials?", "C",
      ["5", "15", "20", "50"], "Expected = 0.1 × 200 = 20.", 5),
    poolAnswer("y8-pro-exp-p30", "A game is fair if the expected number of wins in 300 plays is 50. Find P(win) as a decimal, rounded to 3 decimal places.",
      "\\frac{50}{300}", "0.167", "P = 50 ÷ 300 = 0.1667 ≈ 0.167.", 5, ["1/6", "0.1667"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pro-exp-mp1",
      prompt:
        "A fair spinner has 5 equal sections coloured red, blue, green, yellow, and white. It is spun 200 times.",
      latex: "5\\text{ equal sections},\\ n = 200",
      answer: "40",
      hint: "Each section has probability 1/5. Expected count = P × 200.",
      explanation:
        "Part (a): P(red) = 1/5 = 0.2, so expected reds = 0.2 × 200 = 40. Part (b): expected number landing on red OR blue = (2/5) × 200 = 80. Part (c): if green actually occurred 30 times, that is below the expected 40, but within natural variation.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many times is red expected?",
          marks: 1,
          answer: "40",
          acceptedAnswers: [],
          hint: "P(red) = 1/5; multiply by 200.",
          explanation: "Expected reds = (1/5) × 200 = 40.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How many times is 'red or blue' expected?",
          marks: 1,
          answer: "80",
          acceptedAnswers: [],
          hint: "P(red or blue) = 2/5; multiply by 200.",
          explanation: "Expected = (2/5) × 200 = 80.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Green actually occurred 30 times. How far below the expected count is this?",
          marks: 1,
          answer: "10",
          acceptedAnswers: [],
          hint: "Expected green = 40. Subtract the actual 30.",
          explanation: "Expected = 40, actual = 30, difference = 40 - 30 = 10.",
        },
      ],
    },
  ],
};

// ── Lesson 12: Box Plots ──────────────────────────────────────────────────────

const boxPlots: LessonContent = {
  description:
    "Find the five-number summary of an ordered data set, draw a box plot, and read the median, quartiles, IQR and shape from a box plot display.",
  learningIntention:
    "Construct a box plot from the five-number summary and use it to describe the centre, spread and shape of a data set.",
  successCriteria: [
    "State the five-number summary: minimum, Q1, median (Q2), Q3, and maximum.",
    "Draw a box plot on a number line using the five-number summary.",
    "Read Q1, Q3, median and IQR directly from a box plot.",
    "Describe the shape of a distribution (symmetric or skewed) from a box plot.",
  ],
  teaching: {
    paragraphs: [
      "A box plot (or box-and-whisker plot) is a way to picture a whole data set using just five carefully chosen numbers — the five-number summary: the minimum, the lower quartile $Q_1$, the median $Q_2$, the upper quartile $Q_3$, and the maximum. With those five values, you can see at a glance where the data sits and how widely it is spread, without plotting every single value.",
      "To draw one, first sort the data and find all five numbers. Draw a number line, mark the five values on it, build a rectangular box from $Q_1$ to $Q_3$, put a vertical line inside the box at the median, then extend horizontal whiskers from the box edges out to the minimum and the maximum. The width of the box is the interquartile range, $\\text{IQR} = Q_3 - Q_1$.",
      "Why do these five numbers summarise the data so well? Because the quartiles cut the sorted data into four equal quarters, each part of the picture carries exactly 25% of the values. The left whisker holds the bottom quarter, the left half of the box the next quarter, the right half of the box the next, and the right whisker the top quarter. So the box always contains the middle 50% of the data, and the median line splits that middle in half. The five points are not arbitrary — they are the boundaries between the four equal-sized chunks of the data, which is why so much information fits into so few marks.",
      "Reading the picture tells you the shape. If the median line sits roughly in the centre of the box and both whiskers are about equal in length, the data is symmetric. If the median is pushed toward one end of the box, or one whisker is much longer than the other, the data is skewed — skewed right when the long tail stretches to the right, skewed left when it stretches to the left. The long tail points in the direction of the skew.",
      "The misconception to dissolve is reading box width as 'amount of data'. A wide box does not mean more values live there — every box holds exactly the middle 50% no matter how wide it is. A wide box means those central values are spread far apart; a narrow box means they are bunched tightly. Width is about spread, not count, because each quarter always has the same number of values by construction.",
    ],
    latexBlocks: [
      "\\text{five-number summary: Min},\\; Q_1,\\; Q_2\\,(\\text{median}),\\; Q_3,\\; \\text{Max}",
      "\\text{each of the four sections holds } 25\\% \\text{ of the data}",
      "\\text{IQR} = Q_3 - Q_1 = \\text{width of the box} = \\text{spread of the middle } 50\\%",
    ],
  },
  workedExamples: [
    {
      title: "Find the five-number summary",
      questionLatex:
        "\\text{Data: } 3,\\; 7,\\; 10,\\; 12,\\; 15,\\; 18,\\; 22.\\text{ Find the five-number summary.}",
      steps: [
        {
          explanation: "The data is already sorted. Identify the minimum and maximum.",
          latex: "\\text{Min} = 3,\\quad \\text{Max} = 22",
        },
        {
          explanation: "Q2 (median) is the middle value — the 4th of 7.",
          latex: "Q_2 = 12",
        },
        {
          explanation: "Lower half (excluding median): 3, 7, 10. Q1 is the median of this half.",
          latex: "Q_1 = 7",
        },
        {
          explanation: "Upper half (excluding median): 15, 18, 22. Q3 is the median of this half.",
          latex: "Q_3 = 18,\\quad \\text{IQR} = 18 - 7 = 11",
        },
      ],
      finalAnswerLatex:
        "\\text{Min}=3,\\; Q_1=7,\\; Q_2=12,\\; Q_3=18,\\; \\text{Max}=22,\\; \\text{IQR}=11",
    } as WorkedExample,
    {
      title: "Read values from a box plot",
      questionLatex:
        "\\text{A box plot has: left whisker at 5, box from 10 to 20, median line at 14, right whisker at 28. Find the IQR and range.}",
      steps: [
        {
          explanation: "Read Q1 and Q3 from the box edges.",
          latex: "Q_1 = 10,\\quad Q_3 = 20",
        },
        {
          explanation: "Calculate the IQR.",
          latex: "\\text{IQR} = Q_3 - Q_1 = 20 - 10 = 10",
        },
        {
          explanation: "The range spans from the left whisker to the right whisker.",
          latex: "\\text{Range} = 28 - 5 = 23",
        },
      ],
      finalAnswerLatex: "\\text{IQR} = 10,\\quad \\text{Range} = 23",
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 5, a box from 10 to 20, a median line at 14 and the right whisker at 28.",
        plots: [{ label: "Dataset", min: 5, q1: 10, median: 14, q3: 20, max: 28 }],
        showValueLabels: true,
      },
    } as WorkedExample,
    {
      title: "Describe the shape from a box plot",
      questionLatex:
        "\\text{Box plot: Min}=2,\\; Q_1=6,\\; \\text{Median}=8,\\; Q_3=12,\\; \\text{Max}=24.\\text{ Describe the shape.}",
      steps: [
        {
          explanation: "Check whether the median sits centrally in the box.",
          latex: "\\text{Left half of box: } 8-6=2.\\quad \\text{Right half of box: } 12-8=4.",
        },
        {
          explanation: "Check whether the whiskers are equal in length.",
          latex: "\\text{Left whisker: } 6-2=4.\\quad \\text{Right whisker: } 24-12=12.",
        },
        {
          explanation: "The median is closer to Q1 and the right whisker is much longer — the data is skewed right.",
          latex: "\\text{Longer tail to the right} \\Rightarrow \\text{skewed right}",
        },
      ],
      finalAnswerLatex: "\\text{The distribution is skewed right (positively skewed).}",
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 2, a box from 6 to 12, a median line at 8 and the right whisker at 24 — the long right whisker shows the right skew.",
        plots: [{ label: "Dataset", min: 2, q1: 6, median: 8, q3: 12, max: 24 }],
        showValueLabels: true,
      },
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-bxp-g1",
      "Which of the following is NOT part of the five-number summary?",
      "C",
      [
        "Minimum",
        "Q3 (upper quartile)",
        "Mean",
        "Median",
      ],
      "The five-number summary consists of: minimum, Q1, median (Q2), Q3, and maximum. The mean is not part of it."
    ),
    answer(
      "y8-dat-bxp-g2",
      "Sorted data: 4, 8, 11, 15, 19. Find the five-number summary median (Q2).",
      "\\text{Middle (3rd) value of 5}",
      "11",
      "5 values → the median is the 3rd value: 11."
    ),
    answer(
      "y8-dat-bxp-g3",
      "A box plot has its box drawn from 8 to 20. What is the IQR?",
      "\\text{IQR} = Q_3 - Q_1 = 20 - 8",
      "12",
      "The left edge of the box is Q1 = 8 and the right edge is Q3 = 20. IQR = 20 − 8 = 12."
    ),
    {
      ...answer(
        "y8-dat-bxp-g4",
        "A box plot shows: Min = 5, Q1 = 9, Median = 13, Q3 = 17, Max = 21. What is the range?",
        "\\text{Range} = \\text{Max} - \\text{Min} = 21 - 5",
        "16",
        "Range = maximum − minimum = 21 − 5 = 16."
      ),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 5, a box from 9 to 17, a median line at 13 and the right whisker at 21.",
        plots: [{ label: "Dataset", min: 5, q1: 9, median: 13, q3: 17, max: 21 }],
        showValueLabels: true,
      },
    },
  ],
  independentPractice: [
    answer(
      "y8-dat-bxp-i1",
      "Sorted data: 2, 5, 9, 13, 17, 21, 25. Find Q1 (the median of the lower half, excluding the overall median).",
      "\\text{Lower half: } 2,\\; 5,\\; 9",
      "5",
      "Overall median (4th value) = 13. Lower half: 2, 5, 9. The median of the lower half is the middle value = 5. Q1 = 5."
    ),
    answer(
      "y8-dat-bxp-i2",
      "Sorted data: 2, 5, 9, 13, 17, 21, 25. Find Q3 (the median of the upper half, excluding the overall median).",
      "\\text{Upper half: } 17,\\; 21,\\; 25",
      "21",
      "Upper half (excluding median 13): 17, 21, 25. The median of the upper half is 21. Q3 = 21."
    ),
    answer(
      "y8-dat-bxp-i3",
      "A box plot shows: Q1 = 5 and Q3 = 21. Find the IQR.",
      "\\text{IQR} = 21 - 5",
      "16",
      "IQR = Q3 − Q1 = 21 − 5 = 16."
    ),
    choice(
      "y8-dat-bxp-i4",
      "A box plot has the median line sitting very close to Q1, and a long right whisker. How would you describe the shape?",
      "B",
      [
        "Symmetric",
        "Skewed right",
        "Skewed left",
        "Bimodal",
      ],
      "When the median is close to Q1 (the lower edge of the box) and the right whisker is long, most values are bunched at the lower end with a long tail stretching right — this is a right (positive) skew."
    ),
    {
      ...answer(
        "y8-dat-bxp-i5",
        "A box plot has: Min = 10, Q1 = 14, Median = 18, Q3 = 22, Max = 26. Find the IQR and the range.",
        "\\text{IQR} = 22 - 14,\\quad \\text{Range} = 26 - 10",
        "8 and 16",
        "IQR = Q3 − Q1 = 22 − 14 = 8. Range = Max − Min = 26 − 10 = 16.",
        ["IQR = 8, Range = 16", "IQR=8 Range=16"]
      ),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 10, a box from 14 to 22, a median line at 18 and the right whisker at 26.",
        plots: [{ label: "Dataset", min: 10, q1: 14, median: 18, q3: 22, max: 26 }],
        showValueLabels: true,
      },
    },
  ],
  commonMistakes: [
    {
      mistake: "Thinking a wider box means more data values are in that section.",
      fix: "The box always represents the middle 50% of the data — the same number of values regardless of box width. A wider box means those values are more spread out, not that there are more of them.",
    },
    {
      mistake: "Confusing the box width (IQR) with the total range.",
      fix: "The IQR = Q3 − Q1 is the width of the box only. The range = maximum − minimum includes the whiskers as well. The IQR is always less than or equal to the range.",
    },
    {
      mistake: "Including the median in both halves when computing Q1 and Q3 from an odd-count data set.",
      fix: "For an odd number of values, exclude the median from both the lower and upper halves before finding Q1 and Q3.",
    },
  ],
  masteryQuiz: [
    {
      ...choice(
        "y8-dat-bxp-m1",
        "A box plot has: Min = 3, Q1 = 7, Median = 11, Q3 = 16, Max = 20. What is the IQR?",
        "B",
        ["8", "9", "13", "17"],
        "IQR = Q3 − Q1 = 16 − 7 = 9."
      ),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 3, a box from 7 to 16, a median line at 11 and the right whisker at 20.",
        plots: [{ label: "Dataset", min: 3, q1: 7, median: 11, q3: 16, max: 20 }],
        showValueLabels: true,
      },
    },
    choice(
      "y8-dat-bxp-m2",
      "A box plot has Min = 3 and Max = 23. What is the range?",
      "C",
      ["9", "16", "20", "26"],
      "Range = Max − Min = 23 − 3 = 20."
    ),
    answer(
      "y8-dat-bxp-m3",
      "Sorted data: 6, 10, 14, 18, 22. Find Q1.",
      "\\text{Lower half (excl. median 14): }6,\\;10",
      "8",
      "Median is the 3rd value = 14. Lower half: 6, 10. Q1 = (6 + 10) ÷ 2 = 8."
    ),
    answer(
      "y8-dat-bxp-m4",
      "Sorted data: 6, 10, 14, 18, 22. Find Q3.",
      "\\text{Upper half (excl. median 14): }18,\\;22",
      "20",
      "Upper half: 18, 22. Q3 = (18 + 22) ÷ 2 = 20."
    ),
    answer(
      "y8-dat-bxp-m5",
      "Q1 = 8, Q3 = 20. Find the IQR.",
      "\\text{IQR} = 20 - 8",
      "12",
      "IQR = Q3 − Q1 = 20 − 8 = 12."
    ),
    {
      ...answer(
        "y8-dat-bxp-m6",
        "A box plot shows: Min = 2, Q1 = 6, Median = 10, Q3 = 14, Max = 30. What is the length of the right whisker?",
        "30 - 14",
        "16",
        "The right whisker extends from Q3 to the maximum: 30 − 14 = 16."
      ),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 2, a box from 6 to 14, a median line at 10 and the right whisker at 30.",
        plots: [{ label: "Dataset", min: 2, q1: 6, median: 10, q3: 14, max: 30 }],
        showValueLabels: true,
      },
    },
    {
      ...answer(
        "y8-dat-bxp-m7",
        "A box plot shows: Min = 2, Q1 = 6, Median = 10, Q3 = 14, Max = 30. What is the length of the left whisker?",
        "6 - 2",
        "4",
        "The left whisker extends from the minimum to Q1: 6 − 2 = 4."
      ),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 2, a box from 6 to 14, a median line at 10 and the right whisker at 30.",
        plots: [{ label: "Dataset", min: 2, q1: 6, median: 10, q3: 14, max: 30 }],
        showValueLabels: true,
      },
    },
    answer(
      "y8-dat-bxp-m8",
      "Sorted data: 5, 8, 11, 14, 17, 20, 23, 26 (8 values). Find Q1.",
      "\\text{Lower half: }5,\\;8,\\;11,\\;14 \\Rightarrow Q_1 = \\frac{8+11}{2}",
      "9.5",
      "8 values split evenly: lower half is 5, 8, 11, 14. Q1 = (8 + 11) ÷ 2 = 9.5."
    ),
    answer(
      "y8-dat-bxp-m9",
      "Sorted data: 5, 8, 11, 14, 17, 20, 23, 26 (8 values). Find Q3.",
      "\\text{Upper half: }17,\\;20,\\;23,\\;26 \\Rightarrow Q_3 = \\frac{20+23}{2}",
      "21.5",
      "Upper half: 17, 20, 23, 26. Q3 = (20 + 23) ÷ 2 = 21.5."
    ),
    answer(
      "y8-dat-bxp-m10",
      "A box plot has: Q1 = 9.5, Q3 = 21.5. Calculate the IQR.",
      "\\text{IQR} = 21.5 - 9.5",
      "12",
      "IQR = Q3 − Q1 = 21.5 − 9.5 = 12."
    ),
  ],
  masteryQuizPool: [
    // Difficulty 1
    poolChoice("y8-dat-bxp-p1", "Which is NOT part of the five-number summary?", "C",
      ["Minimum", "Q1", "Mean", "Maximum"], "The five-number summary is Min, Q1, Median, Q3, Max — not the mean.", 1),
    poolAnswer("y8-dat-bxp-p2", "A box plot has its box from 6 to 16. Find the IQR.",
      "16 - 6", "10", "IQR = Q3 - Q1 = 16 - 6 = 10.", 1),
    poolAnswer("y8-dat-bxp-p3", "A box plot has Min = 4 and Max = 24. Find the range.",
      "24 - 4", "20", "Range = Max - Min = 24 - 4 = 20.", 1),
    poolChoice("y8-dat-bxp-p4", "On a box plot, the box represents…", "B",
      ["all the data", "the middle 50% of the data", "the largest 25%", "the mode"],
      "The box spans Q1 to Q3 — the middle 50% of the data.", 1),
    poolAnswer("y8-dat-bxp-p5", "Sorted data: 3, 7, 11, 15, 19. Find Q2 (the median).",
      "\\text{3rd value}", "11", "5 values → median is the 3rd: 11.", 1),
    poolChoice("y8-dat-bxp-p6", "The IQR equals the…", "A",
      ["width of the box", "length of a whisker", "total range", "median"],
      "The IQR (Q3 - Q1) is the width of the box.", 1),
    // Difficulty 2
    {
      ...poolAnswer("y8-dat-bxp-p7", "A box plot: Min = 5, Q1 = 9, Median = 13, Q3 = 17, Max = 21. Find the IQR.",
        "17 - 9", "8", "IQR = Q3 - Q1 = 17 - 9 = 8.", 2),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 5, a box from 9 to 17, a median line at 13 and the right whisker at 21.",
        plots: [{ label: "Dataset", min: 5, q1: 9, median: 13, q3: 17, max: 21 }],
        showValueLabels: true,
      },
    },
    poolAnswer("y8-dat-bxp-p8", "Same box plot (Min 5, Max 21). Find the range.",
      "21 - 5", "16", "Range = 21 - 5 = 16.", 2),
    poolAnswer("y8-dat-bxp-p9", "Sorted data: 6, 10, 14, 18, 22. Find Q1 (median of the lower half, excluding the median).",
      "\\frac{6 + 10}{2}", "8", "Median = 14 (3rd). Lower half: 6, 10. Q1 = (6 + 10) ÷ 2 = 8.", 2),
    poolAnswer("y8-dat-bxp-p10", "Sorted data: 6, 10, 14, 18, 22. Find Q3 (median of the upper half).",
      "\\frac{18 + 22}{2}", "20", "Upper half: 18, 22. Q3 = (18 + 22) ÷ 2 = 20.", 2),
    poolChoice("y8-dat-bxp-p11", "A box plot has the median line in the centre of the box and equal whiskers. The shape is…", "A",
      ["symmetric", "skewed right", "skewed left", "bimodal"],
      "A central median and equal whiskers indicate a symmetric distribution.", 2),
    poolAnswer("y8-dat-bxp-p12", "A box plot has Q3 = 30 and a right whisker reaching Max = 45. Find the right whisker length.",
      "45 - 30", "15", "Right whisker = Max - Q3 = 45 - 30 = 15.", 2),
    // Difficulty 3
    poolAnswer("y8-dat-bxp-p13", "Sorted data: 2, 5, 9, 13, 17, 21, 25 (7 values). Find Q1.",
      "\\text{median of }2, 5, 9", "5", "Median = 13 (4th). Lower half: 2, 5, 9. Q1 = 5.", 3),
    poolAnswer("y8-dat-bxp-p14", "Sorted data: 2, 5, 9, 13, 17, 21, 25 (7 values). Find Q3.",
      "\\text{median of }17, 21, 25", "21", "Upper half: 17, 21, 25. Q3 = 21.", 3),
    poolAnswer("y8-dat-bxp-p15", "From the data above, find the IQR.",
      "21 - 5", "16", "IQR = Q3 - Q1 = 21 - 5 = 16.", 3),
    poolChoice("y8-dat-bxp-p16", "A box plot has the median close to Q1 and a long right whisker. The shape is…", "B",
      ["symmetric", "skewed right", "skewed left", "bimodal"],
      "Median near Q1 with a long right tail indicates a right (positive) skew.", 3),
    {
      ...poolAnswer("y8-dat-bxp-p17", "A box plot: Min = 8, Q1 = 12, Median = 16, Q3 = 22, Max = 30. Find IQR.",
        "22 - 12", "10", "IQR = 22 - 12 = 10.", 3),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 8, a box from 12 to 22, a median line at 16 and the right whisker at 30.",
        plots: [{ label: "Dataset", min: 8, q1: 12, median: 16, q3: 22, max: 30 }],
        showValueLabels: true,
      },
    },
    {
      ...poolAnswer("y8-dat-bxp-p18", "Same box plot. Find the range minus the IQR.",
        "(30 - 8) - (22 - 12)", "12", "Range = 22, IQR = 10. Difference = 22 - 10 = 12.", 3),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 8, a box from 12 to 22, a median line at 16 and the right whisker at 30.",
        plots: [{ label: "Dataset", min: 8, q1: 12, median: 16, q3: 22, max: 30 }],
        showValueLabels: true,
      },
    },
    // Difficulty 4
    poolAnswer("y8-dat-bxp-p19", "Sorted data: 5, 8, 11, 14, 17, 20, 23, 26 (8 values). Find Q1.",
      "\\frac{8 + 11}{2}", "9.5", "Lower half: 5,8,11,14. Q1 = (8 + 11) ÷ 2 = 9.5.", 4),
    poolAnswer("y8-dat-bxp-p20", "Sorted data: 5, 8, 11, 14, 17, 20, 23, 26 (8 values). Find Q3.",
      "\\frac{20 + 23}{2}", "21.5", "Upper half: 17,20,23,26. Q3 = (20 + 23) ÷ 2 = 21.5.", 4),
    poolAnswer("y8-dat-bxp-p21", "From the data above, find the IQR.",
      "21.5 - 9.5", "12", "IQR = 21.5 - 9.5 = 12.", 4),
    poolChoice("y8-dat-bxp-p22", "A box plot has a long LEFT whisker and the median close to Q3. The shape is…", "C",
      ["symmetric", "skewed right", "skewed left", "bimodal"],
      "A long left tail with median near Q3 indicates a left (negative) skew.", 4),
    {
      ...poolAnswer("y8-dat-bxp-p23", "A box plot: Min = 2, Q1 = 6, Median = 10, Q3 = 14, Max = 30. Find the right whisker length minus the left whisker length.",
        "(30 - 14) - (6 - 2)", "12", "Right whisker = 16, left whisker = 4. Difference = 16 - 4 = 12.", 4),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 2, a box from 6 to 14, a median line at 10 and the right whisker at 30.",
        plots: [{ label: "Dataset", min: 2, q1: 6, median: 10, q3: 14, max: 30 }],
        showValueLabels: true,
      },
    },
    poolAnswer("y8-dat-bxp-p24", "A box plot has IQR = 9 and Q1 = 14. Find Q3.",
      "14 + 9", "23", "Q3 = Q1 + IQR = 14 + 9 = 23.", 4),
    // Difficulty 5
    poolAnswer("y8-dat-bxp-p25", "Sorted data: 4, 7, 7, 10, 13, 16, 16, 19, 22, 25 (10 values). Find the IQR.",
      "Q_3 - Q_1", "12", "Lower half: 4,7,7,10,13 → Q1 = 7 (3rd value). Upper half: 16,16,19,22,25 → Q3 = 19 (3rd value). IQR = 19 - 7 = 12.", 5),
    {
      ...poolAnswer("y8-dat-bxp-p26", "A box plot: Min = 10, Q1 = 18, Median = 24, Q3 = 30, Max = 50. A new maximum of 70 replaces 50. By how much does the IQR change?",
        "\\text{IQR depends on Q1 and Q3 only}", "0", "The IQR = Q3 - Q1 = 12 does not depend on the maximum, so changing the max does not change the IQR — change of 0.", 5),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 10, a box from 18 to 30, a median line at 24 and the right whisker at 50.",
        plots: [{ label: "Dataset", min: 10, q1: 18, median: 24, q3: 30, max: 50 }],
        showValueLabels: true,
      },
    },
    poolAnswer("y8-dat-bxp-p27", "A box plot: Q1 = 22, Q3 = 38, Min = 10, Max = 60. Find the range minus the IQR.",
      "(60 - 10) - (38 - 22)", "34", "Range = 50, IQR = 16. Difference = 50 - 16 = 34.", 5),
    poolChoice("y8-dat-bxp-p28", "Two box plots have the same box (same Q1, Q3) but Plot B's box is drawn wider on paper. What does this tell you about the data?", "C",
      ["Plot B has more data values.", "Plot B has a larger IQR.",
       "Nothing — equal Q1 and Q3 mean the same IQR regardless of drawing width.",
       "Plot B is skewed."],
      "Equal Q1 and Q3 mean the same IQR; drawing width on paper does not change the data.", 5),
    poolAnswer("y8-dat-bxp-p29", "Sorted data: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36 (12 values). Find the IQR.",
      "Q_3 - Q_1", "18", "Lower 6: 3,6,9,12,15,18 → Q1 = (9+12)/2 = 10.5. Upper 6: 21,24,27,30,33,36 → Q3 = (27+30)/2 = 28.5. IQR = 28.5 - 10.5 = 18.", 5),
    {
      ...poolAnswer("y8-dat-bxp-p30", "A box plot has Median = 20 exactly in the centre of a box from 14 to 26, with whiskers to Min = 8 and Max = 32 of equal length. Describe the shape in one word.",
        "\\text{equal box halves and equal whiskers}", "symmetric", "The median is central and the whiskers are equal (6 each), so the distribution is symmetric.", 5),
      boxPlotDiagram: {
        description: "A symmetric box plot with the left whisker at 8, a box from 14 to 26, a median line centred at 20 and the right whisker at 32.",
        plots: [{ label: "Dataset", min: 8, q1: 14, median: 20, q3: 26, max: 32 }],
        showValueLabels: true,
      },
    },
  ],
  multiPartPractice: [
    {
      id: "y8-dat-bxp-mp1",
      prompt:
        "The reaction times (in hundredths of a second) of 9 students, already sorted, are: 12, 15, 18, 20, 23, 26, 28, 31, 34.",
      latex: "12,15,18,20,23,26,28,31,34",
      answer: "23",
      hint: "Find the median (Q2), then Q1 and Q3 by splitting the halves, then the IQR.",
      explanation:
        "Q2 = 23 (5th value). Lower half (12,15,18,20) → Q1 = (15+18)/2 = 16.5. Upper half (26,28,31,34) → Q3 = (28+31)/2 = 29.5. IQR = 29.5 - 16.5 = 13.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the median (Q2)?",
          marks: 1,
          answer: "23",
          acceptedAnswers: [],
          hint: "The 5th value of 9.",
          explanation: "Q2 = 23.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is Q1?",
          marks: 1,
          answer: "16.5",
          acceptedAnswers: [],
          hint: "Median of the lower half 12, 15, 18, 20 (excluding Q2).",
          explanation: "Lower half: 12,15,18,20. Q1 = (15 + 18) ÷ 2 = 16.5.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the IQR?",
          marks: 1,
          answer: "13",
          acceptedAnswers: [],
          hint: "IQR = Q3 - Q1, where Q3 = 29.5.",
          explanation: "Q3 = 29.5, Q1 = 16.5. IQR = 29.5 - 16.5 = 13.",
        },
      ],
    },
  ],
};

// ── Lesson 13: Comparing Data with Box Plots ──────────────────────────────────

const comparingDataWithBoxPlots: LessonContent = {
  description:
    "Draw and interpret side-by-side box plots, compare medians, IQRs and shape between two data sets, and write conclusions using statistical language.",
  learningIntention:
    "Compare two data sets using side-by-side box plots by analysing differences in centre, spread and shape.",
  successCriteria: [
    "Read the median and IQR from each box plot in a side-by-side display.",
    "Identify which data set has a higher centre (median) or greater spread (IQR and range).",
    "Describe the shape of each box plot (symmetric, skewed right, skewed left).",
    "Write a comparative statement that refers to centre, spread, and context.",
  ],
  teaching: {
    paragraphs: [
      "Drawing two box plots on the same number line — side-by-side box plots — turns a comparison into a glance. Each plot still carries its own five-number summary (minimum, $Q_1$, median, $Q_3$, maximum), but because they share one axis, their positions and widths line up directly, so you can read off which group is higher and which is more spread out without doing any arithmetic.",
      "Comparing centre is the first job: look at the two median lines. The group whose median line sits further to the right has the higher typical value. This works precisely because both plots use the same scale — a position further right genuinely means a larger value, not just a longer-looking box.",
      "Comparing spread is the second job, and box plots give you two readings of it. The box width is the IQR, the spread of the middle 50%; the whisker-to-whisker span is the full range. A wider box or longer whiskers means more variability in that group. Prefer the IQR when comparing consistency, because — as with quartiles — it ignores the extreme values and so is not thrown off by a single unusual data point in either group.",
      "Shape comes from where the median sits inside the box and how the whiskers compare. Median near the centre with roughly equal whiskers is symmetric. Median close to $Q_1$ with a long right whisker is skewed right — most values low, a few high. Median close to $Q_3$ with a long left whisker is skewed left — most values high, a few low. The long tail always points the way the data is skewed.",
      "The misconception to dissolve: a larger IQR does not mean a group is 'better'. It only means more spread, more variability. Higher or lower performance is about the median, not the box width — keep the two ideas separate. And finish every comparison in context, because that is where the marks are: 'Class A has a higher median mark, so it scored higher on average, but its larger IQR shows its results were more variable.' Numbers alone do not answer a comparison question; the interpreting sentence does.",
    ],
    latexBlocks: [
      "\\text{compare centre: which median line is further right?}",
      "\\text{compare spread: which IQR (box width) or range is larger?}",
      "\\text{skewed right: median near } Q_1,\\; \\text{long right whisker; skewed left: median near } Q_3",
      "\\text{larger IQR} \\Rightarrow \\text{more variable, NOT better}",
    ],
  },
  workedExamples: [
    {
      title: "Compare medians and IQRs",
      questionLatex:
        "\\text{Group A: Min=10, } Q_1=15,\\text{ Med}=22,\\; Q_3=28,\\text{ Max}=35.\\quad \\text{Group B: Min=8, }Q_1=18,\\text{ Med}=26,\\; Q_3=30,\\text{ Max}=34.",
      steps: [
        {
          explanation: "Compare medians.",
          latex: "\\text{Median A}=22,\\quad \\text{Median B}=26 \\Rightarrow \\text{Group B has a higher centre.}",
        },
        {
          explanation: "Compare IQRs (box widths).",
          latex: "\\text{IQR A}=28-15=13,\\quad \\text{IQR B}=30-18=12 \\Rightarrow \\text{Group A is slightly more spread.}",
        },
        {
          explanation: "Write a comparative conclusion.",
          latex: "\\text{Group B has a higher typical value; the spreads are similar.}",
        },
      ],
      finalAnswerLatex:
        "\\text{Group B: higher median (26 vs 22); similar spread (IQR 12 vs 13).}",
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 10, Q1 15, median 22, Q3 28, max 35. Group B: min 8, Q1 18, median 26, Q3 30, max 34.",
        plots: [
          { label: "Group A", min: 10, q1: 15, median: 22, q3: 28, max: 35 },
          { label: "Group B", min: 8, q1: 18, median: 26, q3: 30, max: 34 },
        ],
        showValueLabels: true,
      },
    } as WorkedExample,
    {
      title: "Describe shape from a side-by-side display",
      questionLatex:
        "\\text{Class X: Min=40, }Q_1=55,\\text{ Med}=57,\\; Q_3=70,\\text{ Max}=90.\\quad \\text{Class Y: Min=40, }Q_1=52,\\text{ Med}=68,\\; Q_3=72,\\text{ Max}=80.",
      steps: [
        {
          explanation: "Check Class X: median (57) is close to Q1 (55); right whisker 90−70=20, left whisker 55−40=15. Slightly right-skewed.",
          latex: "\\text{Class X: median near } Q_1 \\Rightarrow \\text{right-skewed}",
        },
        {
          explanation: "Check Class Y: median (68) close to Q3 (72); left whisker 52−40=12, right whisker 80−72=8. Slightly left-skewed.",
          latex: "\\text{Class Y: median near } Q_3 \\Rightarrow \\text{left-skewed}",
        },
      ],
      finalAnswerLatex:
        "\\text{Class X is right-skewed; Class Y is left-skewed.}",
      boxPlotDiagram: {
        description: "Side-by-side box plots. Class X: min 40, Q1 55, median 57, Q3 70, max 90 (right-skewed). Class Y: min 40, Q1 52, median 68, Q3 72, max 80 (left-skewed).",
        plots: [
          { label: "Class X", min: 40, q1: 55, median: 57, q3: 70, max: 90 },
          { label: "Class Y", min: 40, q1: 52, median: 68, q3: 72, max: 80 },
        ],
        showValueLabels: true,
      },
    } as WorkedExample,
    {
      title: "Write a complete comparison",
      questionLatex:
        "\\text{Compare two groups using their box plots. Group P: Med}=30,\\text{ IQR}=8.\\quad \\text{Group Q: Med}=22,\\text{ IQR}=14.",
      steps: [
        {
          explanation: "State which group has the higher centre.",
          latex: "\\text{Group P has a higher median (30 vs 22).}",
        },
        {
          explanation: "State which group has greater spread.",
          latex: "\\text{Group Q has a larger IQR (14 vs 8) — more variability.}",
        },
        {
          explanation: "Link to context.",
          latex: "\\text{Group P typically scores higher; Group Q is less consistent.}",
        },
      ],
      finalAnswerLatex:
        "\\text{Group P: higher median. Group Q: greater spread. Group P performs better and more consistently.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-cmpbxp-g1",
      "Two box plots are drawn on the same axis. Which feature tells you which group has the higher typical value?",
      "B",
      [
        "The length of the left whisker",
        "The position of the median line in each box",
        "The total width of the number line",
        "The height of each box",
      ],
      "The median line inside each box shows the typical value (centre) for that group. The group with the median line further to the right has the higher typical value."
    ),
    answer(
      "y8-dat-cmpbxp-g2",
      "Group A box plot: Q1 = 12, Q3 = 24. Group B box plot: Q1 = 10, Q3 = 28. Which group has the larger IQR?",
      "\\text{IQR A}=24-12,\\quad \\text{IQR B}=28-10",
      "Group B",
      "IQR A = 24 − 12 = 12. IQR B = 28 − 10 = 18. Group B has the larger IQR (18 > 12), so it has more variability.",
      ["B", "group b"]
    ),
    answer(
      "y8-dat-cmpbxp-g3",
      "Group A has median = 18. Group B has median = 25. Which group has the higher typical value?",
      "\\text{Compare: } 18 \\text{ vs } 25",
      "Group B",
      "The median represents the typical value. Group B's median (25) is higher than Group A's (18), so Group B has the higher typical value.",
      ["B", "group b"]
    ),
    choice(
      "y8-dat-cmpbxp-g4",
      "A box plot for Class A has the median very close to Q3, and a long left whisker. How would you describe its shape?",
      "C",
      [
        "Symmetric",
        "Skewed right",
        "Skewed left",
        "Cannot be determined",
      ],
      "When the median sits close to Q3 (the top of the box) and the left whisker is long, the data has a long tail stretching to the left — this is a left (negative) skew."
    ),
  ],
  independentPractice: [
    answer(
      "y8-dat-cmpbxp-i1",
      "Group X: Q1 = 14, Q3 = 26. Group Y: Q1 = 10, Q3 = 20. Find the IQR of each group.",
      "\\text{IQR X}=26-14,\\quad \\text{IQR Y}=20-10",
      "IQR X = 12, IQR Y = 10",
      "IQR X = 26 − 14 = 12. IQR Y = 20 − 10 = 10.",
      ["X=12 Y=10", "12 and 10"]
    ),
    answer(
      "y8-dat-cmpbxp-i2",
      "Group X: Min = 5, Max = 35. Group Y: Min = 8, Max = 28. Which group has the larger range?",
      "\\text{Range X}=35-5,\\quad \\text{Range Y}=28-8",
      "Group X",
      "Range X = 35 − 5 = 30. Range Y = 28 − 8 = 20. Group X has the larger range (30 > 20).",
      ["X", "group x"]
    ),
    answer(
      "y8-dat-cmpbxp-i3",
      "Group X has median = 20. Group Y has median = 20. Group X has IQR = 12 and Group Y has IQR = 6. Which group is more consistent?",
      "\\text{Smaller IQR} \\Rightarrow \\text{more consistent}",
      "Group Y",
      "Both groups have the same typical value (median = 20). Group Y's IQR (6) is smaller than Group X's (12), so Group Y's central values are clustered more tightly — it is more consistent.",
      ["Y", "group y"]
    ),
    choice(
      "y8-dat-cmpbxp-i4",
      "Side-by-side box plots show Group P with median 35 and Group Q with median 28. Both have IQR = 10. Which statement is best?",
      "A",
      [
        "Group P has a higher typical value; both groups have similar spread.",
        "Group Q has a higher typical value; Group P is more spread out.",
        "Both groups have the same typical value and the same spread.",
        "Group P is more variable because its median is higher.",
      ],
      "Group P's median (35) is higher, so it has the higher typical value. Equal IQRs mean similar spread. A higher median does not mean more variability."
    ),
    {
      ...answer(
        "y8-dat-cmpbxp-i5",
        "Group A: Min=4, Q1=10, Median=18, Q3=22, Max=28. Group B: Min=4, Q1=8, Median=12, Q3=24, Max=28. Which group has the larger IQR?",
        "\\text{IQR A}=22-10,\\quad \\text{IQR B}=24-8",
        "Group B",
        "IQR A = 22 − 10 = 12. IQR B = 24 − 8 = 16. Group B has the larger IQR (16 > 12).",
        ["B", "group b"]
      ),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 4, Q1 10, median 18, Q3 22, max 28. Group B: min 4, Q1 8, median 12, Q3 24, max 28.",
        plots: [
          { label: "Group A", min: 4, q1: 10, median: 18, q3: 22, max: 28 },
          { label: "Group B", min: 4, q1: 8, median: 12, q3: 24, max: 28 },
        ],
        showValueLabels: true,
      },
    },
  ],
  commonMistakes: [
    {
      mistake: "Saying a group with a larger IQR performs better.",
      fix: "A larger IQR means more spread (variability), not better performance. Compare medians to judge which group has a higher typical value.",
    },
    {
      mistake: "Confusing the box width with the number of data values in that section.",
      fix: "Each quarter of a box plot contains the same number of data values (approximately 25%). A wider section means those values are more spread out, not more numerous.",
    },
    {
      mistake: "Writing a comparison without linking statistics to the context.",
      fix: "Always name the context in your conclusion. Instead of 'Group A has a higher median', write 'Class A has a higher median mark, suggesting it performed better on the test on average'.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-dat-cmpbxp-m1",
      "Group A: median = 40. Group B: median = 55. Which statement is correct?",
      "B",
      [
        "Group A has a higher typical value.",
        "Group B has a higher typical value.",
        "Both groups have the same typical value.",
        "The median cannot be compared between groups.",
      ],
      "Median represents the typical value. Group B's median (55) is higher than Group A's (40), so Group B has the higher typical value."
    ),
    choice(
      "y8-dat-cmpbxp-m2",
      "Group P: IQR = 6. Group Q: IQR = 18. Same median. Which statement is correct?",
      "A",
      [
        "Group P is more consistent because it has a smaller IQR.",
        "Group Q is more consistent because it has a larger IQR.",
        "Both groups have the same consistency because their medians are equal.",
        "Group Q performs better because its spread is larger.",
      ],
      "A smaller IQR means the central values are more tightly clustered. Group P's IQR of 6 indicates more consistent data than Group Q's IQR of 18."
    ),
    answer(
      "y8-dat-cmpbxp-m3",
      "Group A: Q1 = 15, Q3 = 35. Group B: Q1 = 20, Q3 = 32. Find the IQR for each group.",
      "\\text{IQR A}=35-15,\\quad \\text{IQR B}=32-20",
      "IQR A = 20, IQR B = 12",
      "IQR A = 35 − 15 = 20. IQR B = 32 − 20 = 12.",
      ["A=20 B=12", "20 and 12"]
    ),
    answer(
      "y8-dat-cmpbxp-m4",
      "Group A: Min = 5, Max = 45. Group B: Min = 10, Max = 40. Find the range of each group.",
      "\\text{Range A}=45-5,\\quad \\text{Range B}=40-10",
      "Range A = 40, Range B = 30",
      "Range A = 45 − 5 = 40. Range B = 40 − 10 = 30.",
      ["A=40 B=30", "40 and 30"]
    ),
    answer(
      "y8-dat-cmpbxp-m5",
      "Two groups both have IQR = 10. Group X has median = 30 and Group Y has median = 45. Which group has a higher typical value and by how much?",
      "45 - 30",
      "Group Y by 15",
      "Group Y's median (45) is higher than Group X's (30). The difference is 45 − 30 = 15.",
      ["Y by 15", "group y, 15"]
    ),
    answer(
      "y8-dat-cmpbxp-m6",
      "Group A box plot: Q1 = 10, Median = 18, Q3 = 22. Is Group A's distribution symmetric, skewed left, or skewed right? The left half of the box = Median − Q1 and the right half = Q3 − Median.",
      "\\text{Left half: }18-10=8,\\quad \\text{Right half: }22-18=4",
      "Skewed left",
      "The left half of the box (8) is larger than the right half (4). The median sits closer to Q3, meaning more data is compressed toward the upper end. The distribution is skewed left.",
      ["left", "left-skewed", "negatively skewed"]
    ),
    answer(
      "y8-dat-cmpbxp-m7",
      "Group B box plot: Q1 = 14, Median = 16, Q3 = 24. The left half of the box = Median − Q1 and the right half = Q3 − Median. Is Group B symmetric, skewed left, or skewed right?",
      "\\text{Left half: }16-14=2,\\quad \\text{Right half: }24-16=8",
      "Skewed right",
      "The right half of the box (8) is much larger than the left half (2). The median sits very close to Q1, indicating more data bunched at lower values with a long right tail. The distribution is skewed right.",
      ["right", "right-skewed", "positively skewed"]
    ),
    answer(
      "y8-dat-cmpbxp-m8",
      "Group A: median = 50, IQR = 20. Group B: median = 38, IQR = 20. By how much is Group A's median higher than Group B's?",
      "50 - 38",
      "12",
      "The difference in medians = 50 − 38 = 12. Group A's typical value is 12 units higher."
    ),
    {
      ...answer(
        "y8-dat-cmpbxp-m9",
        "Group A: Min = 10, Q1 = 20, Median = 30, Q3 = 45, Max = 50. Group B: Min = 10, Q1 = 15, Median = 20, Q3 = 35, Max = 50. Which group has the larger IQR?",
        "\\text{IQR A}=45-20,\\quad \\text{IQR B}=35-15",
        "Group A",
        "IQR A = 45 − 20 = 25. IQR B = 35 − 15 = 20. Group A has the larger IQR.",
        ["Group A", "A", "group a"]
      ),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 10, Q1 20, median 30, Q3 45, max 50. Group B: min 10, Q1 15, median 20, Q3 35, max 50.",
        plots: [
          { label: "Group A", min: 10, q1: 20, median: 30, q3: 45, max: 50 },
          { label: "Group B", min: 10, q1: 15, median: 20, q3: 35, max: 50 },
        ],
        showValueLabels: true,
      },
    },
    {
      ...answer(
        "y8-dat-cmpbxp-m10",
        "Group A: Min = 10, Q1 = 20, Median = 30, Q3 = 40, Max = 50. Group B: Min = 10, Q1 = 15, Median = 20, Q3 = 35, Max = 50. Which group has the higher median and by how much?",
        "30 - 20",
        "Group A by 10",
        "Median A = 30, Median B = 20. Group A's median is higher by 30 − 20 = 10.",
        ["A by 10", "group a, 10"]
      ),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 10, Q1 20, median 30, Q3 40, max 50. Group B: min 10, Q1 15, median 20, Q3 35, max 50.",
        plots: [
          { label: "Group A", min: 10, q1: 20, median: 30, q3: 40, max: 50 },
          { label: "Group B", min: 10, q1: 15, median: 20, q3: 35, max: 50 },
        ],
        showValueLabels: true,
      },
    },
  ],
  masteryQuizPool: [
    // Difficulty 1
    poolAnswer("y8-dat-cmpbxp-p1", "Box plot A has median 18; box plot B has median 12. Which group has the higher typical value? Answer 'A' or 'B'.",
      "18 > 12", "A", "Group A's higher median (18) means a higher typical value.", 1, ["Group A"]),
    poolAnswer("y8-dat-cmpbxp-p2", "Box plot A: box from 10 to 22. Find IQR A.",
      "22 - 10", "12", "IQR = Q3 - Q1 = 22 - 10 = 12.", 1),
    poolChoice("y8-dat-cmpbxp-p3", "When comparing two box plots, a smaller IQR shows…", "A",
      ["more consistent middle values", "a higher median", "a larger range", "more data"],
      "A smaller IQR means the middle 50% is more tightly clustered — more consistent.", 1),
    poolAnswer("y8-dat-cmpbxp-p4", "Box plot B: Min = 5, Max = 29. Find the range of B.",
      "29 - 5", "24", "Range = 29 - 5 = 24.", 1),
    poolChoice("y8-dat-cmpbxp-p5", "Side-by-side box plots are most useful for…", "B",
      ["measuring one value", "comparing centre and spread of two data sets",
       "drawing a pie chart", "finding the mode"],
      "Side-by-side box plots compare the centre and spread of two data sets.", 1),
    poolAnswer("y8-dat-cmpbxp-p6", "Group A median = 25, Group B median = 25. Find the difference in their medians.",
      "25 - 25", "0", "Both medians are 25, so the difference is 0.", 1),
    // Difficulty 2
    poolAnswer("y8-dat-cmpbxp-p7", "Group A: Q1 = 12, Q3 = 28. Group B: Q1 = 16, Q3 = 24. Find IQR A minus IQR B.",
      "(28 - 12) - (24 - 16)", "8", "IQR A = 16, IQR B = 8. Difference = 8.", 2),
    poolChoice("y8-dat-cmpbxp-p8", "Group A IQR = 6, Group B IQR = 18, same median. Which is more consistent?", "A",
      ["Group A", "Group B", "Both equal", "Cannot tell"], "Smaller IQR (Group A) means more consistent middle values.", 2),
    poolAnswer("y8-dat-cmpbxp-p9", "Group A: Min 4, Max 30. Group B: Min 8, Max 26. Find range A minus range B.",
      "(30 - 4) - (26 - 8)", "8", "Range A = 26, range B = 18. Difference = 8.", 2),
    poolAnswer("y8-dat-cmpbxp-p10", "Group A median = 40, Group B median = 28. By how much is A's median higher?",
      "40 - 28", "12", "40 - 28 = 12.", 2),
    poolChoice("y8-dat-cmpbxp-p11", "Box plot A's median sits centrally with equal whiskers; this shape is…", "A",
      ["symmetric", "skewed right", "skewed left", "bimodal"], "Central median and equal whiskers indicate symmetry.", 2),
    poolAnswer("y8-dat-cmpbxp-p12", "Group A: Q1 = 20, Q3 = 35. Find IQR A.",
      "35 - 20", "15", "IQR = 35 - 20 = 15.", 2),
    // Difficulty 3
    {
      ...poolAnswer("y8-dat-cmpbxp-p13", "Group A: Min 5, Q1 12, Med 18, Q3 26, Max 40. Group B: Min 5, Q1 14, Med 18, Q3 22, Max 40. Both have the same median; find IQR A minus IQR B.",
        "(26 - 12) - (22 - 14)", "6", "IQR A = 14, IQR B = 8. Difference = 6.", 3),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 5, Q1 12, median 18, Q3 26, max 40. Group B: min 5, Q1 14, median 18, Q3 22, max 40.",
        plots: [
          { label: "Group A", min: 5, q1: 12, median: 18, q3: 26, max: 40 },
          { label: "Group B", min: 5, q1: 14, median: 18, q3: 22, max: 40 },
        ],
        showValueLabels: true,
      },
    },
    poolChoice("y8-dat-cmpbxp-p14", "Two box plots share a median of 30. Group A IQR = 20, Group B IQR = 8. Which statement is correct?", "C",
      ["Group A is more consistent.", "Group B has a higher centre.",
       "Same centre, but Group B's middle values are more tightly clustered.",
       "Group A has a lower median."],
      "Same median; Group B's smaller IQR means tighter central clustering.", 3),
    poolAnswer("y8-dat-cmpbxp-p15", "Group A range = 45, Group B range = 30. By how much is A more spread out (by range)?",
      "45 - 30", "15", "45 - 30 = 15.", 3),
    poolAnswer("y8-dat-cmpbxp-p16", "Group A: median 60. Group B: median 72. A student says Group A performed better. Find how much higher B's median actually is.",
      "72 - 60", "12", "Group B's median is higher by 72 - 60 = 12; the student was wrong.", 3),
    poolChoice("y8-dat-cmpbxp-p17", "A box plot has a long right whisker and median near Q1. Compared with a symmetric plot of the same median, it is…", "B",
      ["more symmetric", "skewed right", "skewed left", "identical"],
      "A long right tail with median near Q1 indicates a right skew.", 3),
    poolAnswer("y8-dat-cmpbxp-p18", "Group A: Q1 18, Q3 30. Group B: Q1 22, Q3 38. Find IQR B minus IQR A.",
      "(38 - 22) - (30 - 18)", "4", "IQR B = 16, IQR A = 12. Difference = 4.", 3),
    // Difficulty 4
    {
      ...poolAnswer("y8-dat-cmpbxp-p19", "Group A: Min 10, Q1 18, Med 24, Q3 30, Max 50. Group B: Min 10, Q1 20, Med 28, Q3 34, Max 40. Find median B minus median A.",
        "28 - 24", "4", "Median B = 28, median A = 24. Difference = 4.", 4),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 10, Q1 18, median 24, Q3 30, max 50. Group B: min 10, Q1 20, median 28, Q3 34, max 40.",
        plots: [
          { label: "Group A", min: 10, q1: 18, median: 24, q3: 30, max: 50 },
          { label: "Group B", min: 10, q1: 20, median: 28, q3: 34, max: 40 },
        ],
        showValueLabels: true,
      },
    },
    {
      ...poolAnswer("y8-dat-cmpbxp-p20", "For the groups above, find IQR A minus IQR B.",
        "(30 - 18) - (34 - 20)", "-2", "IQR A = 12, IQR B = 14. Difference = 12 - 14 = -2.", 4),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 10, Q1 18, median 24, Q3 30, max 50. Group B: min 10, Q1 20, median 28, Q3 34, max 40.",
        plots: [
          { label: "Group A", min: 10, q1: 18, median: 24, q3: 30, max: 50 },
          { label: "Group B", min: 10, q1: 20, median: 28, q3: 34, max: 40 },
        ],
        showValueLabels: true,
      },
    },
    poolChoice("y8-dat-cmpbxp-p21", "Group A: median 50, IQR 8, range 20. Group B: median 50, IQR 8, range 48 (one far outlier). Which is the fairer way to compare consistency?", "B",
      ["Range, because it uses all values.", "IQR, because it is not distorted by the single outlier.",
       "The median, because it is the centre.", "Neither can compare them."],
      "The IQR is resistant to the outlier inflating Group B's range, so it gives the fairer consistency comparison.", 4),
    poolAnswer("y8-dat-cmpbxp-p22", "Group A: Min 6, Max 46. Group B: Min 12, Max 40. Find range A minus range B.",
      "(46 - 6) - (40 - 12)", "12", "Range A = 40, range B = 28. Difference = 12.", 4),
    poolAnswer("y8-dat-cmpbxp-p23", "Group A median 35, Group B median 35, IQR A = 10, IQR B = 22. By how much larger is B's IQR?",
      "22 - 10", "12", "22 - 10 = 12.", 4),
    poolChoice("y8-dat-cmpbxp-p24", "Two classes sit a test. Class X: median 70, IQR 6. Class Y: median 64, IQR 18. The best one-line comparison is…", "A",
      ["Class X typically scored higher (median 70 vs 64) and more consistently (IQR 6 vs 18).",
       "Class Y did better because its IQR is larger.",
       "The classes are identical.",
       "Class X is less consistent."],
      "Class X has the higher median and smaller IQR, so it scored higher and more consistently.", 4),
    // Difficulty 5
    {
      ...poolAnswer("y8-dat-cmpbxp-p25", "Group A: Min 20, Q1 30, Med 40, Q3 55, Max 80. Group B: Min 20, Q1 35, Med 40, Q3 48, Max 60. Both share median 40. Find IQR A minus IQR B.",
        "(55 - 30) - (48 - 35)", "12", "IQR A = 25, IQR B = 13. Difference = 12.", 5),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 20, Q1 30, median 40, Q3 55, max 80. Group B: min 20, Q1 35, median 40, Q3 48, max 60.",
        plots: [
          { label: "Group A", min: 20, q1: 30, median: 40, q3: 55, max: 80 },
          { label: "Group B", min: 20, q1: 35, median: 40, q3: 48, max: 60 },
        ],
        showValueLabels: true,
      },
    },
    {
      ...poolAnswer("y8-dat-cmpbxp-p26", "For the groups above, find range A minus range B.",
        "(80 - 20) - (60 - 20)", "20", "Range A = 60, range B = 40. Difference = 20.", 5),
      boxPlotDiagram: {
        description: "Side-by-side box plots. Group A: min 20, Q1 30, median 40, Q3 55, max 80. Group B: min 20, Q1 35, median 40, Q3 48, max 60.",
        plots: [
          { label: "Group A", min: 20, q1: 30, median: 40, q3: 55, max: 80 },
          { label: "Group B", min: 20, q1: 35, median: 40, q3: 48, max: 60 },
        ],
        showValueLabels: true,
      },
    },
    poolChoice("y8-dat-cmpbxp-p27", "Group A's box plot is skewed right; Group B's is symmetric, with the same median. Which measure of centre best compares their typical values fairly?", "B",
      ["Mean for both.", "Median for both, since it is resistant to skew.",
       "Mean for A, median for B.", "Mode for both."],
      "The median is resistant to skew, so using it for both gives a fair comparison.", 5),
    poolAnswer("y8-dat-cmpbxp-p28", "Group A: median 55, Q1 40, Q3 70. Group B: median 55, Q1 48, Q3 62. Which group's middle 50% spans a wider range, and by how much? (Give the IQR difference.)",
      "(70 - 40) - (62 - 48)", "16", "IQR A = 30, IQR B = 14. Group A is wider by 30 - 14 = 16.", 5),
    {
      ...poolAnswer("y8-dat-cmpbxp-p29", "Group A: Min 5, Q1 12, Med 18, Q3 24, Max 60. The right whisker (Max - Q3) compared with the left whisker (Q1 - Min): find the difference (right minus left).",
        "(60 - 24) - (12 - 5)", "29", "Right whisker = 36, left whisker = 7. Difference = 36 - 7 = 29 — a strong right skew.", 5),
      boxPlotDiagram: {
        description: "A box plot with the left whisker at 5, a box from 12 to 24, a median line at 18 and a long right whisker at 60 — a strong right skew.",
        plots: [{ label: "Group A", min: 5, q1: 12, median: 18, q3: 24, max: 60 }],
        showValueLabels: true,
      },
    },
    poolChoice("y8-dat-cmpbxp-p30", "Two delivery companies' times (minutes) are shown as box plots. A: median 30, IQR 10. B: median 30, IQR 4 but Max far out at 90. Which is the better choice for reliable delivery, and why?", "B",
      ["A, because its range is smaller.",
       "B, because its middle 50% is far more consistent (IQR 4), despite one rare long delivery.",
       "A, because its median is higher.",
       "Neither — the medians are equal."],
      "Both share a median of 30, but B's much smaller IQR (4) means most deliveries are very consistent; the single far maximum is rare.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-cmpbxp-mp1",
      prompt:
        "Two classes sit the same test. Class A box plot: Min 30, Q1 50, Median 60, Q3 72, Max 90. Class B box plot: Min 30, Q1 44, Median 54, Q3 66, Max 90.",
      latex: "A:\\ 30,50,60,72,90\\quad B:\\ 30,44,54,66,90",
      answer: "6",
      hint: "Read the median and quartiles from each summary; compute the IQRs and compare medians.",
      explanation:
        "Median A = 60, median B = 54, so A is higher by 6. IQR A = 72 - 50 = 22; IQR B = 66 - 44 = 22 (equal spread). Both share the same range (90 - 30 = 60).",
      boxPlotDiagram: {
        description: "Side-by-side box plots. Class A: min 30, Q1 50, median 60, Q3 72, max 90. Class B: min 30, Q1 44, median 54, Q3 66, max 90.",
        plots: [
          { label: "Class A", min: 30, q1: 50, median: 60, q3: 72, max: 90 },
          { label: "Class B", min: 30, q1: 44, median: 54, q3: 66, max: 90 },
        ],
        showValueLabels: true,
      },
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "By how much is Class A's median higher than Class B's?",
          marks: 1,
          answer: "6",
          acceptedAnswers: [],
          hint: "Median A - Median B.",
          explanation: "60 - 54 = 6.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the IQR of Class A?",
          marks: 1,
          answer: "22",
          acceptedAnswers: [],
          hint: "Q3 - Q1 for Class A.",
          explanation: "IQR A = 72 - 50 = 22.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the IQR of Class B?",
          marks: 1,
          answer: "22",
          acceptedAnswers: [],
          hint: "Q3 - Q1 for Class B.",
          explanation: "IQR B = 66 - 44 = 22.",
        },
      ],
    },
  ],
};

// ── Lesson 14: Shape of Distributions ────────────────────────────────────────

const shapeOfDistributions: LessonContent = {
  description:
    "Describe the shape of a data distribution as symmetric, positively skewed, negatively skewed, or bimodal, and choose the appropriate measure of centre based on shape.",
  learningIntention:
    "Identify the shape of a distribution from dot plots, stem-and-leaf plots, histograms, and box plots, and explain which measure of centre best represents skewed data.",
  successCriteria: [
    "Describe a distribution as symmetric, positively skewed, negatively skewed, or bimodal.",
    "Recognise that a symmetric distribution has mean ≈ median.",
    "Explain that in a positively skewed distribution a few high values pull the mean above the median.",
    "Explain that in a negatively skewed distribution a few low values pull the mean below the median.",
    "Identify bimodal distributions as having two peaks, suggesting two groups in the data.",
    "Read shape from a box plot by comparing whisker and box lengths on each side.",
    "Choose median for skewed data and mean for symmetric data as the better measure of centre.",
  ],
  teaching: {
    paragraphs: [
      "The shape of a distribution is the overall pattern you see when the data is laid out — does it pile up in the middle, lean to one side, or split into two humps? Shape matters because it decides which measure of centre tells the truth. Many students believe 'average' always means the mean, the sum divided by the count. That is one of the most common misconceptions in statistics. There are really three measures of centre — mean, median, and mode — and the mean is only the best choice when the data is roughly symmetric. When a distribution is skewed, the mean is pulled toward the long tail and away from where most values actually sit, so the median becomes the honest summary.",
      "Here is exactly why a skewed distribution pulls the mean. Remember the mean is the balance point — the spot where the data would balance like weights on a ruler. A long tail is a few values sitting far out to one side. Even though there are only a few of them, their distance from the centre is large, and the balance point must shift toward them to stay level. The median, by contrast, only counts how many values lie on each side, not how far out they are, so the tail barely moves it. That difference in what each measure 'feels' is the whole reason mean and median split apart when data is skewed.",
      "A symmetric distribution has roughly equal tails on both sides. Imagine folding the histogram down the middle — both halves would look about the same. With no long tail to pull it, the balance point sits at the centre, so the mean and median are approximately equal and either can be used. Test scores that cluster around 70 out of 100, with similar numbers of students above and below, form a roughly symmetric distribution.",
      "A positively skewed (right-skewed) distribution has a long tail stretching to the right. Most values are bunched at the low end, but a few very high values drag the mean upward. The mean ends up above the median. Income data in most countries is a classic real-world example: most people earn moderate salaries, but a small number of very high earners pull the mean income well above what a typical person actually earns. Reporting the mean salary can make things sound far better than they are for the majority — the median is the honest choice.",
      "A negatively skewed (left-skewed) distribution has a long tail stretching to the left. Most values are bunched at the high end, but a few very low values drag the mean downward. The mean ends up below the median. Age at retirement is an example: most people retire in their 60s, but some retire very early — pulling the mean retirement age slightly lower. If students score mostly high marks on a test but a few score very low, the mark distribution is negatively skewed.",
      "A bimodal distribution has two clear peaks, which often signals two distinct groups in the data. For example, if a class contains both Year 7 and Year 10 students, a histogram of heights would likely show two peaks — one for each age group. Neither a single mean nor a single median captures the two-group structure, so describing the shape is essential. On a dot plot, bimodal means two clusters of dots separated by a gap.",
    ],
    latexBlocks: [
      "\\text{Symmetric: mean} \\approx \\text{median}",
      "\\text{Positively skewed (right): mean} > \\text{median — long tail to the right}",
      "\\text{Negatively skewed (left): mean} < \\text{median — long tail to the left}",
      "\\text{Box plot: longer whisker/box section on one side} \\Rightarrow \\text{skew in that direction}",
      "\\text{Use median for skewed data; use mean for symmetric data.}",
    ],
  },
  workedExamples: [
    {
      title: "Identify shape from a data set description",
      questionLatex:
        "\\text{Data: } 2,\\;3,\\;4,\\;4,\\;5,\\;5,\\;5,\\;6,\\;6,\\;30.\\text{ Describe the shape and choose the better measure of centre.}",
      steps: [
        {
          explanation: "Most values sit between 2 and 6, but 30 is a very high outlier pulling the tail to the right.",
          latex: "\\text{Long tail to the right} \\Rightarrow \\text{positively skewed}",
        },
        {
          explanation: "Calculate the mean and median to confirm.",
          latex: "\\text{Sum} = 2+3+4+4+5+5+5+6+6+30 = 70,\\quad \\text{Mean} = \\frac{70}{10} = 7",
        },
        {
          explanation: "Sort and find the median (average of 5th and 6th values).",
          latex: "\\text{Sorted: } 2,3,4,4,5,5,5,6,6,30.\\quad \\text{Median} = \\frac{5+5}{2} = 5",
        },
        {
          explanation: "Mean (7) > Median (5), confirming positive skew. The median of 5 better represents the typical value.",
          latex: "\\text{Mean}=7 > \\text{Median}=5 \\Rightarrow \\text{use the median}",
        },
      ],
      finalAnswerLatex: "\\text{Positively skewed; median (5) is the better measure of centre.}",
    } as WorkedExample,
    {
      title: "Read shape from a box plot",
      questionLatex:
        "\\text{Box plot: Min}=10,\\; Q_1=12,\\; \\text{Median}=14,\\; Q_3=22,\\; \\text{Max}=40.\\text{ Describe the shape.}",
      steps: [
        {
          explanation: "Compare the two halves of the box.",
          latex: "\\text{Left half: }14-12=2.\\quad \\text{Right half: }22-14=8.",
        },
        {
          explanation: "Compare the two whiskers.",
          latex: "\\text{Left whisker: }12-10=2.\\quad \\text{Right whisker: }40-22=18.",
        },
        {
          explanation: "The right side is much longer — the data is positively skewed (skewed right).",
          latex: "\\text{Long tail to the right} \\Rightarrow \\text{positively skewed}",
        },
      ],
      finalAnswerLatex: "\\text{The distribution is positively skewed (skewed right).}",
    } as WorkedExample,
    {
      title: "Compare mean and median to determine skew",
      questionLatex:
        "\\text{A data set has mean} = 42 \\text{ and median} = 50.\\text{ State the shape and the better measure of centre.}",
      steps: [
        {
          explanation: "When mean < median, a few very low values are pulling the mean downward.",
          latex: "\\text{Mean}=42 < \\text{Median}=50 \\Rightarrow \\text{negatively skewed}",
        },
        {
          explanation: "For skewed data, the median is the better measure of centre.",
          latex: "\\text{Use the median (50) — it is not distorted by the low outliers.}",
        },
      ],
      finalAnswerLatex: "\\text{Negatively skewed; use the median (50).}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-dat-shp-g1",
      "Which statement best describes a symmetric distribution?",
      "B",
      [
        "It has a long tail to the right and mean > median.",
        "It has roughly equal tails on both sides and mean ≈ median.",
        "It has two peaks with a gap in the middle.",
        "It has a long tail to the left and mean < median.",
      ],
      "A symmetric distribution has roughly equal tails on both sides. Because neither tail is longer, the mean and median are approximately equal."
    ),
    answer(
      "y8-dat-shp-g2",
      "Data set: 5, 6, 6, 7, 7, 7, 8, 8, 20. The value 20 creates a long tail to the right. State whether the distribution is symmetric, positively skewed, or negatively skewed.",
      "\\text{Long tail to the right}",
      "positively skewed",
      "Most values cluster between 5 and 8, but 20 creates a long right tail. This is a positively skewed (right-skewed) distribution.",
      ["positive skew", "right skewed", "skewed right", "right-skewed"]
    ),
    answer(
      "y8-dat-shp-g3",
      "A stem-and-leaf plot shows most leaves on the high stems (7, 8, 9) with a few leaves on the low stem (2). State the shape of the distribution.",
      "\\text{Most values are high; a few very low values pull the tail left.}",
      "negatively skewed",
      "When most values are high and a few very low values stretch the tail to the left, the distribution is negatively skewed (left-skewed).",
      ["negative skew", "left skewed", "skewed left", "left-skewed"]
    ),
    answer(
      "y8-dat-shp-g4",
      "A data set has mean = 55 and median = 70. Explain whether you would use the mean or the median to report the typical value, and why.",
      "\\text{Mean}=55 < \\text{Median}=70",
      "median",
      "Mean < Median indicates negatively skewed data — a few very low values are pulling the mean down. The median (70) sits closer to where most values lie and gives a more honest picture of the typical value.",
      ["the median", "use median"]
    ),
  ],
  independentPractice: [
    choice(
      "y8-dat-shp-i1",
      "A box plot has its median line very close to Q3, and a much longer left whisker than right whisker. How would you describe the shape?",
      "C",
      [
        "Symmetric",
        "Positively skewed",
        "Negatively skewed",
        "Bimodal",
      ],
      "When the median is close to Q3 and the left whisker is long, the data has a long left tail — this is negatively skewed (left-skewed)."
    ),
    answer(
      "y8-dat-shp-i2",
      "Data: 12, 14, 14, 15, 15, 15, 16, 16, 17. Calculate the mean and the median. State the shape of the distribution.",
      "\\text{Mean} = \\frac{12+14+14+15+15+15+16+16+17}{9}",
      "symmetric",
      "Sum = 134. Mean = 134 ÷ 9 ≈ 14.9. Sorted: 12,14,14,15,15,15,16,16,17. Median (5th value) = 15. Mean ≈ median, so the distribution is approximately symmetric.",
      ["approximately symmetric", "roughly symmetric"]
    ),
    answer(
      "y8-dat-shp-i3",
      "Distribution A has mean = 30 and median = 30. Distribution B has mean = 45 and median = 32. For which distribution is the mean a less reliable measure of centre?",
      "\\text{Mean} \\gg \\text{Median in Distribution B}",
      "Distribution B",
      "In Distribution A the mean equals the median — the data is symmetric and the mean is reliable. In Distribution B the mean (45) is much higher than the median (32), suggesting positive skew with high outliers pulling the mean up. The mean is a less reliable measure of centre for Distribution B.",
      ["B", "distribution b"]
    ),
    answer(
      "y8-dat-shp-i4",
      "A histogram shows two peaks: one cluster of values between 20 and 30, and a second cluster between 60 and 70, with very few values in between. What shape is this distribution?",
      "\\text{Two peaks separated by a gap}",
      "bimodal",
      "Two distinct peaks separated by a gap indicate a bimodal distribution. This often means there are two distinct groups within the data."
    ),
    answer(
      "y8-dat-shp-i5",
      "Data: 3, 5, 6, 7, 8, 9, 9, 10, 10, 10. Calculate the mean and the median, then state the shape of the distribution.",
      "\\text{Mean} = \\frac{3+5+6+7+8+9+9+10+10+10}{10}",
      "negatively skewed",
      "Sum = 3+5+6+7+8+9+9+10+10+10 = 77. Mean = 77 ÷ 10 = 7.7. Sorted (already in order): the 5th value is 8 and the 6th is 9, so Median = (8+9) ÷ 2 = 8.5. Mean (7.7) < Median (8.5): the single low value 3 drags the mean below the median, creating a slight long tail to the left. The distribution is negatively skewed.",
      ["negative skew", "slightly negatively skewed", "left skewed"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Assuming 'average' always means the mean and using it regardless of skew.",
      fix: "When data is skewed, the mean is pulled toward the tail and away from most values. Report the median for skewed distributions — it sits closer to where the bulk of the data actually lies.",
    },
    {
      mistake: "Confusing positive skew with negative skew by looking at where the bulk of the data is rather than the tail.",
      fix: "Skew is named after the direction of the long tail, not where the data is bunched. Positively skewed = long tail to the right. Negatively skewed = long tail to the left.",
    },
    {
      mistake: "Reading a box plot with a long right whisker as negatively skewed.",
      fix: "A long right whisker means the data stretches further to the right — that is positively skewed. A long left whisker indicates negative skew.",
    },
    {
      mistake: "Treating a bimodal distribution as symmetric because the two peaks are at similar heights.",
      fix: "Bimodal means two distinct peaks, not symmetric. A symmetric distribution has one central peak. Bimodal data often reflects two separate groups and requires separate analysis.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-dat-shp-m1",
      "A dot plot shows values clustered in two separate groups: one around 10 and another around 50, with no values between 20 and 40. What shape is this distribution?",
      "D",
      [
        "Symmetric",
        "Positively skewed",
        "Negatively skewed",
        "Bimodal",
      ],
      "Two distinct clusters separated by a gap describe a bimodal distribution — it has two peaks rather than one."
    ),
    choice(
      "y8-dat-shp-m2",
      "Annual salaries at a company are: most employees earn between $50 000 and $80 000, but the CEO earns $2 000 000. Which measure should be reported as the 'typical' salary?",
      "B",
      [
        "The mean — it uses every salary.",
        "The median — it is not pulled upward by the CEO's salary.",
        "The mode — it appears most often.",
        "The range — it shows the full spread.",
      ],
      "The CEO's salary is a high outlier that pulls the mean well above what most employees earn. The median sits in the middle of the ordered list and is not distorted by that extreme value — it gives a truer picture of what a typical employee earns."
    ),
    answer(
      "y8-dat-shp-m3",
      "Data: 1, 2, 3, 4, 5, 6, 7, 8, 9 (9 values). Find the mean and the median. State whether the distribution is symmetric, positively skewed, or negatively skewed.",
      "\\text{Mean} = \\frac{1+2+3+4+5+6+7+8+9}{9} = \\frac{45}{9} = 5",
      "symmetric",
      "Mean = 45 ÷ 9 = 5. Median = 5th value = 5. Mean = Median = 5, so the distribution is symmetric.",
      ["approximately symmetric", "roughly symmetric"]
    ),
    answer(
      "y8-dat-shp-m4",
      "Box plot: Min = 10, Q1 = 11, Median = 12, Q3 = 20, Max = 40. State the shape of the distribution.",
      "\\text{Left half of box: }12-11=1.\\quad \\text{Right half: }20-12=8.\\quad \\text{Right whisker: }40-20=20.",
      "positively skewed",
      "The right half of the box (8) is much larger than the left half (1), and the right whisker (20) is much longer than the left whisker (1). The data has a long tail to the right — positively skewed.",
      ["positive skew", "right skewed", "skewed right", "right-skewed"]
    ),
    answer(
      "y8-dat-shp-m5",
      "A data set has mean = 18 and median = 25. State the direction of skew and identify whether the mean or median is the better measure of centre.",
      "\\text{Mean}=18 < \\text{Median}=25",
      "negatively skewed; median",
      "Mean < Median indicates a few very low values are pulling the mean below the median — negative (left) skew. The median (25) is less affected by those low values and better represents the typical value.",
      ["negative skew, median", "left skewed, median", "negatively skewed, use median"]
    ),
    answer(
      "y8-dat-shp-m6",
      "Stem-and-leaf plot: 1 | 2 3, 2 | 1 4 6 8, 3 | 0 2 5 7 9, 4 | 1 3. Describe the shape of the distribution.",
      "\\text{Most values in the 20s and 30s with a short tail on each side}",
      "approximately symmetric",
      "The bulk of the data sits in the 20s and 30s, with similar short tails in the 10s and 40s. The distribution is roughly bell-shaped and approximately symmetric.",
      ["symmetric", "roughly symmetric"]
    ),
    answer(
      "y8-dat-shp-m7",
      "A class of 20 students sits a very easy test. Most students score between 85 and 100, but two students score 30 and 35. Will the mean be above or below the median? What shape is the distribution?",
      "\\text{Two very low scores pull mean downward}",
      "mean below median; negatively skewed",
      "The two low scores (30, 35) drag the mean downward while the median remains among the cluster of high scores. Mean < Median confirms negative (left) skew.",
      ["mean is below median, negatively skewed", "negative skew", "left-skewed"]
    ),
    answer(
      "y8-dat-shp-m8",
      "Data: 50, 52, 54, 55, 55, 56, 57, 58, 59, 100. Calculate the mean and the median. By how much does the mean exceed the median, and what shape is the distribution?",
      "\\text{Sum} = 50+52+54+55+55+56+57+58+59+100 = 596",
      "mean exceeds median by 4.1; positively skewed",
      "Sum = 596. Mean = 596 ÷ 10 = 59.6. Sorted median = average of 5th and 6th values = (55+56) ÷ 2 = 55.5. Mean (59.6) − Median (55.5) = 4.1. The high outlier 100 pulls the mean above the median — positively skewed.",
      ["positively skewed", "right skewed", "mean > median, positive skew"]
    ),
    answer(
      "y8-dat-shp-m9",
      "Box plot A: Min=5, Q1=6, Median=7, Q3=14, Max=30. Box plot B: Min=5, Q1=18, Median=24, Q3=26, Max=30. Which box plot shows negative skew?",
      "\\text{Box plot B: median closer to Q3, longer left whisker}",
      "Box plot B",
      "Box plot B has the median (24) sitting close to Q3 (26) and a much longer left section (Q1=18 to Min=5 spans 13 units) versus the right whisker (30−26=4 units). This indicates a long left tail — negative skew. Box plot A has the median close to Q1 and a long right tail — positive skew.",
      ["B", "plot B", "box plot b"]
    ),
    answer(
      "y8-dat-shp-m10",
      "A survey records the number of hours per week students spend on social media. The results are: mean = 14 hours, median = 9 hours. A student argues that the typical student uses social media for 14 hours per week. Explain the error and state the correct typical value to report.",
      "\\text{Mean}=14 > \\text{Median}=9 \\Rightarrow \\text{positively skewed}",
      "The median (9 hours) is the correct typical value",
      "Mean (14) > Median (9) indicates a positively skewed distribution — a few students who spend very many hours online are pulling the mean upward. The median of 9 hours better represents the typical student because it sits in the middle of the ordered data and is not distorted by those extreme values.",
      ["median is 9", "use the median (9)", "median 9 hours"]
    ),
  ],
  masteryQuizPool: [
    // Difficulty 1
    poolChoice("y8-dat-shp-p1", "A distribution with roughly equal tails on both sides is…", "A",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "Equal tails on both sides means the distribution is symmetric.", 1),
    poolChoice("y8-dat-shp-p2", "In a symmetric distribution, the mean is approximately equal to the…", "B",
      ["range", "median", "maximum", "IQR"], "In a symmetric distribution, mean ≈ median.", 1),
    poolChoice("y8-dat-shp-p3", "A distribution with two clear peaks is called…", "D",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "Two peaks indicate a bimodal distribution.", 1),
    poolChoice("y8-dat-shp-p4", "A long tail stretching to the right indicates a distribution that is…", "B",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "A long right tail means positively (right) skewed.", 1),
    poolChoice("y8-dat-shp-p5", "For skewed data, the better measure of centre is the…", "C",
      ["mean", "mode", "median", "range"], "The median is the better measure of centre for skewed data.", 1),
    poolChoice("y8-dat-shp-p6", "A long tail stretching to the left indicates a distribution that is…", "C",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "A long left tail means negatively (left) skewed.", 1),
    // Difficulty 2
    poolChoice("y8-dat-shp-p7", "In a positively skewed distribution, how do the mean and median compare?", "A",
      ["mean > median", "mean < median", "mean = median", "they are unrelated"],
      "A few high values pull the mean above the median.", 2),
    poolChoice("y8-dat-shp-p8", "In a negatively skewed distribution, how do the mean and median compare?", "B",
      ["mean > median", "mean < median", "mean = median", "they are unrelated"],
      "A few low values pull the mean below the median.", 2),
    poolChoice("y8-dat-shp-p9", "Data: 2, 3, 4, 4, 5, 5, 5, 6, 30. The shape is most likely…", "A",
      ["positively skewed", "negatively skewed", "symmetric", "bimodal"],
      "The value 30 forms a long right tail, so the data is positively skewed.", 2),
    poolChoice("y8-dat-shp-p10", "A box plot with a long left whisker and the median near Q3 is…", "C",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "Long left whisker and median near Q3 indicate left (negative) skew.", 2),
    poolAnswer("y8-dat-shp-p11", "Data: 4, 4, 5, 6, 6 has mean 5 and median 5. State the shape in one word.",
      "\\text{mean} \\approx \\text{median}", "symmetric", "Mean = median = 5, so the distribution is symmetric.", 2),
    poolChoice("y8-dat-shp-p12", "Heights of a group containing both 8-year-olds and 16-year-olds would most likely be…", "D",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "Two distinct age groups create two peaks — bimodal.", 2),
    // Difficulty 3
    poolAnswer("y8-dat-shp-p13", "Data: 1, 2, 2, 3, 3, 3, 4, 4, 20. Find the mean (round to 2 decimal places).",
      "\\frac{1+2+2+3+3+3+4+4+20}{9}", "4.67", "Sum = 42. Mean = 42 ÷ 9 = 4.666... ≈ 4.67.", 3, ["4.666", "4.67"]),
    poolAnswer("y8-dat-shp-p14", "For that data (sorted, 9 values), find the median.",
      "\\text{5th value}", "3", "9 values → median is the 5th: 3.", 3),
    poolChoice("y8-dat-shp-p15", "From the data above (mean ≈ 4.67, median 3), the shape is…", "A",
      ["positively skewed", "negatively skewed", "symmetric", "bimodal"],
      "Mean (4.67) > median (3), so the distribution is positively skewed.", 3),
    poolChoice("y8-dat-shp-p16", "Most students score high on an easy test, but a few score very low. The mark distribution is…", "C",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "A few very low scores form a left tail — negatively skewed.", 3),
    poolChoice("y8-dat-shp-p17", "Income data where most earn modest wages but a few earn very high amounts is…", "B",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "A few very high incomes form a right tail — positively skewed.", 3),
    poolChoice("y8-dat-shp-p18", "Which measure should report 'typical income' for the skewed income data above?", "B",
      ["mean", "median", "maximum", "range"], "The median is not distorted by the high earners, so it is the better 'typical' value.", 3),
    // Difficulty 4
    poolAnswer("y8-dat-shp-p19", "Data: 5, 6, 6, 7, 7, 7, 8, 8, 9 is symmetric. Find the mean.",
      "\\frac{5+6+6+7+7+7+8+8+9}{9}", "7", "Sum = 63. Mean = 63 ÷ 9 = 7 (equals the median, confirming symmetry).", 4),
    poolChoice("y8-dat-shp-p20", "A box plot: Min 10, Q1 12, Median 14, Q3 22, Max 40. The shape is…", "B",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "Median near Q1 (left half of box small) with a long right whisker → positively skewed.", 4),
    poolAnswer("y8-dat-shp-p21", "Data: 10, 12, 12, 13, 40 has median 12. Find the mean.",
      "\\frac{10+12+12+13+40}{5}", "17.4", "Sum = 87. Mean = 87 ÷ 5 = 17.4.", 4),
    poolChoice("y8-dat-shp-p22", "For the data above (mean 17.4, median 12), which is the better measure of the typical value and why?", "A",
      ["Median 12, because the value 40 pulls the mean upward.",
       "Mean 17.4, because it uses all values.",
       "Both are equally good.", "Neither — use the range."],
      "The high value 40 inflates the mean, so the median 12 is the better typical value.", 4),
    poolChoice("y8-dat-shp-p23", "A dot plot shows a cluster of dots near 5 and another cluster near 15 with a gap between. The shape is…", "D",
      ["symmetric", "positively skewed", "negatively skewed", "bimodal"],
      "Two separated clusters indicate a bimodal distribution.", 4),
    poolAnswer("y8-dat-shp-p24", "A box plot: Min 5, Q1 20, Median 28, Q3 32, Max 35. The left whisker is much longer than the right. State the shape in one word.",
      "\\text{long left tail}", "negatively skewed",
      "The long left whisker (Q1 - Min = 15 vs Max - Q3 = 3) indicates a negative skew.", 4, ["negative", "left", "left skewed"]),
    // Difficulty 5
    poolAnswer("y8-dat-shp-p25", "Data: 3, 4, 4, 5, 5, 5, 6, 6, 7, 40. Find the mean.",
      "\\frac{3+4+4+5+5+5+6+6+7+40}{10}", "8.5", "Sum = 85. Mean = 85 ÷ 10 = 8.5.", 5),
    poolAnswer("y8-dat-shp-p26", "For that data (10 values, sorted), find the median.",
      "\\frac{5 + 5}{2}", "5", "10 values → median = (5th + 6th) ÷ 2 = (5 + 5) ÷ 2 = 5.", 5),
    poolChoice("y8-dat-shp-p27", "From the data above (mean 8.5, median 5), the most accurate description is…", "A",
      ["positively skewed; report the median (5)",
       "negatively skewed; report the mean (8.5)",
       "symmetric; either works",
       "bimodal; report the mode"],
      "Mean (8.5) > median (5) due to the value 40, so it is positively skewed and the median is the fairer typical value.", 5),
    poolChoice("y8-dat-shp-p28", "A teacher reports the mean test mark as 68 but the median is 76. What does this most likely indicate?", "B",
      ["The marks are symmetric.",
       "The marks are negatively skewed — a few very low marks pulled the mean down.",
       "The marks are positively skewed.",
       "Half the class scored 68."],
      "Mean (68) < median (76) indicates negative skew: a few low marks dragged the mean below the median.", 5),
    poolAnswer("y8-dat-shp-p29", "A box plot has Q1 = 30, Median = 33, Q3 = 50, Min = 28, Max = 80. Compare the box halves: find (Q3 - Median) minus (Median - Q1).",
      "(50 - 33) - (33 - 30)", "14", "Right box half = 17, left box half = 3. Difference = 17 - 3 = 14, confirming a strong right skew.", 5),
    poolChoice("y8-dat-shp-p30", "Two data sets have the same mean and median but one is symmetric and the other is bimodal. Why is describing the shape still important?", "A",
      ["Because a single mean/median hides the two-group structure of the bimodal data.",
       "Because the mean must be wrong.",
       "Because bimodal data has no median.",
       "Because symmetric data cannot be averaged."],
      "Equal mean and median do not reveal that the bimodal data really contains two groups — only the shape does.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-dat-shp-mp1",
      prompt:
        "A class records the number of books read over summer: 1, 2, 2, 3, 3, 3, 4, 4, 22. (The value 22 is one very keen reader.)",
      latex: "1,2,2,3,3,3,4,4,22",
      answer: "4.89",
      hint: "Compute the mean and median, compare them to decide the skew, then choose the better measure.",
      explanation:
        "Sum = 44, so mean = 44/9 ≈ 4.89. With 9 values the median is the 5th = 3. Mean (4.89) > median (3), so the data is positively skewed and the median (3) is the better typical value.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the mean? Round to 2 decimal places.",
          marks: 1,
          answer: "4.89",
          acceptedAnswers: ["4.888", "4.89"],
          hint: "Add all 9 values and divide by 9.",
          explanation: "Sum = 44. Mean = 44 ÷ 9 ≈ 4.89.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the median?",
          marks: 1,
          answer: "3",
          acceptedAnswers: [],
          hint: "The 5th value of the 9 sorted values.",
          explanation: "Median is the 5th value = 3.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Is the distribution positively or negatively skewed? Answer 'positively' or 'negatively'.",
          marks: 1,
          answer: "positively",
          acceptedAnswers: ["positive", "right"],
          hint: "Compare the mean and the median.",
          explanation: "Mean (4.89) > median (3), so the data is positively (right) skewed.",
        },
      ],
    },
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
  "box-plots":                        boxPlots,
  "comparing-data-with-box-plots":    comparingDataWithBoxPlots,
  "shape-of-distributions":           shapeOfDistributions,
};

export function year8StatisticsProbabilityLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics" && course.slug !== "year-7-mathematics") return null;
  if (unit.slug !== "data-and-graphs" && unit.slug !== "probability-and-chance") return null;

  const content = lessons[lesson.slug];
  if (!content) return null;

  return {
    syllabusArea: "Statistics and Probability",
    masteryPassMark: 0.8,
    ...content,
  };
}
