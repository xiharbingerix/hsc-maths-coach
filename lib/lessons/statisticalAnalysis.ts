import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const dataDisplaysSummaryStatisticsOutliersLesson: ExplicitLesson = {
  id: "data-displays-summary-statistics-outliers",
  slug: "data-displays-summary-statistics-outliers",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Data Displays, Summary Statistics, and Outliers",
  description:
    "Use summary statistics and data displays to describe centre, spread, and the effect of outliers.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",

  video: {
    title: "Data Displays, Summary Statistics, and Outliers",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to calculate and interpret summary statistics, box plot features, and outliers.",

  successCriteria: [
    "Calculate mean, median, range, and interquartile range.",
    "Identify the five-number summary from a data display.",
    "Explain how outliers can affect summary statistics.",
    "Choose resistant summary statistics for skewed data or data with outliers.",
    "Interpret summary statistics in context.",
  ],

  teaching: {
    paragraphs: [
      "Data can be summarised using measures of centre and spread.",
      "The mean and median describe centre, while range, interquartile range, and standard deviation describe spread.",
      "The median and IQR are more resistant to outliers than the mean and range.",
      "A box plot shows the five-number summary: minimum, lower quartile, median, upper quartile, and maximum.",
      "Outliers can strongly affect interpretation, especially when the mean or range is used.",
      "Good statistical answers connect the calculation to the data context, not just the number.",
    ],
    latexBlocks: [
      "\\text{mean}=\\frac{\\text{sum of values}}{\\text{number of values}}",
      "\\text{range}=\\text{maximum}-\\text{minimum}",
      "IQR=Q_3-Q_1",
      "\\text{five-number summary}=\\min, Q_1, \\text{median}, Q_3, \\max",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Mean, median, and range",
      questionLatex: "4,\\ 6,\\ 7,\\ 8,\\ 10",
      steps: [
        {
          explanation: "Find the mean by adding the values and dividing by 5.",
          latex: "\\frac{4+6+7+8+10}{5}=7",
        },
        {
          explanation: "The middle value is the median.",
          latex: "\\text{median}=7",
        },
        {
          explanation: "Find the range by subtracting the minimum from the maximum.",
          latex: "10-4=6",
        },
      ],
      finalAnswerLatex: "\\text{mean}=7,\\quad \\text{median}=7,\\quad \\text{range}=6",
    },
    {
      title: "Worked example 2: IQR from a five-number summary",
      questionLatex:
        "\\min=2,\\quad Q_1=5,\\quad \\text{median}=7,\\quad Q_3=11,\\quad \\max=15",
      steps: [
        {
          explanation: "The IQR is the upper quartile minus the lower quartile.",
          latex: "IQR=Q_3-Q_1",
        },
        {
          explanation: "Substitute $Q_3=11$ and $Q_1=5$.",
          latex: "IQR=11-5=6",
        },
        {
          explanation: "The middle 50% of the data spans 6 units.",
          latex: "\\text{middle spread}=6",
        },
      ],
      finalAnswerLatex: "IQR=6",
    },
    {
      title: "Worked example 3: Resistant statistics",
      questionLatex:
        "\\text{Which is more resistant to an outlier: the mean or the median?}",
      steps: [
        {
          explanation: "An outlier can pull the mean strongly because every value is included in the calculation.",
          latex: "\\text{mean uses every value}",
        },
        {
          explanation: "The median depends on position, so one extreme value usually has less effect.",
          latex: "\\text{median uses the middle position}",
        },
      ],
      finalAnswerLatex: "\\text{The median is more resistant.}",
    },
  ],

  guidedPractice: [
    {
      id: "summary-guided-1",
      prompt: "Find the mean.",
      latex: "3,\\ 5,\\ 7,\\ 9",
      answer: "6",
      hint: "Add the values and divide by 4.",
      explanation: "$(3+5+7+9)\\div4=6$.",
    },
    {
      id: "summary-guided-2",
      prompt: "Find the median.",
      latex: "2,\\ 4,\\ 6,\\ 8,\\ 12",
      answer: "6",
      hint: "The median is the middle value in an ordered data set.",
      explanation: "The middle value is $6$.",
    },
    {
      id: "summary-guided-3",
      prompt: "Find the IQR.",
      latex: "Q_1=9,\\quad Q_3=17",
      answer: "8",
      hint: "Use $Q_3-Q_1$.",
      explanation: "$IQR=17-9=8$.",
    },
    {
      id: "summary-guided-4",
      prompt: "Which statistic is more resistant to an outlier?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "Mean" },
        { label: "B", text: "Median" },
        { label: "C", text: "Range" },
      ],
      hint: "Resistant statistics are less affected by extreme values.",
      explanation: "The median is more resistant to an outlier than the mean.",
    },
  ],

  independentPractice: [
    {
      id: "summary-ind-1",
      prompt: "Find the range.",
      latex: "5,\\ 8,\\ 9,\\ 12,\\ 20",
      answer: "15",
      hint: "Subtract the minimum from the maximum.",
      explanation: "$20-5=15$.",
    },
    {
      id: "summary-ind-2",
      prompt: "Find the median.",
      latex: "11,\\ 12,\\ 15,\\ 18,\\ 44",
      answer: "15",
      hint: "The median is the middle value.",
      explanation: "The middle value is $15$.",
    },
    {
      id: "summary-ind-3",
      prompt: "Find the IQR.",
      latex: "\\min=4,\\quad Q_1=7,\\quad \\text{median}=10,\\quad Q_3=16,\\quad \\max=30",
      answer: "9",
      hint: "Use $Q_3-Q_1$.",
      explanation: "$IQR=16-7=9$.",
    },
    {
      id: "summary-ind-4",
      prompt: "Which statistic is most affected by an extreme maximum?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "Range" },
        { label: "B", text: "Median" },
        { label: "C", text: "Lower quartile" },
      ],
      hint: "Range uses the maximum and minimum.",
      explanation: "The range is strongly affected by an extreme maximum.",
    },
    {
      id: "summary-ind-5",
      prompt: "Which pair is best for summarising data with a clear outlier?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "Mean and range" },
        { label: "B", text: "Mean and maximum" },
        { label: "C", text: "Median and IQR" },
      ],
      hint: "Use resistant measures when outliers are present.",
      explanation: "Median and IQR are more resistant to outliers.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Confusing median and mean.",
      fix: "The mean is the balance point found by adding and dividing. The median is the middle value.",
    },
    {
      mistake: "Calculating range instead of IQR.",
      fix: "Range is maximum minus minimum. IQR is $Q_3-Q_1$.",
    },
    {
      mistake: "Thinking outliers affect the median as strongly as the mean.",
      fix: "The median is position-based, so it is usually more resistant.",
    },
    {
      mistake: "Interpreting statistics without context.",
      fix: "State what the statistic means for the data being described.",
    },
  ],

  masteryQuiz: [
    {
      id: "summary-mastery-1",
      prompt: "Find the mean.",
      latex: "4,\\ 6,\\ 7,\\ 8,\\ 10",
      answer: "7",
      hint: "Add the values and divide by 5.",
      explanation: "$(4+6+7+8+10)\\div5=7$.",
    },
    {
      id: "summary-mastery-2",
      prompt: "Find the median.",
      latex: "4,\\ 6,\\ 7,\\ 8,\\ 10",
      answer: "7",
      hint: "The median is the middle value.",
      explanation: "The middle value is $7$.",
    },
    {
      id: "summary-mastery-3",
      prompt: "Find the range.",
      latex: "4,\\ 6,\\ 7,\\ 8,\\ 10",
      answer: "6",
      hint: "Subtract the minimum from the maximum.",
      explanation: "$10-4=6$.",
    },
    {
      id: "summary-mastery-4",
      prompt: "Find the IQR.",
      latex: "Q_1=5,\\quad Q_3=11",
      answer: "6",
      hint: "Use $Q_3-Q_1$.",
      explanation: "$IQR=11-5=6$.",
    },
    {
      id: "summary-mastery-5",
      prompt: "Which statistic is more resistant to an outlier?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "Mean" },
        { label: "B", text: "Median" },
        { label: "C", text: "Range" },
      ],
      hint: "Think about position versus all values.",
      explanation: "The median is more resistant to an outlier.",
    },
    {
      id: "summary-mastery-6",
      prompt: "Which spread measure is more resistant to outliers?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "Range" },
        { label: "B", text: "Maximum" },
        { label: "C", text: "IQR" },
      ],
      hint: "IQR focuses on the middle 50% of the data.",
      explanation: "The IQR is more resistant because it ignores the extremes.",
    },
    {
      id: "summary-mastery-7",
      prompt: "Identify the lower quartile.",
      latex: "\\min=3,\\quad Q_1=8,\\quad \\text{median}=12,\\quad Q_3=18,\\quad \\max=25",
      answer: "8",
      hint: "The lower quartile is $Q_1$.",
      explanation: "$Q_1=8$.",
    },
    {
      id: "summary-mastery-8",
      prompt: "Which display uses the five-number summary?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "Box plot" },
        { label: "B", text: "Scatterplot" },
        { label: "C", text: "Residual plot" },
      ],
      hint: "A box plot shows quartiles and extremes.",
      explanation: "A box plot uses the five-number summary.",
    },
    {
      id: "summary-mastery-9",
      prompt: "An outlier is added far above the rest of the data. Which centre measure is likely to increase more?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "Mean" },
        { label: "B", text: "Median" },
      ],
      hint: "The mean uses every value.",
      explanation: "The mean is pulled upward more strongly by the outlier.",
    },
    {
      id: "summary-mastery-10",
      prompt: "Which conclusion is most appropriate when a data set has a strong outlier?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "Use only the maximum" },
        { label: "B", text: "Ignore all spread" },
        { label: "C", text: "Consider median and IQR" },
      ],
      hint: "Use resistant measures.",
      explanation: "Median and IQR are useful because they are less affected by outliers.",
    },
  ],

  masteryPassMark: 0.8,
};

