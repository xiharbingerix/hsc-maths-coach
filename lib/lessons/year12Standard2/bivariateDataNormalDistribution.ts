import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import {
  financeChoice,
  financeShortAnswer as baseFinanceShortAnswer,
} from "../questionHelpers";

function statisticsFeedback(prompt: string, answer: string) {
  const lowerPrompt = prompt.toLowerCase();

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
    unit.slug !== "bivariate-data-normal-distribution"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

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
        financeChoice("y12s2-corr-i4", "Which is the clearest scatterplot description?", "D", ["The graph looks good", "The variables are related", "The line goes somewhere", "There is a moderate negative linear association with one outlier"], "A useful description names direction, strength, form, and any noticeable outlier."),
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

