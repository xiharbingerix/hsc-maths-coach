import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const dataDisplaysMeasuresOfCentreLesson: ExplicitLesson = {
  id: "data-displays-measures-of-centre",
  slug: "data-displays-measures-of-centre",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Data Displays and Measures of Centre",
  description: "Read simple data displays and choose useful measures of centre, including mean, median, and mode.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",
  video: { title: "Data Displays and Measures of Centre", url: "/videos/placeholder-lesson.mp4" },
  learningIntention: "Learn how data displays reveal patterns and how to choose a measure of centre that suits the data context.",
  successCriteria: [
    "Read simple frequency information from a data display.",
    "Calculate and interpret mean, median, and mode.",
    "Explain why an outlier affects the mean more than the median.",
    "Choose an appropriate measure of centre for a context.",
  ],
  teaching: {
    paragraphs: [
      "Start by looking at the display before calculating. A table, dot plot, or list can reveal clusters, gaps, repeated values, and unusually large or small values.",
      "The mean is the balance point. Add every value and share the total evenly. Because every value contributes, one extreme value can pull the mean towards it.",
      "The median is the middle value after ordering the data. It depends on position rather than the size of every value, so it is usually more resistant to an outlier.",
      "The mode is the most common value. It is useful when the question cares about the most frequent result, such as the most common shoe size sold.",
      "There is no automatic best centre measure. Use the mean for a fairly balanced set without strong outliers, the median when extremes would distort the story, and the mode when the most frequent category or value matters.",
    ],
    latexBlocks: [
      "\\text{mean}=\\frac{\\text{sum of values}}{\\text{number of values}}",
      "\\text{median}=\\text{middle ordered value}",
      "\\text{mode}=\\text{most frequent value}",
    ],
  },
  workedExamples: [
    { title: "Worked example 1: Mean as a balance point", questionLatex: "4,\\ 6,\\ 7,\\ 8,\\ 10", steps: [
      { explanation: "Add all five values, then share the total evenly across the five positions.", latex: "\\frac{4+6+7+8+10}{5}=7" },
      { explanation: "A mean of 7 is the balance point of the data set." },
    ], finalAnswerLatex: "\\text{mean}=7" },
    { title: "Worked example 2: Median resists an outlier", questionLatex: "4,\\ 6,\\ 7,\\ 8,\\ 40", steps: [
      { explanation: "The values are ordered already, so the middle position is easy to see.", latex: "\\text{median}=7" },
      { explanation: "The large value 40 pulls the mean upward, but it does not move the middle position.", latex: "\\text{mean}=\\frac{65}{5}=13" },
    ], finalAnswerLatex: "\\text{median}=7\\text{ is the more resistant centre measure.}" },
    { title: "Worked example 3: Read a frequency table", questionLatex: "\\begin{array}{c|ccc}\\text{books read}&0&1&2\\\\\\text{frequency}&2&5&3\\end{array}", steps: [
      { explanation: "Frequency tells how often each value appears. The largest frequency is 5.", latex: "\\text{frequency of }1=5" },
      { explanation: "The value paired with the largest frequency is the mode.", latex: "\\text{mode}=1" },
    ], finalAnswerLatex: "\\text{mode}=1\\text{ book}" },
  ],
  guidedPractice: [
    { id: "centre-guided-1", prompt: "Find the mean.", latex: "3,\\ 5,\\ 7,\\ 9", answer: "6", hint: "Add the values and divide by 4.", explanation: "The total is 24. Sharing 24 evenly across 4 values gives a mean of 6." },
    { id: "centre-guided-2", prompt: "Find the median.", latex: "2,\\ 4,\\ 6,\\ 8,\\ 12", answer: "6", hint: "Use the middle ordered value.", explanation: "There are five ordered values, so the third value is the middle. The median is 6." },
    { id: "centre-guided-3", prompt: "Find the mode.", latex: "2,\\ 3,\\ 3,\\ 5,\\ 7", answer: "3", hint: "Look for the value that appears most often.", explanation: "The value 3 appears twice while each other value appears once, so the mode is 3." },
    { id: "centre-guided-4", prompt: "Which centre measure is usually better when one value is much larger than the rest?", latex: "\\text{Choose one}", answer: "B", choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Maximum" }], hint: "Choose the measure based on position.", explanation: "The median is resistant because one extreme value usually does not move the middle position very far." },
  ],
  independentPractice: [
    { id: "centre-ind-1", prompt: "Find the mean.", latex: "5,\\ 7,\\ 8,\\ 12", answer: "8", hint: "Add, then divide by 4.", explanation: "The total is 32, so the mean is 32 divided by 4, which is 8." },
    { id: "centre-ind-2", prompt: "Find the median.", latex: "3,\\ 5,\\ 9,\\ 11,\\ 20", answer: "9", hint: "Find the middle ordered value.", explanation: "The third of five ordered values is 9." },
    { id: "centre-ind-3", prompt: "Find the mode.", latex: "1,\\ 4,\\ 4,\\ 4,\\ 6,\\ 8", answer: "4", hint: "Count repeated values.", explanation: "The value 4 occurs three times, more often than any other value." },
    { id: "centre-ind-4", prompt: "A cafe wants to stock the most commonly ordered drink size. Which measure is most useful?", latex: "\\text{Choose one}", answer: "C", choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Mode" }], hint: "The question asks for the most common choice.", explanation: "The mode identifies the drink size ordered most often." },
    { id: "centre-ind-5", prompt: "House prices include one extremely expensive property. Which measure better describes a typical price?", latex: "\\text{Choose one}", answer: "B", choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Maximum" }], hint: "Use a resistant centre measure.", explanation: "The extreme price can pull the mean upward. The median usually gives a steadier picture of a typical price." },
  ],
  commonMistakes: [
    { mistake: "Calculating before looking at the display.", fix: "Scan for clusters, gaps, repeated values, and outliers first. Those features help you choose a useful statistic." },
    { mistake: "Confusing mean and median.", fix: "Mean is the balance point found by adding and dividing. Median is the middle ordered value." },
    { mistake: "Choosing the mean automatically.", fix: "Check for extreme values. If an outlier would pull the mean away from the typical values, consider the median." },
    { mistake: "Calling the largest value the mode.", fix: "Mode means most frequent, not biggest. Count how often each value appears." },
  ],
  masteryQuiz: [
    { id: "centre-mastery-1", prompt: "Find the mean.", latex: "4,\\ 6,\\ 7,\\ 8,\\ 10", answer: "7", hint: "Add and divide by 5.", explanation: "The total is 35, and 35 divided by 5 is 7." },
    { id: "centre-mastery-2", prompt: "Find the median.", latex: "4,\\ 6,\\ 7,\\ 8,\\ 10", answer: "7", hint: "Use the middle ordered value.", explanation: "The third value is the middle of the five ordered values." },
    { id: "centre-mastery-3", prompt: "Find the mode.", latex: "2,\\ 2,\\ 3,\\ 5,\\ 8", answer: "2", hint: "Find the most frequent value.", explanation: "The value 2 occurs twice, more than any other value." },
    { id: "centre-mastery-4", prompt: "Which measure is the balance point of a data set?", latex: "\\text{Choose one}", answer: "A", choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Mode" }], hint: "Think of sharing the total evenly.", explanation: "The mean is the balance point because it shares the total evenly across all values." },
    { id: "centre-mastery-5", prompt: "Which measure is based on the middle position?", latex: "\\text{Choose one}", answer: "B", choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Range" }], hint: "Order the data first.", explanation: "The median is the middle value after the data is ordered." },
    { id: "centre-mastery-6", prompt: "An extreme maximum is added. Which centre measure usually changes more?", latex: "\\text{Choose one}", answer: "A", choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Mode always" }], hint: "Which measure uses every value?", explanation: "The mean uses the size of every value, so an extreme maximum pulls it upward." },
    { id: "centre-mastery-7", prompt: "A shoe store wants the most common size sold. Which measure should it use?", latex: "\\text{Choose one}", answer: "C", choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Mode" }], hint: "Look for the most frequent value.", explanation: "The mode identifies the shoe size sold most often." },
    { id: "centre-mastery-8", prompt: "Find the mean from the frequency information.", latex: "\\begin{array}{c|cc}x&2&5\\\\\\text{frequency}&3&1\\end{array}", answer: "2.75", acceptedAnswers: ["2.750"], hint: "Use each value as many times as its frequency.", explanation: "The total is 2+2+2+5=11 across 4 values, so the mean is 2.75." },
    { id: "centre-mastery-9", prompt: "Which statement best explains why the median is resistant?", latex: "\\text{Choose one}", answer: "B", choices: [{ label: "A", text: "It ignores ordering" }, { label: "B", text: "It depends on the middle position" }, { label: "C", text: "It is always the mode" }], hint: "Think about position rather than magnitude.", explanation: "One extreme value may change the size of an endpoint without moving the middle position much." },
    { id: "centre-mastery-10", prompt: "Which measure best describes a typical salary when one executive earns far more than everyone else?", latex: "\\text{Choose one}", answer: "C", choices: [{ label: "A", text: "Maximum" }, { label: "B", text: "Mean" }, { label: "C", text: "Median" }], hint: "Choose a resistant measure.", explanation: "The executive salary can pull the mean upward. The median is less distorted by that extreme value." },
  ],
  masteryPassMark: 0.8,
};

export const spreadIqrBoxPlotsOutliersLesson: ExplicitLesson = {
  id: "spread-iqr-box-plots-outliers",
  slug: "spread-iqr-box-plots-outliers",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Spread, IQR, Box Plots and Outliers",
  description: "Interpret range, quartiles, IQR, five-number summaries, box plots, and the effect of outliers on spread.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",
  video: { title: "Spread, IQR, Box Plots and Outliers", url: "/videos/placeholder-lesson.mp4" },
  learningIntention: "Learn how spread measures and box plots describe how data is distributed, including when outliers are present.",
  successCriteria: [
    "Calculate range and interquartile range.",
    "Interpret quartiles and the five-number summary.",
    "Describe a box plot from a textual five-number summary.",
    "Explain why IQR is more resistant to outliers than range.",
  ],
  teaching: {
    paragraphs: [
      "Centre tells where data sits; spread tells how far it stretches out. Two data sets can have the same median but feel very different if one is tightly grouped and the other is widely scattered.",
      "Range is the full width from minimum to maximum. It is quick to calculate, but one extreme value can stretch it dramatically.",
      "Quartiles split ordered data into four sections. The interquartile range, or IQR, runs from the lower quartile to the upper quartile, so it describes the middle half of the data.",
      "A box plot is a compact map of the five-number summary: minimum, lower quartile, median, upper quartile, and maximum. The box is the middle 50%, and the whiskers extend towards the extremes.",
      "Because IQR focuses on the middle half, an outlier usually affects range more than IQR. The next lesson adds standard deviation, another spread measure that considers distances from the mean.",
    ],
    latexBlocks: [
      "\\text{range}=\\text{maximum}-\\text{minimum}",
      "IQR=Q_3-Q_1",
      "\\text{five-number summary}=\\min, Q_1, \\text{median}, Q_3, \\max",
    ],
  },
  workedExamples: [
    { title: "Worked example 1: Compare range and IQR", questionLatex: "\\min=2,\\quad Q_1=5,\\quad \\text{median}=7,\\quad Q_3=11,\\quad \\max=15", steps: [
      { explanation: "Range uses the two extremes, so it describes the full spread.", latex: "\\text{range}=15-2=13" },
      { explanation: "IQR uses the quartiles, so it describes the middle half of the data.", latex: "IQR=11-5=6" },
    ], finalAnswerLatex: "\\text{range}=13,\\quad IQR=6" },
    { title: "Worked example 2: Read a box plot from text", questionLatex: "\\min=3,\\quad Q_1=8,\\quad \\text{median}=12,\\quad Q_3=18,\\quad \\max=25", steps: [
      { explanation: "The box would run from 8 to 18, because the box represents the middle 50%.", latex: "Q_1=8,\\quad Q_3=18" },
      { explanation: "The median line would sit at 12, and the whiskers would extend to 3 and 25.", latex: "\\min=3,\\quad \\text{median}=12,\\quad \\max=25" },
    ], finalAnswerLatex: "\\text{box from }8\\text{ to }18,\\quad \\text{median }12,\\quad \\text{whiskers to }3\\text{ and }25" },
    { title: "Worked example 3: Explain an outlier effect", questionLatex: "4,\\ 6,\\ 7,\\ 8,\\ 10\\quad \\text{then add }100", steps: [
      { explanation: "The new value 100 becomes the maximum, so it stretches the full spread immediately.", latex: "\\text{old range}=10-4=6,\\quad \\text{new range}=100-4=96" },
      { explanation: "IQR focuses on the middle half, so it is usually much less affected by one extreme endpoint." },
    ], finalAnswerLatex: "\\text{The outlier changes range far more than IQR.}" },
  ],
  guidedPractice: [
    { id: "spread-guided-1", prompt: "Find the range.", latex: "5,\\ 8,\\ 9,\\ 12,\\ 20", answer: "15", hint: "Subtract minimum from maximum.", explanation: "The full spread is 20 minus 5, which is 15." },
    { id: "spread-guided-2", prompt: "Find the IQR.", latex: "Q_1=9,\\quad Q_3=17", answer: "8", hint: "Use Q3 minus Q1.", explanation: "The middle half runs from 9 to 17, so its width is 8." },
    { id: "spread-guided-3", prompt: "Which values form the box in a box plot?", latex: "\\text{Choose one}", answer: "B", choices: [{ label: "A", text: "Minimum and maximum" }, { label: "B", text: "Lower quartile and upper quartile" }, { label: "C", text: "Mean and mode" }], hint: "The box represents the middle half.", explanation: "The box extends from Q1 to Q3 and contains the middle 50% of the data." },
    { id: "spread-guided-4", prompt: "Which spread measure is usually more resistant to an outlier?", latex: "\\text{Choose one}", answer: "C", choices: [{ label: "A", text: "Range" }, { label: "B", text: "Maximum" }, { label: "C", text: "IQR" }], hint: "Which measure focuses on the middle half?", explanation: "IQR ignores the extreme endpoints and focuses on the middle 50%." },
  ],
  independentPractice: [
    { id: "spread-ind-1", prompt: "Find the range.", latex: "4,\\ 9,\\ 11,\\ 18", answer: "14", hint: "Use maximum minus minimum.", explanation: "The range is 18 minus 4, which is 14." },
    { id: "spread-ind-2", prompt: "Find the IQR.", latex: "Q_1=7,\\quad Q_3=16", answer: "9", hint: "Subtract Q1 from Q3.", explanation: "The middle half has width 16 minus 7, which is 9." },
    { id: "spread-ind-3", prompt: "Identify the median from the five-number summary.", latex: "\\min=2,\\quad Q_1=6,\\quad \\text{median}=10,\\quad Q_3=14,\\quad \\max=22", answer: "10", hint: "Read the middle summary value.", explanation: "The median is stated as 10. On a box plot, its line would sit inside the box." },
    { id: "spread-ind-4", prompt: "What percentage of data lies inside the box of a box plot?", latex: "\\text{Choose one}", answer: "B", choices: [{ label: "A", text: "25%" }, { label: "B", text: "50%" }, { label: "C", text: "100%" }], hint: "The box runs from Q1 to Q3.", explanation: "From Q1 to Q3 is the middle half, so the box contains 50% of the data." },
    { id: "spread-ind-5", prompt: "One very large outlier is added. Which measure is likely to change most immediately?", latex: "\\text{Choose one}", answer: "A", choices: [{ label: "A", text: "Range" }, { label: "B", text: "IQR" }, { label: "C", text: "Median" }], hint: "Which measure uses the maximum?", explanation: "The range uses the maximum directly, so a large outlier can stretch it sharply." },
  ],
  commonMistakes: [
    { mistake: "Confusing range and IQR.", fix: "Range is maximum minus minimum. IQR is Q3 minus Q1, the width of the middle half." },
    { mistake: "Treating the box as the whole data set.", fix: "The box contains the middle 50%. The whiskers extend towards the minimum and maximum." },
    { mistake: "Thinking an outlier affects all spread measures equally.", fix: "An extreme value changes range directly. IQR is usually steadier because it focuses on the middle half." },
    { mistake: "Reading quartiles without ordering them.", fix: "Keep the five-number summary in order: minimum, Q1, median, Q3, maximum." },
  ],
  masteryQuiz: [
    { id: "spread-mastery-1", prompt: "Find the range.", latex: "4,\\ 6,\\ 7,\\ 8,\\ 10", answer: "6", hint: "Subtract the minimum from the maximum.", explanation: "The range is 10 minus 4, which is 6." },
    { id: "spread-mastery-2", prompt: "Find the IQR.", latex: "Q_1=5,\\quad Q_3=11", answer: "6", hint: "Use Q3 minus Q1.", explanation: "The middle half spans 11 minus 5, which is 6." },
    { id: "spread-mastery-3", prompt: "What does IQR describe?", latex: "\\text{Choose one}", answer: "C", choices: [{ label: "A", text: "The most common value" }, { label: "B", text: "The full spread" }, { label: "C", text: "The spread of the middle 50%" }], hint: "IQR runs from Q1 to Q3.", explanation: "The interval from Q1 to Q3 contains the middle half of the ordered data." },
    { id: "spread-mastery-4", prompt: "Identify the lower quartile.", latex: "\\min=3,\\quad Q_1=8,\\quad \\text{median}=12,\\quad Q_3=18,\\quad \\max=25", answer: "8", hint: "Lower quartile means Q1.", explanation: "The five-number summary gives Q1 as 8." },
    { id: "spread-mastery-5", prompt: "Identify the upper quartile.", latex: "\\min=3,\\quad Q_1=8,\\quad \\text{median}=12,\\quad Q_3=18,\\quad \\max=25", answer: "18", hint: "Upper quartile means Q3.", explanation: "The five-number summary gives Q3 as 18." },
    { id: "spread-mastery-6", prompt: "Which display is built from a five-number summary?", latex: "\\text{Choose one}", answer: "A", choices: [{ label: "A", text: "Box plot" }, { label: "B", text: "Scatterplot" }, { label: "C", text: "Residual plot" }], hint: "Think of a box with whiskers.", explanation: "A box plot maps the minimum, Q1, median, Q3, and maximum." },
    { id: "spread-mastery-7", prompt: "Which spread measure changes directly when the maximum becomes much larger?", latex: "\\text{Choose one}", answer: "B", choices: [{ label: "A", text: "Median" }, { label: "B", text: "Range" }, { label: "C", text: "Mode" }], hint: "Which formula uses maximum?", explanation: "Range equals maximum minus minimum, so a larger maximum increases range directly." },
    { id: "spread-mastery-8", prompt: "A box plot has Q1 = 6 and Q3 = 14. Find the width of its box.", latex: "Q_1=6,\\quad Q_3=14", answer: "8", hint: "The box width is the IQR.", explanation: "The box represents the middle half, and its width is 14 minus 6, which is 8." },
    { id: "spread-mastery-9", prompt: "Which spread measure is usually better when outliers are present?", latex: "\\text{Choose one}", answer: "C", choices: [{ label: "A", text: "Maximum" }, { label: "B", text: "Range" }, { label: "C", text: "IQR" }], hint: "Use the middle half.", explanation: "IQR is more resistant because it is based on the middle 50%, not the extreme endpoints." },
    { id: "spread-mastery-10", prompt: "Which measure will the next lesson add to describe spread around the mean?", latex: "\\text{Choose one}", answer: "A", choices: [{ label: "A", text: "Standard deviation" }, { label: "B", text: "Mode" }, { label: "C", text: "Maximum" }], hint: "The next lesson standardises distances from the mean.", explanation: "Standard deviation describes how spread out values are around the mean." },
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

export const correlationLeastSquaresRegressionLesson: ExplicitLesson = {
  id: "correlation-least-squares-regression",
  slug: "correlation-least-squares-regression",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Correlation and Least-Squares Regression",
  description:
    "Describe linear association and use least-squares regression equations for prediction and interpretation.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",

  video: {
    title: "Correlation and Least-Squares Regression",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to interpret correlation and use regression lines for prediction within a data context.",

  successCriteria: [
    "Describe the direction and strength of a linear association from $r$.",
    "Recognise that $r$ is between $-1$ and $1$.",
    "Use a least-squares regression equation to predict a value.",
    "Interpret the slope of a regression line in context.",
    "Avoid claiming that correlation proves causation.",
  ],

  teaching: {
    paragraphs: [
      "Correlation describes the strength and direction of a linear relationship between two variables.",
      "The correlation coefficient $r$ is always between $-1$ and $1$.",
      "A value of $r$ close to $1$ means strong positive linear association. A value close to $-1$ means strong negative linear association.",
      "A value of $r$ close to $0$ means weak or no linear association, but it does not rule out every possible non-linear pattern.",
      "Correlation does not prove causation. Two variables may move together without one causing the other.",
      "A least-squares regression line models the relationship between two variables and can be used for prediction within the data range.",
      "The slope gives the predicted change in $y$ for a one-unit increase in $x$.",
      "The intercept should only be interpreted when $x=0$ makes sense in the context.",
    ],
    latexBlocks: [
      "-1\\le r\\le 1",
      "\\hat{y}=mx+b",
      "m=\\frac{\\text{predicted change in }y}{\\text{one-unit increase in }x}",
      "\\text{correlation}\\ne\\text{causation}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Interpret correlation",
      questionLatex: "r=-0.82",
      steps: [
        {
          explanation: "The sign is negative, so the association is negative.",
          latex: "r<0",
        },
        {
          explanation: "The value is close to $-1$, so the association is strong.",
          latex: "|-0.82|=0.82",
        },
        {
          explanation: "Combine direction and strength.",
          latex: "\\text{strong negative linear association}",
        },
      ],
      finalAnswerLatex: "\\text{strong negative linear association}",
    },
    {
      title: "Worked example 2: Prediction and slope",
      questionLatex:
        "\\hat{y}=2.5x+12.\\quad \\text{Find }\\hat{y}\\text{ when }x=8\\text{ and interpret the slope.}",
      steps: [
        {
          explanation: "Substitute $x=8$ into the regression equation.",
          latex: "\\hat{y}=2.5(8)+12",
        },
        {
          explanation: "Calculate the predicted value.",
          latex: "\\hat{y}=32",
        },
        {
          explanation: "The slope is $2.5$, so $y$ is predicted to increase by 2.5 for each one-unit increase in $x$.",
          latex: "m=2.5",
        },
      ],
      finalAnswerLatex:
        "\\hat{y}=32,\\quad \\text{slope }2.5\\text{ means }y\\text{ increases by }2.5\\text{ per }1\\text{ unit of }x",
    },
  ],

  guidedPractice: [
    {
      id: "correlation-guided-1",
      prompt: "Identify the direction of the association.",
      latex: "r=0.74",
      answer: "positive",
      acceptedAnswers: ["Positive", "positive association"],
      hint: "Look at the sign of $r$.",
      explanation: "$r$ is positive, so the association is positive.",
    },
    {
      id: "correlation-guided-2",
      prompt: "Choose the best description.",
      latex: "r=-0.91",
      answer: "B",
      choices: [
        { label: "A", text: "weak positive association" },
        { label: "B", text: "strong negative association" },
        { label: "C", text: "no linear association" },
      ],
      hint: "Negative sign gives direction; $|r|$ close to 1 gives strength.",
      explanation: "$r=-0.91$ shows strong negative association.",
    },
    {
      id: "correlation-guided-3",
      prompt: "Use the regression line to predict $y$ when $x=4$.",
      latex: "\\hat{y}=3x+5",
      answer: "17",
      hint: "Substitute $x=4$.",
      explanation: "$\\hat{y}=3(4)+5=17$.",
    },
    {
      id: "correlation-guided-4",
      prompt: "What does the slope mean?",
      latex: "\\hat{y}=4x+10",
      answer: "A",
      choices: [
        { label: "A", text: "$y$ is predicted to increase by 4 for each one-unit increase in $x$" },
        { label: "B", text: "$x$ is predicted to increase by 10 for each one-unit increase in $y$" },
        { label: "C", text: "The correlation is exactly 4" },
      ],
      hint: "The coefficient of $x$ is the slope.",
      explanation: "The slope is 4, so predicted $y$ increases by 4 for each one-unit increase in $x$.",
    },
  ],

  independentPractice: [
    {
      id: "correlation-ind-1",
      prompt: "Choose the best description.",
      latex: "r=0.88",
      answer: "A",
      choices: [
        { label: "A", text: "strong positive association" },
        { label: "B", text: "strong negative association" },
        { label: "C", text: "weak association" },
      ],
      hint: "$r$ is positive and close to 1.",
      explanation: "$r=0.88$ is strong positive association.",
    },
    {
      id: "correlation-ind-2",
      prompt: "Choose the best description.",
      latex: "r=-0.18",
      answer: "C",
      choices: [
        { label: "A", text: "strong positive association" },
        { label: "B", text: "strong negative association" },
        { label: "C", text: "weak negative association" },
      ],
      hint: "The sign is negative and the size is close to 0.",
      explanation: "$r=-0.18$ is weak negative linear association.",
    },
    {
      id: "correlation-ind-3",
      prompt: "Predict $y$ when $x=6$.",
      latex: "\\hat{y}=1.5x+9",
      answer: "18",
      hint: "Substitute $x=6$.",
      explanation: "$\\hat{y}=1.5(6)+9=18$.",
    },
    {
      id: "correlation-ind-4",
      prompt: "Choose the correct caution.",
      latex: "\\text{A strong correlation is found between two variables.}",
      answer: "B",
      choices: [
        { label: "A", text: "This proves one variable causes the other" },
        { label: "B", text: "This does not prove causation" },
        { label: "C", text: "The variables cannot be related" },
      ],
      hint: "Correlation and causation are different ideas.",
      explanation: "Correlation does not prove causation.",
    },
    {
      id: "correlation-ind-5",
      prompt: "What is the intercept?",
      latex: "\\hat{y}=2x+7",
      answer: "7",
      hint: "The intercept is the constant term.",
      explanation: "The intercept is $7$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Saying correlation proves causation.",
      fix: "Correlation describes association only; it does not prove cause and effect.",
    },
    {
      mistake: "Ignoring the sign of $r$.",
      fix: "The sign tells the direction: positive or negative.",
    },
    {
      mistake: "Treating $r=-0.9$ as weak because it is negative.",
      fix: "Strength depends on $|r|$. Since $|-0.9|=0.9$, the association is strong.",
    },
    {
      mistake: "Extrapolating far outside the data range without caution.",
      fix: "Regression predictions are most reliable within the range of the data used to fit the model.",
    },
  ],

  masteryQuiz: [
    {
      id: "correlation-mastery-1",
      prompt: "Choose the best description.",
      latex: "r=0.93",
      answer: "A",
      choices: [
        { label: "A", text: "strong positive linear association" },
        { label: "B", text: "strong negative linear association" },
        { label: "C", text: "weak linear association" },
      ],
      hint: "$r$ is positive and close to 1.",
      explanation: "$r=0.93$ shows strong positive linear association.",
    },
    {
      id: "correlation-mastery-2",
      prompt: "Choose the best description.",
      latex: "r=-0.82",
      answer: "B",
      choices: [
        { label: "A", text: "strong positive linear association" },
        { label: "B", text: "strong negative linear association" },
        { label: "C", text: "weak positive linear association" },
      ],
      hint: "Use both sign and size.",
      explanation: "$r=-0.82$ shows strong negative linear association.",
    },
    {
      id: "correlation-mastery-3",
      prompt: "Choose the best description.",
      latex: "r=0.04",
      answer: "C",
      choices: [
        { label: "A", text: "strong positive linear association" },
        { label: "B", text: "strong negative linear association" },
        { label: "C", text: "very weak or no linear association" },
      ],
      hint: "$r$ is close to 0.",
      explanation: "$r=0.04$ is very weak or no linear association.",
    },
    {
      id: "correlation-mastery-4",
      prompt: "Predict $y$ when $x=8$.",
      latex: "\\hat{y}=2.5x+12",
      answer: "32",
      hint: "Substitute $x=8$.",
      explanation: "$\\hat{y}=2.5(8)+12=32$.",
    },
    {
      id: "correlation-mastery-5",
      prompt: "Predict $y$ when $x=10$.",
      latex: "\\hat{y}=4x-3",
      answer: "37",
      hint: "Substitute $x=10$.",
      explanation: "$\\hat{y}=4(10)-3=37$.",
    },
    {
      id: "correlation-mastery-6",
      prompt: "Predict $y$ when $x=5$.",
      latex: "\\hat{y}=-2x+30",
      answer: "20",
      hint: "Substitute $x=5$.",
      explanation: "$\\hat{y}=-2(5)+30=20$.",
    },
    {
      id: "correlation-mastery-7",
      prompt: "Interpret the slope.",
      latex: "\\hat{y}=6x+14",
      answer: "A",
      choices: [
        { label: "A", text: "$y$ is predicted to increase by 6 for each one-unit increase in $x$" },
        { label: "B", text: "$y$ is predicted to be 6 when $x=0$" },
        { label: "C", text: "The correlation coefficient is 6" },
      ],
      hint: "Slope is the coefficient of $x$.",
      explanation: "The slope is 6, so predicted $y$ increases by 6 per one-unit increase in $x$.",
    },
    {
      id: "correlation-mastery-8",
      prompt: "When should the intercept be interpreted?",
      latex: "\\hat{y}=mx+b",
      answer: "C",
      choices: [
        { label: "A", text: "Always, regardless of context" },
        { label: "B", text: "Never" },
        { label: "C", text: "Only when $x=0$ makes contextual sense" },
      ],
      hint: "The intercept is the prediction when $x=0$.",
      explanation: "The intercept should only be interpreted if $x=0$ is meaningful.",
    },
    {
      id: "correlation-mastery-9",
      prompt: "A data set has $r=0.78$. Which statement is safest?",
      latex: "r=0.78",
      answer: "B",
      choices: [
        { label: "A", text: "One variable definitely causes the other" },
        { label: "B", text: "There is a positive linear association, but causation is not proven" },
        { label: "C", text: "There is no association" },
      ],
      hint: "Correlation does not prove causation.",
      explanation: "There is positive association, but causation is not proven.",
    },
    {
      id: "correlation-mastery-10",
      prompt: "Which prediction is most appropriate?",
      latex: "\\text{The data has }2\\le x\\le 12.",
      answer: "A",
      choices: [
        { label: "A", text: "Predicting at $x=8$" },
        { label: "B", text: "Predicting at $x=100$" },
        { label: "C", text: "Predicting at $x=-50$" },
      ],
      hint: "Predictions are safer within the data range.",
      explanation: "$x=8$ is within the data range.",
    },
  ],

  masteryPassMark: 0.8,
};

export const interpretingAssociationResidualsLesson: ExplicitLesson = {
  id: "interpreting-association-residuals",
  slug: "interpreting-association-residuals",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Interpreting Association and Residuals",
  description:
    "Interpret association, residuals, residual plots, and the limitations of linear models.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",

  video: {
    title: "Interpreting Association and Residuals",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to describe association and use residuals to judge regression predictions.",

  successCriteria: [
    "Describe association using direction, form, strength, and outliers.",
    "Calculate a residual using actual minus predicted.",
    "Interpret positive and negative residuals.",
    "Use residual plots to judge whether a linear model is appropriate.",
    "Recognise that outliers can affect correlation and regression.",
  ],

  teaching: {
    paragraphs: [
      "Association should be described using direction, form, strength, and any unusual features such as outliers.",
      "A residual is the difference between the actual value and the predicted value.",
      "The formula is residual equals actual $y$ minus predicted $y$.",
      "A positive residual means the actual value is above the regression prediction.",
      "A negative residual means the actual value is below the regression prediction.",
      "Residuals help judge whether a linear model is appropriate.",
      "A random scatter of residuals supports a linear model. A curved pattern suggests a non-linear model may be better.",
      "Outliers can strongly affect correlation and regression lines.",
    ],
    latexBlocks: [
      "\\text{residual}=y-\\hat{y}",
      "\\text{positive residual}\\Rightarrow y>\\hat{y}",
      "\\text{negative residual}\\Rightarrow y<\\hat{y}",
      "\\text{association: direction, form, strength, outliers}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Calculate and interpret a residual",
      questionLatex:
        "\\text{A model predicts }\\hat{y}=20,\\text{ but the actual value is }y=26.",
      steps: [
        {
          explanation: "Use actual minus predicted.",
          latex: "\\text{residual}=y-\\hat{y}",
        },
        {
          explanation: "Substitute the actual and predicted values.",
          latex: "\\text{residual}=26-20=6",
        },
        {
          explanation: "A positive residual means the actual value is above the prediction.",
          latex: "6>0",
        },
      ],
      finalAnswerLatex:
        "\\text{residual}=6,\\quad \\text{actual value is }6\\text{ above the prediction}",
    },
    {
      title: "Worked example 2: Interpret a residual plot",
      questionLatex:
        "\\text{A residual plot shows a clear curved pattern. What does this suggest?}",
      steps: [
        {
          explanation: "A good linear model usually leaves residuals randomly scattered.",
          latex: "\\text{random residuals}\\Rightarrow \\text{linear model reasonable}",
        },
        {
          explanation: "A curved pattern means the linear model is missing a pattern in the data.",
          latex: "\\text{curved residuals}\\Rightarrow \\text{non-linear model may be better}",
        },
      ],
      finalAnswerLatex: "\\text{A linear model may not be appropriate.}",
    },
  ],

  guidedPractice: [
    {
      id: "residual-guided-1",
      prompt: "Find the residual.",
      latex: "y=18,\\quad \\hat{y}=15",
      answer: "3",
      hint: "Use actual minus predicted.",
      explanation: "$18-15=3$.",
    },
    {
      id: "residual-guided-2",
      prompt: "Find the residual.",
      latex: "y=22,\\quad \\hat{y}=28",
      answer: "-6",
      hint: "Use $y-\\hat{y}$.",
      explanation: "$22-28=-6$.",
    },
    {
      id: "residual-guided-3",
      prompt: "A residual is positive. What does this mean?",
      latex: "\\text{residual}>0",
      answer: "A",
      choices: [
        { label: "A", text: "The actual value is above the prediction" },
        { label: "B", text: "The actual value is below the prediction" },
        { label: "C", text: "The correlation is positive" },
      ],
      hint: "Positive means actual minus predicted is above 0.",
      explanation: "A positive residual means the actual value is above the predicted value.",
    },
    {
      id: "residual-guided-4",
      prompt: "Which residual plot supports a linear model?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "A clear curved pattern" },
        { label: "B", text: "Random scatter around zero" },
        { label: "C", text: "All residuals increasing in a curve" },
      ],
      hint: "A good linear model should leave no obvious pattern.",
      explanation: "Random scatter around zero supports a linear model.",
    },
  ],

  independentPractice: [
    {
      id: "residual-ind-1",
      prompt: "Find the residual.",
      latex: "y=40,\\quad \\hat{y}=35",
      answer: "5",
      hint: "Use actual minus predicted.",
      explanation: "$40-35=5$.",
    },
    {
      id: "residual-ind-2",
      prompt: "Find the residual.",
      latex: "y=31,\\quad \\hat{y}=36",
      answer: "-5",
      hint: "Use $y-\\hat{y}$.",
      explanation: "$31-36=-5$.",
    },
    {
      id: "residual-ind-3",
      prompt: "A residual is negative. What does this mean?",
      latex: "\\text{residual}<0",
      answer: "B",
      choices: [
        { label: "A", text: "The actual value is above the prediction" },
        { label: "B", text: "The actual value is below the prediction" },
        { label: "C", text: "The association must be negative" },
      ],
      hint: "Negative means actual minus predicted is less than 0.",
      explanation: "A negative residual means the actual value is below the prediction.",
    },
    {
      id: "residual-ind-4",
      prompt: "A residual plot has a curved pattern. Choose the best conclusion.",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "The linear model is definitely perfect" },
        { label: "B", text: "Correlation proves causation" },
        { label: "C", text: "A non-linear model may be more appropriate" },
      ],
      hint: "Patterns in residuals show the model is missing structure.",
      explanation: "A curved residual pattern suggests a non-linear model may be better.",
    },
    {
      id: "residual-ind-5",
      prompt: "Which description includes the right features of association?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "Direction, form, strength, and outliers" },
        { label: "B", text: "Only the mean and median" },
        { label: "C", text: "Only the largest y-value" },
      ],
      hint: "Association descriptions should be broad and specific.",
      explanation: "Association is described using direction, form, strength, and outliers.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Calculating predicted minus actual instead of actual minus predicted.",
      fix: "Use $\\text{residual}=y-\\hat{y}$.",
    },
    {
      mistake: "Thinking positive residual means positive correlation.",
      fix: "A positive residual only means the actual value is above the prediction.",
    },
    {
      mistake: "Ignoring residual plots when judging a model.",
      fix: "Use residual plots to check whether a linear model leaves random errors.",
    },
    {
      mistake: "Describing correlation without mentioning strength or direction.",
      fix: "Include direction, form, strength, and outliers where relevant.",
    },
  ],

  masteryQuiz: [
    {
      id: "residual-mastery-1",
      prompt: "Find the residual.",
      latex: "y=26,\\quad \\hat{y}=20",
      answer: "6",
      hint: "Use actual minus predicted.",
      explanation: "$26-20=6$.",
    },
    {
      id: "residual-mastery-2",
      prompt: "Find the residual.",
      latex: "y=14,\\quad \\hat{y}=19",
      answer: "-5",
      hint: "Use $y-\\hat{y}$.",
      explanation: "$14-19=-5$.",
    },
    {
      id: "residual-mastery-3",
      prompt: "Find the residual.",
      latex: "y=50,\\quad \\hat{y}=50",
      answer: "0",
      hint: "Actual and predicted are equal.",
      explanation: "$50-50=0$.",
    },
    {
      id: "residual-mastery-4",
      prompt: "A residual is $8$. Which statement is correct?",
      latex: "\\text{residual}=8",
      answer: "A",
      choices: [
        { label: "A", text: "The actual value is 8 above the prediction" },
        { label: "B", text: "The actual value is 8 below the prediction" },
        { label: "C", text: "The correlation coefficient is 8" },
      ],
      hint: "Positive residual means actual is above prediction.",
      explanation: "A residual of 8 means actual is 8 above predicted.",
    },
    {
      id: "residual-mastery-5",
      prompt: "A residual is $-3$. Which statement is correct?",
      latex: "\\text{residual}=-3",
      answer: "B",
      choices: [
        { label: "A", text: "The actual value is 3 above the prediction" },
        { label: "B", text: "The actual value is 3 below the prediction" },
        { label: "C", text: "The model has no error" },
      ],
      hint: "Negative residual means actual is below prediction.",
      explanation: "A residual of $-3$ means actual is 3 below predicted.",
    },
    {
      id: "residual-mastery-6",
      prompt: "Which formula is correct?",
      latex: "\\text{residual}",
      answer: "A",
      choices: [
        { label: "A", text: "$y-\\hat{y}$" },
        { label: "B", text: "$\\hat{y}-y$" },
        { label: "C", text: "$y+\\hat{y}$" },
      ],
      hint: "Residual is actual minus predicted.",
      explanation: "The residual is $y-\\hat{y}$.",
    },
    {
      id: "residual-mastery-7",
      prompt: "Which residual plot supports a linear model?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "A strong U-shaped curve" },
        { label: "B", text: "A clear increasing curve" },
        { label: "C", text: "Random scatter around zero" },
      ],
      hint: "No pattern is good for a linear model.",
      explanation: "Random scatter around zero supports a linear model.",
    },
    {
      id: "residual-mastery-8",
      prompt: "A residual plot has a U-shaped pattern. What is the best conclusion?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "The linear model is clearly appropriate" },
        { label: "B", text: "A non-linear model may be better" },
        { label: "C", text: "The residuals prove causation" },
      ],
      hint: "A curved residual pattern suggests missed non-linear structure.",
      explanation: "A non-linear model may be better.",
    },
    {
      id: "residual-mastery-9",
      prompt: "Which features should be included when describing association?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "Direction, form, strength, and outliers" },
        { label: "B", text: "Only the residual formula" },
        { label: "C", text: "Only the intercept" },
      ],
      hint: "Association is described from the scatterplot pattern.",
      explanation: "A good association description includes direction, form, strength, and outliers.",
    },
    {
      id: "residual-mastery-10",
      prompt: "An outlier is present in a scatterplot. What can it affect?",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "Only the title of the graph" },
        { label: "B", text: "Nothing in the analysis" },
        { label: "C", text: "Correlation and the regression line" },
      ],
      hint: "Outliers can pull a regression line.",
      explanation: "Outliers can strongly affect correlation and regression.",
    },
  ],

  masteryPassMark: 0.8,
};

export const normalDistributionEmpiricalRuleLesson: ExplicitLesson = {
  id: "normal-distribution-empirical-rule",
  slug: "normal-distribution-empirical-rule",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Normal Distribution and Empirical Rule",
  description:
    "Use normal distribution features, z-scores, and the empirical rule to estimate proportions and intervals.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",

  video: {
    title: "Normal Distribution and Empirical Rule",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to interpret normal distributions using standard deviation intervals, z-scores, and the empirical rule.",

  successCriteria: [
    "Recognise the shape and key features of a normal distribution.",
    "Recall the 68-95-99.7 empirical rule.",
    "Calculate intervals within one, two, and three standard deviations of the mean.",
    "Calculate and interpret z-scores in normal distribution contexts.",
    "Use approximate language when applying the empirical rule.",
  ],

  teaching: {
    paragraphs: [
      "A normal distribution is symmetric and bell-shaped.",
      "In a normal distribution, the mean, median, and mode are equal.",
      "The empirical rule gives approximate proportions of values within standard deviation intervals.",
      "About 68% of values lie within 1 standard deviation of the mean, about 95% lie within 2 standard deviations, and about 99.7% lie within 3 standard deviations.",
      "Z-scores locate values relative to the mean and standard deviation.",
      "Standardising allows values from different normal distributions to be compared.",
      "Empirical-rule answers are approximate, so context and wording matter.",
    ],
    latexBlocks: [
      "z=\\frac{x-\\bar{x}}{s}",
      "\\bar{x}-s\\le x\\le \\bar{x}+s\\quad \\text{about }68\\%",
      "\\bar{x}-2s\\le x\\le \\bar{x}+2s\\quad \\text{about }95\\%",
      "\\bar{x}-3s\\le x\\le \\bar{x}+3s\\quad \\text{about }99.7\\%",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: One-standard-deviation interval",
      questionLatex:
        "\\text{A normal distribution has mean }70\\text{ and standard deviation }5.\\text{ Find the interval containing about }68\\%\\text{ of values.}",
      steps: [
        {
          explanation: "About 68% lies within 1 standard deviation of the mean.",
          latex: "\\bar{x}-s\\le x\\le \\bar{x}+s",
        },
        {
          explanation: "Substitute the mean and standard deviation.",
          latex: "70-5\\le x\\le70+5",
        },
        {
          explanation: "Calculate the interval.",
          latex: "65\\le x\\le75",
        },
      ],
      finalAnswerLatex: "65\\le x\\le75",
    },
    {
      title: "Worked example 2: Find a z-score",
      questionLatex:
        "\\text{A score of }82\\text{ comes from a distribution with mean }70\\text{ and standard deviation }6.\\text{ Find }z.",
      steps: [
        {
          explanation: "Use the z-score formula.",
          latex: "z=\\frac{x-\\bar{x}}{s}",
        },
        {
          explanation: "Substitute the values.",
          latex: "z=\\frac{82-70}{6}",
        },
        {
          explanation: "Calculate.",
          latex: "z=2",
        },
      ],
      finalAnswerLatex: "z=2",
    },
    {
      title: "Worked example 3: Two-standard-deviation interval",
      questionLatex:
        "\\text{Use the empirical rule to estimate the percentage of values between }60\\text{ and }80\\text{ if }\\bar{x}=70\\text{ and }s=5.",
      steps: [
        {
          explanation: "Find how far the endpoints are from the mean.",
          latex: "70-60=10,\\quad 80-70=10",
        },
        {
          explanation: "Since $10=2\\times5$, the interval is within 2 standard deviations.",
          latex: "60=70-2(5),\\quad 80=70+2(5)",
        },
        {
          explanation: "The empirical rule says about 95% lies within 2 standard deviations.",
          latex: "\\text{about }95\\%",
        },
      ],
      finalAnswerLatex: "\\text{about }95\\%",
    },
  ],

  guidedPractice: [
    {
      id: "normal-guided-1",
      prompt: "Identify the mean.",
      latex: "\\bar{x}=60,\\quad s=4",
      answer: "60",
      hint: "The mean is labelled $\\bar{x}$.",
      explanation: "The mean is $60$.",
    },
    {
      id: "normal-guided-2",
      prompt: "Find the one-standard-deviation interval.",
      latex: "\\bar{x}=50,\\quad s=3",
      answer: "47 to 53",
      acceptedAnswers: ["47-53", "47,53", "[47,53]", "47 <= x <= 53", "47≤x≤53"],
      hint: "Subtract and add 3 to the mean.",
      explanation: "$50-3=47$ and $50+3=53$.",
    },
    {
      id: "normal-guided-3",
      prompt: "Find the two-standard-deviation interval.",
      latex: "\\bar{x}=100,\\quad s=8",
      answer: "84 to 116",
      acceptedAnswers: ["84-116", "84,116", "[84,116]", "84 <= x <= 116", "84≤x≤116"],
      hint: "Use $\\bar{x}\\pm2s$.",
      explanation: "$100-16=84$ and $100+16=116$.",
    },
    {
      id: "normal-guided-4",
      prompt: "Choose the empirical-rule percentage within 1 standard deviation.",
      latex: "\\bar{x}\\pm s",
      answer: "A",
      choices: [
        { label: "A", text: "about 68%" },
        { label: "B", text: "about 95%" },
        { label: "C", text: "about 99.7%" },
      ],
      hint: "The first empirical-rule percentage is 68%.",
      explanation: "About 68% of values lie within 1 standard deviation.",
    },
  ],

  independentPractice: [
    {
      id: "normal-ind-1",
      prompt: "Find the interval containing about 68% of values.",
      latex: "\\bar{x}=40,\\quad s=6",
      answer: "34 to 46",
      acceptedAnswers: ["34-46", "34,46", "[34,46]", "34 <= x <= 46", "34≤x≤46"],
      hint: "Use $\\bar{x}\\pm s$.",
      explanation: "$40-6=34$ and $40+6=46$.",
    },
    {
      id: "normal-ind-2",
      prompt: "Find the interval containing about 95% of values.",
      latex: "\\bar{x}=70,\\quad s=5",
      answer: "60 to 80",
      acceptedAnswers: ["60-80", "60,80", "[60,80]", "60 <= x <= 80", "60≤x≤80"],
      hint: "Use $\\bar{x}\\pm2s$.",
      explanation: "$70-10=60$ and $70+10=80$.",
    },
    {
      id: "normal-ind-3",
      prompt: "Find the z-score.",
      latex: "x=82,\\quad \\bar{x}=70,\\quad s=6",
      answer: "2",
      hint: "Use $z=\\frac{x-\\bar{x}}{s}$.",
      explanation: "$z=(82-70)\\div6=2$.",
    },
    {
      id: "normal-ind-4",
      prompt: "Find the raw value.",
      latex: "\\bar{x}=50,\\quad s=4,\\quad z=1.5",
      answer: "56",
      hint: "Use $x=\\bar{x}+zs$.",
      explanation: "$x=50+1.5(4)=56$.",
    },
    {
      id: "normal-ind-5",
      prompt: "A normal distribution has mean 70 and standard deviation 5. What does a score of 80 represent?",
      latex: "x=80,\\quad \\bar{x}=70,\\quad s=5",
      answer: "B",
      choices: [
        { label: "A", text: "1 standard deviation above the mean" },
        { label: "B", text: "2 standard deviations above the mean" },
        { label: "C", text: "2 standard deviations below the mean" },
      ],
      hint: "$80-70=10$ and $10=2\\times5$.",
      explanation: "A score of 80 is 2 standard deviations above the mean.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using 95% for one standard deviation instead of 68%.",
      fix: "Remember the order: 68%, 95%, 99.7%.",
    },
    {
      mistake: "Adding standard deviation only once for a two-standard-deviation interval.",
      fix: "For 95%, use $\\bar{x}\\pm2s$.",
    },
    {
      mistake: "Confusing z-score with raw score.",
      fix: "A z-score is measured in standard deviations from the mean, not original units.",
    },
    {
      mistake: "Treating empirical-rule answers as exact.",
      fix: "Use approximate language such as about or approximately.",
    },
  ],

  masteryQuiz: [
    {
      id: "normal-mastery-1",
      prompt: "Which shape describes a normal distribution?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "Strongly skewed only" },
        { label: "B", text: "Symmetric and bell-shaped" },
        { label: "C", text: "Always flat" },
      ],
      hint: "A normal curve is symmetric.",
      explanation: "A normal distribution is symmetric and bell-shaped.",
    },
    {
      id: "normal-mastery-2",
      prompt: "In a normal distribution, the mean, median, and mode are:",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "equal" },
        { label: "B", text: "always different" },
        { label: "C", text: "impossible to compare" },
      ],
      hint: "The curve is symmetric.",
      explanation: "The mean, median, and mode are equal in a normal distribution.",
    },
    {
      id: "normal-mastery-3",
      prompt: "About what percentage lies within 2 standard deviations?",
      latex: "\\bar{x}\\pm2s",
      answer: "95%",
      acceptedAnswers: ["95", "95%", "about 95%", "approximately 95%"],
      hint: "Use the empirical rule.",
      explanation: "About 95% lies within 2 standard deviations.",
    },
    {
      id: "normal-mastery-4",
      prompt: "Find the 68% interval.",
      latex: "\\bar{x}=70,\\quad s=5",
      answer: "65 to 75",
      acceptedAnswers: ["65-75", "65,75", "[65,75]", "65 <= x <= 75", "65≤x≤75"],
      hint: "Use $\\bar{x}\\pm s$.",
      explanation: "$70-5=65$ and $70+5=75$.",
    },
    {
      id: "normal-mastery-5",
      prompt: "Find the 95% interval.",
      latex: "\\bar{x}=50,\\quad s=4",
      answer: "42 to 58",
      acceptedAnswers: ["42-58", "42,58", "[42,58]", "42 <= x <= 58", "42≤x≤58"],
      hint: "Use $\\bar{x}\\pm2s$.",
      explanation: "$50-8=42$ and $50+8=58$.",
    },
    {
      id: "normal-mastery-6",
      prompt: "Find the 99.7% interval.",
      latex: "\\bar{x}=100,\\quad s=10",
      answer: "70 to 130",
      acceptedAnswers: ["70-130", "70,130", "[70,130]", "70 <= x <= 130", "70≤x≤130"],
      hint: "Use $\\bar{x}\\pm3s$.",
      explanation: "$100-30=70$ and $100+30=130$.",
    },
    {
      id: "normal-mastery-7",
      prompt: "Find the z-score.",
      latex: "x=82,\\quad \\bar{x}=70,\\quad s=6",
      answer: "2",
      hint: "Subtract the mean, then divide by standard deviation.",
      explanation: "$z=(82-70)\\div6=2$.",
    },
    {
      id: "normal-mastery-8",
      prompt: "Interpret $z=-2$.",
      latex: "z=-2",
      answer: "B",
      choices: [
        { label: "A", text: "2 standard deviations above the mean" },
        { label: "B", text: "2 standard deviations below the mean" },
        { label: "C", text: "exactly at the mean" },
      ],
      hint: "Negative means below the mean.",
      explanation: "$z=-2$ means 2 standard deviations below the mean.",
    },
    {
      id: "normal-mastery-9",
      prompt: "Estimate the percentage between 60 and 80.",
      latex: "\\bar{x}=70,\\quad s=5",
      answer: "95%",
      acceptedAnswers: ["95", "95%", "about 95%", "approximately 95%"],
      hint: "60 and 80 are 2 standard deviations from the mean.",
      explanation: "The interval is $70\\pm2(5)$, so it contains about 95%.",
    },
    {
      id: "normal-mastery-10",
      prompt: "Which wording is best for an empirical-rule answer?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "about 68%" },
        { label: "B", text: "exactly 68.000%" },
        { label: "C", text: "definitely every value" },
      ],
      hint: "The empirical rule is approximate.",
      explanation: "Empirical-rule proportions are approximate.",
    },
  ],

  masteryPassMark: 0.8,
};