export const standardDeviationZScoresStandardisedValuesLesson: ExplicitLesson = {
  id: "standard-deviation-z-scores-standardised-values",
  slug: "standard-deviation-z-scores-standardised-values",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Standard Deviation, Z-Scores, and Standardised Values",
  description:
    "Use standard deviation and z-scores to compare values across distributions.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",

  video: {
    title: "Standard Deviation, Z-Scores, and Standardised Values",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to calculate and interpret z-scores as standardised values.",

  successCriteria: [
    "Explain standard deviation as spread around the mean.",
    "Calculate a z-score using $z=\\frac{x-\\bar{x}}{s}$.",
    "Interpret positive and negative z-scores.",
    "Compare values from different distributions using z-scores.",
    "Describe z-scores in context.",
  ],

  teaching: {
    paragraphs: [
      "Standard deviation measures how spread out values are around the mean.",
      "A z-score tells how many standard deviations a value is from the mean.",
      "Positive z-scores are above the mean and negative z-scores are below the mean.",
      "The larger the absolute value of the z-score, the further the value is from the mean.",
      "Z-scores allow comparison between different distributions because the scores are standardised.",
      "A z-score should be interpreted in context, such as test marks, heights, or times.",
    ],
    latexBlocks: [
      "z=\\frac{x-\\bar{x}}{s}",
      "x=\\text{data value}",
      "\\bar{x}=\\text{mean}",
      "s=\\text{standard deviation}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Find a z-score",
      questionLatex:
        "\\text{A student scores }84\\text{ on a test with mean }68\\text{ and standard deviation }8.",
      steps: [
        {
          explanation: "Substitute into the z-score formula.",
          latex: "z=\\frac{84-68}{8}",
        },
        {
          explanation: "Calculate the difference from the mean.",
          latex: "z=\\frac{16}{8}",
        },
        {
          explanation: "Divide by the standard deviation.",
          latex: "z=2",
        },
      ],
      finalAnswerLatex: "z=2",
    },
    {
      title: "Worked example 2: Compare two standardised results",
      questionLatex:
        "\\text{A: }x=78,\\ \\bar{x}=70,\\ s=4.\\quad \\text{B: }x=85,\\ \\bar{x}=75,\\ s=10.",
      steps: [
        {
          explanation: "Find Student A's z-score.",
          latex: "z_A=\\frac{78-70}{4}=2",
        },
        {
          explanation: "Find Student B's z-score.",
          latex: "z_B=\\frac{85-75}{10}=1",
        },
        {
          explanation: "The larger z-score is better relative to the class.",
          latex: "2>1",
        },
      ],
      finalAnswerLatex: "\\text{Student A performed better relative to the class.}",
    },
    {
      title: "Worked example 3: Interpret a negative z-score",
      questionLatex: "z=-1.5",
      steps: [
        {
          explanation: "A negative z-score means the value is below the mean.",
          latex: "z<0",
        },
        {
          explanation: "The size tells how far below the mean.",
          latex: "|-1.5|=1.5",
        },
      ],
      finalAnswerLatex:
        "\\text{The value is }1.5\\text{ standard deviations below the mean.}",
    },
  ],

  guidedPractice: [
    {
      id: "z-guided-1",
      prompt: "Find the z-score.",
      latex: "x=90,\\quad \\bar{x}=80,\\quad s=5",
      answer: "2",
      hint: "Use $(x-\\bar{x})\\div s$.",
      explanation: "$z=(90-80)\\div5=2$.",
    },
    {
      id: "z-guided-2",
      prompt: "Find the z-score.",
      latex: "x=62,\\quad \\bar{x}=70,\\quad s=4",
      answer: "-2",
      hint: "Subtract the mean first.",
      explanation: "$z=(62-70)\\div4=-2$.",
    },
    {
      id: "z-guided-3",
      prompt: "A z-score is positive. What does this mean?",
      latex: "z>0",
      answer: "A",
      choices: [
        { label: "A", text: "The value is above the mean" },
        { label: "B", text: "The value is below the mean" },
        { label: "C", text: "The value is exactly the mean" },
      ],
      hint: "Positive means above the mean.",
      explanation: "A positive z-score means the value is above the mean.",
    },
    {
      id: "z-guided-4",
      prompt: "Which z-score is further from the mean?",
      latex: "z=-2.4\\quad \\text{or}\\quad z=1.1",
      answer: "-2.4",
      acceptedAnswers: ["-2.4", "z=-2.4"],
      hint: "Compare absolute values.",
      explanation: "$|-2.4|>|1.1|$, so $-2.4$ is further from the mean.",
    },
  ],

  independentPractice: [
    {
      id: "z-ind-1",
      prompt: "Find the z-score.",
      latex: "x=84,\\quad \\bar{x}=68,\\quad s=8",
      answer: "2",
      hint: "Use $z=\\frac{x-\\bar{x}}{s}$.",
      explanation: "$z=(84-68)\\div8=2$.",
    },
    {
      id: "z-ind-2",
      prompt: "Find the z-score.",
      latex: "x=45,\\quad \\bar{x}=50,\\quad s=10",
      answer: "-0.5",
      acceptedAnswers: ["-.5", "-0.50"],
      hint: "Subtract 50 from 45.",
      explanation: "$z=(45-50)\\div10=-0.5$.",
    },
    {
      id: "z-ind-3",
      prompt: "Which result is better relative to its class?",
      latex: "A:z=1.8,\\quad B:z=0.9",
      answer: "A",
      choices: [
        { label: "A", text: "Student A" },
        { label: "B", text: "Student B" },
      ],
      hint: "The larger z-score is further above the mean.",
      explanation: "Student A has the larger z-score.",
    },
    {
      id: "z-ind-4",
      prompt: "Interpret $z=-1$.",
      latex: "z=-1",
      answer: "B",
      choices: [
        { label: "A", text: "1 standard deviation above the mean" },
        { label: "B", text: "1 standard deviation below the mean" },
        { label: "C", text: "Exactly at the mean" },
      ],
      hint: "Negative means below the mean.",
      explanation: "$z=-1$ means 1 standard deviation below the mean.",
    },
    {
      id: "z-ind-5",
      prompt: "Which value is exactly at the mean?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "$z=1$" },
        { label: "B", text: "$z=-1$" },
        { label: "C", text: "$z=0$" },
      ],
      hint: "At the mean, $x-\\bar{x}=0$.",
      explanation: "$z=0$ means the value is exactly at the mean.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Reversing $x-\\bar{x}$ as $\\bar{x}-x$.",
      fix: "Use $z=\\frac{x-\\bar{x}}{s}$ so values above the mean have positive z-scores.",
    },
    {
      mistake: "Forgetting to divide by the standard deviation.",
      fix: "After finding the difference from the mean, divide by $s$.",
    },
    {
      mistake: "Thinking a negative z-score is always bad.",
      fix: "A negative z-score means below the mean. Whether that is good depends on the context.",
    },
    {
      mistake: "Comparing raw scores instead of standardised scores.",
      fix: "Use z-scores when comparing results from different distributions.",
    },
  ],

  masteryQuiz: [
    {
      id: "z-mastery-1",
      prompt: "What does standard deviation measure?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "The middle value only" },
        { label: "B", text: "Spread around the mean" },
        { label: "C", text: "The largest value" },
      ],
      hint: "Standard deviation is a spread measure.",
      explanation: "Standard deviation measures spread around the mean.",
    },
    {
      id: "z-mastery-2",
      prompt: "Find the z-score.",
      latex: "x=84,\\quad \\bar{x}=68,\\quad s=8",
      answer: "2",
      hint: "Subtract, then divide.",
      explanation: "$z=(84-68)\\div8=2$.",
    },
    {
      id: "z-mastery-3",
      prompt: "Find the z-score.",
      latex: "x=75,\\quad \\bar{x}=80,\\quad s=5",
      answer: "-1",
      hint: "Subtract 80 from 75.",
      explanation: "$z=(75-80)\\div5=-1$.",
    },
    {
      id: "z-mastery-4",
      prompt: "A z-score of 2 means the value is:",
      latex: "z=2",
      answer: "A",
      choices: [
        { label: "A", text: "2 standard deviations above the mean" },
        { label: "B", text: "2 standard deviations below the mean" },
        { label: "C", text: "2 units below the minimum" },
      ],
      hint: "Positive means above the mean.",
      explanation: "$z=2$ means 2 standard deviations above the mean.",
    },
    {
      id: "z-mastery-5",
      prompt: "A z-score of $-1.5$ means the value is:",
      latex: "z=-1.5",
      answer: "B",
      choices: [
        { label: "A", text: "1.5 standard deviations above the mean" },
        { label: "B", text: "1.5 standard deviations below the mean" },
        { label: "C", text: "Exactly at the mean" },
      ],
      hint: "Negative means below the mean.",
      explanation: "$z=-1.5$ means 1.5 standard deviations below the mean.",
    },
    {
      id: "z-mastery-6",
      prompt: "Which z-score is further from the mean?",
      latex: "z=-0.8\\quad \\text{or}\\quad z=1.6",
      answer: "1.6",
      acceptedAnswers: ["z=1.6"],
      hint: "Compare absolute values.",
      explanation: "$|1.6|>|-0.8|$, so $1.6$ is further from the mean.",
    },
    {
      id: "z-mastery-7",
      prompt: "Student A has $z=2$ and Student B has $z=1$. Which result is better relative to class?",
      latex: "z_A=2,\\quad z_B=1",
      answer: "A",
      choices: [
        { label: "A", text: "Student A" },
        { label: "B", text: "Student B" },
      ],
      hint: "The larger positive z-score is further above the mean.",
      explanation: "Student A performed better relative to class.",
    },
    {
      id: "z-mastery-8",
      prompt: "Find the z-score.",
      latex: "x=100,\\quad \\bar{x}=100,\\quad s=12",
      answer: "0",
      hint: "The value equals the mean.",
      explanation: "$z=(100-100)\\div12=0$.",
    },
    {
      id: "z-mastery-9",
      prompt: "Which formula is correct?",
      latex: "\\text{z-score}",
      answer: "A",
      choices: [
        { label: "A", text: "$z=\\frac{x-\\bar{x}}{s}$" },
        { label: "B", text: "$z=\\frac{s}{x-\\bar{x}}$" },
        { label: "C", text: "$z=x+\\bar{x}+s$" },
      ],
      hint: "Subtract the mean, then divide by standard deviation.",
      explanation: "The correct formula is $z=\\frac{x-\\bar{x}}{s}$.",
    },
    {
      id: "z-mastery-10",
      prompt: "Why are z-scores useful?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "They remove the need for context" },
        { label: "B", text: "They make all raw scores equal" },
        { label: "C", text: "They allow comparison across different distributions" },
      ],
      hint: "Z-scores standardise values.",
      explanation: "Z-scores allow values from different distributions to be compared.",
    },
  ],

  masteryPassMark: 0.8,
};

