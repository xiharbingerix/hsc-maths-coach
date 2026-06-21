import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import {
  financeChoice,
  financeShortAnswer as baseFinanceShortAnswer,
} from "../questionHelpers";

function statisticsFeedback(prompt: string, answer: string) {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("expected frequency") || lowerPrompt.includes("expected number") || (lowerPrompt.includes("e = np") || lowerPrompt.includes("e=np"))) {
    return `Expected frequency E = n × p. Multiply the number of trials by the probability to get ${answer}.`;
  }
  if (lowerPrompt.includes("contingency") || (lowerPrompt.includes("table") && (lowerPrompt.includes("p(") || lowerPrompt.includes("probability")))) {
    return `Read the relevant cell from the table and divide by the grand total (all respondents) to find the probability. This gives ${answer}.`;
  }
  if (lowerPrompt.includes("p(a and b)") || lowerPrompt.includes("p(a) × p(b)") || (lowerPrompt.includes("independent") && lowerPrompt.includes("find p"))) {
    return `For independent events, use P(A and B) = P(A) × P(B). Multiply the two individual probabilities to get ${answer}.`;
  }
  if (lowerPrompt.includes("p(red then") || lowerPrompt.includes("p(odd then") || lowerPrompt.includes("p(a and b") || (lowerPrompt.includes("find p") && lowerPrompt.includes("decimal"))) {
    return `Multiply the probability of the first event by the probability of the second. If the events are independent (with replacement), both probabilities stay the same. Multiplying gives ${answer}.`;
  }
  if (lowerPrompt.includes("residual")) {
    return `A residual is the gap left after using the regression line: actual minus predicted. Keep that order so the sign shows whether the actual value is above or below the prediction; here the residual is ${answer}.`;
  }
  if (lowerPrompt.includes("z-score")) {
    return `A z-score measures distance from the mean in standard-deviation units. Subtract the mean from the raw value, divide by the standard deviation, and keep the sign to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("what raw score") ||
    lowerPrompt.includes("find the raw value")
  ) {
    return `To move back from a z-score to a raw value, start at the mean and shift by z standard deviations. Use raw value = mean + z times standard deviation to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("upper value") ||
    lowerPrompt.includes("lower value")
  ) {
    return `A normal-distribution interval is built around the mean. Move the required number of standard deviations above or below the mean to get the requested boundary, ${answer}.`;
  }
  if (lowerPrompt.includes("predict")) {
    return `A regression equation gives an estimate of the response from a known x-value. Substitute the explanatory value into x and calculate the predicted response, ${answer}; it is an estimate rather than a guarantee.`;
  }
  return `Identify whether the question is asking for a prediction, a residual, or a standardised value before calculating. Following that statistical meaning gives ${answer}.`;
}