export const mixedStatisticalAnalysisExamPracticeLesson: ExplicitLesson = {
  id: "mixed-statistical-analysis-exam-practice",
  slug: "mixed-statistical-analysis-exam-practice",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Mixed Statistical Analysis Exam Practice",
  description:
    "Practise mixed exam-style questions involving summary statistics, z-scores, correlation, regression, residuals, and normal distributions.",
  syllabusArea: "Statistical Analysis",
  focus: "Statistical analysis",
  status: "active",

  video: {
    title: "Mixed Statistical Analysis Exam Practice",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to identify and solve mixed statistical analysis exam questions.",

  successCriteria: [
    "Identify the statistical concept being tested.",
    "Choose appropriate methods based on context and data shape.",
    "Calculate summary statistics, z-scores, residuals, and normal intervals.",
    "Interpret correlation and regression carefully.",
    "Write clear, cautious conclusions in context.",
  ],

  teaching: {
    paragraphs: [
      "Exam questions often combine summary statistics, z-scores, correlation, regression, residuals, and normal distributions.",
      "The first step is identifying the statistical idea being tested.",
      "Choose measures and methods based on the data shape, the context, and whether outliers are present.",
      "Correlation and regression questions require careful interpretation: association is not the same as causation.",
      "Residuals help judge how well a linear model fits the data.",
      "Normal distribution questions often require standardising or using the empirical rule.",
      "Statistical conclusions should be clear, cautious, and contextual.",
    ],
    latexBlocks: [
      "IQR=Q_3-Q_1",
      "z=\\frac{x-\\bar{x}}{s}",
      "\\hat{y}=mx+b",
      "\\text{residual}=y-\\hat{y}",
      "\\bar{x}\\pm2s\\quad \\text{about }95\\%",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Outlier and centre",
      questionLatex:
        "\\text{A data set has a clear high outlier. Which centre measure is more appropriate: mean or median?}",
      steps: [
        {
          explanation: "Outliers can pull the mean strongly.",
          latex: "\\text{mean is affected by extreme values}",
        },
        {
          explanation: "The median is more resistant to an outlier.",
          latex: "\\text{median is position-based}",
        },
      ],
      finalAnswerLatex: "\\text{median}",
    },
    {
      title: "Worked example 2: Regression prediction and extrapolation",
      questionLatex:
        "\\hat{y}=1.8x+12.\\quad \\text{Predict }y\\text{ when }x=10\\text{ and decide whether extrapolation is a concern if the data range is }0\\le x\\le12.",
      steps: [
        {
          explanation: "Substitute $x=10$.",
          latex: "\\hat{y}=1.8(10)+12=30",
        },
        {
          explanation: "$x=10$ is inside the data range.",
          latex: "0\\le10\\le12",
        },
      ],
      finalAnswerLatex: "\\hat{y}=30,\\quad \\text{no extrapolation concern}",
    },
    {
      title: "Worked example 3: Empirical-rule interval",
      questionLatex:
        "\\text{A normal distribution has mean }50\\text{ and standard deviation }4.\\text{ Estimate the interval containing about }95\\%\\text{ of values.}",
      steps: [
        {
          explanation: "About 95% lies within 2 standard deviations.",
          latex: "\\bar{x}\\pm2s",
        },
        {
          explanation: "Calculate the endpoints.",
          latex: "50\\pm2(4)=50\\pm8",
        },
      ],
      finalAnswerLatex: "42\\le x\\le58",
    },
  ],

  guidedPractice: [
    {
      id: "mixed-stats-guided-1",
      prompt: "Choose the best method.",
      latex: "\\text{A data set has a strong outlier. Choose a centre measure.}",
      answer: "B",
      choices: [
        { label: "A", text: "Mean" },
        { label: "B", text: "Median" },
        { label: "C", text: "Maximum" },
      ],
      hint: "Use resistant measures when outliers are present.",
      explanation: "The median is more appropriate because it is resistant to outliers.",
    },
    {
      id: "mixed-stats-guided-2",
      prompt: "Predict $y$.",
      latex: "\\hat{y}=1.8x+12,\\quad x=10",
      answer: "30",
      hint: "Substitute $x=10$.",
      explanation: "$\\hat{y}=1.8(10)+12=30$.",
    },
    {
      id: "mixed-stats-guided-3",
      prompt: "Find the residual.",
      latex: "y=34,\\quad \\hat{y}=30",
      answer: "4",
      hint: "Use actual minus predicted.",
      explanation: "$34-30=4$.",
    },
    {
      id: "mixed-stats-guided-4",
      prompt: "Choose the safest conclusion.",
      latex: "r=0.86",
      answer: "C",
      choices: [
        { label: "A", text: "One variable definitely causes the other" },
        { label: "B", text: "There is no association" },
        { label: "C", text: "There is strong positive association, but causation is not proven" },
      ],
      hint: "Correlation does not prove causation.",
      explanation: "The conclusion should mention association without overclaiming causation.",
    },
  ],

  independentPractice: [
    {
      id: "mixed-stats-ind-1",
      prompt: "Find the IQR.",
      latex: "Q_1=12,\\quad Q_3=21",
      answer: "9",
      hint: "Use $Q_3-Q_1$.",
      explanation: "$IQR=21-12=9$.",
    },
    {
      id: "mixed-stats-ind-2",
      prompt: "Find the z-score.",
      latex: "x=72,\\quad \\bar{x}=60,\\quad s=6",
      answer: "2",
      hint: "Use $z=\\frac{x-\\bar{x}}{s}$.",
      explanation: "$z=(72-60)\\div6=2$.",
    },
    {
      id: "mixed-stats-ind-3",
      prompt: "Predict $y$.",
      latex: "\\hat{y}=3x-5,\\quad x=7",
      answer: "16",
      hint: "Substitute $x=7$.",
      explanation: "$\\hat{y}=3(7)-5=16$.",
    },
    {
      id: "mixed-stats-ind-4",
      prompt: "A residual plot shows random scatter around zero. What does this suggest?",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "A linear model is reasonable" },
        { label: "B", text: "A curved model is definitely required" },
        { label: "C", text: "Correlation proves causation" },
      ],
      hint: "Random residuals support a linear model.",
      explanation: "Random scatter around zero suggests a linear model is reasonable.",
    },
    {
      id: "mixed-stats-ind-5",
      prompt: "Find the interval containing about 95% of values.",
      latex: "\\bar{x}=50,\\quad s=4",
      answer: "42 to 58",
      acceptedAnswers: ["42-58", "42,58", "[42,58]", "42 <= x <= 58", "42≤x≤58"],
      hint: "Use $\\bar{x}\\pm2s$.",
      explanation: "$50-8=42$ and $50+8=58$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using mean when median is more appropriate with outliers.",
      fix: "Use median and IQR when outliers make resistant measures more appropriate.",
    },
    {
      mistake: "Comparing raw scores instead of z-scores.",
      fix: "Use z-scores to compare values from different distributions.",
    },
    {
      mistake: "Saying correlation proves causation.",
      fix: "Correlation describes association only.",
    },
    {
      mistake: "Ignoring residuals when judging a regression model.",
      fix: "Check residual plots for random scatter or patterns.",
    },
  ],

  masteryQuiz: [
    {
      id: "mixed-stats-mastery-1",
      prompt: "Which method is best when a data set has a clear outlier?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "Mean and range only" },
        { label: "B", text: "Median and IQR" },
        { label: "C", text: "Maximum only" },
      ],
      hint: "Use resistant measures.",
      explanation: "Median and IQR are more resistant to outliers.",
    },
    {
      id: "mixed-stats-mastery-2",
      prompt: "Which concept is being tested?",
      latex: "\\text{How many standard deviations above the mean is this score?}",
      answer: "A",
      choices: [
        { label: "A", text: "z-score" },
        { label: "B", text: "residual" },
        { label: "C", text: "IQR" },
      ],
      hint: "Standard deviations from the mean describe a z-score.",
      explanation: "This asks for a z-score.",
    },
    {
      id: "mixed-stats-mastery-3",
      prompt: "Which concept is being tested?",
      latex: "\\text{actual value} - \\text{predicted value}",
      answer: "C",
      choices: [
        { label: "A", text: "correlation" },
        { label: "B", text: "median" },
        { label: "C", text: "residual" },
      ],
      hint: "Residual is actual minus predicted.",
      explanation: "This is a residual.",
    },
    {
      id: "mixed-stats-mastery-4",
      prompt: "Find the IQR.",
      latex: "Q_1=7,\\quad Q_3=19",
      answer: "12",
      hint: "Use $Q_3-Q_1$.",
      explanation: "$IQR=19-7=12$.",
    },
    {
      id: "mixed-stats-mastery-5",
      prompt: "Find the z-score.",
      latex: "x=90,\\quad \\bar{x}=75,\\quad s=5",
      answer: "3",
      hint: "Subtract the mean, then divide by standard deviation.",
      explanation: "$z=(90-75)\\div5=3$.",
    },
    {
      id: "mixed-stats-mastery-6",
      prompt: "Predict $y$.",
      latex: "\\hat{y}=2x+11,\\quad x=9",
      answer: "29",
      hint: "Substitute $x=9$.",
      explanation: "$\\hat{y}=2(9)+11=29$.",
    },
    {
      id: "mixed-stats-mastery-7",
      prompt: "A residual plot has a curved pattern. Choose the best judgement.",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "The linear model is definitely perfect" },
        { label: "B", text: "A non-linear model may be better" },
        { label: "C", text: "The mean must equal the median" },
      ],
      hint: "Curved residuals suggest missed structure.",
      explanation: "A non-linear model may be more appropriate.",
    },
    {
      id: "mixed-stats-mastery-8",
      prompt: "Choose the safest conclusion.",
      latex: "r=-0.88",
      answer: "A",
      choices: [
        { label: "A", text: "Strong negative association, not proof of causation" },
        { label: "B", text: "Weak association because it is negative" },
        { label: "C", text: "No association" },
      ],
      hint: "$|-0.88|$ is close to 1.",
      explanation: "$r=-0.88$ shows strong negative association, but not causation.",
    },
    {
      id: "mixed-stats-mastery-9",
      prompt: "Find the 95% interval.",
      latex: "\\bar{x}=80,\\quad s=6",
      answer: "68 to 92",
      acceptedAnswers: ["68-92", "68,92", "[68,92]", "68 <= x <= 92", "68≤x≤92"],
      hint: "Use $\\bar{x}\\pm2s$.",
      explanation: "$80-12=68$ and $80+12=92$.",
    },
    {
      id: "mixed-stats-mastery-10",
      prompt: "A regression model was built from data with $1\\le x\\le20$. Which prediction is least concerning?",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "$x=100$" },
        { label: "B", text: "$x=12$" },
        { label: "C", text: "$x=-30$" },
      ],
      hint: "Predictions inside the data range are safer.",
      explanation: "$x=12$ is inside the data range.",
    },
  ],

  masteryPassMark: 0.8,
};