export const statisticalAnalysisOutline: LessonOutlineItem[] = [
  {
    id: "data-displays-summary-statistics-outliers",
    slug: "data-displays-summary-statistics-outliers",
    title: "Data Displays, Summary Statistics, and Outliers",
    description:
      "Summarise data using centre, spread, five-number summaries, and outlier-aware interpretation.",
    status: "active",
  },
  {
    id: "standard-deviation-z-scores-standardised-values",
    slug: "standard-deviation-z-scores-standardised-values",
    title: "Standard Deviation, Z-Scores, and Standardised Values",
    description:
      "Use standard deviation and z-scores to interpret and compare standardised values.",
    status: "active",
  },
  {
    id: "correlation-least-squares-regression",
    slug: "correlation-least-squares-regression",
    title: "Correlation and Least-Squares Regression",
    description:
      "Describe association, interpret correlation, and use least-squares regression lines for prediction.",
    status: "coming-soon",
  },
  {
    id: "interpreting-association-residuals",
    slug: "interpreting-association-residuals",
    title: "Interpreting Association and Residuals",
    description:
      "Interpret association, residuals, and the limitations of linear models.",
    status: "coming-soon",
  },
  {
    id: "normal-distribution-empirical-rule",
    slug: "normal-distribution-empirical-rule",
    title: "Normal Distribution and Empirical Rule",
    description:
      "Use normal distribution ideas, z-scores, and the empirical rule to interpret data.",
    status: "coming-soon",
  },
  {
    id: "mixed-statistical-analysis-exam-practice",
    slug: "mixed-statistical-analysis-exam-practice",
    title: "Mixed Statistical Analysis Exam Practice",
    description:
      "Practise mixed exam-style questions involving summary statistics, z-scores, correlation, regression, residuals, and normal distributions.",
    status: "coming-soon",
  },
];

export const statisticalAnalysisLessons = [
  dataDisplaysSummaryStatisticsOutliersLesson,
  standardDeviationZScoresStandardisedValuesLesson,
];