// Returns safe numeric formatting equivalents: integer "7" → ["7.0"],
// "-5" → ["-5.0"], decimal "37.7" → ["37.70"]. Returns [] for any
// answer containing letters, symbols, or units.
function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^-?\d+$/.test(t)) return [`${t}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

function financeShortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseFinanceShortAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]),
    explanation: statisticsFeedback(prompt, answer),
  };
}

export function year12Standard2StatisticsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
    (unit.slug !== "bivariate-data" && unit.slug !== "probability" && unit.slug !== "normal-distribution")
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "bivariate-data-revision") {
    return {
      ...base,
      description:
        "Consolidate Year 11 univariate data skills: calculate mean, median, mode and range from a data set, read dot plots and histograms, and interpret the shape and spread of a distribution — preparation for scatterplots, correlation and z-scores.",
      learningIntention:
        "Recall and apply Year 11 data summary and display skills so that Year 12 bivariate data, regression and normal distribution work builds on solid statistical foundations.",
      successCriteria: [
        "Calculate the mean, median, mode and range of a small data set.",
        "Read a frequency table, dot plot or histogram to extract data values or frequencies.",
        "Describe a distribution's shape (symmetric, skewed left, skewed right) and identify any outliers.",
        "Interpret standard deviation as a measure of spread — larger SD means values are more spread out from the mean.",
      ],
      teaching: {
        paragraphs: [
          "The mean is the arithmetic average: add all values, divide by how many there are. The median is the middle value when data is ordered (or the average of the two middle values for even-sized sets). The mode is the most frequently occurring value. The range = maximum − minimum.",
          "A frequency table or dot plot shows how often each value occurs. To find the median from a dot plot, count inward from both ends until you reach the middle. To find the mean from a frequency table: multiply each value by its frequency, add all products, then divide by the total frequency.",
          "Distribution shape: a symmetric distribution has a roughly mirror-image appearance around the centre; the mean ≈ median. A right-skewed (positively skewed) distribution has a long tail to the right; mean > median. A left-skewed distribution has a tail to the left; mean < median. Outliers are values that sit far from the rest of the data.",
          "Standard deviation (SD) measures how spread out the values are around the mean. A small SD means data is clustered close to the mean; a large SD means data is widely spread. You do not need to calculate SD from scratch — you will read it from a calculator or table. The key skill is interpreting what it means in context.",
        ],
        latexBlocks: [
          "\\bar{x} = \\frac{\\sum x}{n}\\quad(\\text{mean: sum all values, divide by count})",
          "\\text{Median: middle value of ordered data}",
          "\\text{Range} = \\max - \\min",
          "\\text{Standard deviation: large SD} \\Rightarrow \\text{data more spread out}",
        ],
      },
      workedExamples: [
        {
          title: "Calculate mean, median, mode and range",
          questionLatex:
            "\\text{Data: 5, 8, 3, 8, 6, 4, 8, 7. Find the mean, median, mode and range.}",
          steps: [
            {
              explanation: "Order the data: 3, 4, 5, 6, 7, 8, 8, 8. Mean = sum ÷ 8.",
              latex: "\\bar{x} = \\frac{3+4+5+6+7+8+8+8}{8} = \\frac{49}{8} = 6.125",
            },
            {
              explanation: "Median: 8 values → average of 4th and 5th (6 and 7) = 6.5.",
              latex: "\\text{Median} = \\frac{6+7}{2} = 6.5",
            },
            {
              explanation: "Mode = 8 (appears 3 times). Range = 8 − 3 = 5.",
              latex: "\\text{Mode} = 8,\\quad \\text{Range} = 5",
            },
          ],
          finalAnswerLatex:
            "\\bar{x} = 6.125,\\;\\text{Median} = 6.5,\\;\\text{Mode} = 8,\\;\\text{Range} = 5",
        },
        {
          title: "Mean from a frequency table",
          questionLatex:
            "\\text{Score | Frequency: } 1:3,\\;2:5,\\;3:4,\\;4:2,\\;5:1\\text{. Find the mean score.}",
          steps: [
            {
              explanation: "Multiply each score by its frequency and sum: 1×3+2×5+3×4+4×2+5×1 = 3+10+12+8+5 = 38.",
              latex: "\\sum fx = 1(3)+2(5)+3(4)+4(2)+5(1) = 38",
            },
            {
              explanation: "Total frequency = 3+5+4+2+1 = 15. Mean = 38 ÷ 15.",
              latex: "\\bar{x} = \\frac{38}{15} \\approx 2.53",
            },
          ],
          finalAnswerLatex: "\\bar{x} \\approx 2.53",
        },
        {
          title: "Interpret shape and spread",
          questionLatex:
            "\\text{Two classes sat the same test. Class A: mean = 65, SD = 5. Class B: mean = 65, SD = 18. Interpret the difference.}",
          steps: [
            {
              explanation: "Both classes have the same mean (65), so average performance is equal.",
              latex: "\\bar{x}_A = \\bar{x}_B = 65",
            },
            {
              explanation: "Class A has SD = 5 (scores clustered near 65). Class B has SD = 18 (scores much more spread out — some much higher, some much lower).",
              latex: "\\text{SD}_A = 5 \\ll \\text{SD}_B = 18",
            },
          ],
          finalAnswerLatex: "\\text{Same mean; Class B more spread out (larger SD)}",
        },
      ],
      guidedPractice: [
        financeShortAnswer(
          "y12s2-bdr-g1",
          "Data: 2, 5, 3, 7, 3. Find the mean.",
          "\\bar{x} = (2+5+3+7+3) \\div 5",
          "4",
          ["4.0"]
        ),
        financeShortAnswer(
          "y12s2-bdr-g2",
          "Data (ordered): 4, 6, 7, 9, 11. Find the median.",
          "\\text{Middle value of 5 values}",
          "7",
          ["7.0"]
        ),
        financeChoice(
          "y12s2-bdr-g3",
          "Data: 3, 5, 5, 7, 9, 9, 9. The mode is:",
          "C",
          ["5", "7", "9", "6"],
          "9 appears 3 times — the most frequent value."
        ),
        financeShortAnswer(
          "y12s2-bdr-g4",
          "Data: 12, 15, 8, 20, 10. Find the range.",
          "\\max - \\min = 20 - 8",
          "12",
          ["12.0"]
        ),
      ],
      independentPractice: [
        financeShortAnswer(
          "y12s2-bdr-i1",
          "Data: 6, 8, 4, 10, 2. Find the mean.",
          "(6+8+4+10+2) \\div 5",
          "6",
          ["6.0"]
        ),
        financeShortAnswer(
          "y12s2-bdr-i2",
          "Data (ordered): 3, 5, 8, 10. Find the median.",
          "\\frac{5+8}{2}",
          "6.5",
          ["6.50"]
        ),
        financeChoice(
          "y12s2-bdr-i3",
          "A distribution has mean = 70 and median = 60. The distribution is most likely:",
          "B",
          ["Symmetric", "Right-skewed (positive skew)", "Left-skewed (negative skew)", "Uniform"],
          "Mean > median → tail to the right → right-skewed (positive skew)."
        ),
        financeChoice(
          "y12s2-bdr-i4",
          "Two data sets have the same mean. Set A has SD = 2, Set B has SD = 10. Which is more spread out?",
          "B",
          ["Set A", "Set B", "Both equally", "Cannot tell"],
          "Larger SD = more spread. Set B (SD = 10) is more spread out."
        ),
        financeShortAnswer(
          "y12s2-bdr-i5",
          "Score | Frequency: 1:2, 2:3, 3:1. Find the mean score (to 1 d.p.).",
          "\\frac{1(2)+2(3)+3(1)}{6} = \\frac{11}{6}",
          "1.8",
          ["1.83", "1.83...", "11/6"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Finding the median before ordering the data, taking the middle of the original list.",
          fix: "Always order data from smallest to largest before finding the median. The median is the middle of the ORDERED data set, not the original order.",
        },
        {
          mistake: "Confusing mean and median — using the median when asked for the mean, or vice versa.",
          fix: "Mean = (sum of all values) ÷ count. Median = middle value when ordered. Each is a measure of centre but they can differ, especially with outliers. Check which one the question asks for.",
        },
        {
          mistake: "Finding the range as max + min instead of max − min.",
          fix: "Range = maximum value MINUS minimum value. The range measures the total spread from smallest to largest. For data 8, 15: range = 15 − 8 = 7, not 23.",
        },
        {
          mistake: "Concluding that a larger SD is always 'better' or 'worse' without context.",
          fix: "SD measures spread, not quality. Whether a large or small SD is better depends on the situation. In exam scores, lower SD might mean a more consistent class. Always interpret SD in context.",
        },
      ],
      masteryQuiz: [
        financeShortAnswer(
          "y12s2-bdr-m1",
          "Data: 9, 3, 6, 12, 5, 7. Find the mean.",
          "(9+3+6+12+5+7) \\div 6",
          "7",
          ["7.0"]
        ),
        financeShortAnswer(
          "y12s2-bdr-m2",
          "Data (ordered): 4, 7, 9, 12, 15. Find the median.",
          "\\text{Middle of 5 values}",
          "9",
          ["9.0"]
        ),
        financeShortAnswer(
          "y12s2-bdr-m3",
          "Data: 5, 8, 3, 11, 3. Find the range.",
          "11 - 3",
          "8",
          ["8.0"]
        ),
        financeChoice(
          "y12s2-bdr-m4",
          "Data: 2, 4, 4, 6, 9. The mode is:",
          "B",
          ["2", "4", "5", "9"],
          "4 appears twice — more than any other value."
        ),
        financeShortAnswer(
          "y12s2-bdr-m5",
          "Data (ordered): 1, 3, 5, 7. Find the median.",
          "\\frac{3+5}{2}",
          "4",
          ["4.0"]
        ),
        financeChoice(
          "y12s2-bdr-m6",
          "A distribution has mean = 50 and median = 55. The shape is most likely:",
          "A",
          ["Left-skewed (negative skew)", "Right-skewed (positive skew)", "Symmetric", "Uniform"],
          "Mean < median → tail to the left → left-skewed (negative skew)."
        ),
        financeShortAnswer(
          "y12s2-bdr-m7",
          "Score | Freq: 2:4, 3:3, 4:2, 5:1. Find the mean (to 2 d.p.).",
          "\\frac{2(4)+3(3)+4(2)+5(1)}{10} = \\frac{28}{10}",
          "2.80",
          ["2.8", "2.80"]
        ),
        financeChoice(
          "y12s2-bdr-m8",
          "Standard deviation of 0 means:",
          "C",
          ["The mean is 0", "All values are negative", "All values are identical", "The data is skewed"],
          "If SD = 0, there is no spread — all values equal the mean (are identical)."
        ),
        financeShortAnswer(
          "y12s2-bdr-m9",
          "Data: 10, 20, 30, 40, 50. Find the mean.",
          "(10+20+30+40+50) \\div 5",
          "30",
          ["30.0"]
        ),
        financeChoice(
          "y12s2-bdr-m10",
          "Data: 2, 3, 5, 5, 6, 100. The outlier is 100. Removing it will most affect:",
          "A",
          ["The mean", "The median", "The mode", "The range equally with the mean"],
          "The mean is most affected by extreme values (outliers). The median is resistant to outliers."
        ),
      ],
    };
  }

  if (lesson.slug === "bivariate-data-scatterplots") {
    return {
      ...base,
      description:
        "Interpret bivariate data, scatterplots, association direction, strength, outliers, and causation warnings.",
      learningIntention:
        "Use scatterplots and context to describe bivariate relationships clearly and cautiously.",
      successCriteria: [
        "Identify explanatory and response variables in a practical situation.",
        "Describe association using direction, form, strength, and outliers.",
        "Recognise positive, negative, and no clear association from a described scatterplot.",
        "Avoid claiming causation from association alone.",
      ],
      teaching: {
        paragraphs: [
          "Bivariate data records two variables for each item or person. In Standard 2 questions, the variables might be study hours and marks, advertising spend and sales, or delivery distance and time.",
          "The explanatory variable is the one used to help predict or explain the response variable. It is usually placed on the x-axis. The response variable is usually placed on the y-axis.",
          "A scatterplot can show positive association, negative association, or little to no association. Strength depends on how closely the points follow a pattern.",
          "Outliers are points that do not fit the main pattern. They can affect interpretation and may influence a regression line later.",
          "Association does not prove causation. A scatterplot can show that two variables move together, but extra evidence is needed before claiming one causes the other.",
        ],
        latexBlocks: [
          "\\text{explanatory variable} \\rightarrow x\\text{-axis}",
          "\\text{response variable} \\rightarrow y\\text{-axis}",
          "\\text{describe association: direction, form, strength, outliers}",
        ],
      },
      workedExamples: [
        {
          title: "Interpret direction and strength",
          questionLatex:
            "\\text{A scatterplot of study hours and test score has an upward trend with points close to a line.}",
          steps: [
            {
              explanation:
                "An upward trend means larger x-values tend to go with larger y-values.",
            },
            {
              explanation:
                "Points close to a line indicate a strong linear association.",
            },
          ],
          finalAnswerLatex: "\\text{Strong positive linear association.}",
          cartesianGraph: {
            description: "Illustrative scatterplot of study hours and test score. The points sit close to a rising line, showing strong positive linear association.",
            xMin: 0,
            xMax: 7,
            yMin: 30,
            yMax: 100,
            xStep: 1,
            yStep: 10,
            showGrid: true,
            showAxisLabels: true,
            xAxisLabel: "study hours",
            yAxisLabel: "test score",
            points: [{ x: 1, y: 42 }, { x: 2, y: 49 }, { x: 3, y: 61 }, { x: 4, y: 68 }, { x: 5, y: 80 }, { x: 6, y: 87 }],
          },
        },
        {
          title: "Identify explanatory and response variables",
          questionLatex:
            "\\text{A coach records training hours and race time to predict race time.}",
          steps: [
            {
              explanation:
                "The variable used to predict is training hours.",
            },
            {
              explanation:
                "The variable being predicted is race time.",
            },
          ],
          finalAnswerLatex:
            "\\text{Explanatory: training hours. Response: race time.}",
        },
        {
          title: "Avoid a causation claim",
          questionLatex:
            "\\text{Advertising spend and sales have a positive association.}",
          steps: [
            {
              explanation:
                "The scatterplot supports an association between the variables.",
            },
            {
              explanation:
                "It does not prove advertising alone caused the sales increase.",
            },
          ],
          finalAnswerLatex:
            "\\text{Association is shown, but causation is not proven.}",
        },
      ],
      guidedPractice: [
        financeChoice("y12s2-biv-g1", "A scatterplot comparing study hours and test score slopes upward. Which description is best?", "A", ["Positive association", "Negative association", "No variables are related", "Causation is proven"], "An upward trend indicates positive association."),
        financeChoice("y12s2-biv-g2", "For delivery distance and delivery time, where distance is used to predict time, which is the explanatory variable?", "B", ["Delivery time", "Delivery distance", "Driver name", "Day of week only"], "The explanatory variable is used to predict the response."),
        financeChoice("y12s2-biv-g3", "A scatterplot has points close to a downward sloping line. Which description is best?", "C", ["Weak positive association", "No association", "Strong negative linear association", "Causation proven"], "Downward and close to a line means strong negative linear association."),
        financeChoice("y12s2-biv-g4", "A scatterplot shows temperature and ice-cream sales increase together. What is the safest conclusion?", "D", ["Temperature definitely causes all sales", "Sales cause temperature", "There is no association", "There is a positive association, but causation is not proven"], "Association alone does not prove causation."),
      ],
      independentPractice: [
        financeChoice("y12s2-biv-i1", "A scatterplot of advertising spend and sales rises from left to right with moderate scatter. Which description fits?", "A", ["Moderate positive association", "Strong negative association", "No association", "A normal distribution"], "The trend is positive with moderate strength."),
        financeChoice("y12s2-biv-i2", "In a study of hours of training and performance score, performance score is the:", "C", ["Explanatory variable", "Outlier", "Response variable", "Correlation coefficient"], "The score is the outcome being predicted."),
        financeChoice("y12s2-biv-i3", "A point is far away from the main cluster of points. It is called:", "B", ["A response", "An outlier", "A z-score", "A mean"], "A point far from the pattern is an outlier."),
        financeChoice("y12s2-biv-i4", "Height and arm span have points close to an upward line. Which association is most likely?", "D", ["Weak negative", "No association", "Curved only", "Strong positive"], "Height and arm span tend to increase together."),
        financeChoice("y12s2-biv-i5", "A scatterplot links screen time and sleep hours, but other factors may matter. Which statement is best?", "A", ["Association does not prove causation", "Correlation always proves causation", "Outliers must be ignored", "The variables cannot be plotted"], "Other factors mean causation cannot be claimed from association alone."),
      ],
      commonMistakes: [
        { mistake: "Saying association proves causation.", fix: "Use cautious wording unless the study design proves cause and effect." },
        { mistake: "Forgetting to mention strength.", fix: "Describe whether points are close to or spread away from the pattern." },
        { mistake: "Reversing explanatory and response variables.", fix: "Ask which variable is being used to predict the other." },
        { mistake: "Ignoring outliers.", fix: "Check whether any points sit away from the main trend." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-biv-m1", "Study hours and marks show an upward trend. The association is:", "A", ["Positive", "Negative", "Impossible", "A residual"], "An upward trend is positive."),
        financeChoice("y12s2-biv-m2", "As outside temperature rises, electricity use for air conditioning rises. This is likely:", "C", ["Negative association", "No association", "Positive association", "A z-score"], "Both variables tend to increase together."),
        financeChoice("y12s2-biv-m3", "Points are very spread out with no clear trend. Which description is best?", "B", ["Strong positive", "Weak or no association", "Strong negative", "Causation proven"], "No clear trend means weak or no association."),
        financeChoice("y12s2-biv-m4", "A scatterplot has a downward trend with points close to a line. The association is:", "D", ["Weak positive", "No association", "Normal", "Strong negative"], "Downward and close to a line means strong negative."),
        financeChoice("y12s2-biv-m5", "In predicting delivery time from delivery distance, delivery time is the:", "B", ["Explanatory variable", "Response variable", "Outlier", "Correlation coefficient"], "Delivery time is being predicted."),
        financeChoice("y12s2-biv-m6", "A point far from the main cluster is called:", "A", ["An outlier", "A mean", "A z-score", "A slope"], "That is an outlier."),
        financeChoice("y12s2-biv-m7", "A scatterplot of advertising spend and sales shows positive association. Which claim is safest?", "C", ["Advertising definitely caused all sales", "Sales definitely caused advertising", "The variables are associated but causation is not proven", "No relationship can exist"], "Association alone is not proof of causation."),
        financeChoice("y12s2-biv-m8", "Which pair is bivariate data?", "D", ["Only test scores", "Only student names", "Only one temperature reading", "Study hours and test score for each student"], "Bivariate data records two variables for each item."),
        financeChoice("y12s2-biv-m9", "The explanatory variable is usually placed on the:", "A", ["x-axis", "y-axis", "title only", "residual axis"], "The explanatory variable usually goes on the x-axis."),
        financeChoice("y12s2-biv-m10", "A useful scatterplot description should include:", "B", ["Only the highest point", "Direction, strength, form, and outliers", "Only the mean", "Only the sample size"], "These features describe the association clearly."),
      ],
    };
  }

  if (lesson.slug === "correlation-association") {
    return {
      ...base,
      description:
        "Describe direction and strength of linear association using scatterplots and correlation values, while avoiding causation claims.",
      learningIntention:
        "Describe how two variables move together and use correlation values without making unsupported cause-and-effect claims.",
      successCriteria: [
        "Describe positive, negative, and no clear association in plain English.",
        "Use weak, moderate, and strong to describe how closely points follow a linear pattern.",
        "Interpret correlation values close to 1, close to -1, and close to 0.",
        "Explain why correlation does not prove causation.",
      ],
      teaching: {
        paragraphs: [
          "Association means that two variables tend to move together in a pattern. If larger x-values usually go with larger y-values, the association is positive. If larger x-values usually go with smaller y-values, it is negative.",
          "Strength describes how closely the points follow the pattern. Points packed close to a line suggest a strong linear association. More spread-out points suggest a moderate or weak association.",
          "The correlation coefficient r is a compact way to describe linear association. Values close to 1 mean strong positive association, values close to -1 mean strong negative association, and values close to 0 mean weak or no linear association.",
          "Correlation does not prove causation. Two variables can move together because another variable influences both. That hidden influence is sometimes called a lurking variable.",
          "A clear scatterplot description usually names direction, strength, and form. Mention an outlier as well if one point sits away from the main pattern.",
        ],
        latexBlocks: [
          "-1\\le r\\le 1",
          "r\\approx 1\\Rightarrow \\text{strong positive linear association}",
          "r\\approx -1\\Rightarrow \\text{strong negative linear association}",
          "r\\approx 0\\Rightarrow \\text{weak or no linear association}",
        ],
      },
      workedExamples: [
        {
          title: "Describe a positive association",
          questionLatex:
            "\\text{A scatterplot of study hours and marks rises from left to right, with points close to a line.}",
          steps: [
            {
              explanation:
                "As study hours increase, marks tend to increase as well. That gives the association a positive direction.",
            },
            {
              explanation:
                "The points stay close to a line, so the linear association is strong rather than weak.",
            },
          ],
          finalAnswerLatex: "\\text{Strong positive linear association.}",
          cartesianGraph: {
            description: "Illustrative scatterplot of study hours and marks with points close to a rising line, showing strong positive linear association.",
            xMin: 0,
            xMax: 7,
            yMin: 30,
            yMax: 100,
            xStep: 1,
            yStep: 10,
            showGrid: true,
            showAxisLabels: true,
            xAxisLabel: "study hours",
            yAxisLabel: "marks",
            points: [{ x: 1, y: 40 }, { x: 2, y: 52 }, { x: 3, y: 59 }, { x: 4, y: 71 }, { x: 5, y: 79 }, { x: 6, y: 91 }],
          },
        },
        {
          title: "Describe a negative association",
          questionLatex:
            "\\text{A scatterplot of vehicle speed and travel time slopes downward with moderate scatter.}",
          steps: [
            {
              explanation:
                "As speed increases, travel time tends to decrease. When one variable rises while the other falls, the direction is negative.",
            },
            {
              explanation:
                "The points follow the pattern with some spread, so moderate is a sensible strength description.",
            },
          ],
          finalAnswerLatex: "\\text{Moderate negative association.}",
          cartesianGraph: {
            description: "Illustrative scatterplot of vehicle speed and travel time. The points generally fall from left to right with some spread, showing moderate negative association.",
            xMin: 20,
            xMax: 90,
            yMin: 10,
            yMax: 60,
            xStep: 10,
            yStep: 10,
            showGrid: true,
            showAxisLabels: true,
            xAxisLabel: "vehicle speed",
            yAxisLabel: "travel time",
            points: [{ x: 30, y: 52 }, { x: 40, y: 43 }, { x: 50, y: 46 }, { x: 60, y: 32 }, { x: 70, y: 35 }, { x: 80, y: 22 }],
          },
        },
        {
          title: "Avoid a causation trap",
          questionLatex:
            "\\text{Ice-cream sales and sunburn cases both rise during summer. Does buying ice cream cause sunburn?}",
          steps: [
            {
              explanation:
                "The two variables can have a positive association because they often rise at the same time.",
            },
            {
              explanation:
                "Hot, sunny weather is a lurking variable that can increase both. The association does not prove that one variable causes the other.",
            },
          ],
          finalAnswerLatex:
            "\\text{Positive association, but causation is not proven.}",
        },
      ],
      guidedPractice: [
        financeChoice("y12s2-corr-g1", "A scatterplot rises from left to right. Which direction best describes the association?", "A", ["Positive", "Negative", "No clear association", "Causation"], "Larger x-values tend to come with larger y-values, so the direction is positive."),
        financeChoice("y12s2-corr-g2", "Points lie close to a downward-sloping line. Which description is best?", "C", ["Weak positive", "Moderate positive", "Strong negative linear association", "No association"], "The downward direction makes the association negative. Points close to a line make it strong."),
        financeChoice("y12s2-corr-g3", "A correlation coefficient is r = 0.88. Which description is best?", "B", ["Strong negative", "Strong positive linear association", "Weak or no linear association", "Causation proven"], "The value is close to 1, so it describes a strong positive linear association."),
        financeChoice("y12s2-corr-g4", "Sunglasses sales and ice-cream sales increase together in hot weather. What is the safest conclusion?", "D", ["Sunglasses cause ice-cream sales", "Ice cream causes sunglasses sales", "There is no association", "The variables are associated, but hot weather may influence both"], "A lurking variable can influence both variables. Correlation supports association, not a cause-and-effect claim."),
      ],
      independentPractice: [
        financeChoice("y12s2-corr-i1", "A scatterplot has points widely spread around a slight upward trend. Which description fits best?", "A", ["Weak positive association", "Strong negative association", "No variables can be compared", "Causation proven"], "The direction is upward, but the wide spread makes the association weak."),
        financeChoice("y12s2-corr-i2", "A correlation coefficient is r = -0.93. Which description is best?", "C", ["Weak positive", "Moderate positive", "Strong negative linear association", "No linear association"], "The negative sign gives the direction, and the value is close to -1, so the association is strong."),
        financeChoice("y12s2-corr-i3", "A correlation coefficient is r = 0.06. Which description is best?", "B", ["Strong positive", "Weak or no linear association", "Strong negative", "Causation proven"], "A value close to zero suggests little linear pattern. It does not rule out every possible relationship."),
        financeShortAnswer("y12s2-corr-i4", "A scatterplot has a correlation coefficient of -0.65 and one point well separated from the main linear pattern. State the direction, strength and unusual feature.", "r=-0.65", "moderate negative association with one outlier", ["moderate negative linear association with one outlier", "moderate negative correlation with one outlier"]),
        financeChoice("y12s2-corr-i5", "Umbrella sales and traffic delays both rise on rainy days. Which variable is a likely lurking variable?", "A", ["Rainfall", "Umbrella colour", "Road name", "Correlation coefficient"], "Rain can increase both umbrella sales and traffic delays, so it may explain the association."),
      ],
      commonMistakes: [
        { mistake: "Treating a positive correlation as proof that x causes y.", fix: "Say the variables are associated. A lurking variable or reverse direction may explain the pattern." },
        { mistake: "Using the sign of r to describe strength.", fix: "The sign gives direction. Distance from zero gives strength: values near 1 or -1 are stronger." },
        { mistake: "Saying r close to zero proves there is no relationship of any kind.", fix: "A value close to zero means weak or no linear association. A curved pattern could still exist." },
        { mistake: "Describing only direction.", fix: "Add strength and form, then mention any outlier that sits away from the main pattern." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-corr-m1", "An upward trend in a scatterplot indicates:", "A", ["Positive association", "Negative association", "No association", "A residual"], "When both variables tend to rise together, the association is positive."),
        financeChoice("y12s2-corr-m2", "A downward trend in a scatterplot indicates:", "B", ["Positive association", "Negative association", "A normal distribution", "Causation"], "When y tends to decrease as x increases, the association is negative."),
        financeChoice("y12s2-corr-m3", "r = 0.95 is best described as:", "C", ["Strong negative", "Weak linear association", "Strong positive linear association", "No relationship of any kind"], "The value is close to 1, so the linear association is strong and positive."),
        financeChoice("y12s2-corr-m4", "r = -0.81 is best described as:", "D", ["Strong positive", "Weak positive", "No clear linear association", "Strong negative linear association"], "The value is reasonably close to -1, so the linear association is strong and negative."),
        financeChoice("y12s2-corr-m5", "r = 0.03 suggests:", "A", ["Weak or no linear association", "Strong positive association", "Strong negative association", "Guaranteed causation"], "A value close to zero shows little linear association."),
        financeChoice("y12s2-corr-m6", "Which statement about r is correct?", "B", ["r must be greater than 1", "r is between -1 and 1", "r proves causation", "r measures a residual"], "A correlation coefficient lies between -1 and 1."),
        financeChoice("y12s2-corr-m7", "Points are tightly packed around an upward-sloping line. Which description is best?", "C", ["Weak negative", "Moderate negative", "Strong positive linear association", "No association"], "Close points indicate strength, and the upward direction is positive."),
        financeChoice("y12s2-corr-m8", "Coffee sales and heater use both rise in winter. What is the safest conclusion?", "D", ["Coffee causes heater use", "Heater use causes coffee sales", "No association is possible", "The variables may be associated, with cold weather influencing both"], "Cold weather is a plausible lurking variable. The association alone cannot establish causation."),
        financeChoice("y12s2-corr-m9", "Why should an outlier be mentioned when describing a scatterplot?", "A", ["It may not fit the main pattern", "It always proves causation", "It makes r equal to zero", "It is the response variable"], "An outlier sits away from the pattern and can affect the interpretation."),
        financeChoice("y12s2-corr-m10", "Which is the best full description?", "B", ["The points move", "Strong negative linear association with one outlier", "The graph proves causation", "r must be positive"], "A clear description names strength, direction, form, and the noticeable outlier."),
      ],
    };
  }

  if (lesson.slug === "regression-prediction-residuals") {
    return {
      ...base,
      description:
        "Use regression equations to make predictions, interpret slope, and calculate residuals as actual minus predicted values.",
      learningIntention:
        "Use a regression line as a prediction tool and explain what its slope, intercept, residuals, and prediction limits mean in context.",
      successCriteria: [
        "Use a regression equation to make an appropriate prediction.",
        "Interpret slope and intercept in context.",
        "Calculate and interpret residuals using actual minus predicted.",
        "Distinguish interpolation from cautious extrapolation.",
      ],
      teaching: {
        paragraphs: [
          "A regression line is a prediction tool. It summarises the overall linear pattern in a scatterplot so you can estimate a response value y from a known explanatory value x.",
          "In a regression equation, substitute the known x-value to calculate a predicted y-value. The answer is a prediction, not a guarantee, because real data points do not all sit exactly on the line.",
          "The slope tells the practical story: for each extra 1 of x, predicted y changes by about this much. The intercept is the predicted y-value when x is 0, but only explain it when x = 0 makes sense in the situation.",
          "A residual is actual minus predicted: the leftover error after using the line. A positive residual means the actual point sits above the prediction. A negative residual means it sits below.",
          "Interpolation means predicting within the observed x-values. Extrapolation means predicting outside that range, where the old pattern may no longer continue.",
        ],
        latexBlocks: [
          "\\hat{y}=a+bx",
          "\\text{residual}=y-\\hat{y}",
          "\\text{residual}=\\text{actual}-\\text{predicted}",
        ],
      },
      workedExamples: [
        {
          title: "Use a regression equation for prediction",
          questionLatex:
            "\\hat{y}=12.5+4.2x,\\quad x=6",
          steps: [
            {
              explanation:
                "Substitute 6 hours of training into the regression equation.",
              latex: "\\hat{y}=12.5+4.2(6)",
            },
            {
              explanation: "Calculate the predicted score.",
              latex: "\\hat{y}=37.7",
            },
          ],
          finalAnswerLatex: "\\text{Predicted score }=37.7",
          cartesianGraph: {
            description: "Illustrative training-score scatterplot with the regression line y equals 12.5 plus 4.2x. The line predicts a score of 37.7 at 6 training hours.",
            xMin: 0,
            xMax: 8,
            yMin: 10,
            yMax: 50,
            xStep: 1,
            yStep: 5,
            showGrid: true,
            showAxisLabels: true,
            xAxisLabel: "training hours",
            yAxisLabel: "score",
            lines: [{ kind: "linear", m: 4.2, b: 12.5, label: "regression line" }],
            points: [{ x: 1, y: 18 }, { x: 2, y: 20 }, { x: 3, y: 27 }, { x: 4, y: 28 }, { x: 5, y: 35 }, { x: 6, y: 37.7, label: "prediction" }, { x: 7, y: 43 }],
          },
        },
        {
          title: "Interpret the slope",
          questionLatex:
            "\\hat{y}=12.5+4.2x\\text{, where }x\\text{ is training hours and }y\\text{ is score.}",
          steps: [
            {
              explanation:
                "The slope is the coefficient of x.",
              latex: "b=4.2",
            },
            {
              explanation:
                "For each extra hour of training, the predicted score increases by 4.2 points.",
            },
          ],
          finalAnswerLatex:
            "\\text{Predicted score rises by 4.2 points per training hour.}",
        },
        {
          title: "Calculate a residual",
          questionLatex:
            "\\text{A predicted delivery time is }34\\text{ min, but the actual time is }39\\text{ min.}",
          steps: [
            {
              explanation: "Residual equals actual minus predicted.",
              latex: "39-34=5",
            },
            {
              explanation:
                "The positive residual means the actual delivery took longer than predicted.",
            },
          ],
          finalAnswerLatex: "\\text{Residual }=5\\text{ min.}",
          cartesianGraph: {
            description: "Illustrative delivery-time regression line with a predicted point at 34 minutes and an actual point at 39 minutes for the same input. The vertical distance is the positive residual of 5 minutes.",
            xMin: 0,
            xMax: 6,
            yMin: 10,
            yMax: 50,
            xStep: 1,
            yStep: 5,
            showGrid: true,
            showAxisLabels: true,
            xAxisLabel: "delivery distance",
            yAxisLabel: "delivery time",
            lines: [{ kind: "linear", m: 5, b: 14, label: "prediction line" }],
            points: [{ x: 4, y: 34, label: "predicted" }, { x: 4, y: 39, label: "actual" }],
            lineSegments: [{ from: { x: 4, y: 34 }, to: { x: 4, y: 39 }, label: "residual" }],
          },
        },
      ],
      guidedPractice: [
        financeChoice("y12s2-reg-g1", "In y = 18 + 4x, what does the slope mean?", "A", ["Predicted y increases by about 4 for each extra 1 of x", "Predicted y is always 4", "The intercept is 4", "The residual is 4"], "The slope is the coefficient of x. It describes the predicted change in y for one extra unit of x."),
        financeChoice("y12s2-reg-g2", "A regression model was built from x-values between 2 and 12. Predicting at x = 8 is:", "B", ["Extrapolation", "Interpolation", "A residual", "A causation claim"], "The input 8 sits inside the observed range, so this is interpolation."),
        financeShortAnswer("y12s2-reg-g3", "Use the regression model shown to predict the response value.", "y=12.5+4.2x,\\quad x=6", "37.7"),
        financeShortAnswer("y12s2-reg-g4", "A predicted score is 74 and the actual score is 80. Find the residual.", "\\text{actual}=80,\\quad \\text{predicted}=74", "6"),
      ],
      independentPractice: [
        financeShortAnswer("y12s2-reg-i1", "Use the sales model shown to predict sales for the given advertising level.", "y=220+18x,\\quad x=5", "310"),
        financeChoice("y12s2-reg-i2", "In the displayed sales model, what does the slope mean?", "C", ["Sales start at 18", "Advertising causes all sales", "Predicted sales increase by 18 for each extra advertising unit", "The residual is 18"], "Slope is predicted change in y for a one-unit increase in x.", "y=220+18x"),
        financeShortAnswer("y12s2-reg-i3", "Predicted delivery time is 42 minutes and actual delivery time is 38 minutes. Find the residual.", "\\text{actual}=38,\\quad \\text{predicted}=42", "-4", ["-4 min", "-4 minutes"]),
        financeChoice("y12s2-reg-i4", "A model was built from training times between 1 and 8 hours. Predicting for 20 hours is:", "D", ["Interpolation", "Always exact", "A residual", "Extrapolation and should be treated cautiously"], "20 hours is outside the data range."),
        financeChoice("y12s2-reg-i5", "In the displayed regression model, the intercept should be interpreted only if:", "A", ["$x=0$ is meaningful in context", "r is negative", "there is an outlier", "the residual is positive"], "Intercepts are contextual.", "y=12.5+4.2x"),
      ],
      commonMistakes: [
        { mistake: "Treating a regression prediction as an exact result.", fix: "A regression line estimates the overall pattern. Real points can sit above or below the prediction." },
        { mistake: "Reversing x and y in the regression equation.", fix: "Substitute the explanatory variable into x to predict y." },
        { mistake: "Calculating residual as predicted minus actual.", fix: "Use residual = actual - predicted." },
        { mistake: "Extrapolating far outside the data range without caution.", fix: "Predictions are most reliable within the observed data range." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-reg-m1", "In y = 7 + 2.5x, the slope means:", "A", ["Predicted y rises by about 2.5 for each extra 1 of x", "Predicted y starts at 2.5", "The residual is 2.5", "x must equal 2.5"], "The slope is the predicted change in y for each one-unit increase in x."),
        financeChoice("y12s2-reg-m2", "A regression model was fitted for x-values from 5 to 20. Predicting at x = 14 is:", "B", ["Extrapolation", "Interpolation", "A residual", "A lurking variable"], "The input is inside the observed range, so the prediction is interpolation."),
        financeChoice("y12s2-reg-m3", "A regression model was fitted for x-values from 5 to 20. Predicting at x = 50 should be treated cautiously because it is:", "C", ["Interpolation", "A residual", "Extrapolation", "A z-score"], "The input lies outside the observed range. The old pattern may not continue that far."),
        financeShortAnswer("y12s2-reg-m4", "Use the regression equation shown to predict the response value.", "y=30+2.5x,\\quad x=8", "50"),
        financeShortAnswer("y12s2-reg-m5", "Use the model shown to predict the response value.", "y=5+1.8x,\\quad x=10", "23"),
        financeShortAnswer("y12s2-reg-m6", "A predicted value is 62 and the actual value is 57. Find the residual.", "\\text{predicted}=62,\\quad \\text{actual}=57", "-5"),
        financeChoice("y12s2-reg-m7", "A positive residual means:", "D", ["The correlation is positive", "The model proves causation", "The actual value is below predicted", "The actual value is above predicted"], "Residual = actual - predicted."),
        financeChoice("y12s2-reg-m8", "In the displayed regression model, what does the slope mean?", "A", ["Predicted y increases by 3 for each 1-unit increase in x", "Predicted y is always 3", "x must be 3", "The residual is 3"], "Slope is the predicted rate of change.", "y=12+3x"),
        financeChoice("y12s2-reg-m9", "Predicting outside the range of the data is called:", "B", ["Interpolation", "Extrapolation", "Residual calculation", "Standardising"], "Extrapolation is outside the observed data range."),
        financeChoice("y12s2-reg-m10", "When is it sensible to interpret the intercept of a regression equation?", "C", ["Always", "Only when the slope is negative", "When x = 0 is meaningful in context", "Only when the residual is zero"], "The intercept predicts y when x = 0. Explain it only when that input has a practical meaning."),
      ],
    };
  }

  if (lesson.slug === "normal-distribution-revision") {
    return {
      ...base,
      description:
        "Consolidate mean and standard deviation skills before the normal distribution: calculate mean, interpret SD as spread, identify the symmetric bell-curve shape, and apply the 68–95–99.7 rule intuitively — preparation for z-scores.",
      learningIntention:
        "Recall and apply mean, standard deviation and distribution shape skills so that z-score calculations and the empirical rule can be understood conceptually, not just procedurally.",
      successCriteria: [
        "Calculate the mean of a data set and recognise that standard deviation measures spread around the mean.",
        "Identify a symmetric, bell-shaped distribution from a histogram or description.",
        "State that in a normal distribution approximately 68%, 95% and 99.7% of data falls within 1, 2, and 3 standard deviations of the mean.",
        "Identify what it means for a value to be '1 SD above the mean' or '2 SDs below the mean'.",
      ],
      teaching: {
        paragraphs: [
          "The mean (x̄) is the balance point of a data set. Standard deviation (SD or σ) measures how far, on average, each value is from the mean. A small SD means values are clustered near the mean; a large SD means values are more widely scattered.",
          "The normal distribution is a symmetric, bell-shaped curve. The mean, median and mode are all equal and sit at the centre. Most data is near the mean; very few values are in the extreme tails.",
          "The empirical rule (68–95–99.7 rule): In a normal distribution, approximately 68% of data falls within 1 SD of the mean, approximately 95% falls within 2 SDs, and approximately 99.7% falls within 3 SDs. These percentages refer to the middle portion of the bell curve.",
          "A value that is '1 SD above the mean' sits at x̄ + 1σ. A value '2 SDs below the mean' sits at x̄ − 2σ. These are the upper and lower bounds used in the empirical rule. Calculating where a specific value sits in SD-units is called finding a z-score (the next lesson).",
        ],
        latexBlocks: [
          "\\bar{x} = \\frac{\\sum x}{n}\\quad(\\text{mean})\\;; \\quad \\sigma = \\text{SD (measure of spread)}",
          "\\text{68\\% within }(\\bar{x}-\\sigma,\\;\\bar{x}+\\sigma)",
          "\\text{95\\% within }(\\bar{x}-2\\sigma,\\;\\bar{x}+2\\sigma)",
          "\\text{99.7\\% within }(\\bar{x}-3\\sigma,\\;\\bar{x}+3\\sigma)",
        ],
      },
      workedExamples: [
        {
          title: "Identify mean and SD from a normal distribution",
          questionLatex:
            "\\text{A normal distribution has mean 70 and SD 8. Find the values that are 1 SD and 2 SDs either side of the mean.}",
          steps: [
            {
              explanation: "1 SD: lower = 70 − 8 = 62; upper = 70 + 8 = 78.",
              latex: "\\bar{x} \\pm \\sigma: \\quad 62\\text{ to }78",
            },
            {
              explanation: "2 SD: lower = 70 − 16 = 54; upper = 70 + 16 = 86.",
              latex: "\\bar{x} \\pm 2\\sigma: \\quad 54\\text{ to }86",
            },
          ],
          finalAnswerLatex:
            "1\\text{ SD: }62\\text{ to }78;\\quad 2\\text{ SD: }54\\text{ to }86",
        },
        {
          title: "Apply the empirical rule",
          questionLatex:
            "\\text{Exam scores are normally distributed: mean = 65, SD = 10. Approximately what percentage of students scored between 55 and 75?}",
          steps: [
            {
              explanation: "55 = 65 − 10 (1 SD below mean). 75 = 65 + 10 (1 SD above mean).",
              latex: "55 = \\bar{x} - \\sigma,\\quad 75 = \\bar{x} + \\sigma",
            },
            {
              explanation: "The empirical rule: approx 68% of data falls within 1 SD of the mean.",
              latex: "\\approx 68\\%",
            },
          ],
          finalAnswerLatex: "\\approx 68\\%",
        },
        {
          title: "Find the data range for a given SD interval",
          questionLatex:
            "\\text{Heights are normally distributed: mean = 170 cm, SD = 6 cm. Find the interval covering approximately 95\\% of heights.}",
          steps: [
            {
              explanation: "95% corresponds to mean ± 2 SD.",
              latex: "\\bar{x} - 2\\sigma = 170 - 12 = 158\\text{ cm};\\quad \\bar{x} + 2\\sigma = 170 + 12 = 182\\text{ cm}",
            },
          ],
          finalAnswerLatex: "158\\text{ cm to }182\\text{ cm (approx 95\\% of heights)}",
        },
      ],
      guidedPractice: [
        financeShortAnswer(
          "y12s2-ndr-g1",
          "A normal distribution has mean 50 and SD 5. Find the upper boundary for the 1 SD interval.",
          "50 + 5",
          "55",
          ["55.0"]
        ),
        financeShortAnswer(
          "y12s2-ndr-g2",
          "Normal distribution: mean = 100, SD = 15. Find the value 2 SDs below the mean.",
          "100 - 2(15)",
          "70",
          ["70.0"]
        ),
        financeChoice(
          "y12s2-ndr-g3",
          "In a normal distribution, approximately what percentage of data falls within 2 SDs of the mean?",
          "B",
          ["68%", "95%", "99.7%", "50%"],
          "The empirical rule: 68% within 1 SD, 95% within 2 SDs, 99.7% within 3 SDs."
        ),
        financeShortAnswer(
          "y12s2-ndr-g4",
          "Normal distribution: mean = 30, SD = 4. Find the lower bound of the 1 SD interval.",
          "30 - 4",
          "26",
          ["26.0"]
        ),
      ],
      independentPractice: [
        financeChoice(
          "y12s2-ndr-i1",
          "A normal distribution is best described as:",
          "B",
          ["Skewed right with a long tail", "Symmetric and bell-shaped", "Skewed left", "Rectangular (uniform)"],
          "A normal distribution is symmetric and bell-shaped, with most data near the mean."
        ),
        financeShortAnswer(
          "y12s2-ndr-i2",
          "Exam scores: mean = 72, SD = 6. Find the interval covering approximately 68% of scores.",
          "72 \\pm 6",
          "66 to 78",
          ["66-78", "66 to 78"]
        ),
        financeShortAnswer(
          "y12s2-ndr-i3",
          "Heights: mean = 165 cm, SD = 7 cm. Find the value 3 SDs above the mean.",
          "165 + 3(7)",
          "186 cm",
          ["186", "186cm"]
        ),
        financeChoice(
          "y12s2-ndr-i4",
          "A score of 85 in a distribution with mean 80 and SD 5 is:",
          "B",
          ["1 SD below the mean", "1 SD above the mean", "2 SDs above the mean", "At the mean"],
          "85 − 80 = 5 = 1 × SD → 1 SD above the mean."
        ),
        financeShortAnswer(
          "y12s2-ndr-i5",
          "Normal distribution: mean = 50, SD = 8. Find the range covering approximately 95% of data.",
          "50 \\pm 2(8) = 50 \\pm 16",
          "34 to 66",
          ["34-66", "34 to 66"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using 68% for the 2 SD interval and 95% for the 1 SD interval (swapping the percentages).",
          fix: "The order is: 1 SD → 68%, 2 SD → 95%, 3 SD → 99.7%. A useful memory: the percentages get bigger as the SD count grows. The widest interval (3 SDs) holds almost all (99.7%) of the data.",
        },
        {
          mistake: "Calculating mean ± 2 SD as mean − 2 + SD instead of mean − 2×SD.",
          fix: "The interval is x̄ ± 2σ. If mean = 50 and SD = 8: lower = 50 − 2×8 = 50 − 16 = 34; upper = 50 + 16 = 66. Always multiply the SD by the SD-count first.",
        },
        {
          mistake: "Assuming the empirical rule gives exact percentages, not approximations.",
          fix: "The 68–95–99.7 rule gives approximations for a normal distribution. In HSC questions, answers using these percentages are accepted — but only for data that is approximately normally distributed.",
        },
        {
          mistake: "Confusing 'SD above/below the mean' with 'the value of the SD'.",
          fix: "'1 SD above the mean' means a value equal to x̄ + 1σ. If mean = 70 and SD = 8, then '1 SD above the mean' is the value 78, not the number 8. The SD is used as a unit of distance from the mean.",
        },
      ],
      masteryQuiz: [
        financeShortAnswer(
          "y12s2-ndr-m1",
          "Normal distribution: mean = 60, SD = 5. Find the value 1 SD above the mean.",
          "60 + 5",
          "65",
          ["65.0"]
        ),
        financeChoice(
          "y12s2-ndr-m2",
          "In a normal distribution, approximately what percentage of data is within 3 SDs of the mean?",
          "C",
          ["68%", "95%", "99.7%", "100%"],
          "The empirical rule: 99.7% of data lies within 3 standard deviations of the mean."
        ),
        financeShortAnswer(
          "y12s2-ndr-m3",
          "Normal distribution: mean = 200, SD = 20. Find the upper value for the 2 SD interval.",
          "200 + 2(20)",
          "240",
          ["240.0"]
        ),
        financeShortAnswer(
          "y12s2-ndr-m4",
          "Normal distribution: mean = 100, SD = 10. Find the range covering 99.7% of data.",
          "100 \\pm 3(10) = 100 \\pm 30",
          "70 to 130",
          ["70-130", "70 to 130"]
        ),
        financeChoice(
          "y12s2-ndr-m5",
          "A value 2 SDs below a mean of 80 (SD = 6) is:",
          "B",
          ["74", "68", "92", "60"],
          "80 − 2×6 = 80 − 12 = 68."
        ),
        financeShortAnswer(
          "y12s2-ndr-m6",
          "Heights: mean = 175 cm, SD = 5 cm. Approximately 68% of heights lie between:",
          "175 \\pm 5",
          "170 cm and 180 cm",
          ["170 to 180", "170 and 180", "170-180"]
        ),
        financeChoice(
          "y12s2-ndr-m7",
          "A normal distribution with large SD (compared to another with same mean, smaller SD) is:",
          "A",
          ["More spread out", "Less spread out", "Taller (higher peak)", "Skewed"],
          "Larger SD = greater spread. The bell curve is wider and flatter."
        ),
        financeShortAnswer(
          "y12s2-ndr-m8",
          "Normal distribution: mean = 40, SD = 3. Find the lower bound of the 95% interval.",
          "40 - 2(3)",
          "34",
          ["34.0"]
        ),
        financeChoice(
          "y12s2-ndr-m9",
          "A score of 90 in a distribution with mean 90 is:",
          "D",
          ["1 SD above the mean", "1 SD below the mean", "2 SDs above the mean", "At the mean"],
          "90 = mean → 0 SDs from the mean → at the mean."
        ),
        financeShortAnswer(
          "y12s2-ndr-m10",
          "Normal distribution: mean = 55, SD = 4. Find the interval for approximately 95% of data.",
          "55 \\pm 2(4) = 55 \\pm 8",
          "47 to 63",
          ["47-63", "47 to 63"]
        ),
      ],
    };
  }

  if (lesson.slug === "normal-distribution-z-scores") {
    return {
      ...base,
      description:
        "Calculate and interpret z-scores, standard deviations from the mean, and empirical-rule percentages.",
      learningIntention:
        "Use normal distribution features, z-scores, and the 68-95-99.7 rule to interpret data in context.",
      successCriteria: [
        "Recognise the mean and standard deviation in a normal distribution context.",
        "Calculate z-scores using a short formula.",
        "Interpret whether a value is above or below the mean.",
        "Use the 68-95-99.7 rule for simple normal distribution intervals.",
      ],
      teaching: {
        paragraphs: [
          "A normal distribution is symmetric and bell-shaped. The mean is at the centre, and the standard deviation measures spread from the mean.",
          "A z-score tells how many standard deviations a value is above or below the mean. Positive z-scores are above the mean, and negative z-scores are below the mean.",
          "Standardising with z-scores allows values from different normal distributions to be compared fairly.",
          "The empirical rule says approximately 68% of values are within 1 standard deviation of the mean, 95% within 2 standard deviations, and 99.7% within 3 standard deviations.",
        ],
        latexBlocks: [
          "z=\\frac{x-\\mu}{\\sigma}",
          "\\text{about }68\\%,95\\%,99.7\\%\\text{ within }1,2,3\\text{ standard deviations}",
          "x=\\mu+z\\sigma",
        ],
      },
      workedExamples: [
        {
          title: "Calculate a z-score",
          questionLatex:
            "\\text{Exam scores have mean }68\\text{ and standard deviation }8.\\text{ Find the z-score for }76.",
          steps: [
            {
              explanation: "Substitute into the z-score formula.",
              latex: "z=\\frac{76-68}{8}",
            },
            {
              explanation: "Calculate the standardised value.",
              latex: "z=1",
            },
          ],
          finalAnswerLatex: "z=1",
          normalDistributionDiagram: {
            description: "A bell curve for exam scores with mean 68 and standard deviation 8. The score 76 is marked one standard deviation above the mean.",
            mean: 68,
            standardDeviation: 8,
            axisLabel: "exam score",
            showStandardDeviationLabels: true,
            shadedBands: [{ standardDeviations: 1, label: "about 68% within 1 SD", color: "blue" }],
            markers: [{ value: 76, label: "score 76", zScore: 1 }],
          },
        },
        {
          title: "Interpret above or below the mean",
          questionLatex:
            "\\text{A product weight has }z=-1.5.",
          steps: [
            {
              explanation:
                "A negative z-score means the value is below the mean.",
            },
            {
              explanation:
                "The size 1.5 means it is 1.5 standard deviations from the mean.",
            },
          ],
          finalAnswerLatex:
            "\\text{1.5 standard deviations below the mean.}",
          normalDistributionDiagram: {
            description: "A standard normal bell curve with a marker at z equals negative 1.5, showing a value one and a half standard deviations below the mean.",
            mean: 0,
            standardDeviation: 1,
            axisLabel: "z-score",
            showStandardDeviationLabels: true,
            markers: [{ value: -1.5, label: "value", zScore: -1.5 }],
          },
        },
        {
          title: "Use the empirical rule",
          questionLatex:
            "\\text{Scores are normal with mean }70\\text{ and standard deviation }6.\\text{ Estimate the percentage from }58\\text{ to }82.",
          steps: [
            {
              explanation:
                "The interval 58 to 82 is 12 below and above the mean.",
              latex: "70-2(6)=58,\\quad 70+2(6)=82",
            },
            {
              explanation:
                "Within 2 standard deviations is approximately 95%.",
            },
          ],
          finalAnswerLatex: "\\text{About }95\\%",
          normalDistributionDiagram: {
            description: "A bell curve for scores with mean 70 and standard deviation 6. The wider shaded band from 58 to 82 shows about 95% within 2 standard deviations. The narrower inner band shows about 68% within 1 standard deviation.",
            mean: 70,
            standardDeviation: 6,
            axisLabel: "score",
            showStandardDeviationLabels: true,
            shadedBands: [
              { standardDeviations: 2, label: "about 95% within 2 SD", color: "green" },
              { standardDeviations: 1, label: "about 68% within 1 SD", color: "blue" },
            ],
          },
        },
      ],
      guidedPractice: [
        financeShortAnswer("y12s2-normal-g1", "Exam scores are normal with mean 68 and standard deviation 8. Find the z-score for 76.", "(76-68)/8", "1", ["1.0"]),
        financeShortAnswer("y12s2-normal-g2", "Waiting times have mean 20 min and standard deviation 5 min. Find the z-score for 10 min.", "(10-20)/5", "-2", ["-2.0"]),
        financeChoice("y12s2-normal-g3", "A z-score of 1.5 means the value is:", "A", ["1.5 standard deviations above the mean", "1.5 below zero", "Equal to the mean", "A correlation coefficient"], "Positive z-scores are above the mean."),
        financeChoice("y12s2-normal-g4", "Approximately what percentage of normal data is within 1 standard deviation of the mean?", "B", ["95%", "68%", "99.7%", "50%"], "The empirical rule gives about 68%."),
      ],
      independentPractice: [
        financeShortAnswer("y12s2-normal-i1", "Product weights have mean 500 g and standard deviation 20 g. Find the z-score for 540 g.", "(540-500)/20", "2", ["2.0"]),
        financeShortAnswer("y12s2-normal-i2", "Test scores have mean 70 and standard deviation 6. What raw score has z = -1?", "70-1(6)", "64"),
        financeChoice("y12s2-normal-i3", "A z-score of -0.5 means the value is:", "C", ["Above the mean", "Exactly the mean", "0.5 standard deviations below the mean", "The standard deviation"], "Negative means below the mean."),
        financeChoice("y12s2-normal-i4", "Approximately what percentage is within 2 standard deviations in a normal distribution?", "A", ["95%", "68%", "99.7%", "5%"], "The empirical rule gives about 95%."),
        financeShortAnswer("y12s2-normal-i5", "Scores are normal with mean 70 and standard deviation 6. Find the upper value 2 standard deviations above the mean.", "70+2(6)", "82"),
      ],
      commonMistakes: [
        { mistake: "Using the mean instead of the standard deviation in the denominator.", fix: "Use z = (x - mean) divided by standard deviation." },
        { mistake: "Ignoring the sign of the z-score.", fix: "Positive means above the mean; negative means below the mean." },
        { mistake: "Using 95% for one standard deviation.", fix: "One standard deviation is about 68%, two is about 95%." },
        { mistake: "Treating empirical-rule percentages as exact counts.", fix: "Use approximate language unless the question gives exact data." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-normal-m1", "A normal distribution is best described as:", "A", ["Symmetric and bell-shaped", "Always skewed right", "Always a straight line", "A scatterplot only"], "Normal distributions are symmetric and bell-shaped."),
        financeChoice("y12s2-normal-m2", "About what percentage lies within 1 standard deviation of the mean?", "B", ["95%", "68%", "99.7%", "34%"], "The empirical rule gives about 68%."),
        financeChoice("y12s2-normal-m3", "About what percentage lies within 3 standard deviations of the mean?", "D", ["68%", "95%", "50%", "99.7%"], "The empirical rule gives about 99.7%."),
        financeShortAnswer("y12s2-normal-m4", "Scores have mean 68 and standard deviation 8. Find the z-score for 76.", "\\mu=68,\\quad \\sigma=8,\\quad x=76", "1", ["1.0"]),
        financeShortAnswer("y12s2-normal-m5", "Scores have mean 50 and standard deviation 5. Find the z-score for 40.", "\\mu=50,\\quad \\sigma=5,\\quad x=40", "-2", ["-2.0"]),
        financeShortAnswer("y12s2-normal-m6", "A value has z = 2 in a distribution with mean 30 and standard deviation 4. Find the raw value.", "z=2,\\quad \\mu=30,\\quad \\sigma=4", "38"),
        financeChoice("y12s2-normal-m7", "A z-score of -1.25 means:", "C", ["1.25 above the mean", "Equal to the mean", "1.25 standard deviations below the mean", "A residual of -1.25"], "Negative z-scores are below the mean."),
        financeShortAnswer("y12s2-normal-m8", "Scores are normal with mean 70 and standard deviation 6. Find the interval within 1 standard deviation. Enter the lower value.", "\\mu=70,\\quad \\sigma=6,\\quad k=1", "64"),
        financeShortAnswer("y12s2-normal-m9", "Scores are normal with mean 70 and standard deviation 6. Find the upper value within 2 standard deviations.", "\\mu=70,\\quad \\sigma=6,\\quad k=2", "82"),
        financeChoice("y12s2-normal-m10", "A normal-distribution answer using the empirical rule should usually be described as:", "A", ["Approximate", "A proof of causation", "A residual", "A regression slope"], "Empirical-rule percentages are approximate."),
      ],
    };
  }

  if (lesson.slug === "probability-revision") {
    return {
      ...base,
      description:
        "Consolidate Year 11 probability foundations: list sample spaces using tables or lists, express probability as a fraction, decimal or percentage, apply P(A') = 1 − P(A), and calculate theoretical probability — preparation for tree diagrams and multistage events.",
      learningIntention:
        "Recall and apply Year 11 probability skills so that relative frequency, tree diagrams, independence and contingency tables can be approached with confidence.",
      successCriteria: [
        "List all outcomes in a sample space using a systematic list or table.",
        "Calculate theoretical probability as P(A) = (number of favourable outcomes) ÷ (total outcomes).",
        "Convert probability between fraction, decimal and percentage forms.",
        "Apply the complement rule: P(A') = 1 − P(A).",
      ],
      teaching: {
        paragraphs: [
          "A sample space is the set of all possible outcomes of an experiment. For a single die, the sample space is {1, 2, 3, 4, 5, 6}. For two coins, the sample space is {HH, HT, TH, TT}. Listing all outcomes systematically (e.g. using a table) ensures nothing is missed.",
          "Theoretical probability: P(A) = (number of outcomes in A) ÷ (total number of equally likely outcomes). Probability is always between 0 (impossible) and 1 (certain). A probability of 0.5 = 50% means the event is equally likely to occur or not.",
          "Convert freely between fractions, decimals and percentages: 3/4 = 0.75 = 75%. In probability calculations, fractions are often clearest — but exam questions may ask for decimal answers to a specified number of places.",
          "The complement rule: P(A') = 1 − P(A), where A' ('A complement' or 'not A') is the event that A does not occur. If P(rain) = 0.3, then P(no rain) = 1 − 0.3 = 0.7. This is especially useful when the complement is easier to calculate than the event itself.",
        ],
        latexBlocks: [
          "P(A) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of equally likely outcomes}}",
          "0 \\le P(A) \\le 1",
          "P(A') = 1 - P(A)",
          "P(A) + P(A') = 1",
        ],
      },
      workedExamples: [
        {
          title: "List a sample space and find probability",
          questionLatex:
            "\\text{A bag contains 3 red, 2 blue and 1 green marble. One marble is drawn at random. Find P(blue).}",
          steps: [
            {
              explanation: "Total outcomes = 3 + 2 + 1 = 6. Favourable (blue) = 2.",
              latex: "P(\\text{blue}) = \\frac{2}{6} = \\frac{1}{3}",
            },
          ],
          finalAnswerLatex: "P(\\text{blue}) = \\frac{1}{3} \\approx 0.333",
        },
        {
          title: "Apply the complement rule",
          questionLatex:
            "\\text{The probability of selecting a defective item is 0.08. Find the probability of selecting a non-defective item.}",
          steps: [
            {
              explanation: "Apply P(A') = 1 − P(A).",
              latex: "P(\\text{non-defective}) = 1 - 0.08 = 0.92",
            },
          ],
          finalAnswerLatex: "P(\\text{non-defective}) = 0.92",
        },
        {
          title: "Sample space for two events",
          questionLatex:
            "\\text{A coin is tossed and a die is rolled. List the sample space and find P(Head and even number).}",
          steps: [
            {
              explanation: "Sample space: H1, H2, H3, H4, H5, H6, T1, T2, T3, T4, T5, T6 → 12 outcomes.",
              latex: "\\text{Total outcomes} = 2 \\times 6 = 12",
            },
            {
              explanation: "Head AND even: H2, H4, H6 → 3 favourable outcomes.",
              latex: "P(H \\text{ and even}) = \\frac{3}{12} = \\frac{1}{4}",
            },
          ],
          finalAnswerLatex: "P(H\\text{ and even}) = \\frac{1}{4} = 0.25",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y12s2-prv-g1",
          "A fair die is rolled. P(rolling a 3) =",
          "B",
          ["1/3", "1/6", "3/6", "1/2"],
          "1 favourable outcome (rolling 3) out of 6 equally likely outcomes: P = 1/6."
        ),
        financeShortAnswer(
          "y12s2-prv-g2",
          "P(A) = 0.35. Find P(A').",
          "P(A') = 1 - 0.35",
          "0.65",
          ["0.650", "65%"]
        ),
        financeChoice(
          "y12s2-prv-g3",
          "A bag has 5 red, 3 blue, 2 green marbles. P(green) =",
          "C",
          ["2/5", "3/10", "1/5", "2/3"],
          "2 green out of 10 total: P = 2/10 = 1/5."
        ),
        financeShortAnswer(
          "y12s2-prv-g4",
          "P(winning) = 3/8. Express as a percentage.",
          "\\frac{3}{8} \\times 100",
          "37.5%",
          ["37.5", "37.50%"]
        ),
      ],
      independentPractice: [
        financeChoice(
          "y12s2-prv-i1",
          "A fair coin is tossed. P(tails) =",
          "B",
          ["1/4", "1/2", "3/4", "1"],
          "1 favourable outcome out of 2 equally likely outcomes: P = 1/2."
        ),
        financeShortAnswer(
          "y12s2-prv-i2",
          "P(not raining) = 0.72. Find P(raining).",
          "P(\\text{rain}) = 1 - 0.72",
          "0.28",
          ["0.280", "28%"]
        ),
        financeShortAnswer(
          "y12s2-prv-i3",
          "A box has 4 white, 6 black, 2 yellow balls. Find P(black) as a decimal.",
          "\\frac{6}{12}",
          "0.5",
          ["0.50", "1/2", "50%"]
        ),
        financeChoice(
          "y12s2-prv-i4",
          "Two coins are tossed. How many outcomes are in the sample space?",
          "B",
          ["2", "4", "8", "6"],
          "HH, HT, TH, TT → 4 outcomes."
        ),
        financeShortAnswer(
          "y12s2-prv-i5",
          "A die is rolled. Find P(number > 4).",
          "\\text{Outcomes > 4: 5, 6}",
          "1/3",
          ["2/6", "0.333", "0.33"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Writing P(A') = P(A) − 1 (subtracting from P(A) instead of subtracting P(A) from 1).",
          fix: "The complement rule is P(A') = 1 − P(A), not P(A) − 1. If P(A) = 0.3, then P(A') = 1 − 0.3 = 0.7. The sum P(A) + P(A') must always equal 1.",
        },
        {
          mistake: "Counting outcomes incorrectly by forgetting to count all possibilities (e.g. missing TH when listing two-coin outcomes).",
          fix: "Use a systematic grid (table) when listing two-event sample spaces. For coin × coin: rows are H, T for coin 1; columns are H, T for coin 2 → HH, HT, TH, TT. A table ensures no outcome is skipped.",
        },
        {
          mistake: "Using P(A) > 1 by dividing favourable outcomes by outcomes in A instead of total outcomes.",
          fix: "Probability is always ≤ 1. Divide by the TOTAL number of outcomes in the sample space. If there are 6 total outcomes and 2 are favourable, P = 2/6 = 1/3 — not 2/2 = 1.",
        },
        {
          mistake: "Confusing 'probability of A' with 'odds of A' (e.g. saying P(roll 3) = 1:5 instead of 1/6).",
          fix: "Probability is always expressed as a fraction, decimal or percentage between 0 and 1. Odds (like 1:5) is a different measure. In this course, always give probability as P(A) = fraction/decimal between 0 and 1.",
        },
      ],
      masteryQuiz: [
        financeShortAnswer(
          "y12s2-prv-m1",
          "A fair die is rolled. Find P(even number).",
          "\\text{Even: 2, 4, 6 → 3 out of 6}",
          "1/2",
          ["3/6", "0.5", "50%"]
        ),
        financeShortAnswer(
          "y12s2-prv-m2",
          "P(passing) = 0.85. Find P(not passing).",
          "1 - 0.85",
          "0.15",
          ["0.150", "15%"]
        ),
        financeChoice(
          "y12s2-prv-m3",
          "A bag has 2 red, 3 blue, 5 green balls. P(red) =",
          "A",
          ["1/5", "2/3", "3/10", "1/4"],
          "2 red out of 10 total: 2/10 = 1/5."
        ),
        financeShortAnswer(
          "y12s2-prv-m4",
          "P(winning a prize) = 1/8. Express as a percentage.",
          "\\frac{1}{8} \\times 100",
          "12.5%",
          ["12.5", "12.50%"]
        ),
        financeChoice(
          "y12s2-prv-m5",
          "A spinner has sections numbered 1–8 (equal size). P(number ≥ 6) =",
          "C",
          ["1/4", "3/4", "3/8", "5/8"],
          "Numbers ≥ 6: {6, 7, 8} → 3 out of 8: P = 3/8."
        ),
        financeShortAnswer(
          "y12s2-prv-m6",
          "Two dice are rolled. How many total outcomes are in the sample space?",
          "6 \\times 6",
          "36",
          ["36.0"]
        ),
        financeChoice(
          "y12s2-prv-m7",
          "P(A') = 0.4. Find P(A).",
          "B",
          ["0.4", "0.6", "1.4", "0.04"],
          "P(A) = 1 − P(A') = 1 − 0.4 = 0.6."
        ),
        financeShortAnswer(
          "y12s2-prv-m8",
          "Letters in MATHS are written on cards. Find P(selecting a vowel).",
          "\\text{Vowels: A → 1 out of 5}",
          "1/5",
          ["0.2", "20%"]
        ),
        financeChoice(
          "y12s2-prv-m9",
          "A card is drawn from a standard 52-card deck. P(heart) =",
          "B",
          ["1/52", "1/4", "13/52", "4/52"],
          "There are 13 hearts out of 52 cards: 13/52 = 1/4."
        ),
        financeShortAnswer(
          "y12s2-prv-m10",
          "P(A) = 2/5. Find P(A') as a decimal.",
          "1 - \\frac{2}{5} = \\frac{3}{5}",
          "0.6",
          ["3/5", "0.60", "60%"]
        ),
      ],
    };
  }

  if (lesson.slug === "relative-frequency-probability") {
    return {
      ...base,
      description:
        "Use relative frequency, experimental probability, simulations, and two-way tables to estimate and interpret probabilities.",
      learningIntention:
        "Estimate and interpret probabilities from repeated trials, simulations, and two-way frequency tables.",
      successCriteria: [
        "Calculate relative frequency as successful trials divided by total trials.",
        "Use experimental results to estimate probability in context.",
        "Interpret how increasing the number of trials can stabilise relative frequency.",
        "Read two-way frequency tables to find simple and conditional probabilities.",
      ],
      teaching: {
        paragraphs: [
          "Relative frequency uses observed data to estimate probability. It is calculated by dividing the number of times an event occurs by the total number of trials.",
          "Experimental probability is useful when a theoretical probability is hard to model or when data has been collected from a real process.",
          "A small number of trials can give a noisy estimate. As the number of trials grows, the relative frequency often becomes more stable.",
          "Two-way tables organise outcomes across two categories. They can be used to find probabilities from totals, rows, columns, and restricted groups.",
        ],
        latexBlocks: [
          "\\text{relative frequency}=\\frac{\\text{number of successful trials}}{\\text{total number of trials}}",
          "\\text{estimated probability}\\approx\\text{relative frequency}",
          "P(A\\mid B)=\\frac{\\text{number in both }A\\text{ and }B}{\\text{number in group }B}",
        ],
      },
      workedExamples: [
        {
          title: "Estimate probability from relative frequency",
          questionLatex:
            "\\text{A machine produces }18\\text{ faulty items in }300\\text{ tests. Estimate the probability of a faulty item.}",
          steps: [
            { explanation: "Use faulty items divided by total items.", latex: "\\frac{18}{300}" },
            { explanation: "Simplify or convert to a decimal.", latex: "\\frac{18}{300}=0.06" },
          ],
          finalAnswerLatex: "0.06\\text{ or }6\\%",
        },
        {
          title: "Use a simulation result",
          questionLatex:
            "\\text{A simulation gives }124\\text{ wins in }500\\text{ games. Estimate the chance of a win.}",
          steps: [
            { explanation: "Divide the number of wins by the number of simulated games.", latex: "\\frac{124}{500}" },
            { explanation: "Evaluate the relative frequency.", latex: "0.248" },
          ],
          finalAnswerLatex: "0.248",
        },
        {
          title: "Read a two-way table",
          questionLatex:
            "\\begin{array}{c|cc|c}&\\text{Bus}&\\text{Train}&\\text{Total}\\\\ \\text{Student}&18&12&30\\\\ \\text{Adult}&22&28&50\\\\ \\hline \\text{Total}&40&40&80\\end{array}",
          steps: [
            { explanation: "For the probability of student given bus, restrict attention to the Bus column.", latex: "\\text{Bus total}=40" },
            { explanation: "There are 18 students in the Bus column.", latex: "P(\\text{Student}\\mid\\text{Bus})=\\frac{18}{40}=0.45" },
          ],
          finalAnswerLatex: "0.45",
        },
      ],
      guidedPractice: [
        financeShortAnswer("y12s2-relfreq-g1", "A spinner lands on red 24 times in 100 spins. Estimate P(red).", "\\frac{24}{100}", "0.24", ["24%", "6/25"]),
        financeShortAnswer("y12s2-relfreq-g2", "A quality check finds 7 faulty items in 200. Estimate the probability an item is faulty.", "\\frac{7}{200}", "0.035", ["3.5%"]),
        financeChoice("y12s2-relfreq-g3", "What usually happens to relative frequency as the number of trials becomes large?", "B", ["It must become zero", "It often becomes more stable", "It must become one", "It stops being data"], "More trials usually reduce random fluctuation."),
        financeShortAnswer("y12s2-relfreq-g4", "An event occurs 18 times in 60 trials. Find its relative frequency.", "\\frac{18}{60}", "0.30", ["0.3", "30%", "3/10"]),
      ],
      independentPractice: [
        financeShortAnswer("y12s2-relfreq-i1", "A bus is late 15 times in 60 observed trips. Estimate the probability it is late.", "\\frac{15}{60}", "0.25", ["25%", "1/4"]),
        financeShortAnswer("y12s2-relfreq-i2", "A simulation records 312 successes in 800 trials. Estimate the probability of success.", "\\frac{312}{800}", "0.39", ["39%"]),
        financeShortAnswer("y12s2-relfreq-i3", "In a sample of 250 customers, 90 chose online delivery. Estimate the probability a customer chooses online delivery.", "\\frac{90}{250}", "0.36", ["36%", "9/25"]),
        financeShortAnswer("y12s2-relfreq-i4", "A two-way table has 14 students who walk out of 35 students. Find P(walk | student).", "\\frac{14}{35}", "0.4", ["40%", "2/5"]),
        financeChoice("y12s2-relfreq-i5", "A relative-frequency estimate from 20 trials is very different from one from 2000 trials. Which is usually more reliable?", "D", ["The 20-trial estimate always", "Neither estimate can be used", "The smaller sample always", "The 2000-trial estimate usually"], "A larger number of trials usually gives a more stable estimate."),
      ],
      commonMistakes: [
        { mistake: "Dividing by the wrong total in a conditional probability.", fix: "Use the total for the restricted group named after 'given'." },
        { mistake: "Treating experimental probability as exact theory.", fix: "Call it an estimate based on the observed data." },
        { mistake: "Converting percentages and decimals inconsistently.", fix: "Check that 0.24 is 24%, not 2.4%." },
        { mistake: "Assuming small samples are always reliable.", fix: "Mention that larger samples usually give more stable estimates." },
      ],
      masteryQuiz: [
        financeShortAnswer("y12s2-relfreq-m1", "A die simulation gives 83 sixes in 500 rolls. Estimate P(six).", "\\frac{83}{500}", "0.166", ["16.6%"]),
        financeShortAnswer("y12s2-relfreq-m2", "A website has 48 purchases from 1200 visits. Estimate the purchase probability.", "\\frac{48}{1200}", "0.04", ["4%", "1/25"]),
        financeShortAnswer("y12s2-relfreq-m3", "A survey finds 96 out of 240 people prefer train travel. Estimate the probability.", "\\frac{96}{240}", "0.4", ["40%", "2/5"]),
        financeShortAnswer("y12s2-relfreq-m4", "In 75 rainy days, a road floods 9 times. Estimate P(flood | rainy day).", "\\frac{9}{75}", "0.12", ["12%", "3/25"]),
        financeShortAnswer("y12s2-relfreq-m5", "A two-way table has 21 adults who use card out of 60 adults. Find P(card | adult).", "\\frac{21}{60}", "0.35", ["35%", "7/20"]),
        financeChoice("y12s2-relfreq-m6", "A simulation is repeated with more trials. The main reason is to:", "C", ["force the answer to 0.5", "avoid division", "improve the stability of the estimate", "change the event"], "More trials usually reduce random variation."),
        financeChoice("y12s2-relfreq-m7", "Which is the best wording for a probability from observed data?", "A", ["estimated probability", "guaranteed probability", "impossible outcome", "residual"], "Observed relative frequency gives an estimate."),
        financeChoice("y12s2-relfreq-m8", "In P(A | B), which total should be used in the denominator?", "D", ["all outcomes always", "only group A", "the largest cell", "the total in group B"], "Given B restricts the sample space to group B."),
        financeShortAnswer("y12s2-relfreq-m9", "A factory tests 400 bulbs and 10 fail. Estimate the failure probability.", "\\frac{10}{400}", "0.025", ["2.5%", "1/40"]),
        financeChoice("y12s2-relfreq-m10", "If relative frequency is 0.72, what percentage is this?", "B", ["7.2%", "72%", "0.72%", "720%"], "Multiply the decimal by 100 to convert to a percentage."),
      ],
    };
  }

  if (lesson.slug === "expected-frequency-contingency-tables") {
    return {
      ...base,
      description:
        "Calculate expected frequency using E = np, read and complete contingency tables, find probabilities from cell counts, and use probability to evaluate decisions.",
      learningIntention:
        "Apply E = np to predict how often an event will occur, and read contingency tables to find probabilities and inform decisions.",
      successCriteria: [
        "Calculate expected frequency using E = n × p.",
        "Recover the probability from an expected frequency using p = E ÷ n.",
        "Read a two-way contingency table to identify row, column, and cell counts.",
        "Calculate probability as cell count ÷ grand total.",
        "Use a probability or expected frequency to justify a practical decision.",
      ],
      teaching: {
        paragraphs: [
          "Expected frequency answers the question: if I repeat an experiment n times and the probability of the event is p, how many times do I expect the event to occur? The formula is simply E = n × p. Expected frequency is a count, not a probability — it can be greater than 1.",
          "A contingency table (also called a two-way table) organises data by two categorical variables. Rows represent one category, columns represent another. Each interior cell shows the count of outcomes in both categories. The rightmost column and bottom row show the row and column totals (marginals); the bottom-right cell is the grand total.",
          "To find a probability from a contingency table, identify the relevant cell count and divide by the grand total. For example, P(Female and Sport) = (Female ∩ Sport count) ÷ grand total. To find a row-only or column-only probability, use the corresponding marginal total ÷ grand total.",
          "Expected frequency and probability link together: if a survey shows 75 out of 100 people play sport (p = 0.75), then in a group of 400 we expect E = 400 × 0.75 = 300 people to play sport. This kind of reasoning is used to predict outcomes and inform decisions such as resource allocation.",
        ],
        latexBlocks: [
          "E = n \\times p \\qquad p = \\dfrac{E}{n}",
          "P(\\text{event}) = \\dfrac{\\text{cell count}}{\\text{grand total}}",
        ],
      },
      workedExamples: [
        {
          title: "Calculate expected frequency",
          questionLatex:
            "\\text{A fair die is rolled 120 times. How many times is a 6 expected to appear?}",
          steps: [
            {
              explanation: "Identify n and p.",
              latex: "n = 120,\\quad p = \\tfrac{1}{6}",
            },
            {
              explanation: "Apply E = np.",
              latex: "E = 120 \\times \\tfrac{1}{6} = 20\\text{ times}",
            },
          ],
          finalAnswerLatex: "E = 20\\text{ times}",
        },
        {
          title: "Read probabilities from a contingency table",
          questionLatex:
            "\\text{Survey: } \\begin{array}{|l|c|c|c|}\\hline & \\text{Sport} & \\text{No Sport} & \\text{Total}\\\\\\hline \\text{Male} & 45 & 15 & 60 \\\\\\hline \\text{Female} & 30 & 10 & 40 \\\\\\hline \\text{Total} & 75 & 25 & 100 \\\\\\hline\\end{array}\\text{Find P(Female) and P(Male and Sport).}",
          twoWayTableDiagram: {
            description:
              "Sport survey contingency table. Rows: Male, Female. Columns: Sport, No Sport. Values: Male/Sport=45, Male/No Sport=15, Female/Sport=30, Female/No Sport=10.",
            rowLabels: ["Male", "Female"],
            columnLabels: ["Sport", "No Sport"],
            values: [
              [45, 15],
              [30, 10],
            ],
            rowTotals: [60, 40],
            columnTotals: [75, 25],
            grandTotal: 100,
            highlight: { kind: "cell", rowIndex: 0, columnIndex: 0, label: "Male ∩ Sport" },
          },
          steps: [
            {
              explanation: "P(Female) uses the Female marginal total ÷ grand total.",
              latex: "P(\\text{Female}) = \\dfrac{40}{100} = 0.4",
            },
            {
              explanation: "P(Male and Sport) uses the cell at Male ∩ Sport.",
              latex: "P(\\text{Male and Sport}) = \\dfrac{45}{100} = 0.45",
            },
          ],
          finalAnswerLatex:
            "P(\\text{Female}) = 0.4;\\quad P(\\text{Male and Sport}) = 0.45",
        },
        {
          title: "Use expected frequency to support a decision",
          questionLatex:
            "\\text{P(defect) = 0.04. A factory produces 2500 items. How many defects are expected? Should an inspector check every item?}",
          steps: [
            {
              explanation: "Calculate expected frequency.",
              latex: "E = 2500 \\times 0.04 = 100\\text{ defects}",
            },
            {
              explanation: "Interpret the result to inform a decision.",
              latex:
                "\\text{100 expected defects out of 2500 is a 4\\% rate — random sampling may be adequate rather than checking every item.}",
            },
          ],
          finalAnswerLatex:
            "E = 100\\text{ defects expected; random sampling is likely adequate.}",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y12s2-eft-g1",
          "A fair die is rolled 120 times. Expected frequency of rolling a 6?",
          "C",
          ["6", "12", "20", "30"],
          "E = 120 × 1/6 = 20."
        ),
        financeChoice(
          "y12s2-eft-g2",
          "Survey (Sport table above): how many people were surveyed in total?",
          "D",
          ["45", "75", "60", "100"],
          "The grand total in the bottom-right cell is 100."
        ),
        financeChoice(
          "y12s2-eft-g3",
          "From the sport survey: P(Female) = ?",
          "B",
          ["0.30", "0.40", "0.60", "30"],
          "P(Female) = 40 ÷ 100 = 0.40."
        ),
        financeChoice(
          "y12s2-eft-g4",
          "From the sport survey: P(Male and Sport) = ?",
          "C",
          ["0.30", "0.60", "0.45", "0.75"],
          "P(Male ∩ Sport) = 45 ÷ 100 = 0.45."
        ),
      ],
      independentPractice: [
        financeChoice(
          "y12s2-eft-i1",
          "A spinner lands on red 25% of the time. In 400 spins, expected frequency of red?",
          "C",
          ["25", "40", "100", "400"],
          "E = 400 × 0.25 = 100."
        ),
        financeShortAnswer(
          "y12s2-eft-i2",
          "P(defect) = 0.04. A factory produces 2500 items. Expected number of defects?",
          "E = 2500 \\times 0.04",
          "100",
          ["100 defects"]
        ),
        financeChoice(
          "y12s2-eft-i3",
          "Pass/Fail survey: Year 11 passed 72, failed 18 (total 90). Year 12 passed 40, failed 10 (total 50). Grand total 140. P(Fail) = ?",
          "C",
          ["0.18", "0.28", "0.20", "0.50"],
          "P(Fail) = 28 ÷ 140 = 0.20."
        ),
        financeChoice(
          "y12s2-eft-i4",
          "From the Pass/Fail survey: how many Year 11 students passed?",
          "C",
          ["18", "40", "72", "90"],
          "The Year 11 / Pass cell shows 72."
        ),
        financeShortAnswer(
          "y12s2-eft-i5",
          "From the Pass/Fail survey (grand total 140): P(Year 12 and Pass) as a decimal to 2 decimal places.",
          "P = 40 \\div 140",
          "0.29",
          ["0.286", "0.2857"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Dividing by the row total instead of the grand total when finding a probability.",
          fix: "All probabilities from a contingency table are cell count ÷ grand total. The row and column totals are used only for marginal probabilities (e.g., P(Female) = female row total ÷ grand total).",
        },
        {
          mistake: "Confusing expected frequency with probability.",
          fix: "Expected frequency E = np is a count (e.g., 100 defects). Probability p is a proportion between 0 and 1 (e.g., 0.04). They are related but distinct.",
        },
        {
          mistake: "Using E = np to find expected frequency and reporting a decimal as the answer.",
          fix: "E = np gives the expected number of times. Round to a sensible whole number in context — you cannot have 2.5 defective items, so report E ≈ 3 rather than 2.5.",
        },
        {
          mistake: "Reading the wrong cell from a two-way table.",
          fix: "Cross the row (one variable) with the column (other variable) to find the correct cell. Check the row header and column header match the category you need.",
        },
      ],
      masteryQuiz: [
        financeChoice(
          "y12s2-eft-m1",
          "The formula for expected frequency is:",
          "B",
          ["E = p ÷ n", "E = n × p", "E = n + p", "E = n ÷ p"],
          "E = np. Multiply the number of trials by the probability."
        ),
        financeShortAnswer(
          "y12s2-eft-m2",
          "P(A) = 0.35. Experiment repeated 200 times. Expected frequency of A?",
          "E = 200 \\times 0.35",
          "70",
          ["70 times"]
        ),
        financeChoice(
          "y12s2-eft-m3",
          "From the sport survey: how many females play sport?",
          "C",
          ["10", "25", "30", "40"],
          "The Female / Sport cell shows 30."
        ),
        financeShortAnswer(
          "y12s2-eft-m4",
          "From the Pass/Fail survey (grand total 140): P(Year 11 and Fail) as a decimal to 2 decimal places.",
          "P = 18 \\div 140",
          "0.13",
          ["0.129", "0.1286"]
        ),
        financeChoice(
          "y12s2-eft-m5",
          "Expected frequency of an event is 15 out of 60 trials. Probability of the event?",
          "B",
          ["0.15", "0.25", "0.40", "15/6"],
          "p = E ÷ n = 15 ÷ 60 = 0.25."
        ),
        financeChoice(
          "y12s2-eft-m6",
          "From the sport survey: P(No Sport) = ?",
          "C",
          ["0.10", "0.15", "0.25", "0.75"],
          "P(No Sport) = 25 ÷ 100 = 0.25."
        ),
        financeChoice(
          "y12s2-eft-m7",
          "P(success) = 0.6 from a survey. Expected frequency in 500 future trials?",
          "C",
          ["60", "150", "300", "600"],
          "E = 500 × 0.6 = 300."
        ),
        financeShortAnswer(
          "y12s2-eft-m8",
          "From the Pass/Fail survey (grand total 140): P(Pass) as a decimal.",
          "P = 112 \\div 140",
          "0.8",
          ["0.80"]
        ),
        financeChoice(
          "y12s2-eft-m9",
          "In a contingency table, individual cell probabilities are found by dividing the cell count by:",
          "B",
          ["The row total", "The grand total", "The column total", "The number of rows"],
          "All probabilities use the grand total as the denominator."
        ),
        financeChoice(
          "y12s2-eft-m10",
          "P(defect) = 0.02. Factory inspects 3000 items. Expected defects?",
          "C",
          ["2", "20", "60", "200"],
          "E = 3000 × 0.02 = 60 expected defects."
        ),
      ],
    };
  }

  if (lesson.slug === "multistage-events-independence") {
    return {
      ...base,
      description:
        "Use tree diagrams and tables for two-stage events, apply P(A and B) = P(A) × P(B) for independent events, and distinguish with- and without-replacement scenarios.",
      learningIntention:
        "Determine probabilities of two-stage events using diagrams and tables, and apply the multiplication rule for independent events.",
      successCriteria: [
        "Construct and read tree diagrams and two-way tables for two-stage events.",
        "Identify whether events are independent (with replacement) or dependent (without replacement).",
        "Apply P(A and B) = P(A) × P(B) when A and B are independent.",
        "Count favourable outcomes in a sample space table to find probabilities.",
      ],
      teaching: {
        paragraphs: [
          "A multistage event is built from two or more separate trials. To find the probability of a particular sequence, count all the ways that sequence can occur and divide by the total outcomes. A tree diagram lists every branch; a two-way table maps outcomes of one trial against the other.",
          "Two events A and B are independent if the result of A has no effect on the probability of B. Sampling with replacement restores the original set, making draws independent. Sampling without replacement changes the set and creates dependence.",
          "For independent events, the multiplication rule applies: P(A and B) = P(A) × P(B). Multiply the individual probabilities along each branch of the tree. This rule only holds for independent events — when events are dependent, the conditional probability changes after the first draw.",
          "A two-way sample space table is useful when both trials have the same outcomes (e.g., two dice, two spins). List outcomes of the first trial on one axis and the second trial on the other. Each cell represents one equally likely outcome. Count the cells that match your event.",
        ],
        latexBlocks: [
          "P(A\\text{ and }B)=P(A)\\times P(B)\\quad\\text{(independent events only)}",
          "\\text{Sample space size (two trials)} = n_1 \\times n_2",
        ],
      },
      workedExamples: [
        {
          title: "Tree diagram for two coin flips",
          questionLatex:
            "\\text{A fair coin is flipped twice. Find P(HH) and P(exactly one head) using a tree diagram.}",
          probabilityTreeDiagram: {
            description:
              "Two-stage probability tree for two coin flips. Each branch is H or T with probability 1/2. Four equally likely outcomes: HH, HT, TH, TT. HH path is highlighted.",
            rootLabel: "Start",
            stages: ["Flip 1", "Flip 2"],
            branches: [
              {
                id: "H1",
                label: "H",
                probability: "1/2",
                children: [
                  { id: "H1H2", label: "H", probability: "1/2" },
                  { id: "H1T2", label: "T", probability: "1/2" },
                ],
              },
              {
                id: "T1",
                label: "T",
                probability: "1/2",
                children: [
                  { id: "T1H2", label: "H", probability: "1/2" },
                  { id: "T1T2", label: "T", probability: "1/2" },
                ],
              },
            ],
            highlightedPaths: [["H1", "H1H2"]],
          },
          steps: [
            {
              explanation: "List all outcomes: HH, HT, TH, TT — each with probability 0.5 × 0.5 = 0.25.",
              latex:
                "P(HH)=P(H)\\times P(H)=0.5\\times0.5=0.25",
            },
            {
              explanation: "Two branches give exactly one head (HT and TH).",
              latex:
                "P(\\text{exactly one head})=P(HT)+P(TH)=0.25+0.25=0.50",
            },
          ],
          finalAnswerLatex:
            "P(HH)=0.25;\\quad P(\\text{exactly one head})=0.50",
        },
        {
          title: "Multiplication rule for independent events",
          questionLatex:
            "\\text{P(A) = 0.4 and P(B) = 0.3. A and B are independent. Find P(A and B).}",
          steps: [
            {
              explanation: "Apply the multiplication rule for independent events.",
              latex: "P(A\\text{ and }B)=P(A)\\times P(B)=0.4\\times0.3=0.12",
            },
          ],
          finalAnswerLatex: "P(A\\text{ and }B)=0.12",
        },
        {
          title: "Sample space table for two spinners",
          questionLatex:
            "\\text{A spinner with outcomes \\{1, 2, 3\\} is spun twice. Find P(sum = 4) using a table.}",
          twoWayTableDiagram: {
            description:
              "3×3 sample space table showing all sums when a {1,2,3} spinner is spun twice. Cells showing sum = 4 are (row 1, col 3), (row 2, col 2), (row 3, col 1). One highlighted cell shown.",
            rowLabels: ["Spin 1 = 1", "Spin 1 = 2", "Spin 1 = 3"],
            columnLabels: ["Spin 2 = 1", "Spin 2 = 2", "Spin 2 = 3"],
            values: [
              [2, 3, 4],
              [3, 4, 5],
              [4, 5, 6],
            ],
            highlight: { kind: "cell", rowIndex: 0, columnIndex: 2, label: "sum = 4" },
          },
          steps: [
            {
              explanation: "Create a 3 × 3 table — total 9 equally likely outcomes.",
              latex:
                "\\text{Outcomes summing to 4: (1,3), (2,2), (3,1) — three cells}",
            },
            {
              explanation: "Divide favourable outcomes by total outcomes.",
              latex:
                "P(\\text{sum}=4)=\\dfrac{3}{9}=\\dfrac{1}{3}",
            },
          ],
          finalAnswerLatex: "P(\\text{sum}=4)=\\dfrac{3}{9}=\\dfrac{1}{3}",
        },
      ],
      guidedPractice: [
        financeChoice(
          "y12s2-msi-g1",
          "A bag has 3 red and 2 blue balls. A ball is drawn and replaced, then a second ball is drawn. These events are:",
          "B",
          ["Dependent", "Independent", "Mutually exclusive", "Complementary"],
          "Replacing the ball restores the bag, so the second draw is unaffected by the first — independent events."
        ),
        financeChoice(
          "y12s2-msi-g2",
          "P(A) = 0.4, P(B) = 0.3. A and B are independent. P(A and B) = ?",
          "C",
          ["0.7", "0.1", "0.12", "0.012"],
          "P(A and B) = 0.4 × 0.3 = 0.12."
        ),
        financeChoice(
          "y12s2-msi-g3",
          "A fair coin is tossed twice. P(HH) = ?",
          "B",
          ["0.5", "0.25", "0.125", "1"],
          "P(H) × P(H) = 0.5 × 0.5 = 0.25."
        ),
        financeChoice(
          "y12s2-msi-g4",
          "A spinner with outcomes {1, 2, 3, 4} is spun twice. Total outcomes in the sample space?",
          "D",
          ["4", "8", "12", "16"],
          "4 × 4 = 16 equally likely outcomes in the 4 × 4 table."
        ),
      ],
      independentPractice: [
        financeChoice(
          "y12s2-msi-i1",
          "P(rolling a 6) = 1/6. Two fair dice are rolled. P(two 6s) = ?",
          "C",
          ["2/6", "1/12", "1/36", "1/6"],
          "P(6) × P(6) = 1/6 × 1/6 = 1/36."
        ),
        financeShortAnswer(
          "y12s2-msi-i2",
          "A bag has 5 red and 5 blue balls. A ball is drawn and replaced, then another is drawn. Find P(red then blue) as a decimal.",
          "P(R)\\times P(B)=\\dfrac{5}{10}\\times\\dfrac{5}{10}",
          "0.25",
          ["0.25"]
        ),
        financeChoice(
          "y12s2-msi-i3",
          "A fair coin is tossed and a fair die is rolled. P(Heads and 4) = ?",
          "B",
          ["1/6", "1/12", "1/4", "1/2"],
          "P(H) × P(4) = 1/2 × 1/6 = 1/12."
        ),
        financeShortAnswer(
          "y12s2-msi-i4",
          "P(A) = 0.6, P(B) = 0.7. A and B are independent. Find P(A and B).",
          "P(A)\\times P(B)=0.6\\times0.7",
          "0.42",
          ["0.42"]
        ),
        financeChoice(
          "y12s2-msi-i5",
          "A card is drawn from a deck without replacement, then a second card is drawn. These events are:",
          "B",
          ["Independent", "Dependent", "Mutually exclusive", "Complementary"],
          "Without replacement, the deck changes after the first draw, affecting the probability of the second — dependent events."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Adding probabilities instead of multiplying for AND events.",
          fix: "P(A and B) = P(A) × P(B) for independent events. Addition applies to OR events (mutually exclusive): P(A or B) = P(A) + P(B).",
        },
        {
          mistake: "Applying the multiplication rule when events are dependent (without replacement).",
          fix: "P(A and B) = P(A) × P(B) only holds for independent events. If sampling without replacement, the second probability changes after the first draw.",
        },
        {
          mistake: "Forgetting to list all outcomes in the sample space table.",
          fix: "A two-way table must include every combination. For a 4 × 4 spinner table, there are 16 cells — not 8 or 4.",
        },
        {
          mistake: "Reading P(exactly one head) as 0.5 and concluding only one branch covers it.",
          fix: "There are two branches giving exactly one head (HT and TH), each with probability 0.25. Add them: P = 0.25 + 0.25 = 0.50.",
        },
      ],
      masteryQuiz: [
        financeChoice(
          "y12s2-msi-m1",
          "A spinner {1, 2, 3} is spun twice. P(sum = 4)?",
          "C",
          ["1/9", "2/9", "1/3", "4/9"],
          "Outcomes summing to 4: (1,3),(2,2),(3,1) = 3 of 9. P = 3/9 = 1/3."
        ),
        financeShortAnswer(
          "y12s2-msi-m2",
          "P(A) = 0.3, P(B) = 0.5. A and B are independent. Find P(A and B).",
          "P(A)\\times P(B)=0.3\\times0.5",
          "0.15",
          ["0.15"]
        ),
        financeChoice(
          "y12s2-msi-m3",
          "A bag has 4 red, 3 blue, 3 green balls (10 total). With replacement, P(red then green)?",
          "B",
          ["0.07", "0.12", "0.4", "7/10"],
          "P(R) × P(G) = 4/10 × 3/10 = 12/100 = 0.12."
        ),
        financeShortAnswer(
          "y12s2-msi-m4",
          "A fair die is rolled twice. Find P(odd then even) as a decimal.",
          "P(\\text{odd})\\times P(\\text{even})=\\tfrac{1}{2}\\times\\tfrac{1}{2}",
          "0.25",
          ["0.25"]
        ),
        financeChoice(
          "y12s2-msi-m5",
          "Two events A and B are independent when:",
          "B",
          [
            "P(A and B) = P(A) + P(B)",
            "P(A and B) = P(A) × P(B)",
            "P(A) = P(B)",
            "P(A and B) = 0",
          ],
          "Independence means the product rule holds: P(A and B) = P(A) × P(B)."
        ),
        financeChoice(
          "y12s2-msi-m6",
          "A spinner {1,2,3,4} is spun twice. P(first result > second result)?",
          "C",
          ["1/4", "5/16", "3/8", "1/2"],
          "Favourable outcomes: (2,1),(3,1),(3,2),(4,1),(4,2),(4,3) = 6 of 16. P = 6/16 = 3/8."
        ),
        financeShortAnswer(
          "y12s2-msi-m7",
          "P(A) = 0.8, P(B) = 0.25. A and B are independent. Find P(A and B).",
          "0.8\\times0.25",
          "0.2",
          ["0.20", "0.2"]
        ),
        financeChoice(
          "y12s2-msi-m8",
          "Bag A has 3 red and 2 blue. Bag B has 1 red and 4 blue. One ball drawn from each. P(both red)?",
          "B",
          ["4/5", "3/25", "4/25", "1/10"],
          "P(R from A) × P(R from B) = 3/5 × 1/5 = 3/25."
        ),
        financeChoice(
          "y12s2-msi-m9",
          "A tree diagram for two coin flips has how many terminal branches showing exactly one head?",
          "B",
          ["1", "2", "3", "4"],
          "HT and TH are the two branches with exactly one head, each with probability 0.25."
        ),
        financeShortAnswer(
          "y12s2-msi-m10",
          "P(A) = 0.45, P(B) = 0.6. A and B are independent. Find P(A and B) to 2 decimal places.",
          "0.45\\times0.6",
          "0.27",
          ["0.27"]
        ),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed HSC-style statistical analysis questions using scatterplots, regression, residuals, z-scores, and normal distributions.",
    learningIntention:
      "Apply bivariate data, correlation, regression, residuals, z-scores, and normal distribution ideas to exam-style contexts.",
    successCriteria: [
      "Interpret scatterplots using direction, strength, outliers, and context.",
      "Use regression equations to predict values and calculate residuals.",
      "Recognise extrapolation and causation warnings.",
      "Calculate and interpret z-scores and empirical-rule percentages.",
    ],
    teaching: {
      paragraphs: [
        "Mixed statistical analysis questions often combine interpretation with short calculation. First decide whether the question is about a scatterplot, regression model, residual, z-score, or normal distribution.",
        "Scatterplot and correlation questions require careful language. Describe the association, but do not claim causation unless the question provides strong evidence.",
        "Regression questions usually ask for a prediction, slope interpretation, residual, or warning about extrapolation. Keep the calculation short and use the context in the conclusion.",
        "Normal distribution questions often use z-scores or the empirical rule. State when a value is above or below the mean, and remember that empirical-rule percentages are approximate.",
      ],
      latexBlocks: [
        "\\text{association} \\ne \\text{causation}",
        "\\text{residual}=\\text{actual}-\\text{predicted}",
        "z=\\frac{x-\\mu}{\\sigma}",
      ],
    },
    workedExamples: [
      {
        title: "Choose a cautious scatterplot conclusion",
        questionLatex:
          "\\text{Study hours and test scores have a strong positive association.}",
        steps: [
          {
            explanation:
              "The scatterplot supports a relationship between the variables.",
          },
          {
            explanation:
              "It does not prove study hours are the only cause of higher scores.",
          },
        ],
        finalAnswerLatex:
          "\\text{Strong positive association; causation is not proven.}",
      },
      {
        title: "Prediction and residual",
        questionLatex:
          "\\hat{y}=40+3x,\\quad x=5,\\quad \\text{actual }y=58",
        steps: [
          {
            explanation: "Find the predicted value.",
            latex: "\\hat{y}=40+3(5)=55",
          },
          {
            explanation: "Residual is actual minus predicted.",
            latex: "58-55=3",
          },
        ],
        finalAnswerLatex: "\\text{Predicted }55,\\quad \\text{residual }3.",
      },
      {
        title: "Z-score in context",
        questionLatex:
          "\\text{Exam scores have mean }70\\text{ and standard deviation }10.\\text{ Find }z\\text{ for }85.",
        steps: [
          {
            explanation: "Substitute into the z-score formula.",
            latex: "z=\\frac{85-70}{10}=1.5",
          },
          {
            explanation:
              "The score is 1.5 standard deviations above the mean.",
            },
        ],
        finalAnswerLatex: "z=1.5",
      },
    ],
    guidedPractice: [
      financeChoice("y12s2-stat-exam-g1", "A scatterplot of training time and performance score has an upward trend. Which conclusion is best?", "A", ["Positive association", "Negative association", "No association", "Causation proven"], "An upward trend is positive association."),
      financeShortAnswer("y12s2-stat-exam-g2", "Use the regression equation shown to predict the response value.", "y=20+5x,\\quad x=6", "50"),
      financeShortAnswer("y12s2-stat-exam-g3", "Predicted delivery time is 31 min and actual delivery time is 36 min. Find the residual.", "36-31", "5", ["5 min", "5 minutes"]),
      financeShortAnswer("y12s2-stat-exam-g4", "Scores have mean 68 and standard deviation 8. Find the z-score for 84.", "(84-68)/8", "2", ["2.0"]),
    ],
    independentPractice: [
      financeChoice("y12s2-stat-exam-i1", "A correlation r = -0.72 for temperature and heater use is best described as:", "B", ["Strong positive", "Strong negative", "No linear association", "Causation proven"], "The value is negative and reasonably close to -1."),
      financeShortAnswer("y12s2-stat-exam-i2", "Use the regression equation shown to predict the response value.", "y=12.5+4.2x,\\quad x=6", "37.7"),
      financeChoice("y12s2-stat-exam-i3", "A prediction is made for x = 30 when the data range was x = 2 to x = 10. This is:", "D", ["Interpolation", "A residual", "A z-score", "Extrapolation"], "30 is outside the data range."),
      financeShortAnswer("y12s2-stat-exam-i4", "A normal distribution has mean 70 and standard deviation 6. Find the z-score for 58.", "(58-70)/6", "-2", ["-2.0"]),
      financeChoice("y12s2-stat-exam-i5", "Approximately what percentage of normal data is within 2 standard deviations of the mean?", "A", ["95%", "68%", "99.7%", "2%"], "The empirical rule gives about 95%."),
    ],
    commonMistakes: [
      { mistake: "Claiming causation from a scatterplot.", fix: "Say association unless a causal study is described." },
      { mistake: "Substituting the response value into x.", fix: "Use the explanatory variable as x in the regression equation." },
      { mistake: "Finding residual as predicted minus actual.", fix: "Use actual minus predicted." },
      { mistake: "Mixing up the empirical-rule percentages.", fix: "Remember 68%, 95%, and 99.7% for 1, 2, and 3 standard deviations." },
    ],
    masteryQuiz: [
      financeChoice("y12s2-stat-exam-m1", "An upward scatterplot trend means:", "A", ["Positive association", "Negative association", "No association", "A normal distribution"], "Upward trend is positive association."),
      financeChoice("y12s2-stat-exam-m2", "r = -0.90 suggests:", "B", ["Strong positive association", "Strong negative association", "Weak association", "Causation"], "-0.90 is strong negative."),
      financeShortAnswer("y12s2-stat-exam-m3", "Use the regression equation shown to predict the response value.", "y=15+2x,\\quad x=9", "33"),
      financeShortAnswer("y12s2-stat-exam-m4", "Predicted score is 72 and actual score is 68. Find the residual.", "\\text{predicted}=72,\\quad \\text{actual}=68", "-4"),
      financeChoice("y12s2-stat-exam-m5", "A positive residual means the actual value is:", "C", ["Below predicted", "Equal to the mean", "Above predicted", "Outside the data range"], "Positive residual means actual minus predicted is positive."),
      financeChoice("y12s2-stat-exam-m6", "A regression prediction far outside the data range should be treated with caution because it is:", "D", ["Correlation", "Causation", "Standardising", "Extrapolation"], "Outside the data range is extrapolation."),
      financeShortAnswer("y12s2-stat-exam-m7", "Exam scores have mean 68 and standard deviation 8. Find the z-score for 76.", "\\mu=68,\\quad \\sigma=8,\\quad x=76", "1", ["1.0"]),
      financeShortAnswer("y12s2-stat-exam-m8", "Product weights have mean 500 g and standard deviation 20 g. Find the z-score for 460 g.", "\\mu=500\\text{ g},\\quad \\sigma=20\\text{ g},\\quad x=460\\text{ g}", "-2", ["-2.0"]),
      financeChoice("y12s2-stat-exam-m9", "About what percentage of normal data is within 1 standard deviation of the mean?", "A", ["68%", "95%", "99.7%", "1%"], "One standard deviation is about 68%."),
      financeChoice("y12s2-stat-exam-m10", "Which conclusion is safest from correlation alone?", "B", ["One variable definitely causes the other", "The variables are associated", "The variables must be normally distributed", "The residual is always zero"], "Correlation alone supports association, not causation."),
    ],
  };
}