export const randomVariablesProbabilityDistributionsLesson: ExplicitLesson = {
  id: "random-variables-probability-distributions",
  slug: "random-variables-probability-distributions",
  moduleSlug: "statistical-analysis",
  moduleTitle: "Statistical Analysis",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Random Variables and Probability Distributions",
  description:
    "Use discrete random variables, probability distributions, and expected value in statistical contexts.",
  syllabusArea: "Statistical Analysis",
  focus: "Random variables",
  status: "active",
  video: {
    title: "Random Variables and Probability Distributions",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn how to identify random variables, check probability distributions, and calculate expected value.",
  successCriteria: [
    "Recognise a discrete random variable in context.",
    "Check whether probabilities in a distribution add to 1.",
    "Calculate expected value using $E(X)=\\sum xP(X=x)$.",
    "Find a missing probability in a simple distribution.",
    "Interpret expected value as a long-run average, not a guaranteed outcome.",
  ],
  teaching: {
    paragraphs: [
      "A random variable assigns numerical values to outcomes of a random process.",
      "A discrete random variable has countable possible values, such as 0, 1, 2, or 3 successes.",
      "A probability distribution lists each possible value and its probability. The probabilities must add to 1.",
      "Expected value is the long-run mean of a random variable. It weights each value by its probability.",
      "Expected value does not have to be a possible outcome. It describes what would happen on average over many repetitions.",
    ],
    latexBlocks: [
      "\\sum P(X=x)=1",
      "E(X)=\\sum xP(X=x)",
      "E(X)=x_1p_1+x_2p_2+\\cdots+x_np_n",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: Check a distribution and find expected value",
      questionLatex:
        "X:0,1,2\\quad P(X=x):0.2,0.5,0.3",
      steps: [
        {
          explanation: "Check the probabilities add to 1.",
          latex: "0.2+0.5+0.3=1",
        },
        {
          explanation: "Multiply each value by its probability and add.",
          latex: "E(X)=0(0.2)+1(0.5)+2(0.3)=1.1",
        },
      ],
      finalAnswerLatex: "E(X)=1.1",
    },
    {
      title: "Worked example 2: Expected payout",
      questionLatex:
        "\\text{A game pays }\\$0,\\$5,\\$10\\text{ with probabilities }0.5,0.3,0.2.",
      steps: [
        {
          explanation: "Calculate the weighted average payout.",
          latex: "E(X)=0(0.5)+5(0.3)+10(0.2)",
        },
        {
          explanation: "Evaluate and interpret the value.",
          latex: "E(X)=3.5",
        },
      ],
      finalAnswerLatex:
        "\\text{The expected payout is }\\$3.50\\text{ per game in the long run.}",
    },
  ],
  guidedPractice: [
    {
      id: "rv-guided-1",
      prompt: "Choose the random variable.",
      latex: "\\text{Number of heads in 3 coin tosses}",
      answer: "B",
      choices: [
        { label: "A", text: "The coin" },
        { label: "B", text: "The number of heads" },
        { label: "C", text: "The person tossing" },
        { label: "D", text: "The word heads" },
      ],
      hint: "A random variable is numerical.",
      explanation: "The number of heads is the random variable.",
    },
    {
      id: "rv-guided-2",
      prompt: "Do the probabilities form a distribution?",
      latex: "0.1,\\ 0.4,\\ 0.5",
      answer: "A",
      choices: [
        { label: "A", text: "Yes, they add to 1" },
        { label: "B", text: "No, they add to 0.9" },
        { label: "C", text: "No, they add to 1.5" },
        { label: "D", text: "No, probabilities cannot be decimals" },
      ],
      hint: "Add them.",
      explanation: "The probabilities add to 1.",
    },
    {
      id: "rv-guided-3",
      prompt: "Find the missing probability.",
      latex: "P(X=0)=0.25,\\ P(X=1)=0.35,\\ P(X=2)=p",
      answer: "0.4",
      acceptedAnswers: ["0.40", "2/5"],
      hint: "The probabilities add to 1.",
      explanation: "$p=1-0.25-0.35=0.4$.",
    },
    {
      id: "rv-guided-4",
      prompt: "Find $E(X)$.",
      latex: "X:0,1\\quad P(X=x):0.7,0.3",
      answer: "0.3",
      acceptedAnswers: ["0.30", "3/10"],
      hint: "Use $0(0.7)+1(0.3)$.",
      explanation: "$E(X)=0.3$.",
    },
  ],
  independentPractice: [
    {
      id: "rv-ind-1",
      prompt: "Find $E(X)$.",
      latex: "X:1,2,3\\quad P(X=x):0.2,0.5,0.3",
      answer: "2.1",
      acceptedAnswers: ["2.10"],
      hint: "Multiply each value by its probability.",
      explanation: "$E(X)=1(0.2)+2(0.5)+3(0.3)=2.1$.",
    },
    {
      id: "rv-ind-2",
      prompt: "Find the missing probability.",
      latex: "0.15+0.25+p+0.30=1",
      answer: "0.3",
      acceptedAnswers: ["0.30", "3/10"],
      hint: "Subtract the known probabilities from 1.",
      explanation: "$p=1-0.15-0.25-0.30=0.30$.",
    },
    {
      id: "rv-ind-3",
      prompt: "Find the expected payout.",
      latex: "\\$0(0.6)+\\$4(0.25)+\\$8(0.15)",
      answer: "2.2",
      acceptedAnswers: ["2.20", "$2.20", "\\$2.20", "$2.2"],
      hint: "Calculate the weighted average.",
      explanation: "$E(X)=0+1+1.2=2.2$.",
    },
    {
      id: "rv-ind-4",
      prompt: "Choose the correct interpretation of $E(X)=3.5$.",
      latex: "\\text{Game payout in dollars}",
      answer: "C",
      choices: [
        { label: "A", text: "Every game pays exactly $3.50" },
        { label: "B", text: "The game cannot pay whole dollars" },
        { label: "C", text: "The long-run average payout is $3.50" },
        { label: "D", text: "The probability of winning is 3.5" },
      ],
      hint: "Expected value is a long-run mean.",
      explanation: "Expected value describes the long-run average.",
    },
    {
      id: "rv-ind-5",
      prompt: "Choose the valid probability distribution.",
      latex: "\\text{Choose one}",
      answer: "A",
      choices: [
        { label: "A", text: "$0.2,0.3,0.5$" },
        { label: "B", text: "$0.2,0.3,0.6$" },
        { label: "C", text: "$-0.1,0.6,0.5$" },
        { label: "D", text: "$1.2,-0.1,-0.1$" },
      ],
      hint: "Probabilities must be non-negative and add to 1.",
      explanation: "Only option A has non-negative probabilities that add to 1.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Not checking probabilities add to 1.",
      fix: "A probability distribution must have total probability 1.",
    },
    {
      mistake: "Adding values without weighting by probabilities.",
      fix: "Use $xP(X=x)$ for each value before adding.",
    },
    {
      mistake: "Treating expected value as a guaranteed outcome.",
      fix: "Expected value is a long-run average.",
    },
    {
      mistake: "Confusing an outcome with its probability.",
      fix: "$x$ is the value; $P(X=x)$ is the probability of that value.",
    },
  ],
  masteryQuiz: [
    {
      id: "rv-mastery-1",
      prompt: "Choose the discrete random variable.",
      latex: "\\text{Rolling a die}",
      answer: "B",
      choices: [
        { label: "A", text: "The die colour" },
        { label: "B", text: "The number rolled" },
        { label: "C", text: "The table" },
        { label: "D", text: "The word roll" },
      ],
      hint: "Look for a numerical outcome.",
      explanation: "The number rolled is numerical.",
    },
    {
      id: "rv-mastery-2",
      prompt: "Do these probabilities form a distribution?",
      latex: "0.2,0.2,0.2,0.2",
      answer: "B",
      choices: [
        { label: "A", text: "Yes, they add to 1" },
        { label: "B", text: "No, they add to 0.8" },
        { label: "C", text: "No, one is negative" },
        { label: "D", text: "No, one is greater than 1" },
      ],
      hint: "Add them.",
      explanation: "The total is 0.8, not 1.",
    },
    {
      id: "rv-mastery-3",
      prompt: "Find the missing probability.",
      latex: "0.45+0.25+p=1",
      answer: "0.3",
      acceptedAnswers: ["0.30", "3/10"],
      hint: "Subtract from 1.",
      explanation: "$p=0.3$.",
    },
    {
      id: "rv-mastery-4",
      prompt: "Find $E(X)$.",
      latex: "X:0,2\\quad P(X=x):0.5,0.5",
      answer: "1",
      acceptedAnswers: ["1.0", "1.00"],
      hint: "Use $0(0.5)+2(0.5)$.",
      explanation: "$E(X)=1$.",
    },
    {
      id: "rv-mastery-5",
      prompt: "Find $E(X)$.",
      latex: "X:1,4\\quad P(X=x):0.75,0.25",
      answer: "1.75",
      acceptedAnswers: ["7/4"],
      hint: "Use $1(0.75)+4(0.25)$.",
      explanation: "$E(X)=1.75$.",
    },
    {
      id: "rv-mastery-6",
      prompt: "Find the expected payout.",
      latex: "X:\\ 2,\\ 6 \\quad P(X=x):\\ 0.4,\\ 0.6",
      answer: "4.4",
      acceptedAnswers: ["4.40", "$4.40", "\\$4.40", "$4.4"],
      hint: "Calculate the weighted average.",
      explanation: "$E(X)=0.8+3.6=4.4$.",
    },
    {
      id: "rv-mastery-7",
      prompt: "Find the missing probability.",
      latex: "P(X=1)=0.1,\\ P(X=2)=p,\\ P(X=3)=0.65",
      answer: "0.25",
      acceptedAnswers: ["1/4"],
      hint: "The total must be 1.",
      explanation: "$p=1-0.1-0.65=0.25$.",
    },
    {
      id: "rv-mastery-8",
      prompt: "Choose the best interpretation of expected value.",
      latex: "E(X)=2.4",
      answer: "A",
      choices: [
        { label: "A", text: "The long-run average value is 2.4" },
        { label: "B", text: "Every outcome must be 2.4" },
        { label: "C", text: "The probability is 2.4" },
        { label: "D", text: "The distribution is invalid" },
      ],
      hint: "Expected value is an average over many trials.",
      explanation: "Expected value is the long-run average.",
    },
    {
      id: "rv-mastery-9",
      prompt: "Choose the formula for expected value.",
      latex: "\\text{Discrete random variable}",
      answer: "C",
      choices: [
        { label: "A", text: "$\\sum P(X=x)=0$" },
        { label: "B", text: "$E(X)=\\sum x$" },
        { label: "C", text: "$E(X)=\\sum xP(X=x)$" },
        { label: "D", text: "$E(X)=\\frac{x}{P(X=x)}$" },
      ],
      hint: "Expected value is a weighted mean.",
      explanation: "$E(X)=\\sum xP(X=x)$.",
    },
    {
      id: "rv-mastery-10",
      prompt: "Find $E(X)$.",
      latex: "X:0,5,10\\quad P(X=x):0.3,0.4,0.3",
      answer: "5",
      acceptedAnswers: ["5.0", "5.00", "$5", "\\$5"],
      hint: "Use $0(0.3)+5(0.4)+10(0.3)$.",
      explanation: "$E(X)=5$.",
    },
  ],
  masteryPassMark: 0.8,
};

export const statisticalAnalysisOutline: LessonOutlineItem[] = [
  {
    id: "data-displays-measures-of-centre",
    slug: "data-displays-measures-of-centre",
    title: "Data Displays and Measures of Centre",
    description:
      "Read simple data displays and choose useful measures of centre, including mean, median, and mode.",
    status: "active",
  },
  {
    id: "spread-iqr-box-plots-outliers",
    slug: "spread-iqr-box-plots-outliers",
    title: "Spread, IQR, Box Plots and Outliers",
    description:
      "Interpret range, quartiles, IQR, five-number summaries, box plots, and the effect of outliers on spread.",
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
    status: "active",
  },
  {
    id: "interpreting-association-residuals",
    slug: "interpreting-association-residuals",
    title: "Interpreting Association and Residuals",
    description:
      "Interpret association, residuals, and the limitations of linear models.",
    status: "active",
  },
  {
    id: "normal-distribution-empirical-rule",
    slug: "normal-distribution-empirical-rule",
    title: "Normal Distribution and Empirical Rule",
    description:
      "Use normal distribution ideas, z-scores, and the empirical rule to interpret data.",
    status: "active",
  },
  {
    id: "mixed-statistical-analysis-exam-practice",
    slug: "mixed-statistical-analysis-exam-practice",
    title: "Mixed Statistical Analysis Exam Practice",
    description:
      "Practise mixed exam-style questions involving summary statistics, z-scores, correlation, regression, residuals, and normal distributions.",
    status: "active",
  },
  {
    id: "random-variables-probability-distributions",
    slug: "random-variables-probability-distributions",
    title: "Random Variables and Probability Distributions",
    description:
      "Use discrete random variables, probability distributions, and expected value in statistical contexts.",
    status: "active",
  },
];

export const statisticalAnalysisLessons = [
  dataDisplaysMeasuresOfCentreLesson,
  spreadIqrBoxPlotsOutliersLesson,
  standardDeviationZScoresStandardisedValuesLesson,
  correlationLeastSquaresRegressionLesson,
  interpretingAssociationResidualsLesson,
  normalDistributionEmpiricalRuleLesson,
  mixedStatisticalAnalysisExamPracticeLesson,
  randomVariablesProbabilityDistributionsLesson,
];
